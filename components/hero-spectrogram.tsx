'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 * A synthetic micro-Doppler spectrogram that resolves out of noise once, on
 * load, over ~1.2s, then holds still. It is the only animation on the site
 * that is not triggered by the user.
 *
 * x = slow time, y = Doppler shift (approach above the centre line, recede
 * below), intensity = return strength — the reading SensDS's capture view
 * uses. The field is computed at grid resolution into an offscreen buffer and
 * drawn up with interpolation, which is both faster than per-cell fills and
 * closer to how a real spectrogram looks.
 */

const COLS = 320
const ROWS = 96
const STRIPS = 8 // parallax layers, sliced across Doppler
const RESOLVE_MS = 1200
const PARALLAX_MAX = 8 // px of travel, per the brief's cap

/** Deterministic hash noise, so every load resolves the same field. */
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

/**
 * The signal the noise resolves into: a static zero-Doppler return running the
 * full width, with five gesture bursts throwing oscillating sidebands off it.
 */
function signal(t: number, v: number) {
  // The torso the radar always sees, plus its clutter shoulders.
  let a = 0.92 * Math.exp(-((v / 0.05) ** 2)) + 0.2 * Math.exp(-((v / 0.19) ** 2))

  const bursts = [
    { c: 0.11, w: 0.058, amp: 0.44, f: 3.0, g: 0.82 },
    { c: 0.3, w: 0.044, amp: 0.28, f: 4.8, g: 0.6 },
    { c: 0.51, w: 0.076, amp: 0.66, f: 2.4, g: 1.0 },
    { c: 0.7, w: 0.05, amp: 0.34, f: 4.1, g: 0.68 },
    { c: 0.88, w: 0.066, amp: 0.5, f: 3.1, g: 0.8 },
  ]

  for (const b of bursts) {
    const env = Math.exp(-(((t - b.c) / b.w) ** 2))
    if (env < 0.004) continue
    const d = b.amp * Math.sin(2 * Math.PI * b.f * (t - b.c))
    a += b.g * env * Math.exp(-(((v - d) / 0.055) ** 2)) // hand
    a += 0.44 * b.g * env * Math.exp(-(((v - d * 0.5) / 0.045) ** 2)) // forearm
    a += 0.26 * b.g * env * Math.exp(-(((v + d * 0.34) / 0.05) ** 2)) // mirror
  }
  return a
}

function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

type Ramp = [number, number, number][]

function readRamp(el: HTMLElement): Ramp {
  const cs = getComputedStyle(el)
  // Tokens are stored as "R G B" channels (see globals.css).
  return (['--band-1', '--band-2', '--band-3'] as const).map((name) => {
    const [r, g, b] = cs
      .getPropertyValue(name)
      .trim()
      .split(/[\s,]+/)
      .map(Number)
    return [r || 0, g || 0, b || 0] as [number, number, number]
  })
}

export function HeroSpectrogram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bufferRef = useRef<HTMLCanvasElement | null>(null)
  const rampRef = useRef<Ramp | null>(null)
  const progressRef = useRef(0)
  const pointerRef = useRef(0) // -1 .. 1
  const sizeRef = useRef({ w: 0, h: 0 })

  /** Paint the field into the offscreen buffer at grid resolution. */
  const paintBuffer = useCallback(() => {
    const buf = bufferRef.current
    const bctx = buf?.getContext('2d')
    const ramp = rampRef.current
    if (!buf || !bctx || !ramp) return

    const img = bctx.createImageData(COLS, ROWS)
    const data = img.data
    const p = progressRef.current

    for (let row = 0; row < ROWS; row++) {
      const v = (row / (ROWS - 1)) * 2 - 1
      for (let col = 0; col < COLS; col++) {
        const t = col / (COLS - 1)

        // Structure resolves left to right behind a soft edge.
        const edge = 0.24
        const mix = easeOutCubic(
          Math.max(0, Math.min(1, (p * (1 + edge) - t + edge) / edge)),
        )

        const target = signal(t, v)
        const noise = hash(col, row) * 0.5 + hash(col * 0.5, row * 3.1) * 0.22
        const a = noise * (1 - mix) + target * mix

        // Intensity drives both hue position and opacity, so the field fades
        // into the page background instead of sitting on a plate.
        const x = Math.max(0, Math.min(1, a)) * (ramp.length - 1)
        const i = Math.min(ramp.length - 2, Math.floor(x))
        const f = x - i
        const [r1, g1, b1] = ramp[i]
        const [r2, g2, b2] = ramp[i + 1]

        const o = (row * COLS + col) * 4
        data[o] = r1 + (r2 - r1) * f
        data[o + 1] = g1 + (g2 - g1) * f
        data[o + 2] = b1 + (b2 - b1) * f
        data[o + 3] = smoothstep(0.02, 0.5, a) * 255
      }
    }
    bctx.putImageData(img, 0, 0)
  }, [])

  /** Draw the buffer up in horizontal strips, each on its own parallax plane. */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const buf = bufferRef.current
    if (!canvas || !ctx || !buf) return

    const { w, h } = sizeRef.current
    if (w === 0 || h === 0) return

    ctx.clearRect(0, 0, w, h)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const px = pointerRef.current
    const rowsPerStrip = ROWS / STRIPS
    const hPerStrip = h / STRIPS

    for (let s = 0; s < STRIPS; s++) {
      // Depth: strips nearest the centre line sit closest and travel furthest.
      const centre = (s + 0.5) / STRIPS
      const depth = 1 - Math.abs(centre - 0.5) * 2
      const shift = px * PARALLAX_MAX * (0.3 + 0.7 * depth)

      ctx.drawImage(
        buf,
        0,
        s * rowsPerStrip,
        COLS,
        rowsPerStrip,
        shift,
        s * hPerStrip,
        w,
        hPerStrip + 1,
      )
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    rampRef.current = readRamp(root)
    const buf = document.createElement('canvas')
    buf.width = COLS
    buf.height = ROWS
    bufferRef.current = buf

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w: rect.width, h: rect.height }
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let raf = 0
    if (reduce) {
      // Reduced motion: the resolved final state, immediately.
      progressRef.current = 1
      paintBuffer()
      draw()
    } else {
      const start = performance.now()
      const tick = (now: number) => {
        progressRef.current = Math.min(1, (now - start) / RESOLVE_MS)
        paintBuffer()
        draw()
        if (progressRef.current < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Repaint on theme change: the ramp comes from CSS custom properties.
    const mo = new MutationObserver(() => {
      rampRef.current = readRamp(root)
      paintBuffer()
      draw()
    })
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })

    // Cursor-reactive depth. Mouse only, and never under reduced motion.
    let pending = false
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = Math.max(
        -1,
        Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1),
      )
      if (pending) return
      pending = true
      requestAnimationFrame(() => {
        pending = false
        draw()
      })
    }
    const onLeave = () => {
      pointerRef.current = 0
      draw()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [draw, paintBuffer])

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
}

"""
Renders public/og.png, the Open Graph card, from the same micro-Doppler signal
model the home hero uses (components/hero-spectrogram.tsx). Re-run after
changing the palette or the tagline:

    python3 scripts/generate-og.py
"""

import math
import os

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (255, 255, 255)
INK = (26, 22, 20)
INK_MUTED = (107, 98, 94)
BANDS = [(232, 196, 199), (201, 106, 116), (163, 22, 33)]  # accent-soft -> accent

NAME = "Michael Adeleke"
LINE = "Radar sensing, micro-Doppler signal processing,"
LINE2 = "and accessible machine learning education."
ROLE = "PhD student in Computer Science, The University of Alabama"

BURSTS = [
    (0.11, 0.058, 0.44, 3.0, 0.82),
    (0.30, 0.044, 0.28, 4.8, 0.60),
    (0.51, 0.076, 0.66, 2.4, 1.00),
    (0.70, 0.050, 0.34, 4.1, 0.68),
    (0.88, 0.066, 0.50, 3.1, 0.80),
]


def signal(t: float, v: float) -> float:
    a = 0.92 * math.exp(-((v / 0.05) ** 2)) + 0.2 * math.exp(-((v / 0.19) ** 2))
    for c, w, amp, f, g in BURSTS:
        env = math.exp(-(((t - c) / w) ** 2))
        if env < 0.004:
            continue
        d = amp * math.sin(2 * math.pi * f * (t - c))
        a += g * env * math.exp(-(((v - d) / 0.055) ** 2))
        a += 0.44 * g * env * math.exp(-(((v - d * 0.5) / 0.045) ** 2))
        a += 0.26 * g * env * math.exp(-(((v + d * 0.34) / 0.05) ** 2))
    return a


def ramp(a: float):
    a = max(0.0, min(1.0, a))
    x = a * (len(BANDS) - 1)
    i = min(len(BANDS) - 2, int(x))
    f = x - i
    return tuple(round(BANDS[i][k] + (BANDS[i + 1][k] - BANDS[i][k]) * f) for k in range(3))


def smoothstep(lo: float, hi: float, x: float) -> float:
    t = max(0.0, min(1.0, (x - lo) / (hi - lo)))
    return t * t * (3 - 2 * t)


def font(size: int, bold: bool = False):
    candidates = (
        ["/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/Library/Fonts/Arial Bold.ttf"]
        if bold
        else ["/System/Library/Fonts/Supplemental/Arial.ttf", "/Library/Fonts/Arial.ttf"]
    )
    candidates.append("/System/Library/Fonts/Helvetica.ttc")
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


# Spectrogram band across the lower third, matching the hero's composition.
COLS, ROWS = 480, 128
band = Image.new("RGBA", (COLS, ROWS), (0, 0, 0, 0))
px = band.load()
for row in range(ROWS):
    v = (row / (ROWS - 1)) * 2 - 1
    for col in range(COLS):
        a = signal(col / (COLS - 1), v)
        r, g, b = ramp(a)
        px[col, row] = (r, g, b, round(smoothstep(0.02, 0.5, a) * 255))

band = band.resize((W, 236), Image.LANCZOS)

img = Image.new("RGB", (W, H), BG)
img.paste(band, (0, H - 236), band)

# Fade the band out under the type, as the hero's gradient does.
fade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
fd = ImageDraw.Draw(fade)
for x in range(W):
    alpha = round(255 * max(0.0, 1 - (x / (W * 0.62))))
    fd.line([(x, 0), (x, H)], fill=(*BG, alpha))
img = Image.alpha_composite(img.convert("RGBA"), fade).convert("RGB")

d = ImageDraw.Draw(img)
d.text((72, 150), NAME, font=font(76, bold=True), fill=INK)
d.text((72, 268), LINE, font=font(32), fill=INK)
d.text((72, 312), LINE2, font=font(32), fill=INK)
d.text((72, 380), ROLE, font=font(24), fill=INK_MUTED)

img.save("public/og.png", optimize=True)
print(f"wrote public/og.png ({os.path.getsize('public/og.png') // 1024} KB)")

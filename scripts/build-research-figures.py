"""
Builds the SensDS walkthrough figures for /research/sensdsv2 from the master
recordings in media/.

    python3 scripts/build-research-figures.py

For each figure it writes an animated WebP plus a still poster into
public/research/sensds/. The page shows the still and only fetches the
animation when the reader clicks, so four demos cost one image each on load.

Each clip is trimmed to the liveliest window rather than the full recording:
the raw captures run 48-74s of someone working through the interface, which
nobody watches. The window is chosen by inter-frame change, and frames are
screened for macOS UI intrusions (menus, the screen-recording toolbar) the
same way the hero capture is.
"""

import os
import sys

import numpy as np
from PIL import Image

OUT = "public/research/sensds"

# name -> (source, crop or None, target seconds, max width)
FIGURES = {
    "visualize": ("media/sensds-micro-doppler-capture.gif", None, 6.0, 1000),
    "collect": ("media/sensds-collect.gif", None, 10.0, 800),
    "train": ("media/sensds-train.gif", None, 10.0, 800),
    "test": ("media/sensds-test.gif", None, 10.0, 800),
}


def ui_score(frame):
    """Bright, desaturated pixels: macOS chrome, not app content."""
    a = np.asarray(frame.convert("RGB").resize((320, 160)), dtype=np.int16)
    mx, mn = a.max(axis=2), a.min(axis=2)
    return int(((mx > 200) & ((mx - mn) < 25)).sum())


def build(name, src, crop, seconds, max_w):
    if not os.path.exists(src):
        print(f"  SKIP {name}: {src} not found")
        return
    im = Image.open(src)
    n = im.n_frames
    per = im.info.get("duration", 70) or 70
    want = max(1, int(seconds * 1000 / per))

    # Per-frame activity and UI score, on a cheap downsample.
    small, ui = [], []
    for i in range(n):
        im.seek(i)
        f = im.convert("RGB")
        if crop:
            f = f.crop(crop)
        small.append(np.asarray(f.resize((80, 40)), dtype=np.int16))
        ui.append(ui_score(f))
    ui = np.array(ui)
    diff = np.array([0] + [int(np.abs(small[i] - small[i - 1]).sum()) for i in range(1, n)])

    clean_cap = np.percentile(ui, 25) + 40
    best, best_score = 0, -1
    for s in range(0, max(1, n - want)):
        w = slice(s, s + want)
        if ui[w].max() > clean_cap:
            continue
        score = diff[w].mean()
        if score > best_score:
            best, best_score = s, score
    if best_score < 0:
        best = 0
        print(f"  {name}: no fully clean window, using the start")

    step = 1 if per >= 60 else 2
    frames = []
    for i in range(best, min(n, best + want), step):
        im.seek(i)
        f = im.convert("RGB")
        if crop:
            f = f.crop(crop)
        if f.size[0] > max_w:
            f = f.resize((max_w, round(max_w * f.size[1] / f.size[0])), Image.LANCZOS)
        frames.append(f)

    os.makedirs(OUT, exist_ok=True)
    anim = f"{OUT}/{name}.webp"
    still = f"{OUT}/{name}-still.webp"
    frames[0].save(anim, save_all=True, append_images=frames[1:],
                   duration=per * step, loop=0, quality=58, method=6)
    frames[0].save(still, quality=82, method=6)
    print(f"  {name:10s} {frames[0].size[0]}x{frames[0].size[1]}  "
          f"{len(frames)}f  {len(frames)*per*step/1000:.1f}s  "
          f"{os.path.getsize(anim)/1024:.0f} KB (still {os.path.getsize(still)/1024:.0f} KB)  "
          f"from frame {best}")


if __name__ == "__main__":
    only = sys.argv[1:] or list(FIGURES)
    for name in only:
        src, crop, secs, w = FIGURES[name]
        build(name, src, crop, secs, w)

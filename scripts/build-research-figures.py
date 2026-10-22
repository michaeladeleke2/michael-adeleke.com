"""
Builds the SensDS walkthrough for /research/sensdsv2 from the master recording
in media/.

    python3 -m pip install imageio imageio-ffmpeg   # once
    python3 scripts/build-research-figures.py

Outputs public/research/sensds/tour.mp4 and tour-still.webp.

A single tour rather than one demo per tab: it moves through the interface a
few seconds at a time, which is enough to show the range without turning the
page into documentation. The earlier per-tab captures were 400px wide and
upscaled past the point where any of their text was readable.

H.264 rather than animated WebP for the same reason as the hero: a WebP is
decoded frame by frame on the CPU and visibly stutters at this size.
"""

import os
import sys

import numpy as np
from PIL import Image

try:
    import imageio.v2 as iio
except ImportError:
    sys.exit("Needs: python3 -m pip install imageio imageio-ffmpeg")

SOURCE = "media/sensds-web-tour.gif"
OUT = "public/research/sensds"
# Everything above this is browser chrome: tab bar, address bar, the
# "Not Secure" badge, the extension buttons. None of it belongs on the page.
CROP = (0, 72, 1211, 760)
WIDTH = 1208          # divisible by 8, close to native
FPS = 14
CRF = 27
DEDUPE_FRAC = 0.05    # share of the MEAN change; see CLAUDE.md on why not median


def main():
    if not os.path.exists(SOURCE):
        sys.exit(f"Source not found: {SOURCE}")
    im = Image.open(SOURCE)
    n = im.n_frames
    frames = []
    for i in range(n):
        im.seek(i)
        frames.append(np.asarray(im.convert("RGB").crop(CROP)))

    keys = [f[::6, ::6].astype(np.int16) for f in frames]
    deltas = [float(np.abs(keys[i] - keys[i - 1]).mean()) for i in range(1, len(keys))]
    moving = [d for d in deltas if d > 0]
    floor = (sum(moving) / len(moving)) * DEDUPE_FRAC if moving else 0.0
    uniq, prev = [frames[0]], keys[0]
    for f, k in zip(frames[1:], keys[1:]):
        if float(np.abs(k - prev).mean()) > floor:
            uniq.append(f)
            prev = k

    h = round(WIDTH * uniq[0].shape[0] / uniq[0].shape[1])
    h -= h % 2
    out = [np.asarray(Image.fromarray(f).resize((WIDTH, h), Image.LANCZOS)) for f in uniq]

    os.makedirs(OUT, exist_ok=True)
    iio.mimwrite(
        f"{OUT}/tour.mp4", out, fps=FPS, codec="libx264", macro_block_size=2,
        ffmpeg_params=["-crf", str(CRF), "-pix_fmt", "yuv420p",
                       "-movflags", "+faststart", "-preset", "slow"],
    )
    Image.fromarray(out[0]).save(f"{OUT}/tour-still.webp", quality=82, method=6)

    print(f"source: {SOURCE}  {n} frames")
    print(f"  crop {CROP} -> {uniq[0].shape[1]}x{uniq[0].shape[0]}")
    print(f"  unique frames: {len(uniq)}")
    print(f"  {WIDTH}x{h} @ {FPS}fps = {len(out)/FPS:.1f}s")
    for p in (f"{OUT}/tour.mp4", f"{OUT}/tour-still.webp"):
        print(f"  wrote {p} ({os.path.getsize(p)/1024:.0f} KB)")


if __name__ == "__main__":
    main()

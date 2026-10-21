"""
Builds the home hero assets, and the Open Graph card, from the master screen
recording in media/.

    python3 scripts/build-hero-capture.py

Needs a video decoder:  python3 -m pip install imageio imageio-ffmpeg
(imageio-ffmpeg bundles its own static ffmpeg, so nothing is installed
system-wide.)

Outputs:
  public/hero/capture.mp4         looping H.264 video, hardware decoded
  public/hero/capture-still.webp  first frame: the poster, and what reduced
                                  motion gets
  public/og.png                   Open Graph card, from a real frame

What the processing does, and why:
  - Crops to a 5.4:1 band centred on the signal. The raw frame is 16:9 and
    mostly empty navy above and below; the band is the shape the hero layout
    wants and the shape the site's whole visual language is built on.
  - Picks the liveliest window rather than the opening seconds, scored by
    inter-frame change.
  - Eases out. Frames near the end are repeated progressively more times;
    PIL merges identical consecutive frames and sums their durations, so the
    capture decelerates into its final frame instead of stopping dead.
"""

import glob
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

try:
    import imageio.v2 as iio
except ImportError:
    sys.exit("Needs: python3 -m pip install imageio imageio-ffmpeg")

DEFAULT_SOURCE = "media/sensds-hero-capture.mov"

# The recording is variable-rate: the container reports ~14fps but the plot
# only redraws about 1.5 times a second, so roughly twelve of every thirteen
# decoded frames are exact duplicates. Everything below works on unique frames
# only, and plays them at the hero's own pace. That compresses the full
# recording into a few seconds, which is the point: more of the signal is seen.
OUT_W = 1400
BAND = 5.38            # output aspect ratio, matching the hero layout
CENTRE = 0.465         # vertical centre of the signal, as a fraction of height
FPS = 12               # constant rate; the loop has no ease, so it rejoins cleanly
MAX_FRAMES = 60        # 5s at 12fps
CRF = 26               # x264 quality; 66 KB at 1400x260


def load(path):
    if not os.path.exists(path):
        hits = [f for f in glob.glob("media/*.mov") + glob.glob("media/*.gif")]
        sys.exit(f"Source not found: {path}\nIn media/: {hits}")
    return path


def read_frames(path):
    r = iio.get_reader(path)
    meta = r.get_meta_data()
    fps = meta["fps"]
    total = int(fps * meta["duration"])
    frames = []
    for i in range(total):
        try:
            frames.append(r.get_data(i))
        except Exception:
            break
    r.close()
    return frames, fps


def crop_box(h, w):
    band_h = int(round(w / BAND))
    top = int(round(h * CENTRE - band_h / 2))
    top = max(0, min(h - band_h, top))
    return (0, top, w, top + band_h)


def liveliest(frames, want):
    """Start index of the run of `want` frames with the most change in it."""
    if len(frames) <= want:
        return 0
    small = [f[::8, ::8].astype(np.int16) for f in frames]
    diff = np.array([0] + [int(np.abs(small[i] - small[i - 1]).sum())
                           for i in range(1, len(small))])
    best, score = 0, -1.0
    for s in range(0, len(frames) - want):
        m = diff[s:s + want].mean()
        if m > score:
            best, score = s, m
    return best


def dedupe(frames):
    """Drop consecutive duplicates left by the variable-rate recording."""
    out, prev = [], None
    for f in frames:
        key = f[::4, ::4].astype(np.int16)
        if prev is None or np.abs(key - prev).sum() > 0:
            out.append(f)
            prev = key
    return out


def main(src):
    frames, fps = read_frames(load(src))
    h, w, _ = frames[0].shape
    box = crop_box(h, w)
    uniq = dedupe(frames)
    print(f"source: {src}")
    print(f"  {w}x{h}, {len(frames)} decoded frames @ {fps:.1f}fps nominal")
    print(f"  unique frames: {len(uniq)}  (~{len(uniq)/ (len(frames)/fps):.2f} real updates/sec)")
    print(f"  crop {box} -> {box[2]-box[0]}x{box[3]-box[1]} ({BAND:.2f}:1)")

    start = liveliest(uniq, MAX_FRAMES)
    uniq = uniq[start:start + MAX_FRAMES]
    print(f"  keeping {len(uniq)} from index {start}")

    out_h = round(OUT_W * (box[3] - box[1]) / (box[2] - box[0]))
    picked = [
        Image.fromarray(f).crop(box).resize((OUT_W, out_h), Image.LANCZOS)
        for f in uniq
    ]

    os.makedirs("public/hero", exist_ok=True)
    # H.264 rather than animated WebP: a WebP is decoded frame by frame on the
    # CPU, which is what made this stutter. A video element is hardware
    # decoded, loops natively, and is a fraction of the size.
    iio.mimwrite(
        "public/hero/capture.mp4",
        [np.asarray(f) for f in picked],
        fps=FPS,
        codec="libx264",
        macro_block_size=2,
        ffmpeg_params=[
            "-crf", str(CRF),
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            "-preset", "slow",
        ],
    )
    picked[0].save("public/hero/capture-still.webp", quality=82, method=6)
    for p in ("public/hero/capture.mp4", "public/hero/capture-still.webp"):
        print(f"  wrote {p} ({os.path.getsize(p)/1024:.0f} KB)")
    print(f"  {OUT_W}x{out_h}, {len(picked)} frames @ {FPS}fps = {len(picked)/FPS:.1f}s loop")

    build_og(picked[len(picked) // 2])


def font(size, bold=False):
    names = ["Arial Bold.ttf", "Helvetica.ttc"] if bold else ["Arial.ttf", "Helvetica.ttc"]
    for n in names:
        for d in ("/System/Library/Fonts/Supplemental/", "/System/Library/Fonts/", "/Library/Fonts/"):
            if os.path.exists(d + n):
                try:
                    return ImageFont.truetype(d + n, size)
                except OSError:
                    continue
    return ImageFont.load_default()


def build_og(band):
    W, H = 1200, 630
    BG, INK, MUTED = (255, 255, 255), (26, 22, 20), (107, 98, 94)
    b = band.resize((W, round(W * band.size[1] / band.size[0])), Image.LANCZOS)
    img = Image.new("RGB", (W, H), BG)
    img.paste(b, (0, H - b.size[1]))
    d = ImageDraw.Draw(img)
    d.text((72, 150), "Michael Adeleke", font=font(76, bold=True), fill=INK)
    d.text((72, 268), "I build interactive technologies", font=font(32), fill=INK)
    d.text((72, 312), "that make AI tangible.", font=font(32), fill=INK)
    d.text((72, 380), "PhD student in Computer Science, The University of Alabama",
           font=font(24), fill=MUTED)
    img.save("public/og.png", optimize=True)
    print(f"  wrote public/og.png ({os.path.getsize('public/og.png')/1024:.0f} KB)")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE)

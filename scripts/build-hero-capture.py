"""
Builds the home hero assets from the raw SensDS screen recording.

    python3 scripts/build-hero-capture.py [path/to/recording.gif]

The master recording is tracked in the repo at
media/sensds-micro-doppler-capture.gif, so the assets below can always be
rebuilt from source.

Outputs:
  public/hero/capture.webp        animated, plays once and holds the last frame
  public/hero/capture-still.webp  first frame, the poster and the
                                  reduced-motion rendering
  public/og.png                   Open Graph card, built from a real frame

What the processing does, and why:
  - Keeps only frames 0-199. Later frames carry a mouse cursor, a macOS
    system menu over the plot, and a flat tail where the recording is
    being stopped.
  - Crops to the plot interior at roughly +/-2.5 m/s. The full plot is about
    80% empty navy and carries a stray mouse cursor in the upper right; the
    crop removes both and turns the capture into the horizontal band the
    site's design is built around.
  - Drops to every 3rd frame (16.7fps). The data is a discrete FFT waterfall,
    so it does not read as dropped motion, and it takes the asset from
    15.3 MB to under 500 KB.
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

DEFAULT_SOURCE = "media/sensds-micro-doppler-capture.gif"

# Frames 0-199 are the only stretch free of every piece of UI. Past frame 200
# a mouse cursor drifts through the band, around frame 342 a macOS system menu
# ("Screen Saver", "Lock Screen") drops over the middle of the plot, and from
# roughly frame 386 the signal is flat because the recording is being stopped.
FIRST_FRAME = 0
LAST_FRAME = 200
CROP = (120, 401, 3015, 939)  # plot interior, ~+/-2.5 m/s
STEP = 3  # every 3rd frame -> 16.7fps
FRAME_MS = 60
WIDTH = 1400
QUALITY = 50


def load_source(path: str) -> Image.Image:
    if not os.path.exists(path):
        sys.exit(
            f"Source recording not found: {path}\n"
            "The master recording is tracked in the repo at "
            "media/sensds-micro-doppler-capture.gif."
        )
    print(f"source: {path}")
    return Image.open(path)


def frames(im: Image.Image):
    for i in range(FIRST_FRAME, LAST_FRAME, STEP):
        im.seek(i)
        f = im.convert("RGB").crop(CROP)
        h = round(WIDTH * f.size[1] / f.size[0])
        yield f.resize((WIDTH, h), Image.LANCZOS)


def build_capture(im: Image.Image):
    fs = list(frames(im))
    os.makedirs("public/hero", exist_ok=True)

    # loop=1 plays the sequence once and holds the final frame.
    fs[0].save(
        "public/hero/capture.webp",
        save_all=True,
        append_images=fs[1:],
        duration=FRAME_MS,
        loop=0,
        quality=QUALITY,
        method=6,
    )
    fs[0].save("public/hero/capture-still.webp", quality=82, method=6)

    for p in ("public/hero/capture.webp", "public/hero/capture-still.webp"):
        print(f"wrote {p} ({os.path.getsize(p) / 1024:.0f} KB)")
    print(f"dimensions: {fs[0].size[0]}x{fs[0].size[1]}, {len(fs)} frames")
    return fs[0].size


def font(size: int, bold: bool = False):
    names = (
        ["Arial Bold.ttf", "Helvetica.ttc"] if bold else ["Arial.ttf", "Helvetica.ttc"]
    )
    for n in names:
        for d in ("/System/Library/Fonts/Supplemental/", "/System/Library/Fonts/", "/Library/Fonts/"):
            if os.path.exists(d + n):
                try:
                    return ImageFont.truetype(d + n, size)
                except OSError:
                    continue
    return ImageFont.load_default()


def build_og(im: Image.Image):
    """Open Graph card, using a real capture frame rather than a synthetic one."""
    W, H = 1200, 630
    BG, INK, INK_MUTED = (255, 255, 255), (26, 22, 20), (107, 98, 94)

    im.seek(95)  # the busiest clean frame
    band = im.convert("RGB").crop(CROP)
    band = band.resize((W, round(W * band.size[1] / band.size[0])), Image.LANCZOS)

    img = Image.new("RGB", (W, H), BG)
    img.paste(band, (0, H - band.size[1]))

    d = ImageDraw.Draw(img)
    d.text((72, 132), "Michael Adeleke", font=font(76, bold=True), fill=INK)
    d.text((72, 250), "Radar sensing, micro-Doppler signal processing,", font=font(32), fill=INK)
    d.text((72, 294), "and accessible machine learning education.", font=font(32), fill=INK)
    d.text((72, 362), "PhD student in Computer Science, The University of Alabama", font=font(24), fill=INK_MUTED)

    img.save("public/og.png", optimize=True)
    print(f"wrote public/og.png ({os.path.getsize('public/og.png') / 1024:.0f} KB)")


if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE
    im = load_source(src)
    build_capture(im)
    build_og(im)

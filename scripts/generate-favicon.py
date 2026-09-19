"""Sharp desktop favicon: bold geometric M that fills the square."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / 'public'
ICONS = ROOT / 'icons'
ICONS.mkdir(exist_ok=True)

CREAM = (248, 246, 243, 255)
NAVY = (26, 42, 74, 255)


def draw_geometric_m(size: int) -> Image.Image:
    """Vector-ish M with thick strokes — readable at 16px."""
    # Render large then downscale for clean edges on bigger sizes;
    # for tiny sizes draw directly on the pixel grid.
    if size <= 48:
        return _draw_m_pixels(size)
    big = _draw_m_pixels(size * 4)
    return big.resize((size, size), Image.Resampling.LANCZOS)


def _draw_m_pixels(size: int) -> Image.Image:
    img = Image.new('RGBA', (size, size), CREAM)
    d = ImageDraw.Draw(img)

    # Margins ~8% so letter fills the tab icon
    pad = max(1, int(round(size * 0.08)))
    left = pad
    right = size - pad - 1
    top = pad
    bottom = size - pad - 1
    width = right - left
    height = bottom - top

    # Stroke thickness ~18–22% of width
    t = max(2, int(round(width * 0.20)))
    mid = left + width // 2

    # Left stem
    d.rectangle([left, top, left + t - 1, bottom], fill=NAVY)
    # Right stem
    d.rectangle([right - t + 1, top, right, bottom], fill=NAVY)

    # Diagonals toward center valley
    # Approximate with thick polygon fills
    half_gap = max(1, t // 2)
    # Left diagonal: top-left inner -> center
    d.polygon(
        [
            (left + t - 1, top),
            (left + t - 1 + t, top),
            (mid + half_gap, bottom),
            (mid - half_gap, bottom),
        ],
        fill=NAVY,
    )
    # Right diagonal
    d.polygon(
        [
            (right - t + 1 - t, top),
            (right - t + 1, top),
            (mid + half_gap, bottom),
            (mid - half_gap, bottom),
        ],
        fill=NAVY,
    )

    # Soften center peak join
    peak_w = max(2, t)
    d.rectangle(
        [mid - peak_w // 2, bottom - t, mid + peak_w // 2, bottom],
        fill=NAVY,
    )
    return img


def draw_serif_m(size: int) -> Image.Image:
    img = Image.new('RGBA', (size, size), CREAM)
    d = ImageDraw.Draw(img)
    font = None
    for name in (
        'C:/Windows/Fonts/georgiab.ttf',
        'C:/Windows/Fonts/georgia.ttf',
        'C:/Windows/Fonts/timesbd.ttf',
        'C:/Windows/Fonts/arialbd.ttf',
    ):
        try:
            font = ImageFont.truetype(name, int(size * 0.82))
            break
        except OSError:
            continue
    if font is None:
        return draw_geometric_m(size)
    text = 'M'
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] - size * 0.03
    d.text((x, y), text, font=font, fill=NAVY)
    return img


def main() -> None:
    names = {
        16: 'icon_16x16.png',
        32: 'icon_32x32.png',
        48: 'icon_48x48.png',
        64: 'icon_64x64.png',
        72: 'icon-72x72.png',
        96: 'icon-96x96.png',
        128: 'icon-128x128.png',
        144: 'icon-144x144.png',
        152: 'icon-152x152.png',
        180: 'icon_180x180.png',
        192: 'icon_192x192.png',
        256: 'icon_256x256.png',
        384: 'icon-384x384.png',
        512: 'icon_512x512.png',
    }

    for size, name in names.items():
        # Geometric for tiny tabs; serif for larger app icons (RH-like)
        out = draw_geometric_m(size) if size <= 64 else draw_serif_m(size)
        out.save(ICONS / name, 'PNG')
        print('wrote', name)

    draw_serif_m(192).save(ICONS / 'icon-192x192.png', 'PNG')
    draw_serif_m(512).save(ICONS / 'icon-512x512.png', 'PNG')
    draw_serif_m(180).save(ROOT / 'apple-touch-icon.png', 'PNG')
    draw_geometric_m(32).save(ROOT / 'icon.png', 'PNG')

    ico = [draw_geometric_m(s) for s in (16, 32, 48)]
    ico[-1].save(
        ROOT / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico[:-1],
    )
    print('wrote favicon.ico')

    # SVG geometric M — crisp on retina desktop
    svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Myy Space Furniture">
  <rect width="32" height="32" fill="#f8f6f3"/>
  <path fill="#1a2a4a" d="
    M3.5 4.5 H9.2 L16 20.2 L22.8 4.5 H28.5 V27.5 H23.2 V12.8 L17.8 27.5 H14.2 L8.8 12.8 V27.5 H3.5 Z
  "/>
</svg>
'''
    (ROOT / 'favicon.svg').write_text(svg, encoding='utf-8')
    print('wrote favicon.svg')
    print('done')


if __name__ == '__main__':
    main()

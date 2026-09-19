"""Build high-contrast favicon + icons from the Myy Space logo."""
from pathlib import Path
from PIL import Image
import base64
from io import BytesIO

ROOT = Path(__file__).resolve().parents[1] / 'public'
ICONS = ROOT / 'icons'
ICONS.mkdir(exist_ok=True)

NAVY = (15, 28, 52, 255)       # dark tile — readable on Chrome tabs
CREAM = (248, 246, 243, 255)
WHITE = (255, 255, 255, 255)
TAN = (196, 158, 112, 255)

SRC = ROOT / 'logo-new.png'
if not SRC.exists():
    SRC = ROOT / 'logo.png'


def content_bbox(img: Image.Image, threshold: int = 55):
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 25 or (r + g + b) < threshold:
                continue
            if r > 230 and g > 230 and b > 220:
                continue
            found = True
            minx, miny = min(minx, x), min(miny, y)
            maxx, maxy = max(maxx, x), max(maxy, y)
    if not found:
        return (0, 0, w - 1, h - 1)
    return (minx, miny, maxx, maxy)


def crop_mark(src: Image.Image) -> Image.Image:
    """House + chair mark, then padded to a square so it fills the favicon."""
    minx, miny, maxx, maxy = content_bbox(src)
    cut_y = miny + int((maxy - miny) * 0.42)
    inset = int((maxx - minx) * 0.08)
    box = (
        max(0, minx + inset),
        max(0, miny - 8),
        min(src.width, maxx - inset + 1),
        min(src.height, cut_y + 6),
    )
    mark = src.crop(box).convert('RGBA')
    # Pad to square so fit_contain keeps the whole mark large
    w, h = mark.size
    side = max(w, h)
    squared = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    squared.paste(mark, ((side - w) // 2, (side - h) // 2), mark)
    return squared


def crop_full(src: Image.Image) -> Image.Image:
    minx, miny, maxx, maxy = content_bbox(src)
    pad = 10
    box = (
        max(0, minx - pad),
        max(0, miny - pad),
        min(src.width, maxx + pad + 1),
        min(src.height, maxy + pad + 1),
    )
    full = src.crop(box).convert('RGBA')
    w, h = full.size
    side = max(w, h)
    squared = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    squared.paste(full, ((side - w) // 2, (side - h) // 2), full)
    return squared


def to_light_on_navy(img: Image.Image) -> Image.Image:
    """Turn logo ink into white/tan on a navy tile (header-style contrast)."""
    out = Image.new('RGBA', img.size, (0, 0, 0, 0))
    px, op = img.load(), out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 25 or (r + g + b) < 40:
                continue
            if r > 90 and g > 60 and b < 140 and r >= g and r > b + 20:
                op[x, y] = TAN
            else:
                op[x, y] = WHITE
    return out


def fit_cover(img: Image.Image, size: int, fill_ratio: float = 0.86, bg=NAVY) -> Image.Image:
    """Scale to cover the tile so the mark fills the favicon."""
    canvas = Image.new('RGBA', (size, size), bg)
    mw, mh = img.size
    inner = max(1, int(size * fill_ratio))
    scale = max(inner / mw, inner / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - inner) // 2
    top = (nh - inner) // 2
    cropped = resized.crop((left, top, left + inner, top + inner))
    offset = (size - inner) // 2
    canvas.paste(cropped, (offset, offset), cropped)
    return canvas


def fit_contain(img: Image.Image, size: int, fill_ratio: float = 0.86, bg=NAVY) -> Image.Image:
    """Scale to fit full logo wordmark inside the tile."""
    canvas = Image.new('RGBA', (size, size), bg)
    max_inner = int(size * fill_ratio)
    mw, mh = img.size
    scale = min(max_inner / mw, max_inner / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def fit_square(img: Image.Image, size: int, fill_ratio: float = 0.86, bg=NAVY, mode: str = 'cover') -> Image.Image:
    if mode == 'contain':
        return fit_contain(img, size, fill_ratio, bg)
    return fit_cover(img, size, fill_ratio, bg)

def main() -> None:
    src = Image.open(SRC).convert('RGBA')
    print('source', SRC, src.size)

    mark = to_light_on_navy(crop_mark(src))
    full = to_light_on_navy(crop_full(src))
    print('mark', mark.size, 'full', full.size)

    # ALL sizes use the logo mark on navy for consistent tab recognition.
    # Full wordmark only for very large apple/PWA sizes where text can read.
    names = {
        16: ('icon_16x16.png', mark, 0.94, 'contain'),
        32: ('icon_32x32.png', mark, 0.92, 'contain'),
        48: ('icon_48x48.png', mark, 0.92, 'contain'),
        64: ('icon_64x64.png', mark, 0.90, 'contain'),
        72: ('icon-72x72.png', mark, 0.90, 'contain'),
        96: ('icon-96x96.png', mark, 0.90, 'contain'),
        128: ('icon-128x128.png', mark, 0.88, 'contain'),
        144: ('icon-144x144.png', mark, 0.88, 'contain'),
        152: ('icon-152x152.png', mark, 0.88, 'contain'),
        180: ('icon_180x180.png', full, 0.86, 'contain'),
        192: ('icon_192x192.png', full, 0.86, 'contain'),
        256: ('icon_256x256.png', full, 0.86, 'contain'),
        384: ('icon-384x384.png', full, 0.86, 'contain'),
        512: ('icon_512x512.png', full, 0.86, 'contain'),
    }

    for size, (name, asset, fill, mode) in names.items():
        fit_square(asset, size, fill, mode=mode).save(ICONS / name, 'PNG')
        print('wrote', name)

    fit_square(full, 192, 0.86, mode='contain').save(ICONS / 'icon-192x192.png', 'PNG')
    fit_square(full, 512, 0.86, mode='contain').save(ICONS / 'icon-512x512.png', 'PNG')
    fit_square(full, 180, 0.86, mode='contain').save(ROOT / 'apple-touch-icon.png', 'PNG')
    fit_square(mark, 32, 0.92, mode='contain').save(ROOT / 'icon.png', 'PNG')

    ico = [fit_square(mark, s, 0.94 if s == 16 else 0.92, mode='contain') for s in (16, 32, 48)]
    ico[-1].save(
        ROOT / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico[:-1],
    )
    print('wrote favicon.ico')

    buf = BytesIO()
    fit_square(mark, 256, 0.90, mode='contain').save(buf, format='PNG')
    b64 = base64.b64encode(buf.getvalue()).decode('ascii')
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Myy Space Furniture">
  <rect width="256" height="256" rx="28" fill="#0f1c34"/>
  <image href="data:image/png;base64,{b64}" width="256" height="256"/>
</svg>
'''
    (ROOT / 'favicon.svg').write_text(svg, encoding='utf-8')
    print('wrote favicon.svg')
    print('done')


if __name__ == '__main__':
    main()

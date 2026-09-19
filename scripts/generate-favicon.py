"""Build favicon + PWA icons from the real Myy Space logo."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public'
ICONS = ROOT / 'icons'
ICONS.mkdir(exist_ok=True)

CREAM = (248, 246, 243, 255)

# Prefer higher-res logo if present
SRC = ROOT / 'logo-new.png'
if not SRC.exists():
    SRC = ROOT / 'logo.png'


def replace_black(img: Image.Image, threshold: int = 55) -> Image.Image:
    img = img.convert('RGBA')
    out = Image.new('RGBA', img.size, CREAM)
    px, op = img.load(), out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 25 or (r + g + b) < threshold:
                continue
            op[x, y] = (r, g, b, 255)
    return out


def content_bbox(img: Image.Image, threshold: int = 55):
    """Bounding box of logo ink (non-black, non-cream pixels)."""
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 25:
                continue
            # Skip near-black backgrounds
            if (r + g + b) < threshold:
                continue
            # Skip cream / near-white canvas
            if r > 230 and g > 230 and b > 220:
                continue
            found = True
            if x < minx:
                minx = x
            if y < miny:
                miny = y
            if x > maxx:
                maxx = x
            if y > maxy:
                maxy = y
    if not found:
        return (0, 0, w - 1, h - 1)
    return (minx, miny, maxx, maxy)


def crop_mark(src: Image.Image) -> Image.Image:
    """House + chair only (top of logo, before wordmark)."""
    minx, miny, maxx, maxy = content_bbox(src.convert('RGBA'))
    cut_y = miny + int((maxy - miny) * 0.45)
    inset = int((maxx - minx) * 0.06)
    box = (
        max(0, minx + inset),
        max(0, miny - 2),
        min(src.width, maxx - inset + 1),
        min(src.height, cut_y + 1),
    )
    return replace_black(src.crop(box))


def crop_full_logo(src: Image.Image) -> Image.Image:
    minx, miny, maxx, maxy = content_bbox(src.convert('RGBA'))
    pad = 8
    box = (
        max(0, minx - pad),
        max(0, miny - pad),
        min(src.width, maxx + pad + 1),
        min(src.height, maxy + pad + 1),
    )
    return replace_black(src.crop(box))


def fit_square(img: Image.Image, size: int, fill_ratio: float = 0.88) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), CREAM)
    max_inner = int(size * fill_ratio)
    mw, mh = img.size
    scale = min(max_inner / mw, max_inner / mh)
    nw = max(1, int(mw * scale))
    nh = max(1, int(mh * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def main() -> None:
    src = Image.open(SRC).convert('RGBA')
    print('source', SRC, src.size)

    mark = crop_mark(src)
    full = crop_full_logo(src)
    print('mark', mark.size, 'full', full.size)

    # Small tab icons: logo mark (house + chair)
    # Larger icons: full logo wordmark
    names = {
        16: ('icon_16x16.png', 'mark'),
        32: ('icon_32x32.png', 'mark'),
        48: ('icon_48x48.png', 'mark'),
        64: ('icon_64x64.png', 'mark'),
        72: ('icon-72x72.png', 'mark'),
        96: ('icon-96x96.png', 'mark'),
        128: ('icon-128x128.png', 'full'),
        144: ('icon-144x144.png', 'full'),
        152: ('icon-152x152.png', 'full'),
        180: ('icon_180x180.png', 'full'),
        192: ('icon_192x192.png', 'full'),
        256: ('icon_256x256.png', 'full'),
        384: ('icon-384x384.png', 'full'),
        512: ('icon_512x512.png', 'full'),
    }

    for size, (name, kind) in names.items():
        asset = mark if kind == 'mark' else full
        # Mark is wide — fill more of the square for tiny sizes
        fill = 0.94 if kind == 'mark' else 0.86
        out = fit_square(asset, size, fill_ratio=fill)
        out.save(ICONS / name, 'PNG')
        print('wrote', name)

    # Aliases
    fit_square(full, 192, 0.86).save(ICONS / 'icon-192x192.png', 'PNG')
    fit_square(full, 512, 0.86).save(ICONS / 'icon-512x512.png', 'PNG')
    fit_square(full, 180, 0.86).save(ROOT / 'apple-touch-icon.png', 'PNG')
    fit_square(mark, 32, 0.94).save(ROOT / 'icon.png', 'PNG')

    # favicon.ico from logo mark
    ico = [fit_square(mark, s, 0.94) for s in (16, 32, 48)]
    ico[-1].save(
        ROOT / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico[:-1],
    )
    print('wrote favicon.ico')

    # SVG wrapper referencing PNG mark (browsers that prefer SVG still get logo art)
    # Embed as data URI from 128px mark for sharpness
    import base64
    from io import BytesIO

    buf = BytesIO()
    fit_square(mark, 128, 0.94).save(buf, format='PNG')
    b64 = base64.b64encode(buf.getvalue()).decode('ascii')
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Myy Space Furniture">
  <rect width="128" height="128" fill="#f8f6f3"/>
  <image href="data:image/png;base64,{b64}" width="128" height="128"/>
</svg>
'''
    (ROOT / 'favicon.svg').write_text(svg, encoding='utf-8')
    print('wrote favicon.svg')
    print('done')


if __name__ == '__main__':
    main()

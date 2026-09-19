from PIL import Image
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'public'
icons_dir = root / 'icons'
icons_dir.mkdir(exist_ok=True)

src = Image.open(root / 'logo.png').convert('RGBA')
# Crop house + chair mark tightly
mark = src.crop((118, 126, 390, 226))

CREAM = (248, 246, 243, 255)


def on_cream(img: Image.Image) -> Image.Image:
    out = Image.new('RGBA', img.size, CREAM)
    px = img.load()
    op = out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # treat near-black / transparent as cream
            if a < 30 or (r + g + b) < 55:
                continue
            op[x, y] = (r, g, b, 255)
    return out


mark = on_cream(mark)


def make_square(img: Image.Image, size: int, pad_ratio: float = 0.14) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), CREAM)
    max_inner = int(size * (1 - 2 * pad_ratio))
    mw, mh = img.size
    scale = min(max_inner / mw, max_inner / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


outputs = {
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

for size, name in outputs.items():
    path = icons_dir / name
    make_square(mark, size).save(path, 'PNG')
    print('wrote', path)

# hyphen aliases expected by layout / older refs
make_square(mark, 192).save(icons_dir / 'icon-192x192.png', 'PNG')
make_square(mark, 512).save(icons_dir / 'icon-512x512.png', 'PNG')
make_square(mark, 180).save(root / 'apple-touch-icon.png', 'PNG')
make_square(mark, 32).save(root / 'icon.png', 'PNG')

ico_imgs = [make_square(mark, s).convert('RGBA') for s in (16, 32, 48)]
ico_imgs[0].save(
    root / 'favicon.ico',
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=ico_imgs[1:],
)
print('wrote favicon.ico')
print('done')

import sys, glob, os
from PIL import Image, ImageDraw
src, uit, pat = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else '*'
fs = sorted(glob.glob(os.path.join(src, pat + '.png')))
c, W, H = 3, 640, 360
for k in range(0, len(fs), 12):
    part = fs[k:k + 12]; r = (len(part) + c - 1) // c
    im = Image.new('RGB', (W * c, (H + 20) * r)); d = ImageDraw.Draw(im)
    for i, f in enumerate(part):
        x, y = (i % c) * W, (i // c) * (H + 20); im.paste(Image.open(f).resize((W, H)), (x, y + 20)); d.text((x + 4, y + 3), os.path.basename(f), fill=(255, 255, 0))
    im.save(f'{uit}_{k // 12 + 1}.png'); print(f'{uit}_{k // 12 + 1}.png', len(part))

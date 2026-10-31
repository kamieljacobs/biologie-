import sys, glob
from PIL import Image, ImageDraw
fs = sorted(glob.glob(sys.argv[1] + '/*.png')); out = sys.argv[2]; c = int(sys.argv[3]) if len(sys.argv) > 3 else 4
W, H = 480, 270; r = (len(fs) + c - 1) // c; im = Image.new('RGB', (W * c, (H + 18) * r), (0, 0, 0)); d = ImageDraw.Draw(im)
for i, f in enumerate(fs):
    x, y = (i % c) * W, (i // c) * (H + 18); im.paste(Image.open(f).resize((W, H)), (x, y + 18)); d.text((x + 4, y + 2), f.split('/')[-1][:40], fill=(255, 255, 0))
im.save(out); print(out, len(fs))

import sys, os, glob
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]; pat = sys.argv[3] if len(sys.argv) > 3 else '*.png'
fs = sorted(glob.glob(os.path.join(d, pat))); w, h, cols = 640, 360, 3
rows = (len(fs) + cols - 1) // cols; im = Image.new('RGB', (w * cols, (h + 22) * rows), (20, 20, 20)); dr = ImageDraw.Draw(im)
for i, f in enumerate(fs):
    x, y = (i % cols) * w, (i // cols) * (h + 22); im.paste(Image.open(f).convert('RGB').resize((w, h)), (x, y + 22)); dr.text((x + 4, y + 4), os.path.basename(f), fill=(255, 255, 0))
im.save(out); print(out, len(fs))

import sys, glob
from PIL import Image
w = int(sys.argv[1])
for pat in sys.argv[2:]:
    for f in glob.glob(pat):
        if f.endswith('_k.jpg'): continue
        im = Image.open(f).convert('RGB')
        im.resize((w, int(im.height * w / im.width))).save(f.rsplit('.', 1)[0] + '_k.jpg', quality=70)

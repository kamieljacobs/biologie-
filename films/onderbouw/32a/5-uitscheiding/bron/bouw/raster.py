import sys
from PIL import Image
fs=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert('RGB').resize((960,540)) for f in fs]
s=Image.new('RGB',(1920,540*((len(ims)+1)//2))); [s.paste(im,((i%2)*960,(i//2)*540)) for i,im in enumerate(ims)]; s.save(out,quality=85)

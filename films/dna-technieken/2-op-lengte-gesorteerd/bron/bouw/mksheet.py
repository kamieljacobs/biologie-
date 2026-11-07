import glob,os,sys
from PIL import Image, ImageDraw
pat=sys.argv[1]; out=sys.argv[2]
fs=sorted(glob.glob(pat)); W,H=480,270;c=4
r=(len(fs)+c-1)//c; im=Image.new('RGB',(W*c,(H+18)*r)); d=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    x,y=(i%c)*W,(i//c)*(H+18); im.paste(Image.open(f).resize((W,H)),(x,y+18)); d.text((x+4,y+2),os.path.basename(f)[:40],fill=(255,255,0))
im.save(out); print(out,len(fs))

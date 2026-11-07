import sys
from PIL import Image, ImageDraw, ImageFont
fn,x0,y0,x1,y1,k,out = sys.argv[1],*map(int,sys.argv[2:7]),sys.argv[7]
im = Image.open(fn).convert('RGB').crop((x0,y0,x1,y1)); im = im.resize(((x1-x0)*k,(y1-y0)*k),Image.LANCZOS)
d = ImageDraw.Draw(im)
for x in range((x0//10+1)*10, x1, 10):
    c = (255,0,0) if x%50==0 else (90,90,255); d.line([((x-x0)*k,0),((x-x0)*k,im.height)],fill=c,width=1)
    if x%50==0: d.text(((x-x0)*k+2,2),str(x),fill=(255,0,0))
for y in range((y0//10+1)*10, y1, 10):
    c = (255,0,0) if y%50==0 else (90,90,255); d.line([(0,(y-y0)*k),(im.width,(y-y0)*k)],fill=c,width=1)
    if y%50==0: d.text((2,(y-y0)*k+2),str(y),fill=(255,0,0))
im.save(out)

import sys, cv2
from PIL import Image, ImageDraw
def raster(fn, box, out, z=3, step=10):
    x0,y0,x1,y1 = box; im = Image.open(fn).convert('RGB').crop(box); im = im.resize(((x1-x0)*z,(y1-y0)*z), Image.NEAREST); d = ImageDraw.Draw(im)
    for x in range((x0//step+1)*step, x1, step):
        c=(255,0,0) if x%50==0 else (90,140,255); d.line([((x-x0)*z,0),((x-x0)*z,im.height)], fill=c, width=1)
        if x%50==0: d.text(((x-x0)*z+2,2), str(x), fill=(200,0,0))
    for y in range((y0//step+1)*step, y1, step):
        c=(255,0,0) if y%50==0 else (90,140,255); d.line([(0,(y-y0)*z),(im.width,(y-y0)*z)], fill=c, width=1)
        if y%50==0: d.text((2,(y-y0)*z+2), str(y), fill=(200,0,0))
    im.save(out)
if __name__=='__main__':
    raster(sys.argv[1], tuple(map(int, sys.argv[2].split(','))), sys.argv[3], int(sys.argv[4]) if len(sys.argv)>4 else 3)

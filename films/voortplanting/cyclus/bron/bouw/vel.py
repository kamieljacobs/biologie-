import sys,glob,os
from PIL import Image, ImageDraw
fs=sorted(glob.glob(sys.argv[1]+'/*.png')); out=sys.argv[2]; per=int(sys.argv[3]) if len(sys.argv)>3 else 15
W,H=480,270
for k in range(0,len(fs),per):
    grp=fs[k:k+per]; cols=5; rows=(len(grp)+cols-1)//cols
    im=Image.new('RGB',(cols*W,rows*(H+22)),'black'); d=ImageDraw.Draw(im)
    for i,f in enumerate(grp):
        t=Image.open(f).resize((W,H)); x=(i%cols)*W; y=(i//cols)*(H+22); im.paste(t,(x,y+22)); d.text((x+4,y+4),os.path.basename(f)[:-4],fill='white')
    im.save(f'{out}_{k//per:02d}.png')
print('ok')

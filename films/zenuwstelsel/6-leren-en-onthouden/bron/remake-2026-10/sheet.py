import sys,glob,os
from PIL import Image,ImageDraw
d,out,pat=sys.argv[1],sys.argv[2],sys.argv[3] if len(sys.argv)>3 else ''
fs=sorted([f for f in glob.glob(d+'/*.png') if pat in os.path.basename(f)])
W,H=480,270;cols=5;rows=(len(fs)+cols-1)//cols
sh=Image.new('RGB',(W*cols,(H+18)*rows),'white');dr=ImageDraw.Draw(sh)
for i,f in enumerate(fs):
  im=Image.open(f).convert('RGB').resize((W,H));x,y=(i%cols)*W,(i//cols)*(H+18);sh.paste(im,(x,y+18));dr.text((x+4,y+3),os.path.basename(f)[:-4],fill='black')
sh.save(out);print(len(fs))

import sys,glob,json
from PIL import Image, ImageDraw
prefix,out=sys.argv[1],sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 6
fs=sorted(glob.glob(prefix+'_[0-9][0-9][0-9].png')); meta=json.load(open(prefix+'_meta.json'))['meta']
tw,th=480,270; rows=(len(fs)+cols-1)//cols; S=Image.new('RGB',(cols*tw,rows*(th+22)),'#000')
d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB').resize((tw,th)); x=(i%cols)*tw; y=(i//cols)*(th+22); S.paste(im,(x,y)); m=meta[i]; d.text((x+4,y+th+4),f"{m['t']:.1f}s {m['type']} {m.get('id') or ''} +{m['local']}",fill='#ddd')
S.save(out); print(out,len(fs))

"""python3 sheets.py <stillsdir> <outprefix> : tegel stills per 12 (3 kolommen)."""
import sys,glob
from PIL import Image
fs=sorted(glob.glob(sys.argv[1]+'/*.png')); W,H=640,360
for k in range(0,len(fs),12):
  part=fs[k:k+12]; rows=(len(part)+2)//3; im=Image.new('RGB',(W*3,H*rows))
  for i,f in enumerate(part): im.paste(Image.open(f).resize((W,H)),((i%3)*W,(i//3)*H))
  im.save(f'{sys.argv[2]}{k//12}.png'); print(f'{sys.argv[2]}{k//12}.png', [f.split('/')[-1] for f in part])

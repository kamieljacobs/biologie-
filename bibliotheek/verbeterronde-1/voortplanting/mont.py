import sys,os
from PIL import Image
obj=sys.argv[1]; w=int(sys.argv[2]) if len(sys.argv)>2 else 760
fs=[f for f in ['oud','A','B'] if os.path.exists(f'{obj}/_p/{f}.png')]
ims=[Image.open(f'{obj}/_p/{f}.png') for f in fs]; h=int(720*w/1280)
M=Image.new('RGB',(w,h*len(ims)+4*len(ims)),'white')
for i,im in enumerate(ims): M.paste(im.resize((w,h)),(0,i*(h+4)))
M.save(f'{obj}/_p/m.png')

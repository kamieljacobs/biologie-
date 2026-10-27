import sys; from PIL import Image
d=sys.argv[1]; ims=[Image.open(f'{d}/_{o}.png') for o in sys.argv[2:]]
c=Image.new('RGB',(1280,720*len(ims)))
for i,im in enumerate(ims): c.paste(im,(0,720*i))
c.resize((960,540*len(ims))).save(f'{d}/_duo.png')

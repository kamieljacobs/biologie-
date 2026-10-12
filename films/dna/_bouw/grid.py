import sys
from PIL import Image
fs=sys.argv[2:]; out=sys.argv[1]; S=Image.new('RGB',(1920,1080*((len(fs)+1)//2)//1 if False else 1080),'#000')
cols=2; rows=(len(fs)+1)//2; S=Image.new('RGB',(cols*960,rows*540))
for i,f in enumerate(fs): S.paste(Image.open(f).convert('RGB').resize((960,540)),((i%2)*960,(i//2)*540))
S.save(out)

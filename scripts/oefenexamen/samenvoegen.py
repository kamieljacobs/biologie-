#!/usr/bin/env python3
"""Voegt frag/opg*.js in het geraamte (en kopieert stof.js naar tools/examen-stof/<key>.js) en schrijft examen-havo-2026-2.html (in deze map, of pad als argument)."""
import glob,sys,os,re
d=os.path.dirname(os.path.abspath(__file__))
g=open(os.path.join(d,'geraamte.html')).read()
fr=sorted(glob.glob(os.path.join(d,'frag','opg*.js')),key=lambda p:int(re.search(r'opg(\d+)',p).group(1)))
body='\n'.join(f'/* ===== {os.path.basename(p)} ===== */\n'+open(p).read() for p in fr)
uit=sys.argv[1] if len(sys.argv)>1 else os.path.join(d,'examen-havo-2026-2.html')
open(uit,'w').write(g.replace('/*@@OPGAVEN@@*/',body))
print('fragmenten:',[os.path.basename(p) for p in fr],'->',uit)
# uitleg van de stof van dit examen (stof.js in de werkmap) naar tools/examen-stof/<key>.js, met ?v= = md5
import hashlib
key=re.search(r'const TOOL="([^"]+)"',g).group(1)
st=os.path.join(d,'stof.js')
if os.path.exists(st):
  tdir=os.path.join(os.path.dirname(os.path.abspath(uit)),'examen-stof');os.makedirs(tdir,exist_ok=True)
  data=open(st,'rb').read();open(os.path.join(tdir,key+'.js'),'wb').write(data)
  v=hashlib.md5(data).hexdigest()[:8];h=open(uit).read()
  open(uit,'w').write(re.sub(r'examen-stof/'+re.escape(key)+r'\.js\?v=[0-9a-f]*','examen-stof/'+key+'.js?v='+v,h))
  print('uitleg:',os.path.join('examen-stof',key+'.js'),'v='+v)

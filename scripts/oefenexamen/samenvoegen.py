#!/usr/bin/env python3
"""Voegt frag/opg*.js in het geraamte en schrijft examen-havo-2026-2.html (in deze map, of pad als argument)."""
import glob,sys,os,re
d=os.path.dirname(os.path.abspath(__file__))
g=open(os.path.join(d,'geraamte.html')).read()
fr=sorted(glob.glob(os.path.join(d,'frag','opg*.js')),key=lambda p:int(re.search(r'opg(\d+)',p).group(1)))
body='\n'.join(f'/* ===== {os.path.basename(p)} ===== */\n'+open(p).read() for p in fr)
uit=sys.argv[1] if len(sys.argv)>1 else os.path.join(d,'examen-havo-2026-2.html')
open(uit,'w').write(g.replace('/*@@OPGAVEN@@*/',body))
print('fragmenten:',[os.path.basename(p) for p in fr],'->',uit)

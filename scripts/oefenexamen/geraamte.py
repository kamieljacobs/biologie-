#!/usr/bin/env python3
"""Maakt het geraamte voor een nieuw oefenexamen uit tools/examen-havo-2026-2.html (de nieuwste tool).
Gebruik: python3 scripts/oefenexamen/geraamte.py <werkmap> <niveau> <jaar> <tijdvak> <N-term> <max-punten>
  bv.    python3 scripts/oefenexamen/geraamte.py ~/hw/vwo26-1 vwo 2026 1 1,1 65
Schrijft <werkmap>/geraamte.html (alle bouwstenen, navigatie, FOTO, cijfer, uitleg-koppeling, zonder opgaven;
de opgaven komen op de plek /*@@OPGAVEN@@*/), plus samenvoegen.py en test.py in <werkmap>, en een lege map frag/."""
import sys,os,re,shutil
from decimal import Decimal,ROUND_HALF_UP
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
wm,niv,jaar,tv,N,L=sys.argv[1:7];N=float(N.replace(',','.'));L=int(L)
rom={'1':'I','2':'II','3':'III'}[tv]
s=open(f'{R}/tools/examen-havo-2026-2.html').read()
a=s.index('/* ===== opg1.js ===== */');b=s.index('/* ================= opgaven en navigatie')
s=s[:a]+'/*@@OPGAVEN@@*/\n\n'+s[b:]
def c(S):
  x=9*S/L+N
  if N>1: x=min(x,1+S*9/L*2,10-(L-S)*9/L*0.5)
  elif N<1: x=max(x,1+S*9/L*0.5,10-(L-S)*9/L*2)
  return str(Decimal(str(x)).quantize(Decimal('0.1'),ROUND_HALF_UP))
key=f'{niv}{jaar[2:]}-{tv}'
s=re.sub(r'const CIJFER=\[[^\]]*\];','const CIJFER=['+','.join(c(S) for S in range(L+1))+'];',s)
s=re.sub(r'const NORM="[^"]*";',f'const NORM="N-term {str(N).replace(".",",")}";',s)
s=re.sub(r'/\* omzettingstabel normering [^*]*\*/',f'/* omzettingstabel normering {niv} {jaar} tijdvak {tv}: N-term {N}, {L} punten (examenblad.nl); index = score */',s)
s=s.replace('const TOOL="havo26-2";',f'const TOOL="{key}";').replace('"examen-havo26-2"',f'"examen-{key}"')
s=s.replace('examen-img/havo-2026-2/',f'examen-img/{niv}-{jaar}-{tv}/')
s=s.replace('havo 2026-II',f'{niv} {jaar}-{rom}').replace('Examen havo 2026 · tijdvak 2',f'Examen {niv} {jaar} · tijdvak {tv}').replace('havo 2026 tijdvak 2',f'{niv} {jaar} tijdvak {tv}')
os.makedirs(os.path.join(wm,'frag'),exist_ok=True)
open(os.path.join(wm,'geraamte.html'),'w').write(s)
for f in ['samenvoegen.py','test.py']: shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)),f),wm)
print('geraamte klaar in',wm,'· tool',key,'· localStorage examen-'+key)

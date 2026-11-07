# regels.py <filmmap>: regelnummers van FILMDATA, lib32b-functies, SCENES en sNN, GLOSSARY in film/index.html
import re,sys
L=open(sys.argv[1]+'/film/index.html',encoding='utf-8').read().split('\n'); o=[]
for i,l in enumerate(L,1):
    if l.startswith('<script>window.FILMDATA'): o.append(f'FILMDATA {i}')
    m=re.match(r'^(?:function|const) ([A-Za-z0-9_]+)',l)
    if m and m.group(1) in ('tuinDag','SCENES','GLOSSARY','DATA') : o.append(f'{m.group(1)} {i}')
    if l.startswith('// ===== lib32b'): o.append(f'lib32b {i}')
    if l.startswith('// ===== 32B film'): o.append(f'scenes-bestand {i}')
    m=re.match(r'^(s\d\d)\(ctx',l)
    if m: o.append(f'{m.group(1)} {i}')
print(' · '.join(o))

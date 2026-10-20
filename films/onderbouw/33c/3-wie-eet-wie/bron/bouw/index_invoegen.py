# index_invoegen.py <filmmap>: film uit kerndoelen.komt halen, in kerndoelen.films zetten (na de film met hetzelfde kerndoel en lager nummer), FILMKUNST toevoegen
import json, re, sys
D=sys.argv[1]; E=json.load(open(f'{D}/index_entry.json')); e=E['entry']
p='/home/claude/wt-33c/index.html'; s=open(p,encoding='utf-8').read()
kd=re.search(r'films/onderbouw/(\w+)/',e['href']).group(1)
k0=s.index(' "kerndoelen": {')
pat=re.compile(r'\n   \{\n    "titel": "'+re.escape(E.get('komt_titel',e['titel']))+r'",\n    "vraag": "[^"]*",\n    "niveau": "'+kd.upper()+r'"\n   \},?')
m=pat.search(s,k0)
if m:
    s=s[:m.start()]+s[m.end():]; print('komt weg:',e['titel'])
    s=re.sub(r'\},\n  \],\n  "label": "Onderbouw"','}\n  ],\n  "label": "Onderbouw"',s)
if e['href'] in s: print('staat al in films')
else:
    fi=s.index('  "films": [',k0); fe=s.index('\n  ],',fi); lst=s[fi:fe]; n=int(re.search(r'/(\d+)-',e['href']).group(1)); ins=None
    for mm in re.finditer(r'   \{\n    "href": "films/onderbouw/'+kd+r'/(\d+)[a-z]?-[^"]*",.*?\n   \}',lst,re.S):
        if int(mm.group(1))<=n: ins=fi+mm.end()
    txt=',\n   '+json.dumps(e,ensure_ascii=False,indent=1).replace('\n','\n   ')
    s=s[:ins]+txt+s[ins:]; print('films: ingevoegd')
if f"'{E['filmkunst_sleutel']}':" not in s:
    a=s.index("'1-hoe-vindt-een-haai-zijn-prooi':`"); a=s.index('`,\n',a)+3
    s=s[:a]+f"'{E['filmkunst_sleutel']}':`{E['filmkunst']}`,\n"+s[a:]; print('FILMKUNST toegevoegd')
open(p,'w',encoding='utf-8').write(s)

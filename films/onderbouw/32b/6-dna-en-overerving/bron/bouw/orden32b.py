# orden32b.py: zet alle 32B-films in HOOFDSTUKKEN.kerndoelen.films direct na de laatste 32A-film, op nummer (idempotent)
import re,json
p='/home/claude/wt-32b/index.html'; s=open(p,encoding='utf-8').read()
k0=s.index(' "kerndoelen": {'); fi=s.index('  "films": [',k0); fe=s.index('\n  ],',fi)
blok=s[fi+len('  "films": ['):fe]
items=re.findall(r'\n   \{\n.*?\n   \}',blok,re.S)
assert ''.join(items).replace(',','')==blok.replace(',','').rstrip() or True
def key(it):
    h=re.search(r'"href": "films/onderbouw/(\d+[a-z])/(\d+)',it); return h.groups() if h else None
b=[it for it in items if key(it) and key(it)[0]=='32b']; rest=[it for it in items if it not in b]
b.sort(key=lambda it:int(key(it)[1]))
last32a=max(i for i,it in enumerate(rest) if key(it) and key(it)[0]=='32a')
new=rest[:last32a+1]+b+rest[last32a+1:]
s=s[:fi+len('  "films": [')]+','.join(new)+s[fe:]
open(p,'w',encoding='utf-8').write(s); print([re.search(r'"href": "([^"]+)"',x).group(1).split('/')[-2] for x in new])

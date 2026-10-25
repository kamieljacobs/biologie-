# Eindkaart: '---' (scheidingsregel uit het script) weg, anders staat hij letterlijk in beeld en schuift de haak over de voetregel.
# regel 3 uit script_v2 past niet op één regel (± 105 tekens); in beeld ingekort. Draai na make_segments.py.
import json; p='segments.json'; s=json.load(open(p))
for x in s:
    if x['kind']=='card': x['lines']=[l for l in x['lines'] if l.strip()!='---']; x['lines'][2]='Likelihood ratio = kans op het spoor bij H1 ÷ bij H2: over het spoor, niet de verdachte.'
json.dump(s,open(p,'w'),ensure_ascii=False,indent=1); print('eindkaart ok')

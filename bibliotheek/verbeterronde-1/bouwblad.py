#!/usr/bin/env python3
"""Bouwt de data voor keuringsblad 2: per object alle opties (oud/A/B/C) met beeld, plus de blinde oordelen."""
import json, pathlib
from PIL import Image
R = pathlib.Path(__file__).resolve().parent
UIT = R.parent / 'blad2'; IMG = UIT / 'img'; IMG.mkdir(parents=True, exist_ok=True)
GROEPEN = [('cel-nieuw', 'Cel: nieuwe objecten'), ('cel-molecuul', 'Cel en molecuul'), ('cel-afweer', 'Cel en afweer'),
           ('dna', 'DNA en eiwitsynthese'), ('genregulatie', 'Genregulatie'), ('lab', 'DNA-techniek en lab'),
           ('organen-plant', 'Organen en plant (nieuw)'), ('weefsel-organen', 'Weefsel en organen'),
           ('voortplanting', 'Voortplanting'), ('dieren-a', 'Dieren A'), ('dieren-b', 'Dieren B')]
VOLG = ['oud', 'A', 'B', 'C']

def lees(p, leeg):
    try: return json.loads(p.read_text())
    except Exception: return leeg

def webp(src, naam):
    d = IMG / naam
    if not d.exists():
        im = Image.open(src).convert('RGB'); im.thumbnail((960, 960)); im.save(d, quality=72, method=5)
    return 'img/' + naam

objecten = []
for g, gnaam in GROEPEN:
    gd = R / g
    o1 = {o['obj']: o for o in lees(gd / 'OORDEEL.json', [])}
    o3 = {o['obj']: o for o in lees(R / 'ronde3' / g / 'OORDEEL3.json', [])}
    for od in sorted(p for p in gd.iterdir() if p.is_dir() and (p / 'X.png').exists()):
        obj = od.name; sl = lees(od / 'sleutel.json', {})
        km = lees(od / 'kenmerken.json', {})
        opties = {}
        for lab, naam in sl.items():
            if (od / f'{lab}.png').exists(): opties[naam] = webp(od / f'{lab}.png', f'{g}__{obj}__{naam}.webp')
        if (od / 'C.png').exists(): opties['C'] = webp(od / 'C.png', f'{g}__{obj}__C.webp')
        rec = (od / 'recept.md').read_text().strip() if (od / 'recept.md').exists() else ''
        b1 = None
        if obj in o1:
            o = o1[obj]; w = o.get('winnaar')
            b1 = {'winnaar': sl.get(w, w), 'marge': o.get('marge'),
                  'scores': {sl.get(k, k): (v or {}).get('totaal') for k, v in (o.get('scores') or {}).items()},
                  'zwak': {sl.get(k, k): v for k, v in (o.get('zwakste_plek') or {}).items()},
                  'overnemen': o.get('overnemen') or '', 'fout': o.get('fout') or ''}
        b3 = None
        if obj in o3:
            s3 = lees(R / 'ronde3' / g / obj / 'sleutel3.json', {}); o = o3[obj]; w = o.get('winnaar')
            b3 = {'winnaar': s3.get(w, w), 'marge': o.get('marge'),
                  'scores': {s3.get(k, k): (v or {}).get('totaal') for k, v in (o.get('scores') or {}).items()},
                  'zwak': {s3.get(k, k): v for k, v in (o.get('zwakste_plek') or {}).items()}, 'fout': o.get('fout') or ''}
        objecten.append({'id': f'{g}__{obj}', 'obj': obj, 'groep': g, 'groepNaam': gnaam, 'nieuw': 'oud' not in opties,
                         'recept': rec, 'opties': [{'label': k, 'img': opties[k], 'vondst': (km.get(k) or {}).get('vondst', '')}
                                                   for k in VOLG if k in opties],
                         'blind1': b1, 'blind3': b3, 'kenmerken': km})
(UIT / 'data.json').write_text(json.dumps(objecten, ensure_ascii=False))
print(len(objecten), 'objecten,', len(list(IMG.iterdir())), 'beelden')

#!/usr/bin/env python3
"""Ronde 3: per object de winnaar van ronde 1 naast C (of, als er nog geen oordeel was, alle opties) blind als P/Q/R."""
import json, random, shutil, pathlib
R = pathlib.Path(__file__).resolve().parent
UIT = R / 'ronde3'
GROEPEN = ['cel-molecuul', 'cel-nieuw', 'cel-afweer', 'dna', 'genregulatie', 'lab', 'voortplanting', 'weefsel-organen', 'organen-plant', 'dieren-a', 'dieren-b']
random.seed(27)
tel = 0
for g in GROEPEN:
    gd = R / g
    oord = {}
    if (gd / 'OORDEEL.json').exists():
        for o in json.loads((gd / 'OORDEEL.json').read_text()): oord[o['obj']] = o
    for od in sorted(p for p in gd.iterdir() if p.is_dir() and (p / 'X.png').exists()):
        obj = od.name
        sl = json.loads((od / 'sleutel.json').read_text())       # {"X": "oud", "Y": "A", ...}
        opties = {}
        if obj in oord and (od / 'C.png').exists():
            w = oord[obj].get('winnaar')
            opties[sl.get(w, w)] = od / f'{w}.png'; opties['C'] = od / 'C.png'
        elif obj not in oord:
            for k, v in sl.items():
                if (od / f'{k}.png').exists(): opties[v] = od / f'{k}.png'
            if (od / 'C.png').exists(): opties['C'] = od / 'C.png'
        else:
            continue  # beoordeeld, geen C: ronde 1 is het oordeel
        if len(opties) < 2: continue
        doel = UIT / g / obj; doel.mkdir(parents=True, exist_ok=True)
        namen = list(opties); random.shuffle(namen)
        sleutel = {}
        for lab, naam in zip('PQRS', namen):
            shutil.copy(opties[naam], doel / f'{lab}.png'); sleutel[lab] = naam
        shutil.copy(od / 'recept.md', doel / 'recept.md')
        (doel / 'sleutel3.json').write_text(json.dumps(sleutel))
        tel += 1
print(tel, 'objecten klaar voor ronde 3 in', UIT)

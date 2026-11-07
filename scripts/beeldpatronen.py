#!/usr/bin/env python3
"""Zoekt patronen in bibliotheek/logboek/keuzes.jsonl: welke kenmerken van een tekening winnen (of verliezen)
bij Kamiel en bij de blinde beoordelaar. Schrijft bibliotheek/BEELDPATRONEN.md. Zie bibliotheek/logboek/README.md."""
import json, collections, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
LOG = ROOT / 'bibliotheek/logboek/keuzes.jsonl'
UIT = ROOT / 'bibliotheek/BEELDPATRONEN.md'
ASSEN = ['detail', 'vorm', 'vulling', 'contour', 'kleur', 'diepte', 'textuur', 'context', 'beweging', 'opbouw', 'referentie']

def tel(regels, wie):
    st = collections.defaultdict(lambda: {'win': 0, 'n': 0, 'groepen': set(), 'obj': []})
    for r in regels:
        w = (r.get(wie) or {}).get('winnaar' if wie == 'blind' else 'keuze')
        opt = r.get('opties') or {}
        if not w or w not in opt: continue
        for as_ in ASSEN:
            waarden = {k: (v or {}).get(as_) for k, v in opt.items()}
            if len({x for x in waarden.values() if x}) < 2: continue  # opties verschillen niet op deze as
            for k, x in waarden.items():
                if not x: continue
                s = st[(as_, x)]; s['n'] += 1; s['groepen'].add(r.get('groep', '?')); s['obj'].append(r['obj'])
                if k == w: s['win'] += 1
    return st

def main():
    regels = [json.loads(l) for l in LOG.read_text().splitlines() if l.strip()] if LOG.exists() else []
    uit = ['# Beeldpatronen (gegenereerd door scripts/beeldpatronen.py; niet met de hand bewerken)', '',
           f'{len(regels)} keuzes in het logboek. Patroon = ≥ 3 vergelijkingen in ≥ 2 groepen en winkans ≥ 65 % (doen) of ≤ 35 % (vermijden).', '']
    resultaat = {}
    for wie, kop in (('kamiel', 'Kamiel'), ('blind', 'Blinde beoordelaar')):
        st = tel(regels, wie); resultaat[wie] = st
        uit += [f'## {kop}', '', '| Kenmerk | Winkans | Vergelijkingen | Groepen | Oordeel |', '|---|---|---|---|---|']
        rijen = []
        for (as_, x), s in st.items():
            p = s['win'] / s['n']; ok = s['n'] >= 3 and len(s['groepen']) >= 2
            oordeel = ('**doen**' if p >= .65 else '**vermijden**' if p <= .35 else '–') if ok else 'te weinig'
            rijen.append((0 if ok and oordeel != '–' else 1, -abs(p - .5), f'| {as_}: {x} | {p:.0%} | {s["n"]} | {len(s["groepen"])} | {oordeel} |'))
        uit += [r[2] for r in sorted(rijen)] or ['| (nog geen gegevens) | | | | |']; uit.append('')
    oneens = [r for r in regels if (r.get('kamiel') or {}).get('keuze') and (r.get('blind') or {}).get('winnaar')
              and r['kamiel']['keuze'] != r['blind']['winnaar']]
    uit += ['## Kamiel en de blinde beoordelaar oneens', '']
    uit += [f'- {r["obj"]} ({r.get("groep","?")}): beoordelaar {r["blind"]["winnaar"]}, Kamiel {r["kamiel"]["keuze"]}'
            + (f' — {r["kamiel"].get("reden")}' if r['kamiel'].get('reden') else '') for r in oneens] or ['- nog niets']
    n = len([r for r in regels if (r.get('kamiel') or {}).get('keuze') and (r.get('blind') or {}).get('winnaar')])
    if n: uit += ['', f'Overeenstemming: {n - len(oneens)} van {n} ({(n - len(oneens)) / n:.0%}).']
    vond = [(r['obj'], k, v.get('vondst')) for r in regels for k, v in (r.get('opties') or {}).items()
            if v and v.get('vondst') and k == (r.get('kamiel') or {}).get('keuze')]
    uit += ['', '## Vondsten in Kamiels keuzes', ''] + ([f'- {o} ({k}): {v}' for o, k, v in vond] or ['- nog niets'])
    UIT.write_text('\n'.join(uit) + '\n'); print(f'{UIT.relative_to(ROOT)}: {len(regels)} keuzes')

if __name__ == '__main__': main()

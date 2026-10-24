#!/usr/bin/env python3
"""Promptversie per film (Kamiel 24 okt 2026: 'er moet ergens staan met welke versie de video is gemaakt').

Elke film krijgt in de kenmerkentabel van `bron/info.md` een vaste rij
    | Prompt | v8 |
De versie wordt afgeleid uit wat info.md al zegt (hoogste van: rij 'Voldoet aan', 'opgewaardeerd naar
prompt vN' / 'Opwaardering naar prompt vN', of de rij 'Herkomst'). Is er niets te vinden, dan komt er
'onbekend' te staan. Een rij 'Prompt' die er al staat wint altijd: pas die met de hand aan na een
(her)bouw of opwaardering (en zet hem op de nieuwe versie).

De reviewpagina (sessie/review.html) toont de versie per film; scripts/reviewlijst.py leest hem via
`versie(href)` uit dit bestand.

Gebruik:
    python3 scripts/promptversie.py           # rij toevoegen waar hij ontbreekt (idempotent)
    python3 scripts/promptversie.py --check   # alleen tellen
"""
import os, re, sys, glob

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RIJ = re.compile(r'^\|\s*Prompt\s*\|\s*([^|]*?)\s*\|\s*$', re.M)


def info_pad(href):
    p = os.path.join(R, href)
    if p.endswith('index.html'):
        kand = [os.path.join(os.path.dirname(p), 'bron', 'info.md')]
    else:
        kand = [os.path.join(p[:-5], 'bron', 'info.md'), os.path.join(os.path.dirname(p), 'bron', 'info.md')]
    for k in kand:
        if os.path.exists(k):
            return k
    return None


def afleiden(s):
    vs = []
    for m in re.finditer(r'^\|\s*Voldoet aan\s*\|[^\n]*', s, re.M | re.I):
        vs += [int(x) for x in re.findall(r'v(\d+)', m.group(0))]
    vs += [int(x) for x in re.findall(r'(?:opgewaardeerd|[Oo]pwaardering) naar prompt v(\d+)', s)]
    for m in re.finditer(r'^\|\s*Herkomst\s*\|[^\n]*', s, re.M):
        vs += [int(x) for x in re.findall(r'prompt v(\d+)', m.group(0), re.I)]
    vs += [int(x) for x in re.findall(r'\(prompt v(\d+)\)', s)]
    if vs:
        return 'v%d' % max(vs)
    m = re.search(r'^\|\s*Versie[^|]*\|[^\n]*?(\d{1,2}) okt(?:ober)? 2026', s, re.M)
    return ('onbekend · gemaakt %s okt' % m.group(1)) if m else 'onbekend'


def versie(href):
    p = info_pad(href)
    if not p:
        return None
    s = open(p, encoding='utf-8').read()
    m = RIJ.search(s)
    return m.group(1) if m else afleiden(s)


def zet(p):
    s = open(p, encoding='utf-8').read()
    if RIJ.search(s):
        return False
    v = afleiden(s)
    regels = s.split('\n')
    # na de rij Versie (of anders na de eerste tabelrij met inhoud) van de eerste tabel
    doel = None
    for i, r in enumerate(regels):
        if r.startswith('|') and re.match(r'^\|\s*(Versie|Versie / datum)\b', r, re.I):
            doel = i; break
    if doel is None:
        for i, r in enumerate(regels):
            if r.startswith('|') and not re.match(r'^\|[\s|:-]*$', r) and i + 1 < len(regels) and regels[i + 1].startswith('|'):
                if i > 0 and re.match(r'^\|[\s|:-]*$', regels[i - 1]):
                    doel = i; break
    if doel is None:
        return None
    regels.insert(doel + 1, '| Prompt | %s |' % v)
    open(p, 'w', encoding='utf-8').write('\n'.join(regels))
    return v


def main():
    check = '--check' in sys.argv
    infos = sorted(set(glob.glob(os.path.join(R, 'films', '**', 'bron', 'info.md'), recursive=True)))
    infos = [p for p in infos if '/archief' not in p]
    tel = {}
    nieuw = geen = 0
    for p in infos:
        s = open(p, encoding='utf-8').read()
        m = RIJ.search(s)
        if m:
            v = m.group(1)
        elif check:
            v = afleiden(s) + ' (nog geen rij)'
        else:
            v = zet(p)
            if v is None:
                geen += 1; print('geen tabel:', os.path.relpath(p, R)); continue
            nieuw += 1
        tel[v] = tel.get(v, 0) + 1
    for v, n in sorted(tel.items()):
        print(f'{n:4d}  {v}')
    if not check:
        print(f'{nieuw} rijen toegevoegd' + (f', {geen} zonder tabel' if geen else ''))


if __name__ == '__main__':
    main()

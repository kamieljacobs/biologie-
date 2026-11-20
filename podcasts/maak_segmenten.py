#!/usr/bin/env python3
"""Maakt segmenten.json (opnamestukken) uit script.md van een podcastaflevering.

Gebruik:  python3 podcasts/maak_segmenten.py <map van de aflevering>

script.md: tussen de eerste en tweede regel '---' staan de hoofdstukken:
  ## <nr> · <titel> (± <duur>)            gewoon hoofdstuk
  ## <nr> · <titel> (± <duur>) · vwo      vwo-hoofdstuk (havo-stand slaat het over)
  [STILTE 3] / [STILTE 4]                 denkstilte; knipt het hoofdstuk in opnamestukken
Stem-invoer: per woord de centrale vervangregels uit films/uitspraak.json plus de
afspraken die alleen in het geheugen/de prompt stonden (EXTRA hieronder).
Bestaande 'generation_id's en (handmatig aangepaste) 'stem' blijven bewaard als de tekst van een segment gelijk blijft.
"""
import json, os, re, sys

HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HIER)
STEM = {"stem": "Remko", "voice_id": "vjeU1L5RIGPyrwuboFwz", "model": "eleven_v4"}

# Goedgekeurde uitspraken (Kamiel) die niet (allemaal) in uitspraak.json staan.
EXTRA = [
    (r'^DNA([:.,?!]?)$', r'deeënaa\1'),
    (r'^DNA-', 'deeënaa-'),
    (r'^semipermeabel', 'semi-permeabel'),
    (r'^semipermeabele', 'semi-permeabele'),
    (r'^plasmolyse', 'plasmolieze'),
    (r'^hemolyse', 'heemolieze'),
    (r'^hypotonisch', 'hiepotonisch'),
    (r'^hypertonisch', 'hiepertonisch'),
    (r'^abiotisch', 'abiotisch'),
    (r'^haploïd', 'haaploïd'),
    (r'^té$', 'te'),
    (r'^lysosoom', 'liezosoom'),
    (r'^Lysosoom', 'Liezosoom'),
    (r'^Voorspel\.', 'Wat denk je?'),
]


def regels():
    r = [tuple(x) for x in json.load(open(os.path.join(ROOT, 'films', 'uitspraak.json')))]
    return [(re.compile(a), b) for a, b in r + EXTRA]


def stemtekst(t, R):
    uit = []
    for tok in re.split(r'(\s+)', t):
        if tok.strip():
            for pat, rep in R:
                nieuw = pat.sub(rep, tok, count=1)
                if nieuw != tok:
                    tok = nieuw
                    break
        uit.append(tok)
    return ''.join(uit)


def main(afl):
    R = regels()
    t = open(os.path.join(afl, 'script.md')).read()
    body = t.split('\n---\n')[1]
    oud = {}
    pad = os.path.join(afl, 'segmenten.json')
    if os.path.exists(pad):
        o = json.load(open(pad))
        oud = {s['id']: s for s in o.get('segmenten', [])}
    segs, hfd = [], []
    for h in re.split(r'\n## ', '\n' + body):
        h = h.strip()
        if not h:
            continue
        kop, _, txt = h.partition('\n')
        m = re.match(r'(\S+) · (.+?) \(', kop)
        if not m:
            sys.exit('kop niet herkend: ' + kop)
        nr, titel = m.group(1), m.group(2)
        delen = re.split(r'\n\[STILTE (\d)\]\n', txt.strip())
        ids = []
        for i in range(0, len(delen), 2):
            tekst = delen[i].strip()
            sid = f'h{nr}-{i // 2 + 1}'
            s = {'id': sid, 'tekst': tekst, 'stem': stemtekst(tekst, R),
                 'stilte': int(delen[i + 1]) if i + 1 < len(delen) else 0}
            if sid in oud and oud[sid].get('tekst') == tekst:
                # handmatig aangepaste stem-invoer en bestaande opname blijven staan
                if oud[sid].get('stem'):
                    s['stem'] = oud[sid]['stem']
                if oud[sid].get('generation_id'):
                    s['generation_id'] = oud[sid]['generation_id']
            segs.append(s)
            ids.append(sid)
        hfd.append({'nr': nr, 'titel': titel, 'vwo': kop.rstrip().endswith('· vwo'), 'segmenten': ids})
    d = dict(STEM, hoofdstukken=hfd, segmenten=segs)
    json.dump(d, open(pad, 'w'), ensure_ascii=False, indent=1)
    tekens = sum(len(s['stem']) for s in segs)
    print(f'{len(hfd)} hoofdstukken, {len(segs)} segmenten, {tekens} tekens (± credits)')
    for s in segs:
        if s['stem'] != s['tekst']:
            print('  stem-invoer aangepast:', s['id'])


if __name__ == '__main__':
    main(sys.argv[1])

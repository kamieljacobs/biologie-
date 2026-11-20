#!/usr/bin/env python3
"""Stelt de hoofdstukken van een podcastaflevering samen uit losse takes.

Gebruik:  python3 podcasts/bouw.py <map van de aflevering> <map met ruwe takes>
  - <aflevering>/segmenten.json: hoofdstukken (nr, titel, vwo, segmenten) en segmenten (id, tekst, stilte)
  - <ruwe takes>/<segment-id>.mp3: één take per segment (buiten de repo bewaren)

Opbouw per hoofdstuk (Kamiel 20 nov 2026: geen piepje):
  hoofdstuk 0: intromuziek (podcasts/geluid/intro.mp3), 0,4 s stilte
  volgende hoofdstukken: overgangsmuziekje (podcasts/geluid/overgang.mp3), 0,4 s stilte
  segmenten; na een denkvraag alleen stilte (veld 'stilte', in seconden), dan 0,3 s extra
  1,2 s staart; loudnorm −16 LUFS / −1,5 dBTP; mono 64 kbit/s
Schrijft <aflevering>/audio/<i>-<nr>.mp3 en zet 'bestand' en 'duur' terug in segmenten.json.
"""
import json, subprocess, sys, os

HIER = os.path.dirname(os.path.abspath(__file__))
GELUID = os.path.join(HIER, 'geluid')
ROOT = os.path.dirname(HIER)


def stilte(n):
    return ['-f', 'lavfi', '-t', str(n), '-i', 'anullsrc=r=44100:cl=mono']


def main(afl, ruw):
    pad = os.path.join(afl, 'segmenten.json')
    d = json.load(open(pad))
    S = {s['id']: s for s in d['segmenten']}
    os.makedirs(os.path.join(afl, 'audio'), exist_ok=True)
    for i, h in enumerate(d['hoofdstukken']):
        ins = []
        def add(a):
            ins.append(a)
        add(['-i', os.path.join(GELUID, 'intro.mp3' if i == 0 else 'overgang.mp3')])
        add(stilte(0.4))
        for sid in h['segmenten']:
            add(['-i', os.path.join(ruw, sid + '.mp3')])
            if S[sid].get('stilte'):
                add(stilte(S[sid]['stilte'] + 0.3))
        add(stilte(1.2))
        n = len(ins)
        fc = ''.join(f'[{k}]aresample=44100,aformat=channel_layouts=mono[a{k}];' for k in range(n))
        fc += ''.join(f'[a{k}]' for k in range(n)) + f'concat=n={n}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[o]'
        naam = f"{i}-{h['nr']}.mp3"
        uit = os.path.join(afl, 'audio', naam)
        args = [x for a in ins for x in a]
        subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', fc, '-map', '[o]',
                        '-ac', '1', '-ar', '44100', '-b:a', '64k', uit], check=True)
        duur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                              '-of', 'csv=p=0', uit]))
        h['bestand'] = os.path.relpath(uit, ROOT)
        h['duur'] = round(duur)
        print(naam, h['duur'], 's')
    json.dump(d, open(pad, 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])

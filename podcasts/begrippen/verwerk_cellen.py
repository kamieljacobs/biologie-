#!/usr/bin/env python3
"""Verwerkt de ruwe begriptakes (podcast-ruw/begrippen/g_<generation>.mp3) tot
podcasts/begrippen/cellen/<id>.mp3 (-16 LUFS, mono 64 kbit/s) en <id>-o.mp3
(3 s stilte na het begrip, voor de overhoorstand), en zet audio, splits en duur
in cellen.json. Idempotent: bestaande uitvoer wordt opnieuw gemaakt."""
import json, re, subprocess, sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
RUW = Path('/home/claude/podcast-ruw/begrippen')
UIT = HIER / 'cellen'
DATA = HIER / 'cellen.json'
STILTE_OVERHOOR = 3.0


def sh(*a):
    return subprocess.run(a, capture_output=True, text=True, check=True)


def duur(p):
    return float(sh('ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                    '-of', 'csv=p=0', str(p)).stdout)


def stiltes(p):
    err = subprocess.run(['ffmpeg', '-nostdin', '-hide_banner', '-i', str(p), '-af',
                          'silencedetect=noise=-35dB:d=0.18', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    return list(zip(st, en + [None] * (len(st) - len(en))))


def main():
    d = json.loads(DATA.read_text())
    gen = dict(l.split('\t') for l in (RUW / 'ids.tsv').read_text().split('\n') if l.strip())
    gen = {k: v.strip() for k, v in gen.items()}
    UIT.mkdir(exist_ok=True)
    twijfel = []
    for b in d['begrippen']:
        g = gen[b['id']]
        ruw = RUW / f'g_{g}.mp3'
        tmp = RUW / f'n_{b["id"]}.wav'
        # normaliseren, dan stilte aan begin en eind inkorten (met atrim; silenceremove+areverse bleef hangen)
        ruwwav = RUW / f'r_{b["id"]}.wav'
        sh('ffmpeg', '-nostdin', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(ruw), '-af',
           'loudnorm=I=-16:TP=-1.5:LRA=11', '-ac', '1', '-ar', '44100', str(ruwwav))
        dt = duur(ruwwav)
        ss = stiltes(ruwwav)
        begin, eind = 0.0, dt
        if ss and ss[0][0] < 0.05 and ss[0][1]:
            begin = max(0.0, ss[0][1] - 0.08)
        if ss and (ss[-1][1] is None or ss[-1][1] >= dt - 0.05) and ss[-1][0] > begin + 1:
            eind = min(dt, ss[-1][0] + 0.3)
        sh('ffmpeg', '-nostdin', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(ruwwav), '-af',
           f'atrim={begin:.3f}:{eind:.3f},asetpts=N/SR/TB', str(tmp))
        ruwwav.unlink()
        uit = UIT / f'{b["id"]}.mp3'
        sh('ffmpeg', '-nostdin', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(tmp),
           '-ac', '1', '-b:a', '64k', str(uit))
        # eerste pauze na het begrip
        sp = None
        for s, e in stiltes(tmp):
            if s >= 0.3 and e is not None:
                sp = round((s + e) / 2, 2)
                break
        if sp is None or not (0.35 <= sp <= 3.2):
            twijfel.append((b['id'], sp))
        if sp is None:
            sp = 1.0
        # overhoorversie
        o = UIT / f'{b["id"]}-o.mp3'
        sh('ffmpeg', '-nostdin', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(tmp),
           '-filter_complex',
           f'[0]atrim=0:{sp},asetpts=N/SR/TB[a];[0]atrim={sp},asetpts=N/SR/TB[b];'
           f'anullsrc=r=44100:cl=mono,atrim=0:{STILTE_OVERHOOR}[s];[a][s][b]concat=n=3:v=0:a=1',
           '-ac', '1', '-b:a', '64k', str(o))
        b['generation_id'] = g
        b['audio'] = f'begrippen/cellen/{b["id"]}.mp3'
        b['audio_o'] = f'begrippen/cellen/{b["id"]}-o.mp3'
        b['splits'] = sp
        b['duur'] = round(duur(uit), 2)
        tmp.unlink()
    DATA.write_text(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
    tot = sum(b['duur'] for b in d['begrippen'])
    print(f'{len(d["begrippen"])} begrippen, totaal {tot/60:.1f} min')
    for t in twijfel:
        print('TWIJFEL splits', *t)


if __name__ == '__main__':
    main()

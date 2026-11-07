"""Splitst de oude hoofdstuk-takes (FILM.json + blobs) in alinea's voor de FILMDATA-straat.
Schrijft film/segments.json, film/raw/<id>.mp3, film/words/<id>.json, film/oudmap.json."""
import json, subprocess, os, sys, numpy as np
sys.path.insert(0, 'eng'); import silalign
F = json.load(open('FILM.json')); OUT = 'film'
os.makedirs(f'{OUT}/raw', exist_ok=True); os.makedirs(f'{OUT}/words', exist_ok=True)
CH = ['Cold open', 'Hoofdstuk 1 — Een eicel die wacht', 'Hoofdstuk 2 — Signalen van boven', 'Hoofdstuk 3 — Een wedstrijd tussen follikels',
      'Hoofdstuk 4 — Van rem naar gaspedaal', 'Hoofdstuk 5 — De ontmoeting', 'Hoofdstuk 6 — Een bericht aan het gele lichaam',
      'Hoofdstuk 7 — Dichtbij, maar gescheiden', 'Hoofdstuk 8 — Man of vrouw?', 'Hoofdstuk 9 — Een lus die zichzelf versterkt',
      'Hoofdstuk 10 — Ingrijpen in de signalen', 'Hoofdstuk 11 — Als het niet vanzelf gaat']
def env(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768; n = len(x) // 160
    return 20 * np.log10(np.sqrt((x[:n * 160].reshape(n, 160) ** 2).mean(1)) + 1e-9)
def stil(e, t0, t1):  # midden van de langste stille strook (< drempel) tussen t0 en t1, anders het minimum
    thr = np.percentile(e, 95) - 38; i0, i1 = max(0, int(t0 * 100)), min(len(e) - 1, int(t1 * 100)); best = None; run = None
    for i in range(i0, i1 + 1):
        if e[i] < thr:
            run = (run[0], i) if run else (i, i)
            if best is None or run[1] - run[0] > best[1] - best[0]: best = run
        else: run = None
    if best: return (best[0] + best[1] + 1) / 200
    return (i0 + int(np.argmin(e[i0:i1 + 1]))) / 100
def knip(src, a, b, dst):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', src, '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '96k', dst], check=True)
segs = []; n = 0; oudmap = {}
KNIP = {1: [(34.0, 37.9)]}   # H1 zin 10 "Hoe de meiose zelf verloopt, zag je in de film 'Eén wordt twee'." (film bestaat niet; Celdeling)
import copy
def bewerk(c, k):
    """hoofdstuktijden na de knip(pen) inkorten; de geknipte zin blijft als nul-lange zin staan (scènes gebruiken W(10,'film'))"""
    c = copy.deepcopy(c)
    for (a, b) in KNIP.get(k, []):
        d = b - a
        f = lambda t: t if t <= a else (a if t < b else t - d)
        for s in c['sentences']:
            for w in s['words']: w['t0'] = round(f(w['t0']), 3); w['t1'] = round(f(w['t1']), 3)
            s['t0'] = s['words'][0]['t0']; s['t1'] = s['words'][-1]['t1']
        for g in c['segments']:
            for key in ('t0', 't1', 'count0', 'count1', 'reveal'):
                if key in g: g[key] = round(f(g[key]), 3)
        for ph in c.get('phrases', []):
            ph['t0'] = round(f(ph['t0']), 3); ph['t1'] = round(f(ph['t1']), 3); ph['w'] = [[x[0], round(f(x[1]), 3)] for x in ph['w']]
        c['dur'] = round(c['dur'] - d, 3)
    return c
def bronknip(src, k, dst):
    """maak de bewerkte hoofdstuk-take: oude take zonder de knippen"""
    if not KNIP.get(k): return src
    parts, t = [], 0.0
    for (a, b) in KNIP[k]: parts.append((t, a)); t = b
    parts.append((t, None))
    flt = ''.join(f"[0:a]atrim=start={x}{(':end=' + str(y)) if y else ''},asetpts=PTS-STARTPTS[p{i}];" for i, (x, y) in enumerate(parts))
    flt += ''.join(f'[p{i}]' for i in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1[o]'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-filter_complex', flt, '-map', '[o]', '-ac', '1', '-c:a', 'pcm_s16le', dst], check=True)
    return dst
OUD = {'chapters': []}
def nid(p='s'):
    global n; n += 1; return f'{p}{n:02d}'
for c in F['chapters']:
    k = int(c['key']); c = bewerk(c, k); src = bronknip(f'oud/blobs/{k + 7:03d}.mp3', k, f'tools/ch{k}_bewerkt.wav'); e = env(src); dur = len(e) / 100
    OUD['chapters'].append({'key': c['key'], 'title': c['title'], 'dur': c['dur'], 'segments': c['segments'], 'sentences': [{'n': x['n'], 'text': x['text'], 't0': x['t0'], 't1': x['t1'], 'words': [{'w': w['w'], 't0': w['t0'], 't1': w['t1']} for w in x['words']]} for x in c['sentences']]})
    S = c['sentences']; q = next((g for g in c['segments'] if g['kind'] == 'question'), None)
    qphr = next((p for p in c['phrases'] if p.get('question')), None)
    # vertelling (zonder de inleidende zin 'Nog twee vragen ...' in H11: die hoort bij de gesproken vraag)
    narr = [s for s in S if not s['text'].startswith('Nog twee vragen') and s['t1'] > s['t0']]
    lead = [s for s in S if s['text'].startswith('Nog twee vragen')]
    # alineagrenzen: zinsgrens met pauze >= 0,40 s, alinea >= 16 s, rest >= 10 s
    groups = [[narr[0]]]
    for s in narr[1:]:
        prev = groups[-1][-1]; gap = s['t0'] - prev['t1']; L = prev['t1'] - groups[-1][0]['t0']; rest = narr[-1]['t1'] - s['t0']
        if gap >= 0.40 and L >= 16 and rest >= 10: groups.append([s])
        else: groups[-1].append(s)
    cuts = [max(0.0, narr[0]['t0'] - 0.35)]
    for g0, g1 in zip(groups, groups[1:]): cuts.append(stil(e, g0[-1]['t1'] - 0.05, g1[0]['t0'] + 0.03))
    if q:
        qstart = lead[0]['t0'] if lead else q['t0']
        endN = stil(e, narr[-1]['t1'] - 0.08, qstart + 0.06)
        cuts.append(endN)
    else:
        cuts.append(min(dur, narr[-1]['t1'] + 0.5))
    for gi, g in enumerate(groups):
        a, b = cuts[gi], cuts[gi + 1]; sid = nid(); words = [w for s in g for w in s['words']]
        knip(src, a, b, f'{OUT}/raw/{sid}.mp3')
        json.dump({'words': [{'text': w['w'], 'start': round(w['t0'] - a, 3), 'end': round(min(w['t1'], b) - a, 3)} for w in words], 'method': 'oud (FILM.chapters[].sentences, opname v1/v2.1), verschoven'}, open(f'{OUT}/words/{sid}.json', 'w'), ensure_ascii=False)
        segs.append({'id': sid, 'kind': 'speech', 'chapter': CH[k], 'level': 'basis', 'display': ' '.join(w['w'] for w in words), 'oud': [k, round(a, 3)], 'dur': round(b - a, 3), 'zinnen': [s['n'] for s in g]})
    if q:
        a = cuts[-1]; b = stil(e, max(p for p in [qphr['t1'] - 0.3]), q['count0'] + 0.25)
        b = min(dur, max(b, qphr['t1'] + 0.15)); sid = nid()
        knip(src, a, b, f'{OUT}/raw/{sid}.mp3')
        wl = [w['w'] for s in lead for w in s['words']] + [w[0] for w in qphr['w']]
        rms, d2 = silalign.load(f'{OUT}/raw/{sid}.mp3'); al, m, K = silalign.align(wl, rms, d2)
        json.dump({'words': al, 'method': 'silalign op de oude take (gesproken vraag)'}, open(f'{OUT}/words/{sid}.json', 'w'), ensure_ascii=False)
        segs.append({'id': sid, 'kind': 'speech', 'chapter': CH[k], 'level': 'basis', 'display': ' '.join(wl), 'oud': [k, round(a, 3)], 'dur': round(b - a, 3), 'vraagStem': True})
        qid = nid('q'); opts = q['opts']
        segs.append({'id': qid, 'kind': 'question', 'chapter': CH[k], 'level': 'basis', 'options': [o['text'] for o in opts], 'correct': [o['k'] for o in opts].index(q['correct']), 'q': q['q'], 'explain': q['expl'], **({'fig': q['fig']} if q.get('fig') else {})})
    if k == 0:
        segs.append({'id': nid(), 'kind': 'title', 'chapter': 'Titel', 'level': 'basis'})
segs.append({'id': nid(), 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': ['Alleen cellen met de juiste receptor reageren op een hormoon. Daarom kan hCG het werk van LH overnemen.', 'Hetzelfde hormoon kan remmen (negatieve terugkoppeling) én aanjagen (positieve terugkoppeling, zoals de LH-piek en de weeën).', 'Anticonceptie, zwangerschapstest en ivf grijpen allemaal in op precies deze signalen.']})
json.dump(segs, open(f'{OUT}/segments.json', 'w'), ensure_ascii=False, indent=1)
open('src/oudfilm.js', 'w').write('/* oude hoofdstuktijdlijn (window.FILM van v2.6), alleen hoofdstukken, segmenten en zinnen met woordtijden; H1 zonder de geknipte zin (zie bron/info.md) */\nwindow.OUDFILM = ' + json.dumps(OUD, ensure_ascii=False, separators=(',', ':')) + ';\n')
for s in segs: print(s['id'], s['kind'], s['chapter'][:22], s.get('oud'), s.get('dur'), (s.get('display') or '')[:50], '...', (s.get('display') or '')[-40:])

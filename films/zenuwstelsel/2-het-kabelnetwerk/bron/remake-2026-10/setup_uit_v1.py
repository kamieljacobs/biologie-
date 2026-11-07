# Bouwt segments.json, raw/*.mp3 en words/*.json uit de oude film (v1.1) + de nieuwe q-takes.
import json, os, subprocess, shutil
W = '/home/claude/werk/zen2'; F = json.load(open(W + '/oud/FILM.json'))
TXT = {s['id']: s['text'] for s in F['segments']}
BLOB = {'s00': '002', 'q1': '003', 'a1': '004', 's21': '005', 'q2': '006', 'a2': '007', 's31': '008', 'q3': '009', 'a3': '010', 'q4': '011', 'a4': '012', 'q5': '013', 'a5': '014', 's70': '015'}
Q = F['plan']['questions']
NEWQ = {
 'q1': 'Wat denk je? Een impuls loopt door een neuron. Waar begint hij, en welke kant gaat hij op? Bij de dendrieten, richting de eindknopjes? Bij de eindknopjes, richting het cellichaam? Of overal tegelijk, beide kanten op?',
 'q2': 'Wat denk je? Een gif legt de natrium-kaliumpomp stil. Wat gebeurt er op den duur met het rustpotentiaal? Het verschil wordt langzaam kleiner? Het verschil wordt groter? Of er verandert niets, de pomp was alleen nodig om op te starten?',
 'q3': 'Wat denk je? Je drukt harder op je huid. Wat verandert er aan de impulsen? Ze worden groter? Er komen er meer per seconde? Of ze worden langer?',
 'q4': 'Wat denk je? Twee axonen, even lang. Eén is dik en heeft myeline. Eén is dun en heeft geen myeline. Welke impuls komt het eerst aan? De dikke met myeline? De dunne zonder myeline? Of ze komen tegelijk aan?',
 'q5': 'Wat denk je? Een drukreceptor in je huid. Waar reageert hij het makkelijkst op? Vooral op druk? Op druk en op licht? Of op elke prikkel, als die maar sterk genoeg is?'}
CH = {0: 'Cold open', 1: 'Hoofdstuk 1 — De zenuwcel', 2: 'Hoofdstuk 2 — Rust', 3: 'Hoofdstuk 3 — De impuls', 4: 'Hoofdstuk 4 — Snel en langzaam', 5: 'Hoofdstuk 5 — Van prikkel naar impuls', 6: 'Samenvatting'}
order = [('s00', 0), ('TITLE', 0), ('q1', 1), ('Q1', 1), ('a1', 1), ('s21', 2), ('q2', 2), ('Q2', 2), ('a2', 2), ('s31', 3), ('q3', 3), ('Q3', 3), ('a3', 3), ('q4', 4), ('Q4', 4), ('a4', 4), ('q5', 5), ('Q5', 5), ('a5', 5), ('s70', 6), ('END', 6)]
segs = []; idmap = {}
os.makedirs(W + '/film/raw', exist_ok=True); os.makedirs(W + '/film/words', exist_ok=True)
for n, (old, ch) in enumerate(order, 1):
    if old == 'TITLE': segs.append({'id': 's%02d' % n, 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': 'Het kabelnetwerk'}); continue
    if old == 'END': segs.append({'id': 's%02d' % n, 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': ['Een impuls is altijd even groot en loopt één kant op.', 'De sterkte van een prikkel zit in de frequentie.', 'Myeline en een dik axon maken de kabel snel.']}); continue
    if old[0] == 'Q':
        k = old[1]; q = Q[k]; opts = list(q['opts'])
        if k == '5': opts[0] = 'Vooral op druk'
        segs.append({'id': 'q%02d' % n, 'kind': 'question', 'chapter': CH[ch], 'level': 'basis', 'options': opts}); idmap[old] = 'q%02d' % n; continue
    sid = 's%02d' % n; idmap[old] = sid
    disp = NEWQ.get(old, TXT[old])
    seg = {'id': sid, 'kind': 'speech', 'chapter': CH[ch], 'look': '', 'level': 'basis', 'display': disp, 'oud': old}
    if old in NEWQ: seg['vraagzin'] = True
    segs.append(seg)
    raw = W + '/film/raw/' + sid + '.mp3'
    if old in NEWQ: shutil.copy(W + '/raw/' + old + '.mp3', raw); continue
    words = F['timing'][old]['words']; toks = disp.split()
    assert len(toks) == len(words), (old, len(toks), len(words))
    ws = [{'text': t, 'start': w['t0'], 'end': w['t1'], 'type': 'word'} for t, w in zip(toks, words)]
    src = W + '/oud/blobs/' + BLOB[old] + '.mp3'
    if old == 's31':  # knip 'Dan herstelt de pomp de rust.' (bronnen: OpenStax Biology 2e 35.2 tekst + PhysiologyWeb)
        i = [x['text'] for x in ws].index('Dan', [x['text'] for x in ws].index('hyperpolarisatie.'))
        j = i + 6; assert ws[j - 1]['text'] == 'rust.', ws[j - 1]
        a = (ws[i - 1]['end'] + ws[i]['start']) / 2; b = (ws[j - 1]['end'] + ws[j]['start']) / 2
        cut = b - a
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-filter_complex', f"[0]atrim=0:{a},asetpts=PTS-STARTPTS[x];[0]atrim={b},asetpts=PTS-STARTPTS[y];[x][y]concat=n=2:v=0:a=1", '-c:a', 'libmp3lame', '-b:a', '128k', raw], check=True)
        ws = ws[:i] + [dict(x, start=round(x['start'] - cut, 3), end=round(x['end'] - cut, 3)) for x in ws[j:]]
        seg['display'] = ' '.join(x['text'] for x in ws); print('s31 knip', round(a, 2), round(b, 2))
    else: shutil.copy(src, raw)
    json.dump({'words': ws, 'method': 'oude woordtijden v1.1'}, open(W + '/film/words/' + sid + '.json', 'w'), ensure_ascii=False)
json.dump(segs, open(W + '/film/segments.json', 'w'), ensure_ascii=False, indent=1)
json.dump(idmap, open(W + '/film/idmap.json', 'w'))
print(idmap)

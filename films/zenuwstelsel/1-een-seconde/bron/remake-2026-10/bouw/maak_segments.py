"""Bouwt film/segments.json, film/raw + film/audio en film/words uit de oude film (takes + woordtijden) en de nieuwe takes."""
import json, os, shutil, re
W = '/home/claude/werk/zen1r'; F = json.load(open(f'{W}/film_oud.json'))
inv = json.load(open('/root/biologie-/films/zenuwstelsel/1-een-seconde/bron/stem/invoer.json'))['takes']
man = json.load(open(f'{W}/oud/manifest.json')) if os.path.exists(f'{W}/oud/manifest.json') else None
src = open(f'{W}/oud/film.src.html').read()
amap = dict(re.findall(r'"(\w+)": "data:audio/mpeg;base64,@@BLOB:(\d+\.mp3)@@"', src))
CH = {0: 'Cold open', 1: 'Hoofdstuk 1 — De kaart', 2: 'Hoofdstuk 2 — De prikkel', 3: 'Hoofdstuk 3 — Remmen: via de hersenen',
      4: 'Hoofdstuk 4 — De reflex', 5: 'Hoofdstuk 5 — Gas en rem', 6: 'Hoofdstuk 6 — Weten', 7: 'Samenvatting — Terug naar de seconde'}
text = {s['id']: s['text'] for s in F['segments']}
segs = []
for it in F['plan']['timeline']:
    k = it['kind']
    if k == 'title': segs.append({'id': 'titel', 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': 'Eén seconde'}); continue
    if k == 'end': segs.append({'id': 'eind', 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': [
        'Een prikkel wordt in een receptor een impuls.', 'Een reflex gaat via het ruggenmerg, zonder de hersenen.', 'Het autonome zenuwstelsel regelt je organen: gas en rem.']}); continue
    if k in ('card', 'countdown'):
        if k == 'countdown':
            n = it['question']; segs.append({'id': f'v{n}', 'kind': 'question', 'chapter': CH[it['chapter']], 'level': 'basis', 'options': F['plan']['questions'][str(n)]['opts']})
        continue
    sid = it['id']; nieuw = sid in inv
    disp = inv[sid]['display'] if nieuw else text[sid]
    s = {'id': sid, 'kind': 'speech', 'chapter': CH[it['chapter']], 'look': it.get('scene', ''), 'level': 'basis', 'lines': [disp], 'display': disp,
         'voice': inv[sid]['voice'] if nieuw else disp, 'take': 'nieuw 29 okt 2026' if nieuw else 'oude take (4 okt 2026)'}
    if it['chapter'] == 6: s['verdieping'] = True
    segs.append(s)
    os.makedirs(f'{W}/film/raw', exist_ok=True)
    srcmp3 = f'{W}/nieuw/{sid}.mp3' if nieuw else f'{W}/oud/blobs/{amap[sid]}'
    shutil.copy(srcmp3, f'{W}/film/raw/{sid}.mp3')
    if not nieuw:
        ws = F['timing'][sid]['words']; dw = disp.split(); assert len(ws) == len(dw), sid
        json.dump({'words': [{'text': d, 'start': x['t0'], 'end': x['t1']} for d, x in zip(dw, ws)], 'method': 'oude film (ElevenLabs-alignment 4 okt 2026)'},
                  open(f'{W}/film/words/{sid}.json', 'w'), ensure_ascii=False)
json.dump(segs, open(f'{W}/film/segments.json', 'w'), ensure_ascii=False, indent=1)
print(len(segs), [s['id'] for s in segs])

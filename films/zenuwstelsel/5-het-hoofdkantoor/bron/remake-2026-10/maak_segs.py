"""oud_film.json (+ nieuwe a5) -> film/segments.json + film/words/*.json. Oude takes: woordtijden uit de oude film (timing.words)."""
import json, os
D = os.path.dirname(os.path.abspath(__file__)); F = json.load(open(os.path.join(D, 'oud_film.json')))
TXT = {s['id']: s['text'] for s in F['segments']}
NIEUW = json.load(open(os.path.join(D, 'nieuw_a5.json'))) if os.path.exists(os.path.join(D, 'nieuw_a5.json')) else None
CH = {0: 'Cold open', 1: 'Hoofdstuk 1 — Drie delen', 2: 'Hoofdstuk 2 — Horen en herkennen', 3: 'Hoofdstuk 3 — Kruislings', 4: 'Hoofdstuk 4 — De maat houden', 5: 'Hoofdstuk 5 — Vanzelf', 6: 'Hoofdstuk 6 — Samenvatting'}
OPT = {int(k): q['opts'] for k, q in F['plan']['questions'].items()}
out = []
def speech(i, ch, vraag=False):
    if i == 'a5' and NIEUW:
        disp = NIEUW['display']; words = NIEUW['words']
    else:
        disp = TXT[i]; tw = F['timing'][i]['words']; d = disp.split(); assert len(d) == len(tw), i
        words = [{'text': x['w'], 'start': x['t0'], 'end': x['t1'], 'type': 'word'} for x in tw]
    json.dump({'words': words}, open(os.path.join(D, 'film', 'words', i + '.json'), 'w'), ensure_ascii=False)
    s = {'id': i, 'kind': 'speech', 'chapter': CH[ch], 'level': 'basis', 'display': disp}
    if vraag: s['vraag'] = True
    out.append(s)
speech('s00', 0)
out.append({'id': 't01', 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': 'Het hoofdkantoor'})
for n, (pre, a) in enumerate([(['q1'], 'a1'), (['s21', 'q2'], 'a2'), (['q3'], 'a3'), (['q4'], 'a4'), (['q5'], 'a5')], 1):
    for p in pre: speech(p, n, vraag=p.startswith('q'))
    out.append({'id': 'v%d' % n, 'kind': 'question', 'chapter': CH[n], 'level': 'basis', 'options': OPT[n]})
    speech(a, n)
speech('s70', 6)
out.append({'id': 'e01', 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': ['Hersengebieden werken tegelijk, verbonden door witte stof.', 'Primaire schors ontvangt, associatieve schors herkent.', 'Links stuurt rechts; de kleine hersenen houden de maat.', 'Hersenstam en hypothalamus regelen wat vanzelf gaat.']})
json.dump(out, open(os.path.join(D, 'film', 'segments.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), 'segmenten')

"""a5: zero-width spatie vóór 'beginner' zodat de speler het niet als 'Het begin…' leest (dan knipt hij 'Het goede antwoord is B.' niet bij Vragen uit).
Bouwt segments.json + words/<id>.json uit de oude film (oudfilm.json): bestaande takes en hun ElevenLabs-woordtijden.
Vraagzinnen (q1–q5): de mededelende zin vóór de vraag eindigt hier op ':' of ',' (alleen ondertitel), zodat de speler bij
Vragen uit het hele vraagfragment wegknipt (vraagCuts knipt de laatste reeks zinnen op '?')."""
import json, os
F = json.load(open('../oudfilm.json'))
SEG = {s['id']: s['text'] for s in F['segments']}
FIX = {'a5': [('Een beginner moet', 'Een \u200bbeginner moet')], 'q1': [('nieuws. Wat', 'nieuws: wat')], 'q2': [('meer. Wat', 'meer: wat')], 'q3': [('kijkt. Wordt', 'kijkt, wordt')],
       'q4': [('toets. Wat', 'toets: wat')], 'q5': [('wel. Hoe', 'wel: hoe')]}
for k, rep in FIX.items():
    for a, b in rep: assert a in SEG[k], (k, a); SEG[k] = SEG[k].replace(a, b)
H = ['Cold open', 'Hoofdstuk 1 — Sterker door samen', 'Hoofdstuk 2 — Patronen en koppelingen', 'Hoofdstuk 3 — Twee soorten geheugen',
     'Hoofdstuk 4 — Oefenen en vergeten', 'Hoofdstuk 5 — Zijwieltjes eraf', 'Samenvatting']
Q = {q['n'] if 'n' in q else None: q for q in []}
qs = F['plan']['questions']
ORDER = [('s00', 0), ('titel', 'T'), ('q1', 1), ('v1', 1), ('a1', 1), ('s21', 2), ('s22', 2), ('q2', 2), ('v2', 2), ('a2', 2),
         ('s31', 3), ('q3', 3), ('v3', 3), ('a3', 3), ('q4', 4), ('v4', 4), ('a4', 4), ('q5', 5), ('v5', 5), ('a5', 5), ('s70', 6), ('eind', 'E')]
out = []
os.makedirs('words', exist_ok=True)
for sid, ch in ORDER:
    if ch == 'T': out.append({'id': sid, 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': 'Leren en onthouden.'}); continue
    if ch == 'E': out.append({'id': sid, 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': [
        'Leren zit in synapsen: ze worden sterker, zwakker of nieuw.',
        'Weten wát gaat via de hippocampus; weten hoe via kleine hersenen en basale kernen.',
        'Gespreid herhalen werkt; wat je niet gebruikt, wordt gesnoeid.']}); continue
    if sid.startswith('v'):
        q = qs[sid[1]]; out.append({'id': sid, 'kind': 'question', 'chapter': H[ch], 'level': 'basis', 'options': q['opts'], 'n': sid[1]}); continue
    disp = SEG[sid]; w = F['timing'][sid]['words']; d = disp.split(); assert len(d) == len(w), sid
    out.append({'id': sid, 'kind': 'speech', 'chapter': H[ch], 'level': 'basis', 'display': disp, 'voice': '(bestaande take, oude film 1.1)'})
    json.dump({'words': [{'text': x['w'], 'start': x['t0'], 'end': x['t1'], 'type': 'word'} for x in w], 'bron': 'ElevenLabs-alignment uit de oude film'}, open(f'words/{sid}.json', 'w'), ensure_ascii=False)
json.dump(out, open('segments.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), 'segmenten')

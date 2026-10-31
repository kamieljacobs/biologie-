"""Eenmalig: oude FILMDATA (DNA-bouwstraat, v1.5) -> segments.json + words/<id>.json (FILMDATA-straat).
Takes en woordtijden blijven exact; een oude vraag met eigen take (q4 ...) wordt een gesproken vraagalinea vN
(heleVraag, zelfde take, nu audio/vN.mp3) + een vraagkaart qN zonder audio. bounds (regelgrenzen) blijven mee."""
import json, os, shutil
d = json.load(open('oud/filmdata_oud.json'))
segs = []
for s in d['segments']:
    k = s['kind']
    if k == 'title': segs.append({'id': 'title', 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': d['film']['title']}); continue
    if k == 'end': segs.append({'id': 'end', 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': d['film']['endLines']}); continue
    words = s['words']
    sid = s['id'] if k == 'speech' else 'v' + s['id'][1:]
    if k == 'question': shutil.copy('audio/%s.mp3' % s['id'], 'audio/%s.mp3' % sid)
    o = {'id': sid, 'kind': 'speech', 'chapter': s['chapter'], 'level': s['level'], 'oud': s['id'], 'scene_oud': s.get('scene'),
         'display': ' '.join(w['t'] for w in words), 'bounds': s.get('bounds') or []}
    if k == 'question': o['heleVraag'] = True
    segs.append(o)
    json.dump({'words': [{'text': w['t'], 'start': w['s'], 'end': w['e'], 'type': 'word'} for w in words]}, open('words/%s.json' % sid, 'w'), ensure_ascii=False)
    if k == 'question':
        q = {'id': s['id'], 'kind': 'question', 'chapter': s['chapter'], 'level': s['level'], 'options': s['options'], 'q': s['q'], 'correct': s['correct']}
        if s.get('think'): q['think'] = s['think']
        if s.get('source'): q['source'] = s['source']
        segs.append(q)
json.dump(segs, open('segments.json', 'w'), ensure_ascii=False, indent=1)
print(len(segs), 'segmenten')

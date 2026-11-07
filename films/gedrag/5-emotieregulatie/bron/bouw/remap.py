"""remap.py — na make_segments (script_v3.md): houd de oude segment-id's vast en geef het nieuwe hoofdstuk 3 (adem, 20 okt 2026) de id's s21–s27.
Zonder dit schuiven s09–s11 door, en passen audio, woordtijden en scènes niet meer."""
import json
M = {'s09': 's21', 's10': 's22', 's11': 's23', 's12': 's24', 'q13': 'q25', 's14': 's26', 's15': 's27', 's16': 's09', 's17': 's10', 's18': 's11'}
S = json.load(open('segments.json'))
assert [s['id'] for s in S][8:] == list(M), [s['id'] for s in S]
for s in S: s['id'] = M.get(s['id'], s['id'])
json.dump(S, open('segments.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print([(s['id'], s['chapter'][:22]) for s in S])

"""Bouwt blad/storyboards.html + blad/img/<id>.webp uit films/f*.json en de gerenderde keyframes in out/*/."""
import json, glob, os, shutil
B = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(B)
films = []
for p in sorted(glob.glob(os.path.join(R, 'films', 'f[1-8].json'))):
    f = json.load(open(p))
    films.append({k: f.get(k) for k in ('film', 'titel', 'slug', 'puzzel', 'haak', 'duur', 'hoofdstukken')} | {
        'keuzes': f.get('keuzes_en_twijfels', []),
        'scenes': [{k: s.get(k) for k in ('id', 'hoofdstuk', 'laag', 'look', 'tekst', 'beweging', 'opties', 'juist') if s.get(k) is not None} for s in f['scenes']]})
films.sort(key=lambda f: f['film'])
os.makedirs(os.path.join(B, 'img'), exist_ok=True)
kandidaten = {}
for w in glob.glob(os.path.join(R, 'out', '*', '*.webp')):
    i = os.path.basename(w)[:-5]
    if i not in kandidaten or os.path.getmtime(w) > os.path.getmtime(kandidaten[i]): kandidaten[i] = w
mist = []
for f in films:
    for s in f['scenes']:
        if s['id'] in kandidaten: shutil.copy(kandidaten[s['id']], os.path.join(B, 'img', s['id'] + '.webp'))
        else: mist.append(s['id'])
html = open(os.path.join(B, 'sjabloon.html')).read().replace('/*FILMS*/[]', json.dumps(films, ensure_ascii=False))
open(os.path.join(B, 'storyboards.html'), 'w').write(html)
print('films', len(films), 'scènes', sum(len(f['scenes']) for f in films), 'zonder keyframe', mist)

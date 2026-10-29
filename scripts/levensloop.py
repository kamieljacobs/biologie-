#!/usr/bin/env python3
"""Vult het AUTO-blok in personages/LEVENSLOOP.md: per castpersonage de films waarin hij/zij voorkomt.
Zoekt in films/**/bron/**/*.js (persoon(ctx,'id' / pers('id' / persoon('id'), niet in lib_*.js)
en in bron/script.md naar de naam. Idempotent."""
import re, pathlib, collections
R = pathlib.Path(__file__).resolve().parent.parent
cast = (R/'personages/lib_cast.js').read_text(encoding='utf8')
blok = cast[cast.index('const CAST = {'):cast.index('const CAST_FAMILIE')]
ids = {}
for m in re.finditer(r"^  (\w+):\s*\{ naam: '([^']+)'", blok, re.M):
    ids[m.group(1)] = m.group(2)
# twee personages met dezelfde naam: in deze films hoort de naam in het script bij het andere personage (29 okt 2026: Sanne in Hormonen 2 = sanne16, niet de verpleegkundige)
NAAM_NIET = {'sanne': ('films/hormonen/2-suiker-in-balans',)}
aanroep = {i: re.compile(r"\b(?:persoon|pers)\(\s*(?:ctx\s*,\s*)?['\"]%s['\"]" % i) for i in ids}
films = collections.defaultdict(set)  # id -> set(filmmap)
for f in (R/'films').rglob('bron'):
    if not f.is_dir(): continue
    film = f.parent.relative_to(R).as_posix()
    if film.startswith(('films/benchmark', 'films/archief')): continue
    for js in f.rglob('*.js'):
        if js.name.startswith('lib'): continue
        try: t = js.read_text(encoding='utf8')
        except Exception: continue
        for i, rx in aanroep.items():
            if rx.search(t): films[i].add(film)
    sc = f/'script.md'
    if sc.exists():
        t = sc.read_text(encoding='utf8')
        for i, n in ids.items():
            if film in NAAM_NIET.get(i, ()): continue
            if len(n) > 3 and re.search(r'\b%s\b' % re.escape(n), t): films[i].add(film)
def groep(p):
    d = p.split('/')
    return '/'.join(d[1:3]) if d[1] in ('onderbouw', 'vervolg') and len(d) > 3 else d[1]
uit = []
for i, n in ids.items():
    fl = sorted(films[i])
    uit.append(f'### {n} (`{i}`) — {len(fl)} films')
    g = collections.defaultdict(list)
    for p in fl: g[groep(p)].append(p.split('/')[-1] if groep(p) != p.split('/')[1] or True else p)
    for k in sorted(g): uit.append(f'- `{k}`: ' + ', '.join(g[k]))
    if not fl: uit.append('- (geen films gevonden)')
    uit.append('')
auto = '<!-- AUTO:start -->\n' + '\n'.join(uit) + '<!-- AUTO:end -->'
p = R/'personages/LEVENSLOOP.md'
t = p.read_text(encoding='utf8')
if '<!-- AUTO:start -->' in t:
    t = re.sub(r'<!-- AUTO:start -->.*<!-- AUTO:end -->', lambda m: auto, t, flags=re.S)
else:
    t += '\n' + auto + '\n'
p.write_text(t, encoding='utf8')
print('LEVENSLOOP.md bijgewerkt:', sum(1 for i in ids if films[i]), 'van', len(ids), 'personages met films')

"""Maakt sessie/reviewlijst.json: alle films op de site voor de reviewpagina (sessie/review.html).

Bron: HOOFDSTUKKEN en REVIEW in index.html, plus films/vervolg/films.json (Wat word jij?).
Draai na het toevoegen, hernoemen of opnieuw bouwen van films (idempotent):
    python3 scripts/reviewlijst.py
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sitedata  # noqa: E402

R = sitedata.R


def review_status():
    s = open(os.path.join(R, 'index.html'), encoding='utf-8').read()
    i = s.index('const REVIEW = {')
    j = s.index('\n};', i)
    uit = {}
    for m in re.finditer(r'"([^"]+\.html)"\s*:\s*"(\w+)"', s[i:j]):
        uit[m.group(1)] = m.group(2)
    return uit


def main():
    h, _ = sitedata.lees()
    rev = review_status()
    groepen, gezien = [], set()

    def film(f, extra=None):
        href = f.get('href')
        if not href or href in gezien or not os.path.exists(os.path.join(R, href)):
            return None
        gezien.add(href)
        d = {'href': href, 'titel': f.get('titel', href), 'duur': f.get('duur'), 'vraag': f.get('vraag', '')}
        if rev.get(href):
            d['repo'] = rev[href]
        if extra:
            d['extra'] = True
        return d

    for hid, hs in h.items():
        if hid == 'extra':
            continue
        lijst = [x for x in (film(f) for f in hs.get('films', [])) if x]
        lijst += [x for x in (film(f, True) for f in h.get('extra', {}).get('films', []) if f.get('thema') == hid) if x]
        if lijst:
            groepen.append({'id': hid, 'naam': hs.get('titel') or hs.get('label') or hid, 'films': lijst})

    rest = [x for x in (film(f, True) for f in h.get('extra', {}).get('films', [])) if x]
    if rest:
        groepen.append({'id': 'extra', 'naam': 'Extra', 'films': rest})

    vp = os.path.join(R, 'films', 'vervolg', 'films.json')
    if os.path.exists(vp):
        lijst = [x for x in (film(f) for f in json.load(open(vp, encoding='utf-8'))) if x]
        if lijst:
            groepen.append({'id': 'vervolg', 'naam': 'Wat word jij?', 'films': lijst})

    uit = os.path.join(R, 'sessie', 'reviewlijst.json')
    nieuw = json.dumps({'groepen': groepen}, ensure_ascii=False, indent=1) + '\n'
    oud = open(uit, encoding='utf-8').read() if os.path.exists(uit) else ''
    if nieuw != oud:
        open(uit, 'w', encoding='utf-8').write(nieuw)
    n = sum(len(g['films']) for g in groepen)
    print(f'{n} films in {len(groepen)} groepen' + ('' if nieuw != oud else ' (ongewijzigd)'))


if __name__ == '__main__':
    main()

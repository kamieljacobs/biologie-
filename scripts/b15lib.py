"""Gedeelde logica voor B15 (variatie en selectie) — Kamiel 29 okt 2026: 'een zelflerende prompt'.

Gebruikt door scripts/dobbelsteen.py, b15rapport.py, b15poort.py, regelcheck.py en ijking.py.
Alles wat hier staat is rekenwerk op de logboeken; niets hier verandert de prompt zelf.

Kernbegrippen
- Een *film* in het logboek = alle regels met hetzelfde 'pad' (de film op de site).
- *Ronde 1* = de varianten klassiek / klein / groot. Een combinatie is ronde 2.
- *Duidelijk of nipt*: zelfde definitie als prompt v10 / CLAUDE.md (de meetlat niet verschuiven):
  nipt = de winnaar van ronde 1 wint met NIPT_PUNTEN punt of minder, of de beoordelaar noemt het
  zelf nipt (of gelijkspel). Kiest Kamiel (beslist_door = kamiel), dan telt zijn keuze altijd.
- *Nipt telt niet* (Kamiel 29 okt 2026): een nipte film levert geen winst en geen verlies op
  voor de winkansen van de dobbelsteen; hij staat wel in het rapport.
"""
import json, os, re, collections

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG = os.path.join(R, 'films', 'logboek', 'mutaties.jsonl')
UITZ = os.path.join(R, 'films', 'logboek', 'b15_uitzonderingen.jsonl')
POOL = os.path.join(R, 'films', 'mutatiepool.json')
REGELS = os.path.join(R, 'films', 'logboek', 'regels.json')
KEUZES = os.path.join(R, 'bibliotheek', 'logboek', 'keuzes.jsonl')
STATS = os.path.join(R, 'statistieken', 'data.json')
NIPT_PUNTEN = 1

# vertelvormen in oude logregels die onder een poolvorm vallen
ALIAS = {'proefstroken-experiment': 'experiment-als-kapstok', 'rol-personage': 'rol van het personage'}


def jsonl(pad):
    if not os.path.exists(pad):
        return []
    return [json.loads(l) for l in open(pad, encoding='utf-8') if l.strip()]


def json_of(pad, standaard=None):
    return json.load(open(pad, encoding='utf-8')) if os.path.exists(pad) else standaard


def norm(s):
    return ALIAS.get(s, s)


def rijen():
    return jsonl(LOG)


def films(rs=None):
    """pad -> dict met reeks, datum, ronde1 (lijst), combi (rij of None), uitslag."""
    rs = rijen() if rs is None else rs
    per = collections.OrderedDict()
    for r in rs:
        sleutel = r.get('pad') or f"{r.get('reeks')}/{r.get('film')}"
        per.setdefault(sleutel, []).append(r)
    uit = collections.OrderedDict()
    for pad, groep in per.items():
        r1 = [r for r in groep if r.get('soort') in ('klassiek', 'klein', 'groot')]
        combi = next((r for r in groep if r.get('soort') == 'combinatie'), None)
        if not r1:
            continue
        uit[pad] = {'pad': pad, 'reeks': groep[0].get('reeks'), 'datum': groep[0].get('datum'),
                    'film': groep[0].get('film'), 'ronde1': r1, 'combi': combi, **uitslag(r1)}
    return uit


def uitslag(r1):
    """Wie won ronde 1, en was dat duidelijk? Kamiels keuze gaat voor."""
    kamiel = [r for r in r1 if r.get('beslist_door') == 'kamiel' and r.get('won')]
    if kamiel:
        return {'winnaar': kamiel[0], 'marge': None, 'duidelijk': True, 'door': 'kamiel'}
    s = sorted(r1, key=lambda r: -(r.get('score') or 0))
    w = next((r for r in r1 if r.get('won')), s[0])
    tweede = max((r.get('score') or 0) for r in r1 if r is not w) if len(r1) > 1 else 0
    marge = (w.get('score') or 0) - tweede
    zegt_nipt = bool(re.search(r'\bnipt\b|gelijkspel', w.get('reden', ''), re.I))
    return {'winnaar': w, 'marge': marge, 'duidelijk': marge > NIPT_PUNTEN and not zegt_nipt,
            'door': 'beoordelaar'}


def sleutels(r):
    """Welke poolsoorten deze variant droeg (voor winkansen)."""
    if r.get('soort') == 'groot':
        return [norm(r.get('vertelvorm'))]
    if r.get('soort') == 'klein':
        return [norm(m) for m in r.get('mutaties') or []]
    return []


def winkansen(alleen_duidelijk=True):
    """soort -> [gewonnen, geprobeerd]; nipte films tellen niet mee als alleen_duidelijk."""
    tel = collections.defaultdict(lambda: [0, 0])
    for f in films().values():
        if alleen_duidelijk and not f['duidelijk']:
            continue
        for r in f['ronde1']:
            for s in sleutels(r):
                tel[s][1] += 1
                tel[s][0] += 1 if r is f['winnaar'] else 0
    return tel


def concept_vorm(vorm):
    pool = json_of(POOL, {})
    return norm(vorm) in pool.get('concept_vormen', [])


def regels():
    return json_of(REGELS, {'regels': []})


def proefregel_bewijs(regel, fs=None):
    """Telt per film of de regel is toegepast en of die variant won.
    Een regel met 'meet' = 'concept_vorm' wordt uit het logboek afgeleid (P1);
    andere regels tellen alleen films waar een variant 'proefregels': [id] draagt."""
    fs = films() if fs is None else fs
    uit = []
    for f in fs.values():
        for r in f['ronde1']:
            toegepast = (regel.get('meet') == 'concept_vorm' and r.get('soort') == 'groot'
                         and concept_vorm(r.get('vertelvorm'))) or regel['id'] in (r.get('proefregels') or [])
            if toegepast:
                uit.append({'pad': f['pad'], 'reeks': f['reeks'], 'datum': f['datum'],
                            'won': r is f['winnaar'], 'duidelijk': f['duidelijk']})
    return uit


def herhaald(regel, bewijs):
    """Herhalen voor promoveren (Kamiel 29 okt 2026): duidelijke winst in ≥ 2 films, waarvan
    ≥ 1 in een reeks waarin de regel níet ontdekt werd."""
    eigen = set(regel.get('ontdekt_in_reeksen', []))
    winst = [b for b in bewijs if b['won'] and b['duidelijk']]
    buiten = [b for b in winst if b['reeks'] not in eigen]
    return len(winst) >= 2 and len(buiten) >= 1, winst, buiten


def site_films():
    """href -> datum van alle films op de site (index.html + Wat word jij?)."""
    import sys
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from sitedata import lees
    h, _ = lees()
    uit = {}
    for v in h.values():
        for f in v.get('films', []):
            if f.get('href'):
                uit[f['href'].split('#')[0].split('?')[0]] = f.get('datum', '')
    vj = json_of(os.path.join(R, 'films', 'vervolg', 'films.json'), [])
    for f in vj:
        uit.setdefault(f['href'].split('#')[0].split('?')[0], f.get('datum', ''))
    return uit


def leerlingsignaal(fs=None):
    """vertelvorm van de winnaar -> (films, gestart, uitgekeken). Leeg als er nog geen cijfers zijn."""
    data = json_of(STATS, {}) or {}
    start, uitg = data.get('start') or {}, data.get('uitgekeken') or {}
    if not start:
        return None, data.get('fout') or 'statistieken/data.json heeft nog geen kijkcijfers'
    fs = films() if fs is None else fs
    per = collections.defaultdict(lambda: [0, 0, 0])
    for f in fs.values():
        s = (start.get(f['pad']) or {}).get('totaal', 0)
        if s < 20:  # te weinig kijkers om iets te zeggen
            continue
        u = (uitg.get(f['pad']) or {}).get('totaal', 0)
        vorm = norm(f['winnaar'].get('vertelvorm') or f['winnaar'].get('soort'))
        p = per[vorm]
        p[0] += 1; p[1] += s; p[2] += u
    return dict(per), None

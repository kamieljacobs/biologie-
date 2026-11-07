"""Haalt de kijkcijfers op bij GoatCounter en schrijft statistieken/data.json voor het dashboard (statistieken/index.html).
Draait elke nacht via .github/workflows/statistieken.yml; de API-sleutel staat als repository secret GOATCOUNTER_TOKEN.
Lokaal: GOATCOUNTER_TOKEN=... python3 scripts/statistieken_ophalen.py
In data.json komen alleen totalen per pagina en per gebeurtenis (start/halverwege/uitgekeken), geen bezoekersgegevens."""
import datetime as dt, json, os, sys, time, urllib.parse, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sitedata import R, lees

SITE = os.environ.get('GOATCOUNTER_SITE', 'https://biologiebijkamiel.goatcounter.com')
TOKEN = os.environ.get('GOATCOUNTER_TOKEN', '').strip()
BEGIN = dt.datetime(2026, 10, 15, tzinfo=dt.timezone.utc)  # dag dat de teller live ging
SOORTEN = ('start', 'halverwege', 'uitgekeken')


def api(pad, params):
    url = SITE + '/api/v0/' + pad + '?' + urllib.parse.urlencode(params, doseq=True)
    for poging in range(5):
        req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429:  # te snel: even wachten
                time.sleep(int(e.headers.get('Retry-After') or 5) + 1)
                continue
            raise SystemExit(f'GoatCounter gaf fout {e.code} op {pad}: {e.read()[:300]!r}')
    raise SystemExit('GoatCounter bleef "te snel" zeggen')


def iso(t):
    return t.strftime('%Y-%m-%dT%H:00:00Z')


def alle_hits(start, eind, per_dag=False):
    """Alle paden met hun aantal bezoekers in [start, eind), over meerdere pagina's."""
    gezien, uit = set(), []
    while True:
        params = {'start': iso(start), 'end': iso(eind), 'limit': 100}
        if per_dag:
            params['group'] = 'day'
        if gezien:
            params['exclude_paths'] = ','.join(str(i) for i in sorted(gezien))
        d = api('stats/hits', params)
        nieuw = [h for h in d.get('hits') or [] if h['path_id'] not in gezien]
        if gezien and len(nieuw) < len(d.get('hits') or []):
            # komma-lijst niet begrepen: probeer herhaalde parameters
            params['exclude_paths'] = sorted(gezien)
            d = api('stats/hits', params)
            nieuw = [h for h in d.get('hits') or [] if h['path_id'] not in gezien]
        uit += nieuw
        gezien |= {h['path_id'] for h in nieuw}
        if not d.get('more') or not nieuw:
            return uit
        time.sleep(float(os.environ.get("PAUZE","1")))


def schoon(pad):
    return pad.lstrip('/')


def main():
    hoofdstukken, niveaus = lees()
    nu = dt.datetime.now(dt.timezone.utc).replace(minute=0, second=0, microsecond=0) + dt.timedelta(hours=1)
    data = {'bijgewerkt': dt.datetime.now(dt.timezone.utc).isoformat(timespec='minutes'),
            'begin': BEGIN.date().isoformat(), 'paginas': {}, 'dagen': {}}
    for s in SOORTEN:
        data[s] = {}

    if TOKEN:
        def verwerk(hits, veld):
            for h in hits:
                p = schoon(h['path'])
                if h.get('event'):
                    soort, _, rest = p.partition('/')
                    if soort in SOORTEN:
                        data[soort].setdefault(rest, {'totaal': 0, 'week': 0})[veld] += h['count']
                else:
                    data['paginas'].setdefault(p, {'totaal': 0, 'week': 0})[veld] += h['count']
        verwerk(alle_hits(BEGIN, nu), 'totaal')
        time.sleep(float(os.environ.get("PAUZE","1")))
        maand = alle_hits(max(BEGIN, nu - dt.timedelta(days=30)), nu, per_dag=True)
        week_grens = (nu - dt.timedelta(days=7)).date().isoformat()
        for h in maand:
            p = schoon(h['path'])
            film_start = h.get('event') and p.startswith('start/')
            film_pagina = not h.get('event') and p.startswith('films/')
            for st in h.get('stats') or []:
                dag, n = st.get('day'), st.get('daily') or 0
                if not dag or not n:
                    continue
                if dag >= week_grens:
                    if h.get('event'):
                        soort, _, rest = p.partition('/')
                        if soort in SOORTEN:
                            data[soort].setdefault(rest, {'totaal': 0, 'week': 0})['week'] += n
                    else:
                        data['paginas'].setdefault(p, {'totaal': 0, 'week': 0})['week'] += n
                if film_start or film_pagina:
                    d = data['dagen'].setdefault(dag, {'geopend': 0, 'gestart': 0})
                    d['gestart' if film_start else 'geopend'] += n
    else:
        data['fout'] = 'Geen GOATCOUNTER_TOKEN: zet de API-sleutel als repository secret.'

    # inhoud van de site, zodat het dashboard dezelfde indeling toont
    data['hoofdstukken'] = {
        k: {'titel': v.get('titel'), 'label': v.get('label'),
            'films': [{'href': f['href'], 'titel': f.get('titel'), 'duur': f.get('duur'), 'bij': f.get('bij')}
                      for f in v.get('films', []) if f.get('href')],
            'tools': [{'href': t['href'], 'naam': t.get('naam')} for t in v.get('tools', []) if t.get('href')]}
        for k, v in hoofdstukken.items()}
    data['niveaus'] = {
        n: [{'code': o.get('code'), 'naam': o.get('naam'),
             'hoofdstukken': [s[4].lstrip('#') for s in o.get('subs', []) if len(s) > 4 and s[4].startswith('#')]}
            for o in v.get('ond', [])]
        for n, v in niveaus.items()}

    uit = os.path.join(R, 'statistieken', 'data.json')
    os.makedirs(os.path.dirname(uit), exist_ok=True)
    json.dump(data, open(uit, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('geschreven:', uit, '|', len(data['paginas']), "pagina's,", len(data['start']), 'films gestart')
    if not TOKEN:
        sys.exit(data['fout'])


if __name__ == '__main__':
    main()

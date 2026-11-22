#!/usr/bin/env python3
"""Verdeel de plek van het juiste antwoord eerlijk over A/B/C in de films.

Kamiel 22 nov 2026: 'in de video's op mijn site zijn de antwoorden bijna altijd B'.

Werkt op films in de FILMDATA-bouwvorm (window.FILMDATA met segmenten van
kind 'question'). Per film krijgen de vragen samen een gelijke verdeling over
de posities; welke vraag welke plek krijgt is per film geschud (vaste seed =
pad van de film), dus het script is idempotent: opnieuw draaien verandert niets.
Het juiste antwoord gaat naar zijn doelplek, de foute opties houden hun
onderlinge volgorde.

Niet geschud (de plek blijft staan, maar telt wel mee voor de verdeling):
- de stem noemt de letter ('Antwoord B.', 'B. Eenenvijftig.'): dan klopt de
  opname niet meer;
- de stem leest de opties voor in de vraag (twee of meer opties letterlijk in
  de vertelling vóór de vraag);
- de uitleg of de vertelling na de vraag verwijst naar een letter;
- een optie hoort logisch op een vaste plek ('allebei', 'geen van beide',
  'alle drie', 'beide', ...) of alle opties zijn getallen (reeks laten staan).

Ook bijgewerkt: dezelfde vraag in de bronmap (film.json, segments.json,
film.py, *.js, en de letter in de antwoordtabel van info.md e.d.), zodat een
herbouw uit de bron dezelfde volgorde houdt. Draai dit script na elke
(her)bouw van een film, net als antwoordtekst.py en kortantwoord.py.

Gebruik:
  python3 scripts/antwoordschudden.py            # schudden en schrijven
  python3 scripts/antwoordschudden.py --check    # alleen melden (exit 1 bij werk)
  python3 scripts/antwoordschudden.py --verslag  # verdeling voor en na
"""
import glob, hashlib, json, os, random, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

FD_RE = re.compile(r'(window\.FILMDATA\s*=\s*)(\{.*?\})(\s*;?\s*</script>)', re.S)
SPREEK_LETTER = re.compile(r'^\s*(?:(?:het\s+)?antwoord(?:\s+is)?\s+)?(?:aa|bee|cee|dee|[a-d])\s*[.,:!]', re.I)
LETTER_REF = re.compile(r'\b(?:antwoord|optie|keuze)\s+(?:aa|bee|cee|[a-d])\b', re.I)
VAST = re.compile(r'\b(allebei|beide|alle drie|alle vier|geen van (?:beide|deze|allen|drieën)|geen van de|allemaal|alle antwoorden|a en b|b en c)\b', re.I)
GETALWOORD = r'(\d|een|één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|half|helft|kwart|derde|nul|honderd|duizend)'


def norm(t):
    return re.sub(r'[^a-z0-9à-ÿ ]', ' ', t.lower()).split()


def spraak(seg):
    return ' '.join(w['t'] for w in seg.get('words', []) or [])


WOORDGETAL = {'nul': 0, 'geen': 0, 'een': 1, 'één': 1, 'twee': 2, 'drie': 3, 'vier': 4, 'vijf': 5, 'zes': 6,
              'zeven': 7, 'acht': 8, 'negen': 9, 'tien': 10, 'elf': 11, 'twaalf': 12, 'twintig': 20,
              'dertig': 30, 'veertig': 40, 'vijftig': 50, 'zestig': 60, 'zeventig': 70, 'tachtig': 80,
              'negentig': 90, 'honderd': 100, 'duizend': 1000, 'miljoen': 1e6, 'miljard': 1e9,
              'kwart': 0.25, 'half': 0.5, 'helft': 0.5}


def getal(o):
    m = re.search(r'-?\d+(?:[.,]\d+)?', o)
    if m:
        return float(m.group(0).replace(',', '.'))
    w = norm(o)
    if not w:
        return None
    # 'een derde', 'twee derde', 'een kwart'
    if len(w) >= 2 and w[1] in ('derde', 'kwart', 'vijfde', 'tiende') and w[0] in WOORDGETAL:
        return WOORDGETAL[w[0]] / {'derde': 3, 'kwart': 4, 'vijfde': 5, 'tiende': 10}[w[1]]
    for x in w[:2]:
        if x in WOORDGETAL and x not in ('een', 'geen'):
            return WOORDGETAL[x]
        mm = re.match(r'(een|twee|drie|vier|vijf|zes|zeven|acht|negen)en(twintig|dertig|veertig|vijftig|zestig|zeventig|tachtig|negentig)$', x)
        if mm:
            return WOORDGETAL[mm.group(1)] + WOORDGETAL[mm.group(2)]
    return None


def reden_overslaan(segs, i):
    q = segs[i]
    opts = q.get('options') or []
    if len(opts) < 2 or not isinstance(q.get('correct'), int):
        return 'geen gewone meerkeuze'
    # vertelling direct na de vraag (tot de volgende vraag)
    na = []
    for s in segs[i + 1:]:
        if s.get('kind') == 'question':
            break
        if s.get('kind') == 'speech':
            na.append(spraak(s))
    if na and SPREEK_LETTER.match(na[0]):
        return 'letter ingesproken'
    if LETTER_REF.search(' '.join(na)) or LETTER_REF.search(q.get('explain', '')):
        return 'verwijzing naar letter'
    # vertelling vlak vóór de vraag: leest de stem de opties voor?
    voor = ''
    for s in reversed(segs[:i]):
        if s.get('kind') == 'speech':
            voor = ' '.join(norm(spraak(s)))
            break
        if s.get('kind') == 'question':
            break
    gelezen = 0
    for o in opts:
        w = norm(o)
        if len(w) >= 2 and ' '.join(w[:4]) in voor:
            gelezen += 1
    if gelezen >= 2:
        return 'opties voorgelezen'
    if any(VAST.search(o) for o in opts):
        return 'optie met vaste plek'
    # opties die allemaal een getal zijn: volgorde laten staan (los van de
    # huidige volgorde, anders is het script niet idempotent)
    if all(getal(o) is not None for o in opts):
        return 'getallen'
    return None


def doelen(pad, vragen):
    """vragen = lijst (index, n, vast_pos of None). Geeft {index: doelpositie}."""
    rng = random.Random(int(hashlib.md5(pad.encode()).hexdigest(), 16))
    per_n = {}
    for idx, n, vast in vragen:
        per_n.setdefault(n, []).append((idx, vast))
    uit = {}
    for n, lijst in per_n.items():
        telling = Counter(v for _, v in lijst if v is not None)
        vrij = [idx for idx, v in lijst if v is None]
        totaal = len(lijst)
        # aantal per positie zo gelijk mogelijk, rekening houdend met de vaste
        doel = [totaal // n + (1 if p < totaal % n else 0) for p in range(n)]
        posities = list(range(n))
        rng.shuffle(posities)  # wie krijgt de 'extra' bij een rest: per film anders
        doel = {posities[k]: doel[k] for k in range(n)}
        tekort = []
        for p in range(n):
            tekort += [p] * max(0, doel[p] - telling[p])
        while len(tekort) < len(vrij):
            tekort.append(rng.randrange(n))
        tekort = tekort[:len(vrij)]
        # binnen de film ook geen reeksen van dezelfde letter: probeer een
        # vast aantal geschudde verdelingen en kies die met de kortste reeksen
        # (de vaste vragen tellen mee in de volgorde)
        def score(keuze):
            pos = dict(zip(vrij, keuze))
            rij = [pos.get(idx, v) for idx, v in lijst]
            langste = cur = 1
            gelijk = 0
            for a, b in zip(rij, rij[1:]):
                cur = cur + 1 if a == b else 1
                gelijk += a == b
                langste = max(langste, cur)
            return (langste, gelijk)
        beste = None
        for _ in range(400):
            k = list(tekort)
            rng.shuffle(k)
            sc = score(k)
            if beste is None or sc < beste[0]:
                beste = (sc, k)
        for idx, p in zip(vrij, beste[1] if beste else []):
            uit[idx] = p
    return uit


def herschik(opts, correct, doel):
    goed = opts[correct]
    rest = [o for k, o in enumerate(opts) if k != correct]
    rest.insert(doel, goed)
    return rest


def bronmappen(film):
    d = os.path.dirname(film) if film.endswith('/index.html') else film[:-5]
    mappen = [os.path.join(d, 'bron')]
    bouw = os.path.join(os.path.dirname(d), '_bouw')
    if os.path.isdir(bouw):
        mappen.append(bouw)
    return [m for m in mappen if os.path.isdir(m)]


def bronbestanden(film):
    for m in bronmappen(film):
        for p in glob.glob(os.path.join(m, '**', '*'), recursive=True):
            if '/oud/' in p or not os.path.isfile(p):
                continue
            if os.path.splitext(p)[1] in ('.json', '.py', '.js', '.md') and os.path.getsize(p) < 20_000_000:
                yield p


def lijst_varianten(opts):
    for asc in (False, True):
        for sep in (', ', ','):
            yield json.dumps(opts, ensure_ascii=asc, separators=(sep, ': ' if sep == ', ' else ':'))
    yield repr(opts)


CORR_RE = r'(["\']?correct["\']?\s*[:=]\s*)%d\b'


def json_stijl(tekst, data):
    """Zoek de dump-instelling die het origineel exact teruggeeft, anders None."""
    for indent in (None, 1, 2, 4, '\t'):
        for asc in (False, True):
            for sep in ((', ', ': '), (',', ': '), (',', ':')):
                if indent is not None and sep == (', ', ': '):
                    continue
                uit = json.dumps(data, ensure_ascii=asc, indent=indent, separators=sep)
                if uit == tekst or uit + '\n' == tekst:
                    return dict(ensure_ascii=asc, indent=indent, separators=sep), tekst.endswith('\n') and not uit.endswith('\n')
    return None, False


def json_bijwerken(data, wijz):
    """Loop de JSON door; dicts met de oude opties krijgen de nieuwe. Geeft set van qids."""
    raak = set()
    zoek = {json.dumps(oo, ensure_ascii=False): (qid, oo, oc, no, nc) for qid, oo, oc, no, nc in wijz}

    def loop(x):
        if isinstance(x, dict):
            for sleutel in ('options', 'opts', 'opties'):
                if isinstance(x.get(sleutel), list):
                    k = json.dumps(x[sleutel], ensure_ascii=False)
                    if k in zoek:
                        qid, oo, oc, no, nc = zoek[k]
                        x[sleutel] = list(no)
                        if x.get('correct') == oc:
                            x['correct'] = nc
                        raak.add(qid)
            for v in x.values():
                loop(v)
        elif isinstance(x, list):
            for v in x:
                loop(v)
    loop(data)
    return raak


def tekst_bijwerken(s, wijz, met_correct):
    raak = set()
    for qid, oo, oc, no, nc in wijz:
        for v in lijst_varianten(oo):
            pos = s.find(v)
            if pos < 0:
                continue
            while pos >= 0:
                if v.startswith('["'):
                    sep = (', ', ': ') if '", "' in v else (',', ':')
                    nv = json.dumps(no, ensure_ascii='\\u' in v, separators=sep)
                else:
                    nv = repr(no)
                s = s[:pos] + nv + s[pos + len(v):]
                if met_correct and oc != nc:
                    best = None
                    lo = max(0, pos - 1500)
                    for m in re.finditer(CORR_RE % oc, s[lo:pos + len(nv) + 1500]):
                        a = lo + m.start()
                        afst = min(abs(a - pos), abs(a - (pos + len(nv))))
                        if best is None or afst < best[0]:
                            best = (afst, a, m)
                    if best:
                        a, m = best[1], best[2]
                        s = s[:a] + m.group(1) + str(nc) + s[a + len(m.group(0)):]
                raak.add(qid)
                pos = s.find(v, pos + len(nv))
            break
    return s, raak


def md_bijwerken(s, wijz):
    """Letter in tabelrijen als '| q21 | ... | b juist veel insuline |'."""
    regels = s.split('\n')
    for qid, oo, oc, no, nc in wijz:
        for k, r in enumerate(regels):
            if re.search(r'\|\s*%s\s*\|' % re.escape(qid), r):
                kop = re.escape(no[nc][:12])
                regels[k] = re.sub(r'(\|\s*)([a-dA-D])(\)?\s+)(?=%s)' % kop,
                                   lambda m: m.group(1) + ('abcd'[nc] if m.group(2).islower() else 'ABCD'[nc]) + m.group(3), r)
    return '\n'.join(regels)


def bron_bijwerken(film, wijz, schrijf):
    """wijz = lijst (qid, oude opties, oud correct, nieuwe opties, nieuw correct)."""
    gevonden, geraakt = set(), []
    for p in bronbestanden(film):
        try:
            oud = open(p, encoding='utf-8').read()
        except Exception:
            continue
        s = oud
        if p.endswith('.json'):
            try:
                data = json.loads(s)
            except Exception:
                data = None
            if data is not None:
                stijl, nl = json_stijl(s, data)
                raak = json_bijwerken(data, wijz)
                if raak and stijl:
                    s = json.dumps(data, **stijl) + ('\n' if nl else '')
                    gevonden |= raak
                elif raak:
                    print('  let op: JSON-stijl niet herkend, niet geschreven:', p)
        elif p.endswith('.md'):
            s = md_bijwerken(s, wijz)
        else:
            s, raak = tekst_bijwerken(s, wijz, met_correct=True)
            gevonden |= raak
        if s != oud:
            geraakt.append(p)
            if schrijf:
                open(p, 'w', encoding='utf-8').write(s)
    gemist = [w[0] for w in wijz if w[0] not in gevonden]
    return geraakt, gemist


def films():
    for f in sorted(glob.glob('films/**/*.html', recursive=True)):
        if '/bron/' in f or 'archief' in f or 'storyboard' in f or 'verbeterblad' in f:
            continue
        yield f


def main():
    check = '--check' in sys.argv
    verslag = '--verslag' in sys.argv
    voor, na, redenen = Counter(), Counter(), Counter()
    werk, bronmist = [], []
    for f in films():
        s = open(f, encoding='utf-8').read()
        m = FD_RE.search(s)
        if not m:
            continue
        try:
            d = json.loads(m.group(2))
        except Exception:
            continue
        segs = d.get('segments', [])
        vr = []
        for i, g in enumerate(segs):
            if g.get('kind') != 'question':
                continue
            n = len(g.get('options') or [])
            r = reden_overslaan(segs, i)
            if r == 'geen gewone meerkeuze':
                continue
            redenen[r or 'geschud'] += 1
            vr.append((i, n, g['correct'] if r else None))
            voor['ABCD'[g['correct']]] += 1
        if not vr:
            continue
        dl = doelen(f, vr)
        wijz = []
        for i, n, vast in vr:
            g = segs[i]
            if i in dl and dl[i] != g['correct']:
                oo, oc = list(g['options']), g['correct']
                g['options'] = herschik(oo, oc, dl[i])
                g['correct'] = dl[i]
                wijz.append((g.get('id', str(i)), oo, oc, g['options'], g['correct']))
            na['ABCD'[g['correct']]] += 1
        if not wijz:
            continue
        werk.append((f, len(wijz)))
        if check:
            continue
        # zelfde stijl terugschrijven als het origineel
        orig = m.group(2)
        asc = '\\u' in orig[:20000] and not re.search(r'[^\x00-\x7f]', orig[:20000])
        sep = (', ', ': ') if '", "' in orig[:2000] or '": ' in orig[:2000] else (',', ':')
        nieuw = json.dumps(d, ensure_ascii=asc, separators=sep)
        # scènecode in de film tekent soms zelf de vraagkaart met de opties
        voorstuk, _ = tekst_bijwerken(s[:m.start(2)], wijz, met_correct=False)
        achterstuk, _ = tekst_bijwerken(s[m.end(2):], wijz, met_correct=False)
        s = voorstuk + nieuw + achterstuk
        open(f, 'w', encoding='utf-8').write(s)
        _, gemist = bron_bijwerken(f, wijz, True)
        if gemist and bronmappen(f):
            bronmist.append((f, gemist))
    if verslag or not check:
        tot = sum(voor.values()) or 1
        print('Verdeling juiste antwoord vóór:', {k: f'{v} ({v*100//tot}%)' for k, v in sorted(voor.items())})
        print('Verdeling juiste antwoord na:  ', {k: f'{v} ({v*100//tot}%)' for k, v in sorted(na.items())})
        print('Per vraag:', dict(redenen))
    print(f'{len(werk)} films {"met te schudden vragen" if check else "aangepast"}, {sum(n for _, n in werk)} vragen.')
    for f, g in bronmist:
        print('  bron niet gevonden (alleen HTML aangepast):', f, ','.join(g))
    if check and werk:
        sys.exit(1)


if __name__ == '__main__':
    main()

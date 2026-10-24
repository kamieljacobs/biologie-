"""f<N>.json -> ~/hw/e<N>/film.py + sections.html (+ film.json via python3 film.py)
Gebruik: python3 evo_film.py 1 2 ... 8"""
import json, re, sys, os, html
EVO = os.path.expanduser('~/evo2'); HW = os.path.expanduser('~/hw')
SUB = {1: 'variatie, allelen en de genenpool', 2: 'waarom niet de sterkste wint', 3: 'gericht, stabiliserend, splitsend, seksueel en samen',
       4: 'antibiotica, fokken en inteelt', 5: 'drift, flessenhals en genenstroom', 6: 'isolatie en soortvorming',
       7: 'fossielen, botten en DNA als bewijs', 8: 'verwantschap, kenmerken en namen',
       9: 'botten, nandoes en eilanden', 10: 'van moleculen naar de eerste cel', 11: 'de aarde als één dag van 24 uur', 12: 'van gemeenschappelijke voorouder tot neanderthaler'}
TITELS = {}
for n in range(1, 13): TITELS[n] = json.load(open(f'{EVO}/films/f{n}.json', encoding='utf-8'))['titel']
QEXTRA = {'e1q09': 'Hoe zit het met hun stippen?', 'e5q22': 'Wat gebeurt er met de twee populaties?'}
HAAK = {8: 'welke dieren bij jou in de buurt delen een recente voorouder?'}
e = html.escape

def zinnen(t, n=2):
    z = re.split(r'(?<=[.!?])\s+', t.strip()); return ' '.join(z[:n])

def maak(n):
    f = json.load(open(f'{EVO}/films/f{n}.json', encoding='utf-8')); d = f'{HW}/e{n}'
    seg = json.load(open(f'{d}/segments.json', encoding='utf-8')); mp = json.load(open(f'{d}/map.json'))
    sc = f['scenes']; vwo_ch = {h['nr'] for h in f['hoofdstukken'] if h.get('laag') == 'vwo'}
    minis = {f"Hoofdstuk {h['nr']}": h['minivraag'] for h in f['hoofdstukken']}
    minis['Recap'] = f['puzzel']
    qs = {}
    for i, s in enumerate(sc):
        if not re.match(r'e\d+q', s['id']): continue
        qid = mp[s['id'] + '_kaart']
        q = re.sub(r'\s*Wat denk je\?\s*$', '', s['tekst'].strip())
        z = re.split(r'(?<=[.!?])\s+', q); q = ' '.join(z[-2:]) if len(z) > 1 and len(z[-1]) < 60 else z[-1]
        src = open(f'{EVO}/src/sb{n}.js', encoding='utf-8').read()
        m = re.search(s['id'] + r'\(ctx[^)]*\)\s*\{[^{}]*?vraagKaart\(ctx,\s*\[(.*?)\]\s*,\s*\[', src, re.S)
        if m: q = ' '.join(a or b for a, b in re.findall(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"", m.group(1))).replace("\\'", "'")
        if s['id'] in QEXTRA: q += ' ' + QEXTRA[s['id']]
        if '?' not in q:
            vz = [x for x in re.split(r'(?<=[.!?])\s+', s['tekst']) if x.endswith('?') and 'Wat denk je' not in x]
            if vz: q += ' ' + vz[-1]
        q = re.sub(r'^Wat denk je\?\s*', '', q)
        juist = 'ABCD'.index(s['juist'].strip()[0])
        nxt = sc[i + 1]['tekst'] if i + 1 < len(sc) else ''
        qs[qid] = {'q': q, 'correct': juist, 'explain': zinnen(nxt, 3)}
    gl = [{'t': b['begrip'], 'd': b['uitleg'], **({'vwo': True} if b.get('niveau') == 'vwo' else {})} for b in f['begrippen']]
    recap = ' '.join(s['tekst'] for s in sc if s['hoofdstuk'].startswith('Samen') and s['tekst'].strip())
    X = n > 8; k = n - 8
    if X: nxt = f"volgende extra film: {TITELS[n + 1]}" if n < 12 else 'terug naar de kernreeks: Wat is evolutie?'
    else: nxt = f"volgende film: {TITELS[n + 1]}" if n < 8 else HAAK[8]
    film = {'slug': f['slug'], 'hoofdstuk': 'evolutie', 'hoofdstukNaam': 'Evolutie', 'title': f['titel'], 'sub': SUB[n],
            'puzzle': f['puzzel'], 'meta': (f'evolutie extra {k}/4' if X else f'evolutie {n}/8'), 'version': '1.0 · oktober 2026', 'titleLook': 'schema',
            'seriesline': (f'Biologie bij Kamiel · reeks Evolutie · extra film {k} van 4 (buiten het PTA)' if X else f'Biologie bij Kamiel · reeks Evolutie · film {n} van 8'), 'lead': recap, 'endHaak': nxt, 'minis': minis,
            'footer': 'Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.',
            'questions': qs, 'glossary': gl}
    # sections
    H = ['<section><h2>Checkvragen</h2>', '  <p class="meta">antwoorden ingeklapt</p>']
    for i, c in enumerate(f['checkvragen'], 1):
        v = c.get('niveau') == 'vwo'
        H.append(f'  <div class="q{" vwo-only" if v else ""}"><p><b>{i}.</b> {e(c["vraag"])}{" <span class=\"vwo-badge\">vwo</span>" if v else ""}</p>'
                 f'<details><summary>Antwoord</summary><p>{e(c["antwoord"])}</p></details></div>')
    H += ['</section>', '<section><h2>Voor de docent</h2>', '  <h3>Hoe de film het uitlegt</h3>',
          '  <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Minivraag</th></tr>']
    for h in f['hoofdstukken']:
        H.append(f"  <tr><td>{h['nr']}. {e(h['titel'])}{' (vwo)' if h.get('laag') == 'vwo' else ''}</td><td>{e(h.get('type', ''))} · {e(h.get('look', ''))}</td><td>{e(h['minivraag'])}</td></tr>")
    H += ['  </table>', '  <h3>Getallen en bronnen</h3>', '  <table><tr><th>Wat</th><th>Bron</th></tr>']
    for g in f['getallen']: H.append(f"  <tr><td>{e(g['waarde'])}</td><td>{e(g['bron'])}</td></tr>")
    H += ['  </table>', '  <h3>Keuzes en vereenvoudigingen</h3>', '  <ul>']
    for k in f['keuzes_en_twijfels']: H.append(f'  <li>{e(k)}</li>')
    if X:
        H += ['  </ul>', '  <h3>Plaats in de reeks</h3>',
              f'  <p>Extra film {k} van 4 bij de reeks Evolutie, buiten het PTA (havo en vwo). ' + ('Vorige extra film: ' + e(TITELS[n - 1]) + '. ' if n > 9 else '') + ('Volgende: ' + e(TITELS[n + 1]) + '.' if n < 12 else 'Laatste extra film.') + '</p>', '</section>']
    else: H += ['  </ul>', '  <h3>Plaats in de reeks</h3>',
          f'  <p>Film {n} van 8 in de reeks Evolutie (havo en vwo; mechanisme eerst: binnen één populatie → één populatie wordt twee → tussen soorten). ' +
          ('Vorige: ' + e(TITELS[n - 1]) + '. ' if n > 1 else '') + ('Volgende: ' + e(TITELS[n + 1]) + '.' if n < 8 else 'Laatste film van de reeks.') + '</p>', '</section>']
    open(f'{d}/sections.html', 'w', encoding='utf-8').write('\n'.join(H) + '\n')
    src = 'import json\ntrue, false = True, False\nfilm = ' + json.dumps(film, ensure_ascii=False, indent=1) + "\nfilm['sections'] = open('sections.html', encoding='utf-8').read()\njson.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)\nprint('ok')\n"
    open(f'{d}/film.py', 'w', encoding='utf-8').write(src)
    os.system(f'cd {d} && python3 film.py >/dev/null')
    print(n, len(qs), 'vragen', len(gl), 'begrippen')

for a in sys.argv[1:]: maak(int(a))

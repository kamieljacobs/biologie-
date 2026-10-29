"""f<N>.json -> /root/hwe/e<N>/film.py + sections.html (+ film.json via python3 film.py)
Gebruik: python3 eco_film.py 1 2 ... 8
Vraagteksten komen van de vraagkaart in het keyframe (sb<N>.js): ecoVraagKaart wordt in een headless browser
afgeluisterd (de films gebruiken verschillende wrappers: _vk1, _vk, e5Vraag, _vraag7 …). Aangepast van evo_film.py."""
import json, re, sys, os, html, asyncio
ECO = '/root/eco2'; HW = '/root/hwe'
SUB = {1: 'populaties tellen, groeien en begrenzen', 2: 'tolerantie, beperkende factor en niche', 3: 'voedselwebben, rovers en prooien, symbiose',
       4: 'opruimers, reducenten en mineralisatie', 5: 'energiestroom, piramides en tien procent', 6: 'de koolstofkringloop, snel en traag',
       7: 'de stikstofkringloop, van mest tot kraan', 8: 'successie, van pionier tot climax'}
PARAGRAAF = {1: ('7.2', '6.2 (+ 6.5 eilandtheorie)'), 2: ('7.1', '6.3'), 3: ('7.2 en 7.3', '6.4'), 4: ('7.3', '8.1'),
             5: ('7.3', '8.2'), 6: ('7.5', '8.3'), 7: ('7.5 (+ 7.7 uitspoeling)', '8.3'), 8: ('7.4', '8.4')}
TITELS = {n: json.load(open(f'{ECO}/films/f{n}.json', encoding='utf-8'))['titel'] for n in range(1, 9)}
HAAK = {8: 'welke pioniers groeien er op een kale plek bij jou in de buurt?'}
LIBS = ['dieren_zoog', 'dieren_overig', 'wolf_pop', 'pop_honden', 'pop_katten', 'pop_hoef', 'pop_vogels', 'pop_darwin',
        'pop_eco_rovers', 'pop_eco_hoef', 'pop_eco_klein', 'pop_eco_klein2', 'lib_eco']
TEKEN = {1: ['teken_eco1'], 2: ['teken_eco1', 'teken_eco2'], 3: ['teken_eco3'], 4: ['teken_eco4'], 5: ['teken_eco5'],
         6: ['e11_aarde', 'teken_eco6'], 7: ['teken_eco7'], 8: ['teken_eco8']}
e = html.escape

def zinnen(t, n=2):
    z = re.split(r'(?<=[.!?])\s+', t.strip()); return ' '.join(z[:n])

def kaartvragen(n, ids):
    """vraagtekst zoals op de vraagkaart van het keyframe (render.html van /root/eco2, alleen lezen)"""
    from playwright.async_api import async_playwright
    files = ','.join(LIBS + TEKEN[n] + [f'sb{n}'])
    async def run():
        async with async_playwright() as p:
            b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
            await pg.goto('file://' + ECO + '/render.html?f=' + files); await pg.evaluate('window.__ready')
            await pg.evaluate("(()=>{ const o = ecoVraagKaart; ecoVraagKaart = function (c, v, opt, f) { window.__vk = {v, opt}; return o.apply(this, arguments); }; })()")
            out = {}
            for i in ids:
                await pg.evaluate('window.__vk = null')
                try: await pg.evaluate(f"__draw('SB{n}', {i!r}, 0)")
                except Exception as ex: print('vraagkaart', i, str(ex)[:120])
                out[i] = await pg.evaluate('window.__vk')
            await b.close(); return out
    return asyncio.run(run())

def maak(n):
    f = json.load(open(f'{ECO}/films/f{n}.json', encoding='utf-8')); d = f'{HW}/e{n}'
    mp = json.load(open(f'{d}/map.json'))
    sc = f['scenes']
    minis = {f"Hoofdstuk {h['nr']}": h['minivraag'] for h in f['hoofdstukken']}
    minis['Recap'] = f['puzzel']
    kv = kaartvragen(n, [s['id'] for s in sc if re.match(r'e\d+q', s['id'])])
    qs = {}
    for i, s in enumerate(sc):
        if not re.match(r'e\d+q', s['id']): continue
        qid = mp[s['id'] + '_kaart']
        k = kv.get(s['id'])
        if k and k.get('v'):
            q = ' '.join(k['v']) if isinstance(k['v'], list) else k['v']
        else:   # terugval: de laatste zin(nen) van de vraag-alinea
            q = re.sub(r'\s*Wat denk je\?\s*$', '', s['tekst'].strip())
            z = re.split(r'(?<=[.!?])\s+', q); q = ' '.join(z[-2:]) if len(z) > 1 and len(z[-1]) < 60 else z[-1]
            print(n, s['id'], 'vraagtekst uit de alinea (geen vraagkaart gevonden)')
        if '?' not in q:
            vz = [x for x in re.split(r'(?<=[.!?])\s+', s['tekst']) if x.endswith('?') and 'Wat denk je' not in x]
            if vz: q += ' ' + vz[-1]
        q = re.sub(r'^Wat denk je\?\s*', '', ' '.join(q.split()))
        juist = 'ABCD'.index(s['juist'].strip()[0])
        nxt = sc[i + 1]['tekst'] if i + 1 < len(sc) else ''
        qs[qid] = {'q': q, 'correct': juist, 'explain': zinnen(nxt, 3)}
    gl = [{'t': b['begrip'], 'd': b['uitleg'], **({'vwo': True} if b.get('niveau') == 'vwo' else {})} for b in f['begrippen']]
    recap = ' '.join(s['tekst'] for s in sc if s['hoofdstuk'].startswith('Samen') and s['tekst'].strip())
    nxt = f"volgende film: {TITELS[n + 1]}" if n < 8 else HAAK[8]
    film = {'slug': f['slug'], 'hoofdstuk': 'ecologie', 'hoofdstukNaam': 'Ecologie', 'title': f['titel'], 'sub': SUB[n],
            'puzzle': f['puzzel'], 'meta': f'ecologie {n}/8', 'version': '1.0 · oktober 2026', 'titleLook': 'schema',
            'seriesline': f'Biologie bij Kamiel · reeks Ecologie · film {n} van 8', 'lead': recap, 'endHaak': nxt, 'minis': minis,
            'footer': 'Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.',
            'questions': qs, 'glossary': gl}
    H = ['<section><h2>Checkvragen</h2>', '  <p class="meta">antwoorden ingeklapt</p>']
    for i, c in enumerate(f['checkvragen'], 1):
        v = c.get('niveau') == 'vwo'
        H.append(f'  <div class="q{" vwo-only" if v else ""}"><p><b>{i}.</b> {e(c["vraag"])}{" <span class=\"vwo-badge\">vwo</span>" if v else ""}</p>'
                 f'<details><summary>Antwoord</summary><p>{e(c["antwoord"])}</p></details></div>')
    H += ['</section>', '<section><h2>Voor de docent</h2>', '  <h3>Hoe de film het uitlegt</h3>',
          '  <table><tr><th>Hoofdstuk</th><th>Type · look</th><th>Minivraag</th></tr>']
    for h in f['hoofdstukken']:
        lg = h.get('laag') or ''
        H.append(f"  <tr><td>{h['nr']}. {e(h['titel'])}{' (' + e(lg) + ')' if lg and lg != 'basis' else ''}</td><td>{e(h.get('type', ''))} · {e(h.get('look', ''))}</td><td>{e(h['minivraag'])}</td></tr>")
    H += ['  </table>', '  <h3>Getallen en bronnen</h3>', '  <table><tr><th>Wat</th><th>Bron</th></tr>']
    for g in f['getallen']: H.append(f"  <tr><td>{e(g['waarde'])}</td><td>{e(g['bron'])}</td></tr>")
    H += ['  </table>', '  <h3>Keuzes en vereenvoudigingen</h3>', '  <ul>']
    for k in f['keuzes_en_twijfels']: H.append(f'  <li>{e(k)}</li>')
    bvj, nec = PARAGRAAF[n]
    H += ['  </ul>', '  <h3>Plaats in de reeks</h3>',
          f'  <p>Film {n} van 8 in de reeks Ecologie (havo en vwo; elke film staat op zichzelf). Havo: Biologie voor Jou, thema 7, paragraaf {bvj}. Vwo: Nectar, paragraaf {nec}. ' +
          ('Vorige: ' + e(TITELS[n - 1]) + '. ' if n > 1 else '') + ('Volgende: ' + e(TITELS[n + 1]) + '.' if n < 8 else 'Laatste film van de reeks.') + '</p>', '</section>']
    open(f'{d}/sections.html', 'w', encoding='utf-8').write('\n'.join(H) + '\n')
    src = 'import json\ntrue, false = True, False\nfilm = ' + json.dumps(film, ensure_ascii=False, indent=1) + "\nfilm['sections'] = open('sections.html', encoding='utf-8').read()\njson.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)\nprint('ok')\n"
    open(f'{d}/film.py', 'w', encoding='utf-8').write(src)
    os.system(f'cd {d} && python3 film.py >/dev/null')
    print(n, len(qs), 'vragen', len(gl), 'begrippen')

if __name__ == '__main__':
    for a in sys.argv[1:]: maak(int(a))

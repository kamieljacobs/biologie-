#!/usr/bin/env python3
"""Keuringsblad Spieren en beweging (Zenuwstelsel 9), fase 1, 26 okt 2026: alleen de twijfelscènes (prompt v10 B7).
Besluiten in db-collectie `besluit`, doc-id `spieren__<id>`: doen = voorstel, niet = alternatief, anders = opmerking.
Gebruik: python3 films/verbeterbladen/spieren-2026-10/bouw_blad.py → keuringsblad.html"""
import base64, json, os, re
HIER = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(os.path.dirname(os.path.dirname(HIER)))
F = os.path.join(R, 'films/zenuwstelsel/9-spieren-en-beweging/bron/fase1')
img = lambda n: 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(F, 'keyframes', n), 'rb').read()).decode()
KF = {'T1': 't1-vleugel-pees.webp', 'T2': 't2-beenmerg.webp', 'T3': 't3-arm.webp', 'T4': 't4-gewricht.webp', 'T5': 't5-emg.webp',
      'T6': 't6-stijf-vraag.webp', 'T7': 't7-sarcomeer.webp', 'T8': 't8-eenheid.webp', 'T9': 't9-spoeltje.webp'}
SOORT = {'T1': 'practicum', 'T2': 'vakinhoud + tekening', 'T3': 'nieuwe tekening', 'T4': 'nieuwe tekening', 'T5': 'practicum', 'T6': 'gevoelig (vwo)',
         'T7': 'nieuwe tekening', 'T8': 'nieuwe tekening', 'T9': 'nieuwe tekening (vwo)', 'T10': 'lengte', 'Script': 'script'}
tekst = open(os.path.join(F, 'twijfel.md')).read()
vs = []
for blok in re.split(r'\n### ', tekst)[1:]:
    kop = blok.split('\n')[0]; tid = kop.split(' ')[0]
    veld = lambda n: (re.search(r'\*\*' + n + r':\*\* (.*)', blok) or [None, ''])[1].strip()
    vid = tid.lower() if tid.startswith('T') else 'script'
    vs.append(dict(id=vid, img=img(KF[tid]) if tid in KF else None, soort=SOORT.get(tid, ''), omvang='klein', bron='twijfel',
                   probleem=veld('Twijfel') + ' ' + veld('Waarom'), voorstel=veld('Voorstel'), alternatief=veld('Alternatief')))
films = [dict(film='films/zenuwstelsel/9-spieren-en-beweging.html', titel='Spieren en beweging', kort='Spieren en beweging', sleutel='spieren',
              promptversie_nu='nieuw, prompt v10',
              advies=dict(aanpak='nieuwe film (B15: winnaar experiment als kapstok, 57–52–51)',
                          waarom='Eén practicum bij mevrouw Visser draagt de film: een kippenvleugel (bot, gewricht, trekken en duwen) en plakkers op Noors biceps en triceps, van veertje tot schooltas. Het raadsel wordt beantwoord met het aantal motorische eenheden (basis) en de frequentie (vwo). Bronnenlogboek: 39 beweringen, 28 ✓, 11 ≈.',
                          werk='35 scènes · havo ± 9 min, vwo ± 12,5 min (zie T10)', credits='stem ± 7.000, transcriptie ± 500'),
              herinspreken=[], voorstellen=vs,
              kern=[dict(img=img('k1-cold-open.webp'), titel='Cold open: het practicum'), dict(img=img('t2b-bot-leeft.webp'), titel='Bot leeft (bij T2)')])]
s = open(os.path.join(HIER, 'sjabloon.html')).read().replace('__DATA__', json.dumps(films, ensure_ascii=False))
open(os.path.join(HIER, 'keuringsblad.html'), 'w').write(s); print('keuringsblad.html', len(s) // 1024, 'kB', len(vs), 'punten')

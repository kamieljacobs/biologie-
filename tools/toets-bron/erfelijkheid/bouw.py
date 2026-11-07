#!/usr/bin/env python3
"""Bouwt tools/toets-erfelijkheid-havo.html en -vwo.html uit het nieuwste oefenexamen (geraamte) + frag/*.js.
Gebruik: python3 tools/toets-bron/erfelijkheid/bouw.py [uitmap]   (standaard tools/)"""
import sys, os, re, glob
D = os.path.dirname(os.path.abspath(__file__))
R = os.path.abspath(os.path.join(D, '..', '..', '..'))
uit = sys.argv[1] if len(sys.argv) > 1 else f'{R}/tools'
src = open(f'{R}/tools/examen-havo-2026-2.html').read()
a = src.index('/* ===== opg1.js ===== */'); b = src.index('/* ================= opgaven en navigatie')
geraamte = src[:a] + '/*@@OPGAVEN@@*/\n\n' + src[b:]
frag = '\n'.join(open(p).read() for p in sorted(glob.glob(f'{D}/frag/*.js')))

def rep(s, old, new, n=None):
    if old not in s: raise SystemExit(f'niet gevonden: {old[:70]}')
    return s.replace(old, new) if n is None else s.replace(old, new, n)

for niv in ('havo', 'vwo'):
    s = geraamte
    key = f'erf-{niv}'
    s = re.sub(r'const TOOL="[^"]+";', f'const TOOL="{key}";', s)
    s = re.sub(r'"examen-havo26-2"', f'"toets-erfelijkheid-{niv}"', s)
    s = re.sub(r'<title>.*?</title>', f'<title>Oefentoets Erfelijkheid {niv} · doorklikken · Biologie bij Kamiel</title>', s)
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="Oefentoets Erfelijkheid voor {niv}: per vraag eerst hulpvragen, dan de toetsvraag, nakijken met het antwoordmodel en uitleg waarom.">', s)
    s = re.sub(r'/\* Examen havo 2026-II[^*]*\*/', f'/* Oefentoets Erfelijkheid {niv} · zelfde bouwstenen als de oefenexamens (tools/OEFENEXAMEN_PROMPT.md). */', s)
    s = rep(s, '<a class="terug" href="../index.html#examens">← Terug naar Examen</a>', '<a class="terug" href="../index.html#erfelijkheid">← Terug naar Erfelijkheid</a>')
    s = re.sub(r'<div class="eyebrow" id="eb">[^<]*</div>', f'<div class="eyebrow" id="eb">Oefentoets Erfelijkheid · {niv}</div>', s)
    s = re.sub(r'<h1 id="h1">[^<]*</h1>', '<h1 id="h1">Oefentoets Erfelijkheid</h1>', s)
    s = rep(s, 'Wit vak = de echte examenvraag', 'Wit vak = de toetsvraag')
    s = rep(s, 'Donker vak = hulpvragen en uitleg van deze tool', 'Donker vak = hulpvragen en uitleg (niet uit de toets)')
    s = re.sub(r'<p>Maak het examen stap voor stap\.[^<]*</p>', '<p>Maak de toets stap voor stap. Bij elke vraag denk je eerst na met de hulpvragen, dan beantwoord je de toetsvraag, en daarna zie je waarom het antwoord klopt. Wil je oefenen zoals bij een echte toets? Kies de toetsstand.</p>', s)
    s = rep(s, '>Examenstand<', '>Toetsstand<')
    s = rep(s, 'niet uit het examen', 'niet uit de toets')
    s = rep(s, 'Jouw antwoord op de examenvraag', 'Jouw antwoord op de toetsvraag')
    s = rep(s, '"Officiële examenvraag "', '"Toetsvraag "')
    s = rep(s, '<span class="mono">Examenvraag</span>', '<span class="mono">Toetsvraag</span>')
    s = rep(s, '`Examenvraag ${id}`', '`Toetsvraag ${id}`')
    s = rep(s, '"Officiële examentekst · © CvTE"', '"Oefentoets Erfelijkheid · ' + niv + '"')
    s = rep(s, '/* examenvraag nog eens boven', '/* toetsvraag nog eens boven')
    s = re.sub(r'\$\("#eb"\)\.textContent=`[^`]*`', f'$("#eb").textContent=`Oefentoets Erfelijkheid · {niv} · opgave ${{o.nr}}`', s)
    s = rep(s, '`Hele examen: <b>', '`Hele toets: <b>')
    s = re.sub(r'`Cijfer volgens de officiële omzettingstabel van dit examen \(\$\{NORM\}, examenblad\.nl\)\.`', '`Cijfer = 9 × score / maximum + 1. Open vragen kijk je zelf na met het antwoordmodel.`', s)
    s = re.sub(r'/\* omzettingstabel normering [^*]*\*/\nconst NORM="[^"]*";\nconst CIJFER=\[[^\]]*\];',
        '/* cijfer als bij een schooltoets: 9 × score / maximum + 1 */\nconst NORM="";\nconst CIJFER=(()=>{const L=Q.reduce((s,q)=>s+q.pts,0);return Array.from({length:L+1},(_,S)=>Math.round((9*S/L+1)*10)/10);})();', s)
    s = re.sub(r'<footer>.*?<span data-licentie', '<footer>Eigen vragen, met inspiratie uit de centrale examens (© CvTE), Biologie voor Jou en Nectar. Stambomen en schema\'s zijn eigen tekeningen.<span data-licentie', s, flags=re.S)
    s = s.replace('· examenvragen © CvTE</span>', '</span>')
    s = rep(s, 'Kijk jezelf na met het correctievoorschrift.', 'Kijk jezelf na met het antwoordmodel.')
    s = rep(s, '/*@@OPGAVEN@@*/', frag.replace('/*@@VWO@@*/false', 'true' if niv == 'vwo' else 'false'))
    left = [w for w in ('examen-img/', 'havo26', 'havo 2026', 'Examen havo') if w in s]
    p = f'{uit}/toets-erfelijkheid-{niv}.html'
    open(p, 'w').write(s)
    print(p, len(s), 'rest:', left)

#!/usr/bin/env python3
"""Bouwt tools/toets-voortplanting-havo.html en -vwo.html uit het nieuwste oefenexamen (geraamte) + frag/*.js.
Zelfde opzet als tools/toets-bron/erfelijkheid/bouw.py, maar voor het geraamte met de vier hulpstanden
(tools/examen-standen.js, sinds 1 nov 2026); de standen krijgen toetsteksten en de examenklok staat uit.
Gebruik: python3 tools/toets-bron/voortplanting/bouw.py [uitmap]   (standaard tools/)"""
import sys, os, re, glob
D = os.path.dirname(os.path.abspath(__file__))
R = os.path.abspath(os.path.join(D, '..', '..', '..'))
uit = sys.argv[1] if len(sys.argv) > 1 else f'{R}/tools'
src = open(f'{R}/tools/examen-havo-2026-2.html').read()
a = src.index('/* ===== opg1.js ===== */'); b = src.index('/* ================= opgaven en navigatie')
geraamte = src[:a] + '/*@@OPGAVEN@@*/\n\n' + src[b:]
frag = '\n'.join(open(p).read() for p in sorted(glob.glob(f'{D}/frag/*.js')))
THEMA, ANKER = 'Voortplanting', 'voortplanting'

def rep(s, old, new, n=None):
    if old not in s: raise SystemExit(f'niet gevonden: {old[:70]}')
    return s.replace(old, new) if n is None else s.replace(old, new, n)

def sub(pat, new, s, flags=0):
    s2, n = re.subn(pat, new, s, flags=flags)
    if not n: raise SystemExit(f'patroon niet gevonden: {pat[:70]}')
    return s2

# de vier standen met toetsteksten; geen examenklok van 3 uur bij een toets
STANDEN_TOETS = ('EXSTAND.STANDEN.forEach(s=>{s.uitleg=s.uitleg.replace(/examenvraag/g,"toetsvraag")'
                 '.replace("het echte examen","een echte toets").replace(" Zet de klok aan voor 3 uur examentijd.","");'
                 'if(s.k==="echt")s.naam="Echte toets";});\nEXSTAND.init({store,save,setVrij});')

for niv in ('havo', 'vwo'):
    s = geraamte
    key = f'vp-{niv}'
    s = sub(r'const TOOL="[^"]+";', f'const TOOL="{key}";', s)
    s = sub(r'"examen-havo26-2"', f'"toets-{ANKER}-{niv}"', s)
    s = sub(r'<title>.*?</title>', f'<title>Oefentoets {THEMA} {niv} · doorklikken · Biologie bij Kamiel</title>', s)
    s = sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="Oefentoets {THEMA} voor {niv}: per vraag eerst hulpvragen, dan de toetsvraag, nakijken met het antwoordmodel en uitleg waarom.">', s)
    s = sub(r'/\* Examen havo 2026-II[^*]*\*/', f'/* Oefentoets {THEMA} {niv} · zelfde bouwstenen als de oefenexamens (tools/OEFENEXAMEN_PROMPT.md). */\nbody.echt .klok{{display:none!important}}\n@media (max-width:600px){{.vpfig{{overflow-x:auto;-webkit-overflow-scrolling:touch}}.vpfig>svg{{min-width:var(--min)}}}}', s)
    s = rep(s, '<a class="terug" href="../index.html#examens">← Terug naar Examen</a>', f'<a class="terug" href="../index.html#{ANKER}">← Terug naar {THEMA}</a>')
    s = sub(r'<div class="eyebrow" id="eb">[^<]*</div>', f'<div class="eyebrow" id="eb">Oefentoets {THEMA} · {niv}</div>', s)
    s = sub(r'<h1 id="h1">[^<]*</h1>', f'<h1 id="h1">Oefentoets {THEMA}</h1>', s)
    s = rep(s, 'Wit vak = de echte examenvraag', 'Wit vak = de toetsvraag')
    s = rep(s, 'Donker vak = hulpvragen en uitleg van deze tool', 'Donker vak = hulpvragen en uitleg (niet uit de toets)')
    s = sub(r'<p>Maak het examen stap voor stap\.[^<]*</p>', '<p>Maak de toets stap voor stap. Bij elke vraag denk je eerst na met de hulpvragen, dan beantwoord je de toetsvraag, en daarna zie je waarom het antwoord klopt. Kies zelf hoeveel hulp je wilt; met ‘Echte toets’ oefen je zonder hulp.</p>', s)
    s = rep(s, 'niet uit het examen', 'niet uit de toets')
    s = rep(s, 'Jouw antwoord op de examenvraag', 'Jouw antwoord op de toetsvraag')
    s = rep(s, '"Officiële examenvraag "', '"Toetsvraag "')
    s = rep(s, '<span class="mono">Examenvraag</span>', '<span class="mono">Toetsvraag</span>')
    s = rep(s, '`Examenvraag ${id}`', '`Toetsvraag ${id}`')
    s = rep(s, '"Officiële examentekst · © CvTE"', f'"Oefentoets {THEMA} · {niv}"')
    s = rep(s, '/* examenvraag nog eens boven', '/* toetsvraag nog eens boven')
    s = sub(r'\$\("#eb"\)\.textContent=`[^`]*`', f'$("#eb").textContent=`Oefentoets {THEMA} · {niv} · opgave ${{o.nr}}`', s)
    s = rep(s, '`Hele examen: <b>', '`Hele toets: <b>')
    s = sub(r'`Cijfer volgens de officiële omzettingstabel van dit examen \(\$\{NORM\}, examenblad\.nl\)\.`', '`Cijfer = 9 × score / maximum + 1. Open vragen kijk je zelf na met het antwoordmodel.`', s)
    s = sub(r'/\* omzettingstabel normering [^*]*\*/\nconst NORM="[^"]*";\nconst CIJFER=\[[^\]]*\];',
        '/* cijfer als bij een schooltoets: 9 × score / maximum + 1 */\nconst NORM="";\nconst CIJFER=(()=>{const L=Q.reduce((s,q)=>s+q.pts,0);return Array.from({length:L+1},(_,S)=>Math.round((9*S/L+1)*10)/10);})();', s)
    s = sub(r'<footer>.*?<span data-licentie', '<footer>Eigen vragen, met inspiratie uit de centrale examens (© CvTE), Biologie voor Jou en Nectar. Grafieken en schema\'s zijn eigen tekeningen; bronnen van de gegevens staan bij de opgaven.<span data-licentie', s, flags=re.S)
    s = rep(s, '· examenvragen © CvTE</span>', '</span>')
    s = rep(s, 'Kijk jezelf na met het correctievoorschrift.', 'Kijk jezelf na met het antwoordmodel.')
    s = sub(r'const FOTO=\(n,alt\)=>`<img class="exfoto" src="examen-img/[^`]*`;\n', '', s)
    s = rep(s, 'EXSTAND.init({store,save,setVrij});', STANDEN_TOETS)
    s = rep(s, '/*@@OPGAVEN@@*/', frag.replace('/*@@VWO@@*/false', 'true' if niv == 'vwo' else 'false'))
    left = [w for w in ('examen-img/', 'havo26', 'havo 2026', 'Examen havo', 'CvTE"') if w in s]
    p = f'{uit}/toets-{ANKER}-{niv}.html'
    open(p, 'w').write(s)
    print(p, len(s), 'rest:', left)

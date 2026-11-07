"""Zet een gebouwde Ecologie-v2-film uit /root/hwe/e<N> in de repo: films/ecologie/<slug>.html + <slug>/audio + <slug>/bron/.
Gebruik: python3 eco_pak.py <N> ['aandachtspunt | aandachtspunt …']   (REPO via omgevingsvariabele REPO, standaard /root/biologie-)
Pas draaien als audio, woordtijden en de geanimeerde scenes_e<N>.js klaar zijn en Kamiel/de coördinator het zegt. Aangepast van evo_pak.py."""
import json, os, re, shutil, sys, glob
n = int(sys.argv[1]); extra = sys.argv[2] if len(sys.argv) > 2 else ''
HW = '/root/hwe'; W = f'{HW}/e{n}'; E = f'{HW}/engine'; REPO = os.environ.get('REPO', '/root/biologie-'); ECO = '/root/eco2'
TEKEN = {1: ['teken_eco1'], 2: ['teken_eco1', 'teken_eco2'], 3: ['teken_eco3'], 4: ['teken_eco4'], 5: ['teken_eco5'],
         6: ['e11_aarde', 'teken_eco6'], 7: ['teken_eco7'], 8: ['teken_eco8']}
F = json.load(open(f'{W}/film.json', encoding='utf-8')); slug = F['slug']
segs = json.load(open(f'{W}/segments.json', encoding='utf-8')); mp = json.load(open(f'{W}/map.json'))
gen = json.load(open(f'{W}/stem/gen.json')); ses = json.load(open(f'{W}/stem/sessions.json'))
fj = json.load(open(f'{ECO}/films/f{n}.json', encoding='utf-8'))
dst = f'{REPO}/films/ecologie'; fb = f'{dst}/{slug}'; bron = f'{fb}/bron'
for d in [f'{fb}/audio', bron]: os.makedirs(d, exist_ok=True)
THEMA = "<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
h = open(f'{W}/film/{slug}.html', encoding='utf-8').read()
if "getItem('thema')" not in h: h = h.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + THEMA, 1)
open(f'{dst}/{slug}.html', 'w', encoding='utf-8').write(h)
for f in glob.glob(f'{W}/audio/s*.mp3'): shutil.copy(f, f'{fb}/audio/')
inv = {v: k for k, v in mp.items()}
# script.md
L = [f"# {F['title']} — gesproken tekst (v{F['version']})", '',
     f"Stem Roos (7qdUFMklKPaaAVMsBTBt), ElevenLabs eleven_v4, één take per alinea, flow {ses.get('flow')}. Audio: `../audio/<id>.mp3`; woordtijden: `stem/woordtijden/<id>.json` (silalign). Scène-id uit het storyboard tussen haakjes. Stem-invoer staat erbij waar die afwijkt van de ondertitel.", '']
hfd = None
for s in segs:
    if s['chapter'] != hfd: hfd = s['chapter']; L += [f'## {hfd}', '']
    if s['kind'] == 'speech':
        g = gen.get(s['id'], {}); L += [f"**{s['id']}** ({inv.get(s['id'], '?')}){' · vwo' if s['level'] == 'vwo' else ''} · audio `{s['id']}.mp3` · {g.get('dur', 0):.1f} s · generation `{g.get('generation_id', '?')}`", '', s['display'], '']
        if s['voice'] != s['display']: L += [f"_Stem-invoer:_ {s['voice']}", '']
    elif s['kind'] == 'question':
        q = F['questions'][s['id']]; L += [f"**{s['id']}** · vraag: {q['q']}"] + [f"- {'abcd'[i]}) {o}" + ('  ✓' if i == q['correct'] else '') for i, o in enumerate(s['options'])] + ['']
    elif s['kind'] == 'title': L += [f"**{s['id']}** · titelkaart: {s['text']}", '']
    else: L += [f"**{s['id']}** · eindkaart:"] + [f'- {x}' for x in s['lines']] + ['']
open(f'{bron}/script.md', 'w', encoding='utf-8').write('\n'.join(L))
# uitspraak.md (wachtlijst)
U = [f"# Uitspraak · {F['title']}", '', 'Wachtlijst (nog niet getest; batchtest later met de luisterpagina Uitspraaktest). Stem-invoer = wat in `segments.json` staat.', '', '| Woord | Stem-invoer | IPA | Bron |', '|---|---|---|---|']
for u in fj['uitspraak']: U.append(f"| {u['woord']} | {u['invoer']} | {u.get('ipa', '')} | {u.get('bron', '')} |")
open(f'{bron}/uitspraak.md', 'w', encoding='utf-8').write('\n'.join(U) + '\n')
# bronbestanden
for f in ['film.json', 'film.py', 'sections.html', 'segments.json', 'map.json', 'uitspraak_film.json', 'script_v2.md']:
    if os.path.exists(f'{W}/{f}'): shutil.copy(f'{W}/{f}', f'{bron}/{f}')
shutil.copy(f'{ECO}/films/f{n}.json', f'{bron}/storyboard_f{n}.json')
os.makedirs(f'{bron}/src', exist_ok=True); os.makedirs(f'{bron}/bouw', exist_ok=True)
for f in [f'{E}/{x}' for x in ['lib.js', 'lib_cast.js', 'lib_hormonen.js', 'lib_voeding.js', 'player.js', 'page.html', 'fonts.css']] + glob.glob(f'{HW}/ecolib/*.js') + [f'{W}/scenes_e{n}.js', f'{W}/teken_e{n}.js', f'{W}/scenes.js', f'{ECO}/src/sb{n}.js'] + [f'{ECO}/src/{t}.js' for t in TEKEN[n]]:
    if os.path.exists(f): shutil.copy(f, f'{bron}/src/')
for f in [f'{E}/{x}' for x in ['make_segments.py', 'build_data.py', 'build.py', 'silalign.py', 'stills.py', 'fakewords.py', 'cuecheck.py', 'sheet.py', 'uitspraak_subs.json']] + [f'{HW}/{x}' for x in ['eco_script.py', 'eco_film.py', 'eco_bouw.py', 'eco_pak.py', 'BOUWEN_ECO.md', 'INSPREKEN_ECO.md']]:
    shutil.copy(f, f'{bron}/bouw/')
os.makedirs(f'{bron}/stem/woordtijden', exist_ok=True)
for f in ['gen.json', 'sessions.json']: shutil.copy(f'{W}/stem/{f}', f'{bron}/stem/{f}')
for f in glob.glob(f'{W}/words/s*.json'): shutil.copy(f, f'{bron}/stem/woordtijden/')
# info.md
cred = sum(v[2] for k, v in ses.items() if k != 'flow' and isinstance(v, list) and len(v) > 2 and isinstance(v[2], (int, float)))
spraak = sum(g.get('dur', 0) for g in gen.values()); basis = sum(gen.get(s['id'], {}).get('dur', 0) for s in segs if s['kind'] == 'speech' and s['level'] == 'basis')
H = h.split('\n')
def regel(pat):
    for i, l in enumerate(H, 1):
        if re.search(pat, l): return i
    return '?'
mm, ss = divmod(round(spraak), 60)
hst = {}
for s in segs:
    if s['kind'] in ('speech', 'question'): hst.setdefault(s['chapter'], []).append(s['id'])
I = [f"# {F['title']} — bronmap", '', '| Kenmerk | |', '|---|---|',
     f"| Bestand | `films/ecologie/{slug}.html` (audio in `{slug}/audio/`) |", f"| Reeks | Ecologie (v2), film {n} van 8 |",
     f"| Niveau | havo + vwo{' (vwo-blokken gemarkeerd)' if any(s['level'] == 'vwo' for s in segs) else ' (geen vwo-blokken)'} |",
     f"| Versie | {F['version']} (script v2 = storyboard f{n}.json, goedgekeurd 29 okt 2026) |",
     '| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |',
     f"| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, {cred:,.0f} credits (flow {ses.get('flow')})".replace(',', '.') + ' |',
     f"| Duur | spraak {mm}:{ss:02d} ({spraak:.0f} s, basis {basis:.0f} s); met vragen en kaarten ± {round(spraak / 60 + 1.5)} min |",
     '| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |',
     '| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |',
     '| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |', '',
     '## Opbouw', '', '| Hoofdstuk | Segmenten |', '|---|---|']
for c, ids in hst.items(): I.append(f"| {c} | {', '.join(ids)} |")
I += ['', '## Vragen', '', '; '.join(f"{k} → {'abc'[v['correct']]}" for k, v in F['questions'].items()) + '.', '',
      '## Begrippen', '', ', '.join(g['t'] + (' (vwo)' if g.get('vwo') else '') for g in F['glossary']) + '.', '',
      '## Waar wat in de HTML zit', '', '| Regel | Inhoud |', '|---|---|',
      f"| {regel('id=\"glossary\"')} | Begrippen |", f"| {regel('<h2>Checkvragen')} | Checkvragen |", f"| {regel('<h2>Voor de docent')} | Voor de docent |",
      f"| {regel('window.FILMDATA')} | `window.FILMDATA` (segmenten, woordtijden, vragen) |", f"| {regel('const SCENES = ')} | `const SCENES = {{}}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb{n}.js (keyframes) |",
      f"| {regel('Object.assign\\(SCENES')} | `Object.assign(SCENES, {{ title, s01 … }})` (de animatie per alinea, bron: `src/scenes_e{n}.js`) |", '',
      '## Hoe je de film aanpast', '',
      'Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e' + str(n) + '/` (segments.json, map.json, film.py, sections.html, src/scenes_e' + str(n) + '.js, src/teken_e' + str(n) + '.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py ' + str(n) + '` en `python3 eco_pak.py ' + str(n) + '`.',
      '- Een tekstfout in beeld of een beweging: `scenes_e' + str(n) + '.js` / `teken_e' + str(n) + '.js` aanpassen, opnieuw bouwen.',
      '- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.',
      '- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.', '',
      '## Aandachtspunten', '', '- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).', '- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f' + str(n) + '.json`.']
I += [f'- {x.strip()}' for x in extra.split('|') if x.strip()]
open(f'{bron}/info.md', 'w', encoding='utf-8').write('\n'.join(I) + '\n')
print(slug, 'in de repo; spraak %.0f s, basis %.0f s, %d credits' % (spraak, basis, cred))

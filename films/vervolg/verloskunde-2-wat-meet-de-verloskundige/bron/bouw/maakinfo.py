"""Eerste versie van info.md, uitspraak.md en brief.md voor een film uit de werkmap (daarna nakijken).
Gebruik: python3 maakinfo.py <werkmap> <script> <gebied-anker> '<reeks>' '<beeldstijl>' '<wachtlijst, komma's>' '<aandachtspunten met |>' '<notes>'"""
import json, os, re, sys, glob
W, scr, anker, reeks, stijl, wacht, aand, notes = sys.argv[1:9]
F = json.load(open(os.path.join(W, 'film.json'), encoding='utf-8')); slug = F['slug']
segs = json.load(open(os.path.join(W, 'segments.json'), encoding='utf-8'))
ses = json.load(open(os.path.join(W, 'stem', 'sessions.json')))
cred = sum(v[2] for k, v in ses.items() if k != 'flow' and isinstance(v, list) and len(v) > 2 and isinstance(v[2], (int, float)))
spraak = sum(json.load(open(f)).get('words', [{}])[-1].get('end', 0) for f in glob.glob(os.path.join(W, 'words', 's*.json')))
src = open(os.path.join(W, scr), encoding='utf-8').read()
kop = {m.group(1).strip(): m.group(2) for m in re.finditer(r'^## (.+?)\s*\[(?:Schema: )?(.*?)\]\s*$', src, re.M)}
H = open(os.path.join(W, 'film', slug + '.html'), encoding='utf-8').read().split('\n')
def regel(pat):
    for i, l in enumerate(H, 1):
        if re.search(pat, l): return i
    return '?'
hfd = []
for s in segs:
    c = s['chapter']
    if c in ('Titel', 'Eindkaart'): continue
    if not hfd or hfd[-1][0] != c: hfd.append([c, []])
    hfd[-1][1].append(s['id'])
mm, ss = divmod(round(spraak), 60)
L = [f"# {F['title']} — bronmap", '', '| Kenmerk | |', '|---|---|',
     f"| Bestand | `films/vervolg/{slug}.html` (audio in `{slug}/audio/`) |", f'| Reeks | {reeks} |', '| Niveau | vwo (één niveau) |',
     f"| Versie | {F.get('version', '1.0')} · 20 oktober 2026 ({scr.replace('.md', '').replace('_', ' ')}) |",
     f"| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, {cred:,.0f} credits (flow in `stem/sessions.json`) |".replace(',', '.'),
     f'| Duur | spraak {mm}:{ss:02d} ({spraak:.0f} s); met vragen en kaarten ± {round(spraak / 60 + 1.5)} min |', f'| Beeldstijl | {stijl} |',
     '| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |',
     '| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |', '',
     '## Opbouw', '| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |', '|---|---|---|']
L += [f"| {c} | {', '.join(ids)} | {kop.get(c, '')} |" for c, ids in hfd]
L += ['', '## Vragen', '; '.join(f"{k} → {'abc'[v['correct']]}" for k, v in F['questions'].items()) + ' (zie film.py).', '',
      '## Begrippen', ', '.join(g['t'] for g in F['glossary']) + '.', '', '## Waar wat in de HTML zit', '| Regel | Inhoud |', '|---|---|',
      f"| {regel(r'id=\"glossary\"')} | Begrippen |", f"| {regel(r'Checkvragen')} | Checkvragen |", f"| {regel(r'Voor de docent')} | Voor de docent |",
      f"| {regel(r'window.FILMDATA')} | `window.FILMDATA` |", f"| {regel(r'const SCENES = \{\}')} | `const SCENES = {{}}` |", f"| {regel(r'Object.assign\(SCENES')} | scènes per alinea |", '',
      '## Hoe je de film aanpast', f'Werkmap `hw/{os.path.basename(W)}` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).',
      f"- Tekst: pas `{scr}` aan, `python3 engine/make_segments.py <d> {scr}`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.",
      '- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on(\'woord\', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.',
      '- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.',
      f'- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> {anker}`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.', '',
      '## Aandachtspunten'] + [f'- {a.strip()}' for a in aand.split('|') if a.strip()]
open(os.path.join(W, 'info.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
open(os.path.join(W, 'uitspraak.md'), 'w', encoding='utf-8').write(f"# Uitspraak — {F['title']}\nModel eleven_v4, stem Roos, één take per alinea. Film-eigen regels in `uitspraak_film.json` ('Dr.' → 'dokter', 'ACE-remmer' → 'A-C-E-remmer'). Nog niet beluisterd; alles op de wachtlijst.\n\n| Woord | Stem-invoer | Status |\n|---|---|---|\n| {wacht} | zoals geschreven | wachtlijst |\n")
open(os.path.join(W, 'brief.md'), 'w', encoding='utf-8').write(f"# Filmbrief — {F['title']}\n| Veld | |\n|---|---|\n| TOPIC | {F.get('sub', '')} |\n| AUDIENCE | vwo bovenbouw, oriëntatie op studie ({reeks}) |\n| NIVEAU | vwo, één niveau |\n| LENGTH | content decides |\n| USE | beide |\n| CENTRAL PUZZLE | {F.get('puzzle', '')} |\n| NOTES | {notes} |\n")
print(W, 'info', round(cred), round(spraak))

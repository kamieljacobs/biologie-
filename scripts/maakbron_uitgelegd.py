#!/usr/bin/env python3
# Gebruik: python3 scripts/filmbron.py uitpakken <film.html> <werkmap> && python3 scripts/maakbron_uitgelegd.py <film.html> <werkmap>
# Maakt een eerste bron/info.md en bron/script.md voor films in de "Uitgelegd"-engine (window.TIMELINE met chapters + cues).
# Controleer en vul daarna met de hand aan (reeks, niveau, herkomst en aandachtspunten zijn deels voor Plek genoeg ingevuld).
# Bouwt bron/info.md en bron/script.md voor een film in de "Uitgelegd"-engine (window.TIMELINE met chapters + cues).
import json, re, sys, html as H, os, subprocess
film, W = sys.argv[1], sys.argv[2]
s = open(W + '/film.src.html', encoding='utf-8').read()
L = s.split('\n')
def line(pat):
    for i, l in enumerate(L, 1):
        if re.search(pat, l): return i
i = s.index('window.TIMELINE =') + 17
T, _ = json.JSONDecoder().raw_decode(s[i:].lstrip())
ch, cues = T['chapters'], T['cues']
def mmss(t): t=float(t); return f"{int(t//60)}:{t%60:04.1f}" if t%1 else f"{int(t//60)}:{int(t%60):02d}"
def mm(t): t=float(t); return f"{int(t//60)}:{int(round(t%60)) if round(t%60)<60 else 59:02d}"
def text(x): return re.sub(r'\s+',' ',H.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()
def section(h3):
    a = s.find('<h3>' + h3 + '</h3>')
    if a < 0: return ''
    b = s.find('<h3>', a + 5); c = s.find('</section>', a)
    b = min(x for x in (b, c, len(s)) if x > 0)
    return s[a:b]
meta = {}
for k in ('eyebrow', 'title', 'tagline'):
    m = re.search(k + r":\s*'([^']*)'", s[s.index('window.FILMMETA'):]); meta[k] = m.group(1) if m else ''
dur = T.get('duration') or ch[-1]['end']
mp3 = os.path.join(os.path.dirname(film), 'narration.mp3')
mp3dur = subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout.strip() if os.path.exists(mp3) else ''
blobs = json.load(open(W + '/manifest.json'))
nb = len(blobs.get('blobs', blobs) if isinstance(blobs, dict) else blobs)
pauses = [c for c in ch if c.get('pause')]
title = meta['title'] or text(re.search(r'<title>([^<]*)', s).group(1))
rel = film

info = []
A = info.append
A(f"# {title} — bronmap\n")
A("| Veld | Waarde |\n|---|---|")
A(f"| Bestand | {rel} (audio: {os.path.dirname(rel)}/narration.mp3) |")
A(f"| Reeks / nummer | Ecologie deel 1 (soorten en populaties) — tweeluik met *Alles gaat rond* (deel 2) |")
A(f"| Tagline | {meta['tagline']} |")
A("| Doelgroep / niveau | 4 vwo, Nectar 4 vwo H6 *Soorten en populaties*; op de site ook bij havo thema 7 Ecologie; geen havo/vwo-splitsing in de film |")
A("| Versie / datum | onbekend (niet in de HTML); op de site gezet 2026-10-12 |")
A("| Stem / model | Roos (ElevenLabs) volgens de reeks; model onbekend (niet in de HTML) |")
A(f"| Duur | {mm(dur)} (`TIMELINE.duration` {dur:.3f} s" + (f"; narration.mp3 {float(mp3dur):.1f} s" if mp3dur else '') + ") |")
A("| Beeldstijl | Ouder eigen ontwerp (\"Uitgelegd\"-engine, zelfde als *Alles gaat rond*): canvas 1600×900, platte geometrische natuurtekeningen en kaarten (Natural Earth). Niet volgens de stijlkaart (Part C) |")
A(f"| Audio-opslag | Eén doorlopende take, `narration.mp3` naast de HTML (`<audio id=\"narration\" src=\"narration.mp3\">`); niet ingebed. In de HTML zitten {nb} blobs (lettertypen) als base64 |")
A("| Herkomst | Overgenomen van het Claude-artifact *Plek genoeg?* (2026-10-12); bronmap gereconstrueerd uit de gepubliceerde HTML |\n")

A("## Opbouw\nBegintijd = begin hoofdstukkaart; `narrStart` = stem begint. Type-letters uit de prompt staan niet in de HTML.\n")
A("| Begin | Stem | Hoofdstuk | Beats | Pauze |\n|---|---|---|---|---|")
for c in ch:
    A(f"| {mm(c['start'])} | {mm(c.get('narrStart', c['start']))} | {c['num']} {c['title']} | {len(c.get('beats') or [])} | {'ja, ' + mm(c['pause']['s']) if c.get('pause') else '—'} |")
A("")

A("## Vragen")
A(f"Geen meerkeuze-voorspelvragen. {len(pauses)} open pauzevragen: kaart \"Pauzemoment\" met aftelring en knop \"Pauzeer hier\"; de film pauzeert niet vanzelf, de audio heeft op die plek stilte. Antwoorden in de docentenhandleiding.\n")
det = re.findall(r'<details><summary><span class="ch">(H\d+)</span>(.*?)</summary>(.*?)</details>', section('Pauzevragen met antwoord'), re.S)
A("| Plek | Vraag op de kaart (`pause.q`) | Antwoord (handleiding) |\n|---|---|---|")
for c in pauses:
    q = text(c['pause'].get('q', ''))
    ans = next((text(d[2]) for d in det if d[0] == f"H{c['num']}"), '')
    A(f"| H{c['num']}, {mm(c['pause']['s'])} | {q} | {ans.replace(chr(10),' ')} |")
A("")

beg = re.findall(r'<dt>(.*?)</dt>\s*<dd>(.*?)</dd>', section('Begrippen'), re.S)
if not beg:
    beg = [(text(a), text(b)) for a, b in re.findall(r'<b>(.*?)</b>\s*[—–-]\s*(.*?)</li>', section('Begrippen'), re.S)]
A("## Begrippen\nStatische lijst in de docentenhandleiding.\n")
if beg:
    for a, b in beg: A(f"- {text(a)} — {text(b)}")
else:
    A(text(section('Begrippen'))[:3000])
A("")

A("## Docentdeel")
A("\"Docentenhandleiding\" onder de speler met de onderdelen: " + ", ".join(text(h) for h in re.findall(r'<h3>(.*?)</h3>', s)) + ".\n")
lo = [text(x) for x in re.findall(r'<li>(.*?)</li>', section('Leerdoelen'), re.S)]
if lo:
    A("Leerdoelen:\n"); [A(f"- {x}") for x in lo]; A("")

A("## Techniek: waar zit wat in de HTML")
A("Regelnummers verwijzen naar film.src.html (uitpakken met `scripts/filmbron.py`; in index.html staan op de `@@BLOB@@`-plekken de base64-lettertypen, de regelnummers zijn gelijk).\n")
A(f"- **Tijdlijn**: regel {line(r'window\.TIMELINE =')}, `window.TIMELINE = {{chapters, cues, duration}}` — {len(ch)} hoofdstukken, {len(cues)} ondertitels `{{s, e, text}}` in globale tijd. `chapters[]`: `num`, `title`, `start`, `narrStart`, `end`, `hasAudio`, `beats[]` (`{{s, e}}`), `pause` (`{{s, qe, e, wait, q}}`) of `null`.")
A(f"- **Titelkaart/meta**: regel {line(r'window\.FILMMETA =')}, `window.FILMMETA` (eyebrow, titel, tagline, motief).")
A(f"- **Engine/tekenhulp**: `window.FILM` regel {line(r'window\.FILM =')}; kaartdata `window.GEO` regel {line(r'window\.GEO =')}.")
sc = [(int(m.group(1)), i) for i, l in enumerate(L, 1) for m in [re.match(r'F\.scenes\[(\d+)\] *=', l)] if m]
A("- **Scènes**: `F.scenes[n] = S => {...}` per hoofdstuk: " + ", ".join(f"{n} regel {i}" for n, i in sc) + f". Hulpfuncties uit `makeS()` (regel {line(r'function makeS')}): `S.t`, `S.p(i)` / `S.win(i, j)` (voortgang op beat i), `S.q(k)` (voortgang op de k-de ondertitel van het hoofdstuk), `S.pause`.")
A(f"- **Speler**: vanaf regel {line(r'const TL = window\.TIMELINE')}. Klok = `audio.currentTime` van `narration.mp3`.")
A(f"- **Pagina-tekst** (kop, hoofdstukken, gebruik, docentenhandleiding): statische HTML tot regel {line(r'<audio id=\"narration\"')}.")
A(f"- **Sitebalk** \"← Terug naar Ecologie\": `<nav class=\"sitenav\">` direct na `<body>` (toegevoegd voor de site).\n")

A("## Zo pas je deze film aan")
A("1. **Alles hangt aan één take**: tekst wijzigen = nieuwe `narration.mp3` en dan `chapters[].start/narrStart/end/beats/pause` én alle `cues` vanaf dat punt opnieuw zetten. Praktisch: knip de take per hoofdstuk, vervang één stuk en schuif alle latere tijden op met het verschil.")
A("2. **Typfout in een ondertitel**: alleen `cues[].text` aanpassen; tijden laten staan.")
A("3. **Scène aanpassen**: werk in `F.scenes[n]`; bepaal welke beat (`S.p(i)`) of welke cue (`S.q(k)`) het moment stuurt. Cue-indexen schuiven als je ondertitels splitst of samenvoegt.")
A("4. **Pauzevraag wijzigen**: `chapters[].pause.q` en de bijbehorende `<details>` onder \"Pauzevragen met antwoord\". Duur van de kaart = de stilte in de audio.")
A("5. **Titelkaart**: `window.FILMMETA`; hoofdstuktitels in `chapters[].title` én in de statische lijst \"Hoofdstukken\".\n")
A("## Aandachtspunten")
A("- Ouder ontwerp, wijkt af van de huidige prompt (stijlkaart/Part C): geen voorspelvragen met opties, geen Leerling/Klas, geen Havo/Vwo, geen versie/datum en geen ElevenLabs-model vermeld.")
A("- De pauzemomenten stoppen de film niet vanzelf.")
open(os.path.dirname(film) + '/bron/info.md', 'w').write('\n'.join(info) + '\n')

sc_ = [f"# {title} — script\n", "Bron: gereconstrueerd uit de ondertitelcues (`window.TIMELINE.cues`) in de gepubliceerde HTML (2026-10-12). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst.\n", "Alle tijden zijn globaal: seconden in de ene take `narration.mp3`. Per hoofdstuk de beats en daaronder de ondertitels; de pauzevraag staat aan het eind.\n"]
for c in ch:
    sc_.append(f"## {c['num']}. {c['title']}")
    sc_.append(f"Audio: narration.mp3 · {mm(c['start'])}–{mm(c['end'])} (kaart vanaf {c['start']:.1f}, stem vanaf {c.get('narrStart', c['start']):.1f}; {c['end'] - c['start']:.1f} s)\n")
    if c.get('beats'): sc_.append("Beats: " + " · ".join(f"b{k} {mmss(b['s'])}" for k, b in enumerate(c['beats'])) + "\n")
    for q in cues:
        if c['start'] <= q['s'] < c['end']: sc_.append(f"[{mmss(q['s'])}] {q['text']}")
    if c.get('pause'): sc_.append(f"\n**Pauzevraag** ({mmss(c['pause']['s'])}–{mmss(c['pause']['e'])}): {text(c['pause'].get('q', ''))}")
    sc_.append("")
open(os.path.dirname(film) + '/bron/script.md', 'w').write('\n'.join(sc_) + '\n')
print(len(ch), 'hoofdstukken,', len(cues), 'cues,', len(pauses), 'pauzes,', len(beg), 'begrippen,', len(lo), 'leerdoelen')

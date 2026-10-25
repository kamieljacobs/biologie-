# Signalen in de cel — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biomedisch-1-signalen-in-de-cel.html` (audio in `biomedisch-1-signalen-in-de-cel/audio/`) |
| Reeks | Wat word jij? · Biomedische wetenschappen |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · 25 oktober 2026 (verbeterronde: s04, s05, s12, s13 opnieuw ingesproken, s01/s05/s09/s12/s13 beeld) · 1.0 · 24 oktober 2026 (script v2) |
| Prompt | v10 |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea; ± 5.570 credits bij de bouw, 25 okt nog 2.448 (vier alinea's) + 874 (blinde transcriptie). Flow g38hWXu7Gay69Oaxu7j3 (`stem/sessions.json`) |
| Duur | spraak 5:09 (309 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema en Micro, met cast (Opa Henk, Noor, Dr. Kim); eiwitten als kralenketting, ATP met drie fosfaatgroepen, gebogen membraan |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld. 25 okt 2026: verbeterronde na Kamiels review (verbeterblad `verbeterblad-2026-10-24/`, voorstellen sig-1 t/m sig-9 alle goedgekeurd), opgewaardeerd naar prompt v10, bronnenlogboek `bronnen.md` |

Voldoet aan: prompt v10 (25 okt 2026). Bewust niet: geen ElevenLabs-referentieplaten of testvel voor de moleculen (C10.3–C10.4); de eiwitten, ATP en cel zijn eigen schema-tekeningen in `teken_b1.js`, niet uit `bibliotheek/lib_bio.js` (de film laadt die bibliotheek niet; `celHeel` en `ringMembraan` volgen het recept van `membraanBoog`/`celRond`).

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | ontbijttafel; Opa Henk met koffie en een tabletje, Noor ernaast; dan een levercel met adrenaline buiten het membraan en glycogeen binnen |
| Hoofdstuk 1 — Receptoren | s04 | membraan als boog; receptor als kralenketting die dwars door het membraan steekt; adrenaline bindt, de kluwen kantelt ook aan de binnenkant; daarnaast een steroïdhormoon dat door het membraan gaat, receptor in de cel, samen naar de kern; klokje seconden tegen uren; verwijzing naar Post voor iedereen |
| Hoofdstuk 2 — Het signaal versterken | s05, s06, q07, s08 | Micro: binnenkant van het membraan; enzym maakt van ATP veel kleine cAMP-moleculen; cAMP zet een kinase aan; ATP met drie fosfaatgroepen, de laatste springt op een eiwit (ATP wordt ADP); keten van kinasen die steeds meer moleculen aanzet; glycogeen valt uiteen in glucose; teller |
| Hoofdstuk 3 — Een signaal naar de kern | s09, s10, q11 | schaafwond met bloedplaatjes die groeifactor afgeven; cel met twee receptoren die tegen elkaar gaan liggen en fosfaatgroepen op elkaar zetten; Ras als schakelaar; rij van drie kinasen; laatste kinase de kern in; transcriptiefactor op het DNA; cel die deelt |
| Hoofdstuk 4 — Kanker en remmers | s12, s13 | route met Ras vast op 'aan'; blokkade aan het begin helpt niet; verwijzing naar Mutaties; chromosoom 9 en 22 die stukjes wisselen; fusie-eiwit als kinase dat nooit uitgaat; witte bloedcellen die blijven delen; tabletje als molecuul dat in de ATP-plek past; Dr. Kim in het lab; balk overleving |
| Recap | s14, s15 | terug aan de ontbijttafel; Noor en Opa Henk; route van receptor naar kern als kleine tekening; tabletje; opleiding |

## Vragen
q02 → b; q07 → c; q11 → a (zie film.py).

## Begrippen
receptor, signaaltransductie, tweede boodschapper, kinase, fosfaatgroep, cascade, groeifactor, Ras, kinaseremmer.

## Waar wat in de HTML zit
Regelnummers van de gebouwde film in de werkmap (`film/<slug>.html`); in de repo kunnen ze door spelerfix/teller een paar regels verschuiven.
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 136 | `window.FILMDATA` |
| 1821 | `const SCENES = {}` |
| 2027 | `rasSchakel` (Ras-schakelaar: stand, kleur en slotje; sinds 1.1 zonder het woordje aan/uit) |
| 2103 | `celHeel`, `ringMembraan`, `kernPorien` (hele ronde cel, sinds 1.1) |
| 2127 | scènes per alinea (s01); s09 op 2197, s12 op 2231 |

## Hoe je de film aanpast
Werkmap `hw/b1` opzetten volgens `films/vervolg/BOUWEN.md`, maar met een eigen engine-map (`hw/b1eng` uit `bron/src` + `bron/bouw`): `hw/engine` wordt door andere films gedeeld en tussendoor overschreven (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biomedisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Wijzigingen 1.1 (25 okt 2026)
- sig-1 · s09–s12: het woordje 'aan'/'uit' onder de Ras-schakelaar is weg (las na vraag q11 als 'antwoord a').
- sig-2 · s12: nieuwe beginzin 'Zit het defect in Ras, dan helpt een medicijn tegen de receptor niet: het signaal start ná de blokkade gewoon opnieuw.' (opnieuw ingesproken); in beeld 'defect in Ras', 'medicijn · blokkeert de receptor' en gouden pulsen van Ras naar de kern vanaf 'start'.
- sig-3 · s09: bij 'Het laatste kinase gaat de kern in' zoomt het beeld uit naar de hele ronde cel (receptoren op de rand, kern met kernporiën binnenin); het derde kinase gaat door een porie de kern in; bij 'de cel deelt' snoert dezelfde cel in tot twee cellen (geen los kader meer).
- sig-4 · s04 opnieuw ingesproken ('Post voor iedereen' in gewone spelling, uitspraaktest 24 okt).
- sig-5 · s05 en s13 opnieuw ingesproken met 'ATP' in gewone spelling.
- sig-6 · s05: ATP staat vlak naast de kinase, onder de cAMP-wolk; de laatste fosfaatgroep springt zichtbaar op het eiwit (labels ATP → ADP, eiwit → 'P op het eiwit: aan').
- sig-7 · s13: tabletje met label 160 px naar links, weg van de beeldrand.
- sig-8 · s01: de drie kaartjes staan één voor één boven Opa Henk, niet meer over de tafel; het tabletje gloeit bij 'tabletje'.
- Tegelijk nam de uitspraak-ronde van 25 okt (andere sessie, commit ff72410d) s05 en s13 ook opnieuw op (1.383 credits); die takes zijn bij het samenvoegen vervangen door de takes van deze ronde (blind gecontroleerd, beeld erop uitgelijnd). Ids staan onder 'vorige' in `stem/gen.json`.
- Woordtijden van s04, s05, s12, s13 uit de blinde Scribe-transcriptie (uitgelijnd op de ondertitel), niet uit silalign: silalign zette in s12 de eerste woorden ± 0,9 s te vroeg.

## Aandachtspunten
- G-eiwit en Raf/MEK/ERK bewust weggelaten (vereenvoudigingen in het docentdeel)
- s01 en s12 na de eindreview opnieuw ingesproken; s08 later apart ingesproken
- versterking 10^8 geldt voor de lever

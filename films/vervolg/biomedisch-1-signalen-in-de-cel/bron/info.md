# Signalen in de cel — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biomedisch-1-signalen-in-de-cel.html` (audio in `biomedisch-1-signalen-in-de-cel/audio/`) |
| Reeks | Wat word jij? · Biomedische wetenschappen |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. ± 5.570 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:03 (303 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema en Micro, met cast (Opa Henk, Noor, Dr. Kim); eiwitten als kralenketting, ATP met drie fosfaatgroepen, gebogen membraan |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

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
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 136 | `window.FILMDATA` |
| 1821 | `const SCENES = {}` |
| 2110 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/b1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biomedisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- G-eiwit en Raf/MEK/ERK bewust weggelaten (vereenvoudigingen in het docentdeel)
- s01 en s12 na de eindreview opnieuw ingesproken; s08 later apart ingesproken
- versterking 10^8 geldt voor de lever

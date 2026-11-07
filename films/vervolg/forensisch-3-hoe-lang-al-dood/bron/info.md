# Hoe lang al dood? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/forensisch-3-hoe-lang-al-dood.html` (audio in `forensisch-3-hoe-lang-al-dood/audio/`) |
| Reeks | Wat word jij? · Forensisch onderzoek (film 3 van 3) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) · docentdeel: bronnen bijgewerkt (25 okt 2026) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.671 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:15 (375 s); met vragen en kaarten ± 8 min |
| Prompt | v10 (met de aanvullingen van 25 okt 2026: twijfelscènes) |
| Beeldstijl | Schema met cast (Bilal stagiair forensisch onderzoek, Dr. Kim; plaatsdelict-outfit), Micro bij moleculen |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_beeld.md, frisse beeldreview na de bouw) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | voordeur en gang; de buurvrouw met een kopje in haar hand; woonkamer met lege leesstoel, verwarming uit, thermometer op 15 graden; Bilal wijst naar een vlieg op de vensterbank |
| Hoofdstuk 1 — De eerste uren | s04, s05, q06, s07, s08, s09, q10 | drie zandlopers met labels warmte, bloed, spieren; balkje met de bovengrens; afkoelcurve die zichzelf tekent; bloedvat met zakkende bloedcellen; spiervezel |
| Hoofdstuk 2 — Afbraak | s11, s12, q13, s14 | Micro: myosinekop aan actine, ATP dat de kop losmaakt; daarna geen ATP, koppen blijven vast; dan enzymen die de Z-schijven en de verbindende eiwitten tussen de sarcomeren knippen, actine en myosine blijven heel; Schema: cel die opzwelt; darm met bacteriën; enzymcurve uit Alles versneld |
| Hoofdstuk 3 — Insecten als klok | s15, s16, q17 | vierde zandloper met een vlieg erin; levenscyclus van een bromvlieg: eitjes, larve 1, 2 en 3, pop, vlieg, met liniaal; vensterbank met larven; Bilal in het lab naast een forensisch entomoloog |
| Hoofdstuk 4 — Groeien met de temperatuur | s18, s19, s20, q21 | thermometer naast een larve die sneller of trager groeit; staafjes per dag met een drempellijn bij 8 graden; som 15 − 8 = 7 en 80 : 7 ≈ 11 op het scherm; onderin het balkje vandaag | 14 dagen |
| Recap | s22, s23, s24 | vier zandlopers, drie leeg, de vlieg loopt door; balkje met het venster van ongeveer 11 tot 14 dagen, linkerrand vaag; Kim met het rapport; de buurvrouw met het kopje; opleidingskaartjes |

## Vragen
q02 → c; q06 → a; q10 → b; q13 → c; q17 → a; q21 → b (zie film.py).

## Begrippen
postmortaal interval (PMI), spoor, plateau (bij afkoeling), nomogram van Henssge, lijkvlekken, lijkstijfheid, autolyse en verrotting, larvestadium, graaddagen.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 153 | `window.FILMDATA` |
| 1920 | `const SCENES = {}` |
| 4704 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fo3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> forensisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Wachtlijstwoorden niet blind getranscribeerd (upload geblokkeerd); Kamiel luistert in de batch
- Bij Vragen uit haalt scripts/antwoordtekst.py de antwoordlabels weg

Voldoet aan: prompt v10 (25 okt 2026). Werkwijze: 3 scriptvarianten met blinde beoordelaar (`werk/`, winnaar en reden in `brief.md`), frisse feitenreview (`reviews/review_v1.md`), twijfelscènes gekeurd door Kamiel, frisse beeldreview na de bouw (`reviews/review_beeld.md`). Getallen met bronnen: `getallen.md`. Bouwen: `bouw/bouw.sh` in een werkmap volgens `films/vervolg/BOUWEN.md` (lib_bio.js zit in `src/`).

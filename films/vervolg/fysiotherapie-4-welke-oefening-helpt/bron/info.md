# Welke oefening helpt? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/fysiotherapie-4-welke-oefening-helpt.html` (audio in `fysiotherapie-4-welke-oefening-helpt/audio/`) |
| Reeks | Wat word jij? · Fysiotherapie en bewegingswetenschappen, film 4 |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · oktober 2026 · 20 oktober 2026 (script v2) · heropname 25 okt 2026 (uitspraaktest) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 0 credits + 559 credits heropname 25 okt (flow in `stem/sessions.json`) |
| Duur | spraak 4:19 (259 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (Part C), met cast (Femke, Noor, Bilal, Jesse, Yasmin) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | agenda van Femke met vier namen: Noor, Bilal, Jesse, Yasmin; vier icoontjes: enkel, knie, rug, schouder; alle vier gaan weg met een oefenkaart |
| Hoofdstuk 1 — De enkel | s04, q05, s06 | Noor stapt op een voet bij volleybal, enkel klapt naar buiten; buitenste enkelband; vier drukpunten op de botten voor de foto-regels; na vijf dagen opnieuw testen; Noor op één been op een kussen; balken: nieuwe verzwikking zonder en met balanstraining, ongeveer een derde minder |
| Hoofdstuk 2 — De pees | s07, q08, s09 | Bilal springt bij basketbal; pees onder de knieschijf; draadjes collageen die eerst netjes liggen en bij overbelasting rommelig worden; rust: pijn weg, pees zwakker; zware langzame kniebuiging, twaalf weken; pijnmeter tot 5 van 10, volgende ochtend weer gezakt; verwijzing naar Hoe weefsel herstelt |
| Hoofdstuk 3 — De rug | s10, q11, s12 | Jesse tilt een patiënt; rug met wervels en tussenwervelschijven; 8 van de 10 mensen ooit rugpijn; meestal geen aanwijsbare oorzaak; scans van mensen zonder pijn: bij twintigjarigen ruim een derde met slijtage, bij tachtigjarigen bijna iedereen; alarmsignalen: gevoelloos zitvlak, moeite met plassen, koorts; Jesse wandelt en oefent |
| Hoofdstuk 4 — De schouder, en wat niet werkt | s13, q14, s15 | schoudergewricht als golfbal op een tee; vier kleine spieren die de kop in de kom houden; Yasmin met elastiek; twee groepen bij een operatie: echte operatie en kijkoperatie zonder ingreep, even veel verbetering; ultrageluid en tape met een vraagteken |
| Recap | s16, s17 | Femke met de vier patiënten; vier kaartjes: enkel – spiergevoel, pees – zwaar en langzaam, rug – blijf bewegen, schouder – kop in de kom; tekst: bij twijfel laten onderzoeken; opleidingen |

## Vragen
q02 → c; q05 → a; q08 → c; q11 → b; q14 → b (zie film.py).

## Begrippen
enkelverzwikking, balanstraining, overbelaste pees, collageen, lage rugpijn, tussenwervelschijf, alarmsignalen, rotatorenmanchet, nepbehandeling.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 134 | `window.FILMDATA` |
| 1510 | `const SCENES = {}` |
| 1725 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fy4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> fysiotherapie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Geen zelfdiagnose: recap zegt laten onderzoeken
- Yasmin is de schouderpatiënt (Lotte zit al in film 1)
- Noor op één been: in beeld als enkel op het kussen (er is geen pose op één been)
- Feedback Kamiel 25 okt 2026 verwerkt: s06 woordtijden hersteld, de letter na Antwoord bleef bij Vragen uit hoorbaar (scripts/antwoordletter.py)

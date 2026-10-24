# Je brein vult het in — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/neurowetenschappen-1-je-brein-vult-het-in.html` (audio in `neurowetenschappen-1-je-brein-vult-het-in/audio/`) |
| Reeks | Wat word jij? · Neurowetenschappen (ook bij Psychologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 7.254 credits (6.016 + heropname s08 en s20: 1.238) (flow in `stem/sessions.json`) |
| Duur | spraak 6:29 (389 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C · Schema, met cast (Sam en het stopcontact, Daan en Yasmin bij het gorillafilmpje, Lotte op de fiets) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie; `brein()` en `teken.js` uit Kijken in een denkend brein |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md): antwoordletters van q07 en q19 gewijzigd (s08, s20 opnieuw ingesproken), oog, schaduwillusie en labels verbeterd |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | keuken; Sam en het stopcontact dat een gezicht krijgt |
| H1 Je brein voorspelt | s04, s05, s06, q07, s08 | oog met oogzenuw (vezels), gele vlek; wazig straatbeeld met scherp cirkeltje; oogsprongen; schema voorspelling ↔ binnenkomend |
| H2 Invullen en terugrekenen | s09, s10, q11, s12, s13 | blinde vlek (zenuw verlaat het oog onder het midden); blinde-vlekkaart; schaduwillusie naar Adelson (pixelbeeld, A en B exact 120 grijs); stopcontact en gezichtsgebied; pareidolie |
| H3 Aandacht | s14, q15, s16, s17 | speelveld van bovenaf met gorilla; stippen; longscan met gorilla; Lotte en de kruising |
| H4 Als waarneming ontspoort | s18, q19, s20, s21 | arm met fantoomhand; kaart van het lichaam; spiegelkist; slechtziend oog en bloemen (Charles Bonnet) |
| Recap | s22, s23 | stopcontact; voorspelling ↔ binnenkomend → wat je ziet; drie kaartjes; opleidingen |

## Vragen
q02 → b; q07 → c; q11 → b; q15 → b; q19 → a (zie film.py).

## Begrippen
gele vlek, oogsprong, voorspelmachine, blinde vlek, illusie, pareidolie, gezichtsgebied, aandachtsblindheid, fantoompijn, kaart van het lichaam, spiegeltherapie, syndroom van Charles Bonnet.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 142 | `window.FILMDATA` |
| 1505 | `brein()` (uit Kijken in een denkend brein) |
| 1634 | eigen tekeningen (teken_*.js) |
| 1503 | `const SCENES = {}` |
| 1782 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/n1` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py n1 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py n1 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten worden niet uitgesproken; de antwoordletter ('Antwoord b.') wel.
- Beeld: bewerk `scenes_n1.js` / `teken_n1.js`, dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js n1/teken_n1.js n1/scenes_n1.js; } > n1/scenes.js`.
- Vragen, begrippen, docentdeel: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py n1 && python3 engine/build.py n1`; in de repo zetten: `python3 engine/pak.py n1 neurowetenschappen`, daarna de vaste scripts (spelerfix, flipkaarten, teller, licentie_noot, vervolg_films).

## Aandachtspunten
- Gedeelde film: staat bij Neurowetenschappen én Psychologie; de terugknop gaat naar Neurowetenschappen.
- De schaduwillusie is een pixelbeeld (gecachet, `_bordBeeld`); A en B zijn exact gelijk (grijs 120), de schaduw is een zachte band vanaf de cilinder.
- Sam 'zit aan de keukentafel' maar staat ernaast (er is geen zithouding in het castboek); Lotte 'fietst' maar staat met haar telefoon naast de kruising.
- Eindreview-KAN niet verwerkt: instructie bij de blinde-vlektest is kort (zie lessuggestie).

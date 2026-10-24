# Brein en computer — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/neurowetenschappen-2-brein-en-computer.html` (audio in `neurowetenschappen-2-brein-en-computer/audio/`) |
| Reeks | Wat word jij? · Neurowetenschappen (computationele neurowetenschap, neurotechnologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 5.881 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:34 (394 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C · Schema, met cast (Daan en zijn telefoon, Dr. Kim als neurowetenschapper, Teun als 'een kind') |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie; `brein()` en `teken.js` uit Kijken in een denkend brein |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md, alle MOET-punten in beeld en pagina verwerkt; geen heropname) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Daan met telefoon, galerij die op 'kat' filtert; netwerkje |
| H1 Een neuron als rekensom | s04, s05, q06, s07 | neuron met synapsen +2 +2 +1 −1 en een somstaaf met drempel 3 (vuurt); model van McCulloch & Pitts; rekenvraag +2 +2 +1 −3 |
| H2 Leren door gewichten | s08, q09, s10 | synaps die sterker wordt naast een dikkere lijn; perceptron met 9 hokjes (aan = zwart op licht); echte trainingssimulatie met foutengrafiek; test op een kruis met verschoven hokje |
| H3 Wat AI leende | s11, s12, q13, s14, s15 | lagen randjes → vormen → kat; Teun en een netwerk; stippen voor voorbeelden; kaarten energie, fout terugrekenen, timing |
| H4 Programmeren | s16, s17, q18, s19 | muis in doolhof, meetnaald, pulsrijen, Python-venster, Dr. Kim en Daan; chip in de bewegingsschors en robotarm |
| Recap | s20, s21 | telefoon, kaarten 'gebruikt' en 'maar anders', opleidingen |

## Vragen
q02 → b; q06 → c; q09 → b; q13 → b; q18 → b (zie film.py).

## Perceptron-simulatie (H2)
`P_START` (startgewichten), `P_DATA` (40 plaatjes: om en om kruis/rondje; vanaf plaatje 5 is bij een kruis één hoek en bij een rondje één randhokje uit), `P_STAPPEN` (leerregel w += 0,25·(doel − uitkomst)·x, drempel 0,5). Fouten bij plaatje 1, 2, 6 en 17; daarna geen. Testplaatje `KRUIS2` = 101010110 zit niet in de trainingsset en wordt 'kruis'.

## Begrippen
neuron, drempel, alles-of-niets, kunstmatig neuron, gewicht, perceptron, neuraal netwerk, laag, fout terugrekenen, meetnaald, chip die een robotarm stuurt.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 139 | `window.FILMDATA` |
| 1502 | `brein()` (uit Kijken in een denkend brein) |
| 1631 | eigen tekeningen (teken_*.js) |
| 1500 | `const SCENES = {}` |
| 1737 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/n2` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py n2 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py n2 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten worden niet uitgesproken.
- Beeld: bewerk `scenes_n2.js` / `teken_n2.js`, dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js n2/teken_n2.js n2/scenes_n2.js; } > n2/scenes.js`.
- Vragen, begrippen, docentdeel: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py n2 && python3 engine/build.py n2`; in de repo zetten: `python3 engine/pak.py n2 neurowetenschappen`, daarna de vaste scripts.

## Aandachtspunten
- De stem zegt 'zwarte hokjes'; in beeld zijn de aan-hokjes daarom donker op een lichte achtergrond.
- In de recap zegt de stem 'het verwerkt fouten op een andere manier'; H3 zegt dat niemand weet of de hersenen iets vergelijkbaars doen. De kaart zegt neutraler 'fout precies terugrekenen'. Bij een heropname van s20: 'en het rekent fouten precies terug; of je hersenen dat doen, weet niemand'.
- BrainGate gebruikte een Kalmanfilter (lineair, met gewichten), geen perceptron; de stem zegt 'met gewichten, net als in een kunstmatig netwerk'.

# Opgroeien onder druk — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/pedagogiek-2-opgroeien-onder-druk.html` (audio in `pedagogiek-2-opgroeien-onder-druk/audio/`) |
| Reeks | Wat word jij? · Pedagogiek (pedagogiek, jeugdzorg) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v3 = v2 met gevarieerde antwoordletters) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 4.901 credits incl. heropname s07, s13 (flow in `stem/sessions.json`) |
| Duur | spraak 4:27 (267 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Part C · Schema; mensen als telpoppetjes in grafieken en groepen, Dr. Kim als pedagoog. Bewust géén kind uit de cast als slachtoffer |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → v3 (antwoordletters) → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | eiland Kauai; telpoppetjes (1 = 7 kinderen), een derde met veel tegenslag; tijdlijn 1955–40 jaar |
| H1 Wat tegenslag doet | s04, s05, q06, s07 | risicogroep twee derde / een derde; staafjes kans op problemen per aantal ingrijpende ervaringen (schematisch); 'één persoon: niets zeker' |
| H2 Veerkracht | s08, q09, s10 | weegschaal risico's tegen een vaste volwassene; kaartjes oma, tante, leraar, buurman (verwijzing Hechting) |
| H3 Signaleren en melden | s11, q12, s13, s14 | school; signalen; de vijf stappen van de meldcode; Veilig Thuis; Kindertelefoon |
| H4 Wat een pedagoog doet | s15, q16, s17 | Dr. Kim; videoscherm ouder en baby met goede momenten gemarkeerd (videofeedback, Leiden) |
| Recap | s18, s19 | Kauai-groep en weegschaal 'iemand die er is'; opleidingen |

## Vragen
q02 → b; q06 → c; q09 → b; q12 → c; q16 → a (zie film.py).

## Begrippen
Kauai-onderzoek, ingrijpende jeugdervaringen, risicofactor, veerkracht, beschermende factor, meldcode, Veilig Thuis, videofeedback, pedagoog.

## Hulpblok
Bovenaan de secties staat een blok 'Zit je zelf ergens mee?' (Kindertelefoon 0800-0432, Veilig Thuis 0800-2000, 112) in `sections.html`. Laat dat staan; controleer de nummers bij elke aanpassing.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 103 | Checkvragen |
| 113 | Voor de docent |
| 135 | `window.FILMDATA` |
| 1499 | `brein()` (uit Kijken in een denkend brein) |
| 1628 | eigen tekeningen (teken_*.js) |
| 1497 | `const SCENES = {}` |
| 1684 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/p2` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v3.md` aan, `python3 engine/make_segments.py p2 script_v3.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py p2 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_p2.js` / `teken_p2.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js p2/teken_p2.js p2/scenes_p2.js; } > p2/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py p2 && python3 engine/build.py p2`; stills: `python3 engine/stills.py p2 p2/qa contact`; in de repo zetten: `python3 engine/pak.py p2 pedagogiek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Gevoelig onderwerp: hulpblok bovenaan de secties en de nummers op de eindkaart; nummers controleren bij elke aanpassing.
- Dr. Kim draagt hier de outfit `gewoon` (jasje, geen labjas) uit `personages/lib_cast.js` (toegevoegd 20 okt 2026); het castboek is nog niet opnieuw gebouwd.
- In het filmpje van de videofeedback is Opa Henk de opvoeder (geen ouder; de tekst zegt 'ouder').
- De staafjes van het ACE-onderzoek zijn schematisch.
- Eindreview-KAN niet verwerkt: ondertitelbreuk midden in een zinsdeel (s07, s11), inhoudsmelding aan het begin.

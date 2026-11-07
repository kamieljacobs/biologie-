# Een practicum dat werkt — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/leraar-2-een-practicum-dat-werkt.html` (audio in `leraar-2-een-practicum-dat-werkt/audio/`) |
| Reeks | Wat word jij? · Leraar biologie (lerarenopleiding biologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · 20 oktober 2026 (script v2) · heropname 25 okt 2026 |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 3.142 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:23 (203 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Mevrouw Visser als docent, in practicumkleding; Lotte en Daan, Noor en Yasmin); de toa alleen als klaargezet dienblad, geen persoon |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Lotte en Daan met werkblad (tien vinkjes), fles met gist in warm water, ballon zwelt op; een week later: 'wat liet die proef zien?' |
| H1 Kookboek of onderzoek | s04 | 'handen bezig, hoofd niet' (Abrahams & Millar); trap met vier treden: bevestigen, gestructureerd, begeleid, open |
| H2 Een vraag die past | s05, q06, s07 | drie vraagkaartjes (te groot, past, te klein); klokje 50 minuten; twee flessen bij 20 en 35 °C |
| H3 Begeleiden zonder voor te zeggen | s08, q09, s10 | Noor en Yasmin met twee flessen; Mevrouw Visser vraagt terug; 'laten worstelen, niet laten verdrinken' |
| H4 Beoordelen | s11, q12, s13 | verslag A (grafiek, geen uitleg) en B (lekke ballon, veel uitleg); beoordelingslijst vraag–opzet–uitvoering–conclusie–discussie |
| Recap | s14, s15 | Lotte en Daan; dienblad van de toa; lerarenopleiding |

## Vragen
q02 → a; q06 → b; q09 → c; q12 → b (zie film.py).

## Begrippen
kookboekpracticum, niveaus van onderzoekend leren, onderzoeksvraag, variabele, gisting, beoordelen op proces, toa.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 130 | `window.FILMDATA` |
| 1628 | eigen tekeningen (teken_*.js) |
| 1497 | `const SCENES = {}` |
| 1669 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/l2` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py l2 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py l2 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_l2.js` / `teken_l2.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py l2 l2/scenes_l2.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js l2/teken_l2.js l2/scenes_l2.js; } > l2/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py l2 && python3 engine/build.py l2`; stills: `python3 engine/stills.py l2 l2/qa contact`; in de repo zetten: `python3 engine/pak.py l2 leraar`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Daan en Yasmin kregen op 20 okt 2026 een practicumgarderobe in het castboek; Mevrouw Visser is nieuw (`visser`).
- De toa staat niet als persoon in beeld (geen toa in het castboek), alleen als klaargezet dienblad.
- Eindreview-KAN niet verwerkt (heropname): denatureren boven 40 °C; optie b in H3 benoemen als voorzeggen.
- Woordtijden via silalign; bij s10, s11 en s14 viel telkens 1 leesteken niet op een stilte.

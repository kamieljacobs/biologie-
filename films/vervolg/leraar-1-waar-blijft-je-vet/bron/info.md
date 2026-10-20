# Waar blijft je vet? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/leraar-1-waar-blijft-je-vet.html` (audio in `leraar-1-waar-blijft-je-vet/audio/`) |
| Reeks | Wat word jij? · Leraar biologie (lerarenopleiding biologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 3.323 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:36 (216 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Mevrouw Visser als docent, nieuw in het castboek op 20 okt 2026; Sam in sportkleding, Noor, Daan); telpoppetjes alleen in de groep van 150 |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | klaslokaal: Mevrouw Visser bij het bord, Sam '−10 kilo' |
| H1 Een hardnekkig idee | s04, s05, q06 | vetmolecuul waarvan de atomen als CO2 en H2O wegvliegen; staaf 10 kg (8,4 via CO2, 1,6 via water); 150 telpoppetjes, 3 groen; boom 'hout uit de grond?' (verwijzing Alles in het groen) |
| H2 Een misvatting laten wankelen | s07 | Daan met een gedachtewolk waar het nieuwe blok niet in past; drie stappen voorspellen, waarnemen, verklaren; Noor blaast door kalkwater, gewone lucht door een tweede buis |
| H3 Leren door ophalen | s08, q09, s10 | tegeltjes lezen/ophalen voor groep A en B; staafjes na vijf minuten en na een week (40 % tegen 61 %) |
| H4 Een les rond één groot idee | s11, q12, s13 | boekenrij met draad; darmvlokken, longblaasjes, wortelharen, mitochondrium; gouden draad 'oppervlak vergroten' |
| Recap | s14, s15 | lokaal met CO2-molecuultjes in de lucht; routes (hbo tweedegraads, master eerstegraads) |

## Vragen
q02 → b; q06 → a; q09 → c; q12 → a (zie film.py).

## Begrippen
misvatting, voorkennis, voorspellen–waarnemen–verklaren, leren door ophalen, gespreid oefenen, oppervlaktevergroting, groot idee, lerarenopleiding.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 131 | `window.FILMDATA` |
| 1629 | eigen tekeningen (teken_*.js) |
| 1498 | `const SCENES = {}` |
| 1728 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/l1` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py l1 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py l1 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_l1.js` / `teken_l1.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py l1 l1/scenes_l1.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js l1/teken_l1.js l1/scenes_l1.js; } > l1/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py l1 && python3 engine/build.py l1`; stills: `python3 engine/stills.py l1 l1/qa contact`; in de repo zetten: `python3 engine/pak.py l1 leraar`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Mevrouw Visser is op 20 okt 2026 aan het castboek toegevoegd (`visser`, kleding `school` en `practicum`).
- De staafjes na vijf minuten (81/75 %) zijn indicatief; alleen het verschil na een week (61 tegen 40 %) wordt uitgesproken.
- Eindreview-KAN niet verwerkt (heropname): 'door veel te sporten', 'onder meer' in de hbo-route.
- Woordtijden via silalign; bij s13 viel 1 van de 8 leestekens niet op een stilte.

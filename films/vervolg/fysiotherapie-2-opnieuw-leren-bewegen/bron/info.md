# Opnieuw leren bewegen — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/fysiotherapie-2-opnieuw-leren-bewegen.html` (audio in `fysiotherapie-2-opnieuw-leren-bewegen/audio/`) |
| Reeks | Wat word jij? · Fysiotherapie en bewegingswetenschappen, film 2 |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 0 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:50 (230 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Schema (Part C), met cast (Opa Henk, Femke, Noor) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | terugblik, een paar jaar geleden; Opa Henk aan het ontbijt, rechterhand laat de lepel vallen; ziekenhuisbed; Femke vraagt: strek je vingers, til je arm opzij; klokje drie dagen |
| Hoofdstuk 1 — Waar het misging | s04 | hersenen van boven met motorische schors; baan die kruist naar de rechterkant; ruggenmerg, motorisch neuron, armspier; stolsel in de linkerhersenhelft, cellen die uitvallen; spieren en zenuwen in de arm heel met vinkje; twee balken: 98 van de 100 tegenover ongeveer een kwart; verwijzing naar Het hoofdkantoor |
| Hoofdstuk 2 — Kracht en gevoel | s05, q06, s07 | één motorisch neuron met een groepje spiervezels; oogspier met kleine groepjes, kuitspier met grote groepjes; weinig en veel eenheden aan; spier met een spierspoeltje dat rek meet en terugmeldt; Henk met de ogen dicht, wijsvinger naar zijn neus |
| Hoofdstuk 3 — Een brein dat zich aanpast | s08, q09, s10 | netwerk rond de beschadigde plek; buurcellen die nieuwe verbindingen maken; tijdlijn met snel herstel in de eerste weken tot drie maanden; Henk doet alles met links, het armgebied rechts krimpt; verwijzing naar Leren en onthouden |
| Hoofdstuk 4 — Herhalen en meten | s11 | Henk pakt een kopje, draait een sleutel, verplaatst blokjes; teller: dieren in onderzoek honderden herhalingen per dag, mensen in therapie ongeveer dertig per sessie; linkerhand in een want; grafiek met de score per week die oploopt; Femke past de oefening aan |
| Recap | s12, s13 | Opa Henk drinkt een kopje koffie met rechts, een beetje wiebelig; team rond Henk: Femke, revalidatiearts, ergotherapeut, logopedist; opleidingen |

## Vragen
q02 → c; q06 → a; q09 → b (zie film.py).

## Begrippen
beroerte, motorische schors, motorische eenheid, spierspoeltje, spiergevoel, plasticiteit, aangeleerd niet-gebruik, revalidatie.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 132 | `window.FILMDATA` |
| 1508 | `const SCENES = {}` |
| 1730 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fy2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> fysiotherapie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Terugblik: Henks beroerte vóór zijn Parkinson (Als hersencellen uitvallen)
- Henk is in s07 en s11 gespiegeld getekend, zodat hij met zijn rechterarm (links in beeld) grijpt
- 25%-groep = wie niet beide bewegingen kon (feitencheck)
- Feedback Kamiel 25 okt 2026 verwerkt: Henk in bed in verhouding (henkBed leidt bed- en beenlengte af van H, H 470), labels 1/2 naar rechts; s07 woordtijden hersteld (letter na Antwoord, scripts/antwoordletter.py)

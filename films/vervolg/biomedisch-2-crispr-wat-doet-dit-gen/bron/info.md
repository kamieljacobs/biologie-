# CRISPR: wat doet dit gen? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biomedisch-2-crispr-wat-doet-dit-gen.html` (audio in `biomedisch-2-crispr-wat-doet-dit-gen/audio/`) |
| Reeks | Wat word jij? · Biomedische wetenschappen (wo) — tegelijk extra film bij DNA (havo en vwo) |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 24 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.934 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:20 (380 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C · Schema en Micro, met cast (Opa Henk, Linda, Teun, Dr. Kim); gist, C. elegans, zebravisembryo en muis zelf getekend in filmstijl |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Opa Henk bindt tomaten op in zijn tuin, Teun houdt het touw vast; ernaast een kleine stamboom met Henks vader, Henk en Linda, bij alle drie een hoge cholesterolbalk; Dr. Kim met een stuk DNA waarin bij Henk en Linda dezelfde base anders is |
| Hoofdstuk 1 — Verband of oorzaak | s04, s05 | links een stamboom waarin de variant bij elke zieke meeloopt; rechts twee groepen mensen, met en zonder een kapot gen, met twee cholesterolbalken; onderaan een pijl naar een vraagteken bij 'oorzaak' |
| Hoofdstuk 2 — Een model kiezen | s06, s07, q08, s09 | vier modellen naast elkaar, elk met een maatlabel: een gistcel sterk vergroot, de worm C. elegans, een zebravisembryo met kloppend hart, een muis; bij elk een kaartje met waarvoor je hem kiest |
| Hoofdstuk 3 — Uitschakelen en meten | s10, s11, q12, s13 | ronde levercel met LDL-receptoren in het membraan die cholesteroldeeltjes naar binnen halen; een PCSK9-eiwit dat een receptor meeneemt en laat afbreken; daarnaast twee muizen in filmstijl, een knock-outmuis en een controlemuis, met twee cholesterolbalken |
| Hoofdstuk 4 — Van muis naar mens, en mag dat? | s14, s15, q16, s17 | links een infuus bij Opa Henk, met vetbolletjes die naar zijn lever gaan en een LDL-balk die zakt; rechts twee wegen naast elkaar: lichaamscel, met de verandering bij de patiënt zelf, en eicel, zaadcel of embryo, met de verandering in alle volgende generaties en een stempel 'in Nederland verboden'; onderaan drie afweegkaartjes |
| Recap | s18, s19 | de vier stappen als tijdlijn, van stamboom naar modelorganisme naar CRISPR-knip naar infuus; daarnaast Opa Henk weer in de tuin met Teun; kaartje met de opleiding Biomedische wetenschappen |

## Vragen
q02 → b; q08 → a; q12 → c; q16 → b (zie film.py).

## Begrippen
verband en oorzaak, meeliften, PCSK9, LDL-receptor, modelorganisme, knock-out, gids-RNA, controlegroep, somatische gentherapie, kiembaanverandering.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 144 | `window.FILMDATA` |
| 1829 | `const SCENES = {}` |
| 2156 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/b2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biomedisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Gedeelde film: Biomedisch basis 2 (id crispr) én extra film buiten het PTA bij DNA, havo en vwo
- Begrijpelijk voor havo: CRISPR-Cas9 en gids-RNA kort zelf uitgelegd
- Henks familie: PCSK9 werkt te hard (Abifadel 2003)
- s10 en s11 na de eindreview opnieuw ingesproken
- s05 "Bij mensen mag dat niet" nog wegen tegen H4

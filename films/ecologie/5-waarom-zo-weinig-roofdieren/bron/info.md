# Waarom zo weinig roofdieren? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/5-waarom-zo-weinig-roofdieren.html` (audio in `5-waarom-zo-weinig-roofdieren/audio/`) |
| Reeks | Ecologie (v2), film 5 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f5.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 8.082 credits (flow cWKYL4dr77N2Qn49z8CN) |
| Duur | spraak 8:47 (527 s, basis 482 s); met vragen en kaarten ± 10 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Het gras | s04, s05, s06, s07, q08, s09, s10, s11, s12, s13, s14 |
| Hoofdstuk 2 — De koe | s15, s16, s17, s18, s19, q20, s21, s22 |
| Hoofdstuk 3 — Waar blijft de energie? | s23, s24, q25, s26, s27, s28 |
| Hoofdstuk 4 — Van niveau naar niveau | s29, s30, s31, s32, s33, q34, s35, s36 |
| Hoofdstuk 5 — Warm of koud | s37, s38, s39, q40, s41, s42, s43, s44 |
| Recap | s45 |

## Vragen

q08 → b; q20 → a; q25 → c; q34 → a; q40 → b.

## Begrippen

energiestroom, bruto primaire productie (BPP), netto primaire productie (NPP), biomassa, drooggewicht (droge stof), energiestroomschema, feces, productie (van een consument), secundaire productie (vwo), trofisch niveau, voedselketen (pijlrichting), piramide van aantallen, biomassa en energie, endotherm (warmbloedig), ectotherm (koudbloedig), voedselconversie, productiviteit per ecosysteem (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 166 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2080 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb5.js (keyframes) |
| 19053 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e5.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e5/` (segments.json, map.json, film.py, sections.html, src/scenes_e5.js, src/teken_e5.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 5` en `python3 eco_pak.py 5`.
- Een tekstfout in beeld of een beweging: `scenes_e5.js` / `teken_e5.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f5.json`.

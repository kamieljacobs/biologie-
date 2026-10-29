# Wie eet wie? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/3-wie-eet-wie.html` (audio in `3-wie-eet-wie/audio/`) |
| Reeks | Ecologie (v2), film 3 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f3.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 8.757 credits (flow QycZUZAEmpibDZqg4frJ) |
| Duur | spraak 9:46 (586 s, basis 543 s); met vragen en kaarten ± 11 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Pijlen van voedsel | s04, s05, q06, s07, s08, s09, s10, s11, s12 |
| Hoofdstuk 2 — Eten zonder te doden | s13, s14, q15, s16, s17 |
| Hoofdstuk 3 — De golven | s18, s19, s20, s21, q22, s23, s24, s25, q26, s27, s28 |
| Hoofdstuk 4 — Samenleven | s29, s30, q31, s32, s33, s34, s35, s36, s37 |
| Hoofdstuk 5 — Twee gastheren | s38, s39, s40, s41, q42, s43, s44, s45, q46, s47 |
| Recap | s48, s49, s50 |

## Vragen

q06 → a; q15 → c; q22 → b; q26 → b; q31 → a; q42 → c; q46 → a.

## Begrippen

voedselketen, voedselweb, producent, consument, herbivoor · carnivoor · omnivoor, aaseter, trofisch niveau, predatie, vraat, afweer tegen vraat, predator-prooirelatie, symbiose, mutualisme, commensalisme, parasitisme, gastheer, eindgastheer · tussengastheer, levenscyclus, darmflora (vwo), mycorrhiza (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 112 | Voor de docent |
| 168 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2082 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb3.js (keyframes) |
| 18982 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e3.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e3/` (segments.json, map.json, film.py, sections.html, src/scenes_e3.js, src/teken_e3.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 3` en `python3 eco_pak.py 3`.
- Een tekstfout in beeld of een beweging: `scenes_e3.js` / `teken_e3.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f3.json`.

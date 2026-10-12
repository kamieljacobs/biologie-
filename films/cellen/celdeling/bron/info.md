# Celdeling — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/celdeling/index.html (audio in films/cellen/celdeling/audio/) |
| Reeks / nummer | Cel, film 3 van 3 ("Biologie bij Kamiel · reeks Cel · film 3 van 3"); 1 = Diffusie en osmose, 2 = Celorganellen |
| Doelgroep / niveau | havo + vwo met gelabelde vwo-blokken (Havo/Vwo-schakelaar; standaard Vwo). Mitose, meiose, G1/S/G2 en crossing-over staan in het basisdeel (besluit Kamiel 12 okt 2026, na de curriculumreview). Vwo-blokken: controlepunten (H2), kanker + non-disjunctie + trisomie 21 (H6) |
| Versie / datum | Versie 1.0 · 12 oktober 2026 |
| Stem / model | Roos (ElevenLabs, model eleven_v4, voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment; woordtijden met Scribe (eleven_scribe_v1) |
| Duur | 10:13 gesproken (som van 26 mp3's: 613 s). Speeltijd met kaarten en vragen: Vwo 12:43, Havo 11:14 |
| Beeldstijl | Part C-stijlkaart: Micro, Schema, één Macro-figuur. Modelcel 2n = 4 (lang en kort paar). Kleuren: blauw = chromosoom van vader, roze = van moeder, paars = DNA/kern (en vwo-balk), goud = focus/telling, koraal = fout/te veel, groen = conclusie |
| Audio-opslag | 26 losse mp3's in audio/ (s01, s04, s05, s06, s08–s13, s15–s17, s19–s22, s24–s27, s29, s30, s32, s33, s35), gemasterd op −16 LUFS / −1,5 dBTP |
| Herkomst | Gemaakt door Claude met Kamiel in één sessie (12 okt 2026), met dezelfde bouwstraat als Diffusie en osmose. Remake in Part C van een film van Kamiels broer |

## Echte bronbestanden (in deze map)

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script (leerdoelen, misconcepties, [VWO-START]/[VWO-END], [VRAAG]; lege regel = grens tussen takes). `script_v1.md` = vóór de reviews |
| `script.md` | Gesproken tekst per segment met begintijd, duur, mp3 en afwijkende stem-invoer; vragen met juiste antwoord |
| `stem/segmenten_stem-invoer.json` | Per segment `display` en letterlijke `voice` |
| `stem/uitspraaklijst.md` | Respellings (door Kamiel gekozen) en ElevenLabs-flows |
| `stem/woordtijden/sNN.json` | Woordtijden per take |
| `stem/uitspraaktest.mp3` | De uitspraaktest waaruit Kamiel koos |
| `src/lib.js` | Part C-tokens en reeksbibliotheek |
| `src/scenes_lib.js` | Algemene helpers (pil, kaart, pijl, deeltjes, ion, enz.; gedeeld met Diffusie) |
| `src/chrom_lib.js` | Chromosomenkit: `chromatid`, `chromX`, `chromatin`, `cellBody` (met insnoeren), `mitosisCell` (fasen als getallen 0..1), `cellWith`, `dnaGraph`, `karyo`, `sperm`, `egg`, `MODEL` (de modelcel) |
| `src/scenes.js` | Eén scènefunctie per segment + `cycleRing` (celcyclusring) en `comparePanels` (drie metafasen) |
| `src/player.js`, `src/page.html` | Speler en paginasjabloon |
| `bouw/*` | Bouwstraat, stills, tests, `checkcues.js` |
| `reviews/` | Scriptreviews (vakexpert, didactiek + taal, curriculum) en beeldreview met wat ermee gedaan is |

## Opbouw (Vwo; Havo tussen haakjes waar anders)

| Begin | Hoofdstuk | Kernbeeld |
|---|---|---|
| 0:00 | Cold open | Eén bevruchte eicel → 37 biljoen cellen; 2 m DNA in een kern; hoe eerlijk verdelen? |
| 0:39 | Titel | "Celdeling — Eerst kopiëren, dan verdelen" met een delende cel |
| 0:44 | H1 Waarom delen? | Groeien, herstellen, vervangen (darmvlok, 2 miljoen rode bloedcellen/s); bacterie; grote cel en diffusie |
| 1:34 | H2 De celcyclus (+ vwo-blok) | Ring: interfase (geen rustfase), mitose, cytokinese; kerndeling vs celdeling; G1/S/G2; vwo: controlepunten |
| 3:15 (3:00) | H3 Chromosomen tellen | Chromatine; karyogram (23 paren, XX/XY); oprollen; chromatiden en centromeer; "twee soorten twee"; modelcel met vier X'en |
| 4:59 (4:44) | H4 Mitose | Profase, metafase, anafase (even 92), telofase, cytokinese; celplaat; DNA-grafiek p → 2p → p |
| 6:51 (6:36) | H5 Meiose | Bevruchting; diploïd/haploïd; meiose I (paren), meiose II; 4 zaadcellen / 1 eicel; DNA-grafiek tot ½p; toeval 2²³; crossing-over; n + n = 2n |
| 9:16 (9:01) | H6 Mitose en meiose naast elkaar (+ vwo-blok) | Drie metafasen; vergelijkingstabel; vwo: kanker, non-disjunctie, trisomie 21 |
| 11:32 (10:02) | Recap | Vier panelen; huidcel vs zaadcel |
| 12:34 (11:05) | Eindkaart | Drie kernzinnen |

## Vragen (juiste antwoord vet)

| Id | Niv. | Vraag | Opties |
|---|---|---|---|
| q02 | basis | Hoe verdeelt een cel zijn DNA eerlijk? | knippen in helften · **eerst kopiëren, dan verdelen** · elke cel maakt nieuw DNA |
| q07 | basis | Wanneer wordt het DNA gekopieerd? | tijdens de mitose · **in de interfase** · na de cytokinese |
| q14 | basis | Cel met vier X'en: hoeveel chromosomen? | 2 · **4** · 8 |
| q18 | basis | Chromosomen per dochtercel (mens)? | 23 · **46** · 92 |
| q23 | basis | Chromosomen per cel na meiose I (mens)? | 46 · **23** · 92 |
| q28 | basis | Waar liggen homologe chromosomen als paren in het equatorvlak? | mitose · **meiose I** · meiose II |
| q31 | vwo | Eicel 24 + normale zaadcel: hoeveel? | 45 · 46 · **47** |
| q34 | basis | Huidcel (deelt niet) of zaadcel: meer DNA in de kern? | evenveel · **de huidcel** · de zaadcel |

## Begrippen
celdeling, celcyclus, interfase, G1/S/G2, chromatine, chromosoom, homologe chromosomen, geslachtschromosomen/autosomen, karyogram, chromatide, centromeer, mitose, profase–telofase, spoelfiguur, equatorvlak, cytokinese, celplaat, diploïd, haploïd, meiose (reductiedeling), crossing-over; vwo: controlepunt, non-disjunctie, trisomie 21, tumor/kanker.

## Docentdeel
Op de pagina: tabel "Hoe de film het uitlegt", uitleg modelcel en kleuren, misconcepties, pauzemomenten, getallen met bron, vereenvoudigingen, leerdoelen en dekking, practicumsuggesties; zes checkvragen (vier basis, twee vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

| Regel | Inhoud |
|---|---|
| 66 | Sitebalk "← Terug naar Cellen" |
| 95 / 113 | Checkvragen / docentdeel |
| 158 | `window.FILMDATA` |
| 160 | Part C-tokens en reeksbibliotheek |
| 467 | Chromosomenkit (chrom_lib.js); `mitosisCell` op 515 |
| 575 | `const SCENES`; s01 577, s04 596, s05 614, s06 630, s08 633, s09 638, s10 639, s11 641, s12 657, s13 666, s15 687, s16 697, s17 711, s19 730, s20 738, s21 747, s22 761, s24 778, s25 798, s26 804, s27 830, s29 831, s30 846, s32 869, s33 877, s35 893 |
| 902 | `cycleRing` (celcyclusring) |
| 945 | Begrippen (`GLOSSARY`) |
| 971 | Speler |

Pas nooit `index.html` direct aan: wijzig `src/` en bouw opnieuw.

## Hoe je de film aanpast

**Werkmap** (buiten de repo): kopieer `bron/src/`, `bron/bouw/*`, `bron/script_v2.md`; `stem/segmenten_stem-invoer.json` → `segments.json`; `stem/woordtijden/` → `words/`; mp3's → `master/` en `film/audio/`. Dan `python3 build_data.py && python3 build.py && node checkcues.js` (meldingen bij s35 zijn vals alarm: de ringhelper staat onder s35 in het bestand).

**Beeld:** scènes in `src/scenes.js`; cue-woorden via `q.at('woord', n)` (n telt alle woorden die het woord bevatten: "Elke" vindt ook "elke"). Mitosefasen stuur je met de getallen in `mitosisCell(…, {cond, sp, nm, meta, ana, telo, cyto})`. Controleer met `python3 shots.py uit s17:10`.

**Tekst:** `script_v2.md` → `make_segments.py` → in `segments.json` `s03` op `kind: title` en `s36` op `kind: card` → alleen gewijzigde segmenten opnieuw inspreken (Roos, eleven_v4, één take, invoer uit `voice`) → Scribe → mastering (`loudnorm=I=-16:TP=-1.5:LRA=11`, twee passes, `linear=true`) → `build_data.py` → `build.py`.

**Vragen:** `answers` en `questions_text` in `bouw/build_data.py`; opties in `script_v2.md`.

## Aandachtspunten
- Uitspraak door Kamiel gekozen via de uitspraaktest; X/Y ("iks"/"ei") zat niet in de test en volgt de vaste voorkeur Y = "ei".
- Fonts via Google Fonts; geen MP4-export.
- Rendertijd per scène ≤ 2,1 ms per frame bij 4× vertraagde CPU.

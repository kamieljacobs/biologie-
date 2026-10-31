# Hoe weet een cel wat hij moet worden? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/extra/hoe-weet-een-cel.html (audio in `hoe-weet-een-cel/audio/`) |
| Reeks | geen; extra film bij thema Cellen (`HOOFDSTUKKEN.extra`, `thema: 'cellen'`) |
| Niveau | vwo, één niveau (verdieping, buiten het PTA) |
| Versie / datum | 1.0 · 31 okt 2026 |
| Prompt | v13 |
| Stem | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea; flow https://elevenlabs.io/app/flows/CxO7VI8KRQyLblQnjhrQ |
| Duur | ± 13,1 min gesproken; ± 17 min met kaarten en vragen |
| Beeldstijl | Part C (Micro / Schema / Macro), FILMDATA-straat (engine van Zenuwstelsel 9); korrel in de micro-look verlaagd (350 stipjes, alpha 0,03–0,07) |
| Audio-opslag | 85 losse mp3's (`../audio/sNN.mp3`, loudnorm −16 LUFS, −1 dBTP); ruwe takes niet bewaard; woordtijden `stem/woordtijden/` (silalign); generaties in `stem/gen.jsonl` |
| Herkomst | Kamiel 30 okt 2026: extra diepe film over differentiatie bij Cellen, gekoppeld aan voortplanting (hoe embryocellen organen vormen); opbouw akkoord 30 okt; twijfelscènes goedgekeurd 31 okt; lengte 17 min akkoord ('voor leerlingen die uitgedaagd willen worden') |
| B15 | drie varianten, blinde beoordelaar (sonnet): A klassiek wint duidelijk 50–41–40 (`varianten/`, `films/logboek/mutaties.jsonl`) |
| Bronnen | `bronnen.md`: 114 beweringen, 83 bronnen, 83 ✓ · 31 ≈ · 0 ! · 0 ?; steekproef voor Kamiel klaargezet: https://claude.ai/artifact/B1nvQ1FtBCsVDgAhe7GnvS |
| Storyboard | `storyboard/` (61 keyframes, tekencode, keuringsblad https://claude.ai/artifact/717QxWuWPtTvvS1GxHgGmr) |
| Voldoet aan | prompt v13 |

## Opbouw

Cold open · 1 Een knikker op een heuvel · 2 Binnen of buiten · 3 Drie lagen · 4 De eerste buis · 5 Hoeveel signaal? · 6 Een bericht voor onze cel · 7 Mastergen en adresboek · 8 Vastzetten · 9 Kan de knikker terug? · 10 Terug naar de lens. Script: `script_v2.md` (definitief, gelijk aan `script.md` v0.3). Vragen q05 (b), q16 (a), q27 (b), q44 (c), q53 (a), q63 (b), q73 (c), q82 (c). Checkvragen en docentdeel in `sections.html`, begrippen in `film.py`.

## Waar wat zit

- `film.py` + `sections.html` → `film.json` (titel, puzzel, minis, vragen, begrippen, docentdeel).
- `segments.json` (uit `script_v2.md` met `bouw/make_segments.py`), woordtijden in `stem/woordtijden/`.
- Scènes: `src/sbw1–4.js` + `src/lib_dif.js` (storyboard-tekeningen, ook in `storyboard/src/`), `scenes_basis.js` (keyframe per alinea, vangnet), `scenes_d1.js` (cold open–H3 + titel), `scenes_d2.js` (H4–H5), `scenes_d3.js` (H6–H7), `scenes_d4.js` (H8–H10).
- Engine: `src/` (lib.js met rustigere korrel, player.js met titel over twee regels, scenes_kop.js, lib_cast.js …) en `bouw/` (build, build_data, stills, cuecheck, silalign, make_segments).

## Aanpassen

1. Werkmap buiten de repo: `W=/home/claude/werk/dif; mkdir -p $W/eng $W/kf $W/film`; kopieer `src/*` en `bouw/*` naar `$W/eng/`, de storyboardbibliotheken (`src/base.js dier_basis.js dieren_zoog.js pop_katten.js lib_bio.js lib_evo.js lib_dif.js sbw1–4.js`) naar `$W/kf/`, en `film.py sections.html segments.json script_v2.md uitspraak_film.json kaart.json scenes_*.js` naar `$W/film/`; woordtijden naar `$W/film/words/`, audio naar `$W/film/audio/`; `bouw.sh` naar `$W/`.
2. `bash $W/bouw.sh` → `$W/film/film/hoe-weet-een-cel.html`; stills met `python3 eng/stills.py film film/qa sNN:t …`.
3. Nieuwe tekst = nieuwe take voor alleen die alinea (één take), loudnorm, `silalign.py`, opnieuw bouwen. Daarna: themaregel na `<meta charset>` terugzetten en de scripts uit CLAUDE.md draaien.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (blastocyste, gastrulatie, chorda, Sonic hedgehog, eyeless, axolotl, namen). Nog niet blind getranscribeerd (Scribe); Kamiel test in een batch.
- Geen filmmedaillon (gloedstijl) gemaakt; de film gebruikt de lijntekening in `FILMKUNST`.
- Zwakke plekken (animatoren): s11 korte overvloei van twee landschappen; s31 kleine sprong bij het sluiten van de buis; s49 rand van het kuiltje bolt even uit; s68 kopieën schuiven kort over de pijl; s94 eerste seconde van de zoom grof.
- Bouwt voort op Stamcellen, Genen aan en uit (DNA 6) en Van bevruchting tot baby.

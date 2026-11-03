# Waarom bonkt je hart voor een spreekbeurt? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32c/5-stress-en-rust/index.html` (audio in `audio/`: 14 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32C (gezond leven) film 5 — aanvulling november 2026 (`films/onderbouw/AANVULLING-2026-11.md`, film 1) |
| Kerndoel | 32C kernzin (mentale gezondheid), bullet 1 (slaap, beweging, natuur) en bullet 5 (omgeving, media, eigen keuzes; reflecteren buiten de film) |
| Doelgroep / niveau | onderbouw leerjaar 1–3. Basislijn + één blok **uitdaging** (s07: keten hersenen → bijnieren → hart, vecht-of-vluchtreactie). Schakelaar Basis / Uitdaging. Nergens havo/vwo/vmbo |
| Versie / datum | 1.0 · 3 november 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (3 nov 2026), met Part D. Bewust anders: B5 blinde uitspraakcontrole niet blind (Scribe hing aan de TTS-node; uploaden werd door de netwerkfilter geweigerd) |
| B15 | trekking A klassiek · B metafoor + rol personage · C casus; blinde beoordelaar Claude Fable 5.1: ronde 1 A wint nipt van B (66–66, C 63), ronde 2 combinatie W (geraamte A + agenda uit C + Yasmin/Visser uit B) wint nipt; **W gebouwd**, keuze 'toch A / B' ligt bij Kamiel (`storyboard.md`) |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea, flow `crLNniSIn0pa4Sb7Z4Bd` (ids in `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 14 takes woord voor woord gelijk aan de stem-invoer (`stem/woordtijden/`) |
| Duur | spraak 226 s; speeltijd Uitdaging ± 5:05, Basis ± 4:40 (met vragen, zonder wachten) |
| Credits | TTS ± 3.400 tekens; Scribe 0 credits |
| Beeldstijl | Part C. Rode draad: het alarm van je lichaam (alarmbel aan / half / uit). Lotte voor de klas (Macro-dag, klas van 32A film 7), hersenen in een zoomcirkel náást het hoofd, vier rijen hart · longen · spieren · minder speeksel; één alarm voor gevaar én iets spannends; uitdaging met Lotte, zoomcirkels hersenen en nieren/bijnieren, ketenkaartjes, Lotte rent (castboekgang); Yasmin en Mevrouw Visser met tekstballon; Lottes agenda; grafiek 'alarm over dagen'; telefoon in de hand met zoomcirkel; vijf vakjes wat helpt; samenvatting en stille eindkaart 'Onthoud' |
| Audio-opslag | losse mp3's per take, te masteren naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v13 Part D, autonoom (B7), 3 nov 2026 |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `varianten/` · `werk/blind*/` | brief en B15 (behandelingen, blinde oordelen, labelsleutel) |
| `script_v1.md` → `script_v2.md` | script vóór en na de reviews (`reviews/reviews_v1.md`, `werk/blind2/oordeel.md`); `script.md` = ingesproken tekst per take met filmtijd |
| `bronnen.md` | bronnenlogboek (B1–B9, 17 beweringen) |
| `storyboard.md` | scènes, B15-blok en twijfelscènes voor Kamiel |
| `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `vragen.json` · `uitspraak_film.json` | docentdeel, begrippen, uitspraakwachtlijst, site-item, vragen, film-eigen stemregel |
| `stem/` | stem-invoer per segment, woordtijden, generatie-ids (`wt_invoer.py` zette de Scribe-tijden om) |
| `src/scenes_32c5.js` · `src/lib_a7.js` · `src/lib_32c.js` | scènes · hulpfuncties uit 32A film 7 (glow uitgezet) · gedeelde 32C-tekeningen |
| `src/` overig, `bouw/` | speler, basis en bouwstraat van de 32C-reeks (paden bovenin `bouw/bouw.py` aanpassen aan je werkmap) |
| `reviews/` | reviewpassen script (`reviews_v1.md`) en frisse beeldreview (`beeldreview.md`) |

**Werkmap opzetten:** zoals bij 32C film 4: `script_v2.md`, `docentdeel.md`, `begrippen.json`, `vragen.json`, `uitspraak_film.json`, `src/`, `stem/` in een map; `_base/` (head, lib, helpers, tail, lib_cast, lib_anatomie) en `_engine/player_block.html` ernaast. Dan `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; daarna in de repo `scripts/spelerfix.py` en `scripts/microteken.py`.

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | Wat gebeurt er in Lotte? | slecht, in de war · vooral in haar hoofd · lichaam maakt zich klaar | c |
| q09 | Yasmin was ook zó zenuwachtig. Wat zegt dat? | ze is zwak · lichaam reageert op iets spannends · slecht geoefend | b |
| q12 | Na weken met een volle agenda? | prima, went eraan · moe en slaapt slecht · extra fit | b |
| q15 | Telefoon om te rusten: wat doet dat met het alarm? | gaat uit · blijft half aan, steeds iets nieuws · gaat harder aan | b |

## Begrippen

stress, korte stress, lange stress, adrenaline, ontspannen · uitdaging: bijnieren, vecht-of-vluchtreactie.

## Waar wat in de HTML zit (`index.html`, versie 1.0, na spelerfix)

- checkvragen: regel 99
- docentdeel: regel 113
- FILMDATA: regel 144
- hulpfuncties 32A film 7 (lib_a7): regel 1797
- scènes van deze film: regel 1927
- const SCENES: regel 1958
- GLOSSARY: regel 2107
- drawChapterCard: regel 2182
- scènefuncties: `s01` 1960, `s02` 1968, `s03` 1972, `s05` 1976, `s06` 1996, `s07` 2006, `s08` 2025, `s10` 2033, `s11` 2040, `s13` 2052, `s14` 2066, `s16` 2071, `s17` 2087, `s18` 2099

## Zo pas je deze film aan

1. **Een scène**: functie `sNN` in `SCENES` (`src/scenes_32c5.js`); cues hangen aan woorden via `q.at('woord', n)`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
3. **Vraag**: opties in `script_v2.md`, tekst/goed/uitleg in `vragen.json`; dan `maak_segmenten.py` en `bouw.py`.
4. **Docentdeel**: `docentdeel.md`; checkvragen in `src/config.json`.
5. Na elke bouw in de repo: `scripts/spelerfix.py`, `scripts/microteken.py`, en `--check` van spelerfix, antwoordtekst, kortantwoord, antwoordletter.

## Aandachtspunten

- **Audio:** de takes staan in de ElevenLabs-flow; downloaden vanuit deze werkomgeving werd geweigerd (netwerkfilter op elevenlabsusercontent.com). Zolang `audio/` ontbreekt staat de film niet op de site (niet in `HOOFDSTUKKEN`).
- Zie `storyboard.md` voor de twijfelscènes (toon, alarmbeeld uit 32A film 7, leeuw als tekst, B15-keuze).
- Frisse beeldreview (`reviews/beeldreview.md`, 20 punten): verwerkt 1–5, 7–11, 13, 15, 17-deels (s17), 18–20; bewust niet: titelkaart met ondertitel (gedeelde speler), tekstgrootte van de gedeelde spelerlaag (vraagkaart, serieregel), raam met maan (klas uit 32A film 7), Lotte naast in plaats van op de fiets.

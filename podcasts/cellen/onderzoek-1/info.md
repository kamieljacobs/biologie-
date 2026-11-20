# Podcast Onderzoek doen 1: van vraag naar eerlijke proef 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `onderzoek-1` (nog toe te voegen aan `podcasts/afleveringen.json`), 6 hoofdstukken in `audio/` |
| Bij film | `films/cellen/onderzoek-doen/` 2.0, H1–H3 (cyclus, vraag/hypothese/verwachting, eerlijke proef, blind meten); script `bron/script_remake_v2.md`, bronnen `bron/bronnen.md` |
| Niveau | havo + vwo; geen vwo-hoofdstuk (de film heeft geen vwo-blok) |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 (spreekstijl, begripsblok), werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 7940 credits |
| Duur | 8:43 (inclusief denkstiltes en muziek) |
| Audio | gebouwd met `podcasts/bouw.py`: intro (hfst 0) of overgang, stiltes 3/4 s na denkvragen, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s; ruwe takes buiten de repo (`/home/claude/podcast-ruw/onderzoek-1/`) |

## Hoofdstukken

| Bestand | Titel | Duur |
|---|---|---|
| 0-0.mp3 | Opening | 42 s |
| 1-1.mp3 | De route | 79 s |
| 2-2.mp3 | Van vraag naar verwachting | 143 s |
| 3-3.mp3 | Een eerlijke proef | 98 s |
| 4-4.mp3 | Blind meten | 110 s |
| 5-5.mp3 | Afsluiting | 51 s |

## Aanpassen

Tekst wijzigen in `script.md`, dan `python3 podcasts/maak_segmenten.py podcasts/cellen/onderzoek-1` (bewaart generation-ids van ongewijzigde segmenten), alleen gewijzigde segmenten opnieuw inspreken (Remko, eleven_v4, één take), ruwe takes als `<segment-id>.mp3` in een werkmap, dan `python3 podcasts/bouw.py podcasts/cellen/onderzoek-1 <werkmap>`. Ontbrekende ruwe takes ophalen via `creative_get_generations` met de generation-ids uit `segmenten.json`.

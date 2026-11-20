# Podcast Onderzoek doen 2: kun je de uitkomst vertrouwen? 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `onderzoek-2` (nog toe te voegen aan `podcasts/afleveringen.json`), 7 hoofdstukken in `audio/` |
| Bij film | `films/cellen/onderzoek-doen/` 2.0, H4–H7 (meetfouten, betrouwbaar/valide, conclusie, correlatie, ethiek); script `bron/script_remake_v2.md`, bronnen `bron/bronnen.md` |
| Niveau | havo + vwo; geen vwo-hoofdstuk (de film heeft geen vwo-blok) |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 (spreekstijl, begripsblok), werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 9028 credits |
| Duur | 10:19 (inclusief denkstiltes en muziek) |
| Audio | gebouwd met `podcasts/bouw.py`: intro (hfst 0) of overgang, stiltes 3/4 s na denkvragen, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s; ruwe takes buiten de repo (`/home/claude/podcast-ruw/onderzoek-2/`) |

## Hoofdstukken

| Bestand | Titel | Duur |
|---|---|---|
| 0-0.mp3 | Opening | 46 s |
| 1-1.mp3 | Meetfouten | 77 s |
| 2-2.mp3 | Betrouwbaar en valide | 124 s |
| 3-3.mp3 | Van resultaat naar conclusie | 100 s |
| 4-4.mp3 | Samen of oorzaak? | 125 s |
| 5-5.mp3 | Eerlijk onderzoek | 97 s |
| 6-6.mp3 | Afsluiting | 50 s |

## Aanpassen

Tekst wijzigen in `script.md`, dan `python3 podcasts/maak_segmenten.py podcasts/cellen/onderzoek-2` (bewaart generation-ids van ongewijzigde segmenten), alleen gewijzigde segmenten opnieuw inspreken (Remko, eleven_v4, één take), ruwe takes als `<segment-id>.mp3` in een werkmap, dan `python3 podcasts/bouw.py podcasts/cellen/onderzoek-2 <werkmap>`. Ontbrekende ruwe takes ophalen via `creative_get_generations` met de generation-ids uit `segmenten.json`.

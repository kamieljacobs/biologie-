# Podcast Bevruchting 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `bevruchting` in `podcasts/afleveringen.json`, 7 hoofdstukken in `audio/` (0-0 … 6-5) |
| Bij film | `films/voortplanting/bevruchting/` (zelfde leerdoelen en feiten; bronnen in de bronmap van de film) |
| Niveau | havo + vwo; hoofdstuk 3b (`4-3b.mp3`) alleen vwo, speler slaat het over in de havo-stand |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 (spreekstijl, begripsblok) |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 7.850 credits |
| Duur | vwo 9:09 · havo 7:53 (inclusief denkstiltes en muziek) |
| Audio | per hoofdstuk: intromuziek (hfst 0) of overgangsmuziek, segmenten met stilte (3 of 4 s) na elke denkvraag (geen piepje), gebouwd met `podcasts/bouw.py`, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s |

## Aanpassen

Tekst wijzigen in `script.md` én `segmenten.json` (veld `tekst`, en `stem` voor de stem-invoer), alleen dat segment opnieuw inspreken (Remko, eleven_v4, één take), ruwe take als `<id>.mp3` in een werkmap, dan het hoofdstuk opnieuw samenstellen (zelfde opbouw als hierboven; script stond in de chat van 20 nov 2026: per hoofdstuk toon + 0,6 s, segmenten, stilte + toon + 0,4 s na een denkvraag, 1,2 s staart, loudnorm) en `duur` in `afleveringen.json` bijwerken.

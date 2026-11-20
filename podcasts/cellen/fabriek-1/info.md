# Podcast De fabriek: bouwtekening en werkvloer 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `fabriek-1` (aflevering 2 van thema Cellen, `podcasts/cellen/PLAN.md`), 6 hoofdstukken in `audio/` (0-0 … 5-4) |
| Bij film | `films/cellen/celorganellen/` H1–H3 (zelfde leerdoelen en feiten; bronnen in de bronmap van de film) |
| Niveau | havo + vwo; hoofdstuk 3b (`4-3b.mp3`, één enzym gevolgd, adreslabel, exo- en endocytose) alleen vwo |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 (spreekstijl, begripsblok) |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 7.740 credits |
| Duur | vwo 8:48 · havo 7:12 (inclusief denkstiltes en muziek) |
| Audio | intromuziek (hfst 0) of overgangsmuziek, segmenten met stilte (3 of 4 s) na elke denkvraag, gebouwd met `podcasts/bouw.py`, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s |

## Aanpassen

Tekst wijzigen in `script.md`, `python3 podcasts/maak_segmenten.py podcasts/cellen/fabriek-1` (bestaande generation-ids blijven staan als de tekst gelijk blijft), alleen de gewijzigde segmenten opnieuw inspreken (Remko, eleven_v4, één take), ruwe takes als `<segment-id>.mp3` in een werkmap, dan `python3 podcasts/bouw.py podcasts/cellen/fabriek-1 <werkmap>` en `duur` in `podcasts/afleveringen.json` bijwerken.

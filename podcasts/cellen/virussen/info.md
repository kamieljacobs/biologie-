# Podcast Virussen, en wie leeft waarvan? 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `virussen` (nog toe te voegen aan `podcasts/afleveringen.json`), 5 hoofdstukken in `audio/` (0-0 … 4-4) |
| Bij film | `films/cellen/microben.html`, hoofdstuk 4–5 (zelfde feiten; bronnen in `films/cellen/microben/bron/bronnen.md`) |
| Niveau | havo 4 (één niveau, zoals de film); geen vwo-hoofdstuk |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` (spreekstijl, begripsblok), werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; 5.501 credits |
| Duur | 6:15 (inclusief denkstiltes en muziek) |
| Audio | per hoofdstuk: intromuziek (hfst 0) of overgangsmuziek, segmenten met stilte (3 of 4 s) na elke denkvraag, gebouwd met `podcasts/bouw.py`, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s; ruwe takes in `/home/claude/podcast-ruw/virussen/` (buiten de repo) |
| Volgt op | aflevering `boterham` (film hoofdstuk 1–3); begint met een terugblik van ± 20 s |

## Aanpassen

Tekst wijzigen in `script.md`, `python3 podcasts/maak_segmenten.py podcasts/cellen/virussen` (bewaart generation-ids van ongewijzigde segmenten), alleen het gewijzigde segment opnieuw inspreken (Remko, eleven_v4, één take), take als `<segment-id>.mp3` in de map met ruwe takes, dan `python3 podcasts/bouw.py podcasts/cellen/virussen <map met ruwe takes>` en de duur in `afleveringen.json` bijwerken.

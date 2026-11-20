# Podcast Wat groeit er op je boterham? 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `boterham` (nog toe te voegen aan `podcasts/afleveringen.json`), 5 hoofdstukken in `audio/` (0-0 … 4-4) |
| Bij film | `films/cellen/microben.html`, hoofdstuk 1–3 (zelfde feiten; bronnen in `films/cellen/microben/bron/bronnen.md`) |
| Niveau | havo 4 (één niveau, zoals de film); geen vwo-hoofdstuk |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` (spreekstijl, begripsblok), werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; 6.209 credits |
| Duur | 6:57 (inclusief denkstiltes en muziek) |
| Audio | per hoofdstuk: intromuziek (hfst 0) of overgangsmuziek, segmenten met stilte (3 of 4 s) na elke denkvraag, gebouwd met `podcasts/bouw.py`, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s; ruwe takes in `/home/claude/podcast-ruw/boterham/` (buiten de repo) |
| Volgt | aflevering `virussen` (film hoofdstuk 4–5) |

## Aanpassen

Tekst wijzigen in `script.md`, `python3 podcasts/maak_segmenten.py podcasts/cellen/boterham` (bewaart generation-ids van ongewijzigde segmenten), alleen het gewijzigde segment opnieuw inspreken (Remko, eleven_v4, één take), take als `<segment-id>.mp3` in de map met ruwe takes, dan `python3 podcasts/bouw.py podcasts/cellen/boterham <map met ruwe takes>` en de duur in `afleveringen.json` bijwerken.

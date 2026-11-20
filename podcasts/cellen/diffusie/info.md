# Podcast Alles beweegt: diffusie 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `diffusie` (aflevering 6 van `podcasts/cellen/PLAN.md`), 5 hoofdstukken in `audio/` (0-0 … 4-4) |
| Bij film | `films/cellen/diffusie-osmose/` hoofdstuk 1–3 (bronnen: `bron/bronnen.md`, beweringen 1–7) |
| Niveau | havo + vwo (geen vwo-hoofdstuk; de vwo-blokken van de film zitten in `osmose`) |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 (spreekstijl, begripsblok) |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; 5.818 credits |
| Duur | 6:28 (havo = vwo) inclusief denkstiltes en muziek |
| Audio | gebouwd met `python3 podcasts/bouw.py podcasts/cellen/diffusie <ruwe takes>`: intro (hfst 0) of overgang, stilte 3/4 s na denkvragen, loudnorm −16 LUFS, mono 64 kbit/s. Ruwe takes buiten de repo (`/home/claude/podcast-ruw/diffusie/`) |

## Afwijkingen van de film

- Longblaasjes 'samen minstens zo groot als een badmintonveld' (film: 'ongeveer zo groot als'): volgt het voorstel in `bron/bronnen.md` bij bewering 7 (70–130 m²; badmintonveld ≈ 82 m² is eerder een ondergrens).
- Nieuwe alledaagse voorbeelden: parfum door een kamer, theezakje in heet/koud water, 'vier knoppen' voor de factoren, 'welke knop gebruiken je longen niet' (temperatuur, lichaamstemperatuur constant).

## Aanpassen

Tekst wijzigen in `script.md`, dan `python3 podcasts/maak_segmenten.py podcasts/cellen/diffusie` (bewaart de generation-ids van ongewijzigde segmenten), alleen gewijzigde segmenten opnieuw inspreken (Remko, eleven_v4, één take) als `<id>.mp3` in de map met ruwe takes, dan `bouw.py` en `duur` in `afleveringen.json` bijwerken.

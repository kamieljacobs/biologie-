# Podcast Herhaalaflevering Cellen 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `herhaal` (nr. 11 in `podcasts/cellen/PLAN.md`), 9 hoofdstukken in `audio/` (0-0 … 8-8) |
| Bij films | alle zes films van thema Cellen (antwoorden uit recaps, eindkaarten en vwo-blokken; zie Controle onderaan `script.md`) |
| Niveau | havo + vwo; hoofdstuk 7 (`7-7.mp3`, vijf extra vragen) alleen vwo, speler slaat het over in de havo-stand |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1; vorm: vraag → 5 s stilte → kort antwoord + één zin waarom |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment (40 segmenten); flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 5.500 credits |
| Duur | vwo 9:08 · havo 7:44 (inclusief denkstiltes en muziek) |
| Audio | per hoofdstuk: intromuziek (hfst 0) of overgangsmuziek, segmenten met 5 s stilte na elke vraag (geen piepje), gebouwd met `podcasts/bouw.py`, loudnorm −16 LUFS / −1,5 dBTP, mono 64 kbit/s |

## Aanpassen

Tekst wijzigen in `script.md`, dan `python3 podcasts/maak_segmenten.py podcasts/cellen/herhaal` (bewaart generation-ids van ongewijzigde segmenten), alleen gewijzigde segmenten opnieuw inspreken (Remko, eleven_v4, één take), ruwe takes als `<segment-id>.mp3` in een werkmap, dan `python3 podcasts/bouw.py podcasts/cellen/herhaal <werkmap>` en `duur` in `afleveringen.json` bijwerken. Let op: `emergénte` in h7-1 is met de hand in `stem` gezet (de regel stond op dat moment niet in `maak_segmenten.py`); na opnieuw draaien van `maak_segmenten.py` controleren.

# Podcast Wat is leven? 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `wat-is-leven`, 7 hoofdstukken in `audio/` (0-0 … 6-5) |
| Bij film | `films/cellen/van-molecuul-tot-biosfeer.html` (bron: `films/cellen/van-molecuul-tot-biosfeer/bron/`); zelfde leerdoelen en feiten |
| Niveau | havo + vwo; hoofdstuk 3b (`4-3b.mp3`, emergente eigenschappen) alleen vwo |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1, werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 7.565 credits |
| Duur | vwo 8:49 · havo 7:59 (inclusief denkstiltes en muziek) |
| Audio | gebouwd met `podcasts/bouw.py` (intro/overgang, stilte na denkvragen, loudnorm −16 LUFS, mono 64 kbit/s); ruwe takes buiten de repo (`/home/claude/podcast-ruw/wat-is-leven/`) |

## Opbouw

0 Opening (griepvirus op de deurklink) · 1 Wat is leven? (levenskenmerken, homeostase, cel = kleinste niveau) · 2 De ladder: molecuul → organisme (differentiatie, weefsel) · 3 Boven het organisme (populatie, levensgemeenschap, ecosysteem, abiotische factoren, biosfeer) · 3b vwo: emergente eigenschappen · 4 Leeft een virus? · 5 Afsluiting.

## Aanpassen

Tekst in `script.md` wijzigen, `python3 podcasts/maak_segmenten.py podcasts/cellen/wat-is-leven` (bewaart generation-ids van ongewijzigde segmenten), alleen gewijzigde segmenten opnieuw inspreken, `python3 podcasts/bouw.py …`, duur in `afleveringen.json` bijwerken.

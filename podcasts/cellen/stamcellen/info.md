# Podcast Stamcellen 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `stamcellen`, 7 hoofdstukken in `audio/` (0-0 … 6-4) |
| Bij film | `films/cellen/stamcellen.html` (bron: `films/cellen/stamcellen/bron/`); zelfde leerdoelen en feiten |
| Niveau | havo + vwo; hoofdstukken 1b (`2-1b.mp3`, promotor/transcriptiefactoren/epigenetica) en 3b (`5-3b.mp3`, toti- tot unipotent, Yamanaka/iPS) alleen vwo, zoals de vwo-blokken s09 en s20 van de film |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1, werkbrief `podcasts/cellen/BRIEF.md` |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 9.690 credits |
| Duur | vwo 10:28 · havo 8:10 (inclusief denkstiltes en muziek) |
| Audio | gebouwd met `podcasts/bouw.py`; ruwe takes buiten de repo (`/home/claude/podcast-ruw/stamcellen/`) |

## Opbouw

0 Opening (schaafwond vs hartinfarct) · 1 Zelfde DNA, andere cel (differentiatie, kookboek) · 1b vwo: wie zet een gen aan? (promotor, transcriptiefactoren, histonen, methylgroep, epigenetica) · 2 Cellen die nog kunnen kiezen (stamcel, kiemlaag, beenmerg, darm, volwassen vs embryonale stamcel) · 3 Stamcellen als medicijn (beenmergtransplantatie, geïnduceerde stamcel, kloppende hartspiercellen = emergent, ethiek: biologisch vs ethisch argument) · 3b vwo: toti-, pluri-, multi-, unipotent; Yamanaka, iPS-cel, Gurdon · 4 Afsluiting.

## Aanpassen

Tekst in `script.md` wijzigen, `python3 podcasts/maak_segmenten.py podcasts/cellen/stamcellen` en daarna de handmatige vervangingen uit `uitspraak.md` opnieuw doen, alleen gewijzigde segmenten opnieuw inspreken, `python3 podcasts/bouw.py …`, duur in `afleveringen.json` bijwerken.

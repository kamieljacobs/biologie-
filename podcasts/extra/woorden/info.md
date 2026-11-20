# Podcast Woorden uit blokjes 1.0

| Veld | Waarde |
|---|---|
| Aflevering | `woorden` (losse aflevering, geen film), 6 hoofdstukken in `audio/` (0-0 … 5-5) |
| Aanleiding | Kamiel 20 nov 2026: 'een losse podcast die ingaat op de herkomst van begrippen, zoals cytoplasma: cyto en plasma' |
| Niveau | havo + vwo (geen vwo-hoofdstuk); begrippen uit Cellen, Voortplanting, Erfelijkheid, Stofwisseling, Afweer |
| Datum | 20 nov 2026 |
| Concept | `podcasts/PODCASTS.md` v1 |
| Stem / model | Remko `vjeU1L5RIGPyrwuboFwz`, eleven_v4, één take per segment; flow https://elevenlabs.io/app/flows/cOEno8gxse8pGyFvDe22; generation-ids in `segmenten.json`; ± 7.100 credits |
| Duur | 8:40 inclusief denkstiltes en muziek |
| Op de site | `podcasts/afleveringen.json`, id `woorden`, thema 'Biologische taal' (`themaId: woorden`, hoort bij geen themapagina) |
| Luistertest | artifact 'Luistertest podcast Woorden uit blokjes' (https://claude.ai/artifact/91Na1hP9YnWY8VzeUpuNA2) |
| Bronnen | `bronnen.md` |

## Aanpassen

Tekst wijzigen in `script.md`, dan `python3 podcasts/maak_segmenten.py podcasts/extra/woorden` en de handmatige stem-invoer uit `uitspraak.md` opnieuw toepassen op de gewijzigde segmenten; alleen die segmenten opnieuw inspreken als `<id>.mp3` in de map met ruwe takes (`/home/claude/podcast-ruw/woorden/`, buiten de repo), dan `bouw.py` en de `duur` in `afleveringen.json` bijwerken.

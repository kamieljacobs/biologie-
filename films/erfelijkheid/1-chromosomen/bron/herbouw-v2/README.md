# Herbouw Chromosomen in de FILMDATA-straat — werkbestanden fase 1 (25 okt 2026)

Fase 1 is klaar; fase 2 (scènes bouwen, film vervangen) start pas na Kamiels keuring van `../keuring-fase1/`.

| Bestand | Wat |
|---|---|
| `../script_v2.md` | definitief script (de stem is hierop ingesproken; niet meer wijzigen zonder opnieuw in te spreken) |
| `segments.json` | uit het script met `make_segments.py` (straat-engine van Evolutie 8, `films/evolutie/8-stambomen-lezen/bron/bouw/`), met `uitspraak_subs.json` = `films/uitspraak.json` van 25 okt |
| `uitspraak_film.json` | film-eigen stem-invoer: X/Y-chromosoom → iks/ei, n/2n → en/twee-en, A/a/AA/Aa/aa → grote A / kleine a |
| `audio/sNN.mp3` | 37 takes, Roos (`7qdUFMklKPaaAVMsBTBt`), eleven_v4, één take per alinea, onbewerkt zoals gedownload |
| `words/sNN.json` | woordtijden met `silalign.py` (lokaal, geen credits); in fase 2 steekproefsgewijs nalopen (B8) |
| `stem/sessions.json`, `stem/gen.json` | ElevenLabs-flow `oAnn8B6fDC6LBw9fFw28`, per alinea sessie, generatie en credits; duur per take |
| `stem/blind.md` | blinde transcriptie (B5): alle risicowoorden goed teruggekomen |

Fase 2 opzetten: werkmap `hw/chr1` met deze bestanden (`audio/` ook als `raw/`), engine uit `films/evolutie/8-stambomen-lezen/bron/bouw` + `src`, daarna `film.py`, `sections.html`, `teken_chr1.js`, `scenes_chr1.js` volgens `films/vervolg/BOUWEN.md`. Neem de goedgekeurde tekeningen uit `bibliotheek/lib_bio.js` (huidDoorsnede, kernChromatine, chromatideX, nucleosoomDraad, onderarm), `lib_micro_evo.js` (dnaDraad) en het gezin De Wit uit `personages/lib_cast.js`; het karyogram en de tyrosinase-simulatie kunnen uit de oude film mee (zie `../info.md`, Techniek).

Credits fase 1: stem 6.776, blinde transcriptie 3.022,8 (de schatting vooraf gaf ± 204; Scribe kost ± 5,5 credits per seconde audio, dus voortaan alleen de alinea's met risicowoorden transcriberen, of eerst één korte alinea als proef).

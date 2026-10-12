# Alles is cel — werkstatus

Film 1 van de reeks Kerndoelen onderbouw (kerndoel 32A, eerste bullet). Gemaakt met prompt v5 + Part D.

**Stand 12 oktober 2026: film 1.0 staat op de site** (`../index.html`). Script, uitspraak en stijlframes goedgekeurd; keukenframe na vijf versies vlak in de stijl van de andere films. Zie `info.md` voor bouw en aanpassen.
Checkpointpagina: https://claude.ai/artifact/Qmriu6MBGVCAZ9BVy6m4sV

- `script_v2.md` — script na drie reviews (`reviews/`); `script_v1.md` de versie ervoor.
- `stem/uitspraaktest.mp3` — uitspraaktest (Roos, eleven_v4, voice_id 7qdUFMklKPaaAVMsBTBt); goedgekeurd door Kamiel (12-10): "dertigduizend" als stem-invoer "dertig-duizend" (nr. 2); "vacuole" (nr. 3), cytoplasma (nr. 6), celmembraan (nr. 9) en de binnenband-zin goed. Meervoud "vacuolen" niet goedgekeurd: gesproken tekst gebruikt alleen enkelvoud.
- `stem/segmenten_stem-invoer.json` — segmenten uit `bouw/make_segments.py` (witregel = nieuwe take).
- `stijlframes/` en `bouw/frames.html` — vijf stijlframes, getekend met de bibliotheek van Celorganellen (`films/cellen/celorganellen/bron/src/lib.js`).

Volgende stap na akkoord: opnemen per take, woordtijden, scènes in `src/scenes.js` op basis van de bouwstraat van Celorganellen (zie die `bron/info.md`), speler met Basis/Havo-vwo, publiceren als `films/onderbouw/32a/1-alles-is-cel/index.html`, onderbouw-niveau en hoofdstuk 32A op de homepage, bronmap aanvullen (info.md, script.md).

# Verbeterronde 1 van de beeldbank (27 okt 2026)

Kamiel: "doe al je voorstellen maar gewoon", met oude versies bewaard (`../oud/2026-10-27/`), blinde beoordelaars en zijn eigen laatste oordeel.

- Per groep een map, per object: `A.js`, `B.js`, `C.js` (volledige functies, klaar om in `lib_bio.js` / `dieren/lib_*.js` te plakken),
  `recept.md`, `bron.md` (zelf geopende bronnen), `kenmerken.json` (voor het patroonlogboek), `sleutel.json` (welke still X/Y/Z welke versie was).
- `OORDEEL.json` = blinde beoordelaar ronde 1 (oud/A/B als X/Y/Z), `OORDEEL3.json` = laatste ronde (winnaar tegen C, sleutel in de objectmap van ronde 3:
  zie `keuringsblad/data.json`, velden `blind1`/`blind3`, al vertaald naar oud/A/B/C).
- `OVERZICHT.md` per groep: aanpak per variant en wat bewust niet gedaan is.
- `keuringsblad/` = de pagina waarop Kamiel kiest (artifact 'Beeldbank: jouw keuze', https://claude.ai/artifact/JUWrqazjNRJQPvN5RWHVhD, db-collecties `keuze` (doc-id = `<groep>__<obj>`, velden `keuze` oud|A|B|C|geen, `opmerking`) en `vragen`).
- `referentie/` = ElevenLabs-referentieplaten (cel, hart, nefron, bloem).
- Briefs: `MAKER.md`, `BLIND.md`, `KENMERKEN.md`; scripts `prep3.py` (ronde 3 klaarzetten) en `bouwblad.py` (data keuringsblad).

Na Kamiels keuze: per object de gekozen versie in de bibliotheek plakken (gedeelde hulpjes zoals `_grKluwen` één keer), README-tabel en testvel bijwerken,
een regel per object in `../logboek/keuzes.jsonl` en `python3 scripts/beeldpatronen.py` draaien.

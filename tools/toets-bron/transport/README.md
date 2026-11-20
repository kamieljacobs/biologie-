# Oefentoets Transport (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`).

- Uitvoer: `tools/toets-transport-havo.html` (8 opgaven, 21 vragen, 37 punten) en `tools/toets-transport-vwo.html` (7 opgaven, 19 vragen, 35 punten). localStorage `toets-transport-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `tr-havo` / `tr-vwo`. Terug-link naar `index.html#transport`. Cijfer = 9 × score / maximum + 1.
- Inhoud = de Word-oefentoetsen in `kamieljacobs/toetsen-biologie`: `toetsen/2026-2027/5havo/5havo_transport_oefentoets_matrijs.md` (havo) en `6vwo/6vwo_transport_oefentoets_matrijs.md` (vwo), tekst, sleutels en correctievoorschrift uit `eigen/transport.json`. Zelfde opgaven, volgorde, contexten, vraagteksten en punten. Geen vragen uit de echte toets (G, H, I, W*).
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). `00-basis.js`: `vraag`, `opgave` (lege inleiding = kennisopgave zonder context), `F` (films, hrefs uit `HOOFDSTUKKEN.transport.films`), `UITSPRAKEN`, nieuwe antwoordbouwstenen `rekenAnswer` (goed = alle punten, anders deelpunten zelf afvinken, hooguit punten − 1), `tabelAnswer` (tabel met keuzelijsten, alles goed 2p, één fout 1p) en `koppelAnswer` (begrippen 1–5 aan A–F, via `selectAnswer`), en de figuren `CIRC` (schema bloedsomloop), `DRUK` (drukverloop, vereenvoudigd) en `FIETS` (afbeelding 1 van de wielrenner, waarden als `eigen/figuren/transport/maak.py`), alles in huisstijlvariabelen.
- Bouwen: `python3 tools/toets-bron/transport/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, vier hulpstanden, geen klok).
- Testen: `test.py` en `speel.py` (schermafdrukken in `/tmp/toets-transport-shots`). 20 nov 2026: geen fouten, punten 37/35, geen horizontaal scrollen op 375 px; licht en donker bekeken.

## Opbouw

| opgave | havo | vwo |
|---|---|---|
| Het hart en de bloedsomloop | KH05, KH06, KH10 | KH05, KH06, KH07, KH09, KH10 |
| Bloedvaten en bloeddruk | KV02, KV03, KV04 | — |
| Het bloed | KB02, KB07 | KB06, KB07 |
| Een half jaar in de ruimte | D01, D02, D05 | D01, D02, D04 |
| Weefselvloeistof en lymfe | KL05 | KL05 |
| Olifantsbenen door wormen | E01–E04 | E01–E04 |
| Het hart onder controle | KR02 | KR02 |
| Het hart van een wielrenner | F01–F04 | F02, F03, F05 |

## Aanpassingen aan de vorm (niet aan de inhoud)
- 'Neem de tabel over en vul …' (KH10) → 'Vul bij elk bloedvat in …' (keuzelijsten in de tool); 'Noteer de nummers en schrijf erachter of de uitspraak juist of onjuist is' → 'Geef bij elke uitspraak aan of hij juist of onjuist is'.
- Kennisopgaven zonder inleiding tonen 'Bij deze opgave hoort geen inleiding.'
- Valkuilen bij de open vragen zijn deels eigen formuleringen naast de ondergrenzen uit het correctievoorschrift.

Status: concept, wacht op Kamiels oordeel.

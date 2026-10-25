# Verbeterbladen — stand van zaken

Werkwijze (Kamiel 24 okt 2026): een film die feedback krijgt, wordt in dezelfde ronde ook opgewaardeerd naar de nieuwste prompt. Eerst een verbeterblad met voorstellen (jouw review + prompt), Kamiel kiest per voorstel Doen / Niet / Anders, daarna alles in één ronde bouwen. Daarna `| Prompt | vN |` en 'Voldoet aan: prompt vN' in `bron/info.md`.

- `BRIEF.md` = de brief voor een helper die een verbeterblad maakt (per film een `voorstellen.json` + stills).
- `sjabloon.html` = de pagina; vervang `__DATA__` door een lijst films `{film, titel, kort, sleutel, promptversie_nu, advies, herinspreken, voorstellen[]}`, met per voorstel `img` als data-URI (of null). Publiceren als artifact met `capabilities: {db: {}}`; besluiten in collectie `besluit`, doc-id `<sleutel>__<voorstel-id>`, velden `{film, voorstel, besluit: 'doen'|'niet'|'anders'|null, opmerking, tijd}`.

## Ronde 24 okt 2026: Chromosomen + Signalen in de cel

Status: **Kamiel akkoord met alle voorstellen** (25 okt 2026, 'de voorstellen voor de verbeteringen zijn goed'). Signalen: herstel loopt. Chromosomen: fase 1 (script v2, stem, nieuwe tekeningen + gezin op het testvel/castboek ter keuring, C10.4–5); na Kamiels keuring fase 2 (scènes bouwen).

- Verbeterblad (artifact van het account dat deze ronde deed): https://claude.ai/artifact/QtpXDphCAUXtRa76nXWT98 — vanuit het andere account niet te openen; publiceer dan opnieuw uit de bestanden hieronder.
- Voorstellen, stills en Kamiels reviewopmerkingen per film:
  - `films/erfelijkheid/1-chromosomen/bron/verbeterblad-2026-10-24/` — advies **herbouwen** in de FILMDATA-straat (12 voorstellen; 1–1,5 werkdag, ±6.500 credits). Open vraag voor Kamiel: nieuw gezin met een kind met albinisme in het castboek (chr-1/chr-2).
  - `films/vervolg/biomedisch-1-signalen-in-de-cel/bron/verbeterblad-2026-10-24/` — advies **klein herstel** (9 voorstellen; halve dag, ±2.000–2.400 credits; s04, s05, s13 opnieuw inspreken).
- Uitspraaktest is al gedaan en verwerkt (`films/UITSPRAAK.md`, sectie 24 okt): gewone spelling voor DNA, ATP, zesenveertig, allel, genotype, Post voor iedereen; haploïd = haaploïd.
- De Firebase-opmerkingen van Kamiel bij beide films: na het bouwen de ids in `verwerkt` van `films/review-claude.json` zetten en in het foutenlogboek.
- Prompt v10 staat sinds 25 okt in de repo (`films/PROMPT_v10.md` + `films/PROMPT_v10_C10_tekenkwaliteit.md`); de voorstellen zijn gemaakt vóór die tekst er was. Loop ze er vóór het bouwen nog één keer tegen na.
- Nieuwe afspraak (25 okt): een film die je aanpakt krijgt in dezelfde ronde ook `bron/bronnen.md` (zie `films/BRONNEN.md`). Dat zit nog niet in deze voorstellen: neem het mee bij het bouwen.

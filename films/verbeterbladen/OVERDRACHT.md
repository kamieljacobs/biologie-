# Verbeterbladen — stand van zaken

Werkwijze (Kamiel 24 okt 2026): een film die feedback krijgt, wordt in dezelfde ronde ook opgewaardeerd naar de nieuwste prompt. Eerst een verbeterblad met voorstellen (jouw review + prompt), Kamiel kiest per voorstel Doen / Niet / Anders, daarna alles in één ronde bouwen. Daarna `| Prompt | vN |` en 'Voldoet aan: prompt vN' in `bron/info.md`.

- `BRIEF.md` = de brief voor een helper die een verbeterblad maakt (per film een `voorstellen.json` + stills).
- `sjabloon.html` = de pagina; vervang `__DATA__` door een lijst films `{film, titel, kort, sleutel, promptversie_nu, advies, herinspreken, voorstellen[]}`, met per voorstel `img` als data-URI (of null). Publiceren als artifact met `capabilities: {db: {}}`; besluiten in collectie `besluit`, doc-id `<sleutel>__<voorstel-id>`, velden `{film, voorstel, besluit: 'doen'|'niet'|'anders'|null, opmerking, tijd}`.

## Ronde 24 okt 2026: Chromosomen + Signalen in de cel

Status: **Kamiel akkoord met alle voorstellen** (25 okt 2026, 'de voorstellen voor de verbeteringen zijn goed'). Signalen: **herstel klaar (25 okt 2026, versie 1.1, prompt v10)**: sig-1 t/m sig-9 uitgevoerd, s04/s05/s12/s13 opnieuw ingesproken (2.448 credits) + blinde transcriptie (874 credits, foutloos), `bron/bronnen.md` (29 beweringen: 18 ✓, 10 ≈, 0 !, 1 ?), REVIEW = nog bekijken; Kamiel bekijkt (met Vragen uit) 0:06–0:15, 1:00, 1:24 en 1:43–1:50, 2:57–3:10, 3:23–3:32, 4:13–4:25. Chromosomen: **versie 2.0 op de site (25 okt 2026, prompt v10)**. Fase 1 (script v2, stem, bronnen, nieuwe tekeningen, gezin De Wit) gekeurd door Kamiel (keuringsblad https://claude.ai/artifact/1m98a1QDY2BsHxY24c6Q5D; uitslag in `bron/keuring-fase1/index.md`): alle 5 tekeningen goed (recepten in `bibliotheek/lib_bio.js` nu 'gekeurd', registratie in `bibliotheek/lessen_chromosomen.md`), gezin variant A staand, Levi in de zon zonder rood, s30 en s35 opnieuw ingesproken (fenotype-zin, 'gewoon pigment'), geen extra vragen. Fase 2: alle scènes gebouwd in de FILMDATA-straat (eigen engine-kopie in `bron/src/` + `bron/bouw/`, zie `bron/info.md`), oude film in `bron/oud/`. Credits fase 2: 315 + 213 stem + 213 Scribe = 741 (totaal met fase 1 ±10.540). **Versie 2.1 (25 okt 2026):** frisse beeldreview (`bron/review_fris_2026-10-25.md`, 9 MOET, 16 KAN) verwerkt: alle MOET-punten hersteld, 10 kleine KAN-punten meegenomen (zie `bron/info.md`); MOET 5 (eicel bij de eisprong nog twee chromatiden) na Kamiels keuze 'eicel nuanceren' opgelost met een nieuwe take van s15 (231 + 81 credits, blind foutloos) en B20/B21 in `bron/bronnen.md`. REVIEW = nog bekijken. Let op: Scribe-schatting (`estimate_only`) gaf 204 credits, de echte transcriptie van 9 min kostte 3.023: transcribeer alleen alinea's met risicowoorden.

- Verbeterblad (artifact van het account dat deze ronde deed): https://claude.ai/artifact/QtpXDphCAUXtRa76nXWT98 — vanuit het andere account niet te openen; publiceer dan opnieuw uit de bestanden hieronder.
- Voorstellen, stills en Kamiels reviewopmerkingen per film:
  - `films/erfelijkheid/1-chromosomen/bron/verbeterblad-2026-10-24/` — advies **herbouwen** in de FILMDATA-straat (12 voorstellen; 1–1,5 werkdag, ±6.500 credits). Open vraag voor Kamiel: nieuw gezin met een kind met albinisme in het castboek (chr-1/chr-2).
  - `films/vervolg/biomedisch-1-signalen-in-de-cel/bron/verbeterblad-2026-10-24/` — advies **klein herstel** (9 voorstellen; halve dag, ±2.000–2.400 credits; s04, s05, s13 opnieuw inspreken). **Uitgevoerd 25 okt** (zie `bron/info.md`, 'Wijzigingen 1.1'). Twee voorstellen voor het docentdeel staan in `bron/bronnen.md` onder Aanpassingen. Let op: werk niet in de gedeelde `hw/engine` (die werd tijdens deze ronde door een andere film overschreven); gebruik per film een eigen engine-map.
- Uitspraaktest is al gedaan en verwerkt (`films/UITSPRAAK.md`, sectie 24 okt): gewone spelling voor DNA, ATP, zesenveertig, allel, genotype, Post voor iedereen; haploïd = haaploïd.
- De Firebase-opmerkingen van Kamiel bij beide films: na het bouwen de ids in `verwerkt` van `films/review-claude.json` zetten en in het foutenlogboek.
- Prompt v10 staat sinds 25 okt in de repo (`films/PROMPT_v10.md` + `films/PROMPT_v10_C10_tekenkwaliteit.md`); de voorstellen zijn gemaakt vóór die tekst er was. Loop ze er vóór het bouwen nog één keer tegen na.
- Nieuwe afspraak (25 okt): een film die je aanpakt krijgt in dezelfde ronde ook `bron/bronnen.md` (zie `films/BRONNEN.md`). Dat zit nog niet in deze voorstellen: neem het mee bij het bouwen.

## Ronde 25 okt 2026: lichte remakes DNA 1, DNA 2, Celdeling, Geslachtsorganen en puberteit (prompt v10 B16)

- Fase 1 (script, storyboard, keyframes, twijfelscènes, bronnenlogboek) per film in `<film>/bron/remake-2026-10/`.
- Keuringsblad: https://claude.ai/artifact/JwKTLH9kpf8c19geEiqNgV (db-collectie `besluit`, doc-id `<sleutel>__<id>`, sleutels dna1/dna2/celdeling/geslacht; besluit doen = voorstel, niet = alternatief, anders = opmerking). Opnieuw bouwen: `python3 films/verbeterbladen/remake-2026-10/bouw_blad.py` (sjabloon `sjabloon_remake.html`).
- Reeksbesluiten die DNA 3–8 raken: basevorm (dna1__t2) en Noor als leerling in DNA 1 en 2.
- Daarna fase 2: stem (± 26.400 credits samen), bouwen in de FILMDATA-straat, frisse beeldreview, oude film naar `bron/oud/`, REVIEW op nog bekijken.
- **Af en online (26 okt 2026, nacht):** Wat is DNA? 3.0, DNA kopiëren 2.0, Geslachtsorganen en puberteit 2.0, Celdeling 2.0, alle vier prompt v10, met frisse beeldreview (`bron/review_fris_2026-10-26.md`) en alle MOET-punten hersteld; oude versies in `bron/oud/`. Credits stem ± 6.200 + 6.600 + 7.100 + 10.000, transcriptie ± 2.000. Open voor Kamiel: zijn review in de reviewstand; DNA 2 'spiegelbeeld' en RNA-kleur (info.md); uitspraakwachtlijst (plasmiden, cohesine, oöcyt). Zijtak `remake-2026-10-wip` kan weg (verwijderen lukte niet vanuit de sessie).
- Lessen uit deze ronde: na een herbouw `scripts/oefenen.py` draaien (scripttag viel weg); cues met woordgrens of woordtijd (q.at matcht deelwoorden); 'gemist bij contactblad' is het grootste patroon.

## Ronde 26 okt 2026: nieuwe film Zenuwstelsel 9 Spieren en beweging (prompt v10, B15)

- Fase 1 in `films/zenuwstelsel/9-spieren-en-beweging/bron/fase1/` (script v3, storyboard, keyframes, twijfel.md, uitspraak.md), bronnenlogboek `bron/bronnen.md`, B15-werk en reviews in `bron/werk/`.
- Keuringsblad (alleen twijfelscènes): https://claude.ai/artifact/Q2bq5R2XhPoAB7fPv8HmAV (db-collectie `besluit`, doc-id `spieren__<id>`, ids t1–t10 en script; doen = voorstel, niet = alternatief, anders = opmerking). Opnieuw bouwen: `python3 films/verbeterbladen/spieren-2026-10/bouw_blad.py`.
- Daarna fase 2 (zie `bron/STAND.md`); `jaarplanner-dekking.json` pas als laatste stap, na `git pull`.

## Ronde 28 okt 2026: Erfelijkheid (Kamiels review van de hele reeks)

- Opmerkingen: 35 in de reviewstand (`films/verbeterbladen/erfelijkheid-2026-10/opmerkingen.json`; film 1: 14 al verwerkt in 2.0/2.1). Uitspraaktest 28 okt verwerkt (allel gewoon, ga-MEET, I-A/I-B/i; zie `films/UITSPRAAK.md`).
- Film 1 Chromosomen: **gerichte ronde, versie 2.2 online** (s26 en s34 opnieuw, nuance recessief allel). REVIEW: opnieuw bekijken.
- Films 2–6: Kamiel koos **lichte remake**. Fase 1 klaar per film in `<film>/bron/remake-2026-10/` (brief: `erfelijkheid-2026-10/BRIEF.md`; werkmappen `/home/claude/hw/erf2..erf6/`, buiten de repo).
- Keuringsblad: https://claude.ai/artifact/V2v9wu53hawnx695KFQWg2 (db-collectie `besluit`, doc-id `<sleutel>__<id>`, sleutels erf2–erf6; doen = voorstel, niet = alternatief, anders = opmerking). Opnieuw bouwen: `python3 films/verbeterbladen/erfelijkheid-2026-10/bouw_blad.py`.
- Daarna fase 2: stem ± 24.200 credits samen (erf2 4.200, erf3 4.900, erf4 5.600, erf5 5.000, erf6 4.500), bouwen in de FILMDATA-straat (engine van Chromosomen 2.2), frisse beeldreview, oude film naar `bron/oud/`, datum = dag van de remake, REVIEW nog bekijken, de 33 opmerkingen-ids in `films/review-claude.json` → `verwerkt`.
- Reeksafspraken uit fase 1: kruisingsschema vader/stuifmeel boven (teal), moeder/eicellen links (oker), zoals film 1; notatie A/a (X: Xᴬ/Xᵃ); gezin De Wit terug in film 2, 3 en 5 (ter keuring); geen namen in de stem.
- Les: geen `git stash -u` terwijl helpers in de repo schrijven (het script van film 3 verdween even).

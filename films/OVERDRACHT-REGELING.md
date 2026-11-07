# Overdracht: opwaardering Regeling + beeldbank (nacht 28–29 okt 2026)

Lees dit in een nieuwe chat om verder te gaan. Brief van de nacht: `films/OPWAARDEREN-REGELING.md`. Details per film: `films/<map>/<film>/bron/opwaardering-v13.md` (wat veranderde, herinspreeklijst, vragen) en `bron/bronnen.md`.

## Wat er gebeurd is
- **Beeldbank** (28 okt, drie keuringsrondes met Kamiel): keuzes ingebouwd in `bibliotheek/lib_bio.js`; DNA-palet B (A rood, T geel, C lichtblauw, G donkerblauw, ruggengraat grijs; RNA zelfde basen, teal ruggengraat); eiwitten als kralenketen; navelstreng: kleur volgt zuurstof. Overeenstemming Kamiel ↔ blinde beoordelaar: ronde 1 56%, ronde 2 67% (brief `bibliotheek/verbeterronde-1/BLIND.md` aangepast: eenvoud weegt zwaar). Besluiten: `bibliotheek/verbeterronde-2/uitslag/BESLUITEN.md`, `verbeterronde-3/uitslag/BESLUITEN.md`, README-secties Verbeterronde 1–3.
- **Regeling**: alle 13 films (Zenuwstelsel 1–8, Hormonen 1–5) zijn naar prompt v13 opgewaardeerd **zonder keuring**, getest (B11-scripts, elke vraag met Vragen uit, contactvel van de gewijzigde scènes) en gepusht. Stem, script, vragen, timings en datum bleven; niets ingesproken, 0 credits. Hoofdpunten: grijze poppetjes → castpersonages (Noor, Daan, Teun, Linda, Erik); realistisch lichaam (`lib_anatomie.js`) met organen op hun plek en zoomcirkel náást het hoofd; beeldbankobjecten (hoofd/hersenen, nier/bijnier, membraan, receptor, lever, spier, witte bloedcellen); geen korrel buiten cellen; gebogen membranen; minder paars; gesproken 'voor vwo'-aankondigingen geknipt; bij Vragen uit geen 'Het goede antwoord is …' meer in de ondertitel; bronnenlogboek per film.
- Alle 13 staan op 'nog bekijken' (index.html REVIEW). Had een film in de reviewpagina al status 'bekeken/goed': daar op 'Opnieuw bekijken' zetten.

## Kamiels keuzes (29 okt 2026, keuzeblad) — in uitvoering
Brief: `films/UITVOEREN-REGELING.md`. Polymerase: versie 1 = variant A, ingebouwd (beoordelaar koos W). Zenuwstelsel 1–6: lichte remake naar donker; nieuwe versie als `films/zenuwstelsel/<slug>-nieuw.html`, de oude blijft online tot Kamiel goedkeurt (dan omwisselen: oude naar `bron/oud/`, datum, B15-uitzondering 'lichte-remake', REVIEW). Inspreken: alles 'doen', behalve Sanne (Kamiel koos een figurant, naam mag blijven). Kleuren gelijktrekken (tabel in de brief), Stress-decor thuis, synapsEcht + hersendoorsnede, label oudziend, reactietijd via de stem, wijn prima, nieuwe beeldbankobjecten later. Griepvirus en chromosomen in `lib_micro_evo.js` zijn naar palet B (29 okt).

### Stand 29 okt 2026 (middag): alles uitgevoerd
- Opgewaardeerd en online (versie 1.2): Zenuwstelsel 7 Slaap (1.201 cr), 8 Zintuigen (1.571 cr), Hormonen 1 (1.092 cr), 2 (figurant `sanne16`), 3, 4 (decor thuis), 5.
- Lichte remakes als preview `films/zenuwstelsel/<slug>-nieuw.html` (oude films nog online): 1 (1.910 cr), 2 (964 cr), 3, 4 (883 cr), 5 (1.130 cr), 6. Storyboards in `bron/remake-2026-10/storyboard/`.
- Totaal ingesproken: 8.751 credits. Sanne niet ingesproken (figurant, naam mag blijven).
- **Keuringsblad remakes**: 'Zenuwstelsel remakes keuren' https://claude.ai/artifact/Uco1ZkZaVLtNthi4LoaGxH, db-collectie `keuring` (doc-id `<slug>__oordeel` met antwoord ok/aanpassen/oud, en `<slug>__<scène>` met goed/opm + opmerking); bron in `films/regeling-keuring/`.
- **Bij 'ok' omwisselen**: `<slug>.html` → `bron/oud/<slug>-v1.x.html`, `<slug>-nieuw.html` → `<slug>.html`; datum in HOOFDSTUKKEN = dag van omwisselen; regel in `films/logboek/b15_uitzonderingen.jsonl` (soort lichte-remake); duur in HOOFDSTUKKEN controleren; `scripts/nieuwste_films.py`, `teller.py`, `reviewlijst.py`; REVIEW op nog bekijken; `uitleg`/oefenen-links nalopen.
- Nog te beluisteren (uitspraaktest-batch): G-eiwit, cAMP (Hormonen 1), hypothalamus en '37 graden' (Zenuwstelsel 5 a5), de nieuwe takes van Slaap/Zintuigen. Zintuigen s17 zegt nog 'Antwoord bee.' (Engels) → bij een volgende inspreekronde.
- Nog niet in de beeldbank (Kamiel: nieuwe objecten 'later'): eigen tekeningen uit de remakes (fiets, oog, zenuw/ruggenmerg in doorsnede, drukzintuig, synaps-varianten, hersenen opzij, slakkenhuis, homunculus, dendrietvoetje, pose 'fiets').
- Les: helpers die tegelijk in één werkmap committen zitten elkaar in de weg (een vastgelopen `rebase --autostash` zette ongecommit werk weg). Volgende keer elke filmhelper `isolation: worktree` geven.

## Open voor Kamiel (stand vóór het keuzeblad)

Alles hieronder staat op het keuzeblad 'Regeling: jouw keuzes' (https://claude.ai/artifact/1AwKuLaFUeSsEF2xypEnQG, db-collectie keuze; bron in films/regeling-keuzeblad/). Lees die collectie en voer de keuzes uit.
**Polymerase** (beeldbank): 'geen duidelijke winnaar'; voorstel = de kralenlus van de beoordelaar (verbeterronde-3/dna/polymeraseachter-polymerasevoor, W.js). Wacht op ja/nee.

**Herinspreeklijst (niets opgenomen; totaal ± 5.000–8.500 credits, afhankelijk van keuzes):**
- Uitgesproken personagenamen (regel B4): Slaap s01/s12/s19 'Bilal en Sam' → 'twee vrienden' (± 1.550; s12 meteen 'alleen' → 'vooral opgeruimd'); Zintuigen s01/s12/s20 'Noor' (± 2.000, of s12 deels gratis knippen); Suiker in balans 'Sanne' (alleen als zij een castpersonage wordt; ± 2.200).
- 'Voorspel.' → 'Wat denk je?' in Zenuwstelsel 1 q1–q6 en 2 q1–q5 (± 1.650, of 0 als we het woord wegknippen).
- Inhoud: Zenuwstelsel 2 q5 'Alleen op druk?' (± 200); Zenuwstelsel 1 a3 reactietijd 0,2 s (± 450, zie vraag); Zenuwstelsel 4 a4 'binnen tien seconden' → 'binnen een paar seconden' (optioneel ± 1.000); Zenuwstelsel 5 a5 temperatuurregeling (wachtlijst 15 okt, ± 1.500 + nieuw beeld); Hormonen 1 s20 'ongeveer' → 'minder dan een tienmiljoenste gram' (± 480) en s15 G-eiwit/cAMP (wachtlijst, ± 710).

**Vragen (keuzes van Kamiel):**
- Zenuwstelsel 1–6 hebben nog het lichte ontwerp van vóór Part C. Hele reeks naar de donkere stijl = lichte remake. Doen?
- Zenuwstelsel 1: '0,2 s van bal tot remmen' geldt voor een verwachte prikkel; bij een onverwachte bal eerder ± 1 s (`!` in bronnenlogboek).
- Kleuren in de reeks: zenuwen/neurotransmitter paars terwijl Part C zenuwsignaal teal zegt; cortisol teal; REM-slaap paars. Gelijktrekken in beide reeksen?
- Suiker in balans: welk castpersonage krijgt diabetes type 1 (bv. Yasmin), of een nieuwe figurant?
- Stress: cold open speelt in een klas, de stem zegt 's avonds thuis. Decor aanpassen?
- Knoeien met de synaps: Linda met wijn in de 'je'-scène goed? Eigen synaps → `synapsEcht` uit de beeldbank? Beloningssysteem (wolk) → hersendoorsnede?
- Zintuigen: 'oudziend vanaf je veertigste' (NEI: meestal na 45)?
- Nieuwe beeldbankobjecten voorgesteld: oog, oor, evenwichtsorgaan, hersenen zijaanzicht met echte plooien, insulinereceptor, eilandje van Langerhans, cytotoxische T-cel, kinderbot met groeischijven, antistof, kleine membraanreceptor; castboek: pose 'fiets', Noor op ±6 jaar.
- Hormonen 1/3: docentdeel-aanvullingen (o.a. Cohen 1991 ging over langere stress; lisvan Henle-lengte kangoeroerat is een vereenvoudiging).

## Ook nog (zonder keuring, kan meteen)
- Griepvirus en chromosomen in `bibliotheek/dieren/lib_micro_evo.js` nog paars → palet B.
- Eigen kopieën van beeldbankobjecten in `tools/docent/dna-3/beeldbank.js` en Transport 6 bijwerken bij hun volgende opwaardering.
- Volgende thema's opwaarderen in de volgorde van de jaarplanner, op dezelfde manier (brief hergebruiken).

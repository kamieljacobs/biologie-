# Splitsing 'Van bevruchting tot baby' in drie films (plan 7 nov 2026)

Kamiel (7 nov 2026): remake van Van bevruchting tot baby (`films/voortplanting/1-precies-op-tijd.html`, 18:55, alleen vwo). De film bevat uitspraak- en animatiefoutjes, is te groot en mag in kleinere stukken. De hele voortplantingslijn moet een logisch geheel worden. Kamiel ging akkoord met het voorstel hieronder en vroeg om prompts voor de vervolgchats.

## Waarom
- De titel belooft 'van bevruchting tot baby', maar de helft van de film gaat over wat vóór de bevruchting gebeurt (hormonen, cyclus).
- De groei van embryo tot baby ontbreekt juist.
- Overlap: H8 (SRY, Wolff/Müller) hoort bij Sekse, gender en diversiteit; H10–H11 (pil, morning-afterpil, abortuspil, hiv, ivf/ICSI) staan grotendeels al in Anticonceptie, soa's en voortplantingstechniek; hiv in T-helpercellen staat in de afweerfilm T-cellen en virussen.
- Alleen vwo: kleinere films kunnen een havo-basis met vwo-blokken krijgen.

## De lijn Voortplanting (volgorde in HOOFDSTUKKEN en in de klas)

| # | Film | Map | Inhoud | Uit de oude film |
|---|---|---|---|---|
| 1 | Celdeling (bestaat) | `celdeling/` | meiose | — |
| 2 | Geslachtsorganen en puberteit (bestaat) | `2-geslachtsorganen-puberteit/` | bouw, startsein | — |
| 3 | **De cyclus** (nieuw) | `cyclus/` | eiwit- vs steroïdhormoon; terugkoppeling bij de man (bodybuildervraag); follikelwedstrijd; LH-piek (positieve terugkoppeling); gele lichaam; menstruatie; grafiekvraag; kort: zo werkt de pil (terugkoppeling als toepassing) | H2, H3, H4, s45–s46 (pil, onttrekkingsbloeding) |
| 4 | **Bevruchting** (nieuw) | `bevruchting/` | de eicel die al bij oma wachtte (cold open); eicel tegenover zaadcel (cytoplasma, poollichaampjes); de tocht en capacitatie; zona pellucida, acrosoomreactie, corticale reactie; zygote; klieving tot blastocyste | cold open s01, H1, H5, s29–s30 (tot de blastocyste) |
| 5 | **Zwanger** (nieuw) | `zwanger/` | innesteling; hCG houdt het gele lichaam in leven; zwangerschapstest; placenta (dichtbij maar gescheiden, wat er wel/niet doorheen gaat); nieuw: embryo → foetus (tijdlijn in weken, vruchtvliezen en vruchtwater, navelstreng); geboorte met de oxytocinelus; eventueel borstvoeding (volgens het boek) | s30 (innesteling) –s33, H7, H9 |
| 6 | Anticonceptie, soa's en voortplantingstechniek (bestaat) | `3-anticonceptie-…/` | gericht aanvullen met wat nog ontbreekt: morning-afterpil (LH-piek uitstellen), abortuspil (mifepriston), hCG-injectie bij ivf, chlamydia → eileiders → buitenbaarmoederlijke zwangerschap | s47, s50–s54 waar het er nog niet in staat |
| 7 | Sekse, gender en diversiteit (bestaat) | `4-sekse-gender-diversiteit/` | gericht: buizen van Wolff/Müller, anti-Müllerhormoon, DHT als vwo-blok, als het er nog niet goed in staat | H8 |

Hiv in T-helpercellen (s48–s49) vervalt: staat in afweer film 3.

Open keuzes (standaard tenzij Kamiel anders zegt):
- Pil: kort in De cyclus (één alinea, als toepassing van terugkoppeling); de methodes blijven in film 6.
- Zwanger: inhoud volgens het boek (Nectar § 4.1 Nieuw leven, BvJ havo § 2.4 Zwanger); vraag Kamiel aan het begin van die chat welke onderdelen het boek heeft (vruchtvliezen, weken-tijdlijn, fasen van de bevalling, borstvoeding).

## Werkwijze per nieuwe film
- Soort: lichte remake (CLAUDE.md 'Gericht of remake'): het oude script (`films/voortplanting/1-precies-op-tijd/bron/script.md`) is het geraamte, kritisch nagelopen; nieuw beeld en nieuwe stem op de nieuwste prompt (`films/PROMPT_v13.md` of nieuwer), havo-basis + vwo-blokken, bronnenlogboek, frisse beeldreview. B15: uitzonderingsregel `lichte-remake` in `films/logboek/b15_uitzonderingen.jsonl` (reden: splitsing van Van bevruchting tot baby).
- Bouwvorm: FILMDATA-straat met de speler van `films/gedrag/5-emotieregulatie/bron/src/player.js`; voorbeeld lichte remake: `films/voortplanting/celdeling/bron/` en `2-geslachtsorganen-puberteit/bron/`.
- Fouten van de oude film: lees Kamiels reviewopmerkingen bij `films/voortplanting/1-precies-op-tijd.html` uit Firebase (adres staat in de prompt van de chat) en neem de punten mee die bij jouw film horen. Uitspraakfouten: approved uitspraak in `films/UITSPRAAK.md` + `films/uitspraak.json`, en het woord ook testen in de andere films waar het voorkomt (vaste regel).
- Bekende beeldfout: het hoofdkijkje over het gezicht (TODO.md) wordt een zoomcirkel naast het hoofd. Gezichten blijven heel.
- Personages: geen namen in stem of beeld; de oma-lijn (Linda, oma Ria, Noor) via `personages/LEVENSLOOP.md`.
- Hormoonkleuren gelijk aan Les 2 (`tools/docent/voortplanting-2/`, `HK()`): FSH groen, LH goud, oestrogeen koraal, progesteron paars, testosteron teal, hCG oker; navelstreng naar zuurstof (slagaders blauw, ader rood).
- Vragen: elke film ± 3 vragen; hergebruik de goede vragen van de oude film (q08, q15, q23, q28, q34, q42, q56) bij de film waar ze horen.
- Oefeningen (`oefenen.json`) en begrippen: de oude `1-precies-op-tijd/oefenen.json` en `glossary.json` verdelen over de nieuwe films.
- Parallel werken mag (drie mappen), maar gedeelde bestanden (`index.html`, `jaarplanner-dekking.json`, `sessie/reviewlijst.json`, `films/nieuwste.json`, UITSPRAAK-bestanden) pas aan het eind van een chat, direct na `git fetch` + rebase. ElevenLabs: wacht een geweigerde take af, nooit opnieuw genereren.
- De oude film blijft online tot alle drie de nieuwe films goedgekeurd zijn.

## Inpassen (laatste chat, na de drie films)
- Films 6 en 7 gericht aanvullen (zie tabel).
- `HOOFDSTUKKEN.voortplanting.films` in de volgorde van de tabel; oude film eruit (oude versie naar de git-geschiedenis volgens 'Gericht of remake').
- Les 2 Voortplanting (`tools/docent/voortplanting-2/`, hoort nu bij de oude film): `uitleg`-knoppen per nieuwe film naar het passende scherm; filmlinks in de les bijwerken.
- Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`), jaarplanner (`jaarplanner.html`, Nijmegen én Groesbeek), `jaarplanner-dekking.json`, `planner/reeksen.json`, medaillons (`img/kunst/films/`), `scripts/reviewlijst.py`, `scripts/nieuwste_films.py`, `scripts/oefenen.py`, `scripts/controle.py`.

## Stand
| Film | Stand |
|---|---|
| De cyclus | nog niet begonnen |
| Bevruchting | nog niet begonnen |
| Zwanger | nog niet begonnen |
| Inpassen | wacht op de drie films |

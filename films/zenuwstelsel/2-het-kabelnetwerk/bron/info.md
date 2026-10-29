# Het kabelnetwerk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | **preview** `films/zenuwstelsel/2-het-kabelnetwerk-nieuw.html` (versie 2.0); de oude film `films/zenuwstelsel/2-het-kabelnetwerk.html` (1.1) blijft online tot Kamiel 2.0 goedkeurt. Bij goedkeuring wisselt de hoofdsessie ze om (oude naar `bron/oud/`, datum, B15-uitzondering `lichte-remake`). |
| Reeks / nummer | Zenuwstelsel, film 2 |
| Doelgroep / niveau | 5 vwo, één niveau (`alleen: 'vwo'`, geen havo/vwo-schakelaar) |
| Versie / datum | **2.0 · 29 oktober 2026** — lichte remake in de donkere stijl; 1.1 · 28 okt 2026 (opwaardering v13 in het oude ontwerp); 1.0 · 4 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026). Bewust niet: (1) de stem is die van versie 1.0 (Kamiel: 'de stem blijft waar het beeld erop past'); alleen de vijf vraagalinea's zijn opnieuw ingesproken. De aanvullingen op de wachtlijst van 15 okt (lawine van natriumkanalen, refractaire periode en vuurfrequentie, rekrutering in a5) zijn dus nog niet ingesproken; (2) nieuwe tekeningen (drukzintuig als lichaampje van Pacini, vinger, zenuw in dwarsdoorsnede, axon als kabel) staan in `bron/src/teken_z2.js`, niet in `bibliotheek/lib_bio.js` (Kamiel 29 okt: nieuwe beeldbankobjecten later); (3) geen B15 (lichte remake). |
| Herkomst | lichte remake, keuze Kamiel 29 okt 2026 (keuzeblad 'Regeling: jouw keuzes'; brief `films/UITVOEREN-REGELING.md`) |
| Stem / model | Roos (ElevenLabs, `7qdUFMklKPaaAVMsBTBt`, `eleven_multilingual_v2`) |
| Duur | gesproken 5:11 (14 alinea's); speler met kaarten, aftellingen en onthullingen 6:42; met Vragen uit 4:32 |
| Beeldstijl | Part C donker: Micro (#121A26) voor neuron, membraan en axon, Schema-navy voor huid, sporen en samenvatting, keukendecor 's nachts alleen onder de cold open en de teenscène. Kleuren (brief Regeling): zenuwsignaal teal, Na⁺ oker, K⁺ groen (elk ion met zijn naam erin), ATP koraal, focus/drempel goud. Fraunces / Source Sans 3 / IBM Plex Mono. |
| Bouwvorm | FILMDATA-straat (zoals DNA 1 en Zenuwstelsel 9): `segments.json` + `bron/src/scenes_z2.js` (één functie per alinea, cues via `q.at`/`q.on`) + `bron/src/teken_z2.js`; speler van `films/gedrag/5-emotieregulatie/bron/src/player.js` met twee kleine aanpassingen (zie Techniek) |
| Audio-opslag | 14 losse mp3's in `films/zenuwstelsel/2-het-kabelnetwerk/audio/` (sNN.mp3 = segment-id); woordtijden in `bron/stem/woordtijden/` |
| Personage | Noor (castboek), eigen outfit `nacht` in deze film (t-shirt, pyjamabroek, blote voeten; gezet in `scenes_z2.js` r. 3) |

## Opbouw

| Segment | Was (1.1) | Hoofdstuk | Scène (functie) | Kernbeeld |
|---|---|---|---|---|
| s01 | s00 | Cold open | `s01` | Noor loopt van opzij ('s nachts, keuken) tegen de tafelpoot; twee signalen (teal) over dezelfde zenuwbaan: de stoot snel, de pijn bijna een seconde later; tijdbalk 0–1 s; vraagteken |
| s02 | titel | Titel | `title` | zenuwcel uit de beeldbank met myeline, impuls springt |
| s03 + q04 | q1 | 1 De zenuwcel | `s03` | neuron met vraagtekens aan beide kanten (vraagalinea, nieuw ingesproken) |
| s05 | a1 | 1 | `s05` | zoomcirkel van Noors been naar een zenuw in dwarsdoorsnede, één uitloper in goud; dan het neuron met namen direct bij de onderdelen, insnoeringen goud omcirkeld, '± 1 meter' met breukteken; impuls van dendriet naar eindknopje; kruis bij 'nooit andersom' |
| s06 | s21 | 2 Rust | `rustScene({pomp})` | gebogen membraan (stuk van een ronde cel) met natrium-kaliumpomp en kaliumlekkanaal; pompcyclus 3 Na⁺ uit / 2 K⁺ in, ATP; K⁺ lekt; + buiten / − binnen; voltmeter naar −70 mV; rustpotentiaal; batterij |
| s07 + q08 | q2 | 2 | `rustScene({vraag})` | pomp met kruis (stilgelegd), vraagteken |
| s09 | a2 | 2 | `rustScene({leeg})` | pomp stil: K⁺ lekt, Na⁺ komt binnen, verschil loopt (versneld) weg; voltmeter naar −15 mV; batterij leeg |
| s10 | s31 | 3 De impuls | `impulsScene` + `rolScene` | prikkel; natrium- en kaliumkanaal open/dicht op de woorden, ionen door de porie; grafiek loopt mee (drempel goud); daarna axon zonder myeline waarover de actiepotentiaal rolt, refractaire zone erachter, 'één kant op' |
| s11 + q12 | q3 | 3 | `s11` | vinger drukt op de huid met drukzintuig; lege grafiek met vraagteken |
| s13 | a3 | 3 | `s13` | twee sporen (zachte prikkel 3, harde 8 impulsen per seconde), alle even groot; doorgestreepte grotere piek; haak 'de sterkte zit in de frequentie' |
| s14 + q15 | q4 | 4 Snel en langzaam | `s14` | dun axon zonder myeline en dik axon met myeline tussen start en finish |
| s16 | a4 | 4 | `raceScene` | race (golf stap voor stap ↔ sprong van insnoering naar insnoering), ionen ketsen af op myeline; dan terug in de keuken: twee signalen over Noors been, tijdbalk 20 ms / 1 s |
| s17 + q18 | q5 | 5 Van prikkel naar impuls | `s17` | drukreceptor in de lederhuid onder een vinger, vraagteken |
| s19 | a5 | 5 | `receptorScene` | vinger drukt zacht/harder/hardst: drukzintuig wordt platgedrukt, kanaaltjes open; receptorspanning met drempel en steeds meer impulsen; adequate prikkel (met nuance), prikkel → receptor → impulsen |
| s20 | s70 | Samenvatting | `recapScene` | samenvattingskaart, zes regels op hun ankerwoord |
| s21 | eindkaart | Eindkaart | speler | drie kernzinnen + haak |

## Vragen

| Nr | Vraag | Opties | Juist |
|---|---|---|---|
| q04 | Waar begint een impuls in een neuron, en welke kant gaat hij op? | a Bij de dendrieten, richting de eindknopjes · b Bij de eindknopjes, richting het cellichaam · c Overal tegelijk, beide kanten op | a |
| q08 | Een gif legt de natrium-kaliumpomp stil. Wat gebeurt er op den duur met het rustpotentiaal? | a Het verschil wordt langzaam kleiner · b Het verschil wordt groter · c Er verandert niets | a |
| q12 | Je drukt harder op je huid. Wat verandert er aan de impulsen? | a Ze worden groter · b Er komen er meer per seconde · c Ze worden langer | b |
| q15 | Twee even lange axonen: dik met myeline, dun zonder myeline. Welke impuls komt het eerst aan? | a De dikke met myeline · b De dunne zonder myeline · c Ze komen tegelijk aan | a |
| q18 | Een drukreceptor in je huid. Waar reageert hij het makkelijkst op? | a **Vooral op druk** (was: Alleen op druk) · b Op druk en op licht · c Op elke prikkel, als die maar sterk genoeg is | a |

De gesproken vraag opent met 'Wat denk je?' (was 'Voorspel.'). Uitleg bij de onthulling: `film.py` (`questions`). Checkvragen, docentdeel en getallen: `sections.html` (op de pagina).

## Begrippen
Dezelfde 23 begrippen als 1.1 (`glossary.json`, uit de oude pagina).

## Techniek: waar wat zit

- **Film-HTML** (`2-het-kabelnetwerk-nieuw.html`, ± 11 360 regels): `window.FILMDATA` r. 153 (segmenten met woordtijden, vragen); `const SCENES` r. 2060, daarna lib_anatomie, lib_bio, `teken_z2.js` en `scenes_z2.js` (rustScene r. 11018, impulsScene r. 11061, raceScene r. 11103, receptorScene r. 11131, recapScene r. 11154); speler daarna (VRAAGZIN-regel r. 11202). Regelnummers verschuiven bij elke bouw: bewerk de bron, niet de HTML.
- **`bron/src/scenes_z2.js`**: r. 3 outfit `nacht`; r. 12 titel; r. 15 s01; r. 33 s03; r. 39 s05; r. 69–71 s06/s07/s09; r. 74 s10; r. 75 s11; r. 77 s13; r. 84 s14; r. 89 s16; r. 92 s17; r. 94 s19; r. 97 s20; rustScene r. 105, vAP (membraanpotentiaal in mV op de woorden) r. 141, impulsScene r. 148, rolScene r. 177, raceScene r. 190, receptorScene r. 218, recapScene r. 241.
- **`bron/src/teken_z2.js`**: kleuren `Z2` (r. 3), ion (r. 13), gebogen membraan `membraanZ` op `membraanBoog` uit de beeldbank (r. 24; R = 4200 px), voltmeter (r. 32), grafiek `GR`/`grafiekAssen`/`grafiekLijn` (r. 42–55), `neuronH` = beeldbank-`zenuwcel` met de posities van myelinestukken en insnoeringen (r. 56), `zenuwDoorsnede` (r. 63), keuken en tafel (r. 74–84), zenuwbaan langs het been (r. 85–89), tijdbalk (r. 92), huid, vinger, drukzintuig (r. 98–111), spikeReeks (r. 112), kabel (r. 117).
- **Speler** (`bron/src/player.js`, kopie van Emotieregulatie met spelerfix): (1) een spraaksegment met `vraagzin: true` (de vijf vraagalinea's) valt bij Vragen uit helemaal weg (`/*VRAAGZIN 29okt2026*/` in `buildTimeline`): die alinea's beginnen met 'Wat denk je?' en een stellende zin, die `vraagCuts` anders laat staan; (2) in `losAntwCuts` tellen 'goede'/'juiste' mee als antwoordwoord, zodat 'Het goede antwoord is A.' ook geknipt wordt in alinea's met 'begint' (s05, s19).
- **Bouwen**: `bron/bouw.sh` (werkmap buiten de repo), daarna `bron/remake-2026-10/naar_repo.sh` (themaregel, audio, site-scripts, checks). `bron/remake-2026-10/setup_uit_v1.py` maakte `segments.json`, de mp3's en de woordtijden uit film 1.1 (ook de knip in s10).

## Zo pas je de film aan
1. Beeld: bewerk `bron/src/scenes_z2.js` of `teken_z2.js`, bouw, en bekijk stills met `bron/bouw/stills.py <werkmap> <uit> s10:14 …`.
2. Eén alinea opnieuw inspreken: Roos, `eleven_multilingual_v2`, één take; mp3 als `audio/sNN.mp3`; woordtijden met `bron/bouw/silalign.py` (vraagalinea's: drempel −30 dB, min. 60 ms; zie `stem/invoer.md`); `display` in `segments.json` aanpassen; cues (`q.at`) nalopen met de lijst hieronder.
3. Ankerwoorden per scène: s01 Bam, stoot, pijn, Twee, aankomen · s05 zoomen, zenuw, één, neuron, dendrieten, cellichaam, axon, meter, vettige, myelineschede, Schwann, insnoeringen, eindknopjes, begint, andersom · s06 membraan, natrium, kalium, pomp, drie, ATP, kanaaltjes, lekt, Positieve, voltmeter, zeventig, rustpotentiaal, batterij · s09 lekt, leeg · s10 prikkel, membraan, Even, Maar, vijfenvijftig, drempelwaarde, Natriumkanalen, stroomt (1e en 2e), depolarisatie, sluiten, Kaliumkanalen, repolarisatie, hyperpolarisatie, golfje, actiepotentiaal, duizendste, prikkelt, volgende, rolt, erachter, refractaire, Daarom · s13 groot, sterkere, grotere, Hij, alles-of-niets, frequentie · s16 race, één, ionen, insnoeringen, honderdtwintig, sprongsgewijze, dikker, teen, aanraking, ruggenmerg, twintig, doffe, seconde. (2e), hele, kabels · s19 receptor, vervormt, kanaaltjes, negatief, Zacht, Harder (1e, 2e), drempel, gehaald, seconde, Elke, huid, oog, adequate, nooit, vertaalt · s20 receptoren, drempel, actiepotentiaal, groot, snelle, langzame, klap (2e).

## Aandachtspunten
- s19 begint (na de knip bij Vragen uit) met 'Nog één vraag. Hoe begint het eigenlijk?': een nieuwe, retorische vraag, geen verwijzing naar de voorspelvraag; bewust laten staan.
- De oefeningen (`films/zenuwstelsel/2-het-kabelnetwerk/oefenen.json`) horen bij de film onder de oude naam; bij het omwisselen werkt `scripts/oefenen.py` de scripttag bij.
- In s10 blijven de ingestroomde ionen staan (3 Na⁺ binnen, 3 K⁺ buiten); schematisch, in werkelijkheid verandert de concentratie bij één actiepotentiaal nauwelijks (staat in het docentdeel).

## Wachtlijst opnieuw inspreken (niet gedaan; alleen op Kamiels verzoek)
- s10 (was s31): aanvulling lawine van spanningsafhankelijke natriumkanalen ('alles of niets'), en na 'refractaire periode' dat de natriumkanalen vanzelf dichtvallen en de pauze de vuurfrequentie bepaalt (15 okt 2026; tekst in `bron/oud/info-v1.1.md`). De onjuiste zin 'Dan herstelt de pomp de rust.' is in 2.0 al uit de take geknipt.
- s19 (was a5): aanvulling rekrutering ('een sterkere prikkel prikkelt ook receptoren ernaast').
- Risicowoorden: spanningsafhankelijk, lawine (IPA in `bron/oud/info-v1.1.md`).

## Wijzigingen
- **29 okt 2026 — versie 2.0, lichte remake in de donkere stijl** (keuze Kamiel 29 okt 2026). Oud script als geraamte; vragen, opties en volgorde gelijk. Per scène:
  - Opgenomen (ElevenLabs, Roos, eleven_multilingual_v2, flow https://elevenlabs.io/app/flows/urrn2ZL3odpG9YtndzIf): q1 → s03 (216 credits), q2 → s07 (234), q3 → s11 (143), q4 → s14 (205), q5 → s17 (166); samen **964 credits**. 'Voorspel.' → 'Wat denk je?'; q5 'Alleen op druk?' → 'Vooral op druk?' (optie a op de vraagkaart idem; de antwoordalinea herhaalt 'alleen' niet).
  - Geknipt (0 credits): s10 'Dan herstelt de pomp de rust.' (vakfout, bronnenlogboek bewering 12; de rest van de alinea schuift 1,4 s op).
  - s01 cold open: was een los been tegen de tafelpoot → Noor (castboek) loopt van opzij tegen de tafelpoot; twee signalen over de zenuwbaan; tijdbalk.
  - s05: was een lens op een been en een eigen vlakke neurontekening → zoomcirkel naast Noor (de lens met de ontblote PNG-man vervalt), zenuw in dwarsdoorsnede, beeldbank-`zenuwcel` met namen direct bij de onderdelen.
  - s06/s07/s09: was een lichte membraanband met eigen ionkleuren → donker, gebogen membraan uit de beeldbank met pompcyclus, lekkanaal, Na⁺ oker / K⁺ groen met naam, voltmeter, batterij.
  - s10: was poorten + grafiek in het lichte ontwerp → kanalen uit de beeldbank met ionen door de porie, grafiek rechtsboven, daarna een rollende actiepotentiaal met refractaire zone; geen pomp meer in beeld bij het herstel.
  - s13, s14, s16: sporen, race en tijdbalk opnieuw getekend in Part C; de teenscène weer met Noor.
  - s11, s17, s19: drukreceptor nu als drukzintuig in de lederhuid onder een vinger; de nuance bij de adequate prikkel blijft.
  - s20: samenvattingskaart in Part C.
  - Speler: Emotieregulatie-speler (snelheid, Vragen aan/uit, Leerling/Klas) in plaats van de eigen speler van 1.x; twee aanpassingen (zie Techniek).
  - Docentdeel: checkvraag 3 en vereenvoudigingen aangepast (het rustpotentiaal herstelt door het sluiten van de kaliumkanalen).
  - Storyboard: `bron/remake-2026-10/storyboard/` (15 keyframes + `storyboard.json`).
- Eerdere wijzigingen: zie `bron/oud/info-v1.1.md`.

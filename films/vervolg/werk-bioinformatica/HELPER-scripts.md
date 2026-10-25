# Brief voor de scripthelpers — Bio-informatica (fase 1: scriptvarianten)

Je schrijft voor één film van de reeks *Wat word jij? · Bio-informatica* de filmbrief, de getallen met bronnen en drie scriptvarianten. Niet bouwen, niet inspreken, niets in de repo wijzigen, niet pushen, niets publiceren. Schrijf alleen in je eigen werkmap `/home/claude/hw/<werkmap>/`.

## Lees eerst (repo: /home/claude/biologie-)
1. `films/vervolg/REEKS-bioinformatica.md` — bindend (cast, begrippen, grenzen met andere films, beeldafspraken).
2. `films/PROMPT_v10.md` Part B §1–§5 en §15 (regels 72–205 en 306–360), en Part C §C4 Schema (zoek de kop). Let op B4: nooit naar tools of de site verwijzen.
3. `films/BEELDAFSPRAKEN.md`, `films/WERKWIJZE-LESSEN.md`, `films/BRONNEN.md`.
4. Voorbeeld van een goedgekeurde reeks in dezelfde straat: `films/vervolg/forensisch-1-sporen/bron/brief.md`, `bron/getallen.md`, `bron/werk/script_A.md` en `bron/script_v2.md` (vorm van het script: koppen `## Cold open`, `## Titel`, `## Hoofdstuk N — …`, `## Recap`, `## Eindkaart`; vragen met opties a/b/c en ✓; `[Schema: …]` = beeldidee).
5. Het plan van jouw film: `vervolg.html`, zoek `id:"bioinformatica"` (titel, vraag, opbouw, nieuw, bouwt). De `bouwt`-films zijn de films waarop je voortbouwt: lees van elk `bron/script*.md` alleen wat je nodig hebt om niet te herhalen (grep).
6. `personages/ROLLEN.md` en `personages/LEVENSLOOP.md` (wie mag wat).

## Wat je maakt
- `brief.md` — vorm als het Forensisch-voorbeeld: tabel (TOPIC, AUDIENCE, NIVEAU, LENGTH, USE, CENTRAL PUZZLE, NOTES), Leerdoelen (4–6, 'de leerling kan …'), Misconcepties (met hoofdstuk en hoe aangepakt), Rode draad (met het menselijke moment dat het concept draagt), Keuzes (type per hoofdstuk uit B3, getallen in het script), Twijfels (voor Kamiel/reviewer: alles wat je niet met een bron kon vastleggen, elke nieuwe rol of nieuwe tekening, alles wat gevoelig is).
- `getallen.md` — elk getal en elke 'altijd/nooit/alleen'-bewering uit je scripts, met bron (titel + URL, niveau A/B/C volgens BRONNEN.md, ≥ 2 onafhankelijke bronnen waarvan ≥ 1 niveau A). Open elke bron zelf (WebSearch/WebFetch); noem nooit een bron die je niet geopend hebt. Kun je iets niet vastleggen: haal het uit het script of zet het bij Twijfels. Ook opleidingen (namen, plaats, duur; dichtbij Nijmegen eerst) met jaartal.
- `werk/script_A.md`, `werk/script_B.md`, `werk/script_C.md` — drie complete scriptvarianten volgens B15:
  - A: klassiek, volgt de opbouw van het plan.
  - B: kleine mutaties t.o.v. A. Trek ze met een dobbelsteen: `python3 -c "import random;print(random.sample(['opening','metafoor','volgorde','voorbeeld','tempo','perspectief','rol van het personage'],2))"` en noteer bovenaan welke je kreeg (mag er één schrappen die echt niet past, met reden).
  - C: grote mutatie: een andere rode draad of vertelvorm (casus, raadsel, experiment als kapstok, de kijker beslist mee …). Noteer bovenaan welke en waarom.
  - Elk: ± 800–950 gesproken woorden (± 6–7 min), cold open ≤ 20 s met de puzzel, titel, 4 hoofdstukken met elk een eigen mini-vraag en minstens één voorspelvraag ('Wat denk je?', 2–3 opties, één afleider = bekende misconceptie, het goede antwoord niet steeds dezelfde letter en niet steeds de langste), recap die de puzzel beantwoordt en de vaste opleidingenzin bevat, eindkaart. Korte zinnen (meestal < 15 woorden), je-vorm, getallen zoals je ze uitspreekt, geen teleologie. Per alinea een `[Schema: …]`- of `[Micro: …]`-beeldidee met castpersonages. Vragen uit moet werken (B9: de vertelling na een vraag leunt niet op de vraag).
  - Code in beeld wordt nooit voorgelezen; de vertelling zegt wat het doet.
- Onderaan `brief.md` een korte uitspraakwachtlijst (risicowoorden: Engelse termen als BLAST, Python, GWAS, AlphaFold; met voorstel voor de stem-invoer; check eerst `films/uitspraak.json` en `films/UITSPRAAK.md`).

## Klaar
Meld in je eindbericht (kort, ≤ 15 regels): de drie varianten in één zin elk, het aantal woorden per variant, de belangrijkste twijfels, en welke feiten je niet met twee bronnen kon vastleggen.

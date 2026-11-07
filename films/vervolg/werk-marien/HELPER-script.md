# Helperbrief — script fase A (Wat word jij? · Mariene biologie)

Je schrijft de scripts voor één film. Repo: `/home/claude/biologie-` (alleen lezen, niets committen, niets pushen). Werkmap: `/home/claude/hw/<d>/` (d = mb1, mb2 of mb3). Je hebt geen Agent-tool; de blinde beoordeling doet de hoofdsessie.

## Lees eerst (in deze volgorde, niet meer dan nodig)
1. `films/vervolg/REEKS-marien.md` (reeksbrief: cast, kleuren, begrippen, grenzen) en `films/vervolg/OVERDRACHT-marien.md`.
2. `films/PROMPT_v13.md`: Part A1 (r. 40–66), B2–B4 (r. 107–186), B15 (r. 330–404, vooral fitnesscheck en mutaties). Part C alleen globaal.
3. `films/logboek/regels.json` (P1, P2, V1: pas ze toe), `films/BRONNEN.md`, `films/BEELDAFSPRAKEN.md`, `films/UITSPRAAK.md` (alleen om risicowoorden te herkennen).
4. Voorbeeld van vorm en niveau (één film, compleet): `films/vervolg/milieukunde-2-van-wieg-tot-graf/bron/` → `brief.md`, `getallen.md`, `werk/script_B.md`, `script_v2.md` (kop met v1/v2-regels, `[Schema: …]` per hoofdstuk, `[VRAAG] (a) … · (b) … · (c) …`, `Antwoord x.`), `twijfels.md`.
5. Het plan van jouw film in `vervolg.html` (zoek `id:"marien"`): startvraag, opbouw (4 hoofdstukken), wat hij toevoegt, waarop hij voortbouwt.

## Wat je maakt (in `/home/claude/hw/<d>/`)
1. **`getallen.md`** — elk getal en elke stellige bewering die je wilt gebruiken, met bronnen die je **zelf geopend hebt** (WebSearch/WebFetch), niveau A/B (BRONNEN.md), ≥ 2 onafhankelijke bronnen en ≥ 1 niveau A per bewering. Wat je niet rond krijgt, gebruik je niet of markeer je met `?`. Noteer per bron titel, URL, jaar, niveau. Ook de opleidingen voor de recap (één zin, zie reeksbrief).
2. **`brief.md`** — filmbrief zoals het voorbeeld: Part A1-velden, 4–6 leerdoelen, 4–6 misconcepties (elk getoetst met een vraag, P2), begrippen, de dobbelsteentrekking (zie onder) en de P1-check voor de grote mutatie in één regel.
3. **`werk/script_A.md`, `werk/script_B.md`, `werk/script_C.md`** — drie **volledige** scripts (± 850–950 gesproken woorden, cold open ≤ 48 woorden), elk in het formaat van het voorbeeld, met per hoofdstuk een `[Schema: …]` en minstens één voorspelvraag met 2–4 opties waarvan één een bekende misconceptie. A = klassiek (volgt het plan), B en C volgens de trekking. Elk script eindigt met een recap die de puzzel van de cold open beantwoordt en met de vaste opleidingszin. Bovenaan elk script alleen titel + één regel opbouw; géén verwijzing naar de andere varianten of naar de trekking (ze gaan blind naar een beoordelaar).
4. Draai `python3 /home/claude/biologie-/scripts/scriptcheck.py werk/script_*.md` en los meldingen op of noteer in `werk/scriptcheck.md` waarom niet.
5. Eindbericht (≤ 12 regels): woordentelling per variant, aantal vragen, de 3 lastigste feiten en of ze rond zijn, uitspraakrisico's.

## Vaste eisen (gelden voor alle drie de varianten)
- Geen personagenamen in de stem: 'de stagiair', 'de mariene bioloog'. Je-vorm mag. Beroep wordt uitgesproken.
- De mariene bioloog heeft minstens één scène met eigen tekst (P2), ook gesprek met de stagiair.
- Elke misconceptie uit de brief krijgt een voorspel- of controlevraag (P2). Juiste antwoorden verspreid over a/b/c, niet steeds de langste optie.
- Zinnen kort (meestal < 15 woorden), getallen zoals ze gezegd worden ('nul komma een', 'een kwart'), actief, gewone spreektaal voor 16-jarigen.
- Vragen uit (B9): de vertelling na een vraag leunt niet op de vraag ('Antwoord b' mag, maar de zin daarna moet zonder de vraag kloppen).
- Geen verwijzing naar tools of de site, niets als 'Probeer het zelf'.
- Grenzen met andere films: zie reeksbrief (hooguit één zin terugverwijzing, met de filmtitel in de stem mag: 'In Plek genoeg zag je …').
- Gevoelige dossiers (visserij, mosselkweek): beschrijvend, evenwichtig, geen standpunt.
- `[Schema: …]` beschrijft het beeld kort en concreet (cast, decor, objecten, labels in HOOFDLETTERS, kleuren volgens de reeks). Weinig tekst op het beeld.

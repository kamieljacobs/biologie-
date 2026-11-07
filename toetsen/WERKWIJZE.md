# Leerdoelen en toetsen · werkwijze

Opgezet 26 okt 2026 (Kamiel: 'toetsen maken gebaseerd op eindtermen en de inhoud van de films, en daar later de leerdoelen aan koppelen'; daarna: 'een combi tussen leerdoelen uit het boek en wat er in de film zit'). Nog niet begonnen: Kamiel levert de leerdoelen uit het boek aan wanneer hij tijd heeft.

## Uitgangspunten

- **Bron van de leerdoelen**: de leerdoelen uit de methode per paragraaf (Biologie voor jou voor havo, Nectar 4.1 voor vwo), aangevuld met wat de films behandelen. Zo toets je wat leerlingen echt geleerd hebben: boek + films.
- **Eindtermen als controle**: syllabus CE en examenprogramma biologie (havo en vwo). Elk leerdoel hoort bij een eindterm; leerdoelen erbuiten worden gemarkeerd; eindtermen zonder leerdoel ook.
- **Eerst formatief** (advies 26 okt 2026): per hoofdstuk eerst een oefentoets op de site, zonder cijfer; de methodetoets blijft voorlopig de echte toets. Pas na een of twee hoofdstukken vergelijken, en met instemming van de sectie (PTA, examenreglement, Nijmegen en Groesbeek gelijk) een PTA-toets vervangen.
- **Eén leerdoel, overal dezelfde**: hetzelfde leerdoel staat in de jaarplanner (kolom Leerdoelen, veld `doelen` in `PLANNERS`), in de toetsmatrijs en bij de toetsvragen.

## Stappen per hoofdstuk

1. **Kamiel** stuurt de leerdoelen uit het boek per paragraaf (screenshots uit de online methode zijn genoeg).
2. **Samenvoegen met de films**: lees per film die in `jaarplanner.html` bij dat hoofdstuk staat `bron/info.md` (opbouw, begrippen, vragen) en kijk in `jaarplanner-dekking.json`. Per leerdoel: welke film(s) het behandelen. Wat alleen een film uitlegt kan een extra leerdoel worden, gemarkeerd 'uit de film'. Wat het boek vraagt en geen film behandelt = gat (naar de dekkingslijst).
3. **Eindtermen**: als `toetsen/eindtermen/havo.json` of `vwo.json` nog niet bestaat, eerst maken uit de officiële syllabus CE (CvTE, examenblad.nl) en het examenprogramma (SE-eindtermen): `{code, domein, subdomein, tekst, ce|se}`. Noem alleen bronnen die je zelf hebt geopend. Koppel elk leerdoel aan een of meer eindtermcodes.
4. **Voorleggen aan Kamiel**: de leerdoelen per paragraaf met film(s), eindterm en markeringen. Na akkoord opslaan als `toetsen/leerdoelen/<niveau>-<hoofdstuk>.json` (`{paragraaf, nr, tekst, bron: 'boek'|'film', films[], eindtermen[]}`) en per week in de jaarplanner zetten (`doelen`, havo 4 / vwo 4+5 in Nijmegen én Groesbeek).
5. **Oefentoets**: een of meer vragen per leerdoel in CE-stijl (context, meerkeuze en open), met toetsmatrijs (leerdoel × eindterm × paragraaf × RTTI) en antwoordmodel. Hergebruik de bouwstenen van de oefenexamens (`tools/OEFENEXAMEN_PROMPT.md`, `tools/examen-havo-2026-1.html`) voor een digitale versie. Daarna twee frisse controleurs: vakinhoud en 'past bij het leerdoel en het boek'.

## Volgorde

Eerst havo 4 H2 Voortplanting en seksualiteit (toets week van 16 nov 2026), daarna vwo 4+5 H4 Voortplanting (Nectar), dan per hoofdstuk mee met de planner.

## Prompt voor een nieuwe chat

```
We gaan verder met leerdoelen en toetsen volgens toetsen/WERKWIJZE.md in de repo kamieljacobs/biologie-. Hoofdstuk: havo 4 H2 Voortplanting en seksualiteit (Biologie voor jou). Hieronder de leerdoelen uit het boek (screenshots). Volg de stappen 2 t/m 4 en leg de leerdoelen aan mij voor; de oefentoets (stap 5) pas na mijn akkoord.
```

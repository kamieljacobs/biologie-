# Schrijfbrief scriptvarianten — gz1 Hoe een epidemie groeit en stopt (26 okt 2026)

Je schrijft één scriptvariant (A, B of C, zie je opdracht) voor een Nederlandse uitlegfilm. Schrijf alleen het script, geen storyboard verder dan de `[Schema: …]`-regels achter de koppen.

## Lees eerst (in deze volgorde)
1. `/home/claude/biologie-/films/vervolg/REEKS-gezondheid.md` — reeksbrief, bindend (cast, **toon bij corona en maatregelen**, kleuren, begrippen, grenzen).
2. `/home/claude/hw/gz1/brief.md` — filmbrief (opbouw goedgekeurd door Kamiel, leerdoelen, misconcepties, puzzel, trekking van de mutaties).
3. `/home/claude/hw/gz1/getallen.md` — de ENIGE bron voor getallen en feiten. Gebruik alleen regels met ✓ of ≈, in de voorzichtige formulering uit de toelichting. Lees 'Voorzichtig' helemaal. Een feit dat niet in dit bestand staat: niet gebruiken, of als 'vereenvoudigd' benoemen en in je Twijfels zetten.
4. `/home/claude/biologie-/films/PROMPT_v10.md` regels 77–178 (Part B §1–5) — productiestandaard; lees ook de proefregels P1 en P2 (rond regel 339).
5. `/home/claude/biologie-/films/BEELDAFSPRAKEN.md` — voor je `[Schema: …]`-regels; let op 'Decors', telpoppetjes en 'Herkenbare menselijke momenten'.
6. Voorbeeld van toon en opmaak (een goedgekeurde Wat word jij?-film met een vakpersoon): `/home/claude/biologie-/films/vervolg/landbouw-3-fokken/bron/script_v2.md`. Neem exact dezelfde opmaak over: kopregel, korte blokken Leerdoelen en Misconcepties, `---`, `## Cold open [Schema: …]`, `## Titel`, `## Hoofdstuk n — titel [Schema: …]`, `[VRAAG] (a) … · (b) … · (c) …`, `## Recap [ … ]`, `## Eindkaart`. Daarna `---` en een korte sectie `## Keuzes` en `## Twijfels`.
7. Wat de lesstof al uitlegt (alleen terugverwijzen, met de filmtitel): `grep -n -i -E "groepsimmun|vaccin" /home/claude/biologie-/films/afweer/4-vaccins-allergie-en-bloedgroepen/bron/script*.md | head -20` en `grep -n -i -E "exponent|J-curve|verdubbel" /home/claude/biologie-/films/ecologie/plek-genoeg/bron/script*.md | head`.

## Inhoud (opbouw goedgekeurd door Kamiel)
- Puzzel: Waarom groeide corona in maart 2020 zo snel, en waarom stopt een epidemie uiteindelijk?
- H1 Het reproductiegetal R: hoeveel mensen steekt één zieke aan? R₀ en R; R hangt af van contacten, kans per contact en hoe lang iemand besmettelijk is (dus ook van gedrag); vergelijking met één of twee andere ziektes uit getallen.md.
- H2 Exponentiële groei en de curve afvlakken: R boven 1 = groei die steeds sneller gaat, verdubbeltijd; R onder 1 = uitdoven; de curve afvlakken = piek lager en later zodat de zorg het aankan.
- H3 Groepsimmuniteit: welk deel moet immuun zijn? Drempel 1 − 1/R₀ met de som op het scherm; waarom mazelen veel hoger ligt; waarom een epidemie ook zonder maatregelen stopt (vatbaren raken op) en doorschiet.
- H4 Maatregelen doorrekenen met een eenvoudig model: drie bakken vatbaar → besmettelijk → hersteld; een maatregel verandert een knop (contacten), het model laat zien wat er met de piek gebeurt; wat een model wel en niet kan.
- Recap: antwoord op de puzzel + opleidingen (alleen uit getallen.md; dichtbij Nijmegen eerst) en werk. Hooguit twee zinnen opleidingen + één zin werk.

## Cast
Yasmin (16, wil arts worden, snuffelstage bij de GGD, stelt de vragen van een leerling) en Epidemioloog Farid (± 38, nieuw personage, haar begeleider; de vakpersoon, alleen in zijn eigen vak). Proefregel P2: Farid heeft een eigen beurt (een scène waarin hij iets doet of zegt dat het concept draagt) en het woord 'epidemioloog' valt; elke misconceptie krijgt een vraag, niet alleen een zin. Wat Farid en Yasmin zeggen, vertelt de verteller in indirecte rede ('…, zegt Farid') of in heel korte directe zinnen; Roos spreekt alles in. Geen grijze poppetjes; telpoppetjes alleen in tellingen en besmettingsketens. Decor (ElevenLabs, nog te keuren): alleen een GGD-kantoor met groot scherm, alleen onder scènes die daar echt spelen.

## Toon (bindend, zie reeksbrief)
Corona zakelijk: geen angst, geen ic-beelden met patiënten, geen sterftecijfers. Maatregelen neutraal: wat doet de knop in het model, niet of het beleid goed was. Vaccineren feitelijk.

## Harde regels
- 850–1000 woorden gesproken (Roos ≈ 140 woorden/min). Cold open ≤ 20 s (≤ 45 woorden) en eindigt met een vraag + 'Wat denk je?'.
- Korte zinnen, je-vorm, actief, getallen uitgeschreven zoals ze gezegd worden ('twee komma vijf', 'een op de drie', 'zevenenzestig procent'). Geen teleologie ('het virus wil').
- Minstens één vraag per hoofdstuk (samen 5–7), 3 opties, één ervan een bekende misconceptie; opties ongeveer even lang, vakterm niet alleen in het goede antwoord, het goede antwoord niet steeds op dezelfde letter en niet steeds de langste of meest genuanceerde, de zin vóór de vraag verraadt het antwoord niet.
- Vragen uit: de alinea na een vraag begint met 'Antwoord x.' en zegt daarna de inhoud opnieuw in eigen woorden; geen 'klopt', 'inderdaad', 'zoals je dacht', geen verwijzing naar de opties.
- Geen verwijzing naar tools, opdrachten of de site ('probeer', 'op de site', 'in de tool', 'zelf uitproberen').
- Geen 'altijd/nooit/alle/alleen' tenzij getallen.md het draagt.
- Eén of twee menselijke momenten die het concept dragen (BEELDAFSPRAKEN), kort.
- Uitspraakrisico's beperkt houden; 'R-nul' uitspreken als 'R-nul' (schrijf in de gesproken tekst 'R-nul', niet R₀); noem in Twijfels de risicowoorden. Geen merknamen, geen echte GGD-regio.
- Getallen en eenheden voluit in de gesproken tekst; afkortingen en formules alleen in de `[Schema: …]`-regels.

## Lever
Schrijf je variant met Write naar het pad uit je opdracht. Antwoord daarna met alleen: aantal gesproken woorden en de drie zwakste plekken van je eigen variant.

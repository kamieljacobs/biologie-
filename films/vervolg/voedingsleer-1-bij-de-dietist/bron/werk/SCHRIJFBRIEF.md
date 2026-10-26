# Schrijfbrief scriptvarianten — vd1 Bij de diëtist: van eetdagboek tot nieuwe gewoonte (26 okt 2026)

Je schrijft één scriptvariant (A, B of C, zie je opdracht) voor een Nederlandse uitlegfilm. Schrijf alleen het script, geen storyboard verder dan de `[Schema: …]`-regels achter de koppen.

## Lees eerst (in deze volgorde)
1. `/home/claude/biologie-/films/vervolg/REEKS-voeding.md` — reeksbrief, bindend (cast, **toonregels bij gewicht**, kleuren, begrippen, grenzen).
2. `/home/claude/hw/vd1/brief.md` — filmbrief (opbouw goedgekeurd door Kamiel, leerdoelen, misconcepties, puzzel, trekking van de mutaties).
3. `/home/claude/hw/vd1/getallen.md` — de ENIGE bron voor getallen en feiten. Gebruik alleen regels met ✓ of ≈, in de voorzichtige formulering uit de toelichting. Lees 'Voorzichtig' helemaal. Een feit dat niet in dit bestand staat: niet gebruiken, of als 'vereenvoudigd' benoemen en in je Twijfels zetten.
4. `/home/claude/biologie-/films/PROMPT_v10.md` regels 77–178 (Part B §1–5) — productiestandaard; let op proefregels P1 en P2 (zoek 'P1' en 'P2').
5. `/home/claude/biologie-/films/BEELDAFSPRAKEN.md` — voor je `[Schema: …]`-regels; let op 'Decors' en 'Herkenbare menselijke momenten'.
6. Voorbeeld van toon en opmaak (een goedgekeurde Wat word jij?-film met een vakpersoon): `/home/claude/biologie-/films/vervolg/landbouw-3-fokken/bron/script_v2.md`. Neem exact dezelfde opmaak over: kopregel, korte blokken Leerdoelen en Misconcepties, `---`, `## Cold open [Schema: …]`, `## Titel`, `## Hoofdstuk n — titel [Schema: …]`, `[VRAAG] (a) … · (b) … · (c) …`, `## Recap [ … ]`, `## Eindkaart`. Daarna `---` en een korte sectie `## Keuzes` en `## Twijfels`.
7. Wat de lesstof al uitlegt (alleen terugverwijzen, met de filmtitel): `grep -n -i -E "schijf|vezel|etiket|vet" /home/claude/biologie-/films/voeding/1-wat-zit-er-in-je-eten/bron/script_v2.md | head -20`, `grep -n -i "schijf" /home/claude/biologie-/films/voeding/7-supplementen-en-superfoods/bron/script_v2.md | head`, `grep -n -i -E "schijf|afwissel" /home/claude/biologie-/films/onderbouw/32c/1-voeding-en-beweging/bron/script_v2.md | head`, `grep -n -i -E "gewoonte|conditioner|belon" /home/claude/biologie-/films/gedrag/7-leren/bron/script*.md | head`.

## Inhoud (opbouw goedgekeurd door Kamiel, 26 okt 2026)
- Puzzel: Iedereen weet dat groente gezond is. Waarom eet bijna niemand genoeg? (Het 'bijna niemand' alleen zoals getallen.md het draagt; desnoods 'de meeste mensen'.)
- H1 Meten wat iemand eet: eetdagboek en navragen, en waarom mensen te weinig opschrijven (onderrapportage).
- H2 De Schijf van Vijf zelf: de vijf vakken met voorbeelden, de richtlijnen van de Gezondheidsraad (hoeveelheden alleen uit getallen.md), wat erbuiten valt (beperken, geen verbod) en waarom dit het risico op ziekte verlaagt. Dit hoofdstuk moet havo § 10.5 echt dekken: een leerling moet na de film de vijf vakken kunnen noemen.
- H3 Een advies op maat via motiverende gespreksvoering: niet vertellen maar laten ontdekken; Joost noemt zelf zijn reden.
- H4 Gewoontes veranderen: kleine, concrete stappen, als-dan-plan, terugval hoort erbij.
- Recap: antwoord op de puzzel (kennis is niet het probleem; gewoontes en omgeving) + opleidingen (alleen uit getallen.md; dichtbij Nijmegen eerst: HAN) en werk. Hooguit twee zinnen opleidingen + één zin werk.

## Cast
Diëtist Hanneke (± 41, nieuw personage, goedgekeurd als rol door Kamiel; de vakpersoon, alleen in haar eigen vak), Joost (55, figurant uit het castboek, de cliënt; komt via de huisarts) en Noor (16, loopt een dag mee, stelt de vragen van een leerling; mag kort). Proefregel P2: Hanneke heeft een eigen beurt (een scène waarin zij iets doet of zegt dat het concept draagt) en het woord 'diëtist' valt; elke misconceptie krijgt een vraag, niet alleen een zin. Geen grijze poppetjes; telpoppetjes alleen in tellingen. Wat Hanneke en Joost zeggen, vertelt de verteller in indirecte rede ('…, zegt Hanneke') of in heel korte directe zinnen; Roos spreekt alles in. Decor (ElevenLabs): alleen de praktijk van de diëtist, alleen onder scènes die daar echt spelen.

## Toon (bindend, zie reeksbrief)
Geen schuld of schaamte over eten of gewicht, geen 'lui' of 'wilskracht', geen caloriedoel of dieetlijst voor de kijker. Joost is een gewone man, geen karikatuur; hij heeft zelf iets te zeggen. Privacy: Noor mag meekijken omdat Joost dat goed vindt (één zin of in beeld).

## Harde regels
- 850–1000 woorden gesproken (Roos ≈ 140 woorden/min). Cold open ≤ 20 s (≤ 45 woorden) en eindigt met een vraag + 'Wat denk je?'.
- Korte zinnen, je-vorm, actief, getallen uitgeschreven zoals ze gezegd worden ('tweehonderd gram', 'een op de tien'). Geen teleologie.
- Minstens één vraag per hoofdstuk (samen 5–6), 3 opties, één ervan een bekende misconceptie; opties ongeveer even lang, vakterm niet alleen in het goede antwoord, het goede antwoord niet steeds op dezelfde letter en niet steeds de langste of meest genuanceerde, de zin vóór de vraag verraadt het antwoord niet.
- Vragen uit: de alinea na een vraag begint met 'Antwoord x.' en zegt daarna de inhoud opnieuw in eigen woorden; geen 'klopt', 'inderdaad', 'zoals je dacht', geen verwijzing naar de opties.
- Geen verwijzing naar tools, opdrachten of de site ('probeer', 'op de site', 'in de tool', 'zelf uitproberen').
- Geen 'altijd/nooit/alle/alleen' tenzij getallen.md het draagt.
- Eén of twee menselijke momenten die het concept dragen (BEELDAFSPRAKEN), kort.
- Uitspraakrisico's beperkt houden; noem in Twijfels de risicowoorden. Geen merknamen.
- Getallen en eenheden voluit in de gesproken tekst; afkortingen alleen in de `[Schema: …]`-regels.

## Lever
Schrijf je variant met Write naar het pad uit je opdracht. Antwoord daarna met alleen: aantal gesproken woorden en de drie zwakste plekken van je eigen variant.

# Beeldreview: Screenen of niet? (Gezondheidswetenschappen 2)

Reviewer: Claude, frisse beeldreviewer (C10.7). Ik heb het maken niet gezien. Datum: 31 okt 2026.
Bekeken: `film/standalone.html`. Contactbladen met 5 stills per spraaksegment (10/30/50/70/93 %), plus titel, hoofdstukkaarten, vraagkaarten en eindkaart (108 stills). Daarnaast 74 losse stills op het begin van scènes, op genoemde woorden en rond elke vraag (ook de onthulde vraagkaarten). Vragen uit (`?vragen=uit`): 88 stills via `seekGlobal`, van 5 s vóór tot 5 s na elke knip.
Naast elkaar gelegd met `script_v2.md` (storyboard), `words/<sid>.json`, `getallen.md`, `twijfels.md`, `BEELDAFSPRAKEN.md`, `REEKS-gezondheid.md` en Part C (C5, C10) van `PROMPT_v13.md`.
Stills in de scratchpad `/tmp/claude-0/-home-claude/82589197-25db-5d40-878f-b7f845ac6e11/scratchpad/rv_gz2/`: `contact/` en `sheets/` (contactbladen), `los/`, `tim/`, `x/`, `y/` (losse momenten), `uit/` (Vragen uit). Tijden zijn lokale tijden binnen het segment (s), pixelmaten gelden voor 1920×1080.

**Samenvatting: 14 MOET, 21 KAN.**

Goed: de keuring is gevolgd. Farid draagt geen badge en heeft geen afdeling (alleen het label 'Epidemioloog Farid'), en het GGD-kantoor staat zonder opschrift alleen onder de eerste zinnen van H1. Opa Henk krijgt alleen de envelop: geen uitslag, geen kijkonderzoek en geen ziekte van hem in beeld. Het decor van de hal en keuken staat alleen onder scènes die thuis spelen. Er zijn geen angstbeelden: de darm is een schematische buis en kanker is een kleine koraal vlek. De sterftegrafiek heeft een eerlijke as (0–100 per 100.000) met bron en 'alleen begin- en eindjaar'. De stadiumbalkjes, de telling van 100 (4 / 25 / 33 / 38), '± 5 op de 100 (2024: 4,5 %)', de Rotterdam-studie (± 2 / ± 2 / ± 7 %, Vernooij e.a. 2007) en de gelote proeven (Cochrane 2007) kloppen met `getallen.md` en hebben bron en jaar. Er staat nergens een antwoord in beeld vóór 'Antwoord x': tijdens de vragen staan alleen '?', de envelop of de vier vakjes zonder markering. Bij Vragen uit zijn geluid en ondertitels schoon: de vraagzinnen en 'Antwoord x.' vallen weg, s22 valt helemaal weg, en de zin na elke knip loopt goed door.

---

## MOET (fout, tegenstrijdig, onleesbaar of tegen de regels)

1. **Vragen uit, s06 / s11 / s14 / s17 / s21 / s24 (vanaf t = 0)** (`uit/g0053.36_s06_1.62`, `g0125.85_s11_1.69`, `g0144.23_s14_1.31`, `g0182.58_s17_1.87`, `g0256.29_s21_1.30`, `g0289.80_s24_1.79`): de groene antwoordregel blijft in beeld met de letter erbij ('antwoord c: vroeg vinden, en soms voorkómen', 'antwoord b: bij ongeveer vier' enz.). In de html staat alleen `SPELERFIX_MARK`. Er staan geen merktekens van `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` of `microteken.py`. → Die scripts draaien (met `--check`) en daarna opnieuw nakijken. De tags staan al als 'antwoord x: <inhoud>', dus bij Vragen uit blijft dan alleen de inhoud staan.

2. **Vraagkaarten q05, q13, q16 en q20, onthullen** (`los/q05_003.00`, `q13_003.00`, `q16_003.00`, `q20_003.00`): de uitleg heeft drie regels. De derde regel loopt onder de rand van het groene kader door, tot tegen de onderkant van het beeld. q10 en q23 (twee regels) passen wel. → Het kader laten meegroeien en 50–60 px hoger zetten, of de uitleg in `film.json` inkorten tot twee regels.

3. **Eindkaart** (`los/end_008.80`): zes kernzinnen in plaats van drie (C5: 'three key sentences with an annotatiehaak'). Het blok wordt daardoor een muur van tekst. → Terug naar drie zinnen, bijvoorbeeld (1) vroeg vinden, soms voorkómen; (2) ongunstige uitslag ≠ kanker, en de afkapwaarde is een afweging; (3) Wilson en Jungner wegen, de Gezondheidsraad adviseert, de minister beslist, jij kiest.

4. **s04 8,4–11,5 s** (`los/s04_008.40`): 'meestal onschuldig' (goud) ligt over de meta-regel 'BOBBELTJE IN DE DARMWAND' van het label 'poliep'. Daar staat tekst op tekst. → 'meestal onschuldig' bij de rechter twee poliepen zetten (x ≥ 1480), of de onderregel van 'poliep' weghalen zodra 'meestal onschuldig' komt.

5. **s04 10,8–15 s** (`los/s04_010.80`, `contact/s04_011.21`): de pil 'vaak meer dan 10 jaar' ligt over de meta 'DIKKE DARM · DOORSNEDE · VEREENVOUDIGD, NIET OP SCHAAL'. De meta leest daardoor als doorgestreept. → De pil 40 px hoger, of in de darm tussen poliep en kanker (de tijdpijl uit het storyboard: poliep → 'vaak > 10 jaar' → kanker).

6. **s06 0–14,5 s, vraag q05 en H1** (`los/s06_000.05`, `s06_010.40`): de envelop is onder 'vroeg vinden' geschoven, maar ligt óp de kaarttitel en dekt de laatste letter ('vroeg vinde'). → De envelop onder of naast de kaart, niet over de titel.

7. **s06 7–9 s** (`los/s06_007.50`): het witte label 'kijkonderzoek' ligt over de rechteronderhoek van de kaart 'voorkómen' (bij het sigaretpictogram) en over het begin van de groene boog. → Het label bij de scoop in de darm zetten (bijvoorbeeld onder de slang, links in de darm), niet tussen de kaarten.

8. **s06 8,8–14,5 s, 'poliep weg' en de groene boog** (`los/s06_010.40`, `contact/s06_013.88`): de poliep links (x ±760) verdwijnt, maar het label 'poliep weg · HIER GROEIT GEEN KANKER MEER' staat boven de poliep die nog wél zit (x ±1180). Het leest dus alsof die poliep weg is. De groene boog van 'vroeg vinden' naar 'voorkómen' (storyboard) valt achter de darm: alleen twee groene stompjes onder de kaarten zijn te zien. → Het label boven de lege plek van de weggehaalde poliep (eventueel met een stippelomtrek van wat er zat). De boog bóven de darm tekenen, tussen de twee kaarten, en zichtbaar op 'voorkómen' (13,9 s).

9. **s07 12,9–18 s** (`los/s07_017.50`): het kaartje Wilson & Jungner krimpt naar linksonder, maar de regel 'een arts en een chemicus' blijft op de oude plek staan en ligt dwars over de tien vinkjes. → De regel meenemen in het kaartje of wegfaden vóór het krimpen. (Hij wordt ook niet gezegd. Hij mag blijven, maar mag niets bedekken.)

10. **s08 3,5–9 s** (`los/s08_003.50`, `los/s08_007.40`): op de kaart 'Gezondheidsraad' raakt de meta-regel 'ADVIES: BEGINNEN, MET EEN ONTLASTINGSTEST' links en rechts de rand van het kader. Vanaf ±6 s staat er een buisje óp het woord 'ONTLASTINGSTEST'. → De kaart 80 px breder (of de meta op twee regels) en het buisje naast de kaart.

11. **s08 21–36 s** (`los/s08_023.20`, `s08_027.80`): het gouden label 'afkapwaarde' boven de streep ligt over de meta '· NIET TE ZIEN' van de balk 'BLOED IN DE ONTLASTING'. Daar staat tekst op tekst. Dat blijft zo tot het eind van s08. → 'afkapwaarde' boven de balk vrijzetten (meta 30 px hoger of korter, of het label ónder de balk bij de streep).

12. **s14 8,3–11 s** (`x/s14_010.30`, `los/s14_009.50`): op 'Maar een kleine tumor die weinig bloedt' staat het label 'kleine tumor · BLOEDT WEINIG' midden in de zeef, over de gouden bollen en het raster. Pas later zakt het naar onder de balk. → Het label vanaf het begin naast het koraal bolletje en buiten de zeef (rechts ernaast), en mee laten zakken.

13. **s19 0–3,1 s** (`contact/s19_001.90`, `los/s19_001.20`): op 'Terug naar de lijst van negentienachtenzestig' is het scherm leeg. Er staan alleen de meta 'WILSON & JUNGNER · 1968 · VIER VAN DE TIEN CRITERIA' en de tijdlijn. Het storyboard vraagt het kaartje '1968' met de tien vinkjes (uit s07). Het eerste criterium komt pas op 3,1 s. → Op t = 0 het kaartje met de tien lege vinkjes tonen (zoals in s07). Daaruit groeien dan de vier criteria.

14. **s19 13,1–17 s** (`uit/g0254.49_s19_14.50`, `g0255.49_s19_15.50`, `los/s19_013.60`): de stem zegt 'Een MRI-scan van de hersenen ziet veel meer' (13,1–15,6 s), maar het brein en het label 'MRI-scan van de hersenen · ZIET VEEL MEER' staan tot ±17 s gedimd op ±35 % (BEELDAFSPRAKEN: wat de stem noemt, is nooit gedimd). → Brein en label op 'MRI-scan' (13,4 s) op volle sterkte. Daarna mogen de stippen verschijnen op 'veel meer'.

## KAN (beter)

1. **Titelkaart en kop**: het meta noemt 'HAVO · VWO · GEZONDHEIDSWETENSCHAPPEN · BEVOLKINGSONDERZOEK', maar niet de serie en het nummer ('WAT WORD JIJ? · 2/3'). Dat komt uit de engine, dus het is hetzelfde punt als bij film 1.
2. **s04 1,9–4,8 s**: het label 'poliep · BOBBELTJE IN DE DARMWAND' komt pas ±2,5 s na 'poliep' (1,9 s). → Op 'poliep'.
3. **s06 1,4–4,4 s**: 'Het onderzoek vindt kanker vaak voordat iemand iets merkt'. De koraal vlek uit s04 is weg, en de scoop vindt alleen een poliep. → Kort de kankervlek laten oplichten in het licht van de scoop.
4. **s07 4–7 s en s12 3–7 s**: Farid wijst met een gestrekte arm naar lege ruimte. In s12 3,9 s ligt zijn hand ook op het label 'goed'. Het storyboard zegt dat hij 'zijn hand op de streep' houdt. → Hand op de afkapschuif of de tijdlijn, anders de arm omlaag.
5. **s08 9,6–16 s (keuken)**: de tijdlijn onderin is hier weg, terwijl hij in de keuken van s24/s25 wel staat. Dat is inconsistent met de vertelvorm 'één tijdlijn die groeit'. → Hier ook tonen, of in alle decorscènes weglaten.
6. **s08 9,6–16 s**: 'u beslist zelf' ligt over het schilderijtje en '2019: iedereen van 55 t/m 75' over het raam, als lichte pil zonder donkere achtergrond (C5: op drukke achtergronden een donkere pil). Opa Henk houdt het buisje niet vast: het staat op tafel (storyboard: 'Opa Henk houdt het buisje vast'). → Donkere pil, en het buisje in zijn hand.
7. **Buisje (titel, s08, s24, s25)**: het buisje heeft een bruine bodem, wat als ontlasting leest (storyboard: 'geen ontlasting'). → Een neutrale grijze of lichte vloeistof.
8. **s11 2,2–3,6 s**: de vier koraal poppetjes komen ±1,3 s na 'vier'. De groene vinkjes bij 'grote poliep · weg' komen pas rond 11 s ('weghaalt' 8,3 s). → Op het woord.
9. **s14 11,9–15,8 s**: 'veel meer mensen dan verwacht' heeft geen beeld (de zeef staat stil). → Bijvoorbeeld de stapel oker bollen in de zeef kort laten groeien met een meta 'EERSTE MAANDEN: 10,6 % ONGUNSTIG' (B41).
10. **s14 19,8–23,4 s**: de pil 'afkapwaarde omhoog' ligt op de tijdlijn over de stip JAN 2014. → 20 px hoger, of boven JUL 2014 uitgelijnd.
11. **s15 16,2–17,3 s**: de gouden pijl van 'door het onderzoek?' wijst naar de linkeronderhoek van de grafiek (as en oorsprong), niet naar de dalende lijn. → De pijlpunt op de lijn.
12. **s17 4,5–6 s**: 'betere behandeling?' komt ±1 s na 'behandeling'. Het lijntje ervan loopt over het aslabel '100'. → Op het woord, en het lijntje boven de as.
13. **s17 25,1–28 s**: de twee sterftebalken zijn gelijk tot 'vijftien' (28,0 s). De stem zegt al op 25,1 s 'Daar daalde de sterfte'. → De balk 'met uitnodiging' op 'daalde' laten krimpen.
14. **s18 13,7–28 s**: het kostenkaartje raakt met zijn onderrand de gouden markering 2022 op de tijdlijn. → 20 px hoger.
15. **s19 en s21**: het brein is paars gevuld (BEELDAFSPRAKEN 28 okt: minder paars, paars alleen met betekenis). De MRI-scanner uit het storyboard (label 'MRI · GEEN RÖNTGENSTRALING') ontbreekt. Alleen de pil staat er. → Neutrale of teal tint, en eventueel een kleine scanner als lijnpictogram.
16. **s21 16,0–18,5 s**: '± 2 % verwijd bloedvat' komt ±1 s na het woord. '± 7 % stil herseninfarct' wordt niet genoemd. Dat mag als beeld, maar komt dan tegelijk met de rest.
17. **s21 29–34 s**: de pil 'Gezondheidsraad: nut niet aangetoond' ligt op de tijdlijn, over de lijn tussen JUL 2014 en 2015. → 20 px hoger.
18. **s24 5,1–6,5 s**: 'minister VWS' komt ±1 s na 'minister' (5,3 s). → Op het woord.
19. **s24 13–16 s**: 'u beslist zelf' is half doorzichtig over het raam en slecht leesbaar. → Donkere pil, volle sterkte op 'beslist' (15,2 s).
20. **s24 13–16 s en s25 (keuken)**: de tijdlijn loopt over de voeten en de stoelpoten van Opa Henk, en de stip 2022 valt op zijn schoen. De jaartallen van de tijdlijn staan in de hele film op y ≈ 870–885, precies op de grens van de ondertitelzone. → In de keuken Opa Henk 40 px hoger of de tijdlijn met een donkere band. De labels 10–15 px hoger.
21. **Beeld op t = 0**: s07 (0–1,5 s, alleen Farid), s15 (0–2,9 s, alleen Farid en de tijdlijn) en s24 (0–1,8 s, alleen de antwoordregel) beginnen bijna leeg. → Het eerste element op t = 0.

Ter info, geen punt: de zeefmetafoor werkt. Na het antwoord zijn de mazen zichtbaar groter, staan er minder oker bollen in de zeef en meer teal eronder, en glipt het koraal bolletje erdoor. De weegschaal in s18 helt de goede kant op (voordelen omlaag). In H2 kloppen de vijf oker poppetjes op 100 met 'vijf op de honderd'.

## Verwerkt (31 okt 2026, maker)

MOET
- 1: niet hier; de hoofdsessie draait `scripts/antwoordtekst.py` in de repo. Alle antwoordregels staan als `regel()` via `antwoord(ctx, 'antwoord x: …')`.
- 2: uitleg q05, q10, q13, q16 en q20 ingekort tot ≤ 176 tekens (twee regels); alle zes passen in het kader (gecontroleerd met onthulde vraagkaarten).
- 3: eindkaart drie kernzinnen (`script_opname.md` en `segments.json`; opname ongewijzigd).
- 4: 'meestal onschuldig' bij de rechter poliepen; de meta onder 'poliep' valt weg zodra het verschijnt.
- 5: pil 'vaak meer dan 10 jaar' boven de darm-meta (y 384).
- 6: envelop onder de kaart 'vroeg vinden', niet meer over de titel.
- 7: label 'kijkonderzoek' in de darm bij de scoop.
- 8: 'poliep weg' op de lege plek van de weggehaalde poliep, met stippelomtrek; de groene boog loopt bóven de kaarten van 'vroeg vinden' naar 'voorkómen', op 'Zo wordt …'.
- 9: 'een arts en een chemicus' fadet vóór het krimpen.
- 10: kaart Gezondheidsraad breder (760), buisje onder de kaart.
- 11: meta 'BLOED IN DE ONTLASTING · NIET TE ZIEN' rechts van de afkapstreep.
- 12: label 'kleine tumor' rechts naast de zeef, met dun lijntje naar het bolletje; zakt mee.
- 13: s19 begint met de kaart Wilson & Jungner met tien lege vakjes; die maakt plaats voor de vier criteria.
- 14: brein en label op 'MRI' op volle sterkte (geen dimming).

KAN verwerkt: 2 (label op 'poliep'), 3 (kankervlek 'vroeg gevonden' bij 'kanker'), 4 (Farid wijst niet meer naar leegte in s07/s12), 5 en 6 (tijdlijn ook in de keuken van s08, donkere pillen, buisje in de hand van Opa Henk), 7 (buisje neutraal grijs), 8 (koraal op 'vier'), 9 (pil 'eerste maanden: 10,6 % ongunstig, meer dan verwacht', B41), 10 en 17 (tijdlijnlabels 22 px hoger), 11 (pijl wijst naar de dalende lijn), 12 (op het woord, lijntje boven de as), 13 (balk krimpt op 'daalde'), 14 (kostenkaart hoger), 15 (brein neutraal grijs in s01/s19/s21/s25), 16 (vondsten op het woord, infarct tegelijk met gezwel), 18 ('minister VWS' op het woord), 19 (donkere pil op 'beslist'), 20 (tijdlijn 14 px hoger, labels 6 px hoger, donkere band onder de tijdlijn in de keukenscènes), 21 (s07 weegschaal op t = 0, s15 stadiumbalken gedimd op t = 0, s24 Gezondheidsraad gedimd op t = 0).
Niet verwerkt: KAN 1 (engine, zelfde als film 1); KAN 15 MRI-scanner als pictogram (alleen de pil 'MRI · geen röntgenstraling').

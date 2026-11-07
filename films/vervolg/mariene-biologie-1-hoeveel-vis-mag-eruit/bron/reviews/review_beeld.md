# Frisse beeldreview · mb1 *Hoeveel vis mag eruit?* (7 nov 2026)

Bekeken: contactsheet van alle segmenten (`FIVE=1`, 5 stills per alinea, plus hoofdstukkaarten, vraagkaarten, titel en eindkaart), losse stills op volle grootte bij twijfel (s03 @ 6,4 · s05 @ 2,5 / 5 / 12,7 · s06 @ 2,8 / 8,5 / 14,1 / 17,8 / 26,2 · s07 @ 25,0–28,2 in stappen van 0,5 s · s09 @ 9,8 / 11,5 / 12,5 / 27,9 / 29,6 · s10 @ 7,1 / 22,0 · s13 @ 31,0 · s15 @ 22,6 / 25 · s16 @ 13,2 / 18,5 · s18 @ 0,6 / 8,5 / 12,6 / 21,0 / 39,0 · s19 @ 2,7 / 18,9 / 20 · s20 @ 16 · s21), het testvel `testvel_mb1.png` en de lettergroottes in `scenes_mb1.js`. Getoetst aan BEELDAFSPRAKEN, REEKS-marien (beeldafspraken), PROMPT v13 Part C (typografie, C9, C10) en BOUWEN.md. Niets gewijzigd.

## MOET

1. **s07 @ 25,3–27,9 s · leeg scherm.** De modelzee met het kaartje 'aanwas' fadet weg bij "Ze zet drie van die zeeën naast elkaar:" en de drie vakken komen pas bij "bijna leeg" (± 27,9 s). Ongeveer 2,5 s staat er alleen het MODEL-label op navy, terwijl de stem doorpraat. Dat is een leeg scherm (punt 1 van de brief, C10 'image already filled'). **Voorstel:** laat de drie vakken al op 'zet' of 'drie' inkomen terwijl de modelzee wegschuift, en laat de modelzee in het middelste vak overgaan ('half vol'), of houd de modelzee staan tot het eerste vak er is.

2. **s05 @ 2,5–25 s en s06 @ 19–28 s · aslabel over de getallen.** 'LEEFTIJD (JAAR) →' staat precies op de asgetallen: in s05 lees je "5 LEEFTIJ6 (JAAR) 7", in de staafgrafiek van s06 "LEE7TIJD (JA8R)". Overlap van tekst (punt 4; Part C: labels nooit over andere labels). **Voorstel:** aslabel onder de getallen zetten (± 40 px lager) of rechts naast het eind van de as, buiten het bereik van de getallen.

3. **s09 @ 9,8–30 s · 'TE WEINIG VOEDSEL' onder de vissen.** In het volle vak ligt het koraal label achter de bovenste rij schollen en is half onleesbaar. Ook in s05 @ 5 s loopt 'LANGZAAM · 6 JAAR' tegen de staart van de rechter schol. **Voorstel:** label boven het vak zetten (naast 'vol'), of in een donkere pil boven de vissen tekenen; in s05 het label links van de curve of de schollen 80 px naar rechts.

4. **Hele film · tekst kleiner dan 28 px.** Part C: niets op het beeld kleiner dan 28 px (Meta). In `scenes_mb1.js` staan veel `metaText` op 22–26 px: asgetallen en 'VOORBEELD' (s05/s06, 24), 'SNEL GEGROEID · 4 JAAR' en 'LANGZAAM · 6 JAAR' (24), 'NOAA · DFO' (s06, 24), 'N = POPULATIE IN TON' / 'N/1000 = DEEL DAT VOL IS' (s09, 24), 'KERN · UIT HET EI', 'DUIZENDEN OTOLIETEN', 'TE WEINIG OUDERS/VOEDSEL', 'HALFVOLLE MODELZEE' (26), 'KLEINE KUSTVISSERIJ' (s18, 24) en de bronregel 'DFO 2024 · CANADEES PARLEMENT 1998 · HUTCHINGS 2000' (s18, **22 px**, staat bovendien over de onderrand van de kaart, s18 @ 21 s). Op een telefoon dwars zijn deze niet te lezen. **Voorstel:** alles naar minimaal 28 px; de bronregel van s18 inkorten (bv. 'DFO 2024 · HUTCHINGS 2000', rest in het docentdeel) en binnen de kaart rechtsonder of boven de kaart zetten.

## KAN

1. **s18 @ 0–2 s · geen antwoordlabel.** Bij vraag 1–4 staat na de vraag een groen label 'antwoord x: …' (s05, s09, s12, s15); bij vraag 5 niet: de kaart 'na 1977' loopt gewoon door. **Voorstel:** ook hier `antwoord(ctx, 'antwoord b: een paar jaar', 1)` boven de kaart, voor de consistentie.

2. **s18 @ 39 s · grafiek 'HOE LANG DICHT?'.** De kabeljauwbalk zegt '32 jaar dicht', terwijl de stem net zei dat een kleine kustvisserij doorging. **Voorstel:** kop 'HOE LANG GROTE VISSERIJ DICHT?' of bij kabeljauw een dunne strook 'kleine kustvisserij' in de balk.

3. **s18 @ 0,6–12 s en s16 @ 24 s · slagboom op land.** De slagboom 'dicht 1977 / open 1983' staat op Ierland en de Atlantische kant, niet in de Noordzee. **Voorstel:** slagboom in de Noordzee, onder het haringblok (bv. tussen Schotland en Noorwegen).

4. **s16 @ 7,9–13,2 s · boten over het haringblok.** De drie kotters staan half op de rand van het blok (bovenrand en onderrand), wat rommelig leest op een telefoon. **Voorstel:** boten naast het blok op het water, of pas in beeld bij 'harder gevist' (zoals @ 18,5 s, waar het wel rustig is).

5. **s13 @ 10–31 s · legenda 'ZEE VERANDERT' zonder iets in de grafiek.** De teal golf in de legenda heeft geen tegenhanger in de grafiek (wel 'onzeker' als grijze band en 'als het tegenvalt' als stippellijn). **Voorstel:** de draagkracht (eindpunt van de heuvel op de as) laten heen en weer schuiven met een teal golfje, of de regel uit de legenda halen.

6. **s06 @ 5–10 s · leeg dagboekpaneel.** Het paneel 'HAAR DAGBOEK' staat ± 5 s leeg naast de otoliet voor 'jaar 1' verschijnt. **Voorstel:** paneel pas laten inkomen bij 'Elke smalle ring', of jaar 1 al bij 'In het midden'.

7. **s07 @ 10,5 s · kaartje 'Plek genoeg? · de S-curve' met ▶.** Het afspeel-icoontje oogt als een klikbare link naar een andere film; de reeksbrief wil geen verwijzing naar andere onderdelen van de site, alleen één zin terugverwijzing. **Voorstel:** ▶ weghalen, gewoon 'PLEK GENOEG?' als Meta-kopje boven de curve.

8. **Cold open s01 @ 11,9 s ↔ recap s19 @ 2,7 s · twee formuleringen.** De puzzelkaart zegt 'Minder vangen = meer vis?', de recapkaart 'Te veel vangen = minder vis?'. **Voorstel:** in de recap dezelfde kaart als in de cold open terug laten komen (herkenning), eventueel met een groen vinkje.

9. **s03 @ 6,4 s · 'ONDERZOEKSSCHIP · ELKE ZOMER'.** Mono-label hangt los over de reling van het decor, laag contrast. **Voorstel:** in een donkere pil (Part C) of onder de meetplank.

10. **s10 @ 22 s · tellen klopt nog niet.** Tijdens de vraag liggen er 8 schollicoontjes (= 200 ton bij 25 ton per icoon) in de zee, in s12 @ 1 s zijn het er 14 (± 325 ton). Het net is nog bezig, maar een leerling die telt, ziet twee getallen. **Voorstel:** bij de vraag de zee al op 13 icoontjes laten staan (325 ton), of de vissen pas in s12 laten verdwijnen.

11. **s18 @ 21 s · kabeljauw over Newfoundland.** De kabeljauw ligt deels op het land. **Voorstel:** 120 px naar rechts, op de Grand Banks.

## Goed

Schol klopt overal (beide ogen boven, oranje vlekken, kop rechts, op schaal op de meetplank: staartpunt op 30 cm); otoliet klein met een zoomcirkel naast de kop, groot alleen 'onder de binoculair'; het dagboek met vier schollen die groeien is sterk en past precies bij "Vier ringen"; de drie modelzeeën met '+80 / +125 / +0' op het moment dat de getallen klinken, de heuvel met de som op het scherm en MODEL/VOORBEELD overal waar het script dat belooft; de biomassablokken van de haring zijn eerlijk (oppervlak 2 mln → < 50 000 → ± 1 mln ton klopt ongeveer); antwoordlabels staan steeds na de vraag; geen namen, geen wijslijnen, geen korrel, decor alleen aan dek en in het lab; alleen castpersonages (Sam, de mariene bioloog, figurant Joost), gezichten heel en niet doorzichtig; niets onder y ≈ 880 behalve ondertitels.

## Verwerkt (7 nov 2026)

**MOET**
1. s07 leeg scherm: de drie modelzeeën komen nu achter elkaar in vanaf 'zet' (± 25 s). Er is geen leeg navy meer tussen de modelzee en 'bijna leeg' (still s07 @ 26 nagekeken).
2. Aslabels over de getallen (s05, s06): nieuwe hulp `assenM` in teken_mb1.js. De x-aslabel staat 82 px onder de as, onder de getallen, op 28 px. Gebruikt in s05, s06 en de S-curve.
3. 'TE WEINIG VOEDSEL' en 'TE WEINIG OUDERS' staan nu boven de vakken, naast 'vol' en 'bijna leeg'. In s05 staan de schollen 110 px verder naar rechts en staat 'LANGZAAM · 6 JAAR' onder de curve, vrij van de staart.
4. Tekst ≥ 28 px: alle `metaText` en `metaA` in scenes_mb1.js staan op ≥ 28 px (controle met grep: 0 treffers onder 28). In teken_mb1.js ook de asgetallen en -labels van de heuvel, 'DRAAGKRACHT', 'JAAR' en het MODEL-label. De bronregel van s18 is ingekort tot 'DFO 2024 · HUTCHINGS 2000' en staat binnen de kaart rechtsonder; Canadees parlement 1998 staat in het docentdeel. 'DICKEY-COLLAS E.A. 2010' staat ook binnen de kaart. Niet aangepast: de ondertitels en de vraagkaarten (die komen uit de engine) en de cm-cijfers op de meetplank, die horen bij de tekening.

**KAN**
1. Gedaan: groen antwoordlabel 'antwoord b: een paar jaar' in een donkere pil rechtsboven op de kaart (s18, tot de zoom naar Newfoundland).
2. Gedaan: de kop is nu 'HOE LANG WAS DE GROTE VISSERIJ DICHT?'. Onder de kabeljauwbalk loopt een teal strook vanaf 1998 met 'KLEINE KUSTVISSERIJ GING DOOR' (B19: kustvissers de meeste jaren sinds 1998).
3. Gedaan: de slagboom staat in de Noordzee, onder het haringblok (s16 'dicht 1977', s18 'open 1983'). Labels die verschoven zijn: '> 2 MILJOEN TON HARING' en '± 1 MILJOEN TON / WEINIG OUDERS' staan nu boven het blok.
4. Gedaan: de drie kotters liggen op het water naast het blok (bij Denemarken, Noorwegen en de zuidelijke Noordzee).
5. Gedaan: de teal golf in de legenda heet nu 'DRAAGKRACHT?'. Het eindpunt van de heuvel op de x-as (teal punt met golfje) schuift heen en weer zolang 'de zee verandert', dus de heuvel ademt mee. 'ALS HET TEGENVALT' heet nu 'TEGENVALLER' (past op 28 px).
6. Gedaan: het dagboekpaneel komt pas in bij 'Elke smalle ring'.
7. Gedaan: het ▶-kaartje is weg; er staat een Meta-kopje 'PLEK GENOEG? · DE S-CURVE' boven de curve.
8. Gedaan: de recapkaart is nu dezelfde als in de cold open, 'Minder vangen = meer vis?'. Bij 'op den duur' komt er een groen vinkje bij met 'OP DEN DUUR: JA, ALS ER TE VEEL WERD GEVANGEN'.
9. Gedaan: 'ONDERZOEKSSCHIP · ELKE ZOMER' staat in een donkere pil onder de bovenste meetplank.
10. Gedaan: bij de grote vangst groeit de aanwas van 125 ton al mee terug (500 + 125 − 300 = 325). Tijdens de vraag liggen er 13 icoontjes, net als in s12. Het label 'vangst: 300 ton' en het vraagteken staan rechts naast de zee.
11. Gedaan: de kabeljauw ligt op de Grand Banks, oostelijk van Newfoundland, en de slagboom staat in zee.

Gebouwd en nagekeken: de volledige contactsheet en losse stills van s03, s05, s06, s07, s09, s10, s13, s16, s18 en s19. cuecheck geeft geen meldingen.

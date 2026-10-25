# Review v1 — fo3 Hoe lang al dood? (frisse reviewer, 25 okt 2026)

**Samenvatting.** Goede rode draad (twee grenzen, zandlopers, ondergrens uit de larven) en een respectvolle toon. De getallen voor lijkvlekken en lijkstijfheid kloppen met Osmosis/Wikipedia en de forensisch arts klopt met KNMG (3 jaar, profielopleiding). 937 woorden ≈ 6,7 min.
Er is één echte vakfout: het slap worden van een spier komt niet doordat actine en myosine worden geknipt. Verder twee interne tegenspraken: 'legt eitjes kort na het overlijden' en een 'venster' zonder marge. H1 legt het plateau niet uit (leerdoel 1).
De graaddagensom klopt rekenkundig, maar het bronmodel geeft bij 15 °C ± 80 graaddagen (11,5 dag), niet 70. Het venster van 10–12 dagen blijft daardoor wel staan. Het antwoord na de laatste vraag leunt bij Vragen uit op de vraagzin.

## MOET

1. **H2: 'Die enzymen knippen eiwitten in stukjes, ook actine en myosine.'** Bij het slap worden van een spier blijven de dikke en dunne filamenten heel. Afgebroken worden vooral de eiwitten die de vezel bij elkaar houden (titine, desmine, troponine, de Z-schijf), vooral door calpaïnen in het cytoplasma, niet uit blaasjes (Texas A&M, 'Resolution of rigor': 'no visible degradation of thick and thin filaments'). Fix: 'Die enzymen knippen eiwitten in stukjes, ook de eiwitten die actine en myosine op hun plek houden. Dan laat de spier los.' Ook in beeld: knip de verbindingen (Z-schijf), niet de filamenten, en houd 'vereenvoudigd' bij de blaasjes.
2. **Recap: 'Ze legt eitjes kort na het overlijden.'** Dat spreekt H4 tegen ('binnen … soms pas later') en ondergraaft de hele ondergrens-redenering. Fix: 'Ze legt meestal snel eitjes, soms pas later.'
3. **Recap: 'In haar rapport staat: tussen tien en twaalf dagen geleden.'** Direct daarvoor zegt de film 'Elke klok heeft een marge'. De ondergrens van tien dagen is zelf een schatting, met een vereenvoudigd model; het volledige model geeft bij 15 °C 11,5 dag. Fix: 'ongeveer tien tot twaalf dagen geleden', en in beeld een vage linkerrand van het venster.
4. **H4, graaddagen: '70' geldt niet bij 15 °C in het eigen bronmodel.** `reken.py` met de parameters van Grassberger & Reiter geeft 80 graaddagen bij 15 °C (11,5 dag), 79 bij 16 °C, 68 bij 20 °C en 64 bij 22 °C. De 70 is afgerond uit 18–22 °C en wordt dan bij 15 °C gebruikt. Bij lage temperaturen klopt een vast aantal graaddagen dus minder goed. Fix, het lichtst: laat de som staan, zeg 'in dit vereenvoudigde model' en zet in getallen.md de echte modelwaarde bij 15 °C (80 → 11,5 dag) met de opmerking dat het venster van 10–12 dagen dan nog klopt. Fix, het zuiverst: rond af op 80 → 80 : 7 ≈ 11 dagen, venster 11–12; bij 22 °C 80 : 14 ≈ 6. Ga ook na binnen welk bereik Grassberger & Reiter hebben gemeten; 15 °C ligt aan de onderkant. Ander bron-tegengeluid: Marchenko-gegevens (jad-83) noemen voor *L. sericata* een drempel van 9,5 °C. Zet dat in getallen.md; '8 graden in dit model' kan blijven.
5. **H1: het plateau wordt alleen benoemd, niet verklaard (leerdoel 1, why-test).** Fix: één zin: 'Eerst blijft de kern een tijdje bijna even warm: de warmte moet eerst van binnen naar de huid. Dat heet het plateau.'
6. **H1-vraag, optie (a) 'eerst bijna niet, daarna steeds trager' is onlogisch** (van 'bijna niet' naar 'trager'?) en klopt niet met de curve: plateau, dan sneller, dan steeds trager. Fix: (a) 'eerst bijna niet, dan snel, daarna steeds trager'. Houd de lengte van (b) en (c) gelijk, bijvoorbeeld (c) 'eerst heel snel, daarna weer een beetje warmer'.
7. **Vragen uit, laatste vraag:** het antwoord in de recap ('Tweeëntwintig min acht is veertien …') leunt op de vraagzin 'Stel dat het in de kamer tweeëntwintig graden was geweest'. Valt die weg, dan hangt de som in de lucht. Fix: begin het antwoord met 'Bij tweeëntwintig graden: tweeëntwintig min acht is veertien. Zeventig gedeeld door veertien is vijf dagen.' Of zet 'Stel dat …' vóór de vraagzin, als vertelling die blijft staan.
8. **Wie rekent de larven uit? Kim, de forensisch arts (H3), of 'een entomoloog' (recap)?** In de recap duikt die entomoloog ineens op. Fix: in H3 'Een forensisch entomoloog, een insectendeskundige, rekent uit hoe oud ze zijn', en in de recap 'Kim combineert dat met haar eigen bevindingen'. Dan klopt de rol van de forensisch arts ook met de werkelijkheid.

## KAN

9. **Soortkeuze:** binnenshuis in oktober bij 15 °C is in Nederland vooral de blauwe bromvlieg (*Calliphora vicina*) te verwachten; *Lucilia sericata* houdt van warmte en zon. Het script noemt geen soort ('deze bromvlieg'), dus het is geen fout. Zet het wel in de docentnotitie, of reken met *C. vicina* (getallen.md: 32 dagen bij 15 °C tot de volwassen vlieg).
10. **H1, Henssge:** 'Kim gebruikt daarom het nomogram' wekt de indruk dat ze dat hier doet, terwijl het lichaam na dagen al op kamertemperatuur is. Fix: 'Een forensisch arts gebruikt daarom het nomogram van Henssge … Hier is dat al te laat.'
11. **'Daarna is het lichaam even warm als de kamer'** (na het eerste etmaal) is te stellig. Met 22 graden verschil en een afvlakkende curve duurt dat eerder één à twee dagen. Fix: 'Na een dag of twee …' of 'ongeveer'.
12. **Lijkvlekken: het waarom ontbreekt** (waarom zijn ze na een halve dag niet meer weg te drukken?). Optioneel: 'dan is het bloed uit de vaten in het weefsel gelekt'.
13. **H2: 'In je darm leven miljarden bacteriën'** is een onderschatting (orde 10¹³: tienduizenden miljarden). Fix: 'ontelbaar veel bacteriën'. Ook 'Bij leven blijven ze daar' → 'Bij leven blijven ze vooral daar'.
14. **'Na dagen zijn alle drie de zandlopers leeg. Dan blijft er één over.'** Ook de mate van afbraak gebruikt een forensisch arts als ruwe klok. Fix: 'Dan blijft vooral de vlieg over.'
15. **Laatste vraag, afleider (c) 'drie dagen, want het is zeven graden warmer'** is niet geloofwaardig (geen leerling rekent zo). Fix: (c) 'zeven dagen, want het is zeven graden warmer'. Dat is de lineaire denkfout 'een graad = een dag'. (b) bevat de hele som en is daardoor te raden. Fix: (b) 'vijf dagen, want er komt per dag twee keer zoveel bij'.
16. **Cold-openvraag:** (a) 'een vlieg leeft even lang als …' is niet geloofwaardig. Fix: (a) 'aan hoeveel vliegen er in de kamer zijn'. Dat is een plausibele misconceptie (meer vliegen = langer dood).
17. **Cold open: 47 woorden ≈ 20 s**, met pauzes iets erboven. Fix: schrap 'Stagiair Bilal ziet een vlieg op de vensterbank' en laat dat alleen in beeld zien.
18. **Buurvrouw:** 'Elke zondag koffie' en 'twaalf dagen niet gezien' betekent dat ze één zondag al gemist heeft voordat ze belde. Prima, maar zeg het: 'Vorige zondag deed hij niet open.' Dat versterkt ook het menselijke moment.
19. **PMI:** de reeksbrief heeft 'postmortaal interval' als gedeeld begrip, maar de film noemt het nergens. Fix: in H1 'De tijd sinds het overlijden heet het postmortaal interval.' Of alleen op de eindkaart.
20. **H1 is lang: 278 woorden ≈ 2 min**, met twee vragen. Overweeg 'Een trui, een deken, tocht of koorts …' in te korten tot 'Kleding, tocht of koorts veranderen de curve.'
21. **Opleidingen:** een forensisch arts werkt meestal bij de GGD of een forensisch-medische organisatie, niet 'bij de politie, het NFI of een particulier lab' (dat geldt voor de andere twee routes). Fix: splits de werkzin. Enschede vóór Amsterdam (dichtbij eerst). 'Het hbo Forensisch Onderzoek' → 'De hbo-opleiding Forensisch Onderzoek'. Vaste zin gelijk aan fo1/fo2.
22. **'Een paar graden kouder maakt de klok veel trager'**: het gaat om zeven graden. Fix: 'Een paar graden verschil maakt de klok veel sneller of trager.'
23. **Larvenmassa:** een grote groep larven kan zelf 10–20 °C warmer worden dan de kamer (getallen.md). Dat staat niet in het script, wat goed is, maar zet het in het docentdeel als reden waarom 'larve = kamertemperatuur' een vereenvoudiging is.

## Verwerkt (script_v2.md, 25 okt 2026)
- 1 MOET ✓ H2: 'Eigen enzymen … knippen ook de eiwitten die de spiervezel bij elkaar houden. Actine en myosine blijven liggen, maar hun houvast is weg.' Blaasjes/lysosomen weggelaten (calpaïnen zitten in het cytoplasma); beeld: Z-schijven en verbindingen geknipt, filamenten heel. Bron in getallen.md (Texas A&M).
- 2 MOET ✓ recap: 'Ze legt meestal snel eitjes, soms pas later.'
- 3 MOET ✓ 'ongeveer elf tot veertien dagen geleden', vage linkerrand in beeld.
- 4 MOET ✓ zuiverste fix: 80 graaddagen ('vereenvoudigd model') → 15 °C ruim 11 dagen (model 11,5), 22 °C bijna 6; bovengrens naar twee weken zodat het venster blijft. Bereik G&R (geen data < 15 °C) en drempel 9,5 °C (Marchenko) in getallen.md.
- 5 MOET ✓ plateau verklaard ('de warmte moet eerst van binnen naar de huid').
- 6 MOET ✓ opties H1: 'eerst bijna niet, dan snel, daarna steeds trager' · (c) 'daarna weer een beetje warmer'.
- 7 MOET ✓ situatie 22 graden en 14 per dag in de vertelling vóór de vraagzin; antwoord begint met 'Bij tweeëntwintig graden …'.
- 8 MOET ✓ forensisch entomoloog in H3 in één zin ingevoerd; Kim combineert in de recap.
- 9 KAN ✓ alleen als docentnotitie in getallen.md (*C. vicina*); film noemt geen soort.
- 10 KAN ✓ 'Een forensisch arts gebruikt daarom het nomogram … Hier is die klok dus al stil.'
- 11 KAN ✓ 'Na een dag of twee'.
- 12 KAN ✓ 'dan vallen de bloedcellen uiteen en kleuren de vaatwand' (bron simplyforensic; niet 'in het weefsel gelekt').
- 13 KAN ✓ 'ontelbaar veel', 'vooral daar'.
- 14 KAN ✓ 'De afbraak geeft Kim een grove schatting … Dan blijft vooral de vlieg over.'
- 15 KAN ✓ deels: (b) 'bijna zes dagen, want er komt twee keer zoveel bij'; (c) 'ruim vier dagen, want het is zeven graden warmer' (= 11 − 7, de denkfout 'een graad = een dag') in plaats van 'zeven dagen', omdat 7 niet uit die denkfout volgt bij een uitgangspunt van 11.
- 16 KAN ✓ (a) 'aan hoeveel vliegen er in de kamer rondvliegen'.
- 17 KAN ✓ Bilal-zin uit de cold open (alleen in beeld); 45 woorden ≈ 19 s.
- 18 KAN ✓ 'Vorige zondag deed hij niet open.'
- 19 KAN ✓ postmortaal interval in H1 en op de eindkaart.
- 20 KAN ✓ 'Kleding, tocht of koorts veranderen de curve.'; nomogramzin ingekort.
- 21 KAN ✓ vaste opleidingszin van de reeks (Enschede vóór Amsterdam, 'hbo-opleiding'); werkzin NFI/politie/lab vóór de forensisch-artszin; GGD alleen op het kaartje (niet zelf gecontroleerd).
- 22 KAN ✓ 'Een paar graden verschil maakt de klok veel sneller of trager.'
- 23 KAN ✓ docentpunt in getallen.md, niet in het script.

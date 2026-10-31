# Frisse beeldreview tu1 · Welke plant waar? (31 okt 2026)

Bekeken: contactvel (61 stills) plus ingezoomde momenten in s01, s03, s05–s07, s09, s11–s13, s15, s16, s18, s19, s21, s22 en s24. `cuecheck.py`: geen meldingen. Tijden zijn segmenttijden in seconden.

## MOET

1. **MOET · s15 3,0–6,0** · Beeld en stem spreken elkaar tegen bij de kern van de film. Bij 'In basische grond is er wel ijzer' (3,0) staat de pH-pin nog op 5,0. Bij 5,4 springt hij naar 7,8, maar het label 'ijzer opgelost · WORDT OPGENOMEN' en de Fe-deeltjes die door het wortelhaar worden opgenomen blijven staan. Zo lijkt het alsof ijzer bij pH 7,8 gewoon wordt opgenomen. **Oplossing:** begin s15 direct op 7,8 met losse Fe-deeltjes en het label 'ijzer · IS ER WEL'. Laat ze op 'vaste korreltjes' (6,6) klonteren en zet dan 'NIET OP TE NEMEN' erbij. Wil je zuur/opgenomen tonen, doe dat dan als korte vergelijking vóór 3,0 met de pin op 5,0, en haal het label 'wordt opgenomen' weg zodra de pin verschuift.
   Verwerkt: s15 begint op pH 7,8 (pin vast), losse Fe-deeltjes met label 'ijzer · IS ER WEL', geen opname meer; op 'verandert' klonteren ze, dan 'vaste korreltjes · NIET OP TE NEMEN'.
2. **MOET · s13 4,6–7,0** · De grote uitlezing 'pH 5,0' staat naast de struik op het terras, niet bij de inzet 'EERDER · IN DE KAS'. Hij blijft nog staan als de stem 'Hier, naast het terras' zegt (5,2–6,9), dus de kijker leest 5,0 als de meting hier. Het metalabel 'MOEDERPLANT' eronder valt deels achter de zak mest. **Oplossing:** zet de 5,0-uitlezing in of tegen de kasinzet linksboven en laat hem samen met de inzet weggaan op 'Hier'. De meter naast de struik blijft leeg tot 'zeven'.
   Verwerkt: 5,0-uitlezing staat nu in de kasinzet linksboven en gaat samen met de inzet weg op 'Hier'; meter naast de struik toont alleen 7,8 vanaf 'acht'.
3. **MOET · s05 0–14 (blad-label)** · 'LEERACHTIG · GAVE RAND' staat al in het antwoordbeeld. Volgens feitenreview M2 hoort 'leerachtig' alleen op de eindtegel, en 'gave rand' botst met de sleuteltegel 'rand glad'. **Oplossing:** metaregel bij blad → 'VORM · RAND · STAND'. Of laat de metaregel weg en zet alleen 'blad'.
   Verwerkt: metaregel nu 'VORM · RAND · STAND'.
4. **MOET · s24 (eindkaart)** · Er staat letterlijk '---' als regel in beeld, onder het scheidingsstreepje. **Oplossing:** haal '---' uit `lines` van s24 in film.json of filmdata, of laat de kaart dat als scheiding tekenen in plaats van als tekst.
   Verwerkt: '---' uit lines van s24 in segments.json gehaald; eindkaart zonder die regel.
5. **MOET · s12 0–10 (scheuren)** · De wortels van de drie pollen hangen onder de dunne bruine grondstrook in de lucht (navy). Dat is tegen de beeldafspraak 'wortels alleen binnen de bodemband'. **Oplossing:** teken een echte bodemband (± 180 px hoog) waarin de wortels blijven. Of toon de pol als uitgegraven kluit (wortels in een bruine kluit) boven een grondlijn.
   Verwerkt: echte bodemband van 240 px ('GROND'); pollen en wortels blijven daarin, vorken steken in de grond.
6. **MOET · s12 10,5–12,5** · De chips 'ongeslachtelijk: klonen' en '▶ Celdeling' liggen over de stek (stengel en blad) rechts, tussen 'OUDER' en 'STEK'. **Oplossing:** zet beide chips onder de drie pollen, links van x ≈ 1300, of onder de genbalk van de stek.
   Verwerkt: chips 'ongeslachtelijk: klonen' en 'Celdeling' links van de stek (x ≈ 1080–1250); stek + genbalkjes naar x 1680; genbalkjes van de pollen boven de pollen.
7. **MOET · s01 9,0–9,8** · Het naamlabel 'Hovenier Jeroen' valt over de rechterrand van de zoomcirkel. Tegelijk faden de vraagkaart 'Waarom gaat een rododendron dood…' en de zoomcirkel over elkaar, met twee lagen tekst en beeld door elkaar. **Oplossing:** laat de zoomcirkel weg zijn vóór de namen verschijnen (uit op 'hovenier', 7,0), en laat de vraagkaart pas daarna komen ('Waarom', 9,5).
   Verwerkt: zoomcirkel weg op 'hovenier' (7,0), vraagkaart pas op 'Waarom'.
8. **MOET · s13 8,6–15** · De pin '7,8' op de pH-balk dekt het woord 'basisch' af. **Oplossing:** zet 'zuur' en 'basisch' onder de as, naast 4 en 8, of zet de pinnen hoger dan de woorden.
   Verwerkt: 'zuur' en 'basisch' staan nu links en rechts naast de balk, niet meer onder de pinnen.
9. **MOET · s09 16–29** · Het 'jonge takje' staat los in de lucht naast Jeroen, bijna zo hoog als hij (± 1,2 m, terwijl een stek 10–15 cm is). Het komt ook niet van de moederplant. De verhoudingen zijn misleidend. **Oplossing:** laat Jeroen een klein takje van een tak van de moederplant knippen (rand van de struik in beeld). Toon de vergrote stek daarna in een zoomcirkel met meta 'VERGROOT', en zet het takje niet los op personageschaal.
   Verwerkt: Jeroen knipt een klein takje van de moederplant (kas + struik links in beeld); de stek staat in een zoomcirkel 'STEK · VERGROOT'.
10. **MOET · s07 3,5–4,2** · Opa Henk fadet in als een donker, halfdoorzichtig figuur (gezicht en jas grijs, decor schijnt erdoor). Dat is tegen de afspraak 'nooit halfdoorzichtige mensen'. **Oplossing:** laat hem in zijaanzicht binnenlopen (`loopIn`), of laat hem direct op volle sterkte verschijnen.
   Verwerkt: Opa Henk (en Lotte) verschijnen direct op volle sterkte.
11. **MOET · s19/s21 (plattegrond en plantlijst)** · Meta 'HUIS' staat op 22 px en 'PLANT · AANTAL · WAAROM' op 26 px. Dat is onder het minimum van 28 px (C1). **Oplossing:** beide naar 28 px.
   Verwerkt: 'HUIS' en 'PLANT · AANTAL · WAAROM' op 28 px.

## KAN

12. **KAN · s07 5–9** · Het kaartje van Opa Henk 'NOG DRIE, NET ZO MOOI' uit het storyboard ontbreekt, terwijl de stem het zegt. Jeroen staat ook niet in 'zijn' kas. **Oplossing:** zet het kaartje erbij op 'drie' (7,0) en Jeroen klein bij de kasdeur.
   Verwerkt (deels): kaartje 'Nog drie, net zo mooi!' blijft nu staan tot 'zaadjes'. Niet gedaan: Jeroen bij de kasdeur (scène wordt dan te vol met drie personen naast de struik).
13. **KAN · s07 9–15** · De arm van Lotte en de zaaddoos liggen over de romp van Opa Henk. De bruine doos leest als een handschoen. **Oplossing:** schuif Lotte ± 120 px naar rechts. Teken de doos als open, gesprongen doosvrucht met zaadjes, vóór haar eigen lijf.
   Verwerkt (deels): Lotte 120 px naar rechts, niet meer over Opa Henk. Niet gedaan: zaaddoos opnieuw tekenen (zichtbaar klein in de hand; meer werk).
14. **KAN · s09 1,7–8** · De stamper staat er los, zonder bloem eromheen. Een leerling herkent 'stuifmeel op de stamper' zo moeilijk. **Oplossing:** teken een gedimde rododendronbloem (kroon en meeldraden op 35 %) en zet de stamper erin in focus.
   Niet gedaan: bloem rond de stamper is een nieuwe tekening; te veel werk voor nu.
15. **KAN · s09 8,5–9,5** · Als de genbalkjes samenkomen, schuiven 'UIT HET STUIFMEEL', 'NIEUWE MIX' en 'UIT DE EICEL' over elkaar. **Oplossing:** laat de twee oude labels uitfaden vóór 'NIEUWE MIX' verschijnt.
   Verwerkt: 'NIEUWE MIX' verschijnt pas 0,6 s na 'samen', als de twee oude labels weg zijn.
16. **KAN · s09 23,7–24,5** · 'een paar blijven zitten' is nog bijna onzichtbaar terwijl de stem het zegt. Het wordt pas om 25,5 vol. **Oplossing:** start het label op 'paar' (23,9).
   Verwerkt: label start op 'paar' (fade 0,3 s), staat nu naast de zoomcirkel.
17. **KAN · s11 19–25** · De kap loopt door het label 'auxine · PLANTENHORMOON' heen. **Oplossing:** laat het auxinelabel uitfaden op 'kap' (19,4), of zet het links naast de kap.
   Verwerkt: auxinelabel links naast de kap en uit op 'kap'.
18. **KAN · s12 12–15** · De 'struik van de tuineigenaar' is helemaal groen, terwijl hij in de cold open en in H3 geel jong blad heeft. 'GESTEKT OP DE KWEKERIJ' blijft tot ± 15 s heel vaag. **Oplossing:** geef de struik `chl` zoals in H3 en laat het kaartje op 'kloon' vol staan.
   Verwerkt: struik van de tuineigenaar met geel jong blad (chl 1); 'GESTEKT OP DE KWEKERIJ' vol vanaf 'kloon'.
19. **KAN · s13 2,5–4,8** · In de kasinzet staat de moederplant in een oranje pot. In H2 en in de gesplitste beelden staat hij als grote struik in de kasgrond. **Oplossing:** gebruik dezelfde tekening als in H2, verkleind.
   Verwerkt: kasinzet toont de moederplant als struik in de kasgrond (zelfde tekening als H2), geen pot.
20. **KAN · s15 7–13** · Het label 'vaste korreltjes · NIET OP TE NEMEN' ligt over de korrels. Het grote beige blok rechts in het grondvak (de wortel) heeft geen label en leest als een muur. **Oplossing:** zet het label boven het grondvak en geef het blok het label 'wortel' (of teken hem rond met een wortelhaar).
   Verwerkt: label onder in het grondvak, los van de korrels; blok heeft label 'wortel'.
21. **KAN · s16 2–7** · De puntjes van de gedachtewolk 'meer suiker' wijzen naar links, weg van het hoofd van Lotte. Optie c (derde kaartje) toont geen verbranding. **Oplossing:** laat de puntjes vanaf haar hoofd naar de wolk lopen, en geef het gele blad op kaart c een bruine, verbrande rand.
   Verwerkt: gedachtewolk boven Lottes hoofd; blad op kaart c met duidelijk bruine verbrande rand.
22. **KAN · s18 0–8** · De 'ton met duigen' leest als vijf losse buizen. **Oplossing:** één ton met gebogen omtrek, hoepels over alle duigen, en de duig 'ijzer' het laagst.
   Niet gedaan: ton opnieuw tekenen als één gebogen ton is meer werk; hoepels lopen nu wel over alle duigen (onderste hoepel lager).
23. **KAN · s21 14–33** · 'sering · VERDRAAGT KALK' steekt buiten de rand van de plattegrond. 'rododendron · VERHOOGD BED · ZURE GROND' loopt over de rand van de halfschaduw-ellips en over het zonvlak. Het kader van de plantlijst raakt het haar van Lotte. De aantallen 12 en 5 komen niet uit getallen.md. **Oplossing:** labels binnen het kader en buiten de zones zetten (zo nodig op twee regels). Lijstkader 40 px hoger of personages lager. Meta 'VOORBEELD' bij de lijst.
   Verwerkt: sering- en rododendronlabel binnen de plattegrond en buiten de zones; lijstkader 50 px hoger; meta 'VOORBEELD' bij de lijst.
24. **KAN · s22 3–21** · In de recap staat de rododendron in het verhoogde bed vooraan links bij het terras, terwijl het plan zei: 'achterin, in de halfschaduw'. De sering rechts leest als een hosta (grote bladeren op lange stelen). **Oplossing:** zet het bed achterin bij de boom (kleiner, op de grasrand) en teken de sering als struik met houtige takken en tegenoverstaande hartvormige bladeren, zoals in H1.
   Verwerkt: verhoogd bed kleiner, achterin op de grasrand ('ACHTERIN · HALFSCHADUW'); sering nu als struik van seringtwijgen (tegenoverstaand hartvormig blad), met label.
25. **KAN · s06 22–28 / s03 0–4,5 / s19 0–12** · Het dikke boek heeft geen 'FLORA' en Jeroen bladert niet. Het 'naam'-kaartje in s03 is 4 s lang een lege zwarte doos met één chip, en het naamlabel van Lotte komt in s03 opnieuw (ze heeft het al in s01). De plattegrond is in s19 de eerste 12 s bijna leeg, zonder overgang vanuit de tuin. **Oplossing:** 'FLORA' op het boek en Jeroens hand bij de bladzijde. Kaartje 'naam' pas op 'nodig heeft' tonen, samen met de inhoud. Lotte-label in s03 weg. Een korte overvloei van het tuindecor naar de plattegrond.
   Verwerkt: label 'FLORA' bij het open boek; naamkaart in s03 pas op 'nodig' (chip 'naam' blijft); Lotte-label in s03 weg; s19 begint met het tuindecor dat in ± 1,2 s overvloeit naar de plattegrond. Niet gedaan: Jeroens hand bij de bladzijde (pose bestaat niet).

Noot (geen actie): naamlabels in beeld wijken af van prompt v13 B4, maar de keuring van Kamiel (a1, script v2.1) staat ze toe. Ze komen alleen voor bij de eerste verschijning (behalve Lotte in s03, zie 25).

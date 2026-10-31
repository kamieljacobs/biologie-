# Frisse beeldreview — vdb · Een burger zonder koe (31 okt 2026)

Basis: verse contactsheet (73 stills) plus inzoomstills, `cuecheck.py` zonder meldingen. Getoetst aan BEELDAFSPRAKEN.md, prompt v13 C1/C8/C10, script_v2 en de keuring in BRIEF-bouwen.md. Ik heb niets aan de film veranderd.

## MOET

1. MOET · s28 eindkaart (hele scène) — Onder de laatste regel staat een losse regel `---`, een overblijfsel van de markdown-scheidingslijn uit het script. Oplossing: de `---` uit de eindkaarttekst halen (filmdata/segments) en opnieuw bouwen.
   Verwerkt: `---` uit de eindkaartregels in segments.json gehaald; eindkaart gecontroleerd.

2. MOET · s04 0–8 s / s06 9–19 s — Bij de kudde 'vleesrunderen' zie je drie even grote runderen. Het 'vleeskalf' staat op 0,95 × de maat van een volwassen dier en is dus niet als kalf te herkennen. Een moederkoe is niet te onderscheiden. Bij 'En ook moederkoeien en kalveren eten mee' wijst de gestippelde ellips 'zij eten ook' daardoor op twee gewone koeien. Oplossing: kalf op ± 0,5–0,55 × maat, naast een moederkoe (bv. uier zichtbaar of kalf dat drinkt), en de ellips alleen om dat paar.
   Verwerkt: kalf op 0,55 × maat naast de grazende moederkoe (uier zichtbaar); ellips alleen om dat paar, met label 'moederkoe met kalf'.

3. MOET · s10 ± 19–22 s — Bij 'In hele erwten en bonen zitten stoffen die de eiwitscharen in je darm remmen' staat het label 'REMMERS · IN HELE PEULVRUCHTEN' nog bijna onzichtbaar (pas rond 23 s vol). De groene blokjes zweven boven erwt en boon, maar raken de schaar niet: van remmen zie je niets. Oplossing: het label vol tonen op 'stoffen' of 'remmen'. Laat twee of drie groene blokjes naar de schaar vliegen en tussen de bladen gaan zitten, zodat die stokt. Schaar en blokjes iets groter, de schaar is nu een klein wit icoontje.
   Verwerkt: label op 'stoffen'; drie grotere groene blokjes vliegen naar de schaar (2,2×) en die klemt vast bij 'remmen'; label 'eiwitschaar · GEREMD'.

4. MOET · s15 13,5–16,5 s — De stem zegt 'verhit het boven honderd graden' (± 14 s), maar de meter '± 100–175 °C' is dan nog gedimd en komt pas bij 'onder druk' (± 17 s) in beeld (afspraak Ecologie v2: een meter toont het getal op het moment dat het genoemd wordt). Oplossing: temperatuurmeter op cue 'honderd' laten verschijnen en de drukmeter op 'druk'.
   Verwerkt: temperatuurmeter verschijnt en loopt op vanaf 'verhit' (vlak voor 'honderd'); drukmeter blijft op 'druk'.

5. MOET · s17 ± 20–24 s — De pil 'weggespoeld' staat onder het kader 'HITTE', terwijl het wegspoelen in het vat met pH 4,5 gebeurt. Zo lijkt de hitte de remmers weg te spoelen. Oplossing: 'weggespoeld' bij het vat zetten (bv. met een teal stroompje dat de blokjes eruit voert). Bij het kader 'HITTE' het label 'valt uit elkaar' of 'kapot'.
   Verwerkt: 'weggespoeld' boven het vat, met teal stroompijlen uit het vat; bij HITTE het label 'VALT UIT ELKAAR'.

6. MOET · s24 ± 15,8–16,6 s — Bij de overgang naar 'Gram eiwit zegt dus niet alles' vloeien de twee etiketten, 'niet verrijkt', 'veel zout' en het ontwerpblad een halve seconde door elkaar heen: tekst over tekst. Oplossing: eerst de etiketlaag helemaal weg, dan het ontwerpblad erin (`wissel()`-principe, één laag tegelijk).
   Verwerkt: etiketlaag eerst helemaal weg, daarna pas het ontwerpblad (geen overlap meer).

7. MOET · s26 0–± 16 s (recap) — Het ontwerpblad komt binnen met de kop 'burger 3.0', maar alle vier de vakken staan op '?'. GRONDSTOF blijft '?' tot 'land', heel laat in de recap. Aan het eind van H4 was het blad al helemaal gevuld, dus dit spreekt het vorige beeld tegen. Een volledig ingevulde burger 3.0 met lege vakken klopt niet. Oplossing: het blad gevuld laten binnenkomen (zoals in s24) en per zin alleen het besproken vak goud laten oplichten. Of zet de kop op 'burger ?' tot alles gevuld is.
   Verwerkt: blad komt gevuld binnen, per zin licht alleen het besproken vak goud op.

8. MOET · s18 7–14 s — De twee gouden zoomlijnen van de cirkel 'MODEL · VEREENVOUDIGD' lopen dwars door het label 'koele, platte uitgang' heen. Vanaf ± 10 s valt het ontwerpblad ook over de trechter van de extruder. Oplossing: het label onder de uitgang zetten (onder de buis, boven y 880) of de cirkel zo verplaatsen dat de lijnen het label niet kruisen. Het ontwerpblad links hoger of kleiner, los van de trechter.

## KAN
   Verwerkt: label 'koele, platte uitgang' onder de buis (y 830), 'eiwitrijk/waterrijk' rechts van de cirkel, ontwerpblad kleiner en midden-boven, los van trechter en zoomlijnen.

9. KAN · s21 0–22 s — De badge 'B12' is paars. Paars staat voor kern, erfelijkheid en hormonen ('minder paars', 28 okt). Oplossing: B12 in oker (voedsel) of koraal met een eigen vorm; het molecuultje in de pens dezelfde kleur geven.
   Verwerkt: B12-badge en molecuultje in oker.

10. KAN · s13 ± 9–20 s — Na het mengen staan de staven 'erwt + tarwe' allemaal (bijna) vol, maar de scorestaaf blijft onder rund. Wie goed kijkt, ziet een tegenspraak. Oplossing: de laagste staaf (MET of LYS) zichtbaar net onder de stippellijn laten eindigen, met een klein goud randje.
   Verwerkt: in 'erwt + tarwe' blijft MET goud omrand met een stippellijn net boven de vulling (nog net niet vol).

11. KAN · s13 12–15 s — Bij 'Meer erwteneiwit geeft meer eiwit, maar elke gram blijft even goed' komt het label 'PER GRAM: ZELFDE SCORE' pas rond 15 s. Oplossing: het label op 'even goed' laten verschijnen.
   Verwerkt: label op 'even goed'.

12. KAN · s11 0–8 s — De pil 'per gram eiwit' zweeft los rechts van de staven en hoort nergens bij. Oplossing: hem als kop boven de scorestaven zetten ('SCORE PER GRAM'), of weglaten tot die staven er zijn.
   Verwerkt: pil weg; kop van de scorestaven heet nu 'SCORE PER GRAM'.

13. KAN · s17 ± 15–24 s — De tekst 'pH 4,5' in het vat valt precies op de waterlijn (de lijn loopt door de letters). Oplossing: het label 20 px hoger, boven het water.
   Verwerkt: 'pH 4,5' boven de waterlijn.

14. KAN · s06 5–19 s — De metatekst 'O.A.' staat tegen de pil 'mest (onverteerd)' aan. Van 5 tot 7 s staat hij ook alleen in beeld, nog voordat er een pil is. Oplossing: 'O.A.' 16 px meer ruimte geven en tegelijk met de eerste pil tonen.
   Verwerkt: 'O.A.' verschijnt op 'mest' en staat apart boven de eerste pil; kiplabel onder de kip gezet.

15. KAN · s04 0–5 s — Bij 'in het voer zit honderd gram eiwit' is de bak nog leeg. De 100 blokjes en 'voereiwit 100 g' komen pas bij de volgende zin. Oplossing: de bak laten vullen op 'honderd gram'.
   Verwerkt: de bak vult zich al vanaf ± 0,6 s vóór 'honderd'.

16. KAN · s14 0–3 s — Bij 'Een erwt is voor ongeveer een vijfde eiwit' staat het label 'eiwit ± 1/5' er nog niet; het komt pas na de zin. Oplossing: het label op 'vijfde' tonen.
   Verwerkt: label verschijnt op 'ongeveer' (eerste zin).

17. KAN · s01 7–11 s — Bij 'op het etiket staat bij allebei evenveel eiwit' staat alleen bij de hamburger een (gedimd) etiketje '20 G EIWIT'. Het tweede komt pas bij de puzzelkaart. Oplossing: beide etiketjes op 'allebei' tonen.
   Verwerkt: beide etiketjes op 'etiket'.

18. KAN · s01 0–6 s — De naamlabels hebben elk een andere vorm: 'Levensmiddelentechnoloog Lars' op één regel zonder statusregel, en 'Noor' met 'STAGIAIR' eronder. Oplossing: 'Lars' met daaronder 'LEVENSMIDDELENTECHNOLOOG', net als Noor (tweeregelig label, C-labelregel).
   Verwerkt: 'Lars' met daaronder 'LEVENSMIDDELENTECHNOLOOG', zelfde vorm als Noor.

19. KAN · s02 titel — Rechts boven het etiket van de erwtenburger staat een los meta-woord 'STEL', dat zonder context zweeft. Oplossing: 'STEL · PER 100 G' boven het midden tussen beide etiketten zetten, zoals in de cold open, of weglaten.
   Verwerkt: 'STEL · PER 100 G' boven het midden tussen de etiketten.

20. KAN · s03 0–4 s — Bij 'Eerst waarom de levensmiddelentechnoloog dit werk doet' staan een lege, gestippelde balk en twee burgers zonder labels: een vrij leeg en onaf beeld. Oplossing: de balk direct gevuld laten groeien op 'Ruim de helft', en tot dan het beeld met de twee burgers en hun namen houden.
   Verwerkt: de burgers krijgen vanaf t = 0 hun namen. De lege stippelbalk blijft tot 'Ruim de helft' staan (bewust: daar groeit hij).

21. KAN · s25 15–23 s — Op de tegel kweekvlees staat 'KOE, VARKEN …', maar alleen een koe is getekend. Oplossing: er een klein varken naast tekenen (castboek- of bibliotheekstijl), of het label op 'UIT EEN DIER' houden.
   Verwerkt: label 'BV. EEN KOE' (geen varken getekend).

22. KAN · s19 7–9 s — Het storyboard en de keuring willen dat Lars na 'pakt zijn lijstje' naar het lege vak 'ERBIJ?' wijst. Nu staat hij alleen met het klembord. Oplossing: een kort wijsgebaar met het klembord, of het kleine ontwerpblad met 'ERBIJ ?' dat oplicht.
   Verwerkt: bij 'pakt zijn lijstje' verschijnt het kleine ontwerpblad met het vak ERBIJ goud.

23. KAN · s22 0–9 s — Volgens het storyboard heeft Noor de pakjes in haar handen. Nu wijst ze naar twee grote kaarten naast het schap. Dat werkt, maar het menselijke moment 'zelf kiezen in de winkel' wordt zo zwakker. Oplossing: de pakjes kleiner, één in elke hand, en de etiketten groot als inzet.
   Niet gedaan: pakjes in de handen vraagt nieuwe grijphouding en tekenwerk; huidige versie werkt volgens de review.

24. KAN · s24 / s26 — Het ontwerpblad zegt in s24 'B12 · ijzer · weinig zout' en in de recap 'B12, ijzer / LET OP ZOUT'. Oplossing: één formulering gebruiken (bv. 'B12, ijzer · weinig zout').
   Verwerkt: overal 'B12, ijzer · weinig zout'.


Eigen open punten (bouwer): kiplabel H1 onder de kip gezet; s15 koekjeskaart hoger zodat 'zacht en korrelig' niet over de rand valt; zak op tafel zonder klein etiket, met leesbaar label 'erwteneiwit · POEDER'.

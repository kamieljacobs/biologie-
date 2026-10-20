# Eindreview "Je brein vult het in" (frisse blik, 20 okt 2026)

Bekeken: script_v2.md, alle 63 stills in qa/, film.py, sections.html, BEELDAFSPRAKEN.md.

## MOET

1. **s05_015.03 vs s09_007.48: gele vlek en blinde vlek staan op dezelfde plek.** In H1 zit het gele stipje (gele vlek) precies waar de oogzenuw het oog verlaat. In H2 staat daar de blinde vlek. Dat is vakinhoudelijk fout, en de leerling kan de twee nu door elkaar halen. *Fix:* laat de oogzenuw iets naast de as uittreden (naar de neuskant) en zet de gele vlek op de as, recht tegenover de pupil. Gebruik in s09 hetzelfde oog.

2. **s10_002–008 / s12: de schaduwillusie werkt niet goed.** A en B zijn allebei 120 grijs (gemeten), dat klopt. Maar je herkent geen schaduw: er loopt een diagonale band met harde, vegerige verlopen over een paar vakjes (r0c2, r1c1, r2c0, r3c4, r4c2), en die zien eruit als renderfouten. De cilinder staat rechtsboven, ver van B. "B ligt in de schaduw" is dus niet te zien, en A en B lijken in de still ongeveer even licht. *Fix:* teken de schaduw zoals bij Adelson: één zachte, egale schaduwvlek die vanaf de cilinder over B valt, met de cilinder naast B. Haal de losse verloopjes per vakje weg.

3. **s14_016.03 en s14_024.57: geen gorilla in beeld.** Op de zin "Halverwege loopt er iemand in een gorillapak door het beeld" staan alleen spelers en ballen. Ook de scènebeschrijving in het script noemt een gorilla. *Fix:* laat de gorilla tijdens die zin en "slaat op zijn borst" door het veld lopen. Als het weglaten bewust is, zeg dat dan in beeld ("jij zag hem ook niet?").

4. **q02, q07, q11, q15, q19: het goede antwoord is steeds b.** Bij q02, q07 en q19 is b ook steeds de langste en meest uitgewerkte optie. Na twee vragen raadt een leerling dat. *Fix:* wissel de volgorde (bv. q07 → a, q11 → c, q15 → c, q19 → a). Pas `correct` in film.py, het "Antwoord x" in het script en het groene label "Antwoord b" in beeld aan, en maak de opties ongeveer even lang.

5. **s13_007.79 / s13_018.71: label "gezichtsgebied" staat onder de hersenstam**, niet bij de gele vlek. Je leest het nu als het label van de hersenstam. Dat strijdt met BEELDAFSPRAKEN (naam direct bij het onderdeel). *Fix:* zet de naam direct naast of onder de gele ovaal, links van de hersenstam. Dezelfde ovaal in s04_006 is goed.

6. **film.py, begrip "kaart van het lichaam": "het handgebied ligt naast het gezichtsgebied".** "Gezichtsgebied" is in deze film al het begrip voor het gezichtsherkenningsgebied in de slaapkwab. Hier bedoel je het gevoelsgebied van het gezicht. Twee betekenissen voor één begrip verwarren de leerling. *Fix:* "…het gebied voor de hand ligt naast het gebied voor het gezicht (gevoel in wang en lippen)". Neem dezelfde formulering over in het antwoord op checkvraag 4.

## KAN

7. **s01_010 / s03 / s13:** het stopcontact kijkt met zijn naar binnen gekantelde wenkbrauwen eerder boos dan geschrokken. *Fix:* hoge, gebogen wenkbrauwen.
8. **s01:** Sam staat naast de tafel, maar de tekst zegt "zit aan de keukentafel". *Fix:* laat hem zitten, of maak er "in de keuken" van. Ook in **s17** staat Lotte stil met haar telefoon, terwijl de tekst zegt "fietst". Zet haar op de fiets of maak het label "op weg naar school".
9. **s09_017.96:** met "één oog dicht" lukt de test niet. *Fix:* "linkeroog dicht · kijk met je rechteroog naar het kruisje · kom langzaam dichterbij".
10. **s05_006.26:** de chip "meer dan 100 miljoen" staat in beeld, maar het contrast met de "± 1 miljoen vezels" bij de zenuw ontbreekt. *Fix:* zet een tweede chip bij de zenuw.
11. **s04_009.25:** in de overgang liggen twee ogen over elkaar, met een vage tekst "wat komt er eigenlijk binnen?". *Fix:* een harde wissel of eerst uitfaden.
12. **s13_018.71:** de chip zegt "2 stippen boven een streep", maar onder de gaatjes zit een schroefje (rondje). *Fix:* "2 stippen boven een rondje" of "twee ogen en een mond".
13. **s13_028.69:** het vierde voorwerp (kruisvorm) is niet te herkennen. *Fix:* vervang het door iets bekends (koffiekop met schuim, voorkant van een auto).
14. **s16_026.07:** de tekst zegt "veel groter dan de knobbeltjes", maar de gorilla is ongeveer even groot als de stipjes. *Fix:* maak hem 3–4× groter (in het onderzoek was hij 48× zo groot als een knobbeltje).
15. **s14:** Daan en Yasmin hebben geen naam in beeld, Sam en Lotte wel. *Fix:* voeg naamlabels toe ("Daan · telt", "Yasmin · telt").
16. **s20_025.68:** "hand" past maar net in het versmalde vakje en raakt de rand. *Fix:* label boven het vakje of een kleinere letter.
17. **s20_039.38:** in de spiegelkist zijn beide handen ovalen, en je ziet niet wat de spiegel doet. *Fix:* teken handvormen en laat in het gestippelde vak de gespiegelde hand verschijnen en mee bewegen.
18. **s21_005.67:** het paneel rechts is leeg op "zien soms dingen die er niet zijn". De donkere vlek uit de scènebeschrijving is in het oog niet te zien. Ook staat er Engels in de chip in **s21_020** ("input"). *Fix:* zet een grijze vlek in het zichtveld en laat de bloemen meteen verschijnen. Verander de chip in "te weinig signalen → …".
19. **s22:** de recap toont "voorspelling + wat binnenkomt = wat je ziet" met lege vakken. In H1 was het een vergelijking, geen optelsom. Op de kaartjes in **s22_017** staat bij "illusie" het woord "invullen", terwijl de schaduwillusie over terugrekenen ging. *Fix:* vul de vakken ("verwacht: gezicht", "binnen: gaatjes + schroef"), gebruik "vergelijk" in plaats van "+" en zet op het illusiekaartje "terugrekenen".
20. **s23_016.05:** de pijl naar de master vertrekt alleen bij "biomedische wetenschappen". *Fix:* gebruik een accolade onder alle vier de opleidingen.
21. **sections.html:** geen checkvraag over de startvraag (pareidolie, gezichtsgebied na 0,2 s) en geen over Charles Bonnet. *Fix:* voeg een vraag toe: "Leg met het gezichtsgebied uit waarom Sam het gezicht blijft zien, ook al weet hij dat het plastic is (2p)."
22. **s24_004.50:** de groene haakzin heeft weinig contrast. *Fix:* maak hem lichter. Controleer ook of Noor (genoemd in de footer) echt in beeld komt. Het is misschien het gezichtje in s21_013, maar dat is te klein om te herkennen.

De vakinhoud in het script, de getallen in het docentdeel (Hadjikhani 165 ms, Drew 20/24, Simons & Chabris, Limakatso ±64%) en de volgorde op de lichaamskaart (voet–been–romp–arm–hand–gezicht–lippen) kloppen. Ondertitels vallen nergens over beeldtekst.

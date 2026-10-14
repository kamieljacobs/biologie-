# Eindreview — Suiker in balans (hormonen 2/5)

Bekeken: script_v2, film.py, alle contactsheets, ruim 25 losse stills, en voor elk vermoeden de scènecode met de woordtijden.

## Punten

1. **Blokkerend: s14, 6,0 s en verder.** Bij "Insuline omlaag, glucagon omhoog" verschijnt de glucagonpijl nooit. In de code staat `q.on('glucagon', 2)`, maar in s14 komt "glucagon" maar één keer voor, dus de pijl blijft onzichtbaar. De stills op 13,5 en 20,7 tonen alleen insuline. Dit is het kernbeeld van H2. *Voorstel:* maak er `q.on('glucagon', 1)` van en geef de pijl de hormoonkleur goud in plaats van `C.groen`. Groen is in deze film de kleur van de alfacellen en van de band.

2. **Belangrijk: het regelkring-schema laat glucagon nergens zien (s11 vanaf 23,4 s, s24 vanaf 10,3 s).** De stem zegt "Daalt hij, dan duwt de kring hem omhoog" en "De alfacellen geven glucagon af", maar in het signaalvak staat alleen "insuline". In s24 ontbreekt bovendien het effectorvak tot 20,8 s: `nA[3] = q.on('glycogeen', 2)` is pas de tweede keer dat "glycogeen" valt. *Voorstel:* gebruik de bestaande optie `hormoon: 'beide'` (of laat het vak bij "daalt"/"alfacellen" wisselen naar glucagon). Laat de effector verschijnen bij "spieren" (13,5 s).

3. **Belangrijk: glycogeen staat in de hormoonkleur (s09, s12, s13).** De glycogeenketens zijn gouden zeshoeken. In s13 staat het woord "glycogeen" in teal, maar het plaatje eronder is goud, net als het glucagonvak ernaast. Daarmee werk je de misconceptie glucagon = glycogeen juist in de hand. *Voorstel:* teken glycogeen als een keten van teal glucose-zeshoeken.

4. **Belangrijk: insuline en glucose hebben dezelfde vorm (s07, s15, s23).** `hormoonVorm('insuline')` is een zeshoek, net als `glucoseDeeltje`. Ze verschillen alleen in kleur. Op de receptor in s23 (7,4 s) zit een gouden zeshoek tussen de teal zeshoeken, en dat is voor kleurenblinden niet te onderscheiden. *Voorstel:* geef insuline een eigen vorm, bijvoorbeeld een rondje of een dubbele keten (A- en B-keten).

5. **Belangrijk: cold open, s01 van 17 tot 28 s.** De telefoon met 5,8–5,9 mmol/L staat rechts naast "jij". Precies bij "Bij jou meet niemand iets" lijkt het dus alsof jouw waarde gemeten wordt. *Voorstel:* zet de telefoon bij Sanne, of laat hem bij "Bij jou" vervagen. Het vraagteken achter de twee personages is nu bijna onzichtbaar; maak het groter en zet het voorop.

6. **Klein: s09, 24–27 s.** De rode schuine streep voor "lever stopt met glucose afgeven" loopt dwars door de levercel en het glycogeen, zodat het lijkt alsof de voorraad wordt doorgestreept. *Voorstel:* teken een uitgaande glucosepijl uit de lever met een kruisje erop. Ook staat de tag "effectoren = doelorganen" uit (`* 0 + 0`) terwijl de stem "Dat zijn de effectoren" zegt (10,3 s). Zet hem weer aan; het begrip moet je zien.

7. **Klein: alle kringbeelden.** De pijlpunt rechts loopt door het label "SENSOR + REGELCENTRUM" (door de R). In s24, na de verschuiving (vanaf 31,6 s), raakt het effectorvak bijna de linker beeldrand, en de tag "Regelkring-tool op de site" raakt het insulinevak. *Voorstel:* zet het label 30 px hoger of laat de pijl eerder eindigen; neem in s24 een `rx` met minstens 80 px marge en zet de tag op y ≈ 890.

8. **Klein: s06, 29 s.** De aanwijslijn van "alfacellen" eindigt op een lichtokere bètacel. *Voorstel:* laat de lijn op een groene cel eindigen.

9. **Klein: s04 en s05.** In het bloedvat is glucose getekend als grijsblauwe rondjes in plaats van teal zeshoeken. In de dagcurve zitten verticale trapjes om 6:00 en 23:00, die eruitzien als meetfouten. *Voorstel:* gebruik `glucoseDeeltje` en maak de curve vloeiend.

10. **Klein: s17, 23–27 s.** De vier dextro's staan in een rij over Sannes arm en haar pomp heen; het is niet te zien dat ze ze eet. *Voorstel:* zet twee dextro's in haar hand of op tafel, los van de pomp. Algemeen: in de klasscène staan de personages in een T-houding en kruisen hun armen die van de buur (s01); laat de armen op tafel rusten.

11. **Klein: s22.** De staaf "type 2 (na jaren)" ligt onder "gezond". Bij type 2 is de insuline vooral te laag *ten opzichte van de vraag*, en in absolute zin vaak nog normaal. *Voorstel:* maak de staaf ongeveer even hoog als bij gezond en zet er "te weinig voor de vraag" bij. Het personage bij "erfelijkheid · overgewicht · weinig bewegen" is het "jij"-figuur uit de cold open. Kies een neutraal figuur, zodat het niet als "dit ben jij" leest.

12. **Klein: s23, 0–10 s.** Bij "Bij insulineresistentie bindt insuline nog wel…" staan alle GLUT4 nog in het membraan en stroomt de glucose binnen, omdat de scène met de gezonde toestand begint. *Voorstel:* begin direct met de zwakke toestand, of zet er een tag "gezond" bij en laat die bij "zwakker" omslaan.

13. **Klein: vragen en begrippen.** In q18 zijn de afleiders zwak ("kaas laat de bloedsuiker juist dalen"), en optie a valt op omdat die als enige de uitleg al bevat. *Voorstel:* gebruik als afleider "een boterham bevat geen koolhydraten" of "kaas remt de opname van glucose". In de begrippenlijst bij hypo staat "of veel sporten"; maak daarvan "bij mensen met diabetes: te veel insuline, of sporten zonder bijeten".

## Wat goed werkt
- De vakinhoud is correct en precies: lever als doelorgaan, hersenen zonder insuline, spierglycogeen alleen voor de spier zelf, nierdrempel, en bij type 2 eerst hyperinsulinemie en daarna uitputting. In de vwo-blokken: eiwit en receptor, exocytose van GLUT4, gefaciliteerde diffusie en de route via spiercontractie.
- De film klopt zonder de vwo-blokken: s14→s16 en s22→s24 sluiten goed op elkaar aan.
- Sanne wordt respectvol neergezet. Ze heeft regie ("pomp rekent mee", "doet gewoon mee met gym"), en de hypo is een concreet, herkenbaar moment.
- Het glucagon-glycogeen-moment (s13) en het suikerklontje met de klok (s04) zijn sterke, rustige beelden met één focuspunt.
- Ondertitels en tags blijven boven de ondertitelband. De vraagkaarten zijn helder.
- De checkvragen hebben examenniveau. Glucosetolerantietest P/Q/R is een sterke opgave.

**Oordeel:** na het oplossen van punt 1 publiceerbaar. Punten 2 tot en met 5 sterk aanbevolen vóór de release; dat zijn kleine codewijzigingen.

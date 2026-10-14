# Eindreview "Post voor iedereen" (hormonen 1/5)

## Wat goed werkt
- Sterke rode draad: de knal uit de cold open komt terug in H2 (bijniermerg), H3 (kraan dicht) en de recap. De puzzel wordt echt opgelost.
- De metaforen (brief tegenover folder, bak met kraan en afvoer) zijn helder en blijven consequent. De halveringsgrafiek met 50/25/12 is didactisch sterk.
- De kleuren zijn grotendeels consequent: zenuw paars, hormoondruppels goud, bloedvat rood. Het vwo-blok staat duidelijk apart met een paarse rand en het VWO-label. De havo-route klopt ook zonder vwo-blokken.
- De checkvragen zijn van goede examenstijl. Checkvraag 3 (400 pg/mL) sluit getalsmatig aan op de film.

## Bevindingen

**1. Belangrijk: grafiek zakt naar 0 in plaats van naar het rustniveau (s21, ca. 5–20 s; ook recap s23).**
De film zegt dat de piek "tien keer zo hoog" is als in rust. Dan ligt het rustniveau op ongeveer 10 (bij piek = 100), en dat is na ongeveer 6 minuten al bereikt. De zin "Pas na een minuut of tien is bijna alles weg" is daarmee vakinhoudelijk onjuist, want het rustniveau blijft.
*Voorstel:* teken een gestippelde lijn "rustniveau ≈ 10" en laat de curve daarnaar toe lopen. Verander de zin in "Na een minuut of tien is de adrenaline weer terug op het rustniveau."

**2. Belangrijk: de goede optie bij q02 valt op (vraagscherm q02).**
Optie b is de enige met "een stof in je bloed". Bovenin het scherm staat "HORMONEN 1/5", dus de leerling hoeft niet na te denken.
*Voorstel:* maak ook een afleider stofachtig, bijvoorbeeld: (c) "je hartspier heeft extra glucose opgenomen en verbruikt die eerst". Laat het reekslabel ook weg op het eerste vraagscherm.

**3. Belangrijk: de cold open klopt niet met de tekst (s01, 6–23 s).**
De tekst zegt "Je zit in de klas", "Achter je valt een stoel om" en "zit je rechtop". In beeld staat de figuur echter achter een tafel voor het bord, als een docent, met gespreide armen. De stoel valt vóór hem, rechtsonder. Bovendien steekt de stoel onder en achter de ondertitelband uit, wat tegen de norm ingaat.
*Voorstel:* zet een zittende leerling in een bank, zijaanzicht of van achteren gezien. Laat de stoel achter hem vallen, ruim boven de ondertitelband (y < 540).

**4. Belangrijk: de hypofyse lijkt een neus (s07, 7–26 s; ook s08 en s10).**
De klier is een gouden stip midden in een getekend gezicht, tussen de ogen en boven de mond. Leerlingen lezen dat als een neus of een oog.
*Voorstel:* teken het hoofd in zijaanzicht met de hersenen als vorm, of laat het gezicht weg zodra de klieren in beeld zijn.

**5. Belangrijk: de bijnieren lichten niet op op het moment dat ze genoemd worden (s07, 25,9 s: "Boven op je nieren liggen de bijnieren").**
De bijnieren blijven grijs en er staat geen label bij, terwijl het label voor hypofyse en schildklier er wel staat. De trigger `q.on('bijnieren')` (scenes.js r.145) komt te laat of mist.
*Voorstel:* zet de trigger op het begin van de zin.

**6. Klein (vakinhoud): "eierstokken / zaadballen – ONDER IN JE BUIK" (s08, 17,9 s).**
Zaadballen liggen niet in de buik.
*Voorstel:* gebruik het label "in je onderbuik / in de balzak", of alleen "onderin je romp".

**7. Klein: het label "merg" is onleesbaar (s10, 11,4 s).**
De goudkleurige druppels liggen over het woord. Daarnaast heeft het merg dezelfde goudtint als het hormoon, terwijl klieren oker horen te zijn.
*Voorstel:* maak het merg donkerder oker, zet het label buiten de cirkel en laat de druppels pas na het label verschijnen.

**8. Klein: het beeld loopt achter op de tekst bij de tabel (s06, 17,7 s).**
De tekst noemt "het hormoonstelsel is meestal trager", maar alleen de kolom zenuwstelsel staat in beeld.
*Voorstel:* laat de tweede kolom verschijnen op het woord "hormoonstelsel".

**9. Klein: het rustniveau springt en de badge loopt achter (s19–s20).**
In s19 staat de bak half vol, maar bij "in rust" in s20 is hij bijna leeg. De badge "in rust ≈ …" verschijnt pas bij "schiet omhoog".
*Voorstel:* houd één vast rustpeil aan (ongeveer een tiende van de piek) en laat de badge verschijnen op "in rust". Het getal "0,0000001 gram" is slecht leesbaar en is volgens de bronnen (20–60 ng/L) 2–5× te hoog. Zeg en toon liever "minder dan een tienmiljoenste gram".

**10. Klein: de grafiek loopt voor op de tekst (s21, 5,4 s).**
De curve is al tot 7 minuten getekend terwijl de tekst "na twee minuten vijftig" zegt, en het punt 50 ontbreekt dan nog. De asgetallen zijn erg klein.
*Voorstel:* teken de curve synchroon met de tekst en zet de markers op de woorden. Maak de as-labels ≥ 22 px op 1920.

**11. Klein: de "verrassing" van de tenen heeft geen beeld (s13, ca. 25 s).**
Alleen een tekstbadge laat zien dat de tenen reageren.
*Voorstel:* voeg een vijfde paneel toe met een voet en bleke tenen, omdat dit volgens het script het verrassingsmoment is.

**12. Klein: de q17-afleiders zijn zwak.**
Optie b spreekt de vraagtekst zelf tegen ("gaat wel door het membraan"), dus de leerling kan hem met logica wegstrepen in plaats van met biologie.
*Voorstel:* gebruik bijvoorbeeld "(b) in de cel, en het zet daar meteen enzymen aan".

**13. Klein: de eindkaart is alleen tekst.**
In het script staat "zenuw tegenover hormoon", maar de kleuren zijn niet gebruikt.
*Voorstel:* zet "Zenuwen" in paars en "Hormonen" in goud, met de envelop en de folder als icoon.

**14. Klein: de begrippenlijst wijkt af van de havo-route.**
Bij "hypothalamus … maakt zelf ook hormonen" (basis) wordt het tweede deel alleen in het vwo-blok gezegd.
*Voorstel:* zet die halve zin in de basis, of markeer hem als vwo.

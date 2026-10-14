# Eindreview "Het hart onder controle" (Transport 5/6)

Slug `5-het-hart-onder-controle`. Gesproken tekst 448 s (vwo) en 358 s (havo, alleen basis). Met titel, hoofdstukkaarten, drie vragen en eindkaart wordt dat ongeveer 8,7 min (vwo) en 7,2 min (havo).

## Wat ik controleerde
- Woordtijden: silalign op alle 15 takes. Bij s01, s09, s12, s13 en s15–s17 zijn niet alle leestekens aan een stilte gekoppeld. Ik heb de cue-woorden steekproefsgewijs op de sheets nagelopen, en daar valt het beeld goed op het woord.
- De `q.on`/`q.at`-telling (n-de voorkomen, ook als deel van een woord) heb ik nagerekend in de woordlijsten. Voorbeelden: 'sinusknoop' 3 in s09 (het startsein), 'schok' 2 en 3 in s18 (het analysemoment en "Raak … tijdens de schok"), 'slagader' 3 in s15 ("om slagaders"), 'hersenen' 2 in s08 en 'zuur' 2 in s12 (want 'zuurstof' telt als 1).
- Antwoorden komen niet te vroeg in beeld. Het antwoord op q02 (b) komt pas in s18. Bij q06 en q11 verschijnt het label "antwoord b" pas op "Antwoord bee". De maatbeker voor de sprint loopt in s05 wel al vol tot 20–25 L, maar dat staat in de vraag zelf ("vier tot vijf keer").
- Contactsheets: twee volledige rondes met FIVE=1 (sheet0–7), plus gerichte stills (sheetB, sheetH) en havo-stills rond de vwo-blokken (s08 → s10 en s12 → s15). Ik zag geen JS-fouten. Er staat geen tekst onder y = 900 (de ondertitelzone) en niets valt buiten beeld.

## Wat ik verbeterde (ronde 1 → 2)
- Titel: hartslagmeter en hart lagen over de titeltekst; ze staan nu verder naar rechts.
- s04: het label "al je bloed, één keer rond" overlapte de schaal van de maatbeker; het staat nu onder de bekers.
- s05: de armen van de sprinter stonden in een vreemde houding; die zijn gecorrigeerd.
- s07: de terugstroom van bloed uit de benen is nu een zichtbare ader met bloedstroom en het label "uit je benen". Het label bij de slagader viel links buiten beeld; dat is opgelost.
- s08: het schema met het autonome zenuwstelsel overlapte de hartslagmeter. Het is opnieuw opgezet: een box "hersenen / autonoom zenuwstelsel" met twee zenuwbanen naar de sinusknoop (+ orthosympathisch boven, − parasympathisch onder) en de bijnier met adrenaline daaronder.
- s09: twee tags overlapten elkaar ("rem" en "eigen tempo"); ze staan nu onder elkaar.
- s12: de eerste 3 s waren leeg. Het verdelingsschema in rust → sprint (spieren goud) blijft nu staan tot "wand", en "antwoord b" staat onderin.
- s13: het label met het totaal (19 L/min) stond over de brede stroom; het schuift nu mee omhoog.
- s14: rode stippen op het shirt lazen als vlekken. Nu loopt er een bloedvat door het lichaam met bloed dat naar beneden stroomt, en twee pijlen.
- s16: de figuur voor het herseninfarct is groter getekend.
- s17/s18: de hulpverlener liep met haar knieën door de vloer. Ze wordt nu afgekapt op de vloerlijn. Tijdens de analyse en de schok steekt ze haar handen omhoog ("loslaten!"), en na de schok drukt ze weer.
- Panelen zijn ondoorzichtig gemaakt (bij de recap scheen de basket erdoorheen).
- Een logische fout in `vatLang` (bump-functie) is gerepareerd.

## Wat nog open staat
- Woordtijden komen uit silalign, niet uit Scribe. Rond s12 ("koolstofdioxide", met de stem-invoer "koolstofdie-oxide") en s14 kunnen cues tot ongeveer 0,3 s verschoven zijn. Controleer dat bij het afspelen.
- In s05 en s07 lijkt de sprinter (person() staand) niet echt te rennen. Een loop- of renpose ontbreekt in de engine.
- De grijze plek bij het infarct (s16) is een ellips over de linkerkamerwand. Dat is schematisch, en de kransslagadertak loopt niet precies naar dat gebied.
- s19 (recap) gebruikt een lijst met bullets. Dat is functioneel, maar minder beeldend dan de rest.
- Kamiel moet de nieuwe termen nog beluisteren (wachtlijst uitspraak): "atherosclerose", "baroreceptoren", "nervus vagus", "plaque" (ingesproken als "plak"), "aa-ee-dee", "aa-vee-knoop" en "één één twee".
- De syllabusspecificaties (transport/regeling 2027) zijn niet letterlijk gecontroleerd (zie curriculum.md).

# Eindreview "Eén pomp, twee rondjes" (vwo-weergave, sheetQA0–6)

Dit is een review met frisse ogen op de contactsheets (5 frames per alinea) en op de cue-woorden. Elke `q.on`/`q.at` is nagerekend tegen `words/*.json`. Let op: `q.at` matcht op een deel van een woord, dus 'ader' vindt ook 'slagader' en 'top' vindt ook 'P-top'.

## A. Fouten in inhoud of logica (eerst oplossen)

1. **s13, hele alinea: boem/tak lopen niet gelijk met het hart.** Het hart gebruikt `hartFase(0.3 + ph*0.7)`. De hartkleppen gaan dicht (u = 0,585) bij ph ≈ 0,41, en dat is precies waar **"tak"** oplicht (piek 0,42). "boem" licht op bij u ≈ 0,34, midden in de hartpauze. Het beeld laat dus het verkeerde antwoord zien, terwijl de vraag over de boem gaat.
   *Voorstel:* gebruik `f = hartFase(ph)` met `boem = exp(-((ph-0.59)**2)/0.002)` en `tak = exp(-((ph-0.88)**2)/0.002)`, of houd de oude mapping en verschuif de pieken naar ph = 0,41 (boem) en ph = 0,83 (tak).

2. **s10, 20,7–41,8 s: het label "meer spier: dikkere wand" komt nooit in beeld, en het longen-label komt 22 s te vroeg.** `q.on('longen',1)` vindt "longen" op 14,2 s ("in je longen of in je lichaam"). Daardoor staat "lage druk in de longen: geen vocht in de longblaasjes" in beeld vanaf de beeldwissel op 20,7 s (zie s10_023.12 en s10_032.38). Ook wordt de spier-tag `*(1 - q.on('longen',1))` steeds 0.
   *Voorstel:* gebruik in r. 129 en r. 130 `q.on('longen',2)` (36,1 s).

3. **s11, 20,5–27,6 s: de tijdlijn toont "kamers trekken samen" terwijl de boezems samentrekken.** De boezemfase loopt via `lerp(0.42, 0.58, …/3)` naar u = 0,58, en `hartFase(0.58).naam` is dan al 'kamers trekken samen' (s11_021.52, bij de zin "Ze duwen het laatste beetje bloed de kamers in"). De stip staat dan al op de rode kamersegment-grens.
   *Voorstel:* laat die fase eindigen op 0,57 (`lerp(0.42, 0.57, clamp((t-tA)/Math.max(1, tV-tA-0.3),0,1))`). Dan loopt de boezemsystole ook mee tot het woord "kamers".

4. **s09, 5,4–14,8 s: de definitieregels verschijnen te vroeg.** `q.on('slagader',2)` = 5,4 s ("Een slagader is niet altijd zuurstofrijk"), maar de zin wordt pas op 10,1 s uitgesproken. `q.on('ader',3)` vindt 'slagader' op 10,1 s, terwijl "Een ader voert…" pas op 12,9 s komt (s09_011.74 toont beide regels al). Het kader verdwijnt ook al op 16,0 s, dus de ader-regel staat maar 3 s in beeld.
   *Voorstel:* gebruik `q.on('slagader',3)` en `q.on('ader',4)`, en laat het kader verdwijnen op `q.on('pompt',1)` (19,4 s) in plaats van op 'linkerboezem'.

5. **s05, vanaf 19,8 s: de rechter kransslagader begint bij de longslagader.** In `hart()` (lib_transport r. 78) start hij op (-30,-70), en dat is de wortel van de longslagader (x = -40). Beide kransslagaders takken af van de aorta (x = +40), en dat zegt de tekst ook letterlijk.
   *Voorstel:* laat beide bogen bij de aorta beginnen, bijvoorbeeld de rechter via `moveTo(30,-70)` met een boog over de voorkant naar (-220,160). Het vat moet dan zichtbaar vóór de longslagaderwortel langs lopen.

6. **s15, 21,6–24,5 s: de drukmeters zijn niet logisch.** De halvemaanvormige klep gaat open bij u = 0,63, als `ven` ≈ 0,5 is. De kamer staat dan op ≈ 70, maar de aorta springt naar `lerp(80,118,sl*ven)` ≈ 100. De kamer staat dus *lager* dan de aorta terwijl de klep openstaat, en dat is precies het tegendeel van wat de tekst uitlegt. De klep gaat ook al open op 21,6 s, terwijl "Dan gaat de halvemaanvormige klep open" pas op 24,1 s komt.
   *Voorstel:* gebruik `pA = f.sl ? Math.max(80, pK) : <dalend van 118 naar 80 in de diastole>`. Laat u in r. 173 pas na `q.at('halvemaanvormige')` over 0,63 gaan: eerst tot 0,625 tot 24,3 s, daarna naar 0,75.

7. **s15, 9,4–14,4 s: de boem-tag komt 5 s te vroeg.** Hij staat op `ramp(t, tS+1.5)` = 9,4 s, maar "Dat is de boem" valt op 14,4 s (s15_013.79 toont de tag al bij "De hartklep klapt dicht").
   *Voorstel:* gebruik `q.on('boem',1)` (komt in s15 alleen voor op 14,4 s).

8. **s15, 28,7 s: u springt in één keer van 0,75 naar 0,88.** De halvemaanvormige kleppen gaan dan dicht op "ontspannen", maar de tekst zegt "klappen dicht" pas op 34,7 s. De kamer springt ook zichtbaar.
   *Voorstel:* laat u na tR rustig van 0,75 naar 0,87 lopen tot `q.at('kleppen',2)` (34,3 s), en daarna naar 0,95.

9. **s17, 35–37 s: de route door de kamers klopt niet, en de "tube tandpasta" is niet te zien.** Route3 gaat van de apex omhoog langs de linkerkamerwand en daarna in één rechte lijn dwars door beide kamers naar (-240,140) (s17_032.22). Het hart staat ook de hele alinea stil (`hartFase(0.2)`).
   *Voorstel:* splits de route in twee bundeltakken die langs beide kanten van het tussenschot naar de apex lopen en daarna langs beide buitenwanden omhoog. Laat vanaf `q.at('tandpasta')` één kamercontractie zien (u van 0,58 naar 0,88).

10. **s08, 6,4–10,7 s: de druppel gaat niet via de rechterkamer.** Direct na 'rechterboezem' start de druppel op de kleine ronde (s08_008.20: hij zit al links buiten het hart bij "Dan door naar de rechterkamer"). De `hi` op RK gebruikt `rechterkamer#2` (9,9 s) in plaats van #1 (8,5 s).
   *Voorstel:* houd de druppel in RB tot `q.at('rechterkamer',1)` en daarna in RK tot `q.at('pompt')`. Start de kleine ronde pas op 'pompt' en gebruik `dRK = q.at('rechterkamer',1)`.

11. **s16, 22,0 s (havo-deel): de T wordt gelabeld voordat hij is uitgelegd.** `ecg(... labels)` zet P, QRS **en T** neer, maar de T-top komt pas in het vwo-deel (s17).
   *Voorstel:* geef `ecg()` een optie `noT`, of laat de T-letter weg in s16.

12. **s04, 22,2–30,3 s: de uitleg van links/rechts is zwak en te kort in beeld.** Er staat "zijn links" onder het poppetje zonder aan te wijzen welke kant. De tag "jouw links = rechts op het plaatje" verschijnt pas op 'plaatje' (29,4 s) en verdwijnt al op 'Ook' (30,3 s), dus minder dan 1 s. Bovendien zegt de ene tag "zijn" en de andere "jouw".
   *Voorstel:* zet een gouden pijl of markering op zijn linkerhand (rechts op het plaatje) en schrijf de tekst als "zijn links = rechts op het plaatje". Laat de tag verschijnen op `q.on('tekening',1)` (26,1 s) en laat `lr` pas verdwijnen op `q.on('boezems',2)` (30,8 s) of later.

13. **s04, 4,3–6,7 s: "de punt wijst naar links" is niet te zien.** `bonzendHart` is een symmetrisch hartsymbool.
   *Voorstel:* gebruik een kleine `hart()` in de borstkas die ≈ 30° gedraaid is met de punt naar rechts op het plaatje, of kantel de bonzendHart met `rotate(-0.5)` en schuif hem naar de vuist-tag.

## B. Timing

14. **s10, 25,7–27,4 s: de weerstand-tag staat maar 1,6 s in beeld.** Hij wordt `*(1-lu)` gedoofd op 'linkerkamer'.
    *Voorstel:* laat hem doven op `q.on('spier',1)`. Hij staat op y = 130 en de meters op x ≥ 1380, dus ze overlappen elkaar niet.

15. **s05, 19,8 s: de kransslagaders verschijnen 5 s voordat het woord valt.** `kr = q.on('hartspier')`. Dat mag als aankondiging, maar dan liever eerst gedimd.
    *Voorstel:* `krans: 0.3*q.on('hartspier') + 0.7*q.on('kransslagaders')`.

16. **s12, 5,2 s: het hart springt in één frame van hartpauze naar kamersystole.** Dat komt door `q.on('kleppen') > 0 ? …`.
    *Voorstel:* gebruik `hartFase(lerp(0.2, 0.75, q.on('kleppen',1,1.2)))`, dan sluiten de kleppen zichtbaar.

17. **s09, 16,0 s: de linkerboezem wordt niet gemarkeerd bij "Dan van de linkerboezem naar de linkerkamer".** De druppel start meteen bij de uitgang van LK.
    *Voorstel:* gebruik `hi: 'LA'` van 16,0 tot 17,2 s en daarna 'LV', en start de druppel op `q.at('pompt')` (19,4 s).

## C. Leesbaarheid en compositie

18. **s04, 37,85 s: de meta "DUNNE SPIERWAND" valt links buiten beeld** (te zien als "JUNNE SPIERWAND"). Het label staat op lx = 300 en is rechts uitgelijnd.
    *Voorstel:* zet lx op 420.

19. **s12, 15,6 s en later: de meta "BEGIN AORTA EN LONGSLAGADER" valt rechts buiten beeld** (te zien als "LONGSLAG/").
    *Voorstel:* gebruik lx = 1300 voor beide labels, of kort de tekst in tot "AORTA + LONGSLAGADER".

20. **s04, 0–10 s: de metaText 'midden' staat over het gezicht van het borstkas-poppetje** (y = 120).
    *Voorstel:* zet hem op y = 900−… of op (990, 840) naast de stippellijn onder de romp, of laat hem weg (de tag zegt het al).

21. **s16, 0–18,2 s: "ECG · MODEL" staat los in beeld voordat het ECG er is** (s16_004.01 en s16_012.04).
    *Voorstel:* gebruik `metaText` met `ctx.globalAlpha *= e`.

22. **s01, 11,8–16,0 s: de tag "naar je longen" (y = 180) overlapt de bovenrand van de zoomcirkel** (die begint op y = 170).
    *Voorstel:* zet hem op y = 120. Laat in de cirkel ook de longslagader en de aorta oplichten, zodat "naar twee kanten" te zien is.

23. **s12, 19,0 s: de tag "geen spieren: alleen drukverschil" (1300, 840) ligt over de punt van het hart.**
    *Voorstel:* gebruik x = 1560.

24. **s17, 53,1 s: de paarse tag (960, 840) ligt over de onderrand van het hart en de dalende aorta.**
    *Voorstel:* zet hem op (1500, 800), onder het ECG-kader.

25. **s18: de tags op x = 1480 worden doorsneden door de bushaltepaal (x ≈ 1545), en "organen in je lichaam" steekt buiten zijn kader.** Dat laatste komt doordat de lus op s = 0,45 staat en de tekst op minimaal 28 px.
    *Voorstel:* zet de tags op (1150, 800), en zet de lus op s = 0,6 of verplaats hem naar (1300, 360). Of maak in `lus()` de breedte van het orgaankader `max(420*s, tekstbreedte+40)`.

26. **s08, 12,7 s: de druppel bedekt de "l" van "longen".** De kleine ronde loopt door het midden van het kader.
    *Voorstel:* teken in `lus()` het orgaanlabel ná de druppel, of laat de druppel achter het kader langs gaan.

27. **s01, 20,1 s: de leader van "linkerkamer DIKKE WAND" (1560, 720) kruist de bushaltepaal.**
    *Voorstel:* zet hem op lx = 1600, ly = 820, of verplaats de bushalte naar x = 1760.

28. **s15, 37,5 s: in het samenvattingskader staat de tekst in 28 px met veel lege ruimte**, en de tweede regel komt pas op 44,9 s.
    *Voorstel:* maak de tekst 32 px, maak het kader 120 hoog en toon beide regels al als tabel: "hartpauze | hartkleppen open | halvemaan dicht" en "systole kamers | dicht | open".

29. **s11: de tijdlijnbalk heeft geen segmentlabels.** De `lab`-waarden in `fasen` worden niet getekend, en r. 144 is dode code.
    *Voorstel:* zet onder elk segment een klein label (24 px): "pauze", "boezems", "kamers". Verwijder r. 144.

## D. Stijl (Part C)

30. **Er worden meer dan 3 betekeniskleuren + goud gebruikt:** bloed rijk/arm, teal (signaal), plus koraal (s05, s10), groen (s10, eindkaart), paars (s17) en C.er (s17). Teal wordt in s10 ook gebruikt voor "lage druk in de longen", terwijl teal in deze film "elektrische prikkel" betekent.
    *Voorstel:* maak de tags in s05, s10 en s17 C.text of goud. Maak de bindweefsel-label in s17 TR.bind of C.text.

31. **s15: de aorta-drukmeter is goud, terwijl goud hier "markering" betekent.**
    *Voorstel:* gebruik TR.rijkL.

32. **s06 (vraag): de longslagader is al donkerrood (zuurstofarm) terwijl de vraag nog loopt.** Daarmee verraadt de kleur het antwoord.
    *Voorstel:* gebruik in s06 `hart(..., {kleur: 0})` (grijs), en laat de kleur pas in s09 zien.

## E. Klein of optioneel

33. **`hart()` tekent links en rechts allebei 2 slippen**, terwijl s12 zegt "links twee, rechts drie". In een schematische tekening is dat acceptabel. Je kunt ook een derde, korte slip tekenen bij `avKlep(-150…)`.
34. **s17: de meta "≈ 0,1 S VERTRAGING" wordt in hoofdletters gezet**, en hoofdletter S is de eenheid siemens.
    *Voorstel:* schrijf "≈ 0,1 SECONDE VERTRAGING".
35. **s17, r. 205: de variabele `tE` met 'ee-cee-gee' is dode code.**
36. **s17, 49,4 s: "Tijdens de T-top gaan de halvemaanvormige kleppen dicht" wordt niet in beeld gebracht.**
    *Voorstel:* zet een gouden markering aan het eind van de T in het ECG-kader.

## Wat klopt

- De klepstanden in `hartFase` kloppen (hartpauze: AV open en SL dicht; uitdrijving: andersom).
- De P-top (0,40) en QRS (0,57) in het ECG vallen samen met boezem- en kamersystole.
- De sinusknoop ligt bij de monding van de bovenste holle ader, en de AV-knoop onderaan het tussenschot.
- Zuurstofrijk/zuurstofarm klopt overal in de lus (de druppel kleurt bij de longen).
- 5× druk en ≈ 3× wanddikte kloppen.
- De antwoorden b/b/b passen bij q02, q07 en q14.
- Ondertitels worden nergens overlapt; alle tags blijven boven y = 900.

# Beeldreview film 5 — Stress (onderbouw), frisse reviewer

Gebaseerd op contact_00–04 (4 stills per segment) en tekst.txt. Pixelmaten zijn geschat vanaf de contactbladen (1 tegel ≈ 1/3 van 1920×1080), dus meet ze na in de bron voordat je ze aanpast.

## Problemen (van ernstig naar klein)

1. **s07 3.2 s en 9.6 s: hersenen over het gezicht, en een generiek lichaam.** Het anatomielichaam heeft geen gezicht: de roze hersenen met een gloed vullen het hele hoofd. Dat is precies het 'zombie'-beeld dat Kamiel heeft afgekeurd. Het lichaam is ook geen castpersonage (geen haar, geen kleding, grijze onderbroek), terwijl de afspraak is: lichaam met organen = castpersonage met `lib_anatomie.js`. Daarnaast is er een gloed rond de hersenen, terwijl Part C geen gloed toestaat.
   *Fix:* gebruik Lotte met `lib_anatomie.js` en laat haar gezicht heel. Zet de hersenen in een gouden zoomcirkel naast het hoofd, zoals in s05, en haal de gloed weg.

2. **s07 9.6 s: de bijnieren kloppen inhoudelijk niet en het label overlapt.** De 'bijnieren' zijn een wolk paarse stipjes over buik en bekken, niet twee kleine kapjes boven op twee zichtbare nieren. Het label "bijnieren / BOVEN OP JE NIEREN" loopt met "NIEREN" over het kader "bijnieren" van het stroomschema. De pijl onder "adrenaline" wijst nergens naar, terwijl de stem zegt "Je bloed brengt die naar je hart". Adrenaline is ook als losse stipjes getekend (kleine moleculen krijgen een eigen vorm, geen stipjes).
   *Fix:* teken twee nieren met op elk een paarse bijnier, en zet het label direct naast de bijnier, links van het schema. Laat de laatste pijl eindigen in "hart (klopt sneller)" op het moment dat de stem dat zegt. Geef adrenaline een eigen, herkenbaar vormpje.

3. **s14 2.9–6.8 s: de telefoon is niet realistisch en zit niet in haar hand.** De stem zegt "Ze pakt haar telefoon", maar Lotte zit met lege handen op een stoel midden op straat. Er zweeft een telefoon zo groot als een halve gevel voor het schoolgebouw.
   *Fix:* geef Lotte een telefoon in haar handen en zet haar op een bankje. Laat het scherm zien in een zoomcirkel naast haar (de wisselende kaartjes) en zet daarbij het alarmbelletje met de "?".

4. **s16 16.3 s: tekst loopt over de rand.** "NA HET BEWEGEN: HART EN ADEM WEER RUSTIG" wordt rechts afgesneden ("RUSTIG" raakt de beeldrand). Het hartje erboven is heel klein en het beeld is voor de rest leeg. De fiets is moeilijk te herkennen: de wielen zijn bijna onzichtbaar donker en het frame is rommelig.
   *Fix:* zet de zin onder de kaart "bewegen", binnen de marges. Laat een groter hart zien dat zichtbaar rustiger gaat kloppen (of een hartslaglijn die afvlakt), en teken de wielen in een lichte lijnkleur.

5. **De leeuw wordt nooit getekend (s01 6.1–8.5 s, s06 6.3–14.8 s, s17 8.5–14.2 s).** De centrale vergelijking van de film is alleen tekst. In s01 staat een woord dat door een X onleesbaar wordt ("le✗uw"). In s06 staat in het gevaar-kader alleen "leeuw", terwijl het spreekbeurt-kader wel een figuurtje heeft. In s17 zijn beide kaders helemaal leeg.
   *Fix:* teken één herkenbare leeuw (Macro-stijl, met een echt oog) en gebruik die in s01 (in een denkwolk met een streep erdoor, zodat het woord leesbaar blijft), in s06 en in s17. Zet in s17 de leeuw en Lotte bij haar spreekbeurt terug in de kaders.

6. **Te kleine tekst in de hele film.** Geschat zit veel tekst onder de minima van Part C:
   - de serieregel "ONDERBOUW · KERNDOELEN · 32C · FILM 5": ±18–20 px (minimum 28);
   - "DENK NA…" op de vraagkaarten: ±20 px;
   - de vraag en de antwoordopties op de vraagkaarten (q04, q09, q12, q15): ±30–34 px, terwijl vragen 48 px moeten zijn;
   - de pillen "droge mond" (s01), "afweer minder goed", "slechter slapen" (s13), "maar één alarm" (s06) en "steeds iets nieuws" (s16): ±26–30 px;
   - de zinnen op de Onthoud-kaart (s18): ±32 px (kernzinnen horen 44–48 px te zijn).

   *Fix:* schaal alles op naar de minima: Meta 28, labels 36, vragen en kernzinnen 48. Dat past ruim, want de vraagkaarten gebruiken nu maar 40% van de breedte.

7. **Bijna onleesbare tekst op de lichte buitenachtergrond (s08 8.9 s, s10 en s14, s16 38.1 s).** De serieregel en vooral "BIJNA IEDEREEN KENT HET" (s10 3.4–8.0 s) staan grijs op lichtblauwe lucht, met een contrast ver onder 4.5:1. Dat gaat juist over de zin die de stem op dat moment uitspreekt.
   *Fix:* zet de Meta-regel in de donkere pil (#121A26 op 85%), net als "zenuwachtig zijn is geen zwakte", of maak hem donker. Zet de serieregel op deze scènes ook in een donkere tint.

8. **s13 18.1 s: meer dan drie betekeniskleuren tegelijk.** Op het scherm staan koraal ("te weinig tijd", "sneller ziek", "afweer minder goed"), teal ("slechter slapen", telefoon), oker ("vaak moe", roosterpictogram) en groen ("RUST"), plus goud voor de grafiek. Dat zijn vier kleuren plus goud.
   *Fix:* maak alle gevolgen één kleur (koraal = 'let op'), zet de rust-lijn in een neutrale kleur of in groen, en maak rooster en telefoon neutraal. Ook in s16 27.2 s (koraal fiets, groene boom, teal longen, bruin/blauw bed) liggen vier kleuren dicht tegen de grens: maak de iconen neutraal met één groene rand voor 'helpt'.

9. **s08 5.3 s: het beeld laat niet zien wat de stem zegt.** De stem zegt "Na een paar minuten wordt haar hart rustiger", maar de pil toont nog steeds hetzelfde "bonk bonk"-hart. "NA EEN PAAR MINUTEN" raakt bovendien de linkerrand van het raam.
   *Fix:* laat de pil veranderen in "rustig" met een kleiner, langzamer kloppend hart (of laat de pil wegfaden), en schuif de Meta-regel ±20 px naar links.

10. **s05 13.1 s: pijlen naar het niets.** De stem noemt "je hart, je longen en je spieren", maar de drie teal lijnen eindigen in lege ruimte. De doelen komen pas later in beeld. Ook staat er "ademhaling" waar de stem "longen" zegt.
    *Fix:* laat de kaartjes hart, longen en spieren verschijnen op het moment dat ze genoemd worden (stem en beeld gelijk), en noem het kaartje "longen / SNELLER ADEMEN".

11. **s05 30.5 s: het adrenalinelabel overlapt zijn eigen vorm.** "adrenaline / HOUDT HET EVEN VOL" staat over de bovenrand van het ovaal met de deeltjes, en de Meta-letters lopen over de lijn. Adrenaline is ook hier als stipjes getekend.
    *Fix:* zet het label onder of naast het ovaal en gebruik hetzelfde adrenalinevormpje als in s07.

12. **s16 38.1 s: het beeld past niet bij "praat liever met een vriendin".** Yasmin en de vriendin staan met hun gezicht naar de kijker en praten niet met elkaar. Lotte staat naast een fiets in plaats van te fietsen (de stem zei "Lotte gaat na school fietsen").
    *Fix:* draai Yasmin en de vriendin naar elkaar toe en geef ze een tekstballonnetje. Laat Lotte in zijaanzicht wegfietsen (castboek-gang), of zet haar op de fiets.

13. **s16 5.4 s: het alarm uit de zin is niet te zien.** "HET ALARM GAAT NIET ECHT UIT" staat los in het midden zonder belletje. De telefoon staat links en de rest is leeg.
    *Fix:* zet het alarmbelletje met trillende ringen naast de telefoon, met de Meta-regel eronder.

14. **s07 16.0 s en 22.4 s: "Mensen en dieren" zonder dier en zonder gevaar.** Lotte rent in een leeg vlak weg, terwijl het kader "gevaar / MENSEN EN DIEREN" leeg is.
    *Fix:* zet de leeuw uit punt 5 (of een prehistorische mens en een dier op de vlucht) in het kader of achter haar. Laat ook zien waar het bloed naartoe gaat (benen lichten koraal op) bij "meer bloed in je spieren".

15. **s11 16.8 s: geen enkel vakje is leeg, terwijl de stem zegt "Er is bijna geen leeg vakje".** Op 7.2 s is DO-middag nog leeg terwijl de stem al "Donderdag oefenen" zegt.
    *Fix:* laat bijvoorbeeld VR-middag leeg (de stem noemt vrijdag niet) en laat elk vakje verschijnen op het woord dat erbij hoort.

16. **s01: kleine plaatsing- en sfeerfouten.** De gouden "?" (8.5 s) staat over de berg in het raam. Achter het raam is het nacht (maan, donkere lucht) terwijl het lesdag is. Er zit één leerling achter een groot docentenbureau, met handen achter het hoofd, wat leest als 'docent' of 'ontspannen'. Lotte is veel groter dan de zittende leerling.
    *Fix:* zet de "?" naast Lotte, maak een daglucht in het raam, en zet twee of drie castleerlingen aan schoolbankjes, op realistische schaal ten opzichte van Lotte.

17. **s02 (titelkaart): ondertitelkast op de titelkaart.** Volgens C5 hoort er geen ondertitelkast op de titelkaart, en de titel staat er nu dubbel. Bij 0.4 s zijn de titel en de beelden nog half doorzichtig.
    *Fix:* laat de ondertitel op de titelkaart weg en begin met de titel volledig in beeld (of start het segment pas na de fade).

18. **s17 2.8 s en 14.2 s: leeg begin, en het vinkje overlapt een pijl.** Op 2.8 s staat alleen de vraag twee keer in beeld (bovenaan en in de ondertitel). Op 14.2 s staat het groene vinkje op de gele pijl van "iets spannends".
    *Fix:* zet direct de kaders met de leeuw en Lotte neer, en schuif het vinkje onder het belletje of naast "één alarm".

19. **s13 7.8 s en s10 1.1 s: labels komen te laat.** "vaak moe" verschijnt pas na het moment waarop de stem het zegt. In s10 verschijnt "zenuwachtig zijn is geen zwakte" pas bij de volgende zin.
    *Fix:* laat de cues gelijk lopen met het gesproken woord.

20. **Toon, optioneel.** De toon is goed: zakelijk en geruststellend, en de afsluiting verwijst naar een volwassene. Wel staat op de eindkaart "een ouder" erbij, terwijl de stem "mentor of huisarts" zegt. Dat is prima, maar het is fijn als beeld en stem dezelfde drie noemen.
    *Fix (keuze voor Kamiel):* zeg in s17 ook "een ouder". Voeg eventueel een anonieme hulplijn toe voor leerlingen die er thuis niet over kunnen praten (bijvoorbeeld De Kindertelefoon) in Meta op de eindkaart.

## Wat goed is

- Er staan geen grijze poppetjes in de film. Lotte, Yasmin, mevrouw Visser en de vriendin zijn allemaal castboekfiguren met een heel gezicht (behalve het anatomielichaam in s07, zie punt 1).
- s05 is sterk: de zoomcirkel met de hersenen náást het hoofd, en vier duidelijke kaartjes (hart, ademhaling, spieren, minder speeksel) met naam en Meta-status. Er zijn geen wijslijnen.
- Het alarmbelletje als rode draad (s02, s06, s14, s16, s17) werkt goed en is consequent.
- "Lottes week" (s11) is een helder, herkenbaar rooster dat zich vakje voor vakje vult. De grafiek in s13 (pieken die niet meer terugzakken naar RUST) laat lange stress goed zien.
- De vraagkaarten zijn correct opgebouwd: "Wat denk je?", drie opties, gouden aftellijn, Schema-navy en geen ondertitel.
- De uitdagingsmarkering in s07 (paarse balk links en UITDAGING in Meta) klopt, en nergens staan havo, vwo of vmbo.
- Er staat geen tekst in de ondertitelzone behalve de ondertitels, en er wordt nergens naar tools of de site verwezen.
- De toon past bij een gevoelig onderwerp. "Zenuwachtig zijn is geen zwakte", "het alarm is niet kapot", wat helpt verschilt per persoon, en een warm slotbeeld met Lotte en een volwassene die ze vertrouwt.

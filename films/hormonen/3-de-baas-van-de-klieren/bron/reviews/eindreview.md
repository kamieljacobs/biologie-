# Eindreview: De baas van de klieren (hormonen 3/5)

1. **s18: inhoudelijke fout. Ernst: hoog.** Gesproken tekst en tag zeggen "Maar die rem werkt alleen op de hypofyse". Dat klopt niet en botst met s16 ("Thyroxine remt zowel de hypofyse als de hypothalamus"). Bedoeld is: de rem werkt via TSH, maar de antistoffen trekken zich er niets van aan.
   **Fix:** tekst wordt "Maar die rem werkt alleen op de TSH. Op de antistoffen heeft hij geen invloed." Tag wordt "rem werkt niet op de antistoffen". Die alinea opnieuw inspreken.

2. **s14: inhoud botst met vwo. Ernst: middel.** "Allebei laag → het probleem zit hoger: in de hypofyse" is te stellig. Checkvraag 4 (TRH-test) laat juist zien dat lage TSH plus lage thyroxine ook van de hypothalamus kan komen (patiënt X).
   **Fix:** tekst wordt "Het probleem zit dan hoger: meestal in de hypofyse." Of zet in het vwo-blok s16 één zin "of nog hoger, in de hypothalamus". Beeldtekst wordt "probleem hoger: hypofyse (of hypothalamus)".

3. **s21: kernbeeld komt te laat. Ernst: middel.** De gestippelde terugkoppeling "thyroxine stuurt terug" hangt aan q.on('terug'). Dat woord valt op 40,48 s en het segment eindigt op 41,04 s, dus de lijn is maar ±0,5 s te zien. De ladder heeft ook geen thyroxine-element, zodat de slotboodschap visueel ontbreekt.
   **Fix:** hang de cue aan de laatste 'thyroxine' (39,2 s) of aan 'schildklier' (38,1 s). Zet een thyroxine-pil/tag op de terugboog en voeg ±1,5 s hold toe aan het einde.

4. **s13: overlappende en verkeerd geplaatste labels. Ernst: middel.**
   - "jodium in zout en brood" (1500,330) ligt over de top van de TSH-balk, die tot y≈330 groeit.
   - "groter ≠ meer thyroxine" zit er vlak boven.
   - "struma (krop)" staat op de kruin van het hoofd in plaats van bij de hals.

   **Fix:** schuif beide rechter tags naar x≈1650 (links uitgelijnd voorbij x=1400) of begrens de TSH-balk op 1,1. Zet de struma-tag naast de hals (bijv. 760,560) met een lijntje naar de vergrote schildklier.

5. **s09: label over knopen en cue te laat. Ernst: middel.**
   - De tag "TSH = de opdracht · thyroxine = het hormoon" (960,470) ligt half over de knopen schildklier en hypofyse.
   - Bij "De hypofyse geeft TSH af" blijven de TSH-knoop en de pijl hypofyse→TSH gedimd. Ze hangen aan q.on('TSH',3) = "TSH zet …".

   **Fix:** zet de tag op y≈620 (tussen het midden en de TSH-knoop) of maak hem tweeregelig en smaller. Zet nA[2] en arr[1] op q.on('TSH',2).

6. **s08: hartslagmeter en hielprik te kort en te krap. Ernst: middel/laag.**
   - De hartslagmeter verschijnt bij 'hart' (26,2 s) en verdwijnt al bij 'kinderen' (28,0 s). Hij is ±1,7 s en half doorzichtig te zien, en de stijging 66→80 valt bijna niet op.
   - De tag "hielprik" (y=790) zit geklemd tussen de doelcellen en de tag "kinderen…" (y=860).

   **Fix:** laat de meter staan tot het einde of laat hem pas vervagen bij 'hielprik', en verplaats hem naar rechtsboven onder het molecuul. Zet "hielprik" naast de kinderen-tag (bijv. x=1700,y=860) of haal de doelcellen weg bij 'kinderen'.

7. **s18: beginbeeld suggereert geen thyroxine. Ernst: middel/laag.** De thyroxinebalk start op 0 (leeg) bij "De antistoffen laten de schildklier hard werken". Dat leest als "er is geen thyroxine", en er is geen normaalniveau om tegen af te zetten.
   **Fix:** laat thyroxine en TSH starten op 0,5 (normaal) en trek een stippellijn "normaal". Thyroxine stijgt dan naar 1,25 en TSH zakt naar 0,08.

8. **s04: hormonen naar de hypofyse nauwelijks zichtbaar. Ernst: middel/laag.** Bij "Met hormonen stuurt hij de hypofyse aan" bewegen er tropine-vormpjes van r=6 over een afstand van 60 px langs het steeltje. Op schermgrootte zijn het puntjes. Verder staat de tag "hypofyse stuurt andere klieren aan" maar ±1,6 s in beeld (vanaf 29,2 s).
   **Fix:** maak de hormoonvormpjes groter (r≈12) met een korte gloed, of zet er een tag "hormonen" bij het steeltje. Laat de slottag eerder komen (bij 'beurt') of zet een hold op het segment.

9. **s19: verwarrende formulering en beeld. Ernst: middel/laag.** "Groeihormoon stuurt geen andere klier aan" en direct daarna "het zet de lever aan om een groeifactor te maken". De lever is zelf een klier, en een scherpe leerling ziet een tegenspraak. In beeld gaat groeihormoon alleen naar de lever. Er is geen pijl naar bot of spier, terwijl gezegd wordt "werkt op weefsels zelf".
   **Fix:** tekst wordt "Groeihormoon is geen opdracht aan een hormoonklier, zoals TSH. Het werkt zelf op weefsels, en het zet ook de lever aan…". In beeld een tweede stroom stipjes naar het bot, en een pijl groeifactor → bot.

10. **s20: grafiek onduidelijk en lege start. Ernst: laag/middel.** De x-as loopt 0–24 h "na het inslapen" zonder aanduiding van de slaapperiode. Drie pieken liggen op 10–19 h (overdag), dus "de grootste stoot in de diepe slaap" is niet af te lezen. De eerste ±3,7 s is het frame leeg (de grafiek komt pas bij 'stoten').
    **Fix:** arceer 0–8 h met het label "slaap" en markeer de eerste piek met "diepe slaap". Laat de grafiekas al bij segmentstart infaden en de lijn bij 'stoten' tekenen.

11. **s21: recap zonder beeld bij struma, en label tegen de knoop. Ernst: laag.** Bij "de schildklier groeit uit tot een struma" zie je alleen een rood kruis op de rempijl. De tag "een klier in je hals werkt niet goed zonder jodium" (y=860) plakt tegen de onderkant van de TSH-knoop.
    **Fix:** laat bij 'struma' de schildklierknoop opzwellen (schaal 1→1,2, koraalrand) of zet een mini-halsKaart naast het zoutpak. Zet de antwoordtag op y≈920 of verklein de kring (ry 270).

12. **s12: het mechanisme is slecht te zien. Ernst: laag.** De "dunne" rempijl (thin 0.9) valt niet op en de balkjes zijn klein in het midden van de kring. De TSH-balk stijgt pas vanaf 'steeds' (6,0 s van 8 s).
    **Fix:** maak de rempijl gestippeld en koraal met een tag "weinig rem". Laat de TSH-balk direct bij 'geremd' stijgen. Maak de balken groter of zet ze buiten de kring (rechtsonder).

13. **s16: beeld loopt vooruit. Ernst: laag.** Bij "TRH zet de hypofyse aan om TSH af te geven" verschijnen de schildklier-box en de TSH-pijl al (q.on('TSH',1)). De rembogen vertrekken uit de schildklier-box, terwijl de tekst zegt "thyroxine remt".
    **Fix:** laat de box schildklier en de pijl TSH→schildklier pas komen bij q.on('schildklier',1). Zet een klein thyroxine-label aan de start van de rembogen.

14. **Checkvraag 3a: puntverdeling. Ernst: laag.** Het tweede punt wordt gegeven voor de uitleg over B. De vraag vraagt naar de patiënt met de oorzaak in de hypofyse. "Alleen met juiste uitleg" bij punt 1 maakt de verdeling dubbelop.
    **Fix:** "C (1). Uitleg: de thyroxine is laag maar de TSH is niet verhoogd/laag, dus de hypofyse geeft te weinig TSH af (1)." De zin over B kan als toelichting blijven.

15. **s08 (ook s13): hoofd tegen de kopregel. Ernst: laag.** De bovenkant van de hoofdcirkel van halsKaart raakt de kopregel "HAVO · VWO · HORMONEN 3/5" (s08, y≈20).
    **Fix:** zet halsKaart in s08 op y≈600 (of schaal 1.0 in plaats van 1.1), zodat de kruin onder y≈90 blijft.

Gecontroleerd en in orde: q02, q11 en q17 hebben elk één eenduidig juist antwoord, aannemelijke afleiders en geen weggever, en de antwoorden in s12/s18 kloppen met `correct`. De checkvragen 1, 2, 3b en 4 met hun antwoordmodellen zijn vakinhoudelijk juist.

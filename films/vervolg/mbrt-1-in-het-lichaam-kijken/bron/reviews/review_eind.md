# Frisse review — m1 · In het lichaam kijken (röntgen, CT, MRI, echo)
Reviewer: frisse blik (vakdocent + beeldredactie), 24 okt 2026. Gelezen: script_v2.md, brief.md, sections.html, film.json, segments.json, scenes_m1.js, words/, qa/ plus eigen stills (scratchpad rev_m1). Vergeleken met fysiotherapie-1 *Wat is er met die knie?*, *Eén pomp, twee rondjes* en *Van molecuul tot biosfeer* (begrippen kruisband, 'op een röntgenfoto zie je botten, geen banden', aorta = grote lichaamsslagader, weefsel/orgaan): die zijn consistent.

Inhoudelijk is de film sterk. De getallen kloppen (longfoto ± 0,04 mSv en RIVM gemiddeld 2,8 mSv/jaar; 1,5–3 T tegenover ± 50 µT; CT-buik ≥ 100× een longfoto; MBRT 4 jaar hbo bij Hanze, Inholland Haarlem en Fontys Eindhoven; radioloog 6 + 5 jaar). De kijkrichting op een CT-plak, de anatomie van de plak (lever links in beeld, maag met lucht voorin, milt, aorta vóór de wervel en iets links van de patiënt) en de richting van de voorste kruisband op de sagittale MRI zijn correct. De MOET-punten gaan alleen over het beeld.

## MOET

1. **MOET — s04 (H1 röntgen), 8–41 s, `rontgenOpstelling` in teken_m1.js / scenes_m1.js r. 23.** De plaat heeft maar twee tinten: zwart onder de lucht én onder de weke delen, licht onder het bot (zie still s04 13 s en 25 s). Op 19–23 s zegt de stem 'Spieren, vet en banden houden een beetje tegen: die worden grijs', en de grijsschaal ernaast laat dat ook zien, maar de plaat zelf spreekt het tegen. Juist dit drietal (zwart, grijs, wit) is de kern van H1 en van de vraag. **Voorstel:** maak de plaat in drie zones: zwart buiten het lichaam, middengrijs onder huid/spier/vet, wit onder het bot. Laat de stralen in de weke delen eventueel dunner of zwakker doorlopen. *Alleen beeld.*

2. **MOET — s10 (H3 antwoord), 0–19 s, echoScherm + labels (scenes_m1.js r. 80).** Het label 'lever' staat precies onder de witte boog. Die boog ís de rib, en het gebied eronder is de schaduw. Het label 'rib · SCHADUW ERACHTER' staat buiten het scherm, ± 150 px van de boog (still s10 6 s). Een leerling leest de witte boog nu als 'lever' en de schaduw als leverweefsel. Dat is misleidend, en het botst ook met de regel 'label direct bij het onderdeel'. **Voorstel:** zet 'rib' direct boven of naast de witte boog in het scherm, 'schaduw' in de donkere baan eronder en 'lever' in het gespikkelde (grijze) deel links. *Alleen beeld.*

3. **MOET — s08 (H3 echo), 8–12 s, `echoKop` op de liggende Henk (scenes_m1.js r. 71).** De stem zegt 'Ze zet een echokop op zijn huid, met een klodder gel', maar in beeld staat de echokop op Henks vest en is er geen gel (still s08 9,5 s). Later in dezelfde alinea legt de film uit dat de gel lucht tussen kop en huid weghaalt, dus het beeld zegt hier het tegendeel. **Voorstel:** laat de buik bloot (vest/hemd opzij) en teken een blauwe klodder gel onder de kop, zoals in het blokschema vanaf 17 s. *Alleen beeld.*

4. **MOET — s05 (H2 MRI), 38–52 s.** Twee chips liggen over elkaar heen: 'tienduizenden keren sterker dan de aarde' (vanaf 'aarde') en 'water, vet, stevig weefsel: elk een ander signaal' (vanaf 'stevig'). Ze staan bijna op dezelfde plek (1110,820 en 1260,820) en zijn onleesbaar (still s05 38,5 s en 41,5 s). **Voorstel:** laat de aarde-chip weggaan zodra 'stevig' begint (`* (1 - q.on('stevig',1))`, of met `wissel()`), of zet de tweede chip een regel lager. *Alleen beeld.*

5. **MOET — titelkaart s03 en s08 23–49 s: overlap en rand.**
   (a) In de titelkaart loopt het woord 'kijken' over het kader van de CT-plak heen (qa/s03_002.50.png). Schuif het plaatje naar rechts/omlaag of maak de titel kleiner.
   (b) In s08 staat het metalabel 'LATER TERUG / = DIEPER' (`echoPrincipe`, teken_m1.js r. 146: x + w + 74) ± 15 px van de rechterrand, terwijl de regel ≥ 60 px is (still s08 31 s). Schuif het hele echoblok ± 80 px naar links of zet het label links van de pijl.
   *Alleen beeld.*

## KAN

6. **KAN — inhoud s07, 0–27 s (nieuwe audio).** 'geen metaal mee de ruimte in: geen sleutels en geen bankpas'. Een bankpas is geen metaal: het probleem is dat de magneetstrip gewist wordt. Voorstel: '…mag er geen metaal mee de ruimte in, en ook geen pasjes: geen sleutels en geen bankpas.' Bron: Anna Ziekenhuis RAD026, al in de tabel: 'metalen voorwerpen en pasjes met magneetstrip'.

7. **KAN — inhoud s04, 34–38 s (nieuwe audio).** 'Een kruisband is ongeveer even grijs als de spieren eromheen.' Midden in de knie ligt de kruisband tussen gewrichtsvocht en vet, niet tussen spieren. Voorstel: '…even grijs als het weefsel eromheen.' Het beeldlabel 'zelfde grijs als spier' mag dan 'zelfde grijs als spier en vet' worden.

8. **KAN — eindkaart (s16), regel 2, en het MRI-beeld 'geen straling'.** 'Een MRI meet het signaal van waterstof … zonder straling.' De film gebruikt zelf een radiogolf, en dat is ook straling (niet-ioniserend). In s05 staat het goed ('geen röntgenstraling'). Voorstel: 'zonder röntgenstraling'. Hetzelfde geldt voor de checkvraag 3 en het antwoord: 'geen röntgenstraling'/'geen ioniserende straling'. *Alleen beeld en docentdeel.* (Bij echo is 'geen straling' wel goed.)

9. **KAN — docentdeel, Getallen en bronnen, regel 'Dosis longfoto'.** Volgens de tabel is 2,6–2,8 mSv per jaar 'dus ± 0,05 mSv per week'. Dat gemiddelde bevat ook medische straling (± een derde), terwijl de film het heeft over 'de straling die altijd om je heen is'. Natuurlijke achtergrond is ± 1,9 mSv/jaar ≈ 0,035–0,04 mSv/week, dus de bewering in de film klopt zelfs beter. Pas de tabel aan. Noem eventueel ook radon in huis en kalium-40 in je lichaam bij 'uit de grond en uit de ruimte'. Bron: RIVM, Effecten van straling op de gezondheid (2,8 mSv totaal; ruimte ± 0,3, K-40 ± 0,16 mSv). *Alleen docentdeel.*

10. **KAN — film.json `puzzle` en titelkaart.** Daar staat 'een gescheurde knieband', in het script en de vraag 'een gescheurde kruisband'. Maak het overal 'kruisband' (de typfout 'kniebanden' komt uit plan.json). *Alleen beeld en tekst.*

11. **KAN — s05, 0,0 s ('Lotte gaat daarom in de MRI-scanner').** 'Daarom' verwijst naar het eind van H1, maar dat ging over de dosis van een longfoto, dus het verband is zwak. Voorstel: 'Op een röntgenfoto zie je haar kruisband niet. Lotte gaat daarom in de MRI-scanner.' *Nieuwe audio.* Verder: Lotte draagt in de scanner een gestreepte trui met jeans, terwijl ze in de rest van de film outfit `sport` draagt. Kies één outfit.

12. **KAN — vraag q09, opties.** Opties a ('kaatst *alles* terug') en c ('*helemaal niet*') zijn absoluut. Alleen b is genuanceerd, dus een slimme gokker kiest b. Voorstel a: 'als een witte vlek, want bloed kaatst veel geluid terug'. Voorstel c: 'als een grijze vlek, net als de lever eromheen'. *Alleen vraagkaart.*

13. **KAN — vraag q06.** Het hele hoofdstuk gaat over water en de zin vlak ervoor ('weinig vrij water: … donkere streep') wijst al naar c. Dat is acceptabel voor een eerste film, maar de vraag wordt makkelijk. Optioneel: zeg vóór de vraag 'hij is een donkere streep' zonder 'weinig vrij water', en noem 'weinig vrij water' pas in de alinea na de vraag. *Nieuwe audio s05 en s07.*

14. **KAN — s01, 0–6 s.** 'Opa Henk valt van een ladder … komt op zijn pols terecht, en op zijn zij': in beeld staat Henk rechtop naast een liggende ladder en wijst ernaar. Er is geen val te zien en hij houdt zijn pols niet vast (de look vraagt 'houdt zijn pols vast'). Voorstel: Henk zittend of half liggend op het gras met zijn hand om zijn pols, ladder schuin ernaast. *Alleen beeld.*

15. **KAN — s04, 14–19 s en 44–52 s.** De stem noemt 'je longen zijn op een foto bijna zwart' en 'een longfoto', maar er komt geen long of longfoto in beeld (alleen een zwart vakje, en daarna de pols- en kniefoto). Een kleine thoraxfoto (zwarte longen, witte ribben) bij 'Lucht' en bij 'longfoto ≈ één week' maakt beide zinnen concreet. *Alleen beeld.*

16. **KAN — s08, rib in de echo-dwarsdoorsnede (17–49 s).** De rib is getekend ín de leverlaag. In het lichaam ligt een rib in de buikwand, tussen de spieren en boven de lever. Voorstel: zet de rib in de laag 'spier', met de schaduw naar beneden door de lever. *Alleen beeld.*

17. **KAN — s08, label Henk (0–42 s).** De meta 'PIJN IN ZIJN ZIJ' loopt over de bovenkant van het vest en de kabel van de echokop (still s08 9,5 s). Zet hem ± 30 px hoger. Daarnaast ligt de chip 'te hoog om te horen' (13–16 s) over de kabel van de echokop in het blokschema. *Alleen beeld.*

18. **KAN — s10, Henk staat.** In H3 ligt Henk op de SEH, maar in het antwoord (s10) staat hij rechtop naast het scherm. Laat hem liggen, of op de rand van het bed zitten. *Alleen beeld.*

19. **KAN — s11, 3–7 s.** 'de buis draait rond Henk, terwijl het bed door de ring schuift': in de ring ligt alleen een roze ovaal. Henk is niet te zien en het bed schuift niet. Een kort zijaanzicht (Henk op het bed dat de ring in schuift) vóór het vooraanzicht laat het 'schuiven' en 'plakjes' beter zien. Dat staat ook in de look van het script. *Alleen beeld.*

20. **KAN — labels niet direct bij het onderdeel.** s13 22–30 s: 'ribben' staat buiten het CT-kader, naast het hoofd van Kim. Zet het op of bij een rib binnen het kader, bijvoorbeeld rechtsonder bij de milt. s11 31–35 s: 'lever · STAAT LINKS OP HET SCHERM' staat onder het kader. Mag op de lever zelf, met de meta eronder. *Alleen beeld.*

21. **KAN — s15, 21–30 s.** Dr. Kim wijst naar rechts, het beeld uit (pose `wijs`, kijk −1), terwijl de tekst over 'radioloog' links van haar staat. Laat haar naar links wijzen of gebruik pose `staan`. *Alleen beeld.*

22. **KAN — uitspraak s10 en s11 (audio beluisteren).** In s10 begint een zin met 'dokter Kim' (kleine letter, zie uitspraak.md), en de woordtijden laten 0,9 s tussen 'Dr.' en 'Kim' zien (8,5 → 9,4 s). In s11 staat 'Dr.' op 25,0 s direct na 'meer.' op 24,9 s. Luister of de stem hier hapert of 'dokter' inslikt. Opnieuw opnemen alleen als het hoorbaar mis is (*nieuwe audio*).

## Telling
MOET: 5 (alle alleen beeld). KAN: 17 (waarvan 6, 7, 11, 13 en eventueel 22 nieuwe audio vragen).

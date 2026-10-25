# Frisse beeldreview film 2: Miljoenen varianten: welke maakt ziek? (prompt v10, C10.7)

Reviewer: frisse helper (niet de maker), 25 okt 2026. Gekeken: contactblad van elke alinea op 25/60/92 %, losse stills op t = 0 en bij elke wissel/twijfelplek (s01–s27, vraagkaarten, hoofdstukkaarten, eindkaart), uitsneden van de spreekkamer. Vragen uit afgespeeld met Playwright (`?vragen=uit`) rond alle vijf vragen (knippen, ondertitel, beeld 3 s ervoor tot 2,5 s erna). Bronnen 8, 10 en 25 zelf opnieuw geopend. Tijden = lokale tijd in de alinea (echte audio).

## MOET

1. **Vragen uit · s06 0–1,6 s en s16 0–1,6 s.** 'Antwoord bé.' blijft hoorbaar en staat in de ondertitel. `antwCuts` in de speler herkent `(aa|bee|cee|a|b|c)`, maar de woordtijden hebben `bé.`. s11, s21 en s24 ('cee', 'aa') worden wel geknipt. Fix: `bé` (en `bè`) toevoegen aan de regex in `engine/player.js` (`antwCuts`, en voor de zekerheid in `antwKopCuts`/`korteAntwCuts`), en ook in `scripts/spelerfix.py` en in de repo-speler die het script injecteert. Daarna `spelerfix.py --check` en opnieuw afspelen. Dit geldt voor elke film met stem-invoer 'Antwoord bé' (Toeval of echt? controleren).
2. **s09 0,3–9,8 s: het antwoord staat al in beeld vóór de vraag.** In de stamboom krijgt het meisje drie streepjes: teal (van vader), oker (van moeder) en één grijs streepje met een vraagteken. Daarmee is 'één' (antwoord c) al te zien terwijl de vraag nog gesteld wordt. Fix (scenes_bi2.js s09): laat bij het meisje alleen teal- en okerstreepjes zien, met een vraagteken ernaast. Het eigen grijze/gouden streepje verschijnt pas in s11 bij 'de novo'.
3. **s17 25,5–30 s (P[2]): het gouden streepje van het meisje schuift naar 'onschuldig'.** De gesproken zin is bewust algemeen gemaakt ('veel varianten met onbekende betekenis …', bewering 25, los van het meisje). Maar het beeld gebruikt hetzelfde gouden streepje (= de variant van het meisje sinds s12) en laat het van het middelste vak naar 'onschuldig' glijden. Zo zegt het beeld wél iets over haar uitslag. Dat is gevoelig en vakinhoudelijk onjuist. Fix: geen goud. Gebruik vijf à zes neutrale grijze streepjes in het middelste vak; de meeste schuiven naar onschuldig/waarschijnlijk onschuldig, één of twee naar rechts of blijven staan. Het label 'veel …: later onschuldig' blijft.
4. **s14 3,8–14,8 s en s16 14–18 s: de gezichten van de ouders lezen als boos, niet als bezorgd.** `uit:'bezorgd'` geeft Anouk en Milan (s14 13,98) naar binnen omlaag gezakte wenkbrauwen en een strakke mond. Op 1920 px leest dat als boos op Dr. Kim. In s16 bij 'Ze zegt niet: er is niets' (17,9 s) hebben ze juist de neutrale glimlach, en dat past niet bij het moment. Fix: voor deze scène een zachtere bezorgde uitdrukking (wenkbrauwen binnenkant iets omhoog, mond recht). Kan als variant van `bezorgd` in lib_cast.js, eerst op het castboek laten keuren. In s16 `uitM/uitV:'bezorgd'` (zacht) i.p.v. `neutraal`. Dr. Kim in s14 rustig/ernstig in plaats van haar lichte glimlach.
5. **s21 15–17,5 s: 'de buurman' komt pas in de laatste paar tienden van de alinea.** `q.on('naast', 1)` valt bijna op het einde (17,0 s van 17,5). De koraalrode oorzaak, het label 'oorzaak · de buurman' en de boogpijl zijn bij de wissel nog half doorzichtig (still 17,4 s). Het begrip waar s24 op voortbouwt is dus nauwelijks te zien. Fix: start op 'echte' (15,7 s) of 'oorzaak'. Ook nagaan of `naast` als eerste woord-match niet 'naast' uit een ander woord pakt.
6. **Lettergrootte onder het minimum van Part C (C1: niets kleiner dan 28 px meta, labels 36 px), op veel plekken:**
   - trechter (`teken_bi2.js` r. 244–246): 'filter 1–3' 24 px × schaal 0,85 = ± 20 px; filternamen 26–34 × 0,85 = 22–29 px; aantallen 34 × 0,85 = 29 px. In de titelkaart (s 0,6) nog kleiner.
   - `kolomKoppen` 22 px (s01, s04).
   - stamboom 'vader/moeder/4 jaar' 26 px.
   - 'schematisch' 24 px (s19, s21).
   - scoreverdeling 'lager/hoger/scores van anderen' 26 px.
   - opleidingskaart-niveau 24 px (s26).
   - s04 'referentie/meisje' 26 px.

   Fix: trechter op schaal 1 tekenen of de lettergrootte compenseren (/s). Meta overal ≥ 28, labels en aantallen ≥ 36.
7. **s11 0–5,5 s: het beeld is leeg op t = 0.** Alleen de gedimde trechter en de antwoordtag staan in beeld tot 'zaadcel' (5,6 s), terwijl gezegd wordt 'Elk kind heeft tientallen nieuwe veranderingen'. Bij Vragen uit valt dit direct na 'Vader en moeder zijn gezond.' (C10.7: beeld gevuld op t = 0). Fix: laat vanaf t = 0 het kind-rondje uit de stamboom zien met een rijtje van ± 40 kleine grijze streepjes ('tientallen nieuw', telbaar als 'veel'). Op 'zaadcel of de eicel' gaan ze naar de geslachtscellen.
8. **Vragen uit · beeld (alle vijf antwoordalinea's).** De antwoordtags 'antwoord b: ieder mens verschilt zoveel', 'antwoord c: één of twee', 'antwoord b: nog onduidelijk …', 'antwoord c: ongeveer vijftigduizend' en 'antwoord a: minder goed …' blijven in de standalone in beeld. Zoals bij fo1: bij het inbouwen in de repo `scripts/antwoordtekst.py` draaien en met `--check` en een still controleren. De tags staan al in de vorm 'antwoord x: inhoud', dus de inhoud blijft staan.

## KAN

9. **s24 (Vragen uit): de vertelling leunt op de vraag.** Zonder vraag en tag zegt de stem nergens dat de score minder goed werkt bij andere afkomst. Alleen de oorzaak komt aan bod ('de meeste deelnemers … Europese voorouders … buurman'). Na antwoordtekst.py blijft de losse kop 'minder goed dan bij Europese voorouders' staan, zonder onderwerp. Fix: maak er een volwaardige regel van, 'risicoscore: minder betrouwbaar bij niet-Europese afkomst', bij de wereldbol (geen antwoordtag).
10. **H4-hoofdstukkaart:** de ondertitel 'Waarom is 0,05 te soepel als je een miljoen keer test?' verklapt richting vraag q20, want afleider (a) 'al streng' valt dan meteen af. Voorstel: 'Wat gebeurt er als je een miljoen keer test?'.
11. **s18 21–25 s:** het script zegt 'iets vaker', maar in beeld is het 8 van de 12 G bij de zieken tegen 3 van de 12 bij de gezonden. Dat is fors vaker. Maak het 7 tegen 5, of 6 tegen 4.
12. **s04 9,3 s:** Sam wijst met een lange horizontale arm dwars over Dr. Kim heen naar het scherm. Zet Sam rechts van Kim (dichter bij het scherm) of gebruik `wijsOmhoog`.
13. **s04 2,4–3,3 s:** het label 'variant · een plek die afwijkt' komt pas na het woord 'variant' in beeld (2,5 s: nog vaag). Laat het 0,3 s eerder starten.
14. **s16 0–1,6 s:** alleen de antwoordtag staat in beeld tot 'Overblijven'. Laat de stempel op t = 0 al met 30 % zichtbaar zijn, of begin met de dichte dossiermap.
15. **s14 2,0 s:** Sams handpose bij 'vraagt Sam' (rechterhand met een koraalkleurig vlekje bij de borst). Controleer of `pose:'denk'` goed tekent of dat er iets van de kleine schaal door zijn hand loopt.
16. **s14/s16 hand op hand:** Anouks arm loopt lang en recht over de tafel naar Milans hand. Hij leest als uitgerekt. Leg haar hand op zijn onderarm, dichterbij.
17. **s26 15,6 s:** 'Biologie of Moleculaire Levensw.' is afgekort. Schrijf het voluit op twee regels. De mastertitel is 'Bioinformatics and Systems Biology' (B25); kaart en tekst zeggen 'Bioinformatics'. Kort is acceptabel, maar dan op de kaart 'Bioinformatics (and Systems Biology)'.
18. **s26 25,4 s:** de kaart zegt 'Klinisch geneticus · in een academisch ziekenhuis'. Dat staat niet in script of bronnen.md. Bron toevoegen (KNMG-LOP) of weghalen.
19. **s11 5–19 s:** de drie gouden streepjes boven de zaadcel staan los in de lucht (niet op de zaadcel) en vlak naast het kaartje 'in de eiwitcode: meestal 1 of 2'. Daardoor lijken 'drie streepjes' en 'één of twee' over hetzelfde te gaan. Zet de streepjes op de zaadcelkop en het kaartje apart bij de bevruchte eicel.
20. **s18 6,4 s:** 'Kim schudt haar hoofd' wordt alleen als kruisje getoond. Een korte hoofdschudanimatie (of `kijk` heen en weer) zou het warmer maken.

## Klopt (gecontroleerd)

- Gevoeligheid: het kind komt nergens in beeld (alleen een ingekleurd rondje '4 jaar', een kindertekening en een dichte dossiermap). Geen bed, geen spuit. Sam zit niet bij het gesprek ('zonder Sam · privé', tijdkaartje 'een paar weken later'). De ouders Anouk en Milan komen alleen in s14/s16 voor.
- Codons: GAG → GAA (E → E, stil), GAG → GTG (E → V), CAG → TAG (Q → stop) kloppen.
- GWAS-grafiek: lage grens 0,05 eerst, de som pas na het antwoord, de hoge lijn '0,05 / 1 000 000' en het label 'schematisch'.
- Vijfvaksschaal en '= onduidelijke uitslag' kloppen met de Nederlandse klassen 1–5.
- Radboudumc: 3 van de 10 gemarkeerd = 'bijna een derde'.
- Kleuren: basen in paarse tinten, goud = focus, koraal = kruis/ziek, groen = conclusie. Geen wijslijnen.
- Vragen uit, geluid en ondertitel: de vraagzinnen en 'Wat denk je?' worden in s04, s09, s14, s19 en s22 netjes geknipt. 'Antwoord cee/aa' wordt geknipt in s11, s21 en s24. Geen vraagkaarten in de tijdlijn. Wat overblijft is samen begrijpelijk (behalve MOET 1 en KAN 9).

## Bronnen (beweringen 8, 10, 25: op ✓ gezet zonder hercontrole)

Zelf geopend op 25 okt 2026; statussen in `bronnen.md` aangepast:

- **8 (één op de tien → zeldzame ziekte): ✓ → ≈.** In Biesecker (B7) filtert het recessieve voorbeeld 'MAF >10%'. Het dominante voorbeeld eist 'never before observed'. De algemene raad is een grens van 5–10 × de ziektefrequentie. De redenering klopt, maar er is maar één bron (de regel is ≥ 2, ≥ 1 niveau A) en B7 rekent in allelfrequentie. Tweede bron voorstellen: ACMG/AMP BA1 (> 5 %, B9 volledige tekst) of een gnomAD-filterhandleiding.
- **10 (tientallen nieuwe veranderingen, ontstaan in zaadcel/eicel): ✓ blijft.** B4: '44 to 82 de novo single-nucleotide mutations …', 'one to two affecting the coding sequence', '~80% … paternal'. B3: 'On average, 82 … de novo SNVs … per genoom'. Daarbij een correctie in bewering 13: in B4 gaat de 7 % over mozaïek bij het kind zelf (postzygotisch); 4 % is mozaïcisme bij een ouder. In bronnen.md stond 7 % bij de ouder.
- **25 (veel VUS's blijken later onschuldig): ✓ → ≈.** B17 (Quest, niveau B, het lab zat zelf in de studie): '80.2% … benign or likely benign' van de VUS's die werden geherclassificeerd; multigenpanels, 1,6 miljoen mensen. Volgens het persbericht (BioSpace) werd maar een minderheid van alle VUS's geherclassificeerd. B11 (JAX, B): 'many will be reclassified as benign'. B10 (NHS, A): alleen 'up- or downgraded'. Het artikel zelf (JAMA Netw Open 2023, PMC10600581) kon ik niet openen (captcha). Er is dus geen A-bron die het zelf zegt. Openen: Chen 2023 zelf, of Mersch 2018 (JAMA). De formulering 'veel' is verdedigbaar. Het beeld (MOET 3) gaat verder dan de zin.
- De regel 'Stand' bovenin bronnen.md telt nog volgens v1 en moet opnieuw geteld worden.

## Logboek

De MOET-punten 1–7 horen in `films/logboek/fouten.jsonl` zodra de film in de repo staat. Kandidaat voor een algemeen patroon: 'antwoordletter-respelling niet in de knipregex' (MOET 1) en 'antwoord in beeld vóór de vraag' (MOET 2).

## Verwerkt (maker, 25 okt 2026)

Niet opnieuw ingesproken. Gebouwd met `bouw.sh` op de echte woordtijden; cuecheck schoon; stills van alle gewijzigde scènes bekeken (ook met `?vragen=uit`).

1. **Gedaan.** `bé|bè` toegevoegd aan de herkenning van antwoordletters in `engine/player.js` (`antwCuts`, `losAntwCuts` LET/OK). In `scripts/spelerfix.py` staat de regex zelf niet. Daar zit nu een idempotente stap `fix_antwletter` die in elke speler `aa|bee|cee|a|b|c` vervangt door `aa|bee|bé|bè|cee|a|b|c`. Die stap draait mee bij elke gewone run. `--check` meldt het als opmerking en laat het geen MIST worden: de 7 bestaande MIST waren er al vóór deze wijziging. Niet gecommit, repofilms nog niet bijgewerkt (dat gebeurt bij de volgende `spelerfix.py`-run). Test met `?vragen=uit`: s06 knip 0–1,55 s, s16 0–1,57 s, ondertitel begint bij 'Ieder' / 'Overblijven'.
2. **Gedaan.** s09: het meisje heeft alleen een teal- en een okerstreepje (geërfd), met een vraagteken ernaast. Haar eigen streepje verschijnt pas na de vraag (s11/s12).
3. **Gedaan.** s17: zes neutrale grijze streepjes in het middelste vak. Vier schuiven naar (waarschijnlijk) onschuldig, één blijft staan, één gaat naar waarschijnlijk ziekmakend. Geen goud.
4. **Gedaan.** Nieuwe uitdrukking `ernstig` in `engine/lib_cast.js` (vooraanzicht en zijaanzicht): binnenkant van de wenkbrauwen iets omhoog, mond recht. s14: Anouk, Milan en Kim `ernstig` (Milan `praat` bij zijn vraag). s16: ouders `ernstig`, Kim `praat` en vanaf 'er is niets' `ernstig`, dus geen glimlach. Let op: de uitdrukking staat alleen in de hw-kopie van lib_cast.js. Bij het inbouwen ook in `personages/lib_cast.js` zetten en op het castboek laten keuren. De oude versie staat in de scratchpad (`lib_cast_voor_ernstig.js`).
5. **Gedaan.** s21: de oorzaak, 'de buurman' en de boogpijl starten op 'maar' (woord 36 van 44), ± 2 s vóór het einde.
6. **Gedaan.** Trechter: tekstgroottes gedeeld door de schaal (meta ≥ 28, namen en aantallen ≥ 36 op het scherm; lange filternaam krimpt tot hooguit 28 als hij niet past). Titelkaart idem. `kolomKoppen` 28 ('ref. → meisje'). Stamboomlabels 28/s. 'schematisch' 28. Scoreverdeling 28. Opleidingskaart: niveau 28, onderregel 30. s04: 'referentie'/'meisje' 28.
7. **Gedaan.** s11 op t = 0: het kind-rondje met 40 kleine grijze streepjes en 'tientallen nieuwe veranderingen'. Op 'zaadcel' maakt dat plaats voor zaadcel en eicel.
8. **Bij het inbouwen.** `scripts/antwoordtekst.py` (+ `--check`) en `kortantwoord.py` draaien op de film in de repo. De tags hebben al de vorm 'antwoord x: inhoud'. In de standalone staat de tag nog (zie still `qa2/vu_s16.png`).

KAN:
9. **Gedaan.** s24: regel 'risicoscore: minder betrouwbaar bij niet-Europese afkomst' bij de wereldbol (geen antwoordtag).
10. **Gedaan.** H4-mini: 'Wat gebeurt er als je een miljoen keer test?'.
11. **Gedaan.** s18: 7 van 12 G bij de zieken, 5 van 12 bij de gezonden.
12. **Gedaan.** s04: Sam wijst omhoog (`wijsOmhoog`), niet meer over Kim heen.
13. **Gedaan.** s04: label 'variant' begint 0,3 s vóór het woord.
14. **Gedaan.** s16: stempel 'overblijven ≠ bewijs' staat vanaf t = 0 op 30 %.
15. **Niet meer van toepassing.** s14 begint nu met de nieuwe scène (Sam en Kim, Sam in `denk`). Op de stills is geen koraalvlek zichtbaar.
16. **Niet gedaan.** De hand op hand loopt via `handOpHand` in lib_cast.js (gebouwd door de hoofdsessie). Op de stills ligt Anouks hand nu dicht bij die van Milan. Een kortere arm vraagt een wijziging in de pose: eerst op het castboek.
17. **Gedaan.** s26: 'Biologie of / Moleculaire Levenswetenschappen' op twee regels. Master: 'Bioinformatics (and Systems Biology)'.
18. **Gedaan.** 'in een academisch ziekenhuis' vervangen door 'na geneeskunde' (staat in script en bronnen).
19. **Gedaan.** De drie gouden streepjes staan op de zaadcelkop. Het kaartje 'in de eiwitcode: meestal 1 of 2' staat bij de bevruchte eicel, onderaan.
20. **Niet gedaan.** Het hoofdschudden van Kim blijft een kruisje: de cast heeft geen hoofdrotatie en `kijk` heen en weer spiegelt het hele lichaam (risico op een rare sprong).

Bronnen: regel 'Stand' opnieuw geteld: 23 ✓ · 13 ≈ · 0 ! · 2 ? · 1 casus.

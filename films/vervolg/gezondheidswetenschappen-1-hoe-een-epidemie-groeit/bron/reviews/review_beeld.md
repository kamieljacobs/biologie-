# Beeldreview: Hoe een epidemie groeit en stopt (Gezondheidswetenschappen 1)

Reviewer: Claude, frisse beeldreviewer (C10.7). Ik heb het maken niet gezien. Datum: 27 okt 2026.
Bekeken: `film/standalone.html`. Stills op t = 0 en 0,6 s na het begin van elke zin van elke alinea (140 stills), plus 31 losse stills op twijfelmomenten. Vragen uit (`?vragen=uit`): 78 stills, van 6 s vóór tot 6 s na elke weggevallen vraag (globale tijd via `seekGlobal`). Ook nagekeken: titel, hoofdstukkaarten, alle vraagkaarten (aftellen en onthullen), eindkaart, begrippen en teksten onder de film.
Naast elkaar gelegd met `script_v2.md` (storyboard), `words/<sid>.json`, `getallen.md`, `BEELDAFSPRAKEN.md`, `REEKS-gezondheid.md` en de C10.7-checklist.
De stills staan in de scratchpad `/tmp/claude-0/-home-claude/eb539ceb-0c07-5d5b-9a7f-9c59c42055a9/scratchpad/gzrev/`: `zin/` (per zin), `los/` (twijfelmomenten), `uit/` (Vragen uit), `kaart/` (titel, kaarten, vragen) en `sheets/` (contactbladen). Alle bestandsnamen beginnen met `gzrev_`. Pixelmaten gelden voor het canvas van 1920×1080.

**Samenvatting: 17 MOET, 26 MAG.**

Goed: Farid is overal de castboekversie (`farid`, bordeauxrode trui, baard, badge). Yasmin draagt de badge STAGIAIR. Bilal zit in de herinnering. Er staan geen ic-beelden, patiënten, angstbeelden of sterftecijfers in beeld, en de toon bij corona is zakelijk. Het virus (s08) is een rustig pictogram. Elke modelcurve heeft 'MODEL' (en 'SCENARIO, GEEN VOORSPELLING' in H4). Het dossier heeft 'OEFENDOSSIER · RONDE GETALLEN', en de echte getallen voor de ic en de verdubbeltijd staan op aparte kaartjes met bron en jaar. Er staat geen antwoord in beeld vóór 'Antwoord x': tijdens de vragen staan '?', 'R = ?' en drie streepjes op de balk zonder getallen. Bij Vragen uit zijn het geknipte geluid en de ondertitels schoon: geen vraagzin, geen 'Antwoord x' en geen '?' in beeld. Het doorschieten (s22) is goed: drempel, gearceerd deel en 'model: ± 94 % uiteindelijk'. Het decor (het GGD-kantoor) staat alleen onder de kantoorscènes (cold open, begin H1, begin H4, recap).

---

## MOET (fout, tegenstrijdig, onleesbaar of tegen de keuring)

1. **Vragen uit, s08 / s11 / s15 / s19 / s22 / s27 (vanaf t = 0)**: de groene antwoordregel blijft in beeld met de letter erbij: 'antwoord b: R wordt ook ongeveer de helft', 'antwoord c: ongeveer 160 …', 'antwoord a: …' enz. (`uit/gzrev_uit_q07_+00_s08_1.60.png`, `…q10_+00_s11_1.49`, `…q14_+00_s15_1.57`, `…q18_+00_s19_1.49`, `…q21_+00_s22_0.74`, `…q26_+00_s27_0.92`). Er staat geen ANTWOORDTEKST_MARK in de html, dus `antwoordtekst.py` is niet gedraaid. → `python3 scripts/antwoordtekst.py <film>` draaien (en spelerfix, kortantwoord, antwoordletter met `--check`) en opnieuw nakijken. Bij Vragen uit mag alleen de inhoud blijven ('R wordt ook ongeveer de helft') of moet de regel helemaal weg.

2. **s01 5,9–8,0 s** (`zin/gzrev_s01_006.49`, `zin/gzrev_s01_008.53`): "Eén melding, één blokje" en het storyboard ('één koraal blokje valt op DAG 0'): het scherm is dan ±300 px breed in het decor en het blokje is een stip van een paar pixels. Het label 'ÉÉN BLOKJE = ÉÉN MELDING' zweeft bij 8,5 s naast het scherm op de muur (x ±1330, y ±115), buiten het vel. → Eerst inzoomen op het scherm (vóór 5,9 s), en het blokje groot op 'blokje' (7,1 s). Het label binnen het vel, rechtsboven.

3. **s01 8–11 s (inzoomen)** (`zin/gzrev_s01_008.53`): bij het inzoomen zakken Yasmin en Farid door de onderrand. Benen, voeten en schaduwstreep staan onder y 880, achter de ondertitel. → De camera inzoomen op het scherm (middelpunt hoger), zodat de figuren boven y 860 blijven of het beeld uit lopen langs de zijkant, niet langs de onderkant.

4. **s01 16,9–19 s** (`zin/gzrev_s01_017.55`): "En waarom stopt een epidemie uiteindelijk?" De puzzelkaart toont alleen 'Waarom zo snel?'. De tweede vraag uit het storyboard ('puzzelkaart met de twee vragen') komt niet. → Tweede regel 'Waarom stopt het?' op 'stopt' (17,5 s), in hetzelfde kader.

5. **Titelkaart 1–5 s** (`kaart/gzrev_title_03.00`): de top van de modelcurve (x ±1420–1490, y ±340–380) loopt dwars door de letters van 'stopt' in de titel. → De curve 120 px lager of 15 % kleiner (top onder y 420), of de titel op twee regels ('Hoe een epidemie / groeit en stopt').

6. **s03 6,3–8,6 s** (`zin/gzrev_s03_006.86`, `los/gzrev_s03_008.60`): bij de overgang naar het scherm steekt een reuzenarm van Farid zonder lichaam rechtsonder het beeld in (hand ±200 px, arm tot onder y 1080, over de ondertitel). Dat klopt niet met de maat van Farid in het decor en ligt onder y 880. Daarna staat 'BRON- EN CONTACTONDERZOEK' over het eerste blokje (x ±1095–1110, y ±66 op het halve blad). → Arm weg: Farid klein linksonder zoals in het storyboard, met de stift aan de pijl. Het label 20 px hoger, of links van de kolom.

7. **s05 16,6–22 s** (`zin/gzrev_s05_016.48`, `los/gzrev_s05_020.50`): "Stel: tien contacten per dag, vijf dagen lang, en bij één op de twintig …". De schuifjes blijven leeg ('10 × 1/20 × 5 =' staat er al wel). De waarden 10, 1/20 en 5 verschijnen pas rond 22–23 s, als de stem al bij 'Dan steekt één zieke' is. → '10' op 'tien' (16,6 s), '5' op 'vijf' (18,0 s), '1/20' op 'twintig' (20,0 s). '2,5' op 'twee en een half' (24,9 s) is goed.

8. **s06 0–6 s, herinnering maart 2020** (`zin/gzrev_s06_000.00`): Kamiel keurde 'Yasmin en Bilal in een sepia kader'. Het kader heeft een gouden rand, maar de inhoud is in volle kleur op neutraal donkergrijs (rode trui van Bilal, witte jas van Yasmin). Het leest niet als herinnering. → De inhoud van het kader in sepia: warme bruintinten, verzadiging omlaag, eventueel een lichte vignet. Het label 'MAART 2020' kan blijven.

9. **s08 15–25 s, staven seizoensgriep / corona / mazelen** (`los/gzrev_s08_024.80`): dit zijn echte getallen, maar ze staan niet op een kaartje met bron en jaar. Er staat alleen het meta 'R₀ OF R · SCHATTINGEN · VUISTREGELS' (keuring: echte getallen alleen met bron en jaar). → Onder de as een bronregel zoals bij de andere kaartjes (bijv. 'LCI/RIVM · CHOWELL E.A. 2008 · SCHATTINGEN', uit `getallen.md`), of het hele staafpaneel als echtKaart.

10. **s11 16–23 s** (`los/gzrev_s11_021.90`): het kaartje 'MAART 2020 · RIVM: verdubbeling ± elke 5 à 6 dagen' ligt over de astitel 'MELDINGEN PER DAG'. De bovenkant van die tekst steekt half boven de kaart uit en leest als doorgestreept. → Kaart 60 px lager en naar rechts (x ≥ 300), of de astitel verbergen zolang de kaart staat.

11. **s15 13,3–19 s, R-meter** (`zin/gzrev_s15_017.23`, `los/gzrev_s15_014.50`): de meter 'R IN NEDERLAND · VOORJAAR 2020 · SCHATTING RIVM, 2020' eindigt op 'R ≈ 0,8' en begint op 'R ≈ 2,5' / 2,4. Geen van die waarden staat in `getallen.md` (rij 11: 'rond of onder de 1', zonder getal). Met de bronregel eronder lijken het RIVM-cijfers. → Op de meter geen getal tonen, of 'R ≈ 1' op 'één' en daarna 'R < 1' op 'eronder'. De naald mag zakken. Begin zonder getal (of 'R₀ ≈ 2–3', dat staat wel in getallen.md).

12. **s19 16,3–21 s** (`zin/gzrev_s19_016.94`, `los/gzrev_s19_019.00`): "Eén min een derde is twee derde, ongeveer zevenenzestig procent". Bij 16,9 s staat alleen '1 − 1/R₀', bij 19 s '= 1 − 1/3'. '= 2/3 ≈ 67 %' verschijnt pas rond 21 s, als de stem al bij 'groepsimmuniteit' is. → '= 1 − 1/3' op 'een derde' (16,8 s) en '= 2/3 ≈ 67 %' op 'twee derde' (17,8 s).

13. **s19 33–36 s** (`los/gzrev_s19_035.90`, `uit/gzrev_uit_q21_-06_s19_36.36`): het meta 'VUISTREGEL · IN HET ECHT GEEN WILLEKEURIGE MENGING' ligt over het label 'DREMPEL' boven de som (tekst over tekst). → Het meta onder de mazelenbalk (y ±1000 op het halve canvas is te laag, dus: rechts naast '± 95 %'), of 'DREMPEL' weg zodra het meta komt.

14. **s22 7,8–25 s, vakinhoud** (`los/gzrev_s22_025.00`): de grafiek is 'NIEUWE ZIEKEN PER DAG'. De top ligt bij dag ±19–20, maar de gouden stippellijn 'VANAF HIER MINDER NIEUWE ZIEKEN' staat bij dag ±22,5 (waar de balk de drempel kruist). Het beeld zegt dus dat de daling bij de lijn begint, terwijl de staven daar al twee dagen dalen. In het SIR-model piekt het aantal mensen dat tegelijk ziek is (I) op de drempel, het aantal nieuwe zieken per dag piekt eerder (zoals het storyboard ook zegt: 'de top van de stapel ligt iets links daarvan'). → Het label aanpassen naar 'VANAF HIER MINDER MENSEN TEGELIJK ZIEK', of een dunne lijn 'tegelijk ziek' tekenen die precies op de gouden lijn piekt. Niet het label op de top zetten, want dan klopt de drempel niet.

15. **s27 8,7–10,5 s** (`zin/gzrev_s27_009.32`): bij 'Verandert een aanname, dan verandert de uitkomst' staan twee curves door elkaar. De hogere curve wordt bij dag 50 recht afgesneden (een harde verticale rand). Dat leest als een tekenfout, niet als een overgang. → Overvloeien tussen de oude en de nieuwe curve over de hele as (alpha), of de oude als stippellijn houden en de nieuwe eroverheen tekenen. Geen knip bij dag 50.

16. **Vraagkaart q21, onthullen** (`kaart/gzrev_q21_reveal_3.png`): de uitleg heeft drie regels. De derde regel ('raken bij R₀ = 3 uiteindelijk ruim negen op de tien …') loopt onder de rand van het groene kader door, tot de onderkant van het beeld. → Kader laten meegroeien met het aantal regels en het geheel 60 px hoger, of de uitleg in `film.json` inkorten tot twee regels (bijv. 'R zakt vanzelf onder de één, maar wie nog ziek is steekt anderen aan: in het model raakt ruim 9 op de 10 besmet, niet iedereen.').

17. **Eindkaart** (`kaart/gzrev_end_08.90.png`): zes kernzinnen in plaats van drie (Part C: 'End card: three key sentences with an annotatiehaak'). Het blok is daardoor een muur van tekst. → Terug naar drie zinnen, bijvoorbeeld: (1) R en waar het van afhangt, (2) boven 1 keer twee / afvlakken, (3) drempel 1 − 1/R₀ en het model als 'wat als'. De haak blijft zoals hij is (de plek is goed).

## MAG (beter)

1. **s01 0–5 s**: de koppen boven Yasmin en Farid komen pas bij 0,6 s en 3,3 s. → Op t = 0 (of op 'Yasmin' en 'Farid').
2. **s03, s09, s16, s20**: Farid wijst met een gestrekte arm naar lege as of lege ruimte (s09 3–8 s naar DAG 20 waar nog niets staat; s16 5 s naar niets). → Hand op het deel waar de stem het over heeft (de nieuwste stapel, de lijn 'VANDAAG'), of de arm omlaag.
3. **s05 10–13 s**: 'bus', 'klas' en 'training' komen ±1 s na het woord, en de groep 'training' staat eerst grijs zonder label. Telpoppetjes in goud, terwijl contacten (vatbaar) volgens de seriekleuren teal zijn. → Label en groep op het woord (11,4 / 11,9 / 12,4 s), teal poppetjes.
4. **s06 4,9–6 s** (`zin/gzrev_s06_005.52`): tijdens de overgang overlapt het kleiner wordende kader het schuifpaneel ('contacten per dag' half eronder). → Kader eerst kleiner, dan de schuifjes inschuiven. De stem zegt 'haar ouders ook', maar de ouders staan niet in beeld (storyboard: ouders achter een laptop). Optioneel twee volwassen silhouetten achter de laptop.
5. **s08 3,8–5 s**: '1,25' verschijnt ±1 s na 'één komma vijfentwintig' (bij 4,6 s staat er nog een overvloeiend 'R≈?'). → Op 'komma' (4,0 s).
6. **s08 6–11 s**: het blok 'het virus + wat mensen doen' komt pas bij ±11 s, de stem zegt 'eigenschap van het virus' al op 7,1 s. De zes gouden poppetjes bij 'wat mensen doen' zijn geen telling (afspraak: telpoppetjes alleen in tellingen). → Blok op 'virus' (8,1 s), 'wat mensen doen' als Yasmin klein of als pictogram 'contacten' (twee figuren met een pijl).
7. **s08 17–25 s**: 'VEEL MENSEN AL DEELS IMMUUN' raakt de bovenkant van de griepstaaf. Het kleine 'R₀' onder 'corona 2020 ≈ 2–3' ligt op de stippelrand. → 12 px hoger.
8. **s09 3,3–5 s**: '10' komt pas ±1 s na 'tien'. De stapel van 10 is twee ongelijke kolommetjes en lijkt daardoor even hoog als de 20. → Eén kolom van halve hoogte (zoals in s11 vanaf 40: hoogte evenredig met het aantal).
9. **s11 8,0–11 s**: de stippellijn 'ELKE 5 DAGEN 10 ERBIJ · ZO GAAT HET NIET' komt pas rond 11 s, na 'niet steeds tien bij' (8,0–9,5 s). → Op 'tien' (9,2 s).
10. **s12 2–18 s**: de stippellijn 'wat de zorg aankan' loopt door tot aan het hoofd van Farid (x ±1390), en het ic-kaartje dekt de astitel 'MELDINGEN PER DAG'. → Lijn laten eindigen bij de laatste staaf (+40 px), kaart 40 px lager of de astitel rechts van de kaart.
11. **s13 2,5–6 s**: het tweede vel 'MET MAATREGELEN' is leeg tot ±5 s en de curve is pas bij ±7 s af ('lagere, bredere curve' 4,7–5,9 s). → Curve op 'tekent' (3,6 s) laten beginnen en op 'curve' (5,9 s) af hebben.
12. **s15 13–19 s**: het meta 'NA DE MAATREGELEN VAN HALF MAART' staat los, 40 px onder het meterkader. → Binnen het kader onder de bronregel.
13. **s16**: de gevulde staven hebben bij dag 12 een losse piek die nergens over gaat. → Vloeiende curve. Het label 'twee weken later' komt pas bij ±9 s ('week of twee' 7,1 s).
14. **s17 2,0–4,5 s**: de balk 'IMMUUN' komt pas bij ±4,5 s ('balk' 2,0 s, 'hoeveel mensen al immuun' 2,5–4,0 s). → Op 'balk'.
15. **s19 9,1–13 s**: 'R < 1' komt pas rond 12 s ('onder de één' 11,0 s). Bij 'R < 1' toont het plaatje nog steeds precies één pijl, en dat is R = 1. → De overgebleven pijl gestippeld of half zo dik bij 'iets meer'.
16. **s19 25–29 s**: 'niet immuun · LOOPT DAN MINDER KANS' komt pas bij ±28 s ('Ook wie niet immuun is' 25,1 s) en raakt rechts het pilletje 'groepsimmuniteit'. → Op 'niet immuun', 20 px ruimte.
17. **s19 → s20**: de drempel wordt al in s19 (±21 s) als gouden lijn op de balk gezet, en in s20 begint de balk leeg en zet 'Farid tekent de drempel' hem opnieuw. Ook heet de balk in s17/s19 'IMMUUN · NA BESMETTING OF VACCIN' en in s20/s22 'OOIT BESMET (IMMUUN OF NU ZIEK)'. → In s19 de drempel als som laten staan en de gouden lijn pas in s20 tekenen. De naamwissel van de balk aankondigen (meta 'NU: IEDEREEN DIE HET HEEFT GEHAD') of in s17 al 'ooit besmet of gevaccineerd' gebruiken.
18. **s22 19–25 s**: het storyboard vraagt 'de laatste teal poppetjes blijven vatbaar staan'. Dat ontbreekt, en het blauwe stukje rechts in de balk is klein. → Drie à vier teal poppetjes boven het blauwe eind van de balk, meta 'NOOIT BESMET'.
19. **s23 0–6 s**: het scherm toont de bakken van het model al vóór 'Daarvoor bouwt Farid een model' (5,3 s). Het label 'dossier · WAT ER GEBEURD IS' raakt de opgeheven arm van Farid. → Op het scherm alleen het dossier tot 'model'. Het label 40 px naar links.
20. **s23 7–10 s**: de bakken 'vatbaar', 'besmettelijk' en 'hersteld' komen ±1 s na hun woord. → Op het woord (8,0 / 8,8 / 10,0 s).
21. **s24 5–12 s**: de knop staat pas bij ±9 s op 50 % ('helft' 6,1 s). De curve 'stippel: knop op 100 %' is getekend als donkere staven, niet als stippellijn. Farid draait in het storyboard zelf aan de knop, maar is in H4 alleen in het decor te zien. → Knop op 'helft', echte stippellijn, en eventueel een kleine Farid met zijn hand op de knop.
22. **s25 1,4–3,4 s**: 'piek: 1300' komt pas bij ±3 s, de stem zegt 'één getal' al op 1,7 s. Bij Vragen uit valt het getal daardoor helemaal weg (de zin 'Het model geeft voor de piek één getal' blijft). → Op 'getal' (1,9 s).
23. **s27 12–14 s**: het kaartje 'MAART 2020 · RIVM' schuift half over de grafiek, waarvan 'SCENARIO, GEEN VOORSPELLING' en 'andere aanname, andere uitkomst' nog zichtbaar door de kaart heen staan. → De grafiek eerst wegfaden, dan de kaart.
24. **s28 0–4 s**: model en dossier komen pas bij 'Waar lopen ze uit elkaar?' (3,5 s), de stem zegt 'over het dossier heen' al op 1,9–3,0 s. De hand van Yasmin wijst naar het eind van de modellijn, niet in de gestippelde cirkel. → Beide curves vanaf t = 0 (of op 'model', 1,3 s), de hand tot in de cirkel.
25. **s29 3–19 s**: de recapkaartjes komen ±1,5–2 s na hun zin ('R: hoeveel steekt één zieke aan' bij ±7 s, stem 3,3–6,2 s; 'drempel' bij ±18 s, stem 15,8–17,8 s). Het complete dossier op het scherm is te klein om te lezen. → Kaartje op het begin van zijn zin. Het scherm optioneel kort uitvergroten.
26. **Titelkaart en hoofdstukkaart 1**: het meta rechtsboven op de titelkaart noemt alleen 'HAVO · VWO · GEZONDHEIDSWETENSCHAPPEN · EPIDEMIOLOGIE' en niet de serie ('WAT WORD JIJ? · 1/3'). De ondertitel van hoofdstukkaart 1 herhaalt de titelvraag letterlijk ('Hoeveel mensen steekt één zieke aan …'). → Serie en nummer in het meta, en de ondertitel H1 bijv. 'R, R₀ en waar het van afhangt'.

Niet als punt, ter info: bij Vragen uit lopen de geknipte zinnen goed door ('Stel R-nul is drie.' → 'Een zieke ontmoet drie mensen …'; 'Stel dat niemand iets doet.' → 'Elke zieke ontmoet steeds meer mensen …'). De '?'-vakken, 'R = ?' en de drie streepjes vallen in het weggeknipte stuk of staan er alleen als vraag zonder antwoord. De uitlegvakken van de vraagkaarten staan onder y 880, maar daar staat tijdens een vraag geen ondertitel. Dat is de vaste plek van de speler en dus geen punt, behalve de overloop in MOET 16.

---

## Verwerking (bouwer, 27 okt 2026; gebouwd op de echte woordtijden, silalign)

MOET
1. Vragen uit / antwoordregel: niet hier opgelost; gaat via de repo-scripts na het inpakken (antwoordtekst.py, kortantwoord.py, antwoordletter.py, spelerfix.py, met `--check`). Alle antwoordregels staan al als 'antwoord x: <inhoud>'.
2. s01: inzoomen op het scherm start nu op 'dossier' (±4,7 s). Op 'blokje' valt één groot blokje (240×120 px) midden op het vel en krimpt naar zijn plek bij DAG 0. Het label 'ÉÉN BLOKJE = ÉÉN MELDING' staat binnen het vel, rechtsboven.
3. s01/s03: Yasmin en Farid faden in het eerste derde van de zoom uit, dus er zakt niets meer door de onderrand.
4. s01: 'Waarom stopt het?' verschijnt op het tweede 'waarom' (17,1 s) in hetzelfde kader.
5. Titel: de modelcurve is lager en platter (top ±y 450), dus vrij van de titel.
6. s03: geen reuzenarm meer: de kantoorfiguren faden uit tijdens de zoom en de kleine Farid linksonder komt pas na de zoom. 'BRON- EN CONTACTONDERZOEK' staat 60 px hoger, vrij van de blokjes.
7. s05: de waarden worden op de woorden gezet (10 op het tweede 'tien' = 16,6 s, 5 op 'vijf', 1/20 op 'twintig'). Op de contactsheet staan ze goed.
8. s06: de herinnering is nu echt sepia (canvasfilter sepia/desaturatie op de hele inhoud, warme bruine grond en een donkere vignetrand). Het label MAART 2020 blijft staan.
9. s08: onder de staven staat nu de bronregel 'BRONNEN: BIGGERSTAFF E.A. 2014 · CHOWELL E.A. 2008 (GRIEP) · LIU E.A. 2020, RIVM 2020 (CORONA) · LCI/RIVM (MAZELEN)' (B6, B11, B1, B5/B7, B12 uit getallen.md). De labels liggen 12–16 px hoger.
10. s11: het RIVM-kaartje is verplaatst naar x 300, y 250, vrij van de astitel.
11. s15: de R-meter toont geen getal meer. De tekst is achtereenvolgens 'begin: ± 2 à 3' → 'rond de 1' (op 'één') → 'daarna onder de 1' (op 'eronder'), met bron 'SCHATTING RIVM, 2020'. 'NA DE MAATREGELEN VAN HALF MAART' staat binnen het kader (MAG 12 meegenomen). De naald zakt zonder cijfer.
12. s19: '= 1 − 1/3' komt op het tweede 'min' (16,6 s), '= 2/3 ≈ 67 %' op het tweede 'twee' (17,8 s).
13. s19: het meta 'VUISTREGEL …' staat nu linksboven onder de antwoordregel, niet meer over 'DREMPEL'.
14. s22: er staat nu een witte lijn 'tegelijk ziek · MODEL' (I uit dezelfde SIR-run) naast de staven 'nieuwe zieken per dag'. De gouden lijn staat op de piek van I (die valt op de drempel 2/3) en heet 'VANAF HIER MINDER MENSEN TEGELIJK ZIEK'. De stem ('Voorbij de gouden lijn komen er elke dag minder zieken bij') klopt in het model voor beide lijnen, want ook de nieuwe zieken dalen dan al.
15. s27: de knip is weg. De oude curve vloeit over naar een stippelomtrek en de nieuwe (R = 1,8) faded over de hele as in.
16. q21: de uitleg is ingekort tot één zin ('R zakt vanzelf onder de één, maar wie nog ziek is steekt anderen aan: in het model raakt ruim 9 op de 10 besmet, niet iedereen.').
17. Eindkaart: drie kernzinnen in plaats van zes (aangepast in `segments.json`, s31; de eindkaart wordt niet ingesproken). Haak ongewijzigd.

MAG overgenomen: 1 (koppen op t = 0), 2 (Farid wijst niet meer in het niets in s09/s16; in s03 linksonder), 3 (contacten teal, groep en label op het woord), 5 ('1,25' op 'komma'), 7 (labels hoger), 10 (lijn 'zorg' korter, ic-kaart van de astitel af), 11 (curve 'met maatregelen' start op 'tekent'), 12, 16 ('niet immuun' op 'niet'), 19 (label 'dossier' naar links), 21 (knop op 'helft'), 24 (model en dossier vanaf t = 0), 25 (recapkaartjes op het begin van hun zin), 26 deels (ondertitel H1 → 'R, R₀ en waar het van afhangt').
MAG niet overgenomen: 4 (ouders in de herinnering: geen goedgekeurde ouders van Yasmin in het castboek), 6, 8, 9, 13–15, 17, 18, 20, 22, 23, 26 (seriemeta: het meta rechtsboven komt uit de speler/engine en die mag ik niet wijzigen). De rest is niet gedaan omdat de tijd beter op de MOET-punten ging; het zijn kleine timingverbeteringen.

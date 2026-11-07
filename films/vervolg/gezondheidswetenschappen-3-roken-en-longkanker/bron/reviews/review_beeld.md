# Beeldreview: Roken en longkanker (Gezondheidswetenschappen 3)

Reviewer: Claude, frisse beeldreviewer (C10). Ik heb het maken niet gezien. Datum: 31 okt 2026.
Bekeken: `film/standalone.html` (gelijk aan de filmpagina op de sitebalk na). Contactstills op 10/30/50/70/93 % van elke alinea (118 stills, `stills.py contact` met FIVE=1), 54 losse stills op twijfelmomenten (begin van een scène, het genoemde woord, elke vraag, alle zes onthullingen, titel, eindkaart), en Vragen uit: 52 stills van 5 s vóór tot 5 s na elke weggevallen vraag.
Naast elkaar gelegd met `script_v2.md` (storyboard), `words/<sid>.json`, `getallen.md`, `BEELDAFSPRAKEN.md`, Part C van `PROMPT_v13.md`, `REEKS-gezondheid.md` en de keuring van Kamiel (Farid zonder GGD-badge of afdeling; telpoppetjes in rasters, geen longen of patiënten in bed).
Stills en contactbladen: `/tmp/claude-0/-home-claude/82589197-25db-5d40-878f-b7f845ac6e11/scratchpad/rv_gz3/` (`contact/`, `los/`, `los2/`, `uit/`, `sheet_*.png`). Tijden zijn lokale tijden binnen de alinea (zoals `__still(id, t)`); pixelmaten gelden voor het canvas van 1920×1080.

**Samenvatting: 13 MOET, 17 KAN.**

Goed: de keuring is gevolgd. Farid draagt geen badge en geen afdeling, alleen het label 'Epidemioloog Farid'; Yasmin heeft 'STAGIAIR'. Er staan nergens longen, ziekenhuisbedden of patiënten in beeld: alle tellingen zijn rasters van telpoppetjes (oker = rookt, teal = nooit gerookt, koraal = longkanker, groen = gestopt), ook de 649 patiënten. De toon is zakelijk. Het decor (GGD-kantoor) staat alleen onder cold open, begin H1 en recap, de grafieken op navy. De tijdlijn bovenin springt zoals het storyboard zegt (2026 → 1951 → 1950 → 2001 → 2026). Tijdens alle zes vragen staat er geen antwoord in beeld vóór 'Antwoord x' (wel '?', 'wie koos?', 'IS DAT VEEL?', lege tegels). De rekensom 250 : 17 ≈ 15 staat op het woord. Het raster '± 16 van de 100' telt echt 16 koraal poppetjes, '± 2' bij gestopt rond 30 telt 2. Spelling in beeld: geen fouten gevonden.

---

## MOET (fout, tegen een afspraak, onleesbaar of overlap)

1. **Vragen uit, s07 / s13 / s17 / s20 / s23 / s26 vanaf t = 0** (`uit/uit_s07_000.00_post.png`, `uit_s13_…`, `uit_s17_…`, `uit_s20_…`, `uit_s23_…`, `uit_s26_…`): de groene regel bovenin blijft staan mét letter: 'antwoord b: de artsen zelf; het werd alleen gevraagd', 'antwoord c: …', 'antwoord a: …'. In de html staat geen ANTWOORDTEKST-markering, dus `scripts/antwoordtekst.py` is niet gedraaid (zelfde fout als bij film 1). → `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` en `spelerfix.py` draaien (met `--check`) en opnieuw nakijken; bij Vragen uit alleen de inhoud ('de artsen zelf; het werd alleen gevraagd') of de regel weg.

2. **Vragen uit, s11 2,0–3,5 s** (`uit/uit_s11_002.00_pre_s13.png`, `uit_s11_003.10_pre_s13.png`): de vraagzin is geknipt, maar het vraagkaartje '% VAN DE ROKERS DIE LONGKANKER KRIJGT? ?' schuift toch in beeld tussen de twee groepen. Dat is een rest van de vraag (prompt v8: bij Vragen uit niets van de vraag in beeld). → Het kaartje laten starten op 'Kan' (3,7 s), dan valt het bij Vragen uit vanzelf weg; of verbergen als `state.vragen === 'uit'`.

3. **Kleine tekst, de hele film**: veel Meta-tekst ligt ruim onder de 28 px van Part C. Gemeten op het canvas: de jaartallen op de tijdlijn (1950 … 2010) ± 18 px; de bronregels onder de grafieken ('BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005' in s08/s14, 'VK, CIJFERS 1990 · PATIËNT-CONTROLE … PETO E.A. 2000 / ALS ZE NIET EERDER …' in s17, 'GEZONDHEIDSENQUÊTE CBS/RIVM' in s03, 'IKNL, 2024 · TNO/KWF 2014' in s28, '± 130 → 234 → 415 PER 100.000 PER JAAR' in s26) ± 15–18 px; de ondertitel van de recaptegels ('1950 · patiënt-controle: terugkijken') ± 17 px; 'LOTING / MOET ROKEN / ROOKT NIET' in de experimentkaart (s04) ± 18 px; de as-getallen in s08/s14 ± 16 px. Juist de bron-en-jaarregels moeten leesbaar zijn. → Alle Meta minimaal 28 px; de lange bronregel in s17 op twee regels of korter ('PETO E.A. 2000 · VK, CIJFERS 1990').

4. **s04 0–6,5 s, experimentkaart** (`los/s04_002.20.png`, `crop_exp.png`): het rode stempel 'MAG NIET' ligt dwars over het label 'ROOKT NIET' en over de poppetjes (tekst over tekst; 'ROOKT' is half weg). → Stempel lager (over de poppetjes, onder de labels) of de labels boven het kader van het kruis houden; het kruis mag de poppetjes raken, niet de woorden.

5. **s01 15,5–17,1 s** (`los2/s01_015.90.png`): Farid staat vóór Yasmin; van Yasmin steekt alleen een witte mouw achter zijn rug uit. Dat leest als een tekenfout (twee figuren door elkaar). → Farid naast Yasmin laten staan (of Yasmin opzij laten stappen) als hij naar de puzzelkaart wijst.

6. **s07 10–21 s, tellers 'rokers: 16 · nooit gerookt: 2'** (`los/s07_019.90.png`): de tellers ogen als echte uitkomsten van het cohort, maar het zijn poppetjes zonder 'SCHEMATISCH'. Ze kloppen ook niet met de boodschap: van de ± 110 oker poppetjes worden er 16 koraal (± 15 %), van de ± 50 teal 2 (± 4 %), dus ± 4× zo groot, terwijl H3 '± 15×' uit dit cohort haalt. Bovendien botst '16' met '± 16 van de 100' van Farids scherm. → Meta 'SCHEMATISCH' bij het raster (zoals in s23) en de verhouding laten passen bij ± 15× (bijv. 1 koraal bij teal tegen ± 30 bij oker), of de tellers weglaten en alleen het raster laten kleuren.

7. **s13 16,9–24 s** (`los/s13_019.90.png`): 'Bijna alle patiënten rookten, en ze rookten meer.' Het tweede blok 'rookten 25 of meer per dag 26 % / 13,5 %' blijft gedimd tot ± 24 s, terwijl de stem 'ze rookten meer' al op 19,2 s zegt (BEELDAFSPRAKEN: wat de stem noemt is nooit gedimd). → Het tweede blok volle sterkte op 'meer' (19,7 s).

8. **s20 14,5–18,5 s** (`los/s20_017.80.png`): 'hoeveel keer, en hoeveel van de honderd'. In het kaartje 'NOEM ALLEBEI' blijft de tweede regel 'hoeveel van de 10.000: 1 → 2' gedimd tot na het einde van de zin. → Regel 1 op 'keer' (15,9 s), regel 2 op 'honderd' (17,2 s), allebei vol. (Zie ook KAN 12 over '10.000' tegen 'honderd'.)

9. **s21 0–9 s** (`los/s21_004.50.png`, `los/s21_007.80.png`): het kaartje 'COHORT VS · GUERTIN E.A. 2016' staat 5 s leeg. '≥ 6 koppen koffie per dag' verschijnt pas rond 6,5 s (stem: 'zes koppen' op 3,8 s), 'bijna 5× zo vaak longkanker' rond 8,5 s (stem: 'vijf keer' op 6,8 s), en het blok 'longkanker' is op 7,8 s nog bijna onzichtbaar terwijl het woord valt (7,7 s). BEELDAFSPRAKEN: een getal verschijnt op het moment dat het genoemd wordt. → '≥ 6 koppen' op 'zes' (3,8 s), '5×' op 'vijf' (6,8 s), 'longkanker'-blok op 7,7 s.

10. **s23 17–21,3 s** (`los/s23_020.60.png`): 'Een groot verband bij veel mensen is op zichzelf dus nog geen bewijs voor een oorzaak.' Het kaartje 'groot verband ≠ bewijs' staat de hele zin gedimd (grijs op grijs). → Volle sterkte op 'verband' (17,5 s).

11. **s26 vanaf 7,5 s, tegel 'Hoe meer, hoe erger'** (`los/s26_015.80.png`): '130 / 234 / 415' en '± 130 → 234 → 415 PER 100.000 PER JAAR' zijn echte getallen uit het artsencohort, maar zonder bron en jaar (reeksbrief: echte data krijgen bron en jaar). → Onder de tegelrij 'BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005' (28 px), en 'per 1–14 / 15–24 / ≥ 25 sigaretten per dag' bij de staafjes, anders weet de kijker niet wat de drie staven zijn.

12. **Vraagkaarten q12, q16, q19, q25, onthullen** (`los/q16_007.00_reveal.png`, `crop_q16.png`, `sheet_q.png`): de uitleg heeft drie regels; de derde regel loopt onder de onderrand van het groene kader door (bij q16 'zo'n 16 op de 100 vóór hun 75e aan longkanker.' staat half buiten het kader, tegen de onderkant van het beeld). q06 en q22 (twee regels) passen wel. → Kader laten meegroeien en het blok ± 60 px hoger, of de uitleg in `film.json` tot twee regels inkorten.

13. **Eindkaart** (`los/s29_008.90.png`): zes kernzinnen in plaats van drie (Part C: 'End card: three key sentences with an annotatiehaak'), een muur van tekst; dezelfde opmerking als MOET 17 bij film 1. → Drie zinnen, bijvoorbeeld: (1) cohort volgt vooruit, patiënt-controle kijkt terug; (2) noem hoeveel keer én hoeveel van de honderd; (3) zoek de derde factor; een oorzaak wordt overtuigend als de aanwijzingen dezelfde kant op wijzen. De zes begrippen staan al in de begrippenlijst.

---

## KAN (beter)

1. **s01 8,5–13 s**: de tekstballon 'Hoe weten ze dat?' boven Yasmin is op 8,6 s nog een lege, vage vorm (stem: 'vraagt' op 8,6 s) en staat er nog bij 'Je mag mensen toch niet laten roken voor een proef?' (10,5–12,9 s). → Ballon vol op 'hoe' (9,2 s); op 'Je mag' een tweede ballon 'Mag je mensen laten roken?' of de ballon weg.
2. **s03 1–8 s**: Farid wijst naar een scherm met alleen een klein vragenlijsticoon; de stapel 'Gezondheidsmonitor' verschijnt pas na het inzoomen. Rustig maar leeg. → Op 'gezondheidsmonitor' (1,0 s) direct de stapel groot op het scherm.
3. **s04 17–21 s** (`uit/uit_s04_017.00_x.png`): op het briefje in de envelop valt de tweede regel 'Hoeveel per dag?' achter de envelop weg, terwijl de stem 'en hoeveel?' zegt. → Briefje 20 px hoger.
4. **s04 20–21 s** (`los/s04_020.80.png`): het pilletje 'daarna 50 jaar gevolgd' raakt de metaregel '± 34.000 MANNEN · 1 POPPETJE ≈ 200 ARTSEN'. → 16 px hoger.
5. **s09 0–8 s**: zes seconden alleen een kaartje 'PUBLICATIE 1950 · DOLL & HILL' met een documenticoon; de terugspoelknop komt pas na 'spoelden terug' (8,4 s; bij 8,3 s nog niet in beeld). → Terugspoelknop op 'spoelden' (8,1 s); eventueel de 649 koraal poppetjes al op 'ziekte' (7,5 s).
6. **s10 15–19 s** (`los/s10_019.00.png`): de 27 omcirkelde teal poppetjes in de controlegroep staan als twee rijen gouden ringen die elkaar overlappen en onder het raster uitsteken. → Ringen kleiner of alleen de teal kleur laten oplichten (zonder ring), het getal '27' draagt het.
7. **s13 0–10 s**: 'ZELF GEKOZEN: HELFT : HELFT' (Meta, klein) verschijnt pas rond 3 s en staat los tussen de groepen. Storyboard noemt een schuif 'HOEVEEL PATIËNTEN NEEM JE MEE?'; die is er niet, de linkergroep groeit zonder zichtbare bediening. → Een eenvoudige schuif of '+'-knop bij de patiëntengroep, zodat te zien is dat de onderzoeker het aantal kiest.
8. **s13 24–29 s**: het blok 'rookten 25 of meer per dag 26 % / 13,5 %' leest als 'van alle patiënten'; volgens `getallen.md` (rij 13) is het 26 % van de rókende patiënten. → 'van de rokers: 25+ per dag'.
9. **s14 0–14 s, s23 14–21 s**: Farids wijsarm is erg lang (± 1,3× de normale armlengte) en de hand valt in s14 op de y-as bij '100'. → Kortere arm, hand naast de as, of arm omlaag.
10. **s17 16–33 s** (`los/s17_031.30.png`): vier betekeniskleuren tegelijk (oker, teal, koraal, groen) plus goud; Part C staat er drie toe. → Eén raster tegelijk laten oplichten en de andere op 35 %; of 'gestopt rond 30' pas op 'stopte' en dan 'bleven roken' dimmen.
11. **s17 12–16 s**: 'FARIDS SCHERM' is een postzegel van ± 190 px met onleesbare inhoud. → Groter, of alleen '± 16 van de 100' als tekst in het kaartje.
12. **s20 4–18 s**: het rekenvoorbeeld gebruikt '1 op de 10.000', het kaartje zegt 'hoeveel van de 10.000', de stem 'hoeveel van de honderd'. Klopt, maar wisselt van noemer. → In het kaartje 'hoeveel van de 100 (hier: van de 10.000)', of de stem laten volgen.
13. **s20 0–4 s** (`contact/s20_001.85.png`): de twee rasters van 10.000 stipjes zijn bijna onzichtbaar (donkerblauw op navy) en de enkele koraal stip is een pixel. → Lichtere rastertint (teal 35 %), en de koraal stip als poppetje van ± 12 px met de ring eromheen (de ring staat er al).
14. **s23 6,9–11 s**: het label 'verstorende factor · OOK: VERSTORENDE VARIABELE' komt ± 2 s na het woord (8,4 s) en raakt de bovenrand van het blok 'roken'. → Op 'verstorende' en 12 px hoger.
15. **s26 0–7,5 s** (`contact/s26_002.26.png`): vier lege grijze tegels terwijl de stem 'Eén aanwijzing is niet genoeg, maar hier wijzen ze allemaal dezelfde kant op' zegt. → Op 'dezelfde kant op' (5,6 s) een gouden pijl onder de tegels; de tegels zelf blijven op hun woorden.
16. **s26 17–22,6 s**: 'een getal dat je nu op het scherm ziet': het getal van Farids scherm (± 16 van de 100) komt niet in beeld. → Op 'scherm' (21,7 s) het kaartje '± 16 van de 100' uit de cold open terug laten schuiven; dat sluit de vertelvorm.
17. **s28 7,5–8,1 s** (`los2/s28_007.80.png`): bij de overgang verschijnt de kop 'Waar leer je dit?' over het nog zichtbare kaartje 'ruim 14.000 mensen per jaar' (tekst over tekst, ± 0,5 s). BEELDAFSPRAKEN: één tekstbalk tegelijk, eerst de oude weg. → Eerst het kaartje weg, dan de kop.

---

## Niet gevonden / buiten deze review
- Geen fouten in castregels: Farid zonder badge of afdeling, Yasmin met STAGIAIR, geen longen, bedden of patiënten.
- Geen antwoord in beeld vóór 'Antwoord x' bij Vragen aan.
- Geen tekst onder y ≈ 880 behalve de ondertitels en de onthullingskaders van punt MOET 12.
- Geluid bij Vragen uit niet beluisterd (alleen beeld en ondertitels nagekeken); de ondertitels zijn schoon (geen vraagzin, geen 'Antwoord x').

---

## Verwerkt (31 okt 2026, maker)

Opnieuw gebouwd op de echte woordtijden; stills van de gewijzigde momenten bekeken (`sheet_gz3_rv.png`, `sheet_gz3_rv2.png` in de scratchpad). Niet opnieuw ingesproken.

**MOET**
1. Niet aangepakt (hoeft niet). De hoofdsessie draait `scripts/antwoordtekst.py` in de repo. De antwoordregels staan nog steeds via `regel()` (helper `antwoord()`) in de vorm 'antwoord x: <inhoud>', dus het script kan ze vinden.
2. s11: het vraagkaartje '% VAN DE ROKERS …' verschijnt pas op 'Kan' (3,7 s), dus niet meer bij Vragen uit.
3. Alle Meta-tekst staat nu op minimaal 28 px: jaartallen en huidig jaar op de tijdlijn (balk iets hoger), bronregels (s03 'CBS/RIVM', s08/s14 'BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005', s17 in twee regels 'PETO E.A. 2000 · VK, CIJFERS 1990' / 'ALS ZE NIET EERDER …', s26, s28), as-getallen en as-titels van de staven, de experimentkaart, de kaartkoppen en bronnen (`echtKaart`), mediaknoppen, krant, recaptegels (meta) en opleidingsrijen. Lange labels zijn ingekort of over twee regels gezet. Het kleine label 'FILM' in het filmkaartje is weg.
4. s04: het kruis en stempel 'MAG NIET' zijn kleiner en staan lager, over de poppetjes, onder de labels 'MOET ROKEN / ROOKT NIET'.
5. s01 slot: Yasmin stapt opzij (x 1600 → 1780) en Farid staat links van haar (x 1500). Ze overlappen niet meer.
6. s07: de tellers 'rokers: 16 · nooit gerookt: 2' zijn weg. Het kaartje toont nu 'longkanker · TELLEN PER GROEP · SCHEMATISCH'. In het raster kleurt nu ± 26 % van de rokers (31 van 118) en ± 2 % van de nooit-rokers (1 van 42) koraal, dus ± 15×.
7. s13: het blok '25 of meer per dag' staat op volle sterkte op 'meer' (19,7 s).
8. s20: in het kaartje 'NOEM ALLEBEI' staat regel 1 op 'keer' en regel 2 op 'honderd', allebei vol (fade 0,3 s).
9. s21: '≥ 6 koppen' verschijnt op 'zes', 'bijna 5×' op 'vijf', en de blokken koffie/longkanker op hun woord (fade 0,3 s).
10. s23: het kaartje 'groot verband ≠ bewijs' staat op volle sterkte op 'verband' (17,5 s).
11. s26: onder de tegels staan nu 'STERFTE PER 100.000 PER JAAR BIJ 1–14 · 15–24 · ≥ 25 SIGARETTEN PER DAG' en 'BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005' (bronnen.md, bewering 23; getallen.md, rij 6).
12. Vraagkaarten: alle zes uitlegteksten in `film.json` zijn ingekort tot twee regels en passen binnen het kader (q12 en q16 nagekeken).
13. Eindkaart: drie kernzinnen (cohort vooruit / patiënt-controle terug; hoeveel keer én hoeveel van de honderd; zoek de derde factor, een oorzaak wordt overtuigend als alle aanwijzingen dezelfde kant op wijzen), in `segments.json` en `script_opname.md`.

**KAN** (snel en veilig gedaan)
- K1 s01: de ballon staat vol op 'hoe' en gaat weg op 'Je mag'.
- K3 s04: het briefje in de envelop staat 20 px hoger, 'Hoeveel per dag?' is leesbaar.
- K4 s04: het pilletje 'daarna 50 jaar gevolgd' staat hoger; de metaregel is ingekort.
- K5 s09: de terugspoelknop verschijnt op 'spoelden'.
- K6 s10: in de controlegroep geen ringen meer (de 27 teal poppetjes en het getal dragen het); bij de patiënten een kleinere ring.
- K8 s13: het label luidt nu 'van de rokers: 25 of meer per dag'.
- K9 s14/s23: Farid wijst niet meer (pose staan), dus geen lange arm over de as.
- K11 s17: in plaats van de postzegel van het scherm nu een kaart 'FARIDS SCHERM · ± 16 van de 100 · PATIËNT-CONTROLE + CIJFERS VAN HET HELE LAND'. Die verdwijnt vóór 'gestopt rond 30'.
- K12 s20: 'hoeveel van de 100' met 'HIER: 1 → 2 VAN DE 10.000'.
- K13 s20: lichtere rastertint, en het geval is nu een koraal poppetje met ring.
- K14 s23: 'verstorende factor' staat op het woord en 18 px hoger.
- K15 s26: op 'dezelfde kant op' een gouden pijl onder de tegels, met 'ALLEMAAL DEZELFDE KANT OP'.
- K16 s26: op 'scherm' het kaartje '± 16 van de 100'.
- K17 s28: het kaartje '14.000' gaat eerst weg, daarna komt de kop 'Waar leer je dit?'.

**Niet gedaan:** K2 (s03, inhoud van het scherm vóór het inzoomen), K7 (zichtbare schuif/knop in s13), K10 (minder kleuren tegelijk in s17). Reden: K2 en K7 vragen een herontwerp van de scène; bij K10 dimmen de rasters al deels doordat ze na elkaar oplichten.

# Frisse beeldreview: Chromosomen en de taal van erfelijkheid (Erfelijkheid 1), 25 okt 2026

Reviewer: frisse helper (heeft de film niet gemaakt; geen bouwnotities of keuringsverslagen gelezen). Getoetst aan prompt v10 C10.7, `films/BEELDAFSPRAKEN.md` en `bron/script_v2.md`.

Werkwijze: film lokaal geserveerd, met Playwright per alinea drie stills genomen via `window.__still(id, t)` (t = 0,1 s, het midden en het eind, 960×540), bij elke still de zin die dan klinkt (uit de woordtijden in FILMDATA). Waar nodig extra tussentijden en uitsneden. Vragen uit: met `?vragen=uit` vanaf 6 s vóór tot ±6 s na elke vraagplek echt afgespeeld (q14, q28, q37), elke 0,2 s het audiofragment, de afspeeltijd, het volume en het woord dat dan klinkt gelogd, plus elke seconde een still.

Tijden: alinea-id + lokale tijd in die alinea (s), zoals in FILMDATA. Stills van de MOET-punten staan in `bron/review_fris/`.

**Totaal: 9 MOET, 16 KAN.**

## Wat goed is (biologie)

- 46 chromosomen worden echt geteld (s09: teller 1→46 met gouden stip per chromosoom). 92 chromatiden klopt (s10).
- Karyogram: 22 paren autosomen + XX, 'karyogram van een vrouw', paren gesorteerd op lengte (s11). Homologen blauw (vader) / goud (moeder) (s12).
- Eicel: 23 losse chromatiden in de kern (in de code geteld: 23). Haploïd n = 23, diploïd 2n = 46 (s16).
- XY: Y duidelijk kleiner dan X (s17).
- Albinisme: het kind heeft een heel lichte huid en wit-blond haar, ouders en opa's/oma's hebben pigment (grijs haar van ouderdom leest niet als albinisme). Ouders Aa; broer en zus AA en Aa, het kind aa (s40): klopt.
- AA en Aa geven evenveel pigment, aa niets; in de aa-zoom geen melaninekorrels (s30, s34). Melaninekapjes boven de kernen van de keratinocyten: mooi en juist (s23).

## Vragen uit (B9/B11)

- Geluid: schoon. q14: s13 eindigt bij 'chromosomen.' (5,2 s); 'Wat denk je? Hoeveel …' klinkt niet, s15 begint met 'Een eicel heeft drieëntwintig …'. q28: s27 valt helemaal weg, s26 → s29. q37: s36 valt weg, s35 → s38. De zinnen na de vraag staan op zichzelf.
- Ondertitels: geen vraagzin, geen antwoordletter.
- Beeld: één restje, zie MOET 9.

## MOET

### MOET 1 · s06 (6,5–15,8 s) · label 'celkern vergroot' onleesbaar
- Zag: onder de grote kerninzet staat 'CELKERN · VERGROOT', maar de huidcellen zijn eroverheen getekend; je leest 'C…ERN …VERG…T'.
- Moet: label boven de cellaag tekenen (of boven de inzet zetten), helemaal leesbaar.
- Still: `review_fris/m1-m2_s06_c.webp`

### MOET 2 · s06 (±12–15,8 s) · label 'Mieke · 1,67 meter' loopt buiten zijn kader
- Zag: in het kader 'DNA uit één cel, uitgerekt' begint de onderschrift links buiten het kader ('…IEKE · 1,67 METER'); de eerste letters staan over de huidcellen.
- Moet: tekst binnen het kader, gecentreerd onder Mieke.
- Still: `review_fris/m1-m2_s06_c.webp`

### MOET 3 · s06 (±7–9 s, 'In het midden van de cel: de celkern') · label 'celkern' bij de verkeerde cel
- Zag: 'celkern · ongeveer 6 micrometer' staat onder de kern van de pigmentcel (de cel met de bruine uitlopers), op de rand van de papil; de dunne gouden ring die de bedoelde kern markeert, zit om een keratinocytkern ernaast. De kijker koppelt het label aan de pigmentcel.
- Moet: label direct naast de gemarkeerde kern (een gewone huidcel, niet de melanocyt), ring duidelijker, en de kerninzet rechts (DNA) zichtbaar uit díe kern laten komen.
- Still: `review_fris/m3_s06_b.webp`

### MOET 4 · s08 (0–8 s) · 'één DNA-molecuul' bij een X-chromosoom; het kopiëren is niet te zien
- Zag: vanaf t = 0 staat er een X (twee zusterchromatiden) met het label 'één chromosoom · één lang DNA-molecuul', terwijl de stem zegt 'Elk chromosoom is één heel lang DNA-molecuul'. Bij 'Voor de deling is het al gekopieerd' verandert er niets: het was al een X. Een X bestaat uit twee DNA-moleculen; dit beeld bevestigt precies de misvatting die later (s15: 'huidcel 2 chromatiden / eicel 1 chromatide') moet worden rechtgezet.
- Moet: eerst één chromatide (één staafje = één DNA-molecuul, met de histoneninzet), dan bij 'al gekopieerd' het staafje zichtbaar verdubbelen tot de X, en pas dan 'zusterchromatiden' en 'centromeer'.
- Still: `review_fris/m4_s08_b.webp`

### MOET 5 · s15 (5–11,6 s) en uitleg bij q14 · eicel heeft bij de eisprong nog gekopieerde chromosomen (inhoud, voorstel aan Kamiel)
- Zag/hoorde: 'En in een eicel of zaadcel is een chromosoom niet gekopieerd: het bestaat uit maar één chromatide', met de inzet 'eicel · 1 chromatide' naast 'huidcel · 2 chromatiden'; de uitleg bij q14 zegt hetzelfde.
- Biologie: een zaadcel heeft 23 chromosomen van één chromatide. Een menselijke eicel komt bij de eisprong echter vrij als secundaire oöcyt die stilstaat in metafase II: 23 chromosomen met elk twee chromatiden; meiose II wordt pas afgemaakt nadat de zaadcel binnendringt. De bewering klopt dus voor de zaadcel, niet voor de eicel bij de eisprong.
- Voorstel (volgens `films/BRONNEN.md`: een '!' gaat als voorstel naar Kamiel, niet stil aanpassen): zin en inzet over de **zaadcel** laten gaan ('In een zaadcel is een chromosoom niet gekopieerd …'), of 'na de bevruchting, in de kern van de eicel' toevoegen; de uitleg bij q14 gelijk trekken. Ook nalopen in `bron/bronnen.md` met een niveau-A-bron.
- Still: `review_fris/m5_s15_c.webp`

### MOET 6 · s21 (0–1,1 s) en s41 (0–0,6 s) · leeg beeld bij het begin van de alinea
- Zag: s21 'Dus: het gen is het onderwerp' begint met een volledig leeg navy beeld (alleen de kopregel); het kader 'gen' faded pas na ±1 s in. De hele alinea bestaat daarna uit twee tekstkaders en een misvattingenkader op een verder leeg beeld. s41 ('Hoe groot de kans op aa is …') is de eerste ±0,6 s ook leeg.
- Moet: op t = 0 al gevuld (C10.7). Bij s21 het chromosoompaar 11 met de genband van s20/s22 laten staan en de kaders 'gen = onderwerp' en 'allel = versie' bíj de band en bij de twee varianten zetten; bij s41 het kruisingsschema al op t = 0 tonen.
- Still: `review_fris/m6_s21_t0.7.webp`

### MOET 7 · s33 (12–14,5 s) · 'meer melanine' is niet te zien
- Zag: twee zoomcirkels (schaduw-arm en zon-arm) met het label 'meer melanine' bij de onderste; op 960 px is het verschil in melaninekorrels nauwelijks te zien (een paar stipjes meer). De arm zelf is wel iets bruiner.
- Moet: in de zon-cirkel duidelijk meer en grotere melaninekapjes (bv. twee keer zoveel korrels, donkerder), en de melanocyt met meer korrels in de uitlopers, zodat het verschil in één oogopslag zichtbaar is.
- Still: `review_fris/m7_s33_c.webp`

### MOET 8 · s38 (5,4–14 s) · 'één chromosoom van de vader en één van de moeder' niet in beeld
- Zag: bij 'Elk kind krijgt van elk chromosoompaar één chromosoom van de vader en één van de moeder' staat alleen de familiescène stil. Bij 'Krijgt het van allebei het allel a' vliegt er een kleine 'a' (±10 px hoog op 960 px) van de badge van elke ouder naar het kind. Dit is het kernmoment van puzzel 2 en het is bijna onzichtbaar.
- Moet: het doorgeven zichtbaar maken: per ouder het paar chromosomen 11 (A en a) bij de ouder, één ervan (met a) gaat zichtbaar naar het kind, waar het paar aa ontstaat; minstens de letters groot en goed zichtbaar laten reizen.
- Stills: `review_fris/m8_s38_b.webp`, `review_fris/m8_s38_t12.webp`

### MOET 9 · Vragen uit · s26 (±8–16,9 s) · gouden '?' blijft staan zonder vraag
- Zag: met `?vragen=uit` staat het Aa-vak de hele tweede helft van s26 als donker vak met een groot gouden vraagteken (de opmaat naar q28). Daarna komt geen vraag: s29 begint en het '?' is weg. Het '?' is een overblijfsel van de vraag in beeld (B9/B11).
- Moet: bij Vragen uit het Aa-vak gewoon laten zien (halve hoeveelheid werkend enzym), zonder '?' en zonder gouden rand; met Vragen aan mag het blijven.
- Still: `review_fris/m9_vragenuit_s26.webp`

## KAN

1. **s01 (±7–8,4 s)** 'Maar geen van hen is precies het midden': de ring staat onder twee van de drie kinderen (paars en geel). Onder alle drie, of geen ring.
2. **s05–s06, s23** De ingezoomde huid loopt over de kopregel 'HAVO · VWO · ERFELIJKHEID 1/6' heen (tekst door de cellen). Kopregel boven de inhoud tekenen of de huid lager laten beginnen.
3. **s06** Het label 'DNA' boven de kerninzet staat ±50 px van de bovenrand (C10.7: ≥ 60 px).
4. **s06** Mieke (1,67 m) is ten opzichte van de 2-m-lat getekend als ±1,57 m. Klein, maar het is een maatvergelijking.
5. **s11 (eind) / s12 (eind)** 'karyogram · gesorteerd op lengte' en het kader 'homologe chromosomen' staan ±40–45 px van de rechterrand.
6. **s12 (12–16,5 s)** 'Even lang, dezelfde bouw en op dezelfde plekken dezelfde soort informatie': in het homologenkader geen bandenpatroon of locus om 'dezelfde plekken' te laten zien. Eén of twee gelijke banden op beide homologen helpen.
7. **s13** De zaadcel (kop + staart) is bijna even lang als de diameter van de eicel; echt is hij ±60 µm tegen ±120 µm voor de eicel, plus de corona radiata. In s15–s16 is de corona radiata weg (zelfde eicel?).
8. **s15 (0–1,5 s)** 'Een eicel heeft drieëntwintig chromosomen': de kern is op t = 0 leeg en vult in ±1,5 s. Al gevuld beginnen.
9. **s17 (±5 s)** Het kader 'vrouw · XX' verschijnt al bij 'mannen en vrouwen' (het woord 'vrouwen' triggert `q.on('vrouw')`), ±5 s vóór 'Een vrouw heeft twee X-chromosomen'.
10. **s18, s20, s24–s26** Eiwit/enzym is een grijze blob met een krul; BEELDAFSPRAKEN vraagt een gevouwen keten (kralenketting tot kluwen). Kan uit `bibliotheek/lib_bio.js` (eiwit dat vouwt / enzym).
11. **s18–s22** De gouden genband op het gouden (moeder)chromosoom heeft weinig contrast.
12. **s20** Het blauwe en gouden chromosoom schuiven half over elkaar heen; tussenruimte houden.
13. **s22** 'Precies twee allelen' terwijl je op de twee X'en vier genbandjes ziet (één per chromatide). Een leerling telt vier. Korte toevoeging in beeld: 'zusterchromatiden: zelfde allel (kopie)', of hier één chromatide per chromosoom tekenen.
14. **s33 (±5–8 s)** 'Deze arm is in de zon geweest': zon en kleurverschil verschijnen pas bij 'bruiner'. Zon al bij 'zon' laten verschijnen.
15. **s34 (eind)** In de aa-zoom hebben de huidcellen dezelfde getinte vulling als de gepigmenteerde huid; iets lichter/rozer maakt 'geen pigment' sterker.
16. **s39 (eind)** 'per paar droeg één van hen a' leest als 'precies één'; 'minstens één van hen droeg a' is juister.

## Nog doen (voor de maker)

- MOET-punten in het foutenlogboek `films/logboek/fouten.jsonl` zetten en daarna `python3 scripts/foutenpatronen.py` draaien (de reviewer heeft niets aan de film of het logboek veranderd).
- MOET 5 eerst aan Kamiel voorleggen (inhoud, stem moet opnieuw).

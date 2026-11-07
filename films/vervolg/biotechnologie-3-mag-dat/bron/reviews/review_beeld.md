# Beeldreview: Mag dat? Regels en ethiek rond ggo's (bt3)

Frisse reviewer, 25 okt 2026. Bron: contactbladen b3a/b3b, losse stills in `qa/` (bekeken: s01_010, s03, s04_024, s05_001, s06_019, s09_014, s10_020, s14_005, s16_017, s18_025, s19_022, s22_017, s26_004, s28_016, s30_017, s31_011, s33, q27), script_v2, BEELDAFSPRAKEN, PROMPT_v10 Part C.
Maten omgerekend van stills op 1166 px naar het podium van 1920×1080 (×1,65).

Algemeen oordeel: het evenwicht in H6 is goed (voor en tegen in dezelfde neutrale kaartjes, balk recht, '?' in het midden), net als de splitsing VS/EU in H4 (beide hetzelfde gouden vergrootglas). De vakinhoud in beeld klopt met het script. De grootste problemen: de recap (s30) zet Europa er scheef en met een waarschuwingskleur in, er lekt een kleurnaam ('GOUD') in beeld, Meta-ondertitels lopen op meerdere plekken buiten hun kaartje, en een paar beelden lopen een zin achter op de stem.

## MOET

1. **s30_011–017 (recap): Europa staat er scheef en met een oordeel in.** Links een volle groene akker 'Verenigde Staten', rechts alleen een tekstkaartje en een kaartje 'Nederland' met een koraal rand (koraal = 'let op'), terwijl de stem zegt "In Europa wordt één ggo-gewas geteeld, vooral in Spanje". Oplossing: zet rechts, zoals het script vraagt, de tweede akker uit de cold open met het label 'Europese Unie', een klein vlak 'Spanje · MON810' en 'Nederland · teelt uitgesloten' met een neutrale rand (#8FA0B5, of goud als focus), even groot als de VS-kant.
2. **s06_019.57: de kleurnaam 'GOUD' staat als Meta-label onder 'willekeurige mutaties'.** Haal dat label weg (het is een kleurparameter die als tekst in beeld lekt) of vervang het door 'WILLEKEURIG OP HET DNA'.
3. **s19_022.57: "In de biologische landbouw mag voorlopig geen van beide"**, maar het groene 'bio'-rondje staat er zonder streep tussen de bakken, dus het lijkt alsof bio juist mag. Oplossing: zet bij deze zin een neutrale schuine streep (#8FA0B5) door het bio-icoon, met twee dunne lijnen naar beide bakken en het label 'niet in bio · voorlopig'. Gebruik geen rood, om geen oordeel te suggereren.
4. **Meta-tekst loopt buiten het kaartje** op s09_009–014 ('VALT ONDER DE GGO-REGELS'), s10_013–020 ('EUROPESE AUTORITEIT'), s16_004–017 ('MON810 · INSECTENRESISTENTE MAÏS'), s30_017 ('TEELT UITGESLOTEN' raakt de rand) en s31_011 ('BEOORDELEN EN ADVISEREN'). Oplossing: maak de kaartbreedte gelijk aan max(titel, Meta-regel) + 2×padding, met een gedeelde helper die de Meta-breedte meet (mono met letterspatiëring).
5. **s04_024.85: het label 'autoclaaf' staat op y≈895**, onder de grens van 880 waar alleen ondertitels mogen. Zet het label boven of links naast de autoclaaf (bijvoorbeeld naast 'afval gedood') of schuif de hele scène 40 px omhoog.
6. **s01_010.79: "ruim negentig procent van de maïs ggo"**, maar in beeld staan alleen twee gelijke akkers met paarse stipjes op de VS-planten, zonder uitleg. Oplossing: zet onder 'Verenigde Staten' de balk uit het script ('ruim 90 % ggo', paars deel op ~92 %) en laat de stipjes weg of geef ze een legenda 'ggo'.
7. **s06_005–012: "Veredelaars bestralen soms zaad"** valt op s06_012.76, maar dan staat alleen nog de wetskaart in beeld; de bestralingskast komt pas bij de volgende zin (s06_019). Oplossing: laat de kast met zaadje en koraal flitsen op deze zin binnenkomen, en het DNA met mutaties op "Dan ontstaan er willekeurige mutaties".
8. **s18_016.73: "Voedsel met ggo krijgt een etiket"**, maar beide pakken zijn dan nog leeg; het ggo-etiket verschijnt pas bij de zin over vlees en melk (s18_025). Oplossing: zet het etiket 'ggo' op het voedselpak bij deze zin en de Meta 'ETIKET, BEHALVE ≤ 0,9 %' alleen onder dat pak.
9. **s18_025.66: "Vlees en melk ... krijgen geen etiket"**, maar er staat geen vlees in beeld, en 'GEEN ETIKET' hangt boven beide pakken, ook boven het voedselpak mét etiket. Oplossing: voeg een vleesbakje met een leeg etiketvak toe naast de melk en zet 'GEEN ETIKET' alleen boven vlees en melk, met een dunne lijn vanaf de koe.
10. **s10_013–020: de maïsplant overlapt de tegels** 'resistentie' en 'voedsel: giftig? allergie?' (bladpunten lopen over de rand). Maak de plant ~15 % kleiner of zet de tegels 40 px verder van de stengel.
11. **s03_002.50 (titel): een maïsblad bedekt het label O₂ van het vat.** Schuif de plant ~40 px naar rechts of laat de sensorlabels op de titelkaart weg.
12. **s24_011.38: "Bij Bt-maïs spuiten boeren minder insecticide"**, maar alleen het kaartje 'opbrengst' staat er; het kaartje 'minder insecticide' komt later. Oplossing: koppel elk voor- en tegenkaartje aan het begin van zijn eigen zin (bij s24_004.74 staat zelfs nog geen enkel kaartje terwijl het 22 %-getal al klinkt).
13. **s10_005.45: "De Europese autoriteit EFSA kijkt onder meer"**, maar in beeld staat alleen het dossier; het kaartje EFSA komt pas later. Laat het EFSA-kaartje op het woord 'EFSA' binnenkomen en het dossier ernaartoe schuiven (zoals het script vraagt).
14. **Meta-grootte: controleer de minimale 28 px.** Meta-ondertitels als 'AFGESLOTEN RUIMTE', 'VOORDAT HET WEGGAAT', 'EUROPESE AUTORITEIT', 'RADBOUD · NIJMEGEN', 'nu: nog ggo' (s22) en de serietag bovenaan meten omgerekend ±22–26 px. Zet de Meta-stijl in de gedeelde helper op ten minste 28 px en herbouw.

## KAN

15. **s14_003–005: Sam wijst met gestrekte arm naar Merel** terwijl hij zegt "Dat Europa het tegenhoudt, is gewoon bang zijn". Dat leest als een verwijt aan haar. Laat Sam, zoals het script vraagt, tegen het vat leunen met de armen omlaag.
16. **s15_005.56: Merel wijst naar Sam** bij "Bang of niet bang, dat kun je niet meten". Het script zegt 'Merel rustig'. Geef haar een open hand of houd haar armen omlaag.
17. **s24–s26: de balans heeft geen schalen.** De kaartjes zweven boven een kale balk. Hang beide kolommen in een schaal (dunne lijnen naar twee gelijke schalen), dan zie je echt 'beide schalen even hoog'.
18. **s15_013–020:** het script vraagt de balk 'VS: maïs en soja ruim 90 % ggo'. Die ontbreekt. Zet hem klein onder de VS-helft, en voor het evenwicht onder de EU-helft de balk 'nog geen 1 %' uit H4.
19. **s16:** het script vraagt een kaart van Europa met Spanje en Nederland. Nu staan er twee losse kaartjes. Een eenvoudige omtrek van Europa met twee vlakjes maakt 'vooral in Spanje' en 'in Nederland niet' ruimtelijk.
20. **s09_003–014: het CRISPR-werktuig is een grijze klodder met een haakje.** Het lijkt eerder een steentje dan een schaartje. Gebruik het schaartje uit het script, of het enzym uit lib_bio met het label 'Cas9 · knipt op één plek'.
21. **s05_001.95: buiten en binnen zien er hetzelfde uit.** De akker staat op dezelfde vloerband als de fabriekshal. Een lichtere lucht met een zon of wolk maakt 'onder open lucht' tegenover 'afgesloten ruimte' meteen zichtbaar.
22. **s30_011: 'kijkt naar het product'** tegenover de gesproken tekst "vooral naar wat een plant kan". Maak het 'kijkt vooral naar het product', net als in H4, zodat de VS niet absoluter wordt neergezet dan de EU.
23. **s33_004.50: de regel 'en wat vind jij belangrijk?' is gedempt groen** (contrast lijkt onder 4,5:1) en staat niet in het script. Groen betekent elders 'antwoord/regel'. Maak hem goud of neutraal #9AA3B2 met voldoende contrast, of laat hem weg.
24. **s28_004.50: één klein kaartje in een leeg beeld** bij "Antwoord a. Of een etiket belangrijker is ...". Laat de kaartjes van de balans zichtbaar staan (gedimd 35 %) en schuif ze daarna in de twee lagen, zoals het script vraagt, zodat de overgang van balans naar feit/waarde te volgen is.
25. **s29 en s23: het vat van Sam ontbreekt** ('Sam kijkt naar zijn vat'). Zet het vat gedimd links, dan sluit de film visueel aan op de cold open en film 1.

## Evenwicht (extra check ggo-oordeel)
- H6 (s24–s28): goed. Gelijke kaartjes, dezelfde kleur, balk recht, beide kanten met een nuance.
- H4 (s15): goed. Hetzelfde goud voor VS en EU.
- H3 (s13): goed. 'Geen extra risico' en 'lange termijn moeilijk te meten' staan naast elkaar in dezelfde stijl.
- Recap (s30): niet in evenwicht, zie MOET 1. Antwoordregels in groen ('antwoord b: Nederland liet de teelt uitsluiten') zijn de vaste antwoordkleur en geen oordeel; dat is prima.

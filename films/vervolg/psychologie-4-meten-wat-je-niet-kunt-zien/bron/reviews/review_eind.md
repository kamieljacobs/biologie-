# Eindreview — Meten wat je niet kunt zien (psychologie 4)

Frisse review op script_v2.md, film.py, sections.html, scenes_me.js en 48 stills (me/qaR). Regelnummers = scenes_me.js.

## MOET

1. **s09: label "echt: 72 kg · steeds +2" komt ~13 s te vroeg.** Trigger `q.on('twee',1)` vuurt op "Daar zijn *twee* woorden voor" (2,2 s), dus het label staat al los in beeld bij de uitleg van betrouwbaar (still s09_005.38), zonder weegschaal. Fix r57: `q.on('kilo',1)` (15,5 s).
2. **s11: ✓ en ✗ staan los naast elkaar zonder naam** (s11_012.34). De kijker ziet niet welk vinkje bij betrouwbaar en welk kruis bij valide hoort. Fix r59: zet "betrouwbaar ✓" en "valide ✗" als twee kleine labels direct bij de tekens, onder elkaar.
3. **s16 eindbord: chip "per persoon wankel" steekt onder de DOEN-kolom uit** (s16_065.49, rand van het kader loopt door de chip). Fix r86: maak het meetbord hoger (vier chips in DOEN) of zet "tijdmeting" en "per persoon wankel" samen in één chip ("tijdmeting · per persoon wankel").
4. **s01: label "ONDERZOEKER" van Dr. Kim loopt tegen of in het HARTSLAG-paneel** (s01_008.61 en s01_013.20: de R valt weg achter de rand). Fix r25: `naamBij` van Kim ±80 px naar links, of het paneel (r27, x=1240) naar 1300.
5. **s17: chip "studie psychologie: methodeleer en testtheorie" verschijnt pas 0,5 s voor het einde van het segment** (trigger 'testtheorie' 28,4 s, segment eindigt 28,9 s; in still s17_027.04 is hij nog weg terwijl het in de ondertitel staat). Fix r92: trigger `'methodeleer'` of `'studie'`.

## KAN

6. **Wetenschap, validiteit (H3, s12):** "Scoort iemand hoog op de angstlijst? Blijft hij dan ook verder van de spin af?" klinkt als een controle bij één persoon. Validiteit is samenhang over een groep. Liever: "Blijven mensen die hoog scoren op de angstlijst ook verder van de spin af?" Dat sluit ook beter aan bij H4 (groep tegenover individu). Het beeld kan dan 5–6 stippen tonen (score tegenover afstand) in plaats van één kaart.
7. **s12: test en hertest zijn niet te onderscheiden.** De teal en oker stippen staan door elkaar, "TEST · TWEE WEKEN LATER" is grijs. Kleur "TEST" teal en "TWEE WEKEN LATER" oker. "hoog op de ene vraag → hoog op de andere" (interne consistentie) staat nu onder dezelfde test-hertest-stippen: geef die een eigen klein beeldje of zet hem apart.
8. **s16 Stroop-rij: "GROEN" staat in koraal (oranjerood).** Een leerling twijfelt tussen "rood" en "oranje", en precies dat moet hij hardop zeggen. Gebruik voor het Stroop-blok een helder rood en een helder blauw in plaats van koraal en teal. De rest klopt met de stem: ROOD in blauw, BLAUW in groen, GEEL in paars.
9. **s16: "Probeer het maar. Lastig, toch?"** De leerling heeft maar ±1 s om het te proberen. Laat de audio na "Probeer het maar." 3–4 s stil (de rij woorden staat dan in beeld).
10. **s16 eindbord: zwakke plekken zien eruit als metingen.** "mooier voordoen", "kost tijd, echte spin", "per persoon wankel" en "reageert op meer" hebben dezelfde chipstijl als de maten zelf. Maak ze koraal, met een "−" ervoor.
11. **s04: de pijlen "zeggen" en "lichaam" verschijnen al bij "operationaliseren" (23,8 s).** Hun trigger is het eerste "zegt"/"lichaam" (6–8 s). "doen" komt pas op 32 s. Fix r34: gebruik voor zeggen en lichaam het tweede voorkomen (`q.on('zegt',2)`, `q.on('lichaam',2)`), dan komen de drie pijlen tegelijk met de drie vragen.
12. **s04: "Antwoord b: er gebeurt iets, maar niet wat" blijft bovenaan staan tijdens het ANGST-schema** (s04_032.30). Fade hem samen met de hartslaggrafiek (binnen het blok `1 - O`).
13. **s06: de eerste ±10 s is het beeld bijna leeg** (s06_003.73 en s06_008.95: alleen een klein meetbord rechtsboven, met onleesbare tekst op schaal 0,6). Laat het meetbord groot binnenkomen met ZEGGEN gemarkeerd (zoals s05) en schuif het daarna naar de hoek. De vraagkaartjes zijn grijs met weinig contrast en zien er "uitgeschakeld" uit: gebruik de lichte kaartstijl van s08.
14. **s08: de bubbel "nee hoor, valt wel mee" heeft geen spreker.** Zet Lotte erbij (castboek), zoals in s05.
15. **s15: het getal boven Lotte wisselt continu tussen 45 en 70.** Dat is goed als idee ("de fout blijft in je score"), maar het is onrustig. Laat het in stappen springen (70 → 45 → 62) in plaats van een sinus. Lotte staat er voor "jij": het label "de fout blijft in jouw score" kan "in één score" worden.
16. **H4 komt abrupt.** De IAT staat los van Lotte en de spinnen. Een overgangszin helpt, bijvoorbeeld "Een betrouwbaarheid die goed genoeg is voor onderzoek, is niet altijd goed genoeg voor één mens."
17. **Taal H2:** "Dat is moeilijker mooier te maken" loopt stroef. Beter: "Daarbij kun je jezelf minder makkelijk mooier voordoen."
18. **Titel (s03) en eindkaart:** het mini-meetbord op de titel heeft tekst van ±16 px (onleesbaar op de telefoon). De endHaak-regel onderaan de eindkaart is grijs op donkerblauw en heeft weinig contrast: maak hem iets lichter.

## Goed

- Vakinhoud klopt: drie-systemenmodel (Lang 1968), Stroop 1935 met ±74 % langer (110 vs 63 s), emotionele Stroop bij spinnenangst, IAT test-hertest ±0,5, sociale wenselijkheid, dubbele/vage/sturende vragen.
- De openingsvraag wordt beantwoord: eerst direct in H1 (antwoord b), daarna in de recap met het meetbord.
- Personages Lotte en Dr. Kim komen uit het castboek. Geen grain, geen wijslijnen en geen "voor vwo" in de stem. Docentdeel en checkvragen sluiten aan op de film.

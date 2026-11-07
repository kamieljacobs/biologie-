# Frisse eindreview — b4 "Toeval of echt? Statistiek in de biologie"

Reviewer: frisse Claude-agent, 24 okt 2026. Gelezen: `script_v2.md`, `brief.md`, `sections.html`, `film.json`, `scenes_b4.js` (+ `scenes.js` voor `muis()`), `words/`, `qa/`; afspraken (BEELDAFSPRAKEN, WERKWIJZE-LESSEN, ROLLEN); voorgangers *Onderzoek doen* (H4 Mendel, H8 proefdieren) en *Beroemde psychologie-experimenten*. Eigen stills: `/tmp/claude-0/-home-claude/bca50db5-8e94-51a4-91d2-9a0a766aa95f/scratchpad/rev_b4/`, `rev_b4x/`, `rev_b4y/` (contactbladen in `rev_b4_sheets/`).

## Nagerekend
`reken/bereken.py` opnieuw gedraaid (scipy 1.18.1): uitvoer is gelijk aan `reken/uitvoer.txt`, ook bij het opnieuw draaien. Alle getallen in stem en beeld kloppen:
- gemiddelden 43,0 en 40,0; sd 2,91 en 3,02 ("ongeveer drie"); se 0,92 en 0,95 ("ongeveer één centimeter"); overlap 39 tot 44 cm klopt met de dataset.
- Student-t: t = 2,26, df = 18, p = 0,036 (Welch 0,036); "ruim twee keer zo groot als die wiebel" klopt (3 / 1,33).
- Exacte permutatietoets: 7912/184 756 = 0,043, dus "ongeveer vier op de honderd" en "p ≈ 0,04" kloppen (tweezijdig, |verschil| ≥ 3).
- 95%-BI verschil 0,22–5,78 cm ("een paar millimeter tot bijna zes"); 95%-BI per groep 37,8–42,2 en 40,9–45,1: die overlappen 1,24 cm (≈ 0,58 van een gemiddelde arm), en toch p < 0,05. Dat past bij Cumming e.a. 2007 (overlap van een halve arm ≈ p 0,05 bij n ≥ 10; regel is benaderend en bij n = 10 aan de voorzichtige kant).
- Power (d = 1, α = 0,05 tweezijdig): n = 10 → 0,56 ("iets meer dan de helft"), n = 17 → 0,81 ("acht van de tien"); simulatie bevestigt. √4 = 2 → 40 plantjes klopt. 20 000 × 0,05 = 1000 klopt.
- Opleidingen: Biomedische wetenschappen wo-bachelor 3 jaar + meestal master klopt; Bio-informatica hbo 4 jaar (HAN, Hanze, Hogeschool Leiden) en wo-masters (VU/UvA, WUR) klopt (studiekeuze123.nl, wur.nl, vu.nl).

De uitleg van de p-waarde in de stem is goed: voorwaardelijk geformuleerd ("uitgerekend alsof de meststof niets doet"), de twee misvattingen worden expliciet weerlegd (geen kans dat H0 waar is; geen maat voor effectgrootte; ASA 2016 principe 2 en 5), en de koppeling met de Mendel-simulatie en de nulhypothese uit *Onderzoek doen* klopt. Foutbalken: sd, se en 95%-BI worden alle drie getekend en benoemd, met de regel "zet erbij wat ze laten zien" (Cumming regel 1). De vragen zijn in orde: antwoorden b, a, c, opties ongeveer even lang, de vakterm staat niet alleen in het goede antwoord, en met Vragen uit lopen de alinea's goed door.

---

## Bevindingen

1. **MOET** — s07 28,5–35,8 s en s13 0–32 s · beeld. `muis()` uit `scenes.js` tekent **altijd een lichtvezel** (optogenetica) op de kop. In s07 loopt die draad van de muis omhoog en eindigt precies bij het metalabel "GROEN = SIGNIFICANT VERSCHIL GEVONDEN". Daardoor leest hij als een **wijslijn**, en dat mag niet. In s13 wijst Dr. Kim naar een muis met een kabel in zijn kop die nergens over gaat, en dat bij "proefdieren". **Voorstel:** een optie `vezel:false` in `muis()` (of een eigen muis zonder vezel in `scenes_b4.js`) en die op beide plekken gebruiken. Alleen beeld.

2. **MOET** — s07 0–14 s (curve van de standaardfout) · beeld. De aslabel "AANTAL PLANTJES PER GROEP" valt **over de schaalgetallen 40, 50 en 60** (zie `rev_b4_sheets/z4.png`). **Voorstel:** het aslabel onder de getallen zetten (± 30 px lager) of rechts uitlijnen ná 60. Alleen beeld.

3. **MOET** — s11 0–23 s (hele hoofdstuk 4) · beeld. Noor staat in `pose:'wijs'` met haar arm naar rechts, maar Daan staat in de weg. Haar arm **verdwijnt in Daans schouder**: het lijkt alsof ze door hem heen wijst of een vreemde arm om hem heen slaat (`rev_b4_sheets/z2.png`). **Voorstel:** Daan links van Noor zetten, of de figuren verder uit elkaar en Noor laten wijzen naar het spreadsheet boven Daans hoofd. Alleen beeld.

4. **MOET** — s13 23,2–32 s ("Daarom rekenen ze met een strengere grens" … einde) · beeld. De stem zegt: "Doet geen enkel gen iets …". Na de strengere grens blijft er toch **één groen vakje (= 25 genen) significant** over. Dat is misleidend. Bij een Bonferroni-achtige grens verwacht je als geen gen iets doet gemiddeld 0,05 vals-positieven, dus niets, en zeker geen 25. Groen leest bovendien als 'echte vondst'. **Voorstel:** na 'strengere' alle vakjes grijs laten (eventueel een chip "nu ± 0 door toeval"), dus in `genRaster` de drempel 0,0025 vervangen door 0. Alleen beeld.

5. **MOET** — s07 14,8–35,8 s · beeld. Metalabel "STEL: DE MESTSTOF SCHEELT ECHT **3 CM** · 20 PROEVEN". Volgens de afspraak (WERKWIJZE v10/C10) schrijf je eenheden in metalabels voluit. **Voorstel:** "… echt 3 centimeter · 20 proeven". Alleen beeld.

6. **MOET** — eindkaart (`script_v2.md` Eindkaart, regel 3), met dezelfde formulering in `film.json` `lead` · beeld + docentdeel. "p-waarde: hoe vaak **zo'n** verschil voorkomt als er geen effect is." Op de kaart die de leerling onthoudt, valt "**minstens zo groot**" weg. Los gelezen is dit de bekende misvatting 'de kans op precies deze uitkomst'. In de stem staat het wel goed ("minstens drie centimeter", "drie centimeter of meer"). **Voorstel:** "p-waarde: hoe vaak een minstens zo groot verschil voorkomt als er geen effect is." Pas in `lead` ook "zo'n verschil" aan naar "een minstens zo groot verschil". Geen nieuwe audio.

7. **KAN** — s10 1,4–8,6 s, kaartje "p = kans op een verschil van minstens 3 cm" · beeld. De p-waarde is hier tweezijdig (s08: "de ene of de andere kant op"). Zonder die toevoeging kan een leerling het kaartje eenzijdig lezen; eenzijdig zou p ≈ 0,02 zijn. **Voorstel:** onderregel "(groter of kleiner), uitgerekend alsof de meststof niets doet". Alleen beeld.

8. **KAN** — s10 36,5–44 s, chip "en toch p = 0,036" · beeld. In H3 kent de kijker alleen p ≈ 0,04 (husselen). De t-toets en 0,036 komen pas in H4. **Voorstel:** in H3 "en toch p ≈ 0,04". Alleen beeld.

9. **KAN** — s10 11,4–17,3 s · stem. Na "een kleine p-waarde zegt op zich niet hoe groot het effect is" volgt "Kijk daarvoor naar de foutbalken". Strikt genomen lees je de grootte van het effect af aan **het verschil zelf en het betrouwbaarheidsinterval van dat verschil**, niet aan de foutbalken per groep. Een sd-balk zegt niets over het effect. De alinea komt er aan het eind wel goed uit ("Voor het verschil zelf …"). **Voorstel** (alleen als er toch opnieuw wordt ingesproken): "Kijk daarvoor naar het verschil en zijn betrouwbaarheidsinterval. Eerst de foutbalken: zet er altijd bij …". **Nieuwe audio**, dus alleen meenemen bij een volgende opname.

10. **KAN** — s10 13–16,5 s · beeld. De chip "en ook niet: hoe groot het effect is" verschijnt pas op 'groot' (± 13,5 s) en vervaagt al vanaf 'foutbalken' (15,4 s). Hij is dus maar ± 1 s goed leesbaar. Daarna overlappen de kaartjes en de nieuwe grafiek even (`zoom_s10.png`). **Voorstel:** de chip laten verschijnen op 'kleine', en de kaartjes eerst weg laten gaan en dan pas de grafiek tonen (`wissel()`). Alleen beeld.

11. **KAN** — s08 20,8–27,4 s · beeld. Bij "in ongeveer vier op de honderd keer is het drie centimeter of meer, de ene of de andere kant op" zijn de staarten nog blauw. Ze worden pas koraal bij "De p-waarde is dus …" (± 28 s). **Voorstel:** de staarten kleuren op 'meer' of 'kant'. Daarnaast valt bij ± 19,5 s het gele stipje (het huidige verschil) over de chip "meestal dicht bij nul": zet de chip iets hoger. Alleen beeld.

12. **KAN** — s05 25,6–26,6 s · beeld. De chips "Noor: 3 / √10 ≈ 1 cm" (x 1560) en "half zo groot: hoeveel plantjes?" (x 1500) faden door elkaar heen en zijn even onleesbaar (`z3.png`). Dat strijdt met de afspraak 'één tekstbalk tegelijk'. **Voorstel:** `wissel()` gebruiken, of dezelfde x. Alleen beeld.

13. **KAN** — s05 hele alinea · beeld. De twee assen (34–46) hebben **geen eenheid**. **Voorstel:** "lengte in centimeter" onder de onderste as. Alleen beeld.

14. **KAN** — s04 14,3–21 s · beeld. De stem zegt "plantjes van vijfentwintig tot vijfenvijftig centimeter", maar de gele groep loopt in beeld tot 59 cm (`groot_m` = 27…59). **Voorstel:** `groot_m` iets inkorten (bv. 26…56), of de stem laten staan, want 'ongeveer' is acceptabel. Alleen beeld en rekenscript.

15. **KAN** — s04 39,8–40,8 s · beeld. Het label "44 cm" verschijnt pas op 'vierenveertig'. Dat is het laatste woord van de alinea, dus het is maar een halve seconde te zien. **Voorstel:** op 'grootste' laten verschijnen. Alleen beeld.

16. **KAN** — s01 0–8,6 s · beeld. De stem zegt "Zijn tomatenplanten worden er veel groter van", maar Opa Henk staat alleen; zijn tomatenplanten (in de brief genoemd) ontbreken. Ook is tweederde van het beeld leeg. **Voorstel:** een paar flinke tomatenplanten naast Henk vanaf t = 0. Alleen beeld.

17. **KAN** — s13 0–4,8 s · beeld. "… hun proeven met cellen of proefdieren": alleen de muis is getekend, geen cellen. **Voorstel:** een petrischaaltje met cellen naast de muis. Alleen beeld.

18. **KAN** — s12 9,5–15 s · beeld. Het kaartje "wat p echt zegt" verschijnt op 'zegt' (± 14 s) en staat bij het einde van de alinea nog half doorzichtig. **Voorstel:** laten verschijnen op 'p-waarde'. Alleen beeld.

19. **KAN** — s11 8,8–23 s · beeld. Het codevenster toont `stats.ttest_ind(met, zonder).pvalue` → `0.036`. In het echt print Python `0.0361…` (`np.float64(0.0361…)` in recente numpy). Leerlingen die het overtypen, zien dus iets anders. **Voorstel:** `round(stats.ttest_ind(met, zonder).pvalue, 3)` tonen (het rekenscript doet het ook zo), of de uitvoer als `0.0361` tonen. Alleen beeld.

20. **KAN** — `sections.html`, Getallen en bronnen, rij Foutbalken · docentdeel. "Cumming, Fidler & Vaux 2007 (regel 1 en 6: bij n ≥ 10 hoort p ≈ 0,05 bij ± een kwart overlap van de 95%-BI's)" is onnauwkeurig. Regel 6 gaat over **SE**-balken (gat van 1 SE ≈ p 0,05). De BI-regel voor n ≥ 10 staat in de tekst en bij figuur 6: "overlap of half of one arm indicates P ≈ 0.05". **Voorstel:** "(regel 1; figuur 6: bij n ≥ 10 hoort p ≈ 0,05 bij een overlap van een halve arm van de 95%-BI's; bij Noor ± 0,6 arm met p = 0,036, de regel is benaderend)". Bron: Cumming, Fidler & Vaux 2007, J Cell Biol 177:7–11, https://pmc.ncbi.nlm.nih.gov/articles/PMC2064100. Alleen docentdeel.

21. **KAN** — `film.json` glossary "standaardafwijking: ongeveer de gemiddelde afstand van een meting tot het gemiddelde". De sd is altijd minstens zo groot als de gemiddelde afstand. Bij Noor is de sd 3,0 cm en de gemiddelde afstand 2,4 cm. **Voorstel:** "een soort gemiddelde afstand van de metingen tot het gemiddelde (iets groter dan de gewone gemiddelde afstand)". Alleen docentdeel/glossary.

22. **KAN** — s13 26–32 s en docentdeel · stem/docentdeel. "Bio-informatica is een hbo-opleiding van vier jaar" klopt voor de opleiding met die naam (HAN, Hanze, Hogeschool Leiden). Voor een vwo-publiek is het wel nuttig te weten dat het ook op de universiteit al in de bachelor kan, bijvoorbeeld de specialisatie Bioinformatics binnen de BSc Biologie in Leiden. **Voorstel:** alleen in het docentdeel bijschrijven; de stem kan blijven. Bron: universiteitleiden.nl/en/education/study-programmes/bachelor/biology/bioinformatics. Alleen docentdeel.

23. **KAN** — rollen · docentdeel/ROLLEN. Daan staat in `ROLLEN.md` alleen als tweeling (met Thijs). Hier is hij Noors rekenmaatje. Dat botst niet, maar de rol staat nergens. **Voorstel:** in `ROLLEN.md` "klasgenoot/rekenmaatje van Noor = Daan" bijschrijven, zodat andere films hem net zo gebruiken. Geen filmwijziging.

---

**Telling:** 6 MOET (alle zes zonder nieuwe audio), 17 KAN (één ervan, punt 9, vraagt nieuwe audio en is optioneel).

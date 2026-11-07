# Frisse scriptreview — bi4 Van letters naar vorm, script_v1 (25 okt 2026)

Reviewer: Claude (frisse agent, heeft het maken niet gezien; alleen `brief.md`, `script_v1.md`, `getallen.md`, reeksbrief, `BRONNEN.md`, PROMPT v10 B1–B4 gelezen; niets uit `werk/` geopend). Bronnummers verwijzen naar `bronnen.md` in deze werkmap (eigen nummering, niet die van `getallen.md`). Het script is niet gewijzigd.

Stand: Expert 2 MOET · 8 KAN — Didactiek 2 MOET · 7 KAN — Taal 1 MOET · 7 KAN — Leerplan 2 MOET · 4 KAN.

---

## 1. Expert (vakinhoud)

1. **MOET — H4 'hoe een medicijn er precies bindt … voorspelt AlphaFold nog niet goed' is verouderd (status `!`).** AlphaFold 3 (Nature, mei 2024; B20) voorspelt complexen van eiwitten met kleine moleculen, en scoort op de PoseBusters-test beter dan klassieke docking-programma's als Vina. In oktober 2026 is 'voorspelt nog niet goed' te stellig, zeker omdat Sam in 2026 waarschijnlijk met de nieuwste versie werkt. Het deel over 'één veranderd aminozuur' staat wél als beperking in Terwilliger e.a. (B10), maar een andere studie (B22, preprint) vindt dat AlphaFold2 soms wel structuurveranderingen door puntmutaties voorspelt: ook dat is 'lastig', niet 'kan niet'. **Voorstel:** "Ook hoe een medicijn precies bindt, of wat één veranderd aminozuur doet, is lastig. Nieuwere versies proberen het, maar ook dan blijft het een gok die je toetst." (zo leunt het meteen op de volgende zin 'Daarom blijft een voorspelling een hypothese'). Eventueel op het scherm 'AlphaFold 3 (2024): ook met kleine moleculen'.
2. **MOET — H2 'Sinds ruim tien jaar kan het ook bevroren, zonder kristal: cryo-elektronenmicroscopie' is te stellig (status `!`).** Cryo-EM bestaat al sinds de jaren tachtig (Dubochet; Henderson 1990 met een eerste 3D-beeld, B5); sinds 2013 haalt het bijna atomair detail (B5) en sinds de nieuwe detectoren van 2012 komt het onder 3 Å (B15). Wat 'sinds ruim tien jaar' kan, is het **scherp genoeg** zien. **Voorstel:** "Sinds ruim tien jaar kan dat ook heel scherp met bevroren eiwitten, zonder kristal: cryo-elektronenmicroscopie."
3. **KAN — 'Niemand schreef de regels van het vouwen voor' (H3) is ietsje te stellig (status `≈`).** Jumper e.a. (B9) schrijven dat de opbouw van AlphaFold 'physical and biological knowledge about protein structure' bevat. Er is geen natuurkundig vouwmodel ingeprogrammeerd, dus de misconceptie ('AI kreeg de regels') wordt terecht bestreden. **Voorstel:** "Niemand schreef het vouwen stap voor stap voor. De meeste patronen haalde het zelf uit de voorbeelden."
4. **KAN — CASP-scores 2016/2018/2020 horen bij de moeilijkste eiwitten (status `≈`).** Nobelachtergrond (B7): onder de 40 'for the best ab initio predictions' t/m 2016, ongeveer 60 in 2018, ongeveer 90 'on difficult targets' in 2020. DeepMind (B1): mediaan 92,4 over alle doelen, 87,0 in de moeilijkste categorie. De drie getallen zijn onderling consistent, maar het scorebord moet zeggen dat het om de moeilijke eiwitten gaat; nu leest '2020 ± 90' als 'over alles' terwijl het scherm in de brief 'mediaan 92,4' (= alle doelen) noemt. **Voorstel:** scorebordlabel 'beste team · moeilijke eiwitten'; '92,4' weglaten of als 'alle eiwitten: 92' apart.
5. **KAN — H4 'dat was een gemiddelde over veel eiwitten'.** Het is een mediaan (B1). Voor de doelgroep is 'gemiddelde' verdedigbaar (`≈`); op het kaartje 'gemiddeld ± 90 ≠ elk stuk' kan 'mediaan' blijven weg. Geen actie nodig behalve het noteren als vereenvoudiging in het docentdeel.
6. **KAN — 'zo'n kwart miljoen structuren' tegenover 'meer dan tweehonderd miljoen bekende eiwitten' (H2).** Beide getallen kloppen (B3; B7, B8), maar de 250 441 PDB-entries zijn niet allemaal verschillende eiwitten (ook DNA/RNA, complexen, hetzelfde eiwit vaak meerdere keren; ± 100 000 unieke eiwitten in 2021, B9). De film zegt terecht 'structuren'; de vergelijking onderschat de kloof dus eerder dan dat ze overdrijft. Vereenvoudiging noteren in het docentdeel.
7. **KAN — 'zo'n honderdzeventigduizend gemeten structuren' (H3) rust voor het getal op DeepMind zelf (B1; commercieel belang).** Nobelachtergrond (B7) en Jumper (B9) bevestigen dat het om PDB-structuren ging, niet het getal. Status `≈`. Nog een onafhankelijke bron voor het getal zoeken, of zeggen 'veel meer dan honderdduizend'.
8. **KAN — 'een programma van DeepMind'.** Het bedrijf heet sinds 2023 Google DeepMind (B1, B20 auteursaffiliatie; B16 'Google's DeepMind'). Niet fout, wel onvolledig; op het naamkaartje 'Google DeepMind'.
9. **KAN — CASP in de tegenwoordige tijd ('voorspellen teams sinds 1994').** Klopt (B7, B1, B17), maar CASP verloor in 2025 zijn NIH-subsidie en draait op een eenmalige gift van Google DeepMind voor ongeveer twaalf maanden (B18). Of er in 2026 een ronde is, kon ik niet vaststellen. De zin houden; in het docentdeel noemen dat de wedstrijd van een AlphaFold-maker geld krijgt (relevant voor 'is dit eerlijk getest?').
10. **KAN — 'bij een andere stam zit … een ander aminozuur' (H1, status `?`).** Dat resistentie via één aminozuur in een doelenzym bestaat is algemeen bekend, maar ik heb er geen bron voor geopend. **Voorstel:** 'Maar stel: bij een andere stam …' laten staan (het 'stel' maakt het een gedachte-experiment) óf in `getallen.md` een concreet voorbeeld met twee bronnen toevoegen.

Gecontroleerd en in orde (zie `bronnen.md`): myoglobine 1958, röntgenkristallografie, 'kan jaren duren', PDB ± 250 000, > 200 miljoen eiwitten, 3¹⁰⁰ ≈ 5 × 10⁴⁷ ('een vijf met zevenenveertig nullen' klopt) en 'langer dan het heelal oud is', eiwit vouwt sneller, uitlijning en samen veranderende plekken, minder sequenties → slechtere voorspelling, CASP 1994 blind, ~90 ≈ meten, Nobelprijs 2024 (helften), pLDDT per stuk en de twee oorzaken van een lage score, één vorm/geen beweging, ± 200 miljoen voorspellingen gratis, voorspelling = hypothese, opleidingen.

Teleologie: geen problemen gevonden ('moeten bij elkaar passen' is een selectie-uitleg, geen doel). 'Het programma … onzeker / hoe zeker het is' is gangbaar voor een betrouwbaarheidsscore.

---

## 2. Didactiek

1. **MOET — H1-afleider (c) en H4 botsen voor een vwo-kijker (induced fit).** H1 rekent 'het enzym past zijn holte aan, zodat het substraat er weer in past' fout en zegt 'Het enzym past zich niet aan'; H4 zegt 'Een enzym kan van vorm veranderen als er iets in de holte gaat zitten', en *Alles versneld* (vwo-blok) leert hetzelfde. Een leerling die dat kent, kiest c met recht deels, en hoort daarna twee tegenstrijdige zinnen. **Voorstel:** maak van c een duidelijk doelgerichte misconceptie: "(c) het enzym merkt de verandering en bouwt zijn holte weer terug", en in het antwoord: "Een enzym bouwt zijn holte niet terug: het vouwt zoals zijn nieuwe volgorde het laat vouwen." In H4 dan: "Een enzym kan wel even van vorm veranderen als er iets in de holte gaat zitten."
2. **MOET — Vragen uit (B9) faalt in H3.** Zonder vraag hoort de kijker: "Op twee plekken veranderen de letters steeds samen. Wat leert het programma daaruit?" en dan "Twee aminozuren die elkaar raken, moeten bij elkaar passen." De kernconclusie (die twee liggen in de vorm tegen elkaar) wordt nergens in eigen woorden gezegd; ze staat alleen in optie c. **Voorstel:** na 'Antwoord c.' eerst: "Plekken die samen veranderen, liggen in de vorm waarschijnlijk tegen elkaar." Dan pas 'Twee aminozuren die elkaar raken …'.
3. **KAN — H4-vraag is te raadbaar.** Vlak vóór de vraag zegt de vertelling 'blauw zeker, oranje onzeker'; optie b herhaalt dat letterlijk. **Voorstel:** maak a sterker en c dichter bij de misconceptie: "(a) in de holte: daar moet het medicijn passen, en die is het lastigst" · "(c) nergens echt: bij een score van negentig klopt bijna elk stuk". Of verplaats 'blauw zeker, oranje onzeker' naar ná de vraag en vraag "Wat zou de kleur betekenen?".
4. **KAN — H1-vraag: juiste optie is herkenbaar aan de vorm.** b is de enige met 'kan' en de enige zonder 'dus/zodat'-redenering. **Voorstel:** a en c iets voorzichtiger formuleren of b korter ('de holte krijgt een andere vorm, en het enzym werkt anders').
5. **KAN — Antwoordletters b · a · c · b.** Alle drie letters komen voor, maar H1 en H4 zijn allebei b. Na verwerking van punt 3 kan H4 bijvoorbeeld a worden (opties herordenen) → b · a · c · a.
6. **KAN — H3 is te vol (vier nieuwe ideeën: hints uit uitlijning, leren van voorbeelden, CASP, Nobelprijs).** De brief ziet het zelf. **Voorstel:** schrap '2016 < 40' en verplaats de Nobelprijs naar het eind van H4 of naar één zin in de recap ('Daarvoor kregen … in 2024 de Nobelprijs').
7. **KAN — 'drie standen per schakel' (H2) wordt niet uitgelegd.** Het beeld (kladblok 'stand 1, 2, 3') helpt, maar gesproken weet de kijker niet wat een 'stand' is. **Voorstel:** "Stel dat elke schakel maar drie kanten op kan draaien."
8. **KAN — Begrippen één zin terug.** 'Uitlijnen' wordt genoemd ('zoals je … leerde uitlijnen') maar niet herhaald; 'sequentie' valt in H3 zonder dat de film het woord eerder gebruikte (Sam heeft 'letters'). **Voorstel:** "Die legt het onder elkaar, met gelijke letters onder elkaar: uitlijnen, zoals in de eerste film van deze reeks." en 'Hoe minder verwante eiwitten, hoe minder hints'.
9. **KAN — 'Wat denk je?' staat in de vertellingsalinea's** (H1, H2, H3, H4). Bij het opnemen per alinea moet die zin in de vraagtake zitten, anders blijft hij hoorbaar met Vragen uit. Ook 'Is dat sneller dan het lab?' (H2) en 'Waar verwacht je het grootste verschil?' (H4) horen bij de vraag. Markeren in het opnameblad.

Misconcepties 2–7 uit de brief worden behandeld; 3 en 6 het sterkst. De afloop van de envelop is een constructie met label 'voorbeeld · zo gaat het vaak'; dat past bij B10 (afwijkingen 'tended to occur in low-confidence regions') en is eerlijk gelabeld.

---

## 3. Taal (gesproken Nederlands)

1. **MOET — splits de zinnen van 17 woorden of meer** (stem en ademhaling):
   - H3 (19): "Bij elk voorbeeld gokte het een vorm, vergeleek die met de echte, en stelde zichzelf een klein beetje bij." → "Bij elk voorbeeld gokte het een vorm. Die vergeleek het met de echte. Daarna stelde het zichzelf een klein beetje bij."
   - H4 (18): de medicijnzin, zie Expert 1 (voorstel is al gesplitst).
   - H2 (17): "Een eiwit van honderd aminozuren, met drie standen per schakel, heeft drie tot de macht honderd vormen." → "Neem een eiwit van honderd aminozuren. Elke schakel kan drie kanten op. Dan zijn er drie tot de macht honderd vormen."
   - Recap (20): de reekszin; alleen samen met bi1–bi3 aan te passen (zie Leerplan 4).
2. **KAN — overige zinnen van 15–16 woorden** (H1 'Maar stel …', H3 'Die legt het …', CASP-zin, Nobelzin, H4 twee zinnen): acceptabel, maar de CASP-zin struikelt op de ellips 'die net gemeten zijn, maar nog geheim'. **Voorstel:** "In de wedstrijd CASP voorspellen teams sinds 1994 vormen die net gemeten zijn. Die zijn nog geheim."
3. **KAN — 'Zo zag men in 1958 …'**: 'men' is schrijftaal. → "Zo zagen onderzoekers in 1958 voor het eerst de vorm van een eiwit: myoglobine."
4. **KAN — 'Labs gebruiken haar'** (de voorspelling): klopt grammaticaal, klinkt stijf. → "Labs gebruiken zo'n voorspelling om sneller te meten …"
5. **KAN — dubbele vraag in H4** ('Waar verwacht je het grootste verschil? Wat denk je?'): één is genoeg; houd 'Wat denk je?' als vaste afsluiter en maak de eerste een mededeling ('De vraag is: waar zit het grootste verschil?') of laat hem weg.
6. **KAN — jaartallen als cijfers** (1958, 1994, 2016, 2018, 2020, 2024). Regel B4: getallen schrijven zoals ze gezegd worden. Bij eleven_v4 gaan jaartallen meestal goed; in de eerste take controleren, anders uitschrijven ('negentienachtenvijftig').
7. **KAN — uitspraakrisico's (aanvulling op de wachtlijst in de brief):** 'myoglobine' (klemtoon), 'cryo-elektronenmicroscopie' (lang; overweeg alleen 'cryo-EM' op het scherm en gesproken 'een elektronenmicroscoop'), 'CASP' (als woord), 'AlphaFold' zes keer gesproken (één foute uitspraak valt dus zes keer op: als eerste testen), 'Hassabis', 'biljoen' (moet 10¹² zijn), 'Bioinformatics' (Engels midden in een Nederlandse zin). Nieuw t.o.v. de wachtlijst: **'substraat'** (H1) en **'röntgenbundel'** staat niet in de tekst, prima. 'DeepMind' blijft risico.
8. **KAN — 'Dat heel vaak.'** (H3) is een losse bijzin zonder werkwoord; gesproken werkt het, maar 'Dat herhaalde het heel vaak.' is voor de stem rustiger.

Je-vorm en actieve zinnen: in orde. Gesproken woorden (zonder titel, VRAAG-regels en eindkaart): ± 985 volgens mijn telling, boven de 918 in de brief en boven de richtwaarde 800–950; met de schrappingen uit Didactiek 6 komt het eronder.

---

## 4. Leerplan en grenzen

### Dekkingstabel

| Leerdoel | Hoofdstuk | Vraag | Gedekt? |
|---|---|---|---|
| 1 volgorde → vorm → functie | H1 | V1 (b) | ja |
| 2 meten (kristal + röntgen, cryo-EM), traag/duur, minder structuren dan eiwitten | H2 | — | **nee**: V2 gaat over alles uitproberen (LD3) |
| 3 rekenvoorbeeld, niet alles uitproberen | H2 | V2 (a) | ja |
| 4 leren van voorbeelden + hints uit uitlijning | H3 | V3 (c) | half: alleen het hintsdeel |
| 5 CASP blind toetsen, score ~90 | H3 | (V4 optie c raakt 'negentig') | **nee**, alleen zijdelings |
| 6 toepassingen + voorspelling = hypothese | H4 | V4 (b) | ja (betrouwbaarheid per stuk); 'toepassingen' niet bevraagd |

1. **MOET — leerdoel 2 wordt door geen vraag getoetst.** **Voorstel:** een controlevraag in de speler (na de film) of een tweede vraag in H2: "Waarom zijn er zo veel minder structuren gemeten dan eiwitten bekend? (a) de meeste eiwitten hebben geen vaste vorm · (b) meten kost per eiwit veel tijd en dure apparaten · (c) de databank houdt de meeste structuren geheim". Antwoord b; a is half waar en daardoor een goede afleider.
2. **MOET — leerdoel 5 wordt door geen vraag getoetst.** **Voorstel:** controlevraag: "Waarom is de CASP-wedstrijd een eerlijke toets? (a) de teams krijgen de gemeten vorm achteraf te zien · (b) de vormen zijn al gemeten, maar nog geheim als de teams voorspellen · (c) alle teams gebruiken hetzelfde programma". Antwoord b. Eén controlevraag mag twee leerdoelen dekken (B4), dus 1 en 2 kunnen ook samen in één vraag over 'waarom blind meten nodig is'.
3. **KAN — leerdoel 4, deel 'leren van voorbeelden', is niet bevraagd.** Misconceptie 4 ('kreeg de regels ingeprogrammeerd') zou een sterke afleider zijn in een controlevraag.
4. **KAN — reekszin in de recap.** De brief noemt hem een voorstel dat in bi1–bi4 gelijk moet zijn. Ik kon dat niet nagaan: in `bi1`–`bi3` staat buiten `werk/` geen script, en `werk/` heb ik volgens opdracht niet geopend. De feiten zelf kloppen (HAN 240 EC = vier jaar; Radboud Biology en MLS 180 EC; Wageningen-master twee jaar, Engelstalig). Zin van 20 woorden: bij het gelijktrekken meteen splitsen. Op het opleidingskaartje de volledige naam 'Bioinformatics and Systems Biology'.
5. **KAN — grens met film 2 (welke variant maakt ziek).** H1 ('een ander aminozuur') en H4 ('wat één veranderd aminozuur doet') raken het onderwerp van film 2. Geen overlap in uitleg, maar één zin verwijzing ('daarover gaat de film over varianten') kan, of bewust niet; afstemmen met bi2.
6. **KAN — 'Zo'n tweehonderd miljoen voorspellingen staan gratis online'** is geen verwijzing naar een tool of de site (B4-regel in orde), maar het beeld 'databank-kaart' mag geen URL of logo tonen.

Grenzen die goed zijn: *Sleutel, slot en dosis* verwezen, niet herhaald; uitlijnen één zin terug; geen primaire/secundaire structuur; geen 'op de site', 'probeer het zelf' of tool; echte personen alleen genoemd; begrip **eiwitstructuur** gelijk aan de reeksdefinitie ('de ruimtelijke vorm'; de reeks zegt '… waarin een keten van aminozuren vouwt', de zin ervoor levert dat).

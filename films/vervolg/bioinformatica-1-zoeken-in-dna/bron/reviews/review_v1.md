# Frisse scriptreview — bi1 Zoeken in DNA, script_v1 (25 okt 2026)

Reviewer: Claude (frisse helper, heeft het maken niet gezien). Gelezen: `brief.md`, `script_v1.md`, `getallen.md`, `REEKS-bioinformatica.md`, `films/BRONNEN.md`, `PROMPT_v10.md` B1–B4, scripts van DNA 4 (*De genetische code lezen*), DNA 7 (*DNA lezen*) en voor de term deletie DNA 5 (*Mutaties*). `werk/` niet geopend. Bronnen zelf geopend: zie `../bronnen.md`. De Python-code heb ik zelf gedraaid (met de volledige standaardcodetabel).

Gesproken tekst: 939 woorden ≈ 6,7 min bij 140 w/min. Cold open 44 woorden ≈ 18 s (binnen 20 s).

Nagerekend:
- `gen = "ATGGCCCTGTGGATGCGC"` → **MALWMR** ✓; eerste run vanaf de tweede letter `TGGCCCTGTGGATGCGCC` → **WPCGCA** ✓.
- Uitlijning `ACCT-AGGACTTCAGTA` / `ACCTCAGGACTTGAGTA`: 15 gelijk, 1 anders (plek 13), 1 gat → **13** ✓. Dat is ook de hoogst haalbare score voor dit paar (Needleman–Wunsch, +1/−1/−1, zelf berekend). Zonder gat: 6 gelijk, 10 anders → −4 (met het eindgat −5).
- De codeblokregel `code = {"AUG": "M", "GCC": "A", "CUG": "L", ...}` geeft in echte Python een **SyntaxError** (zie E13).
- Een rij van 17 letters geeft in deze code een KeyError (het laatste 'codon' heeft maar 2 letters). Daarom zegt "werkt voor elke lengte" meer dan de code kan (zie E2).

---

## 1. Expert (vakinhoud)

**E1 · MOET · BLAST: "Dat zijn maar een paar plekken" klopt niet bij woordjes van elf letters.** (H3, regel 58) Er bestaan 4¹¹ ≈ 4,2 miljoen verschillende woordjes van elf letters. GenBank alleen heeft al ongeveer 34 biljoen basen (B1). Een willekeurig woordje van elf komt dus puur door toeval ongeveer 8 miljoen keer voor (eigen som). Met elf letters zijn het dus juist heel veel plekken, en 'bijna alle andere sequenties slaat het over' klopt dan ook niet. Bij woordjes van achtentwintig (megablast; B6; dat megablast de standaard is op de NCBI-site, zegt getallen.md, maar die pagina heb ik niet zelf geopend) is de kans op een toevalstreffer bijna nul (eigen som: 3,4·10¹³ / 4²⁸ ≈ 0,0005). BLAST leest de databank wel door, maar lijnt bijna nergens uit (B4: "scan the database"; B5: "scan the database for word matches"). Fix (kies één):
  - (voorkeur) "BLAST knipt de barcode in woordjes van achtentwintig letters. Dan zoekt het waar precies zo'n woordje voorkomt. Zo'n lang woordje vind je bijna nooit toevallig. Bij bijna alle sequenties begint BLAST dus niet eens aan uitlijnen." Beeld: tegels van 28 (binnen de 20–40 per rij uit de reeksbrief).
  - of houd 'bijvoorbeeld elf' en schrap 'Dat zijn maar een paar plekken': "Alleen op die plekken gaat het verder. Aan bijna alle andere letters begint het niet."
  Dit lost ook de twijfel '11 of 28' uit de brief op: 28 is voor deze zoektocht beter verdedigbaar.

**E2 · MOET · "Het echte insulinegen" + "dezelfde regels werken voor elke lengte" + "duizend genen" + eindkaart "vertalen elk gen".** (H4, regels 73, 82–86, 103) Het menselijke insulinegen heeft een intron midden in het coderende deel (B16: intron tussen c.187 en c.188). Geef je de code het echte gen, dan komt er na het intron onzin uit. DNA 4 (n24, vwo) en DNA 7 (n22, basis) leren juist dat een bacterie geen introns kan wegknippen en dat je daarom het gen zonder introns gebruikt. Ook werkt de code alleen bij een lengte die deelbaar is door drie (zelf gedraaid: KeyError bij 17 letters). En het werkt alleen met de standaardcode: de barcode uit deze film zelf (mitochondriaal COI) vertaal je ermee fout (B17: UGA = tryptofaan in code 2). Fix:
  - r. 73: "zet Kim het begin van het recept voor insuline op het scherm: het deel dat codeert, zonder introns."
  - r. 82: "Het hele recept is veel langer dan deze achttien letters: ruim driehonderd." (B16: 333 letters, met stopcodon.)
  - r. 86: "Zo vertaal je duizend recepten net zo makkelijk als één."
  - eindkaart: "Een paar regels code vertalen elk recept, als het beginpunt klopt."
  - Beelden H4: in de bouw krijgt de tabel ook de drie stopcodons (bv. als '*'), anders loopt de code bij het hele recept vast op TAG.

**E3 · MOET · "In een databank staat een gen als DNA: met T in plaats van U. Dus zet de computer elke T om in een U."** (H4, r. 76) Klopt alleen voor de coderende streng. DNA 4 leert havo (basis, n12–n14) juist: "Tegenover elke base in het DNA zet je de complementaire base." Alleen vwo (n15) krijgt de coderende streng. Een havoleerling hoort hier dus een regel die met de vorige film botst. Fix: "In een databank staat de volgorde van het mRNA, maar als DNA: met T in plaats van U. Dus zet de computer elke T om in een U." Eventueel: "Dat is de streng die je in De genetische code lezen de coderende streng noemde" (alleen als vwo-woord; liever weglaten).

**E4 · MOET · Micro-beeld van het gat geeft een verkeerd beeld van een deletie.** (H2, r. 41 en Beelden H2) "dubbele DNA-streng waarin tegenover één base niets zit": zo ziet een deletie er niet uit. Bij een echte deletie mist het hele basenpaar, in beide strengen. Wat nu getekend is, is een losse base zonder partner (een bobbel in een dubbele streng die uit twee verschillende organismen komt). Fix: toon twee aparte dubbele strengen (stukje 1 en stukje 2) boven elkaar, waarbij in stukje 1 één heel basenpaar ontbreekt en de rest één plek opschuift. Of toon in de Micro alleen één streng (de gelezen letters) met een open plek.

**E5 · MOET · Het toevalsgetal bewijst niet welke soort het is.** (H3, r. 63–67) Het beeld geeft alle drie de treffers 'heel dicht bij nul'. Dat klopt: bij verwante tonijnen is die kans ook bijna nul. Maar de tekst zegt "Hier is dat bijna nul. 'Geelvin!' roept Sam." Dan lijkt het alsof het lage toevalsgetal de soort bewijst. Het zegt alleen dat de overeenkomst geen toeval is (B5, B7). Welke soort het is, volgt uit procent gelijk. Fix: "Bij alle drie is dat bijna nul. Geen toeval dus: het is zeker tonijn. Welke tonijn, zie je aan het procent gelijk." Daarna 'Geelvin!' – 'Weet je dat zeker?'. Eindkaart: "kans op toeval" → "hoeveel treffers je door toeval zou vinden". Een E-waarde is een verwacht aantal, geen kans (B5, B7). Dit draagt meteen leerdoel 4 (zie D1).

**E6 · KAN · Tonijn: 100% bij geelvin kan in het echt gelijkspelen met een andere soort.** Lowenstein e.a. (B11): BOLD gaf voor geelvin een 100%-treffer bij vier soorten (geelvin, grootoog, zwartvin, hondstand). GenBank-BLAST gaf wel steeds één duidelijke soort bovenaan. Ook: een referentie van grootoog in GenBank was "mislabeled, misidentified or" een hybride. En voor tonijn gebruiken labs soms een tweede stukje DNA (B12: twee merkers, "highly complex"). Het beeld 'voorbeeld' en 'Weet je dat zeker?' vangen dit al deels op. Voorstel: Kims controle concreet maken: "Bij tonijn kijkt het lab soms nog naar een tweede stukje DNA." Dan staat 'meerdere bronnen' (eindkaart) niet los.

**E7 · KAN · Registervergelijking staat op de verkeerde plek en past maar half.** (r. 60–61) Het register past bij het opzoeken van woordjes (r. 58), niet bij het uitbreiden (r. 61), waar hij nu staat. En de klassieke BLAST maakt het 'register' van de zoekvraag en leest de databank door (B4). Fix: verplaats naar r. 58 ("Zoals je in het register van een dik boek opzoekt op welke bladzijden een woord staat."). Of schrap het, als het beeld (inzet met boek) het al zegt.

**E8 · KAN · Radar 2017: 'twintig keer geelvin' is op zich geen fraude.** (Recap, r. 93) Geelvin is de gewone sushitonijn. Het punt van Radar (B13) is: restaurants zeiden soms "blauwvintonijn", en ook dan was het geelvin (maar 5 van de 21 gaven goede informatie). Fix: "In 2017 liet Radar tonijn testen in eenentwintig Nederlandse restaurants. Soms zeiden ze: blauwvin. Elke keer was het geelvin of witte tonijn." Of "Twintig keer was het geelvintonijn, ook als het restaurant blauwvin zei." Bron: één journalistieke test (B, oorsprong). Een tweede, onafhankelijke en vergelijkbare bevinding: Oceana/KU Leuven 2015 in Brussel (B14: 95% van de 'blauwvin' was grootoog of geelvin, getest met de COI-barcode). Het getal is van 2017. 'In 2017' blijft dus nodig.

**E9 · KAN · Hoofdstukkaart H3 "in seconden" vs. vertelling "vaak binnen een paar minuten, soms in seconden".** De kaart belooft meer dan de tekst. Voor de tijd heb ik geen A-bron die de huidige NCBI-snelheid noemt (B8 is een vakblog, C). Fix: kaart "Hoe zoek je snel door miljarden sequenties?"

**E10 · KAN · "Ze wisselen elke dag alles uit."** B1 en B3 zeggen 'daily data exchange' / 'exchange data on a daily basis', niet 'alles'. Fix: "Ze wisselen elke dag hun nieuwe sequenties uit." Of "Ze delen elke dag alles wat er nieuw is."

**E11 · KAN · Opleidingsnaam en route (reekszin, ter info voor de reeks).** De WUR-master heet *Bioinformatics and Systems Biology* (B20, twee jaar, Engelstalig). Toelating: een Nederlandse bachelor Biologie wordt met naam genoemd, en een bachelor Molecular Life Sciences "van WUR of een vergelijkbare universiteit" ook (B20). De route via Radboud is dus redelijk, maar niet automatisch (de toelatingscommissie kijkt per persoon). Beide Radboud-bachelors zijn 180 EC en volledig Engelstalig (B21, B22). De vaste reekszin is bindend: ik wijzig hem niet, maar meld voor de reeks dat 'de master Bioinformatics' een afkorting is.

**E12 · KAN · "Programmeren leer je al in het eerste jaar" rust op een studiegids van 2022–23 (B19: Python 1 en 2 in jaar 1).** Dat is vier jaar oud. De huidige HAN-pagina kon ik niet openen (allowlist). Studiekeuze123 (B18) zegt alleen "biologie en programmeren combineren". Even nakijken op han.nl voor 2026–27.

**E13 · KAN · De code in beeld is geen geldige Python.** `{"AUG": "M", "GCC": "A", "CUG": "L", ...}` geeft een SyntaxError. Een leerling die het overtypt, of een programmeur die kijkt, ziet dat meteen. Fix: zet precies de vijf codons in beeld die het voorbeeld nodig heeft, plus commentaar: `code = {"AUG": "M", "GCC": "A", "CUG": "L", "UGG": "W", "CGC": "R"}  # in het echt: alle 64`. Dan draait wat in beeld staat écht en geeft het MALWMR (zelf gecontroleerd). De 'te late' run in koraal kan blijven (beeld van de bouwversie met de volle tabel).

Verder gecontroleerd en in orde: openbare databanken, gratis, Amerika/Europa/Japan (B2, B3); miljarden sequenties en meer dan een half miljoen soorten (B1: 4,7 miljard sequenties, 581 000 soorten); de barcode is een stuk van één mitochondriaal gen van ongeveer 650 letters (B9: 648; B10: 655); "bij de meeste dieren" verschilt het per soort (B9, B10); tonijnsoorten verschillen weinig (B11: K2P geelvin–Pacifische blauwvin 0,0077, dus ongeveer 5 letters op 650); BLAST breidt uit "zolang de score goed blijft" (B4, B6 X-dropoff); echte programma's geven andere punten (B4: +5/−4); blauwvin is duurder en zeldzaam (B13, B14); M A L W (B16); HAN vier jaar (B18: 240 EC); werkvelden (B18, B20). Geen teleologie gevonden.

## 2. Didactiek

**D1 · MOET · Leerdoel 4 wordt door geen enkele vraag getoetst.** PROMPT B4: elk leerdoel minstens één voorspel- of controlevraag. LD4 (een treffer beoordelen) staat alleen als gegeven ('Weet je dat zeker?'). Fix: maak van dat moment een vraag. Bijvoorbeeld na E5: "Bovenaan staat geelvin, honderd procent. Is Sam nu klaar? Wat denk je?" (a) ja: honderd procent gelijk is zeker · (b) nee: de databank kan een fout bevatten, dus Kim kijkt verder · (c) nee: honderd procent kan alleen bij DNA van één en dezelfde vis. Goede letter b → letters a · b · c · b · a (H1 a, H2 b, H3 c, nieuw b, H4 a): gespreid genoeg. Opties ongeveer even lang houden.

**D2 · MOET · 'Sequentie' wordt pas gedefinieerd na drie keer gebruik.** Eerste gebruik r. 25 (vraag: "Waar staan de sequenties van bekende soorten?") en r. 29 (twee keer). De definitie komt pas r. 32. Een leerling die het woord niet kent, mist zo de vraag. Fix: zet "Een sequentie is de volgorde van basen in een stuk DNA." in de alinea van r. 22, bijvoorbeeld na "Het lab heeft een vast stukje DNA gelezen." Haal hem op r. 32 weg.

**D3 · KAN · De vraag in H4 is te makkelijk te raden.** In het beeld bij de vraag staat al "de zes regels code blijven ongewijzigd staan". Dat geeft het antwoord weg. Optie c ('anders duurt het dagen') is zwak. Fix: laat 'ongewijzigd' pas na het antwoord zien. Vervang c door een echte misvatting: "(c) een regel die de computer vertelt hoe lang het gen is". De code doet dat zelf met `len`: een mooie uitleg na het antwoord.

**D4 · KAN · 'Letters' betekent opeens iets anders.** De hele film zijn letters basen (650 letters, gelijke letters, woordjes van elf letters). In H4 r. 79: "staat er een rij letters: elk aminozuur krijgt één letter". Fix: "Na de verbetering staan er zes aminozuren. Elk heeft een eigen lettercode. M is methionine…"

**D5 · KAN · Leerdoel 2 (de score zelf uitrekenen) wordt niet gevraagd.** De vraag in H2 toetst het gat, niet de som. Fix: een controlevraag in `oefenen.json` met een nieuw paar (bv. 10 gelijk, 2 anders, 1 gat → 7). Het script hoeft niet langer.

**D6 · KAN · "score 13 en score 2" (beeld r. 47): de tweede uitlijning komt uit het niets.** Gebruik hetzelfde paar zonder gat: 6 gelijk, 10 anders → −4 (zelf nagerekend). Dan zie je wat het gat oplevert: van −4 naar 13. Vertelling eventueel: "Zonder gat was het min vier. Met één gat dertien."

**D7 · KAN · Mogelijke verwarring met DNA 7.** DNA 7 noemt het DNA-profiel "een streepjescode van een mens" (n9), en daar is 'de databank' die van de politie, die niet openbaar is (n0, n19). In film 1 is een DNA-barcode een gelezen volgorde, en een databank is openbaar (reeksdefinitie). Fix (één bijzin, r. 22): "Daarom heet het een DNA-barcode. Geen profiel van lengtes, zoals bij de politie: hier lees je de letters zelf." Bij de H1-vraag maakt dit afleider c ('elk lab apart') ook eerlijker.

**D8 · KAN · Tijdlijn botst met de reeksbrief.** Reeks: "elke film is één dag". Script: lunch, "de volgende ochtend", en in H4 "Na de lunch" (dag 2). Twijfelscène voor Kamiel: of 'elke film is één dag' loslaten voor film 1 (barcoden kost tijd), of de cold open op de ochtend laten beginnen met de sushi van gisteren ("Gisteren at Sam sushi…").

**D9 · KAN · Vragen uit: grens van het vraagsegment vastleggen.** Na elke vraag leunt de vertelling niet op de vraag (gecontroleerd: geen 'klopt', 'inderdaad', 'zoals je dacht'; "op die plek" in H2 verwijst naar "na de vierde letter" uit de vertelling ervoor, en die blijft staan). Maar in r. 38, 54 en 82 staan de vraagzinnen ("Wat is er aan de hand?", "Hoe kan dat zo snel?", "Wat moet Sam aan zijn code veranderen?") midden in een vertelalinea. Markeer in het script waar het q-segment begint, zodat de vertelling zonder vraag niet eindigt op een losse vraag. Bij H4 ("veel langer dan deze achttien letters" → "Antwoord a. De stap van drie herhaalt zich vanzelf") loopt het zonder vraag goed door.

Goed: elke vraag heeft een bekende misvatting als afleider (H1 c, H2 a, H3 a, H4 b); één nieuw begrip per alinea, behalve D2; het lunchmoment komt terug in de recap; de verkeerde run in H4 laat misvatting 6 echt zien.

## 3. Taal (gesproken Nederlands, stem)

**T1 · MOET · "Sams eerste poging" (r. 79).** De brief zegt zelf: 'Sams' heeft nog geen goede uitspraakvariant en staat daarom nergens in de vertelling. Toch staat het hier. Fix: "De eerste poging van Sam begint één letter te laat."

**T2 · MOET · 'Bioinformatics' (r. 96) is een Engels woord in een Nederlandse stem.** Het staat niet op de uitspraakwachtlijst. Toevoegen (risico: Nederlandse uitspraak 'bio-informatiks' of half Engels). Dit geldt voor alle vier de films (reekszin).

**T3 · KAN · Definitiezin van 17 woorden (r. 42).** "Dat heet uitlijnen: twee sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan." Fix (meteen met L2): "Dat heet uitlijnen. Je legt twee of meer sequenties onder elkaar. Zo dat zoveel mogelijk gelijke letters onder elkaar staan."

**T4 · KAN · "Kims scherm" (r. 13).** Zelfde risico als 'Sams'. Fix: "op het scherm van Kim".

**T5 · KAN · "Net als het register achter in een dik boek." (r. 61)** Een zin zonder werkwoord, na een zin over iets anders (zie E7). Na verplaatsen een hele zin maken.

**T6 · KAN · R. 54 is vol voor de stem.** "Toch heeft het zoekprogramma BLAST vaak binnen een paar minuten antwoord, soms in seconden." Fix: "Toch heeft het zoekprogramma BLAST vaak binnen een paar minuten antwoord. Soms al in seconden."

**T7 · KAN · Reekszin van 20 woorden (r. 96), boven de 15.** Die zin is bindend en in alle films gelijk. Meld het aan de reeks. Een splitsing die in alle vier past: "Of je doet eerst een bachelor in Nijmegen, zoals biologie of moleculaire levenswetenschappen. Daarna volgt de master Bioinformatics in Wageningen."

Verder: 'Dr. Kim' → stem 'dokter Kim' (staat op de lijst); 'leucine' → 'leusine' (staat op de lijst); 'een-en-twintig' is als in DNA 7. Bij E1 (voorkeur) komt 'achtentwintig' in de tekst: geen risico.

## 4. Leerplan en grenzen

**Dekkingstabel** (leerdoel → hoofdstuk → vraag)

| Leerdoel | Hoofdstuk | Vraag | Stand |
|---|---|---|---|
| 1 openbare databanken, vergelijken met bekende sequenties, barcode | H1 | H1 (a) | ✓ |
| 2 uitlijnen, gat plaatsen, score berekenen | H2 | H2 (b): alleen het gat | ≈ score niet gevraagd (D5) |
| 3 waarom BLAST snel is | H3 | H3 (c) | ✓ (inhoud: E1) |
| 4 treffer beoordelen: procent, toeval, één treffer niet genoeg | H3 | — | **ontbreekt (D1/L1)** |
| 5 programma dat vertaalt; werkt voor elk gen; zelfde fout als met de hand | H4 | H4 (a) | ✓ (inhoud: E2) |

**L1 · MOET · Leerdoel 4 zonder vraag.** Fix = D1.

**L2 · MOET · Definitie 'uitlijnen' wijkt af van de reeksbrief.** Reeks: "twee **of meer** sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan, met gaten waar een stukje ontbreekt of extra is." Script r. 42: "twee sequenties". Film 3 en 4 lijnen meer dan twee sequenties uit en verwijzen naar deze film ("zoals je in de eerste film leerde uitlijnen", bi4 H3: zes regels). PROMPT B2: definities uit de brief letterlijk. Fix: zie T3.

**L3 · KAN · DNA 5 (Mutaties) ontbreekt bij 'bouwt voort op'.** Het woord 'deletie' (r. 42) komt uit DNA 5, waar ook de leesraamverschuiving staat. Voeg toe aan de kop. Een zin terug kan ("zoals een deletie in de film over mutaties"). Pas op: een opgeschoven uitlijning is iets anders dan een verschoven leesraam. Dus geen 'leesraam' noemen.

Grenzen, gecontroleerd:
- DNA 4: de codontabel wordt niet opnieuw uitgelegd ✓ (r. 72–76 verwijzen alleen); startcodon/methionine klopt met DNA 4 n10 ✓; T→U botst met de havo-route (E3).
- DNA 7: sequencen in één zin terug (r. 22) ✓; 'leesfout' (r. 42) legt niets uit ✓; streepjescode/databank (D7); introns (E2).
- Film 2–4: 'algoritme' wordt hier niet gedefinieerd; bi2 en bi3 definiëren het zelf ✓. Uitlijnen wordt in bi3 en bi4 hergebruikt, dus de definitie moet 'twee of meer' zijn (L2).
- Geen verwijzing naar tools, opdrachten of de site, niet gesproken en niet op kaarten ✓ ('vertaal.py' is een tabblad in het reeksobject, geen verwijzing).

---

**Telling:** Expert 5 MOET · 8 KAN; Didactiek 2 MOET · 7 KAN; Taal 2 MOET · 5 KAN; Leerplan 2 MOET · 1 KAN.

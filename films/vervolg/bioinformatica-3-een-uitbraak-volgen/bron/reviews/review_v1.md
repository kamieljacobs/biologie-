# Review script_v1 — Stambomen uit DNA: een uitbraak volgen (bi3)

Frisse review, 25 okt 2026, volgens `HELPER-review.md`. Gelezen: `brief.md`, `script_v1.md`, `getallen.md`, `REEKS-bioinformatica.md`, `BRONNEN.md`, `PROMPT_v10.md` B1–B4, en de scripts van Evolutie 7 en 8 (voor de grenzen). Niet geopend: `werk/`. Het script is niet gewijzigd. Bronnen en status per bewering: `../bronnen.md`.

Zelf nagerekend (Python, scratchpad): de tabel van H2 (A-B 0; A/B met C/E 5; C-E 2; D met A/B 6, met C/E 7) geeft met 'steeds het kleinste paar samenvoegen' precies ((A,B),(C,E)),D. Na elke stap zijn de afstanden van een groepje naar de rest gelijk (5 / 6 / 7), dus middelen is echt niet nodig. Het rekenvoorbeeld klopt. Bootstrap op 29 408 kolommen waarvan 10 variabel, 4000 keer: A-B 0,99 · C-E 0,85 · A-B met C-E 0,59. Dat past bij 99 / 85 / 58 in het script.

Gesproken lengte: ± 945 woorden (± 6¾ min bij 140 woorden per minuut). Dat past in de reeks. Antwoordletters: b · a · b · c.

---

## 1. Expert (vakinhoud)

1. **MOET — Q1: het uitgangspunt maakt het goede antwoord onwaar.** 'Twee medewerkers raakten een week na elkaar besmet. Hoeveel letters verschillen hun virussen?' Er staat niet dat de een de ander besmette. Twee mensen die los van elkaar besmet raken, kunnen veel meer verschillen. De film laat dat zelf zien: collega's A en C verschillen vijf letters, en in de echte studie zaten drie groepen. Antwoord (b) klopt alleen voor één besmettingsketen. Status `!`.
   *Fix:* 'Een medewerker besmet een collega. Een week later laten ze allebei een monster lezen. Hoeveel letters verschillen hun virussen?'

2. **MOET — 'Een boom zegt verwantschap. Geen richting' is in het algemeen te stellig.** Didelot e.a. 2017 (B18 in getallen.md) zegt juist het omgekeerde: 'we can draw inferences about the order and direction of transmission'. Het artikel geeft een methode om uit een boom met tijden af te leiden wie wie besmette, met onzekerheid. `getallen.md` leest die bron dus verkeerd. Wél juist voor deze situatie, met identieke of bijna identieke virussen: Torres Ortiz e.a. 2023 ('many index case and contact pairs will share identical genotypes, making it difficult to ascertain who infected whom') en Sikkema e.a. 2020 ('difficult to draw definite conclusions on individual direct … transmission'). Status `!` voor de algemene zin (H4 r. 66, annotatie 'boom = verwantschap, geen richting', recap r. 75, eindkaart r. 83).
   *Fix:* H4 'Een boom alleen zegt verwantschap. Wie wie besmette, zie je er bij zulke kleine verschillen niet aan. En schuld al helemaal niet.' Annotatie 'boom = verwantschap · richting meestal niet te zien'. Eindkaart 'Een stamboom toont verwantschap. Richting zie je er zelden aan, schuld nooit.' In het logboek B18 vervangen door Torres Ortiz 2023 en Sikkema 2020.

3. **MOET — beeld H4/recap: 'tien bedden in drie kleuren … in alle drie de ziekenhuizen'.** De tien patiënten kwamen uit twee ziekenhuizen: 'seven patients at Amphia Hospital and three patients at Elisabeth-TweeSteden Hospital' (B1). In Bravis zijn geen patiënten gesequenced. Status `!` (alleen beeld).
   *Fix:* zeven bedden in Breda en drie in Tilburg, geen bedden in Roosendaal/Bergen op Zoom. Poppetjes van medewerkers wel in alle drie.

4. **MOET — bootstrap: 'evenveel kolommen' ontbreekt, en het lijkt één nieuwe uitlijning.** De kern van Felsenstein 1985 is 'sampling n characters from the original set with replacement': de nieuwe uitlijning is even lang als de echte. Pas daardoor komen sommige kolommen twee keer en vallen andere weg. Nu staat er 'Met die nieuwe uitlijning … honderden keren', alsof je met één nieuwe uitlijning honderden bomen bouwt. Leerdoel 3 vraagt om herbemonsteren in eigen woorden uit te leggen.
   *Fix:* 'De computer trekt kolommen uit de uitlijning, zoals loten uit een bak. Na elke trekking gaat het lot terug. Hij trekt er evenveel als de echte uitlijning heeft. Sommige kolommen komen dan twee keer, andere niet. Met die nieuwe uitlijning bouwt hij een nieuwe boom. Dat doet hij honderden keren, steeds met een nieuwe trekking.'

5. **KAN — volgorde in H1: eerst aan elkaar leggen, dan uitlijnen.** Bij corona legt de computer de stukjes langs het referentiegenoom en maakt daar één sequentie van (B1: 'aligned to reference'; de stukjes overlappen, B11 'overlapping 400nt amplicons'). Als vereenvoudiging is het niet fout. *Fix:* 'De computer legt de stukjes langs een referentiegenoom, zoals in de eerste film van deze reeks. Zo krijg je één sequentie: de volgorde van alle letters.' Daarmee valt ook een zin weg.

6. **KAN — 'En er zit toeval in. Soms ontstaat dezelfde mutatie twee keer.'** Volgens van Dorp e.a. 2020 kan zo'n herhaalde mutatie ook door selectie komen. Daarom zochten zij die plekken ('candidates for ongoing adaptation'), en sommige kunnen een verwerkingsfout zijn. 'Toeval' als enige oorzaak is te smal. *Fix:* 'Soms ontstaat dezelfde mutatie twee keer, los van elkaar, in twee lijnen.' (zonder 'toeval'), of 'door toeval of door selectie'.

7. **KAN — 'maar was niet de grote route'.** De bron zegt voorzichtiger 'our data do not support widespread nosocomial transmission'. *Fix:* '…kon niet worden uitgesloten, maar leek niet de grote route.'

8. **KAN — 'Die zaten verspreid over de ziekenhuizen'.** Alleen groep 1 zat in alle drie de ziekenhuizen. Groep 2 zat vooral in Amphia (85 %) en een paar keer in Bravis. *Fix:* 'Elke groep kwam in meer dan één ziekenhuis voor, en ook bij mensen daarbuiten.' Dat klopt met B1 en draagt het argument even goed.

9. **KAN — 'honderden keren'.** Klopt (QIAGEN: 'usually around 100'), maar Sikkema e.a. gebruikten 1000 herhalingen. *Fix:* 'honderden of duizend keer', of zo laten.

10. **KAN — 'Echte programma's rekenen slimmer, maar het idee blijft: wie het minst verschilt, hangt het dichtst bij elkaar.'** De echte studie gebruikte maximum likelihood (IQ-TREE). Dat werkt niet met 'het kleinste paar', maar zoekt de boom die het best bij alle letters past. Het idee 'weinig verschil = nauw verwant' blijft wel overeind. Status `≈`. *Fix (optioneel):* '…maar het idee blijft: weinig verschil betekent nauw verwant.'

11. **KAN — docentdeel.** (a) De methode is UPGMA. Die neemt aan dat mutaties overal in hetzelfde tempo komen (B14, Craven). Met willekeurige tabellen moet je na het samenvoegen de afstanden middelen (B14: gewogen gemiddelde). (b) A-B krijgt 99 en geen 100, terwijl A en B identiek zijn. Dat komt doordat C en E in sommige trekkingen ook nul verschil krijgen: een gelijkspel. (c) Sikkema: de interviews vroegen naar reizen naar het buitenland en bijeenkomsten van meer dan 50 mensen. 63 % had carnaval gevierd. Dat is achtergrond voor 'gesprekken'; het hoort niet in de film.

## 2. Didactiek

1. **MOET — Vragen uit: de vraagzinnen staan in de vertelalinea.** In r. 23, 35, 53 en 60 eindigt de vertelling met de vraag ('Hoeveel letters …? Wat denk je?'). In Evolutie 7/8 is elke 'Wat denk je? …' een eigen segment, zodat de speler het kan weglaten. *Fix:* elke vraag (met de opzet die alleen voor de vraag dient) als apart segment schrijven, vóór `[VRAAG]`. De vertelling ervoor moet zonder de vraag af zijn.

2. **MOET — payoff Q1 leunt op de vraag.** 'Meestal geen letter, of maar een paar.' Met Vragen uit volgt dit direct op 'Dat is gemeten.' Dan is het een antwoord zonder vraag. *Fix:* 'Twee mensen die elkaar besmetten, verschillen meestal geen letter, of maar een paar. Twee per maand is een gemiddelde, en een week is kort. Ze hebben dus vaak precies hetzelfde virus.'

3. **MOET — payoff Q2 leunt op de vraag.** 'C en E, met maar twee letters verschil.' is een los zinsdeel als antwoord. *Fix:* 'Het volgende kleinste getal is twee: C en E. Die hang je samen.' Daarna: 'Waar iemand werkt, telt niet mee: dat staat niet in de tabel.'

4. **MOET — Q4: de misconceptie 'eerder positief = bron' wordt niet weerlegd.** Afleider (a) is 'A besmette B, want A testte eerder positief'. De payoff zegt alleen 'niet wie wie besmette'. Het verleidelijke idee (eerder getest) wordt niet genoemd en niet weerlegd (B4: noem het idee, laat het mislukken, eindig op het juiste idee). Met Vragen uit verdwijnt de 'twee dagen eerder' helemaal. *Fix:* vóór de vraag (in de vertelling) 'A testte twee dagen eerder positief dan B.' In de payoff: 'Wie eerder test, is niet per se eerder besmet. Misschien had B gewoon later klachten.'

5. **KAN — Q3, afleider (a) is te makkelijk weg te strepen.** 'Zes van de tien mensen in dat groepje besmet' valt meteen af, dus kies je tussen (b) en (c). *Fix:* een afleider die het herbemonsteren verkeerd leest: 'dat zes van de tien kolommen dat groepje steunen'. Die verwarring komt vaak voor.

6. **KAN — Q4: het goede antwoord is het langste en meest voorzichtige.** Daardoor is het raadbaar. *Fix:* korter, bijvoorbeeld '(c) hun virussen zijn familie; wie wie besmette, zie je niet', en (b) iets langer maken: 'ze hebben elkaar vast ontmoet, want hun virus is precies gelijk'.

7. **KAN — antwoordletters naast monsterletters op de vraagkaart van Q2.** Op het scherm staat 'b) A-B en C': twee soorten letters door elkaar. *Fix:* monsters altijd als hoofdletter in een gekleurd poppetje of rondje tonen, en de optieletters klein en grijs. Of op de kaart van Q2 de optieletters door 1/2/3 vervangen, als de speler dat toelaat.

8. **KAN — de Vragen-uit-zoekcontrole slaat vals alarm.** H3-payoff: 'Het bewijst niet dat de boom klopt.' 'klopt' staat in de zoeklijst van B9 (vraag, voorspel, antwoord, klopt, inderdaad, zoals je). *Fix:* '…niet dat de boom juist is.'

9. **KAN — H3 is vol.** Er staan drie nieuwe ideeën na elkaar: weinig verschillen, dezelfde mutatie twee keer plus leesfout, en herbemonsteren met steungetal. Op zich is de volgorde goed. Wel een korte pauze of beeldovergang na r. 47 vóór 'Daarom test Dr. Kim de boom'.

10. **KAN — Sam stelt geen vraag.** Volgens de reeksbrief 'stelt hij de vragen die de kijker heeft'. Nu krijgt hij alleen sequenties. *Fix:* één zin zoals 'Sam vraagt: hoe zeker is die boom eigenlijk?' als begin van H3, wat ook de hoofdstukvraag hardop maakt.

11. **KAN — misconceptie 7 (wie ontbreekt, zie je als lege tak).** Die staat in de brief, maar komt nu alleen in één zin voor ('Een boom toont alleen wie je wél hebt gemeten'). Prima als vertelling, maar dan in het docentdeel als nakijkvraag zetten.

## 3. Taal (gesproken Nederlands, stem)

1. **MOET — 'In Hoe weten we dat? gebruikte je verschillen als klok.'** De filmtitel met vraagteken midden in de zin geeft vraagintonatie en een rare pauze. De ondertitel leest ook raar. *Fix:* 'In de evolutiefilm over hoe we dat weten, gebruikte je verschillen als klok.' Of korter: 'In de evolutiereeks gebruikte je verschillen als klok.'

2. **MOET — Q4-optie (c) 'ze zijn nauw verwant, maar niet wie wie besmette'.** Er ontbreekt een werkwoord ('maar [je weet] niet …'). En 'ze zijn nauw verwant' zegt dat de mensen familie zijn, terwijl het om hun virussen gaat. Dat is een inhoudelijke misser bij een gevoelig onderwerp. *Fix:* 'hun virussen zijn nauw verwant; wie wie besmette, zie je niet'. Controleer ook de rest op 'verwant' zonder 'virussen': r. 63 'Gelijke virussen zeggen: nauw verwant' is goed.

3. **KAN — zinnen van meer dan 15 woorden** (7 stuks), met splitsing:
   - r. 17 (17 w.) 'Het lab schrijft dat om naar DNA. Dan kopieert het dat in stukjes van een paar honderd letters.'
   - r. 23 (20 w.) 'Bij elke kopie in een cel kan er een fout in sluipen. Dat is een mutatie, zoals in de film over mutaties.'
   - r. 41 (17 w.) zie Expert 10.
   - r. 50 (18 w.) zie Expert 4.
   - r. 69 (18 w.) 'Daarom leggen onderzoekers de boom naast gesprekken. Wie werkte waar? Wie had wanneer klachten? Wie was waar geweest?'
   - r. 75 (23 w.) 'Dat zie je als je het virus van veel mensen leest. Je telt de verschillen en bouwt er stap voor stap een stamboom van.'
   - r. 77 (20 w.) is de vaste reekszin; laten staan.

4. **KAN — 'A-B', 'C-E', 'A-B met C-E'.** Risico: Engelse 'B', of 'A tot B' / 'A min B'. De brief noemt het al. *Fix:* stem-invoer 'aa-bé', 'cee-ee', 'aa-bé met cee-ee' en die regels testen vóór de hele opname. Losse 'E' ('E is een patiënt daar') en 'D' ook in de test meenemen.

5. **KAN — 'Twee medewerkers raakten een week na elkaar besmet'** is stroef Nederlands. Valt weg met Expert 1.

6. **KAN — 'wie wie besmette' komt vier keer voor.** Dubbel 'wie' is een struikelkans voor de stem. *Fix:* één of twee keer 'wie het aan wie gaf', of de takes beluisteren.

7. **KAN — 'E is een patiënt daar'** → 'E is daar patiënt'.

8. **KAN — DNA-uitspraak.** In Evolutie 7/8 staat in de stem-invoer 'deeënaa'. De brief zegt 'DNA (gewone spelling), goedgekeurd'. Nagaan welke regel nu geldt, zodat de reeksen hetzelfde klinken.

## 4. Leerplan en grenzen

**Dekkingstabel**

| Leerdoel | Hoofdstuk | Vraag |
|---|---|---|
| 1 monster → sequentie; waarom weinig verschil | H1 | Q1 (alleen het tweede deel; de stappen van monster naar sequentie worden niet gevraagd) |
| 2 zelf een boom bouwen uit een tabel | H2 | Q2 |
| 3 twee redenen voor onzekerheid; bootstrap; wat een steungetal betekent | H3 | Q3 (alleen het steungetal) |
| 4 verwantschap, geen richting/schuld; ongeteste mensen ontbreken | H4 | Q4 (richting) |
| 5 boom + gesprekken; uitkomst 2020 | H4, recap | **geen** |

1. **MOET — leerdoel 5 wordt door geen vraag getoetst** (B4 Curriculum: elk leerdoel minstens één vraag). *Fix:* een voorspelvraag vlak voor de echte studie: 'Collega's van één afdeling hebben vaak verschillende virussen. Wat zegt dat? (a) ze besmetten elkaar op de afdeling · (b) ze kregen het waarschijnlijk elk ergens anders ✓ · (c) de test was fout.' Of een nakijkvraag in het docentdeel als de lengte knelt.

2. **MOET — gevoelig: het bedachte voorbeeld staat in de echte ziekenhuizen.** 'A en C zijn verpleegkundigen in Breda, E is een patiënt daar. B werkt in Tilburg', op dezelfde plattegrond als de echte casus. In H4 gaat het dan over 'besmette de verpleegkundige de patiënt?' Een kijker (of iemand die in Amphia werkt) kan dit voor echte gegevens over echte mensen houden. 'Een bedacht voorbeeld' wordt maar één keer gezegd. *Fix:* in H2–H4 geen stadsnamen: 'A en C zijn verpleegkundigen op één afdeling, E is daar patiënt. B werkt in een ander ziekenhuis.' Een plattegrond zonder stadslabel, en een vast kaartje 'bedacht voorbeeld' in beeld zolang A–E te zien zijn. De echte steden pas weer bij 'Zo ging het in maart 2020 echt'.

3. **KAN — sequencen: drie zinnen tegen 'hooguit één zin'** (reeksbrief). Verdedigbaar, want RNA → DNA is nieuw en leerdoel 1 vraagt erom. Met Expert 5 wordt het korter.

4. **KAN — brug naar Evolutie 7.** Evolutie 7 gebruikte verschillen niet alleen als klok, maar ook voor verwantschap (walvis–nijlpaard, q32). *Fix:* 'In de evolutiereeks telde je verschillen om verwantschap en tijd te schatten. Hier bouw je er zelf een boom mee.' Klok blijft één zin. ✓
   Evolutie 8: 'Hoe je hem leest, zag je in Stambomen lezen' ✓. Het lezen wordt niet herhaald, en 'vertakking' is hetzelfde woord als in Evolutie 8 ✓. Afleider 'staan naast elkaar' sluit mooi aan bij Evolutie 8 s09.

5. **KAN — brug naar Evolutie 8 bij 'dezelfde mutatie twee keer'.** Evolutie 8 leert dat lijken geen familie bewijst (analoge organen). *Fix (optioneel):* '…Dan lijken twee virussen familie, terwijl ze dat niet zijn. Net als de zwemmers in Stambomen lezen.' Het woord 'convergent' niet gebruiken (zie Expert 6).

6. **KAN — grijze poppetjes 'niet getest' en het grijze poppetje bij de drie pijlen.** Die botsen met 'geen grijze poppetjes' (fitnesscheck B4). Ze dragen wel betekenis. Kamiel beslist (staat al in de brief). Alternatief: poppetjes met stippellijn in zorgblauw.

7. **KAN — vaste reekszin: 'de master Bioinformatics'.** De officiële naam is 'Bioinformatics and Systems Biology' (WUR). Voor gesproken tekst is de korte naam goed. Op het opleidingskaartje de volledige naam zetten.

8. ✓ Geen verwijzing naar tools of de site, niet gesproken en niet op kaarten. De definities van algoritme, stamboom (fylogenetische boom) en sequentie staan er zoals in de reeksbrief. Uitlijnen en referentiegenoom worden in één zin teruggehaald, zoals afgesproken.

---

**Telling:** Expert 4 MOET / 7 KAN · Didactiek 4 MOET / 7 KAN · Taal 2 MOET / 6 KAN · Leerplan/grenzen 2 MOET / 5 KAN (+1 ✓).

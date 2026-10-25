# Celdeling — script v2 (lichte remake, fase 1, 25 okt 2026)

Lichte remake volgens prompt v10 B16. Geraamte = `../script_v2.md` (versie 1.4, 22 okt 2026): leerdoelen, hoofdstukvolgorde en vragen blijven. Elke alinea is nagelopen tegen prompt v10 (B4, B9/B11, C8), `films/BEELDAFSPRAKEN.md`, het bronnenlogboek (`bronnen.md` in deze map) en de twee buurfilms: *Chromosomen en de taal van erfelijkheid* 2.1 (zelfde kleuren: vaderskant teal, moederskant oker; zelfde tekeningen `kernChromatine`, `chromatideX`, `huidDoorsnede`, `onderarm`) en *Geslachtsorganen en puberteit* (eicelvoorraad zo'n 300.000 bij de puberteit; zaadcellen elke dag nieuw).

Publiek havo + vwo bovenbouw; vwo-blokken [VWO-START] … [VWO-END]; extra uitdaging [EXTRA-START] … [EXTRA-END] (havo én vwo, overslaanbaar, geen examenstof). Stem Roos (ElevenLabs, nieuwste model), één take per alinea, stem-invoer met `films/uitspraak.json` + `uitspraak_film.json` (deze map). Alle alinea's worden opnieuw ingesproken (nieuwe nummering; oude nummer tussen haakjes).

**Indeling in de les (nieuw):** één film in twee delen met elk een eigen afronding, zodat je hem in één les of in twee lessen kunt laten zien. Deel 1 *Celcyclus en mitose* (cold open t/m ongeslachtelijke voortplanting, ± 6 min gesproken in de basis), deel 2 *Meiose* (± 4 min). Het hoofdstukmenu toont 'Deel 1' en 'Deel 2'; de kaart van hoofdstuk 5 is de overgang. Zie twijfel 1.

Markering per alinea: `=` ongewijzigd · `~` aangepast (waarom) · `+` nieuw · `−` geschrapt.

### Leerdoelen (ongewijzigd)
1. basis — redenen voor celdeling: groei, herstel, vervanging; voortplanting bij eencelligen
2. basis — celcyclus: interfase (groei en DNA kopiëren, geen rustfase), mitose (kerndeling), cytokinese; mitose + cytokinese = celdeling
3. basis — chromatine en chromosomen; 46 chromosomen in 23 paren (22 paren autosomen + geslachtschromosomen XX/XY); homologe chromosomen; na kopiëren twee chromatiden met een centromeer; tellen via centromeren
4. basis — vier fasen van de mitose; uitkomst twee genetisch gelijke dochtercellen met 46; DNA-hoeveelheid per kern: p → 2p → p
5. basis — meiose (reductiedeling): 2n = 46 → n = 23; meiose I scheidt de paren, meiose II de chromatiden; plaats: teelballen en eierstokken; variatie door toevallige verdeling (2²³) en crossing-over; bevruchting n + n = 2n; 5b ongeslachtelijke en geslachtelijke voortplanting
6. basis — mitose en meiose vergelijken
7. basis — G1-, S- en G2-fase; vwo — controlepunten
8. basis — crossing-over
9. vwo — kanker; non-disjunctie en trisomie 21

Misconcepties (ongewijzigd, plus waar ze nu in beeld falen): (1) chromosomen bestaan alleen tijdens de deling → H3: dezelfde draad condenseert zichtbaar (morph); (2) de X-vorm is twee chromosomen → q14 met 2n = 4; (3) DNA wordt tijdens de mitose gekopieerd → q07 + de draad verdubbelt in beeld in de S-fase; (4) in de interfase rust de cel → H2; (5) na mitose heeft elke cel de helft van het DNA → q18 + DNA-grafiek die meeloopt met de cel; (6) meiose is twee keer mitose → H5/H6: mitose en meiose I naast elkaar met hetzelfde gevolgde paar; (7) na meiose I zijn er nog 46 → q23 + teller in beeld.

### Wat er inhoudelijk verandert (kort; details in de markeringen)

| Plek | Wijziging | Waarom |
|---|---|---|
| s01 | 'zo'n zevenendertig biljoen' → 'tientallen biljoenen' | bronnen verschillen (3,0 en 3,7 × 10¹³); voorzichtige formulering (BRONNEN.md §2) |
| s04–s05 | huid als voorbeeld van vervangen en herstellen; 'bacterie' → 'eencellige' | beeld sluit aan op de huid uit Chromosomen; een bacterie deelt zonder mitose (geen kern), dat botste met v01 'nieuwe cellen ontstaan door mitose' |
| s08, s15, s19, s24, s29, s32, s35 | kort antwoord na een vraag ('In de interfase.', 'Vier.', 'Zesenveertig, …') → hele zin | B9/B11: bij Vragen uit blijft geen los antwoord hangen |
| s10, s30 | 'Voor vwo:' / 'Voor vwo nog één stap:' weg | BEELDAFSPRAKEN: niet 'Voor vwo' zeggen |
| H3 | korter (XX/XY in één zin, met 'autosomen'); s15 introduceert de modelcel | Chromosomen behandelt het karyogram als hoofdthema (BEELDAFSPRAKEN: niet herhalen) |
| s16, s17 | 'We volgen één paar' en 'Kijk naar ons paar' | C8: één chromosoompaar volgen door de hele film |
| s22–s23 | crossing-over verhuist naar het moment waarop het gebeurt (meiose I, paren tegen elkaar); 'zoeken elkaar op' weg | proces in tijdsvolgorde (type C); teleologie (B3) |
| s23 | 'bij elk paar meestal één of twee keer' → 'minstens één keer, vaak een paar keer' | bronnencheck `!` (2 bronnen, ≥ 1 niveau A): bij vrouwen ± 3–4 per paar |
| s24 | eicel: 'de laatste stap gebeurt pas bij de bevruchting' | gelijk aan Chromosomen 2.1 (eicel in metafase II bij de eisprong) |
| e01–e03 | korter (± 86 → ± 70 s); gesproken 'Extra uitdaging:' weg | lengte; het okerblok staat in beeld |
| x01–x02 | herschreven met Noors familie: Linda's eicel begon aan meiose toen oma Ria zwanger was van Linda; vraag 'ruim zevenentwintig jaar'; 'Daarom' → 'Dat is waarschijnlijk een belangrijke reden' | herkenbaar menselijk moment dat het concept draagt (BEELDAFSPRAKEN); de bron noemt cohesineslijtage een voorgestelde oorzaak (te stellig); zie twijfel 4 |
| v01, v02 | korter; zoetwaterpoliep en stek weg; zin naar deel 2 | lengte; minder risicowoorden |
| s33 | recap begint bij de puzzel van het begin | B4: de recap beantwoordt de puzzel |

---

## DEEL 1 · CELCYCLUS EN MITOSE

## Cold open [Macro → Micro]
`~` **s01** (s01) — 'zevenendertig biljoen' → 'tientallen biljoenen' (bronnen 3,0 en 3,7 × 10¹³)
Je begon als één cel: een bevruchte eicel. Nu besta je uit tientallen biljoenen cellen. In bijna elke cel zit hetzelfde DNA: twee meter draad, opgevouwen in een kern van een paar duizendste millimeter. Elke keer dat een cel deelt, moet dat DNA eerlijk verdeeld worden. Geen stukje te veel, geen stukje te weinig. Hoe doet een cel dat? Wat denk je?
[VRAAG] q02 (a) knippen in twee helften · (b) eerst kopiëren, dan verdelen · (c) elke cel maakt nieuw DNA

`=` **s03** titel: Celdeling. Eerst kopiëren, dan verdelen.

## Hoofdstuk 1 — Waarom delen? [Micro]
`~` **s04** (s04) — huid als voorbeeld (beeld = huid van Noor, zelfde tekening als Chromosomen); wond → schaafwond
Eerst kopiëren, dan verdelen. Maar waarom deelt een cel eigenlijk? Om te groeien: zo werd jij van één cel een heel mens. Om te herstellen: bij een schaafwond delen de cellen aan de rand, tot het gat dicht is. En om te vervangen. Onderin je huid delen cellen de hele dag door, terwijl bovenaan dode cellen afslijten. En in je beenmerg ontstaan elke seconde zo'n twee miljoen rode bloedcellen.

`~` **s05** (s05) — 'bacterie' → 'eencellige' (bacterie: geen kern, geen mitose); 'maken ze er liever twee van' weg (teleologie)
Ook een eencellige deelt, om zich voort te planten: uit één cel worden er twee. Waarom wordt een cel niet gewoon steeds groter? Denk aan de film over diffusie. Hoe groter de cel, hoe verder de weg voor diffusie. Het midden krijgt dan te laat zuurstof. Zo blijven cellen klein: een cel die gegroeid is, deelt in tweeën.

## Hoofdstuk 2 — De celcyclus [Schema-ring + Micro]
`~` **s06** (s06) — 'De mitose zelf duurt maar een uur' → 'ongeveer een uur' (afgerond getal)
Een cel die deelt, doorloopt steeds dezelfde kringloop: de celcyclus. Het grootste deel van de tijd zit de cel in de interfase. Dat is geen rustfase: de cel groeit, en maakt eiwitten en organellen bij. Daarna volgt de mitose: de kern deelt. Tot slot deelt de rest van de cel. Dat heet cytokinese. Mitose is dus de kerndeling. Mitose en cytokinese samen zijn de celdeling. Bij snel delende cellen duurt zo'n rondje ongeveer een dag. De mitose zelf duurt ongeveer een uur. Veel cellen, zoals zenuwcellen, stoppen helemaal met delen. De twee nieuwe cellen krijgen allebei al het DNA. Wanneer wordt het DNA gekopieerd? Wat denk je?
[VRAAG] q07 (a) tijdens de mitose · (b) in de interfase · (c) na de cytokinese

`~` **s08** (s08) — B9: 'In de interfase.' → hele zin
Het DNA wordt gekopieerd in de interfase. Als de mitose begint, is het DNA al dubbel. Hoe dat kopiëren werkt, zie je in de film DNA kopiëren.

`~` **s09** (s09) — 'elke draad wordt een dubbele draad' toegevoegd (beeld: de draad verdubbelt)
De interfase heeft drie delen. In de G1-fase groeit de cel. In de S-fase wordt het DNA gekopieerd: elke draad wordt een dubbele draad. S staat voor synthese. In de G2-fase maakt de cel zich klaar voor de deling.

[VWO-START]
`~` **s10** (s10) — 'Voor vwo:' weg
Op een paar momenten controleert de cel of alles klopt. Is de cel groot genoeg? Is het DNA goed gekopieerd? Pas dan gaat hij verder. Dat zijn controlepunten. Terug naar de hoofdlijn.
[VWO-END]

## Hoofdstuk 3 — Chromosomen tellen [Micro]
`~` **s11** (s11) — 'Te dun om te zien, maar de draden zijn er wel' weg (beeld laat het zien); homologen met de definitie uit Chromosomen
In de interfase ligt het DNA als lange, losse draden door de kern: chromatine. Elke draad is één chromosoom. Een mens heeft er zesenveertig: drieëntwintig paren. Van elk paar komt er één van je vader en één van je moeder. De twee van een paar heten homologe chromosomen: ze zijn even lang, en dragen op dezelfde plekken dezelfde genen.

`~` **s12** (s12) — korter, met 'autosomen' (leerdoel 3); X en Y in detail staan in Chromosomen
Tweeëntwintig paren zijn bij mannen en vrouwen hetzelfde: de autosomen. Het drieëntwintigste paar zijn de geslachtschromosomen: XX bij een vrouw, XY bij een man.

`~` **s13** (s13) — 'twee gelijke kopieën' → 'twee gelijke helften'; 'een kruisje: een X-vorm' → 'een X-vorm'
Aan het begin van de deling rolt elk chromosoom zich heel strak op. Pas dan zie je ze onder de microscoop. Omdat het DNA al gekopieerd is, bestaat elk chromosoom dan uit twee gelijke helften: twee chromatiden. Ze zitten aan elkaar vast bij het centromeer. Zo krijgt het chromosoom een X-vorm. Let op: dat zijn twee soorten twee. Een paar is twee chromosomen: één van je vader en één van je moeder. Een X-vorm is één chromosoom, met twee gelijke chromatiden. Deze cel heeft vier X-vormen. Hoeveel chromosomen zie je? Wat denk je?
[VRAAG] q14 (a) 2 · (b) 4 · (c) 8

`~` **s15** (s15) — B9: 'Vier.' weg; introduceert de modelcel (2 paren) die de rest van de film terugkomt
Elke X-vorm is één chromosoom: tel de centromeren. Deze modelcel heeft dus vier chromosomen, in twee paren. Een mens heeft er zesenveertig, met samen tweeënnegentig chromatiden.

## Hoofdstuk 4 — Mitose [Micro]
`~` **s16** (s16) — één paar volgen (C8); 'elk voor zich' (contrast met meiose I)
Nu de mitose, in vier stappen. We volgen één paar: het lange paar, met het chromosoom van vaderskant en dat van moederskant. Profase. De chromosomen rollen zich op en worden zichtbaar. Vanuit de twee polen van de cel groeien trekdraden: samen heten ze de spoelfiguur. Aan het eind van de profase valt het kernmembraan uit elkaar. Metafase. De trekdraden trekken de chromosomen naar het midden. Daar liggen ze elk voor zich op één lijn: het equatorvlak. Aan elk centromeer zitten trekdraden van beide polen.

[EXTRA-START]
`~` **e01** (e01) — korter; gesproken 'Extra uitdaging:' weg (okerblok in beeld)
Hoe weet de cel dat alles goed vastzit? Bij elk centromeer zitten twee eiwitplaatjes: de kinetochoren. Daar haken de trekdraden aan. Hangt elk kinetochoor aan een andere pool, dan trekken de draden tegen elkaar in: het centromeer staat onder spanning. Hangen beide aan dezelfde pool, dan is er geen spanning, en laten de draden weer los. Een los kinetochoor geeft een wachtsignaal. Pas als alles goed vastzit, knipt een enzym de eiwitringen door die de chromatiden bij elkaar houden: cohesine. Een gif zorgt dat de trekdraden niet aan de kinetochoren kunnen haken. Wat doet de cel dan? Wat denk je?
[VRAAG] eq02 (a) de cel gaat toch door naar de anafase · (b) de cel blijft wachten in de metafase · (c) de cel knipt meteen de cohesine door

`~` **e03** (e03) — B9: begint met de uitleg, niet met het antwoord; korter
Zonder trekdraden is elk kinetochoor los, en geeft het een wachtsignaal. De cel blijft dan wachten in de metafase. Zo werken ook sommige middelen tegen kanker: de deling stopt. En hoe trekken de draden straks? Ze worden korter: bij het kinetochoor worden ze steeds verder afgebroken, en het kinetochoor houdt het krimpende uiteinde vast. Terug naar de hoofdlijn.
[EXTRA-END]

`~` **s17** (s17) — 'Kijk naar ons paar' (C8, één paar volgen); 'Zo ontstaan twee dochtercellen: de cytokinese' → volgorde omgedraaid
Anafase. De centromeren splitsen. De trekdraden trekken de chromatiden uit elkaar, naar de twee polen. Kijk naar ons paar: van het chromosoom van vaderskant gaat één chromatide naar links en één naar rechts. Net zo bij dat van moederskant. Vanaf nu noemen we elke chromatide een chromosoom. Even zitten er dus tweeënnegentig chromosomen in één cel. Telofase. Aan elke pool ontstaat een nieuw kernmembraan, en de chromosomen rollen zich weer uit. Ondertussen snoert de cel in het midden in: de cytokinese. Zo ontstaan twee dochtercellen. Een plantencel kan niet insnoeren door zijn celwand. Die bouwt in het midden een celplaat, die een nieuwe celwand wordt. Hoeveel chromosomen heeft elke dochtercel? Wat denk je?
[VRAAG] q18 (a) 23 · (b) 46 · (c) 92

`~` **s19** (s19) — B9: 'Zesenveertig, …' → hele zin
Elke dochtercel heeft zesenveertig chromosomen, net als de moedercel. Hij krijgt van elk chromosoom één chromatide.

`=` **s20** (s20)
Volg de hoeveelheid DNA in één kern. Noem die na de deling p. In de interfase verdubbelt het DNA tot twee p. Na de mitose heeft elke kern weer p. Het DNA is dus niet gehalveerd. Het is eerst verdubbeld, en toen eerlijk verdeeld. De twee dochtercellen zijn genetisch gelijk.

`~` **v01** (v01) — korter (± 40 → ± 33 s); zoetwaterpoliep en stek weg; laatste zin = overgang naar deel 2
Mitose zorgt ook voor voortplanting. Bij ongeslachtelijke voortplanting ontstaan nakomelingen uit één ouder, zonder bevruchting. Hun cellen ontstaan door mitose, dus ze zijn genetisch gelijk aan hun ouder: het zijn klonen. Een eencellige deelt zich in tweeën. Gist maakt een knop, die loslaat als nieuwe gistcel. Een aardbeiplant maakt uitlopers, waaruit nieuwe plantjes groeien. En een bladluis krijgt in de zomer jongen zonder bevruchting. Bij geslachtelijke voortplanting zijn er twee ouders. Daarvoor is een andere deling nodig: de meiose.

---

## DEEL 2 · MEIOSE

## Hoofdstuk 5 — Meiose [Schema → Micro]
`=` **s21** (s21)
Voor geslachtscellen werkt het anders. Bij de bevruchting versmelten een zaadcel en een eicel. Hadden die allebei zesenveertig chromosomen, dan had het kind er tweeënnegentig. Een gewone lichaamscel heeft paren chromosomen. Zo'n cel heet diploïd: twee n is zesenveertig. Een geslachtscel heeft van elk paar er maar één. Die heet haploïd: n is drieëntwintig.

`~` **s22** (s22, eerste helft) — opgeknipt; 'maar' maakt het contrast met de twee delingen
Geslachtscellen ontstaan door meiose: bij een man in de teelballen, bij een vrouw in de eierstokken. Meiose halveert het aantal chromosomen. Daarom heet het ook reductiedeling. Meiose bestaat uit twee delingen achter elkaar, maar het DNA wordt maar één keer gekopieerd.

`+` **s23** (s22 tweede helft + s26 crossing-over) — crossing-over op het moment dat het gebeurt; 'zoeken elkaar op' weg (teleologie); aantal per paar gecorrigeerd (bronnencheck `!`)
We volgen weer het lange paar. In meiose één komen de homologe chromosomen als paar tegen elkaar aan te liggen. Daarbij wisselen ze stukken uit. Dat heet crossing-over. Kijk: het chromosoom van vaderskant heeft nu een stuk van moederskant, en andersom. Bij elk paar gebeurt dat minstens één keer, vaak een paar keer. Dan gaan de paren in het equatorvlak liggen: hier wél als paren, naast elkaar. Dan gaan de paren uit elkaar. Hoeveel chromosomen heeft elke cel na meiose één? Wat denk je?
[VRAAG] q23 (a) 46 · (b) 23 · (c) 92

`~` **s24** (s24) — B9: 'Drieëntwintig.' → hele zin; eicel zoals in Chromosomen 2.1 (laatste stap bij de bevruchting); 'sterven af' → 'gaan te gronde'
Na meiose één heeft elke cel drieëntwintig chromosomen: van elk paar één, elk nog met twee chromatiden. Het halveren gebeurt dus al in meiose één. In meiose twee gaan de chromatiden uit elkaar, net als bij de mitose. Bij een man ontstaan zo vier zaadcellen. Bij een vrouw verloopt de deling scheef, en de laatste stap gebeurt pas bij de bevruchting. Er ontstaat één grote eicel. De andere cellen zijn klein en gaan te gronde.

[EXTRA-START]
`~` **x01** (x01) — herschreven met Noors familie (vaste rollen, ROLLEN.md); getallenreeks 7 mln → 1–2 mln weg (staat in Geslachtsorganen en puberteit); vraag op Linda's leeftijd
Hoe lang duurt de meiose van een eicel eigenlijk? Zaadcellen worden vanaf de puberteit elke dag nieuw gemaakt. Bij een vrouw begint de meiose al vóór haar geboorte. Neem Linda, de moeder van Noor. Toen oma Ria zwanger was van Linda, begonnen in Linda's eierstokken de voorlopers van eicellen aan meiose één. Na de crossing-over stopten ze: zo'n cel heet een oöcyt. Linda was zevenentwintig toen er een eicel vrijkwam waaruit Noor zou groeien. Hoe lang heeft de meiose van die eicel stilgestaan? Wat denk je?
[VRAAG] xq (a) vier weken: één cyclus · (b) zo'n veertien jaar: sinds haar puberteit · (c) ruim zevenentwintig jaar: sinds vóór haar geboorte

`~` **x02** (x02) — B9: begint niet met het korte antwoord; 'Daarom' → 'Dat is waarschijnlijk een belangrijke reden' (bron: voorgestelde oorzaak); 'Wordt de eicel niet bevrucht …' weg (lengte)
Die eicel stond ruim zevenentwintig jaar stil: sinds vóór Linda's eigen geboorte. Vlak voor de eisprong maakt één oöcyt meiose één af, met een klein poollichaampje ernaast. Daarna stopt hij opnieuw, in meiose twee. Pas als een zaadcel binnendringt, maakt hij de meiose af. Al die jaren houden eiwitringen, cohesine, de chromosomen bij elkaar. Die slijten langzaam. Dat is waarschijnlijk een belangrijke reden dat bij oudere moeders chromosomen vaker niet goed uit elkaar gaan. Terug naar de hoofdlijn.
[EXTRA-END]

`=` **s25** (s25)
In de grafiek: het DNA gaat van p naar twee p, na meiose één terug naar p, en na meiose twee naar een half p.

`~` **s26** (s26) — crossing-over staat nu in s23; hier alleen nog het gevolg
Welk chromosoom van een paar naar welke kant gaat, is toeval. Met drieëntwintig paren geeft dat twee tot de macht drieëntwintig combinaties: zo'n acht miljoen. En door crossing-over zijn veel chromosomen ook nog een nieuwe mengeling van vaderskant en moederskant. Daarom verschilt bijna elke geslachtscel van een persoon van de andere. Bij de bevruchting komen n en n samen: weer twee n, zesenveertig.

`~` **v02** (v02) — korter (± 49 → ± 42 s); 'Dat komt door de meiose, en door het toeval …' weg (staat in s26). Beeld: Rachid en Linda met Noor en Teun (verschillen van elkaar)
Zo werkt geslachtelijke voortplanting. Twee ouders maken door meiose haploïde geslachtscellen. Bij de bevruchting versmelten een zaadcel en een eicel tot een zygote. Die is weer diploïd. De nakomelingen verschillen genetisch van hun ouders, en van elkaar. Ongeslachtelijke voortplanting gaat snel, en er is geen partner nodig. Maar alle nakomelingen zijn gelijk. Komt er een nieuwe ziekte, dan kunnen ze allemaal tegelijk sterven. Geslachtelijke voortplanting gaat trager. Maar door de variatie is de kans groter dat sommige nakomelingen overleven als de omgeving verandert.

## Hoofdstuk 6 — Mitose en meiose naast elkaar [Schema]
`=` **s27** (s27)
Zet de mitose en de twee delingen van de meiose naast elkaar. Bij welke deling liggen homologe chromosomen als paren in het equatorvlak? Wat denk je?
[VRAAG] q28 (a) mitose · (b) meiose één · (c) meiose twee

`~` **s29** (s29) — B9: 'Alleen bij meiose één.' → hele zin; 'los' → 'elk voor zich'
Alleen bij meiose één liggen homologe chromosomen als paren in het equatorvlak. Bij de mitose en bij meiose twee liggen de chromosomen elk voor zich, met twee chromatiden. Mitose: één deling, twee dochtercellen, diploïd, genetisch gelijk. Voor groei, herstel en vervanging. Meiose: twee delingen, geslachtscellen, haploïd, genetisch verschillend. Voor de voortplanting. Meiose is dus niet gewoon twee keer mitose. In meiose één gaan hele paren uit elkaar, en tussen de twee delingen wordt het DNA niet opnieuw gekopieerd.

[VWO-START]
`~` **s30** (s30) — 'Voor vwo nog één stap: wat als het misgaat?' → 'Soms gaat het mis.' (geen 'voor vwo', geen vraagzin zonder kaart)
Soms gaat het mis. Normaal deelt een cel alleen als het nodig is, en alleen als de controlepunten groen licht geven. Raken door fouten in het DNA meerdere remmen kapot, één voor één in de loop van jaren, dan blijft de cel delen. Zo ontstaat een tumor. Bij kanker dringen die cellen ook andere weefsels binnen. Ook bij de meiose kan het misgaan. Soms gaan de twee chromosomen van een paar, of twee chromatiden, niet uit elkaar. Dat heet non-disjunctie. Dan krijgt de ene geslachtscel een chromosoom te veel, en de andere een te weinig. Een eicel heeft door non-disjunctie vierentwintig chromosomen. Een normale zaadcel bevrucht hem. Hoeveel chromosomen heeft het kind? Wat denk je?
[VRAAG] q31 (a) 45 · (b) 46 · (c) 47

`~` **s32** (s32) — B9: 'Zevenenveertig.' → hele zin
Het kind heeft dan zevenenveertig chromosomen. Is het extra chromosoom nummer eenentwintig, dan heeft het kind drie keer chromosoom eenentwintig. Dat heet trisomie eenentwintig. Het kind heeft dan het syndroom van Down. Terug naar de hoofdlijn.
[VWO-END]

## Recap [Schema]
`~` **s33** (s33) — begint bij de puzzel (B4); 'Een cel deelt om te groeien …' weg (staat op de eindkaart niet, wel in H1 en H6)
Terug naar de vraag van het begin. Een cel verdeelt zijn DNA eerlijk door eerst te kopiëren, in de interfase. Bij de mitose gaan daarna de chromatiden uit elkaar. Zo ontstaan twee dochtercellen met precies hetzelfde DNA: zesenveertig chromosomen. Bij de meiose gaan eerst de paren uit elkaar en dan de chromatiden. Zo ontstaan haploïde geslachtscellen met drieëntwintig chromosomen, bijna allemaal verschillend. Nog één vraag. Een huidcel die niet aan het delen is, en een zaadcel van dezelfde man. Welke heeft meer DNA in de kern? Wat denk je?
[VRAAG] q34 (a) evenveel · (b) de huidcel · (c) de zaadcel

`~` **s35** (s35) — B9: 'De huidcel:' → hele zin
Een huidcel die niet deelt, heeft zesenveertig chromosomen, een zaadcel drieëntwintig. De huidcel heeft dus ongeveer twee keer zoveel DNA.

## Eindkaart
`=` Eerst kopiëren, dan verdelen. · Mitose: twee gelijke dochtercellen, 2n = 46. · Meiose: geslachtscellen, n = 23, steeds een andere combinatie.

---

### Geschrapt
`−` s22 'In meiose één zoeken de homologe chromosomen elkaar op' (teleologie; vervangen in s23).
`−` x01 'tot zo'n zeven miljoen … bij de geboorte nog één tot twee miljoen, in de puberteit zo'n driehonderdduizend' (eicelvoorraad is hoofdthema van Geslachtsorganen en puberteit).
`−` x02 'Wordt de eicel niet bevrucht, dan maakt hij de meiose nooit af.' (lengte).
`−` v01 zoetwaterpoliep en stek; v02 'Dat komt door de meiose, en door het toeval welke zaadcel en welke eicel samenkomen' (staat in s26).

### Vragen (opties ongewijzigd, behalve xq)
q02 b · q07 b · q14 b · q18 b · q23 b · q28 b · eq02 b · xq c (nieuw: 'ruim zevenentwintig jaar', was 'ruim veertig jaar' bij een vrouw van 40) · q31 c · q34 b. Checkvragen op de pagina: ongewijzigd.

### Dekking (leerdoel → niveau → hoofdstuk → vraag)
1 basis → H1 → q02 (indirect), checkvraag 1 · 2 basis → H2 → q07 · 3 basis → H3 → q14 · 4 basis → H4 → q18 · 5 basis → H5 → q23 · 5b basis → v01/v02 → checkvraag (docentdeel) · 6 basis → H6 → q28, q34 · 7 basis/vwo → H2 → q07 / vwo-blok s10 (geen eigen vraag, zoals in 1.4) · 8 basis → s23, s26 → checkvraag · 9 vwo → s30 → q31.

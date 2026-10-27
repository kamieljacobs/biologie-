# Voortplanting — varianten (maker, 27 okt 2026)

Werkmap met per object A.js (en B.js), scene.js, X/Y(/Z).png, sleutel.json, recept.md, bron.md, kenmerken.json.
Renderen: `run.sh <obj>` (server op / + render.py; testpagina h.html laadt lib.js, lib_voeding.js, lib_cast.js, lib_hormonen.js, lib_bio.js en dan de variant).
Geen van deze objecten staat in de README als 'gekeurd'; man/penis/vulva hebben 'wacht op keuring'.

| obj | soort | A | B | bewust níet |
|---|---|---|---|---|
| zaadcelecht | bestaand, hoog | kop min. 8 px los van de schaal, lichte acrosoomkap, kern vaag, koraal middenstuk met ringen | hele cel als één taps lint-silhouet, druppelkop, middenstuk met schuine mitochondriebandjes | WHO-maten niet veranderd |
| eicelecht-follikel | bestaand, hoog | krans = 3 lagen kleine dichte cellen in follikelkleur, zona dun en glazig | stralenkrans als mozaïek van radiaire zuilcellen + losse cumuluscellen | follikel() ongewijzigd (meegeleverd) |
| eierstokdoorsnede | bestaand, hoog | n 160→60 (standaard), kleine primordiale follikels, Graafse follikel bolt de rand op, eisprong = scheur + vocht + eicel met krans, daarna geelLichaam() op dezelfde plek | hele cyclus als klokrondje door de schors (primordiaal → … → wit lichaam), gouden focus volgt groei/eis/geel | callers met eigen n niet aangepast; B toont alle stadia tegelijk (samenvatting, niet één moment) |
| baarmoederwand | bestaand, hoog | oppervlak brokkelt van boven af met bloed, brokjes schuiven langs de wand weg (naar rechts = hals), klieren als buisjes met holte, stroma-kernen | weefselbeeld met cellen (spoelcellen, kernen, cilinderepitheel rond klierholte); functionele laag scheurt in platen die kantelen | geen holte/baarmoedervorm erbij getekend |
| placentadoorsnede-vlokvergroot | bestaand, hoog | ongelijke vlokbomen (0,7–1,2×), niet elke arm hechtvlok, smalle wisselend hoge septa; vlok: moederbloed omhoog + pijlen tegen het kindbloed in, o.inzet = zoomkader | als A maar 3 grote kwabben met elk één volle boom | geen nieuwe vaatanatomie; _plBomen krijgt een eigen cachesleutel |
| mandoorsnede-penisdoorsnede | bestaand, hoog (wacht op keuring) | darm/schaambeen gedimd (o.context, standaard 0,3), romp alleen dunne rand, blaas/prostaat/zaadblaasje in weefselkleuren; penis met tunica albuginea, sinusoïden spleet → rond rood, rugader | alleen organen (geen romp/darm, schaambeen als stippellijn, o.romp zet romp terug), blaas met wand + lumen, urinebuis hol; penis als spons van schotjes | route van de zaadleider en maten niet aangeraakt |
| echobeeld | bestaand, laag | vuistje met gekromde vingertjes en duim, romp loopt uit in de korrel | – | verschil is klein (subtiel op de still) |
| embryoecht | bestaand, middel | kieuwbogen als 3 bolle plooien, hart dieper rood binnen de bult, somietbultjes op de rug, o.week 4–8 (knoppen groeien, vingerstralen, staart/bogen weg) | – | romp zelf morpht niet; week-optie niet tegen een Carnegie-reeks gecontroleerd |
| zaadbaldoorsnede | bestaand, middel | bijbal als kronkelbuis aan de achterkant, zaadleider uit de staart omhoog, kapsel in weefselkleur, lumen als zaadbalWeefsel | – | buisjes niet volledig in zaadbalWeefsel-opbouw (Sertolizuilen) |
| zaadbalweefsel | bestaand, middel | lumen lichter, staartjes zichtbaar; o.focus = één buisje goud, rest 35 % | – | dichtheid kernen niet verlaagd |
| aanleggeslacht | bestaand, middel | sinus kleiner en in weefselkleur; minimale lijndikte ± 2,6 px bij kleine schaal | – | geen aparte miniatuurtekening |
| blastocyste | bestaand, middel | PGT = glazen pipet door opening in de zona met weggezogen cellen; o.hatch 0..1 = zona dunner, scheurt, blastocyste perst zich eruit, lege zona blijft | – | innesteling zelf niet getekend |
| vulvaschema | bestaand, middel (wacht op keuring) | venusheuvel als zachte boog, kleine schaamlippen/openingen groter, o.id = huidkleur uit CAST | – | geen standen toegevoegd |
| zwangerschapstest | bestaand (groep overig), laag | brede getrapte roze waas met donkere frontrand; vlak vóór het venster kleurt de strookrand al | – | tijdschema van urine niet veranderd (bij urine 0,3 zit het front echt nog in de behuizing) |
| eileiderlangs | bestaand, middel | minder en grotere slijmvliesplooien als golvende vingers (weinig zijtakken), trilharen dikker en minder dicht | – | niet geschrapt: de keuze tussen eileiderLangs en eileiderDoorsnede laat ik aan Kamiel (de oude Langs heeft het rijkste recept: lumen(u), ontsteking, litteken met collageen) |
| eileiderdoorsnede | bestaand, middel | littekens als onregelmatige vlek bindweefsel waarin de plooien samengroeien (nauw restkanaal), franjes vertakt en vast aan een trechterkraag, trilharen met metachrone slag (snel naar de baarmoeder), spiervezels dichter bij de isthmus | – | wanddikte zelf niet veranderd (verliep al van dik naar dun) |

## Ronde 2: variant C (27 okt 2026, na OORDEEL.json)

| obj | C gemaakt? | wat |
|---|---|---|
| baarmoederwand | ja (combinatie) | C = B (winnaar, weefselbeeld) + ruwe, gescheurde zijkanten met bloed uit A, bloeddruppels onder de platen, geen gedimde plaat. Dikte 1–7 mm niet aangeduid: kan niet zonder tekst. |
| mandoorsnede-penisdoorsnede | ja (combinatie) | C = A (winnaar) + penisdoorsnede uit B (holten tussen dunne trabekels) + rugslagaders uit A. |
| zaadcelecht | ja (fout) | De beoordelaar zat er half naast: in A zat de (teal) acrosoomkap al vóóraan, maar de witte rest van de kop las als lichte kap achteraan. C: kop paarsgrijs (kern), acrosoom als lichtste kap vooraan met rand, middenstuk duidelijker gesegmenteerd. Bronnen: MeSH 'Acrosome' + LibreTexts. |
| placentadoorsnede-vlokvergroot | ja (fout) | C = B (winnaar) + septa als afgeronde plooien van de basale plaat (niet tot de chorionplaat) + zichtbaardere bloedstraal met pijlpunten. Bronnen: embryology.ch + GLOWM. |
| zaadbaldoorsnede | ja (fout) | C = A + buisjes in alle snijhoeken (rond, schuin, overlangs) + Leydig-groepjes standaard aan (o.leydig 0,7). Bronnen: NTP-atlas (NIH) + McGill-histologie-atlas. |
| embryoecht | ja (fout) | C = A + echte hartbult (buikrand bolt uit, hart erin) en leverbult. Bronnen: UNSW Carnegie 16 + embryology.ch. Voorhersenen/rest niet verder aangepast. |
| echobeeld | nee | Dat het kruis (vierkamerbeeld) niet in een sagittaal profiel hoort, bevestigt alleen ISUOG; een tweede geopende bron zei het niet. Wervelkolom en het ontbreken van benen zijn stijl of uitsnede, geen bevestigde fout. |
| aanleggeslacht | nee | De beoordelaar klopt niet. De indifferente aanleg staat er wel: het grote beeld links heeft man 0 en vrouw 0. De gedifferentieerde beelden zijn de standen man en vrouw. Dat de gonaden in de indifferente fase niet met de buizen verbonden zijn, klopt juist: de verbinding (rete testis → ductuli efferentes) ontstaat pas bij de man (Sadler h. 16, bestaand recept). |

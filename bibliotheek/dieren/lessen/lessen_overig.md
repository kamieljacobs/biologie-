# Lessen tekenronde 2 — vogels, vissen, reptielen, amfibieën, ongewervelden, planten (23 okt 2026)

Bestand: `src/dieren_overig.js` (laadt na teken_evo1..8 en overschrijft). Testvel: `src/tv_overig.js` (`TV_overig`, vellen vogels, pootjes, grote, houdingen, zwemmers, reptielen, planten, klein, insecten). Oud/nieuw naast elkaar: `out/overig_oudnieuw/<vel>.webp` (boven oud, onder nieuw).

## Algemene lessen (kandidaten voor de volgende prompt)

1. **Wat onder de voeten ligt, bepaalt de houding.** Kamiels opmerking over de koolmees ging niet over één vogel. Het probleem was dat elke vogel één vaste pose had, met stokpoten en drie streepjes als tenen. Nieuw is `_zitplek()`: vóór het tekenen kijkt die naar de pixels onder het anker. Een smalle band met achtergrond erboven én eronder is een tak (de dikte wordt gemeten). Ligt er overal iets onder, dan is het grond. Ligt er niets, dan is het lucht. Zo krijgen alle bestaande keyframes vanzelf de goede voeten: tenen om de tak, of plat op de grond. Een expliciete `o.houding` gaat altijd vóór de meting.
2. **Elk dier krijgt een `o.houding`** (aanvulling van Kamiel). Een dier komt nooit meer in één vaste pose uit de bibliotheek. De standaardhouding is wat de oude keyframes verwachtten, zodat er niets verschuift.
3. **Eerst het skelet en de gewrichten, dan de omtrek.** Bij een vogel is alleen de tarsus (het loopbeen) zichtbaar. De 'knie' die naar achter buigt is de hiel. De echte knie en de dij zitten in de veren. De tarsus is dus een taps vlak met schubjes, de hiel zit in de buikveren en de tenen hebben dikte en nagels (`_vPoot`).
4. **Tenen om een tak:** de voet staat op de bovenkant van de tak. De drie voortenen waaieren over de voorkant van de tak naar beneden en de achterteen gaat over de achterkant. De nagels haken onder de tak terug. Bij een dunne tak (dunner dan de teenlengte) is de 'val' van de tenen hooguit de dikte van de tak. Anders krul je in het niets.
5. **Gevouwen vleugel in lagen:** kleine dekveren (schubjes), een band grote dekveren, armpennen met een lichte zoom en lange handpennen (`_vVleugel`). Dat gaf meer verschil dan meer kleur. De vleugelpunt reikt tot ± 1/3 van de staart, de staart ligt in het verlengde van het lijf en een merel zit rechtop (lijf ± 40°).
6. **Lijf op een ruggengraat met een dikteprofiel** (`_zwemLijf`, met profielen `top`/`ond` op u 0..1). Dat werkt voor alles wat langwerpig is (haai, dolfijn, ichthyosaurus, krokodil, hagedis, cichlide). Vinnen en poten worden *op* het lijf vastgezet (`_vin(Z, u, v, …)`), dus ze zweven nooit los, ook niet als het lijf buigt. Een golf door het lijf is dan alleen nog een functie `golf(u)`.
7. **Zwemslag volgt de anatomie.** Een dolfijn slaat op en neer (horizontale staartvin), dus van opzij zie je een golf. Een haai en een ichthyosaurus slaan zijwaarts (verticale staartvin), dus van opzij zie je vooral de staartvin smaller en breder worden. **Niet zeggen:** de beweging in f8 e8s01 ("dolfijn en haai zwemmen met dezelfde golf door het lijf") klopt niet. Dat is juist een mooie convergentie-valkuil voor een vraag.
8. **Bladeren en schijven zitten vast op een knoop.** Bij een blad loopt een bladsteel van de knoop op de tak naar de voet van de bladschijf. De bladhoek staat schuin naar de takpunt (30–70°), aan de kant die de scène vroeg. Bladeren die terug wezen, werden zo omgerekend. `takMetBladeren` geeft de *echte* positie terug, dus rupsOpBlad en de focusringen schuiven vanzelf mee. Bij een opuntia staat elke schijf met een smalle voet op de bovenrand van de vorige (een recursieve boom), nooit los zwevend.
9. **Techniek: kleurhulpen geven hex terug.** `lib_cast.js` overschrijft `_mix` en geeft dan `rgb(...)` terug. Daardoor werden `_dk(_dk(x))` en `rgba(_lt(x), a)` stil **zwart** (de vleugels waren zwarte blokken). In mijn bestand staan `_D`, `_L` en `_A`, die altijd hex/rgba geven. Advies: gebruik die (of herstel `_mix` in lib_cast) in alle tekenbestanden.
10. **Techniek: de laadvolgorde in render.html was willekeurig.** Dynamisch toegevoegde scripts zijn async, dus soms won teken_evo3 van mijn bestand. Ik heb `s.async = false` toegevoegd in `render.html`, zodat de volgorde van `f=` echt geldt. Ook voor de andere tekenaars belangrijk: renders van eerder vandaag kunnen per ongeluk de oude versie tonen.
11. **Vaste maten van scènes respecteren.** sb2 e2s13 rekent de punt van de vinkensnavel zelf uit (kopframe (26, −104), pik 0,6 rad, punt (22 + 2,64·mm, 0,26·mm)). De pijlstaart-tong begint op (44, 2), de borstvin van haai en dolfijn zit op (110, 24) en (120, 30). Die maten zijn behouden. Lees vóór een herziening de sb-bestanden op zulke formules.

Wat niet werkte:
- Een algemene 'kegel'-vleugel zonder lagen zag eruit als een blad.
- Een te slank profiel (haai, krokodil, hagedis eerst 5–8 % hoogte) leest als 'potlood'. Meet de hoogte : lengte: krokodil ± 13 %, hagedis ± 10 %, haai ± 18 %, ichthyosaurus ± 21 %.
- Te veel areolen met drie stekels maakten de opuntia onrustig. Twee stekels in 5 rijen is genoeg.
- Pixels meten werkt niet in een `gedimd()`-laag (lege canvas). Daar valt de vogel terug op 'staan'.

## Per object: opgezocht en wat het verschil maakte

**Zangvogels (grondvink, merel, koolmees, zaadkraker).** Bronnen: [Great tit (Wikipedia)](https://en.wikipedia.org/wiki/Great_tit) (12,5–14 cm; blauwzwarte kop, witte wang, gele borst met zwarte streep, groene rug, witte vleugelstreep, staart met witte buitenpennen), [Common blackbird](https://en.wikipedia.org/wiki/Common_blackbird) (23,5–29 cm, oranjegele snavel en oogring, poten zwartbruin), [Medium ground finch](https://en.wikipedia.org/wiki/Medium_ground_finch) (12,5 cm; bovensnavel altijd langer dan de snavel hoog is; man zwart, vrouw bruin gestreept; foerageert op de grond), [How birds perch](https://scienceinsights.org/how-birds-perch-the-anatomy-and-behavior-of-grip/) (anisodactyl: 3 tenen voor, 1 sterke hallux achter; buigpezen sluiten de tenen passief om de tak; het gewicht houdt de greep vast).
Wat het verschil maakte:
- poten als tarsus met hiel, schubjes en tenen met nagels, gekozen naar de zitplek;
- vleugel in lagen;
- staart in het verlengde van het lijf;
- dijveren in de buikkleur over de bovenkant van de poot;
- merel rechtop.

Houdingen: `tak` (o.takY, o.takDik), `staan`, `pikken` (lijf 0,28 rad voorover), `klampen`, `vliegen` (gespreide vleugels via o.t, poten ingetrokken, lijf horizontaal).

**Pauw / pauwin.** Bron: [Indian peafowl](https://en.wikipedia.org/wiki/Indian_peafowl): man 100–120 cm, sleep tot 2–2,3 m, kuif van kale schachten met blauwgroene waaiertjes, witte streep boven en witte halve maan onder het oog, kastanje handpennen, spoor boven de achterteen. **Niet zeggen:** Wikipedia geeft de pauwin "± 38 cm". Dat is fout, de pauwin is ± 95 cm.
Wat het verschil maakte:
- de sleep in rust sleept met het laatste kwart óp de grond;
- geschubde groene mantel en gebandeerde schouderveren;
- oogvlek met een donkerblauw hartje in plaats van ringen;
- waaier als licht gedraaide halve ellips, met de vleugels hangend.

Houdingen: `rust`, `pronk` (= oude o.waaier), `lopen` (o.t; de voet komt los van de grond tijdens de zwaai). Pauwin: standaard en `lopen`.

**Blauwe reiger (vogel()).** Algemene kennis (90–98 cm, onderste deel van het scheenbeen kaal, lange tenen, zwarte oogstreep met pluim, zwarte vlek op de vleugelboeg, gestreepte voorhals). Verschil: een kaal scheenbeen plus een hiel laag (± 1/6 van de hoogte), lange tenen (middelteen ± 48 eenheden) en sierveren op de borst. Houdingen: `staan`, `lopen`.

**Zwaluw.** Algemene kennis (17–19 cm met staartspiesen, spanwijdte 32–34 cm). Verschil: sikkelvleugels met handpennen, een diepe vork met witte vlekjes, rood voorhoofd en rode keel. Houding: `vliegen`, met vleugelslag via o.t.

**Haai.** Bron: [Grey reef shark](https://en.wikipedia.org/wiki/Grey_reef_shark): lange stompe snuit, groot rond oog, smalle sikkelvormige borstvinnen, hele achterrand van de staartvin breed zwart, tweede rugvin met donkere punt, grijs boven en wit onder. Verschil: de vinnen op het lijf vastgezet op de echte plek (eerste rugvin boven het vrije einde van de borstvin, kieuwspleten boven de borstvin) en een staartvin met een inkeping en een zwarte achterrand.

**Dolfijn.** Algemene kennis. Verschil: een meloen met een duidelijke knik naar het rostrum, het blaasgat bovenop, een mantel/flank/buik in drie tinten en een staartvin die met de slag kantelt.

**Ichthyosaurus.** Bron: [Stenopterygius](https://en.wikipedia.org/wiki/Stenopterygius): 3,5–4 m, snavelvormige snuit met veel tanden, driehoekige rugvin, grote verticale halvemaanvormige staartvin, smallere vinnen dan *Ichthyosaurus*; een fossiel met huid toont tegenschaduw. Verschil: een dieper lijf (± 21 % van de lengte), de wervelkolom zichtbaar naar de onderlob en een scleraalring met 14 plaatjes.

**Krokodil.** Algemene kennis (Nijlkrokodil). Verschil:
- neusknobbel en oogknobbels op het profiel;
- de 4e ondertand buiten de bek;
- een kam van osteodermen op de rug die op de staart groter wordt;
- buikschubben, staartbanden en spleetpupil.

Houdingen: `lopen` (high walk) en `liggen` (buik plat, ellebogen omhoog).

**Hagedis.** Algemene kennis (zandhagedis). Verschil: dikker lijf (± 10 %), een rugband met oogvlekjes (donker met witte kern), een oorgat en vijf lange tenen (4e teen achter het langst). Houdingen: `lopen` (diagonale poten via o.t) en `liggen`.

**Cichlide.** Bestaande recepttekst uit teken_evo6. Verschil: een rugvin over bijna de hele rug (stekels met ingesneden vliezen, achter een punt), buikvinnen die schuin naar achter staan en een golf door het lijf. Houdingen: `zwemmen`, `recht`.

**Kikker, slak.** Algemene kennis. Kikker: de achterpoot in een Z naast het lijf, het masker over het trommelvlies, rugzijlijsten; houdingen `zitten` en `springen`. Slak: een spiraal met sutuurlijn en banden, tentakels met de ogen op de lange punt; houdingen `kruipen` en `ingetrokken`.

**Berkenspanner, rups.** De oude tekeningen waren goed. Ze zijn ingepakt met een houding:
- berkenspanner `vliegen`;
- rups `kruipen`, `lus` en `strekken`.

**Pijlstaart.** Verschil: een behaard borststuk, een groot facetoog en voorpoten die bij het stilhangen naar voren steken. Houdingen: `zweven` (vleugels via o.t) en `rust` (vleugels als een dak naar achter, tong opgerold). Onzeker: de achtervleugelkleur van *Xanthopan* (nu okergele voet). Dit moet nog worden nagekeken.

**Lieveheersbeestje.** Verschil:
- poten in drie segmenten (dij, scheen, voet) uit de borst;
- een zwakke dwarsrichel achteraan (kenmerk van *Harmonia*);
- witte wangvlekken;
- bij het vliegen vliezige achtervleugels.

Houdingen: `lopen` (driepootgang via o.t) en `vliegen`.

**Blad / takMetBladeren.** Verschil:
- bladsteel vanaf een knoop;
- bladhoek naar de takpunt;
- gezaagde rand met tandjes naar de top;
- twee tinten langs de middennerf;
- tak taps toelopend, met lenticellen, okselknoppen en een eindknop.

**Opuntia (boom van Daphne Major).** Bronnen: [Opuntia echios (LLIFLE)](https://llifle.com/Encyclopedia/CACTI/Family/Cactaceae/18107/Opuntia_echios) (boomvormige varianten tot 6–10 m) en [Opuntia, zoeken](https://biorepo.neonscience.org/portal/taxa/index.php?tid=41697). Verschil:
- een stam met schilferende schorsplaten;
- schijven als keten, elk vast op de rand van de vorige;
- areolen in schuine rijen;
- bloemen en vruchten op de randen.

`o.t` laat de schijven heel licht wiegen ("mooier geanimeerd"). De vork op (0, −315) voor het nest blijft.

**Orchidee.** Bronnen: [Angraecum sesquipedale (Wikipedia)](https://en.wikipedia.org/wiki/Angraecum_sesquipedale) (epifyt tot ± 1 m; leerachtige bladeren van 20–40 × 6–8 cm met een tweelobbige top; de spoor zit achteraan de bloem vast, 27–43 cm, gemiddeld 33 cm; dikke grijze luchtwortels) en [Kew, Darwin's orchid](https://www.kew.org/plants/darwins-orchid).
Wat het verschil maakte (Kamiel: "nu lijkt het of de buis losgeknipt is"): de spoor begint nu **achter** de bloem, verborgen achter de lip, en is wijd bij de opening. Verder:
- 3 kelkbladen + 2 kroonbladen als ster, met een groene zweem aan de voet en de punt;
- een schelpvormige lip met kiel;
- het zuiltje en een geribd vruchtbeginsel naar de bloemsteel;
- `orchideeBladeren` als hele plant: epifyt op een bemoste tak met tweerijige riembladeren en luchtwortels.

## Houding per scène (wat de scène vraagt; standaard = automatisch)

| Scène | Dier | Houding |
|---|---|---|
| e2s01, e2s02, e2s24, e2s25 | merel | tak (automatisch gemeten); e2s02 pik 0,35 met rups |
| e2s03, e2s04, e2s07 | grondvink | tak (automatisch) |
| e2s08 | grondvinken bij Daphne Major | vliegen (beweging: "kleine vinken vliegen tussen de struikjes") |
| e2s10, e2s11, e2s13 | grondvink | pik = 1 op de grond (automatisch staan, kop omlaag; o.houding 'pikken' alleen als de snavelformule van e2s13 niet nodig is) |
| e2s04 | opuntia | o.t voor licht wiegen; bloei 1 |
| e3s01 | pauw | lopen (beweging: "stapt van links naar rechts, de sleep schuift over de grond") |
| e3s07 | koolmees | eerst vliegen ("landt"), dan klampen (rot ≠ 0) |
| e3s16, e3s17 | zaadkraker | tak (zegge, automatisch) |
| e3s20 | pauw / pauwin | pronk / staan |
| e3s22 | pauwin / pauwen | lopen / pronk |
| e3s25–e3s29 | orchidee / pijlstaart | zweven met de tong uit (e3s28), rust in e3s29 |
| e6s11 | zwaluw / slak | vliegen / kruipen (stopt bij de weg) |
| e6s20 | kikker | zitten |
| e6s23–e6s26 | cichliden | zwemmen (t) |
| e8s01, e8s02 | dolfijn, haai | zwemmen (t): dolfijn op en neer, haai zijwaarts |
| e8s14, e8q15 | krokodil, hagedis, reiger | liggen of lopen aan de oever / staan (de reiger mag in het water staan) |
| e8s18 | haai, dolfijn | recht (röntgen zet de golf automatisch uit bij de dolfijn) |
| e8s19 | ichthyosaurus | zwemmen ("zwemt in") |
| e1-scènes | lhb | lopen; e1s?? met open = vliegen |

## Nog zwak

- **Orchideeblad:** nog wat schematisch (visgraat).
- **Slakkenhuis:** leest als een platte schijf.
- **Koolmees op de stam:** de pose staat los van de schors in de scène. De stam is face-on getekend, dus een echte klampende mees zou van achter/boven gezien moeten worden.
- **Vliegende zangvogels:** de vleugels zijn eenvoudig (één slagfase).
- **Krokodil:** in e8s14 groot in beeld (de scène plaatst hem zo).
- **Label 'legsel' in e2s04:** valt over de vruchten van de opuntia.

## Ronde 2 (na controle coördinator)

- **Vliegende zangvogel** (`_vOpen`, testvel `vleugel` = 8 slagfasen): de vleugel zit nu met een brede voet aan het lijf, van de schouder tot een punt op de rug. Vanaf de schouder lopen voorrand → pols → punt en terug langs getrapte handpennen en geschulpte armpennen naar die voet. Neerslag: helemaal gespreid. Opslag: pols gevouwen, hand naar achter, dus smaller. Halverwege de slag wijst de vleugel naar de kijker en is hij verkort. Les: een vleugel is pas vast als de omtrek zelf langs het lijf loopt. Een losse waaier op een schouderpunt leest altijd als los.
- **Slak**: het huis staat nu in perspectief. Het bestaat uit windingen die kleiner worden en naar een top links-boven lopen, waarbij een grotere winding vóór een kleinere ligt. Elke winding heeft een naad, banden en groeilijnen. De mondopening zit rechts-onder met een lichte lip. Het lijf komt eronder vandaan: de staart achter het huis, de hals uit de mondopening naar voren.
- **Orchidee**: nieuw `orchideePlant(ctx, x, y, s, o)` op ware schaal (1 eenheid = 1 mm). De bladeren staan als waaier in twee rijen in één vlak (V-vormige bladscheden, dikke onderrand, lagere bladeren hangend en hogere schuiner omhoog). De bloemen zitten in de bladoksels op korte gebogen stelen en de sporen hangen onder de plant uit. `orchideeBladeren` tekent dezelfde waaier. **Advies voor sb3 e3s25**: vervang `orchideeBladeren + lijn(steel) + orchidee` door één `orchideePlant`; de lange losse steel staat in de scène zelf en kan ik niet weghalen.
- **Pijlstaart**: bredere, stevige voorvleugels die bij het zweven schuin naar achter staan (niet als een V omhoog), een dikker behaard borststuk en een dikkere tong. In `rust` liggen de vleugels nu langs het lijf. De draairichting stond fout: positief draait op canvas met de klok mee, dus naar boven.
- **Reptielen groot** (testvel `reptielen_groot`): de hagedis heeft langere, dikkere poten en de elleboog/knie steekt als knobbel opzij uit (lopen: lijf hoger).
- Valkuil: een `//`-commentaar dat je in een functie van één regel plakt, slikt de rest van de regel in. Gebruik daar `/* */`.

## Ronde 3: tekenen naar referentie

**Werkwijze.** Elke referentieplaat (`referentie/zangvogels.webp`, `pauw-pauwin-reiger.webp`, `haai-dolfijn-bultrug-krokodil-hagedis.webp`) is uitgeknipt met een drempel op het kleurverschil met de grijze achtergrond, gevolgd door morfologisch sluiten en een vereenvoudigde contour (OpenCV `approxPolyDP`, 50–290 punten). De contouren staan in `src/ref_overig.js` (`REF_OVERIG`, alleen voor testvellen), met per dier het x-bereik kop–staart (`xr`) en de grondlijn (`yf`).

**Overlay.** Elk dier heeft een overlayvel (`TV_overig.ov_<dier>`):
- de eigen tekening wordt op een lege laag gemeten (bbox);
- de referentiecontour wordt erop geschaald met dezelfde lengte kop–staart en de voeten op dezelfde hoogte (zwemmers en vlucht: zelfde middenlijn);
- de contour staat als gouden stippellijn over de tekening;
- onderaan staan de hoogte/lengte van referentie en tekening.

Zelf uitknippen kost weinig. Pas op voor takken, stammen en grondschaduw die meegeknipt worden. Die heb ik als context in de contour laten staan en niet gebruikt voor de schaal (vandaar `xr`/`yf` met de hand).

**Gemeten verhouding hoogte : lengte** (referentie → mijn tekening vóór → ná):

| Dier | Referentie | Vóór | Ná | Verschil |
|---|---|---|---|---|
| Reiger | 2,02 | 1,31 | 2,12 | Ik tekende een gedrongen rusthouding (lijf horizontaal, hals ingetrokken). De referentie staat rechtop: lijf ± 60°, vleugelpunten en staart achter-onder, hals gestrekt, hiel op ± 0,22 en onderkant van het lijf op ± 0,47 van de hoogte. Dat is nu de standaard; de oude houding blijft als `o.houding: 'rust'`. |
| Pauw met waaier | 1,00 | 0,73 | 0,95 | De waaier is bijna een volle schijf (geen halve ellips), met de onderrand ter hoogte van de buik, de poten eronder, 160 graden meer veren en vijf rijen oogvlekken. |
| Pauw in rust | 0,76 | 0,68 | 0,72 | Hals langer (kop ± 22 eenheden hoger), sleep dikker (bijna zo hoog als het lijf bij de stuit). |
| Vliegende vink, neerslag | 0,59 | 0,45 | 0,60 | De vleugel was te kort en wees naar achter-onder. In de neerslag wijst hij naar vóór-onder en is hij ± 0,8 × de lichaamslengte lang (schouder tot punt), met een brede armvleugel. |
| Dolfijn | 0,34 | 0,34 | 0,38 | De verhouding klopte, maar het lijf was te slank vóór de rugvin en de meloen te laag. Nu is het lijf dieper, met een grotere sikkelvormige rugvin halverwege (u 0,5). |
| Krokodil | 0,23 | 0,21 | 0,24 | In de hoge loop staat het lijf hoger op langere poten, met een diepere kop. |
| Hagedis | 0,17 | 0,13 | 0,15 | Het lijf was te dun. Nu een dikker lijf en hoger op de poten. |
| Haai | 0,37 | 0,39 | 0,39 | Iets dieper gemaakt. De plaat toont een witte haai, mijn tekening is een grijze rifhaai, dus vinplaatsing volgens de tekstbron (bron wint). |
| Grondvink, merel | 0,76 / 0,63 | 0,74 / 0,62 | — | Klopten op lengte en hoogte. De vink heeft nu een iets hogere buik. |
| Koolmees op tak | 0,94 | 0,67 | — | Niet te vergelijken: de schuine tak zit in de contour. |

**Werkt het overnemen van de contour?** Voor de *maat* zeker: hoogte/lengte en de plaats van kop, poten en staart springen op het overlayvel meteen in het oog, waar mijn oog op een los testvel ze miste (reiger en waaier). De contour zelf heb ik niet als lichaamsvorm overgenomen. Vogels, vissen en reptielen hebben bij mij lagen (vleugel over lijf, vinnen op het lijf) en houdingen. Een vaste omtrek past maar bij één pose en maakt aanhangsels die los of door elkaar lopen. Ijken op de contour en de skeletvorm behouden werkte beter.

**Kruiscontrole.**
- De plaat toont een witte haai in plaats van een rifhaai. Bij de haai wint de tekstbron.
- De pauwin op de plaat is ± 0,85 van de pauw (zonder sleep). Dat klopt met de tekstbron (± 95 cm).
- Nog met de hand na te lopen: het aantal tenen op de AI-platen.

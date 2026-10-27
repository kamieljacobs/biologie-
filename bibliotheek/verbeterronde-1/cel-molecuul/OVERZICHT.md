# Groep cel-molecuul: overzicht varianten (27 okt 2026)

Alles is bestaand (geen nieuwe objecten). Per map: A.js (/B.js), X/Y(/Z).png, sleutel.json, recept.md, bron.md, kenmerken.json, scene.js (de opstelling van de stills). Renderen: `./run.sh <obj>` (harness.html laadt lib.js, lib_voeding.js, lib_hormonen.js en lib_bio.js, daarna de variant; `repo` is een symlink naar de repo). Niets in de repo gewijzigd.

| obj (map) | soort | A: aanpak | B: aanpak | bewust níet gedaan |
|---|---|---|---|---|
| celrond (ook membraanboog-celrond) | bestaand, hoog | volle cel: ER met ribosomen, golgi, 8 mito's, lysosomen, blaasjes, cytoskelet; membraandikte en detail schalen met r (fosfolipiden vanaf r ≥ 150, daaronder dubbele lijn); s volgt automatisch uit r; ankerpunten | 'levende cel': membraan altijd als gladde dubbele lijn met eiwitten, organellen als rustige silhouetten, `focus` geeft één onderdeel detail, `versmelt` = exocytose waarbij het membraan echt opengaat | geen celdeling- of endocytosestand |
| membraanboog | bestaand, middel | t = golving en schuivende koppen; eiwit als bundel helixstaafjes; `{soort:'kanaal', open}` met porie | — | geen glycocalyx/suikerketens |
| eiwitvouw | bestaand, hoog | doelvorm schaalt naar elke n; helix als lussen (tussenpunten, voor/achter); haarspeld met H-bruggen; `kleur:'eiwit'` | twee fasen: eerst helices in een uitgestrekte keten, daarna kluwen in het enzymsilhouet met gouden holte | geen suikerketens die vastgemaakt worden |
| enzymkluwen | bestaand, hoog | kralenketen in serpentine door het silhouet, twee helixstukken, holte met lip die dichtdraait, geeft `plek` terug | lintmodel (helixveren, β-pijlen, lussen) met standen `bind`/`knip` en eigen substraat | oude kleuraanroepen ongewijzigd; geen 3D |
| zetmeelspiraal | bestaand, laag | doorlopende schroeflijn achter dun/donker en voor dik/licht; ringen in diepte | — | geen vertakte optie (amylopectine) |
| cellulosebundel | bestaand, middel | oker glucose (zelfde als zetmeel) in een groene vezelrand, brugje wisselt boven/onder (β-1,4), dikke H-bruggen, `glijd` (enzym glijdt af), geeft ringposities terug | — | geen knipstand |
| rodebloedcel (+bloedvat) | bestaand, laag | geen lichte streep in het vat; zijaanzicht als halterprofiel (Evans-Fung); haarvat: ronde parachute ± vatbreed | — | vatwand zelf ongewijzigd |
| zenuwcel | bestaand, middel | `myeline` (worstjes + knopen), impuls als vlak gouden bandje dat van knoop naar knoop springt, axongolving gehalveerd | — | geen type motorisch/sensorisch (overlap met groep weefsel) |
| vetcel | bestaand, laag | druppel van de kern af geschoven (dun randje, dikker bij de kern), `vol` 0..1 | — | vetweefsel niet aangeraakt (groep weefsel) |
| bacteriecel (+bacteriegroot, bacteriecel-bacteriegroot) | bestaand, hoog | één `bacterie()` + oude aanroepen als omhulsel; DNA paars als losse lus, ribosomen klein C.ribo, één wandkleur (oker) | zelfde maar EM-achtig: vezelige nucleoïde, polysomen, fimbriae, flagel met haak | lokale bacterieGroot-varianten in films (andere aanroep) niet aangepast |
| thelpercel-hivvirus (+hivvirus) | bestaand, middel | T-cel neutraal, CD4 in enzymgrijs (goud bij binden, `bindAn`), `geinfecteerd`, `sterft`; hiv: RNA paars, fusie op een stuk membraan in dezelfde aanroep | — | CD4 niet als Y-vorm (CD4 is geen Y) |
| gonokok-chlamydiacel-spirocheet | bestaand, laag | spirocheet als kurkentrekker met voor/achter; insluitsel met dubbele rand, EB's en RB's, cel barst open; schaalnotitie in recept | — | gonokok ongewijzigd |
| hormdeeltje | bestaand, hoog | structuurvormen: steroïdskelet (3 zesringen + vijfring, =O vs aromatische ring), GnRH 10 kralen, FSH/LH als α+β-kluwens met suikertakjes | gevulde silhouetten die op 9 px nog verschillen (ringblok met gaten, rups, twee lobben + antennes) | kleuren niet gewijzigd |
| kopstand-actinedetail-reticulum | bestaand, hoog | chip zonder tag() (eigen pil), actine als dubbele bolletjesstreng, tropomyosine in de groef, reticulum als buisnet met triaden om de fibril, calcium | actine als gedraaid touw, reticulum als kous (achterkant gedimd, T-buisje van boven), stuk fibril zonder kous | sarcomeer/myofibril niet aangepast |

## Ronde 2 (27 okt 2026): C-varianten na OORDEEL.json

| obj | C: aanpak | let op |
|---|---|---|
| celrond | A (winnaar) + exocytose uit B: blaasje loopt van de golgi naar het membraan, het membraan opent en het blaasjesmembraan wordt een kuiltje ín het membraan dat vlak trekt; inhoud naar buiten. Opties `versmelt`, `exoAn` | het blaasje komt nooit buiten het membraan |
| enzymkluwen | kralenketen uit A + helixveren en een β-plaat (twee pijlen met H-bruggen) uit B; holte dieper en rond, lippen draaien symmetrisch dicht en buigen om het substraat; standen `bind` (open → dicht), `knip` 0–0,5 (knipt) en 0,5–1 (holte gaat open, stukken laten los); substraat tekent de functie zelf (`sub`). Stills met `sceneC.js` (zelfde uitsnede, substraat via de functie) | OORDEEL noemt Y (= oud) de winnaar, maar de tekst bij Y ('keten van kralen met sprieten') beschrijft A (= X). Ik ben uitgegaan van A als winnaar |
| thelpercel-hivvirus | A (winnaar) + groene CD4-receptoren uit de oude versie (goud bij binding); stervende cel minder vaag | — |
| zetmeelspiraal | nieuwe opbouw: schuin aanzicht van een schroef; de keten is een doorlopende band, achter de as dun en donker, vóór de as dik en licht eroverheen; ringen kleiner zodat de band zichtbaar blijft; ringzuurstof als stipje | leest beter als veer, maar met 6 ringen per winding blijft het druk |
| hormdeeltje | A (winnaar) met FSH en LH als twee gevouwen ketens (α grijsblauw-getint + β in hormoonkleur) in de vorm van eiwitVouw A (helix als lussen, haarspeld), suikertakjes vast aan de keten; FSH-β langer met twee suikers, LH-β compact met één; op filmgrootte alleen de hartlijn | — |

Stijl t.o.v. genregulatie: hun `_grKluwen` is een doorlopende buis (lintmodel) met helixveren en β-pijlen; onze eiwitten (eiwitVouw A, enzymKluwen C, FSH/LH in hormDeeltje C) zijn een kralenketen met helixlussen. Het helix- en pijldeel van enzymKluwen C lijkt op hun lint, de rest niet. Eén taal kiezen voor de hele bank (kralen óf buis) is een keuze voor Kamiel/de coördinator.

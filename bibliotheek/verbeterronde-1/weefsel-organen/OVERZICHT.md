# Groep weefsel-organen — overzicht varianten (27 okt 2026)

Werkmap-hulpmiddelen: `page.html` + `render.py` + `run.sh <obj>` (rendert X/Y/Z volgens sleutel.json), `mksleutel.py`, `extract.py`, `_oud/` (oude functies uit lib_bio.js). Elke A/B.js overschrijft alleen de genoemde functies; oude aanroepen blijven werken.

| Object | Soort | A | B | Bewust níet gedaan |
|---|---|---|---|---|
| hypofysepoort | bestaand, hoog | Hypothalamus als koepel van de tussenhersenen (thalamus, groeve, 3e hersenkamer als trechter in het steeltje, corpus mamillare achter, oogzenuwkruising vóór); Turks zadel als massief bot met wiggenbeenholte; uitgaande ader opzij i.p.v. door het bot | Zelfde anatomie in een gouden zoomcirkel die tot de rand vol weefsel is (`o.venster`, standaard aan) | Geen gyri of hele hersenen; cellen/poortaders ongewijzigd |
| armmodel | bestaand, hoog | Eigen trekpijl `_armPijl` (geen ReferenceError meer) | Geen pijl: getrokken touw kleurt, wordt dikker, ring schuift omhoog met bewegingsstreepjes | Geen hand/personage die trekt |
| hoofdhersenen | bestaand | Dubbele randcontour (windingen) + vaste groeven van het middenvlak (gordel, centrale kerf, wand-/achterhoofd, vogelspoor); oog weg, tong + gehemelte; klein = gloeipunt | – | Geen gezicht/personage (zoomcirkel blijft de afspraak) |
| levervoor | bestaand, laag | Omtrek = AN_LEVER (één bron met liver()), inkeping met ronde leverband, galblaasbodem onder de rand, strook i.p.v. glansovaal, ankerpunten | – | Niet echt samengevoegd met lib_anatomie (alleen de vorm gedeeld) |
| darmwand | bestaand | Vlokken met haarvatlus, chylvat, cilindercellen/borstelzoom (groot), crypten; dikkere lagen; vlokken bewegen mee met knijpen | – | Geen plooien van Kerckring |
| nierbijnier | bestaand, laag | Kapsel, lichtere schors met korrels, piramides met strepen en kelkjes naar het bekken, gebogen vaten, `urine`, `glowSchors`/`glowMerg` | – | Geen grote kelken apart; 7 i.p.v. 10–16 piramides |
| bloedvat-rodebloedcel | bestaand | `wand: 'slagader'|'ader'|'haarvat'` met spierlaag/endotheel; haarvat met parachutecellen één voor één | – | rodeBloedcel zelf ongewijzigd |
| vetcel-vetweefsel | bestaand (alleen weefsel) | Eigen onregelmatige celverdeling, cytoplasmarandje met mitochondriën, `vul` 0..1 (slinken) | – | vetcel() niet aangeraakt (andere helper) |
| spiervezel-spierbundel | bestaand | A/I/H/Z-banden in twee tinten, golvende cilindervezels, `c` (alleen I-band korter, vezel dikker), bundel in perimysium met haarvat | – | Geen dwarsdoorsnede hier (zit in spierDwars) |
| huiddoorsnede | bestaand, **gekeurd** | Alleen echte fout: bij < 2,2 px/µm vlakke lagen i.p.v. korrel; haarvatlus met donker lumen en losse cellen | – | Detailbeeld (um ≤ 500) ongewijzigd |
| gewricht/bot/botweefsel | bestaand | Kom als holle schaal aan de hals van het schouderblad (blad als uitsnede, compacte rand, labrum), banden met aanhechting; pijpbeen 1:8 | – | botWeefsel ongewijzigd; 1:8 niet met een bron gecontroleerd |
| sarcomeer-myofibril | bestaand | Myosinekop = nek + gebogen hamertje; myofibril met A/H/M/I/Z-banden | – | Z-lijn-zigzag gelaten |
| spierdwars/eenheidzenuw/spierspoeltje | bestaand | Bundels met bindweefselschotten + epimysium (punten(j) blijven kloppen); spoeltje ín spier tussen gewone vezels, streping alleen aan de uiteinden, kernen in het midden | – | eenheidZenuw ongewijzigd |
| armanatomie | bestaand | Hand van opzij (± 19 cm, duim, nagels), smaller schouderblad met kam, `romp` | – | Geen echte castpersonage-hand (bovenaanzicht past niet van opzij) |
| huidblok | bestaand, **gekeurd** | – (geen variant) | – | Geen echte fout gevonden (testvel-overlap is geen objectfout) |
| onderarm | bestaand, **gekeurd** | – (geen variant) | – | Geen echte fout: vingers zijn al ongelijk, nagels staan erop; 'rood' bewust niet (Kamiel) |

## Ronde 2 (na blinde beoordeling, 27 okt 2026)

C = winnaar + wat het oordeel vroeg; `C.png` met dezelfde scène/uitsnede. OORDEEL.json is niet aangeraakt.

| Object | Winnaar | C |
|---|---|---|
| armanatomie | A | A zonder de losse romplijnen (optie `romp` geschrapt) |
| armmodel | A | A + uit B het getrokken touw strak, dikker, in de kleur van zijn ring; geen streepjes |
| spiervezel-spierbundel | A | A met rustiger strepen (bredere banden, H-zone alleen als hij breed genoeg is, geen rafelrand) + samentrekken echt zichtbaar: in de bundel worden de vezels nu ook dikker (zat er in A niet in: bug), lichte banden smaller, A-band even breed; bronnen Millman 1966 (JCB) + SICB |
| huiddoorsnede | oud | oud (gekeurd) + uit A de haarvatlus met losse rode bloedcellen; lagen in de zoom beter te onderscheiden (basale laag donkerder met hogere kern, korrellaag lichter met duidelijker korrels). De vlakke overzichtsstand uit A is níet overgenomen (verloor) |
| nierbijnier | A | A + urinestand zichtbaar: urineleider als buisje met holte en gele druppels, nierbekken kleurt mee; bijniermerg licht duidelijker apart op |
| spierdwars/spierspoeltje | A | A + per bundel een licht perimysium (omhullende van de vezels) met donker endomysium binnenin |
| vetcel-vetweefsel | A | A + haarvaten volgen de grenzen tussen de cellen (in stukjes waar het pad naar een andere grens springt) |

Kanttekening bij het oordeel: twee 'fouten in alle versies' zaten in A al als optie, maar waren niet zichtbaar genoeg: A had `urine` (bleke druppels op een bleke urineleider) en `c` (in de bundel werden de vezels niet dikker en was het verschil klein). De beoordelaar had dus in de praktijk gelijk; ik heb nergens een C weggelaten. Het haarvat over de vetcellen kwam uit de gedeelde bloedvat-aanroep en zat ook in de oude versie. In de vetweefsel-stills tekent het haarvat met de oude bloedvat() uit de bibliotheek (pijltjesvormige cellen); met bloedvat A worden het parachutecellen.

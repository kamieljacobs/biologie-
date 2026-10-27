# Ronde cel-nieuw — overzicht (27 okt 2026)

Alle objecten zijn nieuw (behoefte.json + celDier); in de stills is telkens ook de oude, eenvoudige versie uit Celorganellen (lib.js) of de oude plantCell meegenomen (X/Y/Z, sleutel.json). De organellen zijn losse functies met één recept; celDier en plantencel roepen ze zelf aan (A-cel met A-organellen, B-cel met B-organellen; signaturen gelijk, dus elke combinatie werkt). Testpagina: `test.html` + `stills.js` + `run.sh` in deze map (laadt lib.js van Celorganellen, lib_voeding.js, lib_bio.js).

| obj | soort | A | B | bewust niet |
|---|---|---|---|---|
| celDier | nieuw | leerboekopbouw naar cel.png: ER vast aan kernenvelop, glad ER erachter, golgi cis→kern, centriolen haaks + microtubulister, 3 exocytoseplekken (animatie, naadloos in het membraan via rFn), `nadruk` dimt de rest tot 35 % | 'een cel is vol': meer en wisselende mitochondriën, glad ER aan twee kanten, actinecortex, peroxisomen, veel blaasjes, 4 exocytoseplekken | geen goudrand/gloed bij nadruk (Part C: geen gloed); geen labels in beeld |
| mitochondrionEcht | nieuw | doorsnede, cristae als ongelijke instulpingen, mtDNA, `deling`, `stoffen` | opengesneden 2,5D met cristae als platen | geen ATP-synthase-knopjes (te klein); kleurverloop |
| ruwER | nieuw | doorsnede om de kern, lumen doorlopend, ribosomen beide kanten, glad-ER-netwerk, polysoom met groeiende keten | schuine bladen (vlak + zijkant) met ribosomen en polysoomspiralen, trappen tussen bladen | geen losse ER-lijnen zonder kern |
| kernEnvelopPorie | nieuw | doorsnede, membranen lopen rond in elkaar over bij poriën, porie-complex, heterochromatine aan de rand, mRNA door porie | bol met poriënringetjes in perspectief, uitgesneden part, mRNA uit porie op de rand | geen aparte inzoom-modus (detail komt vanzelf bij groot) |
| golgiStapel | nieuw | doorsnede, cis lichter, opgezwollen randen, aanvoer + afsnoeren (t) | holle schijven met zijkant en gaatjes, zelfde animatie | geen eigen fusie-animatie aan de cis-kant (blaasje krimpt) |
| blaasjeVersmelt | nieuw | Ω-fusie op een gebogen membraan, inhoud naar buiten, eiwit met suiker eindigt buiten; ook 'endo' en in een cel (rFn, alleenMembraan) | zelfde geometrie met fosfolipiden en SNARE-rits | endocytose is alleen de omgekeerde film (geen clathrine-put) |
| chloroplastEcht | nieuw | doorsnede, grana + schuine stromalamellen, zetmeel, plastoglobuli, DNA, `licht` | opengesneden lens met muntstapels | geen thylakoïdlumen-detail |
| plantencel | nieuw | hoekige cel, wand met middenlamel en plasmodesmata, kern in de rand deukt de vacuole, cytoplasmastroming, plasmolyse | in weefsel (buurcellen), kern in cytoplasmadraden door de vacuole | geen ER/golgi in de rand (te klein op filmmaat) |

Let op voor de bibliotheek: alle functies gebruiken `_mixHex` uit lib_bio.js; celDier/plantencel vereisen de organelfuncties uit dezelfde ronde. Het B-blaasje (lipiden) heeft standaard dikte 11; celDier geeft `dikte: 6` mee zodat het op het celmembraan aansluit.

## Ronde 2 (C.js + C.png; overal won A)

Testset 'C' = C.js waar die bestaat, anders A.js (de winnaars), zodat celDier en plantencel de herstelde organelfuncties zelf gebruiken.

| obj | C: wat veranderd | bewust niet |
|---|---|---|
| ruwER | A als basis met nette, strak gebogen zakken (minder golving, geen fenestratie); ribosomen als koepeltjes vast op de cytoplasmakant (beide vlakken + buitenste kernmembraan), nooit in het lumen; dwarsbalkjes vervangen door zacht uitlopende halsjes; stuk kernenvelop met nucleoplasma, perinucleaire ruimte in de ER-lumenkleur met 3 halsjes; polysoom van 6 ribosomen; nieuwe opties `gap`, `envelop`, `kernVlak`, `aansl` | ribosomen niet als 3D-subeenheden behalve in het polysoom |
| celDier | A als basis; cel ronder (910 × 850, kleine golving); kern eerst, dan ER met `envelop:false` en 6 halsjes op de perinucleaire ruimte (poriën ontweken), die dezelfde kleur krijgt (`tusKleur`); mitochondriën 88–108 lang (± 1/3 kerndiameter), slanker; exocytoseblaasje rv 28, gaat op in het membraan; groene lysosomen blijven | geen nieuwe organellen |
| blaasjeVersmelt | A als basis; standaard R = 420 en span 0,42 R: duidelijk gebogen stuk celmembraan, cytoplasma als ringsector; fosfolipiden pas vanaf s ≥ 2,2 (groot formaat). In een cel (rFn) blijft span rv × 3,4 | geen SNARE (zat in de verliezer) |
| plantencel | A als basis; buurcellen (wand, cytoplasmarand met membraan, stukje vacuole); kern als bol met uitsnede via `kernEnvelopPorie({ bol: true })`; 6 plasmodesmata (in paren) als kanaaltjes door beide wanden met doorlopend membraan en desmotubulus, bij plasmolyse draadjes van protoplast naar wand; korrels iets groter | kern niet in cytoplasmadraden (verliezer) |
| kernEnvelopPorie | alleen C.js (geen eigen still): A en B samen in één functie, `bol: true` kiest de bol; nieuwe optie `tusKleur`. Nodig voor plantencel en celDier | — |

De stills van ronde 2 gebruiken dezelfde schaal als X/Y/Z; bij blaasjeVersmelt is elk vak afgeknipt (het bredere membraan liep anders in de buurvakken).

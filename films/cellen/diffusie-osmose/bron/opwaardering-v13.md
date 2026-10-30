# Beeld-remake 2.0 op prompt v13 — Diffusie en osmose (29 okt 2026)

Brief: `films/OPWAARDEREN-CELLEN.md`. Niets opgenomen, 0 credits. Lijsten voor Kamiel.

## (a) Twijfelscènes (gebouwd, op te keuren)

| Scène | Wat ik koos | Alternatief |
|---|---|---|
| s21 (kern, het 'gaatje') | Het gaatje is een **waterkanaal** (aquaporine, kanaaleiwit uit `membraanBoog`) in de dubbellaag. De stem zegt 'gaatje'; het label is 'gaatje in het membraan · een waterkanaal'. Klopt met de film (s14/s15: water gaat vooral door kanalen) en met Kramer & Myers (een porie die water doorlaat en zout niet). | Een abstracte opening zonder eiwit, zoals in 1.2 (eenvoudiger, maar dan lijkt het membraan een zeef). |
| s21 | 'Lagere druk in de opening' is zichtbaar gemaakt als een **zone met minder watermoleculen** aan de zoute kant van het kanaal (naast de drukmeters en ringen van 1.2). | Alleen de drukmeters, zonder dat het deeltjesveld verandert (zoals 1.2). |
| s12 | Doorlopende zoom van een volle cel (`celRond`, met organellen) naar het membraan. | Een lege celomtrek zoals in 1.2 (rustiger, maar 'een cel is vol' uit C9). |
| s27/s28 | Hemolyse: de cel zwelt bol op, het membraan scheurt en blijft als leeg vlies over terwijl de rode inhoud wegstroomt. | Cel die in stukjes uiteenspat (1.2); klopt minder met wat er gebeurt. |
| alle | K⁺ groen (zoals in de zenuwfilms, brief Regeling 29 okt), Cl⁻ grijsblauw, Na⁺ oker. | K⁺ paars zoals in 1.2 (minder paars is de afspraak van 28 okt). |

## (b) Herinspreeklijst

Geen. Er staan geen castnamen in de stem, geen feitelijke fouten die niet in beeld op te lossen zijn en geen afgekeurde uitspraken.

Wel bekend (niet nodig voor deze remake, alleen ter info): de takes s15 en s32 beginnen met 'Voor vwo …' (BEELDAFSPRAKEN: niet meer zeggen); de speler knipt dat al weg (`vwoCuts`). Opnieuw inspreken hoeft dus niet.

## (c) Vragen over inhoud

1. In s28 zegt de stem 'ongeveer even zout als je bloed' (al genoemd in de review van 1.2, 'KLEIN'). Correcter is 'dezelfde osmotische waarde als je bloed'; in beeld staat nu 'isotonisch: ongeveer even zout als je bloed'. Laten zo, of het label aanpassen naar 'zelfde osmotische waarde als bloed'?
2. Bronnenlogboek: bewering 7 (70 m², badmintonveld) rust nu op het docentdeel en één bron (Ochs e.a.); het oppervlak staat niet in de geopende samenvatting. Graag in je steekproef meenemen.

## (d) Wat er veranderde (één regel per scène)

Zie `info.md` → 'Versie 2.0'.

## Voor de bibliotheek

Nieuwe objecten, getekend in `src/scenes_mol.js` met recept erboven (C9), nog niet in `bibliotheek/lib_bio.js`:

- `h2o`, `waterField` — watermolecuul (geknikt, 104,5°) en een rustig veld ervan.
- `kleurstof` — klein kleurstofmolecuul (twee zesringen), met gouden rand als volgmolecuul.
- `ionMol` — Na⁺, Cl⁻, K⁺ op verhouding, optioneel met watermantel in de juiste oriëntatie.
- `glucoseMol` — zesring met O in de ring en CH₂OH-zijtak.
- `mineraalIon` — mineraal in de bodem.
- `dragerEiwit`, `pompEiwit` — transporteiwitten als kralenhelices die omklappen ('alternating access'); de pomp met een gevouwen ATP-domein (`eiwitVouw`) binnen. Passen in een gat van `membraanBoog` (zie `memH`).
- `bloedcelOsmose` — rode bloedcel die zwelt, krimpt (gekarteld) of hemolyseert, met `rodeBloedcel` als normale stand.
- `memH`, `memV` — `membraanBoog` als horizontaal/verticaal stuk met gaten voor eigen eiwitten en kanalen op een x- of y-positie.

## Frisse beeldreview (30 okt 2026)

Reviewer: Claude (niet de maker), op een eigen bouw uit `bron/src/` (bouwstraat in een werkmap). Contactbladen van alle 24 scènes elke 4 s, gewijzigde scènes daarna elke 2 s; daarnaast een overlapscan van alle tekstvakken (pill, naamBij, metaText, card) elke 0,25 s door de hele film. `?vragen=uit` nagelopen rond alle tien vragen: niets van vraag of antwoord in beeld. Stem, script, takes, woordtijden en ondertitels ongewijzigd, niets geknipt, 0 credits. In `index.html` is alleen het scèneblok vervangen en de rij Longblaasjes in het docentdeel aangepast.

**Wat goed is.** Membranen overal gebogen (`membraanBoog`), cellen rond, niets steekt buiten een celmembraan, geen korrel buiten cellen, geen paars buiten de vwo-balk, moleculen herkenbaar (geknikt H₂O, glucosering, ionen met watermantel in de juiste oriëntatie), geen wijslijnen, castpersonage in de boot, beeld volgt de cue-woorden. De osmose-uitleg (s20–s21) klopt met Kramer & Myers en is te volgen: zout kaatst terug en duwt water van de opening weg, lagere druk in de opening aan de zoute kant (ook zichtbaar als dunner deeltjesveld), drukmeters, dan stroomt het water als geheel door het kanaal.

**Hersteld (duidelijke overtredingen van bestaande regels):**

| Scène | Wat | Regel | Nu |
|---|---|---|---|
| s04 | 'alles beweegt, altijd' en 'biljoenen botsingen' (en de volgende balken) lagen ± 2 s over elkaar; bij de overgang naar koud/warm twee 'warmer = sneller'-balken half over elkaar | één tekstbalk tegelijk | balk weg vóór de volgende komt; één plek voor 'warmer = sneller' |
| s06 | legenda '— LINKS' stond over het begin van de lijn 'links' in de grafiek | label niet over de tekening | legenda rechtsboven in de grafiek |
| s11 | 'allebei door diffusie' over het onderschrift van de zoomcirkel en tegen de ondertitels; label wanddikte 0,0005 mm; '70 m²' op een bron die het oppervlak niet noemt | labels vrij · bronnenlogboek | balk boven de zoomcirkel; 'ongeveer 0,001 mm' en 'samen ± 70–130 m²' (zie `bronnen.md`, Aanpassingen) |
| s12 | 'WATER (BUITEN)' en 'WATER (BINNEN)' half onder de watermoleculen | label leesbaar | waterveld kleiner, labels er net buiten |
| s14 | 'BUITEN' op één regel met 'ZUURSTOF' (las als 'buiten zuurstof') | label bij het onderdeel | 'BUITEN' hoger |
| s15 | metaregel van 'kanaaleiwit' op de fosfolipidekoppen | label niet over de tekening | 40 px hoger |
| s20 | 'klopt …', 'maar niet molecuul voor molecuul', 'het stroomt …' en 'kijk hoe dat komt' faden over elkaar (vier wissels op dezelfde plek) | één tekstbalk tegelijk | volgende balk 0,4 s later |
| s21 | balk 'als door een rietje' viel nog over de kaart 'osmose' | één tekstbalk tegelijk | balk weg vóór de kaart |
| s22 | 'GEWICHT VAN DE KOLOM DUWT TERUG' liep tegen de rechterrand; '1 MOL NACL' (formule in hoofdletters) | label binnen beeld, leesbaar | twee regels; '1 mol keukenzout per liter' (zoals de stem) |
| s25 | label 'rode bloedcel' over de rand van het bekerglas | label niet over de tekening | gecentreerd boven de cel, in het glas |
| s28 | eerste ± 1,5 s leeg scherm onder 'Daar zijn woorden voor' | beeld gevuld op t = 0 | bekerglas staat er meteen, naam 'isotonisch' komt bij 'oplossing' |

**Open (smaak of aanpak, niet veranderd):**

1. s04 begint als een kale deeltjeszee; de overgang uit het glas van s01 is een cirkel die opengaat. Werkt, maar een doorlopende zoom vanaf het glas (C8) zou de schaalsprong sterker maken.
2. s09 'twee keer zo dik': de twee cellen zijn lege ringen; een volle `celRond` (zoals s12) zou consistenter zijn met 'een cel is vol' (C9).
3. s23: het label 'zout water · tussen wand en membraan' staat rechts van de cel, ver van die ruimte; de ruimte is in de kleine cel smal. Eventueel inzoomen op een hoek van de cel.
4. s27: bij 'krimpt en wordt gekarteld' staan ionen, pijlen en de gekartelde cel tegelijk in het rechterglas: net aan de drukke kant.
5. s29 (wortelhaarcel): veel en vrij felle bodemkorrels in het bodemblok (textuur buiten een cel). Kamiel kiest of dat rustiger moet.
6. s31: het kruis over ATP valt over het molecuul en het woord 'energie'. Leesbaar genoeg, kan netter.
7. s35: de nier is een kale ovaal met een hap eruit; `anKidney` bestaat in de beeldbank (Schema-look mag wel).
8. Stem s11 'ongeveer zo groot als een badmintonveld': klopt binnen het bereik van de bronnen, maar is eerder een ondergrens (`bronnen.md` bewering 7). Alleen bij een volgende opname aanpassen (bv. 'minstens een badmintonveld'); niets geknipt.
9. Bewering 16 (hemolyse en crenatie) heeft nog één zelf geopende niveau A-bron; graag in Kamiels steekproef.

Gevonden fouten staan in `films/logboek/fouten.jsonl` (gevonden_door `review`, 30 okt 2026).

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

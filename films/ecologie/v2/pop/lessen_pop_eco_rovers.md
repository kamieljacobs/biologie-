# Lessen: rovers (vos, Canadese lynx) als uitknippop, Ecologie v2 (29 okt 2026)

Bestanden: `src/pop_eco_rovers.js` (rig `RoverPop.maak` = kopie van KatPop uit pop_katten.js + `ECO_ROVER.vos/.lynx` + wrappers `ecoVos`, `ecoLynx`, `vos`, `lynx`),
`src/tv_pop_eco_rovers.js` (`TV_pop_eco_rovers`, 18 vellen incl. `film`), werkmap `pop/rovers/` (overtrek.py = vlakke rij -> vectorpaden, omtrek.py = plaatomtrekken
voor het testvel, joints.py = gewrichtspunten op de plaat tekenen, kopfit.py = close-up-kop -> figuur, dieren_v1.js/dieren_v2.js + bouw.sh = DIEREN-blok, rek.sh,
rk.sh = testvel renderen, peval.py, render_film.py). Hulpbeelden in `out/rovers_werk/`. Renders: `out/dieren_zoog,…,tv_pop_eco_rovers/*.webp`; film `out/film_rovers/rovers.mp4` + `.gif` (10,7 s).
Laden: ná dieren_zoog.js; pop_honden.js erbij laden voor de prooimuis bij 'eten'. Geen bestaand bestand aangepast; `vos`/`lynx` bestonden nog niet in src/.

## Maten en bronnen (tekstbron wint)
| | vos | lynx |
|---|---|---|
| schofthoogte | 38 cm (brief 35-40; bilderreich.de factsheet 35-50) | 52 cm (brief en Wikipedia 'Canada lynx' 48-56) |
| kop-romp | doel ±65 cm (brief 60-75; factsheet 45-90) | doel ±82 cm (wildcatconservation.org 76-106) |
| staart | ±40 cm (brief 35-45; factsheet 30-55,5), witte punt | 5-13 cm, geheel zwarte punt (Wikipedia); pop ±9 cm |
| andere | humerus GL 11,4-13,7 cm, radius 10,7-13,0 (Iliopoulou e.a., Ann. Naturhist. Mus. Wien 120A, bijlage); achtervoet 12-18,5 cm | oorpluimen ±4 cm, poten tot 10 cm breed, achterpoten langer dan voorpoten (rug helt naar voren) |
| K (px/cm, vlakke rij) | 101/38 = 2,66 | 179/52 = 3,44 |
| x-rek (romp) | ×1,12 tussen x 72-158 px | ×1,25 tussen x 75-195 px |
| botten pop (cm) | scapula 9,9 · humerus 11,7 · radius 10,9 · middenhand 4,2 · voet 5,0; femur 13,1 · tibia 15,1 · middenvoet 8,0 · voet 5,3 | scapula 13,3 · humerus 12,5 · radius 15,7 · middenhand 4,2 · voet 7,0; femur 16,3 · tibia 17,1 · middenvoet 8,8 · voet 9,1 |
Gedrag/gang: muizensprong afzet ±40° (±6°), landt met de voorpoten eerst, lijf soms bijna verticaal, prooi met de voorpoten vastgedrukt (D. Henry, via wildlifeonline.me.uk);
sluipen langzaam met kop en staart laag. Stap/draf-fasen en duty: Hildebrand 1965, Maes e.a. 2008 (zoals bij de honden). Lynx-sprint = halve sprong (bounding) met het
gangmodel van de jachtluipaard-galop (Hildebrand 1959), trager en kleiner (S 175 cm, duty 0,28).

## Wat anders was dan bij de wolf
1. **AI-figuren te KORT** (honden waren te lang): vos neus-staartwortel 56 cm i.p.v. ±0,9 × 65; lynx 62 i.p.v. 74. Zelfde x-warp als `krimp` bij de honden, nu met f > 1 (`D.rek`); gewrichten, delen én testvel-omtrek gaan door dezelfde functie.
2. **Rig = KatPop** (3-delige ruggengraat, `klem`, `KOP` als close-up 1:1, overtrek), niet de wolf-rig: nodig voor de buigende sprongen en de lynx-galop. Nieuw: **`SPRONG`** = sleutelstanden
   met per poot óf een grondpunt (IK, staat vast: glijdt niet tijdens hurken/landen) óf vaste hoeken in de lucht, en een parabool voor de wortel in de vluchtfase (`vlucht: {tot, h}`).
   Eenmalige bewegingen klemmen o.t op 0-1 (geen modulo). Grondpunten mogen relatief aan de ruststand (`rust: dx`).
3. **Kop = vlakke close-up rechts op de plaat**, gelijkvormig afgebeeld via een kleinste-kwadratenfit over 5 herkenbare punten (2 oortoppen, oog, neus, mondhoek; `kopfit.py`):
   vos restfout < 1 px, lynx 1-5 px (de pluimen zijn op de figuur korter). Regel uit de katten (anker op herkenbare punten, niet op geschatte gewrichten) werkte meteen.
4. **Vos-poten**: zwarte 'kousen' als extra profiellaag vanaf ±40% van de onderarm/60% van het onderbeen (plaat), voeten zwart, kleine klauwtjes. **Lynx-poten**: dik (dikA 1,18) met
   grote ronde voeten zonder nagels (teruggetrokken) en kleine vlekjes vast op het bot.
5. Eten (vos): geen plaatfiguur; houding gemaakt (kop 108°, nek 58°) met een `muis` uit pop_honden.js onder de snuit; in de film volgt eten direct op de landing (zelfde voeten).

## Wat de platen goed/fout hadden
- Goed: effen achtergrond (omtrek gratis), vlakke rij in 5-7 tonen, kop-close-up bruikbaar 1:1, sluip- en sprongvormen duidelijk.
- Fout/zwak: beide figuren te kort (zie boven); vos-muizensprong op de plaat heeft de rug rond maar de **voorpoten al gevouwen** (dat is het hoogste punt, niet de neerwaartse duik); lynx 'sprint' is
  één gestrekte zweeffase, geen cyclus. De lynx-vlakke rij heeft veel kleine vlekjes en een geschilderde onderrand (rafelig); de grote poten staan in staan scheef uit elkaar (achterpoot ver naar achter).
- De sprongfiguren staan op een andere schaal dan de staande figuur (zie overlay `over_sprong`): alleen als vormcontrole gebruiken.

## Fouten gevonden en hersteld
- Lynx-stap: poot-rek 1,14 (achtervoet haalt de grond niet) -> pas 76 -> 62 cm en romp 1,2 cm lager in de stap (rek 0,997).
- Overgetrokken lijf te druk (donkere tussentoon als blokjes, vos en lynx) -> 'donker' uit romp/nek/schouder/dij/staart weggelaten, vlekgrens strenger (lynx lum 108, min. 10 px²).
- Lynx-romp-zone nam een stuk dijvoorkant mee dat in de stap als losse kwab onder de buik bleef hangen -> zone boven de dij ingekort.
- Vos-schouder/dij eindigden met een rechte snede boven de onderarm -> zones afgerond en de bovenkant van onderarm/onderbeen breder gemaakt (overgang zonder knik).
- Vos-muizensprong: eerst kop omhoog en lijf als plank -> boog met lende als hoogste punt, voorpoten onder de borst gevouwen (plaat), daarna duik met voorpoten eerst (bron).
- Testvel: omtrek-uitlijning 'op de neus' pakte het meest rechtse punt van de omtrek (bij de sprong de oorpunt) -> expliciete neus-pixel; zooms van bewegingen vielen leeg -> volgen het bewegende gewricht;
  sprongstrips lieten de verplaatsing niet zien -> 6 vakken met dezelfde wereldoorsprong en markers voor afzet- en landingsplek.
- Lynx-sluipen: kruis te hoog (rompA 196°) -> 184°.

## Algemene regels (voor de andere families)
- Meet bij elke AI-plaat de lengte/hoogte tegen de tekstbron; de fout kan beide kanten op gaan (honden te lang, rovers te kort). Eén x-warp-functie voor alles.
- Eenmalige bewegingen (sprong, besprong, opstaan) als sleutelstanden met **grondpunten via IK** + parabool voor de vlucht; nooit de wortel lineair door de lucht laten gaan.
- Bij overgetrokken figuren alleen 2-3 tonen houden (basis, licht/wit, zwart/vlekken); de donkere tussentoon van de AI-plaat wordt in vectorvorm blokkerig en onrustig.
- Een uitlijning 'op de neus' altijd met een expliciet punt; het meest rechtse punt van een silhouet is vaak een oor of poot.

## Nog zwak
- **Lynx**: lijfvlekken en de geschilderde onderrand blijven iets hoekig bij sterke vergroting; staan heeft de achterpoten verder onder het lijf dan de plaat (pop rechter, plaat wijder).
  Sprint: de gestrekte zweeffase is minder gestrekt dan de plaatfiguur (voorpoten minder ver vooruit).
- **Vos**: eten is zelf gemaakt (geen plaat); in de draf is de staart iets stijf (één stuk, weinig golf).
- Overgangen in de film: gangen mengen 0,25 s zonder voet-IK (voeten schuiven kort); de sprong begint op de sluipplek, maar de laatste sluippas en het hurken mengen nog lineair.
- Extra plaat die zou helpen: zelfde vos 'eten / prooi vastdrukken' en 'zitten'; lynx 'zitten' en een 4-fasen-bound op dezelfde schaal als de staande figuur.

## Correctieronde 1 (coördinator, 29 okt 2026)
- Vos: witte vlek op de flank weg (alle overgetrokken wit uit romp/dij weg); buik- en borstwit nu één vloeiende vectorvorm in plaats van overgetrokken trapjes.
- Vos-voorpoot: het schouderdeel eindigt bij de borstbodem (elleboog), de onderarm is slanker en oranje gaat via bruin schuin over in zwart (geen horizontale snede). Hetzelfde bij het onderbeen.
- Romp: nieuwe `D.welving` (y-verschuiving per x op romp, nek, schouder, dij en staart: schoft hoger, lende lager) plus `taille` (buik loopt op naar de lies).
- Overtrekker: `glad` (masker vervagen en opnieuw drempelen) en `epsB` geven ronde randen zonder trapjes; `onderY`/`zonder` per toon.
- Lynx: het lijf heeft geen losse vlekjes of streepjes meer (alleen basis plus licht op keel en borst); op elke onderpoot staan 3 zachte vlekken; onderrand en dij zijn rond.
- Lynx: verre poten donkerder (verMix 0,42 naar #2A2726). Sprint: voorpoten reiken verder (am1 V −2,2, nx 32, minder vouwen); de romp zakt iets bij het neerzetten (rek 0,97). Sluipen is minder diep, met een hogere pas.
- Lynx-kop ×1,15 rond het kopmidden.
- Regel: een AI-plaat met veel kleine tekening niet overtrekken, maar alleen de 2-3 grote vlakken houden. Witte vlekken die bij het overtrekken trapjes geven, zelf als vector tekenen.

## Correctieronde 2, alleen lynx (29 okt 2026)
- Achterpoot nieuw gemeten op de vlakke rij: hak hoog en ver naar achter (62, 546 px), middenvoet schuin naar voren. De dij is een met de hand getekende druppel met zachte huid die in de flank overloopt, niet meer de overgetrokken kwab. Vlekjes, knieschijfje en de witte hoek zijn weg.
- Poten zijn één doorlopende vorm in de romptint, met een brede bovenkant onder de schouder- en dijlap. Geen witte strook langs de voorpoot.
- Voeten groot, rond en bol, met een lichte onderrand en twee korte zachte inkepingen.
- Kop in 3-4 tonen: grijs, crème snuit en wang (met de hand), donkere oorrand en pluimen (overgetrokken, alleen boven y 420 px), twee vloeiende wangstrepen. Het oog is gebleven.
- Rug loopt naar achteren licht op (welving: achterhand 1-1,4 cm hoger). Verre achterpoot 3 cm verder naar voren, waardoor beide achtervoeten op de plaatomtrek vallen.
- Regel: een overgetrokken pootdeel van een AI-plaat met veel tekening wordt een losse kwab. Voor de dij werkt een met de hand getekende druppel met zachte huid beter.

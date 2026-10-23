# Lessen: hondachtigen (+ zeehond, muis) als uitknippop (23 okt 2026)

Bestanden: `src/pop_honden.js` (rig `HondPop.maak` = kopie van de katten-rig, per ras een DEF; `ZeehondPop`; `MUIS_DEF`; wrappers `hond`, `zeehond`, `muis`),
`src/tv_pop_honden.js` (`TV_pop_honden`), werkmap `referentie/pop/honden/werk/` (seg.py, contour.py -> contouren_px.json, omtrek_js.py, raster.py, peval.py,
rek.sh = rek per gang/houding, rk.sh = testvel renderen, render_film.py). Renders `out/pop/honden/testvel/`, film `out/pop/honden/honden.mp4` + `honden.gif` (11,2 s).
Laden: ná dieren_zoog.js (en wolf_pop.js voor e4s22). wolf_pop.js, dieren_*.js, sb*, teken_evo* niet aangepast.

## Maten (stijlplaat -> rasstandaard; bij strijd wint de standaard)
| ras | schofthoogte (bron) | K px/cm | plaat-lengte/hoogte | standaard | ingreep |
|---|---|---|---|---|---|
| Duitse herder | 62 cm (FCI 166: reu 60-65) | 153/62 | 1,23 | romp 10-17% langer dan hoog; borstdiepte 45-48%; kop ±40% H; kruis ±23° | krimp 0,89 (x 140-250 px); kop 25 cm |
| teckel | 23 cm (FCI 148 geeft geen hoogte; gangbaar 20-27) | 90/23 | 1,86 | bodemvrijheid ±1/3 H (plaat 0,30), lengte 1,7-1,8 H, borstomtrek ±35 cm | krimp 0,94 |
| mops | 29 cm (FCI 253: geen hoogte; 6,3-8,1 kg) | 119/29 | 1,33 | 'decidedly square and cobby' | krimp 0,74 (pop ±1,12 incl. ronde voorborst en billen) |
| chihuahua | 20 cm (FCI 218: 1,5-2,5 kg; gangbaar 15-23) | 89/20 | 1,34 | iets langer dan hoog, appelkop, steile stop | krimp 0,8 |
Bronnen: gsdcp.org (FCI-standaard herder), zooclub.ru (FCI 148 teckel), fci.be 253g09 (mops), Wikipedia Chihuahua (FCI-gewicht, appelkop, oren).
Schalen onderling = oude hond() (62/23/29/20 cm) en wolf 80 cm: e4s22 klopt op schaal. De realistische plaat (honden.webp) overdrijft de kleine rassen (teckel 0,46 i.p.v. 0,37 van de herder).

## Wat anders was dan bij de wolf/katten
1. **Alle vier de AI-honden zijn te lang** (1,23-1,86 x H). Opgelost met `krimp: [xa, xb, f]`: het lijf tussen twee x-waarden op de plaat wordt in x samengedrukt vóór de omzetting naar cm; gewrichten, delen én de testvel-omtrek gaan door dezelfde functie, dus alles blijft passen. Let op: links +d/2, rechts −d/2 schuiven (eerste versie had een sprong).
2. **Bemonsteringsstap per dier** (`stap`): de katten-rig had 0,7 cm vast; bij een muis (oor 1,5 cm) werden alle vormen veelhoeken. Nu herder 0,5, teckel/mops 0,25, chihuahua 0,2, muis 0,05 cm; ook `klipGrond` (marge onder de grond bij zitten) per dier.
3. **Draf** = dezelfde stap-functie met diagonale fasen (A 0 · VF 0,02 · AF 0,5 · V 0,52), duty 0,44 en de draf-sleutelkrommen van de wolf; stap duty 0,66. S per ras naar de beenlengte (herder 72/108, teckel 22/32, mops 26/38, chihuahua 18/30, muis 3,6/5,5 cm); zwaaihoogte laag bij korte poten (mops-draf met 4,6 cm leek steigeren).
4. **Valkuil in de katten-rig**: `G.A` is zowel romphoeken als sleutelkrommen van de achterpoot (dubbele sleutel in een object; de laatste wint stil). Romp/kop/staart per gang heet nu `G.romp`.
5. **Krulstaart mops** als vast deel `krul` op rompA (basis + lichte binnenkant + spiraallijn), geen buis; `krul` zit in de tekenvolgorde na de nabije dij.
6. Teckel: staartwortel moest dieper in de romp (anders puntje boven het kruis, net als bij de katten). Hangoor als één deel aan de kop; geen oorF.
7. Zitten met `autoZit` (heuphoogte ±0,17 H); bij de teckel haalt de korte voorpoot de grond pas bij een vlakkere romp (rv tot −6°); de plaat toont hem rechter, dat kan niet met deze botlengtes.

## Zeehond (eigen ruggengraat-rig, geen plaat)
- Keten van 12 gewrichten (neus -> staart), omtrek elk frame uit een profiel (boven/onder per s, Catmull-Rom; lineair/smoothstep gaf golven in de buik). Toonbanden en vlekken in (s, v), dus ze buigen mee.
- **Liggen**: kop en hals omhoog; de laagste buikrand wordt op de grond gezet en 1,6 cm 'platgedrukt' (weggeknipt). **Rupsen**: bult in de lende die groeit (borst ligt vast) en weer verdwijnt (bekken ligt vast); per cyclus `ZeehondPop.vooruit()` cm vooruit, steunpunten glijden niet. **Zwemmen**: zijwaartse slag van het achterlijf van opzij = verkorting cos(yaw) + achterflippers die om beurten spreiden (Fish e.a. 1988), voorflippers tegen het lijf.
- Maat: oude tekening 414 eenheden -> px/cm = s·414/159; anker midden onder het lijf. sb7 (e7q28, e7s35) gecontroleerd.

## Muis (HondPop met gewrichten direct in cm)
Bosmuis kop-romp 10,2, staart 9,5 cm; lange semi-plantigrade achtervoet; houdingen staan, lopen, draven, zitten, rechtop (voorpootjes los voor de borst). Oude aanroep muis(ctx, x, y, s) = s px/cm; e6s11 gecontroleerd.

## Algemene regels
- Meet de lengte/hoogte-verhouding van elke AI-plaat tegen de rasstandaard vóór het tekenen; corrigeer met een x-warp i.p.v. de delen opnieuw te tekenen.
- De vormstap moet met de diergrootte meeschalen (vaste stap in cm = veelhoeken bij kleine dieren).
- Geen dubbele sleutels in gang-objecten (lint/assert).
- Een rek-overzicht per gang (`rek.sh`) vóór het kijken: chihuahua-stap stond op 1,01 en de teckel-zit op 1,03 (voorpoot te kort).

## Nog zwak
- **Herder liggen** en **teckel zitten** niet tegen een plaat met dezelfde schaal gecontroleerd (de plaatfiguren in rij 2 zijn 3-20% groter dan rij 1); de teckel zit vlakker dan op de plaat.
- **Mops**: zittende krulstaart belandt laag tegen de grond; rugtint is een vlak.
- **Zeehond**: hoofdzakelijk uit tekstbronnen; achterflippers lezen in lig als visstaart; vlekken generiek. **Muis**: rechtop-staart valt grotendeels weg in de grondclip.
- Film: overgangen staan->zitten mengen hoeken zonder voet-IK (voeten schuiven kort), wissels tussen gangen zijn knippen.
- Een **plaat had geholpen** voor zeehond (zijaanzicht liggend, rupsfasen, zwemmend met gespreide achterflipper) en muis (modelblad + rechtop); ook een draf/zit-modelblad per hond op dezelfde schaal als het staande dier.

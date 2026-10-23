# Lessen: reptielen (nijlkrokodil, zandhagedis) en chimpansee als uitknippop (23 okt 2026)

Bestanden: `src/pop_rept_chimp.js` (naamruimte `PopRC` met twee rigs: `PopRC.reptiel` en `PopRC.aap`; defs `REPT_KROK_DEF`, `REPT_HAG_DEF`, `CHIMP_DEF`; objecten `REPT.krokodil`, `REPT.hagedis`, `CHIMPPOP`; wrappers `krokodil()`, `hagedis()`, `chimp()`), `src/tv_pop_rept_chimp.js` (`TV_pop_rept_chimp`, incl. `film`). Werkmap `referentie/pop/reptielen/werk/` (omtrek.py -> omtrek.json, omtrek_js.py, rk.sh = testvel renderen, render_film.py) en `referentie/pop/chimp/werk/` (rastercrops). Renders: `out/pop/rept_chimp/testvel/`, scènes `out/pop/rept_chimp/scenes/` (sb8: e8s09, e8s10, e8s11, e8s14, e8s16, e8s17), film `out/pop/rept_chimp/rept_chimp.mp4` + `.gif` (10,5 s).

**Laadvolgorde**: `src/sb8.js` definieert een eigen `chimp()` die alle andere overschrijft. Laad `pop_rept_chimp` ná sb8 (rk.sh en render_film.py doen dat); de `chimp` in sb8.js moet nog weg.

## Maten (plaat + tekstbron; bij strijd wint de tekst)
| dier | plaat | maat | bron / controle |
|---|---|---|---|
| krokodil | stap.png fase 1, K = 318 px / 400 cm | lijfprofiel uit de plaat (boven/onder per 10–30 cm); heup 59, schouder 47 cm | Iijima e.a. 2021 (JEB 224:jeb242990, alligator): achterpoot ±63 % presacraal, femur ±43 % daarvan; heup hoger dan schouder bij grote dieren; duty 0,67 (voor) / 0,76 (achter); walking trot / diagonale koppels, fase ±0,5 |
| krokodil | | dij 38, onderbeen 30, mt 17; bovenarm 34, onderarm 22, hand 10 cm | met 32/21 schoot de voorpoot bij het neerzetten te ver (rek > 1): bovenarm verlengd én schoudergordel ±7 cm mee laten schuiven (Baier e.a., alligator: borstbeen/schoudergordel vergroten de pas in de high walk) |
| zandhagedis | stap.png fase 1, K = 202 px / 8 cm kop-romp | kop-romp 8 cm, staart 12 cm (1,5x) | Acta Herpetologica 5(1) 2010: kop-romp volw. 69–74 mm. **De plaat had de staart te kort (0,9x kop-romp)**: staart verlengd. Lijfhoogtes gemeten per kolom op het masker (top 2,3 cm, buik 0,9 cm) |
| zandhagedis | | dij 1,45, onderbeen 1,3, mt 0,55, 4e teen 1,15 (langste); bovenarm 1,2, onderarm 1,05 cm | achterpoot ±0,5x kop-romp; met kortere poten en S = 7 cm was bijna elke fase overrekt |
| chimpansee | houdingen.png, K = 2,07 px/cm (hoogte knokkelstand 88 cm) | humerus 29,3, radius 27,2, femur 29,0, tibia 24,4 cm -> IMI 1,06 | Gombe/P. troglodytes (n = 50), 1989 Primates; Wikipedia IMI 106 (100–114). **De plaat had de onderarm langer dan de bovenarm**: tekst wint |
| chimpansee | | romp heup->schouder 46 cm, schouder 62 / heup 50 cm in knokkelstand | plaat 59/56 cm; diepte romp ±38 cm met vacht |

## Wat per dier anders was dan bij de wolf
1. **Reptielen in 3D, getekend als projectie.** De S-buiging van een reptiel is zijwaarts en de poten staan opzij: in een 2D-zijaanzicht-rig is dat niet te maken. De ruggengraat is nu een kromme in 3D (zijwaartse hoek phi(s) geïntegreerd vanaf het rompmidden), poten via 3D-IK met een pool naar buiten/boven (knie) en buiten/achter (elleboog); tekenen = projectie. Van opzij bewegen de poten dan vanzelf vooral op en neer en voor/achter, de dij wijst naar de kijker (korte, ronde vorm) en de staartpunt schuift mee als de staart zwaait. Het bovenaanzicht (`o.boven`) is gratis en toont de S-golf; dat werd de controle tegen de bovenaanzichten van de plaat.
2. **Golf**: romp = staande golf (gordels draaien tegengesteld: nabije schouder het verst naar voren bij het neerzetten van de nabije voorpoot, idem heup), staart = lopende golf (amplitude groeit naar de punt, 0,55–0,7 golflengte). Krokodil 11/12/16°, hagedis 24/26/30°.
3. **Lijf uit een profiel** [s, boven, onder, halve breedte] met Catmull-Rom tussen de sleutels: 20 sleutels per dier, overal dezelfde 'M(s, f)'-afbeelding voor tekening (schubben, banden, oog, kaaklijn). De rugkam is een functie van s die alleen op de omtrek komt, niet op de tekening (anders schuift alles mee met de kam).
4. **Chimpansee: 2D-rig met romp in 2 delen (buik/borst, zachte huid op x langs de romp)**, nek, kop; armen en benen als buizen met IK; knokkelhand = pols->knokkel + middenkootjes plat naar achter; platvoet in een 'zoolframe' (bal = oorsprong, zool vlak bij voethoek 20°). Houdingen zijn functies (geen tabellen), zodat de armen bij zitten op de berekende knie kunnen rusten.
5. **Knokkelgang**: diagonale volgorde (AN 0, VF 0,3, AF 0,5, VN 0,8), duty 0,62/0,66, S = 76 cm; schouder schuift ±4 cm mee met de arm (anders rek > 1). Hiel komt los vanaf 55 % van de steunfase (voet draait om de bal).

## Wat de platen goed/fout hadden
- stap.png (reptielen): zijaanzicht krokodil zeer bruikbaar (lijfprofiel klopte binnen 2–3 cm na meten), bovenaanzichten goed voor de S-vorm, **maar de vier fasen zijn geen consistente loopcyclus** (bij de hagedis staan beide linkerpoten tegelijk voor; literatuur: trot met diagonale paren) -> fasen alleen als vormcontrole.
- houdingen.png (chimp): houdingen en silhouet goed (zitten, rechtop, termieten), onderarm te lang; knokkelstand-frame 1 heeft een wijdere stand dan een rustige stand.
- stijlplaten: kleurwaarden direct bruikbaar (krokodil #615C48/#837A58/#B5AA83/#343A3D, hagedis #767844/#9D9C60, chimp vacht #343436, huid #A87A61).

## Algemene regels (voor volgende families)
- **Buiskappen in de juiste draairichting**: een verkeerd georiënteerde halve cirkel aan het eind van een buis gaf 'waaiers' en kartels bij elk gewricht. Eerst één buis los testen.
- **Lichtere/donkere vlakken op poten smal en aan de rand** (0,3x de breedte, tegen de voor- resp. achterrand): een lichte buis in het midden leest als een sticker.
- **Lijf dat op de grond zit: knippen op y = 0** (zitten chimp), zoals bij de katten.
- **Een kop-kleurvlak met een rechte achterrand of een rugband die abrupt begint geeft een naad**: laat banden met een schuine/oplopende rand beginnen.
- **Pieken (vacht) in rust berekenen en alleen waar het mag** (rug, buik; niet op naden met poten): anders zaagtand overal.
- Een kort te meten rek-check per gang (rode stip in de strook) vond binnen één ronde de te korte voorpoten bij krokodil én hagedis.
- Omtrek van de plaat automatisch (effen grijs, OpenCV, opening 5x5 om de grondlijn weg te halen), lijfprofiel per kolom meten i.p.v. schatten op het raster.

## Wat (nog) zwak is
- **Chimpansee zitten**: onderarm over de knie leest nog niet duidelijk (hand hangt voor de knie, onderarm grotendeels achter de dij); dij nauwelijks te onderscheiden van de romp (alleen een donkere streep). Overgangen in de film zijn harde knippen (geen menging tussen houdingen).
- **Chimpansee gezicht**: wenkbrauwboog en mond zijn schematisch; handen in rust (hangen/grijpen) zijn eenvoudige buizen.
- **Krokodil poten**: tenen/zwemvliezen zijn van opzij klein; dij en bovenarm zijn buizen (geen spiervorm, geen schubben). Liggen: poten wat verfrommeld.
- **Hagedis**: de dij (wijst naar de kijker) is een rond vlak; tenen zijn dunne streepjes. Kop iets groter/hoger dan de plaat.
- Testvel heeft geen 'uit-elkaar'-vel (de rigs hebben geen deel-API); wel overlay, strook, zooms, bovenaanzicht, scènes.

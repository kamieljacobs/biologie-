# Lessen: katachtigen als uitknippop (23 okt 2026)

Bestanden: `src/pop_katten.js` (rig-code `KatPop.maak` + per dier een DEF + wrappers), `src/tv_pop_katten.js` (`TV_pop_katten`), werkmap `referentie/pop/katten/werk/` (contour.py, omtrek_js.py, raster.py, vprof.py/hprof.py, peval.py, rk.sh, render_film.py). Renders in `out/pop/katten/testvel/`, film `out/pop/katten/katten.mp4` + `katten.gif` (10,5 s).

## Maten per dier (gewrichtspunten op de realistische plaat, kruiscontrole met tekstbronnen)
| dier | plaat/fase | schofthoogte (bron) | K px/cm | belangrijkste controles |
|---|---|---|---|---|
| jachtluipaard | galop-luipaard.png, staan | 80 cm (67-94 cm) | 161/80 | borst onderrand 0,50 H (plaat 0,51), diepte 0,49 H, diepste punt net achter de elleboog, borstbeen maar ±6 cm voor de voorpoot; taille 0,30 H; radius/humerus ±1,04 (lange onderarm, klopt met cheetah-skelet); tibia ingekort (plaat 32 cm, nu 30) |
| leeuw | stap-leeuw-kat.png, leeuw fase 1 | 120 cm (mannetje ±1,2 m) | 135/120 | dijbeen ±36 cm (bron 37); hak 0,3 H; borst onder de manen ±0,45 H |
| tijger | stap-leeuw-kat.png, tijger | 100 cm (90-110 cm) | 189/100 | plaat heeft de buik te laag (0,33 H door hangende vacht): borst/buik opgetrokken tot ±0,40 H |
| huiskat | stap-leeuw-kat.png, kat lopend | 25 cm (23-25 cm) | 124/25 | dijbeen ±9,6, tibia 12,3, metatarsus 6,3 cm (klopt met kattenskelet) |
Bronnen maten: SDZG-factsheets / standaardwaarden (cheetah 67-94 cm, leeuw ±1,2 m, Bengaalse tijger 0,9-1,1 m, kat 23-25 cm).

## Galop jachtluipaard (literatuur gaat vóór de plaat)
- Hildebrand 1959 (Motions of the running cheetah and horse) en Hudson e.a. 2012 (JEB 215:2425): roterende galop; volgorde niet-leidende voorpoot -> leidende voorpoot -> **gebogen** zweeffase -> niet-leidende achterpoot -> leidende achterpoot -> **gestrekte** zweeffase. Rug buigt het sterkst rond/na het neerzetten van de leidende voorpoot (gebogen zweeffase) en strekt vooral tijdens de achterpoot-steun (max. in de gestrekte zweeffase). Duty per poot ±0,2-0,3.
- Pop: VF 0 · V 0,10 · A 0,54 · AF 0,64, duty 0,22; buiging-kromme max bij t≈0,45, strekking max bij t≈0,88. Gecontroleerd in `luip_galop_groot`: steunvoeten en beide zweeffasen vallen op de juiste plek.
- **De plaat had de fasen fout**: twee gebogen beelden (2-3 en 8) en één gestrekte in 8 beelden, en de volgorde springt; alleen bruikbaar als vormcontrole per beeld, niet als tijdlijn.

## Wat anders was dan bij de wolf
1. **Ruggengraat in 3 delen** (rompV borst, rompM lende, rompA bekken; zachte huid over x) i.p.v. 2: nodig voor buigen/strekken in galop; werkt zonder naad.
2. **Zwaaifase in poolcoördinaten t.o.v. heup/schouder** (hoek + lengte, aansluitend op de steunpunten bij loslaten en neerzetten) i.p.v. een grondbaan: bij een buigende romp schoot de hak met de wolf-aanpak boven de heup en klapte de dij om. Overshoot (am0/am1 < 0) geeft het naar achteren uitzwaaien na het loslaten en het terugtrekken vóór het neerzetten.
3. **Poten als profielen** ([u, voor, achter] in cm langs het bot) i.p.v. met de hand getekende polygonen: per dier alleen breedtes; snel en netjes. Schouder (hum) en dij blijven met de hand getekend (zachte huid).
4. **Vlekken stijf verschuiven** (alleen het middelpunt door de huid, niet de vorm): anders werden vlekken op de schouder tot strepen uitgerekt.
5. **Staan automatisch oplossen** (bisectie op de romphoogte tot de poten 95% gestrekt zijn, voeten onder schouder/heup): de rust-fase van leeuw/tijger/kat is een loopbeeld, dus 'staan' moest anders gemaakt worden; met de hand gegokte voetposities gaven gehurkte dieren.
6. **Zitten automatisch** (heup op vaste hoogte, romp zo rechtop als de voorpoten toelaten): kat-hoeken overnemen voor leeuw/tijger gaf zwevende of half onder de grond gezakte dieren.
7. Verre poot loopt in **hetzelfde spoor** in de stap (geen standverschil), anders reikte de verre voorpoot te ver (rek > 1).
8. Anker = midden tussen schouder en heup (midden onder het dier); schermmaat = schofthoogte zoals in dieren_zoog.js (luipaard 360·s, leeuw 220·s, tijger 200·s, kat 220·s px).

## Algemene regels (voor de volgende families)
- Staartwortel ín de romp beginnen en de eerste staartbreedte klein houden: anders steekt er een hoekje boven het kruis uit (bij alle vier gezien).
- Romp-omtrek bij het kruis rond maken (4 punten), geen hoek: de wolf-romp begon met een hoek die bij elke kat zichtbaar werd.
- Geen losse donkere lijnen in vlakke stijl; een lichtere vlek op de voorkant van de dij maakt de achterpoot leesbaar (leeuw, tijger).
- Een nek die >25° van de rust afwijkt rekt de keel-laag: liever de kop draaien dan de nek.
- Altijd een skelet-overlay (o.skelet) en een rek-print (peval.py) vóór het kijken naar vormen: dat vond de omgeklapte dij binnen één ronde.

## Wat (nog) zwak is
- **Leeuw**: manen zijn gestileerde puntige plukken (zaagtand-achtig), donkere onderlaag nog vrij groot; liggen is de geschaalde kat-houding (niet tegen een plaat gecontroleerd).
- **Tijger**: kop/gezicht (wit vlak) en strepenpatroon zijn redelijk maar schematisch; liggen geschaald van de kat, achterhand iets vreemd.
- **Jachtluipaard liggen**: de opstaande dij ('bult' op de plaat) is vlakker; galop: in de gebogen zweeffase kruisen de poten minder ver dan op foto's.
- **Huiskat**: zit iets smaller dan de plaat; tabby-strepen generiek.
- Film: wissels tussen gangen zijn harde knippen; zitten/liggen mengt hoeken zonder voet-IK (voeten schuiven kort).

## Ronde 2 (Kamiels keuring, 23 okt 2026): koppen en gezichten
Opmerkingen: huiskat 'mag schattiger, beetje zombieachtig'; leeuw 'net niet realistisch'; tijger 'realistischer, sterker, eleganter'. Nieuwe referentie `referentie/pop/katten/koppen.png` (rij 1 realistisch, rij 2 vlakke stijl in 3 tonen = doel).

**Werkwijze kop (nieuw, `D.KOP` in pop_katten.js):** de kop wordt met de hand overgetrokken in px van de vlakke kopplaat (rij 2) en gelijkvormig afgebeeld via twee ankers (achterhoofd -> `J.kop`, neuspunt -> `J.neus`, plus `schaal`). Zo zijn vorm, tonen, strepen, oren en snorharen 1-op-1 die van de kopplaat, los van de lichaamsplaat. Oog = `tekenGezicht`: donkere rand, iris, lichtere onderkant van de iris, pupil (kat: verticale spleet, groot katten: rond) en één lichtpuntje.

**Algemene regel (geldt voor alle dieren; 5 van Kamiels 8 opmerkingen gingen over de kop):**
1. Maak per familie een aparte **kopplaat** (profiel, realistisch + vlak in 3 tonen) en trek de kop daaruit over; de kop van een lichaamsplaat is te klein om goed te tekenen.
2. Ogen nooit als stip of geel schijfje met donkere rand (= 'staarblik/zombie'): altijd iris + pupil + lichtpuntje, oog groot genoeg (kat: iris ±1/7 van de koplengte), lichte vlek rond het oog.
3. Kop iets groter dan anatomisch (huiskat ×1,3, leeuw/tijger ×1,2-1,25): in een klein zijaanzicht leest een kop op ware grootte als 'te klein' en dood.
4. Kophoek in 'staan' bijna horizontaal (neusbrug ±25-35° omlaag); een hangende kop (tijger had 44°) leest als moe/zwak.
5. Lichte vlakken (keel, buik) niet als losse wig onder de kaak laten uitsteken: zulke lagen weglaten of laten aansluiten op de kaaklijn.

**Waarom de leeuw 'net niet realistisch' was (oorzaken, vergeleken met stap-leeuw-kat.png):**
- poten te dun: onderarm ±60% van de plaatbreedte (16 cm) -> nu dikV 1,7 / dikA 1,6;
- manen als zaagtand-rand om één vlak blok i.p.v. losse, gelaagde lokken -> nu procedurele lokken (donker en lang aan de buitenkant naar achter/omlaag, midden, goud kort rond het gezicht, borstlokken), niet geknipt op de basisvorm (`vrij`);
- kop klein en vlak t.o.v. de manen, oog een stip -> nieuwe kop ×1,2;
- schoft/borst te recht en ondiep, vreemde lichte/donkere vlekken op de dij -> schoft hoger, borst dieper, vlekken weg.
**Tijger:** strepen nu gebogen met golf, dubbel (kortere smalle bijstreep), soms gevorkt, smaller naar de buik; schouder als romp gestreept (geen 'ladder' van korte dwarsstreepjes); schoft/nek zwaarder, poten dikker (1,45/1,35).
**Huiskat:** warmer palet (grijs -> warm grijsbruin/crème), kop ×1,32 met groot groen oog.
Nog zwak: overgang kop-nek bij de huiskat (kleine inkeping onder de kaak), tijgergezicht nog wat hoekig, strepen op de tijgerdij nog dwars en regelmatig.

## Ronde 3 (23 okt 2026): tijger en huiskat overgetrokken uit de vlakke rij
Kamiel: leeuw ✓; tijger 'nog steeds niet zo goed', huiskat 'beter maken'. Nieuwe platen `tijger.png` en `huiskat.png` (boven realistisch, onder vlak; zelfde houding en schaal).
- **Overtrekken als vectorpaden** (`werk/overtrek.py` + `werk/overtrek.json` -> blok `KAT_OVERTREK` in pop_katten.js): per deel een zone (polygon in plaat-px); deel = silhouet ∩ zone, lagen = per paletkleur (dichtstbijzijnde van 5-7 k-means-tonen) de vlakken binnen de zone, als paden (approxPolyDP 0,8 px). Romp, nek, schouder, dij, staart en kop komen zo 1-op-1 uit de vlakke figuur; strepen zitten vast op het deel en buigen mee met de zachte huid. Onderpoten blijven profielen (eigen kleur + dwarsstrepen), want overgetrokken onderpoten draaien niet mee.
- Rust = de vlakke staan-figuur; skelet geijkt op de realistische bovenste rij (zelfde houding). In rust valt de pop exact op de plaat (`vlak_tijger_rust`).
- Lessen: (1) de kop uit de lichaamsfiguur nemen, niet uit de losse kopplaat: de grote kop over de figuur leggen verschoof de witte wangkraag en verfde de hals oranje; (2) silhouet eerst 'openen' (3×3), anders worden snorharen punten in de omtrek; (3) zones voor schouder/dij niet tot de onderpoot laten lopen (dubbele poten, stompe 'laarzen'); (4) een plaat-zit die met IK niet lukt (kat met opgeheven voorpoten) als **vaste uitknipfiguur** gebruiken (`D.FIGUUR.zitten`, overvloei vanuit staan) met eigen oog erop; (5) kat-poten in vlakke stijl zijn veel slanker dan anatomisch (dik 0,7).
- Bug gevonden: in de LOPEN-specs botst `A` (romphoeken) met `A` (achterpoot-krommen); de romp-overrides werkten daardoor nooit. Bij de volgende familie hernoemen (bv. `romp: {...}`).
- Nog zwak: huiskat liggen is nog de oude skelethouding (geen plaat); in lopen zijn de kattenpoten iets kort/stomp; tijger-dwarsstrepen op de onderpoten zijn geprofileerd, niet overgetrokken.

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

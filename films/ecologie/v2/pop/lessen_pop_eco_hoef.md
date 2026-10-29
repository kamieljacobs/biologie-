# Lessen: ecologie v2, familie hoef (schaap, ree, moeflon, wild zwijn + frisling), 29 okt 2026

Bestanden: `src/pop_eco_hoef.js` (rig `EcoHoefPop` = kopie van HoefPop uit pop_hoef.js + galop uit pop_katten.js; wrappers `ecoSchaap/ecoRee/ecoMoeflon/ecoWildzwijn/ecoFrisling` en korte namen `schaap/ree/moeflon/wildzwijn/frisling`), `src/tv_pop_eco_hoef.js` (`TV_pop_eco_hoef`, 67 vellen). Werkmap `out/eco_hoef_werk/`: `eco_dieren.py` (gewrichtspunten, kopgebied, ontworpen tonen, gewei/hoorn), `eco_bouw.py` (afgeleid van hoef_bouw.py: masker op lichtgrijze achtergrond, wis/vul, ontwerp per deel), `hoorn.py` (spiraal), `defs.js` (DEF per dier), `wrap.js`, `assemble.py` (maakt src/pop_eco_hoef.js), `rk.sh` (testvel renderen), `render_film.py`. Renders: `out/eco_hoef_tv/` (snelkoppeling naar de lange render-map), film `out/film_hoef/hoef.mp4` + `hoef.gif` (10 s).

Aanroep: `schaap(ctx, x, y, s, { houding, t, kijk, a })`, s = px per cm zoals `wolf()` (schofthoogte op het scherm = H·s). Houdingen: schaap staan/lopen/grazen (kauwt met t)/liggen; ree staan/lopen/grazen/sprong (ook 'vlucht', 'rennen')/liggen, `o.gewei: false` = geit; moeflon staan/lopen/grazen/rennen, `o.hoorns: false` = ooi; wildzwijn staan/lopen/wroeten (t laat de kop wroeten, hoopje aarde voor de snuit)/draven, `o.jong: true` = frisling.

## Maten (cm) en bronnen
| dier | schoft gekozen | bron | gemeten op de pop (rust) |
|---|---|---|---|
| schaap (Texelaar) | 72 | Wikipedia Texel sheep: ooi ±68, ram ±70 cm; brief 75–80 | romp ±116 cm lang, kop 27 cm, borstbodem 31 cm boven de grond (wol), carpus 19 cm, hak 20 cm |
| ree (bok) | 72 | RVO: schoft 65–84, kop-romp 107–127 cm, 20–30 kg, gewei 16–23 cm | poten lang: elleboog 43 cm, onderarm 21, middenhand 17, middenvoet 20 cm; gewei ±17 cm boven de rozenkrans |
| moeflon (ram) | 75 | waldwissen.net (LWF): 70–80 cm, 25–55 kg, lichte zadelvlek; Wikipedia: hoorns tot 80 cm | hoorn = spiraal van ±280° rond het oor, tip onder het oog |
| wild zwijn (zeug) | 80 | wildlifeonline.me.uk: 70–100 cm, zeug ±140 cm lang, staart 16–30 cm met kwastje | romp 1,05× langer gezet (sx) dan de plaat; staart ±30 cm |
| frisling | 32 | geen tekstmaat gevonden; ultimateungulate: strepen tot 2–6 maanden. Schatting: jong van ±2–3 maanden | op de zelfde plaat ±0,4× de zeug |
Botverhoudingen: geen absolute botlengtes van deze soorten online gevonden (Teichert-factoren niet bereikbaar). Gecontroleerd: middenvoet langer dan middenhand bij ree/moeflon (damhert-osteometrie hrcak: Mc 180, Mt 200 mm, zelfde orde), carpus/hak hoog, elleboog ≈ borstbodem. Maatstok: alle dieren staan op het vel `ware_grootte` naast het edelhert (120 cm) en de wolf (80 cm).

## Wat anders was dan bij wolf/hoef
1. **Lichtgrijze plaatachtergrond** i.p.v. navy: masker = kleurafstand tot de hoekpixel (>16); de witte schapenpoten en de lichte spiegel blijven goed staan.
2. **Gewei en hoorn uit het masker wissen** (`wis`) en de plek eronder vullen (`vul`), anders wordt het gewei een stuk van de kop/hals. Daarna ontworpen: gewei = 3 taps toelopende stangen per kant (ver = donkerder, achter de kop), lichte enden en rozenkrans; hoorn = spiraal met dwarse ribbels (`hoorn.py`). Eigen tekenfunctie op een bot (`D.TEKEN`), zodat `o.gewei/o.hoorns: false` ze weglaat.
3. **Oren apart** (schaap, ree) als deel op de kop (`KOPDELEN`).
4. **Tonen ontworpen, niet uit de pixels**: de automatische k-means-vlakken gaven bij het schaap vlekken (wolstrengen) en bij het zwijn camouflage. Nu per dier 2–4 bewuste vlakken; elk ontworpen vlak hoort bij het deel waar het grootste stuk ligt (anders snijdt een deelgrens een streep van de frisling af).
5. **Rechtopstaande hals (ree)**: het standaard kopgebied pakte de hele keel mee, zodat de keel bij grazen als een kegel met de kop meedraaide. Eigen `kopGebied`/`nekGebied`, en de hals loopt 6–8 px onder de kop door (overlap): geen spleet als de kop draait.
6. **Borstlap** (deel 'borst', vast op de romp, onder de hals getekend): bij grazen opende tussen keel en borst een V (navy driehoek). Een web of convexe huls van hals+borstpunten werkte niet (huls te groot, punten verkeerd gesorteerd); een vaste lap wel.
7. **Galop als gang** (ree-sprong, moeflon-rennen): de galop van het jachtluipaard werkt ook voor hoefdieren, mits het bekken bij gebogen zweeffase onder 180° blijft (rompA 150–155); eerst stond de romp in een omgekeerde boog (bekken naar boven).
8. **Wroeten**: kopHoek/nekHoek worden ná het oplossen van 'reik' (neus op de grond) opgeteld, plus `wroet` (sinus op kop en hals met t); zo duwt de snuit door de grond. Kauwen = `kauw` op de onderkaak (schaap kaakdeel apart ontworpen).
9. Profielen van de poten in absolute cm (`profCm`), gemeten met `prof_meet.py` en gladgestreken; de hoef-profielen van het paard schalen niet goed naar dunne reeënpoten.

## Gangmodel
- Stap: laterale volgorde A 0 · V 0,25 · AF 0,5 · VF 0,75; duty schaap 0,64, ree 0,62, moeflon 0,62, zwijn 0,66, frisling 0,65; pas schaap 76, ree 88, moeflon 84, zwijn 74, frisling 32 cm.
- Draf (zwijn, frisling): diagonale paren, duty 0,44 (twee zweeffases).
- Sprong/rennen (ree, moeflon): gebonden galop, verre voor 0 · nabij voor 0,06–0,1 · nabij achter 0,5 · ver achter 0,56–0,6, duty 0,22–0,24; lange zweeffase na de afzet van de achterbenen (= sprong).
- Steunvoet glijdt niet (teen vast in de steunfase); vel `zes_*` toont 6 tussenstanden op wereldpositie.

## Wat de platen goed/fout hadden
- Goed: vlakke rij met duidelijke vlakken (moeflon: zadelvlek, donkere schouder/flank, witte buik en sokken; ree: witte spiegel, lichte keelvlek), houdingen grazen/liggen/sprong bruikbaar als controle (`plaat_*`).
- Fout/let op: ree-gewei in de kopclose-up veel te groot (maat van het lijf genomen, ±17 cm); zwijn toont een zogende zeug met tepelrij (weggewist, rustiger); schaap 'staan' heeft dunne, iets te lange poten t.o.v. de wol; de frislingkop op de plaat is lang en spits (in de pop iets korter gehouden). De houdingen op één plaat hebben elk een iets andere schaal.

## Algemene regels (voor de volgende families)
1. Alles wat uit de kop steekt (gewei, hoorns, oren) eerst uit het masker wissen en als eigen ontworpen deel tekenen.
2. Een V-gat tussen keel en borst bij kop omlaag: een vaste borstlap op de romp onder de hals, niet een web.
3. Bij een (bijna) verticale hals het kopgebied met de hand zetten; de hals moet onder de kop door lopen.
4. Ontworpen tonen per deel toewijzen op overlap, niet aan alle lijfdelen tegelijk.
5. Commentaar aan het eind van een regel kan een sluitende accolade inslikken (gebeurde hier in het testvel): na elke bewerking `node --check`.
6. Testvel-hulpnamen per familie uniek maken (`EHTV`), want testvellen van families worden soms samen geladen.

## Fouten gevonden en hersteld
- Schaap grazen: harde knik/spleet in de hals bij de schoft -> borstlap + keelkap + kopVolg 0,8 + romp 22° voorover.
- Ree grazen en liggen: spleet tussen hals en kop, keel als kegel -> eigen kop/nekgebied met overlap.
- Moeflon grazen: kop zweefde boven de grond (vaste halshoek) -> reikNek (hals zakt tot de neus de grond raakt).
- Galop: bekken stond verkeerd om (rompA > 180 bij gebogen) -> 150–155°.
- Frisling: dikke poten bleven aan de romp hangen -> grotere openingsschijf + romp afgesneden boven de pootlijn.
- Uit-elkaar-vel crashte (halskromme niet berekend in `deel()`) -> fkH in deel.
- `KOPDELEN` verving de standaardlijst (keelkap vond geen bot) -> lijst samengevoegd.
- Testvel laadde niet door een ingeslikte accolade in een commentaar.

## Nog zwak
- Schaap: wol is één glad vlak (geen krullen aan de rand), poten iets dun; liggen zelf gemaakt (gevouwen poten nauwelijks zichtbaar onder de wol, zoals op de plaat).
- Ree liggen: hals iets recht; sprong leest als galop met lange zweeffase (geen echte 'stotsprong' met alle vier de poten tegelijk).
- Wild zwijn: kop goed herkenbaar, maar zonder borstelrand op de rug; frisling-buik bij lopen nog een rechte snijlijn; de strepen zijn vereenvoudigd (4 donkere, 3 lichte).
- Overgangen in de film zijn mengingen van standen zonder voet-IK (voeten schuiven 0,25 s).
- dieren_overig.js geeft bij het laden 'berkenspanner is not defined' (niet uit dit bestand).

## Correctieronde 1 (coördinator, 29 okt 2026)
- **Schaap**: lijf was een doos. Plaatsilhouet van lijf en kop gewist, bolle wolvacht ontworpen (gebogen rug, ronde achterhand, bolle buik) met een zacht golvende rand (`_golf`: amp 2,2 px, golflengte 15 px); kop langer (neus 9 px verder) met Romeinse neusrug, oor opzij.
- **Moeflon**: in het vel kwam de schoft uit op ±72 cm en de bouw was gedrongen. Nieuwe verticale herschaling in eco_bouw.py (`vy`: lijf tussen rug en buik ×0,76, alles onder de buik ×1,3): slanker lijf, langere poten, schoft nu 79 cm silhouet / 72 cm skelet. Hoorn groter (spiraal 334°, straal 38 -> 21 px, breedte 24 px). Zadelvlek = zachte crème ovaal met een tussentoonrand.
- **Wild zwijn**: ronde korte plaatkop gewist; wigkop met lange rechte snuit en klein oog ontworpen, schoft verhoogd en kruis verlaagd (rug loopt af), lijf ×0,82 in de hoogte, poten ×1,12 langer en profielen ×0,75 dunner, kleinere hoeven, rustige getande borstelrand op nek/schoft (deel 'kruis'), oor als eigen deel. Schoft 78 cm.
- **Ree**: echte vluchtsprong: duty 0,18, achterbenen 0,40/0,44 na de voorbenen, zweeffase ±45% van de cyclus met de voorpoten gevouwen (middenhand tot 172°) en de achterpoten gestrekt; romp tot 92 cm boven de grond.
- Regel: als een plaatvorm als blok leest, het plaatsilhouet wissen en de omtrek ontwerpen (zoals de koppen bij hoef); verhoudingen die afwijken van de bron (te gedrongen) corrigeren met een herschaling per hoogteband, niet door de botten los te verschuiven.

## Correctieronde 2 (29 okt 2026)
- **Wild zwijn**: de ontworpen wigkop las als een tapir (dunne slurf, geen overgang kop/nek). Terug naar het recept: lijf en kop 1:1 uit de vlakke rij (alleen de tepelrij gewist), lichter bruingrijs (#7A6D61), donkere snuitschijf en oren als ontworpen vlakken, rustige borstelrand. Schoft 85 cm silhouet, kop-romp ±127 cm (bron 100–170). Les: een eigen ontwerp van een kop alleen maken als de plaatkop echt fout is; hier was de plaat goed en had ik alleen de verhoudingen moeten ijken.
- **Moeflon**: lijfomtrek weer 1:1 uit de vlakke rij (vy lijfband ×1,0), alleen de poten ×1,22; zadelvlek één zachte langgerekte toon zonder rand; donkere schouderband en hals als zachte ovalen (geen hoekige vlakken).

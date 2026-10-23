# Lessen: dier als uitknippop (wolf, 23 okt 2026)

Bestanden: `src/wolf_pop.js` (rig + tekening + gangmodel), `src/tv_wolfpop.js` (testvellen), `referentie/wolfpop/punten.json` (gewrichtspunten), `referentie/wolfpop/meet_houdingen.py` (punten -> bothoek-tabellen, schrijft blok in wolf_pop.js), `referentie/wolfpop/render_film.py` (frames + mp4 + gif). Renders: `out/wolfpop/testvel/`, `out/wolfpop/wolf_loop.mp4`, `.gif`, losse frames in `out/wolfpop/frames/`.

## Stappenrecept (herhaalbaar per dier)

| # | Stap | Tijd (wolf) | Wat werkte |
|---|------|-------------|------------|
| 1 | Twee ElevenLabs-platen: **modelblad** (zelfde dier 6x, strikt zijaanzicht, zelfde schaal, effen achtergrond) + **stijlplaat** (het dier vlak in 3 tonen) | (gegeven) | Effen lichte achtergrond = omtrek automatisch uit te knippen (drempel op kleurafstand, OpenCV). |
| 2 | Ruitjes-uitsneden (5x, raster 10 px) per houding en per lichaamsdeel bekijken, gewrichtspunten noteren in `punten.json` | 30 min | Eerst houding 1 (staan) volledig: botlengtes komen alleen daaruit. Andere houdingen alleen de punten die je echt ziet. |
| 3 | `meet_houdingen.py`: schaal (schofthoogte 80 cm), botlengtes, rusthoeken; per houding hoeken "achtervolgen" vanaf het al berekende ouderpunt; poten met 2-bots-IK naar de gekozen kogel | 30 min (eenmalig script, nu herbruikbaar) | Vaste botlengtes + IK = voeten staan altijd precies op de grond, ook als de punten niet perfect zijn. Script meldt 'rek' (>1 = poot te kort = romp te hoog gekozen). |
| 4 | Delen tekenen in px van houding 1 (vectorpaden, Catmull-Rom), per deel 2–4 toonlagen, geknipt op de basisvorm | 1,5 uur | Toonlagen mogen slordig over de rand: `clip` op de basisvorm. Vachtpieken als vlamvorm op gekozen stukken omtrek (niet overal). |
| 5 | Gewichten (zachte huid) voor romp (rompV/rompA), nek (romp/nek/kop), dij (bekken/dijbeen), schouder (scapula/opperarm), staart (3 segmenten) | 20 min | Dit loste de naden bij schouder en heup op. Een dij die stijf meedraait wordt een draaiende schijf (crème broek draait naar onder). |
| 6 | Tekenvolgorde vastleggen | 20 min | Zie 'wat het verschil maakte'. |
| 7 | Gangmodel: per poot fase, steun/zwaai, teen vast in steun, IK | 45 min | Glijden = 0,00 cm per constructie (gemeten op 400 tijdstippen in het testvel). |
| 8 | Testvellen: overlay op omtrek, foto naast pop, uit-elkaar, strip met steunlijnen, zooms van heup/schouder | 30 min | De zooms vonden de echte fouten (draaiende dij, crème strook die door de dij heen kwam, plooi in de nek bij zitten). |
| 9 | 2–3 correctierondes kijken met Read | 1,5 uur | |

Totaal ±6 uur voor het eerste dier; een volgend dier (zelfde rig-code, nieuwe punten + delen) schat ik op 3 uur.

## Wat het verschil maakte
1. **Eén silhouet-rand in twee passes**: eerst van alle delen alleen een lichte rand (0,5 cm), daarna alle vlakken. Alleen de buitenrand blijft over; interne naden verdwijnen. Losse randen per deel maakten van elk deel een sticker.
2. **Nabije voorpoot achter de romp** (onderarm, middenvoet, voet onder de borst vandaan) + een zachte schouderlap erover. Elleboognaad onzichtbaar.
3. **Onderbeen van de achterpoot vóór de dij tekenen** (dij erover): anders loopt de crème achterkant van het onderbeen als witte barst door de dij. Bij zitten/liggen gaan middenvoet en voet weer ná de dij (de voet ligt vóór de bil).
4. **Dij als druppel naar de knie, met zadel-kleurige kap** die in de rug overloopt; ronde dij = bal.
5. **Gewicht van de nekbasis over de hele neklengte uitsmeren** (anders een harde horizontale plooi bij zitten, waar romp en nek 40° verschillen) en de onderrand van de nek getand maken (leest dan als manen).
6. **Verre poten in een warm-donkere tint van dezelfde kleuren** (mix 34% naar #3E3A36), niet naar navy (werd staalblauw).
7. **Pieken weinig en lang** (breedte 12–22 px, hoogte 4–6 px, vlamvorm met helling naar achter); kleine pieken = zaagtand.
8. `dierOog` in een eigen schaal aanroepen (0,25): de functie gaat uit van px (lichtpuntje min. 1,2 eenheid) en werd in cm-eenheden een witte vlek.
9. Kaak altijd tekenen (anders mist de kin en lijkt de snuit dun); open bek = mondholte + tong tussen kop- en kaakrichting.

## Wat (nog) niet goed werkt
- Overlay draf/stap: kop en hals in de pop iets lager/naar achter dan op het modelblad; de modelbladhoudingen zijn onderling niet consistent (andere schofthoogte per plaatje), dus perfect passen kan niet met vaste botlengtes.
- Zitten: borst iets smaller dan de referentie; voorpoot 'rek' 1,05 (net te kort) -> romp in zit 1–2 cm te hoog gekozen.
- Dij bij sterke draai (draf) nog licht schijfachtig; de crème broek tekent dan een 'glimlach'.
- Overgang lopen -> draf in de film is een harde wissel (geen versnelling); gangen mengen is een volgende stap.
- Huilen is zelf gemaakt (geen referentie): kop -58°, nek -26°, bek 0,32 rad.

## Uitknipvel: nuttig?
- De **samengestelde wolf** linksboven was het nuttigst: kleurwaarden (zadel #4B4B4A, flank #938878, crème #DDD1C2), waar de toonvlakken liggen (zadel met schouderband, crème buik die bij elleboog en lies omhoog loopt, crème 'broek' achter op dij/onderbeen, crème keelslab) en de vorm van de pieken.
- De **losse delen** hielpen alleen als hint voor de snijlijnen (dij als druppel met draaipunt boven, romp zonder poten, kop los van de nek); hun vormen zijn cartoonesk en de draaipunten liggen niet anatomisch. Ronde overlap op het gewricht werkte minder goed dan zachte huid.
- Het **modelblad** was onmisbaar: anatomie, schaal en hoeken; de effen achtergrond maakte de omtrekcontrole gratis.

## Welke extra ElevenLabs-plaat had geholpen
1. **Loopcyclus-vel in 8 fasen** (zelfde wolf, zelfde schaal, zijaanzicht, poten genummerd of de verre poten iets donkerder): nu waren contact/passeer de enige ankers en was niet te zien welke poot de nabije is.
2. **Skelet-overlay** van dezelfde staande wolf (botten zichtbaar door de vacht) om schoudergewricht, elleboog en heup te plaatsen; die liggen diep in de vacht en zijn nu geschat.
3. **Kop-detailvel** (zijaanzicht kop: dicht, open bek/huilen, oren naar achter) in de vlakke stijl.
4. Stijlplaat waarop de **verre poten** apart zichtbaar zijn.

## Anatomische ijkpunten (gecontroleerd tegen de referentie)
Schofthoogte 80 cm; borstbodem ≈ elleboog (≈ 41 cm); hak hoog (≈ 22 cm); teenganger (kogel 3,7 cm boven de grond, teen op de grond). Botlengtes uit houding 1: scapula 25, opperarm 20, onderarm 32, middenhand 7,6, voet 8,3; dij 21, onderbeen 27, middenvoet 18,6, voet 8,6 cm. Onderarm is lang (modelblad); echte wolf ±22–25 cm onderarm, hier ruim door de hoge carpus op het plaatje. Pols knikt bij zwaai naar achter (middenhand tot 150–158°), hak wijst naar achter (knie IK naar voren, elleboog naar achter).

## Gangmodel (in `GANG`)
- Stap: S = 78 cm per cyclus, duty 0,64, laterale volgorde A 0 · V 0,25 · AF 0,5 · VF 0,75; zwaaihoogte voor 8,5 / achter 6,5 cm; romp-bob 0,7 cm (2x per cyclus).
- Draf: S = 118 cm, duty 0,44, diagonale paren (A+VF, AF+V); bob 1,2 cm.
- Per poot: teen-x lineair in de steunfase (staat stil in de wereld), zwaai met Hermite (eindraaklijnen = terug tegen de loopsnelheid in), hiel komt los in de laatste 30–40% van de steun, hoeken van middenhand/middenvoet en voet als sleutelkrommen (`metaS/metaZ/pootS/pootZ`).

## Ronde 2 (23 okt 2026): loopcyclus-plaat, botlengtes, gangwissel, integratie

**Nieuwe plaat** `referentie/wolfpop/loopcyclus.png`: 8 stapfasen + huilen, draf in volle strekking, snuffelen. Omtrekken met `omtrek_loopcyclus.py`. Let op: grondlijnen eruit filteren op 'rij >90% donker' (een drempel van 60% wiste ook de lichamen, want 4 wolven naast elkaar vullen de rij).
- **Schaal per figuur verschilt** (rij 3 ±30% groter dan rij 1–2) en de AI-wolf heeft een ±15% langere romp dan het modelblad. Rij 1–2 geijkt op schofthoogte (K 1,96 px/cm), rij 3 op de kop (oor–neus 32 cm; K 2,53–2,85). Overlay van de fasen uitgelijnd op de neus.
- **Stapfasen** bevestigen de laterale volgorde (achter, ±¼ cyclus later dezelfde kant voor). De plaat toont bijna altijd 3–4 voeten aan de grond (duty ≥0,75, langzame stap); gangtheorie voor een normale stap is 0,6–0,7 -> **duty 0,68** gekozen (compromis, theorie wint). Verfijnd uit de plaat: middenhand in de zwaai buigt minder dan ik had (max. 128° i.p.v. 150°, voet hangt met de tenen omlaag ±100°); vlak voor neerzetten strekt de voorvoet naar voren (middenhand ±60°, voet 20–30°). Pas 82 cm (plaat suggereert langer; 88 cm gaf rek 1,05 = voorvoet haalt de grond niet).
- **Draf (plaat 10)**: zweeffase (alle voeten los). Voorpols in de zwaai tot 160°, voet 140°; achtervoet bij afzet 120°; reikende voorpoot middenhand ±40° vlak voor contact. Ingebouwd als sleutelkrommen + basis-houding 'drafvol'.
- **Huilen/snuffelen** nagemaakt als tabellen; snuffelen kreeg handmatig kop +16°, nek +14°, romp −7°: de pop-nek is korter dan op de plaat, anders raakt de neus de grond niet.

**Botlengtes** (tekstbron wint): brachiale index radius/humerus ≈ 1,0; scapula ≈ 27% van de voorpoot; (scapula+humerus)/(radius+metacarpus) ≈ 1,25 (indices uit Anyonge e.a., verzameld op tapatalk-bestiary). Absolute lengtes heb ik online niet gevonden; geschaald naar schofthoogte 80 cm: scapula 19,8 · humerus 24,8 · radius 23,9 · pols–kogel 10,4 · voet 7,2; femur 24 · tibia 26 · hak–kogel 14,6 · voet 7,2 cm. De onderarm ging van 32 naar 24 cm; de carpus zat op het modelblad te laag (de 'pols' was het pootkussen), de hak ook (22 -> 18 cm). Elleboog ligt nu net onder de borstlijn (38 cm). De tekening van onderarm, middenhand, onderbeen en middenvoet is mee verschoven.

**Zwakke punten opgelost**
- Kop/hals in stap +4/+3° en draf +4/+2° omhoog (de plaat toont de kop juist iets lager dan het modelblad; daarom niet meer dan dit).
- Zitten/huilen: romp dikker (`BORST` 1,06–1,08 buik/borst, 60% daarvan rug), bekken minder steil (heiligbeen naar achter i.p.v. omlaag), en **alles onder de grond weggeknipt** bij zitten/liggen (bil en staart worden platgedrukt). Voorpoot-rek 0,98.
- Dij in draf: gewicht van het dijbeen pas vanaf 25% van de dijlengte -> bovenkant blijft bij het bekken, geen draaiende schijf.
- **Fout gevonden en de les**: rompA staat rond ±180°; lineair mengen tussen −178° en 180° liet het lijf omklappen. Hoeken altijd via de kortste weg mengen (`mixA`).
- **Vloeiende gangwissel**: `WolfPop.film(spec)` simuleert per frame: één fase Φ (frequentie mengt 1 -> 2 Hz), duty, faseverschuiving per poot (V 0,25 -> 0,52; VF 0,75 -> 1,02), sleutelkrommen en romp worden met g (0 = stap, 1 = draf) gemengd; een steunvoet ligt vast in de wereld, een zwaaivoet gaat van het optilpunt naar het voorspelde neerzetpunt. Stoppen: de pas krimpt tot 0 bij gelijke frequentie; elke poot zet nog één keer neer op zijn staan-plek en blijft dan staan (anders stapt hij eeuwig: bij duty 0,68 zijn er nooit vier voeten tegelijk neer). Daarna mengen houdingen met de voeten vast (IK); bij zitten stappen de achtervoeten na elkaar naar voren, de voorvoeten blijven.
- **Doorzichtig** (`o.a < 1`): eerst op een los canvas tekenen, anders schemeren de overlappende delen door elkaar.

**Integratie**: `wolf(ctx, x, y, s, o)` in `src/wolf_pop.js` tekent de pop (s = px per cm zoals in dieren_zoog.js; o.houding/t/kijk/a/kopHoek/nekHoek/bek; grazen -> snuffelen). Laad wolf_pop.js ná dieren_zoog.js. Gecontroleerd in sb4 e4s21, e4s22, e4s31 en sb6 e6s15, e6s28 (`out/wolfpop/storyboard/`).

**Nog zwak**: snuffelen in de film is sterk gebold, omdat de voorvoeten op hun staan-plek blijven (op de plaat stappen ze naar voren). Huilen: de oren steken als hoorntjes naar achter (oren plat leggen is een volgende stap). De AI-figuren hebben elk een andere schaal en romplengte, dus overlays passen nooit exact.

**Extra plaat die nu zou helpen**: zelfde wolf en schaal, 'zitten gaan' in 4 fasen en 'snuffelen gaan' in 3 fasen (overgangen), en een kopvel met de oren plat.

# Lessen: paardachtigen en hoefdieren als uitknippop (23 okt 2026)

Bestanden: `src/pop_hoef.js` (rig-code `HoefPop.maak`, afgeleid van KatPop; per dier een DEF; wrappers `paard`, `ezel`, `muilezel`, `edelhert`, `koe7`, `nijlpaard`), `src/tv_pop_hoef.js` (`TV_pop_hoef`), werkmap `referentie/pop/hoefdieren/werk/` (`bouw.py` = vormen uit de stijlplaat, `kijk.py`, `rk.sh` = testvel renderen, `rek.sh` = poot-rek per gang, `render_film.py`). Renders in `out/pop/hoef/testvel/` (46 vellen), film `out/pop/hoef/hoef.mp4` + `hoef.gif` (10,5 s), werkbeelden in `out/pop/hoef/werk/` (o.a. `plaat_vs_pop.png`, `film_overzicht.png`).

## Maten per dier (stijlplaat -> cm, kruiscontrole met tekstbronnen)
| dier | schoft (bron) | K px/cm (stijl) | controles |
|---|---|---|---|
| paard | 160 cm (warmbloed) | 180/160 | lengte boeg-zitbeen 166 cm (≈ schofthoogte ✓), borstdiepte 0,41 H, kop 60 cm (0,38 H ✓; de oude fotoplaat had 80 cm = te groot), carpus 45 cm, hak 54 cm, kogel 13,5 cm. Bot: scap 43, hum 34, rad 37, mc 32, vp 16; dij 40, schn 39, mt 40 |
| ezel | 110 cm | 157/110 | lichaam 115 cm ✓, kop 35–43 cm, carpus 28 cm (0,25 H), hak 35 cm |
| muilezel | 130 cm (storyboard: 1,30 m) | 170/130 | lichaam 132 cm ✓. Bron (Donkey Sanctuary): muildier/muilezel heeft kop van een ezel en 'extremiteiten' van een paard; manen en staart bij een muilezel (hinny) meer paard. Strikt is NL 'muilezel' = paardenhengst × ezelin; de plaat en de storyboards tekenen het gewone type (lange oren, ezelkop, paardenlijf), zo gehouden |
| edelhert | 120 cm (Wikipedia: 95–130, Schotse herten ±122) | 147/120 | lijf 147 cm, kop 44 cm, elleboog 64 cm (0,53 H, lange poten), mc 26, mt 34 |
| koe (MRIJ) | 140 cm (MRIJ 135–140 cm, regionalcattlebreeds.eu) | 167/140 | plaat te lang (lichaam 1,35 H): lengte × 0,9 (`sx`). Roodbont: rode lappen op wit, basis = wit |
| nijlpaard | 150 cm (SDZG 150–165) | 163/150 | lengte 324 cm (300–505 ✓), buik op 35 cm, bek tot 150° (Guinness) -> gapen = kop 40° omhoog + onderkaak 100° |

## Wat anders was dan bij wolf en katten
1. **Delen uit de stijlplaat zelf** (geen handgetekende punten): silhouet = afstand tot navy (plus 'rood ≥ blauw' voor zwarte manen/benen), per deel geknipt met een gebied rond de gewrichten; toonlagen = k-means-tonen (4–5), **elk samenhangend toonvlak bij één deel** (waar het grootste stuk ligt), niet door deelgrenzen afgesneden. Rand van 2 px krijgt de toon van de binnenbuur (anders een stippelrand), smalle vlakken langs de omtrek (randglans) weg.
2. **Poten uit de romp halen met een morfologische opening** (schijf breder dan een poot: paard 36 px, koe 40, nijlpaard 60): geen rechte snede onder de buik. Met een horizontale snede zag je altijd een vlakke buiklijn.
3. **Eén basiskleur voor het hele dier** en **lijf-groep**: romp, dij, schouder en hals eerst alle basisvlakken, daarna alle toonlagen. Anders snijdt de rand van de schouder een licht buikvlak recht af.
4. **Hals als buigzame kromme** (spine curve): hoek loopt langs de hals op, kop hangt aan het eind van de kromme. Positie-menging liet de hals bij grazen (117°) inklappen, hoek-menging om één punt gaf een bult. Extra: kam aan de buitenkant van de bocht drukt in, schoft blijft bij de romp, keel loopt 14 cm (nijlpaard 30) onder de kaak door en volgt de kop maar half (geen gat bij kop omhoog/gapen).
5. **Grazen**: kophoek wordt opgelost tot de neus op 1 cm boven de grond komt (bereik 70–135°), hals 60–66°, romp 6–7 cm lager, één voorbeen 15–22 cm naar voren.
6. **Romp zakt als een poot te kort is** (stap/draf, max 4 iteraties): voorbenen van hoefdieren staan in rust bijna gestrekt (rek 0,96), dus elke uitstap gaf rek 1,05–1,18. Nu overal ≤ 1,00; het zakken valt samen met de dubbele steunfase.
7. **Hoef als vaste vorm op het kootbeen** (zool plat in rust), klauw met spleet + bijklauw (koe, hert), nijlpaard ronde voet met nagels. Schouderblad draait mee in de stap (14–20°).

## Gangmodel (in `_HOEF_G`, `_hoefStap`, `_hoefDraf`)
- Stap: laterale volgorde A 0 · V 0,25 · AF 0,5 · VF 0,75 (viertakt; Hildebrand), duty 0,62 (paard), 0,64 (ezel), 0,65 (koe), 0,70 (nijlpaard). S: paard 170, ezel 100, muilezel 125, hert 130, koe 130, nijlpaard 150 cm.
- Draf (paardachtigen): diagonale paren A+VF (0 / 0,02), AF+V (0,5 / 0,52), duty 0,42–0,44 -> twee zweeffases; romp laagst halverwege de steun (bobFase = β/2 − ¼).
- Voor: carpus knikt in de zwaai naar achter (middenhand tot 138° stap, 165° draf), hoef klapt om (kootbeen tot 150–158°); achter: hak strekt bij afzet, middenvoet zwaait naar voren.
- Glijden = 0 per constructie (teen vast in steun); rek-controle met `rek.sh`.

## Wat de platen goed/fout hadden
- **Stijlplaat**: goede verhoudingen (beter dan de oude fotoplaat, waar het paardenhoofd 25% te groot was), bruikbare tonen en vlakken; maar de staande dieren staan in een 'stretch'-houding (achterbenen naar achter), dus de poten van de plaat zijn niet bruikbaar als ruststand en het dij-gebied pakt makkelijk een stuk van de verre achterpoot mee.
- **Stap-platen**: houding per fase bruikbaar als controle (`plaat_vs_pop.png`), fasevolgorde niet gecontroleerd per hoef (geen nabij/ver te zien). Koe-plaat heeft de uier ook in stap, nijlpaard-plaat is een jong dier (gebruik de maten uit de bron).

## Algemene regels (voor de volgende families)
- Vormen automatisch uit een vlakke stijlplaat halen werkt sneller en blijft dichter bij de stijl dan met de hand tekenen; wel altijd: opening tegen poten, toonvlak als geheel aan één deel, lijf-groep tekenen.
- Elke grote halsbeweging (grazen, drinken, vechten) vraagt een buigzame hals (kromme), geen 2-bots-menging.
- Voorbenen die in rust gestrekt zijn: romp laten zakken in plaats van de voet te laten glijden.

## Wat (nog) zwak is
- **Ezel en muilezel**: de dij neemt nog een stukje van de schuin naar achter staande plaatpoot mee (zware 'broek'), ezelhals bij grazen dun bij de keel. Beter dan ronde 3, maar het dij-gebied verdient een eigen correctie per dier.
- **Koe liggen**: zelf gemaakt (houding uit literatuur, niet tegen een plaat gecontroleerd), hals wat recht, gevouwen voorbeen steekt iets uit. Koe en hert: lichte bult op de schoft bij kop omlaag.
- **Nijlpaard**: tonen op de flank grof, gapen goed leesbaar maar mondhoek eenvoudig; poten zijn kolommen zonder plooien.
- **Paard**: manen gekarteld (haarslierten van de plaat), oog/neusgat klein. Draf: voorbeen bij inzetten soms hoog geheven.
- Film: overgangen gang -> houding zijn mengingen zonder voet-IK (voeten schuiven kort).

## Keuring Kamiel (23 okt 2026) en correcties
Oordeel: ezel 'hoofd moet beter', paard 'hoofd mag realistischer', muilezel 'best prima', edelhert 'goed', koe 'bij grazen een hap uit zijn hoofd', nijlpaard 'mond open doen gaat mis'.

**Koppen paard/ezel/muilezel** opnieuw uit `referentie/pop/hoefdieren/koppen.png` (rij 1, zuiver profiel), via `kopUitPlaat()` in bouw.py: kopsilhouet geknipt achter de oren/keel, gelijkvormig op de pop gezet (kruin -> J.kop, neuspunt -> J.neus), tonen uit de gladgestreken helderheid in 4 klassen (zeer donker = neusgat/oorpunt, schaduw = kaakspier/onder het oog, basis = lichaamskleur, licht = snuit/oogring/glans), zodat de kop dezelfde basiskleur als het lijf heeft; kin/onderlip als apart deel `kaak`. Ezel: kop 1,25x langer (bron: kop ±0,4 x schofthoogte), oren met de hand 1,35x verlengd (de plaat sneed de punten af) met donkere punten, lichte snuit convex gesloten. Les: lichte vacht (ezelsnuit, oor-binnenkant) lijkt op een lichtgrijze achtergrond en valt weg bij een kleurafstand-drempel: gaten vullen en de snuit convex sluiten. Let op: lees plaatcoördinaten altijd via `x0 + scherm/zoom`, niet van de dichtstbijzijnde rasterlabel (het oog van het paard stond eerst 48 px te ver naar voren).

**Koe grazen ('hap')**: oorzaak = de snede hals/kop ligt achter de kruin; bij een grote kophoek t.o.v. de hals draait de kop om de kruin en opent de snede een gat tussen keel en kop (navy). Niet een clip- of maskerfout. Oplossing: een **keelkap** (ovaal binnen het silhouet over de snede, kleur van de hals bij de kop, draait met de kop mee) die vóór romp/hals/kop getekend wordt: onzichtbaar zolang er geen gat is, vult het gat zodra het opent. Getest in `koe_graas_reeks` (6 standen staan -> grazen).

**Nijlpaard gapen**: de oude onderkaak was een smal stuk silhouet onder een rechte mondlijn met het draaipunt voorin; open was er alleen een roze driehoek zonder kaak. Nu: echte onderkaak als handvorm tot het kaakgewricht (achter de mondhoek, onder het oog), mondlijn laag (mondhoek ver naar achter), mondholte van mondhoek tot lippen met donkere keel, tong op de onderkaak, lichte lippen, gebogen slagtanden (geelwit) en naar voren wijzende snijtanden in de onderkaak, kleine hoektanden boven. Gapen = kop 60° omhoog + onderkaak 125° t.o.v. de bovenkaak (de plaat toont ±100–110°, de bron noemt maximaal 150°). Getest in `nijl_gaap_reeks`.

**Algemene regels voor alle poppen** (kandidaat voor de prompt):
1. Elke deelgrens die tijdens een beweging kan openen (hals/kop, kaak, schouder) krijgt een **onderlegstuk** dat met het bewegende deel meedraait en vóór de aangrenzende delen getekend wordt. Test elke grote houding als **reeks van 6 tussenstanden** (gezoomd), niet alleen de eindstand: gaten zitten vaak halverwege.
2. Een bek die open moet: draaipunt bij het echte kaakgewricht, onderkaak als eigen gesloten vorm (niet een strook silhouet), mondholte + tanden als eigen laag tussen de kaken.
3. Koppen apart van een detailplaat maken (zuiver profiel), gelijkvormig op twee vaste punten (kruin, neuspunt) zetten; tonen uit helderheid in 3–4 klassen, gekoppeld aan de lichaamskleur.
4. Seed elke k-means (`cv2.setRNGSeed`): anders verschuiven kleuren en toonvlakken bij elke nieuwe bouw.

## Nog zwak na deze ronde
- Ezel: oor-binnenkant en snuit nog wat vlekkerig, oren bij grazen naar voren. Paard: oren klein, manen tussen de oren ontbreken.
- Nijlpaard: bovenkaak bij wijd open wat smal (de plaat heeft een zware snuit), achterkant onderkaak steekt als smalle strook uit.
- Koe: kop bij grazen klein en rond; lichte bult op de schoft blijft.

## Tweede keuring (coördinator, 23 okt 2026): tonen ontwerpen, hals als boog, nijlpaardkop
- **Tonen ontwerpen, niet uit pixels halen.** De koppen van paard/ezel/muilezel zijn nu met de hand ontworpen in plaatcoördinaten van koppen.png (`KOPONTWERP` in bouw.py): omtrek met oren + 3–4 vlakken (paard: basis, zachte kaakschaduw, smalle neusrug-glans, donkergrijze snuit, donker oor/kuif; ezel: grijs, lichte snuit + oogring, lichte oorbinnenkant, donkere oorpunten; muilezel: bruin, lichte 'meelsnuit', kaakschaduw). De vorm wordt alleen nog gelijkvormig op de pop gezet. Lijf: alleen grote, rustige toonvlakken (sterk openen/sluiten, flink vervagen, kleine vlakken weg); dunne manen van ezel en muilezel als ontworpen strook langs de kam. Nijlpaard: alle lijftonen ontworpen (3 tonen: basis, roze buikboog en halsplooien, donkere rugstreep).
- **Grazen = vloeiende boog.** Lineaire buiging over de hele hals gaf een haak; nu 68% van de draai bij de halsbasis (sstep) en 32% lineair tot het achterhoofd. Borst (onder het schoudergewricht, halsbasis) en schoft blijven bij de romp, zodat er geen strook bij de borst uitsteekt. De hals stopt bij de nieuwe koppen 3 cm eerder en zonder uitloop boven de kruin (anders staken de oude plaatoren achter de nieuwe kop uit).
- **Nijlpaardkop uit de gaap-plaat**: bovenkop = massieve snuit met neusgaten bovenop en vlezige rechte bovenlip; onderkaak = vorm van de plaat (open), in rust dichtgedraaid om het kaakscharnier (onderlip tegen bovenlip + 9° zodat hij onder de holle bovenlip schuift). Mondholte loopt langs het echte gehemelte en de binnenrand van de onderkaak met een keelboog; slagtanden (gebogen, geelwit) en snijtanden vooruit in de onderkaak, kleine tanden boven. Gapen: kop 57° omhoog, onderkaak 108° t.o.v. de rust (plaat ±85–110°).
- **Algemene regels:** (1) een kop of patroon dat Kamiel ziet wordt ontworpen in weinig vlakken; automatisch afgeleide tonen hooguit voor grote vlakken op het lijf. (2) Een hals buigt vooral aan de basis, met een zachte boog erna; test grazen tegen de grazende plaat. (3) Bij een open bek: onderkaak als eigen vorm uit een plaat met open bek en die in rust dichtdraaien, niet andersom.

## Derde keuring (23 okt 2026): koeienoog
Alles goedgekeurd behalve koe ('moet beter ogen'). Oorzaak: oog stond op de verkeerde plek (plaatcoördinaat verkeerd afgelezen, het oog zweefde vóór de kop) en was een generiek rond oogje. Nu `_koeOog`: amandelvormig groot donker oog met donkerbruine iris en liggende pupil, zachte oogkasbolling, lichtere bovenooglidplooi met donkere wimperrand en korte wimpers naar voren, licht onderooglid, twee lichtpuntjes; ook neusgat en mondlijn verplaatst. Gecontroleerd in `koe_oog` (zoom) en `koe_kop` (staan, grazen, liggen). Regel: elk dier met een herkenbaar oog (koe, paard) krijgt een eigen oogtekening; kijk altijd na of oog/neus binnen de kopomtrek vallen (zoom), plaatcoördinaten via x0 + scherm/zoom.

## Vierde keuring (koekop)
Koekop nu ontworpen als vaste vorm (`kopOntwerp` bij koe in bouw.py): plat voorhoofd en rechte neusrug, brede roze snuit, kaakhoek, rode wang met het oog op de rand van de witte bles, horizontaal uitstaand oor (donkerrood, roze binnenkant) als eigen deel boven de kop. Keel: aparte 'keelkap' onder hals en kop die maar 40% van de kopbuiging volgt (anders zwaait hij bij grazen naar achter de lucht in), hals volgt de kop bij de koe voor 95% (`kopVolg`), geen uitloop van het plaatsilhouet onder de kaak (gaf rafels en een haak). Liggen: hals minder ver omlaag (-36°), kop 58°. Regel: een onderlegstuk dat een gat moet vullen draait mee met een fractie van de beweging, niet volledig met het bewegende deel.

## Ronde 3 paardachtigen (eigen platen paard.png, ezel-muilezel.png)
- Delen en tonen overgetrokken uit de VLAKKE onderste rij (staan) via dezelfde bouw.py-straat (`plaat=`, `vlak=1`: lichte afvlakking, geen randglansfilter, 4–5 tonen; toonvlakken die ≥30% in de hals liggen horen bij de hals, zodat manen meebuigen). Kop komt nu mee uit de vlakke figuur (oog/neus van de plaat; geen extra oog getekend). Skelet geijkt op de figuur en de realistische rij met de tekstbronmaten (paard: dij 40, onderbeen 40, middenvoet 40 cm; achterbeen eerst te ver naar voren geplaatst -> 'flap' onder de buik).
- Buik: `klem` uit pop_katten (schouder/dij-punten binnen de romp volgen de romp; paard 7, ezel 5, muilezel 6 cm), romp zakt bij lopen maar 1–2 cm, weinig rol. Testvel `buik_paard` (8 fasen): buiklijn blijft vlak.
- Grazen: buig-as van de hals 14 cm naar de kam verschoven (`nekAs`), schoft minder star (`schoftVast`), kleinere keelkap; hals 50–54°, romp 9–12 cm lager, voorbeen naar voren. Testvel `vlak_<dier>_samen.png`: vlakke rij (boven) en pop op dezelfde schaal/plaats (onder).
- Nog zwak: grazende hals nog wat gekruld t.o.v. de plaat (kop dichter bij de voorbenen), kleine punt op de schoft (manenbegin), lichter dijvlak bij de muilezel hoekig, staartrand rafelig.

## Ronde 4 paardachtigen: kop 1:1 en staan als de vlakke plaat (23 okt 2026)
- Kop overtrekken: plaatuitsnede eerst gladmaken (mean-shift), tonen k-means in Lab, dan een *gladde partitie* (per toon een vervaagde kaart, argmax). Losse drempels per toon geven trappen en spikkels. Kleine uitsnede (ezel/muilezel uit de staande figuur, ±90 px) eerst 3x opschalen (`op`), anders smelten de oren samen.
- Smalle reep hals onder de keel uit de close-up: opening (schijf) op het silhouet, maar boven het achterhoofd niets openen (oren blijven).
- Oog niet uit de pixels: ontworpen oog op de plaatplek (paard 'glans', ezel/muilezel 'ring' met lichte oogring). Plaatplek altijd uit een rasteruitsnede aflezen, niet schatten.
- Bultjes en inkepingen langs snijlijnen tussen delen kwamen van de Catmull-Rom-spline die bij scherpe hoeken doorschiet: hoeken > 55 graden markeren als scherp (`hoeken()`).
- Fout gevonden: de drempel `mUp > 127` was in een commentaar beland; `mUp & pm` gaf toen bit 0 van de vervaagde waarde (rafelige randen, staart met 274 punten). Na elke bewerking van een lange regel controleren of de code niet achter `#` is geschoven.
- Poten: botlijnen eerst in het midden van de plaatpoot leggen (meten met een loodlijn: voor ~ achter), daarna profielen meten. De oude dikV 0,86 maakte de poten half zo dik als op de plaat. Eén gemeten profielset (`_VLAKPROF`) schaalt mee voor ezel en muilezel.
- Romp-opening niet over de staart heen rekenen: anders blijft de achterkant van de dij als 'romp' tot aan de hak hangen.
- Grazen zoals de plaat: voorbenen niet naar voren (dvoet), verre voorbeen naar achter (paard) of naar voren (ezel), lichaam nauwelijks lager, kop ±85 graden (bijna loodrecht). Keelgat bij een gestrekte kop: 'keelweb' (vierhoek tussen keelrand hals en kaakrand kop, per hoekpunt hals- of kopgewicht) in plaats van een keelkap-ovaal (werd een ballon). kopVolg 0,25: anders krult de hals bij het achterhoofd.
- Manen als één glad donker vlak uit de donkere pixels (grootste component). Het deel bij de halsbasis en het schouderkruis horen bij de romp (deel 'kruis', zonder omtreklijn, boven de hals): anders buigt het kruis bij grazen mee.

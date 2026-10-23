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

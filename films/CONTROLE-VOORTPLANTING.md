# Frisse controle Voortplanting na opwaardering v13 (29 okt 2026)

Gecontroleerd door een frisse controleur die het werk niet heeft gemaakt. Er is niets gerepareerd.

**Werkwijze.** Repo lokaal geserveerd (`python3 -m http.server`). Per film met Playwright 10 beelden van `#stage`, gelijk verspreid over de film (`window.__still(id, t)`), op 800 px breed tot een contactvel samengevoegd. Daarna extra beelden waar iets opviel.

- **Vragen uit:** met `?vragen=uit` het begin en einde bekeken van elk ingekort segment en van elk segment na een weggevallen vraag. Ook de woordtijden (FILMDATA `words`) doorzocht op 'Antwoord …'.
- **Console:** geen JS-fouten in alle vijf films, met en zonder `?vragen=uit`. De enige melding is een extern lettertype dat in de sandbox niet laadt (`ERR_TUNNEL_CONNECTION_FAILED`).
- **Maatstaf:** `films/BEELDAFSPRAKEN.md`.

Ernst: **hoog** = fout of lelijk zichtbaar voor leerlingen, **laag** = detail. Tijden zijn de globale filmtijd met vragen aan, tenzij anders vermeld.

---

## 1 · Van bevruchting tot baby (`1-precies-op-tijd.html`)

**Speler:** in orde.
- Afspelen en pauzeren werken (audio `s01.mp3` loopt mee).
- Een hoofdstukknop springt naar het juiste segment (hoofdstuk 5 → 4:23, `s16.mp3` speelt).
- Snelheid 1,5× werkt (`playbackRate` 1,5, de klok loopt ±1,5× zo snel).
- Vragen aan/uit: 68 → 54 items, de duur gaat van 18:55 naar 16:07, en terug naar aan werkt ook.
- `?review=1` laadt `review.js`. De balk 'Reviewstand' staat in beeld en een klik op het beeld opent het opmerkingenvak met tijd en zin.

**Navelstreng:** in s35 (placenta) en s43–s44 (bevalling) is de streng rood/blauw gedraaid en is de oude, helemaal rode streng weg. Of er twee blauwe slagaders en één rode ader zijn, is op deze resolutie niet te tellen. De code (`kleurO2: false`, `bioNavelstreng`) zegt van wel.

**Vragen uit:** geen vraag- of antwoordresten. De vraagalinea's (s07, s14, s22 …) vallen helemaal weg.

1. s13 ± 3:50–3:58 (regelkring man), en ook s43–s44 ± 13:58–14:30 (oxytocine): 'hypothalamus' en 'hypofyse' staan links náást de achterkant van de hoofddoorsnede, bij de kleine hersenen (het roze bolletje). Bij de hypothalamus en hypofyse zelf (geel, midden in het hoofd) staan ze niet. Zonder wijslijn lijkt het bolletje de hypofyse. **hoog** · **hersteld** (29 okt 2026, versie 3.0.1): labels direct bij de gele hypothalamus en hypofyse, remlijnen eromheen.
2. s16 begin ± 4:23–4:30 (begin hoofdstuk 5, 'Bij de vrouw ligt het ingewikkelder'): de grafieklijnen 'man: stabiel' en de as 'TIJD' lopen dwars door de eierstok en de grote follikel. **hoog** · **hersteld** (29 okt 2026, versie 3.0.1): grafiek rechts naast de eierstok, 'man: stabiel' in de grafiek.
3. s13 ± 3:50: het label 'testosteron' wordt doorkruist door een lijn ('testoster–on'). 'inhibine / REMT VOORAL FSH' loopt tegen 'Leydigcellen / MAKEN TESTOSTERON' aan. De curve loopt door 'instelwaarde'. **laag**
4. s20 ± 6:37 en s25 ± 8:30 (cyclusgrafiek): het lijntje van de FSH-legenda loopt door '(MODEL)' in 'SPIEGEL (MODEL)'. **laag**
5. s31 ± 10:24: 'geel lichaam / BLIJFT LEVEN · BLIJFT PROGESTERON MAKEN' loopt onder de progesteronbalk en het label 'progesteron' door. **laag**
6. s29 (zaadlozing, schaalstreep ± 2 cm): de zaadcellen in de baarmoederhals zijn enkele millimeters groot, veel te groot naast de schaalstreep, en er staat geen 'niet op schaal' bij. **laag**
7. `teller.js` heeft nog `data-duur="20"`, terwijl de film nu 18:55 duurt. Dit staat al in de lijst voor de hoofdsessie in `opwaardering-v13.md`. **laag** (bekend)

## 2 · Geslachtsorganen en puberteit (`2-geslachtsorganen-puberteit.html`)

1. s07 ± 1:18 (hypofyse vergroot): 'hypofyse / KLIER TER GROOTTE VAN EEN ERWT' ligt over het bloedvat van het steeltje. **laag**
2. s13 ± 3:03 (vwo, 'Ook je vetreserve telt mee'): het label onder het vetweefsel is nog bijna onzichtbaar (donker op donker) terwijl het woord al valt. **laag**
3. s18 ± 4:47: 'urinebuis' staat los rechts naast de penis, niet op de urinebuis. **laag**
4. s10 ± 2:10: de stem zegt 'borsten groeien en de heupen worden breder', maar in beeld staat alleen 'borsten groeien'. **laag**
5. s01 (klas): de pil 'startsein: nog niet' en het stoplicht liggen over de rand van het schoolbord. **laag**
6. Personages en organen op hun plek ✓. Geen korrel ✓. Vragen uit ✓ (s02 valt helemaal weg, en s20/s26 sluiten goed aan).

## 3 · Anticonceptie, soa's en voortplantingstechniek (`3-anticonceptie-soa-voortplantingstechniek.html`)

1. In de ondertitels, met vragen aan, staat de fonetische stemspelling: s04 'Antwoord bee.', s09 'Antwoord cee.', s13 'Antwoord aa.'. Volgens eerdere feedback klinkt 'bee' als stemspelling bovendien Engels (21 okt 2026); dat heb ik niet beluisterd. Met vragen uit vallen deze zinnen goed weg. **hoog**
2. s06 begin ± 2:00–2:05 ('Hoe betrouwbaar is een methode?'): een paar seconden helemaal leeg beeld. Pas daarna verschijnt de kop over de Pearl-index. **laag**
3. s15 ± 7:40–7:45: de stem zegt 'Alleen het condoom beschermt ook tegen soa's', maar het condoomkaartje verschijnt pas een paar seconden later. **laag**
4. s01 (huisarts): Lotte en de huisarts staan achter dezelfde balie, en de wijzende hand van de huisarts komt tot vlak bij Lotte. Dat leest wat vreemd. **laag**
5. Telpoppetjes bij '1 op de 6 stellen' zijn pictogrammen (toegestaan). Donor, jongen met telefoon en huisarts zijn castpersonages in castboekstijl ✓.

## 4 · Sekse, gender en diversiteit (`4-sekse-gender-diversiteit.html`)

1. In de ondertitels, met vragen aan, staat de fonetische stemspelling: s04 'Antwoord cee.', s08 'Antwoord aa.', s11 'Antwoord bee.' (zie film 3). Met vragen uit vallen deze zinnen goed weg. **hoog**
2. s09 ± 5:20–5:30 ('Bij andere dieren is sekse soms heel anders geregeld'): leeg beeld, alleen de pil 'bij andere dieren: anders geregeld'. De clownvissen komen pas later. **laag**
3. s08 ± 4:37 (androgeen-ongevoeligheid): 'kern' en 'receptor in de cel' liggen over organellen in het cytoplasma. De inhoud blijft binnen het membraan ✓. **laag**
4. s01 → s03 (± 0:14–0:20, vooral met vragen uit): tijdens de overgang ligt de embryolens over de vervagende personages en het echobeeld. **laag**
5. s05 ± 2:56: het kader 'XX met SRY op een X' is voor de helft leeg. **laag**

## 5 · Celdeling (`celdeling/index.html`)

1. s06, einde (de celcyclus-ring, 'De twee nieuwe cellen krijgen allebei al het DNA'): de labels 'cytokinese' en 'mitose' bovenaan de ring liggen over elkaar. **hoog**
2. e01, einde (plantencel): 'celplaat / WORDT EEN NIEUWE CELWAND' raakt de bovenrand van de groene celwand. Achter de plantencel schemert nog de vorige (dierlijke) cel. **laag**
3. s27 ('Een normale zaadcel bevrucht hem'): het rode getal '24' staat op het membraan van de eicel, en er is geen zaadcel te zien. **laag**
4. s33 (samenvatting): het eerste kaartje 'eerst kopiëren, in de interfase' heeft links een bijna onzichtbaar vormpje. **laag**
5. In de ondertitels staat 'meiose één' (ook 'profase één' in film 1), terwijl het beeld 'meiose I' zegt. Dat is acceptabel. **laag**
6. Chromosomen in palet B (vader donkerblauw, moeder zandgeel) ✓. Niets buiten het membraan ✓. Geen korrel ✓. Castpersonages (Noor, Linda, oma) op goede maat ✓. Vragen uit ✓.

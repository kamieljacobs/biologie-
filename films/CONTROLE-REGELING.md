# Frisse controle Regeling na opwaardering v13 (29 okt 2026)

Gecontroleerd door een frisse controleur die het werk niet heeft gemaakt. Er is niets gerepareerd.

**Werkwijze.** Repo lokaal geserveerd en per film met Playwright beelden gemaakt van de gewijzigde scènes (uit `bron/opwaardering-v13.md` en `bron/info.md`). SVG-films (Zenuwstelsel 1–6) via `FILM_API.renderAt(T)`, FILMDATA-films via `seekGlobal`. Per film een contactvel van 6–12 beelden, en waar nodig extra beelden op het juiste woord.

- **Vragen uit:** bij Zenuwstelsel 1–6 echt afgespeeld vanaf 1,5 s vóór elke vraag, met de ondertitels per 0,25 s uitgelezen. Bij de FILMDATA-films gekeken naar het begin van elk segment na een weggevallen vraag, en naar s12 en s17 van Zenuwstelsel 8, waar met vragen aan een pil 'antwoord b' staat.
- **Console:** geen JS-fouten. De enige meldingen zijn externe lettertypes die in de sandbox niet laden.
- **Maatstaf:** `films/BEELDAFSPRAKEN.md` en Part C van `PROMPT_v13.md`.

Ernst: **hoog** = fout of lelijk zichtbaar voor leerlingen, **laag** = detail. Tijden zijn de globale filmtijd in de vwo-stand met vragen aan.

---

## Zenuwstelsel 1 · Eén seconde

1. s11/a3/a4/a5/s61 (24–330 s): in de lens staat nog de oude lichaamsplaat (ontblote man, PNG) terwijl de fietser nu Daan is. Dit is al open vraag b2/b3 in `opwaardering-v13.md`. **laag** (bekend)
2. a4 ± 223 s: het paneel 'doorsnede van het ruggenmerg' valt over de onderkant van de kleurenlegenda ('impuls' half bedekt) en over de rand van de lens. **laag**
3. a3/a4: in de lens staan de namen 'hersenen / het beeld wordt verwerkt' en 'schakelneuron / in het ruggenmerg' klein óp het lichaam. Ze zijn slecht leesbaar op de huid. **laag**
4. s00: de bal heeft nog een gloed. Daan zit iets zwevend boven de fiets (geen zadel te zien) en de rugzak steekt als blauwe flap achter hem uit. **laag**
5. Vragen uit: geen vraag- of antwoordresten in de ondertitels. ✓

## Zenuwstelsel 2 · Het kabelnetwerk

1. s21 ± 87 s en ± 100 s: het label 'natrium-kaliumpomp' wordt bedekt door ionen ('natrium‑●●umpomp') en daarna door de ATP-chip ('Natrium-K[ATP]mpomp'). Onleesbaar. **hoog** — hersteld
2. s21/a2/s31 (100–172 s): 'kaliumlekkanaal' en 'natriumkanaal' worden bedekt door een K⁺- of Na⁺-ion dat erop ligt. In de grafiek loopt de curve door 'drempelwaarde −55 mV' en 'tijd →'. **laag**
3. a2 ± 133 s: het batterijpictogram in het vak 'membraanpotentiaal' ligt over de tekst 'binnen t.o.v. buiten'. **laag**
4. s31 ± 172 s: 'dit duurt ≈ 1–2 ms' valt op de onderrand van het grafiekpaneel. **laag**
5. Gebogen membraan: in orde (de cel ligt eronder). Vragen uit ✓.

## Zenuwstelsel 3 · De spleet

1. s00 ± 7–15 s: de lens (neus → hersenen) valt helemaal over Daan, ook over zijn gezicht. Dit is hetzelfde probleem dat in film 5 is opgelost (zoomcirkel náást het hoofd). **hoog** — hersteld
2. a1 ± 60 s (niet gewijzigd): het dendrietvoetje heeft aan de spleetkant een rechte wand en is fel paars. Dat botst met 'membraan gebogen' en 'minder paars', en film 4 heeft dit wel aangepast. **laag**
3. Vragen uit ✓.

## Zenuwstelsel 4 · Knoeien met de spleet

1. s00 ± 13–16 s: de titelvraag 'Dezelfde spleet, twee tegengestelde effecten. Hoe kan dat?' ligt bovenop de lens 'dezelfde spleet'. De lens raakt Linda in de avondhelft. **laag**
2. s00 (avond): Linda zit vrij stijf, met twee grote ronde handen op de knieën. Het glas staat los van haar op de armleuning. Acceptabel. **laag**
3. a4 ± 265 s: in het vakje 'bloed | hersenen' liggen 'dopamine' en 'levodopa' en een stip over elkaar. Het vakje raakt de ondertitel. **laag**
4. Gebogen membraan van de volgende cel ✓. Vragen uit ✓ (geen 'Het goede antwoord is B.').

## Zenuwstelsel 5 · Het hoofdkantoor

1. s00 ± 8–12 s: de kippenvel-inzet zweeft als losse cirkel links bij het raam, zonder verbinding met Noors arm. Het is niet te zien dat het haar arm is. **laag**
2. Noor naast het aanrecht en de radio: maten kloppen. De hersenlens staat nu naast het hoofd ✓. Vragen uit ✓.

## Zenuwstelsel 6 · Leren en onthouden

1. s70 ± 411 s: de cirkel met het hersennetwerk staat óp het hoofd en gezicht van de fietser. **hoog**
2. s00 en s70 (niet gewijzigd): de fietsers zijn zelfgetekende figuren, geen castpersonages. Dat botst met de beeldafspraak. **laag** (buiten deze ronde)
3. a1 ± 66 s: het label 'calcium' ligt over de calciumstippen. **laag**
4. Herder (s22) en etensbak op goede maat ✓. Eindkaart 'Volgende film: Slaap' ✓. Vragen uit ✓.

## Zenuwstelsel 7 · Slaap

1. s11 ± 225–240 s: de melatonine (keten van zeshoekjes) stroomt vanaf de hypofyse/hypothalamus de hals in, niet vanuit de pijnappelklier, terwijl de stem zegt 'laat de klok de pijnappelklier het hormoon melatonine afgeven'. Inhoudelijk misleidend; graag nakijken. Melatonine als keten oogt bovendien als een eiwit, terwijl het een klein molecuul is. **hoog**
2. s15 ± 343–364 s, paneel 'opruimen': de muis ('vooral bij muizen onderzocht') staat op dezelfde schaal tussen de hersencellen. Dat is verwarrend. **laag**
3. s07, s10, s11, s14: namen als 'hersenstam / REMT DE MOTORISCHE NEURONEN', 'oogzenuwen kruisen', 'pijnappelklier' (paars op roze) en 'hippocampus' staan op de hoofddoorsnede, met weinig contrast. **laag**
4. s13 (vwo): de kern is nog fel paars en 'klokeiwitten' is erg vaag. **laag**
5. Personages s01, droom met herder in s05 ✓. Vragen uit ✓.

## Zenuwstelsel 8 · Zintuigen

1. s18 ± 467 s: twee labels boven Noors hoofd liggen precies over elkaar ('stop je …' en '… → duizelig'). Onleesbaar. **hoog**
2. s10/s11: 'holle lens' is erg klein. 'gele vlek / VEEL KEGELTJES' ligt over de oogrand. **laag**
3. Vragen uit: de pil 'antwoord b' in s12 en s17 is weg ✓. Noor in s01 (maat en kleur jas) ✓.

## Hormonen 1 · Post voor iedereen

1. s08 ± 155 s: 'eilandje van Langerhans' in de zoomcirkel ligt over de gele cirkel. **laag**
2. s16 (vwo) ± 350 s: 'RECEPTOR IN DE CEL' ligt over de kern, en de kern is fel paars. **laag**
3. s18 (vragen uit): de zin 'Het gaat om de werking, niet om de naam.' leunt licht op de weggevallen vraag. **laag**
4. Lichaam met klieren op hun plek, zoomcirkel naast het hoofd, gebogen membraan, enzymen als kluwen ✓.

## Hormonen 2 · Suiker in balans

1. s01 ± 15 s: de glucosemeter (telefoon) is bijna zo groot als Sanne en ligt over haar arm. Sanne staat met wijd gespreide armen, en haar voeten zweven onder het bureau. Dit botst met de afspraak over realistische maten. **hoog**
2. s09 ± 190 s: insulinereceptoren of insulinemoleculen zweven los linksboven de cellen, niet op het membraan. De vetcel is niet te onderscheiden van de lever- en spiercel (geen vetdruppel). **laag**
3. s22 ± 517 s: Noor loopt zonder grond los onder de grafiek. **laag**
4. s06/s16: 'SENSOR + REGELCENTRUM' en 'EFFECTOR' worden doorsneden door de pijlen. **laag**
5. Vragen uit, s09: begint met 'Insuline breekt niets af.' Kort en zonder de vraag wat abrupt. **laag**
6. Gebogen membraan met GLUT4 ✓. Geen korrel buiten de cel ✓.

## Hormonen 3 · De baas van de klieren

1. s06 ± 104 s (20%): het beeld is bijna leeg, alleen 'hypofyse' met een vage tekst, terwijl de stem 'Ze werken op weefsels zelf' zegt. Mogelijk een te trage opbouw. **laag**
2. s19 ± 430 s: de groeihormoon-vijfhoekjes komen bij neus en mond uit het hoofd, niet via het bloed. **laag**
3. s08: 'schildklier / VORM VAN EEN VLINDER' staat op de huid van hals en schouder. **laag**
4. Schildklier op zijn plek, hoofddoorsnede, Erik in s15 ✓.

## Hormonen 4 · Stress

1. s01 ± 3 s: de toetsweekkaartjes (ma–vr) liggen bovenop het raam. **laag**
2. s06 ± 103 s: het label 'bijniermerg' ligt op het lichaam (arm en buik). **laag**
3. s04 ± 54 s: 'merg / BINNENIN' staat op de bijnierdoorsnede zelf. **laag**
4. Noor aan de bank en in bed, lichaam met zoomcirkel naast het hoofd, beeldbankobjecten ✓. Vragen uit ✓.

## Hormonen 5 · Water in balans

1. s04 ± 57 s: het label 'lever' is half verdwenen achter de arm, precies terwijl de stem 'Ureum komt uit je lever' zegt. 'nieren / ACHTER IN JE BUIK' ligt over het lichaam. **hoog**
2. s04 ± 79 s: bij de urineleider staat een vage, half doorzichtige tekst over de nier. **laag**
3. s15 (vwo) ± 395 s: 'pompt zout naar buiten / laat geen water door' wordt doorsneden door de lijn van de verzamelbuis. **laag**
4. s15 ± 376 s: de cel van de verzamelbuis is een afgeronde rechthoek met vrijwel rechte zijden, en de kern is fel paars. **laag**
5. Noor met fles, nier uit de beeldbank ✓. Vragen uit ✓.

---

## Samenvatting hoog

| Film | Plek | Probleem |
|---|---|---|
| Zenuwstelsel 2 | s21 ± 87–100 s | label natrium-kaliumpomp onleesbaar onder ionen en ATP |
| Zenuwstelsel 3 | s00 ± 7–15 s | lens over Daans gezicht |
| Zenuwstelsel 6 | s70 ± 411 s | hersencirkel over het gezicht van de fietser |
| Zenuwstelsel 7 | s11 ± 225–240 s | melatonine lijkt uit de hypofyse te komen, niet uit de pijnappelklier |
| Zenuwstelsel 8 | s18 ± 467 s | twee labels over elkaar boven Noors hoofd |
| Hormonen 2 | s01 ± 15 s | glucosemeter op onrealistische maat over Sanne, vreemde houding |
| Hormonen 5 | s04 ± 57 s | label 'lever' verdwijnt achter de arm terwijl de stem het noemt |

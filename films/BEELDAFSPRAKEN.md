# Beeldafspraken voor alle films

Algemene feedback van Kamiel die voor (bijna) elke film geldt. Lees dit vóór het bouwen van een nieuwe film en bij het aanpassen van een bestaande.

## Achtergrond en vlakken
- **Geen korreltjes/stippen op de achtergrond** (15 okt 2026): de grain-laag is storend. Weg of heel rustig.
- **Binnenkant van een cel (cytoplasma)**: een klein beetje textuur is goed — het laat zien dat cytoplasma iets is met opgeloste deeltjes — maar niet te veel. Weinig, kleine, rustige deeltjes; geen druk stippelpatroon.

## Labels
- **Geen wijslijnen naar begrippen** (15 okt 2026, Kamiel: "die lijntjes naar begrippen moeten sowieso weg, is te vaak fout"). De naam van een onderdeel staat **direct naast of op het onderdeel**, goed geplaatst, eventueel met een donkere rand rond de letters voor leesbaarheid. Geldt voor alle films; bestaande films worden reeks voor reeks omgezet (Celorganellen als eerste, met `naamBij()`).
- Labels mogen niet over andere labels of over belangrijke delen van de tekening vallen; controleer dit op de contactbladen.
- **Vragen uit = geen verwijzing naar de vraag in beeld** (22 okt 2026): geen "antwoord a" en dergelijke; `scripts/antwoordtekst.py` regelt dat voor tekst via `tag`/`regel`. Schrijf een antwoordtag in nieuwe films als "antwoord a: <inhoud>", zodat bij Vragen uit de inhoud blijft staan.

## Moleculen en celonderdelen
- **mRNA** is een dunne, kronkelende, sliertige enkele streng — geen staafje of blokje.
- **Eiwitten** zijn geen bolletjes: teken ze als een keten (kralenketting) die zich opvouwt tot een kluwen. Laat processen als vouwen en het vastmaken van suikerketens (vertakte zijtakjes) echt gebeuren in beeld.
- **Kleine moleculen** krijgen een herkenbare structuurvorm, geen stipjes of bolletjes: glucose als zeshoekige ring; bij afbraak breekt die ring in kleinere stukken (twee ketentjes van drie C: pyrodruivenzuur), en uiteindelijk CO₂ en H₂O als kleine eigen vormpjes. **ATP** als herkenbaar molecuul: base + suiker + een staartje van drie fosfaatgroepen; bij gebruik springt de laatste fosfaatgroep eraf (ATP → ADP + P), bij opladen komt hij er weer aan.
- **Inhoud blijft binnen het membraan** (Kamiel 23 okt 2026): plasmiden, organellen, ribosomen en DNA liggen altijd helemaal binnen het celmembraan; niets steekt over de rand, anders lijkt het alsof het naar buiten gaat. Teken de inhoud geclipt binnen de binnenste membraanlijn en kies de grootte zo dat het past. Iets dat de cel echt verlaat (exocytose, plasmide via een pilus) laat je zichtbaar door het membraan gaan.
- **Celmembraan** is gebogen: een cel is rond. Ook bij een uitsnede een stukje van een cirkel, geen rechte lijn.
- **Processen in de kern**: maak altijd zichtbaar welk proces het is. DNA-replicatie (alles kopiëren vóór de deling) en transcriptie (één werkkopie van één gen) krijgen elk een eigen beeld, label en kleur.

## Gesproken tekst
- **Niet 'Voor vwo …' zeggen** (15 okt 2026): de kijker kiest zelf havo of vwo in de speler en het vwo-blok is op het scherm gemarkeerd. Een vwo-blok begint gewoon met de inhoud. (Bestaande films: 74 keer in 40 films; weghalen staat op de bouwlijst.)

## Inhoud tussen films
- Herhaal geen leerstof die een andere film al als hoofdthema heeft (bv. levenskenmerken staan in *Van molecuul tot biosfeer*, niet opnieuw als rode draad in *Celorganellen*). Een korte verwijzing mag.

## Personages
- Gebruik de vaste personages uit `personages/lib_cast.js` (castboek: `personages/index.html`).
- **Nieuwe caststijl met contourlijnen** (Kamiel 25 okt 2026, na de proef met Maya `personages/en/proef-maya.html`: 'met lijnen beter'): personages worden rijker getekend, eerst ontworpen als ElevenLabs-castvel, dan in code (skelet, delen als één silhouet, één schaduwtint, dunne donkere contourlijn in een donkere tint van de eigen vulling). Geldt alleen voor personages; de rest van het beeld blijft zonder omlijning (Part C). Eerst voor de Engelse cast (`personages/en/`); de Nederlandse cast volgt in dezelfde stijl (castvel `personages/vellen/vel-nl-1.webp`, 25 okt 2026, nog te keuren). Bestaande films krijgen de nieuwe cast pas als ze toch verbeterd worden.
- **Geen grijze plaatsvervanger-poppetjes** (rond hoofd met smiley, blokvormig lijf, zonder huidskleur of kleding): waar een mens in beeld komt, altijd een van de vaste personages uit het castboek. Geldt ook voor bestaande films: bij een herziening de poppetjes vervangen (Kamiel, 20 okt 2026).
- Aanvulling (20 okt 2026): een mens in beeld (leerling, proefpersoon, patiënt, opa, kind, baby) is altijd een vast personage uit het castboek, met gezicht, haar en kleding zoals in de cast. Ook **kinderen en baby's**: Teun (`'kind'`, ± 6 jaar) en de baby (`'baby'`). Geen zelfgetekende gezichtjes en geen half-aangepaste varianten (een personage met andere verhoudingen of overgekleurd). Organen mag je in of op de romp tekenen (een 'kijkje in de buik'). Uitzondering: telpoppetjes in een grafiek (bv. 100 mensen, 3 krijgen longkanker) blijven eenvoudige pictogrammen.
- Een vast personage mag terugkomen in een film (bv. Opa Henk in de opening én als patiënt), zodat de kijker hem herkent.
- **Vaste rollen** (22 okt 2026): kies personages uit `personages/ROLLEN.md` (familie van Noor met namen, 'jij' in de onderbouw = Lotte, patiënt = Opa Henk, verdachte = Erik, tweeling = Daan en Thijs …). Zet niemand in een rol die botst met zijn vaste achtergrond.
- **Lopen, rennen en zijaanzicht** (21 okt 2026, Kamiel: 'betere animatie voor dit soort poppetjes'): wie loopt, rent of van opzij in beeld is, teken je met het zijaanzicht uit het castboek: `persoon(ctx, id, x, y, h, { zij: true, kijk: 1|-1, gang: 'loop'|'ren', t })`. Een personage dat rent, rent ook echt (knieën, armen, voorover leunen) en beweegt over het beeld; geen stilstaand figuur dat wordt verschoven. Een rennend personage in vooraanzicht leest als dansen: gebruik daarvoor altijd het zijaanzicht.
- **Herkenbare menselijke momenten** (22 okt 2026, Kamiel n.a.v. een film van zijn broer met twee ouders en een kindje: 'schattig', hij waardeerde de video meer). Waar het past, krijgt een film één of twee warme, herkenbare momenten met mensen. Regels:
  - **Het moment draagt het concept.** Het gezin, de ouder of het kind is het voorbeeld zelf (baby bij voortplanting, stamboom bij erfelijkheid, samen ontbijten bij voeding, ziek kind met ouder bij afweer, puber bij hormonen, ouder die een baby voedt bij oxytocine of hechting). Kun je het moment weglaten zonder dat de uitleg iets verliest, dan hoort het er niet in: losse versiering leidt af (seductive details).
  - **Kort en spaarzaam**: een paar seconden, vaak als opener of als terugkeer aan het eind.
  - **Warmte zit in kleine handelingen** (hand vasthouden, kind op schoot, samen eten); de stem blijft zakelijk, niet sentimenteel.
  - **Wie**: castpersonages voor wie een rol heeft of terugkomt (familie van Noor, dokter Kim, zie `personages/ROLLEN.md`). Maar de personages leven in een wereld die ze niet allemaal kennen: ook **figuranten** mogen, bv. een vreemde ouder met kind in de wachtkamer, een gezin aan de overkant, een opa met een baby op een bankje. Figuranten krijgen geen naam in de film, maar wel de castboekstijl (huidskleur, gezicht, kleding, realistische maten), dus nooit grijze poppetjes. Gebruik de figuranten uit het castboek en zet er nieuwe figuranten bij (ook ouders, kinderen, baby's) als die nodig zijn, in plaats van een half-aangepast vast personage.
  - **Gezinsvormen variëren**: niet steeds vader-moeder-kind, ook één ouder, twee moeders of vaders, opa en oma, twee huizen.
  - **Voorzichtig bij gevoelige onderwerpen** (erfelijke ziekte, miskraam, ivf): licht en respectvol, of geen moment.
  - **Niet forceren op microniveau** (celorganellen, DNA-replicatie): hooguit een korte opener die naar de mens verwijst.
  - Bij elk storyboard (en bij een verbeterblad) de vraag stellen: is hier een herkenbaar menselijk moment dat het concept draagt?
- **Lichaam met organen** = een castpersonage met `personages/lib_anatomie.js` (realistisch, organen op hun echte plek), nooit meer een grijs dummy-lichaam.

## Decors (achtergrond van de werkplek)
- **Een decor alleen onder scènes die zich echt op die plek afspelen** (Kamiel 24 okt 2026, n.a.v. een testdecor 'kas' onder beelden uit andere films: "het lijkt nu alsof die plekken in de kas zijn"). De kweker bij de tomatenplant staat in de kas, de bodemscène op de akker, de veehouder in de stal. Schema's, grafieken, cellen en moleculen blijven op het gewone navy (`bg(ctx,'schema')`), anders lijkt elke uitleg zich op die plek af te spelen. Een decor is een ankerpunt in de echte werkplek van het vak (vooral bij de opener en bij momenten mét mensen), geen versiering.
- **Stijl = de film zelf, niet de schilderstijl**: vlak vector in schema-look, navy `#1A2740`, gedempte vlakke kleuren uit het filmpalet, geen penseel, foto, 3D, korrel, schaduw of gloed, geen mensen of dieren (die tekent de film), geen tekst, rustig vlak in het midden, niets belangrijks in de onderste 18%. De geschilderde stills (gpt-image-2.5-sunburst) vallen uit de toon bij de animaties en zijn niet voor decors.
- **Maken**: ElevenLabs brand kit 'Biologie bij Kamiel · filmdecor' (palet + stijlregels; gedeeld door beide Claude-accounts), model recraft-v4.1, één variant (±240 credits), flow 'Landbouw · filmdecor (achtergronden)' https://elevenlabs.io/app/flows/cMT4epIEjMJi0sraRQzk. In de film het decor op ±60% sterkte over het navy, zodat labels en kaartjes leesbaar blijven; vraag in de prompt om de vloerlijn op ±80% van de hoogte (de eerste test lag op 60%, personages leken te zweven).

## Aarde
- **Gebruik de echte wereldbol** (22 okt 2026): `aarde()` uit Van molecuul tot biosfeer (continenten uit Natural Earth, wolken, belichting), geen blauwe cirkel met groene vlekken.

## Processen in beeld
- **Mooier animeren, niet alleen kloppen** (Kamiel, 20 okt 2026, n.a.v. *De eerste verdediging*): de inhoud mag goed zijn, maar schema-achtige plaatjes (een rondje met een streepje als 'thermostaat', een groene ovaal met bolletjes als 'lymfeknoop') zijn niet genoeg. Teken een herkenbaar ding en laat het proces echt gebeuren. Voorbeelden uit die film: thermostaat = ronde knop met schaal 35–42 °C, gouden wijzer (instelling) en koraal boog (lichaamstemperatuur) die meeloopt met de grafiek, plus hersenen in zijaanzicht met een gloeiende hypothalamus; lymfeknoop = boonvorm met kapsel, follikels en uitgaand lymfevat, de dendritische cel reist zichtbaar door een lymfevat naar binnen en één T-cel met de passende receptorvorm komt erop af en licht op.
- **Antigenen liggen óp het oppervlak en staan loodrecht naar buiten** (20 okt 2026): basis van het vormpje op de wand, punt naar buiten, rondom de hele cel of bacterie (ook op de kopse kanten), nooit scheef of los ernaast. Helper: `antigeen(ctx, x, y, nx, ny)` in `films/afweer/1-de-eerste-verdediging/bron/src/scenes.js`.
- **Eén tekstbalk tegelijk**: als de bovenste tekstbalk wisselt, eerst de oude weg en dan de nieuwe (helper `wissel()` in dezelfde scenes.js); geen twee balken die over elkaar heen faden.
- Deze verbeteringen gelden voor veel films: bij een herziening de plaatjes van die soort ook aanpakken.
- **Exocytose / endocytose:** laat het blaasje echt versmelten met het celmembraan (aanleggen, membraan opent, blaasje wordt deel van het membraan, inhoud naar buiten), niet een blaasje dat verdwijnt (15 okt 2026).
- **DNA in de kern** als losse, zacht kronkelende draden (chromatine), geen zigzag- of veerpatroon (15 okt 2026).

## Onderbouw (kerndoelen)
- In onderbouwfilms nergens havo, vwo of vmbo noemen, niet in beeld, niet in de stem en niet in het docentdeel: in de onderbouw is dat niet belangrijk (Kamiel, 16 okt 2026).
- De niveauknop heet **Basis** / **Uitdaging**; het extra blok heet 'uitdaging' (in beeld, hoofdstukmenu, begrippen, transcript, checkvragen). Een gesproken aankondiging als "Voor havo en vwo gaan we nog een stap verder." niet meer opnemen; in bestaande films knipt de speler hem weg.

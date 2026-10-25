# Frisse beeldreview: Celdeling 2.0 (Voortplanting), 26 okt 2026

Reviewer: frisse helper (heeft de film niet gemaakt). Getoetst aan prompt v10 Part C (C1, C5, C8, C9, C10 en C10.7), `films/BEELDAFSPRAKEN.md`, `remake-2026-10/script_v2.md`, `storyboard.md` en de besluiten van 25 okt 2026 (t1–t4).

Werkwijze: alle 185 stills in `bron/review_stills/` bekeken, met per still de zin die dan klinkt (uit `stem/woordtijden/`). Waar iets onduidelijk was: uitsneden op 3–6× en extra stills uit de film zelf (lokaal geserveerd, `window.__still(id, t)`, 960×540). Daarnaast heb ik elke `q.at()`/`q.on()` in `scenes_cd2.js` naast de woordtijden gelegd: `q.at` zoekt een stukje van een woord, dus een cue kan op het verkeerde woord vallen (zie MOET 10–12).

Tijden: alinea-id + lokale tijd in die alinea (s). Pixelmaten op het podium van 1920×1080 (de stills zijn half zo groot).

**Totaal: 17 MOET, 20 KAN.**

## Wat goed is

- Kleurafspraak vaderskant teal / moederskant oker loopt de hele film consequent door, ook in het karyogram (XY: X oker van moeder, Y teal van vader, Y kleiner) en bij trisomie 21 (het extra chromosoom is oker, past bij de eicel met 24).
- Centromeer vóórop in de anafase: vanaf ±5,4 s in s17 gaan de chromatiden als bogen met het kinetochoor vooraan naar de polen (maar zie MOET 4 voor het moment daarvóór).
- Meiose I in s23: paren tegen elkaar, als paren in het equatorvlak (gouden stippellijn), dan gaan hele paren uit elkaar; links lang-vader + kort-moeder, rechts andersom: onafhankelijke verdeling zichtbaar. Eén crossing-over per paar (besluit t4).
- n/2n en chromatiden kloppen in alle tellingen: s15 (4 · 8 en 46 · 92), s19 (dochtercel 4/46, één chromatide per chromosoom), s21 (2n = 46, n = 23), s24 (na meiose I: 2/23, nog twee chromatiden), s25 (p → 2p → p → ½p), s26 (2² in het model, 2²³ ≈ 8 miljoen), s29 (tabel), s35.
- Cohesine is goud-grijs (`C.grain`), niet oker (besluit t3): e01 en x02. In x02 worden de ringen bij 'slijten' zichtbaar dunner (jong/oud).
- Linda-tijdlijn in x01 klopt met LEVENSLOOP: Ria zwanger ± 45 jaar geleden (Linda is 44), eisprong op Linda's 27e ± 17 jaar geleden (Noor 16, Linda 28 bij de geboorte), balk 'stil · ± 27 jaar'; x02 zegt 'ruim 27 jaar' (besluit t2). De onderlinge afstanden op de tijdlijn zijn ongeveer evenredig.
- s22: gezichten van Rachid en Linda heel, organen in zoomcirkels náást het lichaam (BEELDAFSPRAKEN 25 okt 2026). Personages zijn castpersonages (Noor, Rachid, Linda, Ria).
- e01: goede en foute aanhechting, spanning met pijlen, los kinetochoor als koraal knipperende ring; e03: trekdraad als rijtje eiwitblokjes dat bij het kinetochoor afbreekt.
- Vraagkaarten, hoofdstukkaarten (met 'Deel 2 · Meiose', besluit t1) en eindkaart volgen C5.

## MOET

### MOET 1 · s16 (13,3–22,7 s) · 'spoelfiguur' zonder trekdraden
- Zag: bij 'Vanuit de twee polen van de cel groeien trekdraden: samen heten ze de spoelfiguur' staan alleen de twee polen in beeld, met het label 'spoelfiguur · trekdraden vanuit de twee polen'. De draden verschijnen pas als het kernmembraan weg is (`mitoseCel`: draden alleen bij `nm > 0.6`), dus ná 22 s. Het label wijst ±9 s naar iets dat er niet is.
- Moet: vanaf 'trekdraden' (15,5 s) draden laten groeien vanuit beide polen (buiten de kern, zoals in het echt in de profase), aanhaken pas na 'kernmembraan'. Label pas tonen als de draden er zijn.
- Stills: `s16_017.35`, extra 18,5 en 21,5 s.

### MOET 2 · s13 (17,3–20 s) · 'X-vorm' is geen X
- Zag: bij 'Zo krijgt het chromosoom een X-vorm' staat het grote chromosoom als twee rechte, over de hele lengte tegen elkaar liggende staven ('||' met een stip). Juist hier leert de leerling het woord dat de rest van de film als telwoord dient (q14, s15).
- Moet: de zusterchromatiden bij het centromeer laten vastzitten en de armen boven en onder licht uit elkaar laten wijken, zodat het een herkenbare X is (zoals de kleine `cdChromosoom` in s13 vanaf 32,8 s al half doet).
- Still: `s13_018.96`.

### MOET 3 · e03 (0–12 s) · 'Zonder trekdraden' terwijl alle trekdraden vastzitten
- Zag: de overzichtscel (`mitoseCel` met `sp: 1, nm: 1`) tekent aan elk chromosoom trekdraden van beide polen, terwijl de stem zegt 'Zonder trekdraden is elk kinetochoor los'. Het beeld zegt het omgekeerde van de stem.
- Moet: in deze cel geen draden aan de kinetochoren (alleen de polen, eventueel korte afgebroken stompjes), chromosomen niet in het equatorvlak. Dat sluit ook aan bij het gif uit e01.
- Stills: `e03_002.31`, `e03_006.94`.

### MOET 4 · s17 (±3,5–5,2 s) en s24 (±12–14 s) · bij het uiteengaan kruisen de lange armen
- Zag: als de centromeren splitsen, wijken de zusterchromatiden bij het centromeer uiteen maar kruisen de lange armen elkaar onderaan (een kleine X onder elk chromosoom). Elke chromatide steekt dus even door zijn zuster heen; het leest als een crossing-over in de mitose. Hetzelfde in de anafase II van s24.
- Moet: in `cdChromosoom`/`cdEen` de armen achter het eigen centromeer laten slepen zonder de middellijn te kruisen; de 6 tussenstanden op het testvel controleren (C10.1).
- Stills: `s17_004.74` (uitsnede: armen kruisen), extra s24 13,0 s.

### MOET 5 · s17 (±6–24 s) · aan de polen overlappen de chromatiden; tellen kan niet
- Zag: aan elke pool liggen de vier chromatiden zo dicht op elkaar dat ze één doorlopende zigzagketting teal-oker-teal-oker vormen; de twee gouden ellipsen van 'ons paar' overlappen elkaar grotendeels. Juist bij 'Kijk naar ons paar' en 'Even zitten er dus tweeënnegentig chromosomen in één cel' moet je per pool vier losse chromosomen kunnen tellen.
- Moet: in `mitoseCel` de y-plekken in de anafase niet samendrukken (`MY[i] * 0.55` → ±0.9) of de chromatiden korter tekenen; één ellips per gevolgde chromatide die niet over de andere valt.
- Stills: `s17_014.23`, `s17_023.72`.

### MOET 6 · s17 (±28–36 s) · DNA-draad steekt buiten de nieuwe kern
- Zag: in de telofase en cytokinese steekt in beide dochterkernen de bovenste teal draad over het kernmembraan naar buiten.
- Moet: de ontrollende draden clippen binnen de kern of kleiner tekenen (C10.4, BEELDAFSPRAKEN 'inhoud blijft binnen het membraan').
- Stills: `s17_033.21` (uitsnede), extra 29,5 s.

### MOET 7 · s23 (vanaf ±8,8 s), s27/s29 (paneel meiose I) · crossing-over op de buitenste chromatide
- Zag: bij het lange paar heeft de teal homoloog het geruilde stuk op de binnenste chromatide, maar de oker homoloog op de buitenste. Bij het korte paar is het andersom (oker buiten, teal binnen). Zo wisselen chromatide 2 en 4 stukken uit dwars door chromatide 3 heen. De opdracht vraagt: alleen de twee binnenste chromatiden gemengd, één per homoloog.
- Oorzaak: in `meioseCel` (`segL`/`segR`) en `drieMetafasen` (k === 1) hangt de kant van het geruilde stuk af van welke homoloog links ligt; de commentaarregel 'de binnenste krijgt het geruilde stuk' klopt alleen voor de linker vader-homoloog. In s33 (paneel 3) en x01 (oöcyt) staat het wél goed.
- Moet: het gemengde stuk altijd op de chromatide aan de kant van de homoloog (links liggende homoloog: rechter chromatide; rechts liggende: linker), in beide paren en in het meiose-I-paneel van s27/s29.
- Stills: `s23_016.61` (uitsnede), `s23_023.25`, `s29_003.86`.

### MOET 8 · s24 (0–11 s en 11–15,5 s) · chromosomen liggen kop aan staart tegen elkaar
- Zag: in beide cellen na meiose I raakt het lange chromosoom het korte (de gouden ellips van het lange loopt over het korte). In meiose II liggen de lange en korte chromatide in één lijn op elkaar aangesloten: je ziet per kant één lange draad met drie kleurbanden in plaats van twee chromosomen. 'Drieëntwintig chromosomen: van elk paar één' is zo niet te zien.
- Moet: lang en kort naast elkaar of met duidelijke ruimte tussen (y 400/550 → bv. 380/600, of ernaast), ellips alleen om het lange.
- Stills: `s24_002.84` (uitsnede), `s24_014.22` (uitsnede).

### MOET 9 · s24 (15,7–28 s) · chromosomen groter dan de kop van de zaadcel en erbuiten
- Zag: bij 'vier zaadcellen' staan op elke zaadcelkop twee gekleurde staafjes die groter zijn dan de kop en er boven en onder uitsteken.
- Moet: de staafjes binnen de kop clippen of de kop vergroten (desnoods een zoomcirkel naar één kop); 'elk een andere mengeling' moet ook leesbaar blijven (C10.4).
- Still: `s24_019.91` (uitsnede).

### MOET 10 · s21 (12–19 s) · haploïde cel 7 s te vroeg (cue-fout)
- Zag: de haploïde cel met 'n = 23' verschijnt tegelijk met de diploïde cel, bij 'Een gewone lichaamscel heeft paren chromosomen'. Oorzaak: `q.at('geslachtscel')` valt op 'geslachtscellen' (0,2 s); de fade start daardoor bij het overgaan naar dit beeld.
- Moet: `q.at('geslachtscel', 2)` (19,0 s, 'Een geslachtscel heeft van elk paar …').
- Stills: `s21_012.74`, `s21_017.84`.

### MOET 11 · s29 (5,6–21 s) · vergelijkingstabel te vroeg, meiosekolom vóór 'Meiose:' (cue-fout)
- Zag: bij 'Bij de mitose en bij meiose twee liggen de chromosomen elk voor zich' (5,6–11,6 s) zijn de drie metafasepanelen al weg en staat de tabel er, met de hele meiosekolom ingevuld; de mitosekolom vult daarna per regel. Oorzaak: `q.at('Mitose:')` en `q.at('Meiose:')` (de dubbele punt valt weg) vallen op 'mitose' (6,1 s) en 'meiose' (0,6 s).
- Moet: `q.at('mitose', 2)` (12,2 s) en `q.at('meiose', 3)` (20,7 s). Dan blijven de panelen staan bij de zin over 'elk voor zich' en vult elke kolom op zijn eigen woord.
- Still: `s29_011.59`.

### MOET 12 · x02 (15,4–19 s) · zaadcel die binnendringt is nooit te zien (cue-fout)
- Zag: bij 'Pas als een zaadcel binnendringt, maakt hij de meiose af' staat al het cohesinepaneel. Oorzaak: `q.at('Al')` valt op 'als' (15,7 s) in plaats van 'Al die jaren' (19,1 s), dus de zaadcel-animatie (`m2` bij 'Pas') wordt meteen weggefade.
- Moet: `q.at('jaren')` of `q.at('Al', 2)`.
- Still: `x02_016.80`.

### MOET 13 · x02 (10,5–19 s) · poollichaampje ver buiten de eicel
- Zag: het poollichaampje zweeft rechtsboven los in de ruimte, buiten de zona en buiten de corona radiata. In het echt ligt het onder de zona, in de spleet tegen de eicel (C10.4: 'eicel = zona, spleet met poollichaampje, cel'). Het label 'stil in meiose II' valt bovendien over de corona.
- Moet: poollichaampje klein tegen het celmembraan binnen de zona, met het chromosoom dat erin gaat zichtbaar erin (nu is het leeg); label rechts buiten de corona.
- Stills: `x02_010.08`, extra 12,8 en 14,5 s.

### MOET 14 · s06, s26, s33, x01 · beeld op t = 0 (bijna) leeg
- s06 (0–3,8 s, direct na hoofdstukkaart 2): alleen een wit stipje op leeg navy; de ring komt pas bij 'celcyclus'.
- s26 (0–3,2 s): alleen de metaregel 'model met 2 paren …' bij 'Welk chromosoom van een paar naar welke kant gaat'.
- s33 (0–4,8 s, na hoofdstukkaart Recap): een pil die bij 'verdeelt' (2,5 s) alweer verdwijnt; van ±2,9 tot 4,8 s helemaal leeg bij 'Een cel verdeelt zijn DNA eerlijk door eerst te kopiëren'.
- x01 (0–3,2 s): alleen de pil; de zaadcellen komen pas bij 'Zaadcellen'.
- Moet: op t = 0 al gevuld (C10.7): s06 de ring (grijs) meteen tonen; s26 het gepaarde lange en korte paar al in beeld; s33 paneel 1 meteen of de pil laten staan tot paneel 1; x01 de zaadcellen meteen.
- Stills: `s33_003.61`, extra s06/s26/x01 op 0,05 s.

### MOET 15 · s22 (3,7–17,7 s) · bijschriften over Rachid en Linda; teelbal op buikhoogte
- Zag: 'TEELBAL · DOORSNEDE' begint over Rachids schouder en shirt, 'EIERSTOK · DOORSNEDE' over Linda's arm; de wijslijnen lopen door de tekst. De wijslijnen van de teelbal komen samen midden op Rachids buik (derde knoop), ver boven de plek van de teelballen.
- Moet: bijschrift onder of naast de cirkel op een plek zonder persoon (de cirkels iets naar rechts, of het bijschrift boven de cirkel); het bronpunt van de teelbal in de lies, van de eierstok in het bekken onder de navel (C10.5: plek uit een anatomische bron).
- Still: `s22_016.85` (uitsnede).

### MOET 16 · s15, s19, s24 · tellerkader tegen de rechterrand
- Zag: het kader 'model / mens' (`cdTeller(…, 1560, 150)`) loopt tot ±20 px van de rechterrand (C10.7: ≥ 60 px).
- Moet: x 1560 → ±1480 (of het kader smaller).
- Stills: `s15_004.00`, `s19_000.78`, `s24_002.84`.

### MOET 17 · v01 (14,9–34,8 s) · bladluis niet volgens C10.6; bijschriften over de paneelranden
- Zag: de bladluis is een ovaal met kop zonder borststuk; de 'poten' zijn lijnen die dwars door het lijf lopen, de jongen zijn ovaaltjes zonder poten. Het storyboard vroeg uitdrukkelijk 'nalopen tegen C10.6: zes poten, drie lichaamsdelen'. De metaregels 'GIST · ZOETWATERPOLIEP' en 'JONGEN ZONDER BEVRUCHTING' lopen over de randen van hun paneel. De zoetwaterpoliep (een vaas met tentakels) noemt de stem niet; het storyboard zei 'gist zonder poliep'.
- Moet: bladluis met kop, borststuk en achterlijf, zes poten aan het borststuk, sprieten en de twee buisjes (siphunculi) achterop; jongen als kleine kopieën. Poliep weg (alleen gist met knop), metaregels korter of kleiner zodat ze binnen het paneel blijven.
- Stills: `v01_017.62`, `v01_024.67`, uitsnede bladluis uit `v01_032.78`.

## KAN

1. **s01, s21, s30, s24/s26/x01/x02** Twee verschillende eicellen en zaadcellen in één film: in s01/s21/s30 een kale cirkel (s21/s30 met gouden rand en een zachte halo, die als gloed leest, Part C), elders `eicelEcht` met zona en corona en `zaadcelEcht`. Eén tekening gebruiken (C7). In s21 en s30 staat ook geen 'niet op schaal' terwijl de zaadkop ±1/6 van de eicel is.
2. **s01 (±10–15 s)** Het storyboard noemde 'DNA rolt uit naast Noor' (schaal voelbaar, C8); nu alleen een pil met '2 meter'.
3. **s04 (5,6–9,6 s)** 'Groeien' is een rij elkaar overlappende munten; er deelt niets zichtbaar. Een cel die 1 → 2 → 4 → 8 deelt (zoals in de cold open) zegt meer.
4. **s04 (22,5–26,4 s)** Rode bloedcellen in zijaanzicht zijn piepkleine haltertjes die op moleculen lijken; van beenmerg is niets te zien.
5. **s04 (±16–21 s)** Er staat een klein vlekje tussen 'cellen' en 'delen' in het label 'onderin: cellen delen'.
6. **s05** De koraal ring 'het midden' ligt niet op de (iets verschoven) kern: twee half overlappende cirkels. De delende cel aan het eind is leeg (C9: 'empty cell'). `q.at('deelt')` valt op 'een eencellige deelt' (1,3 s), dus de insnoering is al klaar als de cel verschijnt; `q.at('deelt', 2)`.
7. **s06–s10** Het storyboard noemde een cel in het midden van de ring die meegroeit; nu staat 'de cel groeit, maakt eiwitten en organellen' alleen als tekst. De boog 'mitose' is 8 % van de ring (±2 uur van 24) terwijl de stem 'ongeveer een uur' zegt; ±4 % maken. Goud is hier een categoriekleur voor mitose (goud = focus).
8. **s08, s09** De draadjes 'na het kopiëren: dubbel' en 'één draad → dubbele draad' zijn 60–150 px groot; dat ze dubbel zijn, zie je nauwelijks. Groter, of een zoomcirkel.
9. **s10** Het lampje bij G2 → mitose drukt tegen het label 'mitose'.
10. **s11 (17–22,6 s)** 'Even lang, en op dezelfde plekken dezelfde genen' staat alleen in een pil; de twee gekleurde draden in de kluwen zijn niet te vergelijken. Even de twee homologen gestrekt naast elkaar met twee gelijke banden.
11. **Labels over lijnen**: s16 'ons paar' over het kernmembraan (6 s) en 'kernmembraan · valt uit elkaar' over de celrand (21 s); s23 'ons paar · het lange paar' over de celrand (0–7 s); e01 'eiwitplaatje, één per chromatide' tegen de chromatide (7,5 s); s17 'wordt een nieuwe celwand' tegen de celwand (44 s); s26 '= 2n = 46' en de 'n' boven de eicel over de corona (23 s).
12. **s16 (29,9–34,2 s)** Het label 'equatorvlak' wijst naar een vlak dat niet getekend is; de gouden stippellijn uit s23 ook hier gebruiken.
13. **e01 (25,5–29,9 s)** Het knippende enzym is een groene pac-man; C1/C9: enzymen grijsblauw (#7A8BA8) met het actieve centrum in goud, als keten, niet als bolletje (BEELDAFSPRAKEN). De cohesineringen zijn op 960 px bijna onzichtbaar dun; bij het gif-scenario komen ze weer terug zonder uitleg.
14. **s17 (36,5–47 s)** Plantencel: geen vacuole (C9), lege kernen, en de vervaagde dierlijke cel schemert er rond omheen.
15. **s19, s24** De gouden rand van 'ons paar' verdwijnt in de dochtercellen (s19) en in meiose II en de zaadcellen (s24), terwijl het storyboard het paar tot in de vier geslachtscellen volgt.
16. **s23 (11,3–16 s)** Bij 'Kijk: het chromosoom van vaderskant heeft nu een stuk van moederskant' is het paar maar ±140 px; even inzoomen op het chiasma maakt het geruilde stuk echt zichtbaar.
17. **s24 (18,5–28 s)** De kleine cellen ('gaan te gronde') zweven los naast de eicel; poollichaampjes liggen tegen de eicel, binnen de zona.
18. **x02** Chromosomen liggen naast een gave kern; na het begin van meiose I is er geen kern meer (stil in metafase II = spoel, geen kern). En bij 'Al die jaren houden eiwitringen … de chromosomen bij elkaar' toont het paneel één chromosoom van ná meiose I, terwijl de cel die jaren in meiose I stond met het paar (met chiasma) tegen elkaar; het paar met ringen past beter.
19. **v02** Eicel en zaadcel zijn even grote rondjes (60 px); groen en goud worden als chromosoomkleuren gebruikt in de variatiekolom (groen = positief, goud = focus); de groene ringen om de overlevers komen pas 0,6 s voor het eind van de alinea.
20. **s30 (vwo)** Het weefsel is een rij rechthoeken (C9: 'a cell as a box'); bij 'meerdere remmen kapot, één voor één' staat één lampje met één kruis; de non-disjunctiecel gebruikt een andere chromosoomtekening (`chromX`) zonder crossing-over, en de insnoerende cel leest als twee overlappende ellipsen.

Kleine algemene opmerking (geen punt): de metaregel rechtsonder ('model · 2n = 4 · niet op schaal') staat op 40 px van de rand; Part C zet schaal en meta linksonder.

## Nog doen (voor de maker)

- MOET-punten in het foutenlogboek `films/logboek/fouten.jsonl` zetten en daarna `python3 scripts/foutenpatronen.py` draaien (de reviewer heeft niets aan de film, het logboek of git veranderd).
- MOET 10–12 hebben dezelfde oorzaak (`q.at` vindt een stukje van een woord, ook zonder dubbele punt): een kleine controle in de bouw die elke cue naast de woordtijden legt en waarschuwt als het gevonden woord niet precies het bedoelde woord is, had alle drie tegengehouden. Kandidaat voor `films/WERKWIJZE-LESSEN.md`.
- Na de fixes MOET 4, 5 en 7 opnieuw op een contactblad van 1/30 s bekijken (anafase en crossing-over zijn bewegingen).

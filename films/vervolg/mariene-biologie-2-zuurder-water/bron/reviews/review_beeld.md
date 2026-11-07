# Frisse beeldreview · mb2 'Zuurder water' (7 nov 2026)

Bekeken: contactsheet (`FIVE=1 engine/stills.py mb2 … contact`, 98 stills, 5 per segment + kaarten + vraagkaarten), losse stills op volle grootte bij twijfel (s01 13,4 · s04 21,9 · s09 6,5/12,5 · s12 3,0/4,8 · s19 16,6/31,8/32,6/33,4/34,0/40,5 · s20 11,5 · s22 4,6/23,9 · s24 18,2/18,35 · s25 9), woordtijden uit `words/*.json`, `scenes_mb2.js` waar nodig, en `testvel_mb2.png`. Getoetst aan BEELDAFSPRAKEN.md, REEKS-marien.md (beeldafspraken), PROMPT_v13 Part C (C5, C9, C10, typografie) en het script `script_v2.md`. Tijden zijn segmenttijden. Niets aan de film gewijzigd.

## MOET

1. **Hoofdstukkaart H3 @ 0,6 s (en hoofdstukmenu)**: de kaart toont de volledige titel 'Een proef met oesterlarven bij verschillende pH, met een controlegroep'. Die komt vóór vraag 5 en zegt antwoord b ('eerst larven met en zonder CO₂ vergelijken') voor. Het script schrijft juist voor: hoofdstukkaart alleen 'EEN PROEF MET OESTERLARVEN' (volledige titel alleen in info.md); dat was een bewuste reparatie uit v1. **Voorstel**: kaarttitel en hoofdstuknaam in de speler 'Een proef met oesterlarven'. De volledige titel alleen in info.md/docentdeel.

2. **s12 @ 3,4–6,8 s (zoomcirkel 'onder de microscoop')**: vóór vraag 4 ('Waarom juist zij?') laat de cirkel twee gezonde D-larven met een schelp zien en drie grijze larven met een mislukte schelp. Dat verraadt de richting van het antwoord: (b) 'ze hebben nog geen schelp' valt meteen af, want je ziet larven mét schelp, en 'het gaat mis met de schelp' wijst naar (a). Het beeld loopt ook vooruit op s14, waar de schelpbouw pas wordt uitgelegd. **Voorstel**: toon in s12 alleen dat larven sterven, zonder schelpdetail: bijvoorbeeld vijf gelijke larven (trochofoor-stadium of zonder zichtbare schelp), waarvan er drie stil en grijs worden, of alleen een teller 'LEVEND 2 · DOOD 3'. Het schelpverschil hoort pas in s14 (en in s19 bij pH 7,4).

3. **s04 @ 10,3–23,1 s, tijdens de vraag 'Is zeewater dan zuur?' (21,9 s)**: op de pH-liniaal 0–14 staan ZUUR en BASISCH, en de gouden wijzer staat duidelijk in het blauwe BASISCH-deel. De vraag is dus af te lezen vóór de vraagkaart. Dat het script hier 'wijzer met een vraagteken' vraagt, helpt niet: de wijzer staat er al. **Voorstel**: in s04 alleen de ingezoomde schaal 'pH open zee' 7,9–8,3 (8,2 → 8,1 → ruim 8,0) laten zien. De schaal 0–14 met ZUUR/BASISCH en de wijzer pas in s06 na 'Antwoord a' (daar staat hij nu ook al).

4. **s19 @ 32,2–34,2 s (de stempel)**: het slot van het dossier, Sam zet 'OORZAAK: CO₂ IN HET WATER', staat maar ± 2 s in beeld. De stempel landt op 32,9 s, staat ± 0,5 s stil en vanaf 33,85 s faden het blad en beide personen weg (op 34,0 s halfdoorzichtig, zie BEELDAFSPRAKEN 'nooit halfdoorzichtige mensen'). Daarbij springt het beeld navy → lab-decor → navy binnen 2 s. Het belangrijkste beeld van de film is zo nauwelijks te zien. **Voorstel**: laat de stempel in fase B landen, in de lege stempelplek onder de drie kaarten ('nu mag de stempel erop', 32,9 s), en houd B staan tot 'Zit er te veel' (36,8 s). Fase C (decor + personen) vervalt, of krijgt ≥ 3 s door 'De kwekerij nu' pas op 'Zit' te laten beginnen. Personen hard wisselen, niet crossfaden.

5. **'PH' in hoofdletters, in de hele film**: `metaText`/`metaA`/`naamBij` zetten alles in hoofdletters, dus 'pH' wordt 'PH': s04 'PH-SCHAAL', 'PH OPEN ZEE'; s18 'GEWOON ZEEWATER · PH 8,2', 'PH 7,4'; s19 'PH 8,2'/'PH 7,4' onder de staven en de zoomcirkels. pH is een vaste notatie, 'PH' is vakinhoudelijk fout (zelfde soort fout als µ → M, waarvoor `microteken.py` bestaat). **Voorstel**: in de engine na `toUpperCase()` 'PH' terugzetten naar 'pH' (regex `\bPH\b` → 'pH'), net als de µ-regel. Of de pH-waarden in Tekst zetten in plaats van Meta. Daarna `--check` op alle films, want mb1 en mb3 gebruiken dezelfde helpers.

6. **s09 @ 8,5–17,4 s (zoomcirkel groeirand)**: de label 'kalk' met 'CALCIUMCARBONAAT' eronder staat op de onderrand van de cirkel. De metaregel wordt door de cirkel afgekapt ('…CIUMCARBO…') en valt half over de kalkblokjes. Juist hier noemt de stem 'kalk, ook wel calciumcarbonaat'. **Voorstel**: label buiten de cirkel zetten, rechts naast de rand ter hoogte van de kalkrand (naamBij), of in de cirkel boven de blokjes, volledig leesbaar.

7. **s24 @ 16,3–18,8 s ('op zee, op het wad en in het lab')**: de drie plekkaartjes komen één voor één op het woord. 'in het lab' wordt genoemd op 17,6–18,1 s, maar het kaartje staat bij het einde van het segment (18,2–18,35 s) nog op ± 20–40 % en is nooit helemaal zichtbaar. Dat botst met de regel 'wat de stem noemt, is nooit gedimd of doorzichtig'. **Voorstel**: alle drie de kaartjes op 'Daarna' (14,8 s) samen laten verschijnen, of na het segment ± 1,5 s stilstand in beeld houden.

8. **Meta-tekst kleiner dan 28 px (Part C typografie: niets op het podium kleiner dan 28 px)**: de film gebruikt Meta op 26 px op ± 35 plekken, zoals 'BARTON E.A. 2012', 'KWEEKBAKKEN MET LARVEN', 'TAST KALK AAN', 'TEL: LARVEN MET EEN NORMALE SCHELP', 'pH-SCHAAL' en bronregels. Op 24 px staan 'DALING VAN DE EIGEN KALKBOUW', 'GAZEAU E.A. 2007 · YERSEKE (NU NIOZ)' (s22, ook nog grijs op crème papier) en 'PRIJS: ZUURDER WATER' (s23). Ook de metaregel van `naamBij` in de engine is 26 px. Op een telefoon (liggend) zijn de 24 px-regels op het Yerseke-blaadje niet meer te lezen. **Voorstel**: alle Meta in mb2 naar ≥ 28 px, en `naamBij` in `engine/lib.js` naar 28 (geldt dan ook voor mb1/mb3). Op het crème blaadje een donkerder grijs (#3E4658).

## KAN

1. **s03 @ 10,7–14,9 s**: 'te weinig zuurstof' krijgt een streep, maar de stem schrapt alleen de bacterie ('de sterfte ging door zonder die bacterie'). Waarom zuurstof afvalt, hoort de kijker niet. **Voorstel**: zuurstof niet doorstrepen maar grijs maken ('minder waarschijnlijk'), of één bijzin in de stem (staat in het docentdeel als K5).
2. **s03 @ 27,8 s (CO₂-meter)**: de label 'van nature / OPWELLEND DIEP WATER' valt over de rand van de buis en over de paarse stipjes. **Voorstel**: label rechts naast de buis, links uitgelijnd op x ≈ buisrand + 30.
3. **s01 @ 0–4 s en s17 @ 0–12 s, leesbaarheid op het decor**: 'STAGIAIR' en 'MARIENE BIOLOOG' (grijs C.grain, 26 px) staan op de planken en aquaria van het decor en zijn slecht leesbaar. Hetzelfde geldt voor het groene antwoordlabel bovenaan s17, dat over het lichte raam valt. **Voorstel**: rolnamen in een donkere pil (#121A26 85 %, Part C C5), en het antwoordlabel bij decorscènes ook in een pil.
4. **s18 @ 20,3 s**: 'VIJF KEER HERHAALD' verschijnt pas 0,7 s voor het einde van het segment, terwijl de stem 'een paar keer' zegt. **Voorstel**: label op 'paar' maar met 1 s stilstand erna, en in beeld dezelfde woorden als de stem ('VIJF KEER HERHAALD' mag blijven als het getal klopt met Kurihara, maar dan het liefst in de stem 'vijf keer').
5. **s19 @ 0–17,4 s (fase A, tempo en drukte)**: in ± 14 s komen er negen dingen bij op één scherm: grafiek, 68 %, zoomcirkel pH 8,2, 5 %, zoomcirkel pH 7,4, 'pH 7,4 = extreem', '± HET JAAR 2300, ERGSTE GEVAL', geeltje, twee bronregels. Op een telefoon is dat te vol. **Voorstel**: de twee zoomcirkels kleiner of weg (de staven zeggen het al), of het geeltje 'minder extra CO₂ → trager' (Timmins-Schiffman) in de plaats laten komen van de zoomcirkels op 'maar ook bij minder' (13,1 s).
6. **s19 @ 32,2–34,2 s**: als fase C blijft: niemand houdt de stempel vast, de afdruk verschijnt uit het niets terwijl Sam wijst (script: 'pas dan zet Sam de stempel'). **Voorstel**: Sam met pose 'vasthouden' en `mb2_stempelDing` in de hand, met een korte neerwaartse beweging op 'stempel'.
7. **s22 @ 4,6–9 s (soortentegels)**: de drie kreeften (x 0,3) lezen op tegelformaat als blauwe visjes, en de krabben zijn klein. **Voorstel**: kreeft groter (x 0,45) en schuin in de tegel, met scharen zichtbaar.
8. **s22 @ 22–25 s**: onder 'larven van weekdieren' staat een groene annotatiehaak zonder zin. Part C: één korte zin in dezelfde kleur. **Voorstel**: 'één soort zegt niet alles' bij de haak, of de haak weglaten.
9. **s23 @ 26,9 s (recaptegel 6)**: 'PRIJS: ZUURDER WATER' valt over de wereldbol. **Voorstel**: bol iets naar links en kleiner, label eronder.
10. **Overgangen met personen (s01 @ ± 13 s, s24 @ ± 14,5 s)**: bij `wisselT`/`ramp` faden de personen 0,3 s halfdoorzichtig weg. **Voorstel**: personen hard laten verdwijnen bij de wissel (alfa 1 → 0 op één frame), alleen de rest crossfaden.
11. **s14 @ 17–18 s**: 'te weinig' staat rechts onderaan, los van het balkje 'ZUURDER WATER' (onder de bronregel). **Voorstel**: 'te weinig' direct rechts naast het smalle groene stukje van het balkje.

## Vragen van de opdrachtgever

- **s12, larven in de zoomcirkel**: ja, ze verraden het antwoord deels (zie MOET 2). De cirkel staat er al vanaf 'larven' (3,4 s), dus ruim vóór 'Waarom juist zij?'. Je ziet larven mét schelp naast larven met een mislukte schelp. Daarmee valt (b) af en wijst het beeld naar 'het gaat mis met de schelp'. De maat (± 0,1 mm, alleen in de zoomcirkel) is wel goed.
- **s19, tempo**: fase A is te vol (KAN 5), fase B is goed (drie kaarten op hun woord, ± 15 s), en fase C (de stempel) is veel te kort, ± 2 s met de stempel maar ± 0,5 s stil in beeld, plus een decorsprong (MOET 4). Fase D (de kwekerij nu, ± 8 s) is goed.
- **s24, decorkaartjes in de recap**: de kaartjes mogen volgens mij wel. De afspraak 'decor alleen waar de scène speelt' is bedoeld tegen een decor *ónder* uitleg die zich daar niet afspeelt, omdat het dan lijkt alsof een schema of cel in de kas staat. Hier is het decor zelf het onderwerp: drie ingelijste kaartjes met als label precies de plek die de stem noemt ('op zee', 'op het wad', 'in het lab'), zonder iets erop of eroverheen. Dat is een ankerpunt in de echte werkplek, zoals BEELDAFSPRAKEN het decor bedoelt, en het sluit aan op film 1 (schip) en film 3 (wad). Wel twee punten. Het lab-kaartje is nooit helemaal zichtbaar (MOET 7). En de kaartjes moeten op ± 60 % sterkte of in de vlakke decorstijl blijven, zoals nu, en mogen geen schilderstills worden.

## Goed

Het dossier als rode draad werkt: genummerde bladen, een lege stempelplek die meeloopt en verdachten die afvallen. De decorregel wordt goed toegepast: lab met aquaria alleen waar Sam en de bioloog in beeld staan, bladen, moleculen en grafieken op navy. Alleen castpersonages, gezichten heel, geen namen, alleen rollen. De oesterlarve staat alleen in een zoomcirkel met '± 0,1 mm', de schelp in de hand is ± 12 cm. De seriekleuren zijn consequent (paars alleen CO₂/H⁺, oker kalk, koraal let op, goud stempel). De grafiek 68 % / 5 % heeft een eerlijke as (0–100 %), 'HYPOTHESE' staat bij Waldbusser zoals beloofd, en de 18 soorten van Ries zijn juist verdeeld (10 / 7 / 1 met de mossel gelijk). De antwoordlabels staan steeds pas na de vraagkaart. De H⁺-som (100 → 126 stipjes) en de pH-schaal 7,9–8,3 met 'NU: RUIM 8,0' zijn helder. Er is geen korrel, er zijn geen wijslijnen buiten de zoomcirkels, en niets staat onder y ≈ 880 behalve de ondertitels.

## Verwerkt (7 nov 2026, maker)

**MOET**
1. Hoofdstukkaart H3 → 'Een proef met oesterlarven'. Alleen het veld `chapter` in `segments.json` is aangepast (5 segmenten, geen id's of audio). **Aandachtspunt voor info.md:** draait iemand `make_segments.py` opnieuw, dan komt de lange titel terug. Pas dan het veld opnieuw aan of zet de kop in het script zo. De volledige titel staat in het docentdeel.
2. s12: geen schelpdetail meer. Vijf gelijke jonge larven (trochofoor, zonder schelp); op 'stierven' worden er drie grijs en zakken weg, met de pil 'LEVEND 2 · DOOD 3'.
3. s04: de schaal 0–14 met ZUUR/BASISCH en de wijzer zijn weg. Nu staat er 'pH: hoe lager, hoe zuurder' en alleen de ingezoomde schaal 7,9–8,3, in neutraal grijs (geen teal = basisch-kleur), met een vraagteken op de wijzer. De schaal 0–14 komt pas in s06.
4. s19: fase C (decor + personen) is geschrapt. De stempel staat nu in fase B: de stempel zakt neer in de stempelplek onder de drie kaarten en de afdruk 'OORZAAK: CO₂ IN HET WATER' landt op 'stempel' (32,9 s) en blijft tot 'Zit' (36,8 s). Daarna volgt 'De kwekerij nu'. Er wisselen geen personen meer.
5. 'pH': eigen helpers `mb2_meta`, `mb2_naam`, `mb2_zoom` en `mb2_pil` in `teken_mb2.js` zetten alles in hoofdletters, maar laten 'pH' als 'pH' staan (en 'mm' als 'mm'). Alle `metaText`/`naamBij`/zoomcirkels in mb2 gebruiken die helpers. Engine niet gewijzigd. **Voor mb1/mb3 en andere films:** de engine-fix (regex `PH` → `pH` na `toUpperCase`, net als µ) is nog voor de hoofdsessie.
6. s09: label 'kalk / CALCIUMCARBONAAT' staat in de cirkel boven de kalkrand, volledig leesbaar.
7. s24: de drie plekkaartjes staan samen en volledig in beeld vanaf 'Daarna' (14,8 s).
8. Alle Meta in mb2 is ≥ 28 px (ook het blad-tabje en de metaregel van `mb2_naam`). Op het crème Yerseke-blaadje is de tekst donkerder grijs (#3E4658). `naamBij` in de engine staat nog op 26 (niet gewijzigd: engine, hoofdsessie).

**KAN**
1. s03: 'te weinig zuurstof' wordt niet meer doorgestreept maar grijs, met 'MINDER WAARSCHIJNLIJK'. Alleen de bacterie krijgt een streep.
2. s03: CO₂-meter naar links; 'van nature / OPWELLEND DIEP WATER' staat rechts naast de buis.
3. s01: 'STAGIAIR' en 'MARIENE BIOLOOG' in een donkere pil. s17: het antwoordlabel in een pil.
4. s18: 'VIJF KEER HERHAALD' verschijnt op 'tel' (± 17 s), dus ruim vóór het einde. De stem blijft 'een paar keer' (audio niet gewijzigd).
5. s19 fase A: de twee zoomcirkels verdwijnen op 'extreem'. 'pH 7,4 = extreem' en het geeltje 'trager' komen in hun plaats; er staan nooit meer dan ± 5 dingen tegelijk.
6. Vervalt, want fase C is weg. De stempel staat nu wel als voorwerp in beeld en zakt neer op 'stempel'.
7. s22: de kreeft is groter (× 0,42) en staat schuin in de tegel.
8. s22: de haak staat onder het Yerseke-blaadje, met de zin 'één soort zegt niet alles'.
9. s23: de wereldbol is kleiner en staat links, 'PRIJS: ZUURDER WATER' staat er los onder.
10. s01, s03 en s24: de personen verdwijnen nu hard bij de wissel (geen halfdoorzichtige fase).
11. s14: 'te weinig →' staat direct bij het smalle groene stukje van het balkje.

Controle: `cuecheck` schoon, elke alinea per 0,25 s zonder JS-fouten, stills van de gewijzigde scènes nagekeken, nieuwe contactsheet `sheet_mb2.png` in de scratchpad.

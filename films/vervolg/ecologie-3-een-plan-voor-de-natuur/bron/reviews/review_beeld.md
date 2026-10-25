# Frisse beeldreview film 3 — Een plan voor de natuur: van doel tot herstel (prompt v10, C10.7)

25 okt 2026. De reviewer zag het maken niet. Contactsheet met 5 beelden per alinea (10/30/50/70/93 %), plus losse stills bij twijfelplekken, en Vragen uit (`?vragen=uit`) rond alle vijf vragen (laatste 3 s vóór de vraag, 0–3,5 s erna). Gelezen: BEELDAFSPRAKEN, Part C + C10, BOUWEN 'Bouwen en kijken', REEKS-ecologie, storyboard, script_opname.

## MOET
1. **s03 titel** — de titel 'Een plan voor de natuur' loopt over de gebiedskaart heen ('ur' staat op de kaart). Fix: kaart kleiner en verder naar rechts (x 1260, b 600).
2. **s09 · 0–5,3 s (ook Vragen uit)** — na de vraag is het beeld leeg op het antwoordregel en een losse goudlijn na: de kernzin 'De overheid beslist; de ecoloog adviseert.' heeft geen beeld; de rijen komen pas bij 'Europa' (5,3 s), Bas bij 'adviseert'. C10.7: beeld op t = 0 gevuld na een vraag. Fix: de drie rijen vanaf t = 0 gedimd (35 %), elke rij vol op zijn woord; Bas verschijnt al op 'ecoloog'.
3. **s15 · 0–3,5 s (ook Vragen uit)** — alleen antwoordregel en 'rekenvoorbeeld' in beeld; de som komt pas op 'gedeeld'. Fix: 'uitmijnen: 400 kg fosfor ÷ 40 kg per jaar' staat er vanaf t = 0, de uitkomst blijft op 'tien'.
4. **s19 · 7,4–8,9 s** — de chips 'eerste jaren: veel zeldzame soorten' en 'na tien jaar: veel weer weg' faden op dezelfde plek door elkaar (onleesbare dubbele tekst). Beeldafspraak 'één tekstbalk tegelijk'. Fix: eerst de oude weg, dan de nieuwe.
5. **s27 · 14,3–18,9 s** — het derde paneel (jonge heide) verschijnt op 'doel', het middelste (kaal zand + heidegrond) pas op 'bodem': vier seconden lang een gat in het midden van een reeks die links-naar-rechts gelezen moet worden. Fix: middelste paneel op 'weg?' (2,1 s, 'Waarom haal je eerst de bovenste laag weg?'), derde op 'doel'.
6. **s29 eindkaart** — zes regels (de derde in twee regels): de annotatiehaak valt over de voetregel 'biologie bij kamiel · stem …' en 'komt de tapuit terug?' staat onder y 880 (ondertitelzone). Fix: in `engine/player.js` `drawEnd` bij méér dan 5 regels een kleinere regelafstand (y0 260, stap 92); voor kaarten met ≤ 5 regels (ec1, ec2, alle andere films) verandert niets.

## KAN
7. **s04 · 3,8–5,0 s** — het beheerplanvel verschijnt met regels 2–4 maar zonder regel 1 (gat bovenaan). Fix: regel 1 al gedimd zichtbaar, vol op 'doel'.
8. **s16 · 3–12 s en s17 · 9–21 s** — na het afgraven blijft rechtsboven een dun verticaal randje van de doorsnede staan (vulvlak 2 px te smal). Fix in `bodemDoorsnede` (teken_ec3.js).
9. **s26 · 18–21 s** — 'Daan · BLIJFT TELLEN' en de chip 'open, kale heide, met insecten' raken elkaar. Fix: chip naar (1640, 330), boven de tapuit.
10. **s21 · 0–5,3 s** — het Drenthe-vak is leeg tot 'grote'; de grote heide mag al op 'Drenthe' (3,7 s) verschijnen. Bij de kaart (15–24 s) staat 'hier begint Bas' ver van de gouden strook (rechts buiten de kaart). Fix: heide op 'Drenthe', tag naar (1400, 720), dichter bij de akker.
11. **s12 · 9–11 s** — een vliegende munt gaat over de metaregel '1 munt = 10 kg fosfor'. Fix: metaregel onder de chip iets hoger/rechts, of lagere boog.
12. **s01 en s07** — label 'Bas · ECOLOOG' raakt de bovenkant van zijn haar; in s01 staat het bovendien tegen de maisplanten. Fix: label 25 px hoger.
13. **s16** — de graafmachine staat rechtsboven los van de grond en graaft niet in de bouwvoor, terwijl 'de bouwvoor gaat eraf'. Kan sterker (bak bij de verdwijnende rand).
14. **s28** — Bas wijst met gestrekte arm naar Daans hoofd. Liever naar de opleidingskaartjes, of 'staan'.
15. **s23/s25** — storyboard en reeksbrief noemen 'met marge'; de balken tonen alleen '±' in het getal. Eventueel een smal foutstreepje.
16. **s06 · 0–3,7 s** — alleen het tagje 'soorten' (en later 'habitattypen') in beeld; mag eerder iets dragen (bv. een tapuit-icoon naast 'soorten').

## Gecontroleerd en goed
- Antwoordletters c · a · b · a · b; vraagkaarten leesbaar, geen overlap.
- Vragen uit: geen vraagteken of vraagzin in beeld aan het eind van s01, s07, s13, s19, s23. De antwoordregels ('antwoord c: die laag zit vol mest' enz.) staan in de vorm 'antwoord x: inhoud' via `regel()`, dus `scripts/antwoordtekst.py` maakt er bij inbouw in de repo de inhoud van; in deze werkmap nog niet gedraaid (zie Open).
- Cast: Daan (veld) en Bas (veld) overal als castpersonage; geen grijze poppetjes, geen halfdoorzichtige mensen buiten korte fade-ins.
- Kleuren volgens de reeksbrief (groen plant, oker bodem/fosfaat, koraal 'let op', goud focus); geen paars buiten DNA; niets onder y 880 behalve ondertitels (behalve eindkaart, punt 6).
- Tekst klopt met wat gezegd wordt: getallen 10/40 kg, 400 kg, 10 en 40 jaar, 10–20 en 18–44 jaar, 2006, 1 cm, 99/25/58 % en 18/28/40 %.

## Verwerkt (25 okt 2026)
- MOET 1–6 hersteld: titelkaart (kaart 1200/250, b 640), s09 (rijen vanaf t = 0 op 35 %, vol op hun woord; Bas op 'ecoloog'), s15 (som uitmijnen vanaf t = 0), s19 (chips na elkaar: oude weg op 'Na', nieuwe 0,3 s later), s27 (middelste paneel op 'weg?'), s29 (eindkaart).
- MOET 6 vroeg een wijziging in de gedeelde `engine/player.js` (`drawEnd`): alleen bij méér dan 5 regels y0 250 en stap 92; kaarten met ≤ 5 regels (ec1, ec2 en alle andere) tekenen precies als voorheen. Backup in de scratchpad (`player.js.bak`).
- KAN meegenomen: 7 (planregel 1 gedimd), 8 (randje na afgraven weg, `bodemDoorsnede` in teken_ec3.js), 9 (chip naar 1640/330), 10 (grote heide op 'Drenthe', 'hier begint Bas' naar 1400/760), 11 (lagere muntboog), 12 (Bas-labels 25 px hoger), 14 (Bas 'staan' in s28).
- `ec_reeks.js` niet aangeraakt. Opnieuw gebouwd met `bash ec3/bouw.sh` (378 s); `engine/cuecheck.py ec3 ec3/scenes_ec3.js` schoon. Elke fix gecontroleerd met een verse still (s03 2,5 · s04 4,4 · s09 0,5/4,5 · s12 9,5 · s15 0,5 · s16 9 · s19 7,6/8,2 · s21 4,5/20 · s26 20,6 · s27 8/15 · s29 14).
- Open: KAN 13 (graafmachine graaft niet zichtbaar in de bouwvoor), 15 (marge-streepje bij bedekking), 16 (s06 begin wat leeg); bij inbouw in de repo `scripts/antwoordtekst.py` draaien (antwoordregels 'antwoord x: …' in s04, s09, s15, s21, s25).

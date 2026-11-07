# Frisse beeldreview: Wat heb jij aan DNA? 2.0 (DNA 8), 31 okt 2026

Reviewer: frisse helper (heeft de remake niet gemaakt). Getoetst aan `films/BEELDAFSPRAKEN.md`, prompt v13 Part C (C8–C10), `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`, `bron/opwaardering-v13.md` en `bron/info.md`.

Werkwijze: werkmap buiten de repo volgens `info.md` § 'Zo pas je deze film aan', film opnieuw gebouwd, contactvel van alle segmenten op 10/30/50/70/93 % (91 stills, `stills.py` met `FIVE=1`) plus gerichte stills rond twijfelmomenten, bekeken met de ondertitel die op dat moment klinkt. Vragen uit gecontroleerd door de speler te laden met `?vragen=uit` en `?vragen=aan` (19 tegen 27 items, 607 tegen 705 s; geen vraagsegmenten, geknipt 'Antwoord C.' in n5, n9, n13, n17; geen paginafouten). Eén niveau, dus havo = vwo. Na het herstel opnieuw gebouwd en het hele contactvel nog een keer bekeken.

Tijden: segment-id + lokale tijd (s).

**Totaal: 4 MOET (alle hersteld), 6 KAN (3 hersteld, 3 bewust gelaten).**

## Wat goed is
- Getallen in beeld kloppen met stem en docentdeel: 10 en 13 van de 30 (n5), ± 99 van de 100 (n7), 1 op 30 met één drager in 30 poppetjes (n9), kruisingsschema 1 op 4, 70 van de 100 en 14 van de 100 (n11), 2 van de 10 bij 'één op de vijf' (n11), 1 op 20 met één gele van de twintig (n15), 2 van de 4 bij Vv × vv (n13).
- Chromosomen 21, 18 en 13 in de goede lengtevolgorde (21 kleinst, 13 grootst), met een derde exemplaar.
- Palet B in de SNP-tegels en -ladders; castpersonages met gezicht, geen castnamen in beeld; het gezicht van Opa Henk blijft heel (geen orgaankijkje).
- Doosje op ware grootte op tafel met een zoomcirkel, telefoon via een zoomcirkel; geen korrel; tekst boven y ≈ 880.

## MOET (hersteld)

### MOET 1 · n3 (0–14 s), q4v, n3 (25–33 s) · Noor (16) doet zelf een commerciële DNA-test
- Zag: Noor spuugt in het buisje en krijgt het rapport op haar telefoon; in de afkomstvergelijking staat haar portret met 'jouw snp's', bij vraag 1 weer haar portret naast het rapport. Commerciële bedrijven nemen pas klanten vanaf 18 jaar.
- Hersteld: moeder Linda (castpersonage, ROLLEN: moeder) doet de test aan tafel (buisje, daarna de telefoon), Noor staat ernaast en kijkt mee (blij, bij het rapport verbaasd). Portret in de afkomstvergelijking en bij q4v = Linda; label 'jouw snp's' → 'snp's uit de test'. De stem ('je spuugt…', 'jij') blijft algemeen; in n5 blijft Noor 'jij' in het familiebeeld ('stuur jij je DNA op…', een als-dan-zin, geen test van Noor).

### MOET 2 · n3 (26–33 s) · afkomst: drie groepen allemaal '75 % gelijk'
- Zag: de stem vraagt 'welke groepen uit de databank lijken het meest op jou?', maar groep 1, 2 en 3 scoren alle drie 75 %; daarna geeft bedrijf A juist groep 2 het grootste deel (23 · 41 · 36 %). Het beeld beantwoordt de vraag dus niet en spreekt de balk tegen.
- Hersteld: andere tegels, 67 · 92 · 75 % gelijk, zodat de volgorde past bij de balken van bedrijf A.

### MOET 3 · n7 (34–44 s) · de zwangere vrouw bij de NIPT lijkt op Noor
- Zag: Esra in haar standaardkleding (gele trui, lang donker haar) is bijna niet van Noor te onderscheiden; een kijker kan denken dat Noor (16) zwanger is.
- Hersteld: Esra in haar garderobe `jas` (bruine jas, gele sjaal). Bij de hielprik draagt ze al `kraam`.

### MOET 4 · n9b (34–40 s) · denkwolkjes over de hoofden van de ouders
- Zag: 'ik wil het weten' valt over het hoofd van Linda, 'ik liever niet' tegen het hoofd van Rachid.
- Hersteld: personages iets kleiner en verder uit elkaar (1250 / 1580), wolkjes boven hun hoofd, de metaregel 'dezelfde feiten, een ander oordeel' hoger, zodat niets overlapt.

## KAN

1. **Hersteld** · n0 (7,5–8,5 s), n5 (53–56 s), n20 (5–6,5 s), n9b · een personage dat infadet was halfdoorzichtig met armen en romp door elkaar heen zichtbaar. Nieuw hulpje `d8pers()` in `scenes_dna8.js`: het personage wordt eerst ondoorzichtig op een eigen laag getekend en dan als geheel vervaagd; `fam()` gebruikt het.
2. **Bewust gelaten** · n0 (13–21 s) · de drie panelen (doosje, dokter, tante) faden met `globalAlpha` op de groep; de personages schijnen in de 0,5 s van de fade even door zichzelf heen. Kort en klein; kan met `d8pers` als de scène toch open gaat.
3. **Bewust gelaten** · n17 (27–35 s) · het label 'bacterie met het gen' onder de zoomcirkel valt deels over maïsbladeren. Bladeren zijn geen belangrijk onderdeel; verplaatsen kan met een eigen labelpositie in `zoomCircle`.
4. **Bewust gelaten** · n7 (34–44 s) · de verloskundige houdt het bloedbuisje ter hoogte van Esra's buik; bloed voor de NIPT komt uit de arm. De `vasthouden`-pose heeft geen arm-naar-arm-houding; liever een cast-pose 'bloed prikken' in het castboek (niet in deze map te maken).
5. **Bewust gelaten** · n11 (30–31,8 s) · het raster '14 van de 100' staat er maar 1,8 s ('zeven' valt laat in de zin, daarna wisselt het beeld bij 'iets'). Klopt met de stem; langer laten staan vraagt een andere wisselcue.
6. **Hersteld** · info en opwaardering: twijfelscène 1 bijgewerkt (zie `opwaardering-v13.md`).

## Voor Kamiel om te beslissen
- Is moeder Linda als degene die de test doet goed, of wil je liever Tante Petra of een volwassen figurant? (De stem zegt overal 'je'/'jij'; Noor kijkt mee.)
- Een pose 'bloed prikken in de arm' in het castboek (voor NIPT en bloedafname in meer films)?

# Frisse beeldreview: DNA lezen 2.0 (DNA 7), 31 okt 2026

Reviewer: frisse helper (heeft de remake niet gemaakt). Getoetst aan `films/BEELDAFSPRAKEN.md`, prompt v13 Part C (C8–C10), `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`, `bron/opwaardering-v13.md` en `bron/info.md`.

Werkwijze: werkmap buiten de repo volgens `info.md` § 'Zo pas je deze film aan' (de bouw liep vast op een ontbrekende `oud/glossary.json`; die staat nu als `bron/glossary.json` in de bronmap, uit de GLOSSARY van de gepubliceerde 2.0). Contactvel van alle segmenten op 10/30/50/70/93 % (127 stills, vwo, `FIVE=1`), plus gerichte stills (begin van de vwo-blokken na de knip, n19 kaartje Nederland, n12 banden), bekeken met de zin die op dat moment klinkt. Havo is hetzelfde beeld zonder de vwo-blokken. `qa_vragen.py`: vragen uit vwo 27 items / 12,9 min, havo 22 / 9,6 min, geen vraagsegmenten, 'Antwoord …' en de vwo-zin geknipt, geen paginafouten; na de knip geen antwoordtekst in beeld. Na het herstel opnieuw gebouwd en het hele contactvel nog een keer bekeken.

Tijden: segment-id + lokale tijd (s).

**Totaal: 11 MOET (alle hersteld), 6 KAN (1 hersteld, 5 bewust gelaten).**

## Wat goed is
- Palet B in alle ladders en strengen; vader donkerblauw, moeder zandgeel bij de STR-chromosomen (n8).
- PCR-stappen 95/55/72 °C met profiel en strengen die echt losgaan, primers die binden en polymerase die bouwt; verdubbelen 1 → 32 (n3).
- Gel: kort stuk sneller door de mazen, min boven en plus onder (n9); controlelaan zonder band (n11).
- Castpersonages met gezicht (Dr. Kim in plaatsdelict-outfit, Joost, Erik, Daan en Thijs, Opa Henk, Noors familie); geen castnamen in beeld.
- n19: het kaartje Nederland zegt 'bij ernstige misdrijven · met toestemming van een rechter', zoals de brief vraagt.

## MOET (hersteld)

1. **Titel, n0 (22–30 s), n19 (24–30 s), n25, 'terug naar het bloedspoor'** · de losse bloeddruppel stond op zijn kop (bol boven, punt onder) en las als een kaartspeld; in een misdaadverhaal betekent dat 'locatie'. → Nieuw `druppelIcoon()` (punt boven, ronde onderkant) voor alle losse druppels; de lopende druppels op de ruit (n0 0–8 s) blijven.
2. **n14 (36–42 s), n25 (18–22 s)** · sequencerkleuren T rood, A groen, C blauw, G geel naast palet B (A rood, T zandgeel): een rode tegel met T las als A. → Kleurstoffen A rood, T geel, C blauw, G groen (drie van de vier gelijk aan palet B); de stem noemt alleen 'rood, groen, blauw, geel' en klopt nog: de tegels verschijnen op die woorden als A, G, C, T. Ook de bibliotheek-`sequencer` in deze film (via `SEQ_KLEUR`) en de samenvattingskaart.
3. **n3 (27–45 s)** · de kopieënteller van `thermocycler()` ('=' en '× 1') stond onder y 880, in de ondertitelzone, en leek een kapot teken. → In deze scène geknipt op y < 880; de verdubbeling heeft haar eigen beeld (n3 vanaf 'twee').
4. **v10 (0–17 s)** · de rugvin van de bruinvis zweefde los boven de rug (C9: aanhangsels beginnen binnen de omtrek). → Vin dieper gezet met een brede basis die onder het lijf verdwijnt.
5. **v10 (8–17 s)** · de monsterplekken klopten niet met de tekening: '1 dichte wond' en '2 open wond' lagen op gewone huid bij de staart, '3 gewone huid' juist op de bijtwonden. → 1 en 2 op de bijtwonden, 3 op de flank ernaast.
6. **n12 (10–17 s)** · '8 en 11' gaf maar één (dikke) band, terwijl de stem 'twee banden' zegt. → Twee duidelijk gescheiden banden (afstand vergroot), label 'twee banden' ertussen.
7. **n12, n17, n23 (begin)** · na de geknipte zin 'Voor vwo gaan we hier nog een stap verder.' begon het beeld leeg (STR, referentiegenoom, 'STR's: lengte …' faden pas later in). → Eerste beeld fadet in op 'verder', dus staat er zodra de speler verdergaat.
8. **n22 (24–100 s)** · de stappenbalk (1 mRNA … 5 in bacteriën) lag over de kopregel 'havo · vwo · dna 7/8'. → Balk begint rechts van de kopregel.
9. **n22v (55–80 s)** · 'stamcellen uit het beenmerg' stond over de cellen, de CRISPR-kaart over de tweede cel, en 'goedgekeurd sinds 2023' over de rode bloedcellen. → Label boven de stamcel, kaart hoger, het jaartal onder de cellenrij.
10. **n11 (14–28 s)** · 'PCR · primers alleen voor zeehond-DNA' liep door de dop van het buisje; 'schoon wattenstaafje · controle: geen band' over de rand van de gel. → Label hoger en korter ('primers: alleen zeehond-DNA'); wattenstaafje-label rechts van de gel ('geen band').
11. **v15, n16 (0–15 s)** · de zwangere vrouw (Esra) in haar standaardkleding (gele trui, lang donker haar) lijkt sprekend op Noor; een kijker kan denken dat Noor (16) zwanger is. → Esra in haar garderobe `jas`.

## KAN

1. **Hersteld** · bouwen: `film.py` las `oud/glossary.json` die niet in de bronmap stond; nu `bron/glossary.json`.
2. **Bewust gelaten** · n16 (12–20 s) · 'uit de placenta · afgestorven cellen' loopt over de lijnen van de zoomcirkel (niet over het gezicht). Rustig genoeg.
3. **Bewust gelaten** · n16 (34–40 s) · 'test van de foetus zelf' is een naald boven een grijs blokje; een herkenbaarder vlokkentest/vruchtwaterpunctie zou beter zijn, maar dat is een nieuwe tekening (eerst testvel).
4. **Bewust gelaten** · n22 (55–65 s) · de knipscène (plasmide, zoomcirkel, gedimde enzymen, 'AATT') is aan de drukke kant; 'plasmide' ligt deels op de ring. Inhoudelijk klopt het; vereenvoudigen vraagt een nieuwe opbouw van de scène.
5. **Bewust gelaten** · v10 · de zeehond loopt rechts het beeld uit (staart afgesneden). Bij een strandscène acceptabel.
6. **Bewust gelaten** · personages die faden met `globalAlpha` (o.a. n21, n26) laten 0,5 s armen door de romp zien; in DNA 8 is daarvoor `d8pers()` gemaakt, hier niet overgenomen.

## Voor Kamiel om te beslissen
- Sequencerkleuren: akkoord met A rood, T geel, C blauw, G groen? (Echte BigDye-kleuren zijn anders; de film vereenvoudigt al.) Alternatief: letters op de pieken laten en alle kleurstoffen buiten palet B.
- Inhoudsvragen uit `opwaardering-v13.md` (c) staan nog open (jaartal 2023 voor de EU, rechter-commissaris).

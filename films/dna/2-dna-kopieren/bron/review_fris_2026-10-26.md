# Frisse beeldreview: DNA kopiëren 2.0 (DNA 2), 26 okt 2026

Reviewer: frisse helper. Ik heb de film niet gemaakt en geen bouwnotities of keuringsverslagen gelezen. Getoetst aan prompt v10 (C1, C5, C6, C8, C9, C10.7), `films/BEELDAFSPRAKEN.md`, `bron/script_v2.md` en `bron/bronnen.md`.

Werkwijze: alle 131 stills uit `werk/dna2/review/` bekeken (960 px), bij elke still de zin uit `tekst.md` en de woordtijden uit `filmdata.json`. Waar iets onduidelijk was: uitsneden vergroot, en met Playwright extra stills gemaakt uit `werk/dna2/film/film/standalone.html` via `window.__still(id, t)`. Dat waren t = 0 van elke alinea en tussentijden in s10, s11, s16, s22, s26, s27, s28 en s29. Vragen uit: met `__items()` gecontroleerd dat s04, s12, s17 en s23 wegvallen en dat de alinea erna op zichzelf staat. In de stills is geen vraagrestant gevonden (de vraagteken-beelden zitten alleen in de weggeknipte alinea's).

Tijden: alinea-id + lokale tijd in s, zoals in FILMDATA.

**Totaal: 12 MOET, 19 KAN.**

## Wat goed is (biologie)

- Basen in ringvorm, goed volgehouden: A en G als zeshoek + vijfhoek, T en C als één zeshoek. Bij A–T twee waterstofbruggen, bij G–C drie (s07, s14).
- Vrije nucleotiden als trifosfaat (drie fosfaatjes aan suiker + base) (s09). Klopt en is mooi.
- Richting in de vork (s27) klopt. Bovenste matrijs 3'→5' van links naar rechts, de leidende streng groeit met de vork mee. Onderste matrijs 5'→3', de volgende streng wordt van de vork af gebouwd. Aan het helixeinde staan 5'/3' consequent. Eén primer aan het begin van de leidende streng, één primer per Okazaki-fragment op de plek waar elk fragment begint. Primers worden vervangen en ligase zit op de naad. De meta 'fragmenten korter dan echt' en '100 tot 200 nucleotiden per stuk' kloppen.
- Meselson-Stahl (s25): lichte banden boven en zware onder. Start zwaar, na 1 ronde één band tussenin, na 2 rondes tussenin + licht, even sterk. Klopt.
- Celcyclus (s03/s06): één chromatide in G1, twee na S, uiteen in M. De verhouding van de fasen is redelijk.
- 1 600 stippen × 600 000 bp ≈ 1 miljard bp, dus de rekensom bij '1 fout op een miljard' klopt (s21). 3·10⁹ / 50 per seconde ≈ 1,9 jaar (s16).
- Noor (1,66 m) naast de lat van 2 m klopt (s01).

## MOET

### MOET 1 · s01 (0–16 s) en s29 · losse, vergrote arm zonder zoom
- Zag: links zweeft een onderarm met mouwtje ('onderarm van Noor'), ongeveer 1,6× zo lang als de hele Noor rechts. Noor heeft zelf twee armen. Niets geeft aan dat dit een vergroting is, dus de onderlinge maten kloppen niet (C10.7) en het leest als een losse arm.
- Moet: de schaafwond op Noors eigen arm tekenen, met een gouden zoomcirkel naar de vergrote arm (C5), of op zijn minst de meta 'VERGROOT' en een lijntje naar haar arm.

### MOET 2 · labels tegen de rand of over de tekening (s03, s08, s27)
- s03 14,3 s: 'HET DNA WORDT GEKOPIEERD' loopt tot ±26 px van de rechterrand (op 1920). s03 20,0 s: 'KOPIEËN NAAR TWEE DOCHTERCELLEN' doet hetzelfde, en 'M = deling' staat óver de rechter chromatide.
- s08 ±8–11 s: 'TREKT DE STRENGEN UIT ELKAAR' schuift met de helicase mee tot ±34 px van de rand.
- s27 0–5 s: '3'' en '5'' links staan ±40 px van de rand.
- Moet: alles ≥ 60 px van de rand, en 'M = deling' naast de chromosomen in plaats van erover. Het helicaselabel links van het enzym zetten, of vast laten staan.

### MOET 3 · s07 en s08 · schaalbalken kloppen niet met de tekening
- s07 (4,5 s): 'DNA · BEELD 8 NANOMETER BREED', maar er staan ±6 windingen in beeld. Eén winding is 3,4 nm, dus het beeld is ±20–25 nm breed. De helix is ook ±1/3 zo dik als bij 8 nm zou horen (2 nm = 1/4 van de beeldbreedte).
- s07 (7,5–14 s): de balk '0,34 nanometer per basenpaar' is ±30 px, terwijl de basenparen ±100 px uit elkaar staan.
- s08: de balk '3,4 nanometer' is ±65 px, terwijl één winding ±45 px is.
- Moet: balk = één basenpaarafstand of één winding, en de meta van de beeldbreedte uitrekenen uit het aantal windingen (C8 'schaalbalk', C9 DNA).

### MOET 4 · s09, s10, s26 · letter van het nieuwe nucleotide staat ondersteboven, juist in de focus
- Zag: in de gouden focusbox bij 'Deze wel: hij past tegenover de base' staat de A gedraaid ('Ɐ'). In s10 en s26 staat de G zo ('⅁'). Op de rest van de nieuwe streng en in s07/s14 staan de letters rechtop.
- Moet: de letter rechtop tekenen, los van de draaiing van de base.

### MOET 5 · s10 (10,2–13,5 s) · 'Alleen dan sluit het enzym zich' is niet te zien
- Zag: de stills op 11, 12 en 13 s zijn gelijk. De bovenlob (vingers) en de gouden pocket bewegen niet. Dit is het kernmechanisme van hoofdstuk 2 (C9: 'an enzyme has a pocket that closes slightly around its substrate').
- Moet: op 'sluit' klapt de vingerlob zichtbaar dicht over het nucleotide (met een korte aanloop, C8), de gouden pocket sluit, dan 'koppelt vast' (flits op de binding), en daarna gaat het weer open. In s21 zit `sluit` al in `polyClose`.

### MOET 6 · s11 (±4–6 s) · 'Maar ze lopen tegengesteld' is niet te zien
- Zag: het woord 'tegengesteld' zweeft rechtsboven boven de ongeopende helix. Er is geen richting op de oude strengen te zien (geen pijlen, geen kopjes), dus de kijker ziet niet wát er tegengesteld is.
- Moet: op 'tegengesteld' op elke oude streng een pijl in tegengestelde richting (havo zonder 5'/3', of met een eenvoudig 'kop/staart'), het label tussen de twee pijlen. Daarna sluiten 'met de rits mee' en 'steeds een stukje terug' daar logisch op aan.

### MOET 7 · s15 (3–12 s) · oude en nieuwe streng zijn niet te onderscheiden (semiconservatief, havo)
- Zag: bij 'Elke oude streng heeft opnieuw zijn eigen partner gekregen' en de labels 'nieuwe streng + oude streng' hebben beide helixen dezelfde licht- en donkerpaarse streng. Het origineel (s07, s08) had ook al een lichte en een donkere streng. In s22 geldt daarna 'donker = oude streng · licht = nieuwe streng'. Zo heeft een van de oude strengen precies de 'nieuw'-kleur, en het havo-hoofdbeeld van semiconservatief draagt niets.
- Moet: vanaf het openen (s08–s11) de nieuwe strengen in één eigen toon (of met een gouden rand), en de oude strengen in hun toon houden. Dezelfde code gebruiken in s15, s22 en s29.

### MOET 8 · s19 (12,6–16,8 s) · goud betekent twee dingen in één beeld
- Zag: de gouden stippen zijn de startpunten (label 'startpunt' net daarvoor). Op 'alles' verschijnen gouden blokjes met de meta 'GOUD = EEN GEN'. De leerling kan stip en gen niet uit elkaar houden, en 'ook stukken zonder gen' (het niet-goude) valt weg tussen de gouden stippen.
- Moet: de startpuntstippen dimmen of in de lijnkleur zetten zodra de genen verschijnen, of de genen een eigen vlak geven (bv. groen, max. 3 kleuren). Het niet-coderende deel juist even oplichten bij 'die ze niet gebruikt'.

### MOET 9 · s25 (0–16,5 s) · legenda bij Meselson-Stahl staat op de verkeerde hoogte
- Zag: rechts staat de legenda 'zwaar + zwaar' op de hoogte van LICHT, 'oud zwaar + nieuw licht' tussen TUSSENIN en ZWAAR, en 'licht + licht' onder ZWAAR. De zware molecule staat dus naast de lichte band, en dat in de kernscène voor de vraag.
- Moet: legenda op de bandhoogte zetten, met 'licht + licht' bij LICHT, de hybride bij TUSSENIN en 'zwaar + zwaar' bij ZWAAR. Of de legenda los onder de buizen zetten, zonder de suggestie van uitlijning.

### MOET 10 · s26 (±19–28,5 s) · primer op de verkeerde plek; enzym gedimd terwijl het genoemd wordt
- Zag: bij 'Het heeft een kort startstukje van RNA nodig: een primer' verschijnt de teal primer middenin de al lange nieuwe streng, net achter de groeitop. Links ervan ligt al een hele streng DNA. Dat zegt het omgekeerde van 'kan niet zelf beginnen'. Bij 'En het enzym kan niet zelf beginnen' (±19–21 s) is de polymerase bovendien bijna onzichtbaar gedimd (C5: wat genoemd wordt, wordt nooit gedimd).
- Moet: een open stuk matrijs zonder nieuwe streng tonen, polymerase vol in beeld die 'niet kan beginnen'. Daarna legt primase de primer aan het begin (5'-kant van de nieuwe streng), en de polymerase begint vanaf het 3'-uiteinde van de primer.

### MOET 11 · s27 (27,3–31 s) · 'ligase' niet eenduidig bij zijn enzym
- Zag: de ligase is een klein grijs bolletje op de naad (met gouden ring), boven de streng. Het label 'ligase · PLAKT DE STUKKEN' staat ónder de streng. Rechts ernaast, vlak bij 'STUKKEN', drijft een losgelaten, open polymerase (C-vorm). De leerling koppelt het label aan het grotere, losse enzym.
- Moet: het label direct naast de ligase (boven de streng), de vertrekkende polymerase eerder laten wegdrijven of dimmen, en de ligase iets groter met een zichtbare 'plak'-handeling (naad sluit).

### MOET 12 · s28 (29,3–39 s) · herstel van een fout wordt niet getoond
- Zag: bij 'DNA-repair-enzymen gaan langs het nieuwe DNA en vervangen verkeerd ingebouwde nucleotiden' hangt een paarse kluwen stil boven de streng, met een groen kadertje om een gewone A. Er is geen verkeerde base (koraal) en er wordt niets uitgeknipt of vervangen (stills op 30,5 en 33,5 s zijn gelijk). BEELDAFSPRAKEN: 'laat het proces echt gebeuren'.
- Moet: een koraal (verkeerde) base in de nieuwe streng, het enzym schuift erheen, knipt hem eruit, het goede nucleotide komt erin en het kader wordt groen. Dan klopt 'Daardoor gaat er zo weinig mis'.

## KAN

1. **s01 (4–10 s)** Wit streepje bovenin de zoomcirkel (een schaalbalk zonder label?). Bij 11 s schemert de rand van de vorige zoomcirkel boven het kader 'DNA uit één cel' uit.
2. **s03 (0–6 s)** 'Een cel die gaat delen' is bijna leeg (vier mitochondriën, kern). Dat is de bekende fout uit C9 ('an empty cell with five loose organelles'). Iets ER, ribosomen en wat rustige textuur maken hem vol.
3. **s03–s06, s04** Het M-vak van de klok is de hele tijd goud(oker), ook als het geen focus is. Goud is voor de focus (C1). M neutraal, en pas goud bij 'M-fase'.
4. **s07 (3–6 s)** De groeven van de helix zien er gelijk uit (C9: grote en kleine groef zichtbaar ongelijk). Het kleine gouden haakje dat boven de ladder rondschuift (7–11 s) heeft geen betekenis die de stem noemt. Weghalen, of laten aanwijzen wat 'tegenover A staat T' bedoelt.
5. **s08, s10, s16, s17, s28** Enzymen zijn een tros grijze bolletjes (helicase) of een blob met een krul. BEELDAFSPRAKEN wil een gevouwen keten. Voor nu acceptabel met 'model · vereenvoudigd', maar de helicase als druiventros is het zwakst. Een ring van zes subeenheden rond één streng komt dichter bij de werkelijkheid.
6. **s09–s10, s21, s26, s28** Het basenmodel is zo dicht dat de letters elkaar op 960 px overlappen ('CT TCT', vier rijen). Je kunt nauwelijks lezen welke paren er staan. Minder basenparen en groter, of de verre context dimmen.
7. **s10** Het label 'DNA-polymerase' staat ±70 px onder-links van het enzym, en er drijft een vrij nucleotide achter de tekst. Dichter bij het enzym zetten.
8. **s11 (havo)** Op beide nieuwe strengen staan teal stukjes (primers) die in het havo-blok nergens worden genoemd. Weglaten in de havo-versie, of 'startstukje' noemen.
9. **s14 (12 s)** Stem: 'maar het spiegelbeeld: de partner'. Complementair is geen spiegelbeeld (de letters worden niet gespiegeld). Voorstel aan Kamiel: 'maar de aanvulling: de partner' (stem moet dan opnieuw, kleine take).
10. **s14, s26, s27, s28** RNA (U, primer, mRNA) is teal, terwijl C1 'DNA en RNA paars' vastlegt. Binnen de film is het onderscheid nuttig. Kamiel laten kiezen en dan vastleggen in de bibliotheek (C1: vaste moleculekleuren).
11. **s15 (0–2 s)** De twee nieuwe helixen liggen eerst over elkaar heen en vormen één kluwen. Al iets uit elkaar beginnen.
12. **s16** Op t = 0 staat alleen een kale lijn (de polymerase komt pas na 1,8 s). De kalender telt op van 0,2 naar 1,9 jaar en staat op 12,2 s nog op '1,3 jaar' terwijl 'bijna twee jaar' al klinkt: meteen '1,9 jaar' tonen. Het koraal kopje van de kalender is decoratief (koraal = energie/bloed).
13. **s03, s06, s15, s20** Bovenaan de chromatiden steken korte grijze streepjes buiten de omtrek (C9: losse lijnen op het testvel nalopen). Binnen de omtrek clippen.
14. **s21** 'heel soms een verkeerde' staat rechtsboven, ±250 px van de koraal base. Bij het label zetten. Bij de overgang naar het stippenveld (9,5–10,5 s) staat 'mutatie · EEN KOPIEERFOUT DIE BLIJFT STAAN' even over de basen.
15. **s22** (a) Bij 12,9 s vloeit Micro (balken + legenda) over in Schema (kolf + titel), en staat 'Meselson en Stahl, 1958' even over 'DONKER = OUDE STRENG'. C6: harde snede, geen fade tussen twee looks. (b) 'al het dna zwaar' in kleine letters, moet 'DNA' zijn. (c) De tweede kolf 'daarna lichte stikstof' verschijnt pas op ±25,3 s, terwijl 'lichte stikstof' op 24,5 s klinkt. Op 'Daarna' (22,7 s) laten verschijnen.
16. **s26** '5''/'3'' staan ver van de strenguiteinden (links op x≈70, rechts op x≈1860 terwijl de streng op ±1420 eindigt), en rechtsboven ontbreekt '3''. Labels direct aan de uiteinden. 'groeit van 5' naar 3'' staat rechtsboven, los van de pijl links: bij de pijl zetten.
17. **s27 (20–27 s)** De naden tussen de Okazaki-fragmenten zijn vóór de ligase nauwelijks te zien. Een klein gaatje of knikje per naad maakt 'plakt de stukken aan elkaar' sterker.
18. **s28** (a) Op t = 0 zijn de panelen nog bijna onzichtbaar (±0,6 s). (b) De transcriptie toont RNA-polymerase op een gesloten helix. Een klein open bubbeltje met het mRNA aan de matrijs is juister. (c) 'Sommige virussen …': alleen een tekstkader, geen beeld. (d) Het repair-enzym is paars (DNA-kleur), terwijl enzymen grijsblauw horen te zijn (C2).
19. **s29 (8–27 s)** De zoomcirkel valt over de vingertoppen van de arm. Hand en cirkel uit elkaar, de wijslijnen vanaf de schaafwondplek.

## Nog doen (voor de maker)

- MOET-punten in het foutenlogboek `films/logboek/fouten.jsonl` zetten en daarna `python3 scripts/foutenpatronen.py` draaien (de reviewer heeft niets aan de film of het logboek veranderd).
- KAN 9 ('spiegelbeeld') en KAN 10 (RNA-kleur) aan Kamiel voorleggen: dat is een keuze in toon of stijl, geen fout met bronnen.
- Na de fixes: Vragen uit opnieuw afspelen rond s06, s14, s19 en s25 (5 s ervoor tot 5 s erna).

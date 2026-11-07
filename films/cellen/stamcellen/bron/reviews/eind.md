# Eindreview (fresh eyes) — Stamcellen, script v2

Reviewer: eindreviewer, 14 okt 2026. Bekeken: alle 94 stills in `qa/`, `scenes.js`, `script_v2.md`, `segments.json`, `film.py`, `sections.html` en `words/*.json`. De cues heb ik nagelopen met `cuecheck.py` (0 missend) en `cuewhere.py`. Ik heb geen bronbestanden gewijzigd. Dit rapport vervangt de vorige versie van `eind.md`. Mijn bevindingen bevestigen de punten daarin en voegen er een paar toe (gemarkeerd met **[nieuw]**).

Verwijzingen: `L…` = regel in `scenes.js`, `S…` = regel in `script_v2.md`, stills = `qa/<naam>.png`. **Audio** zegt of de fix een nieuwe opname nodig heeft.

**Oordeel:** de tekst is vakinhoudelijk in orde, de vragen kloppen en de cues staan goed. De belangrijkste problemen zitten in het beeld:
- De rode bloedcel "zonder kern" heeft in beeld een kern.
- In cellen die niet delen staan X-vormige (verdubbelde) chromosomen.
- s17 is 7 seconden leeg.
- Op een paar plekken vallen labels over elkaar.

Alles is met code op te lossen. Er hoeft niets opnieuw opgenomen te worden; de opnamen voor de optionele tekstpunten (1.6, 1.7) kunnen op de wachtlijst.

---

## 0. Steekproef: zijn de eerdere reviews verwerkt?

| Review | Punt | In v2? |
|---|---|---|
| expert 1 | "precies dezelfde genen" geschrapt, rode bloedcel als uitzondering | tekst: ja (S29). **Beeld: nee**, de cel heeft een kern (zie 1.1) |
| expert 2 | emergent = samen in één ritme, één cel klopt al | ja (S67–69, L176–180) |
| expert 3 | bevruchte eicel als tegenvoorbeeld | ja (S47, L131) |
| expert 4 | geen hartstamcellen gevonden, ±1 % per jaar | ja (S46, L128–129) |
| expert 5 / curr. 3 | kiemlaag, "meestal", verhoornen, afschilferen | ja (S43–44, L118–123) |
| expert 6 | dochtercellen in het beenmerg delen snel | tekst: ja. Beeld: er komen meteen rijpe rode bloedcellen uit de stamcel (laag, 1.8) |
| expert 9 | Embryowet tijdbestendig geformuleerd | ja (S71) |
| expert 11 | Yamanaka 2006 muis / 2007 mens / Gurdon, pluripotent | ja (S76) |
| curr. 1–2 | afstoting, donor-DNA en bloedgroep | ja (S57–58, L155–161) |
| curr. 4 | weefsel | ja (S68, L180) |
| curr. 5 | tumorrisico iPS | ja (S72). Niet bij embryonale stamcellen (1.6) |
| curr. 6–7 | promotor, methylering, histonen, iPS-term, unipotent | ja (S40, S76) |
| curr. 8c | rode bloedcel met chromosomen in beeld | chromosomen weg, maar de kern staat er nog (1.1) |

---

## 1. Vakinhoud (tekst, beeld, vragen, begrippen)

### 1.1 HOOG — de rode bloedcel "zonder kern" heeft een kern in beeld
Stills: `s04_029.81` (label "rode bloedcel: geen kern, dus geen DNA"), `s03_002.50`, `s12_009.09`, `s14_004.33`, `s14_021.66`, `s17_008.85`, `s20_030.91`.

`rodeBC` (L23) tekent in het midden een donkere schijf (`#8A2A2A`, 0,6) die er net zo uitziet als de kernen van de andere cellen. Beeld en stem spreken elkaar tegen, precies op het moment waarop de film dit uitlegt.

**Fix L23:** maak het midden lichter, als een indeuking:
```js
function rodeBC(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, ROOD, '#E07A6E', 2); circ(ctx, x, y, r * 0.5, rgba('#F0A89E', 0.4)); ctx.restore(); }
```
Audio: nee.

### 1.2 MIDDEL-HOOG — X-chromosomen in cellen die niet delen
Stills: `s04_016.02`, `s04_022.43`, `s04_029.81`, `s06_007.56`, `s21_007.77`, `s21_012.95`. Code: L27–29 (`iks`, `chromRij`), gebruikt in L76, L90 en L204.

Een X-vorm is een verdubbeld chromosoom (twee chromatiden). Die vorm zie je alleen rond een deling. Hier staat hij juist in een zenuwcel ("deelt niet"), en vlak na "beide cellen krijgen een kopie". Zo leren leerlingen de bekende misvatting dat chromosomen altijd X-vormig zijn.

**Fix L27–29:** gebruik enkele chromatiden.
```js
function chromatide(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 15 * s); ctx.quadraticCurveTo(x + 5 * s, y, x, y + 15 * s); ctx.stroke(); ctx.restore(); }
function chromRij(ctx, x, y, a = 1) { for (let i = 0; i < 5; i++) chromatide(ctx, x - 64 + i * 32, y, 0.9, CHR[i], a); }
```
Audio: nee.

### 1.3 MIDDEL — q07 afleider c is strikt genomen waar, en de spiercel klopt niet met "been" [deels nieuw]
Stills: `q07_007.00`, `s06_*`, `s08_*`. Code: segments.json q07; L17 (`spiercel`).

- Optie c luidt "de spiercel heeft meer chromosomen, voor zijn kracht". Een spiercel uit je been is een skeletspiervezel met honderden kernen, dus hij heeft wél meer chromosomen. Een sterke leerling kan c verdedigen.
- **[nieuw]** De film tekent de "spiercel (been)" als een spoelvormige cel met één kern in het midden. Zo ziet een glad-spiercel eruit, geen skeletspiervezel. Dezelfde vorm komt terug als "hartspiercel" (s11, s17, s18).

**Fix q07 c (segments.json):** "in de spiercel zijn de genen die hij niet nodig heeft eruit geknipt". Dat is een echte misvatting, en de film weerlegt hem in s08 ("die genen zitten ook in je spiercel"). Optioneel: geef de spiercel in s06/s08 dwarsstrepen en 3–4 kernen aan de rand. Doe dat pas nadat c is vervangen.

Audio: nee, de stem leest de opties niet voor.

### 1.4 MIDDEL (vwo) — methylgroepen op het celmembraan in plaats van op het DNA
Still: `s09_041.86`. Code: L113–114.

De CH₃-pinnetjes staan op de rand van de huidcel. De stem zegt dat de markeringen op het DNA en de histonen zitten.

**Fix:** zet ze op de kern en zeg het in het label.
```js
fade(ctx, del, () => { huidcel(ctx, 560, 470, 2.4); for (let i = 0; i < 3; i++) methyl(ctx, 540 + i * 20, 462, 1); pijl(ctx, 760, 470, 960, 470, C.line, 1);
  huidcel(ctx, 1160, 400, 2); huidcel(ctx, 1160, 560, 2); for (let k = 0; k < 2; k++) for (let i = 0; i < 3; i++) methyl(ctx, 1143 + i * 17, 393 + k * 160, 0.9);
  regel(ctx, 'markeringen op het DNA blijven na de deling', 960, 720, 1, C.text, 30); tag(ctx, 'epigenetica', 960, 820, C.goud, q.on('epigenetica', 1)); });
```
Audio: nee.

### 1.5 LAAG-MIDDEL — label stelliger dan de stem
Still: `s17_008.85`. Code: L169. Het label zegt "de keuzes liggen al vast", de stem zegt "al grotendeels vast".

**Fix:** `tag(ctx, 'alle genen, maar de keuzes liggen grotendeels vast', 1420, 440, C.text2, q.on('keuzes', 1));`

Audio: nee.

### 1.6 LAAG-MIDDEL — tumorrisico lijkt alleen voor iPS-cellen te gelden
Still: `s19_031.00`. Code: L188, S72.

Embryonale stamcellen kunnen ook tumoren (teratomen) vormen. De film noemt het risico alleen bij iPS. Een leerling kan daaruit afleiden dat embryonale stamcellen veilig zijn.

**Fix (beeld):** `tag(ctx, 'risico: tumoren (ook bij embryonale)', 1440, 620, C.koraal, tu);` Audio: nee.

**Optioneel (tekst):** "Maar net als embryonale stamcellen delen ze zich zo makkelijk, dat er soms tumoren uit ontstaan." Audio: ja, s19 (wachtlijst).

### 1.7 LAAG — kleine tekstpunten (allemaal optioneel)
- **S40 (vwo):** "Zo blijft een huidcel bij zijn deling een huidcel." Dit botst met de basis, waar de delende cel in de huid een *ongespecialiseerde* stamcel is. Beter: "Zo blijft een levercel na een deling een levercel." Audio: ja, s09.
- **S58:** "zelfs **zijn** bloedgroep". De donor kan ook een vrouw zijn. Beter: "zelfs de bloedgroep van de donor". Audio: ja, s14.
- **S72 [nieuw]:** "worden ze niet afgestoten" is wat stellig. Beter: "worden ze in principe niet afgestoten". Audio: ja, s19. Het label in L187 kan nu al worden: `'eigen cellen: (vrijwel) geen afstoting'`.
- **S64 vs S76 [nieuw]:** in de basis kan een iPS-cel "bijna elke celsoort" worden, in het vwo-blok is pluripotent "elke celsoort van het lichaam". Dat is te verklaren (geen placenta), maar zeg het in het docentdeel van `sections.html` bij iPS: "'bijna elke' = alles behalve placenta". Audio: nee.
- **film.py, begrip transcriptiefactor [nieuw]:** de definitie geeft alleen de activerende functie. Beter: "Eiwit dat aan de promotor van een gen bindt en zo bepaalt of RNA-polymerase het gen kan overschrijven." Audio: nee.

### 1.8 LAAG — beeldpunten bij de inhoud
- **L135, `s12_009.09`:** de stamcel laat direct rijpe rode bloedcellen (met "kern") los, terwijl de stem zegt dat de dochtercellen zich snel delen. **Fix:** teken bij x ≈ −60 één voorlopercel (`bolcel`, r 18) die op `q.on('dochtercellen',1)` in tweeën splitst, en laat de rode bloedcellen pas daarna vertrekken.
- **L137, `s12_021.20` [nieuw]:** de darmstamcellen zitten in de crypten, tussen de vlokken. Nu staan ze aan de voet van één vlok, zonder naam. **Fix:** `regel(ctx, 'stamcellen', 1400, 740, 1, STAM, 24)` onder de vlok, of teken twee crypten naast de vlok.
- **L98, `s08_026.53`:** de stem zegt "Een hartspiercel bijna niet", het beeld toont een heel hart. **Fix:** `regel(ctx, 'hartspiercellen: bijna niet', 1400, 560, …)`.
- **L95, `s08_014.27`:** de genpatronen wijken af van s05 (L81). Lampje 2 (het insuline-gen in s05) brandt in s08 in de zenuwcel. **Fix L95:** `[1,0,0,1,0,1]` voor de zenuwcel en `[0,1,0,1,1,0]` voor de spiercel.

---

## 2. Beeld en stem lopen niet gelijk

### 2.1 MIDDEL — 7 seconden leeg beeld in s17
Still: `s17_014.74`. Code: L170.

Van "Misschien" (13,0 s) tot "huidcel" (20,1 s) is het beeld helemaal leeg. De stem zegt ondertussen "alle genen zitten erin, dus het kan. In het lab kan het bijna."

**Fix:** zet bovenaan in `fade(ctx, mis, …)` van L170:
```js
fade(ctx, 1 - q.on('huidcel', 1), () => { stamcel(ctx, 640, 450, 70, 1, t); regel(ctx, 'bloedstamcel', 640, 590, 1, STAM, 30);
  regel(ctx, 'alle genen zitten erin…', 1220, 420, q.on('genen', 2), C.text, 34); tag(ctx, 'in het lab: bijna', 1220, 540, C.goud, q.on('lab', 1)); });
```
De cues `genen,2` (14,4 s) en `lab,1` (17,0 s) bestaan. Audio: nee.

### 2.2 MIDDEL — de tags bij de knie vallen 4 s over elkaar (s01)
Stills: `s01_006.16` ("schaafwond" en "huid hersteld" door elkaar), `s01_014.37` ("hartinfarct" en "litteken: groeit niet terug").

`heal` loopt van 3,3 tot 7,5 s (L63), en beide tags staan op dezelfde plek (L64). Ze zijn dus ongeveer 4 s tegelijk half zichtbaar. Bij het hart (L66) overlappen de tags 0,6 s.

**Fix L64 en L66:**
```js
tag(ctx, 'schaafwond', 560, 760, C.koraal, q.on('schaaft', 1) * clamp(1 - heal * 2, 0, 1)); tag(ctx, 'huid hersteld', 560, 760, C.groen, clamp(heal * 2 - 1, 0, 1));
// L66
const lw = ramp(t, q.at('littekenweefsel', 1), 0.8);
tag(ctx, 'hartinfarct', 1380, 760, C.koraal, hz * clamp(1 - lw * 2, 0, 1)); tag(ctx, 'litteken: groeit niet terug', 1380, 760, C.text2, clamp(lw * 2 - 1, 0, 1));
```
Hetzelfde patroon (0,6 s) zit in s05 L86 en s18 L179–180. Pas het daar op dezelfde manier toe. Audio: nee.

### 2.3 LAAG-MIDDEL — leeg begin van s12 en s13
- **`s12_003.03`, L135:** het beeld is 3,2 s leeg tijdens "Stamcellen zitten op meer plekken". **Fix:** `bot(ctx, 520, 430, 1.1, q.on('plekken', 1), …)` (1,4 s).
- **`s13_001.57`, L144:** het beeld is 2,7 s leeg tijdens "En embryonale stamcellen?". **Fix:** geef de blastocyst `q.on('embryonale', 1)` (0,2 s) en laat het label op `embryo,2` staan.

Audio: nee.

### 2.4 LAAG-MIDDEL — de stamcel die stamcel blijft, schuift in het schema omhoog (s10) [nieuw]
Still: `s10_013.38`. Code: L122.

De stem zegt: één cel blijft stamcel, "de andere cel schuift omhoog". In het schema gaan beide dochtercellen schuin omhoog, en "blijft stamcel" staat bovenaan. De stamcel hoort onderin te blijven.

**Fix L122:** zet de stamceldochter naast de moedercel en laat alleen de andere cel stijgen.
```js
stamcel(ctx, 1500, 700, 46, 1, t); pijl(ctx, 1450, 700, 1350, 700, STAM, 1); pijl(ctx, 1530, 655, 1610, 530, C.line, 1);
stamcel(ctx, 1300, 700, 40, q.on('stamcel', 3), t); regel(ctx, 'blijft stamcel', 1300, 630, q.on('stamcel', 3), STAM, 26);
huidcel(ctx, 1640, 470, 1.2, q.on('andere', 1)); regel(ctx, 'schuift omhoog', 1640, 400, q.on('andere', 1), HUIDC, 26); regel(ctx, 'meestal', 1500, 800, q.on('meestal', 1), C.text2, 26);
```
Controleer dat "kiemlaag: stamcellen" (L119, x 1120–1450) en de stamcel op x 1300 niet botsen. Verschuif het label anders naar y 840. Audio: nee.

### 2.5 LAAG — kleine timingpunten
- **`s12_028.17`, L140:** het vinkje staat er al zodra het paneel verschijnt (26,8 s), want het reageert op `bloedcellen,1` (11,2 s). De stem zegt "maakt bloedcellen" pas op 27,9 s. **Fix:** `q.on('bloedcellen', 3)`.
- **`s17_002.95`, L168:** de spiercel met kruis verschijnt op "alleen" (2,7 s), vóór de bloedcellen (3,2 s), en hij heeft geen naam. **Fix:** `kruis(ctx, 1170, 640, 20, q.on('geprobeerd', 1)); regel(ctx, 'hartspier', 1010, 710, q.on('alleen', 1), SPIER, 26);`
- **`s04_022.43`, L76:** de huidcel licht op bij "dezelfde", maar de stem noemt geen huidcel. **Fix:** vervang in `types` het cue-woord `'dezelfde'` van de huidcel door `'lichaamscellen'` (25,5 s).

Audio: nee.

---

## 3. Opmaak: overlap, afsnijding, leegte

Niets staat onder y = 900. Het laagste element is de voet van de persoon in s14 (±860).

### 3.1 MIDDEL — labels over elkaar (vwo, s09)
Still: `s09_013.50`. Code: L106–107. "transcriptiefactoren" en "RNA-polymerase" overlappen tot het enzym gaat schuiven (14,8 s).

**Fix L107:** `px = lerp(GX0 + 80, GX1 - 60, ramp(t, q.at('overschrijven', 1), 4))`.

Ook in s09:
- **L103:** de bovenste rij springt bij "Daarnaast" in één frame van y 460 naar 320. **Fix:** `const y1 = lerp(460, 320, uit);`
- **L108 [nieuw]:** de tag "gen aan" ligt over het eind van de DNA-streng. **Fix:** `tag(ctx, 'gen aan', 1800, …)`.
- **L110–112 [nieuw], `s09_031.51`:** het histon-DNA hangt los van de streng. "gen uit" komt bij de histonen te staan, niet bij een gen. **Fix:** laat de onderste streng doorlopen achter de histonen, `dnaStreng(ctx, X0, 1560, y2, 1)` (vóór de histonen tekenen), en zet `tag(ctx, 'gen uit', 1720, y2 + 6, …)`.

Audio: nee.

### 3.2 MIDDEL — aanwijslijn door de tekst (vwo, s20)
Still: `s20_018.54`. Code: L195. De lijn van "binnenste celmassa / embryonale stamcellen" loopt dwars door "pluripotent" en door de balk.

**Fix:** vervang het label door tekst rechts in de balk:
```js
regel(ctx, 'binnenste celmassa · embryonale stamcellen', 1270, 391, q.on('celmassa', 1), STAM, 24, 'right', 600);
```
Audio: nee.

### 3.3 MIDDEL — spookbeeld en overlap bij "volwassen stamcel" (s12)
Still: `s12_028.17`. Code: L135, L138–139.

Het beenmerg en de darm blijven op 30 % staan. De tag "volwassen stamcel: …" schuift dan over "darm: binnenste laag", en het paneel ligt over half zichtbare cellen.

**Fix:** `fade(ctx, 1 - vol * 0.92, …)` in L135, en in L138 `regel(ctx, 'darm: binnenste laag', 1400, 150, 1 - vol, C.text, 28)`. Audio: nee.

### 3.4 LAAG-MIDDEL — tag bedekt de darmstamcellen (s12)
Still: `s12_021.20`. Code: L138. "elke 3 tot 5 dagen nieuw" (box 772–826) ligt over de stamcellen (y 770).

**Fix:** `tag(ctx, 'elke 3 tot 5 dagen nieuw', 1400, 858, C.goud, q.on('drie', 1));` De box loopt dan van 820 tot 874, dus nog boven 900. Audio: nee.

### 3.5 LAAG-MIDDEL — eindkaart: regel 4 loopt van rand tot rand
Still: `s22_004.50`. Bron: segments.json s22, S83. De regel loopt van ±24 tot ±1896 px.

**Fix:** splits de regel in twee:
- "Transplantatie: donor moet passen · iPS: eigen cellen, wel tumorrisico."
- "Emergent: cellen kloppen samen in één ritme."

Audio: nee.

### 3.6 LAAG — onderste rij huidcellen ligt over de kiemlaag
Stills: `s10_002.68`, `s11_008.41`, `s21_018.12`. Code: L44–46.

**Fix L44:** laat nieuwe cellen uit de stamcel opkomen. Vermenigvuldig hiervoor `al` met `clamp((pos - 0.3) / 0.7, 0, 1)`. Audio: nee.

### 3.7 LAAG — overige
- **`s11_026.09`, L131:** de twee dochtercellen van de eicel liggen voor 2/3 over elkaar en lijken een Venn-diagram. **Fix:** `sp = ramp(…) * 120`, straal `170 - sp * 0.55`.
- **`s14_040.30`, L160:** het "bloed" is een losse rode bal, en het label staat ver weg. **Fix:** teken 5 `rodeBC` in een bloedvatje langs de arm (x ≈ 760, y 520–680), met het label er direct boven.
- **`s14_021.66`, L52/L153:** de infuuslijn eindigt in de lucht. **Fix:** trek een lijn van (500, 400) naar de arm (≈ 760, 640).
- **`s18_024.08`, L180:** de tag "weefsel: …" (y 690) ligt op de rand van het schaaltje. **Fix:** y 790, en de emergent-tag naar y 860.
- **`s01_002.05` [nieuw]:** de knie leest als een elleboog met mouw. **Fix in `knie` (L33):** teken een schoen aan het eind van het onderbeen, bijvoorbeeld `ctx.fillStyle='#2A3242'; ctx.beginPath(); ctx.ellipse(250,-215,70,40,-0.7,0,6.283); ctx.fill();`.
- **Contrast:** "kan bijna elke celsoort worden" (L171), "geïnduceerde pluripotente stamcel" (L199) en "lederhuid" (L42) zijn klein en grijs. **Fix:** 26 px en `C.text`.
- **Ondertitels:** "Antwoord bee./aa./cee." (segments.json `display` s08, s11, s17, s21). Volgens `uitspraak.md` houden de ondertitels de juiste spelling, terwijl de tags "antwoord b" zeggen. In de repo komen beide schrijfwijzen voor. **Fix (optioneel):** zet in `display` "Antwoord b." en houd de respelling alleen in `voice`. Pas de tekst in words/*.json mee aan; de cues gebruiken "Antwoord", dus die blijven werken.

Audio: nee.

---

## 4. Vragen

| Vraag | Juist (film.py) | Stem | Tag in beeld | Klopt? |
|---|---|---|---|---|
| q02 | 0 = a | "Antwoord aa" (s11 2,2 s), recap "aa" | "antwoord a" | ja |
| q07 | 1 = b | "Antwoord bee" (s08 0,7 s) | "antwoord b: hetzelfde DNA" | ja |
| q16 | 2 = c | "Antwoord cee" (s17 0,7 s) | "antwoord c" | ja |

**Afleiders:**
- **q02:** b is een eerlijke misvatting en wordt weerlegd (eicel). c is eerlijk, want een infarct is zuurstofgebrek. De film bespreekt c niet. Optioneel in film.py `explain`: "Je hartspier krijgt juist veel zuurstof via het bloed; het verschil zit in cellen die zich blijven delen."
- **q07:** a is eerlijk en wordt weerlegd. c moet anders (zie 1.3).
- **q16:** a is eerlijk en wordt weerlegd. b is eerlijk en wordt indirect weerlegd ("dochtercellen delen zich heel snel", s12). Optioneel in `explain`: "Snel genoeg delen ze wel, maar ze kunnen geen hartspier maken."

De opties zijn ongeveer even lang en de juiste antwoorden staan op verschillende plekken (a, b, c).

**Checkvragen (`sections.html`):** inhoudelijk correct, en de puntentelling klopt.
- Vraag 1: de tabel is consistent, en het antwoord bij b over de rijpe rode bloedcel is goed.
- Vraag 2: bloedgroep 0, DNA uit de witte bloedcellen en 50 % kans op bloedgroep A kloppen.
- Vraag 3: alleen Oct4 en Sox2 zijn met tabel 1 als onmisbaar aan te tonen (Klf4 wordt niet weggelaten), en het antwoordmodel zegt precies dat. Goed.

**Begrippenlijst:** correct. Alleen "transcriptiefactor" kan preciezer (1.7).

---

## Prioriteiten voor v3 (alles alleen code)
1. 1.1 rode bloedcel en 1.2 chromatiden (raakt 7 scènes), 1.3 q07 c.
2. 2.1 lege s17, 2.2 tags over elkaar in s01, 1.4 methylgroepen.
3. 3.1–3.3 (s09, s20, s12), 2.4 schema asymmetrische deling, 1.5 label "grotendeels", 1.6 tumorlabel.
4. De rest als er tijd is.

**Nieuwe opname nodig:** alleen voor de optionele tekstwijzigingen in 1.6 (s19) en 1.7 (s09 levercel, s14 bloedgroep, s19 "in principe"). Zet ze op de wachtlijst bij de volgende batch.

# Eindreview — Stamcellen (script v2, scenes.js, vragen)

Reviewer: eindreviewer, 14 okt 2026. Ik heb alle 90 stills in `qa/` bekeken en de cues met `cuecheck.py` en `cuewhere.py` nagelopen (0 missende cues). Ik heb geen bronbestanden gewijzigd.
Regelnummers: `scenes.js` (L…) en `script_v2.md` (S…). Stills: `qa/<naam>.png`.

**Oordeel:** de inhoud is na v2 goed en de cues kloppen bijna overal. Er zijn twee beeldfouten die de stem tegenspreken: een rode bloedcel die een kern lijkt te hebben, en X-chromosomen in cellen die niet delen. Verder zijn er drie lege beelden (samen ongeveer 13 s), een paar labels die over elkaar heen vallen, en één afleider (q07 c) die strikt genomen waar is.

## Controle van eerdere reviews
- **expert.md 1–12:** verwerkt. Bij punt 1 staat de rode bloedcel er nu in als cel zonder kern, maar de tekening laat toch een kern zien (zie 1.1).
- **curriculum.md 1–8:** verwerkt (afstoting, donor-DNA/bloedgroep, kiemlaag, weefsel, tumorrisico, promotor/methylering/histonen, iPS-term, "bloedstamcel"). Niet overgenomen, maar dat was optioneel: navelstrengbloed (8b) en wat Gurdon precies ontdekte (7).

---

## 1. Vakinhoud (tekst en beeld)

### 1.1 HOOG — rode bloedcel "zonder kern" heeft een donkere kern in beeld
Stills: `s04_029.81` (label "rode bloedcel: geen kern, dus geen DNA"), ook `s12_009.09`, `s14_004.33`, `s14_021.66`, `s17_008.85`. L23 `rodeBC` tekent in het midden een donkere schijf (`rgba('#8A2A2A',0.6)`), en die lijkt precies op de kern van de andere cellen. Beeld en stem spreken elkaar hier dus tegen, precies op het moment dat de film het verschil uitlegt.
**Fix (L23):** maak het midden lichter. Dan zie je de indeuking van de schijf in plaats van een kern.
```js
function rodeBC(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, ROOD, '#E07A6E', 2); circ(ctx, x, y, r * 0.5, rgba('#F0A89E', 0.45)); ctx.restore(); }
```

### 1.2 MIDDEL-HOOG — X-chromosomen (twee chromatiden) in cellen die niet delen
Stills: `s04_016.02`, `s04_022.43`, `s06_007.56`, `s21_007.77`. L27–29 (`iks`/`chromRij`), gebruikt in L76, L90 en L204. Een X-vorm is een verdubbeld chromosoom en komt alleen voor vlak voor of tijdens een deling. De film zet ze juist in een zenuwcel ("deelt zich niet") en direct na "Bij elke mitose krijgen beide cellen een kopie". Leerlingen leren zo de bekende misvatting dat chromosomen altijd X-vormig zijn.
**Fix (L27–29):** gebruik enkele chromatiden.
```js
function chromatide(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 15 * s); ctx.quadraticCurveTo(x + 5 * s, y, x, y + 15 * s); ctx.stroke(); ctx.restore(); }
function chromRij(ctx, x, y, a = 1) { for (let i = 0; i < 5; i++) chromatide(ctx, x - 64 + i * 32, y, 0.9, CHR[i], a); }
```

### 1.3 MIDDEL — q07 afleider c is strikt genomen waar
`q07_007.00`, segments.json q07, S34. Optie c luidt "de spiercel heeft meer chromosomen, voor zijn kracht". Een spiercel uit je been is een skeletspiervezel met honderden kernen, dus hij heeft echt meer chromosomen. Een sterke leerling kan c dus verdedigen. (Het beeld toont een spoelvormige cel met één kern, maar dat is schematisch en mag blijven.)
**Fix:** "c — de chromosomen van de spiercel zijn anders gebouwd, voor zijn kracht". De stem leest de opties niet voor, dus er hoeft niets opnieuw opgenomen te worden.

### 1.4 MIDDEL — methylgroepen op het celmembraan in plaats van op het DNA (vwo)
Still `s09_041.86`, L113–114. De CH₃-pinnetjes staan op de rand van de huidcel. De tekst zegt dat de markeringen op het DNA en de histonen zitten.
**Fix:** zet ze op de kern en benoem dat.
```js
fade(ctx, del, () => { huidcel(ctx, 560, 470, 2.4); for (let i = 0; i < 3; i++) methyl(ctx, 540 + i * 20, 462, 1); pijl(ctx, 760, 470, 960, 470, C.line, 1);
  huidcel(ctx, 1160, 400, 2); huidcel(ctx, 1160, 560, 2); for (let k = 0; k < 2; k++) for (let i = 0; i < 3; i++) methyl(ctx, 1143 + i * 17, 393 + k * 160, 0.9);
  regel(ctx, 'markeringen op het DNA blijven na de deling', 960, 720, 1, C.text, 30); tag(ctx, 'epigenetica', 960, 820, C.goud, q.on('epigenetica', 1)); });
```
**Inhoud, LAAG (S40):** "Zo blijft een huidcel bij zijn deling een huidcel" past slecht bij de basis, waar staat dat gespecialiseerde cellen zich vaak niet delen en dat in de huid de stamcellen delen. Beter: "Zo blijft een levercel na een deling een levercel." Neem die zin alleen opnieuw op als je toch al iets in s09 opneemt (wachtlijst).

### 1.5 LAAG-MIDDEL — label stelliger dan de stem
Still `s17_008.85`, L169. Het label zegt "alle genen, maar de keuzes liggen al vast", de stem zegt "al grotendeels vast".
**Fix:** `tag(ctx, 'alle genen, maar de keuzes liggen grotendeels vast', 1420, 440, C.text2, q.on('keuzes', 1));`

### 1.6 LAAG-MIDDEL — tumorrisico lijkt alleen voor iPS-cellen te gelden
`s19_031.00`, L188, S70. Embryonale stamcellen kunnen ook tumoren (teratomen) vormen, en dat is ook bij embryonale stamcellen een belangrijke rem op toepassing. De film zegt het nu alleen bij iPS. Een leerling kan daaruit afleiden dat embryonale stamcellen "veilig" zijn.
**Fix (alleen beeld, geen nieuwe opname):** `tag(ctx, 'risico: tumoren (ook bij embryonale)', 1440, 620, C.koraal, tu);`
Optioneel in het script: "…, worden ze in principe niet afgestoten. Maar net als embryonale stamcellen delen ze zich zo makkelijk, dat er soms tumoren uit ontstaan."

### 1.7 LAAG — kleinere punten
- S46/L129 "± 1 % per jaar": dat geldt voor jonge volwassenen, op hogere leeftijd is het minder (Bergmann 2009). Mag blijven. Eventueel "± 1 % per jaar (jong), later minder".
- S58 "zelfs **zijn** bloedgroep": de donor kan ook een vrouw zijn. Bij een volgende opname liever "zelfs de bloedgroep van de donor".
- L135: de dochtercellen in het beenmerg worden getekend als rode bloedcellen die meteen uit de stamcel komen. De stem zegt "Hun dochtercellen delen zich heel snel". Zou je één voorlopercel tekenen die zich deelt, dan klopt het beeld met de stem. Dit is optioneel.
- L95 (s08): de lampjespatronen wijken af van s05 (L81). Lampje 2 was in s05 het insuline-gen, maar brandt in s08 in de zenuwcel. **Fix:** gebruik in L95 `[1,0,0,1,0,1]` (zenuwcel) en `[0,1,0,1,1,0]` (spiercel).

---

## 2. Beeld en stem niet gelijk

### 2.1 MIDDEL — 7 seconden leeg beeld in s17
Still `s17_014.74`, L170. Van "Misschien" (13.0 s) tot "huidcel" (20.1 s) is het beeld helemaal leeg, terwijl de stem "alle genen zitten erin, dus het kan. In het lab kan het bijna." zegt.
**Fix (bovenaan in `fade(ctx, mis, …)` van L170):**
```js
fade(ctx, 1 - q.on('huidcel', 1), () => { stamcel(ctx, 700, 450, 70, 1, t); regel(ctx, 'bloedstamcel', 700, 590, 1, STAM, 30); chromRij(ctx, 700, 660, q.on('genen', 2));
  regel(ctx, 'alle genen zitten erin…', 1200, 430, q.on('genen', 2), C.text, 32); tag(ctx, 'in het lab: bijna', 1200, 540, C.goud, q.on('lab', 1)); });
```
(De cues `genen,2` = 14.4 s en `lab,1` = 17.0 s bestaan.)

### 2.2 MIDDEL — leeg begin van s12 en s13
- `s12_003.03`, L135: het beeld is 3.2 s leeg tijdens "Stamcellen zitten op meer plekken. Ook in je rode beenmerg…". **Fix:** `bot(ctx, 520, 430, 1.1, q.on('plekken', 1), …)` (1.4 s). `regel 'rood beenmerg'` blijft op `beenmerg`.
- `s13_001.57`, L144: het beeld is 2.7 s leeg tijdens "En embryonale stamcellen?". **Fix:** `blastocyst(ctx, …, q.on('embryonale', 1), icm, t)` (0.2 s). Laat het label op `embryo,2` staan.

### 2.3 MIDDEL — tags vallen bij het wisselen over elkaar (s01)
Stills `s01_006.16` ("schaafwond" en "huid hersteld" door elkaar) en `s01_014.37` ("hartinfarct" en "litteken: groeit niet terug"). L64 en L66 laten twee tags op dezelfde plek tegelijk in- en uitfaden, en de wissel duurt bij de knie ongeveer 2 s.
**Fix (L64, L66):** laat de tweede tag pas binnenkomen als de eerste weg is.
```js
const h1 = clamp(1 - heal * 2, 0, 1), h2 = clamp(heal * 2 - 1, 0, 1);
tag(ctx, 'schaafwond', 560, 760, C.koraal, q.on('schaaft', 1) * h1); tag(ctx, 'huid hersteld', 560, 760, C.groen, h2);
// L66
const lwUit = q.on('littekenweefsel', 1, 0.3), lwIn = ramp(t, q.at('littekenweefsel', 1) + 0.3, 0.4);
tag(ctx, 'hartinfarct', 1380, 760, C.koraal, hz * (1 - lwUit)); tag(ctx, 'litteken: groeit niet terug', 1380, 760, C.text2, lwIn);
```
Hetzelfde gebeurt korter (0.6 s) in s05 L85–86 (`s05_021.85`) en s18 L179–180. Gebruik daar hetzelfde patroon.

### 2.4 LAAG — vinkje voordat de stem het zegt (s12)
`s12_028.17`, L140: het vinkje staat er al zodra het paneel verschijnt (26.8 s), want het reageert op `'bloedcellen',1` (11.2 s). De stem zegt "maakt bloedcellen" pas op 27.9 s.
**Fix:** `vink(ctx, 1250, 340, 18, q.on('bloedcellen', 3));`

### 2.5 LAAG — kruis bij de hartspier te vroeg en zonder label (s17)
`s17_002.95`, L168: de spiercel met kruis verschijnt op "alleen" (2.7 s), vóór de bloedcellen (3.2 s), en hij heeft geen naam.
**Fix:** `kruis(ctx, 1170, 640, 20, q.on('geprobeerd', 1)); regel(ctx, 'hartspier', 1010, 710, q.on('alleen', 1), SPIER, 26);`

### 2.6 LAAG — overige
- `s04_022.43`, L76: de huidcel licht op bij "dezelfde", maar de stem noemt geen huidcel. **Fix:** in `types` het cue-woord van de huidcel `'dezelfde'` vervangen door `'lichaamscellen'` (25.5 s).
- `s08_026.53`, L98: de stem zegt "Een hartspiercel bijna niet", maar het beeld toont een heel hart. **Fix:** `regel(ctx, 'hartspier(cellen): bijna niet', …)` of teken een `spiercel` in plaats van het hart.

---

## 3. Opmaak: overlap, afsnijding, leegte, contrast
Niets valt onder y = 900. De laagste elementen zijn de voeten van de persoon in s14 (±860) en de tag in s13 (box tot 846).

### 3.1 MIDDEL — labels over elkaar (vwo s09)
Still `s09_013.50`, L106–107: "transcriptiefactoren" (onder de promotor) en "RNA-polymerase" (op de startplek van het enzym) overlappen ongeveer 40 px, tot het enzym begint te schuiven (14.8 s).
**Fix (L107):** `px = lerp(GX0 + 80, GX1 - 60, ramp(t, q.at('overschrijven', 1), 4))`.
**Ook in L103:** de hele bovenste rij springt bij "Daarnaast" in één frame van y 460 naar 320. **Fix:** `const y1 = lerp(460, 320, uit);`

### 3.2 MIDDEL — aanwijslijn door de tekst (vwo s20)
Still `s20_018.54`, L195: de lijn van het label "binnenste celmassa / embryonale stamcellen" loopt dwars door het woord "pluripotent" en door de balk.
**Fix:** vervang het label door tekst rechts in de pluripotent-balk:
```js
regel(ctx, 'binnenste celmassa · embryonale stamcellen', 1270, 391, q.on('celmassa', 1), STAM, 24, 'right', 600);
```

### 3.3 MIDDEL — spookbeeld en overlap bij "volwassen stamcel" (s12)
Still `s12_028.17`, L135 en L139: de achtergrond blijft op 30 % staan. De tag "volwassen stamcel: …" schuift dan over "darm: binnenste laag", en het paneel ligt over half zichtbare cellen. Het oogt druk.
**Fix:** `fade(ctx, 1 - vol * 0.9, …)` en in L138 `regel(ctx, 'darm: binnenste laag', 1400, 150, 1 - vol, C.text, 28)`.

### 3.4 MIDDEL — tag bedekt de darmstamcellen (s12)
Still `s12_021.20`, L138: "elke 3 tot 5 dagen nieuw" (box 772–826) ligt over de twee stamcellen onderaan de darmvlok (y 770).
**Fix:** `tag(ctx, 'elke 3 tot 5 dagen nieuw', 1400, 858, C.goud, q.on('drie', 1));` (box 820–874, blijft boven 900).

### 3.5 LAAG-MIDDEL — onderste rij huidcellen ligt over de stamcellen
Stills `s10_002.68`, `s10_013.38`, `s21_018.12`, L44–46 (`opperhuid`): de onderste rij gewone cellen ligt op de kiemlaag-stamcellen, waardoor de kiemlaag dubbel getekend lijkt.
**Fix (L44):** laat nieuwe cellen uit de kiemlaag opkomen.
```js
const pos = r + ph, u = pos / rows, yy = y + h - 115 - pos * rh; … let al = clamp(pos / 0.6, 0, 1);
```

### 3.6 LAAG — bevruchte eicel deelt in twee cellen die grotendeels overlappen
Still `s11_026.09`, L131: de twee dochtercellen liggen voor ongeveer 2/3 over elkaar en lijken eerder een Venn-diagram dan een deling.
**Fix:** `sp = ramp(t, q.at('deelt', 1), 1.2) * 120` en straal `170 - sp * 0.55`.

### 3.7 LAAG — eindkaart: regel 4 loopt bijna van rand tot rand
Still `s22_004.50`, S83 en segments.json s22. "Transplantatie: … · emergent: samen één ritme." heeft vrijwel geen marge aan de zijkanten.
**Fix:** splits de regel in twee:
- "Transplantatie: donor moet passen · iPS: eigen cellen, wel tumorrisico."
- "Emergent: cellen kloppen samen in één ritme."

### 3.8 LAAG — leeg of zwak beeld in s14 (laatste deel)
Still `s14_040.30`, L160: het "bloed" is een losse rode bal zonder pijl, en het label staat ver weg linksboven. **Fix:** teken 4–5 `rodeBC` in een bloedvat bij de arm, met een pijl naar het lichaam, en zet het label er direct boven. Ook in L153 (`s14_021.66`): de infuusslang eindigt in de lucht. Laat hem doorlopen naar de arm (`ctx.lineTo(760, 640)`).

### 3.9 LAAG — contrast
De kleine grijze teksten zijn lastig te lezen op telefoon:
- "kan bijna elke celsoort worden" (`s17_027.43`, L171, 24 px C.text2)
- "geïnduceerde pluripotente stamcel" (`s20_057.48`, L199)
- "lederhuid" (22 px op #5A3A3A, L42)

**Fix:** 26 px, en C.text in plaats van C.text2. Geef "lederhuid" kleur `C.text`.

### 3.10 LAAG — ondertitels tonen de fonetische spelling
De ondertitels laten "Antwoord bee.", "Antwoord aa.", "Antwoord cee." en "Het antwoord was dus aa." zien (`s08_002.85`, `s11_002.81`, `s17_002.95`). Dat komt uit `display` in segments.json s08, s11, s17 en s21.
**Fix:** zet in `display` "Antwoord b." en houd "bee" alleen in `voice`. De woordtijden in words/*.json (tekst "bee.") moeten dan mee. De cues gebruiken alleen "Antwoord", dus die breken niet. De tags in beeld ("antwoord b") kloppen al.

---

## 4. Vragen

| Vraag | Juist (film.py) | Stem | Klopt? | Afleiders |
|---|---|---|---|---|
| q02 | 0 = a | "Antwoord aa" (s11), recap "aa" | ja | **b** is een eerlijke misvatting en wordt in s11 weerlegd (eicel). **c** begint met iets wat deels klopt (de bovenste huidlagen krijgen wat zuurstof uit de lucht), maar de conclusie is fout. De film bespreekt c niet. Dat mag; eventueel één zin in s11 of de uitleg in film.py. |
| q07 | 1 = b | "Antwoord bee" (s08) | ja | **a** is een eerlijke misvatting en wordt weerlegd (zenuwgenen). **c** is strikt genomen waar, zie 1.3: herformuleren. |
| q16 | 2 = c | "Antwoord cee" (s17) | ja | **a** is eerlijk en wordt weerlegd ("alle genen, maar keuzes liggen vast"). **b** is eerlijk, maar de film bespreekt hem niet. Optioneel in film.py `explain`: "Ze delen zich snel genoeg; ze kunnen alleen geen hartspier maken." |

De opties zijn ongeveer even lang, er is geen lengtecue, en de juiste antwoorden staan op verschillende plekken (a, b, c). De letters in de tags ("antwoord a/b/c") komen overeen met de vraagkaarten.

Kleine nuance bij q02 a: "…in je hartspier niet" past goed bij "zulke stamcellen niet gevonden". Dat hartspiercellen zich met ±1 % per jaar vernieuwen, botst er niet mee, want het gaat over cellen die zich *blijven* delen. Laten staan.

---

## Prioriteiten voor v3
1. 1.1 rode bloedcel en 1.2 chromatiden: alleen code, raakt 6 scènes.
2. 1.3 q07 c en 2.1 lege s17. Daarna 2.2 (lege begins) en 2.3 (tags over elkaar).
3. 3.1–3.4 (overlap in s09, s20 en s12) en 1.4 (methylgroepen), 1.5 (label "grotendeels"), 1.6 (tumorlabel).
4. De rest (LAAG) als er tijd is.

Er hoeft niets opnieuw opgenomen te worden. Alleen de optionele zinnen in 1.4, 1.6 en 1.7 vragen een nieuwe opname; die kunnen op de wachtlijst.

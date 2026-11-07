# Eindreview — Zintuigen (z8)

Gecontroleerd: script_v2.md, scenes.js, film.py, sections.html, alle stills in qa/ en de contactsheets. `cuecheck.py` geeft 0 fouten; alle cues vallen op het juiste woord (één volgordeprobleem: zie punt 10). De antwoorden kloppen: q02 b, q06 a, q09 c, q16 b, zowel in film.py als in de gesproken tekst en de tags.

## A. Biologische fouten en tegenspraak met de tekst

**1. s08 — de bijziende ziet in het beeld toch scherp: de stralen komen samen op het netvlies** (`qa/s08_023.04.png`)
Bij "Waar valt bij hem het scherpe beeld …?" lopen de stralen in het lange oog naar één punt óp het netvlies (`xF = E.xr`). Dat beeld is fout voor iemand die bijziend is, en het verklapt bovendien een fout antwoord (b) vlak voor de vraag.
Fix r.188: laat de stralen bij de lens stoppen, zodat de vraag open blijft:
`stralen(ctx, 1150, E.lx, E.xr, E.xr, 640, [-20, 0, 20], LICHT, q.on('scherpe', 1) * 0.6, false, 640, 0.33);`
(u = 0,33 ≈ L1/(L1+L2): de stralen eindigen bij de lens. Met h = ±20 blijven ze ook binnen de pupil, zie punt 3.)

**2. s04 — alleen de lens breekt het licht, terwijl de tekst zegt dat het hoornvlies tweederde doet** (`qa/s04_036.28.png`)
De stralen gaan recht door het hoornvlies en knikken alleen bij de lens. Daarmee bevestigt het beeld juist misconceptie 1. Bij "tweederde" worden de stralen zelfs gedimd (×0,4) in plaats van dat het hoornvlies oplicht.
Fix: zet onder `stralen` (na r.48) een helper die ook bij het hoornvlies knikt:
```js
function stralenHorn(ctx, x0, xH, xL, xR, y, hs, col, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, x0 + (xR - x0) * u, H); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  for (const h of hs) { ctx.beginPath(); ctx.moveTo(x0, y + h); ctx.lineTo(xH, y + h); ctx.lineTo(xL, y + h * 0.7); ctx.lineTo(xR, y); ctx.stroke(); } ctx.restore(); }
```
Vervang de stralen-aanroep in r.149 door:
`stralenHorn(ctx, 360, E.horn[0], E.lx, E.xr, 500, [-56, -28, 0, 28, 56], LICHT, br, ramp(t, q.at('breken', 1), 2));`
Laat bij 'tweederde' het hoornvlies oplichten in plaats van de stralen te dimmen, bijvoorbeeld `ctx.save(); ctx.globalAlpha *= q.on('tweederde',1); ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(743, 500, 60, 155, 0, Math.PI/2, 1.5*Math.PI); ctx.stroke(); ctx.restore();` (743 = cx0, 155 = cry bij R = 300).

**3. s04, s07, s08, s10 — de lichtstralen gaan dwars door de iris** (`qa/s04_036.28.png`, `qa/s07_032.34.png`, `qa/s10_009.18.png`, `qa/s10_015.30.png`)
De buitenste stralen (h = ±110, ±70, ±90) kruisen de groene irisbalken. Die zijn ondoorzichtig: licht komt alleen door de pupil binnen. In s04 vallen de stralen op ±110 zelfs buiten de lens (lry = 96). De pupilhalfhoogte is `ph = R*(0.07+0.17*pupil)`, dus houd |h| onder ongeveer 0,85·ph:
- r.149 (s04, ph ≈ 52): `[-56, -28, 0, 28, 56]` met de knik uit punt 2 (bij de iris ≈ ±44)
- r.167 (s07, ph ≈ 54): beide `[-70, -35, 0, 35, 70]` → `[-45, -22, 0, 22, 45]`
- r.188 (s08, ph ≈ 26): `[-20, 0, 20]` (zie punt 1)
- r.194 en r.199 (s10, ph ≈ 43): `[-90, -45, 0, 45, 90]` → `[-30, -15, 0, 15, 30]`

**4. s10 — het brillenglas doet niets met het licht** (`qa/s10_015.30.png`)
De tekst zegt "Een holle lens … spreidt het licht een beetje". In beeld lopen de stralen evenwijdig en onveranderd door het holle glas. Alleen het brandpunt in het oog schuift, wat magisch oogt. Bij de bolle lens (verziend) gebeurt hetzelfde.
Fix: zet onder `brilglas` (na r.51) een helper:
```js
function stralenBril(ctx, x0, xB, xL, xF, xR, y, hs, k, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  for (const h of hs) { const hL = h * (1 + k), yR = y + hL * (1 - (xR - xL) / (xF - xL)); ctx.beginPath(); ctx.moveTo(x0, y + h); ctx.lineTo(xB, y + h); ctx.lineTo(xL, y + hL); ctx.lineTo(xR, yR); ctx.stroke(); } ctx.restore(); }
```
- r.194: `stralenBril(ctx, 300, 450, E.lx, lerp(xF, E.xr, hl), E.xr, 470, [-30, -15, 0, 15, 30], 0.3 * hl, LICHT, q.on('vóór', 1));` (k > 0: het holle glas spreidt)
- r.199: `stralenBril(ctx, 300, 450, E.lx, lerp(xF, E.xr, bl), E.xr, 470, [-30, -15, 0, 15, 30], -0.3 * bl, LICHT, 1);` (k < 0: het bolle glas laat samenkomen)
- r.200: houd de gestippelde verlengstukken op dezelfde h-waarden (`[-30, 30]`).

**5. sections.html r.26, checkvraag 4d — het antwoord over kegeltjes klopt biologisch niet**
"kegeltjes (die minder lichtgevoelige stof nodig hebben om te reageren)" is onjuist: kegeltjes maken hun pigment ook met retinal uit vitamine A. Het verschil zit in de lichthoeveelheid.
Fix: vervang het slot door "… overdag is er zoveel licht dat de kegeltjes, ook met minder pigment, nog genoeg licht opvangen om hun drempelwaarde te bereiken; in de schemering is het licht daarvoor te zwak (1)."

## B. Leesbaarheid en overlap

**6. s12 — tekst over rood licht valt over het label "20–30 min: het best"** (code r.224 en r.117; geen still na 27,9 s)
`regel('staafjes: haast blind voor rood', 1480, 280)` en het m30-label op (1583, 288) liggen over elkaar, en de rode/zwarte vakjes (1360–1600, y 160–230) staan vlak boven de top van de curve.
Fix r.224: verplaats het blok naar het lege deel linksboven in de grafiek: vakjes op `roundRect(ctx, 980, 340, 70, 70, 10)` en `roundRect(ctx, 1150, 340, 70, 70, 10)`, de pijl `arrow(ctx, 1060, 375, 1140, 375, …)` en de tekst `regel(ctx, 'staafjes: haast blind voor rood', 1100, 455, …)`.

**7. s12 — tag "donker → licht: binnen een minuut" ligt over de aslabel "minuten in het donker"** (`qa/s12_036.28.png`)
Fix r.225: zet beide tags ('adaptatie' en 'donker → licht…') op y = 860 in plaats van 820 (vak 820–876, nog boven 900).

**8. s12 — tag "fel licht: afgebroken / donker: weer aangemaakt" valt over de onderkant van de staafjes** (`qa/s12_036.28.png`)
De staafjes lopen tot y ≈ 728; het tagvak loopt van 720 tot 776.
Fix r.222: zet beide tags op y = 800.

**9. s07 — tag "camera: lens schuift · oog: lens verandert van vorm" ligt over de bovenrand van het oog** (`qa/s07_032.34.png`)
Fix r.174: `tag(ctx, 'camera: lens schuift · oog: lens verandert van vorm', 60, 200, C.goud, q.on('camera', 1), 'left');` (spant dan x 60–990; de oogrand ligt op die hoogte bij x ≈ 1070).

**10. s20 — het donkere vak achter de recap-tags snijdt een boom en de lichtmasten doormidden; "impuls" verschijnt vóór "receptor"** (`qa/s20_012.38.png`)
- Fix r.314–315: `ctx.fillRect(40, 110, 780, 420)` en alle vijf tags met `x = 60`, `align 'left'` (bijvoorbeeld `tag(ctx, 'fel licht: vooral kegeltjes', 60, 170, KEG[0], q.on('felle', 1), 'left')`). De eerste boomkruin begint bij x = 820.
- r.317: in de keten komt 'impuls' (cue 'Pas', 36,1 s) eerder dan 'receptor' (cue 'staafjes',3, 37,2 s). Vervang `q.on('Pas', 1)` door `q.on('impuls', 2)` (39,9 s: "… er een impuls van").

**11. s10 — de leesbril zit op de wangen en is er al vóór het woord "leesbril"** (`qa/s10_028.47.png`)
Fix r.204: zet de brilcirkels op y = 432 met r = 14, en teken ze ná `ctx.globalAlpha *= q.on('leesbril', 1);`, zodat ze pas met "leesbril" verschijnen.

## C. Kleinigheden

**12. s01 — het sportveld blijft fel groen terwijl "alles lijkt grijs" klinkt** (`qa/s01_015.04.png`)
Het veld is fel verlicht, dus kleur zien kan daar wel, maar het beeld werkt de zin "alles lijkt grijs" tegen.
Fix r.131: `veld: loop > 0.5 ? 0.45 : 1` (of desatureer het veldgroen met `mixHex('#3A4048', '#2F7A3A', kleur)` in r.97).

**13. s04 — tag "lens: fijn bijstellen" staat ver van de lens, en de verbindingslijn van "glasachtig lichaam" loopt er dwars doorheen** (code r.151, r.147)
Fix r.151: `tag(ctx, 'lens: fijn bijstellen', 1000, 820, C.groen, q.on('fijn', 1), 'left')` naast de hoornvlies-tag, en/of het label 'glasachtig lichaam' in r.147 naar (1450, 700).

**14. Kleine tekstverschillen tussen film, begrippenlijst en checkvragen**
- film.py r.21, hoornvlies: "breekt ongeveer tweederde van het licht" suggereert dat tweederde van het lícht gebroken wordt. Beter: "zorgt voor ongeveer tweederde van de lichtbreking".
- sections.html r.13, antwoord 2d: "laat hooguit een paar keer zoveel licht door" botst met "± 16×" in de film (s12-tag) en in het docentdeel. Maak er "hooguit ± 16 keer zoveel" van.
- scenes.js r.246: 'kegeltjes in de gele vlek: elk een eigen zenuwcel', terwijl er "bijna elk" klinkt. Maak er 'bijna elk een eigen zenuwcel' van.

**15. Overige kleinigheden**
- s11 r.214: `scaleBar(ctx)` tekent "schematisch · niet op schaal" op y = 1058, in de ondertitelzone (`qa/s11_031.74.png`). Dat botst niet met de ondertitel, maar wel met de regel "niets onder 900". Haal de aanroep weg of zet de tekst met `metaText(ctx, 'schematisch · niet op schaal', W - 40, 880, C.text2, 'right', 24)` in beeld.
- s18 r.294–299: er klinkt "twee evenwichtsblaasjes", maar er staat er één. Zet het kopje (r.299) op 'evenwichtsblaasje (er zijn er twee)' of teken een tweede, kleiner blaasje.
- s15 r.263: bij "Achter je trommelvlies zit lucht" (0–2 s) gebeurt er niets in beeld. Laat de middenoorholte oplichten: `roundRect(ctx, 800, 340, 210, 270, 30); shape(ctx, rgba(C.teal, 0.25 * q.on('lucht', 1) * (1 - q.on('vliegtuig', 1))), null);`.
- s14 r.257: de tag "groot → klein: druk ± 20× groter" ligt over de (vage) halfcirkelvormige kanalen (`qa/s14_027.75.png`) en wijst niet naar wat groot en wat klein is. Overweeg korte labels 'groot' bij het trommelvlies (780, 400) en 'klein' bij het ovale venster (1010, 430).

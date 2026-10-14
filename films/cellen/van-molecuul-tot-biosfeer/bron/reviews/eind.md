# Eindreview — Van molecuul tot biosfeer

Gecontroleerd: script_v2.md, scenes.js, film.py, sections.html, alle stills in qa/ (sheets + losse frames), cue-tijden (`cuewhere.py`). De antwoorden kloppen: q02 a (correct 0), q10 b (correct 1). De gesproken tekst ("Antwoord aa", "Antwoord bee") en de tags in s11/s15/s16 komen hiermee overeen. Er wordt niets onder y=900 getekend; de laagste tag is s14 (y 840–896).

Op ernst geordend:

1. **Virus groter getekend dan de bacterie, terwijl de stem "tien keer kleiner" zegt** (s14_021.27, s14_012.76). Het griepvirus heeft r=120 (met spikes ±317 px) en de bacterie is 306 px breed. Het label "± 10× groter" staat dus bij het kleinere plaatje, en dat is een biologische misconceptie in beeld.
   Fix scenes.js r.157–158: laat het virus bij 'tien' krimpen en naar de bacterie schuiven, en vervaag de labels:
   ```js
   const kt = q.on('tien', 1);
   griepvirus(ctx, lerp(900, 1290, kt), 430, lerp(120, 11, kt), t, q.on('virus', 2));
   label(ctx, 'erfelijk materiaal (RNA)', null, 900, 430, 760, 220, q.on('erfelijk', 1) * (1 - kt)); /* idem eiwitmantel, vetlaagje */
   regel(ctx, 'griepvirus (op schaal)', 1290, 500, kt, VIR, 22, 'center', 700);
   ```

2. **Labels eiwitmantel/vetlaagje wijzen naar de verkeerde laag** (s14_021.27). Het anker van 'eiwitmantel' (1000,360) ligt op de buitenste gele ring (r≈1.02r), en dat is de vetlaag (VET). Het anker van 'vetlaagje' (1010,520) ligt op 1.18r, tussen de spikes, buiten het virus. De eiwitmantel is de binnenste oranje ring (0.84r).
   Fix r.157: `label(ctx,'eiwitmantel',null,983,373,1180,220,…)` (0.84r, hoek −0.6) en `label(ctx,'vetlaagje',null,992,507,1180,680,…)` (1.0r, hoek 0.7).

3. **Vinkje "bestaat uit cellen" komt 16 s te vroeg** (s04_021.11: vinkje zonder koolmees en zonder kolomkop). `ck('Neem')` matcht als substring eerst 'neemt' (13.7 s, "het neemt stoffen op") in plaats van 'Neem' (28.9 s).
   Fix r.75: `ck('Neem')` → `ck('koolmees')` (29.3 s), of `{ ok: true, a: q.on('Neem', 2) }`.

4. **Kruis bij 'voortplanting' zonder dat het gezegd wordt, en het botst met H3-uitleg** (s14_039.55). De stem zegt alleen cellen/stofwisseling/groeien/prikkels "nee". Bij "dringt een cel binnen" verschijnt ook een kruis bij voortplanting, terwijl s15 juist uitlegt dat er wél meer virussen komen (grensgeval). 'Homeostase' blijft leeg.
   Fix r.161: zet v[3] op een vraagteken of een notitie in plaats van `{ ok:false, a:q.on('dringt',1) }`, bijvoorbeeld na `bord(...)`: `regel(ctx,'alleen in een cel',800,420,q.on('nieuwe',1),C.goud,22,'right',700);`. Geef v[5] een kruis: `{ ok:false, a:q.on('Reageren',1) }`.

5. **Gesproken niveaus lijken uitgeschakeld** (s11_025.85: 'levensgemeenschap' grijs, terwijl dat net genoemd wordt; s16_039.63: levensgemeenschap/orgaanstelsel/weefsel/organel grijs in de recap). De EXAMEN-opmaak (500 + C.text2) wordt nergens uitgelegd en leest als "niet aan".
   Fix r.52: gebruik voor elk opgelicht label `C.text` en houd alleen het gewichtsverschil: `text(ctx, n, x+72, y+2, fTekst(30, EXAMEN[i]?700:500), C.text, 'left')`.

6. **Tags overlappen boom en rups** (s11_025.85). De tag 'levensgemeenschap = alleen het levende' (1290,560) valt over de eikenkroon (rechterrand ≈1026). '+ temperatuur en bodem = ecosysteem' (1290,640) loopt over de rups (y 630–650).
   Fix r.139: x 1290 → 1440 voor beide tags.

7. **Tag 'telt rupsen en eiken' raakt het label 'temperatuur'** (s09_031.44: rechterrand tag ≈1666, tekst begint ≈1638, op dezelfde hoogte).
   Fix r.124: `tag(ctx,'telt rupsen en eiken',1330,650,C.groen,q.on('telt',1))`.

8. **'bevruchte eicel' blijft boven het 8-cellig embryo staan, en de eerste 4,8 s zijn leeg** (s07_012.27; s07_002.45 toont een leeg beeld bij "Maar hoe wordt een cel een spiercel?").
   Fix r.98: laat het label vervagen met `q.on('bevruchte',1)*(1-dl)` en zet er een tweede label onder: `regel(ctx,'embryo: steeds meer cellen',960,200,dl,C.text,32,'center',700)`. Begin r.98 met `spiercel(ctx,960,480,600,110,1-q.on('bevruchte',1)); vraagteken(ctx,960,250,1-q.on('bevruchte',1),100);`.

9. **Recap: bij "de cel is het kleinste niveau dat leeft" lichten ook molecuul en organel op** (s16_012.78). Dat suggereert dat die ook leven.
   Fix r.175: `i <= 2 ? Math.max(0.5, q.on('kleinste',1))` → `i === 2 ? Math.max(0.5, q.on('kleinste',1)) : i < 2 ? 0.5`, en zet de markering: `cur: q.on('kleinste',1)>0.5 && q.on('differentiatie',1)<0.5 ? 2 : -1`.

10. **Bij "één cel meteen het hele organisme" wordt alleen 'cel' gemarkeerd** (s08_023.48). Het punt is juist dat cel en organisme samenvallen.
    Fix r.110: na `ladder(...)` een tweede markering toevoegen: `if (bac > 0.01) { ctx.save(); ctx.globalAlpha *= bac; roundRect(ctx,166,840-6*66-30,330,46,23); shape(ctx,rgba(C.goud,0.18),C.goud,1.5); ctx.restore(); }`. Of breid `ladder()` uit met `cur` als array.

11. **"De koolmees staat op de ladder, net als Noor": er is geen verband met de ladder** (s16_039.63). De koolmees en Noor staan los rechts.
    Fix r.177: trek een stippellijn naar de rij 'organisme' (y = 840−6·66 = 444): `ctx.save(); ctx.globalAlpha*=q.on('ladder',1); ctx.setLineDash([6,6]); ctx.strokeStyle=C.goud; ctx.beginPath(); ctx.moveTo(1030,500); ctx.lineTo(420,444); ctx.moveTo(1480,560); ctx.lineTo(420,444); ctx.stroke(); ctx.restore();`. Zet het label 'organisme' ook als `cur`.

12. **Het vraagteken valt over de bovenrand van de deur** (s01_017.23). De deur loopt van y=120 tot 840 en het '?' staat op (760,140).
    Fix r.70: `vraagteken(ctx, 1400, 120, q.on('Leeft',1), 110)` (boven de zoomcirkel, rand 200) of `(480, 300)`.

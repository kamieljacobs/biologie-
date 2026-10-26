// Wat word jij? · Voeding en diëtetiek 2 · Waarom afvallen zo moeilijk is — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Diëtist Hanneke, Joost (outfit 'spreekuur'; na het afvallen 'gewoon'), Noor loopt mee, Dennis (sport) en Erik (buurman));
// Micro alleen in de zoomcirkels (maag met ghreline, vetcel met leptine, hersenen met hypothalamus en hersenstam, náást het lichaam).
// Decor praktijk volgt later (praktijkDecor tekent nu alleen navy): cold open, meetlint (H2), recap. Rode draad: de riem en de gewichtscurve (MODEL).
// Toon: geen getal bij Joosts gewicht, geen weegschaal, geen etende close-ups, telpoppetjes alleen in tellingen.

// Joost/Erik/Dennis even lang tekenen (castboek-lengte wegdelen)
function mens(ctx, id, x, h, o = {}) { const P = CAST[id] || {}; return persoon(ctx, id, x, o.voet || GROND, h / (o.echt ? 1 : (P.lengte || 1)), Object.assign({ kijk: 1, uit: 'neutraal' }, o)); }
// buikpunt van een staand personage (vooraanzicht), voor zoomcirkels
function buikPunt(x, h, dx = 0, f = 2.75) { const hh = h / 6.1; return [x + dx, GROND - h + hh * f]; }
// meetlint rond het middel (voorste helft van de ellips), u = hoe ver om
function lintOmMiddel(ctx, cx, y, rx, u = 1, a = 1) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  ctx.strokeStyle = '#E0C860'; ctx.lineWidth = 22; ctx.beginPath(); ctx.ellipse(cx, y, rx, 26, 0, Math.PI - Math.PI * u, Math.PI, true); ctx.stroke();
  ctx.strokeStyle = '#4A4E5E'; ctx.lineWidth = 2; for (let k = 1; k < 24 * u; k++) { const an = Math.PI - k / 24 * Math.PI; const px = cx + Math.cos(an) * rx, py = y + Math.sin(an) * 26; ctx.beginPath(); ctx.moveTo(px, py - 10); ctx.lineTo(px, py - (k % 4 ? 2 : -4)); ctx.stroke(); } ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { riem(ctx, 1100, 490, 560, { gat: 2 }); hand(ctx, 1680, 490, 0.9); gewichtCurve2(ctx, 1180, 620, 560, 220, { u: 0.74 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { praktijkDecor(ctx); const h = 560, jx = 330, B = buikPunt(jx, h, 0, 3.05);
    const M = q.on('Maanden', 1, 1.2), gat = lerp(1, 2, q.on('strakker', 1, 0.8)) - 0.65 * M;
    mens(ctx, 'joost', jx, h, { t, outfit: 'spreekuur', uit: M > 0.5 ? 'ernstig' : (q.on('best', 1) > 0.5 ? 'blij' : 'neutraal') });
    naamBij(ctx, 'Joost', 'cliënt', jx + 120, 330, 1, 'left');
    riemZoom(ctx, 900, 400, 240, B[0], B[1], gat, M > 0.5 ? 'WEER BIJNA HET OUDE GAATJE' : 'EEN GAATJE STRAKKER', 1, { oud: q.on('strakker', 1) * (1 - M), oudGat: 1, trek: q.on('strakker', 1) * (1 - q.on('eraf', 1)) });
    // gewichtscurve: omlaag tot 'eraf', vlak tot 'groter', omhoog tot het oude gaatje; stopt daar
    const u = t < q.at('eraf', 1) ? lerp(0.02, 0.3, t / q.at('eraf', 1)) : t < q.at('groter', 1) ? lerp(0.3, 0.5, (t - q.at('eraf', 1)) / (q.at('groter', 1) - q.at('eraf', 1))) : lerp(0.5, 0.74, (t - q.at('groter', 1)) / Math.max(0.5, q.at('gaatje', 2) - q.at('groter', 1)));
    gewichtCurve2(ctx, 1210, 300, 440, 240, { u, rise: M });
    tag(ctx, 'een paar kilo eraf', 1430, 660, C.groen, fase(t, q.at('eraf', 1), q.at('trek', 1)), 'center', 32);
    tag(ctx, 'trek wordt groter', 1430, 660, C.goud, fase(t, q.at('trek', 1) + 0.3, q.at('Diëtist', 1)), 'center', 32);
    laag(ctx, q.on('Diëtist', 1, 0.4), () => { mens(ctx, 'hanneke', 1760, 470, { t, kijk: -1, uit: 'blij', voet: GROND }); naamBij(ctx, 'Diëtist Hanneke', 'diëtist', 1740, 360, 1, 'center'); });
    vraagteken(ctx, 1430, 780, q.on('kan', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer trek en wat minder verbruik', 1 - q.on('Eerst', 1));
    const E = q.on('Eerst', 1, 1.0), cx = lerp(820, 1560, E), cy = lerp(300, 140, E), cw = lerp(860, 260, E), ch = lerp(400, 110, E);
    mens(ctx, 'joost', 330, 560, { t, outfit: 'spreekuur', uit: q.on('biologie', 1) > 0.5 ? 'neutraal' : 'ernstig', a: 1 - E });
    gewichtCurve2(ctx, cx, cy, cw, ch, { u: 1, rise: 1 - E, label: E > 0.5 ? 'MODEL' : 'VOORBEELD · MODEL', pijlen: [0, 0, q.on('trek', 1) * (1 - E), q.on('verbruik', 1) * (1 - E)], pijlX: 1180, pijlY: 790, pijlDx: 260 });
    tag(ctx, 'niet alleen doorzetten', 960, 860, C.text2, fase(t, q.at('doorzetten', 1), q.at('biologie', 1)), 'center', 32);
    tag(ctx, 'er zit biologie achter', 960, 860, C.groen, fase(t, q.at('biologie', 1), q.at('Eerst', 1) + 0.2), 'center', 32);
    laag(ctx, ramp(t, q.at('Eerst', 1) + 1.0, 0.5), () => { regel(ctx, 'Eerst de basis: energie in en uit', 960, 560, 1, C.text, 56, 'center', 700); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    const H = q.on('Hanneke', 1), cx = 860;
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij', pose: H > 0.5 && t < q.at('Dat', 1) ? 'wijs' : 'staan' });
    const L = 70, lagen = [[L * q.on('ruststofwisseling', 1), C.koraal], [L * q.on('verteren', 1), C.koraal], [L * q.on('bewegen', 1), C.koraal]];
    const R = balans2(ctx, 860, 300, { eten: 4 * q.on('eten', 1, 1.5), lagen, hlL: fase(t, q.at('Links', 1), q.at('rechts', 1) + 0.2), hlR: fase(t, q.at('rechts', 1), q.at('Dat', 1) + 0.3), labels: q.on('eten', 1) });
    laagNamen(ctx, R, [['ruststofwisseling', '', q.on('ruststofwisseling', 1)], ['verteren', '', q.on('verteren', 1)], ['bewegen', '', q.on('bewegen', 1)]]);
    metaA(ctx, 'DRIE MANIEREN', R.R.x, 180, fase(t, q.at('drie', 1), q.at('Hanneke', 1)), C.koraal, 'center', 28);
    tag(ctx, 'energiebalans', cx, 820, C.goud, q.on('energiebalans', 1), 'center', 40); },

  s06(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij' });
    const R = balans2(ctx, 860, 300, { eten: 4, lagen: [[70, C.koraal], [70, C.koraal], [70, C.koraal]] });
    laagNamen(ctx, R, [['ruststofwisseling', '', 1], ['verteren', '', 1], ['bewegen', '', 1]]);
    const N = q.on('Noor', 1, 0.3); persoon(ctx, 'noor', 1720, GROND, 450, { t, kijk: -1, a: N, uit: 'neutraal', pose: q.on('vraagt', 1) > 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Noor', 'loopt een dag mee', 1700, 380, N * (1 - q.on('Welk', 1)), 'center');
    vraagteken(ctx, 1640, 330, q.on('grootst', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de ruststofwisseling', 1 - q.on('Verteren', 1)); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'noor', 1720, GROND, 450, { t, kijk: -1, uit: q.on('twee', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    const g1 = q.on('twee', 1, 1.2), g2 = q.on('tiende', 1, 1), g3 = q.on('Bewegen', 1, 1);
    const R = balans2(ctx, 860, 300, { eten: 4, lagen: [[lerp(70, 160, g1), C.koraal], [lerp(70, 24, g2), C.koraal], [lerp(70, 56, g3), C.koraal]] });
    laagNamen(ctx, R, [['ruststofwisseling', g1 > 0.5 ? '± twee derde' : '', 1, g1 > 0.5 ? C.goud : C.text], ['verteren', g2 > 0.5 ? '± een tiende' : '', 1], ['bewegen', g3 > 0.5 ? 'de rest' : '', 1]]);
    tag(ctx, 'ook als je stilzit', 860, 840, C.koraal, fase(t, q.at('stilzit', 1), q.at('Bewegen', 1) + 0.4), 'center', 32); },

  s09(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    const M = q.on('Minder', 1, 1), tilt = lerp(-0.13, 0.13, M) * q.on('Meer', 1, 1);
    const R = balans2(ctx, 860, 330, { eten: lerp(6, 2, M), lagen: [[160, C.koraal], [24, C.koraal], [56, C.koraal]], tilt });
    tag(ctx, 'aankomen', R.L.x, 300, C.oker, fase(t, q.at('aan', 1), q.at('Minder', 1) + 0.3), 'center', 36);
    laag(ctx, q.on('vet', 1) * (1 - M), () => { vetcel(ctx, 330, 560, lerp(40, 80, q.on('vet', 1, 1.5)), {}); naamBij(ctx, 'vetcel', 'overschot opgeslagen', 330, 690, 1, 'center'); });
    tag(ctx, 'afvallen', R.R.x, 240, C.groen, q.on('val', 1), 'center', 36);
    filmKaartje(ctx, 120, 760, 'Alles op adem', q.on('af', 1, 0.8)); filmKaartje(ctx, 1430, 760, 'Waar blijft je vet?', q.on('af', 1, 0.8)); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const fy = 330, fx = 520;
    metaA(ctx, 'BMI · BODY MASS INDEX', 140, 200, 1, C.goud, 'left', 32);
    schrijf(ctx, 'gewicht (kg)', fx, fy, q.on('gewicht', 1, 0.8), fTekst(52, 700), C.text, 'center');
    laag(ctx, q.on('gedeeld', 1), () => { ctx.fillStyle = C.text; ctx.fillRect(fx - 250, fy + 30, 500, 4); });
    schrijf(ctx, 'lengte (m) × lengte (m)', fx, fy + 100, q.on('lengte', 1, 0.8) * (q.on('kwadraat', 1) > 0.5 ? 1 : 0.999), fTekst(52, 700), C.text, 'center');
    tag(ctx, 'in het kwadraat', fx, fy + 190, C.text2, q.on('kwadraat', 1) * (1 - q.on('voorbeeld', 1)), 'center', 32);
    metaA(ctx, 'VOORBEELD · 90 KG · 1,80 M', 140, 600, q.on('voorbeeld', 1), C.grain, 'left', 30);
    schrijf(ctx, '90 ÷ (1,80 × 1,80)', 140, 680, q.on('negentig', 1, 1.2), fTekst(52, 700), C.text);
    schrijf(ctx, '= 90 ÷ 3,24', 140, 760, q.on('geeft', 1, 0.8), fTekst(52, 700), C.text);
    schrijf(ctx, '≈ 27,8', 520, 760, q.on('zevenentwintig', 1, 0.8), fTekst(64, 800), C.goud);
    persoon(ctx, 'hanneke', 1500, GROND, 480, { t, kijk: -1, uit: 'blij', pose: t > q.at('gewicht', 1) && t < q.at('voorbeeld', 1) ? 'wijs' : 'staan' });
    naamBij(ctx, 'Diëtist Hanneke', 'rekent', 1500, 330, fase(t, q.at('Hanneke', 1), q.at('voorbeeld', 1)), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const hl = [q.on('ondergewicht', 1), q.on('gezond', 1), q.on('overgewicht', 1), q.on('obesitas', 1)].map(v => 0.15 + 0.85 * v);
    regel(ctx, '90 ÷ 3,24 ≈ 27,8', 140, 200, 1, C.text2, 40, 'left', 700); metaA(ctx, 'VOORBEELD', 140, 240, 1, C.grain, 'left', 28);
    bmiBalk2(ctx, 160, 420, 1600, { waarde: 27.8, mark: 1, markLabel: '27,8', hl });
    tag(ctx, 'ook een risico', 330, 660, C.teal, fase(t, q.at('risico', 1), q.at('Vanaf', 1)), 'center', 32);
    metaA(ctx, 'VOLWASSENEN · ONDER 18: ANDERE GRENZEN', 960, 760, q.on('jongeren', 1), C.grain, 'center', 30); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const h = 560;
    mens(ctx, 'dennis', 560, h, { t, outfit: 'sport', uit: 'blij', pose: q.on('traint', 1) > 0.5 ? 'handenHeup' : 'staan' });
    mens(ctx, 'erik', 1360, h, { t, uit: 'neutraal', kijk: -1 });
    chip(ctx, '26', 560, 250, C.goud, q.on('zesentwintig', 1), 44); chip(ctx, '26', 1360, 250, C.goud, q.on('zesentwintig', 1), 44);
    metaA(ctx, 'BMI', 960, 240, q.on('index', 1), C.text2, 'center', 28);
    tag(ctx, 'traint veel', 720, 420, C.text2, q.on('traint', 1), 'left', 30); tag(ctx, 'traint niet', 1200, 420, C.text2, q.on('niet', 1), 'right', 30);
    vraagteken(ctx, 960, 660, q.on('zeker', 1), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Daarom', 1, 0.4), D2 = ramp(t, q.at('Daarom', 1) + 0.4, 0.4);
    laag(ctx, 1 - D, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: hun gewicht en lengte gaan gelijk op', 1 - q.on('Spieren', 1)); const h = 560, B1 = buikPunt(360, h, 20, 2.3), B2 = buikPunt(1180, h, 0, 3.0);
      mens(ctx, 'dennis', 360, h, { t, outfit: 'sport', uit: 'blij' }); mens(ctx, 'erik', 1180, h, { t, uit: 'neutraal' });
      chip(ctx, '26', 360, 250, C.goud, 1, 44); chip(ctx, '26', 1180, 250, C.goud, 1, 44);
      tag(ctx, 'zelfde verhouding gewicht : lengte', 770, 420, C.goud, fase(t, q.at('verhouding', 1), q.at('Spieren', 1) + 0.3), 'center', 32);
      zoomCircle(ctx, 740, 450, 160, B1[0], B1[1], 'SPIEREN WEGEN MEE', q.on('Spieren', 1), () => spierBeeld(ctx, 740, 450, 160));
      tag(ctx, 'scoort overgewicht', 740, 720, C.oker, q.on('scoren', 1), 'center', 30);
      zoomCircle(ctx, 1560, 450, 160, B2[0], B2[1], 'VET ROND DE ORGANEN', q.on('vet', 1), () => buikVet(ctx, 1560, 450, 160, t));
      tag(ctx, 'grotere kans op ziekten', 1560, 720, C.koraal, q.on('grotere', 1), 'center', 30);
      metaA(ctx, 'ZELFDE INDEX · ANDER LICHAAM', 960, 160, q.on('Dezelfde', 1), C.goud, 'center', 30); });
    if (D >= 0.99) praktijkDecor(ctx); laag(ctx, D2, () => { const h = 600, jx = 900, hh = h / 6.1, my = GROND - h + hh * 3.05;
      persoon(ctx, 'hanneke', 560, GROND, 480, { t, kijk: 1, uit: 'blij', pose: 'vasthouden' });
      persoon(ctx, 'joost', jx, GROND, h, { t, kijk: -1, outfit: 'spreekuur', uit: 'neutraal' });
      lintOmMiddel(ctx, jx, my, hh * 1.12, q.on('meetlint', 1, 1.2));
      naamBij(ctx, 'middelomtrek', 'meetlint', jx + hh * 1.25, my - 40, q.on('middel', 1), 'left');
      const M = q.on('Voor', 1); laag(ctx, M, () => { roundRect(ctx, 1260, 280, 560, 360, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 1.5); metaText(ctx, 'RISICO GROTER VANAF', 1540, 340, C.text2, 'center', 28);
        text(ctx, 'man: 94 cm', 1540, 420, fTekst(48, 700), C.text, 'center'); laag(ctx, q.on('vrouw', 1), () => text(ctx, 'vrouw: 80 cm', 1540, 495, fTekst(48, 700), C.text, 'center'));
        metaText(ctx, 'VOLWASSENEN TOT 70', 1540, 565, C.grain, 'center', 28); metaText(ctx, 'EUROPESE AFKOMST', 1540, 605, C.grain, 'center', 28); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Nederland', 1, 0.4), N2 = ramp(t, q.at('Nederland', 1) + 0.4, 0.4);
    laag(ctx, 1 - N, () => { blokje(ctx, 'overgewicht', 420, 410, 420, C.oker); tag(ctx, 'vooral vet in de buik', 420, 530, C.oker, 1, 'center', 30);
      const d = q.on('diabetes', 1), hv = q.on('hart', 1);
      laag(ctx, d, () => { pijl(ctx, 640, 390, 1090, 300, C.koraal, 1, 7, 24); blokje(ctx, 'diabetes type 2', 1340, 300, 460, C.koraal); });
      laag(ctx, hv, () => { pijl(ctx, 640, 430, 1090, 520, C.koraal, 1, 7, 24); blokje(ctx, 'hart- en vaatziekten', 1340, 520, 460, C.koraal); });
      metaA(ctx, 'GROTERE KANS · GEEN ZEKERHEID', 960, 680, q.on('kans', 2), C.goud, 'center', 32);
      filmKaartje(ctx, 1460, 760, 'Suiker in balans', d); });
    laag(ctx, N2, () => { const helft = q.on('helft', 1), zes = q.on('zes', 1);
      telpoppetjes(ctx, 480, 260, 100, 20, 48, i => (i < 16 && zes > 0.5) ? C.koraal : (i < 51 && helft > 0.5 ? C.oker : '#5A6478'), 1);
      tag(ctx, 'overgewicht · ± de helft', 700, 740, C.oker, helft, 'center', 32); tag(ctx, 'waarvan obesitas · ± 1 op de 6', 1260, 740, C.koraal, zes, 'center', 32);
      metaA(ctx, 'VOLWASSENEN NL · 2025 · CBS', 960, 200, 1, C.grain, 'center', 28); }); },

  // ---------- H3 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const h = 600, jx = 760, B = buikPunt(jx, h, 30, 2.7), T = q.on('trek', 1, 0.5);
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: 'ernstig', pose: T > 0.5 ? 'handdruk' : 'staan', hand: { x: B[0] + 10, y: B[1] + 6 } });
    naamBij(ctx, 'Joost', '', jx, 230, 1, 'center');
    tag(ctx, 'steeds meer trek', 1240, 420, C.goud, T, 'left', 36);
    tag(ctx, 'tegen zijn eigen lijf?', 1240, 520, C.text2, q.on('vecht', 1), 'left', 32);
    vraagteken(ctx, 1400, 700, q.on('honger', 1), 130); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: signalen uit maag, darm en vet', 1 - q.on('Ghreline', 1));
    const h = 560, jx = 260, BM = buikPunt(jx, h, 22, 2.55), HD = [jx, GROND - h + h / 6.1 * 0.55];
    const vol = q.on('volle', 1, 1.2), G = q.on('Ghreline', 1);
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: vol > 0.5 ? 'blij' : 'neutraal' });
    let MP = null; zoomCircle(ctx, 720, 380, 180, BM[0], BM[1], 'MAAG EN DARM', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(540, 200, 360, 360); MP = maagDarm(ctx, 700, 360, 0.72, { vol });
      hormoonPuntjes(ctx, 680, 420, Math.round(4 + 10 * (1 - vol)), 8, t, G * (1 - 0.8 * vol), C.paars, 110); });
    naamBij(ctx, 'ghreline', 'hormoon uit de maag', 720, 700, G * (1 - q.on('Ghreline', 2, 0.3)), 'center', C.paars);
    tag(ctx, 'ghreline geeft trek', 720, 700, C.paars, fase(t, q.at('Ghreline', 2) + 0.3, q.at('volle', 1)), 'center', 32);
    laag(ctx, fase(t, q.at('stijgt', 1), q.at('volle', 1)), () => ghrelineDag(ctx, 1100, 240, 680, 300, clamp((t - q.at('stijgt', 1)) / 2.5, 0, 1)));
    metaA(ctx, 'VÓÓR HET ETEN: GHRELINE ↑', 1440, 680, fase(t, q.at('vlak', 1), q.at('volle', 1)), C.paars, 'center', 28);
    const Z = q.on('zenuwen', 1); const HP = hersenZoom(ctx, 1460, 400, 250, HD[0] + 40, HD[1], { a: Z, hth: q.on('hersenen', 1) * 0.6, stam: q.on('hersenen', 1), t, stamNaam: q.on('hersenen', 1) });
    if (HP) zenuwSignaal(ctx, [880, 330], [HP.stam[0] - 30, HP.stam[1] + 20], t, Z, clamp((t - q.at('zenuwen', 1)) / 1.2, 0, 1));
    if (HP) hormoonStroom(ctx, [860, 470], [HP.stam[0] - 20, HP.stam[1] + 40], t, q.on('darm', 1), 6);
    metaA(ctx, 'VOLLE MAAG REKT UIT', 720, 650, fase(t, q.at('rekt', 1), q.at('darm', 1)), C.teal, 'center', 28);
    metaA(ctx, 'DARMHORMONEN', 720, 650, fase(t, q.at('darm', 1), q.at('genoeg', 1)), C.paars, 'center', 28);
    tag(ctx, 'genoeg', 1460, 760, C.groen, q.on('genoeg', 1), 'center', 40);
    metaA(ctx, 'VOL → GENOEG · VERZADIGING', 720, 800, q.on('verzadiging', 1), C.goud, 'center', 30); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const h = 560, jx = 260, BM = buikPunt(jx, h, 22, 2.55), BV = buikPunt(jx, h, -50, 3.2), HD = [jx, GROND - h + h / 6.1 * 0.55];
    const M = q.on('Minder', 1, 1), groei = q.on('meer', 1, 1.6), r = lerp(lerp(55, 85, groei), 52, M), n = Math.round(lerp(lerp(5, 14, groei), 4, M));
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: 'neutraal' });
    zoomCircle(ctx, 720, 300, 140, BM[0], BM[1], 'MAAG EN DARM', 0.45, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(580, 160, 280, 280); maagDarm(ctx, 705, 285, 0.55, {}); });
    zoomCircle(ctx, 720, 640, 150, BV[0], BV[1], 'VETCEL · LEPTINE', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(570, 490, 300, 300); vetcelLeptine(ctx, 720, 640, r, { leptine: q.on('leptine', 1), t, n }); });
    naamBij(ctx, 'leptine', '', 880, 560, q.on('leptine', 1) * (1 - q.on('hypothalamus', 1)), 'left', C.paars);
    tag(ctx, 'meer vet → meer leptine', 1460, 790, C.paars, fase(t, q.at('hoe', 1), q.at('Veel', 1)), 'center', 30);
    const HP = hersenZoom(ctx, 1460, 400, 250, HD[0] + 40, HD[1], { hth: q.on('hypothalamus', 1), stam: q.on('hersenstam', 1), t, hthNaam: q.on('hypothalamus', 1), stamNaam: q.on('hersenstam', 1) });
    if (HP) { hormoonStroom(ctx, [860, 620], HP.hth, t, q.on('Veel', 1) * (1 - 0.6 * M), Math.max(2, Math.round(n / 2)));
      zenuwSignaal(ctx, [850, 280], [HP.stam[0] - 30, HP.stam[1] + 20], t, q.on('signalen', 1), 1); }
    tag(ctx, 'genoeg voorraad', 1460, 790, C.groen, fase(t, q.at('voorraad', 1) - 0.4, q.at('Minder', 1) + 0.2), 'center', 32);
    tag(ctx, 'minder leptine → meer trek', 1460, 790, C.goud, fase(t, q.at('Minder', 1), q.at('hypothalamus', 1) + 0.2), 'center', 32);
    filmKaartje(ctx, 1120, 760, 'Het hoofdkantoor', q.on('hypothalamus', 1)); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const h = 560;
    mens(ctx, 'joost', 380, h, { t, outfit: 'gewoon', uit: 'neutraal' }); mens(ctx, 'erik', 720, h, { t, uit: 'blij', kijk: -1 });
    naamBij(ctx, 'Joost', 'afgevallen', 380, 260, 1, 'center'); naamBij(ctx, 'buurman', 'altijd al zo zwaar', 720, 260, q.on('buurman', 1), 'center');
    haak(ctx, 260, 840, 700, 'zelfde gewicht, zelfde lengte', C.goud, q.on('gewicht', 1));
    metaA(ctx, 'VERBRUIK PER DAG', 1400, 300, q.on('verbruikt', 1), C.koraal, 'center', 30);
    verbruikStaaf(ctx, 1240, 760, 170, 0, 0, { leeg: 300, label: 'JOOST', a: q.on('verbruikt', 1) }); verbruikStaaf(ctx, 1560, 760, 170, 0, 0, { leeg: 300, label: 'BUURMAN', a: q.on('verbruikt', 1) });
    vraagteken(ctx, 1400, 600, q.on('denk', 1), 100); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de buurman verbruikt meer', 1 - q.on('precies', 1)); const h = 520;
    const S = q.on('spieren', 1), L = q.on('leptine', 1);
    mens(ctx, 'joost', 330, h, { t, outfit: 'gewoon', uit: L > 0.5 ? 'ernstig' : 'neutraal' }); mens(ctx, 'erik', 640, h, { t, uit: 'blij', kijk: -1 });
    naamBij(ctx, 'Joost', '', 330, 300, 1, 'center'); naamBij(ctx, 'buurman', '', 640, 300, 1, 'center');
    const vul = q.on('Gemiddeld', 1, 1.2);
    verbruikStaaf(ctx, 1040, 720, 170, 230, lerp(90, 50, vul), { label: 'JOOST', namen: 1, hlBew: S, verwacht: q.on('afgevallen', 1), verwachtH: 325 });
    verbruikStaaf(ctx, 1320, 720, 170, 230, 90, { label: 'BUURMAN', namen: 1 });
    metaA(ctx, 'VERBRUIK PER DAG', 1180, 260, 1, C.koraal, 'center', 28);
    metaA(ctx, 'GEMIDDELD · HOE GROOT: OMSTREDEN · MODEL', 1180, 215, q.on('verschillen', 1), C.grain, 'center', 28);
    tag(ctx, 'spieren werken zuiniger', 1040, 850, C.goud, fase(t, q.at('spieren', 1), q.at('leptine', 1)), 'center', 30);
    pijlTag(ctx, 'leptine ↓', 1640, 420, C.paars, L, 34); pijlTag(ctx, 'ghreline ↑', 1640, 510, C.paars, q.on('ghreline', 1), 34);
    metaA(ctx, '1 JAAR LATER NOG ZO', 1640, 585, q.on('jaar', 1), C.grain, 'center', 28); metaA(ctx, 'IN ÉÉN ONDERZOEK', 1640, 625, q.on('jaar', 1), C.grain, 'center', 28);
    tag(ctx, 'lichter lichaam: al minder · zuinig: komt erbij', 1040, 850, C.koraal, fase(t, q.at('lichter', 1), q.at('Daarom', 1)), 'center', 30);
    tag(ctx, 'afvallen gaat steeds langzamer', 1040, 850, C.goud, q.on('Daarom', 1), 'center', 32); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Joost', 1, 0.4), J2 = ramp(t, q.at('Joost', 1) + 0.4, 0.4);
    laag(ctx, 1 - J, () => { balans2(ctx, 600, 300, { eten: lerp(4, 6, q.on('trek', 1, 1.2)), lagen: [[lerp(160, 150, q.on('verbruik', 1)), C.koraal], [24, C.koraal], [lerp(56, 36, q.on('verbruik', 1)), C.koraal]], tilt: -0.13 * q.on('balans', 1, 1.2) });
      metaA(ctx, 'MEER IN DAN UIT', 600, 210, q.on('balans', 1), C.goud, 'center', 30); });
    laag(ctx, J2, () => { persoon(ctx, 'joost', 280, GROND, 560, { t, kijk: 1, outfit: 'gewoon', uit: q.on('biologie', 1) > 0.5 ? 'blij' : 'ernstig' });
      persoon(ctx, 'hanneke', 680, GROND, 490, { t, kijk: -1, uit: 'blij', pose: q.on('zegt', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Diëtist Hanneke', '', 680, 330, q.on('Hanneke', 1) * (1 - q.on('biologie', 1)), 'center'); });
    gewichtCurve2(ctx, 1160, 240, 620, 300, { u: 1, rise: 1, label: 'MODEL', pijlen: [1, 1, q.on('trek', 1), q.on('verbruik', 1)], pijlX: 1170, pijlY: 650, pijlDx: 300 });
    tag(ctx, 'nee, dit is biologie', 1460, 820, C.groen, q.on('nee', 1), 'center', 40); },

  // ---------- H4 ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Joost', 1, 0.4), J2 = ramp(t, q.at('Joost', 1) + 0.4, 0.4);
    laag(ctx, 1 - J, () => { const v = q.on('vijf', 1); telpoppetjes(ctx, 560, 300, 20, 10, 84, i => (v > 0.5 && i % 5 === 0) ? C.groen : '#5A6478', 1);
      tag(ctx, '± 1 op de 5', 960, 640, C.groen, v, 'center', 40);
      metaA(ctx, 'MET OVERGEWICHT · 10 % KWIJT · MINSTENS 1 JAAR · OVERZICHT VS', 960, 720, q.on('procent', 1), C.grain, 'center', 28); });
    laag(ctx, J2, () => { persoon(ctx, 'joost', 1300, GROND, 560, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'hanneke', 1640, GROND, 490, { t, kijk: -1, uit: t > q.at('korte', 1) && t < q.at('doen', 1) ? 'praat' : 'blij' });
      const S = q.on('korte', 1); laag(ctx, S, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 260); ctx.lineTo(160, 560); ctx.lineTo(900, 560); ctx.stroke(); metaText(ctx, 'GEWICHT', 160, 240, C.text2, 'left', 28); metaText(ctx, 'MODEL', 900, 240, C.grain, 'right', 28);
        ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); const u = clamp((t - q.at('korte', 1)) / 3, 0, 1); for (let p = 0; p <= 80 * u; p++) { const x = p / 80, y = x < 0.35 ? 0.72 - 0.4 * ease(x / 0.35) : 0.32 + 0.42 * ease((x - 0.35) / 0.5); const px = 160 + x * 740, py = 560 - y * 300; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
        metaText(ctx, 'KORT EN STRENG', 300, 620, C.koraal, 'center', 28); });
      tag(ctx, 'dan is de trek groot', 530, 700, C.goud, fase(t, q.at('groot', 1) - 0.6, q.at('Wat', 2) + 0.2), 'center', 32);
      tag(ctx, 'wat je blijft doen', 530, 700, C.groen, q.on('Wat', 2), 'center', 40); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); kaartRij(ctx, t, q, { e: 1, v: q.on('Vezelrijk', 1), hlE: fase(t, 0, q.at('Vezelrijk', 1)), hlV: q.on('Vezelrijk', 1) });
    metaA(ctx, 'IETS MEER VOL', 300, 680, q.on('vol', 1), C.oker, 'center', 28); metaA(ctx, 'DAN KOOLHYDRATEN', 300, 718, q.on('vol', 1), C.oker, 'center', 28); metaA(ctx, 'OF VET', 300, 756, q.on('vol', 1), C.oker, 'center', 28);
    metaA(ctx, 'VULT', 682, 680, q.on('vult', 1), C.groen, 'center', 28); metaA(ctx, 'HELPT EEN BEETJE', 682, 718, q.on('helpt', 1), C.groen, 'center', 28);
    persoon(ctx, 'hanneke', 1720, GROND, 480, { t, kijk: -1, uit: 'blij', pose: 'wijs' }); },

  s26(ctx, t, q) { bg(ctx, 'schema'); sterren(ctx, 120, 160, 900, 180, 26, 1); maan(ctx, 900, 220, 50, 1);
    bedSlaap(ctx, 560, 470, 0.95, t, 1); wekker(ctx, 250, 760, 56, 4, q.on('vier', 1), '4 uur');
    metaA(ctx, 'KLEIN EXPERIMENT', 1440, 220, q.on('experiment', 1), C.grain, 'center', 30);
    telpoppetjes(ctx, 1200, 300, 12, 6, 90, () => C.teal, q.on('twaalf', 1));
    metaA(ctx, '12 JONGE MANNEN', 1440, 560, q.on('twaalf', 1), C.grain, 'center', 28); metaA(ctx, '2 NACHTEN 4 UUR IN BED', 1440, 600, q.on('nachten', 1), C.grain, 'center', 28);
    vraagteken(ctx, 1440, 760, q.on('hormonen', 1), 100); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: meer ghreline en minder leptine', 1 - q.on('dus', 1)); const K = q.on('Hanneke', 1, 0.4), K2 = ramp(t, q.at('Hanneke', 1) + 0.4, 0.4);
    laag(ctx, 1 - K, () => { sterren(ctx, 120, 220, 700, 160, 20, 1); maan(ctx, 760, 280, 40, 1); bedSlaap(ctx, 470, 520, 0.7, t, 1);
      metaText(ctx, '12 JONGE MANNEN · 2 NACHTEN 4 UUR', 470, 760, C.grain, 'center', 28);
      hormoonStaafjes(ctx, 1150, 720, 'ghreline', 150, 192, q.on('ghreline', 1, 1), 1, '↑'); hormoonStaafjes(ctx, 1560, 720, 'leptine', 170, 140, q.on('leptine', 1, 1), 1, '↓');
      metaA(ctx, 'SCHEMATISCH', 1360, 280, 1, C.grain, 'center', 28);
      tag(ctx, 'meer trek', 1360, 850, C.goud, q.on('trek', 1), 'center', 36); });
    laag(ctx, K2, () => { kaartRij(ctx, t, q, { e: 1, v: 1, s: 1, b: q.on('bewegen', 1), hlB: q.on('bewegen', 1) });
      metaA(ctx, 'WIE JAREN EEN LAGER GEWICHT HOUDT, BEWEEGT VAAK VEEL', 960, 690, q.on('Mensen', 1), C.koraal, 'center', 28);
      persoon(ctx, 'hanneke', 1720, GROND, 480, { t, kijk: -1, uit: 'blij' }); }); },

  s29(ctx, t, q) { bg(ctx, 'schema'); sterren(ctx, 100, 120, 1700, 200, 30, 1); const h = 400, v = gangSnelheid('joost', h, 'loop'), off = (v * t) % 1600;
    for (const k of [0, 1]) { huisjes(ctx, 120 - off + k * 1600, GROND, 1); lantaarn(ctx, 1000 - off + k * 1600, GROND, 300, 1); lantaarn(ctx, 200 - off + k * 1600, GROND, 300, 1); }
    ctx.fillStyle = '#3A4458'; ctx.fillRect(0, GROND, W, 20);
    persoon(ctx, 'noor', 1020, GROND, h * 0.97 / (CAST.noor.lengte || 1) * 0.98, { zij: true, kijk: 1, gang: 'loop', t: t + 0.25 }); persoon(ctx, 'joost', 1180, GROND, h, { zij: true, kijk: 1, gang: 'loop', t, outfit: 'gewoon' });
    laag(ctx, q.on('verandering', 1), () => { roundRect(ctx, 120, 130, 640, 270, 16); shape(ctx, rgba('#0D1420', 0.85), null); jarenCurve(ctx, 170, 190, 540, 150, clamp((t - q.at('verandering', 1)) / 3, 0, 1)); });
    tag(ctx, 'kleine, blijvende verandering', 440, 470, C.groen, q.on('wandeling', 1), 'center', 32);
    laag(ctx, q.on('medicijnen', 1), () => { roundRect(ctx, 1180, 170, 620, 130, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.8), 1.5); metaText(ctx, 'VIA DE ARTS', 1490, 220, C.text2, 'center', 28); text(ctx, 'medicijnen · operaties', 1490, 275, fTekst(40, 700), C.text, 'center'); });
    metaA(ctx, 'BIJ ERNSTIG OVERGEWICHT', 1490, 340, q.on('ernstig', 1), C.grain, 'center', 28); },

  // ---------- Recap ----------
  s30(ctx, t, q) { praktijkDecor(ctx); const ty = 690;
    persoon(ctx, 'hanneke', 300, GROND, 470, { t, pose: 'zit', stoel: true, kijk: 1, uit: 'blij', tafel: ty }); persoon(ctx, 'joost', 820, GROND, 480, { t, pose: 'zit', stoel: true, kijk: -1, outfit: 'spreekuur', uit: q.on('schuld', 1) > 0.5 ? 'blij' : 'neutraal', tafel: ty });
    tafel(ctx, 560, ty, 760); riem(ctx, 430, ty - 18, 270, { gat: 2 }); persoon(ctx, 'noor', 1030, GROND, 440, { t, kijk: -1 });
    const D = q.on('Daarom', 1, 1);
    gewichtCurve2(ctx, 1240, 230, 560, 260, { u: 1, rise: 1, label: 'MODEL', a: 1 - D, pijlen: [q.on('leptine', 1), q.on('ghreline', 1), q.on('trek', 1), q.on('verbruik', 1)], pijlX: 1240, pijlY: 610, pijlDx: 280 });
    tag(ctx, 'biologie, geen schuld', 1520, 820, C.groen, fase(t, q.at('biologie', 1), q.at('Daarom', 1) + 0.3), 'center', 34);
    const K = [['energiebalans', 'in en uit', C.koraal, 'Daarom'], ['BMI en middel', 'waar zit het vet?', C.oker, 'helpt'], ['honger en verzadiging', 'maag, darm en vet', C.paars, 'volhoudt'], ['een lange adem', 'wat je volhoudt', C.groen, 'eiwit']];
    K.forEach(([k, s2, col, cue], i) => { const a = D * q.on(cue, 1), x = 1180 + (i % 2) * 340, y = 200 + Math.floor(i / 2) * 270; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 320, 240, 16); shape(ctx, rgba('#0D1420', 0.88), col, 2.5);
      ctx.font = fTekst(40, 800); ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; wrapC(ctx, k, x + 160, y + 80, 280, 46); text(ctx, s2, x + 160, y + 205, fTekst(32, 600), col, 'center'); ctx.restore(); }); },

  s31(ctx, t, q) { praktijkDecor(ctx); roundRect(ctx, 120, 150, 760, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Diëtist: waar leer je dit?', 150, 220, 1, C.text, 52, 'left', 700);
    stempel(ctx, 1140, 200, 'BESCHERMDE TITEL', C.goud, q.on('beschermde', 1));
    opleidingKaart(ctx, 120, 300, 1180, 'hbo', 'Voeding en Diëtetiek', 'HAN · NIJMEGEN · 4 JAAR', q.on('hbo', 1));
    tag(ctx, 'dan mag je je diëtist noemen', 710, 500, C.groen, q.on('noemen', 1), 'center', 30);
    opleidingKaart(ctx, 120, 560, 1180, 'wo', 'Voeding en Gezondheid', 'WAGENINGEN · 3 JAAR', q.on('Wageningen', 1), C.teal);
    tag(ctx, 'geen diëtist · na een master bv. onderzoeker', 710, 770, C.teal, q.on('geen', 1), 'center', 30);
    persoon(ctx, 'hanneke', 1620, GROND, 500, { t, kijk: -1, uit: 'blij' }); naamBij(ctx, 'Diëtist Hanneke', 'hbo voeding en diëtetiek', 1620, 320, 1, 'center'); },

  s32(ctx, t, q) { praktijkDecor(ctx); const h = 560, jx = 330, B = buikPunt(jx, h, 0, 3.05);
    mens(ctx, 'joost', jx, h, { t, outfit: 'spreekuur', uit: 'blij' });
    riemZoom(ctx, 880, 400, 230, B[0], B[1], 2, 'BLIJFT OP ZIJN GAATJE', 1, { trek: 1 - q.on('zit', 1, 0.8) });
    persoon(ctx, 'hanneke', 1700, GROND, 480, { t, kijk: -1, uit: 'blij', pose: 'vasthouden', hold: (c, x, y) => { roundRect(c, x - 4, y - 46, 12, 70, 4); shape(c, C.goud, null); } });
    agenda(ctx, 1380, 470, 0.9, 1, q.on('maanden', 1, 1)); metaA(ctx, 'OVER 3 MAANDEN', 1380, 660, q.on('maanden', 1), C.goud, 'center', 28); }
});

// vier advieskaartjes op een rij (H4): e eiwit, v vezels, s slaap, b bewegen
function kaartRij(ctx, t, q, o) { const w = 360, hgt = 360, y = 260, X = i => 120 + i * (w + 22);
  adviesKaart(ctx, X(0), y, w, hgt, 'eiwit', C.oker, o.e || 0, (cx, cy) => { eten(ctx, 'eiGebakken', cx - 90, cy + 10, 1.0); eten(ctx, 'bonenblik', cx + 10, cy, 1.0); eten(ctx, 'vis', cx + 100, cy + 20, 0.9); }, o.hlE);
  adviesKaart(ctx, X(1), y, w, hgt, 'vezels', C.groen, o.v || 0, (cx, cy) => { eten(ctx, 'tomaat', cx - 100, cy + 10, 1.0); eten(ctx, 'boterham', cx, cy + 10, 1.0); eten(ctx, 'appel', cx + 100, cy + 10, 1.0); }, o.hlV);
  adviesKaart(ctx, X(2), y, w, hgt, 'slaap', C.teal, o.s || 0, (cx, cy) => { maan(ctx, cx + 120, cy - 90, 22, 1); bedSlaap(ctx, cx, cy + 20, 0.5, t, 1); }, o.hlS);
  adviesKaart(ctx, X(3), y, w, hgt, 'bewegen', C.koraal, o.b || 0, (cx, cy) => { persoon(ctx, 'noor', cx - 50, cy + 130, 200, { zij: true, kijk: 1, gang: 'loop', t }); persoon(ctx, 'joost', cx + 50, cy + 130, 210, { zij: true, kijk: 1, gang: 'loop', t: t + 0.3, outfit: 'gewoon' }); }, o.hlB); }
// namen naast de lagen van de rechterschaal, van onder naar boven, met minstens 58 px ertussen; it = [naam, meta, alpha, kleur]
function laagNamen(ctx, R, items) { let vorige = 1e9; items.forEach(([n, m, a, col], i) => { const ly = R.lagen[i]; if (!ly || ly.h <= 1) return; let y = ly.y + 12 - (m ? 14 : 0); y = Math.min(y, vorige - (m ? 74 : 58)); vorige = y; naamBij(ctx, n, m, ly.x + 118, y, a, 'left', col || C.text); }); }

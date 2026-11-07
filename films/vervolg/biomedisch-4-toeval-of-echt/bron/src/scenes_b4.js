// Wat word jij? · Biomedische wetenschappen en Bio-informatica · Toeval of echt? — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Noor, Daan, Dr. Kim).
// Rode draad: Noor test de meststof van Opa Henk met twintig tomatenplantjes. Eén dataset (MET/ZONDER in teken_b4.js), nagerekend in reken/bereken.py.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fadeA(a, f) { return a * f; }
// twintig potjes in twee rijen; groei 0..1 (van jong plantje naar de gemeten lengte)
function potRijen(ctx, t, groei, stA, a = 1, x0 = 840, dx = 104, y1 = 540, y2 = 850, s = 4.4, pw = 54) { if (a <= 0.01) return;
  for (let i = 0; i < 20; i++) { const rij = i < 10 ? 0 : 1, x = x0 + (i % 10) * dx, v = POT_W[i], h = 8 + (v - 8) * ease(groei);
    tomaatPlant(ctx, x, rij ? y2 : y1, h, s, { a, pw, t, sticker: TOEWIJS[i] ? 'met' : 'zonder', stA, bloem: true }); } }

Object.assign(SCENES, {
  title(ctx, t) { for (let i = 0; i < 4; i++) tomaatPlant(ctx, 1240 + i * 150, 760, [40, 46, 37, 43][i], 5.2, { pw: 70, t, sticker: i % 2 ? 'met' : 'zonder', bloem: true }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const N = q.on('Noor', 1, 0.3), P = q.on('twintig', 1), G = clamp((t - q.at('weken', 1)) / 2.5, 0, 1);
    const Tp = 1 - P; for (let i = 0; i < 4; i++) tomaatPlant(ctx, 900 + i * 170, 860, [52, 60, 48, 56][i] - G * 0, 6, { pw: 80, t, a: Tp, bloem: true });
    persoon(ctx, 'henk', 250, 880, 420, { t, pose: 'vasthouden', kijk: 1, uit: q.at('Zie', 1) <= t ? 'lacht' : 'blij', hold: (c, x, y) => mestZak(c, x + 6, y - 6, 0.9) });
    naamBij(ctx, 'Opa Henk', 'nieuwe meststof', 140, 400, 1 - q.on('twintig', 1), 'left');
    persoon(ctx, 'noor', 560, 880, 400, { t, a: N, kijk: 1, uit: 'neutraal', pose: q.at('meet', 1) <= t ? 'wijs' : 'staan' });
    potRijen(ctx, t, G, q.on('toeval', 1), P);
    metaA(ctx, 'na vijf weken', 1310, 150, q.on('weken', 1), C.grain, 'center', 24);
    chip(ctx, 'met meststof: gemiddeld 43 cm', 400, 200, KL_MET, q.on('drieënveertig', 1), 28);
    chip(ctx, 'zonder: gemiddeld 40 cm', 400, 270, KL_ZON, q.on('veertig', 2), 28);
    tag(ctx, '3 cm langer', 400, 360, C.goud, q.on('langer', 1), 'center', 34);
    vraagteken(ctx, 700, 330, q.on('genoeg', 1), 110); },

  // ---------- H1 Spreiding ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: dat hangt af van de spreiding');
    const X = asX(20, 60, 300, 1700), yM = 430, yZ = 670, yA = 760;
    const kz = [38, 39, 39, 40, 40, 40, 40, 41, 41, 42], gz = [25, 29, 33, 37, 40, 42, 45, 47, 50, 52];
    const B = q.on('vijfentwintig', 1, 1.2), D = q.on('Noor', 1, 1.4);
    const mz = kz.map((v, i) => lerp(lerp(v, gz[i], B), ZONDER[i], D)), mm = kz.map((v, i) => lerp(lerp(v + 3, gz[i] + 3, B), MET[i], D));
    lengteAs(ctx, X, 20, 60, 5, yA, 1);
    regel(ctx, 'met', 120, yM + 10, 1, KL_MET, 32, 'left', 700); regel(ctx, 'zonder', 120, yZ + 10, 1, KL_ZON, 32, 'left', 700);
    const S = q.on('standaardafwijking', 1);
    sdBand(ctx, X, 43, sdv(mm), yM + 4, 110, KL_MET, S); sdBand(ctx, X, 40, sdv(mz), yZ + 4, 110, KL_ZON, S);
    const O = q.on('overlappen', 1); if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; ctx.fillStyle = rgba(C.koraal, 0.13); ctx.fillRect(X(39) - 14, yM - 120, X(44) - X(39) + 28, yZ - yM + 150); ctx.restore(); }
    gemLijn(ctx, X, 43, yM, 120, KL_MET, 1); gemLijn(ctx, X, 40, yZ, 120, KL_ZON, 1);
    const Pl = q.on('plantjes', 1); stipRij(ctx, X, mm, yM, KL_MET, Pl); stipRij(ctx, X, mz, yZ, KL_ZON, Pl);
    regel(ctx, 'gemiddeld 43', X(43) + 16, yM - 96, 1 - Pl, KL_MET, 26, 'left', 700); regel(ctx, 'gemiddeld 40', X(40) - 16, yZ - 96, 1 - Pl, KL_ZON, 26, 'right', 700);
    chip(ctx, '3 cm is hier veel', 1500, 230, C.groen, q.on('veel', 1) * (1 - B), 28);
    chip(ctx, '3 cm valt weg in de ruis', 1500, 230, C.koraal, q.on('ruis', 1) * (1 - q.on('spreiding', 1)), 28);
    naamBij(ctx, 'spreiding', '', X(57), yM - 150, q.on('spreiding', 1) * (1 - D), 'center');
    chip(ctx, 'standaardafwijking ≈ 3 cm', 1500, 230, C.goud, q.on('drie', 2) * D, 28);
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('kleinste', 1); circ(ctx, X(39), yM, 22, null, C.text, 4); ctx.restore(); ctx.save(); ctx.globalAlpha *= q.on('grootste', 1); circ(ctx, X(44), yZ, 22, null, C.text, 4); ctx.restore(); }
    regel(ctx, '39 cm', X(39), yM - 40, q.on('negenendertig', 1), C.text, 26, 'center', 700); regel(ctx, '44 cm', X(44), yZ - 40, q.on('grootste', 1), C.text, 26, 'center', 700); },

  // ---------- H2 Hoeveel plantjes? ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const X = asX(34, 46, 360, 1380);
    persoon(ctx, 'noor', 1660, 880, 400, { t, kijk: -1, uit: q.at('half', 1) <= t ? 'neutraal' : 'blij', pose: q.at('half', 1) <= t ? 'denk' : 'staan' });
    const paneelN = (n, y, a, seed, hl) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lengteAs(ctx, X, 34, 46, 2, y, 1, ''); regel(ctx, n + ' plantjes', 120, y - 20, 1, C.text, 30, 'left', 700);
      const k = Math.floor(Math.max(0, t) / 0.9), hist = [];
      for (let j = Math.max(0, k - 14); j <= k; j++) { const r = rng32(seed * 1000 + j); const vals = []; for (let i = 0; i < n; i++) { const u = r() + r() + r() + r() - 2; vals.push(40 + u * 3 * 1.22); } hist.push([vals, gem(vals)]); }
      hist.forEach(([vals, m], i) => { const last = i === hist.length - 1; if (!last) { ctx.strokeStyle = rgba(C.goud, 0.45); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(m), y - 46); ctx.lineTo(X(m), y - 10); ctx.stroke(); } });
      const [vals, m] = hist[hist.length - 1]; const imax = vals.indexOf(Math.max(...vals));
      vals.forEach((v, i) => circ(ctx, X(clamp(v, 34, 46)), y - 110, 12, rgba(C.teal, 0.8), i === imax && hl > 0.5 ? C.koraal : C.teal, i === imax && hl > 0.5 ? 5 : 2));
      ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(m), y - 70); ctx.lineTo(X(m), y - 6); ctx.stroke(); ctx.restore(); };
    paneelN(10, 680, 1, 2, 0); metaA(ctx, 'lengte in centimeter', X(46), 760, 1, C.text2, 'right', 18); paneelN(3, 380, q.on('drie', 1), 1, q.on('toevallig', 1));
    metaA(ctx, 'goud = gemiddelde van één herhaling', 360, 170, 1, C.grain, 'left', 22);
    tag(ctx, 'standaardfout = standaardafwijking / √n', 870, 800, C.goud, q.on('standaardfout', 1), 'center', 30);
    chip(ctx, 'Noor: 3 / √10 ≈ 1 cm', 1500, 300, C.teal, q.on('Bij', 1) * (1 - q.on('half', 1, 0.3)), 28);
    chip(ctx, 'half zo groot: hoeveel plantjes?', 1500, 300, C.goud, ramp(t, q.at('half', 1) + 0.3, 0.4), 28); vraagteken(ctx, 1660, 420, q.on('denk', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: veertig plantjes'); const P = q.on('Stel', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P;
      const gx = 260, gy = 260, gw = 1000, gh = 460, Xn = n => gx + (n - 1) / 59 * gw, Ys = s => gy + gh - s / 3 * gh;
      assen(ctx, gx, gy, gw, gh, '', 'standaardfout in centimeter'); metaA(ctx, 'aantal plantjes per groep', gx + gw, gy + gh + 72, 1, C.text2, 'right', 18);
      [10, 20, 30, 40, 50, 60].forEach(n => text(ctx, String(n), Xn(n), gy + gh + 30, fTekst(22, 600), C.text2, 'center')); [1, 2, 3].forEach(s => text(ctx, String(s), gx - 16, Ys(s) + 8, fTekst(22, 600), C.text2, 'right'));
      const cu = q.on('helpen', 1, 2); if (cu > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let n = 1; n <= 1 + 59 * cu; n += 0.5) { const s = Math.min(3, 3 / Math.sqrt(n)); n === 1 ? ctx.moveTo(Xn(n), Ys(s)) : ctx.lineTo(Xn(n), Ys(s)); } ctx.stroke(); }
      circ(ctx, Xn(10), Ys(3 / Math.sqrt(10)), 12, C.teal, '#fff', 2); regel(ctx, '10: ≈ 0,95 cm', Xn(10) + 24, Ys(0.95) - 18, 1, C.teal, 26, 'left', 700);
      const v = q.on('Vier', 1); circ(ctx, Xn(40), Ys(3 / Math.sqrt(40)), 12 * v, C.groen, '#fff', 2); regel(ctx, '40: ≈ 0,47 cm', Xn(40), Ys(0.47) - 30, v, C.groen, 26, 'center', 700);
      tag(ctx, '4 × zoveel → √4 = 2 → half zo groot', 1540, 300, C.groen, q.on('wortel', 1), 'center', 28);
      chip(ctx, 'elk extra plantje helpt minder', 1540, 420, C.text2, q.on('minder', 1), 26); chip(ctx, 'vooraf uitrekenen', 1540, 520, C.goud, q.on('vooraf', 1), 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; metaA(ctx, 'stel: de meststof scheelt echt 3 centimeter · 20 proeven', 160, 240, 1, C.grain, 'left', 24);
      const rij = (y, n, hits, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; regel(ctx, n + ' per groep', 160, y + 44, 1, C.text, 30, 'left', 700);
        for (let i = 0; i < 20; i++) { const ok = i < hits, x = 480 + i * 56; roundRect(ctx, x, y, 44, 60, 6); shape(ctx, ok ? rgba(C.groen, 0.3) : '#2A3446', ok ? C.groen : C.line, 2); if (ok) vink_(ctx, x + 22, y + 30, 12, 1); }
        regel(ctx, Math.round(hits / 20 * 100) + ' %', 1640, y + 44, 1, C.groen, 34, 'left', 700); ctx.restore(); };
      rij(330, 10, 11, q.on('tien', 1)); rij(470, 17, 16, q.on('zeventien', 1)); metaA(ctx, 'groen = significant verschil gevonden', 480, 590, q.on('tien', 1), C.groen, 'left', 20);
      const M = q.on('Onderzoek', 2); proefMuis(ctx, 760, 760, 0.55, M, t); tag(ctx, 'film: Onderzoek doen', 1180, 740, C.teal, M, 'center', 28); chip(ctx, 'te weinig dieren is ook onethisch', 1180, 820, C.text2, q.on('onethisch', 1), 24); ctx.restore(); } },

  // ---------- H3 Wat de p-waarde zegt ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const H = q.at('Hussel', 1), k = t > H ? Math.floor((t - H) / 0.55) : -1, hs = k >= 0 ? hussel(k) : null;
    tag(ctx, 'film: Onderzoek doen · Mendel', 1500, 150, C.teal, 1 - q.on('nulhypothese', 1), 'center', 26);
    tag(ctx, 'nulhypothese: de meststof doet niets', 960, 150, C.goud, q.on('nulhypothese', 1), 'center', 30);
    for (let i = 0; i < 20; i++) { const x = 330 + i * 66, lab = hs ? hs.lab[i] : TOEWIJS[i]; tomaatPlant(ctx, x, 480, POT_W[i], 3.4, { pw: 44, t, sticker: lab ? 'met' : 'zonder', stA: q.on('stickers', 1) }); }
    const X = d => 960 + d * 100, yb = 830, f = clamp((t - H) / 7, 0, 1), mx = 9724;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(-6), yb); ctx.lineTo(X(6), yb); ctx.stroke();
    for (let d = -6; d <= 6; d += 2) text(ctx, (d > 0 ? '+' : '') + d, X(d), yb + 34, fTekst(22, 600), C.text2, 'center');
    metaA(ctx, 'verschil met − zonder in centimeter', X(6), yb + 64, 1, C.text2, 'right', 18);
    
    PERM_TEL.forEach((c, i) => { const d = (i - 30) * 0.2, h = c / mx * 250 * f; if (h < 0.5) return; const staart = Math.abs(d) >= 3 - 1e-9; ctx.fillStyle = staart && t >= q.at('vier', 1) ? C.koraal : rgba(C.teal, 0.75); ctx.fillRect(X(d) - 9, yb - h, 18, h); });
    if (hs && f < 1) { const yy = yb - 300; circ(ctx, X(hs.d), yy, 12, C.goud); }
    const N3 = q.on('drie', 1); if (N3 > 0.01) { ctx.save(); ctx.globalAlpha *= N3; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; [-3, 3].forEach(d => { ctx.beginPath(); ctx.moveTo(X(d), yb); ctx.lineTo(X(d), yb - 280); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); regel(ctx, 'Noor: +3', X(3) + 14, yb - 250, N3, C.goud, 26, 'left', 700); }
    chip(ctx, 'meestal dicht bij nul', 480, 680, C.teal, q.on('Meestal', 1) * (1 - q.on('vier', 1)), 26);
    chip(ctx, '≈ 4 op de 100: 3 cm of meer', 480, 680, C.koraal, q.on('vier', 1), 26);
    tag(ctx, 'p ≈ 0,04', 1660, 620, C.koraal, q.on('komma', 1), 'center', 40); vraagteken(ctx, 1660, 780, q.on('precies', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: zonder effect zelden zo\'n verschil'); const Fo = q.on('foutbalken', 1, 0.5), F = ramp(t, q.at('foutbalken', 1) + 0.5, 0.5);
    if (Fo < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Fo;
      roundRect(ctx, 260, 250, 1400, 170, 18); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); regel(ctx, 'p = kans op een verschil van minstens 3 cm', 960, 320, 1, C.text, 40, 'center', 700); regel(ctx, '(groter of kleiner), uitgerekend alsof de meststof niets doet', 960, 380, q.on('uitgerekend', 1), C.groen, 32, 'center', 600);
      const N = q.on('niet', 2); roundRect(ctx, 260, 470, 1400, 120, 18); shape(ctx, rgba(C.koraal, 0.1 * N), rgba(C.koraal, N), 2); regel(ctx, 'niet: de kans dat de meststof niets doet', 960, 545, N, C.koraal, 36, 'center', 700); kruis(ctx, 1600, 530, 24, N);
      chip(ctx, 'en ook niet: hoe groot het effect is', 960, 690, C.goud, q.on('kleine', 1), 28); ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const Y = v => 780 - (v - 30) * 25, gx = 300;
      assen(ctx, gx, 280, 620, 500, '', 'lengte in centimeter'); [30, 35, 40, 45, 50].forEach(v => text(ctx, String(v), gx - 14, Y(v) + 8, fTekst(22, 600), C.text2, 'right'));
      const ts = [q.at('spreiding', 1), q.at('standaardfout', 1), q.at('betrouwbaarheidsinterval', 1)], soort = t >= ts[2] ? 2 : t >= ts[1] ? 1 : t >= ts[0] ? 0 : -1;
      const hw = [[3.02, 2.91], [0.95, 0.92], [2.16, 2.08]], nm = ['± standaardafwijking', '± standaardfout', '95%-betrouwbaarheidsinterval'];
      [[40, KL_ZON, 'zonder', 480], [43, KL_MET, 'met', 740]].forEach(([m, col, lab, x], j) => { if (soort >= 0) { const h = hw[soort][j] * 25; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, Y(m) - h); ctx.lineTo(x, Y(m) + h); ctx.moveTo(x - 24, Y(m) - h); ctx.lineTo(x + 24, Y(m) - h); ctx.moveTo(x - 24, Y(m) + h); ctx.lineTo(x + 24, Y(m) + h); ctx.stroke(); }
        circ(ctx, x, Y(m), 16, col, '#fff', 2); text(ctx, lab, x, 830, fTekst(28, 700), col, 'center'); });
      if (soort >= 0) tag(ctx, nm[soort], 1180, 250, C.text2, 1, 'center', 26);
      const O = q.on('overlappen', 1); if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; ctx.fillStyle = rgba(C.koraal, 0.15); ctx.fillRect(400, Y(42.16), 440, Y(40.92) - Y(42.16)); ctx.restore(); chip(ctx, 'balken overlappen', 1180, 340, C.koraal, O, 26); }
      chip(ctx, 'en toch p ≈ 0,04', 1180, 420, C.goud, q.on('kleiner', 1), 26);
      const V = q.on('verschil', 3), Xd = d => 1080 + d * 100; if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; regel(ctx, 'het verschil: 3 cm', 1380, 540, 1, C.text, 32, 'center', 700);
        ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Xd(-0.5), 700); ctx.lineTo(Xd(6.5), 700); ctx.stroke(); [0, 1, 2, 3, 4, 5, 6].forEach(d => text(ctx, String(d), Xd(d), 736, fTekst(22, 600), C.text2, 'center'));
        ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(Xd(0), 600); ctx.lineTo(Xd(0), 700); ctx.stroke(); ctx.setLineDash([]);
        const A = q.on('Alle', 1); roundRect(ctx, Xd(0.22), 630, Xd(5.78) - Xd(0.22), 30, 15); shape(ctx, rgba(C.goud, 0.2 + 0.35 * A), C.goud, 3); circ(ctx, Xd(3), 645, 14, C.goud, '#fff', 2);
        regel(ctx, '0,2', Xd(0.22), 612, 1, C.goud, 24, 'center', 700); regel(ctx, '5,8', Xd(5.78), 612, 1, C.goud, 24, 'center', 700); metaA(ctx, 'centimeter', Xd(6.5), 780, 1, C.text2, 'right', 18); ctx.restore(); }
      ctx.restore(); } },

  // ---------- H4 Zelf rekenen ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const Py = q.on('Python', 1), R = q.on('Allebei', 1);
    persoon(ctx, 'daan', 170, 880, 360, { t, kijk: 1, uit: R > 0.5 ? 'blij' : 'neutraal', pose: 'denk' }); persoon(ctx, 'noor', 420, 880, 380, { t, kijk: 1, uit: R > 0.5 ? 'blij' : 'neutraal', pose: 'wijs' });
    spreadsheet(ctx, 640, 240, q.on('spreadsheet', 1), q.on('formule', 1), R);
    codeVenster(ctx, 1110, 250, 720, [['from scipy import stats', C.paars], ['met = [39, 41, 41, 41, 42, 43, 44, 44, 46, 49]', KL_MET], ['zonder = [35, 36, 38, 39, 40, 41, 41, 43, 43, 44]', KL_ZON], ['round(stats.ttest_ind(met, zonder).pvalue, 3)', '#D8DEE6'], [R > 0.5 ? '0.036' : '', C.groen]], Py);
    chip(ctx, 'husselen gaf ≈ 0,04', 1470, 620, C.text2, q.on('husselen', 1), 26);
    tag(ctx, 't = verschil / wiebel ≈ 3 / 1,3 ≈ 2,3', 1470, 730, C.goud, q.on('vergelijkt', 1), 'center', 30); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    for (let i = 0; i < 4; i++) tomaatPlant(ctx, 1120 + i * 120, 880, [44, 41, 46, 40][i], 5, { pw: 60, t, sticker: i % 2 ? 'zonder' : 'met', bloem: true });
    persoon(ctx, 'henk', 1650, 880, 420, { t, kijk: -1, uit: 'blij', pose: 'staan' }); persoon(ctx, 'noor', 960, 880, 400, { t, kijk: 1, uit: 'blij', pose: 'wijs' });
    chip(ctx, 'past slecht bij "doet niets"', 480, 240, C.groen, 1, 28); chip(ctx, 'hoeveel? tussen 0,2 en 5,8 cm', 480, 320, C.goud, q.on('hoeveel', 1), 28);
    tag(ctx, 'spreiding', 480, 470, C.teal, q.on('spreiding', 1), 'center', 32); tag(ctx, 'aantal metingen', 480, 570, C.teal, q.on('aantal', 1), 'center', 32); tag(ctx, 'wat p echt zegt', 480, 670, C.teal, q.on('p-waarde', 1, 0.4), 'center', 32); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const BI = q.on('bio-informatica', 1);
    persoon(ctx, 'kim', 230, 880, 430, { t, kijk: 1, outfit: 'lab', uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 130, 400, 1 - BI * 0.5, 'left');
    proefMuis(ctx, 560, 660, 0.45, 1 - BI * 0.5, t); petriCellen(ctx, 760, 560, 80, (1 - BI * 0.5) * q.on('cellen', 1, 0.3), t);
    tag(ctx, 'Biomedische wetenschappen', 560, 300, C.teal, q.on('Biomedische', 2), 'center', 30); regel(ctx, 'universiteit · bachelor 3 jaar · dan een master', 560, 370, q.on('drie', 1), C.text2, 26, 'center', 600);
    tag(ctx, 'Bio-informatica', 1400, 230, C.paars, BI, 'center', 30);
    const G = q.on('twintigduizend', 1), L = q.on('verwacht', 1), S = q.on('strengere', 1);
    genRaster(ctx, 1000, 290, 40, 20, 16, 4, i => L > 0.5 && S < 0.5 && hash(i * 3.7) < 0.05, G, t);
    metaA(ctx, '1 vakje = 25 genen · 20 000 genen', 1000, 720, G, C.grain, 'left', 20);
    chip(ctx, '≈ 1000 × p < 0,05 door toeval', 1400, 790, C.koraal, L * (1 - S), 26); chip(ctx, 'strengere grens: door toeval nu ± 0', 1400, 790, C.groen, S * (1 - q.on('hbo', 1)), 26);
    regel(ctx, 'hbo · 4 jaar · master aan de universiteit', 1400, 790, q.on('hbo', 1), C.text2, 26, 'center', 600); }
});

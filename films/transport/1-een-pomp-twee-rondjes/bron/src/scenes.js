// Transport 1 · Eén pomp, twee rondjes — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#3A2A20', shirt: '#4F7A6A', hairStyle: 'long' };
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const fade = (q, w1, w2, n1 = 1, n2 = 1) => q.on(w1, n1) * (1 - (w2 ? q.on(w2, n2) : 0));

// ---------- Macro: buiten bij de bushalte ----------
function buiten(ctx, t, bus = true) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.berg; ctx.beginPath(); ctx.moveTo(0, 620); ctx.lineTo(260, 420); ctx.lineTo(520, 600); ctx.lineTo(820, 380); ctx.lineTo(1120, 610); ctx.lineTo(W, 470); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = C.bgMacroHill; ctx.fillRect(0, 640, W, H); ctx.fillStyle = '#4A5568'; ctx.fillRect(0, 780, W, 120);
  ctx.strokeStyle = rgba('#E6E1D3', 0.4); ctx.lineWidth = 6; ctx.setLineDash([60, 50]); ctx.beginPath(); ctx.moveTo(0, 840); ctx.lineTo(W, 840); ctx.stroke(); ctx.setLineDash([]);
  // bushalte
  if (bus) { ctx.fillStyle = '#8FA0B5'; ctx.fillRect(1540, 380, 10, 400); roundRect(ctx, 1490, 330, 110, 110, 55); shape(ctx, '#E0B64A', '#F0CC7A', 3); text(ctx, 'BUS', 1545, 398, fTekst(34, 700), '#1A2740', 'center'); }
}
function bonzendHart(ctx, x, y, r, t, bpm, a = 1) { if (a <= 0.01) return; const per = 60 / bpm, ph = (t % per) / per, k = Math.exp(-ph * 8); const s = r * (1 + 0.16 * k);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + s * 0.9); ctx.bezierCurveTo(x - s * 1.6, y - s * 0.3, x - s * 0.7, y - s * 1.4, x, y - s * 0.45); ctx.bezierCurveTo(x + s * 0.7, y - s * 1.4, x + s * 1.6, y - s * 0.3, x, y + s * 0.9); ctx.closePath(); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 2);
  for (let i = 0; i < 2; i++) { const kk = clamp(ph * 2 - i * 0.3, 0, 1); ctx.strokeStyle = rgba(TR.rijkL, (1 - kk) * 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, s * (1.3 + kk * 0.8), 0, 6.283); ctx.stroke(); }
  ctx.restore(); }

// ---------- borstkas met longen (Schema) ----------
function borstkas(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  lichaam(ctx, x, y, s, 0.9, { darm: 0 });
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 120 * s, y - 120 * s, 95 * s, 170 * s, sd * 0.1, 0, 6.283); shape(ctx, rgba('#D98C8C', 0.25), rgba('#D98C8C', 0.8), 2); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { hart(ctx, 1580, 690, 0.6, { f: hartFase(t * 1.1), stroom: 1, t, krans: 0.6 }); },

  s01(ctx, t, q) { buiten(ctx, t);
    const run = clamp(1 - t / 2.2, 0, 1); const px = lerp(1380, 700, 1 - run);
    const hand = q.on('bonken', 1);
    person(ctx, px, 900, 470, 1, { armR: { a1: lerp(0.5, 0.35, hand), a2: lerp(-0.3, -2.5, hand) }, armL: { a1: 0.3, a2: 0.2 }, open: q.at('bonken') < t });
    bonzendHart(ctx, px + 18, 560, 34, t, 150, q.on('bonken', 1) * (1 - q.on('Elke', 1)));
    const zp = q.on('Elke', 1);
    if (zp > 0.01) { zoomCircle(ctx, 1150, 400, 230, px + 18, 560, 'schematisch · niet op schaal', zp, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 150, 500, 500); hart(ctx, 1150, 420, 0.45, { f: hartFase(t * 2.4), stroom: 1, t: t * 1.5 }); }); }
    tag(ctx, 'naar je longen', 1590, 300, TR.armL, q.on('longen', 1) * (1 - q.on('pompkamers', 1)));
    tag(ctx, 'naar de rest van je lichaam', 1590, 560, TR.rijkL, q.on('lichaam', 1) * (1 - q.on('pompkamers', 1)));
    const w = q.on('dik', 1); if (w > 0.01) { const p1 = hartPunt(1150, 420, 0.45, 'wandLV'), p2 = hartPunt(1150, 420, 0.45, 'wandRV');
      label(ctx, 'linkerkamer', 'DIKKE WAND', p1[0], p1[1], 1560, 720, w, C.goud); naamBij(ctx, 'rechterkamer', 'DUNNE WAND', 905, 300, w * q.on('rechterkamer', 1), 'right', C.text); }
    vraagteken(ctx, 1700, 300, q.on('komt', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const ho = q.on('Snijd', 1); const pA = 1 - ho;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; borstkas(ctx, 960, 560, 0.95);
      bonzendHart(ctx, 985, 470, 44, t, 70, 1);
      ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.text, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 130); ctx.lineTo(960, 860); ctx.stroke(); ctx.restore();
      metaText(ctx, 'midden', 960, 120, C.grain, 'center', 24);
      tag(ctx, 'bijna in het midden, iets naar links', 960, 860, C.goud, q.on('midden', 1) * (1 - q.on('vuist', 1)));
      tag(ctx, 'zo groot als je vuist', 960, 860, C.goud, q.on('vuist', 1));
      metaText(ctx, 'vooraanzicht', 1700, 160, C.grain, 'center', 24);
      ctx.restore(); }
    if (ho > 0.01) { ctx.save(); ctx.globalAlpha *= ho; const X = 900, Y = 560, S = 1.05;
      hart(ctx, X, Y, S, { f: hartFase(0.2), vaten: 0.5, peesdraden: 0.4 });
      const lab = (key, n, m, lx, ly, w, col = C.text) => { const p = hartPunt(X, Y, S, key); label(ctx, n, m, p[0], p[1], lx, ly, w, col); };
      const b = q.on('boezems', 1) * (1 - q.on('Links', 3)), k = q.on('kamers', 1) * (1 - q.on('Links', 3));
      lab('RA', 'rechterboezem', '', 300, 250, b); lab('LA', 'linkerboezem', '', 1500, 250, b);
      lab('RV', 'rechterkamer', '', 300, 700, k); lab('LV', 'linkerkamer', '', 1500, 760, k);
      lab('septum', 'tussenschot', '', 960, 860, q.on('tussenschot', 1) * (1 - q.on('Links', 3)), C.goud);
      const lr = q.on('Links', 3) * (1 - q.on('Ook', 1));
      if (lr > 0.01) { ctx.save(); ctx.globalAlpha *= lr; person(ctx, 1640, 640, 300, 1, {}); tag(ctx, 'zijn links', 1640, 700, C.goud, 1); tag(ctx, 'jouw links = rechts op het plaatje', 960, 140, C.goud, q.on('plaatje', 1));
        const p = hartPunt(X, Y, S, 'LV'); label(ctx, 'linkerkamer', 'RECHTS OP HET PLAATJE', p[0], p[1], 1300, 830, 1, C.goud); ctx.restore(); }
      const w = q.on('Ook', 1); if (w > 0.01) { naamBij(ctx, 'boezem', 'DUNNE SPIERWAND', 560, 410, w, 'right'); naamBij(ctx, 'kamer', 'DIKKE SPIERWAND', 1275, 700, q.on('kamers', 2), 'left', C.goud);
        const pp = (t * 0.9) % 1; if (q.on('pompen', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('pompen', 1); hart(ctx, X, Y, S, { f: hartFase(t * 0.9), vaten: 0.5, peesdraden: 0.4, a: 1 }); ctx.restore(); } }
      ctx.restore(); }
  },

  s05(ctx, t, q) { bg(ctx, 'schema'); const X = 900, Y = 600, S = 0.95;
    const kr = q.on('hartspier', 1);
    hart(ctx, X, Y, S, { f: hartFase(t * 0.8), vaten: 1, stroom: 1 - kr * 0.7, t, krans: kr, dimR: q.on('linkerboezem', 1) * (1 - kr), dimL: (q.on('rechterboezem', 1) - q.on('linkerboezem', 1)) * (1 - kr), peesdraden: 0.3 });
    const lab = (key, n, m, lx, ly, w, col = C.text) => { const p = hartPunt(X, Y, S, key); label(ctx, n, m, p[0], p[1], lx, ly, w, col); };
    const r1 = 1 - q.on('linkerboezem', 1); const r2 = q.on('linkerboezem', 1) * (1 - kr);
    lab('bovenste', 'bovenste holle ader', 'UIT JE LICHAAM', 380, 150, q.on('bovenste', 1) * r1, TR.armL);
    lab('onderste', 'onderste holle ader', 'UIT JE LICHAAM', 380, 820, q.on('onderste', 1) * r1, TR.armL);
    lab('longslagader', 'longslagader', 'NAAR JE LONGEN', 420, 400, q.on('longslagader', 1) * r1, TR.armL);
    lab('longader', 'longaders', 'UIT JE LONGEN', 1520, 340, q.on('longaders', 1) * r2, TR.rijkL);
    lab('aorta', 'aorta', 'NAAR JE LICHAAM', 1500, 150, q.on('aorta', 1) * r2, TR.rijkL);
    lab('krans', 'kransslagaders', 'VOEDEN DE HARTSPIER', 1520, 720, q.on('kransslagaders', 1), C.goud);
    tag(ctx, 'niet uit de holtes', 960, 880, C.koraal, q.on('holtes', 1) * (1 - q.on('kransslagaders', 1)));
  },

  s06(ctx, t, q) { bg(ctx, 'schema'); const X = 900, Y = 600, S = 0.95;
    hart(ctx, X, Y, S, { f: hartFase(0.2), vaten: 1, kleur: 0 });
    const p = hartPunt(X, Y, S, 'longslagader'); label(ctx, 'longslagader', 'EEN SLAGADER', p[0], p[1], 420, 380, q.on('longslagader', 1), C.goud);
    vraagteken(ctx, 1500, 420, q.on('bloed', 1), 160);
  },

  s08(ctx, t, q) { bg(ctx, 'schema'); const X = 960, Y = 450, S = 0.8;
    const d0 = q.at('Volg'), dRB = q.at('rechterboezem'), dRK = q.at('rechterkamer', 2), dL = q.at('longen'), dLB = q.at('linkerboezem');
    // druppel langs de kleine ronde: begint in de holle ader (groot ronde einde), dan klein
    let u, ronde = 'klein'; if (t < dRB) { ronde = 'groot'; u = lerp(0.82, 1, clamp((t - d0) / Math.max(1, dRB - d0), 0, 1)); } else u = lerp(0, 1, clamp((t - dRB) / Math.max(1, dLB + 1.2 - dRB), 0, 1));
    const tP = q.at('pompt'); if (t >= dRB && t < tP) { ronde = 'klein'; u = 0; }
    lus(ctx, X, Y, S, { groot: 0.35, klein: 1, labels: q.on('longslagader', 1), druppel: (t >= dRB && t < tP) ? -1 : u, druppelRonde: ronde, hi: t < dRK ? 'RA' : t < q.at('pompt') ? 'RV' : t < dLB ? null : 'LA' });
    if (t >= dRB && t < tP) { const k = clamp((t - dRB) / Math.max(0.5, tP - dRB), 0, 1); const px = X - 49 * S, py = lerp(Y - 39 * S, Y + 39 * S, k); ctx.save(); ctx.beginPath(); ctx.arc(px, py, 14, 0, 6.283); shape(ctx, TR.arm, C.goud, 3); ctx.restore(); }
    tag(ctx, 'zuurstof erin, koolstofdioxide eruit', X, 130, TR.rijkL, q.on('zuurstof', 2) * (1 - q.on('eerste', 1)));
    tag(ctx, 'de kleine bloedsomloop', X, 130, C.goud, q.on('kleine', 1));
  },

  s09(ctx, t, q) { bg(ctx, 'schema'); const X = 860, Y = 450, S = 0.8;
    const def = q.on('richting', 1) * (1 - q.on('grote', 1));
    const g0 = q.at('linkerboezem'), g1 = q.at('rechterboezem') + 1;
    const u = clamp((t - g0) / Math.max(1, g1 - g0), 0, 1);
    lus(ctx, X, Y, S, { klein: 1, groot: q.on('linkerboezem', 1) + 0.25, labels: 1, druppel: t > g0 ? u : -1, druppelRonde: 'groot', hi: t < g0 ? null : u < 0.12 ? 'LV' : null });
    tag(ctx, 'antwoord b: de longslagader voert zuurstofarm bloed', X, 130, C.goud, q.on('Antwoord', 1) * (1 - q.on('richting', 1)));
    if (def > 0.01) { ctx.save(); ctx.globalAlpha *= def; roundRect(ctx, 1330, 300, 560, 150, 18); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); regel(ctx, 'slagader: van het hart af', 1360, 360, q.on('slagader', 3), C.text, 34); regel(ctx, 'ader: naar het hart toe', 1360, 415, q.on('toe', 1), C.text, 34); ctx.restore(); }
    tag(ctx, 'de grote bloedsomloop', X, 130, C.goud, q.on('grote', 1) * (1 - q.on('dubbele', 1)));
    tag(ctx, 'twee rondjes, één hart: dubbele bloedsomloop', X, 130, C.goud, q.on('dubbele', 1));
  },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const ph = q.on('langer', 1); const pA = 1 - ph;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      // twee maatbekers, elk 70 ml per slag
      for (const [x, col, lab] of [[640, TR.arm, 'rechterkamer'], [1280, TR.rijk, 'linkerkamer']]) { const lv = 0.15 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.2)) * q.on('zeventig', 1);
        roundRect(ctx, x - 110, 260, 220, 380, 20); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); roundRect(ctx, x - 104, 634 - 370 * lv, 208, 370 * lv, 14); ctx.fillStyle = rgba(col, 0.85); ctx.fill();
        text(ctx, lab, x, 700, fTekst(34, 600), C.text, 'center'); regel(ctx, '≈ 70 ml per slag', x, 230, q.on('zeventig', 1), C.text, 32, 'center'); }
      tag(ctx, 'slagvolume', 960, 820, C.goud, q.on('slagvolume', 1) * (1 - q.on('Pompt', 1)));
      tag(ctx, 'anders hoopt het bloed zich op', 960, 820, C.koraal, q.on('hoopt', 1) * (1 - q.on('precies', 1)));
      tag(ctx, 'over de tijd: precies even veel', 960, 820, C.groen, q.on('precies', 1));
      ctx.restore(); }
    if (ph > 0.01) { ctx.save(); ctx.globalAlpha *= ph;
      // drukmeters en de twee routes
      const lu = q.on('linkerkamer', 1);
      lus(ctx, 700, 450, 0.75, { labels: 0, klein: 1, groot: 1 });
      const lk = q.on('weerstand', 1); if (lk > 0.01) { tag(ctx, 'lang rondje, smalle vaatjes: veel weerstand', 700, 130, TR.rijkL, lk * (1 - lu)); }
      for (const [x, v, lab, col, al] of [[1430, 0.2, 'rechterkamer', TR.armL, lu], [1650, 1, 'linkerkamer', TR.rijkL, lu]]) { if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al;
        roundRect(ctx, x - 50, 200, 100, 480, 18); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); const hh = 470 * v * ramp(t, q.at('linkerkamer', 1), 1.5); roundRect(ctx, x - 44, 675 - hh, 88, hh, 14); ctx.fillStyle = rgba(col, 0.85); ctx.fill();
        text(ctx, lab, x, 730, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
      regel(ctx, '≈ 5× zo hoge druk', 1540, 160, lu, C.goud, 34, 'center');
      tag(ctx, 'meer spier: dikkere wand', 1540, 830, C.goud, q.on('spier', 1) * (1 - q.on('longen', 2)));
      tag(ctx, 'lage druk in de longen: geen vocht in de longblaasjes', 960, 830, C.line, q.on('longen', 2) * (1 - q.on('Antwoord', 1)));
      tag(ctx, 'antwoord b: niet meer bloed, wel een hogere druk', 960, 830, C.goud, q.on('Antwoord', 1));
      ctx.restore(); }
  },

  s11(ctx, t, q) { bg(ctx, 'schema'); const X = 820, Y = 600, S = 0.95;
    // vertraagde cyclus, synchroon met de tekst
    const tP = q.at('ontspant'), tA = q.at('boezems', 2), tV = q.at('kamers', 3);
    let u = 0.15; if (t >= tP) u = lerp(0.05, 0.4, clamp((t - tP) / Math.max(0.5, tA - tP), 0, 1)); if (t >= tA) u = lerp(0.42, 0.575, clamp((t - tA) / 3, 0, 1)); if (t >= tV) u = lerp(0.6, 0.86, clamp((t - tV) / 3, 0, 1));
    const f = hartFase(u); hart(ctx, X, Y, S, { f, stroom: 1, t: t * 0.6, peesdraden: 0.5 });
    metaText(ctx, 'vertraagd · schematisch', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    // tijdlijn van één slag
    const tlx = 1340, tlw = 500, tly = 260; ctx.save(); ctx.globalAlpha *= q.on('vertragen', 1);
    const fasen = [[0, 0.42, 'hartpauze (diastole)', C.line], [0.42, 0.58, 'boezems', TR.armL], [0.58, 0.93, 'kamers (systole)', TR.rijkL], [0.93, 1, '', C.line]];
    fasen.forEach(([a0, a1, lab, col], i) => { roundRect(ctx, tlx, tly + i * 0, 0, 0, 0); });
    for (const [a0, a1, lab, col] of fasen) { roundRect(ctx, tlx + a0 * tlw, tly, (a1 - a0) * tlw - 4, 40, 8); shape(ctx, rgba(col, 0.4), col, 1.5); }
    ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(tlx + u * tlw, tly + 20, 10, 0, 6.283); ctx.fill();
    regel(ctx, f.naam, tlx + tlw / 2, tly + 100, 1, C.text, 36, 'center');
    ctx.restore();
    tag(ctx, 'hartpauze = diastole', 1590, 520, C.line, q.on('diastole', 1) * (1 - q.on('Dan', 1)));
    tag(ctx, 'samentrekken = systole', 1590, 520, C.goud, q.on('systole', 1));
  },

  s12(ctx, t, q) { bg(ctx, 'schema'); const X = 820, Y = 600, S = 0.95;
    const f = hartFase(0.75); hart(ctx, X, Y, S, { f: q.on('kleppen', 1) > 0 ? f : hartFase(0.2), peesdraden: 0.4, hi: { klepAV: q.on('hartklep', 1) * (1 - q.on('halvemaanvormige', 1)) > 0.5, klepSL: q.on('halvemaanvormige', 1) > 0.5 } });
    vraagteken(ctx, 1500, 360, q.on('Waarom', 1) * (1 - q.on('kleppen', 1)), 140);
    const pAV = hartPunt(X, Y, S, 'klepL'), pSL = hartPunt(X, Y, S, 'slR');
    label(ctx, 'hartklep', 'TUSSEN BOEZEM EN KAMER', pAV[0], pAV[1], pAV[0] + 200, pAV[1] + 200, q.on('hartklep', 1), C.goud);
    regel(ctx, 'links twee slippen, rechts drie', 1460, 620, q.on('slippen', 1), C.text2, 30);
    label(ctx, 'halvemaanvormige klep', 'BEGIN AORTA EN LONGSLAGADER', pSL[0], pSL[1], 1300, 300, q.on('halvemaanvormige', 1), C.goud);
    tag(ctx, 'geen spieren: alleen drukverschil', 1480, 840, C.goud, q.on('spieren', 1));
  },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const per = 1.2, ph = (t % per) / per; const g = (c) => Math.exp(-((((ph - c + 1.5) % 1) - 0.5) ** 2) / 0.0015);
    const boem = g(0.59), tak = g(0.885);
    hart(ctx, 620, 560, 0.75, { f: hartFase(ph), hi: { klepAV: boem > 0.3, klepSL: tak > 0.3 } });
    text(ctx, 'boem', 1180, 470, fTitel(110 + 30 * boem), rgba(C.text, 0.45 + 0.55 * boem), 'center'); text(ctx, 'tak', 1560, 470, fTitel(90 + 30 * tak), rgba(C.text, 0.45 + 0.55 * tak), 'center');
    ctx.save(); ctx.globalAlpha *= q.on('eerste', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 1040, 360, 280, 160, 24); ctx.stroke(); ctx.restore();
    vraagteken(ctx, 1180, 680, q.on('denk', 1), 120);
  },

  s15(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 600, S = 0.95;
    const tS = q.at('Trekken'), tO = q.at('halvemaanvormige', 1), tR = q.at('ontspannen'), tK = q.at('klappen'), tE = q.at('hartpauze', 2);
    let u = 0.2; if (t > tS) u = lerp(0.585, 0.62, clamp((t - tS) / 2, 0, 1)); if (t > tO) u = lerp(0.63, 0.75, clamp((t - tO) / 2, 0, 1)); if (t > tR) u = lerp(0.8, 0.87, clamp((t - tR) / 2, 0, 1)); if (t > tK) u = lerp(0.89, 0.93, clamp((t - tK) / 1, 0, 1)); if (t > tE) u = 0.2;
    if (t > q.at('andersom')) u = 0.75;
    const f = hartFase(u); hart(ctx, X, Y, S, { f, stroom: 0.8, t: t * 0.6, peesdraden: 1, hi: { klepAV: t > tS && t < tO, klepSL: t > tO && t < tE } });
    const pB = 8; let pK = f.ven > 0 ? 8 + 117 * f.ven : 5, pA = 80 + 38 * (f.sl ? f.ven : 0); if (t > tR && t < tE) { const k = ramp(t, tR, 2.5); pA = lerp(118, 100, k); pK = lerp(118, 40, k); }
    const meters = [['boezem', pB, TR.rijkL], ['kamer', pK, TR.rijk], ['aorta', pA, '#B5574A']];
    meters.forEach(([lab, v, col], i) => { const x = 1400 + i * 150; roundRect(ctx, x - 34, 200, 68, 420, 14); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); const hh = 410 * v / 130; roundRect(ctx, x - 28, 615 - hh, 56, hh, 10); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); text(ctx, lab, x, 670, fTekst(28, 600), C.text, 'center'); });
    metaText(ctx, 'druk · schematisch', 1550, 170, C.grain, 'center', 24);
    tag(ctx, 'boem', 1550, 760, C.goud, q.on('boem', 1) * (1 - q.on('Peesdraden', 1)));
    tag(ctx, 'peesdraden: klep slaat niet door', 1550, 760, C.text2, q.on('Peesdraden', 1) * (1 - q.on('stijgt', 1)));
    tag(ctx, 'kamer > slagader: klep open', 1550, 760, TR.rijkL, q.on('halvemaanvormige', 1) * (1 - q.on('ontspannen', 1)));
    tag(ctx, 'tak', 1550, 760, C.goud, q.on('tak', 1) * (1 - q.on('hartpauze', 2)));
    if (q.on('hartpauze', 2) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('hartpauze', 2); roundRect(ctx, 1240, 720, 640, 150, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5);
      regel(ctx, 'hartpauze: hartkleppen open, halvemaan dicht', 1270, 778, 1, C.text, 28); regel(ctx, 'systole kamers: andersom', 1270, 830, q.on('andersom', 1), C.text, 28); ctx.restore(); }
  },

  s16(ctx, t, q) { bg(ctx, 'schema'); const X = 700, Y = 580, S = 0.85;
    const per = 60 / 70, u = (t % per) / per; const f = hartFase(u);
    hart(ctx, X, Y, S, { f, peesdraden: 0.3 });
    const p = hartPunt(X, Y, S, 'sinus'); const sn = q.on('sinusknoop', 1);
    if (sn > 0.01) { ctx.save(); ctx.globalAlpha *= sn; const k = Math.exp(-(((u - 0.38 + 1) % 1)) * 6); ctx.fillStyle = TR.signaal; ctx.beginPath(); ctx.arc(p[0], p[1], 14 + 10 * k, 0, 6.283); ctx.fill();
      ctx.strokeStyle = rgba(TR.signaal, 0.7 * (1 - ((u - 0.38 + 1) % 1))); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(p[0], p[1], 40 + 300 * ((u - 0.38 + 1) % 1), 0, 6.283); ctx.stroke(); ctx.restore();
      label(ctx, 'sinusknoop', 'DE GANGMAKER', p[0], p[1], 300, 180, sn, TR.signaal, 'left'); }
    const e = q.on('elektrocardiogram', 1); ecg(ctx, 1180, 230, 660, 260, { a: e, beats: 2, u: 1, cursor: (u + (t % (2 * per) >= per ? 1 : 0)), labels: q.on('top', 1), labelT: false });
    if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e; metaText(ctx, 'ECG · model', 1510, 545, C.grain, 'center', 24); ctx.restore(); }
    tag(ctx, 'P-top: boezems', 1510, 600, TR.signaal, q.on('top', 1) * (1 - q.on('complex', 1)));
    tag(ctx, 'QRS-complex: kamers', 1510, 600, TR.signaal, q.on('complex', 1) * (1 - q.on('zeventig', 1)));
    const hm = q.on('zeventig', 1); if (hm > 0.01) { ctx.save(); ctx.globalAlpha *= hm; roundRect(ctx, 1180, 640, 660, 200, 18); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5);
      regel(ctx, '70 slagen × 70 ml ≈ 5 liter per minuut', 1510, 710, 1, C.text, 34, 'center'); regel(ctx, 'hartminuutvolume', 1510, 780, q.on('hartminuutvolume', 1), C.goud, 36, 'center'); ctx.restore(); }
  },

  s17(ctx, t, q) { bg(ctx, 'schema'); const X = 700, Y = 590, S = 0.85;
    const tB = q.at('bindweefsel'), tAV = q.at('knoop', 2), tH = q.at('His'), tE = q.at('ee-cee-gee') < Infinity ? q.at('ECG') : q.at('ECG');
    const tT = q.at('tandpasta'); const uC = t < tT - 1 ? 0.2 : lerp(0.58, 0.75, clamp((t - tT + 1) / 2.5, 0, 1));
    hart(ctx, X, Y, S, { f: hartFase(uC), peesdraden: 0.2, bind: q.on('bindweefsel', 1) * (1 - q.on('His', 1)) });
    // prikkel volgen
    const sig = (pts, u, al) => { if (al <= 0.01) return; const p = padPunt(pts, clamp(u, 0, 1)); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = TR.signaal; ctx.lineWidth = 5; ctx.beginPath(); const D = gladC(pts); const n = Math.floor(D.length * clamp(u, 0, 1)); D.slice(0, Math.max(2, n)).forEach((q2, i) => i ? ctx.lineTo(q2[0], q2[1]) : ctx.moveTo(q2[0], q2[1])); ctx.stroke(); ctx.fillStyle = TR.signaal; ctx.beginPath(); ctx.arc(p[0], p[1], 12, 0, 6.283); ctx.fill(); ctx.restore(); };
    const P = (k) => hartPunt(X, Y, S, k);
    const route1 = [P('sinus'), [X - 120 * S, Y - 120 * S], [X + 60 * S, Y - 130 * S], [X + 180 * S, Y - 100 * S]];
    const route2 = [P('sinus'), [X - 100 * S, Y - 70 * S], P('avknoop')];
    const route3 = [P('avknoop'), [X, Y + 80 * S], [X + 30 * S, Y + 230 * S], P('apex'), [X + 245 * S, Y + 170 * S], [X + 262 * S, Y]];
    const route4 = [[X + 30 * S, Y + 230 * S], [X - 140 * S, Y + 222 * S], [X - 252 * S, Y + 80 * S], [X - 255 * S, Y - 20 * S]];
    sig(route1, (t - q.at('Vanuit')) / 2, q.on('Vanuit', 1) * (1 - q.on('bindweefsel', 1)));
    sig(route2, (t - tB) / 3, q.on('doorgang', 1) * (1 - q.on('His', 1)));
    if (q.on('knoop', 2) > 0.01) { const p = P('avknoop'); label(ctx, 'AV-knoop', '≈ 0,1 S VERTRAGING', p[0], p[1], 1180, 300, q.on('knoop', 2) * (1 - q.on('tandpasta', 1)), TR.signaal); }
    if (q.on('bindweefsel', 1) > 0.01) { const p = P('bind'); label(ctx, 'laag bindweefsel', 'GELEIDT NIET', p[0] + 120, p[1], 1180, 180, q.on('bindweefsel', 1) * (1 - q.on('knoop', 2)), C.er); }
    sig(route3, (t - tH) / 5, q.on('His', 1) * (1 - q.on('valt', 1))); sig(route4, (t - tH - 2) / 3, q.on('His', 1) * (1 - q.on('valt', 1)));
    if (q.on('His', 1) > 0.01) { const p = [X + 10 * S, Y + 100 * S]; label(ctx, 'bundel van His', '', p[0], p[1], 1180, 520, q.on('His', 1) * (1 - q.on('valt', 1)), TR.signaal); }
    tag(ctx, 'van onder naar boven, als een tube tandpasta', 1450, 820, C.goud, q.on('tandpasta', 1) * (1 - q.on('valt', 1)));
    const ec = q.on('valt', 1); if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec; roundRect(ctx, 1120, 180, 760, 560, 18); shape(ctx, rgba(C.bgSchema, 0.97), C.line, 1.5);
      ecg(ctx, 1170, 230, 660, 300, { beats: 1, labels: 1 });
      regel(ctx, 'P: prikkel over de boezems', 1170, 600, 1, C.text, 30); regel(ctx, 'QRS: prikkel door de kamers', 1170, 645, q.on('complex', 1), C.text, 30); regel(ctx, 'T: herstel van de kamers', 1170, 690, q.on('herstel', 1), C.text, 30); ctx.restore(); }
    tag(ctx, 'zenuwen en adrenaline: sneller of langzamer · zie film 5', 1460, 830, C.paars, q.on('Zenuwen', 1));
  },

  s18(ctx, t, q) { buiten(ctx, t, false);
    person(ctx, 900, 900, 470, 1, { armR: { a1: 0.15, a2: 0.1 }, armL: { a1: 0.15, a2: 0.1 } });
    bonzendHart(ctx, 918, 560, 26, t, 70, 0.8);
    lus(ctx, 1250, 400, 0.45, { labels: 0, a: q.on('dubbele', 1) });
    tag(ctx, 'kleppen: één kant op, op drukverschil', 1480, 760, C.goud, q.on('Kleppen', 1) * (1 - q.on('dikke', 1)));
    tag(ctx, 'linkerkamer: evenveel bloed, hogere druk', 1480, 760, C.goud, q.on('dikke', 1));
  },
};

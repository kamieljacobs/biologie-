// Wat word jij? · Gezondheidswetenschappen 1 · Hoe een epidemie groeit en stopt — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Yasmin, stagiair; Epidemioloog Farid). Decor 'ggd' (kantoor met groot scherm) alleen in de cold open, het begin van H1, het begin van H4 en de recap.
// Rode draad (mutatie 'dossier'): één oefendossier, melding voor melding; per hoofdstuk een laag erbij (pijlen → tijdas en zorglijn → immuunbalk met drempel → model met knop).
// Echte getallen uit 2020 staan altijd op een apart kaartje met bron en jaar; modelcurves dragen 'MODEL'.

// ---------- vaste plekken ----------
const TIJDAS = { x: [300, 620, 940, 1260, 1580], d: [0, 5, 10, 15, 20], n: [10, 20, 40, 80, 160], yb: 780 };
function tijdas(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lijn(ctx, [[180, TIJDAS.yb + 3], [1720, TIJDAS.yb + 3]], C.line, 3);
  TIJDAS.x.forEach((x, i) => { ctx.fillStyle = C.line; ctx.fillRect(x - 1.5, TIJDAS.yb + 3, 3, 12); metaText(ctx, 'DAG ' + TIJDAS.d[i], x, TIJDAS.yb + 46, C.text2, 'center', 24); });
  metaText(ctx, 'MELDINGEN PER DAG', 180, 200, C.text2, 'left', 20); ctx.restore(); }
// stapels van de tijdas; u[i] = 0..1 vullen; getal[i] = alpha van het getal erboven
function tijdStapels(ctx, u, getal = [], o = {}) { TIJDAS.x.forEach((x, i) => { if ((u[i] || 0) <= 0.001) return; const top = stapel(ctx, x, TIJDAS.yb, TIJDAS.n[i], u[i], C.koraal, 1);
  const g = getal[i] == null ? 1 : getal[i]; if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * clamp(u[i] * 3 - 2, 0, 1); text(ctx, String(TIJDAS.n[i]), x, stapelTop(TIJDAS.yb, TIJDAS.n[i]) - 18, fTekst(40, 800), C.text, 'center'); ctx.restore(); } }); }
const stapelY = (i) => stapelTop(TIJDAS.yb, TIJDAS.n[i]);
// ×2-boogje tussen twee stapels
function keer2(ctx, i, a = 1) { if (a <= 0.01) return; const x1 = TIJDAS.x[i] + 30, x2 = TIJDAS.x[i + 1] - 30, y1 = stapelY(i) - 70, y2 = stapelY(i + 1) - 70, ym = Math.min(y1, y2) - 40;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, ym, x2 - 6, y2 - 4); ctx.stroke(); pijl(ctx, x2 - 20, y2 - 18, x2 - 6, y2 - 4, C.goud, 1, 3.5, 14);
  text(ctx, '× 2', (x1 + x2) / 2, ym + 4, fTekst(34, 800), C.goud, 'center'); ctx.restore(); }

// grafieken (oefenstad van 100.000 inwoners; MODEL)
const G1 = { x: 150, y: 270, w: 760, h: 460, dagen: 100 }, G2 = { x: 1010, y: 270, w: 760, h: 460, dagen: 100 }, GG = { x: 160, y: 240, w: 1120, h: 520, dagen: 100 };
const MAX25 = 6300, IC = 2400;
function grafTitel(ctx, g, s2, a = 1, col = C.text) { metaA(ctx, s2, g.x + g.w, g.y - 16, a, col, 'right', 20); }
function maatTot(t0, t, dur) { return clamp((t - t0) / dur, 0, 1) * 100; }

// Yasmin en Farid in het kantoor (decorcoördinaten)
function duo(ctx, t, o = {}) { const ry = persoon(ctx, 'yasmin', o.yx || 560, GROND, 450, { t, kijk: 1, uit: o.uitY || 'blij', pose: o.poseY || 'staan', a: o.aY == null ? 1 : o.aY });
  const rf = persoon(ctx, 'farid', o.fx || 1420, GROND, 450, { t, kijk: -1, uit: o.uitF || 'blij', pose: o.poseF || 'staan', outfit: 'kantoor', a: o.aF == null ? 1 : o.aF }); badge(ctx, rf, '#F2F2EE', o.aF == null ? 1 : o.aF); badge(ctx, ry, '#F2F2EE', o.aY == null ? 1 : o.aY); return { ry, rf }; }

// mini-dossier (recap, op het scherm): stapel, drempel, balk
function miniDossier(ctx, t) { vel(ctx, 1); const run = RUN.r3(), g = { x: 200, y: 200, w: 1200, h: 380, dagen: 100, max: 8700 };
  grafBalkjes(ctx, g, run, 100, C.koraal, 1); const kd = kruisDag(run, 2 / 3), kx = g.x + kd * g.w / g.dagen; stippel(ctx, kx, g.y, kx, g.y + g.h, C.goud, 1, 5);
  balkImmuun(ctx, 200, 680, 1200, 1 - run[99].S, 1, { drempel: 2 / 3, door: 1 }); bakVorm(ctx, 1500, 300, 120, 90, C.teal); bakVorm(ctx, 1500, 450, 120, 90, C.koraal); bakVorm(ctx, 1500, 600, 120, 90, C.groen); knop(ctx, 1680, 480, 40, 0.5, 1, ''); }

Object.assign(SCENES, {
  title(ctx, t) { const run = RUN.vrij25(), g = { x: 1080, y: 450, w: 700, h: 330, dagen: 50, max: MAX25 }; grafBalkjes(ctx, g, run, clamp(t * 18, 0, 50), C.koraal, 1);
    lijn(ctx, [[g.x, g.y + g.h + 2], [g.x + g.w, g.y + g.h + 2]], C.line, 2); metaText(ctx, 'ÉÉN BLOKJE = MELDINGEN VAN ÉÉN DAG · MODEL', g.x + g.w, g.y + g.h + 40, C.text2, 'right', 20); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const tD = q.at('dossier', 1), tB = q.at('blokje', 1), tO = q.at('oefent', 1), tT = q.at('torenhoog', 1), Z = ramp(t, tD - 0.3, 1.1), P = 1 - clamp(Z * 3, 0, 1);
    const tijd = (d, i) => lerp(tO + 0.4, tT, Math.pow(d / KOUD.dagen, 0.75)) + i * 0.004;
    kantoor(ctx, Z, (c) => { const r = duo(c, t, { uitY: 'blij', poseF: 'wijsOmhoog', poseY: 'staan', aY: P, aF: P });
        naamBij(c, 'Yasmin', 'STAGIAIR', 560, 360, P, 'center'); naamBij(c, 'Epidemioloog Farid', 'GGD', 1420, 350, P, 'center'); },
      (c) => { vel(c, q.on('dossier', 1, 0.5)); koudCurve(c, tijd, t, 1, (j) => j === 0);
        const Bb = ramp(t, tB - 0.1, 0.3), u = ease(ramp(t, tB + 0.6, 0.9)), [px, py] = koudPos(0, 0); blokje(c, lerp(840, px, u), lerp(420, py, u), lerp(240, KOUD.bw, u), lerp(120, KOUD.bh, u), C.koraal, Bb, u < 0.5);
        metaA(c, 'ÉÉN BLOKJE = ÉÉN MELDING', 1770, 172, ramp(t, q.at('melding', 1), 0.4) * (1 - q.on('Waarom', 1)), C.text2, 'right', 22);
        laag(c, q.on('Waarom', 1) * 1, () => { roundRect(c, 180, 250, 720, 270, 18); shape(c, rgba('#0D1420', 0.92), rgba(C.goud, 0.85), 2.5);
          text(c, 'Waarom zo snel?', 250, 340, fTekst(52, 800), C.text, 'left'); laag(c, q.on('waarom', 2, 0.4), () => text(c, 'Waarom stopt het?', 250, 440, fTekst(52, 800), C.text, 'left')); vraagteken(c, 820, 430, 1, 110); }); }); },

  // ---------- H1 Het reproductiegetal R ----------
  s03(ctx, t, q) { const Z = ramp(t, q.at('Farid', 1) - 0.3, 1.4), P = clamp((t - q.at('pijlen', 1)) / 3, 0, 1), Pm = 1 - clamp(Z * 3, 0, 1);
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'neutraal', aY: Pm, aF: Pm }); },
      (c) => { dossierKop(c, 1); netwerk(c, { u: 1, p: P, doelA: 1 }); metaA(c, 'BRON- EN CONTACTONDERZOEK', 120, 140, q.on('contactonderzoek', 1, 0.4) * 1, C.goud, 'left', 26); });
    laag(ctx, ramp(t, q.at('Farid', 1) + 1.0, 0.3), () => persoon(ctx, 'farid', 300, 862, 360, { t, kijk: 1, pose: 'wijs', outfit: 'kantoor', uit: 'blij' })); },

  s04(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); metaA(ctx, 'BRON- EN CONTACTONDERZOEK', 120, 140, 1 - q.on('Tel', 1), C.goud, 'left', 26);
    const tTel = q.at('Tel', 1), tel = clamp((t - tTel) / 2.4, 0, 1) * 4, hl = tel > 0.01 && tel < 4 ? Math.floor(tel) : -1; netwerk(ctx, { u: 1, p: 1, tel, hl });
    const x0 = 1180, G = q.on('gemiddelde', 1), R = q.on('reproductiegetal', 1);
    laag(ctx, G, () => { metaText(ctx, 'GEMIDDELD PER ZIEKE', x0, 220, C.text2, 'left', 22); text(ctx, '(2 + 3 + 1 + 4) : 4', x0, 300, fTekst(48, 700), C.text, 'left'); });
    laag(ctx, R, () => { text(ctx, 'R = 2,5', x0, 400, fTitel(84), C.goud, 'left'); metaText(ctx, 'IN DIT OEFENDOSSIER', x0 + 330, 395, C.text2, 'left', 20); });
    laag(ctx, q.on('zegt', 1), () => { text(ctx, 'R = gemiddeld aantal mensen', x0, 490, fTekst(38, 700), C.text, 'left'); text(ctx, 'dat één zieke besmet', x0, 536, fTekst(38, 700), C.text, 'left'); });
    tag(ctx, 'R₀ = R als nog niemand immuun is', x0, 640, C.teal, q.on('nul', 1), 'left', 32);
    echtKaart(ctx, x0, 690, 600, 'CORONA · 2020', ['R₀ ≈ 2 à 3'], 'SCHATTINGEN VERSCHILLEN PER STUDIE', q.on('coronavirus', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const ry = persoon(ctx, 'yasmin', 420, 860, 420, { t, kijk: 1, uit: q.on('telt', 1) > 0.5 ? 'blij' : 'neutraal', pose: q.on('telt', 1) > 0.5 && q.on('Stel', 1) < 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Yasmin', '', 420, 410, 1 - q.on('telt', 1), 'center');
    // tientallen contacten om haar heen: bus, klas, training
    const grp = [['bus', 160, 300, 'bus'], ['klas', 160, 590, 'klas'], ['training', 690, 450, 'training']]; const T = q.on('telt', 1, 0.5);
    grp.forEach(([naam, gx, gy, cue], k) => { const L = q.on(cue, 1); for (let i = 0; i < 12; i++) { const x = gx + (i % 4) * 40 - (k === 2 ? 0 : 0), y = gy + Math.floor(i / 4) * 54; popje(ctx, x, y, 13, C.teal, L); } chip(ctx, naam, gx + 60, gy - 46, C.goud, L, 26); });
    metaA(ctx, 'AL GAUW TIENTALLEN', 470, 250, q.on('tientallen', 1), C.goud, 'center', 22);
    const sx = 1000, sw = 820; metaA(ctx, 'R HANGT VOORAL AF VAN', sx, 180, 1, C.text2, 'left', 22);
    const rij = [['contacten per dag', 'contacten', 1, '10', 'tien', 2, 10 / 30], ['kans per contact', 'kans', 1, '1/20', 'twintig', 1, 0.35], ['dagen besmettelijk', 'dagen', 1, '5', 'vijf', 1, 5 / 10]];
    rij.forEach(([naam, cue, n, w, cueW, nW, fr], i) => { const a = q.on(cue, n), v = q.on(cueW, nW); schuif(ctx, sx, 210 + i * 150, sw, naam, v > 0.5 ? w : '', fr * v, lerp(0.35, 1, a), C.goud); });
    laag(ctx, q.on('Stel', 1), () => { text(ctx, '10 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); laag(ctx, q.on('twee', 1), () => text(ctx, '2,5', sx + 400, 744, fTitel(72), C.goud, 'left')); metaText(ctx, 'REKENVOORBEELD', sx, 800, C.text2, 'left', 22); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Stel', 1, 1);
    herinnering(ctx, t, 1, lerp(1, 0.52, S), lerp(0, -112, S), lerp(0, 122, S));
    laag(ctx, S, () => { const sx = 1000, sw = 820; const H = q.on('helft', 1, 1); metaText(ctx, 'R HANGT VOORAL AF VAN', sx, 180, C.text2, 'left', 22);
      schuif(ctx, sx, 210, sw, 'contacten per dag', H > 0.5 ? '5' : '10', lerp(10 / 30, 5 / 30, H), 1, C.oker, { rand: C.oker, waardeKleur: C.oker });
      schuif(ctx, sx, 360, sw, 'kans per contact', '1/20', 0.35, 0.55, C.goud); schuif(ctx, sx, 510, sw, 'dagen besmettelijk', '5', 0.5, 0.55, C.goud);
      laag(ctx, H, () => { text(ctx, '5 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); text(ctx, 'R = ?', sx + 400, 744, fTitel(72), C.goud, 'left'); });
      metaA(ctx, 'HALF ZOVEEL CONTACTEN', sx + sw, 196, H, C.oker, 'right', 20); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('gewone', 1), A = 1 - ramp(t, tG - 0.4, 0.5), B = ramp(t, tG - 0.4, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord b: R wordt ook ongeveer de helft', 1); const sx = 1000, sw = 820;
      schuif(ctx, sx, 210, sw, 'contacten per dag', '5', 5 / 30, 1, C.oker, { rand: C.oker, waardeKleur: C.oker }); schuif(ctx, sx, 360, sw, 'kans per contact', '1/20', 0.35, 0.55, C.goud); schuif(ctx, sx, 510, sw, 'dagen besmettelijk', '5', 0.5, 0.55, C.goud);
      text(ctx, '5 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); const V = q.on('komma', 1, 0.3); laag(ctx, 1 - V, () => text(ctx, 'R = ?', sx + 400, 744, fTitel(72), C.goud, 'left')); laag(ctx, V, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(sx + 390, 670, 420, 90); text(ctx, '1,25', sx + 400, 744, fTitel(72), C.goud, 'left'); metaText(ctx, 'WAS 2,5', sx + 630, 740, C.text2, 'left', 22); });
      const E = q.on('eigenschap', 1), O = q.on('omgaan', 1); virusIcoon(ctx, 280, 470, 62, E, t); naamBij(ctx, 'het virus', '', 280, 610, E, 'center', C.paars);
      laag(ctx, O, () => text(ctx, '+', 470, 490, fTitel(80), C.text, 'center')); laag(ctx, O, () => { for (let i = 0; i < 6; i++) popje(ctx, 600 + (i % 3) * 70 + (q.on('mee', 1) * (i % 3 - 1) * 26), 430 + Math.floor(i / 3) * 80, 18, C.oker, 1); }); naamBij(ctx, 'wat mensen doen', '', 670, 610, O, 'center', C.oker);
      metaA(ctx, 'R HANGT AF VAN', 120, 320, E, C.text2, 'left', 22); });
    laag(ctx, B, () => { const yb = 790, k = 30, xs = [520, 960, 1400], bw = 200; metaText(ctx, 'R₀ OF R · SCHATTINGEN · VUISTREGELS', 120, 200, C.text2, 'left', 22); metaText(ctx, 'BRONNEN: BIGGERSTAFF E.A. 2014 · CHOWELL E.A. 2008 (GRIEP) · LIU E.A. 2020, RIVM 2020 (CORONA) · LCI/RIVM (MAZELEN)', 960, 846, C.text2, 'center', 18);
      lijn(ctx, [[260, yb], [1680, yb]], C.line, 2); for (let v = 0; v <= 18; v += 6) { const y = yb - v * k; ctx.fillStyle = C.line; ctx.fillRect(250, y - 1, 10, 2); metaText(ctx, String(v), 236, y + 8, C.text2, 'right', 22); }
      const staaf = (x, lo, hi, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - bw / 2, yb - lo * k, bw, lo * k, 6); shape(ctx, rgba(col, 0.75), col, 2); if (hi > lo) { roundRect(ctx, x - bw / 2, yb - hi * k, bw, (hi - lo) * k, 6); ctx.setLineDash([8, 6]); shape(ctx, rgba(col, 0.25), col, 2); ctx.setLineDash([]); } ctx.restore(); };
      const Gp = q.on('griep', 1), M = q.on('mazelen', 1);
      staaf(xs[0], 1.3, 1.3, C.teal, Gp); naamBij(ctx, 'seizoensgriep ≈ 1,3', 'VEEL MENSEN AL DEELS IMMUUN', xs[0], yb - 1.3 * k - 42, Gp, 'center');
      staaf(xs[1], 2, 3, C.koraal, 1); naamBij(ctx, 'corona 2020 ≈ 2–3', 'R₀', xs[1], yb - 3 * k - 46, 1, 'center');
      staaf(xs[2], 12, 18, C.koraal, M); naamBij(ctx, 'mazelen: vaak 12–18', 'R₀', xs[2] + 130, yb - 18 * k + 24, M, 'left'); }); },

  // ---------- H2 Exponentiële groei en de curve afvlakken ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); tijdas(ctx, 1);
    const N = clamp((t - q.at('nul', 1)) / 1.2, 0, 1), V = clamp((t - q.at('twintig', 1)) / 1.4, 0, 1); tijdStapels(ctx, [N, V]);
    const H = q.on('Hoeveel', 1); [2, 3, 4].forEach(i => { laag(ctx, H, () => { const x = TIJDAS.x[i]; roundRect(ctx, x - 60, TIJDAS.yb - 150, 120, 150, 10); ctx.setLineDash([10, 8]); ctx.strokeStyle = i === 4 ? C.goud : C.line; ctx.lineWidth = i === 4 ? 3 : 2; ctx.stroke(); ctx.setLineDash([]); text(ctx, '?', x, TIJDAS.yb - 55, fTitel(64), i === 4 ? C.goud : C.text2, 'center'); }); });
    tag(ctx, 'R blijft hetzelfde', 620, 420, C.text2, q.on('blijft', 1), 'center', 30);
    persoon(ctx, 'farid', 1800, 860, 340, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'blij' }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); tijdas(ctx, 1); antwoord(ctx, 'antwoord c: ongeveer 160, elke vijf dagen keer twee', 1 - q.on('RIVM', 1));
    const f = (cue, d) => clamp((t - q.at(cue, 1)) / d, 0, 1); const u = [1, 1, f('veertig', 0.8), f('tachtig', 1.0), f('honderdzestig', 1.4)]; tijdStapels(ctx, u);
    [0, 1, 2, 3].forEach(i => keer2(ctx, i, clamp(u[i + 1] * 2 - 1, 0, 1) * q.on('verdubbelt', 1)));
    // lineair: elke 5 dagen 10 erbij → 10, 20, 30, 40, 50 (stippellijn langs de toppen)
    const L = q.on('tien', 1, 0.8); if (L > 0.01) { const pts = TIJDAS.x.map((x, i) => [x, stapelTop(TIJDAS.yb, 10 + i * 10)]); ctx.save(); ctx.globalAlpha *= L; ctx.setLineDash([12, 9]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
      pts.slice(2).forEach(p => circ(ctx, p[0], p[1], 7, rgba(C.text2, L), null)); naamBij(ctx, '- - -  elke 5 dagen 10 erbij', 'ZO GAAT HET NIET', 180, 300, L * (1 - q.on('RIVM', 1)), 'left', C.text2); }
    tag(ctx, 'exponentiële groei', 980, 300, C.goud, q.on('exponentiële', 1) * (1 - q.on('RIVM', 1)), 'center', 34);
    tag(ctx, 'verdubbeltijd: 5 dagen', 460, 500, C.goud, q.on('verdubbeltijd', 1), 'center', 30);
    filmKaartje(ctx, 570, 340, 'Plek genoeg?', q.on('exponentiële', 1) * (1 - q.on('RIVM', 1)), 300);
    echtKaart(ctx, 300, 250, 700, 'MAART 2020 · RIVM', ['verdubbeling ± elke 5 à 6 dagen'], 'SCHATTING RIVM, TECHNISCHE BRIEFINGS 2020', q.on('RIVM', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); tijdas(ctx, 1); tijdStapels(ctx, [1, 1, 1, 1, 1], [0.5, 0.5, 0.5, 0.5, 0.5]);
    const yL = TIJDAS.yb - 25 * 13, u = clamp((t - q.at('lijn', 1)) / 1.6, 0, 1); laag(ctx, u > 0 ? 1 : 0, () => { ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.setLineDash([16, 9]); ctx.beginPath(); ctx.moveTo(180, yL); ctx.lineTo(lerp(180, 1660, ease(u)), yL); ctx.stroke(); ctx.restore(); });
    naamBij(ctx, 'wat de zorg aankan', 'OEFENDOSSIER · ZONDER GETAL', 440, yL + 50, q.on('zorg', 1), 'left', C.text);
    persoon(ctx, 'farid', 1800, 860, 340, { t, kijk: -1, pose: u > 0 && u < 1 ? 'wijs' : 'staan', outfit: 'kantoor', uit: 'neutraal' });
    const E = q.on('Normaal', 1); echtKaart(ctx, 300, 196, 1000, 'IC IN NEDERLAND · VOORJAAR 2020', [['normaal: ± 1150 ic-bedden', 1], ['piek, 7 april: 1424 coronapatiënten op de ic', q.on('veertienhonderd', 1)], ['opgeschaald naar ± 2400 bedden (5 april)', q.on('vierentwintighonderd', 1)]], 'LCPS · VWS · NVIC, 2020', E, { lh: 46 }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g1 = Object.assign({ max: MAX25 }, G1), g2 = Object.assign({ max: MAX25 }, G2);
    grafAssen(ctx, g1, 1); grafBalkjes(ctx, g1, RUN.vrij25(), 100, C.koraal, 1); icLijn(ctx, g1, IC, 1); grafTitel(ctx, g1, 'ZONDER MAATREGELEN · MODEL', 1);
    const M = q.on('maatregelen', 1), V = q.on('tweede', 1); laag(ctx, V, () => { grafAssen(ctx, g2, 1); icLijn(ctx, g2, IC, 1); grafTitel(ctx, g2, 'MET MAATREGELEN · MODEL', 1, C.oker); });
    grafBalkjes(ctx, g2, RUN.maat25(), maatTot(q.at('tekent', 1), t, 2.3), C.koraal, V, { rand: C.oker });
    metaA(ctx, 'MAATREGELEN HALF MAART 2020', 1010, 210, M * (1 - V), C.oker, 'left', 22);
    laag(ctx, q.on('afvlakken', 1), () => { tag(ctx, 'afvlakken?', 1390, 200, C.goud, 1, 'center', 32); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de zieken komen niet allemaal tegelijk', 1 - q.on('RIVM', 1) * 0.0);
    const S = ease(clamp((t - 0.3) / 1.6, 0, 1)), g1 = { max: MAX25, x: lerp(G1.x, GG.x, S), y: lerp(G1.y, GG.y, S), w: lerp(G1.w, GG.w, S), h: lerp(G1.h, GG.h, S), dagen: 100 }, g2 = { max: MAX25, x: lerp(G2.x, GG.x, S), y: lerp(G2.y, GG.y, S), w: lerp(G2.w, GG.w, S), h: lerp(G2.h, GG.h, S), dagen: 100 };
    grafAssen(ctx, g2, 1); grafAssen(ctx, g1, 1 - S); grafBalkjes(ctx, g1, RUN.vrij25(), 100, C.koraal, 1 - S * 0.65, { omlijn: S > 0.5 }); grafBalkjes(ctx, g2, RUN.maat25(), 100, C.koraal, 1, { rand: C.oker }); icLijn(ctx, g2, IC, 1); if (S < 0.99) icLijn(ctx, g1, IC, 1 - S, 1, false);
    grafTitel(ctx, g2, 'MODEL · STIPPEL = ZONDER MAATREGELEN', S);
    const r1 = RUN.vrij25(), r2 = RUN.maat25(), p1 = grafPt(GG, Object.assign(r1), grafPiek(r1)), p2 = grafPt(GG, r2, grafPiek(r2)); const gg = Object.assign({ max: MAX25 }, GG);
    const q1 = grafPt(gg, r1, grafPiek(r1)), q2 = grafPt(gg, r2, grafPiek(r2)); const L = q.on('lager', 1), La = q.on('later', 1);
    laag(ctx, L * S, () => { pijl(ctx, q1[0] + 40, q1[1] + 10, q1[0] + 40, q2[1] - 20, C.goud, 1, 5, 18); text(ctx, 'lager', q1[0] + 64, (q1[1] + q2[1]) / 2, fTekst(36, 700), C.goud, 'left'); });
    laag(ctx, La * S, () => { pijl(ctx, q1[0] + 40, q2[1] - 26, q2[0] - 10, q2[1] - 26, C.goud, 1, 5, 18); text(ctx, 'later', q2[0] + 14, q2[1] - 12, fTekst(36, 700), C.goud, 'left'); });
    const R = q.on('RIVM', 1), E1 = q.on('één', 1, 1.0), E2 = q.on('eronder', 1, 1.0), Rv = lerp(2.5, 1, E1) - 0.2 * E2;
    rMeter(ctx, 1590, 450, 140, Rv, R, { kop: 'R IN NEDERLAND · VOORJAAR 2020', bron: 'SCHATTING RIVM, 2020', onder: 'NA DE MAATREGELEN VAN HALF MAART', tekst: E2 > 0.5 ? 'daarna onder de 1' : E1 > 0.5 ? 'rond de 1' : 'begin: ± 2 à 3', tekstKleur: E2 > 0.5 ? C.groen : C.text });
    tag(ctx, 'R < 1: dooft langzaam uit', 1590, 820, C.groen, q.on('dooft', 1), 'center', 30); },

  s16(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g = { x: 160, y: 300, w: 1200, h: 440, dagen: 60, max: 2100 }, run = RUN.maat25(), nu = 48, wacht = 14;
    grafAssen(ctx, g, 1, { stap: 10, yl: 'MELDINGEN PER DAG' }); const J = clamp((t - q.at('week', 1) - 0.3) / 1.5, 0, 1);
    grafBalkjes(ctx, g, run, nu - wacht, C.koraal, 1); const run2 = run.slice(0, nu); const bw = g.w / g.dagen;
    for (let d = nu - wacht; d < nu; d++) { const bh = run[d].nieuw * 1e5 / g.max * g.h; const lowH = bh * (0.15 + 0.85 * clamp(J * 1.4 - (d - nu + wacht) / wacht * 0.4, 0, 1)) * (J > 0 ? 1 : 0.15 + 0.6 * Math.pow((nu - d) / wacht, 2)); blokLeeg(ctx, g.x + d * bw + 1, g.y + g.h - bh, bw - 2, bh, 1, C.line); if (lowH > 1) blokje(ctx, g.x + d * bw + 1, g.y + g.h - lowH, bw - 2, lowH, C.koraal, 1); }
    const xn = g.x + nu * bw; lijn(ctx, [[xn, g.y - 20], [xn, g.y + g.h]], C.goud, 3); metaText(ctx, 'VANDAAG', xn, g.y - 30, C.goud, 'center', 22);
    naamBij(ctx, 'nog niet gemeld', 'NOG NIET IN DE TELLING', xn + 18, g.y + 160, q.on('gemeld', 1) * (1 - J), 'left', C.text2);
    const k = [['besmet', 'besmet', 380], ['ziek', 'ziek', 640], ['gemeld', 'gemeld', 900]]; k.forEach(([s2, cue, x], i) => { chip(ctx, s2, x, 210, i ? C.text2 : C.koraal, q.on(cue, 1), 30); if (i) pijl(ctx, x - 200, 200, x - 80, 200, C.line, q.on(cue, 1), 3, 14); });
    tag(ctx, 'twee weken later', 640, 290, C.goud, J, 'center', 30); naamBij(ctx, 'R van vandaag', 'PAS NA ± 2 WEKEN TE SCHATTEN', xn + 18, g.y + 40, q.on('hoog', 1), 'left', C.goud);
    persoon(ctx, 'farid', 1700, 860, 360, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'blij' }); },

  // ---------- H3 Groepsimmuniteit ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const run = RUN.r3(), g = { x: 160, y: 230, w: 1000, h: 300, dagen: 100, max: 8700 }, tot = 12;
    grafAssen(ctx, g, 1); grafBalkjes(ctx, g, run, tot, C.koraal, 1); grafTitel(ctx, g, 'MODEL · R₀ = 3', q.on('drie', 1));
    const B = q.on('balk', 1, 0.8), fr = 1 - run[tot].S; balkImmuun(ctx, 160, 640, 1000, fr, B, { streep: [[1 / 3, q.on('Welk', 1)], [2 / 3, q.on('Welk', 1)], [1, q.on('Welk', 1)]] });
    metaA(ctx, 'IMMUUN · NA BESMETTING OF VACCIN', 160, 615, B * q.on('besmetting', 1), C.groen, 'left', 22); metaA(ctx, 'IMMUUN', 160, 615, B * (1 - q.on('besmetting', 1)), C.groen, 'left', 22);
    naamBij(ctx, 'vatbaar', 'NOG NIET IMMUUN', 1160, 740, q.on('vatbaar', 1), 'right', C.teal); metaA(ctx, '0 %', 160, 740, B, C.text2, 'left', 22);
    // één zieke, drie mensen die hij zou aansteken
    const D = q.on('drie', 1), x0 = 1330, y0 = 470; laag(ctx, D, () => { popje(ctx, x0, y0, 30, C.koraal, 1); [[1620, 300], [1660, 470], [1620, 640]].forEach(([x, y]) => { pijl(ctx, x0 + 40, y0 - 20, x - 40, y - 20, C.oker, 1, 4, 14); popje(ctx, x, y, 26, C.teal, 1); }); text(ctx, 'R₀ = 3', x0, y0 + 100, fTekst(44, 800), C.goud, 'center'); });
    vraagteken(ctx, 1500, 840, q.on('denk', 1), 90); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer twee derde', 1);
    const x0 = 320, y0 = 420, doel = [[620, 270], [660, 420], [620, 570]], T = q.on('twee', 1, 0.8), K = q.on('niet', 1);
    popje(ctx, x0, y0, 30, C.koraal, 1); doel.forEach(([x, y], i) => { const imm = i < 2 ? T : 0; pijl(ctx, x0 + 40, y0 - 20, lerp(x0 + 40, x - 40, i < 2 ? 1 - 0.55 * T : 1), lerp(y0 - 20, y - 20, i < 2 ? 1 - 0.55 * T : 1), C.oker, i < 2 ? 1 - 0.7 * T : 1, 4, 14); if (i < 2) kruis(ctx, (x0 + x) / 2 + 30, (y0 + y) / 2 - 20, 14, T * 0.9); popje(ctx, x, y, 26, imm > 0.5 ? C.groen : C.teal, 1); });
    naamBij(ctx, 'immuun', '', 720, 340, T, 'left', C.groen); laag(ctx, T * (1 - q.on('iets', 1)), () => text(ctx, 'R = 1', x0, y0 + 100, fTekst(44, 800), C.goud, 'center')); laag(ctx, q.on('iets', 1), () => text(ctx, 'R < 1', x0, y0 + 100, fTekst(44, 800), C.groen, 'center'));
    laag(ctx, K, () => { circ(ctx, 620, 545, 46, null, C.goud, 3); naamBij(ctx, 'niet immuun', 'LOOPT DAN MINDER KANS', 684, 520, 1, 'left', C.teal); });
    const fx = 1080, S1 = q.on('som', 1), S2 = q.on('min', 2, 0.4), S3 = q.on('twee', 2, 0.4);
    laag(ctx, S1, () => { metaText(ctx, 'DREMPEL', fx, 230, C.text2, 'left', 22); text(ctx, '1 − 1/R₀', fx, 310, fTitel(64), C.text, 'left'); });
    laag(ctx, S2, () => text(ctx, '= 1 − 1/3', fx + 330, 310, fTitel(64), C.text, 'left')); laag(ctx, S3, () => text(ctx, '= 2/3 ≈ 67 %', fx, 410, fTitel(72), C.goud, 'left'));
    const bx = 200, bw = 1200; const G = q.on('groepsimmuniteit', 1);
    laag(ctx, S3, () => { metaText(ctx, 'R₀ = 3', bx, 610, C.text2, 'left', 22); balkImmuun(ctx, bx, 630, bw, 2 / 3, 1, { drempel: 2 / 3 }); text(ctx, '67 %', bx + bw * 2 / 3, 720, fTekst(32, 800), C.goud, 'center'); });
    tag(ctx, 'groepsimmuniteit', 1300, 580, C.groen, G, 'center', 32);
    const M = q.on('mazelen', 1), M2 = q.on('vijfennegentig', 1); laag(ctx, M, () => { metaText(ctx, 'MAZELEN · R₀ VAAK 12–18', bx, 770, C.text2, 'left', 22); balkImmuun(ctx, bx, 790, bw, 0.95 * M2, 1, { drempel: 0.95, dA: M2 }); laag(ctx, M2, () => text(ctx, '± 95 %', bx + bw + 24, 828, fTekst(32, 800), C.goud, 'left')); });
    filmKaartje(ctx, 1080, 440, 'Vaccins, allergie en bloedgroepen', M, 520);
    metaA(ctx, 'VUISTREGEL · IN HET ECHT GEEN WILLEKEURIGE MENGING', 120, 206, q.on('vuistregel', 1), C.grain, 'left', 20); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const run = RUN.r3(), g = { x: 160, y: 230, w: 1400, h: 400, dagen: 100, max: 8700 };
    metaText(ctx, 'MODEL · R₀ = 3 · GEEN MAATREGELEN', 160, 150, C.grain, 'left', 24); grafAssen(ctx, g, 1);
    const N = q.on('niemand', 1), tot = 6 + 7 * clamp((t - q.at('niemand', 1)) / 4, 0, 1); grafBalkjes(ctx, g, run, tot, C.koraal, 1);
    const D = clamp((t - q.at('tekent', 1)) / 1.2, 0, 1); balkImmuun(ctx, 160, 730, 1400, 1 - run[Math.floor(tot)].S, 1, { drempel: 2 / 3, dA: D > 0 ? 1 : 0 });
    if (D > 0 && D < 1) { ctx.save(); ctx.fillStyle = C.goud; ctx.fillRect(160 + 1400 * 2 / 3 - 4, 712, 8, 82 * D); ctx.restore(); }
    metaText(ctx, 'OOIT BESMET (IMMUUN OF NU ZIEK)', 160, 710, C.grain, 'left', 22); naamBij(ctx, 'drempel', '2/3', 160 + 1400 * 2 / 3, 840, D, 'center', C.goud);
    vraagteken(ctx, 1200, 420, q.on('voorbij', 1), 110);
    persoon(ctx, 'farid', 1770, 860, 360, { t, kijk: -1, pose: D > 0 && D < 1 ? 'wijs' : 'staan', outfit: 'kantoor', uit: 'neutraal' }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: zieken vinden te weinig vatbare mensen', 1 - q.on('gouden', 1)); const run = RUN.r3(), g = { x: 160, y: 230, w: 1400, h: 400, dagen: 100, max: 8700 };
    metaA(ctx, 'MODEL · R₀ = 3 · GEEN MAATREGELEN', 160, 150, q.on('gouden', 1), C.grain, 'left', 24); grafAssen(ctx, g, 1);
    const kd = kruisDag(run, 2 / 3), tG = q.at('gouden', 1), tD = q.at('schiet', 1); const tE = q.at('één', 1); let tot = t < tE ? lerp(13, kd + 1, clamp(t / (tE - 0.2), 0, 1)) : lerp(kd + 1, 100, clamp((t - tE) / Math.max(1, tD - tE), 0, 1));
    grafBalkjes(ctx, g, run, tot, C.koraal, 1); const d = Math.min(99, Math.floor(tot)), fr = 1 - run[d].S;
    const Reff = 3 * run[d].S; chip(ctx, 'R nu ≈ ' + (Math.round(Reff * 10) / 10).toString().replace('.', ','), 1440, 300, Reff < 1 ? C.groen : C.koraal, q.on('zakt', 1, 0.4), 32);
    let kI = 0; run.forEach((r, i) => { if (r.I > run[kI].I) kI = i; }); const Imax = run[kI].I, iy = (i) => g.y + g.h - run[i].I / Imax * g.h * 0.92, ix = (i) => g.x + (i + 0.5) * g.w / g.dagen;
    ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= Math.min(99, Math.floor(tot)); i++) { i ? ctx.lineTo(ix(i), iy(i)) : ctx.moveTo(ix(i), iy(i)); } ctx.stroke(); ctx.restore();
    naamBij(ctx, 'tegelijk ziek', 'MODEL', ix(kI) + 60, iy(kI) + 40, clamp((tot - kI - 4) / 3, 0, 1), 'left', C.text); naamBij(ctx, 'nieuwe zieken per dag', '', ix(kI) + 60, g.y + g.h - 120, clamp((tot - kI - 4) / 3, 0, 1), 'left', C.koraal);
    const kx = ix(kI), K = tot >= kI ? 1 : 0; stippel(ctx, kx, g.y - 10, kx, g.y + g.h, C.goud, K, 4); tag(ctx, 'VANAF HIER MINDER MENSEN TEGELIJK ZIEK', kx + 20, g.y + 10, C.goud, K, 'left', 26);
    balkImmuun(ctx, 160, 730, 1400, fr, 1, { drempel: 2 / 3, door: q.on('schiet', 1) }); metaText(ctx, 'OOIT BESMET (IMMUUN OF NU ZIEK)', 160, 710, C.grain, 'left', 22);
    naamBij(ctx, 'doorschieten', '', 160 + 1400 * 0.8, 836, q.on('schiet', 1), 'center', C.text);
    naamBij(ctx, 'model: ± 94 %', 'UITEINDELIJK', 1590, 756, q.on('negen', 1), 'left', C.groen);  },

  // ---------- H4 Maatregelen doorrekenen met een model ----------
  s23(ctx, t, q) { const tM = q.at('model', 1), Z = ramp(t, tM - 0.3, 1.5), Bk = ramp(t, tM + 0.4, 0.8);
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'blij' }); naamBij(c, 'dossier', 'WAT ER GEBEURD IS', SCR.x + SCR.w / 2 - 60, SCR.y + SCR.h + 52, q.on('dossier', 1) * (1 - Z), 'center'); },
      (c) => { laag(c, 1 - Bk, () => miniDossier(c, t)); laag(c, Bk, () => { const st = { S: 0.55, I: 0.2, R: 0.25 }; modelBakken(c, st, [q.on('vatbaar', 1), q.on('besmettelijk', 1), q.on('hersteld', 1)], t, q.on('schuiven', 1));
        metaText(c, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22); }); });
  },

  s24(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22); const H = q.on('helft', 1, 0.8);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1);
    knop(ctx, 360, 590, 64, lerp(1, 0.5, H), q.on('knop', 1), 'CONTACTEN'); chip(ctx, 'thuiswerken', 360, 812, C.oker, q.on('Thuiswerken', 1), 28);
    metaA(ctx, 'AANNAME: MENSEN HOUDEN ZICH ERAAN', 720, 856, q.on('neemt', 1), C.oker, 'left', 22);
    const g = { x: 720, y: 500, w: 1080, h: 260, dagen: 100, max: 8700 }, M = q.on('model', 1); laag(ctx, Math.max(M, 0), () => { grafAssen(ctx, g, 1); grafTitel(ctx, g, 'MODEL · OEFENSTAD · 100.000 INWONERS', 1); });
    grafBalkjes(ctx, g, RUN.r3(), 100, C.koraal, M, { omlijn: true }); grafBalkjes(ctx, g, RUN.r15(), maatTot(q.at('model', 1) + 0.3, t, 2.5), C.koraal, M, { rand: C.oker });
    naamBij(ctx, 'stippel: knop op 100 %', '', 1160, 560, M, 'left', C.text2); },

  s25(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1); knop(ctx, 360, 590, 64, 0.5, 1, 'CONTACTEN');
    const g = { x: 720, y: 500, w: 1080, h: 260, dagen: 100, max: 8700 }, run = RUN.r15(); grafAssen(ctx, g, 1); grafTitel(ctx, g, 'MODEL · OEFENSTAD · 100.000 INWONERS', 1);
    grafBalkjes(ctx, g, RUN.r3(), 100, C.koraal, 1, { omlijn: true }); grafBalkjes(ctx, g, run, 100, C.koraal, 1, { rand: C.oker });
    const p = grafPt(Object.assign({}, g), run, grafPiek(run)); const G = q.on('getal', 1); laag(ctx, G, () => { roundRect(ctx, p[0] - 120, p[1] - 92, 240, 64, 14); shape(ctx, rgba(C.goud, 0.18), C.goud, 2.5); text(ctx, 'piek: 1300', p[0], p[1] - 46, fTekst(36, 800), C.text, 'center'); });
    vraagteken(ctx, p[0] + 170, p[1] - 20, q.on('zegt', 1), 80); metaA(ctx, 'NIEUWE ZIEKEN PER DAG', p[0], p[1] - 110, G, C.text2, 'center', 18); },

  s27(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: wat er gebeurt als de aannames kloppen', 1);
    const V = q.on('Verandert', 1, 1.2), R = q.on('RIVM', 1);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1, { namen: 1 }); knop(ctx, 360, 590, 64, lerp(0.5, 0.6, V), 1, 'CONTACTEN');
    chip(ctx, 'aanname: hoe lang besmettelijk?', 960, 470, C.oker, q.on('aannames', 1), 26); chip(ctx, 'aanname: hoe gedragen mensen zich?', 360, 812, C.oker, q.on('aannames', 1), 26);
    const g = { x: 720, y: 540, w: 1080, h: 240, dagen: 100, max: 8700 }; laag(ctx, 1 - R, () => { grafAssen(ctx, g, 1); grafTitel(ctx, g, 'SCENARIO, GEEN VOORSPELLING', q.on('zekere', 1), C.goud);
      grafBalkjes(ctx, g, RUN.r15(), 100, C.koraal, V, { omlijn: true }); grafBalkjes(ctx, g, RUN.r15(), 100, C.koraal, 1 - V, { rand: C.oker }); grafBalkjes(ctx, g, RUN.r18(), 100, C.koraal, V, { rand: C.oker }); naamBij(ctx, 'andere aanname, andere uitkomst', '', 1780, 590, V, 'right', C.goud); });
    echtKaart(ctx, 760, 520, 1000, 'MAART 2020 · RIVM', [['scenario’s telkens bijgesteld', 1], ['aanname: hoe lang op de ic?  ↑ langer dan eerst gedacht', q.on('langer', 1)]], 'RIVM, TECHNISCHE BRIEFING 1 APRIL 2020', R, { lh: 50 }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g = { x: 140, y: 250, w: 1100, h: 480, dagen: 80, max: 2000 }, run = RUN.r15(), bw = g.w / g.dagen;
    grafAssen(ctx, g, 1, { stap: 20, yl: 'NIEUWE ZIEKEN PER DAG' }); const tot = 70;
    for (let d = 0; d < 70; d++) { if (tot < d) break; const f = 1 + (d > 38 ? 0.012 * (d - 38) : 0) + (hash(d * 3.7) - 0.5) * 0.12; const bh = run[d].nieuw * 1e5 * f / g.max * g.h; blokje(ctx, g.x + d * bw + 1, g.y + g.h - bh, bw - 2, Math.max(1, bh), C.koraal, clamp(tot - d, 0, 1)); }
    const M = q.on('model', 1, 1.2); if (M > 0.01) { ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.floor(80 * M); for (let d = 0; d < n; d++) { const [x, y] = grafPt(g, run, d); d ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    laag(ctx, M, () => { lijn(ctx, [[190, 300], [250, 300]], C.text, 5); text(ctx, 'model', 270, 312, fTekst(34, 700), C.text, 'left'); }); blokje(ctx, 190, 336, 60, 28, C.koraal); text(ctx, 'dossier: meldingen', 270, 362, fTekst(34, 700), C.koraal, 'left');
    const E = q.on('elkaar', 1); laag(ctx, E, () => { ctx.save(); ctx.beginPath(); ctx.ellipse(g.x + 56 * bw, g.y + g.h * 0.42, 150, 150, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.stroke(); ctx.restore(); });
    tag(ctx, 'hier past een aanname niet', 760, 210, C.goud, q.on('aanname', 1), 'center', 30);
    persoon(ctx, 'yasmin', 1450, 860, 400, { t, kijk: -1, pose: E > 0.5 ? 'wijs' : 'staan', uit: E > 0.5 ? 'verbaasd' : 'neutraal' });
    persoon(ctx, 'farid', 1720, 860, 400, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: q.on('zegt', 1) > 0.5 ? 'blij' : 'neutraal' }); },

  // ---------- Recap ----------
  s29(ctx, t, q) { kantoorVlak(ctx); ctx.save(); roundRect(ctx, SCR.x, SCR.y, SCR.w, SCR.h, 2); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); miniDossier(ctx, t); ctx.restore();
    duo(ctx, t, { yx: 1460, fx: 1700, poseF: 'staan', uitY: 'blij' });
    const kaarten = [['R: hoeveel steekt één zieke aan', 'omdat', (x, y) => { blokje(ctx, x - 100, y - 18, 56, 36, C.koraal); [-40, 0, 40].forEach(dy => { pijl(ctx, x - 40, y, x + 40, y + dy, C.oker, 1, 3, 12); blokje(ctx, x + 50, y + dy - 14, 40, 28, C.koraal); }); }],
      ['R > 1: keer twee, keer twee', 'Dan', (x, y) => { [6, 12, 24, 48].forEach((n, i) => { for (let k = 0; k < n / 6; k++) blokje(ctx, x - 110 + i * 64, y + 46 - (k + 1) * 13, 46, 11, C.koraal); }); }],
      ['drempel: 1 − 1/R₀', 'zonder', (x, y) => balkImmuun(ctx, x - 140, y - 18, 280, 0.8, 1, { drempel: 2 / 3, h: 36 })],
      ['model: wat als …', 'schiet', (x, y) => { bakVorm(ctx, x - 150, y - 30, 80, 60, C.teal); bakVorm(ctx, x - 40, y - 30, 80, 60, C.koraal); bakVorm(ctx, x + 70, y - 30, 80, 60, C.groen); }]];
    kaarten.forEach(([kop, cue, teken], i) => recapKaart(ctx, 60 + (i % 2) * 520, 460 + Math.floor(i / 2) * 210, 500, 190, kop, q.on(cue, 1), teken)); },

  s30(ctx, t, q) { kantoorVlak(ctx); roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 22);
    const rij = [['wo', 'Biomedische Wetenschappen → master', 'BIOMEDICAL SCIENCES, RICHTING EPIDEMIOLOGY (ENGELS) · NIJMEGEN', 'Nijmegen'], ['wo', 'Gezondheidswetenschappen', 'ENSCHEDE · AMSTERDAM · MAASTRICHT', 'Gezondheidswetenschappen'], ['werk', 'bijv. epidemioloog bij GGD of RIVM', 'MET EEN MASTER', 'epidemioloog'], ['arts', 'geneeskunde, later infectieziekten', 'ZOALS YASMIN WIL', 'arts']];
    rij.forEach(([n, o, m, cue], i) => { const a = i ? q.on(cue, 1) : 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 155;
      roundRect(ctx, 100, y, 1180, 135, 18); shape(ctx, rgba('#0D1420', 0.9), i < 2 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 84, fTitel(46), i < 2 ? C.groen : C.goud); text(ctx, o, 300, y + 64, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 106, C.grain, 'left', 18); ctx.restore(); });
    duo(ctx, t, { yx: 1460, fx: 1700, uitY: q.on('arts', 1) > 0.5 ? 'lacht' : 'blij' }); }
});

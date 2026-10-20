// Film 5 · De lever als fabriek — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken (zelfde als film 4) ----------
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); text(ctx, txt, x + 30, y + 42, fTekst(36, 600), C.text, 'left'); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function glucose(ctx, x, y, r = 11, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(V.kh, 0.6), V.kh, 1.4, 0); ctx.restore(); }
function aminozuur(ctx, x, y, r = 10, kind = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; bead(ctx, x, y, r, kind); ctx.restore(); }

// ---------- kleuren van deze film ----------
const ZARM = '#5B6FA8';            // zuurstofarm bloed (poortader, leverader, holle ader)
const ZRIJK = BLOED;               // zuurstofrijk bloed (leverslagader, aorta) — koraalrood uit de serie
const GAL = '#B9C94A';             // gal: geelgroen
const BILI = '#E6C84A';            // bilirubine: geel
const LEVER = C.bruin;             // leverweefsel
const HUID_ROZE = '#E8B9A0', HUID_GEEL = '#E0C068';
function mix(h1, h2, u) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, u))); return `rgb(${c[0]},${c[1]},${c[2]})`; }

// ---------- baby (Macro) ----------
function baby(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const { geel = 0, licht = 0, t = 0, ogen = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const huid = mix(HUID_ROZE, HUID_GEEL, geel), wit = mix('#F4F1EA', '#E8D48A', geel);
  // wiegje
  roundRect(ctx, x - 300 * s, y - 60 * s, 600 * s, 300 * s, 40 * s); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  roundRect(ctx, x - 280 * s, y - 40 * s, 560 * s, 180 * s, 30 * s); ctx.fillStyle = rgba('#E6E1D3', 0.35); ctx.fill();
  // dekentje
  roundRect(ctx, x - 150 * s, y + 20 * s, 380 * s, 120 * s, 40 * s); shape(ctx, rgba(C.teal, 0.35), rgba(C.teal, 0.8), 1.5);
  // hoofd
  const hx = x - 150 * s, hy = y + 10 * s, r = 78 * s; ctx.beginPath(); ctx.arc(hx, hy, r, 0, 6.283); shape(ctx, huid, rgba('#8C5A3A', 0.6), 1.5);
  // oogwit + pupil (gesloten/open volgens t)
  if (ogen) { for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + d * 26 * s, hy - 8 * s, 12 * s, 8 * s, 0, 0, 6.283); shape(ctx, wit, rgba('#8C5A3A', 0.5), 1); ctx.fillStyle = '#2B2B33'; ctx.beginPath(); ctx.arc(hx + d * 26 * s, hy - 8 * s, 4.5 * s, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = rgba('#8C5A3A', 0.7); ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.arc(hx, hy + 22 * s, 14 * s, 0.3, 2.84); ctx.stroke();
  // handje
  ctx.beginPath(); ctx.arc(x + 40 * s, y + 20 * s, 18 * s, 0, 6.283); shape(ctx, huid, rgba('#8C5A3A', 0.6), 1.2);
  // blauw licht
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht; roundRect(ctx, x - 320 * s, y - 260 * s, 640 * s, 26 * s, 13 * s); shape(ctx, rgba(C.teal, 0.5), C.teal, 1.5);
    const g = ctx.createLinearGradient(0, y - 240 * s, 0, y + 40 * s); g.addColorStop(0, rgba('#5BA4F0', 0.32)); g.addColorStop(1, rgba('#5BA4F0', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 300 * s, y - 234 * s); ctx.lineTo(x + 300 * s, y - 234 * s); ctx.lineTo(x + 360 * s, y + 60 * s); ctx.lineTo(x - 360 * s, y + 60 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- leverschema (Schema): lever met drie vaten, holle ader en hart ----------
const LS = { lx: 900, ly: 470, lw: 520, lh: 280, darm: [300, 820], aorta: [1560, 820], hart: [1560, 150], hol: 1400 };
function leverVorm(ctx, x, y, w, h, a = 1, fill = rgba(LEVER, 0.35)) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  ctx.moveTo(x - w / 2, y - h * 0.1); ctx.bezierCurveTo(x - w / 2, y - h * 0.6, x - w * 0.1, y - h * 0.6, x + w * 0.15, y - h * 0.45); ctx.bezierCurveTo(x + w * 0.45, y - h * 0.3, x + w / 2, y - h * 0.1, x + w * 0.42, y + h * 0.2);
  ctx.bezierCurveTo(x + w * 0.3, y + h * 0.5, x - w * 0.1, y + h * 0.5, x - w * 0.35, y + h * 0.42); ctx.bezierCurveTo(x - w / 2, y + h * 0.3, x - w / 2, y + h * 0.1, x - w / 2, y - h * 0.1); ctx.closePath(); shape(ctx, fill, LEVER, 2.5); ctx.restore(); }
function vat(ctx, pts, col, lw, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); gladC(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
const P_POORT = [[LS.darm[0] + 90, LS.darm[1] - 40], [560, 700], [LS.lx - 200, LS.ly + 110]];
const P_SLAG = [[LS.aorta[0], LS.aorta[1] - 60], [1380, 640], [LS.lx + 170, LS.ly + 90]];
const P_LEVERADER = [[LS.lx + 40, LS.ly - 110], [1250, 300], [LS.hol, 260]];
const P_HOL = [[LS.hol, 860], [LS.hol, 260], [LS.hart[0] - 40, LS.hart[1] + 70]];
const P_AORTA = [[LS.hart[0] + 40, LS.hart[1] + 60], [LS.aorta[0] + 40, 400], [LS.aorta[0], LS.aorta[1] + 20]];
function hartVorm(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + 60 * s); ctx.bezierCurveTo(x - 110 * s, y - 30 * s, x - 50 * s, y - 90 * s, x, y - 30 * s); ctx.bezierCurveTo(x + 50 * s, y - 90 * s, x + 110 * s, y - 30 * s, x, y + 60 * s); ctx.closePath(); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 2); ctx.restore(); }
function darmIcoon(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; buisPad(ctx, [[x - 120, y - 40], [x - 40, y + 30], [x + 40, y - 30], [x + 120, y + 40]], 40, 1, V.neutraal, C.fill, { seed: 3, glad: true }); metaText(ctx, 'DARM', x, y + 110, C.grain, 'center', 26); ctx.restore(); }
// o: {lever, poort, slag, leverader, hol, hart, aorta, labels, t, glu (deeltjesstroom), alc}
function leverSchema(ctx, o = {}) { const { a = 1, lever = 1, poort = 0, slag = 0, leverader = 0, hol = 0, hart = 0, aorta = 0, labels = 1, t = 0, glu = 0, mix_ = 0, darm = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  darmIcoon(ctx, LS.darm[0], LS.darm[1], darm);
  hartVorm(ctx, LS.hart[0], LS.hart[1], 1, hart); if (hart > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= hart; text(ctx, 'hart', LS.hart[0] + 130, LS.hart[1] + 10, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
  vat(ctx, P_AORTA, ZRIJK, 9, aorta); if (aorta > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= aorta; text(ctx, 'aorta', LS.aorta[0] + 60, 520, fTekst(30, 600), lighten(ZRIJK, 0.4), 'left'); ctx.restore(); }
  vat(ctx, P_HOL, ZARM, 11, hol); if (hol > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= hol; text(ctx, 'onderste holle ader', LS.hol - 30, 820, fTekst(30, 600), lighten(ZARM, 0.4), 'right'); ctx.restore(); }
  vat(ctx, P_POORT, ZARM, 11, poort); if (poort > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= poort; text(ctx, 'poortader', 560, 760, fTekst(32, 600), lighten(ZARM, 0.4), 'center'); ctx.restore(); }
  vat(ctx, P_SLAG, ZRIJK, 8, slag); if (slag > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= slag; text(ctx, 'leverslagader', 1200, 700, fTekst(32, 600), lighten(ZRIJK, 0.4), 'center'); ctx.restore(); }
  vat(ctx, P_LEVERADER, ZARM, 10, leverader); if (leverader > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= leverader; text(ctx, 'leverader', 1150, 260, fTekst(32, 600), lighten(ZARM, 0.4), 'center'); ctx.restore(); }
  leverVorm(ctx, LS.lx, LS.ly, LS.lw, LS.lh, lever); if (lever > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= lever; text(ctx, 'lever', LS.lx - 40, LS.ly + 20, fTekst(40, 600), C.text, 'center'); ctx.restore(); }
  if (glu > 0.01) { particleFlow(ctx, gladC(P_POORT), 14, t, 150, V.kh, 7, 1, glu * poort); particleFlow(ctx, gladC(P_LEVERADER), 6, t, 150, V.kh, 7, 5, glu * leverader); particleFlow(ctx, gladC(P_SLAG), 5, t, 150, V.kh, 7, 9, glu * slag); }
  ctx.restore(); }
// concentratiemeter: staaf met waarde 0..1
function meter(ctx, x, y, v, label, col, a = 1, h = 150, w = 36) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 1.2);
  const hh = Math.max(4, h * clamp(v, 0, 1)); roundRect(ctx, x - w / 2 + 4, y - hh, w - 8, hh - 4, 5); ctx.fillStyle = col; ctx.fill();
  if (label) metaText(ctx, label, x, y + 34, C.grain, 'center', 22); ctx.restore(); }
// de vier meters (poortader, leverslagader, leverader, holle ader) op vaste plekken, met waardes
function meters(ctx, vals, col, a = 1, lab = 1) { const M = [[600, 640, 'POORTADER'], [1260, 820, 'LEVERSLAGADER'], [1090, 230, 'LEVERADER'], [1490, 440, 'HOLLE ADER']]; M.forEach((m, i) => { if (vals[i] == null) return; meter(ctx, m[0], m[1], vals[i], lab ? m[2] : null, col, a, 120, 30); }); }

// ---------- leverlobje (vwo, Micro) ----------
function lobje(ctx, x, y, R, a = 1, o = {}) { if (a <= 0.01) return; const { t = 0, bloed = 1, gal = 0, cellen = 1, driehoek = 1, centraal = 1, labels = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const hoek = i => [x + R * Math.cos(i * Math.PI / 3 - Math.PI / 6), y + R * Math.sin(i * Math.PI / 3 - Math.PI / 6)];
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const p = hoek(i); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.closePath(); shape(ctx, rgba(LEVER, 0.12), rgba(LEVER, 0.9), 2);
  // sinusoïden: van elke hoek naar het midden, met levercellen ernaast
  for (let i = 0; i < 6; i++) { const p = hoek(i); const pts = [[p[0], p[1]], [x, y]];
    ctx.save(); ctx.globalAlpha *= bloed; ctx.strokeStyle = rgba(ZARM, 0.55); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lerp(p[0], x, 0.12), lerp(p[1], y, 0.12)); ctx.lineTo(lerp(p[0], x, 0.88), lerp(p[1], y, 0.88)); ctx.stroke(); ctx.restore();
    if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; const ang = Math.atan2(y - p[1], x - p[0]); for (let k = 1; k <= 5; k++) { const u = 0.14 + k * 0.13; const cx = lerp(p[0], x, u), cy = lerp(p[1], y, u); for (const d of [-1, 1]) { const ox = cx - Math.sin(ang) * d * 24, oy = cy + Math.cos(ang) * d * 24; ctx.save(); ctx.translate(ox, oy); ctx.rotate(ang); roundRect(ctx, -14, -9, 28, 18, 5); shape(ctx, rgba(C.oker, 0.35), rgba(C.oker, 0.9), 1.2); ctx.fillStyle = rgba(C.kern, 0.9); ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, 6.283); ctx.fill(); ctx.restore(); } } ctx.restore(); }
    if (bloed > 0.01) particleFlow(ctx, [[lerp(p[0], x, 0.12), lerp(p[1], y, 0.12)], [lerp(p[0], x, 0.9), lerp(p[1], y, 0.9)]], 4, t, 60, rgba(C.koraal, 0.9), 4, i * 7, bloed);
    if (gal > 0.01) { const g0 = [lerp(p[0], x, 0.82), lerp(p[1], y, 0.82)], g1 = [lerp(p[0], x, 0.08), lerp(p[1], y, 0.08)]; const ang = Math.atan2(y - p[1], x - p[0]); const off = [-Math.sin(ang) * 62, Math.cos(ang) * 62]; ctx.save(); ctx.globalAlpha *= gal; ctx.strokeStyle = rgba(GAL, 0.7); ctx.lineWidth = 4; ctx.setLineDash([10, 7]); ctx.beginPath(); ctx.moveTo(g0[0] + off[0], g0[1] + off[1]); ctx.lineTo(g1[0] + off[0], g1[1] + off[1]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); particleFlow(ctx, [[g0[0] + off[0], g0[1] + off[1]], [g1[0] + off[0], g1[1] + off[1]]], 3, t, 50, GAL, 4, 50 + i * 3, gal); }
    // portale driehoek op de hoek
    if (driehoek > 0.01) { ctx.save(); ctx.globalAlpha *= driehoek; const ang = Math.atan2(y - p[1], x - p[0]); const base = [p[0] + Math.cos(ang) * 6, p[1] + Math.sin(ang) * 6];
      [[ZARM, 0, 13], [ZRIJK, 1, 9], [GAL, -1, 9]].forEach(([c, d, r]) => { const ox = base[0] - Math.sin(ang) * d * 26, oy = base[1] + Math.cos(ang) * d * 26; ctx.beginPath(); ctx.arc(ox, oy, r, 0, 6.283); shape(ctx, rgba(c, 0.5), c, 1.5); }); ctx.restore(); } }
  if (centraal > 0.01) { ctx.save(); ctx.globalAlpha *= centraal; ctx.beginPath(); ctx.arc(x, y, 28, 0, 6.283); shape(ctx, rgba(ZARM, 0.5), ZARM, 2); ctx.restore(); }
  ctx.restore(); }

// ---------- de fabriek (Schema): strip met afdelingen ----------
const AFD = ['1 SUIKER', '2 EIWIT', '3 AFBREKEN', '4 GAL', '5 VET'];
function afdelingen(ctx, cur, a = 1, n = 4, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 1640 / n, x0 = 140;
  for (let i = 0; i < n; i++) { const on = i === cur; roundRect(ctx, x0 + i * w + 8, y, w - 16, 70, 14); shape(ctx, on ? rgba(C.goud, 0.18) : rgba(C.fill, 0.5), on ? C.goud : C.line, on ? 2 : 1); metaText(ctx, AFD[i], x0 + i * w + w / 2, y + 44, on ? C.goud : C.grain, 'center', 26); }
  ctx.restore(); }
function paneel(ctx, a = 1, y = 250, h = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 140, y, 1640, h, 20); shape(ctx, rgba(C.fill, 0.25), rgba(C.line, 0.5), 1.2); ctx.restore(); }
function nierIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 34 * s, 50 * s, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.25), C.koraal, 2); ctx.beginPath(); ctx.ellipse(x + 20 * s, y, 12 * s, 18 * s, 0, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); metaText(ctx, 'NIEREN', x, y + 90 * s, C.grain, 'center', 22); ctx.restore(); }
function galblaasIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 30 * s, 48 * s, 0.5, 0, 6.283); shape(ctx, rgba(GAL, 0.35), GAL, 2); ctx.restore(); }
function molecuul(ctx, x, y, col, a = 1, parts = 3, r = 12) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < parts; i++) { ctx.beginPath(); ctx.arc(x + (i - (parts - 1) / 2) * r * 1.5, y + (i % 2) * 6, r, 0, 6.283); shape(ctx, rgba(col, 0.5), col, 1.4); } ctx.restore(); }
function ureumIcoon(ctx, x, y, a = 1, r = 10) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.paars, 0.45), C.paars, 1.4); text(ctx, 'N', x, y + 6, fMeta(16), C.text, 'center'); ctx.restore(); }
function zeef(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 18, w, 36, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 1; for (let i = 1; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + i * w / 9, y - 14); ctx.lineTo(x - w / 2 + i * w / 9, y + 14); ctx.stroke(); } ctx.restore(); }
function rodeBloedcel(ctx, x, y, r = 22, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.62, 0, 0, 6.283); shape(ctx, rgba(col, 0.55), col, 1.8); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.25, 0, 0, 6.283); ctx.strokeStyle = rgba(col, 0.9); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
function bili(ctx, x, y, a = 1, r = 10, plak = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BILI, 0.7), BILI, 1.4); if (plak > 0.01) { ctx.globalAlpha *= plak; ctx.beginPath(); ctx.arc(x + r * 0.9, y - r * 0.6, r * 0.55, 0, 6.283); shape(ctx, rgba(C.teal, 0.8), C.teal, 1.2); } ctx.restore(); }
function orgaanBlok(ctx, x, y, w, h, naam, col, a = 1, meta = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 20); shape(ctx, rgba(col, 0.25), col, 2); text(ctx, naam, x, y + 12, fTekst(34, 600), C.text, 'center'); if (meta) metaText(ctx, meta, x, y + h / 2 + 34, C.grain, 'center', 22); ctx.restore(); }

// ---------- route van de gele kleurstof (H3) ----------
const R3 = { rbc: [260, 420], milt: [560, 420], lever: [960, 420], gal: [960, 640], darm: [1420, 640], huid: [1420, 300], nier: [1420, 460] };
function biliRoute(ctx, o = {}) { const { a = 1, t = 0, afbraak = 0, ijzer = 0, eiwit = 0, geel = 0, plak = 0, galS = 0, darm = 0, bruin = 0, steen = 0, terug = 0, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // rode bloedcel links
  rodeBloedcel(ctx, R3.rbc[0], R3.rbc[1], 30, 1); if (labels) metaText(ctx, '120 DAGEN', R3.rbc[0], R3.rbc[1] + 80, C.grain, 'center', 22);
  arrow(ctx, R3.rbc[0] + 50, R3.rbc[1], R3.milt[0] - 110, R3.milt[1], C.line, afbraak, 2);
  orgaanBlok(ctx, R3.milt[0], R3.milt[1], 200, 110, 'milt', C.paars, afbraak, 'EN DE LEVER');
  // drie uitkomsten uit de milt
  const y0 = R3.milt[1];
  if (ijzer > 0.01) { ctx.save(); ctx.globalAlpha *= ijzer; arrow(ctx, R3.milt[0] + 110, y0 - 30, 800, 230, C.line, 1, 2); ctx.beginPath(); ctx.arc(830, 220, 10, 0, 6.283); shape(ctx, rgba(C.text2, 0.6), C.text2, 1.4); text(ctx, 'ijzer → rood beenmerg', 860, 228, fTekst(28, 600), C.text, 'left'); ctx.restore(); }
  if (eiwit > 0.01) { ctx.save(); ctx.globalAlpha *= eiwit; arrow(ctx, R3.milt[0] + 110, y0 + 30, 800, 560, C.line, 1, 2); for (let i = 0; i < 4; i++) aminozuur(ctx, 830 + i * 22, 560, 8, [0, 5, 9, 14][i]); text(ctx, 'eiwit → aminozuren', 940, 568, fTekst(28, 600), C.text, 'left'); ctx.restore(); }
  arrow(ctx, R3.milt[0] + 110, y0, R3.lever[0] - 130, y0, C.line, geel, 2);
  if (geel > 0.01) { ctx.save(); ctx.globalAlpha *= geel; bili(ctx, 740, y0 - 10, 1, 11, 0); text(ctx, 'bilirubine', 740, y0 - 36, fTekst(28, 600), BILI, 'center'); ctx.restore(); }
  orgaanBlok(ctx, R3.lever[0], R3.lever[1], 240, 120, 'lever', LEVER, geel);
  if (plak > 0.01) { ctx.save(); ctx.globalAlpha *= plak; bili(ctx, R3.lever[0], R3.lever[1] - 90, 1, 12, 1); metaText(ctx, 'OPLOSBAAR', R3.lever[0], R3.lever[1] - 120, C.grain, 'center', 22); ctx.restore(); }
  // gal naar de darm
  const galPad = [[R3.lever[0], R3.lever[1] + 60], [R3.gal[0], R3.gal[1]], [R3.darm[0] - 140, R3.darm[1]]];
  vat(ctx, galPad, GAL, 8, galS); if (galS > 0.01 && labels) { ctx.save(); ctx.globalAlpha *= galS; text(ctx, 'gal', 1120, 620, fTekst(30, 600), GAL, 'center'); text(ctx, 'galgang', 1120, 680, fMeta(22), C.grain, 'center'); ctx.restore(); }
  if (galS > 0.01 && steen < 0.5) particleFlow(ctx, gladC(galPad), 6, t, 90, BILI, 6, 3, galS * (1 - terug));
  if (steen > 0.01) { ctx.save(); ctx.globalAlpha *= steen; ctx.beginPath(); ctx.ellipse(1150, 640, 26, 20, 0.4, 0, 6.283); shape(ctx, '#8A8F99', '#C5CAD3', 2); text(ctx, 'galsteen', 1150, 760, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
  orgaanBlok(ctx, R3.darm[0], R3.darm[1], 220, 110, 'darm', V.neutraal, darm);
  if (bruin > 0.01) { ctx.save(); ctx.globalAlpha *= bruin; ctx.beginPath(); ctx.arc(R3.darm[0] + 160, R3.darm[1], 18, 0, 6.283); shape(ctx, steen > 0.5 ? '#B8B4A6' : '#6B4A2B', steen > 0.5 ? '#D8D4C6' : '#8C5A3A', 1.5); text(ctx, steen > 0.5 ? 'bleek' : 'bruin', R3.darm[0] + 160, R3.darm[1] + 50, fTekst(26, 600), C.text, 'center'); ctx.restore(); }
  // terug het bloed in: huid en nieren
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= terug; arrow(ctx, R3.lever[0] + 120, R3.lever[1] - 20, R3.huid[0] - 110, R3.huid[1], BILI, 1, 2.5); orgaanBlok(ctx, R3.huid[0], R3.huid[1], 220, 90, 'huid: geel', BILI, 1);
    arrow(ctx, R3.lever[0] + 120, R3.lever[1] + 10, R3.nier[0] - 110, R3.nier[1], BILI, 1, 2.5); orgaanBlok(ctx, R3.nier[0], R3.nier[1], 220, 90, 'urine: donker', '#8C6A2B', 1); ctx.restore(); }
  ctx.restore(); }

// Noor (vast personage) tot de heupen, met lever (rechtsboven in haar buik = links in beeld) en vaag de darm (20 okt 2026; vervangt het kale lichaam)
function noorLever(ctx, x, top, hh, t, o = {}) { const { a = 1, darmA = 0.3, onder = CAPTION_Y } = o; if (a <= 0.01) return;
  const L = CAST.noor.lengte || 1, H = 6.1 * hh, h = H / L, y = top + H, m = rompMaat('noor', x, y, h);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, W, onder); ctx.clip(); persoon(ctx, 'noor', x, y, h, { uit: 'neutraal', t });
  ctx.save(); rompPad(ctx, m); ctx.clip(); const cy = (m.taille - 0.7 * hh + m.heup + 0.3 * hh) / 2; ctx.beginPath(); ctx.ellipse(x, cy, 0.95 * hh, 0.95 * hh, 0, 0, 6.283); ctx.fillStyle = rgba(C.bgMicro, 0.62); ctx.fill();
  const k = 1.4 * hh / 340, pts = DARM_PTS.map(p => [x + p[0] * k, cy + 0.15 * hh + (p[1] - 20) * k]); ctx.save(); ctx.globalAlpha *= darmA; buisPad(ctx, pts, 40 * k, 1, V.neutraal, C.fill, { seed: 2, glad: true }); ctx.restore();
  leverVorm(ctx, x - 0.3 * hh, m.taille - 0.68 * hh, 1.45 * hh, 0.8 * hh, 1, rgba(LEVER, 0.95)); ctx.restore(); ctx.restore(); }
const SCENES = {
  title(ctx, t) { leverVorm(ctx, 1480, 560, 560, 320, 1); vat(ctx, [[1120, 780], [1300, 700], [1330, 620]], ZARM, 10, 1); vat(ctx, [[1800, 800], [1680, 700], [1620, 640]], ZRIJK, 8, 1); vat(ctx, [[1500, 420], [1540, 300], [1560, 200]], ZARM, 9, 1); for (let i = 0; i < 5; i++) { const w = wander(i, t, 8, 1.4); glucose(ctx, 1180 + i * 40 + w.x, 760 - i * 24 + w.y, 10, 0.9); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'macro');
    const g = q.on('geel', 1, 2.0); baby(ctx, 960, 500, 1.5, 1, { geel: g, t });
    metaText(ctx, 'DRIE DAGEN OUD', 960, 180, C.grain, 'center', 26);
    tag(ctx, 'meer dan de helft van alle baby\'s', 960, 870, C.goud, q.on('helft'));
    vraagteken(ctx, 1640, 330, q.on('vandaan'), 130);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const v = q.on('verteerd', 1, 0.8), p = q.on('poortader', 1, 1.0), l = q.on('lever', 2, 1.0);
    leverSchema(ctx, { t, lever: l, poort: p, glu: v, labels: 1 });
    if (v > 0.01 && p < 0.5) { ctx.save(); ctx.globalAlpha *= v * (1 - p * 2); for (let i = 0; i < 8; i++) { const w = wander(i, t, 10, 1.4); glucose(ctx, 250 + hash(i * 3) * 120 + w.x, 650 + hash(i * 3 + 1) * 80 + w.y); aminozuur(ctx, 250 + hash(i * 5 + 2) * 120 + w.y, 650 + hash(i * 5 + 3) * 80 + w.x, 8, [0, 5, 9, 14][i % 4]); } ctx.restore(); }
    const rb = q.on('rechtsboven', 1, 0.8); if (rb > 0.01) { ctx.save(); ctx.globalAlpha *= rb; noorLever(ctx, 1640, 150, 100, t, { onder: 610 }); metaText(ctx, 'RECHTSBOVEN', 1640, 640, C.grain, 'center', 22); ctx.restore(); }
    tag(ctx, '≈ 1,5 kg', 900, 350, C.goud, q.on('anderhalve'));
    tag(ctx, 'drie grote bloedvaten', 960, 870, C.goud, q.on('drie'));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const p = q.on('poortader', 1, 0.8), s = q.on('leverslagader', 1, 1.0), la = q.on('leverader', 1, 1.0), hol = q.on('holle', 1, 1.0), hart = q.on('hart', 1, 0.8), ao = q.on('aorta', 1, 0.8);
    leverSchema(ctx, { t, lever: 1, poort: 1, slag: s, leverader: la, hol, hart, aorta: ao, glu: q.on('voedingsstoffen') * (1 - la), labels: 1 });
    tag(ctx, 'zuurstofarm', 420, 600, ZARM, q.on('zuurstofarm') * (1 - s));
    tag(ctx, 'zuurstofrijk', 1560, 560, ZRIJK, q.on('zuurstofrijk') * (1 - la));
    const dk = q.on('Driekwart', 1, 0.8); if (dk > 0.01) { ctx.save(); ctx.globalAlpha *= dk; roundRect(ctx, 260, 180, 300, 70, 14); shape(ctx, rgba(C.bgSchema, 0.9), C.goud, 1.5); text(ctx, '¾ poortader · ¼ slagader', 410, 226, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'vet: via de lymfe, film 4', 960, 870, LYMFE, q.on('lymfe'));
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    leverSchema(ctx, { t, lever: 1, poort: 1, slag: 1, leverader: 1, hol: 1, hart: 1, aorta: 1, glu: q.on('glucose', 1, 1.0), labels: 1 });
    metaText(ctx, 'EEN HALF UUR NA HET ETEN', 960, 120, C.grain, 'center', 26);
    vraagteken(ctx, 960, 680, q.on('welk'), 120);
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const a = q.on('Antwoord', 1, 1.2), la = q.on('leverader', 1, 1.0), sl = q.on('leverslagader', 1, 1.0), hol = q.on('holle', 1, 1.0);
    leverSchema(ctx, { t, lever: 1, poort: 1, slag: 1, leverader: 1, hol: 1, hart: 1, aorta: 1, glu: 1, labels: 0 });
    meters(ctx, [0.9 * a, sl > 0.01 ? 0.45 : null, la > 0.01 ? 0.6 : null, hol > 0.01 ? 0.5 : null], V.kh, 1);
    tag(ctx, 'bloedsuiker meet je niet hier', 560, 780, C.koraal, q.on('bloedsuiker') * (1 - la));
    tag(ctx, 'de lever houdt een deel vast', 1150, 330, C.goud, q.on('vast') * (1 - sl));
    tag(ctx, 'evenveel als in de aorta', 1160, 655, ZRIJK, q.on('aorta') * (1 - hol));
    tag(ctx, 'gemengd met bloed uit benen en nieren', 1240, 560, ZARM, q.on('mengt') * (1 - q.on('vergelijk')));
    tag(ctx, 'erin ↔ eruit', 960, 870, C.groen, q.on('vergelijk'));
  },
  s09(ctx, t, q) { bg(ctx, 'micro');
    const z = q.on('leverlobjes', 1, 1.2), zes = q.on('zeshoekig', 1, 0.8), dr = q.on('buisjes', 1, 1.0), si = q.on('stroomt', 1, 1.0), ce = q.on('levercel', 1, 0.8), cen = q.on('centrale', 1, 0.8);
    if (z < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - z; leverVorm(ctx, 560, 500, 480, 280, 1); for (let i = 0; i < 24; i++) { const px = 400 + (i % 6) * 60, py = 420 + Math.floor(i / 6) * 50; ctx.beginPath(); for (let k = 0; k < 6; k++) { const ang = k * Math.PI / 3 - Math.PI / 6; k ? ctx.lineTo(px + 22 * Math.cos(ang), py + 22 * Math.sin(ang)) : ctx.moveTo(px + 22 * Math.cos(ang), py + 22 * Math.sin(ang)); } ctx.closePath(); ctx.strokeStyle = rgba(LEVER, 0.7); ctx.lineWidth = 1; ctx.stroke(); } ctx.restore(); }
    lobje(ctx, 960, 500, 300, Math.max(zes, z * 0.6), { t, bloed: si, gal: 0, cellen: ce, driehoek: dr, centraal: cen });
    label(ctx, 'portale driehoek', '', 960 + 300 * Math.cos(-Math.PI / 6) - 10, 500 + 300 * Math.sin(-Math.PI / 6) + 10, 1240, 140, q.on('driehoek'), C.text, 'left');
    { const d = q.on('driehoek'); if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; let kx = 1240; [['POORTADER', ZARM], ['SLAGADER', ZRIJK], ['GALBUISJE', GAL]].forEach(([w, c], i) => { ctx.beginPath(); ctx.arc(kx + 8, 166, 7, 0, 6.283); shape(ctx, rgba(c, 0.6), c, 1.2); metaText(ctx, w, kx + 24, 174, lighten(c, 0.35), 'left', 22); kx += 24 + w.length * 13.5 + 30; }); ctx.restore(); } }
    naamBij(ctx, 'sinusoïden', 'wijde haarvaten vol gaten', 670, 420, q.on('sinusoïden'), 'right', C.text);
    naamBij(ctx, 'centrale ader', 'naar de leverader', 1250, 525, cen, 'left');
    tag(ctx, '1 à 2 mm', 960, 870, C.goud, q.on('millimeter') * (1 - dr));
    vraagteken(ctx, 1560, 820, q.on('Welke'), 110);
  },
  s11(ctx, t, q) { bg(ctx, 'micro');
    const g = q.on('Antwoord', 1, 1.0);
    lobje(ctx, 960, 500, 300, 1, { t, bloed: 1, gal: g, cellen: 1, driehoek: 1, centraal: 1 });
    tag(ctx, 'bloed → midden', 420, 300, C.koraal, q.on('midden')); tag(ctx, 'gal → hoeken', 1500, 300, GAL, q.on('hoeken', 1));
    tag(ctx, 'twee stromen, elk hun eigen kant op', 960, 870, C.groen, q.on('Twee'));
  },

  // ---------- H2 ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    const f = q.on('fabriek', 1, 1.2); leverVorm(ctx, 960, 460, 640, 360, 1 - f);
    if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; afdelingen(ctx, -1, 1, 4, 330); for (let i = 0; i < 4; i++) { const r = ramp(t, q.at('vier') + i * 0.2, 0.4); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; roundRect(ctx, 148 + i * 410, 420, 394, 300, 20); shape(ctx, rgba(C.fill, 0.35), C.line, 1.2); ctx.restore(); } } ctx.restore(); }
    for (let i = 0; i < 6; i++) { const w = wander(i, t, 8, 1.3); glucose(ctx, 700 + i * 90 + w.x, 300 + w.y, 11, (1 - f) * q.on('glucose')); }
  },
  s13(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 0); paneel(ctx);
    const h = q.on('haalt', 1, 1.0), k = q.on('koppelt', 1, 1.2), kn = q.on('knipt', 1, 1.2), af = q.on('geeft', 1, 1.0), g100 = q.on('honderd'), mz = q.on('melkzuur', 1, 0.8);
    metaText(ctx, 'BLOED', 320, 320, C.grain, 'center', 24); metaText(ctx, 'LEVERCEL', 1100, 320, C.grain, 'center', 24);
    roundRect(ctx, 200, 340, 240, 440, 16); shape(ctx, rgba(ZARM, 0.18), rgba(ZARM, 0.6), 1.5); roundRect(ctx, 620, 340, 980, 440, 16); shape(ctx, rgba(C.oker, 0.12), rgba(C.oker, 0.6), 1.5);
    const fase = kn > 0.5 ? 1 : 0; // 0 = na maaltijd (opslaan), 1 = tussen maaltijden (afgeven)
    for (let i = 0; i < 10; i++) { const w = wander(i, t, 8, 1.3); glucose(ctx, 240 + hash(i * 3) * 160 + w.x, 380 + hash(i * 3 + 1) * 360 + w.y, 10, fase ? 0.5 : 1); }
    // pijlen
    arrow(ctx, 460, 500, 600, 500, V.kh, h * (1 - kn), 3); arrow(ctx, 600, 620, 460, 620, V.kh, af, 3);
    if (h > 0.01) particleFlow(ctx, fase ? [[600, 620], [460, 620]] : [[460, 500], [600, 500]], 4, t, 90, V.kh, 6, 2, 1);
    glycogen(ctx, 1000, 560, 2.2 * Math.max(0.2, k * (1 - 0.5 * kn)), k);
    text(ctx, 'glycogeen', 1100, 740, fTekst(34, 600), C.text, 'center'); ctx.save(); ctx.globalAlpha *= q.on('voorraadstof'); metaText(ctx, 'VOORRAADSTOF · VERTAKTE KETEN', 1100, 775, C.grain, 'center', 22); ctx.restore();
    tag(ctx, '≈ 100 g · een nacht', 1100, 420, C.goud, g100);
    tag(ctx, 'melkzuur → glucose', 1100, 870, C.koraal, mz);
    tag(ctx, fase ? 'tussen de maaltijden: afgeven' : 'na de maaltijd: opslaan', 320, 870, C.goud, Math.max(h, kn) > 0.01 ? 1 : 0);
  },
  s14(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 1); paneel(ctx);
    const e = q.on('eiwitten', 1, 1.2), om = q.on('andere', 1, 1.0), tv = q.on('meer', 1, 0.8);
    metaText(ctx, 'AMINOZUREN UIT DE KAAS', 420, 320, C.grain, 'center', 24);
    for (let i = 0; i < 9; i++) { const w = wander(i, t, 8, 1.3); aminozuur(ctx, 300 + hash(i * 3) * 240 + w.x, 380 + hash(i * 3 + 1) * 300 + w.y, 10, [0, 5, 9, 14, 3][i % 5]); }
    arrow(ctx, 600, 520, 760, 520, C.line, e, 2.5);
    if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e; proteinChain(ctx, coilPath(820, 520, 14, 26, 36, 0.6), [0, 5, 9, 14, 3, 0, 5, 9, 14, 3, 0, 5, 9, 14], 11); text(ctx, 'eiwitten, bijvoorbeeld in je bloedplasma', 1050, 660, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    if (om > 0.01) { ctx.save(); ctx.globalAlpha *= om; aminozuur(ctx, 1500, 400, 12, 3); arrow(ctx, 1520, 400, 1600, 400, C.line, 1, 2); aminozuur(ctx, 1630, 400, 12, 9); metaText(ctx, 'ANDERE AMINOZUREN', 1560, 450, C.grain, 'center', 22); ctx.restore(); }
    if (tv > 0.01) { ctx.save(); ctx.globalAlpha *= tv; for (let i = 0; i < 14; i++) { const w = wander(i + 30, t, 6, 1.2); aminozuur(ctx, 1250 + hash(i * 7) * 400 + w.x, 720 + hash(i * 7 + 1) * 80 + w.y, 9, [0, 5, 9, 14, 3][i % 5]); } metaText(ctx, 'TE VEEL', 1450, 690, C.grain, 'center', 22); ctx.restore(); }
    vraagteken(ctx, 1700, 760, q.on('Waar'), 110);
  },
  s16(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 1); paneel(ctx);
    const a = q.on('Antwoord', 1, 0.8), u = q.on('elkaar', 1, 1.0), ur = q.on('ureum', 1, 0.8), ni = q.on('nieren', 1, 1.0), rest = q.on('brandstof', 1, 1.0), sl = q.on('slecht', 1, 1.0);
    const na = q.on('Antwoord'); if (na > 0.01 && u < 0.5) { ctx.save(); ctx.globalAlpha *= na * (1 - u * 2); metaText(ctx, 'GEEN VOORRAADSTOF', 420, 320, C.grain, 'center', 24); glycogen(ctx, 360, 480, 1.6, 1); strike(ctx, 260, 600, 560, C.koraal, 1); text(ctx, 'glucose wel, aminozuren niet', 420, 700, fTekst(28), C.text2, 'center'); ctx.restore(); }
    // aminozuur uit elkaar
    const ax = 760, ay = 480; aminozuur(ctx, ax, ay, 16, 3, 1 - u); ureumIcoon(ctx, ax - 30 * u, ay - 60 * u, u, 14); ctx.save(); ctx.globalAlpha *= u; ctx.beginPath(); ctx.arc(ax + 30 * u, ay + 40 * u, 14, 0, 6.283); shape(ctx, rgba(C.oker, 0.5), C.oker, 1.4); ctx.restore();
    label(ctx, 'stikstofdeel', 'wordt ureum', ax - 30, ay - 70, 700, 330, ur);
    if (ni > 0.01) { ctx.save(); ctx.globalAlpha *= ni; arrow(ctx, 820, 400, 1180, 400, C.paars, 1, 2.5); nierIcoon(ctx, 1260, 400, 1, 1); particleFlow(ctx, [[820, 400], [1180, 400]], 4, t, 90, C.paars, 6, 4, 1); text(ctx, 'ureum → urine', 1000, 360, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    if (rest > 0.01) { ctx.save(); ctx.globalAlpha *= rest; arrow(ctx, 820, 560, 1180, 620, C.oker, 1, 2.5); text(ctx, 'de rest: brandstof, of vet', 1340, 640, fTekst(30, 600), C.text, 'left'); triglyceride(ctx, 1600, 700, 0.8, 1); ctx.restore(); }
    tag(ctx, 'slechte lever: minder ureum, stikstofafval in het bloed', 960, 870, C.koraal, sl);
  },
  s17(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 1); paneel(ctx);
    const d = q.on('deaminering', 1, 1.0), am = q.on('ammoniak', 1, 0.8), gif = q.on('giftig', 1, 0.8), kop = q.on('koppelt', 1, 1.2), ur = q.on('ureum', 2, 0.8);
    const ax = 420, ay = 520; aminozuur(ctx, ax, ay, 18, 3, 1); ctx.save(); ctx.globalAlpha *= 1 - d; ctx.beginPath(); ctx.arc(ax + 34, ay - 20, 11, 0, 6.283); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.4); ctx.restore();
    label(ctx, 'aminogroep', '–NH₂', ax + 34, ay - 20, 500, 340, 1 - d, C.text, 'left');
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; arrow(ctx, ax + 60, ay - 40, 640, 400, C.paars, 1, 2); ctx.beginPath(); ctx.arc(700, 390, 16, 0, 6.283); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.6); text(ctx, 'NH₃', 700, 397, fMeta(18), C.text, 'center'); text(ctx, 'ammoniak', 700, 340, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'giftig', 700, 470, C.koraal, gif * (1 - kop));
    if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; const cx = 1180, cy = 480; [[-70, -30], [70, -30]].forEach(o => { ctx.beginPath(); ctx.arc(cx + o[0], cy + o[1], 16, 0, 6.283); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.6); text(ctx, 'NH₂', cx + o[0], cy + o[1] + 6, fMeta(16), C.text, 'center'); });
      ctx.beginPath(); ctx.arc(cx, cy + 30, 18, 0, 6.283); shape(ctx, rgba(C.text2, 0.4), C.text2, 1.6); text(ctx, 'CO₂', cx, cy + 36, fMeta(16), C.text, 'center');
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx - 54, cy - 24); ctx.lineTo(cx - 10, cy + 18); ctx.moveTo(cx + 54, cy - 24); ctx.lineTo(cx + 10, cy + 18); ctx.stroke();
      text(ctx, '2 NH₃ + CO₂ → ureum', cx, 600, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'ureum: minder giftig, lost op in water', 1180, 700, C.groen, ur);
    tag(ctx, 'veilig naar de nieren', 1180, 870, C.paars, q.on('veilig'));
  },
  s18(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 2); paneel(ctx);
    const a = q.on('Alcohol', 1, 0.8); metaText(ctx, 'IN HET BLOED', 960, 320, C.grain, 'center', 24);
    molecuul(ctx, 560, 500, C.koraal, a, 3, 20); text(ctx, 'alcohol', 560, 600, fTekst(30, 600), C.text, 'center');
    molecuul(ctx, 960, 500, C.teal, q.on('medicijnen', 1, 0.8), 4, 20); text(ctx, 'medicijnen', 960, 600, fTekst(30, 600), C.text, 'center');
    molecuul(ctx, 1360, 500, C.text2, q.on('afvalstoffen', 1, 0.8), 2, 20); text(ctx, 'afvalstoffen', 1360, 600, fTekst(30, 600), C.text, 'center');
    vraagteken(ctx, 960, 790, q.on('Hoe'), 110);
  },
  s20(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 2); paneel(ctx);
    const z = q.on('zeef', 1, 0.8), kl = q.on('nauwelijks', 1, 0.8), ue = q.on('breekt', 1, 1.0), md = q.on('Medicijnen', 1, 1.0), pl = q.on('plakt', 1, 1.0), ni = q.on('nieren', 1, 0.8), me = q.on('meters', 1, 1.0), gr = q.on('grens', 1, 0.8), tp = q.on('tussenproduct', 1, 0.8);
    // links: zeef faalt
    if (z > 0.01 && ue < 0.5) { ctx.save(); ctx.globalAlpha *= z * (1 - ue * 2); zeef(ctx, 420, 520, 300, 1); molecuul(ctx, 340, 430, C.koraal, 1, 3, 12); molecuul(ctx, 480, 610, C.koraal, kl, 3, 12); waterMol(ctx, 440, 440, 13, 1); strike(ctx, 260, 520, 580, C.koraal, kl); text(ctx, 'zeven lukt niet', 420, 700, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    // midden: ombouwen
    if (ue > 0.01) { ctx.save(); ctx.globalAlpha *= ue * (1 - md); molecuul(ctx, 700, 500, C.koraal, 1, 3, 18); metaText(ctx, 'ALCOHOL', 700, 560, C.grain, 'center', 22); arrow(ctx, 790, 500, 880, 500, C.line, 1, 2);
      metaText(ctx, 'CO₂ + H₂O', 1000, 508, C.grain, 'center', 26); metaText(ctx, 'STAP VOOR STAP AFGEBROKEN', 1000, 560, C.grain, 'center', 20); ctx.restore(); }
    if (md > 0.01) { ctx.save(); ctx.globalAlpha *= md; molecuul(ctx, 700, 500, C.paars, 1, 3, 18); metaText(ctx, 'MEDICIJN · AFVALSTOF', 700, 560, C.grain, 'center', 20); arrow(ctx, 790, 500, 880, 500, C.line, 1, 2);
      ctx.beginPath(); ctx.arc(950, 500, 18, 0, 6.283); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.4); ctx.beginPath(); ctx.arc(1010, 526, 18, 0, 6.283); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.4);
      ctx.globalAlpha *= pl; ctx.beginPath(); ctx.arc(1050, 486, 13, 0, 6.283); shape(ctx, rgba(C.teal, 0.8), C.teal, 1.2); metaText(ctx, 'LOST OP IN WATER', 1000, 600, C.grain, 'center', 22); ctx.restore(); }
    if (ni > 0.01) { ctx.save(); ctx.globalAlpha *= ni; arrow(ctx, 1080, 500, 1200, 500, C.teal, 1, 2.5); nierIcoon(ctx, 1280, 500, 1, 1); ctx.restore(); }
    tag(ctx, 'ontgiften: ombouwen, niet zeven', 960, 700, C.groen, q.on('ontgiften') * (1 - me));
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me * Math.max(0, 1 - gr * 3); meter(ctx, 1440, 620, 0.7, 'LEVERSLAGADER', C.koraal, 1, 160); meter(ctx, 1660, 620, 0.3, 'LEVERADER', C.koraal, 1, 160); metaText(ctx, 'ALCOHOL', 1550, 420, C.grain, 'center', 22); ctx.restore(); }
    if (gr > 0.34) { ctx.save(); ctx.globalAlpha *= (gr - 0.34) / 0.66; roundRect(ctx, 1380, 400, 300, 110, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, 'paracetamol', 1530, 445, fTekst(30, 600), C.text, 'center'); metaText(ctx, 'MAX. DOSIS OP HET DOOSJE', 1530, 485, C.grain, 'center', 20);
      ctx.globalAlpha *= tp; molecuul(ctx, 1530, 600, C.koraal, 1, 2, 11); text(ctx, 'giftig tussenproduct', 1530, 660, fTekst(28, 600), C.koraal, 'center'); ctx.restore(); }
    tag(ctx, 'beschadigt de levercellen zelf', 1530, 870, C.koraal, q.on('beschadigt'));
  },
  s21(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 3); paneel(ctx);
    const gb = q.on('galblaas', 1, 1.0), tw = q.on('twaalfvingerige', 1, 0.8), en = q.on('enzym', 1, 0.8), gz = q.on('galzouten', 1, 1.0), tr = q.on('terug', 1, 1.2), uit = q.on('cholesterol', 1, 1.0), kl = q.on('kleurstof', 1, 1.0);
    leverVorm(ctx, 480, 440, 300, 180, 1); text(ctx, 'lever', 460, 450, fTekst(30, 600), C.text, 'center');
    galblaasIcoon(ctx, 540, 560, 1, gb); if (gb > 0.01) { ctx.save(); ctx.globalAlpha *= gb; text(ctx, 'galblaas', 640, 570, fTekst(28, 600), C.text, 'left'); ctx.restore(); }
    const darmPad = [[560, 600], [700, 700], [1000, 720], [1400, 700]]; buisPad(ctx, darmPad, 44, tw, V.neutraal, C.fill, { seed: 4, glad: true }); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; metaText(ctx, 'TWAALFVINGERIGE DARM', 760, 780, C.grain, 'center', 22); metaText(ctx, 'DUNNE DARM', 1300, 780, C.grain, 'center', 22); ctx.restore(); }
    vat(ctx, [[520, 520], [560, 600], [640, 680]], GAL, 7, Math.max(gb, 0.01)); if (gb > 0.01) particleFlow(ctx, [[520, 520], [560, 600], [640, 680]], 4, t, 60, GAL, 5, 2, gb);
    tag(ctx, '½ – 1 liter per dag', 300, 320, GAL, q.on('liter'));
    tag(ctx, 'geen enzym · enzymen uit de alvleesklier', 1100, 420, C.koraal, en * (1 - gz));
    if (gz > 0.01) { ctx.save(); ctx.globalAlpha *= gz; for (let i = 0; i < 5; i++) { const w = wander(i, t, 5, 1.2); ctx.beginPath(); ctx.arc(780 + i * 36 + w.x, 710 + w.y, 6, 0, 6.283); shape(ctx, rgba(V.neutraal, 0.7), V.neutraal, 1); } triglyceride(ctx, 980, 700, 0.5, 1, 0.6); text(ctx, 'galzouten emulgeren vet', 1000, 640, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    if (tr > 0.01) { ctx.save(); ctx.globalAlpha *= tr; vat(ctx, [[1400, 690], [1500, 560], [1200, 380], [620, 400]], ZARM, 7, 1, [12, 10]); particleFlow(ctx, gladC([[1400, 690], [1500, 560], [1200, 380], [620, 400]]), 6, t, 110, V.neutraal, 5, 8, 1); text(ctx, 'via de poortader terug', 1250, 350, fTekst(28, 600), lighten(ZARM, 0.4), 'center'); ctx.restore(); }
    tag(ctx, 'ook uitscheiden: cholesterol, hormonen, medicijnen', 1150, 870, C.goud, uit * (1 - kl));
    if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; bili(ctx, 1640, 460, 1, 18, 0); text(ctx, 'een gele kleurstof', 1640, 520, fTekst(30, 600), BILI, 'center'); ctx.restore(); }
  },
  s22(ctx, t, q) { bg(ctx, 'schema'); afdelingen(ctx, 4, 1, 5); paneel(ctx);
    const v = q.on('vet', 2, 0.8), lp = q.on('lipoproteïnen', 1, 1.0), ldl = q.on('LDL', 1, 1.0), hdl = q.on('HDL', 1, 1.0);
    leverVorm(ctx, 420, 520, 300, 180, 1); text(ctx, 'lever', 400, 530, fTekst(30, 600), C.text, 'center');
    roundRect(ctx, 1380, 400, 260, 240, 20); shape(ctx, rgba(C.oker, 0.15), C.oker, 1.5); text(ctx, 'cellen', 1510, 530, fTekst(30, 600), C.text, 'center');
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v * (1 - lp); triglyceride(ctx, 800, 520, 0.8, 1, 0.3); text(ctx, 'vet lost niet op in bloed', 900, 640, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    if (lp > 0.01) { ctx.save(); ctx.globalAlpha *= lp; chylomicron(ctx, 800, 500, 34, 1); label(ctx, 'lipoproteïne', 'vet + cholesterol, eiwitjasje', 830, 480, 900, 360, 1); ctx.restore(); }
    if (ldl > 0.01) { ctx.save(); ctx.globalAlpha *= ldl; arrow(ctx, 600, 470, 1360, 470, C.koraal, 1, 3); particleFlow(ctx, [[600, 470], [1360, 470]], 5, t, 120, C.koraal, 7, 3, 1); text(ctx, 'LDL: lever → cellen', 980, 440, fTekst(30, 600), C.koraal, 'center'); ctx.restore(); }
    if (hdl > 0.01) { ctx.save(); ctx.globalAlpha *= hdl; arrow(ctx, 1360, 590, 600, 590, C.groen, 1, 3); particleFlow(ctx, [[1360, 590], [600, 590]], 5, t, 120, C.groen, 7, 9, 1); text(ctx, 'HDL: cellen → lever', 980, 640, fTekst(30, 600), C.groen, 'center'); ctx.restore(); }
    tag(ctx, 'dezelfde stof, andere richting', 960, 760, C.goud, q.on('dezelfde'));
    tag(ctx, 'veel LDL: cholesterol naar de vaatwand', 960, 870, C.koraal, q.on('vaatwand'));
  },

  // ---------- H3 ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    biliRoute(ctx, { t, afbraak: q.on('afgebroken', 1, 1.0), ijzer: q.on('ijzer', 1, 1.0), eiwit: q.on('eiwitdeel', 1, 1.0), geel: q.on('gele', 1, 1.0), plak: q.on('plakt', 1, 1.0), galS: q.on('gal', 1, 1.0), darm: q.on('darm', 1, 0.8), bruin: q.on('bruine', 1, 1.0) });
    tag(ctx, 'lost slecht op in water', 560, 290, C.koraal, q.on('slecht') * (1 - q.on('plakt')));
    tag(ctx, 'darmbacteriën → bruin', 1420, 870, '#8C5A3A', q.on('bruine'));
  },
  s24(ctx, t, q) { bg(ctx, 'schema');
    biliRoute(ctx, { t, afbraak: 1, ijzer: 0, eiwit: 0, geel: 1, plak: 1, galS: 1, darm: 1, bruin: 0, steen: q.on('galsteen', 1, 1.0) });
    vraagteken(ctx, 1420, 820, q.on('Welke'), 110);
  },
  s26(ctx, t, q) { bg(ctx, 'schema');
    const a = q.on('Antwoord', 1, 1.0), tr = q.on('terug', 1, 1.0);
    biliRoute(ctx, { t, afbraak: 1, ijzer: 0, eiwit: 0, geel: 1, plak: 1, galS: 1, darm: 1, bruin: a, steen: 1, terug: tr });
    tag(ctx, 'geelzucht', 1420, 200, BILI, q.on('terug', 1, 1.0));
  },
  s27(ctx, t, q) { bg(ctx, 'macro');
    const ba = q.on('baby', 1, 0.8), veel = q.on('veel', 1, 1.0), af = q.on('afgebroken', 1, 1.0), enz = q.on('enzym', 1, 1.0), huid = q.on('huid', 1, 1.5), c = q.on('antwoord', 1, 0.8), weg = q.on('vanzelf', 1, 2.0), licht = q.on('blauw', 1, 1.0);
    const geel = clamp(huid - weg, 0, 1);
    baby(ctx, 600, 520, 1.25, 1, { geel, t, licht });
    // rechts: rode bloedcellen en bilirubine
    if (veel > 0.01) { ctx.save(); ctx.globalAlpha *= veel; metaText(ctx, 'EXTRA VEEL RODE BLOEDCELLEN', 1400, 200, C.grain, 'center', 24); for (let i = 0; i < 14; i++) { const w = wander(i, t, 6, 1.0); const dood = af * (hash(i * 11) < 0.7 ? 1 : 0); rodeBloedcel(ctx, 1180 + (i % 7) * 72 + w.x, 260 + Math.floor(i / 7) * 60 + w.y, 20, 1 - dood * 0.75); if (dood > 0.01) bili(ctx, 1180 + (i % 7) * 72 + w.x, 260 + Math.floor(i / 7) * 60 + w.y, dood, 8); } ctx.restore(); }
    if (enz > 0.01) { ctx.save(); ctx.globalAlpha *= enz; roundRect(ctx, 1180, 440, 480, 120, 16); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); text(ctx, 'enzym: bilirubine oplosbaar', 1420, 485, fTekst(28, 600), C.text, 'center'); roundRect(ctx, 1210, 505, 300, 30, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 1.2); roundRect(ctx, 1214, 509, Math.max(6, 292 * (0.03 + 0.97 * weg)), 22, 6); ctx.fillStyle = C.groen; ctx.fill(); metaText(ctx, weg > 0.5 ? 'OP STERKTE' : 'EEN PAAR %', 1530, 528, C.grain, 'left', 22); ctx.restore(); }
    tag(ctx, 'in het bloed → huid en oogwit', 1420, 640, BILI, huid * (1 - weg));
    tag(ctx, 'antwoord c: afbraakproduct van haar eigen bloed', 960, 870, C.groen, c * (1 - licht));
    tag(ctx, 'blauw licht: oplosbaar zonder de lever', 960, 870, C.teal, licht);
  },

  // ---------- Recap ----------
  s28(ctx, t, q) { bg(ctx, 'macro');
    const w = q.on('vanzelf', 1, 2.0); baby(ctx, 600, 520, 1.25, 1, { geel: 0.8 * (1 - w), t });
    const r = q.on('rode', 1, 0.8); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; rodeBloedcel(ctx, 1200, 380, 28, 1); arrow(ctx, 1250, 380, 1340, 380, C.line, 1, 2); bili(ctx, 1380, 380, 1, 14); arrow(ctx, 1410, 380, 1500, 380, C.line, 1, 2); leverVorm(ctx, 1600, 400, 160, 100, 1); text(ctx, 'lever: nog te traag', 1560, 500, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'enzym op sterkte → geel verdwijnt', 1400, 700, C.groen, q.on('sterkte'));
  },
  s29(ctx, t, q) { bg(ctx, 'schema');
    leverSchema(ctx, { t, lever: 1, poort: 1, slag: 1, leverader: 1, hol: 1, hart: 1, aorta: 1, glu: q.on('glucose') * (1 - q.on('aminozuren')), labels: 1, darm: 1 });
    const g = q.on('glycogeen', 1, 0.8); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * Math.max(0, 1 - q.on('ureum', 1, 0.3) * 1.5); glycogen(ctx, 900, 440, 1.3, 1); ctx.restore(); }
    const u = Math.max(0, (q.on('ureum', 1, 0.8) - 0.4) / 0.6); if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u * (1 - q.on('lymfe')); for (let i = 0; i < 4; i++) ureumIcoon(ctx, 860 + i * 30, 420, 1, 10); text(ctx, '→ nieren', 1000, 428, fTekst(26, 600), C.text, 'left'); ctx.restore(); }
    const ly = q.on('lymfe', 1, 1.0); if (ly > 0.01) { ctx.save(); ctx.globalAlpha *= ly; vat(ctx, [[LS.darm[0], LS.darm[1] - 90], [500, 200], [1200, 110], [LS.hart[0], LS.hart[1] - 90]], LYMFE, 6, 1, [12, 10]); for (let k = 0; k < 6; k++) { const pts = gladC([[LS.darm[0], LS.darm[1] - 90], [500, 200], [1200, 110], [LS.hart[0], LS.hart[1] - 90]]); const u2 = (t * 0.08 + k / 6) % 1; const p = pts[Math.floor(u2 * (pts.length - 1))]; chylomicron(ctx, p[0], p[1], 8, 1); } text(ctx, 'vet: via de lymfe en het hart het lichaam door', 760, 80, fTekst(28, 600), LYMFE, 'center'); ctx.restore(); }
    refCard(ctx, 'de dikke darm → film 6', 1380, 820, q.on('zes'));
  }
};

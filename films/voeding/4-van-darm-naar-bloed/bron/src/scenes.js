// Film 4 · Van darm naar bloed — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken ----------
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 1.2); text(ctx, txt, x + 30, y + 40, fTekst(36, 600), C.goud); ctx.restore(); }
function bigLine(ctx, s, x, y, a = 1, color = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, 600), color, align); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 58, 29); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function microVlak(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.clip(); ctx.globalAlpha = 0.5; grain(ctx); ctx.restore(); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
function glucose(ctx, x, y, r = 11, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(V.kh, 0.6), V.kh, 1.4, 0); ctx.restore(); }
function galactoseMol(ctx, x, y, r = 11, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(V.melk, 0.5), V.melk, 1.6, 0); ctx.fillStyle = V.kh; ctx.beginPath(); ctx.arc(x, y, r * 0.25, 0, 6.283); ctx.fill(); ctx.restore(); }
function aminozuur(ctx, x, y, r = 10, kind = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; bead(ctx, x, y, r, kind); ctx.restore(); }
function glycerolMol(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 7 * s, y - 24 * s, 14 * s, 48 * s, 6 * s); shape(ctx, V.vt, lighten(V.vt, 0.4), 1.2); ctx.restore(); }
function natrium(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 1.2); text(ctx, 'Na⁺', x, y + 6, fMeta(16), C.text, 'center'); ctx.restore(); }
// half klaslokaal: rechthoek met een paar tafels (Schema)
function klaslokaal(ctx, x, y, w, h, a = 1, half = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 8); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5);
  if (half) { ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke(); ctx.setLineDash([]); roundRect(ctx, x, y, w / 2, h, 8); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fill(); }
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { roundRect(ctx, x + 24 + i * (w / 4), y + 24 + j * (h / 3), w / 4 - 40, h / 3 - 40, 4); ctx.fillStyle = rgba(C.line, 0.35); ctx.fill(); }
  ctx.restore(); }
// gladde buis (Schema): horizontaal, met maatlijnen
function gladdeBuis(ctx, x0, x1, yc, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; buisPad(ctx, [[x0, yc], [(x0 + x1) / 2, yc], [x1, yc]], r * 2, 1, V.neutraal, C.fill, { glad: false }); ctx.restore(); }
function maat(ctx, x0, y0, x1, y1, txt, a = 1, side = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  const ang = Math.atan2(y1 - y0, x1 - x0); [[x0, y0], [x1, y1]].forEach(p => { ctx.beginPath(); ctx.moveTo(p[0] - Math.sin(ang) * 10, p[1] + Math.cos(ang) * 10); ctx.lineTo(p[0] + Math.sin(ang) * 10, p[1] - Math.cos(ang) * 10); ctx.stroke(); });
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2; text(ctx, txt, mx - Math.sin(ang) * 36 * side, my + Math.cos(ang) * 36 * side + 10, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
// plooienwand (Micro-zoom 1): golvende wand in doorsnede
function plooiWand(ctx, x0, x1, y, amp, a = 1, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x0, y + 160);
  for (let i = 0; i <= 120; i++) { const u = i / 120; const px = lerp(x0, x1, u); const py = y - amp * Math.pow(Math.max(0, Math.sin(u * Math.PI * n)), 0.8); ctx.lineTo(px, py); }
  ctx.lineTo(x1, y + 160); ctx.closePath(); shape(ctx, rgba(V.neutraal, 0.18), V.neutraal, 2.5); ctx.restore(); }
// vlokkenwand (Micro-zoom 2): rij vingervormige vlokken op een basis
function vlokkenRij(ctx, x0, x1, yBase, h, a = 1, n = 7, plat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const step = (x1 - x0) / n; const hh = h * (1 - plat * 0.85);
  ctx.fillStyle = rgba(V.neutraal, 0.18); ctx.fillRect(x0, yBase, x1 - x0, 120); ctx.strokeStyle = V.neutraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, yBase + 120); ctx.lineTo(x1, yBase + 120); ctx.stroke();
  for (let i = 0; i < n; i++) { const cx = x0 + (i + 0.5) * step, w = step * 0.55; ctx.beginPath(); ctx.moveTo(cx - w / 2, yBase + 2); ctx.lineTo(cx - w / 2, yBase - hh + w / 2); ctx.arc(cx, yBase - hh + w / 2, w / 2, Math.PI, 0); ctx.lineTo(cx + w / 2, yBase + 2); ctx.closePath(); shape(ctx, rgba(V.neutraal, 0.22), V.neutraal, 2);
    ctx.strokeStyle = BLOED; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx - w * 0.22, yBase); ctx.lineTo(cx - w * 0.22, yBase - hh + w * 0.6); ctx.moveTo(cx + w * 0.22, yBase); ctx.lineTo(cx + w * 0.22, yBase - hh + w * 0.6); ctx.stroke();
    ctx.strokeStyle = LYMFE; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, yBase); ctx.lineTo(cx, yBase - hh + w * 0.7); ctx.stroke(); }
  ctx.restore(); }
// deeltjes die door een wand gaan: n deeltjes per seconde op x = wand, lopen van links naar rechts
function doorWand(ctx, x, y0, y1, t, rate, teken, seed = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = Math.floor(rate * 3);
  for (let k = 0; k < n; k++) { const u = ((t * rate + hash(k + seed) * n) % n) / n; const yy = y0 + hash(k * 3 + seed) * (y1 - y0); teken(x - 120 + u * 240, yy + Math.sin(t * 3 + k) * 3); } ctx.restore(); }

// ---------- grote epitheelcel (H2) ----------
const CEL = { x: 420, y: 470, w: 1080, h: 330, mvh: 90 };
function lumen(ctx, a = 1) { ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'DARMHOLTE · VOEDSEL', 150, 160, C.grain, 'left', 26); metaText(ctx, 'BINNEN IN DE VLOK', 150, 870, C.grain, 'left', 26); ctx.restore(); }
// verdeling van glucose: nL in de holte (boven de microvilli), nC in de cel
function glucoseVerdeling(ctx, nL, nC, t, seed = 1) { for (let i = 0; i < nL; i++) { const w = wander(i + seed, t, 10, 1.5); glucose(ctx, 470 + hash(i * 7 + seed) * 980 + w.x, 190 + hash(i * 7 + seed + 1) * 150 + w.y); }
  for (let i = 0; i < nC; i++) { const w = wander(i + 40 + seed, t, 8, 1.2); glucose(ctx, 500 + hash(i * 5 + seed + 9) * 920 + w.x, 560 + hash(i * 5 + seed + 3) * 150 + w.y); } }
const TP = [560, 760, 960, 1160, 1360]; // x van de transporteiwitten op de top van de microvilli-zone

// ---------- routekaart (Schema, H3 en recap) ----------
function routeKaart(ctx, o = {}) { const { a = 1, bloed = 1, lymf = 1, lever = 1, hart = 1, deel = 1, labels = 1, t = 0, glu = 0, vet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // darm links, lever rechtsboven, hart rechtsboven hoger, lymfevat als omweg
  const D = [300, 620], L = [1000, 520], Ht = [1380, 300];
  // organen
  ctx.save(); ctx.globalAlpha *= lever; roundRect(ctx, L[0] - 110, L[1] - 60, 220, 120, 24); shape(ctx, rgba(C.bruin, 0.35), C.bruin, 2); text(ctx, 'lever', L[0], L[1] + 10, fTekst(36, 600), C.text, 'center'); ctx.restore();
  ctx.save(); ctx.globalAlpha *= hart; ctx.beginPath(); ctx.moveTo(Ht[0], Ht[1] + 60); ctx.bezierCurveTo(Ht[0] - 110, Ht[1] - 30, Ht[0] - 50, Ht[1] - 90, Ht[0], Ht[1] - 30); ctx.bezierCurveTo(Ht[0] + 50, Ht[1] - 90, Ht[0] + 110, Ht[1] - 30, Ht[0], Ht[1] + 60); ctx.closePath(); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 2); text(ctx, 'hart', Ht[0], Ht[1] + 110, fTekst(36, 600), C.text, 'center'); ctx.restore();
  darmvlok(ctx, D[0], D[1] + 200, 400, 180, 1, { cellen: 9, t });
  // poortader: vlok → lever
  const P = [[D[0] + 60, D[1] + 180], [500, 700], [800, 640], [L[0] - 110, L[1] + 20]];
  ctx.save(); ctx.globalAlpha *= bloed; ctx.strokeStyle = BLOED; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); gladC(P).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  if (labels) text(ctx, 'poortader', 650, 740, fTekst(32, 600), lighten(BLOED, 0.4), 'center');
  // lever → leverader → hart
  const P2 = [[L[0] + 110, L[1]], [1250, 480], [Ht[0] - 20, Ht[1] + 70]]; ctx.lineWidth = 7; ctx.beginPath(); gladC(P2).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  // lymfevat: vlok midden → omhoog → bovenste holle ader → hart
  const Ly = [[D[0], D[1] - 200], [D[0] - 20, 240], [700, 150], [1150, 140], [Ht[0] + 30, Ht[1] - 100]];
  ctx.save(); ctx.globalAlpha *= lymf; ctx.strokeStyle = LYMFE; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.setLineDash([14, 10]); ctx.beginPath(); gladC(Ly).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]);
  if (labels) { text(ctx, 'lymfevat', 700, 120, fTekst(32, 600), LYMFE, 'center'); text(ctx, 'bovenste holle ader', 1240, 110, fTekst(30, 600), lighten(BLOED, 0.4), 'center'); }
  ctx.restore();
  if (glu > 0.01) { particleFlow(ctx, gladC(P), 10, t, 140, V.kh, 7, 3, glu); particleFlow(ctx, gladC(P2), 6, t, 140, V.kh, 7, 7, glu * lever); }
  if (vet > 0.01) { const pts = gladC(Ly); ctx.save(); ctx.globalAlpha *= vet; const segs = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); tot += d; }
    for (let k = 0; k < 9; k++) { let d = (t * 120 + hash(k + 20) * tot) % tot; let i = 0; while (d > segs[i]) { d -= segs[i]; i++; } const u = d / segs[i]; chylomicron(ctx, lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u), 9, 1); } ctx.restore(); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { darmvlok(ctx, 1500, 900, 560, 240, 1, { t, cellen: 13 }); for (let i = 0; i < 6; i++) { const w = wander(i, t, 12, 1.5); glucose(ctx, 1320 + hash(i * 3) * 360 + w.x, 300 + hash(i * 3 + 1) * 80 + w.y, 11, 0.9); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'macro');
    const d = q.on('buis', 1, 2.5); lichaam(ctx, 520, 560, 0.95, 1, { darm: d });
    const m3 = q.on('drie'); if (m3 > 0.01) { ctx.save(); ctx.globalAlpha *= m3; roundRect(ctx, 760, 330, 180, 58, 29); shape(ctx, rgba(C.goud, 0.16), C.goud, 1.5); text(ctx, '≈ 3 m', 850, 370, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
    const k = q.on('Meet', 1, 1.0); const r = q.on('dertig', 1, 1.0);
    if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; metaText(ctx, 'BINNENKANT, ALLE PLOOITJES MEEGETELD', 1400, 300, C.grain, 'center', 26); ctx.restore(); }
    klaslokaal(ctx, 1080, 340, 640, 400, r, true); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; text(ctx, '≈ 30 m²', 1240, 820, fTitel(56), C.goud, 'center'); text(ctx, 'een half klaslokaal', 1560, 820, fTekst(34), C.text2, 'center'); ctx.restore(); }
    vraagteken(ctx, 520, 280, q.on('past'), 140);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'micro');
    const g = q.on('geknipt', 1, 1.2); broodje(ctx, 330, 300, 1, 1 - g * 0.65);
    const m = q.on('glucose', 1, 1.4); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; for (let i = 0; i < 6; i++) { const w = wander(i, t, 8, 1.2); glucose(ctx, 180 + i * 48 + w.x, 470 + w.y); } for (let i = 0; i < 6; i++) { const w = wander(i + 10, t, 8, 1.2); aminozuur(ctx, 180 + i * 48 + w.x, 560 + w.y, 10, [0, 5, 9, 14, 3, 18][i]); }
      glycerolMol(ctx, 200, 660, 0.8); fattyAcid(ctx, 240, 650, 80); fattyAcid(ctx, 240, 680, 80); ctx.restore(); }
    const w = q.on('darmwand'); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.fillStyle = rgba(V.neutraal, 0.22); ctx.fillRect(860, 150, 70, 720); ctx.strokeStyle = V.neutraal; ctx.lineWidth = 2; ctx.strokeRect(860, 150, 70, 720); metaText(ctx, 'DARMWAND', 895, 125, C.grain, 'center', 26);
      ctx.fillStyle = rgba(BLOED, 0.22); ctx.fillRect(1000, 150, 760, 720); metaText(ctx, 'BLOED', 1380, 125, C.grain, 'center', 26);
      doorWand(ctx, 895, 300, 760, t, 4, (x, y) => glucose(ctx, x, y, 10), 1, w); doorWand(ctx, 895, 300, 760, t, 3, (x, y) => aminozuur(ctx, x, y, 9, 5), 2, w); ctx.restore(); }
    tag(ctx, 'opname · resorptie', 1380, 820, C.goud, q.on('resorptie'));
    vraagteken(ctx, 1600, 500, q.on('eigenlijk'), 110);
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const b = q.on('gladde', 1, 1.0); gladdeBuis(ctx, 200, 1500, 400, 70, b);
    maat(ctx, 200, 520, 1500, 520, '3 m', q.on('Drie'), 1); maat(ctx, 1580, 330, 1580, 470, '2,5 cm', q.on('halve'), 1);
    const k = q.on('kwart', 1, 0.8); teller(ctx, 200, 620, 0.23, null, k); ctx.save(); ctx.globalAlpha *= k; text(ctx, 'een kwart vierkante meter', 410, 780, fTekst(32), C.text2, 'center'); ctx.restore();
    const a = q.on('A4'); for (let i = 0; i < 4; i++) a4(ctx, 760 + i * 100, 620, 1, ramp(t, q.at('A4') + i * 0.15, 0.4));
    const z = q.on('zes'); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; text(ctx, '6 m', 1500, 820, fTekst(44, 600), C.text2, 'center'); strike(ctx, 1440, 808, 1560, C.koraal, q.on('dood')); tag(ctx, 'gemeten na de dood', 1500, 880, C.koraal, q.on('dood')); ctx.restore(); }
  },
  s06(ctx, t, q) { bg(ctx, 'micro');
    const z1 = q.on('plooien', 1, 1.0), z2 = q.on('darmvlokken', 1, 1.0), z3 = q.on('epitheelcellen', 1, 1.0), z4 = q.on('microvilli', 1, 1.0);
    const stap = z4 > 0.5 ? 3 : z3 > 0.5 ? 2 : z2 > 0.5 ? 1 : z1 > 0.5 ? 0 : -1;
    // links: het huidige niveau; rechts: zoomcirkel naar het volgende
    const x0 = 120, x1 = 1000;
    if (stap <= 0) { ctx.save(); ctx.globalAlpha *= 1 - z2; plooiWand(ctx, x0, x1, 560, 140 * z1, 1); metaText(ctx, 'DARMWAND IN DOORSNEDE', 560, 180, C.grain, 'center', 26); ctx.restore(); }
    if (stap >= 0 && stap <= 1) { ctx.save(); ctx.globalAlpha *= z2 * (1 - z3); vlokkenRij(ctx, x0, x1, 620, 300, 1, 7); metaText(ctx, 'ÉÉN PLOOI, MET DARMVLOKKEN', 560, 180, C.grain, 'center', 26); ctx.restore(); }
    if (stap >= 1 && stap <= 2) { ctx.save(); ctx.globalAlpha *= z3 * (1 - z4); darmvlok(ctx, 560, 820, 560, 240, 1, { t, cellen: 11 }); metaText(ctx, 'ÉÉN DARMVLOK', 560, 180, C.grain, 'center', 26); label(ctx, 'epitheelcellen', 'één laag dekweefsel', 680, 420, 820, 560, 1); ctx.restore(); }
    if (stap >= 2) { ctx.save(); ctx.globalAlpha *= z4; epitheelcel(ctx, 260, 520, 600, 260, 1, { mv: 12, mvh: 110, t }); metaText(ctx, 'ÉÉN EPITHEELCEL', 560, 180, C.grain, 'center', 26); naamBij(ctx, 'microvilli', 'uitstulpingen van de cel', 800, 345, 1, 'center'); metaText(ctx, 'VOEDSEL', 300, 330, C.grain, 'left', 24); ctx.restore(); }
    // teller rechts
    const m2 = stap < 0 ? 0.23 : stap === 0 ? lerp(0.23, 0.37, z1) : stap === 1 ? lerp(0.37, 2.4, z2) : stap === 2 ? 2.4 : lerp(2.4, 30, z4);
    teller(ctx, 1180, 220, m2, null, 1, 560);
    const rows = [['plooien', '× 1,6', z1], ['darmvlokken', '', z2], ['microvilli', '× 60 tot 120', z4]];
    rows.forEach((r, i) => { ctx.save(); ctx.globalAlpha *= r[2]; text(ctx, r[0], 1200, 420 + i * 60, fTekst(34, 600), C.text, 'left'); text(ctx, r[1], 1720, 420 + i * 60, fTekst(34), C.goud, 'right'); ctx.restore(); });
    tag(ctx, 'meer dan honderd keer zo groot', 1460, 700, C.groen, q.on('honderd'));
    const c = q.on('optie'); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; text(ctx, 'c', 1460, 790, fTitel(80), C.goud, 'center'); ctx.restore(); }
    const tv = q.on('tennisveld'); if (tv > 0.01) { ctx.save(); ctx.globalAlpha *= tv; text(ctx, 'tennisveld · 250 m²', 1460, 850, fTekst(32), C.text2, 'center'); strike(ctx, 1300, 840, 1620, C.koraal, q.on('Nieuwere')); ctx.restore(); }
  },
  s07(ctx, t, q) { bg(ctx, 'micro');
    const g = q.on('groter'); darmvlok(ctx, 420, 860, 600, 250, 1, { t, cellen: 11 });
    if (g > 0.01) { for (let i = 0; i < 10; i++) { const u = (t * 0.35 + hash(i) ) % 1; const ang = Math.PI + u * Math.PI; const r = 125 + 60 * (1 - u); const px = 420 + Math.cos(ang) * 0.3 * r + (u - 0.5) * 240, py = 480 - Math.abs(Math.sin(ang)) * 0 + (0.5 - u) * 0 + 260 - u * 300; glucose(ctx, 180 + hash(i * 3) * 480, 180 + hash(i * 3 + 1) * 120 + Math.sin(t * 2 + i) * 6, 10, g); } }
    const c = q.on('coeliakie', 1, 1.0), p = q.on('korter', 1, 1.6);
    if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; metaText(ctx, 'COELIAKIE', 1300, 180, C.grain, 'center', 26); vlokkenRij(ctx, 980, 1640, 700, 300, 1, 5, p); tag(ctx, 'gluten', 1300, 260, C.koraal, q.on('gluten')); ctx.restore(); }
    metaText(ctx, 'GEZOND', 420, 180, C.grain, 'center', 26);
    vraagteken(ctx, 1300, 560, q.on('Wat'), 120);
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    const b = q.on('Antwoord', 1, 0.8);
    vlokkenRij(ctx, 160, 820, 560, 300, b, 6, 0); vlokkenRij(ctx, 1100, 1760, 560, 300, b, 6, 0.9);
    metaText(ctx, 'VLOKKEN', 490, 180, C.grain, 'center', 26); metaText(ctx, 'PLATTE VLOKKEN', 1430, 180, C.grain, 'center', 26);
    doorWand(ctx, 490, 240, 520, t, 5, (x, y) => glucose(ctx, x, y, 9), 1, b * 0.9); doorWand(ctx, 1430, 240, 520, t, 1, (x, y) => glucose(ctx, x, y, 9), 2, b * 0.9);
    text(ctx, 'veel opname', 490, 760, fTekst(36, 600), C.groen, 'center'); text(ctx, 'weinig opname', 1430, 760, fTekst(36, 600), C.koraal, 'center');
    tag(ctx, 'tekorten, afvallen', 1430, 840, C.koraal, q.on('tekorten') * (1 - q.on('chirurg')));
    const k = q.on('chirurg', 1, 0.8); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, 900, 790, 820, 80, 14); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.2); text(ctx, 'kortere darm: minder oppervlak', 960, 842, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
    tag(ctx, 'en minder tijd', 1430, 920, C.koraal, q.on('tijd'));
  },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'micro'); lumen(ctx);
    epitheelcel(ctx, CEL.x, CEL.y, CEL.w, CEL.h, 1, { mv: 14, mvh: CEL.mvh, t });
    const v = q.on('volgen', 1, 0.8); const later = q.on('tijdje', 1, 2.0);
    const nL = Math.round(lerp(14, 3, later)), nC = Math.round(lerp(2, 9, later));
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; glucoseVerdeling(ctx, nL, nC, t); ctx.restore(); }
    // held: één gouden glucose
    const held = q.on('volgen', 1, 0.6); if (held > 0.01) { ctx.save(); ctx.globalAlpha *= held; ctx.shadowColor = C.goud; ctx.shadowBlur = 14; hexagon(ctx, 960, 330 + Math.sin(t * 1.5) * 6, 13, rgba(C.goud, 0.7), C.goud, 1.6, 0); ctx.restore(); }
    const tp = q.on('transporteiwitten', 1, 1.0); TP.forEach((x, i) => transporteiwit(ctx, x, CEL.y - CEL.mvh + 8, 1, tp, { col: C.enzym, open: 0.4 }));
    label(ctx, 'transporteiwit', 'in het celmembraan', TP[4] + 16, CEL.y - CEL.mvh, 1530, 300, tp);
    const dif = q.on('diffusie', 1, 1.0); if (dif > 0.01) { ctx.save(); ctx.globalAlpha *= dif * (1 - later); arrow(ctx, 760, 300, 760, 520, V.kh, 1, 3); arrow(ctx, 1160, 300, 1160, 520, V.kh, 1, 3); ctx.restore(); tag(ctx, 'diffusie: van veel naar weinig', 960, 870, V.kh, dif * (1 - later)); }
    tag(ctx, 'nu minder in de darm dan in de cel', 960, 870, C.koraal, later);
  },
  s11(ctx, t, q) { bg(ctx, 'micro'); lumen(ctx); epitheelcel(ctx, CEL.x, CEL.y, CEL.w, CEL.h, 1, { mv: 14, mvh: CEL.mvh, t }); glucoseVerdeling(ctx, 3, 9, t);
    TP.forEach((x) => transporteiwit(ctx, x, CEL.y - CEL.mvh + 8, 1, 1, { col: C.enzym, open: 0.4 })); vraagteken(ctx, 960, 330, q.on('Wat'), 120); },
  s13(ctx, t, q) { bg(ctx, 'micro'); lumen(ctx); epitheelcel(ctx, CEL.x, CEL.y, CEL.w, CEL.h, 1, { mv: 14, mvh: CEL.mvh, t });
    const act = q.on('toch', 1, 1.0); const uit = q.on('onderkant', 1, 1.5);
    glucoseVerdeling(ctx, Math.round(lerp(3, 0, act)), 9, t);
    TP.forEach((x, i) => transporteiwit(ctx, x, CEL.y - CEL.mvh + 8, 1, 1, { col: C.enzym, open: 0.4 + 0.4 * act * (i % 2), actief: act > 0.5 && i % 2 === 1 }));
    // drie glucose worden naar binnen getrokken (tegen het verschil in)
    for (let i = 0; i < 3; i++) { const u = clamp((t - q.at('toch') - i * 0.5) / 1.6, 0, 1); if (u <= 0 || u >= 1) continue; const x = TP[1 + i * 2 - (i === 2 ? 1 : 0)]; glucose(ctx, x, lerp(330, 560, u), 11); }
    tag(ctx, 'actief transport · kost energie', 960, 870, C.goud, q.on('actief') * (1 - q.on('water')));
    naamBij(ctx, 'ATP', 'energie', TP[1], CEL.y - CEL.mvh - 62, q.on('energie') * (1 - q.on('water')), 'center', C.goud);
    const w = q.on('water', 1, 1.0); if (w > 0.01) { for (let i = 0; i < 8; i++) { const u = ((t * 0.5 + hash(i + 30)) % 1); waterMol(ctx, 640 + i * 90 + Math.sin(t + i) * 4, lerp(300, 600, u), 8, w * (u < 0.1 ? u * 10 : u > 0.9 ? (1 - u) * 10 : 1)); } tag(ctx, 'water volgt: osmose', 960, 870, C.teal, w * (1 - uit)); }
    if (uit > 0.01) { for (let i = 0; i < 5; i++) { const u = ((t * 0.6 + hash(i + 50)) % 1); glucose(ctx, 560 + i * 200, lerp(700, 880, u), 10, uit * (u > 0.85 ? (1 - u) * 6 : 1)); } tag(ctx, 'de cel uit, de vlok in', 960, 870, C.groen, uit); }
  },
  s14(ctx, t, q) { bg(ctx, 'micro'); lumen(ctx); epitheelcel(ctx, CEL.x, CEL.y, CEL.w, CEL.h, 1, { mv: 14, mvh: CEL.mvh, t });
    const vorm = q.on('vorm', 1, 0.8), aa = q.on('aminozuur', 1, 0.8), ga = q.on('galactose', 1, 0.8), na = q.on('natrium', 1, 0.8), pomp = q.on('natrium-kaliumpomp', 1, 0.8);
    const y = CEL.y - CEL.mvh + 8;
    transporteiwit(ctx, 660, y, 1.1, vorm, { col: C.enzym, open: 0.5 }); glucose(ctx, 660, y - 60 + Math.sin(t * 2) * 4, 11, vorm); ctx.save(); ctx.globalAlpha *= vorm; metaText(ctx, 'glucose', 620, y - 110, C.grain, 'center', 24); ctx.restore();
    transporteiwit(ctx, 1120, y, 1.1, aa, { col: lighten(C.enzym, -0.15), open: 0.3 }); aminozuur(ctx, 1120, y - 60 + Math.sin(t * 2 + 1) * 4, 10, 9, aa); ctx.save(); ctx.globalAlpha *= aa; metaText(ctx, 'aminozuur', 1120, y - 110, C.grain, 'center', 24); ctx.restore();
    galactoseMol(ctx, 700, y - 60 + Math.sin(t * 2 + 2) * 4, 11, ga); ctx.save(); ctx.globalAlpha *= ga; metaText(ctx, '+ galactose', 790, y - 110, C.grain, 'center', 24); ctx.restore();
    natrium(ctx, 620, y - 24 + Math.sin(t * 2.5) * 4, na); if (na > 0.01) { ctx.save(); ctx.globalAlpha *= na; arrow(ctx, 640, y + 40, 640, y + 110, C.koraal, 1, 2.5); ctx.restore(); }
    if (pomp > 0.01) { ctx.save(); ctx.globalAlpha *= pomp; transporteiwit(ctx, 1300, CEL.y + CEL.h, 1.1, 1, { col: C.koraal, open: 0.3, rot: Math.PI, actief: true }); arrow(ctx, 1300, CEL.y + CEL.h - 60, 1300, CEL.y + CEL.h + 70, C.koraal, 1, 2.5); natrium(ctx, 1300, CEL.y + CEL.h + 100, 1); label(ctx, 'natrium-kaliumpomp', 'kost ATP', 1320, CEL.y + CEL.h, 1560, 780, 1); ctx.restore(); }
    tag(ctx, 'glucose mee met natrium', 660, 870, C.koraal, na * (1 - pomp));
    vraagteken(ctx, 1500, 300, q.on('Wat'), 110);
  },
  s16(ctx, t, q) { bg(ctx, 'micro'); lumen(ctx); epitheelcel(ctx, CEL.x, CEL.y, CEL.w, CEL.h, 1, { mv: 14, mvh: CEL.mvh, t });
    const a = q.on('Antwoord', 1, 0.6), d = q.on('dikke', 1, 1.0), lac = q.on('Melksuiker', 1, 0.8), fr = q.on('fructose', 1, 0.8);
    const y = CEL.y - CEL.mvh + 8; transporteiwit(ctx, 760, y, 1.1, 1, { col: C.enzym, open: 0 }); strike(ctx, 720, y, 800, C.koraal, a);
    for (let i = 0; i < 6; i++) { const w = wander(i + 70, t, 8, 1.3); (i % 2 ? glucose : galactoseMol)(ctx, 560 + i * 80 + w.x, 300 + w.y, 11, a); }
    for (let i = 0; i < 8; i++) { const w = wander(i + 90, t, 8, 1.5); waterMol(ctx, 540 + i * 70 + w.x, 220 + w.y, 8, a * 0.9); }
    tag(ctx, 'suikers en water blijven in de darm', 960, 870, C.koraal, a * (1 - d));
    tag(ctx, 'naar de dikke darm: diarree', 960, 870, C.koraal, d * (1 - lac));
    if (lac > 0.01) { ctx.save(); ctx.globalAlpha *= lac; roundRect(ctx, 1180, 180, 560, 110, 16); shape(ctx, rgba(C.bgSchema, 0.95), V.melk, 1.5); text(ctx, 'lactose = glucose + galactose', 1460, 248, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    const tf = q.on('ander', 2, 0.8); transporteiwit(ctx, 1260, y, 1.1, fr, { col: C.groen, open: 0.5 }); if (fr > 0.01) { ctx.save(); ctx.globalAlpha *= fr; hexagon(ctx, 1260, y - 60 + Math.sin(t * 2) * 4, 10, rgba(C.groen, 0.5), C.groen, 1.4, 0.5); metaText(ctx, 'fructose', 1260, y - 110, C.grain, 'center', 24); ctx.restore(); }
    tag(ctx, 'fructose: ander transporteiwit', 960, 870, C.groen, fr);
  },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'micro');
    const v = q.on('vaatjes', 1, 1.0), h = q.on('haarvaten', 1, 0.8), l = q.on('lymfevat', 1, 0.8);
    darmvlok(ctx, 560, 900, 680, 300, 1, { t, cellen: 13, vaten: h, lymf: l });
    const pan = q.on('slagader', 1, 0.8);
    label(ctx, 'haarvaten', 'bloed', 720, 520, 1000, 440, h * (1 - pan));
    naamBij(ctx, 'lymfevat', 'lymfe: vocht uit het weefsel', 752, 420, q.on('lymfe', 1) * (1 - pan), 'left');
    // glucose door de cel naar het haarvat (een paar µm)
    const mu = q.on('micrometer', 1, 0.8); if (mu > 0.01) { for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + hash(i + 11)) % 1); glucose(ctx, 420 + i * 10, lerp(360 + i * 60, 400 + i * 60, u), 9, mu); } tag(ctx, 'een paar micrometer', 1000, 620, C.goud, mu * (1 - q.on('slagader'))); }
    // mini routekaart rechts
    const s = pan, p = q.on('poortader', 1, 0.8), lev = q.on('lever', 1, 0.8);
    if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; roundRect(ctx, 1180, 200, 620, 620, 20); shape(ctx, rgba(C.bgSchema, 0.96), rgba(C.line, 0.5), 1.2);
      ctx.strokeStyle = BLOED; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1240, 720); ctx.lineTo(1240, 420); ctx.stroke(); arrow(ctx, 1240, 440, 1240, 400, BLOED, 1, 3); text(ctx, 'slagader', 1240, 760, fTekst(30, 600), lighten(BLOED, 0.4), 'center');
      darmvlok(ctx, 1400, 560, 260, 110, 1, { t, cellen: 7 });
      ctx.globalAlpha *= p; ctx.strokeStyle = BLOED; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(1460, 580); ctx.bezierCurveTo(1560, 640, 1600, 400, 1660, 330); ctx.stroke(); text(ctx, 'poortader', 1560, 690, fTekst(30, 600), lighten(BLOED, 0.4), 'center');
      ctx.globalAlpha *= lev; roundRect(ctx, 1600, 240, 160, 90, 20); shape(ctx, rgba(C.bruin, 0.35), C.bruin, 2); text(ctx, 'lever', 1680, 296, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'niet naar het hart, eerst naar de lever', 1490, 870, C.goud, lev);
  },
  s18(ctx, t, q) { bg(ctx, 'micro'); darmvlok(ctx, 560, 900, 680, 300, 1, { t, cellen: 13 });
    const m = q.on('Glycerol', 1, 0.8); for (let i = 0; i < 4; i++) { const w = wander(i + 5, t, 8, 1.2); glycerolMol(ctx, 1100 + i * 140 + w.x, 300 + w.y, 0.8, m); fattyAcid(ctx, 1130 + i * 140 + w.x, 330 + w.y, 70, 0.9, m); }
    metaText(ctx, 'VET UIT KAAS EN MELK', 1300, 220, C.grain, 'center', 26); vraagteken(ctx, 1300, 560, q.on('Hoe'), 120); },
  s20(ctx, t, q) { bg(ctx, 'micro');
    const kaart = q.on('omweg', 1, 1.0);
    ctx.save(); ctx.globalAlpha *= 1 - kaart;
    darmvlok(ctx, 560, 900, 680, 300, 1, { t, cellen: 13 });
    const c = q.on('epitheelcel', 1, 1.0), v = q.on('vet', 2, 1.0), b = q.on('bolletjes', 1, 1.0), ly = q.on('openingen', 1, 1.2);
    // vetzuur + glycerol → vet → bolletje, bij de top van de vlok
    if (c > 0.01 && b < 0.99) { ctx.save(); ctx.globalAlpha *= c * (1 - b); glycerolMol(ctx, 540, 330, 0.7); fattyAcid(ctx, 560, 320, 60, 0.8); ctx.restore(); }
    if (v > 0.01 && b < 0.99) triglyceride(ctx, 560, 400, 0.4, v * (1 - b), 0);
    // bolletjes dalen in het lymfevat; één stuit op het haarvat
    if (b > 0.01) { for (let i = 0; i < 5; i++) { const u = clamp((t - q.at('bolletjes') - i * 0.7) / 3, 0, 1); chylomicron(ctx, 560 + (i % 2 ? 14 : -14), lerp(380, 820, u * ly), 14, b); }
      const stuit = q.on('haarvat', 1, 0.8); if (stuit > 0.01) { const u = Math.min(1, (t - q.at('haarvat')) / 1.2); chylomicron(ctx, lerp(560, 640, u), lerp(380, 480, u), 14, stuit); strike(ctx, 610, 500, 680, C.koraal, q.on('gaan')); } }
    tag(ctx, 'te groot voor de wand van een haarvat', 1300, 420, C.koraal, q.on('haarvat') * (1 - ly));
    tag(ctx, 'lymfevat: grotere openingen', 1300, 420, LYMFE, ly * (1 - q.on('melkwit')));
    const w = q.on('melkwit', 1, 1.2); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; roundRect(ctx, 1100, 520, 400, 240, 20); shape(ctx, rgba(LYMFE, 0.1), LYMFE, 1.5); for (let i = 0; i < 40; i++) chylomicron(ctx, 1120 + hash(i) * 360, 540 + hash(i + 1) * 200 + Math.sin(t * 2 + i) * 3, 6, 1, { rand: 0 }); ctx.fillStyle = rgba(V.melk, 0.25 * q.on('kaatsen')); roundRect(ctx, 1100, 520, 400, 240, 20); ctx.fill(); metaText(ctx, 'LYMFE NA EEN VETTE MAALTIJD', 1300, 800, C.grain, 'center', 24); ctx.restore(); }
    ctx.restore();
    routeKaart(ctx, { a: kaart, t, bloed: 0.5, lever: 0.6, hart: 1, vet: q.on('bovenste'), glu: 0 });
    tag(ctx, 'onder je linker sleutelbeen', 1150, 230, LYMFE, q.on('sleutelbeen') * kaart * (1 - q.on('meeste')));
    tag(ctx, 'eerst het hart, dan pas de lever', 1150, 870, C.goud, q.on('meeste') * kaart);
  },
  s21(ctx, t, q) { bg(ctx, 'micro');
    const ch = q.on('chylomicronen', 1, 1.0); chylomicron(ctx, 520, 500, 170, ch, { rand: q.on('laagje') });
    label(ctx, 'chylomicron', 'druppel vet', 640, 380, 900, 300, ch); label(ctx, 'fosfolipiden en eiwit', 'laagje eromheen', 640, 620, 860, 760, q.on('fosfolipiden'));
    const k = q.on('koppelt', 1, 1.4); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; triglyceride(ctx, 1240, 440, 0.7, 1, 1 - k); metaText(ctx, 'IN DE EPITHEELCEL', 1300, 220, C.grain, 'center', 26); ctx.restore(); }
    const kv = q.on('Korte', 1, 0.8); if (kv > 0.01) { ctx.save(); ctx.globalAlpha *= kv; fattyAcid(ctx, 1100, 700, 40, 1); fattyAcid(ctx, 1180, 720, 40, 1); arrow(ctx, 1260, 710, 1420, 710, BLOED, 1, 3); roundRect(ctx, 1440, 660, 300, 100, 18); shape(ctx, rgba(BLOED, 0.25), BLOED, 2); text(ctx, 'haarvat → poortader', 1590, 720, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'het meeste vet: via de lymfe', 960, 870, LYMFE, q.on('hoofdlijn'));
  },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'macro');
    lichaam(ctx, 400, 560, 0.85, 1, { darm: 1 });
    const p = q.on('geplooid', 1, 0.8), v = q.on('vlokken', 1, 0.8), m = q.on('microvilli', 1, 0.8);
    zoomCircle(ctx, 900, 420, 150, 480, 560, 'plooien', p, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(700, 220, 400, 400); plooiWand(ctx, 740, 1060, 440, 90, 1, 4); });
    zoomCircle(ctx, 1250, 420, 150, 1000, 470, 'darmvlokken', v, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1050, 220, 400, 400); vlokkenRij(ctx, 1090, 1410, 500, 180, 1, 4); });
    zoomCircle(ctx, 1600, 420, 150, 1350, 470, 'microvilli', m, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1400, 220, 400, 400); epitheelcel(ctx, 1440, 470, 320, 140, 1, { mv: 8, mvh: 70, t }); });
    const c = q.on('antwoord'); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; text(ctx, 'c', 1250, 760, fTitel(96), C.goud, 'center'); ctx.restore(); }
    tag(ctx, 'groot oppervlak: snelle opname', 1250, 860, C.groen, q.on('snel'));
  },
  s23(ctx, t, q) { bg(ctx, 'schema');
    const g = q.on('Glucose', 1, 0.8), p = q.on('poortader', 1, 0.8), v = q.on('vetbolletjes', 1, 0.8), s = q.on('sleutelbeen', 1, 0.8);
    routeKaart(ctx, { t, bloed: g, lymf: v, lever: g, hart: 1, glu: g, vet: v });
    tag(ctx, 'glucose en aminozuren: poortader → lever', 960, 880, V.kh, p * (1 - v));
    tag(ctx, 'vet: lymfevat → bovenste holle ader → hart', 960, 880, LYMFE, s);
    refCard(ctx, 'de lever → film 5', 1380, 560, q.on('vijf'));
  }
};

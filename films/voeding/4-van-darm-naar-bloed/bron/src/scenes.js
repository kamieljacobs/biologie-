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

// ===================== H2 (20 okt 2026): darmcel met een echte dubbellaag; moleculen gaan alleen via transporteiwitten =====================
// Overzicht: één epitheelcel met zes microvilli. Transporteiwitten steken door de dubbellaag heen (twee helften met een bindplaats ertussen,
// die van vorm veranderen: open naar buiten -> open naar binnen). Moleculen bewegen willekeurig (schokkerig), met een netto stroom
// darm -> eiwit -> cel -> basaal eiwit -> haarvat. Water gaat door aquaporines (een kanaal met een smalle porie).
const DC = { x0: 400, x1: 1520, top: 252, base: 362, bas: 640, dip: 22, fw: 100, fx: [510, 690, 870, 1050, 1230, 1410], capY: 760, capR: 30, capX0: 560, capX1: 1600 };
const basY = (x) => DC.bas + DC.dip * (1 - Math.pow((x - 960) / 600, 2));
const TPK = { glut: C.teal, sglt: C.goud, aa: C.paars, aqp: '#6FA8DC', aaUit: '#B3A6DA', glut5: C.groen };
const API0 = [{ x: 510, k: 'sglt' }, { x: 690, k: 'glut' }, { x: 870, k: 'aqp' }, { x: 1050, k: 'aa' }, { x: 1230, k: 'sglt' }, { x: 1410, k: 'glut' }];
const BAS0 = [{ x: 640, k: 'glut' }, { x: 860, k: 'aqp' }, { x: 1080, k: 'aaUit' }, { x: 1300, k: 'glut' }];
// middellijn van het membraan (gesloten pad, dicht bemonsterd)
const DC_PAD = (() => { const P = []; const lijn = (x0, y0, x1, y1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 3)); for (let i = 1; i <= n; i++) P.push([lerp(x0, x1, i / n), lerp(y0, y1, i / n)]); };
  const r = DC.fw / 2; P.push([DC.x0 + 24, basY(DC.x0 + 24) - 4]);
  // linkerwand omhoog (licht bol), hoek
  for (let i = 1; i <= 60; i++) { const u = i / 60, y = lerp(basY(DC.x0) - 26, DC.base + 24, u); P.push([DC.x0 - 10 * Math.sin(u * Math.PI), y]); }
  for (let i = 1; i <= 10; i++) { const a = Math.PI + i / 10 * Math.PI / 2; P.push([DC.x0 + 24 + Math.cos(a) * 24, DC.base + 24 + Math.sin(a) * 24]); }
  DC.fx.forEach(fx => { lijn(P[P.length - 1][0], P[P.length - 1][1], fx - r, DC.base); lijn(fx - r, DC.base, fx - r, DC.top + r);
    for (let i = 1; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; P.push([fx + Math.cos(a) * r, DC.top + r + Math.sin(a) * r]); } lijn(fx + r, DC.top + r, fx + r, DC.base); });
  lijn(P[P.length - 1][0], P[P.length - 1][1], DC.x1 - 24, DC.base);
  for (let i = 1; i <= 10; i++) { const a = -Math.PI / 2 + i / 10 * Math.PI / 2; P.push([DC.x1 - 24 + Math.cos(a) * 24, DC.base + 24 + Math.sin(a) * 24]); }
  for (let i = 1; i <= 60; i++) { const u = i / 60, y = lerp(DC.base + 24, basY(DC.x1) - 26, u); P.push([DC.x1 + 10 * Math.sin(u * Math.PI), y]); }
  for (let i = 1; i <= 8; i++) { const a = i / 8 * Math.PI / 2; P.push([DC.x1 - 24 + Math.cos(a) * 24, basY(DC.x1) - 26 + Math.sin(a) * 22]); }
  for (let x = DC.x1 - 27; x > DC.x0 + 24; x -= 3) P.push([x, basY(x) - 4]);
  return P; })();
// dubbellaag langs een pad: koppen (bolletjes) aan beide kanten, staartjes naar binnen. d = halve dikte, r = straal kop, stap = afstand
function dubbellaag(ctx, P, o = {}) { const { d = 9, r = 3.4, stap = 8.5, kop = '#C9D6E2', staart = 'rgba(201,214,226,0.45)', gesloten = true } = o;
  let acc = 0; ctx.lineWidth = Math.max(1, r * 0.35); ctx.strokeStyle = staart;
  const kp = []; for (let i = 1; i < P.length; i++) { const dx = P[i][0] - P[i - 1][0], dy = P[i][1] - P[i - 1][1], L = Math.hypot(dx, dy); acc += L; if (acc < stap) continue; acc = 0;
    const tx = dx / L, ty = dy / L, nx = -ty, ny = tx, [x, y] = P[i], e = r * 0.45; ctx.beginPath();
    for (const s of [-1, 1]) { const hx = x + s * nx * (d - r), hy = y + s * ny * (d - r), ex = x + s * nx * r * 0.3, ey = y + s * ny * r * 0.3; ctx.moveTo(hx + tx * e, hy + ty * e); ctx.lineTo(ex + tx * e, ey + ty * e); ctx.moveTo(hx - tx * e, hy - ty * e); ctx.lineTo(ex - tx * e, ey - ty * e); }
    ctx.stroke(); kp.push([x + nx * d, y + ny * d], [x - nx * d, y - ny * d]); }
  ctx.fillStyle = kop; ctx.beginPath(); kp.forEach(([x, y]) => { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 6.283); }); ctx.fill(); }
let _dcDoek = null;
function darmcelVlak(ctx) { // cel + dubbellaag, één keer getekend en hergebruikt
  if (!_dcDoek) { _dcDoek = document.createElement('canvas'); _dcDoek.width = W; _dcDoek.height = H; const g = _dcDoek.getContext('2d');
    g.beginPath(); DC_PAD.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = rgba(V.kh, 0.12); g.fill();
    for (let k = 0; k < 40; k++) { const x = DC.x0 + 40 + hash(k * 3.1) * (DC.x1 - DC.x0 - 80), y = DC.base + 40 + hash(k * 5.7) * (DC.bas - DC.base - 70); g.fillStyle = rgba(V.kh, 0.22); g.beginPath(); g.arc(x, y, 1.6 + hash(k) * 1.4, 0, 6.283); g.fill(); }
    g.beginPath(); g.ellipse(1440, 560, 46, 34, 0, 0, 6.283); g.fillStyle = rgba(C.kern, 0.55); g.fill(); g.strokeStyle = C.kernR; g.lineWidth = 1.4; g.stroke();
    dubbellaag(g, DC_PAD); }
  ctx.drawImage(_dcDoek, 0, 0); }
// transporteiwit (drager): twee helften rond een bindplaats. c = 0 open naar buiten (lokale -y), 1 open naar binnen. ang = draaiing. s = schaal
function drager(ctx, x, y, ang, c, col, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const { gloed = 0, pocket = null, energie = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); const th = 0.26 * (1 - 2 * c), w = 17 * s, h = 58 * s;
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed; ctx.shadowColor = col; ctx.shadowBlur = 22 * s; ctx.beginPath(); ctx.ellipse(0, 0, 30 * s, 36 * s, 0, 0, 6.283); ctx.fillStyle = rgba(col, 0.25); ctx.fill(); ctx.restore(); }
  for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * th); roundRect(ctx, sd > 0 ? 2 * s : -2 * s - w, -h / 2, w, h, 7 * s); shape(ctx, _mixH(col, '#1A2740', 0.25), lighten(col, 0.3), 1.4);
    ctx.fillStyle = rgba('#000000', 0.12); roundRect(ctx, sd > 0 ? 2 * s + w * 0.55 : -2 * s - w, -h / 2 + 4 * s, w * 0.45, h - 8 * s, 5 * s); ctx.fill(); ctx.restore(); }
  if (pocket) { ctx.save(); ctx.strokeStyle = rgba(lighten(col, 0.5), 0.8); ctx.lineWidth = 1.4; ctx.setLineDash([3, 3]); if (pocket === 'zes') hexagon(ctx, 0, 0, 10 * s, null, null); else { ctx.beginPath(); ctx.arc(0, 0, 9 * s, 0, 6.283); } ctx.stroke(); ctx.restore(); }
  if (energie > 0.01) { ctx.save(); ctx.globalAlpha *= energie; ctx.fillStyle = C.goud; ctx.beginPath(); const bx = 30 * s, by = 18 * s; ctx.moveTo(bx + 4 * s, by - 13 * s); ctx.lineTo(bx - 5 * s, by + 1 * s); ctx.lineTo(bx + 1 * s, by + 1 * s); ctx.lineTo(bx - 4 * s, by + 13 * s); ctx.lineTo(bx + 6 * s, by - 2 * s); ctx.lineTo(bx, by - 2 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
function _mixH(h1, h2, u) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, u))); return `rgb(${c[0]},${c[1]},${c[2]})`; }
// aquaporine: kanaal met een smalle porie die altijd open is (water gaat er één voor één door)
function kanaalEiwit(ctx, x, y, ang, col, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); const w = 15 * s, h = 58 * s;
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 4 * s, -h / 2); ctx.quadraticCurveTo(sd * 2.5 * s, 0, sd * 4 * s, h / 2); ctx.lineTo(sd * (4 * s + w), h / 2 - 4 * s); ctx.lineTo(sd * (4 * s + w), -h / 2 + 4 * s); ctx.closePath(); shape(ctx, _mixH(col, '#1A2740', 0.25), lighten(col, 0.3), 1.4); }
  ctx.restore(); }
// willekeurige, schokkerige beweging (pseudo-Brown): vloeiende dwaling + snelle trilling
function brown(seed, t, amp) { const w = wander(seed, t, amp, 1.6), v = wander(seed + 500, t, amp * 0.45, 6.5); return [w.x + v.x, w.y + v.y]; }
function tekenMol(ctx, kind, x, y, a = 1, s = 1) { if (kind === 'glu') glucose(ctx, x, y, 11 * s, a); else if (kind === 'gal') galactoseMol(ctx, x, y, 11 * s, a); else if (kind === 'aa') aminozuur(ctx, x, y, 10 * s, 9, a); else if (kind === 'fru') { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, 10 * s, rgba(C.groen, 0.5), C.groen, 1.4, 0.5); ctx.restore(); } } else waterMol(ctx, x, y, 7 * s, a); }
// stroom van moleculen langs: darm -> apicaal eiwit -> cel -> basaal eiwit -> haarvat. Geeft per eiwit de vormtoestand terug (voor drager()).
// o: { kind, api: [eiwit-objecten], bas: [...], n, T, t0, t1 (geen nieuwe rondes meer na t1), a, seed, eind (0..1: tot waar het pad loopt; 1 = haarvat) }
function stroomDoorCel(t, o) { const { kind, api, bas, n = 6, T = 7, t0 = 0, t1 = Infinity, seed = 0, eind = 1 } = o; const mols = [], cA = new Map(), cB = new Map();
  if (!isFinite(t0) || t < t0) return { mols, cA, cB };
  const zet = (m, k, c) => m.set(k, Math.max(m.get(k) || 0, c));
  for (let k = 0; k < n; k++) { const tau = t - t0 - k * T / n; if (tau < 0) continue; const m = Math.floor(tau / T); if (t0 + k * T / n + m * T > t1) continue; let u = (tau % T) / T;
    const A = api[k % api.length], B = bas[(k + seed) % bas.length], sd = seed * 97 + k * 13 + m * 7, kan = A.k === 'aqp';
    const xs = A.x + (hash(sd) - 0.5) * 260, ys = 158 + hash(sd + 1) * 60, yOut = DC.top - 34, yIn = DC.top + 30, yb = basY(B.x);
    let x, y, al = 1; const j = brown(sd, t, 1);
    if (u < 0.3) { const v = ease(u / 0.3), f = 1 - v * v; x = lerp(xs, A.x, v) + j[0] * 26 * f; y = lerp(ys, yOut, v) + j[1] * 18 * f; al = Math.min(1, u / 0.04); }
    else if (u < 0.4) { const v = (u - 0.3) / 0.1; x = A.x; y = lerp(yOut + 8, yIn, kan ? v : ease(v)); if (!kan) zet(cA, A.x, ease(v)); }
    else if (u < 0.76) { const v = (u - 0.4) / 0.36; if (!kan && u < 0.47) zet(cA, A.x, 1 - ease((u - 0.4) / 0.07)); const mid = [lerp(A.x, B.x, 0.35), DC.base + 40];
      if (v < 0.3) { const w = v / 0.3; x = lerp(A.x, mid[0], w); y = lerp(yIn, mid[1], w); } else { const w = (v - 0.3) / 0.7; x = lerp(mid[0], B.x, w); y = lerp(mid[1], yb - 36, ease(w)); }
      const amp = Math.sin(Math.min(1, v * 1.15) * Math.PI); x += j[0] * 34 * amp; y += j[1] * 22 * amp; if (eind < 0.5 && v > 0.6) al = 1 - (v - 0.6) / 0.4; }
    else { if (eind < 0.5) continue; if (u < 0.84) { const v = (u - 0.76) / 0.08; x = B.x; y = lerp(yb - 30, yb + 30, B.k === 'aqp' ? v : ease(v)); if (B.k !== 'aqp') zet(cB, B.x, ease(v)); }
      else { const v = (u - 0.84) / 0.16; if (B.k !== 'aqp' && u < 0.9) zet(cB, B.x, 1 - ease((u - 0.84) / 0.06)); const ty = DC.capY - 6 + (hash(sd + 4) - 0.5) * 22; x = B.x + v * 260 + j[0] * 10 * (1 - v); y = v < 0.35 ? lerp(yb + 30, ty, ease(v / 0.35)) : ty + j[1] * 4; al = v > 0.6 ? (1 - v) / 0.4 : 1; } }
    mols.push([x, y, al]); }
  return { mols, cA, cB }; }
// haarvat onder de cel, met rode bloedcellen die naar rechts stromen
function haarvat(ctx, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { capX0: x0, capX1: x1, capY: y, capR: r } = DC;
  roundRect(ctx, x0, y - r, x1 - x0, 2 * r, r); shape(ctx, rgba(BLOED, 0.16), rgba(BLOED, 0.85), 2.5);
  ctx.save(); roundRect(ctx, x0, y - r, x1 - x0, 2 * r, r); ctx.clip(); for (let k = 0; k < 9; k++) { const xx = x0 + ((k * 131 + t * 70) % (x1 - x0 + 80)) - 40; ctx.beginPath(); ctx.ellipse(xx, y + Math.sin(k * 2.1) * 8, 17, 10, 0, 0, 6.283); shape(ctx, rgba(BLOED, 0.55), rgba(BLOED, 0.9), 1); } ctx.restore();
  naamBij(ctx, 'haarvat', 'bloed', x1 + 16, y + 6, 1, 'left', C.text); ctx.restore(); }
// cel + eiwitten + stromen samen. o: { api, bas, stromen: [o...], tpA (zichtbaarheid eiwitten), gloedB, energie (actieve dragers), kruis: [x...] }
function darmcelScene(ctx, t, o = {}) { const { api = API0, bas = BAS0, stromen = [], tpA = 1, gloedA = 0, gloedB = 0, energie = 0, kruis = [], kruisA = 0, vatA = 1, lumL = 0, lumC = 0, lumKind = 'glu' } = o;
  metaText(ctx, 'DARMHOLTE · VOEDSEL', 150, 132, C.grain, 'left', 26); metaText(ctx, 'BINNEN IN DE VLOK', 150, DC.capY + 10, C.grain, 'left', 26);
  haarvat(ctx, t, vatA); darmcelVlak(ctx);
  // vaste moleculen (concentratie): lumL in de darm, lumC in de cel; schokkerig, blijven in hun ruimte
  for (let i = 0; i < Math.round(lumL); i++) { const [jx, jy] = brown(i + 11, t, 14); tekenMol(ctx, lumKind, 470 + hash(i * 7 + 1) * 980 + jx, 166 + hash(i * 7 + 2) * 56 + jy, Math.min(1, lumL - i)); }
  for (let i = 0; i < Math.round(lumC); i++) { const [jx, jy] = brown(i + 61, t, 12); tekenMol(ctx, lumKind, 470 + hash(i * 5 + 9) * 900 + jx, DC.base + 60 + hash(i * 5 + 3) * 150 + jy, Math.min(1, lumC - i)); }
  const res = stromen.map(s => stroomDoorCel(t, s)); const cA = new Map(), cB = new Map(); res.forEach(r => { r.cA.forEach((v, k) => cA.set(k, Math.max(cA.get(k) || 0, v))); r.cB.forEach((v, k) => cB.set(k, Math.max(cB.get(k) || 0, v))); });
  api.forEach(p => { const c = cA.get(p.x) || 0; if (p.k === 'aqp') kanaalEiwit(ctx, p.x, DC.top, 0, TPK.aqp, 1, tpA); else drager(ctx, p.x, DC.top, 0, c, TPK[p.k], 1, tpA, { gloed: gloedA, energie: (p.k === 'sglt' || p.k === 'aa') ? energie * c : 0 }); });
  bas.forEach(p => { const c = cB.get(p.x) || 0, ang = Math.PI + Math.atan(-2 * DC.dip * (p.x - 960) / (600 * 600)); if (p.k === 'aqp') kanaalEiwit(ctx, p.x, basY(p.x) - 4, ang, TPK.aqp, 1, tpA); else drager(ctx, p.x, basY(p.x) - 4, ang, c, TPK[p.k], 1, tpA, { gloed: gloedB }); });
  if (kruisA > 0.01) kruis.forEach(x => { ctx.save(); ctx.globalAlpha *= kruisA; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 30, DC.top - 34); ctx.lineTo(x + 30, DC.top + 34); ctx.moveTo(x + 30, DC.top - 34); ctx.lineTo(x - 30, DC.top + 34); ctx.stroke(); ctx.restore(); });
  res.forEach((r, i) => r.mols.forEach(([x, y, al]) => tekenMol(ctx, stromen[i].kind, x, y, al * (stromen[i].a == null ? 1 : stromen[i].a)))); }

// ---------- vwo-inzoom (s14): stuk apicaal en basolateraal membraan met SGLT1, aminozuurtransporter, Na⁺/K⁺-pomp en GLUT2 ----------
const ZM = { ya: 300, yb: 650, sg: 560, aa: 1240, pomp: 640, glut: 1380, capY: 830, s: 2.3 };
function ion(ctx, x, y, lab, col, a = 1, r = 17) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(col, 0.55), col, 2); text(ctx, lab, x, y + r * 0.36, fMeta(Math.round(r * 1.05)), C.text, 'center'); ctx.restore(); }
const naIon = (ctx, x, y, a) => ion(ctx, x, y, 'Na⁺', C.koraal, a), kIon = (ctx, x, y, a) => ion(ctx, x, y, 'K⁺', '#6FB7A8', a);
// ATP: base + suiker + staartje van drie fosfaatgroepen; pLos 0..1: de laatste fosfaatgroep springt eraf (ADP + P)
function atpMini(ctx, x, y, s = 1, a = 1, pLos = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.fillStyle = rgba(C.paars, 0.9); roundRect(ctx, -22 * s, -12 * s, 12 * s, 12 * s, 3 * s); ctx.fill();
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 1.6 * s; ctx.beginPath(); ctx.moveTo(-10 * s, -6 * s); ctx.lineTo(-6 * s, -2 * s); ctx.stroke();
  ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / 5; const px = -2 * s + Math.cos(an) * 6 * s, py = 2 * s + Math.sin(an) * 6 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.5); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 3; i++) { const last = i === 2, px = (8 + i * 9) * s + (last ? pLos * 26 * s : 0), py = 2 * s + (last ? pLos * 14 * s : 0);
    if (!(last && pLos > 0.15)) { ctx.beginPath(); ctx.moveTo(px - 9 * s, 2 * s); ctx.lineTo(px - 3 * s, py); ctx.stroke(); }
    ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(px, py, 3.6 * s, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
const ZM_A = Array.from({ length: 200 }, (_, i) => [-20 + i * 10, ZM.ya]), ZM_B = Array.from({ length: 200 }, (_, i) => [-20 + i * 10, ZM.yb]);
// cyclus van een symporter: n Na⁺ + molecuul binden (open naar de darm), vormverandering, loslaten in de cel. Geeft {c, delen:[[soort,x,y,a]]}
function symCyclus(t, t0, P, x, n, kind, seed) { const out = { c: 0, delen: [] }; if (!isFinite(t0) || t < t0) return out; const tau = t - t0, m = Math.floor(tau / P), u = (tau % P) / P, s = ZM.s;
  const k = (typeof kind === 'function') ? kind(m) : kind; const site = (i) => i < 0 ? [x, 0] : [x + (i === 0 ? -1 : 1) * 15 * s * (n > 1 ? 1 : 0.9), 8 * s];
  const start = (i) => [x + (hash(seed + m * 7 + i) - 0.5) * 300, 150 + hash(seed + m * 3 + i * 5) * 70], eind = (i) => [x + (hash(seed + m * 11 + i * 3) - 0.5) * 340, 470 + hash(seed + m * 13 + i) * 110];
  const ids = [-1].concat(Array.from({ length: n }, (_, i) => i)); out.c = u < 0.3 ? 0 : u < 0.5 ? ease((u - 0.3) / 0.2) : u < 0.75 ? 1 : 1 - ease((u - 0.75) / 0.25);
  ids.forEach(i => { const so = i < 0 ? k : 'na', [dx, dy] = site(i); const yOut = ZM.ya - 16 * s + dy * 0.4, yIn = ZM.ya + 16 * s - dy * 0.4; let px, py, al = 1; const j = brown(seed + i * 17 + m * 3, t, 1);
    if (u < 0.3) { const v = ease(u / 0.3), f = 1 - v; const [sx, sy] = start(i); px = lerp(sx, dx, v) + j[0] * 22 * f; py = lerp(sy, yOut, v) + j[1] * 14 * f; al = Math.min(1, u / 0.05); }
    else if (u < 0.5) { const v = ease((u - 0.3) / 0.2); px = dx; py = lerp(yOut, yIn, v); }
    else { const v = (u - 0.5) / 0.5, [ex, ey] = eind(i); px = lerp(dx, ex, ease(v)) + j[0] * 26 * v; py = lerp(yIn, ey, ease(v)) + j[1] * 18 * v; al = v > 0.7 ? (1 - v) / 0.3 : 1; }
    out.delen.push([so, px, py, al]); });
  return out; }
function tekenDeel(ctx, so, x, y, a) { if (so === 'na') naIon(ctx, x, y, a); else if (so === 'k') kIon(ctx, x, y, a); else tekenMol(ctx, so, x, y, a, 1.6); }
// Na⁺/K⁺-pomp: 3 Na⁺ van binnen erin, ATP geeft een fosfaatgroep af, vormverandering, Na⁺ naar buiten; 2 K⁺ erin, P eraf, terug, K⁺ in de cel
function pompCyclus(t, t0, P) { const out = { c: 1, delen: [], atp: null, pAan: 0 }; if (!isFinite(t0) || t < t0) return out; const tau = t - t0, m = Math.floor(tau / P), u = (tau % P) / P, x = ZM.pomp, y = ZM.yb, s = 2.5;
  out.c = u < 0.3 ? 1 : u < 0.45 ? 1 - ease((u - 0.3) / 0.15) : u < 0.8 ? 0 : u < 0.92 ? ease((u - 0.8) / 0.12) : 1;
  const inY = y - 14 * s, outY = y + 14 * s, siteNa = [-16, 0, 16], siteK = [-11, 11];
  siteNa.forEach((dx, i) => { const j = brown(300 + i * 7 + m, t, 1), sx = x + dx * s + (hash(m * 5 + i) - 0.5) * 260, sy = 470 + hash(m * 9 + i) * 90; let px, py, al = 1;
    if (u < 0.2) { const v = ease(u / 0.2); px = lerp(sx, x + dx * s, v) + j[0] * 20 * (1 - v); py = lerp(sy, inY, v) + j[1] * 14 * (1 - v); al = Math.min(1, u / 0.04); }
    else if (u < 0.45) { const v = u < 0.3 ? 0 : ease((u - 0.3) / 0.15); px = x + dx * s; py = lerp(inY, outY, v); }
    else if (u < 0.62) { const v = (u - 0.45) / 0.17; px = x + dx * s * (1 + v * 3) + j[0] * 14 * v; py = lerp(outY, y + 130, ease(v)) + j[1] * 10 * v; al = v > 0.6 ? (1 - v) / 0.4 : 1; } else return;
    out.delen.push(['na', px, py, al]); });
  siteK.forEach((dx, i) => { const j = brown(400 + i * 7 + m, t, 1), sx = x + dx * s * 4, sy = y + 140; let px, py, al = 1;
    if (u < 0.55) return; if (u < 0.7) { const v = ease((u - 0.55) / 0.15); px = lerp(sx, x + dx * s, v) + j[0] * 14 * (1 - v); py = lerp(sy, outY, v) + j[1] * 10 * (1 - v); al = Math.min(1, (u - 0.55) / 0.04); }
    else if (u < 0.92) { const v = u < 0.8 ? 0 : ease((u - 0.8) / 0.12); px = x + dx * s; py = lerp(outY, inY, v); }
    else { const v = (u - 0.92) / 0.08; px = x + dx * s * (1 + v * 4); py = lerp(inY, inY - 110, ease(v)); al = 1 - v; }
    out.delen.push(['k', px, py, al]); });
  // ATP komt aan (0.12-0.25), geeft P af (0.25-0.32); ADP drijft weg; P zit op de pomp tot 0.72 en valt dan los
  if (u > 0.1 && u < 0.5) { const v = clamp((u - 0.1) / 0.15, 0, 1); out.atp = { x: lerp(x - 190, x - 52, ease(v)), y: lerp(y - 150, y - 46, ease(v)), pLos: clamp((u - 0.25) / 0.07, 0, 1), a: u < 0.32 ? 1 : 1 - (u - 0.32) / 0.18, weg: clamp((u - 0.32) / 0.18, 0, 1) }; }
  out.pAan = u >= 0.3 && u < 0.72 ? 1 : u >= 0.72 && u < 0.8 ? 1 - (u - 0.72) / 0.08 : 0; out.pVal = u >= 0.72 ? clamp((u - 0.72) / 0.08, 0, 1) : 0;
  return out; }
function zoomDetail(ctx, t, q, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = ZM.s;
  ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, CAPTION_Y); ctx.fillStyle = rgba(V.kh, 0.10); ctx.fillRect(0, ZM.ya, W, ZM.yb - ZM.ya);
  dubbellaag(ctx, ZM_A, { d: 22, r: 8, stap: 19 }); dubbellaag(ctx, ZM_B, { d: 22, r: 8, stap: 19 });
  metaText(ctx, 'DARMHOLTE', 150, 130, C.grain, 'left', 26); metaText(ctx, 'IN DE CEL', 150, ZM.ya + 70, C.grain, 'left', 26); metaText(ctx, 'NAAR HET BLOED', 150, ZM.yb + 80, C.grain, 'left', 26);
  // haarvat onderaan
  roundRect(ctx, 560, ZM.capY - 26, 1200, 52, 26); shape(ctx, rgba(BLOED, 0.16), rgba(BLOED, 0.85), 2.5); ctx.save(); roundRect(ctx, 560, ZM.capY - 26, 1200, 52, 26); ctx.clip(); for (let k = 0; k < 10; k++) { const xx = 540 + ((k * 137 + t * 70) % 1320); ctx.beginPath(); ctx.ellipse(xx, ZM.capY + Math.sin(k * 2.1) * 6, 22, 13, 0, 0, 6.283); shape(ctx, rgba(BLOED, 0.55), rgba(BLOED, 0.9), 1); } ctx.restore(); naamBij(ctx, 'haarvat', null, 1780, ZM.capY + 12, 1, 'left');
  // concentraties: veel Na⁺ buiten, weinig binnen
  const vorm = q.on('vorm', 1, 0.8), aaA = q.on('aminozuur', 1, 0.8), ga = q.on('galactose', 1, 0.8), tNa = q.at('natrium', 1), na = q.on('natrium', 1, 0.8), tP = q.at('natrium-kaliumpomp'), pomp = q.on('natrium-kaliumpomp', 1, 0.8), zo = q.on('Zo', 2, 0.8);
  for (let i = 0; i < 9; i++) { const [jx, jy] = brown(i + 200, t, 14); naIon(ctx, 260 + i * 175 + jx, 170 + (i % 3) * 30 + jy, na * 0.8); }
  for (let i = 0; i < 2; i++) { const [jx, jy] = brown(i + 220, t, 14); naIon(ctx, 980 + i * 320 + jx, 520 + jy, na * 0.8); }
  // SGLT1 en aminozuurtransporter
  const sg = symCyclus(t, tNa - 0.6, 3.6, ZM.sg, 2, (m) => m % 3 === 2 ? 'gal' : 'glu', 11), am = symCyclus(t, tNa + 1.2, 3.6, ZM.aa, 1, 'aa', 31);
  drager(ctx, ZM.sg, ZM.ya, 0, sg.c, TPK.sglt, s, 1, { pocket: 'zes', gloed: vorm * (1 - aaA) * 0.6 });
  drager(ctx, ZM.aa, ZM.ya, 0, am.c, TPK.aa, s, 1, { pocket: 'rond', gloed: aaA * (1 - ga) * 0.6 });
  // voor 'natrium': glucose past in de bindplaats van SGLT1, een aminozuur in die van de aminozuurtransporter, galactose ook in SGLT1
  if (t < tNa - 0.2) { const pre = 1 - ramp(t, tNa - 0.8, 0.6), bob = Math.sin(t * 2.2) * 6;
    tekenMol(ctx, 'glu', ZM.sg - 40, ZM.ya - 80 + bob, vorm * pre, 1.6); tekenMol(ctx, 'gal', ZM.sg + 40, ZM.ya - 80 - bob, ga * pre, 1.6); tekenMol(ctx, 'aa', ZM.aa, ZM.ya - 80 + bob, aaA * pre, 1.6);
    naamBij(ctx, 'glucose', null, ZM.sg - 40, ZM.ya - 112, vorm * pre, 'center'); naamBij(ctx, 'galactose', null, ZM.sg + 70, ZM.ya - 112, ga * pre, 'left'); naamBij(ctx, 'aminozuur', null, ZM.aa, ZM.ya - 112, aaA * pre, 'center'); }
  sg.delen.concat(am.delen).forEach(([so, x, y, al]) => tekenDeel(ctx, so, x, y, al));
  naamBij(ctx, 'SGLT1', 'Na⁺ + glucose samen naar binnen', ZM.sg + 70, ZM.ya + 104, vorm, 'left', C.goud);
  naamBij(ctx, 'aminozuurtransporter', 'ook samen met Na⁺', ZM.aa + 70, ZM.ya + 104, aaA, 'left', lighten(C.paars, 0.3));
  // Na⁺/K⁺-pomp (basolateraal)
  if (pomp > 0.01) { ctx.save(); ctx.globalAlpha *= pomp; const pc = pompCyclus(t, tP - 0.2, 4.2), x = ZM.pomp, y = ZM.yb;
    drager(ctx, x, y, Math.PI, pc.c, C.koraal, 2.5, 1, { gloed: q.on('ATP', 1, 0.6) * (1 - zo) * 0.7 });
    if (pc.atp) { const A = pc.atp; atpMini(ctx, A.x - A.weg * 120, A.y - A.weg * 60, 3, A.a, A.pLos); }
    if (pc.pAan > 0.01) { ctx.fillStyle = C.koraal; ctx.globalAlpha *= pc.pAan; ctx.beginPath(); ctx.arc(x - 26 - pc.pVal * 30, y - 34 + pc.pVal * -40, 7.5, 0, 6.283); ctx.fill(); ctx.globalAlpha /= pc.pAan; }
    pc.delen.forEach(([so, px, py, al]) => tekenDeel(ctx, so, px, py, al));
    naamBij(ctx, 'natrium-kaliumpomp', '3 Na⁺ eruit · 2 K⁺ erin', x + 200, y + 96, 1, 'left', C.koraal);
    naamBij(ctx, 'kost ATP', 'ATP → ADP + P', x - 110, y - 120, q.on('ATP', 1, 0.6), 'right', C.goud); ctx.restore(); }
  // GLUT2 (basolateraal): glucose de cel uit, naar het haarvat (gefaciliteerde diffusie, geen energie)
  if (zo > 0.01) { ctx.save(); ctx.globalAlpha *= zo; const P = 3.0, t0 = q.at('Zo', 2) - 0.8, tau = t - t0, u = tau > 0 ? (tau % P) / P : 0, m = Math.floor(Math.max(0, tau) / P), x = ZM.glut, y = ZM.yb;
    const c = u < 0.35 ? 0 : u < 0.55 ? ease((u - 0.35) / 0.2) : u < 0.75 ? 1 : 1 - ease((u - 0.75) / 0.25);
    drager(ctx, x, y, Math.PI, 1 - c, TPK.glut, s, 1, { pocket: 'zes' });
    if (tau > 0) { const j = brown(500 + m, t, 1); let px, py, al = 1; const sx = x + (hash(m * 3) - 0.5) * 300, sy = 430 + hash(m * 7) * 100;
      if (u < 0.35) { const v = ease(u / 0.35); px = lerp(sx, x, v) + j[0] * 22 * (1 - v); py = lerp(sy, y - 30, v) + j[1] * 14 * (1 - v); al = Math.min(1, u / 0.05); }
      else if (u < 0.55) { px = x; py = lerp(y - 30, y + 30, ease((u - 0.35) / 0.2)); }
      else { const v = (u - 0.55) / 0.45; px = x + v * 220 + j[0] * 8; py = lerp(y + 30, ZM.capY, ease(Math.min(1, v * 1.6))); al = v > 0.7 ? (1 - v) / 0.3 : 1; }
      tekenMol(ctx, 'glu', px, py, al, 1.6); }
    naamBij(ctx, 'GLUT2', 'glucose de cel uit: diffusie', x + 90, y + 100, 1, 'left', TPK.glut); ctx.restore(); }
  ctx.restore(); }

// Noor (vast personage) met de dunne darm 'doorschijnend' in haar buik (20 okt 2026; vervangt het kale lichaam). top = bovenkant hoofd, hh = hoofdmaat
// o.darm = 0..1 (buis wordt getekend), o.uit = uitdrukking. Geeft de punten van de darm terug (voor zoomcirkels).
function noorDarm(ctx, x, top, hh, t, o = {}) { const { darm = 1, uit = 'neutraal', a = 1, pose = 'staan' } = o; if (a <= 0.01) return [];
  const L = CAST.noor.lengte || 1, H = 6.1 * hh, h = H / L, y = top + H, m = rompMaat('noor', x, y, h);
  const y0 = m.taille - 0.62 * hh, y1 = m.heup + 0.26 * hh, k = Math.min(1.5 * hh / 300, (y1 - y0) / 340), cy = (y0 + y1) / 2;
  const pts = DARM_PTS.map(p => [x + p[0] * k, cy + (p[1] - 20) * k]);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, W, CAPTION_Y); ctx.clip();
  persoon(ctx, 'noor', x, y, h, { uit, pose, t });
  ctx.save(); rompPad(ctx, m); ctx.clip(); ctx.beginPath(); ctx.ellipse(x, cy, 1.0 * hh * 0.95, (y1 - y0) * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(C.bgMicro, 0.62); ctx.fill();
  if (darm > 0.01) buisPad(ctx, darm >= 1 ? pts : padDeel(pts, darm), 44 * k, 1, V.neutraal, C.fill, { seed: 2, glad: darm >= 1 });
  ctx.restore(); ctx.restore(); return gladC(pts); }
const SCENES = {
  title(ctx, t) { darmvlok(ctx, 1500, 900, 560, 240, 1, { t, cellen: 13 }); for (let i = 0; i < 6; i++) { const w = wander(i, t, 12, 1.5); glucose(ctx, 1320 + hash(i * 3) * 360 + w.x, 300 + hash(i * 3 + 1) * 80 + w.y, 11, 0.9); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'macro');
    const d = q.on('buis', 1, 2.5); noorDarm(ctx, 520, 24, 228, t, { darm: d, uit: q.on('past') > 0.5 ? 'denkt' : 'neutraal' });
    const m3 = q.on('drie'); if (m3 > 0.01) { ctx.save(); ctx.globalAlpha *= m3; roundRect(ctx, 800, 560, 180, 58, 29); shape(ctx, rgba(C.goud, 0.16), C.goud, 1.5); text(ctx, '≈ 3 m', 890, 600, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
    const k = q.on('Meet', 1, 1.0); const r = q.on('dertig', 1, 1.0);
    if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; metaText(ctx, 'BINNENKANT, ALLE PLOOITJES MEEGETELD', 1400, 300, C.grain, 'center', 26); ctx.restore(); }
    klaslokaal(ctx, 1080, 340, 640, 400, r, true); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; text(ctx, '≈ 30 m²', 1240, 820, fTitel(56), C.goud, 'center'); text(ctx, 'een half klaslokaal', 1560, 820, fTekst(34), C.text2, 'center'); ctx.restore(); }
    vraagteken(ctx, 830, 230, q.on('past'), 140);
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
  s10(ctx, t, q) { bg(ctx, 'micro');
    const v = q.on('volgen', 1, 0.8), later = q.on('tijdje', 1, 2.0), tp = q.on('transporteiwitten', 1, 1.0), dif = q.on('diffusie', 1, 1.0);
    const tD = q.at('diffusie'), tH = tD + 0.2; // de gevolgde glucose gaat bij 'diffusie' door een transporteiwit naar binnen
    const st = [{ kind: 'glu', api: [API0[1], API0[5]], bas: [BAS0[0], BAS0[3]], n: 6, T: 6.5, t0: tD + 1.4, t1: q.at('tijdje') + 1, seed: 1 }];
    darmcelScene(ctx, t, { stromen: st, tpA: tp, lumL: v * lerp(14, 3, later), lumC: v * lerp(2, 9, later) });
    naamBij(ctx, 'celmembraan', 'dubbele laag', DC.x0 - 22, DC.base + 70, q.on('celmembraan') * (1 - later), 'right');
    naamBij(ctx, 'transporteiwit', 'in het celmembraan', 1470, 214, tp * (1 - later), 'left');
    // de gevolgde glucose (goud): dwaalt in de darm, bindt bij 'diffusie' aan het eiwit op 690, gaat naar binnen en dwaalt in de cel
    const held = q.on('volgen', 1, 0.6); if (held > 0.01) { const A = API0[1]; let x, y; const j = brown(7, t, 1);
      if (t < tH) { const v2 = clamp((t - (tH - 2.2)) / 2.2, 0, 1); x = lerp(930, A.x, ease(v2)) + j[0] * 30 * (1 - v2); y = lerp(200, DC.top - 34, ease(v2)) + j[1] * 18 * (1 - v2); }
      else if (t < tH + 0.9) { const v2 = (t - tH) / 0.9; x = A.x; y = lerp(DC.top - 26, DC.top + 30, ease(v2)); }
      else { const v2 = clamp((t - tH - 0.9) / 3, 0, 1); x = lerp(A.x, 780, v2) + j[0] * 30 * v2; y = lerp(DC.top + 30, 470, ease(v2)) + j[1] * 20 * v2; }
      ctx.save(); ctx.globalAlpha *= held; ctx.shadowColor = C.goud; ctx.shadowBlur = 14; hexagon(ctx, x, y, 13, rgba(C.goud, 0.7), C.goud, 1.6, 0); ctx.restore();
      if (t >= tH - 0.1 && t < tH + 1.0) drager(ctx, A.x, DC.top, 0, t < tH + 0.5 ? ease((t - tH) / 0.5) : 1 - ease((t - tH - 0.5) / 0.4), TPK.glut, 0.85, 0.0001); }
    if (dif > 0.01) tag(ctx, 'diffusie: van veel naar weinig', 960, 868, C.teal, dif * (1 - later));
    tag(ctx, 'nu minder in de darm dan in de cel', 960, 868, C.koraal, later);
  },
  s11(ctx, t, q) { bg(ctx, 'micro'); darmcelScene(ctx, t, { lumL: 3, lumC: 9 }); vraagteken(ctx, 960, 210, q.on('Wat'), 120); },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const act = q.on('toch', 1, 1.0), aa = q.on('aminozuren', 1, 1.0), w = q.on('water', 1, 1.0), uit = q.on('onderkant', 1, 1.2);
    const st = [{ kind: 'glu', api: [API0[0], API0[4]], bas: [BAS0[0], BAS0[3]], n: 6, T: 6.5, t0: q.at('toch') - 1.6, seed: 2 },
      { kind: 'aa', api: [API0[3]], bas: [BAS0[2]], n: 3, T: 6.5, t0: q.at('aminozuren') - 1.6, seed: 3 },
      { kind: 'h2o', api: [API0[2]], bas: [BAS0[1]], n: 6, T: 5, t0: q.at('water') - 1.2, seed: 4 }];
    darmcelScene(ctx, t, { stromen: st, energie: act * (1 - w * 0.6), lumL: lerp(3, 0, act), lumC: 9, gloedB: uit * (0.6 + 0.4 * Math.sin(t * 3)) * (1 - q.on('vlok', 1, 2.5) * 0.7) });
    tag(ctx, 'actief transport · kost energie', 960, 868, C.goud, q.on('actief') * (1 - aa));
    tag(ctx, 'glucose en aminozuren: actief transport', 960, 868, C.goud, aa * (1 - w));
    tag(ctx, 'water volgt door osmose (aquaporines)', 960, 868, TPK.aqp, w * (1 - uit));
    tag(ctx, 'onderkant: via transporteiwitten de cel uit', 960, 868, C.groen, uit);
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    // inzoomen op het apicale membraan (SGLT1 op de eerste microvillus), na 'zeldzame' weer uitzoomen naar de hele cel (20 okt 2026)
    const zin = q.on('transporteiwit', 1, 1.6), zuit = q.on('zeldzame', 1, 1.4), z = ease(zin) * (1 - ease(zuit)), F = [DC.fx[0], DC.top], D = [ZM.sg, ZM.ya], sc = 3.0;
    if (z < 0.999) { const S = lerp(1, sc, z), fx = lerp(F[0], D[0], z), fy = lerp(F[1], D[1], z); ctx.save(); ctx.globalAlpha *= 1 - ramp(z, 0.7, 0.3); ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-F[0], -F[1]);
      darmcelScene(ctx, t, { lumL: 5, lumC: 6, kruis: [DC.fx[0], DC.fx[4]], kruisA: q.on('niet', 1, 0.8) }); ctx.restore(); }
    zoomDetail(ctx, t, q, ramp(z, 0.7, 0.3));
    vraagteken(ctx, 1640, 420, q.on('Wat') * (1 - z), 110);
  },
  s16(ctx, t, q) { bg(ctx, 'micro');
    const a = q.on('Antwoord', 1, 0.6), d = q.on('dikke', 1, 1.0), lac = q.on('Melksuiker', 1, 0.8), fr = q.on('fructose', 1, 0.8);
    const api = API0.map(p => p.x === 1410 ? { x: 1410, k: 'glut5' } : p);
    const st = [{ kind: 'fru', api: [api[5]], bas: [BAS0[3]], n: 4, T: 6.5, t0: q.at('fructose') - 1.4, seed: 5, a: fr }];
    darmcelScene(ctx, t, { api, stromen: st, kruis: [510, 1230], kruisA: a, lumC: 0 });
    for (let i = 0; i < 6; i++) { const [jx, jy] = brown(i + 70, t, 12); (i % 2 ? glucose : galactoseMol)(ctx, 520 + i * 90 + jx, 190 + jy, 11, a); }
    for (let i = 0; i < 8; i++) { const [jx, jy] = brown(i + 90, t, 10); waterMol(ctx, 500 + i * 80 + jx, 152 + jy, 8, a * 0.9); }
    tag(ctx, 'suikers en water blijven in de darm', 960, 868, C.koraal, a * (1 - d));
    tag(ctx, 'naar de dikke darm: diarree', 960, 868, C.koraal, d * (1 - lac));
    if (lac > 0.01) { ctx.save(); ctx.globalAlpha *= lac * (1 - fr * 0.0); roundRect(ctx, 1556, 300, 340, 120, 16); shape(ctx, rgba(C.bgSchema, 0.95), V.melk, 1.5); text(ctx, 'lactose =', 1726, 350, fTekst(32, 600), C.text, 'center'); text(ctx, 'glucose + galactose', 1726, 394, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    naamBij(ctx, 'fructose', 'ander transporteiwit', 1470, 214, fr, 'left', C.groen);
    tag(ctx, 'fructose: ander transporteiwit', 960, 868, C.groen, fr * (1 - q.on('hoofdlijn')));
    tag(ctx, 'opname: via transporteiwitten', 960, 868, C.text, q.on('hoofdlijn'));
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
    const dp = noorDarm(ctx, 400, 40, 200, t, { darm: 1, uit: q.on('antwoord') > 0.5 ? 'blij' : 'denkt' }), bron = dp[Math.floor(dp.length * 0.2)];
    const p = q.on('geplooid', 1, 0.8), v = q.on('vlokken', 1, 0.8), m = q.on('microvilli', 1, 0.8);
    zoomCircle(ctx, 900, 420, 150, bron[0], bron[1], 'plooien', p, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(700, 220, 400, 400); plooiWand(ctx, 740, 1060, 440, 90, 1, 4); });
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

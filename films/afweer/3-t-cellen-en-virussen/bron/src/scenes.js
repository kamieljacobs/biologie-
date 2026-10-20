// Afweer 3 · T-cellen en virussen — scènes per alinea. Versie 1.1 (20 okt 2026): beeld na feedback Kamiel
// (castpersonages, antigenen loodrecht op het oppervlak, processen echt in beeld, één tekstbalk tegelijk).
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
grainCanvas = document.createElement('canvas'); grainCanvas.width = 1; grainCanvas.height = 1; // geen korrels (beeldafspraak)
const VIR = '#E07A5F', BACT = '#E07A5F', BCOL = '#5BA4C9', TCOL = '#7FC48F', AS = '#E0B64A', WIT = '#D8DCE2', EIGEN = '#8C7BBF', BEEN = '#E6D8A8', LYMF = '#7FC48F';
const TK = '#3E9E6A', TH = '#7FC48F', WAND = '#C9A35C', RIBO = '#9FC3E0', RNAK = '#F0D78C', MHCK = '#C9D2DE', NEUR = '#E6D8A8', DON = '#5BA4C9', VREEMD = '#F2A8B8', RT = '#C9B8F0';

// ---------- basisvormen (uit film 1, zelfde stijl in de hele reeks) ----------
// antigeen: driehoekje met de basis óp het oppervlak en de punt naar buiten (normaal nx, ny)
function antigeen(ctx, x, y, nx, ny, k = 1, a = 1, col = '#F2C0A8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tx = -ny, ty = nx, b = 5.5 * k, h = 8 * k;
  ctx.beginPath(); ctx.moveTo(x - tx * b, y - ty * b); ctx.lineTo(x + nx * h, y + ny * h); ctx.lineTo(x + tx * b, y + ty * b); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// bacterie: staafje met antigenen rondom, allemaal loodrecht op de wand
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0, kl = BACT, ag = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (ag > 0.01 && kl === BACT) { for (const px of [-12, 0, 12]) { antigeen(ctx, px, -11, 0, -1, 1, ag); antigeen(ctx, px + 6, 11, 0, 1, 1, ag); } for (const [cx, an] of [[15, -0.7], [15, 0.7], [-15, Math.PI - 0.7], [-15, Math.PI + 0.7]]) antigeen(ctx, cx + Math.cos(an) * 11, Math.sin(an) * 11, Math.cos(an), Math.sin(an), 1, ag); }
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, kl === BACT ? '#B9614D' : rgba(kl, 0.75), lighten(kl, 0.3), 1.5 / s);
  ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.bezierCurveTo(-4, -5, 4, 5, 12, 0); ctx.stroke();
  if (kapot > 0.01) { ctx.strokeStyle = rgba('#121A26', kapot); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(0, 0); ctx.lineTo(-4, 12); ctx.stroke(); }
  ctx.restore(); }
// lymfeknoop: boonvorm met kapsel, lichtere follikels en (optioneel) een uitgaand lymfevat
function lymfeknoop(ctx, x, y, rx, ry, a = 1, vat = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const boon = (k) => { ctx.beginPath(); ctx.moveTo(x - rx * k, y); ctx.bezierCurveTo(x - rx * k, y - ry * 1.3 * k, x + rx * k, y - ry * 1.3 * k, x + rx * k, y); ctx.bezierCurveTo(x + rx * k, y + ry * 1.25 * k, x + rx * 0.25 * k, y + ry * 1.1 * k, x, y + ry * 0.62 * k); ctx.bezierCurveTo(x - rx * 0.25 * k, y + ry * 1.1 * k, x - rx * k, y + ry * 1.25 * k, x - rx * k, y); ctx.closePath(); };
  if (vat) { ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x, y + ry * 0.7); ctx.bezierCurveTo(x, y + ry * 1.2, x + 40, y + ry * 1.5, x + 30, y + ry * 1.9); ctx.stroke(); }
  boon(1); shape(ctx, '#1E2E2A', rgba(C.groen, 0.8), 3); boon(0.86); ctx.strokeStyle = rgba(C.groen, 0.25); ctx.lineWidth = 2; ctx.stroke();
  for (const [fx, fy] of [[-0.62, -0.25], [-0.25, -0.62], [0.2, -0.66], [0.6, -0.3]]) { ctx.beginPath(); ctx.ellipse(x + fx * rx, y + fy * ry, rx * 0.17, ry * 0.2, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.14), null); }
  ctx.restore(); }
// één tekstbalk tegelijk: de vorige verdwijnt snel, dan komt de nieuwe (geen over elkaar heen lopende teksten)
function wissel(ctx, q, rij, x, y) { let k = -1; rij.forEach((r, i) => { if (q.on(r[1], r[2] || 1) > 0) k = i; }); if (k < 0) return; const u = q.on(rij[k][1], rij[k][2] || 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][3], 1 - u / 0.4); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][3], (u - 0.35) / 0.65); }
// fagocyt: grijze blob met lobbige kern; arm = uitstulping richting (tx, ty) 0..1
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '', kern = 'lobben', wob = 0.08 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, wob, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  if (kern === 'rond') circ(ctx, x - 0.35 * r, y - 0.25 * r, r * 0.26, rgba(C.kern, 0.6), C.kernR, 1.2); else for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }

// ---------- hulpjes voor oppervlakken ----------
// punt + naar buiten gerichte normaal op een ellips (rx, ry) bij hoek an
function opp(x, y, rx, ry, an) { const px = x + Math.cos(an) * rx, py = y + Math.sin(an) * ry; let nx = Math.cos(an) / rx, ny = Math.sin(an) / ry; const l = Math.hypot(nx, ny); nx /= l; ny /= l; return { x: px, y: py, nx, ny, phi: Math.atan2(ny, nx) }; }
// celomtrek met deuken (d < 0, naar binnen) en bulten (d > 0, naar buiten): [{an, d (fractie van r), w (breedte in rad)}]
function celPad(ctx, x, y, rx, ry, deuken = [], t = 0, seed = 0, wob = 0.03) { ctx.beginPath(); const N = 120;
  for (let i = 0; i <= N; i++) { const an = i / N * 6.283; let k = 1 + wob * (Math.sin(an * 3 + seed) * 0.5 + Math.sin(an * 5 + seed * 2 + t * 0.3) * 0.3);
    for (const dk of deuken) { let df = an - dk.an; df = Math.atan2(Math.sin(df), Math.cos(df)); k += dk.d * Math.exp(-(df / dk.w) * (df / dk.w)); }
    const px = x + Math.cos(an) * rx * k, py = y + Math.sin(an) * ry * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }
// antistof: gouden Y; s = schaal (1 ≈ 100 px hoog)
function antistof(ctx, x, y, s = 1, ang = 0, a = 1, col = AS) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 0); ctx.moveTo(0, 0); ctx.lineTo(-32, -42); ctx.moveTo(0, 0); ctx.lineTo(32, -42); ctx.stroke();
  ctx.fillStyle = lighten(col, 0.45); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 36, -47, 9, 0, 6.283); ctx.fill(); } ctx.restore(); }
// antistof die met één bindplaats precies óp een antigeen zit (punt px,py, normaal nx,ny van dat antigeen)
function antistofOp(ctx, px, py, nx, ny, s, a = 1) { if (a <= 0.01) return; const th = Math.atan2(ny, nx) - Math.PI / 2, c = Math.cos(th), si = Math.sin(th); const lx = 36 * s, ly = -47 * s; // (lx,ly) = bindplaats
  const ox = px - (lx * c - ly * si), oy = py - (lx * si + ly * c); antistof(ctx, ox, oy, s, th + Math.PI, a); }
// virus: bol met een envelop en uitsteeksels; aan de punt van elk uitsteeksel zit een antigeen, loodrecht naar buiten
// ast(i) = 0..1: antistof gebonden aan uitsteeksel i
function virus(ctx, x, y, r, ks = [3], t = 0, o = {}) { const { a = 1, col = VIR, rot = 0, ast = null, n = r >= 40 ? 14 : 10, binnen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = r * 0.32, k = Math.max(0.55, r / 26);
  for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n, nx = Math.cos(an), ny = Math.sin(an); ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = Math.max(2, r * 0.07); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + nx * r, y + ny * r); ctx.lineTo(x + nx * (r + L), y + ny * (r + L)); ctx.stroke(); antigeen(ctx, x + nx * (r + L), y + ny * (r + L), nx, ny, k, 1); }
  circ(ctx, x, y, r, rgba(col, 0.75), lighten(col, 0.3), Math.max(1.5, r * 0.05));
  if (binnen > 0.01 && r > 30) { ctx.save(); ctx.globalAlpha *= binnen; ctx.strokeStyle = RNAK; ctx.lineWidth = Math.max(2, r * 0.035); for (let s = 0; s < 8; s++) { const an = s * 0.785 + 0.3, cx0 = x + Math.cos(an) * r * 0.45, cy0 = y + Math.sin(an) * r * 0.45; ctx.beginPath(); for (let j = 0; j <= 12; j++) { const u = j / 12, px = cx0 + (u - 0.5) * r * 0.36, py = cy0 + Math.sin(u * 9 + t + s) * r * 0.06; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
  if (ast) for (let i = 0; i < n; i++) { const al = ast(i); if (al <= 0.01) continue; const an = rot + i * 6.283 / n, nx = Math.cos(an), ny = Math.sin(an); antistofOp(ctx, x + nx * (r + L + 8 * k), y + ny * (r + L + 8 * k), nx, ny, k * 0.22, al); }
  ctx.restore(); }
// MHC-houder op het oppervlak (punt px,py, hoek phi = richting naar buiten) met een stukje eiwit erin
// soort: 'I' (grijs, alle cellen) · 'II' (goud, antigeenpresenterende cellen) · 'vreemd' (roze, cellen van een ander)
function mhc(ctx, px, py, phi, soort = 'I', stukCol = null, a = 1, stukA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(px, py); ctx.rotate(phi + Math.PI / 2); ctx.lineCap = 'round';
  ctx.strokeStyle = soort === 'II' ? AS : soort === 'vreemd' ? VREEMD : MHCK; ctx.lineWidth = 5; ctx.beginPath();
  if (soort === 'vreemd') { ctx.moveTo(-6, 4); ctx.lineTo(-13, -14); ctx.moveTo(6, 4); ctx.lineTo(13, -14); } else { ctx.moveTo(-10, 4); ctx.lineTo(-10, -14); ctx.moveTo(10, 4); ctx.lineTo(10, -14); }
  if (soort === 'II') { ctx.moveTo(-10, 4); ctx.lineTo(10, 4); } ctx.stroke();
  if (stukCol && stukA > 0.01) { ctx.globalAlpha *= stukA; ctx.fillStyle = stukCol; roundRect(ctx, -7, -17, 14, 12, 4); ctx.fill(); }
  ctx.restore(); }
// lichaamscel; geinf = virus binnen (erfelijk materiaal + nieuwe viruseiwitten); toon = stukjes virus in MHC op het oppervlak;
// eigenToon = eigen stukjes; aanvoer 0..1 = stukjes virus reizen van binnen naar de houders; gaatjes; kapot = afbreken in blaasjes
function lCel(ctx, x, y, r, t, o = {}) { const { a = 1, geinf = 0, toon = 0, eigenToon = 0, kapot = 0, nieuw = 0, gaatjes = 0, gatAn = Math.PI, col = EIGEN, seed = 4, mhc: mh = 0, soort = 'I', aanvoer = -1, deuken = [], tint = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rx = r, ry = r * 0.9;
  if (kapot > 0.4) { const u = (kapot - 0.4) / 0.6; for (let i = 0; i < 9; i++) { const an = i * 0.7 + hash(i + seed) * 0.4; const d = r * (0.25 + 0.55 * u * (0.5 + hash(i * 5))); const rr = r * (0.3 - 0.12 * u) * (0.7 + 0.5 * hash(i * 3)); ctx.save(); ctx.globalAlpha *= 1 - 0.55 * u; celPad(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, rr, rr * 0.92, [], t, i, 0.05); shape(ctx, rgba(col, 0.28), col, 2); if (geinf > 0.01 && i % 3 === 0) circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, rr * 0.25, rgba(VIR, 0.5 * geinf)); ctx.restore(); } ctx.restore(); return; }
  const kr = 1 - 0.25 * kapot / 0.4; const bul = []; if (kapot > 0.01) for (let i = 0; i < 9; i++) bul.push({ an: i * 0.7 + hash(i + seed) * 0.4, d: 0.18 * kapot / 0.4, w: 0.18 });
  celPad(ctx, x, y, rx * kr, ry * kr, deuken.concat(bul), t, seed, 0.03); shape(ctx, tint > 0.01 ? rgba(VIR, 0.12 + 0.12 * tint) : rgba(col, 0.2), col, 2.5);
  // een beetje rustige textuur in het cytoplasma
  for (let i = 0; i < 7; i++) { const an = hash(i * 7 + seed) * 6.283, d = r * kr * (0.45 + 0.35 * hash(i * 3 + seed)); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, 3, rgba(C.text2, 0.25)); }
  circ(ctx, x - r * 0.15, y, r * 0.3 * kr, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (geinf > 0.01) { ctx.save(); ctx.globalAlpha *= geinf; ctx.strokeStyle = RNAK; ctx.lineWidth = 3; for (let s = 0; s < 3; s++) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; const px = x - r * 0.3 + u * r * 0.3, py = y - r * 0.08 + s * r * 0.08 + Math.sin(u * 12 + t * 2 + s) * r * 0.025; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
    for (let i = 0; i < 5; i++) { const an = hash(i * 13 + 2) * 6.283, d = r * (0.42 + 0.25 * hash(i * 5 + 1)); ctx.save(); ctx.translate(x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9); ctx.rotate(an + t * 0.3); ctx.strokeStyle = rgba(VIR, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j <= 8; j++) { const px = -12 + j * 3, py = Math.sin(j * 1.6) * 4; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); } ctx.restore(); }
  const nv = Math.round(10 * nieuw); for (let i = 0; i < nv; i++) { const an = hash(i * 9) * 6.283, d = r * (0.45 + 0.35 * hash(i * 4)); virus(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, r * 0.06, [3], t, { rot: i, n: 8 }); }
  const n = 10; for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.2; const p = opp(x, y, rx * kr, ry * kr, an); const vir = i % 2 === 0;
    const al = vir ? (aanvoer >= 0 ? (aanvoer >= 0.97 ? 1 : 0) : toon) : eigenToon; const hz = Math.max(mh, al > 0.01 ? 1 : 0);
    if (hz > 0.01) mhc(ctx, p.x, p.y, p.phi, soort, vir ? VIR : EIGEN, hz, al);
    if (vir && aanvoer > 0.01 && aanvoer < 0.97) { const u = ease(aanvoer / 0.97), fx = lerp(x - r * 0.15, p.x, u), fy = lerp(y, p.y, u); ctx.fillStyle = VIR; roundRect(ctx, fx - 7, fy - 6, 14, 12, 4); ctx.fill(); } }
  if (gaatjes > 0.01) for (let i = 0; i < 4; i++) { const p = opp(x, y, rx * kr, ry * kr, gatAn - 0.36 + i * 0.24); circ(ctx, p.x, p.y, 8 * gaatjes, rgba(C.bgMicro, 1), rgba(TK, 0.9), 2.5); }
  ctx.restore(); }
// T-cel: ronde lymfocyt met grote kern en T-celreceptoren rondom (loodrecht op het membraan);
// doel = {x, y}: één receptor wijst daarheen en de cel licht op (gloed)
function tCel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, label = '', col = TCOL, gloed = 0, doel = null, rec = 1, kapot = 0, seed = 5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * kapot);
  if (gloed > 0.01) { const g = ctx.createRadialGradient(x, y, r, x, y, r * 2.2); g.addColorStop(0, rgba(col, 0.45 * gloed)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, 6.283); ctx.fill(); }
  const d0 = doel ? Math.atan2(doel.y - y, doel.x - x) : 99; const nr = 9;
  if (rec > 0.01) for (let i = 0; i < nr; i++) { const an = doel ? d0 + i * 6.283 / nr : i * 6.283 / nr + 0.25, nx = Math.cos(an), ny = Math.sin(an), k = r / 60;
    ctx.save(); ctx.globalAlpha *= rec; ctx.translate(x + nx * r * 0.98, y + ny * r * 0.98); ctx.rotate(an + Math.PI / 2); ctx.strokeStyle = (doel && i === 0) ? lighten(col, 0.4 * gloed) : col; ctx.lineWidth = 4 * Math.max(0.7, k); ctx.lineCap = 'round';
    // stam + kommetje met een inkeping (past op houder + stukje)
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -9 * k); ctx.moveTo(-9 * k, -20 * k); ctx.lineTo(-9 * k, -9 * k); ctx.lineTo(9 * k, -9 * k); ctx.lineTo(9 * k, -20 * k); ctx.stroke(); ctx.restore(); }
  blob(ctx, x, y, r, r * 0.96, 0.04, seed, t); shape(ctx, rgba(col, 0.3 + 0.25 * gloed), col, 2.5); circ(ctx, x + r * 0.05, y, r * 0.62, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r * 1.35 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// B-cel: blauwe lymfocyt met receptoren rondom = antistoffen vast in het membraan (kleine Y's, loodrecht naar buiten)
function bCel(ctx, x, y, r, k = 0, t = 0, o = {}) { const { a = 1, col = BCOL, rec = 1, n = 9, glow = 0, seed = 2, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2); g.addColorStop(0, rgba(AS, 0.35 * glow)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, 6.283); ctx.fill(); }
  const s = r * 0.0042; if (rec > 0.01) for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.3, nx = Math.cos(an), ny = Math.sin(an); antistof(ctx, x + nx * (r * 0.97 + 50 * s), y + ny * (r * 0.97 + 50 * s), s, an + Math.PI / 2, rec, col); }
  blob(ctx, x, y, r, r * 0.95, 0.04, seed, t); shape(ctx, rgba(col, 0.28), col, 2.5); circ(ctx, x, y, r * 0.58, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r * 1.5 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// korrels (stoffen van de T-killercel) die van a naar b reizen
function korrels(ctx, x0, y0, x1, y1, t, a = 1, n = 8) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = (t * 0.7 + i / n) % 1; circ(ctx, lerp(x0, x1, u) + Math.sin(u * 9 + i) * 8, lerp(y0, y1, u) + Math.cos(u * 7 + i) * 8, 6, rgba(C.goud, a * (1 - u * 0.6))); } }
// signaalstofjes in een stroom van a naar b
function signaal(ctx, x0, y0, x1, y1, t, a = 1, n = 10) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = (t * 0.45 + i / n) % 1; const mx = (x0 + x1) / 2 + (y1 - y0) * 0.12, my = (y0 + y1) / 2 - (x1 - x0) * 0.12; const px = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, py = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1;
  ctx.save(); ctx.globalAlpha *= a * Math.sin(u * Math.PI); ctx.translate(px, py); ctx.rotate(i); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(6, 4); ctx.lineTo(-6, 4); ctx.closePath(); ctx.fill(); ctx.restore(); } }
function vonk(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const an = i * 0.785 + t; const r0 = 14, r1 = 30 + 6 * Math.sin(t * 4 + i); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); } ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function schimmel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 14 * s, rgba('#9AA3B2', 0.7), '#C9D2DE', 1.5); circ(ctx, x + 15 * s, y + 6 * s, 9 * s, rgba('#9AA3B2', 0.7), '#C9D2DE', 1.5); ctx.restore(); }

// ---------- figuren voor film 3 ----------
// grote bacterie in doorsnede: celwand, membraan, ribosomen, DNA; kapot = gaten in de wand
function bacterieGroot(ctx, x, y, w, h, t, o = {}) { const { a = 1, kapot = 0, wand = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); shape(ctx, rgba(VIR, 0.22), null);
  if (wand > 0.01) { ctx.save(); ctx.globalAlpha *= wand; ctx.strokeStyle = WAND; ctx.lineWidth = 14; if (kapot > 0.01) ctx.setLineDash([60, 8 + 40 * kapot]); roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(VIR, 0.3); ctx.lineWidth = 3; roundRect(ctx, x - w / 2 + 16, y - h / 2 + 16, w - 32, h - 32, h / 2 - 16); ctx.stroke();
  for (let i = 0; i < 26; i++) circ(ctx, x - w / 2 + 50 + hash(i * 3) * (w - 100), y - h / 2 + 40 + hash(i * 7) * (h - 80), 6, RIBO);
  ctx.strokeStyle = RNAK; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60; const px = x - w * 0.25 + u * w * 0.5, py = y + Math.sin(u * 18 + t) * 22 + Math.cos(u * 7) * 18; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1, ang = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -60, -24, 120, 48, 24); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -24, 60, 48, 24); ctx.fill(); ctx.fillRect(0, -24, 20, 48); ctx.restore(); }
function thymus(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sx * 46 * s, y, 50 * s, 95 * s, sx * 0.15, 0, 6.283); shape(ctx, rgba('#E8A0B0', 0.3), '#E8A0B0', 2.5); } ctx.restore(); }
// klein molecuul (antibioticum, hiv-remmer): zeshoekje
function molecuul(ctx, x, y, s, col, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * 1.047; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * s, Math.sin(an) * s); } ctx.closePath(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
// dubbelstreng DNA tussen x0 en x1 (horizontaal), met optioneel een gat (gx, gw) waarin een ander stuk past
function dnaStreng(ctx, x0, x1, y, t, col1, col2, a = 1, amp = 12, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (const [off, col] of [[0, col1], [Math.PI, col2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); const N = Math.max(8, Math.round((x1 - x0) / 6)); for (let k = 0; k <= N; k++) { const u = k / N, px = x0 + u * (x1 - x0), py = y + Math.sin(px * 0.06 + off) * amp; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }

// slaapkamer met Noor rechtop in bed (castpersonage, bovenlijf boven het dekbed)
function slaapkamer(ctx, t, o = {}) { const { opBed = 1, ziek = 1, uit = 'bezorgd' } = o;
  ctx.fillStyle = '#2F3A55'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5A4636'; ctx.fillRect(0, 760, W, H - 760);
  roundRect(ctx, 560, 110, 300, 230, 10); shape(ctx, '#1E2A40', '#8FA0B5', 4); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(710, 110); ctx.lineTo(710, 340); ctx.stroke();
  roundRect(ctx, 120, 520, 900, 240, 20); shape(ctx, '#6B4E3A', '#4A3626', 3); roundRect(ctx, 100, 380, 60, 400, 20); shape(ctx, '#7A5A44', '#4A3626', 3);
  roundRect(ctx, 170, 440, 260, 110, 40); shape(ctx, '#E6E1D3', '#B8B2A4', 2);
  let anc = null;
  if (opBed > 0.01) { ctx.save(); ctx.globalAlpha *= opBed; ctx.beginPath(); ctx.rect(0, 0, W, 600); ctx.clip(); anc = persoon(ctx, 'noor', 330, 990, 720, { uit, t, outfit: 'zomer' }); ctx.restore();
    if (anc.hoofd && ziek > 0.01) { const h = anc.hoofd; ctx.save(); ctx.globalAlpha *= opBed * ziek; for (const sx of [-1, 1]) { const g = ctx.createRadialGradient(h.x + sx * h.r * 0.5, h.y + h.r * 0.35, 1, h.x + sx * h.r * 0.5, h.y + h.r * 0.35, h.r * 0.35); g.addColorStop(0, rgba('#E0503E', 0.45)); g.addColorStop(1, rgba('#E0503E', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h.x + sx * h.r * 0.5, h.y + h.r * 0.35, h.r * 0.35, 0, 6.283); ctx.fill(); }
      // koortsthermometer in de mond en een zweetdruppel
      ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(h.x + h.r * 0.1, h.y + h.r * 0.62); ctx.lineTo(h.x + h.r * 1.05, h.y + h.r * 0.9); ctx.stroke(); circ(ctx, h.x + h.r * 1.08, h.y + h.r * 0.91, 6, C.koraal);
      const v = (t * 0.4) % 1; ctx.fillStyle = rgba('#9FC3E0', 0.9 * (1 - v)); const sx = h.x - h.r * 0.85, sy = h.y - h.r * 0.2 + v * 30; ctx.beginPath(); ctx.moveTo(sx, sy - 10); ctx.quadraticCurveTo(sx + 7, sy + 2, sx, sy + 5); ctx.quadraticCurveTo(sx - 7, sy + 2, sx, sy - 10); ctx.fill(); ctx.restore(); } }
  roundRect(ctx, 250, 540 - 20 * opBed, 760, 200 + 20 * opBed, 40); shape(ctx, '#5BA4C9', '#3E7FA0', 3); ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(380 + i * 160, 540); ctx.lineTo(380 + i * 160, 740); ctx.stroke(); }
  return anc; }
function hivGrafiekT(s) { if (s < 0.08) return 1000 - 6000 * s; if (s < 0.5) return 520 + 230 * (s - 0.08) / 0.42; return Math.max(80, 750 - 62 * (s - 0.5)); }
function hivGrafiekV(s) { if (s < 0.1) return 1000 * s / 0.1; if (s < 0.5) return 1000 - 920 * (s - 0.1) / 0.4; return 80 + 6 * Math.pow(Math.max(0, s - 0.5), 2.1); }
// zenuwcel: cellichaam met dendrieten en een lange uitloper naar (x1, y1)
function zenuwcel(ctx, x, y, x1, y1, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(NEUR, 0.8); ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) { const an = 1.2 + i * 0.75, L = 120 + 40 * hash(i); ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 80, y + Math.sin(an) * 70); const ex = x + Math.cos(an) * (80 + L), ey = y + Math.sin(an) * (70 + L); ctx.quadraticCurveTo(x + Math.cos(an + 0.3) * (80 + L * 0.6), y + Math.sin(an + 0.3) * (70 + L * 0.6), ex, ey); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an - 0.5) * 40, ey + Math.sin(an - 0.5) * 40); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an + 0.5) * 40, ey + Math.sin(an + 0.5) * 40); ctx.stroke(); }
  ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x + 80, y); ctx.bezierCurveTo(x + 400, y - 30, x1 - 380, y1 + 60, x1, y1); ctx.stroke();
  ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { const an = -0.8 + i * 0.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + Math.cos(an) * 50, y1 + Math.sin(an) * 50); ctx.stroke(); }
  blob(ctx, x, y, 100, 88, 0.05, 3, t); shape(ctx, rgba(NEUR, 0.25), NEUR, 3); circ(ctx, x, y, 36, rgba(C.kern, 0.6), C.kernR, 1.2); ctx.restore(); }
const zenuwPad = (x, y, x1, y1, u) => { const p0 = [x + 80, y], c1 = [x + 400, y - 30], c2 = [x1 - 380, y1 + 60], p3 = [x1, y1], v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u * u * u * p3[1]]; };

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1520, cy = 470;
    lCel(ctx, cx, cy, 170, t, { geinf: 1, toon: 1, eigenToon: 1, nieuw: 0.4 });
    const ap = 0.5 + 0.5 * Math.sin(t * 0.8); const d = opp(cx, cy, 170, 153, 4 * 0.628 + 0.2); tCel(ctx, d.x + d.nx * (74 + 26 + 30 * (1 - ap)), d.y + d.ny * (74 + 26 + 30 * (1 - ap)), 74, t, { col: TK, doel: { x: d.x, y: d.y }, gloed: ap });
    virus(ctx, cx + 260, cy - 230, 26, [3], t, { rot: t * 0.2 }); virus(ctx, cx + 300, cy + 200, 22, [3], t, { rot: -t * 0.2 }); },

  s01(ctx, t, q) { const nee = q.on('nee', 1);
    slaapkamer(ctx, t, { uit: 'bezorgd' });
    tag(ctx, '± 39 °C', 330, 200, C.koraal, q.on('negenendertig', 1));
    // de moeder belt (buiten beeld): telefoon met belgolfjes, verbinding met de huisarts (Dr. Kim)
    const bl = q.on('belt', 1); if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; roundRect(ctx, 1160, 470, 70, 120, 14); shape(ctx, '#1A1F2B', '#8FA0B5', 3); roundRect(ctx, 1170, 485, 50, 80, 6); ctx.fillStyle = rgba('#5BA4C9', 0.5); ctx.fill();
      for (let i = 0; i < 3; i++) { const v = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = rgba(C.text2, 1 - v); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1195, 530, 70 + v * 60, -0.7, 0.7); ctx.stroke(); }
      regel(ctx, 'mama belt de huisarts', 1195, 650, 1, C.text2, 26, 'center', 700); ctx.restore(); }
    const ins = q.on('huisarts', 1); if (ins > 0.01) { ctx.save(); ctx.globalAlpha *= ins; const ix = 1560, iy = 470, ir = 230;
      ctx.save(); ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); ctx.clip(); ctx.fillStyle = '#DCE6EE'; ctx.fillRect(ix - ir, iy - ir, 2 * ir, 2 * ir); ctx.fillStyle = '#B9C8D4'; ctx.fillRect(ix - ir, iy + 120, 2 * ir, 200);
        persoon(ctx, 'kim', ix, iy + 760, 900, { uit: nee > 0.3 ? 'neutraal' : 'praat', pose: nee > 0.3 ? 'schouders' : 'staan', t }); ctx.restore();
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); ctx.stroke(); naamBij(ctx, 'huisarts', '', ix, iy + ir + 50, 1, 'center', C.text); ctx.restore(); }
    wissel(ctx, q, [['antibiotica?', 'antibiotica', 1, C.goud], ['huisarts: nee, helpt niet tegen griep', 'nee', 1, C.text2]], 1460, 150);
    vraagteken(ctx, 1110, 330, q.on('Waarom', 1), 140); },

  s04(ctx, t, q) { bg(ctx, 'micro');
    const pv = q.on('virus', 1), p1 = 1 - pv;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const kap = ramp(t, q.at('bouwen'), 2.5), ab = q.on('Antibiotica', 1), los = ramp(t, q.at('bouwen') - 0.6, 1.6);
      bacterieGroot(ctx, 560, 460, 640, 300, t, { kapot: kap });
      naamBij(ctx, 'celwand', '', 300, 290, q.on('celwand', 1), 'left', WAND);
      naamBij(ctx, 'ribosomen', '', 770, 284, q.on('ribosomen', 1), 'left', RIBO);
      regel(ctx, 'bacterie: een cel', 560, 700, 1, VIR, 32, 'center', 700);
      pil(ctx, 980, 330, 0.9, ab * (1 - los));
      // het antibioticum lost op: moleculen gaan naar de celwand, waar de bouw stokt
      if (los > 0.01) for (let i = 0; i < 9; i++) { const u = clamp(los * 1.4 - i * 0.05, 0, 1); const tx = 560 + (i - 4) * 70, ty = i % 2 ? 310 : 610; molecuul(ctx, lerp(980, tx, u), lerp(330, ty, u), 9, C.koraal, ab, t + i); }
      wissel(ctx, q, [['eigen stofwisseling', 'stofwisseling', 1, C.text2], ['antibiotica remmen de bouw van de celwand', 'Antibiotica', 1, C.koraal]], 560, 820);
      const jw = q.on('Jouw', 1); ctx.save(); ctx.globalAlpha *= jw; lCel(ctx, 1450, 460, 200, t); regel(ctx, 'jouw cel', 1450, 720, 1, EIGEN, 32, 'center', 700); regel(ctx, 'geen celwand', 1450, 770, 1, C.text2, 28, 'center'); regel(ctx, 'andere ribosomen', 1450, 810, q.on('andere', 1), C.text2, 28, 'center'); vink(ctx, 1450, 200, 34, q.on('kapotgaan', 1)); ctx.restore();
      ctx.restore(); }
    if (pv > 0.01) { ctx.save(); ctx.globalAlpha *= pv;
      bacterieGroot(ctx, 420, 470, 400, 190, t, { a: 1 }); regel(ctx, 'bacterie ± 1–2 µm', 420, 640, 1, VIR, 28, 'center', 700);
      virus(ctx, 720, 470, 16, [3], t, { rot: t * 0.2 }); regel(ctx, 'virus ± 0,1 µm', 720, 545, q.on('tien', 1), VIR, 30, 'center', 700);
      zoomCircle(ctx, 1380, 440, 300, 720, 470, '', q.on('eiwitmantel', 1), () => { virus(ctx, 1380, 440, 150, [3], t, { rot: t * 0.05, binnen: q.on('erfelijk', 1) }); });
      naamBij(ctx, 'eiwitmantel', '', 1712, 440, q.on('eiwitmantel', 1), 'left', VIR); naamBij(ctx, 'erfelijk materiaal', '', 1380, 790, q.on('erfelijk', 1), 'center', RNAK);
      tag(ctx, 'eet niet · groeit niet · vermenigvuldigt zich niet zelf', 560, 820, C.text2, q.on('groeit', 1));
      ctx.restore(); }
  },
  // het griepvirus hecht, wordt in een blaasje opgenomen, laat zijn erfelijk materiaal los; de cel maakt nieuwe virussen die uitknoppen
  s05(ctx, t, q) { bg(ctx, 'micro'); const cx = 900, cy = 520, r = 250, ry = r * 0.9, A0 = -1.25;
    const ht = ramp(t, q.at('hecht') - 0.4, 1.6), inn = ramp(t, q.at('brengt'), 1.6), rel = ramp(t, q.at('binnen'), 1.6), nw = ramp(t, q.at('nieuwe'), 3.5), hd = ramp(t, q.at('Honderden'), 2), vr = ramp(t, q.at('vrij'), 2.2), inf = ramp(t, q.at('infecteren'), 2), kp = q.on('gekaapt', 1);
    const p0 = opp(cx, cy, r, ry, A0), vR = 28;
    const buur = [[290, cy + 40, 170, 7], [1530, cy + 40, 190, 9]];
    for (const [bx, by, br, sd] of buur) lCel(ctx, bx, by, br, t, { seed: sd, geinf: inf });
    // deuk (opname) en bulten (uitknoppen)
    const deuk = inn < 1 ? [{ an: A0, d: -0.28 * inn, w: 0.16 + 0.04 * inn }] : [];
    const KN = [-2.5, -0.35, 0.4, 1.3, 2.2, 3.0], bul = vr > 0.01 && vr < 0.6 ? KN.map(an => ({ an, d: 0.14 * Math.sin(vr / 0.6 * Math.PI), w: 0.1 })) : [];
    lCel(ctx, cx, cy, r, t, { geinf: rel, deuken: deuk.concat(bul), tint: kp });
    for (let i = 0; i < 11; i++) { const an = -2.55 + i * 0.12; if (Math.abs(an - A0) < 0.14 && inn > 0.01 && inn < 1) continue; const p = opp(cx, cy, r, ry, an); ctx.strokeStyle = rgba(EIGEN, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.nx * 32 + 6 * Math.sin(t * 6 + i), p.y + p.ny * 32); ctx.stroke(); }
    naamBij(ctx, 'cel van je luchtwegen', '', cx, 870, 1, 'center', EIGEN);
    // het binnenkomende virus
    if (rel < 1) { const start = [1500, 120], aan = [p0.x + p0.nx * vR * 1.45, p0.y + p0.ny * vR * 1.45], bin = [p0.x - p0.nx * vR * 2.2, p0.y - p0.ny * vR * 2.2];
      const vx = inn > 0 ? lerp(aan[0], bin[0], inn) : lerp(start[0], aan[0], ht), vy = inn > 0 ? lerp(aan[1], bin[1], inn) : lerp(start[1], aan[1], ht);
      virus(ctx, vx, vy, vR, [3], t, { a: 1 - rel, rot: ht < 1 ? t * 0.3 : 0.4 });
      if (inn > 0.95) { ctx.save(); ctx.globalAlpha *= 1 - rel; ctx.strokeStyle = rgba(EIGEN, 0.9); ctx.lineWidth = 2.5; ctx.setLineDash(rel > 0.05 ? [10, 8 * rel + 2] : []); ctx.beginPath(); ctx.arc(vx, vy, vR * 1.7, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }
    // erfelijk materiaal (8 stukjes) reist naar de kern
    if (rel > 0.01 && nw < 1) { const bx = p0.x - p0.nx * vR * 2.2, by = p0.y - p0.ny * vR * 2.2, kx = cx - r * 0.15, ky = cy; for (let s = 0; s < 8; s++) { const u = clamp(rel * 1.3 - s * 0.04, 0, 1) * (1 - 0.0 * nw); const px = lerp(bx, kx + (s - 4) * 8, ramp(t, q.at('binnen') + 0.4, 2.5)) + Math.cos(s) * 18 * u, py = lerp(by, ky + Math.sin(s * 2) * 20, ramp(t, q.at('binnen') + 0.4, 2.5)) + Math.sin(s) * 14 * u;
        ctx.save(); ctx.globalAlpha *= u * (1 - nw); ctx.strokeStyle = RNAK; ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j <= 8; j++) { const xx = px - 14 + j * 3.5, yy = py + Math.sin(j * 1.4 + t * 2 + s) * 4; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); } }
    if (q.on('bevel', 1) > 0.01) { const g = ctx.createRadialGradient(cx - r * 0.15, cy, 5, cx - r * 0.15, cy, r * 0.45); g.addColorStop(0, rgba(VIR, 0.35 * q.on('bevel', 1) * (0.7 + 0.3 * Math.sin(t * 4)))); g.addColorStop(1, rgba(VIR, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx - r * 0.15, cy, r * 0.45, 0, 6.283); ctx.fill(); }
    // nieuwe virusdeeltjes worden in elkaar gezet en knoppen uit het membraan
    const N = Math.round(10 * nw + 14 * hd); for (let i = 0; i < N; i++) { const an = hash(i * 9 + 1) * 6.283, d = r * (0.42 + 0.4 * hash(i * 4 + 2)); const w = wander(i, t, 6, 0.6); let px = cx + Math.cos(an) * d * 0.9 + w.x, py = cy + Math.sin(an) * d * 0.8 + w.y;
      const ki = i % 6, wordtVrij = i < 12 && vr > 0.01; let al = 1;
      if (wordtVrij) { const pk = opp(cx, cy, r, ry, KN[ki]); const u1 = clamp(vr / 0.5, 0, 1), u2 = clamp((vr - 0.4) / 0.6, 0, 1); const tgt = buur[ki % 2]; const ox = pk.x + pk.nx * 16, oy = pk.y + pk.ny * 16; const doelx = tgt[0] + (hash(i) - 0.5) * 120, doely = tgt[1] - tgt[2] * 0.8 + hash(i * 3) * 60;
        px = lerp(lerp(px, ox, u1), lerp(ox + pk.nx * 120, doelx, inf), u2) + (i >= 6 ? pk.nx * 30 * u2 : 0); py = lerp(lerp(py, oy, u1), lerp(oy + pk.ny * 120, doely, inf), u2); al = 1 - 0.6 * inf; }
      virus(ctx, px, py, 13, [3], t, { rot: i, n: 8, a: clamp(nw * 10 + hd * 14 - i, 0, 1) * al }); }
    wissel(ctx, q, [['het virus hecht zich aan een cel', 'hecht', 1, VIR], ['het brengt zijn erfelijk materiaal naar binnen', 'brengt', 1, RNAK], ['de cel maakt nieuwe virusdeeltjes', 'nieuwe', 1, RNAK], ['honderden, soms duizenden', 'Honderden', 1, RNAK], ['ze komen vrij en infecteren de buurcellen', 'vrij', 1, VIR], ['je cel is gekaapt', 'gekaapt', 1, C.koraal]], 960, 140);
  },
  s06(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Slik', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      bacterieGroot(ctx, 520, 460, 460, 220, t, { kapot: 0.7 }); pil(ctx, 520, 250, 0.8); regel(ctx, 'bacterie: wel iets te remmen', 520, 650, 1, VIR, 30, 'center', 700);
      virus(ctx, 1380, 460, 90, [3], t, { rot: t * 0.05, binnen: 1 }); pil(ctx, 1380, 250, 0.8); kruis(ctx, 1380, 250, 50, q.on('remmen', 1)); regel(ctx, 'virus: niets te remmen', 1380, 650, 1, VIR, 30, 'center', 700);
      wissel(ctx, q, [['antwoord a: een virus is geen cel', 'aa', 1, C.goud], ['antibiotica hebben nooit tegen virussen gewerkt', 'nooit', 1, C.koraal]], 960, 820);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const dd = ramp(t, q.at('dood'), 2), gr = ramp(t, q.at('vermenigvuldigen'), 3.5), mu = q.on('mutatie', 1), ab = q.on('Slik', 1) * (1 - ramp(t, q.at('vermenigvuldigen'), 2));
      ctx.beginPath(); ctx.ellipse(960, 460, 760, 300, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.05), rgba(C.goud, 0.4), 2); regel(ctx, 'bacteriën in je darm', 960, 140, 1, C.text2, 28, 'center');
      for (let i = 0; i < 14; i++) { const w = wander(i + 50, t, 300, 0.15); molecuul(ctx, 960 + w.x * 2, 460 + w.y * 0.7, 9, C.koraal, ab * 0.8, t + i); }
      const RES = [];
      for (let i = 0; i < 40; i++) { const res = i % 13 === 0; const x = 300 + hash(i * 3) * 1320, y = 230 + hash(i * 7) * 460; if (res) { RES.push([x, y, hash(i) * 6]); bacterie(ctx, x, y, 1.3, hash(i) * 6, 1, 0); if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= mu; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 46, 30, hash(i) * 6, 0, 6.283); ctx.stroke(); ctx.restore(); } } else bacterie(ctx, x, y, 1.3 * (1 - 0.3 * dd), hash(i) * 6, 1 - 0.9 * dd, dd); }
      // de ongevoelige bacteriën delen zich: elke deling twee nieuwe naast de oude
      const gen = gr * 3; RES.forEach(([x, y, an], j) => { for (let k = 1; k < 8; k++) { const born = Math.floor(Math.log2(k)); const f = clamp(gen - born, 0, 1); if (f <= 0) continue; const par = k - Math.pow(2, born); const pos = (m) => m === 0 ? [x, y] : [x + Math.cos(m * 2.4 + j) * (40 + 18 * m), y + Math.sin(m * 2.4 + j) * (30 + 12 * m)];
          const [ax, ay] = pos(par), [bx, by] = pos(k); bacterie(ctx, lerp(ax, bx, f), lerp(ay, by, f), 1.3, an + k, f); if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= f * mu; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(lerp(ax, bx, f), lerp(ay, by, f), 46, 30, an + k, 0, 6.283); ctx.stroke(); ctx.restore(); } } });
      wissel(ctx, q, [['de gevoelige gaan dood', 'dood', 1, C.text2], ['een paar zijn door een mutatie ongevoelig', 'mutatie', 1, C.goud], ['selectie: zij blijven over en vermenigvuldigen zich', 'vermenigvuldigen', 1, C.goud], ['resistentie: de bacteriën worden ongevoelig, niet jij', 'resistentie', 1, C.koraal]], 960, 820);
      ctx.restore(); }
  },
  s07(ctx, t, q) { bg(ctx, 'micro'); const vg = q.on('vangen', 1);
    // buiten de cel: antistoffen zwemmen aan en binden met hun bindplaats óp de antigenen
    virus(ctx, 420, 420, 70, [3], t, { rot: 0.2, ast: i => i % 2 ? clamp(ramp(t, q.at('vangen') + (i % 7) * 0.12, 0.8), 0, 1) : 0 }); regel(ctx, 'buiten de cel: antistoffen vangen het virus', 420, 640, vg, AS, 28, 'center', 700);
    lCel(ctx, 1280, 470, 240, t, { geinf: 1, nieuw: 0.5 });
    const bin = q.on('binnen', 1); for (let i = 0; i < 6; i++) { const an = 2.4 + i * 0.25; const bounce = 0.5 + 0.5 * Math.sin(t * 2 + i); antistof(ctx, 1280 + Math.cos(an) * (300 + 30 * bounce), 470 + Math.sin(an) * (265 + 30 * bounce), 0.4, an + Math.PI / 2, bin); }
    kruis(ctx, 1000, 330, 30, q.on('niet', 1)); regel(ctx, 'in de cel: antistoffen kunnen er niet bij', 1280, 800, bin, C.koraal, 28, 'center', 700);
    vraagteken(ctx, 960, 200, q.on('Hoe', 1), 120); },

  s09(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Daarvoor', 1), p3 = q.on('Weet', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; lCel(ctx, 960, 450, 230, t, { geinf: 1, nieuw: 0.6 }); const tr = ramp(t, q.at('haalt'), 1.5) * (1 - ramp(t, q.at('Maar'), 0.8)); fagocyt(ctx, 1450, 330, 80, t, { arm: tr, tx: 1200, ty: 380, a: 0.8 }); kruis(ctx, 1260, 330, 40, q.on('niet', 1)); tag(ctx, 'de hele cel moet weg', 960, 820, C.koraal, q.on('hele', 1)); ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3); bg(ctx, 'schema');
      // Noor met een kijkje in het lichaam: beenmerg in het dijbeen, thymus achter het borstbeen
      const an = persoon(ctx, 'noor', 420, 940, 780, { uit: 'neutraal', t, outfit: 'zomer' }); const hy = an.hoofd.y, hr = an.hoofd.r, hp = an.heup.y; const thx = 420, thy = hy + hr * 2.6, fx0 = 452, fy0 = hp + 20, fx1 = 458, fy1 = hp + 150;
      ctx.save(); ctx.globalAlpha *= 0.5; ctx.beginPath(); ctx.ellipse(thx, thy + 10, 70, 70, 0, 0, 6.283); ctx.fillStyle = '#1A2740'; ctx.fill(); ctx.beginPath(); ctx.ellipse(455, (fy0 + fy1) / 2, 40, 100, 0, 0, 6.283); ctx.fill(); ctx.restore();
      const bm = q.on('beenmerg', 1); ctx.strokeStyle = BEEN; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(fx0, fy0); ctx.lineTo(fx1, fy1); ctx.stroke(); ctx.strokeStyle = rgba('#C9483E', 0.4 + 0.5 * bm * (0.7 + 0.3 * Math.sin(t * 4))); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(fx0, fy0 + 8); ctx.lineTo(fx1, fy1 - 8); ctx.stroke();
      thymus(ctx, thx, thy + 8, 0.42, 0.4 + 0.6 * q.on('thymus', 1));
      naamBij(ctx, 'beenmerg', '', 520, fy0 + 90, bm, 'left', BEEN); naamBij(ctx, 'thymus', 'achter je borstbeen', 270, thy - 10, q.on('thymus', 1), 'right', '#E8A0B0');
      // een jonge T-cel reist van het beenmerg naar de thymus
      const rs = ramp(t, q.at('rijpen'), 2.2); if (bm > 0.01) { const px = rs > 0 ? lerp(fx0, thx, rs) : fx0 + 2, py = rs > 0 ? lerp(fy0 + 40, thy + 8, rs) : fy0 + 40; tCel(ctx, px, py, 13, t, { col: TCOL, rec: 0, a: bm * (1 - ramp(t, q.at('klier'), 0.8)) }); }
      // zoom op de thymus: T-cellen rijpen (krijgen receptoren) en gaan eruit
      const zm = q.on('thymus', 1); zoomCircle(ctx, 1260, 440, 300, thx + 60, thy, '', zm, () => { ctx.fillStyle = '#1E2230'; ctx.fillRect(960, 140, 600, 600); thymus(ctx, 1260, 440, 2.6, 0.9);
        for (let i = 0; i < 6; i++) { const u = (t * 0.12 + i / 6) % 1; const px = lerp(1080, 1460, u), py = 440 + Math.sin(i * 2.1) * 140 + Math.sin(u * 6 + i) * 20; tCel(ctx, px, py, 34, t, { col: TCOL, rec: clamp((u - 0.25) * 2.5, 0, 1), seed: i }); } });
      tag(ctx, 'T van thymus', 1260, 830, TH, q.on('vandaan', 1));
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const gi = q.on('geïnfecteerde', 1);
      lCel(ctx, 560, 460, 200, t, { eigenToon: q.on('stukjes', 1) }); regel(ctx, 'gezonde cel: eigen stukjes', 560, 730, 1, EIGEN, 28, 'center', 700);
      lCel(ctx, 1360, 460, 200, t, { a: gi, eigenToon: 1, aanvoer: ramp(t, q.at('stukjes', 2) - 0.6, 1.8), geinf: 1, seed: 6 }); regel(ctx, 'geïnfecteerde cel: ook stukjes virus', 1360, 730, gi, VIR, 28, 'center', 700);
      tag(ctx, 'hij verraadt zichzelf', 1360, 180, VIR, q.on('verraadt', 1));
      ctx.restore(); }
  },
  s10(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Vindt', 1), p1 = 1 - p2; const let_ = q.on('Let', 1);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const sh = -250 * let_, cx = 1150 + sh, cy = 470, R = 210, A = 4 * 0.628 + 0.2; const d = opp(cx, cy, R, R * 0.9, A);
      lCel(ctx, cx, cy, R, t, { eigenToon: 1, toon: 1, geinf: 1, seed: 6 });
      const ps = ramp(t, q.at('past') - 0.5, 1.5); const tx = lerp(d.x + d.nx * 260, d.x + d.nx * (90 + 36), ps), ty = lerp(d.y + d.ny * 260 - 80, d.y + d.ny * (90 + 36), ps);
      tCel(ctx, tx, ty, 90, t, { col: TK, doel: { x: d.x, y: d.y }, gloed: q.on('past', 1) * (1 - let_) });
      naamBij(ctx, 'T-killercel', '', tx, ty - 130, 1 - let_, 'center', TK); naamBij(ctx, 'receptor', 'past op één stukje virus', d.x + 40, d.y + 170, q.on('receptor', 1) * (1 - let_), 'left', TK);
      ctx.save(); ctx.globalAlpha *= let_; roundRect(ctx, 1380, 120, 520, 540, 20); shape(ctx, rgba('#0B0F16', 0.9), rgba(C.line, 0.5), 2);
        // B-cel: bindt een los virus
        const bx = lerp(1600, 1640, ramp(t, q.at('B-cellen'), 1.2)); virus(ctx, bx + 36, 250, 24, [3], t, { rot: 3.14 }); bCel(ctx, 1500, 250, 50, 0, t); vink(ctx, 1840, 250, 22); regel(ctx, 'B-cel: los virus', 1640, 345, 1, BCOL, 28, 'center', 700);
        // T-cel: niet op een los virus, wel op een stukje op een cel
        tCel(ctx, 1480, 500, 46, t, { col: TK }); virus(ctx, 1620, 430, 20, [3], t); kruis(ctx, 1840, 430, 18, q.on('nooit', 1)); lCel(ctx, 1650, 545, 50, t, { toon: 1, eigenToon: 1 }); vink(ctx, 1840, 545, 22, q.on('alleen', 1)); regel(ctx, 'T-cel: stukje op een cel', 1640, 640, 1, TK, 28, 'center', 700); ctx.restore();
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const cx = 1000, cy = 470, R = 220; const hc = ramp(t, q.at('hecht') - 0.3, 1.2), br = ramp(t, q.at('breken'), 2.5), fg = q.on('Fagocyten', 1), op = ramp(t, q.at('Fagocyten') + 0.6, 2.2);
      const tkx = lerp(560, cx - R - 88, hc), tky = 440; const dp = opp(cx, cy, R, R * 0.9, Math.PI);
      lCel(ctx, cx, cy, R, t, { eigenToon: 1, toon: 1, geinf: 1 - q.on('afgebroken', 1), seed: 6, gaatjes: q.on('gaatjes', 1) * (1 - clamp(br * 2.5, 0, 1)), gatAn: Math.PI, kapot: br, a: 1 - 0.85 * op });
      tCel(ctx, tkx, tky, 90, t, { col: TK, doel: { x: dp.x, y: dp.y }, gloed: hc * (1 - br), a: 1 - 0.5 * fg });
      korrels(ctx, tkx + 70, tky + 10, dp.x + 10, dp.y, t, q.on('stoffen', 1) * (1 - br));
      // de fagocyt komt en neemt de resten op
      const fx = lerp(1700, 1250, ramp(t, q.at('Fagocyten'), 2)); fagocyt(ctx, fx, 640, 110, t, { a: fg, arm: op * (1 - ramp(t, q.at('virusfabriek'), 1)), tx: cx, ty: cy });
      const es = q.on('ontsnapt', 1); for (let i = 0; i < 3; i++) virus(ctx, 1450 + i * 130, 200 + i * 45, 26, [3], t, { a: es, rot: i, ast: k => k % 2 ? clamp(ramp(t, q.at('vangen') + k * 0.08, 0.7), 0, 1) : 0 });
      wissel(ctx, q, [['de T-killercel hecht zich aan de cel', 'hecht', 1, TK], ['gaatjes, en de cel breekt zichzelf af', 'gaatjes', 1, TK], ['het virus wordt mee afgebroken', 'afgebroken', 1, VIR], ['fagocyten ruimen de resten op', 'Fagocyten', 1, WIT], ['de virusfabriek is gestopt', 'virusfabriek', 1, C.goud], ['ontsnapte virussen: die vangen antistoffen', 'ontsnapt', 1, AS]], 960, 860);
      ctx.restore(); }
  },
  // lymfeknoop: fagocyt toont stukjes virus, passende T-helpercel geeft het startsein, T-killercellen delen tot een kloon
  s11(ctx, t, q) { bg(ctx, 'micro'); const cx = 960, cy = 470;
    const kl = ramp(t, q.at('vermenigvuldigd') - 0.4, 3.6), sig = q.on('signaalstoffen', 1), hum = q.on('humoraal', 1), cel = q.on('cellulaire', 1), gk = q.on('geheugencellen', 1);
    lymfeknoop(ctx, cx, cy, 800, 300, 1, 0); naamBij(ctx, 'lymfeknoop', '', 1620, 150, 1, 'left', LYMF);
    const fx = 440, fy = 430, fr = 100; fagocyt(ctx, fx, fy, fr, t, { wob: 0.02 }); naamBij(ctx, 'fagocyt', '', fx, fy + fr + 60, q.on('fagocyt', 1), 'center', WIT);
    const zie = q.on('stukjes', 1); for (let i = 0; i < 5; i++) { const p = opp(fx, fy, fr, fr * 0.9, -0.9 + i * 0.45); mhc(ctx, p.x, p.y, p.phi, 'II', VIR, zie); }
    // T-helpercellen in de knoop: alleen de passende (gloeit) komt naar de fagocyt
    const pas = ramp(t, q.at('past') - 0.8, 1.5); const dk = opp(fx, fy, fr, fr * 0.9, 0); const thx = lerp(800, dk.x + 70 + 4, pas), thy = lerp(330, dk.y, pas);
    for (const [ox, oy, s] of [[760, 600, 1], [880, 470, 2], [700, 250, 3]]) { const w = wander(s, t, 8, 0.5); tCel(ctx, ox + w.x, oy + w.y, 44, t, { col: TH, a: 0.6, seed: s }); }
    tCel(ctx, thx, thy, 70, t, { col: TH, doel: { x: dk.x, y: dk.y }, gloed: q.on('past', 1) }); naamBij(ctx, 'T-helpercel', '', thx + 10, thy - 110, q.on('T-helpercel', 2), 'center', TH);
    signaal(ctx, thx + 60, thy - 20, 1180, 280, t, sig * (1 - hum * 0.6)); signaal(ctx, thx + 60, thy + 20, 1150, 560, t, sig * (1 - hum * 0.6));
    bCel(ctx, 1260, 270, 54, 0, t, { a: sig, glow: sig * 0.6 }); naamBij(ctx, 'B-cel', '', 1340, 285, sig * (1 - hum), 'left', BCOL);
    for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; antistof(ctx, 1320 + u * 200 + i * 8, 250 - u * 80 + Math.sin(i * 3) * 30, 0.3, u * 3 + i, hum * Math.sin(u * 3.14)); }
    // klonale deling: elke cel splitst in twee (cel j ontstaat uit j − 2^⌊log₂ j⌋)
    const P = (j) => [1180 + (j % 8) * 62, 570 + Math.floor(j / 8) * 66], gen = kl * 4;
    for (let j = 0; j < 16; j++) { const born = j === 0 ? 0 : Math.floor(Math.log2(j)) + 1; const f = j === 0 ? 1 : clamp(gen - born + 1, 0, 1); if (f <= 0) continue; const par = j === 0 ? 0 : j - Math.pow(2, born - 1); const [ax, ay] = P(par), [bx, by] = P(j);
      const x = j === 0 ? bx : lerp(ax, bx, ease(f)), y = j === 0 ? by : lerp(ay, by, ease(f)); const geh = gk > 0.01 && j >= 13;
      tCel(ctx, x, y, kl > 0.01 ? 26 : 40, t, { col: TK, a: sig, gloed: sig * (0.3 + 0.7 * cel) * (geh ? 0 : 1), seed: j, rec: 0.8 });
      if (geh) { ctx.save(); ctx.globalAlpha *= gk; ctx.fillStyle = C.goud; ctx.font = fTekst(22, 700); ctx.textAlign = 'center'; ctx.fillText('★', x, y + 8); ctx.restore(); } }
    naamBij(ctx, 'T-killercel', '', 1240, 660, sig * (1 - kl), 'left', TK); naamBij(ctx, 'geheugencellen', '', 1600, 720, gk * (1 - hum), 'center', C.goud);
    ctx.save(); ctx.globalAlpha *= 1 - hum; wissel(ctx, q, [['de fagocyt laat stukjes virus zien', 'fagocyt', 1, VIR], ['een passende T-helpercel geeft het startsein', 'past', 1, TH], ['kloon van T-killercellen, plus geheugencellen ★', 'vermenigvuldigd', 1, TK]], 960, 860); ctx.restore();
    tag(ctx, 'humoraal: met antistoffen', 600, 860, AS, hum); tag(ctx, 'cellulair: cellen doden cellen', 1340, 860, TK, cel);
  },
  // gordelroos: het virus rust in een zenuwcel, T-cellen houden het in toom; bij Opa Henk komt het terug via de zenuw naar de huid
  s12(ctx, t, q) { bg(ctx, 'micro'); const nx0 = 380, ny0 = 440, nx1 = 1180, ny1 = 470;
    const tr = ramp(t, q.at('terugkomen') - 0.4, 2.2), mn = q.on('minder', 1), gr = q.on('gordelroos', 1), hk = q.on('latere', 1);
    zenuwcel(ctx, nx0, ny0, nx1, ny1, t); naamBij(ctx, 'zenuwcel', '', nx0, ny0 + 190, 1, 'center', NEUR);
    // huid in doorsnede
    ctx.fillStyle = rgba('#E8C2A4', 0.45); ctx.fillRect(1200, 250, 150, 440); ctx.fillStyle = rgba('#E6D8A8', 0.6); ctx.fillRect(1320, 250, 30, 440); naamBij(ctx, 'huid', '', 1275, 730, 1, 'center', '#E8C2A4');
    for (let i = 0; i < 4; i++) virus(ctx, nx0 - 12 + (i % 2) * 26, ny0 - 12 + Math.floor(i / 2) * 26, 7, [3], t, { rot: i, n: 8, a: 0.9 });
    if (tr > 0.01) for (let i = 0; i < 5; i++) { const u = clamp(tr * 1.4 - i * 0.1, 0, 1); const [px, py] = zenuwPad(nx0, ny0, nx1, ny1, u); virus(ctx, px, py, 9, [3], t, { rot: i, n: 8 }); }
    if (gr > 0.01) for (let i = 0; i < 6; i++) { const y = 300 + i * 65; ctx.save(); ctx.globalAlpha *= gr; ctx.beginPath(); ctx.ellipse(1352, y, 14 + 4 * Math.sin(i), 18, 0, -Math.PI / 2, Math.PI / 2); ctx.fillStyle = rgba('#E6E1D3', 0.8); ctx.fill(); ctx.strokeStyle = '#D8403A'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    const tz = q.on('T-cellen', 1) * (1 - 0.75 * mn); for (let i = 0; i < 4; i++) { const an = t * 0.4 + i * 1.57; tCel(ctx, nx0 + Math.cos(an) * 200, ny0 + Math.sin(an) * 170, 30, t, { col: TK, a: tz, seed: i }); }
    // Opa Henk: op latere leeftijd, gordelroos als een band blaasjes op één kant van zijn romp
    if (hk > 0.01) { const an = persoon(ctx, 'henk', 1680, 880, 640, { a: hk, uit: gr > 0.5 ? 'bezorgd' : 'neutraal', t }); if (gr > 0.01 && an.hoofd) { const hy = an.hoofd.y, hr = an.hoofd.r; ctx.save(); ctx.globalAlpha *= gr * hk; for (let i = 0; i < 12; i++) { const u = i / 11, bx = 1680 - hr * 1.6 + u * hr * 1.6, by = hy + hr * 3.6 + Math.sin(u * 3) * hr * 0.5 + (hash(i) - 0.5) * 10; circ(ctx, bx, by, 6 + 3 * hash(i * 3), rgba('#D8403A', 0.85)); } ctx.restore(); naamBij(ctx, 'band blaasjes', 'op één kant van de romp', 1680, an.top - 70, gr, 'center', C.koraal); } }
    wissel(ctx, q, [['het waterpokkenvirus verstopt zich in zenuwcellen', 'verstopt', 1, NEUR], ['T-cellen houden het virus in toom', 'toom', 1, TK], ['later minder sterk: het virus komt terug', 'minder', 1, VIR], ['gordelroos', 'gordelroos', 1, C.koraal]], 960, 140);
  },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const l = q.on('MHC', 2), r = q.on('twee', 1), cx = 560, cy = 470, R = 190;
    lCel(ctx, cx, cy, R, t, { mhc: q.on('MHC', 1), eigenToon: l, aanvoer: ramp(t, q.at('binnen') - 1.2, 2), geinf: l, seed: 6 }); regel(ctx, 'MHC-I: alle cellen met een kern', cx, 760, l, MHCK, 28, 'center', 700); regel(ctx, 'stukjes van binnen in de cel', cx, 800, q.on('binnen', 1), C.text2, 24, 'center');
    const A = 6 * 0.628 + 0.2, d = opp(cx, cy, R, R * 0.9, A); const kd = ramp(t, q.at('T-killercellen') - 0.3, 1.5); tCel(ctx, lerp(150, d.x + d.nx * 100, kd), lerp(250, d.y + d.ny * 100, kd), 60, t, { col: TK, a: q.on('T-killercellen', 1), doel: { x: d.x, y: d.y }, gloed: kd });
    naamBij(ctx, 'T-killercel', '', 200, 160, q.on('T-killercellen', 1), 'center', TK);
    naamBij(ctx, 'MHC', 'houder', 780, 300, q.on('houders', 1) * (1 - l), 'left', MHCK);
    ctx.save(); ctx.globalAlpha *= r; const fx = 1360, fy = 470, fr = 170; const eat = ramp(t, q.at('buiten') - 1.2, 1.8); fagocyt(ctx, fx, fy, fr, t, { wob: 0.02, arm: eat > 0 && eat < 1 ? Math.sin(eat * Math.PI) : 0, tx: 1700, ty: 250 });
      if (eat < 1) virus(ctx, lerp(1700, fx + 40, eat), lerp(230, fy - 20, eat), 26, [3], t, { a: 1 - 0.7 * eat, rot: t * 0.2 });
      const st = ramp(t, q.at('opgenomen'), 1.2); for (let i = 0; i < 6; i++) { const p = opp(fx, fy, fr, fr * 0.9, -1.4 + i * 0.55); mhc(ctx, p.x, p.y, p.phi, 'II', VIR, 1, st); }
      regel(ctx, 'MHC-II: antigeenpresenterende cellen', fx, 760, 1, C.goud, 28, 'center', 700); regel(ctx, 'macrofagen · dendritische cellen · B-cellen', fx, 800, q.on('macrofagen', 1), C.text2, 24, 'center'); regel(ctx, 'stukjes van wat ze van buiten opnamen', fx, 840, q.on('buiten', 1), C.text2, 24, 'center');
      const d2 = opp(fx, fy, fr, fr * 0.9, -1.4 + 4 * 0.55); const hd = ramp(t, q.at('T-helpercellen') - 0.3, 1.5); tCel(ctx, lerp(1760, d2.x + d2.nx * 100, hd), lerp(160, d2.y + d2.ny * 100, hd), 60, t, { col: TH, a: q.on('T-helpercellen', 1), doel: { x: d2.x, y: d2.y }, gloed: hd });
      naamBij(ctx, 'T-helpercel', '', 1760, 120, q.on('T-helpercellen', 1), 'center', TH); ctx.restore();
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Maar', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; thymus(ctx, 960, 470, 2.6, 0.5); naamBij(ctx, 'thymus', '', 960, 770, 1, 'center', '#E8A0B0');
      // een thymuscel laat eigen stukjes zien; T-cellen die daarop passen, worden uitgeschakeld
      lCel(ctx, 960, 470, 80, t, { eigenToon: 1, seed: 2, col: '#E8A0B0' }); const ui = ramp(t, q.at('reageren') - 0.3, 1.5), uz = ramp(t, q.at('uitgeschakeld'), 1.8);
      for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.4, zelf = i === 2 || i === 5; const rr = zelf ? lerp(230, 140, ui) : 230 + 8 * Math.sin(t + i); const x = 960 + Math.cos(an) * rr, y = 470 + Math.sin(an) * rr * 0.95;
        tCel(ctx, x, y, 36, t, { col: TK, doel: zelf ? { x: 960, y: 470 } : null, gloed: zelf ? ui : 0, kapot: zelf ? uz : 0, a: zelf ? 1 - 0.75 * uz : 1, seed: i }); if (zelf) kruis(ctx, x, y, 30, uz); }
      tag(ctx, 'T-cellen tegen eigen stoffen: uitgeschakeld', 960, 140, C.koraal, q.on('uitgeschakeld', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; bg(ctx, 'schema');
      // Opa Henk krijgt een donornier (onder in de buik); zoom op de cellen van die nier
      const ni = q.on('nier', 1), md = q.on('medicijnen', 1); const an = persoon(ctx, 'henk', 340, 900, 720, { uit: q.on('vallen', 1) > 0.5 && md < 0.5 ? 'bezorgd' : 'neutraal', pose: md > 0.5 ? 'vasthouden' : 'staan', t, hold: md > 0.5 ? (c, x, y) => pil(c, x, y - 10, 0.35, md, 0) : null });
      const kx = 372, ky = an.heup.y - 30; ctx.save(); ctx.globalAlpha *= ni; ctx.beginPath(); ctx.ellipse(kx - 10, ky, 70, 60, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.5); ctx.fill(); ctx.restore(); ctx.save(); ctx.globalAlpha *= ni; ctx.translate(kx, ky); ctx.scale(0.55, 0.55); ctx.translate(-kx, -ky); ctx.restore();
      if (ni > 0.01) { ctx.save(); ctx.globalAlpha *= ni; ctx.translate(kx, ky); ctx.rotate(0.4); ctx.beginPath(); ctx.moveTo(0, -30); ctx.bezierCurveTo(26, -32, 28, 32, 0, 32); ctx.bezierCurveTo(-14, 32, -16, 12, -8, 6); ctx.bezierCurveTo(-3, 2, -3, -2, -8, -6); ctx.bezierCurveTo(-16, -12, -14, -32, 0, -30); ctx.closePath(); shape(ctx, rgba(DON, 0.6), DON, 2); ctx.restore(); }
      naamBij(ctx, 'nier van de donor', '', kx + 150, ky + 70, ni, 'left', DON);
      const zx = 1220, zy = 500, zr = 330, va = ramp(t, q.at('vallen') - 0.3, 2), br = ramp(t, q.at('vallen') + 1.6, 2.5);
      zoomCircle(ctx, zx, zy, zr, kx + 30, ky, '', Math.max(q.on('verschillen', 1), ni), () => { ctx.fillStyle = '#121A26'; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
        lCel(ctx, zx - 160, zy + 150, 85, t, { mhc: 1, eigenToon: 1, seed: 3, a: q.on('verschillen', 1) * (1 - ni) });
        for (let i = 0; i < 4; i++) { const cx = zx - 20 + (i % 2) * 190, cy = zy - 120 + Math.floor(i / 2) * 200; lCel(ctx, cx, cy, 82, t, { col: DON, mhc: 1, soort: 'vreemd', seed: i, a: ni, kapot: i === 0 ? br : 0 }); }
        const c0 = [zx - 20, zy - 120], d = opp(c0[0], c0[1], 82, 74, Math.PI); const tkx = lerp(zx - 330, d.x - 62, va), tky = lerp(zy + 40, d.y, va);
        tCel(ctx, tkx, tky, 56, t, { col: TK, a: q.on('T-cellen', 2) * (1 - 0.5 * md), doel: { x: d.x, y: d.y }, gloed: q.on('vreemd', 1) * (1 - md) }); korrels(ctx, tkx + 40, tky, d.x, d.y, t, va * (1 - br) * (1 - md), 6);
        naamBij(ctx, 'jouw T-killercel', '', tkx, tky + 100, q.on('T-cellen', 2) * (1 - va), 'center', TK); });
      naamBij(ctx, 'jouw cel', 'eigen MHC', zx - 160, zy + 280, q.on('verschillen', 1) * (1 - ni), 'center', EIGEN);
      wissel(ctx, q, [['MHC verschilt per persoon', 'verschillen', 1, MHCK], ['vreemde MHC: je T-cellen vallen de nier aan', 'vreemd', 1, C.koraal], ['donor met zoveel mogelijk dezelfde MHC', 'donor', 1, C.groen], ['daarna: medicijnen die je afweer remmen', 'medicijnen', 1, C.goud]], 1220, 120);
      ctx.restore(); }
  },

  s15(ctx, t, q) { bg(ctx, 'schema'); const X = 300, Y = 220, Wg = 1100, Hg = 440;
    const u = 0.04 + 0.96 * ramp(t, q.at('eerste'), 12);
    const nb = q.on('Normaal', 1); if (nb > 0.01) { ctx.save(); ctx.globalAlpha *= nb; ctx.fillStyle = rgba(C.groen, 0.1); const y0 = Y + Hg - 1500 / 1600 * Hg, y1 = Y + Hg - 500 / 1600 * Hg; ctx.fillRect(X, y0, Wg, y1 - y0); regel(ctx, 'normaal 500–1500', X + Wg - 10, y0 + 34, 1, C.groen, 24, 'right', 700); ctx.restore(); }
    const ad = q.on('tweehonderd', 1); if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; const ya = Y + Hg - 200 / 1600 * Hg; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, ya); ctx.lineTo(X + Wg, ya); ctx.stroke(); ctx.setLineDash([]); regel(ctx, '200', X - 16, ya + 8, 1, C.koraal, 24, 'right', 700); ctx.restore(); }
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 1600, f: hivGrafiekT, u, xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: v => v + ' jr', yticks: [], xlab: 'tijd na besmetting', ylab: 'T-helpercellen per microliter', col: TH });
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 1600, f: s => hivGrafiekV(s), u, xticks: [], yticks: [], col: VIR });
    regel(ctx, '— T-helpercellen', X + Wg + 30, Y + 60, 1, TH, 26); regel(ctx, '— virus (relatief)', X + Wg + 30, Y + 100, 1, VIR, 26);
    // hiv infecteert een T-helpercel (klein beeld rechts)
    const hv = q.on('infecteert', 1) * (1 - q.on('eerste', 1)); if (hv > 0.01) { ctx.save(); ctx.globalAlpha *= hv; const tx = 1640, ty = 520; const d = ramp(t, q.at('infecteert') - 0.6, 1.4); tCel(ctx, tx, ty, 70, t, { col: TH }); virus(ctx, lerp(1780, tx + 70 + 22, d), lerp(240, ty - 10, d), 18, [3], t, { col: '#C97A5F', rot: t * 0.3 }); regel(ctx, 'hiv → T-helpercel', tx, ty + 140, 1, C.text2, 24, 'center', 700); ctx.restore(); }
    tag(ctx, 'eerste weken: even grieperig', X + 20, 150, C.text2, q.on('grieperig', 1) * (1 - q.on('jaren', 1)), 'left');
    tag(ctx, 'jaren weinig klachten, gemiddeld ± 10 jaar', X + 200, 150, C.text2, q.on('jaren', 1) * (1 - q.on('Normaal', 1)), 'left');
    tag(ctx, 'aids: onder de 200', X + Wg - 20, Y + Hg - 200 / 1600 * Hg - 40, C.koraal, q.on('aids', 1), 'right');
    tag(ctx, 'longontsteking · schimmels in de mond', 960, 820, C.koraal, q.on('longontsteking', 1) * (1 - q.on('Hoe', 1)));
    vraagteken(ctx, 1640, 640, q.on('Hoe', 1), 120);
  },
  // zonder regelaar: de signaalstroom stopt, B-cellen en T-killercellen blijven stil, andere ziekteverwekkers groeien
  s17(ctx, t, q) { bg(ctx, 'schema');
    const cx = 960, cy = 380; const rg = q.on('regelaar', 1), mic = ramp(t, q.at('andere'), 6), fg = q.on('fagocyten', 1);
    tCel(ctx, cx, cy, 80, t, { col: TH, label: 'T-helpercel', a: 1 - 0.6 * rg, kapot: rg }); kruis(ctx, cx, cy, 70, rg);
    for (let i = 0; i < 5; i++) { const an = -2.6 + i * 0.5, u = (t * 0.25 + i / 5) % 1; virus(ctx, cx + Math.cos(an) * (110 + 80 * u), cy + Math.sin(an) * (100 + 70 * u), 11, [3], t, { col: '#C97A5F', n: 8, a: rg * (1 - u), rot: i }); }
    for (const [x, y, lab, f] of [[560, 640, 'B-cellen', 'b'], [1360, 640, 'T-killercellen', 'tk']]) { arrow(ctx, cx + (x < cx ? -60 : 60), cy + 70, x + (x < cx ? 40 : -40), y - 80, rgba(C.line, 1 - 0.7 * rg), 1, 3);
      signaal(ctx, cx + (x < cx ? -50 : 50), cy + 60, x, y - 60, t, 1 - rg, 6);
      if (f === 'b') bCel(ctx, x, y, 60, 0, t, { a: 1 - 0.6 * rg, glow: 0.5 * (1 - rg) }); else tCel(ctx, x, y, 60, t, { col: TK, a: 1 - 0.6 * rg, gloed: 0.5 * (1 - rg) });
      regel(ctx, lab, x, y + 110, 1, C.text2, 26, 'center', 700); regel(ctx, 'te weinig startsein', x, y + 150, rg, C.koraal, 24, 'center'); }
    // andere ziekteverwekkers vermenigvuldigen zich; de fagocyt pakt er een paar, maar dat is niet genoeg
    const nm = Math.round(4 + 14 * mic); for (let i = 0; i < nm; i++) { const x = 1540 + hash(i) * 300, y = 170 + hash(i * 3) * 380; const a = clamp(4 + 14 * mic - i, 0, 1); if (i % 3) bacterie(ctx, x, y, 1.1, hash(i) * 6, a * q.on('andere', 1)); else schimmel(ctx, x, y, 1, a * q.on('andere', 1)); }
    regel(ctx, 'andere ziekteverwekkers', 1690, 600, q.on('andere', 1), C.text2, 24, 'center', 700);
    const ea = ramp(t, q.at('fagocyten') + 0.3, 1.5); fagocyt(ctx, 300, 300, 70, t, { a: fg, arm: Math.sin(ea * Math.PI), tx: 420, ty: 260 }); bacterie(ctx, lerp(440, 315, ea), lerp(250, 295, ea), 1, 0.5, fg * (1 - ea)); naamBij(ctx, 'fagocyten', '', 300, 420, fg, 'center', WIT); regel(ctx, 'werken nog, maar niet genoeg', 300, 460, q.on('genoeg', 1), C.koraal, 24, 'center', 700);
    wissel(ctx, q, [['antwoord b: geen startsein meer', 'bee', 1, C.goud], ['niet van hiv zelf, maar van andere ziekteverwekkers', 'Maar', 1, C.koraal], ['zonder regelaar: te weinig startsein', 'regelaar', 1, C.koraal], ['je specifieke afweer werkt bijna niet meer', 'specifieke', 1, C.koraal]], 960, 140);
  },
  // retrovirus: hiv versmelt met de T-helpercel, RNA → reverse transcriptase → DNA, ingebouwd in het DNA van de cel
  s18(ctx, t, q) { bg(ctx, 'micro'); const cx = 1200, cy = 500, R = 360, kx = 1290, ky = 580, kr = 170;
    const hv = ramp(t, q.at('Hiv') - 0.2, 2), fu = ramp(t, q.at('RNA') - 1.2, 1.5), rna = q.on('RNA', 1), rt = ramp(t, q.at('transcriptase'), 2.4), bw = ramp(t, q.at('bouwt'), 2.5), rv = q.on('retrovirus', 1), rem = q.on('hiv-remmers', 1);
    const A = -2.45, pm = opp(cx, cy, R, R * 0.9, A);
    celPad(ctx, cx, cy, R, R * 0.9, fu > 0.01 && fu < 1 ? [{ an: A, d: 0.06 * Math.sin(fu * Math.PI), w: 0.18 }] : [], t, 1, 0.02); shape(ctx, rgba(TH, 0.16), TH, 3);
    for (let i = 0; i < 14; i++) { const an = i * 0.45 + 0.1; if (Math.abs(Math.atan2(Math.sin(an - A), Math.cos(an - A))) < 0.3) continue; const p = opp(cx, cy, R, R * 0.9, an); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.phi + Math.PI / 2); ctx.strokeStyle = TH; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -12); ctx.moveTo(-8, -22); ctx.lineTo(-8, -12); ctx.lineTo(8, -12); ctx.lineTo(8, -22); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'T-helpercel', '', cx + 250, cy - 340, 1, 'left', TH);
    circ(ctx, kx, ky, kr, rgba(C.kern, 0.35), C.kernR, 2);
    // DNA van de cel in de kern, met een gat waarin het DNA van hiv wordt ingebouwd
    const gw = 90 * bw; dnaStreng(ctx, kx - 140, kx - gw / 2, ky, t, C.paars, '#C9B8F0', 1); dnaStreng(ctx, kx + gw / 2, kx + 140, ky, t, C.paars, '#C9B8F0', 1);
    naamBij(ctx, 'DNA van de T-helpercel', '', kx, ky + 80, 1 - rv, 'center', '#C9B8F0');
    // het virus nadert en versmelt; de kegelvormige binnenkant gaat de cel in
    const vx = lerp(420, pm.x + pm.nx * 62, hv), vy = lerp(260, pm.y + pm.ny * 62, hv); virus(ctx, vx, vy, 52, [5], t, { col: '#C97A5F', rot: hv < 1 ? t * 0.1 : 0.2, a: 1 - fu });
    naamBij(ctx, 'hiv', '', vx, vy - 110, 1 - fu, 'center', VIR);
    const ix = lerp(vx, 1030, ramp(t, q.at('RNA') - 0.2, 1.2)), iy = lerp(vy, 360, ramp(t, q.at('RNA') - 0.2, 1.2)); const capA = clamp(fu * 2, 0, 1) * (1 - ramp(t, q.at('enzym'), 0.8));
    if (capA > 0.01) { ctx.save(); ctx.globalAlpha *= capA; ctx.translate(ix, iy); ctx.rotate(0.6); ctx.beginPath(); ctx.moveTo(-34, -16); ctx.lineTo(30, -8); ctx.quadraticCurveTo(40, 0, 30, 8); ctx.lineTo(-34, 16); ctx.quadraticCurveTo(-44, 0, -34, -16); ctx.closePath(); shape(ctx, rgba('#E6B49A', 0.6), '#E6B49A', 2); ctx.restore(); }
    // RNA (enkele streng) en reverse transcriptase die er DNA (dubbele streng) van maakt
    const rx0 = 920, rx1 = 1130, ry = 330; const rA = rna * (1 - bw);
    if (rA > 0.01) { ctx.save(); ctx.globalAlpha *= rA; ctx.strokeStyle = RNAK; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40, px = rx0 + u * (rx1 - rx0), py = ry + Math.sin(u * 14 + t) * 8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'RNA van hiv', '', rx0 - 20, ry - 30, rA * (1 - rt), 'right', RNAK);
    const ex = lerp(rx0, rx1, rt), dA = rt > 0.01 ? 1 : 0; if (rt > 0.01) { const bx = lerp(rx0, kx - 45, bw), by = lerp(ry + 40, ky, bw), len = (ex - rx0) * (1 - bw) + 90 * bw; dnaStreng(ctx, bx, bx + len, by, t, VIR, '#F2A8A0', dA, 8, 4); naamBij(ctx, 'DNA van hiv', '', bx + len / 2, by + (bw > 0.5 ? -40 : 60), rt * (1 - rv * 0.0) * (bw < 1 ? 1 : 1 - q.on('voorgoed', 1)), 'center', '#F2A8A0'); }
    const ea = q.on('transcriptase', 1) * (1 - bw); if (ea > 0.01) { ctx.save(); ctx.globalAlpha *= ea; blob(ctx, ex, ry + 4, 34, 26, 0.12, 2, t); shape(ctx, rgba(RT, 0.55), RT, 2); ctx.restore(); naamBij(ctx, 'reverse transcriptase', 'enzym', ex, ry - 60, ea, 'center', RT); }
    // hiv-remmer: een klein molecuul blokkeert reverse transcriptase, er komt geen DNA
    if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; const rx = 640, ry2 = 600; ctx.strokeStyle = RNAK; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const u = k / 30, px = rx - 90 + u * 180, py = ry2 + Math.sin(u * 12 + t) * 8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      blob(ctx, rx - 70, ry2 + 4, 34, 26, 0.12, 2, t); shape(ctx, rgba(RT, 0.55), RT, 2); const mm = ramp(t, q.at('hiv-remmers') + 0.3, 1.2); molecuul(ctx, lerp(rx - 220, rx - 80, mm), lerp(ry2 - 120, ry2 + 2, mm), 12, '#F2F2EE', 1, t); kruis(ctx, rx + 20, ry2 - 80, 24, ramp(t, q.at('remmen'), 0.6)); naamBij(ctx, 'hiv-remmer', '', rx - 220, ry2 - 150, 1 - mm * 0.0, 'center', '#F2F2EE'); ctx.restore(); }
    wissel(ctx, q, [['retrovirus', 'retrovirus', 1, C.goud], ['het zit voorgoed in je cellen: niet te genezen', 'genezen', 1, C.koraal], ['veel hiv-remmers remmen reverse transcriptase', 'hiv-remmers', 1, RT]], 470, 820);
  },
  s19(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('medicijnen', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const it = [['bloed', 'bloed', '#B5574A'], ['sperma', 'sperma', C.text2], ['vaginaal vocht', 'vaginaal', C.text2], ['moedermelk', 'moedermelk', C.text2]];
      regel(ctx, 'hiv gaat over via', 560, 220, 1, C.text, 34, 'center', 700); it.forEach(([s, w, col], i) => tag(ctx, s, 560, 320 + i * 100, col === C.text2 ? C.teal : col, q.on(w, 1)));
      regel(ctx, 'niet via', 1360, 220, q.on('zoenen', 1), C.text, 34, 'center', 700); tag(ctx, 'zoenen', 1260, 320, C.groen, q.on('zoenen', 1)); tag(ctx, 'knuffelen', 1470, 320, C.groen, q.on('knuffelen', 1));
      persoon(ctx, 'sam', 1325, 720, 330, { a: q.on('knuffelen', 1), uit: 'blij', kijk: 1, t }); persoon(ctx, 'lotte', 1395, 720, 320, { a: q.on('knuffelen', 1), uit: 'lacht', kijk: -1, t });
      tag(ctx, 'een condoom beschermt', 960, 820, C.goud, q.on('condoom', 1));
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const X = 360, Y = 230, Wg = 1000, Hg = 400; const u = ramp(t, q.at('slikt'), 4);
      const V = s => s < 1 ? 900 : Math.max(30, 900 * Math.exp(-(s - 1) * 1.6)); const T = s => s < 1 ? 300 : 300 + 500 * (1 - Math.exp(-(s - 1) * 0.5));
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 1000, f: T, u, xticks: [], yticks: [], xlab: 'tijd met hiv-remmers', col: TH }); grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 1000, f: V, u, xticks: [], yticks: [], col: VIR });
      const ml = Y + Hg - 60 / 1000 * Hg; ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, ml); ctx.lineTo(X + Wg, ml); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'grens van meten', X + Wg + 20, ml + 8, q.on('meten', 1), C.text2, 24);
      regel(ctx, '— T-helpercellen', X + Wg + 20, Y + 40, 1, TH, 26); regel(ctx, '— virus', X + Wg + 20, Y + 80, 1, VIR, 26);
      // elke dag een pil: een rijtje pillen langs de tijdas
      for (let i = 0; i < 10; i++) pil(ctx, X + (i + 0.5) * Wg / 10, Y - 40, 0.35, clamp(u * 10 - i, 0, 1) * q.on('slikt', 1) + (i === 0 ? 1 - q.on('slikt', 1) : 0), 0);
      wissel(ctx, q, [['hiv-remmers: geen antibiotica', 'antibiotica', 1, C.goud], ['ze genezen niet: elke dag slikken', 'genezen', 1, C.koraal], ['virus onmeetbaar laag, T-helpercellen op peil', 'meten', 1, C.groen], ['onmeetbaar: via seks niet meer overdraagbaar', 'seks', 1, C.groen]], 960, 820);
      ctx.restore(); }
  },
  s20(ctx, t, q) { slaapkamer(ctx, t, { opBed: 0 });
    persoon(ctx, 'noor', 1440, 900, 700, { uit: q.on('oefenen', 1) > 0.5 ? 'denkt' : 'blij', pose: q.on('oefenen', 1) > 0.5 ? 'denk' : 'staan', t, outfit: 'school' });
    const panel = q.on('virus', 1); ctx.fillStyle = rgba('#0B0F16', 0.85 * panel); ctx.fillRect(80, 110, 980, 620);
    const ch = [['een virus is geen cel: niets te remmen', 'celwand', 1, VIR], ['antistoffen vingen virussen tussen de cellen', 'Antistoffen', 1, AS], ['gekaapte cellen lieten stukjes virus zien', 'Gekaapte', 1, VIR], ['T-killercellen ruimden ze op', 'T-killercellen', 1, TK], ['T-helpercellen gaven het startsein', 'T-helpercellen', 1, TH], ['antwoord a', 'antwoord', 1, C.goud]];
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 570, 190 + i * 95, col, q.on(w, n) * (1 - q.on('oefenen', 1))));
    tag(ctx, 'volgende film: vaccins', 570, 400, C.groen, q.on('oefenen', 1));
  },
};

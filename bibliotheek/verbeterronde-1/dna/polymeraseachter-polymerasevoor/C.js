// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
// punt-in-veelhoek (ontwerpeenheden) als 'binnen'-functie voor _grKluwen; bbox erbij
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }

// ---------- DNA-POLYMERASE (variant C, beeldbank ronde 2, 27 okt 2026): komvormige hand (A) als gevouwen eiwitlint ----------
// Recept (Doublié & Zahn 2014 Front Microbiol 5:444: polymerasevouw 'compared to a human right hand, composed of three subdomains:
// fingers, palm, and thumb', katalytische aspartaten in de palm, vingers veranderen van stand bij binden van de juiste nucleotide;
// OpenStax Biology 2e § 14.4: schuifklem = ringvormig eiwit om het DNA dat de polymerase op zijn plek houdt):
//  - vorm als A (kom: palm onder de matrijs, duim links omhoog over het nieuwe stuk, vingers rechts die over de nucleotide krullen),
//    maar elk subdomein is één gevouwen keten (lintmodel _grKluwen: buis met α-helices en β-strengen) in een eigen rustige tint;
//    de achterwand is een donker lint achter het DNA. Minder overlappende omtrekken dan A (uit v2: rustiger vlakken).
//  - vingers draaien 18° dicht bij 'sluit'; actief centrum goud in de palm bij het 3'-uiteinde; klem = ring om het DNA (achter-
//    en voorboog), vlak getekend. Onder g < 26 px valt het lint weg en blijven de vlakke vormen (anders onleesbaar).
// Zelfde aanroep als v1/v2.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
const _POLY = {
  wand: [[-1.35, -1.25], [-1.45, 0.9], [-0.9, 1.45], [0.6, 1.5], [1.5, 1.1], [1.55, -1.2], [0.2, -1.5]],
  palm: [[-1.45, -0.95], [-1.15, -1.55], [0.0, -1.8], [1.1, -1.62], [1.6, -1.0], [1.15, -1.1], [0.0, -1.18], [-1.05, -1.08]],
  duim: [[-1.5, -1.0], [-1.75, 0.1], [-1.5, 1.25], [-0.95, 1.65], [-0.35, 1.5], [-0.62, 1.2], [-1.08, 0.95], [-1.15, 0.0], [-1.1, -0.95]],
  vingers: [[-0.05, 0.0], [-0.3, 0.6], [-0.3, 1.55], [-0.65, 2.2], [-1.1, 2.3], [-1.0, 1.95], [-0.5, 1.7], [0.15, 1.2], [0.35, 0.3]] };
function _polyDeel(ctx, naam, poly, g, col, seed, flat, th = 0) { // th = draaiing zodat de rijen van het lint langs de lengte van het deel lopen
  ctx.beginPath(); bioPad(ctx, poly.map(([x, y]) => [x * g, y * g]), true); // silhouet eronder: de handvorm blijft leesbaar
  if (flat || g < 26) { shape(ctx, col, lighten(col, 0.3), 1.2); return; } ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.35), 0.75); ctx.fill();
  const c = Math.cos(-th), sn = Math.sin(-th), P = poly.map(([x, y]) => [(x * c - y * sn) * 100, (x * sn + y * c) * 100]);
  const V = _lintVorm(P); _grKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: g / 100, r: 8, col, seed, rot: th, key: 'poly-' + naam }); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  ctx.beginPath(); bioPad(ctx, _POLY.wand.map(([px, py]) => [px * g, py * g]), true); shape(ctx, '#3A475C', '#56667F', 1.2); // achterwand: donker vlak achter het DNA (rustig)
  
  if (klem) { ctx.beginPath(); ctx.ellipse(-2.15 * g, 0, 0.32 * g, 1.15 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#4E5D76'; ctx.lineWidth = 0.26 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const dicht = ease(sluit) * 0.31, hlc = (c) => hl > 0.01 ? _mixHex(c, C.goud, hl * 0.6) : c;
  ctx.save(); ctx.translate(1.3 * g, -1.0 * g); ctx.rotate(-0.04 + dicht); _polyDeel(ctx, 'vingers', _POLY.vingers, g, hlc('#6F86A0'), 5, false, 1.75); ctx.restore();
  _polyDeel(ctx, 'palm', _POLY.palm, g, hlc('#7A8BA8'), 7);
  _polyDeel(ctx, 'duim', _POLY.duim, g, hlc('#8796B0'), 11, false, 1.57);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.4 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, lerp(0.28, 0.2, ease(sluit)) * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-2.15 * g, 0, 0.32 * g, 1.15 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 0.26 * g; ctx.stroke(); }
  ctx.restore(); }

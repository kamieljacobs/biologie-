// =====================================================================================
// TRANSCRIPTIEFACTOR (eiwitkluwen met pasvorm, monomeer; ronde 2: kluwen als gevouwen lint, herkenningshelix als spiraaltje). Recept (OpenStax Biology 2e § 16.4; Lodish 8e § 9.2):
//  - een transcriptiefactor is een eiwit (gevouwen keten, geen bol) dat een korte, vaste basenvolgorde in de promotor of een
//    enhancer herkent; de herkenning gebeurt met een α-helix die in de grote groef van het DNA past (pasvorm). Gebonden
//    trekt een activator RNA-polymerase (en andere factoren) naar de promotor; een remmer (repressor) bindt ook, maar blokkeert.
//  - maat: DNA 2 nm breed, een transcriptiefactor ± 5–10 nm (hier ± 4,5× de DNA-breedte); RNA-polymerase groter dan de factor.
//  - hormoon-receptorcomplex (o.hormoon): oestradiol (steroïd: drie zesringen + vijfring) ligt in een afgesloten holte van het
//    eiwit (Ruff e.a. 2000, Breast Cancer Res 2:353); pas mét hormoon bindt de receptor het DNA en werkt als transcriptiefactor.
//  - kleur: grijsblauwe kluwen (C2); activator met groene zweem, remmer met koraal zweem; herkenningshelix goud als hij past.
// Bekende fouten: een bol of druppel; factor die op willekeurige plek op het DNA ligt; activator en remmer met dezelfde vorm
// en hetzelfde effect; hormoon dat los naast de receptor ligt.
// (x, y) = bindplek op de DNA-as; s = schaal (factor ± 220 × 160 px bij s = 1). o.dna (standaard uit) tekent een stukje DNA met
// promotor; o.gebonden 0..1 (0 = zweeft erboven, 1 = zit vast); o.soort 'activator' | 'remmer' | 'neutraal'; o.polymerase 0..1;
// o.hormoon 0..1; o.fold 0..1 (vouwen); o.t. Geeft {tf, helix, pol, hormoon} (plekken voor namen) terug.
// =====================================================================================
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
function _tfSteroid(ctx, x, y, r, a = 1) { // oestradiol: drie zesringen en een vijfring, met OH aan beide uiteinden (paars: hormoon, C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B9ACE6'; ctx.fillStyle = rgba('#8C7BBF', 0.45); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.lineJoin = 'round';
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let k = 0; k < n; k++) { const an = k / n * 6.283 + (n === 6 ? Math.PI / 6 : -Math.PI / 2 + 0.3); const X = cx + Math.cos(an) * rr, Y = cy + Math.sin(an) * rr; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  const d = r * 1.73; ring(x - d, y + r * 0.5, 6, r); ring(x, y, 6, r); ring(x + d, y + r * 0.5, 6, r); ring(x + d * 1.82, y - r * 0.15, 5, r * 0.86);
  ctx.beginPath(); ctx.moveTo(x - d * 1.85, y + r * 1.0); ctx.lineTo(x - d * 2.3, y + r * 1.3); ctx.moveTo(x + d * 2.3, y - r * 0.6); ctx.lineTo(x + d * 2.6, y - r * 1.1); ctx.stroke(); ctx.restore(); }
function _tfDNA(ctx, x, y, s, t, breed = 300) { // stukje DNA met de promotor als gouden mouw en het startpunt als pijltje
  roundRect(ctx, x - 150 * s, y - 34 * s, 230 * s, 68 * s, 20 * s); shape(ctx, rgba(C.goud, 0.22), rgba(C.goud, 0.7), 1.5);
  dnaDraad(ctx, [[x - breed * s, y], [x + breed * s, y]], { w: 44 * s, helix: true, glad: false, fase: t * 0.05 });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; const xs = x + 90 * s; ctx.beginPath(); ctx.moveTo(xs, y + 26 * s); ctx.lineTo(xs, y + 62 * s); ctx.lineTo(xs + 40 * s, y + 62 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 48 * s, y + 62 * s); ctx.lineTo(xs + 36 * s, y + 54 * s); ctx.lineTo(xs + 36 * s, y + 70 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); }
function _tfPolymerase(ctx, x, y, s, a = 1) { // plaatshouder RNA-polymerase (eigen bibliotheekobject volgt: rnaPolymerase)
  if (a <= 0.01) return; enzymKluwen(ctx, x, y, 78 * s, { a, col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); }
const TF_KLEUR = { activator: '#6F9A86', remmer: '#A57F7A', neutraal: '#7A8BA8' };
function transcriptiefactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, dna = false, gebonden = 1, soort = 'activator', polymerase = 0, hormoon = 0, fold = 1, t = 0 } = o; if (a <= 0.01) return {};
  const g = ease(gebonden), col = TF_KLEUR[soort] || TF_KLEUR.neutraal, uit = {}, r = 7 * s;
  ctx.save(); ctx.globalAlpha *= a; if (dna) _tfDNA(ctx, x, y, s, t);
  // RNA-polymerase: activator → op het startpunt; remmer → blijft weg (komt niet bij het DNA)
  if (polymerase > 0.01) { const p = ease(polymerase); const doelX = soort === 'remmer' ? x + 300 * s : x + 215 * s, doelY = soort === 'remmer' ? y - 190 * s : y - 70 * s;
    const px = lerp(x + 420 * s, doelX, p), py = lerp(y - 260 * s, doelY, p) + (soort === 'remmer' ? Math.sin(t * 2) * 6 * s * p : 0); _tfPolymerase(ctx, px, py, s, Math.min(1, polymerase * 2)); uit.pol = [px, py]; }
  const ox = x - 10 * s * (1 - g), oy = y - 160 * s * (1 - g) + Math.sin(t * 1.3) * 4 * s * (1 - g), rot = 0.35 * (1 - g);
  const binnen = (px, py) => { const ex = px / 112, ey = (py + 86) / 74; if (ex * ex + ey * ey > 1) return false; return Math.hypot(px, py + 2) > 40; };
  // herkenningshelix: spiraaltje (lint) dat vanuit de kluwen in de grote groef zakt; goud zodra hij past
  const cs = Math.cos(rot), sn = Math.sin(rot), W = (p) => [ox + p[0] * cs - p[1] * sn, oy + p[0] * sn + p[1] * cs, p[2]];
  const pts = _grKluwen(ctx, ox, oy, binnen, { r: 7, sc: s, col, seed: soort === 'remmer' ? 4 : 2, rot, bbox: [-115, -162, 115, -8], fold, key: 'tfC' });
  const HA = W([-34 * s, -58 * s, 0]), HB = W([2 * s, 4 * s, 0]), hdx = HB[0] - HA[0], hdy = HB[1] - HA[1], hL = Math.hypot(hdx, hdy), H = [];
  for (let i = 0; i <= 60; i++) { const u = i / 60, ph = u * 3 * 6.283, q = Math.sin(ph) * 11 * s; H.push([HA[0] + hdx * u - hdy / hL * q, HA[1] + hdy * u + hdx / hL * q, Math.cos(ph)]); }
  const hk = g > 0.9 ? C.goud : col, wB = 7 * s * 1.05;
  const hlBuis = (Q, kl, ww) => { if (Q.length < 2) return; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = lighten(kl, 0.38); ctx.lineWidth = ww + 2.4 * Math.max(0.5, s); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  hlBuis([pts[pts.length - 1], H[0]], col, wB);
  [false, true].forEach(voor => { let sg = []; const kl = voor ? lighten(hk, 0.1) : _mixHex(g > 0.9 ? C.goud : col, '#000000', 0.3); H.forEach(p => { if ((p[2] >= 0) === voor) sg.push(p); else { hlBuis(sg, kl, wB * (voor ? 1.25 : 1)); sg = []; } }); hlBuis(sg, kl, wB * (voor ? 1.25 : 1)); });
  uit.helix = H[H.length - 1]; uit.tf = [ox + 0 * s, oy - 90 * s];
  // activator: losse activatiestaart (ongevouwen stuk keten) die naar de polymerase reikt
  if (soort === 'activator') { const reik = ease(polymerase), st = W([100 * s, -110 * s]), P = [st]; for (let i = 1; i <= 9; i++) { const u = i / 9; P.push([st[0] + u * lerp(40, 85, reik) * s, st[1] + Math.sin(u * 5 + t) * 10 * s - u * lerp(30, -10, reik) * s]); }
    hlBuis(P, col, wB * 0.8); }
  if (hormoon > 0.01) { const hp = W([-46 * s, -96 * s]), h = ease(hormoon); _bioCirc(ctx, hp[0], hp[1], 34 * s, rgba('#121A26', 0.55 * h), rgba(lighten(col, 0.4), 0.6 * h), 1); _tfSteroid(ctx, lerp(hp[0] - 200 * s, hp[0] - 4 * s, h), lerp(hp[1] - 120 * s, hp[1], h), 7.5 * s, Math.min(1, hormoon * 2)); uit.hormoon = hp; }
  ctx.restore(); return uit;
}

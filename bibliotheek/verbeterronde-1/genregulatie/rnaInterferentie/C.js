// =====================================================================================
// RNA-INTERFERENTIE (overzicht van het hele proces in één beeld; ronde 2: puzzelbasen op het dsRNA, knipplek gemarkeerd, eiwitten als gevouwen lint). Recept (OpenStax Biology 2e § 16.5; Kawamata & Tomari
// 2010? zie bron.md: Dicer knipt dubbelstrengs RNA in stukjes van ± 21 nt met 2 nt overhang aan 3'; het duplex gaat van Dicer
// naar Argonaute (RISC), de gidsstreng blijft, de passagiersstreng verdwijnt; bij volledige passing knipt Argonaute het
// doel-mRNA tegenover nucleotide 10–11 van de gids; miRNA's zijn 21–24 nt):
//  - dubbelstrengs RNA = twee dunne teal strengen met korte sporten (basenparen); Dicer = enzym (gevouwen keten) dat er
//    stukjes van gelijke lengte af knipt.
//  - RISC (Argonaute + één streng, de gids) zoekt een mRNA met de passende volgorde, bindt en knipt het in het midden van de
//    gids; de twee stukken mRNA worden afgebroken, er wordt geen eiwit van gemaakt. RISC gaat door naar het volgende mRNA.
//  - mRNA blijft dun en sliertig (kapje aan 5', poly-A-staart aan 3').
//  - o.f 0..1: 0–0.2 Dicer knipt · 0.2–0.45 RISC houdt de gids, passagier weg · 0.45–0.7 RISC bindt het mRNA · 0.7–0.85 knip ·
//    0.85–1 stukken vallen uiteen.
// Bekende fouten: RISC dat DNA knipt; beide strengen in RISC; mRNA als balk; knip zonder passende volgorde.
// (x, y) = midden; s = schaal (± 1000 × 520 px bij s = 1). o.f, o.t. Geeft {dsRNA, dicer, risc, mrna, knip} terug.
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
function _riStreng(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function _riDuplex(ctx, x, y, len, s, rot = 0, a = 1, gids = 1, pass = 1, passOff = 0, seed = 1) { // dubbelstrengs stukje met puzzelbasen (A–U, G–C), 2 nt overhang aan elk 3'-eind; verkort getekend
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const bdx = 17 * s, bs = bdx / 62, h = 184 * bs / 2 + 1.5 * s, ov = bdx * 1.1, nb = Math.max(1, Math.floor((len - 2 * ov) / bdx)), x0 = -len / 2 + ov + (len - 2 * ov - nb * bdx) / 2, comp = { A: 'U', U: 'A', C: 'G', G: 'C' };
  const reeks = []; for (let j = 0; j < nb; j++) reeks.push('AUGC'[Math.floor(hash(seed * 13.7 + j * 3.3) * 4)]);
  if (pass > 0.01) { ctx.save(); ctx.globalAlpha *= pass; reeks.forEach((b, j) => baseRingRNA(ctx, x0 + (j + 0.5) * bdx, h + passOff, comp[b], -1, { s: bs, plekA: 0 })); _riStreng(ctx, [[-len / 2 + ov, h + passOff], [len / 2, h + passOff]], lighten(C.teal, 0.4), 3.2 * s); ctx.restore(); }
  if (gids > 0.01) { ctx.save(); ctx.globalAlpha *= gids; reeks.forEach((b, j) => baseRingRNA(ctx, x0 + (j + 0.5) * bdx, -h, b, 1, { s: bs, plekA: 0 })); _riStreng(ctx, [[-len / 2, -h], [len / 2 - ov, -h]], C.teal, 3.2 * s); ctx.restore(); }
  ctx.restore(); }
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0 } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.2, 0, 1)), p2 = ease(clamp((f - 0.2) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.45) / 0.25, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.85) / 0.15, 0, 1)), uit = {};
  const X = (v) => x + v * s, Y = (v) => y + v * s, dl = 120; // lengte van één stukje (± 21 nt; verkort getekend met 6 basenparen)
  ctx.save(); ctx.globalAlpha *= a;
  // 1) lang dubbelstrengs RNA linksboven; Dicer schuift van rechts naar links en knipt stukjes af
  const x0 = -490, x1 = -60, yd = -200, nKnip = Math.floor(p1 * 3.01);
  const rest = x1 - nKnip * (dl + 0); _riDuplex(ctx, X((x0 + rest) / 2), Y(yd), (rest - x0) * s, s, 0, 1 - p5 * 0.5, 1, 1, 0, 9);
  for (let k = 1; k <= nKnip; k++) { const kx = X(rest + (k - 1) * 0 ), ky = Y(yd); if (k > 1) break; ctx.save(); ctx.globalAlpha *= 1 - p3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(kx - 9 * s, ky - 34 * s); ctx.lineTo(kx + 9 * s, ky - 14 * s); ctx.moveTo(kx + 9 * s, ky - 34 * s); ctx.lineTo(kx - 9 * s, ky - 14 * s); ctx.stroke(); ctx.restore(); }
  for (let k = 0; k < 3; k++) { if (k >= nKnip) break; const isGids = k === 0, px = X(x1 - (k + 0.5) * dl + 20 + k * 30), py = Y(yd + 95 + (k % 2) * 40);
    if (isGids && p2 > 0.01) continue; _riDuplex(ctx, px, py, (dl - 6) * s, s, (k % 2 ? 0.2 : -0.15), 1 - p5 * 0.5, 1, 1, 0, k + 2); }
  const dxD = X(rest + 10), dyD = Y(yd - 46); const binD = (qx, qy) => { const ex = qx / 58, ey = qy / 40; return ex * ex + ey * ey < 1 && Math.hypot(qx, qy - 46) > 16; };
  _grKluwen(ctx, dxD, dyD, binD, { r: 6, sc: s, col: '#7A8BA8', seed: 13, bbox: [-60, -42, 60, 42], key: 'dicer', a: 1 - p3 * 0.6 }); uit.dicer = [dxD, dyD - 50 * s]; uit.dsRNA = [X((x0 + rest) / 2), Y(yd)];
  // 2) RISC (Argonaute, twee lobben) pakt het eerste stukje; de passagiersstreng gaat weg
  const rx = lerp(X(-150), X(60), p3), ry = lerp(Y(-40), Y(132), p3); const binR = (qx, qy) => { const ex = qx / 70, ey = qy / 50; return ex * ex + ey * ey < 1 && !(Math.abs(qy - 12) < 9 && qx > -60); };
  _grKluwen(ctx, rx, ry, binR, { r: 6, sc: s, col: '#8C9AB4', seed: 17, bbox: [-72, -52, 72, 52], key: 'risc', a: Math.min(1, f * 6) });
  if (p2 > 0.01) { const gx = lerp(X(x1 - dl / 2 + 20), rx, p2), gy = lerp(Y(yd + 95), ry + 4 * s, p2); _riDuplex(ctx, gx, gy, (dl - 6) * s, s, 0, 1, 1, 1 - ease(clamp(p2 * 1.6 - 0.6, 0, 1)), p2 * 60 * s, 2);
    // gidsstreng goud omrand zodra hij alleen in RISC zit
    if (p2 > 0.8) { ctx.save(); ctx.globalAlpha *= (p2 - 0.8) / 0.2 * (1 - p4); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5 * s; roundRect(ctx, gx - dl / 2 * s - 4 * s, gy - 34 * s, (dl - 6) * s + 8 * s, 40 * s, 8 * s); ctx.stroke(); ctx.restore(); } }
  uit.risc = [rx, ry - 60 * s];
  // 3) mRNA (dunne sliert, kapje + staart) onderaan; RISC bindt in het midden; knip; stukken vallen uiteen
  const ym = Y(150), xa = X(-420), xb = X(420), xm = X(60), gap = p4 * 30 * s, val = p5;
  const seg = (xs, xe, side) => { const P = []; for (let u = xs; side < 0 ? u <= xe : u <= xe; u += 6 * s) { const yy = ym + Math.sin(u / (34 * s) + t * 0.5) * 7 * s + Math.sin(u / (95 * s)) * 6 * s + val * 40 * s * Math.abs(Math.sin(u / (40 * s))); P.push([u + side * gap, yy + (1 - p3) * 0]); } return P; };
  ctx.save(); ctx.globalAlpha *= 1 - val * 0.75; const L = seg(xa, xm, -1), Rr = seg(xm, xb, 1);
  if (val > 0.01) { [L, Rr].forEach(P => { for (let i = 0; i < P.length - 6; i += 8) _riStreng(ctx, P.slice(i, i + 5), C.teal, 2.6 * s); }); } else { _riStreng(ctx, L, C.teal, 2.6 * s); _riStreng(ctx, Rr, C.teal, 2.6 * s); }
  _bioCirc(ctx, xa - 6 * s, ym, 7 * s, C.goud, lighten(C.goud, 0.3), 1); const Pa = []; for (let u = 0; u <= 80 * s; u += 5 * s) Pa.push([xb + gap + u, ym + Math.sin(u / (8 * s)) * 3 * s]); _riStreng(ctx, Pa, lighten(C.teal, 0.35), 1.6 * s); ctx.restore();
  uit.mrna = [X(-250), ym];
  if (p3 > 0.9 && p4 < 1) { ctx.save(); ctx.globalAlpha *= Math.min((p3 - 0.9) * 10, 1 - p4 * 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 * s; [[-1, -1], [1, -1]].forEach(([q]) => {}); ctx.beginPath(); ctx.moveTo(xm - 10 * s, ym - 16 * s); ctx.lineTo(xm + 10 * s, ym + 16 * s); ctx.moveTo(xm + 10 * s, ym - 16 * s); ctx.lineTo(xm - 10 * s, ym + 16 * s); ctx.stroke(); ctx.restore(); uit.knip = [xm, ym]; }
  ctx.restore(); return uit;
}

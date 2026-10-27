// =====================================================================================
// RNA-INTERFERENTIE (overzicht van het hele proces in één beeld). Recept (OpenStax Biology 2e § 16.5; Kawamata & Tomari
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
// GEDEELD HULPJE (groep genregulatie, 27 okt 2026): EIWITKLUWEN binnen een omtrek. Eén keer in lib_bio.js plakken;
// transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (de kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN): een eiwit is een keten van aminozuren (kralen) die vouwt: stukken α-helix (strakke
// spiraal, 3,6 aminozuren per winding) afgewisseld met gestrekte stukken en lussen, samen een compacte kluwen. Nooit een
// bol. De omtrek (binnen(x, y) in lokale coördinaten) mag een pasvorm hebben: een holte waar DNA of een molecuul in past.
// Alle maten (bbox, binnen, r) in ontwerpeenheden; o.sc = schaal naar beeld. o.fold 0 = gestrekte keten (net gemaakt) → 1 = gevouwen; o.key = cachesleutel voor de vorm. Geeft de kralen in beeld terug.
// Kleur: regeleiwitten en enzymen grijsblauw (#7A8BA8, C2); de bindende plek mag goud (o.hl = functie(i) → 0..1).
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r: r0 = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null, sx = 1 } = o; const r = r0; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r.toFixed(2) + '|' + bbox.join(',');
  let P = _grKluwenCache[k];
  if (!P) { P = []; const rows = []; for (let y = bbox[1] + r * 1.1; y <= bbox[3] - r * 0.9; y += r * 2.45) rows.push(y);
    rows.forEach((y, ri) => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
      if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (!best || best[1] - best[0] < r * 2) return;
      const x0 = best[0] + r * 0.9, x1 = best[1] - r * 0.9, dir = ri % 2 ? -1 : 1, helix = hash(seed * 7.3 + ri * 3.1) > 0.42 && x1 - x0 > r * 6;
      const L = x1 - x0, stap = helix ? r * 0.95 : r * 1.7, n = Math.max(2, Math.round(L / stap));
      if (P.length) { const q = P[P.length - 1], xs = dir > 0 ? x0 : x1; P.push([(q[0] + xs) / 2 + dir * -r * 1.1, (q[1] + y) / 2, 0]); }
      for (let i = 0; i <= n; i++) { const u = i / n, x = dir > 0 ? lerp(x0, x1, u) : lerp(x1, x0, u);
        if (helix) { const ph = i / 3.6 * 6.283 + seed; P.push([x, y + Math.sin(ph) * r * 0.95, Math.cos(ph)]); } else P.push([x + (hash(seed * 3.7 + ri * 11 + i * 1.3) - 0.5) * r * 0.6, y + Math.sin(i * 0.9 + seed) * r * 0.25 + (hash(seed * 5.1 + ri * 7 + i * 2.9) - 0.5) * r * 0.9, 0]); } });
    _grKluwenCache[k] = P; }
  const n = P.length, L = n * r * 1.8;
  const pts = P.map((p, i) => { const f = ease(clamp(fold * 1.4 - (i / n) * 0.4, 0, 1)); const bx = -L / 2 + i * r * 1.8, by = Math.sin(i * 0.35 + seed) * r * 3;
    const X = lerp(bx, p[0] * sx, f) * sc, Y = lerp(by, p[1], f) * sc, cs = Math.cos(rot), sn = Math.sin(rot);
    return [cx + X * cs - Y * sn, cy + X * sn + Y * cs, (p[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * sc * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  const tint = [0, 0.12, -0.1]; const order = pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]);
  order.forEach(i => { const p = pts[i], z = p[2], t = tint[(i * 7 + seed) % 3]; const h = hl ? hl(i, n) : 0;
    const fill = h > 0.5 ? C.goud : (t >= 0 ? lighten(col, t + 0.08 * z) : _mixHex(col, '#000000', -t)); ctx.beginPath(); ctx.arc(p[0], p[1], r * sc * (0.84 + 0.14 * z), 0, 6.283); shape(ctx, fill, h > 0.5 ? lighten(C.goud, 0.35) : lighten(col, 0.3), 1); });
  ctx.restore(); return pts;
}
function _riStreng(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function _riDuplex(ctx, x, y, len, s, rot = 0, a = 1, gids = 1, pass = 1, passOff = 0) { // kort dubbelstrengs stukje: twee strengen + sporten, 2 nt overhang aan elk 3'-eind
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); const h = 9 * s, ov = 9 * s;
  if (pass > 0.01 && gids > 0.01) { ctx.strokeStyle = rgba(C.teal, 0.55 * Math.min(gids, pass) * (1 - Math.min(1, passOff / (30 * s)))); ctx.lineWidth = 2 * s; ctx.beginPath(); for (let u = ov; u < len - ov; u += 8 * s) { ctx.moveTo(u - len / 2, -h + 2 * s); ctx.lineTo(u - len / 2, h - 2 * s); } ctx.stroke(); }
  if (gids > 0.01) { ctx.save(); ctx.globalAlpha *= gids; _riStreng(ctx, [[-len / 2, h], [len / 2 - ov, h]], C.teal, 3 * s); ctx.restore(); }
  if (pass > 0.01) { ctx.save(); ctx.globalAlpha *= pass; _riStreng(ctx, [[-len / 2 + ov, -h - passOff], [len / 2, -h - passOff]], lighten(C.teal, 0.4), 3 * s); ctx.restore(); }
  ctx.restore(); }
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0 } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.2, 0, 1)), p2 = ease(clamp((f - 0.2) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.45) / 0.25, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.85) / 0.15, 0, 1)), uit = {};
  const X = (v) => x + v * s, Y = (v) => y + v * s, dl = 70; // lengte van één stukje (± 21 nt)
  ctx.save(); ctx.globalAlpha *= a;
  // 1) lang dubbelstrengs RNA linksboven; Dicer schuift van rechts naar links en knipt stukjes af
  const x0 = -470, x1 = -150, yd = -170, nKnip = Math.floor(p1 * 4.01);
  const rest = x1 - nKnip * (dl + 0); _riDuplex(ctx, X((x0 + rest) / 2), Y(yd), (rest - x0) * s, s, 0, 1 - p5 * 0.5);
  for (let k = 0; k < 4; k++) { if (k >= nKnip) break; const isGids = k === 0, px = X(x1 - (k + 0.5) * dl + 30 + k * 18), py = Y(yd + 60 + (k % 2) * 30);
    if (isGids && p2 > 0.01) continue; _riDuplex(ctx, px, py, (dl - 6) * s, s, (k % 2 ? 0.25 : -0.2), 1 - p5 * 0.5); }
  const dxD = X(rest + 10), dyD = Y(yd - 46); const binD = (qx, qy) => { const ex = qx / 58, ey = qy / 40; return ex * ex + ey * ey < 1 && Math.hypot(qx, qy - 46) > 16; };
  _grKluwen(ctx, dxD, dyD, binD, { r: 6, sc: s, col: '#7A8BA8', seed: 13, bbox: [-60, -42, 60, 42], key: 'dicer', a: 1 - p3 * 0.6 }); uit.dicer = [dxD, dyD - 50 * s]; uit.dsRNA = [X((x0 + rest) / 2), Y(yd)];
  // 2) RISC (Argonaute, twee lobben) pakt het eerste stukje; de passagiersstreng gaat weg
  const rx = lerp(X(-150), X(60), p3), ry = lerp(Y(-40), Y(132), p3); const binR = (qx, qy) => { const ex = qx / 70, ey = qy / 50; return ex * ex + ey * ey < 1 && !(Math.abs(qy - 12) < 9 && qx > -60); };
  _grKluwen(ctx, rx, ry, binR, { r: 6, sc: s, col: '#8C9AB4', seed: 17, bbox: [-72, -52, 72, 52], key: 'risc', a: Math.min(1, f * 6) });
  if (p2 > 0.01) { const gx = lerp(X(x1 - dl / 2 + 30), rx, p2), gy = lerp(Y(yd + 60), ry + 12 * s, p2); _riDuplex(ctx, gx, gy, (dl - 6) * s, s, 0, 1, 1, 1 - ease(clamp(p2 * 1.6 - 0.6, 0, 1)), p2 * 60 * s);
    // gidsstreng goud omrand zodra hij alleen in RISC zit
    if (p2 > 0.8) { ctx.save(); ctx.globalAlpha *= (p2 - 0.8) / 0.2 * (1 - p4); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5 * s; roundRect(ctx, gx - dl / 2 * s - 4 * s, gy + 2 * s, (dl - 6) * s + 8 * s, 14 * s, 6 * s); ctx.stroke(); ctx.restore(); } }
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

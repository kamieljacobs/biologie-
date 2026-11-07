// =====================================================================================
// RNA-INTERFERENTIE: close-up van RISC op het mRNA (basen zichtbaar). Recept (OpenStax Biology 2e § 16.5; Kawamata & Tomari
// 2010, Trends Biochem Sci (PMC2855239): siRNA-duplex van Dicer (± 21 nt, 2 nt overhang aan 3') gaat naar Argonaute, de
// passagiersstreng gaat weg, de gidsstreng blijft; alleen bij volledige passing knipt Argonaute het doel-mRNA, tegenover
// nucleotide 10–11 van de gids):
//  - Argonaute = eiwit met twee lobben (gevouwen ketens) en een geul waarin de gids ligt; basen naar buiten, klaar om te paren.
//  - het mRNA (dunne teal sliert) komt langs; de basen passen als puzzelstukjes op de gids (A–U, C–G), dan knipt Argonaute in
//    het midden (goud). De twee stukken laten los en worden afgebroken; RISC blijft heel en kan opnieuw.
//  - o.f 0..1: 0–0.25 duplex komt binnen, passagier gaat weg · 0.25–0.5 mRNA komt aan · 0.5–0.7 basen paren · 0.7–0.82 knip ·
//    0.82–1 stukken laten los. (Dicer zelf en het lange dubbelstrengs RNA staan in de overzichtsversie.)
// Bekende fouten: knip zonder passing; RISC dat beide strengen houdt; basen die niet passen (A tegenover C).
// Vereist baseRingRNA (lib_bio.js). Zelfde aanroep als de overzichtsversie: (x, y) = midden; s = schaal (± 1000 × 520 bij s = 1).
// Geeft {dsRNA, risc, mrna, knip} terug.
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
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0, gids = 'UAGCUUAGCAGGUCAUCGAAU' } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.25, 0, 1)), p2 = ease(clamp((f - 0.25) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.5) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.12, 0, 1)), p5 = ease(clamp((f - 0.82) / 0.18, 0, 1)), uit = {};
  const n = gids.length, dx = 38 * s, bs = 0.4 * s, Lb = DNA_BASE.len * bs, xg0 = x - (n - 1) * dx / 2, yg = y - 20 * s, comp = { A: 'U', U: 'A', C: 'G', G: 'C' };
  ctx.save(); ctx.globalAlpha *= a;
  // Argonaute: twee lobben (achter), de gids in de geul ertussen
  const binL = (qx, qy) => { const ex = (qx + 10) / 300, ey = (qy + 40) / 80; return ex * ex + ey * ey < 1 && qy < -2; };
  const binO = (qx, qy) => { const ex = (qx - 30) / 250, ey = (qy - 128) / 70; return ex * ex + ey * ey < 1 && qy > 92; };
  _grKluwen(ctx, x, y, binL, { r: 7, sc: s, col: '#8C9AB4', seed: 19, bbox: [-320, -130, 300, 0], key: 'agoB1' });
  uit.risc = [x - 10 * s, y - 120 * s];
  // gidsstreng (ruggengraat + basen naar beneden); passagiersstreng (lichter) eronder, gaat weg
  _riStreng(ctx, [[xg0 - 20 * s, yg], [xg0 + (n - 1) * dx + 10 * s, yg]], C.teal, 6 * s);
  for (let i = 0; i < n; i++) baseRingRNA(ctx, xg0 + i * dx, yg + 4 * s, gids[i], 1, { s: bs, plekA: 0, rand: (i === 9 || i === 10) && p4 > 0.01 && p4 < 1 ? C.goud : null });
  const ink = lerp(-420, 0, p1) * s;
  if (p1 < 1 || f < 0.25) { ctx.save(); ctx.globalAlpha *= 1 - ease(clamp((f - 0.15) / 0.1, 0, 1)); const yp = yg + 2 * Lb + 16 * s + p1 * 60 * s * clamp((f - 0.12) * 10, 0, 1);
    for (let i = 2; i < n; i++) baseRingRNA(ctx, xg0 + i * dx + ink * 0 + (f < 0.12 ? 0 : 0), yp - 4 * s, comp[gids[i]], -1, { s: bs, plekA: 0 }); _riStreng(ctx, [[xg0 + 2 * dx - 10 * s, yp], [xg0 + (n + 1) * dx, yp]], lighten(C.teal, 0.4), 6 * s); ctx.restore(); uit.dsRNA = [x, yp]; }
  // mRNA: komt van onderen aan, basen naar boven; passend stuk in het midden, de rest dun en sliertig
  if (p2 > 0.01) { const ym = lerp(y + 260 * s, yg + 2 * Lb + 16 * s, p2) + p5 * 70 * s, gap = p4 * 26 * s, Ls = [], Rs = [];
    const yy = (u) => ym + (Math.abs(u - x) > (n / 2) * dx ? Math.sin(u / (30 * s) + t * 0.5) * 8 * s * (1 - p3 * 0.3) + (Math.abs(u - x) - (n / 2) * dx) * 0.12 : 0);
    for (let u = x - 470 * s; u <= x + 470 * s; u += 6 * s) { const knipX = xg0 + 9.5 * dx; (u < knipX ? Ls : Rs).push([u + (u < knipX ? -gap : gap) - (u < knipX ? 1 : -1) * p5 * 60 * s, yy(u)]); }
    ctx.save(); ctx.globalAlpha *= Math.min(1, p2 * 2) * (1 - p5 * 0.7); _riStreng(ctx, Ls, C.teal, 6 * s); _riStreng(ctx, Rs, C.teal, 6 * s);
    for (let i = 0; i < n; i++) { const kx = xg0 + i * dx, links = i <= 9; baseRingRNA(ctx, kx + (links ? -gap : gap) - (links ? 1 : -1) * p5 * 60 * s, ym - 4 * s, comp[gids[i]], -1, { s: bs, plekA: 0 }); }
    _bioCirc(ctx, Ls[0][0] - 6 * s, Ls[0][1], 8 * s, C.goud, lighten(C.goud, 0.3), 1); ctx.restore(); uit.mrna = [x - 380 * s, ym]; }
  // onderste lob van Argonaute klemt het gepaarde stuk (komt pas bij paren dicht)
  _grKluwen(ctx, x, y + lerp(60, 0, p3) * s, binO, { r: 7, sc: s, col: '#7A8BA8', seed: 23, bbox: [-230, 50, 290, 200], key: 'agoB2', a: 0.35 + 0.65 * p3 });
  if (p4 > 0.01 && p4 < 1) { const kx = xg0 + 9.5 * dx, ky = yg + Lb + 8 * s; ctx.save(); ctx.globalAlpha *= Math.sin(p4 * Math.PI); ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath();
    for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283; ctx.moveTo(kx + Math.cos(an) * 14 * s, ky + Math.sin(an) * 14 * s); ctx.lineTo(kx + Math.cos(an) * 30 * s, ky + Math.sin(an) * 30 * s); } ctx.stroke(); ctx.restore(); uit.knip = [kx, ky]; }
  ctx.restore(); return uit;
}

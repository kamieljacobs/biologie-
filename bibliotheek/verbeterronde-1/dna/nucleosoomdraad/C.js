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
function _ellips(rx, ry) { return { binnen: (x, y) => (x * x) / (rx * rx) + (y * y) / (ry * ry) < 1, bbox: [-rx, -ry, rx, ry] }; }
// =====================================================================================
// DNA ROND EIWITTEN (nucleosomen), variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) met histonen als gevouwen ketens. Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e
// § 10.1; afwikkelen en samenschuiven zijn een model, bron nog niet geopend in deze ronde):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (147 bp) om een kern van acht histonen (schijf ± 11 nm breed, ± 6 nm hoog);
//    linker-DNA ertussen. Eiwit grijsblauw (#7A8BA8), DNA paars; de wikkeling is 3D (achterkant donkerder, eerst getekend).
//  - NIEUW o.los 0..1: het DNA wikkelt vanaf beide uiteinden af (wikkeling 1,65 → 0 keer) en wordt linker-DNA; de histonschijf
//    blijft liggen en wordt iets lichter (gen 'aan', DNA 6). o.compact 0..1: nucleosomen schuiven samen tot een zigzag-stapel
//    (± 30-nm-vezel, model): kortere linkers, schijven om en om boven/onder en licht gekanteld.
//  - C: de histonkern is geen schijf met bolletjes meer: op het bovenvlak liggen de histonen als gevouwen ketens (lintmodel
//    _grKluwen, per histon een histonvouw met α-helices) en uit de rand steken dunne, slappe staarten (N-terminale staarten) die
//    over en tussen de DNA-windingen lopen (Luger e.a. 1997 Nature 389:251: histonvouw = drie α-helices met twee lussen;
//    'amino-terminal tails pass over and between the gyres of the DNA superhelix'; 146 bp in 1,65 linksdraaiende superhelixwindingen).
//  Bekende fouten: golflijn met losse bolletjes; DNA door de schijf heen; rechte linker; afwikkelen als vervagen.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt). Geeft de centra terug (lokaal, zoals v1).
// =====================================================================================
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false, los = 0, compact = 0 } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  const lo = (i) => typeof los === 'function' ? clamp(los(i), 0, 1) : (Array.isArray(los) ? clamp(los[i] || 0, 0, 1) : clamp(los, 0, 1));
  const cp = ease(clamp(compact, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const sp = lerp(L / n, R * 1.25, cp), mid = L / 2; // afstand tussen centra
  const centra = []; for (let i = 0; i < n; i++) centra.push([mid + (i - (n - 1) / 2) * sp, (i % 2 ? 1 : -1) * R * lerp(0.45, 0.62, cp)]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283, tm = (th0 + th1) / 2, l = ease(lo(i));
    const ta = lerp(th0, tm, l), tb = lerp(th1, tm, l), rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const u = k / 160, th = lerp(ta, tb, u), z = (lerp(-0.5, 0.5, lerp(u, 0.5, l))) * H * 1.05 * (1 - l) + (u - 0.5) * H * 0.2 * l;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(l > 0.97 ? 1 : D); } return { P, Z }; };
  const W = centra.map(wikkel);
  const kr = lerp(1, 0.35, cp); // kromming linker
  const linkers = []; linkers.push([[centra[0][0] - sp * 0.5 - 30, centra[0][1] + R * 0.8 * kr], W[0].P[0]]);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5 * kr], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [centra[n - 1][0] + sp * 0.5 + 30, centra[n - 1][1] - R * 0.8 * kr]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn, l = lo(i); ctx.save(); ctx.globalAlpha *= 1 - 0.25 * l;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    if (R >= 34) { ctx.save(); ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R * 0.97, ry * 0.97, 0, 0, 6.283); ctx.clip(); ctx.translate(c[0], c[1] - hz / 2); ctx.scale(1, ry / R);
      const E = _ellips(46, 40), kl = ['#8E9CB8', '#7F8FAD', '#9AA8C2', '#8696B2'];
      for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; _grKluwen(ctx, Math.cos(an) * R * 0.45, Math.sin(an) * R * 0.45, E.binnen, { bbox: E.bbox, sc: R / 120, r: 7, col: kl[k], seed: 4 + k, rot: an + 1.2, key: 'hist' + k }); }
      ctx.restore(); }
    else for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * R * 0.42, c[1] - hz / 2 + Math.sin(an) * ry * 0.42, R * 0.34, ry * 0.34, 0, 0, 6.283); shape(ctx, '#8696B2', '#A4B2CA', 1.2); }
    ctx.restore(); });
  // linker + afgewikkeld DNA als één doorlopende draad (zelfde helixfase over de naad)
  linkers.forEach((pl, i) => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  // histonstaarten: dunne slappe uitlopers vanuit de kern over en tussen de windingen
  centra.forEach((c, i) => { const ry = R * cs; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.3 + i * 0.9, P = []; let px = c[0] + Math.cos(an) * R * 0.85, py = c[1] - H * sn / 2 + Math.sin(an) * ry * 0.85, a2 = an;
      for (let q = 0; q < 9; q++) { a2 += Math.sin(q * 1.3 + k + i + t * 0.5) * 0.35; px += Math.cos(a2) * R * 0.09; py += Math.sin(a2) * R * 0.09; P.push([px, py]); }
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.strokeStyle = '#B4C0D4'; ctx.lineWidth = Math.max(1.5, R * 0.05) + 1.5; ctx.stroke(); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = Math.max(1.5, R * 0.05); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); return centra; // lokaal (as van x0,y0 langs de draad), zoals v1
}

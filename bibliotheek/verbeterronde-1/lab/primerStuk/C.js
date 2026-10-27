// =====================================================================================
// PRIMER MET POLYMERASE: kort enkelstrengs stukje DNA (20 nt, goud) gebonden op de matrijs; DNA-polymerase
// (gevouwen keten in het gedeelde lintmodel _grKluwen: handpalm achter het DNA, duim vóór het DNA langs, actief
// centrum goud) gaat op het 3′-uiteinde zitten en bouwt de nieuwe streng (lichtpaars).
// Recept: OpenStax Biology 2e § 17.1 (PCR: primers zijn korte stukjes DNA die complementair zijn aan de uiteinden
//  van het doelstuk) en § 14.3 (polymerase kan alleen verlengen aan een vrij 3′-uiteinde, dus het heeft een
//  primer nodig). Een PCR-primer is ± 18–25 nt; hij ligt antiparallel op de matrijs, met zijn 3′-kant naar het
//  doelstuk toe. Basen in de puzzelvorm van de DNA-reeks (d2Base: A punt ↔ T inkeping, C nok ↔ G sleuf), alle sporten
//  even lang; ruggengraat van de primer goud, van de matrijs paars.
//  Stand o.bouw 0..1: de polymerase klemt zich op het 3′-uiteinde van de primer en voegt nucleotiden toe die passen
//  bij de matrijs, alleen in de richting 5′ → 3′ (naar rechts); de primer blijft het begin van de nieuwe streng.
//  Los (o.bind < 1) ritst de primer eerst vast zoals in de basisversie.
//  Bekende fouten: primer zo lang als het gen; primer parallel (5′ op 5′); basen die niet passen; primer als staafje.
// x, y = 5′-uiteinde van de primer als hij gebonden is (voet van de eerste base); s = schaal (1 = 34 px per base).
// o.bind 0..1, o.bouw 0..1 (± 7 nieuwe nucleotiden), o.seq, o.t, o.a. Geeft { vijf, drie, matrijs3, polymerase } terug.
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

function primerStuk(ctx, x, y, s, o = {}) {
  const { a = 1, bind = 1, matrijs = true, t = 0, bouw = 0 } = o;
  const seq = (o.seq || 'GACCTGAAGTCCATGGCTAC').slice(0, 30), n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const bp = 34 * s, L = 30 * s, hw = bp * 0.32, yM = y + 2 * L; // matrijs onder de primer
  const voor = 3, na = 7; // matrijsbasen links en rechts van de bindplek
  const ret = { vijf: [x, y], drie: [x + (n - 1) * bp, y], matrijs3: [x - voor * bp, yM] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const nNieuw = bind >= 1 ? Math.floor(clamp(bouw, 0, 1) * 7.999) : 0, xA = x + (n - 1 + nNieuw) * bp + bp * 0.5; ret.polymerase = [xA, y + L];
  const pk = L / 10; if (bind >= 1 && bouw > 0.001) _grKluwen(ctx, xA + 6 * pk, y + L, (px, py) => (px / 26) ** 2 + (py / 30) ** 2 < 1, { r: 2.6, sc: pk, col: D2.enz || C.enzym, seed: 2, bbox: [-26, -30, 26, 30], key: 'prPol', a: 0.95 }); // handpalm achter het DNA
  if (matrijs) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; const P = [];
    for (let i = -voor; i < n + na; i++) P.push([x + i * bp, yM]);
    ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(P[0][0] - bp * 0.4, yM); ctx.lineTo(P[P.length - 1][0] + bp * 0.4, yM); ctx.stroke();
    for (let i = -voor; i < n + na; i++) d2Base(ctx, x + i * bp, yM, -Math.PI / 2, mseq[i + voor], L, hw);
    if (s > 0.5) { text(ctx, "3′", x - (voor + 0.9) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'right'); text(ctx, "5′", x + (n + na - 0.1) * bp, yM + 40 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'left'); } }
  // primer: elke base heeft een eigen moment van binden (rits van 3′ naar 5′)
  const pts = []; for (let i = 0; i < n; i++) { const k = clamp(bind * 1.6 - (n - 1 - i) / n * 0.6, 0, 1), e = ease(k);
    const losX = x + (n - 1) * bp * 0.5 + (i - (n - 1) / 2) * bp * 0.92, losY = y - 2.4 * L + Math.sin(i * 0.7 + t * 1.5) * L * 0.35 + Math.cos(i * 0.31) * L * 0.4;
    pts.push([lerp(losX, x + i * bp, e), lerp(losY, y, e), e]); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0], p[1]]), false); ctx.stroke();
  pts.forEach((p, i) => { const vrij = 1 - p[2]; const ang = Math.PI / 2 + vrij * (Math.sin(i * 1.3 + t) * 0.5); d2Base(ctx, p[0], p[1], ang, seq[i], L, hw, { plekA: 0 }); });
  if (nNieuw > 0) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(x + (n - 1) * bp, y); ctx.lineTo(x + (n - 1 + nNieuw) * bp + bp * 0.3, y); ctx.stroke();
    for (let j = 0; j < nNieuw; j++) d2Base(ctx, x + (n + j) * bp, y, Math.PI / 2, comp[mseq[voor + n + j]], L, hw); }
  if (bind >= 1 && bouw > 0.001) { _grKluwen(ctx, xA + 20 * pk, y + L, (px, py) => (px / 7) ** 2 + (py / 27) ** 2 < 1, { r: 2.6, sc: pk, col: D2.enzR || '#A4B2CA', seed: 8, bbox: [-7, -27, 7, 27], key: 'prDuim', a: 0.9 }); circ(ctx, xA - bp * 0.5, y + L * 0.2, 3.2 * pk, C.goud); } // duim vóór het DNA, actief centrum bij het 3′-uiteinde
  if (s > 0.5) { const e0 = pts[0], e1 = pts[n - 1]; text(ctx, "5′", e0[0] - bp * 0.8, e0[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'right'); const xe = e1[0] + nNieuw * bp; if (!(bouw > 0.001)) text(ctx, "3′", xe + bp * 0.8, e1[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'left'); }
  ctx.restore(); return ret;
}

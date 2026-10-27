// =====================================================================================
// NUCLEOSOMEN DICHT ↔ OPEN, vooraanzicht met ladingen (vezel ↔ kralensnoer); ronde 2: histonkern als gekantelde schijf met twee lagen van vier histonen (acht), DNA voor en achter de schijf. Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 4):
//  - elk nucleosoom = kern van acht histonen (schijf ± 11 nm) met het DNA (2 nm) er ± 1,65 keer omheen; recht van voren
//    gezien een schijf met een ring DNA langs de rand, linker-DNA naar de volgende.
//  - histonstaarten zijn positief geladen (+), het DNA negatief (−): ze trekken elkaar aan. Dicht (o.open 0): nucleosomen
//    pakken zich in een zigzag-vezel tegen elkaar, de promotor zit ertussen verstopt, een transcriptiefactor kan er niet bij.
//  - acetylgroepen (groen) op de staarten maken ze minder positief ('the charge becomes less positive, and the binding of DNA
//    to the histones is relaxed', OpenStax): de + verdwijnen, de vezel valt open tot een kralensnoer, de promotor (goud)
//    ligt vrij en een transcriptiefactor kan binden (o.tf).
// Bekende fouten: open = minder nucleosomen; lading op de verkeerde plek; DNA dat door de schijf loopt.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de zijaanzichtversie: van (x0,y0) naar (x1,y1); o.n, o.R (straal
// van de schijf), o.open 0..1, o.tf 0..1, o.t. Geeft {promotor, centra, tf} terug.
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
function _naAcetyl(ctx, x, y, rr, an, a = 1) { // acetylgroep: C=O en CH3 (drie bolletjes), groen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = rr * 0.4;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, -rr * 0.9); ctx.moveTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, rr * 0.9); ctx.stroke();
  _bioCirc(ctx, rr * 1.6, 0, rr * 0.75, C.groen, lighten(C.groen, 0.35), 1); _bioCirc(ctx, rr * 2.7, -rr * 0.95, rr * 0.6, '#D8DCE2', null); _bioCirc(ctx, rr * 2.7, rr * 0.95, rr * 0.6, C.groen, null); ctx.restore(); }
function nucleosoomAcetyl(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, open = 0, tf = 0, t = 0 } = o; if (a <= 0.01) return {};
  const ac = ease(clamp(open / 0.35, 0, 1)), schuif = ease(clamp((open - 0.3) / 0.7, 0, 1));
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), cs = Math.cos(ang), sn = Math.sin(ang), Wd = (p) => [x0 + p[0] * cs - p[1] * sn, y0 + p[0] * sn + p[1] * cs];
  const dw = Math.max(5, R * 0.36), Rs = R * 0.78, uit = { centra: [] }, half = n / 2;
  // plekken: dicht = zigzag (twee rijen, overlappend), open = één rij met in het midden een vrij stuk (promotor)
  const C2 = []; for (let i = 0; i < n; i++) { const zx = L / 2 + (i - (n - 1) / 2) * R * 1.15, zy = (i % 2 ? 1 : -1) * R * 0.62;
    const ox = i < half ? R * 0.95 + i * R * 2.3 : L - R * 0.95 - (n - 1 - i) * R * 2.3;
    C2.push([lerp(zx, ox, schuif), lerp(zy, (i % 2 ? 1 : -1) * R * 0.12, schuif)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const pm = [(C2[half - 1][0] + C2[half][0]) / 2, (C2[half - 1][1] + C2[half][1]) / 2 + R * 0.25 * schuif];
  if (schuif > 0.05) { ctx.save(); ctx.globalAlpha *= schuif; roundRect(ctx, pm[0] - R * 0.95, pm[1] - dw * 1.3, R * 1.9, dw * 2.6, dw); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  // DNA-pad: binnenkomen links onder elke schijf, rondje langs de rand, eruit rechts onder → naar de volgende
  const KZ = 0.62, TH = Rs * 0.42; // schijf iets gekanteld: bovenvlak als ellips (ry = KZ·R), zijkant TH dik (twee lagen van vier histonen)
  const ring = (c, i) => { const P = [], Z = [], a0 = Math.PI * 0.75, tot = 1.65 * 6.283; for (let k = 0; k <= 80; k++) { const u = k / 80, an = a0 + u * tot, rr = Rs + dw * 0.55; P.push([c[0] + Math.cos(an) * rr, c[1] + Math.sin(an) * rr * KZ + lerp(-TH * 0.45, TH * 0.45, u)]); Z.push(Math.sin(an)); } P.Z = Z; return P; };
  const R2 = C2.map(ring);
  const linkers = [[[0, 0], [C2[0][0] - R * 0.8, C2[0][1] + R * 0.3], R2[0][0]]];
  for (let i = 0; i < n - 1; i++) { const A = R2[i][R2[i].length - 1], B = R2[i + 1][0]; linkers.push(i === half - 1 ? [A, [pm[0] - R * 0.5, pm[1]], [pm[0] + R * 0.5, pm[1]], B] : [A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + R * 0.35], B]); }
  linkers.push([R2[n - 1][R2[n - 1].length - 1], [C2[n - 1][0] + R * 0.9, C2[n - 1][1] - R * 0.2], [L, 0]]);
  linkers.forEach(P => dnaDraad(ctx, P, { w: dw, helix: true, fase: t * 0.2 }));
  // schijven met DNA-ring (achterste rij eerst)
  const volg = [...C2.keys()].sort((i, j) => C2[i][1] - C2[j][1]);
  const deelR = (P, voor) => { const out = []; let cur = null; P.forEach((p, k) => { if ((P.Z[k] >= 0) === voor) { if (!cur) { cur = []; out.push(cur); } cur.push(p); } else cur = null; }); return out.filter(q => q.length > 2); };
  volg.forEach(i => { const c = C2[i]; deelR(R2[i], false).forEach(q => dnaDraad(ctx, q, { w: dw, helix: true, glad: false, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), fase: t * 0.2 }));
    // histonkern als schijf: zijkant (onderste laag van vier histonen als bulten) + bovenvlak (bovenste laag van vier)
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + TH / 2, Rs, Rs * KZ, 0, 0, Math.PI); ctx.lineTo(c[0] - Rs, c[1] - TH / 2); ctx.ellipse(c[0], c[1] - TH / 2, Rs, Rs * KZ, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#56667F', '#8E9EBA', 1.5);
    for (let k = 0; k < 4; k++) { const an = Math.PI * (0.18 + k * 0.21); ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * Rs * 0.78, c[1] + TH * 0.15 + Math.sin(an) * Rs * KZ * 0.78, Rs * 0.24, TH * 0.42, 0, 0, 6.283); shape(ctx, '#66779A', '#8E9EBA', 1); }
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - TH / 2, Rs, Rs * KZ, 0, 0, 6.283); shape(ctx, '#6E7F9C', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.8; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * Rs * 0.44, c[1] - TH / 2 + Math.sin(an) * Rs * KZ * 0.44, Rs * 0.36, Rs * KZ * 0.36, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#A4B2CA', 1); }
    deelR(R2[i], true).forEach(q => dnaDraad(ctx, q, { w: dw, helix: true, glad: false, fase: t * 0.2 }));
    // staarten: dicht = tegen het DNA van de buren met +; open = naar buiten met acetylgroepen
    const rr = R * 0.075; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.4 + i, P = [];
      for (let q = 0; q < 6; q++) { const u = q / 5, len = lerp(0.55, 0.95, schuif) * R, krul = lerp(1.4, 0.3, schuif); P.push([c[0] + Math.cos(an) * Rs * 0.7 + Math.cos(an + u * krul) * u * len, c[1] + Math.sin(an) * Rs * 0.7 + Math.sin(an + u * krul) * u * len]); }
      ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.strokeStyle = '#C4CEDC'; ctx.lineWidth = rr * 1.5 + 2; ctx.stroke(); ctx.strokeStyle = '#9AAAC4'; ctx.lineWidth = rr * 1.5; ctx.stroke(); // staart = stukje eiwitketen (buis, geen kralen)
      const q = P[3]; if (ac < 0.5 && R >= 24) { ctx.save(); ctx.globalAlpha *= 1 - ac * 2; text(ctx, '+', q[0] + rr * 2.2, q[1] - rr * 1.2, fTekst(Math.max(10, R * 0.32), 700), C.text, 'center'); ctx.restore(); }
      _naAcetyl(ctx, P[5][0], P[5][1], rr * 1.1, an + 0.3, ac); } uit.centra.push(Wd(c)); });
  if (tf > 0.01 && schuif > 0.6) { const p = ease(tf), tx = pm[0], ty = lerp(pm[1] - R * 2.6, pm[1] - dw * 1.7, p); _grKluwen(ctx, tx, ty, (qx, qy) => { const ex = qx / 70, ey = qy / 52; return ex * ex + ey * ey < 1 && !(qy > 30 && Math.abs(qx) < 24); }, { r: 6.5, sc: R / 100, col: '#7A8BA8', seed: 3, bbox: [-72, -54, 72, 54], key: 'naTF', a: Math.min(1, tf * 2) }); uit.tf = Wd([tx, ty]); }
  uit.promotor = Wd(pm); ctx.restore(); return uit;
}

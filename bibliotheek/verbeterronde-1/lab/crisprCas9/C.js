// =====================================================================================
// CRISPR-CAS9 (lintmodel) met gids-RNA dat een doelplek in het DNA zoekt, opent en beide strengen knipt; daarna reparatie.
// Recept (RCSB PDB 4OO8: Cas9 van Streptococcus pyogenes, 1 372 aminozuren, 'bilobed architecture': een
//  herkenningslob en een nucleaselob; het gids-RNA–DNA-duplex ligt in een geladen groef tussen de twee lobben;
//  HNH knipt de streng die met de gids paart, RuvC de andere; een domein aan de C-kant herkent de PAM;
//  Jinek e.a. 2012: PAM = NGG, stompe knip 3 bp vóór de PAM). Maten: Cas9 ± 10 nm, DNA 2 nm breed, 0,34 nm per
//  basepaar, dus het eiwit omvat ± 30 bp; de spacer van het gids-RNA is 20 nt. Stappen: o.stap 0–1 zoeken (schuift
//  langs het DNA), 1–2 PAM (goud omrand), 2–3 openen (R-lus: gids paart vanaf de PAM met de doelstreng, de andere
//  streng buigt weg) en knippen (2,75–3), 3–4 Cas9 laat los, reparatie: 'uit' = kleine fout bij het plakken
//  (koraal, gen kapot) of 'nieuw' = een nieuw stuk (goud) ertussen.
//  Eiwit = één gevouwen keten in het gedeelde lintmodel (_grKluwen: buis, helices als spiraal, β-strengen als pijl).
//  Cas9 KLEMT om het DNA: de herkenningslob ligt achter/boven, de nucleaselob achter/onder, en het PAM-domein loopt
//  vóór het DNA langs naast de PAM (brug). Gids-RNA in teal: los als slap draadje in de herkenningslob; in de R-lus
//  liggen zijn 20 basen (puzzelvorm, U in plaats van T) precies op de doelstreng, de andere streng buigt omhoog weg.
//  Bekende fouten: Cas9 als schaar; één streng geknipt; knip in de PAM; gids-RNA dat paart met beide strengen.
// x, y = midden van de doelplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..4, o.reparatie,
// o.t, o.a. Geeft { cas9, pam, knip, gids, rec, nuc } terug.
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

function crisprCas9(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 0, t = 0, reparatie = 'uit' } = o; const st = clamp(stap, 0, 4);
  const zoek = clamp(st, 0, 1), pam = clamp(st - 1, 0, 1), open = clamp(st - 2, 0, 1), knip = clamp((st - 2.75) / 0.25, 0, 1), rep = clamp(st - 3, 0, 1);
  const bp = 3.4, L = 10, nTot = 44, i0 = -14; // basen −14 … 29; doelplek 0–19, PAM 20–22 (NGG op de bovenstreng)
  const X = (i) => x + (i - 10) * bp * s, yT = y - L * s, yB = y + L * s;
  const seqT = 'TTCAGGACTACCGAGTTCATGGTACAGCTTGGAGCCGATTCAGT', comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const casX = lerp(-150, 0, ease(zoek)) * s * (st < 1 ? 1 : 0) + x, casY = y - lerp(0, 50, ease(rep)) * s, casA = 1 - ease(rep) * 0.9;
  const knipI = 16.5; // knip 3 bp vóór de PAM: stompe knip in beide strengen (HNH: doelstreng, RuvC: andere streng)
  const uit = ease(rep) * 1.6 * bp * s; // na de knip wijken de uiteinden even uiteen
  const ret = { cas9: [casX, casY], pam: [X(21), yT - L * s * 1.4], knip: [X(knipI), y], gids: [X(6), yB + L * s * 1.6], rec: [casX, y - 75 * s], nuc: [casX, y + 72 * s] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // Cas9 achter het DNA: herkenningslob (boven) en nucleaselob (onder) als gevouwen keten; de groef ertussen blijft vrij
  const lob = (bb, ry, kl, seed, key) => _grKluwen(ctx, casX, casY, (px, py) => (px / 64) * (px / 64) + (py / ry) * (py / ry) < 1 && (py < -52 || py > 17), { r: 3.2, sc: s, col: kl, seed, bbox: bb, key, a: casA * 0.95 });
  lob([-64, -96, 64, -52], 96, '#8E9FBC', 3, 'casREC'); lob([-64, 17, 64, 58], 58, C.enzym, 5, 'casNUC');
  const hw = bp * s * 0.34, ruggW = Math.max(2.5, bp * s * 0.35);
  // DNA: bovenstreng (5′→3′, met PAM) en doelstreng. In de open stand buigt de bovenstreng omhoog weg (R-lus).
  const bol = (i) => (i >= 0 && i <= 19) ? Math.sin(clamp((i + 0.5) / 20, 0, 1) * Math.PI) * 0 + (open > 0 ? ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (1 - ease(rep)) : 0) : 0;
  const yTop = (i) => yT - bol(i) * L * s * 3.8 * Math.sin(clamp((i + 1) / 21, 0, 1) * Math.PI) ;
  const dx = (i) => (i > knipI ? uit : 0) * (rep > 0 ? 1 : 0);
  const ins = reparatie === 'nieuw' && rep > 0.5 ? 6 : 0; const insA = clamp((rep - 0.5) / 0.5, 0, 1);
  // ruggengraten
  const rug = (yfn, kl, from, to) => { ctx.strokeStyle = kl; ctx.lineWidth = ruggW; ctx.beginPath(); for (let i = from; i <= to; i += 0.25) { const xx = X(i) + dx(i), yy = yfn(i); i === from ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); };
  const brk = knip > 0.5 ? knipI : 99;
  rug(yTop, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(yTop, D2.oud, brk + 0.15, nTot + i0 - 1);
  rug(() => yB, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(() => yB, D2.oud, brk + 0.15, nTot + i0 - 1);
  for (let i = i0; i < i0 + nTot; i++) { const b = seqT[i - i0], xx = X(i) + dx(i), gepaard = bol(i) < 0.2;
    const isPam = i >= 20 && i <= 22; const rand = isPam && pam > 0.3 ? C.goud : null;
    d2Base(ctx, xx, yTop(i), gepaard ? Math.PI / 2 : -Math.PI / 2 * 0 + Math.PI / 2 - bol(i) * Math.PI, b, L * s, hw, { rand, letter: s >= 2.2 });
    d2Base(ctx, xx, yB, -Math.PI / 2, comp[b], L * s, hw, { letter: s >= 2.2 }); }
  // reparatie: 'uit' = kleine deletie (koraal merkteken op de naad), 'nieuw' = goud stuk ertussen
  if (rep > 0.5 && reparatie === 'nieuw') { ctx.save(); ctx.globalAlpha *= insA; ctx.strokeStyle = C.goud; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (rep > 0.5 && reparatie === 'uit') { ctx.save(); ctx.globalAlpha *= clamp((rep - 0.5) / 0.5, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (knip > 0.01 && rep < 0.6) { ctx.save(); ctx.globalAlpha *= Math.sin(knip * Math.PI) * 0.7 + (knip >= 1 ? 0.3 * (1 - rep / 0.6) : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const yy of [yT, yB]) { ctx.beginPath(); ctx.arc(X(knipI), yy, 7 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  // gids-RNA: vóór het openen een slap draadje in de herkenningslob; in de R-lus 20 RNA-basen op de doelstreng (paren)
  ctx.save(); ctx.globalAlpha *= casA; const gx0 = casX - 10 * bp * s, rnaK = D2.rna || C.teal, uB = (b) => b === 'T' ? 'U' : b;
  const gp = []; for (let i = 0; i <= 19; i++) { const gep = ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (rep > 0.2 ? 0 : 1); gp.push([gx0 + i * bp * s, lerp(casY - 62 * s + Math.sin(i * 0.8 + t) * 3 * s, yT, gep), gep]); }
  ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, gp.map(p => [p[0], p[1]]), false); ctx.stroke();
  gp.forEach((p, i) => { if (p[2] > 0.5) d2Base(ctx, p[0], p[1], Math.PI / 2, uB(seqT[i - i0]), L * s, hw, { rna: true, letter: s >= 2.2, a: (p[2] - 0.5) * 2 });
    else if (s >= 2) { ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0], p[1] + 5 * s); ctx.stroke(); } });
  const e = gp[19]; ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, [[e[0], e[1]], [e[0] + 10 * s, e[1] - 16 * s], [e[0] + 2 * s, casY - 66 * s], [e[0] - 20 * s, casY - 76 * s], [e[0] - 6 * s, casY - 88 * s], [e[0] + 18 * s, casY - 80 * s], [e[0] + 24 * s, casY - 60 * s]], false); ctx.stroke(); // steiger met haarspelden
  ctx.restore();
  // PAM-domein vóór het DNA langs (brug die de klem sluit), naast de PAM; actieve plekken HNH (onder) en RuvC (boven) goud
  _grKluwen(ctx, casX, casY, (px, py) => ((px - 57) / 13) ** 2 + ((py + 12) / 50) ** 2 < 1, { r: 3.2, sc: s, col: '#6E8FA8', seed: 7, bbox: [44, -62, 70, 38], key: 'casPI', a: casA * 0.9 });
  [[casX + (knipI - 10) * bp * s, casY + 22 * s], [casX + (knipI - 10) * bp * s, casY - 56 * s]].forEach(p => { ctx.save(); ctx.globalAlpha *= casA; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 3.5 * s, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.restore(); return ret;
}

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
//  Eiwit = keten die gevouwen is (BEELDAFSPRAKEN), hier als lint (cartoon: voorste stukken breed en licht,
//  achterste smal en donker) binnen het doorschijnende oppervlak van de twee lobben; nooit een schaar of bol. Gids-RNA dun en teal (RNA), DNA paars.
//  Bekende fouten: Cas9 als schaar; één streng geknipt; knip in de PAM; gids-RNA dat paart met beide strengen.
// x, y = midden van de doelplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..4, o.reparatie,
// o.t, o.a. Geeft { cas9, pam, knip, gids, rec, nuc } terug.
// =====================================================================================
// --- eiwitketen-hulpjes (alleen voor dit object): een kluwen uit een doorlopende keten met helices (3,6 kralen per
// winding) en gestrekte stukken, gevouwen binnen een ellips; z = diepte (voor/achter) voor licht en dikte.
function _casPad(cx, cy, rx, ry, n, seed, rot = 0) { const P = [], rh = Math.min(rx, ry) * 0.13, c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) { const u = i / n * 6.283, hel = Math.floor(i / 9 + seed) % 3 !== 2;
    let px = rx * (0.78 * Math.sin(3 * u + seed) + 0.12 * Math.sin(7 * u + seed * 2)), py = ry * (0.78 * Math.sin(4 * u + seed * 0.7) + 0.12 * Math.cos(9 * u)), pz = Math.cos(3 * u + seed) * 0.6 + Math.sin(5 * u) * 0.4;
    if (hel) { const ph = i * 1.745; px += Math.cos(ph) * rh; py += Math.sin(ph) * rh * 0.55; pz += Math.sin(ph) * 0.5; }
    P.push([cx + px * c - py * s, cy + px * s + py * c, pz]); } return P; }
function _casKralen(ctx, P, r, kleur, o = {}) { const { hl = null } = o; ctx.strokeStyle = lighten(kleur, 0.35); ctx.lineWidth = Math.max(1, r * 0.45); ctx.beginPath(); bioPad(ctx, P.map(p => [p[0], p[1]]), false); ctx.stroke();
  P.map((p, i) => i).sort((A, B) => P[A][2] - P[B][2]).forEach(i => { const p = P[i], d = (p[2] + 1) / 2; ctx.fillStyle = d > 0.5 ? lighten(kleur, 0.12 * d) : kleur; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.82 + 0.25 * d), 0, 6.283); ctx.fill(); ctx.strokeStyle = rgba(C.bgMicro, 0.35); ctx.lineWidth = 1; ctx.stroke(); }); }
function _casLint(ctx, P, w, kleur, o = {}) { // cartoon: achterste stukken smal en donker, voorste breed en licht
  const seg = (voor) => { for (let i = 1; i < P.length; i++) { const z = (P[i][2] + P[i - 1][2]) / 2; if ((z >= 0) !== voor) continue; ctx.strokeStyle = voor ? lighten(kleur, 0.18 + 0.2 * z) : _mixHex(kleur, '#121A26', 0.35); ctx.lineWidth = voor ? w * (0.75 + 0.35 * z) : w * 0.5;
      ctx.beginPath(); const a0 = P[Math.max(0, i - 2)], a1 = P[i - 1], b1 = P[i]; ctx.moveTo((a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2); ctx.quadraticCurveTo(a1[0], a1[1], (a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2); ctx.stroke(); } };
  ctx.lineCap = 'round'; seg(false); seg(true); }
function crisprCas9(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 0, t = 0, reparatie = 'uit' } = o; const st = clamp(stap, 0, 4);
  const zoek = clamp(st, 0, 1), pam = clamp(st - 1, 0, 1), open = clamp(st - 2, 0, 1), knip = clamp((st - 2.75) / 0.25, 0, 1), rep = clamp(st - 3, 0, 1);
  const bp = 3.4, L = 10, nTot = 44, i0 = -14; // basen −14 … 29; doelplek 0–19, PAM 20–22 (NGG op de bovenstreng)
  const X = (i) => x + (i - 10) * bp * s, yT = y - L * s, yB = y + L * s;
  const seqT = 'TTCAGGACTACCGAGTTCATGGTACAGCTTGGAGCCGATTCAGT', comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const casX = lerp(-150, 0, ease(zoek)) * s * (st < 1 ? 1 : 0) + x, casY = y - lerp(0, 140, ease(rep)) * s, casA = 1 - ease(rep) * 0.85;
  const knipI = 16.5; // knip 3 bp vóór de PAM: stompe knip in beide strengen (HNH: doelstreng, RuvC: andere streng)
  const uit = ease(rep) * 1.6 * bp * s; // na de knip wijken de uiteinden even uiteen
  const ret = { cas9: [casX, casY], pam: [X(21), yT - L * s * 1.4], knip: [X(knipI), y], gids: [X(6), yB + L * s * 1.6], rec: [casX, y - 75 * s], nuc: [casX, y + 72 * s] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hw = bp * s * 0.34, ruggW = Math.max(2.5, bp * s * 0.35);
  // DNA: bovenstreng (5′→3′, met PAM) en doelstreng. In de open stand buigt de bovenstreng omhoog weg (R-lus).
  const bol = (i) => (i >= 0 && i <= 19) ? Math.sin(clamp((i + 0.5) / 20, 0, 1) * Math.PI) * 0 + (open > 0 ? ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) : 0) : 0;
  const yTop = (i) => yT - bol(i) * L * s * 3.2 * Math.sin(clamp((i + 1) / 21, 0, 1) * Math.PI) ;
  const dx = (i) => (i > knipI ? uit : 0) * (rep > 0 ? 1 : 0);
  const ins = reparatie === 'nieuw' && rep > 0.5 ? 6 : 0; const insA = clamp((rep - 0.5) / 0.5, 0, 1);
  // ruggengraten
  const rug = (yfn, kl, from, to) => { ctx.strokeStyle = kl; ctx.lineWidth = ruggW; ctx.beginPath(); for (let i = from; i <= to; i += 0.25) { const xx = X(i) + dx(i), yy = yfn(i); i === from ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); };
  const brk = knip > 0.5 ? knipI : 99;
  rug(yTop, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(yTop, D2.oud, brk + 0.15, nTot + i0 - 1);
  rug(() => yB, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(() => yB, D2.oud, brk + 0.15, nTot + i0 - 1);
  for (let i = i0; i < i0 + nTot; i++) { const b = seqT[i - i0], xx = X(i) + dx(i), gepaard = bol(i) < 0.2;
    const isPam = i >= 20 && i <= 22; const rand = isPam && pam > 0.3 ? C.goud : null;
    d2Base(ctx, xx, yTop(i), gepaard ? Math.PI / 2 : -Math.PI / 2 * 0 + Math.PI / 2 - bol(i) * Math.PI, b, L * s, hw, { rand, letter: s >= 2.5 });
    d2Base(ctx, xx, yB, -Math.PI / 2, comp[b], L * s, hw, { letter: s >= 2.5 }); }
  // reparatie: 'uit' = kleine deletie (koraal merkteken op de naad), 'nieuw' = goud stuk ertussen
  if (rep > 0.5 && reparatie === 'nieuw') { ctx.save(); ctx.globalAlpha *= insA; ctx.strokeStyle = C.goud; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (rep > 0.5 && reparatie === 'uit') { ctx.save(); ctx.globalAlpha *= clamp((rep - 0.5) / 0.5, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (knip > 0.01 && rep < 0.6) { ctx.save(); ctx.globalAlpha *= Math.sin(knip * Math.PI) * 0.7 + (knip >= 1 ? 0.3 * (1 - rep / 0.6) : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const yy of [yT, yB]) { ctx.beginPath(); ctx.arc(X(knipI), yy, 7 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  // gids-RNA (teal, dun): spacer van 20 nt; vóór het openen in de groef, daarna gepaard met de doelstreng (RNA–DNA)
  ctx.save(); ctx.globalAlpha *= casA; const gx0 = casX - 10 * bp * s; ctx.strokeStyle = D2.rna || C.teal; ctx.lineWidth = Math.max(1.5, ruggW * 0.6);
  const gp = []; for (let i = 0; i <= 19; i++) { const gepaard = ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (rep > 0.2 ? 0 : 1); gp.push([gx0 + i * bp * s, lerp(y - L * s * 0.2 + Math.sin(i * 0.8 + t) * 2 * s, yB - L * s * 1.0 - 4, gepaard)]); }
  ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (s >= 2.5) gp.forEach((p, i) => { ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0], p[1] + 5 * s); ctx.stroke(); });
  const e = gp[19]; ctx.strokeStyle = D2.rna || C.teal; ctx.lineWidth = Math.max(1.5, ruggW * 0.6); ctx.beginPath(); bioPad(ctx, [e, [e[0] + 14 * s, e[1] - 10 * s], [e[0] + 6 * s, e[1] - 40 * s], [e[0] - 18 * s, e[1] - 52 * s], [e[0] - 4 * s, e[1] - 70 * s], [e[0] + 22 * s, e[1] - 60 * s], [e[0] + 30 * s, e[1] - 34 * s]], false); ctx.stroke(); // steiger met haarspelden
  ctx.restore();
  // Cas9: twee lobben (herkenningslob boven, nucleaselob onder) uit één keten, PAM-domein rechts onder
  ctx.save(); ctx.globalAlpha *= casA * 0.92;
  const dom = (pts) => pts.reduce((acc, [dx2, dy2, r2, sd]) => acc.concat(_casPad(casX + dx2 * s, y + dy2 * s, r2 * s, r2 * 0.8 * s, 30, sd)), []);
  const R1 = dom([[-32, -40, 17, 0.6], [-2, -50, 19, 1.7], [28, -38, 16, 2.9]]), R2 = dom([[-30, 38, 17, 3.3], [4, 46, 19, 0.9], [34, 34, 15, 2.2]]), PI = _casPad(casX + 56 * s, y + 14 * s, 11 * s, 10 * s, 18, 4.0);
  // oppervlak van de twee lobben (doorschijnend), met de groef ertussen open
  for (const [cx2, cy2, rx2, ry2] of [[casX - 2 * s, y - 44 * s, 56 * s, 26 * s], [casX + 2 * s, y + 41 * s, 58 * s, 24 * s], [casX + 56 * s, y + 14 * s, 15 * s, 14 * s]]) { ctx.beginPath(); const hp = []; for (let k = 0; k < 16; k++) { const u = k / 16 * 6.283; hp.push([cx2 + Math.cos(u) * rx2 * (1 + 0.06 * Math.sin(u * 3 + cx2)), cy2 + Math.sin(u) * ry2 * (1 + 0.06 * Math.cos(u * 4))]); } bioPad(ctx, hp, true); ctx.fillStyle = rgba(C.enzym, 0.22); ctx.fill(); ctx.strokeStyle = rgba(lighten(C.enzym, 0.3), 0.5); ctx.lineWidth = 1.5; ctx.stroke(); }
  _casLint(ctx, R1, Math.max(1.5, 3 * s), '#8E9FBC'); _casLint(ctx, R2, Math.max(1.5, 3 * s), C.enzym); _casLint(ctx, PI, Math.max(1.5, 3 * s), '#6E8FA8');
  [[casX + (knipI - 10) * bp * s, yB + 18 * s], [casX + (knipI - 10) * bp * s, yT - 18 * s]].forEach(p => { ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 4 * s, 0, 6.283); ctx.fill(); });
  ctx.restore();
  ctx.restore(); return ret;
}

// CRISPR-CAS9, verbeterronde 2 eiwitten (28 okt 2026): Cas9 (herkenningslob, nucleaselob en PAM-domein) is nu een gevouwen
// kralenketen (_kkKluwen, eiwitten/_hulp.js) in plaats van het lintmodel; vorm, plaats, grootte, stappen, DNA, gids-RNA en
// aanroep ongewijzigd. Recept (zie het receptcommentaar in lib_bio.js, ronde 2: Jinek e.a. 2012; Nishimasu e.a. 2014):
//  Cas9 ± 10 nm, DNA 2 nm breed, 0,34 nm per basepaar; spacer van het gids-RNA 20 nt; PAM = NGG, stompe knip 3 bp vóór de PAM.
//  Stappen: o.stap 0–1 zoeken, 1–2 PAM (goud omrand), 2–3 openen (R-lus) en knippen (2,75–3), 3–4 loslaten en reparatie
//  ('uit' = kleine fout bij het plakken, koraal; 'nieuw' = nieuw stuk, goud).
//  Eiwit = één gevouwen keten als kralen. Cas9 KLEMT om het DNA: herkenningslob achter/boven, nucleaselob achter/onder,
//  PAM-domein vóór het DNA langs naast de PAM (brug). Gids-RNA teal.
//  Bekende fouten: Cas9 als schaar; één streng geknipt; knip in de PAM; gids-RNA dat paart met beide strengen; lint.
// x, y = midden van de doelplek op het DNA; s = px per 0,1 nm. o.stap 0..4, o.reparatie, o.t, o.a. Geeft { cas9, pam, knip, gids, rec, nuc } terug.
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
  const lob = (bb, ry, kl, seed, key) => _kkKluwen(ctx, casX, casY, (px, py) => (px / 64) * (px / 64) + (py / ry) * (py / ry) < 1 && (py < -52 || py > 17), { r: 3.2, sc: s, col: kl, seed, bbox: bb, key, a: casA * 0.95 });
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
  _kkKluwen(ctx, casX, casY, (px, py) => ((px - 57) / 13) ** 2 + ((py + 12) / 50) ** 2 < 1, { r: 3.2, sc: s, col: '#6E8FA8', seed: 7, bbox: [44, -62, 70, 38], key: 'casPI', a: casA * 0.9 });
  [[casX + (knipI - 10) * bp * s, casY + 22 * s], [casX + (knipI - 10) * bp * s, casY - 56 * s]].forEach(p => { ctx.save(); ctx.globalAlpha *= casA; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 3.5 * s, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.restore(); return ret;
}

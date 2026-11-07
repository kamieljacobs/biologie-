// =====================================================================================
// CODONTABEL als CODONZON (rond). Recept (OpenStax Biology 2e § 15.1; Suza & Lee, appendix 1 'Codon table'): 64 codons
// van drie mRNA-basen. Je leest van binnen naar buiten: binnenste ring = eerste base (4 vakken), middelste ring = tweede
// base (16), buitenste ring = derde base (64), daarbuiten het aminozuur. Codons die hetzelfde aminozuur geven liggen naast
// elkaar en delen één boog (de code is gedegenereerd, meestal in de derde base). AUG = start (groen), UAA/UAG/UGA = stop (koraal).
//  - zelfde betekenis als het rooster (codonTabel): basen in de RNA-tinten, U (geen T), drieletterafkortingen zoals BiNaS.
//  - leespad (o.codon + o.pad 0..1): de drie vakken lichten één voor één goud op van binnen naar buiten, dan het aminozuur.
// Bekende fouten: ringen in de verkeerde volgorde (derde base binnen); stopcodons niet gemarkeerd; T in plaats van U.
// (x, y) = linksboven van het vierkant (± 770 × 770 px bij s = 1; middelpunt op x + 385·s, y + 385·s); zelfde opties als het rooster.
// Geeft {celVan(codon) → [x, y] in de buitenste ring, cel, aa: [x, y] van het gekozen codon}.
// =====================================================================================
const CODE_B = 'UCAG';
const CODE_AA = (() => { const s = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG', d = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
  const m = {}; let i = 0; for (const a of CODE_B) for (const b of CODE_B) for (const c of CODE_B) m[a + b + c] = d[s[i++]]; return m; })();
const _cdRNA = { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, _cdRNAL = { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
function _czSector(ctx, cx, cy, r0, r1, a0, a1) { ctx.beginPath(); ctx.arc(cx, cy, r1, a0, a1); ctx.arc(cx, cy, r0, a1, a0, true); ctx.closePath(); }
function codonTabel(ctx, x, y, s = 1, o = {}) {
  const { a = 1, codon = null, pad = 1, hl = {}, dim = false, start = true, stop = true, namen = null } = o; if (a <= 0.01) return {};
  const cx = x + 385 * s, cy = y + 385 * s, R = [62, 142, 236, 298].map(v => v * s), RL = 308 * s, out = { cel: null, aa: null }, A0 = -Math.PI / 2, da = 6.283 / 64;
  const ang = (i, j, k) => A0 + (i * 16 + j * 4 + k) * da; // begin van het vak in de buitenste ring
  const p = [0, 1, 2, 3].map(q => codon ? ease(clamp(pad * 4 - q, 0, 1)) : 0);
  const ri = codon ? CODE_B.indexOf(codon[0]) : -1, ci = codon ? CODE_B.indexOf(codon[1]) : -1, ki = codon ? CODE_B.indexOf(codon[2]) : -1;
  ctx.save(); ctx.globalAlpha *= a;
  _bioCirc(ctx, cx, cy, R[0], C.fill, rgba(C.line, 0.5), 1); metaText(ctx, 'start', cx, cy + 8 * s, C.text2, 'center', 18 * s);
  const ring = (lvl, idx, b, a0, a1, kies) => { _czSector(ctx, cx, cy, R[lvl] + 1.5 * s, R[lvl + 1] - 1.5 * s, a0 + 0.004, a1 - 0.004); shape(ctx, _cdRNA[b], kies ? C.goud : lighten(_cdRNA[b], 0.25), kies ? 3.5 * s : 1);
    const am = (a0 + a1) / 2, rm = (R[lvl] + R[lvl + 1]) / 2, fs = lvl === 2 ? 21 * s : lvl === 1 ? 30 * s : 42 * s;
    ctx.save(); ctx.translate(cx + Math.cos(am) * rm, cy + Math.sin(am) * rm); ctx.rotate(am + Math.PI / 2 + (Math.sin(am) > 0.05 ? Math.PI : 0)); text(ctx, b, 0, fs * 0.36, fTekst(fs, 700), _cdRNAL[b], 'center'); ctx.restore(); };
  for (let i = 0; i < 4; i++) { ring(0, i, CODE_B[i], ang(i, 0, 0), ang(i + 1, 0, 0), i === ri && p[0] > 0.5);
    for (let j = 0; j < 4; j++) { ring(1, j, CODE_B[j], ang(i, j, 0), ang(i, j + 1, 0), i === ri && j === ci && p[1] > 0.5);
      for (let k = 0; k < 4; k++) ring(2, k, CODE_B[k], ang(i, j, k), ang(i, j, k + 1), i === ri && j === ci && k === ki && p[2] > 0.5); } }
  // aminozuren: aaneengesloten codons met hetzelfde aminozuur delen één boog buiten de ring
  const lijst = []; for (const a1 of CODE_B) for (const b of CODE_B) for (const c of CODE_B) lijst.push(a1 + b + c);
  let g0 = 0; for (let q = 1; q <= 64; q++) { if (q < 64 && CODE_AA[lijst[q]] === CODE_AA[lijst[g0]] && Math.floor(q / 4) === Math.floor(g0 / 4)) continue;
    const aa = CODE_AA[lijst[g0]], a0 = A0 + g0 * da, a1 = A0 + q * da, am = (a0 + a1) / 2, isSp = stop && aa === 'stop', bevat = lijst.slice(g0, q), isSt = start && bevat.includes('AUG'), kies = codon && bevat.includes(codon) && p[3] > 0.01;
    const dimmen = dim && !kies && !bevat.some(c => hl[c]); const kl = isSp ? C.koraal : isSt ? C.groen : C.text2;
    ctx.save(); if (dimmen) ctx.globalAlpha *= 0.35; ctx.strokeStyle = kies ? C.goud : rgba(kl, 0.8); ctx.lineWidth = (kies ? 5 : 3) * s; ctx.beginPath(); ctx.arc(cx, cy, RL, a0 + 0.02, a1 - 0.02); ctx.stroke();
    const naam = namen && namen[aa] ? namen[aa] : aa, fs = 21 * s, tr = RL + 10 * s; ctx.translate(cx + Math.cos(am) * tr, cy + Math.sin(am) * tr); const links = Math.cos(am) < 0; ctx.rotate(links ? am + Math.PI : am);
    text(ctx, isSt ? 'Met·start' : naam, links ? -4 * s : 4 * s, fs * 0.35, fTekst(fs, isSp || isSt || kies ? 700 : 400), kies ? C.goud : kl, links ? 'right' : 'left'); ctx.restore();
    if (kies) out.aa = [cx + Math.cos(am) * (RL + 50 * s), cy + Math.sin(am) * (RL + 50 * s)];
    g0 = q; }
  if (codon) { const am = ang(ri, ci, ki) + da / 2; out.cel = [cx + Math.cos(am) * (R[2] + R[3]) / 2, cy + Math.sin(am) * (R[2] + R[3]) / 2];
    if (p[3] > 0.01) { ctx.save(); ctx.globalAlpha *= p[3]; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.setLineDash([6 * s, 5 * s]); ctx.beginPath(); ctx.moveTo(cx + Math.cos(am) * R[0], cy + Math.sin(am) * R[0]); ctx.lineTo(cx + Math.cos(am) * (RL - 4 * s), cy + Math.sin(am) * (RL - 4 * s)); ctx.stroke(); ctx.restore(); } }
  if (hl) Object.keys(hl).forEach(cod => { const i = CODE_B.indexOf(cod[0]), j = CODE_B.indexOf(cod[1]), k = CODE_B.indexOf(cod[2]); _czSector(ctx, cx, cy, R[2], R[3], ang(i, j, k), ang(i, j, k + 1)); ctx.strokeStyle = hl[cod]; ctx.lineWidth = 3 * s; ctx.stroke(); });
  out.celVan = (cod) => { const i = CODE_B.indexOf(cod[0]), j = CODE_B.indexOf(cod[1]), k = CODE_B.indexOf(cod[2]), am = ang(i, j, k) + da / 2; return [cx + Math.cos(am) * (R[2] + R[3]) / 2, cy + Math.sin(am) * (R[2] + R[3]) / 2]; };
  ctx.restore(); return out;
}

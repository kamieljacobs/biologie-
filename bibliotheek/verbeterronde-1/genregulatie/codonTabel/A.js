// =====================================================================================
// CODONTABEL (rooster 4 × 4). Recept (OpenStax Biology 2e § 15.1; Suza & Lee, Genetics, Agriculture and Biotechnology,
// appendix 1 'Codon table'): 64 codons van drie basen in het mRNA. Rijen = eerste base (U C A G, links), kolommen = tweede
// base (boven), in elk vak vier codons die alleen in de derde base verschillen (rechts U C A G). 61 codons coderen voor een
// aminozuur, de code is gedegenereerd (meestal verschilt alleen de derde base); AUG = start (methionine), UAA, UAG, UGA = stop.
//  - aflezen is een pad: eerst de rij van de eerste base, dan de kolom van de tweede, dan de regel van de derde (o.pad 0..1).
//  - basen als tegeltjes in de RNA-tinten (C1: RNA teal, U = RNA, geen T); start groen omrand, stop koraal.
//  - aminozuren als drieletterafkorting zoals in BiNaS (Phe, Leu …); o.namen = {Phe: 'fenylalanine', …} vervangt ze.
// Bekende fouten: T in plaats van U; derde base als kolom; stopcodons zonder markering; codon zonder zichtbaar leespad.
// (x, y) = linksboven; s = schaal (± 1030 × 770 px bij s = 1). o.codon = 'AUG' + o.pad 0..1 = leespad; o.hl = {codon: kleur};
// o.dim = andere vakken gedimd; o.start/o.stop (standaard aan). Geeft {celVan(codon) → [x, y], cel, aa: [x, y] van het gekozen codon}.
// =====================================================================================
const CODE_B = 'UCAG';
const CODE_AA = (() => { const s = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG', d = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
  const m = {}; let i = 0; for (const a of CODE_B) for (const b of CODE_B) for (const c of CODE_B) m[a + b + c] = d[s[i++]]; return m; })();
const _cdRNA = { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, _cdRNAL = { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
function _cdTegel(ctx, x, y, b, w, h, s, a = 1, rand = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 7 * s); shape(ctx, _cdRNA[b], rand || lighten(_cdRNA[b], 0.3), rand ? 3 : 1.2);
  text(ctx, b, x, y + h * 0.27, fTekst(h * 0.74, 700), _cdRNAL[b], 'center'); ctx.restore(); }
function codonTabel(ctx, x, y, s = 1, o = {}) {
  const { a = 1, codon = null, pad = 1, hl = {}, dim = false, start = true, stop = true, namen = null } = o; if (a <= 0.01) return {};
  const cw = 230 * s, lh = 40 * s, ph = lh * 4 + 14 * s, X0 = x + 60 * s, Y0 = y + 70 * s, out = { cel: null, aa: null };
  const p1 = codon ? ease(clamp(pad * 3, 0, 1)) : 0, p2 = codon ? ease(clamp(pad * 3 - 1, 0, 1)) : 0, p3 = codon ? ease(clamp(pad * 3 - 2, 0, 1)) : 0;
  const ri = codon ? CODE_B.indexOf(codon[0]) : -1, ci = codon ? CODE_B.indexOf(codon[1]) : -1, ki = codon ? CODE_B.indexOf(codon[2]) : -1;
  ctx.save(); ctx.globalAlpha *= a;
  // leespad: rij (eerste base) en kolom (tweede base) als zachte gouden banen
  if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= 0.22 * p1; roundRect(ctx, x + 4 * s, Y0 + ri * ph, (60 * s - 4 * s) + cw * 4 * p1 + 50 * s * p1, ph, 12 * s); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= 0.22 * p2; roundRect(ctx, X0 + ci * cw, y + 30 * s, cw, (Y0 - y - 30 * s) + ph * 4 * p2, 12 * s); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  metaText(ctx, '2e base', X0 + cw * 2, y + 14 * s, C.text2, 'center', 22 * s); metaText(ctx, '1e', x + 28 * s, y + 14 * s, C.text2, 'center', 22 * s); metaText(ctx, '3e', X0 + cw * 4 + 26 * s, y + 14 * s, C.text2, 'center', 22 * s);
  for (let j = 0; j < 4; j++) _cdTegel(ctx, X0 + cw * j + cw / 2, y + 48 * s, CODE_B[j], 40 * s, 34 * s, s, 1, j === ci && p2 > 0.5 ? C.goud : null);
  for (let i = 0; i < 4; i++) { const yy = Y0 + i * ph; _cdTegel(ctx, x + 28 * s, yy + ph / 2, CODE_B[i], 40 * s, 34 * s, s, 1, i === ri && p1 > 0.5 ? C.goud : null);
    for (let j = 0; j < 4; j++) { const xx = X0 + cw * j; roundRect(ctx, xx + 4 * s, yy + 4 * s, cw - 8 * s, ph - 8 * s, 10 * s); shape(ctx, rgba(C.fill, 0.92), rgba(C.line, 0.45), 1);
      for (let k = 0; k < 4; k++) { const cod = CODE_B[i] + CODE_B[j] + CODE_B[k], aa = CODE_AA[cod], ly = yy + 11 * s + lh * k, isSt = start && cod === 'AUG', isSp = stop && aa === 'stop';
        const kies = codon === cod && p3 > 0.01, h = hl[cod], dimmen = dim && !kies && !h && !(codon && p3 > 0.5 && false);
        if (isSt) { roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); ctx.strokeStyle = C.groen; ctx.lineWidth = 2.5 * s; ctx.stroke(); }
        if (h) { roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); shape(ctx, rgba(h, 0.25), h, 2); }
        if (kies) { ctx.save(); ctx.globalAlpha *= p3; roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); shape(ctx, rgba(C.goud, 0.3), C.goud, 3 * s); ctx.restore(); out.cel = [xx + cw / 2, ly + lh / 2]; out.aa = [xx + cw - 26 * s, ly + lh / 2]; }
        ctx.save(); if (dimmen) ctx.globalAlpha *= 0.35;
        for (let q = 0; q < 3; q++) text(ctx, cod[q], xx + 28 * s + q * 21 * s, ly + lh * 0.7, fTekst(29 * s, 700), q === 2 ? lighten(_cdRNA[cod[2]], 0.25) : C.text, 'center');
        const naam = namen && namen[aa] ? namen[aa] : aa; text(ctx, naam, xx + cw - 22 * s, ly + lh * 0.7, fTekst(29 * s, isSp || isSt ? 700 : 400), isSp ? C.koraal : isSt ? C.groen : C.text2, 'right'); ctx.restore(); } }
    for (let k = 0; k < 4; k++) text(ctx, CODE_B[k], X0 + cw * 4 + 26 * s, yy + 11 * s + lh * k + lh * 0.7, fTekst(26 * s, 700), k === ki && p3 > 0.5 && i === ri ? C.goud : lighten(_cdRNA[CODE_B[k]], 0.25), 'center'); }
  out.celVan = (cod) => { const i = CODE_B.indexOf(cod[0]), j = CODE_B.indexOf(cod[1]), k = CODE_B.indexOf(cod[2]); return [X0 + cw * j + cw / 2, Y0 + i * ph + 11 * s + lh * k + lh / 2]; };
  ctx.restore(); return out;
}

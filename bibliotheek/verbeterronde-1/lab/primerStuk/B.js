// =====================================================================================
// PRIMER MET POLYMERASE: kort enkelstrengs stukje DNA (20 nt, goud) gebonden op de matrijs; DNA-polymerase
// (polymeraseAchter/-Voor uit deze bibliotheek) gaat op het 3′-uiteinde zitten en bouwt de nieuwe streng (lichtpaars).
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
function primerStuk(ctx, x, y, s, o = {}) {
  const { a = 1, bind = 1, matrijs = true, t = 0, bouw = 0 } = o;
  const seq = (o.seq || 'GACCTGAAGTCCATGGCTAC').slice(0, 30), n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const bp = 34 * s, L = 30 * s, hw = bp * 0.32, yM = y + 2 * L; // matrijs onder de primer
  const voor = 3, na = 7; // matrijsbasen links en rechts van de bindplek
  const ret = { vijf: [x, y], drie: [x + (n - 1) * bp, y], matrijs3: [x - voor * bp, yM] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const nNieuw = bind >= 1 ? Math.floor(clamp(bouw, 0, 1) * 7.999) : 0, xA = x + (n - 1 + nNieuw) * bp + bp * 0.5; ret.polymerase = [xA, y + L];
  if (bind >= 1 && bouw > 0.001) polymeraseAchter(ctx, xA, y + L, 2 * L, { dir: 1, up: 1 });
  if (matrijs) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; const P = [];
    for (let i = -voor; i < n + na; i++) P.push([x + i * bp, yM]);
    ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(P[0][0] - bp * 0.4, yM); ctx.lineTo(P[P.length - 1][0] + bp * 0.4, yM); ctx.stroke();
    for (let i = -voor; i < n + na; i++) d2Base(ctx, x + i * bp, yM, -Math.PI / 2, mseq[i + voor], L, hw);
    if (s > 0.5) { text(ctx, "3′", x - (voor + 0.9) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'right'); text(ctx, "5′", x + (n + na - 0.1) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'left'); } }
  // primer: elke base heeft een eigen moment van binden (rits van 3′ naar 5′)
  const pts = []; for (let i = 0; i < n; i++) { const k = clamp(bind * 1.6 - (n - 1 - i) / n * 0.6, 0, 1), e = ease(k);
    const losX = x + (n - 1) * bp * 0.5 + (i - (n - 1) / 2) * bp * 0.92, losY = y - 2.4 * L + Math.sin(i * 0.7 + t * 1.5) * L * 0.35 + Math.cos(i * 0.31) * L * 0.4;
    pts.push([lerp(losX, x + i * bp, e), lerp(losY, y, e), e]); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0], p[1]]), false); ctx.stroke();
  pts.forEach((p, i) => { const vrij = 1 - p[2]; const ang = Math.PI / 2 + vrij * (Math.sin(i * 1.3 + t) * 0.5); d2Base(ctx, p[0], p[1], ang, seq[i], L, hw, { plekA: 0 }); });
  if (nNieuw > 0) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(x + (n - 1) * bp, y); ctx.lineTo(x + (n - 1 + nNieuw) * bp + bp * 0.3, y); ctx.stroke();
    for (let j = 0; j < nNieuw; j++) d2Base(ctx, x + (n + j) * bp, y, Math.PI / 2, comp[mseq[voor + n + j]], L, hw); }
  if (bind >= 1 && bouw > 0.001) polymeraseVoor(ctx, xA, y + L, 2 * L, { dir: 1, up: 1, sluit: (bouw * 8) % 1 });
  if (s > 0.5) { const e0 = pts[0], e1 = pts[n - 1]; text(ctx, "5′", e0[0] - bp * 0.8, e0[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'right'); const xe = e1[0] + nNieuw * bp; if (!(bouw > 0.001)) text(ctx, "3′", xe + bp * 0.8, e1[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'left'); }
  ctx.restore(); return ret;
}

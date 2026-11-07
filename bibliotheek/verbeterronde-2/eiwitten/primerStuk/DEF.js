// PRIMER MET POLYMERASE, verbeterronde 2 eiwitten (28 okt 2026): de DNA-polymerase is nu een kralenketen (_psPolAchter /
// _psPolVoor hieronder, zelfde vorm, plaats en maat als polymeraseAchter/-Voor) in plaats van vlakke vormen. Primer, matrijs,
// basen, stappen en aanroep ongewijzigd. Zodra polymeraseAchter/-Voor in hun eigen ronde opnieuw ontworpen zijn, kan primerStuk
// weer die aanroepen (dan _psPolAchter/_psPolVoor schrappen).
// Recept: OpenStax Biology 2e § 17.1 (PCR: primers zijn korte stukjes DNA die complementair zijn aan de uiteinden van het
//  doelstuk) en § 14.3 (polymerase kan alleen verlengen aan een vrij 3′-uiteinde, dus het heeft een primer nodig). Een
//  PCR-primer is ± 18–25 nt; hij ligt antiparallel op de matrijs, met zijn 3′-kant naar het doelstuk toe. Basen in
//  puzzelvorm (d2Base), ruggengraat van de primer goud, van de matrijs paars. o.bouw 0..1: de polymerase klemt zich op het
//  3′-uiteinde van de primer en voegt nucleotiden toe die passen bij de matrijs, alleen 5′ → 3′ (naar rechts).
//  Bekende fouten: primer zo lang als het gen; primer parallel (5′ op 5′); basen die niet passen; primer als staafje; eiwit als vlek.
// x, y = 5′-uiteinde van de primer als hij gebonden is; s = schaal (1 = 34 px per base). o.bind 0..1, o.bouw 0..1, o.seq,
// o.t, o.a. Geeft { vijf, drie, matrijs3, polymerase } terug.
// --- polymerase voor primerStuk als kralenketen (alleen voor dit object; polymeraseAchter/-Voor zelf worden in een andere ronde
// opnieuw ontworpen). Zelfde 'rechterhand' als polymeraseAchter/-Voor (handpalm achter het DNA, duim, vingers die sluiten,
// onderkaak, schuifklem), zelfde plaats en maat (g = DNA-breedte), maar elk deel is een gevouwen kralenketen (_kkKluwen) op
// een zacht silhouet; de klem is een boog van kralen. Actief centrum goud.
function _psDeel(ctx, poly, g, col, seed, key, a = 1) { // poly in eenheden van g; kralen binnen de omtrek
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); bioPad(ctx, poly.map(([px, py]) => [px * g, py * g]), true); ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.55); ctx.fill();
  const V = _lintVorm(poly.map(([px, py]) => [px * 100, py * 100])); _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: g / 100, r: 7, col, seed, key }); ctx.restore(); }
function _psKlem(ctx, g, a0, a1, col) { const P = []; for (let k = 0; k <= 12; k++) { const u = lerp(a0, a1, k / 12); P.push([-1.45 * g + Math.cos(u) * 0.22 * g, Math.sin(u) * 0.9 * g]); } _kkPad(ctx, P, Math.max(2, g * 0.075), col, { stap: 2 }); }
function _psPolAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  _psDeel(ctx, [[-1.15, -0.2], [-0.95, 0.95], [-0.1, 1.25], [0.85, 1.05], [1.2, 0.2], [0.95, -0.95], [0.0, -1.2], [-0.9, -0.95]], g, D2.enzD, 3, 'psPalm', 0.6); // handpalm achter het DNA (donker)
  if (klem) _psKlem(ctx, g, Math.PI * 0.5, Math.PI * 1.5, '#8796B0');
  ctx.restore(); }
function _psPolVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const col = hl > 0.01 ? _mixHex(D2.enz, C.goud, hl * 0.6) : D2.enz;
  _psDeel(ctx, [[-1.05, 0.75], [-0.75, 1.22], [-0.2, 1.28], [0.05, 1.0], [-0.35, 0.78], [-0.8, 0.68]], g, col, 5, 'psDuim'); // duim
  ctx.save(); ctx.translate(0.3 * g, 1.0 * g); ctx.rotate(lerp(0.62, -0.06, ease(sluit))); _psDeel(ctx, [[0.0, 0.0], [0.2, 0.32], [0.75, 0.3], [1.0, 0.0], [0.85, -0.22], [0.35, -0.12]], g, col, 7, 'psVinger'); ctx.restore(); // vingers
  _psDeel(ctx, [[-0.9, -0.72], [-0.6, -1.18], [0.3, -1.22], [0.95, -0.95], [1.05, -0.68], [0.2, -0.74]], g, col, 9, 'psKaak'); // onderkaak
  const pk = lerp(0.3, 0.18, ease(sluit)); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.5 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, pk * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) _psKlem(ctx, g, -Math.PI * 0.5, Math.PI * 0.5, '#A4B2CA');
  ctx.restore(); }
function primerStuk(ctx, x, y, s, o = {}) {
  const { a = 1, bind = 1, matrijs = true, t = 0, bouw = 0 } = o;
  const seq = (o.seq || 'GACCTGAAGTCCATGGCTAC').slice(0, 30), n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const bp = 34 * s, L = 30 * s, hw = bp * 0.32, yM = y + 2 * L; // matrijs onder de primer
  const voor = 3, na = 7; // matrijsbasen links en rechts van de bindplek
  const ret = { vijf: [x, y], drie: [x + (n - 1) * bp, y], matrijs3: [x - voor * bp, yM] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const nNieuw = bind >= 1 ? Math.floor(clamp(bouw, 0, 1) * 7.999) : 0, xA = x + (n - 1 + nNieuw) * bp + bp * 0.5; ret.polymerase = [xA, y + L];
  if (bind >= 1 && bouw > 0.001) _psPolAchter(ctx, xA, y + L, 2 * L, { dir: 1, up: 1 });
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
  if (bind >= 1 && bouw > 0.001) _psPolVoor(ctx, xA, y + L, 2 * L, { dir: 1, up: 1, sluit: (bouw * 8) % 1 });
  if (s > 0.5) { const e0 = pts[0], e1 = pts[n - 1]; text(ctx, "5′", e0[0] - bp * 0.8, e0[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'right'); const xe = e1[0] + nNieuw * bp; if (!(bouw > 0.001)) text(ctx, "3′", xe + bp * 0.8, e1[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'left'); }
  ctx.restore(); return ret;
}

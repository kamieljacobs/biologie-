// ===================================================================================
// BASILOSAURUS (± 40–34 Mj), herstel 28 okt 2026 op de huidige versie (keuze 'gelijk'; lijf, slag en aanroep ongewijzigd).
// Recept: tot ± 18 m, lang palingachtig lijf, tanden, kleine borstvinnen en piepkleine achterpootjes die niet meer droegen.
// Fout die hersteld is: het achterpootje was een vinvormig lapje; het is een ECHT KLEIN POOTJE met dij, knie, onderbeen,
// voet en teentjes (NYIT: 'retained external hindlimbs with a functional knee and toes'; Live Science: 'a complete pelvis,
// leg bones, ankles and even toe bones', 'a well-formed knee joint'; Gingerich, Smith & Simons 1990, Science). Grootte
// ± 1/40 van het lijf (op schaal bijna onzichtbaar). o.poot = 1 kleurt het pootje goud (zoals voorheen).
// ===================================================================================
(function () { const d = ZW_DEF.basilosaurus; d.achter = d.achter.filter(([n]) => n !== 'poot'); d.voor = d.voor.filter(([n]) => n !== 'poot'); })();
function _basiPootje(ctx, B, d, goud) { const v = B.pr.vin.poot; if (!v) return; const s0 = v.s, d0 = v.d + 3, P = (ds, dd) => ZwPop.pt(B, s0 + ds, d0 + dd);
  const H = P(0, 0), K = P(7, -9), A = P(-1, -17), V = P(4, -21), kl = goud ? C.goud : d.pal.poot, rand = ZwPop.mixHex(kl, 0.35, '#1E2A3A');
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, c] of [[6.5, rand], [4.6, kl]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(...H); ctx.lineTo(...K); ctx.lineTo(...A); ctx.lineTo(...V); ctx.stroke(); }
  ctx.fillStyle = kl; ctx.beginPath(); ctx.arc(K[0], K[1], 2.8, 0, 6.283); ctx.fill(); // knie
  for (const [ds, dd] of [[4, -5], [6, -2], [6, 1.5]]) { const T = P(4 + ds, -21 + dd); ctx.strokeStyle = rand; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(...V); ctx.lineTo(...T); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.stroke(); } }
basilosaurus = function (ctx, x, y, s = 1, o = {}) { const d = ZW_DEF.basilosaurus; d.pal.goud = C.goud; if ((o.a ?? 1) <= 0.01) return;
  d.naLijf = function (c, B) { _basiPootje(c, B, d, (o.poot || 0) > 0.01); }; const r = ZwTeken.teken(d, ctx, x, y, s, o); d.naLijf = null; return r; };

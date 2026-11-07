// Scène verbeterronde 3 (alle drie de versies gelijk): DNA met ELKE base als één los staafje van dezelfde dikte, met een
// duidelijk spleetje ertussen (Kamiel ronde 2: 'sommige nucleotiden zijn dubbel zo dik?'). Nieuwe streng boven (bouwt naar
// rechts), matrijs onder; inkomende nucleotide (drie fosfaten) boven het actieve centrum.
function _r3Base(ctx, x, yVoet, dir, b, len, w) { ctx.fillStyle = DNA_BASE.base[b]; ctx.fillRect(x - w / 2, dir > 0 ? yVoet : yVoet - len, w, len); }
// inkomende nucleotide: zelfde staafje als de andere basen + stukje ruggengraat (suiker) + drie fosfaten (trifosfaat)
function _r3Nuc(ctx, x, y, b, len, w, bw, dx) { _r3Base(ctx, x, y + bw * 0.45, 1, b, len, w);
  ctx.lineCap = 'round'; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = bw; ctx.beginPath(); ctx.moveTo(x - dx * 0.3, y); ctx.lineTo(x + dx * 0.3, y); ctx.stroke();
  const r = Math.max(1.2, bw * 0.32); ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(1, r * 0.5); ctx.beginPath(); ctx.moveTo(x + dx * 0.3, y); ctx.lineTo(x + dx * 0.3 + r * 6.2, y - r * 2.4); ctx.stroke();
  for (let k = 0; k < 3; k++) _bioCirc(ctx, x + dx * 0.3 + r * (1.6 + k * 2.2), y - r * (0.6 + k * 0.9), r, D2.oud, D2.oudR, 1); }
function stuk(ctx, x0, x1, cy, G, xa, sluit) { const dx = G * 0.17, bw = Math.max(4, G * 0.14), w = Math.max(2, dx * 0.5), yT = cy - G / 2, yB = cy + G / 2, len = G / 2 - bw * 0.5 - Math.max(1, G * 0.02);
  const gp = G * 0.55; polymeraseAchter(ctx, xa, cy, gp, { dir: 1, up: 1 });
  // posities op een vast raster, de laatste nieuwe base precies vóór het actieve centrum
  const i0 = Math.ceil((x0 - xa) / dx), i1 = Math.floor((x1 - xa) / dx);
  for (let i = i0; i <= i1; i++) { const x = xa + i * dx, b = d2seq(i + 40); _r3Base(ctx, x, yB - bw * 0.45, -1, D2.comp[b], len, w); if (i < 0) _r3Base(ctx, x, yT + bw * 0.45, 1, b, len, w); }
  d2Rug(ctx, [[x0, yB], [x1, yB]], { kleur: D2.oud, bw }); d2Rug(ctx, [[x0, yT], [xa - dx * 0.5, yT]], { kleur: D2.nieuw, bw });
  // inkomende nucleotide: past op matrijsbase i = 0
  _r3Nuc(ctx, xa, yT - (1 - sluit) * G * 0.45, d2seq(40), len, w, bw, dx);
  polymeraseVoor(ctx, xa, cy, gp, { dir: 1, up: 1, sluit }); }
function scene(ctx){
  vak(ctx,40,40,1100,1000); ctx.save(); ctx.beginPath(); roundRect(ctx,40,40,1100,1000,18); ctx.clip(); stuk(ctx,60,1120,560,200,640,0.4); ctx.restore();
  vak(ctx,1180,40,700,470); ctx.save(); ctx.beginPath(); ctx.rect(1180,40,700,470); ctx.clip(); stuk(ctx,1190,1870,275,120,1560,0); ctx.restore();
  vak(ctx,1180,550,700,470); ctx.save(); ctx.beginPath(); ctx.rect(1180,550,700,470); ctx.clip(); stuk(ctx,1190,1870,785,120,1560,1); ctx.restore();
  stuk(ctx,1560,1860,1050,28,1750,0.5);
}

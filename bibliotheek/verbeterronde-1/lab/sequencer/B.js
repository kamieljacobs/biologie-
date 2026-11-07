// =====================================================================================
// SEQUENCER (nieuwe generatie): tafelapparaat met een stroomcel (flow cell) en een scherm waarop miljoenen korte
// stukjes (reads) worden gelezen en op een referentie worden gelegd; een plek waar veel reads een andere base
// hebben dan de referentie = een variant.
// Recept (OpenStax Biology 2e § 17.3 'whole-genome sequencing'; Bio-OER CUNY 'Sanger sequencing' voor de basis
//  van kleurgecodeerde basen): het DNA wordt in korte stukken geknipt, die tegelijk worden afgelezen; de computer
//  zoekt voor elke read de passende plek in een referentiegenoom ('mappen'); bij een variant hebben (bijna) alle
//  reads op die plek dezelfde afwijkende base, bij een leesfout maar één read. Apparaat ± 60 cm breed (≈).
//  Basekleuren vast in deze reeks: A groen, C teal, G goud, T koraal.
//  Bekende fouten: één lange read van het hele genoom; reads die niet overlappen; variant op basis van één read.
// x, y = linksonder van het apparaat; s = px per cm. o.fase 0..1 (reads stapelen zich op), o.scherm (bool:
// alleen het scherm groot), o.a. Geeft { apparaat, stroomcel, scherm, variant } terug.
// =====================================================================================
function sequencer(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0.7, scherm = false } = o; const K = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
  const ref = 'ATGCCTGAGGTCATTACGGATCCAGT', vPos = 13, vB = 'G';
  const W = 60, H = 52; const P = (px, py) => [x + px * s, y - py * s];
  const sx = scherm ? x : x + 30 * s, sy = scherm ? y - 40 * s : y - 34 * s, sw = scherm ? 60 * s : 26 * s, sh = scherm ? 40 * s : 16 * s;
  const ret = { apparaat: P(W / 2, H / 2), stroomcel: P(12, 22), scherm: [sx + sw / 2, sy + sh / 2], variant: [sx + sw * (vPos + 0.5) / ref.length, sy + sh * 0.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (!scherm) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    roundRect(ctx, 0, -H, W, H, 3); shape(ctx, '#3A4A66', '#5E7194', 0.4); ctx.fillStyle = '#4B5D7E'; ctx.fillRect(0, -H, W, 4);
    roundRect(ctx, 4, -26, 18, 6, 1); shape(ctx, '#0F1828', '#7A8BA8', 0.3); // sleuf stroomcel
    ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(6, -24.5, 14, 3); // stroomcel half in de sleuf
    ctx.fillStyle = '#2B384F'; ctx.fillRect(3, -2, 8, 2); ctx.fillRect(W - 11, -2, 8, 2); ctx.restore(); }
  // scherm met referentie en reads
  roundRect(ctx, sx, sy, sw, sh, Math.max(2, sw * 0.02)); shape(ctx, '#0F1828', '#5A6B88', 1.5);
  const n = ref.length, cw = sw * 0.94 / n, ox = sx + sw * 0.03, refY = sy + sh * 0.88, fs = Math.max(6, cw * 0.8);
  if (cw > 7) ref.split('').forEach((b, i) => text(ctx, b, ox + (i + 0.5) * cw, refY + fs * 0.35, fMeta(fs), b === ref[vPos] && i === vPos ? C.text : C.text2, 'center'));
  else { ctx.fillStyle = C.text2; ctx.fillRect(ox, refY - 1, n * cw, 2); }
  const rows = 9, rh = (sh * 0.78) / rows, toon = Math.round(fase * rows * 3);
  for (let k = 0; k < toon; k++) { const r = k % rows, kol = Math.floor(k / rows); const len = 6 + Math.floor(hash(k * 7 + 1) * 4), st = Math.floor(hash(k * 7 + 2) * (n - len)) ; const yy = sy + sh * 0.06 + r * rh;
    for (let i = st; i < st + len; i++) { let b = ref[i]; if (i === vPos && hash(k * 7 + 3) < 0.85) b = vB; if (i !== vPos && hash(k * 7 + i) < 0.012) b = 'T'; // zeldzame leesfout
      ctx.fillStyle = rgba(K[b], b === ref[i] ? 0.35 : 0.95); ctx.fillRect(ox + i * cw + 0.5, yy + kol * rh * 0.0, cw - 1, rh * 0.7); } }
  if (fase > 0.6) { ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, cw * 0.12); ctx.strokeRect(ox + vPos * cw - 1, sy + sh * 0.04, cw + 2, sh * 0.92); }
  ctx.restore(); return ret;
}

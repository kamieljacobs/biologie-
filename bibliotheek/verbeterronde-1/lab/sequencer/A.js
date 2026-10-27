// =====================================================================================
// SEQUENCER (Sanger-methode): kopieën van alle lengtes met een gekleurde stopbase, op lengte gesorteerd in een
// capillair, laser + detector lezen de kleur van de laatste base, het chromatogram groeit piek voor piek.
// Recept (Bio-OER CUNY 'Sanger sequencing of DNA'; OpenStax Biology 2e § 17.2–17.3): een beetje ddNTP (zonder
//  3′-OH) stopt de verlenging; elke ddNTP draagt een eigen fluorescente kleur; zo ontstaan kopieën van elke lengte;
//  capillaire elektroforese sorteert ze, de kortste komen eerst bij de detector; de laser laat de stopbase
//  oplichten; elke piek = één base, de hoogte = hoe zeker de aflezing is. Kleuren (vast in deze reeks, volgt de
//  gangbare kleurcode A groen, C blauw, G geel/zwart, T rood): A groen, C teal, G goud, T koraal.
//  Bekende fouten: alle kopieën even lang; de langste het eerst gelezen; de kleur zit op de eerste base;
//  een piekje per streng in plaats van per lengte.
// x, y = linksboven van het schema; s = schaal (1 ≈ 1500 × 560 px). o.fase 0..1 (0–0,3 kopieën verschijnen,
// 0,3–1 lopen en lezen), o.seq (gelezen volgorde), o.a. Geeft { kopieen, capillair, laser, chromatogram } terug.
// =====================================================================================
const SEQ_KLEUR = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
function sequencer(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0.6 } = o; const seq = (o.seq || 'GATTACAGCTAG').slice(0, 14), n = seq.length;
  const maakF = clamp(fase / 0.3, 0, 1), loopF = clamp((fase - 0.3) / 0.7, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { kopieen: P(230, 280), capillair: P(760, 280), laser: P(760, 470), chromatogram: P(1200, 300) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  // 1. kopieën van elke lengte (matrijs paars, nieuwe streng lichtpaars, gekleurde stopbase)
  const nt = 26, y0 = 40;
  for (let i = 0; i < n; i++) { const al = clamp(maakF * n - i, 0, 1); if (al <= 0) continue; const yy = y0 + i * 36;
    ctx.save(); ctx.globalAlpha *= al * (1 - 0.7 * loopF); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(20, yy); ctx.lineTo(20 + (i + 1) * nt, yy); ctx.stroke();
    ctx.fillStyle = SEQ_KLEUR[seq[i]]; ctx.beginPath(); ctx.arc(20 + (i + 1) * nt + 6, yy, 9, 0, 6.283); ctx.fill(); ctx.restore(); }
  // 2. capillair (verticaal), fragmenten lopen naar beneden; kortste het verst
  const cx = 760, cTop = 30, cBot = 470; ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.strokeRect(cx - 14, cTop, 28, cBot - cTop + 60); ctx.fillStyle = rgba(C.er, 0.08); ctx.fillRect(cx - 14, cTop, 28, cBot - cTop + 60);
  ctx.fillStyle = '#2B2F38'; ctx.fillRect(cx - 40, cTop - 18, 80, 14); // min-kant
  let gelezen = 0;
  for (let i = 0; i < n; i++) { const snel = 1.9 - i * 0.07, pos = cTop + 20 + loopF * snel * 520; if (pos > cBot + 10) { gelezen = Math.max(gelezen, i + 1); continue; }
    if (loopF > 0) { ctx.fillStyle = rgba(SEQ_KLEUR[seq[i]], 0.9); roundRect(ctx, cx - 10, pos - 3, 20, 6, 3); ctx.fill(); } }
  // laser + detector
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 140, cBot); ctx.lineTo(cx + 14, cBot); ctx.stroke(); roundRect(ctx, cx - 190, cBot - 22, 50, 44, 8); shape(ctx, '#3A4A66', '#5E7194', 2);
  roundRect(ctx, cx + 40, cBot - 26, 60, 52, 8); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx + 70, cBot, 12, '#0F1828', '#7A8BA8', 2);
  const nu = gelezen < n ? (cTop + 20 + loopF * (1.9 - gelezen * 0.07) * 520) : 0; if (gelezen < n && Math.abs(nu - cBot) < 22 && loopF > 0) circ(ctx, cx, cBot, 16, rgba(SEQ_KLEUR[seq[gelezen]], 0.6));
  // 3. chromatogram: piek per gelezen base
  const gx = 960, gw = 520, gy = 470, gh = 360; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  const dx = gw / (n + 1); for (const b of 'ACGT') { ctx.strokeStyle = SEQ_KLEUR[b]; ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= gw; px += 2) { let v = 0; for (let i = 0; i < gelezen; i++) if (seq[i] === b) { const h = 0.65 + 0.3 * hash(i * 3 + 1); v += h * Math.exp(-Math.pow((px - dx * (i + 1)) / (dx * 0.22), 2)); } const yy = gy - v * gh * 0.85; px ? ctx.lineTo(gx + px, yy) : ctx.moveTo(gx, yy); } ctx.stroke(); }
  for (let i = 0; i < gelezen; i++) text(ctx, seq[i], gx + dx * (i + 1), gy - gh - 8, fMeta(30), SEQ_KLEUR[seq[i]], 'center');
  ctx.restore(); return ret;
}

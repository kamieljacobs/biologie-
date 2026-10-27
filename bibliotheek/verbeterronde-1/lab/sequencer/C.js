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
//  Met o.soort 'ngs': tafelapparaat van de nieuwe generatie met stroomcel en een scherm vol korte reads op een
//  referentie; een variant = een kolom waar (bijna) alle reads dezelfde andere base hebben (boven de kolom de base),
//  een leesfout = één losse afwijking (OpenStax Biology 2e § 17.3 'whole-genome sequencing', ≈ voor de weergave).
// x, y = linksboven van het schema; s = schaal (1 ≈ 1500 × 560 px). o.fase 0..1 (0–0,3 kopieën verschijnen,
// 0,3–1 lopen en lezen), o.seq (gelezen volgorde), o.soort ('sanger' | 'ngs'; bij ngs: x, y = linksonder van het
// apparaat, s = px per cm, o.scherm), o.a. Geeft { kopieen, capillair, laser, chromatogram } (ngs: { apparaat, stroomcel, scherm, variant }) terug.
// =====================================================================================
const SEQ_KLEUR = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
function _seqNgs(ctx, x, y, s, o = {}) {
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
  if (fase > 0.6) { const fv = Math.max(8, cw * 0.95); text(ctx, vB, ox + (vPos + 0.5) * cw, sy - fv * 0.25, fMeta(fv), K[vB], 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, cw * 0.12); ctx.strokeRect(ox + vPos * cw - 1, sy + sh * 0.04, cw + 2, sh * 0.92); }
  ctx.restore(); return ret;
}
function sequencer(ctx, x, y, s, o = {}) {
  if (o.soort === 'ngs') return _seqNgs(ctx, x, y, s, o);
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
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx - 140, cBot); ctx.lineTo(cx + 30, cBot); ctx.stroke(); roundRect(ctx, cx - 230, cBot - 34, 90, 68, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx - 140, cBot, 7, C.koraal); // laser
  roundRect(ctx, cx + 30, cBot - 40, 100, 80, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx + 60, cBot, 20, '#0F1828', '#7A8BA8', 3); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 130, cBot); ctx.lineTo(cx + 200, cBot - 40); ctx.stroke(); // detector, signaal naar het chromatogram
  const nu = gelezen < n ? (cTop + 20 + loopF * (1.9 - gelezen * 0.07) * 520) : 0; if (gelezen < n && Math.abs(nu - cBot) < 22 && loopF > 0) circ(ctx, cx, cBot, 16, rgba(SEQ_KLEUR[seq[gelezen]], 0.6));
  // 3. chromatogram: piek per gelezen base
  const gx = 960, gw = 520, gy = 470, gh = 360; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  const dx = gw / (n + 1); for (const b of 'ACGT') { ctx.strokeStyle = SEQ_KLEUR[b]; ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= gw; px += 2) { let v = 0; for (let i = 0; i < gelezen; i++) if (seq[i] === b) { const h = 0.65 + 0.3 * hash(i * 3 + 1); v += h * Math.exp(-Math.pow((px - dx * (i + 1)) / (dx * 0.22), 2)); } const yy = gy - v * gh * 0.85; px ? ctx.lineTo(gx + px, yy) : ctx.moveTo(gx, yy); } ctx.stroke(); }
  for (let i = 0; i < gelezen; i++) text(ctx, seq[i], gx + dx * (i + 1), gy - gh - 8, fMeta(30), SEQ_KLEUR[seq[i]], 'center');
  ctx.restore(); return ret;
}

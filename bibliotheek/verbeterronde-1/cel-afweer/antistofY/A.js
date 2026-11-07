// =====================================================================================
// ANTISTOF (IgG) als Y van vier eiwitketens. Recept: twee identieke zware ketens (elk 4 domeinen: VH, CH1 in de arm;
// CH2, CH3 in de steel) en twee identieke lichte ketens (VL, CL), naast de zware keten in elke arm. Elk domein is een
// opgevouwen stuk keten (± 4 × 2,5 nm, ± 110 aminozuren). Arm (Fab) en steel (Fc) elk ± 7 nm lang, hele molecuul
// ± 15 nm breed; de armen draaien soepel in het scharnier (hoek tussen de armen ± 60–180°). Zwavelbruggen tussen de
// twee zware ketens in het scharnier en tussen zware en lichte keten. Variabele domeinen (toppen) vormen samen de
// bindplaats met een pasvorm op één epitoop; twee gelijke bindplaatsen per antistof. Suikerketen tussen de CH2-domeinen.
// Als B-celreceptor zit de steel met een staartje in het membraan. Verhouding: antistof ± 15 nm, virus ± 100 nm,
// bacterie ± 1000 nm (antistof dus heel klein; anders 'vergroot' melden).
// Bron: OpenStax Anatomy & Physiology 21.4; OpenStax/Lumen Biology 'Antibody Structure'. Bekende fouten: Y als drie
// streepjes; bindplaats aan de steel; armen star; antistof net zo groot als het virus.
// Aanroep: antistofY(ctx, x, y, s, o) — (x, y) = scharnier, s = 1 → ± 200 px hoog. o.ang = draaiing (0 = armen omhoog),
// o.open = halve hoek tussen de armen (rad, standaard 0.7), o.buig = extra wiebel per arm [l, r], o.k = pasvorm (0–3),
// o.bind = [0..1, 0..1] antigeen in de bindplaats, o.agCol, o.op = 'vrij' | 'bcel' (staart in het membraan), o.hl.
// Geeft { tips: [[x,y],[x,y]], richt: [hoek, hoek], voet: [x,y], scharnier: [x,y] } terug (schermcoördinaten).
// =====================================================================================
const _AY = { zwaar: '#C99A2E', licht: '#EBCB72', varZ: '#E9C25A', varL: '#F4DE9C', rand: '#F6E2A6', zwavel: '#F2F2EE', suiker: '#C9A35C', ag: '#E07A5F' };
function _ayPasvorm(ctx, k, w) { // open bindplaats-contour (lokale x = breedte, y = diepte naar binnen), van links naar rechts
  if (k === 1) { ctx.lineTo(-w * 0.5, 0); ctx.arc(0, 0, w * 0.5, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.45, 0); ctx.lineTo(-w * 0.45, w * 0.55); ctx.lineTo(w * 0.45, w * 0.55); ctx.lineTo(w * 0.45, 0); }
  else if (k === 3) { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(-w * 0.2, w * 0.5); ctx.lineTo(0, w * 0.15); ctx.lineTo(w * 0.2, w * 0.5); ctx.lineTo(w * 0.5, 0); }
  else { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(0, w * 0.6); ctx.lineTo(w * 0.5, 0); }
}
function _ayAntigeen(ctx, k, w, col) { // het passende stuk antigeen (epitoop onderaan = in de bindplaats), als uitstulping van een groter molecuul
  ctx.beginPath(); ctx.moveTo(-w * 0.75, -w * 0.3);
  if (k === 1) { ctx.lineTo(-w * 0.48, -w * 0.05); ctx.arc(0, 0, w * 0.48, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.43, -w * 0.05); ctx.lineTo(-w * 0.43, w * 0.53); ctx.lineTo(w * 0.43, w * 0.53); ctx.lineTo(w * 0.43, -w * 0.05); }
  else if (k === 3) { ctx.lineTo(-w * 0.48, -w * 0.05); ctx.lineTo(-w * 0.2, w * 0.47); ctx.lineTo(0, w * 0.13); ctx.lineTo(w * 0.2, w * 0.47); ctx.lineTo(w * 0.48, -w * 0.05); }
  else { ctx.lineTo(-w * 0.48, -w * 0.05); ctx.lineTo(0, w * 0.57); ctx.lineTo(w * 0.48, -w * 0.05); }
  ctx.lineTo(w * 0.75, -w * 0.3); ctx.bezierCurveTo(w * 1.3, -w * 0.5, w * 1.2, -w * 1.5, 0, -w * 1.45); ctx.bezierCurveTo(-w * 1.2, -w * 1.5, -w * 1.3, -w * 0.5, -w * 0.75, -w * 0.3); ctx.closePath();
  shape(ctx, rgba(col, 0.9), lighten(col, 0.35), 1.4);
}
function _ayDomein(ctx, cx, cy, L, B, an, fill, edge, lw, seed, detail) { // opgevouwen domein: boon met binnenstrengen (β-sandwich)
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(an);
  ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, fill, edge, lw);
  if (detail) { ctx.strokeStyle = rgba('#5A4214', 0.25); ctx.lineWidth = Math.max(0.8, B * 0.06); ctx.lineCap = 'round';
    ctx.beginPath(); const n = 4; for (let i = 0; i < n; i++) { const yy = (i - (n - 1) / 2) * B * 0.2; const x0 = -L * 0.32, x1 = L * 0.32; if (i % 2) { ctx.moveTo(x1, yy); ctx.lineTo(x0, yy); } else { ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); } } ctx.stroke(); }
  ctx.restore();
}
function antistofY(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = 0, open = 0.7, buig = [0, 0], k = 0, bind = [0, 0], agCol = _AY.ag, op = 'vrij', hl = 0, t = 0 } = o;
  const D = 34 * s, B = 21 * s; // domein lang × breed (± 4 × 2,5 nm)
  const ca = Math.cos(ang), sa = Math.sin(ang); const P = (px, py) => [x + px * ca - py * sa, y + px * sa + py * ca];
  const armAn = [-Math.PI / 2 - open - buig[0] + 0.03 * Math.sin(t * 1.3), -Math.PI / 2 + open + buig[1] + 0.03 * Math.sin(t * 1.1 + 1)];
  const arm = armAn.map((an, i) => { const ux = Math.cos(an), uy = Math.sin(an), sd = i ? 1 : -1; const nx = -uy * sd, ny = ux * sd; // n = naar buiten
    const o0 = 22 * s; // arm begint iets van het scharnier
    return { an, ux, uy, nx, ny, base: [ux * o0, uy * o0], tip: [ux * (o0 + 2.05 * D), uy * (o0 + 2.05 * D)] }; });
  const tipW = B * 1.25, tipOff = 2.05 * D + 22 * s + 4 * s;
  const ret = { tips: armAn.map(an => P(Math.cos(an) * tipOff, Math.sin(an) * tipOff)), richt: armAn.map(an => an + ang), voet: P(0, 2 * D + 30 * s + (op === 'bcel' ? 30 * s : 0)), scharnier: [x, y] };
  if (a <= 0.01) return ret;
  const detail = s * D > 14;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.25 * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 16 * s; ctx.beginPath(); ctx.moveTo(0, 2 * D + 14 * s); ctx.lineTo(0, 0); arm.forEach(A2 => { ctx.moveTo(0, 0); ctx.lineTo(A2.tip[0], A2.tip[1]); }); ctx.stroke(); ctx.restore(); }
  const lw = Math.max(1, 1.3 * s);
  // steel (Fc): twee zware ketens naast elkaar, CH2 en CH3; suikerketen tussen de CH2's
  const fcY0 = 22 * s; const gx = B * 0.55;
  if (op === 'bcel') { ctx.strokeStyle = lighten(_AY.zwaar, 0.2); ctx.lineWidth = Math.max(1.5, 3 * s); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * gx * 0.5, fcY0 + 2 * D); ctx.lineTo(sd * gx * 0.35, fcY0 + 2 * D + 30 * s); ctx.stroke(); } }
  for (const sd of [-1, 1]) for (let d = 0; d < 2; d++) _ayDomein(ctx, sd * gx, fcY0 + D * (d + 0.5), D, B, Math.PI / 2 + sd * 0.05, _AY.zwaar, _AY.rand, lw, d, detail);
  if (detail) { ctx.strokeStyle = _AY.suiker; ctx.lineWidth = Math.max(1, 1.4 * s); const sy = fcY0 + D * 0.45; ctx.beginPath(); ctx.moveTo(-gx * 0.25, sy); ctx.lineTo(0, sy + 8 * s); ctx.lineTo(gx * 0.25, sy); ctx.moveTo(0, sy + 8 * s); ctx.lineTo(0, sy + 16 * s); ctx.stroke();
    for (const [px, py] of [[-gx * 0.25, sy], [gx * 0.25, sy], [0, sy + 16 * s], [0, sy + 8 * s]]) { ctx.beginPath(); ctx.arc(px, py, 2.6 * s, 0, 6.283); shape(ctx, _AY.suiker, lighten(_AY.suiker, 0.3), 0.8); } }
  // scharnier: twee soepele stukjes keten + zwavelbruggen
  ctx.strokeStyle = _AY.zwaar; ctx.lineWidth = Math.max(1.5, 4 * s);
  arm.forEach((A2, i) => { const sd = i ? 1 : -1; ctx.beginPath(); ctx.moveTo(sd * gx, fcY0 + 2); ctx.quadraticCurveTo(sd * gx * 0.6, 2 * s, A2.base[0] - A2.nx * B * 0.3, A2.base[1] - A2.ny * B * 0.3); ctx.stroke(); });
  ctx.strokeStyle = _AY.zwavel; ctx.lineWidth = Math.max(1, 1.6 * s); for (const yy of [fcY0 - 2 * s, fcY0 + 4 * s]) { ctx.beginPath(); ctx.moveTo(-gx * 0.75, yy); ctx.lineTo(gx * 0.75, yy); ctx.stroke(); }
  // bindplaatsen uitsparen: clip = alles behalve de pasvorm in elke top (geen gat in de achtergrond)
  const tipC = 22 * s + 1.78 * D + 2 * s, pw = tipW * 0.8;
  ctx.save(); ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000);
  arm.forEach(A2 => { const an = Math.atan2(A2.uy, A2.ux); ctx.save(); ctx.translate(A2.ux * tipC, A2.uy * tipC); ctx.rotate(an + Math.PI / 2); ctx.moveTo(-pw * 0.5, -D); _ayPasvorm(ctx, k, pw); ctx.lineTo(pw * 0.5, -D); ctx.closePath(); ctx.restore(); });
  ctx.clip('evenodd');
  // armen (Fab): zware keten (binnen) + lichte keten (buiten), constant domein bij het scharnier, variabel domein in de top
  arm.forEach((A2, i) => { const { ux, uy, nx, ny } = A2; const an = Math.atan2(uy, ux);
    for (let d = 0; d < 2; d++) { const along = 22 * s + D * (d + 0.5) + d * 2 * s; const v = d === 1;
      const hz = [ux * along - nx * B * 0.5, uy * along - ny * B * 0.5], lt = [ux * along + nx * B * 0.52, uy * along + ny * B * 0.52];
      _ayDomein(ctx, hz[0], hz[1], D, B, an, v ? _AY.varZ : _AY.zwaar, _AY.rand, lw, d + 2, detail);
      _ayDomein(ctx, lt[0], lt[1], D, B * 0.92, an, v ? _AY.varL : _AY.licht, _AY.rand, lw, d + 4, detail); }
    if (detail) { const zb = 22 * s + D * 0.15; ctx.strokeStyle = _AY.zwavel; ctx.lineWidth = Math.max(1, 1.5 * s); ctx.beginPath(); ctx.moveTo(ux * zb - nx * B * 0.15, uy * zb - ny * B * 0.15); ctx.lineTo(ux * zb + nx * B * 0.2, uy * zb + ny * B * 0.2); ctx.stroke(); } });
  ctx.restore();
  // rand van de bindplaats + antigeen dat erin valt
  arm.forEach((A2, i) => { const an = Math.atan2(A2.uy, A2.ux); ctx.save(); ctx.translate(A2.ux * tipC, A2.uy * tipC); ctx.rotate(an + Math.PI / 2);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, D * 0.15, B * 1.2, D * 0.5, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.moveTo(-pw * 0.5, 0); _ayPasvorm(ctx, k, pw); ctx.strokeStyle = lighten(_AY.varZ, 0.5); ctx.lineWidth = Math.max(1, 1.6 * s); ctx.stroke(); ctx.restore();
    const b = clamp(bind[i] || 0, 0, 1); if (b > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, b * 2); ctx.translate(0, -(1 - ease(b)) * 40 * s); _ayAntigeen(ctx, k, pw, agCol); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); return ret;
}

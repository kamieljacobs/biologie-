// =====================================================================================
// SPIER IN DWARSDOORSNEDE met motorische eenheden. Recept (OpenStax A&P 2e 10.2 en 10.3): de spier is omgeven door
// epimysium; binnen in liggen bundels (fascikels), elk omgeven door een bindweefselschot (perimysium); in een bundel
// liggen de vezels dicht tegen elkaar (endomysium, dun), elk met kernen aan de rand. De vezels van één motorische eenheid
// liggen verspreid over de spier (niet in één bundel). eenheden = [{n, kleur}], aan = aantal eenheden dat actief is.
// v2 (beeldbank 27 okt 2026): vezels gegroepeerd in ± 7 bundels met zichtbare bindweefselschotten ertussen en een dikker
// epimysium rond de hele spier (geen 'bol met kiezels' meer); de toewijzing van eenheden is ongewijzigd, dus eenheidZenuw
// en punten(j) werken zoals in v1 (punten volgen de verschoven vezels).
// =====================================================================================
function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0, bundels = 7 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, '#B89A8E', '#E2CEC6', Math.max(3, r * 0.03)); // epimysium + perimysium (bindweefsel)
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  // bundelmiddens: één in het midden, de rest in een ring; elke vezel hoort bij het dichtstbijzijnde midden
  const BC = [[cx, cy]]; for (let k = 0; k < bundels - 1; k++) { const an = k / (bundels - 1) * 6.283 + 0.4; BC.push([cx + Math.cos(an) * r * 0.6, cy + Math.sin(an) * r * 0.6]); }
  const gap = Math.max(2, r * 0.06);
  const bij = V.map(v => { let b = 0, bd = 1e9; BC.forEach((q, k) => { const d = Math.hypot(v.c[0] - q[0], v.c[1] - q[1]) * (k ? 1 : 1.25); if (d < bd) { bd = d; b = k; } }); return b; });
  const schuif = V.map((v, i) => { const q = BC[bij[i]], dx = q[0] - v.c[0], dy = q[1] - v.c[1], d = Math.hypot(dx, dy) || 1; return [dx / d * gap * Math.min(1, d / (r * 0.12)), dy / d * gap * Math.min(1, d / (r * 0.12))]; });
  // bundel = donkerder vlak onder de vezels (zodat de schotten licht blijven)
  V.forEach((v, i) => { const [sx, sy] = schuif[i]; const P = v.pts.map(p => [p[0] + sx, p[1] + sy]);
    const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, P); ctx.fillStyle = act > 0.01 ? _mixHex('#9A4A46', kl, 0.75 * act) : '#9A4A46'; ctx.fill();
    ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba('#D8A49A', 0.7); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    const kp = P[(i * 5) % P.length], cc = [v.c[0] + sx, v.c[1] + sy]; circ(ctx, kp[0] * 0.84 + cc[0] * 0.16, kp[1] * 0.84 + cc[1] * 0.16, Math.max(1.6, r * 0.014), rgba(BIO.kern, 0.9)); });
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.strokeStyle = '#E2CEC6'; ctx.lineWidth = Math.max(4, r * 0.05); ctx.stroke(); // epimysium
  ctx.restore();
  const Vs = V.map((v, i) => ({ c: [v.c[0] + schuif[i][0], v.c[1] + schuif[i][1]], pts: v.pts }));
  return { V: Vs, eig, punten: (j) => Vs.filter((_, i) => eig[i] === j).map(v => v.c) };
}
// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 13.1, StatPearls 'Muscle spindle'): het spoeltje ligt nu ín een stukje spier,
// tussen twee gewone (dikke, gestreepte) spiervezels die met de rek meegaan (o.omgeving = false tekent het los zoals v1).
// De dunne vezeltjes in het spoeltje zijn alleen aan de uiteinden gestreept; in het midden (onder de spiraal) liggen hun
// kernen op een kluitje en is geen streping.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0, omgeving = true } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  if (omgeving) { // gewone spiervezels boven en onder (lopen door tot buiten beeld, rekken mee)
    const W = L * 1.2, vh = h * 0.95;
    ctx.save(); ctx.beginPath(); ctx.rect(x - W / 2, y - h - vh * 1.25, W, 2 * (h + vh * 1.25)); ctx.clip();
    ctx.fillStyle = '#8A6A64'; ctx.fillRect(x - W / 2, y - h - vh * 1.25, W, 2 * (h + vh * 1.25)); // bindweefsel
    for (const [dy, sd] of [[-(h + vh * 0.6), 2], [h + vh * 0.6, 3]]) spierVezel(ctx, x - W / 2 - 4, y + dy, W + 8, vh, { seed: sd, streep: Math.max(7, vh * 0.32) * (1 + 0.18 * rek) });
    ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba('#C9B8A8', 0.55), '#E2CEC6', 2); // kapsel
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); ctx.clip();
  for (const dy of [-0.45, 0, 0.45]) { const yy = y + dy * h, hh = h * 0.26; roundRect(ctx, x - L * 0.42, yy - hh / 2, L * 0.84, hh, hh / 2); shape(ctx, rgba(BIO.spier, 0.85), BIO.spierL, 1);
    ctx.fillStyle = rgba('#5A2A26', 0.55); const st = Math.max(4, w * 0.02) * (1 + 0.18 * rek); for (const sg of [-1, 1]) for (let xx = L * 0.2; xx < L * 0.42; xx += st) ctx.fillRect(x + sg * xx - st * 0.22, yy - hh / 2, st * 0.44, hh); // streping aan de uiteinden
    for (let k = 0; k < 4; k++) circ(ctx, x - L * 0.08 + k * L * 0.05, yy + (k % 2 ? 1 : -1) * hh * 0.15, Math.max(1.5, hh * 0.22), rgba(BIO.kern, 0.9)); } // kernen in het midden
  ctx.restore();
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }

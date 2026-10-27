// ---------- DNA-POLYMERASE (variant B, beeldbank 27 okt 2026): hand gebouwd uit eiwitkralen + klem als ring van zes lobben ----------
// Recept (Doublié & Zahn 2014 Front Microbiol 5:444; OpenStax Biology 2e § 14.4: 'the sliding clamp is a ring-shaped protein that binds
// to the DNA and holds the polymerase in place'):
// Beeldafspraak 'eiwitten zijn geen bolletjes maar een keten': de hand is opgebouwd uit overlappende kralen langs de lijnen van
// palm (onder de matrijs), duim (links omhoog over het nieuwe stuk) en drie vingers (rechts omhoog, gekruld over de nucleotide).
// Achterwand van de kom = donkere kralen achter het DNA. Vingers draaien 18° dicht als de nucleotide past ('sluit').
// Klem: zes lobben op een ellips om het DNA, de drie achterste achter het DNA (polymeraseAchter), de drie voorste ervoor.
// Zelfde aanroep als v1: (x, y) = actief centrum, g, {dir, up, rot, sluit, klem, hl, a}. Onder g < 14 vallen de kralen samen tot één silhouet.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polyKralen(ctx, lijn, g, r, vul, rand, lw, n) { const P = bioDicht(lijn.map(([px, py]) => [px * g, py * g]), 12), m = n || Math.max(4, Math.round(P.length / 10));
  for (let i = 0; i < m; i++) { const p = P[Math.round(i / (m - 1) * (P.length - 1))]; const rr = r * g * (0.85 + 0.25 * hash(i * 3.7 + lijn.length)); ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, vul, rand, lw); } }
const _POLYB = { wand: [[[-1.2, -1.1], [-1.1, 0.8], [-0.4, 1.3], [0.6, 1.3], [1.3, 0.8], [1.35, -1.1]], [[-0.6, -1.2], [0.0, 0.4], [0.7, -1.2]]],
  palm: [[-1.3, -1.25], [-0.6, -1.55], [0.3, -1.6], [1.2, -1.3]], duim: [[-1.35, -1.15], [-1.5, 0.0], [-1.3, 1.1], [-0.75, 1.45], [-0.4, 1.3]],
  vinger: (k) => [[0, 0], [-0.05, 0.9], [-0.25, 1.75 - k * 0.1], [-0.7, 2.05 - k * 0.12]] };
function _polyKlem(ctx, g, voor, vul, rand) { for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.26, z = Math.cos(an); if ((z >= 0) !== voor) continue;
    ctx.beginPath(); ctx.ellipse(-2.15 * g + z * 0.22 * g, Math.sin(an) * 1.05 * g, 0.24 * g, 0.36 * g, 0, 0, 6.283); shape(ctx, voor ? vul : '#4E5D76', voor ? rand : '#6F7E98', 1.3); } }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  _POLYB.wand.forEach(l => _polyKralen(ctx, l, g, 0.36, '#44536A', '#5E6E8A', 1.2));
  if (klem) _polyKlem(ctx, g, false);
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = '#7A8BA8', rand = hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl) : '#A4B2CA', lw = hl > 0.01 ? 2.5 : 1.2;
  const dicht = ease(sluit) * 0.31;
  for (let k = 2; k >= 0; k--) { ctx.save(); ctx.translate((1.22 - k * 0.14) * g, -1.15 * g); ctx.rotate(-0.06 + k * 0.08 + dicht); _polyKralen(ctx, _POLYB.vinger(k), g, 0.2, _mixHex(vul, '#121A26', k * 0.12), rand, lw, 7); ctx.restore(); }
  _polyKralen(ctx, _POLYB.palm, g, 0.3, vul, rand, lw, 7);
  _polyKralen(ctx, _POLYB.duim, g, 0.24, vul, rand, lw, 9);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.4 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, lerp(0.28, 0.2, ease(sluit)) * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) _polyKlem(ctx, g, true, vul, rand);
  ctx.restore(); }

// -------------------------------------------------------------------------------------
// DNA-POLYMERASE — variant A 'handpalm + vingers' (verbeterronde 2, 28 okt 2026; Kamiel: 'erg druk, het moet duidelijker en
// simpeler'; fout ronde 1: 'geen echte gevouwen keten').
// Recept (OpenStax Biology 2e § 14.4: DNA-polymerase voegt nucleotiden één voor één toe aan het 3'-OH-uiteinde, alleen 5' → 3';
// 'the sliding clamp is a ring-shaped protein that binds to the DNA and holds the polymerase in place'; BEELDAFSPRAKEN en C9:
// een eiwit is een kralenketen die vouwt, nooit een vlakke vorm):
//  - twee delen in plaats van zes: (1) de handpalm, één opgevouwen kralenketen (vijf rijen heen en weer; ± 2,5 × zo hoog als het DNA breed is, Pol III-kern/Klenow ± 5–6 nm tegen DNA 2 nm) in een ronde vorm áchter
//    het DNA, donker zodat het DNA ervoor leesbaar blijft; (2) de vingers, een korte lichte kralenketen vóór het DNA, boven de
//    inkomende nucleotide, die omlaag klappen als de passende nucleotide binnenkomt (sluit 0 → 1).
//  - actief centrum: één gouden boogje bij het 3'-uiteinde van de nieuwe streng.
//  - schuifklem: een ring van veertien kralen óm het DNA, vlak achter het enzym (achterste helft in de achterlaag, voorste in de voorlaag).
//  - geen duim, onderkaak of extra lijnen.
// (x, y) = DNA-as bij het actieve centrum, g = maat (scene: 0,55 × DNA-breedte), dir +1 bouwt naar rechts, up +1 nieuwe streng boven.
// Eerst polymeraseAchter, dan het DNA, dan polymeraseVoor. Roep je alleen polymeraseVoor aan, dan tekent die de achterlaag zelf
// (half doorzichtig) zodat het enzym compleet blijft. Aanroepen gelijk aan v2.
// Bekende fouten: vlakke klodder zonder keten; klem die niet om het DNA zit; enzym dat het DNA helemaal bedekt.
// -------------------------------------------------------------------------------------
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polKralen(ctx, P, r, col, rand, lijn = true) { // keten langs punten P: kralen op afstand 2r met een dun verbindingsdraadje
  const Q = bioDicht(P, 240), K = [Q[0]]; let acc = 0; for (let i = 1; i < Q.length; i++) { acc += Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]); if (acc >= r * 2.05) { K.push(Q[i]); acc = 0; } }
  if (lijn) { ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1, r * 0.35); ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  K.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, rand, Math.max(0.8, r * 0.14)); }); return K; }
function _polPalm(g) { const P = [], rows = [-1.2, -0.6, 0, 0.6, 1.2]; rows.forEach((yy, k) => { const half = 1.4 * Math.sqrt(Math.max(0, 1 - Math.pow(yy / 1.62, 2))); const xs = k % 2 ? [half, -half] : [-half, half];
  for (let j = 0; j <= 8; j++) { const u = j / 8, X = lerp(xs[0], xs[1], u) + 0.05; P.push([X * g, (yy + 0.07 * Math.sin(u * 6.283 + k)) * g]); } }); return P; }
function _polKlem(ctx, g, voor, col) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); const c = voor ? col : _mixHex(col, '#121A26', 0.45); shape(ctx, c, lighten(c, 0.3), 1); } }
function _polAchter(ctx, g, al) { ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.ellipse(0.05 * g, 0, 1.62 * g, 1.75 * g, 0, 0, 6.283); ctx.fillStyle = rgba('#3A475C', 0.92); ctx.fill();
  _polKralen(ctx, _polPalm(g), 0.11 * g, '#56667F', '#7A8BA8');
  ctx.restore(); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); _polAchter(ctx, g, 1); if (klem) _polKlem(ctx, g, false, '#8E9CB8'); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); const zelf = j < 0; if (!zelf) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (zelf) { _polAchter(ctx, g, 0.55); if (klem) _polKlem(ctx, g, false, '#8E9CB8'); }
  const col = hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl * 0.6) : '#A4B2CA';
  // vingers: korte keten vanaf de bovenkant van de palm, over de inkomende nucleotide; klappen omlaag bij sluit 1
  ctx.save(); ctx.translate(-0.1 * g, 1.25 * g); ctx.rotate(lerp(0.55, -0.12, ease(sluit)));
  _polKralen(ctx, [[0, 0], [0.4 * g, 0.22 * g], [0.85 * g, 0.24 * g], [1.2 * g, 0.04 * g], [1.28 * g, -0.28 * g]], 0.13 * g, col, '#D2DAE6'); ctx.restore();
  // actief centrum: gouden boogje bij het 3'-uiteinde
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.2 * g, 0.86 * g, 0.24 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true, '#A4B2CA');
  ctx.restore(); }

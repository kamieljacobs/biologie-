// -------------------------------------------------------------------------------------
// GEDEELDE HULPJES (verbeterronde 2, eiwitten als kralenketen, 28 okt 2026). Eén keer in lib_bio.js plakken, ná _grKralen
// (dat al in lib_bio.js staat, groep genregulatie). Kamiel koos voor ALLE eiwitten de kralenketen: één keten van
// aminozuren (bolletjes) die vouwt, zoals eiwitVouw() en transcriptiefactor(); geen lintmodel (buis met helixveren en
// β-pijlen, _grKluwen) en geen vlakke vlek.
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e § 3.4): de keten loopt in rijen heen en weer door de omtrek van het
// eiwit (compacte kluwen, nooit een bol); een paar rijen zijn α-helix (kralen dichter op elkaar in een golf, 3,6 per
// winding, voorkant licht); de rest is gestrekt of lus. Kleur: enzymen/regeleiwitten grijsblauw, actieve plek goud.
// -------------------------------------------------------------------------------------
const KK_R = 1.1; // kraalstraal t.o.v. de oude lint-buismaat o.r (zelfde rijdichtheid, iets voller dan de buis)
// Drop-in voor _grKluwen: zelfde aanroep (ctx, cx, cy, binnen, {r, sc, col, seed, a, rot, bbox, fold, key, hl}).
// Kraalmaat: kralen tussen ± 4,5 en 14 px straal in beeld (een klein eiwit krijgt minder, grotere kralen; een groot getekend
// eiwit wordt geen handvol dikke knikkers), en hooguit ± 35–40 kralen per kluwen (rustig, niet drukker dan het oude lint).
function _kkKluwen(ctx, cx, cy, binnen, o = {}) {
  const sc = o.sc || 1, bb = o.bbox || [-60, -50, 60, 50], opp = Math.PI / 4 * (bb[2] - bb[0]) * (bb[3] - bb[1]);
  const r = Math.max(Math.min(Math.max((o.r || 7) * KK_R, Math.sqrt(opp / 120)), 14 / sc), 4.5 / sc);
  return _grKralen(ctx, cx, cy, binnen, Object.assign({}, o, { r, key: 'kk|' + (o.key || 'k') + '|' + r.toFixed(2) }));
}
// kleur als '#rrggbb' (lighten() geeft 'rgb(...)' terug; lighten/_mixHex rekenen alleen goed met hex)
function _kkHex(c) { const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c); return m ? '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') : c; }
// Kralen langs een pad (staart, arm, lus); pts in beeld; r = kraalstraal in px; o.stap = afstand in r; o.a; o.z (0..1 diepte, donkerder).
function _kkPad(ctx, pts, r, col, o = {}) {
  const { stap = 1.9, a = 1, z = 1, lijn = true } = o; if (a <= 0.01 || pts.length < 2) return []; col = _kkHex(col); const P = bioDicht(pts, 40); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  const kl = z >= 1 ? col : _mixHex(col, '#121A26', 0.35 * (1 - z));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (lijn) { ctx.strokeStyle = lighten(kl, 0.35); ctx.lineWidth = Math.max(1, r * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); }
  k.forEach((p, i) => { ctx.beginPath(); ctx.arc(p[0], p[1], r * 0.84, 0, 6.283); shape(ctx, i % 3 === 1 ? lighten(kl, 0.1) : kl, lighten(kl, 0.3), 1); });
  ctx.restore(); return k;
}
// α-helix als kralen van A naar B (bv. een helix die door het membraan gaat): kralen ± 2,3× dichter dan gestrekt, in een
// golf met 3,6 kralen per winding; voorkant licht, achterkant donker. r = kraalstraal in px; o.amp (golf, in r), o.stap (afstand, in r). Geeft de kralen terug ([x, y, z]).
function _kkHelix(ctx, A, B, r, col, o = {}) {
  const { a = 1, fase = 0, amp = 0.9, stap = 0.95 } = o; if (a <= 0.01) return []; col = _kkHex(col); const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const n = Math.max(3, Math.round(L / (r * stap))), P = [];
  for (let i = 0; i <= n; i++) { const u = i / n, ph = i / 3.6 * 6.283 + fase; P.push([A[0] + ux * L * u + nx * Math.sin(ph) * r * amp, A[1] + uy * L * u + ny * Math.sin(ph) * r * amp, Math.cos(ph)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * 0.38); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
  P.map((p, i) => i).sort((i, j) => P[i][2] - P[j][2]).forEach(i => { const p = P[i], z = p[2]; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.84 + 0.14 * z), 0, 6.283);
    shape(ctx, z >= 0 ? lighten(col, 0.06 + 0.08 * z) : _mixHex(col, '#000000', -0.18 * z), lighten(col, 0.3), 1); });
  ctx.restore(); return P;
}

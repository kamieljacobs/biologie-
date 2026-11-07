// -------------------------------------------------------------------------------------
// DNA-POLYMERASE — variant B 'één ketting, DNA blijft vooraan' (verbeterronde 2, 28 okt 2026; Kamiel: 'erg druk, duidelijker en
// simpeler'; fout ronde 1: 'geen echte gevouwen keten').
// Recept (OpenStax Biology 2e § 14.4: nucleotiden komen aan het 3'-OH-uiteinde, alleen 5' → 3'; de schuifklem is een ring om het DNA
// die de polymerase vasthoudt; C9/BEELDAFSPRAKEN: eiwit = kralenketen die vouwt):
//  - het hele enzym is één doorlopende kralenketen die de omtrek van een halfgesloten hand volgt (palm onder, duim links over de
//    nieuwe dubbele streng, vingers rechts boven de inkomende nucleotide), met een heel lichte vulling; ± 2,5 × zo hoog als het DNA breed is (Pol III-kern/Klenow ± 5–6 nm, DNA 2 nm). Alles ligt áchter het DNA:
//    de matrijs, de nieuwe streng en de inkomende nucleotide blijven volledig zichtbaar.
//  - vóór het DNA alleen het gouden actieve centrum en de voorste helft van de klem; de vingers (stuk van dezelfde keten) klappen
//    om de nucleotide als die past (sluit 0 → 1).
//  - klem: ring van veertien kralen om het DNA.
// (x, y) = DNA-as bij het actieve centrum, g = maat (scene: 0,55 × DNA-breedte), dir, up zoals v2. Alleen polymeraseVoor aanroepen
// mag: dan tekent die de keten zelf. Aanroepen gelijk aan v2.
// Bekende fouten: vlakke klodder zonder keten; klem die niet om het DNA zit; enzym dat het DNA helemaal bedekt.
// -------------------------------------------------------------------------------------
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polKralen(ctx, P, r, col, rand, dicht = false) { const Q = bioDicht(dicht ? P.concat([P[0]]) : P, 240), K = [Q[0]]; let acc = 0;
  for (let i = 1; i < Q.length; i++) { acc += Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]); if (acc >= r * 2.1) { K.push(Q[i]); acc = 0; } }
  ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1, r * 0.3); ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (dicht) ctx.closePath(); ctx.stroke();
  K.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, rand, Math.max(0.8, r * 0.14)); }); return K; }
function _polHand(g) { // omtrek van de handpalm (lokaal): ronde vorm, iets breder onder de matrijs
  const P = []; for (let k = 0; k < 40; k++) { const u = k / 40 * 6.283; P.push([(0.05 + Math.cos(u) * 1.6) * g, (Math.sin(u) * (u > Math.PI ? 1.7 : 1.6)) * g]); } return P; }
function _polVinger(g, sluit) { const rot = lerp(0.55, -0.12, ease(sluit)), cs = Math.cos(rot), sn = Math.sin(rot);
  return [[0, 0], [0.4, 0.22], [0.85, 0.24], [1.2, 0.04], [1.28, -0.28]].map(([px, py]) => [(-0.1 + px * cs - py * sn) * g, (1.25 + px * sn + py * cs) * g]); }
function _polKlem(ctx, g, voor) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; const c = voor ? '#A4B2CA' : '#5E6C84'; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); shape(ctx, c, lighten(c, 0.3), 1); } }
function _polKeten(ctx, g, sluit, hl, al) { ctx.save(); ctx.globalAlpha *= al; const P = _polHand(g);
  ctx.beginPath(); bioPad(ctx, P, true); ctx.fillStyle = rgba('#7A8BA8', 0.16); ctx.fill();
  const col = hl > 0.01 ? _mixHex('#8E9CB8', C.goud, hl * 0.6) : '#8E9CB8'; _polKralen(ctx, P, 0.12 * g, col, '#C3CCDA', true); _polKralen(ctx, _polVinger(g, sluit), 0.13 * g, col, '#C3CCDA'); ctx.restore(); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true, sluit = 0, hl = 0 } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); _polKeten(ctx, g, sluit, hl, 1); if (klem) _polKlem(ctx, g, false); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); const zelf = j < 0; if (!zelf) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (zelf) { _polKeten(ctx, g, sluit, hl, 0.8); if (klem) _polKlem(ctx, g, false); }
  else if (sluit > 0.01) { ctx.save(); ctx.globalAlpha *= ease(sluit); _polKralen(ctx, _polVinger(g, sluit), 0.13 * g, '#A4B2CA', '#D2DAE6'); ctx.restore(); } // gesloten vingers liggen vóór de nucleotide
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.2 * g, 0.86 * g, 0.24 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true);
  ctx.restore(); }

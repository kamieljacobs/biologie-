// -------------------------------------------------------------------------------------
// DNA-POLYMERASE — variant A 'kluwen als C-klem, DNA in het kanaal' (verbeterronde 3, 28 okt 2026).
// Kamiel (ronde 2): 'geen van alle'; 'sommige nucleotiden zijn dubbel zo dik? zijn dat er twee van dezelfde naast elkaar?
// dan mag duidelijker' → in de scène is elke base één staafje van gelijke dikte met een spleetje ertussen (zie scene.js en
// het advies onderaan). Het enzym zelf: zo eenvoudig mogelijk, één eiwit dat je in twee seconden herkent.
// Recept (OpenStax Biology 2e § 14.4: DNA-polymerase voegt nucleotiden toe aan het vrije 3'-OH-uiteinde, alleen 5' → 3',
// energie uit nucleoside-trifosfaten; 'the sliding clamp is a ring-shaped protein that binds to the DNA and holds the polymerase
// in place'; BEELDAFSPRAKEN/C9: eiwit = kralenketen die vouwt):
//  - het enzym is één gevouwen kralenketen (_kkKluwen) in de vorm van een C: een bovenkaak boven de nieuwe streng, een onderkaak
//    onder de matrijs, verbonden aan de rechterkant (waar de enkele matrijs binnenkomt). Het kanaal ertussen blijft leeg: het DNA
//    ligt er vrij in en is volledig leesbaar. Donker grijsblauw en áchter het DNA.
//  - vóór het DNA alleen: het gouden actieve centrum bij het 3'-uiteinde, de vingers (één korte α-helix van lichte kralen) die
//    omlaag klappen over de passende nucleotide (sluit 0 → 1), en de voorste helft van de klem.
//  - klem: ring van veertien kralen óm het DNA, links achter het enzym.
//  - maat ± 2,5 × de DNA-breedte (Pol III-kern/Klenow ± 5–6 nm, DNA 2 nm; bestaand recept, ≈).
// (x, y) = DNA-as bij het actieve centrum, g = maat (± 0,55 × DNA-breedte), dir +1 bouwt naar rechts, up +1 nieuwe streng boven.
// Eerst polymeraseAchter, dan het DNA, dan polymeraseVoor; alleen polymeraseVoor aanroepen mag (tekent dan de achterlaag zelf).
// Aanroepen gelijk aan v2: polymeraseAchter(ctx, x, y, g, {dir, up, a, rot, klem}); polymeraseVoor(ctx, x, y, g, {dir, up, a, rot, sluit, klem, hl}).
// Bekende fouten: vlakke klodder; enzym dat het DNA bedekt; klem die niet om het DNA zit; basen in wisselende diktes.
// Vereist _kkKluwen, _kkHelix (eiwitten/_hulp.js), _mixHex, lighten, rgba, ease, lerp, shape.
// -------------------------------------------------------------------------------------
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
// C-vorm in ontwerpeenheden (100 = g): ellips rond het actieve centrum, met het DNA-kanaal links uitgespaard
function _polCvorm(x, y) { const ex = (x - 20) / 165, ey = y / 232; if (ex * ex + ey * ey > 1) return false; return !(x < 85 && Math.abs(y) < 122); }
function _polKlem(ctx, g, voor) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; const c = voor ? '#A4B2CA' : '#5E6C84'; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); shape(ctx, c, lighten(c, 0.3), 1); } }
function _polRomp(ctx, g, hl, al) { ctx.save(); ctx.globalAlpha *= al; const col = hl > 0.01 ? _mixHex('#66758F', C.goud, hl * 0.5) : '#66758F';
  _kkKluwen(ctx, 0, 0, _polCvorm, { bbox: [-145, -232, 185, 232], sc: g / 100, r: 9, col, seed: 4, key: 'polC' }); ctx.restore(); }
function _polVingers(ctx, g, sluit, hl) { // α-helix van de vingers: scharnier rechtsboven, klapt van schuin omhoog naar plat over de nucleotide
  const th = lerp(Math.PI - 0.75, Math.PI + 0.12, ease(sluit)), P0 = [1.0 * g, 1.3 * g], L = 1.0 * g, T = [P0[0] + Math.cos(th) * L, P0[1] + Math.sin(th) * L];
  const col = hl > 0.01 ? _mixHex('#C3CCDA', C.goud, hl * 0.6) : '#C3CCDA'; _kkHelix(ctx, P0, T, Math.max(2.5, 0.12 * g), col, { amp: 0.8 }); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); _polRomp(ctx, g, hl, 1); if (klem) _polKlem(ctx, g, false); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); if (j >= 0) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (j < 0) { _polRomp(ctx, g, hl, 0.85); if (klem) _polKlem(ctx, g, false); }
  _polVingers(ctx, g, sluit, hl);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.05 * g, 0.86 * g, 0.26 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true);
  ctx.restore(); }

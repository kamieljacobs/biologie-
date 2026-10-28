// -------------------------------------------------------------------------------------
// DNA-POLYMERASE — variant B 'hand uit drie stukken van één keten' (verbeterronde 3, 28 okt 2026).
// Kamiel (ronde 2): 'geen van alle'; 'sommige nucleotiden zijn dubbel zo dik?' → in de scène is elke base één staafje van
// gelijke dikte met een spleetje (zie scene.js). Het enzym: de klassieke 'rechterhand' uit het leerboek, maar heel kaal.
// Recept (OpenStax Biology 2e § 14.4: nucleotiden komen aan het vrije 3'-OH-uiteinde, alleen 5' → 3'; de schuifklem is een
// ring om het DNA die de polymerase op zijn plek houdt; Steitz-handmodel (bestaand recept): palm met het actieve centrum,
// duim die het nieuwe dubbelstrengs DNA vasthoudt, vingers die sluiten om de passende nucleotide; C9: eiwit = kralenketen):
//  - drie kleine kluwens van dezelfde kralenketen, met een paar verbindingskralen ertussen:
//    palm = langwerpige kluwen ónder de matrijs (achter het DNA); duim = kluwen links boven de nieuwe dubbele streng (achter);
//    vingers = kleine lichte kluwen rechtsboven, vóór het DNA, die als geheel omlaag draait als de nucleotide past (sluit 0 → 1).
//  - het DNA ligt vrij tussen palm en duim; het actieve centrum (goud) zit aan het 3'-uiteinde.
//  - klem: ring van veertien kralen om het DNA, links achter het enzym.
// Aanroepen gelijk aan v2: polymeraseAchter(ctx, x, y, g, {dir, up, a, rot, klem}); polymeraseVoor(ctx, x, y, g, {dir, up, a, rot, sluit, klem, hl}).
// (x, y) = DNA-as bij het actieve centrum, g = maat (± 0,55 × DNA-breedte). Alleen polymeraseVoor aanroepen mag.
// Bekende fouten: vlakke klodder; enzym dat het DNA bedekt; klem die niet om het DNA zit; basen in wisselende diktes.
// Vereist _kkKluwen, _kkPad (eiwitten/_hulp.js), _ellips, _mixHex, lighten, ease, lerp, shape.
// -------------------------------------------------------------------------------------
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polKlem(ctx, g, voor) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; const c = voor ? '#A4B2CA' : '#5E6C84'; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); shape(ctx, c, lighten(c, 0.3), 1); } }
const _POL_PALM = _ellips(140, 46), _POL_DUIM = _ellips(70, 44), _POL_VING = _ellips(62, 36);
function _polDeel(ctx, g, cx, cy, E, rot, col, key) { ctx.save(); ctx.translate(cx * g, cy * g); ctx.rotate(rot); _kkKluwen(ctx, 0, 0, E.binnen, { bbox: E.bbox, sc: g / 100, r: 9, col, seed: key.length, key: 'polB' + key }); ctx.restore(); }
function _polVingerHoek(sluit) { return lerp(-0.7, 0.12, ease(sluit)); } // draaiing om het scharnier (1,15 g ; 1,05 g)
function _polAchterDelen(ctx, g, hl, al) { ctx.save(); ctx.globalAlpha *= al; const col = hl > 0.01 ? _mixHex('#6E7D97', C.goud, hl * 0.5) : '#6E7D97';
  _kkPad(ctx, [[1.3 * g, -1.35 * g], [1.5 * g, -0.4 * g], [1.4 * g, 0.6 * g], [1.15 * g, 1.05 * g]], Math.max(2.5, 0.1 * g), col, { z: 0.6 }); // palm → vingers
  _kkPad(ctx, [[-1.0 * g, -1.45 * g], [-1.22 * g, -0.6 * g], [-1.22 * g, 0.6 * g], [-1.0 * g, 1.4 * g]], Math.max(2.5, 0.1 * g), col, { z: 0.6 }); // palm → duim (achter de klem langs)
  _polDeel(ctx, g, 0.15, -1.55, _POL_PALM, 0, col, 'palm'); _polDeel(ctx, g, -0.55, 1.5, _POL_DUIM, -0.25, col, 'duim'); ctx.restore(); }
function _polVingers(ctx, g, sluit, hl) { const col = hl > 0.01 ? _mixHex('#B4C0D4', C.goud, hl * 0.6) : '#B4C0D4';
  ctx.save(); ctx.translate(1.15 * g, 1.05 * g); ctx.rotate(_polVingerHoek(sluit)); _polDeel(ctx, g, -0.62, 0.42, _POL_VING, -0.1, col, 'ving'); ctx.restore(); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); if (klem) _polKlem(ctx, g, false); _polAchterDelen(ctx, g, hl, 1); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); if (j >= 0) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (j < 0) { if (klem) _polKlem(ctx, g, false); _polAchterDelen(ctx, g, hl, 0.85); }
  _polVingers(ctx, g, sluit, hl);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.05 * g, 0.86 * g, 0.26 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true);
  ctx.restore(); }

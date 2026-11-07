// MEMBRAANRECEPTOR, verbeterronde 2 eiwitten (28 okt 2026). De receptor zelf was al een kralenketen (zeven helices door het
// membraan, twee lobben buiten) en blijft ongewijzigd. Nieuw als kralen: G-β (was een vlakke vlek; nu een kleine kralenkluwen
// op een zacht silhouet), G-γ (was een dikke lijn; nu een kort rijtje kralen), en bij de intracellulaire receptor de twee
// DNA-bindende vingers (rijtje kralen). G-α en de intracellulaire receptor zijn enzymKluwen, dat nu ook een kralenketen is.
// Recept: zie het receptcommentaar boven membraanReceptor in lib_bio.js (OpenStax Biology 2e § 9.1; G-eiwit α, β, γ; GDP →
// GTP; ligand past in de pasvorm). Aanroep en teruggave ongewijzigd. Vereist _kkKluwen/_kkPad (eiwitten/_hulp.js).
// (_mrbKralen, _mrbLigand en _mrSteroid blijven ongewijzigd in lib_bio.js)
function membraanReceptor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = -Math.PI / 2, R = 900 * s, membraan = true, breed = 170 * s, bind = 0, signaal = 0, ligCol = C.paars, vorm = 'drie', soort = 'oppervlak', t = 0 } = o;
  const rot = ang + Math.PI / 2; const cr = Math.cos(rot), sr = Math.sin(rot); const P = (px, py) => [x + px * cr - py * sr, y + px * sr + py * cr];
  const ret = { ligand: P(0, -88 * s), binnen: P(0, 60 * s), buiten: P(0, -70 * s), gAlfa: P(0, 62 * s) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a;
  const ms = 0.55 * s, half = (26.4 + 2 + 6) * ms;
  const gat = soort === 'intern' ? 0 : 62 * s;
  if (membraan) { const cx = x - Math.cos(ang) * R, cy = y - Math.sin(ang) * R; const da = breed / R, dg = gat / R;
    if (gat) { membraanBoog(ctx, cx, cy, R, ang - da, ang - dg, { s: ms }); membraanBoog(ctx, cx, cy, R, ang + dg, ang + da, { s: ms }); }
    else membraanBoog(ctx, cx, cy, R, ang - da, ang + da, { s: ms }); }
  ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'intern') { const r2 = _mrIntern(ctx, 0, 0, s, o); ctx.restore(); return Object.assign(ret, { binnen: P(r2.receptor[0], r2.receptor[1]) }); }
  const b = ease(clamp(bind, 0, 1)), sig = ease(clamp(signaal, 0, 1)); const r = Math.max(1.2, 3.6 * s), lw = Math.max(0.8, 1.8 * s);
  const col = '#7FA7C9', colB = '#6E93B8', kin = '#8FA6C4';
  const top = -half - 6 * s;
  // zeven α-helices door het membraan als één doorlopende keten (helix 1 omlaag, 2 omhoog, …), lussen buiten en binnen
  const gap = 17 * s, tm = []; for (let i = 0; i < 7; i++) { let x0 = (i - 3) * gap; let tilt = 0; if (i === 4 || i === 5) { tilt = (i === 5 ? 0.3 : 0.15) * sig; }
    const dn = i % 2 === 0; const y0 = dn ? top : half + 6 * s, y1 = dn ? half + 6 * s : top; const seg = [];
    for (let k = 0; k <= 16; k++) { const u = k / 16; const yy = lerp(y0, y1, u); const dx = Math.sin(u * 6.283 * 2.5) * 2.2 * s + (yy - top) * Math.tan(tilt) * 0.6; seg.push([x0 + dx, yy]); }
    tm.push(seg); }
  const keten = [[0, top - 6 * s], [-2 * gap, top - 10 * s]]; tm.forEach((seg, i) => { seg.forEach(p => keten.push(p)); if (i < 6) { const e2 = seg[seg.length - 1], nx = tm[i + 1][0]; const buiten = i % 2 === 1; const dy = (buiten ? -1 : 1) * (buiten ? 12 : 10) * s * (i === 3 ? 1.5 : 1); keten.push([(e2[0] + nx[0]) / 2, e2[1] + dy]); } });
  { const e2 = tm[6][16]; keten.push([e2[0] + 8 * s, e2[1] + 16 * s], [e2[0] + 26 * s, e2[1] + 20 * s], [e2[0] + 36 * s, e2[1] + 34 * s]); } // staart binnen
  // buitendeel: twee lobben die een zak vormen; bij binden draaien ze naar binnen (sluiten)
  const lob = (sd) => { const sl = -sd * 0.2 * b; const pts = [[0, top], [sd * 10, top - 8 * s / s * s], [sd * 30 * s, top - 18 * s], [sd * 44 * s, top - 40 * s], [sd * 42 * s, top - 66 * s], [sd * 28 * s, top - 84 * s], [sd * 14 * s, top - 80 * s], [sd * 22 * s, top - 62 * s], [sd * 30 * s, top - 46 * s], [sd * 18 * s, top - 36 * s], [sd * 8 * s, top - 50 * s]];
    pts[1] = [sd * 10 * s, top - 8 * s];
    return pts.map(([px, py]) => { const dx = px, dy = py - top; return [dx * Math.cos(sl) - dy * Math.sin(sl), top + dx * Math.sin(sl) + dy * Math.cos(sl)]; }); };
  _mrbKralen(ctx, keten, r * 0.6, colB, lw * 0.9, 2.6); // rustiger: minder kralen, de lijn ertussen draagt de keten
  _mrbKralen(ctx, lob(-1), r * 0.9, col, lw, 2.4); _mrbKralen(ctx, lob(1), r * 0.9, col, lw, 2.4);
  const kr = () => 0;
  // G-eiwit onder de receptor: α (met GDP/GTP), β en γ; α laat los bij signaal
  const gy = half + 44 * s;
  const sep = clamp((sig - 0.35) / 0.65, 0, 1);
  { const bx = -24 * s, by = gy + 6 * s, br = 17 * s; const pts = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283; const rr = br * (1 + 0.1 * Math.sin(u * 4 + 1) + 0.05 * Math.sin(u * 7)); pts.push([bx + Math.cos(u) * rr, by + Math.sin(u) * rr]); }
    ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = rgba('#7E8CA4', 0.25); ctx.fill(); // β: zevenbladig propeller; zacht silhouet …
    _kkKluwen(ctx, bx, by, (qx, qy) => qx * qx + qy * qy < 17 * 17, { bbox: [-17, -17, 17, 17], sc: s, r: 3, col: '#7E8CA4', seed: 8, key: 'mrGb' }); // … met de keten als kralen
    } // β (rustig: één kleine kralenkluwen)
  _kkPad(ctx, [[-42 * s, gy - 10 * s], [-36 * s, gy - 21 * s], [-22 * s, gy - 22 * s]], Math.max(1.8, 2.6 * s), '#A9B5C8', { stap: 2 }); // γ (kort, rijtje kralen) met vetanker richting membraan
  const ax = lerp(16 * s, 58 * s, ease(sep)), ay = lerp(gy, gy + 46 * s, ease(sep)); const lit = sig > 0.3 ? clamp((sig - 0.3) / 0.3, 0, 1) : 0;
  enzymKluwen(ctx, ax, ay, 19 * s, { col: lit > 0 ? (lit > 0.5 ? '#9FB0C8' : '#8C9AB0') : '#8C9AB0', an: -0.6 + sep * 0.8, seed: 5 });
  if (lit > 0.01) { ctx.save(); ctx.globalAlpha *= lit; ctx.beginPath(); ctx.arc(ax, ay, 25 * s, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.stroke(); ctx.restore(); }
  // GDP (2 fosfaten) → GTP (3 fosfaten), koraal = energiedrager
  { const n = sig > 0.25 ? 3 : 2; ctx.save(); ctx.translate(ax + 2 * s, ay + 4 * s); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(i * 6.5 * s, 0, 3 * s, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), Math.max(0.6, s)); } ctx.restore(); }
  // zak (pasvorm) zichtbaar als rand + ligand
  const zy = top - 58 * s; ctx.save(); ctx.translate(0, zy + 4 * s); ctx.globalAlpha *= 0.55 * (1 - b); ctx.setLineDash([3 * s, 3 * s]); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1, 1.5 * s);
  ctx.beginPath(); if (vorm === 'drie') { ctx.moveTo(0, 14 * s); ctx.lineTo(-13 * s, -10 * s); ctx.lineTo(13 * s, -10 * s); ctx.closePath(); } else if (vorm === 'vier') roundRect(ctx, -11 * s, -11 * s, 22 * s, 22 * s, 3 * s); else ctx.arc(0, 0, 12 * s, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  if (bind > 0.001) { ctx.save(); ctx.globalAlpha *= Math.min(1, bind * 3); ctx.translate(lerp(-30 * s, 0, b), lerp(zy - 80 * s, zy + 4 * s, b)); ctx.rotate(lerp(0.9, 0, b)); _mrbLigand(ctx, vorm, 24 * s, ligCol); ctx.restore(); }
  ret.ligand = P(0, zy);
  ctx.restore(); return ret;
}
function _mrIntern(ctx, x, y, s, o) {
  const { f = 0, ligCol = C.paars, kern = [0, 260], recCol = C.enzym, t = 0 } = o;
  const kx = kern[0] * s, ky = kern[1] * s; // kernrand (lokaal), membraan op y = 0, cytoplasma bij +y
  const lig = f < 0.3 ? [lerp(-30, 10, f / 0.3) * s, lerp(-70, 60, ease(f / 0.3)) * s] : null;
  const recStart = [40 * s, 120 * s]; const mv = ease(clamp((f - 0.5) / 0.5, 0, 1));
  const rp = [lerp(recStart[0], kx, mv), lerp(recStart[1], ky - 26 * s, mv)];
  // receptor: gevouwen keten met een DNA-bindend deel (twee 'vingers') en een hormoonzak
  ctx.save(); ctx.translate(rp[0], rp[1]); const b = clamp((f - 0.3) / 0.2, 0, 1);
  enzymKluwen(ctx, 0, 0, 24 * s, { col: recCol, an: -Math.PI / 2, sluit: b, seed: 7 });
  for (const sd of [-1, 1]) _kkPad(ctx, [[sd * 8 * s, 20 * s], [sd * 13 * s, 30 * s], [sd * 6 * s, 40 * s + b * 4 * s]], Math.max(2, 2.8 * s), _mixHex(recCol, '#FFFFFF', 0.3), { stap: 1.9 }); // twee DNA-bindende 'vingers' als kralen
  if (b > 0.01) _mrSteroid(ctx, 0, -20 * s + (1 - b) * -30 * s, 22 * s, ligCol);
  ctx.restore();
  if (lig) _mrSteroid(ctx, lig[0], lig[1], 22 * s, ligCol, 0.4);
  return { receptor: [rp[0], rp[1]] };
}

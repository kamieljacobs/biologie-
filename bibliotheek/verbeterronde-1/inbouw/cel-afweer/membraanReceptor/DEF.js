// =====================================================================================
// MEMBRAANRECEPTOR als kralenketen, G-eiwitgekoppeld (ronde 2, variant C; plus intracellulaire receptor).
// Eén doorlopende kralenketen: bindend deel buiten (twee lobben met de pasvorm), dan zeven keer door het membraan
// (zeven α-helices, lussen afwisselend buiten en binnen), staart binnen; eronder het G-eiwit (α, β, γ) dat bij het
// signaal GDP voor GTP wisselt en waarvan de α-eenheid loslaat (uit variant A).
// Recept: drie delen: een bindend deel buiten de cel, een vetminnend stuk dat door het membraan gaat (hier zeven α-helices
// van elk ± 20 aminozuren ≈ 4 nm = de dikte van het membraan) en een deel binnen de cel dat het signaal doorgeeft. Het
// bindende deel is een opgevouwen keten met twee lobben en een zak met precies de vorm van het signaalmolecuul
// (pasvorm, 'sleutel en slot'); binden laat de lobben sluiten (vormverandering), aan de binnenkant wordt het G-eiwit actief
// (GDP → GTP, α laat los) = signaal binnen. Een klein vetoplosbaar hormoon (steroïd) gaat zelf door het membraan en
// bindt een receptor in het cytoplasma; het complex gaat de kern in en bindt het DNA. Membraan gebogen, dubbellaag.
// Bron: OpenStax Biology 2e § 9.1. Bekende fouten: receptor als schoteltje op een rechte lijn; een ligand dat niet past;
// receptor die niet door het membraan gaat; eiwit als bol.
// Rustiger (Kamiel 28 okt 2026, 'balans tussen details en helderheid'): minder kralen per keten (afstand 2,4–2,6 r), de
// membraanhelices golven zachter, de β-propeller zonder spaken. Zeven doorgangen, lobben en G-eiwit blijven.
// Aanroep: membraanReceptor(ctx, x, y, s, o) — (x, y) = midden van het membraan bij de receptor, s = 1 → ± 180 px
// hoog. o.ang (richting naar buiten, standaard −π/2), o.R, o.membraan, o.breed, o.bind 0..1, o.signaal 0..1, o.ligCol,
// o.vorm = 'rond' | 'drie' | 'vier' (pasvorm), o.soort = 'oppervlak' | 'intern' (o.f, o.kern), o.t.
// Geeft { ligand, binnen, buiten, gAlfa } terug (gAlfa = actief binnendeel).
// =====================================================================================
function _mrbKralen(ctx, pts, r, col, lw, stap = 1.9) { const P = bioDicht(pts, 12); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba(lighten(col, 0.3), 0.6); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  k.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.2)); }); return k; }
function _mrbLigand(ctx, vorm, w, col) { ctx.beginPath();
  if (vorm === 'drie') { ctx.moveTo(0, w * 0.6); ctx.lineTo(-w * 0.55, -w * 0.4); ctx.lineTo(w * 0.55, -w * 0.4); ctx.closePath(); }
  else if (vorm === 'vier') { roundRect(ctx, -w * 0.45, -w * 0.45, w * 0.9, w * 0.9, w * 0.12); }
  else ctx.arc(0, 0, w * 0.48, 0, 6.283);
  shape(ctx, col, lighten(col, 0.4), Math.max(1, w * 0.08)); }
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
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, '#7E8CA4', lighten('#7E8CA4', 0.3), Math.max(1, 1.5 * s)); // β: zevenbladig propeller, hier als gevouwen keten met bladen
    } // β (rustig: alleen de omtrek)
  ctx.save(); ctx.strokeStyle = '#A9B5C8'; ctx.lineWidth = Math.max(1.5, 5 * s); ctx.beginPath(); ctx.moveTo(-42 * s, gy - 10 * s); ctx.quadraticCurveTo(-34 * s, gy - 24 * s, -22 * s, gy - 22 * s); ctx.stroke(); ctx.restore(); // γ met vetanker richting membraan
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
// --- intracellulaire receptor (steroïdhormoon): ligand gaat door het membraan, bindt de receptor in het cytoplasma,
// het complex gaat de kern in en bindt het DNA. f: 0–0,3 door het membraan · 0,3–0,5 binden · 0,5–1 naar de kern.
function _mrSteroid(ctx, x, y, w, col, an = 0) { // vier gekoppelde ringen (3 zeshoeken + vijfhoek), herkenbaar als steroïd
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const r = w / 4.6; const C6 = [[-1.73 * r, 0.5 * r], [0, -0.5 * r], [1.73 * r, 0.5 * r]];
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let i = 0; i < n; i++) { const a2 = -Math.PI / 2 + i * 6.283 / n + (n === 6 ? Math.PI / 6 : 0); const px = cx + Math.cos(a2) * rr, py = cy + Math.sin(a2) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.85), lighten(col, 0.4), Math.max(1, r * 0.18)); };
  C6.forEach(p => ring(p[0], p[1], 6, r)); ring(3.25 * r, -0.2 * r, 5, r * 0.88); ctx.restore();
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
  ctx.strokeStyle = lighten(recCol, 0.3); ctx.lineWidth = Math.max(1.5, 4 * s); ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 8 * s, 20 * s); ctx.quadraticCurveTo(sd * 14 * s, 32 * s, sd * 6 * s, 40 * s + b * 4 * s); ctx.stroke(); }
  if (b > 0.01) _mrSteroid(ctx, 0, -20 * s + (1 - b) * -30 * s, 22 * s, ligCol);
  ctx.restore();
  if (lig) _mrSteroid(ctx, lig[0], lig[1], 22 * s, ligCol, 0.4);
  return { receptor: [rp[0], rp[1]] };
}

// =====================================================================================
// MEMBRAANRECEPTOR (G-eiwitgekoppelde receptor, plus intracellulaire receptor). Recept: een receptor aan het
// celoppervlak heeft drie delen: een bindend deel buiten de cel, een vetminnend deel dat door het membraan gaat en
// een deel binnen de cel. Een G-eiwitgekoppelde receptor gaat zeven keer door het membraan (zeven α-helices, ± 4 nm
// lang = de dikte van het membraan), met lussen afwisselend buiten en binnen; het signaalmolecuul (ligand) past in
// een zak tussen de helices. Binden verandert de vorm: de binnenkant van helix 5–6 klapt naar buiten, het G-eiwit
// (α, β, γ) eronder wisselt GDP voor GTP en de α-eenheid laat los = signaal binnen. Een klein vetoplosbaar hormoon
// (steroïd) gaat zelf door het membraan en bindt een receptor in het cytoplasma; het complex gaat de kern in en bindt
// het DNA. Membraan gebogen (deel van een ronde cel), dubbellaag met koppen en staarten.
// Bron: OpenStax Biology 2e § 9.1. Bekende fouten: receptor als 'schoteltje' op een rechte lijn; ligand dat niet past;
// receptor die alleen buiten het membraan zit; steroïd met een receptor aan de buitenkant.
// Aanroep: membraanReceptor(ctx, x, y, s, o) — (x, y) = midden van het membraan bij de receptor, s = 1 → ± 180 px
// hoog. o.ang = richting naar buiten (standaard −π/2 = omhoog), o.R = straal van de cel (standaard 900 s),
// o.membraan (true), o.breed (halve breedte membraanstuk, standaard 170 s), o.bind 0..1 (ligand komt aan en bindt),
// o.signaal 0..1 (vorm verandert, G-α laat los), o.ligCol (standaard paars = hormoon), o.soort = 'oppervlak' |
// 'intern' (dan o.f 0..1 en o.kern = [x, y] lokaal t.o.v. (x, y), +y = de cel in), o.t.
// Geeft { ligand, binnen, buiten, gAlfa } terug (schermcoördinaten, voor namen).
// =====================================================================================
function membraanReceptor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = -Math.PI / 2, R = 900 * s, membraan = true, breed = 170 * s, bind = 0, signaal = 0, ligCol = C.paars, soort = 'oppervlak', t = 0 } = o;
  const rot = ang + Math.PI / 2; const cr = Math.cos(rot), sr = Math.sin(rot); const P = (px, py) => [x + px * cr - py * sr, y + px * sr + py * cr];
  const ret = { ligand: P(0, -62 * s), binnen: P(0, 70 * s), buiten: P(0, -55 * s), gAlfa: P(0, 80 * s) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a;
  const ms = 0.55 * s, half = (26.4 + 2 + 6) * ms; // halve membraandikte (zie membraanBoog)
  const gat = soort === 'intern' ? 0 : 52 * s;
  if (membraan) { const cx = x - Math.cos(ang) * R, cy = y - Math.sin(ang) * R; const da = breed / R, dg = gat / R;
    if (gat) { membraanBoog(ctx, cx, cy, R, ang - da, ang - dg, { s: ms }); membraanBoog(ctx, cx, cy, R, ang + dg, ang + da, { s: ms }); }
    else membraanBoog(ctx, cx, cy, R, ang - da, ang + da, { s: ms }); }
  ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // kromming van het membraan volgen: lokaal y-verschuiving bij x
  const kr = (px) => (px * px) / (2 * R);
  if (soort === 'intern') { const r2 = _mrIntern(ctx, 0, 0, s, o); ctx.restore(); return Object.assign(ret, { binnen: P(r2.receptor[0], r2.receptor[1]) }); }
  const sig = ease(clamp(signaal, 0, 1)); const b = clamp(bind, 0, 1);
  const col = '#7FA7C9', colD = '#5E86A8', edge = lighten(col, 0.35); // receptor: blauwgrijs eiwit
  const hw = 11 * s, hl = half * 2 + 16 * s, gap = 13.5 * s;
  const H = []; for (let i = 0; i < 7; i++) { const px = (i - 3) * gap; let tilt = (i % 2 ? 0.08 : -0.08), dx = 0;
    if (i === 4 || i === 5) { tilt += (i === 5 ? 0.32 : 0.16) * sig; dx = (i === 5 ? 6 : 3) * s * sig; }
    if (i === 2) tilt -= 0.06 * b; H.push({ px: px + dx, py: kr(px), tilt }); }
  const end = (h, top) => { const d = (top ? -1 : 1) * hl / 2; return [h.px + Math.sin(-h.tilt) * d * -1, h.py + Math.cos(h.tilt) * d]; };
  // lussen: buiten tussen 2-3, 4-5, 6-7; binnen tussen 1-2, 3-4, 5-6; N-staart buiten, C-staart binnen
  ctx.strokeStyle = lighten(col, 0.15); ctx.lineWidth = Math.max(1.4, 3.2 * s);
  for (let i = 0; i < 6; i++) { const top = i % 2 === 1; const p = end(H[i], top), q = end(H[i + 1], top); const bulge = (top ? -1 : 1) * (top ? 16 : 13) * s * (i === 3 ? 1.6 : 1);
    ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.bezierCurveTo(p[0], p[1] + bulge, q[0], q[1] + bulge, q[0], q[1]); ctx.stroke(); }
  { const p = end(H[0], true); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.bezierCurveTo(p[0] - 10 * s, p[1] - 22 * s, p[0] - 30 * s, p[1] - 12 * s, p[0] - 34 * s, p[1] - 30 * s); ctx.stroke();
    const q = end(H[6], false); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.bezierCurveTo(q[0] + 8 * s, q[1] + 22 * s, q[0] + 30 * s, q[1] + 14 * s, q[0] + 38 * s, q[1] + 32 * s); ctx.stroke(); }
  // helices als cilinders met windingen (achterste eerst: 2, 4, 6 iets donkerder)
  [1, 3, 5, 0, 2, 4, 6].forEach(i => { const h = H[i]; ctx.save(); ctx.translate(h.px, h.py); ctx.rotate(h.tilt); const back = i % 2 === 1;
    roundRect(ctx, -hw / 2, -hl / 2, hw, hl, hw / 2); shape(ctx, back ? colD : col, edge, Math.max(1, 1.3 * s));
    if (s > 0.45) { ctx.strokeStyle = rgba('#2E4A66', 0.45); ctx.lineWidth = Math.max(0.8, 1.2 * s); const n = 7; for (let k = 1; k < n; k++) { const yy = -hl / 2 + k * hl / n; ctx.beginPath(); ctx.moveTo(-hw / 2 + 1, yy - 2.5 * s); ctx.lineTo(hw / 2 - 1, yy + 2.5 * s); ctx.stroke(); } }
    ctx.restore(); });
  // ligand: past in de zak tussen de helices aan de buitenkant
  const pocketY = -hl / 2 + 10 * s; const ly = lerp(-hl / 2 - 70 * s, pocketY, ease(b)); const lx = lerp(-26 * s, 2 * s, ease(b));
  if (b > 0.001) { ctx.save(); ctx.globalAlpha *= Math.min(1, b * 3); ctx.translate(lx, ly); ctx.rotate(lerp(0.6, 0, ease(b)));
    ctx.beginPath(); bioPad(ctx, [[-9 * s, -7 * s], [0, -11 * s], [9 * s, -6 * s], [7 * s, 8 * s], [0, 13 * s], [-7 * s, 7 * s]], true); shape(ctx, ligCol, lighten(ligCol, 0.4), Math.max(1, 1.5 * s)); ctx.restore(); }
  // G-eiwit onder de receptor: α (met GDP/GTP), β en γ; α laat los bij signaal
  const gy = hl / 2 + 30 * s + kr(0);
  const sep = clamp((sig - 0.35) / 0.65, 0, 1);
  { const bx = -24 * s, by = gy + 6 * s, br = 17 * s; const pts = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283; const rr = br * (1 + 0.1 * Math.sin(u * 4 + 1) + 0.05 * Math.sin(u * 7)); pts.push([bx + Math.cos(u) * rr, by + Math.sin(u) * rr]); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, '#7E8CA4', lighten('#7E8CA4', 0.3), Math.max(1, 1.5 * s)); // β: zevenbladig propeller, hier als gevouwen keten met bladen
    ctx.strokeStyle = rgba(lighten('#7E8CA4', 0.35), 0.6); ctx.lineWidth = Math.max(0.8, 1.6 * s); for (let k = 0; k < 7; k++) { const u = k / 7 * 6.283; ctx.beginPath(); ctx.moveTo(bx + Math.cos(u) * br * 0.25, by + Math.sin(u) * br * 0.25); ctx.lineTo(bx + Math.cos(u + 0.3) * br * 0.8, by + Math.sin(u + 0.3) * br * 0.8); ctx.stroke(); } } // β
  ctx.save(); ctx.strokeStyle = '#A9B5C8'; ctx.lineWidth = Math.max(1.5, 5 * s); ctx.beginPath(); ctx.moveTo(-42 * s, gy - 10 * s); ctx.quadraticCurveTo(-34 * s, gy - 24 * s, -22 * s, gy - 22 * s); ctx.stroke(); ctx.restore(); // γ met vetanker richting membraan
  const ax = lerp(16 * s, 58 * s, ease(sep)), ay = lerp(gy, gy + 46 * s, ease(sep)); const lit = sig > 0.3 ? clamp((sig - 0.3) / 0.3, 0, 1) : 0;
  enzymKluwen(ctx, ax, ay, 19 * s, { col: lit > 0 ? (lit > 0.5 ? '#9FB0C8' : '#8C9AB0') : '#8C9AB0', an: -0.6 + sep * 0.8, seed: 5 });
  if (lit > 0.01) { ctx.save(); ctx.globalAlpha *= lit; ctx.beginPath(); ctx.arc(ax, ay, 25 * s, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.stroke(); ctx.restore(); }
  // GDP (2 fosfaten) → GTP (3 fosfaten), koraal = energiedrager
  { const n = sig > 0.25 ? 3 : 2; ctx.save(); ctx.translate(ax + 2 * s, ay + 4 * s); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(i * 6.5 * s, 0, 3 * s, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), Math.max(0.6, s)); } ctx.restore(); }
  ret.gAlfa = P(ax, ay);
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

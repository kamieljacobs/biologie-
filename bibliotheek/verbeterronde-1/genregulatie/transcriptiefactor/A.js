// =====================================================================================
// TRANSCRIPTIEFACTOR (eiwitkluwen met pasvorm, monomeer). Recept (OpenStax Biology 2e § 16.4; Lodish 8e § 9.2):
//  - een transcriptiefactor is een eiwit (gevouwen keten, geen bol) dat een korte, vaste basenvolgorde in de promotor of een
//    enhancer herkent; de herkenning gebeurt met een α-helix die in de grote groef van het DNA past (pasvorm). Gebonden
//    trekt een activator RNA-polymerase (en andere factoren) naar de promotor; een remmer (repressor) bindt ook, maar blokkeert.
//  - maat: DNA 2 nm breed, een transcriptiefactor ± 5–10 nm (hier ± 4,5× de DNA-breedte); RNA-polymerase groter dan de factor.
//  - hormoon-receptorcomplex (o.hormoon): oestradiol (steroïd: drie zesringen + vijfring) ligt in een afgesloten holte van het
//    eiwit (Ruff e.a. 2000, Breast Cancer Res 2:353); pas mét hormoon bindt de receptor het DNA en werkt als transcriptiefactor.
//  - kleur: grijsblauwe kluwen (C2); activator met groene zweem, remmer met koraal zweem; herkenningshelix goud als hij past.
// Bekende fouten: een bol of druppel; factor die op willekeurige plek op het DNA ligt; activator en remmer met dezelfde vorm
// en hetzelfde effect; hormoon dat los naast de receptor ligt.
// (x, y) = bindplek op de DNA-as; s = schaal (factor ± 220 × 160 px bij s = 1). o.dna (standaard uit) tekent een stukje DNA met
// promotor; o.gebonden 0..1 (0 = zweeft erboven, 1 = zit vast); o.soort 'activator' | 'remmer' | 'neutraal'; o.polymerase 0..1;
// o.hormoon 0..1; o.fold 0..1 (vouwen); o.t. Geeft {tf, helix, pol, hormoon} (plekken voor namen) terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, 27 okt 2026): EIWITKLUWEN binnen een omtrek. Eén keer in lib_bio.js plakken;
// transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (de kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN): een eiwit is een keten van aminozuren (kralen) die vouwt: stukken α-helix (strakke
// spiraal, 3,6 aminozuren per winding) afgewisseld met gestrekte stukken en lussen, samen een compacte kluwen. Nooit een
// bol. De omtrek (binnen(x, y) in lokale coördinaten) mag een pasvorm hebben: een holte waar DNA of een molecuul in past.
// Alle maten (bbox, binnen, r) in ontwerpeenheden; o.sc = schaal naar beeld. o.fold 0 = gestrekte keten (net gemaakt) → 1 = gevouwen; o.key = cachesleutel voor de vorm. Geeft de kralen in beeld terug.
// Kleur: regeleiwitten en enzymen grijsblauw (#7A8BA8, C2); de bindende plek mag goud (o.hl = functie(i) → 0..1).
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r: r0 = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null, sx = 1 } = o; const r = r0; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r.toFixed(2) + '|' + bbox.join(',');
  let P = _grKluwenCache[k];
  if (!P) { P = []; const rows = []; for (let y = bbox[1] + r * 1.1; y <= bbox[3] - r * 0.9; y += r * 2.45) rows.push(y);
    rows.forEach((y, ri) => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
      if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (!best || best[1] - best[0] < r * 2) return;
      const x0 = best[0] + r * 0.9, x1 = best[1] - r * 0.9, dir = ri % 2 ? -1 : 1, helix = hash(seed * 7.3 + ri * 3.1) > 0.42 && x1 - x0 > r * 6;
      const L = x1 - x0, stap = helix ? r * 0.95 : r * 1.7, n = Math.max(2, Math.round(L / stap));
      if (P.length) { const q = P[P.length - 1], xs = dir > 0 ? x0 : x1; P.push([(q[0] + xs) / 2 + dir * -r * 1.1, (q[1] + y) / 2, 0]); }
      for (let i = 0; i <= n; i++) { const u = i / n, x = dir > 0 ? lerp(x0, x1, u) : lerp(x1, x0, u);
        if (helix) { const ph = i / 3.6 * 6.283 + seed; P.push([x, y + Math.sin(ph) * r * 0.95, Math.cos(ph)]); } else P.push([x + (hash(seed * 3.7 + ri * 11 + i * 1.3) - 0.5) * r * 0.6, y + Math.sin(i * 0.9 + seed) * r * 0.25 + (hash(seed * 5.1 + ri * 7 + i * 2.9) - 0.5) * r * 0.9, 0]); } });
    _grKluwenCache[k] = P; }
  const n = P.length, L = n * r * 1.8;
  const pts = P.map((p, i) => { const f = ease(clamp(fold * 1.4 - (i / n) * 0.4, 0, 1)); const bx = -L / 2 + i * r * 1.8, by = Math.sin(i * 0.35 + seed) * r * 3;
    const X = lerp(bx, p[0] * sx, f) * sc, Y = lerp(by, p[1], f) * sc, cs = Math.cos(rot), sn = Math.sin(rot);
    return [cx + X * cs - Y * sn, cy + X * sn + Y * cs, (p[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * sc * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  const tint = [0, 0.12, -0.1]; const order = pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]);
  order.forEach(i => { const p = pts[i], z = p[2], t = tint[(i * 7 + seed) % 3]; const h = hl ? hl(i, n) : 0;
    const fill = h > 0.5 ? C.goud : (t >= 0 ? lighten(col, t + 0.08 * z) : _mixHex(col, '#000000', -t)); ctx.beginPath(); ctx.arc(p[0], p[1], r * sc * (0.84 + 0.14 * z), 0, 6.283); shape(ctx, fill, h > 0.5 ? lighten(C.goud, 0.35) : lighten(col, 0.3), 1); });
  ctx.restore(); return pts;
}
function _tfSteroid(ctx, x, y, r, a = 1) { // oestradiol: drie zesringen en een vijfring, met OH aan beide uiteinden (paars: hormoon, C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B9ACE6'; ctx.fillStyle = rgba('#8C7BBF', 0.45); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.lineJoin = 'round';
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let k = 0; k < n; k++) { const an = k / n * 6.283 + (n === 6 ? Math.PI / 6 : -Math.PI / 2 + 0.3); const X = cx + Math.cos(an) * rr, Y = cy + Math.sin(an) * rr; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  const d = r * 1.73; ring(x - d, y + r * 0.5, 6, r); ring(x, y, 6, r); ring(x + d, y + r * 0.5, 6, r); ring(x + d * 1.82, y - r * 0.15, 5, r * 0.86);
  ctx.beginPath(); ctx.moveTo(x - d * 1.85, y + r * 1.0); ctx.lineTo(x - d * 2.3, y + r * 1.3); ctx.moveTo(x + d * 2.3, y - r * 0.6); ctx.lineTo(x + d * 2.6, y - r * 1.1); ctx.stroke(); ctx.restore(); }
function _tfDNA(ctx, x, y, s, t, breed = 300) { // stukje DNA met de promotor als gouden mouw en het startpunt als pijltje
  roundRect(ctx, x - 150 * s, y - 34 * s, 230 * s, 68 * s, 20 * s); shape(ctx, rgba(C.goud, 0.22), rgba(C.goud, 0.7), 1.5);
  dnaDraad(ctx, [[x - breed * s, y], [x + breed * s, y]], { w: 44 * s, helix: true, glad: false, fase: t * 0.05 });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; const xs = x + 90 * s; ctx.beginPath(); ctx.moveTo(xs, y + 26 * s); ctx.lineTo(xs, y + 62 * s); ctx.lineTo(xs + 40 * s, y + 62 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 48 * s, y + 62 * s); ctx.lineTo(xs + 36 * s, y + 54 * s); ctx.lineTo(xs + 36 * s, y + 70 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); }
function _tfPolymerase(ctx, x, y, s, a = 1) { // plaatshouder RNA-polymerase (eigen bibliotheekobject volgt: rnaPolymerase)
  if (a <= 0.01) return; enzymKluwen(ctx, x, y, 78 * s, { a, col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); }
const TF_KLEUR = { activator: '#6F9A86', remmer: '#A57F7A', neutraal: '#7A8BA8' };
function transcriptiefactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, dna = false, gebonden = 1, soort = 'activator', polymerase = 0, hormoon = 0, fold = 1, t = 0 } = o; if (a <= 0.01) return {};
  const g = ease(gebonden), col = TF_KLEUR[soort] || TF_KLEUR.neutraal, uit = {};
  ctx.save(); ctx.globalAlpha *= a; if (dna) _tfDNA(ctx, x, y, s, t);
  // RNA-polymerase: activator → op het startpunt; remmer → blijft weg (komt niet bij het DNA)
  if (polymerase > 0.01) { const p = ease(polymerase); const doelX = soort === 'remmer' ? x + 250 * s : x + 175 * s, doelY = soort === 'remmer' ? y - 170 * s : y - 70 * s;
    const px = lerp(x + 420 * s, doelX, p), py = lerp(y - 260 * s, doelY, p) + (soort === 'remmer' ? Math.sin(t * 2) * 6 * s * p : 0); _tfPolymerase(ctx, px, py, s, Math.min(1, polymerase * 2)); uit.pol = [px, py]; }
  const ox = x - 10 * s * (1 - g), oy = y - 160 * s * (1 - g) + Math.sin(t * 1.3) * 4 * s * (1 - g), rot = 0.35 * (1 - g);
  const binnen = (px, py) => { const ex = px / 112, ey = (py + 86) / 74; if (ex * ex + ey * ey > 1) return false; return Math.hypot(px, py + 2) > 40; };
  // herkenningshelix: korte spiraal van kralen die in de grote groef zakt
  ctx.save(); ctx.translate(ox, oy); ctx.rotate(rot); const hx = [], r = 7 * s;
  for (let i = 0; i < 11; i++) { const u = i / 10, ph = i / 3.6 * 6.283; hx.push([(-30 + u * 34) * s + Math.cos(ph) * 7 * s, (-44 + u * 46) * s + Math.sin(ph) * 3 * s, Math.cos(ph)]); }
  ctx.restore();
  const cs = Math.cos(rot), sn = Math.sin(rot), W = (p) => [ox + p[0] * cs - p[1] * sn, oy + p[0] * sn + p[1] * cs, p[2]];
  const H = hx.map(W); const pts = _grKluwen(ctx, ox, oy, binnen, { r: 7, sc: s, col, seed: soort === 'remmer' ? 4 : 2, rot, bbox: [-115, -162, 115, -8], fold, key: 'tfA' });
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, [pts[pts.length - 1], ...H], false); ctx.stroke();
  H.forEach(p => { _bioCirc(ctx, p[0], p[1], r * (0.85 + 0.12 * p[2]), g > 0.9 ? C.goud : lighten(col, 0.15), g > 0.9 ? lighten(C.goud, 0.35) : lighten(col, 0.35), 1); });
  uit.helix = H[H.length - 1]; uit.tf = [ox + 0 * s, oy - 90 * s];
  // activator: losse activatiestaart (ongevouwen stuk keten) die naar de polymerase reikt
  if (soort === 'activator') { const reik = ease(polymerase), st = W([100 * s, -110 * s]), P = [st]; for (let i = 1; i <= 9; i++) { const u = i / 9; P.push([st[0] + u * lerp(40, 85, reik) * s, st[1] + Math.sin(u * 5 + t) * 10 * s - u * lerp(30, -10, reik) * s]); }
    ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach((p, i) => i && _bioCirc(ctx, p[0], p[1], r * 0.72, lighten(col, 0.05), lighten(col, 0.35), 1)); }
  if (hormoon > 0.01) { const hp = W([-46 * s, -96 * s]), h = ease(hormoon); _bioCirc(ctx, hp[0], hp[1], 34 * s, rgba('#121A26', 0.55 * h), rgba(lighten(col, 0.4), 0.6 * h), 1); _tfSteroid(ctx, lerp(hp[0] - 200 * s, hp[0] - 4 * s, h), lerp(hp[1] - 120 * s, hp[1], h), 7.5 * s, Math.min(1, hormoon * 2)); uit.hormoon = hp; }
  ctx.restore(); return uit;
}

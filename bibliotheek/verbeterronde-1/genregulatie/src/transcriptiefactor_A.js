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
//@@KLUWEN
//@@TF
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

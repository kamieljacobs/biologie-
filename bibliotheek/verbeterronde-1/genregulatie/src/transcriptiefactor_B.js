// =====================================================================================
// TRANSCRIPTIEFACTOR als DIMEER (twee kluwens die het DNA als een klem omvatten). Recept (OpenStax Biology 2e § 16.4;
// Lodish 8e § 9.2; Ruff e.a. 2000, Breast Cancer Res 2:353 voor de oestrogeenreceptor):
//  - veel transcriptiefactoren binden als paar (dimeer) op een tweedelige herkenningsvolgorde: elk van de twee eiwitketens
//    steekt een α-helix in een grote groef, de twee helices liggen één winding (± 3,4 nm) uit elkaar. Een eiwit is een gevouwen
//    keten, geen bol. De DNA-bindende delen van de oestrogeenreceptor zijn los monomeer en vormen pas op het DNA een paar.
//  - gebonden trekt een activator RNA-polymerase naar de promotor; een remmer bindt op dezelfde manier maar houdt de polymerase weg.
//  - hormoon-receptorcomplex (o.hormoon): oestradiol in een afgesloten holte van elke helft; mét hormoon vormt de receptor het paar.
//  - kleur: grijsblauw (C2), activator groene zweem, remmer koraal zweem; herkenningshelices goud als ze passen.
// Bekende fouten: een bol; twee helften die op willekeurige plekken zitten; dimeer dat al als paar aankomt terwijl het
// verhaal zegt dat het hormoon de koppeling maakt.
// Zelfde aanroep als de monomeerversie: (x, y) = midden van de bindplek op de DNA-as; s = schaal (± 260 × 170 px bij s = 1);
// o.dna, o.gebonden 0..1 (0 = twee helften los aan weerszijden, 1 = klem dicht), o.soort, o.polymerase, o.hormoon, o.fold, o.t.
// Geeft {tf, helix, pol, hormoon} terug.
// =====================================================================================
//@@KLUWEN
//@@TF
function transcriptiefactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, dna = false, gebonden = 1, soort = 'activator', polymerase = 0, hormoon = 0, fold = 1, t = 0 } = o; if (a <= 0.01) return {};
  const g = ease(gebonden), col = TF_KLEUR[soort] || TF_KLEUR.neutraal, uit = {}, r = 6.5 * s;
  ctx.save(); ctx.globalAlpha *= a; if (dna) _tfDNA(ctx, x, y, s, t);
  if (polymerase > 0.01) { const p = ease(polymerase); const doelX = soort === 'remmer' ? x + 270 * s : x + 185 * s, doelY = soort === 'remmer' ? y - 175 * s : y - 70 * s;
    const px = lerp(x + 420 * s, doelX, p), py = lerp(y - 260 * s, doelY, p) + (soort === 'remmer' ? Math.sin(t * 2) * 6 * s * p : 0); _tfPolymerase(ctx, px, py, s, Math.min(1, polymerase * 2)); uit.pol = [px, py]; }
  // twee helften: links en rechts van het midden, elk boven één grote groef (helices ± 90·s uit elkaar)
  const helften = [-1, 1].map(k => { const ox = x + k * lerp(150, 46, g) * s, oy = y - lerp(120, 0, g) * s + Math.sin(t * 1.2 + k) * 3 * s * (1 - g), rot = k * 0.25 * (1 - g);
    const binnen = (px, py) => { const qx = px * k; const ex = (qx - 6) / 68, ey = (py + 70) / 66; if (ex * ex + ey * ey > 1) return false; return Math.hypot(px + k * 46, py + 2) > 34 && qx > -40; };
    const pts = _grKluwen(ctx, ox, oy, binnen, { r: 6.5, sc: s, col, seed: k > 0 ? 6 : 3, rot, bbox: [-90, -140, 90, -6], fold, key: 'tfB' + k });
    const cs = Math.cos(rot), sn = Math.sin(rot), W = (p) => [ox + p[0] * cs - p[1] * sn, oy + p[0] * sn + p[1] * cs, p[2]];
    const H = []; for (let i = 0; i < 9; i++) { const u = i / 8, ph = i / 3.6 * 6.283; H.push(W([(-k * 4 + k * (8 - u * 12)) * s + Math.cos(ph) * 6 * s, (-34 + u * 36) * s + Math.sin(ph) * 3 * s, Math.cos(ph)])); }
    ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, [pts[0], ...H], false); ctx.stroke();
    H.forEach(p => _bioCirc(ctx, p[0], p[1], r * (0.85 + 0.12 * p[2]), g > 0.9 ? C.goud : lighten(col, 0.15), g > 0.9 ? lighten(C.goud, 0.35) : lighten(col, 0.35), 1));
    if (hormoon > 0.01) { const hp = W([k * 22 * s, -84 * s]), h = ease(hormoon); _bioCirc(ctx, hp[0], hp[1], 28 * s, rgba('#121A26', 0.55 * h), rgba(lighten(col, 0.4), 0.6 * h), 1); _tfSteroid(ctx, lerp(hp[0] + k * 180 * s, hp[0] - 2 * s, h), lerp(hp[1] - 110 * s, hp[1], h), 6 * s, Math.min(1, hormoon * 2)); uit.hormoon = hp; }
    return { H, W }; });
  // koppelvlak tussen de helften (dimeer): korte gouden streepjes als de klem dicht is
  if (g > 0.85) { ctx.save(); ctx.globalAlpha *= (g - 0.85) / 0.15; ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2 * s; ctx.setLineDash([4 * s, 4 * s]); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 12 * s, y - (70 + i * 18) * s); ctx.lineTo(x + 12 * s, y - (70 + i * 18) * s); ctx.stroke(); } ctx.restore(); }
  if (soort === 'activator') { const reik = ease(polymerase), W = helften[1].W, st = W([60 * s, -112 * s]), P = [st]; for (let i = 1; i <= 9; i++) { const u = i / 9; P.push([st[0] + u * lerp(40, 95, reik) * s, st[1] + Math.sin(u * 5 + t) * 10 * s - u * lerp(30, -20, reik) * s]); }
    ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach((p, i) => i && _bioCirc(ctx, p[0], p[1], r * 0.72, lighten(col, 0.05), lighten(col, 0.35), 1)); }
  uit.tf = [x, y - 150 * s]; uit.helix = helften[0].H[8]; ctx.restore(); return uit;
}

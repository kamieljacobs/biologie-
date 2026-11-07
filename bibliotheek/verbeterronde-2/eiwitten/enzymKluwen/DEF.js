// ENZYM met actieve plek (goud) — verbeterronde 2 eiwitten (28 okt 2026): variant C als kralenketen. Zelfde omtrek, holte,
// induced fit, substraat, aanroep en teruggave als variant C; alleen de keten zelf is nu overal kralen (Kamiel koos de
// kralenketen voor alle eiwitten): geen spiraalveren en β-pijlen meer, en ook klein (r < 20) een keten in plaats van een
// vlakke vlek met een kralenrand.
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): een enzym is één gevouwen keten van aminozuren (kralen, zelfde
// taal als eiwitVouw en transcriptiefactor), die in lussen door een compacte kluwen loopt. Twee stukken van de buitenste
// lus zijn α-helix (kralen ± 2,3× dichter op elkaar in een golf, 3,6 per winding, voorkant licht, achterkant donker), en
// twee stukken liggen als gestrekte β-strengen naast elkaar met waterstofbruggen (teal stippels). Aan één kant een ronde
// holte (actieve plek, goud) die past bij één substraat (hier twee glucoseringen, V.kh).
// Induced fit: open (sluit 0, holte wijd) → het substraat schuift in de holte (bind 0 → 1) en de twee lippen draaien
// er ± 20° omheen dicht → het enzym knipt de binding (knip 0 → 0,5: de stukken wijken) → de holte gaat weer open en
// de stukken laten los (knip 0,5 → 1). sluit volgt standaard uit bind en knip; o.sluit kan het overschrijven.
// Bekende fouten: gladde bol met krabbel; holte die niet van vorm verandert; substraat dat in het eiwit verdwijnt; lint of veer.
// Aanroep zoals voorheen: enzymKluwen(ctx, x, y, r, {a, an, sluit, col, seed, bind, knip, sub}). Geeft terug: {plek:[x,y], lip:[x,y], rand(u)}.
// (_ekC_rand blijft ongewijzigd in lib_bio.js)
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, col = C.enzym, seed = 4, bind = 0, knip = 0, sub = (typeof V !== 'undefined' ? V.kh : C.oker) } = o;
  const b = ease(clamp(bind, 0, 1)), kn = clamp(knip, 0, 1), kn1 = ease(clamp(kn / 0.5, 0, 1)), kn2 = ease(clamp((kn - 0.5) / 0.5, 0, 1));
  const sluit = o.sluit != null ? o.sluit : b * (1 - kn2);
  const cs = Math.cos(an), sn = Math.sin(an); const W = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const R = _ekC_rand(r, seed, sluit);
  const ret = { plek: W(r * 0.7, 0), lip: W(r * 0.78, -r * 0.4), rand: u => W(Math.cos(u) * R(u), Math.sin(u) * R(u)) };
  if (a <= 0.01) return ret;
  const licht = _mixHex(col, '#FFFFFF', 0.32), donker = _mixHex(col, '#1A2740', 0.5);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const om = []; for (let k = 0; k < 72; k++) { const u = k / 72 * 6.283, rr = R(u) * 1.04; om.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(donker, 0.92), _mixHex(col, '#FFFFFF', 0.2), Math.max(1, r * 0.02));
  // één kralenketen (verbeterronde 2: geen lint, geen helixveren of β-pijlen meer): serpentine buitenring → middenring →
  // binnenring; klein (r < 20) twee ringen met grotere kralen. Helixstukken = kralen dichter op elkaar in een golf (3,6 per
  // winding, voor licht, achter donker); de twee strengen liggen naast elkaar met waterstofbruggen (teal stippels).
  { const klein = r < 20, kr = klein ? Math.max(r * 0.16, 1.8) : r * 0.075, gw = lerp(0.62, 0.3, sluit) + 0.2;
    const ringen = klein ? [[0.74, 1], [0.38, -1]] : [[0.82, 1], [0.56, -1], [0.3, 1]];
    const pad = []; ringen.forEach(([k, dir], ri) => { const b0 = gw + ri * 0.12, b1 = 6.283 - gw - ri * 0.08;
      for (let i = 0; i <= 60; i++) { const u = dir > 0 ? lerp(b0, b1, i / 60) : lerp(b1, b0, i / 60); pad.push([Math.cos(u) * R(u) * k, Math.sin(u) * R(u) * k, ri, u]); } });
    const soortVan = (ri, u) => klein ? 'l' : (ri === 0 && ((u > 1.05 && u < 2.15) || (u > 4.25 && u < 5.3))) ? 'h' : ((ri === 0 || ri === 1) && u > 2.5 && u < 3.85) ? 's' : 'l';
    const K = []; let acc = 0, hp = 0;
    for (let i = 1; i < pad.length; i++) { const p = pad[i - 1], q = pad[i]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 1e-6) continue; let d = 0;
      while (true) { const sr = soortVan(q[2], q[3]), stap = sr === 'h' ? kr * 0.85 : kr * 1.9; if (acc + (L - d) < stap) { acc += L - d; break; } d += stap - acc; acc = 0;
        const f = d / L, x0 = lerp(p[0], q[0], f), y0 = lerp(p[1], q[1], f), nx = -(q[1] - p[1]) / L, ny = (q[0] - p[0]) / L;
        if (sr === 'h') { const ph = hp / 3.6 * 6.283; hp++; K.push({ x: x0 + nx * Math.sin(ph) * kr * 1.1, y: y0 + ny * Math.sin(ph) * kr * 1.1, z: Math.cos(ph), s: sr, ri: q[2] }); }
        else { hp = 0; K.push({ x: x0, y: y0, z: 0, s: sr, ri: q[2] }); } } }
    ctx.strokeStyle = rgba(licht, 0.75); ctx.lineWidth = Math.max(1, kr * 0.45); ctx.beginPath(); bioPad(ctx, K.map(k => [k.x, k.y]), false); ctx.stroke();
    // waterstofbruggen tussen de twee strengen (buitenring ↔ middenring)
    const s1 = K.filter(k => k.s === 's' && k.ri === 0), s2 = K.filter(k => k.s === 's' && k.ri === 1);
    if (s1.length && s2.length) { ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = Math.max(1, r * 0.01); ctx.setLineDash([r * 0.02, r * 0.02]);
      s1.forEach((p, j) => { if (j % 2) return; let best = null, bd = 1e9; s2.forEach(q => { const dd = Math.hypot(q.x - p.x, q.y - p.y); if (dd < bd) { bd = dd; best = q; } }); if (best && bd < r * 0.4) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(best.x, best.y); ctx.stroke(); } }); ctx.restore(); }
    K.map((k, i) => i).sort((i, j) => K[i].z - K[j].z).forEach(i => { const k = K[i], z = k.z;
      ctx.beginPath(); ctx.arc(k.x, k.y, kr * (0.85 + 0.12 * z), 0, 6.283); shape(ctx, z > 0 ? _mixHex(col, '#FFFFFF', 0.06 + 0.1 * z) : _mixHex(_mixHex(donker, col, 0.75), '#000000', -0.15 * z), licht, Math.max(0.8, r * 0.011)); }); }
  // actieve plek: gouden rand van de holte
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); const w = lerp(0.62, 0.3, sluit) + 0.04; const hp = []; for (let k = -12; k <= 12; k++) { const u = k / 12 * w; hp.push([Math.cos(u) * R(u), Math.sin(u) * R(u)]); } ctx.beginPath(); bioPad(ctx, hp, false); ctx.stroke();
  // substraat: twee glucoseringen; schuift de holte in, wordt geknipt en laat los
  if (sub && (b > 0.01 || kn > 0.01) && typeof hexagon === 'function') { const hr = r * 0.12; const diep = R(0) + hr * 1.1; const inX = lerp(r * 1.75, diep, b);
    const p1 = [inX - kn1 * hr * 0.25 + kn2 * r * 0.7, -kn2 * r * 0.45], p2 = [inX + hr * 2.05 + kn1 * hr * 0.5 + kn2 * r * 1.0, kn2 * r * 0.3];
    if (kn1 < 0.4) { ctx.strokeStyle = _mixHex(sub, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); ctx.moveTo(p1[0] + hr * 0.85, p1[1]); ctx.lineTo(p2[0] - hr * 0.85, p2[1]); ctx.stroke(); }
    hexagon(ctx, p1[0], p1[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); hexagon(ctx, p2[0], p2[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); }
  ctx.restore(); return ret;
}

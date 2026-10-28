// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// ENZYM met actieve plek (goud) — variant C 'kralenketen met helices en β-plaat, induced fit' (ronde 2, 27 okt 2026:
// A als basis + helixveren en β-pijlen uit B; de holte sluit zichtbaar om het substraat).
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): een enzym is één gevouwen keten van aminozuren (kralen, zelfde
// taal als eiwitVouw), die in lussen door een compacte kluwen loopt. Twee stukken van de buitenste lus zijn α-helix
// (spiraalveer, ± 3,6 aminozuren per winding, voorkant licht, achterkant donker), en twee stukken liggen als β-strengen
// naast elkaar (brede pijlen, tegengesteld gericht = een kleine β-plaat). Aan één kant een ronde holte (actieve plek,
// goud) die past bij één substraat (hier twee glucoseringen, V.kh).
// Induced fit: open (sluit 0, holte wijd) → het substraat schuift in de holte (bind 0 → 1) en de twee lippen draaien
// er ± 20° omheen dicht → het enzym knipt de binding (knip 0 → 0,5: de stukken wijken) → de holte gaat weer open en
// de stukken laten los (knip 0,5 → 1). sluit volgt standaard uit bind en knip; o.sluit kan het overschrijven.
// Bekende fouten: gladde bol met krabbel; holte die niet van vorm verandert; substraat dat in het eiwit verdwijnt.
// Klein (r < 20): silhouet met kralenrand en gouden holte.
// Aanroep zoals voorheen: enzymKluwen(ctx, x, y, r, {a, an, sluit, col, seed}); nieuw: bind, knip, sub (kleur substraat;
// null = geen substraat tekenen). Geeft terug: {plek:[x,y], lip:[x,y], rand(u)}.
function _ekC_rand(r, seed, sluit) { // straal per hoek; holte rond hoek 0; lippen sluiten symmetrisch en grijpen om
  const w = lerp(0.62, 0.3, sluit);
  return u => { let rr = r * (1 + 0.06 * Math.sin(u * 5 + seed) + 0.035 * Math.sin(u * 9 + seed * 2)); const ad = Math.abs(((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI);
    if (ad < w) rr *= 1 - 0.6 * Math.sqrt(Math.max(0, 1 - Math.pow(ad / w, 2.6)));
    else if (ad < w + 0.35) rr *= 1 + 0.14 * sluit * Math.sin((ad - w) / 0.35 * Math.PI); // lip buigt om het substraat
    return rr; };
}
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
  if (r < 20) { ctx.fillStyle = _mixHex(col, '#FFFFFF', 0.15); for (let k = 0; k < 14; k++) { const u = 0.75 + k / 13 * (6.283 - 1.5); const rr = R(u) * 0.84; ctx.beginPath(); ctx.arc(Math.cos(u) * rr, Math.sin(u) * rr, r * 0.15, 0, 6.283); ctx.fill(); } }
  else {
    const kr = r * 0.075, stap = kr * 1.75, gw = lerp(0.62, 0.3, sluit) + 0.2;
    // serpentine: buitenring → middenring → binnenring; per kraal ring en hoek bewaren
    const pad = []; [[0.82, 1], [0.56, -1], [0.3, 1]].forEach(([k, dir], ri) => { const b0 = gw + ri * 0.12, b1 = 6.283 - gw - ri * 0.08;
      for (let i = 0; i <= 60; i++) { const u = dir > 0 ? lerp(b0, b1, i / 60) : lerp(b1, b0, i / 60); pad.push([Math.cos(u) * R(u) * k, Math.sin(u) * R(u) * k, ri, u]); } });
    const K = []; let acc = stap; for (let i = 1; i < pad.length; i++) { const p = pad[i - 1], q = pad[i]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); let d = 0;
      while (acc <= L - d) { d += acc; const f = d / L; K.push({ x: lerp(p[0], q[0], f), y: lerp(p[1], q[1], f), ri: q[2], u: q[3] }); acc = stap; } acc -= (L - d); }
    const soort = K.map(k => (k.ri === 0 && ((k.u > 1.05 && k.u < 2.15) || (k.u > 4.25 && k.u < 5.3))) ? 'h' : ((k.ri === 0 || k.ri === 1) && k.u > 2.5 && k.u < 3.85) ? 's' : 'l');
    const runs = []; soort.forEach((s2, i) => { if (s2 === 'l') return; const lr = runs[runs.length - 1]; if (lr && lr.s === s2 && lr.i1 === i - 1) lr.i1 = i; else runs.push({ s: s2, i0: i, i1: i }); });
    // lussen: kralenketting (alleen waar geen helix/streng ligt)
    ctx.strokeStyle = rgba(licht, 0.8); ctx.lineWidth = kr * 0.5; ctx.beginPath(); let pen = false;
    K.forEach((k, i) => { const vrij = soort[i] === 'l' || (runs.some(rn => rn.i0 === i || rn.i1 === i)); if (vrij) { pen ? ctx.lineTo(k.x, k.y) : ctx.moveTo(k.x, k.y); pen = true; } else pen = false; }); ctx.stroke();
    // doorverbinding over helix/streng heen gebeurt door het element zelf
    K.forEach((k, i) => { if (soort[i] !== 'l') return; ctx.beginPath(); ctx.arc(k.x, k.y, kr * 0.85, 0, 6.283); shape(ctx, _mixHex(donker, col, 0.75), licht, Math.max(0.8, r * 0.011)); });
    // β-strengen: brede pijlen langs de keten, buren tegengesteld
    runs.filter(rn => rn.s === 's' && rn.i1 - rn.i0 >= 2).forEach(rn => { const Q = K.slice(rn.i0, rn.i1 + 1).map(k => [k.x, k.y]); const hw = kr * 0.95; const n2 = Q.length;
      const nrm = j => { const p = Q[Math.max(0, j - 1)], q = Q[Math.min(n2 - 1, j + 1)]; const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L, dx / L, dy / L]; };
      const kop = Math.max(1, Math.round(n2 * 0.3)); const L1 = [], L2 = []; for (let j = 0; j < n2 - kop; j++) { const [nx, ny] = nrm(j); L1.push([Q[j][0] + nx * hw, Q[j][1] + ny * hw]); L2.push([Q[j][0] - nx * hw, Q[j][1] - ny * hw]); }
      const j0 = n2 - kop, [nx, ny] = nrm(j0); const pb = Q[j0], tip = Q[n2 - 1]; const [, , tx, ty] = nrm(n2 - 1);
      ctx.beginPath(); L1.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.lineTo(pb[0] + nx * hw * 1.8, pb[1] + ny * hw * 1.8); ctx.lineTo(tip[0] + tx * kr * 0.6, tip[1] + ty * kr * 0.6); ctx.lineTo(pb[0] - nx * hw * 1.8, pb[1] - ny * hw * 1.8); L2.reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath();
      shape(ctx, _mixHex(col, '#FFFFFF', 0.12), licht, Math.max(1, r * 0.012)); });
    // waterstofbruggen tussen de twee strengen
    const s1 = runs.find(rn => rn.s === 's'), s2 = runs.filter(rn => rn.s === 's')[1];
    if (s1 && s2) { ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.75); ctx.lineWidth = Math.max(1, r * 0.012); ctx.setLineDash([r * 0.02, r * 0.02]); for (let j = s1.i0 + 1; j < s1.i1; j += 2) { const p = K[j]; let best = null, bd = 1e9; for (let q = s2.i0; q <= s2.i1; q++) { const d = Math.hypot(K[q].x - p.x, K[q].y - p.y); if (d < bd) { bd = d; best = K[q]; } } if (best && bd < r * 0.4) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(best.x, best.y); ctx.stroke(); } } ctx.restore(); }
    // α-helices: spiraalveer tussen begin en eind van het stuk (achterkant donker, voorkant licht)
    runs.filter(rn => rn.s === 'h' && rn.i1 - rn.i0 >= 3).forEach(rn => { const A = K[rn.i0], B = K[rn.i1]; const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const amp = kr * 1.45, tw = Math.max(2, Math.round((rn.i1 - rn.i0) / 3.6)), N = tw * 24; const pt = j => { const u = j / N, ph = u * tw * 6.283; return [A.x + ux * (L * u + Math.cos(ph) * amp * 0.45), A.y + uy * (L * u + Math.cos(ph) * amp * 0.45), Math.cos(ph), Math.sin(ph)]; };
      const P2 = Array.from({ length: N + 1 }, (_, j) => { const p = pt(j); return [p[0] + nx * p[3] * amp, p[1] + ny * p[3] * amp, p[2]]; });
      for (const voor of [false, true]) { ctx.strokeStyle = voor ? licht : _mixHex(col, '#1A2740', 0.2); ctx.lineWidth = kr * (voor ? 1.15 : 0.85); let open = false;
        P2.forEach(p => { if ((p[2] < 0) === voor) { if (open) { ctx.stroke(); open = false; } return; } if (!open) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); open = true; } else ctx.lineTo(p[0], p[1]); }); if (open) ctx.stroke(); } });
  }
  // actieve plek: gouden rand van de holte
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); const w = lerp(0.62, 0.3, sluit) + 0.04; const hp = []; for (let k = -12; k <= 12; k++) { const u = k / 12 * w; hp.push([Math.cos(u) * R(u), Math.sin(u) * R(u)]); } ctx.beginPath(); bioPad(ctx, hp, false); ctx.stroke();
  // substraat: twee glucoseringen; schuift de holte in, wordt geknipt en laat los
  if (sub && (b > 0.01 || kn > 0.01) && typeof hexagon === 'function') { const hr = r * 0.12; const diep = R(0) + hr * 1.1; const inX = lerp(r * 1.75, diep, b);
    const p1 = [inX - kn1 * hr * 0.25 + kn2 * r * 0.7, -kn2 * r * 0.45], p2 = [inX + hr * 2.05 + kn1 * hr * 0.5 + kn2 * r * 1.0, kn2 * r * 0.3];
    if (kn1 < 0.4) { ctx.strokeStyle = _mixHex(sub, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); ctx.moveTo(p1[0] + hr * 0.85, p1[1]); ctx.lineTo(p2[0] - hr * 0.85, p2[1]); ctx.stroke(); }
    hexagon(ctx, p1[0], p1[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); hexagon(ctx, p2[0], p2[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); }
  ctx.restore(); return ret;
}

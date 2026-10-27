// ENZYM met actieve plek (goud) — variant A 'gevouwen kralenketen' (27 okt 2026).
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): een enzym is één gevouwen keten van aminozuren (kralen),
// geen bol. De keten loopt in lussen door een compacte kluwen; twee stukken aan de buitenkant zijn α-helix
// (strakke spiraal, ± 3,6 kralen per winding: kralen achter de as donkerder en kleiner). Aan één kant zit een
// holte (actieve plek, goud omrand) die precies om één substraat past. Induced fit: bij binden draait de
// bovenlip ± 20° dicht (o.sluit 0 → 1). Kleur C.enzym (grijsblauw), kralen in één vorm.
// Bekende fouten: gladde bol met een krabbellijn; holte die niet van vorm verandert; losse kralen zonder keten.
// Klein (r < 20): alleen het silhouet met een kralenrand.
// Aanroep zoals voorheen: enzymKluwen(ctx, x, y, r, {a, an, sluit, col, seed}).
// Geeft terug: {plek:[x,y] (midden van de holte), lip:[x,y], rand(an)}.
function _ekA_rand(r, seed, sluit) { // straal van het silhouet per hoek; holte rond hoek 0; bovenlip draait dicht
  return u => { let rr = r * (1 + 0.07 * Math.sin(u * 5 + seed) + 0.04 * Math.sin(u * 9 + seed * 2));
    let d = ((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI; // -π..π
    if (d < 0) d *= lerp(1, 0.4, sluit); // bovenlip (negatieve hoek) schuift naar de holte
    const ad = Math.abs(d); if (ad < 0.5) rr *= 1 - 0.5 * Math.pow(0.5 + 0.5 * Math.cos(Math.PI * ad / 0.5), 0.7);
    return rr; };
}
function _ekA_pad(r, seed, sluit, stap) { // serpentine door de kluwen: buitenring → middenring → binnenring
  const R = _ekA_rand(r, seed, sluit); const pad = [];
  [[0.8, 1], [0.54, -1], [0.28, 1]].forEach(([k, dir], ri) => { const b0 = 0.56, b1 = 6.283 - 0.56;
    for (let i = 0; i <= 40; i++) { const u = dir > 0 ? lerp(b0 + ri * 0.15, b1 - ri * 0.1, i / 40) : lerp(b1 - ri * 0.1, b0 + ri * 0.15, i / 40); const rr = R(u) * k + (k < 0.5 ? 0 : 0);
      pad.push([Math.cos(u) * rr, Math.sin(u) * rr]); } });
  pad.push([r * 0.02, r * 0.05]);
  // kralen op gelijke afstand
  const uit = []; let acc = stap; for (let i = 1; i < pad.length; i++) { const p = pad[i - 1], q = pad[i]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); let d = 0;
    while (acc <= L - d) { d += acc; const f = d / L; uit.push([lerp(p[0], q[0], f), lerp(p[1], q[1], f), Math.atan2(q[1] - p[1], q[0] - p[0])]); acc = stap; } acc -= (L - d); }
  return { R, kralen: uit };
}
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, sluit = 0, col = C.enzym, seed = 4 } = o;
  const cs = Math.cos(an), sn = Math.sin(an); const W = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const ret = { plek: W(r * 0.66, 0), lip: W(r * 0.7, -r * 0.35), rand: u => { const R = _ekA_rand(r, seed, sluit)(u); return W(Math.cos(u) * R, Math.sin(u) * R); } };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const R = _ekA_rand(r, seed, sluit);
  const omtrek = []; for (let k = 0; k < 64; k++) { const u = k / 64 * 6.283; const rr = R(u) * 1.04; omtrek.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  // silhouet: zachte vulling zodat het als één eiwit leest
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(_mixHex(col, '#1A2740', 0.5), 0.92), _mixHex(col, '#FFFFFF', 0.2), Math.max(1, r * 0.02));
  if (r < 20) { // klein: kralenrand
    ctx.fillStyle = _mixHex(col, '#FFFFFF', 0.15); for (let k = 0; k < 14; k++) { const u = 0.6 + k / 13 * (6.283 - 1.2); const rr = R(u) * 0.85; ctx.beginPath(); ctx.arc(Math.cos(u) * rr, Math.sin(u) * rr, r * 0.16, 0, 6.283); ctx.fill(); }
  } else {
    const kr = r * 0.085, stap = kr * 1.75; const { kralen } = _ekA_pad(r, seed, sluit, stap);
    // twee helixstukken op de buitenring: kralen golven loodrecht op de keten (spiraal van opzij)
    const n = kralen.length; const helix = i => (i > n * 0.06 && i < n * 0.22) || (i > n * 0.3 && i < n * 0.44);
    const P = []; let ph = 0; kralen.forEach((k, i) => { if (!helix(i)) { P.push([k[0], k[1], 0]); ph = 0; return; }
      const q = kralen[Math.min(n - 1, i + 1)]; for (const f of [0, 0.5]) { const bx = lerp(k[0], q[0], f), by = lerp(k[1], q[1], f); const nx = -Math.sin(k[2]), ny = Math.cos(k[2]); const w = Math.sin(ph / 3.6 * 6.283) * kr * 1.5; P.push([bx + nx * w, by + ny * w, Math.cos(ph / 3.6 * 6.283)]); ph++; } });
    // ketting (lijn) per stukje, met diepte, en kralen gesorteerd achter → voor
    const items = []; P.forEach((p, i) => { items.push({ z: p[2], i }); if (i) items.push({ z: (p[2] + P[i - 1][2]) / 2 - 0.05, l: i }); });
    items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = P[it.l], q = P[it.l - 1]; ctx.strokeStyle = rgba(_mixHex(col, '#FFFFFF', 0.3), 0.55 + 0.35 * (it.z + 1) / 2); ctx.lineWidth = kr * 0.45; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
      const p = P[it.i], z = (p[2] + 1) / 2; ctx.beginPath(); ctx.arc(p[0], p[1], kr * (0.8 + 0.2 * z), 0, 6.283); shape(ctx, _mixHex(_mixHex(col, '#1A2740', 0.35), col, 0.3 + 0.7 * z), _mixHex(col, '#FFFFFF', 0.35), Math.max(0.8, r * 0.012)); });
  }
  // actieve plek: goud omrand
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); ctx.beginPath(); const hp = []; for (let k = -10; k <= 10; k++) { const u = k / 10 * 0.52; const rr = R(u) * 1.0; hp.push([Math.cos(u) * rr, Math.sin(u) * rr]); } bioPad(ctx, hp, false); ctx.stroke();
  ctx.restore(); return ret;
}

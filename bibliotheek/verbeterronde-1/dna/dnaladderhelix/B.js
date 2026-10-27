// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX — variant B (beeldbank 27 okt 2026: kralen-ruggengraat, puzzelbasen blijven in de helix).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 bp per winding, rechtsdraaiend, groeven ongelijk (140°).
// De ruggengraat wisselt suiker en fosfaat af: hier per nucleotide één fosfaatkraal (donkerpaars, DNA_BASE.fosfaat) en één
// suiker (kleine vijfhoek, DNA_BASE.suiker), verbonden door een dunne lichtpaarse lijn. Zo leest de streng als een keten van
// nucleotiden, zoals in nucleotideRing. De basen houden in elke stand hun puzzelvorm: in de helix worden ze alleen in de lengte
// verkort (projectie, |Δy| / echte lengte), de breedte wordt in de helix 30 % smaller (anders overlappen buren); letters alleen als de base minder dan 40 % verkort is.
// Onder 3 px per base: effen staafjes in de basetint. Achterkant 35 % donkerder.
//  Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken; ringen (afgekeurd 27 okt 2026).
// Zelfde aanroep en terugwaarde als v2.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184;
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e;
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  const kr = Math.max(2.5, Math.min(dx * 0.26, R * 0.11)); // kraalstraal
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const donker = (h, z) => z < 0 && e > 0.05 ? _mixHex(h, '#121A26', 0.35) : h;
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? DNA_BASE.rugR : _mixHex(DNA_BASE.rugR, '#121A26', 0.45); ctx.lineWidth = Math.max(1.5, kr * 0.45); ctx.stroke();
    // kralen: fosfaat halverwege twee nucleotiden, suiker op de plek van de base
    for (let i = -0.5; i <= n - 0.5; i += 1) { const t = th(i) + (k ? off : 0), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (!zij) continue;
      const X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp); _bioCirc(ctx, X, Y, kr, donker(DNA_BASE.fosfaat, Z), donker(lighten(DNA_BASE.fosfaat, 0.4), Z), 1.2); }
    for (let i = 0; i < n; i++) { const t = th(i) + (k ? off : 0), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (!zij) continue;
      const X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp); ctx.beginPath(); for (let m = 0; m < 5; m++) { const an = -Math.PI / 2 + m * 1.2566; ctx.lineTo(X + Math.cos(an) * kr * 0.9, Y + Math.sin(an) * kr * 0.9); } ctx.closePath(); shape(ctx, donker(DNA_BASE.suiker, Z), donker(lighten(DNA_BASE.suiker, 0.35), Z), 1); } };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen;
    const k = sc, wf = 1 - e * 0.3, vol = 8 * s + DNA_BASE.len * k, f = clamp(Math.abs(B.y - A.y) / (2 * vol), 0, 1), wB = 52 * k * wf;
    if (wB < 3 || f < 0.06) { ctx.lineWidth = Math.max(2, wB); ctx.lineCap = 'butt'; const mid = (A.y + B.y) / 2; ctx.strokeStyle = donker(DNA_BASE.base[b], depth); ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = donker(DNA_BASE.base[c], depth); ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    else { const oudA = DNA_BASE.letter[b], oudC = DNA_BASE.letter[c], oudBb = DNA_BASE.base[b], oudBc = DNA_BASE.base[c];
      if (f < 0.6) { DNA_BASE.letter[b] = 'rgba(0,0,0,0)'; DNA_BASE.letter[c] = 'rgba(0,0,0,0)'; }
      DNA_BASE.base[b] = donker(oudBb, depth); DNA_BASE.base[c] = donker(oudBc, depth);
      try { ctx.save(); ctx.translate(A.x, A.y); ctx.scale(wf, f); baseRing(ctx, 0, dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); ctx.restore();
        ctx.save(); ctx.translate(B.x, B.y); ctx.scale(wf, f); baseRing(ctx, 0, -dirAB * 8 * s, c, -dirAB, { s: k, plekA }); ctx.restore();
        if (sp < 1 && e < 0.5) baseBruggen(ctx, A.x, A.y + dirAB * vol, B.y - dirAB * vol, b, k, bruggenA * (1 - e * 2)); }
      finally { DNA_BASE.letter[b] = oudA; DNA_BASE.letter[c] = oudC; DNA_BASE.base[b] = oudBb; DNA_BASE.base[c] = oudBc; } }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}

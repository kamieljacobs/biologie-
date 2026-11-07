// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX — variant A 'vlakke band' (verbeterronde 2, 28 okt 2026; Kamiel: 'de letters in de spiraal
// zijn goed, maar het is heel druk; minimalistisch en simpel, want DNA is al moeilijk genoeg').
// Recept (OpenStax Biology 2e § 14.2: 2 nm breed, 0,34 nm per basenpaar, 10 bp per winding, rechtsdraaiend, ruggengraat buiten,
// basen binnen als sporten; OpenStax Organic Chemistry § 28.2: grote groef 12 Å, kleine groef 6 Å):
//  - de tweede streng loopt 120° (niet 180°) achter de eerste: langs de rand liggen de toppen van de twee strengen dan om en om
//    120° en 240° uit elkaar, dus kleine : grote groef = 1 : 2 (was 140°: 'nauwelijks ongelijk').
//  - rechtsdraaiend: punt van streng 1 = (x0 + i·dx, y − R·cos t), diepte sin t, t = 2π·i/10 (zie ronde 1, bron.md).
//  - ruggengraat = één vlakke band (geen dubbele lijn, geen kralen); achterkant donkerder en smaller.
//  - sport = twee egale staafjes in de basekleur met een smalle naad op de paarlijn; geen puzzelrand, stippen of bruggen in de helix.
//    Letters op de staafjes zodra ze passen (staafje ≥ 16 px breed en ≥ 2 letterhoogtes lang); achterste sporten zonder letter.
//  - ladder (draai 0): de puzzelbasen met letters (baseRing) en waterstofbruggen, zoals besloten (27 okt 2026).
// Aanroep gelijk: dnaLadderHelix(ctx, x0, y, dx, seq, {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a}) → {klein(m), groot(m), top}.
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken; te veel details per sport.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const OFF = 120, n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * OFF / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184;
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e;
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  const bw = Math.max(2, 13 * s), rugV = DNA_BASE.rugR, rugA = _mixHex(DNA_BASE.rugR, '#121A26', 0.55);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? rugV : rugA; ctx.lineWidth = voor ? bw : bw * 0.75; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen;
    if (e < 0.5) { ctx.globalAlpha *= 1 - e * 2 * 0.3; const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + DNA_BASE.len * k), B.y - dirAB * (8 * s + DNA_BASE.len * k), b, k, bruggenA * (1 - e * 2)); }
    else { const achter = depth < 0, dim = achter ? 0.62 : 0; const sw = Math.min(dx * 0.42, 30 * s), mid = (A.y + B.y) / 2, gap = Math.min(2, sw * 0.12) * dirAB;
      const kb = _mixHex(DNA_BASE.base[b], '#121A26', dim), kc = _mixHex(DNA_BASE.base[c], '#121A26', dim);
      ctx.fillStyle = kb; ctx.fillRect(A.x - sw / 2, Math.min(A.y, mid - gap), sw, Math.abs(mid - gap - A.y));
      ctx.fillStyle = kc; ctx.fillRect(B.x - sw / 2, Math.min(B.y, mid + gap), sw, Math.abs(B.y - mid - gap));
      if (i === hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(A.x - sw / 2 - 3, Math.min(A.y, B.y), sw + 6, Math.abs(B.y - A.y)); }
      const fs = Math.min(sw * 0.85, 40 * s), half = Math.abs(B.y - A.y) / 2;
      if (!achter && fs >= 15 && half >= fs * 1.9) { const q = half * 0.5; text(ctx, b, A.x, A.y + dirAB * q + fs * 0.36, fTekst(fs, 700), DNA_BASE.letter[b], 'center'); text(ctx, c, B.x, B.y - dirAB * q + fs * 0.36, fTekst(fs, 700), DNA_BASE.letter[c], 'center'); } }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  const di = -fase * 10 / (2 * Math.PI); // groeven langs de bovenrand (voor labels)
  return { klein: (m) => x0 + (10 * m - OFF / 72 + di) * dx, groot: (m) => x0 + (10 * m + 5 - OFF / 72 + di) * dx, top: y - R };
}

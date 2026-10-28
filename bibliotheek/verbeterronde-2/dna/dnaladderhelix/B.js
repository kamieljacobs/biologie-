// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX — variant B 'voorkant telt' (verbeterronde 2, 28 okt 2026; Kamiel: 'de letters in de spiraal
// zijn goed, maar het is heel druk; minimalistisch en simpel').
// Recept (OpenStax Biology 2e § 14.2: 2 nm breed, 0,34 nm/bp, 10 bp per winding, rechtsdraaiend, ruggengraat buiten, basen binnen;
// OpenStax Organic Chemistry § 28.2: grote groef 12 Å, kleine 6 Å → tweede streng 120° achter de eerste, groeven 1 : 2).
// Rust door diepte, niet door weglaten: alles wat achter ligt (achterkant van de ruggengraat én de sporten waarvan het midden
// achter ligt) is een dunne, vage schaduw (30 %) zonder letter; vooraan staan de puzzelbasen zoals in de ladder (A punt ↔ T
// inkeping, C nok ↔ G sleuf), verkort tot de sport, met de letter rechtop. Zo blijft de puzzel die leerlingen uit de ladder kennen
// ook in de helix zichtbaar. Geen stippen of bruggen in de helix. Klein (sport < 14 px breed): egale staafjes.
// Aanroep gelijk: dnaLadderHelix(ctx, x0, y, dx, seq, {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a}) → {klein(m), groot(m), top}.
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken; achterkant even fel als de voorkant.
// -------------------------------------------------------------------------------------
function _dhPuzzel(ctx, x, y0, y1, hw, b) { // staaf van voet y0 tot paarlijn y1 (rand rond y1), halve breedte hw
  const sg = Math.sign(y1 - y0) || 1, L = Math.abs(y1 - y0), d = Math.min(hw * 0.5, L * 0.18), tw = hw * 0.5;
  ctx.save(); ctx.translate(x, y0); ctx.scale(1, sg); ctx.beginPath(); ctx.moveTo(-hw, 0); ctx.lineTo(hw, 0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); ctx.restore(); }
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const OFF = 120, n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * OFF / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184;
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e;
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  const bw = Math.max(2, 12 * s);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.save(); if (!voor && e >= 0.05) ctx.globalAlpha *= 0.35 + 0.65 * (1 - e); ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = voor || e < 0.05 ? bw : bw * 0.55; ctx.stroke(); ctx.restore(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen;
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + DNA_BASE.len * k), B.y - dirAB * (8 * s + DNA_BASE.len * k), b, k, bruggenA * (1 - e * 2)); }
    else { const achter = depth < -0.05; if (achter) ctx.globalAlpha *= 0.22; const hw = Math.min(dx * 0.22, 15 * s), mid = (A.y + B.y) / 2;
      if (hw * 2 < 12 || achter) { const g = Math.min(1.5, hw * 0.15) * dirAB; ctx.fillStyle = DNA_BASE.base[b]; ctx.fillRect(A.x - hw, Math.min(A.y, mid - g), hw * 2, Math.abs(mid - g - A.y)); ctx.fillStyle = DNA_BASE.base[c]; ctx.fillRect(B.x - hw, Math.min(B.y, mid + g), hw * 2, Math.abs(B.y - mid - g)); }
      else { _dhPuzzel(ctx, A.x, A.y, mid, hw, b); ctx.fillStyle = DNA_BASE.base[b]; ctx.fill(); _dhPuzzel(ctx, B.x, B.y, mid, hw, c); ctx.fillStyle = DNA_BASE.base[c]; ctx.fill();
        const fs = Math.min(hw * 1.6, 40 * s), half = Math.abs(B.y - A.y) / 2;
        if (fs >= 16 && half >= fs * 2) { const q = half * 0.45; text(ctx, b, A.x, A.y + dirAB * q + fs * 0.36, fTekst(fs, 700), DNA_BASE.letter[b], 'center'); text(ctx, c, B.x, B.y - dirAB * q + fs * 0.36, fTekst(fs, 700), DNA_BASE.letter[c], 'center'); } }
      if (i === hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(A.x - hw - 3, Math.min(A.y, B.y), hw * 2 + 6, Math.abs(B.y - A.y)); } }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  const di = -fase * 10 / (2 * Math.PI);
  return { klein: (m) => x0 + (10 * m - OFF / 72 + di) * dx, groot: (m) => x0 + (10 * m + 5 - OFF / 72 + di) * dx, top: y - R };
}

// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX — variant C (beeldbank ronde 2, 27 okt 2026): A + uit B de puzzelbasen met letters in de
// helix als er ruimte is (dx ≥ 60 px), + uit v2 een lichtere, dunnere ruggengraat.
// Draairichting gecontroleerd (zie bron.md): y = y0 − R·cos t, z = sin t (naar de kijker), t neemt toe met x → in een rechtshandig
// assenstelsel (x rechts, y omhoog, z naar je toe) is dat (x, R cos t, R sin t) = rechtsdraaiend. Bij een horizontale as loopt de
// voorste streng van linksboven naar rechtsonder (\); rechtop gezet (as verticaal) wordt dat linksonder → rechtsboven (/).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 baseparen per winding (0,34 nm per paar, 3,4 nm per winding),
// rechtsdraaiend, grote en kleine groef ongelijk (tweede streng 140° i.p.v. 180°). Ruggengraat (suiker-fosfaat) buiten, basen binnen.
//  - v3: de ruggengraat is in elke stand dezelfde lichtpaarse band als in vork()/d2Rug (D2.oud met lichte rand), dikte
//    0,2·R (min. 4 px); achterkant 35 % donkerder. In de helixstand zijn de basen staafjes in hun eigen basetint, breedte
//    0,42·dx (min. 3 px), met een smalle donkere naad op de paarlijn; achter de as donkerder. Zo blijft hij klein (R < 30) leesbaar.
//  - draai = 0: platte ladder met de puzzelbasen (ongewijzigd), sep = strengen los, fase = meedraaien.
//  Bekende fouten: linksdraaiend; even brede groeven; dunne lijntjes in de helix (v2); basen door de ruggengraat.
// x0,y = begin van de as; dx = afstand per basepaar; seq = bovenste streng. Geeft {klein(m), groot(m), top} terug.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184;
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e;
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  const rug = typeof D2 !== 'undefined' ? D2.oud : '#6E5A9E', bw = Math.max(4, lerp(16 * s, R * 0.13, e));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    const kl = voor ? _mixHex(rug, '#FFFFFF', 0.18) : _mixHex(rug, '#121A26', 0.35); ctx.strokeStyle = _mixHex(kl, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = bw; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen;
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + DNA_BASE.len * k), B.y - dirAB * (8 * s + DNA_BASE.len * k), b, k, bruggenA * (1 - e * 2)); }
    else if (dx >= 60) { const k = sc, wf = 0.75, vol = 8 * s + DNA_BASE.len * k, f = clamp(Math.abs(B.y - A.y) / (2 * vol), 0, 1), dk = depth < 0 ? 0.4 * (-depth) : 0;
      const oA = DNA_BASE.letter[b], oC = DNA_BASE.letter[c], bA = DNA_BASE.base[b], bC = DNA_BASE.base[c];
      if (f < 0.55) { DNA_BASE.letter[b] = 'rgba(0,0,0,0)'; DNA_BASE.letter[c] = 'rgba(0,0,0,0)'; }
      DNA_BASE.base[b] = _mixHex(bA, '#121A26', dk); DNA_BASE.base[c] = _mixHex(bC, '#121A26', dk);
      try { if (f > 0.04) { ctx.save(); ctx.translate(A.x, A.y); ctx.scale(wf, f); baseRing(ctx, 0, dirAB * 8 * s, b, dirAB, { s: k, plekA: 0, rand: i === hl ? C.goud : null }); ctx.restore();
        ctx.save(); ctx.translate(B.x, B.y); ctx.scale(wf, f); baseRing(ctx, 0, -dirAB * 8 * s, c, -dirAB, { s: k, plekA: 0 }); ctx.restore(); } }
      finally { DNA_BASE.letter[b] = oA; DNA_BASE.letter[c] = oC; DNA_BASE.base[b] = bA; DNA_BASE.base[c] = bC; } }
    else { const dk = depth < 0 ? 0.4 * (-depth) : 0, bwB = Math.max(3, dx * 0.42), mid = A.y + (B.y - A.y) * 0.5, g = Math.min(2, Math.abs(B.y - A.y) * 0.04);
      ctx.lineCap = 'butt'; ctx.lineWidth = bwB;
      ctx.strokeStyle = _mixHex(DNA_BASE.base[b], '#121A26', dk); ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid - g * dirAB); ctx.stroke();
      ctx.strokeStyle = _mixHex(DNA_BASE.base[c], '#121A26', dk); ctx.beginPath(); ctx.moveTo(A.x, mid + g * dirAB); ctx.lineTo(B.x, B.y); ctx.stroke();
      if (i === hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(A.x - bwB / 2 - 3, Math.min(A.y, B.y), bwB + 6, Math.abs(B.y - A.y)); } }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}

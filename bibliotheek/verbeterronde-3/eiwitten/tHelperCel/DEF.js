// ---------- T-HELPERCEL (CD4) (verbeterronde 3 eiwitten, 28 okt 2026: kralenketen) ----------
// CD4 = steeltje door het membraan + vier kralen op een rij (de vier Ig-achtige domeinen, D1 buitenaan); gebonden = goud.
// Zelfde aanroep, plaats, grootte en ankerpunten als nu; alleen de eiwitten zijn een kralenketen (_kkKluwen/_kkPad/_kkHelix uit
// verbeterronde-2/eiwitten/_hulp.js), zoals Kamiel voor alle eiwitten koos (C9, BEELDAFSPRAKEN: keten van aminozuren die vouwt,
// geen vlakke vorm). Het receptcommentaar boven de functie in lib_bio.js blijft gelden; alleen deze functie vervangen.
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0, bindAn = null, geinfecteerd = 0, sterft = 0 } = o; const st = clamp(sterft, 0, 1), gi = clamp(geinfecteerd, 0, 1);
  r = r * (1 - 0.18 * st);
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.globalAlpha *= 1 - 0.55 * st;
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      const bnd = bindAn != null && Math.abs(((an - bindAn) % 6.283 + 9.425) % 6.283 - 3.1416) < 3.1416 / n; const rc = bnd ? C.goud : C.enzym;
      // CD4 als kralenketen: kort steeltje door het membraan, dan vier kralen (de vier Ig-domeinen D4 → D1) naar buiten, licht zigzag
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st * 0.25), y + uy * (r + st * 0.25)); ctx.strokeStyle = _mixHex(rc, '#FFFFFF', 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      const kr = kn * 0.62; for (let q = 0; q < 4; q++) { const d = r + st * 0.25 + kr + q * kr * 1.85, zz = (q % 2 ? 1 : -1) * kr * 0.35; ctx.beginPath(); ctx.arc(x + ux * d - uy * zz, y + uy * d + ux * zz, kr, 0, 6.283); shape(ctx, q % 2 ? lighten(rc, 0.1) : rc, _mixHex(rc, '#FFFFFF', 0.4), 1); } }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _mixHex('#2A3448', '#6A7488', 0.6 * st), hl > 0.01 ? _mixHex(C.er, C.goud, hl) : C.er, Math.max(1.5, r * 0.022));
  // celmembraan = dubbellaag: tweede lijn iets naar binnen (vanaf r ≥ 50; kleiner blijft één lijn)
  if (r >= 50) { ctx.beginPath(); ctx.arc(x, y, r - Math.max(3, r * 0.028), 0, 6.283); ctx.strokeStyle = hl > 0.01 ? _mixHex(C.er, C.goud, hl) : C.er; ctx.lineWidth = Math.max(1, r * 0.014); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip(); for (let i = 0; i < Math.round(r * 0.8); i++) { const an = hash(i * 3.1) * 6.283, d = Math.sqrt(hash(i * 1.3)) * r; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(0.7, r * 0.012), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.15); ctx.fill(); } ctx.restore();
  // mitochondriën in de dikste kant van de rand
  for (let k = 0; k < 3; k++) { const an = Math.PI * 0.82 + (k - 1) * 0.42, rr = r * 0.88, L = r * 0.17, B = r * 0.065;
    ctx.save(); ctx.translate(x + Math.cos(an) * rr, y + Math.sin(an) * rr); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, (C.mitoFill || '#D88E7A'), (C.mitoEdge || '#F0B8A6'), 1);
    ctx.beginPath(); ctx.moveTo(-L * 0.28, 0); ctx.lineTo(L * 0.28, 0); ctx.strokeStyle = rgba((C.mitoEdge || '#F0B8A6'), 0.8); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); }
  // kern: groot, rond, donkere chromatinevlekken
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), Math.max(1.2, r * 0.018));
  ctx.fillStyle = rgba('#3E2E66', 0.45);
  for (let i = 0; i < 9; i++) { const an = hash(i * 2.1 + 5) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.72;
    ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); }
  // geïnfecteerd: virus-RNA (paars, dun) in het cytoplasma en nieuwe virusdeeltjes die uit het membraan knoppen
  if (gi > 0.01) { ctx.save(); ctx.globalAlpha *= gi; ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1, r * 0.015);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.5, rr0 = r * 0.86; ctx.beginPath(); for (let q = 0; q <= 12; q++) { const u = q / 12; const px = x + Math.cos(an + u * 0.35) * rr0 + Math.sin(u * 9 + k) * r * 0.02, py = y + Math.sin(an + u * 0.35) * rr0 + Math.cos(u * 7 + k) * r * 0.02; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
    if (typeof hivVirus === 'function') for (let k = 0; k < 3; k++) { const an = 3.6 + k * 0.7, kno = clamp(gi * 1.6 - k * 0.25, 0, 1); const vr = r * 0.14; hivVirus(ctx, x + Math.cos(an) * (r + vr * (kno * 1.2 - 0.6)), y + Math.sin(an) * (r + vr * (kno * 1.2 - 0.6)), vr, { t, rot: an, a: kno }); }
    ctx.restore(); }
  // sterft: celmembraan blaast blaasjes af
  if (st > 0.2) { ctx.save(); ctx.globalAlpha *= (st - 0.2) / 0.8; for (let k = 0; k < 6; k++) { const an = k * 1.05 + 0.3; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.02, y + Math.sin(an) * r * 1.02, r * (0.09 + 0.05 * hash(k)), 0, 6.283); shape(ctx, '#3A4458', C.er, 1); } ctx.restore(); }
  ctx.restore();
  return ret;
}

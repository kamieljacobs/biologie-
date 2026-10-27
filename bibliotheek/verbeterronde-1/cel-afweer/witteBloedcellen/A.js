// =====================================================================================
// WITTE BLOEDCELLEN (set): macrofaag, neutrofiel, B-cel, plasmacel, mestcel — naast tHelperCel. Recept (OpenStax A&P
// 18.4, 21.2, 21.4): alle rond met kern, membraan gebogen. Macrofaag (uit monocyt, 12–20 µm en groter): onregelmatig,
// amoeboïde, met schijnvoetjes; kern ingedeukt/hoefijzervormig; fagocytose = schijnvoetjes omsluiten de bacterie →
// fagosoom → versmelt met lysosomen (verteerenzymen). Bacterie ± 2 µm (± 1/10 van de macrofaag). Neutrofiel 10–12 µm,
// kern met 2–5 lobben, fijne korrels. Kleine lymfocyt (B-cel) 6–9 µm: grote ronde kern, smalle rand, receptoren
// (membraangebonden antistoffen) loodrecht op het oppervlak. Plasmacel: ovaal, kern excentrisch met
// 'wijzerplaat'-chromatine, cytoplasma vol ruw ER, lichte Golgi-zone naast de kern; scheidt antistoffen uit. Mestcel:
// rond, ronde kern, cytoplasma vol grote korrels (histamine) die bij activatie vrijkomen.
// Bekende fouten: alle witte bloedcellen hetzelfde rondje; kern in het midden; bacterie even groot als de macrofaag;
// receptoren als losse stipjes; korrels buiten de cel zonder dat ze vrijkomen.
// Stijl A: silhouet + kenmerk — rustig, vlak, alleen het onderdeel dat het celtype herkenbaar maakt in detail.
// Aanroep: witteBloedcellen(ctx, x, y, r, o) — r = straal in px (macrofaag-maat; andere soorten schalen naar hun echte
// grootte t.o.v. r tenzij o.eigen = false). o.soort = 'macrofaag' | 'neutrofiel' | 'bcel' | 'plasmacel' | 'mestcel';
// o.eet 0..1 (macrofaag/neutrofiel: bacterie insluiten → fagosoom → lysosomen), o.vrij 0..1 (mestcel: korrels vrij;
// plasmacel: antistoffen naar buiten), o.t, o.hl. Geeft { kern, rand(an), bacterie, korrel } terug.
// =====================================================================================
const _WB = { cyto: '#2C3A52', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', lyso: '#3E9A78', korrelM: '#7A4A9A', korrelN: '#C9B896', er: '#AFC0D0' };
const _WB_MAAT = { macrofaag: 1, neutrofiel: 0.58, bcel: 0.42, plasmacel: 0.6, mestcel: 0.62 }; // t.o.v. macrofaag (± 20 µm)
function _wbContour(x, y, r, f, n = 64) { const pts = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 - Math.PI; const rr = f(u); pts.push([x + Math.cos(u) * rr, y + Math.sin(u) * rr]); } return pts; }
function _wbKernLobben(ctx, pts, rr, fill, edge, lw) { ctx.lineCap = 'round'; ctx.strokeStyle = edge; ctx.lineWidth = rr * 0.35; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, fill, edge, lw); }); ctx.strokeStyle = fill; ctx.lineWidth = rr * 0.22; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); }
function witteBloedcellen(ctx, x, y, r, o = {}) {
  const { a = 1, soort = 'macrofaag', eet = 0, vrij = 0, t = 0, hl = 0, eigen = true } = o;
  const R = r * (eigen ? (_WB_MAAT[soort] || 1) : 1); const lw = Math.max(1, R * 0.012);
  const ret = { kern: [x, y], rand: an => [x + Math.cos(an) * R * 1.08, y + Math.sin(an) * R * 1.08], bacterie: null, korrel: null };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const g = (u, m, w) => Math.exp(-((u - m) * (u - m)) / (2 * w * w));
  let f;
  if (soort === 'macrofaag') {
    const e1 = ease(clamp(eet / 0.5, 0, 1)), dicht = ease(clamp((eet - 0.45) / 0.2, 0, 1));
    f = u => { let v = R * (1 + 0.06 * Math.sin(u * 3 + 0.8 + t * 0.4) + 0.04 * Math.sin(u * 5 + 2));
      [[-2.3, 0.22, 0.22], [2.0, 0.18, 0.25], [-1.0, 0.16, 0.2], [2.9, 0.14, 0.2]].forEach(([m, h, w], k) => { v += R * (h + 0.04 * Math.sin(t * 0.7 + k)) * g(u, m, w); }); // schijnvoetjes
      if (eet > 0 && eet < 0.75) { const ex = R * 0.95 * e1 * (1 - dicht), mm = lerp(0.36, 0.2, e1); v += ex * (g(u, mm, 0.075) + g(u, -mm, 0.075)) + R * 0.12 * e1 * (1 - dicht) * g(u, 0, 0.1); }
      return v; };
  } else if (soort === 'plasmacel') f = u => R * (1 + 0.28 * Math.cos(2 * u)) * (1 + 0.02 * Math.sin(u * 5)) / 1.14;
  else f = u => R * (1 + 0.03 * Math.sin(u * 4 + 1) + 0.02 * Math.sin(u * 7));
  const C0 = _wbContour(x, y, R, f);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 * hl; ctx.beginPath(); bioPad(ctx, C0, true); ctx.strokeStyle = C.goud; ctx.lineWidth = R * 0.12; ctx.stroke(); ctx.restore(); }
  // B-celreceptoren (Y'tjes) loodrecht op het oppervlak, onder de rand getekend zodat de voet verankerd is
  if (soort === 'bcel') { const n = clamp(Math.round(6.283 * R / 26), 10, 28); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(1.2, R * 0.03); ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { const an = (i + 0.15 * (hash(i * 3.1) - 0.5)) / n * 6.283; const rr = f(an - 0) , ux = Math.cos(an), uy = Math.sin(an), tx = -uy, ty = ux; const b0 = rr - 2, b1 = rr + R * 0.13, arm = R * 0.08;
      ctx.beginPath(); ctx.moveTo(x + ux * b0, y + uy * b0); ctx.lineTo(x + ux * b1, y + uy * b1); for (const sd of [-1, 1]) { ctx.moveTo(x + ux * b1, y + uy * b1); ctx.lineTo(x + ux * (b1 + arm) + tx * sd * arm * 0.75, y + uy * (b1 + arm) + ty * sd * arm * 0.75); } ctx.stroke(); } }
  // cel
  ctx.beginPath(); bioPad(ctx, C0, true); shape(ctx, _WB.cyto, _WB.rand, lw * 1.6);
  ctx.save(); ctx.beginPath(); bioPad(ctx, C0, true); ctx.clip();
  // rustige textuur
  for (let i = 0; i < 26; i++) { const an = hash(i * 5.3 + 1) * 6.283, rr = Math.sqrt(hash(i * 5.3 + 2)) * R * 0.92; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, Math.max(0.8, R * 0.009), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (soort === 'macrofaag') {
    // kern: ingedeukt (boon/hoefijzer), aan de kant tegenover de bacterie
    const kx = x - R * 0.28, ky = y + R * 0.05, kr = R * 0.34; ret.kern = [kx, ky];
    ctx.beginPath(); bioPad(ctx, _wbContour(kx, ky, kr, u => kr * (1 - 0.38 * g(u, 0, 0.45)) * (u > 0 ? 1 : 1.02), 32), true); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    // lysosomen; bij eet > 0,75 naar het fagosoom en versmelten
    const ph = [x + R * 0.45, y]; const fus = ease(clamp((eet - 0.75) / 0.2, 0, 1));
    for (let k = 0; k < 6; k++) { const an = 1.0 + k * 0.85, d = R * (0.55 + 0.12 * hash(k)); let lx = x + Math.cos(an) * d, ly = y + Math.sin(an) * d;
      if (k < 3) { lx = lerp(lx, ph[0] + Math.cos(an) * R * 0.16, fus); ly = lerp(ly, ph[1] + Math.sin(an) * R * 0.16, fus); }
      ctx.beginPath(); ctx.arc(lx, ly, R * 0.055 * (k < 3 ? 1 - fus * 0.6 : 1), 0, 6.283); shape(ctx, _WB.lyso, lighten(_WB.lyso, 0.35), lw); }
  } else if (soort === 'neutrofiel') {
    for (let i = 0; i < 70; i++) { const an = hash(i * 2.7) * 6.283, rr = Math.sqrt(hash(i * 3.9)) * R * 0.88; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, R * 0.025, 0, 6.283); ctx.fillStyle = rgba(_WB.korrelN, 0.45); ctx.fill(); }
    const L = [[-0.42, 0.1], [-0.2, -0.3], [0.15, -0.22], [0.36, 0.12]].map(([px, py]) => [x + px * R, y + py * R]); ret.kern = L[1];
    _wbKernLobben(ctx, L, R * 0.2, _WB.kern, _WB.kernR, lw * 1.3);
  } else if (soort === 'bcel') {
    const kx = x + R * 0.05, ky = y - R * 0.04, kr = R * 0.8; ret.kern = [kx, ky]; ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    ctx.fillStyle = rgba('#3E2E66', 0.45); for (let i = 0; i < 8; i++) { const an = hash(i * 2.2 + 3) * 6.283, rr = Math.sqrt(hash(i * 1.9)) * kr * 0.7; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.16, kr * 0.1, an, 0, 6.283); ctx.fill(); }
  } else if (soort === 'plasmacel') {
    // ruw ER: concentrische dubbele lijnen met ribosoomstipjes, rond een lichte Golgi-zone naast de kern
    const kx = x - R * 0.42, ky = y, kr = R * 0.4, gx = x - R * 0.02, gy = y; ret.kern = [kx, ky];
    ctx.beginPath(); ctx.arc(gx, gy, R * 0.22, 0, 6.283); ctx.fillStyle = rgba(C.golgi, 0.22); ctx.fill();
    for (let k = 0; k < 5; k++) { const rr = R * (0.38 + k * 0.13); ctx.strokeStyle = rgba(_WB.er, 0.75); ctx.lineWidth = Math.max(0.8, R * 0.012);
      for (const off of [0, R * 0.028]) { ctx.beginPath(); ctx.arc(gx, gy, rr + off, -1.25, 1.25); ctx.stroke(); }
      if (R > 40) { ctx.fillStyle = C.ribo; const n = Math.round(rr * 2.5 / (R * 0.06)); for (let i = 0; i < n; i++) { const an = -1.25 + 2.5 * (i + 0.5) / n; ctx.beginPath(); ctx.arc(gx + Math.cos(an) * (rr - R * 0.018), gy + Math.sin(an) * (rr - R * 0.018), Math.max(0.7, R * 0.012), 0, 6.283); ctx.fill(); } } }
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    ctx.fillStyle = rgba('#3E2E66', 0.6); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * kr * 0.68, ky + Math.sin(an) * kr * 0.68, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); } // wijzerplaat
    ctx.beginPath(); ctx.arc(kx, ky, kr * 0.16, 0, 6.283); ctx.fill();
  } else if (soort === 'mestcel') {
    const kx = x - R * 0.08, ky = y + R * 0.06, kr = R * 0.33; ret.kern = [kx, ky]; const vr = ease(clamp(vrij, 0, 1));
    for (let i = 0; i < 60; i++) { const an = hash(i * 4.1 + 2) * 6.283, d = R * (0.4 + 0.52 * Math.sqrt(hash(i * 2.3 + 5))); const px = x + Math.cos(an) * d, py = y + Math.sin(an) * d;
      if (Math.hypot(px - kx, py - ky) < kr * 1.15) continue; const uit = vr > 0 && Math.cos(an - 0.3) > 0.55 && d > R * 0.7; if (uit) continue;
      ctx.beginPath(); ctx.arc(px, py, R * 0.055, 0, 6.283); shape(ctx, _WB.korrelM, lighten(_WB.korrelM, 0.3), lw); if (!ret.korrel) ret.korrel = [px, py]; }
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
  }
  ctx.restore();
  // buiten de cel: bacterie bij fagocytose, vrijgekomen korrels, uitgescheiden antistoffen
  if (soort === 'macrofaag' && eet > 0) {
    const e1 = ease(clamp(eet / 0.5, 0, 1)), naar = ease(clamp((eet - 0.5) / 0.3, 0, 1)), fus = ease(clamp((eet - 0.75) / 0.25, 0, 1));
    const bx = lerp(x + R * 1.45, lerp(x + R * 1.38, x + R * 0.45, naar), e1), by = y; ret.bacterie = [bx, by];
    if (naar > 0.01) { ctx.beginPath(); ctx.arc(bx, by, R * 0.2, 0, 6.283); shape(ctx, rgba(_WB.lyso, 0.12 + 0.3 * fus), rgba(_WB.rand, 0.9), lw * 1.3); } // fagosoom (membraan van de cel)
    ctx.save(); if (fus > 0) { ctx.globalAlpha *= 1 - 0.55 * fus; } bacterieCel(ctx, bx, by, R * 0.28, { rot: 0.3 + naar, antibiotica: fus * 0.8 }); ctx.restore();
  }
  if (soort === 'mestcel' && vrij > 0.01) { const vr = ease(clamp(vrij, 0, 1)); for (let i = 0; i < 12; i++) { const an = 0.3 + (hash(i * 1.7) - 0.5) * 1.6, d = R * (1.0 + 0.45 * vr * hash(i * 5.1 + 1)); const px = x + Math.cos(an) * d, py = y + Math.sin(an) * d;
      ctx.beginPath(); ctx.arc(px, py, R * 0.04 * (1 - 0.4 * vr), 0, 6.283); ctx.fillStyle = rgba(_WB.korrelM, 0.85 * (1 - 0.3 * vr)); ctx.fill(); } }
  if (soort === 'plasmacel' && vrij > 0.01) { ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = Math.max(1, R * 0.025); ctx.lineCap = 'round';
    for (let i = 0; i < 5; i++) { const an = -0.5 + i * 0.25, d = R * (1.25 + 0.5 * ((vrij + i * 0.37) % 1)), px = x + Math.cos(an) * d, py = y + Math.sin(an) * d, k = R * 0.07, ro = an + 1.2 * i;
      ctx.save(); ctx.translate(px, py); ctx.rotate(ro); ctx.beginPath(); ctx.moveTo(0, k); ctx.lineTo(0, 0); ctx.lineTo(-k * 0.8, -k * 0.9); ctx.moveTo(0, 0); ctx.lineTo(k * 0.8, -k * 0.9); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); return ret;
}

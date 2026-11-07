// T-HELPERCEL — variant A 'neutrale cel, receptoren die binden, infectie en sterven' (27 okt 2026).
// Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets excentrisch, donker (heterochromatine);
// smalle cytoplasmarand (neutraal grijsblauw zoals celRond, rustige textuur) met 2–3 mitochondriën. CD4 =
// transmembraaneiwit, hier sterk vergroot als steeltje met twee domeinen, loodrecht op het membraan, gelijk
// verdeeld, in enzymgrijs (eiwit); de receptor waar gp120 aan bindt wordt goud (o.bindAn = hoek).
// Hiv-infectie (o.geinfecteerd 0..1): virus-RNA (paars) in het cytoplasma, nieuwe virusdeeltjes knoppen uit
// het membraan. Sterven (o.sterft 0..1): de cel krimpt, wordt grauw en blaast blaasjes af (apoptose).
// Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12; ASHM 'HIV structure and organisation'.
// Bekende fouten: kleine kern met veel cytoplasma (monocyt); receptoren los naast de cel; betekeniskleuren
// (teal, groen) als versiering.
// Aanroep zoals voorheen: tHelperCel(ctx, x, y, r, {a, t, cd4, hl}); nieuw: bindAn, geinfecteerd, sterft.
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
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = _mixHex(rc, '#FFFFFF', 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      for (let q = 0; q < 2; q++) { ctx.beginPath(); ctx.ellipse(x + ux * (r + st * (0.55 + q * 0.45) + kn * 0.4), y + uy * (r + st * (0.55 + q * 0.45) + kn * 0.4), kn * 0.95, kn * 0.75, an, 0, 6.283); shape(ctx, rc, _mixHex(rc, '#FFFFFF', 0.4), 1); } }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _mixHex('#2A3448', '#6A7488', 0.6 * st), hl > 0.01 ? _mixHex(C.er, C.goud, hl) : C.er, Math.max(1.5, r * 0.022));
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

// HIV-DEELTJE — variant A (27 okt 2026): RNA als twee dunne paarse strengen (C1: RNA paars) en versmelten op
// een stuk celmembraan (dubbellaag) in dezelfde aanroep: envelop en celmembraan worden zichtbaar één laag.
// Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel; Env-spikes (gp41-steel +
// gp120-trimeer), loodrecht en gelijk verspreid; kegelvormig capside (p24) met twee enkelstrengs RNA's.
// Fusie: gp120 bindt CD4 + corecepor, gp41 versmelt envelop en celmembraan; het deeltje opent aan de onderkant.
// Bron: ASHM 'HIV structure and organisation'; Briggs & Kräusslich 2011; Zhu e.a. 2006.
// Bekende fouten: stekelbol; rond capside; DNA in plaats van RNA; fusie zonder doelmembraan.
// Aanroep zoals voorheen: hivVirus(ctx, x, y, r, {a, t, rot, fuseer, n}); nieuw: membraan (standaard aan zodra
// fuseer > 0). Het membraan ligt op y + r (raaklijn onderkant), zoals in de oude afspraak.
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12, membraan = null } = o; const mem = membraan == null ? fuseer > 0.01 : membraan; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  // doelmembraan (celmembraan van de T-cel): dubbellaag, licht gebogen (stuk van een grote cirkel), ligt op y + r
  if (mem) { const Rm = r * 22, cyM = yb + Rm; const lwm = Math.max(5, r * 0.13), llm = Math.max(1.3, r * 0.03); const gat = f > 0.01 ? (r * 0.75 * f + r * 0.3) / Rm : 0;
    const boog = (b0, b1) => { ctx.beginPath(); ctx.arc(0, cyM, Rm, -Math.PI / 2 + b0, -Math.PI / 2 + b1); };
    for (const [b0, b1] of (gat > 0 ? [[-0.075, -gat], [gat, 0.075]] : [[-0.075, 0.075]])) { boog(b0, b1); ctx.strokeStyle = _mixHex(C.coral || '#E07A5F', '#FFFFFF', 0.3); ctx.lineWidth = lwm; ctx.stroke(); boog(b0, b1); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lwm - 2 * llm; ctx.stroke(); } }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba('#E07A5F', 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    ctx.beginPath(); ctx.moveTo(px - nx * r * 0.05, py - ny * r * 0.05); ctx.lineTo(px + nx * r * 0.14, py + ny * r * 0.14); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.2); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h]) => { ctx.beginPath(); ctx.arc(px + nx * r * h + tx * sd * ks * 0.95, py + ny * r * h + ty * sd * ks * 0.95, ks, 0, 6.283); shape(ctx, (C.coralL || '#F0A88F'), lighten((C.coralL || '#F0A88F'), 0.35), 1); });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1, r * 0.03);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}


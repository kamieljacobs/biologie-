// =====================================================================================
// BACTERIE (E. coli). Recept: staafje 2–4 µm lang, 0,7–1 µm breed (BioNumbers 104113: K-12 2,6–4,0 × 0,68–1,04 µm),
// getekend als 1 : 0,28; ronde polen, soms licht gebogen. Gramnegatief: buitenmembraan + dunne celwand (peptidoglycaan)
// als één lichte band, periplasma als smalle donkere spleet, celmembraan als tweede lichte lijn → dubbele rand.
// Binnen: nucleoïde (paarse kluwen, zonder membraan), ribosomen als dichte kleine stippen (±20 nm, tienduizenden),
// een paar polysomen (kralensnoertjes). Buiten: 4–6 flagellen, 5–10 µm lang (2–4× de cel), helix met spoed ±2,3 µm
// (BioNumbers 100095), bij zwemmen gebundeld achter de cel; honderden fimbriae, kort en fijn, loodrecht op de wand.
// Kleur van de cel = allel (teal gevoelig, oker resistent). Gedood: 40%, wand open, inhoud lekt.
// Flagel: basaal lichaam (motor) zit in het celmembraan en steekt door wand en buitenmembraan; daarbuiten een korte
// gebogen haak, dan de lange helixdraad. Plasmide: kleine ring (2–200 kb), duidelijk los van de nucleoïde, met een vrije
// zone eromheen zodat hij als ringetje leesbaar is.
// Bekende fouten: flagel die als losse lus buiten de cel begint; kern met membraan; wand en membraan als één lijn; flagel als kort haartje; plasmide even groot als het chromosoom.
// Parameters gelijk aan de oude versie; extra: o.t (fase van de flagelgolf), o.flagel (lengte flagel × cel, standaard 1,25),
// o.fimbriae (standaard: aan vanaf 150 px).
// =====================================================================================
function _bacOmtrek(L, r, d, bend, N = 40) {
  const half = L / 2, top = [], bot = [];
  const rad = (x) => { let q = r; const e = Math.abs(x) - (half - r); if (e > 0) q = r * Math.sqrt(Math.max(0, 1 - (e / r) * (e / r))); if (d > 0) q *= 1 - d * 0.88 * Math.exp(-Math.pow(x / (r * 0.95), 2)); return q; };
  for (let i = 0; i <= N; i++) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); top.push([x, b - rad(x)]); }
  for (let i = N - 1; i >= 1; i--) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); bot.push([x, b + rad(x)]); }
  return top.concat(bot); }
function bacterie(ctx, x, y, len, rot = 0, o = {}) {
  const { type = 'gevoelig', plasmide = 0, dood = 0, deling = 0, a = 1, focus = false, seed = 1, zweep = true, t = 0, flagel = 1.25 } = o;
  const fimb = o.fimbriae !== undefined ? o.fimbriae : len >= 150;
  const kl = type === 'resistent' ? EVO.a2 : EVO.a1, L = len, r = len * 0.14, half = L / 2;
  const bendA = (hash(seed * 3.7 + 0.3) - 0.5) * 0.36 * r, bend = (px) => bendA * (1 - Math.pow(px / half, 2)), B = (px, py) => [px, py + bend(px)];
  ctx.save(); ctx.globalAlpha *= a * (dood ? 0.4 : 1); ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = L > 200 ? 48 : 28;
  const buiten = _bacOmtrek(L, r, deling, bend, N);
  // flagellen: draad (achter de cel) vanaf de haak op de wand in een boog naar achteren de bundel in; het basale lichaam wordt na de wand getekend
  const FL = [];
  if (zweep && !dood) {
    const nf = L < 100 ? 2 : 4 + Math.floor(hash(seed * 1.9) * 3), lf = L * flagel, lam = L * 1.12, amp = L * 0.085;
    ctx.strokeStyle = rgba('#C9D4E0', 0.6); ctx.lineWidth = Math.max(1, r * 0.05);
    for (let i = 0; i < nf; i++) { const h = hash(i * 5.1 + seed), zij = i % 2 ? 1 : -1; const sx = lerp(-half * 0.75, half * 0.1, h); const sy = bend(sx) + zij * r;
      const bx = -half - L * 0.22, by = bend(-half) + (h - 0.5) * r * 0.5, ph = t * 6.283 + i * 0.8, hk = r * 0.32;
      FL.push([sx, sy, zij]);
      // haak: eerst recht naar buiten, dan knik naar achteren
      const Pf = [[sx, sy], [sx, sy + zij * hk * 0.7], [sx - hk * 0.5, sy + zij * hk * 1.1]]; const mx = lerp(sx, -half, 0.55); Pf.push([mx, bend(mx) + zij * r * (1.35 + 0.15 * h)]); Pf.push([-half - L * 0.06, lerp(bend(-half) + zij * r * 0.85, by, 0.5)]);
      const nst = 26; for (let k = 0; k <= nst; k++) { const dd = k / nst * lf, ramp = Math.min(1, dd / (lam * 0.35)); Pf.push([bx - dd, by + Math.sin(dd / lam * 6.283 - ph) * amp * ramp + (h - 0.5) * r * 0.25 * (1 - dd / lf)]); }
      ctx.beginPath(); bioPad(ctx, Pf, false); ctx.stroke();
      ctx.strokeStyle = rgba('#C9D4E0', 0.85); ctx.lineWidth = Math.max(1.4, r * 0.08); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx, sy + zij * hk * 0.8, sx - hk * 0.5, sy + zij * hk * 1.1); ctx.stroke(); // haak iets dikker
      ctx.strokeStyle = rgba('#C9D4E0', 0.6); ctx.lineWidth = Math.max(1, r * 0.05); } }
  // fimbriae: kort, fijn, loodrecht op de wand
  if (fimb && !dood) { ctx.strokeStyle = rgba('#C9D4E0', 0.32); ctx.lineWidth = 1; ctx.beginPath(); const dichte = _mvGelijk(buiten, Math.max(5, L / 70), true);
    for (let i = 0; i < dichte.length - 1; i++) { const q = dichte[i], h = hash(i * 3.3 + seed); const fl = r * (0.16 + 0.14 * h), tilt = (h - 0.5) * 0.6;
      const nx = -q.nx, ny = -q.ny; const ex = q.x + (nx * Math.cos(tilt) - ny * Math.sin(tilt)) * fl, ey = q.y + (nx * Math.sin(tilt) + ny * Math.cos(tilt)) * fl; ctx.moveTo(q.x, q.y); ctx.lineTo(ex, ey); } ctx.stroke(); }
  // lagen: buitenmembraan + celwand (band), periplasma, celmembraan, cytoplasma
  const ww = Math.max(1.4, r * 0.1), gp = Math.max(1.2, r * 0.07), lwM = Math.max(1, r * 0.035);
  const wand = _bacOmtrek(L - 2 * ww, r - ww, deling, bend, N), mem = _bacOmtrek(L - 2 * (ww + gp), r - ww - gp, deling, bend, N);
  _mvPad(ctx, buiten); ctx.fillStyle = _mvL(kl, 0.15); ctx.fill();
  _mvPad(ctx, wand); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.14); ctx.fill();
  _mvPad(ctx, mem); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.24); ctx.fill();
  if (L > 40) { // binnenkant
    ctx.save(); _mvPad(ctx, mem); ctx.clip();
    const nc = deling > 0.5 ? [-L * 0.24, L * 0.24] : [-L * 0.06 + (hash(seed * 2.2) - 0.5) * L * 0.04];
    const nrx = deling > 0.5 ? L * 0.15 : L * 0.22, nry = r * 0.6;
    // ribosomen
    const nr = Math.min(1100, Math.round(L * r * 2 / (L < 150 ? 210 : 300))), rr = Math.max(0.9, r * 0.024);
    ctx.fillStyle = rgba(C.ribo, 0.42);
    for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * L * 0.96, py = (hash(i * 3.9 + seed * 1.7) - 0.5) * r * 1.8;
      if (nc.some(cx => Math.pow((px - cx) / (nrx * 1.05), 2) + Math.pow(py / (nry * 1.1), 2) < 1)) continue; const [qx, qy] = B(px, py); ctx.beginPath(); ctx.arc(qx, qy, rr, 0, 6.283); ctx.fill(); }
    if (L >= 300) { ctx.fillStyle = rgba(_mvL(C.ribo, 0.2), 0.75); // polysomen: kralensnoertjes van ribosomen op één mRNA
      for (let p = 0; p < 7; p++) { const h = hash(p * 9.1 + seed); const px0 = (h - 0.5) * L * 0.8, py0 = (hash(p * 4.3 + seed) - 0.5) * r * 1.3; if (nc.some(cx => Math.abs(px0 - cx) < nrx * 1.1 && Math.abs(py0) < nry * 1.1)) continue;
        const an = hash(p * 6.7) * 6.283; for (let k = 0; k < 5; k++) { const [qx, qy] = B(px0 + Math.cos(an + k * 0.25) * k * rr * 3.2, py0 + Math.sin(an + k * 0.25) * k * rr * 3.2); ctx.beginPath(); ctx.arc(qx, qy, rr * 1.15, 0, 6.283); ctx.fill(); } } }
    // nucleoïde(n)
    const dw = clamp(L / 110, 1.5, 6);
    nc.forEach((cx, j) => nucleoide(ctx, cx, 0, nrx, nry, { w: dw, lussen: L < 120 ? 7 : L < 300 ? 11 : 15, seed: seed + j * 11, T: B, fase: t, helix: false }));
    // plasmiden: kleine ringen dubbelstrengs DNA, buiten de nucleoïde, richting de polen; altijd helemaal binnen het celmembraan (Kamiel 23 okt 2026)
    if (plasmide) { const ri = r - ww - gp - lwM, rp = Math.max(5, Math.min(L * 0.075, ri * 0.4)), PL = [[0.8, -1], [-0.78, 1], [0.86, 1], [-0.7, -1]];
      for (let i = 0; i < plasmide; i++) { const [u, zij] = PL[i % 4]; const vy = zij * Math.max(0, ri - rp * 1.6 - 1) * 0.6; const px = u * (half - ri * 0.6 - rp * 1.4); const [qx, qy] = B(px, vy);
        // vrije zone: ribosomen eromheen wegdekken zodat de ring los staat
        ctx.beginPath(); ctx.arc(qx, qy, rp * 1.55, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.24); ctx.fill();
        plasmideRing(ctx, qx, qy, rp, { gen: true, seed: seed + i }); } }
    ctx.restore();
  }
  // randen: buitenmembraan (licht), binnenrand van de wand, celmembraan als dubbele lijn bij grote cellen
  ctx.strokeStyle = _mvL(kl, 0.45); ctx.lineWidth = Math.max(1.2, r * 0.035);
  if (dood) { const per = Math.max(10, L * 0.09); ctx.setLineDash([per, per * 0.45]); }
  _mvPad(ctx, buiten); ctx.stroke();
  ctx.strokeStyle = rgba(_mvL(kl, 0.3), 0.7); ctx.lineWidth = Math.max(0.8, lwM * 0.7); _mvPad(ctx, wand); ctx.stroke();
  ctx.strokeStyle = _mvL(kl, 0.4); ctx.lineWidth = lwM; _mvPad(ctx, mem); ctx.stroke();
  if (L >= 300) { const mem2 = _bacOmtrek(L - 2 * (ww + gp) - lwM * 5, r - ww - gp - lwM * 2.5, deling, bend, N); ctx.strokeStyle = rgba(_mvL(kl, 0.4), 0.6); ctx.lineWidth = lwM * 0.7; _mvPad(ctx, mem2); ctx.stroke(); }
  ctx.setLineDash([]);
  // basaal lichaam: klein motortje in het celmembraan, verbonden met de haak buiten de wand
  if (L >= 150) for (const [sx, sy, zij] of FL) { const q = [sx, sy - zij * (ww + gp)]; ctx.strokeStyle = rgba('#C9D4E0', 0.85); ctx.lineWidth = Math.max(1.2, r * 0.05); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(sx, sy); ctx.stroke();
    roundRect(ctx, q[0] - r * 0.07, q[1] - r * 0.045, r * 0.14, r * 0.09, r * 0.03); shape(ctx, rgba('#C9D4E0', 0.5), '#C9D4E0', Math.max(0.8, r * 0.02)); }
  if (dood && L > 40) { // inhoud lekt door een gat in de wand
    const gx = (hash(seed * 4.4) - 0.5) * L * 0.5; ctx.fillStyle = rgba(C.ribo, 0.7);
    for (let i = 0; i < 12; i++) { const h = hash(i * 3.1 + seed); const [qx, qy] = B(gx + (h - 0.5) * r * 1.2, -r - hash(i * 5.3) * r * 0.9); ctx.beginPath(); ctx.arc(qx, qy, Math.max(1, r * 0.035), 0, 6.283); ctx.fill(); } }
  if (focus) { const f = _bacOmtrek(L + 18, r + 9, deling, bend, N); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; _mvPad(ctx, f); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// PLASMIDE. Recept: klein ringvormig dubbelstrengs DNA (E. coli-plasmiden 2–200 kb tegen 4600 kb chromosoom), vaak
// meerdere kopieën; in de cel licht superspiraal, hier als golvende ring. Resistentiegen = stuk van de ring in oker (allel 2).
// =====================================================================================
function plasmideRing(ctx, x, y, r, o = {}) {
  const { gen = true, a = 1, seed = 1, fase = 0 } = o; if (a <= 0.01) return; const w = Math.max(1.8, r * 0.2);
  const ring = (a0, a1, n) => { const P = []; for (let i = 0; i <= n; i++) { const th = a0 + (a1 - a0) * i / n; const rr = r * (1 + 0.07 * Math.sin(th * 3 + seed) + 0.04 * Math.sin(th * 5 + seed * 2)); P.push([x + Math.cos(th) * rr, y + Math.sin(th) * rr]); } return P; };
  ctx.save(); ctx.globalAlpha *= a;
  const P = ring(0, 6.283, 36); P.pop(); dnaDraad(ctx, P, { w, dicht: true, fase });
  if (gen) dnaDraad(ctx, ring(-0.7, 0.9, 10), { w: w * 1.35, kleur: EVO.a2, donker: _mvD(EVO.a2, 0.35), fase });
  ctx.restore(); }


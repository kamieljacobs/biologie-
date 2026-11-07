// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// BLAASJE VERSMELT MET HET CELMEMBRAAN — ronde 2 (exocytose; 'endo' = omgekeerd). Recept: het celmembraan is een stuk
// van een cirkel (de cel is rond). Een blaasje (± 50–100 nm, membraan even dik als het celmembraan) komt
// van binnen aan, legt aan, de twee membranen gaan op één plek in elkaar over (porie), de porie wordt wijder
// en het blaasjesmembraan wordt deel van het celmembraan (een Ω-vorm die vlak trekt). De inhoud gaat naar
// buiten. Een membraaneiwit uit het blaasje komt in het celmembraan te staan, met zijn suikerketen naar
// buiten (in het blaasje wees die naar binnen, naar het lumen). Niets steekt vóór de fusie buiten het membraan.
// Ronde 2: het membraan is zichtbaar een stuk van de cel (standaard R = 420 en een breed stuk, span = 0,5 R,
// dezelfde kromming als celDier); in groot formaat (s ≥ 2,2) verschijnen de fosfolipidekoppen en -staarten.
// Bron: OpenStax Biology 2e § 4.4 (blaasjes van de transkant versmelten met het plasmamembraan en geven de
// inhoud af buiten de cel; het eiwit wordt een vast deel van het celmembraan); § 5.4 (bulktransport).
// Bekende fouten: blaasje dat tegen het membraan verdwijnt; membraan als rechte lijn; blaasje dat al buiten
// het membraan uitsteekt voor de fusie; suikerketen die na de fusie naar binnen wijst.
// Gebruik: blaasjeVersmelt(ctx, x, y, s, { a, t, f = 0..1, richting = 'exo'|'endo', R = 420, rot = −π/2,
//   rv = 22, span, lading = true, eiwit = true, cytoplasma = true, alleenMembraan = false }). (x, y) = fusieplek op het membraan,
//   rot = richting naar buiten, R = straal van de cel (ontwerpeenheden). In een cel: geef cx, cy, hoek en
//   rFn(φ) (straal van het membraan per hoek, ontwerpeenheden) mee, dan sluit het naadloos aan; het
//   membraan buiten ± span tekent de cel zelf.
// Geeft ankerpunten terug: { blaasje, membraan, lading, eiwit, porie }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
function blaasjeVersmelt(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, richting = 'exo', R = 420, rot = -Math.PI / 2, rv = 22, lading = true, eiwit = true, cytoplasma = true, alleenMembraan = false, dikte = 6, rand = C.er } = o;
  const f = clamp(richting === 'endo' ? 1 - (o.f ?? 0) : (o.f ?? 0), 0, 1); const U = o.span ?? (typeof o.rFn === 'function' ? rv * 3.4 : R * 0.42);
  // afbeelding lokaal (u langs het membraan, v naar binnen) → scherm
  const cel = typeof o.rFn === 'function'; const Cx = cel ? o.cx : x - Math.cos(rot) * R * s, Cy = cel ? o.cy : y - Math.sin(rot) * R * s, f0 = cel ? o.hoek : rot;
  const rr = (phi) => cel ? o.rFn(phi) : R; const R0 = rr(f0);
  const M = (u, v) => { const phi = f0 + u / R0; const r = (rr(phi) - v) * s; return [Cx + Math.cos(phi) * r, Cy + Math.sin(phi) * r]; };
  // fasen: 0–0,45 aanvoer, 0,45–0,55 aanleggen, 0,55–1 porie opent en het blaasje trekt vlak
  const aan = ease(clamp(f / 0.45, 0, 1)), leg = ease(clamp((f - 0.45) / 0.1, 0, 1)), fus = ease(clamp((f - 0.55) / 0.45, 0, 1));
  const op = fus > 0 ? lerp(0.35, Math.PI - 0.06, fus) : 0; const rc = rv * (1 + 0.55 * op / Math.PI); const vc = fus > 0 ? rc * Math.cos(op) : lerp(rv * 3.6, rv + dikte * 0.5, aan) - leg * dikte * 0.45;
  // middellijn van het membraan
  let pts = [];
  if (fus <= 0) { for (let i = 0; i <= 120; i++) pts.push([-U + 2 * U * i / 120, 0]); }
  else { const nk = rc * Math.sin(op); const N1 = 48;
    for (let i = 0; i <= N1; i++) pts.push([lerp(-U, -nk, i / N1), 0]);
    const Nc = 48; for (let i = 1; i < Nc; i++) { const th = lerp(2 * Math.PI - op, op, i / Nc); pts.push([rc * Math.sin(th), vc - rc * Math.cos(th)]); }
    for (let i = 0; i <= N1; i++) pts.push([lerp(nk, U, i / N1), 0]);
    for (let it = 0; it < 4; it++) pts = pts.map((p, i) => (i === 0 || i === pts.length - 1) ? p : [(pts[i - 1][0] + 2 * p[0] + pts[i + 1][0]) / 4, (pts[i - 1][1] + 2 * p[1] + pts[i + 1][1]) / 4]); }
  const offs = (lst, d) => lst.map((p, i) => { const q = lst[Math.max(0, i - 1)], r2 = lst[Math.min(lst.length - 1, i + 1)]; const tx = r2[0] - q[0], ty = r2[1] - q[1], l = Math.hypot(tx, ty) || 1; return [p[0] - ty / l * d, p[1] + tx / l * d]; });
  const cIn = fus > 0 ? [0, vc] : [0, vc];
  const anker = { blaasje: M(0, vc), membraan: M(U * 0.75, 0), lading: M(0, fus > 0.5 ? -rv * fus : vc), eiwit: M(0, fus > 0 ? vc + rc : vc + rv), porie: M(0, 0) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.7);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (lst) => { ctx.beginPath(); lst.forEach((p, i) => { const [X, Y] = M(p[0], p[1]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); };
  // cytoplasma onder het membraan (sector), de beker na de fusie hoort bij buiten
  if (cytoplasma && !cel) { pad(pts); for (let i = 0; i <= 80; i++) { const u = U - 2 * U * i / 80; const [X, Y] = M(u, rv * 4.4); ctx.lineTo(X, Y); } ctx.closePath(); ctx.fillStyle = rgba('#2A3448', 0.85); ctx.fill(); }
  // blaasje vóór de fusie: eigen dubbel membraan
  const kring = (d) => { const l = []; for (let i = 0; i <= 48; i++) { const th = i / 48 * 6.283; l.push([Math.sin(th) * (rv + d), vc - Math.cos(th) * (rv + d)]); } return l; };
  if (alleenMembraan) { /* alleen het membraanstuk (blaasje reist nog) */ } else if (fus <= 0) { pad(kring(0)); ctx.fillStyle = _mixHex(C.ves, '#1A2740', 0.55); ctx.fill(); }
  else { pad(pts.slice(48, pts.length - 48)); ctx.closePath(); ctx.fillStyle = rgba(_mixHex(C.ves, '#1A2740', 0.55), 1 - fus); ctx.fill(); }
  // membranen (twee lijnen per dubbellaag)
  ctx.strokeStyle = rand; ctx.lineWidth = lw(1.5);
  for (const d of [-dikte / 2, dikte / 2]) { pad(offs(pts, d)); ctx.stroke(); }
  if (fus <= 0 && !alleenMembraan) for (const d of [-dikte / 2, dikte / 2]) { pad(kring(d)); ctx.closePath(); ctx.stroke(); }
  // groot formaat: fosfolipiden (koppen op beide lagen, staarten naar binnen)
  if (s >= 2.2) {
  const lipiden = (lst, gesloten) => { const cum = [0]; for (let i = 1; i < lst.length; i++) cum.push(cum[i - 1] + Math.hypot(lst[i][0] - lst[i - 1][0], lst[i][1] - lst[i - 1][1]));
    const tot = cum[cum.length - 1], stap = 3.6, n = Math.floor(tot / stap);
    for (let k = 0; k <= n; k++) { const dd = k * stap + (gesloten ? 0 : (tot - n * stap) / 2); let i = 1; while (i < lst.length - 1 && cum[i] < dd) i++; const uu = (dd - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]);
      const p = [lerp(lst[i - 1][0], lst[i][0], uu), lerp(lst[i - 1][1], lst[i][1], uu)]; const tx = lst[i][0] - lst[i - 1][0], ty = lst[i][1] - lst[i - 1][1], l = Math.hypot(tx, ty) || 1, nx = -ty / l, ny = tx / l;
      for (const sg of [-1, 1]) { const hk = [p[0] + nx * sg * dikte / 2, p[1] + ny * sg * dikte / 2]; const st = [p[0] + nx * sg * 1.2, p[1] + ny * sg * 1.2];
        const [HX, HY] = M(hk[0], hk[1]), [SX, SY] = M(st[0], st[1]); if (s > 0.45) { ctx.strokeStyle = rgba(C.oker, 0.55); ctx.lineWidth = lw(0.8); ctx.beginPath(); ctx.moveTo(HX, HY); ctx.lineTo(SX, SY); ctx.stroke(); }
        ctx.fillStyle = rand; ctx.beginPath(); ctx.arc(HX, HY, Math.max(0.8, 1.05 * s), 0, 6.283); ctx.fill(); } } };
  lipiden(pts, false); if (fus <= 0 && !alleenMembraan) lipiden(kring(0), true); }
  // lading: deeltjes die na het openen van de porie naar buiten verspreiden
  if (lading && !alleenMembraan) { ctx.fillStyle = C.oker; for (let i = 0; i < 8; i++) { const an = hash(i * 7 + 1) * 6.283, d = Math.sqrt(hash(i * 7 + 2)) * rv * 0.6; let u = Math.cos(an) * d, v = vc + Math.sin(an) * d;
      if (fus > 0) { const k = clamp((fus - 0.15) / 0.85, 0, 1); u = u * (1 + 2.2 * k) + Math.sin(t * 2 + i) * 2 * k; v = lerp(v, -rv * (0.6 + 1.6 * hash(i * 7 + 3)), ease(k)); }
      const [X, Y] = M(u, v); ctx.beginPath(); ctx.arc(X, Y, 3.1 * s, 0, 6.283); ctx.fill(); } }
  // membraaneiwit met suikerketen naar het lumen (= straks naar buiten)
  if (eiwit && !alleenMembraan) { const th = Math.PI; const pc = fus > 0 ? [rc * Math.sin(th), vc - rc * Math.cos(th)] : [0, vc + rv]; const naar = fus > 0 ? [0, -1] : [0, -1];
    const [X0, Y0] = M(pc[0], pc[1] + dikte * 0.8), [X1, Y1] = M(pc[0], pc[1] - dikte * 0.8); ctx.strokeStyle = lighten(C.enzym, 0.25); ctx.lineWidth = lw(5); ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y1); ctx.stroke();
    const g0 = M(pc[0], pc[1] - dikte * 0.8), g1 = M(pc[0], pc[1] - dikte * 0.8 - 7), g2 = M(pc[0] - 4, pc[1] - dikte * 0.8 - 11), g3 = M(pc[0] + 4, pc[1] - dikte * 0.8 - 12);
    ctx.strokeStyle = C.groen; ctx.lineWidth = lw(1.4); ctx.beginPath(); ctx.moveTo(...g0); ctx.lineTo(...g1); ctx.lineTo(...g2); ctx.moveTo(...g1); ctx.lineTo(...g3); ctx.stroke();
    ctx.fillStyle = C.groen; for (const g of [g1, g2, g3]) { ctx.beginPath(); ctx.arc(g[0], g[1], 1.8 * s + 0.6, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}

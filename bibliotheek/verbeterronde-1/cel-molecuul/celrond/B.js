// CEL (rond, dierlijke cel) — variant B 'levende cel met focus en exocytose' (27 okt 2026).
// Recept (C9; OpenStax Biology 2e 4.3–4.4 en 5.1): een vrije cel is rond en vol; kern ± 1/3 van de diameter, uit
// het midden; ruw ER om de kern, golgi ernaast, mitochondriën ± 0,15 r, lysosomen, blaasjes, vrije ribosomen
// als rustige textuur, cytoskelet als dunne lijnen. Het membraan is op celschaal een gladde dubbele lijn
// (5–10 nm tegen ± 20 µm: losse fosfolipiden zie je pas bij inzoomen, daarvoor is membraanBoog) met hier en
// daar een eiwit dat aan beide kanten uitsteekt. Detail volgt de focus (C1/C9): o.focus = 'kern'|'er'|'golgi'|
// 'mito'|'membraan' krijgt vol detail, de rest is een rustig silhouet met halve dekking.
// Beweging (t): organellen schuiven in kleine schokjes langs het cytoskelet; membraan golft licht.
// Exocytose (o.versmelt 0..1, BEELDAFSPRAKEN): een blaasje loopt van de golgi naar het membraan (0–0,5), legt
// aan (0,5–0,65), het membraan opent en het blaasje wordt deel van het membraan (0,65–0,85), de inhoud gaat
// naar buiten (0,85–1).
// Bekende fouten: lege cel; kern in het midden; membraan dikker dan een organel; blaasje dat gewoon verdwijnt.
// Aanroep zoals voorheen: celRond(ctx, cx, cy, r, {a, t, s, a0, a1, organellen, eiwitten}); nieuw: focus,
// versmelt, exoAn (hoek waar het blaasje versmelt), seed.
// Geeft ankerpunten terug: {kern:[x,y,r], er, golgi, mito, blaasje, membraan(an)}.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, a0 = 0, a1 = 6.283, organellen = true, eiwitten = null, seed = 1, focus = null, versmelt = 0, exoAn = 3.75 } = o;
  const T = clamp(r * 0.035, 2.5, 12);                       // dubbele lijn: smal, zoals een membraan op celschaal
  const kx = cx + r * 0.16, ky = cy - r * 0.08, kr = r * 0.32;
  const gA = 3.5, gx = kx + Math.cos(gA) * (kr + r * 0.2), gy = ky + Math.sin(gA) * (kr + r * 0.2);
  const v = clamp(versmelt, 0, 1);
  // blaasje-pad: golgi → membraan
  const mx0 = cx + Math.cos(exoAn) * (r - T - r * 0.05), my0 = cy + Math.sin(exoAn) * (r - T - r * 0.05);
  const loop = ease(clamp(v / 0.5, 0, 1)), aan = ease(clamp((v - 0.5) / 0.15, 0, 1)), open = ease(clamp((v - 0.65) / 0.2, 0, 1)), uit = ease(clamp((v - 0.85) / 0.15, 0, 1));
  const vr = r * 0.05;
  const bx = lerp(gx, mx0, loop) + Math.cos(exoAn) * aan * r * 0.03, by = lerp(gy, my0, loop) + Math.sin(exoAn) * aan * r * 0.03;
  const ret = { kern: [kx, ky, kr], er: [kx + Math.cos(0.9) * (kr + r * 0.12), ky + Math.sin(0.9) * (kr + r * 0.12)], golgi: [gx, gy],
    mito: [cx + Math.cos(2.3) * r * 0.64, cy + Math.sin(2.3) * r * 0.64], blaasje: [bx, by], membraan: an => [cx + Math.cos(an) * (r - T / 2), cy + Math.sin(an) * (r - T / 2)] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const F = n => (focus == null || focus === n) ? 1 : 0.45;           // dekking per onderdeel
  const vol = n => focus === n || (focus == null && r >= 150);          // vol detail?
  const golf = an => 1 + 0.008 * Math.sin(an * 3 + t * 0.8 + seed) + 0.005 * Math.sin(an * 7 - t * 0.6);
  // opening in het membraan bij exocytose (halve breedte in radialen)
  const gat = open * (vr * 1.1 / r) * (1 - 0.5 * uit);
  const dAng = an => Math.abs(((an - exoAn) % 6.283 + 9.425) % 6.283 - 3.1416);
  const ring = (rr, k0, k1) => { ctx.beginPath(); let eerst = true; for (let i = 0; i <= 160; i++) { const an = lerp(k0, k1, i / 160); if (gat > 0 && dAng(an) < gat) { eerst = true; continue; }
      const q = rr * golf(an) + (gat > 0 ? Math.max(0, 1 - dAng(an) / (gat * 2.2)) * vr * 0.5 * (1 - uit) : 0); const px = cx + Math.cos(an) * q, py = cy + Math.sin(an) * q; if (eerst) { ctx.moveTo(px, py); eerst = false; } else ctx.lineTo(px, py); } };
  ctx.beginPath(); for (let i = 0; i <= 96; i++) { const an = i / 96 * 6.283, q = (r - T / 2) * golf(an); i ? ctx.lineTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q) : ctx.moveTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q); } ctx.closePath();
  ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill(); ctx.save(); ctx.clip();
  // textuur
  for (let i = 0, n = Math.round(r * r / 330); i < n; i++) { const an = hash(i * 5 + 1 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + 2 + seed)) * r; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(0.7, r * 0.005), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.13); ctx.fill(); }
  const schuif = (i) => { const k = Math.floor(t * 0.6 + hash(i + seed)); const f = ease(clamp((t * 0.6 + hash(i + seed) - k) / 0.35, 0, 1)); const an = hash(i * 3 + 1) * 6.283; const d = r * 0.02 * (k % 2 ? f : 1 - f); return [Math.cos(an) * d, Math.sin(an) * d]; };
  if (organellen) {
    ctx.strokeStyle = rgba(C.line, 0.22); ctx.lineWidth = 0.75; for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283 + 0.4; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); ctx.stroke(); }
    // ER: zakken als vloeiende band om de kern
    ctx.save(); ctx.globalAlpha *= F('er'); for (let k = 0; k < 3; k++) { const R0 = kr + r * (0.06 + k * 0.055); ctx.beginPath(); ctx.arc(kx, ky, R0, -0.3 + k * 0.1, 2.3 - k * 0.1); ctx.strokeStyle = rgba(C.er, 0.75); ctx.lineWidth = Math.max(2, r * 0.022); ctx.stroke(); ctx.strokeStyle = rgba('#2A3448', 0.9); ctx.lineWidth = Math.max(0.8, r * 0.009); ctx.stroke();
      if (vol('er')) { ctx.fillStyle = C.ribo; for (let i = 0; i < 18; i++) { const an = lerp(-0.3 + k * 0.1, 2.3 - k * 0.1, i / 17); ctx.beginPath(); ctx.arc(kx + Math.cos(an) * (R0 + r * 0.017), ky + Math.sin(an) * (R0 + r * 0.017), Math.max(0.9, r * 0.006), 0, 6.283); ctx.fill(); } } } ctx.restore();
    // golgi
    ctx.save(); ctx.globalAlpha *= F('golgi'); ctx.translate(gx, gy); ctx.rotate(gA + Math.PI / 2); for (let k = 0; k < 4; k++) { const w = r * (0.25 - k * 0.025), yy = -k * r * 0.04; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08, w / 2, yy); ctx.lineWidth = Math.max(2, r * 0.022); ctx.strokeStyle = C.golgi; ctx.stroke(); } ctx.restore();
    // mitochondriën
    ctx.save(); ctx.globalAlpha *= F('mito'); const mL = r * 0.16;
    for (let k = 0; k < 7; k++) { const an = 1.8 + k * 0.62 + (hash(k * 9 + seed) - 0.5) * 0.25, rr = r * (0.6 + 0.14 * hash(k * 4 + seed)); const [dx, dy] = schuif(k); const px = cx + Math.cos(an) * rr + dx, py = cy + Math.sin(an) * rr + dy;
      if (Math.hypot(px - gx, py - gy) < r * 0.16) continue; ctx.save(); ctx.translate(px, py); ctx.rotate(an + 1.4 + (hash(k) - 0.5)); roundRect(ctx, -mL / 2, -mL * 0.2, mL, mL * 0.4, mL * 0.2); shape(ctx, C.mito, C.mitoR, 1);
      if (vol('mito')) { ctx.strokeStyle = C.mitoR; ctx.lineWidth = 1; ctx.beginPath(); for (let q = 0; q <= 8; q++) { const qx = -mL * 0.4 + q * mL * 0.1; ctx.lineTo(qx, q % 2 ? mL * 0.12 : -mL * 0.12); } ctx.stroke(); } ctx.restore(); } ctx.restore();
    // lysosomen en blaasjes
    for (let k = 0; k < 4; k++) { const an = [4.2, 5.6, 0.7, 2.6][k], rr = r * [0.5, 0.62, 0.62, 0.42][k]; const [dx, dy] = schuif(k + 30); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.032, 0, 6.283); shape(ctx, rgba(C.lyso, 0.8), lighten(C.lyso, 0.3), 1); }
    // kern
    ctx.save(); ctx.globalAlpha *= F('kern'); ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, rgba(C.kern, 0.75), C.kernR, Math.max(1.2, r * 0.008));
    if (vol('kern')) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(C.kernR, 0.35); ctx.lineWidth = Math.max(0.8, r * 0.004); for (let i = 0; i < 6; i++) { const P = []; let px = kx + (hash(i + 3) - 0.5) * kr * 1.3, py = ky + (hash(i + 8) - 0.5) * kr * 1.3, h = hash(i * 7) * 6.283; for (let q = 0; q < 7; q++) { P.push([px, py]); h += (hash(i * 10 + q) - 0.5) * 1.6; px += Math.cos(h) * kr * 0.2; py += Math.sin(h) * kr * 0.2; } ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); } ctx.restore(); }
    ctx.beginPath(); ctx.arc(kx - kr * 0.2, ky + kr * 0.15, kr * 0.22, 0, 6.283); ctx.fillStyle = rgba('#4A3A78', 0.95); ctx.fill(); ctx.restore();
  }
  ctx.restore();
  // blaasje (exocytose): binnen = eigen membraan; na openen loopt de rand over in het celmembraan
  if (v > 0.001) { const kom = 1 - open; ctx.save();
    if (kom > 0.02) { ctx.beginPath(); ctx.arc(bx, by, vr, 0, 6.283); shape(ctx, rgba(C.ves, 0.55), C.vesR, Math.max(1.2, T * 0.3)); }
    const inh = 7; for (let i = 0; i < inh; i++) { const an = hash(i * 3) * 6.283, d = hash(i * 5) * vr * 0.6; const ox = Math.cos(exoAn) * uit * r * (0.08 + 0.12 * hash(i * 7)); const oy = Math.sin(exoAn) * uit * r * (0.08 + 0.12 * hash(i * 7));
      ctx.beginPath(); ctx.arc(bx + Math.cos(an) * d + ox + Math.cos(an) * uit * r * 0.05, by + Math.sin(an) * d + oy + Math.sin(an) * uit * r * 0.05, Math.max(1.2, r * 0.008), 0, 6.283); ctx.fillStyle = C.vesR; ctx.fill(); }
    ctx.restore(); }
  // membraan: dubbele lijn, gesloten of met een opening waar het blaasje versmelt
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1, T * 0.32);
  for (const rr of [r - T * 0.16, r - T + T * 0.16]) { ring(rr, a0, a1); ctx.stroke(); }
  ctx.save(); ctx.globalAlpha *= 0.35; ctx.lineWidth = T * 0.5; ctx.strokeStyle = C.oker; ring(r - T / 2, a0, a1); ctx.stroke(); ctx.restore();
  if (gat > 0) { const lip = [-1, 1].map(sd => exoAn + sd * gat); ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1, T * 0.32); lip.forEach(an => { const p = [cx + Math.cos(an) * (r - T / 2), cy + Math.sin(an) * (r - T / 2)]; ctx.beginPath(); ctx.arc(p[0], p[1], T * 0.5, 0, 6.283); ctx.stroke(); }); }
  const eiw = eiwitten || Array.from({ length: Math.max(3, Math.round(r / 28)) }, (_, i) => i / Math.max(3, Math.round(r / 28)) * 6.283 + 0.3 + hash(i + seed) * 0.3);
  eiw.forEach(e => { if (gat > 0 && dAng(e) < gat * 3) return; if (a1 - a0 < 6.28 && (e < a0 || e > a1)) return; ctx.save(); ctx.translate(cx + Math.cos(e) * (r - T / 2) * golf(e), cy + Math.sin(e) * (r - T / 2) * golf(e)); ctx.rotate(e); roundRect(ctx, -T * 0.9, -T * 0.42, T * 1.8, T * 0.84, T * 0.42); shape(ctx, C.enzym, lighten(C.enzym, 0.3), 1); ctx.restore(); });
  ctx.restore(); return ret;
}

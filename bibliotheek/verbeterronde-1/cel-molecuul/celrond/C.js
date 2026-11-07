// CEL (rond, dierlijke cel) — variant C 'volle cel, detail schaalt mee, met exocytose' (ronde 2, 27 okt 2026: A + blaasje uit B).
// Recept (C9; OpenStax Biology 2e 4.3–4.4): een vrije cel is rond; kern ± 1/3 van de celdiameter en niet in het
// midden, met dubbel kernmembraan, kernporiën, chromatine als vage vlekken en een kernlichaampje; ruw ER als
// gebogen platte zakken die om de kern liggen (ribosomen aan de buitenkant); golgi als stapel van 4–5 gebogen
// zakjes naast de kern met blaasjes; mitochondriën ± 1–2 µm tegen een cel van ± 20 µm (lengte ± 0,15 r);
// lysosomen en blaasjes klein; vrije ribosomen als rustige textuur; cytoskelet als dunne lijnen (#8FA0B5).
// Membraan: dubbellaag van fosfolipiden (kop + twee staarten), sterk vergroot; de dikte schaalt mee met r
// (± 10 % van r, max 34 px), anders wordt een kleine cel een stekelbol. Detailniveau: r ≥ 150 alles met
// fosfolipiden; 60 ≤ r < 150 membraan als dubbele lijn met koppen, organellen eenvoudiger; r < 60 gladde
// dubbele lijn, alleen kern + enkele organellen. Alle inhoud ligt geclipt binnen het membraan.
// Beweging (t): organellen schokken een klein beetje langs het cytoskelet, het membraan golft nauwelijks.
// Bekende fouten: lege cel met vijf losse organellen; kern precies in het midden; membraan dikker dan een
// organel; mitochondriën die bij een kleine cel groter blijven dan de kern.
// Exocytose (o.versmelt 0..1, BEELDAFSPRAKEN): een blaasje (eigen membraan) gaat van de golgi naar het celmembraan
// (0–0,5), legt aan (0,5–0,65), het celmembraan opent en het blaasjesmembraan wordt een kuiltje ín het
// celmembraan (0,65–0,85) dat vlak trekt terwijl de inhoud naar buiten gaat (0,85–1). Het blaasje blijft
// steeds binnen of ín het membraan, nooit erbuiten. o.exoAn = hoek van de versmeltplek.
// Aanroep zoals voorheen: celRond(ctx, cx, cy, r, {a, t, s, a0, a1, organellen, eiwitten}); nieuw: seed.
// s (optioneel) volgt anders automatisch uit r: s = clamp(r / 250, 0.25, 1.5).
// Geeft ankerpunten terug: {kern:[x,y,r], er:[x,y], golgi:[x,y], mito:[x,y], membraan(an) → [x,y]}.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [], seed = 1, versmelt = 0, exoAn = 3.75 } = o;
  const s = o.s != null ? o.s : clamp(r / 250, 0.25, 1.5);
  const T = clamp(r * 0.1, 4, 34) * Math.min(1.3, Math.max(0.7, s));   // membraandikte
  const rIn = r - T;                                                     // binnenkant membraan
  const kx = cx + r * 0.17, ky = cy - r * 0.1, kr = r * 0.32;
  const gA = 3.55, gx = kx + Math.cos(gA) * (kr + r * 0.2), gy = ky + Math.sin(gA) * (kr + r * 0.2);
  const v = clamp(versmelt, 0, 1), loop = ease(clamp(v / 0.5, 0, 1)), aan = ease(clamp((v - 0.5) / 0.15, 0, 1)), open = ease(clamp((v - 0.65) / 0.2, 0, 1)), uit = ease(clamp((v - 0.85) / 0.15, 0, 1));
  const vr = Math.max(4, r * 0.055), rM = r - T / 2; // blaasjesstraal, hartlijn membraan
  const ux0 = Math.cos(exoAn), uy0 = Math.sin(exoAn); const dStop = rM - T / 2 - vr; // binnenkant tegen het membraan
  const bD = lerp(Math.hypot(gx - cx, gy - cy), dStop, loop) + aan * (T / 2) ; const bAn = lerp(Math.atan2(gy - cy, gx - cx), exoAn, loop);
  const bx = cx + Math.cos(bAn) * bD, by = cy + Math.sin(bAn) * bD;
  const gatAn = open > 0 ? (vr * (1 - 0.3 * uit)) / rM : 0;
  const ret = { blaasje: [bx, by], kern: [kx, ky, kr], er: [kx + Math.cos(0.9) * (kr + r * 0.12), ky + Math.sin(0.9) * (kr + r * 0.12)], golgi: [gx, gy],
    mito: [cx + Math.cos(2.4) * r * 0.62, cy + Math.sin(2.4) * r * 0.62], membraan: an => [cx + Math.cos(an) * (r - T / 2), cy + Math.sin(an) * (r - T / 2)] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const golf = an => 1 + 0.006 * Math.sin(an * 3 + t * 0.7 + seed) + 0.004 * Math.sin(an * 5 - t * 0.5);
  const cirkel = (rr) => { ctx.beginPath(); for (let i = 0; i <= 96; i++) { const an = i / 96 * 6.283; const q = rr * golf(an); i ? ctx.lineTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q) : ctx.moveTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q); } ctx.closePath(); };
  // cytoplasma
  cirkel(r - T * 0.5); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  const lod = r >= 150 ? 2 : r >= 60 ? 1 : 0;
  const schok = (i) => { const k = Math.floor(t * 0.8 + hash(i * 3.3 + seed)); const f = ease(clamp((t * 0.8 + hash(i * 3.3 + seed)) - k, 0, 0.3) / 0.3);
    const an0 = hash(i * 7 + k) * 6.283, an1 = hash(i * 7 + k + 1) * 6.283; const m = r * 0.012; return [lerp(Math.cos(an0), Math.cos(an1), f) * m, lerp(Math.sin(an0), Math.sin(an1), f) * m]; };
  ctx.save(); cirkel(rIn); ctx.clip();
  // rustige textuur: vrije ribosomen
  const nr = Math.round(r * r / 260); for (let i = 0; i < nr; i++) { const an = hash(i * 5 + 1 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + 2 + seed)) * rIn;
    const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr; if (Math.hypot(px - kx, py - ky) < kr + 4) continue;
    ctx.beginPath(); ctx.arc(px, py, Math.max(0.7, r * 0.0055), 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.32); ctx.fill(); }
  if (organellen) {
    // cytoskelet: dunne lijnen vanuit het centrosoom naast de kern
    if (lod >= 1) { const zx = kx + Math.cos(3.0) * (kr + r * 0.06), zy = ky + Math.sin(3.0) * (kr + r * 0.06); ctx.strokeStyle = rgba(C.line, 0.28); ctx.lineWidth = 0.75;
      for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283 + 0.2; const L = rIn * 1.6; ctx.beginPath(); ctx.moveTo(zx, zy); ctx.quadraticCurveTo(zx + Math.cos(an + 0.25) * L * 0.5, zy + Math.sin(an + 0.25) * L * 0.5, zx + Math.cos(an) * L, zy + Math.sin(an) * L); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(zx, zy, Math.max(1.5, r * 0.012), 0, 6.283); ctx.fillStyle = rgba(C.line, 0.7); ctx.fill(); }
    // ruw ER: gebogen platte zakken om de kern (van ± 0,3 tot 2,3 rad), ribosomen aan de buitenkant
    const erN = lod === 2 ? 4 : lod === 1 ? 3 : 0;
    for (let k = 0; k < erN; k++) { const R0 = kr + r * (0.055 + k * 0.05), b0 = -0.2 + k * 0.12, b1 = 2.3 - k * 0.1, dik = Math.max(1.5, r * 0.012);
      const zak = (dr) => { const P = []; for (let i = 0; i <= 30; i++) { const u = i / 30, an = lerp(b0, b1, u); const rr = R0 + dr + Math.sin(u * 6.283 * 2 + k) * r * 0.008; P.push([kx + Math.cos(an) * rr, ky + Math.sin(an) * rr]); } return P; };
      const buiten = zak(dik), binnen = zak(-dik).reverse(); ctx.beginPath(); bioPad(ctx, buiten.concat(binnen), true); shape(ctx, rgba(C.er, 0.22), rgba(C.er, 0.85), Math.max(0.8, r * 0.004));
      if (lod === 2) { ctx.fillStyle = C.ribo; for (let i = 1; i < buiten.length - 1; i += 2) { const p = buiten[i], an = Math.atan2(p[1] - ky, p[0] - kx); ctx.beginPath(); ctx.arc(p[0] + Math.cos(an) * dik * 1.3, p[1] + Math.sin(an) * dik * 1.3, Math.max(1, r * 0.007), 0, 6.283); ctx.fill(); } } }
    // golgi: 5 gebogen zakjes, bol naar de kern toe, met blaasjes aan de buitenkant
    if (lod >= 1) { const nz = lod === 2 ? 5 : 3, ang = gA; ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang + Math.PI / 2);
      for (let k = 0; k < nz; k++) { const w = r * (0.27 - k * 0.022), yy = -k * r * 0.036, th = r * 0.014; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08, w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08 - 2 * th, -w / 2, yy); ctx.closePath(); shape(ctx, rgba(C.golgi, 0.85), lighten(C.golgi, 0.3), Math.max(0.6, r * 0.003)); }
      for (let k = 0; k < 4; k++) { const sx = (k - 1.5) * r * 0.06 + (hash(k + seed) - 0.5) * r * 0.02, sy = -nz * r * 0.03 - r * 0.02 - hash(k * 2) * r * 0.03; ctx.beginPath(); ctx.arc(sx, sy, r * 0.014, 0, 6.283); shape(ctx, C.ves, C.vesR, 0.8); }
      ctx.restore(); }
    // mitochondriën (± 0,15 r lang), verdeeld in de ring tussen kern en membraan
    const nm = lod === 2 ? 8 : lod === 1 ? 5 : 2; const mL = r * 0.17;
    for (let k = 0; k < nm; k++) { const an = 1.9 + k * (4.6 / nm) + (hash(k * 9 + seed) - 0.5) * 0.3, rr = r * (0.58 + 0.16 * hash(k * 4 + seed)); const [dx, dy] = schok(k);
      const mx = cx + Math.cos(an) * rr + dx, my = cy + Math.sin(an) * rr + dy, rot = an + 1.3 + (hash(k * 5) - 0.5) * 1.2;
      if (Math.hypot(mx - kx, my - ky) < kr + mL * 0.6 || Math.hypot(mx - gx, my - gy) < r * 0.15) continue;
      if (lod === 2 && mL >= 36) mitochondrion(ctx, mx, my, mL, rot, 1, 4, t);
      else { ctx.save(); ctx.translate(mx, my); ctx.rotate(rot); roundRect(ctx, -mL / 2, -mL * 0.21, mL, mL * 0.42, mL * 0.21); shape(ctx, C.mito, C.mitoR, 1); if (lod >= 1) { ctx.strokeStyle = rgba(C.mitoR, 0.8); ctx.lineWidth = 0.8; for (let q = 0; q < 3; q++) { const qx = -mL * 0.25 + q * mL * 0.25, d = q % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(qx, d * mL * 0.2); ctx.lineTo(qx, -d * mL * 0.02); ctx.stroke(); } } ctx.restore(); } }
    // lysosomen en blaasjes
    if (lod >= 1) { for (let k = 0; k < 4; k++) { const an = [4.1, 5.5, 0.9, 2.9][k] + (hash(k * 11 + seed) - 0.5) * 0.4, rr = r * (0.5 + 0.28 * hash(k * 13 + seed)); const [dx, dy] = schok(k + 20); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.035, 0, 6.283); shape(ctx, rgba(C.lyso, 0.85), lighten(C.lyso, 0.35), 1); }
      for (let k = 0; k < 6; k++) { const an = 2.6 + k * 0.32, rr = r * (0.72 + 0.12 * hash(k * 17 + seed)); const [dx, dy] = schok(k + 40); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.02, 0, 6.283); shape(ctx, rgba(C.ves, 0.8), C.vesR, 0.8); } }
    // kern: dubbel kernmembraan met poriën, chromatine als vage vlekken, kernlichaampje
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, rgba(C.kern, 0.8), C.kernR, Math.max(1, r * 0.006));
    ctx.save(); ctx.beginPath(); ctx.arc(kx, ky, kr - 1, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#3E2E66', 0.35);
    for (let i = 0; i < 12; i++) { const an = hash(i * 2.1 + seed) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.85; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.2, kr * 0.11, an, 0, 6.283); ctx.fill(); }
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(kx - kr * 0.22, ky + kr * 0.12, kr * 0.24, kr * 0.2, 0.3, 0, 6.283); shape(ctx, rgba('#4A3A78', 0.95), rgba(C.kernR, 0.6), 1);
    if (lod >= 1) { const np = lod === 2 ? 14 : 8, rr = kr + Math.max(2, r * 0.012); ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(0.8, r * 0.004);
      for (let i = 0; i < np; i++) { const b0 = i / np * 6.283 + 0.06, b1 = (i + 1) / np * 6.283 - 0.06; ctx.beginPath(); ctx.arc(kx, ky, rr, b0, b1); ctx.stroke(); } }
  }
  ctx.restore();
  // membraan
  const delen = gatAn > 0 ? [[exoAn + gatAn, exoAn + 6.283 - gatAn]] : [[a0, a1]];
  if (lod === 2) delen.forEach(([b0, b1]) => membraanBoog(ctx, cx, cy, r - T / 2, b0, b1, { s: T / 69, eiwitten: eiwitten.filter(e => gatAn <= 0 || Math.abs(((e - exoAn) % 6.283 + 9.425) % 6.283 - 3.1416) > gatAn * 3) }));
  else { const lw = Math.max(1, T * 0.22); ctx.strokeStyle = C.er; ctx.lineWidth = lw;
    for (const rr of [r - lw / 2, rIn + lw / 2]) delen.forEach(([b0, b1]) => { ctx.beginPath(); ctx.arc(cx, cy, rr, b0, b1); ctx.stroke(); });
    if (lod === 1) { const n = Math.round(Math.abs(a1 - a0) * r / Math.max(4, T * 0.55)); ctx.fillStyle = C.er; for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); for (const rr of [r - lw, rIn + lw]) { ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(0.9, T * 0.13), 0, 6.283); ctx.fill(); } } }
    eiwitten.forEach(e => { ctx.save(); ctx.translate(cx + Math.cos(e) * (r - T / 2), cy + Math.sin(e) * (r - T / 2)); ctx.rotate(e); roundRect(ctx, -T * 0.8, -T * 0.4, T * 1.6, T * 0.8, T * 0.4); shape(ctx, C.enzym, lighten(C.enzym, 0.3), 1); ctx.restore(); }); }
  // blaasje: vóór het openen een eigen bolletje binnen het membraan; daarna een kuiltje in het membraan dat vlak trekt
  if (v > 0.001 && organellen) { const lw = Math.max(1.2, T * 0.28);
    if (open < 0.02) { ctx.beginPath(); ctx.arc(bx, by, vr, 0, 6.283); shape(ctx, rgba(C.ves, 0.7), C.vesR, lw * 0.8); }
    else { const diep = vr * 2 * (1 - uit); const px = cx + ux0 * rM, py = cy + uy0 * rM; const tx = -uy0, ty = ux0; const w = rM * gatAn;
      for (const off of [-T * 0.3, T * 0.3]) { ctx.beginPath(); ctx.moveTo(px + tx * w + ux0 * off, py + ty * w + uy0 * off); ctx.bezierCurveTo(px + tx * w * 1.3 - ux0 * (diep * 0.9 - off), py + ty * w * 1.3 - uy0 * (diep * 0.9 - off), px - tx * w * 1.3 - ux0 * (diep * 0.9 - off), py - ty * w * 1.3 - uy0 * (diep * 0.9 - off), px - tx * w + ux0 * off, py - ty * w + uy0 * off); ctx.strokeStyle = C.er; ctx.lineWidth = lw; ctx.stroke(); } }
    const n = 7; for (let i = 0; i < n; i++) { const an = hash(i * 3 + seed) * 6.283, d = hash(i * 5) * vr * 0.55; const o2 = open > 0.02 ? (uit * r * (0.05 + 0.1 * hash(i * 7)) + open * vr) : 0;
      const qx = (open > 0.02 ? cx + ux0 * (rM - vr * (1 - uit)) : bx) + Math.cos(an) * d + ux0 * o2 + Math.cos(an) * uit * r * 0.04, qy = (open > 0.02 ? cy + uy0 * (rM - vr * (1 - uit)) : by) + Math.sin(an) * d + uy0 * o2 + Math.sin(an) * uit * r * 0.04;
      ctx.beginPath(); ctx.arc(qx, qy, Math.max(1, r * 0.008), 0, 6.283); ctx.fillStyle = C.vesR; ctx.fill(); } }
  ctx.restore(); return ret;
}

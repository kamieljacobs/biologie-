// HORMOONDEELTJE — variant A 'structuurvorm per hormoon' (27 okt 2026).
// Recept (BEELDAFSPRAKEN: kleine moleculen krijgen een structuurvorm; OpenStax Biology 2e 3.3 en A&P 17.2):
// · steroïden (testosteron, oestradiol) = vier aan elkaar vastzittende koolstofringen: drie zesringen en één
//   vijfring (A-B-C-D). Testosteron: =O aan ring A en OH aan ring D; oestradiol: ring A aromatisch (cirkel in
//   de ring) en OH aan ring A én D. Paars (hormonen, C1), oestradiol lichter.
// · GnRH = decapeptide: kort kettinkje van 10 aminozuren (kralen), goud.
// · FSH en LH = glycoproteïnen uit twee ketens: een gedeelde α-keten (rond kluwentje) + een eigen β-keten,
//   met suikerketens als kleine vertakte zijtakjes. FSH: β langgerekt, twee suikertakjes (teal);
//   LH: β kort en rond, één suikertakje (groen). Vorm verschilt dus per hormoon, niet alleen de kleur
//   (kleurenblinden). Relatieve grootte: glycoproteïnen ± 30 kDa > GnRH ± 1,2 kDa ≈ steroïde 0,3 kDa,
//   hier niet op schaal (vergroot, zelfde r) maar de eiwithormonen tekenen we iets groter (k).
// · volg = gouden ring om één deeltje dat de kijker volgt (C8, geen gloed).
// Bekende fouten: alle hormonen als capsules die alleen in kleur verschillen; steroïden als bolletjes.
// Aanroep zoals voorheen: hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false); soort = gnrh | fsh | lh | testo | oestro.
const HORM_A = { gnrh: ['#E0B64A', 0.95], fsh: ['#5BA4C9', 1.25], lh: ['#7FC48F', 1.15], testo: ['#8C7BBF', 0.72], oestro: ['#B59BE0', 0.72] };
function _hormA_ring(ctx, pts, fill, rand, lw) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); }
function _hormA_steroid(ctx, r, col, soort) { // ringen A–D, ± 3,4 r breed
  const e = r * 0.5, lw = Math.max(1, r * 0.13), fill = rgba(col, 0.45), rand = _mixHex(col, '#FFFFFF', 0.4);
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const an = Math.PI / 6 + i * Math.PI / 3; return [cx + Math.cos(an) * e, cy + Math.sin(an) * e]; });
  const w = e * Math.sqrt(3); const A = [-w * 1.5, e * 0.75], B = [-w * 0.5, e * 0.75], Cc = [0, -e * 0.75];
  _hormA_ring(ctx, hex(...A), fill, rand, lw); _hormA_ring(ctx, hex(...B), fill, rand, lw); _hormA_ring(ctx, hex(...Cc), fill, rand, lw);
  // ring D: vijfring aan de rechterkant van C
  const c1 = [Cc[0] + w / 2, Cc[1] - e / 2], c2 = [Cc[0] + w / 2, Cc[1] + e / 2]; const D = [c1, [c1[0] + e * 0.95, c1[1] - e * 0.3], [c1[0] + e * 1.5, Cc[1] + e * 0.05], [c2[0] + e * 0.95, c2[1] + e * 0.3], c2];
  _hormA_ring(ctx, D, fill, rand, lw);
  ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const oh = (p, dx, dy) => { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + dx, p[1] + dy); ctx.stroke(); ctx.beginPath(); ctx.arc(p[0] + dx * 1.25, p[1] + dy * 1.25, r * 0.17, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }; // OH-groep (O teal)
  oh([c1[0] + e * 1.5, Cc[1] + e * 0.05], e * 0.55, -e * 0.25);
  const aL = [A[0] - w / 2, A[1] + e / 2]; // linksonder van ring A
  if (soort === 'testo') { ctx.beginPath(); ctx.moveTo(aL[0], aL[1]); ctx.lineTo(aL[0] - e * 0.55, aL[1] + e * 0.3); ctx.moveTo(aL[0] + e * 0.1, aL[1] + e * 0.18); ctx.lineTo(aL[0] - e * 0.45, aL[1] + e * 0.48); ctx.stroke(); ctx.beginPath(); ctx.arc(aL[0] - e * 0.7, aL[1] + e * 0.48, r * 0.17, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(A[0], A[1], e * 0.5, 0, 6.283); ctx.stroke(); oh(aL, -e * 0.55, e * 0.25); }
}
function _hormA_kluwen(ctx, cx, cy, rx, ry, n, col, sd, kr) { // kleine gevouwen keten
  const P = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 * 1.6 + sd; const rr = 0.35 + 0.65 * ((i * 0.618 + sd) % 1); P.push([cx + Math.cos(u) * rx * rr, cy + Math.sin(u) * ry * rr]); }
  ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.3); ctx.lineWidth = Math.max(0.8, kr * 0.5); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
  P.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], kr, 0, 6.283); shape(ctx, col, _mixHex(col, '#FFFFFF', 0.4), Math.max(0.6, kr * 0.25)); });
  ctx.beginPath(); ctx.ellipse(cx, cy, rx * 1.1, ry * 1.1, 0, 0, 6.283); ctx.strokeStyle = rgba(col, 0.25); ctx.lineWidth = Math.max(0.8, kr * 0.4); ctx.stroke();
}
function _hormA_suiker(ctx, x, y, dx, dy, r) { // vertakt suikertakje (oker kraaltjes)
  dx *= 0.6; dy *= 0.6; const s = r * 0.1; ctx.strokeStyle = _mixHex(C.oker, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(0.8, r * 0.08); const ex = x + dx, ey = y + dy;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.lineTo(ex + dx * 0.45 - dy * 0.35, ey + dy * 0.45 + dx * 0.35); ctx.moveTo(ex, ey); ctx.lineTo(ex + dx * 0.45 + dy * 0.35, ey + dy * 0.45 - dx * 0.35); ctx.stroke();
  [[ex, ey], [ex + dx * 0.45 - dy * 0.35, ey + dy * 0.45 + dx * 0.35], [ex + dx * 0.45 + dy * 0.35, ey + dy * 0.45 - dx * 0.35]].forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], s, 0, 6.283); ctx.fillStyle = C.oker; ctx.fill(); });
}
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, k] = HORM_A[soort] || HORM_A.gnrh; const R = r * k;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'testo' || soort === 'oestro') { ctx.translate(r * 0.15, 0); _hormA_steroid(ctx, R, col, soort); }
  else if (soort === 'gnrh') { const P = []; for (let i = 0; i < 10; i++) { const u = i / 9; P.push([lerp(-R * 1.25, R * 1.25, u), Math.sin(u * Math.PI * 1.3) * -R * 0.55 + R * 0.25]); }
    ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(0.8, R * 0.12); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
    P.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], R * 0.17, 0, 6.283); shape(ctx, col, _mixHex(col, '#FFFFFF', 0.4), Math.max(0.6, R * 0.05)); }); }
  else { const kr = Math.max(0.9, R * 0.12); // α (gedeeld, links) + β (eigen, rechts)
    _hormA_kluwen(ctx, -R * 0.42, R * 0.05, R * 0.45, R * 0.45, 9, _mixHex(col, '#8FA0B5', 0.45), 0.3, kr);
    if (soort === 'fsh') { _hormA_kluwen(ctx, R * 0.48, -R * 0.05, R * 0.6, R * 0.32, 11, col, 0.7, kr); _hormA_suiker(ctx, R * 0.6, -R * 0.35, R * 0.15, -R * 0.45, R); _hormA_suiker(ctx, R * 0.25, -R * 0.33, -R * 0.1, -R * 0.45, R); }
    else { _hormA_kluwen(ctx, R * 0.38, 0, R * 0.38, R * 0.38, 8, col, 0.7, kr); _hormA_suiker(ctx, R * 0.42, -R * 0.36, R * 0.12, -R * 0.45, R); }
    _hormA_suiker(ctx, -R * 0.55, R * 0.45, -R * 0.1, R * 0.4, R); }
  ctx.restore();
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); }
}

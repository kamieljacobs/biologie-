// HORMOONDEELTJE — variant C 'structuurvorm per hormoon, FSH/LH als gevouwen ketens' (ronde 2, 27 okt 2026: A + FSH/LH in de stijl van eiwitVouw).
// Recept (BEELDAFSPRAKEN: kleine moleculen krijgen een structuurvorm; OpenStax Biology 2e 3.3 en A&P 17.2):
// · steroïden (testosteron, oestradiol) = vier aan elkaar vastzittende koolstofringen: drie zesringen en één
//   vijfring (A-B-C-D). Testosteron: =O aan ring A en OH aan ring D; oestradiol: ring A aromatisch (cirkel in
//   de ring) en OH aan ring A én D. Paars (hormonen, C1), oestradiol lichter.
// · GnRH = decapeptide: kort kettinkje van 10 aminozuren (kralen), goud.
// · FSH en LH = glycoproteïnen uit twee ketens die tegen elkaar liggen: een gedeelde α-keten (± 92 aminozuren) en een
//   eigen β-keten; elk is een gevouwen kralenketen in de taal van eiwitVouw (helix als lussen met voor/achter,
//   twee strengen naast elkaar), met suikerketens (oker, vertakt) die aan de keten vastzitten. α in grijsblauw-getint,
//   β in de hormoonkleur. FSH: β langer en langgerekt, met twee suikertakjes (α ook twee) (teal);
//   LH: β korter en compact, met één suikertakje (groen). Op filmgrootte (r < 12) alleen de gevouwen hartlijn. Vorm verschilt dus per hormoon, niet alleen de kleur
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
function _hormC_vorm(n, s, r) {
  const st = r * 2.1 / s, hr = st * 0.5, hR = st * 0.78;   // stap streng, stap helix (as), straal helix (ontwerpeenheden)
  const nh1 = Math.max(4, Math.round(n * 0.28)), nl1 = Math.max(2, Math.round(n * 0.07)), ns = Math.max(3, Math.round(n * 0.15)), nt = 2, nl2 = Math.max(2, Math.round(n * 0.07));
  const nh2 = Math.max(3, Math.round(n * 0.22)); const nst = Math.max(0, n - (nh1 + nl1 + ns * 2 + nt + nl2 + nh2));
  const Ls = (ns - 1) * st, L1 = nh1 * hr, L2 = nh2 * hr; const out = [];
  const lijn = (p, q, k, soort) => { for (let i = 0; i < k; i++) { const u = k === 1 ? 0 : i / (k - 1); out.push([lerp(p[0], q[0], u), lerp(p[1], q[1], u) + (soort === 's' ? (i % 2 ? 3 : -3) : 0), 0, soort]); } };
  const helix = (p, q, k) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L; const hp = (i) => { const ph = i / 3.6 * 6.283, u = (i + 0.5) / k; const ax = L * u + Math.cos(ph) * hR * 0.55; return [p[0] + ux * ax - uy * Math.sin(ph) * hR, p[1] + uy * ax + ux * Math.sin(ph) * hR, Math.cos(ph), 'h']; };
    for (let i = 0; i < k; i++) { out.push(hp(i)); if (i < k - 1) for (const f of [0.25, 0.5, 0.75]) { const m = hp(i + f); m[3] = 'm'; out.push(m); } } };
  const lus = (pts, k) => { const D = bioDicht(pts, 40); const len = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); len.push(acc); });
    for (let i = 1; i <= k; i++) { const tgt = acc * i / (k + 1); let j = len.findIndex(l => l >= tgt); j = Math.max(1, j); const f = (tgt - len[j - 1]) / ((len[j] - len[j - 1]) || 1); out.push([lerp(D[j - 1][0], D[j][0], f), lerp(D[j - 1][1], D[j][1], f), 0, 'l']); } };
  const yS1 = 10, yS2 = 10 + st * 1.75, yH1 = yS1 - st * 2.5, yH2 = yS2 + st * 2.4;
  const h1a = [-Math.max(L1, Ls) / 2 - st, yH1], h1b = [h1a[0] + L1, yH1];
  helix(h1a, h1b, nh1);
  const s1a = [Ls / 2, yS1], s1b = [-Ls / 2, yS1];
  lus([h1b, [Math.max(h1b[0], Ls / 2) + st * 1.2, (yH1 + yS1) / 2], [s1a[0] + st * 0.9, yS1]], nl1);
  lijn(s1a, s1b, ns, 's');
  lus([s1b, [s1b[0] - st * 1.0, (yS1 + yS2) / 2], [s1b[0], yS2]], nt);
  const s2a = [-Ls / 2, yS2], s2b = [Ls / 2, yS2]; lijn(s2a, s2b, ns, 's');
  const h2a = [Ls / 2 + st * 0.4, yH2], h2b = [h2a[0] - L2, yH2];
  lus([s2b, [s2b[0] + st * 1.3, (yS2 + yH2) / 2], [h2a[0] + st * 0.6, yH2]], nl2);
  helix(h2a, h2b, nh2);
  let q = out[out.length - 1]; for (let i = 0; i < nst; i++) { const an = Math.PI + 0.9 * (i + 1) / Math.max(1, nst); out.push([q[0] + Math.cos(an) * st * (i + 1) * 0.8, q[1] - Math.sin(an) * st * (i + 1) * 0.5 - st * 0.4 * (i + 1), 0, 'l']); }
  const bo = out.filter(p => p[3] !== 'm'); const mx = bo.reduce((m, p) => m + p[0], 0) / bo.length, my = bo.reduce((m, p) => m + p[1], 0) / bo.length;
  const s1i = nh1 + nl1, s2i = s1i + ns + nt; const alle = []; let nb = 0;
  for (const p of out) { if (p[3] !== 'm') { if (nb >= n) break; nb++; } alle.push([(p[0] - mx) * s, (p[1] - my) * s, p[2], p[3]]); }
  return { alle, bruggen: Array.from({ length: ns }, (_, j) => [s1i + j, s2i + ns - 1 - j]) };
}
function _hormC_keten(ctx, cx, cy, w, n, col, flipx, rekx, suikers, R) { // gevouwen keten (eiwitVouw-taal) in een vak van breedte w
  const { alle } = _hormC_vorm(n, 1, 12); const xs = alle.map(p => p[0]), ys = alle.map(p => p[1]); const bw = Math.max(...xs) - Math.min(...xs), mx = (Math.max(...xs) + Math.min(...xs)) / 2, my = (Math.max(...ys) + Math.min(...ys)) / 2;
  const k = w / bw; const P = alle.map(p => [cx + (p[0] - mx) * k * (flipx ? -1 : 1) * rekx, cy + (p[1] - my) * k, p[2], p[3]]);
  const kr = k * 12, licht = _mixHex(col, '#FFFFFF', 0.38), klein = R < 12;
  const items = []; P.forEach((p, i) => { if (!klein && p[3] !== 'm') items.push({ z: p[2], i }); if (i) items.push({ z: Math.min(p[2], P[i - 1][2]) - 0.02, l: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = P[it.l], q = P[it.l - 1], z = (it.z + 1) / 2; ctx.strokeStyle = rgba(licht, 0.5 + 0.5 * z); ctx.lineWidth = Math.max(1, kr * (klein ? 0.9 : (p[3] === 'h' || p[3] === 'm' ? 0.35 + 0.35 * z : 0.35))); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
    const p = P[it.i], z = (p[2] + 1) / 2; ctx.beginPath(); ctx.arc(p[0], p[1], kr * (p[3] === 'h' ? 0.45 + 0.2 * z : 0.75), 0, 6.283); shape(ctx, _mixHex(_mixHex(col, '#1A2740', 0.4), col, 0.3 + 0.7 * z), licht, Math.max(0.6, kr * 0.1)); });
  // suikertakjes vast aan een kraal aan de rand, wijzend van het midden af
  const B = P.filter(p => p[3] !== 'm'); suikers.forEach(fi => { const p = B[Math.min(B.length - 1, Math.round(fi * (B.length - 1)))]; const dx = p[0] - cx, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1; _hormA_suiker(ctx, p[0], p[1], dx / L * R * 0.55, dy / L * R * 0.55 - R * 0.15, R); });
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
  else { const fsh = soort === 'fsh'; // α (gedeeld, links, iets grijzer) + β (eigen, rechts)
    _hormC_keten(ctx, -R * 0.58, R * 0.08, R * 0.9, 22, _mixHex(col, '#8FA0B5', 0.5), false, 1, [0.08, 0.62], R);
    if (fsh) _hormC_keten(ctx, R * 0.62, -R * 0.08, R * 1.2, 28, col, true, 1, [0.15, 0.55], R);
    else _hormC_keten(ctx, R * 0.48, -R * 0.02, R * 0.85, 19, col, true, 1, [0.4], R); }
  ctx.restore();
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); }
}

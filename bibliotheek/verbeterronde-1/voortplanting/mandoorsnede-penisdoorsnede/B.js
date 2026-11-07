// MANNELIJKE GESLACHTSORGANEN (variant B: alleen de organen, geen romp en geen endeldarm, schaambeen als stippellijn,
// blaas met spierwand en lumen, urinebuis als holle buis; o.romp = true tekent de romp toch) + PENIS IN DWARSDOORSNEDE
// als spons van schotjes.
// =====================================================================================
// MANNELIJKE GESLACHTSORGANEN, mediane doorsnede (zijaanzicht, buik = rechts), OP SCHAAL (1 cm = 14 px bij s = 1).
// Recept (cm): zaadbal 4–5 lang, bijbal 4–5 langs de achterkant; zaadleider ± 30 cm: vanaf de staart van de bijbal
// omhoog in de zaadstreng, door het lieskanaal de buik in, met een boog óver de urineleider naar de ACHTERkant van de
// blaas, verwijdt tot ampulla; zaadblaasje 4–5 × 1,5–2,5 tegen de achterkant van de blaas, boven de prostaat; samen
// vormen ze de spuitbuis die DOOR de prostaat in de urinebuis uitkomt; prostaat 3 × 4 × 5 (walnoot) onder de blaashals
// rond de urinebuis; schaambeen vóór de blaas, endeldarm achter prostaat en zaadblaasjes. Penis in rust ± 9 cm.
// Bron: OpenStax A&P 27.1 (maten zaadbal, route, aandelen sperma); Semmelweis anatomie (zaadleider ± 30 cm, over de
// urineleider, zaadblaasje, prostaat 3 × 4 × 5); Yale Guided Anatomy (zaadleider naar de achterkant van de blaas).
// Bekende fouten: zaadleider die rechtstreeks vanaf de zaadbal naar de prostaat loopt; zaadblaasje vóór de blaas;
// prostaat boven de blaas; zaadleider die in de blaas uitkomt.
// Oorsprong = bovenkant schaambeenvoeg. o.hl = { zaadbal, bijbal, leider, blaasjes, prostaat, blaas, buis, lies } 0..1,
// o.kring 0..1 (kringspier blaashals dicht), o.zw 0..1 (zwellichamen vol), o.dim = lijst van delen die 35 % krijgen.
// Geeft { P(cmX, cmY), route: [...px], naam: {deel: [x,y]} } terug.
// =====================================================================================
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5), ureter: P(-10.3, -4.2) };
  if (a <= 0.01) return { P, route, naam };
  const ctxZacht = o.context ?? 0; const al = d => (dim.includes(d) ? 0.35 : 1) * (d === 'darm' || d === 'bot' ? ctxZacht : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); if (o.romp) shape(ctx, rgba(BIO.huid, 0.05), rgba(BIO.huid, 0.45), 1.5);
  // endeldarm (achter)
  if (ctxZacht > 0.01) { ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.4); ctx.lineWidth = 2.4 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore(); }
  // schaambeen(voeg)
  ctx.save(); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); ctx.setLineDash([4, 5]); ctx.strokeStyle = rgba(BIO.bot, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas; de zaadleider kruist er in een boog óverheen) — eigen tint (urine), dunner
  const UL = Ps([[-11.4, -9.0], [-10.4, -4.4], [-8.9, -1.3], [-7.3, 0.1], [-6.3, 0.9]]);
  ctx.save(); ctx.globalAlpha *= al('ureter'); ctx.strokeStyle = '#7FB8C4'; ctx.lineWidth = 0.22 * k; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(BIO.slijm, 0.55), '#E8B4AC', 2);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.fillStyle = '#2E4A5E'; ctx.fill(); ctx.strokeStyle = rgba('#F2D6CC', 0.7); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba('#D9B48A', 0.75), '#EED4B0', 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba('#C98E7A', 0.8), '#E6B8A6', 2); ctx.restore();
  // zwellichamen + penis (rust ± 9 cm; zw maakt ze iets voller)
  ctx.save(); ctx.globalAlpha *= al('penis'); const zb = 1 + 0.12 * zw;
  ctx.beginPath(); bioPad(ctx, Ps([[0.9, 6.0], [2.6, 6.2], [3.9 * zb, 8.6], [4.05 * zb, 13.0], [3.7, 14.6], [3.1, 14.9], [2.55, 13.8], [2.45, 9.4], [2.0, 7.6], [0.7, 7.0]]), true); shape(ctx, rgba(BIO.huid, 0.22), rgba(BIO.huid, 0.75), 2);
  ctx.beginPath(); bioPad(ctx, Ps([[1.6, 6.3], [2.9, 6.5], [3.8 * zb, 8.8], [3.85 * zb, 12.9], [3.5, 13.6], [3.05, 12.8], [3.0, 9.0], [2.6, 7.2]]), true); shape(ctx, _mixHex('#8A4A48', '#B5302C', zw), rgba('#C97A70', 0.8), 1.2);
  ctx.restore();
  // zaadbal (in de balzak) met kronkelige zaadbuisjes en bijbal langs de achterkant
  ctx.save(); ctx.globalAlpha *= al('balzak'); ctx.beginPath(); bioPad(ctx, Ps([[-0.9, 10.2], [-1.5, 12.4], [-0.9, 14.6], [1.0, 15.3], [2.5, 14.4], [2.6, 12.0], [2.2, 9.9], [0.7, 9.4]]), true); shape(ctx, rgba(BIO.huid, 0.2), rgba(BIO.huid, 0.7), 2); ctx.restore();
  gl(P(1.0, 12.0), 3.0, '#D9A48F', hl.zaadbal || 0);
  ctx.save(); ctx.globalAlpha *= al('zaadbal'); const [zx, zy] = P(1.0, 12.0); ctx.translate(zx, zy); ctx.rotate(0.22); ctx.beginPath(); ctx.ellipse(0, 0, 1.3 * k, 2.2 * k, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.8), lighten('#D9A48F', 0.3), 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A4438', 0.6); ctx.lineWidth = 1.6; for (let r = 0; r < 6; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = (-1 + 2 * u) * 1.2 * k, py = (-1.8 + r * 0.7) * k + Math.sin(u * 22 + r) * 0.22 * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); ctx.restore();
  gl(P(-0.5, 11.8), 1.8, C.oker, hl.bijbal || 0);
  ctx.save(); ctx.globalAlpha *= al('bijbal'); ctx.strokeStyle = C.oker; ctx.lineWidth = 0.75 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_BIJ), false); ctx.stroke(); ctx.restore();
  // zaadleider
  { const [gx, gy] = P(-7.5, -0.1); ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, 0.8 * k, 0, 6.283); ctx.clip(); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 0.64 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke(); ctx.restore(); } // uitsparing: zaadleider ligt óver de urineleider
  const leid = hl.leider || 0; ctx.save(); ctx.globalAlpha *= al('leider'); ctx.strokeStyle = C.goud; ctx.lineWidth = (0.3 + 0.12 * leid) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke();
  const [ax, ay] = P(-7.25, 1.4); ctx.beginPath(); ctx.ellipse(ax, ay, 0.35 * k, 0.8 * k, 0.3, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); // ampulla
  // lieskanaal (schuine opening in de buikwand)
  if ((hl.lies || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.lies; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; const [lx, ly] = P(1.0, -1.6); ctx.beginPath(); ctx.ellipse(lx, ly, 0.9 * k, 1.8 * k, 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // urinebuis
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#E8D8DE'; ctx.lineWidth = (0.32 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.strokeStyle = '#2E4A5E'; ctx.lineWidth = 0.14 * k; ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE (variant B: spons van schotjes). Recept: twee zwellichamen boven in één wit vlies
// (tunica albuginea) met schot; binnenin een netwerk van schotjes (trabekels, glad spierweefsel) met holten ertussen:
// in rust smal en leeg, bij een erectie wijd en rood (bloed), het vlies spant; diepe slagader in elk zwellichaam;
// onderaan het sponsachtige lichaam met de urinebuis; rugader boven in de middellijn. Bron: OpenStax A&P 27.1;
// MSD Manual 'Structure of the male reproductive system'. Bekende fouten: één buis; urinebuis bovenin; bol met stipjes.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; const v = clamp(vul, 0, 1); const R = r * (1 + 0.22 * v);
  const ret = { cav: [x - R * 0.42, y - R * 0.16], spons: [x, y + R * 0.55], R };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const fijn = r > 30;
  ctx.beginPath(); ctx.ellipse(x, y + R * 0.05, R * 1.08, R * 1.02, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), BIO.huidS, Math.max(1, r * 0.025));
  const cr = R * 0.4, cy = y - R * 0.16, tun = Math.max(1.5, r * lerp(0.08, 0.05, v));
  const spons = (cx, cy2, rx, ry, n, sd, holte, wand) => {
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy2, rx, ry, 0, 0, 6.283); ctx.fillStyle = holte; ctx.fill(); ctx.clip();
    const pts = []; for (let i = 0; i < n; i++) { const an = i * 2.39996 + sd, rr = Math.sqrt((i + 0.5) / n) * 1.05; pts.push([cx + Math.cos(an) * rx * rr, cy2 + Math.sin(an) * ry * rr]); }
    ctx.strokeStyle = wand; ctx.lineWidth = Math.max(1, rx * lerp(0.09, 0.035, v));
    pts.forEach((p, i) => { const d = pts.map((q, j) => [Math.hypot(q[0] - p[0], q[1] - p[1]), j]).filter(e => e[1] !== i).sort((A, B) => A[0] - B[0]).slice(0, 3);
      d.forEach(([, j]) => { if (j < i) return; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(pts[j][0], pts[j][1]); ctx.stroke(); }); });
    ctx.restore(); };
  ctx.beginPath(); ctx.ellipse(x - R * 0.42, cy, cr + tun, cr * 0.95 + tun, 0, 0, 6.283); ctx.ellipse(x + R * 0.42, cy, cr + tun, cr * 0.95 + tun, 0, 0, 6.283); ctx.fillStyle = '#ECE4DA'; ctx.fill();
  for (const d of [-1, 1]) { const cx = x + d * R * 0.42; spons(cx, cy, cr, cr * 0.95, fijn ? 26 : 9, d, _mixHex('#4A2A30', '#C2453E', v), _mixHex('#B08A84', '#E0B4A8', v * 0.4));
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.1, 0, 6.283); shape(ctx, BIO.bloed, '#F0B0A0', 1); }
  const ty = cy - cr * 0.95 - tun; ctx.beginPath(); ctx.ellipse(x, ty - R * 0.06, R * 0.07, R * lerp(0.05, 0.015, v), 0, 0, 6.283); ctx.fillStyle = BIO.ader; ctx.fill();
  const sx = x, sy = y + R * 0.55; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3 + tun * 0.4, R * 0.27 + tun * 0.4, 0, 0, 6.283); ctx.fillStyle = '#ECE4DA'; ctx.fill();
  spons(sx, sy, R * 0.3, R * 0.27, fijn ? 12 : 5, 2, _mixHex('#5A2A30', '#8A3A3A', v * 0.5), '#C8A09A');
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.13, R * 0.04, 0, 0, 6.283); shape(ctx, '#2A1A22', '#E8D8DE', 1.2);
  ctx.restore(); return ret;
}

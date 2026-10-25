// Geslachtsorganen en puberteit 2.0 — tekenhulpen. Deel 1: hulpjes uit versie 1.x (tag, chip, regel, startlamp, meetlat, zaadcel, eicel, pad, vrouwSchema, eierstokGroot, cyclusKlok …).
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 26) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function bubbel(ctx, x, y, s2, col = '#F2F2EE', a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = Math.max(56, ctx.measureText(s2).width + 30); roundRect(ctx, x - w / 2, y - px - 12, w, px + 24, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 8, y + 12); ctx.lineTo(x, y + 26); ctx.lineTo(x + 8, y + 12); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 800), '#121A26', 'center'); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function knoop(ctx, x, y, w, h, t1, t2, col, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed; ctx.shadowColor = col; ctx.shadowBlur = 30; roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(col, 0.25), null); ctx.restore(); } roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(C.bgSchema, 0.95), col, 2.5); text(ctx, t1, x, y + (t2 ? -4 : 12), fTekst(34, 700), C.text, 'center'); if (t2) text(ctx, t2, x, y + 34, fTekst(24), C.text2, 'center'); ctx.restore(); }
const fadeIn = (q, w, n = 1) => q.on(w, n);

// ---------- hoofd in profiel met hypothalamus en hypofyse (zoals Hormonen 3) ----------
function hoofdProfiel(ctx, x, y, s = 1, o = {}) { // v1.1: echte hersenen in zijaanzicht (lib_bio hoofdHersenen); oorsprong blijft gelijk
  const { a = 1, hyp = 0, hth = 0 } = o; return hoofdHersenen(ctx, x + 60 * s, y + 10 * s, s * 0.72, { a, hth: Math.max(0.15, hth), hyp: Math.max(0.15, hyp), hthCol: HK.klier, hypCol: HK.klier }); }

// ---------- startlamp boven een hoofd: rood = nog niet, groen = begonnen ----------
function startlamp(ctx, x, y, groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y - 62, 52, 104, 12); shape(ctx, '#2A2F3E', '#6B7287', 2); circ(ctx, x, y - 34, 16, groen > 0.5 ? '#5A2A2A' : '#E05A4A'); circ(ctx, x, y + 14, 16, groen > 0.5 ? '#6FD08A' : '#25402E'); ctx.restore(); }
// ---------- meetlat aan de muur ----------
function meetlat(ctx, x, y0, y1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y1, 44, y0 - y1, 6); shape(ctx, '#E6D7B0', '#B8A27A', 2); ctx.strokeStyle = '#6A5A3A'; ctx.lineWidth = 2; for (let yy = y0; yy > y1 + 4; yy -= 20) { const k = Math.round((y0 - yy) / 20) % 5 === 0; ctx.beginPath(); ctx.moveTo(x - 22, yy); ctx.lineTo(x - (k ? 0 : 10), yy); ctx.stroke(); } ctx.restore(); }

// ---------- zaadcel en eicel ----------
function zaadcel(ctx, x, y, ang, t, s = 1, a = 1, col = '#F2F2EE') { zaadcelEcht(ctx, x, y, ang, t, s * 0.9, { a, col, slag: 1.6 }); } // v1.1: kop + staart ± 10× zo lang (lib_bio)
function eicel(ctx, x, y, r, a = 1) { eicelEcht(ctx, x, y, r * 0.78, a, r >= 12); } // v1.1: eicel met doorzichtige laag en stralenkrans (lib_bio)

// polyline-helpers voor routes
function padLengte(pts) { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; }
function padPunt(pts, d) { const L = padLengte(pts); d = clamp(d, 0, L[L.length - 1]); let i = 1; while (i < pts.length - 1 && L[i] < d) i++; const u = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); const x = lerp(pts[i - 1][0], pts[i][0], u), y = lerp(pts[i - 1][1], pts[i][1], u); return [x, y, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; }
function padTot(pts, k) { return padLengte(pts)[k]; }
function lijnPad(ctx, pts, col, lw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); gladC(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

// =======================================================================================
// Mannelijke geslachtsorganen, schematische doorsnede (zijaanzicht, voorkant rechts). Ontwerpcoördinaten rond (700, 480).
const MK = { zaadbal: '#D9A48F', bijbal: C.oker, leider: C.goud, blaasjes: C.groen, prostaat: C.paars, blaas: C.teal, buis: '#C9CED6', zwel: '#B5574A' };
const VAS = [[786, 752], [764, 700], [768, 630], [826, 586], [872, 470], [878, 360], [840, 285], [760, 262], [680, 290], [652, 360], [672, 440], [712, 480], [742, 498], [762, 516]];
const URETHRA = [[765, 462], [762, 500], [764, 538], [790, 566], [850, 566], [884, 590], [900, 660], [918, 740], [934, 786]];
const ZAADROUTE = [[808, 712], [792, 690], [772, 660], [770, 700], [782, 746]].concat(VAS.slice(1)).concat(URETHRA.slice(3)).concat([[948, 840]]);
// indexen in ZAADROUTE: 0 zaadbal, 2 bijbal-kop, 4 bijbal-staart, 8 langs de blaas (voor), 13 achter de blaas bij het zaadblaasje, 15 prostaat, 17 urinebuis, 22 penis-punt, 23 buiten
function manSchema(ctx, ox, oy, s, o = {}) {
  const { a = 1, hl = {}, zw = 0, buisjes = 0, t = 0, kring = 0 } = o; if (a <= 0.01) return (x, y) => [ox + (x - 700) * s, oy + (y - 480) * s];
  const P = (x, y) => [ox + (x - 700) * s, oy + (y - 480) * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(ox, oy); ctx.scale(s, s); ctx.translate(-700, -480); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const glow = (x, y, r, col, k) => { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.45 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); };
  // lichaam
  ctx.beginPath(); ctx.moveTo(430, 140); ctx.quadraticCurveTo(350, 400, 400, 600); ctx.quadraticCurveTo(440, 700, 580, 720); ctx.quadraticCurveTo(700, 730, 748, 650); ctx.lineTo(870, 548); ctx.quadraticCurveTo(940, 500, 950, 400); ctx.quadraticCurveTo(975, 260, 960, 140); ctx.closePath(); shape(ctx, rgba(C.mens, 0.14), rgba(C.mens, 0.7), 2);
  // endeldarm (achter blaas en prostaat) en schaambeen (vóór de blaas): oriëntatie
  ctx.save(); ctx.strokeStyle = rgba('#9A7A6A', 0.4); ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(560, 230); ctx.bezierCurveTo(575, 360, 585, 470, 640, 600); ctx.stroke(); ctx.strokeStyle = rgba(C.bgSchema, 0.75); ctx.lineWidth = 28; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.translate(856, 478); ctx.rotate(-0.35); ctx.beginPath(); ctx.ellipse(0, 0, 17, 44, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.55), BIO.botS, 2); ctx.restore();
  // balzak
  ctx.beginPath(); ctx.ellipse(800, 706, 76, 88, 0.12, 0, 6.283); shape(ctx, rgba(C.mens, 0.2), rgba(C.mens, 0.7), 2);
  glow(806, 706, 110, MK.zaadbal, hl.zaadbal || 0);
  // zaadbal
  ctx.beginPath(); ctx.ellipse(808, 710, 40, 52, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2);
  if (buisjes > 0.01) { ctx.save(); ctx.globalAlpha *= buisjes; ctx.beginPath(); ctx.ellipse(808, 710, 36, 48, 0.2, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba('#7A3A30', 0.8); ctx.lineWidth = 2.5; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = 778 + u * 64, py = 676 + r * 20 + Math.sin(u * 18 + r) * 7; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
  // bijbal (sikkel tegen de achterkant van de zaadbal)
  glow(774, 700, 70, MK.bijbal, hl.bijbal || 0);
  ctx.strokeStyle = MK.bijbal; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(796, 662); ctx.quadraticCurveTo(758, 664, 762, 712); ctx.quadraticCurveTo(764, 744, 788, 752); ctx.stroke();
  // blaas
  glow(770, 380, 140, MK.blaas, hl.blaas || 0);
  ctx.beginPath(); ctx.ellipse(770, 378, 96, 86, 0, 0, 6.283); shape(ctx, rgba(MK.blaas, 0.3), MK.blaas, 2.5);
  // zaadblaasje (achter de blaas)
  glow(662, 420, 90, MK.blaasjes, hl.blaasjes || 0);
  ctx.save(); ctx.translate(664, 418); ctx.rotate(-0.35); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283; const r = 1 + 0.12 * Math.sin(an * 5); const px = Math.cos(an) * 26 * r, py = Math.sin(an) * 60 * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(MK.blaasjes, 0.55), MK.blaasjes, 2); ctx.restore();
  ctx.strokeStyle = MK.blaasjes; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(682, 468); ctx.quadraticCurveTo(700, 486, 726, 492); ctx.stroke();
  // prostaat
  glow(760, 502, 90, MK.prostaat, hl.prostaat || 0);
  ctx.beginPath(); ctx.ellipse(760, 502, 50, 36, 0.1, 0, 6.283); shape(ctx, rgba(MK.prostaat, 0.55), lighten(MK.prostaat, 0.3), 2);
  // zaadleider
  glow(870, 420, 80, MK.leider, hl.leider || 0);
  lijnPad(ctx, VAS, MK.leider, 7 + 3 * (hl.leider || 0));
  // penis met zwellichamen
  ctx.beginPath(); ctx.moveTo(866, 548); ctx.quadraticCurveTo(882, 660, 904, 770); ctx.quadraticCurveTo(930, 806, 956, 772); ctx.quadraticCurveTo(944, 650, 912, 524); ctx.closePath(); shape(ctx, rgba(C.mens, 0.24), rgba(C.mens, 0.75), 2);
  if (zw > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 + 0.7 * zw; ctx.beginPath(); ctx.moveTo(880, 560); ctx.quadraticCurveTo(892, 660, 910, 752); ctx.quadraticCurveTo(926, 772, 940, 752); ctx.quadraticCurveTo(930, 650, 904, 548); ctx.closePath(); shape(ctx, rgba(MK.zwel, 0.25 + 0.45 * zw), rgba(MK.zwel, 0.8), 1.5); ctx.restore(); }
  // urinebuis
  glow(880, 620, 80, MK.buis, hl.buis || 0);
  lijnPad(ctx, URETHRA, MK.buis, 5 + 3 * (hl.buis || 0));
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(765, 466, 18, 8, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return P;
}
function manNamen(ctx, P, o) { // o: {naam: alpha}
  const N = { zaadbal: ['zaadbal', 800, 830, 'center'], balzak: ['balzak', 712, 770, 'right'], bijbal: ['bijbal', 748, 666, 'right'], leider: ['zaadleider', 892, 420, 'left'], blaas: ['blaas', 770, 392, 'center'],
    blaasjes: ['zaadblaasje', 632, 400, 'right'], prostaat: ['prostaat', 704, 528, 'right'], buis: ['urinebuis', 966, 630, 'left'], penis: ['penis', 972, 812, 'left'], zwel: ['zwellichamen', 966, 712, 'left'], kring: ['kringspier', 790, 456, 'left'] };
  for (const [k, al] of Object.entries(o)) { const n = N[k]; if (!n || al <= 0.01) continue; const [x, y] = P(n[1], n[2]); naamBij(ctx, n[0], null, x, y, al, n[3]); }
}

// =======================================================================================
// Vrouwelijke geslachtsorganen, schematisch vooraanzicht. Ontwerpcoördinaten rond (960, 480).
const VK = { stok: C.oker, leider: '#E0A08C', wand: '#C98A7E', slijm: '#B5574A', vagina: '#D9A48F' };
const EILEIDER_L = [[884, 352], [820, 318], [744, 314], [688, 340], [656, 382]];
function vrouwSchema(ctx, ox, oy, s, o = {}) {
  const { a = 1, hl = {}, dik = 0.5, eisprong = -1, t = 0 } = o; const P = (x, y) => [ox + (x - 960) * s, oy + (y - 480) * s]; if (a <= 0.01) return P;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(ox, oy); ctx.scale(s, s); ctx.translate(-960, -480); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const glow = (x, y, r, col, k) => { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.45 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); };
  // bekkenomtrek (zacht)
  ctx.strokeStyle = rgba(C.mens, 0.35); ctx.lineWidth = 3; ctx.setLineDash([10, 12]); for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(960 + d * 400, 200); ctx.quadraticCurveTo(960 + d * 450, 520, 960 + d * 250, 860); ctx.stroke(); } ctx.setLineDash([]);
  for (const d of [-1, 1]) { // eileiders, trechters, eierstokken
    const pts = EILEIDER_L.map(([x, y]) => [d < 0 ? x : 1920 - x, y]);
    glow(pts[2][0], pts[2][1], 110, VK.leider, hl.leider || 0); lijnPad(ctx, pts, VK.leider, 11);
    const [fx, fy] = pts[pts.length - 1]; ctx.save(); ctx.translate(fx, fy); ctx.rotate(d < 0 ? 0.5 : -0.5); ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-30, 34); ctx.lineTo(30, 34); ctx.lineTo(6, -4); ctx.closePath(); shape(ctx, rgba(VK.leider, 0.55), VK.leider, 2);
    ctx.strokeStyle = VK.leider; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const x0 = -28 + i * 11.2; ctx.beginPath(); ctx.moveTo(x0, 34); ctx.lineTo(x0 + Math.sin(t * 2 + i) * 3, 52 + (i % 2) * 6); ctx.stroke(); } ctx.restore();
    const sx = d < 0 ? 700 : 1220, sy = 448; glow(sx, sy, 90, VK.stok, hl.stok || 0);
    ctx.strokeStyle = rgba(VK.wand, 0.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx - d * 44, sy - 4); ctx.lineTo(960 + d * 84, 400); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(sx, sy, 50, 30, d * 0.15, 0, 6.283); shape(ctx, rgba(VK.stok, 0.7), lighten(VK.stok, 0.3), 2);
    for (let i = 0; i < 7; i++) circ(ctx, sx - 30 + hash(i * 5 + (d + 1)) * 60, sy - 16 + hash(i * 7 + 3 + d) * 32, 3 + 3 * hash(i * 11 + d), rgba('#F2E6C8', 0.8));
  }
  // baarmoeder
  glow(960, 420, 170, VK.wand, hl.baarmoeder || 0);
  ctx.beginPath(); ctx.moveTo(872, 344); ctx.quadraticCurveTo(856, 460, 926, 548); ctx.lineTo(932, 604); ctx.lineTo(988, 604); ctx.lineTo(994, 548); ctx.quadraticCurveTo(1064, 460, 1048, 344); ctx.quadraticCurveTo(960, 262, 872, 344); ctx.closePath(); shape(ctx, rgba(VK.wand, 0.6), lighten(VK.wand, 0.25), 2.5);
  // holte met slijmvlies
  glow(960, 420, 110, VK.slijm, hl.slijm || 0);
  ctx.beginPath(); ctx.moveTo(904, 360); ctx.quadraticCurveTo(960, 346, 1016, 360); ctx.quadraticCurveTo(990, 450, 964, 540); ctx.lineTo(956, 540); ctx.quadraticCurveTo(930, 450, 904, 360); ctx.closePath(); ctx.fillStyle = rgba('#1A1420', 0.6); ctx.fill(); ctx.strokeStyle = rgba(VK.slijm, 0.85); ctx.lineWidth = 4 + 16 * dik; ctx.stroke();
  // baarmoederhals
  glow(960, 580, 70, VK.wand, hl.hals || 0);
  ctx.strokeStyle = rgba('#1A1420', 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(960, 540); ctx.lineTo(960, 606); ctx.stroke();
  // vagina
  glow(960, 700, 90, VK.vagina, hl.vagina || 0);
  ctx.beginPath(); ctx.moveTo(926, 604); ctx.quadraticCurveTo(920, 700, 924, 800); ctx.lineTo(996, 800); ctx.quadraticCurveTo(1000, 700, 994, 604); ctx.closePath(); shape(ctx, rgba(VK.vagina, 0.45), lighten(VK.vagina, 0.25), 2);
  ctx.strokeStyle = rgba('#1A1420', 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, 610); ctx.lineTo(960, 800); ctx.stroke();
  ctx.restore();
  // eicel bij de eisprong: van de rechtereierstok naar de trechter en de eileider in
  if (eisprong >= 0) { const pts = [[1220, 448], [1262, 420]].concat(EILEIDER_L.map(([x, y]) => [1920 - x, y]).reverse().slice(1)).concat([[1000, 380]]); const L = padLengte(pts); const [x, y] = padPunt(pts, L[L.length - 1] * eisprong); const [sx, sy] = P(x, y); eicel(ctx, sx, sy, 11 * s, 1); }
  return P;
}
function vrouwNamen(ctx, P, o) {
  const N = { stok: ['eierstok', 700, 512, 'center'], leider: ['eileider', 760, 290, 'center'], trechter: ['trechter', 1298, 446, 'left'], baarmoeder: ['baarmoeder', 960, 252, 'center'], slijm: ['baarmoederslijmvlies', 1062, 520, 'left'], hals: ['baarmoederhals', 1010, 600, 'left'], vagina: ['vagina', 1012, 740, 'left'] };
  for (const [k, al] of Object.entries(o)) { const n = N[k]; if (!n || al <= 0.01) continue; const [x, y] = P(n[1], n[2]); naamBij(ctx, n[0], null, x, y, al, n[3]); }
}
// buitenkant, los schema (vooraanzicht, sterk vereenvoudigd)
function buitenSchema(ctx, x, y, s, o = {}) { const { a = 1, lip = 1, cli = 0, buis = 0, vag = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  paneel(ctx, x - 150 * s, y - 230 * s, 300 * s, 440 * s, ''); metaText(ctx, 'buitenkant · schema', x, y - 190 * s, C.grain, 'center', 20);
  ctx.save(); ctx.globalAlpha *= lip; ctx.beginPath(); ctx.ellipse(x, y + 10 * s, 78 * s, 150 * s, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.3), rgba(C.mens, 0.8), 2); ctx.beginPath(); ctx.ellipse(x, y + 20 * s, 34 * s, 112 * s, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.5), '#D9A48F', 2); ctx.restore();
  circ(ctx, x, y - 82 * s, 10 * s, rgba('#E0A08C', 0.4 + 0.6 * cli), '#E0A08C', 2);
  circ(ctx, x, y - 30 * s, 5 * s, rgba(C.teal, 0.4 + 0.6 * buis), C.teal, 2);
  ctx.beginPath(); ctx.ellipse(x, y + 40 * s, 14 * s, 30 * s, 0, 0, 6.283); shape(ctx, rgba('#1A1420', 0.6), rgba('#D9A48F', 0.6 + 0.4 * vag), 2);
  ctx.restore(); }

// ---------- eierstok vergroot met eicellen (follikels) ----------
function eierstokGroot(ctx, x, y, rx, ry, o = {}) { // v1.1: doorsnede met schors vol follikels, merg met vaten, rijping en eisprong (lib_bio)
  const { a = 1, n = 160, groei = 0, eis = 0, t = 0 } = o; return eierstokDoorsnede(ctx, x, y, rx, ry, { a, n: Math.round(n * 0.55), groei, eis, t }); }

// ---------- cyclusklok ----------
function cyclusKlok(ctx, cx, cy, r, dag, o = {}) { const { a = 1, fasen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const an = (d) => -Math.PI / 2 + (d - 1) / 28 * 6.283;
  circ(ctx, cx, cy, r, rgba(C.fill, 0.5), C.line, 2);
  const boog = (d0, d1, col, rr, lw, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(cx, cy, rr, an(d0), an(d1)); ctx.stroke(); ctx.restore(); };
  boog(1, 6, VK.slijm, r - 22, 30, fasen); boog(6, 14, C.goud, r - 22, 30, fasen); boog(14.6, 29, C.teal, r - 22, 30, fasen);
  for (let d = 1; d <= 28; d++) { const a2 = an(d); ctx.strokeStyle = rgba(C.text, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a2) * (r - 46), cy + Math.sin(a2) * (r - 46)); ctx.lineTo(cx + Math.cos(a2) * (r - 54), cy + Math.sin(a2) * (r - 54)); ctx.stroke(); }
  [[1, 'dag 1'], [14, 'dag 14'], [21, 'dag 21'], [7, 'dag 7']].forEach(([d, l]) => { const a2 = an(d); text(ctx, l, cx + Math.cos(a2) * (r + 40), cy + Math.sin(a2) * (r + 40) + 8, fTekst(22, 600), C.text2, 'center'); });
  if (fasen > 0.01) { ctx.save(); ctx.globalAlpha *= fasen; [[3.5, 'menstruatie', VK.slijm, 120], [10, 'eicel rijpt', C.goud, 130], [21.5, 'na de eisprong', C.teal, 175]].forEach(([d, l, c, rr]) => { const a2 = an(d); naamBij(ctx, l, null, cx + Math.cos(a2) * (r - rr), cy + Math.sin(a2) * (r - rr) + 12, 1, 'center', c); }); const a4 = an(14.3); eicel(ctx, cx + Math.cos(a4) * (r - 22), cy + Math.sin(a4) * (r - 22), 13, 1); ctx.restore(); }
  const a3 = an(dag); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a3) * (r - 70), cy + Math.sin(a3) * (r - 70)); ctx.stroke(); circ(ctx, cx, cy, 10, C.text);
  ctx.restore(); return an; }
// dikte van het slijmvlies over de dagen (eenvoudig)
function slijmDikte(d) { d = ((d - 1) % 28 + 28) % 28 + 1; if (d <= 5) return 0.15 + 0.03 * d; if (d <= 14) return 0.3 + (d - 5) / 9 * 0.45; if (d <= 27) return 0.75 + 0.15 * Math.sin((d - 14) / 13 * Math.PI); return 0.5; }


// Deel 2: nieuwe objecten (ronde 2), kandidaat voor bibliotheek/lib_bio.js
// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 1 (testvel-niveau). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, vorm, k] = HORM[soort];
  hormoonVorm(ctx, x, y, r * k, vorm, a, col);
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); } // C8: één deeltje volgen, goud omlijnd (geen gloed)
}

// =====================================================================================
// HYPOTHALAMUS EN HYPOFYSE MET HET POORTADERSYSTEEM (mediaan, voorkant = rechts).
// Recept: GnRH-cellen liggen in de hypothalamus; hun axonen eindigen in de eminentia mediana bovenaan het steeltje,
// waar ze GnRH afgeven aan een eerste haarvatnet. Poortaders lopen langs het steeltje naar een tweede haarvatnet in de
// VOORkwab; daar maken dezelfde cellen (gonadotrofe cellen) FSH en LH, die via een ader het lichaam in gaan. De
// achterkwab (zenuwweefsel) is de voortzetting van het steeltje. Hypofyse ± 1 cm (erwt), in het Turkse zadel.
// Bron: Kenhub 'Pituitary gland' (portaalsysteem naar de voorkwab, gonadotrofe cellen maken FSH en LH);
// StatPearls 'Physiology, Puberty' (GnRH in stoten). Bekende fouten: GnRH dat 'door de lucht' naar de hypofyse
// zweeft; FSH/LH uit de achterkwab; hypofyse los onder de hersenen.
// Ontwerpeenheden: ± 900 × 760, oorsprong = onderkant van de hypothalamus (bovenkant steeltje).
// o: puls 0..1 (stoot GnRH loopt door de poortaders: 0 = net afgegeven, 1 = in de voorkwab), aan 0..1 (cellen
// voorkwab maken FSH/LH), uit 0..1 (FSH/LH in de uitgaande ader), stoten 0..1 (hoe vaak: kindertijd → puberteit), t.
// =====================================================================================
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hypothalamusweefsel (boven) als zachte band, met de derde hersenkamer als spleet in het midden
  ctx.beginPath(); bioPad(ctx, [P(-430, -330), P(-200, -360), P(200, -360), P(430, -330), P(430, -70), P(150, -40), P(60, 0), P(-60, 0), P(-150, -40), P(-430, -70)], true);
  shape(ctx, rgba(BIO.brein, 0.32), rgba(BIO.breinS, 0.7), 2);
  ctx.beginPath(); bioPad(ctx, [P(-14, -360), P(-10, -200), P(0, -90), P(10, -200), P(14, -360)], true); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill();
  // Turks zadel (bot) onder de hypofyse
  ctx.beginPath(); bioPad(ctx, [P(-300, 210), P(-250, 330), P(-60, 420), P(140, 420), P(300, 340), P(350, 220)], false); ctx.strokeStyle = rgba(BIO.bot, 0.7); ctx.lineWidth = 16 * s; ctx.stroke();
  // achterkwab (zenuwweefsel, links) en voorkwab (klierweefsel, rechts)
  const ACHTER = [P(-40, 150), P(-170, 170), P(-215, 250), P(-170, 330), P(-60, 340), P(-10, 280), P(0, 190)];
  ctx.beginPath(); bioPad(ctx, ACHTER, true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  const VOOR = [P(10, 140), P(140, 120), P(270, 170), P(300, 260), P(240, 345), P(90, 370), P(0, 330), P(-10, 240)];
  ctx.beginPath(); bioPad(ctx, VOOR, true); shape(ctx, rgba('#C98A6A', 0.38), rgba('#E0A88A', 0.85), 2.5);
  // cellen in de voorkwab (Voronoi), de gonadotrofe cellen lichten op bij 'aan'
  const pts = []; for (let i = 0; i < 46; i++) { const rr = 16 * Math.sqrt(i + 0.6), an = i * 2.39996; pts.push([150 + Math.cos(an) * rr * 1.25, 250 + Math.sin(an) * rr * 0.95]); }
  const cellen = _bioVoronoi('hypVoor', pts, 20, 3, 20);
  ctx.save(); ctx.beginPath(); bioPad(ctx, VOOR, true); ctx.clip();
  cellen.forEach((c, i) => { const gon = i % 3 === 0; const g = gon ? aan : 0;
    ctx.beginPath(); c.pts.forEach((p, k) => { const q = P(p[0], p[1]); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    shape(ctx, gon ? _mixHex('#D9A48F', '#8FD0E8', g * 0.6) : rgba('#D9A48F', 0.55), rgba('#F2D6C4', 0.5), 1);
    const q = P(c.c[0], c.c[1]); ctx.beginPath(); ctx.arc(q[0], q[1], 4.5 * s, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); });
  ctx.restore();
  // steeltje
  ctx.beginPath(); bioPad(ctx, [P(-60, 0), P(-40, 80), P(-40, 160), P(30, 160), P(40, 80), P(60, 0)], true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  // GnRH-cellen in de hypothalamus met axonen naar de eminentia mediana
  const cel = [[-260, -250], [-120, -290], [210, -270]]; const eind = [];
  cel.forEach(([cx, cy], i) => { const [qx, qy] = P(cx, cy); const e = zenuwcel(ctx, qx, qy, { s: s * 0.9, col: '#B79AE6', naar: P(-16 + i * 16, -20), seed: i + 2, takken: 5, axonDik: 4, puls: puls >= 0 && puls < 0.25 ? puls * 4 : -1 }); eind.push(e); });
  // eerste haarvatnet (bovenaan het steeltje) → poortaders → tweede haarvatnet in de voorkwab
  const PA = [[[-10, -10], [-4, 60], [30, 120], [90, 170], [140, 220]], [[20, -10], [36, 60], [80, 110], [170, 160], [230, 230]]];
  PA.forEach((pa, i) => bloedvat(ctx, pa.map(p => P(p[0], p[1])), 8 * s, t + i * 0.3, { n: 4, cel: 5 * s, speed: 0.12, haarvat: true }));
  ctx.strokeStyle = rgba(BIO.bloed, 0.8); ctx.lineWidth = 3 * s; for (let k = -2; k <= 2; k++) { ctx.beginPath(); bioPad(ctx, [P(-40 + k * 8, -6), P(-20 + k * 12, -30), P(10 + k * 10, -8), P(40 + k * 6, -24)], false); ctx.stroke(); }
  // GnRH-stoot: deeltjes van de axoneinden langs de poortaders naar de voorkwab
  if (puls >= 0) { const u = clamp(puls, 0, 1); for (let i = 0; i < 12; i++) { const pa = PA[i % 2]; const f = clamp(u * 1.25 - (i / 12) * 0.25, 0, 1); if (f <= 0.001 || f >= 0.999) continue;
      const D = bioDicht(pa.map(p => P(p[0], p[1])), 12); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i) - 0.5) * 6 * s, py, 'gnrh', 7 * s, Math.min(1, (1 - f) * 6)); } }
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (naar rechtsonder)
  const UIT = [P(250, 300), P(330, 350), P(420, 420), P(520, 470)];
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}

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
const MD = { k: 14 };
const MD_VAS = [[-0.3, 13.6], [-0.75, 11.4], [-0.2, 8.6], [1.3, 5.4], [1.7, 2.2], [1.4, -0.6], [0.4, -2.6], [-1.6, -3.7], [-4.2, -3.6], [-6.6, -2.4], [-7.6, -0.4], [-7.3, 1.6], [-6.5, 3.1], [-5.3, 4.2], [-3.9, 4.9]];
const MD_URE = [[-3.4, 3.1], [-3.4, 4.6], [-3.1, 6.2], [-2.4, 7.3], [-0.9, 7.7], [0.9, 7.2], [2.1, 6.9], [2.6, 8.2], [2.72, 10.5], [2.8, 13.4], [3.0, 14.75]]; // urinebuis langs de onderkant (kant van de balzak) in het kleine zwellichaam
const MD_BIJ = [[0.25, 9.95], [-0.45, 10.6], [-0.75, 12.0], [-0.55, 13.2], [-0.3, 13.6]];
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5), ureter: P(-10.3, -4.2) };
  if (a <= 0.01) return { P, route, naam };
  const al = d => (dim.includes(d) ? 0.35 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); shape(ctx, rgba(BIO.huid, 0.13), rgba(BIO.huid, 0.6), 2);
  // endeldarm (achter)
  ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.55); ctx.lineWidth = 3.0 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore();
  // schaambeen(voeg)
  ctx.save(); ctx.globalAlpha *= al('bot'); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.6), BIO.botS, 2); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas; de zaadleider kruist er in een boog óverheen) — eigen tint (urine), dunner
  const UL = Ps([[-11.4, -9.0], [-10.4, -4.4], [-8.9, -1.3], [-7.3, 0.1], [-6.3, 0.9]]);
  ctx.save(); ctx.globalAlpha *= al('ureter'); ctx.strokeStyle = '#7FB8C4'; ctx.lineWidth = 0.22 * k; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(C.teal, 0.22), C.teal, 2.5);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.strokeStyle = rgba(C.teal, 0.45); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.5), lighten(C.groen, 0.3), 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba(C.paars, 0.55), lighten(C.paars, 0.3), 2); ctx.restore();
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
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = (0.22 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE. Recept: twee zwellichamen (corpora cavernosa) naast elkaar aan de bovenkant, elk met een
// slagader in het midden, samen in een stevig vlies; één kleiner zwellichaam (corpus spongiosum) onderaan met de
// urinebuis erin; huid erom. Bij een erectie lopen de holten van de bovenste zwellichamen vol met bloed: ze worden
// groter en ronder, het vlies spant en drukt de afvoerende aders dicht. Bron: OpenStax A&P 27.1; MSD Manual 'Structure
// of the male reproductive system'. Bekende fouten: één buis; urinebuis in de bovenste zwellichamen.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = r * (1 + 0.22 * vul);
  ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), rgba(BIO.huid, 0.9), 2);
  const cr = R * (0.42 + 0.04 * vul);
  for (const d of [-1, 1]) { const cx = x + d * R * 0.44, cy = y - R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.283); shape(ctx, _mixHex('#7A3E44', '#B02A2A', vul), '#E8D8DE', 2.5 + 1.5 * vul);
    for (let i = 0; i < 22; i++) { const an = i * 2.39996, rr = cr * 0.85 * Math.sqrt((i + 0.5) / 22); const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
      ctx.beginPath(); ctx.arc(px, py, cr * (0.06 + 0.08 * vul), 0, 6.283); ctx.fillStyle = rgba(vul > 0.5 ? '#E05A4A' : '#3A1A22', 0.8); ctx.fill(); }
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.12, 0, 6.283); shape(ctx, '#C2453E', '#F0B0A0', 1.2); }
  const sx = x, sy = y + R * 0.52; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3, R * 0.26, 0, 0, 6.283); shape(ctx, rgba('#9A5A5A', 0.8), '#E8D8DE', 1.5);
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12, R * 0.03, 0, 0, 6.283); ctx.fillStyle = '#C9CED6'; ctx.fill();
  ctx.restore(); return { cav: [x - R * 0.44, y - R * 0.18], spons: [sx, sy], R };
}

// =====================================================================================
// BUITENKANT VROUW (vulva), vooraanzicht, vlak schema. Recept: van boven naar onder in de middellijn: venusheuvel,
// clitoris (eikel met voorhuid) waar de kleine schaamlippen vooraan samenkomen, opening van de urinebuis, opening van
// de vagina, dan het perineum en de anus; grote schaamlippen aan de buitenkant, kleine schaamlippen erbinnen.
// Bron: OpenStax A&P 27.2 ('clitoris waar de kleine schaamlippen vooraan samenkomen'; vaginaopening tussen
// urinebuisopening en anus). Bekende fouten: urinebuis in de vagina; clitoris onder de urinebuis.
// Ontwerpeenheden: ± 260 × 460, oorsprong = vaginaopening. o.hl = { cli, buis, vag, lip } 0..1.
// =====================================================================================
function vulvaSchema(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const naam = { cli: P(0, -128), buis: P(0, -66), vag: P(0, 0), groot: P(-102, -10), klein: P(-44, -40), anus: P(0, 150) };
  if (a <= 0.01) return naam; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const HUID = BIO.huid, D = _bioDonker(HUID, 0.25);
  ctx.beginPath(); ctx.ellipse(...P(0, -168), 105 * s, 40 * s, 0, 0, 6.283); ctx.fillStyle = rgba(HUID, 0.1); ctx.fill(); // venusheuvel
  for (const d of [-1, 1]) { // grote schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 14, -170), P(d * 86, -130), P(d * 108, -10), P(d * 70, 100), P(d * 12, 118), P(d * 28, 40), P(d * 40, -60), P(d * 26, -150)], true);
    shape(ctx, rgba(HUID, 0.5 + 0.2 * (hl.lip || 0)), rgba(D, 0.9), 2); }
  for (const d of [-1, 1]) { // kleine schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 4, -126), P(d * 34, -96), P(d * 44, -20), P(d * 30, 60), P(d * 6, 84), P(d * 14, 10), P(d * 16, -70)], true);
    shape(ctx, rgba('#C98A8A', 0.75), rgba('#A8646A', 0.9), 1.8); }
  ctx.beginPath(); bioPad(ctx, [P(-20, -150), P(0, -158), P(20, -150), P(14, -128), P(-14, -128)], true); shape(ctx, rgba('#C98A8A', 0.85), '#A8646A', 1.5); // voorhuid clitoris
  ctx.beginPath(); ctx.ellipse(...P(0, -128), 9 * s, 8 * s, 0, 0, 6.283); shape(ctx, _mixHex('#E0A08C', '#F2C0B0', hl.cli || 0), '#B86A68', 1.5);
  ctx.beginPath(); ctx.ellipse(...P(0, -66), 4.5 * s, 3 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#5BA4C9', hl.buis || 0), 1.5 + 1.5 * (hl.buis || 0));
  ctx.beginPath(); ctx.ellipse(...P(0, 0), 13 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#E0A08C', hl.vag || 0), 1.5 + 1.5 * (hl.vag || 0));
  ctx.beginPath(); ctx.arc(...P(0, 150), 8 * s, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.6), rgba(D, 0.8), 1.5);
  ctx.restore(); return naam;
}

// ---------- klein: schaalstreep met eenheid voluit ----------
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }

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

// Deel 2 (hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, schaalStreep) staat sinds 1.1 (29 okt 2026) in bibliotheek/lib_bio.js en komt uit het uittreksel lib_bio_deel.js.

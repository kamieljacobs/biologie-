// Voortplanting 2 · Geslachtsorganen en puberteit — scènes per alinea (v1.0, 16 okt 2026). Sam en Daan (castboek): even oud, niet even ver; startsein uit de hersenen; route van een zaadcel; eierstok en baarmoeder.

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
function hoofdProfiel(ctx, x, y, s = 1, o = {}) { const { a = 1, hyp = 0, hth = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, 260); ctx.bezierCurveTo(-60, 160, -180, 120, -200, 0); ctx.bezierCurveTo(-220, -170, -80, -250, 40, -240); ctx.bezierCurveTo(170, -230, 230, -130, 220, -30); ctx.lineTo(250, 20); ctx.lineTo(220, 50); ctx.bezierCurveTo(230, 90, 220, 110, 200, 120); ctx.bezierCurveTo(210, 160, 180, 190, 140, 190); ctx.lineTo(120, 260); ctx.closePath(); shape(ctx, rgba(C.mens, 0.18), rgba(C.mens, 0.8), 2);
  ctx.beginPath(); ctx.ellipse(20, -80, 170, 120, -0.08, 0, 6.283); shape(ctx, rgba(C.paars, 0.16), rgba(C.paars, 0.6), 2); text(ctx, 'hersenen', -60, -110, fTekst(30, 600), rgba(C.paars, 0.9), 'center');
  if (hth > 0.01) { const g = ctx.createRadialGradient(60, 10, 0, 60, 10, 80); g.addColorStop(0, rgba(HK.klier, 0.45 * hth)); g.addColorStop(1, rgba(HK.klier, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(60, 10, 80, 0, 6.283); ctx.fill(); }
  ctx.save(); ctx.globalAlpha *= 0.45 + 0.55 * hth; ctx.beginPath(); ctx.ellipse(60, 10, 34, 20, 0, 0, 6.283); shape(ctx, rgba(HK.klier, 0.7), HK.klierR, 2); ctx.restore();
  ctx.strokeStyle = HK.klierR; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(60, 30); ctx.lineTo(66, 58); ctx.stroke();
  ctx.save(); ctx.globalAlpha *= 0.45 + 0.55 * hyp; ctx.beginPath(); ctx.arc(68, 70, 16, 0, 6.283); shape(ctx, rgba(HK.klier, 0.85), HK.klierR, 2); ctx.restore();
  ctx.restore(); return { hth: [x + 60 * s, y + 10 * s], hyp: [x + 68 * s, y + 70 * s] }; }

// ---------- startlamp boven een hoofd: rood = nog niet, groen = begonnen ----------
function startlamp(ctx, x, y, groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y - 62, 52, 104, 12); shape(ctx, '#2A2F3E', '#6B7287', 2); circ(ctx, x, y - 34, 16, groen > 0.5 ? '#5A2A2A' : '#E05A4A'); circ(ctx, x, y + 14, 16, groen > 0.5 ? '#6FD08A' : '#25402E'); ctx.restore(); }
// ---------- meetlat aan de muur ----------
function meetlat(ctx, x, y0, y1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y1, 44, y0 - y1, 6); shape(ctx, '#E6D7B0', '#B8A27A', 2); ctx.strokeStyle = '#6A5A3A'; ctx.lineWidth = 2; for (let yy = y0; yy > y1 + 4; yy -= 20) { const k = Math.round((y0 - yy) / 20) % 5 === 0; ctx.beginPath(); ctx.moveTo(x - 22, yy); ctx.lineTo(x - (k ? 0 : 10), yy); ctx.stroke(); } ctx.restore(); }

// ---------- zaadcel en eicel ----------
function zaadcel(ctx, x, y, ang, t, s = 1, a = 1, col = '#F2F2EE') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; const px = -10 - u * 46, py = Math.sin(u * 9 - t * 14) * 5 * u; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 11, 7, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function eicel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r * 1.35, rgba(C.goud, 0.18), rgba(C.goud, 0.5), 1.5); circ(ctx, x, y, r, rgba('#F2E6C8', 0.95), C.goud, 2); circ(ctx, x + r * 0.15, y - r * 0.1, r * 0.32, rgba(C.paars, 0.7)); ctx.restore(); }

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
function eierstokGroot(ctx, x, y, rx, ry, o = {}) { const { a = 1, n = 160, groei = 0, eis = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); shape(ctx, rgba(VK.stok, 0.35), lighten(VK.stok, 0.2), 2.5);
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, rx - 8, ry - 8, 0, 0, 6.283); ctx.clip();
  for (let i = 0; i < n; i++) { const u = hash(i * 3 + 1), v = hash(i * 3 + 2); const an = u * 6.283, rr = Math.sqrt(v) * 0.92; const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry * rr; circ(ctx, px, py, 4, rgba('#F2E6C8', 0.75)); }
  ctx.restore();
  // een groepje rijpt, één wint
  const grp = [[x - 120, y - 40], [x - 40, y + 60], [x + 70, y - 70], [x + 130, y + 30], [x - 10, y - 90]];
  grp.forEach(([px, py], i) => { const g = groei * (i === 3 ? 1 : 0.55); if (g <= 0.01) return; const r = 6 + (i === 3 ? 38 : 18) * g * (i === 3 ? 1 : 1 - eis * 0.8); circ(ctx, px, py, r, rgba(C.goud, 0.18), rgba(C.goud, 0.7), 2); if (i !== 3 || eis < 0.5) eicel(ctx, px, py, 5 + 4 * g, 1); });
  if (eis > 0.01) { const ex = lerp(x + 130, x + rx + 120, eis), ey = lerp(y + 30, y - 40, eis); eicel(ctx, ex, ey, 12, 1); }
  ctx.restore(); }

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

// =======================================================================================
const SCENES = {
  title(ctx, t) { meetlat(ctx, 1620, 880, 380, 1); persoon(ctx, 'daan', 1500, 880, 360 / 0.95, { uit: 'denkt', pose: 'denk', kijk: 1, t }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { klasAchtergrond(ctx);
    const groei = q.on('Nu', 1, 1.4); const hS = lerp(370, 470, groei), hD = lerp(370, 382, groei);
    meetlat(ctx, 1250, 880, 360, 1);
    persoon(ctx, 'daan', 1080, 880, hD / 0.95, { uit: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'bezorgd' : (q.on('Nee', 1) > 0.5 ? 'blij' : 'neutraal'), pose: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'schouders' : 'staan', kijk: 1, t });
    persoon(ctx, 'sam', 1420, 880, hS / 1.04, { uit: q.on('stem', 1) > 0.5 && q.on('gegroeid', 1) < 0.5 ? 'praat' : 'blij', pose: 'staan', kijk: -1, t });
    // hoogtestreepjes op de meetlat
    const st = q.on('Vorig', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - 372); ctx.lineTo(1282, 880 - 372); ctx.stroke(); ctx.restore(); chip(ctx, 'vorig jaar: even groot', 1250, 300, C.goud, st * (1 - q.on('Nu', 1)), 24); }
    if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= groei; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - hS); ctx.lineTo(1282, 880 - hS); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'een kop groter', 1590, 330, C.groen, q.on('kop', 1), 24);
    const sb = q.on('stem', 1) * (1 - q.on('mis', 1)); if (sb > 0.01) { bubbel(ctx, 1560, 430, 'Hoi!', '#F2F2EE', sb, 30); chip(ctx, 'lage stem', 1720, 470, C.teal, sb, 22); }
    chip(ctx, 'bijna niet gegroeid', 900, 420, C.text2, q.on('gegroeid', 1) * (1 - q.on('startsein', 1)), 24);
    vraagteken(ctx, 960, 470, q.on('mis', 1) * (1 - q.on('Nee', 1)), 90);
    const sl = q.on('startsein', 1); startlamp(ctx, 1080, 400 - 8, 0, sl); startlamp(ctx, 1420, 880 - hS - 90, 1, sl);
    chip(ctx, 'startsein: nog niet', 1080, 300 - 8, C.koraal, sl * (1 - q.on('wie', 1)), 24); chip(ctx, 'startsein: gegeven', 1500, 880 - hS - 170, C.groen, sl * (1 - q.on('wie', 1)), 24);
    const w = q.on('wie', 1); if (w > 0.01) { tag(ctx, 'wie geeft het startsein?', 640, 560, C.goud, w, 'center', 34); vraagteken(ctx, 640, 720, q.on('denk', 1), 110); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const H = hoofdProfiel(ctx, 470, 500, 1.35, { hth: q.on('hypothalamus', 1) * 0.6 + 0.4 * Math.max(q.on('stoten', 1) * (0.5 + 0.5 * Math.sin(t * 5)), 0), hyp: 0 });
    naamBij(ctx, 'hypothalamus', 'deel van de hersenen', H.hth[0] + 50, H.hth[1] - 14, q.on('hypothalamus', 1), 'left');
    const ge = q.on('geboorte', 1); if (ge > 0.01) { ctx.save(); ctx.globalAlpha *= ge; paneel(ctx, 1020, 150, 780, 200, ''); ctx.beginPath(); ctx.ellipse(1180, 250, 34, 44, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); naamBij(ctx, 'zaadballen', null, 1230, 262, 1, 'left');
      ctx.beginPath(); ctx.ellipse(1530, 250, 44, 28, 0, 0, 6.283); shape(ctx, rgba(VK.stok, 0.7), lighten(VK.stok, 0.3), 2); naamBij(ctx, 'eierstokken', null, 1590, 262, 1, 'left'); regel(ctx, 'al vanaf je geboorte', 1410, 330, 1, C.text2, 24, 'center', 600);
      const st = q.on('stil', 1); chip(ctx, 'kindertijd: bijna stil', 1410, 140, C.text2, st, 24); ctx.restore(); }
    // GnRH-stoten tegen de leeftijd
    const gx = 1040, gy = 450, gw = 760, gh = 300, gr = q.on('Ergens', 1); if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      for (const v of [0, 4, 8, 12, 16]) { const px = gx + v / 16 * gw; text(ctx, String(v), px, gy + gh + 36, fTekst(24), C.text2, 'center'); } metaText(ctx, 'leeftijd (jaar)', gx + gw, gy + gh + 74, C.grain, 'right', 20); metaText(ctx, 'GnRH-stoten', gx, gy - 16, C.grain, 'left', 20);
      ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(gx + 8 / 16 * gw, gy, 6 / 16 * gw, gh); regel(ctx, 'start: ergens tussen 8 en 14', gx + 11 / 16 * gw, gy + 30, q.on('veertiende', 1), C.goud, 22, 'center', 700);
      const u = clamp((t - q.at('Dan')) / 3, 0, 1); const tot = 16 * lerp(0.5, 1, u); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh);
      for (let k = 0; k < 160; k++) { const age = k / 10; if (age > tot) break; const f = age < 8 ? 0.6 : lerp(0.6, 2.2, (age - 8) / 6); const hgt = age < 8 ? 0.12 : lerp(0.12, 0.85, clamp((age - 8) / 6, 0, 1)); const ph = (age * f * 2) % 1; const v = ph < 0.25 ? Math.sin(ph / 0.25 * Math.PI) * hgt : 0; ctx.lineTo(gx + age / 16 * gw, gy + gh - v * (gh - 20)); } ctx.stroke(); ctx.restore(); }
    chip(ctx, 'steeds vaker kleine stoten GnRH', 1420, 870, C.goud, q.on('GnRH', 1), 26); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const y0 = 400, A1 = q.on('hypofyse', 1), A2 = q.on('FSH', 1), A3 = q.on('bloed', 1), A4 = q.on('hormonen', 2), A5 = q.on('geslachtscellen', 1);
    knoop(ctx, 250, y0, 330, 120, 'hypothalamus', 'in je hersenen', HK.klier, 1, 0.5 + 0.5 * Math.sin(t * 4));
    pijl(ctx, 420, y0, 540, y0, C.goud, A1, 5, 18); regel(ctx, 'GnRH', 480, y0 - 26, A1, C.goud, 30, 'center', 800);
    knoop(ctx, 700, y0, 300, 120, 'hypofyse', 'klier onder de hypothalamus', HK.klier, A1);
    regel(ctx, 'FSH + LH', 960, y0 - 130, A2, C.teal, 30, 'center', 800); regel(ctx, 'via het bloed', 960, y0 - 96, A3, C.text2, 22, 'center', 600);
    pijl(ctx, 855, y0 - 20, 1040, 290, C.teal, A3, 5, 18); pijl(ctx, 855, y0 + 20, 1040, 550, C.teal, A3, 5, 18);
    for (let i = 0; i < 6; i++) { const u = ((t * 0.4 + i / 6) % 1); if (A3 > 0.01) { circ(ctx, lerp(860, 1035, u), lerp(y0 - 20, 292, u), 7, rgba(C.teal, A3)); circ(ctx, lerp(860, 1035, u), lerp(y0 + 20, 548, u), 7, rgba(C.teal, A3)); } }
    knoop(ctx, 1200, 280, 300, 110, 'zaadballen', null, MK.zaadbal, A2); knoop(ctx, 1200, 560, 300, 110, 'eierstokken', null, VK.stok, A2);
    pijl(ctx, 1355, 280, 1470, 280, C.koraal, A4, 5, 18); pijl(ctx, 1355, 560, 1470, 560, C.paars, q.on('oestrogeen', 1), 5, 18);
    knoop(ctx, 1640, 280, 300, 110, 'testosteron', null, C.koraal, q.on('testosteron', 1)); knoop(ctx, 1640, 560, 300, 110, 'oestrogeen', null, C.paars, q.on('oestrogeen', 1));
    if (A5 > 0.01) { const zc = q.on('zaadcellen', 1), ec = q.on('eicellen', 1);
      zaadcel(ctx, 1230, 420, 0, t, 1.3, zc); regel(ctx, 'zaadcellen', 1150, 432, zc, C.text, 28, 'right', 700);
      eicel(ctx, 1200, 712, 22, ec); regel(ctx, 'eicellen rijpen', 1240, 722, ec, C.text, 28, 'left', 700); }
    // klein hoofd linksonder als geheugensteun
    hoofdProfiel(ctx, 250, 720, 0.42, { hth: 1, hyp: A1, a: 0.9 }); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'sam', 230, 880, 540 / 1.04, { uit: 'blij', pose: 'staan', kijk: 1, t }); persoon(ctx, 'noor', 1690, 880, 540 / 0.97, { uit: 'blij', pose: 'staan', kijk: -1, t });
    tag(ctx, 'primaire geslachtskenmerken: de geslachtsorganen, al bij de geboorte', 960, 140, C.text2, q.on('primaire', 1), 'center', 26);
    tag(ctx, 'secundaire geslachtskenmerken: komen in de puberteit', 960, 214, C.goud, q.on('secundaire', 1), 'center', 26);
    const J = q.on('jongens', 1); regel(ctx, 'jongens', 640, 300, J, C.teal, 28, 'center', 800);
    chip(ctx, 'haar op de kin', 640, 360, C.teal, q.on('kin', 1)); chip(ctx, 'bredere schouders', 640, 426, C.teal, q.on('schouders', 1)); chip(ctx, 'sterkere spieren', 640, 492, C.teal, q.on('spieren', 1)); chip(ctx, 'groter strottenhoofd → lagere stem', 640, 558, C.teal, q.on('strottenhoofd', 1));
    regel(ctx, 'meisjes', 1280, 300, q.on('meisjes', 1), C.koraal, 28, 'center', 800);
    chip(ctx, 'borsten groeien', 1280, 360, C.koraal, q.on('borsten', 1)); chip(ctx, 'bredere heupen', 1280, 426, C.koraal, q.on('heupen', 1));
    regel(ctx, 'iedereen', 960, 640, q.on('iedereen', 1), C.goud, 28, 'center', 800);
    chip(ctx, 'okselhaar en schaamhaar', 800, 700, C.goud, q.on('oksels', 1)); chip(ctx, 'groeispurt', 1170, 700, C.goud, q.on('groeispurt', 1));
    chip(ctx, 'geslachtsorganen groeien en gaan werken', 960, 780, C.text2, q.on('werken', 1), 24);
    chip(ctx, 'eerste zaadlozing', 700, 856, C.teal, q.on('zaadlozing', 1), 24); chip(ctx, 'eerste menstruatie', 1220, 856, C.koraal, q.on('menstruatie', 1), 24); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verschillen', 1, 0.8), A = 1 - B;
    const v = (age, pk, ph) => { const pre = Math.max(0, 6.2 - 0.32 * (age - 6)); let s2 = pre + ph * Math.exp(-Math.pow((age - pk) / 1.05, 2)); if (age > pk) s2 *= Math.exp(-(age - pk) / 1.6); return s2; };
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const gx = 220, gy = 230, gw = 1000, gh = 460;
      grafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 12, xlab: 'leeftijd (jaar)', ylab: 'groei (cm per jaar)', f: (x) => v(x + 6, 11.8, 4.2), u: q.on('meisjes', 1, 1.5), xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: (x) => String(x + 6), col: C.koraal });
      grafiek(ctx, gx, gy, gw, gh, { a: q.on('jongens', 1), xmax: 12, ymax: 12, f: (x) => v(x + 6, 13.8, 4.6), u: q.on('jongens', 1, 1.5), col: C.teal });
      regel(ctx, 'meisjes', gx + (11.8 - 6) / 12 * gw - 20, gy + 70, q.on('meisjes', 1), C.koraal, 28, 'right', 800); regel(ctx, 'jongens', gx + (13.8 - 6) / 12 * gw + 24, gy + 50, q.on('jongens', 1), C.teal, 28, 'left', 800);
      chip(ctx, 'meisjes ± 2 jaar eerder', 720, 150, C.goud, q.on('eerder', 1), 26);
      const tw = q.on('twaalfde', 1); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; const px = gx + 6 / 12 * gw; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + gh); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 200, gw = 1050, ax = (a) => gx + (a - 6) / 12 * gw; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, 640); ctx.lineTo(gx + gw, 640); ctx.stroke(); for (let a = 6; a <= 18; a += 2) text(ctx, String(a), ax(a), 680, fTekst(24), C.text2, 'center'); metaText(ctx, 'leeftijd (jaar)', gx + gw, 720, C.grain, 'right', 20);
      regel(ctx, 'begin van de puberteit', gx, 300, 1, C.text2, 28, 'left', 700);
      roundRect(ctx, ax(8), 360, ax(13) - ax(8), 70, 35); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); regel(ctx, 'meisjes: 8 tot 13 jaar', (ax(8) + ax(13)) / 2, 406, 1, C.text, 26, 'center', 700);
      roundRect(ctx, ax(9), 470, ax(14) - ax(9), 70, 35); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); regel(ctx, 'jongens: 9 tot 14 jaar', (ax(9) + ax(14)) / 2, 516, 1, C.text, 26, 'center', 700);
      chip(ctx, 'vroeg is normaal', ax(9), 800, C.groen, q.on('Vroeg', 1), 26); chip(ctx, 'laat ook', ax(13.5), 800, C.groen, q.on('laat', 1), 26); ctx.restore(); }
    const sd = q.on('Daan', 1); persoon(ctx, 'daan', 1500, 880, 390 / 0.95, { uit: sd > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t, a: 0.35 + 0.65 * B }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t, a: 0.35 + 0.65 * B });
    startlamp(ctx, 1500, 400, sd > 0.6 ? 1 : 0, B); startlamp(ctx, 1760, 320, 1, B); chip(ctx, 'Daan: gewoon later', 1500, 290, C.groen, sd, 26); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Voeding', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      // hypothalamus vergroot: kisspeptinecel → GnRH-cel
      circ(ctx, 520, 440, 280, rgba(HK.klier, 0.1), rgba(HK.klier, 0.6), 2); metaText(ctx, 'hypothalamus · vergroot', 520, 140, C.grain, 'center', 22);
      const kc = q.on('kisspeptine', 1), gc = q.on('GnRH', 1), rx = q.on('receptor', 1);
      const neuron = (x, y, col, a, naam) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 5; k++) { const an = k * 1.25 + 0.3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an) * 50, y + Math.sin(an) * 50 + 10, x + Math.cos(an) * 80, y + Math.sin(an) * 70); ctx.stroke(); } circ(ctx, x, y, 34, rgba(col, 0.6), col, 2.5); circ(ctx, x + 6, y - 4, 12, rgba(C.bgSchema, 0.7)); naamBij(ctx, naam, null, x, y + 92, 1, 'center'); ctx.restore(); };
      neuron(380, 400, C.paars, kc, 'kisspeptinecel'); neuron(660, 470, C.goud, gc, 'GnRH-cel');
      if (gc > 0.01) { pijl(ctx, 420, 410, 610, 456, C.paars, gc, 4, 16); for (let i = 0; i < 4; i++) { const u = (t * 0.5 + i / 4) % 1; circ(ctx, lerp(424, 600, u), lerp(412, 452, u), 6, rgba(C.paars, gc * (1 - rx))); } }
      kruis(ctx, 610, 452, 26, rx * (1 - q.on('vetreserve', 1))); chip(ctx, 'receptor werkt niet: geen startsein', 520, 690, C.koraal, rx * (1 - q.on('vetreserve', 1)), 22);
      // vetweefsel → leptine
      const vw = q.on('Vetweefsel', 1); if (vw > 0.01) { ctx.save(); ctx.globalAlpha *= vw; for (let i = 0; i < 9; i++) { const px = 1440 + (i % 3) * 110 + (Math.floor(i / 3) % 2) * 55, py = 330 + Math.floor(i / 3) * 100; circ(ctx, px, py, 52, rgba('#F2D88A', 0.35), '#E0C070', 2); circ(ctx, px + 30, py + 28, 8, rgba(C.paars, 0.6)); } naamBij(ctx, 'vetweefsel', null, 1550, 680, 1, 'center'); ctx.restore(); }
      const lp = q.on('leptine', 1); if (lp > 0.01) { regel(ctx, 'leptine', 1100, 300, lp, C.goud, 30, 'center', 800); for (let i = 0; i < 7; i++) { const u = (t * 0.3 + i / 7) % 1; circ(ctx, lerp(1380, 820, u), lerp(420, 430, u) + Math.sin(u * 9 + i) * 14, 8, rgba(C.goud, lp)); } pijl(ctx, 1380, 380, 830, 380, rgba(C.goud, 0.5), lp * 0.6, 3, 14); }
      chip(ctx, 'veel leptine = genoeg energie opgeslagen', 1100, 790, C.groen, q.on('genoeg', 1) * (1 - q.on('weinig', 1)), 24);
      chip(ctx, 'heel weinig lichaamsvet: eerste menstruatie later, of stopt', 1100, 790, C.koraal, q.on('weinig', 1), 24); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const P2 = [[1850, 16.5], [1880, 15.8], [1900, 15.2], [1920, 14.6], [1950, 13.7], [1965, 13.4], [1980, 13.3], [1997, 13.15], [2009, 13.05], [2020, 13.0]];
      const f = (x) => { const yr = 1850 + x; for (let i = 1; i < P2.length; i++) if (yr <= P2[i][0]) return lerp(P2[i - 1][1], P2[i][1], (yr - P2[i - 1][0]) / (P2[i][0] - P2[i - 1][0])) - 10; return 3; };
      grafiek(ctx, 360, 230, 1200, 460, { xmax: 170, ymax: 8, f, u: clamp((t - q.at('1850')) / Math.max(1, q.at('dertiende') - q.at('1850')), 0, 1), xticks: [0, 50, 100, 150], xfmt: (x) => String(1850 + x), yticks: [2, 4, 6], ylab: 'leeftijd eerste menstruatie', xlab: 'jaar', col: C.koraal, marks: [[0, '± 16 jaar', q.on('zestiende', 1)], [159, '± 13 jaar (Nederland)', q.on('dertiende', 1)]] });
      // y-as in jaren (10 + v)
      ctx.fillStyle = C.bgSchema; ctx.fillRect(250, 220, 100, 480); for (const v of [2, 4, 6]) text(ctx, String(10 + v), 342, 690 - v / 8 * 460 + 10, fTekst(28), C.text2, 'right');
      chip(ctx, 'betere voeding en gezondheid', 960, 820, C.groen, q.on('Nederland', 1), 26); ctx.restore(); } },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const z = q.on('zaadballen', 1); const P = manSchema(ctx, 720, 486, 1.08, { hl: { zaadbal: z * (0.6 + 0.4 * Math.sin(t * 3)) }, t });
    manNamen(ctx, P, { zaadbal: z, balzak: q.on('balzak', 1) });
    const ko = q.on('koeler', 1); if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; roundRect(ctx, 1240, 220, 40, 260, 20); shape(ctx, '#E6E1D3', '#9AA3B2', 2); const lvl = lerp(0.8, 0.6, clamp((t - q.at('koeler')) / 1.5, 0, 1)); roundRect(ctx, 1250, 230 + 240 * (1 - lvl), 20, 240 * lvl, 10); shape(ctx, C.teal, null); circ(ctx, 1260, 500, 34, C.teal, '#9AA3B2', 2);
      regel(ctx, 'een paar graden koeler dan in de buik', 1320, 330, 1, C.text, 30, 'left', 700); regel(ctx, 'nodig om goed zaadcellen te maken', 1320, 380, q.on('nodig', 1), C.text2, 26, 'left', 600); ctx.restore(); }
    const mi = q.on('honderd', 1); if (mi > 0.01) { ctx.save(); ctx.globalAlpha *= mi; const n = Math.round(100 * clamp((t - q.at('honderd')) / 1.6, 0, 1)); regel(ctx, '± ' + n + ' 000 000', 1300, 640, 1, C.goud, 64, 'left', 800); regel(ctx, 'zaadcellen per dag', 1300, 694, 1, C.text, 30, 'left', 600); for (let i = 0; i < 7; i++) zaadcel(ctx, 1340 + i * 70, 760 + Math.sin(t * 2 + i) * 8, 0, t + i, 0.8, 1); ctx.restore(); }
    chip(ctx, 'vanaf de puberteit, tot op hoge leeftijd', 1500, 856, C.text2, q.on('leeftijd', 1), 24); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const stops = [['ontstaat', 0], ['bijbal', 4], ['zaadleider', 8], ['zaadblaasjes', 13], ['prostaat', 15], ['urinebuis', 17], ['penis', 22], ['buiten', 23]];
    let d = 0; const L = padLengte(ZAADROUTE); for (let i = 0; i < stops.length; i++) { const t0 = q.at(stops[i][0]); if (t < t0) break; const from = i ? L[stops[i - 1][1]] : 0, to = L[stops[i][1]]; d = lerp(from, to, ease((t - t0) / 2.2)); }
    const fase = (w) => q.on(w, 1); const hlw = (w, w2) => fase(w) * (1 - (w2 ? q.on(w2, 1) : 0));
    const P = manSchema(ctx, 720, 486, 1.08, { t, buisjes: q.on('buisjes', 1), zw: q.on('bloed', 1), kring: q.on('kringspier', 1),
      hl: { zaadbal: hlw('ontstaat', 'bijbal'), bijbal: hlw('bijbal', 'zaadleider'), leider: hlw('zaadleider', 'zaadblaasjes'), blaasjes: hlw('zaadblaasjes', 'prostaat'), prostaat: hlw('prostaat', 'urinebuis'), buis: hlw('urinebuis', 'tegelijk') + q.on('dezelfde', 1) * (1 - q.on('zwellichamen', 1)) } });
    manNamen(ctx, P, { zaadbal: fase('ontstaat'), balzak: 0, bijbal: fase('bijbal'), leider: fase('zaadleider'), blaas: fase('blaas'), blaasjes: fase('zaadblaasjes'), prostaat: fase('prostaat'), buis: fase('urinebuis'), penis: fase('penis'), kring: fase('kringspier'), zwel: fase('zwellichamen') });
    if (t > q.at('ontstaat') - 0.3 && t < q.at('tegelijk') + 0.5) { const [x, y, an] = padPunt(ZAADROUTE, d); const [sx, sy] = P(x, y); zaadcel(ctx, sx, sy, an, t, 0.7, 1); }
    // rechts: de route als lijstje
    const R = [['zaadbal', 'ontstaat', MK.zaadbal], ['bijbal', 'bijbal', MK.bijbal], ['zaadleider', 'zaadleider', MK.leider], ['+ zaadblaasjes', 'zaadblaasjes', MK.blaasjes], ['prostaat', 'prostaat', MK.prostaat], ['urinebuis', 'urinebuis', MK.buis]];
    R.forEach(([s2, w, col], i) => { const a = q.on(w, 1); if (a <= 0.01) return; const y = 220 + i * 92; roundRect(ctx, 1380, y - 40, 360, 64, 32); ctx.save(); ctx.globalAlpha *= a; shape(ctx, rgba(col, 0.2), col, 2); text(ctx, s2, 1560, y + 2, fTekst(30, 700), C.text, 'center'); if (i) pijl(ctx, 1560, y - 74, 1560, y - 46, C.text2, 1, 3, 10); ctx.restore(); });
    chip(ctx, 'rijpen (± 2 weken) en bewaard worden', 1560, 150, MK.bijbal, q.on('rijpt', 1) * (1 - q.on('zaadlozing', 1)), 22);
    chip(ctx, 'urine en sperma: dezelfde buis, niet tegelijk', 1500, 800, C.teal, q.on('dezelfde', 1) * (1 - q.on('zwellichamen', 1)), 24);
    chip(ctx, 'zwellichamen vol bloed: erectie', 1500, 800, MK.zwel, q.on('erectie', 1), 24); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('vocht', 1); const P = manSchema(ctx, 720, 486, 1.08, { t, hl: { zaadbal: k, blaasjes: k, prostaat: k } });
    manNamen(ctx, P, { zaadbal: 1, blaasjes: 1, prostaat: 1 });
    const badge = (l, x, y) => { const [sx, sy] = P(x, y); ctx.save(); ctx.globalAlpha *= k; circ(ctx, sx, sy, 24, C.goud); text(ctx, l, sx, sy + 10, fTekst(30, 800), '#121A26', 'center'); ctx.restore(); };
    badge('a', 870, 760); badge('b', 690, 350); badge('c', 812, 530);
    const sp = q.on('Sperma', 1); if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; regel(ctx, 'sperma', 1300, 300, 1, C.text, 34, 'left', 800); roundRect(ctx, 1300, 340, 480, 70, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 2); for (let i = 0; i < 4; i++) zaadcel(ctx, 1340 + i * 120, 375 + Math.sin(t * 2 + i) * 6, 0, t + i, 0.6, 1); ctx.restore(); }
    vraagteken(ctx, 1540, 560, q.on('vandaan', 1), 120); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const zb = q.on('zaadblaasjes', 1), pr = q.on('prostaat', 1), zc = q.on('procent', 1);
    const P = manSchema(ctx, 470, 470, 0.72, { t, hl: { blaasjes: zb * (1 - pr), prostaat: pr * (1 - q.on('alleen', 1)), zaadbal: q.on('alleen', 1) } });
    manNamen(ctx, P, { blaasjes: zb, prostaat: pr, zaadbal: q.on('alleen', 1) });
    const bx = 960, by = 300, bw = 820, bh = 90; regel(ctx, 'sperma', bx, by - 24, 1, C.text, 32, 'left', 800);
    roundRect(ctx, bx, by, bw, bh, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 2);
    const seg = (x0, frac, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(col, 0.7); ctx.fillRect(bx + x0 * bw, by, frac * bw * a, bh); ctx.restore(); };
    seg(0, 0.04, '#F2F2EE', zc); seg(0.04, 0.66, MK.blaasjes, zb); seg(0.70, 0.29, MK.prostaat, pr);
    regel(ctx, 'zaadcellen: een paar %', bx, by + bh + 46, zc, C.text, 24, 'left', 700);
    regel(ctx, 'zaadblaasjes ± 2/3', bx + 0.37 * bw, by + 60, zb, '#121A26', 30, 'center', 800); regel(ctx, 'prostaat ± 1/4 – 1/3', bx + 0.845 * bw, by + 60, pr, C.text, 26, 'center', 800);
    chip(ctx, 'met suiker: brandstof voor de zaadcellen', 1370, 520, MK.blaasjes, q.on('suiker', 1), 24);
    chip(ctx, 'stoffen die helpen overleven en bewegen', 1370, 600, MK.prostaat, q.on('overleven', 1), 24);
    const mis = q.on('dus', 1); if (mis > 0.01) { tag(ctx, 'zaadcellen komen uit de prostaat', 1370, 720, C.koraal, mis, 'center', 26); kruis(ctx, 1370, 704, 24, mis); }
    tag(ctx, 'zaadcellen: alleen uit de zaadballen', 1370, 820, C.groen, q.on('alleen', 1), 'center', 28); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1); const fade2 = (w1, w2) => on(w1) * (1 - on(w2));
    const ep = clamp((t - q.at('eisprong')) / 2.5, 0, 1);
    const P = vrouwSchema(ctx, 820, 480, 0.92, { t, dik: 0.5, eisprong: t > q.at('eisprong') && t < q.at('baarmoeder') + 1 ? ep : -1,
      hl: { stok: fade2('eierstok', 'eileider'), leider: fade2('eileider', 'baarmoeder') + 0.6 * fade2('bevrucht', 'baarmoeder'), baarmoeder: fade2('baarmoeder', 'baarmoederslijmvlies'), slijm: fade2('baarmoederslijmvlies', 'baarmoederhals'), hals: fade2('baarmoederhals', 'vagina'), vagina: fade2('vagina', 'schaamlippen') } });
    vrouwNamen(ctx, P, { stok: on('eierstok'), leider: on('eileider'), trechter: on('trechter'), baarmoeder: on('baarmoeder'), slijm: on('baarmoederslijmvlies'), hals: on('baarmoederhals'), vagina: on('vagina') });
    chip(ctx, 'bijna helemaal binnen in de buik', 820, 130, C.text2, fade2('binnen', 'eileider'), 24);
    chip(ctx, '± zo groot als een amandel', 520, 640, VK.stok, fade2('amandel', 'baarmoeder'), 22);
    chip(ctx, 'hier kan bevruchting plaatsvinden', 820, 130, VK.leider, fade2('bevrucht', 'peer'), 24);
    chip(ctx, 'holle spier, ± zo groot als een peer', 820, 130, VK.wand, fade2('peer', 'nestelen'), 24);
    chip(ctx, 'hier kan een embryo zich nestelen', 820, 130, VK.slijm, fade2('nestelen', 'schaamlippen'), 24);
    buitenSchema(ctx, 1640, 560, 1, { a: on('schaamlippen'), lip: 1, cli: on('clitoris'), buis: on('opening'), vag: on('opening') });
    naamBij(ctx, 'schaamlippen', null, 1640, 760, on('schaamlippen'), 'center'); naamBij(ctx, 'clitoris', null, 1664, 474, on('clitoris'), 'left'); naamBij(ctx, 'urinebuis', null, 1662, 540, on('opening'), 'left'); naamBij(ctx, 'vagina', null, 1670, 612, on('opening'), 'left'); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const P = vrouwSchema(ctx, 820, 480, 0.92, { t, hl: { stok: 0.6 + 0.4 * Math.sin(t * 3) } }); vrouwNamen(ctx, P, { stok: 1 });
    persoon(ctx, 'noor', 1560, 880, 500 / 0.97, { uit: 'denkt', pose: 'denk', kijk: -1, t, a: q.on('meisje', 1) }); vraagteken(ctx, 1700, 360, q.on('eicellen', 1), 110); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const n = Math.round(lerp(40, 260, q.on('aangelegd', 1, 1.2))); eierstokGroot(ctx, 640, 470, 400, 260, { n, groei: q.on('groepje', 1, 1.5), eis: clamp((t - q.at('eisprong')) / 2, 0, 1), t });
    naamBij(ctx, 'eierstok', 'vergroot', 640, 790, 1, 'center');
    chip(ctx, 'al aangelegd vóór de geboorte', 640, 160, C.goud, q.on('aangelegd', 1) * (1 - q.on('driehonderdduizend', 1)), 26);
    chip(ctx, 'bij de puberteit nog ± 300 000', 640, 160, C.goud, q.on('driehonderdduizend', 1), 28);
    const nw = q.on('Nieuwe', 1); if (nw > 0.01) { tag(ctx, 'elke maand nieuwe eicellen', 1440, 280, C.koraal, nw, 'center', 26); kruis(ctx, 1440, 264, 26, nw); regel(ctx, 'nieuw erbij: 0', 1440, 360, nw, C.text, 34, 'center', 800); }
    regel(ctx, 'per cyclus rijpt een groepje; meestal haalt één de eisprong', 1440, 460, q.on('groepje', 1), C.text2, 22, 'center', 700);
    const vh = q.on('vierhonderd', 1); if (vh > 0.01) { ctx.save(); ctx.globalAlpha *= vh; regel(ctx, '± 400', 1440, 570, 1, C.goud, 60, 'center', 800); regel(ctx, 'eisprongen in een heel leven', 1440, 612, 1, C.text, 26, 'center', 700); ctx.restore(); }
    const mn = q.on('mannen', 1); if (mn > 0.01) { ctx.save(); ctx.globalAlpha *= mn; paneel(ctx, 1200, 660, 480, 190, ''); ctx.beginPath(); ctx.ellipse(1280, 755, 34, 44, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); regel(ctx, 'man: steeds nieuwe', 1340, 740, 1, C.text, 28, 'left', 700); regel(ctx, 'zaadcellen', 1340, 780, 1, C.text, 28, 'left', 700); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); const tc = q.at('eerste', 1);
    // dag volgt de tekst: start op dag 1 (menstruatie), loopt door de cyclus
    const keys = [['cyclus', 1], ['helft', 9], ['midden', 14], ['bevrucht', 22], ['menstruatie', 28.9], ['onregelmatig', 30]];
    let dag = 1; for (let i = 0; i < keys.length; i++) { const t0 = q.at(keys[i][0], keys[i][0] === 'menstruatie' ? 2 : 1); if (t < t0) break; const from = i ? keys[i - 1][1] : 1; dag = lerp(from, keys[i][1], ease((t - t0) / 2.4)); }
    const dg = ((dag - 1) % 28) + 1;
    cyclusKlok(ctx, 470, 470, 270, dg, { fasen: q.on('cyclus', 1) });
    regel(ctx, 'ongeveer 4 weken', 470, 160, q.on('weken', 1), C.text, 30, 'center', 700);
    // slijmvlies-strook rechts
    const gx = 960, gy = 260, gw = 820, gh = 200; ctx.save(); ctx.globalAlpha *= q.on('baarmoederslijmvlies', 1); metaText(ctx, 'dikte baarmoederslijmvlies', gx, gy - 18, C.grain, 'left', 20); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx, gy + gh); for (let d = 1; d <= dag && d <= 29; d += 0.25) ctx.lineTo(gx + (d - 1) / 28 * gw, gy + gh - slijmDikte(d) * gh); ctx.lineTo(gx + (Math.min(dag, 29) - 1) / 28 * gw, gy + gh); ctx.closePath(); ctx.fillStyle = rgba(VK.slijm, 0.55); ctx.fill();
    for (const d of [1, 14, 28]) text(ctx, 'dag ' + d, gx + (d - 1) / 28 * gw, gy + gh + 34, fTekst(22), C.text2, 'center'); ctx.restore();
    chip(ctx, 'eicel rijpt, slijmvlies wordt dikker', 1370, 540, C.goud, q.on('helft', 1) * (1 - q.on('midden', 1)), 24);
    const es = q.on('eisprong', 1) * (1 - q.on('bevrucht', 1)); if (es > 0.01) { chip(ctx, 'eisprong: eicel naar de eileider', 1370, 540, C.goud, es, 24); eicel(ctx, 1370, 640, 22, es); }
    chip(ctx, 'niet bevrucht: slijmvlies laat los ± 2 weken na de eisprong', 1370, 540, C.teal, q.on('bevrucht', 1) * (1 - q.on('menstruatie', 2)), 22);
    const me = q.on('menstruatie', 2); if (me > 0.01) { tag(ctx, 'menstruatie', 1370, 560, VK.slijm, me, 'center', 30); }
    const ni = q.on('naar', 1) * (1 - q.on('onregelmatig', 1)); if (ni > 0.01) { chip(ctx, 'slijmvlies met wat bloed', 1250, 660, VK.slijm, ni, 24); tag(ctx, 'de eicel', 1250, 740, C.koraal, ni, 'center', 24); kruis(ctx, 1250, 726, 20, ni); }
    chip(ctx, 'eerste jaren: vaak onregelmatig, dat is normaal', 1370, 700, C.groen, q.on('onregelmatig', 1), 24);
    tag(ctx, 'meer: film Van bevruchting tot baby', 1370, 800, C.goud, q.on('film', 1), 'center', 26); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 170, ph = 560;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 64, pw, ph - 64); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'startsein', q.on('startsein', 1), (x) => { const cx = x + pw / 2; [['hypothalamus', HK.klier], ['hypofyse', HK.klier], ['zaadbal / eierstok', C.oker], ['testosteron / oestrogeen', C.koraal]].forEach(([s2, c], i) => { const y = y0 + 130 + i * 112; roundRect(ctx, x + 30, y - 36, pw - 60, 60, 14); shape(ctx, rgba(c, 0.18), c, 2); text(ctx, s2, cx, y + 4, fTekst(24, 700), C.text, 'center'); if (i) pijl(ctx, cx, y - 72, cx, y - 42, C.text2, 1, 3, 10); }); });
    panel(1, 'kenmerken', q.on('secundaire', 1), (x) => { persoon(ctx, 'sam', x + 120, y0 + 500, 330, { uit: 'blij', t }); persoon(ctx, 'noor', x + 280, y0 + 500, 330, { uit: 'blij', t, kijk: -1 }); regel(ctx, 'primair: al bij de geboorte', x + pw / 2, y0 + 530, 1, C.text2, 20, 'center', 700); });
    panel(2, 'zaadcel', q.on('Zaadcellen', 1), (x) => { const P = manSchema(ctx, x + 200, y0 + 330, 0.5, { t, hl: { blaasjes: q.on('vocht', 1), prostaat: q.on('vocht', 1) } }); lijnPad(ctx, ZAADROUTE.map(([a, b]) => P(a, b)), rgba(C.goud, 0.8), 3); regel(ctx, 'vocht: zaadblaasjes + prostaat', x + pw / 2, y0 + 530, q.on('vocht', 1), C.groen, 20, 'center', 700); });
    panel(3, 'eicellen', q.on('Eicellen', 1), (x) => { eierstokGroot(ctx, x + 200, y0 + 300, 150, 110, { n: 80, t }); regel(ctx, 'voorraad vóór de geboorte', x + pw / 2, y0 + 480, 1, C.goud, 22, 'center', 700); regel(ctx, 'geen nieuwe erbij', x + pw / 2, y0 + 520, 1, C.koraal, 22, 'center', 700); });
    tag(ctx, 'wanneer het begint, verschilt veel tussen mensen', 960, 820, C.goud, q.on('verschilt', 1) * (1 - q.on('Daan', 1)), 'center', 28);
    const d = q.on('Daan', 1); if (d > 0.01) { tag(ctx, 'Daan: startsein komt gewoon wat later', 960, 820, C.groen, d, 'center', 28); } },
};

// Gedrag 11 · Slimme dieren — scènes per alinea (v1.0, 15 okt 2026). Bilal en de slimme Hans; regel van Morgan; Köhler en de chimpansees; Nieuw-Caledonische kraaien en de waterbuis; spiegeltest bij chimpansee, ekster en hond; vwo: poetsvis.

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }
const HOND = '#C9A26A', HONDD = '#8A6A44';
// hond (zijaanzicht, kop rechts) met kwijl
function hond(ctx, x, y, s, o = {}) { const { a = 1, kwijl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = HONDD; ctx.lineWidth = 16; ctx.lineCap = 'round'; for (const lx of [-90, -60, 40, 70]) { ctx.beginPath(); ctx.moveTo(lx, 20); ctx.lineTo(lx, 110); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-120, -10); ctx.quadraticCurveTo(-170, -50 + Math.sin(t * 6) * 10, -160, -80); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-10, 0, 130, 55, 0, 0, 6.283); shape(ctx, HOND, null);
  ctx.beginPath(); ctx.ellipse(130, -60, 60, 50, 0, 0, 6.283); shape(ctx, HOND, null); ctx.beginPath(); ctx.ellipse(185, -40, 40, 26, 0, 0, 6.283); shape(ctx, HOND, null); circ(ctx, 222, -48, 9, '#2A1E14'); circ(ctx, 140, -78, 7, '#2A1E14');
  ctx.beginPath(); ctx.ellipse(100, -60, 22, 48, 0.3, 0, 6.283); shape(ctx, HONDD, null);
  if (kwijl > 0.01) { ctx.save(); ctx.globalAlpha *= kwijl; for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); ctx.fillStyle = rgba('#9FD8F0', 0.9 * (1 - ph)); ctx.beginPath(); ctx.ellipse(196 + i * 8, -16 + ph * 80, 6, 10, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// ---------- tekeningen ----------
const SEP = '#D6C29A', SEPD = '#4A3620';
function fotoKader(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 10); shape(ctx, '#F2EAD8', '#9A8A6A', 2); ctx.fillStyle = SEP; ctx.fillRect(x, y, w, h); ctx.fillStyle = rgba('#8A6A3A', 0.25); ctx.fillRect(x, y + h - 160, w, 160); ctx.restore(); }
// paard van opzij, kop links; tik = 0..1 (rechtervoorbeen omhoog)
function paard(ctx, x, y, s, o = {}) { const { a = 1, tik = 0, col = '#6A4A2A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 16;
  const legs = [[-70, 0], [-40, 0], [70, 0], [100, 0]]; legs.forEach(([lx], i) => { ctx.beginPath(); ctx.moveTo(lx, -120); if (i === 0) { ctx.lineTo(lx - 10 * tik, -60 - 10 * tik); ctx.lineTo(lx + 10 - 20 * tik, -6 - 40 * tik); } else { ctx.lineTo(lx, -60); ctx.lineTo(lx, 0); } ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(15, -150, 120, 50, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-80, -170); ctx.lineTo(-130, -260); ctx.lineTo(-95, -280); ctx.lineTo(-40, -180); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(-150, -255, 50, 24, -0.5, 0, 6.283); ctx.fill(); circ(ctx, -130, -275, 5, '#F2EAD8');
  ctx.strokeStyle = '#2A1A0C'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-100, -285); ctx.quadraticCurveTo(-70, -240, -55, -190); ctx.stroke(); ctx.beginPath(); ctx.moveTo(130, -170); ctx.quadraticCurveTo(170, -140, 160, -70); ctx.stroke(); ctx.restore(); }
// heer met hoed, kijkt naar rechts; buig = 0 (rechtop) .. 1 (voorover)
function heer(ctx, x, y, s, o = {}) { const { a = 1, buig = 0, col = SEPD } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-10, -110); ctx.moveTo(14, 0); ctx.lineTo(10, -110); ctx.stroke();
  ctx.save(); ctx.translate(0, -110); ctx.rotate(0.35 * buig); roundRect(ctx, -30, -130, 60, 135, 18); ctx.fill(); ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(20, -110); ctx.lineTo(48, -50); ctx.stroke(); circ(ctx, 0, -160, 26, col); ctx.fillRect(-34, -186, 68, 8); ctx.fillRect(-22, -222, 44, 38); circ(ctx, 16, -150, 9, '#BBA27A'); ctx.restore(); ctx.restore(); }
function chimp(ctx, x, y, s, o = {}) { const { a = 1, pose = 'zit', t = 0, dot = 0, hand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const c = '#3A2C24', g = '#C9A688';
  ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineWidth = 18; const sp = pose === 'spring' ? Math.abs(Math.sin(t * 5)) * 40 : 0; ctx.translate(0, -sp);
  ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(-40, 0); ctx.moveTo(26, -40); ctx.lineTo(40, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -80, 46, 60, 0, 0, 6.283); ctx.fillStyle = c; ctx.fill();
  const reik = pose === 'reik' || pose === 'spring'; ctx.beginPath(); ctx.moveTo(-40, -110); ctx.lineTo(reik ? -50 : -60, reik ? -230 : -40); ctx.moveTo(40, -110); if (hand > 0) { ctx.lineTo(lerp(60, 20, hand), lerp(-40, -175, hand)); ctx.stroke(); circ(ctx, lerp(60, 20, hand), lerp(-40, -175, hand), 11, '#5A4434'); ctx.beginPath(); } else ctx.lineTo(reik ? 50 : 60, reik ? -230 : -40); ctx.stroke();
  circ(ctx, 0, -158, 36, c); ctx.beginPath(); ctx.ellipse(0, -150, 26, 24, 0, 0, 6.283); ctx.fillStyle = g; ctx.fill(); circ(ctx, -34, -160, 11, g); circ(ctx, 34, -160, 11, g); circ(ctx, -9, -158, 4, '#121A26'); circ(ctx, 9, -158, 4, '#121A26'); ctx.strokeStyle = '#5A4434'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -140, 9, 0.2, Math.PI - 0.2); ctx.stroke();
  if (dot > 0.01) circ(ctx, 0, -182, 8, rgba('#E0452B', dot)); if (pose === 'denk') { regel(ctx, '?', 46, -210, 0.8, C.goud, 40, 'center', 700); } ctx.restore(); }
function kist(ctx, x, y, w = 140, h = 110, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#A8763E'; ctx.fillRect(x - w / 2, y - h, w, h); ctx.strokeStyle = '#6A4A22'; ctx.lineWidth = 4; ctx.strokeRect(x - w / 2, y - h, w, h); ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x + w / 2, y); ctx.moveTo(x + w / 2, y - h); ctx.lineTo(x - w / 2, y); ctx.stroke(); ctx.restore(); }
function banaan(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E8C84A'; ctx.lineWidth = 16; ctx.lineCap = 'round'; for (const d of [-14, 0, 14]) { ctx.beginPath(); ctx.arc(d, -30, 40, 0.5, 2.4); ctx.stroke(); } ctx.restore(); }
function kraai(ctx, x, y, s, o = {}) { const { a = 1, flip = false, t = 0, kop = 0, takje = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(flip ? -s : s, s); const c = '#1C1E26';
  ctx.strokeStyle = '#4A4A50'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-10, 26); ctx.moveTo(8, 0); ctx.lineTo(6, 26); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, -10); ctx.lineTo(-30, -30); ctx.lineTo(-30, -6); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -24, 42, 26, -0.15, 0, 6.283); ctx.fill();
  ctx.save(); ctx.translate(36, -46); ctx.rotate(kop * 0.9); circ(ctx, 0, 0, 20, c); ctx.beginPath(); ctx.moveTo(14, -6); ctx.lineTo(46, 2); ctx.lineTo(14, 8); ctx.closePath(); ctx.fillStyle = '#3A3A44'; ctx.fill(); circ(ctx, 6, -5, 3.5, '#E8E8E0');
  if (takje > 0.01) { ctx.strokeStyle = rgba('#9A7A4A', takje); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(30, 2); ctx.lineTo(110, 26); ctx.lineTo(104, 36); ctx.stroke(); } ctx.restore(); ctx.restore(); }
function buis(ctx, x, y, w, h, niveau, a = 1) { if (a <= 0.01) return y; ctx.save(); ctx.globalAlpha *= a; const wy = y + h - h * niveau; ctx.fillStyle = rgba('#5BA4C9', 0.45); ctx.fillRect(x, wy, w, y + h - wy); ctx.strokeStyle = '#C9D6E2'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke(); ctx.restore(); return wy; }
function steen(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 16 * s, 12 * s, 0.3, 0, 6.283); ctx.fillStyle = '#7A7E86'; ctx.fill(); ctx.restore(); }
function kurk(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14 * s, y - 10 * s, 28 * s, 20 * s, 5); shape(ctx, '#D9B27A', '#9A7A4A', 1.5); ctx.restore(); }
function hapje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; kurk(ctx, x, y, 1.2); circ(ctx, x, y - 14, 9, '#C0392B'); ctx.restore(); }
function ekster(ctx, x, y, s, o = {}) { const { a = 1, flip = false, sticker = 0, krab = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.beginPath(); ctx.moveTo(-40, -20); ctx.lineTo(-140, 10); ctx.lineTo(-130, 24); ctx.lineTo(-36, -6); ctx.closePath(); ctx.fillStyle = '#1E2A4A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -24, 44, 26, -0.1, 0, 6.283); ctx.fillStyle = '#121418'; ctx.fill(); ctx.beginPath(); ctx.ellipse(4, -14, 30, 14, -0.1, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill(); ctx.beginPath(); ctx.ellipse(-12, -32, 22, 8, -0.2, 0, 6.283); ctx.fill();
  circ(ctx, 40, -50, 18, '#121418'); ctx.beginPath(); ctx.moveTo(54, -54); ctx.lineTo(78, -48); ctx.lineTo(54, -42); ctx.closePath(); ctx.fillStyle = '#2A2A30'; ctx.fill(); circ(ctx, 46, -54, 3, '#E8E8E0');
  if (sticker > 0.01) circ(ctx, 50, -32, 7, rgba('#E8C84A', sticker));
  ctx.strokeStyle = '#4A4A50'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-6, 26); ctx.moveTo(10, 0); if (krab > 0) { const k = Math.sin(t * 10) * 0.5 + 0.5; ctx.lineTo(lerp(30, 48, k), lerp(-10, -30, k)); } else ctx.lineTo(10, 26); ctx.stroke(); ctx.restore(); }
function spiegel(ctx, x, y, w, h, a = 1, dicht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 10, y - 10, w + 20, h + 20, 12); shape(ctx, '#8A6A44', '#5A4428', 2); ctx.fillStyle = '#B8CCD8'; ctx.fillRect(x, y, w, h); ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.beginPath(); ctx.moveTo(x + 20, y); ctx.lineTo(x + 80, y); ctx.lineTo(x + 20, y + 120); ctx.closePath(); ctx.fill(); if (dicht > 0.01) { ctx.fillStyle = rgba('#3A3A44', dicht); ctx.fillRect(x, y, w, h); } ctx.restore(); }
function poetsvis(ctx, x, y, s, o = {}) { const { a = 1, flip = false, vlek = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-100, -20 + Math.sin(t * 8) * 4); ctx.lineTo(-100, 20 + Math.sin(t * 8) * 4); ctx.closePath(); ctx.fillStyle = '#4A7AC9'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, 76, 20, 0, 0, 6.283); ctx.fillStyle = '#7FB0E8'; ctx.fill(); ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.moveTo(76, -2); ctx.lineTo(-90, -4); ctx.lineTo(-90, 6); ctx.lineTo(76, 4); ctx.closePath(); ctx.fill(); circ(ctx, 58, -6, 4, '#F2F2EE'); circ(ctx, 59, -6, 2, '#121418');
  if (vlek > 0.01) circ(ctx, 50, 12, 6, rgba('#7A4A2A', vlek)); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { persoon(ctx, 'bilal', 1260, 880, 520, { uit: 'denkt', pose: 'denk', kijk: 1, t }); const wy = buis(ctx, 1600, 520, 90, 300, 0.6); hapje(ctx, 1645, wy - 2); kraai(ctx, 1640, 510, 1.3, { t, kop: 0.6 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 200, 880, 500, { uit: q.on('bedrog', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: 'staan', kijk: 1, t });
    const fa = q.on('filmpje', 1); fotoKader(ctx, 440, 190, 1360, 650, fa); if (fa <= 0.01) return; ctx.save(); ctx.globalAlpha *= fa;
    text(ctx, 'Berlijn, rond 1904', 470, 236, fMeta(22), SEPD, 'left');
    const t0 = q.at('tikte'); let n = 0, tik = 0; if (t > t0) { const u = (t - t0) / 0.42; n = Math.min(5, Math.floor(u) + 1); tik = n < 5 || u < 5 ? Math.max(0, Math.sin((u % 1) * Math.PI)) : 0; if (u > 5) tik = 0; }
    paard(ctx, 1240, 780, 1.2, { tik, a: q.on('paard', 1) }); regel(ctx, 'de slimme Hans', 1300, 340, q.on('Hans', 1), SEPD, 30, 'center', 700);
    heer(ctx, 760, 790, 1.1, { a: q.on('baasje', 1), buig: t > t0 && n < 5 ? 0.6 : 0 });
    const tw = q.on('twee', 1); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; wolk(ctx, 560, 300, 260, 90, '2 + 3 = ?', 1, '#F2EAD8', 34); ctx.restore(); }
    for (let i = 0; i < n; i++) text(ctx, String(i + 1), 800 + i * 50, 300, fTitel(44), SEPD, 'center');
    ['rekenen', 'spellen', 'datum'].forEach((w, i) => chip(ctx, w === 'datum' ? 'de datum' : w, 1650, 330 + i * 70, C.koraal, q.on(w, 1), 24));
    const co = q.on('commissie', 1); if (co > 0.01) { ctx.save(); ctx.globalAlpha *= co; for (let i = 0; i < 4; i++) heer(ctx, 1560 + i * 60, 820, 0.45); ctx.restore(); chip(ctx, 'commissie: geen bedrog', 1650, 600, SEPD, q.on('bedrog', 1), 22); }
    ctx.restore(); vraagteken(ctx, 1120, 300, q.on('denk', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Wat', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'Oskar Pfungst test Hans (1907)', 140, 150, q.on('Pfungst', 1), C.text, 34, 'left', 700);
      const ke = q.on('keek', 1, 0.8), P1 = 1 - ke;
      if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; [[160, 'vraagsteller weet het antwoord', true, 1], [1000, 'weet het niet, of Hans ziet hem niet', false, q.on('niet', 1)]].forEach(([x, l, ok, a]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fotoKader(ctx, x, 230, 760, 520); heer(ctx, x + 200, 720, 0.9, { buig: 0.3 }); paard(ctx, x + 540, 720, 0.85); if (!ok) { ctx.fillStyle = rgba('#2A1E14', 0.7); ctx.fillRect(x + 150, 330, 30, 400); } regel(ctx, l, x + 380, 290, 1, SEPD, 26, 'center', 700); ok ? vink_(ctx, x + 680, 400, 34, 1) : kruis(ctx, x + 680, 400, 34, q.on('naast', 1)); ctx.restore(); }); ctx.restore(); }
      if (ke > 0.01) { ctx.save(); ctx.globalAlpha *= ke; fotoKader(ctx, 300, 230, 1320, 560); const t0 = q.at('keek'), u = ((t - t0) % 5) / 5, n = Math.min(5, Math.floor(u * 6.5)); const rt = q.on('rechtop', 1);
        heer(ctx, 640, 760, 1.1, { buig: n >= 5 && rt > 0.5 ? 0 : 0.7 }); paard(ctx, 1250, 760, 1.0, { tik: n < 5 ? Math.abs(Math.sin(u * 6.5 * Math.PI)) : 0 }); for (let i = 0; i < n; i++) text(ctx, String(i + 1), 900 + i * 46, 420, fTitel(40), SEPD, 'center');
        chip(ctx, 'bij 5: even een beetje rechtop', 960, 300, C.koraal, rt, 26); chip(ctx, 'zonder het zelf te merken', 960, 860 - 20, C.text2, q.on('merken', 1), 24); ctx.restore(); }
      tag(ctx, 'knap: signalen lezen, geen rekenen', 1400, 150, C.goud, q.on('Knap', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'Wat kunnen dieren dan wel?', 960, 520, 1 - q.on('opneemt', 1), C.text, 48, 'center', 700); tag(ctx, 'cognitie', 960, 180, C.goud, q.on('cognitie', 1), 'center', 36);
      [['informatie opnemen', 'opneemt'], ['onthouden', 'onthoudt'], ['gebruiken om problemen op te lossen', 'gebruikt']].forEach(([s2, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 200 + i * 540, 260, 440, 90, 16); shape(ctx, rgba(C.teal, 0.14), C.teal, 2); text(ctx, s2, 420 + i * 540, 316, fTekst(26, 700), C.text, 'center'); if (i < 2) pijl(ctx, 650 + i * 540, 305, 730 + i * 540, 305, C.line, 1, 3, 12); ctx.restore(); });
      chip(ctx, 'eerlijk testen: met controles', 960, 440, C.text2, q.on('controles', 1), 26);
      const ev = q.on('eenvoudiger', 1); if (ev > 0.01) { ctx.save(); ctx.globalAlpha *= ev; roundRect(ctx, 360, 520, 520, 140, 16); shape(ctx, rgba(C.groen, 0.14), C.groen, 2); text(ctx, 'signalen lezen', 620, 584, fTekst(32, 700), C.text, 'center'); text(ctx, 'eenvoudiger vermogen', 620, 624, fTekst(22, 600), C.groen, 'center'); vink_(ctx, 820, 560, 26, q.on('kies', 1)); ctx.restore(); }
      const sl = q.on('slimmer', 1); if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; roundRect(ctx, 1040, 520, 520, 140, 16); shape(ctx, rgba(C.koraal, 0.14), C.koraal, 2); text(ctx, 'rekenen', 1300, 584, fTekst(32, 700), C.text, 'center'); text(ctx, 'slimmer vermogen', 1300, 624, fTekst(22, 600), C.koraal, 'center'); kruis(ctx, 1500, 560, 22, 1); ctx.restore(); }
      tag(ctx, 'regel van Morgan: geen slimmere verklaring dan nodig', 960, 780, C.goud, q.on('Morgan', 1), 'center', 30); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Ook', 2, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const ko = q.on('Rond', 1, 0.8);
      if (ko < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ko; tag(ctx, 'proefondervindelijk leren (trial-and-error)', 960, 260, C.teal, q.on('proefondervindelijk', 1), 'center', 32); [['proberen', 0], ['het werkt', 1], ['vaker doen', 2]].forEach(([s2, i]) => { const a = q.on(['proberen', 'werkt', 'vaker'][i], 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, 560 + i * 400, 500, 110, rgba(C.teal, 0.14), C.teal, 3); text(ctx, s2, 560 + i * 400, 512, fTekst(30, 700), C.text, 'center'); if (i < 2) pijl(ctx, 680 + i * 400, 500, 840 + i * 400, 500, C.line, 1, 4, 14); ctx.restore(); }); ctx.restore(); }
      if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; regel(ctx, 'Wolfgang Köhler · rond 1915', 140, 150, 1, C.text, 32, 'left', 700); roundRect(ctx, 200, 200, 1100, 660, 14); shape(ctx, rgba('#4E7A44', 0.25), C.line, 2); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(900, 200); ctx.lineTo(900, 320); ctx.stroke();
        const sch = q.on('schoven', 1, 1.6), st = q.on('stapelen', 1, 1.2); const kx = lerp(420, 900, sch); kist(ctx, kx, 850, 160, 120); kist(ctx, 1150, 850, 150, 110, 1 - st); if (st > 0.01) kist(ctx, 900, lerp(850, 730, st), 150, 110, st);
        banaan(ctx, 900, 350, 1.2);
        const stage = t < q.at('Eerst') ? 'zit' : t < q.at('stopten') ? 'spring' : t < q.at('schoven') ? 'denk' : 'klim'; if (stage === 'klim') { const up = st > 0.5 ? 240 : 120; chimp(ctx, lerp(kx - 140, 900, clamp((t - q.at('schoven') - 1.6) / 1, 0, 1)), 850 - (t > q.at('schoven') + 1.6 ? up : 0), 1.0, { pose: 'reik', t }); } else chimp(ctx, 700, 850, 1.0, { pose: stage, t });
        tag(ctx, 'inzichtelijk leren: een plotselinge oplossing', 1440, 160, C.goud, q.on('inzichtelijk', 1), 'center', 26);
        chip(ctx, 'later ook stapelen: veel oefenen', 1560, 420, C.text2, st, 22); chip(ctx, 'inzicht bouwt voort op ervaring', 1560, 520, C.teal, q.on('ervaring', 1), 22); ctx.restore(); } ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const lb = q.on('lab', 1, 0.8);
      if (lb < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - lb; ctx.fillStyle = '#5A4228'; ctx.beginPath(); ctx.ellipse(1150, 640, 260, 60, -0.1, 0, 6.283); ctx.fill(); kraai(ctx, 760, 560, 2.2, { t, takje: q.on('haakjes', 1) }); regel(ctx, 'Nieuw-Caledonische kraai', 760, 300, 1, C.text, 30, 'center', 700); chip(ctx, 'haakjes van takjes', 1200, 420, C.goud, q.on('haakjes', 1), 26); circ(ctx, 1240, 640, 10, '#E8D8A0'); ctx.restore(); }
      if (lb > 0.01) { ctx.save(); ctx.globalAlpha *= lb; const wy = buis(ctx, 860, 340, 170, 460, 0.35); hapje(ctx, 945, wy - 2); kraai(ctx, 760, 330, 1.6, { t, kop: 0.5 });
        chip(ctx, 'eerst geleerd: steentjes in een buis gooien', 960, 200, C.text2, q.on('steentjes', 1), 24);
        const dr = q.on('drijven', 1), zk = q.on('zinken', 1); for (let i = 0; i < 3; i++) kurk(ctx, 1240 + i * 50, 780, 1.2, dr); regel(ctx, 'drijft', 1290, 840, dr, C.text, 24, 'center', 700); for (let i = 0; i < 3; i++) steen(ctx, 1460 + i * 50, 782, 1.3, zk); regel(ctx, 'zinkt', 1510, 840, zk, C.text, 24, 'center', 700);
        vraagteken(ctx, 1400, 520, q.on('denk', 1), 100); ctx.restore(); } ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('lastigere', 1, 0.8), A = 1 - L;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const t0 = q.at('zinkende'); const k = clamp(Math.floor((t - t0) / 0.9), 0, 5); const niv = 0.35 + 0.1 * k; const wy = buis(ctx, 860, 300, 170, 500, niv);
      for (let i = 0; i < k; i++) steen(ctx, 900 + (i % 3) * 40, 780 - Math.floor(i / 3) * 24, 1.2); const ph = ((t - t0) % 0.9) / 0.9; if (t > t0 && k < 5) steen(ctx, 945, lerp(300, wy, ph), 1.2);
      hapje(ctx, 945, wy - 2); kraai(ctx, 760, 290, 1.6, { t, kop: 0.5 }); for (let i = 0; i < 3; i++) kurk(ctx, 1240 + i * 50, 780, 1.2, 0.5); for (let i = k; i < 5; i++) steen(ctx, 1460 + (i - k) * 40, 782, 1.3);
      chip(ctx, 'vooral zinkende voorwerpen', 1450, 300, C.goud, q.on('zinkende', 1), 26); chip(ctx, 'water stijgt, hapje komt binnen bereik', 1450, 390, C.teal, q.on('stijgt', 1), 24); chip(ctx, 'die keuze leerden ze in de eerste pogingen', 1450, 480, C.text2, q.on('eerste', 1), 22); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'lastigere versie: verborgen verbinding', 960, 200, 1, C.text, 30, 'center', 700);
      buis(ctx, 600, 300, 150, 440, 0.4); buis(ctx, 1170, 300, 150, 440, 0.4); ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([10, 8]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(675, 740); ctx.lineTo(675, 800); ctx.lineTo(1245, 800); ctx.lineTo(1245, 740); ctx.stroke(); ctx.setLineDash([]); hapje(ctx, 1245, 300 + 440 * 0.6 - 2); regel(ctx, 'stenen hier in', 675, 280, 1, C.text2, 22, 'center', 700);
      tag(ctx, 'ze gokten maar wat', 960, 560, C.koraal, q.on('gokten', 1), 'center', 30); chip(ctx, 'slim, maar geen natuurkundeles', 960, 860 - 20, C.text2, q.on('natuurkundeles', 1), 24); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Onderzoekers', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; tag(ctx, 'spiegeltest', 960, 170, C.goud, q.on('spiegeltest', 1), 'center', 34); const dot = q.on('vlekje', 1), zo = q.on('Zonder', 1), me = q.on('Met', 2);
      const dicht = zo * (1 - me); spiegel(ctx, 1000, 260, 420, 560, 1, dicht); ctx.save(); ctx.beginPath(); ctx.rect(1000, 260, 420, 560); ctx.clip(); ctx.globalAlpha *= 1 - dicht; ctx.translate(2420, 0); ctx.scale(-1, 1); chimp(ctx, 1210, 820, 1.4, { dot, hand: me * clamp((t - q.at('Met', 2)) / 0.8, 0, 1) }); ctx.restore();
      chimp(ctx, 640, 820, 1.4, { dot, hand: me * clamp((t - q.at('Met', 2)) / 0.8, 0, 1) }); regel(ctx, 'vlekje op het voorhoofd', 640, 380, dot * (1 - zo), C.koraal, 24, 'center', 700);
      chip(ctx, 'zonder spiegel: niet aan de plek', 1640, 300, C.text2, zo, 22); chip(ctx, 'met spiegel: wel → "dat ben ik"', 1640, 380, C.goud, q.on('snappen', 1), 22);
      chip(ctx, 'veel chimpansees: ja', 1640, 520, C.groen, q.on('chimpansees', 1), 24); chip(ctx, 'apen met een staart, zoals makaken: nee', 1640, 600, C.koraal, q.on('makaken', 1), 22); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; spiegel(ctx, 1100, 300, 380, 500); ekster(ctx, 760, 700, 2.4, { sticker: q.on('stickertje', 1), t }); ctx.save(); ctx.beginPath(); ctx.rect(1100, 300, 380, 500); ctx.clip(); ekster(ctx, 1400, 700, 2.4, { sticker: q.on('stickertje', 1), flip: true, t }); ctx.restore();
      regel(ctx, 'geel stickertje op de keel', 760, 420, q.on('stickertje', 1), C.goud, 26, 'center', 700); vraagteken(ctx, 960, 300, q.on('denk', 1), 90); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Honden', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; ekster(ctx, 600, 640, 2.4, { sticker: 1 - clamp((t - 2) / 3, 0, 0.8), krab: 1, t });
      const tw = q.on('Twee', 1); for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha *= tw; ekster(ctx, 1150 + i * 120, 420, 0.8, {}); if (i < 2) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1150 + i * 120, 400, 60, 0, 6.283); ctx.stroke(); } ctx.restore(); } regel(ctx, '2 van de 5 eksters', 1390, 540, tw, C.goud, 30, 'center', 700);
      chip(ctx, 'herhaling later: niet teruggevonden', 1390, 640, C.koraal, q.on('herhaalden', 1), 26); tag(ctx, 'voorzichtig zijn', 1390, 760, C.text2, q.on('Voorzichtig', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; chip(ctx, 'honden: zakken voor de spiegeltest', 960, 180, C.koraal, 1, 26); hond(ctx, 560, 640, 1.3, { t });
      const pl = (x, l, lab) => { ctx.beginPath(); ctx.ellipse(x, 760, 90, 24, 0, 0, 6.283); ctx.fillStyle = rgba('#E8C84A', 0.5); ctx.fill(); regel(ctx, lab, x, 820, 1, C.text, 22, 'center', 700); };
      const ex = q.on('extra', 1); pl(1000, 1, 'eigen plas'); if (ex > 0.01) { ctx.save(); ctx.globalAlpha *= ex; pl(1400, 1, 'eigen plas + extra geurtje'); for (let k = 0; k < 3; k++) { ctx.strokeStyle = rgba(C.paars, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1380 + k * 20, 740); ctx.bezierCurveTo(1390 + k * 20, 710, 1370 + k * 20, 690, 1385 + k * 20, 670); ctx.stroke(); } ctx.restore(); }
      const la = q.on('langer', 1); if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; regel(ctx, 'snuffeltijd', 1200, 360, 1, C.text2, 22, 'center', 700); roundRect(ctx, 940, 400, 120, 30, 6); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); roundRect(ctx, 1340, 400, 120 + 200 * ex, 30, 6); shape(ctx, rgba(C.goud, 0.5), C.goud, 2); ctx.restore(); }
      chip(ctx, 'herkenning met de neus, niet met de ogen?', 1200, 280, C.paars, q.on('ogen', 1), 24); tag(ctx, 'een test moet passen bij het dier', 960, 880 - 20, C.goud, q.on('passen', 1), 'center', 28); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 160, 200, 1000, 640, 18); shape(ctx, rgba('#2E6FBF', 0.25), C.line, 2); ctx.fillStyle = rgba('#C9B896', 0.4); ctx.fillRect(160, 790, 1000, 50);
    spiegel(ctx, 1040, 260, 100, 520, q.on('spiegel', 1)); const vl = q.on('vlekje', 1), sc = q.on('schrapen', 1) * (1 - q.on('Daarna', 1, 0.5));
    const fx = sc > 0.5 ? 600 + Math.sin(t * 6) * 120 : 820, fy = sc > 0.5 ? 760 : 520 + Math.sin(t) * 20; poetsvis(ctx, fx, fy, 1.8, { vlek: vl, t, flip: sc > 0.5 ? Math.cos(t * 6) < 0 : false });
    regel(ctx, 'poetsvis', 400, 260, q.on('poetsvissen', 1), C.text, 30, 'center', 700); regel(ctx, 'bruin vlekje op de keel', 820, 440, vl * (1 - sc), C.koraal, 24, 'center', 700);
    chip(ctx, '3 van de 4 schraapten hun keel', 1500, 300, C.goud, q.on('drie', 1), 24); chip(ctx, 'daarna weer kijken in de spiegel', 1500, 380, C.teal, q.on('Daarna', 1), 22); chip(ctx, 'zonder spiegel of met doorzichtig vlekje: niet', 1500, 460, C.text2, q.on('Zonder', 1), 20);
    chip(ctx, 'zelfherkenning vaker dan gedacht?', 1500, 580, C.groen, q.on('concluderen', 1), 22); chip(ctx, 'of meet de test iets anders?', 1500, 660, C.koraal, q.on('Critici', 1), 22); tag(ctx, 'nog geen overeenstemming', 1500, 780, C.goud, q.on('eens', 1), 'center', 26); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 200, ph = 540;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 64, pw, ph - 64); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'eerlijk testen', q.on('Hans', 1), (x) => { ctx.fillStyle = SEP; ctx.fillRect(x + 10, y0 + 74, pw - 20, ph - 84); heer(ctx, x + 100, 700, 0.7, { buig: 0.4 }); paard(ctx, x + 290, 700, 0.6); });
    panel(1, 'inzicht', q.on('Chimpansees', 1), (x) => { banaan(ctx, x + 200, 330, 0.9); kist(ctx, x + 200, 700, 130, 100); chimp(ctx, x + 200, 600, 0.8, { pose: 'reik', t }); });
    panel(2, 'kraai en waterbuis', q.on('kraaien', 1), (x) => { const wy = buis(ctx, x + 160, 380, 100, 300, 0.4 + 0.2 * ((t * 0.2) % 1)); hapje(ctx, x + 210, wy - 2); kraai(ctx, x + 120, 380, 1.0, { t, kop: 0.5 }); });
    panel(3, 'spiegeltest', q.on('spiegeltest', 1), (x) => { spiegel(ctx, x + 230, 340, 140, 340); ekster(ctx, x + 160, 640, 1.5, { sticker: 1, t }); });
    tag(ctx, 'slim zijn betekent niet: lijken op een mens', 960, 830, C.goud, q.on('betekent', 1), 'center', 28); },
};
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }

// Gedrag 8 · De dans van de honingbij — scènes per alinea (v1.0, 15 okt 2026). Opa Henk (imker) en Noor; rondedans, kwispeldans, zon en klok; vwo: robotbij en radar.

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }

// ---------- bijen-helpers ----------
// bij van bovenaf; ang 0 = kop omhoog, met de klok mee in radialen
function bij(ctx, x, y, s, ang = 0, o = {}) { const { a = 1, wag = 0, t = 0, dot = null, robot = false, antenne = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const wg = wag ? Math.sin(t * 40) * 0.35 * wag : 0, fl = 0.8 + 0.2 * Math.sin(t * 70);
  ctx.fillStyle = rgba('#DDEBF5', 0.55); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 15, -2, 17 * fl, 8, sx * 0.55, 0, 6.283); ctx.fill(); }
  ctx.save(); ctx.translate(0, 4); ctx.rotate(wg); ctx.beginPath(); ctx.ellipse(0, 16, 11, 18, 0, 0, 6.283); shape(ctx, robot ? '#AEB6C2' : '#E0B64A', robot ? '#6A7080' : '#5A4010', 1.5);
  if (!robot) { ctx.strokeStyle = '#3A2A10'; ctx.lineWidth = 3.5; for (const yy of [10, 18, 26]) { ctx.beginPath(); ctx.moveTo(-9.5, yy); ctx.lineTo(9.5, yy); ctx.stroke(); } } ctx.restore();
  circ(ctx, 0, -4, 9, robot ? '#7A8494' : '#7A5A2A'); circ(ctx, 0, -16, 7, robot ? '#5A6478' : '#3A2A14');
  ctx.strokeStyle = robot ? '#5A6478' : '#3A2A14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, -21); ctx.lineTo(-9, -31); ctx.moveTo(3, -21); ctx.lineTo(9, -31); ctx.stroke();
  if (dot) circ(ctx, 0, -4, 4.5, dot);
  if (antenne) { ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, -46); ctx.stroke(); }
  ctx.restore(); }
// positie in een kwispeldans: recht stuk (kwispelen) van onder naar boven, dan een boog terug, afwisselend rechts en links
function dansPos(tt, L, run, loop) { const c = 2 * (run + loop); let m = ((tt % c) + c) % c; const side = m < run + loop ? 1 : -1; const h = m % (run + loop); const R = L / 2;
  if (h < run) { const v = h / run; return { x: 0, y: R - v * L, ang: 0, wag: 1, sec: h }; }
  const v = (h - run) / loop, th = -Math.PI / 2 + v * Math.PI; const x = side * R * Math.cos(th), y = R * Math.sin(th);
  return { x, y, ang: Math.atan2(-side * R * Math.sin(th), -R * Math.cos(th)), wag: 0, sec: run }; }
function dans(ctx, cx, cy, L, rot, t, o = {}) { const { a = 1, run = 1, loop = 1.1, spoor = 0.5, s = 1.3, robot = false, dot = null, lag = 0 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.rotate(rot);
  if (spoor > 0.01) { ctx.save(); ctx.globalAlpha *= spoor; ctx.setLineDash([10, 10]); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, L / 2); ctx.lineTo(0, -L / 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, L / 2, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, L / 2, Math.PI / 2, 3 * Math.PI / 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  const p = dansPos(t - lag, L, run, loop); bij(ctx, p.x + (p.wag ? Math.sin(t * 40) * 3 : 0), p.y, s, p.ang, { t, wag: p.wag, robot, dot }); ctx.restore(); return p; }
function rondedans(ctx, cx, cy, r, t, o = {}) { const { a = 1, per = 2.2, s = 1.3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba('#F2F2EE', 0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore();
  const n = Math.floor(t / per), v = (t % per) / per, dir = n % 2 ? -1 : 1, th = -Math.PI / 2 + dir * v * 2 * Math.PI; bij(ctx, cx + r * Math.cos(th), cy + r * Math.sin(th), s, Math.atan2(-dir * Math.sin(th), -dir * Math.cos(th)), { t });
  ctx.restore(); }
function raat(ctx, x, y, w, h, o = {}) { const { a = 1, donker = 0, r = 26 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, '#B8862E', '#7A5A1E', 3); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip(); ctx.strokeStyle = rgba('#7A5A1E', 0.5); ctx.lineWidth = 2; const dx = r * Math.sqrt(3), dy = r * 1.5;
  for (let j = 0; j * dy < h + r; j++) for (let i = -1; i * dx < w + dx; i++) { const cx = x + i * dx + (j % 2 ? dx / 2 : 0), cy = y + j * dy; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const px = cx + r * Math.cos(an), py = cy + r * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke(); }
  if (donker > 0.01) { ctx.fillStyle = rgba('#0A0F18', 0.6 * donker); ctx.fillRect(x, y, w, h); } ctx.restore(); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }
function kast(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#5A4A3A'; ctx.fillRect(-60, -24, 8, 24); ctx.fillRect(52, -24, 8, 24);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -70, -24 - (i + 1) * 62, 140, 60, 4); shape(ctx, i === 1 ? '#D9C49A' : '#E6D3A8', '#9A8458', 2); }
  ctx.beginPath(); ctx.moveTo(-82, -210); ctx.lineTo(82, -210); ctx.lineTo(70, -232); ctx.lineTo(-70, -232); ctx.closePath(); shape(ctx, '#8A9AA8', '#5A6478', 2); ctx.fillStyle = '#2A1E14'; ctx.fillRect(-36, -34, 72, 8); ctx.restore(); }
function kastje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y - 26, 52, 52, 6); shape(ctx, '#E6D3A8', '#9A8458', 2); ctx.fillStyle = '#2A1E14'; ctx.fillRect(x - 12, y + 14, 24, 5); ctx.restore(); }
function bloemen(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-22, 8, '#C98ACF'], [20, 12, '#E0B64A'], [0, -18, '#F2F2EE']].forEach(([dx, dy, col]) => { for (let k = 0; k < 5; k++) { const an = k * 1.2566; circ(ctx, x + (dx + Math.cos(an) * 11) * s, y + (dy + Math.sin(an) * 11) * s, 8 * s, col); } circ(ctx, x + dx * s, y + dy * s, 6 * s, '#B8803C'); }); ctx.restore(); }
function schaaltje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 70, 20, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); ctx.beginPath(); ctx.ellipse(0, -2, 54, 13, 0, 0, 6.283); shape(ctx, rgba('#F2D27A', 0.85), null); ctx.restore(); }
function stopwatch(ctx, x, y, r, sec, a = 1, actief = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - r - 24, 24, 16, 4); shape(ctx, '#9AA3B2', null); circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 4); const an = (sec % 4) / 4 * 6.283 - Math.PI / 2; ctx.strokeStyle = actief ? C.koraal : '#5A6478'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8); ctx.stroke(); text(ctx, sec.toFixed(1).replace('.', ',') + ' s', x, y + r + 40, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
function klok(ctx, x, y, r, uur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 4); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; circ(ctx, x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82, 3, '#5A6478'); }
  ctx.strokeStyle = '#121A26'; ctx.lineCap = 'round'; const ah = (uur % 12) / 12 * 6.283, am = (uur % 1) * 6.283; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(am) * r * 0.75, y - Math.cos(am) * r * 0.75); ctx.stroke(); ctx.restore(); }
// richting: ang 0 = omhoog, met de klok mee
const punt = (cx, cy, ang, len) => [cx + len * Math.sin(ang), cy - len * Math.cos(ang)];
function hoekboog(ctx, cx, cy, r, a0, a1, col, lab, a = 1, px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, r, a0 - Math.PI / 2, a1 - Math.PI / 2, a1 < a0); ctx.stroke(); if (lab) { const m = (a0 + a1) / 2; const [lx, ly] = punt(cx, cy, m, r + 38); text(ctx, lab, lx, ly + 10, fTekst(px, 700), col, 'center'); } ctx.restore(); }
function straal(ctx, cx, cy, ang, len, col, a = 1, lw = 5, dash = false) { if (a <= 0.01) return; const [x2, y2] = punt(cx, cy, ang, len); ctx.save(); if (dash) ctx.setLineDash([12, 10]); pijl(ctx, cx, cy, x2, y2, col, a, lw, 18); ctx.restore(); }
const vlieg = (x0, y0, x1, y1, u, h = 120) => { const e = ease(u); const x = lerp(x0, x1, e), y = lerp(y0, y1, e) - Math.sin(e * Math.PI) * h; const dx = x1 - x0, dy = (y1 - y0) - Math.cos(e * Math.PI) * Math.PI * h; return { x, y, ang: Math.atan2(dx, -dy) }; };
function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function grond(ctx) { ctx.fillStyle = rgba(C.groen, 0.14); ctx.fillRect(0, 860, W, CAPTION_Y - 860); ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 860); ctx.lineTo(W, 860); ctx.stroke(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { persoon(ctx, 'henk', 1380, 880, 520, { uit: 'blij', pose: 'staan', kijk: 1, t }); kast(ctx, 1640, 860, 1);
    for (let i = 0; i < 6; i++) { const w = wander(i, t, 60, 0.8); bij(ctx, 1640 + w.x + (i - 3) * 30, 520 + w.y + (i % 3) * 40, 0.9, Math.sin(t + i) * 1.5, { t }); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); grond(ctx);
    persoon(ctx, 'henk', 220, 880, 500, { uit: 'neutraal', pose: 'staan', kijk: 1, t }); kast(ctx, 440, 860, 0.9); kast(ctx, 590, 860, 0.9);
    regel(ctx, 'Opa Henk, imker', 360, 220, q.on('imker', 1), C.text, 30, 'center', 700);
    const ha = q.on('halfuur', 1); persoon(ctx, 'noor', 1720, 880, 500, { uit: ha > 0.5 ? 'verbaasd' : 'neutraal', pose: 'staan', kijk: -1, t, a: q.on('Noor', 1) });
    schaaltje(ctx, 1440, 845, 1.2, q.on('schaaltje', 1)); regel(ctx, 'suikerwater', 1440, 790, q.on('suikerwater', 1) * (1 - ha), C.text2, 24, 'center', 600);
    const km = q.on('kilometer', 1); if (km > 0.01) { ctx.save(); ctx.globalAlpha *= km; pijl(ctx, 1010, 330, 700, 330, C.text2, 1, 3, 14); pijl(ctx, 1010, 330, 1380, 330, C.text2, 1, 3, 14); text(ctx, 'bijna 1 km', 1010, 305, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
    // de eerste bij
    const t1 = q.at('bijenkasten') + 0.4, t2 = q.at('drinkt'), t3 = q.at('vliegt');
    if (t > t1 && t < t3 + 1.8) { let p; if (t < t2) p = vlieg(520, 640, 1440, 812, (t - t1) / (t2 - t1), 260); else if (t < t3) p = { x: 1440, y: 812, ang: 0.4 }; else p = vlieg(1440, 812, 520, 640, (t - t3) / 1.8, 260); bij(ctx, p.x, p.y, 1.2, p.ang, { t, dot: C.koraal }); }
    // een halfuur later: tientallen bijen
    if (ha > 0.01) { const t0 = q.at('halfuur'); for (let i = 0; i < 24; i++) { const u = clamp((t - t0 - i * 0.12) / 1.4, 0, 1); if (u <= 0) continue; const tx = 1440 + (hash(i) - 0.5) * 220, ty = 760 + (hash(i + 50) - 0.5) * 120; const w = wander(i, t, 14, 1.2); const p = u < 1 ? vlieg(520, 640, tx, ty, u, 200) : { x: tx + w.x, y: ty + w.y, ang: Math.sin(t * 2 + i) }; bij(ctx, p.x, p.y, 0.8, p.ang, { t }); }
      tag(ctx, 'een halfuur later', 1440, 560, C.goud, ha, 'center', 30); }
    vraagteken(ctx, 1010, 560, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('communicatie', 1, 0.8), p3 = q.on('Oostenrijkse', 1, 0.8), p4 = q.on('dichtbij', 1, 0.8);
    const A1 = 1 - p2, A2 = p2 * (1 - p3), A3 = p3 * (1 - p4), A4 = p4;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1;
      paneel(ctx, 180, 200, 700, 480, 'in een rij erachteraan?'); for (let i = 0; i < 5; i++) bij(ctx, 300 + i * 110 + (t * 40 % 110), 460 + Math.sin(t * 3 + i) * 10, 1.1, Math.PI / 2, { t }); kruis(ctx, 530, 460, 90, q.on('later', 1));
      paneel(ctx, 1040, 200, 700, 480, 'ruiken op een kilometer?'); schaaltje(ctx, 1160, 520, 0.9); kastje(ctx, 1640, 500); for (let k = 0; k < 4; k++) { const ph = (t * 0.5 + k / 4) % 1; ctx.strokeStyle = rgba('#F2D27A', 0.7 * (1 - ph)); ctx.lineWidth = 3; ctx.beginPath(); const x0 = 1220 + ph * 300; ctx.moveTo(x0, 470); ctx.bezierCurveTo(x0 + 20, 440, x0 + 40, 500, x0 + 60, 470); ctx.stroke(); } text(ctx, '1 km', 1400, 600, fTekst(28, 700), C.text2, 'center'); kruis(ctx, 1390, 460, 90, q.on('afstand', 1));
      tag(ctx, 'de verkenster vertelt het de anderen', 960, 800, C.goud, q.on('verkenster', 1), 'center', 32); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; const bx = [180, 760, 1340], lab = [['zender', 'zender'], ['signaal', 'signaal'], ['ontvanger', 'ontvanger']];
      lab.forEach(([w, s2], i) => { const a = q.on(w, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; paneel(ctx, bx[i], 260, 400, 420, s2); ctx.restore(); });
      bij(ctx, 380, 500, 2.2, 0, { t, a: q.on('zender', 1), dot: C.koraal }); regel(ctx, 'de verkenster', 380, 640, q.on('zender', 1), C.text2, 24, 'center', 600);
      pijl(ctx, 600, 470, 740, 470, C.line, q.on('signaal', 1), 4, 16); pijl(ctx, 1180, 470, 1320, 470, C.line, q.on('ontvanger', 1), 4, 16);
      const da = q.on('dans', 1); if (q.on('signaal', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('signaal', 1); if (da > 0.01) { ctx.save(); ctx.globalAlpha *= da; dans(ctx, 960, 480, 150, 0, t, { s: 0.9, run: 0.8, loop: 0.8, spoor: 0.6 }); regel(ctx, 'een dans', 960, 640, 1, C.goud, 28, 'center', 700); ctx.restore(); } else { regel(ctx, '?', 960, 500, 1, C.text2, 60, 'center', 700); } ctx.restore(); }
      for (let i = 0; i < 3; i++) bij(ctx, 1460 + i * 80, 480 + (i % 2) * 40, 1.3, -0.3 + i * 0.3, { t, a: q.on('ontvanger', 1) }); regel(ctx, 'gedrag verandert', 1540, 640, q.on('verandert', 1), C.groen, 24, 'center', 700);
      tag(ctx, 'communicatie', 960, 190, C.goud, 1, 'center', 34); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'Karl von Frisch (1886–1982)', 140, 150, 1, C.text, 36, 'left', 700); metaText(ctx, 'Nobelprijs 1973, met Tinbergen en Lorenz', 140, 196, C.text2, 'left', 20);
      raat(ctx, 220, 260, 860, 560); const gl = q.on('glazen', 1); if (gl > 0.01) { ctx.save(); ctx.globalAlpha *= gl; roundRect(ctx, 200, 240, 900, 600, 20); ctx.strokeStyle = '#C9D6E2'; ctx.lineWidth = 10; ctx.stroke(); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.beginPath(); ctx.moveTo(260, 260); ctx.lineTo(420, 260); ctx.lineTo(260, 520); ctx.closePath(); ctx.fill(); regel(ctx, 'glazen kast', 650, 880 - 10, 1, C.text2, 24, 'center', 600); ctx.restore(); }
      const vf = q.on('verf', 1), cols = [C.koraal, C.teal, '#F2F2EE', C.paars, C.groen]; for (let i = 0; i < 14; i++) { const w = wander(i + 20, t, 60, 0.5); bij(ctx, 300 + (i % 5) * 160 + w.x, 330 + Math.floor(i / 5) * 170 + w.y, 1.1, Math.sin(t * 0.7 + i) * 2, { t, dot: hash(i) < 0.5 && vf > 0.5 ? cols[i % 5] : null }); }
      schaaltje(ctx, 1450, 480, 1.4, q.on('schaaltjes', 1)); regel(ctx, 'suikerwater', 1450, 400, q.on('schaaltjes', 1), C.text2, 26, 'center', 600);
      chip(ctx, 'stipje verf: elke bij herkenbaar', 1450, 620, C.koraal, vf, 26); chip(ctx, 'kijken wat ze doen bij terugkomst', 1450, 710, C.teal, q.on('terugkwamen', 1), 26); ctx.restore(); }
    if (A4 > 0.01) { ctx.save(); ctx.globalAlpha *= A4; raat(ctx, 200, 180, 760, 680); rondedans(ctx, 580, 520, 100, t, { a: q.on('rondjes', 1) });
      regel(ctx, 'linksom, rechtsom', 580, 700, q.on('linksom', 1), C.text, 26, 'center', 700);
      tag(ctx, 'rondedans', 1420, 260, C.goud, q.on('rondedans', 1), 'center', 36); chip(ctx, 'voedsel dichtbij: een paar tientallen meters', 1420, 360, C.text2, q.on('tientallen', 1), 24);
      chip(ctx, 'boodschap: voedsel vlakbij, ga zoeken', 1420, 470, C.groen, q.on('zoeken', 1), 26); chip(ctx, 'geen duidelijke richting', 1420, 560, C.koraal, q.on('duidelijke', 1), 26);
      chip(ctx, 'geur van de bloemen helpt', 1420, 650, C.paars, q.on('geur', 1), 26); bloemen(ctx, 1420, 760, 1.4, q.on('bloemen', 1)); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('Eerst', 1, 0.8), p3 = q.on('afstand', 1, 0.8), p4 = q.on('verkenster', 3, 0.8);
    const A1 = 1 - p2, A2 = p2 * (1 - p3), A3 = p3 * (1 - p4), A4 = p4;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; raat(ctx, 200, 170, 760, 700); const sp = 0.25 + 0.6 * q.on('soort', 1);
      const p = dans(ctx, 580, 520, 300, 0, t, { run: 1.2, loop: 1.0, spoor: sp, s: 1.6 }); const rs = q.on('boodschap', 1); if (rs > 0.01) { ctx.save(); ctx.globalAlpha *= rs; ctx.strokeStyle = C.koraal; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(580, 670); ctx.lineTo(580, 370); ctx.stroke(); ctx.restore(); }
      tag(ctx, 'kwispeldans', 1420, 250, C.goud, q.on('kwispeldans', 1), 'center', 36); chip(ctx, 'recht stuk: kwispelen met het achterlijf', 1420, 360, C.text2, q.on('schudt', 1), 24);
      chip(ctx, 'boogje terug: rechts, dan links', 1420, 450, C.text2, q.on('boogje', 1), 24); chip(ctx, 'samen: een soort acht', 1420, 540, C.teal, q.on('soort', 1), 26); chip(ctx, 'de boodschap zit in het rechte stuk', 1420, 660, C.koraal, rs, 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; const dk = q.on('donker', 1); raat(ctx, 120, 200, 680, 660, { donker: dk * 0.7 }); regel(ctx, 'op de raat (rechtop)', 460, 170, 1, C.text2, 24, 'center', 700);
      pijl(ctx, 175, 800, 175, 260, C.text, q.on('rechtop', 1), 4, 16); regel(ctx, 'omhoog', 175, 240, q.on('rechtop', 1), C.text, 22, 'center', 700);
      const sch = q.on('schuin', 1), rot = 40 * Math.PI / 180 * sch; dans(ctx, 460, 560, 240, rot, t, { run: 1.0, loop: 0.9, spoor: 0.5, s: 1.3 });
      const om = q.on('omhoog', 1); if (om > 0.01) { ctx.save(); ctx.globalAlpha *= om; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(460, 560); ctx.lineTo(460, 300); ctx.stroke(); ctx.setLineDash([]); zon(ctx, 460, 262, 18, 1, t); ctx.restore(); }
      hoekboog(ctx, 460, 560, 150, 0, rot, C.goud, '40°', q.on('veertig', 1));
      // kaart van bovenaf
      paneel(ctx, 900, 170, 880, 690, 'buiten, van bovenaf', q.on('zon', 1)); const kx = 1340, ky = 720; if (q.on('zon', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('zon', 1); kastje(ctx, kx, ky); regel(ctx, 'kast', kx, ky + 60, 1, C.text2, 22, 'center', 600); straal(ctx, kx, ky - 30, 0, 380, C.goud, 1, 4, true); zon(ctx, kx, ky - 450, 30, 1, t); ctx.restore(); }
      const bl = q.on('bloemen', 1); if (bl > 0.01) { const ang = 40 * Math.PI / 180; straal(ctx, kx, ky - 30, ang, 400, C.groen, bl, 5); const [fx, fy] = punt(kx, ky - 30, ang, 430); bloemen(ctx, fx, fy, 1.3, bl); }
      hoekboog(ctx, kx, ky - 30, 170, 0, 40 * Math.PI / 180, C.goud, '40°', q.on('veertig', 2)); tag(ctx, 'vanaf de kast naar de zon kijken', 1340, 830, C.text2, q.on('kijkt', 1), 'center', 22); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; raat(ctx, 160, 180, 620, 680); const p = dans(ctx, 470, 540, 260, 0, t, { run: 1.0, loop: 1.0, spoor: 0.5, s: 1.4 }); stopwatch(ctx, 900, 330, 70, p.sec, 1, p.wag > 0.5);
      chip(ctx, '1 seconde kwispelen ≈ 1 km vliegen', 1400, 250, C.goud, q.on('seconde', 1), 28);
      const rij = (y, lab, w, a, col) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; regel(ctx, lab, 1080, y - 18, 1, C.text, 24, 'left', 700); roundRect(ctx, 1080, y, w, 30, 8); shape(ctx, rgba(col, 0.5), col, 2); ctx.restore(); };
      rij(390, 'kort kwispelen → dichtbij', 180, q.on('langer', 1), C.teal); rij(500, 'lang kwispelen → ver weg', 620, q.on('verder', 2), C.koraal);
      const be = q.on('beter', 1); if (be > 0.01) { ctx.save(); ctx.globalAlpha *= be; chip(ctx, 'beter voedsel → vaker herhalen', 1400, 640, C.groen, 1, 26); const n = Math.min(12, Math.floor((t - q.at('beter')) / 0.35)); for (let i = 0; i < n; i++) circ(ctx, 1120 + i * 46, 730, 14, C.groen); ctx.restore(); } ctx.restore(); }
    if (A4 > 0.01) { ctx.save(); ctx.globalAlpha *= A4; raat(ctx, 380, 170, 700, 700); const p = dans(ctx, 730, 540, 300, 0, t, { run: 2.0, loop: 1.1, spoor: 0.5, s: 1.5 }); stopwatch(ctx, 1260, 380, 80, p.sec, 1, p.wag > 0.5);
      pijl(ctx, 430, 800, 430, 260, C.text, 1, 4, 16); regel(ctx, 'omhoog', 430, 240, 1, C.text, 22, 'center', 700); chip(ctx, 'elke keer 2 seconden', 1260, 580, C.koraal, q.on('twee', 1), 26);
      vraagteken(ctx, 1500, 760, q.on('Wat', 1), 100); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('Maar', 1, 0.8), A1 = 1 - p2, A2 = p2;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; raat(ctx, 160, 200, 560, 640); dans(ctx, 440, 520, 220, 0, t, { run: 2.0, loop: 1.0, spoor: 0.5, s: 1.3 }); vink_(ctx, 600, 300, 30, q.on('omhoog', 1));
      const om = q.on('omlaag', 1); if (om > 0.01) { ctx.save(); ctx.globalAlpha *= om * 0.5; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(300, 380); ctx.lineTo(300, 760); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); chip(ctx, 'omlaag zou betekenen: zon in je rug', 440, 880 - 20, C.text2, om, 22); }
      paneel(ctx, 860, 170, 900, 690, ''); regel(ctx, 'van bovenaf', 900, 220, 1, C.text2, 24, 'left', 700); const kx = 1310, ky = 800; kastje(ctx, kx, ky); zon(ctx, kx, 240, 28, 1, t); straal(ctx, kx, ky - 30, 0, 360, C.groen, q.on('omhoog', 1), 5); bloemen(ctx, kx, ky - 410, 1.3, q.on('omhoog', 1));
      chip(ctx, '2 s kwispelen ≈ 2 km', 1560, 520, C.goud, q.on('twee', 1), 26); vink_(ctx, kx + 90, ky - 410, 30, q.on('kilometer', 1)); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; raat(ctx, 140, 170, 980, 700, { donker: 0.75 * q.on('donker', 1) }); const cx = 600, cy = 520, L = 240, run = 1.3, loop = 1.1;
      const p = dans(ctx, cx, cy, L, 0, t, { run, loop, spoor: 0.15, s: 1.5, dot: C.koraal });
      for (let i = 0; i < 4; i++) { const f = dansPos(t - 0.25 - i * 0.18, L, run, loop); const side = i % 2 ? 1 : -1; const ox = Math.cos(f.ang) * 46 * side, oy = Math.sin(f.ang) * 46 * side; bij(ctx, cx + f.x + ox, cy + f.y + oy + 30, 1.3, f.ang, { t, a: q.on('mee', 1) }); }
      const zm = q.on('zoemen', 1); if (zm > 0.01 && p) { for (let k = 0; k < 3; k++) { const r = 30 + ((t * 80 + k * 30) % 90); ctx.strokeStyle = rgba(C.goud, zm * 0.6 * (1 - r / 120)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx + p.x, cy + p.y, r, 0, 6.283); ctx.stroke(); } }
      const tr = q.on('trillingen', 1); if (tr > 0.01) { ctx.strokeStyle = rgba(C.teal, 0.6 * tr); ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { const yy = 800 + k * 16; ctx.beginPath(); for (let x = 200; x < 1060; x += 10) { const yv = yy + Math.sin(x * 0.05 + t * 12) * 5; x === 200 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv); } ctx.stroke(); } }
      chip(ctx, 'zien? nee: het is donker', 1500, 250, C.koraal, q.on('Dat', 1), 26); chip(ctx, 'voelen met de voelsprieten', 1500, 350, C.text2, q.on('voelsprieten', 1), 26);
      chip(ctx, 'horen het zoemen van dichtbij', 1500, 440, C.goud, zm, 26); chip(ctx, 'voelen trillingen in de raat', 1500, 530, C.teal, tr, 26); chip(ctx, 'ruiken en proeven wat ze meebrengt', 1500, 620, C.paars, q.on('ruiken', 1), 26);
      tag(ctx, 'daarna vliegen ze zelf uit', 1500, 760, C.groen, q.on('vliegen', 1), 'center', 28); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('Stel', 1, 0.8), A1 = 1 - p2, A2 = p2;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; ctx.strokeStyle = rgba(C.goud, 0.35); ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.ellipse(960, 780, 700, 520, 0, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(180, 780); ctx.lineTo(1740, 780); ctx.stroke(); kast(ctx, 960, 780, 0.6);
      const u = clamp(0.3 + 0.4 * t / Math.max(1, q.at('Stel')), 0, 1), an = Math.PI + u * Math.PI; zon(ctx, 960 + 700 * Math.cos(an), 780 + 520 * Math.sin(an), 34, q.on('zon', 1), t);
      klok(ctx, 1640, 240, 70, 8 + 6 * u, q.on('uur', 1)); chip(ctx, 'gemiddeld zo\'n 15° per uur', 420, 220, C.goud, q.on('vijftien', 1), 28); chip(ctx, 'rond het middaguur sneller', 420, 310, C.koraal, q.on('middaguur', 1), 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; const a1 = q.on('tien', 2), a2 = q.on('twaalf', 1);
      if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; raat(ctx, 220, 230, 600, 600); dans(ctx, 520, 530, 240, -40 * Math.PI / 180, t, { run: 1.0, loop: 1.0, spoor: 0.5, s: 1.3 }); klok(ctx, 520, 160, 50, 10, 1); regel(ctx, '10:00', 620, 172, 1, C.text, 32, 'left', 700); ctx.restore(); }
      if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; raat(ctx, 1100, 230, 600, 600); klok(ctx, 1400, 160, 50, 12, 1); regel(ctx, '12:00', 1500, 172, 1, C.text, 32, 'left', 700); ctx.restore(); }
      chip(ctx, 'dezelfde bloemen', 960, 880 - 30, C.groen, q.on('dezelfde', 1), 26); vraagteken(ctx, 1400, 600, q.on('Wat', 1), 140); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('grotendeels', 1, 0.8), p3 = q.on('Wat', 1, 0.8), A1 = 1 - p2, A2 = p2 * (1 - p3), A3 = p3;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const bl = 60 * Math.PI / 180;
      const kol = (cx, uur, zonAng, a, dansA) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; klok(ctx, cx - 250, 160, 40, uur, 1); regel(ctx, uur + ':00', cx - 190, 172, 1, C.text, 30, 'left', 700);
        const my = 360; circ(ctx, cx, my, 170, rgba(C.fill, 0.5), C.line, 1.5); kastje(ctx, cx, my); straal(ctx, cx, my, zonAng, 150, C.goud, 1, 4, true); const [zx, zy] = punt(cx, my, zonAng, 175); zon(ctx, zx, zy, 20, 1, t); straal(ctx, cx, my, bl, 150, C.groen, 1, 5); const [bx, by] = punt(cx, my, bl, 170); bloemen(ctx, bx, by, 0.9);
        const d = bl - zonAng; hoekboog(ctx, cx, my, 80, zonAng, bl, C.goud, Math.round(Math.abs(d) * 180 / Math.PI) + '°', 1, 24);
        ctx.save(); ctx.globalAlpha *= dansA; raat(ctx, cx - 220, 560, 440, 300); dans(ctx, cx, 710, 130, d, t, { run: 0.9, loop: 0.8, s: 1.0, spoor: 0.5 }); ctx.restore(); ctx.restore(); };
      kol(560, 10, 135 * Math.PI / 180, 1, 1); kol(1360, 12, 180 * Math.PI / 180, q.on('schuift', 1), q.on('draait', 1));
      chip(ctx, 'inwendige klok', 960, 120, C.paars, q.on('klok', 1), 28); chip(ctx, 'ook in de donkere kast', 960, 200, C.text2, q.on('donkere', 1), 24); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; tag(ctx, 'grotendeels aangeboren', 960, 200, C.goud, q.on('aangeboren', 1), 'center', 36);
      const jo = q.on('jonge', 1); if (jo > 0.01) { ctx.save(); ctx.globalAlpha *= jo; bij(ctx, 360, 400, 2.4, 0.2, { t }); regel(ctx, 'jonge bij', 360, 520, 1, C.text2, 24, 'center', 600); chip(ctx, 'hoeft het niet te leren', 360, 600, C.text2, 1, 24); ctx.restore(); }
      const rr = q.on('ras', 1); if (rr > 0.01) { ctx.save(); ctx.globalAlpha *= rr; regel(ctx, 'afstand per seconde kwispelen', 1200, 330, 1, C.text2, 24, 'center', 700); [['ras A', 560, C.teal], ['ras B', 380, C.koraal]].forEach(([l, w, col], i) => { const y = 380 + i * 110; regel(ctx, l, 740, y + 28, 1, C.text, 26, 'left', 700); roundRect(ctx, 860, y, w, 40, 8); shape(ctx, rgba(col, 0.5), col, 2); }); ctx.restore(); }
      tag(ctx, 'een soort dialect', 1200, 680, C.paars, q.on('dialect', 1), 'center', 30); chip(ctx, 'dialect van haar ouders: ook aangeboren', 1200, 780, C.goud, q.on('ouders', 1), 26); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; grond(ctx); kast(ctx, 620, 860, 1); ctx.strokeStyle = rgba(C.goud, 0.35); ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.ellipse(960, 860, 760, 600, 0, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
      const u = (t * 0.05) % 1, an = Math.PI + (0.2 + 0.6 * u) * Math.PI; zon(ctx, 960 + 760 * Math.cos(an), 860 + 600 * Math.sin(an), 30, 1, t);
      const k = q.on('Daarvoor', 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); for (let i = 0; i <= 120; i++) { const s = i / 120 * 6.283; const x = 620 + Math.sin(s) * 220 * (0.6 + 0.4 * Math.sin(s * 3)), y = 560 + Math.sin(s * 2) * 120; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]); const s = t * 1.2, x = 620 + Math.sin(s) * 220 * (0.6 + 0.4 * Math.sin(s * 3)), y = 560 + Math.sin(s * 2) * 120; bij(ctx, x, y, 1.3, Math.atan2(Math.cos(s), -Math.cos(s * 2)), { t }); ctx.restore(); }
      chip(ctx, 'leren: hoe loopt de zon hier?', 1360, 330, C.goud, q.on('hemel', 1), 28); tag(ctx, 'korte oriëntatievluchten', 1360, 440, C.groen, k, 'center', 30); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('Later', 1, 0.8), A1 = 1 - p2, A2 = p2;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Is de dans echt een boodschap?', 140, 140, 1, C.text, 36, 'left', 700);
      chip(ctx, 'jaren 60 en 70: twijfel', 500, 230, C.koraal, q.on('zestig', 1), 26); chip(ctx, 'alleen op geur?', 1000, 230, C.paars, q.on('reukvermogen', 1), 26);
      const rb = q.on('robotbij', 1); raat(ctx, 160, 300, 560, 540); dans(ctx, 440, 570, 220, 50 * Math.PI / 180, t, { run: 1.0, loop: 1.0, s: 1.6, robot: rb > 0.5, spoor: 0.5 }); regel(ctx, 'robotbij', 440, 880 - 20, rb, C.text2, 24, 'center', 700);
      const vp = q.on('voerplekken', 1); if (vp > 0.01) { ctx.save(); ctx.globalAlpha *= vp; paneel(ctx, 820, 290, 940, 570, ''); regel(ctx, 'voerplekken rond de kast', 850, 335, 1, C.text2, 24, 'left', 700); const kx = 1290, ky = 640; kastje(ctx, kx, ky); zon(ctx, kx, 360, 20, 1, t);
        const angs = [-70, -10, 50, 110], cnt = [2, 3, 12, 2]; angs.forEach((d, i) => { const [x, y] = punt(kx, ky, d * Math.PI / 180, 230); schaaltje(ctx, x, y, 0.55); const ge = q.on('geur', 1); for (let k = 0; k < 2; k++) { ctx.strokeStyle = rgba(C.paars, 0.7 * ge); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 16 + k * 22, y - 18); ctx.bezierCurveTo(x - 6 + k * 22, y - 40, x - 26 + k * 22, y - 50, x - 12 + k * 22, y - 70); ctx.stroke(); }
          const n = Math.round(cnt[i] * q.on('aangewezen', 1)); for (let j = 0; j < n; j++) circ(ctx, x - 50 + (j % 6) * 20, y + 34 + Math.floor(j / 6) * 20, 7, C.goud); });
        straal(ctx, kx, ky - 30, 50 * Math.PI / 180, 140, C.koraal, q.on('robot', 2), 4, true); ctx.restore(); }
      chip(ctx, 'alle plekken dezelfde geur', 1290, 940 - 120, C.paars, q.on('dezelfde', 1), 24); chip(ctx, 'minder precies dan een echte bij', 1500, 230, C.text2, q.on('minder', 1), 24); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; paneel(ctx, 140, 160, 1640, 710, 'radar volgt de bijen (van bovenaf)'); const kx = 500, ky = 700; kastje(ctx, kx, ky); bloemen(ctx, 1250, 330, 1.3);
      const ra = q.on('radar', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; ctx.beginPath(); ctx.arc(300, 790, 40, Math.PI, 2 * Math.PI); shape(ctx, '#9AA3B2', '#5A6478', 2); for (let k = 0; k < 3; k++) { const r = 60 + ((t * 90 + k * 60) % 180); ctx.strokeStyle = rgba(C.teal, 0.5 * (1 - r / 240)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(300, 770, r, -2.6, -0.5); ctx.stroke(); } regel(ctx, 'radar', 300, 840, 1, C.text2, 22, 'center', 600); ctx.restore(); }
      const an = q.on('antennetje', 1); if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; circ(ctx, 360, 360, 120, rgba(C.bgSchema, 0.9), C.line, 2); bij(ctx, 360, 380, 3.0, 0, { t, antenne: true }); regel(ctx, 'piepklein antennetje', 360, 520, 1, C.text, 22, 'center', 700); ctx.restore(); }
      const spoor = (x0, y0, x1, y1, t0, a) => { const u = clamp((t - t0) / 2.2, 0, 1); if (u <= 0 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, u), lerp(y0, y1, u)); ctx.stroke(); bij(ctx, lerp(x0, x1, u), lerp(y0, y1, u), 1.0, Math.atan2(x1 - x0, -(y1 - y0)), { t }); ctx.restore(); };
      const zk = (x, y, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 80 * a; i++) { const s = i / 80 * 6.283 * 2, r = 10 + i * 0.9; const xx = x + Math.cos(s) * r, yy = y + Math.sin(s) * r * 0.7; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); };
      spoor(kx, ky - 30, 1230, 360, q.at('rechte'), 1); const vp = q.on('verplaatst', 1); if (vp > 0.01) { ctx.save(); ctx.globalAlpha *= vp; ctx.setLineDash([8, 10]); pijl(ctx, kx + 30, ky + 20, 790, 770, C.text2, 1, 3, 14); ctx.setLineDash([]); regel(ctx, 'verplaatst', 660, 830, 1, C.text2, 22, 'center', 600); ctx.restore(); }
      spoor(800, 770, 1530, 400, q.at('route'), vp); regel(ctx, 'verkeerde plek', 1560, 470, q.on('verkeerde', 1), C.koraal, 24, 'center', 700);
      zk(1230, 360, q.on('zoeken', 1)); zk(1530, 400, q.on('zoeken', 1)); tag(ctx, 'dans en geur werken samen', 960, 240, C.goud, q.on('samen', 1), 'center', 30); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 200, ph = 540;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 64, pw, ph - 64); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'dans = signaal', q.on('vertelt', 1), (x) => { bij(ctx, x + 110, 420, 2.0, 0.4, { t, dot: C.koraal }); pijl(ctx, x + 170, 420, x + 250, 420, C.line, 1, 4, 14); bij(ctx, x + 300, 380, 1.3, -0.2, { t }); bij(ctx, x + 320, 470, 1.3, 0.3, { t }); regel(ctx, 'zender → ontvanger', x + 200, 620, 1, C.text2, 24, 'center', 600); });
    panel(1, 'rondedans: vlakbij', q.on('rondedans', 1), (x) => { raat(ctx, x + 20, 290, pw - 40, 380); rondedans(ctx, x + 200, 480, 70, t, { s: 1.1 }); });
    panel(2, 'kwispeldans', q.on('kwispeldans', 1), (x) => { raat(ctx, x + 20, 290, pw - 40, 380); const d = 0.6; dans(ctx, x + 200, 480, 150, d * q.on('hoek', 1), t, { run: 0.9, loop: 0.8, s: 1.0 }); hoekboog(ctx, x + 200, 480, 100, 0, d, C.goud, 'hoek', q.on('hoek', 1), 22); regel(ctx, 'duur = afstand', x + 200, 720, q.on('duur', 1), C.text, 24, 'center', 700); });
    panel(3, 'zon schuift op', q.on('opschuift', 1), (x) => { const an = Math.PI + (0.3 + 0.4 * ((t * 0.1) % 1)) * Math.PI; zon(ctx, x + 200 + 150 * Math.cos(an), 560 + 200 * Math.sin(an), 24, 1, t); klok(ctx, x + 200, 620, 60, 10 + (t * 0.3) % 4, 1); });
    tag(ctx, 'grotendeels aangeboren · een signaal voor de andere bijen', 960, 830, C.goud, q.on('aangeboren', 1), 'center', 28); },
};
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }

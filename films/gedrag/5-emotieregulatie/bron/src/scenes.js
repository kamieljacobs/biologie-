// Gedrag 5 · Emotieregulatie — scènes per alinea (v1.0, 15 okt 2026). Bilal (castboek) verliest een potje; amygdala en prefrontale cortex; vier stappen; proef onderdrukken vs herwaarderen; co-regulatie.

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }

function ouder(ctx, x, y, h, o = {}) { const { a = 1, t = 0, loop = 0, jas = '#8A5A7A', haar = '#4A2E20', lang = 1, armen = 0, flip = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const s = h / 400; ctx.scale(s * flip, s);
  const sw = Math.sin(t * 5) * 0.35 * loop; ctx.strokeStyle = '#3A3A48'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(Math.sin(sw) * 80, -10); ctx.moveTo(0, -170); ctx.lineTo(-Math.sin(sw) * 80, -10); ctx.stroke();
  roundRect(ctx, -48, -320, 96, 170, 28); shape(ctx, jas, null);
  ctx.strokeStyle = jas; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(-36, -300); ctx.lineTo(-56 - 40 * armen, -190 - 70 * armen); ctx.moveTo(36, -300); ctx.lineTo(56 + 40 * armen, -190 - 70 * armen); ctx.stroke();
  if (lang) { ctx.fillStyle = haar; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 36, -340, 18, 50, k * 0.08, 0, 6.283); ctx.fill(); } }
  circ(ctx, 0, -362, 42, HUID); ctx.fillStyle = haar; ctx.beginPath(); ctx.arc(0, -372, 44, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); circ(ctx, 16, -364, 4, '#121A26'); circ(ctx, -12, -364, 4, '#121A26'); ctx.strokeStyle = '#8A5A4A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(2, -346, 10, 0.3, Math.PI - 0.3); ctx.stroke();
  ctx.restore(); }
// peuter, zittend: x,y = zitvlak
function peuter(ctx, x, y, s, o = {}) { const { a = 1, t = 0, huil = 0, blij = 0, trui = '#E0A040', haar = '#6A4A34', kijk = 1, armen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5A6A8A'; ctx.beginPath(); ctx.ellipse(0, -8, 54, 22, 0, 0, 6.283); ctx.fill();
  roundRect(ctx, -40, -100, 80, 96, 30); shape(ctx, trui, null);
  ctx.strokeStyle = trui; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -80); ctx.lineTo(-56 - 10 * armen, -40 - 50 * armen); ctx.moveTo(30, -80); ctx.lineTo(56 + 10 * armen, -40 - 50 * armen); ctx.stroke();
  const hy = -150; circ(ctx, 0, hy, 50, HUID); ctx.fillStyle = haar; ctx.beginPath(); ctx.arc(0, hy - 8, 51, Math.PI * 1.1, Math.PI * 1.9); ctx.fill();
  const ex = 10 * kijk; if (huil > 0.5) { ctx.strokeStyle = '#121A26'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 24, hy - 4); ctx.lineTo(ex - 12, hy - 2); ctx.moveTo(ex + 12, hy - 2); ctx.lineTo(ex + 24, hy - 4); ctx.stroke(); } else { circ(ctx, ex - 17, hy - 4, 5, '#121A26'); circ(ctx, ex + 17, hy - 4, 5, '#121A26'); }
  ctx.strokeStyle = '#8A4A3A'; ctx.lineWidth = 4; ctx.beginPath(); if (huil > 0.5) { ctx.ellipse(ex, hy + 24, 12, 9 + 3 * Math.sin(t * 12), 0, 0, 6.283); ctx.fillStyle = '#6A2A2A'; ctx.fill(); } else if (blij > 0.5) ctx.arc(ex, hy + 14, 14, 0.2, Math.PI - 0.2); else { ctx.moveTo(ex - 8, hy + 22); ctx.lineTo(ex + 8, hy + 22); } ctx.stroke();
  if (huil > 0.01) { ctx.save(); ctx.globalAlpha *= huil; for (const k of [-1, 1]) { const ty = hy + 6 + ((t * 60) % 40); ctx.fillStyle = '#7FC4E0'; ctx.beginPath(); ctx.ellipse(ex + k * 22, ty, 5, 8, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
  circ(ctx, ex - 30, hy + 14, 8, rgba('#E08A8A', 0.45)); circ(ctx, ex + 30, hy + 14, 8, rgba('#E08A8A', 0.45));
  ctx.restore(); }
function hartslag(ctx, x, y, w, h, t, hoog, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); const per = lerp(110, 60, hoog); for (let px = 0; px <= w; px += 2) { const ph = ((px + t * 120) % per) / per; const v = ph > 0.45 && ph < 0.5 ? -1 : ph >= 0.5 && ph < 0.55 ? 0.6 : 0; const py = y + h / 2 + v * h * 0.45; px ? ctx.lineTo(x + px, py) : ctx.moveTo(x, py); } ctx.stroke(); ctx.restore(); }

const HUID = '#E3B998', AMY = '#E0604A', PFC = '#4E9FCF';
function hartje(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-26, -8, -12, -30, 0, -14); ctx.bezierCurveTo(12, -30, 26, -8, 0, 10); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function controller(ctx, x, y, s = 1, a = 1, schud = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + Math.sin(t * 40) * 6 * schud, y + Math.cos(t * 37) * 4 * schud); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, -14); ctx.quadraticCurveTo(0, -24, 50, -14); ctx.quadraticCurveTo(70, 20, 50, 26); ctx.quadraticCurveTo(30, 30, 20, 12); ctx.lineTo(-20, 12); ctx.quadraticCurveTo(-30, 30, -50, 26); ctx.quadraticCurveTo(-70, 20, -50, -14); ctx.closePath(); shape(ctx, '#2A2E3A', '#5A6070', 2); circ(ctx, -30, 0, 6, '#5A6070'); circ(ctx, 30, -4, 4, C.koraal); circ(ctx, 40, 4, 4, C.groen); ctx.restore(); }
function scherm(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, tijd = 10, over = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, '#0E1420', '#5A6070', 6); ctx.save(); ctx.beginPath(); ctx.rect(x + 10, y + 10, w - 20, h - 20); ctx.clip();
  // eenvoudig spel: twee balkjes (spelers) en een finish
  ctx.fillStyle = '#1E2A40'; ctx.fillRect(x + 10, y + 10, w - 20, h - 20); ctx.fillStyle = '#2E4A3A'; ctx.fillRect(x + 10, y + h * 0.7, w - 20, h * 0.3);
  const p = Math.min(1, (10 - tijd) / 10); circ(ctx, x + 60 + p * (w - 160), y + h * 0.62, 18, C.teal); circ(ctx, x + 80 + p * (w - 140), y + h * 0.5, 18, C.koraal);
  ctx.fillStyle = C.goud; ctx.fillRect(x + w - 60, y + 20, 8, h * 0.7);
  text(ctx, '0:' + String(Math.max(0, Math.ceil(tijd))).padStart(2, '0'), x + w / 2, y + 60, fTekst(40, 700), '#F2F2EE', 'center');
  if (over > 0.01) { ctx.fillStyle = rgba('#000000', 0.6 * over); ctx.fillRect(x, y, w, h); ctx.globalAlpha *= over; text(ctx, 'GAME OVER', x + w / 2, y + h / 2 + 24, fTitel(72), C.koraal, 'center'); }
  ctx.restore(); ctx.restore(); }
// hersenen van opzij (voorkant links): amygdala-alarm en prefrontale cortex
function brein(ctx, x, y, s, o = {}) { const { a = 1, amy = 0, pfc = 0, alarm = 0, rem = 0, t = 0, dim = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-230, 10); ctx.bezierCurveTo(-250, -150, -60, -220, 80, -190); ctx.bezierCurveTo(220, -160, 260, -40, 220, 50); ctx.bezierCurveTo(200, 100, 120, 110, 60, 90); ctx.bezierCurveTo(20, 130, -40, 120, -80, 90); ctx.bezierCurveTo(-170, 100, -220, 70, -230, 10); ctx.closePath(); shape(ctx, rgba('#C98A9A', 0.25), '#C98A9A', 3);
  ctx.strokeStyle = rgba('#C98A9A', 0.5); ctx.lineWidth = 2; for (const [x1, y1, x2, y2] of [[-120, -120, -60, -60], [0, -170, 20, -80], [100, -150, 80, -60], [160, -80, 120, 0], [-180, -40, -100, -10]]) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2 + 20, (y1 + y2) / 2, x2, y2); ctx.stroke(); }
  // hersenstam
  roundRect(ctx, 40, 90, 46, 110, 20); shape(ctx, rgba('#C98A9A', 0.25), '#C98A9A', 2);
  if (pfc > 0.01) { ctx.save(); ctx.globalAlpha *= pfc; ctx.beginPath(); ctx.moveTo(-232, 10); ctx.bezierCurveTo(-250, -140, -120, -200, -60, -190); ctx.lineTo(-90, 40); ctx.bezierCurveTo(-150, 70, -210, 60, -232, 10); ctx.closePath(); shape(ctx, rgba(PFC, 0.35 + 0.3 * (1 - dim)), PFC, 3); ctx.restore(); }
  if (amy > 0.01) { ctx.save(); ctx.globalAlpha *= amy; const pulse = alarm * (0.5 + 0.5 * Math.sin(t * 10)); ctx.beginPath(); ctx.ellipse(20, 40, 26, 16, 0.4, 0, 6.283); shape(ctx, rgba(AMY, 0.5 + 0.5 * pulse), AMY, 3); if (alarm > 0.01) { for (let k = 1; k <= 3; k++) { const r = 30 + ((t * 80 + k * 30) % 90); ctx.strokeStyle = rgba(AMY, alarm * (1 - (r - 30) / 90)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(20, 40, r, 0, 6.283); ctx.stroke(); } } ctx.restore(); }
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.strokeStyle = PFC; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-110, -20); ctx.quadraticCurveTo(-60, 60, -10, 40); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-14, 26); ctx.lineTo(-14, 56); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function lijf(ctx, x, y, s, o = {}) { const { a = 1, hart = 0, long = 0, spier = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, -300, 50, rgba('#9AA3B2', 0.25), '#9AA3B2', 3); roundRect(ctx, -80, -240, 160, 240, 50); shape(ctx, rgba('#9AA3B2', 0.15), '#9AA3B2', 3);
  ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-80, -210); ctx.lineTo(-150, -60); ctx.moveTo(80, -210); ctx.lineTo(150, -60); ctx.moveTo(-40, 0); ctx.lineTo(-50, 200); ctx.moveTo(40, 0); ctx.lineTo(50, 200); ctx.stroke();
  if (long > 0.01) { ctx.save(); ctx.globalAlpha *= long; const b = 1 + 0.08 * Math.sin(t * 3); for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 36, -150, 30 * b, 60 * b, 0, 0, 6.283); shape(ctx, rgba(PFC, 0.3), PFC, 2); } ctx.restore(); }
  if (hart > 0.01) { const p = 1 + 0.18 * Math.max(0, Math.sin(t * 9)) * hart; hartje(ctx, 10, -120, 2.2 * p, hart, C.koraal); }
  if (spier > 0.01) { ctx.save(); ctx.globalAlpha *= spier; ctx.beginPath(); ctx.ellipse(-122, -130, 22, 50, 0.45, 0, 6.283); shape(ctx, rgba(C.goud, 0.4), C.goud, 2); ctx.beginPath(); ctx.ellipse(122, -130, 22, 50, -0.45, 0, 6.283); shape(ctx, rgba(C.goud, 0.4), C.goud, 2); ctx.restore(); }
  ctx.restore(); }
function balk(ctx, x, y, w, v, col, a = 1, lbl = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 8); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); roundRect(ctx, x, y, Math.max(8, w * v), 40, 8); shape(ctx, rgba(col, 0.6), col, 1.5); if (lbl) regel(ctx, lbl, x - 16, y + 30, 1, C.text, 26, 'right', 600); ctx.restore(); }
const STAP = [['situatie', 'even weg van het scherm', 'situatie', 1, 'veranderen', 1], ['aandacht', 'ergens anders naar kijken', 'aandacht', 1, 'verleggen', 1], ['betekenis', 'herwaarderen: anders bekijken', 'betekenis', 1, 'herwaarderen', 1], ['reactie', 'onderdrukken: niets laten merken', 'reageert', 1, 'onderdrukken', 1]];

// =======================================================================================
const SCENES = {
  title(ctx, t) { persoon(ctx, 'bilal', 1450, 880, 520, { uit: 'praat', pose: 'vasthouden', kijk: -1, t, hold: (c, x, y) => controller(c, x, y, 0.9, 1, 0.3, t) }); hartje(ctx, 1560, 360, 2, 0.5 + 0.5 * Math.max(0, Math.sin(t * 6))); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const t0 = q.at('Nog'), t1 = q.at('voorbij') + 0.3, tijd = clamp(10 * (1 - (t - t0) / (t1 - t0)), 0, 10), over = q.on('voorbij', 1, 0.4);
    scherm(ctx, 900, 160, 880, 520, { t, tijd: t < t0 ? 10 : tijd, over });
    const boos = q.on('bonkt', 1), gooi = q.on('gooien', 1);
    persoon(ctx, 'bilal', 420, 880, 600, { uit: over > 0.5 ? 'bezorgd' : 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y) => controller(c, x, y, 1, 1, gooi, t) });
    if (q.on('warm', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('warm', 1) * 0.45; const gr = ctx.createRadialGradient(420, 360, 10, 420, 360, 140); gr.addColorStop(0, rgba(C.koraal, 0.8)); gr.addColorStop(1, rgba(C.koraal, 0)); ctx.fillStyle = gr; ctx.fillRect(280, 220, 280, 280); ctx.restore(); }
    if (boos > 0.01) { hartje(ctx, 680, 300, 1.6 * (1 + 0.25 * Math.max(0, Math.sin(t * 12))), boos); hartslag(ctx, 620, 740, 240, 60, t, 1, boos); regel(ctx, 'hart bonkt', 680, 380, boos, C.koraal, 26, 'center', 700); }
    vraagteken(ctx, 1340, 800, q.on('Wat', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const hs = q.on('hersenen', 1, 0.8), jo = q.on('jongeren', 1, 0.8);
    if (hs < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - hs; regel(ctx, 'emoties hebben een functie', 140, 140, q.on('functie', 1), C.text, 40, 'left', 700);
      lijf(ctx, 960, 760, 1.2, { t, hart: q.on('hart', 1), long: q.on('ademt', 1), spier: q.on('spieren', 1) });
      tag(ctx, 'angst → klaar om te vluchten', 460, 360, C.teal, q.on('Angst', 1)); tag(ctx, 'boosheid → opkomen voor jezelf', 1460, 360, C.koraal, q.on('Boosheid', 1));
      tag(ctx, 'signaal naar anderen', 960, 220, C.goud, q.on('gezicht', 1)); ctx.restore(); }
    if (hs > 0.01 && jo < 0.99) { ctx.save(); ctx.globalAlpha *= hs * (1 - jo);
      const am = q.on('amygdala', 1), pf = q.on('prefrontale', 1); brein(ctx, 860, 520, 1.6, { t, amy: am, pfc: pf, alarm: q.on('razendsnel', 1) * (1 - 0.6 * q.on('afremmen', 1)), rem: q.on('afremmen', 1) });
      regel(ctx, 'amygdala', 1020, 760, am, AMY, 34, 'center', 700); regel(ctx, 'snel alarm', 1020, 800, q.on('alarm', 1), C.text2, 26, 'center', 600);
      regel(ctx, 'prefrontale cortex', 420, 260, pf, PFC, 34, 'center', 700); regel(ctx, 'trager · weegt af · remt', 420, 300, q.on('trager', 1), C.text2, 26, 'center', 600);
      ['gevaar', 'tegenslag', 'leuks'].forEach((w, i) => tag(ctx, w === 'leuks' ? 'iets leuks' : w, 1560, 330 + i * 80, i === 2 ? C.groen : C.koraal, q.on(w, 1), 'center', 28));
      tag(ctx, 'GAME OVER → alarm, nog vóór het nadenken', 1500, 640, C.text2, q.on('Bilal', 1), 'center', 26); ctx.restore(); }
    if (jo > 0.01) { ctx.save(); ctx.globalAlpha *= jo; const x = 300, y = 240, w = 1200, h = 480; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
      [10, 15, 20, 25].forEach(a => text(ctx, a + ' jaar', x + (a - 8) / 20 * w, y + h + 40, fTekst(24, 500), C.text2, 'center'));
      const pg = clamp((t - q.at('jongeren')) / 3, 0, 1); ctx.strokeStyle = AMY; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 80 * pg; i++) { const u = i / 80, age = 8 + u * 20, v = 0.45 + 0.4 * Math.exp(-Math.pow((age - 15.5) / 3.2, 2)); i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x, y + h - v * h); } ctx.stroke();
      const pg2 = clamp((t - q.at('prefrontale', 2)) / 3, 0, 1); ctx.strokeStyle = PFC; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 80 * pg2; i++) { const u = i / 80, age = 8 + u * 20, v = 0.25 + 0.6 / (1 + Math.exp(-(age - 17) / 2.6)); i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x, y + h - v * h); } ctx.stroke();
      regel(ctx, 'emotiesysteem reageert sterk', x + 0.42 * w, y + 50, jo, AMY, 28, 'center', 700); regel(ctx, 'prefrontale cortex rijpt', x + w - 20, y + 120, pg2, PFC, 28, 'right', 700);
      metaText(ctx, 'schematisch · gemiddeld, per persoon verschillend', x + w, y + h + 80, C.text2, 'right', 18);
      tag(ctx, 'zeker als er vrienden bij zijn', 960, 170, C.text2, q.on('vrienden', 1) * (1 - q.on('excuus', 1)), 'center', 28); tag(ctx, 'geen excuus, geen vonnis: je kunt het oefenen', 960, 170, C.goud, q.on('excuus', 1), 'center', 28);
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const wk = q.on('Werkt', 1, 0.8);
    if (wk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - wk;
      STAP.forEach(([nm, s2, c1, n1, c2, n2], i) => { const a = q.on(c1, n1), b = q.on(c2, n2); const x = 120 + i * 430; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 230, 360, 110, 16); shape(ctx, rgba(C.teal, 0.14), C.teal, 2); text(ctx, nm, x + 180, 300, fTekst(38, 700), C.teal, 'center'); if (i < 3) pijl(ctx, x + 366, 285, x + 424, 285, C.line, 1, 4, 14); ctx.restore();
        if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; roundRect(ctx, x, 400, 360, 170, 16); shape(ctx, rgba(i === 3 ? C.koraal : C.goud, 0.12), i === 3 ? C.koraal : C.goud, 2); ctx.font = fTekst(28, 600); ctx.fillStyle = C.text; ctx.textAlign = 'center'; wrap(ctx, s2, x + 180, 460, 320, 36); ctx.textAlign = 'left'; pijl(ctx, x + 180, 396, x + 180, 346, i === 3 ? C.koraal : C.goud, 1, 3, 12); ctx.restore(); } });
      tag(ctx, 'bij elke stap kun je bijsturen', 960, 680, C.goud, q.on('stap', 2)); ctx.restore(); }
    if (wk > 0.01) { ctx.save(); ctx.globalAlpha *= wk; regel(ctx, 'werkt onderdrukken?', 140, 140, 1, C.text, 40, 'left', 700);
      roundRect(ctx, 760, 200, 400, 240, 14); shape(ctx, '#0E1420', '#5A6070', 4); text(ctx, 'film: operatie', 960, 330, fTekst(30, 700), C.text2, 'center'); metaText(ctx, 'nare beelden', 960, 370, C.text2, 'center', 18);
      const A = q.on('ene', 1), B = q.on('andere', 2);
      ctx.save(); ctx.globalAlpha *= A; roundRect(ctx, 260, 520, 560, 260, 18); shape(ctx, rgba(C.koraal, 0.1), C.koraal, 2); text(ctx, 'groep A: onderdrukken', 540, 580, fTekst(32, 700), C.koraal, 'center'); text(ctx, 'niets laten merken', 540, 630, fTekst(28, 600), C.text, 'center'); circ(ctx, 540, 710, 40, HUID); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(522, 700); ctx.lineTo(532, 700); ctx.moveTo(548, 700); ctx.lineTo(558, 700); ctx.moveTo(526, 724); ctx.lineTo(554, 724); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 1100, 520, 560, 260, 18); shape(ctx, rgba(C.teal, 0.1), C.teal, 2); text(ctx, 'groep B: herwaarderen', 1380, 580, fTekst(32, 700), C.teal, 'center'); text(ctx, 'kijk als koele buitenstaander', 1380, 630, fTekst(28, 600), C.text, 'center'); circ(ctx, 1380, 710, 40, HUID); circ(ctx, 1364, 702, 12, null, '#121A26', 3); circ(ctx, 1396, 702, 12, null, '#121A26', 3); ctx.restore();
      vraagteken(ctx, 960, 680, q.on('Wat', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const bn = q.on('benoemen', 1, 0.8), bi = q.on('Bilal', 1, 0.8);
    if (bn < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - bn;
      const rows = [['laat zien', 'zien', 1, 0.25, 0.3], ['lichaam (zweten, vaatjes)', 'zweten', 1, 0.8, 0.45], ['walging', 'walging', 1, 0.75, 0.45]]; const bB = q.on('herwaardeerde', 1);
      regel(ctx, 'A onderdrukken', 820, 230, 1, C.koraal, 30, 'center', 700); regel(ctx, 'B herwaarderen', 1420, 230, bB, C.teal, 30, 'center', 700);
      rows.forEach(([nm, w, n, va, vb], i) => { const a = q.on(w, n); balk(ctx, 600, 300 + i * 140, 440, va * a, C.koraal, a, nm); balk(ctx, 1200, 300 + i * 140, 440, vb * bB, C.teal, a * Math.max(0.25, bB)); });
      tag(ctx, 'aan de buitenkant minder, van binnen juist sterker', 960, 150, C.goud, q.on('sterker', 1)); metaText(ctx, 'schematisch, naar Gross (1998)', 1780, 860, C.text2, 'right', 16); ctx.restore(); }
    if (bn > 0.01 && bi < 0.99) { ctx.save(); ctx.globalAlpha *= bn * (1 - bi); regel(ctx, 'benoemen', 140, 140, 1, C.text, 40, 'left', 700);
      const wd = q.on('woorden', 1, 1.2); brein(ctx, 960, 540, 1.5, { t, amy: 1, pfc: 1, alarm: 1 - 0.75 * q.on('fel', 1), dim: 1 - q.on('actiever', 1) });
      tag(ctx, '"ik ben boos"', 520, 300, C.goud, wd, 'center', 34); tag(ctx, 'amygdala minder fel', 1300, 780, AMY, q.on('fel', 1), 'center', 28); tag(ctx, 'prefrontale cortex actiever', 560, 780, PFC, q.on('actiever', 1), 'center', 28); ctx.restore(); }
    if (bi > 0.01) { ctx.save(); ctx.globalAlpha *= bi;
      persoon(ctx, 'bilal', 360, 880, 560, { uit: q.on('bekijken', 1) > 0.5 ? 'blij' : 'denkt', pose: 'staan', kijk: 1, t });
      wolk(ctx, 560, 180, 560, 160, 'ik baal, maar ik was er bijna', q.on('benoemen', 2), '#E8F0F8', 30);
      tag(ctx, 'nóg een potje: kan, maar met een bonkend hart speel je slordig', 1220, 470, C.text2, q.on('potje', 1), 'center', 26);
      tag(ctx, 'geen strategie is altijd de beste', 1220, 570, C.goud, q.on('strategie', 1), 'center', 30);
      tag(ctx, 'soms: even weglopen', 1060, 670, C.text, q.on('weglopen', 1), 'center', 26); tag(ctx, 'soms: niets laten merken (in de klas)', 1430, 750, C.text, q.on('klas', 1), 'center', 26);
      tag(ctx, 'het gaat erom dat je kunt kiezen', 1220, 860 - 0, C.groen, q.on('kiezen', 1), 'center', 30); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'in je lichaam', 140, 140, 1, C.text, 40, 'left', 700);
    const box = (x, y, w, s2, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 80, 14); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, s2, x + w / 2, y + 50, fTekst(28, 700), C.text, 'center'); ctx.restore(); };
    const o = q.on('orthosympathische', 1), bm = q.on('bijniermerg', 1), hrt = q.on('sneller', 1), cs = q.on('bijnierschors', 1), hy = q.on('hypothalamus', 1), ps = q.on('parasympathische', 1);
    box(140, 260, 420, 'schrik of boosheid', C.koraal, q.on('schrik', 1));
    box(140, 420, 420, 'orthosympathisch zenuwstelsel', C.koraal, o); pijl(ctx, 350, 346, 350, 412, C.line, o, 3, 12);
    box(660, 420, 360, 'bijniermerg → adrenaline', C.goud, bm); pijl(ctx, 566, 460, 654, 460, C.line, bm, 3, 12);
    hartje(ctx, 1240, 470, 2.4 * (1 + 0.2 * Math.max(0, Math.sin(t * (ps > 0.5 ? 4 : 10)))), hrt); regel(ctx, ps > 0.5 ? 'hart: ruststand' : 'hart klopt sneller', 1240, 560, hrt, C.koraal, 26, 'center', 700); pijl(ctx, 1026, 460, 1170, 460, C.line, hrt, 3, 12);
    box(140, 640, 420, 'hypothalamus → hypofyse', C.paars, hy); box(660, 640, 360, 'bijnierschors → cortisol', C.paars, cs); pijl(ctx, 566, 680, 654, 680, C.line, cs, 3, 12); tag(ctx, 'als de stress aanhoudt', 840, 800, C.text2, q.on('stress', 1), 'center', 24);
    box(1400, 260, 420, 'parasympathisch zenuwstelsel', C.teal, ps); pijl(ctx, 1500, 346, 1300, 420, C.teal, ps, 3, 12);
    const ua = q.on('uitademen', 1); if (ua > 0.01) { ctx.save(); ctx.globalAlpha *= ua; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); for (let px = 0; px <= 420; px += 4) { const ph = ((px / 420) * 2 + t * 0.15) % 1; const v = ph < 0.35 ? ph / 0.35 : 1 - (ph - 0.35) / 0.65; px ? ctx.lineTo(1400 + px, 760 - v * 80) : ctx.moveTo(1400, 760 - v * 80); } ctx.stroke(); regel(ctx, 'in kort · uit lang', 1610, 820, 1, C.teal, 26, 'center', 700); ctx.restore(); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const gr = q.on('groot', 1, 0.8);
    if (gr < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - gr; const kalm = q.on('wiegen', 1, 2);
      ouder(ctx, 760, 860, 460, { t, armen: 1, flip: -1 }); peuter(ctx, 700, 560, 0.8, { t, huil: 1 - kalm, blij: kalm > 0.8 ? 1 : 0, armen: 1 });
      tag(ctx, 'co-regulatie', 1300, 300, C.goud, q.on('co-regulatie', 1), 'center', 36); tag(ctx, 'de veilige haven (film 4)', 1300, 400, C.text2, q.on('veilige', 1), 'center', 28);
      const sz = q.on('zelf', 2); if (sz > 0.01) { regel(ctx, 'samen', 1150, 580, sz, C.goud, 34, 'center', 700); pijl(ctx, 1220, 570, 1380, 570, C.goud, sz, 5, 18); regel(ctx, 'zelf', 1450, 580, sz, C.groen, 34, 'center', 700); }
      ctx.restore(); }
    if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; persoon(ctx, 'bilal', 380, 880, 560, { uit: q.on('balen', 1) > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t });
      roundRect(ctx, 600, 260, 280, 500, 30); shape(ctx, '#1A1E28', '#9AA3B2', 3); ctx.fillStyle = '#E8ECF0'; ctx.fillRect(616, 300, 248, 420);
      const ap = q.on('appen', 1); if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; roundRect(ctx, 630, 330, 200, 90, 14); shape(ctx, '#FFFFFF', '#C9C9C2', 1); ctx.font = fTekst(20, 600); ctx.fillStyle = '#121A26'; wrap(ctx, 'dat was zó close, balen', 642, 362, 180, 24); ctx.restore(); }
      tag(ctx, 'co-regulatie, maar dan als je groot bent', 1360, 380, C.goud, q.on('co-regulatie', 2), 'center', 30);
      const vw = q.on('Volwassenen', 1); if (vw > 0.01) { ouder(ctx, 1250, 860, 340, { t, a: vw, jas: '#4A6A8A', haar: '#3A2A20', lang: 0 }); ouder(ctx, 1450, 860, 330, { t, a: vw, flip: -1, armen: 0.4 }); regel(ctx, 'volwassenen ook', 1350, 900 - 0, vw, C.text2, 26, 'center', 600); }
      ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'alarm en rem', q.on('Emoties', 1), (x) => brein(ctx, x + 200, 480, 0.75, { t, amy: 1, pfc: 1, alarm: 0.6, rem: 1 }));
    panel(1, 'vier stappen', q.on('situatie', 1), (x) => { ['situatie', 'aandacht', 'betekenis', 'reactie'].forEach((s2, i) => { roundRect(ctx, x + 80, 320 + i * 100, 240, 64, 10); shape(ctx, rgba(C.teal, 0.14), C.teal, 1.5); text(ctx, s2, x + 200, 362 + i * 100, fTekst(26, 700), C.text, 'center'); }); });
    panel(2, 'onderdrukken vs herwaarderen', q.on('Onderdrukken', 1), (x) => { [['A', 0.8, C.koraal], ['B', 0.45, C.teal]].forEach(([n, v, col], i) => { roundRect(ctx, x + 90 + i * 140, 680 - v * 300, 90, v * 300, 8); shape(ctx, rgba(col, 0.55), col, 2); text(ctx, n, x + 135 + i * 140, 720, fTekst(26, 700), col, 'center'); }); metaText(ctx, 'lichaam', x + 200, 330, C.text2, 'center', 18); });
    panel(3, 'eerst samen, dan zelf', q.on('samen', 1), (x) => { ouder(ctx, x + 250, 700, 280, { t, armen: 1, flip: -1 }); peuter(ctx, x + 180, 600, 0.6, { t, blij: 1, armen: 1 }); });
    tag(ctx, 'de beste keuze hangt af van de situatie', 960, 850, C.goud, q.on('keuze', 1)); },
};

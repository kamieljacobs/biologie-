// Gedrag 7 · Leren: van Pavlov tot je telefoon — scènes per alinea (v1.0, 15 okt 2026). Daan en zijn telefoon; zeehaas; Pavlovs hond met metronoom; Skinnerbox; vwo: dopamine-voorspellingsfout.

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


const HOND = '#C9A26A', HONDD = '#8A6A44', RAT = '#B8B0A8';
function hartje(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-26, -8, -12, -30, 0, -14); ctx.bezierCurveTo(12, -30, 26, -8, 0, 10); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function telefoon(ctx, x, y, s, o = {}) { const { a = 1, tril = 0, t = 0, scherm = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = tril ? Math.sin(t * 60) * 4 * tril : 0; ctx.translate(x + dx, y); ctx.scale(s, s); roundRect(ctx, -60, -110, 120, 220, 18); shape(ctx, '#1A1E28', '#9AA3B2', 3); ctx.fillStyle = '#E8ECF0'; ctx.fillRect(-50, -90, 100, 180); if (scherm) scherm(ctx); if (tril > 0.01) { ctx.strokeStyle = rgba(C.goud, tril); ctx.lineWidth = 3; for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(0, 0, 90, k > 0 ? -0.5 : Math.PI - 0.5, k > 0 ? 0.5 : Math.PI + 0.5); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 110, k > 0 ? -0.4 : Math.PI - 0.4, k > 0 ? 0.4 : Math.PI + 0.4); ctx.stroke(); } } ctx.restore(); }
function melding(ctx, x, y, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520, 70, 14); shape(ctx, '#F4F6F8', rgba(col, 0.8), 2); circ(ctx, x + 34, y + 35, 18, col); text(ctx, s2, x + 66, y + 44, fTekst(24, 600), '#121A26', 'left'); ctx.restore(); }
// zeehaas met sifon en kieuw; inn = 0 (open) .. 1 (ingetrokken)
function zeehaas(ctx, x, y, s, inn = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 40); ctx.bezierCurveTo(-180, -80, 120, -110, 200, -10); ctx.bezierCurveTo(230, 30, 150, 70, 60, 70); ctx.bezierCurveTo(-60, 80, -180, 80, -200, 40); ctx.closePath(); shape(ctx, '#8A6A8A', '#6A4A6A', 3);
  for (let i = 0; i < 12; i++) circ(ctx, -140 + i * 26, -10 + Math.sin(i) * 18, 6, rgba('#C9A8C9', 0.6));
  ctx.strokeStyle = '#6A4A6A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(180, -40); ctx.lineTo(210, -90); ctx.moveTo(196, -30); ctx.lineTo(240, -70); ctx.stroke();
  // kieuw (pluim) bovenop, trekt in
  const k = 1 - inn; ctx.save(); ctx.translate(-10, -70); ctx.scale(1, 0.25 + 0.75 * k); for (let i = 0; i < 7; i++) { ctx.strokeStyle = '#E08A9A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-30 + i * 10, 0); ctx.quadraticCurveTo(-50 + i * 16, -50, -40 + i * 14, -90); ctx.stroke(); } ctx.restore();
  // sifon
  ctx.save(); ctx.translate(-120, -50); ctx.rotate(-0.6); roundRect(ctx, -12, -70 * (0.4 + 0.6 * k), 24, 70 * (0.4 + 0.6 * k), 10); shape(ctx, '#A87AA8', '#6A4A6A', 2); ctx.restore();
  ctx.restore(); }
// hond (zijaanzicht, kop rechts) met kwijl
function hond(ctx, x, y, s, o = {}) { const { a = 1, kwijl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = HONDD; ctx.lineWidth = 16; ctx.lineCap = 'round'; for (const lx of [-90, -60, 40, 70]) { ctx.beginPath(); ctx.moveTo(lx, 20); ctx.lineTo(lx, 110); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-120, -10); ctx.quadraticCurveTo(-170, -50 + Math.sin(t * 6) * 10, -160, -80); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-10, 0, 130, 55, 0, 0, 6.283); shape(ctx, HOND, null);
  ctx.beginPath(); ctx.ellipse(130, -60, 60, 50, 0, 0, 6.283); shape(ctx, HOND, null); ctx.beginPath(); ctx.ellipse(185, -40, 40, 26, 0, 0, 6.283); shape(ctx, HOND, null); circ(ctx, 222, -48, 9, '#2A1E14'); circ(ctx, 140, -78, 7, '#2A1E14');
  ctx.beginPath(); ctx.ellipse(100, -60, 22, 48, 0.3, 0, 6.283); shape(ctx, HONDD, null);
  if (kwijl > 0.01) { ctx.save(); ctx.globalAlpha *= kwijl; for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); ctx.fillStyle = rgba('#9FD8F0', 0.9 * (1 - ph)); ctx.beginPath(); ctx.ellipse(196 + i * 8, -16 + ph * 80, 6, 10, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
function metronoom(ctx, x, y, s, a = 1, t = 0, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 60); ctx.lineTo(-25, -90); ctx.lineTo(25, -90); ctx.lineTo(50, 60); ctx.closePath(); shape(ctx, '#7A5A3C', '#4A3420', 3); const an = Math.sin(t * 6) * 0.5 * aan; ctx.save(); ctx.translate(0, 40); ctx.rotate(an); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -120); ctx.stroke(); roundRect(ctx, -10, -90, 20, 18, 4); shape(ctx, C.goud, null); ctx.restore(); if (aan > 0.5) { text(ctx, 'tik', 70, -60 + (Math.sin(t * 6) > 0 ? 0 : 10), fTekst(26, 700), C.goud, 'left'); } ctx.restore(); }
function bak(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 60, 18, 0, 0, Math.PI); shape(ctx, '#9AA3B2', '#6A7080', 2); for (let i = 0; i < 6; i++) circ(ctx, -36 + i * 14, -4 - (i % 2) * 6, 8, '#B8803C'); ctx.restore(); }
// Skinnerbox met rat; druk 0..1
function skinnerbox(ctx, x, y, w, h, o = {}) { const { a = 1, druk = 0, korrel = 0, t = 0, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#2A3446', 0.7), '#9AA3B2', 3); ctx.fillStyle = '#4A4038'; ctx.fillRect(x + 4, y + h - 30, w - 8, 26);
  const lx = x + w - 110, ly = y + h - 150; ctx.strokeStyle = '#C9C9C2'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx + 60, ly); ctx.lineTo(lx, ly + 18 * druk - 6); ctx.stroke(); roundRect(ctx, x + w - 60, ly - 40, 40, 70, 6); shape(ctx, '#5A6478', null);
  ctx.beginPath(); ctx.ellipse(x + w - 70, y + h - 34, 40, 10, 0, 0, Math.PI); shape(ctx, '#9AA3B2', null); if (korrel > 0.01) { const ky = lerp(ly + 20, y + h - 40, clamp(korrel, 0, 1)); circ(ctx, x + w - 70, ky, 8, '#B8803C'); }
  // rat
  const rx = x + w - 230 + druk * 30, ry = y + h - 60; ctx.strokeStyle = '#D8A8A0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(rx - 60, ry + 6); ctx.quadraticCurveTo(rx - 110, ry - 10, rx - 130, ry + 20); ctx.stroke(); ctx.beginPath(); ctx.ellipse(rx, ry - 10 - druk * 20, 64, 34, -0.3 * druk, 0, 6.283); shape(ctx, RAT, null); circ(ctx, rx + 56, ry - 30 - druk * 40, 24, RAT); circ(ctx, rx + 46, ry - 52 - druk * 40, 10, '#E8C8C0'); circ(ctx, rx + 66, ry - 34 - druk * 40, 4, '#121A26'); circ(ctx, rx + 80, ry - 26 - druk * 40, 4, '#E08A9A');
  if (label) regel(ctx, label, x + 20, y + 40, 1, C.text, 30, 'left', 700);
  ctx.restore(); }
function curve(ctx, x, y, w, h, f, prog, col, lw = 5) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); const n = 80; for (let i = 0; i <= n * prog; i++) { const u = i / n, v = f(u); i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x, y + h - v * h); } ctx.stroke(); }
function assen(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); metaText(ctx, xl, x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, yl, x, y - 16, C.text2, 'left', 18); }
function raster(ctx, x, y, w, rij, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; const rnd = (i) => { const s = Math.sin(i * 12.9898 + rij.seed) * 43758.5453; return s - Math.floor(s); };
  for (let i = 0; i < 70; i++) { let u = rnd(i); const base = rij.base || 1; if (rnd(i + 100) > 0.35 * base) continue; ctx.beginPath(); ctx.moveTo(x + u * w, y - 14); ctx.lineTo(x + u * w, y + 14); ctx.stroke(); }
  (rij.bursts || []).forEach(([u, n, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 3; for (let k = 0; k < n; k++) { const uu = u + (rnd(k + 300) - 0.5) * 0.05; ctx.beginPath(); ctx.moveTo(x + uu * w, y - 18); ctx.lineTo(x + uu * w, y + 18); ctx.stroke(); } });
  if (rij.dip) { ctx.fillStyle = rgba(C.bgSchema, 1); ctx.fillRect(x + (rij.dip - 0.04) * w, y - 20, 0.08 * w, 40); text(ctx, 'dip', x + rij.dip * w, y + 46, fTekst(20, 700), C.koraal, 'center'); }
  ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { persoon(ctx, 'daan', 1380, 880, 520, { uit: 'neutraal', pose: 'staan', kijk: 1, t }); telefoon(ctx, 1620, 560, 1.1, { tril: Math.sin(t * 2) > 0.6 ? 1 : 0, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const pak = q.on('pakt', 1); persoon(ctx, 'daan', 360, 880, 560, { uit: q.on('leuks', 1) > 0.5 && q.on('Waarom', 1) < 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t });
    const tr = (t > q.at('trilt') && t < q.at('trilt') + 1.4) || (t > q.at('weer') && t < q.at('weer') + 1.2) || (t > q.at('soms') && t < q.at('soms') + 1.2) ? 1 : 0;
    telefoon(ctx, 760, 520, 1.6, { tril: tr, t });
    melding(ctx, 1000, 260, 'reclame: 20% korting!', C.text2, q.on('reclame', 1));
    melding(ctx, 1000, 360, 'groepsapp: "wie heeft de lader?"', C.text2, q.on('groepsapp', 1));
    melding(ctx, 1000, 460, 'bericht: "hey, zin om af te spreken?"', C.koraal, q.on('bericht', 1)); hartje(ctx, 1560, 495, 1.2, q.on('bericht', 1));
    tag(ctx, 'meestal niks · heel soms iets leuks', 1180, 640, C.goud, q.on('meestal', 1), 'center', 28);
    vraagteken(ctx, 1500, 820, q.on('Wat', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const ji = q.on('Jij', 1, 0.8);
    if (ji < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ji; regel(ctx, 'zeehaas (een zeeslak)', 140, 140, 1, C.text, 36, 'left', 700);
      const tr = q.at('Raak'), op = q.at('opnieuw'); const taps = []; taps.push(tr + 0.6); for (let i = 1; i <= 7; i++) taps.push(op + i * 0.9 - 0.4);
      let inn = 0; taps.forEach((tt, i) => { const amp = Math.max(0.08, 1 - i * 0.14); const d = t - tt; if (d > 0 && d < 1.2) inn = Math.max(inn, amp * Math.sin(Math.min(1, d / 0.3) * Math.PI / 2) * (1 - Math.max(0, d - 0.4) / 0.8)); });
      zeehaas(ctx, 600, 600, 1.4, inn);
      const last = taps.filter(tt => t > tt).length; if (last > 0) { const tt = taps[last - 1], d = t - tt; if (d < 0.5) { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(330, 380); ctx.lineTo(420 - d * 40, 470 - d * 40); ctx.stroke(); } }
      // grafiek: reactie per aanraking
      const gx = 1150, gy = 300, gw = 580, gh = 360; ctx.save(); ctx.globalAlpha *= q.on('opnieuw', 1); assen(ctx, gx, gy, gw, gh, 'aanraking →', 'hoe ver de kieuw intrekt'); for (let i = 0; i < Math.min(last, 8); i++) { const amp = Math.max(0.08, 1 - i * 0.14); roundRect(ctx, gx + 20 + i * 70, gy + gh - amp * gh, 46, amp * gh, 6); shape(ctx, rgba(C.teal, 0.5), C.teal, 1.5); } ctx.restore();
      tag(ctx, 'gewenning', 1440, 760, C.goud, q.on('gewenning', 1), 'center', 36); ctx.restore(); }
    if (ji > 0.01) { ctx.save(); ctx.globalAlpha *= ji;
      roundRect(ctx, 260, 280, 260, 480, 18); shape(ctx, '#D8DEE4', '#9AA3B2', 3); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(260, 450); ctx.lineTo(520, 450); ctx.stroke(); regel(ctx, 'koelkast', 390, 810, 1, C.text2, 26, 'center', 600);
      for (let k = 0; k < 4; k++) { const r = 40 + ((t * 60 + k * 50) % 200); ctx.strokeStyle = rgba(C.text2, 0.6 * (1 - r / 240)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(520, 520, r, -0.5, 0.5); ctx.stroke(); }
      regel(ctx, 'zzzzz', 640, 500, 1, C.text2, 30, 'left', 600);
      // oor en hersenen
      ctx.save(); ctx.globalAlpha *= q.on('oren', 1); ctx.beginPath(); ctx.ellipse(1000, 520, 50, 80, 0, 0, 6.283); shape(ctx, HUID, '#B88A68', 3); ctx.beginPath(); ctx.ellipse(1006, 520, 22, 44, 0, 0, 6.283); shape(ctx, '#D8A47E', null); regel(ctx, 'oor: vangt het geluid nog op', 1000, 680, 1, C.groen, 26, 'center', 700); pijl(ctx, 1070, 520, 1260, 520, C.line, 1, 4, 14); ctx.restore();
      ctx.save(); ctx.globalAlpha *= q.on('hersenen', 1); ctx.beginPath(); ctx.ellipse(1450, 500, 170, 120, 0, 0, 6.283); shape(ctx, rgba('#C98A9A', 0.15), rgba('#C98A9A', 0.6), 3); regel(ctx, 'hersenen: reageren niet meer', 1450, 680, 1, C.koraal, 26, 'center', 700); ctx.restore();
      tag(ctx, 'geen aandacht voor prikkels die er niet toe doen', 960, 170, C.goud, q.on('Handig', 1), 'center', 28); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const da = q.on('Daarna', 1, 0.8); regel(ctx, 'Ivan Pavlov · rond 1900', 140, 140, q.on('Pavlov', 1), C.text, 36, 'left', 700);
    const pw = 540, y0 = 240; const P = (i) => 120 + i * (pw + 30);
    const pan = (i, titel, a) => { if (a <= 0.01) return false; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, P(i), y0, pw, 560, 18); shape(ctx, rgba(C.fill, 0.4), C.line, 1.5); regel(ctx, titel, P(i) + pw / 2, y0 + 48, 1, C.text2, 26, 'center', 700); return true; };
    // 1: eten -> kwijlen
    if (pan(0, 'aangeboren', q.on('hond', 1) * (1 - 0.6 * da))) { bak(ctx, P(0) + 440, y0 + 330, 1.2, q.on('eten', 1)); hond(ctx, P(0) + 220, y0 + 300, 0.9, { t, kwijl: q.on('kwijlen', 1) }); regel(ctx, 'onvoorwaardelijke prikkel: eten', P(0) + pw / 2, y0 + 470, q.on('onvoorwaardelijke', 1), C.goud, 22, 'center', 700); regel(ctx, 'onvoorwaardelijke reflex: kwijlen', P(0) + pw / 2, y0 + 510, q.on('onvoorwaardelijke', 2), C.goud, 22, 'center', 700); ctx.restore(); }
    // 2: geluid + eten
    if (pan(1, 'samen, steeds opnieuw', q.on('geluid', 1) * (1 - 0.6 * da))) { metronoom(ctx, P(1) + 120, y0 + 300, 0.8, 1, t); regel(ctx, '+', P(1) + 230, y0 + 300, 1, C.text, 48, 'center', 700); bak(ctx, P(1) + 340, y0 + 340, 1); hond(ctx, P(1) + 300, y0 + 420, 0.55, { t, kwijl: 1 }); ctx.restore(); }
    // 3: geluid alleen
    if (pan(2, da > 0.5 ? 'geluid, maar geen eten meer' : 'geluid alleen', q.on('alleen', 1))) { metronoom(ctx, P(2) + 120, y0 + 300, 0.8, 1, t); kruis(ctx, P(2) + 400, y0 + 300, 34, da); hond(ctx, P(2) + 330, y0 + 340, 0.7, { t, kwijl: da > 0.5 ? 0.5 : 1 }); regel(ctx, 'voorwaardelijke prikkel: geluid', P(2) + pw / 2, y0 + 470, q.on('voorwaardelijke', 3), C.teal, 22, 'center', 700); regel(ctx, 'voorwaardelijke reflex: kwijlen', P(2) + pw / 2, y0 + 510, q.on('voorwaardelijke', 4), C.teal, 22, 'center', 700); ctx.restore(); }
    tag(ctx, 'klassieke conditionering', 960, 880 - 0, C.goud, q.on('klassieke', 1) * (1 - da), 'center', 32);
    vraagteken(ctx, P(2) + pw / 2, y0 + 220, q.on('Wat', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const da = q.on('Daan', 1, 0.8);
    if (da < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - da; const x = 300, y = 260, w = 1300, h = 440; assen(ctx, x, y, w, h, 'proefjes →', 'hoeveel speeksel bij het geluid');
      const f = (u) => u < 0.35 ? 0.1 + 0.8 * (1 - Math.exp(-u * 12)) : u < 0.75 ? 0.9 * Math.exp(-(u - 0.35) * 7) + 0.05 : u < 0.8 ? 0.06 : 0.35 * Math.exp(-(u - 0.8) * 14) + 0.05;
      curve(ctx, x, y, w, h, f, 0.35 + 0.4 * q.on('minder', 1, 1.5) + 0.25 * q.on('terug', 1, 1.2), C.teal);
      ctx.fillStyle = rgba(C.goud, 0.08); ctx.fillRect(x, y, 0.35 * w, h); regel(ctx, 'geluid + eten', x + 0.175 * w, y + 30, 1, C.goud, 24, 'center', 700);
      ctx.save(); ctx.globalAlpha *= q.on('minder', 1); ctx.fillStyle = rgba(C.koraal, 0.08); ctx.fillRect(x + 0.35 * w, y, 0.4 * w, h); regel(ctx, 'geluid zonder eten: uitdoving', x + 0.55 * w, y + 30, 1, C.koraal, 24, 'center', 700); ctx.restore();
      ctx.save(); ctx.globalAlpha *= q.on('pauze', 1); regel(ctx, 'pauze', x + 0.775 * w, y + h + 34, 1, C.text2, 20, 'center', 600); regel(ctx, 'een beetje terug', x + 0.88 * w, y + h * 0.45, q.on('terug', 1), C.text, 22, 'center', 700); ctx.restore(); ctx.restore(); }
    if (da > 0.01) { ctx.save(); ctx.globalAlpha *= da; regel(ctx, 'Pavlov', 560, 230, 1, C.text2, 30, 'center', 700); regel(ctx, 'Daan', 1360, 230, 1, C.text2, 30, 'center', 700);
      const rows = [['geluid', 'trillen', 'trillen'], ['eten', 'iets leuks', 'leuks'], ['kwijlen', 'kriebel', 'kriebel']];
      rows.forEach(([l, r, w], i) => { const a = q.on(w, 1); const y = 320 + i * 140; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 400, y, 320, 90, 14); shape(ctx, rgba(C.teal, 0.12), C.teal, 2); text(ctx, l, 560, y + 56, fTekst(30, 700), C.text, 'center'); pijl(ctx, 740, y + 45, 1180, y + 45, C.line, 1, 3, 12); roundRect(ctx, 1200, y, 320, 90, 14); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); text(ctx, r, 1360, y + 56, fTekst(30, 700), C.text, 'center'); ctx.restore(); });
      telefoon(ctx, 1640, 420, 0.7, { tril: 1, t, a: q.on('trillen', 1) });
      tag(ctx, 'aangeleerd, zonder nadenken: het gebeurt vanzelf', 960, 820, C.goud, q.on('vanzelf', 1), 'center', 30); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const ra = q.on('kreeg', 1, 0.8);
    if (ra < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ra;
      chip(ctx, 'klassiek: prikkel + prikkel', 560, 160, C.teal, q.on('prikkels', 1)); chip(ctx, 'operant: gedrag → gevolg', 1360, 160, C.koraal, q.on('gevolg', 1));
      const per = 1.6, ph = ((t - q.at('Drukte')) % per) / per, act = t > q.at('Drukte'); const druk = act ? (ph < 0.25 ? ph / 0.25 : ph < 0.4 ? 1 : Math.max(0, 1 - (ph - 0.4) / 0.2)) : 0; const korrel = act ? clamp((ph - 0.3) / 0.3, 0, 1) : 0;
      skinnerbox(ctx, 220, 260, 760, 460, { t, druk, korrel, label: 'Skinner' });
      const gx = 1120, gy = 300, gw = 600, gh = 260; ctx.save(); ctx.globalAlpha *= q.on('vaker', 1); assen(ctx, gx, gy, gw, gh, 'tijd →', 'aantal keer drukken'); curve(ctx, gx, gy, gw, gh, (u) => 0.08 + 0.85 * (1 - Math.exp(-u * 4)), clamp((t - q.at('vaker')) / 2, 0, 1), C.goud); ctx.restore();
      chip(ctx, '+ prettig gevolg → meer: bekrachtiging', 1420, 650, C.groen, q.on('bekrachtiging', 1), 26); chip(ctx, 'iets vervelends houdt op → ook meer', 1420, 720, C.groen, q.on('vervelends', 1), 24); chip(ctx, '− onprettig gevolg → minder: straf', 1420, 790, C.koraal, q.on('straf', 1), 26);
      ctx.restore(); }
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; const per = 1.2, ph = ((t) % per) / per, druk = ph < 0.25 ? ph / 0.25 : ph < 0.4 ? 1 : Math.max(0, 1 - (ph - 0.4) / 0.2);
      skinnerbox(ctx, 160, 220, 760, 440, { t, druk, korrel: clamp((ph - 0.3) / 0.3, 0, 1), label: 'rat A: elke keer' });
      const n = Math.floor(t / per), krijgt = Math.sin(n * 7.13) > 0.55; skinnerbox(ctx, 1000, 220, 760, 440, { t, druk, korrel: krijgt ? clamp((ph - 0.3) / 0.3, 0, 1) : 0, a: q.on('onvoorspelbaar', 1), label: 'rat B: af en toe' });
      tag(ctx, 'dan stopt het voer helemaal', 960, 760, C.koraal, q.on('stopte', 1), 'center', 30); vraagteken(ctx, 960, 900 - 40, q.on('Wat', 1), 80); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const tf = q.on('telefoon', 1, 0.8);
    if (tf < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - tf; const x = 300, y = 220, w = 1300, h = 400; assen(ctx, x, y, w, h, 'tijd na het stoppen van het voer →', 'hoe vaak de rat drukt');
      curve(ctx, x, y, w, h, (u) => 0.85 * Math.exp(-u * 9) + 0.03, clamp((t - q.at('eerder')) / 1.5, 0, 1), C.teal); regel(ctx, 'A: elke keer beloond', x + 220, y + h - 60, q.on('eerder', 1), C.teal, 26, 'left', 700);
      curve(ctx, x, y, w, h, (u) => 0.85 * Math.exp(-u * 2) + 0.05, clamp((t - q.at('langer')) / 2.5, 0, 1), C.goud); regel(ctx, 'B: af en toe beloond', x + 640, y + 140, q.on('langer', 1), C.goud, 26, 'left', 700);
      chip(ctx, 'snel aanleren: elke keer belonen', 620, 790, C.teal, q.on('aanleren', 1), 28); chip(ctx, 'lang volhouden: daarna af en toe', 1300, 790, C.goud, q.on('blijft', 1), 28); ctx.restore(); }
    if (tf > 0.01) { ctx.save(); ctx.globalAlpha *= tf; telefoon(ctx, 380, 520, 1.8, { tril: Math.sin(t * 1.3) > 0.7 ? 1 : 0, t, scherm: (c) => { text(c, 'meestal', 0, -40, fTekst(20, 700), '#121A26', 'center'); text(c, 'niks', 0, -14, fTekst(20, 700), '#121A26', 'center'); hartje(c, 0, 40, 1.2, Math.sin(t * 1.7) > 0.8 ? 1 : 0.15); } });
      const it = [['likes', 'likes', C.koraal], ['loot', 'loot boxes in games', C.goud], ['gokautomaten', 'gokautomaten', C.paars]]; it.forEach(([w, s2, col], i) => chip(ctx, s2, 980, 290 + i * 90, col, q.on(w, 1), 30));
      tag(ctx, 'meestal niks, soms iets leuks, nooit weten wanneer', 980, 180, C.text2, q.on('wanneer', 1), 'center', 26);
      const mu = q.on('meldingen', 1); if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= mu; roundRect(ctx, 1240, 620, 140, 70, 35); shape(ctx, rgba(C.text2, 0.3), C.text2, 2); circ(ctx, 1240 + 35 + 0 * 70, 655, 26, '#F2F2EE'); regel(ctx, 'meldingen uit', 1420, 665, 1, C.text, 30, 'left', 700); ctx.restore(); }
      chip(ctx, 'of: een paar keer per dag tegelijk', 1460, 770, C.groen, q.on('tegelijk', 1), 26); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'dopamine: leer- en motivatiesignaal', 140, 140, 1, C.paars, 36, 'left', 700);
    const x = 520, w = 1100; const lab = (y, s2, a) => regel(ctx, s2, x - 30, y + 8, a, C.text, 24, 'right', 600);
    const r1 = 0.25 + 0.75 * q.on('onverwachte', 1), r2 = 0.25 + 0.75 * q.on('lampje', 1), r3 = 0.25 + 0.75 * q.on('uit', 1);
    // tijdas met lampje en beloning
    ctx.save(); ctx.globalAlpha *= r1; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 690); ctx.lineTo(x + w, 690); ctx.stroke(); metaText(ctx, 'tijd →', x + w, 724, C.text2, 'right', 18); ctx.restore();
    ctx.save(); ctx.globalAlpha *= r2; circ(ctx, x + 0.3 * w, 720, 14, C.goud); regel(ctx, 'lampje', x + 0.3 * w, 760, 1, C.goud, 22, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= r1; circ(ctx, x + 0.7 * w, 720, 14, C.groen); regel(ctx, 'beloning', x + 0.7 * w, 770, 1, C.groen, 22, 'center', 700); ctx.restore();
    lab(300, 'onverwachte beloning', r1); raster(ctx, x, 300, w, { seed: 1, bursts: [[0.7, 14, C.groen]] }, t, r1);
    lab(430, 'na het leren', r2); raster(ctx, x, 430, w, { seed: 2, bursts: [[0.3, 14, C.goud]] }, t, r2);
    lab(560, 'beloning blijft uit', r3); raster(ctx, x, 560, w, { seed: 3, bursts: [[0.3, 14, C.goud]], dip: 0.7 }, t, r3);
    tag(ctx, 'voorspellingsfout: verschil tussen verwachting en uitkomst', 960, 230, C.goud, q.on('voorspellingsfout', 1), 'center', 28);
    tag(ctx, 'onvoorspelbaar: neuronen blijven extra actief', 960, 860, C.paars, q.on('actief', 1), 'center', 28); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'gewenning', q.on('Gewenning', 1), (x) => zeehaas(ctx, x + 200, 520, 0.75, 0.2));
    panel(1, 'klassieke conditionering', q.on('Klassieke', 1), (x) => { metronoom(ctx, x + 90, 470, 0.6, 1, t); hond(ctx, x + 220, 600, 0.5, { t, kwijl: 1 }); });
    panel(2, 'operante conditionering', q.on('Operante', 1), (x) => { const ph2 = (t % 1.4) / 1.4; skinnerbox(ctx, x + 20, 340, 360, 300, { t, druk: ph2 < 0.3 ? ph2 / 0.3 : Math.max(0, 1 - (ph2 - 0.3) / 0.3), korrel: clamp((ph2 - 0.3) / 0.3, 0, 1) }); });
    panel(3, 'onvoorspelbaar = hardnekkig', q.on('onvoorspelbaar', 1), (x) => telefoon(ctx, x + 200, 520, 1.3, { tril: Math.sin(t * 2) > 0.6 ? 1 : 0, t }));
    tag(ctx, 'daarom pakt Daan zijn telefoon bij elk trilletje', 960, 850, C.goud, q.on('Daarom', 1), 'center', 28); },
};
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
const HUID = '#E3B998';

// Voortplanting 4 · Sekse, gender en diversiteit — scènes per alinea (v1.0, 16 okt 2026). Noor en Dr. Kim bij de echo; trap van lagen (chromosomen → SRY → geslachtsklier → hormonen → geslachtsorganen → puberteit); variaties per laag; ZW, temperatuur, clownvis; vier begrippen.

// ---------- algemene helpers (zelfde stijl als Gedrag 12) ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - kop * 0.6 * Math.cos(an), y2 - kop * 0.6 * Math.sin(an)); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1, col = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), col, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 46, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function bubbel(ctx, x, y, s2, a = 1, px = 28, col = '#F2F2EE') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s2).width + 36; roundRect(ctx, x - w / 2, y - px - 14, w, px + 28, 16); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 10, y + 14); ctx.lineTo(x - 22, y + 36); ctx.lineTo(x + 10, y + 14); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 700), '#121A26', 'center'); ctx.restore(); }
function tekstBlok(ctx, s, x, y, maxW, px = 26, col = C.text, a = 1, lh = 1.3, w = 600) { if (a <= 0.01) return y; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, w); ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; const yy = wrap(ctx, s, x, y, maxW, px * lh); ctx.restore(); return yy; }
// fasen: cues = [null, ['woord', n], …] → alfa per fase (overvloeien)
function fasen(q, cues, d = 0.7) { const on = cues.map(c => c ? q.on(c[0], c[1] || 1, d) : 1); return on.map((v, i) => v * (i + 1 < on.length ? 1 - on[i + 1] : 1)); }
const SEXM = C.teal, SEXV = C.koraal; // kleurafspraak: zaadbal/mannelijke route teal, eierstok/vrouwelijke route koraal; aanleg oker

// ---------- tekeningen ----------
// chromosoom als twee zusterchromatiden (X-vorm uit de celdelingsfilms), met optionele gouden band (SRY)
function chromosoom(ctx, x, y, len, col, a = 1, o = {}) { if (a <= 0.01) return; const { cen = 0.4, band = null, bandA = 1, bandCol = C.goud, kruisBand = 0, rot = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const w = Math.max(16, len * 0.17), gap = w * 0.25, top = -len / 2, cy = top + len * cen;
  for (const sx of [-1, 1]) { const cx = sx * (w / 2 + gap / 2); ctx.beginPath(); ctx.moveTo(cx - w / 2 + 2, top + w / 2); ctx.quadraticCurveTo(cx - w / 2, top, cx, top); ctx.quadraticCurveTo(cx + w / 2, top, cx + w / 2 - 2, top + w / 2);
    ctx.lineTo(cx + w / 2 - sx * 4, cy - 6); ctx.quadraticCurveTo(cx + w / 2 - sx * 10, cy, cx + w / 2 - sx * 4, cy + 6); ctx.lineTo(cx + w / 2 - 2, len / 2 - w / 2); ctx.quadraticCurveTo(cx + w / 2, len / 2, cx, len / 2); ctx.quadraticCurveTo(cx - w / 2, len / 2, cx - w / 2 + 2, len / 2 - w / 2);
    ctx.lineTo(cx - w / 2 + sx * 4 + (sx < 0 ? 0 : 0), cy + 6); ctx.quadraticCurveTo(cx - w / 2 + sx * 10, cy, cx - w / 2 + sx * 4, cy - 6); ctx.closePath(); shape(ctx, rgba(col, 0.85), lighten(col, 0.35), 2);
    if (band != null && bandA > 0.01) { ctx.save(); ctx.clip(); ctx.globalAlpha *= bandA; ctx.fillStyle = bandCol; ctx.fillRect(cx - w, top + len * band - w * 0.32, w * 2, w * 0.64); ctx.restore(); } }
  circ(ctx, 0, cy, w * 0.32, lighten(col, 0.2));
  if (kruisBand > 0.01 && band != null) kruis(ctx, 0, top + len * band, w * 1.1, kruisBand);
  ctx.restore(); }
function chrX(ctx, x, y, s, a = 1, o = {}) { chromosoom(ctx, x, y, 210 * s, o.col || C.paars, a, Object.assign({ cen: 0.42 }, o)); }
function chrY(ctx, x, y, s, a = 1, o = {}) { chromosoom(ctx, x, y, 96 * s, o.col || C.teal, a, Object.assign({ cen: 0.3, band: 0.13 }, o)); }
// geslachtsklier: mix 0 = aanleg (oker), soort 'm' = zaadbal (buisjes), 'v' = eierstok (follikels)
function klier(ctx, x, y, s, soort, mix = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const col = soort === 'v' ? SEXV : SEXM; ctx.beginPath(); ctx.ellipse(0, 0, 70, 46, 0, 0, 6.283); shape(ctx, rgba(C.oker, 0.55 * (1 - mix)), C.oker, 3);
  if (mix > 0.01) { ctx.save(); ctx.globalAlpha *= mix; ctx.beginPath(); ctx.ellipse(0, 0, 70, 46, 0, 0, 6.283); shape(ctx, rgba(col, 0.35), col, 3); ctx.clip();
    if (soort === 'm') { ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, px = -60 + 120 * u, py = -26 + k * 17 + Math.sin(u * 18 + k) * 6; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } }
    else { [[-30, -10, 14], [12, 14, 10], [34, -14, 8], [-6, 22, 6], [-44, 18, 6], [20, -26, 5]].forEach(([fx, fy, fr]) => { circ(ctx, fx, fy, fr, rgba(C.goud, 0.35), lighten(col, 0.3), 2); circ(ctx, fx, fy, fr * 0.3, '#F2F2EE'); }); }
    ctx.restore(); }
  ctx.restore(); }
function embryo(ctx, x, y, s, a = 1, glow = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const huid = '#E8B79E', rand = '#C98E76';
  ctx.beginPath(); ctx.arc(10, 10, 100, -1.9, 2.9); ctx.arc(-6, 30, 42, 2.9, -1.9, true); ctx.closePath(); shape(ctx, huid, rand, 3);
  circ(ctx, -18, -66, 62, huid, rand, 3); circ(ctx, -40, -76, 9, '#5A3A30');
  ctx.beginPath(); ctx.ellipse(86, 6, 22, 12, 0.9, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.beginPath(); ctx.ellipse(62, 82, 22, 12, -0.4, 0, 6.283); shape(ctx, huid, rand, 2.5);
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; circ(ctx, 34, 50, 16 + 3 * Math.sin(t * 3), rgba(C.goud, 0.5), C.goud, 3); ctx.restore(); }
  ctx.restore(); }
// steroïdhormoon (testosteron/oestrogeen): drie zeshoeken en een vijfhoek
function steroid(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineJoin = 'round';
  const hex = (cx, cy) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3; ctx.lineTo(cx + 14 * Math.cos(an), cy + 14 * Math.sin(an)); } ctx.closePath(); ctx.fillStyle = rgba(col, 0.25); ctx.fill(); ctx.stroke(); };
  hex(-24, 7); hex(0, -7); hex(24, 7); ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + 0.3 + i * 2 * Math.PI / 5; ctx.lineTo(46 + 12 * Math.cos(an), -6 + 12 * Math.sin(an)); } ctx.closePath(); ctx.fillStyle = rgba(col, 0.25); ctx.fill(); ctx.stroke(); ctx.restore(); }
// eiwit als kralenketting die opvouwt (fold 0 = recht, 1 = kluwen)
function keten(ctx, x, y, s, col, fold = 1, a = 1, n = 14, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pts = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), sx = (u - 0.5) * 220 * s, sy = Math.sin(u * 6) * 6 * s; const an = i * 0.9 + t * 0.2, rr = (10 + 12 * Math.sin(i * 1.7)) * s; const fx = Math.cos(an) * rr * 1.6, fy = Math.sin(an * 1.3) * rr; pts.push([x + lerp(sx, fx, fold), y + lerp(sy, fy, fold)]); }
  ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = 3 * s; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); pts.forEach(p => circ(ctx, p[0], p[1], 7 * s, col, lighten(col, 0.35), 1.5)); ctx.restore(); }
function baarmoeder(ctx, x, y, s, a = 1, col = SEXV) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = col; ctx.lineWidth = 9; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 46, -50); ctx.bezierCurveTo(sx * 100, -80, sx * 150, -70, sx * 160, -20); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sx * 140, 22, 24, 15, sx * 0.4, 0, 6.283); shape(ctx, rgba(col, 0.3), col, 3); }
  ctx.beginPath(); ctx.moveTo(-60, -62); ctx.quadraticCurveTo(0, -78, 60, -62); ctx.quadraticCurveTo(58, 10, 18, 50); ctx.lineTo(18, 92); ctx.lineTo(-18, 92); ctx.lineTo(-18, 50); ctx.quadraticCurveTo(-58, 10, -60, -62); ctx.closePath(); shape(ctx, rgba(col, 0.3), col, 3.5);
  ctx.beginPath(); ctx.moveTo(-30, -48); ctx.quadraticCurveTo(0, -40, 30, -48); ctx.quadraticCurveTo(10, 0, 0, 40); ctx.quadraticCurveTo(-10, 0, -30, -48); ctx.fillStyle = rgba(C.bgSchema, 0.6); ctx.fill(); ctx.restore(); }
function zaadleiders(ctx, x, y, s, a = 1, col = SEXM) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  for (const sx of [-1, 1]) { ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(sx * 62, 30); ctx.bezierCurveTo(sx * 120, -30, sx * 100, -110, sx * 20, -100); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sx * 66, 70, 32, 44, 0, 0, 6.283); shape(ctx, rgba(col, 0.3), col, 3); ctx.beginPath(); ctx.ellipse(sx * 86, 48, 10, 30, sx * 0.3, 0, 6.283); shape(ctx, rgba(col, 0.45), col, 2); }
  ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-20, -100); ctx.quadraticCurveTo(0, -94, 20, -100); ctx.moveTo(0, -97); ctx.lineTo(0, -40); ctx.stroke(); ctx.restore(); }
function hoofdProfiel(ctx, x, y, s, a = 1, glow = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 120); ctx.lineTo(-60, 60); ctx.bezierCurveTo(-120, 20, -110, -110, 0, -120); ctx.bezierCurveTo(100, -122, 120, -40, 100, 0); ctx.lineTo(126, 40); ctx.lineTo(100, 50); ctx.lineTo(104, 80); ctx.quadraticCurveTo(70, 100, 40, 90); ctx.lineTo(40, 120); shape(ctx, rgba(C.mens, 0.25), C.mens, 3);
  ctx.beginPath(); ctx.ellipse(-4, -50, 78, 52, 0, 0, 6.283); shape(ctx, rgba(C.kernR, 0.25), C.kernR, 2);
  const g = 0.6 + 0.4 * Math.sin(t * 4) * glow; circ(ctx, 14, -6, 13, rgba(C.goud, 0.4 + 0.5 * glow * g), C.goud, 2); circ(ctx, 18, 22, 9, rgba(C.goud, 0.3 + 0.5 * glow), C.goud, 2); ctx.restore(); }
// trap van lagen (links in H1 en H2)
const LAGEN = [['chromosomen', 'XX of XY'], ['een gen: SRY', 'zaadbal of eierstok'], ['hormonen', 'testosteron, AMH'], ['geslachtsorganen', 'primaire kenmerken'], ['puberteit', 'secundaire kenmerken']];
function trap(ctx, st, a = 1, x = 60, y = 150, w = 440, hh = 118, gap = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  LAGEN.forEach(([n, sub], i) => { const s = st[i] || 0, yy = y + i * (hh + gap), xx = x + i * 14; const col = s === 3 ? C.koraal : s === 2 ? C.goud : s === 1 ? C.groen : C.line; const al = s === 0 ? 0.45 : 1;
    ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, xx, yy, w - i * 14, hh, 14); shape(ctx, rgba(col, s ? 0.14 : 0.05), col, s === 2 || s === 3 ? 3 : 1.5);
    text(ctx, String(i + 1), xx + 34, yy + 74, fTitel(52), col, 'center'); text(ctx, n, xx + 74, yy + 54, fTekst(32, 700), C.text, 'left'); text(ctx, sub, xx + 74, yy + 92, fTekst(24, 500), C.text2, 'left'); ctx.restore(); });
  ctx.restore(); }
// dieren
function kip(ctx, x, y, s, a = 1, col = '#E8E2D4') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(-18, 84); ctx.moveTo(14, 40); ctx.lineTo(18, 84); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-80, -30); ctx.quadraticCurveTo(-100, -70, -70, -60); ctx.quadraticCurveTo(-60, -20, -40, -10); ctx.closePath(); shape(ctx, col, null); ctx.beginPath(); ctx.ellipse(0, 0, 70, 50, 0, 0, 6.283); shape(ctx, col, null);
  circ(ctx, 56, -50, 28, col); ctx.beginPath(); ctx.moveTo(80, -54); ctx.lineTo(102, -46); ctx.lineTo(80, -40); ctx.fillStyle = C.goud; ctx.fill(); circ(ctx, 46, -94, 10, '#D8573F'); circ(ctx, 60, -96, 10, '#D8573F'); circ(ctx, 64, -26, 8, '#D8573F'); circ(ctx, 62, -56, 4, '#121A26');
  ctx.beginPath(); ctx.ellipse(-6, 4, 36, 22, -0.2, 0, 6.283); ctx.strokeStyle = rgba(C.oker, 0.6); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
function schildpad(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const huid = '#8FA86A', schild = '#5F7A44';
  [[-50, 8], [40, 8]].forEach(([lx, ly]) => { ctx.beginPath(); ctx.ellipse(lx, ly + 14, 16, 22, 0, 0, 6.283); shape(ctx, huid, null); }); ctx.beginPath(); ctx.ellipse(96, -6, 28, 20, 0, 0, 6.283); shape(ctx, huid, null); circ(ctx, 108, -12, 4, '#121A26');
  ctx.beginPath(); ctx.moveTo(-90, 12); ctx.quadraticCurveTo(-80, -76, 0, -78); ctx.quadraticCurveTo(80, -76, 90, 12); ctx.closePath(); shape(ctx, schild, lighten(schild, 0.3), 3);
  ctx.strokeStyle = lighten(schild, 0.3); ctx.lineWidth = 2.5; [[-40, -34], [0, -50], [40, -34], [-20, -6], [20, -6]].forEach(([hx, hy]) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.lineTo(hx + 18 * Math.cos(an), hy + 16 * Math.sin(an)); } ctx.closePath(); ctx.stroke(); }); ctx.restore(); }
function krokodil(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#6E8F5A';
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.quadraticCurveTo(-90, -14, -40, -26); ctx.quadraticCurveTo(40, -40, 100, -22); ctx.lineTo(190, -14); ctx.lineTo(196, 0); ctx.lineTo(100, 8); ctx.quadraticCurveTo(30, 26, -40, 18); ctx.quadraticCurveTo(-100, 12, -170, 0); ctx.closePath(); shape(ctx, k, lighten(k, 0.3), 2.5);
  ctx.fillStyle = lighten(k, 0.25); for (let i = 0; i < 9; i++) { const px = -110 + i * 24; ctx.beginPath(); ctx.moveTo(px, -18 + Math.abs(i - 4) * 1.5); ctx.lineTo(px + 8, -32 + Math.abs(i - 4) * 1.5); ctx.lineTo(px + 16, -20 + Math.abs(i - 4) * 1.5); ctx.fill(); }
  circ(ctx, 112, -26, 7, '#E0C860'); circ(ctx, 112, -26, 3, '#121A26'); [[-60, 20], [40, 22]].forEach(([lx, ly]) => { ctx.beginPath(); ctx.ellipse(lx, ly + 6, 12, 16, 0.3, 0, 6.283); shape(ctx, k, null); }); ctx.restore(); }
function ei(ctx, x, y, s, col = '#F2EAD8', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 16 * s, 21 * s, 0, 0, 6.283); shape(ctx, col, '#C9B896', 2); ctx.restore(); }
function thermometer(ctx, x, y, h, frac, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - h, 24, h, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x, y + 10, 22, col, '#9AA3B2', 2); ctx.fillStyle = col; ctx.fillRect(x - 6, y - (h - 14) * frac, 12, (h - 14) * frac + 10); ctx.restore(); }
function clownvis(ctx, x, y, s, a = 1, t = 0, kijk = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const o = '#F08A24', d = '#2A1C16';
  const zw = Math.sin(t * 6) * 0.15; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-96, -26 + zw * 20); ctx.lineTo(-90, 0); ctx.lineTo(-96, 26 + zw * 20); ctx.closePath(); shape(ctx, o, d, 3);
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 38, 0, 0, 6.283); shape(ctx, o, d, 3); ctx.save(); ctx.clip(); ctx.fillStyle = '#F8F4EE'; ctx.strokeStyle = d; ctx.lineWidth = 3; [[34, 12], [-4, 14], [-46, 10]].forEach(([bx, bw]) => { ctx.beginPath(); ctx.ellipse(bx, 0, bw, 44, 0.12, 0, 6.283); ctx.fill(); ctx.stroke(); }); ctx.restore();
  circ(ctx, 48, -10, 7, '#F8F4EE'); circ(ctx, 50, -10, 4, d); ctx.restore(); }
function anemoon(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  for (let i = 0; i < 26; i++) { const u = i / 25, bx = x + (u - 0.5) * 520 * s, len = (180 + 60 * Math.sin(i * 2.3)) * s; ctx.strokeStyle = i % 2 ? '#B87AC8' : '#9C6AB0'; ctx.lineWidth = 16 * s; ctx.beginPath(); ctx.moveTo(bx, y);
    for (let k = 1; k <= 10; k++) { const v = k / 10; ctx.lineTo(bx + Math.sin(t * 1.4 + i + v * 3) * 22 * s * v + (u - 0.5) * 120 * s * v, y - len * v); } ctx.stroke(); circ(ctx, bx + Math.sin(t * 1.4 + i + 3) * 22 * s + (u - 0.5) * 120 * s, y - len, 10 * s, '#E0A8EA'); }
  ctx.beginPath(); ctx.ellipse(x, y + 20 * s, 290 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#7A4A8C', null); ctx.restore(); }
function nier(ctx, x, y, s, a = 1, glow = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -80); ctx.bezierCurveTo(70, -86, 80, 80, 0, 84); ctx.bezierCurveTo(-60, 86, -66, 30, -30, 10); ctx.bezierCurveTo(-10, 0, -10, -10, -30, -20); ctx.bezierCurveTo(-66, -40, -50, -78, 0, -80); shape(ctx, '#A8584A', '#D88E7A', 3);
  const g = glow * (0.7 + 0.3 * Math.sin(t * 5)); ctx.beginPath(); ctx.moveTo(-36, -84); ctx.quadraticCurveTo(0, -150, 46, -82); ctx.quadraticCurveTo(0, -96, -36, -84); shape(ctx, rgba(C.goud, 0.5 + 0.4 * g), C.goud, 3); ctx.restore(); }
function voetje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 44, 80, 0.1, 0, 6.283); shape(ctx, '#E8B79E', '#C98E76', 3);
  [[-30, -86, 11], [-10, -96, 10], [10, -96, 9], [27, -88, 8], [40, -74, 7]].forEach(([tx, ty, r]) => circ(ctx, tx, ty, r, '#E8B79E', '#C98E76', 2));
  ctx.beginPath(); ctx.moveTo(-18, 50); ctx.quadraticCurveTo(-30, 70, -18, 78); ctx.quadraticCurveTo(-6, 70, -18, 50); ctx.fillStyle = '#C8463C'; ctx.fill(); ctx.restore(); }
// stuk celmembraan als boog van een grote cirkel (cel is rond), met een receptoreiwit
function membraanBoog(ctx, cx, cy, r, a0, a1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.er; ctx.lineWidth = 2.5; for (const d of [0, 16]) { ctx.beginPath(); ctx.arc(cx, cy, r + d, a0, a1); ctx.stroke(); } ctx.fillStyle = C.er; const n = Math.round((a1 - a0) * r / 14); for (let i = 0; i <= n; i++) { const an = a0 + (a1 - a0) * i / n; for (const d of [3, 13]) circ(ctx, cx + Math.cos(an) * (r + d), cy + Math.sin(an) * (r + d), 3.2, C.er); }
  ctx.strokeStyle = rgba(C.fill, 0.6); ctx.lineWidth = 60; ctx.beginPath(); ctx.arc(cx, cy, r - 32, a0, a1); ctx.stroke(); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { chrX(ctx, 1300, 640, 1.25, 1, { rot: -0.15 }); chrY(ctx, 1470, 700, 1.25, 1, { rot: 0.12 }); persoon(ctx, 'noor', 1720, 880, 440, { uit: 'denkt', pose: 'denk', kijk: -1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['millimeter', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const sc = q.on('scherm', 1);
      // echoscherm
      roundRect(ctx, 1060, 150, 720, 470, 18); shape(ctx, '#2A3242', '#6A7080', 3); roundRect(ctx, 1090, 180, 660, 410, 10); shape(ctx, '#0A0E14', null);
      if (sc > 0.01) { ctx.save(); ctx.globalAlpha *= sc; ctx.beginPath(); ctx.moveTo(1420, 196); ctx.arc(1420, 196, 380, 0.55, 2.59); ctx.closePath(); ctx.fillStyle = 'rgba(160,170,180,0.10)'; ctx.fill(); ctx.save(); ctx.clip();
        const gr = 'rgba(220,226,232,0.85)', hl = (w) => 0.6 + 0.4 * q.on(w, 1); ctx.globalAlpha *= hl('hoofdje'); circ(ctx, 1330, 380, 70, 'rgba(220,226,232,0.20)', gr, 5); ctx.globalAlpha /= hl('hoofdje');
        ctx.beginPath(); ctx.ellipse(1470, 440, 110, 66, -0.25, 0, 6.283); ctx.strokeStyle = gr; ctx.lineWidth = 5; ctx.stroke(); ctx.lineWidth = 7 * hl('armpjes'); ctx.beginPath(); ctx.moveTo(1400, 430); ctx.quadraticCurveTo(1380, 480, 1340, 470); ctx.stroke();
        const hp = q.on('hartje', 1); circ(ctx, 1440, 430, 10 + 4 * Math.max(0, Math.sin(t * 8)) * hp, rgba(C.koraal, 0.3 + 0.6 * hp)); ctx.restore(); metaText(ctx, '20 weken', 1720, 570, C.text2, 'right', 22); ctx.restore(); }
      persoon(ctx, 'noor', 520, 880, 470, { uit: q.on('arts', 1) > 0.5 ? 'verbaasd' : 'blij', pose: 'staan', kijk: 1, t });
      persoon(ctx, 'kim', 860, 880, 500, { uit: q.on('vraagt', 1) > 0.5 && q.localT < q.at('wordt', 1) + 0.5 ? 'praat' : 'blij', pose: q.on('scherm', 1) > 0.5 && q.localT < q.at('arts', 1) ? 'wijs' : 'staan', kijk: 1, t });
      bubbel(ctx, 720, 300, 'jongen of meisje?', q.on('vraagt', 1) * (1 - q.on('echo', 2)), 30);
      chip(ctx, 'op een echo van 20 weken vaak al te zien', 1420, 690, C.text2, q.on('echo', 2), 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'een paar maanden eerder', 960, 180, 1, C.text2, 30, 'center', 700);
      circ(ctx, 520, 520, 6, '#E8B79E'); regel(ctx, 'een paar millimeter', 520, 600, 1, C.text2, 24, 'center', 600);
      zoomCircle(ctx, 1080, 500, 270, 520, 520, 'embryo · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(800, 220, 560, 560); embryo(ctx, 1080, 520, 1.55, 1, q.on('geslachtsorganen', 1), t); });
      naamBij(ctx, 'aanleg', 'geslachtsorganen', 1400, 640, q.on('geslachtsorganen', 1), 'left', C.goud); vraagteken(ctx, 1560, 470, q.on('denk', 1), 130); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const L = [1, 2, 3, 4, 5].map(i => q.on('Laag', i, 0.5)); const st = L.map((v, i) => v < 0.5 ? 0 : (i + 1 < 5 && L[i + 1] >= 0.5 ? 1 : 2));
    trap(ctx, st, q.on('lagen', 1)); const [P0, P1, P2, P3, P4, P5] = fasen(q, [null, ['Laag', 1], ['ligt', 1], ['Laag', 3], ['Laag', 4], ['Laag', 5]]); const X0 = 560, CX = 1220;
    if (P0 > 0.01) { ctx.save(); ctx.globalAlpha *= P0; tag(ctx, 'tot ± week 6: bij elk embryo hetzelfde', CX, 150, C.groen, q.on('zes', 1), 'center', 30);
      embryo(ctx, 800, 520, 1.3, 1, 1, t); klier(ctx, CX + 40, 500, 1.2, 'm', 0, q.on('aanleg', 1)); naamBij(ctx, 'aanleg', null, CX + 40, 590, q.on('aanleg', 1), 'center', C.oker);
      const tw = q.on('kant', 1); pijl(ctx, CX + 130, 470, CX + 330, 330, SEXM, tw); pijl(ctx, CX + 130, 530, CX + 330, 670, SEXV, tw); klier(ctx, CX + 450, 320, 0.9, 'm', 1, tw * 0.6); klier(ctx, CX + 450, 690, 0.9, 'v', 1, tw * 0.6);
      naamBij(ctx, 'zaadbal', null, CX + 450, 400, tw * 0.8, 'center', SEXM); naamBij(ctx, 'eierstok', null, CX + 450, 770, tw * 0.8, 'center', SEXV); ctx.restore(); }
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; const mo = q.on('moeder', 1), va = q.on('vader', 1), zo = q.on('XX', 1);
      paneel(ctx, X0 + 40, 150, 560, 420, 'van je moeder', mo); circ(ctx, X0 + 320, 380, 120 * mo, rgba(SEXV, 0.18), SEXV, 3); chrX(ctx, X0 + 320, 380, 0.9, mo);
      paneel(ctx, X0 + 660, 150, 640, 420, 'van je vader', va); [[X0 + 820, 'X'], [X0 + 1140, 'Y']].forEach(([zx, l], i) => { const za = va * (i === 0 ? 1 : q.on('hangt', 1)); ctx.save(); ctx.globalAlpha *= za; ctx.beginPath(); ctx.ellipse(zx, 330, 50, 64, 0, 0, 6.283); shape(ctx, rgba(SEXM, 0.18), SEXM, 3); ctx.strokeStyle = SEXM; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(zx, 394); for (let k = 0; k <= 20; k++) ctx.lineTo(zx + Math.sin(k * 0.8 + t * 6) * 10, 394 + k * 7); ctx.stroke(); ctx.restore(); if (l === 'X') chrX(ctx, zx, 330, 0.48, za); else chrY(ctx, zx, 330, 0.8, za); });
      regel(ctx, 'of', X0 + 980, 345, va * q.on('hangt', 1), C.text2, 34, 'center', 700);
      if (zo > 0.01) { ctx.save(); ctx.globalAlpha *= zo; [[X0 + 380, 'XX', SEXV], [X0 + 960, 'XY', SEXM]].forEach(([bx, l, col]) => { roundRect(ctx, bx - 170, 620, 340, 220, 16); shape(ctx, rgba(col, 0.12), col, 2.5); chrX(ctx, bx - 50, 715, 0.62, 1); if (l === 'XX') chrX(ctx, bx + 50, 715, 0.62, 1); else chrY(ctx, bx + 50, 735, 0.9, 1); text(ctx, l, bx, 825, fTekst(32, 800), col, 'center'); }); ctx.restore(); } ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; const sr = q.on('SRY', 1), aan = q.on('zeven', 1), zb = q.on('zaadbal', 1), gn = q.on('geen', 1), es = q.on('eierstok', 1);
      paneel(ctx, X0 + 40, 150, 1240, 330, '', 1); chrY(ctx, X0 + 220, 320, 2.3, 1, { bandA: sr }); naamBij(ctx, 'SRY-gen', null, X0 + 300, 236, sr, 'left', C.goud); naamBij(ctx, 'Y-chromosoom', null, X0 + 300, 420, 1, 'left', SEXM);
      tag(ctx, 'rond week 7: aan', X0 + 640, 260, C.goud, aan, 'center', 28); pijl(ctx, X0 + 560, 330, X0 + 840, 330, C.goud, aan, 5); klier(ctx, X0 + 1020, 320, 1.3, 'm', zb, 1, t); naamBij(ctx, zb > 0.5 ? 'zaadbal' : 'aanleg', null, X0 + 1020, 420, 1, 'center', zb > 0.5 ? SEXM : C.oker);
      paneel(ctx, X0 + 40, 510, 1240, 330, '', gn); chrX(ctx, X0 + 170, 675, 1.05, gn); chrX(ctx, X0 + 290, 675, 1.05, gn); regel(ctx, 'geen SRY', X0 + 230, 810, gn, C.text2, 26, 'center', 700);
      tag(ctx, 'andere genen gaan aan', X0 + 640, 620, C.text2, q.on('andere', 1), 'center', 26); pijl(ctx, X0 + 560, 680, X0 + 840, 680, SEXV, q.on('andere', 1), 5); klier(ctx, X0 + 1020, 680, 1.3, 'v', es, gn, t); naamBij(ctx, es > 0.5 ? 'eierstok' : 'aanleg', null, X0 + 1020, 780, gn, 'center', es > 0.5 ? SEXV : C.oker); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; const te = q.on('testosteron', 1), am = q.on('hormoon', 1), vd = q.on('verdwijnt', 1), zd = q.on('Zonder', 1);
      paneel(ctx, X0 + 40, 150, 610, 690, 'met zaadballen', 1, SEXM); paneel(ctx, X0 + 680, 150, 610, 690, 'zonder zaadballen', zd, SEXV);
      klier(ctx, X0 + 345, 270, 0.9, 'm', 1, 1, t); for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i / 4) % 1); steroid(ctx, X0 + 200 + u * 40, 360 + u * 120 + i * 6, 0.8, SEXM, te * (1 - u * 0.6)); }
      naamBij(ctx, 'testosteron', null, X0 + 200, 520, te, 'center', SEXM); keten(ctx, X0 + 490, 420, 0.5, C.paars, 1, am, 12, t); naamBij(ctx, 'anti-Müllerhormoon', null, X0 + 480, 520, am, 'center', C.paars);
      baarmoeder(ctx, X0 + 345, 680, 0.85, am * (1 - 0.75 * vd), C.text2); kruis(ctx, X0 + 345, 680, 70, vd); regel(ctx, 'aanleg baarmoeder verdwijnt', X0 + 345, 810, vd, C.text2, 24, 'center', 700);
      baarmoeder(ctx, X0 + 985, 470, 1.15, zd * q.on('baarmoeder', 2)); naamBij(ctx, 'baarmoeder', null, X0 + 985, 610, zd * q.on('baarmoeder', 2), 'center', SEXV); naamBij(ctx, 'eileiders', null, X0 + 985, 360, zd * q.on('eileiders', 2), 'center', SEXV);
      tag(ctx, 'meer in de film Van bevruchting tot baby', X0 + 985, 760, C.goud, q.on('film', 1), 'center', 24); ctx.restore(); }
    if (P4 > 0.01) { ctx.save(); ctx.globalAlpha *= P4; const vb = q.on('buiten', 1), da = q.on('dezelfde', 1);
      tag(ctx, 'primaire geslachtskenmerken', CX + 80, 150, C.goud, q.on('primaire', 1), 'center', 30);
      paneel(ctx, CX - 200, 200, 560, 230, 'dezelfde aanleg', 1); circ(ctx, CX + 80, 320, 30, rgba(C.goud, 0.4), C.goud, 3); ctx.strokeStyle = C.paars; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(CX + 80 + sx * 80, 345, 44, sx < 0 ? 1.1 : -1.1 + Math.PI * 0, sx < 0 ? 2.6 : 0.5); ctx.stroke(); }
      naamBij(ctx, 'knobbeltje', null, CX + 80, 284, 1, 'center', C.goud); naamBij(ctx, 'plooien', null, CX + 80, 412, 1, 'center', C.paars);
      pijl(ctx, CX - 20, 440, CX - 250, 560, C.line, vb); pijl(ctx, CX + 180, 440, CX + 410, 560, C.line, vb);
      [[CX - 330, SEXM, 'penis', 'balzak'], [CX + 490, SEXV, 'clitoris', 'schaamlippen']].forEach(([bx, col, a1, a2], i) => { const al = vb * q.on(i ? 'clitoris' : 'penis', 1); if (al < 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, bx - 200, 580, 400, 230, 16); shape(ctx, rgba(col, 0.1), col, 2); circ(ctx, bx - 140, 650, 14, C.goud); text(ctx, a1, bx - 110, 662, fTekst(36, 700), C.text, 'left'); ctx.strokeStyle = C.paars; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(bx - 140, 752, 16, 0.3, 2.8); ctx.stroke(); text(ctx, a2, bx - 110, 764, fTekst(36, 700), C.text, 'left'); ctx.restore(); });
      tag(ctx, 'zelfde kleur = zelfde aanleg', CX + 80, 870, C.goud, da, 'center', 26); ctx.restore(); }
    if (P5 > 0.01) { ctx.save(); ctx.globalAlpha *= P5; tag(ctx, 'jaren later', CX + 80, 150, C.text2, 1, 'center', 28);
      hoofdProfiel(ctx, X0 + 210, 360, 1.1, 1, q.on('startsein', 1), t); naamBij(ctx, 'hypothalamus', null, X0 + 240, 240, q.on('hypothalamus', 1), 'left', C.goud); naamBij(ctx, 'hypofyse', null, X0 + 250, 412, q.on('hypofyse', 1), 'left', C.goud);
      const gs = q.on('meer', 1); pijl(ctx, X0 + 380, 340, X0 + 560, 260, C.goud, gs); pijl(ctx, X0 + 380, 380, X0 + 560, 520, C.goud, gs);
      klier(ctx, X0 + 640, 250, 0.7, 'm', 1, gs, t); steroid(ctx, X0 + 760, 250, 0.8, SEXM, gs); naamBij(ctx, 'testosteron', null, X0 + 640, 330, gs, 'center', SEXM);
      klier(ctx, X0 + 640, 520, 0.7, 'v', 1, q.on('oestrogeen', 1), t); steroid(ctx, X0 + 760, 520, 0.8, SEXV, q.on('oestrogeen', 1)); naamBij(ctx, 'oestrogeen', null, X0 + 640, 600, q.on('oestrogeen', 1), 'center', SEXV);
      const se = q.on('secundaire', 1); persoon(ctx, 'sam', 1500, 880, 400, { a: se, uit: 'blij', kijk: -1, t }); persoon(ctx, 'noor', 1760, 880, 380, { a: se, uit: 'blij', kijk: -1, t });
      tag(ctx, 'secundaire geslachtskenmerken', 1620, 180, C.goud, se, 'center', 26); chip(ctx, 'borsten, bredere heupen', 1620, 300, SEXV, q.on('borsten', 1), 24); chip(ctx, 'lage stem, baardgroei', 1620, 380, SEXM, q.on('stem', 1), 24); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['vorming', 1], ['kind', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'één gen als schakelaar', 140, 150, 1, C.text, 34, 'left', 700);
      chrY(ctx, 260, 470, 2.4, 1); naamBij(ctx, 'SRY-gen', null, 340, 384, 1, 'left', C.goud); const ew = q.on('eiwit', 1); pijl(ctx, 420, 400, 560, 400, C.goud, ew, 5);
      keten(ctx, 680, 400, 0.6, C.goud, ew, ew, 14, t); naamBij(ctx, 'SRY-eiwit', null, 680, 480, ew, 'center', C.goud);
      const sx = q.on('SOX9', 1); pijl(ctx, 780, 400, 900, 400, C.goud, sx, 5); roundRect(ctx, 920, 360, 200, 80, 12); shape(ctx, rgba(C.goud, 0.2 * sx), sx > 0.01 ? C.goud : C.line, 2); text(ctx, 'SOX9', 1020, 412, fTekst(34, 800), C.text, 'center');
      const we = q.on('weer', 1); for (let i = 0; i < 6; i++) { const yy = 230 + i * 70, al = we * clamp((q.localT - q.at('weer', 1) - i * 0.25) * 3, 0, 1); pijl(ctx, 1130, 400, 1250, yy + 20, C.goud, al, 3, 12); roundRect(ctx, 1260, yy, 130, 44, 10); shape(ctx, rgba(C.goud, 0.15 * al), al > 0.01 ? C.goud : rgba(C.line, 0.3), 1.5); text(ctx, 'gen', 1325, yy + 31, fTekst(24, 700), al > 0.5 ? C.text : C.text2, 'center'); }
      const ca = q.on('cascade', 1); pijl(ctx, 1410, 400, 1530, 400, SEXM, ca, 5); klier(ctx, 1650, 400, 1.1, 'm', ca, ca > 0.01 ? 1 : 0, t); naamBij(ctx, 'zaadbal', null, 1650, 490, ca, 'center', SEXM);
      tag(ctx, 'cascade: één schakelaar zet een hele ontwikkeling in gang', 960, 700, C.goud, ca, 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'bij de vorming van zaadcellen (meiose in de vader)', 140, 150, 1, C.text, 32, 'left', 700);
      const sw = q.on('mee', 1, 1.2); chrX(ctx, 760, 480, 2.0, 1, { band: 0.08, bandA: sw }); chrY(ctx, 1160, 430, 2.2, 1, { bandA: 1 - sw }); naamBij(ctx, 'X', null, 760, 740, 1, 'center', C.paars); naamBij(ctx, 'Y', null, 1160, 580, 1, 'center', SEXM);
      const st = q.on('stukje', 1); ctx.save(); ctx.globalAlpha *= st; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(960, 300, 230, 40, 0, 0, 6.283); ctx.stroke(); ctx.restore(); regel(ctx, 'stukje uitwisselen', 960, 230, st, C.text2, 26, 'center', 700);
      if (sw > 0.01 && sw < 0.99) { const px = lerp(1160, 760, sw), py = lerp(430 - 105 * 0.37 * 2.2 / 1.0 + 6, 480 - 210 * 2 * 0.42, sw); circ(ctx, px, py - 30, 16, C.goud); }
      tag(ctx, 'heel soms: SRY-gen naar het X-chromosoom', 960, 840, C.goud, sw, 'center', 28); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; const an = q.on('Andersom', 1);
      paneel(ctx, 120, 150, 820, 690, 'XX met SRY op een X', 1, SEXM); chrX(ctx, 300, 400, 1.3, 1, { band: 0.08 }); chrX(ctx, 440, 400, 1.3, 1); pijl(ctx, 540, 400, 640, 400, SEXM, q.on('zaadballen', 1), 5); klier(ctx, 760, 400, 1.0, 'm', 1, q.on('zaadballen', 1), t);
      tag(ctx, 'man · ± 1 op 20 000 mannen', 530, 640, SEXM, q.on('twintigduizend', 1), 'center', 28); tag(ctx, 'onvruchtbaar: andere Y-genen ontbreken', 530, 740, C.koraal, q.on('onvruchtbaar', 1), 'center', 24);
      paneel(ctx, 980, 150, 820, 690, 'XY, SRY werkt niet', an, SEXV); chrX(ctx, 1150, 400, 1.3, an); chrY(ctx, 1290, 440, 2.0, an, { kruisBand: q.on('werkt', 1) }); pijl(ctx, 1390, 400, 1490, 400, SEXV, q.on('baarmoeder', 1) * an, 5);
      regel(ctx, 'geen zaadballen', 1390, 640, q.on('geen', 1) * an, C.text2, 28, 'center', 700); baarmoeder(ctx, 1640, 420, 0.75, q.on('baarmoeder', 1) * an); naamBij(ctx, 'baarmoeder', null, 1640, 530, q.on('baarmoeder', 1) * an, 'center', SEXV); ctx.restore(); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const an = q.on('anders', 1); const flick = an > 0.5 ? Math.floor(t * 1.5) % 5 : -1; trap(ctx, [0, 1, 2, 3, 4].map(i => i === flick ? 3 : 1), 1);
    tag(ctx, 'meestal passen alle lagen bij elkaar', 1220, 160, C.groen, q.on('passen', 1), 'center', 30); tag(ctx, 'maar elke laag kan anders lopen', 1220, 250, C.koraal, an, 'center', 30);
    const dr = q.on('drie', 1); chrX(ctx, 980, 560, 1.4, dr); chrX(ctx, 1160, 560, 1.4, dr * q.on('X', 2)); chrY(ctx, 1340, 600, 2.0, dr * q.on('Y', 1)); naamBij(ctx, 'X', null, 980, 780, dr, 'center', C.paars); naamBij(ctx, 'X', null, 1160, 780, dr * q.on('X', 2), 'center', C.paars); naamBij(ctx, 'Y', null, 1340, 780, dr * q.on('Y', 1), 'center', SEXM);
    vraagteken(ctx, 1600, 620, q.on('denk', 1), 140); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const [P1, P2, P3, P4, P5] = fasen(q, [null, ['Turner', 1], ['hormoonlaag', 1], ['adrenogenitaal', 1], ['standaardplaatje', 1]]);
    const lay = P5 > 0.5 ? [3, 3, 3, 3, 3] : (P3 + P4 > 0.5 ? [1, 1, 3, 1, 1] : [3, 1, 1, 1, 1]); trap(ctx, lay, 1 - P5 * 0.0); const X0 = 560;
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; regel(ctx, 'syndroom van Klinefelter', X0 + 60, 170, q.on('Klinefelter', 1), C.text, 34, 'left', 700);
      chrX(ctx, X0 + 160, 400, 1.15); chrX(ctx, X0 + 290, 400, 1.15); chrY(ctx, X0 + 420, 430, 1.7, 1); naamBij(ctx, 'XXY', null, X0 + 290, 580, 1, 'center', C.text); pijl(ctx, X0 + 500, 420, X0 + 640, 420, SEXM, 1, 5); klier(ctx, X0 + 760, 420, 1.0, 'm', 1, 1, t); naamBij(ctx, 'zaadballen', null, X0 + 760, 510, 1, 'center', SEXM);
      tag(ctx, '± 1 op 700 jongens', X0 + 1080, 330, C.goud, q.on('zevenhonderd', 1), 'center', 30); tag(ctx, 'vaak lang niets van gemerkt', X0 + 1080, 450, C.text2, q.on('lang', 1), 'center', 24); tag(ctx, 'vaak onvruchtbaar', X0 + 1080, 540, C.koraal, q.on('onvruchtbaar', 1), 'center', 26); ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; regel(ctx, 'syndroom van Turner', X0 + 60, 170, 1, C.text, 34, 'left', 700);
      chrX(ctx, X0 + 260, 420, 1.3); ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; roundRect(ctx, X0 + 340, 300, 90, 240, 20); ctx.stroke(); ctx.restore(); naamBij(ctx, 'één X', null, X0 + 300, 600, 1, 'center', C.paars);
      klier(ctx, X0 + 720, 420, 1.0, 'v', 1, 1 - 0.55 * q.on('eierstokken', 1), t); naamBij(ctx, 'eierstokken werken vaak niet goed', null, X0 + 720, 520, q.on('eierstokken', 1), 'center', SEXV);
      tag(ctx, '± 1 op 2500 meisjes', X0 + 1080, 330, C.goud, q.on('tweeduizendvijfhonderd', 1), 'center', 30); tag(ctx, 'vaak kleiner dan gemiddeld', X0 + 1080, 450, C.text2, q.on('kleiner', 1), 'center', 24); tag(ctx, 'hormonen → puberteit', X0 + 1080, 540, C.groen, q.on('hormonen', 1), 'center', 26); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; regel(ctx, 'androgeen-ongevoeligheid', X0 + 60, 170, q.on('androgeen', 1), C.text, 34, 'left', 700);
      membraanBoog(ctx, X0 + 520, 1500, 1000, -1.95, -1.19, 1); const ry = 1500 - 1000; // receptor in het membraan (bovenkant van de cel)
      keten(ctx, X0 + 520, ry + 6, 0.36, C.teal, 1, 1, 12, 0); naamBij(ctx, 'receptor', null, X0 + 520, ry + 96, q.on('receptor', 1), 'center', C.teal); kruis(ctx, X0 + 520, ry - 4, 34, q.on('werkt', 1));
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.5 + i / 3) % 1), yy = ph < 0.5 ? lerp(240, ry - 40, ph * 2) : lerp(ry - 40, 260, (ph - 0.5) * 2), xx = X0 + 380 + i * 140 + (ph > 0.5 ? (ph - 0.5) * 120 : 0); steroid(ctx, xx, yy, 0.8, SEXM, q.on('XY', 1)); }
      naamBij(ctx, 'testosteron', null, X0 + 820, 300, q.on('testosteron', 1), 'left', SEXM); regel(ctx, 'XY, zaadballen', X0 + 60, 240, q.on('XY', 1), C.text2, 26, 'left', 700);
      tag(ctx, 'uitwendig: als een meisje', X0 + 1080, 640, SEXV, q.on('Uitwendig', 1), 'center', 26); tag(ctx, 'vaak ontdekt in de puberteit', X0 + 1080, 730, C.text2, q.on('ontdekt', 1), 'center', 24); tag(ctx, 'zeldzaam: ≤ 1 op 20 000', X0 + 1080, 820, C.goud, q.on('zeldzaam', 1), 'center', 26); ctx.restore(); }
    if (P4 > 0.01) { ctx.save(); ctx.globalAlpha *= P4; regel(ctx, 'adrenogenitaal syndroom (AGS)', X0 + 60, 170, 1, C.text, 34, 'left', 700);
      nier(ctx, X0 + 260, 500, 1.3, 1, q.on('bijnieren', 1), t); naamBij(ctx, 'bijnier', null, X0 + 340, 330, q.on('bijnieren', 1), 'left', C.goud); naamBij(ctx, 'nier', null, X0 + 260, 660, 1, 'center', '#D88E7A');
      for (let i = 0; i < 5; i++) { const u = (t * 0.3 + i / 5) % 1; steroid(ctx, X0 + 380 + u * 360, 360 + Math.sin(u * 6 + i) * 30, 0.7, SEXM, q.on('mannelijke', 1) * (1 - u)); }
      tag(ctx, 'XX, eierstokken: uitwendig meer als een jongen', X0 + 880, 560, C.text2, q.on('geboren', 1), 'center', 24);
      voetje(ctx, X0 + 1150, 400, 1.0, q.on('hielprik', 1)); naamBij(ctx, 'hielprik', null, X0 + 1150, 520, q.on('hielprik', 1), 'center', C.koraal); tag(ctx, 'in NL ± 10–15 baby\'s per jaar', X0 + 880, 700, C.goud, q.on('Nederland', 1), 'center', 28); ctx.restore(); }
    if (P5 > 0.01) { ctx.save(); ctx.globalAlpha *= P5; tag(ctx, 'intersekse', X0 + 680, 200, C.goud, 1, 'center', 44); regel(ctx, 'het lichaam past niet in het standaardplaatje van man of vrouw', X0 + 680, 300, 1, C.text, 28, 'center', 600);
      chip(ctx, 'artsen: DSD', X0 + 680, 390, C.text2, q.on('DSD', 1), 26); tag(ctx, 'hoe vaak? hangt af van wat je meetelt', X0 + 680, 500, C.text2, q.on('meetelt', 1), 'center', 26);
      const vd = q.on('vijfduizend', 1); regel(ctx, 'bij ± 1 op 5000 baby\'s niet meteen duidelijk', X0 + 680, 600, vd, C.goud, 30, 'center', 700); for (let i = 0; i < 50; i++) circ(ctx, X0 + 380 + (i % 25) * 25, 650 + Math.floor(i / 25) * 28, 8, i === 37 ? C.goud : '#3A4458');
      tag(ctx, 'niet iedereen noemt zichzelf intersekse', X0 + 680, 820, C.groen, q.on('noemt', 1), 'center', 26); ctx.restore(); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Clownvissen', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; tag(ctx, 'bij andere dieren: anders geregeld', 960, 150, C.goud, 1, 'center', 30);
      const vo = q.on('vogels', 1); paneel(ctx, 80, 210, 560, 640, 'vogels', vo); kip(ctx, 360, 420, 1.2, vo);
      [[220, 'vrouwtje', 'Z', 'W', q.on('verschillende', 1)], [500, 'mannetje', 'Z', 'Z', q.on('mannetje', 1)]].forEach(([bx, l, a1, a2, al]) => { const aa = vo * al; chromosoom(ctx, bx - 30, 660, 120, C.paars, aa, { cen: 0.4 }); chromosoom(ctx, bx + 30, a2 === 'W' ? 680 : 660, a2 === 'W' ? 80 : 120, a2 === 'W' ? C.koraal : C.paars, aa, { cen: 0.35 }); regel(ctx, a1 + a2, bx, 780, aa, C.text, 32, 'center', 800); regel(ctx, l, bx, 820, aa, C.text2, 24, 'center', 700); });
      const sp = q.on('schildpadden', 1); paneel(ctx, 680, 210, 560, 640, 'veel schildpadden', sp); schildpad(ctx, 960, 360, 1.2, sp); thermometer(ctx, 760, 760, 260, lerp(0.4, 0.85, q.on('warm', 1)) - 0.45 * q.on('koeler', 1), q.on('koeler', 1) > 0.5 ? C.teal : C.koraal, sp);
      for (let i = 0; i < 5; i++) ei(ctx, 880 + i * 60, 600 + (i % 2) * 18, 1.1, '#F2EAD8', sp); regel(ctx, 'warm → vooral vrouwtjes', 1000, 720, q.on('warm', 1), C.koraal, 26, 'center', 700); regel(ctx, 'koeler → vooral mannetjes', 1000, 780, q.on('koeler', 1), C.teal, 26, 'center', 700);
      const kr = q.on('krokodillen', 1); paneel(ctx, 1280, 210, 560, 640, 'krokodillen', kr); krokodil(ctx, 1560, 450, 1.15, kr); thermometer(ctx, 1560, 760, 200, 0.6, C.goud, kr); regel(ctx, 'ook temperatuur', 1560, 830, kr, C.text2, 24, 'center', 700); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; anemoon(ctx, 960, 860, 1.2, 1, t);
      const v = q.on('grootste', 1), m = q.on('tweede', 1), r = q.on('rest', 1); clownvis(ctx, 760 + Math.sin(t * 0.7) * 30, 330, 1.5, 1, t); naamBij(ctx, 'vrouwtje (grootste)', null, 760, 430, v, 'center', SEXV);
      clownvis(ctx, 1200 + Math.sin(t * 0.9 + 1) * 24, 400, 1.1, 1, t, -1); naamBij(ctx, 'mannetje', null, 1200, 480, m, 'center', SEXM);
      clownvis(ctx, 1500, 260, 0.6, r, t, -1); clownvis(ctx, 1600, 360, 0.5, r, t + 1, -1); naamBij(ctx, 'kleinere', null, 1560, 200, r, 'center', C.text2);
      vraagteken(ctx, 960, 220, q.on('denk', 1), 120); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const kaart = q.on('mensen', 1, 0.8), A = 1 - kaart;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; anemoon(ctx, 960, 860, 1.2, 1, t); const ver = q.on('verandert', 1, 1.5), nw = q.on('nieuwe', 1, 1.2);
      clownvis(ctx, 760, 300, 1.5, 1 - q.on('Antwoord', 1, 1.0) * 0.85, t); kruis(ctx, 760, 300, 40, q.on('Antwoord', 1) * 0.6, C.text2);
      clownvis(ctx, lerp(1200, 1000, ver), lerp(400, 360, ver), lerp(1.1, 1.45, ver), 1, t, -1); naamBij(ctx, ver > 0.5 ? 'nu het vrouwtje' : 'mannetje', null, lerp(1200, 1000, ver), lerp(480, 470, ver), 1, 'center', ver > 0.5 ? SEXV : SEXM);
      const gk = q.on('geslachtsklier', 1); if (gk > 0.01) { ctx.save(); ctx.globalAlpha *= gk * (1 - nw * 0.0); paneel(ctx, 80, 200, 400, 280, 'geslachtsklier', 1); klier(ctx, 280, 340, 1.0, q.on('eicellen', 1) > 0.5 ? 'v' : 'm', 1, 1, t); regel(ctx, q.on('eicellen', 1) > 0.5 ? 'nu eicellen' : 'zaadcellen', 280, 450, 1, q.on('eicellen', 1) > 0.5 ? SEXV : SEXM, 26, 'center', 700); ctx.restore(); }
      clownvis(ctx, lerp(1500, 1300, nw), lerp(260, 420, nw), lerp(0.6, 1.05, nw), 1, t, -1); naamBij(ctx, 'nieuw mannetje', null, 1300, 500, nw, 'center', SEXM); clownvis(ctx, 1640, 300, 0.5, 1, t + 1, -1);
      tag(ctx, 'sekse is in de natuur op veel manieren geregeld', 1180, 150, C.goud, q.on('natuur', 1), 'center', 30); ctx.restore(); }
    if (kaart > 0.01) { ctx.save(); ctx.globalAlpha *= kaart; const pD = q.on('biologie', 1, 0.8), pC = q.on('meeste', 1, 0.8);
      const KA = [['sekse', 'je lichaam: chromosomen, klieren, hormonen, organen', C.teal, q.on('biologische', 1)], ['genderidentiteit', 'hoe je jezelf ervaart', C.goud, q.on('Genderidentiteit', 1)], ['genderexpressie', 'hoe je dat laat zien', C.groen, q.on('Genderexpressie', 1)], ['seksuele oriëntatie', 'op wie je verliefd wordt', C.koraal, q.on('oriëntatie', 1)]];
      const kw = 410, gp = 30, x0 = (W - 4 * kw - 3 * gp) / 2, ky = 120, kh = 280;
      KA.forEach(([ti, sub, col, al], i) => { if (al <= 0.01) return; const x = x0 + i * (kw + gp); ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x, ky, kw, kh, 16); shape(ctx, rgba(col, 0.12), col, 2.5);
        const ix = x + kw / 2, iy = ky + 80; if (i === 0) { chrX(ctx, ix - 30, iy, 0.5, 1); chrY(ctx, ix + 30, iy + 12, 0.7, 1); } else if (i === 1) { circ(ctx, ix, iy - 4, 30, rgba(col, 0.3), col, 3); circ(ctx, ix + 40, iy - 40, 8, col); circ(ctx, ix + 56, iy - 56, 5, col); } else if (i === 2) { ctx.beginPath(); ctx.moveTo(ix - 46, iy - 30); ctx.lineTo(ix - 18, iy - 42); ctx.lineTo(ix + 18, iy - 42); ctx.lineTo(ix + 46, iy - 30); ctx.lineTo(ix + 36, iy - 8); ctx.lineTo(ix + 26, iy - 12); ctx.lineTo(ix + 26, iy + 38); ctx.lineTo(ix - 26, iy + 38); ctx.lineTo(ix - 26, iy - 12); ctx.lineTo(ix - 36, iy - 8); ctx.closePath(); shape(ctx, rgba(col, 0.3), col, 3); } else { ctx.beginPath(); ctx.moveTo(ix, iy + 34); ctx.bezierCurveTo(ix - 60, iy - 6, ix - 30, iy - 50, ix, iy - 18); ctx.bezierCurveTo(ix + 30, iy - 50, ix + 60, iy - 6, ix, iy + 34); shape(ctx, rgba(col, 0.3), col, 3); }
        text(ctx, ti, ix, ky + 170, fTekst(34, 800), C.text, 'center'); ctx.font = fTekst(24, 500); ctx.fillStyle = C.text2; ctx.textAlign = 'center'; const words = sub.split(' '); let l1 = '', l2 = ''; for (const w of words) { if (!l2 && ctx.measureText(l1 + ' ' + w).width < kw - 40) l1 = l1 ? l1 + ' ' + w : w; else l2 = l2 ? l2 + ' ' + w : w; } ctx.fillText(l1, ix, ky + 214); if (l2) ctx.fillText(l2, ix, ky + 246); ctx.restore(); });
      const bx = (i) => x0 + i * (kw + gp) + kw / 2;
      if (pC * (1 - pD) > 0.01) { ctx.save(); ctx.globalAlpha *= pC * (1 - pD); const so = q.on('sommigen', 1); pijl(ctx, bx(0) + 120, 460, bx(1) - 120, 460, C.groen, 1, 4); pijl(ctx, bx(1) - 120, 460, bx(0) + 120, 460, C.groen, 1, 4); regel(ctx, so > 0.5 ? 'past bij de meeste mensen, bij sommigen niet' : 'past bij de meeste mensen', (bx(0) + bx(1)) / 2, 520, 1, so > 0.5 ? C.goud : C.groen, 24, 'center', 700);
        tag(ctx, 'transgender: genderidentiteit past niet bij de sekse bij de geboorte', 960, 640, C.goud, q.on('transgender', 1), 'center', 26); tag(ctx, 'non-binair: niet alleen man of alleen vrouw', 960, 730, C.goud, q.on('non-binair', 1), 'center', 26); tag(ctx, 'intersekse: gaat over het lichaam (sekse)', 960, 820, C.teal, q.on('lichaam', 1), 'center', 26); ctx.restore(); }
      if (pD > 0.01) { ctx.save(); ctx.globalAlpha *= pD; paneel(ctx, 160, 450, 760, 360, '', 1, C.groen); regel(ctx, 'biologie beschrijft', 540, 520, 1, C.groen, 32, 'center', 700); tekstBlok(ctx, 'hoe het lichaam zich ontwikkelt, laag voor laag', 220, 590, 640, 30, C.text, q.on('beschrijft', 1)); vink_(ctx, 840, 500, 26, q.on('beschrijft', 1));
        paneel(ctx, 1000, 450, 760, 360, '', q.on('wetenschap', 1), C.goud); regel(ctx, 'nog niet goed bekend', 1380, 520, q.on('wetenschap', 1), C.goud, 32, 'center', 700); tekstBlok(ctx, 'waar genderidentiteit vandaan komt: waarschijnlijk meerdere dingen, ook biologische', 1060, 590, 640, 30, C.text, q.on('meerdere', 1)); vraagteken(ctx, 1700, 530, q.on('wetenschap', 1), 60);
        tag(ctx, 'seksuele oriëntatie ≠ genderidentiteit', bx(3) - 60, 870, C.koraal, q.on('oriëntatie', 2), 'center', 26); ctx.restore(); }
      ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 540, gap = 40, x0 = (W - 3 * pw - 2 * gap) / 2, y0 = 170, ph = 600;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 54, 1, C.text, 30, 'center', 700); draw(x); ctx.restore(); };
    panel(0, 'sekse in lagen', q.on('lagen', 1), (x) => { LAGEN.forEach(([n], i) => { const al = q.on(['chromosomen', 'SRY', 'zaadballen', 'hormonen', 'puberteit'][i], 1); roundRect(ctx, x + 40 + i * 12, y0 + 90 + i * 80, pw - 80 - i * 24, 64, 10); shape(ctx, rgba(C.groen, 0.1 + 0.1 * al), al > 0.5 ? C.groen : C.line, 1.5); text(ctx, (i + 1) + '  ' + n, x + 70 + i * 12, y0 + 132 + i * 80, fTekst(28, 700), C.text, 'left'); }); regel(ctx, 'soms passen ze niet: intersekse', x + pw / 2, y0 + 560, q.on('intersekse', 1), C.goud, 24, 'center', 700); });
    panel(1, 'andere dieren', q.on('dieren', 1), (x) => { kip(ctx, x + 150, y0 + 220, 0.75, 1); text(ctx, 'ZW / ZZ', x + 380, y0 + 230, fTekst(30, 800), C.text, 'center'); schildpad(ctx, x + 160, y0 + 380, 0.75, 1); thermometer(ctx, x + 380, y0 + 420, 120, 0.7, C.koraal, 1); clownvis(ctx, x + 270, y0 + 520, 0.8, 1, t); });
    panel(2, 'vier begrippen', q.on('genderidentiteit', 1), (x) => { [['sekse', C.teal, 'biologisch'], ['genderidentiteit', C.goud, 'genderidentiteit'], ['genderexpressie', C.groen, 'genderexpressie'], ['seksuele oriëntatie', C.koraal, 'oriëntatie']].forEach(([n, col, w], i) => { const al = i === 0 ? 1 : q.on(w, 1); ctx.save(); ctx.globalAlpha *= Math.max(al, 0.25); roundRect(ctx, x + 50, y0 + 100 + i * 110, pw - 100, 84, 12); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, n, x + pw / 2, y0 + 155 + i * 110, fTekst(30, 700), C.text, 'center'); ctx.restore(); }); });
  },
};

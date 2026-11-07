// Wat word jij? · Diergeneeskunde 4 · Welzijn meten — eigen tekeningen (21 okt 2026). Gebruikt de gedeelde dieren uit teken_dg0.js.

// varkenshok: betonvloer met spijlen achter; stro = 0..1 (verrijking)
function varkensHok(ctx, x, y, w, h, a = 1, o = {}) { const { stroA = 0, touw = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x, y - h, w, h); ctx.fillStyle = '#5A6070'; ctx.fillRect(x, y - 8, w, 30); ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 2; for (let i = 0; i < w / 40; i++) { ctx.beginPath(); ctx.moveTo(x + i * 40, y - 6); ctx.lineTo(x + i * 40, y + 20); ctx.stroke(); }
  ctx.strokeStyle = '#8A96A8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - h * 0.62); ctx.lineTo(x + w, y - h * 0.62); ctx.moveTo(x, y - h * 0.3); ctx.lineTo(x + w, y - h * 0.3); ctx.stroke(); for (let i = 0; i <= w / 90; i++) { ctx.beginPath(); ctx.moveTo(x + i * 90, y - h * 0.68); ctx.lineTo(x + i * 90, y); ctx.stroke(); }
  if (stroA > 0.01) stro(ctx, x, y - 10, w, stroA);
  if (touw > 0.01) { ctx.save(); ctx.globalAlpha *= touw; ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 7; for (let k = 0; k < 2; k++) { const tx = x + w * (0.3 + k * 0.4); ctx.beginPath(); ctx.moveTo(tx, y - h * 0.62); ctx.quadraticCurveTo(tx + 10, y - h * 0.4, tx - 4, y - h * 0.2); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
// vijf vakjes (vijf vrijheden); aan = 0..5 hoeveel zichtbaar
function vijfVakjes(ctx, x, y, w, labels, aan, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w / 5;
  labels.forEach((l, i) => { const f = clamp(aan - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x + i * bw + 8, y, bw - 16, 150, 14); shape(ctx, rgba(col, 0.14), col, 2); ctx.font = fTekst(26, 700); ctx.fillStyle = C.text; ctx.textAlign = 'center'; const reg = l.split('\n'); reg.forEach((r, k) => ctx.fillText(r, x + i * bw + bw / 2, y + 62 + k * 32 - (reg.length - 1) * 16)); ctx.textAlign = 'left'; ctx.restore(); });
  ctx.restore(); }
// vijf domeinen: vier vakken die naar een vijfde (gevoel) wijzen
function vijfDomeinen(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = [['voeding', C.oker], ['omgeving', C.groen], ['gezondheid', C.koraal], ['gedrag', C.paars]];
  L.forEach(([n, col], i) => { const f = clamp(u * 5 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const bx = x - 600 + i * 300; kaartje(ctx, bx, y, 260, n, col, 1, 30); pijl(ctx, bx + 130, y + 80, x + (bx + 130 - x) * 0.25, y + 200, col, 1, 4, 14); ctx.restore(); });
  const f = clamp(u * 5 - 4, 0, 1); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x - 260, y + 210, 520, 100, 24); shape(ctx, rgba(C.goud, 0.2), C.goud, 3); regel(ctx, 'hoe voelt het dier zich?', x, y + 274, 1, C.goud, 38, 'center', 800); ctx.restore(); }
  ctx.restore(); }
// paard dat in de kribbe bijt (kop + rand)
function kribbeBijter(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#9A5E38', b = Math.max(0, Math.sin(t * 3)) * 8;
  ctx.fillStyle = '#6B4A30'; ctx.fillRect(60, -40, 200, 40); ctx.fillStyle = '#5A3E28'; ctx.fillRect(60, -46, 200, 10);
  ctx.save(); ctx.translate(0, b); ctx.fillStyle = k; zacht(ctx, [[-160, -240], [-100, -230], [-30, -170], [40, -90], [80, -60], [96, -40], [70, -30], [20, -60], [-60, -120], [-140, -150], [-180, -190]]); ctx.fill();
  ctx.fillStyle = '#2A1C14'; zacht(ctx, [[-170, -236], [-110, -232], [-70, -200], [-120, -210]]); ctx.fill(); circ(ctx, 0, -130, 6, '#140E0A'); ctx.restore();
  ctx.restore(); }
// kalf met tong (tongrollen)
function kalfTong(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; koe(ctx, x, y, s, { a, t, uier: 0, horens: false, bont: true });
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const r = Math.sin(t * 4); ctx.strokeStyle = '#E07A8A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(262, -134); ctx.bezierCurveTo(290, -130 + r * 10, 292, -110 - r * 12, 276, -112); ctx.stroke(); ctx.restore(); }
// ijsbeer die heen en weer loopt (positie p 0..1)
function ijsbeer(ctx, x, y, s = 1, a = 1, kijk = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const k = '#ECE8DE';
  ctx.fillStyle = _dk(k, 0.12); [[-70, -60], [50, -60]].forEach(([px, py]) => { roundRect(ctx, px - 14, py, 28, -py, 10); ctx.fill(); });
  ctx.fillStyle = k; zacht(ctx, [[-110, -80], [-80, -130], [20, -136], [80, -120], [110, -96], [100, -60], [-90, -56]]); ctx.fill(); [[-50, -60], [74, -60]].forEach(([px, py]) => { roundRect(ctx, px - 15, py, 30, -py, 10); ctx.fill(); });
  zacht(ctx, [[90, -120], [130, -126], [160, -104], [150, -88], [110, -86]]); ctx.fill(); circ(ctx, 158, -100, 5, '#1A1612'); circ(ctx, 132, -112, 3, '#1A1612'); circ(ctx, 112, -128, 8, k); ctx.restore(); }
// cortisolbron: icoon speeksel (druppel), mest (hoopje), haar (lok)
function bronIcoon(ctx, soort, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'speeksel') { ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(40, 0, 0, 30); ctx.quadraticCurveTo(-40, 0, 0, -60); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.stroke(); }
  if (soort === 'mest') { ctx.fillStyle = '#6B4A30'; [[0, 20, 50, 18], [0, 0, 38, 16], [0, -18, 24, 14]].forEach(([px, py, rx, ry]) => { ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, 6.283); ctx.fill(); }); }
  if (soort === 'haar') { ctx.strokeStyle = '#B88A5A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 7, 30); ctx.quadraticCurveTo(-20 + i * 6, -10, -10 + i * 5 + Math.sin(i) * 10, -50); ctx.stroke(); } }
  ctx.restore(); }
// stalfront A (nieuw, licht) of B (oud)
function melkStal(ctx, x, y, w, h, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const nieuw = soort === 'A';
  stal(ctx, x, y, w, h, 1, { kleur: nieuw ? '#4A6080' : '#4A4034', dak: nieuw ? '#3A4C66' : '#3A3228' });
  if (nieuw) { ctx.fillStyle = 'rgba(242,214,122,0.35)'; ctx.fillRect(x + 20, y - h + 20, w - 40, 30); } else { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 30, y - h + 40, 40, 20); ctx.fillRect(x + w - 90, y - h + 70, 50, 14); }
  regel(ctx, 'stal ' + soort, x + w / 2, y - h - h * 0.45 - 20, 1, nieuw ? C.teal : C.oker, 40, 'center', 800); regel(ctx, nieuw ? 'nieuw · licht · ruim' : 'oud · krapper', x + w / 2, y + 44, 1, C.text2, 26, 'center', 600); ctx.restore(); }
// scorekaartje met getal (bv. kreupelheid 1–5)
function scoreKaart(ctx, x, y, titel, waarde, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 110, y - 70, 220, 120, 16); shape(ctx, rgba(col, 0.16), col, 2); regel(ctx, titel, x, y - 30, 1, C.text2, 22, 'center', 700); regel(ctx, waarde, x, y + 30, 1, col, 48, 'center', 800); ctx.restore(); }
// afstand-maatlat tussen twee x-posities
function afstandLat(ctx, x1, x2, y, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(x1, y - 14); ctx.lineTo(x1, y + 14); ctx.moveTo(x2, y - 14); ctx.lineTo(x2, y + 14); ctx.stroke(); regel(ctx, label, (x1 + x2) / 2, y - 22, 1, C.goud, 28, 'center', 700); ctx.restore(); }
// tafel met gezondheidsplan
function planTafel(ctx, x, y, a = 1, vinkjes = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x - 220, y - 12, 440, 22); ctx.fillRect(x - 200, y + 10, 16, 150); ctx.fillRect(x + 184, y + 10, 16, 150);
  roundRect(ctx, x - 90, y - 140, 180, 128, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'gezondheidsplan', x, y - 108, fTekst(20, 800), '#1A2740', 'center');
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 50, y - 76 + i * 24); ctx.lineTo(x + 60, y - 76 + i * 24); ctx.stroke(); if (vinkjes > i) vink_(ctx, x - 70, y - 78 + i * 24, 8, 1); } ctx.restore(); }
// hete tang (couperen)
function heteTang(ctx, x, y, s = 1, a = 1, gloed = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.4);
  roundRect(ctx, -120, -10, 140, 20, 8); shape(ctx, '#3A3F4E', '#5A6070', 2); roundRect(ctx, 20, -7, 70, 14, 4); shape(ctx, '#8A96A8', null);
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed * (0.7 + 0.3 * Math.sin(t * 6)); circ(ctx, 92, 0, 14, rgba(C.koraal, 0.6)); circ(ctx, 92, 0, 7, C.goud); ctx.restore(); } ctx.restore(); }
// weegschaal met vier belangen (pannen links/rechts met labels)
function belangen(ctx, x, y, a = 1, al = [1, 1, 1, 1], t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tilt = Math.sin(t * 0.8) * 0.05;
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 6, y - 220, 12, 220); roundRect(ctx, x - 80, y - 6, 160, 18, 6); ctx.fill(); ctx.save(); ctx.translate(x, y - 220); ctx.rotate(tilt); ctx.fillRect(-340, -6, 680, 12);
  [[-300, ['het dier', C.groen], ['de regels', C.teal]], [300, ['de veehouder', C.oker], ['de samenleving', C.paars]]].forEach(([px, l1, l2], k) => { ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px - 120, 120); ctx.moveTo(px, 0); ctx.lineTo(px + 120, 120); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, 124, 130, 18, 0, 0, Math.PI); ctx.fillStyle = '#9AA3B2'; ctx.fill();
    [l1, l2].forEach(([n, col], i) => { const f = al[[[0, 2], [1, 3]][k][i]]; if (f > 0.01) tag(ctx, n, px, 104 - i * 62, col, f, 'center', 30); }); });
  ctx.restore(); ctx.restore(); }

// kribbe (houten voerbak) met een paard dat erin bijt: kop van het paard op de rand, korte schok
function kribbe(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const by = y - 230; ctx.fillStyle = '#6B4A30'; ctx.fillRect(x - 10, by, 160, 70); ctx.fillStyle = '#5A3E28'; ctx.fillRect(x - 16, by - 8, 172, 14); ctx.fillStyle = '#4A3424'; ctx.fillRect(x + 10, by + 70, 14, y - by - 70); ctx.fillRect(x + 120, by + 70, 14, y - by - 70);
  const b = Math.max(0, Math.sin(t * 4)); ctx.strokeStyle = rgba(C.goud, 0.8 * b); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x - 6, by - 4, 18 + i * 12, -2.4, -0.8); ctx.stroke(); } ctx.restore(); }

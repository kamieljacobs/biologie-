// Wat word jij? · Biomedische wetenschappen 3 · Van lab tot patiënt — eigen tekeningen (24 okt 2026)

function zacht(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }


// kweekplaat met 8 × 12 putjes; hits = putjes die oplichten (een stof die werkt)
function kweekPlaat(ctx, x, y, w, a = 1, lit = 0, t = 0) { zacht(ctx, a, () => {
  const h = w * 0.66; roundRect(ctx, x, y, w, h, 18); shape(ctx, '#2C3B57', '#AFC0D0', 2.5);
  const dx = (w - 60) / 12, dy = (h - 50) / 8, r = Math.min(dx, dy) * 0.36;
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) { const px = x + 30 + dx * (j + 0.5), py = y + 25 + dy * (i + 0.5); const k = (i * 12 + j) * 37 % 97;
    const hit = lit > 0.01 && (k === 11 || k === 64 || k === 30);
    circ(ctx, px, py, r, hit ? rgba(C.goud, 0.35 + 0.6 * lit) : rgba('#E07A9A', 0.22 + 0.25 * ((k % 5) / 5)), '#6A7A94', 1.2); } }); }

// robotarm boven de plaat met een rij pipetpunten die op en neer gaat
function robotArm(ctx, x, y, s, a = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const sx = Math.sin(t * 0.8) * 120, dip = Math.max(0, Math.sin(t * 2.4)) * 30;
  ctx.fillStyle = '#4A5670'; ctx.fillRect(-340, -40, 680, 26); roundRect(ctx, sx - 70, -60, 140, 70, 10); shape(ctx, '#8A94A8', '#C8D0DC', 2);
  ctx.fillStyle = '#C8D0DC'; ctx.fillRect(sx - 14, 10, 28, 70 + dip);
  roundRect(ctx, sx - 90, 74 + dip, 180, 30, 6); shape(ctx, '#6A7488', '#C8D0DC', 1.5);
  for (let k = 0; k < 8; k++) { const px = sx - 77 + k * 22; ctx.beginPath(); ctx.moveTo(px - 6, 104 + dip); ctx.lineTo(px, 150 + dip); ctx.lineTo(px + 6, 104 + dip); ctx.closePath(); shape(ctx, '#E8E4D8', '#AFC0D0', 1); }
  ctx.restore(); }); }

// eiwit als opgevouwen kralenketting met een holte; u 0..1 = stof schuift de holte in
function eiwitSlot(ctx, x, y, s, a = 1, u = 0, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const N = 46, pts = [];
  for (let i = 0; i < N; i++) { const f = i / N, an = f * 6.283 + 0.35; let r = 150 + 18 * Math.sin(f * 37) + 10 * Math.sin(f * 11);
    pts.push([Math.cos(an) * r, Math.sin(an) * r]); }
  // holte rechts: kralen rond x = +150 inwaarts
  pts.forEach(p => { const an = Math.atan2(p[1], p[0]); const k = Math.exp(-an * an * 7); p[0] -= 85 * k * Math.cos(an); p[1] -= 85 * k * Math.sin(an); });
  ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
  const kl = [C.teal, '#7FB8D8', C.paars, '#5A8FB0']; pts.forEach((p, i) => circ(ctx, p[0], p[1], 15, kl[i % 4], '#DCE6F0', 1.5));
  // stof: zeshoekje met staartje
  const sx = 330 - u * 245, sy = 0; ctx.save(); ctx.translate(sx, sy); hexagon(ctx, 0, 0, 30, C.goud, '#F4D98A', 2.5); hexagon(ctx, 46, -12, 22, C.goud, '#F4D98A', 2.5); ctx.restore();
  ctx.restore(); }); }

// trechter: veel stipjes boven, er komen er maar een paar onderuit
function trechter(ctx, x, y, a = 1, u = 0, t = 0) { zacht(ctx, a, () => {
  ctx.beginPath(); ctx.moveTo(x - 300, y); ctx.lineTo(x + 300, y); ctx.lineTo(x + 40, y + 260); ctx.lineTo(x + 40, y + 360); ctx.lineTo(x - 40, y + 360); ctx.lineTo(x - 40, y + 260); ctx.closePath(); shape(ctx, rgba(C.fill, 0.6), C.line, 3);
  for (let i = 0; i < 140; i++) { const px = x - 280 + ((i * 53) % 560), py = y - 24 - ((i * 29) % 120) + Math.sin(t * 2 + i) * 3; circ(ctx, px, py, 7, rgba(C.text2, 0.75)); }
  const k = ease(u); circ(ctx, x - 12, y + 330 + k * 140, 12, C.goud, '#F4D98A', 2); circ(ctx, x + 16, y + 300 + k * 160, 12, C.goud, '#F4D98A', 2); }); }

// petrischaal met een laagje cellen
function petri(ctx, x, y, r, a = 1) { zacht(ctx, a, () => { ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  for (let i = 0; i < 22; i++) { const an = i * 2.4, rr = r * 0.75 * Math.sqrt((i + 1) / 22); circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.4, r * 0.09, rgba('#E8A0B4', 0.75), '#F4C8D4', 1.2); circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.4, r * 0.03, '#8C7BBF'); }
  ctx.beginPath(); ctx.ellipse(x, y + 10, r, r * 0.42, 0, 0.1, 3.04); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); }); }

// kijkje in de romp van een castpersonage (r = ankerpunten van persoon()), organen uit personages/lib_anatomie.js op hun echte plek
// w = {hart, lever, nieren} 0..1; namen direct naast het orgaan (links in beeld = rechts in het lichaam)
let BODY = { cx: 960, yb: 880, h: 700 };
function rompKijkje(ctx, r, a = 1, w = {}, t = 0, namen = true) { if (a <= 0.01 || !r || !r.hoofd) return;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0, 2.5), wr = 0.82 * HHn;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.clip();
  ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9);
  const H = w.hart || 0, L = w.lever || 0, N = w.nieren || 0;
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * L; liver(1, 0.7 * L); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * N; for (const sd of [-1, 1]) anKidney(sd, 1, 0.7 * N); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * H; anHeart(1, t * 7, 0.6 * H); ctx.restore();
  ctx.restore();
  ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke();
  ctx.restore();
  if (namen) { const xr = wx + wr + 24, xl = wx - wr - 24;
    naamBij(ctx, 'hart', '', xr, AP(0, 2.24)[1] + 12, a * H, 'left');
    naamBij(ctx, 'lever', '', xl, AP(0, 2.48)[1] + 12, a * L, 'right');
    naamBij(ctx, 'nieren', '', xr, AP(0, 2.88)[1] + 12, a * N, 'left'); } }

// rat van opzij (kijk = 1 naar rechts)
function rat(ctx, x, y, s, a = 1, kijk = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.strokeStyle = '#C9A0A0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-100, 20); ctx.bezierCurveTo(-190, 40, -230, -10, -270, 10 + 6 * Math.sin(t * 3)); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-10, 0, 115, 62, 0, 0, 6.283); shape(ctx, '#E8E4DC', '#FFFFFF', 2);
  ctx.beginPath(); ctx.moveTo(70, -40); ctx.quadraticCurveTo(150, -40, 175, 10); ctx.quadraticCurveTo(130, 34, 70, 30); ctx.closePath(); shape(ctx, '#E8E4DC', '#FFFFFF', 2);
  circ(ctx, 92, -50, 20, '#E8C4C4', '#FFFFFF', 2); circ(ctx, 126, -12, 6, '#C8423A'); circ(ctx, 176, 8, 6, '#E0A0A0');
  ctx.strokeStyle = '#E0D8D0'; ctx.lineWidth = 9; [-60, 40].forEach(fx => { ctx.beginPath(); ctx.moveTo(fx, 50); ctx.lineTo(fx + 8, 70); ctx.stroke(); });
  ctx.restore(); }); }

// hond van opzij (tweede diersoort, geen knaagdier)
function hond(ctx, x, y, s, a = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const bruin = '#B48654', licht = '#D8B07E';
  ctx.strokeStyle = bruin; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-120, -50); ctx.quadraticCurveTo(-170, -90 + 8 * Math.sin(t * 5), -160, -120); ctx.stroke();
  ctx.lineWidth = 20; [-95, -60, 70, 100].forEach(fx => { ctx.beginPath(); ctx.moveTo(fx, 0); ctx.lineTo(fx, 90); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, -20, 140, 60, 0, 0, 6.283); shape(ctx, bruin, licht, 2);
  ctx.beginPath(); ctx.ellipse(150, -90, 52, 44, 0, 0, 6.283); shape(ctx, bruin, licht, 2); ctx.beginPath(); ctx.ellipse(196, -76, 30, 20, 0, 0, 6.283); shape(ctx, licht, licht, 1);
  ctx.beginPath(); ctx.ellipse(124, -100, 18, 40, 0.3, 0, 6.283); shape(ctx, '#7A5634', null); circ(ctx, 162, -102, 6, '#1A1418'); circ(ctx, 222, -80, 8, '#1A1418');
  ctx.restore(); }); }

// vergunningsdocument met stempel
function vergunning(ctx, x, y, a = 1, stamp = 0, titel = 'projectvergunning', st = 'CCD') { zacht(ctx, a, () => {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.04); roundRect(ctx, -150, -190, 300, 380, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  text(ctx, titel, 0, -140, fTekst(28, 800), '#2A3446', 'center'); ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 7; i++) ctx.fillRect(-110, -100 + i * 32, i % 3 === 2 ? 140 : 220, 8);
  ctx.restore(); if (stamp > 0.01) { const k = 1 + (1 - ease(stamp)) * 0.6; ctx.save(); ctx.translate(x + 40, y + 120); ctx.scale(k, k); stempel(ctx, 0, 0, st, C.groen, ease(stamp)); ctx.restore(); } }); }

// weegschaal; tilt > 0 = rechts zwaarder
function weegschaal(ctx, x, y, s, a = 1, tilt = 0, links = '', rechts = '', cl = C.groen, cr = C.koraal) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(-8, -160, 16, 260); roundRect(ctx, -90, 96, 180, 24, 8); shape(ctx, '#6A7A94', null); circ(ctx, 0, -160, 14, C.goud);
  const an = tilt * 0.22; const lx = -200 * Math.cos(an), ly = -160 - 200 * Math.sin(an) * -1, rx = 200 * Math.cos(an), ry = -160 + 200 * Math.sin(an);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, -160 - 200 * Math.sin(an)); ctx.lineTo(rx, ry); ctx.stroke();
  [[lx, -160 - 200 * Math.sin(an), links, cl], [rx, ry, rechts, cr]].forEach(([px, py, lab, col]) => { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 70, py + 90); ctx.moveTo(px, py); ctx.lineTo(px + 70, py + 90); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 92, 92, 18, 0, 0, 6.283); shape(ctx, rgba(col, 0.5), col, 2); if (lab) text(ctx, lab, px, py + 150, fTekst(34, 700), C.text, 'center'); });
  ctx.restore(); }); }

// kaartje met een V; aan = oplichten
function vKaart(ctx, x, y, w, titel, sub, col, a = 1, aan = 1) { zacht(ctx, a, () => { roundRect(ctx, x, y, w, 120, 16); shape(ctx, rgba(col, 0.08 + 0.2 * aan), rgba(col, 0.35 + 0.65 * aan), 2.5);
  circ(ctx, x + 60, y + 60, 34, rgba(col, 0.3 + 0.5 * aan)); text(ctx, 'V', x + 60, y + 74, fTitel(40), C.text, 'center'); text(ctx, titel, x + 112, y + (sub ? 56 : 72), fTekst(36, 800), C.text, 'left'); if (sub) text(ctx, sub, x + 112, y + 96, fTekst(24, 500), C.text2, 'left'); }); }

// spuitje (pijnstilling)
function spuit(ctx, x, y, s, a = 1, rot = -0.6) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -60, -14, 110, 28, 5); shape(ctx, rgba('#CFE4F0', 0.5), '#E8EEF4', 2); ctx.fillStyle = rgba(C.teal, 0.7); ctx.fillRect(-20, -10, 66, 20);
  ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-100, -4, 40, 8); ctx.fillRect(-106, -18, 8, 36); ctx.strokeStyle = '#E8EEF4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(96, 0); ctx.stroke(); ctx.restore(); }); }

// vis (pictogram)
function visje(ctx, x, y, s, a = 1, col = '#7FB8D8') { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 60, 26, 0, 0, 6.283); shape(ctx, col, '#DCE6F0', 2); ctx.beginPath(); ctx.moveTo(-54, 0); ctx.lineTo(-92, -24); ctx.lineTo(-92, 24); ctx.closePath(); shape(ctx, col, '#DCE6F0', 2); circ(ctx, 34, -6, 5, '#1A1418'); ctx.restore(); }); }

// trap met drie treden: u = [0..1] per trede
function faseTrap(ctx, x, y, w, a = 1, u = [1, 1, 1], hl = -1) { zacht(ctx, a, () => {
  const tw = w / 3, kl = [C.teal, C.paars, C.goud];
  for (let i = 0; i < 3; i++) { const h = 110 + i * 110, k = ease(u[i]); if (k <= 0.01) continue; zacht(ctx, k, () => { roundRect(ctx, x + i * tw, y - h, tw - 12, h, 10); shape(ctx, rgba(kl[i], hl === i ? 0.55 : 0.28), kl[i], hl === i ? 4 : 2); text(ctx, 'fase ' + (i + 1), x + i * tw + tw / 2 - 6, y - h + 54, fTekst(40, 800), C.text, 'center'); }); } }); }

// groepje telpoppetjes (pictogram in een telling)
function popjes(ctx, x, y, n, per, gap, r, kleur, a = 1) { zacht(ctx, a, () => { for (let i = 0; i < n; i++) { const px = x + (i % per) * gap, py = y + Math.floor(i / per) * gap * 1.3; ctx.fillStyle = typeof kleur === 'function' ? kleur(i) : kleur; ctx.beginPath(); ctx.arc(px, py - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, px - r * 0.8, py - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); } }); }

// potje met alleen een code; open 0..1 = etiket draait om en toont de inhoud
function potje(ctx, x, y, s, a = 1, open = 0, inhoud = 'nieuwe stof', col = C.goud) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -120, 120, 150, 18); shape(ctx, '#E8EEF4', '#AFC0D0', 2); roundRect(ctx, -66, -150, 132, 40, 8); shape(ctx, '#5A6A84', '#8FA0B5', 2);
  roundRect(ctx, -50, -84, 100, 70, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5);
  if (open < 0.5) text(ctx, 'code 4172', 0, -40, fTekst(22, 800), '#2A3446', 'center'); else text(ctx, inhoud, 0, -40, fTekst(18, 800), col === C.goud ? '#8A6A1A' : '#2A3446', 'center');
  ctx.restore(); }); }

function pil(ctx, x, y, s, col = '#F2EEE4', a = 1, rot = 0.5) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -40, -18, 80, 36, 18); shape(ctx, col, '#B8B0A0', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(0, 18); ctx.stroke(); ctx.restore(); }); }

// slotje (code dicht/open)
function slot(ctx, x, y, s, a = 1, open = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C8D0DC'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -30 - open * 26, 30, Math.PI, 0); ctx.lineTo(30, -30 - open * 26 + (open > 0.5 ? -4 : 0)); ctx.stroke(); roundRect(ctx, -46, -30, 92, 76, 10); shape(ctx, C.goud, '#F4D98A', 2); circ(ctx, 0, 0, 9, '#5A4A1A'); ctx.restore(); }); }

// blinddoek over de ogen van een persoon (x,y = midden hoofd, r = hoofdbreedte/2)
function blinddoek(ctx, x, y, r, a = 1) { zacht(ctx, a, () => { roundRect(ctx, x - r * 1.05, y - r * 0.2, r * 2.1, r * 0.42, r * 0.2); shape(ctx, '#2A3446', '#5A6A84', 2); }); }

// krans van twaalf sterren (Europa)
function sterren(ctx, x, y, r, a = 1, t = 0) { zacht(ctx, a, () => { circ(ctx, x, y, r * 1.35, '#1E3A8A', '#3A5AAA', 2); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ster(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, r * 0.13, '#F4D24A'); } }); }
function ster(ctx, x, y, r, col) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }

// vergadertafel: twee castfiguranten (Erik, Joost) achter de tafel; ervoor een rij van 27 landbordjes; nl = het Nederlandse bordje (CBG) licht op
function tafel(ctx, x, y, a = 1, nl = 0, t = 0) { zacht(ctx, a, () => {
  persoon(ctx, 'erik', x - 170, y + 150, 260, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'joost', x + 170, y + 150, 260, { t, kijk: -1, uit: 'neutraal' });
  roundRect(ctx, x - 400, y + 40, 800, 40, 8); shape(ctx, '#6A5440', '#8A7058', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 400, y + 80, 800, 70);
  const L = ['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'];
  L.forEach((c, i) => { const px = x - 378 + (i % 14) * 58, py = y + 90 + Math.floor(i / 14) * 30, isNL = c === 'NL'; roundRect(ctx, px - 24, py, 48, 24, 4); shape(ctx, isNL ? rgba(C.koraal, 0.35 + 0.65 * nl) : '#F2EEE4', isNL ? C.koraal : '#B8B0A0', 1.2); text(ctx, c, px, py + 18, fTekst(15, 800), '#2A3446', 'center'); }); }); }

// toestemmingsformulier met handtekening die verschijnt (u 0..1)
function formulier(ctx, x, y, a = 1, u = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(0.05);
  roundRect(ctx, -90, -110, 180, 220, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'toestemming', 0, -76, fTekst(22, 800), '#2A3446', 'center');
  ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 4; i++) ctx.fillRect(-64, -50 + i * 24, i === 3 ? 80 : 128, 6);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); const N = 40 * clamp(u, 0, 1);
  for (let k = 0; k <= N; k++) { const f = k / 40, px = -60 + f * 120, py = 70 + Math.sin(f * 19) * 10 - f * 8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(-64, 86, 128, 2); ctx.restore(); }); }

// dossierdoos
function dossier(ctx, x, y, s, a = 1) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 4; i++) { roundRect(ctx, -110 + i * 8, -150 + i * 10, 220, 290, 8); shape(ctx, i === 3 ? '#F2EEE4' : '#D8D2C4', '#B8B0A0', 2); }
  text(ctx, 'dossier', 24, -60, fTekst(34, 800), '#2A3446', 'center'); ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 5; i++) ctx.fillRect(-60, -20 + i * 30, 160, 8); ctx.restore(); }); }

// vaccinflacon
function flacon(ctx, x, y, s, a = 1, col = C.teal) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -50, -80, 100, 160, 16); shape(ctx, rgba('#CFE4F0', 0.25), '#E8EEF4', 2.5); ctx.fillStyle = rgba(col, 0.5); ctx.fillRect(-46, -10, 92, 86);
  roundRect(ctx, -34, -116, 68, 36, 6); shape(ctx, '#8FA0B5', '#C8D0DC', 2); roundRect(ctx, -40, 0, 80, 46, 4); shape(ctx, '#F2EEE4', null); ctx.restore(); }); }

// bloedvat in lengtedoorsnede met een stolsel en weinig bloedplaatjes
function vatStolsel(ctx, x, y, w, a = 1, u = 1, t = 0) { zacht(ctx, a, () => { const h = 150;
  roundRect(ctx, x, y, w, h, 20); shape(ctx, '#5A1E22', '#C06A5A', 4);
  for (let i = 0; i < 18; i++) { const px = x + 40 + ((i * 97 + t * 60) % (w - 80)), py = y + 30 + (i * 41) % (h - 60); ctx.beginPath(); ctx.ellipse(px, py, 18, 10, 0.3, 0, 6.283); shape(ctx, '#C8423A', '#E07A70', 1.2); }
  const k = ease(u); if (k > 0.01) { ctx.beginPath(); ctx.ellipse(x + w * 0.62, y + h / 2, 90 * k, (h / 2 - 6) * k, 0, 0, 6.283); shape(ctx, '#7A1E1E', '#B23A3A', 2); ctx.strokeStyle = rgba('#F2EEE4', 0.5); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x + w * 0.62 - 80 * k, y + 20 + i * 14); ctx.lineTo(x + w * 0.62 + 80 * k, y + 30 + i * 12); ctx.stroke(); } }
  for (let i = 0; i < 3; i++) circ(ctx, x + 120 + i * 260, y + 40 + (i % 2) * 70, 7, '#E8D07A', '#F4E4A0', 1); }); }

// gebouw (lab, apotheek, CBG) als pictogram
function gebouwtje(ctx, x, y, s, soort, a = 1) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 130, 8); shape(ctx, '#2C3B57', '#8FA0B5', 2.5); ctx.beginPath(); ctx.moveTo(-104, -80); ctx.lineTo(0, -138); ctx.lineTo(104, -80); ctx.closePath(); shape(ctx, '#3A4A68', '#8FA0B5', 2.5);
  if (soort === 'apotheek') { ctx.fillStyle = C.groen; ctx.fillRect(-12, -60, 24, 70); ctx.fillRect(-35, -37, 70, 24); }
  else if (soort === 'lab') { ctx.beginPath(); ctx.moveTo(-14, -66); ctx.lineTo(-14, -34); ctx.lineTo(-40, 20); ctx.lineTo(40, 20); ctx.lineTo(14, -34); ctx.lineTo(14, -66); ctx.closePath(); shape(ctx, rgba(C.teal, 0.5), '#C8D0DC', 2); }
  else { for (let i = -2; i <= 2; i++) { ctx.fillStyle = '#8FA0B5'; ctx.fillRect(i * 34 - 6, -60, 12, 100); } }
  ctx.restore(); }); }

// kalender/tijdlijn-pijl met stappen
function stappenLijn(ctx, x, y, w, stappen, a = 1, nu = 99, kleur = C.goud) { zacht(ctx, a, () => { const n = stappen.length, d = w / (n - 1);
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  stappen.forEach((s2, i) => { const on = i <= nu; circ(ctx, x + i * d, y, 16, on ? kleur : '#3A4A68', on ? '#F4D98A' : C.line, 2); text(ctx, s2, x + i * d, y + (i % 2 ? 62 : -34), fTekst(28, 700), on ? C.text : C.text2, 'center'); }); }); }

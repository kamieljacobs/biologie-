// Binnen de grenzen — scènes per alinea (v1.0, 21 okt 2026)
const LOTTE = 'lotte';
function antwoord(ctx, s, a = 1) { regel(ctx, s, 120, 150, a, C.groen, 40, 'left', 700); }
function wisselTekst(ctx, items, q, x, y, col = C.goud, px = 32) { // één tekstbalk tegelijk: [woord, n, tekst]
  for (let i = 0; i < items.length; i++) { const [w, n, s] = items[i]; const aan = q.on(w, n, 0.4); const uit = i + 1 < items.length ? q.on(items[i + 1][0], items[i + 1][1], 0.3) : 0; tag(ctx, s, x, y, col, aan * (1 - uit), 'center', px); } }
function kolom(ctx, x, y, w, h, titel, sub, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.5), col, 2); regel(ctx, titel, x + w / 2, y + 56, 1, col, 40, 'center', 700); metaText(ctx, sub, x + w / 2, y + 96, C.grain, 'center', 26); ctx.restore(); }
function bijenkast(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -60, -40 - i * 44, 120, 42, 4); shape(ctx, i % 2 ? '#C9A35C' : '#B08A5C', '#E0C890', 1.5); }
  ctx.fillStyle = '#8C6A4A'; ctx.beginPath(); ctx.moveTo(-72, -172); ctx.lineTo(72, -172); ctx.lineTo(60, -150); ctx.lineTo(-60, -150); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#2A2420'; ctx.fillRect(-20, -14, 40, 8); ctx.restore(); }
function thermo(ctx, x, y, h, frac, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - h, 24, h, 12); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.fillStyle = col; roundRect(ctx, x - 6, y - h * frac, 12, h * frac - 6, 6); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, 20, 0, 6.283); ctx.fill(); ctx.restore(); }
function mensIcoon(ctx, x, y, s = 1, col = '#9AA3B2', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 22 * s, 9 * s, 0, 6.283); ctx.fill(); roundRect(ctx, x - 10 * s, y - 11 * s, 20 * s, 26 * s, 8 * s); ctx.fill(); ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s); roundRect(ctx, -34, -14, 68, 28, 14); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(20, -14); ctx.arcTo(34, -14, 34, 0, 14); ctx.arcTo(34, 14, 20, 14, 14); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
function druppel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -34); ctx.bezierCurveTo(16, -10, 24, 4, 24, 14); ctx.arc(0, 14, 24, 0, Math.PI); ctx.bezierCurveTo(-24, 4, -16, -10, 0, -34); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); ctx.restore(); }
function boomstam(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 3; i++) { roundRect(ctx, -60 + i * 8, -30 + i * 22, 120, 22, 11); shape(ctx, '#8C5A3A', '#B08A68', 1.5); ctx.beginPath(); ctx.ellipse(60 + i * 8, -19 + i * 22, 8, 11, 0, 0, 6.283); shape(ctx, '#C9A35C', '#8C5A3A', 1); } ctx.restore(); }
function pad_(ctx, x1, x2, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 10; ctx.setLineDash([2, 14]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y); ctx.quadraticCurveTo((x1 + x2) / 2, y - 30, x2, y); ctx.stroke(); ctx.restore(); }
function lus(ctx, cx, cy, r, labels, act, a = 1, t = 0) { // terugkoppelingslus: labels rond een cirkel, pijlen ertussen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = labels.length;
  for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / n * 6.283, an2 = -Math.PI / 2 + (i + 1) / n * 6.283; const u = clamp(act * n - i, 0, 1);
    if (u > 0.01) { const x1 = cx + Math.cos(an + 0.35) * r, y1 = cy + Math.sin(an + 0.35) * r, x2 = cx + Math.cos(an2 - 0.35) * r, y2 = cy + Math.sin(an2 - 0.35) * r; ctx.save(); ctx.globalAlpha *= u; boogPijl(ctx, x1, y1, x2, y2, 0.25, C.koraal, 1, 5); ctx.restore(); }
    const ua = clamp(act * n - i + 1, 0, 1); const lx = cx + Math.cos(an) * r, ly = cy + Math.sin(an) * r; tag(ctx, labels[i], lx, ly + 14, i === 0 ? C.koraal : C.goud, ua, 'center', 30); }
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { bloesemTak(ctx, 1500, 560, 1.15, { bloei: 1 }); hommel(ctx, 1380 + Math.sin(t * 0.9) * 30, 420 + Math.cos(t * 1.3) * 18, 1.4, { t }); wildeBij(ctx, 1700 + Math.cos(t * 0.7) * 24, 360, 1.3, { t, ang: 0.3 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const vd = q.on('verdwijnen', 1, 1.2);
    ontbijt(ctx, 760, 700, 1, {}); persoon(ctx, LOTTE, 300, 860, 470, { t, uit: q.on('slecht', 1) > 0.5 ? 'verbaasd' : 'blij', pose: q.on('vraagt', 1) > 0.5 ? 'denk' : 'staan', kijk: 1 });
    naamBij(ctx, 'appel', null, 1020, 760, q.on('appel', 1) * (1 - q.on('bloesem', 1)), 'center', C.koraal);
    const zm = q.on('bloesem', 1, 0.8); zoomCircle(ctx, 1460, 380, 300, 1020, 660, 'appelbloesem · vergroot', zm, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1160, 80, 600, 600); bloesemTak(ctx, 1480, 420, 1.05, { bloei: 1 });
      hommel(ctx, 1500 + Math.sin(t) * 40, 300 + Math.cos(t * 1.3) * 20, 1.5, { t, a: 1 - vd }); wildeBij(ctx, 1380 + Math.cos(t * 0.8) * 30, 470, 1.4, { t, a: 1 - vd, ang: 0.4 }); bij(ctx, 1640, 380 + Math.sin(t * 1.1) * 20, 1.3, -0.3, { t, a: 1 - vd }); });
    tag(ctx, 'het gaat slecht met de bijen', 860, 200, C.koraal, q.on('slecht', 1) * (1 - vd), 'center', 30);
    vraagteken(ctx, 1460, 400, vd * q.on('denk', 1, 0.4) + 0 * vd, 160); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: graan blijft', 1 - q.on('Maar', 1));
    const [A, B] = fasen(q, [null, ['Zonder', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const g = q.on('Tarwe', 1); paneel(ctx, 110, 220, 640, 600, 'zelf of door de wind', g);
      for (let i = 0; i < 3; i++) graanaar(ctx, 180 + i * 50, 780, 420 + (i % 3) * 30, g, t, 1); rijstPluim(ctx, 400, 780, 380, g, t); maisPlant(ctx, 620, 780, 380, g);
      { const wa = q.on('wind', 1); if (wa > 0.01) { pijl(ctx, 160, 330, 420, 330, C.teal, wa, 5, 18); metaText(ctx, 'wind', 290, 310, C.teal, 'center', 28 * 1); } }
      [['tarwe', 230], ['rijst', 430], ['maïs', 620]].forEach(([w, x]) => chip(ctx, w, x, 840 - 40, C.oker, q.on(w, 1), 26));
      const bb = q.on('baat', 1); paneel(ctx, 820, 220, 990, 600, 'baat bij bestuivers', bb, C.groen);
      const vr = [['appels', (x, y) => appel(ctx, x, y, 1.6)], ['aardbeien', (x, y) => aardbei(ctx, x, y, 1.8)], ['amandelen', (x, y) => amandel(ctx, x, y, 1.8)], ['koffie', (x, y) => koffie(ctx, x, y, 1.7)]];
      vr.forEach(([w, f], i) => { const u = Math.max(0.3 * bb, q.on(w, 1, 0.5)); if (u < 0.01) return; ctx.save(); ctx.globalAlpha *= u; f(960 + i * 230, 470); regel(ctx, w, 960 + i * 230, 620, 1, C.text, 32, 'center', 600); ctx.restore(); });
      if (bb > 0.01) { hommel(ctx, 1000 + Math.sin(t * 0.8) * 300 + 300, 340 + Math.cos(t * 1.4) * 30, 1, { t, a: bb }); }
      regel(ctx, 'soms een beetje, soms heel veel', 1315, 730, q.on('Soms', 1), C.text2, 30, 'center', 600); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'wereldoogst in kilo’s', 960, 230, 1, C.text2, 34, 'center', 600);
      const k = q.on('kleiner', 1, 1.2); balk(ctx, 460, 300, 1000, 1, C.oker, 'met bestuivers', 1, 60); balk(ctx, 460, 440, 1000, 1 - 0.065 * k, C.oker, 'zonder bestuivers', 1, 60);
      tag(ctx, '5–8 % minder', 1560, 500, C.koraal, k, 'center', 30);
      const vt = q.on('vitamines', 1); if (vt > 0.01) { ctx.save(); ctx.globalAlpha *= vt; appel(ctx, 700, 700, 1.4); aardbei(ctx, 860, 700, 1.6); tomaat(ctx, 1020, 700, 1.5); amandel(ctx, 1180, 700, 1.6); tag(ctx, 'juist hier zitten veel vitamines', 960, 820, C.groen, 1, 'center', 30); ctx.restore(); } ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['hommel', 2], ['Andere', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; bijenkast(ctx, 300, 760, 1.4, q.on('honingbijen', 1)); for (let k = 0; k < 4; k++) bij(ctx, 300 + Math.sin(t * 1.2 + k * 1.7) * 120, 440 + Math.cos(t + k * 2) * 60, 1.1, 0, { t, a: q.on('honingbijen', 1) });
      naamBij(ctx, 'honingbij', 'gehouden door imkers', 300, 830, q.on('imkers', 1), 'center', C.oker);
      const wb = q.on('wilde', 1); paneel(ctx, 620, 200, 1220, 600, 'ruim 350 soorten wilde bijen in Nederland', wb, C.groen);
      if (wb > 0.01) { ctx.save(); ctx.globalAlpha *= wb; for (let i = 0; i < 9; i++) { const x = 720 + (i % 5) * 150 + (Math.floor(i / 5) % 2) * 70, y = 340 + Math.floor(i / 5) * 150; i % 3 === 0 ? hommel(ctx, x, y, 1.3, { t: t + i }) : wildeBij(ctx, x, y, 1.6 + (i % 2) * 0.2, { t: t + i, ang: (i % 3 - 1) * 0.3 }); } ctx.restore(); }
      naamBij(ctx, 'ook hommels', null, 720, 660, q.on('hommels', 1), 'left', C.goud);
      const zv = q.on('zweefvliegen', 1); zweefvlieg(ctx, 1500, 360, 1.3, { t, a: zv }); vlinder(ctx, 1640, 520, 1.3, { t, a: q.on('vlinders', 1) }); kever(ctx, 1500, 650, 1.2, { a: q.on('kevers', 1) });
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; for (let k = 0; k < 3; k++) wolkje(ctx, 600 + k * 360, 220 + (k % 2) * 30, 1.4, 1); thermo(ctx, 1700, 560, 260, 0.25, C.teal, 1); metaText(ctx, 'koud en bewolkt', 1700, 640, C.teal, 'center', 28);
      hommel(ctx, 820 + Math.sin(t * 0.7) * 160, 480 + Math.cos(t) * 40, 1.6, { t }); naamBij(ctx, 'hommel: vliegt', null, 820, 640, 1, 'center', C.goud);
      bijenkast(ctx, 1300, 760, 1.2, 1); naamBij(ctx, 'honingbij: blijft thuis', null, 1300, 830, q.on('thuis', 1), 'center', C.text2); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; [['#E07A5F', 360], ['#8C7BBF', 760], ['#E0B64A', 1160], ['#5BA4C9', 1560]].forEach(([c, x], i) => { bloem(ctx, x, 520, 60, c, 1); });
      bij(ctx, 360, 420, 1.2, 0, { t }); wildeBij(ctx, 760, 420, 1.3, { t }); wildeBij(ctx, 1160, 420, 1.3, { t: t + 1, ang: 0.3 }); hommel(ctx, 1560, 420, 1.1, { t });
      kruis(ctx, 760, 300, 22, 1, C.text2); kruis(ctx, 1160, 300, 22, 1, C.text2); metaText(ctx, 'honingbij slaat over', 960, 260, C.text2, 'center', 26); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const gx = 360, gy = 250, gh = 460;
    const st = q.on('Onderzoekers', 1); paneel(ctx, 120, 150, 1100, 720, 'vruchtzetting in boomgaarden (schematisch)', st);
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; assen(ctx, gx, gy, 780, gh, '', '');
      const bars = [['weinig wilde', 0.42, 1], ['veel wilde', 0.78, q.on('Dan', 1, 1.2)]]; bars.forEach(([n, v, u], i) => { const x = gx + 140 + i * 360, hh = gh * v * ease(u); roundRect(ctx, x, gy + gh - hh, 180, hh, 10); shape(ctx, rgba(C.groen, 0.45), C.groen, 2); metaText(ctx, n, x + 90, gy + gh + 40, C.text2, 'center', 26); const wk = i ? 6 : 2; for (let k = 0; k < wk; k++) { const xx = x + 30 + (k % 3) * 60, yy = gy + gh - hh - 40 - Math.floor(k / 3) * 54; k % 3 === 1 ? hommel(ctx, xx, yy, 0.75, { t: t + k, a: u }) : wildeBij(ctx, xx, yy, 1.1, { t: t + k, a: u, ang: (k % 2) * 0.3 }); } for (let k = 0; k < 2; k++) bij(ctx, x + 60 + k * 60, gy + gh + 80, 0.9, 0, { t: t + k }); });
      metaText(ctx, 'onder elke staaf evenveel honingbijen', gx + 390, gy + gh + 140, C.oker, 'center', 26); ctx.restore(); }
    const tw = q.on('twee', 1); paneel(ctx, 1280, 170, 520, 300, '', tw, C.goud); if (tw > 0.01) { regel(ctx, '2×', 1540, 300, tw, C.goud, 96, 'center', 800); regel(ctx, 'groter effect dan honingbijen', 1540, 380, tw, C.text, 28, 'center', 600); }
    const be = q.on('betrouwbaardere', 1); if (be > 0.01) { haak(ctx, 1290, 1790, 520, 'meer soorten = betrouwbaardere oogst', C.groen, be); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'biodiversiteit', 960, 150, C.goud, q.on('biodiversiteit', 1), 'center', 40); { const v = 1 - q.on('genen', 1); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; hommel(ctx, 700, 450, 1.4, { t }); wildeBij(ctx, 900, 520, 1.5, { t }); vlinder(ctx, 1100, 430, 1.5, { t }); bloem(ctx, 1260, 560, 50, C.koraal, 1); appel(ctx, 820, 640, 1.4); den(ctx, 1420, 700, 220); bloem(ctx, 600, 620, 40, C.paars, 1); ctx.restore(); } }
    const pw = 520, x0 = 120, y0 = 230; const cols = [['genen', 'binnen een soort', 'genen'], ['soorten', 'aantal verschillende', 'aantal'], ['ecosystemen', 'bos, heide, rivier', 'ecosystemen']];
    cols.forEach(([titel, sub, w], i) => { const a = q.on(w, 1); kolom(ctx, x0 + i * (pw + 60), y0, pw, 560, titel, sub, [C.paars, C.groen, C.teal][i], a); });
    const a1 = q.on('genen', 1); if (a1 > 0.01) { ['#D8573F', '#E8C04A', '#7FC48F', '#B8322E', '#E07A5F'].forEach((c, k) => appel(ctx, x0 + 90 + (k % 3) * 170, 470 + Math.floor(k / 3) * 160, 1.3, a1 * q.on('appelrassen', 1, 0.4 + k * 0.2), c)); }
    const a2 = q.on('soorten', 1); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; hommel(ctx, x0 + pw + 60 + 130, 460, 1, { t }); wildeBij(ctx, x0 + pw + 60 + 390, 460, 1.2, { t }); vlinder(ctx, x0 + pw + 60 + 130, 650, 1.2, { t }); bloem(ctx, x0 + pw + 60 + 390, 650, 46, C.koraal, 1); ctx.restore(); }
    const a3 = q.on('ecosystemen', 1); if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; const X = x0 + 2 * (pw + 60); den(ctx, X + 110, 520, 160); boom(ctx, X + 200, 520, 0.7, 1); metaText(ctx, 'bos', X + 150, 560, C.grain, 'center', 26); for (let k = 0; k < 3; k++) heideStruikje(ctx, X + 320 + k * 70, 520, 1.5, 1); metaText(ctx, 'heide', X + 390, 560, C.grain, 'center', 26);
      ctx.fillStyle = '#2E6FBF'; ctx.beginPath(); ctx.moveTo(X + 40, 680); ctx.quadraticCurveTo(X + 260, 620, X + 480, 690); ctx.lineTo(X + 480, 730); ctx.quadraticCurveTo(X + 260, 660, X + 40, 720); ctx.closePath(); ctx.fill(); metaText(ctx, 'rivier', X + 260, 770, C.grain, 'center', 26); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'ecosysteemdienst: wat de mens uit de natuur haalt', 960, 140, C.goud, q.on('ecosysteemdienst', 1), 'center', 32);
    const pw = 520, x0 = 120, y0 = 210; const L = q.on('levert', 1), R = q.on('regelen', 1), B = q.on('beleving', 1);
    const D3 = 0.25 * q.on('drie', 1); kolom(ctx, x0, y0, pw, 600, 'leveren', 'productie', C.oker, Math.max(D3, L)); kolom(ctx, x0 + pw + 60, y0, pw, 600, 'regelen', 'regulatie', C.teal, Math.max(D3, R)); kolom(ctx, x0 + 2 * (pw + 60), y0, pw, 600, 'beleven', 'cultureel', C.groen, Math.max(D3, B));
    if (L > 0.01) { appel(ctx, x0 + 130, 440, 1.6, q.on('voedsel', 1)); boomstam(ctx, x0 + 370, 460, 1.1, q.on('hout', 1)); pil(ctx, x0 + 260, 640, 1.4, q.on('medicijnen', 1)); }
    if (R > 0.01) { const X = x0 + pw + 60; bloem(ctx, X + 140, 460, 44, C.koraal, q.on('bestuiven', 1)); bij(ctx, X + 140, 390, 1, 0, { t, a: q.on('bestuiven', 1) }); druppel(ctx, X + 380, 450, 1.6, q.on('zuivert', 1)); plantje(ctx, X + 260, 700, 1.6, q.on('koolstof', 1)); regel(ctx, 'CO₂', X + 340, 640, q.on('koolstof', 1), C.groen, 32, 'left', 700); pijl(ctx, X + 380, 600, X + 300, 660, C.groen, q.on('koolstof', 1), 4, 14); }
    if (B > 0.01) { const X = x0 + 2 * (pw + 60); pad_(ctx, X + 40, X + 480, 760, B); boom(ctx, X + 400, 600, 0.9, B); persoon(ctx, LOTTE, X + 200, 770, 360, { t, uit: 'blij', a: B, kijk: 1 }); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const geul = q.on('nevengeul', 1, 1), hw = q.on('hoogwater', 1), rest = q.on('rest', 1);
    const hoog = Math.max(q.on('1995', 1, 0.8) * (1 - q.on('Daarom', 1)), hw * (1 - rest));
    waalKaart(ctx, 100, 170, 1180, 660, { geul, hoog, t, natuur: q.on('eiland', 1), lab: q.on('Waalbrug', 1) });
    persoon(ctx, LOTTE, 1500, 860, 420, { t, uit: q.on('denk', 1) > 0.5 ? 'denk' : 'blij', pose: q.on('denk', 1) > 0.5 ? 'denk' : 'staan', kijk: -1, a: 1 - q.on('1995', 1, 0.4) + q.on('rest', 1) });
    const ev = q.on('kwart', 1) * (1 - q.on('Daarom', 1)); paneel(ctx, 1340, 220, 500, 360, '1995 · hoogwater', ev, C.koraal);
    if (ev > 0.01) { for (let i = 0; i < 25; i++) mensIcoon(ctx, 1400 + (i % 5) * 90, 340 + Math.floor(i / 5) * 46, 0.8, '#9AA3B2', ev * ramp(q.localT, q.at('kwart', 1) + i * 0.03, 0.3)); ctx.save(); ctx.globalAlpha *= ev; metaText(ctx, '± 250.000 mensen', 1590, 620, C.koraal, 'center', 30); metaText(ctx, 'moesten weg', 1590, 656, C.koraal, 'center', 30); ctx.restore(); }
    tag(ctx, 'nevengeul · ± 3 km', 690, 140, C.teal, geul * (1 - hw), 'center', 30);
    const cm = q.on('dertig', 1); paneel(ctx, 1340, 220, 500, 300, '', cm * (1 - rest), C.teal); if (cm * (1 - rest) > 0.01) { ctx.save(); ctx.globalAlpha *= cm * (1 - rest); regel(ctx, '− 30 cm', 1590, 360, 1, C.teal, 80, 'center', 800); metaText(ctx, 'bijna · bij hoogwater', 1590, 440, C.text, 'center', 30); ctx.restore(); }
    tag(ctx, 'groen eiland: wandelen en zwemmen', 690, 140, C.groen, rest * (1 - q.on('Welke', 1)), 'center', 30);
    vraagteken(ctx, 690, 160, q.on('denk', 1), 110); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: regelen', 1);
    waalKaart(ctx, 120, 220, 1000, 560, { geul: 1, hoog: q.on('vangt', 1) * (1 - q.on('wandelen', 1)), t, natuur: 1 });
    const R = q.on('regelen', 1), B = q.on('beleving', 1);
    kolom(ctx, 1200, 220, 600, 250, 'regelen', 'water afvoeren', C.teal, R); kolom(ctx, 1200, 520, 600, 250, 'beleven', 'wandelen, zwemmen', C.groen, B);
    vink_(ctx, 1740, 330, 26, R); vink_(ctx, 1740, 630, 26, B); },

  // ---------- H3 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const g = q.on('volgen', 1); const u = clamp((q.localT - q.at('1970', 1)) / 4, 0, 1);
    lpiGrafiek(ctx, 160, 170, 1100, 640, Math.max(0.02, u), { a: Math.max(0.5, g), punt: q.on('73', 1) });
    paneel(ctx, 1320, 170, 480, 300, '', g, C.line); if (g > 0.01) { regel(ctx, '± 35.000', 1560, 290, g, C.text, 64, 'center', 800); metaText(ctx, 'populaties gewervelden', 1560, 350, C.grain, 'center', 26); metaText(ctx, 'LPI · 1970–2020', 1560, 400, C.text2, 'center', 26); }
    vraagteken(ctx, 1560, 700, q.on('denk', 1), 140); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: een gemiddelde', 1 - q.on('miljoen', 1));
    const sp = Math.max(0.6, q.on('Sommige', 1)); paneel(ctx, 140, 220, 1080, 600, 'enkele populaties (schematisch)', sp);
    if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; for (let i = 0; i < 12; i++) { const x = 200 + (i % 4) * 250, y = 330 + Math.floor(i / 4) * 160; const d = [0.6, -0.9, -0.5, 0.3, -0.95, -0.7, -0.2, 0.5, -0.8, -0.6, 0.1, -0.85][i]; ctx.strokeStyle = d > 0 ? C.groen : C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const yy = y + 40 - (k / 10) * d * 70 + Math.sin(k * 1.7 + i) * 8; k ? ctx.lineTo(x + k * 18, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } ctx.restore(); }
    const mj = q.on('miljoen', 1); paneel(ctx, 1280, 360, 540, 330, '', mj, C.koraal); if (mj > 0.01) { regel(ctx, '± 1 miljoen', 1550, 500, mj, C.koraal, 64, 'center', 800); metaText(ctx, 'soorten bedreigd · schatting', 1550, 560, C.grain, 'center', 26); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const rl = q.on('Rode', 1);
    paneel(ctx, 120, 200, 760, 620, 'wilde bijen in Nederland', q.on('wilde', 1));
    if (q.on('wilde', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('wilde', 1); for (let i = 0; i < 60; i++) { const rood = i < 33 && rl > 0.01; const x = 200 + (i % 10) * 64, y = 330 + Math.floor(i / 10) * 70; wildeBij(ctx, x, y, 0.7, { a: rood ? 1 - 0.55 * rl : 1 }); if (rood) { ctx.save(); ctx.globalAlpha *= rl; circ(ctx, x, y + 6, 26, null, C.koraal, 2.5); ctx.restore(); } } ctx.restore(); }
    naamBij(ctx, 'ruim de helft op de Rode Lijst', null, 500, 790, rl, 'center', C.koraal);
    const du = q.on('Duitsland', 1); paneel(ctx, 940, 200, 880, 620, 'vliegende insecten · 63 natuurgebieden', du);
    if (du > 0.01) { ctx.save(); ctx.globalAlpha *= du; insectenval(ctx, 1110, 760, 1.1, 1); for (let k = 0; k < 6; k++) zweefvlieg(ctx, 1080 + Math.sin(t + k) * 120, 360 + Math.cos(t * 1.3 + k) * 40 + (k % 3) * 30, 0.7, { t: t + k, a: 1 - q.on('gewicht', 1) * (k < 4 ? 1 : 0) });
      const g = q.on('gewicht', 1, 1.4); balk(ctx, 1380, 380, 400, 1, C.oker, '1989', 1, 50); balk(ctx, 1380, 500, 400, 1 - 0.76 * g, C.koraal, '2016', 1, 50); tag(ctx, '− 76 %', 1580, 660, C.koraal, g, 'center', 34); ctx.restore(); }
    tag(ctx, 'zelfs in natuurgebieden', 1380, 160, C.goud, q.on('relatief', 1), 'center', 28); },

  s16(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Wat is de grootste oorzaak?', 960, 300, q.on('Wat', 1), C.text, 64, 'center', 700);
    { const o = q.on('oorzaak', 1); thermo(ctx, 560, 660, 200, 0.8, C.koraal, o); gifvat(ctx, 960, 620, 1, o); huisje(ctx, 1320, 690, 1, o); ctx.save(); ctx.globalAlpha *= o; ctx.fillStyle = '#5A6478'; ctx.fillRect(1250, 690, 180, 10); ctx.restore(); boomstam(ctx, 1440, 680, 0.5, o); ['a', 'b', 'c'].forEach((l, i) => regel(ctx, l, [560, 960, 1340][i], 790, o, C.goud, 40, 'center', 700)); } vraagteken(ctx, 960, 820, q.on('denk', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: veranderd land- en zeegebruik', 1 - q.on('twee', 1));
    const [A, B] = fasen(q, [null, ['twee', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const u = clamp((q.localT - q.at('Bos', 1)) / 3.5, 0, 1); const Wd = 1640, X = 140, Y = 560;
      for (let i = 0; i < 16; i++) { const x = X + i * Wd / 16 + 50; const om = u > i / 16; if (!om) { i % 2 ? den(ctx, x, Y, 170) : boom(ctx, x, Y, 0.6, 1); } else if (i % 4 === 0) huisje(ctx, x, Y, 0.9, 1); else if (i % 4 === 1) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 50, Y - 10, 100, 10); } else { ctx.fillStyle = '#B08A3C'; for (let k = 0; k < 3; k++) ctx.fillRect(x - 40, Y - 30 + k * 10, 80, 4); } }
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + Wd, Y); ctx.stroke();
      const dk = q.on('kwart', 1); balk(ctx, 460, 680, 1000, 0.75 * ease(dk / 1), C.koraal, '', dk, 50); regel(ctx, '± 3/4 van het land is flink veranderd', 960, 660, dk, C.text, 34, 'center', 600); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const R = [['1', 'land- en zeegebruik', null, 1, 1], ['2', 'oogsten: jacht, visserij', 'twee', 1, 0.8], ['3', 'klimaatverandering', 'drie', 2, 0.6], ['4', 'vervuiling', 'vier', 1, 0.45], ['5', 'invasieve exoten', 'vijf', 1, 0.35]];
      R.forEach(([n, s, w, k, v], i) => { const a = w ? q.on(w, k) : 1; if (a < 0.01) return; const y = 220 + i * 120; regel(ctx, n, 230, y + 46, a, C.goud, 48, 'center', 800); roundRect(ctx, 300, y, 900 * v * ease(a), 64, 12); shape(ctx, rgba(i === 0 ? C.koraal : C.oker, 0.5), i === 0 ? C.koraal : C.oker, 2); regel(ctx, s, 330, y + 44, a, C.text, 32, 'left', 600); });
      tag(ctx, 'in zee: overbevissing op 1', 1520, 300, C.teal, q.on('overbevissing', 1), 'center', 28); vis(ctx, 1520, 400, 1.6, { a: q.on('overbevissing', 1) });
      tag(ctx, 'wordt steeds belangrijker', 1520, 520, C.koraal, q.on('belangrijker', 1), 'center', 28); pijl(ctx, 1260, 520, 1340, 470, C.koraal, q.on('belangrijker', 1), 4, 16);
      metaText(ctx, 'volgorde naar IPBES 2019 · balken niet op schaal', 960, 860, C.text2, 'center', 26); ctx.restore(); } },

  // ---------- H4 ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['regenwoud', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const hl = q.on('biosfeer', 1) > 0.5 ? 'bio' : q.on('lithosfeer', 1) > 0.5 ? 'litho' : q.on('hydrosfeer', 1) > 0.5 ? 'hydro' : q.on('atmosfeer', 1) > 0.5 ? 'atmo' : null;
      sferen(ctx, 760, 500, 270, { hl: q.on('verbonden', 1) > 0.5 ? null : hl, t });
      [['atmosfeer', 'lucht', C.teal, 1180, 260], ['hydrosfeer', 'water', '#6FA4E0', 1180, 400], ['lithosfeer', 'bodem en gesteente', C.oker, 1180, 540], ['biosfeer', 'alles wat leeft', C.groen, 1180, 680]].forEach(([n, s, c, x, y]) => naamBij(ctx, n, s, x + 220, y, q.on(n, 1), 'left', c));
      tag(ctx, 'alles hangt samen', 760, 140, C.goud, q.on('verbonden', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const kap = clamp((q.localT - q.at('Kap', 1)) / 3, 0, 1); regenwoud(ctx, 260, 700, 1400, { kap, t });
      const v = q.on('verdampt', 1); for (let k = 0; k < 3; k++) { ctx.save(); ctx.globalAlpha *= v; golfPijl(ctx, 500 + k * 400, 460, 500 + k * 400, 300, C.teal, 1, t); ctx.restore(); } ctx.save(); ctx.globalAlpha *= v; metaText(ctx, 'minder verdamping', 1560, 400, C.teal, 'center', 28); ctx.restore();
      wolkje(ctx, 960, 250, 1.6, q.on('regen', 1)); tag(ctx, 'minder regen', 960, 140, C.teal, q.on('regen', 1), 'center', 28);
      co2Pijl(ctx, 1740, 640, 300, q.on('koolstofdioxide', 1), false); ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['2009', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; paneel(ctx, 160, 200, 1600, 560, 'temperatuur op aarde (schematisch)', 1); const X = 260, Y = 480, Wd = 1400;
      const u = clamp((q.localT - 0.3) / 3, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const x = X + i / 100 * Wd; const y = Y + (i < 12 ? 140 - i * 11 : Math.sin(i * 0.9) * 8 + Math.sin(i * 0.31) * 6) - (i > 96 ? (i - 96) * 9 : 0); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      metaText(ctx, 'ijstijd', X + 40, Y + 190, C.text2, 'left', 26); metaText(ctx, 'ruim 10.000 jaar geleden', X + 168, Y - 30, C.text2, 'left', 28); metaText(ctx, 'nu', X + Wd, Y + 230, C.text2, 'right', 26);
      tag(ctx, 'opvallend stabiel', X + Wd * 0.55, Y - 90, C.groen, q.on('stabiel', 1), 'center', 30);
      const lb = q.on('landbouw', 1); if (lb > 0.01) { graanaar(ctx, X + 400, Y + 150, 120, lb); huisje(ctx, X + 750, Y + 150, 0.9, q.on('dorpen', 1)); fabriek(ctx, X + 1100, Y + 160, 0.8, q.on('steden', 1)); }
      vraagteken(ctx, 960, 860, q.on('Hoeveel', 1), 0); tag(ctx, 'hoeveel kun je veranderen?', 960, 160, C.goud, q.on('Hoeveel', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; grenzenRad(ctx, 960, 500, 230, { grow: 0.4 * q.on('negen', 1, 1.5), labels: 0 }); tag(ctx, '2009 · negen planetaire grenzen', 960, 140, C.goud, 1, 'center', 32);
      naamBij(ctx, 'veilige zone', null, 1220, 330, q.on('veilige', 1), 'left', C.groen); const ib = q.on('Erbuiten', 1); if (ib > 0.01) { ctx.save(); ctx.globalAlpha *= ib; ctx.strokeStyle = C.koraal; ctx.setLineDash([10, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(960, 500, 330, 0, 6.283); ctx.stroke(); ctx.restore(); naamBij(ctx, 'grotere kans op plotselinge veranderingen', null, 960, 880 - 20, ib, 'center', C.koraal); } ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const cues = [['biosfeer', 1], ['Landgebruik', 1], ['zoet', 1], ['stikstof', 1], ['nieuwe', 1], ['verzuring', 1], ['klimaatverandering', 1], ['ozonlaag', 1], ['fijnstof', 1]];
    const toon = cues.filter(([w, n]) => q.on(w, n, 0.2) > 0.5).length; const gr = 0.4 + 0.6 * q.on('zeven', 1, 1.5);
    const samen = q.on('Ontbossing', 1); grenzenRad(ctx, 960, 480, 190, { toon, grow: gr, hl: samen > 0.01 ? [0, 1, 2, 6] : (toon > 0 && toon < 9 ? [toon - 1] : []), hlA: samen > 0.01 ? samen : 0.6 });
    wisselTekst(ctx, [['leven', 1, 'leven en land'], ['stoffen', 1, 'stoffen'], ['lucht', 1, 'lucht'], ['zeven', 1, '2025: zeven van de negen overschreden'], ['inschatting', 1, 'een inschatting, met marges'], ['samen', 1, 'de grenzen hangen samen']], q, 960, 120, C.goud, 30);
    metaText(ctx, 'schematisch · naar Planetary Health Check 2025', 960, 870, C.text2, 'center', 26); },

  s22(ctx, t, q) { bg(ctx, 'schema'); grenzenRad(ctx, 760, 480, 190, { grow: 1, hl: [7], hlA: q.on('ozonlaag', 1) }); tag(ctx, 'ozonlaag: binnen de grens', 760, 140, C.groen, q.on('ozonlaag', 1), 'center', 30); vraagteken(ctx, 1500, 560, q.on('denk', 1), 150); },

  s24(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a: samen afspreken', 1 - q.on('tachtig', 1));
    const gatT = clamp((q.localT - q.at('gat', 1)) / 2, 0, 1); const herstel = clamp((q.localT - q.at('herstelt', 1)) / 6, 0, 1); const gat = 0.35 + 0.65 * gatT - 0.6 * herstel;
    ozonKaart(ctx, 520, 470, 260, gat, q.on('tachtig', 1), herstel > 0.5 ? 'rond 2066: naar verwachting dicht' : 'jaren tachtig');
    metaText(ctx, 'Antarctica, van boven', 520, 180, C.grain, 'center', 30);
    const cf = q.on('Cfk', 1); spuitbus(ctx, 1080, 520, 1.6, cf); koelkast(ctx, 1320, 560, 1, cf); tag(ctx, 'cfk’s breken ozon af', 1200, 300, C.paars, cf * (1 - q.on('1987', 1)), 'center', 30);
    stempel(ctx, 1520, 300, '1987 · Montreal', C.groen, q.on('1987', 1)); kruis(ctx, 1080, 520, 50, q.on('verboden', 1)); kruis(ctx, 1320, 560, 60, q.on('verboden', 1));
    haak(ctx, 1000, 1760, 720, 'samenwerken werkt', C.groen, q.on('samenwerken', 1)); },

  s25(ctx, t, q) { bg(ctx, 'schema'); grenzenRad(ctx, 480, 500, 160, { grow: 1, hl: [0, 6], hlA: q.on('kern', 1), labels: 0.9 });
    const ux = q.on('uitsterven', 1); paneel(ctx, 980, 190, 840, 330, 'hoe snel soorten uitsterven', ux, C.koraal);
    if (ux > 0.01) { ctx.save(); ctx.globalAlpha *= ux; balk(ctx, 1040, 290, 700, 0.03, C.oker, 'gemiddeld, 10 miljoen jaar', 1, 44); balk(ctx, 1040, 400, 700, ease(clamp((q.localT - q.at('tientallen', 1)) / 1.5, 0, 1)), C.koraal, 'nu: minstens tientallen tot honderden keren sneller', 1, 44); metaText(ctx, 'niet op schaal', 1780, 505, C.text2, 'right', 26); ctx.restore(); }
    const pg = q.on('plantengroei', 1); paneel(ctx, 980, 560, 840, 290, 'alle plantengroei', pg, C.groen);
    if (pg > 0.01) { ctx.save(); ctx.globalAlpha *= pg; for (let i = 0; i < 10; i++) plantje(ctx, 1060 + i * 72, 790, 1.1, 1); const mu = q.on('gebruikt', 1); ctx.save(); ctx.globalAlpha *= mu; roundRect(ctx, 1030, 650, 230, 160, 12); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.restore(); regel(ctx, 'mens', 1145, 640, mu, C.koraal, 28, 'center', 700); regel(ctx, 'de rest van het leven', 1560, 640, q.on('rest', 1), C.groen, 28, 'center', 700); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); const kap = q.on('gekapt', 1, 2), br = q.on('brandde', 1), dr = q.on('droger', 1, 2);
    tag(ctx, 'zuidoosten van het Amazonegebied', 960, 140, C.goud, q.on('Amazonegebied', 1), 'center', 30);
    regenwoud(ctx, 200, 720, 1520, { kap: kap * 0.6, droog: dr, t });
    if (br > 0.01) for (let k = 0; k < 5; k++) vlam(ctx, 420 + k * 280, 720, 90 + (k % 2) * 30, br * (1 - 0.5 * dr), t);
    const kf = q.on('koolstof', 1); co2Pijl(ctx, 700, 260, 440, kf, true); co2Pijl(ctx, 1220, 460, 220, kf, false); ctx.save(); ctx.globalAlpha *= kf; metaText(ctx, 'opname', 700, 230, C.groen, 'center', 26); metaText(ctx, 'afgifte (groter)', 1220, 190, C.koraal, 'center', 26); ctx.restore();
    metaText(ctx, '2010–2018', 960, 830, C.grain, 'center', 28); vraagteken(ctx, 1600, 380, q.on('denk', 1), 130); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: sterker', 1 - q.on('heet', 1));
    const act = clamp((q.localT - q.at('Meer', 1)) / 7, 0, 1); lus(ctx, 760, 500, 250, ['meer CO₂', 'meer opwarming', 'droger bos', 'minder opname'], act, 1, t);
    const pt = q.on('positieve', 1); kolom(ctx, 1220, 300, 560, 360, 'positieve terugkoppeling', 'versterkend', C.koraal, pt); regel(ctx, 'positief = versterkend,', 1500, 500, q.on('betekent', 1), C.text, 32, 'center', 600); regel(ctx, 'niet ‘goed’', 1500, 550, q.on('betekent', 1), C.koraal, 32, 'center', 700); },

  s29(ctx, t, q) { bg(ctx, 'schema'); const mn = q.on('appels', 1); ontbijt(ctx, 760, 700, 1, { appelA: 1 - mn }); appel(ctx, 960, 676, 1, 1 - mn); appel(ctx, 1020, 676, 1, 1 - mn); appel(ctx, 1020, 670, 1.1, 1); persoon(ctx, LOTTE, 300, 860, 470, { t, uit: q.on('minder', 1) > 0.5 && q.localT < q.at('luxe', 1) ? 'verbaasd' : 'blij', pose: 'staan', kijk: 1 });
    { const pr = q.on('duurder', 1); if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; roundRect(ctx, 1080, 560, 120, 60, 10); shape(ctx, '#E8EDF2', '#9AA3B2', 2); regel(ctx, '€ ↑', 1140, 602, 1, C.koraal, 34, 'center', 800); ctx.restore(); } }
    wisselTekst(ctx, [['honger', 1, 'geen honger'], ['minder', 1, 'wel minder appels, minder vitamines'], ['duurder', 1, 'en een duurder ontbijt'], ['luxe', 1, 'biodiversiteit is geen luxe']], q, 760, 480, C.goud, 32);
    const hg = q.on('hangen', 1); if (hg > 0.01) { appel(ctx, 1380, 400, 1.4, hg); druppel(ctx, 1560, 400, 1.4, hg); thermo(ctx, 1720, 450, 120, 0.4, C.groen, hg); metaText(ctx, 'voedsel · water · klimaat', 1560, 520, C.grain, 'center', 28); } },

  s30(ctx, t, q) { bg(ctx, 'schema'); const pw = 410, gap = 30, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 170, ph = 620;
    const P = [['drie niveaus', 'genen · soorten · ecosystemen', 'onthouden', C.paars], ['diensten', 'leveren · regelen · beleven', 'Ecosysteemdiensten', C.teal], ['grootste oorzaak', 'land- en zeegebruik', 'oorzaak', C.koraal], ['negen grenzen', 'zeven overschreden', 'grenzen', C.groen]];
    P.forEach(([ti, sub, w, c], i) => { const a = q.on(w, 1); const x = x0 + i * (pw + gap); kolom(ctx, x, y0, pw, ph, ti, '', c, a); if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a; tekstBlok(ctx, sub, x + 30, y0 + 470, pw - 60, 28, C.text, 1, 1.3, 600);
      if (i === 0) { appel(ctx, x + 110, y0 + 230, 1.2); hommel(ctx, x + 300, y0 + 220, 0.9, { t }); den(ctx, x + 200, y0 + 400, 120); }
      if (i === 1) { bij(ctx, x + 110, y0 + 250, 1, 0, { t }); druppel(ctx, x + 300, y0 + 250, 1.2); persoon(ctx, LOTTE, x + 205, y0 + 440, 170, { t, uit: 'blij' }); }
      if (i === 2) { for (let k = 0; k < 5; k++) { k % 2 ? den(ctx, x + 70 + k * 70, y0 + 330, 110) : huisje(ctx, x + 70 + k * 70, y0 + 330, 0.6, 1); } }
      if (i === 3) grenzenRad(ctx, x + pw / 2, y0 + 290, 105, { grow: 1, labels: 0 });
      ctx.restore(); });
    tag(ctx, 'de ozonlaag: het kan ook goed gaan', 960, 880 - 30, C.groen, q.on('goede', 1), 'center', 28); },
});

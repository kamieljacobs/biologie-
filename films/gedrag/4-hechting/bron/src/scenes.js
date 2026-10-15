// Gedrag 4 · Hechting: van baby tot verliefd — scènes per alinea (v1.0, 15 okt 2026).
// Rode draad: Mila en Ties in de Vreemde Situatie (eigen figuurtjes, geen castpersonages), Harlows aapjes
// met draad- en doekmoeder, drie hechtingspatronen, en Lotte (castboek) met een onbeantwoord appje.

const HUID = '#E3B998', HUID2 = '#C98E64', AAP = '#9A7A5A', AAPG = '#E8B8A8', DOEK = '#D8C8B0', DRAAD = '#A8B0B8';
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }

// ---------- figuren ----------
// volwassene (eenvoudig, geen castpersonage): x,y = voeten
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
function speelgoed(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); [['#D8503C', 0, 0], ['#4E8FBE', 44, 0], ['#E0B64A', 22, -40]].forEach(([c, bx, by]) => { roundRect(ctx, bx - 20, by - 40, 40, 40, 5); shape(ctx, c, null); }); circ(ctx, 110, -24, 24, '#5EAF6A'); ctx.restore(); }
// mini-speelkamer met kind en ouder; momIn: 0 = weg, 1 = binnen; dicht: kind dicht bij ouder
function kamer(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, naam = '', momIn = 1, huil = 0, dicht = 0, kijkOp = 1, trui = '#E0A040', haar = '#6A4A34', blij = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, '#3A3448', C.line, 2); ctx.fillStyle = '#5A4A3A'; ctx.fillRect(x + 4, y + h * 0.72, w - 8, h * 0.28 - 4);
  // deur
  ctx.fillStyle = '#2A2434'; ctx.fillRect(x + w - 130, y + h * 0.72 - 260, 100, 260); ctx.strokeStyle = '#7A6A5A'; ctx.lineWidth = 3; ctx.strokeRect(x + w - 130, y + h * 0.72 - 260, 100, 260);
  // spiegelwand
  ctx.fillStyle = rgba('#9FC8E0', 0.18); ctx.fillRect(x + 30, y + 40, 260, 150); ctx.strokeStyle = rgba('#9FC8E0', 0.6); ctx.strokeRect(x + 30, y + 40, 260, 150); metaText(ctx, 'spiegelwand', x + 40, y + 212, C.text2, 'left', 16);
  speelgoed(ctx, x + 120, y + h * 0.72 + 50, 0.9);
  const fy = y + h * 0.72 + 70; const mx = lerp(x + w - 80, x + w * 0.62, momIn); if (momIn > 0.02) ouder(ctx, mx, fy, 330, { t, loop: momIn > 0.05 && momIn < 0.95 ? 1 : 0, a: clamp(momIn * 3, 0, 1), armen: dicht, flip: -1 });
  const kx = lerp(x + w * 0.36, x + w * 0.56, dicht); peuter(ctx, kx, fy - 10, 0.9, { t, huil, kijk: kijkOp, trui, haar, blij, armen: dicht });
  regel(ctx, naam, x + w / 2, y + h - 18, 1, C.text, 30, 'center', 700);
  ctx.restore(); }
// rhesusaapje
function aapje(ctx, x, y, s, o = {}) { const { a = 1, t = 0, flip = 1, bang = 0, klem = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  ctx.strokeStyle = AAP; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 10); ctx.quadraticCurveTo(-60, 30, -50, 60); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 36, 30, 0, 0, 6.283); shape(ctx, AAP, null);
  ctx.strokeStyle = AAP; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(20, -10); ctx.lineTo(44 + 10 * klem, -30 - 10 * klem); ctx.moveTo(-10, 20); ctx.lineTo(-14, 44); ctx.moveTo(14, 20); ctx.lineTo(20, 44); ctx.stroke();
  circ(ctx, 30, -36, 26, AAP); circ(ctx, 38, -32, 17, AAPG); circ(ctx, 34, -38, 3.5, '#121A26'); circ(ctx, 46, -38, 3.5, '#121A26'); circ(ctx, 10, -48, 9, AAPG);
  if (bang > 0.5) { ctx.strokeStyle = '#121A26'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(41, -24, 5, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }
function draadmoeder(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = DRAAD; ctx.lineWidth = 3; roundRect(ctx, x - 70, y - 300, 140, 300, 20); ctx.stroke(); for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 70, y - 300 + i * 37); ctx.lineTo(x + 70, y - 300 + i * 37); ctx.stroke(); } for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 70 + i * 35, y - 300); ctx.lineTo(x - 70 + i * 35, y); ctx.stroke(); }
  circ(ctx, x, y - 350, 46, null, DRAAD, 3); circ(ctx, x - 16, y - 356, 6, DRAAD); circ(ctx, x + 16, y - 356, 6, DRAAD);
  roundRect(ctx, x + 50, y - 230, 40, 80, 10); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = '#C9C9C2'; ctx.fillRect(x + 62, y - 248, 16, 20); ctx.restore(); }
function doekmoeder(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 75, y - 300, 150, 300, 50); shape(ctx, DOEK, '#B8A890', 3); ctx.strokeStyle = rgba('#B8A890', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(x - 50 + (i % 4) * 34, y - 270 + Math.floor(i / 4) * 70, 10, 0, Math.PI); ctx.stroke(); }
  circ(ctx, x, y - 350, 50, DOEK, '#B8A890', 3); circ(ctx, x - 18, y - 356, 8, '#4A3A2A'); circ(ctx, x + 18, y - 356, 8, '#4A3A2A'); ctx.strokeStyle = '#8A6A5A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 338, 14, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore(); }
function kooi(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba('#2A3446', 0.6), '#5A6478', 3); ctx.fillStyle = '#4A4038'; ctx.fillRect(x + 4, y + h - 40, w - 8, 36); ctx.restore(); }
function enger(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); roundRect(ctx, -40, -110, 80, 110, 14); shape(ctx, '#8A5A3A', null); circ(ctx, 0, -140, 34, '#8A5A3A'); circ(ctx, -12, -146, 6, '#F2F2EE'); circ(ctx, 12, -146, 6, '#F2F2EE'); roundRect(ctx, -34, -70, 68, 30, 6); shape(ctx, '#D8503C', '#F2D27A', 2); const b = Math.sin(t * 16) * 14; ctx.strokeStyle = '#C9C2B2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, -80); ctx.lineTo(-56, -60 - b); ctx.moveTo(40, -80); ctx.lineTo(56, -60 + b); ctx.stroke(); ctx.restore(); }
function hartslag(ctx, x, y, w, h, t, hoog, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); const per = lerp(110, 60, hoog); for (let px = 0; px <= w; px += 2) { const ph = ((px + t * 120) % per) / per; const v = ph > 0.45 && ph < 0.5 ? -1 : ph >= 0.5 && ph < 0.55 ? 0.6 : 0; const py = y + h / 2 + v * h * 0.45; px ? ctx.lineTo(x + px, py) : ctx.moveTo(x, py); } ctx.stroke(); ctx.restore(); }
function bril(ctx, x, y, s, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; circ(ctx, x - 70 * s, y, 56 * s, rgba(col, 0.12), col, 8); circ(ctx, x + 70 * s, y, 56 * s, rgba(col, 0.12), col, 8); ctx.beginPath(); ctx.moveTo(x - 14 * s, y - 6 * s); ctx.quadraticCurveTo(x, y - 20 * s, x + 14 * s, y - 6 * s); ctx.moveTo(x - 126 * s, y - 10 * s); ctx.lineTo(x - 170 * s, y - 30 * s); ctx.moveTo(x + 126 * s, y - 10 * s); ctx.lineTo(x + 170 * s, y - 30 * s); ctx.stroke(); ctx.restore(); }
function telefoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 200 * s, 380 * s, 24 * s); shape(ctx, '#1A1E28', '#9AA3B2', 3); ctx.fillStyle = '#E8ECF0'; ctx.fillRect(x + 12 * s, y + 30 * s, 176 * s, 310 * s); ctx.restore(); }
function hartje(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-26, -8, -12, -30, 0, -14); ctx.bezierCurveTo(12, -30, 26, -8, 0, 10); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
const STIJL = [['veilig', 'zoekt troost bij terugkomst, kalmeert snel', C.groen], ['onveilig-vermijdend', 'lijkt rustig, kijkt nauwelijks op', C.teal], ['onveilig-ambivalent', 'blijft huilen, klampt zich vast en is boos', C.koraal]];

// =======================================================================================
const SCENES = {
  title(ctx, t) { ouder(ctx, 1460, 860, 420, { t, armen: 1, flip: -1 }); peuter(ctx, 1380, 640, 0.75, { t, blij: 1, armen: 1 }); hartje(ctx, 1420, 380, 2.2, 0.6 + 0.4 * Math.sin(t * 2)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const weg = q.on('weg', 1, 1.2), terug = q.on('terug', 1, 1.2), kr = q.on('kruipt', 1, 1.0), sp = q.on('speelt', 2, 1.0);
    kamer(ctx, 100, 140, 820, 680, { t, naam: 'Mila', momIn: 1 - weg + terug, huil: q.on('huilt', 1) * (1 - q.on('troosten', 1)), dicht: kr * (1 - sp), blij: sp, kijkOp: 1 });
    const ti = q.on('Ties', 1, 0.8), w2 = q.on('weggaat', 1, 1.2), t2 = q.on('terugkomt', 1, 1.2);
    kamer(ctx, 1000, 140, 820, 680, { t, naam: 'Ties', a: ti, momIn: 1 - w2 + t2, trui: '#5E9F7A', haar: '#C9A26A', kijkOp: 1 });
    tag(ctx, 'speelt gewoon door', 1410, 120, C.teal, q.on('door', 1) * (1 - q.on('nauwelijks', 1))); tag(ctx, 'kijkt nauwelijks op', 1410, 120, C.teal, q.on('nauwelijks', 1));
    tag(ctx, 'huilt', 510, 120, C.koraal, q.on('huilt', 1) * (1 - q.on('terug', 1))); tag(ctx, 'laat zich troosten, speelt verder', 510, 120, C.groen, q.on('troosten', 1));
    vraagteken(ctx, 960, 520, q.on('Welk', 1), 130); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const inp = q.on('inprenting', 1, 0.8);
    card(ctx, 160, 130, 1600, 130, 'hechting', 'de emotionele band tussen een kind en een vaste verzorger', q.on('Hechting', 1) * (1 - inp), C.goud);
    if (inp < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - inp;
      peuter(ctx, 620, 720, 1.2, { t, huil: q.on('huilen', 1) * (1 - q.on('lachen', 1)), blij: q.on('lachen', 1), armen: q.on('vastgrijpen', 1) });
      [['huilen', 'huilen', 380, 360], ['lachen', 'lachen', 620, 330], ['vastgrijpen', 'vastgrijpen', 860, 360]].forEach(([w, s, x, y]) => tag(ctx, s, x, y, C.goud, q.on(w, 1), 'center', 30));
      ouder(ctx, 1300, 840, 420, { t, a: q.on('volwassenen', 1), flip: -1, armen: q.on('signalen', 1) * 0.6 }); pijl(ctx, 800, 560, 1150, 560, C.goud, q.on('signalen', 1), 4, 18); regel(ctx, 'gevoelig voor de signalen', 980, 530, q.on('signalen', 1), C.text2, 26, 'center', 600);
      regel(ctx, 'John Bowlby · psychiater', 1480, 340, q.on('Bowlby', 1), C.text, 32, 'left', 700); tag(ctx, 'functie: beter beschermd tegen gevaar', 1600, 430, C.groen, q.on('functie', 1), 'center', 28);
      ctx.restore(); }
    if (inp > 0.01) { ctx.save(); ctx.globalAlpha *= inp;
      card(ctx, 160, 140, 760, 320, 'inprenting (gansje)', 'in een paar uur, vast tijdvenster, één \'moeder\'', 1, C.text2);
      card(ctx, 1000, 140, 760, 320, 'hechting (mens)', 'groeit langzaam in de eerste jaren, aan meerdere mensen', q.on('langzamer', 1), C.goud);
      const fig = [['vader', '#4A6A8A', '#3A2A20', 0], ['opa', '#7A7A6A', '#D9D9D4', 0], ['pleegouder', '#8A5A7A', '#4A2E20', 1]];
      fig.forEach(([nm, jas, haar, lang], i) => { const a = q.on(nm, 1); ouder(ctx, 560 + i * 400, 880, 300, { a, jas, haar, lang, t }); regel(ctx, nm, 560 + i * 400, 900 - 0, a, C.text, 26, 'center', 700); });
      regel(ctx, 'hechtingsfiguur: niet alleen de moeder', 960, 530, q.on('moeder', 1), C.goud, 32, 'center', 700);
      ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Harry Harlow · rhesusaapjes', 140, 140, 1, C.text, 36, 'left', 700);
    kooi(ctx, 260, 220, 1400, 640, 1);
    draadmoeder(ctx, 560, 820, q.on('ijzerdraad', 1)); regel(ctx, 'draad + melk', 560, 400, q.on('melk', 1), C.text2, 30, 'center', 700);
    doekmoeder(ctx, 1360, 820, q.on('zachte', 1)); regel(ctx, 'zachte stof, geen melk', 1360, 400, q.on('zachte', 1), C.text2, 30, 'center', 700);
    aapje(ctx, 960, 780, 1.4, { t });
    vraagteken(ctx, 960, 560, q.on('Wat', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const vz = q.on('verzorger', 1, 0.8);
    if (vz < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - vz; kooi(ctx, 260, 160, 1400, 700);
      draadmoeder(ctx, 560, 820); doekmoeder(ctx, 1360, 820);
      const dr = q.on('dronken', 1), kl = q.on('klampten', 1, 1.2), bang = q.on('bang', 1, 0.6), ren = q.on('renden', 1, 0.8), ver = q.on('verkennen', 1, 1.5);
      let ax = lerp(960, 640, dr), ay = lerp(780, 620, dr); ax = lerp(ax, 1300, kl); ay = lerp(ay, 560, kl); ax = lerp(ax, 1000, ver); ay = lerp(ay, 790, ver);
      aapje(ctx, ax, ay, 1.3, { t, flip: kl > 0.5 && ver < 0.5 ? -1 : 1, klem: kl * (1 - ver), bang: bang * (1 - q.on('kalmeerden', 1)) });
      enger(ctx, 900, 840, bang * (1 - q.on('kalmeerden', 1, 1.5)), t);
      // tijd per dag
      if (q.on('urenlang', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('urenlang', 1) * (1 - q.on('bang', 1)); roundRect(ctx, 700, 190, 520, 170, 12); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); metaText(ctx, 'tijd per dag', 720, 220, C.text2, 'left', 18); ctx.fillStyle = rgba(DRAAD, 0.8); ctx.fillRect(860, 240, 20, 36); regel(ctx, 'draad: < 1 uur', 900, 268, 1, C.text, 24, 'left', 600); ctx.fillStyle = rgba(DOEK, 0.9); ctx.fillRect(860, 296, 340 * 0.95, 36); regel(ctx, 'doek: ± 17 uur', 720, 324, 1, C.text, 24, 'left', 600); ctx.restore(); }
      tag(ctx, 'troost is belangrijker dan voedsel', 960, 130, C.goud, q.on('Contact', 1));
      ctx.restore(); }
    if (vz > 0.01) { ctx.save(); ctx.globalAlpha *= vz;
      // veilige haven: pijlen naar binnen; veilige basis: pijlen naar buiten
      const hv = q.on('haven', 1), bs = q.on('basis', 1);
      ctx.save(); ctx.globalAlpha *= hv; circ(ctx, 560, 480, 120, rgba(C.teal, 0.15), C.teal, 3); doekmoeder(ctx, 560, 560, 0.0); ouder(ctx, 560, 560, 230, { t, flip: 1 }); for (let i = 0; i < 4; i++) { const an = i * Math.PI / 2 + 0.6; pijl(ctx, 560 + Math.cos(an) * 260, 480 + Math.sin(an) * 230, 560 + Math.cos(an) * 140, 480 + Math.sin(an) * 130, C.teal, 1, 4, 16); } regel(ctx, 'veilige haven', 560, 800, 1, C.teal, 36, 'center', 700); regel(ctx, 'terug als je bang bent', 560, 846, 1, C.text2, 26, 'center', 600); ctx.restore();
      ctx.save(); ctx.globalAlpha *= bs; circ(ctx, 1360, 480, 120, rgba(C.goud, 0.15), C.goud, 3); ouder(ctx, 1360, 560, 230, { t, flip: -1 }); for (let i = 0; i < 4; i++) { const an = i * Math.PI / 2 + 0.6; pijl(ctx, 1360 + Math.cos(an) * 140, 480 + Math.sin(an) * 130, 1360 + Math.cos(an) * 260, 480 + Math.sin(an) * 230, C.goud, 1, 4, 16); } regel(ctx, 'veilige basis', 1360, 800, 1, C.goud, 36, 'center', 700); regel(ctx, 'van daaruit ontdekken', 1360, 846, 1, C.text2, 26, 'center', 600); ctx.restore();
      tag(ctx, 'aapjes zonder moeder: later grote problemen', 960, 140, C.koraal, q.on('problemen', 1) * (1 - q.on('ethische', 1))); tag(ctx, 'nu om ethische redenen niet meer toegestaan', 960, 140, C.text2, q.on('ethische', 1));
      ctx.restore(); } },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const an = q.on('Antwoord', 1, 0.8), fo = q.on('fouten', 1, 0.8), vs = q.on('verschil', 1, 0.8);
    if (an < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - an; regel(ctx, 'Mary Ainsworth · de Vreemde Situatie', 140, 140, q.on('Ainsworth', 1), C.text, 36, 'left', 700);
      const ST = [['ouder + kind', 0], ['vreemde komt erbij', 0], ['afscheid 1', 1], ['ouder terug', 2], ['afscheid 2', 1], ['ouder terug', 2]];
      const al = clamp((t - q.at('kind')) / 5, 0, 1); ST.forEach(([s, k], i) => { const a = clamp(al * 6 - i, 0, 1); if (a <= 0) return; const x = 140 + i * 280, hl = k === 2 ? q.on('terugkomt', 1) : 0; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 300, 250, 120, 14); shape(ctx, rgba(k === 1 ? C.koraal : k === 2 ? C.groen : C.teal, 0.12 + 0.2 * hl), k === 1 ? C.koraal : k === 2 ? C.groen : C.teal, 1.5 + 2 * hl); text(ctx, s, x + 125, 370, fTekst(26, 600), C.text, 'center'); ctx.restore(); if (i < 5) pijl(ctx, x + 252, 360, x + 276, 360, C.line, a, 3, 10); });
      metaText(ctx, '± 20 minuten · kind van een jaar · onbekende kamer', 140, 470, C.text2, 'left', 20);
      tag(ctx, 'huilen bij het afscheid zegt weinig', 700, 620, C.text2, q.on('huilt', 1)); tag(ctx, 'het gaat om de terugkomst', 1240, 720, C.groen, q.on('terugkomt', 1));
      ctx.restore(); }
    if (an > 0.01 && fo < 0.99) { ctx.save(); ctx.globalAlpha *= an * (1 - fo);
      STIJL.forEach(([nm, s, col], i) => { const a = [q.on('veilig', 1), q.on('onveilig-vermijdende', 1), q.on('onveilig-ambivalente', 1)][i]; if (a <= 0.01) return; const x = 140 + i * 560; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 180, 520, 640, 18); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, nm, x + 260, 240, fTekst(34, 700), col, 'center'); ctx.font = fTekst(26, 600); ctx.fillStyle = C.text; ctx.textAlign = 'center'; wrap(ctx, s, x + 260, 290, 440, 34); ctx.textAlign = 'left';
        peuter(ctx, x + 260, 640, 1.1, { t, blij: i === 0 ? 1 : 0, huil: i === 2 ? 1 : 0, trui: i === 1 ? '#5E9F7A' : i === 2 ? '#8A7ABF' : '#E0A040', haar: i === 1 ? '#C9A26A' : '#6A4A34', kijk: i === 1 ? -1 : 1 });
        if (i === 1) { const hs = q.on('hartslag', 1); regel(ctx, 'hartslag', x + 40, 700, hs, C.koraal, 22, 'left', 700); hartslag(ctx, x + 40, 720, 440, 70, t, hs, hs); }
        ctx.restore(); });
      ctx.restore(); }
    if (fo > 0.01 && vs < 0.99) { ctx.save(); ctx.globalAlpha *= fo * (1 - vs); regel(ctx, 'geen fouten van het kind', 960, 400, 1, C.text, 48, 'center', 700); regel(ctx, 'slimme aanpassingen: wat werkt bij déze verzorger?', 960, 480, q.on('aanpassingen', 1), C.goud, 36, 'center', 700); ctx.restore(); }
    if (vs > 0.01) { ctx.save(); ctx.globalAlpha *= vs;
      peuter(ctx, 360, 640, 1.1, { t, huil: q.on('fijngevoelig', 1) > 0.5 ? 0 : 1, blij: q.on('fijngevoelig', 1) > 0.5 ? 1 : 0 }); ouder(ctx, 820, 760, 420, { t, flip: -1, armen: q.on('passend', 1) * 0.8 });
      const st = [['ziet', 'ziet wat het kind nodig heeft'], ['tijd', 'reageert op tijd'], ['passend', 'en passend']]; st.forEach(([w, s], i) => { vink_(ctx, 1090, 250 + i * 64, 14, q.on(w, 1)); regel(ctx, s, 1120, 262 + i * 64, q.on(w, 1), C.text, 32, 'left', 600); });
      tag(ctx, 'fijngevoelig', 1290, 480, C.goud, q.on('fijngevoelig', 1)); regel(ctx, 'niet perfect · vaak genoeg', 1120, 560, q.on('perfect', 1), C.text2, 28, 'left', 600);
      const fac = [['geldproblemen', 'geldproblemen'], ['ziekte', 'ziekte'], ['scheiding', 'scheiding'], ['karakter', 'karakter van het kind']]; fac.forEach(([w, s], i) => tag(ctx, s, 1180 + (i % 2) * 330, 680 + Math.floor(i / 2) * 80, C.text2, q.on(w, 1), 'center', 26));
      regel(ctx, 'niet de enige factor', 1120, 620, q.on('enige', 1), C.koraal, 28, 'left', 700);
      ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'één meting van ± 20 minuten, in een lab', 140, 140, 1, C.text, 34, 'left', 700);
    const L = [['Duitsland', [57, 35, 8], 'Duitsland'], ['Japan', [68, 5, 27], 'Japan'], ['VS', [65, 21, 14], 'Toch']];
    L.forEach(([nm, v, cue], i) => { const a = q.on(cue, 1); if (a <= 0.01) return; const y = 300 + i * 160; ctx.save(); ctx.globalAlpha *= a; regel(ctx, nm, 400, y + 52, 1, C.text, 32, 'right', 700); let x = 440; v.forEach((p, k) => { const w = p * 11; ctx.fillStyle = rgba(STIJL[k][2], 0.55); ctx.fillRect(x, y, w, 76); ctx.strokeStyle = STIJL[k][2]; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, 76); if (p > 7) text(ctx, p + '%', x + w / 2, y + 48, fTekst(24, 700), C.text, 'center'); x += w; }); ctx.restore(); });
    STIJL.forEach(([nm, , col], k) => { ctx.fillStyle = rgba(col, 0.55); ctx.fillRect(440 + k * 360, 800, 30, 30); regel(ctx, nm.replace('onveilig-', ''), 480 + k * 360, 826, 1, C.text2, 24, 'left', 600); });
    metaText(ctx, 'ongeveer, naar Van IJzendoorn & Kroonenberg (1988)', 1780, 880, C.text2, 'right', 16);
    tag(ctx, 'veilig is overal het meest', 1300, 240, C.groen, q.on('meest', 1)); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const lo = q.on('Lotte', 1, 0.8), on = q.on('Onderzoekers', 1, 0.8);
    if (lo < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - lo; bril(ctx, 960, 380, 1.4, q.on('binnenwerkmodel', 1)); regel(ctx, 'binnenwerkmodel', 960, 220, q.on('binnenwerkmodel', 1), C.goud, 44, 'center', 700);
      regel(ctx, 'Ben ik de moeite waard?', 760, 560, q.on('moeite', 1), C.text, 34, 'center', 700); regel(ctx, 'Kan ik op anderen rekenen?', 1180, 640, q.on('rekenen', 1), C.text, 34, 'center', 700);
      hartje(ctx, 960, 780, 2.4, q.on('verliefd', 1)); ctx.restore(); }
    if (lo > 0.01 && on < 0.99) { ctx.save(); ctx.globalAlpha *= lo * (1 - on);
      persoon(ctx, 'lotte', 300, 880, 560, { uit: q.on('veilig', 1) > 0.5 ? 'denkt' : 'neutraal', pose: 'staan', kijk: 1, t });
      telefoon(ctx, 470, 360, 0.8, q.on('appje', 1)); if (q.on('appje', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('appje', 1); roundRect(ctx, 520, 420, 130, 50, 12); shape(ctx, '#7AC88A', null); text(ctx, 'hoi! :)', 585, 454, fTekst(22, 600), '#121A26', 'center'); ctx.restore(); }
      tag(ctx, '1 uur later: geen antwoord', 560, 300, C.text2, q.on('antwoord', 1), 'center', 26);
      wolk(ctx, 820, 170, 430, 150, 'die ander is vast druk', q.on('veilig', 1), '#D8F0DC'); regel(ctx, 'veilig', 1035, 360, q.on('veilig', 1), C.groen, 26, 'center', 700);
      wolk(ctx, 1300, 300, 520, 170, 'die vindt me vast niet leuk meer (+3 appjes)', q.on('angstig', 1), '#F6DCD6'); regel(ctx, 'angstig', 1560, 510, q.on('angstig', 1), C.koraal, 26, 'center', 700);
      wolk(ctx, 860, 560, 470, 150, 'maakt niet uit, ik red me wel alleen', q.on('vermijdend', 1), '#D6E8F0'); regel(ctx, 'vermijdend', 1095, 750, q.on('vermijdend', 1), C.teal, 26, 'center', 700);
      ctx.restore(); }
    if (on > 0.01) { ctx.save(); ctx.globalAlpha *= on; regel(ctx, 'volwassenen in liefdesrelaties', 960, 200, 1, C.text, 40, 'center', 700);
      STIJL.forEach(([nm, , col], k) => { const x = 360 + k * 600; circ(ctx, x, 420, 110, rgba(col, 0.15), col, 3); regel(ctx, ['veilig', 'vermijdend', 'angstig'][k], x, 432, 1, col, 34, 'center', 700); });
      tag(ctx, 'niet per se hetzelfde patroon als als baby', 960, 640, C.text2, q.on('betekent', 1));
      // mengbalk
      if (q.on('beetje', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('beetje', 1); let x = 560; [[0.55, C.groen], [0.2, C.teal], [0.25, C.koraal]].forEach(([p, col]) => { ctx.fillStyle = rgba(col, 0.6); ctx.fillRect(x, 720, 800 * p, 50); x += 800 * p; }); regel(ctx, 'van alles een beetje', 960, 820, 1, C.text, 30, 'center', 700); ctx.restore(); }
      vraagteken(ctx, 1700, 760, q.on('klopt', 1), 100); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const me = q.on('emotie', 1, 0.8);
    if (me < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - me;
      tag(ctx, 'verband: ja · sterk: nee', 960, 150, C.text2, q.on('verband', 1) * (1 - q.on('vonnis', 1))); tag(ctx, 'hechting is geen vonnis', 960, 150, C.goud, q.on('vonnis', 1));
      // pad dat buigt van onveilig naar veiliger
      const pg = clamp((t - q.at('vriendschappen')) / 6, 0, 1); ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(240, 760); for (let i = 1; i <= 60 * Math.max(pg, 0.15); i++) { const u = i / 60; ctx.lineTo(240 + u * 1440, 760 - 420 * Math.pow(u, 1.6)); } ctx.stroke();
      regel(ctx, 'onveilig', 240, 820, 1, C.koraal, 30, 'center', 700); regel(ctx, 'veiliger', 1680, 300, pg, C.groen, 34, 'center', 700);
      [['vriendschappen', 'goede vriendschappen', 0.25], ['betrouwbare', 'betrouwbare mensen', 0.5], ['psycholoog', 'hulp van een psycholoog', 0.75]].forEach(([w, s, u]) => { const a = q.on(w, 1); const x = 240 + u * 1440, y = 760 - 420 * Math.pow(u, 1.6); circ(ctx, x, y, 14 * a, C.goud); tag(ctx, s, x, y + 70, C.goud, a, 'center', 26); });
      tag(ctx, 'herkennen: oh, dit is mijn manier van reageren', 960, 250, C.teal, q.on('herkennen', 1), 'center', 28);
      ctx.restore(); }
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me; regel(ctx, 'volgende film', 960, 380, 1, C.text2, 30, 'center', 600); text(ctx, 'Emotieregulatie', 960, 470, fTitel(64), C.goud, 'center'); regel(ctx, 'wat doe je als een emotie je overspoelt?', 960, 540, 1, C.text, 32, 'center', 600); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'troost > voedsel', q.on('troost', 1), (x) => { ctx.save(); ctx.translate(x + 200, 700); ctx.scale(0.7, 0.7); ctx.translate(-(x + 200), -700); doekmoeder(ctx, x + 200, 700); aapje(ctx, x + 250, 540, 1.3, { t, flip: -1, klem: 1 }); ctx.restore(); });
    panel(1, 'kijk naar de terugkomst', q.on('terugkomt', 1), (x) => { ouder(ctx, x + 270, 700, 300, { t, armen: 1, flip: -1 }); peuter(ctx, x + 170, 690, 0.8, { t, blij: 1, armen: 1 }); });
    panel(2, 'drie patronen', q.on('opbouwt', 1), (x) => { STIJL.forEach(([nm, , col], k) => { circ(ctx, x + 200, 360 + k * 120, 48, rgba(col, 0.2), col, 2); regel(ctx, nm.replace('onveilig-', ''), x + 200, 368 + k * 120, 1, col, 22, 'center', 700); }); });
    panel(3, 'kan veranderen', q.on('veranderen', 1), (x) => { bril(ctx, x + 200, 400, 0.8, 1); pijl(ctx, x + 80, 640, x + 320, 520, C.groen, 1, 6, 20); });
    tag(ctx, 'verwachtingen neem je mee naar latere relaties', 960, 850, C.goud, q.on('relaties', 1)); },
};

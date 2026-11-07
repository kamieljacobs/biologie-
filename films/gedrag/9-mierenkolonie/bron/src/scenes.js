// Gedrag 9 · Een mierenkolonie zonder baas — scènes per alinea (v1.0, 15 okt 2026). Sam en een mierenstraat; nest in doorsnede; geurspoor; dubbele brug; zelforganisatie; vwo: oogstmieren (Gordon).

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


// ---------- mieren-helpers ----------
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }

const MIER = '#1E140E', ZAND = '#CDB58A', AARDE = '#9C7A55', KAMER = '#6E5038';
function mier(ctx, x, y, s, ang = 0, o = {}) { const { a = 1, t = 0, loop = 1, col = MIER, kon = false, vleugel = false, zaad = false, alarm = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const ph = t * 16; ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) for (const sd of [-1, 1]) { const sw = Math.sin(ph + i * 2.1 + (sd > 0 ? Math.PI : 0)) * 5 * loop; const by = -3 + i * 4; ctx.beginPath(); ctx.moveTo(0, by); ctx.lineTo(sd * 9, by - 3 + sw * 0.3); ctx.lineTo(sd * 15, by + (i - 1) * 8 + sw); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-2, -15); ctx.lineTo(-6, -21); ctx.lineTo(-11, -24); ctx.moveTo(2, -15); ctx.lineTo(6, -21); ctx.lineTo(11, -24); ctx.stroke();
  if (vleugel) { ctx.fillStyle = rgba('#E8F0F8', 0.6); ctx.beginPath(); ctx.ellipse(-9, 4, 6, 15, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(9, 4, 6, 15, 0.3, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, -11, 4.5, 5, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -1, 3.5, 6.5, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, kon ? 16 : 13, kon ? 9 : 6.5, kon ? 13 : 8.5, 0, 0, 6.283); ctx.fill();
  if (zaad) circ(ctx, 0, -20, 5, '#E0C27A');
  if (alarm > 0.01) { for (let k = 0; k < 2; k++) { const r = 18 + ((t * 40 + k * 15) % 30); ctx.strokeStyle = rgba(C.koraal, alarm * (1 - (r - 18) / 30)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.stroke(); } }
  ctx.restore(); }
// positie langs een polylijn, u in 0..1
function langs(pts, u) { let L = 0; const seg = []; for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); seg.push(d); L += d; } let r = clamp(u, 0, 1) * L; for (let i = 0; i < seg.length; i++) { if (r <= seg[i] || i === seg.length - 1) { const v = seg[i] ? r / seg[i] : 0; const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; return { x: lerp(x0, x1, v), y: lerp(y0, y1, v), ang: Math.atan2(x1 - x0, -(y1 - y0)), L }; } r -= seg[i]; } return { x: pts[0][0], y: pts[0][1], ang: 0, L }; }
// heen en terug over een pad; geeft ook terug of de mier op de terugweg is
function heenTerug(pts, tt) { const u = ((tt % 2) + 2) % 2; if (u < 1) return { ...langs(pts, u), terug: false }; const p = langs(pts, 2 - u); return { ...p, ang: p.ang + Math.PI, terug: true }; }
function spoorLijn(ctx, pts, sterk, a = 1, col = C.goud) { if (a <= 0.01 || sterk <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.25 + 0.55 * clamp(sterk, 0, 1)); ctx.lineWidth = 3 + 16 * clamp(sterk, 0, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore(); }
function terras(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C8C4BA'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = '#A8A49A'; ctx.lineWidth = 3; for (let i = 0; i <= w; i += 180) { ctx.beginPath(); ctx.moveTo(x + i, y); ctx.lineTo(x + i, y + h); ctx.stroke(); } for (let j = 0; j <= h; j += 180) { ctx.beginPath(); ctx.moveTo(x, y + j); ctx.lineTo(x + w, y + j); ctx.stroke(); } ctx.restore(); }
function veld(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, ZAND, '#A88E62', 2); ctx.restore(); }
function kruimel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-30, 10); ctx.lineTo(-18, -22); ctx.lineTo(14, -26); ctx.lineTo(32, 0); ctx.lineTo(18, 22); ctx.lineTo(-20, 24); ctx.closePath(); shape(ctx, '#D9A85A', '#9A6A2A', 2); circ(ctx, -6, -4, 4, '#9A6A2A'); circ(ctx, 10, 8, 3, '#9A6A2A'); ctx.restore(); }
function eitje(ctx, x, y, s = 1) { ctx.fillStyle = '#F4F0E4'; ctx.beginPath(); ctx.ellipse(x, y, 5 * s, 7 * s, 0.3, 0, 6.283); ctx.fill(); }
function larf(ctx, x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 2 + x) * 0.15); ctx.fillStyle = '#F2EDE0'; ctx.beginPath(); ctx.ellipse(0, 0, 9 * s, 14 * s, 0.4, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#C9C0AA'; ctx.lineWidth = 1.5; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(-8 * s, k * 6 * s); ctx.lineTo(8 * s, k * 6 * s + 3); ctx.stroke(); } ctx.restore(); }
function pop(ctx, x, y, s = 1) { ctx.fillStyle = '#E6D3A8'; ctx.beginPath(); ctx.ellipse(x, y, 10 * s, 16 * s, -0.3, 0, 6.283); ctx.fill(); }
// nest in doorsnede: zandstrook bovenop, aarde, kamers en gangen
const NEST = { top: 300, opp: 380, ingang: 960, kamers: { kon: [960, 760, 150, 70], broed: [500, 600, 170, 75], voorraad: [1420, 600, 160, 70] } };
function nest(ctx, a = 1, o = {}) { if (a <= 0.01) return; const { x0 = 120, x1 = 1800 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = ZAND; ctx.fillRect(x0, NEST.top, x1 - x0, NEST.opp - NEST.top); ctx.fillStyle = AARDE; ctx.fillRect(x0, NEST.opp, x1 - x0, 860 - NEST.opp); ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 3; for (let x = x0; x < x1; x += 22) { ctx.beginPath(); ctx.moveTo(x, NEST.top); ctx.lineTo(x + 6, NEST.top - 14); ctx.stroke(); }
  ctx.strokeStyle = KAMER; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(960, NEST.top + 10); ctx.lineTo(960, 520); ctx.lineTo(500, 600); ctx.moveTo(960, 520); ctx.lineTo(1420, 600); ctx.moveTo(960, 520); ctx.lineTo(960, 760); ctx.stroke();
  Object.values(NEST.kamers).forEach(([x, y, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = KAMER; ctx.fill(); }); ctx.restore(); }
const GANG = { broed: [[500, 600], [960, 520], [960, 330]], voorraad: [[1420, 600], [960, 520], [960, 330]], kon: [[960, 760], [960, 520], [960, 330]] };
function deelPad(pts, u0, u1, n = 40) { const out = []; for (let i = 0; i <= n; i++) { const p = langs(pts, lerp(u0, u1, i / n)); out.push([p.x, p.y]); } return out; }
const BRUG = { kort: [[300, 600], [480, 600], [960, 700], [1440, 600], [1620, 600]], lang: [[300, 600], [480, 600], [640, 330], [1280, 330], [1440, 600], [1620, 600]] };
function brugScene(ctx, t, p, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; veld(ctx, 160, 240, 1600, 620);
  ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const k of ['kort', 'lang']) { ctx.beginPath(); BRUG[k].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); }
  ctx.strokeStyle = '#B8966A'; ctx.lineWidth = 38; for (const k of ['kort', 'lang']) { ctx.beginPath(); BRUG[k].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); }
  spoorLijn(ctx, BRUG.kort.slice(1, 4), p, 1); spoorLijn(ctx, BRUG.lang.slice(1, 5), 1 - p, 1);
  circ(ctx, 300, 600, 46, '#3A2A1C'); regel(ctx, 'nest', 300, 690, 1, '#3A2A1C', 24, 'center', 700); kruimel(ctx, 1640, 600, 1.4); regel(ctx, 'voedsel', 1640, 690, 1, '#3A2A1C', 24, 'center', 700);
  for (let i = 0; i < 26; i++) { const kort = hash(i * 3 + 7) < p; const pts = kort ? BRUG.kort : BRUG.lang; const L = kort ? 1240 : 1480; const q2 = heenTerug(pts, t * 160 / L + hash(i) * 2); mier(ctx, q2.x, q2.y, 1.1, q2.ang, { t, zaad: q2.terug }); }
  regel(ctx, 'korte brug ' + Math.round(p * 100) + '%', 960, 770, 1, '#3A2A1C', 28, 'center', 700); regel(ctx, 'lange brug ' + Math.round((1 - p) * 100) + '%', 960, 300, 1, '#3A2A1C', 28, 'center', 700); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { terras(ctx, 1160, 560, 720, 300); kruimel(ctx, 1780, 700, 1.2); for (let i = 0; i < 9; i++) { const q2 = heenTerug([[1200, 820], [1760, 700]], t * 0.25 + i * 0.22); mier(ctx, q2.x, q2.y, 1.0, q2.ang, { t, zaad: q2.terug }); } persoon(ctx, 'sam', 1340, 880, 520, { uit: 'verbaasd', pose: 'staan', kijk: 1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); terras(ctx, 100, 260, 1720, 600);
    persoon(ctx, 'sam', 240, 880, 540, { uit: q.on('kwartier', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: 'staan', kijk: 1, t });
    kruimel(ctx, 1460, 520, 1.4, q.on('kruimel', 1)); const sp = q.on('spleet', 1); ctx.save(); ctx.strokeStyle = rgba('#3A2A1C', 0.4 + 0.6 * sp); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(560, 720); ctx.lineTo(720, 720); ctx.stroke(); ctx.restore(); regel(ctx, 'spleet', 640, 770, sp, '#3A2A1C', 24, 'center', 700);
    const e0 = q.at('Eerst'), kw = q.on('kwartier', 1, 0.8); if (t > e0) { const zz = [[640, 718], [760, 600], [860, 690], [1000, 540], [1120, 650], [1260, 520], [1400, 560]]; const p = langs(zz, (t - e0) / 2.6); mier(ctx, p.x, p.y, 1.3, p.ang, { t, a: 1 - kw }); }
    if (kw > 0.01) { for (let i = 0; i < 18; i++) { const q2 = heenTerug([[640, 718], [1420, 540]], t * 0.22 + i / 9); mier(ctx, q2.x, q2.y, 1.2, q2.ang, { t, zaad: q2.terug, a: kw * clamp((t - q.at('kwartier')) * 3 - i * 0.15, 0, 1) }); } }
    tag(ctx, 'een kwartier later', 1460, 380, C.goud, kw, 'center', 30); vraagteken(ctx, 1060, 420, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const nA = 0.35 + 0.65 * q.on('nest', 1); nest(ctx, nA); const A2 = q.on('Toch', 1, 0.8), A1 = 1 - A2;
    chip(ctx, 'sociale insecten, net als bijen', 960, 180, C.goud, q.on('sociale', 1) * A1, 28);
    // koningin en eitjes
    const [kx, ky] = NEST.kamers.kon; mier(ctx, kx - 20, ky, 2.6, Math.PI / 2, { t, kon: true, loop: 0.2, a: q.on('koninginnen', 1) * nA }); const el = q.on('legt', 1); if (el > 0.01) { ctx.save(); ctx.globalAlpha *= el * nA; for (let i = 0; i < 7; i++) eitje(ctx, kx + 70 + (i % 4) * 16, ky - 14 + Math.floor(i / 4) * 22); ctx.restore(); }
    regel(ctx, 'koningin', kx, ky + 100, q.on('koninginnen', 1) * nA, C.text, 26, 'center', 700);
    // werksters in de gangen
    const wk = q.on('werksters', 1) * nA; for (let i = 0; i < 10; i++) { const g = [GANG.broed, GANG.voorraad, GANG.kon][i % 3]; const p = heenTerug(g, t * 0.12 + hash(i) * 2); mier(ctx, p.x, p.y, 1.3, p.ang, { t, a: wk * (1 - 0.5 * A2) }); }
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; chip(ctx, 'werksters: vrouwtjes, meestal geen eitjes', 500, 470, C.text, q.on('vrouwtjes', 1), 24);
      const mn = q.on('mannetjes', 1); mier(ctx, 1380, 340, 1.6, -Math.PI / 2, { t, vleugel: true, a: mn }); mier(ctx, 1480, 345, 1.6, Math.PI / 2, { t, vleugel: true, a: mn }); chip(ctx, 'mannetjes: alleen een deel van het jaar', 1430, 240, C.teal, mn, 24);
      const bv = q.on('bevelen', 1); if (bv > 0.01) { ctx.save(); ctx.globalAlpha *= bv; wolk(ctx, 1060, 600, 280, 100, 'bevelen', 1, '#F2F2EE', 32); kruis(ctx, 1200, 650, 50, 1); ctx.restore(); }
      chip(ctx, 'weet niet wat er buiten gebeurt', 1420, 820, C.koraal, q.on('buiten', 1), 24); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; const [bx, by] = NEST.kamers.broed; const jo = q.on('Jonge', 1);
      if (jo > 0.01) { ctx.save(); ctx.globalAlpha *= jo; for (let i = 0; i < 4; i++) larf(ctx, bx - 90 + i * 40, by + 20, 1, t); for (let i = 0; i < 3; i++) pop(ctx, bx + 80 + i * 26, by + 18); for (let i = 0; i < 5; i++) eitje(ctx, bx - 60 + i * 14, by - 30); for (let i = 0; i < 3; i++) { const w = wander(i, t, 20, 0.6); mier(ctx, bx - 40 + i * 60 + w.x, by - 10 + w.y * 0.5, 1.4, Math.sin(t + i), { t }); } ctx.restore(); }
      chip(ctx, 'jong: binnen, verzorgt eitjes, larven en poppen', 500, 760, C.teal, jo, 24);
      const ou = q.on('Oudere', 1) * (1 - q.on('weg', 1)); for (let i = 0; i < 7; i++) { const x = 160 + ((t * 60 + i * 230) % 1600); mier(ctx, x, 340 + (i % 2) * 12, 1.4, Math.PI / 2, { t, a: ou, zaad: i % 3 === 0 }); }
      chip(ctx, 'oud: buiten, voedsel zoeken en verdedigen', 960, 230, C.goud, ou, 26); chip(ctx, 'buiten is gevaarlijk werk', 1420, 470, C.koraal, q.on('gevaarlijk', 1) * (1 - q.on('Stel', 1)), 24);
      tag(ctx, 'alle voedselzoekers weg', 1420, 470, C.koraal, q.on('weg', 1), 'center', 26); vraagteken(ctx, 1420, 780, q.on('denk', 1), 90); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); nest(ctx); const t0 = q.at('deden');
    for (let i = 0; i < 6; i++) { const u = clamp((t - t0 - i * 0.6) / 3.0, 0, 1); let p; if (u < 1) p = langs(GANG.broed, u); else { const x = 960 + ((t - t0 - i * 0.6 - 3) * 70 * (i % 2 ? 1 : -1)); p = { x: clamp(x, 160, 1760), y: 340, ang: i % 2 ? Math.PI / 2 : -Math.PI / 2 }; } mier(ctx, p.x, p.y, 1.4, p.ang, { t, col: '#3A2A6A' }); }
    regel(ctx, 'werksters die eerst ander werk deden', 500, 470, q.on('ander', 1), C.text, 24, 'center', 700);
    tag(ctx, 'de taakverdeling is flexibel', 960, 830, C.goud, q.on('flexibel', 1), 'center', 30);
    chip(ctx, 'veel hongerige larven', 480, 190, C.teal, q.on('hongerige', 1), 24); chip(ctx, 'weinig voedsel', 960, 190, C.goud, q.on('weinig', 1), 24); chip(ctx, 'een kapotte gang', 1440, 190, C.koraal, q.on('kapotte', 1), 24);
    tag(ctx, 'werk te veel? mieren schakelen om', 1420, 760, C.groen, q.on('schakelen', 1), 'center', 26); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Onderzoekers', 1, 0.8), A1 = 1 - B;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; veld(ctx, 160, 220, 1600, 640); const pts = [[340, 600], [700, 520], [1100, 560], [1540, 470]];
      circ(ctx, 340, 600, 40, '#3A2A1C'); regel(ctx, 'nest', 340, 690, 1, '#3A2A1C', 24, 'center', 700); const op = q.on('niemand', 1, 1.5); kruimel(ctx, 1580, 460, 1.4, 1 - op);
      chip(ctx, 'feromonen: geurstoffen', 960, 170, C.goud, q.on('feromonen', 1), 28);
      const t0 = q.at('terug'), u = clamp((t - t0) / 5, 0, 1); const st = clamp(0.3 * q.on('volgen', 1) + 0.3 * q.on('sterker', 1) + 0.35 * q.on('sterker', 2), 0, 1) * (1 - q.on('vanzelf', 1, 2));
      if (t > t0) spoorLijn(ctx, deelPad(pts, 1, 1 - u), Math.max(0.35, st) * (1 - q.on('vanzelf', 1, 2)) + 0.001);
      if (t > q.at('vindt') - 0.5 && u < 1) { const p = t < t0 ? langs(pts, 1) : langs(pts, 1 - u); mier(ctx, p.x, p.y, 1.5, t < t0 ? 0.6 : p.ang + Math.PI, { t, zaad: t >= t0 }); }
      const n = Math.round((3 * q.on('volgen', 1) + 6 * q.on('sterker', 1) + 9 * q.on('sterker', 2)) * (1 - q.on('niemand', 1, 2.5))); for (let i = 0; i < n; i++) { const p = heenTerug(pts, (t - q.at('volgen')) * 0.18 + i / Math.max(1, n) * 2); mier(ctx, p.x, p.y, 1.3, p.ang, { t, zaad: p.terug && op < 0.5 }); }
      const dr = q.on('drukt', 1) * (1 - q.on('Andere', 1)); if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; circ(ctx, 1420, 700, 120, rgba(C.bgSchema, 0.92), C.line, 2); mier(ctx, 1420, 690, 4.2, 0, { t, loop: 0.3 }); const pl = (t * 1.5) % 1; circ(ctx, 1420, 770, 8 + pl * 14, rgba(C.goud, 1 - pl)); regel(ctx, 'punt van het achterlijf', 1420, 860 - 20, 1, C.text, 22, 'center', 700); ctx.restore(); }
      chip(ctx, 'ruiken met de voelsprieten', 960, 760, C.teal, q.on('voelsprieten', 1) * (1 - q.on('terugkoppeling', 1)), 24);
      tag(ctx, 'meer geur → meer mieren → meer geur', 960, 300, C.goud, q.on('terugkoppeling', 1), 'center', 28); regel(ctx, 'positieve terugkoppeling', 960, 360, q.on('terugkoppeling', 1), '#3A2A1C', 26, 'center', 700);
      chip(ctx, 'geur verdampt: een rem', 960, 770, C.koraal, q.on('verdampt', 1), 26); ctx.restore(); }
    if (B > 0.01) { brugScene(ctx, t, 0.5, B); vraagteken(ctx, 960, 520, q.on('denk', 1), 100); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const p = 0.5 + 0.38 * clamp((t - q.at('eerder')) / 6, 0, 1); brugScene(ctx, t, p);
    chip(ctx, 'korte brug: eerder terug, sneller geur erbij', 960, 180, C.goud, q.on('eerder', 1), 26); tag(ctx, 'geen mier vergeleek de bruggen', 960, 470, C.koraal, q.on('vergeleken', 1), 'center', 28); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Mensen', 1, 0.8), A1 = 1 - B;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; tag(ctx, 'zelforganisatie', 450, 200, C.goud, q.on('zelforganisatie', 1), 'center', 36);
      [['volg de sterkste geur', 'volg', 2], ['leg geur als je voedsel hebt', 'leg', 1], ['doe werk dat je tegenkomt', 'doe', 1]].forEach(([s2, w, nn], i) => { const a = q.on(w, nn); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 140, 290 + i * 110, 620, 80, 14); shape(ctx, rgba(C.teal, 0.14), C.teal, 2); text(ctx, (i + 1) + '. ' + s2, 170, 342 + i * 110, fTekst(28, 700), C.text, 'left'); ctx.restore(); });
      chip(ctx, 'geen mier overziet het geheel', 450, 660, C.koraal, q.on('geheel', 1), 26);
      veld(ctx, 860, 220, 900, 620); const nx = 1000, ny = 700; circ(ctx, nx, ny, 34, '#3A2A1C'); const f1 = [[nx, ny], [1300, 520], [1620, 330]], f2 = [[nx, ny], [1400, 720], [1660, 700]]; kruimel(ctx, 1630, 320, 1.1); kruimel(ctx, 1670, 700, 1.0); spoorLijn(ctx, f1, 0.8); spoorLijn(ctx, f2, 0.4);
      for (let i = 0; i < 14; i++) { const pts = i % 3 === 2 ? f2 : f1; const p = heenTerug(pts, t * 0.2 + hash(i) * 2); mier(ctx, p.x, p.y, 1.1, p.ang, { t, zaad: p.terug }); }
      const al = q.on('alarmstof', 1); if (al > 0.01) { const ax = 1180, ay = 360; mier(ctx, ax, ay, 1.4, 0.3, { t, alarm: 1, col: '#5A1E14' }); for (let i = 0; i < 6; i++) { const an = i * 1.047, u = clamp((t - q.at('aanrennen')) / 1.5, 0, 1); const x = ax + Math.cos(an) * lerp(200, 50, u), y = ay + Math.sin(an) * lerp(160, 40, u); mier(ctx, x, y, 1.2, Math.atan2(ax - x, -(ay - y)), { t, a: al }); } chip(ctx, 'alarmstof', ax, ay - 50, C.koraal, al, 24); }
      tag(ctx, 'het slimme zit in de samenwerking', 1310, 800, C.goud, q.on('samenwerking', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; paneel(ctx, 200, 200, 1520, 660, ''); regel(ctx, 'computerprogramma met nagebootste mieren', 240, 250, 1, C.text2, 24, 'left', 700);
      const P = [[420, 520], [640, 340], [900, 420], [1180, 320], [1480, 400], [1560, 640], [1260, 760], [920, 700], [620, 740]]; const tour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0];
      const ma = q.on('nagebootste', 1); if (ma > 0.01) { ctx.save(); ctx.globalAlpha *= ma; ctx.strokeStyle = rgba(C.text2, 0.18); ctx.lineWidth = 2; for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[j]); ctx.stroke(); }
        for (let k = 0; k < 16; k++) { const i = Math.floor(hash(k) * 9), j = Math.floor(hash(k + 40) * 9); if (i === j) continue; const u = (t * 0.4 + hash(k + 80)) % 1; circ(ctx, lerp(P[i][0], P[j][0], u), lerp(P[i][1], P[j][1], u), 6, C.teal); } ctx.restore(); }
      const gr = q.on('goede', 1); spoorLijn(ctx, tour.map(i => P[i]), 0.9, gr);
      P.forEach(([x, y], i) => { roundRect(ctx, x - 18, y - 18, 36, 36, 6); shape(ctx, i === 0 ? C.goud : '#E6D3A8', '#9A8458', 2); });
      regel(ctx, 'depot', 420, 580, 1, C.goud, 22, 'center', 700); chip(ctx, 'goede routes krijgen meer digitale geur', 960, 820, C.goud, gr, 26); chip(ctx, 'handige volgorde voor pakketjes', 1440, 250, C.groen, q.on('pakketjes', 1), 24); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); veld(ctx, 160, 220, 1600, 640); regel(ctx, 'oogstmieren in de woestijn', 200, 270, q.on('oogstmieren', 1), '#3A2A1C', 28, 'left', 700); metaText(ctx, 'onderzoek: Deborah Gordon', 200, 304, '#5A4A3A', 'left', 18);
    const ex = 760, ey = 600; ctx.beginPath(); ctx.ellipse(ex, ey + 20, 120, 40, 0, 0, 6.283); shape(ctx, '#B89A6A', null); circ(ctx, ex, ey + 14, 18, '#3A2A1C');
    const zd = q.on('zaadjes', 1); for (let i = 0; i < 18; i++) circ(ctx, 300 + hash(i) * 1100, 380 + hash(i + 9) * 420, 5, rgba('#8A6A2A', zd));
    const veel = q.on('veel', 2) * (1 - q.on('weinig', 1)), heet = q.on('heet', 1); const rate = 0.12 + 0.12 * veel - 0.07 * q.on('weinig', 1);
    const n = Math.round(5 + 6 * veel - 3 * heet); for (let i = 0; i < n; i++) { const an = -2.6 + hash(i + 3) * 2.2 + (i % 2) * 3.1; const far = [ex + Math.cos(an) * 520, ey + Math.sin(an) * 230]; const p = heenTerug([[ex, ey], far], t * rate + hash(i) * 2); mier(ctx, p.x, p.y, 1.2, p.ang, { t, zaad: p.terug }); }
    const ig = q.on('ingang', 1); if (ig > 0.01) { ctx.save(); ctx.globalAlpha *= ig; mier(ctx, ex + 60, ey - 30, 1.6, -0.6, { t, loop: 0.3 }); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex + 60, ey - 30, 34, 0, 6.283); ctx.stroke(); regel(ctx, 'mier in de ingang', ex + 60, ey - 80, 1, '#3A2A1C', 22, 'center', 700); ctx.restore(); }
    const tk = q.on('tikt', 1); if (tk > 0.01 && Math.sin(t * 5) > 0.3) { ctx.save(); ctx.globalAlpha *= tk; for (let k = 0; k < 6; k++) { const an = k * 1.047; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex + 60 + Math.cos(an) * 40, ey - 30 + Math.sin(an) * 40); ctx.lineTo(ex + 60 + Math.cos(an) * 54, ey - 30 + Math.sin(an) * 54); ctx.stroke(); } ctx.restore(); }
    chip(ctx, 'geur van een voedselzoeker', 1380, 330, C.teal, q.on('voedselzoeker', 1), 24); chip(ctx, '+ geur van het zaadje', 1380, 410, C.goud, q.on('zaadje', 3), 24);
    chip(ctx, 'veel voedsel: snel terug → meer mieren uit', 1360, 520, C.groen, q.on('veel', 2), 24); chip(ctx, 'weinig: langzaam terug → meer blijven binnen', 1360, 600, C.text2, q.on('weinig', 1), 24);
    if (heet > 0.01) { zon(ctx, 1640, 300, 26, heet, t); } chip(ctx, 'heet en droog: minder op pad (waterverlies)', 1360, 680, C.koraal, heet, 24);
    tag(ctx, 'regeling zonder overzicht', 960, 800, C.goud, q.on('overzicht', 1), 'center', 30); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 200, ph = 540;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 64, pw, ph - 64); ctx.clip(); ctx.fillStyle = ZAND; ctx.fillRect(x + 10, y0 + 74, pw - 20, ph - 84); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'koningin, geen baas', q.on('koningin', 1), (x) => { mier(ctx, x + 200, 470, 3.0, Math.PI / 2, { t, kon: true, loop: 0.2 }); for (let i = 0; i < 6; i++) eitje(ctx, x + 290 + (i % 3) * 16, 450 + Math.floor(i / 3) * 22); });
    panel(1, 'werk naar leeftijd', q.on('leeftijd', 1), (x) => { ctx.fillStyle = AARDE; ctx.fillRect(x + 10, 480, pw - 20, 250); for (let i = 0; i < 3; i++) larf(ctx, x + 140 + i * 50, 600, 1, t); mier(ctx, x + 120, 640, 1.4, 1.2, { t }); regel(ctx, 'jong: binnen', x + 200, 700, 1, C.text, 22, 'center', 700); for (let i = 0; i < 3; i++) mier(ctx, x + 60 + ((t * 50 + i * 110) % 300), 420, 1.3, Math.PI / 2, { t, zaad: i === 1 }); regel(ctx, 'oud: buiten', x + 200, 360, 1, '#3A2A1C', 22, 'center', 700); });
    panel(2, 'geurspoor', q.on('geurspoor', 1), (x) => { const pts = [[x + 60, 650], [x + 180, 480], [x + 340, 380]]; spoorLijn(ctx, pts, 0.7); for (let i = 0; i < 6; i++) { const p = heenTerug(pts, t * 0.3 + i / 3); mier(ctx, p.x, p.y, 1.2, p.ang, { t, zaad: p.terug }); } kruimel(ctx, x + 350, 370, 0.9); });
    panel(3, 'korte route wint', q.on('korte', 1), (x) => { const k = [[x + 50, 560], [x + 200, 640], [x + 350, 560]], l = [[x + 50, 560], [x + 120, 380], [x + 280, 380], [x + 350, 560]]; spoorLijn(ctx, k, 0.9); spoorLijn(ctx, l, 0.15); for (let i = 0; i < 6; i++) { const p = heenTerug(i < 5 ? k : l, t * 0.35 + i / 3); mier(ctx, p.x, p.y, 1.1, p.ang, { t }); } });
    tag(ctx, 'zelforganisatie', 960, 830, C.goud, q.on('zelforganisatie', 1), 'center', 32); },
};
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }

// Gaswisseling 1 · Adem in, adem uit — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#3A2A1E', shirt: '#4F7A5E', hairStyle: 'short' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const LUCHT = '#9FC3E0', O2 = '#E0705A', CO2 = '#9A8FB8', LONG = '#D98C8C', RIB = '#E6E1D3', SPIER = '#B36A5E', VOCHT = C.teal;

// ---------- long (frontaal): kwab-vorm; s = schaal, k = vulling 0..1, side -1 links (rechterlong van de patiënt) / 1 rechts
function longVorm(ctx, x, y, s, side, k = 1, a = 1, fill = LONG, sy = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(side * s * (0.55 + 0.45 * k), (sy == null ? s : sy) * (0.6 + 0.4 * k));
  ctx.beginPath(); ctx.moveTo(10, -150); ctx.bezierCurveTo(80, -150, 120, -40, 120, 60); ctx.bezierCurveTo(120, 140, 70, 160, 20, 150); ctx.bezierCurveTo(-10, 145, -10, 120, -2, 90); ctx.lineTo(-2, -110); ctx.bezierCurveTo(-4, -140, 0, -150, 10, -150); ctx.closePath();
  shape(ctx, rgba(fill, 0.35), lighten(fill, 0.2), 2.5 / s); ctx.restore(); }
// luchtwegenboom vanaf (x,y) omlaag; d = diepte
function boom(ctx, x, y, len, ang, d, a, col, w) { if (d === 0 || a <= 0.01) return; const x2 = x + Math.sin(ang) * len, y2 = y + Math.cos(ang) * len; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
  if (d === 1) { circ(ctx, x2, y2, w * 1.6 + 2, rgba(LONG, 0.7), lighten(LONG, 0.2), 1); return; } boom(ctx, x2, y2, len * 0.72, ang - 0.45, d - 1, a, col, w * 0.7); boom(ctx, x2, y2, len * 0.72, ang + 0.45, d - 1, a, col, w * 0.7); }
// borstkas frontaal: ribben, middenrif (koepel), longen; v = inademing 0..1
function borstkas(ctx, cx, cy, s, o = {}) { const { a = 1, v = 0, ribA = 1, mrA = 1, longA = 1, klap = 0, gap = 0, buik = 0, tsp = 0, xray = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const wx = 1 + 0.07 * v; // ribben naar buiten
  ctx.save(); ctx.globalAlpha *= ribA; for (let i = 0; i < 6; i++) { const yy = cy - 200 * s + i * 58 * s - v * 10 * s * (6 - i) / 6; for (const d of [-1, 1]) { ctx.strokeStyle = RIB; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(cx + d * 20 * s, yy); ctx.bezierCurveTo(cx + d * 200 * s * wx, yy - 30 * s, cx + d * 260 * s * wx, yy + 40 * s, cx + d * 250 * s * wx, yy + 70 * s); ctx.stroke();
      if (tsp > 0.01 && i < 5) { ctx.save(); ctx.globalAlpha *= tsp; ctx.strokeStyle = SPIER; ctx.lineWidth = 4 * s; for (let k = 0; k < 4; k++) { const px = cx + d * (90 + k * 40) * s * wx; ctx.beginPath(); ctx.moveTo(px, yy + 6 * s); ctx.lineTo(px + d * 14 * s, yy + 50 * s); ctx.stroke(); } ctx.restore(); } } }
    ctx.fillStyle = RIB; roundRect(ctx, cx - 18 * s, cy - 230 * s, 36 * s, 300 * s, 10 * s); ctx.fill(); ctx.restore();
  const my = cy + 150 * s + v * 50 * s; const dome = (90 - 60 * v) * s;
  ctx.save(); ctx.globalAlpha *= longA; const top = cy - 190 * s; const bot = my - 1.2 * dome - 6 * s; const sy = (bot - top) / 300; const kR = 1 - 0.6 * klap; const lf = xray ? '#8A8A8A' : LONG;
  if (gap > 0.01) { ctx.save(); ctx.globalAlpha *= gap; ctx.fillStyle = xray ? '#000' : rgba(LUCHT, 0.22); ctx.beginPath(); ctx.ellipse(cx - 150 * s, (top + bot) / 2, 95 * s, 160 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  longVorm(ctx, cx - 40 * s, (top + bot) / 2 + (1 - kR) * 40 * s, s * 1.15 * (1 + 0.05 * v), -1, kR, 1, lf, sy); longVorm(ctx, cx + 40 * s, (top + bot) / 2, s * 1.15 * (1 + 0.05 * v), 1, 1, 1, lf, sy);
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= mrA; ctx.strokeStyle = SPIER; ctx.lineWidth = 14 * s; ctx.beginPath(); ctx.moveTo(cx - 255 * s * wx, my + 30 * s); ctx.quadraticCurveTo(cx - 130 * s, my - dome * 2.1, cx, my - dome * 0.6); ctx.quadraticCurveTo(cx + 130 * s, my - dome * 2.1, cx + 255 * s * wx, my + 30 * s); ctx.stroke(); ctx.restore();
  if (buik > 0.01) { ctx.save(); ctx.globalAlpha *= buik; ctx.strokeStyle = rgba(C.mens, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 240 * s, my + 60 * s); ctx.quadraticCurveTo(cx, my + (200 + 50 * v) * s, cx + 240 * s, my + 60 * s); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { my }; }
function drukMeter(ctx, x, y, binnen, a = 1, lab = 'in je longen') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 90, 300, 180, 18); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); metaText(ctx, 'LUCHTDRUK', x, y - 58, C.grain, 'center', 20);
  const bh = h => 90 * h; ctx.fillStyle = rgba(LUCHT, 0.6); ctx.fillRect(x - 100, y + 60 - bh(1), 60, bh(1)); ctx.fillStyle = rgba(binnen < 1 ? C.teal : C.koraal, 0.7); ctx.fillRect(x + 40, y + 60 - bh(binnen), 60, bh(binnen));
  text(ctx, 'buiten', x - 70, y + 84, fTekst(24), C.text2, 'center'); text(ctx, lab, x + 70, y + 84, fTekst(24), C.text2, 'center'); ctx.restore(); }
function luchtPijlen(ctx, x, y, dir, a, t) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; const yy = dir > 0 ? y - 120 + u * 120 : y - u * 120; arrow(ctx, x, yy - 20 * dir, x, yy + 20 * dir, LUCHT, 1 - Math.abs(u - 0.5), 5); } ctx.restore(); }
function trilhaarRij(ctx, x0, y, w, t, o = {}) { const { a = 1, lam = 0, slijm = 1, stof = 1, extra = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 9, cw = w / n; for (let i = 0; i < n; i++) { const x = x0 + i * cw; roundRect(ctx, x + 3, y, cw - 6, 220, 14); const sl = i % 3 === 1; shape(ctx, rgba(sl ? '#C9A35C' : HK.cel, 0.25), sl ? '#C9A35C' : HK.cel, 2); circ(ctx, x + cw / 2, y + 140, 20, rgba(C.kern, 0.5), C.kernR, 1.5);
    if (!sl) for (let k = 0; k < 6; k++) { const bx = x + 12 + k * (cw - 24) / 5; const ph = Math.sin(t * 6 - i * 0.7 - k * 0.3) * (1 - lam); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(bx + 8 * ph, y - 22, bx + 18 * ph - 4 * lam, y - 44 + 10 * lam); ctx.stroke(); } }
  ctx.fillStyle = rgba('#C9D2A0', 0.25 * slijm + 0.2 * extra); ctx.fillRect(x0, y - 90 - 40 * extra, w, 50 + 40 * extra); metaText(ctx, 'SLIJM', x0 + w + 20, y - 60, C.grain, 'left', 20);
  for (let i = 0; i < 12; i++) { const sp = 0.06 * (1 - lam); const u = (hash(i * 3) + t * sp) % 1; circ(ctx, x0 + u * w, y - 70 - hash(i * 7) * 30, 5, rgba('#8C8070', stof)); }
  if (lam < 0.5) arrow(ctx, x0 + w * 0.3, y - 130, x0 + w * 0.7, y - 130, C.goud, 1 - lam * 2, 4);
  ctx.restore(); }
function longblaasje(ctx, x, y, r, t, o = {}) { const { a = 1, o2 = 0, co2 = 0, haar = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(LUCHT, 0.12), '#C9D2DE', 3); circ(ctx, x, y, r - 10, null, rgba(VOCHT, 0.6), 4);
  if (haar > 0.01) { ctx.save(); ctx.globalAlpha *= haar; ctx.strokeStyle = HK.bloed; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r + 22, -0.4, Math.PI * 1.25); ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 10; i++) { const u = (t * 0.25 + i / 10) % 1; const an = -0.3 + hash(i) * 1.5; const rr = lerp(r * 0.5, r + 22, u); circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, 7, rgba(O2, o2 * (1 - u * 0.3))); const an2 = 1.4 + hash(i * 5) * 1.5, rr2 = lerp(r + 22, r * 0.5, u); circ(ctx, x + Math.cos(an2) * rr2, y + Math.sin(an2) * rr2, 7, rgba(CO2, co2)); }
  ctx.restore(); }
function staaf(ctx, x, yb, w, h, v, max, col, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = h * v / max; roundRect(ctx, x, yb - hh, w, hh, 6); shape(ctx, rgba(col, 0.5), col, 2); text(ctx, lab, x + w / 2, yb - hh - 14, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

const SCENES = {
  title(ctx, t) { const v = 0.5 + 0.5 * Math.sin(t * 1.2); borstkas(ctx, 1420, 520, 1.0, { v }); },

  s01(ctx, t, q) { ctx.fillStyle = '#3B4A63'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(0, 700, W, H - 700); roundRect(ctx, 1320, 140, 420, 320, 8); shape(ctx, '#7FA8CC', '#C9C2B4', 8); ctx.strokeStyle = '#C9C2B4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1530, 140); ctx.lineTo(1530, 460); ctx.stroke(); ctx.fillStyle = '#C9A35C'; ctx.fillRect(240, 200, 10, 500); ctx.beginPath(); ctx.moveTo(190, 200); ctx.lineTo(300, 200); ctx.lineTo(270, 130); ctx.lineTo(220, 130); ctx.closePath(); ctx.fillStyle = '#E6D8A8'; ctx.fill();
    const f = q.on('foto', 1);
    ctx.save(); ctx.globalAlpha *= 1 - f; roundRect(ctx, 520, 380, 760, 260, 30); shape(ctx, '#66789A', '#46566F', 3);
      { const st = q.on('steek', 1); person(ctx, 900, 860, 520, 1, { shirt: '#4F7A5E', armR: { a1: lerp(0.15, 0.35, st), a2: lerp(0.08, -2.3, st) } }); }
      roundRect(ctx, 520, 610, 760, 150, 30); shape(ctx, '#5A6B8A', '#46566F', 3); ctx.restore();
    if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; ctx.fillStyle = rgba('#0B0F16', 0.85); ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#0B0F16'; ctx.fillRect(560, 120, 800, 700); ctx.save(); ctx.globalAlpha *= 0.9; borstkas(ctx, 960, 460, 1.05, { v: 0.6, klap: q.on('ingezakt', 1), gap: q.on('ingezakt', 1), mrA: 0.6, xray: true }); ctx.restore(); metaText(ctx, 'R', 600, 170, '#E6E1D3', 'left', 32);
      label(ctx, 'rechterlong', 'ingezakt', 830, 440, 380, 300, q.on('ingezakt', 1), '#E6E1D3'); naamBij(ctx, 'lucht tussen long en borstwand', '(zwart op de foto)', 645, 182, q.on('lucht', 1), 'left', '#E6E1D3'); ctx.restore();
      tag(ctx, 'klaplong: zeldzaam, goed te verhelpen', 960, 800, C.groen, q.on('verhelpen', 1)); }
    vraagteken(ctx, 1600, 560, q.on('Waarom', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const hx = 640, hy = 300;
    ctx.save(); ctx.beginPath(); ctx.arc(hx, hy - 60, 150, 0, 6.283); shape(ctx, rgba(C.mens, 0.14), rgba(C.mens, 0.6), 2); ctx.restore();
    const st = [['neusholte', q.on('neusholte', 1)], ['keelholte', q.on('keelholte', 1)], ['strottenhoofd', q.on('strottenhoofd', 1)], ['luchtpijp', q.on('luchtpijp', 2)], ['bronchiën', q.on('bronchiën', 1)], ['bronchiolen', q.on('bronchiolen', 1)], ['longblaasjes', q.on('longblaasjes', 1)]];
    ctx.save(); ctx.globalAlpha *= st[0][1]; ctx.fillStyle = rgba(LUCHT, 0.4); roundRect(ctx, hx + 40, hy - 80, 120, 40, 18); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = rgba(LUCHT, 0.8); ctx.lineCap = 'round'; ctx.globalAlpha *= st[1][1]; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(hx + 60, hy - 50); ctx.quadraticCurveTo(hx + 20, hy - 20, hx + 20, hy + 60); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.globalAlpha *= st[2][1]; roundRect(ctx, hx - 8, hy + 60, 56, 70, 12); shape(ctx, rgba('#C9A35C', 0.4), '#C9A35C', 2); ctx.restore();
    ctx.save(); ctx.globalAlpha *= st[3][1]; ctx.strokeStyle = rgba(LUCHT, 0.8); ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(hx + 20, hy + 130); ctx.lineTo(hx + 20, hy + 310); ctx.stroke(); for (let i = 0; i < 6; i++) { ctx.strokeStyle = RIB; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx + 3, hy + 150 + i * 28); ctx.lineTo(hx + 37, hy + 150 + i * 28); ctx.stroke(); } ctx.restore();
    if (st[4][1] > 0.01) { ctx.save(); ctx.globalAlpha *= st[4][1]; longVorm(ctx, hx - 15, hy + 410, 1.1, -1, 1, 0.5); longVorm(ctx, hx + 55, hy + 410, 1.1, 1, 1, 0.5); boom(ctx, hx + 20, hy + 310, 85, -0.9, 2 + Math.round(2 * st[5][1]) + Math.round(st[6][1]), 1, LUCHT, 18); boom(ctx, hx + 20, hy + 310, 85, 0.9, 2 + Math.round(2 * st[5][1]) + Math.round(st[6][1]), 1, LUCHT, 18); ctx.restore(); }
    const lp = [[hx + 160, hy - 60], [hx + 30, hy], [hx + 40, hy + 95], [hx + 35, hy + 220], [hx - 30, hy + 360], [hx + 150, hy + 420], [hx - 120, hy + 520]];
    st.forEach(([n, a], i) => { const col = i === 2 ? '#C9A35C' : LUCHT; if (i === 1) naamBij(ctx, n, '', lp[i][0] - 40, lp[i][1] + 12, a, 'right', col); else if (i >= 4) naamBij(ctx, n, '', 905, lp[i][1] + 12, a, 'left', col); else label(ctx, n, '', lp[i][0], lp[i][1], 1150, 160 + i * 100, a, col); });
    tag(ctx, 'verwarmd · vochtig · stof gevangen', 1480, 120, C.text2, q.on('verwarmd', 1) * (1 - q.on('keelholte', 1)));
    tag(ctx, 'strotklepje + huig sluiten af bij slikken', 1380, 880 - 40, C.goud, q.on('slikt', 1) * (1 - q.on('opengehouden', 1)));
    tag(ctx, 'kraakbeenringen (hoefijzer)', 1380, 880 - 40, RIB, q.on('opengehouden', 1) * (1 - q.on('bronchiën', 1)));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    ctx.save(); ctx.translate(820, 520); ctx.rotate(-0.15); roundRect(ctx, -220, -22, 360, 44, 8); ctx.fillStyle = '#F2F2EE'; ctx.fill(); roundRect(ctx, 140, -22, 90, 44, 8); ctx.fillStyle = '#C98A5C'; ctx.fill(); ctx.restore();
    for (let i = 0; i < 5; i++) { const u = (t * 0.2 + i / 5) % 1; circ(ctx, 600 - u * 80 + Math.sin(u * 8 + i) * 20, 470 - u * 220, 20 + u * 30, rgba('#C9D2DE', 0.25 * (1 - u))); }
    vraagteken(ctx, 1300, 560, q.on('Hoe', 1), 140); },
  s07(ctx, t, q) { bg(ctx, 'micro');
    const lam = ramp(t, q.at('verlamt'), 1.5); trilhaarRij(ctx, 380, 520, 1100, t, { lam, extra: q.on('meer', 1) });
    regel(ctx, '→ naar je keel', 380 + 1100 * 0.7 + 20, 520 - 120, 1 - ramp(t, q.at('verlamt'), 1.5), C.goud, 28); metaText(ctx, 'TRILHAAREPITHEEL', 380, 785, C.grain, 'left', 22);
    tag(ctx, 'trilhaartjes slaan slijm naar je keel', 930, 230, C.goud, q.on('slaan', 1) * (1 - lam));
    tag(ctx, 'rook verlamt de trilhaartjes', 930, 230, C.koraal, lam);
    tag(ctx, 'meer slijm → ophoesten · vaker infecties', 930, 860, C.koraal, q.on('gehoest', 1));
    tag(ctx, 'neusholte · luchtpijp · bronchiën', 930, 160, C.text2, q.on('bekleed', 1) * (1 - q.on('slaan', 1)));
  },

  s08(ctx, t, q) { bg(ctx, 'schema');
    borstkas(ctx, 900, 520, 1.15, { v: 0, mrA: q.on('middenrif', 1) * 0.8 + 0.2, ribA: 0.8 });
    tag(ctx, 'longen kunnen zelf niet zuigen', 1500, 260, C.koraal, q.on('zuigen', 1));
    naamBij(ctx, 'middenrif', 'koepel van spier', 900, 680, q.on('koepel', 1), 'center', SPIER);
    vraagteken(ctx, 1550, 480, q.on('Wat', 1), 120);
  },
  s10(ctx, t, q) { bg(ctx, 'schema');
    const tIn = q.at('trekt'), tUit = q.at('rustig');
    let v = ramp(t, tIn, 4) * (1 - ramp(t, tUit, 3)); const buikA = q.on('buikademhaling', 1); if (buikA > 0.01) v = 0.5 + 0.5 * Math.sin(t * 1.5);
    borstkas(ctx, 760, 500, 1.1, { v, tsp: q.on('tussenribspieren', 1), buik: buikA });
    naamBij(ctx, 'middenrif', 'trekt samen, wordt platter, zakt', 760, 765, q.on('platter', 1) * (1 - buikA), 'center', SPIER);
    tag(ctx, 'tussenribspieren: ribben omhoog en naar buiten', 1350, 160, SPIER, q.on('tussenribspieren', 1) * (1 - q.on('groter', 1)));
    drukMeter(ctx, 1520, 400, 1 - 0.25 * v * (1 - q.on('stijgt', 1)) + 0.15 * q.on('stijgt', 1) * (1 - q.on('spierkracht', 1)), q.on('druk', 1) * (1 - buikA));
    ctx.save(); ctx.strokeStyle = rgba(LUCHT, 0.6); ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(760, 120); ctx.lineTo(760, 250); ctx.stroke(); ctx.restore(); luchtPijlen(ctx, 790, 260, 1, q.on('duwt', 1) * (1 - q.on('rustig', 1)), t); luchtPijlen(ctx, 790, 260, -1, q.on('buiten', 3) * (1 - q.on('spierkracht', 1)), t);
    tag(ctx, 'lucht wordt naar binnen geduwd', 1350, 160, LUCHT, q.on('geduwd', 1) * (1 - q.on('rustig', 1)));
    tag(ctx, 'inademen: spierkracht · rustig uit: vanzelf', 1350, 160, C.goud, q.on('spierkracht', 1) * (1 - q.on('buikademhaling', 1)));
    tag(ctx, 'hard uitblazen: buikspieren helpen', 1350, 640, C.text2, q.on('buikspieren', 1) * (1 - buikA));
    tag(ctx, 'buikademhaling: buik bolt op', 1350, 600, SPIER, buikA); tag(ctx, 'borstademhaling: vooral tussenribspieren', 1350, 700, RIB, q.on('borstademhaling', 1));
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const gl = q.on('glasplaatjes', 1) * (1 - q.on('elastisch', 1)); const kl = q.on('Daan', 1);
    if (gl < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - gl; const k = 1 - 0.45 * ramp(t, q.at('veerde'), 1.5) + 0.45 * ramp(t, q.at('slangetje'), 2);
      ctx.strokeStyle = RIB; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(760, 480, 300, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
      ctx.strokeStyle = rgba(VOCHT, 0.8 * (1 - kl)); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(760, 480, 285, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke(); label(ctx, 'borstvlies', '', 470, 390, 300, 220, q.on('borstvlies', 1), RIB);
      if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; ctx.fillStyle = rgba(LUCHT, 0.25); ctx.beginPath(); ctx.arc(760, 480, 280, Math.PI * 0.6, Math.PI * 1.4); ctx.arc(760 + 280 * (1 - k) * 0.6, 480, 280 * k, Math.PI * 1.4, Math.PI * 0.6, true); ctx.fill(); ctx.restore(); }
      ctx.save(); ctx.translate(760 + 280 * (1 - k) * 0.6, 480); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 270, Math.PI * 0.6, Math.PI * 1.4); ctx.quadraticCurveTo(80, 0, -270 * Math.cos(Math.PI * 0.6) * -1, 270 * Math.sin(Math.PI * 0.6)); ctx.closePath(); shape(ctx, rgba(LONG, 0.35), lighten(LONG, 0.2), 3); ctx.restore();
      label(ctx, 'longvlies', '', 760 + 280 * (1 - k) * 0.6 - 262 * k - 22 * (1 - k), 480 + 60, 300, 640, q.on('longvlies', 1), LONG); label(ctx, 'laagje vocht', '', 760 - 290, 480 - 60, 300, 420, q.on('vocht', 1) * (1 - kl), VOCHT);
      tag(ctx, 'longen zijn elastisch: altijd een beetje uitgerekt', 1380, 220, C.goud, q.on('elastisch', 1) * (1 - kl));
      for (let i = 0; i < 3; i++) arrow(ctx, 860 + i * 20, 400 + i * 80, 1000 + i * 20, 400 + i * 80, C.goud, q.on('uitgerekt', 1) * (1 - kl) * 0.0 + 0, 3);
      tag(ctx, 'lucht tussen de vliezen → long veert terug', 1380, 220, LUCHT, kl * (1 - q.on('eigen', 1)));
      tag(ctx, 'elke long eigen vliezen', 1380, 220, C.text2, q.on('eigen', 1) * (1 - q.on('kleine', 1)));
      tag(ctx, 'slangetje: lucht weg, long kleeft weer aan', 1380, 220, C.groen, q.on('slangetje', 1)); tag(ctx, 'na een paar dagen weer thuis', 1380, 320, C.groen, q.on('thuis', 1));
      ctx.restore(); }
    if (gl > 0.01) { ctx.save(); ctx.globalAlpha *= gl; const sl = 40 * Math.sin(t * 1.5); roundRect(ctx, 640 + sl, 420, 640, 30, 4); shape(ctx, rgba('#C9D2DE', 0.3), '#C9D2DE', 2); ctx.fillStyle = rgba(VOCHT, 0.6); ctx.fillRect(640, 450, 640, 8); roundRect(ctx, 640 - sl, 458, 640, 30, 4); shape(ctx, rgba('#C9D2DE', 0.3), '#C9D2DE', 2);
      arrow(ctx, 960, 560, 1100, 560, C.groen, 1, 4); regel(ctx, 'schuiven: ja', 1120, 572, 1, C.groen, 32); arrow(ctx, 960, 380, 960, 300, C.koraal, 1, 4); regel(ctx, 'uit elkaar: bijna niet', 1000, 330, 1, C.koraal, 32); ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    ctx.strokeStyle = RIB; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(760, 480, 300, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke(); ctx.strokeStyle = rgba(VOCHT, 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(760, 480, 285, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
    const gat = q.on('gaatje', 1), k = 1 - 0.45 * ramp(t, q.at('veert'), 1.5);
    ctx.save(); ctx.translate(760 + 280 * (1 - k) * 0.6, 480); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 270, Math.PI * 0.6, Math.PI * 1.4); ctx.quadraticCurveTo(80, 0, 270 * Math.cos(Math.PI * 0.6) * -1 * -1, 270 * Math.sin(Math.PI * 0.6)); ctx.closePath(); shape(ctx, rgba(LONG, 0.35), lighten(LONG, 0.2), 3); ctx.restore();
    const lp = q.on('trekken', 1) * (1 - gat); for (let i = 0; i < 3; i++) { const y = 380 + i * 100; arrow(ctx, 520, y, 600, y, LONG, lp, 4); arrow(ctx, 470, y, 400, y, RIB, q.on('borstkas', 1) * (1 - gat), 4); }
    regel(ctx, 'long trekt naar binnen', 640, 300, lp, LONG, 28); regel(ctx, 'borstkas trekt naar buiten', 120, 300, q.on('borstkas', 1) * (1 - gat), RIB, 28);
    drukMeter(ctx, 1450, 420, 1 - 0.18 * (1 - gat) - 0.08 * q.on('inademen', 1) * (1 - gat), q.on('druk', 1), 'tussen de vliezen');
    tag(ctx, 'onderdruk tussen de vliezen', 1450, 220, C.goud, q.on('onderdruk', 1) * (1 - gat)); tag(ctx, 'gaatje: lucht tussen de vliezen', 1450, 220, LUCHT, gat);
  },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const f = s => { if (s < 12.5) return 2.5 + 0.25 * (1 - Math.cos(s * Math.PI / 2.5)); if (s < 15) return lerp(3.0, 6.0, (s - 12.5) / 2.5); if (s < 19) return lerp(6.0, 1.2, (s - 15) / 4); return lerp(1.2, 2.5, Math.min(1, (s - 19) / 3)); };
    grafiek(ctx, 300, 180, 1100, 480, { a: q.on('spirometer', 1), xmax: 24, ymax: 6.5, f, u: Math.min(ramp(t, q.at('spirometer'), 8) * 0.5, 0.5) + 0.5 * ramp(t, q.at('diep'), 5), xticks: [0, 6, 12, 18, 24], yticks: [0, 1, 2, 3, 4, 5, 6], xlab: 'tijd (s)', ylab: 'longvolume (L)', col: LUCHT });
    const Y = v => 180 + 480 - v / 6.5 * 480;
    const br = (x, v1, v2, lab, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(v1)); ctx.lineTo(x, Y(v2)); ctx.moveTo(x - 10, Y(v1)); ctx.lineTo(x + 10, Y(v1)); ctx.moveTo(x - 10, Y(v2)); ctx.lineTo(x + 10, Y(v2)); ctx.stroke(); text(ctx, lab, x + 18, (Y(v1) + Y(v2)) / 2 + 10, fTekst(30, 700), col, 'left'); ctx.restore(); };
    br(1440, 2.5, 3.0, 'ademvolume ≈ 0,5 L', LUCHT, q.on('ademvolume', 1)); br(1440, 1.2, 6.0, 'vitale capaciteit', C.goud, q.on('vitale', 1) * 1); br(1620, 0, 1.2, 'restvolume', C.koraal, q.on('restvolume', 1));
    tag(ctx, 'ademminuutvolume ≈ 6–8 L per minuut', 1150, 130, C.text2, q.on('ademminuutvolume', 1) * (1 - q.on('vitale', 1)));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    ctx.save(); ctx.strokeStyle = rgba(CO2, 0.9); ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 140); ctx.lineTo(760, 380); ctx.stroke(); ctx.restore(); boom(ctx, 760, 380, 110, -0.6, 4, 1, rgba(CO2, 0.9), 22); boom(ctx, 760, 380, 110, 0.6, 4, 1, rgba(CO2, 0.9), 22);
    tag(ctx, 'dode ruimte ≈ 1,5 dL: geen gaswisseling', 1350, 260, CO2, q.on('ruimte', 1));
    const sn = q.on('oppervlakkig', 1); if (sn > 0.01) { ctx.save(); ctx.globalAlpha *= sn; staaf(ctx, 1150, 800, 120, 300, 4.2, 5, LUCHT, 'rustig 4,2 L', 1); staaf(ctx, 1380, 800, 120, 300, 2.4, 5, LUCHT, 'snel 2,4 L', 1); metaText(ctx, 'VERSE LUCHT IN DE LONGBLAASJES PER MINUUT (MODEL, 6 L/MIN ADEMEN)', 1300, 860, C.grain, 'center', 18); ctx.restore(); }
  },
  s15(ctx, t, q) { bg(ctx, 'micro');
    const sp = 1 - q.on('haarvaten', 1); const bad = q.on('badmintonveld', 1) * (1 - q.on('haarvaten', 1));
    if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; for (let i = 0; i < 60; i++) { const x = 400 + hash(i * 3) * 700, y = 220 + hash(i * 7) * 560; circ(ctx, x, y, 22 + hash(i) * 14, rgba(LONG, 0.15), rgba(LONG, 0.7), 1.5); } ctx.restore(); }
    if (bad > 0.01) { ctx.save(); ctx.globalAlpha *= bad; ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 3; ctx.strokeRect(1180, 300, 560, 260); ctx.beginPath(); ctx.moveTo(1460, 300); ctx.lineTo(1460, 560); ctx.stroke(); text(ctx, '≈ 70 m²', 1460, 620, fTitel(48), C.text, 'center'); ctx.restore(); }
    const lb = q.on('haarvaten', 1); longblaasje(ctx, 760, 480, 230, t, { a: lb, o2: q.on('Zuurstof', 1), co2: q.on('Koolstofdioxide', 1) });
    label(ctx, 'haarvat', '', 760 + 250, 480 - 80, 1250, 260, lb, HK.bloed); naamBij(ctx, 'longblaasje', '', 760, 185, lb, 'center', '#C9D2DE'); naamBij(ctx, 'wand < 0,001 mm', '', 1018, 470, q.on('dunner', 1), 'left', '#C9D2DE'); naamBij(ctx, 'vochtig', '', 455, 492, q.on('vochtig', 1), 'right', VOCHT);
    const cv = q.on('concentratie', 1); if (cv > 0.01) { ctx.save(); ctx.globalAlpha *= cv; regel(ctx, 'longblaasje: veel O₂', 1250, 520, 1, O2, 32); arrow(ctx, 1290, 550, 1290, 610, O2, 1, 4); regel(ctx, 'bloed: weinig O₂', 1250, 650, 1, O2, 32); ctx.restore(); }
    const kk = [['groot oppervlak', 'Groot'], ['dunne wand', 'dunne'], ['vochtig', 'vochtig'], ['concentratieverschil', 'blijft']];
    kk.forEach(([s, w], i) => tag(ctx, s, 380 + i * 390, 860, C.goud, q.on('Groot', 1) * clamp((t - q.at('Groot')) * 1.2 - i * 0.6, 0, 1)));
  },
  s16(ctx, t, q) { bg(ctx, 'schema'); staaf(ctx, 700, 760, 160, 420, 21, 21, O2, '21 %', 1); text(ctx, 'ingeademd', 780, 810, fTekst(30, 600), C.text2, 'center'); staaf(ctx, 1060, 760, 160, 420, 0, 21, O2, '', 1); ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(1060, 340, 160, 420); ctx.restore(); text(ctx, 'uitgeademd', 1140, 810, fTekst(30, 600), C.text2, 'center'); vraagteken(ctx, 1140, 590, q.on('Hoeveel', 1), 120); metaText(ctx, 'ZUURSTOF', 960, 260, C.grain, 'center', 24); },
  s18(ctx, t, q) { bg(ctx, 'schema');
    const u = ramp(t, 0.3, 1.5); staaf(ctx, 300, 700, 120, 400, 21, 21, O2, '21 %', 1); staaf(ctx, 450, 700, 120, 400, 16 * u, 21, O2, '16 %', 1); text(ctx, 'zuurstof', 435, 750, fTekst(30, 600), C.text2, 'center');
    staaf(ctx, 700, 700, 120, 400, 0.04, 21, CO2, '0,04 %', q.on('Koolstofdioxide', 1)); staaf(ctx, 850, 700, 120, 400, 4, 21, CO2, '4 %', q.on('Koolstofdioxide', 1)); text(ctx, 'koolstofdioxide', 835, 750, fTekst(30, 600), C.text2, 'center', q.on('Koolstofdioxide', 1));
    metaText(ctx, 'IN · UIT', 435, 250, C.grain, 'center', 20);
    tag(ctx, 'rest: vooral stikstof', 1450, 260, C.text2, q.on('stikstof', 1)); tag(ctx, 'warmer en vol waterdamp', 1450, 360, LUCHT, q.on('waterdamp', 1)); tag(ctx, 'genoeg O₂ voor mond-op-mondbeademing', 1450, 520, C.groen, q.on('beademing', 1));
  },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const op = ramp(t, q.at('vouwde'), 2.5); const v = 0.5 + 0.5 * Math.sin(t * 1.3) * (q.on('Middenrif', 1));
    borstkas(ctx, 760, 500, 1.1, { v, klap: (1 - op) * q.on('lucht', 1), gap: (1 - op) * q.on('lucht', 1), tsp: q.on('tussenribspieren', 1) * 0.6 });
    tag(ctx, 'longen volgen de borstkas: vliezen met vocht', 1400, 260, VOCHT, q.on('kleven', 1) * (1 - q.on('Daan', 2)));
    tag(ctx, 'lucht tussen de vliezen → long veert terug', 1400, 260, LUCHT, q.on('Daan', 2) * (1 - q.on('antwoord', 1)));
    tag(ctx, 'niet meer meegetrokken door de borstkas', 1400, 260, C.goud, q.on('antwoord', 1) * (1 - op));
    tag(ctx, 'lucht weggezogen: long vouwt weer open', 1400, 260, C.groen, op);
  },
};

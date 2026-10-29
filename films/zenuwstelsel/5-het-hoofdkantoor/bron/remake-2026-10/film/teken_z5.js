// Zenuwstelsel 5 · Het hoofdkantoor — tekeningen (lichte remake 29 okt 2026, Part C donker).
if (typeof dot === "undefined") var dot = function (ctx, x, y, r, fill, stroke, lw = 1.2) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }; // nodig voor lib_anatomie
// Nieuw in deze film (beeldbank 'later', keuze Kamiel 29 okt): hersenen in zijaanzicht met kwabben (z5Brein),
// dwarse doorsnede met grijze en witte stof (z5Doorsnede), bovenaanzicht met kruisende banen (z5Boven),
// uitgerold basilair membraan + slakkenhuis (z5Basilair, z5Slak), homunculus (z5Homunculus), thermostaatknop (z5Knop).
// Recepten (bronnen in bron/bronnen.md): grote hersenen ± 2/3 van de schedel, kleine hersenen achter-onder (± 1/10 van
// de massa), hersenstam vóór de kleine hersenen, gaat over in het ruggenmerg; centrale groeve loopt schuin van de kruin
// naar voren-omlaag tot net boven de zijgroeve; zijgroeve stijgt naar achteren; schors 2–4 mm (in de doorsnede ± 1/8
// van de straal); hersenbalk = witte band boven de zijventrikels, de thalamus eronder als grijze kern.
// Bekende fouten: hersenen als ovaal zonder hersenstam; kwabgrenzen als rechte lijnen; witte stof buiten.

const Z5 = { brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', grijs: '#8E8478', wit: '#E6DFD0', merg: '#D9C6B0', diep: '#B3A6DA' };
function z5Pad(ctx, pts, dicht = true) { ctx.beginPath(); bioPad(ctx, pts, dicht); if (dicht) ctx.closePath(); }
function z5Poly(ctx, pts) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); }
function z5Lijn(ctx, pts, col, lw, dash) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.restore(); }

// ---------- hersenen in zijaanzicht (linkerhelft, voorkant rechts), ontwerp ± 820 × 730 ----------
const Z5B = {
  groot: [[400, 10], [385, -90], [330, -182], [240, -256], [120, -300], [-20, -310], [-160, -286], [-280, -226], [-370, -130], [-410, -30], [-400, 58], [-345, 112], [-235, 128], [-110, 148], [10, 164], [128, 160], [200, 140], [240, 106], [252, 82], [292, 86], [360, 72]],
  SF: [[256, 80], [180, 56], [90, 36], [0, 18], [-80, -6], [-132, -42]],
  CS: [[-40, -312], [-20, -240], [8, -170], [30, -100], [55, -40], [80, 22]],
  PO: [[-284, -224], [-298, -110], [-308, -40], [-318, 60]],
  klein: [[-120, 128], [-200, 120], [-300, 122], [-362, 150], [-372, 200], [-330, 250], [-240, 268], [-150, 250], [-100, 205], [-96, 160]],
  stam: [[-20, 120], [30, 140], [42, 190], [24, 245], [8, 300], [6, 340], [-40, 340], [-44, 300], [-62, 245], [-80, 190], [-74, 140]],
  koord: [[6, 336], [2, 430], [-36, 430], [-40, 336]],
};
Z5B.lob = {
  f: [[-40, -420], ...Z5B.CS, [90, 36], [180, 56], [256, 80], [620, 92], [620, -420]],
  p: [[-40, -420], ...Z5B.CS, [90, 36], [0, 18], [-80, -6], [-132, -42], [-308, -40], [-298, -110], [-284, -224], [-280, -420]],
  t: [[620, 92], [256, 80], [180, 56], [90, 36], [0, 18], [-80, -6], [-132, -42], [-318, 60], [-330, 320], [620, 320]],
  o: [[-280, -420], [-284, -224], [-298, -110], [-308, -40], [-318, 60], [-330, 320], [-620, 320], [-620, -420]],
};
Z5B.lobNaam = { f: [230, -120], p: [-140, -180], t: [40, 105], o: [-345, -30] };
Z5B.gyri = [[[340, -60], [250, -40], [180, -90]], [[300, -170], [210, -130], [140, -190]], [[150, -270], [110, -200], [60, -230]], [[200, 20], [130, 0], [90, -40]],
  [[-70, -280], [-90, -200], [-150, -220]], [[-200, -250], [-170, -170], [-230, -120]], [[-60, -120], [-120, -90], [-180, -110]], [[-250, -60], [-210, -10]],
  [[200, 110], [100, 95], [0, 85], [-100, 70]], [[150, 145], [40, 135], [-80, 125]], [[-360, -100], [-330, -150]], [[-380, 20], [-340, -20]]];
Z5B.aud = [50, 58, 82, 17, 0.2];          // primaire gehoorschors: middelpunt, rx, ry, draai (bovenkant slaapkwab, onder de zijgroeve)
Z5B.vis = [-372, -12, 44, 92];
Z5B.assoc = { f: [220, -130, 150, 120], p: [-150, -175, 115, 90], t: [-60, 98, 150, 40], o: [-290, -40, 60, 85] };
Z5B.diep = { thal: [-30, 8], hth: [52, 62], hyp: [70, 132] };
function z5Strook(off, w) { // band langs de centrale groeve (off > 0 = ervoor), w breed
  const L = Z5B.CS.map(p => [p[0] + off, p[1]]), R = Z5B.CS.map(p => [p[0] + off + w, p[1]]).reverse(); return L.concat(R); }

function z5Brein(ctx, x, y, s = 1, o = {}) {
  const { a = 1, lob = {}, lobTint = {}, klein = 0, stam = 0, merg = 0, groot = 0, koord = 1, diep = 0, aud = 0, vis = 0, mot = 0, sen = 0, assoc = {}, groef = 0, cs = 0,
    namen = {}, dim = 0, schade = 0, hth = 0, hyp = 0, thal = 0, motSeg = null, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const R = { P, lob: {}, klein: P(-235, 195), stam: P(-20, 210), merg: P(-18, 300), koord: P(-17, 400), aud: P(Z5B.aud[0], Z5B.aud[1]), vis: P(Z5B.vis[0], Z5B.vis[1]),
    thal: P(...Z5B.diep.thal), hth: P(...Z5B.diep.hth), hyp: P(...Z5B.diep.hyp), mot: P(40, -160), sen: P(-15, -160), top: P(-20, -310), voor: P(400, 10) };
  for (const k in Z5B.lobNaam) R.lob[k] = P(...Z5B.lobNaam[k]);
  if (a <= 0.01) return R;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = 1.5 / Math.max(0.4, s);
  // ruggenmerg + hersenstam (achter de grote hersenen)
  if (koord > 0.01) { ctx.save(); ctx.globalAlpha *= koord; z5Poly(ctx, Z5B.koord); shape(ctx, Z5.merg, Z5.breinS, lw * 1.4); ctx.restore(); }
  z5Pad(ctx, Z5B.stam); shape(ctx, Z5.merg, Z5.breinS, lw * 1.4);
  if (merg > 0.01) { ctx.save(); z5Pad(ctx, Z5B.stam); ctx.clip(); ctx.fillStyle = rgba(C.goud, 0.6 * merg); ctx.fillRect(-90, 245, 140, 100); ctx.restore(); }
  if (stam > 0.01) { z5Pad(ctx, Z5B.stam); ctx.fillStyle = rgba(C.goud, 0.45 * stam); ctx.fill(); ctx.strokeStyle = rgba(C.goud, stam); ctx.lineWidth = lw * 3; ctx.stroke(); }
  // kleine hersenen met plooien (folia)
  z5Pad(ctx, Z5B.klein); shape(ctx, Z5.brein, Z5.breinS, lw * 1.4);
  ctx.save(); z5Pad(ctx, Z5B.klein); ctx.clip(); ctx.strokeStyle = rgba(Z5.breinD, 0.7); ctx.lineWidth = lw * 1.6;
  for (let k = 0; k < 7; k++) { const yy = 140 + k * 19; ctx.beginPath(); ctx.moveTo(-380, yy + 14); ctx.quadraticCurveTo(-240, yy - 14, -90, yy + 10); ctx.stroke(); }
  if (klein > 0.01) { ctx.fillStyle = rgba(C.goud, 0.45 * klein); ctx.fillRect(-400, 100, 320, 200); }
  ctx.restore();
  if (klein > 0.01) { z5Pad(ctx, Z5B.klein); ctx.strokeStyle = rgba(C.goud, klein); ctx.lineWidth = lw * 3; ctx.stroke(); }
  // grote hersenen
  z5Pad(ctx, Z5B.groot); shape(ctx, Z5.brein, Z5.breinS, lw * 1.6);
  ctx.save(); z5Pad(ctx, Z5B.groot); ctx.clip();
  for (const k of ['f', 'p', 't', 'o']) { const u = lobTint[k] || 0; if (u > 0.01) { z5Poly(ctx, Z5B.lob[k]); ctx.fillStyle = rgba(C.goud, 0.16 * u); ctx.fill(); } }
  for (const k of ['f', 'p', 't', 'o']) { const u = lob[k] || 0; if (u > 0.01) { z5Poly(ctx, Z5B.lob[k]); ctx.fillStyle = rgba(C.goud, 0.42 * u); ctx.fill(); } }
  ctx.strokeStyle = rgba(Z5.breinD, 0.5); ctx.lineWidth = lw * 2;
  for (const g of Z5B.gyri) { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); }
  // associatieve schors (oker), primaire gebieden (teal = binnenkomend, koraal = bewegen)
  for (const k in assoc) { const u = assoc[k]; if (u > 0.01) { const [cx, cy, rx, ry] = Z5B.assoc[k]; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.28 * u); ctx.fill(); ctx.strokeStyle = rgba(C.oker, 0.7 * u); ctx.lineWidth = lw * 1.5; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); } }
  if (schade > 0.01) { const [cx, cy, rx, ry] = Z5B.assoc.t; ctx.save(); ctx.beginPath(); ctx.ellipse(cx + 60, cy - 10, rx + 30, ry + 26, 0.18, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba(C.koraal, 0.8 * schade); ctx.lineWidth = lw * 2.5; for (let k = -30; k < 30; k++) { ctx.beginPath(); ctx.moveTo(-200 + k * 14, 20); ctx.lineTo(-100 + k * 14, 180); ctx.stroke(); } ctx.restore(); }
  if (mot > 0.01) { z5Pad(ctx, z5Strook(10, 46)); ctx.fillStyle = rgba(C.koraal, 0.75 * mot); ctx.fill(); }
  if (motSeg) { // verdeling van de motorische strook per lichaamsdeel (van de kruin naar beneden)
    const pts = z5Res(Z5B.CS.map(p => [p[0] + 33, p[1]]), 79); let u0 = 0; motSeg.forEach(([naam, frac, hl]) => { const i0 = Math.round(u0 * 79), i1 = Math.round(Math.min(1, u0 + frac) * 79); u0 += frac;
      ctx.strokeStyle = hl > 0.01 ? lighten(C.koraal, 0.25 * hl) : rgba(C.koraal, 0.55); ctx.lineWidth = 46 + 10 * (hl || 0); ctx.lineCap = 'butt'; ctx.beginPath(); for (let i = i0; i <= i1; i++) i === i0 ? ctx.moveTo(pts[i][0], pts[i][1]) : ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke();
      ctx.strokeStyle = Z5.breinD; ctx.lineWidth = lw * 2; const q = pts[i1], r = pts[Math.max(0, i1 - 1)], an = Math.atan2(q[1] - r[1], q[0] - r[0]) + Math.PI / 2; ctx.beginPath(); ctx.moveTo(q[0] - Math.cos(an) * 26, q[1] - Math.sin(an) * 26); ctx.lineTo(q[0] + Math.cos(an) * 26, q[1] + Math.sin(an) * 26); ctx.stroke(); }); ctx.lineCap = 'round'; }
  if (sen > 0.01) { z5Pad(ctx, z5Strook(-48, 42)); ctx.fillStyle = rgba(C.teal, 0.7 * sen); ctx.fill(); }
  if (aud > 0.01) { const [cx, cy, rx, ry, an] = Z5B.aud; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, an, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.85 * aud); ctx.fill(); ctx.strokeStyle = rgba(lighten(C.teal, 0.4), aud); ctx.lineWidth = lw * 1.5; ctx.stroke(); }
  if (vis > 0.01) { const [cx, cy, rx, ry] = Z5B.vis; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.85 * vis); ctx.fill(); }
  ctx.restore();
  // groeven
  z5Lijn(ctx, Z5B.SF, Z5.breinD, lw * 4);
  z5Lijn(ctx, Z5B.CS, cs > 0.01 ? C.goud : Z5.breinD, lw * (4 + 4 * cs));
  z5Lijn(ctx, Z5B.PO, rgba(Z5.breinD, 0.8), lw * 2, [12, 10]);
  z5Lijn(ctx, [[-132, -42], [-230, -42], [-308, -40]], rgba(Z5.breinD, 0.55), lw * 2, [12, 10]);
  z5Lijn(ctx, [[-132, -42], [-230, 10], [-318, 60]], rgba(Z5.breinD, 0.55), lw * 2, [12, 10]);
  if (groot > 0.01) { z5Pad(ctx, Z5B.groot); ctx.strokeStyle = rgba(C.goud, groot); ctx.lineWidth = lw * 4; ctx.stroke(); }
  // diepe structuren, gestippeld door de schors heen
  if (diep > 0.01) { ctx.save(); ctx.globalAlpha *= diep; ctx.setLineDash([8, 6]);
    const ov = (cx, cy, rx, ry, hl, col) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = hl > 0.01 ? rgba(col, 0.35 + 0.55 * hl) : rgba('#F2F2EE', 0.18); ctx.fill(); ctx.strokeStyle = hl > 0.01 ? col : rgba('#F2F2EE', 0.75); ctx.lineWidth = lw * 2; ctx.stroke(); };
    ov(...Z5B.diep.thal, 46, 26, thal, C.teal); ov(...Z5B.diep.hth, 26, 16, hth, C.paars);
    ctx.setLineDash([]); ctx.strokeStyle = hyp > 0.01 ? C.paars : rgba('#F2F2EE', 0.75); ctx.lineWidth = lw * 3; ctx.beginPath(); ctx.moveTo(56, 76); ctx.lineTo(66, 118); ctx.stroke(); ctx.setLineDash([8, 6]);
    ov(...Z5B.diep.hyp, 16, 14, hyp, Z5.diep); ctx.restore(); }
  if (dim > 0.01) { z5Pad(ctx, Z5B.groot); ctx.fillStyle = rgba(C.bgSchema, 0.55 * dim); ctx.fill(); }
  ctx.restore();
  // namen (schermcoördinaten, direct bij het deel)
  const N = (k, txt, meta, px, py, al = 'center', col = C.text) => { if (namen[k] > 0.01) naamBij(ctx, txt, meta, x + px * s, y + py * s, namen[k] * a, al, col); };
  N('f', 'voorhoofdskwab', null, 230, -110); N('p', 'wandbeenkwab', null, -150, -170); N('t', 'slaapkwab', null, 40, 118); N('o', 'achterhoofdskwab', null, -425, -60, 'right');
  N('klein', 'kleine hersenen', null, -420, 300, 'right'); N('stam', 'hersenstam', null, 60, 250, 'left'); N('koord', 'ruggenmerg', null, 30, 410, 'left');
  N('merg', 'verlengde merg', null, 60, 315, 'left', C.goud);
  return R;
}

// ---------- dwarse doorsnede (voorkant naar je toe), ontwerp ± 640 × 520 ----------
function z5Doorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, grijs = 0, wit = 0, balk = 0, thal = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const helft = (sg, k, wob) => { const pts = []; for (let i = 0; i < 64; i++) { const an = i / 64 * 6.283; let r = 1 + wob * 0.55 * Math.sin(an * 9 + sg) * (Math.abs(Math.cos(an)) > 0.92 && sg * Math.cos(an) < 0 ? 0.2 : 1);
      pts.push([sg * 162 + Math.cos(an) * 150 * k * r, -20 + Math.sin(an) * 205 * k * r]); } return pts; };
  for (const sg of [-1, 1]) { ctx.beginPath(); helft(sg, 1, 0.045).forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); shape(ctx, Z5.grijs, grijs > 0.01 ? C.goud : '#6E665C', grijs > 0.01 ? 4 : 1.5); }
  for (const sg of [-1, 1]) { ctx.beginPath(); helft(sg, 0.8, 0.03).forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); shape(ctx, Z5.wit, wit > 0.01 ? C.goud : '#C8C0B0', wit > 0.01 ? 4 : 1.2); }
  // hersenbalk: witte brug over de spleet, met de zijventrikels eronder
  ctx.beginPath(); ctx.moveTo(-130, -54); ctx.quadraticCurveTo(0, -96, 130, -54); ctx.lineTo(126, -28); ctx.quadraticCurveTo(0, -66, -126, -28); ctx.closePath(); shape(ctx, Z5.wit, balk > 0.01 ? C.goud : '#C8C0B0', balk > 0.01 ? 4 : 1.2);
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sg * 40, -22, 26, 12, sg * 0.35, 0, 6.283); ctx.fillStyle = '#2A3448'; ctx.fill(); }
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sg * 50, 40, 40, 32, 0, 0, 6.283); shape(ctx, Z5.grijs, thal > 0.01 ? C.goud : '#6E665C', 1.5); }
  if (balk > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.goud, balk); ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { const yy = -70 + k * 7; ctx.beginPath(); ctx.moveTo(-150, yy + 18); ctx.quadraticCurveTo(0, yy - 22, 150, yy + 18); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  return { grijs: [x - 300 * s, y - 120 * s], wit: [x - 170 * s, y + 60 * s], balk: [x, y - 80 * s], cortex: [x + 162 * s, y - 225 * s] };
}

// ---------- bovenaanzicht (voorkant boven), met kruisende banen ----------
function z5Boven(ctx, x, y, s = 1, o = {}) {
  const { a = 1, motL = 0, senL = 0, balk = 0, namen = 0 } = o; if (a <= 0.01) return {};
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const helft = (sg) => { const pts = []; for (let i = 0; i < 48; i++) { const an = i / 48 * 6.283; const rx = 150 * (1 - 0.12 * Math.max(0, -Math.sin(an))), ry = 250; let px = sg * 158 + Math.cos(an) * rx, py = Math.sin(an) * ry; if (sg * Math.cos(an) < -0.9) px = sg * 8; pts.push([px, py]); } return pts; };
  for (const sg of [-1, 1]) { z5Poly(ctx, helft(sg)); shape(ctx, Z5.brein, Z5.breinS, 2);
    ctx.save(); z5Poly(ctx, helft(sg)); ctx.clip();
    if (sg < 0 && motL > 0.01) { ctx.fillStyle = rgba(C.koraal, 0.8 * motL); ctx.beginPath(); ctx.moveTo(-10, -40); ctx.lineTo(-320, 10); ctx.lineTo(-320, 52); ctx.lineTo(-10, 2); ctx.closePath(); ctx.fill(); }
    if (sg < 0 && senL > 0.01) { ctx.fillStyle = rgba(C.teal, 0.8 * senL); ctx.beginPath(); ctx.moveTo(-10, 8); ctx.lineTo(-320, 58); ctx.lineTo(-320, 98); ctx.lineTo(-10, 48); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = rgba(Z5.breinD, 0.55); ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { const yy = -200 + k * 62; ctx.beginPath(); ctx.moveTo(sg * 20, yy); ctx.quadraticCurveTo(sg * 140, yy + 30 * Math.sin(k), sg * 290, yy + 20); ctx.stroke(); }
    ctx.strokeStyle = Z5.breinD; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sg * 12, 0); ctx.quadraticCurveTo(sg * 150, -10, sg * 300, 40); ctx.stroke(); // centrale groeve
    ctx.restore(); }
  if (balk > 0.01) { ctx.save(); ctx.globalAlpha *= balk; ctx.setLineDash([10, 7]); roundRect(ctx, -60, -90, 120, 170, 30); ctx.fillStyle = rgba(Z5.wit, 0.55); ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (namen > 0.01) { metaText(ctx, 'voorkant', x, y - 270 * s, C.text2, 'center', 28); naamBij(ctx, 'links', null, x - 170 * s, y + 300 * s, namen, 'center', C.text2); naamBij(ctx, 'rechts', null, x + 170 * s, y + 300 * s, namen, 'center', C.text2); }
  return { motL: P(-170, 25), senL: P(-200, 75), midden: P(0, 0), balk: P(0, -20) };
}

// ---------- slakkenhuis (klein, als icoon) en uitgerold basilair membraan ----------
function z5Slak(ctx, x, y, r, a = 1, col = '#D9C6B0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineCap = 'round';
  ctx.beginPath(); for (let i = 0; i <= 160; i++) { const u = i / 160, an = u * 2.75 * 6.283, rr = r * (1 - u * 0.85); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.92; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.lineWidth = r * 0.22; ctx.stroke(); ctx.strokeStyle = rgba('#121A26', 0.5); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function z5Basilair(ctx, x0, y0, w, o = {}) {
  const { a = 1, piek = -1, amp = 0, t = 0, cellen = 1, toon = [] } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const breed = u => 10 + 52 * u, N = 90;
  const golf = (u) => { let z = 0; const pk = [...toon]; if (piek >= 0) pk.push([piek, amp]); for (const [p, am] of pk) z += am * Math.exp(-Math.pow((u - p) / 0.06, 2)) * Math.sin(t * 14 - u * 40); return z; };
  ctx.beginPath(); for (let i = 0; i <= N; i++) { const u = i / N; ctx.lineTo(x0 + u * w, y0 - breed(u) / 2 + golf(u) * 34); } for (let i = N; i >= 0; i--) { const u = i / N; ctx.lineTo(x0 + u * w, y0 + breed(u) / 2 + golf(u) * 34); } ctx.closePath();
  shape(ctx, '#D9C6B0', '#B8A48C', 2);
  for (let i = 0; i < 28; i++) { const u = (i + 0.5) / 28; let hl = 0; const pk = [...toon]; if (piek >= 0) pk.push([piek, amp]); for (const [p, am] of pk) hl = Math.max(hl, am * Math.exp(-Math.pow((u - p) / 0.05, 2)));
    ctx.beginPath(); ctx.arc(x0 + u * w, y0 + golf(u) * 34, 5, 0, 6.283); ctx.fillStyle = hl > 0.3 ? C.teal : rgba('#5E6A80', 0.9 * cellen); ctx.fill(); }
  ctx.restore(); }

// ---------- homunculus (motorisch), zittend, vooraanzicht. Verhoudingen naar Penfields motorische kaart ----------
function z5Homunculus(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  const huid = '#D9B49A', huidS = '#B98E74', H = (k) => hl[k] || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const ring = (cx, cy, r, u) => { if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore(); } };
  // benen (dun) en voeten
  ctx.strokeStyle = huidS; ctx.lineWidth = 16; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sg * 18, 70); ctx.lineTo(sg * 70, 110); ctx.lineTo(sg * 60, 190); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sg * 72, 196, 24, 10, 0, 0, 6.283); ctx.fillStyle = huidS; ctx.fill(); }
  // romp (smal)
  ctx.beginPath(); ctx.ellipse(0, 10, 42, 72, 0, 0, 6.283); shape(ctx, huid, huidS, 2);
  if (H('rug') > 0.01) { ctx.save(); ctx.globalAlpha *= H('rug'); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, 10, 50, 80, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // armen dun, handen enorm
  ctx.strokeStyle = huid; ctx.lineWidth = 18; const hand = {};
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sg * 34, -40); ctx.lineTo(sg * 110, 10); ctx.lineTo(sg * 150, 60); ctx.stroke();
    const hx = sg * 205, hy = 70, tik = sg > 0 ? Math.max(0, Math.sin(t * 6.28 * 2)) * 8 : 0; hand[sg] = [hx, hy];
    ctx.save(); ctx.translate(hx, hy + tik); ctx.beginPath(); ctx.ellipse(0, 0, 66, 78, sg * 0.25, 0, 6.283); shape(ctx, huid, huidS, 2);
    for (let f = 0; f < 4; f++) { const an = -1.95 + f * 0.32 + (sg < 0 ? 0 : 0); const fx = Math.cos(an) * 66 * (sg), fy = Math.sin(an) * 70; ctx.save(); ctx.translate(fx * 0.9, fy * 0.9); ctx.rotate(sg > 0 ? an + 1.57 : -an - 1.57 + 3.14); roundRect(ctx, -15, -58, 30, 66, 15); shape(ctx, huid, huidS, 2); ctx.restore(); }
    ctx.save(); ctx.translate(sg * -60, 10); ctx.rotate(sg * -0.9); roundRect(ctx, -15, -54, 30, 60, 15); shape(ctx, huid, huidS, 2); ctx.restore();
    ctx.restore(); }
  // hoofd met grote lippen en tong
  ctx.beginPath(); ctx.ellipse(0, -118, 58, 66, 0, 0, 6.283); shape(ctx, huid, huidS, 2);
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sg * 60, -118, 14, 24, 0, 0, 6.283); shape(ctx, huid, huidS, 2); ctx.beginPath(); ctx.arc(sg * 22, -138, 6, 0, 6.283); ctx.fillStyle = '#3A2A20'; ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(-6, -128); ctx.lineTo(-10, -108); ctx.lineTo(4, -106); ctx.strokeStyle = huidS; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -80, 52, 26, 0, 0, 6.283); shape(ctx, '#C46A62', '#9E4A44', 2.5);   // lippen
  ctx.beginPath(); ctx.moveTo(-44, -80); ctx.quadraticCurveTo(0, -70, 44, -80); ctx.strokeStyle = '#7A3430'; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -52, 26, 30, 0, 0, 3.1416); ctx.lineTo(-26, -66); ctx.fillStyle = '#E08A86'; ctx.fill(); ctx.strokeStyle = '#B5605C'; ctx.lineWidth = 2; ctx.stroke(); // tong
  ring(205, 70, 100, H('hand')); ring(-205, 70, 100, H('hand')); ring(0, -80, 66, H('lippen')); ring(0, -44, 40, H('tong'));
  ctx.restore();
  return { hand: [x + 205 * s, y + 70 * s], handL: [x - 205 * s, y + 70 * s], lippen: [x, y - 80 * s], tong: [x, y - 40 * s], rug: [x, y + 10 * s], top: [x, y - 190 * s] };
}

// ---------- thermostaatknop: schaal 35–42 °C, gouden wijzer = normwaarde, koraal boog = lichaamstemperatuur ----------
function z5Knop(ctx, x, y, r, o = {}) {
  const { a = 1, norm = 37, temp = 37, toonTemp = 1, toonNorm = 1 } = o; if (a <= 0.01) return;
  const ang = (v) => Math.PI * 0.75 + (clamp(v, 35, 42) - 35) / 7 * Math.PI * 1.5;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#2A3A58', C.line, 2);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; for (let v = 35; v <= 42; v++) { const an = ang(v); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); ctx.lineTo(x + Math.cos(an) * r * 0.92, y + Math.sin(an) * r * 0.92); ctx.stroke(); }
  for (const v of [35, 37, 42]) { const an = ang(v); text(ctx, String(v), x + Math.cos(an) * r * 1.22, y + Math.sin(an) * r * 1.22 + 10, fMeta(28), C.text2, 'center'); }
  if (toonTemp > 0.01) { ctx.save(); ctx.globalAlpha *= toonTemp; const col = temp > norm + 0.15 ? C.koraal : temp < norm - 0.15 ? C.teal : C.text; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, r * 0.62, ang(35), ang(temp)); ctx.stroke(); ctx.restore(); }
  if (toonNorm > 0.01) { ctx.save(); ctx.globalAlpha *= toonNorm; const an = ang(norm); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.85, y + Math.sin(an) * r * 0.85); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- kleine helpers ----------
function z5Noot(ctx, x, y, s = 1, a = 1, col = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 4 * s;
  ctx.beginPath(); ctx.ellipse(x, y, 13 * s, 9 * s, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 11 * s, y - 3 * s); ctx.lineTo(x + 11 * s, y - 52 * s); ctx.quadraticCurveTo(x + 30 * s, y - 40 * s, x + 26 * s, y - 24 * s); ctx.stroke(); ctx.restore(); }
function z5Res(pts, N) { const D = bioDicht(pts, 16); D.push(pts[pts.length - 1]); const out = []; for (let i = 0; i <= N; i++) { const p = bioPunt(D, i / N); out.push([p[0], p[1]]); } return out; }
function z5Pad2(pts, u) { const P = z5Res(pts, 119); const i = clamp(Math.floor(u * 119), 0, 119); return P[i]; }
function z5Baan(ctx, pts, u, col, a = 1, lw = 6, puls = -1) { // baan die tot fractie u is getekend, met een impuls (bandje) op puls
  if (a <= 0.01 || u <= 0.001) return; const P = z5Res(pts, 119), n = Math.max(1, Math.round(u * 119)); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(P[i][0], P[i][1]) : ctx.moveTo(P[i][0], P[i][1]); ctx.stroke();
  if (n >= 119) { const q = P[119], r = P[114], an = Math.atan2(q[1] - r[1], q[0] - r[0]); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(q[0] + Math.cos(an) * 6, q[1] + Math.sin(an) * 6); ctx.lineTo(q[0] - Math.cos(an - 0.5) * 22, q[1] - Math.sin(an - 0.5) * 22); ctx.lineTo(q[0] - Math.cos(an + 0.5) * 22, q[1] - Math.sin(an + 0.5) * 22); ctx.closePath(); ctx.fill(); }
  if (puls >= 0 && puls <= 1) { const i = Math.round(puls * 119), q = P[i]; ctx.beginPath(); ctx.arc(q[0], q[1], lw * 1.6, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore(); }
function z5Hand(ctx, x, y, s = 1, a = 1, sg = 1, tik = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(sg * s, s); ctx.rotate(-tik * 0.25);
  const huid = '#D9A982', hs = '#BF8C66'; roundRect(ctx, -10, -40, 120, 34, 16); shape(ctx, huid, hs, 2); // onderarm
  ctx.beginPath(); ctx.ellipse(-36, -22, 40, 26, 0, 0, 6.283); shape(ctx, huid, hs, 2);
  for (let f = 0; f < 4; f++) { roundRect(ctx, -104 + f * 4, -38 + f * 10, 52, 13, 6); shape(ctx, huid, hs, 1.5); }
  roundRect(ctx, -60, -56, 34, 12, 6); shape(ctx, huid, hs, 1.5); ctx.restore(); }
function z5Kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#2A3A58', 0.85), rand, 1.5); ctx.restore(); }
function z5Hart(ctx, x, y, r, a = 1, slag = 0) { if (a <= 0.01) return; const k = 1 + 0.12 * Math.pow(Math.max(0, Math.sin(slag)), 4); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(0, r * 0.9); ctx.bezierCurveTo(-r * 1.3, -r * 0.1, -r * 0.7, -r * 1.1, 0, -r * 0.45); ctx.bezierCurveTo(r * 0.7, -r * 1.1, r * 1.3, -r * 0.1, 0, r * 0.9); shape(ctx, '#B5574A', '#E07A6A', 2);
  ctx.strokeStyle = '#E07A6A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-r * 0.15, -r * 0.5); ctx.quadraticCurveTo(r * 0.05, 0, -r * 0.1, r * 0.5); ctx.stroke(); ctx.restore(); }

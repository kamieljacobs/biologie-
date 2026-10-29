// Zenuwstelsel · Zintuigen — scènes per alinea (v1.0, 14 okt 2026; v1.1 opgewaardeerd naar prompt v13, 28 okt 2026: castpersonages, geen korrel en gloed, rodopsine als kralenketen; zie bron/info.md).
// Achtergrond Micro zonder korrel buiten cellen (Part C2, beeldafspraak 15 okt 2026).
function bgM(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
const PERSON_LOOK = { skin: SKINS[2], hair: '#2E211A', shirt: '#C9483E', hairStyle: 'long', trousers: '#2A3242' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(34, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(34, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function mixHex(a, b, u) { u = clamp(u, 0, 1); const p = s => { const n = parseInt(s.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(a), B = p(b); const h = A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); return '#' + h; }

// ---------- kleuren ----------
const LICHT = '#F2D27A', SCLERA = '#D8DCE2', VAAT = '#8C3A4A', NETV = '#E0A07A', IRIS = '#5B8C6A', LENS = '#BFE0F0', STRAAL = '#B5574A', ZENUW = '#E0B64A';
const KEG = ['#E07A5F', '#7FC48F', '#5BA4C9'], STAAF = '#9AA3B2', HUID = '#C99A78', BOT = '#E6D8A8', SLAK = '#C9A35C', KANAAL = '#5BA4C9';

// ---------- het oog (licht komt van links) ----------
// o: len (horizontale rek), bol (0 plat..1 bol), pupil (0..1), lab (alpha labels), dl (dict alpha per deel)
function oog(ctx, x, y, R, o = {}) { const { len = 1, bol = 0.4, pupil = 0.6, a = 1, gv = 0, bv = 0, straal = 1 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const rx = R * len, P = (an, k = 1) => [x + rx * k * Math.cos(an), y + R * k * Math.sin(an)];
  // glasachtig lichaam
  ctx.beginPath(); ctx.ellipse(x, y, rx, R, 0, 0, 6.283); shape(ctx, rgba('#2A4A6A', 0.35), null);
  // harde oogrok (opening voor)
  ctx.beginPath(); ctx.ellipse(x, y, rx, R, 0, -2.6, 2.6); ctx.strokeStyle = SCLERA; ctx.lineWidth = 10; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, rx - 11, R - 11, 0, -2.25, 2.25); ctx.strokeStyle = VAAT; ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, rx - 19, R - 19, 0, -2.15, 2.15); ctx.strokeStyle = NETV; ctx.lineWidth = 7; ctx.stroke();
  // hoornvlies
  const cx0 = x + rx * Math.cos(2.6), cry = R * Math.sin(2.6);
  ctx.beginPath(); ctx.ellipse(cx0, y, R * 0.2, cry, 0, Math.PI / 2, 1.5 * Math.PI); ctx.strokeStyle = '#E8F4FA'; ctx.lineWidth = 6; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx0, y, R * 0.2, cry, 0, Math.PI / 2, 1.5 * Math.PI); ctx.fillStyle = rgba('#BFE0F0', 0.12); ctx.fill();
  // lens + straalvormig lichaam + lensbandjes
  const lx = cx0 + R * 0.24, lry = R * 0.32, lrx = R * (0.07 + 0.08 * bol);
  if (straal > 0.01) { ctx.save(); ctx.globalAlpha *= straal; for (const s of [-1, 1]) { const sy = y + s * R * 0.47; ctx.beginPath(); ctx.ellipse(lx, sy, R * 0.07, R * 0.05, 0, 0, 6.283); shape(ctx, STRAAL, lighten(STRAAL, 0.3), 1.5);
      ctx.strokeStyle = rgba('#E6E1D3', 0.8); ctx.lineWidth = 1.6; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(lx + k * R * 0.025, sy - s * R * 0.04); ctx.lineTo(lx + k * lrx * 0.3, y + s * lry * 0.96); ctx.stroke(); } } ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(lx, y, lrx, lry, 0, 0, 6.283); shape(ctx, rgba(LENS, 0.55), '#E8F4FA', 2.5);
  // iris met pupil
  const ix = cx0 + R * 0.12, ph = R * (0.07 + 0.17 * pupil);
  ctx.strokeStyle = IRIS; ctx.lineWidth = 12; ctx.lineCap = 'round'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(ix, y + s * cry * 0.95); ctx.lineTo(ix, y + s * ph); ctx.stroke(); }
  // gele vlek, blinde vlek, oogzenuw
  const gvp = P(0, (rx - 19) / rx); const bvA = 0.42, bvp = [x + (rx - 19) * Math.cos(bvA), y + (R - 19) * Math.sin(bvA)];
  ctx.beginPath(); ctx.moveTo(bvp[0] - 6, bvp[1] - 14); ctx.quadraticCurveTo(bvp[0] + R * 0.35, bvp[1] + R * 0.05, bvp[0] + R * 0.55, bvp[1] + R * 0.35); ctx.strokeStyle = ZENUW; ctx.lineWidth = 26; ctx.stroke();
  circ(ctx, gvp[0], gvp[1], 9 + 6 * gv, rgba('#F0D040', 0.5 + 0.5 * gv)); if (bv > 0.01) circ(ctx, bvp[0], bvp[1], 13, rgba('#1A2740', bv), rgba(C.koraal, bv), 3);
  ctx.restore();
  return { horn: [cx0 - R * 0.2, y], hornTop: [cx0 - R * 0.14, y - cry * 0.7], iris: [ix, y - cry * 0.7], pupil: [ix, y], lens: [lx, y], lensTop: [lx, y - lry * 0.8], straal: [lx, y - R * 0.47], bandje: [lx + lrx * 0.2, y - R * 0.4], glas: [x + rx * 0.15, y + R * 0.2], netv: P(-0.9, (R - 19) / R), vaat: P(-1.25, (R - 11) / R), sclera: P(-1.6), gv: gvp, bv: bvp, zenuw: [bvp[0] + R * 0.5, bvp[1] + R * 0.3], xr: x + rx - 19, lx, rx };
}
// lichtstralen: van bron naar lens, dan naar brandpunt xF; getekend tot het netvlies xR
function stralen(ctx, x0, xL, xF, xR, y, hs, col, a = 1, near = false, nearY = y, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  for (const h of hs) { const sy = near ? nearY : y + h; const yR = y + h * (1 - (xR - xL) / (xF - xL)); const pts = [[x0, sy], [xL, y + h], [xR, yR]]; const L1 = Math.hypot(xL - x0, y + h - sy), L2 = Math.hypot(xR - xL, yR - y - h); let d = (L1 + L2) * u;
    ctx.beginPath(); ctx.moveTo(x0, sy); if (d <= L1) { ctx.lineTo(x0 + (xL - x0) * d / L1, sy + (y + h - sy) * d / L1); } else { ctx.lineTo(xL, y + h); const v = (d - L1) / L2; ctx.lineTo(xL + (xR - xL) * v, y + h + (yR - y - h) * v); } ctx.stroke(); }
  ctx.restore(); }
function stralenHorn(ctx, x0, xH, xL, xR, y, hs, col, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, x0 + (xR - x0) * u, H); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  for (const h of hs) { ctx.beginPath(); ctx.moveTo(x0, y + h); ctx.lineTo(xH, y + h); ctx.lineTo(xL, y + h * 0.7); ctx.lineTo(xR, y); ctx.stroke(); } ctx.restore(); }
function stralenBril(ctx, x0, xB, xL, xF, xR, y, hs, k, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  for (const h of hs) { const hL = h * (1 + k), yR = y + hL * (1 - (xR - xL) / (xF - xL)); ctx.beginPath(); ctx.moveTo(x0, y + h); ctx.lineTo(xB, y + h); ctx.lineTo(xL, y + hL); ctx.lineTo(xR, yR); ctx.stroke(); } ctx.restore(); }
function vlekje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r * 0.8, rgba(col, 0.3)); circ(ctx, x, y, r * 0.42, rgba(col, 0.9)); ctx.restore(); } // lichtvlek zonder gloed (Part C)
function brilglas(ctx, x, y, h, hol, col = '#BFE0F0', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); const k = hol ? -1 : 1, b = 22;
  ctx.moveTo(x - 10, y - h); ctx.lineTo(x + 10, y - h); ctx.quadraticCurveTo(x + 10 + k * b, y, x + 10, y + h); ctx.lineTo(x - 10, y + h); ctx.quadraticCurveTo(x - 10 - k * b, y, x - 10, y - h); ctx.closePath(); shape(ctx, rgba(col, 0.35), '#E8F4FA', 2); ctx.restore(); }

// ---------- netvlies: staafjes en kegeltjes ----------
function staafje(ctx, x, y, s = 1, a = 1, stof = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12 * s, y - 150 * s, 24 * s, 110 * s, 10 * s); shape(ctx, rgba(STAAF, 0.35), STAAF, 2); for (let k = 0; k < 8; k++) { const al = clamp(stof * 8 - k, 0, 1); if (al > 0.01) { ctx.fillStyle = rgba('#B05A9A', 0.85 * al); ctx.fillRect(x - 9 * s, y - (145 - k * 13) * s, 18 * s, 6 * s); } } roundRect(ctx, x - 10 * s, y - 40 * s, 20 * s, 60 * s, 8 * s); shape(ctx, rgba(STAAF, 0.2), STAAF, 1.5); ctx.restore(); }
function kegeltje(ctx, x, y, s = 1, col = KEG[0], a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - 110 * s); ctx.lineTo(x + 16 * s, y - 40 * s); ctx.lineTo(x - 16 * s, y - 40 * s); ctx.closePath(); shape(ctx, rgba(col, 0.6), col, 2); roundRect(ctx, x - 13 * s, y - 40 * s, 26 * s, 60 * s, 10 * s); shape(ctx, rgba(col, 0.2), col, 1.5); ctx.restore(); }

// ---------- het oor (uitwendig links, binnenoor rechts) ----------
function oor(ctx, t, o = {}) { const { a = 1, tril = 0, druk = 0, buis = 1, kan = 1, open = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // hoofd/rots
  roundRect(ctx, 760, 250, 620, 560, 40); shape(ctx, rgba('#6B5848', 0.25), null);
  // oorschelp
  ctx.beginPath(); ctx.moveTo(380, 300); ctx.bezierCurveTo(200, 260, 170, 520, 260, 640); ctx.bezierCurveTo(300, 700, 380, 690, 400, 620); ctx.lineTo(400, 510); ctx.lineTo(400, 430); ctx.closePath(); shape(ctx, rgba(HUID, 0.7), lighten(HUID, 0.2), 3);
  // gehoorgang
  ctx.fillStyle = rgba(HUID, 0.45); ctx.fillRect(390, 432, 400, 16); ctx.fillRect(390, 512, 400, 16); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fillRect(390, 448, 400, 64);
  // middenoor
  roundRect(ctx, 800, 340, 210, 270, 30); shape(ctx, rgba('#0D1420', 0.65), rgba(C.line, 0.5), 1.5);
  // buis van Eustachius
  if (buis > 0.01) { ctx.save(); ctx.globalAlpha *= buis; ctx.strokeStyle = rgba('#E07A6E', 0.8); ctx.lineWidth = 26 + 12 * open; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(900, 600); ctx.quadraticCurveTo(920, 720, 1060, 820); ctx.stroke(); ctx.strokeStyle = rgba('#0D1420', 0.9); ctx.lineWidth = 10 + 16 * open; ctx.beginPath(); ctx.moveTo(900, 600); ctx.quadraticCurveTo(920, 720, 1060, 820); ctx.stroke(); ctx.restore(); }
  // trommelvlies
  const tv = 6 * tril * Math.sin(t * 40) + 22 * druk;
  ctx.beginPath(); ctx.moveTo(792, 420); ctx.quadraticCurveTo(808 + tv, 480, 792, 540); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke();
  // gehoorbeentjes
  const bt = 3 * tril * Math.sin(t * 40); ctx.strokeStyle = BOT; ctx.lineCap = 'round';
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(806 + tv * 0.6, 480); ctx.lineTo(870 + bt, 400); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(890 + bt, 400, 26, 18, 0.3, 0, 6.283); shape(ctx, BOT, null);
  ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(905 + bt, 415); ctx.lineTo(950 + bt, 470); ctx.stroke();
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(950 + bt, 470); ctx.lineTo(995 + bt, 450); ctx.moveTo(950 + bt, 470); ctx.lineTo(995 + bt, 500); ctx.stroke(); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(998 + bt, 444); ctx.lineTo(998 + bt, 506); ctx.stroke();
  // ovale venster
  ctx.beginPath(); ctx.ellipse(1010, 475, 7, 30, 0, 0, 6.283); shape(ctx, rgba(SLAK, 0.6), SLAK, 2);
  // halfcirkelvormige kanalen + blaasjes
  if (kan > 0.01) { ctx.save(); ctx.globalAlpha *= kan; ctx.strokeStyle = KANAAL; ctx.lineWidth = 12; for (const [cx, cy, rr, r0, r1] of [[1080, 360, 62, 3.4, 6.9], [1170, 330, 58, 3.6, 7.0], [1230, 400, 52, 4.6, 8.0]]) { ctx.beginPath(); ctx.arc(cx, cy, rr, r0, r1); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(1105, 450, 50, 30, 0, 0, 6.283); shape(ctx, rgba(KANAAL, 0.45), KANAAL, 2); ctx.restore(); }
  // slakkenhuis
  ctx.save(); ctx.strokeStyle = SLAK; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const u = i / 80, an = 3.6 + u * 2.6 * 6.283 * 0.5, r = 95 * (1 - 0.75 * u); const px = 1170 + r * Math.cos(an), py = 560 + r * Math.sin(an); i ? ctx.lineTo(px, py) : ctx.moveTo(1030, 520); } ctx.stroke(); ctx.restore();
  // gehoorzenuw
  ctx.strokeStyle = ZENUW; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1190, 560); ctx.quadraticCurveTo(1330, 560, 1460, 500); ctx.stroke();
  ctx.restore(); }
function zones(ctx, a1, a2, a3) { const z = [[230, 790, 'uitwendig oor', a1], [800, 1010, 'middenoor', a2], [1010, 1300, 'binnenoor', a3]]; for (const [x1, x2, s, al] of z) { if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.grain; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1 + 6, 232); ctx.lineTo(x1 + 6, 218); ctx.lineTo(x2 - 6, 218); ctx.lineTo(x2 - 6, 232); ctx.stroke(); metaText(ctx, s, (x1 + x2) / 2, 200, C.grain, 'center', 24); ctx.restore(); } }
function haarcel(ctx, x, y, s = 1, buig = 0, a = 1, kapot = 0, col = SLAK) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.75 * kapot); roundRect(ctx, x - 26 * s, y - 60 * s, 52 * s, 110 * s, 20 * s); shape(ctx, rgba(col, 0.3), col, 2); circ(ctx, x, y, 12 * s, rgba('#8C7BBF', 0.7));
  ctx.strokeStyle = C.text; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; for (let k = 0; k < 5; k++) { const bx = x - 16 * s + k * 8 * s, hgt = (30 + k * 8) * s; const dr = kapot > 0.5 ? 0.9 + 0.3 * k : buig; ctx.beginPath(); ctx.moveTo(bx, y - 60 * s); ctx.quadraticCurveTo(bx + dr * hgt * 0.3, y - 60 * s - hgt * 0.6, bx + dr * hgt * 0.8, y - 60 * s - hgt * Math.cos(clamp(dr, -1.2, 1.2) * 0.6)); ctx.stroke(); } ctx.restore(); }

// ---------- buiten in het donker ----------
function fietspad(ctx, t, o = {}) { const { veld = 0, zie = 1, kleur = 1, noorX = 900, zwart = 0, noor = 1 } = o; // o.loopt: Noor loopt (castboek-zijaanzicht)
  ctx.fillStyle = '#0A101C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#121A26'; ctx.fillRect(0, 640, W, H - 640);
  for (let i = 0; i < 40; i++) circ(ctx, hash(i) * W, hash(i + 50) * 360, 1.5, rgba('#F2F2EE', 0.5 * zie));
  // sportveld links met lichtmasten
  if (veld > 0.01) { ctx.save(); ctx.globalAlpha *= veld; ctx.beginPath(); ctx.moveTo(0, 650); ctx.lineTo(560, 650); ctx.lineTo(700, 900); ctx.lineTo(0, 900); ctx.closePath(); ctx.fillStyle = '#2F7A3A'; ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(280, 650); ctx.lineTo(330, 900); ctx.stroke();
    for (const mx of [120, 470]) { ctx.fillStyle = '#5A6070'; ctx.fillRect(mx - 5, 260, 10, 390); roundRect(ctx, mx - 45, 230, 90, 40, 8); shape(ctx, '#F2F2EE', null); ctx.fillStyle = rgba('#FFF4D0', 0.14); ctx.beginPath(); ctx.moveTo(mx - 40, 270); ctx.lineTo(mx + 260, 900); ctx.lineTo(mx - 300, 900); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  // pad
  ctx.beginPath(); ctx.moveTo(700, 900); ctx.lineTo(1900, 900); ctx.lineTo(1900, 700); ctx.lineTo(1300, 660); ctx.closePath(); ctx.fillStyle = mixHex('#2A2E36', '#3E4048', kleur * 0.3); ctx.fill();
  // bomen (in het donker: grijs)
  for (let i = 0; i < 6; i++) { const bx = 900 + i * 180, by = 640 - 10 * (i % 2); const kr = mixHex('#3A4048', '#2F5A3A', kleur); ctx.fillStyle = mixHex('#2A2C30', '#5A4030', kleur); ctx.fillRect(bx - 10, by - 120, 20, 130); ctx.beginPath(); ctx.ellipse(bx, by - 190, 80, 110, 0, 0, 6.283); ctx.fillStyle = kr; ctx.fill(); }
  if (noor > 0.01) { const G = CAST.noor.garderobe; G._nacht = Object.assign({}, G.winter, { topKleur: mixHex('#3A3A3E', '#C9483E', kleur), topAccent: mixHex('#2E2E32', '#A83A32', kleur), sjaal: mixHex('#4A4A4E', '#E0A43A', kleur), broek: mixHex('#26282E', '#33415C', kleur) });
    persoon(ctx, 'noor', noorX, 860, 420, Object.assign({ a: noor, outfit: '_nacht', uit: 'neutraal', t }, o.loopt ? { zij: true, kijk: 1, gang: 'loop' } : {})); }
  // waarneming: zwart over alles
  const ov = clamp(zwart + (1 - zie) * 0.92, 0, 0.96); if (ov > 0.01) { ctx.fillStyle = rgba('#000000', ov); ctx.fillRect(0, 0, W, CAPTION_Y); }
}

// grafiek gevoeligheid in het donker
function adaptGraf(ctx, x, y, w, h, u, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { m10 = 0, m30 = 0, keg = 0 } = o;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  regel(ctx, 'gevoeligheid van je ogen', x - 14, y - h - 20, 1, C.text2, 24, 'left', 700); regel(ctx, 'minuten in het donker', x + w, y + 70, 1, C.text2, 24, 'right', 700);
  for (const m of [0, 10, 20, 30]) regel(ctx, String(m), x + m / 30 * w, y + 34, 1, C.text2, 22, 'center', 600);
  const f = m => m < 8 ? 0.28 * (1 - Math.exp(-m / 2.5)) / (1 - Math.exp(-3.2)) : 0.28 + 0.72 * (1 - Math.exp(-(m - 8) / 7)) / (1 - Math.exp(-22 / 7));
  ctx.strokeStyle = STAAF; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 120 * u; i++) { const m = i / 4, px = x + m / 30 * w, py = y - f(m) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (keg > 0.01) { ctx.save(); ctx.globalAlpha *= keg; ctx.setLineDash([8, 8]); ctx.strokeStyle = KEG[0]; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 8 / 30 * w, y - 0.28 * h); ctx.lineTo(x + w, y - 0.28 * h); ctx.stroke(); ctx.restore(); regel(ctx, 'kegeltjes klaar', x + w - 10, y - 0.28 * h + 34, keg, KEG[0], 22, 'right', 700); }
  if (m10 > 0.01) { const px = x + 10 / 30 * w, py = y - f(10) * h; circ(ctx, px, py, 10, rgba(C.goud, m10)); regel(ctx, 'weer iets zien', px + 20, py + 10, m10, C.goud, 24, 'left', 700); }
  if (m30 > 0.01) { const px = x + 25 / 30 * w, py = y - f(25) * h; circ(ctx, px, py, 10, rgba(C.groen, m30)); regel(ctx, '20–30 min: het best', px, py - 26, m30, C.groen, 24, 'center', 700); }
  ctx.restore(); }

function keten(ctx, x, y, items, al) { items.forEach(([s, col], i) => { const xx = x + i * 330; tag(ctx, s, xx, y, col, al[i]); if (i < items.length - 1) arrow(ctx, xx + 120, y - 12, xx + 205, y - 12, C.line, al[i + 1], 3); }); }

// hoofd van opzij = castpersonage (Noor, zijaanzicht) als borstbeeld; draait om de nek; gouden stip = binnenoor met het evenwichtsorgaan.
// Was een zelfgetekend hoofd zonder gezicht (v1.0). x, y = midden van het hoofd, zoals voorheen.
function hoofd(ctx, x, y, rot = 0) { const h = 1360, hh = h * (CAST.noor.lengte || 1) / 6.1, vy = y + h * (CAST.noor.lengte || 1) - hh * 0.62, ny = y + hh * 0.78;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 420, 0, 840, CAPTION_Y - 6); ctx.clip(); ctx.translate(x, ny); ctx.rotate(rot); ctx.translate(-x, -ny);
  const A = persoon(ctx, 'noor', x, vy, h, { zij: true, kijk: 1, uit: 'neutraal' }); const r = A.hoofd ? A.hoofd.r : 120, hx = A.hoofd ? A.hoofd.x : x, hy = A.hoofd ? A.hoofd.y : y;
  circ(ctx, hx - r * 0.12, hy + r * 0.12, r * 0.09, rgba(C.goud, 0.95)); ctx.restore(); }
const SCENES = {
  title(ctx, t) { bg(ctx, 'schema'); oog(ctx, 1380, 520, 190, { pupil: 0.5 + 0.2 * Math.sin(t) }); ctx.save(); ctx.translate(1520, 760); ctx.scale(0.35, 0.35); ctx.restore(); },

  s01(ctx, t, q) { const loop = q.on('fietspad', 1);
    const zie = q.on('tijdje', 1) * 0.9;
    const t0 = q.at('fietspad', 1), vL = gangSnelheid('noor', 420, 'loop'), nx = 420 + vL * Math.max(0, t - t0), loopt = t > t0 && nx < 1250;
    fietspad(ctx, t, { veld: loop > 0.5 ? 0.45 : 1, zie: loop > 0.5 ? zie : 1, kleur: loop > 0.5 ? 0 : 1, noorX: Math.min(nx, 1250), zwart: 0, loopt });
    regel(ctx, 'fel verlicht kunstgrasveld', 300, 180, q.on('kunstgrasveld', 1) * (1 - loop), C.text, 30, 'center', 700);
    tag(ctx, 'eerst: bijna niets', 960, 160, C.text2, q.on('Eerst', 1) * (1 - q.on('tijdje', 1)));
    tag(ctx, 'na een tijdje: bomen en pad, maar alles grijs', 960, 160, C.text2, q.on('tijdje', 1) * (1 - q.on('Waarom', 1)));
    tag(ctx, 'rode jas lijkt bijna zwart', 1250, 330, C.koraal, q.on('jas', 1) * (1 - q.on('Waarom', 1)));
    vraagteken(ctx, 960, 300, q.on('Waarom', 1), 150); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('Licht', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; metaText(ctx, 'film Eén seconde', 960, 220, C.grain, 'center', 26);
      keten(ctx, 470, 420, [['prikkel', LICHT], ['receptor', C.teal], ['impuls', C.goud]], [q.on('prikkel', 1), q.on('receptor', 1), q.on('impuls', 1)]);
      roundRect(ctx, 260, 560, 1400, 200, 26); shape(ctx, rgba(C.fill, 0.4 * q.on('zintuig', 1)), rgba(C.groen, q.on('zintuig', 1)), 2);
      regel(ctx, 'zintuig = receptoren', 960, 640, q.on('zintuig', 1), C.groen, 38, 'center', 700); regel(ctx, '+ delen die de prikkel opvangen en richten', 960, 710, q.on('onderdelen', 1), C.text, 32, 'center', 600); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const E = oog(ctx, 1000, 500, 300, { bol: 0.4, pupil: 0.6 });
      label(ctx, 'hoornvlies', null, E.hornTop[0], E.hornTop[1], 420, 230, q.on('hoornvlies', 1));
      label(ctx, 'iris', null, E.iris[0], E.iris[1], 560, 160, q.on('iris', 1)); label(ctx, 'pupil', null, E.pupil[0], E.pupil[1] + 4, 520, 690, q.on('pupil', 1));
      label(ctx, 'lens', null, E.lensTop[0] + 20, E.lensTop[1] + 40, E.lensTop[0] + 120, E.lensTop[1] + 40, q.on('lens', 1)); label(ctx, 'glasachtig lichaam', null, E.glas[0], E.glas[1], 1450, 700, q.on('glasachtig', 1));
      label(ctx, 'netvlies', 'lichtreceptoren', E.netv[0], E.netv[1], 1500, 200, q.on('netvlies', 1));
      const br = q.on('breken', 1); stralenHorn(ctx, 360, E.horn[0] + 20, E.lx, E.xr, 500, [-56, -28, 0, 28, 56], LICHT, br, ramp(t, q.at('breken', 1), 2)); ctx.save(); ctx.globalAlpha *= q.on('tweederde', 1); ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(E.horn[0] + 60, 500, 60, 155, 0, Math.PI / 2, 1.5 * Math.PI); ctx.stroke(); ctx.restore();
      vlekje(ctx, E.xr, 500, 26, LICHT, q.on('scherp', 1));
      tag(ctx, 'hoornvlies: ± tweederde van de breking', 600, 820, C.teal, q.on('tweederde', 1)); tag(ctx, 'lens: fijn bijstellen', 1000, 820, C.groen, q.on('fijn', 1)); ctx.restore(); }
  },

  s05(ctx, t, q) { bg(ctx, 'schema'); const ph = q.on('telefoon', 1);
    ctx.save(); ctx.globalAlpha *= 1 - 0.7 * ph; const E = oog(ctx, 1200, 480, 400, { bol: 0.5, pupil: 0.6, straal: q.on('ring', 1) });
    label(ctx, 'straalvormig lichaam', 'met kringspier', E.straal[0] - 10, E.straal[1] - 10, 720, 110, q.on('straalvormig', 1), C.text, 'right');
    label(ctx, 'lensbandjes', null, E.bandje[0], E.bandje[1] + 20, 560, 200, q.on('lensbandjes', 1)); label(ctx, 'lens', null, E.lens[0] + 20, E.lens[1], E.lens[0] + 120, E.lens[1], q.on('hangt', 1)); ctx.restore();
    if (ph > 0.01) { ctx.save(); ctx.globalAlpha *= ph; roundRect(ctx, 300, 520, 110, 200, 18); shape(ctx, '#1A2740', C.text2, 3); roundRect(ctx, 312, 540, 86, 150, 8); shape(ctx, rgba(C.teal, 0.4), null);
      arrow(ctx, 450, 560, 1250, 400, C.line, q.on('overkant', 1), 3); roundRect(ctx, 1280, 260, 300, 160, 12); shape(ctx, rgba(C.groen, 0.5 * q.on('bord', 1)), rgba(C.groen, q.on('bord', 1)), 3); regel(ctx, 'BUSHALTE', 1430, 355, q.on('bord', 1), C.text, 40, 'center', 700);
      regel(ctx, 'dichtbij', 355, 780, 1, C.text2, 26, 'center', 700); regel(ctx, 'ver weg', 1430, 470, q.on('overkant', 1), C.text2, 26, 'center', 700); ctx.restore(); }
    vraagteken(ctx, 960, 640, q.on('Wat', 1), 140); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    const far = q.on('verte', 1), near = q.on('telefoon', 1), mis = q.on('Misschien', 1);
    const bol = near > 0 ? lerp(0.05, 1, near) : lerp(0.6, 0.05, far); const E = oog(ctx, 1260, 460, 330, { bol, pupil: 0.55 });
    const S = E.straal; ctx.save(); for (const s of [-1, 1]) { const ry = 460 + s * 330 * 0.47; ctx.strokeStyle = rgba(C.koraal, near); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(S[0], ry, 40, 0, 6.283); ctx.stroke(); } ctx.restore();
    if (near < 0.5) stralen(ctx, 140, E.lx, E.xr, E.xr, 460, [-45, -22, 0, 22, 45], LICHT, far * (1 - near * 2), false); else stralen(ctx, 620, E.lx, E.xr, E.xr, 460, [-45, -22, 0, 22, 45], LICHT, (near - 0.5) * 2 * (1 - mis * 0.5), true, 460);
    vlekje(ctx, E.xr, 460, 24, LICHT, Math.max(far * (1 - near), near));
    tag(ctx, 'verte: kringspier ontspant', 470, 640, C.text2, far * (1 - near)); tag(ctx, 'lensbandjes strak, lens platter', 470, 720, C.text2, q.on('platter', 1) * (1 - near));
    tag(ctx, 'dichtbij: kringspier trekt samen', 470, 640, C.koraal, near * (1 - mis)); tag(ctx, 'lensbandjes slap, lens boller', 470, 720, C.koraal, q.on('boller', 1) * (1 - mis));
    if (near > 0.01) { roundRect(ctx, 570, 415, 50, 90, 8); shape(ctx, rgba('#1A2740', near), rgba(C.text2, near), 2); }
    tag(ctx, 'accommoderen', 1260, 860, C.goud, q.on('accommoderen', 1));
    tag(ctx, 'boller voor de verte? nee: voor dichtbij', 470, 200, C.koraal, mis * (1 - q.on('camera', 1))); kruis(ctx, 470, 110, 22, mis * (1 - q.on('camera', 1)));
    tag(ctx, 'camera: lens schuift · oog: lens verandert van vorm', 60, 200, C.goud, q.on('camera', 1), 'left'); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const p2 = q.on('iedereen', 1);
    if (p2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - p2; const zon = q.on('zon', 1), krimp = q.on('kleiner', 1);
      const cx = 760, cy = 470; circ(ctx, cx, cy, 240, '#E6E1D3', SCLERA, 3); circ(ctx, cx, cy, 130, IRIS, lighten(IRIS, 0.3), 2); for (let i = 0; i < 36; i++) { const an = i / 36 * 6.283; ctx.strokeStyle = rgba('#2F5A3A', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + 60 * Math.cos(an), cy + 60 * Math.sin(an)); ctx.lineTo(cx + 125 * Math.cos(an), cy + 125 * Math.sin(an)); ctx.stroke(); }
      const pr = lerp(75, 30, krimp); circ(ctx, cx, cy, pr, '#05080C'); ctx.strokeStyle = rgba(C.koraal, q.on('kringspier', 1)); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, pr + 14, 0, 6.283); ctx.stroke();
      if (zon > 0.01) { ctx.save(); ctx.globalAlpha *= zon; for (let i = 0; i < 12; i++) { const an = i * 0.524 + t * 0.2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1450 + Math.cos(an) * 96, 260 + Math.sin(an) * 96); ctx.lineTo(1450 + Math.cos(an) * 130, 260 + Math.sin(an) * 130); ctx.stroke(); } circ(ctx, 1450, 260, 80, rgba(C.goud, 0.85)); ctx.restore(); }
      label(ctx, 'kringspier in de iris', 'trekt samen', cx + pr + 14, cy - 10, 1150, 520, q.on('kringspier', 1)); label(ctx, 'pupil', null, cx, cy, 380, 230, 1);
      tag(ctx, 'pupilreflex: binnen een seconde', 1300, 700, C.goud, q.on('pupilreflex', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const bz = q.on('bijziend', 1);
      roundRect(ctx, 260, 360, 120, 200, 18); shape(ctx, '#1A2740', C.text2, 3); regel(ctx, 'dichtbij: scherp', 320, 620, bz, C.groen, 28, 'center', 700); vink(ctx, 320, 690, 22, q.on('goed', 1));
      ctx.save(); ctx.filter = 'none'; roundRect(ctx, 760, 300, 300, 160, 12); shape(ctx, rgba(C.groen, 0.3), rgba(C.groen, 0.6), 3); ctx.restore();
      for (let k = 0; k < 6; k++) regel(ctx, 'BUSHALTE', 910 + 6 * Math.sin(k * 1.7) * q.on('wazig', 1), 400 + 5 * Math.cos(k * 2.1) * q.on('wazig', 1), 0.25 + 0.75 * (1 - q.on('wazig', 1)) / 6 * 6 / (k + 1), C.text, 40, 'center', 700);
      regel(ctx, 'ver weg: wazig', 910, 520, q.on('wazig', 1), C.koraal, 28, 'center', 700);
      const E = oog(ctx, 1460, 640, 170, { len: 1.25, bol: 0.1, pupil: 0.5, a: q.on('Waar', 1) }); stralen(ctx, 1150, E.lx, E.xr, E.xr, 640, [-20, 0, 20], LICHT, q.on('scherpe', 1) * 0.6, false, 640, 0.33);
      vraagteken(ctx, 1500, 420, q.on('Waar', 1), 120); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const vz = q.on('verziendheid', 1), ou = q.on('veertigste', 1);
    if (vz < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - vz; const E = oog(ctx, 1050, 470, 280, { len: 1.25, bol: 0.1, pupil: 0.5 }); const xF = E.xr - 120; const hl = q.on('holle', 1);
      regel(ctx, 'bijziend: oog te lang', 1050, 140, q.on('lang', 1), C.text, 34, 'center', 700);
      stralenBril(ctx, 300, 450, E.lx, lerp(xF, E.xr, hl), E.xr, 470, [-30, -15, 0, 15, 30], 0.3 * hl, LICHT, q.on('vóór', 1));
      vlekje(ctx, xF, 470, 20, LICHT, q.on('vóór', 1) * (1 - hl)); regel(ctx, 'brandpunt vóór het netvlies', xF - 10, 360, q.on('vóór', 1) * (1 - hl), LICHT, 26, 'right', 700);
      for (let k = -2; k <= 2; k++) vlekje(ctx, E.xr, 470 + k * 18, 22, LICHT, q.on('wazig', 1) * (1 - hl) * 0.6);
      brilglas(ctx, 450, 470, 140, true, '#BFE0F0', hl); regel(ctx, 'holle lens', 450, 680, hl, C.teal, 28, 'center', 700); vlekje(ctx, E.xr, 470, 26, LICHT, hl); vink(ctx, E.xr + 70, 360, 22, q.on('klopt', 1)); ctx.restore(); }
    if (vz > 0.01) { ctx.save(); ctx.globalAlpha *= vz * (1 - ou); const E = oog(ctx, 1050, 470, 280, { len: 0.82, bol: 0.1, pupil: 0.5 }); const xF = E.xr + 140; const bl = q.on('bolle', 1);
      regel(ctx, 'verziend: oog te kort', 1050, 140, 1, C.text, 34, 'center', 700); stralenBril(ctx, 300, 450, E.lx, lerp(xF, E.xr, bl), E.xr, 470, [-30, -15, 0, 15, 30], -0.3 * bl, LICHT, 1);
      ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(LICHT, 0.5 * (1 - bl)); ctx.lineWidth = 2; for (const h of [-30, 30]) { ctx.beginPath(); ctx.moveTo(E.xr, 470 + h * (1 - (E.xr - E.lx) / (xF - E.lx))); ctx.lineTo(xF, 470); ctx.stroke(); } ctx.restore();
      regel(ctx, 'brandpunt achter het netvlies', xF + 10, 590, 1 - bl, LICHT, 26, 'center', 700);
      brilglas(ctx, 450, 470, 140, false, '#BFE0F0', bl); regel(ctx, 'bolle lens', 450, 680, bl, C.teal, 28, 'center', 700); ctx.restore(); }
    if (ou > 0.01) { ctx.save(); ctx.globalAlpha *= ou; const E = oog(ctx, 1150, 470, 260, { bol: 0.2, pupil: 0.5 }); const lb = q.on('leesbril', 1); const G = CAST.linda.garderobe; G._bril = Object.assign({}, G.gewoon, { accessoire: ['oorbel', 'bril'] });
      persoon(ctx, 'linda', 380, 820, 420, { uit: 'denkt', a: 1 - lb }); persoon(ctx, 'linda', 380, 820, 420, { uit: 'neutraal', outfit: '_bril', a: lb });
      tag(ctx, 'vanaf ± 40 jaar: lens stugger, minder bol', 1150, 150, C.text2, q.on('stugger', 1)); ctx.globalAlpha *= lb; tag(ctx, 'oudziend: leesbril (bolle lens)', 1150, 840, C.goud, 1); ctx.restore(); } },

  s11(ctx, t, q) { bgM(ctx);
    const E = oog(ctx, 400, 470, 210, { bol: 0.4, pupil: 0.5, gv: q.on('gele', 1), bv: q.on('blinde', 1) });
    naamBij(ctx, 'gele vlek', 'veel kegeltjes', E.gv[0] + 20, E.gv[1] - 95, q.on('gele', 1), 'left', '#F0D040'); naamBij(ctx, 'blinde vlek', 'geen receptoren', E.bv[0] - 80, E.bv[1] + 190, q.on('blinde', 1), 'center', C.koraal);
    const X0 = 900, Y0 = 760; ctx.fillStyle = rgba(NETV, 0.12); ctx.fillRect(X0 - 40, Y0 + 40, 1000, 30);
    const keg = q.on('Kegeltjes', 1), kl = q.on('drie', 1), st = q.on('Staafjes', 1);
    for (let i = 0; i < 14; i++) { const x = X0 + i * 70; if (i % 3 === 1) kegeltje(ctx, x, Y0, 2, kl > 0.01 ? KEG[Math.floor(i / 3) % 3] : '#C9A35C', keg); else staafje(ctx, x, Y0, 2, st); }
    tag(ctx, 'kegeltjes: kleur en details, bij genoeg licht', 1360, 180, KEG[0], keg * (1 - st)); tag(ctx, 'drie soorten: rood, groen, blauw', 1360, 260, KEG[1], kl * (1 - st));
    tag(ctx, 'staafjes: veel gevoeliger, geen kleur', 1360, 180, STAAF, st * (1 - q.on('honderdtwintig', 1))); tag(ctx, 'vooral aan de rand van het netvlies', 1360, 260, STAAF, q.on('rand', 1) * (1 - q.on('honderdtwintig', 1)));
    tag(ctx, '± 120 miljoen staafjes · 6 miljoen kegeltjes', 1360, 220, C.goud, q.on('honderdtwintig', 1)); metaText(ctx, 'schematisch · niet op schaal', W - 40, 880, C.text2, 'right', 24); },

  s12(ctx, t, q) { bgM(ctx);
    tag(ctx, 'antwoord b', 960, 140, C.goud, q.on('Antwoord', 1));
    const pu = q.on('pupil', 1) * (1 - q.on('meeste', 1)); if (pu > 0.01) { ctx.save(); ctx.globalAlpha *= pu; circ(ctx, 500, 480, 130, IRIS); circ(ctx, 500, 480, lerp(30, 75, ramp(t, q.at('groter', 1), 1.5)), '#05080C'); tag(ctx, 'pupil groter: binnen seconden', 500, 720, C.text2, 1); tag(ctx, 'helpt maar een beetje (± 16× meer licht)', 1300, 480, C.text2, q.on('beetje', 1)); ctx.restore(); }
    const p2 = q.on('meeste', 1); if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const stof = q.on('aangemaakt', 1) > 0 ? ramp(t, q.at('aangemaakt', 1), 9) : 1 - q.on('afgebroken', 1);
      for (let i = 0; i < 4; i++) staafje(ctx, 300 + i * 95, 680, 2.4, 1, stof);
      regel(ctx, 'lichtgevoelige stof', 435, 260, q.on('lichtgevoelige', 1), '#C98AC0', 28, 'center', 700); tag(ctx, 'fel licht: afgebroken', 435, 800, C.koraal, q.on('afgebroken', 1) * (1 - q.on('aangemaakt', 1))); tag(ctx, 'donker: weer aangemaakt', 435, 800, C.groen, q.on('aangemaakt', 1));
      adaptGraf(ctx, 900, 720, 820, 420, q.on('aangemaakt', 1) > 0 ? ramp(t, q.at('aangemaakt', 1), 5) : 0, q.on('aangemaakt', 1), { m10: q.on('tien', 1), m30: q.on('dertig', 1) });
      ctx.save(); ctx.globalAlpha *= q.on('rood', 1) * (1 - q.on('Andersom', 1)); roundRect(ctx, 980, 340, 70, 70, 10); shape(ctx, '#C9483E', null); arrow(ctx, 1060, 375, 1140, 375, C.line, 1, 3); roundRect(ctx, 1150, 340, 70, 70, 10); shape(ctx, '#2A2A2E', C.text2, 1.5); regel(ctx, 'staafjes: haast blind voor rood', 1100, 455, 1, C.text2, 24, 'center', 700); ctx.restore();
      tag(ctx, 'adaptatie', 1320, 860, C.goud, q.on('adaptatie', 1) * (1 - q.on('Andersom', 1))); tag(ctx, 'donker → licht: binnen een minuut', 1320, 860, C.teal, q.on('Andersom', 1)); ctx.restore(); }
  },

  s13(ctx, t, q) { bgM(ctx); const p2 = q.on('Veel', 1);
    if (p2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - p2; const li = q.on('Valt', 1), ue = q.on('elkaar', 1);
      regel(ctx, 'rodopsine', 460, 200, q.on('rodopsine', 1), '#C98AC0', 34, 'center', 700);
      ctx.save(); ctx.globalAlpha *= q.on('rodopsine', 1); _kkKluwen(ctx, 460, 400, (qx, qy) => (qx / 190) ** 2 + (qy / 112) ** 2 < 1, { bbox: [-190, -112, 190, 112], sc: 1, r: 7, col: '#B88AB8', seed: 11, key: 'rodopsine' });
      const rx0 = 360 + 220 * ue, ry0 = 400 - 60 * ue; ctx.strokeStyle = '#E0A0D0'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
      const pts = [[0, 0], [30, -16], [60, 0], [90, -16], [110, 10 - 36 * li], [130, 40 - 66 * li], [150, 30 - 46 * li]]; pts.forEach(([px, py], i) => i ? ctx.lineTo(rx0 + px, ry0 + py) : ctx.moveTo(rx0 + px, ry0 + py)); ctx.stroke(); ctx.restore();
      regel(ctx, 'eiwit', 300, 540, q.on('rodopsine', 1), C.text2, 24, 'center', 700);
      for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= li * (1 - ue) * (1 - u); ctx.strokeStyle = LICHT; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(380 + i * 50, 180 + 160 * u); ctx.lineTo(395 + i * 50, 215 + 160 * u); ctx.stroke(); ctx.restore(); }
      tag(ctx, 'licht: vorm verandert, daarna valt het uit elkaar', 460, 640, C.goud, li);
      const ng = q.on('negatiever', 1); regel(ctx, 'lading van het staafje', 1330, 200, q.on('reeks', 1), C.text2, 26, 'center', 700);
      ctx.save(); ctx.globalAlpha *= q.on('reeks', 1); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1000, 260); ctx.lineTo(1000, 560); ctx.lineTo(1700, 560); ctx.stroke(); regel(ctx, '−40 mV', 990, 330, 1, C.text2, 22, 'right', 600); regel(ctx, '−70 mV', 990, 520, 1, C.text2, 22, 'right', 600);
      ctx.strokeStyle = STAAF; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1010, 320); ctx.lineTo(1250, 320); ctx.bezierCurveTo(1300, 320, 1300, lerp(320, 510, ng), 1360, lerp(320, 510, ng)); ctx.lineTo(1690, lerp(320, 510, ng)); ctx.stroke(); regel(ctx, 'licht aan', 1260, 290, ng, LICHT, 22, 'center', 700); ctx.restore();
      tag(ctx, 'negatiever: minder signaalstof', 1350, 660, C.teal, q.on('signaalstof', 1)); tag(ctx, 'impuls pas verderop in het netvlies', 1350, 760, C.goud, q.on('verderop', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      for (let i = 0; i < 8; i++) { staafje(ctx, 220 + i * 60, 420, 0.8, 1, 1); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(220 + i * 60, 440); ctx.lineTo(430, 600); ctx.stroke(); }
      circ(ctx, 430, 620, 26, rgba(ZENUW, 0.5), ZENUW, 3); ctx.strokeStyle = ZENUW; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(430, 646); ctx.lineTo(430, 760); ctx.stroke();
      regel(ctx, 'staafjes: veel op één zenuwcel', 430, 200, 1, STAAF, 30, 'center', 700); tag(ctx, 'telt op: gevoelig, minder scherp', 430, 850, STAAF, q.on('tellen', 1));
      const kg = q.on('Kegeltjes', 1); ctx.save(); ctx.globalAlpha *= kg; for (let i = 0; i < 5; i++) { const x = 1150 + i * 110; kegeltje(ctx, x, 420, 0.9, KEG[i % 3], 1); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 440); ctx.lineTo(x, 594); ctx.stroke(); circ(ctx, x, 620, 22, rgba(ZENUW, 0.5), ZENUW, 3); ctx.strokeStyle = ZENUW; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, 642); ctx.lineTo(x, 760); ctx.stroke(); }
      regel(ctx, 'kegeltjes in de gele vlek: bijna elk een eigen zenuwcel', 1370, 200, 1, KEG[0], 30, 'center', 700); tag(ctx, 'scherp, minder gevoelig', 1370, 850, KEG[0], q.on('scherp', 2)); ctx.restore(); ctx.restore(); }
  },

  s14(ctx, t, q) { bg(ctx, 'schema'); const tr = q.on('trilling', 1);
    oor(ctx, t, { tril: q.on('meetrillen', 1), kan: 0.35, buis: 0.35 });
    for (let i = 0; i < 4; i++) { const u = (t * 0.6 + i / 4) % 1; ctx.save(); ctx.globalAlpha *= tr * (1 - u) * (1 - q.on('hertz', 1) * 0.5); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(120 + u * 300, 480, 60, -0.8, 0.8); ctx.stroke(); ctx.restore(); }
    zones(ctx, q.on('oorschelp', 1), q.on('middenoor', 1), q.on('binnenoor', 1));
    label(ctx, 'oorschelp', null, 250, 360, 160, 160, q.on('oorschelp', 1), C.text, 'left'); label(ctx, 'gehoorgang', null, 560, 512, 520, 720, q.on('gehoorgang', 1), C.text, 'left');
    label(ctx, 'trommelvlies', null, 798, 540, 700, 820, q.on('trommelvlies', 1), C.text, 'right');
    label(ctx, 'hamer · aambeeld · stijgbeugel', 'gehoorbeentjes', 890, 380, 900, 110, q.on('gehoorbeentjes', 1), C.text, 'left');
    label(ctx, 'ovale venster', null, 1010, 500, 1080, 720, q.on('ovale', 1), C.text, 'left'); label(ctx, 'slakkenhuis', 'met haarcellen', 1230, 600, 1480, 740, q.on('slakkenhuis', 1), C.text, 'left');
    tag(ctx, 'groot → klein: druk ± 20× groter', 1500, 830, C.goud, q.on('groter', 1) * (1 - q.on('haarcellen', 1))); regel(ctx, 'groot', 770, 405, q.on('groot', 1) * (1 - q.on('haarcellen', 1)), C.goud, 24, 'right', 700); regel(ctx, 'klein', 1030, 430, q.on('klein', 1) * (1 - q.on('haarcellen', 1)), C.goud, 24, 'left', 700);
    zoomCircle(ctx, 1640, 330, 150, 1200, 560, 'haarcellen', q.on('haarcellen', 1), () => { ctx.fillStyle = rgba(SLAK, 0.15); ctx.fillRect(1490, 180, 300, 300); for (let k = 0; k < 3; k++) haarcel(ctx, 1570 + k * 70, 400, 0.8, 0.5 * Math.sin(t * 6 + k) * q.on('buigen', 1), 1); });
    label(ctx, 'gehoorzenuw', null, 1440, 506, 1560, 640, q.on('gehoorzenuw', 1), ZENUW, 'left');
    tag(ctx, 'mensen horen ± 20 – 20 000 Hz', 960, 860, C.teal, q.on('hertz', 1)); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const vl = q.on('vliegtuig', 1), sl = q.on('Slik', 1), mu = q.on('avond', 1);
    ctx.save(); ctx.globalAlpha *= 1 - mu; oor(ctx, t, { kan: 0.3, buis: 1, druk: vl * (1 - sl), open: sl * (1 - q.on('gelijk', 1) * 0.6) }); roundRect(ctx, 800, 340, 210, 270, 30); shape(ctx, rgba(C.teal, 0.25 * q.on('lucht', 1) * (1 - q.on('vliegtuig', 1))), null); regel(ctx, 'lucht', 905, 640, q.on('lucht', 1) * (1 - q.on('vliegtuig', 1)), C.teal, 26, 'center', 700);
    label(ctx, 'buis van Eustachius', 'naar de keel', 980, 720, 1200, 820, q.on('buis', 2), '#E07A6E', 'left'); regel(ctx, 'keel', 1080, 880, q.on('keel', 1), C.text2, 24, 'left', 700);
    for (let i = 0; i < 5; i++) { const u = (t * 0.7 + i / 5) % 1; circ(ctx, lerp(500, 770, u), 470 + (i - 2) * 10, 6, rgba(C.teal, vl * (1 - sl) * (1 - u))); } tag(ctx, 'luchtdruk buiten verandert: oor voelt dicht', 520, 170, C.teal, vl * (1 - sl));
    for (let i = 0; i < 5; i++) { const u = (t * 0.7 + i / 5) % 1; const px = lerp(1060, 900, u), py = lerp(820, 600, u); circ(ctx, px, py, 6, rgba(C.teal, sl * (1 - q.on('gelijk', 1) * 0.7) * (1 - u))); }
    tag(ctx, 'slikken of gapen: buis even open', 520, 170, '#E07A6E', sl * (1 - q.on('gelijk', 1))); tag(ctx, 'druk aan beide kanten gelijk', 520, 170, C.groen, q.on('gelijk', 1)); ctx.restore();
    if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= mu; for (const sx of [560, 1360]) { roundRect(ctx, sx - 110, 300, 220, 360, 20); shape(ctx, '#1A1E26', C.text2, 3); circ(ctx, sx, 410, 60 + 6 * Math.sin(t * 12), '#2A3242', C.text2, 2); circ(ctx, sx, 570, 70 + 6 * Math.sin(t * 12 + 1), '#2A3242', C.text2, 2); }
      ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const px = 760 + i * 3.3, py = 470 + 30 * Math.sin(i * 0.9 + t * 20); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.globalAlpha *= q.on('piep', 1); ctx.stroke(); ctx.restore(); vraagteken(ctx, 960, 760, q.on('Wat', 1), 120); } },

  s17(ctx, t, q) { bgM(ctx); const p2 = q.on('drie', 1);
    if (p2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - p2; const ov = q.on('overbelast', 1), he = q.on('herstellen', 1), dd = q.on('dood', 1);
      tag(ctx, 'antwoord b', 960, 140, C.goud, q.on('Antwoord', 1));
      for (let k = 0; k < 7; k++) { const dead = k === 3 ? dd : 0; const moe = ov * (1 - he); haarcel(ctx, 420 + k * 180, 600, 1.4, moe ? 0.95 * moe : 0.25 * Math.sin(t * 3 + k), 1, dead); if (k === 3) kruis(ctx, 420 + k * 180, 400, 26, dd); }
      tag(ctx, 'haarcellen overbelast', 960, 250, C.koraal, ov * (1 - he)); tag(ctx, 'na een nacht rust: de meeste herstellen', 960, 250, C.groen, he * (1 - dd)); tag(ctx, 'dood = groeit niet terug', 960, 250, C.koraal, dd * (1 - q.on('Misschien', 1)));
      tag(ctx, '"je oren wennen"? minder hard = haarcellen kapot', 960, 830, C.koraal, q.on('Misschien', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; regel(ctx, 'hoe lang veilig?', 960, 190, 1, C.text, 34, 'center', 700);
      const rows = [['80 dB', '40 uur per week', 1], ['83 dB', '20 uur', 0.5], ['86 dB', '10 uur', 0.25], ['89 dB', '5 uur', 0.125], ['100 dB', 'paar minuten per dag', 0.02]];
      rows.forEach(([db, tijd, f], i) => { const al = clamp((t - q.at('drie', 1)) * 1.2 - i * 0.6, 0, 1); const y = 270 + i * 100; regel(ctx, db, 560, y + 18, al, C.goud, 32, 'right', 700); roundRect(ctx, 590, y - 20, Math.max(8, 760 * f), 50, 10); shape(ctx, rgba(C.teal, 0.5 * al), rgba(C.teal, al), 2); regel(ctx, tijd, 600 + Math.max(8, 760 * f) + 20, y + 16, al, C.text, 28, 'left', 600); });
      tag(ctx, 'blijvend slechter: vooral hoge tonen', 960, 790, C.koraal, q.on('blijvend', 1) * (1 - q.on('Oordopjes', 1))); tag(ctx, 'oordopjes helpen', 960, 790, C.groen, q.on('Oordopjes', 1)); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); const bl = q.on('evenwichtsblaasjes', 1);
    ctx.save(); ctx.globalAlpha *= 1 - bl; const dr = q.on('Draai', 1), st = q.on('Stop', 1);
    const rot = dr * (1 - st) * Math.sin(t * 2) * 0.4; hoofd(ctx, 560, 480, rot);
    regel(ctx, 'evenwichtsorgaan in het binnenoor', 960, 180, q.on('evenwichtsorgaan', 1), C.text, 32, 'center', 700);
    const cs = [[1200, 460, 140, C.teal], [1380, 420, 130, '#7FC48F'], [1300, 600, 120, C.goud]];
    cs.forEach(([cx, cy, r, col], i) => { const al = q.on('kanalen', 1); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 18; ctx.beginPath(); if (i === 0) ctx.arc(cx, cy, r, 3.4, 6.0); else if (i === 1) ctx.ellipse(cx, cy, r * 0.5, r, 0, 4.0, 7.6); else ctx.ellipse(cx, cy, r, r * 0.45, 0, 0.2, 3.0); ctx.stroke();
      const fl = q.on('stroomt', 1) * (dr * (1 - st) * Math.sin(t * 2) + st * (1 - q.on('duizelig', 1) * 0.3) * 0.8); for (let k = 0; k < 6; k++) { const an = 3.5 + ((k / 6 + t * fl * 0.3) % 1) * 2.4; if (i === 0) circ(ctx, cx + r * Math.cos(an), cy + r * Math.sin(an), 5, rgba('#F2F2EE', 0.6 * Math.abs(fl))); } ctx.restore(); });
    regel(ctx, 'drie kanalen vol vloeistof, elk in een andere richting', 1300, 820, q.on('vloeistof', 1), C.text2, 26, 'center', 700);
    zoomCircle(ctx, 1700, 280, 130, 1200, 330, 'haarcellen', q.on('buigen', 1), () => { haarcel(ctx, 1700, 330, 1, dr * (1 - st) * Math.sin(t * 2) + st * 0.8, 1, 0, C.teal); });
    { const dz = q.on('duizelig', 1); tag(ctx, 'stop je: vloeistof stroomt nog even door', 560, 262, C.goud, st * Math.max(0, 1 - 2 * dz)); tag(ctx, 'hersenen: "ik draai nog" → duizelig', 560, 262, C.koraal, Math.max(0, 2 * dz - 1)); } // nacontrole 29 okt 2026: na elkaar, niet over elkaar
    if (q.on('duizelig', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('duizelig', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i < 60; i++) { const an = i * 0.35 + t * 3, r = i * 1.6; i ? ctx.lineTo(560 + r * Math.cos(an), 335 + r * 0.4 * Math.sin(an)) : ctx.moveTo(560, 335); } ctx.stroke(); ctx.restore(); }
    ctx.restore();
    if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; const tilt = q.on('staat', 1) * 0.35 * Math.sin(t * 1.2);
      hoofd(ctx, 560, 480, tilt);
      ctx.save(); ctx.translate(1250, 560); ctx.rotate(tilt); roundRect(ctx, -320, -40, 640, 80, 20); shape(ctx, rgba(KANAAL, 0.25), KANAAL, 2); for (let k = 0; k < 7; k++) haarcel(ctx, -270 + k * 90, 0, 0.7, -tilt * 2.2, 1, 0, KANAAL); ctx.restore();
      ctx.save(); ctx.translate(1250 + 220 * tilt * 0.3, 470); ctx.rotate(tilt); roundRect(ctx, -330, -20, 660, 34, 12); shape(ctx, rgba('#E6E1D3', 0.35), '#E6E1D3', 1.5); for (let k = 0; k < 30; k++) circ(ctx, -310 + k * 21, -4 + 6 * hash(k), 7, rgba('#F2F2EE', 0.9)); ctx.restore();
      label(ctx, 'kalkkorreltjes', null, 1000, 466, 960, 260, q.on('kalkkorreltjes', 1), C.text, 'right');
      regel(ctx, 'evenwichtsblaasje (er zijn er twee)', 1250, 180, 1, C.text, 32, 'center', 700); tag(ctx, 'stand van je hoofd', 1250, 780, C.teal, q.on('staat', 1)); tag(ctx, 'optrekken en remmen', 1250, 860, C.goud, q.on('remt', 1)); ctx.restore(); } },

  s19(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'slakkenhuis, uitgerold', 960, 170, 1, C.text2, 28, 'center', 700);
    const X0 = 300, X1 = 1620, Y = 470; const bm = q.on('membraan', 1);
    ctx.save(); ctx.globalAlpha *= bm; ctx.beginPath(); ctx.moveTo(X0, Y - 14); ctx.lineTo(X1, Y - 60); ctx.lineTo(X1, Y + 60); ctx.lineTo(X0, Y + 14); ctx.closePath(); shape(ctx, rgba(SLAK, 0.35), SLAK, 2);
    regel(ctx, 'begin: smal en stijf', X0, Y + 110, q.on('smal', 1), C.text, 28, 'left', 700); regel(ctx, 'eind: breed en slap', X1, Y + 140, q.on('breed', 1), C.text, 28, 'right', 700); ctx.restore();
    const hoog = q.on('Hoge', 1), laag = q.on('lage', 1);
    const golf = (pk, col, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const u = i / 300, px = lerp(X0, X1, u), env = Math.exp(-Math.pow((u - pk) / 0.09, 2)); const py = Y - 70 * env * Math.sin(u * 60 - t * 10); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); };
    golf(0.12, C.koraal, hoog * (1 - laag * 0.7)); golf(0.82, C.teal, laag);
    tag(ctx, 'hoge toon', lerp(X0, X1, 0.12), 300, C.koraal, hoog); tag(ctx, 'lage toon', lerp(X0, X1, 0.82), 300, C.teal, laag);
    tag(ctx, 'toonhoogte = plek van de haarcellen', 960, 680, C.goud, q.on('plek', 1) * (1 - q.on('kapot', 1)));
    const kp = q.on('kapot', 1); for (let k = 0; k < 4; k++) kruis(ctx, X0 + 40 + k * 60, Y, 16, kp); tag(ctx, 'begin kapot: hoge tonen slechter horen', 960, 680, C.koraal, kp); },

  s20(ctx, t, q) { const p2 = q.on('film', 1);
    if (p2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - p2; fietspad(ctx, t, { veld: 0.4, zie: 0.9, kleur: 0, noorX: 1250 });
      ctx.fillStyle = rgba('#0B0F16', 0.8 * q.on('felle', 1)); ctx.fillRect(40, 110, 780, 420);
      tag(ctx, 'fel licht: vooral kegeltjes', 60, 170, KEG[0], q.on('felle', 1), 'left'); tag(ctx, 'stof in de staafjes afgebroken', 60, 250, '#C98AC0', q.on('afgebroken', 1), 'left'); tag(ctx, 'donker: weer aangemaakt, minuten', 60, 330, C.groen, q.on('aangemaakt', 1), 'left'); tag(ctx, 'staafjes: geen kleur', 60, 410, STAAF, q.on('kleur', 1), 'left'); tag(ctx, 'antwoord b', 60, 490, C.goud, q.on('antwoord', 1), 'left'); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; bg(ctx, 'schema'); metaText(ctx, 'Eén seconde + Zintuigen', 960, 200, C.grain, 'center', 26);
      keten(ctx, 465, 420, [['prikkel', LICHT], ['zintuig', C.groen], ['receptor', C.teal], ['impuls', C.goud]], [1, q.on('opvangen', 1), q.on('staafjes', 3), q.on('impuls', 2)]);
      tag(ctx, 'hoornvlies en lens richten het licht', 960, 620, C.teal, q.on('richten', 1)); tag(ctx, 'gehoorbeentjes versterken de trilling', 960, 720, BOT, q.on('versterken', 1)); tag(ctx, 'staafjes, kegeltjes, haarcellen → impuls', 960, 820, C.goud, q.on('staafjes', 3)); ctx.restore(); }
  },
};

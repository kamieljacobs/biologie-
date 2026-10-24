// Wat word jij? · Laboratoriumtechniek 3 · Wat staat er op je bloeduitslag? — eigen tekeningen (24 okt 2026)
// Bloedcellen naar het recept van Wat er in je bloed zit (transport 3: rbc, wbc, plaatje, centrifuge), kleuren hier lokaal.

const BL = { rood: '#B8443E', roodL: '#D9675C', rijk: '#D9483E', arm: '#8E3E46', plasma: '#E8C870', serum: '#EBD38A', wit: '#E6E1D3', plaatje: '#D8C9A6', plaatjeR: '#F0E4C4', gel: '#C9D6DC',
  paars: '#8C5BB0', geel: '#E8C04A', grijs: '#A9B0BA', ca: '#AFC0D0', edta: '#B79AD6', alat: '#E0B64A', crp: '#5BA4C9' };
const DOP = { paars: BL.paars, geel: BL.geel, grijs: BL.grijs };

function zacht3(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- bloedcellen (recept transport 3) ----------
function rbc3(ctx, x, y, r, o = {}) { const { a = 1, rot = 0, squash = 1, col = BL.rijk } = o; zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, squash);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, col, lighten(BL.rijk, 0.3), Math.max(1, r * 0.06)); ctx.beginPath(); ctx.arc(0, 0, r * 0.46, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.2); ctx.fill(); }); }
function wbc3(ctx, x, y, r, t = 0, o = {}) { const { a = 1, seed = 1, rond = false } = o; zacht3(ctx, a, () => {
  blob(ctx, x, y, r, r * 0.96, 0.06, seed, t * 2); shape(ctx, rgba(BL.wit, 0.22), BL.wit, 2);
  ctx.fillStyle = rgba(BL.wit, 0.5); for (let i = 0; i < 20; i++) { const an = hash(i * 5 + seed) * 6.283, d = (0.3 + 0.6 * Math.sqrt(hash(i * 5 + 2 + seed))) * r * 0.85; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(1.4, r * 0.03), 0, 6.283); ctx.fill(); }
  if (rond) { circ(ctx, x, y, r * 0.62, C.kern, C.kernR, 1.5); return; }
  for (const [dx, dy, k] of [[-0.3, -0.12, 0.3], [0.05, 0.18, 0.28], [0.32, -0.08, 0.26]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, k * r, k * r * 0.85, dx, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.5); }
  ctx.strokeStyle = C.kern; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.moveTo(x - 0.3 * r, y - 0.12 * r); ctx.lineTo(x + 0.05 * r, y + 0.18 * r); ctx.lineTo(x + 0.32 * r, y - 0.08 * r); ctx.stroke(); }); }
function plaatje3(ctx, x, y, r, o = {}) { const { a = 1, rot = 0 } = o; zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, 6.283); shape(ctx, BL.plaatje, BL.plaatjeR, 1.2);
  ctx.fillStyle = rgba('#7A6A50', 0.5); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc((i - 1) * r * 0.4, (i % 2 ? 1 : -1) * r * 0.15, r * 0.12, 0, 6.283); ctx.fill(); } }); }

// ---------- buisje (vacuümbuis) ----------
// x = midden, y = bovenkant dop, h = hoogte zonder dop; o.inhoud: 'bloed' | 'gestold' | 'leeg'; o.sep 0..1 (na centrifugeren: stolsel, gel, serum)
function buis(ctx, x, y, w, h, dop, o = {}) { const { a = 1, t = 0, inhoud = 'bloed', sep = 0, stol = 0, naam = '', vul = 0.82, seed = 1 } = o; zacht3(ctx, a, () => {
  const top = y + 34, bot = y + h, r = w / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(x - r, top); ctx.lineTo(x - r, bot - r); ctx.arc(x, bot - r, r, Math.PI, 0, true); ctx.lineTo(x + r, top); };
  omtrek(); ctx.closePath(); ctx.fillStyle = rgba('#CFE4F0', 0.07); ctx.fill();
  ctx.save(); omtrek(); ctx.closePath(); ctx.clip(); const lv = bot - (bot - top) * vul, H = bot - lv;
  if (inhoud === 'bloed') { ctx.fillStyle = BL.arm; ctx.fillRect(x - r, lv, w, H + 2);
    for (let i = 0; i < 26; i++) { const wv = wander(i + seed * 30, t, 3, 1); ctx.fillStyle = hash(i * 7 + seed) < 0.5 ? BL.rijk : BL.roodL; ctx.beginPath(); ctx.ellipse(x + (hash(i * 3 + seed) - 0.5) * (w - 14) + wv.x, lerp(lv + 8, bot - 8, hash(i * 3 + 1 + seed)) + wv.y, w * 0.08, w * 0.06, i, 0, 6.283); ctx.fill(); }
    if (stol > 0.01) { ctx.fillStyle = rgba('#5E2A2E', 0.55 * stol); ctx.fillRect(x - r, lv, w, H + 2); } }
  else if (inhoud === 'gestold') { const s = ease(sep); const yGel = lerp(lv, lv + H * 0.45, s); // na scheiden: serum boven, gel, stolsel onder
    ctx.fillStyle = rgba(BL.serum, 0.85); ctx.fillRect(x - r, lv, w, H + 2);
    ctx.fillStyle = '#6E2E34'; ctx.fillRect(x - r, lerp(lv, yGel + 16, s), w, bot - lv + 4);
    if (s > 0.01) { ctx.fillStyle = rgba(BL.gel, 0.95 * s); ctx.fillRect(x - r, yGel, w, 16); }
    ctx.strokeStyle = rgba('#EDE3C8', 0.35); ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { const yy = lerp(lerp(lv + 10, yGel + 30, s), bot - 10, hash(i * 3 + 5)); ctx.beginPath(); ctx.moveTo(x - r * 0.7, yy); ctx.lineTo(x + r * 0.7, yy + (hash(i) - 0.5) * 20); ctx.stroke(); } }
  ctx.restore();
  omtrek(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  // etiket
  if (naam) { roundRect(ctx, x - r + 4, top + (bot - top) * 0.18, w - 8, (bot - top) * 0.3, 4); shape(ctx, rgba('#F2EEE4', 0.92), null); ctx.fillStyle = '#121A26'; for (let i = 0; i < 9; i++) ctx.fillRect(x - r + 12 + i * (w - 24) / 9, top + (bot - top) * 0.21, (w - 24) / 18 * (1 + (i % 3 === 0)), (bot - top) * 0.1);
    if (w >= 60) { let px = Math.max(12, w * 0.2); ctx.font = fTekst(px, 700); const mw = ctx.measureText(naam).width; if (mw > w - 14) px *= (w - 14) / mw; text(ctx, naam, x, top + (bot - top) * 0.43, fTekst(px, 700), '#121A26', 'center'); } }
  // dop
  roundRect(ctx, x - r - 8, y, w + 16, 40, 8); shape(ctx, DOP[dop] || dop, lighten(DOP[dop] || dop, 0.25), 2); ctx.fillStyle = rgba('#000000', 0.15); ctx.fillRect(x - r - 8, y + 26, w + 16, 6); }); }

// rekje met buisjes
function rekje(ctx, x, y, w, a = 1) { zacht3(ctx, a, () => { roundRect(ctx, x, y, w, 26, 8); shape(ctx, '#3A4A68', C.line, 2); roundRect(ctx, x + 10, y + 26, 18, 40, 4); shape(ctx, '#3A4A68', null); roundRect(ctx, x + w - 28, y + 26, 18, 40, 4); shape(ctx, '#3A4A68', null); }); }

// ---------- centrifuge van boven (recept transport 3) ----------
function centri3(ctx, x, y, r, ang, o = {}) { const { a = 1, vaart = 0 } = o; zacht3(ctx, a, () => {
  roundRect(ctx, x - r - 30, y - r - 30, 2 * r + 60, 2 * r + 60, 30); shape(ctx, '#2F3E5C', C.line, 2);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, C.kast, C.line, 2);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.fillStyle = '#5B6B88'; ctx.fillRect(-10, 0, 20, r * 0.55); roundRect(ctx, -r * 0.2, r * 0.48, r * 0.4, r * 0.42, 10); shape(ctx, '#4A5878', C.line, 2);
    roundRect(ctx, -r * 0.12, r * 0.53, r * 0.24, r * 0.3, 6); ctx.fillStyle = i === 0 ? BL.geel : '#3A4660'; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.14, 0, 6.283); shape(ctx, '#8FA0B5', '#C0CCDA', 2); ctx.restore();
  if (vaart > 0.01) { ctx.strokeStyle = rgba(C.text, 0.5 * vaart); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const a0 = ang + i * Math.PI / 2 + 0.25; ctx.beginPath(); ctx.arc(x, y, r * 0.92, a0, a0 + 0.9 * vaart); ctx.stroke(); } } }); }

// ---------- moleculen ----------
// calciumion: klein bolletje met '2+'
function caIon(ctx, x, y, r = 11, a = 1) { zacht3(ctx, a, () => { circ(ctx, x, y, r, BL.ca, '#DDE6EE', 1.5); text(ctx, 'Ca', x, y + 4, fTekst(r * 0.9, 800), '#121A26', 'center'); }); }
// EDTA: klauw van vier armpjes; vang 0..1 = klauw sluit om een calciumion
function edtaKlauw(ctx, x, y, s = 1, vang = 0, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = BL.edta; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (const k of [-1, 1]) for (const j of [0, 1]) { const an0 = (k < 0 ? Math.PI : 0) + (j ? -0.6 : 0.6) * k; const sl = lerp(0.9, 0.35, vang) * (j ? -1 : 1) * k; ctx.beginPath(); ctx.moveTo(0, 0); const ex = Math.cos(an0) * 26, ey = Math.sin(an0) * 22; ctx.quadraticCurveTo(ex * 0.8, ey * 1.4, ex + Math.cos(an0 + sl) * 14, ey + Math.sin(an0 + sl) * 14); ctx.stroke(); }
  circ(ctx, 0, 0, 7, BL.edta); }); }
// CRP: vijf bolletjes in een ring (pentameer)
function crpMol(ctx, x, y, r = 16, a = 1, rot = 0) { zacht3(ctx, a, () => { for (let i = 0; i < 5; i++) { const an = rot + i / 5 * 6.283; circ(ctx, x + Math.cos(an) * r * 0.62, y + Math.sin(an) * r * 0.62, r * 0.42, rgba(BL.crp, 0.85), lighten(BL.crp, 0.35), 1.2); } }); }
// antistof als Y
function antiY(ctx, x, y, s = 1, rot = 0, col = C.goud, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-14, -18); ctx.moveTo(0, 0); ctx.lineTo(14, -18); ctx.stroke(); }); }

// ---------- uitslagformulier ----------
// rows: [naam, waarde, eenheid, status(-1 laag, 0 binnen, 1 hoog, null = nog leeg), alpha, hl]
function formulier(ctx, x, y, w, rows, a = 1, titel = 'UITSLAG · H. DE VRIES', px = 30) { zacht3(ctx, a, () => { const rh = px + 26, h = 90 + rows.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#3E5C7A'; ctx.fillRect(x, y, w, 10);
  metaText(ctx, titel, x + 26, y + 54, '#5A6478', 'left', 20);
  rows.forEach(([n, v, e, st, al = 1, hl = 0], i) => { const yy = y + 100 + i * rh; ctx.strokeStyle = '#D8D0C0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 20, yy + 14); ctx.lineTo(x + w - 20, yy + 14); ctx.stroke();
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.fillStyle = rgba(C.goud, 0.28); ctx.fillRect(x + 8, yy - px - 4, w - 16, px + 16); ctx.restore(); }
    text(ctx, n, x + 26, yy, fTekst(px, 700), '#121A26', 'left');
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; const col = st === 1 ? '#B8442E' : st === -1 ? '#B8442E' : '#121A26'; text(ctx, v, x + w * 0.56, yy, fTekst(px, 800), col, 'right'); text(ctx, e, x + w * 0.59, yy, fTekst(px * 0.72, 500), '#5A6478', 'left');
      if (st === 1) text(ctx, '↑', x + w - 30, yy, fTekst(px, 800), '#B8442E', 'right'); ctx.restore(); } }); }); }

// referentiebalk: band lo..hi op schaal min..max, marker v (u 0..1 schuift de marker in)
function refBalk(ctx, x, y, w, min, max, lo, hi, v, a = 1, u = 1, o = {}) { const { lab = '', fmt = (z) => String(z), uit = false } = o; zacht3(ctx, a, () => { const X = (z) => x + (clamp(z, min, max) - min) / (max - min) * w;
  roundRect(ctx, x, y - 12, w, 24, 12); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, X(lo), y - 12, X(hi) - X(lo), 24, 8); shape(ctx, rgba(C.groen, 0.45), C.groen, 2);
  text(ctx, fmt(lo), X(lo), y + 44, fTekst(22, 600), C.text2, 'center'); text(ctx, fmt(hi), X(hi), y + 44, fTekst(22, 600), C.text2, 'center');
  if (u > 0.01 && v != null) { const xv = X(lerp(min + (max - min) * 0.02, v, ease(u))); const col = (v < lo || v > hi) ? C.koraal : C.goud; ctx.save(); ctx.globalAlpha *= clamp(u * 3, 0, 1); ctx.beginPath(); ctx.moveTo(xv, y - 18); ctx.lineTo(xv - 12, y - 38); ctx.lineTo(xv + 12, y - 38); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.fillRect(xv - 2, y - 18, 4, 36); if (lab) text(ctx, lab, xv, y - 48, fTekst(24, 800), col, 'center'); ctx.restore(); } }); }

// ---------- apparaten ----------
function apparaat(ctx, x, y, w, h, a = 1, naam = '', o = {}) { const { lamp = 0, t = 0, scherm = null } = o; zacht3(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 18); shape(ctx, '#D8DEE4', '#9AA3B2', 2); roundRect(ctx, x + 14, y + 14, w - 28, 26, 8); shape(ctx, '#B8C2CC', null);
  roundRect(ctx, x + w * 0.55, y + 60, w * 0.38, h * 0.36, 10); shape(ctx, '#0F1826', '#5A6478', 3);
  if (scherm) scherm(x + w * 0.55, y + 60, w * 0.38, h * 0.36);
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x + 30, y + h - 40, w - 60, 10); circ(ctx, x + w - 40, y + 30, 7, lamp > 0.5 ? (Math.sin(t * 6) > 0 ? C.groen : '#3A5A40') : '#5A6478');
  if (naam) metaText(ctx, naam, x + 30, y + 33, '#3A4458', 'left', 18); }); }

// cuvetje (klein bakje met vloeistof); k 0..1 = kleursterkte, tr 0..1 = troebel
function cuvet(ctx, x, y, w, h, col, k = 0, tr = 0, a = 1) { zacht3(ctx, a, () => { roundRect(ctx, x - w / 2, y, w, h, 4); shape(ctx, rgba('#CFE4F0', 0.1), '#AFC0D0', 2);
  ctx.fillStyle = rgba(BL.serum, 0.55); ctx.fillRect(x - w / 2 + 3, y + h * 0.3, w - 6, h * 0.7 - 3); if (k > 0.01) { ctx.fillStyle = rgba(col, 0.85 * k); ctx.fillRect(x - w / 2 + 3, y + h * 0.3, w - 6, h * 0.7 - 3); }
  if (tr > 0.01) { ctx.fillStyle = rgba('#F2F2EE', 0.25 * tr); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(x + (hash(i * 3) - 0.5) * (w - 10), y + h * 0.35 + hash(i * 3 + 1) * h * 0.6, 2.5, 0, 6.283); ctx.fill(); } } }); }

// ---------- lever en levercellen ----------
function leverVorm3(ctx, x, y, s = 1, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-170, -40); ctx.bezierCurveTo(-120, -110, 60, -120, 170, -80); ctx.bezierCurveTo(200, -60, 170, -20, 120, 0); ctx.bezierCurveTo(40, 40, -40, 90, -110, 70); ctx.bezierCurveTo(-170, 50, -200, 0, -170, -40); ctx.closePath(); shape(ctx, '#8C4A3E', '#B8705E', 3);
  ctx.strokeStyle = rgba('#5E2E26', 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20, -105); ctx.quadraticCurveTo(-10, -40, 10, 30); ctx.stroke(); }); }
// veld van zeshoekige levercellen; kapot = index van een cel die openbreekt (u 0..1), ALAT-stipjes lekken naar beneden
function levercellen(ctx, x, y, R, o = {}) { const { a = 1, kapot = 4, u = 0, t = 0 } = o; zacht3(ctx, a, () => {
  const pos = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) pos.push([x + c * R * 1.75 + (r % 2) * R * 0.87, y + r * R * 1.52]);
  pos.forEach(([px, py], i) => { const br = i === kapot ? u : 0; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const rr = R * (1 + (br > 0 && k === 3 ? 0.25 * br : 0)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, br > 0.3 ? '#6E3A32' : '#A0584A', '#C98070', 2.5);
    circ(ctx, px, py, R * 0.24, C.kern, C.kernR, 1.5);
    for (let j = 0; j < 7; j++) { const an = hash(i * 13 + j) * 6.283, d = R * (0.4 + 0.4 * hash(i * 13 + j + 7)); const lek = i === kapot ? clamp(u * 1.5 - j * 0.08, 0, 1) : 0; const lx = px + Math.cos(an) * d * (1 - lek) + (hash(j) - 0.5) * 120 * lek, ly = py + Math.sin(an) * d * (1 - lek) + lek * (R * 2.2 + j * 10) + Math.sin(t * 2 + j) * 3 * lek; circ(ctx, lx, ly, 6, BL.alat, '#F5D78A', 1); } }); }); }

// ---------- klokvormige verdeling van gezonde mensen ----------
function klokVerdeling(ctx, x, y, w, h, a = 1, o = {}) { const { staart = 1, mark = null } = o; zacht3(ctx, a, () => { const f = (z) => Math.exp(-z * z / 2), Z = (px) => (px - x) / w * 7 - 3.5, P = (z) => x + (z + 3.5) / 7 * w;
  const pad = (z0, z1) => { ctx.beginPath(); ctx.moveTo(P(z0), y + h); for (let i = 0; i <= 60; i++) { const z = z0 + (z1 - z0) * i / 60; ctx.lineTo(P(z), y + h - f(z) * h); } ctx.lineTo(P(z1), y + h); ctx.closePath(); };
  pad(-1.96, 1.96); shape(ctx, rgba(C.groen, 0.35), null); pad(-3.5, -1.96); shape(ctx, rgba(C.koraal, 0.45 * staart + 0.1), null); pad(1.96, 3.5); shape(ctx, rgba(C.koraal, 0.45 * staart + 0.1), null);
  ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const z = -3.5 + 7 * i / 120; i ? ctx.lineTo(P(z), y + h - f(z) * h) : ctx.moveTo(P(z), y + h - f(z) * h); } ctx.stroke();
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  if (mark != null) { const xm = P(mark); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(xm, y + h); ctx.lineTo(xm, y + 10); ctx.stroke(); ctx.setLineDash([]); } }); }

// telpoppetje (alleen in een telling)
function telpop(ctx, x, y, r, col, a = 1) { zacht3(ctx, a, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); }); }

// ---------- bloedbank ----------
// putje met rode bloedcellen; kl 0..1 = klonteren (cellen trekken naar een paar klompjes)
function putje(ctx, x, y, R, kl = 0, a = 1, t = 0, seed = 1, cel = BL.rijk) { zacht3(ctx, a, () => { circ(ctx, x, y, R, '#F2EEE4', '#B8B0A0', 3); circ(ctx, x, y, R - 8, rgba('#E8C870', 0.35), null);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, R - 8, 0, 6.283); ctx.clip();
  const K = [[-0.3, -0.2], [0.25, 0.1], [-0.05, 0.38]];
  for (let i = 0; i < 34; i++) { const hx = (hash(i * 7 + seed) - 0.5) * 1.6 * (R - 14), hy = (hash(i * 7 + 3 + seed) - 0.5) * 1.6 * (R - 14); const k = K[i % 3]; const kx = k[0] * R + (hash(i * 5) - 0.5) * R * 0.22, ky = k[1] * R + (hash(i * 5 + 1) - 0.5) * R * 0.22; const e = ease(kl);
    const wv = wander(i + seed * 40, t, 3 * (1 - e), 1); rbc3(ctx, lerp(x + hx, x + kx, e) + wv.x, lerp(y + hy, y + ky, e) + wv.y, R * 0.085, { rot: i, squash: 0.85, col: cel }); }
  ctx.restore(); }); }

// donorzakje rode bloedcellen
function donorZak(ctx, x, y, s = 1, a = 1, lab = '') { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, -110); ctx.lineTo(-20, -140); ctx.moveTo(20, -110); ctx.lineTo(20, -140); ctx.stroke();
  roundRect(ctx, -80, -110, 160, 220, 30); shape(ctx, BL.arm, lighten(BL.arm, 0.3), 3); roundRect(ctx, -56, -70, 112, 60, 6); shape(ctx, rgba('#F2EEE4', 0.92), null);
  ctx.fillStyle = '#121A26'; for (let i = 0; i < 10; i++) ctx.fillRect(-46 + i * 9.5, -62, 4 + (i % 3) * 2, 26); if (lab) text(ctx, lab, 0, -20, fTekst(18, 800), '#121A26', 'center'); }); }

// grafiekje met assen (labels voluit, geen afkortingen in metaText)
function assen3(ctx, x, y, w, h, xl, yl, a = 1) { zacht3(ctx, a, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) text(ctx, xl, x + w, y + h + 74, fTekst(22, 600), C.text2, 'right'); if (yl) text(ctx, yl, x - 10, y - 18, fTekst(22, 600), C.text2, 'left'); }); }

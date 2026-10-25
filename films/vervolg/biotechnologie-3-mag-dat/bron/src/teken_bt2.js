// Wat word jij? · Biotechnologie en life sciences · film 2 Enzymen op maat — eigen tekeningen (25 okt 2026)
// Bouwt op teken_bt1.js (seriebibliotheek: bacteriePlasmide, bioreactor, kralen, kaartje, sam/merel, labVloer, metaA …).
// Kleuren: enzym grijsblauw met goud actief centrum; eiwit (vlek, substraat) oker; gen paars; bacteriën teal; bleekmiddel en 'let op' koraal; beter/winnaar groen.

const KL_EI = '#E8C860';      // eivlek: geel (oker-familie)
const KL_MELK = '#E9E6DC';    // melkplaat
// ---------- wasmachine en kleding ----------
function wasmachine(ctx, x, y, s = 1, o = {}) { // y = vloer; 300·s breed, 380·s hoog
  const { a = 1, t = 0, draai = 0, temp = '30 °C', open = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -380, 300, 380, 18); shape(ctx, '#DCE2EA', '#9AA8BA', 3); roundRect(ctx, -150, -380, 300, 70, 18); shape(ctx, '#C7CFDA', null);
  roundRect(ctx, 30, -362, 100, 36, 6); shape(ctx, '#1C2436', null); text(ctx, temp, 80, -336, fTekst(26, 700), C.teal, 'center');
  circ(ctx, -100, -344, 12, '#9AA8BA'); circ(ctx, -62, -344, 12, '#9AA8BA');
  circ(ctx, 0, -160, 108, '#9AA8BA'); circ(ctx, 0, -160, 92, '#2A3A58', '#7F8FA6', 3);
  ctx.save(); ctx.beginPath(); ctx.arc(0, -160, 88, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(-90, -160 + Math.sin(t * 3) * 6 * draai, 180, 100);
  for (let i = 0; i < 6; i++) { const an = t * 4 * draai + i; circ(ctx, Math.cos(an) * 50, -160 + Math.sin(an) * 50, 8, rgba('#F2F2EE', 0.35)); } ctx.restore();
  ctx.restore(); }
function broek(ctx, x, y, s = 1, o = {}) { // witte broek, y = taille; vlek 0..1
  const { a = 1, vlek = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(70, 0); ctx.lineTo(80, 260); ctx.lineTo(18, 260); ctx.lineTo(0, 70); ctx.lineTo(-18, 260); ctx.lineTo(-80, 260); ctx.closePath(); shape(ctx, '#F2F2EE', '#C9D2DE', 2);
  ctx.fillStyle = '#DCE2EA'; ctx.fillRect(-70, 0, 140, 16);
  if (vlek > 0.01) { ctx.save(); ctx.globalAlpha *= vlek; blob(ctx, 46, 160, 22, 16, 0.25, 3, 0); ctx.fillStyle = KL_EI; ctx.fill(); ctx.strokeStyle = '#C9A040'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function wasmiddelPak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -180, 140, 180, 10); shape(ctx, '#3E5C7A', '#8FA0B5', 2); roundRect(ctx, -56, -150, 112, 70, 8); shape(ctx, '#F2F2EE', null);
  for (let i = 0; i < 3; i++) enzymKluwen(ctx, -30 + i * 30, -115, 13, { an: i, seed: 2 + i }); text(ctx, 'ENZYMEN', 0, -50, fMeta ? fMeta(18) : '18px monospace', '#F2F2EE', 'center'); ctx.restore(); }

// ---------- vlek en eiwit ----------
function eiwitKetenVezel(ctx, x, y, w, o = {}) { // katoenvezel (lijn) met eiwitketens eraan; knip 0..1: ketens in stukjes, stukjes drijven weg
  const { a = 1, knip = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.bezierCurveTo(x - w / 4, y - 20, x + w / 4, y + 20, x + w / 2, y); ctx.stroke();
  for (let k = 0; k < 4; k++) { const x0 = x - w / 2 + 80 + k * (w - 160) / 3; const n = 12; const pts = [];
    for (let i = 0; i < n; i++) { const seg = Math.floor(i / 3); const weg = clamp(knip * 4 - k - seg * 0.15, 0, 1) * (i > 0 ? 1 : 0); const w2 = wander(i + k * 20, t, 3, 0.5);
      pts.push([x0 + Math.sin(i * 0.9) * 18 + w2.x + weg * (seg - 1.5) * 40, y - 20 - i * 18 - weg * (30 + seg * 25) + w2.y]); }
    pts.forEach(([px, py], i) => { if (i % 3 !== 0 || knip < 0.05) { const q = pts[i - 1]; if (q && (i % 3 !== 0)) { ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(px, py); ctx.stroke(); } }
      circ(ctx, px, py, 8, C.oker, lighten(C.oker, 0.3), 1.2); }); }
  ctx.restore(); }

// ---------- protease (subtilisine) als gevouwen enzym met één gemarkeerd aminozuur ----------
function protease(ctx, x, y, r, o = {}) { // enzymKluwen + plek 222 bij het actieve centrum; plek: 'met' | 'ala' | 'kapot'; vorm 0..1 = vervormd
  const { a = 1, plek = 'met', hl = 0, vorm = 0, sluit = 0, an = 0, t = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); if (vorm > 0.01) { ctx.translate(x, y); ctx.scale(1 + 0.12 * vorm, 1 - 0.1 * vorm); ctx.translate(-x, -y); } enzymKluwen(ctx, x, y, r, { an, sluit }); ctx.restore();
  const px = x + r * 0.42, py = y - r * 0.38; // naast het actieve centrum (rechts)
  if (hl > 0.01) { const col = plek === 'ala' ? C.groen : plek === 'kapot' ? C.koraal : C.goud; ctx.save(); ctx.globalAlpha *= hl; circ(ctx, px, py, r * 0.14, col, '#121A26', 2); ctx.restore(); }
  ctx.restore(); return { plek: [px, py] }; }
function bleekMolecuul(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 14 * s, C.koraal, '#F0A890', 1.5); circ(ctx, x + 16 * s, y - 6 * s, 9 * s, C.koraal, '#F0A890', 1.5); circ(ctx, x - 14 * s, y + 8 * s, 9 * s, C.koraal, '#F0A890', 1.5); ctx.restore(); }

// ---------- gen met mutaties ----------
function genStreep(ctx, x, y, w, o = {}) { // paars gen als balk met basen-streepjes; mut = aantal willekeurige mutaties (goud), seed
  const { a = 1, mut = 0, seed = 1, hlPos = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - 16, w, 32, 10); shape(ctx, rgba(C.paars, 0.85), lighten(C.paars, 0.3), 2);
  ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 2; for (let i = 1; i < 30; i++) { const xx = x - w / 2 + i * w / 30; ctx.beginPath(); ctx.moveTo(xx, y - 10); ctx.lineTo(xx, y + 10); ctx.stroke(); }
  for (let m = 0; m < mut; m++) { const xx = x - w / 2 + (0.05 + hash(seed * 31 + m) * 0.9) * w; ctx.fillStyle = C.goud; ctx.fillRect(xx - 4, y - 18, 8, 36); }
  if (hlPos >= 0) { const xx = x - w / 2 + hlPos * w; ctx.fillStyle = C.groen; ctx.fillRect(xx - 5, y - 20, 10, 40); }
  ctx.restore(); }

// ---------- melkplaat en putjesplaat ----------
function melkPlaat(ctx, x, y, r, o = {}) { // petrischaal van boven: troebel wit, kolonies met heldere ring; n kolonies, seed; ringen 0..1; win = aantal winnaars (goud randje)
  const { a = 1, n = 40, seed = 3, ringen = 1, win = 3, groei = 1, winSchaal = 1 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(KL_MELK, 0.9), '#AFC0D0', 4); circ(ctx, x, y, r - 10, null, rgba('#AFC0D0', 0.5), 1.5);
  const W = []; for (let i = 0; i < n; i++) { const an = hash(seed * 7 + i) * 6.283, rr = Math.sqrt(hash(seed * 11 + i * 3)) * (r - 34); const cx = x + Math.cos(an) * rr, cy = y + Math.sin(an) * rr;
    const wint = i < win; const ring = (wint ? 2.4 * winSchaal : 0.4 + hash(seed + i * 5) * 0.9) * 10 * ringen * groei;
    if (ring > 0.5) circ(ctx, cx, cy, 6 * groei + ring, rgba('#2A3A58', 0.55), null);
    circ(ctx, cx, cy, 6 * groei, C.teal, wint && ringen > 0.5 ? C.goud : lighten(C.teal, 0.3), wint && ringen > 0.5 ? 2.5 : 1); if (wint) W.push([cx, cy]); }
  ctx.restore(); return W; }
function putjesPlaat(ctx, x, y, w, o = {}) { // 96 putjes (8 × 12); kleur per putje = activiteit (paars-goud), meet 0..1 = meetkop loopt over de rijen
  const { a = 1, meet = 0, seed = 5, kleur = 1, hl = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.66;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#DCE2EA', '#9AA8BA', 3); const d = w / 13.5;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const px = x - w / 2 + d * (1.1 + c), py = y - h / 2 + d * (1.0 + r) * 1.0; const v = hash(seed * 97 + r * 12 + c); const act = Math.pow(v, 3) * kleur;
    circ(ctx, px, py, d * 0.38, `rgba(${Math.round(232 - 60 * act)},${Math.round(212 - 120 * act)},${Math.round(120 - 60 * act)},${0.25 + 0.7 * act})`, '#9AA8BA', 1);
    if (hl.some(([rr, cc]) => rr === r && cc === c)) circ(ctx, px, py, d * 0.48, null, C.goud, 3); }
  if (meet > 0.01 && meet < 0.999) { const mx = x - w / 2 + d * (1.1 + 11 * meet); ctx.fillStyle = rgba('#5D6E8C', 0.9); roundRect(ctx, mx - d * 0.5, y - h / 2 - 30, d, h + 50, 8); ctx.fill(); }
  metaA(ctx, '96 PUTJES', x, y + h / 2 + 40, 1, C.grain, 'center', 28); ctx.restore(); }
function tweeBalk(ctx, x, y, knip, bleek, o = {}) { // twee balkjes per variant (knippen bij 30 °C, over na bleek) met startlijn
  const { a = 1, h = 160, label = '', win = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[knip, C.teal, -26], [bleek, C.koraal, 26]].forEach(([v, col, dx]) => { roundRect(ctx, x + dx - 18, y - h * v, 36, h * v, 6); shape(ctx, col, null); });
  ctx.strokeStyle = '#F2F2EE'; ctx.setLineDash([8, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 60, y - h * 0.4); ctx.lineTo(x + 60, y - h * 0.4); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x + 60, y); ctx.stroke();
  if (label) naamBij(ctx, label, '', x, y + 50, 1, 'center', win > 0.5 ? C.groen : C.text); if (win > 0.01) vink_(ctx, x + 70, y - h - 10, 26, win);
  ctx.restore(); }

// ---------- product en medicijn ----------
function korrels(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) circ(ctx, x + (hash(i) - 0.5) * 120 * s, y + (hash(i + 5) - 0.5) * 50 * s, (10 + hash(i + 9) * 6) * s, '#D9CFB6', '#B8AD92', 1.5); ctx.restore(); }
function octrooiBrief(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -120, 180, 240, 8); shape(ctx, '#F2F2EE', '#C9D2DE', 2);
  ctx.strokeStyle = '#9AA8BA'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-64, -80 + i * 26); ctx.lineTo(64 - (i % 2) * 30, -80 + i * 26); ctx.stroke(); }
  circ(ctx, 44, 80, 26, C.koraal, '#F0A890', 2); text(ctx, 'OCTROOI', 0, -94, fTekst(22, 700), '#2A3A58', 'center'); ctx.restore(); }
function pilDoosje(ctx, x, y, s = 1, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -70, 220, 140, 12); shape(ctx, '#F2F2EE', '#C9D2DE', 2); ctx.fillStyle = C.teal; ctx.fillRect(-110, -70, 220, 30);
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-50 + i * 50, 20); ctx.rotate(0.4); roundRect(ctx, -24, -11, 48, 22, 11); shape(ctx, '#C9D2DE', '#9AA8BA', 1.5); ctx.restore(); }
  if (label) text(ctx, label, 0, -48, fTekst(22, 700), '#F2F2EE', 'center'); ctx.restore(); }
function afvalBalken(ctx, x, y, o = {}) { const { a = 1, k = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[1, '#6E7A90', 'OUD PROCES'], [0.81, C.groen, 'MET ENZYM']].forEach(([v, col, lab], i) => { const w = 360 * (i ? lerp(1, v, k) : v); roundRect(ctx, x, y + i * 70, w, 44, 8); shape(ctx, col, null); metaA(ctx, lab, x + w + 16, y + i * 70 + 32, 1, C.grain, 'left', 28); });
  metaA(ctx, 'AFVAL', x, y - 16, 1, C.grain, 'left', 28); ctx.restore(); }
function metaalWeg(ctx, x, y, a = 1, kr = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 40, '#2A3A58', '#9AA8BA', 2); text(ctx, 'Rh', x, y + 12, fTekst(34, 700), '#C9D2DE', 'center'); kruis(ctx, x, y, 44, kr); ctx.restore(); }

// ---------- eivlek als kluwen van gestold eiwit op een vezel (Kamiel 25 okt 2026: kluwen is realistischer) ----------
function eiwitKluwenVezel(ctx, x, y, w, o = {}) { // knip 0..1: stukjes laten los van de buitenkant en drijven weg, kluwen krimpt
  const { a = 1, knip = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.bezierCurveTo(x - w / 4, y - 20, x + w / 4, y + 20, x + w / 2, y); ctx.stroke();
  const cx = x, cy = y - 95, N = 10;
  for (let k = 0; k < N; k++) { // N ketens door elkaar, elk een stukje van het kluwen
    const ord = hash(k + 3); const weg = clamp(knip * 1.7 - ord * 0.8, 0, 1); const an0 = hash(k + 11) * 6.283;
    const dx = Math.cos(an0) * weg * 260, dy = -Math.abs(Math.sin(an0)) * weg * 200 - weg * 60;
    const pts = []; for (let i = 0; i < 9; i++) { const an = an0 + i * 0.9 + Math.sin(k + i) * 0.6, rr = 35 + 90 * hash(k * 9 + i); const w2 = wander(i + k * 20, t, 2.5, 0.5);
      const g = Math.floor(i / 3), ga = an0 + g * 2.1; pts.push([cx + Math.cos(an) * rr + Math.cos(ga) * weg * 220 + w2.x, cy + Math.sin(an) * rr * 0.8 - weg * (120 + g * 70) + Math.sin(ga) * weg * 80 + w2.y]); }
    ctx.save(); ctx.globalAlpha *= 1 - weg * 0.95;
    const brok = weg > 0.02; pts.forEach(([px, py], i) => { if (i && !(brok && i % 3 === 0)) { const q = pts[i - 1]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(px, py); ctx.stroke(); } });
    pts.forEach(([px, py]) => circ(ctx, px, py, 8, C.oker, lighten(C.oker, 0.3), 1.2)); ctx.restore(); }
  ctx.restore(); }

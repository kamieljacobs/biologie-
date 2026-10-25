// Wat word jij? · Biotechnologie en life sciences · film 1 Bacteriën als fabriek — eigen tekeningen (25 okt 2026)
// Seriekleuren (reeksbrief): DNA/gen/plasmide paars, insuline lichtpaars, bacteriën en gist teal, zuurstof teal, suiker/voeding oker,
// let op koraal, gelukt/zuiver groen, focus goud; enzymen grijsblauw met goud actief centrum.
// Schaal in de labscènes: persoon 400 px ≈ 1,70 m → ± 235 px per meter (kolf van 1 liter ± 22 cm hoog ≈ 52 px; in beeld vaak vergroot, dan label).

const FLOOR = 860;
const KL_INS = '#B7A8E6';           // insuline: lichte tint paars (familie van paars, reeksbrief)
const KL_GLAS = '#AFC0D0';          // labglas (Part C lab-bibliotheek)
const KL_KWEEK = '#4E8FA8';         // troebele kweek (teal, gedempt)
const KL_STAAL = '#5D6E8C', KL_STAAL2 = '#46556F';
const LAB = { outfit: 'practicum' };
function bt1Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 760); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.voet || FLOOR, o.h || 400, Object.assign({ t, uit: 'neutraal', kijk: 1 }, LAB, o)); }
function merel(ctx, x, t, o = {}) { return persoon(ctx, 'merel', x, o.voet || FLOOR, o.h || 400, Object.assign({ t, uit: 'neutraal', kijk: -1 }, o)); }
function bt1Rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function labVloer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324E'; ctx.fillRect(0, FLOOR, W, 30); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, FLOOR); ctx.lineTo(W, FLOOR); ctx.stroke(); ctx.restore(); }

// ---------- labglas ----------
function buisje(ctx, x, y, s = 1, o = {}) { // y = onderkant; 200·s hoog
  const { a = 1, vul = 0.45, col = KL_KWEEK, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const w = 34, h = 200; ctx.beginPath(); ctx.moveTo(-w / 2, -h); ctx.lineTo(-w / 2, -w / 2); ctx.arc(0, -w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(w / 2, -h); ctx.closePath();
  ctx.fillStyle = rgba(C.fill, 0.5); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(-w, -h * vul, 2 * w, h * vul); ctx.fillStyle = rgba('#F2F2EE', 0.25); for (let i = 0; i < 14; i++) { const r = hash(i + 3); circ(ctx, (hash(i) - 0.5) * w * 0.8, -h * vul * r, 1.8, rgba('#E8F1F5', 0.5)); } ctx.restore();
  ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-w / 2, -h); ctx.lineTo(-w / 2, -w / 2); ctx.arc(0, -w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(w / 2, -h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 - 5, -h); ctx.lineTo(w / 2 + 5, -h); ctx.stroke(); ctx.restore(); }
function kolf(ctx, x, y, s = 1, o = {}) { // erlenmeyer, y = onderkant, 240·s hoog
  const { a = 1, vul = 0.42, col = KL_KWEEK, t = 0, golf = 0, zuurstof = 0, dicht = 0.5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 110, N = 26, h = 240, hn = 70; const pad = () => { ctx.beginPath(); ctx.moveTo(-N, -h); ctx.lineTo(-N, -h + hn); ctx.lineTo(-B, -14); ctx.quadraticCurveTo(-B, 0, -B + 14, 0); ctx.lineTo(B - 14, 0); ctx.quadraticCurveTo(B, 0, B, -14); ctx.lineTo(N, -h + hn); ctx.lineTo(N, -h); };
  pad(); ctx.fillStyle = rgba(C.fill, 0.45); ctx.fill();
  const ly = -(h - hn) * vul; const halfW = B - (B - N) * (vul); // breedte bij het vloeistofoppervlak
  ctx.save(); pad(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-B - 10, 10); for (let i = 0; i <= 24; i++) { const xx = -B + i / 24 * 2 * B; ctx.lineTo(xx, ly + Math.sin(i * 0.9 + t * 5) * 6 * golf); } ctx.lineTo(B + 10, 10); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  for (let i = 0; i < 40 * dicht; i++) circ(ctx, (hash(i * 7) - 0.5) * 2 * B * 0.8, ly + 8 + hash(i * 3 + 1) * (-ly - 12), 2.2, rgba('#DDEBF2', 0.45)); ctx.restore();
  ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; pad(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-N - 6, -h); ctx.lineTo(N + 6, -h); ctx.stroke();
  if (zuurstof > 0.01) { ctx.save(); ctx.globalAlpha *= zuurstof; for (let i = 0; i < 4; i++) { const xx = (i - 1.5) * halfW * 0.45, k = ((t * 0.6 + i * 0.25) % 1); pijl(ctx, xx, ly - 46 + k * 10, xx, ly - 6 + k * 14, C.teal, 1 - k * 0.6, 3, 10); } ctx.restore(); }
  ctx.restore(); return { ly: y + ly * s, halfW: halfW * s }; }
function schudtafel(ctx, x, y, w, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 26, 6); shape(ctx, '#33456A', rgba(C.line, 0.6), 2); roundRect(ctx, x - w / 2 + 20, y + 26, w - 40, 60, 8); shape(ctx, '#2A3A58', rgba(C.line, 0.5), 2);
  circ(ctx, x + w / 2 - 50, y + 56, 10, C.groen); ctx.restore(); }
function vatGlas(ctx, x, y, w, h, o = {}) { // simpel kweekvat (cilinder), y = onderkant
  const { a = 1, vul = 0.6, col = KL_KWEEK, t = 0, golf = 0, dicht = 0.5, zuurstof = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h, w, h, 14); ctx.fillStyle = rgba(C.fill, 0.45); ctx.fill(); ctx.save(); roundRect(ctx, x - w / 2, y - h, w, h, 14); ctx.clip();
  const ly = y - h * vul; ctx.beginPath(); ctx.moveTo(x - w / 2 - 5, y + 5); for (let i = 0; i <= 20; i++) ctx.lineTo(x - w / 2 + i / 20 * w, ly + Math.sin(i * 0.8 + t * 5) * 5 * golf); ctx.lineTo(x + w / 2 + 5, y + 5); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  for (let i = 0; i < 70 * dicht; i++) circ(ctx, x + (hash(i * 5) - 0.5) * w * 0.9, ly + 6 + hash(i * 3 + 2) * (y - ly - 10), 2.2, rgba('#DDEBF2', 0.45)); ctx.restore();
  roundRect(ctx, x - w / 2, y - h, w, h, 14); ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; ctx.stroke();
  if (zuurstof > 0.01) { ctx.save(); ctx.globalAlpha *= zuurstof; for (let i = 0; i < 4; i++) { const xx = x + (i - 1.5) * w * 0.22, k = ((t * 0.6 + i * 0.25) % 1); pijl(ctx, xx, ly - 46 + k * 10, xx, ly - 6 + k * 14, C.teal, 1 - k * 0.6, 3, 10); } ctx.restore(); }
  ctx.restore(); return { ly: y - h * vul }; }

// ---------- bioreactor in doorsnede ----------
// s = 1: ± 300 breed, 520 hoog; y = vloer. Geeft de plekken van sensoren en pomp terug.
function bioreactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, bel = 1, roer = 1, sensor = 1, pomp = 0, stoom = 0, vul = 0.72, hl = null, dicht = 0.6, voeding = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 300, h = 470, top = -h - 40; // poten 40
  ctx.strokeStyle = KL_STAAL2; ctx.lineWidth = 10; ctx.lineCap = 'round'; [[-110, -40, -130, 0], [110, -40, 130, 0]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.stroke(); });
  const body = () => { ctx.beginPath(); ctx.moveTo(-w / 2, top + 50); ctx.quadraticCurveTo(-w / 2, top, -w / 2 + 50, top); ctx.lineTo(w / 2 - 50, top); ctx.quadraticCurveTo(w / 2, top, w / 2, top + 50); ctx.lineTo(w / 2, -90); ctx.quadraticCurveTo(w / 2, -40, w / 2 - 60, -40); ctx.lineTo(-w / 2 + 60, -40); ctx.quadraticCurveTo(-w / 2, -40, -w / 2, -90); ctx.closePath(); };
  body(); ctx.fillStyle = '#26344F'; ctx.fill();
  const ly = -40 - (h - 10) * vul;
  ctx.save(); body(); ctx.clip();
  ctx.beginPath(); ctx.moveTo(-w, 0); for (let i = 0; i <= 20; i++) ctx.lineTo(-w / 2 + i / 20 * w, ly + Math.sin(i * 0.7 + t * 4) * 4); ctx.lineTo(w, 0); ctx.closePath(); ctx.fillStyle = KL_KWEEK; ctx.fill();
  for (let i = 0; i < 90 * dicht; i++) { const w2 = wander(i, t, 4, 0.5); circ(ctx, (hash(i * 5) - 0.5) * w * 0.9 + w2.x, ly + 8 + hash(i * 3 + 2) * (-40 - ly - 12) + w2.y, 2.2, rgba('#DDEBF2', 0.45)); }
  if (bel > 0.01) { ctx.save(); ctx.globalAlpha *= bel; for (let i = 0; i < 46; i++) { const ph = (t * (0.35 + 0.25 * hash(i)) + hash(i + 40)) % 1, yy = lerp(-62, ly + 6, ph), sw = Math.sin(ph * 9 + i) * 26 * ph;
      const xx = (hash(i + 7) - 0.5) * 200 + sw + (ph > 0.25 ? Math.cos(t * 2 * roer + i) * 30 * roer : 0); circ(ctx, xx, yy, 3 + 4 * hash(i + 2), rgba('#CFE6F2', 0.75)); ctx.strokeStyle = C.teal; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(xx, yy, 3 + 4 * hash(i + 2), 0, 6.283); ctx.stroke(); } ctx.restore(); }
  if (stoom > 0.01) { ctx.save(); ctx.globalAlpha *= stoom; for (let i = 0; i < 18; i++) { const ph = (t * 0.4 + hash(i)) % 1; ctx.fillStyle = rgba('#F2F2EE', 0.25 * (1 - ph)); ctx.beginPath(); ctx.arc((hash(i + 3) - 0.5) * 240 + Math.sin(ph * 6 + i) * 20, lerp(-60, top + 40, ph), 20 + 30 * ph, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore();
  body(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.stroke();
  // as met roerbladen
  ctx.strokeStyle = '#B8C4D4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, top - 50); ctx.lineTo(0, -110); ctx.stroke();
  roundRect(ctx, -34, top - 96, 68, 50, 8); shape(ctx, KL_STAAL, '#8FA0B5', 2);
  [-260, -180].forEach((yy) => { const k = Math.sin(t * 6 * roer + yy); ctx.fillStyle = '#B8C4D4'; roundRect(ctx, -60 * Math.abs(k) - 6, yy - 10, 120 * Math.abs(k) + 12, 20, 4); ctx.fill(); });
  // beluchting onderin
  ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-w / 2 - 70, -70); ctx.lineTo(-90, -70); ctx.lineTo(90, -70); ctx.stroke(); for (let i = -4; i <= 4; i++) circ(ctx, i * 20, -70, 3, '#CFE6F2');
  const P = { lucht: [-w / 2 - 70, -70], as: [0, top - 70], top, ly };
  // sensoren rechts
  if (sensor > 0.01) { ctx.save(); ctx.globalAlpha *= sensor; [['T', -330], ['pH', -260], ['O₂', -190]].forEach(([nm, yy], i) => { ctx.strokeStyle = '#B8C4D4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w / 2 + 2, yy); ctx.lineTo(w / 2 - 50, yy); ctx.stroke();
      roundRect(ctx, w / 2 + 8, yy - 24, 62, 48, 8); shape(ctx, hl === nm ? rgba(C.goud, 0.35) : '#2A3A58', hl === nm ? C.goud : '#8FA0B5', 2); text(ctx, nm, w / 2 + 39, yy + 10, fTekst(28, 700), C.text, 'center'); P['s' + i] = [w / 2 + 70, yy]; }); ctx.restore(); }
  // voedingspomp links boven
  if (pomp > 0.01) { ctx.save(); ctx.globalAlpha *= pomp; roundRect(ctx, -w / 2 - 130, top - 40, 90, 110, 10); shape(ctx, '#2A3A58', '#8FA0B5', 2); ctx.save(); roundRect(ctx, -w / 2 - 122, top - 32, 74, 94, 6); ctx.clip(); ctx.fillStyle = C.oker; ctx.fillRect(-w / 2 - 130, top + 10, 90, 70); ctx.restore();
    ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-w / 2 - 40, top + 10); ctx.quadraticCurveTo(-w / 2 + 10, top - 10, -60, top + 20); ctx.stroke();
    if (voeding > 0.01) { const k = (t * 0.8) % 1; circ(ctx, lerp(-60, -50, k), lerp(top + 24, ly - 4, k), 6, C.oker); } ctx.restore(); P.pomp = [-w / 2 - 85, top + 15]; }
  ctx.restore();
  const T = (p) => p ? [x + p[0] * s, y + p[1] * s] : null; return { lucht: T(P.lucht), as: T(P.as), top: y + top * s, ly: y + ly * s, sT: T(P.s0), sPH: T(P.s1), sO2: T(P.s2), pomp: T(P.pomp), w: w * s }; }

// ---------- productieketen ----------
function tank(ctx, x, y, w, h, o = {}) { const { a = 1, vul = 0.7, label = '', meta = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = Math.min(w * 0.3, 40); ctx.beginPath(); ctx.moveTo(x - w / 2, y - h + r); ctx.quadraticCurveTo(x - w / 2, y - h, x - w / 2 + r, y - h); ctx.lineTo(x + w / 2 - r, y - h); ctx.quadraticCurveTo(x + w / 2, y - h, x + w / 2, y - h + r); ctx.lineTo(x + w / 2, y - r * 0.6); ctx.quadraticCurveTo(x + w / 2, y, x + w / 2 - r, y); ctx.lineTo(x - w / 2 + r, y); ctx.quadraticCurveTo(x - w / 2, y, x - w / 2, y - r * 0.6); ctx.closePath();
  ctx.fillStyle = '#26344F'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = KL_KWEEK; ctx.fillRect(x - w, y - h * vul, w * 2, h); ctx.restore(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.stroke();
  if (label) naamBij(ctx, label, meta, x, y + 50, 1, 'center'); ctx.restore(); }
function opschaalRij(ctx, x0, y, o = {}) { // reageerbuisje → kolf → voorkweektank → productietank; k = hoe ver de pijlen lopen (0..4)
  const { a = 1, k = 4, hl = -1, labels = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = [x0, x0 + 230, x0 + 520, x0 + 950];
  const A = (i) => clamp(k - i + 1, 0, 1);
  buisje(ctx, X[0], y, 0.6, { a: A(0) }); kolf(ctx, X[1], y, 0.6, { a: A(1) }); tank(ctx, X[2], y, 130, 220, { a: A(2) }); tank(ctx, X[3], y, 320, 520, { a: A(3) });
  const L = [['reageerbuisje', ''], ['kolf', '± 1 liter'], ['voorkweektank', ''], ['productietank', '10.000 – tienduizenden liters']];
  if (labels) L.forEach(([n, m], i) => naamBij(ctx, n, m, X[i], y + 50, A(i) * (hl < 0 || hl === i ? 1 : 0.5), 'center', hl === i ? C.goud : C.text));
  for (let i = 0; i < 3; i++) { const u = clamp(k - i - 0.5, 0, 1); if (u > 0.01) pijl(ctx, X[i] + 60, y - 70, lerp(X[i] + 60, X[i + 1] - (i === 2 ? 180 : 90), ease(u)), y - 70, C.line, 1, 3, 14); }
  ctx.restore(); return X; }

// ---------- vroeger: slachthuis ----------
function krat(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40 * s, y - 32 * s, 80 * s, 32 * s, 4); shape(ctx, '#5A4A3A', '#8C7458', 2);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#B5776A'; ctx.beginPath(); ctx.ellipse(x + (i - 1) * 24 * s, y - 34 * s, 13 * s, 7 * s, 0.2 * i, 0, 6.283); ctx.fill(); } ctx.restore(); }
function vrachtwagen(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -220, -170, 300, 150, 8); shape(ctx, '#3B4C6C', '#8FA0B5', 2); roundRect(ctx, 86, -120, 110, 100, 12); shape(ctx, '#4A5E82', '#8FA0B5', 2); roundRect(ctx, 120, -108, 60, 40, 6); shape(ctx, '#7FA0C0', null);
  [-150, 10, 150].forEach((wx) => { circ(ctx, wx, -18, 26, '#1C2436', '#8FA0B5', 2); circ(ctx, wx, -18, 10, '#5D6E8C'); });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) krat(ctx, -170 + c * 95, -40 - r * 40, 0.9, 1); ctx.restore(); }
function insulineFlesje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -90, 52, 90, 10); shape(ctx, rgba(C.fill, 0.6), KL_GLAS, 3); ctx.fillStyle = rgba(KL_INS, 0.55); ctx.fillRect(-22, -60, 44, 56); roundRect(ctx, -18, -110, 36, 22, 4); shape(ctx, C.oker, null); roundRect(ctx, -24, -50, 48, 22, 3); shape(ctx, '#F2F2EE', null); ctx.restore(); }
function insulinePen(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = -0.2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -170, -22, 300, 44, 22); shape(ctx, '#3E5C7A', '#8FA0B5', 2); roundRect(ctx, -60, -14, 110, 28, 8); shape(ctx, rgba(KL_INS, 0.6), '#C9D2DE', 1.5);
  roundRect(ctx, 130, -16, 50, 32, 10); shape(ctx, '#2A3A58', '#8FA0B5', 2); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(180, 0); ctx.lineTo(200, 0); ctx.stroke();
  roundRect(ctx, -200, -14, 34, 28, 6); shape(ctx, C.goud, null); ctx.restore(); }
function weegschaal(ctx, x, y, s = 1, o = {}) { // balans: links (veel), rechts (weinig). tilt>0 = links omlaag
  const { a = 1, tilt = 0.18 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -260); ctx.stroke(); roundRect(ctx, -70, -10, 140, 20, 6); shape(ctx, '#33456A', '#8FA0B5', 2);
  ctx.save(); ctx.translate(0, -260); ctx.rotate(-tilt); ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.stroke(); circ(ctx, 0, 0, 10, C.goud); ctx.restore();
  const yl = -260 + Math.sin(tilt) * 230, yr = -260 - Math.sin(tilt) * 230; const L = [-230 * Math.cos(tilt), yl], R = [230 * Math.cos(tilt), yr];
  [L, R].forEach(([px, py]) => { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 70, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 70, py + 110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, py + 112, 90, 14, 0, 0, Math.PI); ctx.fillStyle = '#33456A'; ctx.fill(); ctx.stroke(); });
  ctx.restore(); return { L: [x + L[0] * s, y + (L[1] + 110) * s], R: [x + R[0] * s, y + (R[1] + 110) * s] }; }

// ---------- cellen ----------
function bacteriePlasmide(ctx, x, y, L, o = {}) { // staafbacterie (E. coli) van boven/zij, teal wand, paars nucleoïde, plasmidering
  const { a = 1, t = 0, rot = 0, gen = 0, ribo = 0, klont = 0, plasmide = 1, keten = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const h = L * 0.42; roundRect(ctx, -L / 2, -h / 2, L, h, h / 2); shape(ctx, '#1B2B3A', C.teal, 6); roundRect(ctx, -L / 2 + 10, -h / 2 + 10, L - 20, h - 20, h / 2 - 10); ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 2; ctx.stroke();
  // nucleoïde (eigen DNA): kluwen
  ctx.strokeStyle = rgba(C.paars, 0.75); ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = i / 120 * 6.283 * 3; const rx = L * 0.2 + Math.sin(u * 0.7) * L * 0.05, ry = h * 0.22 + Math.cos(u * 1.3) * h * 0.05; const px = -L * 0.12 + Math.cos(u) * rx, py = Math.sin(u) * ry; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  // ribosomen
  for (let i = 0; i < 40; i++) { const w2 = wander(i, t, 3, 0.6); circ(ctx, (hash(i * 3) - 0.5) * (L - h * 0.8) + w2.x, (hash(i * 5 + 1) - 0.5) * (h - 30) + w2.y, 3, rgba(C.ribo, 0.8)); }
  // plasmide rechts
  const px = L * 0.26, py = 0, pr = h * 0.2;
  if (plasmide > 0.01) { ctx.save(); ctx.globalAlpha *= plasmide; ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(px, py, pr, 0, 6.283); ctx.stroke();
    if (gen > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.globalAlpha *= gen; ctx.beginPath(); ctx.arc(px, py, pr, -0.9, 0.5); ctx.stroke(); } ctx.restore(); }
  // eiwitketen die uit een ribosoom komt
  if (keten > 0.01) { ctx.save(); ctx.globalAlpha *= keten; const n = Math.round(14 * keten); for (let i = 0; i < n; i++) { const w2 = wander(i + 70, t, 2, 0.8); circ(ctx, px - pr - 20 - i * 9 + w2.x, pr + 18 + Math.sin(i * 0.8) * 8 + w2.y, 5, KL_INS, lighten(KL_INS, 0.3), 1); } ctx.restore(); }
  if (klont > 0.01) { ctx.save(); ctx.globalAlpha *= klont; blob(ctx, -L * 0.3, 0, h * 0.24, h * 0.2, 0.12, 5, 0); ctx.fillStyle = rgba(KL_INS, 0.9); ctx.fill(); ctx.strokeStyle = lighten(KL_INS, 0.3); ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < 12; i++) { ctx.strokeStyle = rgba('#5A4A8A', 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(-L * 0.3 + (hash(i) - 0.5) * h * 0.3, (hash(i + 4) - 0.5) * h * 0.25, 5 + hash(i + 9) * 5, hash(i) * 6, hash(i) * 6 + 3); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); const cs = Math.cos(rot), sn = Math.sin(rot); return { plasmide: [x + px * cs, y + px * sn], klont: [x - L * 0.3 * cs, y - L * 0.3 * sn], h }; }
function gistcel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, knop = 0.35, uit = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = r * 0.48 * knop / 0.35; if (knop > 0.01) { circ(ctx, x + r * 0.95, y - r * 0.55, kr, '#1B2B3A', C.teal, 4); }
  circ(ctx, x, y, r, '#1B2B3A', C.teal, 5); circ(ctx, x - r * 0.2, y + r * 0.05, r * 0.32, rgba(C.kern, 0.7), C.kernR, 2); circ(ctx, x + r * 0.35, y + r * 0.35, r * 0.18, rgba(C.vesR, 0.15), rgba(C.line, 0.6), 1.5);
  for (let i = 0; i < 16; i++) { const w2 = wander(i + 30, t, 2, 0.6); const an = hash(i) * 6.283, rr = r * (0.45 + 0.4 * hash(i + 2)); circ(ctx, x + Math.cos(an) * rr + w2.x, y + Math.sin(an) * rr + w2.y, 2.6, rgba(C.ribo, 0.8)); }
  if (uit > 0.01) { for (let i = 0; i < 6; i++) { const ph = (t * 0.3 + i / 6) % 1, an = -0.6 + i * 0.5; circ(ctx, x + Math.cos(an) * r * (1.1 + ph * 0.8), y + Math.sin(an) * r * (1.1 + ph * 0.8), 5, rgba(KL_INS, uit * (1 - ph))); } }
  ctx.restore(); }

// ---------- insuline als kralenketting ----------
// B-keten 30 aminozuren, A-keten 21; zwavelbruggen A7–B7, A20–B19 en binnen A: A6–A11.
function _ketenPunten(n, x0, y0, dx, golf = 6) { return Array.from({ length: n }, (_, i) => [x0 + i * dx, y0 + Math.sin(i * 0.9) * golf]); }
function kralen(ctx, pts, r, col, o = {}) { const { a = 1, hl = [] , hlCol = C.goud } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = r * 0.35; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
  pts.forEach(([px, py], i) => { if (hl.includes(i)) { circ(ctx, px, py, r * 1.45, hlCol, '#F2F2EE', 2); } else circ(ctx, px, py, r, col, lighten(col, 0.25), 1.2); }); ctx.restore(); }
function insulineMol(ctx, x, y, s = 1, o = {}) { // twee ketens met drie zwavelbruggen; hlB/hlA = indexen (0-gebaseerd) die oplichten
  const { a = 1, bruggen = 1, hlA = [], hlB = [], col = KL_INS, t = 0, label = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = 9 * s, dx = 20 * s; const B = _ketenPunten(30, x - 14.5 * dx, y + 26 * s, dx, 5 * s), A = _ketenPunten(21, x - 14.5 * dx + 2 * dx, y - 26 * s, dx, 5 * s);
  if (bruggen > 0.01) { ctx.save(); ctx.globalAlpha *= bruggen; ctx.strokeStyle = '#D9D2F2'; ctx.lineWidth = 3 * s; [[6, 6], [19, 18]].forEach(([ia, ib]) => { ctx.beginPath(); ctx.moveTo(A[ia][0], A[ia][1]); ctx.lineTo(B[ib][0], B[ib][1]); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(A[5][0], A[5][1]); ctx.quadraticCurveTo((A[5][0] + A[10][0]) / 2, A[5][1] - 34 * s, A[10][0], A[10][1]); ctx.stroke(); ctx.restore(); }
  kralen(ctx, A, r, col, { hl: hlA }); kralen(ctx, B, r, col, { hl: hlB });
  if (label) { metaA(ctx, 'A-KETEN · 21', A[20][0] + 24 * s, A[20][1] + 8, 1, C.grain, 'left', 24); metaA(ctx, 'B-KETEN · 30', B[29][0] + 24 * s, B[29][1] + 8, 1, C.grain, 'left', 24); }
  ctx.restore(); return { A, B }; }
function voorloper(ctx, x, y, s = 1, o = {}) { // B-keten → middenstuk (C) → A-keten als één keten; C loopt van B30 in een boog over de bovenkant naar A1 (links). knip 0..1 haalt C weg.
  const { a = 1, knip = 0, fold = 0, t = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const r = 9 * s, dx = 20 * s; const nB = 30, nC = 31, nA = 21;
  const Bx0 = x - 14.5 * dx; const Bp = _ketenPunten(nB, Bx0, y + 26 * s, dx, 5 * s); const Ap = _ketenPunten(nA, Bx0 + 2 * dx, y - 26 * s, dx, 5 * s);
  const pb = Bp[nB - 1], pa = Ap[0]; const P1 = [pb[0] + 170 * s, pb[1] - 120 * s], P2 = [pa[0] - 170 * s, pa[1] - 190 * s];
  const Cp = Array.from({ length: nC }, (_, i) => { const u = (i + 1) / (nC + 1), v = 1 - u; const bx = v * v * v * pb[0] + 3 * v * v * u * P1[0] + 3 * v * u * u * (P2[0] + 0) + u * u * u * pa[0], by = v * v * v * pb[1] + 3 * v * v * u * (P1[1] - 90 * s) + 3 * v * u * u * (P2[1] - 40 * s) + u * u * u * pa[1]; return [bx, by]; });
  const n = nB + nC + nA; const recht = (i) => [x - n / 2 * dx * 0.62 + i * dx * 0.62, y + Math.sin(i * 0.7) * 6 * s];
  const f = ease(fold); const P = (p, i) => [lerp(recht(i)[0], p[0], f), lerp(recht(i)[1], p[1], f)];
  const B = Bp.map((p, i) => P(p, i)), Cc = Cp.map((p, i) => P(p, nB + i)), A = Ap.map((p, i) => P(p, nB + nC + i));
  const weg = ease(knip); const Cs = Cc.map(([px, py]) => [px, py - weg * 170 * s]);
  const lijn = (pts) => { ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); };
  ctx.strokeStyle = rgba(KL_INS, 0.7); ctx.lineWidth = r * 0.35;
  if (weg < 0.05) lijn(B.concat(Cc, A)); else { lijn(B); lijn(A); ctx.save(); ctx.globalAlpha *= 1 - weg * 0.7; ctx.strokeStyle = 'rgba(154,163,178,0.7)'; lijn(Cs); ctx.restore(); }
  if (fold > 0.95) { ctx.save(); ctx.globalAlpha *= clamp((fold - 0.95) * 20, 0, 1); ctx.strokeStyle = '#D9D2F2'; ctx.lineWidth = 3 * s; [[6, 6], [19, 18]].forEach(([ia, ib]) => { ctx.beginPath(); ctx.moveTo(A[ia][0], A[ia][1]); ctx.lineTo(B[ib][0], B[ib][1]); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(A[5][0], A[5][1]); ctx.quadraticCurveTo((A[5][0] + A[10][0]) / 2, A[5][1] - 34 * s, A[10][0], A[10][1]); ctx.stroke(); ctx.restore(); }
  B.forEach(([px, py]) => circ(ctx, px, py, r, KL_INS, lighten(KL_INS, 0.25), 1.2)); A.forEach(([px, py]) => circ(ctx, px, py, r, KL_INS, lighten(KL_INS, 0.25), 1.2));
  ctx.save(); ctx.globalAlpha *= 1 - weg * 0.7; Cs.forEach(([px, py]) => circ(ctx, px, py, r * 0.9, '#9AA3B2', '#C9D2DE', 1.2)); ctx.restore();
  ctx.restore(); return { knip1: B[nB - 1], knip2: A[0], C: Cs[Math.floor(nC / 2)] }; }
function schaartje(ctx, x, y, r, o = {}) { const { a = 1, sluit = 0, an = 0 } = o; enzymKluwen(ctx, x, y, r, { a, sluit, an }); }

// ---------- aminozuren vergelijken (mens, varken, rund) ----------
function aminoRijen(ctx, x, y, o = {}) { const { a = 1, k = 1, s = 0.62 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rows = [['mens', [], [], 1], ['varken', [], [29], clamp(k * 2, 0, 1)], ['rund', [7, 9], [29], clamp(k * 2 - 1, 0, 1)]];
  rows.forEach(([nm, hA, hB, al], i) => { if (al <= 0.01) return; const yy = y + i * 150; ctx.save(); ctx.globalAlpha *= al; insulineMol(ctx, x, yy, s, { bruggen: 1, hlA: hA, hlB: hB }); naamBij(ctx, nm, i ? (i === 1 ? '1 aminozuur anders' : '3 aminozuren anders') : 'insuline', x - 330, yy + 10, 1, 'right', i ? C.text : C.text); ctx.restore(); });
  ctx.restore(); }

// ---------- zuiveren ----------
function centrifuge(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, draai = 0, pellet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -150, 340, 150, 24); shape(ctx, '#33456A', '#8FA0B5', 2); ctx.beginPath(); ctx.ellipse(0, -150, 150, 34, 0, 0, 6.283); ctx.fillStyle = '#1C2436'; ctx.fill(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke();
  const ang = draai * t * 9; for (let i = 0; i < 6; i++) { const an = ang + i * Math.PI / 3; const bx = Math.cos(an) * 105, by = -150 + Math.sin(an) * 22; roundRect(ctx, bx - 12, by - 9, 24, 18, 5); shape(ctx, rgba(KL_KWEEK, 0.9), KL_GLAS, 1.5); }
  circ(ctx, 0, -150, 14, '#8FA0B5'); circ(ctx, 120, -70, 9, C.groen); ctx.restore(); }
function buisBezonken(ctx, x, y, s = 1, o = {}) { const { a = 1, sep = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; buisje(ctx, x, y, s, { vul: 0.75, col: lerp(0, 1, sep) > 0.5 ? rgba('#7FA6B8', 0.35) : KL_KWEEK });
  ctx.save(); ctx.globalAlpha *= sep; ctx.fillStyle = KL_KWEEK; ctx.beginPath(); ctx.arc(x, y - 17 * s, 17 * s, 0, Math.PI); ctx.fill(); ctx.fillRect(x - 17 * s, y - 36 * s, 34 * s, 20 * s); ctx.restore(); ctx.restore(); }
function kolom(ctx, x, y, w, h, o = {}) { // chromatografiekolom van binnen: korrels, eiwitten van boven naar beneden; k = verloop 0..1; insuline (paars) komt bij k≈0.75 onderaan uit
  const { a = 1, t = 0, k = 0, label = '', sub = '', korrelCol = '#3A4A66', toonUit = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h, w, h, 12); shape(ctx, '#1C2436', '#8FA0B5', 3); ctx.save(); roundRect(ctx, x - w / 2 + 4, y - h + 4, w - 8, h - 8, 10); ctx.clip();
  for (let i = 0; i < 70; i++) { const r = 8 + hash(i + 3) * 4; circ(ctx, x - w / 2 + 12 + hash(i * 3 + 1) * (w - 24), y - h + 20 + hash(i * 7 + 2) * (h - 40), r, rgba(korrelCol, 0.55), rgba('#8FA0B5', 0.35), 1); }
  const soorten = [['grijs', '#B8C0CC', 1.25, 0], ['ins', KL_INS, 0.78, 1], ['oker', '#6E7A90', 0.45, 2]]; // snelheid: grijs snel, insuline midden, oker plakt lang
  soorten.forEach(([nm, col, v, j]) => { for (let i = 0; i < 9; i++) { const yy = y - h + 10 + (k * v * 1.35 - hash(i + j * 20) * 0.12) * h; if (yy < y - h + 6 || yy > y - 6) continue; const xx = x - w / 2 + 16 + hash(i * 11 + j) * (w - 32); circ(ctx, xx, yy, 10, col, nm === 'ins' ? C.goud : '#121A26', 1.5); } });
  ctx.restore(); // uitstroom onderaan
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40); ctx.stroke();
  if (toonUit > 0.01) { const inz = clamp((k - 0.68) * 8, 0, 1) * clamp((0.95 - k) * 8, 0, 1), gr = clamp((k - 0.48) * 10, 0, 1) * clamp((0.62 - k) * 10, 0, 1); if (inz > 0.01) circ(ctx, x, y + 58, 10, KL_INS, C.goud, 3); if (gr > 0.01) circ(ctx, x, y + 58, 10, '#B8C0CC', null); }
  if (label) naamBij(ctx, label, sub, x, y - h - 44, 1, 'center'); ctx.restore(); }
function zuiverMeter(ctx, x, y, w, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 36, 10); shape(ctx, '#2A3A58', '#8FA0B5', 2); roundRect(ctx, x + 4, y + 4, (w - 8) * frac, 28, 8); shape(ctx, C.groen, null);
  text(ctx, Math.round(frac * 1000) / 10 >= 99 ? 'ruim 99 % zuiver' : Math.round(frac * 100) + ' %', x + w / 2, y + 27, fTekst(28, 700), '#121A26', 'center'); ctx.restore(); }

// ---------- eten ----------
function kaas(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-110, 0); ctx.lineTo(110, 0); ctx.lineTo(110, -70); ctx.lineTo(-30, -110); ctx.lineTo(-110, -70); ctx.closePath(); ctx.fillStyle = '#D9B865'; ctx.fill(); ctx.strokeStyle = '#F0D58A'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-110, -70); ctx.lineTo(110, -70); ctx.stroke(); [[-60, -35, 10], [20, -30, 14], [70, -45, 8], [-10, -50, 6]].forEach(([cx, cy, r]) => circ(ctx, cx, cy, r, '#B89A4E')); ctx.restore(); }
function bierglas(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-55, -180); ctx.lineTo(-42, 0); ctx.lineTo(42, 0); ctx.lineTo(55, -180); ctx.closePath(); ctx.fillStyle = rgba(C.fill, 0.4); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = C.oker; ctx.fillRect(-60, -150, 120, 150); ctx.fillStyle = '#EDE6D2'; ctx.fillRect(-60, -180, 120, 32); for (let i = 0; i < 14; i++) { const ph = (t * 0.5 + hash(i)) % 1; circ(ctx, (hash(i + 5) - 0.5) * 70, lerp(-6, -146, ph), 3, rgba('#F2F2EE', 0.6)); } ctx.restore();
  ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-55, -180); ctx.lineTo(-42, 0); ctx.lineTo(42, 0); ctx.lineTo(55, -180); ctx.stroke(); ctx.restore(); }
function schimmelVat(ctx, x, y, s = 1, o = {}) { // hoge airlift-toren (± 50 m); s = 1 → 640 hoog
  const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const w = 120, h = 640;
  roundRect(ctx, -w / 2, -h, w, h, 40); ctx.fillStyle = '#26344F'; ctx.fill(); ctx.save(); roundRect(ctx, -w / 2, -h, w, h, 40); ctx.clip(); ctx.fillStyle = rgba(KL_KWEEK, 0.85); ctx.fillRect(-w, -h * 0.9, 2 * w, h);
  ctx.strokeStyle = rgba('#DDEBF2', 0.55); ctx.lineWidth = 1.6; for (let i = 0; i < 22; i++) { const xx = (hash(i) - 0.5) * w * 0.8, yy = -h * 0.85 + hash(i + 3) * h * 0.8; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.bezierCurveTo(xx + 10, yy + 8, xx - 8, yy + 18, xx + 6, yy + 28); ctx.stroke(); }
  for (let i = 0; i < 30; i++) { const ph = (t * 0.25 + hash(i + 9)) % 1; circ(ctx, -20 + (hash(i + 2) - 0.5) * 30, lerp(-20, -h * 0.88, ph), 3 + 2 * hash(i), rgba('#CFE6F2', 0.7)); } ctx.restore();
  roundRect(ctx, -w / 2, -h, w, h, 40); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
function kaartje(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = C.goud, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(34, 700); w = Math.max(w, ctx.measureText(kop).width + 70); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#22324E', hl > 0.5 ? col : rgba(C.line, 0.6), hl > 0.5 ? 3 : 2);
  ctx.fillStyle = col; ctx.fillRect(x - w / 2 + 14, y - h / 2 + 14, 6, h - 28); text(ctx, kop, x - w / 2 + 36, y - h / 2 + 50, fTekst(34, 700), C.text, 'left'); if (sub) metaA(ctx, sub, x - w / 2 + 36, y - h / 2 + 86, 1, C.grain, 'left', 24); ctx.restore(); }
function fabriekIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -90, 180, 180, 18); shape(ctx, '#22324E', rgba(C.line, 0.6), 2);
  ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, 50); ctx.lineTo(-60, -10); ctx.lineTo(-25, 10); ctx.lineTo(-25, -10); ctx.lineTo(10, 10); ctx.lineTo(10, -40); ctx.lineTo(30, -40); ctx.lineTo(30, -10); ctx.lineTo(60, -10); ctx.lineTo(60, 50); ctx.closePath(); ctx.stroke(); ctx.restore(); }
function schoolIcoon(ctx, x, y, s = 1, a = 1, txt = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -90, 180, 180, 18); shape(ctx, '#22324E', rgba(C.line, 0.6), 2);
  ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(0, -45); ctx.lineTo(60, -10); ctx.closePath(); ctx.stroke(); ctx.strokeRect(-48, -10, 96, 60); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 26, -2); ctx.lineTo(i * 26, 42); ctx.stroke(); }
  if (txt) text(ctx, txt, 0, 78, fTekst(26, 700), C.goud, 'center'); ctx.restore(); }

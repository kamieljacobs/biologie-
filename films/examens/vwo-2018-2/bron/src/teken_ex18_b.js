// Examenbespreking vwo 2018-II — tekeningen deel b (s27–s43 eilandjes, s65–s69 waterstofgas, s86–s87 slot). 20 okt 2026.
// Alle namen met prefix b_ (gedeelde film, vier makers).
const b_CE = 'Nieuwe eilandjes voor de alvleesklier', b_CW = 'Biologische productie van waterstofgas', b_CN = 'Wat neem je mee?';
const b_BETA = '#E2B45C', b_BETAR = '#F2D08A', b_ALFA = '#7FC48F', b_TC = '#7FC48F', b_THY = '#E8A0B0', b_BLOED = '#B5574A', b_BLOEDL = '#D88A7E',
  b_GEL = '#5BA4C9', b_AS = '#8FB8E8', b_COMP = '#C9B8F0', b_PURPER = '#A070C8', b_CO2C = '#4A5160', b_O = '#E07A5F', b_NAD = '#5BA4C9', b_NADH = '#E0B64A';
const b_fa = (a) => clamp(a, 0, 1);
function b_A(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel voor één regel tekst/tag tegelijk: rij = [[tekst, tijd, kleur]]; oude weg, dan nieuwe
function b_wisselTag(ctx, t, rij, x, y, px = 32) { let k = -1; rij.forEach((r, i) => { if (t >= r[1]) k = i; }); if (k < 0) return; const u = clamp((t - rij[k][1]) / 0.7, 0, 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][2], 1 - u / 0.4, 'center', px); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][2], (u - 0.35) / 0.65, 'center', px); }

// ---------- kleine voorwerpen ----------
function b_glucosemeter(ctx, x, y, s = 1, val = '', a = 1, alarm = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.12);
  roundRect(ctx, -34, -58, 68, 100, 14); shape(ctx, '#3E4A63', '#AFC0D0', 2.5); roundRect(ctx, -24, -46, 48, 36, 6); shape(ctx, alarm > 0.5 ? rgba(C.koraal, 0.5) : '#18233A', null);
  if (val) text(ctx, val, 0, -20, fTekst(20, 800), alarm > 0.5 ? '#FFFFFF' : C.teal, 'center'); circ(ctx, 0, 14, 9, '#2A3446', '#8FA0B5', 2); roundRect(ctx, -6, 42, 12, 14, 3); shape(ctx, '#C9D2DE', null); ctx.restore(); }
function b_pen(ctx, x, y, s = 1, a = 1, ang = -0.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -70, -11, 120, 22, 10); shape(ctx, '#E6E1D3', '#9AA3B2', 2); roundRect(ctx, -20, -8, 34, 16, 4); shape(ctx, rgba(C.goud, 0.8), null); roundRect(ctx, 50, -6, 18, 12, 3); shape(ctx, '#9AA3B2', null);
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(68, 0); ctx.lineTo(86, 0); ctx.stroke(); roundRect(ctx, -84, -8, 16, 16, 4); shape(ctx, '#5BA4C9', null); ctx.restore(); }
function b_pomp(ctx, x, y, s = 1, a = 1, t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -46, -30, 92, 60, 12); shape(ctx, '#5B6B88', '#C9D2DE', 2.5); roundRect(ctx, -34, -20, 46, 26, 5); shape(ctx, '#18233A', null);
  text(ctx, 'U/h', -11, -1, fTekst(14, 700), C.teal, 'center'); circ(ctx, 28, -6, 8, '#3A4660', '#AFC0D0', 1.5); circ(ctx, 28, 14, 5, puls > 0.5 && (t * 2 % 1) < 0.5 ? C.goud : '#3A4660');
  ctx.restore(); }
function b_weegschaal(ctx, x, y, w, kg, a = 1, rood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 26, w, 34, 12); shape(ctx, '#C9D2DE', '#8FA0B5', 2);
  roundRect(ctx, x - 52, y - 72, 104, 40, 8); shape(ctx, '#18233A', '#8FA0B5', 2); text(ctx, kg.toFixed(1).replace('.', ',') + ' kg', x, y - 43, fTekst(24, 800), rood > 0.5 ? C.koraal : C.teal, 'center');
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 32); ctx.lineTo(x, y - 26); ctx.stroke(); ctx.restore(); }
function b_co2(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  circ(ctx, -15, 0, 9, b_O, lighten(b_O, 0.3), 1.5); circ(ctx, 15, 0, 9, b_O, lighten(b_O, 0.3), 1.5); circ(ctx, 0, 0, 11, '#6A7282', '#AFB6C2', 1.5); ctx.restore(); }
function b_h2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -7, 0, 8, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 7, 0, 8, '#E6EEF8', '#AFC0D0', 1.5); ctx.restore(); }
function b_insuline(ctx, x, y, r = 9, a = 1) { hormoonVorm(ctx, x, y, r, 'insuline', a); }
function b_antistof(ctx, x, y, s = 1, rot = 0, a = 1, col = b_AS) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-16, -20); ctx.moveTo(0, 0); ctx.lineTo(16, -20); ctx.stroke(); ctx.strokeStyle = lighten(col, 0.4); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-10, -6); ctx.lineTo(-20, -18); ctx.moveTo(10, -6); ctx.lineTo(20, -18); ctx.stroke(); ctx.restore(); }
function b_complement(ctx, x, y, s = 1, a = 1, col = b_COMP) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); for (const [dx, dy] of [[-8, 4], [8, 4], [0, -9]]) circ(ctx, dx, dy, 9, rgba(col, 0.85), lighten(col, 0.3), 1.5); ctx.restore(); }

// ---------- T-cel met receptoren (loodrecht op het membraan); vorm = vorm van het kommetje ----------
function b_receptorTip(ctx, k, vorm) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -9 * k);
  if (vorm === 'vierkant') { ctx.moveTo(-9 * k, -20 * k); ctx.lineTo(-9 * k, -9 * k); ctx.lineTo(9 * k, -9 * k); ctx.lineTo(9 * k, -20 * k); }
  else if (vorm === 'drie') { ctx.moveTo(-10 * k, -21 * k); ctx.lineTo(0, -9 * k); ctx.lineTo(10 * k, -21 * k); }
  else { ctx.moveTo(-10 * k, -20 * k); ctx.quadraticCurveTo(-10 * k, -8 * k, 0, -8 * k); ctx.quadraticCurveTo(10 * k, -8 * k, 10 * k, -20 * k); }
  ctx.stroke(); }
function b_tcel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, vorm = 'rond', gloed = 0, kapot = 0, seed = 3, col = b_TC } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.65 * kapot);
  // lymfocyt: ronde cel, grote kern, een paar Y-vormige receptoren loodrecht op het membraan
  if (gloed > 0.01) { const g = ctx.createRadialGradient(x, y, r, x, y, r * 2.1); g.addColorStop(0, rgba(o.gloedKl || col, 0.4 * gloed)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.fill(); }
  const k = Math.max(0.5, r / 50), n = 4, st = Math.max(12, r * 0.42), arm = Math.max(10, r * 0.34), rc = vorm === 'vierkant' ? C.goud : col;
  ctx.strokeStyle = rc; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(3, 4 * k);
  for (let i = 0; i < n; i++) { const an = -0.6 + i * 6.283 / n + seed * 0.35; ctx.save(); ctx.translate(x + Math.cos(an) * r * 0.97, y + Math.sin(an) * r * 0.95); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -st); ctx.moveTo(0, -st); ctx.lineTo(-arm * 0.8, -st - arm); ctx.moveTo(0, -st); ctx.lineTo(arm * 0.8, -st - arm); ctx.stroke();
    for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * arm * 0.8, -st - arm); ctx.scale(0.5 * k, 0.5 * k); b_receptorTip(ctx, 1, vorm); ctx.restore(); } ctx.restore(); }
  blob(ctx, x, y, r, r * 0.96, 0.03, seed, t); shape(ctx, rgba(col, 0.28 + 0.15 * gloed), col, 2.5);
  circ(ctx, x + r * 0.04, y, r * 0.66, rgba(C.kern, 0.75), C.kernR, 1.8);
  if (kapot > 0.01) { ctx.strokeStyle = rgba('#121A26', 0.8 * kapot); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - r * 0.5, y - r * 0.7); ctx.lineTo(x - r * 0.1, y); ctx.lineTo(x - r * 0.4, y + r * 0.7); ctx.stroke(); }
  ctx.restore(); }

// ---------- verbranding van waterstofgas: H2 + O2 -> vlam -> H2O (groot en centraal) ----------
function b_o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -9, 0, 10, '#E8806E', '#F2A898', 1.5); circ(ctx, 9, 0, 10, '#E8806E', '#F2A898', 1.5); ctx.restore(); }
function b_h2o(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -15, 14, 7, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 15, 14, 7, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 0, -2, 11, '#E8806E', '#F2A898', 1.5); ctx.restore(); }
function b_vlam(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  [[1, C.koraal, 0.75], [0.72, C.goud, 0.85], [0.42, '#FFF3C8', 0.95]].forEach(([k, col, al], i) => { const f = 1 + 0.08 * Math.sin(t * 9 + i * 2), w = 1 + 0.06 * Math.sin(t * 7 + i);
    ctx.beginPath(); ctx.moveTo(0, 70 * k); ctx.bezierCurveTo(-70 * k * w, 40 * k, -50 * k, -20 * k, -8 * k, -95 * k * f); ctx.bezierCurveTo(0, -50 * k, 14 * k, -50 * k, 24 * k, -30 * k); ctx.bezierCurveTo(60 * k, -10 * k, 70 * k * w, 40 * k, 0, 70 * k); ctx.closePath(); shape(ctx, rgba(col, al), null, 0); });
  ctx.restore(); }
function b_verbranding(ctx, t, cx, cy, o = {}) { const { a = 1, vb = 0, wa = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const e = ease(clamp(vb, 0, 1)); const hs = 3.4;
  for (let i = 0; i < 2; i++) { const w = wander(i + 90, t, 10, 0.6); b_h2(ctx, lerp(cx - 430, cx - 70, e) + w.x, lerp(cy - 80 + i * 160, cy - 20 + i * 40, e) + w.y, hs, 1 - wa); }
  { const w = wander(95, t, 10, 0.6); b_o2(ctx, lerp(cx + 430, cx + 70, e) + w.x, cy + w.y, hs, 1 - wa); }
  if (vb > 0.3) b_vlam(ctx, cx, cy - 20, 1.7 * clamp((vb - 0.3) / 0.5, 0, 1) * (1 - wa), t, 1 - wa);
  if (wa > 0.01) { b_h2o(ctx, cx - 120, cy, 3.2, wa); b_h2o(ctx, cx + 120, cy, 3.2, wa); }
  ctx.restore(); }

// ---------- alvleesklier en eilandje van Langerhans ----------
function b_alvleesklier(ctx, x, y, s = 1, a = 1, o = {}) { const { hl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, -10); ctx.bezierCurveTo(-200, -70, -110, -90, -70, -50); ctx.bezierCurveTo(-20, -30, 60, -46, 130, -40); ctx.bezierCurveTo(190, -36, 214, -10, 196, 8); ctx.bezierCurveTo(170, 30, 80, 14, 20, 26); ctx.bezierCurveTo(-40, 38, -80, 70, -130, 56); ctx.bezierCurveTo(-180, 44, -160, 20, -170, -10); ctx.closePath();
  shape(ctx, rgba('#D9A06A', 0.35), '#E2B88A', 3);
  ctx.save(); ctx.clip(); for (let i = 0; i < 40; i++) { const px = -170 + hash(i * 5) * 360, py = -60 + hash(i * 5 + 1) * 120; circ(ctx, px, py, 9 + 5 * hash(i * 5 + 2), rgba('#E2B88A', 0.16)); } ctx.restore();
  for (let i = 0; i < 7; i++) { const px = -120 + i * 45 + 10 * Math.sin(i * 3), py = -8 + 14 * Math.sin(i * 1.7); circ(ctx, px, py, 7, rgba(b_BETA, 0.85), b_BETAR, 1.5); }
  if (hl > 0.01) { const p = 1 + 0.08 * Math.sin(t * 4); circ(ctx, 15, -1, 22 * p, null, rgba(C.goud, hl), 4); }
  ctx.restore(); }
// eilandje (close-up in een cirkel): bètacellen (oker) en alfacellen (groen) rond een haarvat; insuline gaat het bloed in
// o: {ins 0..1, tc 0..1 (T-cellen vallen aan), kapot 0..1 (alle bètacellen weg), gluca 0..1 (alfacellen geven glucagon af)}
const b_EIL = (() => { const P = []; let i = 0; while (P.length < 22 && i < 400) { i++; const an = hash(i * 7 + 1) * 6.283, d = 0.18 + Math.sqrt(hash(i * 7 + 2)) * 0.62; const px = Math.cos(an) * d, py = Math.sin(an) * d * 0.9;
  const cy = 0.1 - px * 0.08; if (Math.abs(py - cy) < 0.14) continue; if (P.some(p => Math.hypot(p[0] - px, p[1] - py) < 0.2)) continue; P.push([px, py, P.length % 5 === 4 ? 'a' : 'b']); } return P; })();
function b_haarvatPunt(x, y, r, u) { const p0 = [x - r * 1.1, y + r * 0.2], p1 = [x - r * 0.3, y - r * 0.1], p2 = [x + r * 0.35, y + r * 0.25], p3 = [x + r * 1.1, y - r * 0.05]; const m = 1 - u;
  return [m * m * m * p0[0] + 3 * m * m * u * p1[0] + 3 * m * u * u * p2[0] + u * u * u * p3[0], m * m * m * p0[1] + 3 * m * m * u * p1[1] + 3 * m * u * u * p2[1] + u * u * u * p3[1]]; }
function b_eiland(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, tc = 0, kapot = 0, gluca = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#1C2638'; ctx.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4);
  for (let i = 0; i < 30; i++) { const px = x - r + hash(i * 9 + 3) * 2 * r, py = y - r + hash(i * 9 + 4) * 2 * r; circ(ctx, px, py, r * 0.09, rgba('#D9A06A', 0.08), rgba('#D9A06A', 0.18), 1); }
  blob(ctx, x, y, r * 0.86, r * 0.78, 0.05, 5, t); shape(ctx, rgba(b_BETA, 0.07), rgba(b_BETAR, 0.6), 2);
  // haarvat
  ctx.strokeStyle = rgba(b_BLOED, 0.55); ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const p = b_haarvatPunt(x, y, r, k / 30); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  for (let k = 0; k < 7; k++) { const u = (t * 0.12 + k / 7) % 1, p = b_haarvatPunt(x, y, r, u); ctx.beginPath(); ctx.ellipse(p[0], p[1], r * 0.045, r * 0.03, 0.3, 0, 6.283); ctx.fillStyle = b_BLOEDL; ctx.fill(); }
  // cellen
  b_EIL.forEach((c, i) => { const cx = x + c[0] * r, cy = y + c[1] * r, cr = r * 0.095; const isA = c[2] === 'a';
    let kp = 0; if (!isA) { const tgt = i % 3 === 0 ? clamp((tc - 0.55 - (i % 6) * 0.03) / 0.35, 0, 1) : 0; kp = Math.max(tgt, clamp(kapot * 1.3 - (i % 4) * 0.1, 0, 1)); }
    ctx.save(); ctx.globalAlpha *= 1 - 0.8 * kp; const col = isA ? b_ALFA : b_BETA, cr2 = cr * (1 - 0.35 * kp);
    ctx.beginPath(); for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283 + i; const rr = cr2 * (1 + 0.12 * Math.sin(k * 2.3 + i)); k ? ctx.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr) : ctx.moveTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr); } ctx.closePath();
    shape(ctx, rgba(col, 0.32 + (isA ? 0.3 * gluca : 0)), kp > 0.5 ? rgba('#8A8F9A', 0.8) : col, 2); circ(ctx, cx, cy, cr2 * 0.38, rgba(C.kern, 0.7), C.kernR, 1);
    if (kp > 0.3) for (let f = 0; f < 4; f++) circ(ctx, cx + Math.cos(f * 1.6 + i) * cr * (0.8 + kp), cy + Math.sin(f * 1.6 + i) * cr * (0.8 + kp), 3, rgba('#9AA3B2', kp));
    ctx.restore();
    // insuline: uit de bètacel naar het haarvat en mee met het bloed
    if (!isA && ins > 0.01 && kp < 0.9) for (let m = 0; m < 2; m++) { const ph = (t * 0.28 + hash(i * 3 + m * 11)) % 1; const uu = clamp((c[0] + 1.1) / 2.2, 0, 1); const hp = b_haarvatPunt(x, y, r, uu);
      let px, py; if (ph < 0.5) { const e = ease(ph / 0.5); px = lerp(cx, hp[0], e); py = lerp(cy, hp[1], e); } else { const hp2 = b_haarvatPunt(x, y, r, Math.min(1, uu + (ph - 0.5) * 0.9)); px = hp2[0]; py = hp2[1]; }
      b_insuline(ctx, px, py, r * 0.03, ins * (1 - kp) * Math.min(1, ph * 6)); }
    if (isA && gluca > 0.01) for (let m = 0; m < 2; m++) { const ph = (t * 0.3 + hash(i * 5 + m * 7)) % 1; const uu = clamp((c[0] + 1.1) / 2.2, 0, 1); const hp = b_haarvatPunt(x, y, r, Math.min(1, uu + ph * 0.5)); const e = ease(Math.min(1, ph * 2));
      hormoonVorm(ctx, lerp(cx, hp[0], e), lerp(cy, hp[1], e), r * 0.032, 'glucagon', gluca * Math.min(1, ph * 6), C.groen); }
  });
  // T-cellen die de bètacellen aanvallen
  if (tc > 0.01) { const doelen = b_EIL.map((c, i) => [c, i]).filter(([c, i]) => c[2] === 'b' && i % 3 === 0).slice(0, 4);
    doelen.forEach(([c, i], k) => { const an = Math.atan2(c[1], c[0]); const sx = x + Math.cos(an) * r * 1.35, sy = y + Math.sin(an) * r * 1.35; const ex = x + c[0] * r + Math.cos(an) * r * 0.16, ey = y + c[1] * r + Math.sin(an) * r * 0.16;
      const u = ease(clamp(tc * 1.6 - k * 0.12, 0, 1)); b_tcel(ctx, lerp(sx, ex, u), lerp(sy, ey, u), r * 0.11, t, { vorm: 'vierkant', seed: k + 2, gloed: clamp(tc * 2 - 1, 0, 1) }); }); }
  ctx.restore(); }
function b_zoomRing(ctx, x, y, r, a, fn, col = b_BETAR) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); fn(); ctx.restore(); circ(ctx, x, y, r, null, col, 3); ctx.restore(); }

// ---------- thymus ----------
function b_thymus(ctx, x, y, s = 1, a = 1, o = {}) { const { ins = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 8, -120); ctx.bezierCurveTo(sx * 70, -130, sx * 100, -40, sx * 92, 40); ctx.bezierCurveTo(sx * 86, 110, sx * 50, 140, sx * 10, 120); ctx.bezierCurveTo(sx * 0, 60, sx * 4, -40, sx * 8, -120); ctx.closePath(); shape(ctx, rgba(b_THY, 0.22), b_THY, 3);
    for (let k = 0; k < 6; k++) { const py = -90 + k * 38, px = sx * (40 + 14 * Math.sin(k * 1.9)); ctx.beginPath(); ctx.ellipse(px, py, 26, 17, 0.2 * sx, 0, 6.283); ctx.strokeStyle = rgba(b_THY, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
      if (ins > 0.01) { const ph = (t * 0.6 + k * 0.37 + (sx > 0 ? 0.5 : 0)) % 1; b_insuline(ctx, px + Math.cos(ph * 6.283) * 10, py + Math.sin(ph * 6.283) * 6, 6, ins * (0.5 + 0.5 * Math.sin(ph * 3.14))); } } }
  ctx.restore(); }
// thymuscel die lichaamseigen stukjes (hier insuline, goud) op het oppervlak laat zien: basis op de wand, loodrecht naar buiten
function b_thymusCel(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.95, 0.04, 7, t); shape(ctx, rgba(b_THY, 0.22), b_THY, 3); circ(ctx, x - r * 0.1, y + r * 0.05, r * 0.42, rgba(C.kern, 0.6), C.kernR, 1.5);
  for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.2, nx = Math.cos(an), ny = Math.sin(an); const bx = x + nx * r, by = y + ny * r * 0.95;
    ctx.save(); ctx.globalAlpha *= ins; ctx.strokeStyle = b_THY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + nx * 14, by + ny * 14); ctx.stroke();
    ctx.translate(bx + nx * 24, by + ny * 24); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -9, -9, 18, 18, 4); shape(ctx, rgba(C.goud, 0.9), lighten(C.goud, 0.3), 1.5); ctx.restore(); }
  ctx.restore(); }

// ---------- cellen en bloed ----------
// bloedvat: horizontale band met stromende rode bloedcellen
function b_bloedvat(ctx, x0, x1, y, h, t, a = 1, o = {}) { const { snel = 60, n = 10 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, x1 - x0, h, h / 2); shape(ctx, rgba(b_BLOED, 0.2), null); ctx.strokeStyle = rgba(b_BLOEDL, 0.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + h / 2, y - h / 2); ctx.lineTo(x1 - h / 2, y - h / 2); ctx.moveTo(x0 + h / 2, y + h / 2); ctx.lineTo(x1 - h / 2, y + h / 2); ctx.stroke();
  const L = x1 - x0 - h; for (let i = 0; i < n; i++) { const px = x0 + h / 2 + ((t * snel + hash(i * 3) * L) % L), py = y + (hash(i * 3 + 1) - 0.5) * h * 0.55; ctx.beginPath(); ctx.ellipse(px, py, h * 0.13, h * 0.08, 0.4 * Math.sin(i), 0, 6.283); ctx.fillStyle = rgba(b_BLOEDL, 0.75); ctx.fill(); }
  ctx.restore(); }
// lichaamscel met glucosetransporter, mitochondrion, vetdruppel en eiwitketen
// o: {ins (insulinereceptor bezet), opname 0..1, vet 0..1 (1=vol), eiwit 0..1 (1=heel), brand 0..1 (verbranding zichtbaar), honger 0..1}
function b_lichaamscel(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, opname = 1, vet = 1, eiwit = 1, brand = 0, honger = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.86, 0.03, 3, t); shape(ctx, rgba(HK.cel, 0.12), rgba(HK.cel, 0.9), 3); blob(ctx, x, y, r - 9, r * 0.86 - 9, 0.03, 3, t); ctx.strokeStyle = rgba(HK.cel, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
  for (let i = 0; i < 26; i++) { const an = hash(i * 13) * 6.283, d = Math.sqrt(hash(i * 13 + 1)) * r * 0.75; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.86, 2, rgba(HK.cel, 0.25)); }
  circ(ctx, x + r * 0.42, y + r * 0.22, r * 0.2, rgba(C.kern, 0.55), C.kernR, 1.5);
  mitochondrion(ctx, x - r * 0.05, y + r * 0.42, r * 0.42, -0.2, 1, 5, t);
  if (brand > 0.01) { for (let k = 0; k < 4; k++) { const ph = (t * 1.3 + k / 4) % 1; circ(ctx, x - r * 0.05 + (k - 1.5) * 16, y + r * 0.42 - 26 - ph * 30, 5 * (1 - ph), rgba(C.koraal, brand * (1 - ph))); } }
  // vetdruppel
  const vr = r * 0.2 * Math.sqrt(Math.max(0.05, vet)); circ(ctx, x - r * 0.45, y + r * 0.05, vr, rgba('#E8C66A', 0.55), '#F0D88A', 2);
  // eiwitketen (kralen); breekt bij afbraak
  for (let k = 0; k < 9; k++) { const brk = k >= Math.round(9 * eiwit); const px = x + r * 0.05 + k * r * 0.07 + (brk ? (k % 2 ? 8 : -6) * (1 - eiwit) * 3 : 0), py = y - r * 0.2 + Math.sin(k * 1.2) * r * 0.06 + (brk ? (k % 3 - 1) * 14 * (1 - eiwit) : 0);
    circ(ctx, px, py, r * 0.035, rgba(['#7FC48F', '#E07A5F', '#8C7BBF'][k % 3], brk ? 0.5 : 0.9), null); }
  // insulinereceptor + glucosekanaal bovenaan
  const kx = x - r * 0.15, ky = y - r * 0.86 + 4; roundRect(ctx, kx - 13, ky - 16, 26, 32, 6); shape(ctx, rgba(C.teal, 0.35 + 0.5 * opname), C.teal, 2);
  receptor(ctx, x + r * 0.32, y - r * 0.82, -Math.PI / 2 - 0.25, 'insuline', ins, 1, 0.9);
  if (honger > 0.01) { b_A(ctx, honger, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); blob(ctx, x, y, r + 12, r * 0.86 + 12, 0.03, 3, t); ctx.stroke(); ctx.setLineDash([]); }); }
  ctx.restore(); return { kanaal: { x: kx, y: ky } }; }

// ---------- ADH en nier ----------
// verzamelbuis (beige) naast een haarvat (rood); ADH zet waterkanaaltjes in; water stroomt terug naar het bloed
function b_verzamelbuis(ctx, x, y, h, t, o = {}) { const { a = 1, adh = 0, res = 0.2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const bx = x - 70, vx = x + 70; roundRect(ctx, bx - 38, y - h / 2, 76, h, 34); shape(ctx, rgba('#E6D8A8', 0.16), '#E6D8A8', 4);
  roundRect(ctx, vx - 26, y - h / 2, 52, h, 24); shape(ctx, rgba(b_BLOED, 0.25), b_BLOEDL, 3);
  for (let i = 0; i < 6; i++) { const py = y - h / 2 + 30 + ((t * 70 + i * h / 6) % (h - 60)); circ(ctx, bx + 6 * Math.sin(i * 2), py, 5, rgba(C.teal, 0.7)); }
  for (let i = 0; i < 5; i++) { const py = y + h / 2 - 30 - ((t * 60 + i * h / 5) % (h - 60)); ctx.beginPath(); ctx.ellipse(vx, py, 11, 7, 0.3, 0, 6.283); ctx.fillStyle = rgba(b_BLOEDL, 0.7); ctx.fill(); }
  // waterkanaaltjes in de wand
  for (let k = 0; k < 5; k++) { const py = y - h / 2 + 60 + k * (h - 120) / 4; const on = clamp(adh * 5 - k, 0, 1); roundRect(ctx, bx + 30, py - 9, 16, 18, 4); shape(ctx, rgba(C.teal, 0.2 + 0.7 * on), rgba(C.teal, 0.4 + 0.6 * on), 1.5);
    const n = Math.round(1 + res * 3); for (let m = 0; m < n; m++) { const ph = (t * 0.9 + m / n + k * 0.13) % 1; circ(ctx, lerp(bx + 10, vx - 14, ph), py + Math.sin(ph * 6) * 4, 5, rgba(C.teal, (0.2 + 0.8 * res) * Math.sin(ph * Math.PI))); } }
  ctx.restore(); }
function b_beker(ctx, x, y, w, h, niveau, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = h * clamp(niveau, 0, 1);
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.lineTo(x + w / 2, y - h); ctx.closePath(); ctx.fillStyle = rgba('#AFC0D0', 0.1); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#E6CF6A', 0.6); ctx.fillRect(x - w / 2, y - lh, w, lh); ctx.restore();
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 6, y - k * h / 4); ctx.lineTo(x - w / 2 + 22, y - k * h / 4); ctx.stroke(); }
  if (label) text(ctx, label, x, y + 36, fTekst(26, 700), C.text2, 'center'); ctx.restore(); }
// hersenen met hypothalamus en hypofyse (zijaanzicht, voorkant links)
function b_brein(ctx, x, y, s, a = 1, o = {}) { const { hyp = 0, t = 0 } = o; if (a <= 0.01) return; brein(ctx, x, y, s, a, {});
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const p = 1 + 0.1 * Math.sin(t * 5) * hyp;
  if (hyp > 0.01) { circ(ctx, 20, 92, 46 * p, rgba(C.goud, 0.18 * hyp)); }
  ctx.beginPath(); ctx.ellipse(20, 92, 30, 18, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.25 + 0.5 * hyp), C.goud, 3);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(20, 108); ctx.lineTo(24, 138); ctx.stroke(); circ(ctx, 26, 150, 16, rgba(C.goud, 0.4 + 0.4 * hyp), C.goud, 3);
  ctx.restore(); }

// ---------- afbeelding 1 (insulineactiviteit, uit pdf o-08) ----------
const b_AF1_SNEL = [[0, 2, 4.45, 0.88], [4.4, 7.25, 10.1, 0.63], [10.05, 12.3, 14.6, 1.0]];
const b_AF1_LANG = [[0, 7.9, 16.6, 0.37], [12, 18, 24, 0.30]];
function b_boog(ctx, X, Y, b, prog) { const [t0, tp, t1, hp] = b; const N = 60; ctx.beginPath(); for (let k = 0; k <= N; k++) { const tt = t0 + (t1 - t0) * k / N * prog; const v = tt <= tp ? hp * Math.sin(Math.PI / 2 * (tt - t0) / (tp - t0)) : hp * Math.sin(Math.PI / 2 * (t1 - tt) / (t1 - tp)); k ? ctx.lineTo(X(tt), Y(Math.max(0, v))) : ctx.moveTo(X(tt), Y(Math.max(0, v))); } ctx.stroke(); }
function b_afb1(ctx, x, y, w, h, o = {}) { const { a = 1, snel = 1, lang = 1, ax = 1, hl = -1 } = o;
  const gx = x + 90, gw = w - 140, base = y + h - 170, top = y + 80; const X = (hr) => gx + gw * hr / 24, Y = (v) => base - (base - top) * v;
  if (a <= 0.01) return { X, Y }; ctx.save(); ctx.globalAlpha *= a; // ook onzichtbaar de assen teruggeven (anders crasht s34 vóór 'snelwerkende')
  ctx.save(); ctx.globalAlpha *= ax; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, top - 10); ctx.lineTo(gx, base); ctx.lineTo(gx + gw, base); ctx.stroke();
  metaText(ctx, 'insulineactiviteit', gx + gw, top - 30, C.text2, 'right', 18);
  ['08:00', '12:00', '16:00', '20:00', '24:00', '04:00', '08:00'].forEach((s, i) => { ctx.beginPath(); ctx.moveTo(X(i * 4), base); ctx.lineTo(X(i * 4), base + 8); ctx.stroke(); text(ctx, s, X(i * 4), base + 36, fTekst(24, 600), C.text2, 'center'); });
  metaText(ctx, 'tijdstip →', gx + gw, base + 72, C.text2, 'right', 18);
  text(ctx, 'ontbijt', X(0), base + 140, fTekst(22, 600), C.text2, 'center'); text(ctx, 'lunch', X(4.33), base + 140, fTekst(22, 600), C.text2, 'center'); text(ctx, 'avondeten', X(10), base + 140, fTekst(22, 600), C.text2, 'center'); ctx.restore();
  // injectiepijltjes: doorgetrokken = snelwerkend (goud), gestippeld = langzaam werkend (teal)
  [0, 4.33, 10].forEach((hr, i) => { const pa = clamp(snel * 4 - i * 0.6, 0, 1); b_A(ctx, pa, () => pijl(ctx, X(hr), base + 108, X(hr), base + 52, C.goud, 1, 3, 12)); });
  [0, 12].forEach((hr, i) => { const pa = clamp(lang * 3 - i * 0.6, 0, 1); const xx = X(hr) + (hr === 0 ? 16 : 0); b_A(ctx, pa, () => { ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, base + 108); ctx.lineTo(xx, base + 60); ctx.stroke(); ctx.restore(); pijl(ctx, xx, base + 62, xx, base + 52, C.teal, 1, 3, 12); }); });
  ctx.lineCap = 'round'; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; b_AF1_SNEL.forEach((b, i) => { const p = clamp(snel * 3 - i, 0, 1); if (p > 0.001) { ctx.save(); if (hl >= 0 && hl !== i) ctx.globalAlpha *= 0.35; b_boog(ctx, X, Y, b, p); ctx.restore(); } });
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4.5; ctx.setLineDash([14, 10]); b_AF1_LANG.forEach((b, i) => { const p = clamp(lang * 2 - i, 0, 1); if (p > 0.001) b_boog(ctx, X, Y, b, p); }); ctx.setLineDash([]);
  ctx.restore(); return { X, Y, base, top }; }
// schets bloedglucose over 24 uur (geen examenfiguur): overdag schommelend, 's nachts te laag, vroeg in de ochtend stijgend
function b_glucWaarde(hr) { const pts = [[0, 6.5], [2, 9], [4.4, 6.2], [6.5, 8.6], [10, 6], [12, 8.5], [15, 6], [17.5, 4.2], [19, 3.6], [21, 4.6], [24, 7.6]]; for (let i = 1; i < pts.length; i++) if (hr <= pts[i][0]) { const [a0, b0] = pts[i - 1], [a1, b1] = pts[i]; const u = (hr - a0) / (a1 - a0); return lerp(b0, b1, (1 - Math.cos(u * Math.PI)) / 2); } return 7.6; }
function b_glucSchets(ctx, X, y, h, prog, o = {}) { const { a = 1, laag = 0, stijg = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Y = (v) => y + h - h * (v - 2) / 9;
  ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fillRect(X(16), y - 10, X(23) - X(16), h + 20);
  ctx.strokeStyle = rgba(C.groen, 0.5); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(4)); ctx.lineTo(X(24), Y(4)); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.beginPath(); const N = 120; for (let k = 0; k <= N * prog; k++) { const hr = 24 * k / N; k ? ctx.lineTo(X(hr), Y(b_glucWaarde(hr))) : ctx.moveTo(X(hr), Y(b_glucWaarde(hr))); } ctx.stroke();
  if (laag > 0.01) { circ(ctx, X(19), Y(3.6), 22, null, rgba(C.teal, laag), 4); }
  if (stijg > 0.01) { ctx.save(); ctx.globalAlpha *= stijg; pijl(ctx, X(21.2), Y(4.2), X(23.6), Y(7.6) - 6, C.goud, 1, 5, 18); ctx.restore(); }
  metaText(ctx, 'bloedglucose (schets)', X(0), y - 18, C.text2, 'left', 18); ctx.restore(); return Y; }
function b_maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0.6, 5.7); ctx.arc(x + r * 0.45, y - r * 0.15, r * 0.8, 5.2, 1.1, true); ctx.closePath(); ctx.fillStyle = '#E6E1D3'; ctx.fill(); ctx.restore(); }

// ---------- afbeelding 2 (insulinepompje, uit pdf o-09) ----------
// afgifte in pdf-pixels boven de nul (19 = basaal), tijden in uren na 08:00
const b_AF2_STAP = [[-0.2, 38], [0.22, 157], [0.55, 19], [4.03, 113], [4.28, 19], [10.07, 58], [12.0, 19], [18.85, 38], [24, 38]];
const b_AF2_GLUC = [[0, 5.0], [0.9, 6.9], [1.85, 8.6], [2.8, 7.4], [4.0, 6.3], [5.2, 7.4], [6.35, 7.9], [8.15, 7.4], [10.1, 6.4], [11.2, 7.8], [12.15, 8.8], [13.4, 8.2], [14.8, 7.1], [17, 5.5], [20.3, 5.05], [24, 5.0]];
function b_afgifte(hr) { let v = 38; for (const [h0, val] of b_AF2_STAP) if (hr >= h0) v = val; return v; }
// o: lijn 0..1 (afgiftelijn van links naar rechts), bolus 0..1 (hoogte maaltijdbolussen), gluc 0..1, onder (alpha onderste grafiek), dimTop/dimBot,
//    hlL/hlA (oppervlak lunch/avondeten), hlN (basaalverhoging vanaf 03:00), lijn10, ochtend, maat (hoogte × tijd)
function b_afb2(ctx, x, y, w, o = {}) { const { a = 1, lijn = 1, bolus = 1, gluc = 1, onder = 1, hlL = 0, hlA = 0, hlN = 0, lijn10 = 0, ochtend = 0, maat = 0, dimTop = 0, dimBot = 0, t = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const gx = x + 96, gw = w - 130, X = (hr) => gx + gw * clamp(hr, -0.2, 24) / 24;
  const t0 = y + 40, t1 = y + 210, Yt = (v) => t1 - (t1 - t0) * v / 165;
  const b0 = y + 310, b1 = y + 570, Yb = (v) => b1 - (b1 - b0) * v / 20;
  const av = (hr) => { const v = b_afgifte(hr); return (hr > 0.1 && hr < 18.8 && v > 19) ? 19 + (v - 19) * bolus : v; };
  // bovenste grafiek
  ctx.save(); ctx.globalAlpha *= 1 - 0.65 * dimTop; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, t0 - 6); ctx.lineTo(gx, t1 + 20); ctx.lineTo(gx + gw, t1 + 20); ctx.stroke();
  for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(X(i * 4), t1 + 20); ctx.lineTo(X(i * 4), t1 + 28); ctx.stroke(); }
  metaText(ctx, 'insuline-afgifte', gx + gw, t0 + 6, C.text2, 'right', 18);
  text(ctx, 'ontbijt', X(0.3), t1 + 56, fTekst(22, 600), C.text2, 'center'); text(ctx, 'lunch', X(4.15), t1 + 56, fTekst(22, 600), C.text2, 'center'); text(ctx, 'avondeten', X(11), t1 + 56, fTekst(22, 600), C.text2, 'center');
  const vlak = (h0, h1, col, u) => { if (u <= 0.01) return; const yy = Yt(av((h0 + h1) / 2)); ctx.save(); ctx.globalAlpha *= u; ctx.fillStyle = rgba(col, 0.5); ctx.fillRect(X(h0), yy, X(h1) - X(h0), t1 - yy); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(X(h0), yy, X(h1) - X(h0), t1 - yy); ctx.restore(); };
  vlak(4.03, 4.28, C.goud, hlL); vlak(10.07, 12.0, C.koraal, hlA);
  if (hlN > 0.01) { ctx.save(); ctx.globalAlpha *= hlN; ctx.fillStyle = rgba(C.teal, 0.3); ctx.fillRect(X(18.85), Yt(38), X(24) - X(18.85), t1 - Yt(38)); ctx.restore(); }
  if (lijn > 0.001) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineJoin = 'miter'; ctx.beginPath(); const hEnd = -0.2 + 24.2 * lijn; let py0 = null;
    for (let k = 0; k <= 968; k++) { const hr = -0.2 + 0.025 * k; if (hr > hEnd) break; const px = X(hr), py = Yt(av(hr)); if (py0 === null) ctx.moveTo(px, py); else if (py !== py0) { ctx.lineTo(px, py0); ctx.lineTo(px, py); } else ctx.lineTo(px, py); py0 = py; } ctx.stroke(); }
  if (hlN > 0.01) { const p = 1 + 0.08 * Math.sin(t * 4); circ(ctx, X(18.85), Yt(28), 24 * p, null, rgba(C.teal, hlN), 4); }
  if (maat > 0.01) { ctx.save(); ctx.globalAlpha *= maat; const xa = X(10.07), xb = X(12.0), ya = Yt(58); ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(xa, t1 + 6); ctx.lineTo(xb, t1 + 6); ctx.moveTo(xa, t1); ctx.lineTo(xa, t1 + 12); ctx.moveTo(xb, t1); ctx.lineTo(xb, t1 + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xb + 14, ya); ctx.lineTo(xb + 14, t1); ctx.moveTo(xb + 8, ya); ctx.lineTo(xb + 20, ya); ctx.moveTo(xb + 8, t1); ctx.lineTo(xb + 20, t1); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // onderste grafiek
  if (onder > 0.01) { ctx.save(); ctx.globalAlpha *= onder * (1 - 0.65 * dimBot); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, b0 - 10); ctx.lineTo(gx, b1); ctx.lineTo(gx + gw, b1); ctx.stroke();
    [0, 5, 10, 15, 20].forEach(v => { ctx.beginPath(); ctx.moveTo(gx - 8, Yb(v)); ctx.lineTo(gx, Yb(v)); ctx.stroke(); text(ctx, String(v), gx - 16, Yb(v) + 8, fTekst(22, 600), C.text2, 'right'); });
    ['08:00', '12:00', '16:00', '20:00', '24:00', '04:00', '08:00'].forEach((s, i) => { ctx.beginPath(); ctx.moveTo(X(i * 4), b1); ctx.lineTo(X(i * 4), b1 + 8); ctx.stroke(); text(ctx, s, X(i * 4), b1 + 34, fTekst(22, 600), C.text2, 'center'); });
    metaText(ctx, 'bloedglucose (mmol/L)', gx + 18, b0 - 4, C.text2, 'left', 18);
    ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(gx, Yb(7.1)); ctx.lineTo(gx + gw, Yb(7.1)); ctx.stroke(); ctx.setLineDash([]);
    if (ochtend > 0.01) { ctx.save(); ctx.globalAlpha *= ochtend; ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(X(18.85), b0, X(24) - X(18.85), b1 - b0); ctx.restore(); }
    if (gluc > 0.001) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; const P = gladC(b_AF2_GLUC.map(([h, v]) => [X(h), Yb(v)])); const m = Math.max(2, Math.round(P.length * gluc));
      ctx.beginPath(); for (let k = 0; k < m; k++) k ? ctx.lineTo(P[k][0], P[k][1]) : ctx.moveTo(P[k][0], P[k][1]); ctx.stroke();
      if (ochtend > 0.01) { ctx.save(); ctx.globalAlpha *= ochtend; ctx.strokeStyle = C.groen; ctx.lineWidth = 7; ctx.beginPath(); let f = true; for (const p of P) if (p[0] >= X(18.85)) { f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); f = false; } ctx.stroke(); ctx.restore(); } }
    if (lijn10 > 0.01) { ctx.save(); ctx.globalAlpha *= lijn10; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.moveTo(gx, Yb(10)); ctx.lineTo(gx + gw, Yb(10)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '10', gx + gw + 8, Yb(10) + 8, fTekst(24, 800), C.koraal, 'left'); ctx.restore(); }
    ctx.restore(); }
  ctx.restore(); return { X, Yt, Yb, t0, t1, b0, b1, gx, gw }; }

// ---------- gelcapsule ('theezakje') ----------
function b_theezakje(ctx, x, y, w, h, t, o = {}) { const { a = 1, cellen = 1, porie = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rand = (yy, dir) => { for (let k = 0; k <= 14; k++) { const px = x - w / 2 + w * k / 14, py = yy + (k % 2 ? 9 : 0) * dir; k ? ctx.lineTo(px, py) : ctx.lineTo(px, py); } };
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); rand(y - h / 2, -1); ctx.lineTo(x + w / 2, y + h / 2); for (let k = 14; k >= 0; k--) { const px = x - w / 2 + w * k / 14, py = y + h / 2 + (k % 2 ? 9 : 0); ctx.lineTo(px, py); } ctx.closePath();
  shape(ctx, rgba(b_GEL, 0.2), rgba(b_GEL, 0.95), 3.5);
  ctx.save(); ctx.clip(); for (let i = 0; i < 70; i++) { const px = x - w / 2 + hash(i * 3 + 7) * w, py = y - h / 2 + hash(i * 3 + 8) * h; circ(ctx, px, py, 2.2 + porie * 2, rgba('#0D1420', 0.4)); } ctx.restore();
  if (cellen > 0.01) { for (let i = 0; i < 9; i++) { const cx = x - w * 0.3 + (i % 3) * w * 0.3 + Math.sin(i * 2.1) * w * 0.04, cy = y - h * 0.26 + Math.floor(i / 3) * h * 0.26 + Math.cos(i * 1.7) * h * 0.04, cr = Math.min(w, h) * 0.085;
    ctx.save(); ctx.globalAlpha *= clamp(cellen * 9 - i, 0, 1); circ(ctx, cx, cy, cr, rgba(b_BETA, 0.45), b_BETA, 2); circ(ctx, cx, cy, cr * 0.4, rgba(C.kern, 0.7), null); ctx.restore(); } }
  ctx.restore(); }
function b_stamcel(ctx, x, y, r, t, a = 1, diff = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = diff > 0.5 ? b_BETA : '#B8A8E0'; blob(ctx, x, y, r, r * 0.94, 0.05, 4, t); shape(ctx, rgba(col, 0.35), col, 2.5); circ(ctx, x, y, r * 0.48, rgba(C.kern, 0.7), C.kernR, 1.5);
  if (diff > 0.5) for (let k = 0; k < 5; k++) b_insuline(ctx, x + Math.cos(k * 1.3 + 0.5) * r * 0.72, y + Math.sin(k * 1.3 + 0.5) * r * 0.66, r * 0.09, (diff - 0.5) * 2); ctx.restore(); }
// huid in doorsnede: opperhuid, lederhuid, onderhuids vet
function b_huid(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const e = y + 50, d = y + 50 + h * 0.32;
  ctx.fillStyle = '#C99A78'; ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= 20; k++) ctx.lineTo(x + w * k / 20, y + Math.sin(k * 1.3) * 4); ctx.lineTo(x + w, e); ctx.lineTo(x, e); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#9C6E58'; ctx.fillRect(x, e, w, d - e); ctx.fillStyle = '#6E5444'; ctx.fillRect(x, d, w, y + h - d);
  ctx.save(); ctx.beginPath(); ctx.rect(x, d, w, y + h - d); ctx.clip(); for (let i = 0; i < 26; i++) { const px = x + (i % 9) * w / 8 + (Math.floor(i / 9) % 2) * w / 16, py = d + 40 + Math.floor(i / 9) * 70; ctx.beginPath(); ctx.ellipse(px, py, 46, 32, 0, 0, 6.283); shape(ctx, rgba('#F0D88A', 0.25), rgba('#F0D88A', 0.5), 1.5); } ctx.restore();
  ctx.strokeStyle = b_BLOEDL; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, d + 10); ctx.bezierCurveTo(x + w * 0.3, d - 20, x + w * 0.6, d + 30, x + w, d); ctx.stroke(); ctx.restore(); return { e, d }; }
// gelwand met poriën (verticaal); x = midden van de wand, ys = y-posities van de poriën
function b_gelWand(ctx, x, y0, y1, dik, ys, pr, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(b_GEL, 0.35); ctx.strokeStyle = b_GEL; ctx.lineWidth = 3; let yy = y0;
  const stukken = []; ys.forEach(py => { stukken.push([yy, py - pr]); yy = py + pr; }); stukken.push([yy, y1]);
  stukken.forEach(([a0, a1]) => { if (a1 - a0 < 2) return; roundRect(ctx, x - dik / 2, a0, dik, a1 - a0, 8); ctx.fill(); ctx.stroke(); });
  for (let i = 0; i < 40; i++) { const py = y0 + hash(i * 5) * (y1 - y0); if (ys.some(p => Math.abs(p - py) < pr + 6)) continue; circ(ctx, x - dik / 2 + 8 + hash(i * 5 + 1) * (dik - 16), py, 2.5, rgba('#0D1420', 0.45)); }
  ctx.restore(); }

// ---------- reactoren (afbeelding 1 van de waterstofcontext, uit pdf o-16) ----------
const b_RX = (px) => 170 + (px - 210) * 1.85, b_RY = (py) => 150 + (py - 680) * 1.75;
function b_rLijn(ctx, pts, col = C.line, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(b_RX(px), b_RY(py)) : ctx.moveTo(b_RX(px), b_RY(py))); ctx.stroke(); }
function b_pompje(ctx, px, py, dir, a = 1) { const x = b_RX(px), y = b_RY(py); circ(ctx, x, y, 21, '#1E2A40', C.line, 2.5); ctx.beginPath(); if (dir > 0) { ctx.moveTo(x, y - 11); ctx.lineTo(x + 10, y + 8); ctx.lineTo(x - 10, y + 8); } else { ctx.moveTo(x, y + 11); ctx.lineTo(x + 10, y - 8); ctx.lineTo(x - 10, y - 8); } ctx.closePath(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); }
function b_fles(ctx, x0, x1, nx0, nx1, a = 1) { ctx.beginPath(); ctx.moveTo(b_RX(nx0), b_RY(808)); ctx.lineTo(b_RX(nx0), b_RY(858)); ctx.lineTo(b_RX(x0), b_RY(886)); ctx.lineTo(b_RX(x0), b_RY(1040)); ctx.lineTo(b_RX(x1), b_RY(1040)); ctx.lineTo(b_RX(x1), b_RY(886)); ctx.lineTo(b_RX(nx1), b_RY(858)); ctx.lineTo(b_RX(nx1), b_RY(808)); ctx.strokeStyle = C.text2; ctx.lineWidth = 3.5; ctx.stroke(); }
function b_reactoren(ctx, t, o = {}) { const { a = 1, r1 = 1, r2 = 1, gas = 1, scheider = 1, bio = 1, licht = 1, pomp = 1, hl1 = 0, hl2 = 0, belT = 1, schil = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // vloeistof
  b_A(ctx, r1, () => { ctx.fillStyle = rgba('#8FA0B5', 0.22); ctx.fillRect(b_RX(427), b_RY(886), b_RX(569) - b_RX(427), b_RY(1040) - b_RY(886)); ctx.fillStyle = rgba(C.oker, 0.22); ctx.fillRect(b_RX(427), b_RY(997), b_RX(569) - b_RX(427), b_RY(1040) - b_RY(997));
    ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(b_RX(427), b_RY(997)); ctx.lineTo(b_RX(569), b_RY(997)); ctx.stroke(); ctx.setLineDash([]);
    b_fles(ctx, 427, 569, 452, 542); if (hl1 > 0.01) { ctx.save(); ctx.globalAlpha *= hl1; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.strokeRect(b_RX(427) - 10, b_RY(886) - 10, b_RX(569) - b_RX(427) + 20, b_RY(1040) - b_RY(886) + 20); ctx.restore(); }
    text(ctx, 'organische', b_RX(498), b_RY(935), fTekst(24, 600), C.text, 'center'); text(ctx, 'stoffen', b_RX(498), b_RY(955), fTekst(24, 600), C.text, 'center');
    pijl(ctx, b_RX(498), b_RY(962), b_RX(498), b_RY(992), C.text2, 1, 2.5, 10);
    text(ctx, 'organische zuren', b_RX(498), b_RY(1023), fTekst(22, 600), C.text, 'center');
    text(ctx, 'Reactor 1', b_RX(498), b_RY(1062), fTekst(26, 800), C.text, 'center');
    for (let i = 0; i < 9; i++) { const w = wander(i + 20, t, 18, 0.7); bacterie(ctx, b_RX(440 + (i % 3) * 45 + 10) + w.x, b_RY(900 + Math.floor(i / 3) * 34) + w.y, 0.45, i * 0.8 + Math.sin(t + i) * 0.3, 0.75, C.koraal); }
    if (schil > 0.01) for (let i = 0; i < 5; i++) { const ph = (t * 0.25 + i / 5) % 1; ctx.save(); ctx.globalAlpha *= schil * Math.min(1, (1 - ph) * 3); ctx.translate(b_RX(450) + Math.sin(i * 2) * 20, lerp(b_RY(905), b_RY(990), ph)); ctx.rotate(i + ph * 2); roundRect(ctx, -14, -5, 28, 10, 5); shape(ctx, '#B08A5C', '#D2B48C', 1.5); ctx.restore(); } });
  b_A(ctx, r2, () => { ctx.fillStyle = rgba('#8FA0B5', 0.22); ctx.fillRect(b_RX(614), b_RY(886), b_RX(757) - b_RX(614), b_RY(1040) - b_RY(886)); b_fles(ctx, 614, 757, 640, 732);
    if (hl2 > 0.01) { ctx.save(); ctx.globalAlpha *= hl2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.strokeRect(b_RX(614) - 10, b_RY(886) - 10, b_RX(757) - b_RX(614) + 20, b_RY(1040) - b_RY(886) + 20); ctx.restore(); }
    text(ctx, 'organische', b_RX(686), b_RY(970), fTekst(24, 600), C.text, 'center'); text(ctx, 'zuren', b_RX(686), b_RY(995), fTekst(24, 600), C.text, 'center');
    text(ctx, 'Reactor 2', b_RX(686), b_RY(1062), fTekst(26, 800), C.text, 'center');
    for (let i = 0; i < 9; i++) { const w = wander(i + 40, t, 18, 0.7); bacterie(ctx, b_RX(628 + (i % 3) * 50 + 10) + w.x, b_RY(905 + Math.floor(i / 3) * 44) + w.y + (i > 2 && i < 6 ? 30 : 0), 0.45, i * 0.9 + Math.sin(t + i) * 0.3, 0.75, b_PURPER); } });
  // gaskappen en leidingen
  b_A(ctx, gas, () => { for (const [cx, rr] of [[497, r1], [685, r2]]) { if (rr <= 0.01) continue; ctx.save(); ctx.globalAlpha *= rr; b_rLijn(ctx, [[cx, 750], [cx, 835]], C.line, 3); b_rLijn(ctx, [[cx - 14, 857], [cx, 835], [cx + 14, 857]], C.line, 3);
      text(ctx, 'H₂ + CO₂', b_RX(cx), b_RY(877), fTekst(24, 700), C.text, 'center'); pijl(ctx, b_RX(cx), b_RY(cx === 497 ? 925 : 950), b_RX(cx), b_RY(884), C.text2, 1, 2, 9);
      // belletjes die opstijgen naar de gasopvang
      for (let k = 0; k < 4; k++) { const ph = (t * 0.35 + k / 4 + (cx > 600 ? 0.5 : 0)) % 1; const py = lerp(b_RY(845), b_RY(752), ph); ctx.save(); ctx.globalAlpha *= rr * belT * Math.sin(ph * Math.PI); if (k % 2) b_h2(ctx, b_RX(cx) + 0, py, 0.7); else b_co2(ctx, b_RX(cx), py, 0.6); ctx.restore(); }
      for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5 + (cx > 600 ? 0.3 : 0)) % 1; circ(ctx, b_RX(cx - 30 + k * 15), lerp(b_RY(1030), b_RY(890), ph), 4, rgba('#E6EEF8', 0.6 * rr * belT * Math.sin(ph * Math.PI))); } ctx.restore(); }
    ctx.fillStyle = '#1E2A40'; ctx.fillRect(b_RX(465), b_RY(686), b_RX(723) - b_RX(465), b_RY(750) - b_RY(686)); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.strokeRect(b_RX(465), b_RY(686), b_RX(723) - b_RX(465), b_RY(750) - b_RY(686));
    text(ctx, 'GASOPVANG', b_RX(594), b_RY(725), fTekst(26, 600), C.text, 'center'); b_pompje(ctx, 497, 781, 1); b_A(ctx, r2, () => b_pompje(ctx, 685, 781, 1)); });
  b_A(ctx, scheider, () => { b_rLijn(ctx, [[723, 718], [791, 718]]); b_rLijn(ctx, [[803, 730], [803, 815]]); b_pompje(ctx, 803, 718, -1);
    ctx.fillStyle = '#1E2A40'; ctx.fillRect(b_RX(783), b_RY(815), b_RX(954) - b_RX(783), b_RY(855) - b_RY(815)); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.strokeRect(b_RX(783), b_RY(815), b_RX(954) - b_RX(783), b_RY(855) - b_RY(815));
    text(ctx, 'GASSCHEIDER', b_RX(868), b_RY(843), fTekst(24, 600), C.text, 'center'); pijl(ctx, b_RX(954), b_RY(834), b_RX(1003), b_RY(834), C.line, 1, 3, 12); pijl(ctx, b_RX(868), b_RY(855), b_RX(868), b_RY(893), C.line, 1, 3, 12);
    roundRect(ctx, b_RX(1005), b_RY(818), b_RX(1054) - b_RX(1005), b_RY(851) - b_RY(818), 4); shape(ctx, rgba(C.text2, 0.35), C.text2, 2); text(ctx, 'CO₂', b_RX(1030), b_RY(843), fTekst(24, 700), C.text, 'center');
    roundRect(ctx, b_RX(848), b_RY(895), b_RX(890) - b_RX(848), b_RY(928) - b_RY(895), 4); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); text(ctx, 'H₂', b_RX(869), b_RY(920), fTekst(24, 700), C.text, 'center'); });
  // biomassa
  b_A(ctx, bio, () => { roundRect(ctx, b_RX(219), b_RY(792), b_RX(323) - b_RX(219), b_RY(824) - b_RY(792), 4); shape(ctx, rgba('#B08A5C', 0.45), '#D2B48C', 2); text(ctx, 'biomassa', b_RX(271), b_RY(816), fTekst(24, 600), C.text, 'center');
    b_rLijn(ctx, [[323, 808], [450, 808], [450, 905]]); });
  // overloop van reactor 1 naar 2
  b_A(ctx, pomp, () => { b_rLijn(ctx, [[569, 1040], [592, 1040], [592, 808], [637, 808], [637, 905]]); b_pompje(ctx, 592, 948, 1);
    for (let k = 0; k < 4; k++) { const ph = (t * 0.22 + k / 4) % 1; const L = [[569, 1035], [592, 1035], [592, 808], [637, 808], [637, 900]].map(([px, py]) => [b_RX(px), b_RY(py)]); const p = padPunt(L, ph, false); circ(ctx, p[0], p[1], 5, rgba(C.oker, 0.85)); } });
  // licht
  b_A(ctx, licht, () => { ctx.save(); ctx.translate(b_RX(820), b_RY(980)); ctx.beginPath(); ctx.moveTo(-90, 6); ctx.lineTo(-40, -8); ctx.lineTo(-36, 2); ctx.lineTo(10, -12); ctx.lineTo(6, 0); ctx.lineTo(52, -8); ctx.lineTo(4, 12); ctx.lineTo(0, 2); ctx.lineTo(-44, 14); ctx.lineTo(-40, 4); ctx.closePath(); shape(ctx, rgba(C.goud, 0.55), C.goud, 2); ctx.restore();
    text(ctx, 'licht', b_RX(882), b_RY(988), fTekst(26, 600), C.text, 'left');
    for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; ctx.save(); ctx.globalAlpha *= 0.6 * Math.sin(ph * Math.PI); pijl(ctx, b_RX(770) - ph * 30, b_RY(960 + k * 22), b_RX(770) - ph * 30 - 30, b_RY(960 + k * 22), C.goud, 1, 2.5, 8); ctx.restore(); } });
  ctx.restore(); }

// ---------- aardappel, plantencel, polysachariden ----------
function b_aardappel(ctx, x, y, s = 1, a = 1, o = {}) { const { schil = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 130, 92, -0.15, 0, 6.283); shape(ctx, '#E8D49A', '#B08A5C', 10);
  for (const [px, py] of [[-60, -30], [40, -50], [70, 30], [-20, 50]]) { circ(ctx, px, py, 6, rgba('#8C5A3A', 0.6)); }
  if (schil > 0.01) { ctx.save(); ctx.globalAlpha *= schil; ctx.strokeStyle = '#B08A5C'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, -40); ctx.bezierCurveTo(190, -60, 230, 10, 200, 60); ctx.bezierCurveTo(180, 100, 240, 130, 270, 110); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function b_ketenRecht(ctx, x, y, n, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (n - 1) * r * 1.9, y); ctx.stroke(); for (let i = 0; i < n; i++) hexagon(ctx, x + i * r * 1.9, y, r, rgba(col, 0.45), col, 1.5, i % 2 ? Math.PI / 6 : 0); ctx.restore(); }
function b_ketenVertakt(ctx, x, y, r, col, a = 1, dicht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = r * 1.9, pts = [];
  for (let i = 0; i < 8; i++) pts.push([x + i * d, y + Math.sin(i * 0.9) * r * 0.6]);
  const tak = dicht ? [[1, -1], [3, 1], [4, -1], [6, 1], [2, 1]] : [[2, -1], [5, 1]]; for (const [bi, dir] of tak) for (let k = 1; k <= 3; k++) pts.push([x + bi * d + k * d * 0.55, y + dir * k * d * 0.8]);
  ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth = 2; ctx.beginPath(); pts.slice(0, 8).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); for (const p of pts) hexagon(ctx, p[0], p[1], r, rgba(col, 0.45), col, 1.5, 0); ctx.restore(); }
function b_plantcel(ctx, x, y, w, h, t, o = {}) { const { a = 1, wand = 0, zetmeel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 26); ctx.strokeStyle = wand > 0.5 ? C.groen : rgba(C.groen, 0.7); ctx.lineWidth = 18; ctx.stroke();
  ctx.save(); roundRect(ctx, x - w / 2 - 9, y - h / 2 - 9, w + 18, h + 18, 32); roundRect(ctx, x - w / 2 + 9, y - h / 2 + 9, w - 18, h - 18, 18); ctx.clip('evenodd'); ctx.strokeStyle = rgba('#DFF2D8', 0.35 + 0.4 * wand); ctx.lineWidth = 2;
  for (let k = -20; k < 40; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + k * 22, y - h / 2 - 10); ctx.lineTo(x - w / 2 + k * 22 - 160, y + h / 2 + 10); ctx.stroke(); } ctx.restore();
  if (wand > 0.01) { ctx.save(); ctx.globalAlpha *= wand * 0.5; roundRect(ctx, x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, 34); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  roundRect(ctx, x - w / 2 + 14, y - h / 2 + 14, w - 28, h - 28, 16); shape(ctx, rgba(HK.cel, 0.1), rgba(HK.cel, 0.6), 2);
  circ(ctx, x + w * 0.28, y - h * 0.22, h * 0.12, rgba(C.kern, 0.55), C.kernR, 1.5);
  for (let i = 0; i < 7; i++) { const cx = x - w * 0.3 + (i % 4) * w * 0.17, cy = y - h * 0.05 + Math.floor(i / 4) * h * 0.26 + Math.sin(i) * 10, rr = h * (0.08 + 0.02 * hash(i));
    ctx.beginPath(); ctx.ellipse(cx, cy, rr * 1.2, rr, i, 0, 6.283); shape(ctx, rgba('#F2EEDC', 0.45 + 0.4 * zetmeel), zetmeel > 0.5 ? '#FFFFFF' : '#D8D2BC', 2);
    ctx.beginPath(); ctx.ellipse(cx, cy, rr * 0.6, rr * 0.5, i, 0, 6.283); ctx.strokeStyle = rgba('#B8B09A', 0.7); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }

// ---------- NAD-kringloop ----------
function b_nadToken(ctx, x, y, s, plus, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(22 * s, 800); const lab = plus ? 'NAD⁺' : 'NADH'; const w = ctx.measureText(lab).width + 22 * s;
  roundRect(ctx, x - w / 2, y - 18 * s, w, 36 * s, 18 * s); shape(ctx, rgba(plus ? b_NAD : b_NADH, 0.3), plus ? b_NAD : b_NADH, 2.5); text(ctx, lab, x, y + 8 * s, fTekst(22 * s, 800), C.text, 'center'); ctx.restore(); }
function b_pyro(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 6 * s); ctx.lineTo(x, y - 6 * s); ctx.lineTo(x + 20 * s, y + 6 * s); ctx.stroke(); for (const [dx, dy] of [[-20, 6], [0, -6], [20, 6]]) circ(ctx, x + dx * s, y + dy * s, 7 * s, rgba(col, 0.6), col, 1.5); ctx.restore(); }
function b_hydrogenase(ctx, x, y, s = 1, a = 1, t = 0, act = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const r = 50 + 6 * Math.sin(an * 5 + 1) + (an > 5.6 || an < 0.7 ? -22 : 0); k ? ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.8) : ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r * 0.8); } ctx.closePath(); shape(ctx, rgba('#7A8BA8', 0.5), '#AFC0D0', 2.5);
  ctx.restore(); }

// ---------- leefwijze-raster ----------
function b_raster(ctx, x, y, w, h, o = {}) { const { a = 1, rij = 0, kol = 0, fotoK = 0, heteroK = 0, goed = 0, lab = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hx = x + 230, hy = y + 120, cw = (w - 230) / 2, ch = (h - 120) / 2;
  const cellen = [['chemo-autotroof', 'A', 0, 0], ['chemo-heterotroof', 'B', 0, 1], ['foto-autotroof', 'C', 1, 0], ['foto-heterotroof', 'D', 1, 1]];
  // koppen
  const kop = (s, sub, cx, cy, hl, wz) => { roundRect(ctx, cx - wz / 2, cy - 44, wz, 88, 14); shape(ctx, rgba(hl > 0.5 ? C.goud : EX.papier, hl > 0.5 ? 0.18 : 0.85), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2); text(ctx, s, cx, cy - 2, fTekst(32, 700), C.text, 'center'); metaText(ctx, sub, cx, cy + 28, C.text2, 'center', 16); };
  kop('auto', 'koolstof uit CO₂', hx + cw / 2, y + 56, kol, cw - 20); kop('hetero', 'koolstof uit org. stof', hx + cw * 1.5, y + 56, kol, cw - 20);
  kop('chemo', 'energie uit stoffen', x + 110, hy + ch / 2, rij, 210); kop('foto', 'energie uit licht', x + 110, hy + ch * 1.5, rij, 210);
  cellen.forEach(([s, L, r, k]) => { const cx = hx + k * cw, cy = hy + r * ch; const uit = (r === 0 ? fotoK : 0) + (k === 0 && r === 1 ? heteroK : 0); const isD = L === 'D';
    ctx.save(); ctx.globalAlpha *= 1 - 0.7 * clamp(uit, 0, 1); roundRect(ctx, cx + 10, cy + 10, cw - 20, ch - 20, 16); shape(ctx, rgba(isD && goed > 0.5 ? C.groen : EX.papier, isD && goed > 0.5 ? 0.18 : 0.75), isD && goed > 0.5 ? C.groen : EX.papierR, isD && goed > 0.5 ? 4 : 2);
    text(ctx, L, cx + 50, cy + 68, fTitel(44), isD && goed > 0.5 ? C.groen : C.goud, 'center'); text(ctx, s, cx + cw / 2 + 20, cy + ch / 2 + 12, fTekst(32, 600), C.text, 'center');
    if (uit > 0.01) { ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 40, cy + ch / 2 + 2); ctx.lineTo(cx + 40 + (cw - 80) * clamp(uit * 1.2, 0, 1), cy + ch / 2 + 2); ctx.stroke(); }
    if (isD && goed > 0.01) vink_(ctx, cx + cw - 50, cy + 52, 18, goed); ctx.restore(); });
  ctx.restore(); }

// ---------- kringloop: aardappelplant, lucht, fossiel ----------
function b_plant(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const [dx, hh] of [[-30, 170], [0, 210], [32, 160]]) { ctx.beginPath(); ctx.moveTo(dx * 0.3, 0); ctx.quadraticCurveTo(dx, -hh * 0.5, dx * 1.3, -hh); ctx.stroke();
    for (let k = 1; k <= 3; k++) { const ly = -hh * k / 3.4, lx = dx * (0.3 + 0.9 * k / 3.4); for (const side of [-1, 1]) { ctx.save(); ctx.translate(lx, ly); ctx.rotate(side * 0.9 + Math.sin(t + k) * 0.05); ctx.beginPath(); ctx.ellipse(side * 26, 0, 28, 13, 0, 0, 6.283); shape(ctx, rgba('#5FA86E', 0.75), '#8FD49C', 1.5); ctx.restore(); } } }
  ctx.strokeStyle = '#8C6A44'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-50, 50); ctx.moveTo(0, 0); ctx.lineTo(55, 46); ctx.moveTo(0, 0); ctx.lineTo(0, 60); ctx.stroke();
  for (const [px, py] of [[-58, 58], [62, 54], [0, 74]]) { ctx.beginPath(); ctx.ellipse(px, py, 30, 21, 0.3, 0, 6.283); shape(ctx, '#E8D49A', '#B08A5C', 4); }
  ctx.restore(); }
function b_olie(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < 4; k++) { ctx.fillStyle = ['#5A4636', '#4A3A2E', '#3E3128', '#33281F'][k]; ctx.fillRect(x, y + k * h / 4, w, h / 4 + 1); }
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h * 0.62, w * 0.3, h * 0.16, 0, 0, 6.283); shape(ctx, '#121212', '#3A3A3A', 2); ctx.restore(); }

// ---------- slot: examenboekje, atlas ----------
function b_boekje(ctx, x, y, s = 1, a = 1, ang = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -40, -54, 80, 108, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#2B3F66'; ctx.fillRect(-40, -54, 80, 22); ctx.fillStyle = '#9AA3B2'; for (let k = 0; k < 4; k++) ctx.fillRect(-28, -18 + k * 14, 56 - (k % 2) * 16, 5); ctx.restore(); }
function b_atlas(ctx, x, y, s = 1, a = 1, t = 0, open = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -330, -210, 660, 420, 18); shape(ctx, '#2B3F66', '#5B6B88', 4); for (const sx of [-1, 1]) { roundRect(ctx, sx > 0 ? 8 : -318, -196, 310, 392, 10); shape(ctx, '#F2EEE4', '#C9C2B0', 2); }
  ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(0, 200); ctx.stroke();
  text(ctx, 'EXAMENATLAS', -163, -150, fTekst(28, 800), '#2B3F66', 'center');
  for (let k = 0; k < 6; k++) { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(-280, -110 + k * 44, 120 - (k % 3) * 20, 8); const bw = (60 + 140 * hash(k * 7 + 1)) * open; ctx.fillStyle = rgba([C.teal, C.goud, C.koraal, C.groen, C.paars, C.oker][k], 0.85); ctx.fillRect(-140, -118 + k * 44, bw, 22); }
  for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const v = hash(r * 13 + c * 7 + 3); const on = clamp(open * 12 - (r + c) * 0.6, 0, 1); circ(ctx, 50 + c * 28, -140 + r * 44, 9, rgba([C.teal, C.goud, C.koraal][Math.floor(v * 3)], (0.25 + 0.7 * v) * on)); }
  ctx.restore(); }

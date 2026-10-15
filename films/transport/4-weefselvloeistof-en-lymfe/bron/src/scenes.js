// Transport 4 · Weefselvloeistof en lymfe — scènes per alinea.
// Kleuren: bloed TR.rijk/TR.arm, plasma en weefselvloeistof TR.plasma, lymfe TR.lymfe, goud = focus.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A211C', shirt: '#6E7891', trousers: '#34425A', hairStyle: 'curly' };
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const fade = (q, w1, w2, n1 = 1, n2 = 1) => q.on(w1, n1) * (1 - (w2 ? q.on(w2, n2) : 0));
const EIWIT = '#B08A5C'; // plasma-eiwit: donkere plasmatint (zelfde familie als TR.plasma)
const mixRood = (k) => { const A = [0xD9, 0x48, 0x3E], B = [0x8E, 0x3E, 0x46]; return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k, 0, 1))).toString(16).padStart(2, '0')).join(''); };
function pijl(ctx, x0, y0, x1, y1, col, a = 1, lw = 6) { if (a <= 0.01 || Math.hypot(x1 - x0, y1 - y0) < 4) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const an = Math.atan2(y1 - y0, x1 - x0), hl = lw * 3.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(an) * hl * 0.6, y1 - Math.sin(an) * hl * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(an - 0.5) * hl, y1 - Math.sin(an - 0.5) * hl); ctx.lineTo(x1 - Math.cos(an + 0.5) * hl, y1 - Math.sin(an + 0.5) * hl); ctx.closePath(); ctx.fill(); ctx.restore(); }
function druppel(ctx, x, y, r, a = 1, col = TR.plasma) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); if (col[0] === '#') shape(ctx, rgba(col, 0.85), lighten(col, 0.35), 1); else shape(ctx, col, null); ctx.restore(); }
function rbc(ctx, x, y, r, col, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.42, r * 0.22, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function eiwit(ctx, x, y, r = 6, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = EIWIT; ctx.strokeStyle = lighten(EIWIT, 0.4); ctx.lineWidth = 1;
  for (const [dx, dy] of [[-r * 1.4, 0], [0, -r * 0.6], [r * 1.4, 0]]) { ctx.beginPath(); ctx.arc(dx, dy, r, 0, 6.283); ctx.fill(); ctx.stroke(); } ctx.restore(); }
function weefselCel(ctx, x, y, rx, ry, seed, t, a = 1, hi = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, rx, ry, 0.05, seed, t * 0.6); shape(ctx, rgba(C.er, 0.10 + 0.08 * hi), hi > 0.01 ? C.goud : rgba(C.er, 0.75), 2);
  ctx.beginPath(); ctx.ellipse(x + rx * 0.12 * Math.sin(seed), y + ry * 0.08, Math.min(rx, ry) * 0.3, Math.min(rx, ry) * 0.26, 0, 0, 6.283); shape(ctx, rgba(C.kern, 0.75), C.kernR, 1.2); ctx.restore(); }

// ================= centrale simulatie: één haarvat tussen cellen (Micro) =================
// lokale coördinaten: haarvat langs y = 0 van x = -700 (begin, slagaderkant) tot 700 (eind, aderkant)
const HV = { R: 44, WALL: 12,
  top: [[-600, -225, 100, 76], [-370, -228, 98, 74], [-140, -222, 100, 76], [85, -226, 96, 74], [650, -224, 96, 76]],
  bot: [[-610, 226, 100, 74], [-380, 222, 98, 76], [-150, 228, 100, 74], [80, 224, 98, 76], [310, 226, 96, 74], [540, 222, 100, 76]],
  lymfX: 385, lymfTop: -370, lymfEnd: -150 };
function hvP(X, Y, s, lx, ly) { return [X + lx * s, Y + ly * s]; }
// o: { s, t, a, filt, res, lymf, lymfIn, tint, eiwit, uit, inw, bp(xn), trek, op (aantal opgehoopte druppels), lymfV (snelheid lymfe), rbc, cellenA, rand }
function haarvat(ctx, X, Y, o = {}) {
  const { s = 1, t = 0, a = 1, filt = 0, res = 0, lymf = 0, lymfIn = 0, tint = 1, eiwit: eiw = 1, uit = 0, inw = 0, bp = (xn) => 1 - 0.75 * xn, trek = 0.55, op = 0, lymfV = 1, cellenA = 1, wandHi = 0, hiBegin = 0, hiEind = 0, flowS = 1, rest = 0 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(X, Y); ctx.scale(s, s);
  const { R, WALL } = HV, out = R + WALL;
  const xL = -X / s - 10, xR = (W - X) / s + 10;
  // weefselvloeistof: lichte plasmatint over het hele weefsel
  if (tint > 0.01) { ctx.fillStyle = rgba(TR.plasma, 0.09 * tint); ctx.fillRect(xL, -360, xR - xL, 720); }
  // cellen
  [...HV.top, ...HV.bot].forEach((c, i) => weefselCel(ctx, c[0], c[1], c[2], c[3], i * 1.7 + 0.4, t, cellenA));
  // lymfevaatje (blind beginnend tussen de cellen)
  if (lymf > 0.01) { ctx.save(); ctx.globalAlpha *= lymf; const lx = HV.lymfX, w = 36;
    ctx.beginPath(); ctx.moveTo(lx - w, -380); ctx.lineTo(lx - w, HV.lymfEnd); ctx.arc(lx, HV.lymfEnd, w, Math.PI, 0, true); ctx.lineTo(lx + w, -380); shape(ctx, rgba(TR.lymfe, 0.20), TR.lymfe, 3);
    ctx.strokeStyle = TR.lymfe; ctx.lineWidth = 2; for (let yy = HV.lymfEnd - 10; yy > -360; yy -= 46) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(lx + sd * w, yy); ctx.lineTo(lx + sd * (w - 12), yy - 16); ctx.stroke(); }
    for (let k = 0; k < 7; k++) { const ph = (t * 0.12 * lymfV + k / 7) % 1; druppel(ctx, lx + Math.sin(k * 2.3) * 12, lerp(HV.lymfEnd + 10, -370, ph), 7, 0.9 * Math.min(1, ph * 6), TR.lymfe); }
    ctx.restore(); }
  // opgehoopte weefselvloeistof
  for (let i = 0; i < op; i++) { const sd = i % 2 ? -1 : 1; const xx = -680 + hash(i * 3 + 900) * 1360; const band = hash(i * 3 + 901);
    const yy = sd * (band < 0.6 ? out + 18 + band / 0.6 * 70 : 150 + (band - 0.6) / 0.4 * 170); const w2 = wander(i + 400, t, 6, 0.6); druppel(ctx, xx + w2.x, yy + w2.y, 7, Math.min(1, op - i)); }
  // vochtdeeltjes: filtratie aan het begin, resorptie aan het eind
  const K = 44;
  if (filt > 0.01) for (let k = 0; k < K; k++) { if (hash(k * 5 + 11) > filt) continue;
    const sd = k % 2 ? -1 : 1; const xs = -650 + hash(k * 7 + 1) * 470, xe = 170 + hash(k * 7 + 2) * 470; const hb = 0.5 + 0.5 * hash(k * 7 + 3);
    const toLymf = lymfIn > 0.01 && sd < 0 && hash(k * 7 + 4) < 0.45 * lymfIn; const terug = !toLymf && hash(k * 9 + 5) < res;
    const p = (t * 0.075 * flowS + hash(k * 13 + 7)) % 1; let x, y, al = 1;
    if (p < 0.12) { const u = p / 0.12; x = xs + 20 * u; y = sd * lerp(12, out + 22, u); }
    else if (p < 0.88 || !terug) { const u = clamp((p - 0.12) / 0.76, 0, 1);
      if (toLymf) { const lx = HV.lymfX; if (u < 0.75) { const v = u / 0.75; x = lerp(xs + 20, lx - 30, v); y = sd * (out + 22 + 70 * Math.sin(Math.PI * v * 0.8) * hb); } else { const v = (u - 0.75) / 0.25; x = lerp(lx - 30, lx, v); y = lerp(-(out + 22 + 70 * Math.sin(Math.PI * 0.8) * hb), HV.lymfEnd - 40 - 200 * v, ease(v)); al = 1 - ramp(v, 0.6, 0.4); } }
      else if (terug) { x = lerp(xs + 20, xe - 20, u); y = sd * (out + 22 + 70 * Math.sin(Math.PI * u) * hb); }
      else { const stop = 0.35 + 0.3 * hash(k * 3 + 77); const v = Math.min(u, stop); x = lerp(xs + 20, xe - 20, v); y = sd * (out + 22 + 70 * Math.sin(Math.PI * v) * hb); al = rest > 0.01 ? 1 - ramp(u, stop + 0.25, 0.3) * (1 - rest) : 1 - ramp(u, stop, 0.25); }
    } else { const u = (p - 0.88) / 0.12; x = lerp(xe - 20, xe, u); y = sd * lerp(out + 22, 12, u); }
    const w2 = wander(k + 300, t, 4, 1.2); druppel(ctx, x + w2.x, y + w2.y, 7, al * Math.min(1, p * 12), toLymf && p > 0.7 ? TR.lymfe : TR.plasma); }
  // haarvat: lumen + wand van platte cellen met spleetjes
  ctx.fillStyle = rgba(TR.rijk, 0.13); ctx.fillRect(xL, -R, xR - xL, 2 * R);
  for (const sd of [-1, 1]) { const y0 = sd < 0 ? -out : R; for (let x = xL - 60 + (sd < 0 ? 0 : 70); x < xR; x += 150) { roundRect(ctx, x + 4, y0, 142, WALL, 5); shape(ctx, rgba(C.er, 0.55), wandHi > 0.01 ? C.goud : C.er, 1.2); } }
  // bloed: rode bloedcellen en eiwitten stromen van links naar rechts
  for (let k = 0; k < 16; k++) { const span = xR - xL + 200; const x = xL - 100 + ((t * 110 * flowS + hash(k * 3 + 1) * span) % span); const y = (hash(k * 3 + 2) - 0.5) * 36;
    rbc(ctx, x, y, 22, mixRood((x + 700) / 1400), 1, Math.sin(t + k) * 0.3); }
  const ne = Math.round(14 * eiw); for (let k = 0; k < ne; k++) { const span = xR - xL + 200; const x = xL - 100 + ((t * 95 * flowS + hash(k * 5 + 40) * span) % span); const y = (hash(k * 5 + 41) - 0.5) * 60; eiwit(ctx, x, y, 5, 1, t * 0.8 + k); }
  // krachten: bloeddruk naar buiten (rood), trek van de eiwitten naar binnen (plasmatint)
  if (uit > 0.01 || inw > 0.01) for (const xn of [0.06, 0.28, 0.5, 0.72, 0.94]) { const x = -700 + 1400 * xn; const L1 = 110 * bp(xn), L2 = 110 * trek;
    pijl(ctx, x - 20, out + 6, x - 20, out + 6 + L1, TR.rijkL, uit, 9); pijl(ctx, x + 20, out + 6 + L2, x + 20, out + 6, lighten(TR.plasma, 0.15), inw, 9); }
  if (hiBegin > 0.01) { ctx.save(); ctx.globalAlpha *= hiBegin; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); roundRect(ctx, -720, -out - 14, 520, 2 * out + 28, 20); ctx.stroke(); ctx.restore(); }
  if (hiEind > 0.01) { ctx.save(); ctx.globalAlpha *= hiEind; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); roundRect(ctx, 200, -out - 14, 520, 2 * out + 28, 20); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function eindLabels(ctx, X, Y, s, a) { if (a <= 0.01) return; const y = Math.min(Y + 310 * s + 30, 818); metaText(ctx, 'begin · van het slagadertje', X - 700 * s, y, C.grain, 'left', 24); metaText(ctx, 'eind · naar het adertje', X + 700 * s, y, C.grain, 'right', 24); }

// ================= Macro: vliegtuig, luchthaven, benen =================
function cabine(ctx) { ctx.fillStyle = '#26344E'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2E3E5C'; ctx.fillRect(0, 90, W, 560);
  for (let i = 0; i < 5; i++) { const x = 200 + i * 380; roundRect(ctx, x, 200, 120, 170, 56); shape(ctx, '#1A2740', '#8FA0B5', 4); ctx.fillStyle = rgba('#B8C0D0', 0.25); roundRect(ctx, x + 18, 220, 84, 60, 30); ctx.fill(); }
  ctx.fillStyle = '#3A3F4F'; ctx.fillRect(0, 760, W, H - 760); ctx.strokeStyle = rgba('#000000', 0.2); ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 160, 760); ctx.lineTo(i * 160 - 120, H); ctx.stroke(); } }
function luchthaven(ctx, t) { ctx.fillStyle = '#26364F'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#1E2E4A'; ctx.fillRect(60, 110, W - 120, 470);
  ctx.fillStyle = '#4B5878'; ctx.beginPath(); ctx.ellipse(1250, 420, 520, 70, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(1700, 420); ctx.lineTo(1780, 250); ctx.lineTo(1830, 250); ctx.lineTo(1790, 420); ctx.fill(); ctx.beginPath(); ctx.moveTo(1150, 430); ctx.lineTo(1000, 540); ctx.lineTo(1080, 540); ctx.lineTo(1300, 440); ctx.fill();
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.strokeRect(60, 110, W - 120, 470); for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(60 + i * (W - 120) / 5, 110); ctx.lineTo(60 + i * (W - 120) / 5, 580); ctx.stroke(); }
  ctx.fillStyle = '#3A3F4F'; ctx.fillRect(0, 620, W, H - 620); ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 160, 620); ctx.lineTo(i * 160 - 160, H); ctx.stroke(); } }
// enkels: huidkleurige verdikking boven de schoen; sw 0..1 = zwelling
function enkels(ctx, x, footY, h, sw, a = 1) { if (a <= 0.01) return; const hh = h / 6.6, hipW = hh * 1.5; ctx.save(); ctx.globalAlpha *= a;
  for (const s2 of [-1, 1]) { const lx = x + s2 * hipW * 0.24 + s2 * hh * 0.03; ctx.beginPath(); ctx.ellipse(lx, footY - hh * 0.42, hh * 0.22 * (1 + 0.75 * sw), hh * 0.2 * (1 + 0.25 * sw), 0, 0, 6.283); shape(ctx, PERSON_LOOK.skin, lighten(PERSON_LOOK.skin, 0.2), 1.5);
    ctx.beginPath(); ctx.ellipse(lx + s2 * hh * 0.1, footY - hh * 0.14, hh * 0.42 * (1 + 0.15 * sw), hh * 0.18, 0, 0, 6.283); ctx.fillStyle = '#262C3A'; ctx.fill(); }
  ctx.restore(); }
// zittende passagier in vooraanzicht; geeft knie- en enkelposities terug
function passagier(ctx, x, floorY, h, o = {}) { const { sw = 0, t = 0, kuit = 0, ader = 0, aderV = 1 } = o; const hh = h / 6.6; const seatY = floorY - hh * 2.2; const yP = seatY + hh * 3.05;
  roundRect(ctx, x - hh * 1.7, seatY - hh * 4.6, hh * 3.4, hh * 4.9, hh * 0.5); shape(ctx, '#4A5878', '#6B7A98', 2); roundRect(ctx, x - hh * 1.0, seatY - hh * 4.9, hh * 2.0, hh * 0.9, hh * 0.3); shape(ctx, '#5B6B88', '#6B7A98', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, seatY + hh * 0.3); ctx.clip(); person(ctx, x, yP, h, 1, { armR: { a1: 0.25, a2: 1.1 }, armL: { a1: 0.25, a2: 1.1 } }); ctx.restore();
  roundRect(ctx, x - hh * 1.9, seatY + hh * 0.1, hh * 3.8, hh * 0.7, hh * 0.25); shape(ctx, '#4A5878', '#6B7A98', 2);
  const hipW = hh * 1.5; const legs = [];
  for (const s2 of [-1, 1]) { const lx = x + s2 * hipW * 0.3; roundRect(ctx, lx - hh * 0.36, seatY - hh * 0.2, hh * 0.72, hh * 0.9, hh * 0.3); ctx.fillStyle = PERSON_LOOK.trousers; ctx.fill();
    ctx.strokeStyle = PERSON_LOOK.trousers; ctx.lineWidth = hh * 0.62; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, seatY + hh * 0.5); ctx.lineTo(lx, floorY - hh * 0.5); ctx.stroke(); legs.push(lx); }
  for (const lx of legs) { if (kuit > 0.01) { ctx.save(); ctx.globalAlpha *= kuit; ctx.beginPath(); ctx.ellipse(lx, seatY + hh * 1.15, hh * 0.3, hh * 0.55, 0, 0, 6.283); shape(ctx, rgba(TR.spierR, 0.5), C.goud, 2.5); ctx.restore(); }
    if (ader > 0.01) { ctx.save(); ctx.globalAlpha *= ader; ctx.strokeStyle = TR.arm; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(lx + hh * 0.06, floorY - hh * 0.45); ctx.lineTo(lx + hh * 0.06, seatY + hh * 0.2); ctx.stroke();
      for (let k = 0; k < 4; k++) { const ph = (t * 0.25 * aderV + k / 4) % 1; ctx.fillStyle = TR.armL; ctx.beginPath(); ctx.arc(lx + hh * 0.06, lerp(floorY - hh * 0.5, seatY + hh * 0.25, ph), 6, 0, 6.283); ctx.fill(); } ctx.restore(); } }
  enkels(ctx, x - hipW * 0.06 * 0, floorY, h, sw); // enkels op de voeten
  return { seatY, legs, hh, ankle: [legs[1], floorY - hh * 0.42] };
}
// enkel en voet in zijaanzicht (Schema, groot); sw = zwelling; geeft drukpunt terug
function enkelGroot(ctx, sw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sk = PERSON_LOOK.skin;
  ctx.beginPath(); ctx.moveTo(640, 110); ctx.bezierCurveTo(650, 300, 660 - 40 * sw, 470, 640 - 60 * sw, 600); ctx.bezierCurveTo(620 - 60 * sw, 690, 640, 760, 720, 770); ctx.lineTo(1230, 772);
  ctx.bezierCurveTo(1290, 770, 1300, 712, 1250, 690); ctx.bezierCurveTo(1150, 655, 1010, 630, 935 + 30 * sw, 560); ctx.bezierCurveTo(900 + 60 * sw, 520, 880 + 45 * sw, 420, 860, 110); ctx.closePath(); shape(ctx, sk, lighten(sk, 0.25), 2.5);
  ctx.restore(); return [870 + 50 * sw, 430]; }

// ================= lichaam met lymfestelsel (Schema, vooraanzicht) =================
const SIL = { hoofd: [0, -405, 62], romp: [-112, -312, 224, 360],
  armen: [[[-118, -285], [-168, -80], [-182, 120]], [[118, -285], [168, -80], [182, 120]]], benen: [[[-55, 30], [-66, 300], [-72, 530]], [[55, 30], [66, 300], [72, 530]]] };
const LYMF = { benenR: [[-72, 510], [-64, 300], [-52, 60], [-20, -20], [12, -50]], benenL: [[72, 510], [64, 300], [52, 60], [28, -20], [12, -50]], darm: [[-70, -40], [-30, -60], [12, -50]],
  borstbuis: [[12, -50], [16, -150], [22, -240], [48, -282], [78, -284]], armL: [[182, 100], [168, -80], [130, -240], [78, -284]], armR: [[-182, 100], [-168, -80], [-130, -240], [-78, -284]],
  halsL: [[34, -360], [56, -305], [78, -284]], halsR: [[-34, -360], [-56, -305], [-78, -284]] };
const KNOPEN = [[40, -330, 'hals'], [-40, -330, 'hals'], [118, -232, 'oksel'], [-118, -232, 'oksel'], [46, 18, 'lies'], [-46, 18, 'lies'], [-28, -40, 'buik'], [16, -110, 'buik']];
function silhouet(ctx, X, Y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(X, Y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const parts = (pass) => { const lw = pass ? 0 : 8; ctx.beginPath(); ctx.arc(SIL.hoofd[0], SIL.hoofd[1], SIL.hoofd[2] + lw / 2, 0, 6.283); ctx.fill(); roundRect(ctx, -26 - lw / 2, -350, 52 + lw, 60, 10); ctx.fill(); roundRect(ctx, SIL.romp[0] - lw / 2, SIL.romp[1] - lw / 2, SIL.romp[2] + lw, SIL.romp[3] + lw, 60); ctx.fill();
    ctx.lineWidth = 62 + lw; for (const arm of SIL.armen) { ctx.beginPath(); arm.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); } ctx.lineWidth = 84 + lw; for (const b of SIL.benen) { ctx.beginPath(); b.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); } };
  ctx.fillStyle = rgba(C.mens, 0.7); ctx.strokeStyle = rgba(C.mens, 0.7); parts(0); ctx.fillStyle = C.fill; ctx.strokeStyle = C.fill; parts(1); ctx.restore(); }
function lymfLijn(ctx, X, Y, s, pts, u, a, col = TR.lymfe, lw = 7) { if (a <= 0.01 || u <= 0.01) return; const P = pts.map(p => [X + p[0] * s, Y + p[1] * s]); const D = padDeel(P, u); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); D.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); return P; }
// o: { a, groei (0..1), knopen, borstbuis (goud), stroom, t, ader, hart, dikHals, borstHi }
function lymfStelsel(ctx, X, Y, s, o = {}) { const { a = 1, groei = 1, knopen = 0, stroom = 0, t = 0, ader = 0, borstHi = 0, dikHals = 0, hartA = 0, rechts = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = (p) => [X + p[0] * s, Y + p[1] * s];
  if (ader > 0.01) { ctx.save(); ctx.globalAlpha *= ader; ctx.strokeStyle = TR.arm; ctx.lineWidth = 12 * s + 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); [P([160, -290]), P([78, -284]), P([0, -282]), P([-40, -270]), P([-38, -190])].forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.beginPath(); [P([-160, -290]), P([-78, -284]), P([-40, -270])].forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  if (hartA > 0.01) { const [hx, hy] = P([-20, -170]); const k = 1 + 0.08 * Math.exp(-((t * 1.2) % 1) * 6); const r = 34 * s * k; ctx.save(); ctx.globalAlpha *= hartA; ctx.beginPath(); ctx.moveTo(hx, hy + r * 0.9); ctx.bezierCurveTo(hx - r * 1.6, hy - r * 0.3, hx - r * 0.7, hy - r * 1.4, hx, hy - r * 0.45); ctx.bezierCurveTo(hx + r * 0.7, hy - r * 1.4, hx + r * 1.6, hy - r * 0.3, hx, hy + r * 0.9); ctx.closePath(); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 2); ctx.restore(); }
  const g = (d) => clamp(groei * 1.6 - d, 0, 1); // takken eerst, borstbuis later
  const takken = [[LYMF.benenR, 0], [LYMF.benenL, 0], [LYMF.armR, 0.1], [LYMF.armL, 0.1], [LYMF.halsR, 0.2], [LYMF.halsL, 0.2], [LYMF.darm, 0.25]];
  for (const [pts, d] of takken) { if (!rechts && pts[0][0] < 0 && pts !== LYMF.darm) continue; lymfLijn(ctx, X, Y, s, pts, g(d), 1, TR.lymfe, 6); }
  lymfLijn(ctx, X, Y, s, LYMF.borstbuis, g(0.6), 1, TR.lymfe, 10); if (borstHi > 0.01) lymfLijn(ctx, X, Y, s, LYMF.borstbuis, 1, borstHi, C.goud, 4);
  if (stroom > 0.01) { for (const [pts] of takken) { if (!rechts && pts[0][0] < 0 && pts !== LYMF.darm) continue; const D = gladC(pts.map(P)); particleFlow(ctx, D.filter((_, i) => i % 3 === 0), 4, t, 45, lighten(TR.lymfe, 0.35), 5, pts[0][0] + pts[0][1], stroom); }
    const D = gladC(LYMF.borstbuis.map(P)); particleFlow(ctx, D.filter((_, i) => i % 3 === 0), 6, t, 45, lighten(TR.lymfe, 0.35), 6, 99, stroom); }
  if (knopen > 0.01) for (const [kx, ky, w] of KNOPEN) { if (!rechts && kx < 0 && w !== 'buik') continue; const [px, py] = P([kx, ky]); const big = w === 'hals' ? 1 + 0.6 * dikHals : 1; ctx.save(); ctx.globalAlpha *= knopen; ctx.beginPath(); ctx.ellipse(px, py, 15 * s * big + 4, 10 * s * big + 3, 0.5, 0, 6.283); shape(ctx, lighten(TR.lymfe, 0.15), dikHals > 0.01 && w === 'hals' ? C.goud : '#E6E1D3', 2); ctx.restore(); }
  ctx.restore(); }

// ================= balansmodel: bak weefselvloeistof met één toevoer en twee afvoeren =================
function balansBak(ctx, x, y, w, h, o = {}) { const { a = 1, peil = 0.45, toe = 1, terug = 1, lymfe = 1, t = 0, labels = 1, hiToe = 0, hiTerug = 0, hiLymfe = 0, blok = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // toevoer (filtratie) linksboven
  ctx.strokeStyle = rgba(TR.rijk, 0.7); ctx.lineWidth = 26; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(x - 110, y - 50); ctx.lineTo(x + 50, y - 50); ctx.lineTo(x + 50, y - 10); ctx.stroke();
  const n1 = Math.round(10 * toe); for (let i = 0; i < n1; i++) { const ph = (t * 0.9 + i / Math.max(1, n1)) % 1; druppel(ctx, x + 50 + Math.sin(i * 2.1) * 6, lerp(y - 10, y + h - h * peil, ph), 8, 1); }
  // bak
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke();
  const ly = y + h - h * clamp(peil, 0, 1.05); ctx.fillStyle = rgba(TR.plasma, 0.32); ctx.fillRect(x + 2, ly, w - 4, y + h - ly - 2);
  ctx.strokeStyle = TR.plasma; ctx.lineWidth = 2; ctx.beginPath(); for (let px = x + 2; px <= x + w - 2; px += 6) { const py = ly + Math.sin(px * 0.04 + t * 2.5) * 3; px === x + 2 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  // afvoer 1: terug het haarvat in (onder), afvoer 2: lymfe (rechts)
  const pipe = (pts, col, k, hi) => { ctx.strokeStyle = hi > 0.01 ? C.goud : col; ctx.lineWidth = 22 + 4 * hi; ctx.lineCap = 'butt'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 22; ctx.stroke();
    const n = Math.round(6 * k); for (let i = 0; i < n; i++) { const ph = (t * 0.45 + i / Math.max(1, n)) % 1; const p = padPunt(pts, ph, false); druppel(ctx, p[0], p[1], 6, 1, col === TR.lymfe ? lighten(TR.lymfe, 0.3) : TR.plasma); } };
  pipe([[x + w * 0.3, y + h], [x + w * 0.3, y + h + 60], [x - 110, y + h + 60]], rgba(TR.rijk, 0.7), terug, hiTerug);
  pipe([[x + w, y + h - 40], [x + w + 140, y + h - 40], [x + w + 140, y + h - 200]], TR.lymfe, lymfe * (1 - blok), hiLymfe);
  if (blok > 0.01) { ctx.save(); ctx.globalAlpha *= blok; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; const bx = x + w + 140, by = y + h - 120; ctx.beginPath(); ctx.moveTo(bx - 26, by - 26); ctx.lineTo(bx + 26, by + 26); ctx.moveTo(bx + 26, by - 26); ctx.lineTo(bx - 26, by + 26); ctx.stroke(); ctx.restore(); }
  if (hiToe > 0.01) { ctx.save(); ctx.globalAlpha *= hiToe; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 110, y - 66); ctx.lineTo(x + 66, y - 66); ctx.lineTo(x + 66, y - 10); ctx.stroke(); ctx.restore(); }
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels; text(ctx, 'uit het haarvat', x - 110, y - 86, fTekst(30, 600), C.text, 'left'); text(ctx, 'terug het haarvat in', x - 110, y + h + 116, fTekst(30, 600), C.text, 'left'); text(ctx, 'lymfe', x + w + 140, y + h - 226, fTekst(30, 600), TR.lymfe, 'center'); metaText(ctx, 'weefselvloeistof', x + w / 2, y + h - 18, C.grain, 'center', 24); ctx.restore(); }
  ctx.restore(); }

// ================= scènes =================
const SCENES = {
  title(ctx, t) { ctx.save(); roundRect(ctx, 1060, 560, 780, 300, 24); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(1060, 560, 780, 300); haarvat(ctx, 1450, 710, { s: 0.42, t, filt: 1, res: 0.8, lymf: 1, lymfIn: 1, a: 1 }); ctx.restore(); ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; roundRect(ctx, 1060, 560, 780, 300, 24); ctx.stroke(); ctx.restore(); },

  s01(ctx, t, q) {
    const tB = q.at('uitstappen'), tC = q.at('Druk');
    if (t < tB) { cabine(ctx); passagier(ctx, 760, 900, 520, { t }); const u = clamp(t / Math.max(0.5, q.at('vliegtuig') + 0.6), 0, 1); klok(ctx, 1380, 420, 120, 10 * ease(u), 'tien uur', 1, C.goud); return; }
    if (t < tC) { luchthaven(ctx, t); const sw = ramp(t, q.at('enkels'), 1.4); person(ctx, 820, 880, 560, 1, {}); enkels(ctx, 820, 880, 560, sw);
      const zp = q.on('schoenen', 1); if (zp > 0.01) { ctx.save(); ctx.globalAlpha *= zp; roundRect(ctx, 1120, 150, 640, 560, 24); shape(ctx, C.bgSchema, C.goud, 1.5); ctx.beginPath(); roundRect(ctx, 1120, 150, 640, 560, 24); ctx.clip(); ctx.translate(1440, 450); ctx.scale(0.62, 0.62); ctx.translate(-960, -440); enkelGroot(ctx, sw, 1); ctx.restore(); metaText(ctx, 'je enkel · van opzij', 1440, 750, C.grain, 'center', 24 * 1); }
      tag(ctx, 'schoenen passen niet meer', 1440, 840, C.text2, zp * (1 - q.on('dik', 1))); tag(ctx, 'dikke enkels', 1440, 840, C.goud, q.on('dik', 1)); return; }
    bg(ctx, 'schema'); const sw = 1;
    const tP = q.at('Druk') + 0.3, tL = q.at('blijft') + 0.1; const inP = ramp(t, tP, 0.8) * (1 - ramp(t, tL, 0.6)); const P = enkelGroot(ctx, sw, 1);
    // putje blijft even staan na het loslaten
    const put = ramp(t, tP + 0.5, 0.5) * (1 - 0.6 * ramp(t, tL + 3, 3));
    if (put > 0.01) { ctx.save(); ctx.globalAlpha *= put; ctx.beginPath(); ctx.ellipse(P[0] - 14, P[1], 18, 28, 0, 0, 6.283); shape(ctx, '#7A5440', lighten('#7A5440', 0.2), 1.5); ctx.restore(); }
    // vinger
    const fx = P[0] + 6 - 26 * inP + 200 * (1 - ramp(t, tC - 0.2, 0.6)) + 160 * ramp(t, tL + 0.4, 0.8); ctx.save(); ctx.globalAlpha *= 1 - ramp(t, q.at('vocht') - 0.4, 0.5); roundRect(ctx, fx, P[1] - 32, 420, 64, 32); shape(ctx, SKINS[1], lighten(SKINS[1], 0.25), 2); roundRect(ctx, fx + 10, P[1] - 22, 40, 40, 12); shape(ctx, lighten(SKINS[1], 0.35), null); ctx.restore();
    label(ctx, 'putje', 'BLIJFT EVEN STAAN', P[0] - 14, P[1], 440, 300, q.on('putje', 1) * (1 - q.on('vocht', 1)), C.goud);
    const zv = q.on('vocht', 1); if (zv > 0.01) zoomCircle(ctx, 1440, 330, 220, P[0] - 14, P[1], 'onder de huid · schematisch', zv, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1200, 90, 480, 480); ctx.fillStyle = rgba(TR.plasma, 0.12); ctx.fillRect(1200, 90, 480, 480);
      for (let i = 0; i < 7; i++) weefselCel(ctx, 1260 + (i % 3) * 170 + (i > 2 ? 85 : 0), 200 + Math.floor(i / 3) * 150, 70, 54, i * 2.1, t, 1);
      for (let i = 0; i < 34; i++) { const w2 = wander(i + 50, t, 8, 0.8); druppel(ctx, 1230 + hash(i * 3 + 5) * 420 + w2.x, 130 + hash(i * 3 + 6) * 400 + w2.y, 8, ramp(t, q.at('vocht') + i * 0.03, 0.4)); } });
    tag(ctx, 'vocht dat er normaal niet zit', 1440, 650, TR.plasma, q.on('normaal', 1));
    vraagteken(ctx, 1440, 800, q.on('Waar', 1), 120);
  },

  s04(ctx, t, q) { bg(ctx, 'micro'); const X = 960, Y = 470, S = 1;
    const tint = q.on('vocht', 1); const filt = q.on('Weefselvloeistof', 2);
    haarvat(ctx, X, Y, { s: S, t, tint, filt, res: 0, hiBegin: q.on('begin', 1) * (1 - q.on('filtratie', 1) * 0.6), uit: q.on('duwt', 1), bp: (xn) => 1 - 0.75 * xn, inw: 0, cellenA: 1 });
    const g = (lx, ly) => hvP(X, Y, S, lx, ly);
    const p1 = g(-600, -225); label(ctx, 'cel', '', p1[0], p1[1] - 40, 200, 130, q.on('cellen', 1) * (1 - q.on('vocht', 1)), C.text);
    const p2 = g(300, 0); label(ctx, 'haarvat', '', p2[0], p2[1] - 20, 1560, 130, q.on('haarvat', 1) * (1 - q.on('Elke', 1)), C.text);
    const p3 = g(-260, -110); naamBij(ctx, 'weefselvloeistof', 'VOCHT TUSSEN DE CELLEN', p3[0], p3[1] + 5, q.on('weefselvloeistof', 1) * (1 - q.on('begin', 1)), 'center', TR.plasma);
    tag(ctx, 'elke cel baadt in weefselvloeistof', 960, 870, TR.plasma, q.on('baadt', 1) * (1 - q.on('Weefselvloeistof', 2)));
    tag(ctx, 'begin van het haarvat: bloeddruk nog hoog', 960, 870, TR.rijkL, q.on('bloeddruk', 1) * (1 - q.on('duwt', 1)));
    tag(ctx, 'water met kleine stoffen door de wand naar buiten', 960, 870, TR.plasma, q.on('duwt', 1) * (1 - q.on('filtratie', 1)));
    tag(ctx, 'filtratie', 960, 870, C.goud, q.on('filtratie', 1));
    eindLabels(ctx, X, Y, S, 1);
  },

  s05(ctx, t, q) { bg(ctx, 'micro'); haarvat(ctx, 960, 470, { t, tint: 1, filt: 1, res: 0, a: 0.55 }); vraagteken(ctx, 1330, 300, q.on('niet', 1), 150);
    tag(ctx, 'wat zit er níet in weefselvloeistof?', 960, 870, C.goud, q.on('Wat', 1)); },

  s07(ctx, t, q) { const tB = q.at('Weefselvloeistof');
    if (t < tB) { bg(ctx, 'micro'); // close-up van de wand met een spleet
      ctx.fillStyle = rgba(TR.rijk, 0.13); ctx.fillRect(0, 0, W, 420); ctx.fillStyle = rgba(TR.plasma, 0.10); ctx.fillRect(0, 470, W, 400);
      roundRect(ctx, 80, 420, 830, 50, 18); shape(ctx, rgba(C.er, 0.55), C.er, 2); roundRect(ctx, 1010, 420, 830, 50, 18); shape(ctx, rgba(C.er, 0.55), C.er, 2);
      metaText(ctx, 'in het haarvat', 100, 130, C.grain, 'left', 26); metaText(ctx, 'weefselvloeistof', 100, 560, C.grain, 'left', 26); metaText(ctx, 'spleetje in de wand', 1120, 400, C.grain, 'left', 24);
      for (let k = 0; k < 14; k++) { const ph = (t * 0.22 + hash(k * 3) ) % 1; const x0 = 960 + (hash(k * 3 + 1) - 0.5) * 700; const xx = lerp(x0, 960 + (hash(k) - 0.5) * 50, ease(clamp(ph * 2.2, 0, 1))); const yy = ph < 0.45 ? lerp(160 + hash(k * 3 + 2) * 200, 400, ph / 0.45) : lerp(400, 820, (ph - 0.45) / 0.55); const xx2 = ph < 0.45 ? xx : lerp(960 + (hash(k) - 0.5) * 50, 960 + (hash(k * 5) - 0.5) * 900, (ph - 0.45) / 0.55); druppel(ctx, xx2, yy, 10, Math.min(1, ph * 8) * (1 - ramp(ph, 0.9, 0.1))); }
      // rode bloedcel botst tegen het spleetje
      const b1 = ((t - q.at('Rode') + 0.2) % 3.2 + 3.2) % 3.2; const by = 180 + 200 * Math.sin(Math.min(Math.PI, b1 / 3.2 * Math.PI)) * 0.98; rbc(ctx, 930, by, 70, TR.rijk, q.on('Rode', 1), 0);
      label(ctx, 'rode bloedcel', 'TE GROOT VOOR DE WAND', 860, by - 20, 420, 200, q.on('groot', 1), C.text);
      const b2 = ((t - q.at('plasma') + 0.2) % 2.8 + 2.8) % 2.8; const ey = 200 + 196 * Math.sin(Math.min(Math.PI, b2 / 2.8 * Math.PI)); eiwit(ctx, 1110, ey, 18, q.on('plasma', 1), t * 0.4);
      naamBij(ctx, 'plasma-eiwit', 'BLIJFT BINNEN', 1180, ey - 60, q.on('plasma', 1), 'left', C.text);
      tag(ctx, 'antwoord b: rode bloedcellen', 960, 870, C.goud, 1 - q.on('Rode', 1) * 0.0 - q.on('meeste', 1));
      tag(ctx, 'water en kleine stoffen gaan er wel door', 960, 870, TR.plasma, q.on('meeste', 1));
      return; }
    bg(ctx, 'schema');
    const col = (x, title, rb, ne, fl, a, sub) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 200, 200, 400, 480, 26); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); ctx.save(); roundRect(ctx, x - 194, 206, 388, 468, 22); ctx.clip(); ctx.fillStyle = rgba(TR.plasma, fl); ctx.fillRect(x - 200, 260, 400, 420);
        ctx.strokeStyle = TR.plasma; ctx.lineWidth = 2; ctx.beginPath(); for (let px = x - 196; px <= x + 196; px += 6) { const py = 260 + Math.sin(px * 0.04 + t * 2) * 4; px === x - 196 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
        for (let i = 0; i < rb; i++) { const w2 = wander(i + x, t, 10, 0.5); rbc(ctx, x - 150 + (i % 5) * 75 + w2.x, 330 + Math.floor(i / 5) * 62 + w2.y, 26, TR.rijk, 1, i); }
        for (let i = 0; i < ne; i++) { const w2 = wander(i + x + 60, t, 14, 0.5); eiwit(ctx, x - 140 + hash(i * 3 + x) * 280 + w2.x, 300 + hash(i * 3 + x + 1) * 340 + w2.y, 6, 1, i); }
        for (let i = 0; i < 16; i++) { const w2 = wander(i + x + 90, t, 12, 0.7); druppel(ctx, x - 170 + hash(i * 7 + x) * 340 + w2.x, 290 + hash(i * 7 + x + 2) * 360 + w2.y, 6, 0.8); } ctx.restore();
        text(ctx, title, x, 740, fTekst(40, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x, 786, C.grain, 'center', 24); ctx.restore(); };
    col(420, 'bloed', 25, 14, 0.30, 1, 'cellen + plasma'); col(960, 'plasma', 0, 14, 0.30, q.on('plasma', 2), 'zonder bloedcellen'); col(1500, 'weefselvloeistof', 0, Math.round(lerp(14, 2, q.on('minder', 1))), 0.18, 1, 'lijkt op plasma');
    const ne = q.on('geen', 1) * (1 - q.on('lijkt', 1)); if (ne > 0.01) { ctx.save(); ctx.globalAlpha *= ne; text(ctx, '≠', 960, 470, fTitel(150), C.goud, 'center'); ctx.restore(); }
    tag(ctx, 'geen gelekt bloed', 960, 160, C.goud, q.on('gelekt', 1) * (1 - q.on('plasma', 2)));
    tag(ctx, 'zonder rode bloedcellen', 1500, 160, C.goud, q.on('zonder', 1) * (1 - q.on('minder', 1)));
    tag(ctx, 'veel minder eiwitten', 1500, 160, C.goud, q.on('minder', 1));
    if (q.on('plasma', 2) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('plasma', 2); text(ctx, '≈', 1230, 470, fTitel(100), C.goud, 'center'); ctx.restore(); }
  },

  s08(ctx, t, q) { const tB = q.at('Zuurstof');
    if (t < tB - 0.3) { bg(ctx, 'micro'); // netwerk van haarvaten tussen de cellen
      const cells = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) cells.push([150 + c * 180 + (r % 2) * 90 + (hash(r * 10 + c) - 0.5) * 40, 160 + r * 160 + (hash(r * 10 + c + 77) - 0.5) * 30]);
      ctx.fillStyle = rgba(TR.plasma, 0.08); ctx.fillRect(0, 90, W, 790); cells.forEach((p, i) => weefselCel(ctx, p[0], p[1], 66, 52, i * 1.3, t, 1, 0));
      const net = [[[0, 470], [300, 430], [620, 250], [900, 220], [1240, 300], [1560, 240], [1920, 300]], [[0, 470], [380, 520], [700, 560], [1000, 470], [1340, 540], [1650, 500], [1920, 470]], [[300, 430], [520, 330], [760, 400], [1000, 470]], [[700, 560], [820, 720], [1140, 780], [1460, 700], [1920, 760]], [[1240, 300], [1400, 420], [1650, 500]], [[620, 250], [700, 120]], [[1140, 780], [1250, 870]]];
      net.forEach((pts, i) => { const D = gladC(pts); const u = ramp(t, i * 0.12, 0.9); ctx.save(); ctx.strokeStyle = TR.rijk; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); padDeel(pts, u).forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); if (u > 0.95) particleFlow(ctx, D.filter((_, j) => j % 4 === 0), 4, t, 60, TR.rijkL, 5, i * 7, 1); });
      // afstand cel – haarvat
      const c0 = [1050, 640]; const a1 = q.on('tiende', 1); if (a1 > 0.01) { let best = null, bd = 1e9; for (const pts of net) for (const p of gladC(pts)) { const d = Math.hypot(p[0] - c0[0], p[1] - c0[1]); if (d < bd) { bd = d; best = p; } }
        ctx.save(); ctx.globalAlpha *= a1; weefselCel(ctx, c0[0], c0[1], 66, 52, 4, t, 1, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(c0[0], c0[1]); ctx.lineTo(best[0], best[1]); ctx.stroke(); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(best[0], best[1], 7, 0, 6.283); ctx.fill(); ctx.restore();
        tag(ctx, 'hoogstens ≈ 0,1 mm', 1460, 870, C.goud, a1 * (1 - q.on('stukje', 1))); }
      tag(ctx, 'haarvaten lopen overal', 960, 870, C.goud, q.on('Haarvaten', 1) * (1 - q.on('tiende', 1)));
      tag(ctx, 'maar een heel klein stukje', 960, 870, C.goud, q.on('stukje', 1));
      metaText(ctx, 'schematisch · niet op schaal', W - 60, 120, C.text2, 'right', 24); return; }
    bg(ctx, 'micro'); // diffusie: haarvat onder, cel boven
    ctx.fillStyle = rgba(TR.plasma, 0.06); ctx.fillRect(0, 90, W, 560);
    ctx.fillStyle = rgba(TR.rijk, 0.13); ctx.fillRect(0, 670, W, 170); roundRect(ctx, -20, 650, W + 40, 20, 8); shape(ctx, rgba(C.er, 0.55), C.er, 1.5); roundRect(ctx, -20, 840, W + 40, 20, 8); shape(ctx, rgba(C.er, 0.55), C.er, 1.5);
    for (let k = 0; k < 10; k++) { const x = ((t * 120 + hash(k) * 2200) % 2200) - 140; rbc(ctx, x, 755 + (hash(k + 3) - 0.5) * 60, 30, mixRood(0.15 + 0.6 * (x / W)), 1, k); }
    weefselCel(ctx, 960, 270, 560, 150, 2, t, 1, 0);
    metaText(ctx, 'cel', 960, 150, C.grain, 'center', 26); metaText(ctx, 'haarvat', 120, 890 - 140, C.grain, 'left', 24); metaText(ctx, 'weefselvloeistof', 120, 560, C.grain, 'left', 24);
    const zA = q.on('Zuurstof', 1), cA = q.on('Koolstofdioxide', 1);
    for (let k = 0; k < 18; k++) { const ph = (t * 0.16 + hash(k * 4 + 1)) % 1; const x = 300 + hash(k * 4 + 2) * 1300; const y = lerp(760, 300, ph); const w2 = wander(k, t, 14, 0.9); const glu = k % 3 === 0;
      const al = zA * Math.min(1, ph * 6) * (1 - ramp(ph, 0.85, 0.15)); if (glu) { ctx.save(); ctx.globalAlpha *= al; hexagon(ctx, x + w2.x, y + w2.y, 13, rgba(C.oker, 0.6), C.oker, 1.5, 0); ctx.restore(); } else { ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.arc(x + w2.x, y + w2.y, 9, 0, 6.283); shape(ctx, C.teal, lighten(C.teal, 0.3), 1.2); ctx.restore(); } }
    for (let k = 0; k < 12; k++) { const ph = (t * 0.14 + hash(k * 4 + 9)) % 1; const x = 340 + hash(k * 4 + 10) * 1250; const y = lerp(300, 760, ph); const w2 = wander(k + 30, t, 14, 0.9); ctx.save(); ctx.globalAlpha *= cA * Math.min(1, ph * 6) * (1 - ramp(ph, 0.85, 0.15)); ctx.beginPath(); ctx.arc(x + w2.x, y + w2.y, 9, 0, 6.283); shape(ctx, C.line, lighten(C.line, 0.3), 1.2); ctx.restore(); }
    pijl(ctx, 1760, 700, 1760, 420, C.teal, zA * (1 - cA), 8); pijl(ctx, 1820, 420, 1820, 700, C.line, cA, 8);
    const lg = (x, y, sym, s1, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (sym === 'g') hexagon(ctx, x, y - 10, 13, rgba(C.oker, 0.6), C.oker, 1.5, 0); else { ctx.beginPath(); ctx.arc(x, y - 10, 10, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1.2); } text(ctx, s1, x + 26, y, fTekst(30, 600), C.text, 'left'); ctx.restore(); };
    lg(1380, 470, 'o', 'zuurstof', C.teal, zA * (1 - cA)); lg(1380, 520, 'g', 'glucose', C.oker, q.on('glucose', 1) * (1 - cA)); lg(1380, 470, 'o', 'koolstofdioxide, afval', C.line, cA);
    tag(ctx, 'diffusie: van veel naar weinig', 960, 610, C.goud, q.on('diffusie', 1) * (1 - cA));
    tag(ctx, 'de andere kant op: terug het bloed in', 960, 610, C.goud, q.on('kant', 1));
  },

  s09(ctx, t, q) { bg(ctx, 'micro'); const X = 960, Y = 450, S = 0.95;
    const res = q.on('meeste', 1), rest = q.on('niet', 1);
    const op = 30 * ramp(t, q.at('Elke'), 6);
    haarvat(ctx, X, Y, { s: S, t, tint: 1, filt: 1, res: res * (1 - 0.25 * rest), rest, uit: q.on('bloeddruk', 1), inw: q.on('trekken', 1), bp: (xn) => lerp(1, 1 - 0.8 * xn, q.on('zakt', 1)), trek: 0.55, op, hiEind: q.on('eind', 1) * (1 - q.on('resorptie', 1) * 0.6), hiBegin: 0 });
    const g = (lx, ly) => hvP(X, Y, S, lx, ly);
    const pE = g(-420, 20); label(ctx, 'plasma-eiwitten', 'TREKKEN WATER AAN', pE[0], pE[1], 640, 112, q.on('eiwitten', 1) * (1 - q.on('eind', 1)), C.text);
    // legenda krachten
    const lA = q.on('trekken', 1) * (1 - q.on('Maar', 1)); if (q.on('bloeddruk', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('bloeddruk', 1) * (1 - q.on('Maar', 1)); pijl(ctx, 1110, 92, 1110, 142, TR.rijkL, 1, 8); text(ctx, 'bloeddruk: duwt eruit', 1136, 132, fTekst(30, 600), C.text, 'left'); ctx.restore(); }
    if (lA > 0.01) { ctx.save(); ctx.globalAlpha *= lA; pijl(ctx, 1480, 142, 1480, 92, lighten(TR.plasma, 0.15), 1, 8); text(ctx, 'eiwitten: trekken water aan', 1506, 132, fTekst(30, 600), C.text, 'left'); ctx.restore(); }
    tag(ctx, 'langs het haarvat zakt de bloeddruk', 960, 870, TR.rijkL, q.on('zakt', 1) * (1 - q.on('eiwitten', 1)));
    tag(ctx, 'aan het eind wint de trek van de eiwitten', 960, 870, C.goud, q.on('wint', 1) * (1 - q.on('resorptie', 1)));
    tag(ctx, 'resorptie: het meeste komt terug', 960, 870, C.goud, q.on('resorptie', 1) * (1 - q.on('Maar', 1)));
    tag(ctx, 'een paar liter per dag blijft achter', 960, 870, TR.plasma, q.on('liter', 1) * (1 - q.on('dikker', 1)));
    tag(ctx, 'dan zou je weefsel steeds dikker worden', 960, 870, C.goud, q.on('dikker', 1));
    eindLabels(ctx, X, Y, S, 1);
  },

  s10(ctx, t, q) { const tB = q.at('lymfevaten', 2) - 0.2;
    if (t < tB) { bg(ctx, 'micro'); const X = 960, Y = 450, S = 0.95; const ly = q.on('Tussen', 1); const lin = q.on('erin', 1);
      haarvat(ctx, X, Y, { s: S, t, tint: 1, filt: 1, res: 0.75, lymf: ly, lymfIn: lin, op: 30 * (1 - ramp(t, q.at('erin'), 2.5)), rest: 1 - lin });
      const g = (lx, ly2) => hvP(X, Y, S, lx, ly2); const pl = g(HV.lymfX + 36, -200);
      label(ctx, 'lymfevat', 'BEGINT DOODLOPEND', pl[0] - 36, pl[1] + 60, 1240, 120, q.on('lymfevaten', 1), TR.lymfe);
      tag(ctx, 'een tweede afvoer', 960, 870, C.goud, q.on('tweede', 1) * (1 - q.on('lymfevaten', 1)));
      tag(ctx, 'weefselvloeistof die over is, loopt erin', 960, 870, TR.plasma, q.on('over', 1) * (1 - q.on('heet', 1)));
      tag(ctx, 'vanaf dan heet het lymfe', 960, 870, TR.lymfe, q.on('heet', 1));
      eindLabels(ctx, X, Y, S, 1); return; }
    bg(ctx, 'schema'); const X = 760, Y = 470, S = 0.78;
    silhouet(ctx, X, Y, S, 1); const gr = ramp(t, tB, 3.0);
    lymfStelsel(ctx, X, Y, S, { groei: gr, knopen: q.on('lymfeknopen', 1), stroom: gr, t, dikHals: q.on('klieren', 1) });
    metaText(ctx, 'vooraanzicht · schematisch', 60, 880 - 10, C.text2, 'left', 24);
    const kn = q.on('lymfeknopen', 1) * (1 - q.on('witte', 1)); if (kn > 0.01) { const p = [X + 118 * S, Y - 232 * S]; label(ctx, 'lymfeknopen', 'IN HALS, OKSELS, LIEZEN, BUIK', p[0], p[1], 1180, 250, kn, TR.lymfe); }
    const zw = q.on('witte', 1) * (1 - q.on('Daarom', 1)); const kp = [X + 118 * S, Y - 232 * S];
    if (zw > 0.01) zoomCircle(ctx, 1460, 420, 250, kp[0], kp[1], 'lymfeknoop · schematisch', zw, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1200, 160, 520, 520); ctx.beginPath(); ctx.ellipse(1460, 420, 230, 160, 0.3, 0, 6.283); shape(ctx, rgba(TR.lymfe, 0.16), TR.lymfe, 3);
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + 0.4; const w2 = wander(i, t, 10, 0.5); const cx = 1460 + Math.cos(a) * (60 + 70 * hash(i)) + w2.x, cy = 420 + Math.sin(a) * (40 + 60 * hash(i + 4)) + w2.y; ctx.beginPath(); ctx.arc(cx, cy, 26, 0, 6.283); shape(ctx, rgba('#E6E1D3', 0.85), '#FFFFFF', 1.5); ctx.beginPath(); ctx.ellipse(cx - 4, cy, 12, 9, 0.5, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.8); ctx.fill(); }
      for (let i = 0; i < 6; i++) { const ph = clamp((t - q.at('vangen') + i * 0.5) / 3, 0, 1); const sx = 1280 + i * 70, sy = 250 + hash(i) * 340; const w2 = wander(i + 20, t, 6, 1.2); bacterie(ctx, lerp(sx, 1460 + (hash(i + 9) - 0.5) * 200, ph * 0.5) + w2.x, sy + w2.y, 1.6, i, 1, C.line, ph > 0.8 ? 1 : 0); } });
    if (zw > 0.01) { tag(ctx, 'witte bloedcellen', 1460, 760, C.text2, zw * (1 - q.on('vangen', 1))); tag(ctx, 'vangen ziekteverwekkers', 1460, 760, C.goud, zw * q.on('vangen', 1)); }
    tag(ctx, 'steeds grotere vaten', 1400, 870, TR.lymfe, q.on('grotere', 1) * (1 - q.on('lymfeknopen', 1)));
    const hk = q.on('Daarom', 1); if (hk > 0.01) { const p = [X + 40 * S, Y - 330 * S]; label(ctx, 'klieren in je hals', 'DAT ZIJN LYMFEKNOPEN', p[0], p[1], 1180, 250, hk, C.goud); }
    tag(ctx, 'keelpijn: klieren worden dik', 1400, 870, C.goud, q.on('keelpijn', 1) * (1 - q.on('lymfeknopen', 2)));
    tag(ctx, '"klieren" = lymfeknopen', 1400, 870, C.goud, q.on('lymfeknopen', 2));
  },

  s11(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 470, S = 0.78; const P = (p) => [X + p[0] * S, Y + p[1] * S];
    silhouet(ctx, X, Y, S, 1); const vA = q.on('ader', 1);
    lymfStelsel(ctx, X, Y, S, { groei: 1, knopen: 1, stroom: 1, t, borstHi: q.on('borstbuis', 1) * (1 - q.on('vet', 1) * 0.7), ader: vA, hartA: q.on('bovenste', 1) });
    // sleutelbeenderen
    const sb = q.on('linkersleutelbeen', 1); if (sb > 0.01) { ctx.save(); ctx.globalAlpha *= sb; ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { const a1 = P([sd * 18, -300]), a2 = P([sd * 120, -318]); ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.quadraticCurveTo((a1[0] + a2[0]) / 2, a1[1] - 14, a2[0], a2[1]); ctx.stroke(); } ctx.restore(); }
    const pB = P([18, -180]); label(ctx, 'borstbuis', 'HET GROOTSTE LYMFEVAT', pB[0], pB[1], 1180, 330, q.on('borstbuis', 1) * (1 - q.on('linkersleutelbeen', 1)), C.goud);
    const pS = P([78, -284]); label(ctx, 'linkersleutelbeen', 'RECHTS OP HET PLAATJE', pS[0], pS[1], 1180, 200, q.on('linkersleutelbeen', 1) * (1 - q.on('bovenste', 1)), C.goud);
    const pV = P([-40, -230]); label(ctx, 'bovenste holle ader', 'NAAR HET HART', pV[0], pV[1], 540, 200, q.on('bovenste', 1) * (1 - q.on('vet', 1)), TR.armL);
    // inmonding: lymfedruppels gaan de ader in en naar het hart
    if (vA > 0.01) { const pts = [P([78, -284]), P([0, -282]), P([-40, -270]), P([-38, -190])]; for (let i = 0; i < 5; i++) { const ph = (t * 0.35 + i / 5) % 1; const p = padPunt(pts, ph, false); druppel(ctx, p[0], p[1], 7, vA * (1 - q.on('vet', 1) * 0.6), TR.lymfe); } }
    tag(ctx, 'zo komt het vocht terug in het bloed', 1300, 870, TR.lymfe, q.on('Zo', 1) * (1 - q.on('vet', 1)));
    // vet uit de darm
    const vt = q.on('vet', 1); if (vt > 0.01) { ctx.save(); ctx.globalAlpha *= vt; const dm = DARM_PTS.map(p => P([p[0] * 0.42 - 20, p[1] * 0.42 + 10])); buisPad(ctx, dm, 20, 1, V.neutraal, C.fill, { seed: 2 }); ctx.restore();
      const lev = P([-80, -110]); const pa = q.on('poortader', 1); ctx.save(); ctx.globalAlpha *= pa; ctx.beginPath(); ctx.ellipse(lev[0], lev[1], 70 * S, 40 * S, -0.2, 0, 6.283); shape(ctx, rgba('#8C5A3A', 0.6), '#B07A5A', 2); ctx.restore();
      const route = [...LYMF.darm, ...LYMF.borstbuis.slice(1), [0, -282], [-40, -270], [-38, -190]].map(P);
      for (let i = 0; i < 5; i++) { const ph = clamp(((t - q.at('vet')) * 0.12 + i * 0.12) % 1, 0, 1); const p = padPunt(route, ph, false); chylomicron(ctx, p[0], p[1], 11, vt); }
      if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa * (1 - q.on('maar', 1) * 0.3); const a1 = P([-60, -40]), a2 = P([-80, -110]); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.stroke(); ctx.setLineDash([]);
        const m = [(a1[0] + a2[0]) / 2, (a1[1] + a2[1]) / 2]; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(m[0] - 18, m[1] - 18); ctx.lineTo(m[0] + 18, m[1] + 18); ctx.moveTo(m[0] + 18, m[1] - 18); ctx.lineTo(m[0] - 18, m[1] + 18); ctx.stroke(); ctx.restore();
        label(ctx, 'niet via de poortader', 'NIET EERST NAAR DE LEVER', lev[0], lev[1], 560, 600, pa * (1 - q.on('maar', 1)), C.text); }
      tag(ctx, 'vet uit de darm: ook via de lymfe', 1300, 870, C.oker, vt * (1 - q.on('poortader', 1)));
      tag(ctx, 'via de bovenste holle ader in het bloed', 1300, 870, C.goud, q.on('bovenste', 2)); }
    metaText(ctx, 'vooraanzicht · schematisch', 60, 870, C.text2, 'left', 24);
  },

  s12(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 470, S = 0.78; silhouet(ctx, X, Y, S, 1); lymfStelsel(ctx, X, Y, S, { groei: 1, knopen: 1, stroom: 0.6, t });
    tag(ctx, 'geen hart, geen pomp', 1400, 400, C.goud, q.on('hart', 1)); vraagteken(ctx, 1400, 640, q.on('stroomt', 1), 150); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const cx = 960, y0 = 820, y1 = 130;
    const spier = q.on('spieren', 1), zelf = q.on('wanden', 1) * (1 - q.on('kleppen', 2));
    const P = 2.4; const ph = (t % P) / P; const knijp = spier * (1 - zelf * 0.8) * Math.max(0, Math.sin(ph * Math.PI * 2)) ; const eigen = zelf * Math.max(0, Math.sin(t * 3.2));
    // spieren links en rechts
    for (const sd of [-1, 1]) { const bul = 1 + 0.25 * knijp; ctx.beginPath(); ctx.ellipse(cx + sd * (230 - 50 * knijp), 470, 140 * bul, 300, 0, 0, 6.283); shape(ctx, rgba(TR.spier, 0.85), spier > 0.01 && knijp > 0.1 ? C.goud : TR.spierR, 2.5); }
    // lymfevat met kleppen
    const wv = (y) => 46 * (1 - 0.45 * knijp * Math.exp(-((y - 470) ** 2) / 60000) - 0.25 * eigen * Math.max(0, Math.sin(y * 0.02 - t * 4)));
    ctx.beginPath(); for (let y = y0; y >= y1; y -= 8) ctx.lineTo(cx - wv(y), y); for (let y = y1; y <= y0; y += 8) ctx.lineTo(cx + wv(y), y); ctx.closePath(); shape(ctx, rgba(TR.lymfe, 0.22), TR.lymfe, 3);
    // stroming: in stootjes omhoog
    const cum = (tt) => { const base = 0.06 * tt; const n = Math.floor(tt / P), f = (tt % P) / P; return base + spier * 0.35 * (n + ease(clamp(f * 2, 0, 1))) + zelf * 0.05 * tt; };
    const sh = cum(t); for (let k = 0; k < 16; k++) { const u = (sh + k / 16) % 1; const y = lerp(y0 - 10, y1 + 10, u); druppel(ctx, cx + Math.sin(k * 2.7) * 18, y, 9, Math.min(1, u * 8) * (1 - ramp(u, 0.92, 0.08)), lighten(TR.lymfe, 0.25)); }
    const open = clamp(spier * Math.max(0, Math.sin(ph * Math.PI * 2)) * 1.2 + 0.15 + zelf * 0.4, 0, 1); const kl = q.on('kleppen', 1);
    for (const ky of [300, 470, 640]) { const w0 = wv(ky); ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = q.on('kleppen', 2) > 0.01 ? C.goud : TR.klep; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { const tipx = cx + sd * lerp(4, w0 * 0.85, open); ctx.beginPath(); ctx.moveTo(cx + sd * w0, ky + 34); ctx.quadraticCurveTo(cx + sd * w0 * 0.6, ky, tipx, ky - 34); ctx.stroke(); } ctx.restore(); }
    label(ctx, 'klep', 'ÉÉN KANT OP', cx + 10, 470 - 30, 1250, 300, kl * (1 - q.on('spieren', 1)), C.text);
    label(ctx, 'lymfevat', '', cx + 46, 760, 1250, 760, 1 - q.on('kleppen', 2), TR.lymfe);
    label(ctx, 'spier', 'KNIJPT HET VAT SAMEN', cx - 330, 300, 560, 170, spier * (1 - q.on('wanden', 1)), C.goud);
    tag(ctx, 'antwoord b: je spieren knijpen de vaten samen', 960, 870, C.goud, 1 - q.on('Net', 1));
    tag(ctx, 'net als in de aders: kleppen', 960, 870, C.text2, q.on('Net', 1) * (1 - q.on('spieren', 1)));
    tag(ctx, 'de wand trekt ook zelf een beetje samen', 960, 870, TR.lymfe, zelf);
    pijl(ctx, 1500, 700, 1500, 330, C.goud, q.on('bloed', 1), 10); regel(ctx, 'naar het bloed', 1530, 520, q.on('bloed', 1), C.goud, 36, 'left', 700);
  },

  s15(ctx, t, q) { bg(ctx, 'micro'); const X = 960, Y = 300, S = 0.6;
    const bpF = (xn) => lerp(1, 1 - 0.85 * xn, q.on('daalt', 1)); const her = q.on('Onderzoekers', 1) * (1 - q.on('principe', 1));
    const bpH = (xn) => lerp(bpF(xn), 1 - 0.42 * xn, her);
    haarvat(ctx, X, Y, { s: S, t, tint: 1, filt: 1, res: lerp(0.85, 0.5, her) * q.on('resorptie', 1) + 0.6 * (1 - q.on('resorptie', 1)), lymf: 1, lymfIn: lerp(0.4, 1, her), uit: q.on('duwt', 1), inw: q.on('trekt', 1), bp: bpH, trek: 0.55 });
    // grafiek van de twee krachten langs het haarvat, x uitgelijnd met het haarvat
    const gx = X - 700 * S, gw = 1400 * S, gy = 545, gh = 230;
    ctx.save(); ctx.globalAlpha *= q.on('krachten', 1); ctx.fillStyle = rgba(C.bgSchema, 0.94); roundRect(ctx, gx - 120, gy - 50, gw + 240, gh + 110, 18); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    metaText(ctx, 'begin', gx, gy + gh + 36, C.grain, 'left', 24); metaText(ctx, 'eind', gx + gw, gy + gh + 36, C.grain, 'right', 24); metaText(ctx, 'kracht · zonder getallen', gx, gy - 16, C.grain, 'left', 24); ctx.restore();
    const Yv = (v) => gy + gh - v * gh * 0.9; const curve = (f, u, col, lw, dash) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const xn = i / 100; const px = gx + xn * gw, py = Yv(f(xn)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); };
    const trU = ramp(t, q.at('trek'), 1.6), bpU = ramp(t, q.at('daalt') - 0.4, 1.6);
    // gebieden filtratie / resorptie (alleen tussen de lijnen)
    const fR = q.on('filtratie', 1), rR = q.on('resorptie', 1);
    const xc = 0.45 / 0.85; // snijpunt bp = trek
    if (fR > 0.01 || rR > 0.01) { ctx.save(); ctx.beginPath(); for (let i = 0; i <= 100; i++) { const xn = i / 100; ctx.lineTo(gx + xn * gw, Yv(bpH(xn))); } for (let i = 100; i >= 0; i--) { const xn = i / 100; ctx.lineTo(gx + xn * gw, Yv(0.55)); } ctx.closePath(); ctx.clip();
      ctx.globalAlpha = fR * 0.35; ctx.fillStyle = TR.rijkL; ctx.fillRect(gx, gy - 40, gw * xc, gh + 40); ctx.globalAlpha = rR * 0.35; ctx.fillStyle = TR.plasma; ctx.fillRect(gx + gw * xc, gy - 40, gw, gh + 40); ctx.restore(); }
    if (trU > 0.01) { curve(() => 0.55, trU, TR.plasma, 5); regel(ctx, 'trek van de eiwitten', gx + gw + 16, Yv(0.55) + 10, trU, TR.plasma, 28, 'left'); }
    if (q.on('daalt', 1) > 0.01 || her > 0.01) { curve(bpF, bpU, TR.rijkL, 5); regel(ctx, 'bloeddruk', gx - 16, Yv(1) + 10, bpU, TR.rijkL, 28, 'right'); }
    if (her > 0.01) { ctx.save(); ctx.globalAlpha *= her; curve((xn) => 1 - 0.42 * xn, 1, TR.rijkL, 4, [12, 10]); regel(ctx, 'nieuwer model', gx + gw + 16, Yv(0.58) - 30, 1, TR.rijkL, 28, 'left'); ctx.restore(); }
    regel(ctx, 'filtratie', gx + gw * 0.2, gy + gh - 20, fR, C.text, 30, 'center'); regel(ctx, 'resorptie', gx + gw * 0.8, gy + gh - 20, rR * (1 - her), C.text, 30, 'center');
    tag(ctx, 'plasma: hogere osmotische waarde dan weefselvloeistof', 960, 870, TR.plasma, q.on('osmotische', 1) * (1 - q.on('trek', 1)));
    tag(ctx, 'dit is een vereenvoudigd model', 960, 870, C.paars, q.on('vereenvoudigd', 1) * (1 - q.on('Onderzoekers', 1)));
    tag(ctx, 'minder terug, meer via de lymfe', 960, 870, TR.lymfe, q.on('Onderzoekers', 1) * (1 - q.on('principe', 1)));
    tag(ctx, 'bloeddruk duwt eruit, eiwitten trekken terug', 960, 870, C.goud, q.on('principe', 1));
  },

  s16(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('Er');
    person(ctx, 520, 800, 400, 1, { armR: { a1: 0.3, a2: 0.4 }, armL: { a1: 0.3, a2: 0.4 } });
    // bord met bijna geen eiwit
    ctx.save(); ctx.beginPath(); ctx.ellipse(900, 700, 150, 40, 0, 0, 6.283); shape(ctx, '#E6E1D3', C.line, 2); ctx.beginPath(); ctx.ellipse(900, 690, 90, 22, 0, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.5); ctx.fill(); ctx.restore();
    eiwit(ctx, 930, 680, 7, 1); tag(ctx, 'veel te weinig eiwit', 900, 600, EIWIT, q.on('weinig', 1) * (1 - q.on('plasma', 1)));
    const zp = q.on('minder', 1); if (zp > 0.01) zoomCircle(ctx, 1440, 400, 270, 560, 540, 'haarvat · schematisch', zp, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1160, 120, 560, 560); haarvat(ctx, 1440, 400, { s: 0.55, t, tint: 1, filt: 1, res: 0, eiwit: lerp(1, 0.25, ramp(t, q.at('minder') + 0.3, 1.5)) }); });
    tag(ctx, 'minder eiwitten in het plasma', 1440, 790, EIWIT, q.on('eiwitten', 1) * (1 - q.on('Wat', 1)));
    vraagteken(ctx, 1800, 260, q.on('Wat', 1), 130);
  },

  s18(ctx, t, q) { bg(ctx, 'schema');
    const gx = 160, gw = 900, gy = 230, gh = 360; const lo = q.on('lager', 1); const trk = lerp(0.55, 0.32, lo);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke(); metaText(ctx, 'begin', gx, gy + gh + 36, C.grain, 'left', 24); metaText(ctx, 'eind', gx + gw, gy + gh + 36, C.grain, 'right', 24); metaText(ctx, 'langs het haarvat', gx, gy - 20, C.grain, 'left', 24);
    const Yv = (v) => gy + gh - v * gh * 0.9; const bp = (xn) => 1 - 0.85 * xn;
    ctx.save(); ctx.beginPath(); for (let i = 0; i <= 100; i++) ctx.lineTo(gx + i / 100 * gw, Yv(bp(i / 100))); for (let i = 100; i >= 0; i--) ctx.lineTo(gx + i / 100 * gw, Yv(trk)); ctx.closePath(); ctx.clip(); const xc = (1 - trk) / 0.85;
    ctx.globalAlpha = 0.3; ctx.fillStyle = TR.rijkL; ctx.fillRect(gx, gy - 20, gw * xc, gh + 20); ctx.fillStyle = TR.plasma; ctx.fillRect(gx + gw * xc, gy - 20, gw, gh + 20); ctx.restore();
    ctx.strokeStyle = TR.rijkL; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 100; i++) ctx.lineTo(gx + i / 100 * gw, Yv(bp(i / 100))); ctx.stroke();
    if (lo > 0.01) { ctx.save(); ctx.globalAlpha *= 0.4; ctx.setLineDash([10, 10]); ctx.strokeStyle = TR.plasma; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, Yv(0.55)); ctx.lineTo(gx + gw, Yv(0.55)); ctx.stroke(); ctx.restore(); }
    ctx.strokeStyle = TR.plasma; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(gx, Yv(trk)); ctx.lineTo(gx + gw, Yv(trk)); ctx.stroke();
    regel(ctx, 'bloeddruk', gx + 20, Yv(1) - 14, 1, TR.rijkL, 28); regel(ctx, 'trek van de eiwitten', gx + gw - 10, Yv(trk) - 14, 1, TR.plasma, 28, 'right');
    regel(ctx, 'resorptie', gx + gw * 0.9, gy + gh - 16, 1, C.text, 28, 'center');
    tag(ctx, 'antwoord a: er komt minder vocht terug', 610, 160, C.goud, 1 - q.on('Met', 1));
    tag(ctx, 'lagere osmotische waarde van het plasma', 610, 160, TR.plasma, q.on('osmotische', 1) * (1 - q.on('terug', 1)));
    tag(ctx, 'minder resorptie: het vocht hoopt zich op', 610, 160, C.goud, q.on('terug', 1));
    // kind met opgezette benen en buik
    const sw = ramp(t, q.at('hoopt'), 2.5); const cx = 1480; const CH = 380; person(ctx, cx, 800, CH, 1, { armR: { a1: 0.35, a2: 0.3 }, armL: { a1: 0.35, a2: 0.3 } });
    if (sw > 0.01) { const hh = CH / 6.6; ctx.save(); ctx.globalAlpha *= sw; ctx.beginPath(); ctx.ellipse(cx, 800 - CH + hh * 3.0, hh * 0.95, hh * 0.75, 0, 0, 6.283); ctx.fillStyle = PERSON_LOOK.shirt; ctx.fill(); ctx.restore(); }
    enkels(ctx, cx, 800, CH, sw * 1.2, 1);
    tag(ctx, 'opgezwollen benen en buik', cx, 870, C.goud, q.on('opgezwollen', 1) * (1 - q.on('basis', 1)));
    tag(ctx, 'terug naar de basis', 960, 870, C.paars, q.on('basis', 1));
  },

  s19(ctx, t, q) { bg(ctx, 'schema'); const oed = q.on('oedeem', 1);
    const peil = 0.45 + 0.4 * ramp(t, q.at('Hoopt'), 2.5);
    balansBak(ctx, 520, 280, 460, 360, { t, peil, toe: q.on('weefsel', 1), terug: q.on('terug', 1), lymfe: q.on('lymfe', 1) * (1 - 0.7 * ramp(t, q.at('Hoopt'), 1)), hiToe: q.on('in', 1) * (1 - q.on('uit', 1)), hiTerug: q.on('terug', 1) * (1 - q.on('lymfe', 1)), hiLymfe: q.on('lymfe', 1) * (1 - q.on('Zolang', 1)) });
    // enkel die meegroeit met het peil
    ctx.save(); ctx.translate(1500, 470); ctx.scale(0.62, 0.62); ctx.translate(-960, -440); enkelGroot(ctx, clamp((peil - 0.45) / 0.4, 0, 1), 1); ctx.restore();
    metaText(ctx, 'je enkel', 1500, 140, C.grain, 'center', 26);
    tag(ctx, 'in balans: even dik', 960, 870, C.groen, q.on('balans', 1) * (1 - q.on('Hoopt', 1)));
    tag(ctx, 'oedeem: ophoping van weefselvloeistof', 960, 870, C.goud, oed);
  },

  s20(ctx, t, q) { const tB = q.at('Daardoor'), tC = q.at('antwoord'), tD = q.at('luchtdruk');
    if (t < tB - 0.3) { cabine(ctx); const L = passagier(ctx, 700, 880, 560, { t, kuit: q.on('kuitspieren', 1) * (1 - q.on('stijgt', 1) * 0.5), ader: q.on('beenaders', 1), aderV: 1 - 0.85 * q.on('niets', 1), sw: 0.3 + 0.5 * ramp(t, q.at('stijgt'), 3) });
      pijl(ctx, 1000, 520, 1000, 800, C.line, q.on('zwaartekracht', 1), 8); regel(ctx, 'zwaartekracht', 1030, 680, q.on('zwaartekracht', 1), C.text2, 30, 'left');
      tag(ctx, 'benen naar beneden, uren stil', 700, 160, C.goud, q.on('benen', 1) * (1 - q.on('beenaders', 1)));
      tag(ctx, 'bloed in je beenaders moet omhoog', 700, 160, TR.armL, q.on('beenaders', 1) * (1 - q.on('kuitspieren', 1)));
      tag(ctx, 'kuitspieren knijpen de aders samen', 700, 160, C.goud, q.on('kuitspieren', 1) * (1 - q.on('niets', 1)));
      tag(ctx, 'nu doen ze niets', 700, 160, C.goud, q.on('niets', 1));
      // drukmeter in de beenader
      const dm = q.on('druk', 1); if (dm > 0.01) { ctx.save(); ctx.globalAlpha *= dm; const x = 1590, y = 250, h = 460; roundRect(ctx, x - 50, y, 100, h, 18); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); const v = 0.3 + 0.55 * ramp(t, q.at('stijgt'), 1.5); roundRect(ctx, x - 44, y + h - 6 - (h - 12) * v, 88, (h - 12) * v, 14); ctx.fillStyle = rgba(TR.arm, 0.9); ctx.fill();
        text(ctx, 'druk in je beenader', x, y + h + 50, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
      tag(ctx, 'de druk in die aders stijgt', 1590, 160, C.goud, q.on('stijgt', 1)); return; }
    if (t < tC - 0.2) { bg(ctx, 'micro'); const X = 960, Y = 440, S = 0.92; const hoog = q.on('hoger', 1);
      haarvat(ctx, X, Y, { s: S, t, tint: 1, filt: 1, res: lerp(0.8, 0.4, q.on('minder', 1)), rest: 1, op: 34 * ramp(t, q.at('minder'), 6), lymf: 1, lymfIn: 0.5, lymfV: lerp(1, 0.2, q.on('trager', 1)), uit: 1, inw: 1, bp: (xn) => lerp(1 - 0.75 * xn, 1 - 0.25 * xn, hoog), trek: 0.55, hiEind: hoog * (1 - q.on('lymfe', 1)), flowS: 0.6 });
      const g = (lx, ly) => hvP(X, Y, S, lx, ly);
      tag(ctx, 'hogere druk aan het eind van de haarvaten', 960, 870, TR.rijkL, hoog * (1 - q.on('meer', 1)));
      tag(ctx, 'meer vocht naar buiten, minder terug', 960, 870, C.goud, q.on('meer', 1) * (1 - q.on('lymfe', 1)));
      const pl = g(HV.lymfX + 36, -200); label(ctx, 'lymfe', 'STROOMT NU TRAAG', pl[0] - 36, pl[1] + 60, 1240, 120, q.on('lymfe', 1), TR.lymfe);
      tag(ctx, 'spieren stil: de afvoer gaat veel trager', 960, 870, TR.lymfe, q.on('lymfe', 1));
      eindLabels(ctx, X, Y, S, 1); return; }
    if (t < tD - 0.6) { luchthaven(ctx, t); const wk = ramp(t, q.at('wandeling'), 1); const x = lerp(700, 700 + 600 * ramp(t, q.at('wandeling'), 3.5), 1); const bob = wk * Math.abs(Math.sin(t * 5)) * 6;
      person(ctx, x, 880 - bob, 560, 1, { armR: { a1: 0.15 + 0.2 * wk * Math.sin(t * 5), a2: 0.1 }, armL: { a1: 0.15 - 0.2 * wk * Math.sin(t * 5), a2: 0.1 } }); enkels(ctx, x, 880 - bob, 560, 1 - 0.85 * ramp(t, q.at('verdwijnt'), 2.5));
      tag(ctx, 'antwoord b: er komt meer vocht uit dan er wordt afgevoerd', 960, 160, C.goud, 1 - q.on('wandeling', 1));
      tag(ctx, 'na een wandeling verdwijnt het meeste weer', 960, 160, C.groen, q.on('wandeling', 1)); return; }
    bg(ctx, 'schema'); // luchtdruk weerlegd: ook in de bus
    const b = q.on('busreis', 1);
    ctx.save(); ctx.globalAlpha *= 1; roundRect(ctx, 260, 230, 560, 420, 40); shape(ctx, '#2E3E5C', C.line, 3); roundRect(ctx, 420, 300, 240, 300, 110); shape(ctx, '#1E2E4A', '#8FA0B5', 5); text(ctx, 'vliegtuig', 540, 710, fTekst(36, 600), C.text, 'center'); ctx.restore();
    const lp = q.on('nauwelijks', 1); if (lp > 0.01) { ctx.save(); ctx.globalAlpha *= lp; ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(380, 330); ctx.lineTo(700, 570); ctx.moveTo(700, 330); ctx.lineTo(380, 570); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'luchtdruk?', 540, 180, C.text2, q.on('luchtdruk', 1));
    if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; roundRect(ctx, 1080, 330, 620, 260, 34); shape(ctx, '#C9A35C', '#E2C38A', 3); for (let i = 0; i < 4; i++) { roundRect(ctx, 1120 + i * 140, 370, 110, 90, 12); shape(ctx, '#1E2E4A', '#8FA0B5', 3); } for (const wx of [1200, 1580]) { ctx.beginPath(); ctx.arc(wx, 600, 44, 0, 6.283); shape(ctx, '#262C3A', '#8FA0B5', 3); } text(ctx, 'lange busreis', 1390, 710, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'speelt nauwelijks mee', 540, 800, C.goud, lp); tag(ctx, 'ook dikke enkels', 1390, 800, C.goud, q.on('dikke', 1));
  },

  s21(ctx, t, q) { const tB = q.at('Oedeem') - 0.2;
    if (t < tB) { bg(ctx, 'schema'); // slagadertje – haarvat – adertje met drukmeter
      const v = q.on('vernauwd', 1); const y = 420; const sl = [[120, y], [560, y]], hv = [[560, y], [1360, y]], ad = [[1360, y], [1800, y]];
      const wS = lerp(60, 22, v);
      ctx.save(); ctx.lineCap = 'butt'; ctx.strokeStyle = TR.rijk; ctx.lineWidth = wS; ctx.beginPath(); ctx.moveTo(120, y); ctx.lineTo(560, y); ctx.stroke(); ctx.strokeStyle = mixRood(0.5); ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(560, y); ctx.lineTo(1360, y); ctx.stroke(); ctx.strokeStyle = TR.arm; ctx.lineWidth = 60; ctx.beginPath(); ctx.moveTo(1360, y); ctx.lineTo(1800, y); ctx.stroke(); ctx.restore();
      // kringspier om het slagadertje
      for (let i = 0; i < 5; i++) { const x = 220 + i * 70; ctx.save(); ctx.strokeStyle = v > 0.01 ? C.goud : TR.spierR; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(x, y, 10, wS / 2 + 10, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      particleFlow(ctx, [[120, y], [1800, y]], 18, t, lerp(220, 120, v), rgba('#FFFFFF', 0.5), 5, 3, 1);
      const nOut = Math.round(lerp(14, 4, ramp(t, q.at('minder'), 1))); for (let k = 0; k < nOut; k++) { const ph = (t * 0.3 + k / nOut) % 1; const x = 620 + (k * 97) % 380; druppel(ctx, x, y + 20 + ph * 220, 8, Math.min(1, ph * 6) * (1 - ramp(ph, 0.8, 0.2))); }
      text(ctx, 'slagadertje', 340, y - 70, fTekst(32, 600), C.text, 'center'); text(ctx, 'haarvat', 960, y - 70, fTekst(32, 600), C.text, 'center'); text(ctx, 'adertje', 1580, y - 70, fTekst(32, 600), C.text, 'center');
      const pv = lerp(0.7, 0.35, ramp(t, q.at('lager'), 1.2)); const mx = 960, my0 = 120; roundRect(ctx, 1480, 560, 340, 50, 14); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); roundRect(ctx, 1486, 566, 328 * pv, 38, 10); ctx.fillStyle = rgba(TR.rijkL, 0.85); ctx.fill(); text(ctx, 'druk in het haarvat', 1650, 660, fTekst(30, 600), C.text, 'center');
      tag(ctx, 'het werkt ook andersom', 960, 160, C.goud, q.on('andersom', 1) * (1 - q.on('vernauwd', 1)));
      tag(ctx, 'slagadertjes vóór het haarvat vernauwd', 960, 160, C.goud, q.on('vernauwd', 1) * (1 - q.on('minder', 1)));
      tag(ctx, 'lagere druk: er gaat minder vocht uit', 960, 160, C.goud, q.on('minder', 1));
      metaText(ctx, 'schematisch', 60, 870, C.text2, 'left', 24); return; }
    bg(ctx, 'schema'); const cols = [[330, 'zwak hart', 'hart', 'meer eruit'], [960, 'ernstig eiwittekort', 'eiwittekort', 'minder terug'], [1590, 'lymfeknopen weggehaald', 'lymfeknopen', 'minder afvoer']];
    tag(ctx, 'andere oorzaken van oedeem', 960, 140, C.goud, q.on('Oedeem', 1) * (1 - q.on('hart', 1)));
    cols.forEach(([x, title, w, gevolg], i) => { const a = q.on(w, i === 2 ? 1 : 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      text(ctx, title, x, 220, fTekst(38, 700), C.text, 'center');
      const tt = t - q.at(w); const ch = ramp(tt, 2.5, 2); const peil = 0.4 + 0.3 * ch;
      ctx.save(); ctx.translate(x - 150, 330); ctx.scale(0.55, 0.55); balansBak(ctx, 0, 0, 380, 300, { t, peil, toe: i === 0 ? 1 + 0.8 * ch : 1, terug: i === 1 ? 1 - 0.7 * ch : 1, lymfe: 1, blok: i === 2 ? ch : 0, hiToe: i === 0 ? ch : 0, hiTerug: i === 1 ? ch : 0, labels: 0 }); ctx.restore();
      tag(ctx, gevolg, x, 700, C.goud, ch);
      const res = i === 0 ? 'dikke enkels' : i === 1 ? 'benen en buik zwellen op' : 'arm of been wordt dik'; regel(ctx, res, x, 790, ramp(tt, 4.5, 0.8), C.text2, 30, 'center'); ctx.restore(); });
  },

  s22(ctx, t, q) { luchthaven(ctx, t); const x = 220 + 560 * clamp(t / 29, 0, 1); const bob = Math.abs(Math.sin(t * 5)) * 6;
    person(ctx, x, 880 - bob, 520, 1, { armR: { a1: 0.15 + 0.2 * Math.sin(t * 5), a2: 0.1 }, armL: { a1: 0.15 - 0.2 * Math.sin(t * 5), a2: 0.1 } }); enkels(ctx, x, 880 - bob, 520, 0.35 * (1 - ramp(t, 3, 20)));
    // samenvatting als kaart rechtsboven
    const k = ramp(t, 0, 0.6); ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, 1000, 130, 860, 430, 20); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5); ctx.restore();
    regel(ctx, 'begin haarvat: filtratie', 1040, 200, q.on('duwt', 1), TR.rijkL, 34);
    regel(ctx, 'weefselvloeistof: geen rode bloedcellen', 1040, 260, q.on('weefselvloeistof', 1), TR.plasma, 34);
    regel(ctx, 'eind haarvat: eiwitten trekken terug', 1040, 320, q.on('trekken', 1), TR.plasma, 34);
    regel(ctx, 'restje: lymfe, kleppen, lymfeknopen', 1040, 380, q.on('lymfe', 1), TR.lymfe, 34);
    regel(ctx, 'vliegtuig: spierpomp stil, druk omhoog', 1040, 450, q.on('spierpomp', 1), C.goud, 34);
    regel(ctx, 'meer eruit dan afgevoerd: dikke enkels', 1040, 510, q.on('afgevoerd', 1), C.goud, 34);
  },
};

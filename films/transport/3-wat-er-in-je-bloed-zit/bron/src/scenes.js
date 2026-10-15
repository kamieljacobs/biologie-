// Transport 3 · Wat er in je bloed zit — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A1E18', shirt: '#5A7FA0', hairStyle: 'curly' };
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const fade = (q, w1, w2, n1 = 1, n2 = 1) => q.on(w1, n1) * (1 - (w2 ? q.on(w2, n2) : 0));
function inv(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- kleuren van deze film ----------
const B3 = { wit: '#E6E1D3', plaatje: '#D8C9A6', plaatjeR: '#F0E4C4', fibrine: '#EDE3C8', bot: '#D8D0BE', lever: '#8C4A3E', milt: '#7A4A58', huid: '#C99A78', weefsel: '#A87E6A', korst: '#5E3428', ca: '#AFC0D0', citraat: '#9AA3B2' };
function mixRood(k) { const A = [0x8E, 0x3E, 0x46], B = [0xD9, 0x48, 0x3E]; return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k, 0, 1))).toString(16).padStart(2, '0')).join(''); }

// ---------- Micro: bloedcellen ----------
// rode bloedcel van voren: schijfje met een dunner midden (donkerder vlak), geen kern
function rbc(ctx, x, y, r, o = {}) { const { a = 1, col = TR.rijk, rot = 0, squash = 1, oud = 0, hb = 0, seed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, squash);
  const c = oud > 0.01 ? mixRood(0.4 - 0.2 * oud) : col;
  if (oud > 0.01) { blob(ctx, 0, 0, r, r, 0.08 * oud, seed + 3); } else { ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); }
  shape(ctx, c, lighten(c.startsWith('#') ? c : TR.rijk, 0.3), Math.max(1, r * 0.06));
  ctx.beginPath(); ctx.arc(0, 0, r * 0.46, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.2); ctx.fill();
  if (hb > 0.01) { ctx.save(); ctx.globalAlpha *= hb; ctx.fillStyle = rgba(TR.rijkL, 0.85); const n = Math.round(r * 1.1); for (let i = 0; i < n; i++) { const an = hash(i * 7 + seed) * 6.283, d = Math.sqrt(hash(i * 7 + 1 + seed)) * r * 0.86; ctx.beginPath(); ctx.arc(Math.cos(an) * d, Math.sin(an) * d, Math.max(1.5, r * 0.03), 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
// rode bloedcel van opzij: dubbelhol (in het midden dunner dan aan de rand)
function rbcZij(ctx, x, y, r, o = {}) { const { a = 1, col = TR.rijk, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const h = (u) => r * Math.sqrt(Math.max(0, 1 - u * u)) * (0.16 + 0.55 * u * u - 0.36 * u ** 4) + r * 0.02;
  ctx.beginPath(); const N = 60; for (let i = 0; i <= N; i++) { const u = -1 + 2 * i / N; i ? ctx.lineTo(u * r, -h(u)) : ctx.moveTo(u * r, -h(u)); } for (let i = N; i >= 0; i--) { const u = -1 + 2 * i / N; ctx.lineTo(u * r, h(u)); } ctx.closePath();
  shape(ctx, col, lighten(TR.rijk, 0.3), 2); ctx.restore(); }
// witte bloedcel: groter, met gelobde kern en korreltjes
function wbc(ctx, x, y, r, t = 0, o = {}) { const { a = 1, seed = 1, kern = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.96, 0.06, seed, t * 2); shape(ctx, rgba(B3.wit, 0.2), B3.wit, 2);
  ctx.fillStyle = rgba(B3.wit, 0.5); for (let i = 0; i < 26; i++) { const an = hash(i * 5 + seed) * 6.283, d = (0.3 + 0.6 * Math.sqrt(hash(i * 5 + 2 + seed))) * r * 0.85; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(1.4, r * 0.03), 0, 6.283); ctx.fill(); }
  if (kern > 0.01) { ctx.save(); ctx.globalAlpha *= kern; for (const [dx, dy, k] of [[-0.3, -0.12, 0.3], [0.05, 0.18, 0.28], [0.32, -0.08, 0.26]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, k * r, k * r * 0.85, dx, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.5); }
    ctx.strokeStyle = C.kern; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.moveTo(x - 0.3 * r, y - 0.12 * r); ctx.lineTo(x + 0.05 * r, y + 0.18 * r); ctx.lineTo(x + 0.32 * r, y - 0.08 * r); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// bloedplaatje: klein ovaal schijfje; actief = met uitlopers
function plaatje(ctx, x, y, r, o = {}) { const { a = 1, rot = 0, actief = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  if (actief > 0.01) { ctx.strokeStyle = B3.plaatjeR; ctx.lineWidth = Math.max(1.5, r * 0.25); ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.3; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.6, Math.sin(an) * r * 0.5); ctx.lineTo(Math.cos(an) * r * (0.9 + 0.8 * actief), Math.sin(an) * r * (0.7 + 0.8 * actief)); ctx.stroke(); } }
  ctx.beginPath(); ctx.ellipse(0, 0, r, r * lerp(0.6, 0.85, actief), 0, 0, 6.283); shape(ctx, B3.plaatje, B3.plaatjeR, 1.2);
  ctx.fillStyle = rgba('#7A6A50', 0.5); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc((i - 1) * r * 0.4, (i % 2 ? 1 : -1) * r * 0.15, r * 0.12, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// grote cel in het beenmerg waar bloedplaatjes van afbreken
function grooteCel(ctx, x, y, r, t, o = {}) { const { a = 1, af = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.95, 0.07, 5, t); shape(ctx, rgba(B3.plaatje, 0.25), B3.plaatjeR, 2);
  for (const [dx, dy, k] of [[-0.25, -0.1, 0.32], [0.1, 0.12, 0.3], [0.2, -0.22, 0.24], [-0.1, 0.3, 0.22]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, k * r, k * r * 0.8, dx * 2, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.2); }
  if (af > 0.01) for (let i = 0; i < 8; i++) { const ph = ((t * 0.25 + i / 8) % 1); const an = -0.9 + (i % 4) * 0.5; const d = r * (1.05 + ph * 1.4); plaatje(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * 0.13, { a: af * (1 - ph * 0.6), rot: i }); }
  ctx.restore(); }
// zuurstofmolecuul (teal, twee bolletjes)
function o2(ctx, x, y, r = 6, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.teal; ctx.strokeStyle = lighten(C.teal, 0.4); ctx.lineWidth = 1; for (const d of [-0.6, 0.6]) { ctx.beginPath(); ctx.arc(x + d * r, y, r, 0, 6.283); ctx.fill(); ctx.stroke(); } ctx.restore(); }
// hemoglobinemolecuul: vier eiwitketens, elk met een heemgroep met ijzer; o2 = zuurstof gebonden
function hbMol(ctx, x, y, r, o = {}) { const { a = 1, o2a = 0, fe = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pos = [[-0.42, -0.4], [0.42, -0.4], [-0.42, 0.4], [0.42, 0.4]];
  pos.forEach(([dx, dy], i) => { blob(ctx, x + dx * r, y + dy * r, r * 0.52, r * 0.48, 0.07, i * 3 + 1, 0); shape(ctx, i % 3 === 0 ? rgba(TR.rijkL, 0.55) : rgba(TR.rijk, 0.55), lighten(TR.rijk, 0.35), 2); });
  pos.forEach(([dx, dy]) => { const hx = x + dx * r * 1.05, hy = y + dy * r * 1.05; ctx.save(); ctx.translate(hx, hy); ctx.rotate(0.785); roundRect(ctx, -r * 0.14, -r * 0.14, r * 0.28, r * 0.28, 3); shape(ctx, rgba(C.bgMicro, 0.8), C.text2, 1.5); ctx.restore();
    if (fe > 0.01) { ctx.save(); ctx.globalAlpha *= fe; ctx.beginPath(); ctx.arc(hx, hy, r * 0.07, 0, 6.283); shape(ctx, '#B8BEC6', '#E6E9EE', 1); ctx.restore(); }
    if (o2a > 0.01) o2(ctx, hx + Math.sign(dx) * r * 0.2, hy + Math.sign(dy) * r * 0.2, r * 0.07, o2a); });
  ctx.restore(); }

// ---------- Schema: buisje, zakje, centrifuge ----------
// buisje met bloed; sep 0 = gemengd, 1 = bezonken in drie lagen. Geeft de y-grenzen terug.
function buisje(ctx, x, yTop, w, h, sep, t, o = {}) { const { a = 1, n = 120, stol = 0, krimp = 0 } = o; const g = { top: yTop + h * 0.08, bot: yTop + h - w * 0.1 };
  const Hc = g.bot - g.top; const s = ease(sep); const yP = g.top + Hc * 0.55 * s, yW = g.top + Hc * 0.55, yR = g.top + Hc * 0.58;
  const res = { top: g.top, bot: g.bot, plasma: [g.top, g.top + Hc * 0.55], wit: [yW, yR], rood: [yR, g.bot] }; if (a <= 0.01) return res; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, yTop); ctx.lineTo(x - w / 2, yTop + h - w / 2); ctx.arc(x, yTop + h - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, yTop); };
  ctx.save(); omtrek(); ctx.closePath(); ctx.clip();
  if (stol > 0.01) { // gestold buisje (vwo): stolsel krimpt, serum erboven
    const kTop = lerp(g.top, g.top + Hc * 0.55, krimp); ctx.fillStyle = rgba(TR.plasma, 0.8); ctx.fillRect(x - w, g.top, 2 * w, kTop - g.top);
    blob(ctx, x, (kTop + g.bot + w * 0.4) / 2, w * lerp(0.5, 0.38, krimp), (g.bot + w * 0.4 - kTop) / 2, 0.05, 4); shape(ctx, TR.arm, lighten(TR.arm, 0.25), 2);
    ctx.strokeStyle = rgba(B3.fibrine, 0.6); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { const yy = lerp(kTop + 20, g.bot, hash(i * 3)); ctx.beginPath(); ctx.moveTo(x - w * 0.35, yy); ctx.lineTo(x + w * 0.35, yy + (hash(i * 3 + 1) - 0.5) * 40); ctx.stroke(); }
  } else {
    ctx.fillStyle = rgba(TR.plasma, 0.82); ctx.fillRect(x - w, g.top, 2 * w, g.bot + w - g.top);
    ctx.fillStyle = TR.arm; ctx.fillRect(x - w, yP + Hc * 0.03 * s, 2 * w, g.bot + w - yP);
    if (s > 0.01) { ctx.fillStyle = rgba(B3.wit, 0.95 * s); ctx.fillRect(x - w, yW, 2 * w, yR - yW); }
    for (let i = 0; i < n; i++) { const u0 = hash(i * 11 + 1), u1 = 0.585 + 0.415 * u0; const si = ease(clamp(sep * (0.8 + 0.4 * hash(i * 11 + 2)), 0, 1)); const yy = g.top + Hc * lerp(u0, u1, si); const xx = x + (hash(i * 11 + 3) - 0.5) * (w - 16); const wv = wander(i, t, 2.5, 1.2);
      ctx.fillStyle = hash(i * 11 + 4) < 0.5 ? TR.rijk : mixRood(0.6); ctx.beginPath(); ctx.ellipse(xx + wv.x, yy + wv.y, w * 0.06, w * 0.045, i, 0, 6.283); ctx.fill(); }
  }
  ctx.restore();
  omtrek(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  roundRect(ctx, x - w / 2 - 10, yTop - 26, w + 20, 34, 8); shape(ctx, C.fill, C.line, 2);
  ctx.restore(); return res; }
// zakje donorbloed; sep zoals bij buisje, vol 0..1 = hoeveel erin zit; col: kleur van één bestanddeel (na splitsen)
function zakje(ctx, x, y, w, h, o = {}) { const { a = 1, sep = 0, vol = 1, t = 0, inhoud = 'bloed', label = '', citraat = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const vorm = () => { ctx.beginPath(); ctx.moveTo(x - w / 2 + 20, y - h / 2); ctx.lineTo(x + w / 2 - 20, y - h / 2); ctx.quadraticCurveTo(x + w / 2 + 6, y - h / 2, x + w / 2 + 4, y - h / 2 + 30); ctx.lineTo(x + w / 2 + 8, y + h / 2 - 30); ctx.quadraticCurveTo(x + w / 2 + 8, y + h / 2, x + w / 2 - 22, y + h / 2); ctx.lineTo(x - w / 2 + 22, y + h / 2); ctx.quadraticCurveTo(x - w / 2 - 8, y + h / 2, x - w / 2 - 8, y + h / 2 - 30); ctx.lineTo(x - w / 2 - 4, y - h / 2 + 30); ctx.quadraticCurveTo(x - w / 2 - 6, y - h / 2, x - w / 2 + 20, y - h / 2); ctx.closePath(); };
  // poortjes en slangetje
  ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const d of [-0.22, 0.22]) { ctx.beginPath(); ctx.moveTo(x + d * w, y - h / 2); ctx.lineTo(x + d * w, y - h / 2 - 26); ctx.stroke(); }
  ctx.save(); vorm(); ctx.clip(); const top = y - h / 2 + 14, bot = y + h / 2, lv = lerp(bot, top, vol); const Hc = bot - top;
  if (inhoud === 'bloed') { const s = ease(sep); ctx.fillStyle = rgba(TR.plasma, 0.82); ctx.fillRect(x - w, lv, 2 * w, bot - lv); { const y0 = Math.max(lv, lerp(lv, top + Hc * 0.58, s)); ctx.fillStyle = TR.arm; ctx.fillRect(x - w, y0, 2 * w, bot - y0 + 10); }
    if (s > 0.01) { ctx.fillStyle = rgba(B3.wit, 0.95 * s); ctx.fillRect(x - w, top + Hc * 0.55, 2 * w, Hc * 0.03); }
    if (vol > 0.05) for (let i = 0; i < 50; i++) { const u0 = hash(i * 13 + 7); const yy = lerp(lerp(lv, bot, u0), top + Hc * (0.585 + 0.41 * u0), ease(clamp(sep * (0.8 + 0.4 * hash(i)), 0, 1))); const wv = wander(i, t, 3, 1.5); ctx.fillStyle = TR.rijk; ctx.beginPath(); ctx.ellipse(x + (hash(i * 13 + 8) - 0.5) * (w - 20) + wv.x, yy + wv.y, 8, 6, i, 0, 6.283); ctx.fill(); } }
  else { const col = inhoud === 'rood' ? TR.arm : inhoud === 'plasma' ? rgba(TR.plasma, 0.85) : rgba(B3.plaatje, 0.75); ctx.fillStyle = col; ctx.fillRect(x - w, lv, 2 * w, bot - lv);
    if (inhoud === 'rood') for (let i = 0; i < 26; i++) { const wv = wander(i, t, 3, 1); ctx.fillStyle = TR.rijk; ctx.beginPath(); ctx.ellipse(x + (hash(i * 3) - 0.5) * (w - 20) + wv.x, lerp(lv + 8, bot - 8, hash(i * 3 + 1)) + wv.y, 7, 5, i, 0, 6.283); ctx.fill(); }
    if (inhoud === 'plaatjes') for (let i = 0; i < 18; i++) { const wv = wander(i, t, 3, 1); plaatje(ctx, x + (hash(i * 3) - 0.5) * (w - 24) + wv.x, lerp(lv + 8, bot - 8, hash(i * 3 + 1)) + wv.y, 6, { rot: i }); } }
  if (citraat > 0.01) for (let i = 0; i < 14; i++) { const wv = wander(i + 40, t, 10, 0.8); const px = x + (hash(i * 5 + 9) - 0.5) * (w - 40) + wv.x, py = lerp(top + 30, bot - 20, hash(i * 5 + 10)) + wv.y; ctx.save(); ctx.globalAlpha *= citraat; ctx.translate(px, py); ctx.rotate(i); ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(8, 5); ctx.lineTo(-8, 5); ctx.closePath(); shape(ctx, rgba(B3.citraat, 0.9), C.text, 1.2); ctx.restore(); }
  ctx.restore(); vorm(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  roundRect(ctx, x - w * 0.3, y - h * 0.32, w * 0.6, 34, 6); ctx.fillStyle = rgba(C.text, 0.85); ctx.fill(); ctx.fillStyle = C.bgSchema; ctx.fillRect(x - w * 0.24, y - h * 0.32 + 10, w * 0.48, 4); ctx.fillRect(x - w * 0.24, y - h * 0.32 + 20, w * 0.3, 4);
  if (label) text(ctx, label, x, y + h / 2 + 48, fTekst(32, 600), C.text, 'center');
  ctx.restore(); }
// centrifuge van boven gezien; ang = draaihoek; vaart 0..1 (snelheidsboogjes)
function centrifuge(ctx, x, y, r, ang, o = {}) { const { a = 1, vaart = 0, deksel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - r - 40, y - r - 40, 2 * r + 80, 2 * r + 80, 40); shape(ctx, '#2F3E5C', C.line, 2);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, C.kast, C.line, 2);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.fillStyle = '#5B6B88'; ctx.fillRect(-14, 0, 28, r * 0.55); roundRect(ctx, -r * 0.2, r * 0.48, r * 0.4, r * 0.42, 14); shape(ctx, '#4A5878', C.line, 2);
    roundRect(ctx, -r * 0.13, r * 0.53, r * 0.26, r * 0.3, 8); ctx.fillStyle = i === 0 ? TR.arm : '#3A4660'; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.14, 0, 6.283); shape(ctx, '#8FA0B5', '#C0CCDA', 2); ctx.restore();
  if (vaart > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.text, 0.5 * vaart); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const a0 = ang + i * Math.PI / 2 + 0.25; ctx.beginPath(); ctx.arc(x, y, r * 0.92, a0, a0 + 0.9 * vaart); ctx.stroke(); } ctx.restore(); }
  if (deksel > 0.01) { ctx.save(); ctx.globalAlpha *= deksel; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#3A4A68', 0.92), C.line, 2); ctx.restore(); }
  ctx.restore(); }
// verticale haak met tekst links
function vHaak(ctx, x, y0, y1, s, col = C.goud, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 14, y0); ctx.lineTo(x, y0); ctx.lineTo(x, y1); ctx.lineTo(x + 14, y1); ctx.stroke(); text(ctx, s, x - 20, (y0 + y1) / 2 + 14, fTekst(40, 700), col, 'right'); ctx.restore(); }
function kruis(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); ctx.restore(); }
function vinkje(ctx, x, y, r, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r * 0.3, y + r * 0.7); ctx.lineTo(x + r, y - r * 0.7); ctx.stroke(); ctx.restore(); }
function micro(ctx) { bg(ctx, 'micro'); }

// ---------- Schema: organen ----------
function leverVorm(ctx, x, y, s = 1, a = 1, hi = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 150 * s, y - 40 * s); ctx.bezierCurveTo(x - 120 * s, y - 100 * s, x + 80 * s, y - 110 * s, x + 150 * s, y - 70 * s); ctx.bezierCurveTo(x + 170 * s, y - 40 * s, x + 90 * s, y + 20 * s, x - 20 * s, y + 60 * s); ctx.bezierCurveTo(x - 110 * s, y + 90 * s, x - 170 * s, y + 20 * s, x - 150 * s, y - 40 * s); ctx.closePath(); shape(ctx, rgba(B3.lever, 0.75), hi ? C.goud : lighten(B3.lever, 0.35), hi ? 3 : 2); ctx.restore(); }
function miltVorm(ctx, x, y, s = 1, a = 1, hi = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); ctx.beginPath(); ctx.ellipse(0, 0, 80 * s, 38 * s, 0, 0, 6.283); shape(ctx, rgba(B3.milt, 0.8), hi ? C.goud : lighten(B3.milt, 0.35), hi ? 3 : 2); ctx.restore(); }
// vereenvoudigd skelet; rood(naam) = 0..1 hoeveel rood beenmerg dat bot laat zien. Geeft ankerpunten.
function skelet(ctx, x, y, s, o = {}) { const { a = 1, rood = () => 0, hi = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const A = { schedel: P(0, -300), borstbeen: P(0, -160), ribben: P(-70, -150), wervels: P(0, -40), bekken: P(-60, 95), dijbeen: P(-48, 130), opperarmbeen: P(-100, -200) };
  if (a <= 0.01) return A; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const bot = (pts, w, naam, fr = [0, 1]) => { const line = (p) => { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); };
    const Q = pts.map(p => P(p[0], p[1])); ctx.strokeStyle = hi[naam] ? C.goud : rgba(B3.bot, 0.9); ctx.lineWidth = w * s + (hi[naam] ? 6 : 0); line(Q); ctx.stroke(); ctx.strokeStyle = B3.bot; ctx.lineWidth = w * s; line(Q); ctx.stroke();
    const r = rood(naam); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; ctx.strokeStyle = TR.rijk; ctx.lineWidth = w * s * 0.55; if (Q.length === 2 && (fr[0] > 0 || fr[1] < 1)) { for (const [f0, f1] of [[0, fr[0]], [fr[1], 1]]) { if (f1 - f0 < 0.01) continue; ctx.beginPath(); ctx.moveTo(lerp(Q[0][0], Q[1][0], f0), lerp(Q[0][1], Q[1][1], f0)); ctx.lineTo(lerp(Q[0][0], Q[1][0], f1), lerp(Q[0][1], Q[1][1], f1)); ctx.stroke(); } } else { line(Q); ctx.stroke(); } ctx.restore(); } };
  // schedel
  ctx.beginPath(); ctx.ellipse(x, y - 300 * s, 58 * s, 66 * s, 0, 0, 6.283); shape(ctx, B3.bot, hi.schedel ? C.goud : B3.bot, 2); if (rood('schedel') > 0.01) { ctx.save(); ctx.globalAlpha *= rood('schedel'); ctx.beginPath(); ctx.ellipse(x, y - 312 * s, 44 * s, 44 * s, 0, Math.PI, 0); ctx.fillStyle = TR.rijk; ctx.fill(); ctx.restore(); }
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(x - 20 * s, y - 296 * s, 11 * s, 0, 6.283); ctx.arc(x + 20 * s, y - 296 * s, 11 * s, 0, 6.283); ctx.fill();
  // wervelkolom
  for (let i = 0; i < 14; i++) { const yy = -228 + i * 21; roundRect(ctx, x - 13 * s, y + yy * s, 26 * s, 16 * s, 4 * s); shape(ctx, B3.bot, hi.wervels ? C.goud : null, 2); if (rood('wervels') > 0.01) { ctx.save(); ctx.globalAlpha *= rood('wervels'); roundRect(ctx, x - 8 * s, y + (yy + 3) * s, 16 * s, 10 * s, 3 * s); ctx.fillStyle = TR.rijk; ctx.fill(); ctx.restore(); } }
  // ribben
  for (let i = 0; i < 6; i++) for (const d of [-1, 1]) { const yy = -205 + i * 24; const pts = [[d * 14, yy], [d * 70, yy - 6], [d * 98, yy + 20], [d * 86, yy + 46], [d * 24, yy + 40]]; bot(pts, 9, 'ribben'); }
  bot([[0, -205], [0, -110]], 20, 'borstbeen');
  bot([[-20, -228], [-100, -222]], 11, 'sleutelbeen'); bot([[20, -228], [100, -222]], 11, 'sleutelbeen');
  // bekken
  for (const d of [-1, 1]) bot([[d * 16, 70], [d * 70, 52], [d * 86, 92], [d * 50, 122], [d * 14, 120]], 18, 'bekken');
  // armen en benen (pijpbeenderen: rood alleen aan de uiteinden bij volwassenen)
  for (const d of [-1, 1]) { bot([[d * 104, -214], [d * 120, -60]], 18, 'opperarmbeen', o.volw ? [0.25, 0.75] : [0, 0]); bot([[d * 122, -52], [d * 136, 86]], 13, 'onderarm', [0, 0]);
    bot([[d * 54, 124], [d * 62, 330]], 22, 'dijbeen', o.volw ? [0.25, 0.75] : [0, 0]); bot([[d * 62, 342], [d * 64, 530]], 17, 'scheenbeen', [0, 0]); }
  ctx.restore(); return A; }

// ---------- Micro: de wond (H3), huid boven, bloedvat onder ----------
const WD = { huid0: 236, huid1: 268, VY: 606, R: 116, gx0: 900, gx1: 1020 };
// o: snee 0..1, samen 0..1 (vat trekt samen), prop 0..1 (aantal plakkende plaatjes), lek 0..1, net 0..1, strik 0..1, korst 0..1, sein 0..1, factoren 0..1 (actief), fibrinogeen 0..1 (losse staafjes)
function wond(ctx, t, o = {}) { const { snee = 1, samen = 0, prop = 0, lek = 0, net = 0, strik = 0, korst = 0, sein = 0, factoren = 0, factorA = 0, fibrinogeen = 0, druppel = 0, flow = 1 } = o;
  const { huid0, huid1, VY, gx0, gx1 } = WD; const R = WD.R * (1 - 0.28 * samen), wd = 34; const wTop = VY - R - wd, wBot = VY + R + wd; const gm = (gx0 + gx1) / 2, gh = (gx1 - gx0) / 2 * snee;
  micro(ctx);
  // weefsel en huid
  ctx.fillStyle = rgba(B3.weefsel, 0.16); ctx.fillRect(0, huid1, W, CAPTION_Y - 10 - huid1);
  ctx.fillStyle = rgba(B3.huid, 0.7); ctx.fillRect(0, huid0, gm - gh * 0.7, huid1 - huid0); ctx.fillRect(gm + gh * 0.7, huid0, W, huid1 - huid0);
  ctx.strokeStyle = lighten(B3.huid, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, huid0); ctx.lineTo(gm - gh * 0.7, huid0); ctx.moveTo(gm + gh * 0.7, huid0); ctx.lineTo(W, huid0); ctx.stroke();
  // wondkanaal door het weefsel
  if (snee > 0.01) { ctx.fillStyle = rgba(TR.arm, 0.28 * snee); ctx.beginPath(); ctx.moveTo(gm - gh * 0.7, huid0); ctx.lineTo(gm - gh * 0.85, wTop); ctx.lineTo(gm + gh * 0.85, wTop); ctx.lineTo(gm + gh * 0.7, huid0); ctx.closePath(); ctx.fill(); }
  // vat: lumen en wand (met gat bovenin)
  ctx.fillStyle = rgba(TR.plasma, 0.12); ctx.fillRect(0, VY - R, W, 2 * R);
  ctx.fillStyle = TR.spier; ctx.strokeStyle = TR.spierR; ctx.lineWidth = 2;
  ctx.fillRect(0, wTop, gm - gh * 0.85, wd); ctx.fillRect(gm + gh * 0.85, wTop, W, wd); ctx.fillRect(0, VY + R, W, wd);
  ctx.beginPath(); ctx.moveTo(0, VY - R); ctx.lineTo(gm - gh * 0.85, VY - R); ctx.lineTo(gm - gh * 0.85, wTop); ctx.moveTo(gm + gh * 0.85, wTop); ctx.lineTo(gm + gh * 0.85, VY - R); ctx.lineTo(W, VY - R); ctx.moveTo(0, VY + R); ctx.lineTo(W, VY + R); ctx.stroke();
  // stollingsfactoren in het plasma (kleine ruitjes), worden actief bij de wond
  if (factoren > 0.01) for (let i = 0; i < 34; i++) { const xx = (hash(i * 7) * W + t * 60 * flow) % W, yy = VY + (hash(i * 7 + 1) - 0.5) * 1.7 * R; const near = Math.exp(-(((xx - gm) / 260) ** 2)) * factorA; ctx.save(); ctx.globalAlpha *= factoren; ctx.translate(xx, yy); ctx.rotate(0.785); ctx.fillStyle = near > 0.3 ? C.goud : rgba(C.er, 0.75); ctx.fillRect(-7, -7, 14, 14); ctx.restore(); }
  // fibrinogeen: losse korte staafjes
  if (fibrinogeen > 0.01) for (let i = 0; i < 40; i++) { const xx = (hash(i * 9 + 4) * W + t * 50 * flow) % W, yy = VY + (hash(i * 9 + 5) - 0.5) * 1.7 * R; const conv = net * Math.exp(-(((xx - gm) / 200) ** 2)); ctx.save(); ctx.globalAlpha *= fibrinogeen * (1 - conv); ctx.translate(xx, yy); ctx.rotate(hash(i) * 3 + t * 0.3); ctx.strokeStyle = B3.fibrine; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(11, 0); ctx.stroke(); ctx.restore(); }
  // stroom: rode bloedcellen en plaatjes
  const sp = lerp(230, 130, samen) * flow;
  for (let i = 0; i < 44; i++) { const xx = (hash(i * 3) * (W + 80) + t * sp * (0.85 + 0.3 * hash(i * 3 + 9))) % (W + 80) - 40; const yy = VY + (hash(i * 3 + 1) - 0.5) * 1.6 * R; rbc(ctx, xx, yy, 17, { rot: hash(i) * 3 + t * 0.5, squash: 0.55 + 0.45 * hash(i * 3 + 2) }); }
  for (let i = 0; i < 16; i++) { const xx = (hash(i * 5 + 2) * (W + 80) + t * sp * 0.9) % (W + 80) - 40; const yy = VY + (hash(i * 5 + 3) - 0.5) * 1.5 * R; plaatje(ctx, xx, yy, 7, { rot: i + t }); }
  // lek: cellen omhoog door het wondkanaal, druppel op de huid
  if (lek > 0.01 && snee > 0.5) for (let i = 0; i < 16; i++) { const ph = (t * 0.45 + hash(i * 17)) % 1; const yy = lerp(VY - R + 10, huid0 - 10, ph); const xx = gm + (hash(i * 17 + 1) - 0.5) * gh * 1.2 * (1 - 0.3 * ph); rbc(ctx, xx, yy, 15, { a: lek, rot: i + t, squash: 0.7 }); }
  if (druppel > 0.01) { ctx.save(); ctx.beginPath(); ctx.ellipse(gm, huid0, 110 * druppel, 54 * druppel, 0, Math.PI, 0); ctx.closePath(); shape(ctx, rgba(TR.rijk, 0.85), lighten(TR.rijk, 0.3), 2); ctx.restore(); }
  // plaatjes die plakken: eerst aan de wand, dan aan elkaar
  const plak = []; for (let i = 0; i < 14; i++) { const k = i / 14; const side = i % 2 ? 1 : -1; const xx = i < 4 ? gm + side * (gh * 0.85 + 4) - side * 10 : gm + (hash(i * 23) - 0.5) * gh * 1.5; const yy = i < 4 ? VY - R - 6 - (i >> 1) * 16 : lerp(VY - R + 6, wTop - 40, hash(i * 23 + 1)); plak.push([xx, yy, k]); }
  plak.forEach(([xx, yy, k], i) => { const u = clamp((prop - k) * 6, 0, 1); if (u <= 0.01) return; const sx = lerp(xx - 260, xx, ease(u)), sy = lerp(VY + 20, yy, ease(u)); plaatje(ctx, sx, sy, 13, { rot: i * 1.3, actief: ease(u) });
    if (sein > 0.01 && u > 0.9) for (let j = 0; j < 3; j++) { const ph = (t * 0.7 + j / 3 + i * 0.13) % 1; const an = i * 2.1 + j * 2.09; ctx.save(); ctx.globalAlpha *= sein * (1 - ph); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(sx + Math.cos(an) * (16 + ph * 60), sy + Math.sin(an) * (16 + ph * 60), 4, 0, 6.283); ctx.fill(); ctx.restore(); } });
  // fibrinenet over de wond, met verstrikte rode bloedcellen
  if (net > 0.01) { const ys = huid0 + 6, ye = VY - R + 40; ctx.save(); ctx.strokeStyle = B3.fibrine; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    for (let i = 0; i < 26; i++) { const k = clamp((net * 26 - i), 0, 1); if (k <= 0) continue; const x0 = gm + (hash(i * 31) - 0.5) * gh * 2.4, y0 = lerp(ys, ye, hash(i * 31 + 1)), x1 = gm + (hash(i * 31 + 2) - 0.5) * gh * 2.4, y1 = lerp(ys, ye, hash(i * 31 + 3)); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); ctx.stroke(); }
    ctx.restore();
    for (let i = 0; i < 9; i++) { const k = clamp(strik * 9 - i, 0, 1); if (k <= 0) continue; const xx = gm + (hash(i * 41) - 0.5) * gh * 1.7, yy = lerp(huid0 + 30, VY - R, hash(i * 41 + 1)); rbc(ctx, lerp(xx - 160, xx, ease(k)), lerp(VY, yy, ease(k)), 16, { rot: i, squash: 0.75 }); } }
  if (korst > 0.01) { ctx.save(); ctx.globalAlpha *= korst; ctx.beginPath(); ctx.moveTo(gm - gh * 0.95, huid0 - 6); ctx.quadraticCurveTo(gm, huid0 - 30, gm + gh * 0.95, huid0 - 6); ctx.lineTo(gm + gh * 0.7, huid1); ctx.lineTo(gm - gh * 0.7, huid1); ctx.closePath(); shape(ctx, B3.korst, lighten(B3.korst, 0.3), 2); ctx.restore(); }
  return { gm, wTop, R }; }
// bloedvat zonder wond (trombose): stolsel groeit op de wand; afsluiten = 0..1
function tromboseVat(ctx, t, o = {}) { const { groei = 0, dicht = 0 } = o; const VY = 520, R = 150, wd = 34, cx = 900; micro(ctx);
  ctx.fillStyle = rgba(B3.weefsel, 0.14); ctx.fillRect(0, 200, W, 690);
  ctx.fillStyle = rgba(TR.plasma, 0.12); ctx.fillRect(0, VY - R, W, 2 * R); ctx.fillStyle = TR.spier; ctx.fillRect(0, VY - R - wd, W, wd); ctx.fillRect(0, VY + R, W, wd);
  const g = ease(groei); const stR = lerp(20, R * 1.02, g);
  // cellen stromen; is het vat dicht, dan staat de stroom stil
  const sp = 220 * (1 - ease(dicht)); const tt = t * (1 - ease(dicht)) + (dicht > 0 ? 0 : 0);
  for (let i = 0; i < 46; i++) { const base = hash(i * 3) * (W + 80) - 40; let xx = (base + 40 + t * sp * (0.85 + 0.3 * hash(i * 3 + 9))) % (W + 80) - 40; const yy = VY + (hash(i * 3 + 1) - 0.5) * 1.6 * R;
    if (Math.abs(xx - cx) < stR * 1.3 && hash(i * 3 + 1) < 0.5 + 0.5 * g) continue;
    rbc(ctx, xx, yy, 18, { rot: hash(i) * 3 + tt * 0.5, squash: 0.55 + 0.45 * hash(i * 3 + 2) }); }
  // stolsel: plaatjes, fibrine en rode cellen, vast aan de bovenwand
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, VY - R, stR * 1.25, stR * 2.0, 0, 0, Math.PI); ctx.closePath(); shape(ctx, rgba(TR.arm, 0.9), B3.fibrine, 2); ctx.clip();
  ctx.strokeStyle = rgba(B3.fibrine, 0.8); ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(cx + (hash(i * 3) - 0.5) * 2.4 * stR, VY - R + hash(i * 3 + 1) * stR); ctx.lineTo(cx + (hash(i * 3 + 2) - 0.5) * 2.4 * stR, VY - R + hash(i * 3 + 4) * stR * 2); ctx.stroke(); }
  for (let i = 0; i < 10; i++) plaatje(ctx, cx + (hash(i * 7) - 0.5) * 2 * stR, VY - R + 8 + hash(i * 7 + 1) * stR * 1.7, 9, { rot: i, actief: 1 });
  ctx.restore();
  ctx.strokeStyle = TR.spierR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, VY - R); ctx.lineTo(W, VY - R); ctx.moveTo(0, VY + R); ctx.lineTo(W, VY + R); ctx.stroke();
  return { cx, VY, R, stR }; }

// ---------- Schema: X-chromosoom ----------
function xChrom(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.strokeStyle = C.kernR; ctx.lineWidth = 22 * s; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 40 * s, y + d * 70 * s); ctx.quadraticCurveTo(x, y, x + 40 * s, y - d * 70 * s); ctx.stroke(); } ctx.fillStyle = C.kern; ctx.beginPath(); ctx.arc(x, y, 12 * s, 0, 6.283); ctx.fill(); ctx.restore(); }
function bergje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 90 * s, y); ctx.lineTo(x - 20 * s, y - 100 * s); ctx.lineTo(x + 20 * s, y - 50 * s); ctx.lineTo(x + 50 * s, y - 80 * s); ctx.lineTo(x + 100 * s, y); ctx.closePath(); shape(ctx, C.berg, C.bergTop, 2); ctx.beginPath(); ctx.moveTo(x - 38 * s, y - 78 * s); ctx.lineTo(x - 20 * s, y - 100 * s); ctx.lineTo(x - 4 * s, y - 80 * s); ctx.closePath(); ctx.fillStyle = C.bergTop; ctx.fill(); ctx.restore(); }

// ---------- plasma-inhoud (Micro, s05) ----------
function plasmaInhoud(ctx, cx, cy, r, t, sh) { // sh: alfa per soort
  const pos = (i, amp = 18) => { const an = hash(i * 7 + 3) * 6.283, d = Math.sqrt(hash(i * 7 + 4)) * r * 0.88; const w = wander(i, t, amp, 0.5); return [cx + Math.cos(an) * d + w.x, cy + Math.sin(an) * d + w.y]; };
  for (let i = 0; i < 70; i++) { const [x, y] = pos(i, 14); waterMol(ctx, x, y, 6, sh.water * 0.85); }
  for (let i = 0; i < 6; i++) { const [x, y] = pos(100 + i); inv(ctx, sh.glucose, () => hexagon(ctx, x, y, 14, rgba(V.kh, 0.55), V.kh, 1.5, 0)); }
  for (let i = 0; i < 5; i++) { const [x, y] = pos(120 + i); ctx.save(); ctx.globalAlpha *= sh.amino; bead(ctx, x, y, 11, i * 3, {}); ctx.restore(); }
  for (let i = 0; i < 7; i++) { const [x, y] = pos(140 + i, 22); mineral(ctx, x, y, 7, sh.zout); }
  for (let i = 0; i < 3; i++) { const [x, y] = pos(160 + i); hormoonVorm(ctx, x, y, 11, i ? 'insuline' : 'adrenaline', sh.hormoon); }
  for (let i = 0; i < 5; i++) { const [x, y] = pos(180 + i, 20); ctx.save(); ctx.globalAlpha *= sh.afval; ctx.fillStyle = C.text2; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.283); ctx.fill(); ctx.fillStyle = '#6E7889'; ctx.beginPath(); ctx.arc(x - 11, y, 5.5, 0, 6.283); ctx.arc(x + 11, y, 5.5, 0, 6.283); ctx.fill(); ctx.restore(); }
  // eiwitten: kluwens (water vasthouden), Y-vormen (antistoffen), staafjes (stolling)
  for (let i = 0; i < 3; i++) { const [x, y] = pos(200 + i, 10); ctx.save(); ctx.globalAlpha *= sh.eiwit; blob(ctx, x, y, 30, 24, 0.12, i * 2 + 1, t); shape(ctx, rgba(B3.wit, 0.3), B3.wit, 2);
    if (sh.waterVast > 0.01) for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283 + t * 0.4; waterMol(ctx, x + Math.cos(an) * 44, y + Math.sin(an) * 38, 6, sh.waterVast); } ctx.restore(); }
  for (let i = 0; i < 3; i++) { const [x, y] = pos(220 + i, 10); ctx.save(); ctx.globalAlpha *= sh.anti; ctx.translate(x, y); ctx.rotate(i * 2); ctx.strokeStyle = B3.wit; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-16, -18); ctx.moveTo(0, 0); ctx.lineTo(16, -18); ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 3; i++) { const [x, y] = pos(240 + i, 10); ctx.save(); ctx.globalAlpha *= sh.stol; ctx.translate(x, y); ctx.rotate(i * 1.7 + 0.4); ctx.strokeStyle = B3.fibrine; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.stroke(); for (const d of [-26, 0, 26]) { ctx.beginPath(); ctx.arc(d, 0, 7, 0, 6.283); ctx.fillStyle = B3.fibrine; ctx.fill(); } ctx.restore(); }
}
// lijstregel met een icoontje-kleur links
function lijst(ctx, x, y, s, a, col, hi = 0, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + 10, y - 11, 9, 0, 6.283); ctx.fill(); text(ctx, s, x + 34, y, fTekst(px, hi > 0.5 ? 700 : 500), hi > 0.5 ? C.goud : C.text, 'left'); ctx.restore(); }

// ---------- cellen in een kader die op en af gaan (s09) ----------
function celVeld(ctx, x0, y0, w, h, t, o = {}) { const { a = 1, nieuw = 0, vraag = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y0, w, h, 20); shape(ctx, rgba(C.bgMicro, 0.8), C.line, 1.5);
  const cols = 6, rows = 4; for (let i = 0; i < cols * rows; i++) { const cx = x0 + (i % cols + 0.5) * w / cols, cy = y0 + (Math.floor(i / cols) + 0.5) * h / rows; const per = 5 + hash(i) * 4, ph = ((t + hash(i * 3) * per) % per) / per;
    const life = ph < 0.08 ? ph / 0.08 : ph > 0.85 ? (1 - ph) / 0.15 : 1; const oud = clamp((ph - 0.6) / 0.25, 0, 1);
    rbc(ctx, cx, cy, 30, { a: life, oud, seed: i, rot: i });
    if (ph < 0.12 && nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw * (1 - ph / 0.12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, 6.283); ctx.stroke(); if (vraag > 0.01) text(ctx, '?', cx + 34, cy - 24, fTitel(40), rgba(C.goud, vraag), 'center'); ctx.restore(); } }
  ctx.restore(); }

// ======================================================================
const SCENES = {
  title(ctx, t) { const g = buisje(ctx, 1500, 170, 190, 640, clamp((t - 0.6) / 3, 0, 1), t, {}); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const pA = 1 - q.on('Eerst', 1, 0.8);
    // donor met slangetje naar het zakje
    const vol = clamp((t - q.at('halve')) / 1.6, 0, 1) * 0.85 + 0.12;
    inv(ctx, pA, () => { person(ctx, 520, 860, 560, 1, { armR: { a1: 1.2, a2: 1.35 } });
      ctx.strokeStyle = TR.arm; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(735, 520); ctx.quadraticCurveTo(880, 640, 1010, 280); ctx.stroke();
      particleFlow(ctx, [[735, 520], [820, 560], [900, 470], [1010, 290]], 6, t, 160, TR.rijkL, 4, 3, q.on('halve', 1));
      tag(ctx, 'bloed geven bij Sanquin', 960, 140, C.line, q.on('Sanquin', 1));
      tag(ctx, '≈ 0,5 liter', 1460, 560, C.goud, q.on('liter', 1)); });
    // zakje: van de donor naar de centrifuge
    const m = q.on('Eerst', 1, 1.2); const zx = lerp(1100, 860, m), zy = lerp(420, 677, m), zs = lerp(1, 0.32, m);
    const indraai = q.on('draait', 1, 1.2);
    zakje(ctx, zx, zy, 240 * zs, 300 * zs, { vol, t, a: 1 - indraai });
    const cA = q.on('Eerst', 1, 1.0); const spin = t > q.at('draait') ? (t - q.at('draait')) ** 2 * 1.2 : 0; const vaart = clamp((t - q.at('draait')) / 1.5, 0, 1);
    centrifuge(ctx, 860, 470, 300, spin, { a: cA, vaart, deksel: q.on('zakje', 3) * 0.0 });
    tag(ctx, 'centrifuge: draait heel snel rond', 860, 860, C.goud, q.on('centrifuge', 1) * (1 - q.on('Wat', 1)));
    vraagteken(ctx, 1480, 430, q.on('Wat', 1), 160);
    tag(ctx, 'wat zie je daarna in het zakje?', 860, 860, C.goud, q.on('Wat', 1));
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const X = 760, YT = 150, BW = 210, BH = 680;
    const sep = clamp((t - 0.4) / 2.6, 0, 1); const g = buisje(ctx, X, YT, BW, BH, sep, t, {});
    tag(ctx, 'antwoord b', X, 110, C.goud, (1 - q.on('Boven', 1)) * ramp(t, 0, 0.4));
    const yPl = (g.plasma[0] + g.plasma[1]) / 2, yR = (g.rood[0] + g.rood[1]) / 2;
    label(ctx, 'bloedplasma', 'GEEL, HELDER', X + 60, yPl, 1220, yPl - 40, q.on('bloedplasma', 1), TR.plasma);
    label(ctx, 'bloedcellen', 'DONKERROOD', X + 60, yR, 1220, yR + 20, q.on('bloedcellen', 1), TR.rijkL);
    label(ctx, 'dun wit laagje', '', X + 60, (g.wit[0] + g.wit[1]) / 2, 1220, (g.wit[0] + g.wit[1]) / 2 + 10, q.on('laagje', 1), C.text);
    // cellen zijn iets zwaarder: pijltjes omlaag
    const zw = fade(q, 'zwaarder', 'Ongeveer'); if (zw > 0.01) { for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; arrow(ctx, X - 170, lerp(g.top + 60, g.rood[0] + 80, ph) - 50, X - 170, lerp(g.top + 60, g.rood[0] + 80, ph) + 10, TR.rijkL, zw * (1 - ph), 4); } tag(ctx, 'cellen: iets zwaarder dan plasma', X, 870, C.goud, zw); }
    vHaak(ctx, X - BW / 2 - 40, g.plasma[0], g.plasma[1] - 4, '≈ 55 %', TR.plasma, q.on('vijfenvijftig', 1));
    vHaak(ctx, X - BW / 2 - 40, g.wit[1] + 4, g.rood[1], '≈ 45 %', TR.rijkL, q.on('rest', 1));
    tag(ctx, 'plasma: geel, niet rood', X, 870, TR.plasma, q.on('geel', 1) * (1 - ramp(t, q.at('kleur') - 0.9, 0.4)));
    tag(ctx, 'de rode kleur komt van de cellen', X, 870, TR.rijkL, ramp(t, q.at('kleur') - 0.5, 0.5));
    if (q.on('kleur', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('kleur', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, X - BW / 2 - 12, g.rood[0] - 10, BW + 24, g.rood[1] - g.rood[0] + BW * 0.12, 18); ctx.stroke(); ctx.restore(); }
  },

  s05(ctx, t, q) { bg(ctx, 'schema'); const X = 250, YT = 200, BW = 150, BH = 560;
    const g = buisje(ctx, X, YT, BW, BH, 1, t, {}); const sy = g.plasma[0] + (g.plasma[1] - g.plasma[0]) * 0.45;
    const sh = { water: lerp(0.35, 1, q.on('water', 1)), glucose: q.on('Glucose', 1), amino: q.on('aminozuren', 1), zout: q.on('Zouten', 1), hormoon: q.on('hormonen', 1), afval: q.on('ureum', 1), eiwit: q.on('eiwitten', 1), waterVast: q.on('vast', 1), anti: q.on('antistoffen', 1), stol: q.on('stolling', 1) };
    zoomCircle(ctx, 960, 460, 360, X + 40, sy, 'plasma · schematisch', 1, () => { micro(ctx); plasmaInhoud(ctx, 960, 460, 360, t, sh); });
    const L = 1370; const cur = (w1, w2) => q.on(w1, 1) * (1 - (w2 ? q.on(w2, 1) : 0));
    lijst(ctx, L, 230, '≈ 9/10 water', q.on('tiende', 1), C.teal, cur('tiende', 'Glucose'));
    lijst(ctx, L, 300, 'glucose, aminozuren', q.on('Glucose', 1), V.kh, cur('Glucose', 'Zouten'));
    lijst(ctx, L, 370, 'zouten, hormonen', q.on('Zouten', 1), V.neutraal, cur('Zouten', 'afvalstoffen'));
    lijst(ctx, L, 440, 'afval: ureum, CO₂', q.on('afvalstoffen', 1), C.text2, cur('afvalstoffen', 'eiwitten'));
    lijst(ctx, L, 530, 'eiwitten', q.on('eiwitten', 1), B3.wit, cur('eiwitten', 'vast'));
    regel(ctx, '· houden water vast', L + 34, 585, q.on('vast', 1), q.on('vast', 1) * (1 - q.on('antistoffen', 1)) > 0.5 ? C.goud : C.text2, 32);
    regel(ctx, '· antistoffen', L + 34, 635, q.on('antistoffen', 1), q.on('antistoffen', 1) * (1 - q.on('stolling', 1)) > 0.5 ? C.goud : C.text2, 32);
    regel(ctx, '· nodig voor de stolling', L + 34, 685, q.on('stolling', 1), q.on('stolling', 1) > 0.5 ? C.goud : C.text2, 32);
    tag(ctx, 'opgelost: je bloed brengt het rond', 960, 870, C.line, fade(q, 'rondbrengt', 'Glucose'));
  },

  s06(ctx, t, q) { const pB = q.on('bloedcel', 2, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; bg(ctx, 'schema'); const X = 250, g = buisje(ctx, X, 200, 150, 560, 1, t, {});
      zoomCircle(ctx, 900, 460, 360, X + 40, (g.rood[0] + g.rood[1]) / 2, 'rode laag · vergroot', 1, () => { micro(ctx); for (let i = 0; i < 60; i++) { const an = hash(i * 5) * 6.283, d = Math.sqrt(hash(i * 5 + 1)) * 380; const w = wander(i, t, 6, 0.4); rbc(ctx, 900 + Math.cos(an) * d + w.x, 460 + Math.sin(an) * d + w.y, 34, { rot: hash(i) * 3, squash: 0.6 + 0.4 * hash(i * 5 + 2), a: q.on('rode', 1) } ); } });
      // kubieke millimeter
      inv(ctx, q.on('millimeter', 1), () => { const cx = 1560, cy = 330, s = 120; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(cx - s / 2, cy - s / 2, s, s); ctx.moveTo(cx - s / 2, cy - s / 2); ctx.lineTo(cx - s / 2 + 44, cy - s / 2 - 44); ctx.lineTo(cx + s / 2 + 44, cy - s / 2 - 44); ctx.lineTo(cx + s / 2, cy - s / 2); ctx.moveTo(cx + s / 2 + 44, cy - s / 2 - 44); ctx.lineTo(cx + s / 2 + 44, cy + s / 2 - 44); ctx.lineTo(cx + s / 2, cy + s / 2); ctx.stroke();
        text(ctx, '1 mm³', cx + 20, cy + s / 2 + 56, fTekst(36, 700), C.text, 'center'); });
      inv(ctx, q.on('speldenknop', 1), () => { text(ctx, '≈ een speldenknop', 1580, 510, fTekst(32), C.text2, 'center'); });
      inv(ctx, q.on('miljoen', 1), () => { text(ctx, '≈ 5 miljoen', 1580, 640, fTitel(64), C.goud, 'center'); text(ctx, 'rode bloedcellen', 1580, 690, fTekst(32), C.text, 'center'); });
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; micro(ctx); const bob = Math.sin(t * 1.2) * 8;
      rbc(ctx, 640, 450 + bob, 230, { hb: q.on('hemoglobine', 1), seed: 3 });
      const zij = q.on('midden', 1); rbcZij(ctx, 1380, 450 - bob, 230, { a: zij });
      label(ctx, 'dunner in het midden', '', 1380, 450 - bob, 1380, 200, zij, C.text);
      label(ctx, 'dikker aan de rand', '', 1590, 450 - bob - 30, 1500, 700, q.on('rand', 1), C.text);
      metaText(ctx, 'van voren', 640, 770, C.grain, 'center', 26); metaText(ctx, 'van opzij', 1380, 770, C.grain, 'center', 26 * zij > 1 ? 26 : 26);
      tag(ctx, 'geen kern', 640, 160, C.goud, fade(q, 'kern', 'hemoglobine'));
      tag(ctx, 'vol hemoglobine: vervoert zuurstof', 960, 870, C.goud, q.on('hemoglobine', 1));
      if (q.on('zuurstof', 1) > 0.01) for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 + t * 0.3, d = 120 + 60 * hash(i); o2(ctx, 640 + Math.cos(an) * d, 450 + bob + Math.sin(an) * d, 9, q.on('zuurstof', 1)); }
      ctx.restore(); }
  },

  s07(ctx, t, q) { const pB = q.on('longen', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; micro(ctx);
      rbc(ctx, 480, 460, 270, { hb: 1, seed: 3 });
      zoomCircle(ctx, 1320, 440, 330, 560, 400, 'hemoglobinemolecuul · schematisch', 1, () => { micro(ctx); hbMol(ctx, 1320, 440, 210, { fe: q.on('ijzer', 1), t }); });
      label(ctx, 'eiwit', '', 1320 - 190, 440 + 150, 1080, 760, q.on('eiwit', 1) * (1 - q.on('miljoenen', 1)), C.text);
      label(ctx, 'ijzer', 'IN ELKE HEEMGROEP', 1320 + 88, 440 - 88, 1060, 110, q.on('ijzer', 1) * (1 - q.on('miljoenen', 1)), C.goud, 'right');
      tag(ctx, 'honderden miljoenen per rode bloedcel', 480, 860, C.goud, q.on('miljoenen', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; bg(ctx, 'schema');
      // longen links, weefsels rechts, bloed loopt rond
      const LX = 330, TX = 1590, YT = 330, YB = 640; const lus = [[LX, (YT + YB) / 2], [LX + 120, YT], [TX - 120, YT], [TX, (YT + YB) / 2], [TX - 120, YB], [LX + 120, YB], [LX, (YT + YB) / 2]];
      const longHi = fade(q, 'bindt', 'weefsels'), weefHi = fade(q, 'weefsels', 'Hemoglobine', 1, 4);
      roundRect(ctx, LX - 180, 330, 300, 310, 40); shape(ctx, rgba('#D98C8C', 0.18), longHi > 0.5 ? C.goud : rgba('#D98C8C', 0.8), longHi > 0.5 ? 3 : 2);
      text(ctx, 'longen', LX - 30, 300, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'veel zuurstof', LX - 30, 690, C.grain, 'center', 26);
      roundRect(ctx, TX - 120, 330, 300, 310, 40); shape(ctx, rgba(B3.weefsel, 0.22), weefHi > 0.5 ? C.goud : B3.weefsel, weefHi > 0.5 ? 3 : 2);
      inv(ctx, q.on('weefsels', 1), () => { text(ctx, 'weefsels', TX + 30, 300, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'weinig zuurstof', TX + 30, 690, C.grain, 'center', 26); });
      for (let i = 0; i < 22; i++) { const w = wander(i, t, 30, 0.6); o2(ctx, LX - 60 + (hash(i * 3) - 0.5) * 200 + w.x, 485 + (hash(i * 3 + 1) - 0.5) * 230 + w.y, 7, 1); }
      for (let i = 0; i < 4; i++) { const w = wander(i + 30, t, 30, 0.6); o2(ctx, TX + 60 + (hash(i * 3 + 7) - 0.5) * 180 + w.x, 485 + (hash(i * 3 + 8) - 0.5) * 220 + w.y, 7, q.on('weefsels', 1)); }
      ctx.save(); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 46; ctx.lineJoin = 'round'; ctx.beginPath(); gladC(lus).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 40; ctx.stroke(); ctx.restore();
      for (let i = 0; i < 9; i++) { const u = (t * 0.06 + i / 9) % 1; const p = padPunt(lus, u); const v = (u + 0.06) % 1; const load = v < 0.12 ? v / 0.12 : v < 0.5 ? 1 : v < 0.62 ? 1 - (v - 0.5) / 0.12 : 0;
        rbc(ctx, p[0], p[1], 22, { col: mixRood(load), rot: u * 20 }); for (let k = 0; k < 3; k++) o2(ctx, p[0] + Math.cos(k * 2.1 + u * 9) * 30, p[1] + Math.sin(k * 2.1 + u * 9) * 30, 6, load); }
      tag(ctx, 'longen: hemoglobine bindt zuurstof', 960, 200, C.teal, fade(q, 'bindt', 'weefsels'));
      tag(ctx, 'weefsels: hemoglobine laat een deel los', 960, 200, C.teal, fade(q, 'los', 'Hemoglobine', 1, 4));
      regel(ctx, 'met zuurstof: helderrood', 960, 450, q.on('helderrood', 1), TR.rijkL, 36, 'center', 700);
      regel(ctx, 'zonder zuurstof: donkerrood', 960, 560, q.on('donkerrood', 1), TR.armL, 36, 'center', 700);
      inv(ctx, q.on('slagaders', 1), () => { metaText(ctx, 'slagaders · lichter rood', 960, YT - 64, C.grain, 'center', 26); metaText(ctx, 'aders · donkerder rood', 960, YB + 84, C.grain, 'center', 26); });
      tag(ctx, 'bijna alle zuurstof: gebonden aan hemoglobine', 960, 870, C.goud, fade(q, 'Bijna', 'film'));
      tag(ctx, 'meer in de film Gas op reis', 960, 870, C.line, q.on('film', 1));
      metaText(ctx, 'schematisch', 60, 860, C.text2, 'left', 24);
      ctx.restore(); }
  },

  s08(ctx, t, q) { const pB = q.on('Sanquin', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; bg(ctx, 'schema'); const X = 230, g = buisje(ctx, X, 200, 140, 560, 1, t, {});
      const ZX = 880, ZY = 430, ZR = 340;
      const vang = clamp((t - q.at('bestrijden')) / 2.4, 0, 1);
      zoomCircle(ctx, ZX, ZY, ZR, X + 40, (g.wit[0] + g.wit[1]) / 2, 'wit laagje · vergroot', 1, () => { micro(ctx);
        for (let i = 0; i < 5; i++) rbc(ctx, ZX - 260 + i * 60, ZY + 250 + (i % 2) * 40, 28, { rot: i, a: 0.5 + 0.5 * q.on('groter', 1) * 0 + 0.3 });
        for (let i = 0; i < 18; i++) { const an = hash(i * 9) * 6.283, d = 90 + Math.sqrt(hash(i * 9 + 1)) * 250; const w = wander(i, t, 10, 0.6); plaatje(ctx, ZX + Math.cos(an) * d + w.x, ZY - 20 + Math.sin(an) * d * 0.8 + w.y, 10, { rot: i, a: q.on('bloedplaatjes', 1) }); }
        wbc(ctx, ZX - 70, ZY - 60, 84, t, { a: q.on('witte', 2), seed: 2 }); wbc(ctx, ZX + 190, ZY + 70, 70, t, { a: q.on('witte', 2), seed: 5 });
        // bacterie die wordt ingesloten
        if (vang > 0.01 && vang < 1) { const bx = lerp(ZX + 140, ZX + 30, ease(vang)), by = lerp(ZY - 230, ZY - 80, ease(vang)); bacterie(ctx, bx, by, 1.4, 0.6, 1 - clamp((vang - 0.75) / 0.25, 0, 1), C.line, 0); } });
      label(ctx, 'witte bloedcel', 'MET KERN', ZX - 70 + 50, ZY - 60 - 60, 1440, 180, q.on('witte', 2) * (1 - q.on('trombocyten', 1)), C.text, 'left');
      label(ctx, 'rode bloedcel', 'KLEINER', ZX - 200, ZY + 260, 1440, 760, fade(q, 'groter', 'bestrijden'), C.text, 'left');
      label(ctx, 'kern', '', ZX - 70 - 25, ZY - 60 - 10, 1440, 420, fade(q, 'kern', 'bestrijden'), C.goud, 'left');
      label(ctx, 'bloedplaatjes', q.on('trombocyten', 1) > 0.5 ? 'TROMBOCYTEN' : '', ZX + 200, ZY - 200, 1440, 300, q.on('bloedplaatjes', 1) * (q.on('trombocyten', 1) > 0.01 ? 1 : 1 - q.on('witte', 2)) , q.on('trombocyten', 1) > 0.5 ? C.goud : C.text, 'left');
      tag(ctx, 'bestrijden ziekteverwekkers', 880, 870, C.goud, fade(q, 'bestrijden', 'afweer'));
      tag(ctx, 'meer in de reeks over afweer', 880, 870, C.line, fade(q, 'afweer', 'trombocyten'));
      inv(ctx, q.on('stukjes', 1), () => { grooteCel(ctx, 1600, 560, 120, t, { af: 1 }); label(ctx, 'grote cel', 'STUKJES = BLOEDPLAATJES', 1600 - 60, 560 + 90, 1440, 820, 1, C.text, 'left'); });
      tag(ctx, 'nodig om een lek te dichten', 880, 870, C.goud, q.on('lek', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; bg(ctx, 'schema'); const sp = q.on('apart', 1, 1.2);
      zakje(ctx, 960, 360, 300, 360, { sep: 1, t, a: 1 - sp });
      const D = [[480, 'rood', 'rode bloedcellen', 'veel bloed verloren', q.on('verloor', 1)], [960, 'plasma', 'plasma', 'geneesmiddelen', q.on('geneesmiddelen', 1)], [1440, 'plaatjes', 'bloedplaatjes', 'zelf te weinig plaatjes', q.on('bloedplaatjes', 3)]];
      D.forEach(([x, inh, lab, doel, al]) => { const zx = lerp(960, x, ease(sp)); zakje(ctx, zx, 340, 240, 290, { inhoud: inh, vol: 0.85, t, a: sp, label: sp > 0.95 ? lab : '' });
        if (al > 0.01) { arrow(ctx, x, 560, x, 660, C.line, al, 3); tag(ctx, doel, x, 750, C.goud, al); } });
      ctx.restore(); }
  },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema');
    // levensduur: een balk van 120 dagen
    const lx = 200, lw = 700, ly = 340; const u = (t * 0.22) % 1;
    inv(ctx, q.on('leeft', 1), () => { roundRect(ctx, lx, ly, lw, 30, 15); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); roundRect(ctx, lx, ly, lw * u, 30, 15); ctx.fillStyle = rgba(TR.rijk, 0.7); ctx.fill();
      rbc(ctx, lx + lw * u, ly - 70, 40, { oud: clamp((u - 0.6) / 0.35, 0, 1), seed: 4, a: u > 0.95 ? (1 - u) / 0.05 : 1 });
      text(ctx, '0', lx, ly + 76, fTekst(30), C.text2, 'center'); text(ctx, '≈ 120 dagen', lx + lw, ly + 76, fTekst(34, 700), C.goud, 'center'); metaText(ctx, 'levensduur', lx + lw / 2, ly + 140, C.grain, 'center', 26); });
    celVeld(ctx, 1080, 200, 640, 440, t, { a: q.on('aantal', 1), nieuw: q.on('nieuwe', 1), vraag: q.on('nieuwe', 1) });
    tag(ctx, 'aantal blijft gelijk', 1400, 720, C.line, q.on('gelijk', 1));
    vraagteken(ctx, 1400, 860, q.on('denk', 1), 110);
  },

  s11(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('botten', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; tag(ctx, 'antwoord b: het rode beenmerg', 960, 120, C.goud, 1);
      const cards = [[380, 'a. delen in het bloed'], [960, 'b. rood beenmerg'], [1540, 'c. de lever']];
      cards.forEach(([x, s]) => { roundRect(ctx, x - 250, 220, 500, 470, 24); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, s, x, 290, fTekst(36, 700), C.text, 'center'); });
      rbc(ctx, 380, 470, 90, { seed: 2 }); tag(ctx, 'geen kern', 380, 640, C.koraal, q.on('kern', 1)); kruis(ctx, 380, 470, 120, q.on('kern', 1));
      leverVorm(ctx, 1540, 460, 1.1, 1); tag(ctx, 'breekt oude cellen af', 1540, 640, C.koraal, q.on('breekt', 1)); kruis(ctx, 1540, 460, 120, q.on('niet', 2));
      ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = B3.bot; ctx.lineWidth = 70; ctx.beginPath(); ctx.moveTo(960, 360); ctx.lineTo(960, 590); ctx.stroke(); ctx.lineWidth = 34; ctx.strokeStyle = rgba(TR.rijk, q.on('beenmerg', 1)); ctx.stroke(); ctx.restore();
      vinkje(ctx, 1130, 330, 34, q.on('beenmerg', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      const kid = q.on('kind', 1), vol = q.on('volwassene', 1);
      skelet(ctx, 480, 440, 0.68, { a: 1, rood: (n) => kid * ((n === 'onderarm' || n === 'scheenbeen') ? 0.85 : 1) });
      inv(ctx, kid, () => { text(ctx, 'kind', 480, 885, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'rood beenmerg in bijna alle botten', 480, 120, C.grain, 'center', 24); });
      const hi = { borstbeen: fade(q, 'borstbeen', 'ribben') > 0.5, ribben: fade(q, 'ribben', 'bekken') > 0.5, bekken: fade(q, 'bekken', 'wervels') > 0.5, wervels: fade(q, 'wervels', 'uiteinden') > 0.5, dijbeen: q.on('dijbeen', 1) > 0.5, opperarmbeen: q.on('opperarmbeen', 1) > 0.5 };
      const flat = { schedel: 1, borstbeen: 1, ribben: 1, bekken: 1, wervels: 1, sleutelbeen: 1, dijbeen: 1, opperarmbeen: 1 };
      const A = skelet(ctx, 1160, 440, 0.76, { a: vol, volw: true, rood: (n) => (flat[n] || 0) * q.on('platte', 1) * (n === 'dijbeen' || n === 'opperarmbeen' ? q.on('uiteinden', 1) : 1), hi });
      inv(ctx, vol, () => { text(ctx, 'volwassene', 1160, 885, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'vooral in platte botten', 1160, 120, C.grain, 'center', 24); });
      const lab = (k, n, lx, ly, w) => naamBij(ctx, n, '', lx, ly, w, 'left', C.goud); // namen in een kolom naast het skelet, op de hoogte van het bot
      lab('borstbeen', 'borstbeen', 1290, 312, q.on('borstbeen', 1)); lab('ribben', 'ribben', 1290, 368, q.on('ribben', 1)); lab('wervels', 'wervels', 1290, 440, q.on('wervels', 1)); lab('bekken', 'bekken', 1290, 520, q.on('bekken', 1));
      naamBij(ctx, 'uiteinden van dijbeen', '', 1290, 600, q.on('dijbeen', 1), 'left', C.goud);
      naamBij(ctx, 'en opperarmbeen', '', 1050, 300, q.on('opperarmbeen', 1), 'right', C.goud);
      ctx.restore(); }
  },

  s12(ctx, t, q) { micro(ctx); const pB = q.on('stoot', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const tD = q.at('deelt', 1), tB = q.at('blijft'), tA = q.at('andere'), tR = q.at('rijpen', 1), tRo = q.at('rode', 2), tW = q.at('witte'), tG = q.at('grote');
      const stem = (x, y, r, a = 1, gold = 0) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.95, 0.05, 2, t); shape(ctx, rgba(B3.wit, 0.18), gold > 0.5 ? C.goud : B3.wit, gold > 0.5 ? 3 : 2); nucleus(ctx, x, y, r * 0.55, 1, t); ctx.restore(); };
      // stamcel en eerste deling
      const d1 = clamp((t - tD) / 1.2, 0, 1); const S0 = [260, 420];
      if (d1 < 0.02) stem(S0[0], S0[1], 70, q.on('stamcellen', 1));
      else { const sx = lerp(S0[0], 260, d1), sy = lerp(S0[1], 300, ease(d1)); stem(sx, sy, lerp(52, 62, d1), 1, q.on('blijft', 1)); const dx = lerp(S0[0], 470, ease(d1)), dy = lerp(S0[1], 540, ease(d1)); stem(dx, dy, lerp(52, 50, d1), 1); }
      label(ctx, 'stamcel', '', 260 + 50, 420 - 50, 380, 220, q.on('stamcellen', 1) * (1 - q.on('deelt', 1)), C.text, 'right');
      label(ctx, 'blijft stamcel', '', 260 + 40, 300 - 50, 420, 160, q.on('blijft', 1), C.goud, 'right');
      // de andere dochter deelt nog vaak
      const gens = 3; const pos = (g, i) => [470 + (g + 1) * 190, 540 + (i - (2 ** (g + 1) - 1) / 2) * lerp(150, 46, g / 2)];
      for (let g2 = 0; g2 < gens; g2++) { const tg = tA + 0.8 + g2 * 0.7; const k = clamp((t - tg) / 0.6, 0, 1); if (k <= 0) continue; for (let i = 0; i < 2 ** (g2 + 1); i++) { const p = pos(g2, i); const par = g2 === 0 ? [470, 540] : pos(g2 - 1, i >> 1);
        ctx.save(); ctx.globalAlpha *= 0.35 * k; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(par[0], par[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore();
        const rijp = g2 === gens - 1 ? q.on('rijpen', 1) : 0; const x = lerp(par[0], p[0], ease(k)), y = lerp(par[1], p[1], ease(k)); stem(x, y, lerp(38, 20, g2 / 2), 1 - rijp * 0.6); } }
      tag(ctx, 'deelt zich nog vaak', 860, 140, C.goud, fade(q, 'vaak', 'rijpen'));
      tag(ctx, 'dan rijpen ze tot bloedcellen', 860, 140, C.goud, fade(q, 'rijpen', 'rode', 1, 2));
      // uitkomsten
      const OX = 1560; const pijl = (y, al) => arrow(ctx, 1300, 540, OX - 150, y, C.line, al, 2);
      inv(ctx, q.on('rode', 2), () => { pijl(250, 1); for (let i = 0; i < 3; i++) rbc(ctx, OX - 60 + i * 80, 250 + Math.sin(t + i) * 6, 30, { rot: i }); text(ctx, 'rode bloedcellen', OX + 20, 330, fTekst(30, 600), C.text, 'center'); });
      inv(ctx, q.on('witte', 1), () => { pijl(500, 1); wbc(ctx, OX - 40, 500, 46, t, { seed: 3 }); wbc(ctx, OX + 80, 500, 40, t, { seed: 6 }); text(ctx, 'witte bloedcellen', OX + 20, 590, fTekst(30, 600), C.text, 'center'); });
      inv(ctx, q.on('grote', 1), () => { pijl(730, 1); grooteCel(ctx, OX - 20, 720, 70, t, { af: q.on('bloedplaatjes', 1) }); text(ctx, 'grote cel → bloedplaatjes', OX + 20, 850, fTekst(30, 600), C.text, 'center'); });
      tag(ctx, 'alle bloedcellen: uit dezelfde soort stamcel', 860, 140, C.goud, q.on('Alle', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      const tK = q.at('uit', 2); const k = clamp((t - q.at('stoot')) / 2.2, 0, 1); const hb = q.on('hemoglobine', 1); const sl = q.on('slijt', 1, 1.5);
      const X = 760, Y = 450; const r = lerp(150, 140, k);
      if (k < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - k; blob(ctx, X, Y, r, r * 0.95, 0.04, 2, t); shape(ctx, rgba(TR.rijk, 0.25 + 0.3 * k), TR.rijkL, 2); ctx.restore(); }
      rbc(ctx, X, Y, r, { a: k, hb, oud: sl * 0.9, seed: 5 });
      // kern wordt uitgestoten
      const kx = lerp(X + 20, X + 520, ease(k)), ky = lerp(Y, Y + 120, ease(k)); nucleus(ctx, kx, ky, 60, 1 - clamp((t - q.at('Daarna', 2) - 1) / 1.5, 0, 1), t);
      label(ctx, 'kern', 'WORDT UITGESTOTEN', kx + 40, ky - 40, 1500, 300, q.on('kern', 1) * (1 - q.on('Daarna', 2)), C.goud, 'left');
      tag(ctx, 'meer plek voor hemoglobine', X, 120, TR.rijkL, fade(q, 'hemoglobine', 'eiwitten'));
      tag(ctx, 'geen kern: geen nieuwe eiwitten', X, 120, C.goud, fade(q, 'eiwitten', 'slijt'));
      tag(ctx, 'daarom slijt hij', X, 120, C.koraal, q.on('slijt', 1));
      ctx.restore(); }
  },

  s13(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('hebt', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const hi = fade(q, 'milt', 'ijzer');
      leverVorm(ctx, 760, 400, 1.0, q.on('lever', 1), hi > 0.5); miltVorm(ctx, 760, 610, 1.1, q.on('milt', 1), hi > 0.5);
      inv(ctx, q.on('milt', 1), () => { text(ctx, 'milt', 870, 680, fTekst(32, 600), C.text, 'left'); }); inv(ctx, q.on('lever', 1), () => { text(ctx, 'lever', 760, 290, fTekst(32, 600), C.text, 'center'); });
      // oude cel reist naar milt en lever
      const tr = clamp((t - q.at('afgebroken', 1) + 1.4) / 1.8, 0, 1); const cx = lerp(240, 700, ease(tr)), cy = lerp(500, 520, tr);
      rbc(ctx, cx, cy, 70, { oud: 1, seed: 7, a: 1 - clamp((t - q.at('ijzer')) / 0.6, 0, 1) });
      inv(ctx, (1 - tr) * q.on('versleten', 1), () => { tag(ctx, 'na ≈ 120 dagen: versleten', 260, 330, C.koraal, 1); });
      // drie producten
      const prod = [[260, 'ijzer', '→ terug naar het beenmerg', q.on('ijzer', 1), q.on('beenmerg', 1)], [480, 'eiwitdeel', '→ aminozuren', q.on('eiwitdeel', 1), q.on('aminozuren', 1)], [700, 'rest', '→ galkleurstof', q.on('rest', 1), q.on('galkleurstof', 1)]];
      prod.forEach(([y, a1, a2, al, al2], i) => { if (al <= 0.01) return; arrow(ctx, 950, 500, 1130, y, C.line, al, 2.5); const ph = (t * 0.6 + i * 0.3) % 1; const px = lerp(950, 1130, ph), py = lerp(500, y, ph);
        ctx.save(); ctx.globalAlpha *= al; if (i === 0) { ctx.beginPath(); ctx.arc(px, py, 10, 0, 6.283); shape(ctx, '#B8BEC6', '#E6E9EE', 1); } else if (i === 1) bead(ctx, px, py, 9, 2, {}); else { ctx.fillStyle = C.okerD; ctx.beginPath(); ctx.arc(px, py, 9, 0, 6.283); ctx.fill(); } ctx.restore();
        text(ctx, a1, 1170, y + 12, fTekst(36, 700), C.text, 'left'); regel(ctx, a2, 1170 + (i === 0 ? 100 : i === 1 ? 180 : 90), y + 12, al2, i === 0 ? C.goud : C.text, 34, 'left'); });
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      const tS = q.at('sneller'); const drop = t > tS ? clamp((t - tS) / 4, 0, 1) : 0; const level = lerp(0.72, 0.42, ease(drop)) + 0.01 * Math.sin(t * 2);
      bakKraan(ctx, 700, 330, 460, 380, level, q.on('maakt', 1) * 0.9 + 0.1, lerp(0.5, 1, drop) * q.on('kapot', 1), t, 1, { labels: 0, dot: (c, px, py, r, al) => rbc(c, px, py, r * 1.3, { a: al, rot: px }) });
      tag(ctx, '≈ 25 biljoen rode bloedcellen', 930, 160, C.goud, q.on('biljoen', 1));
      regel(ctx, 'afbraak: elke dag ≈ 1/120 deel', 1250, 790, q.on('honderdtwintigste', 1), C.text, 34);
      regel(ctx, 'aanmaak in het beenmerg:', 1250, 250, q.on('beenmerg', 2), C.text, 34); regel(ctx, '≈ 2 miljoen per seconde', 1250, 300, q.on('seconde', 1), C.goud, 40, 'left', 700);
      tag(ctx, 'sneller kapot dan aanmaak: bloedarmoede', 930, 870, C.koraal, q.on('bloedarmoede', 1));
      ctx.restore(); }
  },

  s14(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('bloeddonatie', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const n0 = q.on('weinig', 1), n1 = q.on('nieren', 1), n2 = q.on('beenmerg', 1), n3 = q.on('genoeg', 1);
      kringSchema(ctx, 960, 480, { rx: 540, ry: 270, bw: 470, bh: 120, nodes: [{ t: 'weinig zuurstof', s: 'in je bloed', a: n0, col: C.teal }, { t: 'nieren', s: 'maken het hormoon EPO', a: n1, col: C.goud }, { t: 'beenmerg', s: 'maakt meer rode bloedcellen', a: n2, col: TR.rijkL }, { t: 'weer genoeg', s: 'rode bloedcellen', a: n3, col: C.line }],
        arr: [n1, n2, n3, q.on('minder', 1)], minus: q.on('minder', 1), pulse: q.on('gelijk', 1) > 0.5 ? (t * 0.25) % 1 : -1 });
      bergje(ctx, 560, 250, 0.7, q.on('bergen', 1));
      tag(ctx, 'dan minder EPO', 960, 870, C.goud, fade(q, 'minder', 'gelijk'));
      tag(ctx, 'zo blijft het aantal gelijk', 960, 870, C.groen, q.on('gelijk', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      const tP = q.at('plasma'), tR = q.at('rode', 2);
      grafiek(ctx, 220, 200, 1060, 520, { xmax: 60, ymax: 100, xlab: 'dagen na de donatie', ylab: 'weer aangevuld (%)', xticks: [0, 14, 28, 42, 56], yticks: [0, 50, 100], col: TR.plasma, f: (x) => 100 * (1 - Math.exp(-x / 0.7)), u: clamp((t - tP) / 1.2, 0, 1) });
      grafiek(ctx, 220, 200, 1060, 520, { xmax: 60, ymax: 100, col: TR.rijk, f: (x) => 100 * (1 - Math.exp(-x / 13)), u: clamp((t - tR) / 2.4, 0, 1), a: q.on('rode', 2) });
      regel(ctx, 'plasma: 1 à 2 dagen', 300, 270, q.on('plasma', 1), TR.plasma, 32, 'left', 700); regel(ctx, 'rode bloedcellen: weken', 720, 600, q.on('rode', 2), TR.rijkL, 32, 'left', 700);
      inv(ctx, q.on('acht', 1), () => { const px = 220 + 56 / 60 * 1060; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, 200); ctx.lineTo(px, 720); ctx.stroke(); ctx.setLineDash([]); });
      card(ctx, 1380, 230, 480, 120, 'mannen', '≥ 8 weken ertussen', q.on('acht', 1));
      card(ctx, 1380, 380, 480, 120, 'vrouwen', '≥ 4 maanden', q.on('vrouwen', 1));
      tag(ctx, 'eerst weer genoeg ijzer', 1620, 600, C.goud, q.on('ijzer', 1));
      ctx.restore(); }
  },

  // ---------- H3 ----------
  s15(ctx, t, q) { const tP = q.at('plakken', 1);
    const prop = clamp((t - tP) / (q.at('prop') - tP + 1), 0, 1);
    const snee = ramp(t, 0.2, 0.8); const lek = q.on('stroomt', 1) * (1 - 0.85 * prop);
    const dr = clamp((t - q.at('stroomt')) / 4, 0, 1) * lerp(1, 0.75, 0);
    const G = wond(ctx, t, { snee, samen: q.on('samen', 1, 1.2), prop, lek, sein: q.on('stoffen', 1), factoren: q.on('stollingsfactoren', 1), factorA: q.on('actief', 1), druppel: dr * 0.8 });
    metaText(ctx, 'huid', 60, WD.huid0 - 14, C.grain, 'left', 24); metaText(ctx, 'bloedvat', 60, WD.VY + 10, C.grain, 'left', 24);
    vraagteken(ctx, 1300, 180, fade(q, 'Hoe', 'Eerst'), 120);
    tag(ctx, '1 · het vat trekt zich samen', 960, 120, C.line, fade(q, 'samen', 'plakken'));
    tag(ctx, '2 · bloedplaatjes plakken: een prop', 960, 120, C.goud, fade(q, 'plakken', 'stoffen'));
    tag(ctx, 'plaatjes geven stoffen af', 960, 120, C.teal, fade(q, 'stoffen', 'stollingsfactoren'));
    tag(ctx, '3 · stollingsfactoren worden actief', 960, 120, C.goud, fade(q, 'stollingsfactoren', 'protrombine'));
    const r1 = q.on('protrombine', 1); if (r1 > 0.01) { ctx.save(); ctx.globalAlpha *= r1; roundRect(ctx, 520, 50, 880, 150, 18); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5);
      text(ctx, 'protrombine', 860, 104, fTekst(36, 700), C.text, 'right'); arrow(ctx, 880, 92, 930, 92, C.goud, q.on('trombine', 2), 3); regel(ctx, 'trombine', 945, 104, q.on('trombine', 2), C.goud, 36, 'left', 700);
      arrow(ctx, 1010, 116, 1010, 150, C.goud, q.on('trombine', 3), 3);
      regel(ctx, 'fibrinogeen', 900, 182, q.on('fibrinogeen', 1), C.text, 36, 'right', 700); arrow(ctx, 920, 170, 1100, 170, C.goud, q.on('fibrine', 1), 3); regel(ctx, 'fibrine', 1120, 182, q.on('fibrine', 1), C.goud, 36, 'left', 700);
      ctx.restore(); }
  },

  s16(ctx, t, q) { const pB = q.on('Soms', 1, 0.8), pC = q.on('stollingsfactor', 1, 0.8); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const net = clamp((t - q.at('fibrine') + 0.3) / (q.at('net') - q.at('fibrine') + 1.5), 0, 1);
      wond(ctx, t, { samen: 1, prop: 1, lek: 0.12 * (1 - q.on('stolsel', 1)), fibrinogeen: 1, net, strik: clamp((t - q.at('verstrikt') + 1.2) / 2, 0, 1), korst: q.on('korstje', 1), druppel: 0.8 * (1 - q.on('korstje', 1)) });
      metaText(ctx, 'huid', 60, WD.huid0 - 14, C.grain, 'left', 24); metaText(ctx, 'bloedvat', 60, WD.VY + 10, C.grain, 'left', 24);
      tag(ctx, 'fibrinogeen: opgelost', 960, 120, C.line, fade(q, 'Fibrinogeen', 'fibrine'));
      tag(ctx, 'fibrine: lange draden, een net', 960, 120, C.goud, fade(q, 'fibrine', 'verstrikt'));
      tag(ctx, 'rode bloedcellen raken verstrikt', 960, 120, TR.rijkL, fade(q, 'verstrikt', 'stolsel'));
      label(ctx, 'stolsel', '', 1010, 380, 1320, 330, q.on('stolsel', 1) * (1 - q.on('indrogen', 1)), C.goud, 'left');
      label(ctx, 'korstje', 'AAN DE BUITENKANT', 1020, WD.huid0 - 10, 1320, 180, q.on('korstje', 1) * (1 - q.on('indrogen', 1)), C.text, 'left');
      const ind = fade(q, 'indrogen', 'Soms'); if (ind > 0.01) { ctx.save(); ctx.globalAlpha *= ind; roundRect(ctx, 1220, 60, 660, 160, 18); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); regel(ctx, 'geen indrogen:', 1250, 120, 1, C.goud, 36, 'left', 700); regel(ctx, 'een reeks reacties van eiwitten', 1250, 180, q.on('reeks', 1), C.text, 34); ctx.restore(); }
      tag(ctx, 'ook in je lichaam, bij een blauwe plek', 600, 120, C.line, q.on('blauwe', 1) * (1 - pB));
      ctx.restore(); }
    if (pB > 0.01 && pC < 0.99) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC);
      const g = clamp((t - q.at('stolsel', 2)) / (q.at('afsluiten') - q.at('stolsel', 2) + 0.5), 0, 1);
      tromboseVat(ctx, t, { groei: g, dicht: q.on('afsluiten', 1) });
      tag(ctx, 'stolsel in een vat zonder wond: trombose', 960, 120, C.goud, fade(q, 'trombose', 'afsluiten'));
      tag(ctx, 'het vat raakt afgesloten', 960, 120, C.koraal, fade(q, 'afsluiten', 'been'));
      tag(ctx, 'in je been, na lang stilzitten', 960, 120, C.line, fade(q, 'been', 'hart'));
      tag(ctx, 'in je hart: hartinfarct', 960, 120, C.koraal, q.on('hart', 1));
      metaText(ctx, 'geen wond', 60, 310, C.grain, 'left', 24);
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      wond(ctx, t, { samen: 0.6, prop: 0.5, lek: 1, druppel: clamp(0.5 + (t - q.at('stollingsfactor')) / 6, 0, 1) });
      roundRect(ctx, 1200, 70, 680, 230, 18); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
      regel(ctx, 'een stollingsfactor mist:', 1230, 130, 1, C.text, 34, 'left', 700); regel(ctx, 'hemofilie: blijft lang bloeden', 1230, 190, q.on('hemofilie', 1), C.goud, 34, 'left', 700);
      xChrom(ctx, 1250, 248, 0.32, q.on('chromosoom', 1)); regel(ctx, 'erfelijk, via het X-chromosoom', 1290, 260, q.on('chromosoom', 1), C.text, 32);
      ctx.restore(); }
  },

  s17(ctx, t, q) { const pB = q.on('meeste', 1, 0.8), pC = q.on('Laat', 1, 0.8);
    if (pB < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - pB; bg(ctx, 'schema');
      const rows = [1, 3, 9, 27]; const tr = [q.at('eerste'), q.at('tweede'), q.at('meer'), q.at('verder')];
      const pos = (r, i) => [960 + (i - (rows[r] - 1) / 2) * lerp(0, 56, r / 3) * (r === 1 ? 4 : r === 2 ? 2.1 : 1.1), 200 + r * 160];
      for (let r = 0; r < 4; r++) { const k = clamp((t - tr[r]) / 0.7, 0, 1); if (k <= 0) continue; for (let i = 0; i < rows[r]; i++) { const p = pos(r, i); if (r > 0) { const par = pos(r - 1, Math.floor(i / 3)); ctx.save(); ctx.globalAlpha *= 0.5 * k; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(par[0], par[1] + 20); ctx.lineTo(p[0], p[1] - 20); ctx.stroke(); ctx.restore(); }
          const x = r > 0 ? lerp(pos(r - 1, Math.floor(i / 3))[0], p[0], ease(k)) : p[0], y = r > 0 ? lerp(pos(r - 1, 0)[1], p[1], ease(k)) : p[1]; ctx.save(); ctx.translate(x, y); ctx.rotate(0.785); const s = r === 3 ? 13 : 18; ctx.fillStyle = C.goud; ctx.strokeStyle = lighten(C.goud, 0.4); ctx.lineWidth = 1.5; ctx.fillRect(-s, -s, 2 * s, 2 * s); ctx.strokeRect(-s, -s, 2 * s, 2 * s); ctx.restore(); }
        text(ctx, ['factor 1', 'factor 2', 'factor 3', '…'][r], 200, 212 + r * 160, fTekst(32, 600), C.text2, 'left'); }
      tag(ctx, 'een cascade', 960, 110, C.paars, fade(q, 'cascade', 'sterker'));
      tag(ctx, 'bij elke stap: een sterker signaal', 960, 870, C.goud, q.on('sterker', 1));
      ctx.restore(); }
    if (pB > 0.01 && pC < 0.99) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC); bg(ctx, 'schema');
      leverVorm(ctx, 720, 470, 1.6, 1); text(ctx, 'lever', 720, 300, fTekst(36, 700), C.text, 'center');
      for (let i = 0; i < 10; i++) { const ph = (t * 0.3 + i / 10) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * q.on('lever', 1); ctx.translate(lerp(820, 1500, ph), 470 + (hash(i) - 0.5) * 220); ctx.rotate(0.785); ctx.fillStyle = C.goud; ctx.fillRect(-12, -12, 24, 24); ctx.restore(); }
      text(ctx, 'stollingsfactoren', 1460, 330, fTekst(34, 700), C.goud, 'center');
      const vk = q.on('vitamine', 1); if (vk > 0.01) { for (let i = 0; i < 5; i++) { const ph = (t * 0.35 + i / 5) % 1; vitamin(ctx, lerp(200, 600, ph), 700 - ph * 180, 22, vk * (1 - ph * 0.3)); } text(ctx, 'vitamine K', 300, 790, fTekst(34, 700), C.text, 'center'); }
      tag(ctx, 'nodig voor een paar factoren, zoals protrombine', 1100, 870, C.goud, q.on('protrombine', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; bg(ctx, 'schema'); const kr = clamp((t - q.at('krimpt')) / 2.5, 0, 1);
      const g = buisje(ctx, 760, 170, 210, 660, 1, t, { stol: 1, krimp: ease(kr) });
      label(ctx, 'stolsel', 'KRIMPT', 760 + 60, 700, 1160, 720, q.on('stolsel', 1), TR.rijkL, 'left');
      label(ctx, 'serum', 'GELE VLOEISTOF', 760 + 60, g.top + 80, 1160, 300, q.on('serum', 1), TR.plasma, 'left');
      tag(ctx, 'serum = plasma zonder fibrinogeen', 760, 870, C.goud, q.on('fibrinogeen', 1));
      ctx.restore(); }
  },

  s18(ctx, t, q) { bg(ctx, 'schema'); const slosh = Math.sin(t * 1.4) * 0.04;
    ctx.save(); ctx.translate(960, 480); ctx.rotate(slosh); zakje(ctx, 0, 0, 320, 400, { t, citraat: q.on('citraat', 1) }); ctx.restore();
    label(ctx, 'citraat', 'AL VANAF HET BEGIN', 1040, 470, 1380, 400, q.on('citraat', 1), C.text, 'left');
    tag(ctx, 'het donorbloed stolt niet', 960, 870, C.goud, fade(q, 'stolt', 'denk'));
    vraagteken(ctx, 1420, 640, q.on('Hoe', 1), 150);
  },

  s20(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'antwoord a: citraat bindt de calciumionen', 960, 120, C.goud, 1 - q.on('Indrogen', 1));
    const nodes = [[330, 'stollingsfactoren'], [960, 'trombine'], [1590, 'fibrine']]; const geen = [0, q.on('trombine', 1), q.on('fibrine', 1)];
    nodes.forEach(([x, s], i) => { roundRect(ctx, x - 200, 380, 400, 100, 18); shape(ctx, rgba(C.bgSchema, 0.95), geen[i] > 0.5 ? C.koraal : C.line, 2); text(ctx, s, x, 444, fTekst(36, 700), geen[i] > 0.5 ? C.text2 : C.text, 'center'); kruis(ctx, x + 170, 390, 26, geen[i]); });
    const cit = clamp((t - q.at('Citraat')) / 1.6, 0, 1); const stuk = q.on('Zonder', 1);
    for (const [x0, x1] of [[530, 760], [1160, 1390]]) { ctx.save(); if (stuk > 0.5) ctx.setLineDash([10, 10]); arrow(ctx, x0, 430, x1, 430, stuk > 0.5 ? C.koraal : C.goud, 1, 4); ctx.restore(); }
    // calciumionen op de pijlen, citraat haalt ze weg
    const ca = [[600, 380], [690, 380], [1230, 380], [1320, 380]];
    ca.forEach(([x, y], i) => { const cx = lerp(x, x + (i % 2 ? 30 : -30), cit), cy = lerp(y - 30, 680 + Math.sin(t + i) * 8, ease(cit)); ctx.save(); ctx.globalAlpha *= q.on('calciumionen', 1); ctx.beginPath(); ctx.arc(cx, cy, 24, 0, 6.283); shape(ctx, rgba(B3.ca, 0.35), B3.ca, 2); text(ctx, 'Ca²⁺', cx, cy + 9, fTekst(24, 700), C.text, 'center'); ctx.restore();
      if (cit > 0.01) { const px = cx + (i % 2 ? 38 : -38), py = cy + 10; ctx.save(); ctx.globalAlpha *= q.on('Citraat', 1); ctx.translate(lerp(px, px, 1), lerp(820, py, ease(clamp(cit * 1.4, 0, 1)))); ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(16, 10); ctx.lineTo(-16, 10); ctx.closePath(); shape(ctx, rgba(B3.citraat, 0.9), C.text, 1.5); ctx.restore(); } });
    regel(ctx, 'calciumionen: nodig bij meerdere stappen', 960, 300, q.on('calciumionen', 1) * (1 - cit), C.text, 34, 'center', 700);
    regel(ctx, 'citraat bindt de calciumionen', 960, 790, q.on('Citraat', 1), C.text, 34, 'center', 700);
    tag(ctx, 'stolling is chemie, geen uitdroging', 960, 120, C.goud, q.on('Indrogen', 1) * (1 - q.on('basis', 1)));
  },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Al', 1, 0.8), pC = q.on('wond', 1, 0.8), pD = q.on('centrifuge', 1, 0.8);
    const A = (1 - pB);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      const D = [[480, 'plasma', 'plasma', 'opgeloste stoffen', q.on('stoffen', 1)], [960, 'rood', 'rode bloedcellen', 'zuurstof', q.on('zuurstof', 1)], [1440, 'plaatjes', 'wit laagje', 'afweer en stolling', q.on('ziekteverwekkers', 1)]];
      D.forEach(([x, inh, lab, f, al], i) => { zakje(ctx, x, 380, 200, 250, { inhoud: inh, vol: 0.85, t, label: lab, a: i === 0 ? q.on('plasma', 1) : al });
        if (i === 2 && al > 0.01) { wbc(ctx, x - 40, 640, 40, t, { a: al, seed: 2 }); plaatje(ctx, x + 50, 640, 14, { a: q.on('lekken', 1), rot: 1 }); }
        tag(ctx, f, x, 760, C.goud, al); });
      ctx.restore(); }
    if (pB > 0.01 && pC < 0.99) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC);
      ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = B3.bot; ctx.lineWidth = 90; ctx.beginPath(); ctx.moveTo(440, 300); ctx.lineTo(440, 640); ctx.stroke(); ctx.lineWidth = 46; ctx.strokeStyle = TR.rijk; ctx.stroke(); ctx.restore();
      text(ctx, 'rood beenmerg', 440, 740, fTekst(34, 700), C.text, 'center'); metaText(ctx, 'stamcellen', 440, 790, C.grain, 'center', 24);
      arrow(ctx, 560, 470, 860, 470, C.line, 1, 3);
      const u = ((t - q.at('Al')) * 0.12) % 1; for (let i = 0; i < 5; i++) { const v = (u + i / 5) % 1; rbc(ctx, lerp(900, 1240, v), 470 + Math.sin(v * 9 + i) * 30, 26, { oud: clamp((v - 0.5) * 2, 0, 1), seed: i, rot: i }); }
      text(ctx, '≈ 120 dagen', 1070, 380, fTekst(36, 700), C.goud, 'center', 1);
      arrow(ctx, 1280, 470, 1420, 470, C.line, q.on('milt', 1), 3); leverVorm(ctx, 1600, 420, 0.8, q.on('milt', 1)); miltVorm(ctx, 1600, 580, 0.8, q.on('milt', 1));
      regel(ctx, 'afbraak in milt en lever', 1600, 720, q.on('afgebroken', 1), C.text, 32, 'center', 700);
      ctx.restore(); }
    if (pC > 0.01 && pD < 0.99) { ctx.save(); ctx.globalAlpha *= pC * (1 - pD);
      const net = clamp((t - q.at('fibrinedraden') + 0.5) / 2.5, 0, 1);
      wond(ctx, t, { samen: 1, prop: 1, lek: 0, fibrinogeen: 1 - q.on('fibrinedraden', 1) * 0.5, net, strik: net, druppel: 0 });
      tag(ctx, 'plaatjes plakken aan elkaar', 960, 120, C.goud, fade(q, 'wond', 'Trombine'));
      tag(ctx, 'trombine: fibrinogeen → fibrine', 960, 120, C.goud, fade(q, 'Trombine', 'net'));
      tag(ctx, 'een net', 960, 120, C.goud, q.on('net', 1));
      ctx.restore(); }
    if (pD > 0.01) { ctx.save(); ctx.globalAlpha *= pD; const g = buisje(ctx, 760, 150, 210, 680, clamp((t - q.at('centrifuge')) / 1.4, 0, 1), t, {});
      label(ctx, 'geel plasma', 'BOVEN', 820, (g.plasma[0] + g.plasma[1]) / 2, 1200, 330, q.on('plasma', 3), TR.plasma, 'left');
      label(ctx, 'dun wit laagje', '', 820, (g.wit[0] + g.wit[1]) / 2, 1200, 560, q.on('laagje', 1), C.text, 'left');
      label(ctx, 'zwaardere rode cellen', 'ONDER', 820, (g.rood[0] + g.rood[1]) / 2, 1200, 760, q.on('zwaardere', 1), TR.rijkL, 'left');
      ctx.restore(); }
  },
};

/* =====================================================================================
   Cellen · les 2 · Zelfde DNA, andere cel (31 okt 2026)
   Film Stamcellen (films/cellen/stamcellen.html, versie 2.1); havo BvJ thema 1 § 1.2, vwo Nectar H2 § 2.1.
   Eigen hulpen hebben het voorvoegsel L2_. Kleuren zoals in de film: gen aan = goud, gen uit = gestippeld koraal,
   stamcel = neutrale cel (geen paars), donor = teal, leukemiecel = koraal rand, kern = paars.
   ===================================================================================== */

// ---------- basiskleuren voor cellen (volgen licht/donker) ----------
const L2_vul = () => rgba(C.line, C.licht ? 0.10 : 0.16);
const L2_rand = () => C.licht ? '#5E6B80' : '#B8C8DC';
const L2_BOT = () => C.licht ? '#E3D8BF' : '#CFC2A4';
function L2_kern(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.paars, C.licht ? 0.22 : 0.42), C.paars, Math.max(1.5, r * 0.09)); ctx.restore(); }
// ronde cel (stamcel en algemene cel): o.hl = gouden ring, o.kl = rand, o.donor = teal ring
function L2_stam(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r, o.seed || 2, 0.03); shape(ctx, L2_vul(), o.kl || L2_rand(), Math.max(2, r * 0.06)); L2_kern(ctx, x + r * 0.05, y - r * 0.04, r * 0.44);
  if (o.hl > 0.01) { ctx.globalAlpha *= o.hl; circ(ctx, x, y, r * 1.22, null, C.goud, Math.max(3, r * 0.07)); }
  ctx.restore(); }
// zenuwcel: cellichaam links, uitlopers, lange uitloper (axon) naar rechts; x = midden van het geheel
function L2_zenuw(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bx = x - 70 * s, lw = Math.max(2, 3 * s);
  ctx.strokeStyle = L2_rand(); ctx.lineCap = 'round'; ctx.lineWidth = lw * 2.2;
  [[-2.3, 58], [-1.6, 52], [-0.9, 46], [2.4, 56], [1.7, 50]].forEach(([an, L], i) => { const ex = bx + Math.cos(an) * L * s, ey = y + Math.sin(an) * L * s; ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an - 0.5) * 20 * s, ey + Math.sin(an - 0.5) * 20 * s); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an + 0.5) * 20 * s, ey + Math.sin(an + 0.5) * 20 * s); ctx.stroke(); ctx.lineWidth = lw * 2.2; });
  ctx.lineWidth = lw * 2.4; ctx.beginPath(); ctx.moveTo(bx + 30 * s, y); ctx.bezierCurveTo(bx + 90 * s, y - 10 * s, bx + 150 * s, y + 12 * s, bx + 205 * s, y + 2 * s); ctx.stroke();
  ctx.lineWidth = lw; [-0.6, 0, 0.6].forEach(d => { const ex = bx + 205 * s, ey = y + 2 * s; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + 22 * s, ey + d * 30 * s); ctx.stroke(); circ(ctx, ex + 24 * s, ey + d * 32 * s, 5 * s, L2_rand()); });
  blob(ctx, bx, y, 36 * s, 34 * s, 4, 0.05); shape(ctx, mix(C.bg, L2_rand(), 0.2), L2_rand(), lw); L2_kern(ctx, bx, y, 15 * s);
  ctx.restore(); }
// skeletspiercel (vezel): lang, dwarsgestreept, kernen aan de rand
function L2_spier(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = h / 2;
  roundRect(ctx, x - w / 2, y - r, w, h, r); shape(ctx, rgba(C.bloed, C.licht ? 0.22 : 0.35), C.bloed, 3);
  ctx.save(); roundRect(ctx, x - w / 2, y - r, w, h, r); ctx.clip(); ctx.strokeStyle = rgba(C.bloed, 0.7); ctx.lineWidth = 2.5; for (let xx = x - w / 2 + 8; xx < x + w / 2; xx += 11) { ctx.beginPath(); ctx.moveTo(xx, y - r); ctx.lineTo(xx, y + r); ctx.stroke(); } ctx.restore();
  [-0.3, 0.05, 0.38].forEach((f, i) => { ctx.beginPath(); ctx.ellipse(x + f * w, y + (i % 2 ? r * 0.62 : -r * 0.62), w * 0.05, r * 0.24, 0, 0, 6.283); shape(ctx, rgba(C.paars, C.licht ? 0.35 : 0.55), C.paars, 1.5); });
  ctx.restore(); }
// cel uit de alvleesklier (bètacel): ronde veelhoek vol korrels met insuline
function L2_alv(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.92, 7, 0.08); shape(ctx, L2_vul(), L2_rand(), 3);
  for (let i = 0; i < 22; i++) { const an = hash(i * 5.1 + 2) * 6.283, d = r * (0.5 + 0.38 * hash(i * 3.7)); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, Math.max(2.5, r * 0.06), C.oker); }
  L2_kern(ctx, x - r * 0.05, y, r * 0.36); ctx.restore(); }
// huidcel: wat platter, met hoornstofdraden (keratine)
function L2_huid(ctx, x, y, r, a = 1, plat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rx = r * lerp(1.2, 1.6, plat), ry = r * lerp(0.78, 0.32, plat);
  blob(ctx, x, y, rx, ry, 11, 0.04); shape(ctx, L2_vul(), L2_rand(), 3); ctx.save(); blob(ctx, x, y, rx, ry, 11, 0.04); ctx.clip(); ctx.strokeStyle = rgba(C.oker, 0.8); ctx.lineWidth = 2;
  for (let i = -2; i <= 2; i++) { const yy = y + i * ry * 0.32; ctx.beginPath(); ctx.moveTo(x - rx, yy + 4); ctx.bezierCurveTo(x - rx * 0.3, yy - 8, x + rx * 0.3, yy + 8, x + rx, yy - 3); ctx.stroke(); } ctx.restore();
  if (plat < 0.85) L2_kern(ctx, x, y, Math.min(rx, ry) * 0.45, 1 - plat); ctx.restore(); }
// rode bloedcel: geen kern, ingedeukt midden
function L2_rbc(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * (o.opzij ? 0.34 : 1), o.an || 0, 0, 6.283); shape(ctx, C.bloed, lighten(C.bloed, 0.3), 2);
  if (!o.opzij) { ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#5A1414', 0.35); ctx.fill(); }
  if (o.donor) circ(ctx, x, y, r * 1.25, null, C.teal, 3); ctx.restore(); }
// witte bloedcel: ronde cel met gelobde kern
function L2_wbc(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r, 5, 0.06); shape(ctx, L2_vul(), o.donor ? C.teal : L2_rand(), 3);
  [[-0.32, 0.1], [0.05, -0.2], [0.35, 0.12]].forEach(([dx, dy]) => circ(ctx, x + dx * r, y + dy * r, r * 0.26, rgba(C.paars, C.licht ? 0.3 : 0.5), C.paars, 1.5)); ctx.restore(); }
function L2_plaatje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.55, 0.4, 0, 6.283); shape(ctx, rgba(C.bloed, 0.45), C.bloed, 1.5); ctx.restore(); }
// leukemiecel: grote kern, koraal rand
function L2_blast(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, L2_vul(), C.koraal, 3.5); L2_kern(ctx, x, y, r * 0.66); ctx.restore(); }
// hartspiercel: vertakt, dwarsgestreept, kern in het midden, tussenschijven aan de uiteinden. x = linkeruiteinde; o.c = samentrekken 0..1
function L2_hartspier(ctx, x, y, len, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c = clamp(o.c || 0, 0, 1), vertak = o.vertak == null ? 1 : o.vertak;
  const L = len * (1 - 0.1 * c), x0 = x + (len - L) / 2, hh = h * (1 + 0.08 * c), r = hh * 0.35;
  const delen = [() => roundRect(ctx, x0, y - hh / 2, L, hh, r)];
  if (vertak) delen.push(() => { ctx.save(); ctx.translate(x0 + L * 0.55, y); ctx.rotate(-vertak * 0.42); roundRect(ctx, 0, -hh * 0.4, L * 0.5, hh * 0.8, r); ctx.restore(); });
  delen.forEach(d => { d(); ctx.strokeStyle = o.hl > 0.5 ? C.goud : C.bloed; ctx.lineWidth = 5; ctx.stroke(); });
  delen.forEach(d => { d(); ctx.fillStyle = mix(C.bg, C.bloed, C.licht ? 0.3 : 0.45); ctx.fill(); });
  const st = Math.max(6, h * 0.2) * (1 - 0.12 * c); ctx.strokeStyle = rgba(dk(C.bloed, 0.3), 0.6); ctx.lineWidth = Math.max(1.5, st * 0.3);
  delen.forEach(d => { ctx.save(); d(); ctx.clip(); for (let xx = x0 - h; xx < x0 + L + h; xx += st) { ctx.beginPath(); ctx.moveTo(xx, y - L); ctx.lineTo(xx, y + L); ctx.stroke(); } ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(x0 + L * 0.35, y, h * 0.3, h * 0.19, 0, 0, 6.283); shape(ctx, rgba(C.paars, C.licht ? 0.45 : 0.6), C.paars, 1.5);
  ctx.strokeStyle = dk(C.bloed, 0.5); ctx.lineWidth = Math.max(2, h * 0.08); for (const dx of [x0 + r * 0.25, x0 + L - r * 0.25]) { ctx.beginPath(); const s2 = hh * 0.8 / 4; ctx.moveTo(dx, y - hh * 0.4); for (let k = 0; k < 4; k++) ctx.lineTo(dx + (k % 2 ? -3 : 3), y - hh * 0.4 + s2 * (k + 1)); ctx.stroke(); }
  ctx.restore(); }
const L2_beat = (t, ph = 0, f = 1.2) => Math.pow(Math.max(0, Math.sin((t * f + ph) * Math.PI)), 6);
// één celsoort tekenen op plek x, y (ongeveer 2r breed)
function L2_cel(ctx, tp, x, y, r, a = 1, T = 0) {
  if (tp === 'zenuw') L2_zenuw(ctx, x, y, r / 50, a); else if (tp === 'spier') L2_spier(ctx, x, y, r * 5, r * 1.1, a); else if (tp === 'alv') L2_alv(ctx, x, y, r, a);
  else if (tp === 'huid') L2_huid(ctx, x, y, r, a); else if (tp === 'bloed') { L2_rbc(ctx, x - r * 0.55, y, r * 0.5, a); L2_rbc(ctx, x + r * 0.6, y, r * 0.5, a, { opzij: true, an: Math.PI / 2 }); }
  else if (tp === 'hart') L2_hartspier(ctx, x - r * 2, y, r * 4, r * 0.9, { a, c: L2_beat(T, 0.3) }); else L2_stam(ctx, x, y, r, a); }
const L2_NAAM = { zenuw: 'zenuwcel', spier: 'spiercel', alv: 'alvleeskliercel', huid: 'huidcel', bloed: 'rode bloedcel', hart: 'hartspiercel', stam: 'stamcel' };

// ---------- hetzelfde chromosoom met vijf genen op vaste plekken (zoals in de film) ----------
const L2_GENEN = [{ id: 'zenuw', naam: 'zenuwgen', u: 0.10 }, { id: 'spier', naam: 'spiergen', u: 0.27 }, { id: 'insuline', naam: 'insuline-gen', u: 0.50 }, { id: 'huid', naam: 'huidgen', u: 0.70 }, { id: 'hemo', naam: 'hemoglobine-gen', u: 0.88 }];
const L2_CELGEN = { zenuw: 'zenuw', spier: 'spier', alv: 'insuline', huid: 'huid', bloed: 'hemo' };
function L2_chrom(ctx, x, y, len, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const w = o.w || Math.max(16, len * 0.09), x0 = x - len / 2, cen = 0.38;
  ctx.save(); ctx.globalAlpha *= a;
  const half = (u) => { const d = Math.abs(u - cen); const pinch = 1 - 0.32 * Math.exp(-Math.pow(d / 0.035, 2)); const tip = Math.min(1, Math.sqrt(Math.min(u, 1 - u) / 0.05)); return w / 2 * pinch * tip; };
  const pad = () => { ctx.beginPath(); const N = 60; for (let i = 0; i <= N; i++) { const u = i / N; ctx.lineTo(x0 + u * len, y - half(u)); } for (let i = N; i >= 0; i--) { const u = i / N; ctx.lineTo(x0 + u * len, y + half(u)); } ctx.closePath(); };
  if (o.leeg) { ctx.setLineDash([9, 8]); pad(); ctx.strokeStyle = rgba(C.text2, 0.9); ctx.lineWidth = 2.5; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); return; }
  pad(); ctx.fillStyle = mix(C.bg, C.line, C.licht ? 0.35 : 0.45); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  const aanL = o.aan == null ? [] : (Array.isArray(o.aan) ? o.aan : [o.aan]), aanA = o.aanA == null ? 1 : o.aanA;
  L2_GENEN.forEach(g => { const bx = x0 + g.u * len; if (aanL.includes(g.id) && aanA > 0.01) gloed(ctx, bx, y, w * 1.6, C.goud, aanA * 0.9); });
  ctx.save(); pad(); ctx.clip();
  L2_GENEN.forEach(g => { const bx = x0 + g.u * len, bw = Math.max(7, len * 0.05); ctx.fillStyle = mix(C.bg, C.text2, C.licht ? 0.6 : 0.5); ctx.fillRect(bx - bw / 2, y - w, bw, 2 * w);
    if (aanL.includes(g.id) && aanA > 0.01) { ctx.save(); ctx.globalAlpha *= aanA; ctx.fillStyle = C.goud; ctx.fillRect(bx - bw / 2, y - w, bw, 2 * w); ctx.restore(); } });
  ctx.restore();
  if (o.uit && o.uitA > 0.01) { const g = L2_GENEN.find(q => q.id === o.uit), bx = x0 + g.u * len; ctx.save(); ctx.globalAlpha *= o.uitA; ctx.setLineDash([7, 6]); roundRect(ctx, bx - len * 0.045 - 6, y - w * 0.75 - 6, len * 0.09 + 12, w * 1.5 + 12, 8); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if (o.namen && (o.namenA == null || o.namenA > 0.01)) L2_GENEN.forEach((g, k) => { const bx = x0 + g.u * len, boven = k % 2 === 0; naam(ctx, g.naam, bx, boven ? y - w / 2 - 18 : y + w / 2 + 40, o.namenA == null ? 1 : o.namenA, 'center', aanL.includes(g.id) ? C.goud : (o.uit === g.id ? C.koraal : C.text2), 27); });
  ctx.restore(); }

// ---------- eiwit als gevouwen keten (transcriptiefactor, RNA-polymerase) ----------
const L2_VOUW = [[-0.9, 0.3], [-0.7, -0.5], [-0.2, -0.85], [0.1, -0.3], [0.55, -0.8], [0.95, -0.25], [0.5, 0.15], [0.9, 0.65], [0.35, 0.9], [0.0, 0.35], [-0.4, 0.85], [-0.85, 0.7]];
function L2_kluwen(ctx, x, y, s, kl, a = 1, rot = 0) { if (a <= 0.01) return; const pts = gladC(L2_VOUW); ctx.save(); ctx.globalAlpha *= a; gloed(ctx, x, y, s * 1.7, kl, 0.6);
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = kl; ctx.lineWidth = 0.26; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = rgba(lighten(kl, 0.4), 0.7); ctx.lineWidth = 0.08; ctx.stroke(); ctx.restore(); }

// ---------- hart (vooraanzicht, vereenvoudigd) met infarct ----------
function L2_hart(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const b = o.beat || 0, dood = o.dood || 0, lt = o.litteken || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (1 - 0.03 * b), s * (1 - 0.03 * b));
  ctx.lineCap = 'round'; ctx.strokeStyle = mix(C.bloed, '#FFFFFF', 0.12); ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(10, -95); ctx.bezierCurveTo(5, -190, 95, -200, 100, -130); ctx.stroke(); // aorta
  ctx.strokeStyle = mix(C.bloed, '#2A3A6A', 0.45); ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(-50, -90); ctx.lineTo(-58, -175); ctx.stroke(); // holle ader
  ctx.beginPath(); ctx.moveTo(-45, -110); ctx.bezierCurveTo(-165, -120, -180, 30, -95, 95); ctx.bezierCurveTo(-40, 145, 50, 180, 115, 185); ctx.bezierCurveTo(160, 125, 175, 10, 135, -70); ctx.bezierCurveTo(105, -130, 20, -135, -45, -110); ctx.closePath();
  shape(ctx, C.bloed, dk(C.bloed, 0.35), 4);
  ctx.strokeStyle = rgba(mix(C.bloed, '#FFE0C0', 0.45), 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(30, -95); ctx.bezierCurveTo(10, -10, 40, 80, 95, 150); ctx.stroke(); // kransslagader
  if (dood > 0.01) { ctx.save(); ctx.globalAlpha *= dood; ctx.translate(100, 95); ctx.rotate(-0.6); ctx.beginPath(); ctx.ellipse(0, 0, 38, 62, 0, 0, 6.283); ctx.fillStyle = mix('#4A1E22', '#CFC6B4', lt); ctx.fill();
    if (lt > 0.3) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A8274', lt); ctx.lineWidth = 2; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(-45, i * 14); ctx.bezierCurveTo(-12, i * 14 - 6, 12, i * 14 + 6, 45, i * 14); ctx.stroke(); } ctx.restore(); } ctx.restore(); }
  ctx.restore(); }
// knie in een zoomcirkel: huid met een schaafwond die heelt (heel 0..1)
function L2_knie(ctx, x, y, r, heel) { ctx.fillStyle = CAST.noor.huid; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = rgba('#000000', 0.06); ctx.beginPath(); ctx.ellipse(x, y - r * 0.05, r * 0.55, r * 0.62, 0, 0, 6.283); ctx.fill();
  const wond = 1 - ease(clamp((heel - 0.6) / 0.35, 0, 1)); if (wond <= 0.01) return; const korst = ease(clamp(heel / 0.5, 0, 1));
  ctx.save(); ctx.globalAlpha *= wond; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283, k = 1 + 0.18 * Math.sin(an * 5 + 1) + 0.1 * Math.sin(an * 9); ctx.lineTo(x + Math.cos(an) * r * 0.42 * k, y + r * 0.05 + Math.sin(an) * r * 0.24 * k); } ctx.closePath();
  ctx.fillStyle = mix('#C24A3E', '#7A3E2C', korst); ctx.fill();
  ctx.strokeStyle = rgba('#FFFFFF', 0.25 * (1 - korst)); ctx.lineWidth = 2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x - r * 0.35, y + r * 0.05 + i * 9); ctx.lineTo(x + r * 0.35, y + r * 0.02 + i * 9); ctx.stroke(); }
  ctx.restore(); }

// ---------- klieving: bevruchte eicel (zona blijft even groot) deelt in 2, 4, 8 cellen. f = 0..3 ----------
function L2_klieving(ctx, x, y, r, f, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r * 1.1, null, rgba(C.text2, 0.55), r * 0.08);
  const st = Math.floor(clamp(f, 0, 3)), u = ease(clamp(f - st, 0, 1)), n = Math.pow(2, st);
  const pos = (k) => { if (k === 1) return [[0, 0, 0.98]]; if (k === 2) return [[-0.5, 0, 0.5], [0.5, 0, 0.5]]; if (k === 4) return [[-0.47, -0.42, 0.46], [0.47, -0.42, 0.46], [-0.47, 0.42, 0.46], [0.47, 0.42, 0.46]];
    return [[-0.48, -0.5, 0.33], [0.12, -0.6, 0.32], [0.62, -0.18, 0.32], [-0.64, 0.12, 0.32], [0.52, 0.45, 0.32], [-0.2, 0.62, 0.32], [-0.1, -0.02, 0.3], [0.32, 0.16, 0.26]]; };
  const A = pos(n), B = st < 3 ? pos(n * 2) : null, lw = Math.max(2, r * 0.02);
  const cl = (cx, cy, rr) => { circ(ctx, cx, cy, rr, L2_vul(), L2_rand(), lw); };
  if (!B || u < 0.01) A.forEach(([px, py, pr]) => { cl(x + px * r, y + py * r, pr * r); if (n === 1) { L2_kern(ctx, x - r * 0.2, y, r * 0.16); L2_kern(ctx, x + r * 0.2, y + r * 0.04, r * 0.15); } else L2_kern(ctx, x + px * r, y + py * r, pr * r * 0.36); });
  else A.forEach(([px, py, pr], i) => { [B[2 * i], B[2 * i + 1]].forEach(([qx, qy, qr]) => { const cx = lerp(px, qx, u), cy = lerp(py, qy, u), rr = lerp(pr * 0.72, qr, u); cl(x + cx * r, y + cy * r, rr * r); L2_kern(ctx, x + cx * r, y + cy * r, rr * r * 0.36); }); });
  ctx.restore(); }

// ---------- blastocyste (embryo van ± 5 dagen): holle bol met binnenste celmassa ----------
function L2_blasto(ctx, x, y, r, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(C.water, C.licht ? 0.06 : 0.10), null);
  const n = 22; for (let i = 0; i < n; i++) { const an = i / n * 6.283, cx = x + Math.cos(an) * r * 0.93, cy = y + Math.sin(an) * r * 0.93; ctx.save(); ctx.translate(cx, cy); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.15, r * 0.065, 0, 0, 6.283); shape(ctx, L2_vul(), L2_rand(), 2); circ(ctx, 0, 0, r * 0.035, rgba(C.paars, 0.6)); ctx.restore(); }
  if (hl > 0.01) gloed(ctx, x - r * 0.42, y - r * 0.38, r * 0.6, C.goud, hl);
  [[-0.55, -0.5], [-0.35, -0.6], [-0.62, -0.28], [-0.4, -0.36], [-0.18, -0.5], [-0.5, -0.12], [-0.28, -0.18]].forEach(([dx, dy], i) => L2_stam(ctx, x + dx * r, y + dy * r, r * 0.12, 1, { seed: i, hl: hl * 0.0 }));
  ctx.restore(); }
// kweekschaal (bovenaanzicht) met kolonies; o.kl = rand van de cellen
function L2_schaal(ctx, x, y, r, a = 1, groei = 1, T = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.62, 0, 0, 6.283); shape(ctx, rgba(C.oker, C.licht ? 0.08 : 0.10), C.line, 4); ctx.beginPath(); ctx.ellipse(x, y, r * 0.92, r * 0.56, 0, 0, 6.283); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.stroke();
  [[-0.45, -0.1], [0.3, -0.18], [0.0, 0.25], [0.5, 0.2]].forEach(([dx, dy], k) => { for (let i = 0; i < 6; i++) { const an = i * 1.05 + k, d = i ? r * 0.08 : 0, sc = clamp(groei * 6 - i, 0, 1); if (sc <= 0.01) continue; L2_stam(ctx, x + dx * r + Math.cos(an) * d, y + dy * r * 0.62 + Math.sin(an) * d * 0.7, r * 0.05 * sc, 1, { seed: k + i }); } });
  ctx.restore(); }

// ---------- herkenningseiwitten (HLA) op een cel; vorm 0 = rond, 2 = driehoek; kl = kleur ----------
function L2_hla(ctx, x, y, r, vorm, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 9;
  for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.2, cs = Math.cos(an), sn = Math.sin(an), hx = x + cs * r * 1.22, hy = y + sn * r * 1.22, s = r * 0.085;
    ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, r * 0.03); ctx.beginPath(); ctx.moveTo(x + cs * r * 0.95, y + sn * r * 0.95); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); ctx.beginPath(); if (vorm === 0) ctx.arc(s * 0.9, 0, s, 0, 6.283); else { ctx.moveTo(0, -s * 1.15); ctx.lineTo(2.2 * s, 0); ctx.lineTo(0, s * 1.15); ctx.closePath(); } shape(ctx, kl, lighten(kl, 0.3), 1.2); ctx.restore(); }
  L2_stam(ctx, x, y, r, 1, { seed: 3 + vorm }); ctx.restore(); }
// infuus aan een standaard; x = voet, y = vloer, h = hoogte, doel = [x, y] arm; stroom 0..1 = cellen in de slang
function L2_infuus(ctx, x, y, h, doel, a = 1, T = 0, stroom = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = h / 180;
  ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.lineTo(x + 20 * k, y - h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 26 * k, y); ctx.lineTo(x + 26 * k, y); ctx.stroke();
  const bx = x + 20 * k, by = y - h + 6 * k; roundRect(ctx, bx - 14 * k, by, 28 * k, 40 * k, 6 * k); shape(ctx, rgba(C.teal, 0.15), C.teal, 2.5); roundRect(ctx, bx - 11 * k, by + 14 * k, 22 * k, 23 * k, 4 * k); shape(ctx, rgba(C.teal, 0.35), null);
  const p0 = [bx, by + 40 * k], c1 = [bx, (by + doel[1]) / 2 + 60 * k], P = (u) => [lerp(lerp(p0[0], c1[0], u), lerp(c1[0], doel[0], u), u), lerp(lerp(p0[1], c1[1], u), lerp(c1[1], doel[1], u), u)];
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(...p0); ctx.quadraticCurveTo(c1[0], c1[1], doel[0], doel[1]); ctx.stroke();
  if (stroom > 0.01) for (let i = 0; i < 6; i++) { const u = (T * 0.22 + i / 6) % 1; const [px, py] = P(u); circ(ctx, px, py, 6, rgba(C.teal, stroom)); }
  ctx.restore(); }
// handplek van een personage (eenmalig op een losse tekenlaag uitgerekend)
const _L2hand = {};
function L2_hand(id, x, y, h, o) { const k = id + x + ',' + y + ',' + h; if (!_L2hand[k]) { const c = document.createElement('canvas').getContext('2d'); const R = persoon(c, id, x, y, h, Object.assign({ t: 0 }, o)) || {}; const hs = [R.handR, R.handL].filter(Boolean); _L2hand[k] = hs.length ? hs.reduce((p, q) => (q.x > p.x ? q : p)) : { x: x + h * 0.15, y: y - h * 0.4 }; } return _L2hand[k]; }

// ---------- opperhuid: kiemlaag onderin; één cel (gouden rand) gaat omhoog, verhoornt en schilfert af ----------
// rijen: y, straal, platheid; de kolom bij x = kx is vrij voor de gevolgde cel
const L2_RIJ = [[790, 36, 0], [705, 38, 0.15], [628, 40, 0.4], [560, 42, 0.68], [505, 44, 0.9], [462, 46, 1]];
function L2_opperhuid(ctx, X0, X1, kx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.moveTo(X0, 836); for (let xx = X0; xx <= X1; xx += 20) ctx.lineTo(xx, 836 + Math.sin(xx * 0.02) * 10); ctx.lineTo(X1, 930); ctx.lineTo(X0, 930); ctx.closePath(); ctx.fillStyle = rgba(C.bloed, C.licht ? 0.12 : 0.2); ctx.fill(); ctx.restore();
  L2_RIJ.forEach(([y, r, plat], ri) => { const stap = r * lerp(2.15, 3.0, plat); for (let xx = X0 + r * 1.2 + (ri % 2) * stap * 0.5; xx < X1 - r; xx += stap) { if (Math.abs(xx - kx) < stap * 0.55 && (ri === 0 || ri === o.vrij)) continue;
      if (ri === 0) L2_stam(ctx, xx, y + Math.sin(xx * 0.02) * 6, r, 1, { seed: xx, hl: o.stamHl || 0 }); else if (plat > 0.95) L2_hoorn(ctx, xx, y, r * 1.45); else L2_huid(ctx, xx, y, r * 0.95, 1, plat); } });
  ctx.restore(); }
function L2_hoorn(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w, w * 0.16, 0, 0, 6.283); shape(ctx, rgba(C.oker, C.licht ? 0.35 : 0.4), C.oker, 2); ctx.restore(); }

// ---------- beenmerg in een zoomcirkel; o.leuk 0..1 = leukemiecellen verdringen de rest, o.leeg = weg door chemo, o.donor/o.nieuw = donorcellen ----------
const L2_BM = Array.from({ length: 26 }, (_, i) => { const an = i * 2.399, d = Math.sqrt((i + 0.5) / 26) * 0.84; return [Math.cos(an) * d, Math.sin(an) * d, i % 6 === 0 ? 's' : (i % 4 === 1 ? 'w' : (i % 7 === 3 ? 'p' : 'r')), hash(i * 3.1)]; });
function L2_merg(ctx, x, y, R, T, o = {}) { const leuk = o.leuk || 0, leeg = o.leeg || 0, donor = o.donor || 0, nieuw = o.nieuw || 0;
  ctx.fillStyle = rgba(C.bloed, C.licht ? 0.08 : 0.14); ctx.fillRect(x - R, y - R, 2 * R, 2 * R);
  L2_BM.forEach(([px, py, sr, h], i) => { const cx = x + px * R + Math.sin(T * 0.4 + i) * 3, cy = y + py * R + Math.cos(T * 0.35 + i) * 3, isB = leuk * 1.3 - h > 0.15, al = 1 - leeg; if (al <= 0.01) return;
    if (isB) L2_blast(ctx, cx, cy, R * 0.11, al); else if (sr === 'r') L2_rbc(ctx, cx, cy, R * 0.075, al); else if (sr === 'w') L2_wbc(ctx, cx, cy, R * 0.095, al); else if (sr === 'p') L2_plaatje(ctx, cx, cy, R * 0.04, al); else L2_stam(ctx, cx, cy, R * 0.085, al, { hl: o.stamHl || 0 }); });
  if (donor > 0.01) [[-0.35, -0.12], [0.12, 0.32], [0.32, -0.36]].forEach(([px, py], i) => { const u = ease(clamp(donor * 1.4 - i * 0.2, 0, 1)), cx = lerp(x - R * 1.15, x + px * R, u), cy = y + py * R;
    L2_stam(ctx, cx, cy, R * 0.09, clamp(u * 3, 0, 1), { kl: C.teal }); circ(ctx, cx, cy, R * 0.12, null, rgba(C.teal, clamp(u * 3, 0, 1)), 3);
    for (let k = 0; k < 4; k++) { const n = ease(clamp(nieuw * 1.5 - k * 0.15 - i * 0.1, 0, 1)); if (n <= 0.01) continue; const an = k * 1.57 + i, qx = cx + Math.cos(an) * R * 0.21 * n, qy = cy + Math.sin(an) * R * 0.21 * n;
      if (k === 3) L2_wbc(ctx, qx, qy, R * 0.07, n, { donor: true }); else L2_rbc(ctx, qx, qy, R * 0.06, n, { donor: true }); } }); }
// pijpbeen (dijbeen, vereenvoudigd) met rood beenmerg in de uiteinden
function L2_bot(ctx, x, y, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.11;
  ctx.beginPath(); ctx.moveTo(x - w, y - h * 0.38); ctx.bezierCurveTo(x - w * 2.6, y - h * 0.44, x - w * 2.2, y - h * 0.56, x - w * 0.6, y - h * 0.52); ctx.bezierCurveTo(x, y - h * 0.58, x + w * 2.4, y - h * 0.56, x + w * 2.1, y - h * 0.42); ctx.bezierCurveTo(x + w * 1.9, y - h * 0.36, x + w, y - h * 0.36, x + w, y - h * 0.3);
  ctx.lineTo(x + w, y + h * 0.3); ctx.bezierCurveTo(x + w, y + h * 0.36, x + w * 2.3, y + h * 0.38, x + w * 2.1, y + h * 0.48); ctx.bezierCurveTo(x + w * 1.6, y + h * 0.57, x - w * 1.6, y + h * 0.57, x - w * 2.1, y + h * 0.48); ctx.bezierCurveTo(x - w * 2.3, y + h * 0.38, x - w, y + h * 0.36, x - w, y + h * 0.3); ctx.closePath();
  shape(ctx, L2_BOT(), C.line, 3);
  [[y - h * 0.44, 1], [y + h * 0.45, -1]].forEach(([yy]) => { ctx.beginPath(); ctx.ellipse(x, yy, w * 1.55, h * 0.07, 0, 0, 6.283); ctx.fillStyle = rgba(C.bloed, 0.55); ctx.fill(); ctx.strokeStyle = rgba(dk(C.bloed, 0.3), 0.6); ctx.lineWidth = 1.5;
    for (let i = 0; i < 9; i++) { const an = hash(i * 4.1 + yy) * 6.283; ctx.beginPath(); ctx.arc(x + Math.cos(an) * w * 1.1, yy + Math.sin(an) * h * 0.04, 4, 0, 6.283); ctx.stroke(); } });
  roundRect(ctx, x - w * 0.45, y - h * 0.3, w * 0.9, h * 0.6, w * 0.4); ctx.fillStyle = rgba(C.oker, 0.3); ctx.fill(); // geel merg in de schacht
  ctx.restore(); }
// darmvlok met crypte; de cellen schuiven langs de wand omhoog en vallen er bovenaan af (T = tijd)
function L2_darm(ctx, x, y, s, T, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const half = (k) => [[x + k * 26 * s, y + 230 * s], [x + k * 48 * s, y + 160 * s], [x + k * 95 * s, y + 120 * s], [x + k * 75 * s, y + 60 * s], [x + k * 70 * s, y - 120 * s], [x + k * 45 * s, y - 170 * s], [x, y - 186 * s]];
  const L = gladPad(half(-1), 6), R = gladPad(half(1), 6);
  ctx.beginPath(); L.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); R.slice().reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = rgba(C.bloed, C.licht ? 0.1 : 0.16); ctx.fill();
  [L, R].forEach((P, side) => { const N = 15; for (let i = 0; i < N; i++) { const u = ((i / N + T * 0.035 * (o.beweeg == null ? 1 : o.beweeg)) % 1); const d = padLengte(P), tot = d[d.length - 1]; const [px, py, an] = padPunt(P, u * tot);
      const fade = u > 0.92 ? 1 - (u - 0.92) / 0.08 : 1; if (u < 0.1) continue; ctx.save(); ctx.globalAlpha *= fade; ctx.translate(px, py); ctx.rotate(an); roundRect(ctx, -11 * s, -14 * s, 22 * s, 28 * s, 7 * s); shape(ctx, L2_vul(), L2_rand(), 2); circ(ctx, 0, side ? -4 * s : 4 * s, 5.5 * s, rgba(C.paars, 0.6)); ctx.restore(); } });
  [-1, 1].forEach(k => L2_stam(ctx, x + k * 24 * s, y + 212 * s, 15 * s, 1, { hl: o.stamHl || 0 }));
  ctx.restore(); }

// ---------- kleine iconen voor de vooruitblik ----------
function L2_icoonKern(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, 110, 95, 3, 0.04); shape(ctx, L2_vul(), L2_rand(), 4); circ(ctx, x, y, 48, rgba(C.paars, 0.3), C.paars, 3);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(x - 30 + u * 60, y + Math.sin(u * 12 + T) * 10); } ctx.stroke(); ctx.restore(); }
function L2_icoonER(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x - 30, y + 90, 60 + k * 26, -1.35, -0.25); ctx.stroke(); }
  for (let i = 0; i < 12; i++) { const an = -1.3 + i * 0.09, rr = 60 + (i % 4) * 26 + 6; circ(ctx, x - 30 + Math.cos(an) * rr, y + 90 + Math.sin(an) * rr, 4, C.oker); }
  ctx.strokeStyle = C.oker; ctx.lineWidth = 6; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 40, y + 20 + k * 22); ctx.quadraticCurveTo(x + 75, y + 4 + k * 22, x + 110, y + 20 + k * 22); ctx.stroke(); } ctx.restore(); }
function L2_icoonMito(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.25); roundRect(ctx, -105, -50, 210, 100, 50); shape(ctx, rgba(C.koraal, 0.25), C.koraal, 4);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(-80, 0); for (let i = 0; i < 7; i++) { const xx = -70 + i * 24; ctx.lineTo(xx, i % 2 ? 30 : -30); } ctx.stroke(); ctx.restore(); }
function L2_icoonPlant(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 95, y - 85, 190, 170, 10); shape(ctx, rgba(C.groen, 0.1), C.groen, 6);
  roundRect(ctx, x - 55, y - 50, 110, 95, 30); shape(ctx, rgba(C.water, 0.18), rgba(C.water, 0.7), 2);
  [[-75, -60], [65, -55], [-72, 55], [70, 60], [0, 68]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(x + dx, y + dy, 15, 9, dx * 0.02, 0, 6.283); shape(ctx, C.groen, dk(C.groen, 0.3), 1.5); });
  circ(ctx, x + 60, y - 10, 15, rgba(C.paars, 0.4), C.paars, 2); ctx.restore(); }

/* =====================================================================================
   SCHERMEN
   ===================================================================================== */

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Cellen</b> · les 2: differentiatie, stamcellen en stamcellen als medicijn', n: 'Kies eerst havo of vwo. Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Deze les hoort bij de film Stamcellen: havo BvJ thema 1 § 1.2, vwo Nectar H2 § 2.1. Sluit aan op les 1 (Van molecuul tot biosfeer: cel, weefsel, orgaan).' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Cellen · les 2', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Zelfde DNA,', 140, 465, fTitel(98), C.text); text(ctx, 'andere cel', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'differentiatie · stamcellen · stamcellen als medicijn', 144, 675, 1, C.text2, 32, 'left', 400);
    const cx = 1430, cy = 560, R = 250, types = ['zenuw', 'spier', 'alv', 'huid', 'bloed'];
    types.forEach((tp, i) => { const an = -2.6 + i * 1.3, px = cx + Math.cos(an) * R, py = cy + Math.sin(an) * R * 0.95, u = 0.5 + 0.5 * Math.sin(T * 0.8 - i * 0.7);
      ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * 85, cy + Math.sin(an) * 85); ctx.lineTo(px - Math.cos(an) * 70, py - Math.sin(an) * 70); ctx.stroke(); ctx.restore();
      circ(ctx, cx + Math.cos(an) * lerp(90, R - 75, u), cy + Math.sin(an) * lerp(90, R - 75, u) * 0.95, 5, rgba(C.goud, 0.8));
      L2_cel(ctx, tp, px, py, tp === 'spier' ? 26 : tp === 'zenuw' ? 34 : 44, 1, T); });
    L2_stam(ctx, cx, cy, 70 * (1 + Math.sin(T * 1.2) * 0.03), 1, { hl: 0.8 + 0.2 * Math.sin(T * 1.6) });
  } });

// ---------- 2 · knie en hart ----------
SCHERMEN.push({ titel: 'Knie en hart', kop: 'Huid herstelt, hartspier niet', deel: 'Opening',
  stappen: [
    { t: 'Je valt van je fiets en schaaft je knie.', n: 'Dezelfde opening als de film. De leerling in beeld is Noor (zonder naam, sportoutfit), net als in de film.' },
    { t: 'Twee weken later zie je er bijna niets meer van: je huid heeft zichzelf hersteld.', n: 'Eerst een korst, daaronder groeit nieuwe opperhuid. Waar die cellen vandaan komen, zie je op scherm 8 (de kiemlaag).' },
    { t: 'Na een <b>hartinfarct</b> sterft een stuk hartspier af. Dat groeit niet terug: er komt <b>littekenweefsel</b>.', n: 'Een kransslagader raakt verstopt; het stuk hartspier erachter krijgt geen zuurstof en sterft af. Het litteken maken bindweefselcellen; het trekt niet samen.' },
    { t: 'Huid herstelt wel, hartspier bijna niet. Dat verschil is de rode draad van deze les.', n: 'Vraag uit de film: Waarom herstelt je huid wel, en je hartspier bijna niet? (a) in je huid zitten cellen die zich blijven delen, in je hartspier niet · (b) hartspiercellen zijn te groot en te zwaar om zich te kunnen delen · (c) je huid krijgt meer zuurstof uit de lucht, dus groeit hij sneller. Antwoord a; de film onthult het pas in hoofdstuk 2 (hier scherm 9).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.8), s1 = S.on(1, 1.6), s2 = S.on(2, 1.4), s3 = S.on(3, 0.8);
    pers(ctx, 'noor', 300, 930, 640, { outfit: 'sport', t: T, uit: s1 > 0.6 ? 'blij' : 'neutraal', kijk: 1, a: s0 });
    const kx = 318, ky = 800, zx = 760, zy = 470, zr = 200;
    zoom(ctx, zx, zy, zr, s0, [kx, ky], () => L2_knie(ctx, zx, zy, zr, s1));
    naam(ctx, s1 > 0.75 ? 'hersteld' : 'schaafwond', zx, zy + zr + 48, s0, 'center', s1 > 0.75 ? C.groen : C.text, 34);
    if (s1 > 0.75) vink(ctx, zx + 150, zy + zr + 36, 18, s1, C.groen);
    metaText(ctx, s1 > 0.5 ? '2 weken later' : 'dag 1', zx, zy - zr - 22, C.meta, 'center', 24, s0);
    L2_hart(ctx, 1420, 520, 1.25, { a: s2, beat: L2_beat(T, 0, 1.1), dood: clamp(s2 * 2, 0, 1), litteken: ease(clamp(s2 * 2 - 1, 0, 1)) });
    naam(ctx, s2 > 0.6 ? 'littekenweefsel' : 'afgestorven hartspier', 1620, 760, s2, 'center', C.koraal, 32);
    if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1590, 725); ctx.lineTo(1560, 660); ctx.stroke(); ctx.restore(); }
    naam(ctx, 'hart', 1400, 210, s2, 'center', C.text2, 32);
    balk(ctx, 'huid herstelt   ·   hartspier krijgt een litteken', 1120, 958, 1100, s3, C.goud, 38);
  } });

// ---------- 3 · van één cel naar 30 biljoen ----------
SCHERMEN.push({ titel: 'Eén cel wordt biljoenen', kop: 'Van één cel naar 30 biljoen', deel: 'Zelfde DNA, andere cel',
  stappen: [
    { t: 'Je begon als één cel: een <b>bevruchte eicel</b>.', n: 'Twee voorkernen (van de eicel en de zaadcel) in de eicel, met de beschermende laag eromheen. Doorsnede ± 0,1 mm.' },
    { t: 'Die deelde zich door <b>mitose</b>, steeds weer: 2, 4, 8 cellen …', n: 'Bij de eerste delingen (klieving) groeit het embryo niet: de cellen worden kleiner. Mitose kennen ze uit de film Celdeling.' },
    { t: 'Nu bestaat je lichaam uit zo\'n <b>30 biljoen</b> cellen, van meer dan <b>200 soorten</b>.', n: '30 biljoen = 3 · 10¹³ (Sender e.a. 2016). Het aantal celsoorten hangt af van hoe je indeelt; \'meer dan 200\' is de gangbare ondergrens.' },
    { t: 'Bij elke mitose krijgen beide cellen een kopie van <b>hetzelfde DNA</b>.', n: 'Dat is de sleutel voor de volgende schermen: alle lichaamscellen hebben hetzelfde DNA, op een paar uitzonderingen na.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.8), s1 = S.on(1, 3.0), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    L2_klieving(ctx, 470, 560, 210, s1 * 3, s0);
    naam(ctx, s1 > 0.5 ? 'klieving: de cellen worden kleiner' : 'bevruchte eicel', 470, 850, s0, 'center', C.text, 32);
    regel(ctx, '± 0,1 mm', 470, 300, s0 * (1 - s1), C.text2, 28, 'center', 500);
    if (s1 > 0.01) regel(ctx, String(Math.pow(2, Math.min(3, Math.floor(s1 * 3 + 0.02)))) + (s1 * 3 >= 0.98 ? ' cellen' : ' cel'), 470, 300, s1, C.goud, 36, 'center', 700);
    pijl(ctx, 760, 560, 900, 560, C.text2, 5, s2);
    regel(ctx, '± 30 biljoen', 960, 470, s2, C.goud, 72, 'left', 700); regel(ctx, 'cellen', 960, 525, s2, C.text, 34, 'left', 500);
    regel(ctx, '> 200', 1450, 470, s2 * S.on(2, 0.6, 0.4), C.goud, 72, 'left', 700); regel(ctx, 'celsoorten', 1450, 525, s2 * S.on(2, 0.6, 0.4), C.text, 34, 'left', 500);
    ['zenuw', 'spier', 'alv', 'huid', 'bloed'].forEach((tp, i) => L2_cel(ctx, tp, 1030 + i * 160, 650, tp === 'spier' ? 18 : tp === 'zenuw' ? 26 : 32, s2 * S.on(2, 0.5, 0.6 + i * 0.12), T));
    const yc = 860; L2_chrom(ctx, 1080, yc, 300, { a: s3 }); pijl(ctx, 1260, yc, 1340, yc - 40, C.text2, 4, s3 * S.on(3, 0.5, 0.3)); pijl(ctx, 1260, yc, 1340, yc + 40, C.text2, 4, s3 * S.on(3, 0.5, 0.3));
    L2_chrom(ctx, 1520, yc - 50, 300, { a: s3 * S.on(3, 0.6, 0.5) }); L2_chrom(ctx, 1520, yc + 50, 300, { a: s3 * S.on(3, 0.6, 0.5) });
    naam(ctx, 'kopie', 1720, yc + 10, s3 * S.on(3, 0.6, 0.6), 'left', C.text2, 28);
  } });

// ---------- 4 · zelfde DNA ----------
const L2_X5 = [250, 600, 960, 1310, 1660];
SCHERMEN.push({ titel: 'Zelfde DNA', kop: 'Zelfde DNA in elke cel', deel: 'Zelfde DNA, andere cel',
  stappen: [
    { t: 'Een zenuwcel, een spiercel, een cel uit je alvleesklier en een huidcel: heel verschillend.', n: 'Zenuwcel met lange uitloper, spiercel lang en dwarsgestreept met kernen aan de rand, alvleeskliercel vol korrels (insuline), huidcel met hoornstofdraden.' },
    { t: 'In elke kern zit <b>hetzelfde DNA</b>, met dezelfde genen.', n: 'Steeds hetzelfde chromosoom in beeld, met vijf genen op vaste plekken (vereenvoudigd: in werkelijkheid liggen deze genen op verschillende chromosomen).' },
    { t: 'Uitzondering: een <b>rode bloedcel</b> verliest zijn kern en heeft dus geen DNA meer.', n: 'Andere uitzonderingen (alleen als een leerling ernaar vraagt): ei- en zaadcellen hebben de helft van het DNA; B- en T-cellen knippen hun antistof- en receptorgenen om.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9);
    ['zenuw', 'spier', 'alv', 'huid', 'bloed'].forEach((tp, i) => { const x = L2_X5[i], a = i < 4 ? s0 * S.on(0, 0.6, i * 0.15) : s2;
      L2_cel(ctx, tp, x, 380, tp === 'spier' ? 30 : tp === 'zenuw' ? 52 : 58, a, T); naam(ctx, L2_NAAM[tp], x, 520, a, 'center', C.text, 30);
      if (i < 4) L2_chrom(ctx, x, 650, 280, { a: s1 * S.on(1, 0.6, i * 0.15) }); else L2_chrom(ctx, x, 650, 280, { a: s2, leeg: true }); });
    regel(ctx, 'geen DNA', L2_X5[4], 720, s2, C.koraal, 30, 'center', 600);
    regel(ctx, 'hetzelfde DNA', 960, 820, s1, C.goud, 40, 'center', 700);
    ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(L2_X5[0] - 140, 760); ctx.lineTo(L2_X5[0] - 140, 780); ctx.lineTo(L2_X5[3] + 140, 780); ctx.lineTo(L2_X5[3] + 140, 760); ctx.stroke(); ctx.restore();
  } });

// ---------- 5 · genen aan en uit ----------
SCHERMEN.push({ titel: 'Genen aan en uit', kop: 'Andere genen aan', deel: 'Zelfde DNA, andere cel',
  stappen: [
    { t: 'Toch zien ze er anders uit en doen ze iets anders: in elke cel staan <b>andere genen aan</b>.', n: 'Vraag uit de film: Een zenuwcel uit je hersenen en een spiercel uit je been, van jou. Wat is het verschil in hun DNA? (a) de zenuwcel heeft genen die de spiercel niet heeft · (b) er is geen verschil: alleen andere genen staan aan · (c) in de spiercel zijn de genen die hij niet nodig heeft eruit geknipt. Antwoord b.' },
    { t: 'In sommige cellen van je alvleesklier staat het gen voor <b>insuline</b> aan.', n: 'Alleen de bètacellen in de eilandjes van Langerhans maken insuline; de meeste cellen van de alvleesklier maken verteringsenzymen.' },
    { t: 'In je huidcellen staat het insuline-gen uit, hoewel het daar ook in zit.', n: 'Het gestippelde kader = het gen is er wel, maar staat uit. In de huidcel staat het huidgen (keratine, hoornstof) aan.' },
    { t: 'Een cel die zo een eigen bouw en taak krijgt, is <b>gedifferentieerd</b>. Het proces heet <b>differentiatie</b>.', n: 'Begrippen uit de film: differentiatie, gedifferentieerde cel. Laat leerlingen de definitie in eigen woorden zeggen: zelfde DNA, andere genen aan, eigen bouw en taak.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.2), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.8);
    const X4 = [330, 730, 1130, 1530];
    ['zenuw', 'spier', 'alv', 'huid'].forEach((tp, i) => { const x = X4[i], hl = (tp === 'alv' ? s1 : 0) + (tp === 'huid' ? s2 : 0), dim = 1 - 0.55 * clamp(s1 + s2, 0, 1) * (1 - clamp(hl, 0, 1));
      L2_cel(ctx, tp, x, 255, tp === 'spier' ? 22 : tp === 'zenuw' ? 38 : 42, dim, T); naam(ctx, L2_NAAM[tp], x, 345, dim, 'center', C.text, 28);
      L2_chrom(ctx, x, 410, 250, { a: dim, aan: L2_CELGEN[tp], aanA: S.on(0, 0.7, 0.3 + i * 0.2) }); });
    const bx = 1040, len = 900;
    L2_alv(ctx, 210, 610, 52, s1); naam(ctx, 'alvleeskliercel', 210, 700, s1, 'center', C.text2, 26);
    L2_chrom(ctx, bx, 610, len, { a: s1, w: 46, aan: 'insuline', aanA: s1, namen: true, namenA: s1 });
    L2_huid(ctx, 210, 810, 46, s2); naam(ctx, 'huidcel', 210, 885, s2, 'center', C.text2, 26);
    L2_chrom(ctx, bx, 810, len, { a: s2, w: 46, aan: 'huid', aanA: s2, uit: 'insuline', uitA: S.on(2, 0.6, 0.5) });
    if (s3 > 0.01) balk(ctx, 'differentiatie: zelfde DNA, andere genen aan', 1040, 960, 1060, s3, C.goud, 38);
  } });

// ---------- 6 · delen of niet ----------
SCHERMEN.push({ titel: 'Delen of niet', kop: 'Gespecialiseerd: delen vaak niet meer', deel: 'Zelfde DNA, andere cel',
  stappen: [
    { t: 'Misschien dacht je: een zenuwcel heeft eigen zenuwgenen. Die zitten ook in je spiercel; ze staan daar alleen uit.', n: 'Misvatting uit de film (afleider a van de vraag op scherm 5). Afleider c (genen eruit geknipt) is ook fout: alle genen blijven in de cel.' },
    { t: 'Veel gedifferentieerde cellen delen zich niet meer, of bijna niet: een zenuwcel deelt niet, een hartspiercel bijna niet.', n: 'Vereenvoudigd zoals in de film. Hartspiercellen: zie scherm 9 voor de getallen.' },
    { t: 'Goed voor een stabiel lichaam, slecht nieuws na een infarct.', n: 'Terug naar de openingsvraag: dit is de helft van het antwoord. De andere helft (waar nieuwe huidcellen vandaan komen) komt op scherm 8.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9);
    misvatting(ctx, 'een zenuwcel heeft eigen zenuwgenen', 'die genen zitten in elke cel, maar staan uit', 960, 190, 1280, s0, S.on(0, 0.6, 0.8));
    L2_zenuw(ctx, 560, 560, 1.5, s1); naam(ctx, 'zenuwcel', 520, 690, s1, 'center', C.text, 32);
    kruis(ctx, 520, 760, 16, s1 * S.on(1, 0.5, 0.4)); regel(ctx, 'deelt niet', 550, 772, s1 * S.on(1, 0.5, 0.4), C.text, 32, 'left', 700);
    L2_hartspier(ctx, 1170, 560, 360, 80, { a: s1 * S.on(1, 0.6, 0.3), c: L2_beat(T, 0.2) }); naam(ctx, 'hartspiercel', 1350, 690, s1 * S.on(1, 0.6, 0.3), 'center', C.text, 32);
    regel(ctx, '≈ 0', 1240, 772, s1 * S.on(1, 0.5, 0.7), C.oker, 34, 'center', 700); regel(ctx, 'deelt bijna niet', 1290, 772, s1 * S.on(1, 0.5, 0.7), C.text, 32, 'left', 700);
    balk(ctx, 'stabiel lichaam   ·   geen nieuwe hartspier na een infarct', 960, 940, 1200, s2, C.goud, 38);
  } });

// ---------- 7 · vwo: wat zet een gen aan? ----------
function L2_dna(ctx, x0, x1, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  [0, 1].forEach(k => { ctx.strokeStyle = k ? C.line : mix(C.line, C.text2, 0.5); ctx.lineWidth = 5; ctx.beginPath(); for (let xx = x0; xx <= x1; xx += 6) ctx.lineTo(xx, y + Math.sin(xx * 0.045 + k * Math.PI) * 14); ctx.stroke(); }); ctx.restore(); }
SCHERMEN.push({ titel: 'Gen aan of uit', kop: 'Wat zet een gen aan?', deel: 'Zelfde DNA, andere cel',
  stappen: [
    { vwo: true, t: 'Vlak voor elk gen ligt de <b>promotor</b>. Daar binden eiwitten: <b>transcriptiefactoren</b>.', n: 'Vwo-verdieping uit de film (Nectar H2 en later DNA). Elke celsoort heeft zijn eigen combinatie van transcriptiefactoren; die bepaalt welke genen aan staan.' },
    { vwo: true, t: 'Dan kan <b>RNA-polymerase</b> het gen overschrijven: er ontstaat mRNA.', n: 'Transcriptie: het gen wordt overgeschreven naar mRNA, dat buiten de kern wordt vertaald in een eiwit (les DNA 3).' },
    { vwo: true, t: 'Een <b>methylgroep</b> op de promotor, of DNA strak om de <b>histonen</b>: dan wordt het gen niet overgeschreven.', n: 'Methylering van cytosine in de promotor en strak opgerold chromatine houden transcriptiefactoren en RNA-polymerase weg.' },
    { vwo: true, t: 'Die markeringen blijven, ook na een deling. Zo blijft een huidcel een huidcel: <b>epigenetica</b>.', n: 'Epigenetica = erfelijke veranderingen in genactiviteit zonder verandering in de basenvolgorde. Vwo-checkvraag 3 van de film (methylering van de Oct4-promotor) sluit hierop aan.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 2.2), s2 = S.on(2, 1.4), s3 = S.on(3, 0.8);
    const y1 = 390, y2 = 730, P0 = 380, P1 = 620, G0 = 660, G1 = 1560;
    regel(ctx, 'gen aan', 120, y1 - 70, s0, C.groen, 32, 'left', 700);
    L2_dna(ctx, 120, 1800, y1, s0);
    ctx.save(); ctx.globalAlpha *= s0; roundRect(ctx, P0, y1 - 30, P1 - P0, 60, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 3); roundRect(ctx, G0, y1 - 30, G1 - G0, 60, 14); shape(ctx, rgba(C.goud, 0.1), C.goud, 3); ctx.restore();
    naam(ctx, 'promotor', (P0 + P1) / 2, y1 + 72, s0, 'center', C.groen, 30); naam(ctx, 'gen', (G0 + G1) / 2, y1 + 72, s0, 'center', C.goud, 30);
    [[440, 1], [540, 0]].forEach(([x, i]) => L2_kluwen(ctx, x, lerp(y1 - 150, y1 - 46, S.on(0, 0.8, 0.3 + i * 0.2)), 34, C.groen, s0, i));
    naam(ctx, 'transcriptiefactoren', 490, y1 - 130, s0, 'center', C.groen, 28);
    const px = lerp(G0 + 40, G1 - 80, s1);
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let xx = G0 + 40; xx <= px; xx += 6) ctx.lineTo(xx, y1 - 100 - Math.sin(xx * 0.03 + T) * 10 - (px - xx) * 0.06); ctx.stroke(); ctx.restore();
      L2_kluwen(ctx, px, y1 - 6, 58, C.oker, s1, 0.4); naam(ctx, 'RNA-polymerase', px, y1 + 120, s1, 'center', C.oker, 28); naam(ctx, 'mRNA', G0 + 40, y1 - 172, S.on(1, 0.6, 1.2), 'left', C.goud, 30); }
    regel(ctx, 'gen uit', 120, y2 - 70, s2, C.koraal, 32, 'left', 700);
    L2_dna(ctx, 120, P1 + 20, y2, s2);
    ctx.save(); ctx.globalAlpha *= s2; roundRect(ctx, P0, y2 - 30, P1 - P0, 60, 14); shape(ctx, null, rgba(C.groen, 0.6), 3); ctx.restore();
    [420, 490, 560].forEach((x, i) => { const a = s2 * S.on(2, 0.4, i * 0.15); circ(ctx, x, y2 - 30, 14, rgba(C.koraal, 0.4 * a), rgba(C.koraal, a), 3); });
    naam(ctx, 'methylgroepen', 490, y2 + 72, s2, 'center', C.koraal, 28);
    const nx0 = 760, nn = 6, dx = (G1 - nx0) / nn; if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(P1 + 20, y2); ctx.lineTo(nx0 - 40, y2); ctx.stroke();
      for (let k = 0; k < nn; k++) { const cx = nx0 + k * dx + dx / 2, a = S.on(2, 0.5, 0.3 + k * 0.08); ctx.save(); ctx.globalAlpha *= a; circ(ctx, cx, y2, 42, mix(C.bg, C.line, 0.35), C.line, 3); ctx.strokeStyle = mix(C.line, C.text2, 0.5); ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, y2, 50, 22, -0.3, 0, 6.283); ctx.stroke(); ctx.restore();
        if (k < nn - 1) { ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx + 48, y2 + 6); ctx.quadraticCurveTo(cx + dx / 2, y2 + 26, cx + dx - 48, y2 - 6); ctx.stroke(); } }
      ctx.restore(); }
    naam(ctx, 'histonen (strak opgerold)', nx0 + (G1 - nx0) / 2, y2 + 100, s2, 'center', C.text2, 28);
    const tfy = lerp(y2 - 170, y2 - 130, Math.sin(T * 2) * 0.5 + 0.5); L2_kluwen(ctx, 610, tfy, 30, C.groen, s2 * S.on(2, 0.5, 0.6) * 0.8, 0.5); kruis(ctx, 660, tfy - 40, 14, s2 * S.on(2, 0.5, 0.9));
    balk(ctx, 'epigenetica: markeringen blijven na een deling', 960, 948, 1080, s3, C.paars, 38);
  } });

// ---------- 8 · de kiemlaag ----------
SCHERMEN.push({ titel: 'De kiemlaag', kop: 'Stamcellen in de kiemlaag', deel: 'Cellen die nog kunnen kiezen',
  stappen: [
    { t: 'Onderin je opperhuid, in de <b>kiemlaag</b>, zitten <b>stamcellen</b>: nog niet gespecialiseerd, en ze blijven delen.', n: 'De opperhuid in doorsnede, vereenvoudigd: onderin de kiemlaag (basale laag), daarboven steeds plattere cellen, bovenop de hoornlaag. Eronder de lederhuid.' },
    { t: 'Bij een deling blijft er meestal één stamcel over. De andere cel schuift omhoog.', n: 'Meestal asymmetrisch (één stamcel en één cel die gaat differentiëren), soms symmetrisch; gemiddeld blijft het aantal stamcellen gelijk.' },
    { t: 'Onderweg verhoornt hij. Bovenaan is hij dood en schilfert hij af.', n: 'De cel maakt steeds meer hoornstof (keratine), de kern verdwijnt, de cel wordt plat en sterft.' },
    { t: 'Zo blijft de voorraad stamcellen op peil. In ongeveer <b>vier weken</b> is je opperhuid helemaal nieuw.', n: 'Vier weken uit de film (vaak 4–6 weken genoemd). Een schaafwond heelt dus vanuit de kiemlaag aan de randen en onder de wond.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.6), s2 = S.on(2, 2.6), s3 = S.on(3, 0.9), X0 = 140, X1 = 1380, kx = 760;
    const uu = s1 > 0.01 ? ease(clamp(s1 * 1.8 - 0.8, 0, 1)) + s2 * 4.2 : -1, vrij = uu < 0 ? -1 : (s2 > 0.82 ? -1 : Math.min(5, Math.round(Math.max(1, uu))));
    L2_opperhuid(ctx, X0, X1, kx, s0, { vrij, stamHl: s0 * (1 - s1) * (0.6 + 0.4 * Math.sin(T * 2)) });
    // stamcel in de vrije kolom deelt: de ene blijft, de andere gaat omhoog
    const [y0, r0] = L2_RIJ[0]; const split = ease(clamp(s1 * 1.8, 0, 1)), op = ease(clamp(s1 * 1.8 - 0.8, 0, 1));
    L2_stam(ctx, kx, y0, r0, s0, { hl: 0 });
    if (s1 > 0.01) { // gevolgde cel: van de kiemlaag naar boven, wordt plat en verhoornt
      const u = op + s2 * 4.2, i = Math.min(5, Math.floor(u)), f = u - i, A = L2_RIJ[i], B = L2_RIJ[Math.min(5, i + 1)];
      let yy = lerp(A[0], B[0], i >= 5 ? 0 : f), plat = lerp(A[2], B[2], i >= 5 ? 0 : f), rr = lerp(A[1], B[1], i >= 5 ? 0 : f);
      if (u < 1) { yy = lerp(y0 - r0 * 0.4 * split, L2_RIJ[1][0], op); plat = op * L2_RIJ[1][2]; }
      const af = clamp((s2 - 0.82) / 0.18, 0, 1), dx = af * 120, dyy = -af * 90;
      ctx.save(); ctx.globalAlpha *= 1 - af * 0.7;
      if (plat > 0.95) L2_hoorn(ctx, kx + dx, yy + dyy, rr * 1.45); else L2_huid(ctx, kx, yy, rr * 0.95, 1, plat);
      ctx.beginPath(); ctx.ellipse(kx + dx, yy + dyy, rr * lerp(1.3, 1.75, plat), rr * lerp(1.0, 0.4, plat), 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    naam(ctx, 'hoornlaag', X1 + 30, 470, s0, 'left', C.oker, 30); naam(ctx, 'kiemlaag', X1 + 30, 790, s0, 'left', C.text, 30); naam(ctx, 'lederhuid', X1 + 30, 895, s0, 'left', C.text2, 28);
    naam(ctx, 'stamcel blijft', kx, 900, s1, 'center', C.groen, 30);
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(kx, y0, r0 + 14, 0.5, 2.6); ctx.stroke(); ctx.restore(); }
    naam(ctx, 'schuift omhoog', kx, 410, s1 * (1 - s2), 'center', C.goud, 30);
    naam(ctx, 'dood, schilfert af', kx + 140, 345, S.on(2, 0.5, 2.2), 'left', C.goud, 28);
    regel(ctx, '± 4 weken', 1600, 300, s3, C.goud, 56, 'center', 700); regel(ctx, 'opperhuid nieuw', 1600, 345, s3, C.text, 30, 'center', 500);
    metaText(ctx, 'opperhuid in doorsnede', X0, 205, C.meta, 'left', 24, s0);
  } });

// ---------- 9 · terug naar knie en hart ----------
SCHERMEN.push({ titel: 'Terug naar het hart', kop: 'Huid wel, hartspier niet', deel: 'Cellen die nog kunnen kiezen',
  stappen: [
    { t: 'In je huid zitten stamcellen die zich blijven delen. In je hartspier zijn zulke stamcellen niet gevonden.', n: 'Antwoord a op de vraag van scherm 2. De oude claims over hartstamcellen (c-kit-cellen) bleken niet te kloppen; zie de briefing.' },
    { t: 'En de hartspiercellen zelf vernieuwen heel langzaam: <b>hooguit 1 % per jaar</b>.', n: 'Uit C-14-onderzoek (Bergmann e.a.): ± 1 % per jaar op je 25e, minder als je ouder bent. Het grootste deel van je hartspiercellen heb je je hele leven.' },
    { t: 'Te groot om te delen? Een bevruchte eicel is groter en deelt wel. Het gaat om specialisatie, niet om grootte.', n: 'Afleider b van de vraag op scherm 2. Op dezelfde schaal: bevruchte eicel ± 0,1 mm doorsnede, hartspiercel 50–100 µm lang en 10–25 µm breed.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9);
    paneel(ctx, 110, 180, 800, 500, s0, rgba(C.groen, 0.6)); paneel(ctx, 1010, 180, 800, 500, s0 * S.on(0, 0.6, 0.4), rgba(C.koraal, 0.6));
    regel(ctx, 'huid', 510, 245, s0, C.groen, 40, 'center', 700); regel(ctx, 'hartspier', 1410, 245, s0 * S.on(0, 0.6, 0.4), C.koraal, 40, 'center', 700);
    ctx.save(); ctx.beginPath(); ctx.rect(130, 270, 760, 300); ctx.clip(); ctx.translate(0, -300); L2_opperhuid(ctx, 150, 870, -999, s0, { stamHl: 0.7 + 0.3 * Math.sin(T * 2) }); ctx.restore();
    vink(ctx, 230, 625, 18, s0, C.groen); regel(ctx, 'stamcellen in de kiemlaag', 265, 637, s0, C.text, 30, 'left', 600);
    const a1 = s0 * S.on(0, 0.6, 0.4); for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) L2_hartspier(ctx, 1080 + c * 330 + (r % 2) * 110, 340 + r * 80, 300, 54, { a: a1, c: L2_beat(T, 0.1), vertak: (r + c) % 3 - 1 });
    kruis(ctx, 1130, 625, 15, a1); regel(ctx, 'geen stamcellen gevonden', 1165, 637, a1, C.text, 30, 'left', 600);
    kansBalk(ctx, 1080, 700, 420, 34, 0.01, C.koraal, s1, ''); regel(ctx, 'hooguit 1 % per jaar', 1520, 728, s1, C.text, 32, 'left', 700);
    const sc = 2, y = 870; // 2 px per µm
    circ(ctx, 300, y, 50 * sc, rgba(C.goud, 0.06 * s2), rgba(C.text2, 0.55 * s2), 6); L2_klieving(ctx, 300, y, 46 * sc, 0, s2);
    naam(ctx, 'bevruchte eicel', 450, y - 10, s2, 'left', C.text, 30); regel(ctx, '± 0,1 mm · deelt', 450, y + 30, s2, C.groen, 28, 'left', 600);
    L2_hartspier(ctx, 920, y, 100 * sc, 20 * sc, { a: s2 * S.on(2, 0.6, 0.3), vertak: 0, c: L2_beat(T, 0.1) });
    naam(ctx, 'hartspiercel', 1150, y - 10, s2 * S.on(2, 0.6, 0.3), 'left', C.text, 30); regel(ctx, '50–100 µm · deelt bijna niet', 1150, y + 30, s2 * S.on(2, 0.6, 0.3), C.koraal, 28, 'left', 600);
    if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1600, y + 50); ctx.lineTo(1600 + 50 * sc, y + 50); ctx.stroke(); ctx.restore(); regel(ctx, '50 µm', 1650, y + 28, s2, C.text2, 26, 'center', 600); }
  } });

// ---------- 10 · beenmerg en darm ----------
SCHERMEN.push({ titel: 'Beenmerg en darm', kop: 'Volwassen stamcellen', deel: 'Cellen die nog kunnen kiezen',
  stappen: [
    { t: 'Ook in je <b>rode beenmerg</b> zitten stamcellen. Hun dochtercellen delen zich heel snel.', n: 'Bij volwassenen zit rood beenmerg vooral in platte botten (borstbeen, bekken, wervels) en in de uiteinden van pijpbeenderen; in de schacht zit geel (vet)merg. De bloedstamcellen zelf delen zelden; het snelle werk doen hun dochtercellen.' },
    { t: 'Zo maak je elke seconde ongeveer <b>2 miljoen</b> nieuwe rode bloedcellen, plus witte bloedcellen en bloedplaatjes.', n: 'Rekenvoorbeeld als iemand doorvraagt: een rode bloedcel leeft ± 120 dagen.' },
    { t: 'In je darm vernieuwen stamcellen de binnenste laag van de wand: elke <b>3 tot 5 dagen</b>.', n: 'De stamcellen zitten onderin de crypten; de cellen schuiven langs de darmvlok omhoog en laten bovenaan los.' },
    { t: 'Zulke <b>volwassen stamcellen</b> maken alleen de celsoorten van hun eigen weefsel: een bloedstamcel maakt bloedcellen, geen huid.', n: 'Begrip: volwassen stamcel (weefselspecifiek). Vwo: multipotent (scherm 17).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    L2_bot(ctx, 220, 500, 500, s0); naam(ctx, 'rood beenmerg', 220, 830, s0, 'center', C.bloed, 28);
    const zx = 620, zy = 420, zr = 210;
    zoom(ctx, zx, zy, zr, s0, [220, 280], () => L2_merg(ctx, zx, zy, zr, T, { stamHl: 0.7 }));
    naam(ctx, 'stamcellen', zx, zy - zr - 18, s0, 'center', C.goud, 28);
    if (s1 > 0.01) { for (let i = 0; i < 6; i++) { const u = (T * 0.35 + i / 6) % 1; L2_rbc(ctx, zx + zr + 20 + u * 200, zy + 60 + Math.sin(u * 6 + i) * 30, 14, s1 * (1 - u)); } }
    regel(ctx, '± 2 miljoen', zx, zy + zr + 60, s1, C.goud, 44, 'center', 700); regel(ctx, 'rode bloedcellen per seconde', zx, zy + zr + 100, s1, C.text, 28, 'center', 500);
    L2_darm(ctx, 1410, 420, 1.1, T, s2, { stamHl: 0.7 }); naam(ctx, 'darmvlok', 1560, 260, s2, 'left', C.text, 28); naam(ctx, 'stamcellen', 1490, 680, s2, 'left', C.goud, 28);
    regel(ctx, '3–5 dagen', 1660, 420, s2, C.goud, 44, 'left', 700); regel(ctx, 'laag nieuw', 1660, 460, s2, C.text, 28, 'left', 500);
    const y = 890, sx = 760; L2_stam(ctx, sx, y, 34, s3, { hl: 1 }); naam(ctx, 'bloedstamcel', sx - 52, y + 10, s3, 'right', C.text, 28);
    pijl(ctx, sx + 45, y - 8, sx + 175, y - 40, C.text2, 4, s3); L2_rbc(ctx, sx + 205, y - 48, 18, s3); L2_wbc(ctx, sx + 255, y - 44, 20, s3); L2_plaatje(ctx, sx + 300, y - 46, 10, s3); vink(ctx, sx + 345, y - 46, 15, s3, C.groen);
    pijl(ctx, sx + 45, y + 12, sx + 175, y + 44, C.text2, 4, s3 * S.on(3, 0.5, 0.4)); L2_huid(ctx, sx + 225, y + 46, 26, s3 * S.on(3, 0.5, 0.4)); kruis(ctx, sx + 300, y + 46, 14, s3 * S.on(3, 0.5, 0.6));
    regel(ctx, 'alleen eigen weefsel', sx + 390, y + 12, s3 * S.on(3, 0.5, 0.7), C.text, 32, 'left', 700);
  } });

// ---------- 11 · embryonale stamcellen ----------
SCHERMEN.push({ titel: 'Embryonale stamcellen', kop: 'Embryonale stamcellen', deel: 'Cellen die nog kunnen kiezen',
  stappen: [
    { t: 'Een embryo van vijf dagen is een holle bol, met binnenin een klompje cellen.', n: 'De holle bol heet blastocyste; het klompje is de binnenste celmassa (daaruit groeit het embryo, de buitenste laag wordt later o.a. placenta).' },
    { t: 'Onderzoekers kweken die cellen in het lab: <b>embryonale stamcellen</b>.', n: 'Een kweek van cellen uit de binnenste celmassa. Wat dat ethisch betekent: scherm 16.' },
    { t: 'Die cellen kunnen nog <b>elke celsoort</b> van het lichaam worden.', n: 'Vergelijk scherm 10: een volwassen stamcel maakt alleen de celsoorten van zijn eigen weefsel. Vwo: pluripotent (scherm 17).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.2), s2 = S.on(2, 0.9);
    L2_blasto(ctx, 420, 560, 230, s0, s1 * (0.7 + 0.3 * Math.sin(T * 2)));
    naam(ctx, 'binnenste celmassa', 300, 290, s0, 'center', C.goud, 30); naam(ctx, 'holle bol', 420, 850, s0, 'center', C.text, 30); metaText(ctx, 'embryo · 5 dagen', 420, 895, C.meta, 'center', 24, s0);
    pijl(ctx, 700, 560, 790, 560, C.text2, 5, s1); L2_schaal(ctx, 1010, 560, 200, s1, s1, T); naam(ctx, 'kweek in het lab', 1010, 720, s1, 'center', C.text, 30);
    ['zenuw', 'spier', 'alv', 'huid', 'bloed'].forEach((tp, i) => { const y = 250 + i * 150, a = s2 * S.on(2, 0.5, i * 0.12); pijl(ctx, 1220, 560, 1440, y + (y < 560 ? 18 : y > 560 ? -18 : 0), C.text2, 3, a);
      L2_cel(ctx, tp, 1580, y, tp === 'spier' ? 18 : tp === 'zenuw' ? 34 : 38, a, T); });
    regel(ctx, 'elke celsoort', 1580, 1000, s2, C.goud, 36, 'center', 700);
  } });

// ---------- 12 · stamceltransplantatie ----------
const L2_ERIK = [400, 900, 560];
SCHERMEN.push({ titel: 'Leukemie', kop: 'Stamcellen als medicijn: leukemie', deel: 'Stamcellen als medicijn',
  stappen: [
    { t: 'Bij <b>leukemie</b> maakt het beenmerg afwijkende bloedcellen. Die delen zich ongeremd en verdringen de gezonde cellen.', n: 'Leukemie = bloedkanker. De patiënt is Erik (figurant, zonder naam in beeld), zoals in de film.' },
    { t: 'Artsen vernietigen het zieke beenmerg met chemo, soms ook met bestraling.', n: 'Ook het afweersysteem van de patiënt wordt zo uitgeschakeld, zodat de donorcellen niet worden afgestoten (checkvraag 2a van de film).' },
    { t: 'Via een infuus krijgt de patiënt <b>bloedstamcellen van een donor</b>.', n: 'Tegenwoordig komen de donorstamcellen meestal uit het bloed van de donor, soms uit beenmerg of navelstrengbloed; daarom heet het stamceltransplantatie.' },
    { t: 'Die zoeken zelf hun weg naar het beenmerg en maken daar weer gezond bloed.', n: 'Begrip: stamceltransplantatie. Teal = cellen van de donor (ook op het volgende scherm).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.6), s1 = S.on(1, 1.2), s2 = S.on(2, 0.9), s3 = S.on(3, 2.0);
    const [ex, ey, eh] = L2_ERIK, opt = { pose: 'zit', stoel: true, uit: 'neutraal', kijk: 1 };
    pers(ctx, 'erik', ex, ey, eh, Object.assign({ t: T, a: 1 }, opt));
    const hd = L2_hand('erik', ex, ey, eh, opt);
    L2_infuus(ctx, 690, ey, 470, [hd.x, hd.y], s2, T, s2 * (1 - s3 * 0.5));
    naam(ctx, 'infuus met donorstamcellen', 700, 960, s2, 'center', C.teal, 28);
    const zx = 1360, zy = 520, zr = 300;
    zoom(ctx, zx, zy, zr, 1, [ex, ey - eh * 0.45], () => L2_merg(ctx, zx, zy, zr, T, { leuk: s0, leeg: s1, donor: s3, nieuw: S.on(3, 1.2, 1.2) }));
    naam(ctx, 'beenmerg', zx, zy - zr - 20, 1, 'center', C.text, 32);
    naam(ctx, 'leukemiecellen', zx, zy + zr + 50, s0 * (1 - s1), 'center', C.koraal, 30);
    regel(ctx, 'leeg na chemo', zx, zy + 10, s1 * (1 - s3), C.text2, 34, 'center', 600);
    naam(ctx, 'donorcellen maken nieuw bloed', zx, zy + zr + 50, s3, 'center', C.teal, 30);
  } });

// ---------- 13 · de donor moet passen ----------
SCHERMEN.push({ titel: 'De donor moet passen', kop: 'De donor moet passen', deel: 'Stamcellen als medicijn',
  stappen: [
    { t: 'Op je cellen zitten <b>herkenningseiwitten</b>. Die van de donor moeten bijna hetzelfde zijn als die van de patiënt.', n: 'Herkenningseiwitten = HLA-eiwitten (weefseltype). Broers en zussen passen het vaakst, maar lang niet altijd; daarnaast zijn er donorregisters (Matchis).' },
    { t: 'Anders ruimt het afweersysteem de donorcellen op, of keren de donorcellen zich juist tegen het lichaam van de patiënt.', n: 'Begrip: afstoting. Het omgekeerde (donorcellen vallen de patiënt aan) heet graft-versus-hostziekte; die term hoeft niet.' },
    { t: 'Daarna heeft het nieuwe bloed het DNA van de donor, zelfs zijn bloedgroep. Huid en geslachtscellen houden hun eigen DNA.', n: 'Let op: rode bloedcellen hebben geen DNA; het DNA in een bloedmonster komt uit de witte bloedcellen. Checkvraag 2 van de film (bloed van haar broer) gaat hierover.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), y = 370;
    L2_hla(ctx, 380, y, 95, 0, C.oker, s0); naam(ctx, 'patiënt', 380, y + 175, s0, 'center', C.oker, 32);
    L2_hla(ctx, 960, y, 95, 0, C.teal, s0 * S.on(0, 0.6, 0.4)); naam(ctx, 'donor die past', 960, y + 175, s0 * S.on(0, 0.6, 0.4), 'center', C.teal, 32); vink(ctx, 1110, y - 110, 20, s0 * S.on(0, 0.5, 0.8), C.groen);
    L2_hla(ctx, 1540, y, 95, 2, C.koraal, s1); naam(ctx, 'donor die niet past', 1540, y + 175, s1, 'center', C.koraal, 32); kruis(ctx, 1690, y - 110, 18, s1 * S.on(1, 0.5, 0.4));
    naam(ctx, 'herkenningseiwitten', 380, y - 160, s0, 'center', C.text2, 28);
    const y2 = 800;
    paneel(ctx, 160, y2 - 140, 1600, 280, s2);
    L2_wbc(ctx, 330, y2 - 20, 42, s2, { donor: true }); naam(ctx, 'witte bloedcel', 330, y2 + 70, s2, 'center', C.text, 28);
    L2_chrom(ctx, 600, y2 - 20, 200, { a: s2 * S.on(2, 0.5, 0.2) }); regel(ctx, 'DNA donor', 600, y2 + 60, s2 * S.on(2, 0.5, 0.2), C.teal, 30, 'center', 700);
    L2_huid(ctx, 1040, y2 - 20, 40, s2 * S.on(2, 0.5, 0.5)); naam(ctx, 'huidcel', 1040, y2 + 70, s2 * S.on(2, 0.5, 0.5), 'center', C.text, 28);
    L2_stam(ctx, 1330, y2 - 20, 30, s2 * S.on(2, 0.5, 0.7), { kl: C.oker }); naam(ctx, 'geslachtscel', 1330, y2 + 70, s2 * S.on(2, 0.5, 0.7), 'center', C.text, 28);
    regel(ctx, 'eigen DNA', 1580, y2 - 8, s2 * S.on(2, 0.5, 0.8), C.oker, 32, 'center', 700);
  } });

// ---------- 14 · een hart repareren ----------
SCHERMEN.push({ titel: 'Een hart repareren', kop: 'Bloedstamcellen voor het hart?', deel: 'Stamcellen als medicijn',
  stappen: [
    { t: 'Bloedstamcellen maken alleen bloedcellen. Ze hebben wel alle genen, maar hun keuzes liggen grotendeels vast.', n: 'Vraag uit de film: Zou je met diezelfde bloedstamcellen ook een beschadigd hart kunnen herstellen? (a) ja: ze hebben alle genen, dus ze kunnen ook hartspier maken · (b) nee: ze delen zich te langzaam om een hart op tijd te herstellen · (c) nee: ze kunnen alleen de celsoorten van het bloed maken. Antwoord c. Artsen hebben het geprobeerd: er kwam geen nieuwe hartspier.' },
    { t: 'In het lab kunnen onderzoekers een gewone huidcel terugzetten tot een stamcel: een <b>geïnduceerde stamcel</b>.', n: 'Begrip: geïnduceerde stamcel (iPS-cel). Hoe dat gaat (vier transcriptiefactoren, Yamanaka): vwo, scherm 17.' },
    { t: 'Die kan weer bijna elke celsoort worden, ook hartspiercellen.', n: '\'Bijna elke celsoort\': alles behalve de placenta (vwo: pluripotent).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.4), s2 = S.on(2, 0.9), y1 = 330, y2 = 720;
    L2_stam(ctx, 330, y1, 60, s0, { hl: 1 }); naam(ctx, 'bloedstamcel', 330, y1 + 110, s0, 'center', C.text, 30);
    pijl(ctx, 420, y1 - 20, 620, y1 - 70, C.text2, 4, s0); L2_rbc(ctx, 670, y1 - 80, 24, s0); L2_wbc(ctx, 740, y1 - 76, 26, s0); vink(ctx, 800, y1 - 78, 16, s0, C.groen);
    pijl(ctx, 420, y1 + 20, 920, y1 + 50, C.text2, 4, s0 * S.on(0, 0.5, 0.4)); L2_hartspier(ctx, 960, y1 + 50, 260, 56, { a: s0 * S.on(0, 0.5, 0.4) * 0.45 }); kruis(ctx, 1290, y1 + 50, 20, s0 * S.on(0, 0.5, 0.7));
    naam(ctx, 'geen nieuwe hartspier', 1340, y1 + 62, s0 * S.on(0, 0.5, 0.7), 'left', C.koraal, 30);
    L2_huid(ctx, 330, y2, 52, s1); naam(ctx, 'huidcel', 330, y2 + 95, s1, 'center', C.text, 30);
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(420, y2 - 40); ctx.quadraticCurveTo(540, y2 - 160, 650, y2 - 40); ctx.stroke(); ctx.restore(); pijl(ctx, 630, y2 - 60, 652, y2 - 34, C.goud, 5, s1, 20); }
    regel(ctx, 'terugzetten', 540, y2 - 150, s1, C.goud, 28, 'center', 700);
    L2_stam(ctx, 730, y2, 56, s1 * S.on(1, 0.6, 0.6), { hl: 1 }); naam(ctx, 'geïnduceerde stamcel', 730, y2 + 105, s1 * S.on(1, 0.6, 0.6), 'center', C.goud, 30);
    pijl(ctx, 810, y2, 950, y2, C.text2, 5, s2); L2_hartspier(ctx, 980, y2, 300, 64, { a: s2, c: L2_beat(T, 0.2) }); vink(ctx, 1330, y2, 20, s2 * S.on(2, 0.5, 0.4), C.groen);
    naam(ctx, 'hartspiercel', 1130, y2 + 95, s2, 'center', C.text, 30);
  } });

// ---------- 15 · samen kloppen ----------
SCHERMEN.push({ titel: 'Samen kloppen', kop: 'Eén cel klopt, samen één ritme', deel: 'Stamcellen als medicijn',
  stappen: [
    { t: 'In het lab kloppen zulke hartspiercellen echt. Eén losse cel klopt al, maar in zijn eigen tempo.', n: 'Hartspiercellen uit iPS-cellen kloppen spontaan in de kweekschaal; een filmpje daarvan laat goed zien dat het echt gebeurt.' },
    { t: 'Leg je veel cellen tegen elkaar, dan geven ze een signaal aan elkaar door.', n: 'Via de tussenschijven (met gap junctions) loopt het elektrische signaal van cel naar cel.' },
    { t: 'Dan kloppen ze allemaal tegelijk, in één ritme. Dat kan één cel niet: een nieuwe eigenschap van het <b>weefsel</b>.', n: 'Begrippen: weefsel (groep gelijke cellen met dezelfde taak) en emergente eigenschap (nieuwe eigenschap van het geheel die de losse delen niet hebben). Verband met les 1 (organisatieniveaus).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 1.2);
    ctx.save(); ctx.globalAlpha *= s0; ctx.beginPath(); ctx.ellipse(470, 520, 330, 220, 0, 0, 6.283); shape(ctx, rgba(C.oker, C.licht ? 0.06 : 0.08), C.line, 4); ctx.restore();
    [[300, 420, 0.0, 1.0], [420, 600, 0.5, 1.45], [560, 460, 0.25, 0.8]].forEach(([x, y, ph, f], i) => { const b = L2_beat(T, ph, f); L2_hartspier(ctx, x - 90, y, 200, 46, { a: s0, c: b, vertak: i % 2 ? -1 : 1 }); if (b > 0.3) gloed(ctx, x, y, 70, C.goud, b * s0 * 0.6); });
    naam(ctx, 'losse cellen: elk een eigen tempo', 470, 800, s0, 'center', C.text, 30);
    const gx = 1000, gy = 300, gw = 760, gh = 420, n = 5, m = 4, rh = gh / n, cw = gw / m, golf = (T * 0.6) % 1.4;
    if (s1 > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(gx - 10, gy - rh * 0.5, gw + 20, gh + rh); ctx.clip();
      for (let r = 0; r < n; r++) for (let c = 0; c <= m; c++) { const i = r * (m + 1) + c, xx = gx + c * cw - (r % 2) * cw * 0.45, yy = gy + r * rh + rh / 2; const eigen = L2_beat(T, hash(i * 3.3) * 2, 0.8 + hash(i * 1.7) * 0.8), samen = L2_beat(T - (xx - gx) / gw * 0.25, 0, 1.1);
        L2_hartspier(ctx, xx, yy, cw * 1.02, rh * 0.62, { a: s1 * S.on(1, 0.5, (c + r) * 0.04), c: lerp(eigen, samen, s2), vertak: i % 3 - 1 }); }
      ctx.restore();
      if (s1 > 0.01 && s2 < 0.99) { const gxx = gx + clamp(golf, 0, 1) * gw; ctx.save(); ctx.globalAlpha *= s1 * (1 - s2) * (golf < 1 ? 1 : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gxx, gy - 20); ctx.lineTo(gxx, gy + gh + 20); ctx.stroke(); ctx.restore(); } }
    naam(ctx, 'signaal', gx + 20, gy - 40, s1 * (1 - s2), 'left', C.goud, 30);
    naam(ctx, 'samen: één ritme', gx + gw / 2, gy + gh + 80, s2, 'center', C.text, 32);
    if (s2 > 0.01) { const b = L2_beat(T, 0, 1.1); gloed(ctx, gx + gw / 2, gy + gh / 2, 420, C.goud, b * s2 * 0.35); }
    termKaart(ctx, 'emergente eigenschap', 'nieuw in het weefsel, niet in één cel', 960, 870, s2 * S.on(2, 0.6, 0.6), C.goud);
  } });

// ---------- 16 · kansen en grenzen ----------
SCHERMEN.push({ titel: 'Kansen en grenzen', kop: 'Kansen en grenzen', deel: 'Stamcellen als medicijn',
  stappen: [
    { t: 'Om embryonale stamcellen te kweken gaat een embryo verloren. In Nederland gebruiken onderzoekers <b>restembryo\'s van ivf</b>; de regels zijn streng.', n: 'Restembryo\'s = embryo\'s die na een ivf-behandeling over zijn en die ouders aan de wetenschap geven (schriftelijke toestemming, Embryowet, toetsing door een commissie). Embryo\'s speciaal voor onderzoek maken mag niet; controleer de actuele stand van de wet (zie briefing).' },
    { t: 'Geïnduceerde stamcellen: je eigen cellen, dus in principe geen afstoting. Maar ze delen zo makkelijk dat er soms <b>tumoren</b> uit ontstaan.', n: 'Ook embryonale stamcellen kunnen tumoren vormen. Daarom worden iPS-cellen nu vooral in het lab gebruikt, en nog maar in een paar proeven bij patiënten (bijv. de ziekte van Parkinson, zie de briefing).' },
    { t: 'Let in zo\'n discussie op het soort argument: <b>biologisch</b> (feiten) of <b>ethisch</b> (normen en waarden).', n: 'Laat leerlingen bij een paar uitspraken zeggen welk soort argument het is. Voorbeeld uit de film: biologisch = embryonale stamcellen kunnen nog elke celsoort worden, volwassen niet; ethisch = een embryo is het begin van een mens.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9);
    paneel(ctx, 110, 180, 820, 470, s0); paneel(ctx, 990, 180, 820, 470, s1);
    regel(ctx, 'embryonale stamcellen', 520, 245, s0, C.text, 36, 'center', 700); regel(ctx, 'geïnduceerde stamcellen', 1400, 245, s1, C.goud, 36, 'center', 700);
    L2_blasto(ctx, 330, 430, 120, s0, 0); pijl(ctx, 470, 430, 560, 430, C.text2, 4, s0); L2_schaal(ctx, 720, 430, 120, s0, 1, T);
    regel(ctx, 'restembryo\'s van ivf', 520, 600, s0, C.text, 30, 'center', 600);
    L2_stam(ctx, 1100, 420, 52, s1, { hl: 1 });
    vink(ctx, 1200, 380, 16, s1, C.groen); regel(ctx, 'eigen cellen: in principe geen afstoting', 1235, 392, s1, C.text, 28, 'left', 600);
    regel(ctx, '!', 1200, 478, s1, C.koraal, 44, 'center', 700); regel(ctx, 'soms tumoren', 1235, 472, s1, C.text, 28, 'left', 600);
    regel(ctx, 'nu vooral in het lab', 1400, 600, s1, C.text2, 28, 'center', 500);
    termKaart(ctx, 'biologisch argument', 'feiten: wat een cel kan worden', 520, 730, s2, C.teal, 760);
    termKaart(ctx, 'ethisch argument', 'normen en waarden: mag dat?', 1400, 730, s2 * S.on(2, 0.6, 0.4), C.paars, 760);
  } });

// ---------- 17 · vwo: hoeveel kan een cel nog worden? ----------
SCHERMEN.push({ titel: 'Toti, pluri, multi', kop: 'Hoeveel kan een cel nog worden?', deel: 'Stamcellen als medicijn',
  stappen: [
    { vwo: true, t: '<b>Totipotent</b>: de bevruchte eicel en de eerste cellen daarna maken het hele lichaam én de placenta.', n: 'Vwo-blok uit de film. Totipotent = ook de buitenste laag van de blastocyste en dus de placenta.' },
    { vwo: true, t: '<b>Pluripotent</b>: de binnenste celmassa en embryonale stamcellen: elke celsoort van het lichaam, maar geen placenta.', n: 'Ook iPS-cellen zijn pluripotent (de p van iPS).' },
    { vwo: true, t: '<b>Multipotent</b>: volwassen stamcellen, een paar celsoorten van hun weefsel. Een stamcel in de kiemlaag maakt er één: <b>unipotent</b>.', n: 'Bloedstamcel = multipotent (rode en witte bloedcellen, bloedplaatjes).' },
    { vwo: true, t: '2006: Yamanaka zet muizencellen terug tot stamcellen, met vier transcriptiefactoren. Een jaar later lukt het bij de mens: de <b>iPS-cel</b>.', n: 'iPS = geïnduceerde pluripotente stamcel. De vier factoren: Oct4, Sox2, Klf4 en c-Myc (c-Myc stimuleert deling: tumorrisico). Nobelprijs 2012, gedeeld met de Brit John Gurdon (kerntransplantatie bij de kikker).' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)], s3 = S.on(3, 1.2);
    const rij = [['totipotent', 'hele lichaam + placenta', 1.0], ['pluripotent', 'elke celsoort, geen placenta', 0.8], ['multipotent', 'een paar celsoorten', 0.35], ['unipotent', 'één celsoort', 0.12]];
    rij.forEach(([nm, sub, f], i) => { const a = i < 3 ? s[i] : s[2] * S.on(2, 0.5, 0.5), y = 250 + i * 185; if (a <= 0.01) return;
      if (i === 0) L2_klieving(ctx, 200, y, 62, 0, a); else if (i === 1) L2_blasto(ctx, 200, y, 72, a, 0.6); else if (i === 2) L2_stam(ctx, 200, y, 44, a, { hl: 1 }); else L2_stam(ctx, 200, y, 34, a);
      naam(ctx, nm, 310, y - 8, a, 'left', C.paars, 38); regel(ctx, sub, 310, y + 36, a, C.text2, 28, 'left', 500);
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 760, y - 24, 340, 40, 20); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 2); roundRect(ctx, 760, y - 24, Math.max(40, 340 * f * S.on(i < 3 ? i : 2, 0.8, 0.3)), 40, 20); shape(ctx, rgba(C.goud, 0.4), C.goud, 2); ctx.restore(); });
    metaText(ctx, 'wat een cel nog kan worden', 930, 205, C.meta, 'center', 22, s[0]);
    if (s3 > 0.01) { paneel(ctx, 1190, 190, 640, 790, s3, rgba(C.paars, 0.6)); regel(ctx, 'iPS-cel', 1510, 260, s3, C.goud, 44, 'center', 700);
      L2_huid(ctx, 1320, 400, 46, s3); naam(ctx, 'huidcel', 1320, 470, s3, 'center', C.text, 28);
      ['Oct4', 'Sox2', 'Klf4', 'c-Myc'].forEach((g, i) => { const a = s3 * S.on(3, 0.4, 0.3 + i * 0.12), x = 1550, y = 340 + i * 56; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 22, 140, 44, 22); shape(ctx, rgba(C.groen, 0.15), C.groen, 2); ctx.restore(); regel(ctx, g, x, y + 10, a, C.text, 26, 'center', 700); });
      pijl(ctx, 1640, 420, 1700, 560, C.text2, 4, s3 * S.on(3, 0.5, 0.8)); L2_stam(ctx, 1700, 640, 48, s3 * S.on(3, 0.5, 0.9), { hl: 1 });
      regel(ctx, '2006 muis · 2007 mens', 1510, 800, s3 * S.on(3, 0.5, 1.0), C.text, 30, 'center', 600);
      regel(ctx, 'Nobelprijs 2012', 1510, 870, s3 * S.on(3, 0.5, 1.2), C.goud, 34, 'center', 700); regel(ctx, 'Yamanaka en Gurdon', 1510, 915, s3 * S.on(3, 0.5, 1.2), C.text2, 28, 'center', 500); }
  } });

// ---------- 18 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Zelfde DNA, andere cel', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Differentiatie</b>: je lichaamscellen hebben hetzelfde DNA, maar in elke cel staan andere genen aan.', n: 'Terug naar de openingsvraag: gespecialiseerde cellen delen vaak niet meer (zenuwcel, hartspiercel).' },
    { t: '<b>Stamcellen</b> blijven delen; gemiddeld blijft er één stamcel over. Volwassen: eigen weefsel; embryonaal: elke celsoort.', n: 'Kiemlaag, beenmerg, darm. In de hartspier zijn geen stamcellen gevonden: daarom geen herstel na een infarct.' },
    { t: 'Als medicijn: bij <b>transplantatie</b> moet de donor passen; <b>geïnduceerde stamcellen</b> zijn je eigen cellen, maar met tumorrisico.', n: 'Samen kloppen in één ritme = emergente eigenschap van het weefsel. Biologisch of ethisch argument.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['differentiatie', C.goud, ['zelfde DNA', 'andere genen aan', 'specialist deelt vaak niet']], ['stamcellen', C.groen, ['blijven delen', 'kiemlaag, beenmerg, darm', 'volwassen of embryonaal']], ['als medicijn', C.teal, ['donor moet passen', 'iPS: eigen cellen', 'samen kloppen: emergent']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { L2_chrom(ctx, x + 270, 380, 380, { a, aan: 'insuline', aanA: 0.5 + 0.5 * Math.sin(T * 1.5) }); L2_alv(ctx, x + 170, 500, 46, a); L2_huid(ctx, x + 370, 500, 42, a); }
      if (i === 1) { L2_stam(ctx, x + 200, 440, 52, a, { hl: 1 }); pijl(ctx, x + 265, 440, x + 330, 440, C.text2, 4, a); L2_stam(ctx, x + 380, 400, 34, a); L2_huid(ctx, x + 390, 500, 32, a, 0.4); }
      if (i === 2) { L2_hla(ctx, x + 190, 450, 60, 0, C.teal, a); L2_hartspier(ctx, x + 300, 450, 190, 44, { a, c: L2_beat(T, 0, 1.1) }); }
      regels.forEach((r, k) => regel(ctx, r, x + 30, 670 + k * 70, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 19 · volgende keer ----------
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 3): <b>celorganellen</b>, alles wat één cel moet kunnen: kern, ER en golgi, mitochondriën en de plantencel.', n: 'Huiswerk: de film Stamcellen nog eens kijken en \'Zelf aan de slag\' onder de film. Wie vooruit wil, kijkt de film Celorganellen.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Celorganellen', [['De kern', 'de bouwtekening', L2_icoonKern], ['ER en golgi', 'eiwitten maken en inpakken', L2_icoonER], ['Mitochondriën', 'energie', L2_icoonMito], ['De plantencel', 'celwand en bladgroen', L2_icoonPlant]]); } });

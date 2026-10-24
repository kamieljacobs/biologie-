// Film 10 · Het ontstaan van het leven — eigen hulpfuncties voor de animatie (geladen na teken_evo10, lib_dieren, lib_micro_evo; vóór sb10).
// E10T = tijd in de huidige alinea (gezet door de omhulling onderaan scenes_e10.js), voor rook, golven en flitsen in gedeelde decors.
let E10T = 0;
// de speler tekent zelf 'havo · vwo · evolutie extra 2/4' linksboven: de eigen kop van het storyboard vervalt
function olTag() {}
// vulkaan met rook die echt opstijgt
function olVulkaan(ctx, x, y, w, h, o = {}) { const { a = 1, rook = true, lava = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vul(ctx, [[x - w / 2, y], [x - w * 0.12, y - h], [x - w * 0.06, y - h * 0.97], [x + w * 0.06, y - h * 0.97], [x + w * 0.12, y - h], [x + w / 2, y]], '#3E3A3C', '#5A5456', 2);
  vul(ctx, [[x - w * 0.12, y - h], [x + w * 0.12, y - h], [x + w * 0.2, y - h * 0.72], [x + w * 0.05, y - h * 0.8], [x - w * 0.1, y - h * 0.7], [x - w * 0.22, y - h * 0.74]], '#55504E', null);
  if (lava) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.03, y - h * 0.97); ctx.quadraticCurveTo(x + w * 0.1, y - h * 0.6, x + w * 0.05, y - h * 0.35); ctx.quadraticCurveTo(x, y - h * 0.15, x + w * 0.08, y); ctx.stroke(); }
  if (rook) for (let i = 0; i < 6; i++) { const ph = (E10T * 0.12 + i / 6 + hash(x) * 0.3) % 1; circ(ctx, x + Math.sin(ph * 4 + i) * 18 + ph * 40, y - h - 20 - ph * 220, 24 + ph * 46, rgba('#8A8E96', 0.34 * (1 - ph))); }
  ctx.restore(); }
// jonge aarde met bewegende golven (bliksem tekent de scène zelf, met flitsen)
function olJongeAarde(ctx, o = {}) { const { hor = 560 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hor - 140, W, 140);
  ctx.fillStyle = '#2C3B58'; for (const [cx, cy, rw] of [[300, 170, 260], [820, 130, 320], [1420, 190, 280], [1760, 120, 200]]) { const dx = Math.sin(E10T * 0.05 + cx) * 20; ctx.beginPath(); ctx.ellipse(cx + dx, cy, rw, 46, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx + dx + rw * 0.3, cy - 30, rw * 0.5, 40, 0, 0, 6.283); ctx.fill(); }
  olVulkaan(ctx, 420, hor + 30, 560, 300); olVulkaan(ctx, 1500, hor + 30, 420, 220, { lava: false }); olVulkaan(ctx, 1080, hor + 40, 300, 140, { rook: false });
  ctx.fillStyle = OL.zeeL; ctx.fillRect(0, hor + 20, W, H - hor - 20); ctx.fillStyle = OL.zee; ctx.fillRect(0, hor + 140, W, H - hor - 140);
  ctx.strokeStyle = rgba('#9CCBE3', 0.4); ctx.lineWidth = 2; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 24) { const yy = hor + 50 + r * 70 + Math.sin(x / 70 + r - E10T * (0.5 + r * 0.15)) * 4; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } }
// rustige bliksemflits: om de 'per' seconden een korte flits (geen druk geflikker)
function e10Flits(t, per = 3.4, fase = 0) { const ph = ((t + fase) % per + per) % per; return ph < 0.7 ? 1 - ph / 0.7 : 0; }

// ---------- kleine hulpjes ----------
function A(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function e10Quad(x0, y0, cx, cy, x1, y1, u) { const v = 1 - u; return [v * v * x0 + 2 * v * u * cx + u * u * x1, v * v * y0 + 2 * v * u * cy + u * u * y1]; }
// deel van een kwadratische boog (u = 0..1) met pijlpunt aan het eind
function e10Boog(ctx, x0, y0, cx, cy, x1, y1, u, col = C.goud, lw = 4, kop = true, dash = null, off = 0) { if (u <= 0.01) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  if (dash) { ctx.setLineDash(dash); ctx.lineDashOffset = off; } ctx.beginPath(); const n = 40; for (let i = 0; i <= n * u; i++) { const p = e10Quad(x0, y0, cx, cy, x1, y1, i / n); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.setLineDash([]);
  if (kop && u > 0.9) { const p = e10Quad(x0, y0, cx, cy, x1, y1, u), q = e10Quad(x0, y0, cx, cy, x1, y1, u - 0.04); pijl(ctx, q[0], q[1], p[0], p[1], col, (u - 0.9) / 0.1, lw, 18); }
  ctx.restore(); }
function e10Gloed(ctx, x, y, r, a, col = C.goud) { if (a <= 0.01) return; ctx.save(); const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r); g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.restore(); }
// naam en (later) toelichting: de toelichting komt er zacht bij
function e10Naam(ctx, naam, meta, x, y, aN, aM, align = 'center', col = C.text) { if (aN <= 0.01) return; if (!meta || aM <= 0.01) { if (!meta) return naamBij(ctx, naam, null, x, y, aN, align, col); }
  // naam op precies dezelfde plek als in de versie met toelichting (naamBij verschuift het blok bij een lange toelichting)
  ctx.save(); ctx.font = fTekst(36, 600); ctx.letterSpacing = '0px'; const wn = ctx.measureText(naam).width; ctx.font = fMeta(26); ctx.letterSpacing = '3px'; const wm = ctx.measureText(meta.toUpperCase()).width; ctx.restore();
  const w = Math.max(wn, wm); let bx = align === 'left' ? x : (align === 'right' ? x - w : x - w / 2); bx = Math.max(24, Math.min(W - 24 - w, bx));
  const lx = align === 'left' ? bx : (align === 'right' ? bx + w - wn : bx + (w - wn) / 2);
  naamBij(ctx, naam, null, lx, y, aN * (1 - aM), 'left', col); if (aM > 0.01) naamBij(ctx, naam, meta, x, y, aN * aM, align, col); }

// ---------- de drie vakjes, elk met eigen zichtbaarheid en vinkje ----------
function e10Vakjes(ctx, x, y, st, al = [1, 1, 1], vk = [1, 1, 1], o = {}) { const { w = 470, h = 300, gap = 40 } = o;
  const namen = ['bouwstenen', 'informatie die zich kopieert', 'een omhulsel'];
  const icoon = [(cx, cy) => { olAminozuur(ctx, cx - 70, cy, 0.8); olNucleotide(ctx, cx + 60, cy, 'G', 0.55); },
    (cx, cy) => olRnaStreng(ctx, olSlap(cx, cy, 260, 0, 2 + Math.sin(E10T * 0.7) * 0.4, 0.8), 'AUGGCUAAGUUCG', { w: 5 }),
    (cx, cy) => olBlaasje(ctx, cx, cy, 78, { s: 0.42 })];
  for (let i = 0; i < 3; i++) { if (al[i] <= 0.01) continue; const bx = x + i * (w + gap), k = vk[i]; ctx.save(); ctx.globalAlpha *= al[i];
    const sc = 0.92 + 0.08 * ease(al[i]); ctx.translate(bx + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-(bx + w / 2), -(y + h / 2));
    const groen = st[i] === 1 && k > 0.5; roundRect(ctx, bx, y, w, h, 18); shape(ctx, rgba(C.fill, 0.6), groen ? C.groen : C.line, groen ? 3 : 1.5);
    icoon[i](bx + w / 2, y + h * 0.45); text(ctx, namen[i], bx + w / 2, y + h - 30, fTekst(36, 600), C.text, 'center');
    if (st[i] === 1 && k > 0.01) { const cx = bx + w - 34, cy = y + 34; circ(ctx, cx, cy, 22 * ease(Math.min(1, k * 1.6)), C.groen);
      if (k > 0.4) { const u = ease((k - 0.4) / 0.6); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 11, cy); const p1 = [cx - 3, cy + 9], p2 = [cx + 12, cy - 9];
        if (u < 0.4) ctx.lineTo(lerp(cx - 11, p1[0], u / 0.4), lerp(cy, p1[1], u / 0.4)); else { ctx.lineTo(p1[0], p1[1]); ctx.lineTo(lerp(p1[0], p2[0], (u - 0.4) / 0.6), lerp(p1[1], p2[1], (u - 0.4) / 0.6)); } ctx.stroke(); } }
    if (st[i] === 'h' && k > 0.01) A(ctx, k, () => metaText(ctx, 'hypothese', bx + w - 24, y + 44, C.goud, 'right', 26));
    ctx.restore(); } }

// ---------- eiwit dat ontstaat (kraal voor kraal) en vouwt: geometrie uit lib_bio (_eiwitVorm), grijsblauw = enzym ----------
function e10Eiwit(ctx, x, y, s, groei, fold, a = 1, t = 0) { if (a <= 0.01 || groei <= 0.001) return; const n = 44; const doel = _eiwitVorm(n, s);
  const pts = doel.map((d, i) => { const bx = (i - n / 2) * 15 * s, by = Math.sin(i * 0.5 + t * 0.8) * 26 * s; const f = ease(clamp((fold - (i % 11) / 40) / 0.75, 0, 1)); return [x + lerp(bx, d[0], f), y + lerp(by, d[1], f), (d[2] || 0) * f]; });
  const k = Math.min(n, groei * n); const vis = pts.slice(0, Math.max(1, Math.ceil(k)));
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = _mvL(C.enzym, 0.35); ctx.lineWidth = 3 * s; ctx.beginPath(); bioPad(ctx, vis, false); ctx.stroke();
  vis.map((p, i) => i).sort((P, Q) => vis[P][2] - vis[Q][2]).forEach(i => { const p = vis[i]; const r = 12 * s * (0.82 + 0.18 * ((p[2] || 0) + 1) / 2) * (i === vis.length - 1 ? clamp(k - i, 0.2, 1) : 1); circ(ctx, p[0], p[1], r, i % 5 === 2 ? _mvL(C.enzym, 0.15) : C.enzym, _mvL(C.enzym, 0.4), 1.4); });
  ctx.restore(); }

// ---------- plasje met RNA-strengen (simulatie) ----------
// o.vis(i) 0..1 (geboren: schuift uit de ouder o.ouder(i)), o.goud(i) = [0..1, ouder] (snelle variant schuift in van een snelle ouder), o.dim(i), o.fout(i), o.letters
const E10_SEQ = ['AUGGCUAAG', 'GCUAAGUUC', 'CCGAUAGGA', 'UAGGCAACU'];
function e10Plasje(ctx, x, y, w, h, o = {}) { const { t = 0, vis = () => 1, ouder = () => -1, goud = () => [0, -1], dim = () => 0, fout = () => 0, letters = 60, a = 1, N = 16 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2 - 8, h / 2 - 8, 0, 0, 6.283); ctx.clip();
  const sc = Math.min(1, w / 1400 + 0.35);
  for (let i = 0; i < 80; i++) { const al = clamp(letters - i, 0, 1); if (al <= 0.01) continue; const wd = wander(i + 300, t, 14, 0.35); const px = x + 40 + hash(i * 3.3) * (w - 80) + wd.x, py = y + 30 + hash(i * 7.1) * (h - 60) + wd.y; olBase(ctx, px, py, 'AUGC'[i % 4], 0.16 * sc + 0.03, { letter: false, dir: hash(i) > 0.5 ? 1 : -1, a: al }); }
  const P = (i) => { const wd = wander(i + 50, t, 12 * sc, 0.3); return [x + w * 0.15 + (i % 4) * w * 0.7 / 3 + (hash(i * 2.2) - 0.5) * 50 * sc + wd.x, y + h * 0.18 + Math.floor(i / 4) * h * 0.64 / 3 + (hash(i * 5.5) - 0.5) * 26 * sc + wd.y]; };
  const streng = (px, py, i, rand, al) => olRnaStreng(ctx, olSlap(px, py, 150 * sc, (hash(i) - 0.5) * 0.8, i + Math.sin(t * 0.7 + i) * 0.5, 0.5 * sc), E10_SEQ[i % 4], { w: 4, rand, a: al });
  for (let i = 0; i < N; i++) { const v = vis(i); if (v <= 0.01) continue; let [px, py] = P(i); const op = ouder(i); if (op >= 0 && v < 1) { const q = P(op); px = lerp(q[0], px, ease(v)); py = lerp(q[1], py, ease(v)); }
    const [g, go] = goud(i), dm = 1 - 0.55 * dim(i), al = Math.min(1, v * 3);
    if (g < 0.99) streng(px, py, i, null, al * dm * (1 - g));
    if (g > 0.01) { let gx = px, gy = py; if (go >= 0 && g < 1) { const q = P(go); gx = lerp(q[0], px, ease(g)); gy = lerp(q[1], py, ease(g)); } streng(gx, gy, i, C.goud, al * Math.min(1, g * 2)); }
    const f = fout(i); if (f > 0.01) circ(ctx, px + 30 * sc, py - 4, 7, rgba(C.goud, f * al)); }
  ctx.restore(); ctx.restore(); }

// ---------- vetzuren die zich ordenen tot een dubbele laag (zelfde plekken als olBilaag) ----------
function e10BilaagPlekken(cx, cy, R, s) { const P = olCirkelPad(cx, cy, R, R, 28), C0 = _olContour(P, true); const kr = 9 * s, off = kr * 5.6, stap = kr * 2.25, n = Math.floor(C0.L / stap), out = [];
  for (let i = 0; i < n; i++) { const d = (i + 0.5) * C0.L / n; const [x, y, an] = _olOp(C0, d); const nx = Math.sin(an), ny = -Math.cos(an);
    out.push([x + nx * off * 0.5, y + ny * off * 0.5, Math.atan2(-ny, -nx)]); out.push([x - nx * off * 0.5, y - ny * off * 0.5, Math.atan2(ny, nx)]); } return out; }
function e10Hoek(a0, a1, u) { let d = ((a1 - a0) % 6.283 + 9.425) % 6.283 - 3.1416; return a0 + d * u; }
// dunne, licht kronkelende RNA-streng (zelfde olRnaStreng als elders) met de letters bij de pootjes; kant -1 = pootjes omhoog, letters erboven
function e10RnaLetters(ctx, P, seq, o = {}) { const { a = 1, w = 6, kant = 1, stap = 100, rand = null } = o; if (a <= 0.01) return;
  olRnaStreng(ctx, P, seq, { w, kant, stap, a, rand });
  const pts = _mvCR(P, false, 10); const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  ctx.save(); ctx.globalAlpha *= a; let j = 0;
  for (let k = 0; k < seq.length; k++) { const d = (k + 0.5) * stap; if (d > L[L.length - 1]) break; while (j < L.length - 2 && L[j + 1] < d) j++; const u = (d - L[j]) / Math.max(1e-6, L[j + 1] - L[j]);
    const px = lerp(pts[j][0], pts[j + 1][0], u), py = lerp(pts[j][1], pts[j + 1][1], u); const b = seq[k];
    text(ctx, b, px, py + kant * (w * 2.6 + 30) + 10, fTekst(30, 700), OL.basis[b], 'center'); }
  ctx.restore(); }
function e10Golf(x0, x1, y, amp = 6, ph = 0) { const P = []; for (let i = 0; i <= 8; i++) { const u = i / 8; P.push([lerp(x0, x1, u), y + Math.sin(u * 7 + ph) * amp]); } return P; }

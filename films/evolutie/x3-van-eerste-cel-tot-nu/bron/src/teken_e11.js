// Film 11 · Van eerste cel tot nu — eigen hulpfuncties voor de animatie (24 okt 2026). Laadt na lib_dieren/lib_micro_evo, vóór sb11.js.
// De klok van 24 uur is de rode draad: e11Mini = kleine klok rechtsboven in de Macro-scènes, de wijzer loopt mee met de genoemde tijd.

const e11Hm = (u) => { u = ((u % 24) + 24) % 24; let h = Math.floor(u), m = Math.round((u - h) * 60); if (m === 60) { h = (h + 1) % 24; m = 0; } return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); };
const e11Fill = (ctx, k) => { ctx.fillStyle = k; ctx.fillRect(0, 0, W, H); };
// kleine klok rechtsboven met de tijd eronder; o.meta = jaartal (voluit) boven de klok rechts
function e11Mini(ctx, uur, o = {}) { const { x = 1790, y = 214, r = 100, a = 1, meta = null, bogen = [], stip = null, tekst = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r + 6, rgba(C.bgMicro, 0.55));
  e11Klok(ctx, x, y, r, { uur, dikte: 14, cijfers: false, bogen });
  if (stip) { ctx.setLineDash([6, 7]); ctx.strokeStyle = rgba(stip.kleur || C.paars, stip.a ?? 1); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, r - 15, e11U(stip.van), e11U(stip.tot)); ctx.stroke(); ctx.setLineDash([]); }
  metaText(ctx, tekst || ('±' + e11Hm(uur)), x, y + r + 42, C.goud, 'center', 26);
  if (meta) metaText(ctx, meta, W - 80, 78, C.goud, 'right', 26);
  ctx.restore(); }
// zachte gloed
function e11Gloed(ctx, x, y, r, a = 1, k = C.goud) { if (a <= 0.01) return; ctx.save(); const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(k, 0.55 * a)); g.addColorStop(1, rgba(k, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.restore(); }
// lijn die groeit van p naar q (u = 0..1)
function e11Groei(ctx, p, q, u, k = C.line, lw = 6) { if (u <= 0.005) return; u = Math.min(1, u); ctx.strokeStyle = k; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(lerp(p[0], q[0], u), lerp(p[1], q[1], u)); ctx.stroke(); }
// golfjes op een wateroppervlak
function e11Golf(ctx, y0, t, h = 120, a = 0.35, k = '#9CCBE3') { ctx.save(); ctx.strokeStyle = rgba(k, a); ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const x = ((hash(i) * W + t * (18 + hash(i + 3) * 14)) % (W + 200)) - 100, y = y0 + 14 + hash(i + 7) * h; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40 + hash(i + 2) * 60, y); ctx.stroke(); } ctx.restore(); }
// zuurstofbelletjes die opstijgen vanaf bronnen en oplossen vóór het oppervlak
function e11Bellen(ctx, t, t0, bron, o = {}) { const { n = 5, stijg = 260, per = 2.6, r = 7, a = 1 } = o; if (t < t0 || a <= 0.01) return;
  bron.forEach(([bx, by], j) => { for (let i = 0; i < n; i++) { const ph = (t - t0) / per - i / n - hash(j * 7 + i) * 0.3; if (ph < 0) continue; const f = ph % 1, y = by - f * stijg, x = bx + Math.sin(f * 6 + i + j) * 10;
    const al = a * Math.min(1, f * 6) * (1 - ease((f - 0.7) / 0.3)); circ(ctx, x, y, r * (0.8 + 0.4 * hash(i + j)), rgba(C.teal, 0.35 * al), rgba(C.teal, al), 2); } }); }

// ---- levensboom die groeit (zelfde maten als e11Levensboom) ----
// g: {stam, bact, arch, euk, eukTop, plant, sd, markA, markSD} 0..1
function e11Boom(ctx, x, y, w, h, g, o = {}) { const top = y - h, P = { wortel: [x + w * 0.3, y], knA: [x + w * 0.52, y - h * 0.38], knE: [x + w * 0.66, y - h * 0.6], knO: [x + w * 0.8, y - h * 0.8],
    bact: [x, top], arch: [x + w * 0.38, top], plant: [x + w * 0.6, top], schim: [x + w * 0.8, top], dier: [x + w, top], eukTop: [x + w * 0.8, top] };
  const v = (k) => g[k] || 0, nd = (p, a, k = C.line) => { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; circ(ctx, p[0], p[1], 9, C.bgSchema, k, 3.5); ctx.restore(); } };
  const kA = v('markA') > 0.01 ? C.goud : C.line, kSD = v('markSD') > 0.01 ? C.goud : C.line;
  e11Groei(ctx, [P.wortel[0], P.wortel[1] + 40], P.wortel, v('stam'));
  e11Groei(ctx, P.wortel, P.bact, v('bact')); e11Groei(ctx, P.wortel, P.knA, Math.max(v('arch') * 2, 0) > 1 ? 1 : v('arch') * 2); e11Groei(ctx, P.knA, P.arch, v('arch') * 2 - 1, kA);
  e11Groei(ctx, P.knA, P.knE, v('euk') * 2, kA === C.goud ? C.goud : (v('plant') > 0 || o.grijsEuk ? C.line : C.paars));
  e11Groei(ctx, P.knE, P.eukTop, (v('euk') * 2 - 1) * (1 - v('plant')), kA === C.goud ? C.goud : C.paars);
  e11Groei(ctx, P.knE, P.plant, v('plant')); e11Groei(ctx, P.knE, P.knO, v('sd') * 2, kSD); e11Groei(ctx, P.knO, P.schim, v('sd') * 2 - 1, kSD); e11Groei(ctx, P.knO, P.dier, v('sd') * 2 - 1, kSD);
  nd(P.wortel, v('stam')); nd(P.knA, clamp(v('arch') * 3, 0, 1)); nd(P.knE, clamp(v('euk') * 3, 0, 1), v('markA') > 0.01 ? C.goud : C.line); nd(P.knO, clamp(v('sd') * 3, 0, 1));
  if (v('markA') > 0.01) e11Gloed(ctx, P.knA[0], P.knA[1], 60, v('markA'));
  if (v('markSD') > 0.01) e11Gloed(ctx, P.knO[0], P.knO[1], 60, v('markSD'));
  naamBij(ctx, 'LUCA', null, P.wortel[0], P.wortel[1] + 84, v('stam'), 'center', C.goud);
  return P; }

// ---- minuutbalk / uurbalk (Schema) ----
function e11Balk(ctx, x0, y0, w, lab, o = {}) { const { a = 1, groei = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ww = Math.max(20, w * groei);
  roundRect(ctx, x0, y0, ww, 60, 10); shape(ctx, rgba(E11.leven, 0.35), C.line, 2);
  lab.forEach(([f, s]) => { if (f > groei + 0.001) return; lijn(ctx, [[x0 + w * f, y0 + 60], [x0 + w * f, y0 + 76]], C.line, 2); metaText(ctx, s, x0 + w * f, y0 + 112, C.text2, 'center', 26); }); ctx.restore(); }

// ---- Tiktaalik met traploze steun (0 = vin gestrekt, 1 = vin steunt op de bodem) — overschrijft de versie uit teken_evo11.js ----
function e11Tiktaalik(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, steun = 1, kleur = '#7A7A5A' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const u = l / 100;
  vul(ctx, [[30 * u, -3 * u], [36 * u, 2 * u], [42 * u, 4 * u], [40 * u, -1 * u]], _dk(kleur, 0.3));
  const P = [[50 * u, -5 * u], [46 * u, -8.5 * u], [36 * u, -10 * u], [30 * u, -11 * u], [20 * u, -12.5 * u], [5 * u, -12 * u], [-12 * u, -10 * u], [-30 * u, -7 * u], [-44 * u, -4.5 * u], [-50 * u, -3 * u],
    [-44 * u, -1.5 * u], [-30 * u, -1 * u], [-12 * u, -0.5 * u], [5 * u, -0.3 * u], [20 * u, -0.8 * u], [32 * u, -1.5 * u], [44 * u, -2.5 * u], [50 * u, -4 * u]];
  vul(ctx, [[-28 * u, -7.4 * u], [-40 * u, -8.5 * u], [-50 * u, -6 * u], [-52 * u, -3 * u], [-50 * u, 0], [-40 * u, 1.8 * u], [-28 * u, -0.8 * u]], _dk(kleur, 0.15), _lt(kleur, 0.2), 1.2);
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.5);
  binnen(ctx, P, () => { vul(ctx, [[48 * u, -3 * u], [20 * u, -1 * u], [-30 * u, -1.2 * u], [-30 * u, 2 * u], [48 * u, 2 * u]], _lt(kleur, 0.25));
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 1; for (let i = 0; i < 22; i++) { const px = (40 - i * 3.8) * u; ctx.beginPath(); ctx.arc(px, -6 * u, 3.2 * u, -1.1, 1.1); ctx.stroke(); }
    vul(ctx, [[50 * u, -5.5 * u], [33 * u, -4.6 * u], [33 * u, -3.9 * u], [50 * u, -4.4 * u]], _dk(kleur, 0.45));
    lijn(ctx, [[30 * u, -11 * u], [28 * u, -6 * u], [30 * u, -1.5 * u]], _dk(kleur, 0.25), 1.5); });
  dierOog(ctx, 40 * u, -9.6 * u, Math.max(2.5, 1.1 * u), '#2A2414');
  vul(ctx, [[-14 * u, -0.7 * u], [-19 * u, 3 * u], [-12 * u, 2.5 * u]], _dk(kleur, 0.1), _lt(kleur, 0.2), 1);
  ctx.save(); ctx.translate(26 * u, -2 * u); ctx.rotate(lerp(0.4, 0.95, +steun));
  vul(ctx, [[0, -1.6 * u], [7 * u, -1.3 * u], [12 * u, -0.4 * u], [16 * u, 0.4 * u], [12 * u, 2.4 * u], [6 * u, 1.8 * u], [0, 1.6 * u]], _lt(kleur, 0.1), _lt(kleur, 0.3), 1.2);
  lijn(ctx, [[1 * u, 0], [6 * u, 0.1 * u]], E11.bot, 2); lijn(ctx, [[6 * u, 0.1 * u], [10 * u, 0.6 * u]], E11.bot, 1.6); ctx.restore();
  ctx.restore(); }

// kleine meercellige alg (vertakt draadje groene cellen)
function e11Alg(ctx, x, y, s = 1, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const tak = (px, py, an, n, d) => { for (let i = 0; i < n; i++) { an += Math.sin(t * 0.8 + i + d) * 0.04; px += Math.cos(an) * 15; py += Math.sin(an) * 15; ctx.beginPath(); ctx.ellipse(px, py, 8, 7, an, 0, 6.283); shape(ctx, rgba(C.groen, 0.75), _lt(C.groen, 0.3), 1.2);
      if (i === 3 && d < 2) tak(px, py, an - 0.7, n - 3, d + 1); if (i === 5 && d < 1) tak(px, py, an + 0.6, n - 4, d + 1); } };
  tak(0, 0, -Math.PI / 2, 9, 0); ctx.restore(); }
// zeeschelpje (brachiopode) als telicoon
function e11Schelp(ctx, x, y, s = 1, k = '#C2A878', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -26); ctx.bezierCurveTo(30, -24, 30, 18, 0, 22); ctx.bezierCurveTo(-30, 18, -30, -24, 0, -26); shape(ctx, k, _lt(k, 0.3), 1.5);
  ctx.strokeStyle = _dk(k, 0.3); ctx.lineWidth = 1.2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(0, -22); ctx.quadraticCurveTo(i * 8, 0, i * 7, 20); ctx.stroke(); } ctx.restore(); }
// sponsje (vaasvorm)
function e11Spons(ctx, x, y, h, k = '#C9A35C', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-h * 0.12, 0); ctx.quadraticCurveTo(-h * 0.3, -h * 0.6, -h * 0.22, -h); ctx.lineTo(h * 0.22, -h); ctx.quadraticCurveTo(h * 0.3, -h * 0.6, h * 0.12, 0); ctx.closePath(); shape(ctx, k, _lt(k, 0.3), 1.5);
  ctx.beginPath(); ctx.ellipse(0, -h, h * 0.22, h * 0.06, 0, 0, 6.283); shape(ctx, _dk(k, 0.4), null); ctx.restore(); }

// sterren aan de nachthemel (twinkelen rustig)
function e11Sterren(ctx, t, ymax = 600, n = 60, a = 1) { for (let i = 0; i < n; i++) { const x = hash(i * 3.7) * W, y = 110 + hash(i * 5.3) * (ymax - 110), tw = 0.5 + 0.5 * Math.sin(t * (0.6 + hash(i))  + i * 2);
  circ(ctx, x, y, 1.2 + hash(i * 2.1) * 1.4, rgba('#F2F2EE', a * (0.2 + 0.45 * tw))); } }
// kleine moleculen (Schema/Micro): water (V), koolstofdioxide (lijn), glucose (zeshoek), zuurstof O2 (twee bolletjes)
function e11Water(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 7 * s, rgba(C.line, 0.6), C.line, 1.5); circ(ctx, x - 8 * s, y + 6 * s, 4 * s, rgba('#F2F2EE', 0.7)); circ(ctx, x + 8 * s, y + 6 * s, 4 * s, rgba('#F2F2EE', 0.7)); ctx.restore(); }
function e11CO2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 12 * s, y, 6 * s, rgba(C.teal, 0.5), C.teal, 1.5); circ(ctx, x + 12 * s, y, 6 * s, rgba(C.teal, 0.5), C.teal, 1.5); circ(ctx, x, y, 7 * s, '#4A4E58', '#8A8E96', 1.5); ctx.restore(); }
function e11O2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 5 * s, y, 6 * s, rgba(C.teal, 0.5), C.teal, 1.5); circ(ctx, x + 5 * s, y, 6 * s, rgba(C.teal, 0.5), C.teal, 1.5); ctx.restore(); }
function e11Glucose(ctx, x, y, r = 12, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = rot + i * Math.PI / 3; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(C.goud, 0.3), C.goud, 2); ctx.restore(); }

// cel van een archaeon met gasten (bacteriën in een blaasje), zelfde vorm en vulling als e11Endo fase 1; deel = 0..1 celdeling
const _E11_CELK = '#A89878', _E11_CELV = '#333638';
function _e11CelPad(ctx, x, y, r) { const Q = []; const N = 48; for (let i = 0; i < N; i++) { const an = i / N * 6.283, rr = r * (1 + 0.03 * Math.sin(an * 3 + 1)); Q.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.92]); } zacht(ctx, Q); }
function e11Gastcel(ctx, x, y, r, gasten, o = {}) { const { a = 1, deel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rr = r * (1 - 0.2 * deel), off = rr * 1.02 * deel, cs = deel > 0.001 ? [[x - off, y], [x + off, y]] : [[x, y]];
  cs.forEach(([cx, cy]) => { _e11CelPad(ctx, cx, cy, rr); ctx.fillStyle = _E11_CELV; ctx.fill(); });
  cs.forEach(([cx, cy], i) => { ctx.save(); if (cs.length > 1) { const [ox, oy] = cs[1 - i]; ctx.beginPath(); ctx.rect(0, 0, W, H); _e11CelPad(ctx, ox, oy, rr - 1.5); ctx.clip('evenodd'); }
    _e11CelPad(ctx, cx, cy, rr); ctx.strokeStyle = _lt(_E11_CELK, 0.3); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); });
  cs.forEach(([cx, cy], i) => { ctx.save(); _e11CelPad(ctx, cx, cy, rr - 3); ctx.clip();
    for (let k = 0; k < 70; k++) { const an = hash(k * 3.3) * 6.283, d = Math.sqrt(hash(k * 5.1)) * rr * 0.9; circ(ctx, cx + Math.cos(an) * d, cy + Math.sin(an) * d, 1.6, rgba('#C9B896', 0.13)); }
    ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 2.5; e11Kluwen(ctx, cx - rr * 0.3, cy + rr * 0.1, rr * 0.3, rr * 0.22, 11);
    const G = cs.length > 1 ? [gasten[Math.min(i, gasten.length - 1)]] : gasten;
    for (const g of G) { const [gx, gy, gl] = g, bx = cx + gx * rr / r, by = cy + gy * rr / r, l = gl * rr / r; ctx.strokeStyle = rgba(_lt(_E11_CELK, 0.3), 0.9); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(bx, by, l * 0.63, l * 0.34, 0.2, 0, 6.283); ctx.stroke(); e11Prok(ctx, bx, by, l, 0.2, { kleur: C.teal }); }
    ctx.restore(); });
  ctx.restore(); }
// kleine eukaryote cel als icoon (rond, kern, twee mitochondriën), zonder ER (e11Euk werkt niet onder r ≈ 100)
function e11EukIcoon(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#18233A', C.er, 2.5);
  circ(ctx, x - r * 0.25, y - r * 0.05, r * 0.36, rgba(C.kern, 0.85), C.kernR, 2); for (const [dx, dy, l, rt] of [[0.45, 0.32, 0.42, 0.5], [0.32, -0.5, 0.36, -0.4]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, l * r / 2, l * r / 4, rt, 0, 6.283); shape(ctx, C.mito, C.mitoR, 1.5); } ctx.restore(); }

// ---- herstelronde (frisse beeldreview) ----
// stromatoliet met zichtbare gebogen laagjes (oudste binnenin), bovenop een groene microbenlaag. o.groei 0..1 = hoeveel laagjes er al zijn; o.mat = microben als bolletjes op de bovenste laag
function e11Stromatoliet(ctx, x, y, s = 1, o = {}) { const { a = 1, seed = 1, laag = 9, groei = 1, mat = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 110 + hash(seed) * 40, h = 90 + hash(seed + 2) * 40, m = Math.max(1, groei * laag), mi = Math.ceil(m);
  const dome = (f) => { const ww = w * (0.45 + 0.55 * f), hh = h * f + 4; ctx.beginPath(); ctx.moveTo(-ww * 0.62, 0); ctx.bezierCurveTo(-ww * 0.62, -hh * 0.4, -ww * 0.48, -hh, 0, -hh); ctx.bezierCurveTo(ww * 0.48, -hh, ww * 0.62, -hh * 0.4, ww * 0.62, 0); ctx.closePath(); return hh; };
  let top = 0; for (let i = mi; i >= 1; i--) { const f = Math.min(i, m) / laag; top = Math.max(top, dome(f)); ctx.fillStyle = i % 2 ? '#8E8062' : '#5C5242'; ctx.fill(); ctx.strokeStyle = rgba('#2A241C', 0.55); ctx.lineWidth = 1.2 / s; ctx.stroke(); }
  const f = m / laag; dome(f); ctx.strokeStyle = E11.cyano; ctx.lineWidth = (mat ? 5 : 7) / Math.max(0.6, s * 0.7); ctx.lineCap = 'round'; ctx.stroke();
  if (mat) { const ww = w * (0.45 + 0.55 * f), hh = h * f + 4; for (let k = 0; k <= 26; k++) { const u = k / 26, bx = (u - 0.5) * ww * 1.1, by = -hh * (1 - Math.pow(Math.abs(u - 0.5) * 2, 2.2)) - 4 + Math.sin(t * 2 + k) * 0.6; circ(ctx, bx, by, 3.4 / s * 1.6, rgba(E11.cyano, 0.9), _lt(E11.cyano, 0.4), 0.8 / s); } }
  ctx.restore(); }
// moleculen als herkenbare vormpjes met naam (Schema/Micro): soort 'h2o' | 'co2' | 'o2'; r = straal van een O-atoom
function e11Mol(ctx, soort, x, y, r = 12, a = 1, naam = false, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const O = (px, py) => circ(ctx, px, py, r, '#D2553F', _lt('#D2553F', 0.4), 1.5), Hh = (px, py) => circ(ctx, px, py, r * 0.62, '#E8E6E0', '#FFFFFF', 1.2), Cc = (px, py) => circ(ctx, px, py, r * 0.95, '#4A4E58', '#8A8E96', 1.5);
  const bind = (x1, y1, x2, y2, dub) => { ctx.strokeStyle = '#C8CCD4'; ctx.lineWidth = Math.max(1.5, r * 0.18); for (const d of (dub ? [-1, 1] : [0])) { const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny) || 1; ctx.beginPath(); ctx.moveTo(x1 + nx / L * d * r * 0.22, y1 + ny / L * d * r * 0.22); ctx.lineTo(x2 + nx / L * d * r * 0.22, y2 + ny / L * d * r * 0.22); ctx.stroke(); } };
  let lab = '';
  if (soort === 'h2o') { const hx = r * 1.25, hy = r * 0.95; bind(0, 0, -hx, hy); bind(0, 0, hx, hy); Hh(-hx, hy); Hh(hx, hy); O(0, 0); lab = 'H₂O'; }
  else if (soort === 'co2') { bind(-r * 1.9, 0, 0, 0, true); bind(0, 0, r * 1.9, 0, true); O(-r * 1.9, 0); O(r * 1.9, 0); Cc(0, 0); lab = 'CO₂'; }
  else { bind(-r * 0.95, 0, r * 0.95, 0, true); O(-r * 0.95, 0); O(r * 0.95, 0); lab = 'O₂'; }
  ctx.restore();
  if (naam) { ctx.save(); ctx.globalAlpha *= a; const yy = y + (soort === 'h2o' ? r * 2.6 : r * 2.2) + 8; text(ctx, lab, x, yy, fTekst(Math.max(20, r * 1.7), 700), '#F2F2EE', 'center'); ctx.restore(); } }
// mitochondrium-membraan laten oplichten langs de eigen omtrek (zelfde maten als mitochondrion() uit lib.js). welk 'buiten' | 'binnen'; u = 0..1 hoe ver het licht rondloopt
function e11MitoMembraan(ctx, x, y, len, rot, welk, u, kleur = C.goud) { if (u <= 0.005) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  const h = len * 0.42, k = Math.max(1, len / 110), inset = 6 * k, cristae = Math.max(3, Math.round(len / 40));
  const L = welk === 'buiten' ? 2 * (len - h) + Math.PI * h : 2 * (len - 2 * inset - (h - 2 * inset)) + Math.PI * (h - 2 * inset);
  ctx.strokeStyle = kleur; ctx.lineWidth = 4 * k; ctx.lineCap = 'round'; ctx.shadowColor = kleur; ctx.shadowBlur = 8;
  ctx.setLineDash([L * Math.min(1, u), L * 2]);
  if (welk === 'buiten') roundRect(ctx, -len / 2, -h / 2, len, h, h / 2); else roundRect(ctx, -len / 2 + inset, -h / 2 + inset, len - 2 * inset, h - 2 * inset, (h - 2 * inset) / 2);
  ctx.stroke(); ctx.setLineDash([]);
  if (welk === 'binnen') { const cu = clamp((u - 0.3) / 0.7, 0, 1); ctx.lineWidth = 2.2 * k; ctx.shadowBlur = 0; ctx.globalAlpha *= cu * 0.9;
    for (let i = 0; i < cristae; i++) { const px = -len / 2 + inset + 10 * k + (len - 2 * inset - 20 * k) * (i + 0.5) / cristae, dir = i % 2 ? 1 : -1, y0 = dir * (h / 2 - inset), depth = h * 0.6, w = Math.max(3, len / 40);
      ctx.beginPath(); ctx.moveTo(px - w, y0); ctx.lineTo(px - w, y0 - dir * depth); ctx.arc(px, y0 - dir * depth, w, Math.PI, 0, dir > 0); ctx.lineTo(px + w, y0); ctx.stroke(); } }
  ctx.restore(); }
// Tiktaalik met botjes in de borstvin (bovenarm, spaakbeen + ellepijp, polsbotjes) — overschrijft de eerdere versie; o.botjes = 0..1 oplichten
function e11Tiktaalik(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, steun = 1, kleur = '#7A7A5A', botjes = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const u = l / 100;
  vul(ctx, [[30 * u, -3 * u], [36 * u, 2 * u], [42 * u, 4 * u], [40 * u, -1 * u]], _dk(kleur, 0.3));
  const P = [[50 * u, -5 * u], [46 * u, -8.5 * u], [36 * u, -10 * u], [30 * u, -11 * u], [20 * u, -12.5 * u], [5 * u, -12 * u], [-12 * u, -10 * u], [-30 * u, -7 * u], [-44 * u, -4.5 * u], [-50 * u, -3 * u],
    [-44 * u, -1.5 * u], [-30 * u, -1 * u], [-12 * u, -0.5 * u], [5 * u, -0.3 * u], [20 * u, -0.8 * u], [32 * u, -1.5 * u], [44 * u, -2.5 * u], [50 * u, -4 * u]];
  vul(ctx, [[-28 * u, -7.4 * u], [-40 * u, -8.5 * u], [-50 * u, -6 * u], [-52 * u, -3 * u], [-50 * u, 0], [-40 * u, 1.8 * u], [-28 * u, -0.8 * u]], _dk(kleur, 0.15), _lt(kleur, 0.2), 1.2);
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.5);
  binnen(ctx, P, () => { vul(ctx, [[48 * u, -3 * u], [20 * u, -1 * u], [-30 * u, -1.2 * u], [-30 * u, 2 * u], [48 * u, 2 * u]], _lt(kleur, 0.25));
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 1; for (let i = 0; i < 22; i++) { const px = (40 - i * 3.8) * u; ctx.beginPath(); ctx.arc(px, -6 * u, 3.2 * u, -1.1, 1.1); ctx.stroke(); }
    vul(ctx, [[50 * u, -5.5 * u], [33 * u, -4.6 * u], [33 * u, -3.9 * u], [50 * u, -4.4 * u]], _dk(kleur, 0.45));
    lijn(ctx, [[30 * u, -11 * u], [28 * u, -6 * u], [30 * u, -1.5 * u]], _dk(kleur, 0.25), 1.5); });
  dierOog(ctx, 40 * u, -9.6 * u, Math.max(2.5, 1.1 * u), '#2A2414');
  vul(ctx, [[-14 * u, -0.7 * u], [-19 * u, 3 * u], [-12 * u, 2.5 * u]], _dk(kleur, 0.1), _lt(kleur, 0.2), 1);
  ctx.save(); ctx.translate(26 * u, -2 * u); ctx.rotate(lerp(0.4, 0.95, +steun));
  vul(ctx, [[0, -2.2 * u], [7 * u, -1.9 * u], [12 * u, -1 * u], [17 * u, 0.4 * u], [12 * u, 3 * u], [6 * u, 2.4 * u], [0, 2.2 * u]], rgba(_lt(kleur, 0.1), 0.85), _lt(kleur, 0.3), 1.2);
  // botjes: bovenarm (1), spaakbeen + ellepijp (2), polsbotjes (een rijtje kleine), vinstralen
  const bk = _lt(E11.bot, 0.25 * botjes), bw = 1 + 0.6 * botjes, bot = (x1, y1, x2, y2, d) => { ctx.strokeStyle = '#3A3428'; ctx.lineWidth = d * u + 2.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 * u, y1 * u); ctx.lineTo(x2 * u, y2 * u); ctx.stroke(); ctx.strokeStyle = bk; ctx.lineWidth = d * u; ctx.stroke(); };
  if (botjes > 0.01) { ctx.save(); ctx.shadowColor = C.goud; ctx.shadowBlur = 16 * botjes; }
  bot(0.6, 0, 5.4, 0.1, 1.3 * bw); bot(6.2, -0.5, 9.6, -0.2, 0.75 * bw); bot(6.2, 0.6, 9.6, 1.0, 0.75 * bw);
  [[10.6, -0.6], [10.8, 0.5], [11.6, 1.4], [12.0, 0.0]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px * u, py * u, 0.55 * u * bw, 0, 6.283); ctx.fillStyle = bk; ctx.fill(); ctx.strokeStyle = '#3A3428'; ctx.lineWidth = 1.2; ctx.stroke(); });
  if (botjes > 0.01) ctx.restore();
  ctx.strokeStyle = rgba(E11.bot, 0.45); ctx.lineWidth = 1.2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(12.6 * u, (-0.6 + i * 0.6) * u); ctx.lineTo(16.2 * u, (0.2 + i * 0.5) * u); ctx.stroke(); }
  ctx.restore();
  ctx.restore(); }

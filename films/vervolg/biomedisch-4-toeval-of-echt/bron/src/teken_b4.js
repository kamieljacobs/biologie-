// Wat word jij? · Biomedische wetenschappen en Bio-informatica · Toeval of echt? — eigen tekeningen (24 okt 2026)
// Eén dataset door de hele film (nagerekend in reken/bereken.py): lengte in cm na vijf weken.
const MET = [39, 41, 41, 41, 42, 43, 44, 44, 46, 49];     // gemiddeld 43,0 · sd 2,91
const ZONDER = [35, 36, 38, 39, 40, 41, 41, 43, 43, 44];  // gemiddeld 40,0 · sd 3,02
const KL_MET = C.goud, KL_ZON = C.teal;
// willekeurige verdeling over 20 potjes (1 = met meststof), vast gekozen
const TOEWIJS = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];
function potWaarden() { let im = 0, iz = 0; const mm = [4, 0, 7, 2, 9, 5, 1, 8, 3, 6], zz = [6, 2, 9, 0, 4, 7, 1, 5, 8, 3]; return TOEWIJS.map(v => v ? MET[mm[im++]] : ZONDER[zz[iz++]]); }
const POT_W = potWaarden();

// zaadbaar pseudotoeval
function rng32(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// husselen: permutatie k van de 20 lengtes; geeft {lab: [0/1 per pot], d: verschil met − zonder}
const _HUS = {};
function hussel(k) { if (_HUS[k]) return _HUS[k]; const r = rng32(1000 + k * 7919), idx = [...Array(20).keys()];
  for (let i = 19; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const lab = Array(20).fill(0); idx.slice(0, 10).forEach(i => lab[i] = 1); let sm = 0, sz = 0; POT_W.forEach((v, i) => lab[i] ? sm += v : sz += v);
  return (_HUS[k] = { lab, d: (sm - sz) / 10 }); }

// tomatenplant in een pot; voetY = onderkant pot; hcm = lengte plant in cm; s = px per cm; sticker 'met'/'zonder'
function tomaatPlant(ctx, x, voetY, hcm, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pw = o.pw || 54, ph = pw * 0.8, top = voetY - ph;
  // stengel
  const L = Math.max(4, hcm * s), sw = Math.sin(x * 0.37) * 6, tw = o.t ? Math.sin(o.t * 0.9 + x * 0.05) * 2.5 : 0;
  ctx.strokeStyle = '#5E9A4E'; ctx.lineWidth = Math.max(3, pw * 0.08); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, top + 2); ctx.quadraticCurveTo(x + sw, top - L * 0.5, x + sw * 0.4 + tw, top - L); ctx.stroke();
  // samengestelde bladeren langs de stengel
  const nb = Math.max(1, Math.round(L / (pw * 0.55)));
  for (let i = 0; i < nb; i++) { const f = (i + 0.7) / (nb + 0.4), yy = top - L * f, xx = x + sw * Math.sin(f * Math.PI) * 0.8 + tw * f, kant = i % 2 ? 1 : -1, bl = pw * (0.42 + 0.18 * (1 - f));
    ctx.strokeStyle = '#4E8A42'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + kant * bl, yy - bl * 0.35); ctx.stroke();
    for (let k = 0; k < 3; k++) { const u = (k + 1) / 3, lx = xx + kant * bl * u, ly = yy - bl * 0.35 * u; ctx.save(); ctx.translate(lx, ly); ctx.rotate(kant * (0.5 + k * 0.25) - 0.3); ctx.beginPath(); ctx.ellipse(0, -pw * 0.08, pw * 0.07 + 2, pw * 0.15 + 2, 0, 0, 6.283); shape(ctx, k === 2 ? '#7FC48F' : '#6DB07A', '#4E8A42', 1); ctx.restore(); } }
  // topje
  ctx.save(); ctx.translate(x + sw * 0.4 + tw, top - L); for (let k = -1; k <= 1; k++) { ctx.save(); ctx.rotate(k * 0.6); ctx.beginPath(); ctx.ellipse(0, -pw * 0.1, pw * 0.06 + 2, pw * 0.14 + 2, 0, 0, 6.283); shape(ctx, '#86CC92', '#4E8A42', 1); ctx.restore(); } ctx.restore();
  if (o.bloem && hcm > 30) { circ(ctx, x + sw * 0.6 + 10, top - L * 0.82, 5, '#F2C94C', '#C9A035', 1); circ(ctx, x + sw * 0.6 + 18, top - L * 0.78, 4, '#F2C94C', '#C9A035', 1); }
  // pot (terracotta) met aarde
  ctx.beginPath(); ctx.moveTo(x - pw / 2, top); ctx.lineTo(x + pw / 2, top); ctx.lineTo(x + pw * 0.38, voetY); ctx.lineTo(x - pw * 0.38, voetY); ctx.closePath(); shape(ctx, '#B8673E', '#8E4C2C', 1.5);
  roundRect(ctx, x - pw * 0.56, top - pw * 0.12, pw * 1.12, pw * 0.18, 4); shape(ctx, '#C97A4E', '#8E4C2C', 1.5);
  if (o.sticker) { const sc = o.sticker === 'met' ? KL_MET : '#E8ECF0', fs = Math.max(11, Math.round(pw * 0.25)); ctx.font = fTekst(fs, 800); const tw2 = ctx.measureText(o.sticker).width + 10;
    ctx.save(); ctx.globalAlpha *= (o.stA == null ? 1 : o.stA); roundRect(ctx, x - tw2 / 2, top + ph * 0.3, tw2, fs + 8, 4); shape(ctx, sc, null); text(ctx, o.sticker, x, top + ph * 0.3 + fs + 1, fTekst(fs, 800), '#1A2740', 'center'); ctx.restore(); }
  ctx.restore(); }

// zak meststof (in de hand van Opa Henk)
function mestZak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-34, -10); ctx.lineTo(34, -10); ctx.lineTo(40, 90); ctx.lineTo(-40, 90); ctx.closePath(); shape(ctx, '#3F7A55', '#2E5C40', 2);
  ctx.fillStyle = '#2E5C40'; ctx.fillRect(-34, -18, 68, 10); circ(ctx, 0, 34, 18, '#E0B64A'); ctx.strokeStyle = '#3F7A55'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 46); ctx.lineTo(0, 24); ctx.moveTo(0, 30); ctx.lineTo(-8, 22); ctx.moveTo(0, 34); ctx.lineTo(8, 26); ctx.stroke();
  text(ctx, 'GROEI+', 0, 76, fTekst(15, 800), '#F2F2EE', 'center'); ctx.restore(); }

// lengte-as (cm) van lo tot hi tussen x0 en x1
function asX(lo, hi, x0, x1) { return v => x0 + (v - lo) / (hi - lo) * (x1 - x0); }
function lengteAs(ctx, X, lo, hi, step, y, a = 1, label = 'lengte in centimeter') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(lo), y); ctx.lineTo(X(hi), y); ctx.stroke();
  for (let v = lo; v <= hi + 1e-6; v += step) { ctx.beginPath(); ctx.moveTo(X(v), y); ctx.lineTo(X(v), y + 10); ctx.stroke(); text(ctx, String(v).replace('.', ','), X(v), y + 38, fTekst(24, 600), C.text2, 'center'); }
  if (label) metaText(ctx, label, X(hi), y + 76, C.text2, 'right', 20); ctx.restore(); }
// stippen op een rij; dubbele waarden stapelen omhoog
function stipRij(ctx, X, vals, y, col, a = 1, r = 13) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tel = {};
  vals.forEach(v => { const k = Math.round(v * 2); tel[k] = (tel[k] || 0) + 1; circ(ctx, X(v), y - (tel[k] - 1) * (r * 2 + 3), r, rgba(col, 0.85), col, 2); }); ctx.restore(); }
function gemLijn(ctx, X, m, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(m), y - h); ctx.lineTo(X(m), y + 18); ctx.stroke(); ctx.restore(); }
const gem = v => v.reduce((p, q) => p + q, 0) / v.length;
const sdv = v => { const m = gem(v); return Math.sqrt(v.reduce((p, q) => p + (q - m) ** 2, 0) / (v.length - 1)); };
// band van de standaardafwijking rond het gemiddelde
function sdBand(ctx, X, m, s, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, X(m - s), y - h, X(m + s) - X(m - s), h + 16, 10); shape(ctx, rgba(col, 0.16), rgba(col, 0.7), 2); ctx.restore(); }

// exacte verdeling van het verschil bij alle 184 756 verdelingen van de stickers, per 0,2 cm van −6 tot +6 (reken/bereken.py)
const PERM_TEL = [0, 0, 0, 0, 0, 0, 5, 11, 37, 86, 142, 289, 430, 664, 986, 1306, 1783, 2325, 2835, 3613, 4245, 4987, 5861, 6472, 7260, 7993, 8365, 9069, 9301, 9451, 9724, 9451, 9301, 9069, 8365, 7993, 7260, 6472, 5861, 4987, 4245, 3613, 2835, 2325, 1783, 1306, 986, 664, 430, 289, 142, 86, 37, 11, 5, 0, 0, 0, 0, 0, 0];

// spreadsheet-venster met twee kolommen en één formulecel
function spreadsheet(ctx, x, y, a = 1, fA = 1, rA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = [56, 150, 150], rh = 34, w = cw[0] + cw[1] + cw[2];
  roundRect(ctx, x - 10, y - 50, w + 20, rh * 13 + 70, 12); shape(ctx, '#F4F5F2', '#B8BEC6', 2); roundRect(ctx, x - 10, y - 50, w + 20, 36, 12); shape(ctx, '#3F7A55', null); ctx.fillStyle = '#3F7A55'; ctx.fillRect(x - 10, y - 30, w + 20, 16);
  const kop = ['', 'A', 'B'];
  for (let r = 0; r < 13; r++) { let cx = x; for (let c = 0; c < 3; c++) { ctx.strokeStyle = '#C8CDD3'; ctx.lineWidth = 1; ctx.strokeRect(cx, y + r * rh, cw[c], rh); if (r === 0 || c === 0) { ctx.fillStyle = '#E2E6EA'; ctx.fillRect(cx + 1, y + r * rh + 1, cw[c] - 2, rh - 2); }
      let s2 = ''; if (r === 0) s2 = kop[c]; else if (c === 0) s2 = String(r); else if (r === 1) s2 = c === 1 ? 'met' : 'zonder'; else if (r <= 11) s2 = String(c === 1 ? MET[r - 2] : ZONDER[r - 2]);
      if (s2) text(ctx, s2, c === 0 || r === 0 ? cx + cw[c] / 2 : cx + cw[c] - 14, y + r * rh + 24, fTekst(20, r === 1 || r === 0 || c === 0 ? 700 : 500), r === 1 ? (c === 1 ? '#8E6A12' : '#2F6E8E') : '#1A2740', c === 0 || r === 0 ? 'center' : 'right'); cx += cw[c]; } }
  // formulecel B12 + uitkomst
  const fy = y + 12 * rh; if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA; ctx.strokeStyle = '#3F7A55'; ctx.lineWidth = 3; ctx.strokeRect(x + cw[0], fy, cw[1] + cw[2], rh);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x + cw[0] + 2, fy + 2, cw[1] + cw[2] - 4, rh - 4); text(ctx, rA > 0.5 ? '0,036' : '=T.TEST(A2:A11;B2:B11;2;2)', rA > 0.5 ? x + w - 14 : x + cw[0] + 8, fy + 24, fTekst(rA > 0.5 ? 22 : 17, 700), '#1A2740', rA > 0.5 ? 'right' : 'left'); ctx.restore(); }
  ctx.restore(); }
// codevenster; regels = [[tekst, kleur]]
function codeVenster(ctx, x, y, w, regels, a = 1, n = 99) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = 40, h = regels.length * lh + 70;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0F1622', '#3A4A64', 2); [C.koraal, C.goud, C.groen].forEach((c, i) => circ(ctx, x + 24 + i * 22, y + 22, 7, c));
  regels.forEach(([s2, col], i) => { if (i < n) text(ctx, s2, x + 22, y + 74 + i * lh, `500 21px "JetBrains Mono", "DejaVu Sans Mono", monospace`, col || '#D8DEE6', 'left'); }); ctx.restore(); }
// laptop (achterkant naar de kijker is lastig; vooraanzicht met scherm)
function genRaster(ctx, x, y, cols, rows, sz, gap, lit, a = 1, t = 0, o2 = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c, on = lit(i);
  roundRect(ctx, x + c * (sz + gap), y + r * (sz + gap), sz, sz, 3); shape(ctx, on ? rgba(o2, 0.9) : "#33425E", on ? o2 : null, 1); } ctx.restore(); }

// muis zonder lichtvezel (review MOET 1): gewone proefmuis in zijaanzicht, snuit rechts
function proefMuis(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20 + Math.sin(t * 2) * 6, -200, -30, -240, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A');
  ctx.strokeStyle = '#8A8078'; ctx.lineWidth = 6; [[-60, 1], [50, 1]].forEach(([px]) => { ctx.beginPath(); ctx.moveTo(px, 50); ctx.lineTo(px + 6, 66); ctx.stroke(); });
  ctx.restore(); }
// petrischaal met cellen (bovenaanzicht)
function petriCellen(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, 'rgba(220,230,240,0.18)', '#C8D4E0', 3);
  ctx.beginPath(); ctx.ellipse(x, y - 4, r * 0.92, r * 0.36, 0, 0, 6.283); shape(ctx, 'rgba(232,180,160,0.35)', null);
  for (let i = 0; i < 16; i++) { const an = hash(i * 1.7) * 6.283, d = Math.sqrt(hash(i * 2.3)) * 0.8, cx = x + Math.cos(an) * r * 0.85 * d, cy = y - 4 + Math.sin(an) * r * 0.32 * d;
    ctx.beginPath(); ctx.ellipse(cx, cy, 13, 7, an, 0, 6.283); shape(ctx, '#E8C0B0', '#B8806A', 1.2); circ(ctx, cx, cy, 3, '#8A5A6A'); }
  ctx.restore(); }

// teken_e6.js — animatiehulpen voor film 6 (Ecologie v2 · Koolstof gaat rond), bouw 29 okt 2026.
// Laadt na teken_eco6.js en e11_aarde.js, vóór sb6.js. Niets in /root/eco2 of ecolib wordt aangepast; alleen nieuwe functies (voorvoegsel e6).

function e6S(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
function e6Fr(x) { return x - Math.floor(x); }
function e6Tus(t, t0, t1) { if (!isFinite(t0)) return 0; if (!isFinite(t1) || t1 <= t0) t1 = t0 + 1; return e6S((t - t0) / (t1 - t0)); }
function e6Dur(st, d = 20) { try { const it = st.items[st.idx]; return (it.seg && it.seg.dur) || it.dur || d; } catch (e) { return d; } }
function e6Puls(ctx, x, y, r, t, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); const p = e6Fr(t * 0.7); ctx.globalAlpha *= a * (1 - p); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r + p * r * 1.6, 0, 6.283); ctx.stroke(); ctx.restore(); }

// pijlgeometrie zoals in e6Kringloop
function e6KP(V, p, q, bw, bh) { const A = V[p], B = V[q]; const an = Math.atan2(B.y - A.y, B.x - A.x); const ox = Math.cos(an), oy = Math.sin(an);
  const r = () => Math.min(Math.abs(bw / 2 / (ox || 1e-6)), Math.abs(bh / 2 / (oy || 1e-6))) + 10; const off = 14, nx = -oy * off, ny = ox * off;
  return [A.x + ox * r() + nx, A.y + oy * r() + ny, B.x - ox * r() + nx, B.y - oy * r() + ny, nx, ny]; }
// kringloopschema met per vak (v.a) en per pijl (5e element) een zichtbaarheid; o.stroom = bolletjes langs de pijlen (koolstof gaat ergens heen)
function e6KringA(ctx, vakken, pijlen, o = {}) { const { a = 1, bw = 260, bh = 110, t = 0, stroom = 0, tijd = 1, focus = null } = o; ctx.save(); ctx.globalAlpha *= a; const V = {}; vakken.forEach(v => V[v.id] = v);
  pijlen.forEach(([p, q, lab, kl, pa = 1]) => { if (pa <= 0.01 || !V[p] || !V[q]) return; const [x1, y1, x2, y2, nx, ny] = e6KP(V, p, q, bw, bh); const u = e6S(pa);
    ctx.save(); ctx.globalAlpha *= Math.min(1, pa * 2); pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), kl || E6K.co2, 1, 5, 18);
    if (stroom > 0.01 && u > 0.98) { ctx.globalAlpha *= stroom; for (let k = 0; k < 2; k++) { const f = e6Fr(t * 0.35 + k / 2 + (x1 + y2) * 0.001); circ(ctx, lerp(x1, x2, f), lerp(y1, y2, f), 6, _lt(kl || E6K.co2, 0.3)); } }
    if (lab && u > 0.5) { const mx = (x1 + x2) / 2 + nx * 2.6, my = (y1 + y2) / 2 + ny * 2.6; naamBij(ctx, lab, null, mx, my + 12, e6S((u - 0.5) * 2), 'center', kl ? _lt(kl, 0.2) : '#D2D8E2'); } ctx.restore(); });
  vakken.forEach(v => { const va = v.a == null ? 1 : v.a; if (va <= 0.01) return; const f = focus == null || focus.includes(v.id); ctx.save(); ctx.globalAlpha *= va;
    roundRect(ctx, v.x - bw / 2, v.y - bh / 2, bw, bh, 18); ctx.fillStyle = C.bgSchema; ctx.fill(); roundRect(ctx, v.x - bw / 2, v.y - bh / 2, bw, bh, 18); shape(ctx, rgba(v.kl || '#2A3A58', f ? 0.9 : 0.35), f ? C.line : rgba(C.line, 0.4), 2);
    const ta = v.ta == null ? tijd : v.ta; text(ctx, v.naam, v.x, v.y + (v.tijd && ta > 0.01 ? -2 : 12), fTekst(36, 700), f ? C.text : rgba(C.text, 0.45), 'center');
    if (v.tijd && ta > 0.01) { ctx.globalAlpha *= ta; metaText(ctx, v.tijd, v.x, v.y + 36, C.grain, 'center', 26); } ctx.restore(); });
  ctx.restore(); return V; }
// punt langs een reeks pijlen (route = [id, id, ...]); f = 0..route.length-1
function e6Route(V, route, f, bw = 260, bh = 110) { const n = route.length - 1, i = Math.min(n - 1, Math.floor(f)), u = f - i; const [x1, y1, x2, y2] = e6KP(V, route[i], route[i + 1], bw, bh);
  if (u < 0.15) { const v = V[route[i]]; return [lerp(v.x + bw * 0.32, x1, u / 0.15), lerp(v.y - bh * 0.5 - 2, y1, u / 0.15)]; }
  if (u > 0.85) { const v = V[route[i + 1]]; return [lerp(x2, v.x + bw * 0.32, (u - 0.85) / 0.15), lerp(y2, v.y - bh * 0.5 - 2, (u - 0.85) / 0.15)]; }
  const w = (u - 0.15) / 0.7; return [lerp(x1, x2, w), lerp(y1, y2, w)]; }

// staafdiagram voorraden met per staaf naam- en groeiwaarde (n[i], g[i]) en de gesteentepijl (gs)
function e6StaafA(ctx, x, y, w, h, o = {}) { const { n = [], g = [], gs = 0, getallen = true, max = 40000, a = 1, as = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.globalAlpha *= as; ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let v = 0; v <= max; v += 10000) { const yy = y - v / max * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, v.toLocaleString('nl-NL'), x - 16, yy + 10, C.text2, 'right', 26); }
  metaText(ctx, 'voorraad koolstof · gigaton (Gt C) · ongeveer', x, y - h - 50, C.grain, 'left', 26); ctx.restore();
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const N = E6_VOORRAAD.length + 1, bw = w / N; E6_VOORRAAD.forEach(([nm, v], i) => { const bx = x + i * bw + bw * 0.2, na = n[i] == null ? 1 : n[i], u = e6S(g[i] || 0);
    if (na > 0.01) { ctx.save(); ctx.globalAlpha *= na; text(ctx, nm, bx + bw * 0.3, y + 44, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    if (u > 0.01) { const bh = Math.max(6, v / max * h) * u; roundRect(ctx, bx, y - bh, bw * 0.6, bh, 6); shape(ctx, rgba(i === 4 ? C.teal : i === 1 ? C.groen : E6K.co2, 0.8), C.line, 1.5);
      if (getallen && u > 0.9) { ctx.save(); ctx.globalAlpha *= (u - 0.9) * 10; text(ctx, '± ' + v.toLocaleString('nl-NL'), bx + bw * 0.3, y - bh - 16, fTekst(32, 700), C.text, 'center'); ctx.restore(); } } });
  const gx = x + 5 * bw + bw * 0.2; const gu = e6S(gs); if (gu > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, gu * 2); const gh = (h + 10) * gu; roundRect(ctx, gx, y - gh, bw * 0.6, gh, 6); shape(ctx, rgba('#C9B896', 0.5), C.line, 1.5);
    if (gu > 0.95) { pijl(ctx, gx + bw * 0.3, y - h + 20, gx + bw * 0.3, y - h - 80, C.text, 1, 5, 18); text(ctx, 'veel meer', gx + bw * 0.3, y - h - 100, fTekst(32, 700), C.text, 'center'); }
    text(ctx, 'gesteente', gx + bw * 0.3, y + 44, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// badkuip met lopende stromen; kranen/afvoer: [pos 0..1, breedte, kleur, label, zichtbaar 0..1]
function e6BadA(ctx, x, y, w, h, o = {}) { const { peil = 0.5, kranen = [], afvoer = [], a = 1, stijg = 0, sa = 1, t = 0, kuip = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const py = y - h * peil - stijg; ctx.save(); ctx.globalAlpha *= kuip; ctx.fillStyle = rgba(E6K.co2, 0.35); ctx.beginPath(); ctx.moveTo(x + 12 + (y - py < h ? 0 : 0), py); ctx.lineTo(x + w - 12, py); ctx.lineTo(x + w - 30, y - 10); ctx.quadraticCurveTo(x + w / 2, y + 10, x + 30, y - 10); ctx.closePath(); ctx.fill();
  // golfjes op het wateroppervlak
  ctx.strokeStyle = rgba('#D2D8E2', 0.35); ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const px = x + 20 + k / 40 * (w - 40), pyy = py + Math.sin(k * 0.9 + t * 2) * 2; k ? ctx.lineTo(px, pyy) : ctx.moveTo(px, pyy); } ctx.stroke(); ctx.restore();
  if (stijg && sa > 0.01) { const p0 = y - h * peil; ctx.save(); ctx.globalAlpha *= sa; ctx.strokeStyle = C.goud; ctx.setLineDash([12, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 20, p0); ctx.lineTo(x + w - 20, p0); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, x + w + 40, p0, x + w + 40, py - 10, C.goud, 1, 5, 18); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= kuip; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + 30, y - 10); ctx.quadraticCurveTo(x + w / 2, y + 12, x + w - 30, y - 10); ctx.lineTo(x + w, y - h); ctx.stroke(); ctx.restore();
  const straal = (sx, sy, b, L, kl, u) => { if (b < 1 || L < 1) return; ctx.fillStyle = rgba(kl, 0.8); ctx.fillRect(sx - b / 2, sy, b, L); ctx.save(); ctx.beginPath(); ctx.rect(sx - b / 2, sy, b, L); ctx.clip(); ctx.fillStyle = rgba(_lt(kl, 0.4), 0.45);
    for (let k = -1; k < L / 40 + 1; k++) ctx.fillRect(sx - b * 0.3, sy + ((k * 40 + t * 90) % (L + 40)) - 20, b * 0.6, 14); ctx.restore(); };
  kranen.forEach(([kx, b, kl, lab, ka = 1]) => { const kxx = x + kx * w; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(kxx - 60, y - h - 90); ctx.lineTo(kxx, y - h - 90); ctx.lineTo(kxx, y - h - 50); ctx.stroke();
    const u = e6S(ka); straal(kxx, y - h - 50, b * u, (py - (y - h - 50)) * Math.min(1, u * 1.5), kl, u); if (lab && u > 0.3) naamBij(ctx, lab, null, kxx - 70, y - h - 110, e6S((u - 0.3) / 0.7), 'center', _lt(kl, 0.2)); });
  afvoer.forEach(([ax, b, kl, lab, ka = 1]) => { const axx = x + ax * w, u = e6S(ka); straal(axx, y - 2, b * u, 90, kl, u); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(axx - 30, y + 2); ctx.lineTo(axx + 30, y + 2); ctx.stroke(); if (lab && u > 0.3) naamBij(ctx, lab, null, axx, y + 140, e6S((u - 0.3) / 0.7), 'center', _lt(kl, 0.2)); });
  ctx.restore(); }

// oceaan-doorsnede met bewegende algen en dwarrelende resten
function e6OceaanA(ctx, x, y, w, h, t, o = {}) { const { alg = 1, rest = 1, bodem = 30 } = o; ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); ctx.fillStyle = '#2A5A7A'; ctx.fillRect(x, y, w, h * 0.3); ctx.fillStyle = '#1E4460'; ctx.fillRect(x, y + h * 0.3, w, h * 0.3); ctx.fillStyle = '#14304A'; ctx.fillRect(x, y + h * 0.6, w, h * 0.4);
  if (alg > 0.01) { ctx.save(); ctx.globalAlpha *= alg; for (let i = 0; i < 24; i++) { const px = x + e6Fr(hash(i * 5) + t * 0.01 * (0.5 + hash(i))) * w, py = y + 30 + hash(i * 9) * h * 0.22 + Math.sin(t * 0.8 + i) * 6; circ(ctx, px, py, 7, C.groen, _lt(C.groen, 0.3), 1.5); } ctx.restore(); }
  if (rest > 0.01) { ctx.save(); ctx.globalAlpha *= rest; for (let i = 0; i < 34; i++) { const f = e6Fr(hash(i * 17) + t * 0.05 * (0.6 + 0.6 * hash(i * 3))), px = x + hash(i * 13) * w + Math.sin(t * 0.7 + i) * 10, py = y + h * 0.28 + f * (h * 0.72 - bodem); circ(ctx, px, py, 3 + hash(i) * 3, '#C9B896', null); } ctx.restore(); }
  ctx.fillStyle = '#3A3026'; ctx.fillRect(x, y + h - bodem, w, bodem); ctx.restore(); roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); }

// Keelingcurve die zich tekent tot jaar jt (model, zoals e6Keeling)
function e6KeelingA(ctx, x, y, w, h, j0, j1, jt, o = {}) { const { pmin = 300, pmax = 440, stap = 1 / 24, trend = 0, titel = true, assen = 1 } = o; ctx.save();
  ctx.save(); ctx.globalAlpha *= assen; ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let p = Math.ceil(pmin / 20) * 20; p <= pmax; p += 20) { const yy = y - (p - pmin) / (pmax - pmin) * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, String(p), x - 16, yy + 10, C.text2, 'right', 26); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const st = (j1 - j0) > 20 ? 10 : 1; for (let j = Math.ceil(j0 / st) * st; j <= j1; j += st) metaText(ctx, String(j), x + (j - j0) / (j1 - j0) * w, y + 40, C.text2, 'center', 26);
  if (titel) metaText(ctx, 'CO₂ in de lucht · Mauna Loa · ppm (deeltjes per miljoen) · NOAA-jaargemiddelden', x, y - h - 40, C.grain, 'left', 26);
  metaText(ctx, 'seizoensgolf schematisch', x + w, y + 76, C.text2, 'right', 22); ctx.restore();
  const X = (j) => x + (j - j0) / (j1 - j0) * w, Y = (p) => y - (p - pmin) / (pmax - pmin) * h; const je = Math.min(j1, jt);
  const js = Math.max(j0, 1959); if (je > js) { ctx.strokeStyle = E6K.co2R; ctx.lineWidth = 3; ctx.beginPath(); for (let j = js; j <= je; j += stap) { const p = e6KeelingWaarde(j); j === js ? ctx.moveTo(X(j), Y(p)) : ctx.lineTo(X(j), Y(p)); } ctx.stroke();
    circ(ctx, X(je), Y(e6KeelingWaarde(je)), 7, C.goud); }
  if (trend > 0.01) { ctx.save(); ctx.globalAlpha *= trend; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let j = j0; j <= lerp(j0, j1, trend); j += 0.05) { const p = e6KTrend(j); j === j0 ? ctx.moveTo(X(j), Y(p)) : ctx.lineTo(X(j), Y(p)); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { X, Y }; }

// rookpluim die opstijgt (cirkels lopen omhoog en vervagen)
function e6Pluim(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); for (let i = 0; i < 8; i++) { const p = e6Fr(t * 0.18 + i / 8); ctx.globalAlpha = a * 0.55 * (1 - p) * Math.min(1, p * 6); circ(ctx, x + p * 300 * s + Math.sin(t + i) * 8, y - p * 330 * s, (34 + p * 70) * s, '#AEB6C4'); } ctx.restore(); }
// vlammetjes die flakkeren
function e6Vlam(ctx, x, y, b, hgt, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { const xx = x - b / 2 + (i + 0.5) * b / 7, hh = hgt * (0.55 + 0.45 * Math.abs(Math.sin(t * 7 + i * 1.7))) * (0.7 + 0.3 * hash(i));
  vul(ctx, [[xx - b / 16, y], [xx + Math.sin(t * 9 + i) * 6, y - hh], [xx + b / 16, y]], i % 2 ? C.koraal : C.goud); } ctx.restore(); }
// klokje met snel draaiende wijzer
function e6Klok(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#2A3A58', C.line, 3); const an = t * 4 - 1.57; ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an / 12) * r * 0.5, y + Math.sin(an / 12) * r * 0.5); ctx.stroke(); ctx.restore(); }
// glucose-zeshoek
function e6Zeshoek(ctx, gx, gy, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * 6.283 + 0.52; ctx.lineTo(gx + Math.cos(an) * r, gy + Math.sin(an) * r); } ctx.stroke(); ctx.restore(); }
// stolp (glazen klok) met plantje
function e6Stolp(ctx, cx, by, s, t, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, by); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 130, 30, 0, 0, 6.283); ctx.fillStyle = '#3A3026'; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(-150, -400, 300, 400); ctx.clip(); ecoKlaver(ctx, 0, -10, 9, { wind: Math.sin(t) * 0.2 }); ctx.restore();
  ctx.fillStyle = 'rgba(175,192,208,0.08)'; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.lineTo(-120, -210); ctx.arc(0, -210, 120, Math.PI, 0); ctx.lineTo(120, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4 / s; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.lineTo(-120, -210); ctx.arc(0, -210, 120, Math.PI, 0); ctx.lineTo(120, 0); ctx.stroke(); ctx.restore(); }

// ---------- Keelingcurve uit echte NOAA-jaargemiddelden (Mauna Loa 1959–2023, keeling_jaargem.json) + schematische seizoensgolf ±3 ppm ----------
const E6_KEELING = [[1959,315.98],[1960,316.91],[1961,317.64],[1962,318.45],[1963,318.99],[1964,319.62],[1965,320.04],[1966,321.37],[1967,322.18],[1968,323.05],[1969,324.62],[1970,325.68],[1971,326.32],[1972,327.46],[1973,329.68],[1974,330.19],[1975,331.13],[1976,332.03],[1977,333.84],[1978,335.41],[1979,336.84],[1980,338.76],[1981,340.12],[1982,341.48],[1983,343.15],[1984,344.87],[1985,346.35],[1986,347.61],[1987,349.31],[1988,351.69],[1989,353.2],[1990,354.45],[1991,355.7],[1992,356.54],[1993,357.21],[1994,358.96],[1995,360.97],[1996,362.74],[1997,363.88],[1998,366.84],[1999,368.54],[2000,369.71],[2001,371.32],[2002,373.45],[2003,375.98],[2004,377.7],[2005,379.98],[2006,382.09],[2007,384.02],[2008,385.83],[2009,387.64],[2010,390.1],[2011,391.85],[2012,394.06],[2013,396.74],[2014,398.81],[2015,401.01],[2016,404.41],[2017,406.76],[2018,408.72],[2019,411.65],[2020,414.21],[2021,416.41],[2022,418.53],[2023,421.08]];
// trend: jaargemiddelde geldt voor midden van het jaar; lineair tussen de jaren, aan de randen doorgetrokken
function e6KTrend(j) { const D = E6_KEELING, n = D.length; const x = j - 0.5; if (x <= D[0][0]) return D[0][1] + (x - D[0][0]) * (D[1][1] - D[0][1]);
  if (x >= D[n - 1][0]) return D[n - 1][1] + (x - D[n - 1][0]) * (D[n - 1][1] - D[n - 2][1]); const i = Math.floor(x - D[0][0]), u = x - D[i][0]; return D[i][1] + u * (D[i + 1][1] - D[i][1]); }
// seizoensgolf (schematisch): piek half mei (0,37), dal begin oktober (0,77); snel dalen in de zomer, langzaam stijgen in herfst en winter
function e6KSeizoen(j) { const p = j - Math.floor(j); if (p >= 0.37 && p < 0.77) return 3 * Math.cos(Math.PI * (p - 0.37) / 0.40); return -3 * Math.cos(Math.PI * (((p - 0.77 + 1) % 1) / 0.60)); }
function e6KeelingWaarde(j) { return e6KTrend(j) + e6KSeizoen(j); }

// ---------- herstellingen na beeldreview (29 okt 2026) ----------
// groen, levend eikenblad: het eikenblad uit de bibliotheek (vers = bruin) wordt op een eigen doek groen gekleurd (luminantie blijft, nerven blijven zichtbaar)
let E6_GROENBLAD = null;
function e6GroenBlad(ctx, x, y, s, hoek = 0, a = 1) { if (a <= 0.01) return;
  if (!E6_GROENBLAD || E6_GROENBLAD.s !== s) { const c = document.createElement('canvas'); c.width = 1000; c.height = 600; const g = c.getContext('2d');
    ecoEikenblad(g, 500, 300, s, { stadium: 0, hoek: 0 }); const m = document.createElement('canvas'); m.width = 1000; m.height = 600; m.getContext('2d').drawImage(c, 0, 0);
    g.globalCompositeOperation = 'color'; g.fillStyle = '#3F9A4A'; g.fillRect(0, 0, 1000, 600); g.globalCompositeOperation = 'destination-in'; g.drawImage(m, 0, 0); g.globalCompositeOperation = 'source-over';
    E6_GROENBLAD = { s, c }; }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(hoek); ctx.drawImage(E6_GROENBLAD.c, -500, -300); ctx.restore(); }
// boom in een landschap: wortels zitten onder de grond en worden niet getekend (alleen boven de grondlijn)
function e6Eik(ctx, x, y, s, o = {}) { ctx.save(); ctx.beginPath(); ctx.rect(0, -2000, W, y + 2000 + 1); ctx.clip(); ecoZomereik(ctx, x, y, s, o); ctx.restore(); }

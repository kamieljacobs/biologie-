// teken_e5.js — animatiehulpen voor film 5 (Ecologie v2 · Waarom zo weinig roofdieren?), bouw 29 okt 2026.
// Laadt na teken_eco5.js en vóór sb5.js. Niets uit /root/eco2 of ecolib wordt overschreven; alleen nieuwe functies (voorvoegsel e5).

function e5S(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
function e5Fr(x) { return x - Math.floor(x); }
function e5Dur(st, d = 20) { try { const it = st.items[st.idx]; return (it.seg && it.seg.dur) || it.dur || d; } catch (e) { return d; } }
// tussen twee cues: 0..1
function e5Tus(t, t0, t1) { if (!isFinite(t0)) return 0; if (!isFinite(t1) || t1 <= t0) t1 = t0 + 1; return e5S((t - t0) / (t1 - t0)); }

// band (energie of stof) die groeit (u = 0..1 langs de lijn) en stroomt (lichte streepjes lopen mee met t)
function e5Band(ctx, x1, y1, x2, y2, b, o = {}) { const { u = 1, t = 0, kleur = E5K.energie, a = 1, buig = 0, kop = true, stroom = true, v = 70 } = o; if (a <= 0.01 || u <= 0.01) return;
  const mx = (x1 + x2) / 2 + buig * (y2 - y1) * 0.2, my = (y1 + y2) / 2 - buig * (x2 - x1) * 0.2;
  const Q = (s) => [(1 - s) * (1 - s) * x1 + 2 * (1 - s) * s * mx + s * s * x2, (1 - s) * (1 - s) * y1 + 2 * (1 - s) * s * my + s * s * y2];
  const N = 40, P = []; let L = 0; for (let i = 0; i <= N; i++) { const p = Q(u * i / N); if (i) L += Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]); P.push(p); }
  const kl = kop ? Math.min(L * 0.6, Math.max(14, b * 0.9)) : 0; const E = P[N], pv = P[N - 1], an = Math.atan2(E[1] - pv[1], E[0] - pv[0]);
  // romp tot kl voor het eind
  const R = []; let acc = 0; R.push(P[0]); for (let i = 1; i <= N; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc + d >= L - kl) { const f = (L - kl - acc) / (d || 1); R.push([P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f]); break; } acc += d; R.push(P[i]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt'; ctx.lineJoin = 'round'; ctx.strokeStyle = kleur; ctx.lineWidth = b;
  ctx.beginPath(); R.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  if (stroom && b >= 5 && R.length > 1) { ctx.save(); ctx.globalAlpha *= 0.45; ctx.strokeStyle = _lt(kleur, 0.45); ctx.lineWidth = Math.max(2, b * 0.38); const dl = Math.max(10, b * 0.9);
    ctx.setLineDash([dl, dl * 1.6]); ctx.lineDashOffset = -t * v; ctx.beginPath(); R.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  if (kop && kl > 2) { const ex = E[0] - Math.cos(an) * kl, ey = E[1] - Math.sin(an) * kl, k = Math.max(b * 1.0, 12); ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(E[0], E[1]);
    ctx.lineTo(ex + Math.cos(an + 1.5708) * k, ey + Math.sin(an + 1.5708) * k); ctx.lineTo(ex - Math.cos(an + 1.5708) * k, ey - Math.sin(an + 1.5708) * k); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }

// opstijgende warmte: twee golvende bundels die achter elkaar opstijgen en vervagen
function e5WarmteA(ctx, x, y, s, t, o = {}) { const { a = 1, hoek = -1.5708 } = o; if (a <= 0.01) return;
  for (let k = 0; k < 2; k++) { const p = e5Fr(t * 0.42 + k * 0.5), d = p * 40 * s; e5Warmte(ctx, x + Math.cos(hoek) * d, y + Math.sin(hoek) * d, s, Object.assign({}, o, { a: a * Math.sin(Math.PI * p) })); } }

// pijl die groeit (u) met bolletjes die erlangs lopen (t)
function e5PijlA(ctx, x1, y1, x2, y2, kl, lw, u, t, o = {}) { const { a = 1, stip = true, v = 0.5 } = o; if (u <= 0.01 || a <= 0.01) return; const ex = lerp(x1, x2, u), ey = lerp(y1, y2, u);
  pijl(ctx, x1, y1, ex, ey, kl, a, lw, 18); if (!stip) return; ctx.save(); ctx.globalAlpha *= a * 0.85;
  for (let k = 0; k < 3; k++) { const p = e5Fr(t * v + k / 3) * u * 0.85; circ(ctx, lerp(x1, x2, p), lerp(y1, y2, p), lw * 0.9, _lt(kl, 0.4)); } ctx.restore(); }

// heen en weer lopen tussen xa en xb met snelheid v (px/s): {x, kijk, d = afgelegde weg}
function e5Heen(t, xa, xb, v) { const L = Math.abs(xb - xa) || 1, sg = Math.sign(xb - xa) || 1, d = Math.max(0, t) * v, p = d % (2 * L);
  return p < L ? { x: xa + sg * p, kijk: sg, d } : { x: xb - sg * (p - L), kijk: -sg, d }; }
// van x0 naar x1 lopen vanaf t0 met snelheid v: {x, loopt, d}
function e5Naar(t, t0, x0, x1, v) { if (!isFinite(t0) || t < t0) return { x: x0, loopt: false, d: 0, klaar: false }; const L = Math.abs(x1 - x0), d = Math.min(L, (t - t0) * v);
  return { x: x0 + Math.sign(x1 - x0) * d, loopt: d < L, d, klaar: d >= L }; }

// boek met per regel een eigen zichtbaarheid; regels: [label, waarde 0..1, kleur, tekstRechts, alpha]
function e5BoekA(ctx, x, y, w, h, titel, regels = [], o = {}) { const { a = 1, open = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ww = w * Math.max(0.02, open), xx = x + (w - ww) / 2; roundRect(ctx, xx, y, ww, h, 14); shape(ctx, '#2A3A58', C.line, 2);
  if (open > 0.98) { ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w / 2, y + 10); ctx.lineTo(x + w / 2, y + h - 10); ctx.stroke();
    if (titel) metaText(ctx, titel, x + 34, y + 56, C.grain, 'left', 26);
    regels.forEach(([lab, v, kl, rechts, al = 1], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + 110 + i * 86; if (lab) text(ctx, lab, x + 34, yy + 28, fTekst(36, 600), C.text, 'left');
      const bx = x + w * 0.36, bw = w * 0.58; roundRect(ctx, bx, yy, bw, 36, 8); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); if (v > 0.002) { roundRect(ctx, bx, yy, Math.max(10, bw * v), 36, 8); ctx.fillStyle = kl; ctx.fill(); }
      if (rechts) metaText(ctx, rechts, bx + bw, yy + 74, C.text2, 'right', 26); ctx.restore(); }); }
  ctx.restore(); }
function e5BoekBalk(x, w, i, y) { return { bx: x + w * 0.36, bw: w * 0.58, yy: y + 110 + i * 86 }; }

// energiestroomschema met per tak een groei (A.opname, A.feces, A.diss, A.prod 0..1); getal[k] = true | tekst
function e5SchemaA(ctx, x, y, s = 1, v = {}, o = {}) { const { A = {}, t = 0, getal = {}, eenheid = 'MJ', namen = true, maxB = 90, focus = null, fa = 1, pct = null, pa = 1, a = 1, breed = {} } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const tot = v.opname || 100, bb = (q) => Math.max(6, maxB * q / tot), g = (k) => (A[k] == null ? 1 : A[k]);
  const doos = (bx, by, bw, bh, kl, lab, key, sub, al) => { if (al <= 0.01) return; const gv = getal[key], val = typeof gv === 'string' ? gv : gv ? v[key] + ' ' + eenheid : null;
    ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, bx, by, bw, bh, 16); shape(ctx, rgba(kl, 0.22), kl, 3); text(ctx, lab, bx + bw / 2, by + (val ? 52 : 66), fTekst(38, 700), C.text, 'center');
    if (val) text(ctx, val, bx + bw / 2, by + 102, fTekst(36, 600), _lt(kl, 0.25), 'center'); if (sub) metaText(ctx, sub, bx + bw / 2, by + bh + 38, C.text2, 'center', 26); ctx.restore(); };
  const tak = (k, x1, y1, x2, y2, kl) => { const u = e5S(g(k) / 0.65); if (u > 0.01) e5Band(ctx, x1, y1, x2, y2, (breed[k] == null ? 1 : breed[k]) * bb(v[k] || 0), { kleur: kl, u, t, v: 50 }); return e5S((g(k) - 0.5) / 0.5); };
  doos(0, 0, 360, 130, E5K.energie, 'opname', 'opname', namen ? 'energie in het voer' : null, e5S(g('opname') * 1.4));
  if (v.feces != null) { const al = tak('feces', 120, 182, -150, 300, E5K.feces); doos(-390, 300, 300, 130, E5K.feces, 'feces', 'feces', namen ? 'niet verteerd' : null, al); }
  if (v.diss != null) { const al = tak('diss', 180, 182, 180, 300, E5K.warmte); doos(30, 300, 300, 130, E5K.warmte, 'dissimilatie', 'diss', namen ? 'R · wordt warmte' : null, al); if (al > 0.01) e5WarmteA(ctx, 180, 292, 0.8, t, { a: 0.9 * al }); }
  if (v.prod != null) { const al = tak('prod', 240, 182, 520, 300, E5K.productie); doos(450, 300, 300, 130, E5K.productie, 'productie', 'prod', namen ? 'vooral groei' : null, al); }
  if (pct && pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; text(ctx, pct, 600, 520, fTekst(40, 700), C.groen, 'center'); ctx.restore(); }
  if (focus && fa > 0.01) { const F = { feces: [-390, 300, 300, 130], diss: [30, 300, 300, 130], prod: [450, 300, 300, 130], opname: [0, 0, 360, 130] }[focus]; ctx.save(); ctx.globalAlpha *= fa; roundRect(ctx, F[0] - 10, F[1] - 10, F[2] + 20, F[3] + 20, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// piramide met per laag een groei g[i] (0..1): laag schuift breed open en verschijnt
function e5PiramideA(ctx, cx, y, lagen, o = {}) { const { h = 70, a = 1, titel = null, ta = 1, labels = true, g = [], la = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  lagen.forEach(([b, kl, lab], i) => { const u = g[i] == null ? 1 : e5S(g[i]); if (u <= 0.01) return; const yy = y - (i + 1) * h, bw = Math.max(8, b * (0.3 + 0.7 * u));
    ctx.save(); ctx.globalAlpha *= Math.min(1, u * 1.5); roundRect(ctx, cx - bw / 2, yy + 4, bw, h - 8, 8); shape(ctx, rgba(kl, 0.55), _lt(kl, 0.25), 2);
    const al = la[i] == null ? u : la[i]; if (labels && lab && al > 0.01) { ctx.globalAlpha *= al; text(ctx, lab, cx + Math.max(b / 2, 60) + 24, yy + h / 2 + 12, fTekst(36, 600), C.text, 'left'); } ctx.restore(); });
  if (titel && ta > 0.01) { ctx.save(); ctx.globalAlpha *= ta; metaText(ctx, titel, cx, y + 44, C.grain, 'center', 26); ctx.restore(); } ctx.restore(); }

// staafdiagram NPP met groei per staaf (g[i] 0..1) en dimmen (dimU 0..1 voor alles behalve 'licht')
function e5StaafA(ctx, x, y, w, h, g = [], o = {}) { const { a = 1, licht = null, dimU = 0, kleur = C.groen } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let v = 0; v <= 2500; v += 500) { const yy = y - v / 2500 * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, String(v), x - 16, yy + 10, C.text2, 'right', 26); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const bw = w / E5_NPP.length; E5_NPP.forEach(([nm, v], i) => { const u = e5S(g[i] || 0); if (u <= 0.01) return; const bh = v / 2500 * h * u, bx = x + i * bw + bw * 0.18; const dd = licht != null && i !== licht ? dimU : 0;
    roundRect(ctx, bx, y - bh, bw * 0.64, Math.max(2, bh), 6); shape(ctx, rgba(kleur, 0.8 - 0.55 * dd), _lt(kleur, 0.3), 1.5);
    ctx.save(); ctx.globalAlpha *= Math.min(1, u * 2); ctx.translate(bx + bw * 0.32, y + 18); ctx.rotate(-0.5); text(ctx, nm, 0, 20, fTekst(34, 600), dd > 0.5 ? rgba(C.text, 0.5) : C.text, 'right'); ctx.restore(); });
  metaText(ctx, 'NPP · gram droge stof per m² per jaar', x, y - h - 40, C.grain, 'left', 26); ctx.restore(); }

// mestkever met lopende poten (driepootgang); t = fase in cycli
function e5KeverA(ctx, x, y, s = 1, t = 0, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.strokeStyle = '#1E2230'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  [[-10, -1, 0], [0, 0, 0.5], [10, 1, 0]].forEach(([px, d, f], i) => { for (const z of [0, 0.5]) { const ph = Math.sin((t + f + z) * 6.283) * 4; ctx.globalAlpha = z ? 0.55 : 1; ctx.beginPath(); ctx.moveTo(px, -6); ctx.lineTo(px + d * 6 - 2 + ph * 0.5, 2); ctx.lineTo(px + d * 8 - 4 + ph, 6); ctx.stroke(); } });
  ctx.globalAlpha = 1; const bob = Math.abs(Math.sin(t * 6.283)) * 0.8;
  ctx.beginPath(); ctx.ellipse(0, -12 - bob, 16, 11, 0, Math.PI, 0); ctx.lineTo(16, -8 - bob); ctx.lineTo(-16, -8 - bob); ctx.closePath(); ctx.fillStyle = '#2A3048'; ctx.fill(); ctx.strokeStyle = '#4A5478'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(18, -10 - bob, 6, 5, 0, 0, 6.283); ctx.fillStyle = '#22283A'; ctx.fill(); ctx.restore(); }

// ademwolkje (koude ochtend): wit wolkje dat uitzet en vervaagt; p = 0..1
function e5Adem(ctx, x, y, p, kijk = 1) { if (p <= 0 || p >= 1) return; ctx.save(); ctx.globalAlpha *= 0.55 * Math.sin(Math.PI * p);
  for (let k = 0; k < 3; k++) circ(ctx, x + kijk * (20 + p * 70 + k * 16), y - p * 26 - k * 6, 10 + p * 22 + k * 3, '#DDE3EA'); ctx.restore(); }

// waterdruppel (teal) en mineraalkorrel (grijs) als icoontjes
function e5Druppel(ctx, x, y, r, a = 1, kl = ECOK.water) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.7); ctx.quadraticCurveTo(x + r * 1.1, y - r * 0.2, x, y + r); ctx.quadraticCurveTo(x - r * 1.1, y - r * 0.2, x, y - r * 1.7); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }
function e5Korrel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; vul(ctx, [[x - r, y], [x - r * 0.4, y - r], [x + r * 0.6, y - r * 0.8], [x + r, y + r * 0.2], [x + r * 0.2, y + r * 0.9]], rgba(E5K.stof, a), rgba(_lt(E5K.stof, 0.3), a), 2); }

// ---------- herstellingen na beeldreview (29 okt 2026) ----------
// hek om één hectare in perspectief (achterkant ver weg, palen kleiner); u = 0..1 hoeveel van de omtrek al staat
function e5HekP(ctx, u = 1, o = {}) { const { a = 1 } = o; if (u <= 0.01 || a <= 0.01) return; const P = [[80, 800], [1180, 800], [960, 600], [430, 600], [80, 800]];
  const L = []; let tot = 0; for (let i = 0; i < 4; i++) { const d = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); L.push(d); tot += d; }
  const hp = (y) => lerp(22, 62, (y - 600) / 200); const pts = []; let rest = tot * u;
  for (let i = 0; i < 4 && rest > 0; i++) { const f = Math.min(1, rest / L[i]); const n = Math.max(2, Math.round(L[i] / 120 * f));
    for (let k = 0; k <= n; k++) { const v = k / n * f; pts.push([lerp(P[i][0], P[i + 1][0], v), lerp(P[i][1], P[i + 1][1], v)]); } rest -= L[i]; }
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = E5.hout; ctx.lineCap = 'round';
  for (const fr of [0.75, 0.38]) { ctx.beginPath(); pts.forEach(([x, y], i) => { const yy = y - hp(y) * fr; i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }); ctx.lineWidth = 3; ctx.stroke(); }
  pts.forEach(([x, y]) => { const h = hp(y), w = lerp(5, 10, (y - 600) / 200); ctx.fillStyle = E5.houtD; ctx.fillRect(x - w / 2, y - h, w, h + 2); }); ctx.restore(); }
// mestkever (zijaanzicht, ± 2 cm): kop, borststuk, achterlijf onder de dekschilden, zes poten (drie aan deze kant, drie lichter erachter); t = fase
function e5KeverB(ctx, x, y, s = 1, t = 0, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const poot = (px, d, f, ver) => { const ph = Math.sin((t + f) * 6.283) * 3; ctx.strokeStyle = ver ? '#3A4058' : '#151822'; ctx.lineWidth = ver ? 2 : 2.6;
    ctx.beginPath(); ctx.moveTo(px, -7); ctx.lineTo(px + d * 7 + ph * 0.4, -1); ctx.lineTo(px + d * 10 + ph, 6); ctx.stroke(); };
  [[-2, -1, 0], [5, 0.2, 0.5], [12, 1, 0]].forEach(([px, d, f]) => poot(px + 3, d, f + 0.5, true));
  const bob = Math.abs(Math.sin(t * 6.283)) * 0.6; ctx.translate(0, -bob);
  ctx.beginPath(); ctx.ellipse(-4, -9, 15, 10, 0, Math.PI, 0); ctx.lineTo(11, -7); ctx.quadraticCurveTo(-4, -4, -19, -8); ctx.closePath(); ctx.fillStyle = '#2A3048'; ctx.fill(); ctx.strokeStyle = '#5A6488'; ctx.lineWidth = 1.2; ctx.stroke(); // achterlijf + dekschilden
  ctx.strokeStyle = '#4A5478'; ctx.beginPath(); ctx.moveTo(-4, -19); ctx.quadraticCurveTo(-5, -12, -8, -6); ctx.stroke();                         // naad van de dekschilden
  ctx.beginPath(); ctx.ellipse(14, -10, 6.5, 6.5, 0, 0, 6.283); ctx.fillStyle = '#232940'; ctx.fill(); ctx.strokeStyle = '#5A6488'; ctx.stroke();   // borststuk
  ctx.beginPath(); ctx.ellipse(22.5, -8, 4.2, 3.8, 0, 0, 6.283); ctx.fillStyle = '#1B2034'; ctx.fill();                                               // kop
  ctx.strokeStyle = '#1B2034'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(25, -10); ctx.lineTo(29, -14); ctx.moveTo(26, -9); ctx.lineTo(30, -11); ctx.stroke(); // sprieten
  ctx.translate(0, bob); [[-2, -1, 0], [5, 0.2, 0.5], [12, 1, 0]].forEach(([px, d, f]) => poot(px, d, f, false)); ctx.restore(); }
// meelwormen (± 2,5 cm): oker gesegmenteerde staafjes
function e5Meelworm(ctx, x, y, s = 1, a = 1, an = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  roundRect(ctx, -13, -2.6, 26, 5.2, 2.6); ctx.fillStyle = '#C99A4E'; ctx.fill(); ctx.strokeStyle = '#8A6230'; ctx.lineWidth = 0.8; for (let i = -9; i <= 9; i += 3) { ctx.beginPath(); ctx.moveTo(i, -2.4); ctx.lineTo(i, 2.4); ctx.stroke(); } circ(ctx, 13, 0, 2.4, '#8A6230'); ctx.restore(); }
// stapel gemaaid gras/kuilvoer als bundel grashalmen (geen koepel)
function e5GrasStapel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let r = 0; r < 4; r++) for (let i = 0; i < 6 - r; i++) grasPol(ctx, x + (i - (5 - r) / 2) * 34 * s, y - r * 30 * s, 1.5 * s); ctx.restore(); }

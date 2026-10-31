// scenes_d2.js — animator 2: s29–s46 (4 De eerste buis, 5 Hoeveel signaal?). Bouwt op SBW2 (kf/sbw2.js) en lib_dif.js.
// Alles boven y = 880 (ondertitels): elke scène tekent binnen een clip.
const _d2uit = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
function _d2run(ctx, look, fn) { bg(ctx, look); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 880); ctx.clip(); fn(); ctx.restore(); }
const _D2 = { cx: 900, y0: 400, L: 540 }; // vaste stand van de dwarsdoorsnede in hoofdstuk 4

// ---------- dwarsdoorsnede: plaat (f 0→1 rolt op) en daarna buis die wegzakt (g 0→1) ----------
// o.thP = dikte van de plaat (40 = nog niet verdikt, 74 = neurale plaat); o.genen = goudstipjes in de plaatcellen
function _d2sectie(ctx, cx, y0, f, o = {}) {
  const L = o.L || _D2.L, a = 210, thS = 40, thP = o.thP ?? 74, g = clamp(o.g || 0, 0, 1);
  const R = { cx, y0 }; const mid = []; let ring = null, chY, my, ry, yEndo;
  if (f < 1 && g <= 0) {
    const th = Math.max(f * Math.PI, 1e-3), Rr = a / th, lift = 90 * f, yE = y0 - lift, yb = yE + Rr * (1 - Math.cos(th));
    const P = (ph) => ({ x: cx + Rr * Math.sin(ph), y: yb - Rr * (1 - Math.cos(ph)) });
    const EL = P(-th), ER = P(th), k = 70 + 60 * f;
    const smooth = (t) => { const s = clamp((t - 0.75) / 0.25, 0, 1); return s * s * (3 - 2 * s); };
    const bez = (p0, c1, c2, p3, n, omk) => { const out = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0], y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1]; const w = smooth(t); out.push({ x, y, th: thS + (thP - thS) * (omk ? 1 - w : w) }); } return out; };
    mid.push(...bez([cx - L, y0], [cx - L + (EL.x - cx + L) * 0.55, y0], [EL.x - k * Math.cos(th), EL.y - k * Math.sin(th)], [EL.x, EL.y], 40, false));
    for (let i = 1; i < 60; i++) { const ph = -th + 2 * th * i / 60; const p = P(ph); mid.push({ x: p.x, y: p.y, th: thP, plaat: true }); }
    mid.push(...bez([ER.x, ER.y], [ER.x + k * Math.cos(th), ER.y - k * Math.sin(th)], [cx + L - (cx + L - ER.x) * 0.55, y0], [cx + L, y0], 40, true));
    R.plaatOnder = yb + thP / 2; chY = R.plaatOnder + 72; my = y0 + 175; ry = 75; yEndo = Math.max(y0 + 340, chY + 90);
  } else {
    const e = ease(g), Rt0 = a / Math.PI, Rt1 = a / Math.PI + 6, ty0 = y0 - 90 + Rt0, ty1 = y0 + thS / 2 + 16 + Rt1 + thP / 2;
    const Rt = lerp(Rt0, Rt1, e), ty = lerp(ty0, ty1, e), thR = thP * lerp(1, 0.9, e), bump = (1 - e) * 90;
    for (let i = 0; i <= 120; i++) { const x = cx - L + 2 * L * i / 120; mid.push({ x, y: y0 - bump * Math.exp(-((x - cx) ** 2) / (2 * 120 * 120)), th: thS }); }
    ring = []; for (let i = 0; i < 72; i++) { const p = i / 72 * 6.283; ring.push({ x: cx + Math.cos(p) * Rt, y: ty + Math.sin(p) * Rt, th: thR, plaat: true }); }
    R.buis = { x: cx, y: ty, r: Rt + thR / 2 }; R.plaatOnder = ty + Rt + thR / 2;
    const chY0 = y0 - 90 + 2 * Rt0 + thP / 2 + 72, chY1 = ty1 + Rt1 + thP * 0.45 + 72; chY = lerp(chY0, chY1, e);
    my = lerp(y0 + 175, ty1 + 105, e); ry = lerp(75, 45, e); yEndo = lerp(Math.max(y0 + 340, chY0 + 90), Math.max(y0 + 340, chY1 + 90), e);
  }
  const meso = (x, y, rx, ry2, n, seed) => { for (let i = 0; i < n; i++) { const an = _w2hash(seed + i) * 6.283, rr = Math.sqrt(_w2hash(seed + i + 50)); const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry2 * rr; ctx.beginPath(); ctx.arc(px, py, 13, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgMicro, 0.45), KB.meso, 1.6); ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 6.283); ctx.fillStyle = _mixHex(KB.meso, '#0B1018', 0.4); ctx.fill(); } };
  for (const s of [-1, 1]) { meso(cx + s * 270, my, 105, ry, 34, s > 0 ? 10 : 200); meso(cx + s * 480, my + 30, 95, 40, 16, s > 0 ? 400 : 600); }
  const e2 = []; for (let i = 0; i <= 80; i++) e2.push({ x: cx - L + 2 * L * i / 80, y: yEndo, th: 26 }); _w2band(ctx, e2, KB.endo, { stap: 34 });
  R.chorda = { x: cx, y: chY, r: 40 };
  const hlC = o.hlChorda || 0;
  ctx.beginPath(); ctx.arc(cx, chY, 40, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgMicro, 0.3), hlC > 0.01 ? C.goud : KB.meso, 3 + 2 * hlC);
  for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.3; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * 20, chY + Math.sin(an) * 20, 8, 0, 6.283); ctx.strokeStyle = rgba(KB.meso, 0.8); ctx.lineWidth = 1.4; ctx.stroke(); }
  R.ecto = _w2band(ctx, mid, KB.ecto, { stap: 30 });
  if (ring) _w2band(ctx, ring, KB.ecto, { ring: true, stap: 24, donker: 0.35 });
  // genen aan in de plaatcellen: goudstipjes in de kernen
  if ((o.genen || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.genen; const pl = (ring || mid).filter(p => ring || p.th > thS + (thP - thS) * 0.6 || p.plaat);
    pl.forEach((p, i) => { if (i % 3) return; ctx.beginPath(); ctx.arc(p.x, p.y, 5.5, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); }); ctx.restore(); }
  R.yEndo = yEndo; R.my = my; R.mid = mid; return R;
}

// stroom van signaalstipjes van (x0,y0) naar (x1,y1); beweegt met t, waaiert uit, vervaagt aan het eind
function _d2stroom(ctx, x0, y0, x1, y1, n, breed, seed, t, o = {}) {
  const col = o.col || C.goud, r = o.r || 7, v = o.v || 0.35, a = o.a == null ? 1 : o.a, bereik = o.bereik == null ? 1 : o.bereik;
  if (a <= 0.01) return; ctx.save();
  for (let i = 0; i < n; i++) { const p = (_w2hash(seed + i) + t * v * (0.7 + 0.6 * _w2hash(seed + i + 7))) % 1; if (p > bereik) continue;
    const sp = (_w2hash(seed + i + 99) - 0.5) * breed * (0.25 + p);
    const x = x0 + (x1 - x0) * p + sp, y = y0 + (y1 - y0) * p + Math.sin(t * 2 + i) * 3;
    ctx.globalAlpha = a * Math.min(1, p * 6, (1 - p) * 5); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = col; ctx.fill(); }
  ctx.restore();
}

// ---------- salamanderlarfje met groeiende tweede as ----------
function _d2larf(ctx, x, y, s, o = {}) {
  const rug = '#5E4C40', buik = '#B79C74', lijn = '#2E241E', licht = '#EDE3CC', gr = clamp(o.groei ?? 1, 0, 1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); bioPad(ctx, [[-60, -78], [60, -84], [200, -64], [300, -22], [338, 6], [300, 22], [210, 18]], false); ctx.lineTo(-60, -40); ctx.closePath(); ctx.fillStyle = rgba('#C9BBA0', 0.55); ctx.fill(); ctx.strokeStyle = rgba(lijn, 0.6); ctx.lineWidth = 2; ctx.stroke();
  if (gr > 0.01) { ctx.save(); ctx.translate(40, 70); ctx.rotate(0.55); ctx.globalAlpha *= Math.min(1, gr * 5); ctx.translate(-70, 0); ctx.scale(lerp(0.2, 1, gr), lerp(0.45, 1, gr)); ctx.translate(70, 0);
    const lijf2 = [[-70, -20], [20, -30], [120, -22], [200, -6], [236, 6], [200, 20], [110, 34], [10, 40], [-60, 30]];
    if ((o.hlLijf || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlLijf; ctx.beginPath(); bioPad(ctx, lijf2, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
    ctx.beginPath(); bioPad(ctx, lijf2, true); ctx.fillStyle = rug; ctx.fill(); ctx.strokeStyle = lijn; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); bioPad(ctx, [[0, -28], [100, -40], [190, -22], [236, 4]], false); ctx.strokeStyle = rgba('#C9BBA0', 0.8); ctx.lineWidth = 9; ctx.stroke();
    if ((o.hlBuis || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlBuis; ctx.beginPath(); bioPad(ctx, [[0, -28], [100, -40], [190, -22], [236, 4]], false); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.stroke(); ctx.restore(); }
    if ((o.hlStreep || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlStreep; ctx.beginPath(); ctx.moveTo(-30, 6); ctx.bezierCurveTo(60, 2, 140, 4, 214, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 15; ctx.stroke(); ctx.restore(); }
    ctx.beginPath(); ctx.moveTo(-30, 6); ctx.bezierCurveTo(60, 2, 140, 4, 214, 8); ctx.strokeStyle = licht; ctx.lineWidth = 7; ctx.stroke();
    ctx.restore(); }
  const romp = [[-250, -10], [-230, -52], [-170, -70], [-60, -66], [80, -64], [210, -44], [300, -10], [320, 6], [290, 14], [200, 22], [100, 44], [0, 74], [-110, 70], [-200, 48], [-246, 22]];
  ctx.beginPath(); bioPad(ctx, romp, true); ctx.fillStyle = rug; ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.ellipse(-20, 70, 190, 70, 0, 0, 6.283); ctx.fillStyle = buik; ctx.fill(); ctx.restore();
  ctx.strokeStyle = lijn; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, romp, true); ctx.stroke();
  ctx.strokeStyle = rgba('#2A201A', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const sx = -110 + i * 26; ctx.beginPath(); ctx.moveTo(sx, -50 + i * 1.2); ctx.quadraticCurveTo(sx + 8, -30, sx, -12 + i * 1.5); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(-205, -24, 15, 0, 6.283); ctx.fillStyle = '#1A1410'; ctx.fill(); ctx.beginPath(); ctx.arc(-200, -29, 4, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-150 + i * 16, -6 + i * 4, 9, 14, 0.3, 0, 6.283); ctx.fillStyle = _mixHex(rug, '#000000', 0.2); ctx.fill(); }
  ctx.restore();
}

// ---------- embryo van achteren, met instelbare rits (d0 = bovenste open stuk, d1 = begin onderste open stuk) ----------
function _d2embryoRug(ctx, x, top, Hh, d0, d1) {
  d0 = clamp(d0, 0.02, 0.5); d1 = clamp(d1, 0.5, 0.955);
  const breed = (u) => { if (u < 0.22) return 150 + 25 * Math.sin(u / 0.22 * Math.PI); if (u < 0.32) return lerp(150, 112, (u - 0.22) / 0.1); if (u < 0.74) return 112 + 8 * Math.sin((u - 0.32) / 0.42 * Math.PI); return lerp(112, 14, ((u - 0.74) / 0.26) ** 1.2); };
  const N = 60, Y = (u) => top + u * Hh, bocht = (u) => Math.sin(u * Math.PI * 1.1) * 18;
  const omtrek = []; for (let i = 0; i <= N; i++) { const u = i / N; omtrek.push([x + bocht(u) + breed(u), Y(u)]); } for (let i = N; i >= 0; i--) { const u = i / N; omtrek.push([x + bocht(u) - breed(u), Y(u)]); }
  ctx.save(); ctx.beginPath(); omtrek.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, _W2HUID, _W2RAND, 3);
  for (let i = 0; i < 15; i++) { const u = 0.33 + i * 0.027; const yy = Y(u), mx = x + bocht(u); for (const s of [-1, 1]) { roundRect(ctx, mx + s * 40 - (s < 0 ? 44 : 0), yy - 9, 44, 18, 8); shape(ctx, '#E3A08C', _W2RAND, 1.5); } }
  const wd0 = clamp(d0 / 0.12, 0, 1), wd1 = clamp((0.955 - d1) / 0.11, 0, 1); // breedte van de open stukken schaalt mee
  const groef = (u) => u < d0 ? lerp(70 * Math.max(0.15, wd0), 6, (u / d0) ** 2.2) * (u < 0.04 ? u / 0.04 : 1) : (u > d1 ? 22 * wd1 * Math.sin(clamp((u - d1) / (0.96 - d1), 0, 1) * Math.PI) ** 0.6 : 0);
  for (const s of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = 0.02 + i / 120 * 0.94; const px = x + bocht(u) + s * (groef(u) + 16), py = Y(u); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.strokeStyle = '#F7D3C3'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = _W2RAND; ctx.lineWidth = 2; ctx.stroke(); }
  for (const [ua, ub] of [[0.02, d0], [d1, 0.96]]) { if (ub - ua < 0.004) continue; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = ua + (ub - ua) * i / 40; ctx.lineTo(x + bocht(u) + groef(u), Y(u)); } for (let i = 40; i >= 0; i--) { const u = ua + (ub - ua) * i / 40; ctx.lineTo(x + bocht(u) - groef(u), Y(u)); } ctx.closePath(); ctx.fillStyle = _mixHex(KB.ecto, '#121A26', 0.25); ctx.fill(); }
  ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = d0 + (d1 - d0) * i / 40; ctx.lineTo(x + bocht(u), Y(u)); } ctx.strokeStyle = _W2RAND; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore(); return { Y, bocht };
}

// ---------- arm-/handknop: f 0 knop → 1 handplaat (vloeiend), stralen per vinger, gradiënt die zich verspreidt ----------
function _d2knopPad(ctx, x, yb, f) {
  const e = ease(f), hw = lerp(210, 120, e), top = lerp(250, 470, e), pw = lerp(210, 260, e), sch = 0.55 * ease((f - 0.3) / 0.7);
  ctx.beginPath(); ctx.moveTo(x - 340, yb); ctx.lineTo(x - hw - 40, yb);
  ctx.bezierCurveTo(x - hw, yb - 10, x - hw, yb - top * sch * 0.6, x - pw, yb - top * Math.max(sch, 0.05));
  ctx.bezierCurveTo(x - pw, yb - top * 0.95, x - pw * 0.55, yb - top, x, yb - top);
  ctx.bezierCurveTo(x + pw * 0.55, yb - top, x + pw, yb - top * 0.95, x + pw, yb - top * Math.max(sch, 0.05));
  ctx.bezierCurveTo(x + hw, yb - top * sch * 0.6, x + hw, yb - 10, x + hw + 40, yb); ctx.lineTo(x + 340, yb); ctx.lineTo(x + 340, yb + 40); ctx.lineTo(x - 340, yb + 40); ctx.closePath();
  return { top: yb - top, pw, hw, topH: top };
}
// o.straal = [5 × 0..1] groei van de vingerstralen (duim … pink), o.hlStraal = [5 × 0..1]; o.front = hoe ver het signaal al is (px), o.bron = 0..1, o.t
function _d2knop(ctx, x, yb, f, o = {}) {
  const ef = ease(f);
  ctx.save(); const K = _d2knopPad(ctx, x, yb, f); ctx.fillStyle = _W2HUID; ctx.fill(); ctx.strokeStyle = _W2RAND; ctx.lineWidth = 3; ctx.stroke(); ctx.clip();
  _d2knopPad(ctx, x, yb, f); ctx.strokeStyle = '#F7D3C3'; ctx.lineWidth = 14; ctx.stroke();
  const st = o.straal || [0, 0, 0, 0, 0], hl = o.hlStraal || [0, 0, 0, 0, 0], stralen = [];
  for (let i = 0; i < 5; i++) { const bx = x + (i - 2) * 30, by = yb - K.topH * 0.5, ex = x + (i - 2) * 88, ey = yb - K.topH * (i === 0 ? 0.76 : (i === 4 ? 0.82 : (i === 2 ? 0.93 : 0.9))); stralen.push([ex, ey]);
    const g = ease(st[i]); if (g < 0.01) continue; const tx = lerp(bx, ex, g), tyy = lerp(by, ey, g);
    if (hl[i] > 0.01) { ctx.save(); ctx.globalAlpha *= hl[i]; ctx.strokeStyle = C.goud; ctx.lineWidth = 40; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, tyy); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= Math.min(1, g * 4); ctx.strokeStyle = rgba('#B97A6C', 0.75); ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, tyy); ctx.stroke(); ctx.restore(); }
  const bx = x + K.pw * 0.86, by = yb - K.topH * lerp(0.4, 0.66, ef);
  if (o.front > 0) { const t = o.t || 0; for (let i = 0; i < 520; i++) { const px0 = x - 360 + _w2hash(i * 3 + 1) * 720, py0 = yb - _w2hash(i * 3 + 2) * K.topH; const d = Math.hypot(px0 - bx, (py0 - by) * 0.7);
      if (d > o.front) continue; if (_w2hash(i * 3 + 7) < Math.exp(-d / (o.bereik || 170))) { const px = px0 + Math.sin(t * 1.7 + i) * 4, py = py0 + Math.cos(t * 1.3 + i * 0.7) * 4; ctx.globalAlpha = Math.min(1, (o.front - d) / 60); ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); } }
    ctx.globalAlpha = 1; }
  ctx.restore();
  const B = [bx, by], ba = o.bron == null ? 1 : o.bron;
  if (ba > 0.01) { ctx.save(); ctx.globalAlpha *= ba; for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283, rr = i ? 26 : 0; ctx.beginPath(); ctx.arc(bx - 14 + Math.cos(an) * rr, by + Math.sin(an) * rr * 1.2, 14, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), '#8A6510', 2); } ctx.restore(); }
  return { K, bron: B, stralen };
}

// ---------- kip: vleugelknop met bron(nen) die gaan stralen; o.front1/o.front2 = bereik van het signaal per bron ----------
function _d2vleugelknop(ctx, x, y0, s, o = {}) {
  ctx.save(); ctx.translate(x, y0); ctx.scale(s, s);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-300, -60); ctx.lineTo(300, -60); ctx.lineTo(300, 0); ctx.lineTo(170, 0); ctx.bezierCurveTo(160, 120, 150, 230, 0, 240); ctx.bezierCurveTo(-150, 230, -160, 120, -170, 0); ctx.lineTo(-300, 0); ctx.closePath(); };
  pad(); shape(ctx, '#F0D2BC', '#B98A72', 3);
  const B = [[118, 120, o.front1 || 0], [-118, 120, o.front2 || 0]], t = o.t || 0;
  ctx.save(); pad(); ctx.clip(); for (let i = 0; i < 360; i++) { const px0 = -300 + _w2hash(i * 5 + 3) * 600, py0 = -60 + _w2hash(i * 5 + 4) * 300; let best = 0;
    for (const [bx, by, fr] of B) { if (fr <= 0) continue; const d = Math.hypot(px0 - bx, py0 - by); if (d < fr) best = Math.max(best, Math.exp(-d / 110) * Math.min(1, (fr - d) / 50)); }
    if (best > 0 && _w2hash(i * 5 + 9) < best) { ctx.beginPath(); ctx.arc(px0 + Math.sin(t * 1.6 + i) * 3, py0 + Math.cos(t * 1.2 + i) * 3, 6, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); } }
  ctx.restore();
  if (o.bron !== false) for (let i = 0; i < 7; i++) { const an = i / 7 * 6.283, rr = i ? 20 : 0; ctx.beginPath(); ctx.arc(118 + Math.cos(an) * rr, 120 + Math.sin(an) * rr, 12, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), '#8A6510', 2); }
  ctx.restore();
  const W2 = (lx, ly) => [x + lx * s, y0 + ly * s];
  return { voor: W2(-118, 120), achter: W2(118, 120), punt: W2(0, 240), W2 };
}
function _d2kraal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.goud, 0.9), '#8A6510', 2.5); ctx.restore(); }

// ---------- vleugelskelet dat groeit: o.arm 0..1 (opperarm → onderarm → pols), o.vg[i] 0..1 per vinger, o.hl[i] goud ----------
function _d2bot(ctx, x1, y1, x2, y2, w, hl = 0) {
  ctx.save(); ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = w + 16; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.globalAlpha /= hl; }
  ctx.strokeStyle = '#9C8E72'; ctx.lineWidth = w + 5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.strokeStyle = '#EDE4CC'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}
function _d2vleugel(ctx, x, y, s, vingers, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const n = vingers.length, breed = n > 3, arm = o.arm == null ? 1 : o.arm, vg = o.vg || vingers.map(() => 1), hl = o.hl || vingers.map(() => 0);
  const g1 = ease(arm / 0.4), g2 = ease((arm - 0.4) / 0.4), g3 = ease((arm - 0.8) / 0.2);
  if (g1 > 0.01) _d2bot(ctx, 0, 0, 0, -170 * g1, 24);
  if (g2 > 0.01) { _d2bot(ctx, -14, -186, lerp(-14, -22 - (breed ? 40 : 0), g2), lerp(-186, -340, g2), 12); _d2bot(ctx, 14, -186, lerp(14, 22 + (breed ? 40 : 0), g2), lerp(-186, -340, g2), 17); }
  const pw = breed ? (n - 1) * 134 + 40 : 90;
  if (g3 > 0.01) { ctx.save(); ctx.globalAlpha *= g3; roundRect(ctx, -(pw / 2 + 10) * g3, -362, (pw + 20) * g3, 26, 12); shape(ctx, '#EDE4CC', '#9C8E72', 2.5); ctx.restore(); }
  const tops = [];
  vingers.forEach((v, i) => { const V = _W2VINGER[v], gap = breed ? 134 : 46, bx = (i - (n - 1) / 2) * gap, an = (i - (n - 1) / 2) * (breed ? 0.04 : 0.12), g = ease(vg[i]);
    let px = bx, py = -366; const seg = [V.mc, ...V.ph];
    seg.forEach((Lr, k) => { const L2 = Lr * g; const ex = px + Math.sin(an) * L2, ey = py - Math.cos(an) * L2; if (g > 0.01) _d2bot(ctx, px, py - (k ? 4 : 0), ex, ey, V.w * (k ? 0.85 : 1), hl[i]); px = ex; py = ey - 6 * g; });
    const full = seg.reduce((a2, b) => a2 + b + 6, 0); tops.push([x + (bx + Math.sin(an) * full) * s, y + (-366 - Math.cos(an) * full) * s]); });
  ctx.restore(); return { tops };
}
function _d2kromme(ctx, x0, x1, yb, h, fn, o = {}) { // o.p = deel getekend (0..1), o.vanRechts
  const p = o.p == null ? 1 : o.p; if (p <= 0.01) return; ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.globalAlpha *= Math.min(1, p * 3); ctx.beginPath(); ctx.moveTo(x0, yb - h - 10); ctx.lineTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke();
  const ua = o.vanRechts ? 1 - p : 0, ub = o.vanRechts ? 1 : p; const pts = []; for (let i = 0; i <= 100; i++) { const u = ua + (ub - ua) * i / 100; pts.push([x0 + (x1 - x0) * u, yb - fn(u) * h]); }
  ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke();
  ctx.lineTo(pts[pts.length - 1][0], yb); ctx.lineTo(pts[0][0], yb); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.14); ctx.fill();
  if (o.titel) metaText(ctx, o.titel, x0, yb - h - 26, C.text2, 'left', 26);
  ctx.restore();
}
// cel met signaalstipjes eromheen (s38)
function _d2signaalCel(ctx, x, y, r, n, t, a = 1, seed = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgSchema, 0.55), KB.meso, 3); ctx.beginPath(); ctx.arc(x + 6, y - 4, r * 0.32, 0, 6.283); ctx.fillStyle = _mixHex(KB.meso, '#0B1018', 0.35); ctx.fill();
  for (let i = 0; i < n; i++) { const an = _w2hash(seed + i) * 6.283 + t * 0.25 * (_w2hash(seed + i + 3) - 0.5), rr = r + 14 + 30 * _w2hash(seed + i + 9) + Math.sin(t * 1.5 + i) * 4; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, 7, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); }
  ctx.restore();
}
// Esra's keuken (w25, zonder partner); o.dag = tot welke dag de kalender is doorgelopen, o.sluit/o.test/o.start = 0..1
function _d2keuken(ctx, t, o = {}) {
  roundRect(ctx, 160, 170, 380, 300, 10); shape(ctx, '#2C4468', '#7C8DA8', 4); ctx.strokeStyle = '#7C8DA8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(350, 170); ctx.lineTo(350, 470); ctx.moveTo(160, 320); ctx.lineTo(540, 320); ctx.stroke();
  const kx = 1380, ky = 160, cw = 62, chh = 56; roundRect(ctx, kx - 20, ky - 20, 7 * cw + 40, 5 * chh + 100, 10); shape(ctx, '#EEF0F2', '#9AA3B2', 2);
  ctx.fillStyle = '#C9654B'; ctx.fillRect(kx - 20, ky - 20, 7 * cw + 40, 50);
  const cel = (d) => [kx + (d % 7) * cw, ky + 44 + Math.floor(d / 7) * chh];
  const dag = o.dag || 0; for (let d = 0; d < 35; d++) { const [cx0, cy0] = cel(d); const v = clamp(dag - d, 0, 1); if (v > 0) { ctx.fillStyle = rgba('#5BA4C9', 0.22 * v); ctx.fillRect(cx0, cy0, cw, chh); } }
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 1.5; ctx.strokeRect(kx + c * cw, ky + 44 + r * chh, cw, chh); }
  const mid = (d) => { const [a1, b1] = cel(d); return [a1 + cw / 2, b1 + chh / 2]; };
  if ((o.start || 0) > 0.01) { const [xX, yX] = mid(2), k = 16 * ease(o.start); ctx.strokeStyle = '#2A7A4A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xX - k, yX - k); ctx.lineTo(xX + k, yX + k); ctx.moveTo(xX + k, yX - k); ctx.lineTo(xX - k, yX + k); ctx.stroke(); }
  if ((o.sluit || 0) > 0.01) { const [xS, yS] = mid(26); ctx.save(); ctx.globalAlpha *= o.sluit; ctx.beginPath(); ctx.arc(xS, yS, 14, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  if ((o.test || 0) > 0.01) { const [tX, tY] = mid(33); ctx.save(); ctx.globalAlpha *= o.test; ctx.translate(tX, tY); ctx.rotate(-0.6); roundRect(ctx, -24, -7, 48, 14, 6); shape(ctx, '#F7F7F4', '#5E6878', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-4, -4, 12, 8); ctx.restore();
    ctx.save(); ctx.globalAlpha *= o.test; ctx.beginPath(); ctx.arc(tX, tY, 26, 0, 6.283); ctx.strokeStyle = '#C9654B'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  const tab = o.tablet || 0;
  persoon(ctx, 'esra', 780, 960, 600, { zwanger: 0, uit: o.uit || 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y) => { if (tab < 0.01) return; c.save(); c.globalAlpha *= tab; c.beginPath(); c.arc(x + 4, y - 10, 7, 0, 6.283); shape(c, '#F7F4EC', '#9AA3B2', 1.5); c.restore(); } });
  ctx.fillStyle = '#8A6448'; ctx.fillRect(420, 640, 1000, 30); ctx.fillStyle = '#6E4E38'; ctx.fillRect(440, 670, 960, 230);
  const px = 1000, py = 640; roundRect(ctx, px - 30, py - 86, 60, 86, 10); shape(ctx, '#F2F2EE', '#9AA3B2', 2.5); ctx.fillStyle = '#7FC48F'; ctx.fillRect(px - 30, py - 60, 60, 30); roundRect(ctx, px - 34, py - 104, 68, 22, 6); shape(ctx, '#7FC48F', '#4F8F6A', 2);
  for (const [tx, ty] of [[930, 634], [952, 630]]) { ctx.beginPath(); ctx.ellipse(tx, ty, 9, 6, 0, 0, 6.283); shape(ctx, '#F7F4EC', '#9AA3B2', 1.5); }
  const ly = 160 + 5 * 56 + 140; ctx.save();
  ctx.globalAlpha = o.start || 0; metaText(ctx, '✕ START FOLIUMZUUR', 1360, ly, C.text, 'left', 26);
  ctx.globalAlpha = o.sluit || 0; metaText(ctx, '● BUIS SLUIT', 1360, ly + 40, C.goud, 'left', 26);
  ctx.globalAlpha = o.test || 0; metaText(ctx, '○ ZWANGERSCHAPSTEST', 1360, ly + 80, C.text, 'left', 26); ctx.restore();
  return { pot: [px, py - 50] };
}

Object.assign(SCENES, {
  // ===================== 4 DE EERSTE BUIS =====================
  s29(ctx, t, q) { _d2run(ctx, 'micro', () => { const { cx, y0 } = _D2;
    const a0 = ramp(t, 0, 0.6); ctx.save(); ctx.globalAlpha *= a0;
    const R = _d2sectie(ctx, cx, y0, 0, { thP: 40, hlChorda: q.on('chorda', 1, 0.4) });
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= q.on('negentien', 1, 0.5); metaText(ctx, 'DAG 19 · DWARSDOORSNEDE', W - 80, 78, C.goud, 'right', 26); ctx.restore();
    // ectoderm licht op, dan de chorda; het mesoderm eromheen
    const e = q.on('ectoderm', 1, 0.4); if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e * (1 - 0.6 * ramp(t, q.at('staafje'), 0.6)); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 200, y0 - 26); ctx.lineTo(cx + 200, y0 - 26); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'ectoderm', null, cx - 420, y0 - 40, q.on('ectoderm', 1, 0.4), 'center', C.text);
    naamBij(ctx, 'mesoderm', null, cx + 600, y0 + 100, q.on('mesoderm', 1, 0.4), 'center', C.text);
    naamBij(ctx, 'endoderm', null, cx, R.yEndo + 70, a0 * q.on('mesoderm', 1, 0.6), 'center', C.text2);
    const ch = q.on('staafje', 1, 0.4); if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch * (0.6 + 0.4 * Math.sin(t * 4)); ctx.beginPath(); ctx.arc(cx, R.chorda.y, 52, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'chorda', null, cx + 60, R.chorda.y + 12, q.on('chorda', 1, 0.4), 'left', C.text);
  }); },
  s30(ctx, t, q) { _d2run(ctx, 'micro', () => { const { cx, y0 } = _D2;
    const dik = ramp(t, q.at('dikker') - 0.3, 1.2), gen = q.on('genen', 1, 0.5);
    const R = _d2sectie(ctx, cx, y0, 0, { thP: lerp(40, 74, dik), genen: gen, hlChorda: q.on('signaalstoffen', 1, 0.4) * _d2uit(t, q.at('verspreiden') + 1) });
    metaText(ctx, 'DAG 19 · DWARSDOORSNEDE', W - 80, 78, C.goud, 'right', 26);
    // signaalstoffen: uit de chorda en het weefsel eromheen, omhoog naar het ectoderm
    const s = q.on('signaalstoffen', 1, 0.6), ver = ramp(t, q.at('verspreiden') - 0.3, 1.4), boven = R.plaatOnder + 6;
    _d2stroom(ctx, cx, R.chorda.y - 40, cx, boven, 40, 260, 7, t, { a: s, bereik: lerp(0.25, 1, ver) });
    for (const k of [-1, 1]) _d2stroom(ctx, cx + k * 230, R.my - 60, cx + k * 120, boven, 16, 180, k > 0 ? 70 : 140, t, { a: s * q.on('weefsel', 1, 0.6), bereik: lerp(0.25, 1, ver) });
    naamBij(ctx, 'chorda', 'maakt signaalstoffen', cx + 60, R.chorda.y + 22, 1, 'left', C.text);
    naamBij(ctx, 'signaalstoffen', null, cx - 160, boven + 70, s, 'right', C.goud);
    naamBij(ctx, 'genen aan', null, cx + 250, y0 - 60, gen * _d2uit(t, q.at('dikker'), 0.6), 'left', C.goud);
    naamBij(ctx, 'ectoderm', null, cx - 420, y0 - 40, 1 - q.on('dikker', 1, 0.6), 'center', C.text);
    naamBij(ctx, 'neurale plaat', 'verdikt ectoderm', cx, y0 - 90, q.on('plaat', 1, 0.4), 'center', C.text);
    naamBij(ctx, 'mesoderm', null, cx + 600, y0 + 100, 1, 'center', C.text);
  }); },
  s31(ctx, t, q) { _d2run(ctx, 'micro', () => { const { cx, y0 } = _D2;
    // de randen komen omhoog (omhoog), buigen naar elkaar toe (buigen), raken elkaar (sluiten) en de buis zakt weg (buis)
    const tA = q.at('randen'), tB = q.at('sluiten'); const f = Math.min(1, lerp(0, 0.55, (t - tA) / (q.at('buigen') - tA + 0.3)) + lerp(0, 0.45, (t - q.at('buigen') - 0.3) / (tB - q.at('buigen') + 0.2)));
    const g = ramp(t, tB + 0.6, 1.8);
    const R = _d2sectie(ctx, cx, y0, f, { thP: 74, g });
    metaText(ctx, 'DAG 19–23 · DWARSDOORSNEDE', W - 80, 78, C.goud, 'right', 26);
    naamBij(ctx, 'neurale plaat', null, cx, y0 - 90, 1 - q.on('randen', 1, 0.4), 'center', C.text);
    if (f < 1 && g <= 0 && R.mid.length) { const ra = q.on('randen', 1, 0.4) * _d2uit(t, tB, 0.4); const EL = R.mid[40], ER = R.mid[R.mid.length - 41];
      pijl(ctx, EL.x - 50, EL.y + 10, EL.x - 30, EL.y - 60, C.goud, ra, 4, 14); pijl(ctx, ER.x + 50, ER.y + 10, ER.x + 30, ER.y - 60, C.goud, ra, 4, 14); }
    if (R.buis) { naamBij(ctx, 'neurale buis', 'hersenen en ruggenmerg', cx - R.buis.r - 30, R.buis.y + 10, q.on('buis', 1, 0.5), 'right', C.text);
      const hb = q.on('hersenen', 1, 0.4) * (0.5 + 0.5 * Math.sin(t * 4)); if (hb > 0.01) { ctx.save(); ctx.globalAlpha *= hb; ctx.beginPath(); ctx.arc(cx, R.buis.y, R.buis.r + 8, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } }
    naamBij(ctx, 'chorda', null, cx + 60, R.chorda.y + 20, 1, 'left', C.text);
  }); },
  s32(ctx, t, q) { _d2run(ctx, 'micro', () => { const { cx, y0 } = _D2;
    const R = _d2sectie(ctx, cx, y0, 1, { thP: 74, g: 1 });
    metaText(ctx, 'DAG 19–23 · DWARSDOORSNEDE', W - 80, 78, C.goud, 'right', 26);
    const pl = q.on('plaat', 1, 0.4) * _d2uit(t, q.at('ernaast'), 0.5); if (pl > 0.01) { ctx.save(); ctx.globalAlpha *= pl; ctx.beginPath(); ctx.arc(cx, R.buis.y, R.buis.r + 8, 0, 6.283); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'neurale buis', null, cx - R.buis.r - 30, R.buis.y + 10, 1, 'right', C.text);
    naamBij(ctx, 'chorda', null, cx + 60, R.chorda.y + 20, 1, 'left', C.text);
    // onze cel: verschijnt in het ectoderm naast de buis
    const oc = q.on('cel', 1, 0.5), xc = cx + 260; if (oc > 0.01) { ctx.save(); ctx.globalAlpha *= oc; onzeCel(ctx, xc, y0, 22 + 6 * (1 - oc)); ctx.restore(); }
    naamBij(ctx, 'onze cel', null, xc, y0 - 78, oc * _d2uit(t, q.at('huid'), 0.4), 'center', C.goud);
    naamBij(ctx, 'onze cel', 'wordt huid en lens', xc, y0 - 78, q.on('huid', 1, 0.4), 'center', C.goud);
    const ec = q.on('ectoderm', 1, 0.4); if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec * 0.8; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 140, y0 - 26); ctx.lineTo(cx + _D2.L, y0 - 26); ctx.moveTo(cx - 140, y0 - 26); ctx.lineTo(cx - _D2.L, y0 - 26); ctx.stroke(); ctx.restore(); }
    // klein landschap: weer een dal dieper
    const la = q.on('huid', 1, 0.5); if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens'], ease((t - q.at('dal')) / 0.8)); ctx.restore(); }
  }); },
  s33(ctx, t, q) { _d2run(ctx, 'schema', () => {
    const titel = q.on('inductie', 1, 0.4); text(ctx, 'inductie', 140, 290, fTitel(104), rgba(C.goud, titel), 'left');
    regel(ctx, 'Een groepje cellen verandert het lot van zijn buren.', 140, 380, q.on('groepje', 1, 0.5), C.text, 48, 'left', 500);
    const y = 640, gr = q.on('groepje', 1, 0.4);
    // signaal tussen de cellen (achter de buren getekend)
    _d2stroom(ctx, 440, y, 1300, y, 46, 110, 31, t, { a: q.on('cellen', 1, 0.5), v: 0.45, bereik: lerp(0.15, 0.62, ramp(t, q.at('cellen'), 1.4)) });
    [[300, 600], [360, 590], [330, 650], [270, 660], [390, 650], [300, 710], [360, 712]].forEach(([x, yy], i) => { const pu = 1 + 0.04 * Math.sin(t * 3 + i) * gr; ctx.beginPath(); ctx.arc(x, yy, 32 * pu, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgSchema, 0.45), gr > 0.5 ? C.goud : KB.meso, 3); ctx.beginPath(); ctx.arc(x, yy, 11, 0, 6.283); ctx.fillStyle = _mixHex(KB.meso, '#0B1018', 0.35); ctx.fill(); });
    regel(ctx, 'groepje cellen', 330, 800, gr, C.text, 36, 'center');
    pijl(ctx, 470, y + 90, 800, y + 90, C.goud, q.on('cellen', 1, 0.5), 5, 18); regel(ctx, 'signaal', 635, 800, q.on('cellen', 1, 0.5), C.goud, 36, 'center');
    for (let i = 0; i < 7; i++) { const x = 900 + i * 118; const m = i < 4 ? ramp(t, q.at('buren') + i * 0.25, 0.6) : 0;
      const w = lerp(88, 80, m), h = lerp(88, 170, m); roundRect(ctx, x - w / 2, y - h / 2, w, h, lerp(44, 26, m)); shape(ctx, _mixHex(KB.ecto, C.bgSchema, lerp(0.55, 0.3, m)), m > 0.5 ? C.goud : KB.ecto, lerp(3, 3.5, m));
      ctx.beginPath(); ctx.ellipse(x, y + 30 * m, 13, lerp(13, 20, m), 0, 0, 6.283); ctx.fillStyle = _mixHex(KB.ecto, '#0B1018', 0.35); ctx.fill(); }
    regel(ctx, 'buren krijgen een ander lot', 1077, 800, q.on('verandert', 1, 0.5), C.text, 36, 'center');
    regel(ctx, 'buren zonder signaal', 1550, 800, q.on('verandert', 1, 0.5), C.text2, 36, 'center');
  }); },
  s34(ctx, t, q) { _d2run(ctx, 'schema', () => {
    metaText(ctx, 'SALAMANDER · 1924', W - 80, 78, C.goud, 'right', 26);
    regel(ctx, 'Hans Spemann en Hilde Mangold', 960, 200, q.on('Spemann', 1, 0.5) * _d2uit(t, q.at('plantte'), 0.6), C.text, 40, 'center');
    // donor (zonder kleur) met het stukje van de bovenrand van de oermond
    const dA = q.on('Mangold', 2, 0.6), weg = ramp(t, q.at('over') - 0.1, 1.3), kl = q.on('kleur', 1, 0.5);
    if (dA > 0.01) { ctx.save(); ctx.globalAlpha *= dA; const D = _w2gastrula(ctx, 330, 470, 150, { pigment: false, lip: 1.25 }); const p0 = [D.lip[0] + 4, D.lip[1] - 30];
      if (weg > 0.01) { ctx.beginPath(); ctx.ellipse(p0[0], p0[1], 40, 26, 0.3, 0, 6.283); ctx.fillStyle = rgba('#8C7E62', 0.55 * weg); ctx.fill(); }
      const ring = q.on('bovenrand', 1, 0.4) * _d2uit(t, q.at('over'), 0.4); if (ring > 0.01) { ctx.save(); ctx.globalAlpha *= ring; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(p0[0], p0[1], 46, 30, 0.3, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
      ctx.restore();
      naamBij(ctx, 'bovenrand van de oermond', null, 330, 690, q.on('bovenrand', 1, 0.4), 'center', C.goud);
      ctx.save(); ctx.globalAlpha *= dA; metaText(ctx, kl > 0.5 ? 'DONOR · ZONDER KLEUR' : 'DONOR', 330, 280, C.text2, 'center', 26); ctx.restore(); }
    // ontvanger (gekleurd)
    const oA = ramp(t, q.at('over') - 0.3, 0.6), sx = 820 + Math.cos(1.25 + Math.PI) * 95, sy = 470 + Math.sin(1.25 + Math.PI) * 95;
    pijl(ctx, 520, 470, 640, 470, C.goud, oA, 5, 18);
    if (oA > 0.01) { ctx.save(); ctx.globalAlpha *= oA; _w2gastrula(ctx, 820, 470, 150, { pigment: true, lip: 1.25 }); metaText(ctx, kl > 0.5 ? 'ONTVANGER · GEKLEURD' : 'ONTVANGER', 820, 280, C.text2, 'center', 26); ctx.restore(); }
    // het stukje reist over (boogje), daarna ligt het in de buikkant
    if (dA > 0.01) { const p0 = [330 + Math.cos(1.25) * 93 + 4, 470 + Math.sin(1.25) * 93 - 30], u = weg; const cxp = (p0[0] + sx) / 2, cyp = Math.min(p0[1], sy) - 260;
      const x = (1 - u) ** 2 * p0[0] + 2 * (1 - u) * u * cxp + u * u * sx, yy = (1 - u) ** 2 * p0[1] + 2 * (1 - u) * u * cyp + u * u * sy;
      const st = q.on('stukje', 1, 0.4); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st * dA; ctx.beginPath(); ctx.ellipse(x, yy, 40, 26, 0.3, 0, 6.283); shape(ctx, '#E6DBC2', C.goud, 4 + 2 * kl * Math.max(0, Math.sin(t * 4)) * _d2uit(t, q.at('groeide'))); ctx.restore(); } }
    naamBij(ctx, 'stukje erin', 'aan de buikkant', sx - 54, sy - 24, q.on('buikkant', 1, 0.5), 'right', C.goud);
    // organisator: het stukje licht op
    const org = q.on('organisator', 1, 0.4); if (org > 0.01) { ctx.save(); ctx.globalAlpha *= org; ctx.beginPath(); ctx.arc(sx, sy, 62 + 4 * Math.sin(t * 4), 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    tag(ctx, 'organisator', 820, 720, C.goud, org, 'center', 36);
    // larfje met een tweede lichaam dat uitgroeit
    const lA = q.on('groeide', 1, 0.6); pijl(ctx, 1010, 470, 1130, 470, C.line, lA, 5, 18);
    if (lA > 0.01) { ctx.save(); ctx.globalAlpha *= lA;
      _d2larf(ctx, 1490, 430, 1.05, { groei: ramp(t, q.at('groeide') + 0.2, q.at('vast') - q.at('groeide') + 0.4), hlBuis: q.on('buis', 1, 0.4) * _d2uit(t, q.at('grootste'), 0.6) + q.on('buis', 2, 0.4) * _d2uit(t, q.at('bestond') + 0.4, 0.5),
        hlStreep: q.on('overgeplante', 1, 0.4) * _d2uit(t, q.at('buren'), 0.5), hlLijf: q.on('buren', 1, 0.4) * _d2uit(t, q.at('heet'), 0.6) });
      metaText(ctx, 'LARFJE', 1490, 280, C.text2, 'center', 26); ctx.restore(); }
    const tw = q.on('tweede', 1, 0.4), ont = q.on('ontvangende', 1, 0.5);
    naamBij(ctx, 'tweede lichaam', null, 1640, 700, tw * (1 - ont), 'center', C.goud);
    naamBij(ctx, 'tweede lichaam', 'vooral cellen van de ontvanger', 1640, 700, ont, 'center', C.goud);
    naamBij(ctx, 'eigen neurale buis', null, 1760, 560, q.on('buis', 1, 0.4) * _d2uit(t, q.at('ontvangende'), 0.5), 'center', C.goud);
    naamBij(ctx, 'cellen van het stukje', null, 1300, 620, q.on('overgeplante', 1, 0.4) * _d2uit(t, q.at('organisator'), 0.5), 'center', C.goud);
  }); },
  s35(ctx, t, q) { _d2run(ctx, 'macro', () => { difLabel(ctx, 'VEREENVOUDIGD');
    const sl = ramp(t, q.at('sluit'), q.at('helemaal') + 0.5 - q.at('sluit')), mis = ramp(t, q.at('mis'), 0.9);
    const d0 = lerp(0.3, 0.03, sl), d1 = lerp(lerp(0.62, 0.955, sl), 0.84, mis);
    const E = _d2embryoRug(ctx, 700, 150, 700, d0, d1);
    const zp = q.on('sluit', 1, 0.3) * _d2uit(t, q.at('helemaal') + 0.6, 0.5);
    pijl(ctx, 700 + E.bocht(0.4) + 190, E.Y(0.4), 700 + E.bocht(d0) + 190, E.Y(d0) + 10, C.goud, zp, 5, 18);
    pijl(ctx, 700 + E.bocht(0.6) + 170, E.Y(0.6), 700 + E.bocht(Math.min(d1, 0.9)) + 170, E.Y(Math.min(d1, 0.9)) - 10, C.goud, zp, 5, 18);
    const op = q.on('open', 1, 0.4); if (op > 0.01) { ctx.save(); ctx.globalAlpha *= op; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(700 + E.bocht(0.9), E.Y(0.9), 70, 62, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'neurale buis', 'sluit als een rits', 920, E.Y(0.45), q.on('neurale', 1, 0.4), 'left', C.text);
    naamBij(ctx, 'blijft open', null, 800, E.Y(0.9) + 10, op * (1 - q.on('rug', 2, 0.4)), 'left', C.goud);
    naamBij(ctx, 'blijft open', 'onderaan: open rug', 800, E.Y(0.9) + 10, q.on('rug', 2, 0.4), 'left', C.goud);
    naamBij(ctx, 'kop', null, 500, E.Y(0.08), ramp(t, 0, 0.6), 'right', C.text);
    // tijdbalk: de stip schuift naar week 4
    const tx0 = 1240, tx1 = 1800, ty = 240; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx0, ty); ctx.lineTo(tx1, ty); ctx.stroke();
    for (let w = 1; w <= 8; w++) { const xx = tx0 + (w - 1) / 7 * (tx1 - tx0); ctx.beginPath(); ctx.moveTo(xx, ty - 10); ctx.lineTo(xx, ty + 10); ctx.stroke(); }
    const wk = lerp(2, 3, ramp(t, q.at('week') - 0.4, 0.8)), xw = tx0 + wk / 7 * (tx1 - tx0); ctx.beginPath(); ctx.arc(xw, ty, 14, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill();
    ctx.save(); ctx.globalAlpha *= q.on('week', 1, 0.4); metaText(ctx, 'WEEK 4', xw, ty - 28, C.goud, 'center', 28); ctx.restore();
    metaText(ctx, 'WEEK 1', tx0, ty + 48, C.text2, 'center', 26); metaText(ctx, 'WEEK 8', tx1, ty + 48, C.text2, 'center', 26);
    metaText(ctx, 'VAN ACHTEREN · ± 4 MM', 1520, 360, C.text2, 'center', 26);
  }); },
  s36(ctx, t, q) { _d2run(ctx, 'macro', () => {
    const dag = lerp(0, 34, (t - q.at('Maar')) / (q.at('zwanger') - q.at('Maar') + 0.4));
    const K = _d2keuken(ctx, t, { dag, sluit: q.on('sluit', 1, 0.4), test: q.on('weet', 1, 0.4), start: q.on('begin', 1, 0.5), tablet: q.on('begin', 1, 0.4), uit: t > q.at('weet') && t < q.at('Daarom') ? 'verbaasd' : 'blij' });
    const fz = q.on('Foliumzuur', 1, 0.4); if (fz > 0.01) { ctx.save(); ctx.globalAlpha *= fz * (_d2uit(t, q.at('kans') + 0.6, 0.5) + q.on('foliumzuur', 2, 0.4)); ctx.beginPath(); ctx.arc(K.pot[0], K.pot[1] - 4, 74, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'foliumzuur', null, K.pot[0], 760, fz * (1 - q.on('vitamine', 1, 0.4)), 'center', C.text);
    naamBij(ctx, 'foliumzuur', 'B-vitamine', K.pot[0], 760, q.on('vitamine', 1, 0.4), 'center', C.text);
  }); },
  s37(ctx, t, q) { _d2run(ctx, 'micro', () => { const { cx, y0 } = _D2;
    const R = _d2sectie(ctx, cx, y0, 1, { thP: 74, g: 1, hlChorda: q.on('chorda', 1, 0.4) });
    const s = q.on('signaalstoffen', 1, 0.5), sh = q.on('Sonic', 1, 0.4), pu = 1 + 0.25 * Math.max(0, Math.sin(t * 5)) * q.on('tegen', 1, 0.3);
    _d2stroom(ctx, cx + 50, R.chorda.y - 10, cx + 360, R.chorda.y - 170, 22, 120, 77, t, { col: C.text2, r: 6, a: s });
    _d2stroom(ctx, cx - 50, R.chorda.y + 10, cx - 340, R.chorda.y - 130, 20, 140, 177, t, { col: C.text2, r: 6, a: s });
    _d2stroom(ctx, cx, R.chorda.y - 40, cx, R.plaatOnder - 6, 30, 120, 11, t, { col: C.text2, r: 7, a: s * (1 - sh) });
    _d2stroom(ctx, cx, R.chorda.y - 40, cx, R.plaatOnder - 6, 30, 120, 11, t, { col: C.goud, r: 7 * pu, a: sh });
    naamBij(ctx, 'signaalstoffen', null, cx + 380, R.chorda.y - 190, s * (1 - sh), 'left', C.text2);
    naamBij(ctx, 'Sonic hedgehog', 'signaalstof van de chorda', cx + 70, R.chorda.y + 40, sh, 'left', C.goud);
    naamBij(ctx, 'chorda', null, cx - 55, R.chorda.y + 12, 1, 'right', C.text);
    naamBij(ctx, 'neurale buis', null, cx - R.buis.r - 30, R.buis.y - 20, 1, 'right', C.text);
  }); },
  // ===================== 5 HOEVEEL SIGNAAL? =====================
  s38(ctx, t, q) { _d2run(ctx, 'schema', () => {
    metaText(ctx, 'WEEK 5', W - 80, 78, C.goud, 'right', 26);
    embryoEcht(ctx, 380, 560, 1.15, { a: ramp(t, 0, 0.6) });
    // aan of uit → hoeveel
    const au = q.on('aan', 1, 0.4), hv = q.on('hoeveelheid', 1, 0.6), N = [16, 11, 7, 4, 1];
    for (let i = 0; i < 5; i++) { const x = 1050 + i * 175, y = 500; const rand = i === 0 || i === 4;
      const n = rand ? (i === 0 ? N[0] : Math.round(lerp(0, 1, hv))) : N[i];
      _d2signaalCel(ctx, x, y, 52, n, t, rand ? au : hv, i * 40); }
    regel(ctx, 'aan', 1050, 660, au * (1 - hv), C.goud, 36, 'center'); regel(ctx, 'uit', 1750, 660, q.on('uit', 1, 0.4) * (1 - hv), C.text2, 36, 'center');
    regel(ctx, 'veel', 1050, 660, q.on('plek', 1, 0.4), C.goud, 36, 'center'); regel(ctx, 'weinig', 1750, 660, q.on('plek', 1, 0.4), C.text2, 36, 'center');
    pijl(ctx, 1110, 720, 1690, 720, C.goud, q.on('verschillen', 1, 0.5), 4, 16);
  }); },
  s39(ctx, t, q) { _d2run(ctx, 'schema', () => {
    metaText(ctx, 'WEEK 5', W - 80, 78, C.goud, 'right', 26);
    const cel = _d2uit(t, 0, 0.6); if (cel > 0.01) { const N = [16, 11, 7, 4, 1]; for (let i = 0; i < 5; i++) _d2signaalCel(ctx, 1050 + i * 175, 500, 52, N[i], t, cel, i * 40);
      regel(ctx, 'veel', 1050, 660, cel, C.goud, 36, 'center'); regel(ctx, 'weinig', 1750, 660, cel, C.text2, 36, 'center'); }
    const e = embryoEcht(ctx, 380, 560, 1.15, {});
    const ar = q.on('arm', 1, 0.4); if (ar > 0.01) { ctx.save(); ctx.globalAlpha *= ar; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(e.arm[0] + 20, e.arm[1] - 20, 58, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    const z = q.on('knop', 1, 0.7), bron = q.on('groepje', 1, 0.5);
    zoomCircle(ctx, 1250, 520, 340, e.arm[0] + 70, e.arm[1] - 30, null, z, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(880, 160, 760, 760); _d2knop(ctx, 1250, 760, 0, { bron: bron * (0.8 + 0.2 * Math.sin(t * 4)), t }); });
    naamBij(ctx, 'armknop', null, 1250, 450, z, 'center', C.text);
    naamBij(ctx, 'pinkkant', null, 1410, 640, q.on('pink', 1, 0.4) * (1 - q.on('Sonic', 1, 0.4)), 'left', C.goud);
    naamBij(ctx, 'pinkkant', 'maakt Sonic hedgehog', 1410, 640, q.on('Sonic', 1, 0.4), 'left', C.goud);
    naamBij(ctx, 'duimkant', null, 1080, 640, q.on('pink', 1, 0.4), 'right', C.text);
  }); },
  s40(ctx, t, q) { _d2run(ctx, 'schema', () => { difLabel(ctx, 'VEREENVOUDIGD');
    const m = ramp(t, 0, 1.2), x = lerp(1250, 900, m), yb = lerp(760, 870, m);
    const oud = 1 - ramp(t, 0, 0.7); if (oud > 0.01) { ctx.save(); ctx.globalAlpha *= oud; embryoEcht(ctx, 380, 560, 1.15, {}); ctx.beginPath(); ctx.arc(1250, 520, 340, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
    const front = lerp(0, 900, ramp(t, q.at('verspreidt') - 0.2, 2.6));
    const K = _d2knop(ctx, x, yb, 0, { front, bereik: 200, t });
    naamBij(ctx, 'bron', null, K.bron[0] + 70, K.bron[1] + 30, q.on('bron', 1, 0.4), 'left', C.goud);
    const ve = q.on('veel', 1, 0.4) * _d2uit(t, q.at('verloop'), 0.5), mi = q.on('minder', 1, 0.4) * _d2uit(t, q.at('verloop'), 0.5);
    naamBij(ctx, 'veel', null, K.bron[0] - 10, K.bron[1] - 70, ve, 'center', C.goud); naamBij(ctx, 'weinig', null, x - 150, yb - 120, mi, 'center', C.text);
    const kr = q.on('verloop', 1, 1.2); _d2kromme(ctx, x - 300, x + 300, 300, 120, (u) => Math.exp(-(1 - u) * 3.2), { titel: 'hoeveelheid signaal', p: kr, vanRechts: true });
    regel(ctx, 'weinig', x - 300, 345, q.on('laag', 1, 0.4), C.text2, 36, 'left'); regel(ctx, 'veel', x + 300, 345, q.on('hoog', 1, 0.4), C.goud, 36, 'right');
    naamBij(ctx, 'gradiënt', 'van hoog naar laag', x + 600, 300, q.on('gradiënt', 1, 0.4), 'left', C.goud);
  }); },
  s41(ctx, t, q) { _d2run(ctx, 'schema', () => { difLabel(ctx, 'VEREENVOUDIGD');
    const x = 900, yb = 870, f = ramp(t, q.at('groeit') - 0.3, 1.4);
    const pink = ramp(t, q.at('pink') - 0.3, 0.9), midd = (i) => ramp(t, q.at('middelste') - 0.6 + i * 0.2, 0.9);
    const st = [midd(3), midd(0), midd(1), midd(2), pink], hlP = q.on('pink', 1, 0.4) * _d2uit(t, q.at('Cellen', 2), 0.6), hlM = q.on('middelste', 1, 0.4) * _d2uit(t, q.at('Hoeveel'), 0.6);
    const K = _d2knop(ctx, x, yb, f, { front: 900, bereik: 200, t, straal: st, hlStraal: [0, hlM, hlM, hlM, hlP] });
    _d2kromme(ctx, x - 300, x + 300, 300, 120, (u) => Math.exp(-(1 - u) * 3.2), { titel: 'hoeveelheid signaal' });
    const kp = q.on('Hoeveel', 1, 0.3) * _d2uit(t, q.at('hoe', 2) - 0.1, 0.4); if (kp > 0.01) { ctx.save(); ctx.globalAlpha *= kp; roundRect(ctx, x - 320, 160, 640, 160, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    regel(ctx, 'weinig', x - 300, 345, 1, C.text2, 36, 'left'); regel(ctx, 'veel', x + 300, 345, 1, C.goud, 36, 'right');
    naamBij(ctx, 'gradiënt', 'van hoog naar laag', x + 600, 300, _d2uit(t, 0.3, 0.6), 'left', C.goud);
    naamBij(ctx, 'bron', null, K.bron[0] + 70, K.bron[1] + 30, 1, 'left', C.goud);
    // veel en lang: een klokje bij de bron loopt vol
    const kl = q.on('lang', 1, 0.4) * _d2uit(t, q.at('Cellen', 2), 0.5) + q.on('lang', 2, 0.4); klokje(ctx, x + 560, 560, 42, ((t - q.at('lang')) * 0.4) % 1, Math.min(1, kl));
    naamBij(ctx, 'lang', null, x + 620, 570, Math.min(1, kl), 'left', C.goud);
    naamBij(ctx, 'pink', 'veel en lang signaal', K.bron[0] + 70, K.stralen[4][1] - 20, q.on('pink', 1, 0.4), 'left', C.goud);
    naamBij(ctx, 'middelste vingers', 'minder signaal', x, K.K.top - 46, q.on('middelste', 1, 0.4), 'center', C.text);
    naamBij(ctx, 'duim', 'het minst', x - 330, K.stralen[0][1] + 40, q.on('middelste', 1, 0.6), 'right', C.text);
  }); },
  s42(ctx, t, q) { _d2run(ctx, 'schema', () => {
    metaText(ctx, 'KIPPENEMBRYO', W - 80, 78, C.text2, 'right', 26);
    const kA = ramp(t, 0, 0.6); ctx.save(); ctx.globalAlpha *= kA; const k = _w2kipEmbryo(ctx, 360, 520, 1.05); ctx.restore();
    naamBij(ctx, 'kop', null, 160, 360, q.on('kippenembryo', 1, 0.4), 'center', C.text);
    // normale vleugel met drie vingers groeit
    const vs = ['voor', 'midden', 'achter'], vA = ramp(t, q.at('kippenvleugel') - 0.2, 1.4), vgr = ramp(t, q.at('drie') - 0.2, 0.9);
    const hl = [q.on('voorste', 1, 0.3) * _d2uit(t, q.at('middelste'), 0.4), q.on('middelste', 1, 0.3) * _d2uit(t, q.at('achterste'), 0.4), q.on('achterste', 1, 0.3) * _d2uit(t, q.at('bron'), 0.5)];
    const V = _d2vleugel(ctx, 1620, 860, 0.9, vs, { arm: vA, vg: [vgr, vgr, vgr], hl });
    const [a, b, c] = V.tops; regel(ctx, 'voor', a[0] - 18, a[1] + 26, q.on('voorste', 1, 0.4), hl[0] > 0.3 ? C.goud : C.text, 36, 'right'); regel(ctx, 'midden', b[0], b[1] - 18, q.on('middelste', 1, 0.4), hl[1] > 0.3 ? C.goud : C.text, 36, 'center'); regel(ctx, 'achter', c[0] + 18, c[1] + 26, q.on('achterste', 1, 0.4), hl[2] > 0.3 ? C.goud : C.text, 36, 'left');
    ctx.save(); ctx.globalAlpha *= vA; metaText(ctx, 'NORMALE VLEUGEL', 1620, 240, C.text2, 'center', 26); ctx.restore();
    // zoom op de vleugelknop: bron achter; pincet zet een tweede bron (kraal) voor
    const z = q.on('bron', 1, 0.7), pl = ramp(t, q.at('plantten') - 0.2, q.at('voorkant') - q.at('plantten') + 0.6), terug = ramp(t, q.at('voorkant') + 0.5, 0.6);
    zoomCircle(ctx, 960, 480, 270, k.knop[0] + 30, k.knop[1], null, z, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(680, 200, 560, 560);
      const VK = _d2vleugelknop(ctx, 960, 380, 1, { front1: lerp(0, 500, ramp(t, q.at('signaal') - 0.2, 2)), t });
      const doel = VK.voor, start = [doel[0] - 260, doel[1] - 280], kp = [lerp(start[0], doel[0], pl), lerp(start[1], doel[1], pl)];
      if (pl > 0.01) _d2kraal(ctx, kp[0], kp[1], 24, Math.min(1, pl * 4));
      const tp = [lerp(kp[0], start[0], terug), lerp(kp[1], start[1], terug)]; if (pl > 0.01 && terug < 0.99) _w2pincet(ctx, tp[0] - 14, tp[1] - 14, -2.3, 300); });
    naamBij(ctx, 'vleugelknop', null, 960, 800, z, 'center', C.text);
    naamBij(ctx, 'bron', 'achter', 1060, 650, q.on('achter', 2, 0.4), 'left', C.goud);
    naamBij(ctx, 'tweede bron', 'voor', 860, 650, q.on('voorkant', 1, 0.4), 'right', C.goud);
  }); },
  s43(ctx, t, q) { _d2run(ctx, 'schema', () => {
    metaText(ctx, 'KIPPENEMBRYO', W - 80, 78, C.text2, 'right', 26);
    const k = _w2kipEmbryo(ctx, 360, 520, 1.05); naamBij(ctx, 'kop', null, 160, 360, 1, 'center', C.text);
    const vs = ['voor', 'midden', 'achter']; const V = _d2vleugel(ctx, 1620, 860, 0.9, vs, {}); const [a, b, c] = V.tops;
    regel(ctx, 'voor', a[0] - 18, a[1] + 26, 1, C.text, 36, 'right'); regel(ctx, 'midden', b[0], b[1] - 18, 1, C.text, 36, 'center'); regel(ctx, 'achter', c[0] + 18, c[1] + 26, 1, C.text, 36, 'left');
    metaText(ctx, 'NORMALE VLEUGEL', 1620, 240, C.text2, 'center', 26);
    zoomCircle(ctx, 960, 480, 270, k.knop[0] + 30, k.knop[1], null, 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(680, 200, 560, 560);
      const VK = _d2vleugelknop(ctx, 960, 380, 1, { front1: 500, t }); _d2kraal(ctx, VK.voor[0], VK.voor[1], 24, 1); });
    naamBij(ctx, 'vleugelknop', null, 960, 800, 1, 'center', C.text);
    naamBij(ctx, 'bron', 'achter', 1060, 650, 1, 'left', C.goud); naamBij(ctx, 'tweede bron', 'voor', 860, 650, 1, 'right', C.goud);
    vraagteken(ctx, 1330, 520, q.on('denk', 1, 0.4), 140);
  }); },
  s45(ctx, t, q) { _d2run(ctx, 'schema', () => { difLabel(ctx, 'VEREENVOUDIGD');
    // de knop met twee bronnen groeit uit tot een vleugel met zes vingers
    const gr = ramp(t, q.at('groeiden'), 1.0), vg = ramp(t, q.at('extra') - 0.2, 1.2), knA = 1 - ramp(t, q.at('groeiden') + 0.3, 1.0);
    if (knA > 0.01) { ctx.save(); ctx.globalAlpha *= knA; const VK = _d2vleugelknop(ctx, 1000, 260, 0.9, { front1: 500, front2: 500, t }); _d2kraal(ctx, VK.voor[0], VK.voor[1], 22, 1); ctx.restore(); }
    const vs = ['achter', 'midden', 'voor', 'voor', 'midden', 'achter'], woorden = [['achter', 1], ['midden', 1], ['voor', 1], ['voor', 2], ['midden', 2], ['achter', 2]];
    const hl = woorden.map(([w, n]) => q.on(w, n, 0.3) * _d2uit(t, q.at(w, n) + 0.7, 0.5));
    const V = _d2vleugel(ctx, 1000, 860, 0.9, vs, { arm: gr, vg: vs.map(() => vg), hl });
    vs.forEach((v, i) => regel(ctx, v, V.tops[i][0], V.tops[i][1] - 22, q.on(woorden[i][0], woorden[i][1], 0.4), v === 'achter' ? C.goud : C.text, 34, 'center'));
    const xb = V.tops[5][0];
    naamBij(ctx, 'zes vingers', 'in spiegelbeeld', xb + 90, 620, q.on('spiegelbeeld', 1, 0.5), 'left', C.goud);
    const n3 = q.on('drie', 1, 0.5); _d2vleugel(ctx, 250, 860, 0.6, ['voor', 'midden', 'achter'], { arm: n3, vg: [n3, n3, n3] });
    ctx.save(); ctx.globalAlpha *= n3; metaText(ctx, 'NORMAAL: 3', 250, 470, C.text2, 'center', 26); ctx.restore();
  }); },
  s46(ctx, t, q) { _d2run(ctx, 'schema', () => { difLabel(ctx, 'VEREENVOUDIGD');
    const vs = ['achter', 'midden', 'voor', 'voor', 'midden', 'achter'];
    // genen aan: per vinger licht de plek kort op, van buiten naar binnen; patroon: alles samen
    const gen = (i) => { const k = Math.min(i, 5 - i); return ramp(t, q.at('genen') - 0.3 + k * 0.3, 0.3) * _d2uit(t, q.at('genen') + 0.4 + k * 0.3, 0.5); };
    const pat = q.on('patroon', 1, 0.3) * _d2uit(t, q.at('zonder'), 0.5);
    const V = _d2vleugel(ctx, 1000, 860, 0.9, vs, { hl: vs.map((v, i) => Math.max(gen(i), pat)) });
    const xa = V.tops[0][0], xb = V.tops[5][0];
    _d2kromme(ctx, xa - 30, xb + 30, 240, 100, (u) => 0.08 + Math.exp(-u * 4) + Math.exp(-(1 - u) * 4), { titel: 'hoeveelheid signaal', p: q.on('hoeveelheid', 1, 1.0) });
    vs.forEach((v, i) => regel(ctx, v, V.tops[i][0], V.tops[i][1] - 22, 1, v === 'achter' ? C.goud : C.text, 34, 'center'));
    naamBij(ctx, 'zes vingers', 'in spiegelbeeld', xb + 90, 620, _d2uit(t, q.at('hoeveelheid'), 0.5), 'left', C.goud);
    naamBij(ctx, 'bron', null, xb + 60, 250, q.on('signaal', 1, 0.4), 'left', C.goud); naamBij(ctx, 'tweede bron', null, xa - 60, 250, q.on('signaal', 1, 0.4), 'right', C.goud);
    _d2vleugel(ctx, 250, 860, 0.6, ['voor', 'midden', 'achter'], {}); metaText(ctx, 'NORMAAL: 3', 250, 470, C.text2, 'center', 26);
    // geen tekening: een vel met een handschets wordt doorgestreept
    const tk = q.on('tekening', 1, 0.4); if (tk > 0.01) { ctx.save(); ctx.globalAlpha *= tk; ctx.translate(1660, 520); ctx.rotate(0.06); roundRect(ctx, -110, -140, 220, 280, 10); shape(ctx, '#EEF0F2', '#9AA3B2', 2);
      ctx.strokeStyle = '#5E6878'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 110); ctx.lineTo(-20, 20); ctx.moveTo(20, 110); ctx.lineTo(20, 20); for (let i = 0; i < 4; i++) { const xx = -45 + i * 30; ctx.moveTo(xx * 0.6, 20); ctx.lineTo(xx, -90 + (i === 0 || i === 3 ? 30 : 0)); } ctx.stroke(); ctx.restore();
      kruis(ctx, 1660, 520, 90, ramp(t, q.at('tekening') + 0.2, 0.3), C.koraal); }
  }); },
});

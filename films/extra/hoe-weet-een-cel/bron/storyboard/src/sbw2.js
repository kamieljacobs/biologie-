// sbw2.js — storyboard 'Hoe weet een cel wat hij moet worden?', tekenaar 2: w20–w31 (4 De eerste buis, 5 Hoeveel signaal?)
// Nieuwe objecten (voorstel): _w2sectie (dwarsdoorsnede plaat → buis), _w2gastrula, _w2larf (salamander, tweede as),
// _w2embryoRug (embryo ± 4 weken van achteren), _w2armknop / _w2handplaat (Shh-gradiënt), _w2kipEmbryo, _w2vleugelknop, _w2vleugel (skelet).

function _w2bg(ctx, col) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); }
const _W2HUID = '#EDB9A4', _W2RAND = '#B97A6C';
function _w2hash(i) { return hash(i * 1.37 + 0.11); }

// ---------- band van cellen langs een middellijn ----------
// pts = [{x,y,th}], gesloten = ring. Tekent celwanden dwars op de band en een kern per cel.
function _w2band(ctx, pts, col, o = {}) {
  const n = pts.length, ring = !!o.ring, N = [];
  for (let i = 0; i < n; i++) { const a = pts[ring ? (i - 1 + n) % n : Math.max(0, i - 1)], b = pts[ring ? (i + 1) % n : Math.min(n - 1, i + 1)];
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1; N.push([-dy / L, dx / L]); }
  const buiten = pts.map((p, i) => [p.x + N[i][0] * p.th / 2, p.y + N[i][1] * p.th / 2]), binnen = pts.map((p, i) => [p.x - N[i][0] * p.th / 2, p.y - N[i][1] * p.th / 2]);
  ctx.save(); ctx.beginPath();
  if (ring) { buiten.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); binnen.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fillStyle = _mixHex(col, C.bgMicro, o.donker ?? 0.45); ctx.fill('evenodd'); }
  else { buiten.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let i = n - 1; i >= 0; i--) ctx.lineTo(binnen[i][0], binnen[i][1]); ctx.closePath(); ctx.fillStyle = _mixHex(col, C.bgMicro, o.donker ?? 0.45); ctx.fill(); }
  // celwanden
  const stap = o.stap || 28; let acc = 0, vorige = null; const wanden = [];
  for (let i = 0; i < n; i++) { if (i) acc += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); if (vorige == null || acc - vorige >= stap) { wanden.push(i); vorige = acc; } }
  ctx.strokeStyle = rgba(col, 0.75); ctx.lineWidth = 1.6;
  wanden.forEach(i => { ctx.beginPath(); ctx.moveTo(buiten[i][0], buiten[i][1]); ctx.lineTo(binnen[i][0], binnen[i][1]); ctx.stroke(); });
  ctx.fillStyle = _mixHex(col, '#0B1018', 0.35);
  for (let k = 0; k < wanden.length - (ring ? 0 : 1); k++) { const i0 = wanden[k], i1 = wanden[(k + 1) % wanden.length], im = ring && i1 < i0 ? Math.floor((i0 + i1 + n) / 2) % n : Math.floor((i0 + i1) / 2);
    const p = pts[im]; ctx.beginPath(); ctx.ellipse(p.x, p.y, Math.min(9, p.th * 0.2), Math.min(p.th * 0.28, 16), Math.atan2(N[im][1], N[im][0]), 0, 6.283); ctx.fill(); }
  // omtrek
  ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); buiten.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); if (ring) ctx.closePath(); ctx.stroke();
  ctx.beginPath(); binnen.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); if (ring) ctx.closePath(); ctx.stroke();
  ctx.restore(); return { buiten, binnen, wanden };
}

// ---------- dwarsdoorsnede: neurale plaat (f=0) → groef → buis (f=1) ----------
function _w2sectie(ctx, cx, y0, f, o = {}) {
  const L = o.L || 620, a = 210, thS = o.thS || 40, thP = 74; let yEndo = y0 + 340;
  const R = { cx, y0 }; const mid = [];
  if (f >= 1) {
    for (let i = 0; i <= 80; i++) mid.push({ x: cx - L + 2 * L * i / 80, y: y0, th: thS });
    const Rt = a / Math.PI + 6, ty = y0 + thS / 2 + 16 + Rt + thP / 2; const ring = [];
    for (let i = 0; i < 72; i++) { const p = i / 72 * 6.283; ring.push({ x: cx + Math.cos(p) * Rt, y: ty + Math.sin(p) * Rt, th: thP * 0.9 }); }
    R.buis = { x: cx, y: ty, r: Rt + thP * 0.45 }; R.plaatOnder = ty + Rt + thP * 0.45; R.ring = ring;
  } else {
    const th = Math.max(f * Math.PI, 1e-3), Rr = a / th, lift = 90 * f, yE = y0 - lift, yb = yE + Rr * (1 - Math.cos(th));
    const P = (ph) => ({ x: cx + Rr * Math.sin(ph), y: yb - Rr * (1 - Math.cos(ph)) });
    const EL = P(-th), ER = P(th), k = 70 + 60 * f;
    const bez = (p0, c1, c2, p3, n, omk) => { const out = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0], y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1]; const w = smooth(t); out.push({ x, y, th: thS + (thP - thS) * (omk ? 1 - w : w) }); } return out; };
    const smooth = (t) => { const s = clamp((t - 0.75) / 0.25, 0, 1); return s * s * (3 - 2 * s); };
    const links = bez([cx - L, y0], [cx - L + (EL.x - cx + L) * 0.55, y0], [EL.x - k * Math.cos(th), EL.y - k * Math.sin(th)], [EL.x, EL.y], 40, false);
    mid.push(...links);
    for (let i = 1; i < 60; i++) { const ph = -th + 2 * th * i / 60; const p = P(ph); mid.push({ x: p.x, y: p.y, th: thP }); }
    const rechts = bez([ER.x, ER.y], [ER.x + k * Math.cos(th), ER.y - k * Math.sin(th)], [cx + L - (cx + L - ER.x) * 0.55, y0], [cx + L, y0], 40, true);
    mid.push(...rechts);
    R.plaatOnder = yb + thP / 2; R.plaatBoven = yb - thP / 2; R.yb = yb; R.EL = EL; R.ER = ER;
  }
  // mesoderm: somieten (dichte clusters) naast de middellijn + losse cellen opzij
  const meso = (x, y, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = _w2hash(seed + i) * 6.283, rr = Math.sqrt(_w2hash(seed + i + 50)); const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry * rr; ctx.beginPath(); ctx.arc(px, py, 13, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgMicro, 0.45), KB.meso, 1.6); ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 6.283); ctx.fillStyle = _mixHex(KB.meso, '#0B1018', 0.4); ctx.fill(); } };
  const chY = R.plaatOnder + 72; yEndo = Math.max(yEndo, chY + 90); const my = f >= 1 ? R.buis.y + 105 : y0 + 175;
  if (o.meso !== false) for (const s of [-1, 1]) { meso(cx + s * 270, my, 105, f >= 1 ? 45 : 75, 34, s > 0 ? 10 : 200); meso(cx + s * 480, my + 30, 95, 40, 16, s > 0 ? 400 : 600); }
  // endoderm
  if (o.endo !== false) { const e = []; for (let i = 0; i <= 80; i++) e.push({ x: cx - L + 2 * L * i / 80, y: yEndo, th: 26 }); _w2band(ctx, e, KB.endo, { stap: 34 }); }
  // chorda (staafje in doorsnede = rond)
  R.chorda = { x: cx, y: chY, r: 40 };
  if (o.chorda !== false) { ctx.beginPath(); ctx.arc(cx, chY, 40, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgMicro, 0.3), KB.meso, 3);
    for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.3; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * 20, chY + Math.sin(an) * 20, 8, 0, 6.283); ctx.strokeStyle = rgba(KB.meso, 0.8); ctx.lineWidth = 1.4; ctx.stroke(); } }
  // ectoderm (+ plaat) en buis
  R.ecto = _w2band(ctx, mid, KB.ecto, { stap: 30 });
  if (R.ring) _w2band(ctx, R.ring, KB.ecto, { ring: true, stap: 24, donker: 0.35 });
  R.yEndo = yEndo; return R;
}

// goudstipjes (signaal) in een wolk tussen bron en doel
function _w2stipjes(ctx, x0, y0, x1, y1, n, breed, seed, col = C.goud, r = 7) {
  for (let i = 0; i < n; i++) { const t = _w2hash(seed + i), sp = (_w2hash(seed + i + 99) - 0.5) * breed * (0.35 + t);
    const x = x0 + (x1 - x0) * t + sp, y = y0 + (y1 - y0) * t; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = col; ctx.fill(); }
}

// ---------- salamander: gastrula en larfje ----------
function _w2gastrula(ctx, x, y, r, o = {}) { // bol, oermond-lip als sikkel rechtsonder (o.lip = hoek)
  const dier = o.pigment ? '#5E4C40' : '#E6DBC2', plant = o.pigment ? '#B79C74' : '#F1E8D4', lijn = o.pigment ? '#3A2E26' : '#A8987A';
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = dier; ctx.fill(); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x, y + r * 0.95, r * 1.1, r * 0.6, 0, 0, 6.283); ctx.fillStyle = plant; ctx.fill();
  // cellen: zacht raster van cirkeltjes
  ctx.strokeStyle = rgba(lijn, 0.35); ctx.lineWidth = 1.2; for (let gx = -r; gx <= r; gx += r * 0.2) for (let gy = -r; gy <= r; gy += r * 0.2) { const ox = ((Math.round(gy / (r * 0.2)) & 1) ? r * 0.1 : 0); ctx.beginPath(); ctx.arc(x + gx + ox, y + gy, r * 0.09, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = lijn; ctx.lineWidth = 3; ctx.stroke();
  // oermond (lip) als sikkelvormige groef
  const an = o.lip ?? 1.9; const lx = x + Math.cos(an) * r * 0.62, ly = y + Math.sin(an) * r * 0.62;
  ctx.save(); ctx.translate(lx, ly); ctx.rotate(an - Math.PI / 2); ctx.strokeStyle = '#2A201A'; ctx.lineWidth = r * 0.07; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, r * 0.35, r * 0.42, -Math.PI * 0.78, -Math.PI * 0.22); ctx.stroke(); ctx.restore();
  return { lip: [lx, ly] };
}
function _w2larf(ctx, x, y, s, o = {}) { // salamanderlarfje (staartknopstadium), kop links; o.tweede = tweede as aan de buikkant
  const rug = '#5E4C40', buik = '#B79C74', lijn = '#2E241E', licht = '#EDE3CC';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // vinzoom (rug + staart)
  ctx.beginPath(); bioPad(ctx, [[-60, -78], [60, -84], [200, -64], [300, -22], [338, 6], [300, 22], [210, 18]], false); ctx.lineTo(-60, -40); ctx.closePath(); ctx.fillStyle = rgba('#C9BBA0', 0.55); ctx.fill(); ctx.strokeStyle = rgba(lijn, 0.6); ctx.lineWidth = 2; ctx.stroke();
  // tweede as (achter de buik getekend, steekt naar onder-rechts uit)
  if (o.tweede) { ctx.save(); ctx.translate(40, 70); ctx.rotate(0.55);
    ctx.beginPath(); bioPad(ctx, [[-70, -20], [20, -30], [120, -22], [200, -6], [236, 6], [200, 20], [110, 34], [10, 40], [-60, 30]], true); ctx.fillStyle = rug; ctx.fill(); ctx.strokeStyle = lijn; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); bioPad(ctx, [[0, -28], [100, -40], [190, -22], [236, 4]], false); ctx.strokeStyle = rgba('#C9BBA0', 0.8); ctx.lineWidth = 9; ctx.stroke(); // eigen vinzoom/neurale buis
    ctx.beginPath(); ctx.moveTo(-30, 6); ctx.bezierCurveTo(60, 2, 140, 4, 214, 8); ctx.strokeStyle = licht; ctx.lineWidth = 7; ctx.stroke(); // smal licht streepje: cellen van het stukje
    ctx.restore(); }
  // lijf
  ctx.beginPath(); bioPad(ctx, [[-250, -10], [-230, -52], [-170, -70], [-60, -66], [80, -64], [210, -44], [300, -10], [320, 6], [290, 14], [200, 22], [100, 44], [0, 74], [-110, 70], [-200, 48], [-246, 22]], true);
  ctx.fillStyle = rug; ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.ellipse(-20, 70, 190, 70, 0, 0, 6.283); ctx.fillStyle = buik; ctx.fill(); ctx.restore(); // dooierbuik
  ctx.strokeStyle = lijn; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, [[-250, -10], [-230, -52], [-170, -70], [-60, -66], [80, -64], [210, -44], [300, -10], [320, 6], [290, 14], [200, 22], [100, 44], [0, 74], [-110, 70], [-200, 48], [-246, 22]], true); ctx.stroke();
  // somieten
  ctx.strokeStyle = rgba('#2A201A', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const sx = -110 + i * 26; ctx.beginPath(); ctx.moveTo(sx, -50 + i * 1.2); ctx.quadraticCurveTo(sx + 8, -30, sx, -12 + i * 1.5); ctx.stroke(); }
  // oog, kieuwknoppen, balanceerder
  ctx.beginPath(); ctx.arc(-205, -24, 15, 0, 6.283); ctx.fillStyle = '#1A1410'; ctx.fill(); ctx.beginPath(); ctx.arc(-200, -29, 4, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-150 + i * 16, -6 + i * 4, 9, 14, 0.3, 0, 6.283); ctx.fillStyle = _mixHex(rug, '#000000', 0.2); ctx.fill(); }
  ctx.restore();
}

// ---------- embryo ± 4 weken, van achteren (rugzijde) ----------
// o.dicht = [u0,u1] deel van de buis dat dicht is; o.openOnder = laat onderaan een stukje open (gestippeld)
function _w2embryoRug(ctx, x, top, Hh, o = {}) {
  const breed = (u) => { if (u < 0.22) return 150 + 25 * Math.sin(u / 0.22 * Math.PI); if (u < 0.32) return lerp(150, 112, (u - 0.22) / 0.1); if (u < 0.74) return 112 + 8 * Math.sin((u - 0.32) / 0.42 * Math.PI); return lerp(112, 14, ((u - 0.74) / 0.26) ** 1.2); };
  const N = 60, Y = (u) => top + u * Hh, bocht = (u) => Math.sin(u * Math.PI * 1.1) * 18;
  const omtrek = []; for (let i = 0; i <= N; i++) { const u = i / N; omtrek.push([x + bocht(u) + breed(u), Y(u)]); } for (let i = N; i >= 0; i--) { const u = i / N; omtrek.push([x + bocht(u) - breed(u), Y(u)]); }
  ctx.save(); ctx.beginPath(); omtrek.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, _W2HUID, _W2RAND, 3);
  // somieten (paren)
  for (let i = 0; i < 15; i++) { const u = 0.33 + i * 0.027; const yy = Y(u), mx = x + bocht(u); for (const s of [-1, 1]) { roundRect(ctx, mx + s * 40 - (s < 0 ? 44 : 0), yy - 9, 44, 18, 8); shape(ctx, '#E3A08C', _W2RAND, 1.5); } }
  // neurale buis: open (groef) en dicht (naad)
  const [d0, d1] = o.dicht || [0.25, 0.8]; const groef = (u) => u < d0 ? lerp(70, 6, ((u) / d0) ** 2.2) * (u < 0.04 ? u / 0.04 : 1) : (u > d1 ? 22 * Math.sin(clamp((u - d1) / (0.96 - d1), 0, 1) * Math.PI) ** 0.6 : 0);
  // vouwen (richels)
  const kant = (s) => { const P = []; for (let i = 0; i <= 120; i++) { const u = 0.02 + i / 120 * 0.94; P.push([x + bocht(u) + s * (groef(u) + 16), Y(u)]); } return P; };
  for (const s of [-1, 1]) { const P = kant(s); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#F7D3C3'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = _W2RAND; ctx.lineWidth = 2; ctx.stroke(); }
  // open groef: neuraal weefsel (teal) zichtbaar
  for (const [ua, ub] of [[0.02, d0], [d1, 0.96]]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = ua + (ub - ua) * i / 40; ctx.lineTo(x + bocht(u) + groef(u), Y(u)); } for (let i = 40; i >= 0; i--) { const u = ua + (ub - ua) * i / 40; ctx.lineTo(x + bocht(u) - groef(u), Y(u)); } ctx.closePath(); ctx.fillStyle = _mixHex(KB.ecto, '#121A26', 0.25); ctx.fill(); }
  // dichte deel: naad en buis die er net onder schemert
  ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = d0 + (d1 - d0) * i / 40; ctx.lineTo(x + bocht(u), Y(u)); } ctx.strokeStyle = _W2RAND; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
  return { Y, bocht, x, groef, d0, d1, breed };
}

// ---------- ledemaatknop met Shh-bron (mens) ----------
// opwaarts groeiende knop vanaf de lichaamswand (y = yb); voorkant (duim) links, achterkant (pink) rechts
function _w2knopPad(ctx, x, yb, f) { // f = 0 knop (koepel), 1 handplaat (peddel met smalle hals)
  const hw = lerp(210, 120, f), top = lerp(250, 470, f), pw = lerp(210, 260, f), sch = f > 0.5 ? 0.55 : 0.0;
  ctx.beginPath(); ctx.moveTo(x - 340, yb); ctx.lineTo(x - hw - 40, yb);
  ctx.bezierCurveTo(x - hw, yb - 10, x - hw, yb - top * sch * 0.6, x - pw, yb - top * Math.max(sch, 0.05));
  ctx.bezierCurveTo(x - pw, yb - top * 0.95, x - pw * 0.55, yb - top, x, yb - top);
  ctx.bezierCurveTo(x + pw * 0.55, yb - top, x + pw, yb - top * 0.95, x + pw, yb - top * Math.max(sch, 0.05));
  ctx.bezierCurveTo(x + hw, yb - top * sch * 0.6, x + hw, yb - 10, x + hw + 40, yb); ctx.lineTo(x + 340, yb); ctx.lineTo(x + 340, yb + 40); ctx.lineTo(x - 340, yb + 40); ctx.closePath();
  return { top: yb - top, pw, hw, topH: top };
}
function _w2knop(ctx, x, yb, f, o = {}) {
  ctx.save(); const K = _w2knopPad(ctx, x, yb, f); ctx.fillStyle = _W2HUID; ctx.fill(); ctx.strokeStyle = _W2RAND; ctx.lineWidth = 3; ctx.stroke(); ctx.clip();
  // rand ectoderm (dun lichter randje)
  _w2knopPad(ctx, x, yb, f); ctx.strokeStyle = '#F7D3C3'; ctx.lineWidth = 14; ctx.stroke();
  // vingerstralen (alleen in de handplaat)
  const stralen = [];
  if (f > 0.5) { for (let i = 0; i < 5; i++) { const bx = x + (i - 2) * 30, by = yb - K.topH * 0.5, ex = x + (i - 2) * 88, ey = yb - K.topH * (i === 0 ? 0.76 : (i === 4 ? 0.82 : (i === 2 ? 0.93 : 0.9)));
      ctx.strokeStyle = rgba('#B97A6C', 0.75); ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke(); stralen.push([ex, ey]); } }
  // signaal: gradiënt van goudstipjes vanaf de bron (achterkant = rechts)
  const bx = x + K.pw * 0.86, by = yb - K.topH * (f > 0.5 ? 0.66 : 0.4);
  if (o.gradient) for (let i = 0; i < 520; i++) { const px = x - 360 + _w2hash(i * 3 + 1) * 720, py = yb - _w2hash(i * 3 + 2) * K.topH; const d = Math.hypot(px - bx, (py - by) * 0.7);
    if (_w2hash(i * 3 + 7) < Math.exp(-d / (o.bereik || 170))) { ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); } }
  ctx.restore();
  // bron: groepje cellen aan de pinkkant
  const B = [bx, by]; if (o.bron !== false) { for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283, rr = i ? 26 : 0; ctx.beginPath(); ctx.arc(bx - 14 + Math.cos(an) * rr, by + Math.sin(an) * rr * 1.2, 14, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), '#8A6510', 2); } }
  return { K, bron: B, stralen };
}

// ---------- kip: embryo (dag ± 4, zijaanzicht, kop links) en vleugelknop ----------
function _w2kipEmbryo(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#F0D2BC', rand = '#B98A72';
  const lijf = [[-250, -10], [-238, -100], [-180, -160], [-90, -176], [10, -168], [110, -140], [200, -86], [244, -6], [238, 80], [196, 150], [130, 186], [60, 184], [20, 150], [60, 126], [120, 110], [150, 60], [140, 0], [90, -30], [20, -36], [-50, 0], [-80, 70], [-130, 110], [-200, 100], [-244, 56]];
  ctx.beginPath(); ctx.ellipse(116, 62, 42, 36, 0.4, 0, 6.283); shape(ctx, huid, rand, 2.5); // vleugelknop (bult op de flank)
  ctx.beginPath(); ctx.ellipse(196, 166, 38, 28, -0.5, 0, 6.283); shape(ctx, huid, rand, 2.5); // pootknop
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, huid, rand, 3);
  // somieten langs de rug
  for (let i = 0; i < 16; i++) { const an = -2.2 + i * 0.16, rx = 200, ry = 140; const px = 10 + Math.cos(an) * rx * 0.86, py = 10 + Math.sin(an) * ry * 0.86; ctx.beginPath(); ctx.ellipse(px, py, 10, 14, an, 0, 6.283); shape(ctx, '#E8B9A0', rand, 1.2); }
  // hart (bult onder de kop)
  ctx.beginPath(); ctx.ellipse(-60, 60, 46, 40, 0.3, 0, 6.283); shape(ctx, '#D98A7A', '#A85A4E', 2.5);
  // oog
  ctx.beginPath(); ctx.arc(-170, -40, 46, 0, 6.283); shape(ctx, '#3A2E2A', '#241C18', 2); ctx.beginPath(); ctx.arc(-170, -40, 24, 0, 6.283); ctx.fillStyle = '#1A1412'; ctx.fill();
  ctx.restore(); return { knop: [x + 128 * s, y + 76 * s] };
}
// vleugelknop vergroot: lichaamswand boven (y0), knop wijst omlaag; voor = links (naar de kop), achter = rechts
function _w2vleugelknop(ctx, x, y0, s, o = {}) {
  ctx.save(); ctx.translate(x, y0); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-300, -60); ctx.lineTo(300, -60); ctx.lineTo(300, 0); ctx.lineTo(170, 0); ctx.bezierCurveTo(160, 120, 150, 230, 0, 240); ctx.bezierCurveTo(-150, 230, -160, 120, -170, 0); ctx.lineTo(-300, 0); ctx.closePath();
  shape(ctx, '#F0D2BC', '#B98A72', 3);
  const bronnen = [[118, 120]]; if (o.tweede) bronnen.push([-118, 120]);
  if (o.gradient) { ctx.save(); ctx.clip(); for (let i = 0; i < 360; i++) { const px = -300 + _w2hash(i * 5 + 3) * 600, py = -60 + _w2hash(i * 5 + 4) * 300; const d = Math.min(...bronnen.map(b => Math.hypot(px - b[0], py - b[1])));
      if (_w2hash(i * 5 + 9) < Math.exp(-d / 110)) { ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); } } ctx.restore(); }
  bronnen.forEach(([bx, by], k) => { if (k === 0 && o.bron === false) return; if (k === 1 && o.kraal) { ctx.beginPath(); ctx.arc(bx, by, 24, 0, 6.283); shape(ctx, rgba(C.goud, 0.9), '#8A6510', 2.5); return; }
    for (let i = 0; i < 7; i++) { const an = i / 7 * 6.283, rr = i ? 20 : 0; ctx.beginPath(); ctx.arc(bx + Math.cos(an) * rr, by + Math.sin(an) * rr, 12, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), '#8A6510', 2); } });
  ctx.restore();
  return { voor: [x - 118 * s, y0 + 120 * s], achter: [x + 118 * s, y0 + 120 * s], punt: [x, y0 + 240 * s] };
}
function _w2pincet(ctx, x, y, an, L) { // punt op (x,y), steel in richting an
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round';
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(4, s * 3); ctx.lineTo(L * 0.6, s * 14); ctx.lineTo(L, s * 10); ctx.strokeStyle = '#7A8496'; ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore();
}

// ---------- vleugelskelet (kip): opper-, onderarm, pols, vingers ----------
// vingers = lijst 'voor'|'midden'|'achter' van links naar rechts; x,y = schouder (onder), groeit omhoog
const _W2VINGER = { voor: { mc: 52, ph: [34, 20], w: 12 }, midden: { mc: 112, ph: [52, 30], w: 16 }, achter: { mc: 92, ph: [24], w: 9 } };
function _w2bot(ctx, x1, y1, x2, y2, w) {
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#9C8E72'; ctx.lineWidth = w + 5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.strokeStyle = '#EDE4CC'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}
function _w2vleugel(ctx, x, y, s, vingers, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const n = vingers.length, breed = n > 3;
  _w2bot(ctx, 0, 0, 0, -170, 24); // opperarm
  _w2bot(ctx, -14, -186, -22 - (breed ? 40 : 0), -340, 12); _w2bot(ctx, 14, -186, 22 + (breed ? 40 : 0), -340, 17); // spaakbeen, ellepijp
  const pw = breed ? (n - 1) * 134 + 40 : 90; roundRect(ctx, -pw / 2 - 10, -362, pw + 20, 26, 12); shape(ctx, '#EDE4CC', '#9C8E72', 2.5); // pols
  const tops = [];
  vingers.forEach((v, i) => { const V = _W2VINGER[v], gap = breed ? 134 : 46, bx = (i - (n - 1) / 2) * gap, an = (i - (n - 1) / 2) * (breed ? 0.04 : 0.12);
    let px = bx, py = -366; const seg = [V.mc, ...V.ph];
    seg.forEach((L, k) => { const ex = px + Math.sin(an) * L, ey = py - Math.cos(an) * L; _w2bot(ctx, px, py - (k ? 4 : 0), ex, ey, V.w * (k ? 0.85 : 1)); px = ex; py = ey - 6; });
    tops.push([x + px * s, y + py * s]); });
  ctx.restore(); return { tops };
}
function _w2vleugelLabels(ctx, V, vingers, y, col = C.text) { // bij 3 vingers versprongen naast de toppen, anders één rij
  if (vingers.length === 3) { const [a, b, c] = V.tops; text(ctx, vingers[0], a[0] - 18, a[1] + 26, fTekst(36, 600), col, 'right'); text(ctx, vingers[1], b[0], b[1] - 18, fTekst(36, 600), col, 'center'); text(ctx, vingers[2], c[0] + 18, c[1] + 26, fTekst(36, 600), col, 'left'); return; }
  vingers.forEach((v, i) => text(ctx, v, V.tops[i][0], y, fTekst(36, 600), col, 'center')); }

// ---------- signaalkromme in een assenvak ----------
function _w2kromme(ctx, x0, x1, yb, h, fn, o = {}) {
  ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, yb - h - 10); ctx.lineTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 100; i++) { const u = i / 100; const xx = x0 + (x1 - x0) * u, yy = yb - fn(u) * h; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.lineTo(x1, yb); ctx.lineTo(x0, yb); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.14); ctx.fill();
  if (o.titel) metaText(ctx, o.titel, x0, yb - h - 26, C.text2, 'left', 26);
  ctx.restore();
}

const SBW2 = {
  // ===================== 4 DE EERSTE BUIS =====================
  w20(ctx) {
    _w2bg(ctx, C.bgMicro); difTag(ctx, '4 DE EERSTE BUIS'); metaText(ctx, 'DAG 19 · DWARSDOORSNEDE', W - 80, 78, C.goud, 'right', 26);
    const R = _w2sectie(ctx, 960, 400, 0, {});
    _w2stipjes(ctx, 960, R.chorda.y - 40, 960, R.plaatOnder + 6, 34, 220, 7);
    for (const s of [-1, 0, 1]) pijl(ctx, 960 + s * 70, R.chorda.y - 52, 960 + s * 110, R.plaatOnder + 14, C.goud, 0.9, 4, 14);
    naamBij(ctx, 'neurale plaat', 'verdikt ectoderm', 960, 300, 1, 'center', C.text);
    naamBij(ctx, 'ectoderm', null, 470, 360, 1, 'center', C.text);
    naamBij(ctx, 'chorda', 'maakt signaalstoffen', 1020, R.chorda.y + 22, 1, 'left', C.text);
    naamBij(ctx, 'mesoderm', null, 1560, 500, 1, 'center', C.text);
    naamBij(ctx, 'endoderm', null, 960, R.yEndo + 70, 1, 'center', C.text);
    naamBij(ctx, 'signaalstoffen', null, 760, R.plaatOnder + 70, 1, 'right', C.goud);
  },
  w21(ctx) {
    _w2bg(ctx, C.bgMicro); difTag(ctx, '4 DE EERSTE BUIS');
    // mini-reeks: plaat → groef → buis
    [[0, 'PLAAT'], [0.6, 'GROEF'], [1, 'BUIS']].forEach(([f, n], i) => { const mx = 250 + i * 380; ctx.save(); ctx.translate(mx, 190); ctx.scale(0.26, 0.26); _w2sectie(ctx, 0, 0, f, { meso: false, endo: false, chorda: false }); ctx.restore();
      metaText(ctx, n, mx, 290, C.text2, 'center', 26); if (i < 2) pijl(ctx, mx + 120, 190, mx + 250, 190, C.line, 1, 3, 12); });
    landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens'], 1);
    const R = _w2sectie(ctx, 900, 470, 1, {});
    onzeCel(ctx, 1160, 470, 22);
    naamBij(ctx, 'onze cel', 'wordt huid en lens', 1160, 392, 1, 'center', C.goud);
    naamBij(ctx, 'neurale buis', 'hersenen en ruggenmerg', 900 - R.buis.r - 30, R.buis.y + 10, 1, 'right', C.text);
    naamBij(ctx, 'chorda', null, 960, R.chorda.y + 20, 1, 'left', C.text);
  },
  w22(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '4 DE EERSTE BUIS');
    text(ctx, 'inductie', 140, 290, fTitel(104), C.goud, 'left');
    text(ctx, 'Een groepje cellen verandert het lot van zijn buren.', 140, 380, fTekst(48, 500), C.text, 'left');
    const y = 640;
    // groepje cellen (bron)
    [[300, 600], [360, 590], [330, 650], [270, 660], [390, 650], [300, 710], [360, 712]].forEach(([cx, cy]) => { ctx.beginPath(); ctx.arc(cx, cy, 32, 0, 6.283); shape(ctx, _mixHex(KB.meso, C.bgSchema, 0.45), KB.meso, 3); ctx.beginPath(); ctx.arc(cx, cy, 11, 0, 6.283); ctx.fillStyle = _mixHex(KB.meso, '#0B1018', 0.35); ctx.fill(); });
    text(ctx, 'groepje cellen', 330, 800, fTekst(36, 600), C.text, 'center');
    // signaal
    _w2stipjes(ctx, 450, y, 820, y, 26, 120, 31); pijl(ctx, 470, y + 90, 800, y + 90, C.goud, 1, 5, 18);
    text(ctx, 'signaal', 635, 800, fTekst(36, 600), C.goud, 'center');
    // buren: dichtbij veranderd (hoge cilindercellen), verder weg gewoon rond
    for (let i = 0; i < 7; i++) { const cx = 900 + i * 118; const veranderd = i < 4;
      if (veranderd) { roundRect(ctx, cx - 40, y - 85, 80, 170, 26); shape(ctx, _mixHex(KB.ecto, C.bgSchema, 0.3), C.goud, 3.5); ctx.beginPath(); ctx.ellipse(cx, y + 30, 13, 20, 0, 0, 6.283); ctx.fillStyle = _mixHex(KB.ecto, '#0B1018', 0.35); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(cx, y, 44, 0, 6.283); shape(ctx, _mixHex(KB.ecto, C.bgSchema, 0.55), KB.ecto, 3); ctx.beginPath(); ctx.arc(cx, y, 13, 0, 6.283); ctx.fillStyle = _mixHex(KB.ecto, '#0B1018', 0.35); ctx.fill(); } }
    text(ctx, 'buren krijgen een ander lot', 1077, 800, fTekst(36, 600), C.text, 'center');
    text(ctx, 'buren zonder signaal', 1550, 800, fTekst(36, 600), C.text2, 'center');
  },
  w23(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '4 DE EERSTE BUIS'); metaText(ctx, 'SALAMANDER · 1924', W - 80, 78, C.goud, 'right', 26);
    // 1 donor (ongekleurd) met het stukje van de rand van de oermond
    const D = _w2gastrula(ctx, 330, 470, 150, { pigment: false, lip: 1.25 });
    ctx.save(); ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(D.lip[0] + 4, D.lip[1] - 30, 46, 30, 0.3, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    naamBij(ctx, 'rand van de oermond', null, 330, 690, 1, 'center', C.goud);
    metaText(ctx, 'DONOR · ZONDER KLEUR', 330, 280, C.text2, 'center', 26);
    pijl(ctx, 520, 470, 640, 470, C.goud, 1, 5, 18);
    // 2 ontvanger (gekleurd): eigen oermond + stukje aan de buikkant
    const O = _w2gastrula(ctx, 820, 470, 150, { pigment: true, lip: 1.25 });
    const sx = 820 + Math.cos(1.25 + Math.PI) * 95, sy = 470 + Math.sin(1.25 + Math.PI) * 95;
    ctx.beginPath(); ctx.ellipse(sx, sy, 40, 26, 0.3, 0, 6.283); shape(ctx, '#E6DBC2', C.goud, 4);
    naamBij(ctx, 'stukje erin', 'aan de buikkant', sx - 54, sy - 24, 1, 'right', C.goud);
    metaText(ctx, 'ONTVANGER · GEKLEURD', 820, 280, C.text2, 'center', 26);
    pijl(ctx, 1010, 470, 1130, 470, C.line, 1, 5, 18);
    // 3 larfje met tweede lichaamsas
    _w2larf(ctx, 1490, 430, 1.05, { tweede: true });
    naamBij(ctx, 'tweede lichaam', 'vooral cellen van de ontvanger', 1640, 700, 1, 'center', C.goud);
    metaText(ctx, 'LARFJE', 1490, 280, C.text2, 'center', 26);
  },
  w24(ctx) {
    _w2bg(ctx, C.bgMacroSky); difTag(ctx, '4 DE EERSTE BUIS'); difLabel(ctx, 'VEREENVOUDIGD');
    const E = _w2embryoRug(ctx, 700, 150, 700, { dicht: [0.12, 0.84] });
    // ritspijlen: sluit van het midden naar beide uiteinden
    const yTop = E.Y(0.12), yOnd = E.Y(0.84);
    pijl(ctx, 700 + E.bocht(0.2) + 150 + 40, E.Y(0.3), 700 + E.bocht(0.12) + 150 + 40, yTop + 10, C.goud, 1, 5, 18);
    pijl(ctx, 700 + E.bocht(0.75) + 150 + 20, E.Y(0.66), 700 + E.bocht(0.84) + 150 + 20, yOnd - 10, C.goud, 1, 5, 18);
    // gestippeld: het stukje onderaan dat open blijft
    ctx.save(); ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(700 + E.bocht(0.9), E.Y(0.9), 70, 62, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    naamBij(ctx, 'neurale buis', 'sluit als een rits', 920, E.Y(0.45), 1, 'left', C.text);
    naamBij(ctx, 'blijft open', 'als het misgaat: open rug', 800, E.Y(0.9) + 10, 1, 'left', C.goud);
    naamBij(ctx, 'kop', null, 700 - 200, E.Y(0.08), 1, 'right', C.text);
    // tijdbalk
    const tx0 = 1240, tx1 = 1800, ty = 240; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx0, ty); ctx.lineTo(tx1, ty); ctx.stroke();
    for (let w = 1; w <= 8; w++) { const xx = tx0 + (w - 1) / 7 * (tx1 - tx0); ctx.beginPath(); ctx.moveTo(xx, ty - 10); ctx.lineTo(xx, ty + 10); ctx.stroke(); }
    const xw = tx0 + 3 / 7 * (tx1 - tx0); ctx.beginPath(); ctx.arc(xw, ty, 14, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'WEEK 4', xw, ty - 28, C.goud, 'center', 28);
    metaText(ctx, 'WEEK 1', tx0, ty + 48, C.text2, 'center', 26); metaText(ctx, 'WEEK 8', tx1, ty + 48, C.text2, 'center', 26);
    metaText(ctx, 'VAN ACHTEREN · ± 4 MM', 700, 890, C.text2, 'center', 26);
  },
  w25(ctx) {
    _w2bg(ctx, C.bgMacroSky); difTag(ctx, '4 DE EERSTE BUIS');
    // keuken: raam, kastjes, kalender
    roundRect(ctx, 160, 170, 380, 300, 10); shape(ctx, '#2C4468', '#7C8DA8', 4); ctx.strokeStyle = '#7C8DA8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(350, 170); ctx.lineTo(350, 470); ctx.moveTo(160, 320); ctx.lineTo(540, 320); ctx.stroke();
    // kalender
    const kx = 1380, ky = 160, cw = 62, chh = 56; roundRect(ctx, kx - 20, ky - 20, 7 * cw + 40, 5 * chh + 100, 10); shape(ctx, '#EEF0F2', '#9AA3B2', 2);
    ctx.fillStyle = '#C9654B'; ctx.fillRect(kx - 20, ky - 20, 7 * cw + 40, 50);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 1.5; ctx.strokeRect(kx + c * cw, ky + 44 + r * chh, cw, chh); }
    // kruisje: start foliumzuur (week 1), test: weken later
    const kxX = kx + 2 * cw + cw / 2, kyX = ky + 44 + chh / 2; ctx.strokeStyle = '#2A7A4A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(kxX - 16, kyX - 16); ctx.lineTo(kxX + 16, kyX + 16); ctx.moveTo(kxX + 16, kyX - 16); ctx.lineTo(kxX - 16, kyX + 16); ctx.stroke();
    const tX = kx + 5 * cw + cw / 2, tY = ky + 44 + 4 * chh + chh / 2; ctx.save(); ctx.translate(tX, tY); ctx.rotate(-0.6); roundRect(ctx, -24, -7, 48, 14, 6); shape(ctx, '#F7F7F4', '#5E6878', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-4, -4, 12, 8); ctx.restore();
    ctx.beginPath(); ctx.arc(tX, tY, 26, 0, 6.283); ctx.strokeStyle = '#C9654B'; ctx.lineWidth = 3; ctx.stroke();
    metaText(ctx, '✕ START FOLIUMZUUR', kx - 20, ky + 5 * chh + 150, C.text, 'left', 26); metaText(ctx, '○ ZWANGERSCHAPSTEST', kx - 20, ky + 5 * chh + 190, C.text, 'left', 26);
    // personages (staan aan het aanrecht / de keukentafel)
    persoon(ctx, 'esra', 780, 960, 600, { zwanger: 0, uit: 'blij', pose: 'vasthouden', kijk: 1, hold: (c, x, y) => { c.beginPath(); c.arc(x + 4, y - 10, 7, 0, 6.283); shape(c, '#F7F4EC', '#9AA3B2', 1.5); } });
    // tafelblad + voorkant
    ctx.fillStyle = '#8A6448'; ctx.fillRect(420, 640, 1000, 30); ctx.fillStyle = '#6E4E38'; ctx.fillRect(440, 670, 960, 230);
    // potje foliumzuur op tafel
    const px = 1000, py = 640; roundRect(ctx, px - 30, py - 86, 60, 86, 10); shape(ctx, '#F2F2EE', '#9AA3B2', 2.5); ctx.fillStyle = '#7FC48F'; ctx.fillRect(px - 30, py - 60, 60, 30); roundRect(ctx, px - 34, py - 104, 68, 22, 6); shape(ctx, '#7FC48F', '#4F8F6A', 2);
    for (const [tx, ty] of [[930, 634], [952, 630]]) { ctx.beginPath(); ctx.ellipse(tx, ty, 9, 6, 0, 0, 6.283); shape(ctx, '#F7F4EC', '#9AA3B2', 1.5); }
    naamBij(ctx, 'foliumzuur', 'B-vitamine', px, py + 70, 1, 'center', C.text);
    ctx.fillStyle = '#18243A'; ctx.fillRect(0, 900, W, 180);
  },
  w26(ctx) {
    _w2bg(ctx, C.bgMicro); difTag(ctx, '4 DE EERSTE BUIS');
    const R = _w2sectie(ctx, 960, 360, 1, {});
    _w2stipjes(ctx, 1010, R.chorda.y - 10, 1280, R.chorda.y - 150, 20, 120, 77, C.text2, 6); // andere signaalstoffen (gedimd)
    _w2stipjes(ctx, 900, R.chorda.y + 20, 640, R.chorda.y - 120, 18, 140, 177, C.text2, 6);
    _w2stipjes(ctx, 960, R.chorda.y - 40, 960, R.plaatOnder - 6, 30, 120, 11, C.goud, 7);
    naamBij(ctx, 'Sonic hedgehog', 'signaalstof van de chorda', 1040, R.chorda.y + 40, 1, 'left', C.goud);
    naamBij(ctx, 'chorda', null, 905, R.chorda.y + 12, 1, 'right', C.text);
    naamBij(ctx, 'neurale buis', null, 960 - R.buis.r - 30, R.buis.y - 20, 1, 'right', C.text);
  },
  // ===================== 5 HOEVEEL SIGNAAL? =====================
  w27(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '5 HOEVEEL SIGNAAL?'); metaText(ctx, 'WEEK 5', W - 80, 78, C.goud, 'right', 26);
    const e = embryoEcht(ctx, 380, 560, 1.15, {});
    ctx.save(); ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(e.arm[0] + 20, e.arm[1] - 20, 58, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    zoomCircle(ctx, 1250, 520, 340, e.arm[0] + 70, e.arm[1] - 30, null, 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(880, 160, 760, 760); _w2knop(ctx, 1250, 760, 0, { gradient: false }); });
    naamBij(ctx, 'armknop', null, 1250, 450, 1, 'center', C.text);
    naamBij(ctx, 'pinkkant', 'maakt Sonic hedgehog', 1410, 640, 1, 'left', C.goud);
    naamBij(ctx, 'duimkant', null, 1080, 640, 1, 'right', C.text);
  },
  w28(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '5 HOEVEEL SIGNAAL?'); difLabel(ctx, 'VEREENVOUDIGD');
    const x = 860, yb = 900; const K = _w2knop(ctx, x, yb, 1, { gradient: true, bereik: 200 });
    _w2kromme(ctx, x - 300, x + 300, 300, 120, (u) => Math.exp(-(1 - u) * 3.2), { titel: 'hoeveelheid signaal' });
    text(ctx, 'weinig', x - 300, 345, fTekst(36, 600), C.text2, 'left'); text(ctx, 'veel', x + 300, 345, fTekst(36, 600), C.goud, 'right');
    naamBij(ctx, 'pink', 'veel en lang signaal', K.bron[0] + 70, K.stralen[4][1] - 20, 1, 'left', C.goud);
    naamBij(ctx, 'bron', null, K.bron[0] + 70, K.bron[1] + 30, 1, 'left', C.goud);
    naamBij(ctx, 'middelste vingers', 'minder signaal', x, K.K.top - 46, 1, 'center', C.text);
    naamBij(ctx, 'duim', 'het minst', x - 330, K.stralen[0][1] + 40, 1, 'right', C.text);
    naamBij(ctx, 'gradiënt', 'van hoog naar laag', 1460, 300, 1, 'left', C.goud);
  },
  w29(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '5 HOEVEEL SIGNAAL?'); metaText(ctx, 'KIPPENEMBRYO', W - 80, 78, C.text2, 'right', 26);
    const k = _w2kipEmbryo(ctx, 360, 520, 1.05);
    naamBij(ctx, 'kop', null, 160, 360, 1, 'center', C.text);
    zoomCircle(ctx, 960, 480, 270, k.knop[0] + 30, k.knop[1], null, 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(680, 200, 560, 560); const V = _w2vleugelknop(ctx, 960, 380, 1, { tweede: true, kraal: true }); _w2pincet(ctx, V.voor[0] - 14, V.voor[1] - 14, -2.3, 300); });
    naamBij(ctx, 'vleugelknop', null, 960, 800, 1, 'center', C.text);
    naamBij(ctx, 'bron', 'achter', 1060, 650, 1, 'left', C.goud);
    naamBij(ctx, 'tweede bron', 'voor', 860, 650, 1, 'right', C.goud);
    // normale vleugel (skelet) met drie vingers
    const vs = ['voor', 'midden', 'achter']; const V = _w2vleugel(ctx, 1620, 900, 1.0, vs);
    _w2vleugelLabels(ctx, V, vs, 280); metaText(ctx, 'NORMALE VLEUGEL', 1620, 950, C.text2, 'center', 26);
  },
  wq30(ctx) {
    difVraagKaart(ctx, ['Er zit nu ook een bron aan de voorkant.', 'Wat groeit er?'], ['Extra vingers, in dezelfde volgorde nog een keer erachter', 'Minder vingers, omdat de twee bronnen elkaar opheffen', 'Extra vingers in spiegelbeeld'], (c) => {
      roundRect(c, 1360, 170, 500, 470, 18); shape(c, rgba(C.fill, 0.5), C.line, 2);
      _w2vleugelknop(c, 1610, 290, 0.78, { tweede: true });
      text(c, 'voor', 1520, 600, fTekst(36, 600), C.text, 'center'); text(c, 'achter', 1705, 600, fTekst(36, 600), C.text, 'center');
    });
  },
  w31(ctx) {
    _w2bg(ctx, C.bgSchema); difTag(ctx, '5 HOEVEEL SIGNAAL?'); difLabel(ctx, 'VEREENVOUDIGD');
    const vs = ['achter', 'midden', 'voor', 'voor', 'midden', 'achter'];
    const V = _w2vleugel(ctx, 1000, 940, 0.95, vs);
    const xa = V.tops[0][0], xb = V.tops[5][0];
    _w2kromme(ctx, xa - 30, xb + 30, 240, 100, (u) => 0.08 + Math.exp(-u * 4) + Math.exp(-(1 - u) * 4), { titel: 'hoeveelheid signaal' });
    vs.forEach((v, i) => text(ctx, v, V.tops[i][0], V.tops[i][1] - 22, fTekst(34, 600), v === 'achter' ? C.goud : C.text, 'center'));
    naamBij(ctx, 'zes vingers', 'in spiegelbeeld', xb + 90, 620, 1, 'left', C.goud);
    naamBij(ctx, 'bron', null, xb + 60, 250, 1, 'left', C.goud); naamBij(ctx, 'tweede bron', null, xa - 60, 250, 1, 'right', C.goud);
    const vn = ['voor', 'midden', 'achter']; const N = _w2vleugel(ctx, 250, 940, 0.62, vn); metaText(ctx, 'NORMAAL: 3', 250, 990, C.text2, 'center', 26);
  },
};

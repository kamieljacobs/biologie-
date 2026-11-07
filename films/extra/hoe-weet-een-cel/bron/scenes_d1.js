// scenes_d1.js — animator 1: titel, s01, s03, s04, s06–s15, s17–s26, s28 (opening en hoofdstuk 1–3)
// Bouwt op de keyframes w01–w19 (kf/sbw1.js) en lib_dif.js. Nieuwe functies: voorvoegsel _d1.
const _d1UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const _d1PI = Math.PI;

// vraagkaart zonder eigen kop linksboven (de speler zet die zelf)
function _d1kaart(ctx, vraag, opties, beeld) { difVraagKaart(ctx, vraag, opties, beeld); ctx.fillStyle = C.bgSchema; ctx.fillRect(70, 55, 760, 32); }

// ---------- knikker ----------
function _d1knikker(ctx, x, y, col = C.goud, rand = '#8A6510', a = 1, kern = 0, s = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 18 * s, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.stroke();
  if (kern > 0.01) { ctx.globalAlpha *= kern; ctx.beginPath(); ctx.arc(x + 2, y - 1, 7 * s, 0, 6.283); ctx.fillStyle = C.paars; ctx.fill(); }
  ctx.restore();
}
function _d1ring(ctx, x, y, r, a = 1, col = C.goud, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); ctx.restore(); }
function _d1kruis(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
const _d1bez = (a, b, u) => { const my = (a.y + b.y) / 2, v = 1 - u; return [v * v * v * a.x + 3 * v * v * u * a.x + 3 * v * u * u * b.x + u * u * u * b.x, v * v * v * a.y + 3 * v * v * u * my + 3 * v * u * u * my + u * u * u * b.y]; };

// ---------- landschap van Waddington, animeerbaar ----------
// o.groei 0..1 = dalen tekenen zich van boven naar beneden; o.dimA 0..1 = andere dalen dimmen; o.hillA; o.labA; o.labels
function _d1land(ctx, x, y, w, h, o = {}) {
  const boom = o.boom || DIF_BOOM, pad = o.pad || [], dimA = o.dimA ?? (pad.length ? 1 : 0), groei = o.groei ?? 1, hillA = o.hillA ?? 1, labA = o.labA ?? 1;
  const diepte = (b) => b.k ? 1 + Math.max(...b.k.map(diepte)) : 0; const D = diepte(boom);
  const blad = (b) => b.k ? b.k.reduce((s, c) => s + blad(c), 0) : 1;
  const P = [];
  const zet = (b, x0, x1, d, ouder, gekozen) => { const knoop = { b, x: (x0 + x1) / 2, y: y + (d / D) * h, ouder, gekozen, d }; P.push(knoop);
    if (b.k) { const tot = blad(b); let xs = x0; b.k.forEach(c => { const ww = (x1 - x0) * blad(c) / tot; zet(c, xs, xs + ww, d + 1, knoop, gekozen && pad[d] === c.n && d < pad.length); xs += ww; }); } };
  zet(boom, x, x + w, 0, null, true);
  const R = { knopen: P };
  if (hillA > 0.01) { const cx = P[0].x, yb = y + h + 70; ctx.save(); ctx.globalAlpha *= hillA; ctx.beginPath(); ctx.moveTo(cx - 70, y - 50); ctx.lineTo(cx + 70, y - 50);
    ctx.bezierCurveTo(cx + 240, y - 40, x + w + 70, y + h * 0.18, x + w + 70, y + h * 0.42); ctx.lineTo(x + w + 70, yb); ctx.lineTo(x - 70, yb); ctx.lineTo(x - 70, y + h * 0.42);
    ctx.bezierCurveTo(x - 70, y + h * 0.18, cx - 240, y - 40, cx - 70, y - 50); ctx.closePath(); ctx.fillStyle = rgba('#2A3B5C', 0.9); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  const diepst = P.filter(k => k.gekozen).pop();
  const onder = (k, anc) => { for (let q = k; q; q = q.ouder) if (q === anc) return true; return false; };
  const mogelijk = (k) => !pad.length || k.gekozen || onder(k, diepst);
  R.alfa = (k) => mogelijk(k) ? 1 : lerp(1, 0.35, dimA);
  const frac = (k) => clamp(groei * D - (k.d - 1), 0, 1);
  for (const k of P) { if (!k.ouder) continue; const f = frac(k); if (f <= 0.001) continue; const a = R.alfa(k);
    const pts = []; for (let i = 0; i <= 24; i++) pts.push(_d1bez(k.ouder, k, f * i / 24));
    const lijn = () => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
    ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = rgba('#0E1626', 0.85); ctx.lineWidth = 26 - k.d * 3; lijn(); ctx.stroke();
    ctx.strokeStyle = k.gekozen ? rgba(C.goud, 0.55) : rgba(C.line, 0.45); ctx.lineWidth = 3; lijn(); ctx.stroke(); ctx.restore(); }
  if (o.labels !== false && labA > 0.01) for (const k of P) { if (!k.b.n.trim() || !k.ouder) continue; const a = R.alfa(k) * labA * clamp(frac(k) * 2 - 1, 0, 1); if (a <= 0.01) continue;
    ctx.save(); ctx.globalAlpha *= a; const kl = (o.kleur && o.kleur[k.b.n]) || (k.gekozen ? C.goud : C.text);
    if (!k.b.k) text(ctx, k.b.n, k.x, k.y + 46, fTekst(32, 600), kl, 'center'); else text(ctx, k.b.n, k.x + 30, k.y + 10, fTekst(30, 600), kl, 'left'); ctx.restore(); }
  R.top = [P[0].x, P[0].y - 18];
  // positie langs een pad (namen vanaf de top); u = 0..pad.length
  R.punt = (namen, u) => { const keten = [P[0]]; for (const n of namen) { const c = P.find(k => k.ouder === keten[keten.length - 1] && k.b.n === n); if (!c) break; keten.push(c); }
    const n = keten.length - 1; if (n < 1 || u <= 0) return [P[0].x, P[0].y - 18]; const uu = Math.min(u, n), i = Math.min(n - 1, Math.floor(uu)), f = uu - i; const p = _d1bez(keten[i], keten[i + 1], f); return [p[0], p[1] - 14]; };
  R.knoop = (n) => P.find(k => k.b.n === n);
  return R;
}
function _d1kat(ctx, x, y, s, vlek = 1, a = 1) { // lapjeskat, vlekken met eigen alfa
  if (a <= 0.01) return; const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  huiskat(g, x, y, s, { houding: 'zitten', kijk: -1 }); g.globalCompositeOperation = 'source-atop'; g.fillStyle = rgba('#F2EEE6', 0.92); g.fillRect(0, 0, W, H);
  const vl = [[-60, -120, 70, 50, '#D9893A'], [10, -150, 60, 44, '#26201C'], [-120, -60, 50, 60, '#26201C'], [40, -60, 56, 40, '#D9893A'], [80, -210, 40, 30, '#D9893A'], [-30, -40, 30, 26, '#26201C']];
  vl.forEach(([dx, dy, rx, ry, col], i) => { const v = clamp(vlek * 1.6 - i * 0.12, 0, 1); if (v <= 0.01) return; g.beginPath(); const Q = []; for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283, qq = 0.75 + 0.35 * hash(i * 9 + k); Q.push([x + dx * s + Math.cos(an) * rx * s * qq * v, y + dy * s + Math.sin(an) * ry * s * qq * v]); } bioPad(g, Q, true); g.fillStyle = rgba(col, 0.95); g.fill(); });
  ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(c, 0, 0); ctx.restore();
}

// ---------- genstrook met vloeiende standen ----------
// genen: [{u0,u1,aan,uit,merk,naam}] met aan/uit/merk 0..1
function _d1genStrook(ctx, x0, x1, y, genen, o = {}) {
  const { amp = 16, w = 8, fase = 0, labels = true, lpx = 36, bg: bgk = C.bgSchema } = o; const P = _w1dnaPunten(x0, x1, y, amp, 80, fase);
  genen.forEach(g => { const S = _w1deel(P, g.u0, g.u1);
    if ((g.aan || 0) > 0.01) _w1poly(ctx, S, rgba(C.groen, 0.85 * g.aan), w * 3.2);
    if ((g.uit || 0) > 0.01) _w1poly(ctx, S, rgba(C.line, 0.18 * g.uit), w * 3.2);
    if ((g.merk || 0) > 0.01) _w1poly(ctx, S, rgba(C.goud, 0.35 * g.merk), w * 3.4); });
  dnaDraad(ctx, P, { w, helix: false, glad: false });
  genen.forEach(g => { const S = _w1deel(P, g.u0, g.u1);
    if ((g.uit || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= 0.65 * g.uit; _w1poly(ctx, S, bgk, w + 2); ctx.restore(); }
    if ((g.merk || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= g.merk; ctx.setLineDash([10, 8]); const xs = S.map(p => p[0]), ys = S.map(p => p[1]); roundRect(ctx, Math.min(...xs) - 14, Math.min(...ys) - 24, Math.max(...xs) - Math.min(...xs) + 28, Math.max(...ys) - Math.min(...ys) + 48, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    if (labels && g.naam) { const m = S[Math.floor(S.length / 2)]; ctx.save(); ctx.globalAlpha *= 1 - 0.5 * (g.uit || 0);
      text(ctx, g.naam, m[0], y + amp + 58, fTekst(lpx, 600), (g.aan || 0) > 0.5 ? C.groen : (g.merk || 0) > 0.5 ? C.goud : C.text, 'center'); ctx.restore(); } });
  return P;
}
function _d1kernZoom(ctx, x, y, r, aan, aanA = 1, fase = 0) { // vergrote kern; genen in 'aan' lichten op met aanA, de rest dimt mee
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.paars, 0.22), C.kernR, 3); ctx.beginPath(); ctx.arc(x, y, r - 4, 0, 6.283); ctx.clip();
  const g = [0, 1, 2, 3].map(b => ({ u0: 0.12 + b * 0.2, u1: 0.12 + b * 0.2 + 0.13, aan: aan.includes(b) ? aanA : 0, uit: aan.includes(b) ? 0 : aanA }));
  _d1genStrook(ctx, x - r * 0.95, x + r * 0.95, y, g, { amp: r * 0.16, w: 7, labels: false, fase, bg: C.bgMicro }); ctx.restore();
}

// ---------- morula met vloeiende genlichtjes ----------
// st[i] = {aan:[..], aanA, rand, lw, vrij (0..1), leeg (0..1 weg)}
function _d1morula(ctx, cx, cy, R, st = {}) {
  const pts = []; for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283 + 0.2; pts.push([cx + Math.cos(an) * R * 0.68, cy + Math.sin(an) * R * 0.68]); }
  pts.push([cx, cy]); for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6; pts.push([cx + Math.cos(an) * R * 0.33, cy + Math.sin(an) * R * 0.33]); }
  const cel = _bioVoronoi('w1mor' + R + '_' + cx, pts, R * 0.5, 8, 60).map((c, i) => ({ i, c: c.c, binnen: i >= 11,
    pts: c.pts.map(p => { const dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy), m = R * 0.97; return d > m ? [cx + dx / d * m, cy + dy / d * m, 1] : [p[0], p[1], 0]; }) }));
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R * 1.08, 0, 6.283); ctx.strokeStyle = rgba('#F6EEDC', 0.6); ctx.lineWidth = R * 0.04; ctx.stroke();
  cel.forEach(c => { const s = st[c.i] || {}; const weg = s.leeg || 0; ctx.save();
    ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, c.binnen ? '#F2D9A8' : '#EBC9A0', s.rand || '#C9A27A', s.lw || 2);
    if (weg < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - weg; _d1celKern(ctx, c.c[0], c.c[1], R * 0.085, s.aan || [], s.aanA || 0); ctx.restore(); }
    if ((s.vrij || 0) > 0.01) { const F = c.pts.filter(p => p[2]); if (F.length > 1) { ctx.save(); ctx.globalAlpha *= s.vrij; ctx.beginPath(); F.sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)); F.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = s.vrijKleur || C.teal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); } }
    ctx.restore(); });
  ctx.restore(); return cel;
}
function _d1celKern(ctx, x, y, kr, aan, aanA) {
  ctx.beginPath(); ctx.arc(x, y, kr, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.85), BIO.kernL, 1.5);
  for (let b = 0; b < 4; b++) { ctx.fillStyle = aan.includes(b) && aanA > 0.01 ? rgba(C.groen, 0.25 + 0.75 * aanA) : rgba('#F2F2EE', 0.25); roundRect(ctx, x - kr * 0.6, y - kr * 0.62 + b * kr * 0.36, kr * 1.2, kr * 0.2, 2); ctx.fill(); }
}

// ---------- kiemschijf (bovenaanzicht) en doorsnede ----------
const _D1K = { dx: 860, dy: 300, rx: 560, ry: 150, x0: 200, x1: 1500, yT: 560 };
function _d1schijf(ctx, t, o = {}) {
  const { plat = 1, streep = 1, kruip = 0, snede = 1, a = 1 } = o; if (a <= 0.01) return; const { dx, dy } = _D1K; const rx = lerp(170, _D1K.rx, plat), ry = lerp(160, _D1K.ry, plat);
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(dx, dy + 18 * plat, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(KB.endo, 0.55); ctx.fill();
  ctx.beginPath(); ctx.ellipse(dx, dy, rx, ry, 0, 0, 6.283); shape(ctx, _mixHex(KB.ecto, '#121A26', 0.35), KB.ecto, 3);
  ctx.save(); ctx.beginPath(); ctx.ellipse(dx, dy, rx - 4, ry - 4, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#F2F2EE', 0.08);
  for (let gx = dx - rx; gx < dx + rx; gx += 34) for (let gy = dy - ry; gy < dy + ry; gy += 26) { ctx.beginPath(); ctx.arc(gx + ((Math.round((gy - dy + 400) / 26)) % 2) * 17, gy, 10, 0, 6.283); ctx.fill(); } ctx.restore();
  const s1 = dx + 470, s0f = dx - 60, s0 = lerp(s1, s0f, streep); // de streep groeit van de staart naar het midden
  if (streep > 0.01) { ctx.beginPath(); ctx.moveTo(s0, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy - 26 * streep, s1, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy + 26 * streep, s0, dy); shape(ctx, _mixHex(KB.ecto, '#FFFFFF', 0.25), _mixHex(KB.ecto, '#FFFFFF', 0.5), 3);
    ctx.beginPath(); ctx.moveTo(s0 + 20, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy - 8 * streep, s1 - 30, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy + 8 * streep, s0 + 20, dy); ctx.fillStyle = '#0B1018'; ctx.fill();
    ctx.save(); ctx.globalAlpha *= ramp(streep, 0.8, 0.2); ctx.beginPath(); ctx.ellipse(s0f - 6, dy, 22, 14, 0, 0, 6.283); shape(ctx, _mixHex(KB.ecto, '#FFFFFF', 0.3), _mixHex(KB.ecto, '#FFFFFF', 0.55), 3); ctx.beginPath(); ctx.ellipse(s0f - 6, dy, 8, 5, 0, 0, 6.283); ctx.fillStyle = '#0B1018'; ctx.fill(); ctx.restore(); }
  if (kruip > 0.01) { for (let i = 0; i < 16; i++) { const u = [-0.1, 0.15, 0.4, 0.65][i % 4] + 0.12, k = i % 8 < 4 ? 1 : -1, ph = ((t * 0.45 + hash(i * 2.7)) % 1); const px = lerp(s0f, s1, u) + (hash(i) - 0.5) * 40, py = dy + k * lerp(115, 30, ph);
      ctx.save(); ctx.globalAlpha *= kruip * Math.min(1, ph * 5, (1 - ph) * 5); ctx.beginPath(); ctx.ellipse(px, py, 11, 8, 0, 0, 6.283); shape(ctx, _mixHex(KB.ecto, '#FFFFFF', 0.45), '#F2F2EE', 1.5); ctx.restore(); }
    [[-0.1, 1], [0.4, 1], [0.15, -1], [0.65, -1]].forEach(([u, k]) => { const px = lerp(s0f, s1, u + 0.12) + 40; pijl(ctx, px, dy + k * 110, px, dy + k * 44, rgba('#F2F2EE', 0.6), kruip, 3, 12); }); }
  metaText(ctx, 'KOP', dx - rx - 20, dy + 10, C.text2, 'right', 26); metaText(ctx, 'STAART', dx + rx + 20, dy + 10, C.text2, 'left', 26);
  if (snede > 0.01) { const sx = dx + 200, yy = _D1K.ry * Math.sqrt(1 - (200 / _D1K.rx) ** 2); ctx.save(); ctx.globalAlpha *= snede; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, dy - yy - 20); ctx.lineTo(sx, dy + yy + 40); ctx.stroke(); ctx.restore();
    metaText(ctx, 'DOORSNEDE', sx + 14, dy + yy + 44, rgba(C.goud, snede), 'left', 26); }
  ctx.restore(); return { s0: s0f, s1, rx, ry };
}
// doorsnede: gleuf 0..1, duik 0..1 (cellen duiken), meso 0..1 (verspreiding), endo 0..1 (nieuwe onderlaag), onze = {a, ring}
function _d1snede(ctx, t, o = {}) {
  const { gleuf = 1, duik = 0, meso = 0, endo = 0, a = 1, onze = null, ectoKleur = 0 } = o; if (a <= 0.01) return; const { x0, x1, yT } = _D1K, mid = (x0 + x1) / 2;
  ctx.save(); ctx.globalAlpha *= a; const dip = (x) => 46 * gleuf * Math.exp(-(((x - mid) / 70) ** 2));
  for (let x = x0; x < x1; x += 52) { const nieuw = Math.abs(x + 26 - mid) < 360 * endo; roundRect(ctx, x + 2, 800, 48, 26, 10); shape(ctx, nieuw ? _mixHex(KB.endo, '#121A26', 0.15) : '#7A8090', nieuw ? KB.endo : '#A0A6B2', 2); ctx.beginPath(); ctx.ellipse(x + 26, 813, 8, 5, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); }
  for (let i = 0; i < 26; i++) { const k = i % 2 ? 1 : -1, d = 60 + Math.floor(i / 2) * 36 + hash(i) * 14; if (d > 520 * meso) continue; const px = mid + k * d, py = 700 + (hash(i * 3.3) - 0.5) * 60 + 3 * Math.sin(t * 1.3 + i);
    ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i * 5) * 3 + 0.08 * Math.sin(t + i)); ctx.beginPath(); bioPad(ctx, [[-22, 0], [-6, -12], [18, -8], [26, 4], [6, 12], [-14, 10]], true); shape(ctx, _mixHex(KB.meso, '#121A26', 0.2), KB.meso, 2); ctx.beginPath(); ctx.arc(0, 0, 6, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); ctx.restore(); }
  const eK = _mixHex(KB.ecto, '#121A26', 0.25);
  for (let x = x0; x < x1; x += 40) { const c = x + 20; if (gleuf > 0.3 && Math.abs(c - mid) < 34 * gleuf) continue; const d = dip(c); roundRect(ctx, x + 2, yT + d, 36, 86, 12); shape(ctx, eK, KB.ecto, 2); ctx.beginPath(); ctx.ellipse(c, yT + d + 52, 7, 10, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); }
  // cellen die in de gleuf duiken en daarna opzij schuiven (lopende stroom)
  if (duik > 0.01) for (let i = 0; i < 10; i++) { const ph = (t * 0.32 + i / 10) % 1, k = i % 2 ? 1 : -1, naarEndo = i % 3 === 0; let px, py, col, fles;
    if (ph < 0.4) { const u = ph / 0.4; px = mid + k * 6 * u; py = yT + 50 + 120 * ease(u); col = _mixHex(KB.ecto, KB.meso, u); fles = 1; }
    else { const u = (ph - 0.4) / 0.6; px = mid + k * (20 + u * 420 * Math.max(0.25, meso)); py = naarEndo ? lerp(yT + 170, 813, ease(u * 2)) : lerp(yT + 170, 700, ease(u * 2)); col = naarEndo ? _mixHex(KB.meso, KB.endo, clamp(u * 2, 0, 1)) : KB.meso; fles = 0; }
    const aa = duik * Math.min(1, ph * 8, (1 - ph) * 6); if (aa <= 0.01) continue; ctx.save(); ctx.globalAlpha *= aa; ctx.translate(px, py);
    if (fles) { ctx.beginPath(); bioPad(ctx, [[-6, -40], [6, -40], [16, 0], [12, 24], [-12, 24], [-16, 0]], true); } else { ctx.rotate(k * 0.2); ctx.beginPath(); bioPad(ctx, [[-22, 0], [-6, -12], [18, -8], [26, 4], [6, 12], [-14, 10]], true); }
    shape(ctx, _mixHex(col, '#121A26', 0.25), col, 2); ctx.beginPath(); ctx.arc(0, fles ? 8 : 0, 6, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); ctx.restore(); }
  if (onze && onze.a > 0.01) { const ox = mid + 340 + 20 - ((mid + 340 - x0) % 40), oy = yT + dip(ox); ctx.save(); ctx.globalAlpha *= onze.a; roundRect(ctx, ox - 22, oy - 4, 44, 94, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); _d1ring(ctx, ox, oy + 43, 70, onze.ring || 0); onze.p = [ox, oy]; }
  ctx.restore();
}

// ---------- drie banden met orgaaniconen (w16) ----------
const _D1B = [['ectoderm', 'bovenste laag', KB.ecto, 150], ['mesoderm', 'middelste laag', KB.meso, 395], ['endoderm', 'onderste laag', KB.endo, 640]];
const _D1IC = [
  [[_w1opperhuid, 0.7, 'opperhuid'], [_w1brein, 0.7, 'hersenen'], [(c, x, y) => zenuwcel(c, x - 50, y, { s: 0.6, naar: [x + 80, y + 10], col: C.paars, takken: 4 }), 1, 'zenuwen'], [(c, x, y) => _w1oog(c, x, y, 52, { lensGoud: true }), 1, 'ooglens']],
  [[(c, x, y) => spierBundel(c, x - 80, y, 160, { n: 3, h: 22 }), 1, 'spieren'], [_w1bot, 0.75, 'botten'], [_w1druppel, 0.8, 'bloed'], [_w1nier, 0.75, 'nieren']],
  [[_w1darm, 0.8, 'darm'], [_w1long, 0.75, 'longen'], [(c, x, y) => leverVoor(c, x, y, 0.38), 1, 'lever'], [_w1alvlees, 0.85, 'alvleesklier']]];
// o.a[r] bandalfa, o.naam[r] naamalfa, o.ic[r][k] 0..1 (schuift uit de band), o.pijl[r]
function _d1banden(ctx, o = {}) {
  const A = o.a || [1, 1, 1], N = o.naam || [0, 0, 0], IC = o.ic || [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], PJ = o.pijl || [0, 0, 0], hl = o.hl || [0, 0, 0];
  _D1B.forEach(([n, m, col, y], r) => { ctx.save(); ctx.globalAlpha *= A[r]; roundRect(ctx, 100, y, 520, 200, 18); shape(ctx, _mixHex(col, C.bgSchema, 0.55), hl[r] > 0.01 ? _mixHex(col, '#FFFFFF', 0.4 * hl[r]) : col, 3 + 3 * hl[r]);
    ctx.save(); ctx.globalAlpha *= N[r]; text(ctx, n, 360, y + 102, fTekst(48, 700), C.text, 'center'); ctx.restore();
    metaText(ctx, m, 360, lerp(y + 112, y + 148, N[r]), C.text, 'center', 26); pijl(ctx, 640, y + 100, 700, y + 100, col, PJ[r], 5, 18);
    _D1IC[r].forEach(([fn, s, naam], k) => { const e = IC[r][k]; if (e <= 0.01) return; const xf = 850 + k * 285, x = lerp(700, xf, ease(e)), yy = y + 75; ctx.save(); ctx.globalAlpha *= clamp(e * 1.5, 0, 1); fn(ctx, x, yy, s * lerp(0.5, 1, ease(e))); ctx.globalAlpha *= ramp(e, 0.6, 0.4); text(ctx, naam, xf, y + 185, fTekst(36, 600), C.text, 'center'); ctx.restore(); });
    ctx.restore(); });
}

Object.assign(SCENES, {
  title(ctx, t) { const r = 165, x = 1490, y = 680; const B = blastocyste(ctx, x, y, r, { icm: _d1PI * 0.85 + 0.12 * Math.sin(t * 0.5) });
    const cx = B.icm[0] + 0.9 * r * 0.14, cy = B.icm[1] + 0.3 * r * 0.14; onzeCel(ctx, cx, cy, r * 0.12 * (1 + 0.06 * Math.sin(t * 2.2))); },

  // ================= Opening =================
  s01(ctx, t, q) { bg(ctx, 'micro'); const z = ramp(t, q.at('Acht') - 0.2, 1.6), zz = ease(z);
    // dag 5: blastocyste draait rustig, onze cel licht op; daarna groeit hij tot embryo
    const bA = 1 - ramp(z, 0.55, 0.4); if (bA > 0.01) { const r = 290 * Math.pow(10 / 290, zz), bx = lerp(960, 1000, zz), by = lerp(480, 470, zz);
      ctx.save(); ctx.globalAlpha *= bA; const B = blastocyste(ctx, bx, by, r, { icm: _d1PI * 0.85 + 0.1 * Math.sin(t * 0.45) }); const cx = B.icm[0] + 0.9 * r * 0.14, cy = B.icm[1] + 0.3 * r * 0.14;
      onzeCel(ctx, cx, cy, r * 0.12, {}); _d1ring(ctx, cx, cy, r * 0.12 + 8 + 4 * Math.sin(t * 3), ramp(t, 0.6, 0.6) * (1 - zz), C.goud, 3);
      naamBij(ctx, 'onze cel', null, cx + 70, cy + 12, ramp(t, 0.8, 0.6) * (1 - ramp(z, 0, 0.2)), 'left', C.goud); ctx.restore(); }
    metaText(ctx, 'DAG 5', W - 80, 78, rgba(C.text2, 1 - ramp(z, 0, 0.3)), 'right', 26);
    metaText(ctx, "ZO'N 100 CELLEN · ± 0,15 MM", 960, 862, rgba(C.text2, q.on('honderd', 1, 0.5) * (1 - ramp(z, 0, 0.3))), 'center', 26);
    const eA = ramp(z, 0.15, 0.35); if (eA > 0.01) { const s = 1.55 * Math.pow(0.04, 1 - zz), x = 1000, y = 490; ctx.save(); ctx.globalAlpha *= eA; const E = embryoEcht(ctx, x, y, s, { t });
      metaText(ctx, 'WEEK 8', W - 80, 78, C.text2, 'right', 26);
      const hA = q.on('hart', 1, 0.4); _d1ring(ctx, E.hart[0], E.hart[1], 46 + 6 * Math.max(0, Math.sin(t * 15.1)) ** 2, hA * _d1UIT(t, q.at('oogjes'), 0.5), C.koraal, 4); naamBij(ctx, 'hart', null, E.hart[0] - 90, E.hart[1] + 12, hA, 'right');
      const oA = q.on('oogjes', 1, 0.4); _d1ring(ctx, E.oog[0], E.oog[1], lerp(90, 52, oA), oA, C.goud, 5); naamBij(ctx, 'oog', null, E.oog[0] - 76, E.oog[1] - 40, oA, 'right', C.goud);
      const vA = q.on('vingers', 1, 0.4); _d1ring(ctx, E.arm[0], E.arm[1], 40, vA * _d1UIT(t, q.at('Niemand'), 0.6), C.goud, 3); naamBij(ctx, 'handje', null, E.arm[0] + 52, E.arm[1] + 10, vA * _d1UIT(t, q.at('Niemand'), 0.6), 'left');
      const yT = y - 212 * 1.55, yB = y + 228 * 1.55, sb = ramp(z, 0.8, 0.3) * ramp(t, q.at('weken') + 0.4, 0.6); ctx.save(); ctx.globalAlpha *= sb; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1440, yT); ctx.lineTo(1440, yB); ctx.moveTo(1426, yT); ctx.lineTo(1454, yT); ctx.moveTo(1426, yB); ctx.lineTo(1454, yB); ctx.stroke(); ctx.restore();
      metaText(ctx, '± 3 CM', 1470, (yT + yB) / 2 + 10, rgba(C.text2, sb), 'left', 26); ctx.restore();
      // geen bouwtekening: een leeg blad met een kruis
      const bt = q.on('bouwtekening', 1, 0.5) * _d1UIT(t, q.at('Hoe') - 0.1, 0.5); if (bt > 0.01) { ctx.save(); ctx.globalAlpha *= bt; ctx.translate(380, 330); ctx.rotate(-0.06); roundRect(ctx, -130, -100, 260, 200, 10); shape(ctx, rgba('#5BA4C9', 0.22), C.teal, 3);
        ctx.strokeStyle = rgba('#F2F2EE', 0.5); ctx.lineWidth = 2; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-130 + i * 43, -100); ctx.lineTo(-130 + i * 43, 100); ctx.stroke(); } for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-130, -100 + i * 50); ctx.lineTo(130, -100 + i * 50); ctx.stroke(); } ctx.restore();
        _d1kruis(ctx, 380, 330, 90, bt * q.on('uit', 1, 0.3)); naamBij(ctx, 'bouwtekening', null, 380, 480, bt, 'center'); }
      // één cel: klein inzetje met de blastocyste en onze cel
      const ic = q.on('één', 1, 0.5); if (ic > 0.01) { ctx.save(); ctx.globalAlpha *= ic; ctx.beginPath(); ctx.arc(400, 400, 190, 0, 6.283); shape(ctx, C.bgMicro, C.goud, 3); ctx.save(); ctx.beginPath(); ctx.arc(400, 400, 186, 0, 6.283); ctx.clip();
        const B = blastocyste(ctx, 400, 400, 140, {}); const cx = B.icm[0] + 0.9 * 140 * 0.14, cy = B.icm[1] + 0.3 * 140 * 0.14; onzeCel(ctx, cx, cy, 140 * 0.12); _d1ring(ctx, cx, cy, 30 + 4 * Math.sin(t * 4), 1, C.goud, 3); ctx.restore();
        naamBij(ctx, 'één cel', null, 400, 640, 1, 'center', C.goud); ctx.restore(); vraagteken(ctx, 640, 250, q.on('weet', 1, 0.4), 110); } }
  },

  // ================= 1 Een knikker op een heuvel =================
  s03(ctx, t, q) { bg(ctx, 'schema'); const y = 330; const cel = (x, yy, r, a = 1) => { ctx.save(); ctx.globalAlpha *= a; _w1cel(ctx, x, yy, r, { kleur: '#F2D9A8', rand: '#C9A27A', dna: true, kr: 0.42 }); ctx.restore(); };
    cel(260, y, 110, ramp(t, 0, 0.5)); naamBij(ctx, 'bevruchte eicel', null, 260, y + 170, ramp(t, 0.2, 0.5), 'center');
    const d2 = q.on('ontstaan', 1, 0.7), d4 = q.on('uit', 1, 0.7), d8 = q.on('bevruchte', 1, 0.8);
    pijl(ctx, 400, y, 480, y, C.text2, d2, 4); if (d2 > 0.01) [-1, 1].forEach(k => cel(560, y + k * 52 * ease(d2), lerp(75, 52, ease(d2)), clamp(d2 * 2, 0, 1)));
    pijl(ctx, 640, y, 720, y, C.text2, d4, 4); if (d4 > 0.01) [[-38, -38], [38, -38], [-38, 38], [38, 38]].forEach(([dx, dy]) => cel(800 + dx * ease(d4), y + dy * ease(d4), lerp(52, 37, ease(d4)), clamp(d4 * 2, 0, 1)));
    pijl(ctx, 870, y, 950, y, C.text2, d8, 4); if (d8 > 0.01) for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283; cel(1070 + Math.cos(an) * 62 * ease(d8), y + Math.sin(an) * 62 * ease(d8), lerp(40, 30, ease(d8)), clamp(d8 * 2, 0, 1)); }
    metaText(ctx, '2 · 4 · 8 CELLEN', 800, y + 180, rgba(C.text2, d8), 'center', 26);
    const zA = q.on('Ze', 1, 0.6); ctx.save(); ctx.globalAlpha *= zA; _w1levercel(ctx, 1320, 330, 110, { dna: true, kr: 0.42 }); zenuwcel(ctx, 1640, 320, { s: 1.0, naar: [1800, 400], col: C.paars, kernCol: rgba(C.paars, 0.3), takken: 5 }); ctx.restore();
    naamBij(ctx, 'levercel', null, 1320, 500, zA, 'center'); naamBij(ctx, 'zenuwcel', null, 1700, 500, zA, 'center');
    const hz = q.on('hetzelfde', 1, 0.5); pijl(ctx, 1320, 530, 1100, 625, C.text2, 0.6 * hz, 3); pijl(ctx, 1700, 530, 1500, 625, C.text2, 0.6 * hz, 3);
    ctx.save(); ctx.globalAlpha *= hz; roundRect(ctx, 200, 640, 1520, 160, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.5), 2); ctx.restore();
    const dn = ramp(t, q.at('hetzelfde'), 0.7); if (dn > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(200, 640, 1520 * dn, 160); ctx.clip(); dnaDraad(ctx, _w1dnaPunten(260, 1660, 720, 22, 120), { w: 10, helix: false, glad: false, fase: t * 0.3 }); ctx.restore(); }
    metaText(ctx, 'IN ELKE CEL HETZELFDE DNA', 960, 850, rgba(C.text2, ramp(t, q.at('hetzelfde') + 0.3, 0.4)), 'center', 26);
  },
  s04(ctx, t, q) { const m = q.on('insuline', 1, 0.4); _d1kaart(ctx, ['Een levercel heeft het gen voor insuline.', 'Wat is er met dat gen aan de hand?'],
      ['Het is weggeknipt toen de cel levercel werd', 'Het is er nog, maar het staat uit', 'Het staat aan, maar de cel breekt het eiwit meteen af'], (c) => {
        _w1levercel(c, 1620, 560, 230, { kr: 0.6 }); c.save(); c.beginPath(); c.arc(1620 + 230 * 0.05, 560 - 230 * 0.04, 230 * 0.6 - 4, 0, 6.283); c.clip();
        _d1genStrook(c, 1490, 1770, 540, [{ u0: 0.38, u1: 0.66, merk: 0.4 + 0.6 * m }], { amp: 14, w: 7, labels: false, fase: t * 0.2 }); c.restore();
        c.save(); c.globalAlpha *= 0.4 + 0.6 * m; text(c, 'insuline', 1632, 630, fTekst(36, 700), C.goud, 'center'); c.restore(); naamBij(c, 'levercel', null, 1620, 840, 1, 'center'); });
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    const merk = q.on('gen', 1, 0.4) * _d1UIT(t, q.at('uit') + 0.3, 0.6), insUit = q.on('uit', 1, 0.6), zA = q.on('elke', 1, 0.7), aan = ramp(t, q.at('aan') - 0.3, 0.4), uit2 = ramp(t, q.at('uit', 2) - 0.1, 0.3);
    const panel = (x0, titel, celFn, rol, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; celFn(); naamBij(ctx, titel, null, x0 + 380, 420, 1, 'center');
      roundRect(ctx, x0, 470, 760, 300, 150); shape(ctx, rgba(C.paars, 0.16), C.kernR, 3); metaText(ctx, 'KERN', x0 + 380, 510, C.kernR, 'center', 26);
      const G = rol === 'lever' ? [{ u0: 0.03, u1: 0.22, naam: 'insuline', merk, uit: insUit }, { u0: 0.3, u1: 0.42, naam: 'lever', aan }, { u0: 0.46, u1: 0.58, aan }, { u0: 0.68, u1: 0.8, naam: 'zenuw', uit: uit2 }, { u0: 0.84, u1: 0.96, uit: uit2 }]
        : [{ u0: 0.03, u1: 0.22, naam: 'insuline', uit: Math.max(insUit, uit2) }, { u0: 0.3, u1: 0.42, naam: 'lever', uit: uit2 }, { u0: 0.46, u1: 0.58, uit: uit2 }, { u0: 0.68, u1: 0.8, naam: 'zenuw', aan }, { u0: 0.84, u1: 0.96, aan }];
      _d1genStrook(ctx, x0 + 60, x0 + 700, 600, G, { amp: 18, w: 8, fase: t * 0.15 }); ctx.restore(); };
    panel(140, 'levercel', () => _w1levercel(ctx, 520, 260, 110, { kr: 0.42, dna: true }), 'lever', 1);
    panel(1020, 'zenuwcel', () => zenuwcel(ctx, 1360, 260, { s: 1.0, naar: [1520, 290], col: C.paars, kernCol: rgba(C.paars, 0.3), takken: 5 }), 'zenuw', zA);
    ctx.save(); ctx.globalAlpha *= aan; roundRect(ctx, 700, 818, 70, 26, 13); ctx.fillStyle = rgba(C.groen, 0.85); ctx.fill(); text(ctx, 'gen staat aan', 790, 842, fTekst(36, 600), C.text, 'left');
    roundRect(ctx, 1060, 818, 70, 26, 13); ctx.fillStyle = rgba(C.line, 0.3); ctx.fill(); text(ctx, 'staat uit', 1150, 842, fTekst(36, 600), C.text2, 'left'); ctx.restore();
  },
  // landschap: s07–s10 in één vaste stand (generieke boom), zodat er tussen de alinea's niets springt
  s07(ctx, t, q) { bg(ctx, 'schema'); const hill = q.on('beeld', 1, 1.0), groei = ramp(t, q.at('Waddington') - 0.6, 2.2);
    _d1land(ctx, 300, 200, 1320, 400, { boom: _W1_BOOM4, labels: false, hillA: hill, groei });
    metaText(ctx, 'LANDSCHAP VAN WADDINGTON', 960, 760, rgba(C.text2, q.on('Waddington', 1, 0.6)), 'center', 26);
    metaText(ctx, 'MODEL', W - 80, 78, rgba(C.goud, q.on('model', 1, 0.5)), 'right', 26);
    // 'genen aan en uit': een strookje DNA rechtsboven, genen gaan aan en uit
    const gA = q.on('genen', 1, 0.5); if (gA > 0.01) { ctx.save(); ctx.globalAlpha *= gA; roundRect(ctx, 1460, 120, 400, 110, 16); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 2);
      const a1 = q.on('aan', 1, 0.3), u1 = q.on('uit', 1, 0.3), fl = (k) => 0.5 + 0.5 * Math.sin(t * 2.4 + k * 2.1);
      _d1genStrook(ctx, 1490, 1830, 175, [{ u0: 0.08, u1: 0.3, aan: a1 * fl(0), uit: u1 * (1 - fl(0)) }, { u0: 0.4, u1: 0.6, aan: a1 * (1 - fl(1)), uit: u1 * fl(1) }, { u0: 0.7, u1: 0.92, aan: a1 * fl(2), uit: u1 * (1 - fl(2)) }], { amp: 10, w: 6, labels: false }); ctx.restore(); }
    naamBij(ctx, 'heuvel', null, 960, 255, q.on('heuvel', 1, 0.5) * _d1UIT(t, q.at('genen'), 0.6), 'center', C.text2);
  },
  s08(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL', W - 80, 78, C.goud, 'right', 26);
    const R = _d1land(ctx, 300, 200, 1320, 400, { boom: _W1_BOOM4, labels: false });
    metaText(ctx, 'LANDSCHAP VAN WADDINGTON', 960, 760, C.text2, 'center', 26);
    // de dalen lichten op: eerst de eerste splitsing, dan de volgende
    const hl = (lv, a) => { if (a <= 0.01) return; R.knopen.filter(k => k.d === lv).forEach(k => { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const p = _d1bez(k.ouder, k, i / 24); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); }); };
    hl(1, q.on('dalen', 1, 0.5) * _d1UIT(t, q.at('splitsen'), 0.5)); hl(2, q.on('splitsen', 1, 0.5) * _d1UIT(t, q.at('weer') + 0.2, 0.6));
    const k = q.on('knikker', 1, 0.5), u = clamp((t - q.at('knikker')) / 0.7, 0, 1), val = u < 1 ? (1 - u * u) : 0, stuit = u >= 1 ? Math.abs(Math.sin((t - q.at('knikker') - 0.7) * 9)) * Math.exp(-(t - q.at('knikker') - 0.7) * 5) * 22 : 0;
    _d1knikker(ctx, R.top[0], R.top[1] - 260 * val - stuit, C.goud, '#8A6510', k);
    naamBij(ctx, 'knikker', null, R.top[0] + 40, R.top[1] - 20, k * _d1UIT(t, q.at('top'), 0.5), 'left', C.goud);
    naamBij(ctx, 'top', null, R.top[0] + 40, R.top[1] - 20, q.on('top', 1, 0.4) * _d1UIT(t, q.at('dalen') + 0.4, 0.5), 'left', C.text2);
  },
  s09(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL', W - 80, 78, C.goud, 'right', 26);
    const R = _d1land(ctx, 300, 200, 1320, 400, { boom: _W1_BOOM4, labels: false }); metaText(ctx, 'LANDSCHAP VAN WADDINGTON', 960, 760, rgba(C.text2, _d1UIT(t, q.at('onderaan'), 0.5)), 'center', 26);
    const cA = q.on('cel', 1, 0.5); _d1knikker(ctx, R.top[0], R.top[1], C.goud, '#8A6510', 1, cA); _d1ring(ctx, R.top[0], R.top[1], 30 + 3 * Math.sin(t * 4), cA * _d1UIT(t, q.at('Elk'), 0.5), C.goud, 3);
    naamBij(ctx, 'cel', null, R.top[0] + 40, R.top[1] - 20, cA * _d1UIT(t, q.at('Elk') + 0.4, 0.5), 'left', C.goud);
    const dal = q.on('dal', 1, 0.4) * _d1UIT(t, q.at('spiercel'), 0.6);
    const tijd = { spiercel: q.at('spiercel'), zenuwcel: q.at('zenuwcel'), huidcel: q.at('celsoort'), levercel: q.at('levercel') };
    R.knopen.filter(k => !k.b.k).forEach(k => { _d1ring(ctx, k.x, k.y, 26, dal, C.goud, 3); const a = ramp(t, tijd[k.b.n], 0.5); if (a <= 0.01) return; _d1cel(ctx, k, a); });
  },
  s10(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL', W - 80, 78, C.goud, 'right', 26);
    const PAD = ['  ', 'huidcel'], r1 = ramp(t, q.at('Bij'), q.at('rolt') + 0.6 - q.at('Bij')), r2 = ramp(t, q.at('af') - 0.2, 1.2), u = (r1 + r2);
    const dim = Math.max(q.on('vallen', 1, 0.6) * 0.5, ramp(t, q.at('af') + 0.6, 0.6));
    const R = _d1land(ctx, 300, 200, 1320, 400, { boom: _W1_BOOM4, labels: false, pad: u > 0.01 ? (r2 > 0.01 ? PAD : ['  ']) : [], dimA: dim });
    // alle kanten op: stippellijntjes van de top naar elk dal
    const ak = q.on('kanten', 1, 0.5) * _d1UIT(t, q.at('Bij'), 0.5); if (ak > 0.01) R.knopen.filter(k => !k.b.k).forEach(k => { const keten = []; for (let z = k; z; z = z.ouder) keten.unshift(z); ctx.save(); ctx.globalAlpha *= ak; ctx.setLineDash([12, 9]); ctx.strokeStyle = C.goud; ctx.lineWidth = 5;
      ctx.beginPath(); for (let i = 1; i < keten.length; i++) for (let j = 0; j <= 16; j++) { const p = _d1bez(keten[i - 1], keten[i], j / 16); (i === 1 && j === 0) ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); });
    const wieb = ramp(t, 0, 0.3) * _d1UIT(t, q.at('op') + 0.3, 0.4) * Math.sin(t * 7) * 10; _d1knikker(ctx, R.top[0] + wieb, R.top[1], C.goud, '#8A6510', 1, 1);
    if (u > 0.01) { const p = R.punt(PAD, u); _d1knikker(ctx, p[0], p[1], C.teal, '#2E5A78', clamp(u * 6, 0, 1), 1); }
    R.knopen.filter(k => !k.b.k).forEach(k => _d1cel(ctx, k, R.alfa(k), k.b.n === 'huidcel' ? q.on('huid', 1, 0.4) : 0));
    const lv = R.knopen.find(k => k.b.n === 'levercel'); _d1kruis(ctx, lv.x, lv.y + 130, 56, q.on('geen', 1, 0.4));
  },
  s11(ctx, t, q) { bg(ctx, 'schema'); const ov = ramp(t, 0.1, 0.8);
    if (ov < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ov; const R0 = _d1land(ctx, 300, 200, 1320, 400, { boom: _W1_BOOM4, labels: false, pad: ['  ', 'huidcel'] }); _d1knikker(ctx, R0.top[0], R0.top[1], C.goud, '#8A6510', 1, 1);
      const p = R0.punt(['  ', 'huidcel'], 2); _d1knikker(ctx, p[0], p[1], C.teal, '#2E5A78', 1, 1); R0.knopen.filter(k => !k.b.k).forEach(k => _d1cel(ctx, k, R0.alfa(k), k.b.n === 'huidcel' ? 1 : 0)); ctx.restore(); }
    metaText(ctx, 'MODEL', W - 80, 78, rgba(C.goud, _d1UIT(t, q.at('gedachte') - 0.1, 0.4)), 'right', 26); metaText(ctx, 'MODEL · GEDACHTE-EXPERIMENT', W - 80, 78, rgba(C.goud, q.on('gedachte', 1, 0.4)), 'right', 26);
    ctx.save(); ctx.globalAlpha *= ov; _d1s11land(ctx, t, q, ramp(t, q.at('volgen') + 0.3, q.at('ooglens') - q.at('volgen'))); ctx.restore();
  },
  s12(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL · GEDACHTE-EXPERIMENT', W - 80, 78, C.goud, 'right', 26); _d1s11land(ctx, t, q, 1);
    const kA = q.on('lapjeskat', 1, 0.6); _d1kat(ctx, 1640, 800, 0.85, q.on('vlekken', 1, 0.6), kA); metaText(ctx, 'STRAKS', 1640, 850, rgba(C.text2, kA), 'center', 26);
  },

  // ================= 2 Binnen of buiten =================
  s13(ctx, t, q) { bg(ctx, 'micro'); const r = 300, x = 900, y = 480; const hb = q.on('buitenste', 1, 0.5) * _d1UIT(t, q.at('binnenin') + 0.3, 0.6), hi = q.on('binnenin', 1, 0.5);
    const B = blastocyste(ctx, x, y, r, { hlB: hb, hlI: hi * (0.6 + 0.4 * Math.sin(t * 3)) * 0.8, a: ramp(t, 0, 0.6) });
    metaText(ctx, 'DAG 5', W - 80, 78, rgba(C.goud, q.on('Dag', 1, 0.4)), 'right', 26);
    naamBij(ctx, 'blastocyste', null, x, 120, q.on('blastocyste', 1, 0.5), 'center');
    naamBij(ctx, 'buitenlaag', null, x + r * 1.18, y - 40, q.on('buitenste', 1, 0.5), 'left');
    naamBij(ctx, 'binnenste celmassa', null, x - r * 1.18, B.icm[1] + 10, q.on('klompje', 1, 0.5), 'right', C.goud);
    naamBij(ctx, 'holte', null, x + r * 0.3, y + r * 0.45, 0.8 * q.on('blastocyste', 1, 0.6), 'center', C.text2);
  },
  s14(ctx, t, q) { bg(ctx, 'micro'); const r = 300, x = 900, y = 480; const hb = q.on('placenta', 1, 0.5) * _d1UIT(t, q.at('klompje'), 0.6), hi = q.on('klompje', 1, 0.5) * _d1UIT(t, q.at('jij'), 0.6);
    const B = blastocyste(ctx, x, y, r, { hlB: hb, hlI: hi });
    metaText(ctx, 'DAG 5', W - 80, 78, C.goud, 'right', 26); naamBij(ctx, 'blastocyste', null, x, 120, _d1UIT(t, 0.3, 0.6), 'center');
    naamBij(ctx, 'buitenlaag', null, x + r * 1.18, y - 40, 1, 'left'); naamBij(ctx, '', 'wordt deel van de placenta', x + r * 1.18, y - 40, q.on('placenta', 1, 0.5), 'left');
    naamBij(ctx, 'binnenste celmassa', null, x - r * 1.18, B.icm[1] + 10, 1, 'right', C.goud);
    const m = ['jij', 'jij, vruchtvlies', 'jij, vruchtvlies, dooierzak'][t >= q.at('dooierzak') ? 2 : t >= q.at('vruchtvlies') ? 1 : 0];
    naamBij(ctx, '', m, x - r * 1.18, B.icm[1] + 10, q.on('jij', 1, 0.4), 'right');
    const oA = q.on('jij', 1, 0.5), cx = B.icm[0] + 0.9 * r * 0.14, cy = B.icm[1] + 0.3 * r * 0.14; ctx.save(); ctx.globalAlpha *= oA; onzeCel(ctx, cx, cy, r * 0.12); ctx.restore();
    naamBij(ctx, 'onze cel', null, cx + 70, cy - 70, oA, 'left', C.goud); naamBij(ctx, 'holte', null, x + r * 0.3, y + r * 0.45, 0.8, 'center', C.text2);
  },
  s15(ctx, t, q) { _d1kaart(ctx, ['Wat bepaalt of een cel in de buitenlaag', 'of in het klompje terechtkomt?'],
      ['Waar de cel ligt: aan de rand of middenin', 'Buitencellen hebben ander DNA dan binnencellen', 'De cellen zijn vanaf de eerste deling al verschillend en blijven dat'], (c) => {
        blastocyste(c, 1680, 640, 170, { hlB: q.on('buitenlaag', 1, 0.4) * _d1UIT(t, q.at('klompje'), 0.4), hlI: q.on('klompje', 1, 0.4), icm: _d1PI * 0.85 + 0.08 * Math.sin(t * 0.6) }); });
  },
  s17(ctx, t, q) { bg(ctx, 'micro'); difLabel(ctx, 'VEREENVOUDIGD'); const cx = 640, cy = 500, R = 330;
    const vrij = q.on('vrij', 1, 0.5), bu = q.on('buitenkant', 1, 0.5), bi = q.on('binnenin', 1, 0.5), bur = q.on('buren', 1, 0.4);
    const st = {}; for (let i = 0; i < 16; i++) st[i] = { aan: i < 11 ? [0, 1] : [2, 3], aanA: 0 };
    st[1] = { aan: [0, 1], aanA: 0, vrij, rand: bu > 0.5 ? C.teal : '#C9A27A', lw: 2 + 2 * bu };
    [0, 2, 12, 13, 14, 15].forEach(i => { if (i === 0 || i === 2) return; st[i].rand = _mixHex('#C9A27A', C.goud, bur * (0.5 + 0.5 * Math.sin(t * 6))); st[i].lw = 2 + 2 * bur; });
    const cel = _d1morula(ctx, cx, cy, R, st); ctx.save(); ctx.globalAlpha *= bi; ctx.beginPath(); bioPad(ctx, cel[11].pts, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    naamBij(ctx, 'buitencel', null, cx + R * 1.12, cel[1].c[1] + 40, bu, 'left', C.teal); naamBij(ctx, '', 'één kant vrij', cx + R * 1.12, cel[1].c[1] + 40, vrij, 'left');
    naamBij(ctx, 'onze cel', null, cx - R * 1.14, cy + 10, bi, 'right', C.goud); naamBij(ctx, '', 'overal buren', cx - R * 1.14, cy + 10, bur, 'right');
    metaText(ctx, '± 16 CELLEN · DAG 3–4', cx, 122, rgba(C.text2, q.on('plek', 1, 0.5)), 'center', 26);
  },
  s18(ctx, t, q) { bg(ctx, 'micro'); difLabel(ctx, 'VEREENVOUDIGD'); const cx = 640, cy = 500, R = 330;
    const aanA = q.on('aan', 1, 0.6), kz = q.on('genen', 1, 0.5), exp = q.on('buitencel', 2, 0.5), mv = ramp(t, q.at('binnen', 2) - 0.3, 1.0), wissel = q.on('gedragen', 1, 0.8), tgt = 12;
    const hlBu = q.on('buitencellen', 1, 0.4) * _d1UIT(t, q.at('binnencellen'), 0.4), hlBi = q.on('binnencellen', 1, 0.4) * _d1UIT(t, q.at('muizenembryo'), 0.5);
    const st = {}; for (let i = 0; i < 16; i++) st[i] = { aan: i < 11 ? [0, 1] : [2, 3], aanA, rand: i < 11 ? _mixHex('#C9A27A', C.teal, hlBu) : (i === 11 ? '#C9A27A' : _mixHex('#C9A27A', C.goud, hlBi)), lw: 2 + 2 * (i < 11 ? hlBu : hlBi) };
    st[1].vrij = _d1UIT(t, q.at('Dat'), 0.5);
    st[tgt].leeg = ramp(mv, 0.1, 0.5) * (1 - ramp(mv, 0.9, 0.1)); // plaats maken
    const land = ramp(mv, 0.95, 0.05); if (land > 0) st[tgt] = { aan: wissel > 0.5 ? [2, 3] : [0, 1], aanA: wissel > 0.5 ? (wissel - 0.5) * 2 : 1 - wissel * 2, rand: C.teal, lw: 7 };
    const cel = _d1morula(ctx, cx, cy, R, st);
    ctx.save(); ctx.globalAlpha *= _d1UIT(t, q.at('muizenembryo'), 0.5); ctx.beginPath(); bioPad(ctx, cel[11].pts, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    // de verplaatste buitencel: van buiten (ander embryo) naar binnen
    const gx = 150, gy = 210; if (exp > 0.01) { ctx.save(); ctx.globalAlpha *= exp * (1 - land); ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.arc(gx, gy, 72, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= exp; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(gx + 70, gy + 30); ctx.quadraticCurveTo(470, 230, cel[tgt].c[0] - 40, cel[tgt].c[1] - 40); ctx.stroke(); ctx.restore();
      if (land < 1) { const u = ease(mv), bx = (1 - u) * (1 - u) * gx + 2 * (1 - u) * u * 470 + u * u * cel[tgt].c[0], by = (1 - u) * (1 - u) * gy + 2 * (1 - u) * u * 230 + u * u * cel[tgt].c[1]; ctx.save(); ctx.globalAlpha *= exp;
        ctx.beginPath(); ctx.arc(bx, by, 52, 0, 6.283); shape(ctx, '#EBC9A0', C.teal, 6); _d1celKern(ctx, bx, by, R * 0.085, [0, 1], 1); ctx.restore(); }
      naamBij(ctx, 'buitencel', 'ander embryo', gx, gy + 120, exp * _d1UIT(t, q.at('binnen', 2) + 0.4, 0.5), 'center', C.teal); }
    naamBij(ctx, 'nu binnenin', null, cx + R * 1.14, cy + 10, land * ramp(t, q.at('binnen', 2) + 0.7, 0.4), 'left', C.teal);
    metaText(ctx, '± 16 CELLEN · DAG 3–4', cx, 122, rgba(C.text2, _d1UIT(t, q.at('muizenembryo'), 0.4)), 'center', 26); metaText(ctx, 'MUIZENEMBRYO · ± 16 CELLEN', cx, 122, rgba(C.text2, q.on('muizenembryo', 1, 0.4)), 'center', 26);
    // kernen uitvergroot: eerst buiten- en binnencel, daarna de verplaatste cel ervoor en erna
    const fase2 = exp; if (kz > 0.01) { ctx.save(); ctx.globalAlpha *= kz;
      _d1kernZoom(ctx, 1470, 300, 130, [0, 1], aanA); naamBij(ctx, 'kern buitencel', null, 1470, 470, 1 - fase2, 'center', C.teal); naamBij(ctx, 'ervoor', null, 1470, 470, fase2, 'center', C.text2);
      ctx.save(); ctx.globalAlpha *= 1 - fase2; _d1kernZoom(ctx, 1470, 640, 130, [2, 3], aanA); ctx.restore();
      if (fase2 > 0.01) { ctx.save(); ctx.globalAlpha *= fase2; _d1kernZoom(ctx, 1470, 640, 130, [0, 1], 1 - wissel); if (wissel > 0.01) { ctx.globalAlpha *= wissel; _d1kernZoom(ctx, 1470, 640, 130, [2, 3], wissel); } ctx.restore(); }
      naamBij(ctx, 'kern binnencel', null, 1470, 810, 1 - fase2, 'center', C.goud); naamBij(ctx, 'erna: binnenpatroon', null, 1470, 810, fase2 * wissel, 'center', C.teal); naamBij(ctx, 'erna', null, 1470, 810, fase2 * (1 - wissel), 'center', C.text2); ctx.restore(); }
  },
  s19(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL', W - 80, 78, C.goud, 'right', 26);
    const u = ramp(t, q.at('rolt') - 0.1, q.at('embryo') - q.at('rolt') + 0.1), dim = q.on('geen', 1, 0.6);
    const R = _d1land(ctx, 180, 200, 1200, 600, { pad: u > 0.01 ? ['embryo'] : [], dimA: dim });
    const p = R.punt(['embryo'], u); _d1knikker(ctx, p[0], p[1], C.goud, '#8A6510', 1, 1); _d1ring(ctx, p[0], p[1], 30, q.on('Onze', 1, 0.4) * _d1UIT(t, q.at('knikker'), 0.5), C.goud, 3);
    naamBij(ctx, 'onze cel', 'ligt binnenin', p[0] + 40, p[1] - 30, q.on('Onze', 1, 0.4) * _d1UIT(t, q.at('knikker'), 0.5), 'left', C.goud);
    const pl = R.knoop('placenta'); _d1kruis(ctx, pl.x + 40, pl.y - 40, 26, dim * 0.9);
    const n = t >= q.at('eerste', 2) ? 4 : 1; ctx.save(); ctx.globalAlpha *= q.on('Positie', 1, 0.5); antwoordTegels(ctx, 1520, 260, 1, q.on('Positie', 1, 0.5) > 0.5 ? 0 : -1); ctx.restore();
    if (n === 4) { ctx.save(); ctx.globalAlpha *= q.on('eerste', 2, 0.5); for (let i = 1; i < 4; i++) { const yy = 260 + i * 96; ctx.save(); ctx.globalAlpha *= 0.25; roundRect(ctx, 1520, yy, 300, 76, 14); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, '?', 1670, yy + 50, fTekst(38, 700), C.text, 'center'); ctx.restore(); } ctx.restore(); }
    const an = q.on('antwoord', 1, 0.4); if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an * (0.6 + 0.4 * Math.sin(t * 5)); roundRect(ctx, 1512, 252, 316, 92, 18); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  },

  // ================= 3 Drie lagen =================
  s20(ctx, t, q) { bg(ctx, 'micro'); metaText(ctx, 'WEEK 3', W - 80, 78, rgba(C.goud, q.on('Week', 1, 0.4)), 'right', 26);
    const plat = q.on('plat', 1, 1.0), streep = ramp(t, q.at('midden') - 0.2, q.at('oerstreep') - q.at('midden') + 0.2), sn = q.on('gleuf', 1, 0.6);
    _d1schijf(ctx, t, { plat, streep, snede: sn, a: ramp(t, 0, 0.5) });
    naamBij(ctx, 'kiemschijf', null, _D1K.dx - 330, _D1K.dy - _D1K.ry - 18, q.on('schijfje', 1, 0.5), 'center');
    naamBij(ctx, 'oerstreep', null, _D1K.dx + 245, _D1K.dy - 52, q.on('oerstreep', 1, 0.5), 'center');
    _d1snede(ctx, t, { gleuf: sn, a: sn }); naamBij(ctx, 'gleuf', null, 850, _D1K.yT - 20, sn, 'center'); naamBij(ctx, 'bovenlaag', null, _D1K.x1 + 30, _D1K.yT + 56, sn, 'left', KB.ecto);
  },
  s21(ctx, t, q) { bg(ctx, 'micro'); const kf = ramp(t, q.at('kiembladen') - 0.3, 0.8);
    if (kf < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - kf; metaText(ctx, 'WEEK 3', W - 80, 78, C.goud, 'right', 26);
      const kr = q.on('kruipen', 1, 0.6), du = q.on('duiken', 1, 0.6), me = ramp(t, q.at('schuiven'), 5.0), en = ramp(t, q.at('schuiven') + 0.8, 5.0);
      _d1schijf(ctx, t, { kruip: kr * _d1UIT(t, q.at('Zo'), 0.6) }); naamBij(ctx, 'kiemschijf', null, _D1K.dx - 330, _D1K.dy - _D1K.ry - 18, 1, 'center'); naamBij(ctx, 'oerstreep', null, _D1K.dx + 245, _D1K.dy - 52, 1, 'center');
      _d1snede(ctx, t, { duik: du, meso: me, endo: en }); naamBij(ctx, 'gleuf', null, 850, _D1K.yT - 20, 1, 'center');
      naamBij(ctx, 'gastrulatie', null, 1680, 160, q.on('gastrulatie', 1, 0.5), 'center', C.goud);
      const dl = q.on('drie', 1, 0.4); naamBij(ctx, 'bovenlaag', null, _D1K.x1 + 30, _D1K.yT + 56, 1, 'left', KB.ecto); naamBij(ctx, 'nieuwe', 'middenlaag', _D1K.x1 + 30, 694, Math.max(dl, 0), 'left', KB.meso); naamBij(ctx, 'nieuwe', 'onderlaag', _D1K.x1 + 30, 812, q.on('lagen', 1, 0.4), 'left', KB.endo);
      ctx.restore(); }
    if (kf > 0.01) { ctx.save(); ctx.globalAlpha *= kf; bg(ctx, 'schema'); ctx.restore(); ctx.save(); ctx.globalAlpha *= kf; _d1banden(ctx, {}); ctx.restore(); }
  },
  s22(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('Daaruit', 1, 0.5), act = q.on('bovenste', 1, 0.4);
    _d1banden(ctx, { a: [1, lerp(1, 0.5, act), lerp(1, 0.5, act)], naam: [q.on('ectoderm', 1, 0.5), 0, 0], hl: [act * q.on('ectoderm', 1, 0.5) * _d1UIT(t, q.at('Daaruit'), 0.5), 0, 0], pijl: [d, 0, 0],
      ic: [[ramp(t, q.at('opperhuid') - 0.15, 0.6), ramp(t, q.at('hersenen') - 0.15, 0.6), ramp(t, q.at('zenuwen') - 0.15, 0.6), ramp(t, q.at('lens') - 0.15, 0.6)], [0, 0, 0, 0], [0, 0, 0, 0]] });
  },
  s23(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('Daaruit', 1, 0.5), act = q.on('middelste', 1, 0.4);
    _d1banden(ctx, { a: [lerp(1, 0.5, act) , 1, 0.5], naam: [1, q.on('mesoderm', 1, 0.5), 0], hl: [0, q.on('mesoderm', 1, 0.5) * _d1UIT(t, q.at('Daaruit'), 0.5), 0], pijl: [1, d, 0],
      ic: [[1, 1, 1, 1], [ramp(t, q.at('spieren') - 0.15, 0.6), ramp(t, q.at('botten') - 0.15, 0.6), ramp(t, q.at('bloed') - 0.15, 0.6), ramp(t, q.at('nieren') - 0.15, 0.6)], [0, 0, 0, 0]] });
  },
  s24(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('Daaruit', 1, 0.5), act = q.on('onderste', 1, 0.4);
    _d1banden(ctx, { a: [0.5, lerp(1, 0.5, act), lerp(0.5, 1, act)], naam: [1, 1, q.on('endoderm', 1, 0.5)], hl: [0, 0, q.on('endoderm', 1, 0.5) * _d1UIT(t, q.at('Daaruit'), 0.5)], pijl: [1, 1, d],
      ic: [[1, 1, 1, 1], [1, 1, 1, 1], [ramp(t, q.at('darm') - 0.15, 0.6), ramp(t, q.at('longen') - 0.15, 0.6), ramp(t, q.at('lever') - 0.15, 0.6), ramp(t, q.at('alvleesklier') - 0.15, 0.6)]] });
  },
  s25(ctx, t, q) { const ov = ramp(t, 0, 0.6), lw = ramp(t, q.at('Weer') - 0.3, 0.7);
    bg(ctx, 'schema'); if (ov < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ov; _d1banden(ctx, { a: [0.5, 0.5, 1], naam: [1, 1, 1], pijl: [1, 1, 1], ic: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]] }); ctx.restore(); }
    if (lw < 0.99 && ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov * (1 - lw); bg(ctx, 'micro'); ctx.restore(); ctx.save(); ctx.globalAlpha *= ov * (1 - lw);
      metaText(ctx, 'WEEK 3', W - 80, 78, C.goud, 'right', 26);
      const O = { a: q.on('Onze', 1, 0.5), ring: q.on('boven', 1, 0.4) * _d1UIT(t, q.at('ectoderm') + 0.6, 0.5) }; _d1snede(ctx, t, { duik: 1, meso: 1, endo: 1, onze: O });
      _d1schijf(ctx, t, { kruip: 0.5, a: 0.35 });
      naamBij(ctx, 'gleuf', null, 850, _D1K.yT - 20, 1, 'center');
      if (O.p) { naamBij(ctx, 'onze cel', null, O.p[0], O.p[1] - 26, O.a, 'center', C.goud);
        const ni = q.on('niet', 1, 0.4); ctx.save(); ctx.globalAlpha *= ni; ctx.setLineDash([6, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(O.p[0] - 30, O.p[1] + 40); ctx.quadraticCurveTo(O.p[0] - 200, O.p[1] - 40, 880, _D1K.yT + 30); ctx.stroke(); ctx.restore();
        _d1kruis(ctx, O.p[0] - 190, O.p[1] - 10, 26, ni); }
      const ek = q.on('ectoderm', 1, 0.5); naamBij(ctx, 'bovenlaag', null, _D1K.x1 + 30, _D1K.yT + 56, 1 - ek, 'left', KB.ecto); naamBij(ctx, 'ectoderm', null, _D1K.x1 + 30, _D1K.yT + 56, ek, 'left', KB.ecto);
      naamBij(ctx, 'middenlaag', null, _D1K.x1 + 30, 708, 1, 'left', KB.meso); naamBij(ctx, 'onderlaag', null, _D1K.x1 + 30, 826, 1, 'left', KB.endo); ctx.restore(); }
    if (lw > 0.01) { ctx.save(); ctx.globalAlpha *= lw; bg(ctx, 'schema'); metaText(ctx, 'MODEL', W - 80, 78, C.goud, 'right', 26);
      const u = 1 + ramp(t, q.at('dieper') - 0.4, 1.0), R = _d1land(ctx, 180, 200, 1200, 600, { pad: ['embryo', 'ectoderm'], dimA: q.on('Levercel', 1, 0.7) });
      const p = R.punt(['embryo', 'ectoderm'], u); _d1knikker(ctx, p[0], p[1], C.goud, '#8A6510', 1, 1); antwoordTegels(ctx, 1520, 260, 1, -1);
      ['mesoderm', 'endoderm'].forEach(n => { const k = R.knoop(n); _d1kruis(ctx, k.x - 34, k.y - 40, 22, q.on(n === 'mesoderm' ? 'spiercel' : 'Levercel', 1, 0.4) * 0.9); }); ctx.restore(); }
  },
  s26(ctx, t, q) { const pomp = q.on('pompt', 1, 0.3), sl = Math.max(0, Math.sin(t * 2 * _d1PI * 1.3)) ** 2;
    _d1kaart(ctx, ['Uit welke laag komt je hart?', 'Het pompt bloed en het bestaat uit spierweefsel.'], ['Ectoderm', 'Mesoderm', 'Endoderm'], (c) => {
      [['ectoderm', KB.ecto], ['mesoderm', KB.meso], ['endoderm', KB.endo]].forEach(([n, col], i) => { const y = 470 + i * 96; roundRect(c, 1420, y, 400, 82, 14); shape(c, _mixHex(col, C.bgSchema, 0.55), col, 3); text(c, n, 1620, y + 54, fTekst(36, 700), C.text, 'center'); });
      _w1hart(c, 1620, 300, 1.05 * (1 + 0.06 * sl * pomp), { vul: '#4A5670', rand: C.line, vul2: '#4A5670' }); });
  },
  s28(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('mesoderm', 1, 0.9), dimA = q.on('middelste', 1, 0.5);
    const B = [['ectoderm', KB.ecto, 170, 0.35], ['mesoderm', KB.meso, 390, 1], ['endoderm', KB.endo, 680, 0.35]];
    B.forEach(([n, col, y, a]) => { ctx.save(); ctx.globalAlpha *= lerp(1, a, dimA); const h = n === 'mesoderm' ? 260 : 170; roundRect(ctx, 260, y, 1400, h, 22); shape(ctx, _mixHex(col, C.bgSchema, 0.6), col, n === 'mesoderm' ? 3 + 3 * k * _d1UIT(t, q.at('Net'), 0.5) : 3); text(ctx, n, 320, y + 60, fTekst(44, 700), C.text, 'left'); ctx.restore(); });
    const sl = Math.max(0, Math.sin(t * 2 * _d1PI * 1.3)) ** 2;
    _w1hart(ctx, 960, lerp(150, 515, ease(k)), lerp(0.7, 0.95, ease(k)) * (1 + 0.05 * sl), { vul: _mixHex('#4A5670', BIO.bloed, k), rand: _mixHex('#8FA0B5', '#7A2A26', k), vul2: _mixHex('#4A5670', C.teal, k) });
    naamBij(ctx, 'hart', null, 1060, 560, ramp(t, q.at('mesoderm') + 0.8, 0.5), 'left');
    const sp = q.on('spieren', 1, 0.5), bl = q.on('bloed', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= sp; spierBundel(ctx, 420, 560, 220, { n: 3, h: 24 }); text(ctx, 'spieren', 530, 640, fTekst(36, 600), C.text, 'center'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= bl; _w1druppel(ctx, 1400, lerp(470, 530, ease(bl)), 0.8); text(ctx, 'bloed', 1410, 640, fTekst(36, 600), C.text, 'center'); ctx.restore();
  },
});

// celicoon onder een dal (w08), met naam
function _d1cel(ctx, k, a = 1, hl = 0) { const actief = hl > 0.01; const ix = k.x, iy = k.y + 130; ctx.save(); ctx.globalAlpha *= a;
  if (k.b.n === 'spiercel') spierBundel(ctx, ix - 90, iy, 180, { n: 3, h: 22 });
  if (k.b.n === 'zenuwcel') zenuwcel(ctx, ix - 30, iy - 10, { s: 0.55, naar: [ix + 80, iy], col: C.paars, takken: 4 });
  if (k.b.n === 'huidcel') _w1huidcellen(ctx, ix, iy, 1);
  if (k.b.n === 'levercel') _w1levercel(ctx, ix, iy, 52, { kr: 0.4 });
  text(ctx, k.b.n, ix, iy + 100, fTekst(36, 600), actief ? _mixHex('#F2F2EE', C.teal, hl) : C.text, 'center'); ctx.restore(); }

// s11/s12: volledige boom met de gouden knikker bovenaan en een stippelpad naar 'lens'
function _d1s11land(ctx, t, q, padU) {
  const R = _d1land(ctx, 160, 200, 1180, 520, {}); const K = (n) => R.knoop(n); const pad = [R.knopen[0], K('embryo'), K('ectoderm'), K('huid en lens'), K('lens')];
  const wieb = q.on('duwt', 1, 0.3) * _d1UIT(t, q.at('Doe'), 0.4) * Math.sin(t * 6) * 8;
  _d1knikker(ctx, R.top[0] + wieb, R.top[1], C.goud, '#8A6510', 1, 1); _d1ring(ctx, R.top[0], R.top[1], 32 + 4 * Math.sin(t * 4), q.on('één', 1, 0.4), C.goud, 3);
  vraagteken(ctx, R.top[0] + 70, R.top[1] - 10, q.on('duwt', 1, 0.4) * _d1UIT(t, q.at('Doe'), 0.5), 80);
  if (padU > 0.001) { ctx.save(); ctx.setLineDash([14, 12]); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; const tot = (pad.length - 1) * padU;
    ctx.beginPath(); for (let i = 1; i < pad.length; i++) { const f = clamp(tot - (i - 1), 0, 1); if (f <= 0) break; for (let j = 0; j <= 20; j++) { const p = _d1bez(pad[i - 1], pad[i], f * j / 20); (i === 1 && j === 0) ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); } } ctx.stroke(); ctx.restore(); }
  const L = K('lens'); _d1ring(ctx, L.x, L.y, 26, ramp(padU, 0.95, 0.05), C.goud, 4);
}

// sbw1.js — storyboard 'Hoe weet een cel wat hij moet worden?', tekenaar 1: scènes w01–w19
// Hulpfuncties met voorvoegsel _w1. Gebruikt lib.js, base.js, lib_bio.js, lib_dif.js (en pop_katten.js voor de lapjeskat).

function _w1bg(ctx, look) { ctx.fillStyle = look === 'micro' ? C.bgMicro : C.bgSchema; ctx.fillRect(0, 0, W, H); }

// ---------- DNA-strook met genen ----------
// genen: [{u0, u1, stand: 'aan'|'uit'|'neutraal'|'merk', naam}]; u = fractie langs de strook
function _w1dnaPunten(x0, x1, y, amp, n = 60, fase = 0) { const P = []; for (let i = 0; i <= n; i++) { const u = i / n; P.push([lerp(x0, x1, u), y + amp * Math.sin(u * 6.283 * 2.2 + fase) + amp * 0.35 * Math.sin(u * 6.283 * 5.1 + 1)]); } return P; }
function _w1deel(P, u0, u1) { const n = P.length - 1; const a = Math.round(u0 * n), b = Math.round(u1 * n); return P.slice(a, b + 1); }
function _w1poly(ctx, P, col, lw) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _w1genStrook(ctx, x0, x1, y, genen, o = {}) {
  const { amp = 16, w = 8, fase = 0, labels = true, lpx = 36 } = o; const P = _w1dnaPunten(x0, x1, y, amp, 80, fase);
  genen.forEach(g => { const S = _w1deel(P, g.u0, g.u1);
    if (g.stand === 'aan') _w1poly(ctx, S, rgba(C.groen, 0.85), w * 3.2);
    else if (g.stand === 'uit') _w1poly(ctx, S, rgba(C.line, 0.18), w * 3.2);
    else if (g.stand === 'merk') _w1poly(ctx, S, rgba(C.goud, 0.35), w * 3.4); });
  dnaDraad(ctx, P, { w, helix: false, glad: false });
  genen.forEach(g => { const S = _w1deel(P, g.u0, g.u1);
    if (g.stand === 'uit') { ctx.save(); ctx.globalAlpha = 0.65; _w1poly(ctx, S, C.bgSchema, w + 2); ctx.globalAlpha = 1; _w1poly(ctx, S, rgba(DNA_BASE.rugR, 0.35), w); ctx.restore(); }
    if (g.stand === 'merk') { ctx.save(); ctx.setLineDash([10, 8]); const xs = S.map(p => p[0]), ys = S.map(p => p[1]); roundRect(ctx, Math.min(...xs) - 14, Math.min(...ys) - 24, Math.max(...xs) - Math.min(...xs) + 28, Math.max(...ys) - Math.min(...ys) + 48, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    if (labels && g.naam) { const m = S[Math.floor(S.length / 2)]; ctx.save(); ctx.globalAlpha *= g.stand === 'uit' ? 0.5 : 1;
      text(ctx, g.naam, m[0], y + amp + 58, fTekst(lpx, 600), g.stand === 'aan' ? C.groen : g.stand === 'merk' ? C.goud : C.text, 'center'); ctx.restore(); } });
  return P;
}

// ---------- cellen ----------
function _w1cel(ctx, x, y, r, o = {}) { // ronde cel met kern; o.kleur cytoplasma, o.rand
  const { kleur = '#D8C9A8', rand = '#B8A584', kern = true, kr = 0.34, a = 1, dna = false } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(kleur, 0.35), rand, Math.max(2, r * 0.035));
  if (kern) { const kx = x + r * 0.05, ky = y - r * 0.04, R = r * kr; ctx.beginPath(); ctx.arc(kx, ky, R, 0, 6.283); shape(ctx, rgba(C.paars, 0.35), C.kernR, Math.max(1.5, r * 0.02));
    if (dna) { ctx.save(); ctx.beginPath(); ctx.arc(kx, ky, R - 3, 0, 6.283); ctx.clip(); const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40, an = u * 6.283 * 1.6; P.push([kx + Math.cos(an * 1.7) * R * 0.6 * (0.4 + 0.6 * u), ky + Math.sin(an * 1.3 + 0.5) * R * 0.55 * (0.5 + 0.5 * u)]); } dnaDraad(ctx, P, { w: Math.max(2.5, R * 0.09), helix: false }); ctx.restore(); } }
  ctx.restore();
}
function _w1levercel(ctx, x, y, r, o = {}) { // levercel: rond, korrelig roodbruin cytoplasma, ronde kern
  ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BIO.leverL, 0.4), BIO.leverL, Math.max(2, r * 0.035));
  for (let i = 0; i < 26; i++) { const an = hash(i * 3.1) * 6.283, d = r * (0.45 + 0.45 * hash(i * 7.3)); ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, r * 0.025, 0, 6.283); ctx.fillStyle = rgba(BIO.lever, 0.6); ctx.fill(); }
  ctx.restore(); _w1cel(ctx, x, y, r, { kleur: BIO.leverL, rand: 'rgba(0,0,0,0)', kr: o.kr || 0.36, dna: o.dna, a: o.a ?? 1 });
}
function _w1huidcellen(ctx, x, y, s = 1) { // stukje opperhuid: drie lagen platte cellen
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const cx = -70 + k * 70 + (r % 2) * 35 - 35 * (r === 2 ? 0 : 0), cy = -30 + r * 30; const hw = 34 - r * 4, hh = 12 + r * 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, hw, hh, 0, 0, 6.283); shape(ctx, '#E3C2A6', '#B98F6E', 2); if (r > 0) { ctx.beginPath(); ctx.ellipse(cx, cy, 8, 5, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.85); ctx.fill(); } }
  ctx.restore();
}

// ---------- morula (± 16 cellen) ----------
function _w1morula(ctx, cx, cy, R, o = {}) {
  const pts = []; for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283 + 0.2; pts.push([cx + Math.cos(an) * R * 0.68, cy + Math.sin(an) * R * 0.68]); }
  pts.push([cx, cy]); for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6; pts.push([cx + Math.cos(an) * R * 0.33, cy + Math.sin(an) * R * 0.33]); }
  const cel = _bioVoronoi('w1mor' + R + '_' + cx, pts, R * 0.5, 8, 60).map((c, i) => ({ i, c: c.c, binnen: i >= 11,
    pts: c.pts.map(p => { const dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy), m = R * 0.97; return d > m ? [cx + dx / d * m, cy + dy / d * m, 1] : [p[0], p[1], 0]; }) }));
  ctx.save(); // zona
  ctx.beginPath(); ctx.arc(cx, cy, R * 1.08, 0, 6.283); ctx.strokeStyle = rgba('#F6EEDC', 0.6); ctx.lineWidth = R * 0.04; ctx.stroke();
  const st = o.stijl || {};
  cel.forEach(c => { if (st[c.i] && st[c.i].leeg) return; ctx.beginPath(); bioPad(ctx, c.pts, true); const s = st[c.i] || {};
    shape(ctx, c.binnen ? '#F2D9A8' : '#EBC9A0', s.rand || '#C9A27A', s.lw || 2);
    const kr = R * 0.085; ctx.beginPath(); ctx.arc(c.c[0], c.c[1], kr, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.85), BIO.kernL, 1.5);
    const aan = s.aan || null; if (aan) for (let b = 0; b < 4; b++) { ctx.fillStyle = aan.includes(b) ? C.groen : rgba('#F2F2EE', 0.25); roundRect(ctx, c.c[0] - kr * 0.6, c.c[1] - kr * 0.62 + b * kr * 0.36, kr * 1.2, kr * 0.2, 2); ctx.fill(); }
    if (s.vrij) { const F = c.pts.filter(p => p[2]); if (F.length > 1) { ctx.beginPath(); F.sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)); F.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = s.vrij; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.stroke(); } } });
  ctx.restore(); return cel;
}
function _w1kernZoom(ctx, x, y, r, aan, o = {}) { // vergrote kern met DNA en vier genen (aan = indexen)
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.paars, 0.22), C.kernR, 3); ctx.beginPath(); ctx.arc(x, y, r - 4, 0, 6.283); ctx.clip();
  const g = [0, 1, 2, 3].map(b => ({ u0: 0.12 + b * 0.2, u1: 0.12 + b * 0.2 + 0.13, stand: aan.includes(b) ? 'aan' : 'uit' }));
  _w1genStrook(ctx, x - r * 0.95, x + r * 0.95, y, g, { amp: r * 0.16, w: 7, labels: false, fase: o.fase || 0 }); ctx.restore();
}

// ---------- organen / iconen ----------
function _w1hart(ctx, x, y, s, o = {}) { // hart, vooraanzicht (punt linksonder in beeld = links in het lichaam)
  const { vul = BIO.bloed, rand = '#7A2A26', a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // aortaboog en longslagader
  ctx.strokeStyle = rand; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(-6, -40); ctx.bezierCurveTo(-10, -110, 50, -120, 58, -70); ctx.stroke();
  ctx.strokeStyle = vul; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-6, -40); ctx.bezierCurveTo(-10, -110, 50, -120, 58, -70); ctx.stroke();
  ctx.strokeStyle = rand; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(18, -30); ctx.lineTo(34, -78); ctx.stroke(); ctx.strokeStyle = o.vul2 || (o.vul ? vul : C.teal); ctx.lineWidth = 18; ctx.stroke();
  // lichaam
  const L = [[-62, -44], [-20, -58], [30, -52], [64, -30], [76, 6], [60, 52], [20, 92], [-20, 118], [-34, 112], [-62, 70], [-80, 20], [-80, -18]];
  ctx.beginPath(); bioPad(ctx, L, true); shape(ctx, vul, rand, 4);
  ctx.beginPath(); ctx.moveTo(18, -44); ctx.bezierCurveTo(4, 10, -6, 60, -26, 112); ctx.strokeStyle = rgba(rand, 0.7); ctx.lineWidth = 3; ctx.stroke(); // tussenschotgroef
  ctx.beginPath(); ctx.ellipse(-56, -36, 26, 20, -0.3, 0, 6.283); shape(ctx, _mixHex(vul.startsWith('#') ? vul : '#C2453E', '#FFFFFF', 0.12), rand, 3); // rechterboezem (oortje)
  ctx.restore();
}
function _w1brein(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.beginPath(); bioPad(ctx, [[-90, 10], [-84, -36], [-50, -66], [0, -74], [52, -62], [86, -30], [92, 8], [70, 30], [30, 34], [0, 46], [-40, 40], [-76, 34]], true); shape(ctx, BIO.brein, BIO.breinD, 3);
  ctx.beginPath(); bioPad(ctx, [[40, 34], [80, 30], [92, 52], [60, 62], [36, 50]], true); shape(ctx, BIO.breinS, BIO.breinD, 2.5); // kleine hersenen
  ctx.strokeStyle = BIO.breinD; ctx.lineWidth = 3; [[[-70, -20], [-50, -10], [-56, 10]], [[-40, -52], [-26, -30], [-36, -8]], [[-6, -66], [0, -40], [-12, -20], [-4, 10]], [[30, -60], [24, -36], [38, -16]], [[60, -40], [54, -14], [70, 4]], [[-36, 20], [-10, 14], [16, 22]]].forEach(P => { ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); });
  ctx.strokeStyle = BIO.breinS; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(26, 42); ctx.lineTo(34, 86); ctx.stroke(); ctx.restore(); }
function _w1oog(ctx, x, y, r, o = {}) { // oogbol in doorsnede (zijaanzicht, voorkant links): hoornvlies, iris, lens, netvlies, oogzenuw
  const { lensGoud = false, a = 1, lensKleur = '#DCEAF2' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineJoin = 'round';
  ctx.strokeStyle = '#C9B8A6'; ctx.lineWidth = r * 0.22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(r * 0.92, r * 0.1); ctx.quadraticCurveTo(r * 1.3, r * 0.15, r * 1.55, r * 0.35); ctx.stroke(); // oogzenuw
  ctx.beginPath(); ctx.arc(0, 0, r, 0.62, 6.283 - 0.62); ctx.closePath(); shape(ctx, '#F2EEE6', '#B8AA98', r * 0.04); // harde oogrok
  ctx.beginPath(); ctx.arc(0, 0, r * 0.9, 0.7, 6.283 - 0.7); ctx.strokeStyle = rgba(C.koraal, 0.75); ctx.lineWidth = r * 0.05; ctx.stroke(); // netvlies
  ctx.beginPath(); ctx.arc(0, 0, r * 0.83, 0, 6.283); ctx.fillStyle = rgba('#BFD6E2', 0.25); ctx.fill(); // glasvocht
  ctx.beginPath(); ctx.arc(-r * 0.5, 0, r * 0.62, Math.PI - 0.95, Math.PI + 0.95); ctx.strokeStyle = '#B8D4E2'; ctx.lineWidth = r * 0.05; ctx.stroke(); // hoornvlies
  ctx.strokeStyle = '#6E8A5A'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.moveTo(-r * 0.78, -r * 0.55); ctx.lineTo(-r * 0.78, -r * 0.2); ctx.moveTo(-r * 0.78, r * 0.55); ctx.lineTo(-r * 0.78, r * 0.2); ctx.stroke(); // iris
  ctx.beginPath(); ctx.ellipse(-r * 0.6, 0, r * 0.13, r * 0.3, 0, 0, 6.283); shape(ctx, lensGoud ? rgba(C.goud, 0.5) : lensKleur, lensGoud ? C.goud : '#9FB8C6', r * 0.025); // lens
  ctx.restore();
}
function _w1bot(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(60, -10); ctx.arc(66, -18, 16, 2.4, 0.4 - 6.283 + 6.283, false); ctx.lineTo(74, 0); ctx.arc(66, 18, 16, -0.4, -2.4 + 6.283); ctx.lineTo(-60, 10); ctx.arc(-66, 18, 16, 0.75, -0.75 - 6.283 + 6.283 + 3.14); ctx.closePath();
  ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s);
  roundRect(ctx, -60, -11, 120, 22, 8); shape(ctx, BIO.bot, BIO.botS, 3); [[-66, -14], [-66, 14], [66, -14], [66, 14]].forEach(([bx, by]) => { ctx.beginPath(); ctx.arc(bx, by, 17, 0, 6.283); shape(ctx, BIO.bot, BIO.botS, 3); });
  roundRect(ctx, -60, -9, 120, 18, 6); ctx.fillStyle = BIO.bot; ctx.fill(); ctx.restore(); }
function _w1druppel(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(10, -30, 42, 0, 42, 22); ctx.arc(0, 22, 42, 0, Math.PI); ctx.bezierCurveTo(-42, 0, -10, -30, 0, -60); shape(ctx, BIO.bloed, '#7A2A26', 3); ctx.restore();
  rodeBloedcel(ctx, x + 50 * s, y + 46 * s, 22 * s, 0.3, 0); }
function _w1nier(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); bioPad(ctx, [[-10, -70], [30, -66], [48, -34], [48, 30], [30, 66], [-10, 70], [-36, 50], [-34, 20], [-18, 6], [-18, -6], [-34, -20], [-36, -50]], true); shape(ctx, '#9A4A3E', '#6E2E26', 3);
  ctx.beginPath(); bioPad(ctx, [[-8, -40], [20, -40], [30, 0], [20, 40], [-8, 40], [-4, 0]], true); ctx.fillStyle = rgba('#C77A66', 0.6); ctx.fill();
  ctx.strokeStyle = '#E3C9A0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.quadraticCurveTo(-34, 30, -30, 80); ctx.stroke(); ctx.restore(); }
function _w1darm(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const P = [[-70, -40], [-30, -60], [20, -56], [60, -40], [56, -10], [10, -20], [-40, -14], [-60, 10], [-20, 20], [30, 10], [62, 22], [50, 50], [0, 52], [-50, 50]];
  const tek = (lw, col) => { ctx.beginPath(); bioPad(ctx, P, false); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }; tek(24, '#A8605A'); tek(18, '#E0A29A'); ctx.restore(); }
function _w1long(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = '#D8D0C4'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, -80); ctx.lineTo(0, -30); ctx.lineTo(-24, -10); ctx.moveTo(0, -30); ctx.lineTo(24, -10); ctx.stroke();
  [[-1], [1]].forEach(([k]) => { ctx.beginPath(); bioPad(ctx, [[k * 12, -40], [k * 40, -62], [k * 66, -30], [k * 76, 30], [k * 66, 70], [k * 30, 66], [k * 12, 20]], true); shape(ctx, '#D98A8A', '#A0504E', 3); });
  ctx.restore(); }
function _w1alvlees(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); bioPad(ctx, [[-80, 10], [-70, -18], [-30, -14], [20, -20], [70, -30], [86, -16], [70, 0], [20, 10], [-20, 22], [-50, 34], [-76, 30]], true); shape(ctx, '#E8C88A', '#B08A4A', 3);
  ctx.strokeStyle = rgba('#B08A4A', 0.6); ctx.lineWidth = 2; for (let k = 0; k < 7; k++) { const bx = -60 + k * 20; ctx.beginPath(); ctx.arc(bx, 4 - k * 2, 9, 0, 6.283); ctx.stroke(); } ctx.restore(); }
function _w1opperhuid(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -80, -50, 160, 100, 10); ctx.save(); ctx.clip(); ctx.fillStyle = '#C98C7A'; ctx.fillRect(-80, -50, 160, 100); // lederhuid
  ctx.beginPath(); ctx.moveTo(-80, -50); ctx.lineTo(80, -50); for (let xx = 80; xx >= -80; xx -= 4) ctx.lineTo(xx, -2 + 10 * Math.sin(xx / 14)); ctx.closePath(); ctx.fillStyle = '#E8C4A8'; ctx.fill();
  ctx.fillStyle = '#F2E2CC'; ctx.fillRect(-80, -50, 160, 14); ctx.strokeStyle = '#B98F6E'; ctx.lineWidth = 1.5; for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(-70 + k * 28 + (r % 2) * 14, -26 + r * 9, 12, 4, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, -80, -50, 160, 100, 10); ctx.strokeStyle = '#8C6A54'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }

// lapjeskat: huiskat als silhouet, gevuld met wit, rood en zwart in vlekken (offscreen masker)
function _w1lapjeskat(ctx, x, y, s, o = {}) {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  huiskat(g, x, y, s, { houding: o.houding || 'zitten', kijk: o.kijk || 1 });
  g.globalCompositeOperation = 'source-atop'; g.fillStyle = rgba('#F2EEE6', 0.92); g.fillRect(0, 0, W, H);
  const vl = o.vlekken || [[-60, -120, 70, 50, '#D9893A'], [10, -150, 60, 44, '#26201C'], [-120, -60, 50, 60, '#26201C'], [40, -60, 56, 40, '#D9893A'], [80, -210, 40, 30, '#D9893A'], [-30, -40, 30, 26, '#26201C']];
  vl.forEach(([dx, dy, rx, ry, col], i) => { g.beginPath(); const P = []; for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283, q = 0.75 + 0.35 * hash(i * 9 + k); P.push([x + dx * s + Math.cos(an) * rx * s * q, y + dy * s + Math.sin(an) * ry * s * q]); } bioPad(g, P, true); g.fillStyle = rgba(col, 0.95); g.fill(); });
  ctx.drawImage(c, 0, 0);
}

// landschap met eigen labels (≥ 36 px) en celtypes onder de dalen
const _W1_BOOM4 = { n: '', k: [{ n: ' ', k: [{ n: 'spiercel' }, { n: 'zenuwcel' }] }, { n: '  ', k: [{ n: 'huidcel' }, { n: 'levercel' }] }] };
function _w1knikker(ctx, x, y, col = C.goud, rand = '#8A6510') { ctx.beginPath(); ctx.arc(x, y, 18, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.stroke(); }

const SBW1 = {
  // ===== Opening =====
  w01(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, 'OPENING'); metaText(ctx, 'DAG 5', W - 80, 78, C.text2, 'right', 26);
    const r = 320, x = 960, y = 520; const B = blastocyste(ctx, x, y, r, {});
    const ix = B.icm[0], iy = B.icm[1]; const cx = ix + 0.9 * r * 0.14, cy = iy + 0.3 * r * 0.14; // één cel van de binnenste celmassa
    onzeCel(ctx, cx, cy, r * 0.12);
    naamBij(ctx, 'onze cel', null, cx + 70, cy + 12, 1, 'left', C.goud);
    metaText(ctx, 'RUIM 100 CELLEN · ± 0,15 MM', W / 2, 1010, C.text2, 'center', 26);
  },
  w02(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, 'OPENING'); metaText(ctx, 'WEEK 8', W - 80, 78, C.text2, 'right', 26);
    const s = 1.55, x = 1000, y = 520; const E = embryoEcht(ctx, x, y, s, {});
    // gouden focuscirkel om het oog
    ctx.beginPath(); ctx.arc(E.oog[0], E.oog[1], 52, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke();
    naamBij(ctx, 'oog', null, E.oog[0] - 76, E.oog[1] - 40, 1, 'right', C.goud);
    naamBij(ctx, 'hart', null, E.hart[0] - 90, E.hart[1] + 12, 1, 'right');
    // schaalbalk: kruin tot stuit ± 3 cm
    const yT = y - 212 * s, yB = y + 228 * s; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1440, yT); ctx.lineTo(1440, yB); ctx.moveTo(1426, yT); ctx.lineTo(1454, yT); ctx.moveTo(1426, yB); ctx.lineTo(1454, yB); ctx.stroke();
    metaText(ctx, '± 3 CM', 1470, (yT + yB) / 2 + 10, C.text2, 'left', 26);
  },
  w03(ctx) {
    _w1bg(ctx, 'schema'); metaText(ctx, 'VWO · EXTRA · CELLEN', W - 80, 78, C.text2, 'right', 26);
    blastocyste(ctx, 960, 290, 120, {});
    pijl(ctx, 1110, 290, 1380, 290, C.text2, 0.7, 4);
    _w1oog(ctx, 1540, 290, 105, {});
    metaText(ctx, 'DAG 5', 960, 470, C.text2, 'center', 26); metaText(ctx, 'OOG · WEEK 8 EN LATER', 1560, 470, C.text2, 'center', 26);
    text(ctx, 'Hoe weet een cel', 960, 680, fTitel(96), C.text, 'center');
    text(ctx, 'wat hij moet worden?', 960, 795, fTitel(96), C.text, 'center');
  },

  // ===== 1 Een knikker op een heuvel =====
  w04(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '1 EEN KNIKKER OP EEN HEUVEL');
    // rij: eicel → 2 → 4 → 8
    const y = 330; const cel = (x, yy, r) => _w1cel(ctx, x, yy, r, { kleur: '#F2D9A8', rand: '#C9A27A', dna: true, kr: 0.42 });
    cel(260, y, 110); naamBij(ctx, 'bevruchte eicel', null, 260, y + 170, 1, 'center');
    pijl(ctx, 400, y, 480, y, C.text2, 1, 4);
    cel(560, y - 52, 52); cel(560, y + 52, 52);
    pijl(ctx, 640, y, 720, y, C.text2, 1, 4);
    [[-38, -38], [38, -38], [-38, 38], [38, 38]].forEach(([dx, dy]) => cel(800 + dx, y + dy, 37));
    pijl(ctx, 870, y, 950, y, C.text2, 1, 4);
    for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283; cel(1070 + Math.cos(an) * 62, y + Math.sin(an) * 62, 30); }
    metaText(ctx, '2 · 4 · 8 CELLEN', 800, y + 180, C.text2, 'center', 26);
    // onder: levercel en zenuwcel met dezelfde DNA-draad
    _w1levercel(ctx, 1320, 330, 110, { dna: true, kr: 0.42 }); naamBij(ctx, 'levercel', null, 1320, 500, 1, 'center');
    zenuwcel(ctx, 1640, 320, { s: 1.0, naar: [1800, 400], col: C.paars, kernCol: rgba(C.paars, 0.3), takken: 5 });
    naamBij(ctx, 'zenuwcel', null, 1700, 500, 1, 'center');
    pijl(ctx, 1320, 530, 1100, 640, C.text2, 0.6, 3); pijl(ctx, 1700, 530, 1500, 640, C.text2, 0.6, 3);
    // zelfde DNA, uitvergroot
    roundRect(ctx, 200, 650, 1520, 190, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.5), 2);
    _w1dnaPunten(260, 1660, 745, 22).length; dnaDraad(ctx, _w1dnaPunten(260, 1660, 745, 22, 120), { w: 10, helix: false, glad: false });
    metaText(ctx, 'IN ELKE CEL HETZELFDE DNA', 960, 890, C.text2, 'center', 26);
  },
  wq05(ctx) {
    difVraagKaart(ctx, ['Een levercel heeft het gen voor insuline.', 'Wat is er met dat gen aan de hand?'],
      ['Het is weggeknipt toen de cel levercel werd', 'Het is er nog, maar het staat uit', 'Het staat aan, maar de cel breekt het eiwit meteen af'], (c) => {
        _w1levercel(c, 1620, 560, 230, { kr: 0.6 });
        c.save(); c.beginPath(); c.arc(1620 + 230 * 0.05, 560 - 230 * 0.04, 230 * 0.6 - 4, 0, 6.283); c.clip();
        _w1genStrook(c, 1490, 1770, 540, [{ u0: 0.38, u1: 0.66, stand: 'merk', naam: '' }], { amp: 14, w: 7, labels: false }); c.restore();
        text(c, 'insuline', 1632, 630, fTekst(36, 700), C.goud, 'center');
        naamBij(c, 'levercel', null, 1620, 840, 1, 'center');
      });
  },
  w06(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '1 EEN KNIKKER OP EEN HEUVEL');
    const panel = (x0, titel, celFn, stand) => {
      celFn(); naamBij(ctx, titel, null, x0 + 380, 420, 1, 'center');
      roundRect(ctx, x0, 470, 760, 300, 150); shape(ctx, rgba(C.paars, 0.16), C.kernR, 3); metaText(ctx, 'KERN', x0 + 380, 510, C.kernR, 'center', 26);
      _w1genStrook(ctx, x0 + 60, x0 + 700, 600, [
        { u0: 0.03, u1: 0.22, stand: stand[0], naam: 'insuline' }, { u0: 0.3, u1: 0.42, stand: stand[1], naam: 'lever' }, { u0: 0.46, u1: 0.58, stand: stand[2] },
        { u0: 0.68, u1: 0.8, stand: stand[3], naam: 'zenuw' }, { u0: 0.84, u1: 0.96, stand: stand[4] }], { amp: 18, w: 8 });
    };
    panel(140, 'levercel', () => _w1levercel(ctx, 520, 260, 110, { kr: 0.42, dna: true }), ['uit', 'aan', 'aan', 'uit', 'uit']);
    panel(1020, 'zenuwcel', () => zenuwcel(ctx, 1360, 260, { s: 1.0, naar: [1520, 290], col: C.paars, kernCol: rgba(C.paars, 0.3), takken: 5 }), ['uit', 'uit', 'uit', 'aan', 'aan']);
    // legenda
    roundRect(ctx, 700, 830, 70, 26, 13); ctx.fillStyle = rgba(C.groen, 0.85); ctx.fill(); text(ctx, 'gen staat aan', 790, 854, fTekst(36, 600), C.text, 'left');
    roundRect(ctx, 1060, 830, 70, 26, 13); ctx.fillStyle = rgba(C.line, 0.3); ctx.fill(); text(ctx, 'staat uit', 1150, 854, fTekst(36, 600), C.text2, 'left');
  },
  w07(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '1 EEN KNIKKER OP EEN HEUVEL'); difLabel(ctx, 'MODEL');
    landschap(ctx, 300, 260, 1320, 520, { boom: _W1_BOOM4, pad: [], labels: false });
    metaText(ctx, 'LANDSCHAP VAN WADDINGTON', 960, 960, C.text2, 'center', 26);
  },
  w08(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '1 EEN KNIKKER OP EEN HEUVEL'); difLabel(ctx, 'MODEL');
    const R = landschap(ctx, 300, 200, 1320, 440, { boom: _W1_BOOM4, pad: ['  ', 'huidcel'], labels: false, knikkerTonen: false });
    const top = R.knopen[0]; _w1knikker(ctx, top.x, top.y - 18); // de gouden knikker staat nog bovenaan
    _w1knikker(ctx, R.knikker[0], R.knikker[1], C.teal, '#2E5A78'); // een andere cel rolt het dal 'huid' in
    R.knopen.filter(k => !k.b.k).forEach(k => { const actief = k.b.n === 'huidcel', a = actief ? 1 : 0.35; ctx.save(); ctx.globalAlpha = a;
      const ix = k.x, iy = k.y + 150;
      if (k.b.n === 'spiercel') spierBundel(ctx, ix - 90, iy, 180, { n: 3, h: 22 });
      if (k.b.n === 'zenuwcel') zenuwcel(ctx, ix - 30, iy - 10, { s: 0.55, naar: [ix + 80, iy], col: C.paars, takken: 4 });
      if (k.b.n === 'huidcel') _w1huidcellen(ctx, ix, iy, 1);
      if (k.b.n === 'levercel') _w1levercel(ctx, ix, iy, 52, { kr: 0.4 });
      text(ctx, k.b.n, ix, iy + 120, fTekst(36, 600), actief ? C.teal : C.text, 'center'); ctx.restore(); });
  },
  w09(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '1 EEN KNIKKER OP EEN HEUVEL'); difLabel(ctx, 'MODEL · GEDACHTE-EXPERIMENT');
    const R = landschap(ctx, 160, 200, 1180, 520, { pad: [], knikker: 0 });
    const K = (n) => R.knopen.find(k => k.b.n === n); const pad = [R.knopen[0], K('embryo'), K('ectoderm'), K('huid en lens'), K('lens')];
    ctx.save(); ctx.setLineDash([14, 12]); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 1; i < pad.length; i++) { const a = pad[i - 1], b = pad[i], my = (a.y + b.y) / 2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.bezierCurveTo(a.x, my, b.x, my, b.x, b.y); ctx.stroke(); } ctx.restore();
    const L = K('lens'); ctx.beginPath(); ctx.arc(L.x, L.y, 26, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke();
    // belofte rechtsonder: lapjeskat
    _w1lapjeskat(ctx, 1640, 830, 0.85, { kijk: -1 });
    metaText(ctx, 'STRAKS', 1640, 880, C.text2, 'center', 26);
  },

  // ===== 2 Binnen of buiten =====
  w10(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, '2 BINNEN OF BUITEN'); metaText(ctx, 'DAG 5', W - 80, 78, C.goud, 'right', 26);
    const r = 340, x = 900, y = 520; const B = blastocyste(ctx, x, y, r, {});
    const ix = B.icm[0], iy = B.icm[1]; onzeCel(ctx, ix + 0.9 * r * 0.14, iy + 0.3 * r * 0.14, r * 0.12);
    naamBij(ctx, 'buitenlaag', 'wordt deel van de placenta', x + r * 1.18, y - 40, 1, 'left');
    naamBij(ctx, 'binnenste celmassa', 'jij en de vliezen', x - r * 1.18, iy + 10, 1, 'right', C.goud);
    naamBij(ctx, 'onze cel', null, ix + 70, iy - 70, 1, 'left', C.goud);
    naamBij(ctx, 'holte', null, x + r * 0.3, y + r * 0.45, 0.8, 'center', C.text2);
  },
  wq11(ctx) {
    difVraagKaart(ctx, ['Wat bepaalt of een cel in de buitenlaag', 'of in het klompje terechtkomt?'],
      ['Waar de cel ligt: aan de rand of middenin', 'Buitencellen hebben ander DNA dan binnencellen', 'De cellen zijn vanaf de eerste deling al verschillend en blijven dat'], (c) => {
        blastocyste(c, 1680, 640, 170, {});
      });
  },
  w12(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, '2 BINNEN OF BUITEN'); difLabel(ctx, 'VEREENVOUDIGD');
    const cx = 640, cy = 530, R = 330; const BUITEN = [0, 1], BINNEN = [2, 3];
    const st = {}; for (let i = 0; i < 16; i++) st[i] = { aan: i < 11 ? BUITEN : BINNEN };
    st[1] = { aan: BUITEN, vrij: C.teal, rand: C.teal, lw: 4 };
    const cel = _w1morula(ctx, cx, cy, R, { stijl: st });
    const bin = cel[11]; onzeCel(ctx, bin.c[0], bin.c[1], 0.001); // (alleen positie)
    ctx.beginPath(); bioPad(ctx, bin.pts, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke();
    const bu = cel[1];
    naamBij(ctx, 'buitencel', 'één kant vrij', cx + R * 1.12, bu.c[1] + 40, 1, 'left', C.teal);
    naamBij(ctx, 'onze cel', 'overal buren', cx - R * 1.14, cy + 10, 1, 'right', C.goud);
    // kernen uitvergroot
    _w1kernZoom(ctx, 1470, 330, 150, BUITEN); naamBij(ctx, 'kern buitencel', null, 1470, 530, 1, 'center', C.teal);
    _w1kernZoom(ctx, 1470, 720, 150, BINNEN, { fase: 0 }); naamBij(ctx, 'kern binnencel', null, 1470, 920, 1, 'center', C.goud);
    metaText(ctx, '± 16 CELLEN · DAG 3–4', cx, 1000, C.text2, 'center', 26);
  },
  w13(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, '2 BINNEN OF BUITEN'); metaText(ctx, 'MUIZENEMBRYO', W - 80, 78, C.text2, 'right', 26);
    const cx = 760, cy = 560, R = 320; const BUITEN = [0, 1], BINNEN = [2, 3];
    const st = {}; for (let i = 0; i < 16; i++) st[i] = { aan: i < 11 ? BUITEN : BINNEN };
    st[11] = { aan: BINNEN, rand: C.teal, lw: 7 }; // de verplaatste cel ligt nu middenin
    const cel = _w1morula(ctx, cx, cy, R, { stijl: st });
    // waar hij vandaan kwam: buitencel van een ander embryo (gestippeld), pijl naar binnen
    const gx = 240, gy = 250; ctx.save(); ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.arc(gx, gy, 72, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    naamBij(ctx, 'buitencel', 'buitenpatroon', gx, gy + 130, 1, 'center', C.teal);
    ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(gx + 80, gy + 20); ctx.quadraticCurveTo(560, 250, cx - 40, cy - 40); ctx.stroke(); ctx.restore();
    pijl(ctx, cx - 70, cy - 66, cx - 38, cy - 38, C.teal, 1, 5, 20);
    naamBij(ctx, 'nu binnenin', null, cx + R * 1.14, cy + 10, 1, 'left', C.teal);
    _w1kernZoom(ctx, 1530, 330, 150, BUITEN); naamBij(ctx, 'ervoor', null, 1530, 530, 1, 'center', C.text2);
    _w1kernZoom(ctx, 1530, 720, 150, BINNEN); naamBij(ctx, 'erna: binnenpatroon', null, 1530, 920, 1, 'center', C.teal);
  },
  w14(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '2 BINNEN OF BUITEN'); difLabel(ctx, 'MODEL');
    landschap(ctx, 180, 200, 1200, 600, { pad: ['embryo'], knikker: 1 }); antwoordTegels(ctx, 1520, 260, 1, 0);
  },

  // ===== 3 Drie lagen =====
  w15(ctx) {
    _w1bg(ctx, 'micro'); difTag(ctx, '3 DRIE LAGEN'); metaText(ctx, 'WEEK 3', W - 80, 78, C.goud, 'right', 26);
    // kiemschijf, schuin van boven: ovale schijf, oerstreep in de middenlijn (staarthelft) met de knoop vlak voorbij het midden
    const dx = 860, dy = 300, rx = 560, ry = 150;
    ctx.beginPath(); ctx.ellipse(dx, dy + 18, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(KB.endo, 0.55); ctx.fill(); // rand van de onderlaag
    ctx.beginPath(); ctx.ellipse(dx, dy, rx, ry, 0, 0, 6.283); shape(ctx, _mixHex(KB.ecto, '#121A26', 0.35), KB.ecto, 3);
    ctx.save(); ctx.beginPath(); ctx.ellipse(dx, dy, rx - 4, ry - 4, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#F2F2EE', 0.08);
    for (let gx = dx - rx; gx < dx + rx; gx += 34) for (let gy = dy - ry; gy < dy + ry; gy += 26) { ctx.beginPath(); ctx.arc(gx + ((gy / 26) % 2) * 17, gy, 10, 0, 6.283); ctx.fill(); } ctx.restore();
    const s0 = dx - 60, s1 = dx + 470; // oerstreep van net voorbij het midden tot de staartkant
    ctx.beginPath(); ctx.moveTo(s0, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy - 26, s1, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy + 26, s0, dy); shape(ctx, _mixHex(KB.ecto, '#FFFFFF', 0.25), _mixHex(KB.ecto, '#FFFFFF', 0.5), 3); // richels
    ctx.beginPath(); ctx.moveTo(s0 + 20, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy - 8, s1 - 30, dy); ctx.quadraticCurveTo((s0 + s1) / 2, dy + 8, s0 + 20, dy); ctx.fillStyle = '#0B1018'; ctx.fill(); // gleuf
    ctx.beginPath(); ctx.ellipse(s0 - 6, dy, 22, 14, 0, 0, 6.283); shape(ctx, _mixHex(KB.ecto, '#FFFFFF', 0.3), _mixHex(KB.ecto, '#FFFFFF', 0.55), 3); ctx.beginPath(); ctx.ellipse(s0 - 6, dy, 8, 5, 0, 0, 6.283); ctx.fillStyle = '#0B1018'; ctx.fill(); // knoop
    // cellen kruipen naar de streep
    [[-0.1, 1], [0.15, 1], [0.4, 1], [0.65, 1], [-0.1, -1], [0.15, -1], [0.4, -1], [0.65, -1]].forEach(([u, k]) => { const px = lerp(s0, s1, u + 0.12); pijl(ctx, px, dy + k * 110, px, dy + k * 40, rgba('#F2F2EE', 0.75), 1, 4, 14); });
    metaText(ctx, 'KOP', dx - rx - 20, dy + 10, C.text2, 'right', 26); metaText(ctx, 'STAART', dx + rx + 20, dy + 10, C.text2, 'left', 26);
    naamBij(ctx, 'oerstreep', null, (s0 + s1) / 2 + 40, dy - 52, 1, 'center');
    naamBij(ctx, 'kiemschijf', null, dx - 330, dy - ry - 18, 1, 'center');
    // snijlijn van de doorsnede
    const sx = dx + 200; const yy = ry * Math.sqrt(1 - (200 / rx) ** 2);
    ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, dy - yy - 20); ctx.lineTo(sx, dy + yy + 40); ctx.stroke(); ctx.restore();
    metaText(ctx, 'DOORSNEDE', sx + 14, dy + yy + 44, C.goud, 'left', 26);
    // ----- doorsnede -----
    const x0 = 200, x1 = 1500, mid = (x0 + x1) / 2, yT = 560;
    const dip = (x) => 46 * Math.exp(-(((x - mid) / 70) ** 2));
    // onderlaag: midden nieuw endoderm (oker), aan de randen de oude onderlaag (hypoblast, grijs) die opzij wordt geduwd
    for (let x = x0; x < x1; x += 52) { const nieuw = Math.abs(x + 26 - mid) < 360; roundRect(ctx, x + 2, 800, 48, 26, 10); shape(ctx, nieuw ? _mixHex(KB.endo, '#121A26', 0.15) : '#7A8090', nieuw ? KB.endo : '#A0A6B2', 2); ctx.beginPath(); ctx.ellipse(x + 26, 813, 8, 5, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); }
    // middenlaag: losse cellen die zich zijwaarts verspreiden
    for (let i = 0; i < 26; i++) { const k = i % 2 ? 1 : -1, d = 60 + Math.floor(i / 2) * 36 + hash(i) * 14; if (d > 520) continue; const px = mid + k * d, py = 700 + (hash(i * 3.3) - 0.5) * 60;
      ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i * 5) * 3); ctx.beginPath(); bioPad(ctx, [[-22, 0], [-6, -12], [18, -8], [26, 4], [6, 12], [-14, 10]], true); shape(ctx, _mixHex(KB.meso, '#121A26', 0.2), KB.meso, 2); ctx.beginPath(); ctx.arc(0, 0, 6, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); ctx.restore(); }
    pijl(ctx, mid - 120, 660, mid - 360, 660, KB.meso, 1, 5, 18); pijl(ctx, mid + 120, 660, mid + 360, 660, KB.meso, 1, 5, 18);
    // bovenlaag: hoge cellen naast elkaar, met de gleuf in het midden
    for (let x = x0; x < x1; x += 40) { const c = x + 20; if (Math.abs(c - mid) < 34) continue; const d = dip(c); roundRect(ctx, x + 2, yT + d, 36, 86, 12); shape(ctx, _mixHex(KB.ecto, '#121A26', 0.25), KB.ecto, 2); ctx.beginPath(); ctx.ellipse(c, yT + d + 52, 7, 10, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); }
    // cellen duiken de gleuf in (flesvormig) en worden middenlaag
    [[mid - 10, yT + 70, 0.0], [mid + 8, yT + 120, 0.5], [mid - 4, yT + 160, 0.9]].forEach(([px, py, k]) => { const col = _mixHex(KB.ecto, KB.meso, k);
      ctx.save(); ctx.translate(px, py); ctx.beginPath(); bioPad(ctx, [[-6, -40], [6, -40], [16, 0], [12, 24], [-12, 24], [-16, 0]], true); shape(ctx, _mixHex(col, '#121A26', 0.25), col, 2); ctx.beginPath(); ctx.arc(0, 8, 6, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.9); ctx.fill(); ctx.restore(); });
    pijl(ctx, mid + 40, yT + 40, mid + 40, yT + 180, rgba('#F2F2EE', 0.8), 1, 4, 16);
    naamBij(ctx, 'gleuf', null, mid, yT - 20, 1, 'center');
    naamBij(ctx, 'bovenlaag', null, x1 + 30, yT + 56, 1, 'left', KB.ecto);
    naamBij(ctx, 'nieuwe', 'middenlaag', x1 + 30, 694, 1, 'left', KB.meso);
    naamBij(ctx, 'nieuwe', 'onderlaag', x1 + 30, 812, 1, 'left', KB.endo);
  },
  w16(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '3 DRIE LAGEN');
    const B = [['ectoderm', 'bovenste laag', KB.ecto, 150], ['mesoderm', 'middelste laag', KB.meso, 395], ['endoderm', 'onderste laag', KB.endo, 640]];
    B.forEach(([n, m, col, y]) => { roundRect(ctx, 100, y, 520, 200, 18); shape(ctx, _mixHex(col, C.bgSchema, 0.55), col, 3); text(ctx, n, 360, y + 102, fTekst(48, 700), C.text, 'center'); metaText(ctx, m, 360, y + 148, C.text, 'center', 26);
      pijl(ctx, 640, y + 100, 700, y + 100, col, 1, 5, 18); });
    const ic = [
      [[_w1opperhuid, 0.7, 'opperhuid'], [_w1brein, 0.7, 'hersenen'], [(c, x, y) => zenuwcel(c, x - 50, y, { s: 0.6, naar: [x + 80, y + 10], col: C.paars, takken: 4 }), 1, 'zenuwen'], [(c, x, y) => _w1oog(c, x, y, 52, { lensGoud: true }), 1, 'ooglens']],
      [[(c, x, y) => spierBundel(c, x - 80, y, 160, { n: 3, h: 22 }), 1, 'spieren'], [_w1bot, 0.75, 'botten'], [_w1druppel, 0.8, 'bloed'], [_w1nier, 0.75, 'nieren']],
      [[_w1darm, 0.8, 'darm'], [_w1long, 0.75, 'longen'], [(c, x, y) => leverVoor(c, x, y, 0.38), 1, 'lever'], [_w1alvlees, 0.85, 'alvleesklier']]];
    ic.forEach((rij, r) => rij.forEach(([fn, s, naam], k) => { const x = 850 + k * 285, y = B[r][3] + 75; fn(ctx, x, y, s); text(ctx, naam, x, B[r][3] + 185, fTekst(36, 600), C.text, 'center'); }));
  },
  w17(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '3 DRIE LAGEN'); difLabel(ctx, 'MODEL');
    landschap(ctx, 180, 200, 1200, 600, { pad: ['embryo', 'ectoderm'], knikker: 1 }); antwoordTegels(ctx, 1520, 260, 1, -1);
  },
  wq18(ctx) {
    difVraagKaart(ctx, ['Uit welke laag komt je hart?', 'Het pompt bloed en het bestaat uit spierweefsel.'], ['Ectoderm', 'Mesoderm', 'Endoderm'], (c) => {
      [['ectoderm', KB.ecto], ['mesoderm', KB.meso], ['endoderm', KB.endo]].forEach(([n, col], i) => { const y = 470 + i * 96; roundRect(c, 1420, y, 400, 82, 14); shape(c, _mixHex(col, C.bgSchema, 0.55), col, 3); text(c, n, 1620, y + 54, fTekst(36, 700), C.text, 'center'); });
      _w1hart(c, 1620, 300, 1.05, { vul: '#4A5670', rand: C.line, vul2: '#4A5670' });
    });
  },
  w19(ctx) {
    _w1bg(ctx, 'schema'); difTag(ctx, '3 DRIE LAGEN');
    const B = [['ectoderm', KB.ecto, 170, 0.35], ['mesoderm', KB.meso, 390, 1], ['endoderm', KB.endo, 680, 0.35]];
    B.forEach(([n, col, y, a]) => { ctx.save(); ctx.globalAlpha = a; const h = n === 'mesoderm' ? 260 : 170; roundRect(ctx, 260, y, 1400, h, 22); shape(ctx, _mixHex(col, C.bgSchema, 0.6), col, 3); text(ctx, n, 320, y + 60, fTekst(44, 700), C.text, 'left'); ctx.restore(); });
    _w1hart(ctx, 960, 515, 0.95, {});
    naamBij(ctx, 'hart', null, 1060, 560, 1, 'left');
    spierBundel(ctx, 420, 560, 220, { n: 3, h: 24 }); text(ctx, 'spieren', 530, 640, fTekst(36, 600), C.text, 'center');
    _w1druppel(ctx, 1400, 530, 0.8); text(ctx, 'bloed', 1410, 640, fTekst(36, 600), C.text, 'center');
  },
};

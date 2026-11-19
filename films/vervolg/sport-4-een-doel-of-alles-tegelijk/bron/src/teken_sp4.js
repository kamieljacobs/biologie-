// Wat word jij? · Sport en topsport 4 · Eén doel of alles tegelijk? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): goud = snelheid/doel, oker = kracht, groen = conditie/aerobe basis, teal = water en herstel, koraal = let op.
// Op het (crème) papier van het klembord gebruiken we iets donkerdere tinten van dezelfde kleuren (leesbaar op licht papier).
// Proef van Hickson (1980) als grafiek met eerlijke assen (WEEK 1–10); waarden schematisch, vorm volgens B1/B2 (krachtgroep ± +44 %,
// combinatiegroep gelijk tot week 7, daarna vlak en dalend in week 9–10; duurgroep en combinatie conditie ± +20–25 %, krachtgroep ± +4 %).

const SP4 = { muur: '#22324F', raam: '#2C4266', water: '#2F6F8F', waterL: '#5BA4C9', vloer: '#34465F', voeg: '#2A3A52', rand: '#C9D6DE',
  papier: '#F2EEE4', bord: '#8A6A44', inkt: '#3A4458', grijs: '#9AA3B2',
  goud: '#C9962E', oker: '#A87A30', groen: '#3E8E5A', teal: '#2F7FA8', koraal: '#C0563C' };
const SP4_GROND = 840;

// ---------- algemene hulpjes ----------
function SP4_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP4_antw(ctx, s, a = 1) { regel(ctx, s, 120, 150, a, C.groen, 40, 'left', 700); }
function SP4_meta(ctx, s, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, col, al, px); ctx.restore(); }
function SP4_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP4_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
function SP4_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01 || pts.length < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP4_inkt(ctx, s, x, y, px = 26, col = SP4.inkt, al = 'left', gew = 700) { text(ctx, s, x, y, fTekst(px, gew), col, al); }
function SP4_mono(ctx, s, x, y, px = 22, col = SP4.inkt, al = 'left') { ctx.save(); ctx.font = fMeta(px); ctx.fillStyle = col; ctx.textAlign = al; ctx.letterSpacing = '2px'; ctx.fillText(s, x, y); ctx.restore(); }
// grote kaart met kop (+ optionele tweede regel)
function SP4_begrip(ctx, kop, sub, x, y, w, a = 1, col = C.goud) { if (a <= 0.01) return; const h = sub ? 112 : 76; SP4_kaart(ctx, x - w / 2, y, w, h, a, col);
  SP4_laag(ctx, a, () => { text(ctx, kop, x, y + 50, fTekst(38, 800), col, 'center'); if (sub) metaText(ctx, sub, x, y + 92, C.text, 'center', 24); }); }

// ---------- het zwembad (zijaanzicht vanaf de kant): muur, ramen, water, badrand ----------
function SP4_hal(ctx, o = {}) { const { dim = 0, t = 0 } = o; bg(ctx, 'schema');
  ctx.fillStyle = SP4.muur; ctx.fillRect(0, 0, W, 560);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 300; roundRect(ctx, x, 70, 230, 150, 8); shape(ctx, SP4.raam, null); ctx.fillStyle = rgba('#1A2740', 0.8); ctx.fillRect(x + 113, 70, 4, 150); ctx.fillRect(x, 143, 230, 4); }
  // tribune rechts achteraan (treden)
  for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#283A5A' : '#2E4264'; ctx.fillRect(1380 + i * 0, 300 + i * 50, 540, 50); }
  ctx.fillStyle = '#3A5070'; ctx.fillRect(1380, 296, 540, 6);
  // overkant van het bad
  ctx.fillStyle = SP4.rand; ctx.fillRect(0, 548, W, 12);
  // water met lijnen (banen)
  const g = ctx.createLinearGradient(0, 560, 0, 700); g.addColorStop(0, '#2A6585'); g.addColorStop(1, SP4.water); ctx.fillStyle = g; ctx.fillRect(0, 560, W, 140);
  [596, 640, 686].forEach((y, j) => { const n = 60 + j * 6, dx = W / n; for (let i = 0; i <= n; i++) { const x = i * dx + ((t * 6) % dx) * 0; circ(ctx, x, y, 3 + j, i % 5 < 2 ? '#D8573F' : '#F2F2EE'); } });
  ctx.strokeStyle = rgba('#9FD0EA', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { const y = 575 + k * 30; ctx.beginPath(); for (let x = 0; x <= W; x += 40) { const yy = y + Math.sin(x * 0.02 + t * 1.2 + k) * 2; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
  // badrand aan deze kant en de vloer
  ctx.fillStyle = SP4.rand; ctx.fillRect(0, 700, W, 14);
  ctx.fillStyle = SP4.vloer; ctx.fillRect(0, 714, W, H - 714);
  ctx.strokeStyle = SP4.voeg; ctx.lineWidth = 2; for (let y = 760; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let x = 0; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 714); ctx.lineTo(x - 30, 880); ctx.stroke(); }
  if (dim > 0) { ctx.fillStyle = rgba('#1A2740', dim); ctx.fillRect(0, 0, W, H); } }

// startblok in vooraanzicht (op de badrand), nr op de zijkant
function SP4_blok(ctx, x, y, s = 1, nr = '4', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#B8C0C8'; ctx.fillRect(-40, -150, 80, 150); ctx.fillStyle = '#9AA3AE'; ctx.fillRect(16, -150, 24, 150);
  ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(70, -150); ctx.lineTo(62, -186); ctx.lineTo(-62, -176); ctx.closePath(); shape(ctx, '#E8ECEF', '#9AA3AE', 2);
  ctx.fillStyle = '#4A5468'; ctx.fillRect(-62, -184, 124, 8); text(ctx, nr, 0, -88, fTekst(46, 800), '#2A3446', 'center'); ctx.restore(); }

// ---------- klembord ----------
function SP4_klembord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 22); shape(ctx, SP4.bord, '#6E5236', 3);
  roundRect(ctx, x + 40, y + 60, w - 80, h - 90, 6); shape(ctx, SP4.papier, '#D8D0BE', 2);
  roundRect(ctx, x + w / 2 - 110, y - 22, 220, 64, 14); shape(ctx, '#B8C0C8', '#7A8490', 2); roundRect(ctx, x + w / 2 - 40, y - 8, 80, 22, 8); shape(ctx, '#7A8490', null);
  ctx.restore(); return { x: x + 40, y: y + 60, w: w - 80, h: h - 90 }; }
// balk op het papier: label boven, spoor, vulling
function SP4_balk(ctx, x, y, w, h, frac, col, label, a = 1, o = {}) { if (a <= 0.01) return; const { gloed = 0, half = false } = o; ctx.save(); ctx.globalAlpha *= a;
  if (label) SP4_mono(ctx, label, x, y - 14, 24, col);
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#E2DCCD', '#B8B0A0', 1.5);
  if (frac > 0.005) { roundRect(ctx, x, y, Math.max(h * 0.6, w * clamp(frac, 0, 1)), h, 10); shape(ctx, col, null); }
  if (half) { ctx.setLineDash([8, 6]); ctx.strokeStyle = SP4.inkt; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w / 2, y - 6); ctx.lineTo(x + w / 2, y + h + 6); ctx.stroke(); ctx.setLineDash([]); }
  if (gloed > 0.01) { ctx.globalAlpha *= gloed; roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 14); ctx.strokeStyle = SP4.goud; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore(); }
// klembord met de doelen als balken; vals = vulling per balk; n = aantal balken (3 of 4)
const SP4_DOELEN = [['SNELHEID', 'goud'], ['KRACHT', 'oker'], ['DUUR', 'groen'], ['HERSTEL', 'teal']];
function SP4_doelBord(ctx, x, y, w, h, vals, a = 1, o = {}) { const { n = 3, gloed = 0, vierde = 1, half = false } = o; const P = SP4_klembord(ctx, x, y, w, h, a); if (!P) return;
  SP4_laag(ctx, a, () => { SP4_mono(ctx, o.kop || 'DOELEN', P.x + 30, P.y + 50, 24, SP4.grijs);
    const rh = Math.min(120, (P.h - 90) / n); for (let i = 0; i < n; i++) { const [lab, kl] = SP4_DOELEN[i]; const aa = i === 3 ? vierde : 1;
      SP4_laag(ctx, aa, () => SP4_balk(ctx, P.x + 30, P.y + 110 + i * rh, P.w - 60, Math.min(46, rh * 0.42), vals[i] || 0, SP4[kl], lab, 1, { gloed, half })); } }); return P; }

// ---------- grafiek van de proef (twee panelen op het papier) ----------
const SP4_DATA = {
  k: { S: [0, 4, 9, 13, 17, 22, 26, 30, 35, 40, 44], SE: [0, 4, 9, 13, 17, 22, 26, 30, 31, 28, 25], E: [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1] },
  c: { S: [0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4], SE: [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 23], E: [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 22] } };
function SP4_paneel(P, p) { const half = P.w / 2; const x0 = P.x + (p === 'k' ? 70 : half + 60), x1 = P.x + (p === 'k' ? half - 40 : P.w - 50); return { x0, x1, y0: P.y + 90, y1: P.y + 380 }; }
function SP4_pt(G, wk, v) { return [G.x0 + (G.x1 - G.x0) * wk / 10, G.y1 - (G.y1 - G.y0) * v / 50]; }
function SP4_assen(ctx, P, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const p of ['k', 'c']) { const G = SP4_paneel(P, p), kl = p === 'k' ? SP4.oker : SP4.groen;
    SP4_mono(ctx, p === 'k' ? 'KRACHT' : 'CONDITIE', G.x0, G.y0 - 30, 26, kl);
    ctx.strokeStyle = SP4.inkt; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(G.x0, G.y0 - 6); ctx.lineTo(G.x0, G.y1); ctx.lineTo(G.x1 + 10, G.y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(G.x0 - 7, G.y0 + 4); ctx.lineTo(G.x0, G.y0 - 8); ctx.lineTo(G.x0 + 7, G.y0 + 4); ctx.stroke();
    SP4_mono(ctx, 'WINST', G.x0 + 12, G.y0 + 14, 18, SP4.grijs);
    for (let w = 1; w <= 10; w++) { const [xx] = SP4_pt(G, w, 0); ctx.beginPath(); ctx.moveTo(xx, G.y1); ctx.lineTo(xx, G.y1 + 8); ctx.stroke(); SP4_mono(ctx, String(w), xx, G.y1 + 32, 18, SP4.inkt, 'center'); }
    SP4_mono(ctx, 'WEEK', (G.x0 + G.x1) / 2, G.y1 + 62, 20, SP4.grijs, 'center'); }
  ctx.restore(); }
// één lijn tot week wk (mag een breuk zijn)
function SP4_reeks(ctx, P, p, groep, wk, o = {}) { const { a = 1, lw = 6, dash = null, lab = '', labA = 0, kl = null, labDy = -16 } = o; if (a <= 0.01 || wk <= 0) return null;
  const G = SP4_paneel(P, p), d = SP4_DATA[p][groep], pts = []; const n = Math.floor(wk);
  for (let i = 0; i <= Math.min(n, 10); i++) pts.push(SP4_pt(G, i, d[i]));
  if (n < 10 && wk > n) { const u = wk - n; pts.push(SP4_pt(G, wk, d[n] + (d[n + 1] - d[n]) * u)); }
  const col = kl || (p === 'k' ? SP4.oker : SP4.groen); SP4_lijn(ctx, pts, col, lw, a, dash);
  const e = pts[pts.length - 1]; circ(ctx, e[0], e[1], lw * 0.9, col);
  if (lab && labA > 0.01) SP4_laag(ctx, a * labA, () => SP4_inkt(ctx, lab, Math.min(e[0], G.x1) + 4, e[1] + labDy, 24, col, 'right'));
  return e; }

// ---------- zwembad van boven (één bad = één week) ----------
// lanes: drie banen (DUUR groen, KRACHT oker, SNELHEID goud); hl = index van de fel oplichtende baan (-1 = geen)
const SP4_BANEN = [['DUUR', 'groen'], ['KRACHT', 'oker'], ['SNELHEID', 'goud']];
function SP4_badje(ctx, x, y, w, h, hl, a = 1, o = {}) { if (a <= 0.01) return; const { dimA = 0.28 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 8); shape(ctx, SP4.rand, null);
  ctx.fillStyle = '#244E66'; ctx.fillRect(x, y, w, h); const bh = h / 3;
  for (let i = 0; i < 3; i++) { const kl = C[SP4_BANEN[i][1]]; const fel = i === hl; ctx.fillStyle = rgba(kl, fel ? 0.9 : (hl < 0 ? 0.25 : dimA)); ctx.fillRect(x + 4, y + i * bh + 4, w - 8, bh - 8); }
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2; ctx.setLineDash([4, 5]); for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x, y + i * bh); ctx.lineTo(x + w, y + i * bh); ctx.stroke(); } ctx.setLineDash([]);
  ctx.restore(); }
// groot bad van boven voor de titel: 6 banen, lijnen, rimpels
function SP4_badBoven(ctx, x, y, w, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 10); shape(ctx, SP4.rand, null); ctx.fillStyle = SP4.water; ctx.fillRect(x, y, w, h); const n = 6, bh = h / n;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < n; i++) { ctx.fillStyle = '#1F3E5A'; ctx.fillRect(x + 50, y + i * bh + bh / 2 - 4, w - 100, 8); ctx.fillRect(x + w - 60, y + i * bh + bh / 2 - 18, 8, 36); ctx.fillRect(x + 52, y + i * bh + bh / 2 - 18, 8, 36); }
  ctx.strokeStyle = rgba('#9FD0EA', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 14; k++) { const yy = y + 10 + k * h / 14; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const v = yy + Math.sin(xx * 0.03 + t * 1.1 + k * 1.7) * 3; xx === x ? ctx.moveTo(xx, v) : ctx.lineTo(xx, v); } ctx.stroke(); }
  for (let i = 1; i < n; i++) for (let xx = x; xx < x + w; xx += 16) circ(ctx, xx + 8, y + i * bh, 4.5, (Math.floor((xx - x) / 16) % 6 < 2 || xx > x + w - 100 || xx < x + 100) ? '#D8573F' : '#F2F2EE');
  ctx.restore(); ctx.restore(); }

// ---------- tijden, stopwatch, tijdbord ----------
function SP4_tegel(ctx, x, y, w, h, tijd, a = 1, o = {}) { if (a <= 0.01) return; const { kl = C.text, rand = C.line, kop = '50 M', vraag = false } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba('#0D1420', 0.9), rand, 2);
  metaText(ctx, kop, x + w / 2, y + 30, C.grain, 'center', 20);
  if (tijd) text(ctx, tijd, x + w / 2, y + h - 18, fTekst(38, 800), kl, 'center'); else if (vraag) text(ctx, '?', x + w / 2, y + h - 16, fTitel(40), C.goud, 'center');
  ctx.restore(); }
function SP4_stopwatch(ctx, x, y, r, t, a = 1, vraag = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - r * 0.18, y - r * 1.32, r * 0.36, r * 0.3, 4); shape(ctx, '#B8C0C8', null);
  circ(ctx, x, y, r, '#F2F2EE', '#8A94A6', r * 0.12); circ(ctx, x, y, r * 0.78, null, '#C9CED6', 2);
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.66, y + Math.sin(an) * r * 0.66); ctx.lineTo(x + Math.cos(an) * r * 0.76, y + Math.sin(an) * r * 0.76); ctx.stroke(); }
  const an = -Math.PI / 2 + t * 1.2; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.7, y + Math.sin(an) * r * 0.7); ctx.stroke(); circ(ctx, x, y, 6, C.koraal);
  if (vraag) text(ctx, '?', x + r * 1.35, y + r * 0.35, fTitel(r * 1.1), C.goud, 'center'); ctx.restore(); }
function SP4_tijdbord(ctx, x, y, w, h, kop, tijd, a = 1, kl = '#F2C94C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#10161F', '#4A5468', 4); metaText(ctx, kop, x + 30, y + 48, C.text2, 'left', 26);
  text(ctx, tijd, x + w - 34, y + h - 30, `700 ${Math.round(h * 0.5)}px ${F.meta}`, kl, 'right'); ctx.restore(); }

// ---------- energievoorraad (batterij) en spiervezel ----------
function SP4_batterij(ctx, x, y, w, h, frac, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#10161F', '#C9CED6', 4); roundRect(ctx, x + w * 0.35, y - 14, w * 0.3, 16, 4); shape(ctx, '#C9CED6', null);
  const f = clamp(frac, 0, 1), ih = (h - 16) * f; if (ih > 1) { roundRect(ctx, x + 8, y + h - 8 - ih, w - 16, ih, 6); shape(ctx, kl, null); }
  ctx.restore(); }
function SP4_spiervezel(ctx, cx, cy, r) { ctx.fillStyle = '#5A2A2E'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const y = cy + i * r * 0.29, hgt = r * 0.24; roundRect(ctx, cx - r - 20, y - hgt / 2, 2 * r + 40, hgt, hgt / 2); shape(ctx, i % 2 ? '#B8605A' : '#A8524E', '#7A3A3A', 2);
    ctx.save(); roundRect(ctx, cx - r - 20, y - hgt / 2, 2 * r + 40, hgt, hgt / 2); ctx.clip(); ctx.strokeStyle = rgba('#F2D0C0', 0.4); ctx.lineWidth = 2;
    for (let x = cx - r; x < cx + r; x += 10) { ctx.beginPath(); ctx.moveTo(x, y - hgt / 2); ctx.lineTo(x, y + hgt / 2); ctx.stroke(); } ctx.restore(); } }

// ---------- klok met trainingsblokken (kracht = oker, duur = groen) ----------
function SP4_klok(ctx, x, y, r, segs, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#8A94A6', 6);
  for (const [u0, u1, kl] of segs) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 10, -Math.PI / 2 + u0 * 6.283, -Math.PI / 2 + u1 * 6.283); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); }
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 4), y + Math.sin(an) * (r - 4)); ctx.lineTo(x + Math.cos(an) * (r - 16), y + Math.sin(an) * (r - 16)); ctx.stroke(); }
  circ(ctx, x, y, 7, '#4A5468'); ctx.restore(); }

// ---------- slaapkamer: Sam in bed (naar slaper() uit Slaap; ogen dicht via uit:'slaapt') ----------
if (CAST.sam && CAST.sam.garderobe && !CAST.sam.garderobe.pyjama) CAST.sam.garderobe.pyjama = { top: 'tshirt', topKleur: '#6F86B8', topAccent: '#5A70A0', broek: '#5A70A0' }; // pyjamashirt (alleen kleding)
if (CAST.passant && !CAST.passant.garderobe) CAST.passant.garderobe = { gewoon: {}, lab: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#6E8A6A' } }; // figurant als inspanningsfysioloog: alleen een labjas
function SP4_bed(ctx, id, x, y, h, o = {}) { const { a = 1, t = 0, deken = '#4A6FA0', outfit = 'pyjama' } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = (CAST[id].lengte || 1), hh = h * L / 6.1, len = h * L;
  roundRect(ctx, x - 60, y, len + 150, 70, 14); shape(ctx, '#5E4A36', '#3E3024', 2); roundRect(ctx, x - 80, y - 150, 34, 260, 10); shape(ctx, '#6B5338', '#3E3024', 2);
  roundRect(ctx, x - 40, y - 12, len + 100, 26, 10); shape(ctx, '#E6E1D3', '#C9C2B4', 1.5);
  roundRect(ctx, x - 40, y - hh * 1.6, hh * 2.4, hh * 1.5, hh * 0.6); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  const br = Math.sin(t * 1.4) * 0.012; ctx.save(); ctx.translate(x + len + 10, y - hh * 0.98); ctx.rotate(-Math.PI / 2); ctx.scale(1 + br, 1);
  persoon(ctx, id, 0, 0, h, { uit: 'slaapt', t: 0, outfit }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x + hh * 2.1, y - hh * 0.2); ctx.bezierCurveTo(x + hh * 2.4, y - hh * 2.4, x + len * 0.75, y - hh * 2.2, x + len + 60, y - hh * 1.3); ctx.lineTo(x + len + 70, y + 14); ctx.lineTo(x + hh * 2.1, y + 14); ctx.closePath(); shape(ctx, deken, _donker(deken, 0.25), 2);
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + hh * 2.1 + i * len * 0.18, y - hh * (1.9 - i * 0.12)); ctx.lineTo(x + hh * 2.1 + i * len * 0.18, y + 10); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: x + hh * 0.55, y: y - hh * 0.98 }, hh }; }
function SP4_kamer(ctx) { bg(ctx, 'schema'); ctx.fillStyle = '#1F2B44'; ctx.fillRect(0, 0, W, 840); ctx.fillStyle = '#2A2F3E'; ctx.fillRect(0, 840, W, H - 840);
  roundRect(ctx, 1450, 150, 320, 260, 10); shape(ctx, '#0E1626', '#4A5468', 8); ctx.fillStyle = '#4A5468'; ctx.fillRect(1606, 150, 8, 260); ctx.fillRect(1450, 276, 320, 8);
  circ(ctx, 1700, 210, 26, '#E8E2C8'); circ(ctx, 1690, 202, 24, '#0E1626');
  for (let i = 0; i < 6; i++) circ(ctx, 1490 + hash(i) * 110, 180 + hash(i * 3) * 80, 2.5, '#C9CED6'); }
function SP4_nachtkastje(ctx, x, y, w = 200, h = 170) { roundRect(ctx, x, y, w, h, 8); shape(ctx, '#6B5338', '#3E3024', 2); ctx.fillStyle = '#5A4630'; ctx.fillRect(x + 14, y + 30, w - 28, 4); circ(ctx, x + w / 2, y + 70, 6, '#C9A35C'); }
function SP4_wekker(ctx, x, y, a = 1, tijd = '05:30') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 70, 160, 70, 12); shape(ctx, '#10161F', '#4A5468', 3);
  text(ctx, tijd, x, y - 18, `700 40px ${F.meta}`, C.koraal, 'center'); ctx.restore(); }
function SP4_bord(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 70, 16, 0, 0, 6.283); shape(ctx, '#E8ECEF', '#9AA3AE', 2);
  ctx.beginPath(); ctx.ellipse(x - 18, y - 10, 26, 12, 0, 0, 6.283); shape(ctx, '#E0B64A', null); ctx.beginPath(); ctx.ellipse(x + 22, y - 9, 22, 11, 0.2, 0, 6.283); shape(ctx, '#7FC48F', null);
  ctx.beginPath(); ctx.ellipse(x + 2, y - 18, 16, 9, 0, 0, 6.283); shape(ctx, '#E07A5F', null); ctx.restore(); }
function SP4_bidon(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 110, 44, 110, 12); shape(ctx, '#5BA4C9', '#2F7FA8', 2); roundRect(ctx, x - 12, y - 132, 24, 26, 6); shape(ctx, '#2A3446', null); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(x - 14, y - 90, 8, 70); ctx.restore(); }
// week in een kalender; rust = index van de rustdag (teal)
function SP4_week(ctx, x, y, cw, a = 1, o = {}) { if (a <= 0.01) return; const { rust = 6, alles = false, kop = '' } = o; ctx.save(); ctx.globalAlpha *= a;
  if (kop) metaText(ctx, kop, x, y - 18, C.text2, 'left', 24);
  ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'].forEach((d, i) => { const r = alles || i === rust; roundRect(ctx, x + i * (cw + 8), y, cw, cw * 1.1, 8); shape(ctx, r ? rgba(C.teal, 0.85) : rgba('#0D1420', 0.9), r ? C.teal : C.line, 2);
    metaText(ctx, d, x + i * (cw + 8) + cw / 2, y + cw * 0.68, r ? '#0D1420' : C.text2, 'center', 20); }); ctx.restore(); }

// ---------- balans: belasting (oker) tegen herstel (teal) ----------
function SP4_balans(ctx, cx, cy, kant, gewL, a = 1, o = {}) { if (a <= 0.01) return; const { gewR = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const arm = 340, an = clamp(kant, -0.35, 0.35);
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(cx - 70, cy + 380); ctx.lineTo(cx + 70, cy + 380); ctx.lineTo(cx + 14, cy); ctx.lineTo(cx - 14, cy); ctx.closePath(); ctx.fill();
  const lx = cx - Math.cos(an) * arm, ly = cy + Math.sin(an) * arm, rx = cx + Math.cos(an) * arm, ry = cy - Math.sin(an) * arm;
  ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke(); circ(ctx, cx, cy, 14, '#C9CED6');
  const schaal = (px, py, kl, lab, gew) => { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 120, py + 150); ctx.moveTo(px, py); ctx.lineTo(px + 120, py + 150); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 152, 140, 18, 0, 0, 6.283); shape(ctx, rgba(kl, 0.35), kl, 3);
    metaText(ctx, lab, px, py + 210, kl, 'center', 28);
    gew.forEach((g, i) => { if (g.a <= 0.01) return; const gy = py + 132 - i * 54 - (1 - g.a) * 200; ctx.save(); ctx.globalAlpha *= clamp(g.a * 2, 0, 1); ctx.font = fMeta(20); ctx.letterSpacing = '3px'; const ww = Math.max(270, ctx.measureText(g.s).width + 40); ctx.letterSpacing = '0px'; roundRect(ctx, px - ww / 2, gy - 46, ww, 48, 10); shape(ctx, g.kl || kl, null);
      metaText(ctx, g.s, px, gy - 13, '#0D1420', 'center', 20); ctx.restore(); }); };
  schaal(lx, ly, C.oker, 'BELASTING', gewL); schaal(rx, ry, C.teal, 'HERSTEL', [{ s: 'SLAAP · ETEN · RUST', a: gewR, kl: C.teal }]);
  ctx.restore(); }

// ---------- logboekje van de trainer ----------
function SP4_logboek(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 500, 330, 12); shape(ctx, '#2F5FA8', '#264E8C', 3); roundRect(ctx, x + 20, y + 16, 460, 298, 8); shape(ctx, SP4.papier, null);
  SP4_mono(ctx, 'TIJDEN', x + 44, y + 64, 22, SP4.teal); SP4_mono(ctx, 'HOE VOEL JE JE?', x + 214, y + 64, 22, SP4.koraal);
  ctx.strokeStyle = '#D8D0BE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 200, y + 40); ctx.lineTo(x + 200, y + 296); ctx.stroke();
  const rij = [['1:00,4', 3], ['1:00,9', 2], ['1:01,8', 1], ['1:02,4', 0]];
  rij.forEach(([tt, gev], i) => { if (u * 4 < i + 0.5) return; const yy = y + 116 + i * 52; SP4_mono(ctx, tt, x + 44, yy, 24, SP4.inkt);
    for (let k = 0; k < 4; k++) circ(ctx, x + 230 + k * 36, yy - 8, 12, k <= gev ? SP4.groen : '#D8D0BE'); });
  ctx.restore(); }

// ---------- lab (inspanningsfysiologie): tafel met scherm ----------
function SP4_lab(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 360, 22, 6); shape(ctx, '#8A94A6', null); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 840 - y - 22); ctx.fillRect(x + 326, y + 22, 14, 840 - y - 22);
  roundRect(ctx, x + 70, y - 200, 240, 160, 10); shape(ctx, '#10161F', '#4A5468', 6); ctx.fillStyle = '#4A5468'; ctx.fillRect(x + 180, y - 40, 20, 40);
  SP4_lijn(ctx, [[x + 95, y - 70], [x + 140, y - 90], [x + 185, y - 110], [x + 230, y - 140], [x + 285, y - 150]], C.oker, 4);
  SP4_lijn(ctx, [[x + 95, y - 64], [x + 140, y - 80], [x + 185, y - 100], [x + 230, y - 112], [x + 285, y - 124]], C.groen, 4);
  ctx.restore(); }

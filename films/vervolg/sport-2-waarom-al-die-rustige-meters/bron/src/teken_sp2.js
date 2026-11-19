// Wat word jij? · Sport en topsport 2 · Waarom al die rustige meters? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): teal = water, rust, herstel en zone RUSTIG; oker = energie (ATP, lactaat als brandstof) en zone DREMPEL;
// goud = zone SNEL en het doel; groen = de aerobe basis die groeit; koraal = let op.
// Maten: zwemmer staande lengte = lengte in px (1,80 m); bad 50 m, diepte ± 2 m; startblok ± 0,75 m hoog; baanbreedte 2,5 m.
// Figurant in het water: Daan krijgt hier een eigen zwemoutfit (blauwe badmuts), want de cast heeft alleen 'zwem' voor Sam.

const SP2_GROND = 850;
const SP2_K = { water: '#245E80', waterL: '#2F7398', waterD: '#1B4A66', tegel: '#C9D3DA', tegelD: '#9FAEB9', vloer: '#2E3D55', bord: '#F2F2EE', inkt: '#1A2740',
  vezel: '#6A2C36', vezelL: '#8C4450', vezelW: '#D9C4BC', vezelWL: '#EADDD6', bloed: '#B23A3E', bloedL: '#D8605E', plasma: '#E8CF7E', huidSam: '#7A5440' };

// ---------- Daan in zwemkleding (figurant in de baan) ----------
(function () { const D = CAST.daan; if (!D) return; D.garderobe = Object.assign({}, D.garderobe || {}, { zwem: { top: 'bloot', topKleur: D.huid, topAccent: '#D9AE8C', broek: '#1F3A2E', broekAccent: '#5BA4C9', schoen: D.huid, schoenAccent: D.huid, kapsel: 'badmuts', badmuts: '#2F6FB0', accessoire: ['zwembroek', 'blootsvoets', 'zwembril'] } }); })();

// ---------- algemene hulpjes ----------
function SP2_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP2_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP2_antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP2_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP2_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.9), 2); ctx.restore(); }
// kaartje met meta-kop en regels tekst
function SP2_kaartTekst(ctx, x, y, w, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; const h = (kop ? 70 : 30) + regels.length * (px + 12) + 10;
  SP2_laag(ctx, a, () => { SP2_kaart(ctx, x, y, w, h, 1, rand); if (kop) metaText(ctx, kop, x + 28, y + 46, kopKl, 'left', 28);
    regels.forEach((r, i) => text(ctx, r, x + 28, y + (kop ? 70 : 30) + px + i * (px + 12) - 6, fTekst(px, 700), C.text, 'left')); }); return h; }
function SP2_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP2_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
const SP2_ZK = { rustig: C.teal, drempel: C.oker, snel: C.goud };

// ---------- personages ----------
function SP2_trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || SP2_GROND, o.h || 400, { t, kijk: o.kijk || -1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold, zij: o.zij }); }
function SP2_sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || SP2_GROND, o.h || 380, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'zwem', a: o.a == null ? 1 : o.a, zij: o.zij, hold: o.hold }); }
function SP2_daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.y || SP2_GROND, o.h || 372, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'zwem', a: o.a == null ? 1 : o.a }); }

// ---------- zwembad, zijaanzicht ----------
// tegelvloer van de kant (deck) met een stukje bad links; geen tekst
function SP2_kant(ctx, o = {}) { const { badTot = 0, wand = true } = o; bg(ctx, 'schema');
  if (wand) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.07); ctx.lineWidth = 1.5; for (let y = 120; y < SP2_GROND; y += 70) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); }
  ctx.fillStyle = SP2_K.vloer; ctx.fillRect(badTot, SP2_GROND, W - badTot, 30); ctx.fillStyle = rgba(C.line, 0.5); ctx.fillRect(badTot, SP2_GROND, W - badTot, 3);
  if (badTot > 0) { ctx.fillStyle = SP2_K.water; ctx.fillRect(0, SP2_GROND + 12, badTot, 18); ctx.fillStyle = SP2_K.waterL; ctx.fillRect(0, SP2_GROND + 12, badTot, 3); } }
// lijn met drijvers (baanlijn), zijaanzicht op de waterlijn
function SP2_baanlijnZij(ctx, x0, x1, y, t = 0) { for (let x = x0; x < x1; x += 26) { const k = Math.floor((x - x0) / 26); const d = (x - x0) < 130 || (x1 - x) < 130; circ(ctx, x + 13, y + Math.sin(t * 1.6 + x * 0.02) * 2, 9, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
// onderwaterbeeld: water vanaf wl, bodem op 'bodem', keerpuntmuur bij muurX (rechts daarvan de kant)
function SP2_badZij(ctx, o = {}) { const { wl = 470, bodem = 850, muurX = 1500, t = 0, tot = 3600, kantBreed = 2600 } = o;
  ctx.fillStyle = SP2_K.waterD; ctx.fillRect(-200, wl, muurX + 200, bodem - wl);
  ctx.fillStyle = SP2_K.water; ctx.fillRect(-200, wl, muurX + 200, (bodem - wl) * 0.55);
  ctx.save(); ctx.strokeStyle = rgba('#9FD0EA', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const y = wl + 40 + i * 38; ctx.beginPath(); for (let x = -200; x <= muurX; x += 40) { const yy = y + Math.sin(x * 0.012 + t * 0.9 + i) * 5; x === -200 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); } ctx.restore();
  // bodem met zwarte baanlijn en T bij de muur
  ctx.fillStyle = '#3E6F86'; ctx.fillRect(-200, bodem - 10, muurX + 200, 10); ctx.fillStyle = '#16222E'; ctx.fillRect(-200, bodem - 16, muurX - 2 * 0.0 - 220, 6);
  ctx.fillStyle = '#16222E'; ctx.fillRect(muurX - 14, bodem - 300, 14, 300 - 10); // T op de muur, doorgetrokken van de bodemlijn
  // keerpuntmuur (tegels) en de kant erachter
  ctx.fillStyle = SP2_K.tegel; ctx.fillRect(muurX, wl - 34, 40, bodem - wl + 34); ctx.strokeStyle = SP2_K.tegelD; ctx.lineWidth = 1.5; for (let y = wl - 34; y < bodem; y += 32) { ctx.beginPath(); ctx.moveTo(muurX, y); ctx.lineTo(muurX + 40, y); ctx.stroke(); }
  ctx.fillStyle = '#E6C64A'; ctx.fillRect(muurX - 6, wl - 30, 8, 120); // aantikplaat
  ctx.fillStyle = SP2_K.vloer; ctx.fillRect(muurX, wl - 34, kantBreed, 30); ctx.fillStyle = rgba(C.line, 0.5); ctx.fillRect(muurX, wl - 34, kantBreed, 3);
  ctx.fillStyle = '#16212F'; ctx.fillRect(muurX + 40, wl - 4, kantBreed, bodem - wl + 4); // onder de kant
  // wateroppervlak
  ctx.strokeStyle = rgba('#BFE3F2', 0.7); ctx.lineWidth = 3; ctx.beginPath(); for (let x = -200; x <= muurX; x += 20) { const yy = wl + Math.sin(x * 0.02 + t * 2.2) * 3; x === -200 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); }

// ---------- scorebord ----------
function SP2_scorebord(ctx, x, y, w, h, boven, onder, a = 1) { if (a <= 0.01) return; SP2_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0B0F16', '#4A5568', 3);
  ctx.fillStyle = '#4A5568'; ctx.fillRect(x + w * 0.25, y - 60, 6, 60); ctx.fillRect(x + w * 0.75, y - 60, 6, 60);
  ctx.save(); ctx.font = fMeta(34); ctx.letterSpacing = '4px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(boven, x + w / 2, y + 52); ctx.restore();
  ctx.save(); ctx.font = fMeta(Math.round(h * 0.42)); ctx.letterSpacing = '6px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(onder, x + w / 2, y + h - 30); ctx.restore(); }); }

// ---------- whiteboard van de zwemtrainer ----------
// rijen: rustig, drempel, snel; o.hl = 'rustig'|'drempel'|'snel'|null; o.vul 0..1 (balken groeien); o.bars = [aRustig, aDrempel, aSnel]
const SP2_BORD_L = { rustig: 0.74, drempel: 0.2, snel: 0.1 };
function SP2_bord(ctx, x, y, w, h, o = {}) { const { a = 1, kop = '5000 M', vul = 1, hl = null, bars = [1, 1, 1], kopA = 1 } = o; if (a <= 0.01) return {};
  const rijen = []; SP2_laag(ctx, a, () => {
    ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); roundRect(ctx, x, y, w, h, 6); shape(ctx, SP2_K.bord, '#C7CCD4', 2);
    ctx.fillStyle = '#7A8496'; ctx.fillRect(x + 20, y + h + 10, w - 40, 10); // stiftenbakje
    SP2_laag(ctx, kopA, () => text(ctx, kop, x + 40, y + 78, fTekst(Math.round(h * 0.15), 800), SP2_K.inkt, 'left'));
    const namen = [['rustig', 'RUSTIG'], ['drempel', 'DREMPEL'], ['snel', 'SNEL']], x0 = x + 40 + w * 0.3, bw = w - (x0 - x) - 40, rh = (h - 130) / 3;
    namen.forEach(([k, n], i) => { const yy = y + 115 + i * rh, ba = bars[i]; const dimK = hl && hl !== k ? 0.35 : 1; rijen.push({ k, y: yy + rh * 0.42, x0, x1: x0 + bw * SP2_BORD_L[k] });
      if (ba <= 0.01) return; SP2_laag(ctx, ba * dimK, () => {
        ctx.save(); ctx.font = fMeta(Math.round(rh * 0.36)); ctx.letterSpacing = '2px'; ctx.fillStyle = SP2_K.inkt; ctx.textAlign = 'left'; ctx.fillText(n, x + 40, yy + rh * 0.55); ctx.restore();
        const L = bw * SP2_BORD_L[k] * ease(vul); roundRect(ctx, x0, yy + rh * 0.18, Math.max(8, L), rh * 0.5, 8); shape(ctx, SP2_ZK[k], lighten(SP2_ZK[k], -0.2), 2);
        if (hl === k) { ctx.strokeStyle = SP2_K.inkt; ctx.lineWidth = 3; roundRect(ctx, x0 - 6, yy + rh * 0.18 - 6, Math.max(8, L) + 12, rh * 0.5 + 12, 10); ctx.stroke(); } }); }); });
  return { rijen }; }

// ---------- zwembad, bovenaanzicht ----------
// banen liggen horizontaal; muren links en rechts; geeft functie baanY(i) terug (midden van baan i, 0 = boven)
function SP2_banen(ctx, x, y, w, h, n, o = {}) { const { t = 0, a = 1 } = o; const bh = h / n; if (a <= 0.01) return { y: (i) => y + (i + 0.5) * bh, bh };
  SP2_laag(ctx, a, () => {
    roundRect(ctx, x - 24, y - 24, w + 48, h + 48, 10); shape(ctx, SP2_K.vloer, rgba(C.line, 0.5), 2);
    ctx.fillStyle = SP2_K.waterL; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.strokeStyle = rgba('#CFEAF6', 0.12); ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) { const yy = y + (i + 0.5) * h / 14; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const q = yy + Math.sin(xx * 0.015 + t * 0.8 + i * 1.7) * 4; xx === x ? ctx.moveTo(xx, q) : ctx.lineTo(xx, q); } ctx.stroke(); } ctx.restore();
    for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; ctx.fillStyle = rgba('#14303F', 0.55); ctx.fillRect(x + w * 0.04, yy - 6, w * 0.92, 12); ctx.fillRect(x + w * 0.04 - 4, yy - 30, 12, 60); ctx.fillRect(x + w * 0.96 - 8, yy - 30, 12, 60); }
    for (let i = 0; i <= n; i++) { const yy = y + i * bh; if (i === 0 || i === n) continue; for (let xx = x; xx < x + w; xx += 22) { const k = Math.floor((xx - x) / 22); const d = (xx - x) < w * 0.1 || (x + w - xx) < w * 0.1; circ(ctx, xx + 11, yy, 8, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
    ctx.fillStyle = SP2_K.tegel; ctx.fillRect(x - 8, y, 8, h); ctx.fillRect(x + w, y, 8, h); });
  return { y: (i) => y + (i + 0.5) * bh, bh }; }
// spoor achter een zwemmer (bovenaanzicht)
function SP2_spoor(ctx, x0, x1, y, col, a = 1, lw = 18) { if (a <= 0.01 || Math.abs(x1 - x0) < 2) return; ctx.save(); ctx.globalAlpha *= a * 0.75; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// zwemmer van boven (eenvoudige vorm, kleuren uit de cast); (x, y) = midden van de romp, L = lengte van kruin tot tenen
function SP2_boven(ctx, x, y, L, t, o = {}) { const { id = 'sam', kijk = 1, tempo = 1, a = 1, stil = false } = o; if (a <= 0.01) return;
  const P = CAST[id], G = (P.garderobe && P.garderobe.zwem) || {}, huid = P.huid, muts = G.badmuts || '#D8573F', broek = G.broek || '#1F2B48';
  const p = stil ? 0.1 : ((t * 0.8 * tempo) % 1 + 1) % 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kick = stil ? 0 : Math.sin(p * 6.283 * 3) * L * 0.025;
  ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = L * 0.075; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); });
  ctx.strokeStyle = huid; ctx.lineWidth = L * 0.06; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); });
  // armen: hand van voor (instrek) naar achter (dij) en boven water terug
  const arm = (q, s) => { const sx = L * 0.26, sy = s * L * 0.11, ar = L * 0.36; let hx, hy;
    if (q < 0.62) { const u = q / 0.62; hx = sx + ar * Math.cos(u * Math.PI * 0.95); hy = sy + s * L * 0.02 * Math.sin(u * Math.PI) - s * L * 0.06 * Math.sin(u * Math.PI); }
    else { const u = (q - 0.62) / 0.38; hx = sx + ar * Math.cos(Math.PI * 0.95 * (1 - u)); hy = sy + s * L * 0.12 * Math.sin(u * Math.PI); }
    const ex = (sx + hx) / 2 - L * 0.02, ey = (sy + hy) / 2 + s * L * 0.05;
    ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = L * 0.06; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.strokeStyle = huid; ctx.lineWidth = L * 0.046; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); };
  arm(p, 1);
  // romp
  ctx.beginPath(); ctx.ellipse(L * 0.1, 0, L * 0.21, L * 0.115, 0, 0, 6.283); shape(ctx, huid, _sp2Donker(huid), 1.5);
  roundRect(ctx, -L * 0.14, -L * 0.075, L * 0.12, L * 0.15, L * 0.04); shape(ctx, broek, null);
  arm((p + 0.5) % 1, -1);
  ctx.beginPath(); ctx.ellipse(L * 0.37, 0, L * 0.075, L * 0.062, 0, 0, 6.283); shape(ctx, muts, lighten(muts, -0.25), 1.5);
  ctx.restore(); }
function _sp2Donker(hex) { const n = parseInt(hex.slice(1), 16); const f = 0.78; return `rgb(${Math.round((n >> 16) * f)},${Math.round(((n >> 8) & 255) * f)},${Math.round((n & 255) * f)})`; }
// startblok (zijaanzicht), (x, y) = voorrand en bovenkant; s = px per m
function SP2_startblok(ctx, x, y, s, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(kijk, 1);
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-0.6 * s, -0.06 * s); ctx.lineTo(-0.62 * s, 0.75 * s); ctx.lineTo(-0.05 * s, 0.75 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E8E4DA'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-0.6 * s, -0.06 * s); ctx.lineTo(-0.6 * s, -0.02 * s); ctx.lineTo(0, 0.04 * s); ctx.closePath(); ctx.fill();
  ctx.restore(); }

// ---------- micro: spiervezel in een zoomcirkel ----------
// liggende spiervezel (langgerekt) rond cy; o: mito (aantal), hl (index die oplicht, groen omlijnd), haarvat 0..1, wit (witte vezel), dy, h
function SP2_vezel(ctx, cx, cy, R, o = {}) { const { mito = 6, hl = -1, hlA = 0, haarvat = 0, wit = false, h = R * 0.62, t = 0, a = 1, nieuw = 0 } = o; if (a <= 0.01) return [];
  const pos = []; SP2_laag(ctx, a, () => {
    const x0 = cx - R * 1.1, x1 = cx + R * 1.1, y0 = cy - h / 2;
    roundRect(ctx, x0, y0, x1 - x0, h, h * 0.45); shape(ctx, wit ? SP2_K.vezelW : SP2_K.vezel, wit ? SP2_K.vezelWL : SP2_K.vezelL, 2);
    ctx.save(); roundRect(ctx, x0, y0, x1 - x0, h, h * 0.45); ctx.clip();
    ctx.strokeStyle = wit ? rgba('#B8A49C', 0.5) : rgba('#9A5560', 0.55); ctx.lineWidth = 2; for (let xx = x0 + 10; xx < x1; xx += 16) { ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx + 3, y0 + h); ctx.stroke(); }
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(cx - R * 0.7 + i * R * 0.7, y0 + h * 0.12, R * 0.07, h * 0.06, 0, 0, 6.283); shape(ctx, '#6E5A9E', '#A392D6', 1.2); }
    for (let i = 0; i < mito; i++) { const mx = cx - R * 0.85 + (i + 0.5) * (R * 1.7 / mito) + (hash(i * 3.1) - 0.5) * R * 0.12, my = cy + (i % 2 ? 1 : -1) * h * 0.16 + (hash(i * 7.7) - 0.5) * h * 0.1;
      const ai = i >= mito - nieuw ? 1 : 1; mitochondrion(ctx, mx, my, R * 0.2, (hash(i) - 0.5) * 0.5, ai, 4, t); pos.push({ x: mx, y: my });
      if (i === hl && hlA > 0.01) { ctx.save(); ctx.globalAlpha *= hlA; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(mx, my, R * 0.14, R * 0.075, (hash(i) - 0.5) * 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); } }
    ctx.restore();
    if (haarvat > 0.01) SP2_haarvaten(ctx, cx, cy, R, h, haarvat, t); });
  return pos; }
function SP2_haarvaten(ctx, cx, cy, R, h, u, t) { ctx.save(); ctx.lineCap = 'round';
  [-1, 1].forEach((s, j) => { const yb = cy + s * (h / 2 + 16); const xs = cx - R * 1.05, xe = cx - R * 1.05 + R * 2.1 * u;
    ctx.strokeStyle = rgba(SP2_K.bloed, 0.9); ctx.lineWidth = 12; ctx.beginPath(); for (let x = xs; x <= xe; x += 10) { const y = yb + Math.sin(x * 0.03 + j * 2) * 6; x === xs ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
    for (let k = 0; k < 6; k++) { const x = xs + ((k * 70 + t * 40) % (R * 2.1)); if (x > xe) continue; ctx.beginPath(); ctx.ellipse(x, yb + Math.sin(x * 0.03 + j * 2) * 6, 7, 4, 0, 0, 6.283); ctx.fillStyle = SP2_K.bloedL; ctx.fill(); } });
  ctx.restore(); }
// glucose als zeshoek; twee ketentjes van drie C (pyrodruivenzuur/lactaat)
function SP2_glucose(ctx, x, y, r, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 + Math.PI / 6; i ? ctx.lineTo(x + r * Math.cos(an), y + r * Math.sin(an)) : ctx.moveTo(x + r * Math.cos(an), y + r * Math.sin(an)); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 3); ctx.restore(); }
function SP2_keten(ctx, x, y, r, a = 1, col = C.oker, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-r * 1.6, 0); ctx.lineTo(r * 1.6, 0); ctx.stroke(); for (let i = -1; i <= 1; i++) circ(ctx, i * r * 1.6, 0, r * 0.62, rgba(col, 0.55), col, 2); ctx.restore(); }
// fosfaataccu: batterijtje met lading u
function SP2_accu(ctx, x, y, s, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - s, y - s * 0.5, s * 2, s, s * 0.15); shape(ctx, rgba('#0D1420', 0.6), C.goud, 3); ctx.fillStyle = C.goud; ctx.fillRect(x + s, y - s * 0.2, s * 0.18, s * 0.4);
  roundRect(ctx, x - s + 6, y - s * 0.5 + 6, Math.max(2, (s * 2 - 12) * clamp(u, 0, 1)), s - 12, s * 0.08); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fill(); ctx.restore(); }
// O2-molecuul (twee bolletjes, teal)
function SP2_o2(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - r * 0.55, y, r * 0.7, C.teal, lighten(C.teal, 0.3), 1.5); circ(ctx, x + r * 0.55, y, r * 0.7, C.teal, lighten(C.teal, 0.3), 1.5); ctx.restore(); }
// lactaatdeeltje (oker ketentje, klein)
function SP2_lac(ctx, x, y, r, a = 1) { SP2_keten(ctx, x, y, r, a, C.oker, 0.4); }

// ---------- energiebalk (100 m) ----------
function SP2_energieBalk(ctx, x, y, w, h, frac, o = {}) { const { a = 1, rest = 1, label = '' } = o; if (a <= 0.01) return; SP2_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#2A3446', C.line, 1.5);
  const fw = w * frac; if (rest > 0.01) SP2_laag(ctx, rest, () => { ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.75); ctx.fillRect(x + fw, y, w - fw, h); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fillRect(x + w * 0.83, y, w * 0.17, h); ctx.restore(); });
  if (fw > 2) { ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(C.groen, 0.85); ctx.fillRect(x, y, fw, h); ctx.restore(); }
  if (label) metaText(ctx, label, x, y - 18, C.text2, 'left', 28); }); }

// ---------- hart, maatbekertje, bloedbuisje ----------
function SP2_hart(ctx, x, y, s, beat = 0, a = 1) { if (a <= 0.01) return; const p = Math.pow(Math.max(0, Math.sin(beat)), 3), k = 1 + 0.06 * p; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k * s, k * s);
  ctx.fillStyle = '#8E2E36'; roundRect(ctx, -8, -78, 30, 50, 12); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, -70); ctx.quadraticCurveTo(40, -100, 60, -70); ctx.lineWidth = 16; ctx.strokeStyle = '#A8343C'; ctx.stroke(); // aorta
  ctx.fillStyle = '#3E5FA8'; roundRect(ctx, -40, -70, 22, 40, 10); ctx.fill(); // holle ader
  ctx.beginPath(); ctx.moveTo(-50, -30); ctx.bezierCurveTo(-70, 10, -30, 60, 10, 80); ctx.bezierCurveTo(50, 50, 70, 0, 50, -36); ctx.bezierCurveTo(30, -60, -30, -60, -50, -30); ctx.closePath(); shape(ctx, '#B8484A', '#E07A7A', 2.5);
  ctx.strokeStyle = rgba('#5E1E24', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(-6, 20, 10, 70); ctx.stroke(); ctx.restore(); }
function SP2_maatbeker(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w * 0.42, y); ctx.lineTo(x + w * 0.42, y); ctx.lineTo(x + w / 2, y - h); shape(ctx, rgba('#AFC0D0', 0.12), '#AFC0D0', 2.5);
  const fh = h * clamp(u, 0, 1); ctx.beginPath(); ctx.moveTo(x - w * 0.42 - (w * 0.08) * (fh / h), y - fh); ctx.lineTo(x - w * 0.42, y); ctx.lineTo(x + w * 0.42, y); ctx.lineTo(x + w * 0.42 + (w * 0.08) * (fh / h), y - fh); ctx.closePath(); ctx.fillStyle = rgba(SP2_K.bloed, 0.85); ctx.fill();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + w * 0.2, y - h * i / 5); ctx.lineTo(x + w * 0.42, y - h * i / 5); ctx.stroke(); } ctx.restore(); }
// bloedbuisje: bodem op y, plasma (geel) boven, rode bloedcellen onder; hoogtes in px
function SP2_buisje(ctx, x, y, w, hRbc, hPlasma, hTot, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, y - hTot); ctx.lineTo(x - w / 2, y - w / 2); ctx.arc(x, y - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - hTot); };
  ctx.save(); pad(); ctx.closePath(); ctx.clip(); ctx.fillStyle = SP2_K.bloed; ctx.fillRect(x - w, y - hRbc, w * 2, hRbc + 2); ctx.fillStyle = rgba(SP2_K.plasma, 0.9); ctx.fillRect(x - w, y - hRbc - hPlasma, w * 2, hPlasma);
  ctx.fillStyle = rgba('#F2F2EE', 0.6); ctx.fillRect(x - w, y - hRbc - 3, w * 2, 5); ctx.restore();
  pad(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#5E6A80'; roundRect(ctx, x - w / 2 - 6, y - hTot - 24, w + 12, 26, 6); ctx.fill(); ctx.restore(); }

// ---------- meters, klokken, kalender, weegschaal ----------
function SP2_lactaatMeter(ctx, x, y, s, waarde, a = 1, strip = 1, druppel = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -100, 120, 200, 22); shape(ctx, '#3A4458', '#6A768C', 3);
  roundRect(ctx, -44, -76, 88, 70, 8); shape(ctx, '#B8D8A8', '#2A3446', 2);
  if (waarde) text(ctx, waarde, 0, -26, fMeta(waarde.length > 2 ? 38 : 46), '#1A2A1A', 'center');
  circ(ctx, -22, 40, 13, '#5A6478', '#8FA0B5', 2); circ(ctx, 22, 40, 13, '#5A6478', '#8FA0B5', 2);
  if (strip > 0.01) { ctx.fillStyle = '#E8E4DA'; ctx.fillRect(-10, -100 - 46 * strip, 20, 46 * strip); if (druppel > 0.01) circ(ctx, 0, -100 - 46 * strip, 7 * druppel, '#B23A3E'); }
  ctx.restore(); }
function SP2_stopwatch(ctx, x, y, r, u, a = 1, txt = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#AFC0D0'; ctx.fillRect(x - r * 0.15, y - r * 1.32, r * 0.3, r * 0.26);
  circ(ctx, x, y, r, '#E8ECF0', '#8FA0B5', 4); circ(ctx, x, y, r * 0.86, null, '#C7CCD4', 2);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.8, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u % 1.0001, 0, 1)); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill();
  const an = -Math.PI / 2 + 6.283 * u; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#1A2740');
  if (txt) metaText(ctx, txt, x, y + r + 44, C.text2, 'center', 28); ctx.restore(); }
function SP2_kalender(ctx, x, y, w, h, nr, u, a = 1, kop = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#E8ECF0', '#8FA0B5', 2);
  ctx.fillStyle = C.koraal; roundRect(ctx, x, y, w, h * 0.26, 12); ctx.fill(); ctx.fillRect(x, y + h * 0.14, w, h * 0.12);
  for (let i = 0; i < 2; i++) { ctx.fillStyle = '#5A6478'; roundRect(ctx, x + w * (0.28 + i * 0.36) - 6, y - 14, 12, 30, 5); ctx.fill(); }
  if (kop) text(ctx, kop, x + w / 2, y + h * 0.2, fTekst(Math.round(h * 0.13), 800), '#F2F2EE', 'center');
  text(ctx, String(nr), x + w / 2, y + h * 0.82, fTekst(Math.round(h * 0.46), 800), '#1A2740', 'center');
  ctx.restore(); }
function SP2_weegschaal(ctx, x, y, s, tilt, links, rechts, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 240 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 90 * s, y); ctx.lineTo(x + 90 * s, y); ctx.stroke();
  const L = 380 * s, dy = Math.sin(tilt) * L; ctx.beginPath(); ctx.moveTo(x - L, y - 240 * s + dy); ctx.lineTo(x + L, y - 240 * s - dy); ctx.stroke(); circ(ctx, x, y - 240 * s, 12 * s, '#AFC0D0');
  [[-1, links, C.teal, dy], [1, rechts, C.goud, -dy]].forEach(([k, lab, col, d]) => { const px = x + k * L, py = y - 240 * s + d; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 120 * s, py + 120 * s); ctx.moveTo(px, py); ctx.lineTo(px + 120 * s, py + 120 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 150 * s, py + 120 * s); ctx.quadraticCurveTo(px, py + 190 * s, px + 150 * s, py + 120 * s); ctx.closePath(); shape(ctx, rgba(col, 0.3), col, 3);
    lab.forEach((r, i) => text(ctx, r, px, py + 250 * s + i * 44, fTekst(36, 700), C.text, 'center')); });
  ctx.restore(); }

// ---------- lactaatcurve ----------
// snelheid u 0..1 (x-as), lactaat in mmol/l (0..12); dv = verschuiving naar rechts (na training)
function SP2_lac_v(u, dv = 0) { const v = u - dv; return 0.9 + 0.35 * Math.exp(4.6 * (v - 0.25)) - 0.35 * Math.exp(4.6 * -0.25) * 0; }
function SP2_grafiek(ctx, x, y, w, h, o = {}) { const { a = 1, ymax = 12, curve = 1, dv = 0, punten = 0, col = C.oker, zones = 0, grens = 0, assen = true, oud = 0, kleur = null, lw = 5, lab = true } = o;
  const X = (u) => x + u * w, Y = (l) => y + h - (l / ymax) * h; if (a <= 0.01) return { X, Y };
  SP2_laag(ctx, a, () => {
    if (zones > 0.01) SP2_laag(ctx, zones, () => { const u2 = SP2_uVoor(2, dv), u4 = SP2_uVoor(4, dv); ctx.fillStyle = rgba(C.teal, 0.22); ctx.fillRect(x, y, X(u2) - x, h); ctx.fillStyle = rgba(C.oker, 0.28); ctx.fillRect(X(u2), y, X(u4) - X(u2), h); ctx.fillStyle = rgba(C.goud, 0.22); ctx.fillRect(X(u4), y, x + w - X(u4), h); });
    if (grens > 0.01) SP2_laag(ctx, grens, () => { [2, 4].forEach(l => { SP2_lijn(ctx, [[x, Y(l)], [x + w, Y(l)]], C.line, 2, 0.9, [10, 8]); metaText(ctx, '± ' + l, x - 14, Y(l) + 10, C.text2, 'right', 28); }); });
    if (assen) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
      if (lab) { metaText(ctx, 'SNELHEID →', x + w, y + h + 42, C.text2, 'right', 28); metaText(ctx, 'LACTAAT (MILLIMOL PER LITER)', x, y - 26, C.text2, 'left', 28); } }
    if (oud > 0.01) { const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60, l = SP2_lac_v(u, 0); if (l > ymax) break; pts.push([X(u), Y(l)]); } SP2_lijn(ctx, pts, C.text2, 3, oud, [10, 8]); }
    if (curve > 0.01) { const pts = []; const n = Math.round(60 * curve); for (let i = 0; i <= n; i++) { const u = i / 60, l = SP2_lac_v(u, dv); if (l > ymax) break; pts.push([X(u), Y(l)]); } SP2_lijn(ctx, pts, kleur || col, lw, 1); }
    for (let i = 0; i < 7; i++) { const pa = clamp(punten - i, 0, 1); if (pa <= 0.01) continue; const u = 0.1 + i * 0.125, l = SP2_lac_v(u, dv); circ(ctx, X(u), Y(l), 11 * ease(pa), C.text, '#1A2740', 2); } });
  return { X, Y }; }
function SP2_uVoor(l, dv = 0) { return 0.25 + Math.log((l - 0.9) / 0.35) / 4.6 + dv; }
// vlaggetje
function SP2_vlag(ctx, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 70); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - 70); ctx.lineTo(x + 44, y - 58); ctx.lineTo(x, y - 46); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// oor met oorlel van opzij (zoomcirkel bij de prik), huidkleur
function SP2_oor(ctx, x, y, s, huid, prik = 0, drop = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = huid; ctx.fillRect(-300, -300, 600, 600);
  ctx.fillStyle = _sp2Donker(huid); ctx.beginPath(); ctx.ellipse(0, -20, 95, 150, 0.1, 0, 6.283); ctx.fill(); ctx.fillStyle = huid; ctx.beginPath(); ctx.ellipse(-4, -24, 84, 138, 0.1, 0, 6.283); ctx.fill();
  ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(4, -40, 60, -2.6, 1.0); ctx.stroke(); ctx.beginPath(); ctx.arc(-6, -10, 26, -1.5, 2.2); ctx.stroke();
  ctx.fillStyle = '#D8573F'; ctx.beginPath(); ctx.ellipse(-30, -230, 220, 90, 0.05, 0, 6.283); ctx.fill(); // rand van de badmuts
  if (drop > 0.01) { ctx.fillStyle = '#B23A3E'; ctx.beginPath(); ctx.arc(8, 118, 12 * drop, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

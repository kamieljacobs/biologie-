// Wat word jij? · Sport en topsport 8 · Energiesystemen in het zwembad — eigen tekeningen (20 nov 2026)
// Seriekleuren: teal = zuurstof, water, herstel; oker = fosfaataccu en gisting (gisting oker met koraal rand); goud = voortstuwing, eindsprint;
// koraal = vermoeidheid, 'let op'. Geen namen in beeld. Mengpaneel met drie schuifjes = vast beeld voor de energiebronnen (twijfels t8).
// Maten: zwemmer 1,80 m; startblok ± 0,75 m boven het water; 50-meterbad met banen van 2,5 m.
// Splittijden (VOORBEELD, tellen op): 27,9 + 30,9 + 31,7 + 32,2 = 2:02,7 · 28,9 + 30,6 + 30,9 + 30,8 = 2:01,2.

const SP8 = { wand: '#16233A', wandL: '#1D2C47', tegel: '#2B3A55', voeg: '#22304A', water: '#2C6E8E', waterD: '#1F5672', waterL: '#4F95B5',
  bodem: '#1B4058', lijn: '#13283A', blok: '#C9D2DC', blokD: '#8E9AAA', dek: '#4C5C74', dekL: '#5E7088', vloer: '#2E3D55', huid: '#7A5440',
  vezel: '#7A3440', vezelL: '#9A4C58', bloed: '#B23A3E', bloedL: '#D8605E', lac: '#E8CF7E', grijs: '#6E7890', bord: '#F2F2EE', inkt: '#1A2740' };
const SP8_BRON = [['FOSFAATACCU', C.oker, C.oker], ['GISTING', C.oker, C.koraal], ['ZUURSTOF', C.teal, C.teal]];

// ---------- algemene hulpjes ----------
function SP8_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP8_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP8_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP8_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP8_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
// kaartje met regels; regels = [[tekst, soort('meta'|'tekst'|'groot'), kleur]]
function SP8_kaartje(ctx, x, y, w, regels, a = 1, rand = C.line, al = 'left') { if (a <= 0.01) return 0; const lh = r => r[1] === 'meta' ? 44 : r[1] === 'groot' ? 60 : 50; const h = 34 + regels.reduce((s, r) => s + lh(r), 0);
  const x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x;
  SP8_laag(ctx, a, () => { SP8_kaart(ctx, x0, y, w, h, 1, rand); let yy = y + 20; regels.forEach(r => { yy += lh(r); const tx = al === 'center' ? x0 + w / 2 : x0 + 28, ta = al === 'center' ? 'center' : 'left';
    if (r[1] === 'meta') metaText(ctx, r[0], tx, yy - 10, r[2] || C.grain, ta, 28); else text(ctx, r[0], tx, yy - 12, fTekst(r[1] === 'groot' ? 46 : 36, r[1] === 'groot' ? 800 : 700), r[2] || C.text, ta); }); });
  return h; }
function SP8_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
function SP8_hex(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }
// stuksgewijs lineair: punten [[t, v], ...]
function SP8_pl(t, pts) { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [t0, v0] = pts[i - 1], [t1, v1] = pts[i]; return v0 + (v1 - v0) * (t - t0) / (t1 - t0 || 1); } return pts[pts.length - 1][1]; }
function SP8_doorstreep(ctx, x0, y, w, u, kl = C.koraal, lw = 7) { if (u <= 0.01) return; ctx.save(); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w * clamp(u, 0, 1), y); ctx.stroke(); ctx.restore(); }

// ---------- mengpaneel: drie schuifjes ----------
// (x, y) = linksboven; s = schaal (breedte 860 × s, hoogte 420 × s); v = [fosfaat, gisting, zuurstof] 0..1
// o: grijs (0..1), hl [3] (0..1 oplichten), kop (meta boven), rand (goud oplichten), kopKl
function SP8_paneel(ctx, x, y, s, v, o = {}) { const { a = 1, grijs = 0, hl = [0, 0, 0], kop = '', rand = 0, kopKl = C.text2 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 860, 420, 22); shape(ctx, '#121A2A', SP8_mix('#56627E', C.goud, rand), 3 + 3 * rand);
  if (kop) text(ctx, kop, 430, 62, fTekst(44, 800), kopKl, 'center');
  const top = kop ? 96 : 60, h = kop ? 214 : 250;
  SP8_BRON.forEach(([lab, kl, rk], i) => { const cx = 150 + i * 280, kk = SP8_hex(kl, SP8.grijs, grijs), rr = SP8_hex(rk, SP8.grijs, grijs), u = clamp(v[i], 0, 1), hli = hl[i] || 0;
    if (hli > 0.01) { ctx.save(); ctx.globalAlpha *= hli * 0.5; ctx.fillStyle = kk; roundRect(ctx, cx - 70, top - 24, 140, h + 48, 30); ctx.fill(); ctx.restore(); }
    roundRect(ctx, cx - 14, top, 28, h, 14); shape(ctx, '#0A0F18', '#3E4A62', 2);
    for (let k = 0; k <= 4; k++) { const yy = top + h * k / 4; ctx.strokeStyle = rgba('#F2F2EE', 0.18); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 40, yy); ctx.lineTo(cx - 24, yy); ctx.moveTo(cx + 24, yy); ctx.lineTo(cx + 40, yy); ctx.stroke(); }
    const ky = top + h * (1 - u); if (u > 0.01) { roundRect(ctx, cx - 10, ky, 20, top + h - ky - 4, 10); ctx.fillStyle = rgba(kk, 0.85); ctx.fill(); }
    roundRect(ctx, cx - 52, ky - 20, 104, 40, 12); shape(ctx, kk, rr, i === 1 ? 6 : 2.5); ctx.fillStyle = rgba('#0A0F18', 0.45); ctx.fillRect(cx - 36, ky - 2, 72, 4);
    metaText(ctx, lab, cx, top + h + 62, kk, 'center', 28); });
  ctx.restore(); }

// ---------- zwembad, doorsnede (zijaanzicht) met startblok links; off = horizontale verschuiving (camera volgt) ----------
function SP8_doorsnede(ctx, t, Y, o = {}) { const { xW = 380, off = 0 } = o; bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = SP8.wand; ctx.fillRect(0, 0, W, Y - 30);
  for (let i = -1; i < 7; i++) { const x = ((160 + i * 380 - off * 0.35) % (380 * 6) + 380 * 6) % (380 * 6) - 380; roundRect(ctx, x, 60, 250, Math.max(40, Y - 200), 6); shape(ctx, '#101A2C', SP8.wandL, 3); }
  const xw = xW - off; ctx.fillStyle = SP8.water; ctx.fillRect(Math.max(0, xw), Y, W, 870 - Y); ctx.fillStyle = SP8.waterD; ctx.fillRect(Math.max(0, xw), Y + (870 - Y) * 0.55, W, (870 - Y) * 0.45);
  ctx.strokeStyle = rgba('#9FD0EA', 0.14); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const yy = Y + 30 + i * 36; for (let k = 0; k < 14; k++) { const xx = ((k * 190 - off * 1.0 + i * 70) % 2660 + 2660) % 2660 - 200; if (xx < xw) continue; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 80, yy); ctx.stroke(); } }
  if (xw > -10) { ctx.fillStyle = SP8.tegel; ctx.fillRect(0, Y - 30, xw, 890 - Y); ctx.strokeStyle = SP8.voeg; ctx.lineWidth = 2; for (let y = Y; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(xw, y); ctx.stroke(); }
    ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, Y - 34, xw + 6, 10); }
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = Math.max(0, xw); x <= W; x += 8) { const y = Y + 3 * Math.sin((x + off) * 0.03 + t * 2.2); x === Math.max(0, xw) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  ctx.restore(); }
// startblok van opzij: (x, y) = voorrand en bovenkant
function SP8_startblok(ctx, x, y, s = 1, nr = 4) { ctx.save(); const hP = 150 * s, lp = 145 * s; ctx.fillStyle = SP8.blokD; ctx.fillRect(x - lp * 0.7, y + 10 * s, 18 * s, hP); ctx.fillRect(x - 24 * s, y + 10 * s, 16 * s, hP - 10 * s);
  ctx.beginPath(); ctx.moveTo(x - lp, y + 14 * s); ctx.lineTo(x, y); ctx.lineTo(x + 4 * s, y + 18 * s); ctx.lineTo(x - lp, y + 30 * s); ctx.closePath(); shape(ctx, SP8.blok, null);
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - lp * 0.55, y + 44 * s, 44 * s, 36 * s, 4 * s); ctx.fill(); text(ctx, String(nr), x - lp * 0.55 + 22 * s, y + 72 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
function SP8_wig(ctx, s, py) { if (!s || !s.wig) return; const { x, y, h } = s.wig; const yb = py == null ? y + 6 : py; ctx.save(); ctx.fillStyle = SP8.blokD; ctx.beginPath(); ctx.moveTo(x - h * 1.4, yb); ctx.lineTo(x + h * 0.1, Math.min(y, yb) - h); ctx.lineTo(x + h * 0.6, Math.min(y, yb) - h * 0.8); ctx.lineTo(x + h * 0.6, yb); ctx.closePath(); ctx.fill(); ctx.restore(); }
function SP8_spat(ctx, x, y, u, a = 1) { if (a <= 0.01 || u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= a * (1 - u);
  for (let i = 0; i < 9; i++) { const an = -Math.PI * (0.1 + 0.8 * i / 8), r = 30 + 160 * u; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r * 0.9 + 120 * u * u, 6, '#DDF0F8'); }
  ctx.strokeStyle = '#DDF0F8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 40 + 120 * u, 10 + 20 * u, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
// zwemmer op het blok en de duik; tD = tijd sinds het startsein (< 0 = staat klaar); geeft wereld-x van de heup terug
const SP8_BLOK = { x: 330, L: 300 };
function SP8_duik(ctx, t, tD, Y, off = 0) { const L = SP8_BLOK.L, bx = SP8_BLOK.x - off, by = Y - 34 - 128;
  if (tD <= 0) { if (bx > -200) { SP8_startblok(ctx, bx, by, 0.8, 4); SP8_wig(ctx, zwemmer(ctx, 'sam', bx, by, L, { slag: 'startblok', kijk: 1 }), by + 12); } return SP8_BLOK.x; }
  if (bx > -200) SP8_startblok(ctx, bx, by, 0.8, 4);
  let hx, hy, an = 0, slag = 'stroomlijn';
  if (tD < 0.9) { const u = clamp(tD / 0.9, 0, 1); hx = 330 + 470 * u; hy = by - 70 - 150 * u + 470 * u * u; an = Math.atan2(-150 + 940 * u, 470); }
  else if (tD < 1.7) { const u = (tD - 0.9) / 0.8; hx = 800 + 260 * u; hy = lerp(Y + 120, Y + 0.12 * L, ease(u)); an = lerp(0.5, 0, ease(u)) * (1 - u); }
  else { hx = 1060 + 200 * (tD - 1.7); hy = Y + 0.12 * L; slag = 'crawl'; }
  ctx.save(); ctx.translate(hx - off, hy); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, L, { slag, t, kijk: 1 }); ctx.restore();
  SP8_spat(ctx, 830 - off, Y, (tD - 0.75) / 0.9, 1);
  return hx; }

// ---------- scorebord ----------
function SP8_scorebord(ctx, x, y, w, h, boven, onder, a = 1, onderKl = '#F2B84A') { if (a <= 0.01) return; SP8_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0B0F16', '#4A5568', 3);
  ctx.save(); ctx.font = fMeta(32); ctx.letterSpacing = '4px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(boven, x + w / 2, y + 50); ctx.restore();
  if (onder) { ctx.save(); ctx.font = fMeta(Math.round(h * 0.38)); ctx.letterSpacing = '6px'; ctx.fillStyle = onderKl; ctx.textAlign = 'center'; ctx.fillText(onder, x + w / 2, y + h - 26); ctx.restore(); } }); }

// ---------- 50-meterbad, bovenaanzicht ----------
// banen horizontaal (startmuur links); geeft {y(i), bh, x0, x1} terug; o.hl = index van de gemarkeerde baan
function SP8_bad(ctx, x, y, w, h, n, o = {}) { const { t = 0, hl = -1, blokken = true } = o; const bh = h / n;
  roundRect(ctx, x - 40, y - 30, w + 80, h + 60, 10); shape(ctx, SP8.vloer, rgba(C.line, 0.4), 2);
  ctx.fillStyle = '#3F86A8'; ctx.fillRect(x, y, w, h);
  if (hl >= 0) { ctx.fillStyle = rgba('#5BB0D6', 0.35); ctx.fillRect(x, y + hl * bh, w, bh); }
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.strokeStyle = rgba('#CFEAF6', 0.12); ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) { const yy = y + (i + 0.5) * h / 16; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const q = yy + Math.sin(xx * 0.015 + t * 0.8 + i * 1.7) * 4; xx === x ? ctx.moveTo(xx, q) : ctx.lineTo(xx, q); } ctx.stroke(); } ctx.restore();
  for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; ctx.fillStyle = rgba('#14303F', 0.5); ctx.fillRect(x + w * 0.04, yy - 4, w * 0.92, 8); ctx.fillRect(x + w * 0.04 - 2, yy - 16, 8, 32); ctx.fillRect(x + w * 0.96 - 6, yy - 16, 8, 32); }
  for (let i = 1; i < n; i++) { const yy = y + i * bh; for (let xx = x; xx < x + w; xx += 16) { const k = Math.floor((xx - x) / 16); const d = (xx - x) < w * 0.1 || (x + w - xx) < w * 0.1; circ(ctx, xx + 8, yy, 5, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
  ctx.fillStyle = '#C9D3DA'; ctx.fillRect(x - 6, y, 6, h); ctx.fillRect(x + w, y, 6, h);
  if (blokken) for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; roundRect(ctx, x - 34, yy - 14, 28, 28, 4); shape(ctx, SP8.blok, null); if (i === hl) text(ctx, String(i + 1), x - 20, yy + 9, fTekst(22, 800), '#1A2740', 'center'); }
  return { y: (i) => y + (i + 0.5) * bh, bh, x0: x, x1: x + w }; }
function SP8_spoor(ctx, x0, x1, y, col, a = 1, lw = 12) { if (a <= 0.01 || Math.abs(x1 - x0) < 2) return; ctx.save(); ctx.globalAlpha *= a * 0.8; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// zwemmer van boven (eenvoudige vorm, kleuren uit de cast); (x, y) = midden romp, L = kruin tot tenen
function SP8_boven(ctx, x, y, L, t, o = {}) { const { id = 'sam', kijk = 1, tempo = 1, a = 1, stil = false } = o; if (a <= 0.01) return;
  const P = CAST[id], G = (P.garderobe && P.garderobe.zwem) || {}, huid = P.huid, muts = G.badmuts || '#D8573F', broek = G.broek || '#1F2B48', dk = SP8_hex(huid, '#000000', 0.22);
  const p = stil ? 0.1 : ((t * 0.8 * tempo) % 1 + 1) % 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kick = stil ? 0 : Math.sin(p * 6.283 * 3) * L * 0.025;
  [[dk, L * 0.075], [huid, L * 0.06]].forEach(([kl, lw]) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); }); });
  const arm = (q, s) => { const sx = L * 0.26, sy = s * L * 0.11, ar = L * 0.36; let hx, hy;
    if (q < 0.62) { const u = q / 0.62; hx = sx + ar * Math.cos(u * Math.PI * 0.95); hy = sy - s * L * 0.04 * Math.sin(u * Math.PI); }
    else { const u = (q - 0.62) / 0.38; hx = sx + ar * Math.cos(Math.PI * 0.95 * (1 - u)); hy = sy + s * L * 0.12 * Math.sin(u * Math.PI); }
    const ex = (sx + hx) / 2 - L * 0.02, ey = (sy + hy) / 2 + s * L * 0.05;
    [[dk, L * 0.06], [huid, L * 0.046]].forEach(([kl, lw]) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); }); };
  arm(p, 1);
  ctx.beginPath(); ctx.ellipse(L * 0.1, 0, L * 0.21, L * 0.115, 0, 0, 6.283); shape(ctx, huid, dk, 1.5);
  roundRect(ctx, -L * 0.14, -L * 0.075, L * 0.12, L * 0.15, L * 0.04); shape(ctx, broek, null);
  arm((p + 0.5) % 1, -1);
  ctx.beginPath(); ctx.ellipse(L * 0.37, 0, L * 0.075, L * 0.062, 0, 0, 6.283); shape(ctx, muts, SP8_hex(muts, '#000000', 0.25), 1.5);
  ctx.restore(); }

// ---------- gestapelde balk (één stuk van de race): fr = [fosfaat, gisting, zuurstof], vul = [0..1] per deel ----------
function SP8_stapel(ctx, x, y, w, h, fr, vul = [1, 1, 1], a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#121A2A', '#3E4A62', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip(); let yy = y + h; const kl = [C.oker, C.oker, C.teal];
  // van onder naar boven: zuurstof, gisting, fosfaataccu
  [2, 1, 0].forEach(i => { const hh = h * fr[i] * ease(vul[i]); if (hh < 0.5) return; ctx.fillStyle = rgba(kl[i], 0.85); ctx.fillRect(x, yy - hh, w, hh); if (i === 1) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.strokeRect(x + 2.5, yy - hh + 2.5, w - 5, hh - 5); }
    if (i === 0) { ctx.strokeStyle = rgba('#0A0F18', 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); } yy -= hh; });
  ctx.restore(); ctx.restore(); }

// ---------- estafettestokje (doorgestreept) ----------
function SP8_stokje(ctx, x, y, a = 1, streep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.35); roundRect(ctx, -70, -14, 140, 28, 14); shape(ctx, '#C9D2DC', '#8E9AAA', 2); ctx.fillStyle = '#8E9AAA'; ctx.fillRect(-30, -14, 6, 28); ctx.fillRect(24, -14, 6, 28); ctx.restore();
  if (streep > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 80, y + 60); ctx.lineTo(x - 80 + 160 * clamp(streep, 0, 1), y + 60 - 120 * clamp(streep, 0, 1)); ctx.stroke(); ctx.restore(); } }

// ---------- onder water (zijaanzicht), wl = waterlijn; scroll = verschuiving van de strepen ----------
function SP8_onderWater(ctx, wl, t, scroll = 0) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 0, W, wl);
  ctx.fillStyle = SP8.water; ctx.fillRect(0, wl, W, 870 - wl); ctx.fillStyle = SP8.waterD; ctx.fillRect(0, wl + (870 - wl) * 0.55, W, (870 - wl) * 0.45);
  ctx.strokeStyle = rgba('#9FD0EA', 0.13); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const yy = wl + 40 + i * 52; for (let k = 0; k < 12; k++) { const xx = ((k * 230 - scroll * (0.6 + 0.1 * (i % 3)) + i * 90) % 2760 + 2760) % 2760 - 300; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 110, yy); ctx.stroke(); } }
  ctx.fillStyle = '#16222E'; ctx.fillRect(0, 852, W, 12);
  for (let x = -40; x < W + 40; x += 26) { const xx = ((x - scroll) % (W + 80) + W + 80) % (W + 80) - 40, k = Math.floor((x + 4000) / 26); circ(ctx, xx, wl - 2 + Math.sin(t * 1.6 + xx * 0.02) * 2, 9, k % 2 ? '#3D7FB3' : '#E8E4DA'); }
  ctx.strokeStyle = rgba('#BFE3F2', 0.7); ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) { const yy = wl + Math.sin((x + scroll) * 0.02 + t * 2.2) * 3; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke();
  ctx.restore(); }

// ---------- wand van het bad (zijaanzicht): water links van muur, kant rechts ----------
function SP8_wand(ctx, muur, wl, t) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 0, W, wl);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(80 + i * 300, 110, 170, 90); }
  ctx.fillStyle = SP8.dek; ctx.fillRect(muur, wl - 26, W - muur, 26); ctx.fillStyle = SP8.dekL; ctx.fillRect(muur, wl - 26, W - muur, 5); ctx.fillStyle = '#1A2436'; ctx.fillRect(muur, wl, W - muur, 875 - wl);
  ctx.restore(); }
function SP8_waterWand(ctx, muur, wl, t) { ctx.save(); ctx.fillStyle = SP8.water; ctx.beginPath(); ctx.moveTo(0, 875); for (let x = 0; x <= muur; x += 12) ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5); ctx.lineTo(muur, 875); ctx.closePath(); ctx.fill();
  ctx.fillStyle = SP8.waterD; ctx.fillRect(0, wl + (875 - wl) * 0.6, muur, (875 - wl) * 0.4);
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= muur; x += 12) { const yy = wl + Math.sin(x / 60 + t * 1.6) * 2.5; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke();
  for (let x = 20; x < muur - 30; x += 30) circ(ctx, x, wl - 3 + Math.sin(t * 1.6 + x * 0.02) * 2, 9, (Math.floor(x / 30) % 2) ? '#C9454A' : '#E8E2D4');
  ctx.fillStyle = '#9FAEB9'; ctx.fillRect(muur, wl - 26, 30, 875 - wl + 26); ctx.strokeStyle = '#C9D3DA'; ctx.lineWidth = 1.5; for (let y = wl; y < 875; y += 30) { ctx.beginPath(); ctx.moveTo(muur, y); ctx.lineTo(muur + 30, y); ctx.stroke(); }
  ctx.fillStyle = C.goud; ctx.fillRect(muur - 4, wl - 10, 4, 60); ctx.restore(); }
// de zwemmer hangt aan de kant (zijaanzicht, kijkt naar rechts naar de muur); geeft persoon-return terug
function SP8_hangen(ctx, muur, wl, t, o = {}) { const h = o.h || 470, hh = h * 1.04 / 6.1, adem = o.hijg ? Math.sin(t * 5.2) * 5 : Math.sin(t * 1.4) * 2, y = wl - 18 + h * 1.04 - hh * 1.42 + adem;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
  const r = persoon(ctx, 'sam', muur - hh * 1.25, y, h, { outfit: 'zwem', zij: true, kijk: 1, vrij: true, bril: 'muts', uit: o.uit || 'moe', t, arm: [2.2, 0.3], armVer: [0.3, 0.6], knik: o.knik || 0 }); ctx.restore();
  return r; }

// ---------- spiervezel in een zoomcirkel ----------
// (cx, cy) = midden, R = straal van de cirkel; o: kracht (0..1 hoe ver de draden schuiven), fosfaat, zuur (0..1 hoeveelheid), calcium (0..1),
// lactaat (0..1 deeltjes die naar het bloedvat drijven), bloedvat (0..1), snel (0..1 label), t
function SP8_vezel(ctx, cx, cy, R, o = {}) { const { kracht = 1, fosfaat = 0, zuur = 0, calcium = 0, lactaat = 0, bloedvat = 0, t = 0, vraag = 0 } = o;
  bg(ctx, 'micro'); const x0 = cx - R * 1.05, x1 = cx + R * 1.05, vh = R * 0.95, y0 = cy - vh / 2 - R * 0.12;
  // vezel
  roundRect(ctx, x0, y0, x1 - x0, vh, vh * 0.2); shape(ctx, SP8.vezel, SP8.vezelL, 3);
  // SR (calciumvoorraad) als buisje bovenin
  ctx.fillStyle = rgba(C.teal, 0.25); roundRect(ctx, x0 + 20, y0 + 14, x1 - x0 - 40, 26, 13); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 2; ctx.stroke();
  // sarcomeer: dikke (myosine) en dunne (actine) draden; de dunne schuiven naar het midden bij een trekking
  const tr = (0.5 + 0.5 * Math.sin(t * 3.2)) * kracht, n = 3, sw = (x1 - x0 - 80) / n;
  ctx.save(); roundRect(ctx, x0, y0, x1 - x0, vh, vh * 0.2); ctx.clip();
  for (let s = 0; s < n; s++) { const sx = x0 + 40 + s * sw, mid = sx + sw / 2, zy = y0 + 60, zh = vh - 90;
    ctx.strokeStyle = rgba('#F2D8D0', 0.65); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, zy); ctx.lineTo(sx, zy + zh); ctx.moveTo(sx + sw, zy); ctx.lineTo(sx + sw, zy + zh); ctx.stroke(); // Z-lijnen
    for (let r = 0; r < 5; r++) { const yy = zy + 18 + r * (zh - 36) / 4;
      ctx.strokeStyle = '#E3B0A4'; ctx.lineWidth = 3; const L = sw * 0.32 + sw * 0.1 * tr; ctx.beginPath(); ctx.moveTo(sx, yy - 9); ctx.lineTo(sx + L, yy - 9); ctx.moveTo(sx + sw, yy - 9); ctx.lineTo(sx + sw - L, yy - 9); ctx.stroke();
      if (r < 4) { const yd = yy + (zh - 36) / 8; ctx.strokeStyle = '#C98A80'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mid - sw * 0.24, yd); ctx.lineTo(mid + sw * 0.24, yd); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.strokeStyle = '#C98A80'; ctx.lineWidth = 3; for (let k = -3; k <= 3; k++) { if (k === 0) continue; const hx = mid + k * sw * 0.07; ctx.beginPath(); ctx.moveTo(hx, yd); ctx.lineTo(hx + Math.sign(k) * 6 * (0.4 + tr), yd - 9); ctx.moveTo(hx, yd); ctx.lineTo(hx + Math.sign(k) * 6 * (0.4 + tr), yd + 9); ctx.stroke(); } } } }
  // calcium uit het SR (wolkjes), fosfaat en H+
  const nc = Math.round(10 * calcium); for (let i = 0; i < nc; i++) { const px = x0 + 60 + hash(i * 5.1) * (x1 - x0 - 120), py = y0 + 54 + ((t * 25 + hash(i * 2.3) * 120) % 90); ctx.globalAlpha = 0.8; circ(ctx, px, py, 10 * calcium + 4, rgba(C.teal, 0.55)); circ(ctx, px + 9, py + 4, 7 * calcium + 3, rgba(C.teal, 0.55)); ctx.globalAlpha = 1; }
  const nf = Math.round(26 * fosfaat); for (let i = 0; i < nf; i++) { const px = x0 + 50 + hash(i * 3.7 + 1) * (x1 - x0 - 100) + Math.sin(t * 1.3 + i) * 5, py = y0 + 70 + hash(i * 9.1 + 2) * (vh - 110) + Math.cos(t * 1.1 + i) * 5; circ(ctx, px, py, 9, C.oker, '#F2E2B8', 1.5); }
  const nz = Math.round(22 * zuur); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < nz; i++) { const px = x0 + 50 + hash(i * 6.3 + 7) * (x1 - x0 - 100) + Math.sin(t * 1.7 + i) * 5, py = y0 + 70 + hash(i * 4.9 + 3) * (vh - 110); ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8); ctx.stroke(); }
  ctx.restore();
  // bloedvat onder de vezel, lactaat drijft erheen en wordt meegevoerd
  if (bloedvat > 0.01) SP8_laag(ctx, bloedvat, () => { const by = y0 + vh + 46; ctx.fillStyle = rgba(SP8.bloed, 0.9); roundRect(ctx, x0 - 40, by - 26, x1 - x0 + 80, 52, 26); ctx.fill();
    for (let k = 0; k < 7; k++) { const xx = x0 - 30 + ((k * 90 + t * 60) % (x1 - x0 + 60)); ctx.beginPath(); ctx.ellipse(xx, by, 12, 6, 0, 0, 6.283); ctx.fillStyle = SP8.bloedL; ctx.fill(); } });
  const nl = Math.round(12 * lactaat); for (let i = 0; i < nl; i++) { const u = ((t * 0.28 + hash(i * 1.9)) % 1), px = x0 + 70 + hash(i * 7.3) * (x1 - x0 - 140) + u * 80, py = lerp(y0 + vh * 0.55, y0 + vh + 46, ease(u * 1.4)); ctx.globalAlpha = Math.min(1, (1 - u) * 3); circ(ctx, px, py, 10, SP8.lac, '#FFF4CC', 2); ctx.globalAlpha = 1; }
  if (vraag > 0.01) SP8_laag(ctx, vraag, () => { [-1, 0, 1].forEach((k, i) => vraagteken(ctx, cx + k * R * 0.55, cy - R * 0.55 + (i === 1 ? -20 : 0) + Math.sin(t * 2 + i) * 6, 1, 90)); });
  return { y0, vh, x0, x1, by: y0 + vh + 46 }; }

// ---------- whiteboard ----------
function SP8_whiteboard(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); roundRect(ctx, x, y, w, h, 6); shape(ctx, SP8.bord, '#C7CCD4', 2); ctx.fillStyle = '#7A8496'; ctx.fillRect(x + 20, y + h + 10, w - 40, 10); ctx.restore(); }
function SP8_schrijf(ctx, s2, x, y, px, kl, u, al = 'left') { if (u <= 0.001) return; ctx.save(); ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width, x0 = al === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 4, y - px * 1.2, w * clamp(u, 0, 1) + 8, px * 1.6); ctx.clip(); text(ctx, s2, x0, y, fTekst(px, 800), kl, 'left'); ctx.restore(); }

// ---------- batterij (fosfaataccu) ----------
// (x, y) = linksboven; w × h; u = vulling 0..1; o: grijs, vraag (0..1), streep (frac), lab
function SP8_batterij(ctx, x, y, w, h, u, o = {}) { const { a = 1, grijs = 0, vraag = 0, streep = null, lab = 'FOSFAATACCU', labKl = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kl = SP8_hex(C.oker, SP8.grijs, grijs); roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1626', kl, 4); ctx.fillStyle = kl; roundRect(ctx, x + w, y + h * 0.3, w * 0.06, h * 0.4, 4); ctx.fill();
  const fw = (w - 16) * clamp(u, 0, 1); if (fw > 1) { roundRect(ctx, x + 8, y + 8, fw, h - 16, 8); ctx.fillStyle = rgba(kl, 0.85); ctx.fill(); }
  for (let k = 1; k < 5; k++) { ctx.strokeStyle = rgba('#F2F2EE', 0.15); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 8 + (w - 16) * k / 5, y + 10); ctx.lineTo(x + 8 + (w - 16) * k / 5, y + h - 10); ctx.stroke(); }
  if (streep != null) { const sx = x + 8 + (w - 16) * streep; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(sx, y - 14); ctx.lineTo(sx, y + h + 14); ctx.stroke(); ctx.setLineDash([]); }
  if (vraag > 0.01) SP8_laag(ctx, vraag, () => vraagteken(ctx, x + w * 0.3, y + h * 0.75, 1, Math.round(h * 0.9)));
  if (lab) metaText(ctx, lab, x + w / 2, y - 22, labKl || kl, 'center', 28);
  ctx.restore(); }

// ---------- stopwatch, lactaatmeter, klembord ----------
function SP8_stopwatch(ctx, x, y, r, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#AFC0D0'; ctx.fillRect(x - r * 0.15, y - r * 1.32, r * 0.3, r * 0.26);
  circ(ctx, x, y, r, '#E8ECF0', '#8FA0B5', 4); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.8, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u % 1.0001, 0, 1)); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill();
  const an = -Math.PI / 2 + 6.283 * u; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#1A2740'); ctx.restore(); }
function SP8_lactaatMeter(ctx, x, y, s, waarde, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -100, 120, 200, 22); shape(ctx, '#3A4458', '#6A768C', 3); roundRect(ctx, -44, -76, 88, 70, 8); shape(ctx, '#B8D8A8', '#2A3446', 2);
  if (waarde) text(ctx, waarde, 0, -28, fMeta(waarde.length > 3 ? 30 : 40), '#1A2A1A', 'center');
  circ(ctx, -22, 40, 13, '#5A6478', '#8FA0B5', 2); circ(ctx, 22, 40, 13, '#5A6478', '#8FA0B5', 2); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(-10, -146, 20, 46); ctx.restore(); }
// klembord met splittijden; kol = [{kop, tijden[4], totaal, a:[4], totA, kl:[4]}]; o.vb = label VOORBEELD
function SP8_klembord(ctx, x, y, w, h, kol, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, '#8A6A48', '#6E5236', 3); roundRect(ctx, x + 18, y + 28, w - 36, h - 46, 8); shape(ctx, '#F2F2EE', '#C7CCD4', 2);
  roundRect(ctx, x + w / 2 - 70, y - 12, 140, 40, 8); shape(ctx, '#AFC0D0', '#7A8496', 2);
  const rx = x + 50, ry = y + 100, rh = (h - 210) / 4;
  metaText(ctx, 'M', rx, ry, '#56627E', 'left', 26);
  for (let i = 0; i < 4; i++) metaText(ctx, String((i + 1) * 50), rx, ry + 30 + (i + 0.6) * rh, '#56627E', 'left', 28);
  metaText(ctx, 'TOTAAL', rx, ry + 30 + 4 * rh + 40, '#56627E', 'left', 26);
  ctx.strokeStyle = '#C7CCD4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 36, ry + 30 + 4 * rh + 6); ctx.lineTo(x + w - 36, ry + 30 + 4 * rh + 6); ctx.stroke();
  kol.forEach((k, j) => { const cx = x + w * (0.48 + j * 0.3); if ((k.kopA == null ? 1 : k.kopA) > 0.01) SP8_laag(ctx, k.kopA == null ? 1 : k.kopA, () => metaText(ctx, k.kop, cx, ry, '#56627E', 'center', 28));
    k.tijden.forEach((s2, i) => { const aa = (k.a || [])[i] || 0; if (aa <= 0.01 || !s2) return; SP8_laag(ctx, aa, () => text(ctx, s2, cx, ry + 30 + (i + 0.6) * rh + 14, fMeta(44), (k.kl && k.kl[i]) || SP8.inkt, 'center')); });
    if (k.totaal && (k.totA || 0) > 0.01) SP8_laag(ctx, k.totA, () => text(ctx, k.totaal, cx, ry + 30 + 4 * rh + 44, fMeta(46), k.totKl || SP8.inkt, 'center')); });
  ctx.restore(); if (o.vb !== false) SP8_meta(ctx, 'VOORBEELD', x + w, y + h + 40, a, C.grain, 'right'); }
// snelheidslint: 4 stukken van de race (kleur per split), hoogte = snelheid
function SP8_lint(ctx, x, y, w, splits, a = 1, o = {}) { if (a <= 0.01 || !splits) return; const { lab = '', vul = 1, kleur = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const dx = w / 4; if (lab) metaText(ctx, lab, x - 24, y + 10, C.text2, 'right', 28);
  splits.forEach((s, i) => { const u = clamp(vul * 4 - i, 0, 1); if (u <= 0.01) return; const v = 50 / s, hgt = Math.max(16, (v - 1.5) * 250 + 10), kl = kleur ? SP8_hex(C.goud, C.koraal, clamp((s - 29.5) / 2.5, 0, 1)) : '#6E7890';
    roundRect(ctx, x + i * dx + 4, y - hgt / 2, (dx - 8) * u, hgt, 8); ctx.fillStyle = rgba(kl, 0.85); ctx.fill(); });
  ctx.restore(); }

// ---------- klok (digitaal) ----------
function SP8_klokKaart(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520, 150, 14); shape(ctx, '#0B0F16', '#4A5568', 3);
  metaText(ctx, 'SERIE', x + 40, y + 60, C.text2, 'left', 28); text(ctx, '10:05', x + 40, y + 122, fMeta(52), '#F2B84A', 'left');
  metaText(ctx, 'FINALE', x + 290, y + 60, C.text2, 'left', 28); text(ctx, '17:30', x + 290, y + 122, fMeta(52), '#F2B84A', 'left'); ctx.restore(); }

// ---------- uitzwembad (zijaanzicht), met bank ----------
function SP8_uitzwembad(ctx, t, o = {}) { const { vloer = 700, x0 = 470, x1 = 960 } = o; ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(60, 160, 960, vloer - 160);
  ctx.fillStyle = SP8.dek; ctx.fillRect(60, vloer, x0 - 60, 18); ctx.fillStyle = SP8.dekL; ctx.fillRect(60, vloer, x0 - 60, 4); ctx.fillStyle = '#1A2436'; ctx.fillRect(60, vloer + 18, x0 - 60, 860 - vloer - 18);
  ctx.fillStyle = SP8.water; ctx.fillRect(x0, vloer + 10, x1 - x0, 860 - vloer - 10); ctx.fillStyle = SP8.waterD; ctx.fillRect(x0, vloer + 90, x1 - x0, 860 - vloer - 90);
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 10) { const yy = vloer + 10 + Math.sin(x / 40 + t * 1.6) * 2.5; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
  ctx.fillStyle = SP8.tegel; ctx.fillRect(x1, vloer, 60, 860 - vloer); ctx.fillStyle = '#9FAEB9'; ctx.fillRect(x0 - 8, vloer, 8, 860 - vloer);
  ctx.restore(); }
function SP8_bank(ctx, x, w, zitY, vloer) { ctx.save(); ctx.fillStyle = '#7A6248'; roundRect(ctx, x, zitY - 6, w, 22, 6); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(x + 20, zitY + 14, 14, vloer - zitY - 14); ctx.fillRect(x + w - 34, zitY + 14, 14, vloer - zitY - 14); ctx.restore(); }
// handdoek om de schouders (vooraanzicht); r = return van persoon()
function SP8_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + s * hh * 0.9, sy - hh * 0.2, x + s * hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + s * hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + s * hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + s * hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + s * hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + s * hh * 0.95, sy + hh * 0.7, x + s * hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.strokeStyle = C.teal; ctx.lineWidth = hh * 0.08; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 0.24, sy + hh * 1.5); ctx.lineTo(x + s * hh * 0.6, sy + hh * 1.55); ctx.stroke(); }
  ctx.restore(); }

// ---------- proefopzet uitzwemmen ----------
// (x, y) = linksboven, w 800; o: tijden (0..1 per kolom), hl (0..1 per kolom), lijn (0..1)
const SP8_PROEF = [['STIL', '65,9', ''], ['5 MIN', '64,5', 'RUSTIG'], ['10 MIN', '65,5', 'RUSTIG']];
function SP8_proef(ctx, x, y, o = {}) { const { a = 1, tijden = [0, 0, 0], hl = [0, 0, 0], lijn = 0, w = 800 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  SP8_kaart(ctx, x, y, w, 520, 1, C.line);
  // tijdbalk 100 m · 15 min · 100 m
  const ty = y + 80; roundRect(ctx, x + 40, ty - 22, 150, 44, 10); shape(ctx, rgba(C.goud, 0.8), null); text(ctx, '100 M', x + 115, ty + 11, fMeta(30), '#121A26', 'center');
  roundRect(ctx, x + w - 190, ty - 22, 150, 44, 10); shape(ctx, rgba(C.goud, 0.8), null); text(ctx, '100 M', x + w - 115, ty + 11, fMeta(30), '#121A26', 'center');
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x + 200, ty); ctx.lineTo(x + w - 200, ty); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, '15 MIN PAUZE', x + w / 2, ty - 18, C.text2, 'center', 28);
  const cw = (w - 80) / 3; SP8_PROEF.forEach(([lab, tijd, lab2], i) => { const cx = x + 40 + cw * (i + 0.5), cy = y + 170;
    if (hl[i] > 0.01) SP8_laag(ctx, hl[i], () => { roundRect(ctx, cx - cw / 2 + 8, cy - 56, cw - 16, 280, 14); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.stroke(); });
    metaText(ctx, lab, cx, cy - (lab2 ? 16 : 0), i === 0 ? C.text2 : C.teal, 'center', 28); if (lab2) metaText(ctx, lab2, cx, cy + 16, C.teal, 'center', 28);
    // pictogram: bank of golfjes
    if (i === 0) { ctx.fillStyle = '#7A6248'; roundRect(ctx, cx - 50, cy + 50, 100, 14, 5); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(cx - 40, cy + 64, 10, 30); ctx.fillRect(cx + 30, cy + 64, 10, 30); }
    else { ctx.strokeStyle = C.teal; ctx.lineWidth = 4; for (const dy of [0, 22]) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = cx - 50 + k * 5, yy = cy + 60 + dy + 6 * Math.sin(k * 0.6); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
    roundRect(ctx, cx - 95, cy + 130, 190, 80, 12); shape(ctx, '#0B0F16', '#3E4A62', 2);
    if (tijden[i] > 0.01) SP8_laag(ctx, tijden[i], () => text(ctx, tijd + ' S', cx, cy + 186, fMeta(44), i === 1 ? C.groen : '#F2B84A', 'center')); });
  // lactaat tijdens de pauze: twee lijnen (stil daalt trager)
  if (lijn > 0.01) SP8_laag(ctx, lijn, () => { const gx = x + 60, gy = y + 495, gw = w - 120, gh = 60; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10); ctx.lineTo(gx, gy + 6); ctx.lineTo(gx + gw, gy + 6); ctx.stroke();
    metaText(ctx, 'LACTAAT IN DE PAUZE', gx + 10, gy - gh - 14, C.text2, 'left', 24);
    const pad = (k, kl, lab) => { ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40 * clamp(lijn * 1.2, 0, 1), xx = gx + u * gw, yy = gy - gh * Math.exp(-u * k); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); };
    pad(0.6, C.text2); pad(2.2, C.teal); metaText(ctx, 'STIL', gx + gw - 6, gy - gh * Math.exp(-0.6) - 12, C.text2, 'right', 26); metaText(ctx, 'RUSTIG ZWEMMEN', gx + gw * 0.42, gy - 4, C.teal, 'left', 26); });
  ctx.restore(); }

// ---------- snelheidsprofiel per afstand ----------
// (x, y) = linksboven van het vak, w × h; soort '100'|'200'|'400'|'800'|'1500'; u = tekenvoortgang 0..1; piek = 0..1 eindsprint oplichten
function SP8_profiel(ctx, x, y, w, h, soort, u, o = {}) { const { a = 1, piek = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = { '100': 2, '200': 4, '400': 8, '800': 16, '1500': 30 }[soort];
  const v = (i) => { if (soort === '100') return [0.95, 0.45][i]; if (soort === '200' || soort === '400') return i === 0 ? 0.92 : 0.5 + (soort === '400' && i === n - 1 ? 0.04 : 0); return i === n - 1 ? 0.82 : 0.46 + 0.02 * Math.sin(i * 1.7); };
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const bw = w / n, m = Math.floor(n * clamp(u, 0, 1) + 0.0001);
  for (let i = 0; i < n; i++) { const fr = clamp(n * u - i, 0, 1); if (fr <= 0.01) continue; const hv = v(i) * h * ease(fr), eind = (soort === '800' || soort === '1500') && i === n - 1;
    roundRect(ctx, x + i * bw + Math.min(3, bw * 0.15), y + h - hv, Math.max(2, bw - Math.min(6, bw * 0.3)), hv, Math.min(6, bw * 0.3)); ctx.fillStyle = eind ? SP8_mix(C.teal, C.goud, 0.4 + 0.6 * piek) : rgba(C.teal, 0.8); ctx.fill(); }
  ctx.restore(); }

// ---------- figuurtje voor een groep (silhouet, castpersonage ingekleurd) ----------
let SP8_off = null;
function SP8_sil(ctx, kleur, fn) { if (!SP8_off) { SP8_off = document.createElement('canvas'); SP8_off.width = W; SP8_off.height = H; } const o = SP8_off.getContext('2d');
  o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.clearRect(0, 0, W, H); fn(o);
  o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, W, H); o.globalCompositeOperation = 'source-over'; ctx.drawImage(SP8_off, 0, 0); }

// ---------- beroepkaartje met pictogram ----------
function SP8_beroep(ctx, x, y, w, naam, sub, icoon, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(60 * (1 - ease(a)), 0);
  SP8_kaart(ctx, x, y, w, 120, 1, kl); const ix = x + 70, iy = y + 60;
  if (icoon === 'stopwatch') SP8_stopwatch(ctx, ix, iy + 6, 34, 0.3, 1);
  else if (icoon === 'meter') SP8_lactaatMeter(ctx, ix, iy + 14, 0.38, '', 1);
  else if (icoon === 'grafiek') { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.strokeRect(ix - 40, iy - 32, 80, 64); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ix - 32, iy + 18); ctx.lineTo(ix - 12, iy - 2); ctx.lineTo(ix + 6, iy + 6); ctx.lineTo(ix + 32, iy - 22); ctx.stroke(); }
  else if (icoon === 'boek') { ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(ix, iy - 24); ctx.lineTo(ix - 44, iy - 32); ctx.lineTo(ix - 44, iy + 26); ctx.lineTo(ix, iy + 34); ctx.lineTo(ix + 44, iy + 26); ctx.lineTo(ix + 44, iy - 32); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ix, iy - 24); ctx.lineTo(ix, iy + 34); ctx.stroke(); }
  text(ctx, naam, x + 140, y + (sub ? 56 : 72), fTekst(40, 800), C.text, 'left'); if (sub) metaText(ctx, sub, x + 140, y + 96, C.grain, 'left', 26);
  ctx.restore(); }

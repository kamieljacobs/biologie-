// Zenuwstelsel 3 · De spleet 2.0 — eigen tekeningen (lichte remake, 29 okt 2026).
// Kleuren (Regeling, Kamiel 29 okt 2026 'gelijktrekken'): zenuwsignaal teal, neurotransmitter licht teal, cellen neutraal.
grain = function () {}; // BEELDAFSPRAKEN: geen korrel op de achtergrond
const Z3 = { imp: '#5BA4C9', nt: '#9CCBE3', ntR: '#CFE6F2', cel: '#7D8BA6', celL: '#A9B5C9', cyt: '#2A3550', post: '#2E3A4E', ion: '#D8DDE6', exc: '#7FC48F', rem: '#E07A5F', geur: '#E3C38A', rec: '#8FB3AD', trans: '#B9A88A' };
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
function ring(ctx, x, y, r, a = 1, kleur = C.goud, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
// sleutelframes [[tijd, waarde], ...] → gladde waarde
function sleutel(t, K) { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t <= K[i][0]) { const [t0, v0] = K[i - 1], [t1, v1] = K[i]; return lerp(v0, v1, ease((t - t0) / Math.max(0.001, t1 - t0))); } return K[K.length - 1][1]; }
function ntMol(ctx, x, y, r = 5, a = 1, rand = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = Z3.nt; ctx.fill(); ctx.strokeStyle = rand ? C.goud : Z3.ntR; ctx.lineWidth = rand ? 2.5 : 1.2; ctx.stroke(); ctx.restore(); }
function ion(ctx, x, y, s, a = 1, px = 22) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, px * 0.55, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.6); ctx.fill(); ctx.strokeStyle = Z3.ion; ctx.lineWidth = 1.5; ctx.stroke(); text(ctx, s, x, y + px * 0.35, fTekst(px, 700), Z3.ion, 'center'); ctx.restore(); }

// =====================================================================================
// SYNAPS — afgeleid van synapsEcht (beeldbank, lib_bio.js), zelfde opbouw en fasen; hier met de kleuren van de
// Regeling (impuls teal als vlak bandje, neurotransmitter licht teal, receptoren neutraal), een stukje axon boven de knop,
// optioneel geen eigen neurotransmitter (de scène tekent hem zelf), vaste binding (recVast) en een impuls in de volgende cel
// (postPuls 0..1). Oorsprong = midden van de spleet; knop y −300..−10, volgende cel y 20..300 (× s).
// Kandidaat voor de beeldbank (Kamiel: nieuwe beeldbankobjecten later).
// =====================================================================================
function synapsZ3(ctx, x, y, s = 1, o = {}) {
  const { a = 1, fase = 0, t = 0, hi = null, nt = true, recVast = 0, postPuls = -1, axon = 0, ionen = true, ionLab = 'Na⁺', rot = 0, dimKnop = 1, dimPost = 1 } = o;
  const RX = [-150, -90, -30, 30, 90, 150]; const postY = xx => 22 + (xx / 300) ** 2 * 30;
  const W = (px, py) => { const c = Math.cos(rot), sn = Math.sin(rot); return [x + (px * c - py * sn) * s, y + (px * sn + py * c) * s]; };
  const anker = { knop: W(-170, -170), blaasje: W(-60, -120), spleet: W(250, 6), spleetL: W(-250, 6), receptor: W(-40, 40), transporter: W(130, -16), transL: W(-130, -16), volgend: W(-160, 180), ca: W(-200, -10), axonTop: W(0, -300 - axon), W,
    receptoren: RX.map(rx => W(rx, postY(rx))), recY: postY };
  if (a <= 0.01) return anker;
  const H = k => Array.isArray(hi) ? hi.includes(k) : hi === k;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const seg = (u0, u1) => clamp((fase - u0) / (u1 - u0), 0, 1);
  const imp = seg(0.05, 0.2), ca = seg(0.15, 0.35), fus = seg(0.28, 0.5), dif = seg(0.4, 0.65), bind = Math.max(seg(0.58, 0.8), recVast), her = seg(0.7, 1);
  const MEM = C.er;
  // ---------- knop + axon ----------
  ctx.save(); ctx.globalAlpha *= dimKnop;
  const KNOP = [[-62, -300 - axon], [-62, -300], [-80, -258], [-200, -215], [-262, -120], [-240, -50], [-180, -16], [-60, -8], [60, -8], [180, -16], [240, -50], [262, -120], [200, -215], [80, -258], [62, -300], [62, -300 - axon]];
  const KN = axon > 0 ? KNOP : KNOP.slice(1, -1);
  ctx.beginPath(); bioPad(ctx, KN, false); ctx.closePath(); ctx.fillStyle = Z3.cyt; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-240 + hash(i) * 480, -290 + hash(i + 50) * 270, 1.5, 0, 6.283); ctx.fill(); }
  if (imp > 0.01 && imp < 1) { const yy = lerp(-300 - axon * 0.6, -60, imp); ctx.fillStyle = rgba(Z3.imp, 0.55 * Math.sin(Math.min(1, imp * 1.15) * 3.14)); ctx.fillRect(-270, yy - 22, 540, 44); }
  mitochondrion(ctx, 130, -165, 90, 0.5, 0.95, 5, t); mitochondrion(ctx, -160, -150, 70, -0.6, 0.95, 4, t);
  ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, KN, false); ctx.stroke();
  ctx.strokeStyle = rgba(MEM, 0.5); ctx.lineWidth = 1.5; ctx.save(); ctx.translate(0, -5); ctx.scale(0.97, 0.98); ctx.beginPath(); bioPad(ctx, KN, false); ctx.stroke(); ctx.restore();
  ctx.restore();
  // ---------- volgende cel ----------
  ctx.save(); ctx.globalAlpha *= dimPost;
  const POST = []; for (let i = 0; i <= 12; i++) { const xx = -300 + i * 50; POST.push([xx, postY(xx)]); }
  ctx.beginPath(); bioPad(ctx, POST, false); ctx.lineTo(300, 170); ctx.quadraticCurveTo(0, 330, -300, 170); ctx.closePath(); ctx.fillStyle = Z3.post; ctx.fill();
  ctx.save(); ctx.clip();
  const pp = (postPuls >= 0 && postPuls <= 1) ? [postPuls] : (Array.isArray(postPuls) ? postPuls : []);
  pp.forEach(u => { if (u < 0 || u > 1) return; ctx.fillStyle = rgba(Z3.imp, 0.6 * Math.sin(Math.min(1, u * 1.1) * 3.14)); ctx.fillRect(-300, lerp(60, 300, u) - 22, 600, 44); });
  ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, POST, false); ctx.stroke();
  ctx.strokeStyle = rgba(MEM, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-300, postY(-300) + 6); for (let i = 1; i <= 12; i++) { const xx = -300 + i * 50; ctx.lineTo(xx, postY(xx) + 6); } ctx.stroke();
  // receptoren (ionkanalen) loodrecht in het membraan
  RX.forEach((rx, i) => { const ry = postY(rx); const bezet = Math.max(recVast, bind * (i % 2 === 0 || bind > 0.6 ? 1 : 0)); const open = Math.max(recVast, bezet * (1 - seg(0.85, 1)));
    ctx.fillStyle = H('receptor') ? C.goud : Z3.rec; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(rx + sd * (7 + 4 * open), ry + 4, 6.5, 17, 0, 0, 6.283); ctx.fill(); }
    if (nt && bezet > 0.5 && (recVast > 0.5 || seg(0.85, 1) < 1)) ntMol(ctx, rx, ry - 15, 5.5, recVast > 0.5 ? 1 : 1 - seg(0.85, 1));
    if (ionen && open > 0.3) { ctx.fillStyle = Z3.ion; for (let k = 0; k < 2; k++) { const v = (t * 1.2 + k * 0.5 + i * 0.13) % 1; ctx.beginPath(); ctx.arc(rx, ry - 10 + v * 50, 3.5, 0, 6.283); ctx.fill(); } } });
  ctx.restore();
  // Ca2+-kanalen + heropname-transporters in het membraan van de knop
  ctx.save(); ctx.globalAlpha *= dimKnop;
  const kanaal = (kx, open, col) => { ctx.fillStyle = col; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(kx + sd * (6 + 3 * open), -10, 6, 15, 0, 0, 6.283); ctx.fill(); } };
  kanaal(-200, ca * (1 - seg(0.4, 0.55)), H('ca') ? C.goud : '#9AA3B2'); kanaal(200, ca * (1 - seg(0.4, 0.55)), H('ca') ? C.goud : '#9AA3B2');
  if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, ca * 3) * (1 - seg(0.5, 0.7)); ctx.fillStyle = Z3.ion; for (let k = 0; k < 10; k++) { const sd = k % 2 ? 1 : -1; const v = (ca * 1.4 + hash(k)) % 1;
      ctx.beginPath(); ctx.arc(sd * 200 + (hash(k + 4) - 0.5) * 30 - sd * v * 60, 20 - v * 90, 3.2, 0, 6.283); ctx.fill(); } ctx.restore(); }
  for (const tx of [-130, 130]) { ctx.fillStyle = H('transporter') ? C.goud : Z3.trans; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx - 12, -26, 24, 30, 8) : ctx.rect(tx - 12, -26, 24, 30); ctx.fill(); }
  // blaasjes: stil → naar de actieve zone → versmelten (Ω-vorm)
  const BL = [[-80, -60], [-20, -50], [40, -58], [100, -66], [-120, -110], [-50, -120], [20, -112], [80, -130], [-10, -175], [60, -190], [-90, -200]];
  BL.forEach(([bx, by], i) => { const vrij = i < 4; const r = 15; let px = bx + Math.sin(t * 0.7 + i) * 2, py = by + Math.cos(t * 0.6 + i) * 2;
    if (vrij) { const dock = ease(seg(0.28, 0.38)); py = lerp(py, -8 - r, dock); }
    const open = vrij ? ease(seg(0.36, 0.5)) : 0;
    if (open < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - open; ctx.beginPath(); ctx.arc(px, py + open * r, r * (1 - 0.5 * open), 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.3); ctx.fill(); ctx.strokeStyle = H('blaasje') ? C.goud : C.vesR; ctx.lineWidth = H('blaasje') ? 3.5 : 2.5; ctx.stroke();
      if (open < 0.3) { ctx.fillStyle = Z3.nt; for (let k = 0; k < 5; k++) { const an = k * 1.26 + i; ctx.beginPath(); ctx.arc(px + Math.cos(an) * 7, py + Math.sin(an) * 7, 2.8, 0, 6.283); ctx.fill(); } } ctx.restore(); }
    if (open > 0.05) { ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, -8, r * open * 0.9, 3.1416, 6.2832); ctx.stroke(); } });
  ctx.restore();
  // neurotransmitter in de spleet (en heropname)
  if (nt && fus > 0.5) { const N = 26; for (let k = 0; k < N; k++) { const bx = BL[k % 4][0]; const tt = dif; const tx = RX[k % RX.length];
      let px = lerp(bx + (hash(k) - 0.5) * 20, tx + (hash(k * 3) - 0.5) * 30, tt), py = lerp(-6, postY(tx) - 18, tt) + Math.sin(t * 3 + k) * 3;
      if (her > 0.01 && k % 3 !== 0) { const tr = k % 2 ? 130 : -130; px = lerp(px, tr, her); py = lerp(py, lerp(-10, -60, clamp(her * 1.6 - 0.6, 0, 1)), her); }
      const al = Math.min(1, (fus - 0.5) * 4) * (k % 3 === 0 ? 1 - seg(0.85, 1) : 1); ntMol(ctx, px, py, 4.5, al); } }
  if (H('spleet')) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(-280, -6, 560, 30); ctx.setLineDash([]); }
  ctx.restore(); return anker;
}

// ketting van zenuwcellen met spleten (cold open, samenvatting): van p0 naar p1, n cellen; puls 0..1 over de hele ketting
function ketting(ctx, x0, y0, x1, y1, n, o = {}) {
  const { a = 1, s = 0.7, puls = -1, t = 0, gap = 26, hiGap = -1 } = o; if (a <= 0.01) return [];
  ctx.save(); ctx.globalAlpha *= a; const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, st = L / n; const gaten = [];
  for (let i = 0; i < n; i++) { const cx = x0 + ux * (st * i + 34 * s), cy = y0 + uy * (st * i + 34 * s); const ex = x0 + ux * (st * (i + 1) - gap * s), ey = y0 + uy * (st * (i + 1) - gap * s);
    const pu = puls * n - i; zenuwcel(ctx, cx, cy, { s, col: Z3.cel, naar: [ex, ey], seed: i + 2, takken: 5, axonDik: 5, puls: pu >= 0 && pu <= 1 ? pu : -1, pulsCol: Z3.imp });
    if (i < n - 1) gaten.push([x0 + ux * (st * (i + 1) - gap * s * 0.2), y0 + uy * (st * (i + 1) - gap * s * 0.2)]); }
  ctx.restore(); return gaten;
}

// meter van de membraanpotentiaal (Schema-grafiek): V(t) over een venster
function potMeter(ctx, x, y, w, h, Vf, tNu, o = {}) {
  const { a = 1, venster = 12, vmin = -85, vmax = 40, drempel = 1, kleur = Z3.imp } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const Y = v => y + h - (v - vmin) / (vmax - vmin) * h;
  roundRect(ctx, x - 20, y - 70, w + 40, h + 120, 14); shape(ctx, rgba(C.bgMicro, 0.55), rgba(C.line, 0.5), 1.5);
  metaText(ctx, 'membraanpotentiaal', x, y - 30, C.grain, 'left', 28);
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  for (const v of [-70, 0]) { metaText(ctx, String(v).replace('-', '−'), x - 12, Y(v) + 10, C.text2, 'right', 28); ctx.strokeStyle = rgba(C.line, 0.25); ctx.beginPath(); ctx.moveTo(x, Y(v)); ctx.lineTo(x + w, Y(v)); ctx.stroke(); }
  metaText(ctx, 'mV', x - 12, y + 10, C.text2, 'right', 28);
  if (drempel > 0.01) { ctx.save(); ctx.globalAlpha *= drempel; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.moveTo(x, Y(-55)); ctx.lineTo(x + w, Y(-55)); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'drempel −55', x + w - 6, Y(-55) - 14, C.goud, 'right', 28); ctx.restore(); }
  ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.beginPath(); const N = 160; for (let i = 0; i <= N; i++) { const tt = tNu - venster + venster * i / N; const v = Vf(tt); const px = x + w * i / N, py = Y(clamp(v, vmin, vmax)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  const v0 = Vf(tNu); ctx.fillStyle = kleur; ctx.beginPath(); ctx.arc(x + w, Y(clamp(v0, vmin, vmax)), 8, 0, 6.283); ctx.fill();
  ctx.restore(); return Y;
}
// kernel voor een kleine verandering van de potentiaal (stijgt in 0,4 s, zakt in ± 2,5 s terug)
function psp(t, t0, amp) { if (!isFinite(t0) || t < t0) return 0; const u = t - t0; return amp * (1 - Math.exp(-u / 0.18)) * Math.exp(-u / 2.2); }
function spike(t, t0) { if (!isFinite(t0) || t < t0) return 0; const u = t - t0; if (u < 0.25) return lerp(0, 100, u / 0.25); if (u < 0.6) return lerp(100, -12, (u - 0.25) / 0.35); return -12 * Math.exp(-(u - 0.6) / 0.8); }

// synapsknopje op een cellichaam (a3): axon van buiten, knop tegen het membraan, spleetje met neurotransmitter
function knopOp(ctx, cx, cy, R, an, o = {}) {
  const { a = 1, teken = '+', kleur = Z3.exc, nt = 0, t = 0, lab = true, puls = -1, ionIn = 0, ionS = 'Na⁺', sz = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const ux = Math.cos(an), uy = Math.sin(an); const kx = cx + ux * (R + 38 * sz), ky = cy + uy * (R + 38 * sz);
  const ax = cx + ux * (R + 300 * sz), ay = cy + uy * (R + 300 * sz) ;
  ctx.strokeStyle = Z3.cel; ctx.lineWidth = 10 * sz; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(cx + ux * (R + 170 * sz) - uy * 30, cy + uy * (R + 170 * sz) + ux * 30, kx + ux * 20 * sz, ky + uy * 20 * sz); ctx.stroke();
  if (puls >= 0 && puls <= 1) { const px = lerp(ax, kx, puls), py = lerp(ay, ky, puls); ctx.fillStyle = Z3.imp; ctx.beginPath(); ctx.arc(px, py, 11 * sz, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(kx, ky, 34 * sz, 26 * sz, an, 0, 6.283); shape(ctx, Z3.cyt, C.er, 3);
  for (let k = 0; k < 4; k++) { const q = (k - 1.5) * 0.5; ctx.beginPath(); ctx.arc(kx + Math.cos(an + q + 3.1416) * 0 + Math.cos(an + 1.57) * (k - 1.5) * 12 * sz, ky + Math.sin(an + 1.57) * (k - 1.5) * 12 * sz, 7 * sz, 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.35); ctx.fill(); ctx.strokeStyle = C.vesR; ctx.lineWidth = 1.5; ctx.stroke(); }
  if (nt > 0.01) for (let k = 0; k < 6; k++) { const q = (k - 2.5) * 9 * sz, d = lerp(R + 10 * sz, R + 4 * sz, nt); ntMol(ctx, cx + ux * d - uy * q, cy + uy * d + ux * q, 3.5 * sz, Math.min(1, nt * 2)); }
  if (ionIn > 0.01) for (let k = 0; k < 3; k++) { const v = (ionIn * 1.3 + k / 3) % 1; const d = lerp(R + 6, R - 70 * sz, v); ion(ctx, cx + ux * d - uy * (k - 1) * 36 * sz, cy + uy * d + ux * (k - 1) * 36 * sz, ionS, Math.min(1, ionIn * 3) * Math.sin(v * 3.14), 20); }
  const lx = kx + ux * 72 * sz + uy * 46 * sz, ly = ky + uy * 72 * sz - ux * 46 * sz;
  if (lab) { ctx.beginPath(); ctx.arc(lx, ly, 26, 0, 6.283); shape(ctx, rgba('#121A26', 0.8), kleur, 3); text(ctx, teken, lx, ly + 13, fTekst(40, 700), kleur, 'center'); }
  ctx.restore(); return { lab: [lx, ly], knop: [kx, ky] };
}
// kleine plus- of minknopjes rondom (duizenden aansluitingen)
function knopjes(ctx, cx, cy, R, n, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const an = hash(i * 7 + 1) * 6.283, d = R + 6 + hash(i * 3) * 6; const plus = hash(i * 11) > 0.42; const x = cx + Math.cos(an) * d, y = cy + Math.sin(an) * d;
    if (Math.abs(an - 0.35) < 0.35) continue; // axon blijft vrij
    const fl = 0.55 + 0.45 * Math.sin(t * 2 + i); ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); shape(ctx, rgba(plus ? Z3.exc : Z3.rem, 0.35 * fl), plus ? Z3.exc : Z3.rem, 1.5); }
  ctx.restore(); }

// spiervezel met motorisch neuron en eindplaat (a5)
function eindplaat(ctx, x, y, o = {}) {
  const { a = 1, c = 0, nt = 0, bind = 0, t = 0, puls = -1, hi = null } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const w = 1100, h = 120; spierVezel(ctx, x - w / 2 + w * 0.075 * c, y, w, h, { c, seed: 4, streep: 30 });
  // motorisch neuron van boven
  const kx = x, ky = y - h / 2 - 34; ctx.strokeStyle = Z3.cel; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x - 260, 120); ctx.quadraticCurveTo(x - 40, 150, kx, ky - 40); ctx.stroke();
  if (puls >= 0 && puls <= 1) { const u = puls; const p = [lerp(lerp(x - 260, x - 40, u), lerp(x - 40, kx, u), u), lerp(lerp(120, 150, u), lerp(150, ky - 40, u), u)]; ctx.fillStyle = Z3.imp; ctx.beginPath(); ctx.arc(p[0], p[1], 14, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(kx, ky, 120, 40, 0, 0, 6.283); shape(ctx, Z3.cyt, C.er, 3);
  for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(kx - 70 + k * 28, ky - 6 + (k % 2) * 10, 9, 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.35); ctx.fill(); ctx.strokeStyle = C.vesR; ctx.lineWidth = 1.5; ctx.stroke(); }
  // receptoren op de spiervezel
  for (let k = 0; k < 7; k++) { const rx = kx - 96 + k * 32, ry = y - h / 2 + 2; ctx.fillStyle = hi === 'receptor' ? C.goud : Z3.rec; ctx.beginPath(); ctx.ellipse(rx - 5, ry, 4.5, 11, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(rx + 5, ry, 4.5, 11, 0, 0, 6.283); ctx.fill();
    if (bind > 0.5) ntMol(ctx, rx, ry - 12, 4.5, bind); }
  if (nt > 0.01 && bind < 0.6) for (let k = 0; k < 14; k++) { const sx = kx - 90 + hash(k) * 180; ntMol(ctx, sx + Math.sin(t * 2 + k) * 3, lerp(ky + 30, y - h / 2 - 12, nt) + (hash(k + 5) - 0.5) * 8, 4, Math.min(1, nt * 3)); }
  ctx.restore(); return { knop: [kx, ky], vezel: [x + w * 0.3, y], neuron: [x - 230, 150] };
}

// bakkerij (cold open): vlakke gevel met luifel, etalage met broden, deur
function bakkerij(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#4A3F3A'; ctx.fillRect(x, y - h, w, h); ctx.fillStyle = '#3A322E'; ctx.fillRect(x, y - h, w, 26);
  // luifel
  const lw = w + 40; for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#E8DCC4' : '#C2654F'; ctx.beginPath(); const x0 = x - 20 + i * lw / 8; ctx.moveTo(x0, y - h + 120); ctx.lineTo(x0 + lw / 8, y - h + 120); ctx.lineTo(x0 + lw / 8, y - h + 180); ctx.quadraticCurveTo(x0 + lw / 16, y - h + 200, x0, y - h + 180); ctx.closePath(); ctx.fill(); }
  // etalage
  const ex = x + 30, ey = y - h + 220, ew = w * 0.55, eh = h - 300; ctx.fillStyle = '#E9C98A'; ctx.globalAlpha *= 0.9; ctx.fillRect(ex, ey, ew, eh); ctx.globalAlpha /= 0.9; ctx.strokeStyle = '#2A2422'; ctx.lineWidth = 8; ctx.strokeRect(ex, ey, ew, eh);
  ctx.fillStyle = '#8C6A4A'; ctx.fillRect(ex, ey + eh * 0.62, ew, 8);
  const brood = (bx, by, s) => { ctx.beginPath(); ctx.ellipse(bx, by, 46 * s, 26 * s, 0, 3.1416, 6.2832); ctx.lineTo(bx + 46 * s, by + 4 * s); ctx.lineTo(bx - 46 * s, by + 4 * s); ctx.closePath(); shape(ctx, '#B9783E', '#8C5A2E', 2); ctx.strokeStyle = '#E8C48A'; ctx.lineWidth = 3; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(bx + k * 16 * s - 6 * s, by - 18 * s); ctx.lineTo(bx + k * 16 * s + 6 * s, by - 6 * s); ctx.stroke(); } };
  for (let k = 0; k < 3; k++) brood(ex + ew * (0.2 + k * 0.3), ey + eh * 0.62, 1.1); for (let k = 0; k < 2; k++) brood(ex + ew * (0.35 + k * 0.3), ey + eh * 0.32, 0.9);
  // deur
  const dx = x + w * 0.66, dw = w * 0.26; ctx.fillStyle = '#6B4A34'; ctx.fillRect(dx, y - h + 230, dw, h - 230); ctx.fillStyle = '#E9C98A'; ctx.globalAlpha *= 0.8; ctx.fillRect(dx + 16, y - h + 250, dw - 32, 150); ctx.globalAlpha /= 0.8; ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.arc(dx + dw - 22, y - h * 0.38, 7, 0, 6.283); ctx.fill();
  // uithangbord: een brood (geen tekst)
  ctx.fillStyle = '#2A2422'; ctx.fillRect(x + w - 6, y - h + 60, 70, 6); ctx.beginPath(); ctx.arc(x + w + 46, y - h + 104, 34, 0, 6.283); shape(ctx, '#E8DCC4', '#2A2422', 4); ctx.save(); ctx.translate(x + w + 46, y - h + 112); ctx.scale(0.55, 0.55); brood(0, 0, 1); ctx.restore();
  ctx.restore(); return { deur: [dx + dw * 0.5, y - h + 360] };
}
// geurspoor: zachte golvende stipjes langs een boog van bron naar neus
function geur(ctx, p0, p1, t, a = 1, n = 18) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let k = 0; k < n; k++) { const u = ((t * 0.18 + k / n) % 1); const x = lerp(p0[0], p1[0], u), y = lerp(p0[1], p1[1], u) - Math.sin(u * 3.14) * 90 + Math.sin(t * 2 + k * 1.7) * 14;
    ctx.beginPath(); ctx.arc(x, y, 5 + 3 * Math.sin(k), 0, 6.283); ctx.fillStyle = rgba(Z3.geur, 0.55 * Math.sin(u * 3.14)); ctx.fill(); }
  ctx.restore(); }
function straat(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 520, W, 300);
  // huizen in de achtergrond (zacht)
  for (let i = 0; i < 7; i++) { const x = 680 + i * 190, hh = 260 + hash(i * 5) * 140; ctx.fillStyle = i % 2 ? '#2C3E5E' : '#30446A'; ctx.fillRect(x, 820 - hh, 182, hh); ctx.fillStyle = rgba('#E9C98A', 0.35); for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) if (hash(i * 9 + r * 3 + c) > 0.45) ctx.fillRect(x + 30 + c * 80, 820 - hh + 40 + r * 80, 40, 46); }
  ctx.fillStyle = '#3A4458'; ctx.fillRect(0, 820, W, 30); ctx.fillStyle = '#2A3346'; ctx.fillRect(0, 850, W, 230); }
// vraagkaart tijdens de gesproken vraag: tekst links, opties verschijnen als ze worden uitgesproken
function vraagLinks(ctx, vraag, opties, zicht, o = {}) { const { x = 110, w = 900, y = 190 } = o;
  text(ctx, 'Wat denk je?', x, y, fTitel(64), C.text); ctx.font = fTekst(44, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; const yEnd = wrap(ctx, vraag, x, y + 86, w, 56);
  opties.forEach((s, i) => { const a = zicht[i] || 0; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const yy = yEnd + 60 + i * 108; roundRect(ctx, x, yy, w, 90, 14); shape(ctx, C.fill, C.line, 1.5);
    text(ctx, String.fromCharCode(97 + i), x + 36, yy + 58, fMeta(32), C.grain); ctx.font = fTekst(36); ctx.fillStyle = C.text; const tw = w - 110; let s2 = s; while (ctx.measureText(s2).width > tw && s2.length > 4) s2 = s2.slice(0, -2); if (s2 !== s) s2 = s2.trim() + '…'; ctx.fillText(s2, x + 90, yy + 58); ctx.restore(); });
}

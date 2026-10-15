// Hormonen 3 · De baas van de klieren — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2B2420', shirt: '#5A7FA0', hairStyle: 'short' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function fade(q, w1, n1, w2, n2) { return q.on(w1, n1) * (1 - q.on(w2, n2)); }
const SCHILD = '#C98A5C';

// ---------- hoofd in profiel met hypothalamus en hypofyse ----------
function hoofdProfiel(ctx, x, y, s = 1, o = {}) { const { a = 1, hyp = 0, hth = 0, steel = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, 260); ctx.bezierCurveTo(-60, 160, -180, 120, -200, 0); ctx.bezierCurveTo(-220, -170, -80, -250, 40, -240); ctx.bezierCurveTo(170, -230, 230, -130, 220, -30); ctx.lineTo(250, 20); ctx.lineTo(220, 50); ctx.bezierCurveTo(230, 90, 220, 110, 200, 120); ctx.bezierCurveTo(210, 160, 180, 190, 140, 190); ctx.lineTo(120, 260); ctx.closePath(); shape(ctx, rgba(C.mens, 0.18), rgba(C.mens, 0.8), 2);
  ctx.beginPath(); ctx.ellipse(20, -80, 170, 120, -0.08, 0, 6.283); shape(ctx, rgba(C.paars, 0.16), rgba(C.paars, 0.6), 2); text(ctx, 'hersenen', -60, -110, fTekst(30, 600), rgba(C.paars, 0.9), 'center');
  ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * hth; ctx.beginPath(); ctx.ellipse(60, 10, 34, 20, 0, 0, 6.283); shape(ctx, rgba(HK.klier, 0.6), HK.klierR, 2); ctx.restore();
  if (steel > 0.01) { ctx.strokeStyle = HK.klierR; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(60, 30); ctx.lineTo(66, 58); ctx.stroke(); }
  ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * hyp; ctx.beginPath(); ctx.arc(68, 70, 16, 0, 6.283); shape(ctx, rgba(HK.klier, 0.85), HK.klierR, 2); ctx.restore();
  ctx.restore(); }
function erwt(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#7FC48F', '#5A9A6A', 2); circ(ctx, x - r * 0.3, y - r * 0.3, r * 0.25, rgba('#FFFFFF', 0.4)); ctx.restore(); }
// ---------- schildklier (vlinder) in de hals ----------
function schildklier(ctx, x, y, s = 1, a = 1, groot = 0, glow = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = s * (1 + groot * 0.9);
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, 0, x, y, 160 * k); g.addColorStop(0, rgba(HK.klier, 0.4 * glow)); g.addColorStop(1, rgba(HK.klier, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 160 * k, 0, 6.283); ctx.fill(); }
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + d * 52 * k, y, 46 * k, 76 * k, d * 0.25, 0, 6.283); shape(ctx, rgba(SCHILD, 0.6), lighten(SCHILD, 0.3), 2.5); }
  ctx.fillStyle = rgba(SCHILD, 0.7); roundRect(ctx, x - 26 * k, y + 8 * k, 52 * k, 24 * k, 10); ctx.fill(); ctx.restore(); }
function halsKaart(ctx, x, y, s = 1, o = {}) { const { a = 1, groot = 0, glow = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y - 330 * s, 150 * s, 0, 6.283); shape(ctx, rgba(C.mens, 0.18), rgba(C.mens, 0.8), 2);
  ctx.beginPath(); ctx.moveTo(x - 80 * s, y - 200 * s); ctx.lineTo(x - 90 * s, y + 40 * s); ctx.quadraticCurveTo(x - 260 * s, y + 60 * s, x - 330 * s, y + 160 * s); ctx.lineTo(x + 330 * s, y + 160 * s); ctx.quadraticCurveTo(x + 260 * s, y + 60 * s, x + 90 * s, y + 40 * s); ctx.lineTo(x + 80 * s, y - 200 * s); ctx.closePath(); shape(ctx, rgba(C.mens, 0.18), rgba(C.mens, 0.8), 2);
  ctx.strokeStyle = rgba(C.mens, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 110 * s); ctx.quadraticCurveTo(x, y - 90 * s, x + 20 * s, y - 110 * s); ctx.stroke(); metaText(ctx, 'ADAMSAPPEL', x + 110 * s, y - 100 * s, C.grain, 'left', 20);
  schildklier(ctx, x, y - 40 * s, 0.75 * s, 1, groot, glow); ctx.restore(); }
// thyroxine: twee ringen met vier jodiumatomen
function thyroxineMol(ctx, x, y, s = 1, a = 1, jodium = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const dx of [-70, 70]) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; i ? ctx.lineTo(x + dx * s + Math.cos(an) * 46 * s, y + Math.sin(an) * 46 * s) : ctx.moveTo(x + dx * s + Math.cos(an) * 46 * s, y + Math.sin(an) * 46 * s); } ctx.closePath(); shape(ctx, rgba(HK.hormoon, 0.18), HK.hormoon, 3); }
  ctx.strokeStyle = HK.hormoon; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 24 * s, y); ctx.lineTo(x + 24 * s, y); ctx.stroke();
  [[-70, -70], [-70, 70], [70, -70], [70, 70]].forEach(([dx, dy], i) => { const al = clamp(jodium * 4 - i, 0, 1); if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, x + dx * s, y + dy * s, 26 * s, '#8C5AA8', '#C4A0D8', 2); text(ctx, 'I', x + dx * s, y + dy * s + 11 * s, fTekst(30 * s, 700), C.text, 'center'); ctx.restore(); });
  ctx.restore(); }
function balk(ctx, x, yb, w, hmax, v, col, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = hmax * clamp(v, 0, 1.4); roundRect(ctx, x, yb - h, w, h, 8); shape(ctx, rgba(col, 0.5), col, 2); text(ctx, lab, x + w / 2, yb + 44, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
function bot(ctx, x, y, len, s = 1, a = 1, schijf = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E6E1D3'; ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; roundRect(ctx, x - 26 * s, y - len / 2, 52 * s, len, 20 * s); ctx.fill(); ctx.stroke();
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x, y + d * len / 2, 56 * s, 40 * s, 0, 0, 6.283); ctx.fill(); ctx.stroke(); if (schijf > 0.01) { ctx.save(); ctx.globalAlpha *= schijf; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 50 * s, y + d * (len / 2 - 30 * s)); ctx.lineTo(x + 50 * s, y + d * (len / 2 - 30 * s)); ctx.stroke(); ctx.restore(); } } ctx.restore(); }
function antistof(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 26 * s); ctx.lineTo(0, 0); ctx.lineTo(-18 * s, -22 * s); ctx.moveTo(0, 0); ctx.lineTo(18 * s, -22 * s); ctx.stroke(); ctx.restore(); }
// schildklier-regelkring: waarde = thyroxine; regelcentrum = hypofyse; signaal = TSH; effector = schildklier
function schildKring(ctx, o = {}) { const { a = 1, nA = [1, 1, 1, 1], arr = [1, 1, 1, 1], minus = 0, pulse = -1, broken = {}, thin = {}, cx = 960, cy = 470, rx = 540 } = o;
  const nodes = [{ t: 'thyroxine in het bloed', s: 'verhoogt de stofwisseling', col: HK.hormoon, a: nA[0], rol: 'WAARDE' }, { t: 'hypofyse', s: 'meet thyroxine', col: HK.klier, a: nA[1], rol: 'REGELCENTRUM' },
    { t: 'TSH', s: 'de opdracht', col: HK.hormoon, a: nA[2], rol: 'SIGNAAL' }, { t: 'schildklier', s: 'maakt thyroxine (met jodium)', col: SCHILD, a: nA[3], rol: 'EFFECTOR' }];
  return kringSchema(ctx, cx, cy, { a, nodes, arr, minus, pulse, broken, thin, rx, ry: 290, bw: 440, bh: 120 }); }
function zoutpak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 160 * s, 180 * s, 320 * s, 12); shape(ctx, '#3E6FB0', '#2E5A94', 3); roundRect(ctx, x - 90 * s, y - 160 * s, 180 * s, 60 * s, 12); ctx.fillStyle = '#E6E1D3'; ctx.fill();
  text(ctx, 'ZOUT', x, y - 10 * s, fTitel(52 * s), '#F2F2EE', 'center'); text(ctx, 'met jodium', x, y + 40 * s, fTekst(28 * s, 700), C.goud, 'center'); ctx.restore(); }
function brood(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 160 * s, y + 60 * s); ctx.lineTo(x - 160 * s, y - 20 * s); ctx.bezierCurveTo(x - 160 * s, y - 90 * s, x + 160 * s, y - 90 * s, x + 160 * s, y - 20 * s); ctx.lineTo(x + 160 * s, y + 60 * s); ctx.closePath(); shape(ctx, '#C9A35C', '#9C7A3C', 3); for (let i = 0; i < 4; i++) { ctx.strokeStyle = '#9C7A3C'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 100 * s + i * 66 * s, y - 50 * s); ctx.lineTo(x - 80 * s + i * 66 * s, y - 10 * s); ctx.stroke(); } ctx.restore(); }

const SCENES = {
  title(ctx, t) { hoofdProfiel(ctx, 1450, 520, 1.1, { hyp: 0.8 + 0.2 * Math.sin(t * 2), hth: 0.7 }); },

  s01(ctx, t, q) { bg(ctx, 'macro'); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(0, 640, W, H - 640); ctx.fillStyle = '#6B5338'; ctx.fillRect(0, 640, W, 20);
    zoutpak(ctx, 700, 470, 1.3, q.on('zout', 1)); brood(ctx, 1250, 560, 1.2, q.on('bakkers', 1));
    const j = q.on('jodium', 1); if (j > 0.01) { ctx.save(); ctx.globalAlpha *= j * (1 - q.on('smaak', 1) * 0.0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(700, 520, 150, 46, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'niet voor de smaak', 960, 200, C.text2, q.on('smaak', 1)); vraagteken(ctx, 960, 420, q.on('Waarom', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const hy = q.on('hypofyse', 1), ht = q.on('hypothalamus', 1); hoofdProfiel(ctx, 720, 520, 1.5, { hyp: hy, hth: q.on('hypothalamus', 1) });
    label(ctx, 'hypofyse', 'aan een steeltje', 720 + 68 * 1.5, 520 + 70 * 1.5, 1200, 760, hy, HK.klierR); label(ctx, 'hypothalamus', 'deel van de hersenen', 720 + 60 * 1.5, 520 + 10 * 1.5, 1200, 330, q.on('hypothalamus', 1), HK.klierR);
    erwt(ctx, 1560, 760, 20, q.on('erwt', 1)); regel(ctx, '≈ zo groot als een erwt', 1600, 770, q.on('erwt', 1), C.text2, 30, 'left');
    const z = q.on('zenuwen', 1); for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = HK.zenuw; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(720 - 150 + i * 70, 520 - 220); ctx.quadraticCurveTo(720, 520 - 80, 720 + 85, 520 + 12); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'meet ook de temperatuur van het bloed', 1360, 440, C.text2, q.on('temperatuur', 1) * (1 - q.on('hormonen', 1)));
    const ho = q.on('hormonen', 1); for (let i = 0; i < 5; i++) { const u = (t * 0.6 + i / 5) % 1; hormoonVorm(ctx, 720 + 90 + u * 14, 520 + 30 + u * 80, 12, 'tropine', ho); } tag(ctx, 'hormonen', 1000, 700, C.goud, ho * (1 - q.on('andere', 1)));
    tag(ctx, 'hypofyse stuurt andere klieren aan', 1360, 560, C.goud, q.on('andere', 1));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const hx = 960, hy = 200; roundRect(ctx, hx - 160, hy - 60, 320, 120, 20); shape(ctx, rgba(HK.klier, 0.25), HK.klierR, 2.5); kop(ctx, 'hypofyse', hx, hy + 14, 1, C.text, 44);
    const items = [['TSH', 'schildklier', 380, q.on('TSH', 1)], ['ACTH', 'bijnierschors', 960, q.on('ACTH', 1)], ['FSH · LH', 'eierstokken / zaadballen', 1540, q.on('FSH', 1)]];
    items.forEach(([h, k, x, a]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = HK.hormoon; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx, hy + 60); ctx.quadraticCurveTo(x, hy + 120, x, 520); ctx.stroke(); arrow(ctx, x, 500, x, 540, HK.hormoon, 1, 4);
      roundRect(ctx, x - 140, 380, 280, 70, 35); shape(ctx, rgba(HK.hormoon, 0.18), HK.hormoon, 2); text(ctx, h, x, 428, fTekst(38, 700), C.text, 'center');
      roundRect(ctx, x - 200, 560, 400, 120, 18); shape(ctx, rgba(HK.klier, 0.2), HK.klierR, 2); text(ctx, k, x, 632, fTekst(36, 700), C.text, 'center'); ctx.restore(); });
    tag(ctx, 'TSH = schildklierstimulerend hormoon', 380, 780, C.goud, q.on('schildklierstimulerende', 1));
    tag(ctx, 'volgende film', 960, 780, C.text2, q.on('volgende', 1)); tag(ctx, 'film over voortplanting', 1540, 780, C.text2, q.on('voortplanting', 1));
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    const hx = 960, hy = 200; roundRect(ctx, hx - 160, hy - 60, 320, 120, 20); shape(ctx, rgba(HK.klier, 0.25), HK.klierR, 2.5); kop(ctx, 'hypofyse', hx, hy + 14, 1, C.text, 44);
    const g = q.on('Groeihormoon', 1), ad = q.on('ADH', 1);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; arrow(ctx, hx - 100, hy + 60, 520, 520, HK.hormoon, 1, 4); tag(ctx, 'groeihormoon', 600, 420, C.goud); bot(ctx, 400, 650, 260, 0.9, 1, 1); text(ctx, 'botten en spieren', 400, 860, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; arrow(ctx, hx + 100, hy + 60, 1400, 520, HK.hormoon, 1, 4); tag(ctx, 'ADH', 1300, 420, C.goud); nierVorm(ctx, 1500, 660, 1.6, 1, 1); text(ctx, 'nieren', 1500, 860, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
    tag(ctx, 'werken op weefsels zelf', 960, 640, C.text2, q.on('weefsels', 1) * (1 - q.on('ADH', 1) * 0.0));
    tag(ctx, 'ADH: gemaakt in de hypothalamus', 1360, 120, C.text2, q.on('gemaakt', 1)); tag(ctx, 'laatste film', 1500, 940 - 40 - 40, C.text2, 0);
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    const lv = [['rest van de hersenen', C.paars, q.on('hersenen', 1)], ['hypothalamus', HK.klierR, q.on('hypothalamus', 1)], ['hypofyse', HK.klierR, 1], ['andere klieren', SCHILD, 1]];
    lv.forEach(([n, c, a], i) => { if (a <= 0.01) return; const y = 760 - i * 170; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 660, y - 55, 600, 110, 20); shape(ctx, rgba(c, 0.2), c, 2.5); text(ctx, n, 960, y + 14, fTekst(40, 700), C.text, 'center'); if (i < 3) arrow(ctx, 960, y - 60, 960, y - 110, C.line, 1, 3); ctx.restore(); });
    const nee = q.on('Nee', 1); if (nee > 0.01) { ctx.save(); ctx.globalAlpha *= nee; text(ctx, 'de baas?', 1340, 435, fTitel(46), C.koraal, 'left'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1330, 420); ctx.lineTo(1560, 420); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'zenuwstelsel en hormoonstelsel komen samen', 960, 120, C.goud, q.on('samen', 1));
    tag(ctx, 'stress of te weinig slaap', 1500, 760, C.text2, q.on('stress', 1));
  },

  s08(ctx, t, q) { bg(ctx, 'schema');
    const tm = q.on('thyroxine', 1); halsKaart(ctx, 520, 620, 1.0, { glow: q.on('vlinder', 1) });
    naamBij(ctx, 'schildklier', 'vorm van een vlinder', 640, 585, q.on('schildklier', 1), 'left', lighten(SCHILD, 0.3));
    thyroxineMol(ctx, 1500, 280, 1.0, tm, ramp(t, q.at('jodiumatomen'), 2)); tag(ctx, 'thyroxine · 4 jodiumatomen', 1500, 470, C.goud, q.on('jodiumatomen', 1));
    const vb = q.on('verbranding', 1); if (vb > 0.01) { for (let i = 0; i < 3; i++) doelcel(ctx, 1080 + i * 220, 680, 80, { a: vb, n: 3, kind: 'thyroxine', noRec: true, glow: q.on('stofwisseling', 1), seed: i + 3, t }); }
    hartMeter(ctx, 1460, 770, lerp(66, 80, q.on('sneller', 1)), t, q.on('hart', 1) * (1 - q.on('kinderen', 1)), 400);
    tag(ctx, 'kinderen: groei en hersenontwikkeling', 1340, 860, C.groen, q.on('kinderen', 1)); tag(ctx, 'hielprik', 1760, 860, C.text2, q.on('hielprik', 1));
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    const nm = q.on('namen', 1) * (1 - q.on('geeft', 1));
    schildKring(ctx, { a: 1, nA: [0.3 + 0.7 * q.on('thyroxine', 3), 0.3 + 0.7 * q.on('hypofyse', 2), 0.3 + 0.7 * q.on('TSH', 2), 0.3 + 0.7 * q.on('schildklier', 2)], arr: [q.on('remt', 1), q.on('TSH', 2), q.on('aan', 1), q.on('thyroxine', 3)], minus: q.on('terugkoppeling', 1), pulse: t > q.at('terugkoppeling') ? (t / 5) % 1 : -1 });
    tag(ctx, 'TSH = de opdracht · thyroxine = het hormoon', 960, 620, C.goud, nm);
    tag(ctx, 'TSH zet aan · thyroxine remt', 960, 860, C.goud, q.on('remt', 2));
  },
  s10(ctx, t, q) { bg(ctx, 'schema'); schildKring(ctx, { nA: [0.5, 1, 1, 1], arr: [1, 1, 1, 1] });
    const j = q.on('jodium', 1); if (j > 0.01) { ctx.save(); ctx.globalAlpha *= j; circ(ctx, 960, 470, 60, '#8C5AA8', '#C4A0D8', 2); text(ctx, 'I', 960, 484, fTekst(44, 700), C.text, 'center'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(900, 410); ctx.lineTo(1020, 530); ctx.stroke(); ctx.restore(); regel(ctx, 'te weinig jodium', 960, 590, j, C.koraal, 32, 'center'); }
    vraagteken(ctx, 1500, 860 - 20, q.on('Wat', 1), 100);
  },
  s12(ctx, t, q) { bg(ctx, 'schema'); schildKring(ctx, { nA: [0.6, 1, 1, 1], thin: { 0: 0.9 }, pulse: (t / 3) % 1 }); tag(ctx, 'weinig rem', 1380, 250, C.koraal, q.on('nauwelijks', 1));
    const tsh = ramp(t, q.at('geremd'), 3); balk(ctx, 830, 560, 90, 200, 0.3, HK.hormoon, 'thyroxine', 1); balk(ctx, 1010, 560, 90, 200, lerp(0.5, 1.3, tsh), HK.hormoon, 'TSH', 1);
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const st = [q.on('jodium', 1), q.on('daalt', 1), q.on('zwakker', 1), q.on('stijgt', 1), q.on('groeien', 1)];
    const thy = lerp(1, 0.35, st[1]), tsh = lerp(0.5, 1.3, st[3]), groot = ramp(t, q.at('groeien'), 6) * 1.0;
    halsKaart(ctx, 460, 600, 1.0, { groot, glow: st[4] * 0.4 });
    balk(ctx, 900, 720, 110, 300, lerp(1, 0.2, st[0]), '#8C5AA8', 'jodium', 1); balk(ctx, 1080, 720, 110, 300, thy, HK.hormoon, 'thyroxine', 1); balk(ctx, 1260, 720, 110, 300, tsh, HK.hormoon, 'TSH', 1);
    tag(ctx, 'rem op de hypofyse zwakker', 1650, 200, HK.rem, st[2] * (1 - q.on('struma', 1)));
    tag(ctx, 'struma (krop)', 460, 860, C.koraal, q.on('struma', 1)); tag(ctx, 'groter ≠ meer thyroxine', 1650, 200, C.koraal, q.on('Groter', 2));
    tag(ctx, 'jodium in zout en brood', 1650, 290, C.goud, q.on('zout', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const c1 = q.on('laag', 1), c2 = q.on('allebei', 1); kop(ctx, 'bloedonderzoek: TSH en thyroxine', 960, 110, 1, C.text, 44); tag(ctx, 'thyroxine laag, TSH hoog', 540, 820, C.text2, c1); tag(ctx, 'allebei laag', 1380, 820, C.text2, c2);
    if (c1 > 0.01) { ctx.save(); ctx.globalAlpha *= c1; roundRect(ctx, 160, 170, 760, 560, 24); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); balk(ctx, 300, 560, 120, 280, 0.25, HK.hormoon, 'thyroxine', 1); balk(ctx, 520, 560, 120, 280, 1.2, HK.hormoon, 'TSH', 1); regel(ctx, 'probleem in de schildklier', 540, 690, q.on('niet', 1), SCHILD, 34, 'center'); ctx.restore(); }
    if (c2 > 0.01) { ctx.save(); ctx.globalAlpha *= c2; roundRect(ctx, 1000, 170, 760, 560, 24); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); balk(ctx, 1140, 560, 120, 280, 0.25, HK.hormoon, 'thyroxine', 1); balk(ctx, 1360, 560, 120, 280, 0.15, HK.hormoon, 'TSH', 1); regel(ctx, 'probleem hoger: hypofyse (of hypothalamus)', 1380, 690, q.on('hoger', 1), HK.klierR, 34, 'center'); ctx.restore(); }
  },
  s15(ctx, t, q) { bg(ctx, 'schema');
    const tr = q.on('traag', 1), sn = q.on('omgekeerde', 1);
    if (tr > 0.01) { ctx.save(); ctx.globalAlpha *= tr; person(ctx, 480, 820, 520, 1, { shirt: '#5B6FA8', armR: { a1: 0.15 }, armL: { a1: 0.15 } }); text(ctx, 'te traag', 480, 220, fTitel(48), C.teal, 'center'); regel(ctx, 'moe · koud · aankomen', 480, 280, q.on('moe', 1), C.text, 32, 'center'); ctx.restore();
      const tb = q.on('tablet', 1); if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; circ(ctx, 740, 560, 30, '#F2F2EE', '#C9C2B4', 2); ctx.strokeStyle = '#C9C2B4'; ctx.beginPath(); ctx.moveTo(712, 560); ctx.lineTo(768, 560); ctx.stroke(); regel(ctx, 'tablet thyroxine', 790, 570, 1, C.goud, 30, 'left'); regel(ctx, 'TSH weer normaal', 790, 620, q.on('normaal', 1), C.text2, 28, 'left'); ctx.restore(); } }
    if (sn > 0.01) { ctx.save(); ctx.globalAlpha *= sn; person(ctx, 1440, 820, 520, 1, { shirt: '#B36A5E', armR: { a1: 0.6 + 0.2 * Math.sin(t * 8) }, armL: { a1: 0.6 - 0.2 * Math.sin(t * 8) } }); text(ctx, 'te snel', 1440, 220, fTitel(48), C.koraal, 'center'); regel(ctx, 'onrustig · warm · snelle hartslag · afvallen', 1440, 280, q.on('onrustig', 1), C.text, 32, 'center'); ctx.restore(); }
  },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('Graves', 1);
    const box = (y, n, s2, c, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 260, y - 50, 420, 100, 18); shape(ctx, rgba(c, 0.2), c, 2.5); text(ctx, n, 470, y + 6, fTekst(36, 700), C.text, 'center'); metaText(ctx, s2, 470, y + 38, C.grain, 'center', 20); ctx.restore(); };
    box(160, 'hypothalamus', '', HK.klierR, 1); box(400, 'hypofyse', '', HK.klierR, q.on('TRH', 1)); box(640, 'schildklier', '', SCHILD, q.on('schildklier', 1));
    tag(ctx, 'TRH', 470, 300, C.goud, q.on('TRH', 1)); arrow(ctx, 470, 215, 470, 340, HK.hormoon, q.on('TRH', 1), 4); tag(ctx, 'TSH', 470, 540, C.goud, q.on('TSH', 1)); arrow(ctx, 470, 455, 470, 580, HK.hormoon, q.on('schildklier', 1), 4);
    const rm = q.on('zowel', 1); if (rm > 0.01) { ctx.save(); ctx.globalAlpha *= rm; ctx.setLineDash([10, 10]); ctx.strokeStyle = HK.rem; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(690, 640); ctx.quadraticCurveTo(860, 520, 690, 400); ctx.moveTo(690, 640); ctx.quadraticCurveTo(960, 400, 690, 160); ctx.stroke(); ctx.setLineDash([]); text(ctx, '− thyroxine remt', 880, 460, fTekst(32, 700), HK.rem, 'left'); ctx.restore(); }
    if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; roundRect(ctx, 1120, 180, 640, 560, 24); shape(ctx, rgba(C.bgMicro, 0.9), C.line, 1.5); metaText(ctx, 'SCHILDKLIERCEL', 1440, 230, C.grain, 'center', 22);
      ctx.fillStyle = rgba(HK.cel, 0.25); ctx.fillRect(1160, 460, 560, 30); for (let i = 0; i < 4; i++) { receptor(ctx, 1220 + i * 140, 460, -Math.PI / 2, 'tropine', 0, 1, 1.3); antistof(ctx, 1220 + i * 140, 400 - 60 * (1 - ramp(t, q.at('zetten'), 1.5)), 1.3, q.on('antistoffen', 1)); }
      text(ctx, 'antistoffen op de TSH-receptor', 1440, 640, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    vraagteken(ctx, 1440, 860 - 10, q.on('Wat', 1), 100);
  },
  s18(ctx, t, q) { bg(ctx, 'schema'); kop(ctx, 'ziekte van Graves', 780, 150, 1, C.text, 44);
    ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(600, 480); ctx.lineTo(1090, 480); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); regel(ctx, 'normaal', 1100, 490, 1, C.text2, 26, 'left');
    balk(ctx, 640, 640, 150, 320, 0.5 + 0.75 * ramp(t, q.at('thyroxine'), 1), HK.hormoon, 'thyroxine', 1); balk(ctx, 900, 640, 150, 320, 0.5 - 0.42 * ramp(t, q.at('weinig'), 1.2), HK.hormoon, 'TSH', 1);
    tag(ctx, 'de rem werkt niet op de antistoffen', 1500, 360, HK.rem, q.on('invloed', 1)); tag(ctx, 'antistoffen blijven aanzetten', 1500, 460, C.koraal, q.on('blijven', 1)); tag(ctx, 'terugkoppeling omzeild', 1500, 560, C.goud, q.on('omzeild', 1));
  },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const g = q.on('groeihormoon', 1); hoofdProfiel(ctx, 300, 330, 0.7, { hyp: 1, hth: 0.5 });
    for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; hormoonVorm(ctx, lerp(360, 900, u), lerp(390, 500, u), 11, 'groei', g); hormoonVorm(ctx, lerp(360, 1420, u), lerp(360, 300, u), 11, 'groei', q.on('weefsels', 1)); }
    { const gf = q.on('stimuleert', 1); arrow(ctx, 1150, 540, 1420, 520, C.groen, gf, 4); }
    const lv = q.on('lever', 1); if (lv > 0.01) { ctx.save(); ctx.globalAlpha *= lv; ctx.beginPath(); ctx.ellipse(1000, 560, 150, 90, -0.2, 0, 6.283); shape(ctx, rgba('#C98A5C', 0.4), '#C98A5C', 2.5); text(ctx, 'lever', 1000, 572, fTekst(32, 700), C.text, 'center'); ctx.restore(); tag(ctx, 'groeifactor', 1000, 420, C.groen, q.on('groeifactor', 1)); }
    bot(ctx, 1500, 500, 380, 1.1, Math.max(0.4 * q.on('weefsels', 1), q.on('botten', 1)), q.on('groeischijven', 1)); label(ctx, 'groeischijf', '', 1500 + 50, 500 - 160, 1700, 230, q.on('groeischijven', 1), C.teal);
  },
  s20(ctx, t, q) { bg(ctx, 'schema');
    const f = h => { let v = 1; for (const [c, p] of [[1.5, 9], [3.0, 4], [5.0, 3], [10, 1.5], [14, 1.2], [19, 1.4]]) v += p * Math.exp(-Math.pow((h - c) / 0.35, 2)); return v; };
    ctx.save(); ctx.fillStyle = rgba(C.paars, 0.14); ctx.fillRect(280, 170, 1100 / 3, 420); ctx.restore(); regel(ctx, 'slaap', 280 + 550 / 3, 570, 1, C.paars, 30, 'center');
    grafiek(ctx, 280, 170, 1100, 420, { a: 1, xmax: 24, ymax: 12, f, u: ramp(t, q.at('stoten'), 4), xticks: [0, 6, 12, 18, 24], yticks: [], xlab: 'uren na het inslapen', ylab: 'groeihormoon (model)', col: HK.hormoon });
    tag(ctx, 'grootste stoot in de diepe slaap', 1500, 260, C.goud, q.on('diepe', 1));
    bot(ctx, 1600, 560, 300, 0.8, q.on('puberteit', 1), 1 - q.on('sluiten', 1)); tag(ctx, 'groeischijven sluiten', 1600, 820, C.teal, q.on('sluiten', 1));
    tag(ctx, 'behandeling: injecties met groeihormoon', 780, 760, C.text2, q.on('injecties', 1));
  },
  s21(ctx, t, q) { bg(ctx, 'schema');
    const w = q.on('baas', 1); zoutpak(ctx, 260, 520, 0.9, 1 - w);
    schildKring(ctx, { a: 1 - w, cx: 1100, cy: 430, rx: 480, minus: q.on('remt', 1), broken: { 0: q.on('Zonder', 1) * (1 - q.on('antwoord', 1)) }, pulse: (t / 5) % 1 });
    tag(ctx, 'struma', 600, 600, C.koraal, q.on('struma', 1) * (1 - q.on('antwoord', 1))); tag(ctx, 'een klier in je hals werkt niet goed zonder jodium', 960, 870, C.goud, q.on('antwoord', 1) * (1 - w));
    const lv = [['hypothalamus', HK.klierR], ['hypofyse', HK.klierR], ['schildklier', SCHILD]];
    if (w > 0.01) { lv.forEach(([n, c], i) => { const x = 420 + i * 540; ctx.save(); ctx.globalAlpha *= w; roundRect(ctx, x - 200, 400, 400, 120, 20); shape(ctx, rgba(c, 0.2), c, 2.5); text(ctx, n, x, 474, fTekst(40, 700), C.text, 'center'); if (i < 2) arrow(ctx, x + 210, 460, x + 330, 460, C.line, 1, 4); ctx.restore(); });
      ctx.save(); ctx.globalAlpha *= q.on('thyroxine', 3); ctx.setLineDash([10, 10]); ctx.strokeStyle = HK.rem; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1500, 540); ctx.quadraticCurveTo(960, 760, 420, 540); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'thyroxine stuurt terug', 960, 700, fTekst(32, 700), HK.rem, 'center'); ctx.restore();
      tag(ctx, 'de baas? niemand alleen', 960, 260, C.goud, q.on('Niemand', 1)); }
  },
};

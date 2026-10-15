// Afweer 1 · De eerste verdediging — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#6B3F22', shirt: '#7A9A5E', hairStyle: 'long' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const BACT = '#E07A5F', FLORA = '#7FC48F', WIT = '#D8DCE2', HIST = '#C9A35C', BLD = '#B5574A', VOCHTK = '#5BA4C9', HUID = '#E8C2A4', HOORN = '#E6D8A8', PUS = '#E6E1A0';

// ---------- figuren ----------
// bacterie: staafje met 'vormpjes' (driehoekjes) op het oppervlak
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0, kl = BACT) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, rgba(kl, 0.75), lighten(kl, 0.3), 1.5 / s);
  ctx.fillStyle = '#F2C0A8'; for (let i = 0; i < 4; i++) { const px = -18 + i * 12; ctx.beginPath(); ctx.moveTo(px, -11); ctx.lineTo(px + 4, -17); ctx.lineTo(px + 8, -11); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// fagocyt: grijze blob met lobbige kern; arm = uitstulping richting (tx, ty) 0..1
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '', kern = 'lobben' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, 0.08, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  if (kern === 'rond') circ(ctx, x - 0.35 * r, y - 0.25 * r, r * 0.26, rgba(C.kern, 0.6), C.kernR, 1.2); else for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function rodeBC(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C9483E', '#E07A6E', 1.2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function mestcel(ctx, x, y, r, a = 1, los = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.85, 0.05, 7, t); shape(ctx, rgba(HIST, 0.25), HIST, 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < 10; i++) { const an = hash(i) * 6.283, rr = r * (0.45 + 0.3 * hash(i * 3)); const out = los * (0.6 + 1.6 * ((t * 0.3 + hash(i * 7)) % 1)); circ(ctx, x + Math.cos(an) * (rr + out * r), y + Math.sin(an) * (rr + out * r), 4.5, rgba(HIST, 0.9 * (1 - Math.min(1, out * 0.35)))); }
  ctx.restore(); }
// haarvat horizontaal met wijdte w (1 = normaal) en lekkendheid
function haarvat(ctx, x0, x1, y, w, t, o = {}) { const { lek = 0, wbc = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 * w;
  ctx.fillStyle = rgba(BLD, 0.25 + 0.15 * (w - 1)); ctx.fillRect(x0, y - h, x1 - x0, 2 * h); ctx.strokeStyle = lighten(BLD, 0.2); ctx.lineWidth = 4; if (lek > 0.01) ctx.setLineDash([26, 10 * lek + 2]); ctx.beginPath(); ctx.moveTo(x0, y - h); ctx.lineTo(x1, y - h); ctx.moveTo(x0, y + h); ctx.lineTo(x1, y + h); ctx.stroke(); ctx.setLineDash([]);
  const n = Math.round(6 + 6 * (w - 1)); for (let i = 0; i < n; i++) { const v = (t * 0.15 * (1 + 0.6 * (w - 1)) + i / n) % 1; rodeBC(ctx, lerp(x0, x1, v), y + (hash(i) - 0.5) * h * 1.1, 15); }
  for (let i = 0; i < 8; i++) { const v = (t * 0.25 + i / 8) % 1; circ(ctx, x0 + hash(i * 3) * (x1 - x0), y - h - v * 140 * lek, 5, rgba(VOCHTK, 0.8 * lek * (1 - v))); }
  ctx.restore(); }
function huidDoorsnede(ctx, x, y, w, t, o = {}) { const { a = 1, zuur = 0, schilfer = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 9; i++) { const yy = y + i * 10; const off = (i < 3 ? schilfer * ((t * 6) % 30) : 0); ctx.strokeStyle = rgba(HOORN, 0.9 - i * 0.06); ctx.lineWidth = 7; ctx.beginPath(); for (let k = 0; k < 7; k++) { const xx = x + k * w / 7 + (i % 2) * 30; ctx.moveTo(xx + 4, yy - (i === 0 ? off * 0.4 : 0)); ctx.lineTo(xx + w / 7 - 8, yy - (i === 0 ? off * 0.4 : 0)); } ctx.stroke(); }
  for (let i = 0; i < 10; i++) { const xx = x + 20 + i * (w - 40) / 9; circ(ctx, xx, y + 120, 18, rgba(HUID, 0.4), HUID, 1.5); }
  ctx.fillStyle = rgba(HUID, 0.12); ctx.fillRect(x, y + 150, w, 160); metaText(ctx, 'HOORNLAAG', x + w + 46, y + 40, HOORN, 'left', 20); metaText(ctx, 'LEVENDE HUIDCELLEN', x + w + 16, y + 128, HUID, 'left', 20);
  if (zuur > 0.01) for (let i = 0; i < 6; i++) { const xx = x + 40 + i * (w - 80) / 5; regel(ctx, 'H⁺', xx, y - 20 - 8 * Math.sin(t * 2 + i), zuur, C.goud, 24, 'center', 700); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1580, cy = 470;
    const u = (t * 0.15) % 1; fagocyt(ctx, cx, cy, 120, t, { arm: 0.6 + 0.3 * Math.sin(t), tx: cx + 260, ty: cy - 40 }); bacterie(ctx, cx + 230, cy - 40, 1.3, 0.3); bacterie(ctx, cx + 300, cy + 80, 1.1, -0.5); bacterie(ctx, cx - 260, cy + 140, 1, 1.2); },

  s01(ctx, t, q) { const nd = q.on('volgende', 1);
    ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 600, W, H - 600); ctx.fillStyle = '#4A7040'; for (let i = 0; i < 40; i++) ctx.fillRect(hash(i) * W, 600 + hash(i * 3) * 300, 4, 20);
    roundRect(ctx, 160, 520, 440, 40, 6); shape(ctx, '#B08A5C', '#8C6A44', 2);
    person(ctx, 420, 900, 560, 1, { armR: { a1: 0.9, a2: 1.2 }, armL: { a1: 0.5, a2: 0.9 } });
    zoomCircle(ctx, 1220, 450, 330, 520, 560, nd > 0.5 ? 'de volgende dag' : '', q.on('splinter', 1), () => {
      ctx.fillStyle = '#2E3F55'; ctx.fillRect(880, 110, 700, 700);
      roundRect(ctx, 900, 380, 640, 160, 80); shape(ctx, SKINS[1], '#A87A5A', 3); roundRect(ctx, 1420, 400, 90, 120, 30); shape(ctx, '#E8C8B4', '#A87A5A', 2);
      if (nd > 0.01) { const g = ctx.createRadialGradient(1180, 460, 10, 1180, 460, 160); g.addColorStop(0, rgba('#E0503E', 0.7 * nd)); g.addColorStop(1, rgba('#E0503E', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(1180, 460, 170, 110 + 20 * nd, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.globalAlpha *= nd; ctx.strokeStyle = rgba('#E0503E', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1180, 455, 120, 92, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      const out = ramp(t, q.at('trekt'), 1.2); if (nd < 0.5) { ctx.save(); ctx.translate(1180 - 70 * out, 420 - 160 * out); ctx.rotate(-0.6); ctx.fillStyle = '#8C5A3A'; ctx.fillRect(-6, -90, 12, 120); ctx.restore(); }
    });
    if (nd > 0.01) { regel(ctx, 'rood · warm · dik · pijn', 1220, 860, q.on('pijn', 1), C.koraal, 34, 'center', 700); }
    vraagteken(ctx, 1700, 300, q.on('Waarom', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const bar = [['huid', 'huid', 1], ['slijm', 'slijm', 1], ['lysozym', 'lysozym', 1], ['maag', 'maag', 1], ['flora', 'darmen', 1]]; const cur = bar.reduce((k, b, i) => q.on(b[1], b[2]) > 0.5 ? i : k, -1);
    const pA = 1 - q.on('slijm', 1);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; huidDoorsnede(ctx, 340, 360, 900, t, { zuur: q.on('zuur', 1), schilfer: q.on('afschilferen', 1) });
      for (let i = 0; i < 6; i++) { const u = (t * 0.2 + i / 6) % 1; bacterie(ctx, 380 + hash(i) * 820, 250 - 40 * Math.sin(u * 6.28 + i), 1, hash(i * 3) * 3, 1 - 0.3 * q.on('prettig', 1)); }
      tag(ctx, 'de huid: eerste muur', 790, 150, HOORN, q.on('muur', 1)); ctx.restore(); }
    if (1 - pA > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - pA; lichaam(ctx, 620, 560, 0.85, 1, { darm: 1, darmA: 0.5 });
      const pts = [['slijm en trilharen', 'luchtwegen', 620, 300, 'slijm', 1, '#9FC3E0'], ['lysozym', 'traanvocht, speeksel', 650, 140, 'lysozym', 1, '#AFC0D0'], ['maagzuur', 'zoutzuur', 690, 395, 'maag', 1, C.goud], ['eigen bacteriën', 'huid en darmen', 600, 640, 'darmen', 1, C.groen]];
      ctx.save(); ctx.globalAlpha *= q.on('maag', 1); ctx.beginPath(); ctx.ellipse(690, 395, 70, 45, -0.4, 0, 6.283); shape(ctx, rgba(C.goud, 0.25), C.goud, 2); ctx.restore(); pts.forEach(([n, m, ax, ay, w, k, col], i) => { const P = [[850, 290], [712, 125], [850, 405], [850, 700]][i]; naamBij(ctx, n, m, P[0], P[1], q.on(w, k), 'left', col); });
      const fl = q.on('darmen', 1); for (let i = 0; i < 12; i++) bacterie(ctx, 540 + hash(i * 5) * 160, 600 + hash(i * 9) * 160, 0.45, hash(i) * 6, fl * 0.9, 0, FLORA);
      ctx.restore(); }
    tag(ctx, 'ongeveer net zoveel bacteriën als eigen cellen', 960, 860, C.groen, q.on('ongeveer', 1));
  },
  s05(ctx, t, q) { bg(ctx, 'schema'); lichaam(ctx, 620, 560, 0.85, 1, { darm: 1, darmA: 0.6 }); for (let i = 0; i < 12; i++) bacterie(ctx, 540 + hash(i * 5) * 160, 600 + hash(i * 9) * 160, 0.45, hash(i) * 6, 0.9, 0, FLORA);
    ctx.save(); ctx.translate(1250, 420); ctx.rotate(-0.4); roundRect(ctx, -110, -40, 220, 80, 40); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -40, 110, 80, 40); ctx.fill(); ctx.restore(); regel(ctx, 'antibiotica', 1250, 540, 1, C.text, 32, 'center', 700);
    vraagteken(ctx, 1560, 520, q.on('Hoe', 1), 130); },
  s07(ctx, t, q) { bg(ctx, 'schema'); lichaam(ctx, 620, 560, 0.85, 1, { darm: 1, darmA: 0.6 }); const d = ramp(t, q.at('onderscheid'), 2);
    for (let i = 0; i < 12; i++) bacterie(ctx, 540 + hash(i * 5) * 160, 600 + hash(i * 9) * 160, 0.45, hash(i) * 6, 0.9 * (1 - d * (i % 4 !== 0 ? 1 : 0)), 0, FLORA);
    const sp = q.on('ruimte', 1); for (let i = 0; i < 9; i++) bacterie(ctx, 545 + hash(i * 11) * 150, 610 + hash(i * 13) * 150, 0.45, hash(i * 2) * 6, sp * clamp(ramp(t, q.at('ruimte'), 3) * 9 - i, 0, 1)); const sc = q.on('schimmels', 1); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha *= sc; circ(ctx, 560 + hash(i * 17) * 130, 640 + hash(i * 19) * 120, 9, rgba('#9AA3B2', 0.8), '#C9D2DE', 1); ctx.restore(); }
    tag(ctx, 'antibiotica doden ook je nuttige bacteriën', 1300, 260, C.koraal, q.on('onderscheid', 1)); tag(ctx, 'schadelijke bacteriën krijgen ruimte', 1300, 380, BACT, q.on('ruimte', 1)); tag(ctx, 'schimmels: antibiotica doen niets', 1300, 500, '#9AA3B2', q.on('schimmels', 1)); },

  s08(ctx, t, q) { bg(ctx, 'micro');
    const ent = ramp(t, q.at('Bacteriën'), 2); ctx.strokeStyle = '#8C5A3A'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(300, 80); ctx.lineTo(300 + 220 * Math.min(1, ramp(t, 0.2, 1.5)), 80 + 260 * Math.min(1, ramp(t, 0.2, 1.5))); ctx.stroke(); huidDoorsnede(ctx, 120, 60, 600, t, { a: 0.5 });
    const fa = q.on('macrofagen', 1); const eat = ramp(t, q.at('omsluit'), 3), in2 = ramp(t, q.at('blaasje', 1), 2), lys = ramp(t, q.at('Lysosomen'), 2), brk = ramp(t, q.at('breken'), 2);
    const fx = 1050, fy = 540, bx = lerp(1300, fx + 55, in2), by = lerp(470, fy + 55, in2);
    for (let i = 0; i < 3; i++) bacterie(ctx, 420 + i * 90 + 220 * ent, 330 + i * 60, 1.2, i, ent * (i === 0 ? 0 : 1));
    fagocyt(ctx, fx, fy, 170, t, { a: fa, arm: eat * (1 - in2), tx: 1300, ty: 470, label: 'macrofaag (fagocyt)', kern: 'rond' });
    if (fa > 0.01) { bacterie(ctx, bx, by, 1.4, 0.4, fa, brk); if (in2 > 0.01) { ctx.save(); ctx.globalAlpha *= in2; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx + 55, fy + 55, 48, 0, 6.283); ctx.stroke(); ctx.restore(); }
      for (let i = 0; i < 3; i++) { const an = i * 2.1 + 0.5; const rr = lerp(120, 58, lys); circ(ctx, fx + 55 + Math.cos(an) * rr, fy + 55 + Math.sin(an) * rr, 14, rgba(C.lyso, 0.7 * lys), C.lyso, 1.5); } }
    label(ctx, 'schijnvoetjes', '', 1230, 470, 1500, 260, q.on('schijnvoetjes', 1) * (1 - in2), WIT); label(ctx, 'lysosomen', 'met enzymen', fx + 55 + 58, fy + 95, 1500, 760, lys, C.lyso);
    tag(ctx, 'fagocytose', 1050, 140, C.goud, q.on('fagocytose', 1));
  },
  s09(ctx, t, q) { bg(ctx, 'micro'); fagocyt(ctx, 760, 520, 170, t, {}); bacterie(ctx, 1260, 480, 2, 0.3); regel(ctx, 'nieuwe bacterie', 1260, 600, 1, C.text2, 30, 'center'); vraagteken(ctx, 1010, 360, q.on('opeten', 1), 130); },
  s11(ctx, t, q) { bg(ctx, 'micro');
    const ec = q.on('eigen', 1), vr = q.on('herkent', 1);
    ctx.save(); ctx.globalAlpha *= ec; roundRect(ctx, 260, 360, 300, 200, 60); shape(ctx, rgba(C.teal, 0.2), C.teal, 2); ctx.fillStyle = C.teal; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(300 + i * 55, 360, 10, Math.PI, 0); ctx.fill(); } regel(ctx, 'jouw cel: jouw vormpjes', 410, 610, 1, C.teal, 30, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= vr; for (let i = 0; i < 3; i++) bacterie(ctx, 1320 + i * 110, 380 + i * 90, 2, 0.2 * i); regel(ctx, 'bacteriën: gedeelde vormpjes', 1430, 680, 1, BACT, 30, 'center', 700); ctx.restore();
    fagocyt(ctx, 860, 480, 150, t, { arm: q.on('vreemd', 1) * 0.8, tx: 1320, ty: 380 });
    tag(ctx, 'dit is vreemd', 1100, 200, BACT, q.on('vreemd', 1) * (1 - q.on('aspecifieke', 1)));
    tag(ctx, 'aspecifieke afweer: snel, altijd klaar, niet op maat', 960, 820, C.goud, q.on('aspecifieke', 1)); tag(ctx, 'geen geheugen', 960, 200, C.text2, q.on('onthoudt', 1));
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    const ln = q.on('lymfe', 1); const dx = lerp(560, 1360, ramp(t, q.at('reizen'), 4));
    ctx.save(); ctx.globalAlpha *= 1 - 0.3 * ln; fagocyt(ctx, dx, 480, 140, t, { seed: 9, kern: 'rond' }); for (let i = 0; i < 4; i++) { const an = i * 1.6 - 1; ctx.strokeStyle = WIT; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx + Math.cos(an) * 120, 480 + Math.sin(an) * 120); ctx.lineTo(dx + Math.cos(an) * 200, 480 + Math.sin(an) * 200); ctx.stroke(); } ctx.restore();
    regel(ctx, 'dendritische cel', dx, 690, q.on('dendritische', 1), C.text, 30, 'center', 700);
    const st = q.on('stukjes', 1); for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha *= st; ctx.fillStyle = '#F2C0A8'; const an = -1.2 + i * 0.5, px = dx + Math.cos(an) * 128, py = 480 + Math.sin(an) * 128; ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px, py - 14); ctx.lineTo(px + 8, py); ctx.closePath(); ctx.fill(); ctx.restore(); }
    label(ctx, 'antigeen', 'stukje van de bacterie', dx + 10, 355, dx + 90, 210, q.on('antigeen', 1), '#F2C0A8', 'left');
    if (ln > 0.01) { ctx.save(); ctx.globalAlpha *= ln; ctx.beginPath(); ctx.ellipse(1600, 470, 200, 170, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.1), rgba(C.groen, 0.7), 2); regel(ctx, 'lymfeknoop', 1580, 700, 1, C.groen, 30, 'center', 700); for (let i = 0; i < 6; i++) circ(ctx, 1500 + (i % 3) * 80, 420 + Math.floor(i / 3) * 100, 28, rgba(C.groen, i === 4 ? 0.6 * q.on('passen', 1) + 0.2 : 0.2), C.groen, 1.5); ctx.restore(); }
    tag(ctx, 'T-helpercel die precies past → specifieke afweer', 960, 820, C.groen, q.on('passen', 1));
  },

  s13(ctx, t, q) { bg(ctx, 'micro');
    const w = 1 + 0.5 * ramp(t, q.at('wijder'), 2), lek = ramp(t, q.at('doorlaten'), 2), wbc = q.on('kruipen', 1);
    haarvat(ctx, 160, 1760, 700, w, t, { lek });
    mestcel(ctx, 520, 340, 70, 1, q.on('histamine', 1), t); label(ctx, 'mestcel', 'geeft histamine af', 470, 400, 160, 500, q.on('mestcellen', 1), HIST, 'left');
    const sw = q.on('dik', 1); if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw * 0.35; ctx.fillStyle = VOCHTK; ctx.beginPath(); ctx.ellipse(1100, 420, 520, 200, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    const ps = q.on('pus', 1); if (ps > 0.01) { ctx.save(); ctx.globalAlpha *= ps * (1 - 0.5 * q.on('antwoord', 1)); ctx.beginPath(); ctx.ellipse(1200, 320, 260, 90, 0, 0, 6.283); shape(ctx, rgba(PUS, 0.35), PUS, 2); regel(ctx, 'pus', 1200, 330, 1, C.text, 32, 'center', 700); ctx.restore(); }
    for (let i = 0; i < 4; i++) { const v = clamp(ramp(t, q.at('kruipen') + i * 0.8, 3), 0, 1); const x = 900 + i * 180, y = lerp(700, 360 + 30 * i, v); if (wbc > 0.01) fagocyt(ctx, x, y, 34, t, { a: wbc, seed: i }); }
    for (let i = 0; i < 5; i++) bacterie(ctx, 900 + i * 160, 300 + (i % 2) * 60, 0.6, i, 1, q.on('pus', 1));
    tag(ctx, 'wijder: meer bloed → rood en warm', 960, 130, BLD, q.on('wijder', 1) * (1 - q.on('doorlaten', 1)));
    tag(ctx, 'doorlaatbaarder: vocht lekt → dik', 960, 130, VOCHTK, q.on('doorlaten', 1) * (1 - q.on('pijn', 1)));
    tag(ctx, 'vocht en ontstekingsstoffen → pijn', 960, 130, C.koraal, q.on('pijn', 1) * (1 - q.on('kruipen', 1)));
    tag(ctx, 'neutrofielen kruipen het weefsel in', 960, 130, WIT, q.on('kruipen', 1) * (1 - q.on('geen', 1)));
    tag(ctx, 'rode bloedcellen blijven in het vat', 960, 130, BLD, q.on('geen', 1) * (1 - q.on('antwoord', 1)));
    tag(ctx, 'antwoord a: je lichaam doet het zelf', 960, 130, C.goud, q.on('antwoord', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'koorts: vanaf ± 38 °C', 960, 300, q.on('achtendertig', 1), C.koraal, 44, 'center', 700);
    ctx.save(); ctx.translate(960, 560); roundRect(ctx, -30, -200, 60, 340, 30); shape(ctx, '#E6E1D3', '#9AA3B2', 3); circ(ctx, 0, 160, 60, C.koraal, '#9AA3B2', 3); ctx.fillStyle = C.koraal; ctx.fillRect(-14, -60 - 60 * Math.sin(t) * 0.2, 28, 220); ctx.restore(); vraagteken(ctx, 1300, 560, q.on('Waardoor', 1), 130); },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const X = 380, Y = 240, Wg = 1000, Hg = 380; const setp = s => s < 2 ? 37 : s < 12 ? 39 : 37; const lich = s => s < 2 ? 37 : s < 12 ? 39 - 2 * Math.exp(-(s - 2) * 0.6) : 37 + (lich(11.99) - 37) * Math.exp(-(s - 12) * 0.6);
    const u = 0.72 * ramp(t, q.at('thermostaat'), 16) + 0.28 * ramp(t, q.at('omlaag'), 6); const hs = q.on('Witte', 1); if (hs > 0.01) { ctx.save(); ctx.globalAlpha *= hs; ctx.beginPath(); ctx.ellipse(1640, 640, 150, 120, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.12), rgba(C.mens, 0.6), 2); circ(ctx, 1640, 680, 22, rgba(C.goud, 0.5), C.goud, 2); const sv = (setp(u * 16) - 37) / 2; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1640, 680); ctx.lineTo(1640 + Math.cos(-2.4 + sv * 1.6) * 60, 680 + Math.sin(-2.4 + sv * 1.6) * 60); ctx.stroke(); regel(ctx, 'hypothalamus: thermostaat', 1640, 810, 1, C.goud, 26, 'center', 700); ctx.restore(); }
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 16, ymax: 42, f: s => (setp(s) - 35) * 42 / 7, u, xticks: [], yticks: [], xlab: 'tijd', ylab: 'temperatuur', col: C.goud });
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 16, ymax: 42, f: s => (lich(s) - 35) * 42 / 7, u, xticks: [], yticks: [], col: C.koraal });
    regel(ctx, '39 °C', X - 20, Y + Hg - (4 * 42 / 7) / 42 * Hg + 10, 1, C.text2, 26, 'right'); regel(ctx, '37 °C', X - 20, Y + Hg - (2 * 42 / 7) / 42 * Hg + 10, 1, C.text2, 26, 'right'); regel(ctx, '— instelling (thermostaat)', X + Wg + 30, Y + 60, q.on('thermostaat', 1), C.goud, 28); regel(ctx, '— lichaamstemperatuur', X + Wg + 30, Y + 110, q.on('thermostaat', 1), C.koraal, 28);
    tag(ctx, 'te koud: vaatjes in de huid nauwer, rillen', 880, 140, '#9FC3E0', q.on('koud', 1) * (1 - q.on('trager', 1)));
    tag(ctx, 'ziekteverwekkers trager, afweer beter', 880, 140, C.groen, q.on('trager', 1) * (1 - q.on('omlaag', 1)));
    tag(ctx, 'thermostaat omlaag: te warm → zweten', 880, 140, C.koraal, q.on('omlaag', 1) * (1 - q.on('nadelen', 1)));
    tag(ctx, 'nadelen: energie, vocht · > 41 °C gevaarlijk', 880, 140, C.koraal, q.on('nadelen', 1));
    tag(ctx, 'koorts is een deel van de afweer', 880, 820, C.goud, q.on('Koorts', 1) * (1 - q.on('nadelen', 1)));
    tag(ctx, 'witte bloedcellen → stoffen → hypothalamus', 880, 140, WIT, q.on('Witte', 1) * (1 - q.on('koud', 1)));
  },
  s17(ctx, t, q) { ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 600, W, H - 600);
    person(ctx, 420, 900, 560, 1, { armR: { a1: 0.9, a2: 1.2 }, armL: { a1: 0.5, a2: 0.9 } });
    const ch = [['histamine: vaatjes wijder → rood, warm', 'Histamine', 1, BLD], ['doorlaatbaarder: vocht en witte bloedcellen → dik', 'doorlaten', 1, VOCHTK], ['fagocyten ruimen op', 'ruimden', 1, WIT], ['afweer op maat: volgende film', 'maat', 1, C.goud]];
    ctx.fillStyle = rgba('#0B0F16', 0.5 * q.on('Histamine', 1)); ctx.fillRect(800, 150, 1060, 560);
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1330, 260 + i * 120, col, q.on(w, n)));
  },
};

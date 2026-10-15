// Gaswisseling 3 · Uitscheiding en evenwicht — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[0], hair: '#B8B2A8', shirt: '#6A7F95', hairStyle: 'short' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const BLD = '#B5574A', DIAL = '#5BA4C9', UREUM = '#C9A35C', GLUC = '#7FC48F', NA = '#AFC0D0', KAL = '#D98CC0', HCO = '#9A8FB8', ZUUR = '#E0B64A', LONG = '#D98C8C', LEVER = '#8C4A3A', VLIES = '#E6E1D3', AMMO = '#E07A5F';

// ---------- deeltjes ----------
function ureumD(ctx, x, y, r = 8, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, UREUM, lighten(UREUM, 0.3), 1.2); ctx.restore(); }
function glucD(ctx, x, y, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(GLUC, 0.6), GLUC, 1.5, 0); ctx.restore(); }
function hPlus(ctx, x, y, a = 1, r = 13) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(ZUUR, 0.35), ZUUR, 1.5); text(ctx, 'H⁺', x, y + r * 0.4, fTekst(r * 1.1, 700), C.text, 'center'); ctx.restore(); }
function pil(ctx, s, x, y, col, a = 1, px = 24) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + 18; roundRect(ctx, x - w / 2, y - px * 0.8, w, px * 1.35, px * 0.6); shape(ctx, rgba(col, 0.25), col, 1.5); text(ctx, s, x, y + px * 0.28, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
function rbcD(ctx, x, y, r = 22, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C9483E', '#E07A6E', 1.5); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function eiwitD(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) circ(ctx, x + Math.cos(i * 1.3) * 12 * s, y + Math.sin(i * 1.7) * 10 * s, 9 * s, rgba('#8FA0B5', 0.7), '#AFC0D0', 1.2); ctx.restore(); }

// ---------- schema's ----------
// lichaam met uitscheidingsorganen; o.lit = {longen, lever, nieren, huid, darm}
function orgaanKaart(ctx, x, y, s, o = {}) { const { a = 1, lit = {}, darm = 0.6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = k => 0.35 + 0.65 * (lit[k] || 0);
  if ((lit.huid || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= lit.huid; ctx.shadowColor = DIAL; ctx.shadowBlur = 30; lichaam(ctx, x, y, s, 1, { darm: 0, kleur: DIAL }); ctx.restore(); }
  lichaam(ctx, x, y, s, 1, { darm: 1, darmA: darm * (0.4 + 0.6 * (lit.darm || 0)) });
  ctx.save(); ctx.globalAlpha *= L('longen'); for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + d * 95 * s, y - 190 * s, 80 * s, 120 * s, d * 0.1, 0, 6.283); shape(ctx, rgba(LONG, 0.45), lighten(LONG, 0.2), 2); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('lever'); ctx.beginPath(); ctx.moveTo(x - 190 * s, y - 70 * s); ctx.quadraticCurveTo(x - 40 * s, y - 110 * s, x + 60 * s, y - 60 * s); ctx.quadraticCurveTo(x - 60 * s, y + 10 * s, x - 180 * s, y - 10 * s); ctx.closePath(); shape(ctx, rgba(LEVER, 0.7), '#B06A58', 2); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('nieren'); nierVorm(ctx, x - 92 * s, y + 52 * s, 0.9 * s, -1, 1); nierVorm(ctx, x + 92 * s, y + 52 * s, 0.9 * s, 1, 1); ctx.restore();
  ctx.restore(); }
// membraanpaneel: bloedkant links, dialysevloeistof rechts
function membraan(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, vloeiA = 1, flow = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w / 2, h, 18); shape(ctx, rgba(BLD, 0.18), rgba(BLD, 0.6), 2);
  ctx.save(); ctx.globalAlpha *= vloeiA; roundRect(ctx, x, y - h / 2, w / 2, h, 18); shape(ctx, rgba(DIAL, 0.16), rgba(DIAL, 0.6), 2); ctx.restore();
  ctx.strokeStyle = VLIES; ctx.lineWidth = 6; ctx.setLineDash([22, 12]); ctx.beginPath(); ctx.moveTo(x, y - h / 2); ctx.lineTo(x, y + h / 2); ctx.stroke(); ctx.setLineDash([]);
  metaText(ctx, 'BLOED', x - w / 4, y - h / 2 - 16, BLD, 'center', 22); ctx.save(); ctx.globalAlpha *= vloeiA; metaText(ctx, 'DIALYSEVLOEISTOF', x + w / 4, y - h / 2 - 16, DIAL, 'center', 22); ctx.restore();
  if (flow > 0.01) { for (let i = 0; i < 3; i++) { const v = (t * 0.3 + i / 3) % 1; arrow(ctx, x - w / 2 + 30, y - h / 2 + 20 + v * (h - 60), x - w / 2 + 30, y - h / 2 + 50 + v * (h - 60), rgba(BLD, 0.7), flow * (1 - Math.abs(v - 0.5)), 3); arrow(ctx, x + w / 2 - 30, y + h / 2 - 20 - v * (h - 60), x + w / 2 - 30, y + h / 2 - 50 - v * (h - 60), rgba(DIAL, 0.7), flow * vloeiA * (1 - Math.abs(v - 0.5)), 3); } }
  ctx.restore(); }
// rij in de concentratietabel: balk bloed, balk vloeistof, pijl door het vlies
function concRij(ctx, x, y, naam, cb, cv, dir, col, a = 1, t = 0, max = 10) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = 300;
  regel(ctx, naam, x - 470, y + 12, 1, C.text, 30, 'right', 700);
  roundRect(ctx, x - 40 - bw * cb / max, y - 16, bw * cb / max, 32, 8); shape(ctx, rgba(col, 0.6), col, 1.5);
  if (cv > 0) { roundRect(ctx, x + 40, y - 16, bw * cv / max, 32, 8); shape(ctx, rgba(col, 0.6), col, 1.5); } else regel(ctx, 'geen', x + 50, y + 10, 1, C.text2, 26);
  if (dir !== 0) { const u = (t * 0.6) % 1; arrow(ctx, x - 30 * dir, y, x + 30 * dir, y, col, 1, 5); circ(ctx, x + dir * lerp(-30, 30, u), y, 7, col); } else { circ(ctx, x, y, 18, C.bgSchema); regel(ctx, '=', x, y + 12, 1, C.text, 34, 'center', 700); }
  ctx.restore(); }
function machine(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 110, y - 260, 220, 440, 18); shape(ctx, '#D8DCE2', '#9AA3B2', 3); roundRect(ctx, x - 80, y - 230, 160, 100, 8); shape(ctx, '#2E4060', '#9AA3B2', 2);
  ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const xx = x - 70 + i * 140 / 30; const yy = y - 180 + 18 * Math.sin(i * 0.8 + t * 4); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  circ(ctx, x - 40, y - 60, 34, '#B8BEC8', '#7A8494', 2); ctx.save(); ctx.translate(x - 40, y - 60); ctx.rotate(t * 3); ctx.strokeStyle = '#5A6474'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.stroke(); ctx.restore();
  roundRect(ctx, x + 30, y - 110, 34, 150, 14); shape(ctx, rgba(DIAL, 0.5), '#E6E1D3', 2); ctx.restore(); }
function filterBuis(ctx, x, y, w, h, t, a = 1, o = {}) { const { tegen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); shape(ctx, rgba(DIAL, 0.15), '#E6E1D3', 3);
  for (let i = 0; i < 7; i++) { const yy = y - h / 2 + 18 + i * (h - 36) / 6; ctx.strokeStyle = rgba(BLD, 0.75); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - w / 2 + 20, yy); ctx.lineTo(x + w / 2 - 20, yy); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { const v = (t * 0.25 + i / 4) % 1; arrow(ctx, x - w / 2 + v * w - 20, y - h / 2 - 22, x - w / 2 + v * w + 20, y - h / 2 - 22, BLD, 1 - Math.abs(v - 0.5) * 1.6, 4); const v2 = tegen > 0.5 ? 1 - v : v; arrow(ctx, x - w / 2 + v2 * w + 20 * (tegen > 0.5 ? 1 : -1), y + h / 2 + 22, x - w / 2 + v2 * w - 20 * (tegen > 0.5 ? 1 : -1), y + h / 2 + 22, DIAL, 1 - Math.abs(v - 0.5) * 1.6, 4); }
  ctx.restore(); }
function dialyseKamer(ctx, t, o = {}) { const { arm = 0 } = o;
  ctx.fillStyle = '#3B4E63'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#4A5A6E'; ctx.fillRect(0, 660, W, H - 660);
  roundRect(ctx, 1280, 120, 460, 300, 8); shape(ctx, '#7FA8CC', '#C9C2B4', 8);
  machine(ctx, 1080, 560, t);
  ctx.strokeStyle = '#8C8C96'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1500, 100); ctx.lineTo(1500, 260); ctx.stroke(); roundRect(ctx, 1460, 260, 80, 130, 14); shape(ctx, rgba('#E6F0F8', 0.75), '#C9D2DE', 2); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1500, 390); ctx.quadraticCurveTo(1420, 470, 1140, 470); ctx.stroke();
  person(ctx, 700, 900, 560, 1, { armR: { a1: 0.9, a2: 0.6 }, armL: { a1: 0.5, a2: 1.2 } });
  roundRect(ctx, 430, 620, 540, 280, 40); shape(ctx, '#2E7D6E', '#246459', 3); roundRect(ctx, 400, 540, 80, 200, 30); shape(ctx, '#2E7D6E', '#246459', 3); roundRect(ctx, 920, 540, 80, 200, 30); shape(ctx, '#2E7D6E', '#246459', 3);
  ctx.strokeStyle = BLD; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(900, 560); ctx.bezierCurveTo(960, 520, 980, 520, 1040, 500); ctx.stroke(); ctx.strokeStyle = '#D9483E'; ctx.beginPath(); ctx.moveTo(905, 580); ctx.bezierCurveTo(970, 560, 990, 560, 1040, 540); ctx.stroke(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'schema'); const cx = 1580, cy = 470;
    nierVorm(ctx, cx - 120, cy - 40, 2.4, -1, 1); nierVorm(ctx, cx + 120, cy - 40, 2.4, 1, 1);
    for (let i = 0; i < 6; i++) { const v = (t * 0.3 + i / 6) % 1; ureumD(ctx, cx - 40 + 80 * hash(i), cy + 100 + v * 160, 8, 1 - v); }
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 200, cy + 300); ctx.lineTo(cx + 200, cy + 300); ctx.stroke(); const tilt = 0.06 * Math.sin(t * 0.9); ctx.save(); ctx.translate(cx, cy + 300); ctx.rotate(tilt); ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(200, 0); ctx.stroke(); ctx.restore(); },

  s01(ctx, t, q) { dialyseKamer(ctx, t);
    const vl = q.on('vlies', 1); if (vl > 0.01) { ctx.save(); ctx.globalAlpha *= vl; ctx.fillStyle = '#0B0F16'; ctx.fillRect(0, 0, W, H); ctx.restore();
      membraan(ctx, 960, 430, 900, 460, { a: vl, t, flow: 0.6 });
      const kd = q.on('Kleine', 1); for (let i = 0; i < 8; i++) { const u = (t * 0.2 + hash(i)) % 1; const crossing = kd > 0.5 && i % 3 === 0; ureumD(ctx, crossing ? lerp(600, 1300, u) : 540 + hash(i * 3) * 380, 260 + hash(i * 5) * 340, 10, vl * (crossing ? (u < 0.5 ? 1 : 0.3 + 0.7 * (1 - u)) : 1)); }
      for (let i = 0; i < 5; i++) { glucD(ctx, 560 + hash(i * 7) * 340, 280 + hash(i * 11) * 300, 12, vl); glucD(ctx, 1060 + hash(i * 13) * 340, 280 + hash(i * 17) * 300, 12, vl * q.on('wel', 1)); }
      regel(ctx, '● ureum', 560, 720, kd, UREUM, 30); regel(ctx, '⬡ glucose', 780, 720, kd, GLUC, 30); tag(ctx, 'kleine deeltjes kunnen door het vlies', 960, 140, VLIES, kd * (1 - q.on('wel', 1)));
      tag(ctx, 'vloeistof: wel glucose, geen ureum', 960, 140, DIAL, q.on('wel', 1)); }
    tag(ctx, 'Ruud, 58 · drie keer per week vier uur dialyse', 760, 160, C.text2, q.on('Drie', 1) * (1 - vl));
    vraagteken(ctx, 1560, 560, q.on('Waarom', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema'); const X = 620, Y = 590, S = 0.85;
    const lit = { darm: q.on('Ontlasting', 1) * (1 - q.on('Uitscheiding', 1)) + q.on('gal', 3) * (1 - q.on('nieren', 1)), longen: q.on('longen', 1) * (1 - q.on('huid', 1)), huid: q.on('huid', 1) * (1 - q.on('lever', 1)), lever: q.on('lever', 1) * (1 - q.on('nieren', 1)), nieren: q.on('nieren', 1) };
    orgaanKaart(ctx, X, Y, S, { lit, darm: 1 });
    tag(ctx, 'ontlasting: resten van eten, nooit opgenomen', 1360, 160, C.text2, q.on('Ontlasting', 1) * (1 - q.on('Uitscheiding', 1)));
    tag(ctx, 'uitscheiding: afval uit je eigen cellen + overschot', 1360, 160, C.goud, q.on('Uitscheiding', 1) * (1 - q.on('longen', 1)));
    const rows = [['longen', 'koolstofdioxide, waterdamp', LONG, 'longen'], ['huid', 'zweet: water, zouten, beetje ureum', DIAL, 'huid'], ['lever', 'galkleurstof via de gal → ontlasting', '#B06A58', 'lever'], ['nieren', 'urine: water, zouten, ureum', C.koraal, 'nieren']];
    rows.forEach(([o, s, col, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; regel(ctx, o, 1080, 300 + i * 120, a, col, 36, 'left', 700); regel(ctx, s, 1080, 342 + i * 120, a, C.text2, 28); });
    naamBij(ctx, 'darm', 'ontlasting', 850, 740, q.on('Ontlasting', 1) * (1 - q.on('longen', 1)), 'left', C.text2);
    tag(ctx, 'galkleurstof maakt poep bruin: dát is uitscheiding', 1360, 820, '#B06A58', q.on('bruin', 1) * (1 - q.on('nieren', 1)));
    vraagteken(ctx, 1700, 720, q.on('orgaan', 1), 130);
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    const st = [q.on('Aminozuren', 1), q.on('stikstofgroep', 1), q.on('ammoniak', 1), q.on('ureum', 2), q.on('nieren', 2)];
    tag(ctx, 'de lever maakt ureum; de nieren scheiden het uit', 960, 130, C.goud, q.on('Antwoord', 1) * (1 - st[0]));
    ctx.save(); ctx.globalAlpha *= st[0]; ctx.beginPath(); ctx.ellipse(620, 470, 520, 270, 0, 0, 6.283); shape(ctx, rgba(LEVER, 0.18), rgba('#B06A58', 0.7), 2); metaText(ctx, 'LEVERCEL', 620, 230, '#B06A58', 'center', 22); ctx.restore();
    ctx.save(); ctx.globalAlpha *= st[0]; for (let i = 0; i < 3; i++) circ(ctx, 280 + i * 30, 470, 14, rgba(C.goud, 0.6), C.goud, 1.5); circ(ctx, lerp(370, 600, st[1]), lerp(470, 440, st[1]), 14, rgba(DIAL, 0.7 * (1 - st[2])), DIAL, 1.5); regel(ctx, 'aminozuur', 320, 540, 1, C.text2, 28, 'center'); regel(ctx, 'niet op te slaan', 320, 580, q.on('opslaan', 1), C.text2, 24, 'center'); ctx.restore();
    arrow(ctx, 420, 470, 560, 470, C.text, st[1], 4); regel(ctx, 'stikstofgroep eraf', 490, 430, st[1], DIAL, 24, 'center');
    ctx.save(); ctx.globalAlpha *= st[2]; circ(ctx, 640, 470, 30, rgba(AMMO, 0.4), AMMO, 2.5); text(ctx, 'NH₃', 640, 480, fTekst(26, 700), C.text, 'center'); regel(ctx, 'ammoniak', 640, 540, 1, AMMO, 30, 'center', 700); regel(ctx, 'giftig', 640, 580, q.on('giftig', 1), AMMO, 26, 'center'); ctx.restore();
    arrow(ctx, 690, 470, 860, 470, C.text, st[3], 4);
    ctx.save(); ctx.globalAlpha *= st[3]; ureumD(ctx, 930, 470, 30); regel(ctx, 'ureum', 930, 540, 1, UREUM, 30, 'center', 700); regel(ctx, 'veel minder giftig · lost goed op', 930, 580, q.on('minder', 1), C.text2, 24, 'center'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= st[4]; bloedLijn(ctx, 1180, 470, 1500, t); ureumD(ctx, lerp(1000, 1480, (t * 0.3) % 1), 470, 12); nierVorm(ctx, 1600, 470, 1.6, 1, 1); regel(ctx, 'nieren', 1600, 590, 1, C.text2, 28, 'center'); ctx.restore();
    tag(ctx, 'nefron en filteren: zie de film Water in balans', 960, 800, C.text2, q.on('filtert', 1));
  },

  s07(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('pH', 1), pC = q.on('Toch', 1); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; ctx.fillStyle = rgba(DIAL, 0.12); roundRect(ctx, 260, 200, 700, 560, 40); ctx.fill(); metaText(ctx, 'WEEFSELVLOEISTOF · INWENDIG MILIEU', 610, 250, DIAL, 'center', 22); cel(ctx, 610, 500, 300, 220, { naam: 'cel' });
      const m = [['water', 'water', DIAL], ['zout', 'zout', NA], ['glucose', 'glucose', GLUC], ['temperatuur', 'temperatuur', C.koraal], ['zuurgraad', 'zuurgraad', ZUUR]];
      m.forEach(([n, w, col], i) => { const a = q.on(w, 1); const x = 1120 + i * 150; meter(ctx, x, 330, 300, 0.5 + 0.03 * Math.sin(t * 2 + i), col, a, n); });
      tag(ctx, 'homeostase: alles binnen nauwe grenzen', 1420, 780, C.goud, q.on('homeostase', 1)); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC); phSchaal(ctx, 260, 360, 1400, { band: q.on('vijfendertig', 1), zuur: q.on('zuurder', 1) }); tag(ctx, 'buiten de grenzen: enzymen en eiwitten werken slecht', 960, 760, C.koraal, q.on('enzymen', 1)); ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      pil(ctx, 'CO₂ → koolzuur', 420, 260, HCO, q.on('Koolstofdioxide', 1), 30); pil(ctx, 'melkzuur (spieren)', 420, 360, C.koraal, q.on('melkzuur', 1), 30);
      const hz = q.on('Toch', 1); for (let i = 0; i < 10; i++) { const v = (t * 0.25 + hash(i)) % 1; const caught = q.on('Buffers', 1) > 0.5 && i < 7; hPlus(ctx, caught ? 1150 + (i % 4) * 70 : 700 + v * 300, caught ? 460 + Math.floor(i / 4) * 80 : 300 + hash(i * 3) * 300, hz, 16); }
      regel(ctx, 'waterstofionen maken een stof zuur', 700, 680, hz * (1 - q.on('Buffers', 1)), ZUUR, 30);
      const bf = q.on('Buffers', 1); pil(ctx, 'buffer: HCO₃⁻', 1200, 380, HCO, bf, 28); pil(ctx, 'buffer: hemoglobine', 1500, 380, BLD, bf, 28);
      tag(ctx, 'buffer houdt het zuur alleen vast', 1300, 760, C.goud, q.on('vast', 1) * (1 - q.on('organen', 1))); tag(ctx, 'echt weg: via twee organen', 1300, 760, C.goud, q.on('organen', 1));
      ctx.restore(); }
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    cel(ctx, 560, 470, 380, 280, { naam: 'cel zonder insuline' }); for (let i = 0; i < 4; i++) circ(ctx, 470 + i * 60, 470 + (i % 2) * 40, 22, rgba('#E6D8A8', 0.7), '#C9B896', 1.5); regel(ctx, 'vet', 560, 400, q.on('vet', 1), '#E6D8A8', 28, 'center');
    bloedLijn(ctx, 820, 470, 1500, t); for (let i = 0; i < 8; i++) { const v = (t * 0.3 + i / 8) % 1; hPlus(ctx, lerp(760, 1480, v), 470 + 30 * Math.sin(i * 2), q.on('zure', 1), 15); }
    tag(ctx, 'zure stoffen → bloed verzuurt', 1150, 300, ZUUR, q.on('verzuren', 1)); vraagteken(ctx, 1600, 700, q.on('ademen', 1), 130); },
  s10(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('longen', 1); if (1 - pB > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - pB;
      const nodes = [{ t: 'pH van je bloed', s: 'daalt (zuurder)', rol: 'GEREGELDE WAARDE', col: ZUUR }, { t: 'chemoreceptoren', rol: 'SENSOR', col: HCO }, { t: 'ademcentrum', rol: 'REGELCENTRUM', col: C.goud }, { t: 'ademspieren', s: 'sneller en dieper', rol: 'EFFECTOR', col: '#B36A5E' }];
      kringSchema(ctx, 960, 470, { nodes, rx: 540, ry: 280, bw: 420, bh: 120, arr: [q.on('chemoreceptoren', 1), q.on('ademcentrum', 1), q.on('dieper', 1), q.on('verdwijnt', 1)], minus: q.on('terugkoppeling', 1), pulse: (t / 5) % 1 });
      tag(ctx, 'niet minder ademen, maar meer', 960, 600, C.koraal, q.on('minder', 1) * (1 - q.on('ademcentrum', 1))); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(500 + d * 80, 380, 70, 110, d * 0.1, 0, 6.283); shape(ctx, rgba(LONG, 0.45), lighten(LONG, 0.2), 2); }
      regel(ctx, 'longen: de snelle regelaar', 580, 580, 1, LONG, 34, 'center', 700); regel(ctx, 'meer CO₂ uitademen · binnen minuten', 580, 630, 1, C.text2, 28, 'center');
      const nr = q.on('nieren', 1); nierVorm(ctx, 1290, 380, 1.6, -1, nr); nierVorm(ctx, 1450, 380, 1.6, 1, nr); regel(ctx, 'nieren: de langzame', 1370, 580, nr, C.koraal, 34, 'center', 700); regel(ctx, 'H⁺ in de urine, HCO₃⁻ vasthouden', 1370, 630, q.on('waterstofionen', 1), C.text2, 28, 'center'); regel(ctx, 'uren tot dagen', 1370, 675, q.on('uren', 1), C.text2, 28, 'center');
      tag(ctx, 'Ruuds nieren kunnen dat niet meer → machine', 960, 800, C.koraal, q.on('Ruuds', 1)); ctx.restore(); }
  },
  s11(ctx, t, q) { bg(ctx, 'schema'); ctx.save(); ctx.translate(320, 0);
    const y0 = 260; const ev = q.on('koolzuur', 1);
    const parts = [['CO₂', HCO, 200], ['+', C.text, 290], ['H₂O', DIAL, 370], ['⇌', C.text, 480], ['H₂CO₃', C.text, 600], ['⇌', C.text, 730], ['H⁺', ZUUR, 830], ['+', C.text, 910], ['HCO₃⁻', HCO, 1010]];
    parts.forEach(([s, col, x]) => regel(ctx, s, x, y0 + 14, ev, col, 44, 'center', 700));
    const r = q.on('rechts', 1) * (1 - q.on('links', 1)), l = q.on('links', 1) * (1 - q.on('nierbuisjes', 1));
    arrow(ctx, 300, y0 + 70, 960, y0 + 70, ZUUR, r, 6); regel(ctx, 'meer CO₂ → naar rechts → pH daalt', 630, y0 + 120, r, ZUUR, 30, 'center');
    arrow(ctx, 960, y0 + 70, 300, y0 + 70, DIAL, l, 6); regel(ctx, 'extra H⁺ → naar links → CO₂ uitademen', 630, y0 + 120, l, DIAL, 30, 'center');
    const nb = q.on('nierbuisjes', 1); if (nb > 0.01) { ctx.save(); ctx.globalAlpha *= nb; roundRect(ctx, 300, 470, 300, 300, 20); shape(ctx, rgba(UREUM, 0.15), rgba(UREUM, 0.6), 2); metaText(ctx, 'VOORURINE', 450, 500, UREUM, 'center', 20); cel(ctx, 820, 620, 300, 260, {}); roundRect(ctx, 1040, 470, 300, 300, 20); shape(ctx, rgba(BLD, 0.18), rgba(BLD, 0.6), 2); metaText(ctx, 'BLOED', 1190, 500, BLD, 'center', 20);
      const u = (t * 0.4) % 1; hPlus(ctx, lerp(760, 460, u), 590, 1, 16); arrow(ctx, 660, 560, 560, 560, ZUUR, 1, 4); pil(ctx, 'HCO₃⁻', lerp(880, 1180, u), 660, HCO, 1, 24); arrow(ctx, 980, 700, 1080, 700, HCO, 1, 4); regel(ctx, 'cel van een nierbuisje', 820, 820, 1, C.text2, 26, 'center'); ctx.restore(); }
  ctx.restore(); },
  s12(ctx, t, q) { bg(ctx, 'schema');
    const hd = q.on('hemodialyse', 1), fv = q.on('vezels', 1), po = q.on('Kleine', 2); const pA = 1 - hd;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; nierVorm(ctx, 420, 420, 2.2, -1, 0.5); nierVorm(ctx, 640, 420, 2.2, 1, 0.5); meter(ctx, 530, 560, 220, 0.12, C.koraal, 1, 'nierfunctie', '< 15 %');
      bloedLijn(ctx, 880, 470, 1700, t); const it = [['ureum', UREUM], ['kalium', KAL], ['zuur', ZUUR], ['water', DIAL]]; it.forEach(([w, col], i) => pil(ctx, w, 1000 + i * 180, 400 + (i % 2) * 140, col, q.on('Ureum', 1), 28));
      tag(ctx, 'stoffen hopen zich op in het bloed', 1290, 260, C.koraal, q.on('hopen', 1)); tag(ctx, 'zonder behandeling dodelijk', 1290, 720, C.koraal, q.on('dodelijk', 1)); ctx.restore(); }
    if (hd > 0.01) { ctx.save(); ctx.globalAlpha *= hd * (1 - fv);
      ctx.strokeStyle = rgba(C.mens, 0.8); ctx.lineWidth = 80; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(200, 620); ctx.lineTo(620, 560); ctx.stroke(); regel(ctx, 'arm', 300, 700, 1, C.text2, 28);
      ctx.strokeStyle = BLD; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(560, 540); ctx.bezierCurveTo(700, 300, 950, 300, 1095, 460); ctx.stroke(); arrow(ctx, 1060, 410, 1092, 455, BLD, 1, 6); ctx.strokeStyle = '#D9483E'; ctx.beginPath(); ctx.moveTo(1505, 460); ctx.bezierCurveTo(1650, 760, 800, 800, 500, 580); ctx.stroke(); arrow(ctx, 560, 640, 505, 585, '#D9483E', 1, 6);
      filterBuis(ctx, 1300, 460, 420, 160, t, q.on('filter', 1)); regel(ctx, 'filter', 1300, 600, q.on('filter', 1), C.text, 30, 'center', 700);
      naamBij(ctx, 'shunt', 'slagader aan ader', 488, 500, q.on('shunt', 1), 'right', C.koraal);
      ctx.restore(); }
    if (fv > 0.01) { ctx.save(); ctx.globalAlpha *= fv * (1 - po); circ(ctx, 700, 470, 260, rgba(DIAL, 0.15), '#E6E1D3', 3); for (let i = 0; i < 19; i++) { const an = i * 2.4, rr = Math.sqrt(i / 19) * 210; circ(ctx, 700 + Math.cos(an) * rr, 470 + Math.sin(an) * rr, 26, rgba(BLD, 0.6), VLIES, 2); } metaText(ctx, 'DOORSNEDE FILTER', 700, 180, C.grain, 'center', 22);
      naamBij(ctx, 'holle vezel met bloed', 'wand vol kleine poriën', 985, 430, 1, 'left', BLD); naamBij(ctx, 'dialysevloeistof', 'om de vezels heen', 985, 600, q.on('dialysevloeistof', 1), 'left', DIAL); ctx.restore(); }
    if (po > 0.01) { ctx.save(); ctx.globalAlpha *= po; membraan(ctx, 960, 480, 1000, 600, { t, flow: 0 });
      const u = (t * 0.25) % 1; ureumD(ctx, lerp(560, 1360, u), 280, 10); glucD(ctx, lerp(560, 1360, (u + 0.5) % 1), 370, 13); glucD(ctx, lerp(1360, 560, (u + 0.25) % 1), 420, 13); regel(ctx, 'ureum, zouten, glucose: erdoor (beide kanten op)', 960, 230, 1, GLUC, 30, 'center');
      rbcD(ctx, 860, 540, 34, q.on('Bloedcellen', 1)); eiwitD(ctx, 860, 660, 1.6, q.on('eiwitten', 1)); regel(ctx, 'bloedcellen, grote eiwitten: niet', 600, 760, q.on('Bloedcellen', 1), C.koraal, 30);  ctx.restore(); }
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const X = 1060, Y0 = 240; membraan(ctx, X, 470, 900, 640, { t, flow: q.on('ververst', 1) });
    metaText(ctx, 'diffusie: van hoog naar laag', X, 92, C.goud, 'center', 24);
    tag(ctx, 'de machine pompt; door het vlies gaat het vanzelf', 960, 870, C.goud, q.on('pompt', 1) * (1 - q.on('dialysevloeistof', 1)));
    const gw = q.on('gewoon', 1) * (1 - q.on('Daarom', 1));
    concRij(ctx, X, Y0, 'ureum', 9, 0, 1, UREUM, q.on('diffusie', 1), t);
    concRij(ctx, X, Y0 + 110, 'glucose', 5, gw > 0.5 ? 0 : 5, gw > 0.5 ? 1 : 0, GLUC, q.on('gewoon', 1), t);
    concRij(ctx, X, Y0 + 220, 'natrium', 7, gw > 0.5 ? 0 : 7, gw > 0.5 ? 1 : 0, NA, q.on('gewoon', 1), t);
    concRij(ctx, X, Y0 + 330, 'kalium', 6, 2, 1, KAL, q.on('Kalium', 1), t);
    concRij(ctx, X, Y0 + 440, 'waterstofcarbonaat', 5, 8, -1, HCO, q.on('waterstofcarbonaat', 1), t);
    tag(ctx, 'als het gewoon water was: glucose en zouten weg', 1060, 870, C.koraal, gw);
    tag(ctx, 'antwoord a: ureum eruit, glucose blijft', 1060, 870, C.goud, q.on('antwoord', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const uf = q.on('teveel', 1); if (1 - uf > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - uf;
      roundRect(ctx, 420, 300, 200, 340, 20); shape(ctx, rgba(DIAL, 0.12), '#C9D2DE', 3); ctx.fillStyle = rgba(DIAL, 0.5); ctx.fillRect(424, 300 + 340 * (1 - 0.5), 192, 340 * 0.5 - 4); regel(ctx, 'drinken: ½ tot 1 liter per dag', 520, 700, q.on('drinken', 1), DIAL, 30, 'center', 700);
      regel(ctx, 'urine: bijna niets', 1100, 330, q.on('urine', 1), UREUM, 32); regel(ctx, 'adem en huid: een beetje', 1100, 420, q.on('huid', 1), C.text2, 32); regel(ctx, 'de rest blijft tot de volgende dialyse', 1100, 510, q.on('rest', 1), C.koraal, 32); ctx.restore(); }
    if (uf > 0.01) { ctx.save(); ctx.globalAlpha *= uf; membraan(ctx, 960, 470, 900, 500, { t, flow: 0 });
      for (let i = 0; i < 3; i++) arrow(ctx, 560, 330 + i * 140, 700, 330 + i * 140, C.goud, q.on('drukverschil', 1), 6); regel(ctx, 'hogere druk', 560, 300, q.on('drukverschil', 1), C.goud, 28);
      for (let i = 0; i < 8; i++) { const v = (t * 0.35 + i / 8) % 1; circ(ctx, lerp(760, 1300, v), 280 + hash(i) * 380, 8, rgba(DIAL, 0.9 * (1 - v * 0.5))); }
      tag(ctx, 'ultrafiltratie: water door het vlies geperst', 960, 130, DIAL, q.on('ultrafiltratie', 1)); tag(ctx, 'net als bij het nefron (Water in balans)', 960, 830, C.text2, q.on('voorurine', 1)); ctx.restore(); }
  },
  s15(ctx, t, q) { bg(ctx, 'schema'); const a2 = q.on('tegen', 1);
    filterBuis(ctx, 600, 400, 520, 150, t, 1, { tegen: 0 }); regel(ctx, 'dezelfde kant op', 600, 560, 1, C.text, 32, 'center', 700);
    filterBuis(ctx, 1320, 400, 520, 150, t, a2, { tegen: 1 }); regel(ctx, 'tegen elkaar in', 1320, 560, a2, C.text, 32, 'center', 700);
    regel(ctx, '— bloed', 760, 720, 1, BLD, 28); regel(ctx, '— dialysevloeistof', 1000, 720, 1, DIAL, 28); vraagteken(ctx, 960, 420, q.on('denk', 1), 120); },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const pe = q.on('peritoneale', 1); const pA = 1 - pe; const X = 420, Y = 230, Wg = 1000, Hg = 420;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const mee = q.on('dezelfde', 1);
      const fb = x => mee > 0.5 ? 9.4 + (25 - 9.4) * Math.exp(-x * 2.8) : 25 - 17 * x; const fv = x => mee > 0.5 ? 9.4 * (1 - Math.exp(-x * 2.8)) : 10.2 * (1 - x);
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 1, ymax: 28, f: fb, xticks: [], yticks: [], xlab: 'plaats in de filter', ylab: 'ureum (mmol/L)', col: BLD });
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 1, ymax: 28, f: fv, xticks: [], yticks: [], col: DIAL });
      regel(ctx, mee > 0.5 ? 'meestroom: verschil verdwijnt' : 'tegenstroom: overal een verschil', X + Wg / 2, Y + 40, 1, mee > 0.5 ? C.koraal : C.groen, 32, 'center', 700);
      regel(ctx, 'bloed →', X + Wg + 30, Y + 80, 1, BLD, 30); regel(ctx, mee > 0.5 ? 'vloeistof →' : '← vloeistof', X + Wg + 30, Y + 130, 1, DIAL, 30);
      if (mee < 0.5) for (let i = 0; i < 4; i++) { const x = 0.15 + i * 0.23; arrow(ctx, X + x * Wg, Y + Hg - fb(x) / 28 * Hg + 10, X + x * Wg, Y + Hg - fv(x) / 28 * Hg - 10, C.goud, q.on('lengte', 1), 3); }
      tag(ctx, 'hetzelfde trucje: kieuwen van een vis', 960, 830, C.text2, q.on('kieuwen', 1)); ctx.restore(); }
    if (pe > 0.01) { ctx.save(); ctx.globalAlpha *= pe; lichaam(ctx, 620, 540, 0.85, 1, { darm: 0 }); ctx.beginPath(); ctx.ellipse(620, 640, 170, 120, 0, 0, 6.283); shape(ctx, rgba(DIAL, 0.35 * q.on('buikholte', 1) + 0.05), rgba(DIAL, 0.8), 2); naamBij(ctx, 'buikvlies als vlies', 'buikholte met dialysevloeistof', 845, 630, q.on('buikvlies', 1), 'left', DIAL);
      ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(700, 720); ctx.quadraticCurveTo(820, 820, 1000, 800); ctx.stroke(); regel(ctx, 'slangetje', 1010, 810, q.on('slangetje', 1), C.text2, 26);
      const os = q.on('osmose', 1); for (let i = 0; i < 5; i++) { const v = (t * 0.4 + i / 5) % 1; circ(ctx, 620 + Math.cos(i * 1.3) * lerp(240, 140, v), 640 + Math.sin(i * 1.3) * lerp(180, 100, v), 7, rgba(DIAL, os * (1 - v * 0.4))); }
      tag(ctx, 'veel glucose → water door osmose uit het bloed', 1300, 300, GLUC, q.on('glucose', 1));  ctx.restore(); }
  },
  s18(ctx, t, q) { bg(ctx, 'schema'); nierVorm(ctx, 960, 420, 3, 1, 1); regel(ctx, 'nieuwe nier', 960, 620, 1, C.text, 34, 'center', 700);
    tag(ctx, 'met één goede nier leef je normaal', 960, 140, C.groen, q.on('één', 1)); vraagteken(ctx, 1400, 520, q.on('Wie', 1), 130); },
  s20(ctx, t, q) { bg(ctx, 'micro');
    const af = q.on('afstoting', 1) * (1 - q.on('medicijnen', 1)), fam = q.on('familie', 1);
    cel(ctx, 260, 480, 200, 150, {}); for (let k = 0; k < 4; k++) circ(ctx, 190 + k * 46, 400, 10, C.goud); regel(ctx, 'jouw cel', 260, 600, 1, C.text, 28, 'center', 700);
    for (let i = 0; i < 3; i++) { const x = 640 + i * 240; cel(ctx, x, 480, 200, 150, {}); for (let k = 0; k < 4; k++) { const px = x - 70 + k * 46; const vorm = fam > 0.5 && k !== i ? 0 : (i + k + 1) % 3; ctx.fillStyle = [C.goud, C.koraal, C.paars][vorm]; ctx.beginPath(); if (vorm === 0) ctx.arc(px, 400, 10, 0, 6.283); else if (vorm === 1) ctx.rect(px - 9, 391, 18, 18); else { ctx.moveTo(px, 389); ctx.lineTo(px + 10, 409); ctx.lineTo(px - 10, 409); ctx.closePath(); } ctx.fill(); } } regel(ctx, 'donornier', 880, 600, 1, C.text, 28, 'center', 700);
    const aw = q.on('afweer', 1); const ax = lerp(1600, 1300, ramp(t, q.at('valt'), 2) * (1 - 0.6 * q.on('familie', 1)) * (1 - q.on('medicijnen', 1))); circ(ctx, ax, 480, 70, rgba('#E6E1D3', 0.3 * aw), rgba('#E6E1D3', aw), 3); regel(ctx, 'afweercel', ax, 590, aw, C.text, 28, 'center');
    label(ctx, 'eiwitten op de cellen', 'vreemd voor jouw afweer', 710, 400, 780, 250, q.on('eiwitten', 1), C.goud, 'left');
    tag(ctx, 'afstoting', 1450, 260, C.koraal, af); tag(ctx, 'familie: eiwitten lijken vaker op die van jou', 960, 780, C.groen, fam * (1 - q.on('medicijnen', 1)));
    tag(ctx, 'afweerremmers: levenslang · wel sneller infecties', 960, 780, C.goud, q.on('medicijnen', 1));
  },
  s21(ctx, t, q) { dialyseKamer(ctx, t);
    const ch = [['diffusie: van hoog naar laag', 'diffunderen', 1, C.goud], ['geen ureum in de vloeistof → ureum eruit', 'geen', 2, UREUM], ['glucose even veel → glucose blijft', 'Glucose', 2, GLUC], ['waterstofcarbonaat → minder zuur', 'waterstofcarbonaat', 1, HCO]];
    ctx.fillStyle = rgba('#0B0F16', 0.45 * q.on('Stoffen', 1)); ctx.fillRect(0, 0, W, H);
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1480, 600 + i * 75, col, q.on(w, n), 'center'));
  },
};
function bloedLijn(ctx, x0, y, x1, t) { ctx.save(); ctx.strokeStyle = rgba(BLD, 0.35); ctx.lineWidth = 60; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); for (let i = 0; i < 5; i++) { const v = (t * 0.2 + i / 5) % 1; rbcD(ctx, lerp(x0, x1, v), y, 16, 0.8); } ctx.restore(); }
function meter(ctx, x, y, h, v, col, a = 1, lab = '', sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y, 52, h, 12); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); ctx.fillStyle = rgba(col, 0.2); ctx.fillRect(x - 22, y + h * 0.4, 44, h * 0.2); const hh = (h - 8) * clamp(v, 0, 1); roundRect(ctx, x - 22, y + h - 4 - hh, 44, hh, 9); ctx.fillStyle = rgba(col, 0.8); ctx.fill(); if (lab) text(ctx, lab, x, y + h + 40, fTekst(26, 600), C.text, 'center'); if (sub) text(ctx, sub, x, y + h + 76, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function phSchaal(ctx, x, y, w, o = {}) { const { band = 1, zuur = 0 } = o; const lo = 6.9, hi = 7.9; const X = v => x + (v - lo) / (hi - lo) * w;
  const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, rgba(ZUUR, 0.8)); g.addColorStop(0.1, rgba(GLUC, 0.6)); g.addColorStop(1, rgba(DIAL, 0.8)); roundRect(ctx, x, y, w, 60, 30); ctx.fillStyle = g; ctx.fill();
  for (let v = 7.0; v <= 7.81; v += 0.2) { text(ctx, v.toFixed(1).replace('.', ','), X(v), y + 110, fTekst(30), C.text2, 'center'); }
  ctx.save(); ctx.globalAlpha *= band; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.strokeRect(X(7.35), y - 20, X(7.45) - X(7.35), 100); text(ctx, '7,35 – 7,45', X(7.4), y - 40, fTitel(44), C.text, 'center'); ctx.restore();
  if (zuur > 0.01) { arrow(ctx, X(7.3), y + 170, X(7.0), y + 170, ZUUR, zuur, 6); regel(ctx, 'zuurder = lagere pH', X(7.15), y + 220, zuur, C.text, 30, 'center', 700); } regel(ctx, 'pH van je bloed', x, y - 70, 1, C.grain, 28, 'left', 600); regel(ctx, '7,0 = neutraal', X(7.0), y + 150, 1, C.text2, 24, 'center'); }

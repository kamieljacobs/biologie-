// Film 1 · Wat zit er in je eten? — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken ----------
const FOODS_L = ['vlees', 'kaas', 'melk'], FOODS_R = ['brood', 'bonen', 'tofu'];
function twoStudents(ctx, t, o = {}) {
  const { a = 1, aL = 1, aR = 1, foodsL = 1, foodsR = 1, tagL = 1, tagR = 1, hlR = 0, y = 880 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  // links: vleeseter
  ctx.save(); ctx.globalAlpha *= aL; persoon(ctx, 'sam', 520, y, 330, { uit: 'blij', kijk: 1, t }); ctx.restore();
  FOODS_L.forEach((f, i) => foodIcon(ctx, f, 300 + i * 140, 360, 1, foodsL * aL));
  plateLine(ctx, 220, 760, 410, foodsL * aL);
  ctx.save(); ctx.globalAlpha *= tagL * aL; text(ctx, 'eet vlees, kaas en melk', 520, 270, fTekst(36, 600), C.text, 'center'); metaText(ctx, '60 g eiwit per dag', 520, 455, C.grain, 'center', 28); ctx.restore();
  // rechts: vegan
  ctx.save(); ctx.globalAlpha *= aR; persoon(ctx, 'noor', 1400, y, 330, { uit: hlR > 0.5 ? 'denkt' : 'neutraal', kijk: -1, t }); if (hlR > 0) { ctx.strokeStyle = rgba(C.goud, hlR); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(1400, y - 170, 215, 0, 6.283); ctx.stroke(); } ctx.restore();
  FOODS_R.forEach((f, i) => foodIcon(ctx, f, 1180 + i * 140, 360, 1, foodsR * aR));
  plateLine(ctx, 1100, 1640, 410, foodsR * aR);
  ctx.save(); ctx.globalAlpha *= tagR * aR; text(ctx, 'vegan: alleen plantaardig', 1400, 270, fTekst(36, 600), C.text, 'center'); metaText(ctx, '60 g eiwit per dag', 1400, 455, C.grain, 'center', 28); ctx.restore();
  ctx.restore();
}
// Micro-mengsel van moleculen in een cirkel; hl = index van de groep die oplicht (0..6; 6 = vezels); null = alles
const SOUP = (() => { const a = []; const types = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6]; types.forEach((ty, i) => a.push({ ty, x: (hash(i * 7 + 1) * 2 - 1) * 0.7, y: (hash(i * 7 + 2) * 2 - 1) * 0.7, rot: hash(i * 7 + 3) * 6.28 })); return a; })();
const SOUP_EIWIT = Array.from({ length: 30 }, (_, i) => Math.floor(hash(i * 13 + 5) * 20));
const SOUP_EIWIT_PAD = [[-30, -12], [-19, -21], [-6, -17], [0, -5], [-11, 5], [-24, 9], [-29, 22], [-15, 30], [0, 27], [13, 19], [17, 6], [12, -7]];
function soup(ctx, cx, cy, r, t, hl = null, s = 1) {
  ctx.save(); ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  SOUP.forEach((m, i) => { const w = wander(i + 200, t, 14, 0.35); const x = cx + m.x * r + w.x, y = cy + m.y * r + w.y; const on = hl === null || hl === m.ty || (Array.isArray(hl) && hl.includes(m.ty));
    ctx.save(); ctx.globalAlpha *= on ? 1 : 0.3; ctx.translate(x, y); ctx.rotate(m.rot * 0.2); ctx.translate(-x, -y);
    if (m.ty === 0) zetmeelSpiraal(ctx, x - 36 * s, y, 8, 10 * s, { t });
    else if (m.ty === 1) proteinChain(ctx, SOUP_EIWIT_PAD.map(p => [x + p[0] * 1.5 * s, y + p[1] * 1.5 * s]), SOUP_EIWIT, 6.5 * s); // klein gevouwen eiwit: haarspeld + bocht
    else if (m.ty === 2) triglyceride(ctx, x - 40 * s, y, 0.55 * s);
    else if (m.ty === 3) waterMol(ctx, x, y, 8 * s);
    else if (m.ty === 4) mineral(ctx, x, y, 8 * s);
    else if (m.ty === 5) vitamin(ctx, x, y, 10 * s);
    else fiber(ctx, x - 60 * s, y, 6, 10 * s);
    ctx.restore(); });
  ctx.restore();
}
function getGrain() { if (!grainCanvas) { const c = document.createElement('canvas'); c.width = 4; c.height = 4; grain(c.getContext('2d')); } return grainCanvas; }
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 1.2); text(ctx, txt, x + 30, y + 40, fTekst(36, 600), C.goud); ctx.restore(); }
function verdiepingTag(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'verdieping', W - 60, 46, C.goud, 'right', 28); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
// darm als wand met lagen (lib_bio darmwand) + holte; vervangt darmBuis
function darmWandBuis(ctx, x0, x1, yc, r, squeeze = () => 0, alpha = 1, lab = null, dikte = 40, t = 0) { if (alpha <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = lerp(x0, x1, i / 60); ctx.lineTo(x, yc - r * (1 - 0.62 * clamp(squeeze(x), 0, 1))); } for (let i = 60; i >= 0; i--) { const x = lerp(x0, x1, i / 60); ctx.lineTo(x, yc + r * (1 - 0.62 * clamp(squeeze(x), 0, 1))); } ctx.closePath(); ctx.fillStyle = rgba('#3A2A2A', 0.45); ctx.fill(); ctx.restore();
  darmwand(ctx, x0, x1, yc, r, squeeze, { a: alpha, dikte, t });
  if (lab) { ctx.save(); ctx.globalAlpha *= alpha; metaText(ctx, lab, x0, yc - r - dikte - 18, C.grain, 'left', 28); ctx.restore(); } }
// v1.1b: symbool per functie van een additief (kleur, smaak, geur, houdbaar)
function additiefIcoon(ctx, i, x, y, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(1.3, 1.3); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (i === 0) { [['#E07A5F', -9, 5], ['#E0B64A', 9, 5], ['#5BA4C9', 0, -9]].forEach(([c, dx, dy]) => { ctx.beginPath(); ctx.arc(dx, dy, 13, 0, 6.283); ctx.fillStyle = rgba(c, 0.8); ctx.fill(); }); }
  else if (i === 1) { ctx.beginPath(); ctx.moveTo(-14, -12); ctx.lineTo(14, -12); ctx.lineTo(14, 4); ctx.quadraticCurveTo(14, 20, 0, 20); ctx.quadraticCurveTo(-14, 20, -14, 4); ctx.closePath(); shape(ctx, '#E08A8A', '#F2B0A8', 2); ctx.strokeStyle = '#B5574A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 10); ctx.stroke(); }
  else if (i === 2) { ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-10, -20); ctx.quadraticCurveTo(-4, 0, -16, 12); ctx.quadraticCurveTo(-6, 18, 2, 12); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let j = 0; j <= 10; j++) { const u = j / 10; const px = 6 + u * 18, py = -12 + k * 10 + Math.sin(u * 6.283 + t * 3 + k) * 3; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } }
  else { ctx.strokeStyle = C.text; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-12, -20); ctx.lineTo(12, -20); ctx.moveTo(-12, 20); ctx.lineTo(12, 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-10, -20); ctx.quadraticCurveTo(-10, -4, 0, 0); ctx.quadraticCurveTo(10, -4, 10, -20); ctx.moveTo(-10, 20); ctx.quadraticCurveTo(-10, 4, 0, 0); ctx.quadraticCurveTo(10, 4, 10, 20); ctx.stroke(); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(-7, 18); ctx.quadraticCurveTo(0, 8, 7, 18); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-5, -14); ctx.lineTo(5, -14); ctx.lineTo(0, -6); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// v1.1b: darminhoud als brij. Veel vezels: groot, nat, vult de holte; weinig vezels: kleine, droge brokjes
function darmBrij(ctx, x0, x1, yc, r, sq, o = {}) { const { a = 1, nat = 1, vol = 1, t = 0, schuif = 0, vezels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ri = (x) => r * (1 - 0.62 * clamp(sq(x), 0, 1));
  ctx.save(); ctx.beginPath(); for (let i = 0; i <= 120; i++) { const x = lerp(x0, x1, i / 120); ctx.lineTo(x, yc - ri(x) + 2); } for (let i = 120; i >= 0; i--) { const x = lerp(x0, x1, i / 120); ctx.lineTo(x, yc + ri(x) - 2); } ctx.closePath(); ctx.clip();
  const kleur = nat > 0.5 ? '#9A8A52' : '#5E4A30', rand = nat > 0.5 ? '#C2B27A' : '#3E2E1E';
  if (nat > 0.5) { // één samenhangende, natte brij die de holte vult
    ctx.beginPath(); for (let i = 0; i <= 120; i++) { const x = lerp(x0, x1, i / 120); ctx.lineTo(x, yc - ri(x) * (0.55 + 0.33 * vol) + Math.sin(x * 0.02 + t) * 4); } for (let i = 120; i >= 0; i--) { const x = lerp(x0, x1, i / 120); ctx.lineTo(x, yc + ri(x) * (0.55 + 0.33 * vol) + Math.sin(x * 0.025 - t) * 4); } ctx.closePath(); shape(ctx, rgba(kleur, 0.85), rgba(rand, 0.6), 2);
    for (let k = 0; k < 26; k++) { const x = x0 + ((schuif + k * 67) % (x1 - x0)), yy = yc + (hash(k + 3) * 2 - 1) * ri(x) * 0.6; ctx.beginPath(); ctx.arc(x, yy, 3 + 3 * hash(k), 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.55 * vol); ctx.fill(); }
    ctx.fillStyle = rgba('#F2E6C0', 0.18); for (let k = 0; k < 8; k++) { const x = x0 + ((schuif + k * 211) % (x1 - x0)); ctx.beginPath(); ctx.ellipse(x, yc - ri(x) * 0.45, 30, 5, 0, 0, 6.283); ctx.fill(); }
  } else { // losse, droge brokjes met barstjes
    for (let k = 0; k < 8; k++) { const x = x0 + ((schuif + k * 210) % (x1 - x0)), rr = ri(x) * (0.55 + 0.15 * hash(k + 1)); ctx.beginPath(); for (let j = 0; j <= 16; j++) { const an = j / 16 * 6.283, w = 1 + 0.12 * Math.sin(an * 3 + k); ctx.lineTo(x + Math.cos(an) * rr * 1.3 * w, yc + Math.sin(an) * rr * w); } ctx.closePath(); shape(ctx, rgba(kleur, 0.95), rgba(rand, 0.9), 1.5);
      ctx.strokeStyle = rgba('#2A1E14', 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - rr * 0.6, yc - rr * 0.2); ctx.lineTo(x - rr * 0.1, yc + rr * 0.1); ctx.lineTo(x + rr * 0.3, yc - rr * 0.3); ctx.stroke(); }
  }
  for (let k = 0; k < Math.round(6 * vezels); k++) { const x = x0 + ((schuif * 1.0 + k * 271 + 40) % (x1 - x0)); celluloseBundel(ctx, x, yc + (hash(k + 30) * 2 - 1) * ri(x) * 0.35, 3, 7, { ketens: 2, a: 0.9 }); }
  ctx.restore(); ctx.restore(); }
function bigLine(ctx, s, x, y, a = 1, color = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, 600), color, align); ctx.restore(); }

const SCENES = {
  title(ctx, t) { broodje(ctx, 1400, 600, 1.6); glasMelk(ctx, 1700, 690, 1.2); plateLine(ctx, 1150, 1820, 692); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    twoStudents(ctx, t, { aL: ramp(t, 0, 0.6), aR: ramp(t, 0.3, 0.6), foodsL: q.on('vlees'), foodsR: q.on('vegan'), tagL: q.on('vlees'), tagR: q.on('plantaardig'), hlR: q.on('advies') * (1 - q.on('Waarom')) });
    const a = q.on('advies');
    if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1520, 520, 360, 120, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); ctx.font = fTekst(36, 600); ctx.fillStyle = C.text; wrap(ctx, 'Let extra goed op je eiwit!', 1544, 568, 320, 42); ctx.restore(); }
    bigLine(ctx, 'Waarom, als het er genoeg is?', W / 2, 160, q.on('Waarom'), C.goud, 48);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const z = q.on('Zoom', 1, 1.0);
    broodje(ctx, 560, 620, 1.5); glasMelk(ctx, 900, 700, 1.1); plateLine(ctx, 320, 1040, 702);
    label(ctx, 'broodje kaas', null, 480, 500, 380, 300, ramp(t, 0.6, 0.6) * (1 - z * 0.6));
    label(ctx, 'glas melk', null, 900, 560, 1000, 300, ramp(t, 1.4, 0.6) * (1 - z * 0.6));
    if (z > 0.01) zoomCircle(ctx, 1420, 460, 300 * (0.4 + 0.6 * z), 600, 560, 'moleculen · vergroot', z, () => soup(ctx, 1420, 460, 300, t, null, 1.5));
    if (q.on('moleculen') > 0) metaText(ctx, 'schematisch · niet op schaal', W - 40, CAPTION_Y - 16, C.text2, 'right', 28);
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const cues = ['Koolhydraten', 'Eiwitten', 'Vetten', 'water', 'mineralen', 'vitaminen'];
    const lit = cues.map(c => q.on(c));
    groepenBord(ctx, 60, 90, 1800, lit, ramp(t, 0, 0.5));
    const idx = lit.reduce((m, v, i) => v > 0.5 ? i : m, -1);
    const vz = q.on('voedingsvezels');
    const hl = vz > 0.5 ? 6 : (idx >= 0 ? (idx >= 3 ? [3, 4, 5].slice(0, idx - 2) : idx) : null);
    zoomCircle(ctx, 760, 560, 270, 760, 560, 'een hap broodje kaas · vergroot', 1, () => soup(ctx, 760, 560, 270, t, hl, 1.4));
    // waar zit het in?
    const where = [['zetmeel in brood', 'melksuiker in melk'], ['kaas, melk, brood'], ['vooral kaas']];
    if (idx >= 0 && idx <= 2 && vz < 0.5) { ctx.save(); ctx.globalAlpha *= lit[idx]; where[idx].forEach((w, i) => text(ctx, w, 1100, 470 + i * 56, fTekst(40, 600), C.text)); metaText(ctx, GROEPEN[idx], 1100, 420, C.grain, 'left', 28); ctx.restore(); }
    if (vz > 0.01) { ctx.save(); ctx.globalAlpha *= vz; fiber(ctx, 1110, 520, 7, 13); text(ctx, 'voedingsvezels', 1100, 600, fTekst(44, 600), C.groen); metaText(ctx, 'niet verteerd · hoofdstuk 4', 1100, 645, C.grain, 'left', 28); ctx.restore(); }
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    groepenBord(ctx, 60, 90, 1800, [1, 1, 1, 1, 1, 1], 0.6);
    const cues = ['Bouwstof', 'Brandstof', 'Reservestof', 'Regelstof'];
    takenRij(ctx, 60, 380, 1800, cues.map(c => q.on(c)), q.on('vier'));
    // voorbeeld onder de taak die nu genoemd wordt
    const ex = ['spieren, botten, enzymen', 'energie voor alles wat je doet', 'voor later: vet, glycogeen', 'stofwisseling op gang houden'];
    cues.forEach((c, i) => { const a = q.on(c) * (i < 3 ? 1 - q.on(cues[i + 1]) : 1); bigLine(ctx, ex[i], 60 + i * 454.5 + 216, 620, a, TAAK_KLEUR[i], 32); arrow(ctx, 60 + i * 454.5 + 216, 510, 60 + i * 454.5 + 216, 570, TAAK_KLEUR[i], a); });
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    groepenBord(ctx, 60, 90, 1800, [0, 0, 0, q.on('Water'), Math.max(q.on('Calcium'), q.on('mineralen')), q.on('Vitaminen')], 1);
    takenRij(ctx, 60, 470, 1800, [Math.max(q.on('Calcium'), q.on('enzymen')), 0, 0, q.on('regelen')], 1);
    const gx = i => 60 + i * (1800 - 70) / 6 + i * 14 + (1800 - 70) / 12, tx = i => 60 + i * (1800 - 54) / 4 + i * 18 + (1800 - 54) / 8;
    // calcium (mineralen) → bouwstof; water → bouwstof; vitaminen/mineralen → regelstof
    arrow(ctx, gx(4), 245, tx(0) + 60, 465, V.neutraal, q.on('Calcium') * (1 - q.on('Vitaminen') * 0.6), 2);
    arrow(ctx, gx(3), 245, tx(0) + 100, 465, C.teal, q.on('Water') * (1 - q.on('Vitaminen') * 0.6), 2);
    arrow(ctx, gx(5), 245, tx(3), 465, C.teal, q.on('regelen'), 2); arrow(ctx, gx(4), 245, tx(3) - 40, 465, C.teal, q.on('regelen'), 2);
    if (q.on('Calcium') > 0.01) bigLine(ctx, 'calcium → botten', tx(0), 660, q.on('Calcium') * (1 - q.on('Water')), C.text, 34);
    // lichaam voor meer dan de helft water
    const wa = q.on('helft'); if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; persoon(ctx, 'noor', 1720, 880, 260, { uit: 'blij', t }); { const f = 0.6 * ramp(t, q.at('helft'), 1.2); roundRect(ctx, 1590, 624, 36, 256, 18); shape(ctx, rgba(C.teal, 0.12), rgba(C.teal, 0.8), 2); ctx.save(); roundRect(ctx, 1590, 624, 36, 256, 18); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(1590, 880 - 256 * f, 36, 256 * f); ctx.restore(); } text(ctx, 'ruim 50% water', 1460, 760, fTekst(36, 600), C.teal, 'center'); ctx.restore(); }
    // vraag: nieuwe eiwitten
    const qa = q.on('enzymen'); if (qa > 0.01) { ctx.save(); ctx.globalAlpha *= qa; text(ctx, 'nieuwe enzymen en spiereiwit: bouwstenen uit …?', 60, 700, fTekst(40, 600), C.goud); ctx.restore(); }
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    groepenBord(ctx, 60, 90, 1800, [0, 1, 0, 0, 0, 0], 1);
    takenRij(ctx, 60, 470, 1800, [1, 0, 0, 0], 1);
    arrow(ctx, 60 + 1 * 291.7 + 145, 245, 276, 465, C.goud, ramp(t, 0.2, 0.6), 2.5);
    haak(ctx, 60, 1860, 610, 'alleen eiwit levert de bouwstenen voor nieuw eiwit', C.groen, q.on('Alleen'));
  },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'micro');
    const cut = q.on('knipt', 1, 1.2), go = q.on('cellen', 1, 2.5), burn = q.on('verbrand', 1, 1);
    // een ronde cel rechts, deels in beeld, met dubbele membraan
    celRond(ctx, 2260, 500, 600, { t, s: 1.4, a0: Math.PI * 0.62, a1: Math.PI * 1.38, a: 0.95 });
    naamBij(ctx, 'cel', null, 1790, 190, q.on('cellen'), 'center');
    const n = 18, r = 34, x0 = 150, y0 = 470;
    // zetmeel = spiraal van glucose; knippen = afwikkelen (open) en dan los
    const open = clamp(cut * 2, 0, 1), los = clamp(cut * 2 - 1, 0, 1);
    ctx.save(); if (go > 0.01) ctx.globalAlpha = 0;
    const P = zetmeelSpiraal(ctx, x0, y0, n, r, { open, los, t, spreid: 0.55 });
    ctx.restore();
    naamBij(ctx, 'zetmeel', 'spiraal van glucose', x0 + 190, y0 - 120, Math.max(q.on('Zetmeel'), ramp(t, 0.5, 0.6)) * (1 - cut), 'center');
    if (go > 0.01) { for (let i = 0; i < n; i++) { const w = wander(i + 400, t, 30, 0.6); const u = ease(go * 1.1 - i * 0.04); const x = lerp(P[i][0], 1780 + (i % 4) * 34, u) + w.x * 0.5 * u, y = lerp(P[i][1], 300 + i * 46, u) + w.y * 0.5 * u; hexagon(ctx, x, y, r, V.kh, lighten(V.kh, 0.35)); } }
    if (cut > 0.3 && go < 0.3) naamBij(ctx, 'glucose', 'losse suikers', 760, 300, clamp((cut - 0.3) * 2, 0, 1) * (1 - go * 3), 'center');
    if (burn > 0.01) { for (let k = 0; k < 14; k++) { const a = hash(k * 3) * 6.283, d = (t - q.at('verbrand')) * 60 * (0.6 + hash(k) * 0.8) % 140; ctx.save(); ctx.globalAlpha = burn * (1 - d / 140); ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(1820 + Math.cos(a) * d, 500 + Math.sin(a) * d, 5, 0, 6.283); ctx.fill(); ctx.restore(); } bigLine(ctx, 'energie', 1640, 780, burn, C.koraal, 40); }
    refCard(ctx, '→ film Dissimilatie', 60, 790, q.on('dissimilatie'));
    metaText(ctx, 'schematisch · niet op schaal', W - 40, CAPTION_Y - 16, C.text2, 'right', 28);
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const b = q.on('koolhydraat', 1, 1.2), v = q.on('zevenendertig', 1, 1.2), why = q.on('Waarom', 1, 0.8);
    const sx = 1 - why * 0.0;
    axisBase(ctx, 120, 860, 760); metaText(ctx, 'energie per gram (kJ)', 120, 120, C.grain, 'left', 28);
    bar(ctx, 220, 760, 200, 560, 17, 40, V.kh, 'koolhydraat', '17', b);
    bar(ctx, 560, 760, 200, 560, 37, 40, V.vt, 'vet', '37', v);
    if (q.on('Ruim') > 0.01) haak(ctx, 220, 760, 150, 'ruim 2×', C.koraal, q.on('Ruim')); // boven: let op, de schaal: haak onder titel
    // verdieping: atomen
    verdiepingTag(ctx, why);
    if (why > 0.01) { ctx.save(); ctx.globalAlpha *= why;
      const atoms = (x, y, nC, nH, nO, title, aO) => { text(ctx, title, x, y - 30, fTekst(36, 600), C.text);
        const row = (n, col, r, yy, lab) => { for (let i = 0; i < n; i++) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + 14 + (i % 16) * 26, yy + Math.floor(i / 16) * 26, r, 0, 6.283); ctx.fill(); } metaText(ctx, lab, x + 440, yy + 8, C.grain, 'left', 28); };
        row(nC, '#8C96A8', 9, y + 20, nC + ' C'); row(nH, C.text, 6, y + 70, nH + ' H'); ctx.save(); ctx.globalAlpha *= aO; row(nO, C.teal, 9, y + 120 + (nH > 16 ? 26 : 0), nO + ' O'); ctx.restore(); };
      atoms(930, 260, 6, 12, 6, 'glucose', 1);
      atoms(930, 580, 16, 32, 2, 'vetzuur', 1);
      const z = q.on('zuurstofatomen'); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.teal; ctx.lineWidth = 1.5; roundRect(ctx, 990, 360, 200, 40, 10); ctx.stroke(); ctx.restore(); }
      naamBij(ctx, 'al veel zuurstof', 'al deels geoxideerd', 1475, 392, q.on('half'), 'left');
      naamBij(ctx, 'bijna alleen C en H', 'nog veel te oxideren', 1475, 618, q.on('koolstof'), 'left');
      ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    const g = q.on('glycogeen'), f = q.on('meeste'), bird = q.on('trekvogel', 1, 1);
    const fade = 1 - bird * 0.5;
    ctx.save(); ctx.globalAlpha *= fade;
    // glycogeen in lever en spieren
    ctx.save(); ctx.globalAlpha *= Math.max(g, bird); glycogen(ctx, 140, 470, 2.4); naamBij(ctx, 'glycogeen', 'lever en spieren · klein beetje', 330, 200, 1 - bird, 'center'); ctx.restore();
    // vet in vetcel
    ctx.save(); ctx.globalAlpha *= f; vetcel(ctx, 1400, 470, 280, { inhoud: (cx, cy) => { for (let i = 0; i < 6; i++) triglyceride(ctx, cx - 200 + (i % 2) * 220, cy - 110 + Math.floor(i / 2) * 110, 0.95); } }); naamBij(ctx, 'vetcel', 'het meeste: vet', 1400, 150, 1 - bird, 'center'); ctx.restore();
    ctx.restore();
    if (bird > 0.01) { ctx.save(); ctx.globalAlpha *= bird; const x = lerp(-200, 900, ramp(t, q.at('trekvogel'), 6)); grutto(ctx, x, 730 + Math.sin(t * 1.6 * 6.283) * 4, 2.0, t * 1.6); metaText(ctx, 'rosse grutto · tot ± 11 dagen non-stop, zonder eten', 900, 820, C.grain, 'center', 28); ctx.restore(); }
    bigLine(ctx, 'vet of glycogeen?', W / 2, 160, q.on('Bewaart'), C.goud, 48);
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    verdiepingTag(ctx, q.on('bindt') * (1 - q.on('Dus')));
    // twee rugzakken: 1 g glycogeen + 3 g water ; 1 g vet
    const w = q.on('water', 1, 1.0);
    weightBlock(ctx, 180, 790, 260, 130, V.kh, '1 g', ramp(t, 0, 0.5));
    for (let i = 0; i < 3; i++) weightBlock(ctx, 180, 790 - 130 - i * 130, 260, 130, C.teal, '1 g water', w * ramp(t, q.at('drie') + i * 0.3, 0.5));
    text(ctx, 'glycogeen', 310, 850, fTekst(36, 600), C.text, 'center');
    weightBlock(ctx, 560, 790, 260, 130, V.vt, '1 g', Math.max(q.on('Vet', 2), ramp(t, 0.6, 0.5)));
    text(ctx, 'vet', 690, 850, fTekst(36, 600), C.text, 'center');
    // energie per meegesjouwde gram
    const e = q.on('meesjouwt', 1, 1.2);
    if (e > 0.01) { axisBase(ctx, 1060, 1840, 760, e); metaText(ctx, 'kJ per gram die je meesjouwt', 1060, 140, C.grain, 'left', 28);
      bar(ctx, 1080, 760, 260, 560, 4.25, 40, V.kh, 'glycogeen + water', '≈ 4', e, e); bar(ctx, 1500, 760, 260, 560, 37, 40, V.vt, 'vet', '≈ 37', e, e);
      bigLine(ctx, '≈ 9× zoveel', 1300, 320, q.on('negen'), C.groen, 44, 'center'); }
  },
  s15(ctx, t, q) { bg(ctx, 'schema');
    const k = q.on('Tien'), sl = q.on('slecht'), x3 = q.on('lichtste');
    const top = 1 - sl;
    if (top > 0.01) { ctx.save(); ctx.globalAlpha *= top * k; weightBlock(ctx, 500, 820, 260, 70, V.vt, '10 kg vet', 1); weightBlock(ctx, 1040, 820, 260, 70 * 8.7 * ramp(t, q.at('glycogeen'), 1.5), V.kh, '', 1); text(ctx, '≈ 87 kg glycogeen + water', 1170, 820 - 70 * 8.7 * ramp(t, q.at('glycogeen'), 1.5) - 20, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
    if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl;
      text(ctx, '“vet is slecht”', W / 2, 200, fTekst(56, 600), C.text2, 'center'); strike(ctx, 720, 182, 1200, C.koraal, q.on('lichtste'));
      const cards = [['lichtste reserve', 'meeste energie per gram'], ['bouwstof', 'elk celmembraan'], ['vetoplosbare vitaminen', 'A · D · E · K']];
      const cu = ['lichtste', 'bouwstof', 'vetoplosbaar'];
      cards.forEach((c, i) => { const a = q.on(cu[i]); const x = 140 + i * 560; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 300, 520, 300, 14); shape(ctx, rgba(C.fill, 0.7), C.line, 1);
        text(ctx, c[0], x + 260, 370, fTekst(40, 600), C.text, 'center'); metaText(ctx, c[1], x + 260, 410, C.grain, 'center', 28);
        if (i === 0) triglyceride(ctx, x + 180, 500, 0.8);
        if (i === 1) { ctx.save(); roundRect(ctx, x + 6, 430, 508, 164, 10); ctx.clip(); membraanBoog(ctx, x + 260, 1500, 1000, -Math.PI / 2 - 0.22, -Math.PI / 2 + 0.22, { s: 1.1, eiwitten: [-Math.PI / 2 + 0.05] }); ctx.restore(); }
        if (i === 2) { blob(ctx, x + 260, 500, 140, 70, 0.05, 5); shape(ctx, rgba(V.vt, 0.35), V.vt, 1.5); ['A', 'D', 'E', 'K'].forEach((l, j) => { vitamin(ctx, x + 170 + j * 60, 500, 18); text(ctx, l, x + 170 + j * 60, 508, fMeta(28), C.text, 'center'); }); }
        ctx.restore(); });
      haak(ctx, 140, 1780, 640, 'pas een probleem bij jarenlang meer opslaan dan gebruiken', C.koraal, q.on('probleem'));
      ctx.restore(); }
  },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const hl = []; if (q.on('drieënhalf') > 0.5) hl.push(3); if (q.on('anderhalf') > 0.5) hl.push(1); if (q.on('vijf') > 0.5) hl.push(2); if (q.on('Dat') > 0.5) { hl.length = 0; hl.push(0); }
    etiket(ctx, 100, 110, 780, ramp(t, 0, 0.6), hl, 'Halfvolle melk · per 100 ml');
    const rows = [['3,5 g eiwit', '× 17', '=  59,5 kJ', 'eiwit'], ['1,5 g vet', '× 37', '=  55,5 kJ', 'anderhalf'], ['4,7 g koolhydraat', '× 17', '=  79,9 kJ', 'vijf']];
    const r = q.on('Reken');
    rows.forEach((rw, i) => { const a = r * ramp(t, q.at('Reken') + i * 0.9, 0.6); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 300 + i * 90; text(ctx, rw[0], 960, y, fTekst(40, 600), C.text); text(ctx, rw[1], 1340, y, fTekst(40), C.text2); text(ctx, rw[2], 1480, y, fTekst(40, 600), C.text); ctx.restore(); });
    const tot = q.on('honderdvijfennegentig', 1, 0.8) || q.on('kilojoule', 2, 0.8);
    if (tot > 0.01) { plateLine(ctx, 960, 1800, 540, tot); bigLine(ctx, 'samen ≈ 195 kJ', 1380, 610, tot, C.goud, 48); }
    haak(ctx, 960, 1800, 660, 'klopt met het etiket', C.groen, q.on('Dat'));
  },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'micro');
    const N = 44, kinds = Array.from({ length: N }, (_, i) => Math.floor(hash(i * 13 + 5) * 20)), kinds2 = kinds.map((k, i) => kinds[(i * 5) % N]);
    const sp = q.on('Spieren', 2), knip = q.on('knipt', 1, 1.4), eigen = q.on('eigen', 1, 1.6), twintig = q.on('twintig');
    const cx = 900, cy = 520, S = 1.6, R = 15;
    const start = Array.from({ length: N }, (_, i) => [(i - N / 2) * R * 2.15, Math.sin(i * 0.5) * R * 2.6]);
    const bouw = Math.ceil(N * ramp(t, 0, 2.5)), fold = ramp(t, 2.8, 2.4) * (1 - ramp(t, q.at('knipt'), 0.6)); const kn = clamp((knip - 0.4) / 0.6, 0, 1);
    if (sp < 0.5 || knip > 0.01) {
      ctx.save(); ctx.globalAlpha *= (1 - sp) + knip;
      if (knip < 0.01) { if (bouw < N) proteinChain(ctx, start.map(p => [cx + p[0], cy + p[1]]), kinds, R, { upto: bouw }); else eiwitVouw(ctx, cx, cy, S, fold, kinds, { r: R, start, t }); }
      else { const scat = start.map((p, i) => [p[0] + (hash(i) * 2 - 1) * 90 * kn, p[1] + (hash(i + 3) * 2 - 1) * 160 * kn]);
        if (eigen < 0.01) { if (fold > 0.01) eiwitVouw(ctx, cx, cy, S, fold, kinds, { r: R, start, t }); else scat.forEach((p, i) => bead(ctx, cx + p[0], cy + p[1], R, kinds[i])); }
        else eiwitVouw(ctx, cx, cy, S, eigen, kinds2, { r: R, start: scat, t }); }
      naamBij(ctx, 'eiwit', 'keten van aminozuren, gevouwen', cx, 290, q.on('keten') * (1 - knip), 'center');
      naamBij(ctx, 'losse aminozuren', null, cx, 290, knip * (1 - eigen), 'center');
      naamBij(ctx, 'jouw eigen eiwit', null, cx, 290, eigen, 'center');
      ctx.restore(); }
    // palet van 20
    if (twintig > 0.01) { ctx.save(); ctx.globalAlpha *= twintig * (1 - sp * 0.6); for (let i = 0; i < 20; i++) bead(ctx, 210 + i * 78, 160, 20, i); metaText(ctx, '20 soorten aminozuren', 210, 230, C.grain, 'left', 28); ctx.restore(); }
    // functies
    if (sp > 0.01 && knip < 0.01) { ctx.save(); ctx.globalAlpha *= sp; const items = [['spieren', 'Spieren', 2], ['enzymen', 'enzymen'], ['hormonen', 'hormonen'], ['antistoffen', 'antistoffen'], ['hemoglobine', 'hemoglobine']];
      items.forEach((it, i) => { const a = q.on(it[1], it[2] || 1); const x = 260 + i * 350, y = 560; ctx.save(); ctx.globalAlpha *= a;
        if (i === 0) spierBundel(ctx, x - 120, y, 240, { n: 4, h: 24 });
        if (i === 1) enzymKluwen(ctx, x, y, 72, { an: -0.4 });
        if (i === 2) proteinChain(ctx, coilPath(x - 70, y, 7, 24, 12), [3, 8, 12, 1, 15, 6, 10], 10);
        if (i === 3) { ctx.strokeStyle = lighten(C.enzym, 0.3); ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + 70); ctx.lineTo(x, y); ctx.lineTo(x - 50, y - 60); ctx.moveTo(x, y); ctx.lineTo(x + 50, y - 60); ctx.stroke(); }
        if (i === 4) { blob(ctx, x, y, 76, 70, 0.08, 7); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 1.5); }
        text(ctx, it[0], x, y + 140, fTekst(36, 600), C.text, 'center'); ctx.restore(); });
      ctx.restore(); }
    metaText(ctx, 'schematisch · niet op schaal', W - 40, CAPTION_Y - 16, C.text2, 'right', 28);
  },
  s18(ctx, t, q) { bg(ctx, 'micro');
    const m = q.on('meeste'), neg = q.on('Negen', 1, 0.8), ess = q.on('essentiële'), bouw = q.on('bouwt', 1, 1);
    const top = 1 - bouw * 0.6;
    // v1.1b: zelf maken = koolstofskelet uit de glucoseafbraak + stikstof (aminogroep) van een ander aminozuur
    const sk = q.on('gebruikt', 1, 0.6) * (1 - q.on('Negen', 1, 0.6)); if (sk > 0.01) { ctx.save(); ctx.globalAlpha *= sk;
      const hop = ease(clamp((t - q.at('stikstof')) / 1.6, 0, 1)), klaar = ease(clamp((t - q.at('eiwit', 1)) / 0.8, 0, 1)), k1 = clamp(klaar * 2, 0, 1), k2 = clamp(klaar * 2 - 1, 0, 1);
      ctx.save(); ctx.globalAlpha *= 1 - k1; hexagon(ctx, 1240, 520, 44, V.kh, lighten(V.kh, 0.35)); ctx.restore(); naamBij(ctx, 'skelet uit glucose', 'koolstof', 1240, 620, 1 - k1, 'center');
      bead(ctx, 1640, 520, 32, 3); naamBij(ctx, 'ander aminozuur', null, 1640, 620, 1, 'center');
      const nx = lerp(1640, 1262, hop), ny = lerp(484, 492, hop) - Math.sin(hop * Math.PI) * 80; ctx.save(); ctx.globalAlpha *= 1 - k1; ctx.beginPath(); ctx.arc(nx, ny, 17, 0, 6.283); shape(ctx, C.teal, lighten(C.teal, 0.4), 2); text(ctx, 'N', nx, ny + 8, fTekst(24, 800), C.bgMicro, 'center'); ctx.restore();
      naamBij(ctx, 'stikstof uit ander eiwit', null, 1450, 330, q.on('stikstof', 1, 0.5), 'center', C.teal);
      if (k2 > 0.01) { bead(ctx, 1240, 520, 32, 8, { alpha: k2 }); naamBij(ctx, 'nieuw aminozuur', null, 1240, 620, k2, 'center'); }
      ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= top;
    for (let i = 0; i < 20; i++) { const isE = AA_ESS.includes(i); const row = isE ? 0 : 1; const col = isE ? AA_ESS.indexOf(i) : i - AA_ESS.filter(e => e < i).length;
      const x0 = 160 + i * 82, y0 = 220; const x1 = 180 + col * 92 + (row ? 0 : 0), y1 = row ? 520 : 300;
      const u = neg; bead(ctx, lerp(x0, x1, u), lerp(y0, y1, u), 22, i, { ess: ess > 0.5, alpha: ramp(t, 0, 0.5) * (row && neg > 0.5 ? 0.55 : 1) }); }
    if (neg > 0.01) { ctx.save(); ctx.globalAlpha *= neg; metaText(ctx, 'je lichaam maakt ze zelf · 11', 180, 600, C.grain, 'left', 28); metaText(ctx, 'moet je eten · 9', 180, 380, C.goud, 'left', 28); ctx.restore(); }
    label(ctx, 'essentiële aminozuren', 'moeten in je voeding zitten', 1000, 300, 1260, 180, ess);
    ctx.restore();
    if (bouw > 0.01) { ctx.save(); ctx.globalAlpha *= bouw; const n = 16; const path = coilPath(360, 780, n, 60, 26, 0.6); const kinds = [1, 4, 7, 0, 10, 3, 12, 6, 14, 2, 16, 11, 9, 5, 13, 8];
      const built = Math.floor(ramp(t, q.at('bouwt'), 2.4) * 9); proteinChain(ctx, path, kinds, 18, { upto: built, ess: true });
      if (q.on('op') > 0.01) { const p = path[9]; ctx.save(); ctx.globalAlpha *= q.on('op'); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 22, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); text(ctx, '?', p[0], p[1] + 12, fTekst(36, 700), C.koraal, 'center'); ctx.restore(); }
      ctx.restore(); }
  },
  s20(ctx, t, q) { bg(ctx, 'micro');
    // voorraadbakjes van de negen essentiële aminozuren; bakje 4 raakt leeg
    const stop = q.on('niet', 1, 0.5), lever = q.on('lever', 1, 1), grens = q.on('bepaalt');
    const n = 18, path = coilPath(240, 330, n, 66, 30, 0.6); const kinds = [1, 4, 7, 0, 10, 3, 12, 6, 14, 2, 16, 11, 9, 5, 13, 8, 17, 19];
    proteinChain(ctx, path, kinds, 20, { upto: 9, ess: true });
    const p = path[9]; ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 24, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    label(ctx, 'het eiwit kan niet af', null, p[0], p[1] - 26, p[0] + 140, 170, stop, C.koraal);
    // bakjes
    AA_ESS.forEach((k, i) => { const x = 220 + i * 110, y = 640; const lvl = i === 4 ? 0.07 : 0.35 + 0.6 * hash(i * 5); roundRect(ctx, x - 40, y - 100, 80, 100, 8); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = rgba(V.ew, 0.4); ctx.fillRect(x - 38, y - 2 - 96 * lvl, 76, 96 * lvl); bead(ctx, x, y + 34, 16, k, { ess: true }); if (i === 4) metaText(ctx, 'tekort', x, y + 76, C.koraal, 'center', 24); });
    // v1.1c: geen apart voorraadeiwit, wel een kleine vrije voorraad (± 100 g) en een grote dagelijkse omzet (± 250–300 g); bij een tekort uit eigen (spier)eiwit
    const weg = 1 - q.on('lever', 1, 0.6), gv = q.on('eiwitvoorraad', 1, 0.6) * (1 - q.on('vrije', 1, 0.5)), om = q.on('dag', 1, 0.8) * weg, kr = q.on('krap', 1, 0.8) * weg;
    naamBij(ctx, 'geen apart voorraadeiwit', 'zoals vet of glycogeen', 1380, 470, gv, 'center', C.koraal);
    if (om > 0.01) { ctx.save(); ctx.globalAlpha *= om; spierBundel(ctx, 1260, 600, 240, { n: 3, h: 18 }); naamBij(ctx, 'eigen eiwit', 'vooral in je spieren', 1380, 700, 1, 'center');
      const pijlKop = (x, y, an, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.cos(an - 0.4) * 18, y - Math.sin(an - 0.4) * 18); ctx.lineTo(x - Math.cos(an + 0.4) * 18, y - Math.sin(an + 0.4) * 18); ctx.closePath(); ctx.fill(); };
      ctx.lineWidth = 2.5; ctx.strokeStyle = C.text2; ctx.beginPath(); ctx.moveTo(1240, 575); ctx.quadraticCurveTo(1180, 470, 1120, 520); ctx.stroke(); pijlKop(1120, 520, 2.4, C.text2);
      ctx.beginPath(); ctx.moveTo(1125, 610); ctx.quadraticCurveTo(1180, 690, 1240, 625); ctx.stroke(); pijlKop(1240, 625, -0.8, C.text2);
      naamBij(ctx, '± 250–300 g eiwit per dag', 'afgebroken en opnieuw opgebouwd', 1440, 430, 1 - kr, 'center'); ctx.restore(); }
    if (kr > 0.01) { ctx.save(); ctx.globalAlpha *= kr; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1235, 590); ctx.quadraticCurveTo(940, 380, 672, 528); ctx.stroke(); ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.moveTo(664, 536); ctx.lineTo(676, 510); ctx.lineTo(690, 528); ctx.closePath(); ctx.fill(); naamBij(ctx, 'tekort: uit eigen eiwit', null, 1380, 470, 1, 'center', C.koraal); ctx.restore(); }
    { const vv = q.on('vrije', 1, 0.6); ctx.save(); ctx.globalAlpha *= 1 - vv; metaText(ctx, 'vrije aminozuren in je cellen (schematisch)', 180, 770, C.grain, 'left', 28); ctx.restore(); ctx.save(); ctx.globalAlpha *= vv; metaText(ctx, 'vrije voorraad in cellen en bloed · ± 100 g · schematisch', 180, 770, C.goud, 'left', 28); ctx.restore(); }
    // rest gaat naar de lever
    if (lever > 0.01) { ctx.save(); ctx.globalAlpha *= lever; const lx = 1420, ly = 560; leverVoor(ctx, lx, ly - 10, 0.8, { gloed: 0.4 * lever }); naamBij(ctx, 'lever', null, lx - 40, ly - 30, 1, 'center');
      for (let i = 0; i < 6; i++) { const u = clamp((t - q.at('lever') - i * 0.3) / 2, 0, 1); bead(ctx, lerp(1180, lx - 60, ease(u)), lerp(640 - i * 20, ly, ease(u)), 12, AA_ESS[(i * 3) % 9], { alpha: 1 - u * 0.8 }); }
      arrow(ctx, lx + 60, ly - 100, lx + 60, ly - 230, V.neutraal, q.on('ureum')); text(ctx, 'stikstof → ureum', lx + 60, ly - 250, fTekst(36, 600), C.text, 'center');
      arrow(ctx, lx + 60, ly + 100, lx + 60, ly + 200, C.koraal, q.on('brandstof')); text(ctx, 'rest → brandstof of vet', lx + 60, ly + 250, fTekst(36, 600), C.text, 'center');
      ctx.restore(); }
    haak(ctx, 180, 1200, 790, 'het tekort bepaalt hoeveel eiwit je bouwt', C.groen, grens);
  },
  s21(ctx, t, q) { bg(ctx, 'schema');
    const g = q.on('meten', 1, 1), rise = q.on('stijging', 1, 2.5), ne = q.on('niet-essentiële', 1, 1.5);
    persoon(ctx, 'sam', 220, 760, 300, { a: ramp(t, 0, 0.6), uit: 'blij', t }); foodIcon(ctx, 'kaas', 360, 700, 0.9, q.on('maaltijd'));
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; const x0 = 560, x1 = 1800, y0 = 760, y1 = 200;
      ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let i = 0; i < 6; i++) ctx.fillRect(x0, y1 + i * 112, x1 - x0, 1);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      metaText(ctx, 'concentratie in het bloed', x0 + 14, y1 - 14, C.grain, 'left', 28); metaText(ctx, 'tijd na de maaltijd (uur)', x1, y0 + 84, C.grain, 'right', 28);
      [0, 1, 2, 3, 4].forEach(h => text(ctx, String(h), x0 + h * 300, y0 + 40, fMeta(28), C.text2, 'center'));
      const curve = (ampl, base, u, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 200 * u; i++) { const h = i / 200 * 4; const v = base + ampl * (h / 0.8) * Math.exp(1 - h / 0.8); const x = x0 + h * 300, y = y0 - v * 520; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); };
      curve(0.75, 0.15, rise, C.oker, 4); naamBij(ctx, 'essentiële aminozuren', 'stijging = uit de maaltijd', x0 + 300, y0 - 0.9 * 520 - 48, rise > 0.9 ? 1 : 0, 'left');
      ctx.save(); ctx.globalAlpha *= ne; curve(0.2, 0.35, ne, V.neutraal, 3); text(ctx, 'niet-essentiële: lichaam maakt ze ook zelf', x1, y0 - 0.62 * 520, fTekst(36, 600), V.neutraal, 'right'); ctx.restore();
      ctx.restore(); }
    metaText(ctx, 'schematisch verloop', W - 40, CAPTION_Y - 16, C.text2, 'right', 28);
  },
  s22(ctx, t, q) { bg(ctx, 'schema');
    const mis = 1 - q.on('voedsel'), gr = Math.max(q.on('voedsel'), q.on('Granen')), pv = q.on('Peulvruchten'), comb = q.on('vullen', 1, 1.2), full = q.on('Vlees');
    if (mis > 0.01) { ctx.save(); ctx.globalAlpha *= mis * ramp(t, 0, 0.5); text(ctx, '“plantaardig eiwit mist aminozuren”', W / 2, 220, fTekst(52, 600), C.text2, 'center'); strike(ctx, 520, 204, 1400, C.koraal, q.on('klopt')); ctx.restore(); }
    const panel = (x, title, low, a, ok) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, title, x + 230, 300, fTekst(40, 600), C.text, 'center');
      plateLine(ctx, x, x + 460, 700); ctx.setLineDash([8, 8]); ctx.strokeStyle = C.groen; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, 440); ctx.lineTo(x + 460, 440); ctx.stroke(); ctx.setLineDash([]);
      AA_ESS.forEach((k, i) => { const v = low.includes(i) ? 0.45 : 1.05 + 0.15 * hash(i + x); const h = 260 * v; roundRect(ctx, x + 10 + i * 50, 700 - h, 36, h, 5); shape(ctx, rgba(V.ew, low.includes(i) ? 0.25 : 0.5), low.includes(i) ? C.koraal : V.ew, 1.2); bead(ctx, x + 28 + i * 50, 730, 13, k, { ess: true }); });
      if (ok) metaText(ctx, 'alle negen genoeg', x + 230, 790, C.groen, 'center', 28); ctx.restore(); };
    panel(140, 'graan', [2], gr * (1 - full * 0.5), false); panel(730, 'peulvrucht', [5], pv * (1 - full * 0.5), false);
    if (comb > 0.01) panel(1320, 'brood + bonen', [], comb * (1 - full), true);
    if (q.on('Granen') > 0.5) metaText(ctx, 'weinig lysine', 140 + 10 + 2 * 50, 380, C.koraal, 'left', 28);
    if (pv > 0.5) metaText(ctx, 'weinig methionine', 730 + 10 + 5 * 50 - 120, 380, C.koraal, 'left', 28);
    if (full > 0.01) { ctx.save(); ctx.globalAlpha *= full; text(ctx, 'vlees · zuivel · ei · soja · quinoa', 1550, 380, fTekst(36, 600), C.text, 'center'); metaText(ctx, 'alle negen in een goede verhouding', 1550, 430, C.groen, 'center', 28); ['kaas', 'tofu'].forEach((f, i) => foodIcon(ctx, f, 1460 + i * 180, 560, 1)); ctx.restore(); }
  },

  // ---------- H4 ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    const tube = ramp(t, 0, 0.8); const dik = q.on('dikke');
    darmWandBuis(ctx, 120, 1800, 500, 110, () => 0, tube, 'darmwand (schematisch)', 58, t);
    if (dik > 0.01) { ctx.save(); ctx.globalAlpha *= dik; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.strokeRect(1200, 330, 600, 340); metaText(ctx, 'dikke darm', 1500, 315, C.goud, 'center', 28); ctx.restore(); }
    // vezels schuiven door; enzymen botsen ertegen en laten los
    for (let i = 0; i < 5; i++) { const x = 160 + ((t * 70 + i * 330) % 1500); celluloseBundel(ctx, x, 462 + (i % 3) * 26, 6, 9, { a: q.on('vezels') * tube, ketens: 2, angle: 0.05 * Math.sin(t + i) }); }
    const en = q.on('enzymen'); if (en > 0.01) { for (let i = 0; i < 3; i++) { const x = 500 + i * 300, bounce = Math.abs(Math.sin(t * 2 + i)) * 40; ctx.save(); ctx.globalAlpha *= en; enzymKluwen(ctx, x + Math.sin(t * 2 + i) * 14, 560 + bounce * 0.6, 26, { an: -Math.PI / 2 + 0.5 * Math.sin(t * 2 + i), seed: i + 2 }); ctx.restore(); } naamBij(ctx, 'enzymen', 'actieve plek past niet op cellulose', 800, 730, en, 'center'); }
    naamBij(ctx, 'cellulose', 'uit celwanden van planten', 860, 290, q.on('cellulose'), 'center');
    bigLine(ctx, 'een maand bijna geen vezels: wat gebeurt er?', W / 2, 180, q.on('maand'), C.goud, 44);
  },
  s25(ctx, t, q) { bg(ctx, 'schema');
    const two = q.on('Weinig', 1, 0.8);
    const wave = (speed, strength, off) => (x) => { const c = ((t * speed + off) % 1900) - 100; return strength * Math.exp(-((x - c) ** 2) / (2 * 70 ** 2)); };
    const yA = two > 0.01 ? lerp(500, 340, two) : 500;
    const sqA = wave(260, 0.9 * q.on('knijpen', 1, 1) + 0.25, 0);
    darmWandBuis(ctx, 120, 1800, yA, 120, sqA, 1, two > 0.5 ? 'veel vezels' : null, 52, t);
    // inhoud: vezels + water, volume
    const vol = q.on('volume', 1, 1);
    darmBrij(ctx, 120, 1800, yA, 120, sqA, { nat: 1, vol: 0.45 + 0.55 * Math.max(vol, q.on('water')), t, schuif: t * 120 * (0.6 + 0.4 * q.on('knijpen')) });
    naamBij(ctx, 'kringspier', 'knijpt samen achter de inhoud', 980, yA - 220, q.on('spieren') * (1 - two), 'center');
    bigLine(ctx, 'peristaltiek', 1500, yA - 210, q.on('peristaltiek') * (1 - two), C.text, 48);
    if (two > 0.01) { ctx.save(); ctx.globalAlpha *= two; const yB = 700; const sqB = wave(110, 0.35, 400); darmWandBuis(ctx, 120, 1800, yB, 70, sqB, 1, 'weinig vezels', 34, t);
      darmBrij(ctx, 120, 1800, yB, 70, sqB, { nat: 0, t, schuif: t * 45, vezels: 0.4 });
      metaText(ctx, 'trager · droger · verstopping', 1800, yB + 120, C.koraal, 'right', 28); metaText(ctx, 'meer volume · meer vocht · sneller door', 1800, yA + 190, C.groen, 'right', 28); ctx.restore(); }
    refCard(ctx, '→ film 6: bacteriën in je dikke darm', 120, 830, q.on('bacteriën') * (1 - 0));
  },
  s26(ctx, t, q) { bg(ctx, 'schema');
    const a = ramp(t, 0, 0.6);
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120, 140, 900, 560, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.2); text(ctx, 'Ingrediënten', 160, 210, fTekst(40, 600), C.text);
    const ing = [['water', null], ['suiker', null], ['citroenzuur', 'E330', 'smaak'], ['kleurstof karamel', 'E150d', 'kleur'], ['conserveermiddel', 'E211', 'houdbaar'], ['aroma', null, 'geur']];
    ing.forEach((r, i) => { const y = 280 + i * 66; const isAdd = r.length > 2; const on = isAdd && q.on('additieven') > 0.5; text(ctx, r[0], 160, y, fTekst(36, on ? 600 : 400), on ? C.text : C.text2); if (r[1]) text(ctx, r[1], 980, y, fMeta(30), on ? C.goud : C.text2, 'right'); });
    ctx.restore();
    const fx = ['kleur', 'smaak', 'geur', 'houdbaar']; fx.forEach((f, i) => { const al = q.on(['kleur', 'smaak', 'geur', 'langer'][i]); if (al <= 0.01) return; const y = 260 + i * 90; ctx.save(); ctx.globalAlpha *= al; additiefIcoon(ctx, i, 1345, y - 13, t); ctx.restore(); bigLine(ctx, f, 1400, y, al, C.text, 40, 'left'); });
    const eu = q.on('getest'); if (eu > 0.01) { ctx.save(); ctx.globalAlpha *= eu; roundRect(ctx, 1300, 640, 520, 110, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 1.5); text(ctx, 'getest en toegelaten in de EU', 1560, 708, fTekst(36, 600), C.groen, 'center'); ctx.restore(); }
    naamBij(ctx, 'E-nummer', 'of de naam', 1045, 598, q.on('nummer'), 'left');
  },
  s27(ctx, t, q) { bg(ctx, 'schema');
    const adi = q.on('ADI'), asp = q.on('aspartaam'), sx = q.on('Zestig', 1, 0.8), blik = q.on('blikje', 1, 0.6), kind = q.on('kind', 1, 0.8);
    if (adi > 0.01) { ctx.save(); ctx.globalAlpha *= adi * (1 - kind * 0.5); roundRect(ctx, 120, 120, 820, 170, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 1.5); text(ctx, 'ADI · aanvaardbare dagelijkse inname', 150, 180, fTekst(36, 600), C.goud); text(ctx, asp > 0.5 ? 'aspartaam: 40 mg per kg per dag' : 'mg per kg lichaamsgewicht per dag', 150, 250, fTekst(36, 600), C.text); ctx.restore(); }
    if (sx > 0.01) { ctx.save(); ctx.globalAlpha *= sx * (1 - kind * 0.5); persoon(ctx, 'noor', 260, 820, 300, { uit: 'neutraal', t }); text(ctx, '60 kg', 260, 860, fTekst(36, 600), C.text, 'center'); text(ctx, '60 × 40 = 2400 mg per dag', 430, 400, fTekst(44, 600), C.text); ctx.restore(); }
    if (blik > 0.01) { const n = Math.min(12, Math.floor(ramp(t, q.at('blikje'), 2) * 12 + 0.001)); ctx.save(); ctx.globalAlpha *= blik * (1 - kind * 0.5); for (let i = 0; i < n; i++) foodIcon(ctx, 'blikje', 470 + (i % 12) * 66, 560, 0.9); metaText(ctx, '200 mg per blikje · 12 blikjes = 2400 mg', 440, 650, C.grain, 'left', 28); ctx.restore(); }
    if (kind > 0.01) { ctx.save(); ctx.globalAlpha *= kind; persoon(ctx, 'kind', 1500, 840, 210, { uit: 'blij', t }); text(ctx, '20 kg', 1500, 880, fTekst(36, 600), C.text, 'center'); text(ctx, 'na hoeveel blikjes?', 1500, 560, fTekst(44, 600), C.goud, 'center'); ctx.restore(); }
  },
  s29(ctx, t, q) { bg(ctx, 'schema');
    ctx.save(); persoon(ctx, 'kind', 1500, 840, 210, { uit: 'blij', t }); text(ctx, '20 kg', 1500, 880, fTekst(36, 600), C.text, 'center'); ctx.restore();
    const a = q.on('Twintig'); if (a > 0.01) { bigLine(ctx, '20 × 40 = 800 mg = 4 blikjes', 1500, 420, a, C.text, 44); for (let i = 0; i < 4; i++) foodIcon(ctx, 'blikje', 1380 + i * 80, 540, 0.9, a); }
    const m = q.on('honderd', 2, 1.2); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; plateLine(ctx, 160, 1100, 700); ctx.fillStyle = C.line;
      roundRect(ctx, 1000, 260, 60, 440, 8); shape(ctx, rgba(V.neutraal, 0.3), V.neutraal, 1.2); text(ctx, 'geen schadelijk effect', 1030, 230, fTekst(36, 600), C.text2, 'center'); metaText(ctx, 'proefdieren', 1030, 740, C.grain, 'center', 28);
      roundRect(ctx, 300, 696, 60, 4.4, 2); shape(ctx, C.goud, C.goud, 1); text(ctx, 'ADI', 330, 670, fTekst(36, 600), C.goud, 'center'); metaText(ctx, '100× lager', 600, 560, C.goud, 'center', 28); arrow(ctx, 980, 500, 380, 680, C.goud, 1); ctx.restore(); }
    haak(ctx, 160, 1100, 760, 'elke dag, je hele leven lang', C.groen, q.on('elke'));
  },

  // ---------- Recap ----------
  s30(ctx, t, q) { bg(ctx, 'schema');
    const rij = q.on('rij'), vl = q.on('vleeseter'), vg = q.on('vegan', 1), comb = q.on('combineren', 1, 1), grens = q.on('grens');
    twoStudents(ctx, t, { foodsL: 1 - rij, foodsR: 1 - rij, tagL: 1 - rij, tagR: 1 - rij, a: ramp(t, 0, 0.6) });
    if (rij > 0.01) { const rowL = Array.from({ length: 9 }, (_, i) => AA_ESS[i]);
      ctx.save(); ctx.globalAlpha *= rij; rowL.forEach((k, i) => bead(ctx, 312 + i * 52, 360, 20, k, { ess: vl > 0.5 })); if (vl > 0.5) metaText(ctx, 'alle negen · goede verhouding', 520, 300, C.groen, 'center', 28);
      rowL.forEach((k, i) => { const gap = grens > 0.5 && i === 4; bead(ctx, 1192 + i * 52, 360, 20, k, { ess: vg > 0.5, alpha: gap ? 0.2 : 1 }); });
      if (comb > 0.5 && grens < 0.5) metaText(ctx, 'graan + peulvrucht · soja', 1400, 300, C.groen, 'center', 28);
      if (grens > 0.5) metaText(ctx, 'niet gecombineerd: tekort = grens', 1400, 300, C.koraal, 'center', 28);
      ctx.restore(); }
  },
  s31(ctx, t, q) { bg(ctx, 'schema');
    broodje(ctx, 780, 580, 1.9); glasMelk(ctx, 1170, 690, 1.4); plateLine(ctx, 480, 1300, 692);
    const tags = [['eiwit → bouwstof', 'bouwstof', V.neutraal, 140, 200], ['koolhydraat en vet → brandstof', 'brandstof', C.koraal, 1260, 200], ['vet → reserve', 'reserve', C.oker, 140, 760], ['vitaminen, mineralen → regelstof', 'regelstof', C.teal, 1240, 760]];
    tags.forEach(tg => { const a = q.on(tg[1]) * (1 - q.on('volgende') * 0.6); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(tg[0]).width + 50; roundRect(ctx, tg[3], tg[4], w, 66, 33); shape(ctx, rgba(tg[2], 0.15), tg[2], 1.5); text(ctx, tg[0], tg[3] + 25, tg[4] + 44, fTekst(36, 600), C.text); ctx.restore(); });
    const vz = q.on('vezels'); if (vz > 0.01) { ctx.save(); ctx.globalAlpha *= vz * (1 - q.on('volgende') * 0.6); fiber(ctx, 640, 740, 6, 11); text(ctx, 'vezels houden alles in beweging', 780, 810, fTekst(36, 600), C.groen, 'center'); ctx.restore(); }
    const nx = q.on('volgende', 1, 1); if (nx > 0.01) { arrow(ctx, 1200, 560, 1500, 560, C.goud, nx, 2); refCard(ctx, 'film 2 · De reis door je buik', 1320, 600, nx); }
  },
};

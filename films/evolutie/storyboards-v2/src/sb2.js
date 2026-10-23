// Storyboard film 2 · Natuurlijke selectie — één keyframe per scène (1920×1080). Laadt na teken_evo2.js, teken_evo3.js en vragen23.js.
const _vr2 = (ctx, id) => vraagKaart(ctx, VR[id].vraag, VR[id].opties, 2);
// merel-op-tak + rups-op-blad decor (Macro, nacht). px/mm = m (merel 1 eenheid = 1 mm; rups 1 eenheid = 0,1 mm)
function _struik(ctx, o = {}) { const { m = 2.6, bruin = 0, groen = 1, pik = 0, prooi = false, ring = false, extra = null } = o;
  macroNacht(ctx, { horizon: 940 });
  lijn(ctx, [[-40, 760], [380, 720], [700, 700]], '#5A4636', 18);
  const P = [[640, 880], [900, 640], [1180, 520], [1500, 420], [1960, 360]];
  const pos = takMetBladeren(ctx, P, [[0.18, 120, -1.9], [0.3, 130, 0.5], [0.45, 125, -1.2], [0.58, 135, 0.35], [0.72, 120, -1.5], [0.86, 130, 0.2]], { dikte: 12 });
  _struik.bl = pos; return pos; }

const SB2 = {
  // ---------------- Opening
  e2s01(ctx) { _struik(ctx); evoTag(ctx, 2, 'OPENING');
    const B = _struik.bl; merel(ctx, 340, 724, 2.6, { kijk: 1 });
    rupsOpBlad(ctx, B[3], 0.4, { kleur: '#6BA872' });
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },
  e2s02(ctx) { _struik(ctx); evoTag(ctx, 2, 'OPENING');
    const bruineRups = (c, x, y) => { c.save(); c.translate(x - 4, y + 2); c.rotate(0.5); rups(c, 0, 0, 0.15, { kleur: '#8C6A48', krom: 0.4 }); c.restore(); };
    merel(ctx, 340, 724, 2.6, { kijk: 1, pik: 0.35, prooi: bruineRups });
    const [rx, ry] = rupsOpBlad(ctx, _struik.bl[3], 0.4, { kleur: '#6BA872' }); focusRing(ctx, rx, ry, 100, 46);
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },
  e2s03(ctx) { titelKaart(ctx, 2, 'Natuurlijke selectie', ['Waarom wint niet altijd', 'het sterkste dier?'], (c) => {
      lijn(c, [[1180, 760], [1800, 740]], '#5A4636', 12); grondvink(c, 1480, 748, 2.4, { snavel: 10 }); }); },
  // ---------------- H1 Te veel jongen
  e2s04(ctx) { macroNacht(ctx, { horizon: 900 }); evoTag(ctx, 2, 'TE VEEL JONGEN');
    opuntia(ctx, 1380, 1180, 2.6);
    nestje(ctx, 1380, 360, 1.8, 4);
    lijn(ctx, [[300, 700], [900, 680]], '#5A4636', 12);
    grondvink(ctx, 640, 690, 1.6, { snavel: 9.3 });
    naamBij(ctx, 'middelste grondvink', 'geospiza fortis · ± 12,5 cm', 620, 770, 1, 'center');
    naamBij(ctx, 'legsel', '2 tot 5 eieren · vaak meer legsels per jaar', 1380, 250, 1, 'center');
    evoSchaal(ctx, 'galápagos'); },
  e2q05(ctx) { _vr2(ctx, 'e2q05'); },
  e2s06(ctx) { evoTag(ctx, 2, 'TE VEEL JONGEN');
    const x = 260, y = 800, w = 1100, h = 560;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaren', yLabel: 'aantal vinken', xt: [[0, '0'], [0.25, '2'], [0.5, '4'], [0.75, '6'], [1, '8']] });
    const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const v = 0.1 * Math.pow(2.6, u * 8 / 2) ; if (v > 1.05) break; P.push([x + u * w, y - v * h]); } lijnPad(ctx, P, C.goud, 5, [14, 10]);
    lijnPad(ctx, [[x, y - 0.42 * h], [x + w, y - 0.42 * h]], C.line, 3, [6, 8]);
    const G = []; for (let i = 0; i <= 40; i++) { const u = i / 40; G.push([x + u * w, y - (0.1 + 0.08 * Math.sin(u * 9) * u + 0.22 * (1 - Math.exp(-u * 6))) * h]); } lijnPad(ctx, G, C.groen, 6);
    naamBij(ctx, 'als alle jongen overleven', null, x + 0.43 * w, y - 0.97 * h, 1, 'right', C.goud);
    naamBij(ctx, 'zoveel zaden', 'wat het eiland kan voeden', x + w + 20, y - 0.42 * h - 46, 1, 'left', C.text2);
    naamBij(ctx, 'echte populatie', null, x + w + 20, y - 0.33 * h + 30, 1, 'left', C.groen);
    text(ctx, 'overproductie', 1440, 260, fTekst(56, 700), C.text, 'left'); metaText(ctx, 'meer jongen dan er kunnen overleven', 1440, 306, C.grain, 'left', 26);
    evoSchaal(ctx, 'model · vereenvoudigd'); },
  e2s07(ctx) { macroNacht(ctx, { horizon: 900 }); evoTag(ctx, 2, 'TE VEEL JONGEN');
    lijn(ctx, [[-40, 640], [700, 610], [1300, 620], [1960, 600]], '#5A4636', 16);
    const sn = [8.2, 9.6, 8.9, 11, 9.2, 10.3]; sn.forEach((v, i) => grondvink(ctx, 210 + i * 300, 616 - i * 0.6, 1.25, { snavel: v, kijk: i % 3 === 2 ? -1 : 1, snavelKleur: i === 3 ? C.goud : null }));
    naamBij(ctx, 'variatie', 'snavels verschillen', 1110, 720, 1, 'center');
    evoSchaal(ctx, 'grondvink ± 12,5 cm'); },
  // ---------------- H2 Droogte op Daphne Major
  e2s08(ctx) { macroNacht(ctx, { horizon: 700, heuvel: false }); ctx.fillStyle = '#26507E'; ctx.fillRect(0, 700, W, H - 700); evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    daphneMajor(ctx, 960, 720, 1300);
    for (let i = 0; i < 7; i++) { const px = 600 + hash(i * 3.1) * 700, py = 260 + hash(i * 5.3) * 160; ctx.save(); ctx.translate(px, py); ctx.fillStyle = '#C9B79C'; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-4, -8, 0, 0); ctx.quadraticCurveTo(4, -8, 12, 0); ctx.quadraticCurveTo(0, 4, -12, 0); ctx.fill(); ctx.restore(); }
    naamBij(ctx, 'Daphne Major', 'galápagos', 960, 200, 1, 'center');
    evoSchaal(ctx, 'metingen sinds het jaar 1973 · peter en rosemary grant'); },
  e2s09(ctx) { evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    const x = 420, y = 820, w = 1100, h = 300, mm = (v) => (v - 7) / 5;
    histogram(ctx, x, y, w, h, mm(9.3), 0.17, { kleur: C.teal });
    for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x + mm(v) * w, y + 44, C.text2, 'center', 28);
    metaText(ctx, 'snavelhoogte (mm)', x + w, y + 80, C.grain, 'right', 28);
    [[8, 'laag'], [9.3, 'gemiddeld'], [11, 'hoog']].forEach(([v, l]) => { const fx = x + mm(v) * w - 60; grondvink(ctx, fx, 400, 1.1, { snavel: v });
      const s = 1.1, hS = v * 2.2, bxW = fx + s * (26 + 22 - 10), top = 400 + s * (-104 - hS * 0.55), bot = 400 + s * (-104 + hS * 0.45);
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bxW, top); ctx.lineTo(bxW, bot); ctx.moveTo(bxW - 8, top); ctx.lineTo(bxW + 8, top); ctx.moveTo(bxW - 8, bot); ctx.lineTo(bxW + 8, bot); ctx.stroke();
      naamBij(ctx, String(v).replace('.', ',') + ' mm', null, fx, 450, 1, 'center'); });
    text(ctx, 'variatie', 120, 260, fTekst(48, 700), C.text); metaText(ctx, 'grotendeels erfelijk', 120, 300, C.grain, 'left', 26); },
  e2s10(ctx) { macroNacht(ctx, { horizon: 520, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 520, W, H); evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    for (let i = 0; i < 9; i++) { const px = 120 + i * 210 + hash(i) * 60; lijn(ctx, [[px, 560], [px - 30, 470], [px - 50, 430]], '#7A6A50', 5); lijn(ctx, [[px - 30, 470], [px + 10, 440]], '#7A6A50', 4); }
    for (let i = 0; i < 26; i++) { const px = 300 + hash(i * 2.7) * 1400, py = 640 + hash(i * 4.9) * 220; zaadje(ctx, px, py, 1.6, { a: i < 20 ? 0.3 : 1, rot: hash(i) * 3 }); }
    for (const [px, py, r] of [[520, 780, 0.3], [1480, 700, -0.4], [1180, 840, 0.9]]) tribulus(ctx, px, py, 0.9, { rot: r });
    grondvink(ctx, 900, 780, 2.2, { snavel: 9.3, pik: 1 });
    text(ctx, 'in het jaar 1977', 1300, 230, fTitel(64), C.text, 'left'); metaText(ctx, 'bijna geen regen', 1300, 280, C.grain, 'left', 28);
    evoSchaal(ctx, 'zaadjes vergroot · 1 vink = 12,5 cm'); },
  e2s11(ctx) { macroNacht(ctx, { horizon: 860, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 860, W, H); evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    const x = 560, y = 900, s = 5; grondvink(ctx, x, y, s, { snavel: 9.3, pik: 1 });
    tribulus(ctx, x + s * 64, y - s * 64, 1.0, { rot: 0.5 });
    naamBij(ctx, 'Tribulus', '± 8 mm · hard, met stekels', 1000, 420, 1, 'left');
    evoSchaal(ctx, 'op ware verhouding: snavel ± 9 mm'); },
  e2q12(ctx) { _vr2(ctx, 'e2q12'); },
  e2s13(ctx) { macroNacht(ctx, { horizon: 860, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 860, W, H); evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    const s = 3.3, tip = (x, y, sn) => { const hS = sn * 2.2, lS = hS * 1.2; const lx = 22 + lS, ly = hS * 0.12, th = 0.6; return [x + s * (26 + lx * Math.cos(th) - ly * Math.sin(th)), y + s * (-104 + lx * Math.sin(th) + ly * Math.cos(th))]; };
    grondvink(ctx, 520, 860, s, { snavel: 8, pik: 1 }); let [tx, ty] = tip(520, 860, 8); tribulus(ctx, tx + 22, ty + 6, 0.66, { rot: 0.3 });
    grondvink(ctx, 1300, 860, s, { snavel: 11, pik: 1, snavelKleur: C.goud }); [tx, ty] = tip(1300, 860, 11);
    tribulus(ctx, tx + 14, ty - 22, 0.66, { rot: -0.7 }); tribulus(ctx, tx + 44, ty + 26, 0.66, { rot: 1.4 }); zaadje(ctx, tx + 30, ty + 2, 0.9, { kleur: '#E8DCC0' });
    naamBij(ctx, 'lage snavel', 'krijgt het vruchtje niet open', 470, 300, 1, 'center');
    naamBij(ctx, 'hoge snavel', 'kraakt het vruchtje', 1290, 300, 1, 'center', C.goud);
    evoSchaal(ctx, 'snavel 8 mm tegenover 11 mm'); },
  e2s14(ctx) { evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    metaText(ctx, 'begin 1977', 200, 330, C.text2, 'left', 28); text(ctx, '± 1200', 200, 430, fTitel(110), rgba(C.text, 0.45), 'left');
    metaText(ctx, 'begin 1978', 200, 590, C.text2, 'left', 28); text(ctx, '± 180', 200, 690, fTitel(110), C.goud, 'left');
    pijl(ctx, 330, 470, 330, 540, C.line, 1, 4, 16);
    stipRaster(ctx, 900, 230, 15, 8, 66, 18, C.oker);
    naamBij(ctx, 'middelste grondvinken op Daphne Major', '1 stip = 10 vinken', 1360, 820, 1, 'center');
    evoSchaal(ctx, 'afgerond'); },
  e2s15(ctx) { evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    const x = 300, y = 800, w = 1200, h = 440, mm = (v) => (v - 7) / 5;
    histogram(ctx, x, y, w, h, mm(9.31), 0.17, { kleur: C.teal, a: 0.3 });
    histogram(ctx, x, y, w, h * 0.32, mm(9.84), 0.16, { kleur: C.teal });
    for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x + mm(v) * w, y + 44, C.text2, 'center', 28);
    metaText(ctx, 'snavelhoogte (mm)', x + w, y + 80, C.grain, 'right', 28);
    for (const [v, kl, lab, yy] of [[9.31, C.text2, 'vóór de droogte', y - h - 30], [9.84, C.goud, 'overlevers', y - h * 0.32 - 70]]) { ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + mm(v) * w, y); ctx.lineTo(x + mm(v) * w, yy + 10); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'vóór de droogte', 'gemiddeld 9,3 mm', x + mm(9.31) * w - 20, y - h - 50, 1, 'right', C.text2);
    naamBij(ctx, 'overlevers', 'gemiddeld 9,8 mm', x + mm(11.2) * w, y - h * 0.32 - 60, 1, 'left', C.goud);
    text(ctx, '+ ruim 0,5 mm', 1440, 300, fTekst(48, 700), C.goud, 'left'); },
  e2q16(ctx) { _vr2(ctx, 'e2q16'); },
  e2s17(ctx) { evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    const x = 300, y = 800, w = 1200, h = 420, mm = (v) => (v - 7) / 5;
    histogram(ctx, x, y, w, h, mm(9.70), 0.17, { kleur: C.teal, oud: { mu: mm(9.31), sd: 0.17 } });
    for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x + mm(v) * w, y + 44, C.text2, 'center', 28);
    metaText(ctx, 'snavelhoogte (mm)', x + w, y + 80, C.grain, 'right', 28);
    naamBij(ctx, '1976', 'ouders vóór de droogte', x + mm(8.1) * w, y - h * 0.62, 1, 'right', C.text2);
    naamBij(ctx, 'jongen van 1978', 'gemiddeld 9,7 mm', x + mm(10.6) * w, y - h * 0.75, 1, 'left', C.teal);
    pijl(ctx, x + mm(9.31) * w, y - h - 40, x + mm(9.70) * w, y - h - 40, C.goud, 1, 4, 14);
    evoSchaal(ctx, 'ongeveer 4 % hoger'); },
  e2s18(ctx) { evoTag(ctx, 2, 'DROOGTE OP DAPHNE MAJOR');
    pot(ctx, 600, 640, 1.1, { p: 0.45, n: 70, seed: 3, label: 'genenpool 1976' }); allelBalk(ctx, 430, 760, 340, 0.45, { procent: true });
    pot(ctx, 1320, 640, 1.1, { p: 0.6, n: 70, seed: 3, label: 'genenpool 1978' }); allelBalk(ctx, 1150, 760, 340, 0.6, { procent: true });
    pijl(ctx, 800, 480, 1110, 480, C.line, 1, 4, 18); metaText(ctx, 'één generatie', 955, 450, C.grain, 'center', 26);
    circ(ctx, 160, 210, 14, EVO.a1, EVO.a1R, 2); text(ctx, 'allel voor een hogere snavel', 190, 222, fTekst(36, 600), C.text, 'left');
    circ(ctx, 160, 266, 14, EVO.a2, EVO.a2R, 2); text(ctx, 'allel voor een lagere snavel', 190, 278, fTekst(36, 600), C.text, 'left');
    evoSchaal(ctx, 'vereenvoudigd · snavelhoogte hangt af van veel genen'); },
  // ---------------- H3 Wie wint?
  e2s19(ctx) { evoTag(ctx, 2, 'WIE WINT?');
    const k = (x, t, sub, ic) => tekstKaart(ctx, x, 260, 470, 440, t, { sub, icoon: ic });
    k(170, 'erfelijke variatie', 'snavels verschillen', (c, cx, cy) => { [8, 9.3, 11].forEach((v, i) => grondvink(c, cx - 140 + i * 130, cy + 60, 0.7, { snavel: v })); });
    k(725, 'overproductie', 'te veel jongen', (c, cx, cy) => nestje(c, cx, cy + 20, 2.2, 5));
    k(1280, 'selectiedruk', 'droogte 1977', (c, cx, cy) => { tribulus(c, cx - 40, cy + 30, 1.4, { rot: 0.2 }); tribulus(c, cx + 70, cy + 40, 1.1, { rot: -0.6 }); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(150, 720); ctx.lineTo(1770, 720); ctx.stroke(); },
  e2s20(ctx) { evoTag(ctx, 2, 'WIE WINT?');
    const k = (x, t, ic) => tekstKaart(ctx, x, 160, 470, 330, t, { icoon: ic });
    k(170, 'erfelijke variatie', (c, cx, cy) => { [8, 9.3, 11].forEach((v, i) => grondvink(c, cx - 140 + i * 130, cy + 50, 0.6, { snavel: v })); });
    k(725, 'overproductie', (c, cx, cy) => nestje(c, cx, cy + 10, 1.8, 5));
    k(1280, 'selectiedruk', (c, cx, cy) => { tribulus(c, cx - 30, cy + 20, 1.2, { rot: 0.2 }); tribulus(c, cx + 60, cy + 30, 0.9, { rot: -0.6 }); });
    haak(ctx, 170, 1750, 510, 'natuurlijke selectie', C.groen);
    grondvink(ctx, 820, 860, 1.3, { snavel: 11, snavelKleur: C.goud });
    naamBij(ctx, 'selectievoordeel', 'hoge snavel in een droog jaar', 1010, 770, 1, 'left', C.goud); },
  e2s21(ctx) { evoTag(ctx, 2, 'WIE WINT?');
    text(ctx, 'fitness', 140, 240, fTekst(56, 700), C.text); metaText(ctx, 'nakomelingen die zelf jongen krijgen', 140, 286, C.grain, 'left', 26);
    grondvink(ctx, 960, 420, 1.2, { snavel: 9.3 });
    const jong = [[560, 1], [760, 0], [960, 1], [1160, 1], [1360, 0]];
    jong.forEach(([jx, ok]) => { ctx.strokeStyle = rgba(C.line, ok ? 1 : 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 450); ctx.lineTo(jx, 560); ctx.stroke();
      if (ok) grondvink(ctx, jx, 680, 0.75, { snavel: 9 }); else gedimd(ctx, 0.35, (g) => grondvink(g, jx, 680, 0.75, { snavel: 9 }));
      if (ok) { for (let k = 0; k < 2; k++) { ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(jx, 700); ctx.lineTo(jx - 40 + k * 80, 760); ctx.stroke(); nestje(ctx, jx - 40 + k * 80, 800, 0.55, 3); } } });
    text(ctx, 'fitness = 3', 140, 560, fTekst(48, 700), C.groen, 'left'); metaText(ctx, '2 jongen tellen niet mee', 140, 606, C.grain, 'left', 26); },
  e2q22(ctx) { _vr2(ctx, 'e2q22'); },
  e2s23(ctx) { evoTag(ctx, 2, 'WIE WINT?');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 520); ctx.lineTo(1780, 520); ctx.stroke();
    grondvink(ctx, 520, 520, 1.7, { snavel: 10.5 }); naamBij(ctx, 'groot en sterk', 'leeft 10 jaar', 520, 580, 1, 'center');
    grondvink(ctx, 1340, 520, 1.2, { snavel: 9 }); naamBij(ctx, 'klein', 'leeft 4 jaar', 1340, 580, 1, 'center');
    for (let i = 0; i < 2; i++) grondvink(ctx, 420 + i * 200, 820, 0.62, { snavel: 10 });
    for (let i = 0; i < 6; i++) grondvink(ctx, 1060 + i * 116, 820, 0.62, { snavel: 9 });
    metaText(ctx, '2 broedende jongen', 520, 870, C.text2, 'center', 26); metaText(ctx, '6 broedende jongen', 1360, 870, C.groen, 'center', 26);
    naamBij(ctx, 'hoogste fitness', null, 1340, 270, 1, 'center', C.groen); },
  // ---------------- H4 Aangepast, zonder doel
  e2s24(ctx) { const pos = _struik(ctx); evoTag(ctx, 2, 'AANGEPAST, ZONDER DOEL');
    const bruineRups = (c, x, y) => { c.save(); c.translate(x - 4, y + 2); c.rotate(0.5); rups(c, 0, 0, 0.15, { kleur: '#8C6A48', krom: 0.4 }); c.restore(); };
    merel(ctx, 340, 724, 2.6, { pik: 0.35, prooi: bruineRups });
    const B = _struik.bl; rupsOpBlad(ctx, B[3], 0.4, { kleur: '#6BA872' }); rupsOpBlad(ctx, B[5], 0.4, { kleur: '#6BA872' }); rupsOpBlad(ctx, B[1], 0.4, { kleur: '#78A86A' });
    gedimd(ctx, 0.35, (g) => { rupsOpBlad(g, B[4], 0.4, { kleur: '#8C6A48' }); rupsOpBlad(g, B[2], 0.4, { kleur: '#8C6A48' }); });
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },
  e2s25(ctx) { _struik(ctx); evoTag(ctx, 2, 'AANGEPAST, ZONDER DOEL');
    const B = _struik.bl; for (const i of [1, 2, 3, 4, 5]) rupsOpBlad(ctx, B[i], 0.4, { kleur: i === 4 ? '#7AA86A' : '#6BA872' });
    text(ctx, 'adaptatie', 140, 240, fTekst(56, 700), C.text); metaText(ctx, 'erfelijk · door selectie algemeen geworden', 140, 286, C.grain, 'left', 26);
    const b3 = _struik.bl[3]; naamBij(ctx, 'camouflage', 'valt weg tegen het blad', b3.x + 120, b3.y + 140, 1, 'center');
    generatie(ctx, 20, 80, 880); },
  e2q26(ctx) { _vr2(ctx, 'e2q26'); },
  e2s27(ctx) { evoTag(ctx, 2, 'AANGEPAST, ZONDER DOEL');
    blad(ctx, 160, 520, 230, { kleur: '#A85A44', rot: -0.15 }); rups(ctx, 330, 505, 0.6, { kleur: '#6BA872', rot: -0.15 });
    const mis = ['Jongen erven wat de ouder nodig had', 'Selectie heeft een doel', 'Selectie maakt nieuwe allelen'];
    mis.forEach((m, i) => { roundRect(ctx, 820, 170 + i * 130, 960, 100, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, m, 860, 234 + i * 130, fTekst(38, 500), C.text2, 'left'); doorstreep(ctx, 850, 222 + i * 130, 1750, 222 + i * 130); });
    haak(ctx, 820, 1780, 580, 'Selectie kiest uit variatie die er al is', C.groen);
    metaText(ctx, 'nieuwe allelen: mutatie → zie de dna-reeks', 820, 760, C.grain, 'left', 26); },
  e2s28(ctx) { evoTag(ctx, 2, 'AANGEPAST, ZONDER DOEL');
    const x = 300, y = 780, w = 1300, h = 440, X = (j) => (j - 1975) / 12, Y = (v) => (v - 9) / 1;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'gemiddelde snavelhoogte (mm)', xt: [[X(1976), '1976'], [X(1978), '1978'], [X(1980), '1980'], [X(1982), '1982'], [X(1984), '1984'], [X(1986), '1986']], yt: [[Y(9.2), '9,2'], [Y(9.6), '9,6'], [Y(10), '10']] });
    const D = [[1975, 9.3], [1976, 9.31], [1977, 9.6], [1978, 9.7], [1980, 9.68], [1982, 9.64], [1983, 9.6], [1984, 9.45], [1985, 9.33], [1987, 9.3]];
    lijnPad(ctx, D.map(([j, v]) => [x + X(j) * w, y - Y(v) * h]), C.teal, 6);
    for (const [j, l] of [[1977, 'droogte 1977'], [1983, 'El Niño 1983']]) { ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + X(j) * w, y); ctx.lineTo(x + X(j) * w, y - h); ctx.stroke(); ctx.restore(); metaText(ctx, l, x + X(j) * w + 12, y - h + 10, C.goud, 'left', 26); }
    evoSchaal(ctx, 'vereenvoudigd · naar gibbs & grant 1987'); },
  // ---------------- Samenvatting
  e2s29(ctx) { evoTag(ctx, 2, 'SAMENVATTING');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 700); ctx.lineTo(1780, 700); ctx.stroke();
    blad(ctx, 200, 560, 170, { rot: -0.1 }); rups(ctx, 340, 548, 0.5, { kleur: '#6BA872', rot: -0.1 }); naamBij(ctx, 'rups: groen', 'camouflage', 370, 760, 1, 'center');
    grondvink(ctx, 960, 680, 1.6, { snavel: 11, snavelKleur: C.goud }); naamBij(ctx, 'vink: hoge snavel', 'in een droog jaar', 980, 760, 1, 'center');
    pot(ctx, 1520, 640, 0.95, { p: 0.6, n: 60, seed: 3 }); allelBalk(ctx, 1380, 670, 280, 0.6, { procent: false }); naamBij(ctx, 'de genenpool verandert', null, 1520, 790, 1, 'center');
    text(ctx, 'Niet de sterkste: de meeste nakomelingen die zelf jongen krijgen.', 140, 250, fTekst(44, 600), C.text, 'left'); },
  e2s30(ctx) { eindKaart(ctx, 2, ['Natuurlijke selectie: erfelijke variatie,', 'overproductie en selectiedruk.', 'Fitness: nakomelingen die zelf jongen krijgen.', 'Geen doel: de omgeving bepaalt het voordeel.'], 'Vormen van selectie'); },
};

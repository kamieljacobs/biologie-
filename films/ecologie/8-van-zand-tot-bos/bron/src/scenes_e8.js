// scenes_e8.js — film 8 'Van zand tot bos' (Ecologie v2): geanimeerde scènes op de goedgekeurde keyframes uit sb8.js
const _8R = (t, t0, d = 0.6) => ramp(t, t0, d);
const _8P = (t) => ramp(t, 0, 0.3); // personen snel in
function _8mini(ctx, x, y, s, B, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); e8Dossier(ctx, 0, 0, Object.assign({}, B, { a: (B.a ?? 1) * a })); ctx.restore(); }
function _8lijn(ctx, P, kl, lw) { if (P.length < 2) return; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _8gaai(ctx, t, t0, y, a = 1) { if (t < t0 || a <= 0.01) return; const x = -120 + (t - t0) * 300; if (x > W + 120) return; ecoGaai(ctx, x, y + Math.sin((t - t0) * 2) * 12, 3, { houding: 'vliegen', t, kijk: 1, a }); }

Object.assign(SCENES, {
  // titelkaart: alleen het beeld rechts (x ≥ 1170): blad 1 (kaal zand) en blad 6 (bos)
  title(ctx, t) { _8mini(ctx, 1170, 375, 0.43, B8[1]); _8mini(ctx, 1523, 375, 0.43, B8[6], _8R(t, 0.5, 0.8)); },

  // ================= Opening =================
  s01(ctx, t, q) {
    e8Zandvlakte(ctx, { wind: false, t }); a8.wind(ctx, 530, 860, t);
    const g = q.on('stukje', 1, 2.5); if (g > 0.01) e8Boven(ctx, 520, () => ecoGroveDen(ctx, 1590, 520, 0.7, { groei: 0.15 + 0.5 * g, a: Math.min(1, g * 3) }));
    naamBij(ctx, 'stuifzand', 'KOOTWIJKERZAND · VELUWE', 960, 200, q.on('zandvlakte'), 'center');
    const r = q.on('rand', 1, 0.9); if (r > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1750, 400, 200, 150, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * r); ctx.stroke(); }
    naamBij(ctx, 'bomen rukken op', null, 1700, 640, q.on('stukje'), 'center');
  },
  s02(ctx, t, q) {
    e8Zandvlakte(ctx, { wind: false, t }); a8.wind(ctx, 530, 860, t, 10, 0.6);
    const p = q.on('paaltje', 1, 0.5); if (p > 0.01) e8Paaltje(ctx, 960, 780, '23', 1.6 * p);
    const t0 = 0.3, tw = 3.4, tt = t - t0, h = 360;
    const vb = gangSnelheid('bas', h, 'loop'), vv = gangSnelheid('buurvrouw', h, 'loop');
    if (tt < tw) { _bas8(ctx, 1240 + vb * tw, 820, h, { zij: true, gang: 'loop', vooruit: true, kijk: -1, t: Math.max(0, tt), a: _8R(t, t0, 0.3) }); _daan8(ctx, 700 - vv * tw, 820, h, { zij: true, gang: 'loop', vooruit: true, kijk: 1, t: Math.max(0, tt), a: _8R(t, t0, 0.3) }); }
    else { _bas8(ctx, 1240, 820, h, { pose: q.on('ecologen') > 0.5 ? 'wijs' : 'staan', kijk: -1, t }); _daan8(ctx, 700, 820, h, { pose: 'vasthouden', t, hold: (c, x, y) => _map8(c, x, y) }); }
    const v = q.on('hoe', 1, 0.6); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; text(ctx, 'Hoe wordt kaal zand', W / 2, 230, fTekst(56, 700), C.text, 'center'); text(ctx, 'vanzelf een bos?', W / 2, 300, fTekst(56, 700), C.text, 'center'); ctx.restore(); }
  },

  // ================= H1 De eerste bewoners =================
  s04(ctx, t, q) {
    e8Zandvlakte(ctx, { rand: false, wind: false, t }); a8.wind(ctx, 530, 860, t, 8, 0.5);
    const ts = q.at('stukje'); e8VierkantG(ctx, 960, 820, 760, 0, { touwA: _8R(t, ts + 0.8, 0.8), paalA: (i) => _8R(t, ts + i * 0.2, 0.4) });
    naamBij(ctx, '4 bij 4 meter', 'MEETVIERKANT · VOORBEELD', 960, 560, q.on('vier'), 'center');
    _bas8(ctx, 360, 860, 360, { pose: q.on('stukje') > 0.5 ? 'wijs' : 'staan', t, a: _8P(t) }); _daan8(ctx, 1560, 860, 360, { kijk: -1, pose: 'vasthouden', t, a: _8P(t), hold: (c, x, y) => _map8(c, x, y) });
    _8mini(ctx, 1500, 110, 0.36, { blad: 1, soorten: [], humus: 0 }, q.on('soorten'));
  },
  s05(ctx, t, q) {
    _sch8(ctx, 'DE EERSTE BEWONERS');
    const hi = q.on('vijfenveertig', 1, 1), wa = q.on('water', 1, 0.6), st = q.on('stuift', 1, 1);
    e8Dossier(ctx, 160, 150, Object.assign({}, B8[1], { meters: { hitte: 0.95 * hi, vocht: 0.1, licht: 1, stuiven: 0.9 * st } }));
    a8.ring(ctx, 178, 440, 142, 240, wa * (1 - _8R(t, q.at('water') + 2.5, 0.6)));
    if (st > 0.01) a8.korrels(ctx, 100, 1000, 220, 860, t, 40, { a: st, snel: 260 });
    naamBij(ctx, 'meer dan 45 °C', 'AAN HET OPPERVLAK', 1100, 300, hi, 'left', C.koraal); naamBij(ctx, 'geen humus', 'HOUDT GEEN WATER VAST', 1100, 520, wa, 'left'); naamBij(ctx, 'het zand stuift', null, 1100, 740, st, 'left');
  },
  s06(ctx, t, q) { // vraag-alinea: een eikel op het hete, stuivende zand
    e8Zandvlakte(ctx, { wind: false, t }); a8.wind(ctx, 530, 860, t, 12, 0.8, 220);
    ctx.save(); ctx.strokeStyle = rgba(C.koraal, 0.25); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let x = 760; x <= 1160; x += 10) { const y = 700 - k * 26 + Math.sin(x / 30 + t * 3 + k) * 5; x === 760 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore();
    a8.eikel(ctx, 960, 790, 2.4); a8.korrels(ctx, 0, W, 760, 820, t, 30, { snel: 300 });
    vraagteken(ctx, 960, 560, q.on('eiken'), 120);
  },
  s08(ctx, t, q) {
    _sch8(ctx, 'DE EERSTE BEWONERS'); ctx.fillStyle = E8.zand; ctx.fillRect(0, 640, W, 200); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 640); ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 840, W, 240);
    a8.korrels(ctx, 0, W, 300, 620, t, 16, { a: q.on('zaden', 1, 0.6) * (1 - q.on('eerst', 1, 1)), snel: 180, kl: '#E8D8A8' });
    const bu = q.on('buntgras', 1, 1.5), al = q.on('algen', 1, 1.2), mo = q.on('mossen', 1, 1.5), ko = q.on('korstmossen', 1, 1.5);
    if (bu > 0.01) e8Buntgras(ctx, 360, 640, 8.5 * (0.3 + 0.7 * bu), { a: Math.min(1, bu * 3) });
    if (al > 0.01) { ctx.fillStyle = rgba(C.groen, 0.35 * al); ctx.fillRect(560, 632, 220, 8); }
    if (mo > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, mo * 3); e8Mos(ctx, 1100, 640, 220, 2.5 * (0.3 + 0.7 * mo)); ctx.restore(); }
    if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, ko * 3); e8Korstmos(ctx, 1560, 640, 4.2 * (0.3 + 0.7 * ko)); ctx.restore(); }
    naamBij(ctx, 'buntgras', 'EERST', 360, 720, bu, 'center'); naamBij(ctx, 'algen', 'EERST', 670, 720, al, 'center'); naamBij(ctx, 'mos', 'DAARNA', 1100, 720, mo, 'center'); naamBij(ctx, 'korstmos', 'DAARNA', 1560, 720, ko, 'center');
    a8.pijl(ctx, 820, 560, 1000, 560, q.on('daarna'), C.line, 1, 3, 14); metaText(ctx, 'NIET OP SCHAAL TEN OPZICHTE VAN ELKAAR', 80, 880, C.text2, 'left', 26);
  },
  s09(ctx, t, q) {
    _sch8(ctx, 'DE EERSTE BEWONERS'); e8Buntgras(ctx, 400, 760, 14, {}); naamBij(ctx, 'pioniersoort', null, 400, 860, q.on('pioniersoorten'), 'center');
    const wa = q.on('waaien', 1, 0.8); if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; ctx.fillStyle = E8.buntP; for (let i = 0; i < 12; i++) { const u = (t * 0.15 + hash(i * 3.3)) % 1; ctx.beginPath(); ctx.arc(420 + u * 340, 400 - u * 180 + Math.sin(t * 2 + i) * 14 + hash(i) * 60, 3, 0, 6.283); ctx.globalAlpha = wa * Math.min(1, (1 - u) * 4); ctx.fill(); } ctx.restore(); }
    const K = ['brede tolerantie: hitte, droogte, arme bodem', 'veel kleine zaden of sporen', 'die ver waaien', 'en lang kiemkrachtig blijven'], cue = ['brede', 'kleine', 'waaien', 'kiemkrachtig'];
    K.forEach((k, i) => regel(ctx, '· ' + k, 760, 300 + i * 70, q.on(cue[i]), C.text, 40, 'left', 600));
    const tl = q.on('tolerantie', 1, 2);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(760, 820); ctx.lineTo(1680, 820); ctx.stroke(); metaText(ctx, 'TEMPERATUUR, DROOGTE →', 1680, 860, C.text2, 'right', 26);
    const kromme = (x0, w, kl) => { if (tl <= 0.01) return; ctx.strokeStyle = kl; ctx.lineWidth = 4; ctx.beginPath(); for (let u = 0; u <= tl + 1e-6; u += 0.02) { const xx = 760 + u * 900, yy = 820 - 180 * Math.exp(-Math.pow((u - x0) / w, 2)); u ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); };
    kromme(0.5, 0.33, C.groen); kromme(0.5, 0.09, C.text2); naamBij(ctx, 'smal', null, 1260, 610, _8R(tl, 0.6, 0.3), 'center', C.text2); naamBij(ctx, 'breed: pioniersoort', null, 1000, 760, _8R(tl, 0.4, 0.3), 'right', C.groen);
  },
  s10(ctx, t, q) {
    _sch8(ctx, 'DE EERSTE BEWONERS'); ctx.fillStyle = E8.zand; ctx.fillRect(0, 560, W, 340); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 560);
    a8.korrels(ctx, 0, 1300, 520, 556, t, 26, { snel: 200, stop: 590, a: 0.9 });
    const ov = q.on('overstoven', 1, 2), dh = q.on('doorheen', 1, 2.2);
    e8Buntgras(ctx, 700, 560, 12, { wortels: true }); e8Buntgras(ctx, 1300, 560, 12, { overstoven: 4 * ov });
    if (dh > 0.01) e8Buntgras(ctx, 1300, 560 - 4 * ov * 12, 12 * 0.55 * dh, { pluim: false, a: Math.min(1, dh * 3) });
    ctx.save(); ctx.strokeStyle = rgba(E8.zandL, 0.7); ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const y = 420 + i * 22, dx = ((t * 90 + i * 37) % 160) - 80; ctx.beginPath(); ctx.moveTo(1000 + dx, y); ctx.bezierCurveTo(1080 + dx, y - 10, 1150 + dx, y + 8, 1220 + dx, y); ctx.stroke(); } ctx.restore();
    naamBij(ctx, 'wortels houden het zand vast', null, 700, 860, q.on('wortels'), 'center'); naamBij(ctx, 'overstoven: groeit erdoorheen', null, 1300, 860, ov, 'center');
  },

  // ================= H2 Pioniers veranderen de plek =================
  s11(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); e8Dossier(ctx, 120, 150, Object.assign({}, B8[1], { a: 1 - 0.65 * q.on('blad', 1, 0.8) }));
    const b = q.on('blad', 1, 0.8), n = Math.floor(4 * q.on('gegroeid', 1, 2.4) + 1e-6);
    e8Dossier(ctx, lerp(1500, 1040, b), 150, Object.assign({}, B8[3], { stadium: n ? 3 : 0, a: b, humus: 22 * q.on('humus', 1, 1.6), soorten: B8[3].soorten.slice(0, n) }));
    const tj = q.on('tien'); a8.pijl(ctx, 900, 530, 1020, 530, tj, C.goud, 1, 4, 16); naamBij(ctx, '± 10 jaar', 'LATER', 960, 600, tj, 'center', C.goud);
    a8.ring(ctx, 1060, 444, 136, 34, q.on('bodemprofiel'));
  },
  s12(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); e8Profiel(ctx, 200, 260, 260, 460, 60, {});
    const rij = [['vocht', 0.1, 0.4, C.teal, 'water'], ['voedingsstoffen', 0.05, 0.3, C.groen, 'voedingsstoffen'], ['stuiven', 0.9, 0.3, E8.zand, 'stuift'], ['hitte', 0.95, 0.6, C.koraal, 'koeler']];
    rij.forEach(([n, a, b, kl, cue], i) => { const y = 300 + i * 130, u = q.on(cue, 1, 1.4); e8Meter(ctx, 700, y, 700, n.toUpperCase(), lerp(a, b, u), kl); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(700 + 700 * a, y - 6); ctx.lineTo(700 + 700 * a, y + 24); ctx.stroke(); ctx.setLineDash([]); regel(ctx, b > a ? 'omhoog' : 'omlaag', 1440, y + 18, _8R(u, 0.7, 0.3), b > a ? C.groen : C.koraal, 36, 'left', 700); });
    haak(ctx, 700, 1400, 820, 'pioniers veranderen de abiotische factoren', C.groen, q.on('abiotische'));
  },
  s13(ctx, t, q) {
    e8Zandvlakte(ctx, { rand: false, wind: false, t });
    const he = q.on('struikheide', 1, 2.2), de = q.on('zaailingen', 1, 2.2);
    e8VierkantG(ctx, 960, 840, 1100, 3, { seed: 3, g: { heide: he, den: de } });
    naamBij(ctx, 'struikheide', null, 600, 520, he, 'center'); naamBij(ctx, 'jonge grove den', null, 1300, 520, de, 'center');
  },
  s14(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); const bl = q.on('bladert', 1, 0.8);
    _8mini(ctx, 700, 170, 0.85, B8[3], 1 - bl); _8mini(ctx, 700, 170, 0.85, Object.assign({}, B8[4], { nadruk: 'korstmos' }), bl);
    _bas8(ctx, 380, 880, 400, { pose: q.on('wijst') > 0.5 ? 'wijs' : 'staan', t, a: _8P(t) }); _daan8(ctx, 1640, 880, 400, { kijk: -1, t, a: _8P(t) });
    a8.ring(ctx, 710, 712, 300, 50, q.on('metingen'));
  },
  s15(ctx, t, q) { // vraag-alinea: blad 3 naast blad 4
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK');
    _8mini(ctx, 220, 200, 0.75, Object.assign({}, B8[3], { nadruk: q.on('buntgras') > 0.5 ? 'buntgras' : null })); _8mini(ctx, 1130, 200, 0.75, B8[4], _8R(t, 0.3, 0.6));
    vraagteken(ctx, 960, 190, q.on('verdwenen'), 110);
  },
  s17(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); ctx.fillStyle = E8.humusL; ctx.fillRect(0, 760, W, H - 760);
    const gr = q.on('groeien', 1, 2.5), vl = q.on('verliest', 1, 2), vd = q.on('verdwijnt', 1, 2), li = q.on('licht', 1, 0.8);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip(); ecoStruikheide(ctx, 640, 760, 5 * (0.75 + 0.25 * gr), {}); ecoGroveDen(ctx, 1100, 760, 1.6, { groei: 0.4 + 0.2 * gr }); ctx.restore();
    e8Buntgras(ctx, 860, 760, 8, { a: 1 - 0.45 * vl - 0.25 * vd });
    for (let i = 0; i < 6; i++) { const x1 = 700 + i * 70, y2 = lerp(480, 420, gr); a8.pijl(ctx, x1, 150, x1 + 60 * (y2 - 150) / 330, y2, 1, rgba(C.goud, 0.6), 0.6 + 0.4 * li, 3, 12); }
    naamBij(ctx, 'licht', null, 860, 120, 1, 'center', C.goud);
    naamBij(ctx, 'buntgras in de schaduw', 'VERLIEST DE CONCURRENTIE', 860, 860, vl, 'center'); naamBij(ctx, 'heide', null, 520, 600, q.on('heide'), 'center'); naamBij(ctx, 'grove den', null, 1260, 380, q.on('heide'), 'left');
  },
  s18(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK');
    [B8[1], B8[3], B8[4], { blad: '?', soorten: [], a: 0.3 }].forEach((B, i) => _8mini(ctx, 140 + i * 430, 180, 0.5, B, _8R(t, i * 0.3, 0.5)));
    const st = Math.floor(3 * q.on('successie', 1, 2.4) + 1e-6) - 1; e8Balk(ctx, 160, 700, 1600, st);
    haak(ctx, 160, 1760, 780, 'successie · primair: op kale grond', C.groen, q.on('primaire'));
  },
  s19(ctx, t, q) {
    _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK');
    const kol = ['blad 1', 'blad 2', 'blad 3', 'blad 4', 'blad 5', 'blad 6'], rij = [['korstmos', [0, 20, 30, 5, 0, 0]], ['buntgras', [0, 15, 25, 0, 0, 0]], ['struikheide', [0, 0, 20, 60, 10, 0]], ['grove den', [0, 0, 5, 25, 60, 10]]];
    const x0 = 500, y0 = 280, cw = 200, rh = 100, tb = q.at('bedekt'), hk = q.on('korstmos') * (1 - _8R(t, q.at('heide'), 0.5)), hh = q.on('heide');
    metaText(ctx, 'BEDEKKING IN PROCENT · VOORBEELD', x0 - 340, y0 - 80, C.text2, 'left', 26);
    kol.forEach((k, j) => text(ctx, k, x0 + j * cw + cw / 2, y0 - 20, fTekst(36, 600), C.text2, 'center'));
    rij.forEach(([n, v], i) => { const y = y0 + i * rh, hl = i < 2 ? hk : hh; if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x0 - 360, y + 4, 360 + 6 * cw, rh - 8, 10); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); ctx.restore(); }
      text(ctx, n, x0 - 340, y + 62, fTekst(40, 600), C.text, 'left');
      v.forEach((p, j) => regel(ctx, String(p), x0 + j * cw + cw / 2, y + 62, _8R(t, tb + j * 0.35, 0.4), p ? C.text : C.text2, 44, 'center', 700));
      ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 - 340, y + rh); ctx.lineTo(x0 + 6 * cw, y + rh); ctx.stroke(); });
  },

  // ================= H3 Is het bos ooit af? =================
  s20(ctx, t, q) {
    e8Zandvlakte(ctx, { rand: true, wind: false, t });
    const P = [[420, 780, 'open zand', 0], [820, 640, 'heide', 4], [1220, 720, 'jong dennenbos', 5], [1600, 600, 'oud bos', 6]], tp = q.at('plekken');
    P.forEach(([x, y, n, st], i) => { const a = i === 0 ? 1 : _8R(t, tp + i * 0.5, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; e8Vierkant(ctx, x, y, 260, st, { seed: st + 2 }); ctx.restore(); naamBij(ctx, n, null, x, y + 50, a, 'center'); });
    naamBij(ctx, 'vier meetplekken', 'VERSCHILLENDE LEEFTIJD', 960, 200, q.on('leeftijd'), 'center');
  },
  s21(ctx, t, q) {
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3428'; ctx.fillRect(0, 780, W, H - 780); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
    for (const [x, s, b] of [[160, 2.6, 0], [480, 2.4, 1], [820, 2.8, 0], [1500, 2.5, 1], [1800, 2.7, 0]]) (b ? ecoBerk : ecoGroveDen)(ctx, x, 780, s, { wind: 0.3, t: t * 0.15 + x });
    const ki = q.on('kiemen', 1, 2.5), ni = q.on('niet', 1, 1.5);
    for (const x of [620, 1050, 1250]) { a8.eikel(ctx, x + 18, 782, 0.8, 1 - ki); if (ki > 0.01) ecoZomereik(ctx, x, 780, 0.6, { groei: 0.05 + 0.2 * ki, a: Math.min(1, ki * 3) }); }
    for (const x of [930, 1380]) ecoGroveDen(ctx, x, 780, 0.5, { groei: 0.08, a: 1 - ni * 0.85 });
    ctx.restore(); naamBij(ctx, 'jonge eiken', 'VERDRAGEN WAT SCHADUW', 1080, 730, q.on('jonge'), 'left');
  },
  s22(ctx, t, q) {
    _sch8(ctx, 'IS HET BOS OOIT AF?');
    const n = (q.on('eiken') > 0.5 ? 1 : 0) + (q.on('beuk') > 0.5 ? 1 : 0) + (q.on('soortenlijst') > 0.5 ? 2 : 0);
    e8Dossier(ctx, 160, 150, Object.assign({}, B8[6], { humus: 20 + 90 * q.on('bodem', 1, 1.5), soorten: B8[6].soorten.slice(0, Math.max(1, n)) }));
    naamBij(ctx, 'climaxecosysteem?', null, 1340, 420, q.on('climax'), 'center', C.goud); naamBij(ctx, 'dikke humuslaag', null, 1340, 560, q.on('dik'), 'center'); naamBij(ctx, 'weinig licht op de grond', null, 1340, 680, q.on('eiken'), 'center');
  },
  s23(ctx, t, q) { // vraag-alinea: het eikenbos van blad zes
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3428'; ctx.fillRect(0, 780, W, H - 780); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
    for (const [x, s] of [[160, 2.1], [560, 2.4], [1000, 2.2], [1420, 2.5], [1800, 2.1]]) ecoZomereik(ctx, x, 780, s, { wind: 0.3, t: t * 0.15 + x });
    ctx.restore(); vraagteken(ctx, 960, 200, q.on('af'), 120);
  },
  s25(ctx, t, q) {
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3428'; ctx.fillRect(0, 780, W, H - 780); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
    const sm = q.on('storm', 1, 0.4), f = q.on('storm', 1, 2.4), li = q.on('licht', 1, 1), pi = q.on('pioniers', 1, 2.5), wnd = sm * (1 - _8R(t, q.at('storm') + 3, 1));
    for (const x of [140, 420, 1820]) ecoZomereik(ctx, x, 780, 2.2, { wind: 0.3 + 1.2 * wnd, t: t * 0.3 + x });
    ctx.save(); ctx.translate(1010, 780); ctx.rotate(1.45 * f * f); ecoZomereik(ctx, 0, 0, 2.2, { wind: 0.3 + 1.2 * wnd * (1 - f), t: t * 0.3 }); ctx.restore();
    if (wnd > 0.01) { ctx.save(); ctx.globalAlpha *= wnd; ctx.strokeStyle = rgba('#C8D2DE', 0.4); ctx.lineWidth = 2.5; for (let i = 0; i < 14; i++) { const x = ((hash(i * 3.1) * 2300 + t * 500) % 2300) - 200, y = 150 + hash(i * 2.2) * 550; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 60, y - 12, x + 120, y + 6, x + 200, y - 8); ctx.stroke(); } ctx.restore(); }
    for (let i = 0; i < 5; i++) if (pi > 0.01) ecoBerk(ctx, 620 + i * 90, 780, 0.6, { groei: 0.05 + 0.25 * pi, a: Math.min(1, pi * 3) });
    for (let i = 0; i < 6; i++) a8.pijl(ctx, 600 + i * 90, 120, 620 + i * 90, 560, li, rgba(C.goud, 0.5), 1, 3, 12);
    ctx.restore(); naamBij(ctx, 'omgewaaide eik', null, 1340, 680, _8R(t, q.at('storm') + 2, 0.6), 'center'); naamBij(ctx, 'licht in het gat', 'PIONIERS BEGINNEN OPNIEUW', 820, 860, li, 'center');
  },
  s26(ctx, t, q) {
    _sch8(ctx, 'IS HET BOS OOIT AF?'); const gx = 300, gy = 760, gw = 1300, gh = 440; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    metaText(ctx, 'AANDEEL EIK IN HET BOS · VOORBEELD', gx, gy - gh - 20, C.text2, 'left', 26); metaText(ctx, 'JAREN →', gx + gw, gy + 44, C.text2, 'right', 26); for (let v = 0; v <= 100; v += 50) metaText(ctx, v + ' %', gx - 14, gy - v / 100 * gh + 9, C.text2, 'right', 26);
    const fr = clamp((t - 0.3) / Math.max(4, q.at('grenzen') - 0.3), 0, 1), P = []; for (let i = 0; i <= 60 * fr; i++) { const u = i / 60; let v = 0.62 + 0.05 * Math.sin(u * 23) + 0.03 * Math.sin(u * 51); if (u > 0.45 && u < 0.6) v -= 0.18 * Math.sin((u - 0.45) / 0.15 * Math.PI); P.push([gx + u * gw, gy - v * gh]); }
    _8lijn(ctx, P, C.groen, 5); if (P.length) circ(ctx, P[P.length - 1][0], P[P.length - 1][1], 7, C.groen);
    const gb = q.on('grenzen', 1, 0.8); if (gb > 0.01) { ctx.save(); ctx.globalAlpha *= gb; ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 2; for (const v of [0.5, 0.72]) { ctx.beginPath(); ctx.moveTo(gx, gy - v * gh); ctx.lineTo(gx + gw, gy - v * gh); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
    naamBij(ctx, 'storm', null, gx + 0.52 * gw, gy - 0.32 * gh, _8R(fr, 0.55, 0.05), 'center', C.koraal); haak(ctx, gx, gx + gw, gy + 70, 'biologisch evenwicht: schommelt binnen grenzen', C.groen, q.on('evenwicht'));
  },
  s27(ctx, t, q) {
    e8Zandvlakte(ctx, { wind: false, t });
    const ka = q.on('kappen', 1, 1.6); ctx.save(); ctx.translate(560, 820); ctx.rotate(-1.45 * ka * ka); e8Boven(ctx, 0, () => ecoGroveDen(ctx, 0, 0, 1.0, {})); ctx.restore(); e8Boven(ctx, 820, () => ecoGroveDen(ctx, 360, 820, 1.2, {}));
    _bas8(ctx, 760, 840, 330, { pose: q.on('beheerders') > 0.5 ? 'wijs' : 'staan', t, a: _8P(t) });
    ctx.fillStyle = '#4E5A40'; ctx.fillRect(1000, 760, 920, 140); for (let i = 0; i < 26; i++) { const hx = 1010 + hash(i * 2.7) * 900, hy = 790 + hash(i * 3.1) * 100; e8Boven(ctx, hy, () => ecoStruikheide(ctx, hx, hy, 1.6, {})); }
    const bo = q.on('boompjes', 1, 2); for (let i = 0; i < 4; i++) e8Boven(ctx, 800, () => ecoBerk(ctx, 1150 + i * 210, 800, 0.35, { groei: 0.15, a: 1 - bo }));
    for (let i = 0; i < 3; i++) ecoSchaap(ctx, 1200 + i * 230 + Math.sin(t * 0.3 + i) * 6, 860 + (i % 2) * 30, 1.8, { houding: 'grazen', kijk: i % 2 ? -1 : 1, t: t + i });
    naamBij(ctx, 'bomen kappen', 'ZAND OPEN HOUDEN', 520, 520, ka, 'center'); naamBij(ctx, 'schapen op de heide', 'ETEN JONGE BOOMPJES', 1450, 560, q.on('schapen'), 'center');
  },
  s28(ctx, t, q) {
    _sch8(ctx, 'IS HET BOS OOIT AF?');
    for (let i = 0; i < 6; i++) { const a = _8R(t, i * 0.25, 0.5); _8mini(ctx, 200 + i * 260, 160, 0.3, B8[[1, 3, 3, 4, 6, 6][i]], a); regel(ctx, 'blad ' + (i + 1), 314 + i * 260, 420, a, C.text2, 36, 'center', 600); }
    const gx = 200, gy = 820, gw = 1560, gh = 300, f1 = q.on('hitte', 1, 3), f2 = q.on('concurrentie', 1, 3);
    _8lijn(ctx, Array.from({ length: Math.floor(20 * f1) + 1 }, (_, i) => [gx + i / 20 * gw, gy - gh * (0.95 - 0.85 * i / 20)]), C.koraal, 5);
    _8lijn(ctx, Array.from({ length: Math.floor(20 * f2) + 1 }, (_, i) => [gx + i / 20 * gw, gy - gh * (0.1 + 0.85 * i / 20)]), C.groen, 5);
    naamBij(ctx, 'invloed abiotisch', 'HITTE · DROOGTE · STUIVEN', gx + 30, gy - gh - 10, q.on('hitte'), 'left', C.koraal); naamBij(ctx, 'invloed concurrentie', 'BIOTISCH', gx + gw - 30, gy - gh - 10, q.on('concurrentie'), 'right', C.groen);
  },

  // ================= H4 Na de brand =================
  s29(ctx, t, q) {
    e8BrandA(ctx, { rook: 1, t }); naamBij(ctx, 'Strabrechtse Heide', 'IN HET JAAR 2010 · ± 150 HECTARE', 960, 200, q.on('strabrechtse'), 'center');
  },
  s30(ctx, t, q) {
    _sch8(ctx, 'NA DE BRAND'); e8Dossier(ctx, 120, 150, B8[1]);
    const b = q.on('tweede', 1, 0.8); e8Dossier(ctx, lerp(1500, 1040, b), 150, { a: b, blad: 1, titel: 'BRANDPLEK · BLAD 1', brand: 0, humus: 90, zaden: true, wortels: true, as: true, soorten: [], meters: { hitte: 0.7, vocht: 0.5, licht: 1, stuiven: 0.1 } });
    const r = q.on('bodemprofiel'); a8.ring(ctx, 138, 440, 140, 236, r); a8.ring(ctx, 1058, 440, 140, 236, r);
  },
  s31(ctx, t, q) { // vraag-alinea: de twee bodemprofielen naast elkaar
    _sch8(ctx, 'NA DE BRAND'); e8Profiel(ctx, 600, 300, 260, 460, 0, { label: false }); e8Profiel(ctx, 1060, 300, 260, 460, 160, { zaden: true, wortels: true, as: true, label: false });
    naamBij(ctx, 'kaal zand', null, 730, 820, 1, 'center'); naamBij(ctx, 'brandplek', null, 1190, 820, 1, 'center');
    vraagteken(ctx, 960, 220, q.on('zand'), 110);
  },
  s33(ctx, t, q) {
    _sch8(ctx, 'NA DE BRAND'); e8Profiel(ctx, 560, 200, 800, 620, 300, { zaden: true, wortels: true, as: true, label: false });
    const lo = q.on('lopen', 1, 2.5); for (let i = 0; i < 3; i++) a8.scheut(ctx, 560 + 800 * (0.2 + i * 0.3), 200, 90, clamp(lo * 1.3 - i * 0.15, 0, 1));
    const zb = q.on('zaadbank'); if (zb > 0.01) for (let i = 0; i < 14; i++) { const zx = 570 + hash(i * 3.7) * 780, zy = 206 + hash(i * 5.1) * 292; circ(ctx, zx, zy, 9 + 2 * Math.sin(t * 3 + i), null, rgba(C.goud, 0.7 * zb), 2); }
    naamBij(ctx, 'zwarte laag', q.on('mineralen') > 0.5 ? 'AS · WAT EXTRA MINERALEN' : null, 1400, 214, 1, 'left'); naamBij(ctx, 'humus', 'HOUDT WATER VAST', 1400, 360, q.on('humus'), 'left'); naamBij(ctx, 'zaadbank', 'ZADEN VAN HEIDE', 1400, 470, zb, 'left', C.goud); naamBij(ctx, 'wortels', 'LOPEN WEER UIT', 1400, 580, q.on('wortels'), 'left'); naamBij(ctx, 'zand', null, 1400, 740, 1, 'left');
  },
  s34(ctx, t, q) {
    const be = q.on('berken', 1, 3); e8BrandA(ctx, { gh: q.on('heide', 1, 3), gb: be, t, zwart: 1 - 0.6 * q.on('heide', 1, 3) });
    a8.korrels(ctx, 0, W, 260, 760, t, 26, { a: be * (1 - _8R(t, q.at('secundaire'), 1)), snel: 150, kl: '#E8E2D2' });
    naamBij(ctx, 'een jaar later', 'HEIDE UIT DE ZAADBANK · BERK WAAIT AAN', 960, 200, _8R(t, 0, 0.6), 'center'); naamBij(ctx, 'secundaire successie', 'VEEL SNELLER DAN PRIMAIR', 960, 300, q.on('secundaire'), 'center', C.groen);
  },
  s35(ctx, t, q) {
    _sch8(ctx, 'NA DE BRAND'); const T = ['eerste jaren', 'na een paar jaar', 'na een paar jaar meer', 'na tientallen jaren'], cue = ['eerste', 'grassen', 'struiken', 'bomen'];
    for (let i = 0; i < 4; i++) { const a = i === 0 ? 1 : q.on(cue[i], 1, 0.6); if (a <= 0.01) continue; ctx.save(); ctx.globalAlpha *= a; e8Akker(ctx, 120 + i * 440, 640, 400, i); ctx.restore(); regel(ctx, T[i], 320 + i * 440, 760, a, C.text, 36, 'center', 600); }
    naamBij(ctx, 'verlaten akker', 'SECUNDAIRE SUCCESSIE', 960, 220, q.on('akker'), 'center');
  },
  s36(ctx, t, q) {
    e8Zandvlakte(ctx, { wind: false, t }); const tm = q.at('meegenomen'), vd = q.on('verdringen', 1, 2), gr = _8R(t, tm, 6);
    for (const [x, y] of [[420, 720], [1450, 680], [1600, 800]]) { ctx.save(); ctx.globalAlpha *= 1 - 0.6 * vd; e8Korstmos(ctx, x, y, 3 * (1 - 0.3 * vd)); ctx.restore(); }
    e8MosTapijt(ctx, 960, 720, 480, 100, gr, t); e8MosTapijt(ctx, 520, 820, 160, 34, _8R(t, tm + 3, 3)); e8MosTapijt(ctx, 1380, 830, 200, 36, _8R(t, tm + 2, 3));
    naamBij(ctx, 'uitheems mos', 'INVASIEVE EXOOT · DICHT TAPIJT', 960, 570, q.on('exoot'), 'center');
    card(ctx, 1260, 140, 580, 150, 'meer hierover', 'in de film Ingrijpen of laten gaan?', q.on('film'));
  },

  // ================= Samenvatting =================
  s37(ctx, t, q) {
    _sch8(ctx, 'SAMENVATTING');
    for (let i = 0; i < 4; i++) _8mini(ctx, 140 + i * 300, 150, 0.36, B8[[1, 3, 4, 6][i]], _8R(t, i * 0.2, 0.5));
    const br = q.on('brand'); _8mini(ctx, 1400, 150, 0.36, { blad: 1, titel: 'BRANDPLEK · BLAD 1', brand: 1, humus: 90, zaden: true, meters: { hitte: 0.6, vocht: 0.5, licht: 1, stuiven: 0.1 } }, Math.max(0.35, br)); a8.ring(ctx, 1396, 146, 282, 282, br * (1 - _8R(t, q.at('brand') + 3, 0.6)));
    const st = q.on('evenwicht') > 0.5 ? 4 : q.on('wegconcurreren') > 0.5 ? 3 : q.on('pioniers') > 0.5 ? 1 : q.on('kaal') > 0.5 ? 0 : -1; e8Balk(ctx, 160, 520, 1600, st);
    naamBij(ctx, 'primair: honderden jaren', null, 560, 680, q.on('pioniers'), 'center'); naamBij(ctx, 'secundair: veel sneller', null, 1540, 680, br, 'center');
    if (q.on('paaltje') > 0.01) e8Paaltje(ctx, 1780, 860, '23', q.on('paaltje', 1, 0.5));
  },
  s38(ctx, t, q) { // de plek verandert zichzelf: het meetvierkant in versneld tempo van zand tot bos
    e8Zandvlakte(ctx, { rand: true, wind: false, t });
    const st = Math.min(6, Math.floor(7 * _8R(t, 0.2, 3.8) + 1e-6)); e8VierkantG(ctx, 900, 820, 900, st, { seed: 5 }); e8Paaltje(ctx, 1460, 840, '23', 1.2);
  },
});

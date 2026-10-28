// Hormonen 2 · Suiker in balans — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

const PERSON_LOOK = { skin: SKINS[1], hair: '#3B2E28', shirt: '#5A7FA0', hairStyle: 'short' };
const SANNE = { skin: SKINS[0], hair: '#7A4E2E', shirt: '#B36A5E', hairStyle: 'long' };
const JIJ = { skin: SKINS[3], hair: '#2B2420', shirt: '#4F7A6A', hairStyle: 'curly' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function fade(q, w1, n1, w2, n2) { return q.on(w1, n1) * (1 - q.on(w2, n2)); }
const ALFA = C.groen, BETA = HK.klierR;

// glucose in mmol/L over een dag (0..24 uur): maaltijden om 8, 12.5 en 18.5 uur
function dagGlucose(h) { let v = 4.8; for (const [m, p] of [[8, 2.4], [12.5, 2.0], [18.5, 2.6]]) { const d = h - m; if (d > 0) v += p * (d / 0.75) * Math.exp(1 - d / 0.75); } if (h > 23 || h < 6) v -= 0.3; return v; }
// regelkring voor glucose
function glucoseKring(ctx, o = {}) { const { a = 1, nA = [1, 1, 1, 1], arr = [1, 1, 1, 1], minus = 0, pulse = -1, broken = {}, thin = {}, hormoon = 'insuline', cx = 960, cy = 470, rx = 560, sc = 1 } = o;
  const nodes = [{ t: 'bloedglucose', s: 'normwaarde ≈ 4–8 mmol/L', col: HK.glucose, a: nA[0], rol: 'WAARDE' },
    { t: 'bèta- en alfacellen', s: 'eilandjes van Langerhans', col: HK.klier, a: nA[1], rol: 'SENSOR + REGELCENTRUM' },
    { t: hormoon === 'glucagon' ? 'glucagon' : hormoon === 'beide' ? 'insuline · glucagon' : 'insuline', s: 'in het bloed', col: HK.hormoon, a: nA[2], rol: 'SIGNAAL' },
    { t: 'lever · spieren · vet', s: 'doelorganen', col: C.koraal, a: nA[3], rol: 'EFFECTOR' }];
  return kringSchema(ctx, cx, cy, { a, nodes, arr, minus, pulse, broken, thin, rx, ry: 290, bw: 430, bh: 120 }); }
// hersenen = hoofd in doorsnede uit de beeldbank (lib_bio hoofdHersenen) i.p.v. een paarse ovaal met boogjes (prompt v13 C7)
function hersenIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hoofdHersenen(ctx, x + 10 * s, y + 40 * s, 0.3 * s, {}); ctx.restore(); }
function klontje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(x - 50 * s, y - 20 * s); ctx.lineTo(x + 10 * s, y - 50 * s); ctx.lineTo(x + 60 * s, y - 20 * s); ctx.lineTo(x + 60 * s, y + 40 * s); ctx.lineTo(x, y + 70 * s); ctx.lineTo(x - 50 * s, y + 40 * s); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#C9C2B4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 50 * s, y - 20 * s); ctx.lineTo(x, y + 10 * s); ctx.lineTo(x + 60 * s, y - 20 * s); ctx.moveTo(x, y + 10 * s); ctx.lineTo(x, y + 70 * s); ctx.stroke(); ctx.restore(); }
function dextro(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 34, y - 34, 68, 68, 10); shape(ctx, '#F2F2EE', '#C9C2B4', 2); ctx.restore(); }
function boterham(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 60, 160, 120, 30); shape(ctx, '#C9A35C', '#9C7A3C', 3); roundRect(ctx, x - 64, y - 44, 128, 88, 20); ctx.fillStyle = '#E8D9A8'; ctx.fill(); ctx.fillStyle = '#E8C04A'; ctx.fillRect(x - 60, y - 30, 120, 40); ctx.restore(); }
function spiercel(ctx, x, y, w, h, o = {}) { const { a = 1, glut = 0, inbraak = 0, t = 0, n = 6, zwak = 0, recA = 1, bound = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // membraan bovenaan de cel als band, binnenkant eronder
  // gebogen celmembraan (prompt v13 C9) uit de beeldbank; de spiercel ligt onder het membraan, met rustige textuur binnen
  const my = y - h / 2, MR = 2600, mY = px => my + MR - Math.sqrt(MR * MR - (px - x) * (px - x)), an = Math.asin(1010 / MR);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - 1010, mY(x - 1010)); for (let px = x - 1010; px <= x + 1010; px += 20) ctx.lineTo(px, mY(px)); ctx.lineTo(x + 1010, 1100); ctx.lineTo(x - 1010, 1100); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.06); ctx.fill(); ctx.restore();
  celTextuur(ctx, (px, py) => py > mY(px) + 30, 120, 7);
  membraanBoog(ctx, x, my + MR, MR, -Math.PI / 2 - an, -Math.PI / 2 + an, { t, s: 1.1 });
  metaText(ctx, 'BLOED', x - w / 2 + 10, my - 110, C.grain, 'left', 22); metaText(ctx, 'SPIERCEL', x - w / 2 + 10, mY(x - w / 2 + 10) + 90, C.grain, 'left', 22);
  receptor(ctx, x - w / 2 + 140, mY(x - w / 2 + 140) - 16, -Math.PI / 2, 'insuline', bound, recA, 1.5);
  // GLUT4: in blaasjes (binnen) of in het membraan
  for (let i = 0; i < n; i++) { const tx = x - w / 2 + 330 + i * ((w - 400) / Math.max(1, n - 1)); const u = clamp(glut * n - i * (1 - zwak) * 0.9, 0, 1) * (i < n * (1 - zwak) ? 1 : 0.15); const vy = lerp(mY(tx) + 150 + hash(i) * 60, mY(tx), ease(u));
    if (u < 0.98) { circ(ctx, tx, vy, 26, rgba(C.ves, 0.25), C.vesR, 1.5); }
    ctx.fillStyle = C.teal; roundRect(ctx, tx - 9, vy - 20, 18, 40, 6); ctx.fill();
    if (u > 0.95 && inbraak > 0.01) for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3 + i * 0.13) % 1; glucoseDeeltje(ctx, tx, lerp(mY(tx) - 90, mY(tx) + 120, ph), 10, inbraak * (ph < 0.9 ? 1 : (1 - ph) * 10)); } }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { eilandje(ctx, 1450, 560, 220, { beta: 0.6 + 0.3 * Math.sin(t), alfa: 0.4, t }); for (let i = 0; i < 6; i++) { const w2 = wander(i, t, 30, 0.6); glucoseDeeltje(ctx, 1250 + i * 70 + w2.x, 330 + w2.y, 13, 0.9); hormoonVorm(ctx, 1300 + i * 60 + w2.y, 800 + w2.x, 10, i % 3 ? 'insuline' : 'glucagon', 0.9); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { klasAchtergrond(ctx);
    const pS = person(ctx, 760, 900, 560, 1, Object.assign({ armR: { a1: 0.5, a2: 1.2 }, armL: { a1: 0.5, a2: 1.2 } }, SANNE));
    persoon(ctx, 'noor', 1180, 840, 580, { pose: 'zit', tafel: 650, t }); // jij = Noor (castboek, ROLLEN.md); geen naam in beeld of stem
    schoolbank(ctx, 970, 640, 900);
    const se = q.on('sensortje', 1); sensor(ctx, 760 - 78, 900 - 560 + 560 / 6.6 * 1.9, 16, se); if (se > 0.01) { ctx.save(); ctx.globalAlpha *= se * (1 - q.on('jou', 1)); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(760 - 78, 900 - 560 + 560 / 6.6 * 1.9, 34, 0, 6.283); ctx.stroke(); ctx.restore(); }
    const tl = q.on('telefoon', 1) * (1 - q.on('jou', 1)); telefoon(ctx, 280, 300, 280, 520, { a: tl, val: 5.6 + 0.4 * Math.sin(t * 0.5), curve: u => 5.5 + 1.8 * Math.exp(-Math.pow((u - 0.35) / 0.12, 2)) + 0.4 * Math.sin(u * 9), t });
    tag(ctx, 'Sanne · diabetes type 1', 760, 300, C.text2, q.on('type', 1) * (1 - q.on('jou', 1)));
    tag(ctx, 'jij: niemand meet iets', 1180, 300, C.text2, q.on('jou', 1));
    vraagteken(ctx, 960, 560, q.on('Hoe', 1), 130);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const bv = q.on('opgelost', 1); ctx.save(); ctx.globalAlpha *= bv; ctx.strokeStyle = HK.bloed; ctx.lineWidth = 120; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, 640); ctx.lineTo(900, 640); ctx.stroke(); ctx.strokeStyle = rgba(HK.bloedL, 0.6); ctx.lineWidth = 100; ctx.stroke();
    for (let i = 0; i < 14; i++) { const u = (t * 0.07 + i / 14) % 1; glucoseDeeltje(ctx, lerp(150, 880, u), 640 + Math.sin(i * 2.3) * 28, 13, 1); } metaText(ctx, 'BLOED MET GLUCOSE', 510, 740, C.grain, 'center', 24); ctx.restore();
    hersenIcoon(ctx, 1380, 330, 1.2, q.on('hersenen', 1)); tag(ctx, '≈ 120 gram per dag', 1380, 520, C.paars, q.on('honderdtwintig', 1));
    klontje(ctx, 520, 330, 1.4, q.on('suikerklontje', 1)); tag(ctx, '≈ 5 gram in al je bloed', 520, 230, C.goud, q.on('vijf', 1));
    klok(ctx, 1380, 720, 70, ramp(t, q.at('uur'), 2) * 12, 'in ≈ 1 uur op', q.on('uur', 1));
    tag(ctx, 'steeds aanvullen, ook zonder eten', 960, 860, C.goud, q.on('aangevuld', 1));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const ga = q.on('dag', 1); const x0 = 260, y0 = 170, w = 1400, h = 560, ym = 14;
    const band = q.on('normwaarde', 1); ctx.save(); ctx.globalAlpha *= band; ctx.fillStyle = rgba(C.groen, 0.14); ctx.fillRect(x0, y0 + h * (1 - 8 / ym), w, h * 4 / ym); metaText(ctx, 'NORMWAARDE ≈ 4–8', x0 + 14, y0 + h * (1 - 8 / ym) + 34, C.groen, 'left', 22); ctx.restore();
    grafiek(ctx, x0, y0, w, h, { a: Math.max(q.on('concentratie', 1), 0.001), xmax: 24, ymax: ym, f: dagGlucose, u: ramp(t, q.at('dag'), 8) * ga, xticks: [0, 6, 12, 18, 24], yticks: [0, 4, 8, 12], xlab: 'tijd (uur)', ylab: 'glucose (mmol/L)', col: HK.glucose, xfmt: v => v + ':00' });
    for (const [hh, lab] of [[8, 'ontbijt'], [12.5, 'lunch'], [18.5, 'avondeten']]) { ctx.save(); ctx.globalAlpha *= q.on('maaltijd', 1); metaText(ctx, lab, x0 + hh / 24 * w, y0 - 20, C.grain, 'center', 22); ctx.restore(); }
    tag(ctx, 'onder de 4: hersenen te weinig brandstof', 1100, 820, C.koraal, fade(q, 'onder', 1, 'jarenlang', 1));
    tag(ctx, 'jarenlang te hoog: vaten beschadigd', 1100, 820, C.koraal, q.on('jarenlang', 1));
  },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema');
    const ez = q.on('eilandjes', 1);
    glucoseKring(ctx, { a: 1 - ez, nA: [q.on('sensor', 1), q.on('regelcentrum', 1), 0, q.on('effector', 1)], arr: [q.on('regelcentrum', 1), 0, 0, q.on('effector', 1)] });
    if (ez > 0.01) { ctx.save(); ctx.globalAlpha *= ez; bg(ctx, 'micro'); eilandje(ctx, 760, 470, 330, { t, beta: q.on('bètacellen', 1), alfa: q.on('alfacellen', 1) });
      label(ctx, 'bètacellen', '', 760 + 120, 470 - 160, 1260, 260, q.on('bètacellen', 1), BETA); label(ctx, 'alfacellen', '', 760 - 150, 470 + 140, 1260, 620, q.on('alfacellen', 1), ALFA);
      for (let i = 0; i < 8; i++) { const u = (t * 0.1 + i / 8) % 1; glucoseDeeltje(ctx, lerp(400, 1120, u), 470 + Math.sin(u * 6) * 30, 11, q.on('meten', 1)); }
      tag(ctx, 'sensor én regelcentrum', 1400, 450, C.goud, q.on('tegelijk', 1)); ctx.restore(); }
  },
  s07(ctx, t, q) { bg(ctx, 'micro');
    const st = ramp(t, q.at('stijgt'), 2); eilandje(ctx, 760, 470, 300, { t, beta: q.on('merken', 1), alfa: 0.1 });
    const n = Math.round(6 + 10 * st); for (let i = 0; i < n; i++) { const u = (t * 0.1 + i / n) % 1; glucoseDeeltje(ctx, lerp(380, 1140, u), 470 + Math.sin(u * 6 + i) * 30, 11, 1); }
    const ins = q.on('insuline', 1); for (let i = 0; i < 9; i++) { const u = (t * 0.25 + i / 9) % 1; hormoonVorm(ctx, lerp(760, 1600, u) + Math.sin(i) * 20, 470 + lerp(0, -120 + i * 25, u), 12, 'insuline', ins * (1 - u * 0.5)); }
    telefoon(ctx, 1560, 90, 260, 400, { a: q.on('ontbijt', 1), val: lerp(5.0, 7.4, st), curve: u => 5 + 2.4 * ramp(u, 0.4, 0.4), t });
    tag(ctx, 'insuline', 1500, 760, C.goud, ins); vraagteken(ctx, 1320, 650, q.on('Wat', 1), 110);
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    const cols = [[380, 'lever', q.on('lever', 1)], [960, 'spieren', q.on('spieren', 1)], [1540, 'vetweefsel', q.on('vetweefsel', 1)]];
    tag(ctx, 'insuline is een signaal', 960, 110, C.goud, q.on('signaal', 1)); tag(ctx, 'effectoren = doelorganen', 960, 190, C.koraal, q.on('effectoren', 1));
    cols.forEach(([x, n, a], i) => { if (a <= 0.01) return; const g = i < 2 ? ramp(t, q.at('glycogeen'), 3) : 0; cel(ctx, x, 470, 420, 300, { a, naam: n, glyco: g, col: i === 0 ? '#C98A5C' : i === 1 ? C.koraal : '#E6D9A8' });
      receptor(ctx, x - 180, 330, -Math.PI / 2 - 0.4, 'insuline', ramp(t, q.at('signaal') + 1, 1.5), a, 1.2);
      const op = q.on('nemen', 1); if (i > 0) for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1; glucoseDeeltje(ctx, x + 120, lerp(220, 440, u), 12, op * (1 - u)); } });
    const st = q.on('stopt', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; arrow(ctx, 380, 640, 380, 820, HK.glucose, 1, 4); glucoseDeeltje(ctx, 410, 730, 12, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(350, 700); ctx.lineTo(410, 760); ctx.moveTo(410, 700); ctx.lineTo(350, 760); ctx.stroke(); regel(ctx, 'geen glucose meer naar het bloed', 600, 760, 1, C.koraal, 30, 'left'); ctx.restore(); }
    tag(ctx, 'glycogeen = de voorraad', 960, 860, C.goud, q.on('voorraad', 1));
  },
  s10(ctx, t, q) { bg(ctx, 'schema');
    hersenIcoon(ctx, 380, 300, 1, q.on('hersencellen', 1) * (1 - q.on('bak', 1) * 0.6)); tag(ctx, 'hersencellen: geen insuline nodig', 380, 470, C.paars, q.on('hersencellen', 1) * (1 - q.on('bak', 1)));
    const b = q.on('bak', 1); const lv = lerp(0.62, 0.36, ramp(t, q.at('daalt'), 3));
    bakKraan(ctx, 720, 320, 560, 420, lv, lerp(0.6, 0.08, q.on('kraan', 1)), lerp(0.3, 0.8, q.on('afvoer', 1)), t, b, { labels: 0, dot: (c, x, y, r, al) => glucoseDeeltje(c, x, y, r, al) });
    tag(ctx, 'kraan = lever', 620, 170, HK.klier, b); tag(ctx, 'afvoer = spieren, vet (en hersenen)', 1500, 820, C.text2, b);
    ctx.save(); ctx.globalAlpha *= b; ctx.fillStyle = rgba(C.groen, 0.18); ctx.fillRect(724, 320 + 420 * (1 - 0.55), 552, 420 * 0.25); metaText(ctx, 'DE BAND', 1300, 320 + 420 * 0.58, C.groen, 'left', 22); ctx.restore();
    tag(ctx, 'insuline: afvoer open, kraan bijna dicht', 1450, 230, C.goud, q.on('Insuline', 1));
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const fb = q.on('terugkoppeling', 1); const p = ((t - q.at('daalt')) / 6) % 1;
    glucoseKring(ctx, { arr: [1, 1, 1, 1], minus: fb, pulse: t > q.at('daalt') ? p : -1, thin: { 1: q.on('minder', 1) * (1 - q.on('omhoog', 1)) }, hormoon: q.on('omhoog', 1) > 0.5 ? 'beide' : 'insuline' });
    tag(ctx, 'minder glucose → minder insuline', 960, 470, C.goud, fade(q, 'Minder', 1, 'terugkoppeling', 1));
    tag(ctx, 'negatief = tegen de verandering in', 960, 860, HK.rem, q.on('verandering', 1));
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    const al = q.on('alfacellen', 1); ctx.save(); ctx.globalAlpha *= 1 - q.on('lever', 1) * 0.6; eilandje(ctx, 360, 360, 200, { t, alfa: al, beta: 0.1 }); ctx.restore();
    const gl = q.on('glucagon', 1); for (let i = 0; i < 7; i++) { const u = (t * 0.25 + i / 7) % 1; hormoonVorm(ctx, lerp(520, 980, u), 360 + Math.sin(i) * 30 + u * 80, 12, 'glucagon', gl * (1 - u * 0.4)); }
    const lv = q.on('levercellen', 1); cel(ctx, 1180, 450, 460, 320, { a: q.on('lever', 1), naam: 'levercel', glyco: 1 - ramp(t, q.at('breken'), 4) * 0.6, col: '#C98A5C' });
    for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1; glucoseDeeltje(ctx, lerp(1240, 1640, u), 450 + Math.sin(i * 2) * 60, 12, lv * ramp(t, q.at('breken') + 0.5, 1)); }
    const sp = q.on('spieren', 1); cel(ctx, 1560, 760, 360, 180, { a: sp, naam: '', glyco: 0.8, col: C.koraal }); if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; text(ctx, 'spiercel: glycogeen alleen voor zichzelf', 1560, 900 - 10, fTekst(28, 600), C.text2, 'center'); ctx.restore(); }
    tag(ctx, 'glucose dreigt te zakken', 420, 760, C.koraal, q.on('zakken', 1) * (1 - q.on('stijgt', 1)));
    tag(ctx, 'het peil stijgt weer', 420, 760, C.groen, q.on('stijgt', 1));
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const a1 = q.on('Glucagon', 1), a2 = q.on('Glycogeen', 1);
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; roundRect(ctx, 180, 180, 700, 460, 24); shape(ctx, rgba(C.fill, 0.6), HK.hormoon, 2.5); kop(ctx, 'glucagon', 530, 280, 1, HK.hormoon, 64); hormoonVorm(ctx, 530, 420, 46, 'glucagon', 1); regel(ctx, 'het hormoon · een boodschapper', 530, 580, 1, C.text, 34, 'center'); ctx.restore(); }
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; roundRect(ctx, 1040, 180, 700, 460, 24); shape(ctx, rgba(C.fill, 0.6), HK.glucose, 2.5); kop(ctx, 'glycogeen', 1390, 280, 1, HK.glucose, 64); glycogeenKeten(ctx, 1390, 430, 1.6, 1, 1); regel(ctx, 'de voorraad · een ketting van glucose', 1390, 580, 1, C.text, 34, 'center'); ctx.restore(); }
    tag(ctx, 'glucagon → glycogeen afbreken', 700, 800, HK.hormoon, q.on('afbreken', 1)); tag(ctx, 'insuline → glycogeen opbouwen', 1240, 800, C.goud, q.on('opbouwen', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const v = 6 + 0.8 * Math.sin(t * 0.9); telefoon(ctx, 820, 160, 280, 520, { val: v, curve: u => 6 + 0.8 * Math.sin(u * 9 + t), t });
    const ia = q.on('Insuline', 1), ga = q.on('glucagon', 1); pijlBig(ctx, 640, 300, 640, 640, C.goud, ia, 'insuline', 'omlaag'); pijlBig(ctx, 1300, 640, 1300, 300, C.goud, ga, 'glucagon', 'omhoog');
    const ad = q.on('adrenaline', 1); if (ad > 0.01) { hormoonVorm(ctx, 1560, 470, 40, 'adrenaline', ad); regel(ctx, 'adrenaline: ook omhoog', 1560, 580, ad, C.text, 32, 'center'); }
    tag(ctx, 'dag en nacht in de band', 960, 820, C.groen, q.on('Dag', 1));
  },
  s15(ctx, t, q) { bg(ctx, 'micro');
    const ins = q.on('Bindt', 1); spiercel(ctx, 960, 560, 1600, 520, { t, recA: q.on('receptor', 1), bound: ramp(t, q.at('Bindt'), 1.2) * (1 - ramp(t, q.at('weg'), 1)), glut: ramp(t, q.at('versmelten'), 3) * (1 - ramp(t, q.at('weg'), 3)), inbraak: q.on('stroomt', 1) * (1 - q.on('weg', 1)) });
    const stap = [['insuline is een eiwit: receptor op het membraan', 'eiwit', C.goud], ['GLUT4 ligt in blaasjes in de cel', 'blaasjes', C.teal], ['signaaltransductie', 'signaaltransductie', C.goud], ['exocytose: GLUT4 in het membraan', 'exocytose', C.vesR], ['gefaciliteerde diffusie', 'gefaciliteerde', C.teal], ['insuline weg: GLUT4 terug naar binnen', 'weg', C.text2]];
    let cur = -1; stap.forEach((st, k) => { if (t >= q.at(st[1])) cur = k; }); if (cur >= 0) tag(ctx, stap[cur][0], 960, 120, stap[cur][2], ramp(t, q.at(stap[cur][1]), 0.4));
  },

  // ---------- H3 ----------
  s16(ctx, t, q) { bg(ctx, 'schema');
    const kap = q.on('vernietigd', 1); ctx.save(); ctx.globalAlpha *= 1 - q.on('regelkring', 1); bg(ctx, 'micro'); eilandje(ctx, 960, 470, 330, { t, beta: 0.4, alfa: 0.3, kapot: kap });
    for (let i = 0; i < 5; i++) { const w2 = wander(i, t, 60, 0.7); circ(ctx, 960 + Math.cos(i * 1.3) * 220 + w2.x, 470 + Math.sin(i * 1.3) * 200 + w2.y, 22, rgba('#E6E1D3', 0.85 * q.on('afweersysteem', 1)), C.line, 1.5); } tag(ctx, 'afweercellen vallen bètacellen aan', 960, 860, C.koraal, q.on('afweersysteem', 1)); ctx.restore();
    const rk = q.on('regelkring', 1); glucoseKring(ctx, { a: rk * (1 - q.on('Boven', 1)), broken: { 1: q.on('pijl', 1) }, nA: [1, 1, 0.35, 1] });
    const bo = q.on('Boven', 1); if (bo > 0.01) { grafiek(ctx, 260, 170, 900, 500, { a: bo, xmax: 4, ymax: 20, f: h => 6 + 10 * (1 - Math.exp(-h)), u: ramp(t, q.at('Boven'), 4), xticks: [0, 1, 2, 3, 4], yticks: [0, 5, 10, 15, 20], xlab: 'uren na het eten (zonder behandeling)', ylab: 'glucose (mmol/L)', col: HK.glucose });
      ctx.save(); ctx.globalAlpha *= bo; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; const yy = 170 + 500 * (1 - 10 / 20); ctx.beginPath(); ctx.moveTo(260, yy); ctx.lineTo(1160, yy); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'NIERDREMPEL ≈ 10', 1160, yy - 12, C.koraal, 'right', 22); ctx.restore();
      const NB = nierBijnier(ctx, 1440, 400, 1.0, { a: q.on('urine', 1), urine: q.on('urine', 1), t }); const ul = NB.urineleider; for (let i = 0; i < 4; i++) { const u = (t * 0.5 + i / 4) % 1; glucoseDeeltje(ctx, ul[0] + 30, lerp(ul[1] + 40, 740, u), 11, q.on('urine', 1)); druppel2(ctx, ul[0] + 70, lerp(ul[1] + 40, 740, (u + 0.5) % 1), 9, q.on('water', 1)); }
      tag(ctx, 'dorst · vaak plassen', 1500, 820, C.teal, q.on('dorst', 1)); }
  },
  s17(ctx, t, q) { klasAchtergrond(ctx);
    const pS = person(ctx, 820, 900, 600, 1, Object.assign({ armR: { a1: 0.4, a2: 1.4 }, armL: { a1: 0.5, a2: 1.2 } }, SANNE)); schoolbank(ctx, 820, 660, 620);
    sensor(ctx, 820 - 84, 900 - 600 + 600 / 6.6 * 1.9, 17, 1); insulinePomp(ctx, 870, 900 - 600 + 600 / 6.6 * 3.3, 1.1, q.on('insulinepomp', 1));
    const hy = q.on('hypo', 1); telefoon(ctx, 1380, 160, 300, 540, { val: lerp(6.2, 3.4, ramp(t, q.at('zakt'), 2)), alarm: q.on('piept', 1), curve: u => 6 - 2.6 * ramp(u, 0.55, 0.35), t });
    tag(ctx, 'sensor meet · pomp rekent mee', 820, 260, C.goud, fade(q, 'sensor', 1, 'hypo', 1)); tag(ctx, 'hypo: onder de 4', 1530, 790, C.koraal, hy);
    for (let i = 0; i < 4; i++) dextro(ctx, 1080 + i * 80, 610, q.on('dextro', 1));
    vraagteken(ctx, 1220, 560, q.on('Waarom', 1), 110);
  },
  s19(ctx, t, q) { bg(ctx, 'schema');
    grafiek(ctx, 300, 200, 1200, 500, { xmax: 60, ymax: 8, f: m => 3.4 + 2.6 * (1 - Math.exp(-m / 8)), u: ramp(t, q.at('glucose'), 3), xticks: [0, 15, 30, 45, 60], yticks: [0, 2, 4, 6, 8], xlab: 'minuten na het eten', ylab: 'glucose (mmol/L)', col: HK.glucose });
    grafiek(ctx, 300, 200, 1200, 500, { a: q.on('boterham', 1), xmax: 60, ymax: 8, f: m => 3.4 + 2.2 * (1 - Math.exp(-Math.max(0, m - 12) / 18)), u: ramp(t, q.at('boterham'), 3), col: C.oker });
    dextro(ctx, 1600, 330, q.on('glucose', 1)); regel(ctx, 'dextro: snel', 1600, 420, q.on('glucose', 1), HK.glucose, 32, 'center'); boterham(ctx, 1600, 590, q.on('boterham', 1)); regel(ctx, 'boterham: eerst verteren', 1600, 700, q.on('boterham', 1), C.oker, 32, 'center');
  },
  s20(ctx, t, q) { bg(ctx, 'schema');
    glucoseKring(ctx, { thin: { 2: q.on('minder', 1) }, nA: [1, 1, 1, 1] }); tag(ctx, 'doelcellen reageren minder sterk', 960, 470, C.koraal, q.on('reageren', 1));
    tag(ctx, 'type 2: veel vaker', 960, 860, C.text2, q.on('vaker', 1) * (1 - q.on('arts', 1))); vraagteken(ctx, 1560, 820, q.on('arts', 1), 110);
  },
  s22(ctx, t, q) { bg(ctx, 'schema');
    const b1 = q.on('meer', 1); const x0 = 280, yb = 640, hmax = 380;
    const bars = [['gezond', 1, HK.hormoon], ['type 2 (begin)', 2.4 * ramp(t, q.at('meer'), 1.5), HK.hormoon], ['type 2 (na jaren)', 0.9 * q.on('uitgeput', 1), C.text2]];
    bars.forEach(([n, v, c], i) => { const a2 = i < 2 ? b1 : q.on('uitgeput', 1); if (a2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= a2; const x = x0 + i * 300; const hh = hmax * v / 2.6; roundRect(ctx, x, yb - hh, 180, hh, 8); shape(ctx, rgba(c, 0.55), c, 2); text(ctx, n, x + 90, yb + 50, fTekst(30, 600), C.text, 'center'); ctx.restore(); });
    ctx.save(); ctx.globalAlpha *= b1; metaText(ctx, 'INSULINE IN HET BLOED (MODEL)', x0, 210, C.grain, 'left', 24); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 20, yb); ctx.lineTo(x0 + 900, yb); ctx.stroke(); ctx.restore();
    tag(ctx, 'insulineresistentie', 1500, 260, C.koraal, q.on('insulineresistentie', 1));
    tag(ctx, 'erfelijkheid · overgewicht · weinig bewegen', 1440, 360, C.text2, q.on('Erfelijkheid', 1));
    tag(ctx, 'bètacellen raken uitgeput', 1500, 460, C.text2, q.on('uitgeput', 1));
    const bw = q.on('Bewegen', 2); /* 2e keer = 'Bewegen helpt' (de 1e is 'weinig bewegen') */ if (bw > 0.01) { ctx.save(); ctx.globalAlpha *= bw; const tr = Math.max(0, t - q.at('Bewegen', 2)), gg = gangSnelheid('noor', 280, 'ren') * 7.2 < 640 ? 'ren' : 'loop', x0r = Math.max(1150, 1840 - gangSnelheid('noor', 280, gg) * 7.2); persoon(ctx, 'noor', x0r, 880, 280, { zij: true, kijk: 1, gang: gg, t: tr, vooruit: true, outfit: 'sport' }); regel(ctx, 'bewegen helpt', 1500, 560, 1, C.groen, 34, 'center'); ctx.restore(); }
  },
  s23(ctx, t, q) { bg(ctx, 'micro');
    const zw = q.on('zwakker', 1), sp = q.on('Werkende', 1);
    spiercel(ctx, 960, 560, 1600, 520, { t, bound: 1, recA: 1, glut: sp > 0.01 ? ramp(t, q.at('Werkende'), 3) : ramp(t, 0.5, 3), zwak: (1 - sp), inbraak: 1 });
    tag(ctx, 'kettingreactie zwakker → minder GLUT4', 960, 120, C.koraal, fade(q, 'zwakker', 1, 'Werkende', 1)); tag(ctx, 'de lever blijft glucose afgeven', 960, 200, C.text2, fade(q, 'lever', 1, 'Werkende', 1));
    tag(ctx, 'spierwerk: GLUT4 via een andere route', 960, 120, C.groen, sp);
  },

  // ---------- Recap ----------
  s24(ctx, t, q) { bg(ctx, 'schema');
    const half = q.on('Sanne', 1);
    glucoseKring(ctx, { cx: 960 - 300 * half, rx: 560 - 120 * half, cy: 470, a: 1, arr: [1, 1, 1, 1], minus: q.on('terugkoppeling', 1), pulse: (t / 6) % 1, nA: [q.on('alvleesklier', 1), q.on('bètacellen', 1), q.on('Insuline', 1), q.on('spieren', 1)], hormoon: q.on('glucagon', 1) > 0.5 ? 'beide' : 'insuline' });
    if (half > 0.01) { ctx.save(); ctx.globalAlpha *= half; ctx.translate(1450, 0); ctx.scale(0.9, 0.9); person(ctx, 120, 800, 560, 1, SANNE); sensor(ctx, 120 - 78, 800 - 560 + 560 / 6.6 * 1.9, 16, 1); insulinePomp(ctx, 210, 800 - 560 + 560 / 6.6 * 3.0, 1.1, 1); ctx.restore(); regel(ctx, 'sensor + pomp nemen het over', 1560, 160, half, C.goud, 32, 'center'); }
    tag(ctx, 'je lichaam meet het zelf en stuurt bij', 700, 860, C.goud, q.on('antwoord', 1));
  },
};
function pijlBig(ctx, x0, y0, x1, y1, col, a, lab, sub) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x1 + Math.cos(an) * 30, y1 + Math.sin(an) * 30); ctx.lineTo(x1 + Math.cos(an + 2.4) * 40, y1 + Math.sin(an + 2.4) * 40); ctx.lineTo(x1 + Math.cos(an - 2.4) * 40, y1 + Math.sin(an - 2.4) * 40); ctx.closePath(); ctx.fill(); text(ctx, lab, x0 + (x0 < 960 ? -40 : 40), (y0 + y1) / 2, fTitel(44), col, x0 < 960 ? 'right' : 'left'); metaText(ctx, sub, x0 + (x0 < 960 ? -40 : 40), (y0 + y1) / 2 + 40, C.grain, x0 < 960 ? 'right' : 'left', 24); ctx.restore(); }
function druppel2(ctx, x, y, r, a = 1, col = HK.water) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.4); ctx.bezierCurveTo(x + r, y - r * 0.2, x + r, y + r, x, y + r); ctx.bezierCurveTo(x - r, y + r, x - r, y - r * 0.2, x, y - r * 1.4); shape(ctx, rgba(col, 0.6), col, 2); ctx.restore(); }

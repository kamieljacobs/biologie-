// Storyboard film 3 · Vormen van selectie — één keyframe per scène. Laadt na teken_evo2.js, teken_evo3.js, vragen23.js.
const _vr3 = (ctx, id) => vraagKaart(ctx, VR[id].vraag, VR[id].opties, 3);
const _hist = (ctx, x, y, w, h, vorm, o = {}) => { // vorm: 'gericht' | 'stabiel' | 'splits' | 'begin'
  const k = o.kleur || C.teal;
  if (vorm === 'gericht') histogram(ctx, x, y, w, h, 0.62, 0.13, { kleur: k, oud: { mu: 0.45, sd: 0.13 }, as: o.as });
  else if (vorm === 'stabiel') histogram(ctx, x, y, w, h, 0.5, 0.08, { kleur: k, oud: o.geenOud ? null : { mu: 0.5, sd: 0.14 }, as: o.as });
  else if (vorm === 'splits') histogram(ctx, x, y, w, h, 0.27, 0.08, { kleur: k, bimodaal: [0.73, 0.08, 0.5], as: o.as });
  else histogram(ctx, x, y, w, h, 0.5, 0.14, { kleur: k, as: o.as }); };
const _stam = (ctx, roet) => { macroNacht(ctx, { horizon: 980, heuvel: false }); schors(ctx, 700, -40, 820, 1000, { roet }); };

const SB3 = {
  // ---------------- Opening
  e3s01(ctx) { macroNacht(ctx, { horizon: 640 }); evoTag(ctx, 3, 'OPENING');
    pauw(ctx, 1240, 820, 1.75);
    naamBij(ctx, 'sleep ± 1,5 m', 'kost energie · valt op', 620, 420, 1, 'center');
    evoSchaal(ctx, 'pauw van kop tot sleep ± 2 m'); },
  e3s02(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 3, 'OPENING');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, 860); ctx.lineTo(1720, 860); ctx.stroke();
    persoon(ctx, 'mirjam', 640, 860, 560, { pose: 'wijs', uit: 'blij' });
    babyWeegschaal(ctx, 1180, 860, 420, { kg: '3,5 kg' }); persoon(ctx, 'baby', 1180, 712, 260, { uit: 'blij' });
    naamBij(ctx, 'Verloskundige Mirjam', null, 640, 250, 1, 'center'); },
  e3s03(ctx) { titelKaart(ctx, 3, 'Vormen van selectie', ['Waarom worden baby\'s', 'niet steeds zwaarder?'], (c) => {
      _hist(c, 1040, 420, 240, 170, 'gericht'); _hist(c, 1360, 420, 240, 170, 'stabiel'); _hist(c, 1200, 760, 280, 170, 'splits');
      metaText(c, 'gericht', 1040, 466, C.text2, 'left', 26); metaText(c, 'stabiliserend', 1360, 466, C.text2, 'left', 26); metaText(c, 'splitsend', 1200, 806, C.text2, 'left', 26); }); },
  // ---------------- H1 Gerichte selectie
  e3s04(ctx) { _stam(ctx, 0); evoTag(ctx, 3, 'GERICHTE SELECTIE');
    berkenspanner(ctx, 950, 380, 0.55, { vorm: 'licht', rot: -0.1 }); berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    naamBij(ctx, 'lichte vorm', null, 670, 390, 1, 'right'); naamBij(ctx, 'zwarte vorm', null, 1550, 670, 1, 'left');
    naamBij(ctx, 'berkenspanner', 'biston betularia', 140, 200, 1, 'left');
    evoSchaal(ctx, 'spanwijdte ± 5 cm · 1,5× vergroot'); },
  e3s05(ctx) { _stam(ctx, 1); evoTag(ctx, 3, 'GERICHTE SELECTIE');
    berkenspanner(ctx, 950, 380, 0.55, { vorm: 'licht', rot: -0.1 }); berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    text(ctx, 'Manchester', 1560, 180, fTitel(60), C.text, 'left'); metaText(ctx, 'het jaar 1848', 1560, 226, C.grain, 'left', 28);
    evoSchaal(ctx, '1,5× vergroot · roet op de schors'); },
  e3q06(ctx) { _vr3(ctx, 'e3q06'); },
  e3s07(ctx) { _stam(ctx, 1); evoTag(ctx, 3, 'GERICHTE SELECTIE');
    berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 }); berkenspanner(ctx, 1160, 300, 0.55, { vorm: 'licht', rot: -0.2 });
    koolmees(ctx, 920, 520, 2.4, { pik: 0.55, rot: -0.35 });
    text(ctx, '98 % zwart', 1550, 180, fTitel(60), C.oker, 'left'); metaText(ctx, 'het jaar 1895', 1550, 226, C.grain, 'left', 26);
    evoSchaal(ctx, 'koolmees ± 14 cm · vlinder ± 5 cm'); },
  e3s08(ctx) { evoTag(ctx, 3, 'GERICHTE SELECTIE');
    const x = 300, y = 780, w = 1300, h = 480, X = (j) => (j - 1840) / 180;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'aandeel zwarte berkenspanners', xt: [[X(1850), '1850'], [X(1900), '1900'], [X(1950), '1950'], [X(2000), '2000']], yt: [[0, '0 %'], [0.5, '50 %'], [1, '100 %']] });
    const D = [[1840, 0.0], [1848, 0.01], [1860, 0.15], [1875, 0.7], [1895, 0.98], [1930, 0.97], [1956, 0.94], [1970, 0.85], [1985, 0.6], [2000, 0.2], [2015, 0.03]];
    lijnPad(ctx, D.map(([j, v]) => [x + X(j) * w, y - v * h]), C.oker, 6);
    for (const [j, l] of [[1848, 'eerste zwarte'], [1956, 'schone-luchtwet']]) { ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + X(j) * w, y); ctx.lineTo(x + X(j) * w, y - h - 10); ctx.stroke(); ctx.restore(); metaText(ctx, l, x + X(j) * w + 12, y - h + 4, C.goud, 'left', 26); }
    evoSchaal(ctx, 'vereenvoudigd · geen echte meetreeks'); },
  e3s09(ctx) { evoTag(ctx, 3, 'GERICHTE SELECTIE');
    _hist(ctx, 460, 760, 1000, 420, 'gericht', { as: ['licht', 'donker'] });
    pijl(ctx, 860, 290, 1080, 290, C.goud, 1, 4, 16);
    haak(ctx, 460, 1460, 800, 'gerichte selectie', C.groen); },
  // ---------------- H2 Stabiliserende selectie
  e3s10(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 3, 'STABILISERENDE SELECTIE');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, 860); ctx.lineTo(1720, 860); ctx.stroke();
    persoon(ctx, 'mirjam', 600, 860, 560, { uit: 'praat', pose: 'wijs' });
    babyWeegschaal(ctx, 1140, 860, 420, { kg: '3,2 kg' }); persoon(ctx, 'baby', 1140, 712, 240, { uit: 'neutraal' });
    naamBij(ctx, 'geboortegewicht', 'erfelijk én omgeving', 1500, 380, 1, 'left'); },
  e3s11(ctx) { evoTag(ctx, 3, 'STABILISERENDE SELECTIE');
    const x = 360, y = 780, w = 1200, h = 440, K = (kg) => (kg - 1) / 4.5;
    histogram(ctx, x, y, w, h, K(3.3), 0.12, { kleur: C.teal });
    for (let kg = 1; kg <= 5; kg++) metaText(ctx, kg + ' kg', x + K(kg) * w, y + 46, C.text2, 'center', 28);
    metaText(ctx, 'geboortegewicht', x + w, y + 90, C.grain, 'right', 28); metaText(ctx, 'aantal baby\'s', x, y - h - 40, C.grain, 'left', 28);
    text(ctx, 'Londen', 140, 220, fTekst(48, 700), C.text); metaText(ctx, 'geboren 1935–1946', 140, 262, C.grain, 'left', 26); },
  e3q12(ctx) { _vr3(ctx, 'e3q12'); },
  e3s13(ctx) { evoTag(ctx, 3, 'STABILISERENDE SELECTIE');
    const x = 360, y = 780, w = 1200, h = 440, K = (kg) => (kg - 1) / 4.5;
    histogram(ctx, x, y, w, h * 0.7, K(3.3), 0.12, { kleur: C.teal, gedimd: [K(2.2), K(4.4)] });
    for (let kg = 1; kg <= 5; kg++) metaText(ctx, kg + ' kg', x + K(kg) * w, y + 46, C.text2, 'center', 28);
    const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80, kg = 1 + u * 4.5; const v = Math.exp(-0.5 * ((kg - 3.55) / (kg < 3.55 ? 0.85 : 0.75)) ** 2); P.push([x + u * w, y - h * (0.15 + 0.85 * v)]); }
    lijnPad(ctx, P, C.groen, 6);
    naamBij(ctx, 'overleving', null, x + K(3.55) * w, y - h - 30, 1, 'center', C.groen);
    metaText(ctx, 'te licht', x + K(1.4) * w, y - h * 0.5, C.koraal, 'center', 28); metaText(ctx, 'te zwaar', x + K(5.1) * w, y - h * 0.5, C.koraal, 'center', 28);
    evoSchaal(ctx, 'vereenvoudigd · naar karn & penrose 1951'); },
  e3s14(ctx) { evoTag(ctx, 3, 'STABILISERENDE SELECTIE');
    _hist(ctx, 460, 760, 1000, 420, 'stabiel', { as: ['licht', 'zwaar'] });
    pijl(ctx, 640, 420, 820, 420, C.goud, 1, 4, 16); pijl(ctx, 1280, 420, 1100, 420, C.goud, 1, 4, 16);
    haak(ctx, 460, 1460, 800, 'stabiliserende selectie', C.groen); },
  e3s15(ctx) { evoTag(ctx, 3, 'STABILISERENDE SELECTIE');
    const x = 360, y = 780, w = 1200, h = 440, K = (kg) => (kg - 1) / 4.5;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'geboortegewicht', yLabel: 'overleving', xt: [[K(1), '1 kg'], [K(2), '2'], [K(3), '3'], [K(4), '4'], [K(5), '5']] });
    const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80, kg = 1 + u * 4.5; const v = Math.exp(-0.5 * ((kg - 3.55) / (kg < 3.55 ? 0.85 : 0.75)) ** 2); P.push([x + u * w, y - h * (0.15 + 0.85 * v)]); }
    lijnPad(ctx, P, C.groen, 4, [10, 10]);
    const N = []; for (let i = 0; i <= 80; i++) { const u = i / 80, kg = 1 + u * 4.5; const v = kg < 2.5 ? Math.exp(-0.5 * ((kg - 2.5) / 0.6) ** 2) : kg > 4.5 ? Math.exp(-0.5 * ((kg - 4.5) / 0.6) ** 2) : 1; N.push([x + u * w, y - h * (0.55 + 0.43 * v)]); }
    lijnPad(ctx, N, C.groen, 7);
    naamBij(ctx, 'vroeger', null, x + K(1.6) * w, y - h * 0.32, 1, 'center', C.text2);
    naamBij(ctx, 'nu, met goede zorg', null, x + K(3.5) * w, y - h - 60, 1, 'center', C.groen);
    evoSchaal(ctx, 'vereenvoudigd · naar ulizzi e.a. 2002'); },
  // ---------------- H3 Splitsende selectie
  e3s16(ctx) { macroNacht(ctx, { horizon: 860 }); evoTag(ctx, 3, 'SPLITSENDE SELECTIE');
    zegge(ctx, 520, 900, 620, { buig: 0.04 }); zegge(ctx, 1340, 900, 640, { zaad: '#8A6A40', buig: -0.03 });
    lijn(ctx, [[760, 900], [700, 760], [560, 608], [420, 560]], '#6E9A5E', 7); lijn(ctx, [[1180, 900], [1240, 760], [1380, 598], [1520, 556]], '#6E9A5E', 7);
    zaadkraker(ctx, 560, 608, 1.7, { snavel: 'klein' }); zaadkraker(ctx, 1380, 598, 1.7, { snavel: 'groot', kijk: -1 });
    naamBij(ctx, 'kleine snavel', null, 560, 680, 1, 'center'); naamBij(ctx, 'grote snavel', null, 1380, 670, 1, 'center');
    naamBij(ctx, 'zwartbuikzaadkraker', 'pyrenestes ostrinus · kameroen', 960, 180, 1, 'center');
    evoSchaal(ctx, 'vogel ± 15 cm'); },
  e3s17(ctx) { macroNacht(ctx, { horizon: 860 }); evoTag(ctx, 3, 'SPLITSENDE SELECTIE');
    for (const bx of [380, 960, 1540]) lijn(ctx, [[bx + 120, 900], [bx + 40, 760], [bx, 636], [bx - 140, 600]], '#6E9A5E', 7);
    zaadkraker(ctx, 380, 636, 1.5, { snavel: 'klein', snavelKleur: C.goud }); gedimd(ctx, 0.35, (g) => zaadkraker(g, 960, 636, 1.5, { snavel: 'midden' })); zaadkraker(ctx, 1540, 636, 1.5, { snavel: 'groot', snavelKleur: C.goud });
    for (let i = 0; i < 5; i++) zaadje(ctx, 300 + i * 40, 760 + (i % 2) * 14, 1.4, { kleur: '#D9C08A' });
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(1480 + i * 46, 768 + (i % 2) * 12, 16, 12, 0, 0, 6.283); ctx.fillStyle = '#7A5A3A'; ctx.fill(); ctx.strokeStyle = '#A08060'; ctx.lineWidth = 2; ctx.stroke(); }
    naamBij(ctx, 'zachte zaden', null, 380, 830, 1, 'center'); naamBij(ctx, 'harde zaden', null, 1540, 830, 1, 'center');
    naamBij(ctx, 'ertussenin', 'in geen van beide goed', 960, 360, 0.6, 'center');
    evoSchaal(ctx, 'zaden vergroot'); },
  e3q18(ctx) { _vr3(ctx, 'e3q18'); },
  e3s19(ctx) { evoTag(ctx, 3, 'SPLITSENDE SELECTIE');
    _hist(ctx, 460, 760, 1000, 420, 'splits', { as: ['kleine snavel', 'grote snavel'] });
    haak(ctx, 460, 1460, 800, 'splitsende selectie', C.groen);
    metaText(ctx, 'vooral één gen bepaalt klein of groot', 960, 250, C.grain, 'center', 26); },
  // ---------------- H4 Seksuele selectie
  e3s20(ctx) { macroNacht(ctx, { horizon: 700 }); evoTag(ctx, 3, 'SEKSUELE SELECTIE');
    pauw(ctx, 760, 880, 1.25, { waaier: 1 }); pauwin(ctx, 1560, 880, 1.1, { kijk: -1 });
    naamBij(ctx, 'pauwin', 'kiest', 1560, 940 - 40, 1, 'center'); },
  e3q21(ctx) { _vr3(ctx, 'e3q21'); },
  e3s22(ctx) { macroNacht(ctx, { horizon: 700 }); evoTag(ctx, 3, 'SEKSUELE SELECTIE');
    gedimd(ctx, 0.35, (g) => pauw(g, 520, 880, 0.95, { waaier: 1, vlekken: 0.25 })); pauw(ctx, 1200, 880, 0.95, { waaier: 1 });
    pauwin(ctx, 1640, 880, 0.95, { kijk: -1 });
    naamBij(ctx, 'veel minder oogvlekken', 'minder vaak gekozen', 520, 380, 0.8, 'center');
    naamBij(ctx, 'gekozen', 'meer jongen', 1200, 380, 1, 'center', C.goud);
    naamBij(ctx, 'seksuele selectie', 'door het andere geslacht', 1780, 200, 1, 'right'); },
  e3s23(ctx) { macroNacht(ctx, { horizon: 700 }); evoTag(ctx, 3, 'SEKSUELE SELECTIE');
    edelhert(ctx, 600, 920, 1.25, { kop: 0.85 }); edelhert(ctx, 1320, 920, 1.25, { kop: 0.85, kijk: -1 });
    naamBij(ctx, 'edelherten in de bronst', '± 1 op de 4 volwassen herten per jaar gewond', 960, 200, 1, 'center');
    evoSchaal(ctx, 'schofthoogte ± 1,2 m'); },
  e3s24(ctx) { evoTag(ctx, 3, 'SEKSUELE SELECTIE');
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, 760); ctx.lineTo(960, 420); ctx.stroke();
    ctx.save(); ctx.translate(960, 420); ctx.rotate(0.12); ctx.beginPath(); ctx.moveTo(-460, 0); ctx.lineTo(460, 0); ctx.stroke();
    for (const [sx, kl, t, sub] of [[-400, C.koraal, 'overleven', 'kost energie · valt op'], [400, C.groen, 'voortplanten', 'meer nakomelingen']]) { ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx - 70, 110); ctx.moveTo(sx, 0); ctx.lineTo(sx + 70, 110); ctx.stroke(); roundRect(ctx, sx - 170, 110, 340, 150, 18); shape(ctx, rgba(kl, 0.2), kl, 2.5); text(ctx, t, sx, 190, fTekst(44, 700), kl, 'center'); metaText(ctx, sub, sx, 236, C.grain, 'center', 24); }
    ctx.restore();
    text(ctx, 'Fitness telt nakomelingen, geen levensjaren.', 960, 900 - 20, fTekst(44, 600), C.text, 'center'); },
  // ---------------- H5 Co-evolutie
  e3s25(ctx) { macroNacht(ctx, { horizon: 980, heuvel: false }); evoTag(ctx, 3, 'CO-EVOLUTIE');
    orchideeBladeren(ctx, 520, 1000, 1.2); lijn(ctx, [[520, 760], [640, 560], [820, 380], [940, 262]], '#6E8A4E', 6); orchidee(ctx, 960, 240, 2.0, { spoor: 300 });
    naamBij(ctx, 'Darwins orchidee', 'angraecum sesquipedale · madagaskar', 1260, 200, 1, 'left');
    naamBij(ctx, 'buis met nectar', '20 tot 35 cm', 1020, 780, 1, 'left');
    evoSchaal(ctx, 'spoor ± 30 cm'); },
  e3s26(ctx) { macroNacht(ctx, { horizon: 980, heuvel: false }); evoTag(ctx, 3, 'CO-EVOLUTIE');
    orchidee(ctx, 760, 220, 2.0, { spoor: 300 });
    // liniaal 30 cm naast de spoor (zelfde schaal: 2 px per mm)
    const lx = 1080, ly0 = 240; roundRect(ctx, lx, ly0, 54, 600, 6); shape(ctx, '#C9B896', '#E6DCC0', 2); for (let c = 0; c <= 30; c++) { const yy = ly0 + c * 20; ctx.strokeStyle = '#3A3026'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, yy); ctx.lineTo(lx + (c % 5 ? 14 : 28), yy); ctx.stroke(); if (c % 10 === 0) metaText(ctx, String(c), lx + 70, yy + 10, C.text2, 'left', 26); }
    metaText(ctx, 'cm', lx + 70, ly0 + 640, C.text2, 'left', 26);
    ctx.save(); ctx.setLineDash([10, 10]); lijn(ctx, [[1420, 300], [1400, 600], [1380, 840]], C.goud, 3); ctx.restore();
    text(ctx, 'het jaar 1862', 1300, 180, fTitel(56), C.text, 'left'); metaText(ctx, 'darwin voorspelt een lange tong', 1300, 224, C.grain, 'left', 26);
    evoSchaal(ctx, 'ware grootte · 2 px per mm'); },
  e3q27(ctx) { _vr3(ctx, 'e3q27'); },
  e3s28(ctx) { macroNacht(ctx, { horizon: 980, heuvel: false }); evoTag(ctx, 3, 'CO-EVOLUTIE');
    const fx = 760, fy = 260, fs = 2.0; orchidee(ctx, fx, fy, fs, { spoor: 300 });
    // tong loopt de spoor in (doorschijnend getekend): volgt het pad van de spoor tot de nectar
    const S = [[6, 10], [16, 80], [10, 160], [-6, 240], [-10, 288]].map(([px, py]) => [fx + px * fs, fy + py * fs]); lijn(ctx, S, '#3A3028', 2.5);
    const vx = 1000, vy = 238; pijlstaart(ctx, vx, vy, 1.0, { kijk: -1, tong: 1, tongEind: [vx - fx - 6, fy + 20 - vy] });
    naamBij(ctx, 'pijlstaartvlinder', 'xanthopan praedicta · beschreven in 1903', 1180, 140, 1, 'left');
    naamBij(ctx, 'tong tot ± 28 cm', 'reikt tot de nectar', 820, 860, 1, 'left');
    evoSchaal(ctx, 'ware verhouding'); },
  e3s29(ctx) { evoTag(ctx, 3, 'CO-EVOLUTIE');
    const cx = 960, cy = 470, R = 230;
    ctx.lineWidth = 6; for (const [a0, a1, kl] of [[-2.6, -0.5, C.groen], [0.55, 2.65, C.oker]]) { ctx.strokeStyle = kl; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke(); const ex = cx + Math.cos(a1) * R, ey = cy + Math.sin(a1) * R, ta = a1 + Math.PI / 2; pijl(ctx, ex - Math.cos(ta) * 30, ey - Math.sin(ta) * 30, ex, ey, kl, 1, 6, 22); }
    orchidee(ctx, cx - 420, cy - 120, 0.75, { spoor: 300 }); pijlstaart(ctx, cx + 430, cy - 20, 1.5, { tong: 0 });
    naamBij(ctx, 'langere buis', null, cx - 420, cy + 240, 1, 'center', C.groen); naamBij(ctx, 'langere tong', null, cx + 430, cy + 120, 1, 'center', C.oker);
    haak(ctx, 520, 1400, 760, 'co-evolutie: elkaars selectiedruk', C.groen); },
  // ---------------- Samenvatting
  e3s30(ctx) { evoTag(ctx, 3, 'SAMENVATTING');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 760); ctx.lineTo(1780, 760); ctx.stroke();
    _hist(ctx, 200, 740, 420, 240, 'gericht'); _hist(ctx, 750, 740, 420, 240, 'stabiel'); _hist(ctx, 1300, 740, 420, 240, 'splits');
    berkenspanner(ctx, 410, 330, 0.32, { vorm: 'licht' }); persoon(ctx, 'baby', 960, 340, 170, { uit: 'blij' }); zaadkraker(ctx, 1500, 360, 0.8, { snavel: 'groot' });
    metaText(ctx, 'gericht', 410, 820, C.text2, 'center', 28); metaText(ctx, 'stabiliserend', 960, 820, C.groen, 'center', 28); metaText(ctx, 'splitsend', 1510, 820, C.text2, 'center', 28); },
  e3s31(ctx) { eindKaart(ctx, 3, ['Gericht schuift, stabiliserend versmalt,', 'splitsend geeft twee toppen.', 'Seksuele selectie: het andere geslacht kiest.', 'Co-evolutie: twee soorten als elkaars selectiedruk.'], 'De mens als selectiefactor'); },
};

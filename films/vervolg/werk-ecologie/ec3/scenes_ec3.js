// Wat word jij? · Ecologie en natuurbeheer · Een plan voor de natuur — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas, voorstel, outfit veld). Geen Micro behalve de zoomcirkel met bodemleven (H2).
// Rode draad: één maisakker naast de heide; de kuilwand (donker boven licht) komt terug als doorsnede. Elke scène staat er op t = 0.

const DAAN_IN_KUIL = false; // true = Daan tot zijn knieën in de kuil (de brief); false = terugval: Daan op de rand, kuilwand ernaast (twijfelscène s01)

function koude(ctx, t, q, o = {}) { const { daanA = 1, basA = 1, wandHl = 0, fosfaat = 0, grondA = 1 } = o;
  veldAchter(ctx, { t, heideHl: o.heideHl || 0, maisHl: o.maisHl || 0 });
  graafmachine(ctx, 1010, 560, 0.42, { arm: o.arm == null ? 0.25 : o.arm, a: 0.9 });
  kuilAchter(ctx, { hl: wandHl, fosfaat, zandHl: o.zandHl || 0 });
  if (DAAN_IN_KUIL) { daan(ctx, 760, t, { voet: 905, a: daanA, pose: 'vasthouden', hold: (c, x, y) => schep(c, x, y, 1) }); kuilVoor(ctx, grondA); }
  else { kuilVoor(ctx, grondA); daan(ctx, 470, t, { voet: 850, a: daanA, pose: 'vasthouden', kijk: 1, hold: (c, x, y) => schep(c, x, y, 1) }); }
  bas(ctx, 1640, t, { voet: 850, a: basA, pose: 'vasthouden', hold: (c, x, y) => duimstok(c, x, y, 150) });
}

Object.assign(SCENES, {
  title(ctx, t) {
    gebiedKaart(ctx, 1040, 230, 780, 540, { t, akkerHl: 0.5 + 0.5 * Math.sin(t * 2), labels: 1 });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    koude(ctx, t, q, { wandHl: q.on('donkere', 1) * (1 - q.on('zand', 1)), zandHl: q.on('zand', 1) * (1 - q.on('maisakker', 1)), heideHl: q.on('heide', 1) * (1 - q.on('Bas', 1)), maisHl: q.on('maisakker', 1) * (1 - q.on('heide', 1)), arm: lerp(0.25, 0.75, q.on('afgraven', 1, 1.2)) });
    naamBij(ctx, 'Daan', 'stagiair', DAAN_IN_KUIL ? 760 : 470, DAAN_IN_KUIL ? 470 : 400, q.on('Daan', 1, 0.3), 'center');
    naamBij(ctx, 'donkere grond', '', 1100, 644, q.on('donkere', 1), 'center');
    naamBij(ctx, 'licht zand', '', 1100, 750, q.on('zand', 1), 'center');
    naamBij(ctx, 'maisakker', '', 1610, 270, q.on('maisakker', 1), 'center');
    naamBij(ctx, 'heide', '', 300, 470, q.on('heide', 1), 'center');
    naamBij(ctx, 'Bas', 'ecoloog', 1640, 380, q.on('Bas', 1), 'center');
    vraagteken(ctx, 960, 300, q.on('Waarom', 1), 110); },

  // ---------- H1 Welke natuur wil je? ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); ec3Antwoord(ctx, 'antwoord c: die laag zit vol mest');
    bodemDoorsnede(ctx, 120, 330, 760, 440, { bouwH: 170, fosfaat: 0.5 + 0.5 * q.on('mest', 1), mest: q.on('mest', 1) * (1 - q.on('plan', 1)), t });
    naamBij(ctx, 'mest', 'fosfaat', 500, 300, q.on('mest', 1), 'center');
    const P = q.on('plan', 1, 0.4); bas(ctx, 1080, t, { a: P, pose: q.on('doel', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1 });
    planVel(ctx, 1240, 240, 560, 400, ['doel: welke natuur?', 'bodem', 'verbinding', 'meten'], [q.on('doel', 1), 0.25, 0.25, 0.25], P);
    vraagteken(ctx, 1520, 760, q.on('natuur', 1), 90); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    gebiedKaart(ctx, 120, 170, 860, 600, { t, natura: q.on('Natura', 1), labels: 1 });
    tag(ctx, 'Natura 2000', 550, 140, C.goud, q.on('Natura', 1), 'center', 32);
    const NLa = q.on('Nederland', 1) * (1 - q.on('instandhoudingsdoelen', 1, 0.4));
    nederland(ctx, 1150, 120, 230, { a: NLa, stippen: 160, stipA: q.on('honderdzestig', 1, 1.2), pin: [5.85, 52.15], pinA: q.on('honderdzestig', 1) });
    naamBij(ctx, 'ruim 160 gebieden', 'in Nederland', 1430, 820, q.on('honderdzestig', 1) * (1 - q.on('instandhoudingsdoelen', 1, 0.4)), 'center');
    const K = q.on('instandhoudingsdoelen', 1, 0.5); if (K > 0.01) { const d = clamp((t - q.at('instandhoudingsdoelen', 1)) / 0.4 - 0.6, 0, 1);
      paneel(ctx, 1100, 230, 700, 460, '', d); metaA(ctx, 'instandhoudingsdoel', 1140, 300, d, C.goud, 'left', 28);
      regel(ctx, 'blijven', 1140, 410, q.on('blijven', 1), C.text, 40, 'left', 700); regel(ctx, 'behoud', 1500, 410, q.on('blijven', 1), C.groen, 36);
      regel(ctx, 'meer', 1140, 540, q.on('meer', 1), C.text, 40, 'left', 700); regel(ctx, 'uitbreiding', 1500, 540, q.on('meer', 1), C.groen, 36); } },

  s06(ctx, t, q) { bg(ctx, 'schema');
    const H = q.on('habitattype', 2, 0.5);
    tag(ctx, 'soorten', 330, 200, C.groen, q.on('soorten', 1), 'center', 30); tag(ctx, 'habitattypen', 640, 200, C.goud, q.on('habitattypen', 1), 'center', 30);
    paneel(ctx, 120, 260, 820, 560, '', H); metaA(ctx, 'habitattype · droge heide', 160, 320, H, C.goud);
    if (H > 0.01) { ctx.save(); ctx.globalAlpha *= H; ctx.fillStyle = KL_ZAND; ctx.fillRect(160, 700, 740, 80); heideRij(ctx, 170, 880, 702, 92, { seed: 5 }); ctx.restore(); }
    const L = q.on('lijst', 1); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; roundRect(ctx, 600, 360, 300, 230, 10); shape(ctx, '#F2EEE4', '#C8C0B0', 2);
      text(ctx, 'struikhei', 630, 420, fTekst(30, 700), '#1A2740', 'left'); ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 3; i++) ctx.fillRect(630, 455 + i * 40, 200 - i * 40, 8); ctx.restore(); }
    naamBij(ctx, 'eisen aan de bodem', 'arm zand, weinig voedsel', 380, 420, q.on('bodem', 1), 'center');
    const V = q.on('Veluwe', 1, 0.5); paneel(ctx, 1040, 260, 760, 560, '', V); metaA(ctx, 'Veluwe · droge heide', 1080, 320, V, C.goud);
    if (V > 0.01) { const U = q.on('uitbreiding', 1), B = q.on('verbetering', 1);
      ecA(ctx, U, () => { roundRect(ctx, 1090, 380, 220, 140, 10); ctx.fillStyle = KL_HEIDE; ctx.fill(); roundRect(ctx, 1090, 380, lerp(220, 320, ease((t - q.at('uitbreiding', 1)) / 1.2)), 140, 10); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); });
      regel(ctx, 'oppervlakte: uitbreiding', 1090, 570, U, C.text, 34, 'left', 700);
      ecA(ctx, B, () => { heideRij(ctx, 1480, 1760, 520, 60, { seed: 8 }); pijl(ctx, 1450, 520, 1450, 400, C.groen, 1, 4, 16); });
      regel(ctx, 'kwaliteit: verbetering', 1090, 650, B, C.text, 34, 'left', 700); } },

  s07(ctx, t, q) { bg(ctx, 'schema');
    gebiedKaart(ctx, 120, 170, 700, 480, { t, akkerHeide: q.on('heide', 1, 1.2) * 0.85, akkerHl: q.on('akker', 1) });
    tag(ctx, 'natuurdoel: droge heide', 470, 720, C.groen, q.on('natuurdoel', 1), 'center', 32);
    bas(ctx, 960, t, { pose: q.on('beslist', 1) > 0.5 ? 'schouders' : (q.on('doelsoort', 1) > 0.5 ? 'wijs' : 'staan'), kijk: 1 });
    naamBij(ctx, 'Bas', 'ecoloog', 960, 395, 1 - q.on('beslist', 1), 'center');
    const T = q.on('tapuit', 1, 0.5); paneel(ctx, 1150, 170, 650, 480, '', T); metaA(ctx, 'doelsoort', 1190, 230, T, C.goud);
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; const top = tapuitPaal(ctx, 1440, 620, 1.4, { hol: q.on('open', 1) }); tapuit(ctx, top[0], top[1], 1.6, { t, wip: 1 }); ctx.restore(); }
    naamBij(ctx, 'tapuit', '± 15 centimeter', 1680, 400, T, 'center');
    chip(ctx, 'open, kale heide', 1300, 720, C.groen, q.on('kale', 1), 30); chip(ctx, 'sterk achteruitgegaan', 1640, 720, C.koraal, q.on('achteruitgegaan', 1), 30);
    vraagteken(ctx, 1080, 260, q.on('beslist', 1), 110); },

  s09(ctx, t, q) { bg(ctx, 'schema'); ec3Antwoord(ctx, 'antwoord a: de overheid, met advies van de ecoloog');
    const rij = (i, a, kop, wat, icon) => { const y = 250 + i * 190; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 260, y, 1000, 160, 16); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5);
      text(ctx, kop, 460, y + 72, fTekst(44, 700), C.text, 'left'); text(ctx, wat, 460, y + 122, fTekst(32), C.text2, 'left'); icon(360, y + 80); ctx.restore(); };
    rij(0, q.on('Europa', 1), 'Europa', 'maakte de regels', (x, y) => { for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; circ(ctx, x + Math.cos(an) * 48, y + Math.sin(an) * 48, 7, C.goud); } });
    rij(1, q.on('Rijk', 1), 'Rijk', 'wijst de gebieden aan, met hun doelen', (x, y) => nederland(ctx, x - 70, y - 72, 52, { stippen: 14 }));
    rij(2, q.on('provincie', 1), 'provincie', 'beheerplan · deze akker op de kaart', (x, y) => gebiedKaart(ctx, x - 70, y - 55, 140, 110, { akkerHl: 1, akkerHeide: q.on('natuur', 1) }));
    const O = q.on('overheid', 1); if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1290, 250); ctx.lineTo(1310, 250); ctx.lineTo(1310, 790); ctx.lineTo(1290, 790); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'beslist', 1420, 300, C.goud, q.on('beslist', 1), 'center', 30);
    const B = q.on('adviseert', 1, 0.3); bas(ctx, 1600, t, { a: B, pose: q.on('kennis', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1, h: 380 });
    tag(ctx, 'adviseert', 1600, 420, C.groen, B, 'center', 30);
    pijl(ctx, 1500, 690, 1290, 690, C.groen, q.on('kennis', 1), 4, 16); },

  // ---------- H2 Van akker naar natuur ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    bodemDoorsnede(ctx, 120, 230, 880, 560, { bouwH: 210, ploeg: q.on('geploegd', 1), mest: q.on('bemest', 1) * (1 - q.on('spaarpot', 1)), fosfaat: q.on('fosfaat', 1, 1), hl: q.on('bouwvoor', 1) * (1 - q.on('geploegd', 1)), t });
    naamBij(ctx, 'bouwvoor', '20 tot 40 centimeter', 1030, 330, q.on('bouwvoor', 1), 'left');
    naamBij(ctx, 'zand', '', 1030, 560, q.on('bouwvoor', 1), 'left');
    naamBij(ctx, 'fosfaat', 'uit mest', 1030, 440, q.on('fosfaat', 1), 'left');
    spaarpot(ctx, 1560, 640, 1.1, { a: q.on('spaarpot', 1, 0.5), vul: lerp(0.15, 1, q.on('gevuld', 1, 1.6)), label: 'fosfaat' }); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('grassen', 1, 2.5);
    grondVak(ctx, 300, 170, 460, { rijk: 0, seed: 2 }); grondVak(ctx, 1160, 170, 460, { rijk: 1, groei: gr, t, seed: 4, a: q.on('rijke', 1, 0.4) });
    naamBij(ctx, 'weinig fosfaat', 'heide', 530, 690, 1, 'center'); naamBij(ctx, 'veel fosfaat', 'snelle grassen', 1390, 690, q.on('rijke', 1), 'center');
    const W2 = q.on('bedreigde', 1, 0.6); if (W2 > 0.01) { ctx.save(); ctx.globalAlpha *= W2; roundRect(ctx, 300, 750, 1320, 110, 14); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
      for (let i = 0; i < 10; i++) circ(ctx, 350 + i * 34, 792, 12, i < 7 ? C.groen : '#3A4458');
      text(ctx, '7 van de 10 bedreigde soorten: op fosfaatarme plekken', 720, 802, fTekst(32, 700), C.text, 'left');
      metaText(ctx, 'Wassen e.a. 2005 · onderzochte natte graslanden en moerassen, NL/België', 330, 842, C.grain, 'left', 22); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const leeg = q.on('maaien', 1);
    spaarpot(ctx, 420, 520, 1.3, { vul: lerp(1, 0.9, q.on('tientallen', 1, 3)), label: 'fosfaat' });
    chip(ctx, 'in fosfaat zit fosfor (P)', 420, 230, C.oker, q.on('fosfor', 1), 30);
    trekkerKar(ctx, 1500, 780, 0.95, { a: q.on('maaien', 1, 0.4), lading: 'gras', t: t * leeg });
    if (leeg > 0.01) { const t0 = q.at('maaien', 1); for (let k = 0; k < 6; k++) { const u = (t - t0 - k * 2.2) / 1.6; if (u < 0 || u > 1) continue; munt(ctx, lerp(420, 1330, ease(u)), lerp(340, 600, ease(u)) - Math.sin(u * Math.PI) * 180, 1.3); } }
    chip(ctx, '± 10 kg fosfor per hectare per jaar', 1300, 330, C.oker, q.on('tien', 1), 32);
    metaA(ctx, '1 munt = 10 kg fosfor', 1300, 400, q.on('tien', 1), C.grain, 'center', 24);
    tag(ctx, 'tientallen tot honderden jaren', 960, 160, C.koraal, q.on('tientallen', 1), 'center', 34);
    stempel(ctx, 1000, 620, 'niet snel heide', C.koraal, q.on('Zonder', 1), -0.1); },

  s13(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'uitmijnen', 360, 170, C.goud, 1, 'center', 34);
    const F = 1 - q.on('Stel', 1, 0.5);
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; ctx.fillStyle = '#4A3E2E'; ctx.fillRect(120, 620, 820, 30);
      for (let i = 0; i < 7; i++) maisPlant(ctx, 160 + i * 66, 622, 260 * clamp(q.on('telen', 1, 2) + 0.05, 0, 1), { seed: i, t });
      trekkerKar(ctx, 780, 820, 0.62, { a: q.on('oogst', 1, 0.4), lading: 'mais', t: t * q.on('oogst', 1) });
      chip(ctx, 'stikstof', 250, 255, C.groen, q.on('stikstof', 1), 30); vink_(ctx, 360, 245, 16, q.on('stikstof', 1));
      chip(ctx, 'fosfaat', 560, 255, C.koraal, q.on('geen', 1), 30); kruis(ctx, 660, 245, 14, q.on('geen', 1)); ctx.restore(); }
    // vergelijking per jaar: maaien 1 munt, uitmijnen 4 munten
    const V = q.on('veertig', 1, 0.5); paneel(ctx, 1100, 200, 700, 420, '', V); metaA(ctx, 'per hectare per jaar', 1140, 260, V);
    regel(ctx, 'maaien', 1140, 360, V, C.text, 36, 'left', 700); munt(ctx, 1420, 350, 1.5, V); regel(ctx, '± 10 kg', 1640, 362, V, C.text2, 32, 'left', 600);
    regel(ctx, 'uitmijnen', 1140, 470, V, C.text, 36, 'left', 700); for (let k = 0; k < 4; k++) munt(ctx, 1420 + k * 44, 460, 1.5, clamp(V * 4 - k * 0.8, 0, 1)); regel(ctx, '± 40 kg', 1640, 472, V, C.text2, 32, 'left', 600);
    tag(ctx, '× 4', 1450, 570, C.goud, q.on('vier', 1), 'center', 32);
    const S = q.on('Stel', 1, 0.5); spaarpot(ctx, 520, 520, 1.2, { a: S, vul: 1, label: '' });
    naamBij(ctx, '400 kg fosfor per hectare', 'rekenvoorbeeld', 520, 760, S, 'center');
    vraagteken(ctx, 860, 400, q.on('lang', 1), 100); },

  s15(ctx, t, q) { bg(ctx, 'schema'); ec3Antwoord(ctx, 'antwoord b: ongeveer tien jaar');
    metaA(ctx, 'rekenvoorbeeld', 1800, 150, 1, C.grain, 'right', 26);
    regel(ctx, 'uitmijnen:', 160, 270, q.on('Uitmijnen', 1), C.text, 40, 'left', 700); regel(ctx, '400 kg fosfor ÷ 40 kg per jaar', 440, 270, q.on('gedeeld', 1), C.text, 40, 'left', 600); regel(ctx, '= 10 jaar', 1080, 270, q.on('tien', 1), C.groen, 44, 'left', 800);
    regel(ctx, 'maaien:', 160, 360, q.on('maaien', 1), C.text, 40, 'left', 700); regel(ctx, '400 kg fosfor ÷ 10 kg per jaar', 440, 360, q.on('maaien', 1), C.text, 40, 'left', 600); regel(ctx, '= 40 jaar', 1080, 360, q.on('maaien', 1, 1), C.koraal, 44, 'left', 800);
    // tijdas 0–50 jaar
    const A = q.on('proeven', 1, 0.4), x0 = 300, sx = 26; if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, 780); ctx.lineTo(x0 + 50 * sx, 780); ctx.stroke();
      for (let j = 0; j <= 50; j += 10) { ctx.beginPath(); ctx.moveTo(x0 + j * sx, 780); ctx.lineTo(x0 + j * sx, 792); ctx.stroke(); metaText(ctx, String(j), x0 + j * sx, 826, C.text2, 'center', 26); } metaText(ctx, 'jaar', x0 + 50 * sx + 20, 790, C.text2, 'left', 26); ctx.restore(); }
    const bar = (y, a0, a1, col, a, lab, sub) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0 + a0 * sx, y, (a1 - a0) * sx, 44, 12); shape(ctx, rgba(col, 0.55), col, 2); text(ctx, lab, x0 + a1 * sx + 20, y + 32, fTekst(32, 700), C.text, 'left'); if (sub) metaText(ctx, sub, x0 + a1 * sx + 20, y + 64, C.grain, 'left', 22); ctx.restore(); };
    bar(520, 10, 20, C.groen, A, 'echte proeven: 10–20 jaar', '');
    bar(640, 18, 44, C.koraal, q.on('Drents', 1), 'Drents-Friese Wold', 'schatting · rijkste grond · 18–44 jaar'); },

  s16(ctx, t, q) { bg(ctx, 'schema');
    const weg = q.on('eraf', 1, 3);
    bodemDoorsnede(ctx, 260, 340, 1040, 440, { bouwH: 150, fosfaat: 1, weg, diep: q.on('dieper', 1) });
    graafmachine(ctx, 1490, 340, 0.85, { arm: 0.3 + 0.5 * Math.abs(Math.sin(t * 1.2)) * clamp(q.on('afgraven', 1) - q.on('duur', 1) * 0.6, 0, 1), vol: KL_BOUWVOOR });
    naamBij(ctx, 'bouwvoor', '', 780, 320, q.on('bouwvoor', 1) * (1 - weg), 'center');
    tag(ctx, 'duur', 1600, 520, C.koraal, q.on('duur', 1), 'center', 32);
    tag(ctx, 'bodemleven en zaden gaan mee', 1600, 620, C.koraal, q.on('bodemleven', 1), 'center', 30);
    const B = q.on('bodemonderzoek', 1, 0.8); if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const d = lerp(0, 300, ease((t - q.at('bodemonderzoek', 1)) / 1.5)); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(594, 200, 12, 140 + d); roundRect(ctx, 560, 190, 80, 18, 6); ctx.fill(); ctx.restore(); }
    naamBij(ctx, 'bodemonderzoek', '', 600, 180, B, 'center');
    naamBij(ctx, 'ook dieper fosfaat', '', 560, 720, q.on('dieper', 1), 'center'); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    nederland(ctx, 140, 190, 200, { pin: [5.79, 51.99], pinA: q.on('Reijerscamp', 1) });
    naamBij(ctx, 'Wolfheze', 'rand van de Veluwe', 420, 520, q.on('Wolfheze', 1), 'left');
    metaA(ctx, 'echt gebeurd', 760, 190, q.on('echt', 1), C.goud, 'left', 28); regel(ctx, 'Reijerscamp', 760, 250, q.on('Reijerscamp', 1), C.text, 48, 'left', 700);
    const S = q.on('akkers', 1, 0.5); bodemDoorsnede(ctx, 760, 560, 640, 220, { a: S, bouwH: 90, fosfaat: 1, weg: q.on('afgegraven', 1, 2), laagje: q.on('strooiden', 1, 2) });
    chip(ctx, '2006', 900, 330, C.goud, q.on('tweeduizend', 1), 32);
    naamBij(ctx, 'laagje heidegrond', '1 centimeter', 1080, 520, q.on('centimeter', 1), 'center');
    const Z = q.on('zaden', 1, 0.6); zoomCircle(ctx, 1610, 400, 230, 1000, 634, 'vergroot · bodemleven', Z, () => bodemleven(ctx, 1610, 400, 230, t, { zaad: q.on('zaden', 1), schimmel: q.on('schimmels', 1), dier: q.on('bodemdiertjes', 1) }));
    naamBij(ctx, 'zaden', '', 1530, 300, Z * q.on('zaden', 1), 'center'); naamBij(ctx, 'schimmels', '', 1700, 520, Z * q.on('schimmels', 1), 'center');
    tag(ctx, 'Bas doet hetzelfde', 1080, 830, C.groen, q.on('hetzelfde', 1), 'center', 30); },

  // ---------- H3 Kleine, losse populaties ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    lappendeken(ctx, 140, 170, 1100, 640, { t, leeg: q.on('pech', 1, 3), hlLeeg: q.on('pech', 1) * (1 - q.on('genen', 1)), instroom: q.on('nieuwe', 1), ver: q.on('nieuwe', 1, 1) });
    naamBij(ctx, 'groot gebied', '', 140 + 0.14 * 1100, 170 + 0.5 * 640 + 20, q.on('los', 1), 'center');
    tag(ctx, 'pech', 140 + 0.6 * 1100, 170 + 0.62 * 640 - 110, C.koraal, q.on('pech', 1), 'center', 30);
    { ctx.save(); const top = tapuitPaal(ctx, 1520, 470, 1, {}); tapuit(ctx, top[0], top[1], 1.4, { t, wip: 1 }); ctx.restore(); vraagteken(ctx, 1700, 330, 1 - q.on('heidevelden', 1), 90); }
    tag(ctx, 'kleine populatie: sterft makkelijker uit', 1540, 600, C.koraal, q.on('kleine', 1), 'center', 26);
    tag(ctx, 'film: Toeval en uitwisseling', 1540, 720, C.goud, q.on('genen', 1), 'center', 26); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const weg = q.on('tien', 1, 1.5), K1 = [];
    for (let i = 0; i < 9; i++) K1.push({ u: 0.1 + 0.8 * hash(i + 3), v: 0.3 + 0.6 * hash(i + 13), z: i < 6, f: i < 6 ? q.on('zeldzame', 1) * (1 - (i < 5 ? weg : 0)) : 1, rot: hash(i) * 6.28 });
    keverVak(ctx, 140, 180, 780, 620, 'Reijerscamp', 'loopkevers', { kevers: K1, t });
    chip(ctx, 'eerste jaren: veel zeldzame soorten', 530, 860 - 36, C.groen, q.on('eerste', 1) * (1 - weg), 26);
    chip(ctx, 'na tien jaar: veel weer weg', 530, 860 - 36, C.koraal, weg, 26);
    const D = q.on('Drenthe', 1, 0.5), K2 = []; for (let i = 0; i < 6; i++) K2.push({ u: 0.15 + 0.7 * hash(i + 31), v: 0.3 + 0.6 * hash(i + 41), z: true, f: q.on('heidekevers', 1), rot: hash(i + 5) * 6.28 });
    keverVak(ctx, 1000, 180, 780, 620, 'Drenthe', 'andere proef', { a: D, kevers: K2, t });
    chip(ctx, 'sneller echte heidekevers', 1390, 824, C.groen, q.on('heidekevers', 1), 26);
    vraagteken(ctx, 960, 140, q.on('Hoe', 1), 80); },

  s21(ctx, t, q) { bg(ctx, 'schema'); ec3Antwoord(ctx, 'antwoord a: vanuit een grote heide');
    const F = 1 - q.on('Daarom', 1, 0.4), M = q.on('Daarom', 1, 0.8);
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F;
      const Hh = q.on('grote', 1), lt = clamp((t - q.at('liepen', 1)) / 3, 0, 1); const K2 = [];
      for (let i = 0; i < 6; i++) { const ux = lerp(-0.6 + 0.3 * hash(i), 0.15 + 0.7 * hash(i + 31), ease(lt)); K2.push({ u: ux, v: 0.3 + 0.6 * hash(i + 41), z: true, f: Hh, rot: 0 }); }
      const g = keverVak(ctx, 1000, 220, 780, 600, 'Drenthe', 'direct naast een grote heide', { heide: Hh, t });
      K2.forEach(k => loopkever(ctx, g.px0 + k.u * g.pw, g.vy + k.v * g.vh, 2.4, { a: k.f, rot: k.rot, t: t + k.v * 3, zeldzaam: true }));
      const K1 = []; for (let i = 0; i < 4; i++) K1.push({ u: 0.15 + 0.7 * hash(i + 3), v: 0.3 + 0.6 * hash(i + 13), z: false, f: 1, rot: hash(i) * 6.28 });
      keverVak(ctx, 140, 220, 780, 600, 'Reijerscamp', 'verder van een grote heide', { kevers: K1, t, afstand: q.on('verder', 1) });
      chip(ctx, 'echte heidekevers: pas over tientallen jaren', 530, 860, C.koraal, q.on('tientallen', 1), 26);
      ctx.restore(); }
    if (M > 0.01) { gebiedKaart(ctx, 260, 200, 980, 660, { a: M, t, randHl: q.on('grenst', 1), akkerHl: 1, ecoductHl: q.on('ecoduct', 1), labels: 1 });
      tag(ctx, 'hier begint Bas', 1520, 600, C.goud, q.on('grenst', 1), 'center', 30);
      tag(ctx, 'film: Ingrijpen of laten gaan?', 1520, 330, C.groen, q.on('Ingrijpen', 1), 'center', 28); } },

  // ---------- H4 Werkt het? ----------
  s22(ctx, t, q) { bg(ctx, 'schema');
    ctx.fillStyle = '#4A3E2E'; ctx.fillRect(120, 650, 1000, 200);
    daan(ctx, 330, t, { voet: 840, pose: q.on('vierkant', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1 });
    naamBij(ctx, 'Daan', 'vegetatieopname', 330, 410, q.on('vegetatieopnamen', 1), 'center');
    opnameVierkant(ctx, 820, 760, 520, { touw: q.on('vierkant', 1), planten: 1, hl: q.on('plantensoort', 1) * (1 - q.on('bedekt', 1)) });
    const n = 3 * q.on('plantensoort', 1, 2.4); const pct = q.on('bedekt', 1);
    telformulier(ctx, 1250, 160, 520, [['struikhei', pct > 0.5 ? '40 %' : ''], ['buntgras', pct > 0.5 ? '15 %' : ''], ['schapenzuring', pct > 0.5 ? '5 %' : '']], { n, kop: 'opname 1 · 2027' });
    metaA(ctx, 'voorbeeld', 1770, 448, q.on('plantensoort', 1), C.grain, 'right', 22);
    const J = q.on('jaar', 1, 0.6); if (J > 0.01) { ['2027', '2028', '2029', '…'].forEach((jr, i) => { const x = 1270 + i * 130; ecA(ctx, clamp(J * 4 - i, 0, 1), () => { roundRect(ctx, x, 520, 100, 100, 8); shape(ctx, rgba(C.fill, 0.8), '#F2EEE4', 2); if (i < 3) { struikhei(ctx, x + 35, 600, 40 + i * 8, { seed: i + 2, jong: 1 }); grasPol(ctx, x + 72, 600, 30, { seed: i }); } metaText(ctx, jr, x + 50, 660, C.text2, 'center', 24); }); }); }
    tag(ctx, 'monitoring', 1510, 750, C.goud, q.on('monitoring', 1), 'center', 34); },

  s23(ctx, t, q) { bg(ctx, 'schema'); balken(ctx, t, q, {});
    vraagteken(ctx, 1620, 420, q.on('Welk', 1), 100); chip(ctx, 'doel: droge heide', 1620, 560, C.goud, q.on('doel', 1), 30); },

  s25(ctx, t, q) { bg(ctx, 'schema'); ec3Antwoord(ctx, 'antwoord b: afgegraven met heidegrond');
    balken(ctx, t, q, { na: true, meter: q.on('soorten', 1), hl3: q.on('jonge', 1), hl1: q.on('minst', 1) });
    const D = q.on('Drenthe', 1, 0.5); if (D > 0.01) { paneel(ctx, 1380, 200, 420, 300, '', D); metaA(ctx, 'Drenthe', 1410, 250, D, C.goud);
      ecA(ctx, D, () => { ctx.fillStyle = KL_ZAND; ctx.fillRect(1410, 400, 360, 60); heideRij(ctx, 1420, 1760, 402, 70, { seed: 21 }); text(ctx, 'laag heidegrond: snel heide', 1410, 310, fTekst(30, 700), C.text, 'left'); text(ctx, 'met zeldzame soorten', 1410, 350, fTekst(30), C.text2, 'left'); }); }
    haak(ctx, 380, 1300, 160, '', C.groen, 0);
    tag(ctx, 'de grond die je strooit, stuurt', 1590, 600, C.groen, q.on('stuurt', 1), 'center', 28); },

  s26(ctx, t, q) { bg(ctx, 'schema');
    const F = 1 - q.on('Daarom', 1, 0.5) * 0.65;
    ctx.save(); ctx.globalAlpha *= F;
    const aan = [1, 1, 1, q.on('stuur', 1)]; kringloop(ctx, 860, 470, 250, aan, q.on('stuur', 1) > 0.5 && q.on('adaptief', 1) < 0.5 ? 3 : -1, null);
    schaapStil(ctx, 420, 830, 1.0, { a: q.on('schapen', 1, 0.4), graas: 1 }); naamBij(ctx, 'schapen', '', 420, 690, q.on('schapen', 1), 'center');
    zaadZakje(ctx, 220, 340, 1, q.on('zaad', 1)); naamBij(ctx, 'zaad', '', 220, 250, q.on('zaad', 1), 'center');
    berkStronk(ctx, 170, 650, 1.1, q.on('berken', 1)); naamBij(ctx, 'berkjes weg', '', 230, 570, q.on('berken', 1), 'center');
    tag(ctx, 'adaptief beheer', 860, 478, C.goud, q.on('adaptief', 1), 'center', 30);
    ctx.restore();
    const T = q.on('tapuit', 1, 0.5); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; const top = tapuitPaal(ctx, 1640, 800, 1.3, {}); tapuit(ctx, top[0], top[1], 1.7, { t, wip: 1 }); ctx.restore(); }
    chip(ctx, 'open, kale heide, met insecten', 1580, 420, C.groen, q.on('insecten', 1), 26);
    const D = q.on('Daan', 1, 0.3); daan(ctx, 1320, t, { a: D, pose: 'vasthouden', kijk: 1, hold: (c, x, y) => { roundRect(c, x - 30, y - 10, 60, 80, 6); shape(c, '#8A6A4A', '#6A4E36', 1.5); roundRect(c, x - 24, y, 48, 62, 4); shape(c, '#F2EEE4', '#C8C0B0', 1); } });
    naamBij(ctx, 'Daan', 'blijft tellen', 1320, 420, D, 'center'); },

  // ---------- Recap ----------
  s27(ctx, t, q) { bg(ctx, 'schema');
    const paneelStadium = (i, a, fn, lab) => { if (a <= 0.01) return; const x = 140 + i * 560; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 170, 520, 420, 16); shape(ctx, rgba(C.fill, 0.55), C.line, 1.5); ctx.save(); roundRect(ctx, x, 170, 520, 420, 16); ctx.clip(); fn(x); ctx.restore(); text(ctx, lab, x + 260, 640, fTekst(32, 700), C.text, 'center'); ctx.restore(); };
    paneelStadium(0, 1, x => { ctx.fillStyle = KL_BOUWVOOR; ctx.fillRect(x, 470, 520, 120); for (let i = 0; i < 6; i++) maisPlant(ctx, x + 50 + i * 85, 472, 260, { seed: i + 4, t });
      ecA(ctx, q.on('fosfaat', 1), () => { for (let i = 0; i < 26; i++) circ(ctx, x + 14 + hash(i + 50) * 492, 486 + hash(i + 70) * 90, 5, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.35), 1); }); }, 'mais');
    chip(ctx, 'op rijke grond wint gras', 400, 720, C.koraal, q.on('gras', 1) * (1 - q.on('doel', 1)), 28);
    chip(ctx, 'uitmijnen: 10–20 jaar, of langer', 980, 720, C.oker, q.on('Uitmijnen', 1) * (1 - q.on('doel', 1)), 28);
    paneelStadium(1, q.on('bodem', 1), x => { ctx.fillStyle = KL_ZAND; ctx.fillRect(x, 470, 520, 120); ctx.fillStyle = KL_HEIDE; ctx.fillRect(x, 470, 520, 10); for (let i = 0; i < 7; i++) struikhei(ctx, x + 40 + i * 72, 472, 40, { seed: i, jong: 1, bloei: 0.3 }); }, 'kaal zand + heidegrond');
    paneelStadium(2, q.on('doel', 1), x => { ctx.fillStyle = KL_ZAND; ctx.fillRect(x, 470, 520, 120); heideRij(ctx, x + 10, x + 510, 474, 90, { seed: 12 }); const top = tapuitPaal(ctx, x + 380, 520, 1.1, {}); tapuit(ctx, top[0], top[1], 1.3, { t, wip: 1 }); }, 'jonge heide, de tapuit?');
    const W4 = ['doel', 'bodem', 'verbinding', 'meten']; W4.forEach((w, i) => { const a = q.on(w, 1); if (a <= 0.01) return; tag(ctx, w, 400 + i * 380, 800, i === 0 ? C.goud : C.groen, a, 'center', 34); if (i < 3) pijl(ctx, 400 + i * 380 + 110, 788, 400 + (i + 1) * 380 - 110, 788, rgba(C.line, 0.9), q.on(W4[i + 1], 1), 3, 14); }); },

  s28(ctx, t, q) { bg(ctx, 'schema');
    opleidingKaart(ctx, 140, 200, 640, 'hbo · vier jaar', 'Bos- en natuurbeheer', 'Velp', q.on('hbo', 1));
    opleidingKaart(ctx, 140, 380, 640, 'wo · bachelor', 'Biologie', 'Nijmegen', q.on('biologie', 1));
    opleidingKaart(ctx, 140, 560, 640, 'wo · bachelor', 'Bos- en natuurbeheer', 'Wageningen', q.on('Wageningen', 1));
    opleidingKaart(ctx, 840, 560, 640, 'mbo', 'natuur en groen', 'een groene school', q.on('mbo', 1));
    daan(ctx, 1080, t, { voet: 520, h: 300, pose: 'staan', kijk: 1 }); bas(ctx, 1320, t, { voet: 520, h: 324, pose: 'wijs', kijk: -1 });
    metaA(ctx, 'stand oktober 2026', 1800, 860, 1, C.grain, 'right', 22); }
});

// bedekkingsbalken van de Reijerscamp na zes jaar (s23, s25)
function balken(ctx, t, q, o) { const { na = false, meter = 0, hl1 = 0, hl3 = 0 } = o; const base = 720, bh = 380, bw = 220, X = [380, 730, 1080];
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(320, base - bh - 20); ctx.lineTo(320, base); ctx.lineTo(1340, base); ctx.stroke();
  [0, 50, 100].forEach(v => { metaText(ctx, v + ' %', 300, base - bh * v / 100 + 8, C.text2, 'right', 24); });
  metaText(ctx, 'bedekking', 120, base - bh - 70, C.text2, 'left', 24); metaText(ctx, 'gemeten na zes jaar · Reijerscamp', 1340, 230, C.grain, 'right', 24);
  const g = i => na ? 1 : [q.on('niets', 1, 1.2), q.on('alleen', 1, 1.2), q.on('heidegrond', 1, 1.2)][i];
  const D = [[99, 'niets gedaan', ''], [25, 'alleen afgegraven', ''], [58, 'met heidegrond', '']];
  D.forEach(([v, lab], i) => { const a = na ? 1 : (g(i) > 0.001 ? 1 : 0); bedekBalk(ctx, X[i], base, bw, bh, v, { a, groei: g(i), label: lab, kl: C.groen });
    if (i === 2 && hl3 > 0.01) ecA(ctx, hl3, () => { roundRect(ctx, X[i] - 8, base - bh * v / 100 - 8, bw + 16, bh * v / 100 + 16, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }); });
  if (meter > 0.01) { metaA(ctx, 'lijkt op', 120, 826, meter, C.grain, 'left', 22); metaA(ctx, 'droge heide', 120, 852, meter, C.grain, 'left', 22);
    [18, 28, 40].forEach((v, i) => heideMeter(ctx, X[i] - 10, 818, 170, v, meter, i === 2 && hl3 > 0.5)); if (hl1 > 0.01) ecA(ctx, hl1, () => { roundRect(ctx, X[0] - 18, 808, 270, 44, 10); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); }); } }

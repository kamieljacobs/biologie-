// Examenbespreking vwo 2018-II — scènes deel d: Wat te doen aan de muizenplagen? (s70–s85, vragen 31–38)
Object.assign(SCENES, {
  s70(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX, ramp(t, 0.2));
    const tV = q.at('voorjaar'); const a1 = d_win(t, 0.4, tV - 0.2, 0.5), a2 = ramp(t, tV - 0.1, 0.5);
    d_al(ctx, a1, () => {
      const g1 = ramp(t, q.at('context'), 0.7), g2 = ramp(t, q.at('kaal'), 0.7);
      d_grasland(ctx, 130, 190, 790, 400, { kaal: 0, t, a: g1, seed: 2 });
      naamBij(ctx, 'augustus', null, 160, 252, g1, 'left');
      d_grasland(ctx, 1000, 190, 790, 400, { kaal: g2 * 0.95, gangen: g2, t, a: ramp(t, q.at('graslanden') - 0.4, 0.6), seed: 5 });
      naamBij(ctx, 'maart', null, 1030, 252, ramp(t, q.at('graslanden') - 0.4, 0.6), 'left');
      // veldmuis loopt van het groene naar het kale land
      const ma = ramp(t, q.at('veldmuizen'), 0.3); const mx = lerp(260, 1560, (t - q.at('veldmuizen')) / 6);
      d_veldmuis(ctx, mx, 790, 0.95, ma, t, { loop: 1 });
      naamBij(ctx, 'veldmuis', null, mx, 650, ma, 'center');
    });
    d_al(ctx, a2, () => {
      const u = 0.4 * ramp(t, tV, 1.6) + 0.27 * ramp(t, q.at('zomer'), 1.4) + 0.25 * ramp(t, q.at('najaar'), 1.6);
      d_jaar(ctx, 260, 220, 1400, 520, u, { t, hl: { winter: ramp(t, q.at('winter'), 0.5) * (1 - ramp(t, q.at('zomer'), 0.5)) , voorjaar: ramp(t, tV, 0.5) * (1 - ramp(t, q.at('zomer'), 0.5)), zomer: ramp(t, q.at('zomer'), 0.5) * (1 - ramp(t, q.at('najaar'), 0.5)), najaar: ramp(t, q.at('najaar'), 0.5) } });
      if (u > 0.02) { const px = 260 + 1400 * u, py = 220 + 520 - 520 * d_jaarFn(u); d_veldmuis(ctx, px - 6, py - 14, 0.36, 1, t); }
    }); },

  s71(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 31, 1, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Noem', 'de vakterm voor de grens aan het aantal individuen in een gebied', 70, 190, 860, ramp(t, 0.3, 0.6));
    const tD = q.at('Draagkracht'), tV = q.at('Verzadigingspopulatie');
    punten(ctx, [{ t: 'draagkracht', a: ramp(t, tD - 0.2, 0.4), v: ramp(t, tD + 0.3, 0.4) }], 70, 540, 860);
    d_al(ctx, ramp(t, tV, 0.5), () => { regel(ctx, 'ook goed: verzadigingspopulatie', 70, 720, 1, C.groen, 34, 'left', 600); });
    // grafiek: populatie groeit en blijft onder de grens
    const gx = 1060, gy = 280, gw = 760, gh = 420, ga = ramp(t, 1.2, 0.6);
    d_al(ctx, ga, () => { examenKader(ctx, gx - 50, gy - 90, gw + 100, gh + 170, '', 1);
      const fn = (s) => 0.72 / (1 + Math.exp(-11 * (s - 0.38))), u = ramp(t, q.at('aantal'), 3.5);
      d_miniGrafiek(ctx, gx, gy, gw, gh, [{ fn, u, col: C.koraal }], { xl: 'tijd', yl: 'aantal veldmuizen' });
      const la = ramp(t, q.at('grens'), 0.5); const ly = gy + gh - gh * 0.72; d_al(ctx, la, () => { ctx.save(); ctx.setLineDash([16, 12]); ctx.strokeStyle = tD < t ? C.groen : C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx, ly); ctx.lineTo(gx + gw * ease(la), ly); ctx.stroke(); ctx.restore(); });
      const gl = ramp(t, tD, 0.5); if (gl > 0.01) d_al(ctx, gl, () => { ctx.save(); ctx.strokeStyle = rgba(C.groen, 0.28); ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(gx, ly); ctx.lineTo(gx + gw, ly); ctx.stroke(); ctx.restore(); });
      d_al(ctx, la * (1 - gl), () => vraagteken(ctx, gx + gw - 40, ly - 24, 1, 70));
      naamBij(ctx, 'draagkracht', null, gx + 40, ly - 22, gl, 'left', C.groen);
      if (u > 0.05) { const px = gx + gw * u, py = gy + gh - gh * fn(u); d_veldmuis(ctx, px - 4, py - 12, 0.32, 1, t); }
    }); },

  s72(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Schets', 'het verloop zonder én met ingreep (land begin juli onder water)', 70, 190, 760, ramp(t, 0.3, 0.6));
    const wa = ramp(t, q.at('onder') - 0.3, 0.6);
    d_al(ctx, wa, () => { const lv = ramp(t, q.at('onder'), 1.2) * (1 - ramp(t, q.at('populatie') + 0.6, 1.0)); d_grasland(ctx, 70, 540, 760, 300, { kaal: 0.1, gangen: 0.8, water: lv, t, seed: 3 });
      naamBij(ctx, 'begin juli', null, 100, 600, 1, 'left', '#9CC8F0'); });
    const da = ramp(t, 1.0, 0.6);
    const mk = [{ m: 1, n: 10, a: ramp(t, q.at('tien'), 0.5), t: '10', dy: -40, col: C.koraal }, { m: 7, n: 6000, a: ramp(t, q.at('zesduizend'), 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal },
      { m: 3, n: 84, a: ramp(t, q.at('halveert'), 0.5), t: '÷ 2', dx: -10, dy: -60, al: 'center', col: C.teal }];
    d_jdiag(ctx, 990, 200, 820, 520, { a: da, mk, water: ramp(t, q.at('water'), 0.6), legenda: ramp(t, q.at('Schets'), 0.5), t });
    d_al(ctx, ramp(t, q.at('Schets'), 0.5), () => { [[1, 7, C.koraal], [3, 7, C.teal]].forEach(([m0, m1, col], i) => { ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 4 + i); vraagteken(ctx, 990 + 820 * (m1 - 0.2) / 8 - (i ? 0 : 50), 200 + 140 + i * 160 + (i ? 0 : 90), 1, 64); ctx.restore(); }); }); },

  s73(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2);
    const tR = q.at('razendsnel');
    const u1 = 0.62 * ramp(t, q.at('exponentieel'), tR - q.at('exponentieel') - 0.6) + 0.38 * ramp(t, tR - 0.4, 1.4);
    const u2 = ramp(t, q.at('groeit', 2), q.at('groot') - q.at('groeit', 2));
    const tJ = q.at('juli', 2), tN = q.at('november');
    const zA = d_win(t, tJ - 0.2, tN, 0.5);
    const mk = [{ m: 7, n: 6000, a: ramp(t, tN, 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal }, { m: 7, n: 3000, a: ramp(t, q.at('drieduizend'), 0.5), t: '± 3000', dx: -30, al: 'right', dy: 10, col: C.teal }];
    const D = d_jdiag(ctx, 380, 180, 1180, 560, { a: ramp(t, 0, 0.5), u1, u2, mk, legenda: 1 - zA, t, water: ramp(t, q.at('Halveer'), 0.5) * (1 - ramp(t, tN, 0.6)) });
    naamBij(ctx, 'J-curve', null, 380 + 1180 * 6.3 / 8 - 30, 180 + 120, ramp(t, q.at('J-curve'), 0.5) * (u1 > 0.95 ? 1 : 0.0) + 0 * 0, 'right', C.koraal);
    d_al(ctx, ramp(t, q.at('J-curve'), 0.5) * (u1 < 0.95 ? 1 : 0), () => regel(ctx, 'J-curve', 380 + 1180 * 0.55, 180 + 300, 1, C.koraal, 44, 'center', 700));
    d_al(ctx, ramp(t, q.at('half'), 0.5) * (1 - ramp(t, tJ - 0.4, 0.4)), () => { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 8]); const xx = 380 + 1180 * 6.6 / 8; ctx.beginPath(); ctx.moveTo(xx, D.Y(d_N1(6.6))); ctx.lineTo(xx, D.Y(d_N2(6.6))); ctx.stroke(); ctx.restore(); naamBij(ctx, 'half zo groot', null, xx - 20, (D.Y(d_N1(6.6)) + D.Y(0)) / 2, 1, 'right', C.goud); });
    d_jzoom(ctx, 520, 300, 520, 300, { a: zA, mk80: ramp(t, q.at('tachtig'), 0.5), mk40: ramp(t, q.at('veertig'), 0.5), u2: ramp(t, q.at('veertig') - 0.3, 0.6) }); },

  s74(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2);
    const tN = q.at('november'), tD = q.at('drieduizend'), tT = q.at('Tip', 2);
    const u1 = ramp(t, q.at('doorgetrokken'), tN - q.at('doorgetrokken') + 0.4), u2 = ramp(t, q.at('stippellijn'), tD - q.at('stippellijn') + 0.3);
    punten(ctx, [{ t: 'doorgetrokken J-curve: ± 10 in mei → 6000 in november', a: ramp(t, 0.8, 0.4), v: ramp(t, tN + 0.4, 0.4) },
      { t: 'stippellijn: begint in juli op de helft, eindigt rond 3000', a: ramp(t, q.at('Eén', 2) - 0.2, 0.4), v: ramp(t, tD + 0.4, 0.4) }], 70, 200, 860, 1, { px: 32 });
    tipKaart(ctx, 'In juli is de helft van een klein getal nog steeds klein.', 70, 520, 860, ramp(t, tT, 0.5), 32);
    const mk = [{ m: 1, n: 10, a: ramp(t, q.at('tien'), 0.5) * (1 - ramp(t, q.at('stippellijn'), 0.5)), t: '10', dy: -40, col: C.koraal }, { m: 7, n: 6000, a: ramp(t, tN, 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal }, { m: 7, n: 3000, a: ramp(t, tD, 0.5), t: '± 3000', dx: -30, al: 'right', dy: 10, col: C.teal }];
    const zA = ramp(t, tT + 0.4, 0.5);
    d_jdiag(ctx, 1030, 200, 800, 520, { a: 1, u1, u2, mk, hl1: d_win(t, q.at('doorgetrokken'), q.at('Eén', 2)), hl2: d_win(t, q.at('stippellijn'), tT), legenda: 1 - zA, t });
    d_jzoom(ctx, 1130, 300, 440, 300, { a: zA, mk80: zA, mk40: zA });
    // fout: een diep gat in juli
    d_al(ctx, ramp(t, q.at('gat') - 0.6, 0.5), () => { const X = (m) => 1130 + 440 * (m - 1) / 4, Y = (n) => 300 + 300 - 300 * n / 200; ctx.save(); ctx.strokeStyle = rgba(C.koraal, 0.85); ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(X(3), Y(84)); ctx.lineTo(X(3), Y(3)); ctx.lineTo(X(3.6), Y(6)); ctx.stroke(); ctx.restore(); kruis(ctx, X(3) + 50, Y(30), 22, ramp(t, q.at('gat'), 0.4)); }); },

  s75(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 33, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'waarom afwachten kan helpen, en waarom onder water zetten de plaag het jaar erna erger kan maken', 70, 190, 900, ramp(t, 0.3, 0.6), { px: 36 });
    const a1 = ramp(t, q.at('afwachten'), 0.5), a2 = ramp(t, q.at('water'), 0.5);
    d_al(ctx, a1, () => { d_grasland(ctx, 1040, 190, 800, 270, { kaal: 0.9, gangen: 1, t, seed: 4 }); d_muizenRij(ctx, 1080, 315, 720, 14, t, 1, 0.24); naamBij(ctx, 'afwachten', null, 1066, 240, 1, 'left', C.goud); klokje(ctx, 1790, 240, 30, (t * 0.15) % 1, 1); });
    d_al(ctx, a2, () => { const lv = ramp(t, q.at('water'), 1.2); d_grasland(ctx, 1040, 510, 800, 270, { kaal: 0.9, gangen: 1, water: lv, t, seed: 6 }); naamBij(ctx, 'onder water', null, 1066, 560, 1, 'left', '#9CC8F0');
      d_al(ctx, ramp(t, q.at('volgend'), 0.5), () => { pijl(ctx, 1760, 760, 1760, 600, C.koraal, 1, 6, 22); vraagteken(ctx, 1712, 680, 1, 56); }); }); },

  s76(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 33, 2);
    const p1 = ramp(t, 0, 0.5), p2 = ramp(t, q.at('Twee') - 0.2, 0.5);
    // paneel 1: afwachten -> populatie stort vanzelf in
    d_al(ctx, p1, () => { const tS = q.at('stort'); const crash = ramp(t, tS, 2.5), win = ramp(t, q.at('winter'), 1.2);
      d_grasland(ctx, 70, 180, 860, 230, { kaal: 0.95, gangen: 1, t, seed: 4 });
      d_muizenRij(ctx, 100, 296, 800, Math.round(16 - 13 * crash), t, 1, 0.22);
      naamBij(ctx, 'hoge dichtheid', null, 96, 228, 1, 'left', C.goud);
      d_al(ctx, ramp(t, q.at('voedselgebrek'), 0.4) * (1 - win), () => { tag(ctx, 'voedselgebrek', 260, 380, C.koraal, 1, 'center', 26); tag(ctx, 'ziekte', 520, 380, C.koraal, ramp(t, q.at('ziekte'), 0.4), 'center', 26); });
      const fn = (s) => s < 0.45 ? 0.2 + 0.7 * Math.pow(s / 0.45, 1.8) : 0.9 - 0.8 * Math.pow(Math.min(1, (s - 0.45) / 0.4), 0.7) * (s < 0.85 ? 1 : 1) - 0.0;
      const u = 0.45 + 0.55 * ramp(t, tS, q.at('weinig') - tS + 0.5);
      d_miniGrafiek(ctx, 140, 470, 760, 160, [{ fn, u, col: C.koraal }], { xl: 'tijd', yl: 'aantal' });
      punten(ctx, [{ t: 'hoge dichtheid → vanzelf massale sterfte', v: ramp(t, q.at('weinig') + 0.2, 0.4) }], 70, 690, 860, 1, { px: 30 }); });
    d_al(ctx, p2, () => { const lv = ramp(t, q.at('water'), 1.0) * (1 - ramp(t, q.at('Die'), 1.2));
      d_grasland(ctx, 990, 180, 860, 230, { kaal: 0.95 - 0.8 * ramp(t, q.at('Die'), 2), gangen: 1, water: lv, t, seed: 7 });
      d_muizenRij(ctx, 1020, 296, 800, ramp(t, q.at('kleine'), 0.4) * 3 + Math.round(9 * ramp(t, q.at('harder'), 1.0)), t, 1, 0.22);
      naamBij(ctx, 'onder water', null, 1016, 228, 1 - ramp(t, q.at('Die'), 0.6), 'left', '#9CC8F0');
      d_al(ctx, ramp(t, q.at('voedsel', 2), 0.4), () => { tag(ctx, 'veel voedsel', 1200, 380, C.groen, 1, 'center', 26); tag(ctx, 'ruimte', 1440, 380, C.groen, ramp(t, q.at('ruimte'), 0.4), 'center', 26); });
      const fn2 = (s) => s < 0.25 ? 0.6 : s < 0.3 ? 0.6 - 0.5 * (s - 0.25) / 0.05 : 0.1 + 0.85 * Math.pow((s - 0.3) / 0.7, 1.6);
      const u = 0.3 * ramp(t, q.at('water'), 1.2) + 0.7 * ramp(t, q.at('overleven', 2), q.at('harder') - q.at('overleven', 2) + 0.6);
      d_miniGrafiek(ctx, 1060, 470, 760, 160, [{ fn: fn2, u, col: C.teal }], { xl: 'volgend jaar →', yl: 'aantal' });
      punten(ctx, [{ t: 'kleine populatie → betere overlevings- en voortplantingskansen', v: ramp(t, q.at('harder') + 0.2, 0.4) }], 990, 690, 860, 1, { px: 30 }); }); },

  s77(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 34, 'mc', ramp(t, 0, 0.4));
    const tK = q.at('Ken'), tT = q.at('Trombose'), tZ = q.at('Zonder');
    const f1 = d_win(t, 0.3, tK - 0.1, 0.5), f2 = d_win(t, tK, tT - 0.1, 0.5), f3 = ramp(t, tT, 0.5);
    // fase 1: vraag + muis met gifkorrels
    d_al(ctx, f1, () => { vraagKaart(ctx, 'Waaraan', 'sterven muizen door bromadiolon, dat vitamine K remt?', 70, 190, 860, 1);
      d_grasland(ctx, 1020, 220, 820, 420, { kaal: 0.4, gangen: 0.6, t, seed: 9 });
      d_korrels(ctx, 1480, 440, 1.3, ramp(t, q.at('Muizengif'), 0.5)); naamBij(ctx, 'bromadiolon', null, 1560, 335, ramp(t, q.at('bromadiolon'), 0.5), 'center', '#9FF0E0');
      d_veldmuis(ctx, lerp(1150, 1360, ramp(t, q.at('bromadiolon'), 1.6)), 440, 0.75, 1, t, { loop: 1 - ramp(t, q.at('bromadiolon') + 1.4, 0.3) });
      d_al(ctx, ramp(t, q.at('vitamine', 2), 0.5), () => ketting(ctx, [{ t: 'vitamine K' }, { t: 'trombine' }], 1060, 730, 740, 1, { px: 30 })); });
    // fase 2 en 3: de stollingsketen en het bloedvat
    const blok = ramp(t, tZ, 0.6);
    const kA = (w, n = 1) => ramp(t, q.at(w, n) - 0.1, 0.4);
    d_al(ctx, f2, () => {
      ketting(ctx, [{ t: 'vitamine K', a: kA('Vitamine', 3), col: blok > 0.5 ? C.koraal : C.goud }, { t: 'stollings­factoren', a: kA('stollingsfactoren') }, { t: 'trombine', a: kA('trombine', 2) },
        { t: 'fibrinogeen', a: kA('fibrinogeen'), col: C.oker }, { t: 'fibrine', a: kA('fibrine', 1) > 0 ? ramp(t, q.at('fibrine,') - 0.1, 0.4) : 0, col: C.oker }], 70, 250, 1780, 1, { px: 30 });
      // pijl van trombine naar de omzetting
      d_al(ctx, ramp(t, q.at('zet'), 0.4), () => naamBij(ctx, 'trombine zet om', null, 70 + (1780 - 280) / 5 * 3.5 + 280 + 14, 340, 1, 'center', C.goud));
      d_al(ctx, blok, () => { const kx = 70 + (1780 - 280) / 5 * 0.5; kruis(ctx, kx, 250, 34, 1); naamBij(ctx, 'bromadiolon', null, kx, 340, 1, 'center', C.teal);
        ctx.save(); ctx.globalAlpha *= 0.55; ctx.fillStyle = C.bgSchema; ctx.fillRect(70 + (1780 - 280) / 5 + 30, 180, 1780, 140); ctx.restore(); });
    });
    const bx = lerp(260, 1080, f3), by = lerp(440, 300, f3), bw = lerp(1400, 760, f3), bh = lerp(210, 170, f3);
    const net = ramp(t, q.at('draden'), 1.6) * (1 - blok), bloed = ramp(t, q.at('bloedingen') - 0.8, 2.5);
    d_bloedvat(ctx, bx, by, bw, bh, { a: Math.max(f2, f3) * ramp(t, q.at('fibrine,') - 0.6, 0.6), t, net, bloed, fibrinogeen: 1 });
    d_al(ctx, Math.max(f2, f3) * ramp(t, q.at('draden'), 0.5) * (bloed > 0.3 || blok < 0.5 ? 1 : 0), () => naamBij(ctx, bloed > 0.3 ? 'inwendige bloeding' : 'fibrinedraden', null, bx + bw / 2, by + bh + (bloed > 0.3 ? 200 : 90) * (f3 > 0.5 ? 1 : 1), 1, 'center', blok > 0.5 ? C.koraal : '#F2E2A0'));
    // fase 3: opties wegstrepen
    d_al(ctx, f3, () => { const tF = q.at('Fibrinogeen', 2);
      opties(ctx, ['trombose, minder fibrine', 'trombose, minder fibrinogeen', 'inwendige bloedingen, minder fibrine', 'inwendige bloedingen, minder fibrinogeen'], 70, 200, 960,
        { weg: [ramp(t, tT, 0.6), ramp(t, tT + 0.3, 0.6), 0, ramp(t, tF, 0.6)], goed: 2, g: ramp(t, q.at('antwoord'), 0.4) }, 1, { px: 32 }); }); },

  s78(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 35, 2, ramp(t, 0, 0.4));
    const t1 = q.at('Eén'), t2 = q.at('Twee', 2), t3 = q.at('Drie', 2);
    d_al(ctx, d_win(t, 0.3, t1 - 0.1, 0.5), () => vraagKaart(ctx, 'Welke', 'verklaringen voor meer stikstof in de sloot kunnen juist zijn?', 70, 190, 860, 1));
    const st = { sloot: 0.3 + 0.7 * ramp(t, q.at('stikstof'), 1.2), gangen: ramp(t, q.at('gegraaf'), 0.8), o2: ramp(t, q.at('zuurstof'), 0.8), bact: ramp(t, q.at('bacteriën'), 0.8),
      poep: ramp(t, q.at('poep'), 1.0), gras: 1 - 0.75 * ramp(t, q.at('aangevreten'), 1.0), opname: 0.7 - 0.6 * ramp(t, q.at('minder'), 1.0), uitspoel: 0.15 + 0.6 * ramp(t, q.at('spoelt'), 1.0) };
    d_sloot(ctx, 990, 190, 860, 600, st, t, ramp(t, 0.6, 0.6));
    d_al(ctx, ramp(t, q.at('sloten'), 0.5), () => naamBij(ctx, 'sloot', null, 1700, 250, 1, 'center', '#9CC8F0'));
    d_al(ctx, ramp(t, q.at('zeventig'), 0.5) * (1 - ramp(t, t1, 0.4)), () => regel(ctx, '+70% stikstof', 1700, 330, 1, C.koraal, 38, 'center', 800));
    const hl = (a, b) => d_win(t, a, b, 0.3);
    welNiet(ctx, [{ t: 'gegraaf → meer ammonificatie en nitrificatie', v: 'wel', a: ramp(t, t1, 0.4), s: ramp(t, q.at('Kan', 1), 0.4), hl: hl(t1, t2) },
      { t: 'poep en urine met stikstof', v: 'wel', a: ramp(t, t2, 0.4), s: ramp(t, q.at('Kan', 2), 0.4), hl: hl(t2, t3) },
      { t: 'aangevreten gras neemt minder nitraat op', v: 'wel', a: ramp(t, t3, 0.4), s: ramp(t, q.at('Kan', 3), 0.4), hl: hl(t3, q.at('Alle')) }], 70, 210, 880, ramp(t, t1 - 0.2, 0.4), { px: 32 });
    d_al(ctx, ramp(t, q.at('Alle'), 0.5), () => regel(ctx, 'alle drie wel → 2 punten', 70, 640, 1, C.groen, 38, 'left', 700));
    // namen bij wat er in de bodem gebeurt
    naamBij(ctx, 'zuurstof', null, 1080, 540, d_win(t, q.at('zuurstof'), t2), 'left', '#BFE3FF');
    naamBij(ctx, 'bacteriën', null, 1200, 640, d_win(t, q.at('bacteriën'), t2), 'left', C.groen);
    naamBij(ctx, 'poep en urine', null, 1060, 360, d_win(t, q.at('poep'), t3), 'left', C.oker);
    naamBij(ctx, 'uitspoeling', null, 1700, 330, d_win(t, q.at('spoelt'), 99), 'center', C.teal); },

  s79(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX);
    const hA = ramp(t, q.at('zeshoeken') - 0.3, 2.0), rA = ramp(t, q.at('muizenschade'), 1.0);
    d_nlKaart(ctx, 110, 180, 0.92, { a: ramp(t, 0.2, 0.6), hex: hA, rood: rA, t });
    naamBij(ctx, 'schade gemeld', null, 300, 840, rA, 'left', C.koraal);
    const oA = ramp(t, q.at('openheid'), 0.5);
    d_openheid(ctx, 900, 300, 900, { a: oA, u: ramp(t, q.at('openheid'), 1.2), open: 1 }); naamBij(ctx, 'open: je kijkt ver', null, 1800, 230, oA, 'right', C.goud);
    d_openheid(ctx, 900, 470, 900, { a: oA, u: ramp(t, q.at('openheid'), 1.2), open: 0 }); naamBij(ctx, 'gesloten: struiken en bomen', null, 1800, 400, oA, 'right', C.text);
    const dA = ramp(t, q.at('drooglegging') - 0.2, 0.5);
    d_profiel(ctx, 900, 540, 900, 290, { a: dA, diep: 0.25 + 0.5 * ramp(t, q.at('diep'), 1.5), pijlA: ramp(t, q.at('Drooglegging', 2), 0.5), t }); },

  s80(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 36, 'mc', ramp(t, 0, 0.4));
    const b1 = q.at('Bewering', 1), b2 = q.at('Bewering', 2);
    welNiet(ctx, [{ t: 'drooglegging is belangrijker dan openheid', a: ramp(t, b1, 0.4), hl: d_win(t, b1, b2, 0.3) },
      { t: 'schade in klein, beschut grasland wordt eerder opgemerkt', a: ramp(t, b2, 0.4), hl: ramp(t, b2, 0.3) }], 70, 200, 860, 1, { px: 30 });
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 490, 600, { a: [1, 1, 1, 1] }, ramp(t, q.at('grasland') + 0.2, 0.5), { px: 30 });
    examenKader(ctx, 1000, 170, 870, 670, 'AFBEELDING 3', ramp(t, 0.4, 0.5));
    d_staaf(ctx, 1110, 280, 720, 400, { a: ramp(t, 0.6, 0.5), grow: ramp(t, 0.8, 2.4) }); },

  s81(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 36, 'mc');
    const b2 = q.at('Bewering', 2), tA = q.at('antwoord'), tTip = q.at('Tip');
    welNiet(ctx, [{ t: 'drooglegging belangrijker dan openheid', v: 'niet', s: ramp(t, q.at('Niet', 1), 0.4), hl: d_win(t, 0, b2, 0.3) },
      { t: 'beschut grasland: schade eerder opgemerkt', v: 'niet', s: ramp(t, q.at('Niet', 3), 0.4), hl: d_win(t, b2, tA, 0.3) }], 70, 200, 640, 1, { px: 28 });
    const oA = d_win(t, tA - 0.3, tTip, 0.4), g = ramp(t, tA + 1.0, 0.4);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 520, 640, { weg: [0, g, ramp(t, tA + 1.2, 0.4), ramp(t, tA + 1.4, 0.4)], goed: 0, g }, oA, { px: 28 });
    tipKaart(ctx, 'Gaat het diagram wel over deze bewering?', 70, 540, 640, ramp(t, tTip, 0.5), 30);
    // diagram: spreiding binnen één drooglegging
    const hG = d_win(t, q.at('binnen'), b2, 0.5), r0 = d_win(t, q.at('gesloten'), b2, 0.4), r3 = d_win(t, q.at('open', 1), b2, 0.4), sp = d_win(t, q.at('verschil') - 0.4, b2, 0.6);
    const yA = d_win(t, q.at('meldingen', 2), q.at('zegt'), 0.4), kA = d_win(t, q.at('beschutte'), tA, 0.4);
    examenKader(ctx, 760, 170, 1110, 680, 'AFBEELDING 3', 1);
    d_staaf(ctx, 870, 280, 960, 400, { hlG: 4, hlA: hG, nul: r0, spread: sp, rings: [{ g: 4, b: 3, a: r3, t: '72%', dx: -40, al: 'right', dy: 0 }], hlK: 0, hlKA: kA * 0.9 });
    d_al(ctx, yA, () => { ctx.save(); roundRect(ctx, 870, 228, 250, 40, 10); shape(ctx, rgba(C.goud, 0.15), C.goud, 2.5); ctx.restore(); text(ctx, 'meldingen', 1150, 258, fTekst(28, 700), C.goud, 'left'); kruis(ctx, 1350, 248, 14, 1); text(ctx, 'snelheid opmerken', 1380, 258, fTekst(28, 600), C.text2, 'left'); });
    naamBij(ctx, '0–15 m: weinig meldingen', null, 1830, 262, kA, 'right', '#7FC4A8'); },

  s82(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 37, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'welk type rover een afwisselend landschap aantrekt, en hoe dat een plaag voorkomt', 70, 190, 860, ramp(t, 0.3, 0.6), { px: 36 });
    const wA = ramp(t, q.at('wezel'), 0.3), vA = ramp(t, q.at('vos'), 0.3);
    d_al(ctx, ramp(t, q.at('Specialisten'), 0.5), () => { d_wezel(ctx, 1110, 400, 1.0, wA, t); naamBij(ctx, 'specialist', 'wezel', 1040, 260, 1, 'left', C.goud);
      d_menu(ctx, 1360, 400, [{ n: 'muis', a: ramp(t, q.at('prooisoorten'), 0.4), hl: 1 }], 1); });
    d_al(ctx, ramp(t, q.at('Generalisten'), 0.5), () => { d_vos(ctx, 1130, 660, 0.85, vA, t); naamBij(ctx, 'generalist', 'vos', 1040, 470, 1, 'left', C.goud);
      const ma = (i) => ramp(t, q.at('alles') - 0.2 + i * 0.15, 0.4); d_menu(ctx, 1360, 650, [{ n: 'muis', a: ma(0) }, { n: 'konijn', a: ma(1) }, { n: 'vogel', a: ma(2) }, { n: 'kever', a: ma(3) }, { n: 'bes', a: ma(4) }], 1, 100); });
    const lA = ramp(t, q.at('grasland') - 0.3, 0.5); const het = ramp(t, q.at('afwisselend'), q.at('bosjes') - q.at('afwisselend') + 0.6);
    d_landschap(ctx, 70, 520, 860, 330, het, t, lA); naamBij(ctx, het > 0.5 ? 'afwisselend landschap' : 'open grasland', null, 96, 572, lA, 'left');
    d_al(ctx, ramp(t, q.at('Welk'), 0.4), () => vraagteken(ctx, 860, 640, 1, 90)); },

  s83(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 37, 2);
    const tL = q.at('Let');
    punten(ctx, [{ t: 'afwisselend landschap: veel prooisoorten → generalisten', a: ramp(t, 0, 0.4), v: ramp(t, q.at('prooisoorten') + 0.3, 0.4) },
      { t: 'generalisten blijven bij weinig muizen en stappen over zodra de muizen toenemen', a: ramp(t, q.at('Twee') - 0.2, 0.4), v: ramp(t, q.at('vroeg') + 0.2, 0.4) }], 70, 200, 880, 1, { px: 32 });
    valkuil(ctx, 'schuilplaatsen of nestgelegenheid voor de rover', 70, 560, 880, ramp(t, tL, 0.5), 32);
    // rechts: afwisselend landschap met vos (blijft) en wezel (vertrekt)
    d_landschap(ctx, 1000, 190, 850, 280, 1, t, 1);
    const vx = 1180 + Math.sin(t * 0.5) * 60; d_vos(ctx, vx, 440, 0.5, 1, t, { loop: 0.6, kijk: Math.cos(t * 0.5) > 0 ? 1 : -1 });
    const ww = ramp(t, q.at('weg') - 0.2, 2.0); d_wezel(ctx, 1560 + 380 * ww, 450, 0.6, (1 - ww) * ramp(t, q.at('Specialisten') - 0.3, 0.4), t, { loop: ww > 0.01 ? 1 : 0 });
    naamBij(ctx, 'specialist trekt weg', null, 1830, 240, d_win(t, q.at('Specialisten'), tL + 2, 0.4), 'right', C.goud);
    // grafiek veldmuizen: zonder generalist / met generalist
    const u = ramp(t, q.at('Begint'), q.at('vroeg') - q.at('Begint') + 0.4);
    const zonder = (s) => 0.05 + 0.9 * Math.pow(s, 2.6), met = (s) => s < 0.35 ? zonder(s) : zonder(0.35) + 0.04 * Math.sin((s - 0.35) * 12) * 0.5;
    d_miniGrafiek(ctx, 1080, 530, 740, 230, [{ fn: zonder, u, col: '#6A7488', dash: [12, 10], lw: 5 }, { fn: met, u, col: C.teal }], { a: ramp(t, q.at('Begint') - 0.3, 0.5), xl: 'tijd', yl: 'veldmuizen' });
    naamBij(ctx, 'met vos', null, 1820, 740, ramp(t, q.at('remmen'), 0.5), 'right', C.teal); naamBij(ctx, 'zonder', null, 1700, 560, ramp(t, q.at('remmen'), 0.5), 'right', C.text2); },

  s84(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 38, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Licht toe', 'nestkasten alleen preventief, omploegen alleen curatief', 70, 190, 860, ramp(t, 0.3, 0.6));
    // boer met koeien en hooi
    const bA = ramp(t, q.at('melkveehouder') - 0.1, 0.3);
    d_al(ctx, bA, () => { ctx.save(); ctx.strokeStyle = D_GRAS; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1000, 800); ctx.lineTo(1860, 800); ctx.stroke(); ctx.restore();
      d_koe(ctx, 1460, 800, 0.95, 1, t, -1); });
    persoon(ctx, 'bilal', 1110, 800, 400, { t, a: bA, outfit: 'zomer', pose: 'handenHeup', uit: 'blij', kijk: 1 });
    naamBij(ctx, 'melkveehouder', null, 1110, 370, bA, 'center');
    const hA = ramp(t, q.at('hooi') - 0.2, 0.4); d_hooibaal(ctx, 1700, 800, 70, hA); d_hooibaal(ctx, 1790, 800, 52, ramp(t, q.at('hooi'), 0.4));
    // twee maatregelen
    const n1 = ramp(t, q.at('nestkasten'), 0.5), n2 = ramp(t, q.at('omploegen'), 0.5);
    d_al(ctx, n1, () => { examenKader(ctx, 70, 520, 410, 330, '', 1); d_nestkast(ctx, 200, 820, 0.6); d_valk(ctx, 200 + 30 * (1 - ramp(t, q.at('roofvogels'), 1.0)), 820 - 224 - 120 * (1 - ramp(t, q.at('roofvogels'), 1.0)), 0.9, ramp(t, q.at('roofvogels') - 0.2, 0.4), t, 1 - ramp(t, q.at('roofvogels') + 0.6, 0.4), 1);
      naamBij(ctx, 'preventief', null, 300, 700, ramp(t, q.at('preventief'), 0.5), 'left', C.groen); });
    d_al(ctx, n2, () => { examenKader(ctx, 520, 520, 410, 330, '', 1); d_trekker(ctx, 760, 800, 0.62, 1, t); naamBij(ctx, 'curatief', null, 725, 610, ramp(t, q.at('curatief'), 0.5), 'center', C.koraal); }); },

  s85(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 38, 2);
    const tTw = q.at('Twee'), tL = q.at('Let');
    vraagKaart(ctx, 'Licht toe', 'nestkasten alleen preventief, omploegen alleen curatief', 70, 190, 880, ramp(t, 0.3, 0.5), { px: 32 });
    punten(ctx, [{ t: 'roofvogels houden alleen een kleine populatie in toom; ze zijn er niet meteen', a: ramp(t, 0, 0.4), v: ramp(t, q.at('laat') + 0.2, 0.4) },
      { t: 'omploegen: geen gras of hooi meer voor de koeien', a: ramp(t, tTw - 0.2, 0.4), v: ramp(t, q.at('koeien') + 0.2, 0.4) }], 70, 410, 880, 1, { px: 32 });
    valkuil(ctx, '"ik ploeg om als er veel muizen zijn"', 70, 700, 880, ramp(t, tL, 0.5), 32);
    // fase 1: nestkast, roofvogel komt pas later, de plaag is dan al te groot
    const f1 = d_win(t, 0.2, tTw - 0.1, 0.5), f2 = ramp(t, tTw, 0.5);
    d_al(ctx, f1, () => { const sy = d_grasland(ctx, 1000, 400, 850, 400, { kaal: 0.2 + 0.6 * ramp(t, q.at('plaag'), 1.2), gangen: 0.6, t, seed: 11 });
      d_nestkast(ctx, 1130, sy, 0.7); const va = ramp(t, q.at('zijn') - 0.3, 0.6), vl = 1 - ramp(t, q.at('zijn') + 0.4, 0.4);
      d_valk(ctx, 1130 + 40 * vl, sy - 270 - 160 * vl, 0.9, va, t, vl, 1);
      klokje(ctx, 1780, 260, 34, ramp(t, q.at('nestkasten'), q.at('zijn') - q.at('nestkasten')), ramp(t, q.at('nestkasten') - 0.2, 0.4));
      d_muizenRij(ctx, 1260, sy - 4, 560, Math.round(3 + 12 * ramp(t, q.at('plaag'), 1.6)), t, 1, 0.22);
      naamBij(ctx, 'te laat', null, 1600, 330, ramp(t, q.at('laat'), 0.4), 'center', C.koraal); });
    // fase 2: omploegen kost het grasland
    d_al(ctx, f2, () => { const sy = d_grasland(ctx, 1000, 400, 850, 400, { kaal: 0.9 * ramp(t, q.at('schade'), 1.0), gangen: 0.6, t, seed: 11 });
      const tx = lerp(1060, 1720, ramp(t, q.at('omploegen'), q.at('grasland') - q.at('omploegen') + 1.2)); d_geploegd(ctx, 1000, tx - 150, sy);
      d_trekker(ctx, tx, sy + 4, 0.6, 1, t);
      examenKader(ctx, 1000, 190, 850, 180, '', 1); d_koe(ctx, 1200, 350, 0.62, 1, t, 1); d_hooibaal(ctx, 1460, 350, 50, 1); d_hooibaal(ctx, 1560, 350, 40, 1);
      const k = ramp(t, q.at('geen'), 0.4); kruis(ctx, 1510, 290, 40, k); naamBij(ctx, 'geen gras of hooi', null, 1620, 300, k, 'left', C.koraal);
      naamBij(ctx, 'alleen als het grasland al verloren is', null, 1425, 860, ramp(t, q.at('verloren'), 0.5), 'center', C.goud); }); }
});

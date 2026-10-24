// Film 7 · Hoe weten we dat? — geanimeerde scènes (keyframes uit sb7.js als eindbeeld, opgebouwd in de maat van de stem).
// Elke scène tekent eerst haar eigen achtergrond (zee / oever / E7.sch). Vraag-alinea's tonen de situatie, nooit de vraagkaart.
const E7_PAKI_V = 88 * 1.0 * 0.5;   // Pakicetus: staplengte S × f, cyclus op halve snelheid (eenheden/s bij s = 1)
const E7_AMBU_V = 66 * 0.7;          // Ambulocetus stap (eenheden/s bij s = 1)
const E7_MUT = [3, 9, 1, 12, 6];     // volgorde van de mutaties in s35

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (bultrug met röntgen en gouden heupbotjes, zwemt rustig)
  title(ctx, t) { bultrug(ctx, 1400 + Math.sin(t * 0.25) * 20, 700 + Math.sin(t * 0.4) * 6, 0.95, { rontgen: 1, heup: 1, t }); },

  // ================= Opening =================
  s01(ctx, t, q) { zee(ctx); const x = 820 + t * 18, y = 520 + Math.sin(t * 0.5) * 6;
    // kalf zwemt boven bij de moeder (±4,5 m tegen 15 m)
    const aj = q.on('jong', 1, 0.8); if (aj > 0.01) bultrug(ctx, x + 300 - (1 - aj) * 160, 300 + Math.sin(t * 0.6 + 1) * 5, 0.46, { t: t + 1.3, a: aj });
    bultrug(ctx, x, y, 1.55, { t });
    naamBij(ctx, 'bultrug', 'ongeveer 15 meter · een zoogdier', 300, 330, q.on('bultrug', 1, 0.6), 'left');
    E7.met(ctx, q.on('vijftien', 1, 0.6), () => evoSchaal(ctx, 'bultrug · niet op schaal met de achtergrond')); },
  s02(ctx, t, q) { zee(ctx); const x = 966 + t * 8, y = 520 + Math.sin((t + 8.1) * 0.5) * 6;
    const ka = 1 - ramp(t, 0.3, 2.2); if (ka > 0.01) bultrug(ctx, x + 300 + t * 120, 300, 0.46, { t: t + 9.4, a: ka }); // kalf zwemt verder
    const r = q.on('buik', 1, 1.3), res = bultrug(ctx, x, y, 1.55, { t: t + 8.1, rontgen: r });
    const hp = E7.heup(ctx, x, y, 1.55, res, q.on('botjes', 1, 0.6) * r);
    if (hp) { const ap = q.on('poten', 1, 0.5) * (1 - ramp(t, q.at('eraan') + 0.4, 0.8) * 0.6); // poten die er níet aan zitten: gestippeld, dimmen weg
      E7.gestippeld(ctx, hp[0], hp[1] + 10, hp[0] + 40, hp[1] + 120, ap, C.line, 3); E7.gestippeld(ctx, hp[0] + 40, hp[1] + 120, hp[0] - 10, hp[1] + 200, ap, C.line, 3);
      naamBij(ctx, 'heupbotjes', 'los van de wervelkolom', hp[0] - 20, hp[1] + 130, q.on('los', 1, 0.6), 'right', C.goud); } },
  s03(ctx, t, q) { const u = t < q.at('Maar') - 0.1 ? 0 : 1; // harde snede van zee naar oever (geen schuivende decors)
    if (u < 1) { zee(ctx); bultrug(ctx, 1062 + t * 8, 520, 1.55, { t: t + 15.8, rontgen: 1, heup: 1 }); }
    else { oever(ctx); gesteente(ctx, 780, 330, 1040, 560, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }], { a: ramp(t, q.at('Maar') - 0.1, 0.5) }); }
    const aV = q.on('hoe', 1, 0.7); if (aV > 0.01) text(ctx, 'Welke laag is het oudst?', 120, 230, fTitel(72), rgba(C.text, aV), 'left');
    // bij 'welke laag' lichten de bovenste en onderste laag om beurten op
    if (u >= 1) { const k = q.on('welke', 1, 0.4) * (1 - q.on('oudst', 1, 0.8)); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; const f = Math.sin((t - q.at('welke')) * 4) > 0 ? 0 : 4;
        gesteente(ctx, 780, 330, 1040, 560, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }], { nadruk: f }); ctx.restore(); } } },

  // ================= H1 Lagen en fossielen =================
  s05(ctx, t, q) { oever(ctx);
    const DIK = [1, 1, 1, 0.6], PX = 420 / 3.6;
    let p = 1 + 2 * clamp((t - q.at('zand') + 0.3) / (q.at('Raakt') - q.at('zand') + 0.3), 0, 1); // drie lagen tot 'Raakt'
    p += clamp((t - q.at('bedolven') - 0.2) / (q.at('fossiel') - q.at('bedolven') + 0.4), 0, 1); // vierde laag bedekt het dier
    const lagen = []; let hcur = 0; for (let i = 0; i < 4; i++) { const f = clamp(p - i, 0, 1); if (f <= 0.001) break; lagen.push({ dik: DIK[i] * f, kleur: i === 3 ? '#C2AC84' : undefined }); hcur += DIK[i] * f * PX; }
    const top = 880 - hcur;
    ctx.fillStyle = '#22466A'; ctx.fillRect(300, 300, 1320, top - 300 + 4); lijn(ctx, [[300, 300], [1620, 300]], rgba('#9CCBE3', 0.6), 2);
    E7.zand(ctx, 320, 1600, 304, top - 4, t, q.on('zand', 1, 1.0) * (1 - 0.4 * q.on('fossiel', 1, 1)));
    // dood dier zakt naar de bodem en wordt bedolven; daarna wordt het een fossiel
    const tD = q.at('dood'), y2 = 880 - 3 * PX, ad = q.on('dood', 1, 0.5) * (1 - q.on('fossiel', 1, 1.2));
    if (ad > 0.01) E7.kadaver(ctx, 960, lerp(330, y2 - 22, ease((t - tD) / 1.4)), 1.6, ad);
    if (lagen.length) gesteente(ctx, 300, top, 1320, hcur, lagen, { fossielen: p >= 3.999 ? [{ laag: 3, soort: 'pakicetus', x: 0.5, s: 1.6, goud: true, a: q.on('fossiel', 1, 1.2) }] : [] });
    naamBij(ctx, 'fossiel', 'versteend overblijfsel', 960, 250, q.on('versteend', 1, 0.6), 'center', C.goud); naamBij(ctx, 'zand en klei bezinken', null, 960, 260, q.on('zand', 1, 0.6) * (1 - q.on('versteend', 1, 0.4)), 'center'); },
  s06(ctx, t, q) { oever(ctx);
    const D = [1, 1.2, 0.8, 1.1, 0.9], PX = 580 / 5, g = ease((t - q.at('nieuwe')) / 1.4); // de nieuwe laag zakt erop
    const lagen = D.map((d, i) => ({ dik: i === 4 ? d * Math.max(0.001, g) : d })), hcur = (4.1 + 0.9 * Math.max(0.001, g)) * PX;
    gesteente(ctx, 240, 880 - hcur, 1100, hcur, lagen, { nadruk: q.on('onderste', 1, 0.3) > 0.5 ? 0 : -1 });
    const pa = ease((t - q.at('Dus')) / (q.at('oudst') - q.at('Dus') + 0.3)); if (pa > 0.01) pijl(ctx, 1460, 330, 1460, lerp(330, 840, pa), C.goud, 1, 5, 22);
    naamBij(ctx, 'ouder', null, 1500, 600, q.on('oudst', 1, 0.6), 'left', C.goud); naamBij(ctx, 'relatieve datering', 'de volgorde, nog geen jaren', 240, 250, q.on('relatieve', 1, 0.6), 'left');
    const tv = q.at('volgorde'); for (let i = 0; i < 5; i++) { const a = ramp(t, tv + i * 0.25, 0.4); if (a <= 0.01) continue; let y = 880; for (let k = 0; k <= i; k++) y -= D[k] * PX; y += D[i] * PX / 2;
      circ(ctx, 196, y, 24, rgba(C.fill, a), rgba(C.goud, a), 2); text(ctx, String(i + 1), 196, y + 10, fTekst(30, 800), rgba(C.text, a), 'center'); } },
  s07(ctx, t, q) { oever(ctx);
    const r1 = 0.32 * ease((t - q.at('kantelen')) / 0.8), wob = 0.06 * Math.sin(clamp((t - q.at('plooien')) / 1.2, 0, 1) * Math.PI * 2);
    const r2 = (Math.PI - 0.42 - 0.32) * ease((t - q.at('omklappen')) / 2.2);
    gesteente(ctx, 760, 300, 900, 480, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }], { rot: r1 + wob + r2, fossielen: [{ soort: 'schelp', laag: 0, x: 0.35, s: 1.6 }, { soort: 'schelp', laag: 0, x: 0.7, s: 1.6 }] });
    // Dr. Kim loopt naar de rotswand en wijst
    const tK = q.at('Kim') - 0.6, D = 2.6, v = gangSnelheid('kim', 400, 'loop'), x0 = 380 - v * D;
    if (t >= tK && t < tK + D) persoon(ctx, 'kim', x0, 880, 400, { zij: true, kijk: 1, gang: 'loop', t: t - tK, vooruit: true });
    else if (t >= tK + D) persoon(ctx, 'kim', 380, 880, 400, { pose: t > tK + D + 0.4 ? 'wijs' : 'staan', kijk: 1, uit: 'denkt', t });
    naamBij(ctx, 'omgeklapt', 'na het afzetten: schelpen op hun kop', 160, 200, q.on('kop', 1, 0.6), 'left'); },
  // vraag-alinea: de omgeklapte stapel met P, Q en R (niet de vraagkaart)
  s08(ctx, t, q) { E7.sch(ctx); const tl = q.at('Deze');
    E7.pqr(ctx, 680, 340, 560, 360, Math.PI - 0.3 + 0.02 * Math.sin(t * 0.8), { letA: [ramp(t, tl + 1.0, 0.4), ramp(t, tl + 0.6, 0.4), ramp(t, tl + 0.2, 0.4)] });
    vraagteken(ctx, 960, 270, q.on('oudst', 1, 0.5), 110); },
  s10(ctx, t, q) { E7.sch(ctx); const u = ease((t - 0.2) / (q.at('liggen') - 0.2 + 0.4));
    E7.pqr(ctx, 260, 340, 520, 340, Math.PI - 0.3, { a: 0.45 + 0.4 * q.on('bovenop', 1, 0.6), rGoud: q.on('bovenop', 1, 0.3) > 0.5 });
    pijl(ctx, 880, 510, 1040, 510, C.line, q.on('terug', 1, 0.6), 4, 18);
    const R = q.on('onderop', 1, 0.3) > 0.5; E7.pqr(ctx, lerp(260, 1180, u), 340, lerp(520, 560, u), 340, (Math.PI - 0.3) * (1 - u), { nadruk: R ? 0 : -1, goud: q.on('eerste', 1, 0.3) > 0.5, rGoud: R });
    naamBij(ctx, 'R: als eerste afgezet = het oudst', null, 1460, 790, q.on('oudst', 1, 0.6), 'center', C.goud); naamBij(ctx, 'in gedachten terugdraaien', null, 960, 140, q.on('gedachten', 1, 0.6), 'center'); },
  s11(ctx, t, q) { E7.sch(ctx);
    const tk = q.at('koolstof'), th = q.at('helft'), tE = q.at('halveringstijd') + 0.8; const u = t < th ? 0.25 * clamp((t - tk) / (th - tk), 0, 1) : 0.25 + 0.75 * clamp((t - th) / (tE - th), 0, 1);
    const ag = q.on('Van', 1, 0.6); if (ag > 0.01) halveringsGrafiek(ctx, 300, 760, 1100, 480, { a: ag, u: Math.max(0.001, u) });
    // eerst gesteente en bot naast elkaar; bij koolstof-14 verdwijnt het gesteente (werkt alleen voor resten van organismen) en schuift het bot naast de grafiek
    const m = ease((t - q.at('Van') + 0.3) / 1.2), aS = ramp(t, 0.1, 0.6) * (1 - m);
    E7.atomen(ctx, 700, 560, 200, 120, u * 4, aS, 3, 16, { r: 11 }); naamBij(ctx, 'gesteente', null, 700, 380, q.on('gesteente', 1, 0.5) * (1 - m), 'center');
    const ab = q.on('botten', 1, 0.6); if (ab > 0.01) { const sc = lerp(1.7, 1, m); ctx.save(); ctx.translate(lerp(1220, 1640, m), lerp(560, 640, m)); ctx.scale(sc, sc);
      bot(ctx, -100, 5, 100, -5, 40, BOT.kaal, { a: ab }); E7.atomen(ctx, 0, 0, 80, 10, u * 4, ab, 9, 6, { steen: false, r: 6 }); ctx.restore();
      naamBij(ctx, 'bot', null, 1220, 470, ab * (1 - m), 'center'); }
    naamBij(ctx, 'halveringstijd', 'koolstof-14: ± 5700 jaar', 1020, 330, q.on('halveringstijd', 1, 0.6), 'left', C.teal); naamBij(ctx, 'absolute datering', 'leeftijd in jaren', 1480, 470, q.on('absolute', 1, 0.6), 'left'); },
  s12(ctx, t, q) { E7.sch(ctx);
    const u = lerp(4 / 9, 1, ease((t - q.at('tot') + 0.2) / (q.at('terug') - q.at('tot') + 0.9)));
    halveringsGrafiek(ctx, 200, 760, 900, 440, { n: 9, maxLabel: 3, u });
    const ar = q.on('resten', 1, 0.6) * (1 - q.on('oudere', 1, 0.8)); // alleen resten van organismen: schelp en bot
    if (ar > 0.01) { fossiel(ctx, 'schelp', 1440, 520, 2.6, { a: ar }); bot(ctx, 1540, 530, 1720, 515, 34, BOT.kaal, { a: ar }); naamBij(ctx, 'resten van organismen', null, 1560, 430, ar, 'center'); }
    const g = q.on('50.000', 1, 0.8); E7.gestippeld(ctx, 200 + 900 * 8.7 / 9, 760, 200 + 900 * 8.7 / 9, 280, g, C.koraal, 3);
    naamBij(ctx, '±50.000 jaar', 'grens koolstof-14', 1080, 250, g, 'center', C.koraal);
    gesteente(ctx, 1320, 380, 460, 300, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { golf: 3, a: q.on('oudere', 1, 0.7) });
    E7.atomen(ctx, 1550, 530, 190, 110, (t - q.at('radioactieve')) * 0.15, q.on('radioactieve', 1, 0.6), 21, 18, { steen: false, ak: C.oker, r: 7 });
    naamBij(ctx, 'oudere lagen', 'andere radioactieve stoffen', 1550, 330, q.on('stoffen', 1, 0.6), 'center');
    E7.met(ctx, q.on('gemeten', 1, 0.6), () => metaText(ctx, 'gemeten', 1550, 740, C.grain, 'center', 28)); },
  s13(ctx, t, q) { E7.sch(ctx); const kl = ['#6E5A44', '#8C7258', '#A8916A', '#7A6A5A', '#B8A07A', '#93805E'];
    const u = ease((t - q.at('leeftijd')) / (q.at('tijdas') - q.at('leeftijd') + 0.6)); // de stapel klapt open tot zes blokken langs de tijdas
    for (let i = 0; i < 6; i++) { const ui = ease(clamp(u * 1.6 - i * 0.12, 0, 1)), sx = 760, sy = 860 - (i + 1) * 70, tx = 160 + i * 266 + 4;
      roundRect(ctx, lerp(sx, tx, ui), lerp(sy, 300, ui), lerp(400, 258, ui), lerp(70, 260, ui), lerp(2, 10, ui)); shape(ctx, kl[i], _lt(kl[i], 0.2), 1.5); }
    const aA = q.on('tijdas', 1, 0.7); if (aA > 0.01) tijdAs(ctx, 160, 680, 1600, { van: 60, a: aA });
    naamBij(ctx, 'elke laag een leeftijd', null, 960, 250, q.on('leeftijd', 1, 0.6), 'center');
    const af = q.on('fossiel', 1, 0.6); if (af > 0.01) { fossiel(ctx, 'pakicetus', 560, 430, 1.0, { a: af, goud: true });
      E7.gestippeld(ctx, 560, 500, 560, 668, ramp(t, q.at('plaatsen') - 0.3, 0.6), C.goud, 2.5); circ(ctx, 560, 680, 10 * ramp(t, q.at('plaatsen'), 0.4), C.goud, _lt(C.goud, 0.4), 2); } },

  // ================= H2 Walvissen in de lagen =================
  s14(ctx, t, q) { oever(ctx);
    const tP = q.at('Pakicetus'), aw = 1 - ramp(t, tP, 0.6), af = q.on('fossielen', 1, 0.6);
    gesteente(ctx, 360, 300, 1200, 520, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { a: aw, fossielen: [
      { soort: 'pakicetus', laag: 0, x: 0.2, s: 1.3, goud: q.on('Pakicetus', 1, 0.3) > 0.5, a: af }, { soort: 'ambulocetus', laag: 1, x: 0.55, s: 1.2, a: af }, { soort: 'rodhocetus', laag: 2, x: 0.8, s: 1.1, a: af }] });
    naamBij(ctx, '±50 miljoen jaar', null, 1590, 770, aw * q.on('50', 1, 0.5), 'left'); naamBij(ctx, '±47 miljoen jaar', null, 1590, 370, aw * q.on('47', 1, 0.5), 'left');
    // Pakicetus stapt uit zijn laag naar voren en loopt naar zijn plek
    const s = 1.7, tw0 = tP + 0.6, D = 4.6, v = E7_PAKI_V * s, xe = 900, x0 = xe - v * D;
    if (t >= tw0) { const lopen = t < tw0 + D, tt = Math.max(0, t - tw0); pakicetus(ctx, lopen ? x0 + v * tt : xe, 820, s, { houding: lopen ? 'lopen' : 'staan', t: lopen ? tt * 0.5 : t, a: ramp(t, tw0, 0.3) }); }
    const ao = q.on('oor', 1, 0.5); if (ao > 0.01) { ctx.save(); ctx.globalAlpha *= ao; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(900 + 140 * s, 820 - 146 * s, 40, 0, 6.283); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'Pakicetus', 'ongeveer 50 miljoen jaar · 1–2 meter', 160, 200, q.on('Pakicetus', 1, 0.6), 'left'); naamBij(ctx, 'oor met walvisbouw', null, 1190, 470, q.on('walvissen', 1, 0.6), 'left', C.goud);
    E7.met(ctx, q.on('Pakicetus', 1, 0.6), () => evoSchaal(ctx, 'reconstructie · Pakistan en India')); },
  s15(ctx, t, q) { oever(ctx); const s = 1.5, WL = 640;
    const tz = q.at('achtervoeten') + 0.4, xa = 470, v = E7_AMBU_V * s, xz = xa + v * tz; // loopt tot tz, schuift dan het water in
    const oog = E7.oogOffset('ambu_zw', ambulocetus, ZW_DATA.ambulocetus, { houding: 'zwemmen', t: 0 }), yDiep = WL - oog[1] * s - 2;
    let x, y, h; if (t < tz) { x = xa + v * t; y = 740; h = 'lopen'; } else { const u = ease((t - tz) / 1.6); x = xz + (t - tz) * 14; y = lerp(740, yDiep, u); h = 'zwemmen'; }
    ambulocetus(ctx, x, y, s, { houding: h, t });
    ctx.fillStyle = rgba('#2E6FBF', 0.5); ctx.beginPath(); ctx.moveTo(820, WL); ctx.lineTo(W, WL); ctx.lineTo(W, 900); ctx.lineTo(1000, 900); ctx.closePath(); ctx.fill(); // ondiep water
    lijn(ctx, [[820, WL], [W, WL]], '#9CCBE3', 2);
    const ex = x + oog[0] * s, ey = y + oog[1] * s;
    naamBij(ctx, 'Ambulocetus', 'ongeveer 48 miljoen jaar · ±3 meter', 160, 200, q.on('Ambulocetus', 1, 0.6), 'left'); naamBij(ctx, 'ogen bovenop de kop', null, ex - 40, ey - 60, q.on('ogen', 1, 0.6), 'left');
    E7.met(ctx, q.on('Ambulocetus', 1, 0.6), () => evoSchaal(ctx, 'reconstructie')); },
  s16(ctx, t, q) { zee(ctx, { opp: 110 }); const x = 420 + t * 16, y = 520 + Math.sin(t * 0.7) * 6;
    rodhocetus(ctx, x, y, 2.0, { t });
    zoomCircle(ctx, 1560, 420, 190, x - 288, y + 142, 'enkelbot · dubbele katrol', q.on('enkel', 1, 0.7), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1360, 220, 400, 400);
      E7.katrolbot(ctx, 1560, 420, 1, q.on('enkel', 1, 0.7), q.on('vorm', 1, 0.8), t); });
    naamBij(ctx, 'Rodhocetus', 'ongeveer 47 miljoen jaar · 2–3 meter', 160, 210, q.on('Rodhocetus', 1, 0.6), 'left'); naamBij(ctx, 'zoals bij evenhoevigen', null, 1560, 700, q.on('evenhoevigen', 1, 0.6), 'center', C.goud);
    E7.met(ctx, q.on('Rodhocetus', 1, 0.6), () => evoSchaal(ctx, 'reconstructie')); },
  s17(ctx, t, q) { zee(ctx, { opp: 110 }); const x = 740 + t * 13, y = 480 + Math.sin(t * 0.5) * 6;
    basilosaurus(ctx, x, y, 1.75, { poot: q.on('achterpootjes', 1, 0.3) > 0.5 ? 1 : 0, t });
    zoomCircle(ctx, 1500, 720, 150, x - 206 * 1.75, y + 42 * 1.75, 'achterpootje ±35 centimeter · vergroot', q.on('35', 1, 0.7), () => { ctx.fillStyle = '#4E5862'; ctx.fillRect(1340, 560, 320, 320); ctx.fillStyle = '#9AA6B0'; ctx.fillRect(1340, 640, 320, 240);
      bot(ctx, 1440, 640, 1500, 720, 26, C.goud); bot(ctx, 1500, 720, 1540, 790, 18, C.goud); bot(ctx, 1500, 730, 1530, 792, 10, C.goud); for (let i = 0; i < 3; i++) { bot(ctx, 1540, 796, 1560 + i * 14, 830, 8, C.goud); bot(ctx, 1560 + i * 14, 834, 1572 + i * 16, 856, 7, C.goud); } });
    naamBij(ctx, 'Basilosaurus', 'ongeveer 40 miljoen jaar · 15 meter', 160, 220, q.on('Basilosaurus', 1, 0.6), 'left');
    E7.met(ctx, q.on('Basilosaurus', 1, 0.6), () => evoSchaal(ctx, 'reconstructie')); },
  // vraag-alinea: Pakicetus en Ambulocetus naast elkaar, gestippelde pijl met vraagteken
  s18(ctx, t, q) { oever(ctx);
    pakicetus(ctx, 470, 820, 0.95, { t, a: ramp(t, 0.05, 0.3) }); ambulocetus(ctx, 1390, 820, 1.04, { t, a: ramp(t, 0.35, 0.3) }); // Ambulocetus ±1,7× zo lang
    naamBij(ctx, 'Pakicetus', 'ongeveer 50 miljoen jaar · 1–2 meter', 470, 520, q.on('Pakicetus', 1, 0.5), 'center'); naamBij(ctx, 'Ambulocetus', 'ongeveer 48 miljoen jaar · ±3 meter', 1390, 540, q.on('Ambulocetus', 1, 0.5), 'center');
    const ap = ease((t - q.at('voorouder')) / 1.0); if (ap > 0.01) { E7.gestippeld(ctx, 720, 640, lerp(720, 960, ap), 640, 1, C.goud, 3); if (ap > 0.95) pijl(ctx, 950, 640, 970, 640, C.goud, 1, 3, 18); }
    vraagteken(ctx, 845, 610, q.on('Ambulocetus', 1, 0.5), 90); evoSchaal(ctx, 'reconstructies · onderling op schaal'); },
  s20(ctx, t, q) { E7.sch(ctx);
    const g = lerp(0.45, 1, ease(t / (q.at('boom') + 0.3))), tz = q.at('zijtakken');
    const tak = [0, 1, 2, 3].map(i => ease((t - tz - i * 0.7) / 0.8)), dier = tak.map(u => clamp((u - 0.8) * 5, 0, 1));
    const tn = q.at('steeds'), nad = t >= tn - 0.6 && t < q.at('Dat') ? Math.min(3, Math.floor((t - tn + 0.6) / 0.9)) : -1;
    ctx.save(); ctx.translate(0, -50); const X = E7.boom(ctx, g, tak, dier, nad, t, q.on('generatie', 1, 1.0));
    E7.met(ctx, ramp(g, 0.92, 0.08), () => { bultrug(ctx, X(0) - 40, 490, 0.24, { t }); naamBij(ctx, 'walvissen nu', null, X(0), 410, 1, 'right'); }); ctx.restore();
    naamBij(ctx, 'verwanten op zijtakken', 'reconstructie · vereenvoudigd', 1760, 200, q.on('verwanten', 1, 0.6), 'right', C.goud); },

  // ================= H3 Hetzelfde skelet =================
  s21(ctx, t, q) { E7.sch(ctx);
    const A = [q.on('mensenarm', 1, 0.5), q.on('vleermuis', 1, 0.5), q.on('walvisvin', 1, 0.5), q.on('paard', 1, 0.5)].map((a, i) => Math.max(a, 0.3 * ramp(t, i * 0.12, 0.4))); // meteen zichtbaar, vol op het woord
    const hu = lerp(1, 0.15, q.on('binnen', 1, 1.2)), t1 = q.at('opperarmbeen'), t2 = q.at('spaakbeen'), t3 = q.at('pols');
    const u = t < t1 ? 0 : t < t2 ? (1 / 3) * ease((t - t1) / 0.6) : t < t3 ? 1 / 3 + (1 / 3) * ease((t - t2) / 0.6) : 2 / 3 + (1 / 3) * ease((t - t3) / 0.6);
    const nad = t < t1 || t > t3 + 1.6 ? null : t < t2 ? 'arm' : t < t3 ? 'onder' : 'hand';
    [['mens', 280], ['vleermuis', 520], ['walvis', 1340], ['paard', 1640]].forEach(([n, x], i) => armSkelet(ctx, n, x, 220, 560, { huid: hu, u: Math.max(u, 0.0001), a: A[i], nadruk: nad }));
    [['mens', 280], ['vleermuis', 700], ['walvis', 1340], ['paard', 1660]].forEach(([n, x], i) => naamBij(ctx, n, null, x, 180, A[i], 'center'));
    E7.legenda(ctx, 960, 850, [['opperarmbeen', BOT.arm, q.on('opperarmbeen', 1, 0.5)], ['spaakbeen + ellepijp', BOT.onder, q.on('spaakbeen', 1, 0.5)], ['pols- en handbotjes', BOT.hand, q.on('pols', 1, 0.5)]]); },
  s22(ctx, t, q) { E7.sch(ctx); const hu = lerp(0.15, 1, q.on('vorm', 1, 1.0)), h = lerp(560, 540, ease(t / 1.2)), an = 1 - ramp(t, 0.2, 0.8), F = ['grijpen', 'vliegen', 'zwemmen', 'rennen'];
    [['mens', 280], ['vleermuis', 520], ['walvis', 1340], ['paard', 1640]].forEach(([n, x], i) => { const e = clamp((t - q.at(F[i])) / 1.6, 0, 1), w = Math.sin(e * Math.PI) * Math.sin(e * Math.PI * 3) * 0.07; // elk lidmaat beweegt even bij zijn functie
      ctx.save(); ctx.translate(x, 220); ctx.rotate(w); ctx.translate(-x, -220); armSkelet(ctx, n, x, 220, h, { huid: hu }); ctx.restore(); });
    [['mens', 280], ['vleermuis', 700], ['walvis', 1340], ['paard', 1660]].forEach(([n, x]) => naamBij(ctx, n, null, x, 180, an, 'center'));
    [['grijpen', 280], ['vliegen', 760], ['zwemmen', 1340], ['rennen', 1660]].forEach(([n, x]) => naamBij(ctx, n, null, x, 840, q.on(n, 1, 0.5), 'center'));
    naamBij(ctx, 'homologe organen', 'zelfde bouw · andere functie', 960, 150, q.on('homologe', 1, 0.6), 'center', C.goud); },
  // vraag-alinea: de walvisvin in röntgenbeeld, de vingerbotjes lichten op
  s23(ctx, t, q) { E7.sch(ctx); const v = q.on('vingerbotjes', 1, 0.5);
    armSkelet(ctx, 'walvis', 960, 190, 640, { huid: 0.6, nadruk: v > 0.5 ? 'hand' : null });
    naamBij(ctx, 'walvisvin', null, 960, 160, 1, 'center'); naamBij(ctx, 'vingerbotjes', null, 1060, 700, v, 'left', BOT.hand); vraagteken(ctx, 1240, 520, q.on('walvisvin', 1, 0.5), 110); },
  s25(ctx, t, q) { E7.sch(ctx); const tb = q.at('botjes'), aA = 1 - ramp(t, tb - 0.5, 0.7), aB = ramp(t, tb - 0.3, 0.8);
    if (aA > 0.01) { // een vin zonder vingers: haai naast de walvisvin
      armSkelet(ctx, 'walvis', 1380, 200, 600, { huid: 0.6, a: aA, nadruk: q.on('vingers', 1, 0.3) > 0.5 ? 'hand' : null });
      haai(ctx, 640, 470, 1.3, { t, a: aA * q.on('haaienvin', 1, 0.3) }); naamBij(ctx, 'haaienvin', 'geen vingerbotjes', 560, 650, aA * q.on('haaienvin', 1, 0.5), 'center'); naamBij(ctx, 'walvisvin', null, 1380, 170, aA, 'center'); }
    if (aB > 0.01) { ctx.save(); ctx.globalAlpha *= aB; const top = [['mens', 300], ['vleermuis', 620], ['walvis', 1300], ['paard', 1620]]; top.forEach(([n, x]) => armSkelet(ctx, n, n === 'vleermuis' ? x - 60 : x, 160, 330, { huid: 0.3 }));
      const vx = 960, vy = 780, tv = q.at('voorouder'); top.forEach(([n, x], i) => E7.lijnStuk(ctx, vx, vy, n === 'vleermuis' ? x + 60 : x, 520, ease((t - tv - i * 0.15) / 1.0)));
      const ad = q.on('voorouder', 1, 0.4); if (ad > 0.01) circ(ctx, vx, vy, 12 * ad, C.goud, _lt(C.goud, 0.4), 2);
      naamBij(ctx, 'gemeenschappelijke voorouder', 'poot met vijf vingers', vx, vy + 70, q.on('gemeenschappelijke', 1, 0.6), 'center', C.goud); ctx.restore(); } },
  s26(ctx, t, q) { const tl = q.at('landdier') - 0.3;
    if (t < tl) { zee(ctx); const res = bultrug(ctx, 960, 500, 1.55, { t: t + 30, rontgen: 1 }); E7.heup(ctx, 960, 500, 1.55, res, 0.6 + 0.4 * Math.sin(t * 3) ** 2); return; }
    E7.sch(ctx); const wervel = (x0, y0, n, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x0 + i * 46, y0 - 18, 40, 36, 8); shape(ctx, BOT.kaal, BOT.kaalR, 1.5); } ctx.restore(); };
    wervel(160, 380, 14, ramp(t, tl, 0.5)); const ab = q.on('bekken', 1, 0.5), vast = q.on('vast', 1, 0.4) * (1 - q.on('achterpoten', 1, 0.8));
    E7.bekken(ctx, 590, 398, 1.2, ab, vast > 0.5);
    const ap = ease((t - q.at('draagt')) / 0.9); if (ap > 0.01) { bot(ctx, 597, 492, lerp(597, 560, ap), lerp(492, 660, ap), 30, BOT.kaal); if (ap > 0.6) bot(ctx, 560, 660, lerp(560, 600, (ap - 0.6) / 0.4), lerp(660, 820, (ap - 0.6) / 0.4), 22, BOT.kaal); }
    naamBij(ctx, 'landdier', 'bekken vast aan de wervelkolom', 160, 260, ramp(t, tl, 0.5), 'left');
    wervel(1020, 380, 16, q.on('walvis', 1, 0.5)); const ah = q.on('botjes', 2, 0.5); bot(ctx, 1420, 520, 1500, 490, 22, C.goud, { a: ah }); bot(ctx, 1440, 560, 1520, 530, 22, C.goud, { a: ah });
    naamBij(ctx, 'walvis', 'heupbotjes los in de buik', 1020, 260, q.on('walvis', 1, 0.5), 'left'); naamBij(ctx, 'dragen niets', null, 1470, 640, q.on('niets', 1, 0.5), 'center', C.goud); },
  s27(ctx, t, q) { zee(ctx); const x = 900 + t * 6, y = 500 + Math.sin(t * 0.5) * 5, dm = q.on('rudimentair', 1, 1.0);
    const res = bultrug(ctx, x, y, 1.55, { t, rontgen: lerp(1, 0.35, dm) }), hp = E7.heup(ctx, x, y, 1.55, res, 1);
    if (hp) { const as = q.on('spieren', 1, 0.6) * (1 - 0.6 * q.on('Maar', 1, 0.8)); if (as > 0.01) { ctx.save(); ctx.globalAlpha *= as; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.lineCap = 'round';
        for (const [dx, dy] of [[-40, 34], [-10, 44], [30, 36]]) { ctx.beginPath(); ctx.moveTo(hp[0], hp[1]); ctx.quadraticCurveTo(hp[0] + dx * 0.5, hp[1] + dy * 0.2, hp[0] + dx, hp[1] + dy); ctx.stroke(); } ctx.restore(); }
      const pulse = q.on('heupbotjes', 1, 0.3) * (1 - ramp(t, q.at('heupbotjes') + 1.2, 0.5)); if (pulse > 0.01) circ(ctx, hp[0], hp[1], 46, null, rgba(C.goud, pulse), 3);
      const ap = q.on('achterpoten', 1, 0.6); E7.gestippeld(ctx, hp[0], hp[1] + 10, hp[0] + 40, hp[1] + 120, ap, C.line, 3); E7.gestippeld(ctx, hp[0] + 40, hp[1] + 120, hp[0] - 10, hp[1] + 200, ap, C.line, 3);
      naamBij(ctx, 'rudimentair orgaan', 'oorspronkelijke functie kwijt', hp[0] - 40, hp[1] + 110, q.on('rudimentair', 1, 0.6), 'right', C.goud); } },
  s28(ctx, t, q) { E7.sch(ctx); persoon(ctx, 'noor', 520, 880, 620, { zij: true, kijk: -1, a: q.on('Jij', 1, 0.3), t }); // rug naar de zoomcirkel
    const r = 290 * ease((t - q.at('staartbeen')) / 0.9);
    if (r > 4) zoomCircle(ctx, 1300, 460, r, E7_STUIT[0], E7_STUIT[1], r > 280 ? 'staartbeen · 3–5 vergroeide wervels' : null, 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 160, 600, 600);
      staartbeen(ctx, 1300, 480, 1.35, { nadruk: 0 }); staartbeen(ctx, 1300, 480, 1.35, { nadruk: 1, a: q.on('vergroeide', 1, 0.6) }); E7.spookStaart(ctx, 1300, 480, 1.35, q.on('restant', 1, 0.8)); }); },

  // ================= H4 Het spoor in het DNA =================
  s29(ctx, t, q) { E7.sch(ctx); const ANC = 'ATGGCTAAGTTCGAC', L1 = 'ATGGCAAAGTTCGAC', L2 = 'ATGGCTAAGTACGTC';
    E7.rij(ctx, 480, 220, 'voorouder', ANC, { a: q.on('DNA', 1, 0.6) });
    const tE = q.at('erfden'); E7.lijnStuk(ctx, 1030, 300, 760, 460, ease((t - tE + 0.3) / 0.8)); E7.lijnStuk(ctx, 1030, 300, 1300, 460, ease((t - tE + 0.3) / 0.8));
    const dc = ease((t - tE) / 0.9); for (const x of [160, 1000]) if (dc > 0.01) E7.rij(ctx, x, lerp(240, 500, dc), '', ANC, { cw: 40, naamW: 140, a: dc });
    const ar = ramp(t, q.at('Daarna'), 0.6), ts = q.at('stapelen'), te = q.at('mutaties') + 0.6;
    const dif = (k) => (i) => { const order = k ? [9, 13] : [5]; const j = order.indexOf(i); return j < 0 ? 1 : ramp(t, ts + (te - ts) * (j + 0.5) / (order.length + 0.5), 0.4); };
    E7.rij(ctx, 160, 582, 'lijn 1', L1, { cw: 40, naamW: 140, ref: ANC, dif: dif(0), a: ar }); E7.rij(ctx, 1000, 582, 'lijn 2', L2, { cw: 40, naamW: 140, ref: ANC, dif: dif(1), a: ar });
    naamBij(ctx, 'eigen mutaties in elke lijn', null, 960, 800, q.on('eigen', 1, 0.6), 'center', C.goud); },
  s30(ctx, t, q) { E7.sch(ctx); persoon(ctx, 'kim', 170, 860, 470, { pose: t > q.at('legt') ? 'wijs' : 'staan', uit: 'praat', t, a: q.on('Kim', 1, 0.3) });
    const R = [['walvis', RIJ_W], ['nijlpaard', RIJ_N], ['koe', RIJ_K], ['zeehond', RIJ_Z]], ts = q.at('stuk'), tv = q.at('verschillen');
    R.forEach(([n, s], i) => { const u = ease((t - ts - i * 0.45) / 0.7); if (u <= 0.01) return; E7.rij(ctx, 470 + (1 - u) * 500, 220 + i * 82, n, s, { a: u, ref: i ? RIJ_W : null, dif: ramp(t, tv + (i - 1) * 0.35, 0.5) }); });
    naamBij(ctx, 'minder verschillen = nauwer verwant', null, 1130, 760, q.on('nauwer', 1, 0.6), 'center', C.goud); },
  // vraag-alinea: walvis bovenaan, zeehond, koe en nijlpaard eronder; gestippelde lijnen en een vraagteken
  s31(ctx, t, q) { E7.sch(ctx); const ad = (i) => ramp(t, 0.1 + i * 0.25, 0.3);
    bultrug(ctx, 960, 290, 0.5, { t, a: ad(0) }); naamBij(ctx, 'walvis', null, 960, 200, ad(0), 'center');
    const D = [['zeehond', 400], ['koe', 960], ['nijlpaard', 1480]], tl = q.at('verwant');
    D.forEach(([n, x], i) => E7.gestippeld(ctx, 960, 370, x, 560, ease((t - tl - i * 0.15) / 0.7), C.line, 2.5));
    zeehond(ctx, 400, 820, 0.95, { t, a: ad(1) }); koe7(ctx, 960, 820, 0.8, { a: ad(2) }); nijlpaard(ctx, 1480, 820, 1.05, { a: ad(3) });
    D.forEach(([n, x], i) => naamBij(ctx, n, null, x, i ? 600 : 690, ad(i + 1), 'center'));
    vraagteken(ctx, 960, 520, q.on('nauwst', 1, 0.5), 90); evoSchaal(ctx, 'niet op schaal'); },
  s33(ctx, t, q) { E7.sch(ctx); const x = lerp(470, 300, ease(t / 0.9));
    const zd = ease((t - q.at('wijkt')) / 0.9), za = lerp(1, 0.35, zd), zy = lerp(466, 548, zd), zh = q.on('zeehond', 1, 0.4) * (1 - zd);
    E7.rij(ctx, x, 220, 'walvis', RIJ_W); E7.rij(ctx, x, 302, 'nijlpaard', RIJ_N, { ref: RIJ_W }); E7.rij(ctx, x, 384, 'koe', RIJ_K, { ref: RIJ_W }); E7.rij(ctx, x, zy, 'zeehond', RIJ_Z, { ref: RIJ_W, a: za });
    if (zh > 0.01) { roundRect(ctx, x - 14, zy - 10, 1180, 76, 14); ctx.strokeStyle = rgba(C.line, zh); ctx.lineWidth = 2; ctx.stroke(); }
    const tm = q.at('minste'); [RIJ_N, RIJ_K, RIJ_Z].forEach((r, k) => { const n = telVerschil(RIJ_W, r), yy = k === 2 ? zy + 40 : 302 + k * 82 + 40;
      naamBij(ctx, n + (n === 1 ? ' verschil' : ' verschillen'), null, 1220, yy, ramp(t, tm + k * 0.3, 0.4) * (k === 2 ? za : 1), 'left', k === 0 ? C.goud : C.text); });
    const ab = q.on('minste', 1, 0.5); if (ab > 0.01) { roundRect(ctx, 286, 302 - 10, 1180, 76, 14); ctx.strokeStyle = rgba(C.goud, ab); ctx.lineWidth = 3; ctx.stroke(); }
    naamBij(ctx, 'zeehond: een roofdier', 'familie van honden en beren', 520, 700, 0.6 * q.on('roofdier', 1, 0.6), 'left'); },
  s34(ctx, t, q) { E7.sch(ctx); const SW = 'ATGGCGGTCAAGTTC', SK = 'ATGGC---CAAGTTC', o = { ins: [5, 8], cw: 52 };
    const ti = q.at('ingevoegd'), ow = ease((t - ti + 0.2) / 0.6), dw = ease((t - ti - 0.3) / 0.8), tn = q.at('DNA'), on = ease((t - tn + 0.4) / 0.6), dn = ease((t - tn - 0.1) / 0.8);
    E7.rij(ctx, 260, 260, 'walvis', SW, Object.assign({ open: ow, drop: dw }, o)); E7.rij(ctx, 260, 342, 'nijlpaard', SW, Object.assign({ open: on, drop: dn }, o));
    const ok = ease((t - q.at('koe')) / 0.6); E7.rij(ctx, 260, 424, 'koe', SK, Object.assign({ open: ok, gat: ok }, o));
    naamBij(ctx, 'ingevoegd stukje', 'zelfde plek', 260 + 220 + 52 * 6.5, 220, q.on('plek', 1, 0.6), 'center', C.paars);
    const ap = q.on('plek', 1, 0.4) * (1 - q.on('koe', 1, 0.6)); if (ap > 0.01) { roundRect(ctx, 260 + 220 + 52 * 5 - 4, 250, 52 * 3 + 8, 164, 12); ctx.strokeStyle = rgba(C.paars, ap); ctx.lineWidth = 3; ctx.stroke(); }
    naamBij(ctx, 'niet ingevoegd', null, 260 + 220 + 52 * 6.5, 560, q.on('niet', 1, 0.6), 'center'); naamBij(ctx, 'geërfd van één gemeenschappelijke voorouder', null, 960, 720, q.on('gemeenschappelijke', 1, 0.6), 'center', C.goud); },
  s35(ctx, t, q) { E7.sch(ctx); const tg = q.at('verschillen') - 0.3, a1 = 1 - ramp(t, tg - 0.5, 0.6);
    if (a1 > 0.01) { // de klok tikt; bij elke tik een gouden letter erbij
      const tik = Math.max(0, Math.floor((t - 0.4) / 0.7) + 1), ANC = 'ATGGCTAAGTTCGAC', seq = ANC.split(''); E7_MUT.slice(0, Math.min(5, tik)).forEach(i => { seq[i] = { A: 'G', T: 'C', G: 'A', C: 'T' }[ANC[i]]; });
      E7.met(ctx, a1, () => { E7.klok(ctx, 1560, 420, 110, tik); E7.rij(ctx, 300, 340, '', ANC, { naamW: 0 }); E7.rij(ctx, 300, 430, '', seq.join(''), { naamW: 0, ref: ANC, dif: 1 }); }); }
    const ag = ramp(t, tg, 0.6); if (ag <= 0.01) return; ctx.save(); ctx.globalAlpha *= ag;
    const x0 = 300, y0 = 780, w = 1200, h = 460; ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let i = 1; i < 6; i++) ctx.fillRect(x0 + i * w / 6, y0 - h, 1.5, h);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0 - h - 20); ctx.lineTo(x0, y0); ctx.lineTo(x0 + w + 20, y0); ctx.stroke();
    for (let i = 0; i < 14; i++) { const a = ramp(t, tg + 0.2 + i * 0.12, 0.3); if (a <= 0.01) continue; const u = (i + 0.5) / 14, v = u * 0.9 + (hash(i * 7) - 0.5) * 0.12;
      ctx.save(); ctx.globalAlpha *= a; circ(ctx, x0 + u * w, y0 - v * h, 8, rgba(C.paars, 0.8), _lt(C.paars, 0.4), 1.5); ctx.restore(); }
    const lk = ease((t - q.at('klok', 2)) / 0.8), cal = ease((t - q.at('stelt')) / (q.at('gemeten') - q.at('stelt') + 0.4)), sl = lerp(0.72, 0.9, cal);
    if (lk > 0.01) { ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + w * lk, y0 - sl * h * lk); ctx.stroke(); }
    const af = q.on('fossielen', 1, 0.5); if (af > 0.01) { circ(ctx, x0 + w * 0.6, y0 - 0.54 * h, 14 * af, C.goud, _lt(C.goud, 0.4), 2); naamBij(ctx, 'fossiel met gemeten leeftijd', 'zet de klok gelijk', x0 + w * 0.6 + 30, y0 - 0.54 * h + 70, af, 'left', C.goud); }
    metaText(ctx, 'verschillen in het dna', x0, y0 - h - 40, C.grain, 'left', 26); metaText(ctx, 'tijd sinds de splitsing →', x0 + w, y0 + 50, C.text2, 'right', 26);
    naamBij(ctx, 'moleculaire klok', null, 1560, 200, q.on('moleculaire', 1, 0.6), 'left', C.paars); ctx.restore(); },
  // vraag-alinea: twee splitsingen, 2 en 4 procent verschil
  s36(ctx, t, q) { E7.sch(ctx);
    const vork = (x, y, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60, y); ctx.lineTo(x + 130, y - 36); ctx.moveTo(x + 60, y); ctx.lineTo(x + 130, y + 36); ctx.stroke(); circ(ctx, x + 60, y, 8, C.bgSchema, C.goud, 3); ctx.restore(); };
    const b = (y, w, a, s) => { if (a <= 0.01) return; roundRect(ctx, 560, y - 35, Math.max(16, w), 70, 12); shape(ctx, rgba(C.goud, 0.45 * a), rgba(C.goud, a), 2); text(ctx, s, 560 + Math.max(16, w) + 24, y + 15, fTekst(44, 700), rgba(C.text, a), 'left'); };
    vork(300, 400, ramp(t, 0, 0.3)); b(400, 300 * ease((t - q.at('2')) / 0.8), q.on('2', 1, 0.4), '2%');
    vork(300, 600, q.on('andere', 1, 0.4)); b(600, 600 * ease((t - q.at('4')) / 0.8), q.on('4', 1, 0.4), '4%');
    vraagteken(ctx, 1560, 540, q.on('langst', 1, 0.5), 120); },
  s38(ctx, t, q) { E7.sch(ctx);
    const w2 = 420 * ease(t / 0.8), w4 = 840 * ease((t - q.at('zoveel')) / 1.0);
    roundRect(ctx, 300, 340, Math.max(14, w2), 70, 12); shape(ctx, rgba(C.goud, 0.45), C.goud, 2); text(ctx, '2% verschil', 330, 388, fTekst(40, 700), C.text);
    const a4 = q.on('zoveel', 1, 0.4); if (a4 > 0.01) { ctx.save(); ctx.globalAlpha *= a4; roundRect(ctx, 300, 500, Math.max(14, w4), 70, 12); shape(ctx, rgba(C.goud, 0.45), C.goud, 2); text(ctx, '4% verschil', 330, 548, fTekst(40, 700), C.text); ctx.restore(); }
    const ap = ease((t - q.at('splitsten')) / 0.8); if (ap > 0.01) { pijl(ctx, 300, 680, lerp(300, 1160, ap), 680, C.line, 1, 3, 16); metaText(ctx, 'tijd sinds de splitsing', 300, 730, C.text2, 'left', 26); }
    naamBij(ctx, '≈ 2× zo lang geleden', 'ongeveer: de klok tikt', 1180, 530, q.on('lang', 1, 0.6), 'left', C.goud); naamBij(ctx, '', 'niet precies gelijk', 1180, 562, q.on('want', 1, 0.6), 'left');
    const au = q.on('klok', 1, 0.6); if (au > 0.01) { ctx.save(); ctx.globalAlpha *= au; ctx.strokeStyle = C.line; ctx.lineWidth = 3; const xe = 300 + w4 + Math.sin(t * 2.2) * 6; // onzekerheid aan het eind van de balk
      ctx.beginPath(); ctx.moveTo(xe - 70, 476); ctx.lineTo(xe + 70, 476); ctx.moveTo(xe - 70, 466); ctx.lineTo(xe - 70, 486); ctx.moveTo(xe + 70, 466); ctx.lineTo(xe + 70, 486); ctx.stroke(); ctx.restore(); } },
  s39(ctx, t, q) { E7.sch(ctx); const X = tijdAsMj(ctx, 200, 640, 1520, 60, 30, { stap: 5 }), yT = 640;
    const ak = q.on('55', 1, 0.5); if (ak > 0.01) { circ(ctx, X(55), yT, 14 * ak, C.paars, _lt(C.paars, 0.4), 2); E7.gestippeld(ctx, X(55), yT - 16, X(55), 360, ramp(t, q.at('55') + 0.2, 0.6), C.paars, 2); }
    naamBij(ctx, 'DNA-klok: splitsing', 'walvis en nijlpaard · ±55 miljoen jaar', X(55), 300, q.on('splitsten', 1, 0.6), 'center', C.paars);
    const af = q.on('walvisfossielen', 1, 0.4); if (af > 0.01) { circ(ctx, X(50), yT, 14 * ramp(t, q.at('50'), 0.4), C.goud, _lt(C.goud, 0.4), 2); pakicetus(ctx, X(50) + 40, 520, 0.36, { t, a: af }); }
    naamBij(ctx, 'oudste walvisfossiel', 'ongeveer 50 miljoen jaar', X(50) + 180, 430, q.on('50', 1, 0.6), 'left', C.goud);
    const an = q.on('ná', 1, 0.5) * (1 - q.on('Lagen', 1, 0.6)); if (an > 0.01) pijl(ctx, X(55) + 18, yT - 40, X(50) - 18, yT - 40, C.text, an, 3, 14);
    // drie methoden: lagen, botten, DNA (kleine pictogrammen rechtsboven)
    const ic = [q.on('Lagen', 1, 0.5), q.on('botten', 1, 0.5), q.on('DNA', 1, 0.5)];
    gesteente(ctx, 1240, 200, 130, 90, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { golf: 2, a: ic[0] });
    armSkelet(ctx, 'walvis', 1460, 180, 150, { huid: 0.3, a: ic[1] });
    E7.rij(ctx, 1540, 220, '', 'ATGGC', { naamW: 0, cw: 30, ch: 40, a: ic[2] });
    haak(ctx, X(57), X(48), 760, 'lagen, botten en DNA: hetzelfde verhaal', C.groen, q.on('drie', 1, 0.6)); },
  s40(ctx, t, q) { E7.sch(ctx); const g = lerp(0.5, 1, ease(t / (q.at('cladogram') + 0.4)));
    ctx.save(); ctx.beginPath(); ctx.rect(0, lerp(900, 100, g), W, H); ctx.clip(); // de boom groeit van de wortel omhoog
    cladogram(ctx, 480, 840, 1000, 480, ['zeehond', ['koe', ['nijlpaard', 'walvis']]], { markeer: ['walvis'], tekenBlad: (c, n, x, y, a) => { const f = { zeehond: () => zeehond(c, x, y - 10, 0.36, { a, t }), koe: () => koe7(c, x, y, 0.32, { a }), nijlpaard: () => nijlpaard(c, x, y, 0.3, { a }), walvis: () => bultrug(c, x, y - 40, 0.2, { a, t }) }[n]; f && f(); } });
    ctx.restore();
    // de walvistak krijgt zijn fossielen (Pakicetus … Basilosaurus) als gouden ruitjes
    const nx = 1313, ny = 520, lx = 1480, ly = 360; for (let i = 0; i < 4; i++) { const a = ramp(t, q.at('cladogram') + 0.5 + i * 0.3, 0.4); if (a <= 0.01) continue; const u = 0.25 + i * 0.17;
      ctx.save(); ctx.globalAlpha *= a; ctx.translate(lerp(nx, lx, u) + 22, lerp(ny, ly, u) + 6); ctx.rotate(Math.PI / 4); ctx.fillStyle = C.goud; ctx.fillRect(-7, -7, 14, 14); ctx.restore(); }
    naamBij(ctx, 'cladogram', 'verder in film 8', 160, 220, q.on('cladogram', 1, 0.6), 'left', C.goud); evoSchaal(ctx, 'niet op schaal'); },

  // ================= Samenvatting: eigen recapbeeld (de speler tekent daarna de eindkaart) =================
  s41(ctx, t, q) { E7.sch(ctx);
    const p1 = q.on('laag', 1, 0.6), p2 = q.on('Radioactieve', 1, 0.6), p3 = q.on('heupbotjes', 1, 0.6), p4 = q.on('DNA', 1, 0.6);
    const paneel = (x, a, titel) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 190, 520, 470, 18); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.6), 1.5); metaText(ctx, titel, x + 260, 240, C.text2, 'center', 26); ctx.restore(); };
    paneel(120, p1, 'lagen'); paneel(700, p3, 'botten'); paneel(1280, p4, 'dna');
    // 1 lagen: omgeklapt en teruggedraaid, R goud; daaronder een steentje met vervallende atomen
    if (p1 > 0.01) { const u = ease((t - q.at('eerste')) / 1.2); ctx.save(); ctx.translate(380, 420); ctx.scale(0.66, 0.66); ctx.translate(-380, -420); E7.pqr(ctx, 230, 330, 300, 180, (Math.PI - 0.3) * (1 - u), { a: p1, nadruk: u > 0.95 ? 0 : -1, rGoud: u > 0.95, fs: 1 }); ctx.restore(); }
    E7.atomen(ctx, 380, 590, 90, 40, (t - q.at('Radioactieve')) * 0.8, p2, 5, 12, { r: 7 });
    // 2 botten: bultrug met gouden heupbotjes en de gestippelde poot van de voorouders
    if (p3 > 0.01) { const x = 960, y = 420, res = bultrug(ctx, x, y, 0.55, { t, rontgen: 1, a: p3 }), hp = E7.heup(ctx, x, y, 0.55, res, p3);
      if (hp) { const ap = q.on('poten', 1, 0.6); E7.gestippeld(ctx, hp[0], hp[1] + 6, hp[0] + 20, hp[1] + 60, ap, C.line, 2.5); E7.gestippeld(ctx, hp[0] + 20, hp[1] + 60, hp[0] - 6, hp[1] + 100, ap, C.line, 2.5); } }
    // 3 DNA: walvis en nijlpaard met één verschil
    if (p4 > 0.01) { E7.rij(ctx, 1300, 380, 'walvis', 'ATGGCTA', { cw: 40, naamW: 175, ch: 50, a: p4 }); E7.rij(ctx, 1300, 450, 'nijlpaard', 'ATGGCAA', { cw: 40, naamW: 175, ch: 50, ref: 'ATGGCTA', a: p4 }); }
    const aw = q.on('wijzen', 1, 0.7); if (aw > 0.01) for (const x of [380, 960, 1540]) pijl(ctx, x, 680, x, 740, C.groen, aw, 4, 16); // alle drie dezelfde kant op
    haak(ctx, 380, 1540, 760, 'één verhaal', C.groen, aw); },
});

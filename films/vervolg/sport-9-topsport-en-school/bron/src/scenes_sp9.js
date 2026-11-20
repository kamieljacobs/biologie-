// Wat word jij? · Sport en topsport 9 · Topsport en school — scènes per alinea (v1.0, 20 nov 2026).
// Look: Schema met cast. De zwemmer (Sam: 'zwem' in het bad, 'school' in de klas en de mentorkamer, pyjama in bed), de zwemtrainer ('zwemtrainer'),
// de mentor/topsportcoördinator (mevrouw Visser, 'visser', zonder naam), klasgenoten als castfiguranten (noor, bilal, lotte, yasmin) zonder naam.
// Terugspoelbalk bovenin groeit per hoofdstuk; de stapel 'TOTALE BELASTING' (MODEL) krijgt per stap terug een blok.

const SP9_SX = 1400, SP9_SY = 800; // standaardplek van de stapel (rechts)

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); const wl = 640; ctx.fillStyle = SP9.water; ctx.fillRect(1000, wl, 920, 236); ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath();
    for (let x = 1000; x <= 1920; x += 12) { const yy = wl + Math.sin(x / 60 + t * 1.5) * 3; x === 1000 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
    ctx.fillStyle = SP9.dek; ctx.fillRect(1000, wl - 30, 920, 26); ctx.fillStyle = SP9.dekL; ctx.fillRect(1000, wl - 30, 920, 5);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.35 + k / 3) % 1); ctx.strokeStyle = rgba(C.teal, 0.8 * (1 - u)); ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1460, wl + 110, 40 + u * 360, 12 + u * 70, 0, 0, 6.283); ctx.stroke(); }
    ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const muur = 360, wl = 560, L = 300, st = q.at('stopt') + 0.2, B = t >= st;
    SP9_badZij(ctx, muur, wl, t); SP9_lijnen(ctx, muur, wl - 6);
    SP9_digi(ctx, 1640, 230, 'DO 16:40', 1, C.text, 40);
    // zwemtrainer op de kant, gebaart na het stoppen naar de kant
    const gb = q.on('schouder', 1, 0.4);
    persoon(ctx, 'zwemtrainer', 190, wl - 26, 400, { pose: gb > 0.5 ? 'wijs' : 'staan', kijk: 1, uit: gb > 0.5 ? 'praat' : 'neutraal', t });
    if (!B) { SP9_water(ctx, muur, wl, t); const x = 520 + 1.7 * (L / 1.79) * t; zwemmer(ctx, 'sam', x, wl + 0.12 * L, L, { slag: 'crawl', t }); SP9_kopwand(ctx, muur, wl); }
    else { const hand = q.on('schouder', 1, 0.6), h = 560, sx = 960; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
      const r = persoon(ctx, 'sam', sx, wl + h * 0.5, h, { outfit: 'zwem', zij: true, kijk: -1, bril: 'muts', uit: hand > 0.5 ? 'bezorgd' : 'neutraal', t, arm: [lerp(0.15, 1.15, hand), lerp(0.1, 2.5, hand)], armVer: [0.1, 0.3] }); ctx.restore();
      SP9_water(ctx, muur, wl, t, 1 - ramp(t, st + 0.3, 2.5), sx); SP9_kopwand(ctx, muur, wl);
      if (r.handR && r.handR.shx != null) SP9_laag(ctx, hand, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(r.handR.shx, r.handR.shy, 46 + 4 * Math.sin(t * 5), 0, 6.283); ctx.stroke(); }); }
    // stapel en puzzel
    const Bl = q.on('Vreemd', 1, 0.6), Pz = q.on('Hoe', 1, 0.5);
    SP9_stapel(ctx, SP9_SX, SP9_SY, [SP9_blok('training', Bl)], Bl, { titel: Bl });
    SP9_laag(ctx, q.on('toetsweek', 1, 0.4) * (1 - Pz), () => SP9_label(ctx, 'TOETSWEEK', 1400, 450, 1, C.paars));
    SP9_laag(ctx, Pz, () => { SP9_kaart(ctx, 1240, 300, 600, 220, 1, C.goud); text(ctx, 'Niet harder getraind,', 1280, 380, fTitel(50), C.text, 'left'); text(ctx, 'toch pijn?', 1280, 444, fTitel(50), C.text, 'left'); metaText(ctx, 'WAT DENK JE?', 1280, 496, C.goud, 'left', 24); });
    SP9_spoel(ctx, 1, ramp(t, 0.3, 0.6), { tik: clamp((t - q.at('spoelen')) / 0.6, 0, 1) }); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 1);
    const tk = q.on('tikt', 1, 0.5);
    persoon(ctx, 'zwemtrainer', 250, zit - 10, 460, { pose: 'wijs', kijk: 1, uit: t < 2.2 ? 'neutraal' : 'praat', t });
    const r = persoon(ctx, 'sam', 560, zit + 110, 440, { outfit: 'zwem', pose: 'zit', zitHoogte: 110, bril: 'muts', uit: 'neutraal', t, pose2: 0, hold: (c, x, y) => SP9_telHand(c, x, y) });
    SP9_handdoek(ctx, r, 1); SP9_waterFront(ctx, wl, t);
    const sc = q.on('cijfer', 1, 0.5), fo = q.on('minuten', 1, 0.5), Ru = q.on('rustig', 1, 0.4), Sc = q.on('scherm', 1, 0.4);
    SP9_tablet(ctx, 900, 160, 920, 600, q.on('tablet', 1, 0.5), (x, y, w, h) => {
      SP9_laag(ctx, 1 - Ru, () => {
        SP9_laag(ctx, sc, () => { metaText(ctx, 'HOE ZWAAR VOELDE HET?', x + 40, y + 70, C.text, 'left', 26);
          for (let i = 1; i <= 10; i++) { const cx = x + 70 + (i - 1) * 78, act = i === 7 && t > q.at('één') ; circ(ctx, cx, y + 150, 30, act ? rgba(C.oker, 0.85) : '#24304A', act ? C.oker : '#56627E', 2); text(ctx, String(i), cx, y + 162, fTekst(30, 800), act ? '#121A26' : C.text, 'center'); } });
        SP9_laag(ctx, fo, () => { text(ctx, '90 min × 7 = 630', x + 40, y + 300, fTitel(66), C.text, 'left'); metaText(ctx, 'TRAININGSBELASTING', x + 40, y + 360, C.oker, 'left', 26); }); });
      SP9_laag(ctx, Ru, () => { const base = y + h - 90; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 80, base); ctx.lineTo(x + w - 60, base); ctx.stroke();
        SP9_staaf(ctx, x + w * 0.32, base, 160, 110 * ramp(t, q.at('rustig'), 0.8), C.oker, 'UUR RUSTIG', 1);
        SP9_staaf(ctx, x + w * 0.68, base, 160, 330 * ramp(t, q.at('sprintseries'), 0.8), C.oker, 'UUR SPRINTSERIES', q.on('sprintseries', 1, 0.3)); });
      SP9_laag(ctx, Sc, () => { ctx.strokeStyle = C.oker; ctx.lineWidth = 5; roundRect(ctx, x + 6, y + 6, w - 12, h - 12, 12); ctx.stroke(); });
    });
    SP9_laag(ctx, Sc, () => SP9_label(ctx, 'TABLET: ALLEEN TRAINING', 1360, 820, 1, C.oker, 'center', 24));
    SP9_meta(ctx, 'HADDAD E.A. 2017', 1820, 820, q.on('clubs', 1, 0.4) * (1 - Sc), C.grain, 'right', 24); },

  s04(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 1);
    const groei = ramp(t, 0.5, 1.6), Dk = q.on('denk', 1, 0.4);
    SP9_tablet(ctx, 160, 150, 1140, 700, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, groei, { streep: q.on('precies', 1, 0.6) }));
    for (let i = 0; i < 3; i++) SP9_kaart(ctx, 1400, 210 + i * 200, 420, 160, ramp(t, q.at('denk') + i * 0.15, 0.3), C.text2);
    SP9_laag(ctx, Dk, () => metaText(ctx, 'WAT DENK JE?', 1400, 190, C.goud, 'left', 24)); },

  s06(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_antw(ctx, 'antwoord c: buiten het water kwam er iets bij');
    SP9_spoel(ctx, 1 + ramp(t, q.at('Daarvoor'), 0.9), 1, { tik: clamp((t - q.at('Daarvoor')) / 0.6, 0, 1) });
    persoon(ctx, 'zwemtrainer', 240, zit - 10, 370, { kijk: 1, uit: 'neutraal', t });
    SP9_tablet(ctx, 420, 240, 820, 520, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, 1, { chips: q.on('Pech', 1, 0.4) * (1 - q.on('bijkwam', 1, 0.4)) }));
    const V = q.on('buiten', 1, 0.5); vraagteken(ctx, 1560, 470, V, 200); SP9_laag(ctx, V, () => SP9_label(ctx, 'BUITEN HET WATER?', 1560, 600, 1, C.goud, 'center'));
    SP9_laag(ctx, q.on('oorzaak', 1, 0.4), () => metaText(ctx, 'ZELDEN ÉÉN OORZAAK', 1560, 700, C.text2, 'center', 24));
    SP9_waterFront(ctx, wl, t); },

  // ---------- H2 ----------
  s07(ctx, t, q) { const av = t >= q.at('avond') - 0.2, wek = !av; SP9_kamer(ctx, 0); SP9_spoel(ctx, 2);
    SP9_nachtkastje(ctx, 700, 670, 200, 170);
    const kl = av ? (t < q.at('twintig') ? '22:00' : (() => { const m = Math.round(clamp((t - q.at('twintig')) / 1.2, 0, 1) * 100); const tot = 22 * 60 + m; return String(Math.floor(tot / 60)).padStart(2, '0') + ':' + String(tot % 60).padStart(2, '0'); })()) : '05:00';
    SP9_digi(ctx, 800, 650, kl, 1, C.koraal, 40, wek ? (Math.sin(t * 22) > 0 ? t : 0) : 0);
    const slaapt = wek ? (t < 0.9) : (t > q.at('sliep') + 0.4 && t < q.at('Dat') + 0.2);
    const bh = SP9_bed(ctx, 'sam', 160, 765, 400, { t, uit: slaapt ? 'slaapt' : 'neutraal' });
    // zoomcirkel naast het hoofd: biologische klok en slaapdruk
    const Z = q.on('puberteit', 1, 0.5), sd = q.on('slaapdruk', 1, 0.5);
    zoomCircle(ctx, 1140, 400, 180, bh.hoofd.x + 70, bh.hoofd.y - 40, '', Z, () => { bg(ctx, 'schema'); SP9_bioklok(ctx, sd > 0.01 ? lerp(1140, 1070, sd) : 1140, 400, sd > 0.01 ? lerp(130, 95, sd) : 130, ramp(t, q.at('later'), 1.4));
      SP9_laag(ctx, sd, () => { const bx = 1190, by = 310, bhh = 170; metaText(ctx, 'SLAAPDRUK', bx + 28, by + bhh + 34, C.teal, 'center', 18); roundRect(ctx, bx, by, 56, bhh, 14); shape(ctx, '#1B2236', C.teal, 2.5); const f = clamp((t - q.at('slaapdruk')) / 6, 0, 1) * 0.55; ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(bx + 6, by + bhh - 6 - (bhh - 12) * f, 44, (bhh - 12) * f); }); });
    SP9_laag(ctx, Z, () => { metaText(ctx, 'BIOLOGISCHE KLOK', 1140, 625, C.teal, 'center', 24); metaText(ctx, 'PUBERTEIT: LATER', 1140, 657, C.teal, 'center', 24); });
    SP9_laag(ctx, sd, () => metaText(ctx, 'VEREENVOUDIGD', 1140, 692, C.grain, 'center', 22));
    SP9_meta(ctx, 'CARSKADON & TAROKH 2014', 1140, 730, q.on('onderzoek', 1, 0.4), C.grain, 'center', 22);
    const M = q.on('sliep', 1, 0.6);
    SP9_stapel(ctx, 1400, SP9_SY, [SP9_blok('training'), SP9_blok('slaap', M)], 1); },

  s08(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2);
    SP9_studie(ctx, 160, 180, 1000, 150, ['7 TOPZWEMMERS', 'AANLOOP OLYMPISCHE SPELEN · 14 DAGEN'], 'SARGENT E.A. 2014', q.on('Onderzoekers', 1, 0.5));
    SP9_bedRijen(ctx, [q.on('avond', 1, 0.5), q.on('eerder', 1, 0.5)]);
    const D = q.on('Haalden', 1, 0.5); SP9_laag(ctx, D, () => { metaText(ctx, 'SLAAPDUUR', 160, 690, C.text, 'left', 24);
      [['RUSTDAG', C.teal], ['TRAINING', C.koraal]].forEach(([l, kl], i) => { const yy = 715 + i * 70; metaText(ctx, l, 160, yy + 34, kl, 'left', 22); roundRect(ctx, 640, yy, 1020, 46, 10); shape(ctx, 'rgba(0,0,0,0)', rgba(kl, 0.7), 2); });
      vraagteken(ctx, 1760, 820, 1, 110); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2); SP9_antw(ctx, 'antwoord b: toch bijna twee uur korter');
    const IJ = q.on('IJsland', 1, 0.5);
    SP9_laag(ctx, 1 - IJ, () => { SP9_studie(ctx, 160, 250, 1000, 130, ['7 TOPZWEMMERS', 'AANLOOP OLYMPISCHE SPELEN · 14 DAGEN'], 'SARGENT E.A. 2014', 1); SP9_bedRijen(ctx, [1, 1]); });
    SP9_laag(ctx, IJ, () => SP9_studie(ctx, 160, 280, 1400, 240, ['108 TIENERZWEMMERS · IJSLAND · GEMIDDELD 16 JAAR', 'VOOR EEN VROEGE TRAINING ± 5 TOT 5,5 UUR'], 'GUDMUNDSDOTTIR 2020', 1));
    metaText(ctx, 'SLAAPDUUR', 160, 690, C.text, 'left', 24); const sch = 1020 / 8;
    [['RUSTDAG', C.teal, 7.1, '7,1 UUR', q.on('rustdag', 1, 1.0)], ['TRAINING', C.koraal, 5.4, '5,4 UUR', q.on('vijfenhalf', 1, 1.0)]].forEach(([l, kl, v, lab, f], i) => { const yy = 715 + i * 70; metaText(ctx, l, 160, yy + 34, kl, 'left', 22); roundRect(ctx, 640, yy, 1020, 46, 10); shape(ctx, 'rgba(0,0,0,0)', rgba(kl, 0.5), 2);
      if (f > 0.01) { roundRect(ctx, 640, yy, sch * v * ease(f), 46, 10); shape(ctx, rgba(kl, 0.7), kl, 2); } SP9_laag(ctx, f, () => metaText(ctx, lab, 640 + sch * v * ease(f) + 20, yy + 34, kl, 'left', 26)); });
    SP9_laag(ctx, SP9_fase(t, q.at('Slaapexperts'), q.at('IJsland') + 0.2, 0.4), () => { SP9_label(ctx, 'VROEG TRAINEN KOST SLAAP', 1820, 300, 1, C.koraal, 'right'); metaText(ctx, 'WALSH E.A. 2021', 1820, 350, C.grain, 'right', 22); }); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2 + ramp(t, 0.1, 0.9));
    const X = SP9_nachtAs(ctx, 260, 1660, 360, 20, 10, 1);
    metaText(ctx, 'DE NACHT', 260, 230, C.teal, 'left', 26);
    const s0 = X(23 + 40 / 60), s1 = X(5); ctx.save(); roundRect(ctx, s0, 280, (s1 - s0) * ramp(t, 0.6, 1.2), 40, 10); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); ctx.restore();
    SP9_meta(ctx, '23:40 – 05:00', (s0 + s1) / 2, 266, ramp(t, 1.4, 0.4), C.teal, 'center', 22);
    const Ad = q.on('acht', 1, 0.5); SP9_laag(ctx, Ad, () => { const a0 = X(21), a1 = X(5), b0 = X(19 + 0.01); SP9_lijn(ctx, [[a0, 450], [a1, 450]], C.teal, 6, 1, [14, 10]); metaText(ctx, 'ADVIES 8 TOT 10 UUR', a0, 440 - 14, C.teal, 'left', 22); });
    const kaarten = [['HERSTEL', q.on('herstelt', 1, 0.5)], ['AFWEER', q.on('afweer', 1, 0.5)], ['LEREN', q.on('brein', 1, 0.5)]];
    kaarten.forEach(([l, a], i) => SP9_laag(ctx, a, () => { const x = 260 + i * 480, y = 560; SP9_kaart(ctx, x, y, 420, 220, 1, C.teal); metaText(ctx, l, x + 210, y + 60, C.teal, 'center', 28);
      roundRect(ctx, x + 50, y + 110, 320, 50, 12); shape(ctx, '#1B2236', rgba(C.teal, 0.7), 2); const f = 0.5 * ease(clamp((t - q.at(['herstelt', 'afweer', 'brein'][i]) - 0.4) / 1.4, 0, 1)); roundRect(ctx, x + 50, y + 110, Math.max(1, 320 * f), 50, 12); shape(ctx, rgba(C.teal, 0.8), null); metaText(ctx, 'HALF', x + 210, y + 200, C.text2, 'center', 22); }));
    SP9_meta(ctx, 'WALSH E.A. 2021', 1820, 820, q.on('slaap', 1, 0.4), C.grain, 'right', 22); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 3);
    metaText(ctx, 'TIENERS DIE SPORTEN', 300, 220, C.text, 'left', 28); const base = 720; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(300, base); ctx.lineTo(1300, base); ctx.stroke();
    metaText(ctx, 'BLESSURES', 300, 280, C.text2, 'left', 22);
    SP9_staaf(ctx, 560, base, 220, 220, '#8A93A6', 'MINDER DAN 8 UUR', 1); SP9_staaf(ctx, 1040, base, 220, 220, '#8A93A6', '8 UUR OF MEER', 1);
    vraagteken(ctx, 1560, 560, 1, 220); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 3); SP9_antw(ctx, 'antwoord a: wie kort sliep, raakte vaker geblesseerd');
    const P = q.on('proefpersonen', 1, 0.5), Tr = q.on('verwerken', 1, 0.5);
    SP9_laag(ctx, 1 - P, () => { metaText(ctx, 'TIENERS DIE SPORTEN', 300, 290, C.text, 'left', 28); const base = 740; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 350); ctx.lineTo(300, base); ctx.lineTo(1300, base); ctx.stroke(); metaText(ctx, 'BLESSURES', 300, 330, C.text2, 'left', 22);
      const g = q.on('geblesseerd', 1, 1.0); SP9_staaf(ctx, 560, base, 220, lerp(220, 350, g), SP9_mix('#8A93A6', '#E07A5F', g), 'MINDER DAN 8 UUR', 1); SP9_staaf(ctx, 1040, base, 220, 220, '#8A93A6', '8 UUR OF MEER', 1);
      SP9_laag(ctx, g, () => { SP9_label(ctx, 'MEERDERE ONDERZOEKEN SAMEN', 1400, 450, 1, C.koraal); metaText(ctx, 'GAO E.A. 2019', 1400, 510, C.grain, 'left', 22); }); });
    SP9_laag(ctx, P * (1 - Tr), () => { SP9_studie(ctx, 160, 250, 1600, 500, ['164 PROEFPERSONEN', 'VERKOUDHEIDSVIRUS IN DE NEUS'], 'PRATHER E.A. 2015', 1);
      const r1 = q.on('korter', 1, 0.5), r2 = q.on('zeven', 1, 0.5);
      SP9_laag(ctx, r1, () => { metaText(ctx, 'MINDER DAN 6 UUR', 220, 450, C.koraal, 'left', 30); pijl(ctx, 720, 440, 960, 440, C.koraal, 1, 5, 20); text(ctx, 'vaker verkouden', 1000, 452, fTekst(44, 800), C.koraal, 'left'); });
      SP9_laag(ctx, r2, () => { metaText(ctx, 'MEER DAN 7 UUR', 220, 560, C.teal, 'left', 30); });
      SP9_laag(ctx, q.on('samenhang', 1, 0.4), () => SP9_label(ctx, 'ODDS RUIM 4× · BREDE MARGE · SAMENHANG', 220, 680, 1, C.text2, 'left', 24)); });
    SP9_laag(ctx, Tr, () => { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 3); persoon(ctx, 'zwemtrainer', 560, zit - 10, 480, { pose: 'wijs', kijk: 1, uit: Math.sin(t * 8) > -0.3 && t < q.at('zegt') + 0.3 ? 'praat' : 'neutraal', t });
      SP9_tablet(ctx, 820, 330, 300, 220, 1, (x, y, w, h) => { for (let i = 0; i < 4; i++) { roundRect(ctx, x + 30 + i * 55, y + h - 30 - 90, 36, 90, 4); shape(ctx, rgba(C.oker, 0.6), C.oker, 1.5); } });
      SP9_kaart(ctx, 1180, 260, 640, 210, 1, C.oker); text(ctx, 'Wat je niet verwerkt,', 1220, 340, fTitel(46), C.text, 'left'); text(ctx, 'is geen training.', 1220, 404, fTitel(46), C.text, 'left'); metaText(ctx, 'DE ZWEMTRAINER', 1220, 448, C.oker, 'left', 22);
      SP9_waterFront(ctx, wl, t); }); },

  // ---------- H4 ----------
  s15(ctx, t, q) { SP9_lokaal(ctx); SP9_spoel(ctx, 3 + ramp(t, 0.1, 0.9));
    const tafel = 640, tik = t > q.at('gespannen') ? t : 0;
    // klasgenoten en de zwemmer aan tafeltjes (vooraanzicht), de mentor surveilleert voorin
    persoon(ctx, 'visser', 1300, 820, 420, { kijk: -1, uit: 'neutraal', t });
    const lln = [['noor', 200], ['sam', 560], ['bilal', 900], ['yasmin', 1200]];
    for (const [id, x] of lln) { const zw = id === 'sam'; persoon(ctx, id, x, 820, 380, { outfit: 'school', pose: 'zit', stoel: true, tafel, kijk: zw ? 1 : (x < 600 ? 1 : -1), uit: zw && t > q.at('gespannen') - 0.3 ? 'bezorgd' : 'neutraal', t, hold: zw ? (c, hx, hy, an) => SP9_pen(c, hx, hy, an, tik) : null });
      SP9_tafel(ctx, x, tafel, 260); SP9_toetsblad(ctx, x, tafel - 4); }
    // stapel met een leeg blok (tijdens de vraag)
    const Q = q.on('Telt', 1, 0.5);
    SP9_stapel(ctx, 1400, SP9_SY, [SP9_blok('training'), SP9_blok('slaap'), SP9_blok('leeg', Q)], 1); },

  s17(ctx, t, q) { const D = q.on('Daarom', 1, 0.4), Sp = q.on('spanning', 1, 0.6), Mo = q.on('model', 1, 0.5);
    if (D < 1) SP9_laag(ctx, 1, () => { SP9_lokaal(ctx);
      persoon(ctx, 'visser', 1150, 820, 420, { kijk: -1, uit: 'neutraal', t }); persoon(ctx, 'sam', 560, 820, 380, { outfit: 'school', pose: 'zit', stoel: true, tafel: 640, kijk: 1, uit: 'bezorgd', t }); SP9_tafel(ctx, 560, 640, 260); SP9_toetsblad(ctx, 560, 636); });
    if (D > 0) SP9_laag(ctx, D, () => { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); persoon(ctx, 'zwemtrainer', 200, zit - 10, 430, { pose: 'wijs', kijk: 1, uit: 'neutraal', t });
      const vr = [q.on('sliep', 1, 0.4), q.on('energie', 1, 0.4), q.on('druk', 1, 0.4)];
      SP9_tablet(ctx, 400, 160, 920, 660, 1, (x, y, w, h) => SP9_ochtend(ctx, x, y, w, h, clamp((t - q.at('Vanaf')) / 3.5, 0, 1), { vragenA: vr }));
      SP9_waterFront(ctx, wl, t); SP9_meta(ctx, 'SOLIGARD E.A. 2016', 1320, 860, q.on('Sportartsen', 1, 0.4), C.grain, 'right', 22); });
    SP9_antw(ctx, 'antwoord b: spanning telt, korte nachten kosten herstel', 1 - D);
    SP9_spoel(ctx, 4);
    const blokken = [SP9_blok('training'), SP9_blok('slaap'), Sp < 0.5 ? SP9_blok('leeg') : SP9_blok('toets')];
    if (Sp > 0 && Sp < 1) blokken[2] = Object.assign(SP9_blok('toets'), { a: 1 });
    SP9_stapel(ctx, 1400, SP9_SY, blokken, 1, { titel: 1 - Mo });
    SP9_laag(ctx, Mo, () => { SP9_label(ctx, 'TOTALE BELASTING', 1400, 360, 1, C.goud, 'left', 28); metaText(ctx, 'ÉÉN HERSTEL · MODEL', 1400, 410, C.grain, 'left', 22); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 4);
    const Z = q.on('Zweden', 1, 0.8), Tb = q.on('tablet', 1, 0.5);
    SP9_laag(ctx, (1 - clamp(Z * 2, 0, 1)) * (1 - Tb), () => { SP9_studie(ctx, 160, 170, 1600, 640, ['UNIVERSITEIT · AMERIKAANS VOETBAL · 101 SPELERS', 'BLESSURES PER SOORT WEEK'], 'MANN E.A. 2016', 1); const base = 700, e = 120;
      SP9_staaf(ctx, 560, base, 220, e, '#8A93A6', 'GEWONE WEEK', ramp(t, 0.4, 0.5));
      const tw = q.on('toetsweken', 1, 0.8); SP9_staaf(ctx, 960, base, 220, e * 1.78 * ease(tw), C.koraal, 'TOETSWEEK', tw); SP9_laag(ctx, tw, () => metaText(ctx, 'ODDS BIJNA 2×', 960, base - e * 1.78 - 24, C.koraal, 'center', 24));
      const tk = q.on('gewone', 1, 0.8); SP9_staaf(ctx, 1360, base, 220, e * 3.65 * ease(tk), C.koraal, 'TRAININGSKAMP', tk); });
    SP9_laag(ctx, clamp(Z * 2 - 1, 0, 1) * (1 - Tb), () => { SP9_studie(ctx, 160, 170, 1600, 640, ['BIJNA 500 TIENERS · 15 TOT 19 JAAR · 16 SPORTEN · ZWEDEN', 'BLESSURERISICO'], 'VON ROSEN E.A. 2017', 1); const base = 700, e = 150;
      SP9_staaf(ctx, 700, base, 240, e, '#8A93A6', 'GEEN VERANDERING', 1); const r = q.on('ruim', 1, 0.8); SP9_staaf(ctx, 1220, base, 240, e * 2.25 * ease(r), C.koraal, ['MEER TRAINING', '+ MINDER SLAAP'], q.on('sliepen', 1, 0.4)); SP9_laag(ctx, r, () => metaText(ctx, 'RUIM 2×', 1220, base - e * 2.25 - 24, C.koraal, 'center', 26));
      SP9_laag(ctx, q.on('samenhang', 1, 0.4), () => SP9_label(ctx, 'SAMENHANG · GEEN BEWIJS VAN OORZAAK', 220, 330, 1, C.text2, 'left', 24)); });
    SP9_laag(ctx, Tb, () => { SP9_tablet(ctx, 160, 200, 760, 560, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, 1)); SP9_tablet(ctx, 1000, 200, 760, 560, 1, (x, y, w, h) => SP9_ochtend(ctx, x, y, w, h, 1, { vragen: false, kleur: [C.koraal, C.koraal, C.paars] }));
      SP9_laag(ctx, q.on('ochtendlijst', 1, 0.4), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; roundRect(ctx, 990, 190, 780, 580, 30); ctx.stroke(); }); }); },

  // ---------- H5 ----------
  s19(ctx, t, q) { const M = q.on('Topsport', 1, 0.5), Wv = q.on('Wat', 1, 0.5);
    bg(ctx, 'schema'); SP9_spoel(ctx, 4 + ramp(t, 0.1, 0.9));
    SP9_laag(ctx, 1 - M, () => { SP9_laptop(ctx, 200, 250, 700, 1, ramp(t, q.at('online'), 0.8)); SP9_klembord(ctx, 1080, 240, 640, 470, q.on('trainingsplan', 1, 0.5));
      SP9_laag(ctx, q.on('half', 1, 0.4), () => SP9_label(ctx, '2× 05:30', 1400, 790, 1, C.oker, 'center', 26));
      SP9_laag(ctx, q.on('niemand', 1, 0.5), () => { kruis(ctx, 990, 480, 26, 1, C.text2); metaText(ctx, 'LOS VAN ELKAAR', 990, 580, C.text2, 'center', 22); }); });
    SP9_laag(ctx, M, () => { const vl = 820; SP9_kamerMentor(ctx, vl); SP9_spoel(ctx, 5); const tafel = 640;
      roundRect(ctx, 520, tafel, 700, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(560, tafel + 22, 16, vl - tafel - 22); ctx.fillRect(1164, tafel + 22, 16, vl - tafel - 22);
      SP9_laag(ctx, q.on('mentor', 1, 0.3), () => persoon(ctx, 'visser', 420, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: 'neutraal', t }));
      persoon(ctx, 'sam', 1320, vl, 410, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: 'neutraal', t });
      // de twee roosters los naast elkaar op tafel
      SP9_laag(ctx, Wv, () => { SP9_rooster(ctx, 600, 420, 280, 210, 'toets', 1); SP9_rooster(ctx, 900, 420, 280, 210, 'training', 1); });
      const kk = [['TOPSPORT TALENTSCHOOL', "ZO'N 30 IN NEDERLAND", q.on('Talentschool', 1, 0.4), C.goud], ['TALENTSTATUS', 'VIA DE SPORTBOND', q.on('sportbond', 1, 0.4), C.text], ['TOPSPORTCOÖRDINATOR', '', q.on('topsportco', 1, 0.4), C.goud]];
      kk.forEach(([a1, a2, a, kl], i) => SP9_laag(ctx, a * (1 - Wv * 0.0), () => { const x = 560 + i * 0, y = 170 + i * 0; const bx = [440, 900, 1360][i]; SP9_kaart(ctx, bx, 160, 420, a2 ? 130 : 90, 1, kl); metaText(ctx, a1, bx + 20, 210, kl, 'left', 24); if (a2) metaText(ctx, a2, bx + 20, 254, C.text2, 'left', 22); })); }); },

  s21(ctx, t, q) { const Ik = q.on('Ik', 1, 0.4), Na = q.on('leggen', 1, 0.5); bg(ctx, 'schema'); SP9_spoel(ctx, 5);
    SP9_laag(ctx, 1 - Ik, () => { SP9_antw(ctx, 'antwoord a: samen met de trainer anders plannen');
      const sm = q.on('Toetsen', 1, 1.2); // roosters schuiven in elkaar
      SP9_laag(ctx, 1 - sm, () => { SP9_rooster(ctx, lerp(160, 260, sm), 280, 700, 480, 'toets', 1); SP9_rooster(ctx, lerp(1000, 900, sm), 280, 700, 480, 'training', 1); });
      SP9_week(ctx, 160, 250, 1000, 560, sm, { schuifT: ramp(t, q.at('moment') - 0.4, 1.0) });
      SP9_laag(ctx, q.on('examen', 1, 0.4), () => SP9_label(ctx, 'GESPREID EXAMEN · 2 SCHOOLJAREN', 1240, 360, 1, C.goud, 'left', 24));
      SP9_laag(ctx, q.on('ontheffing', 1, 0.4), () => SP9_label(ctx, 'ONTHEFFING LO', 1240, 460, 1, C.goud, 'left', 24));
      SP9_meta(ctx, 'DUO · EURYDICE · KNVB · 2026', 1240, 540, q.on('ontheffing', 1, 0.4), C.grain, 'left', 22);
      SP9_laag(ctx, q.on('stof', 1, 0.4), () => metaText(ctx, 'DE STOF BLIJFT', 1240, 640, C.text2, 'left', 24)); });
    SP9_laag(ctx, Ik, () => { const vl = 820, tafel = 640; SP9_kamerMentor(ctx, vl); SP9_spoel(ctx, 5);
      roundRect(ctx, 460, tafel, 700, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(500, tafel + 22, 16, vl - tafel - 22); ctx.fillRect(1104, tafel + 22, 16, vl - tafel - 22);
      const praat = t > q.at('Ik') && t < q.at('leggen') - 0.6 && Math.sin(t * 9) > -0.3;
      persoon(ctx, 'visser', 360, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: praat ? 'praat' : 'blij', t });
      SP9_laptopTrainer(ctx, 810, tafel, t, ramp(t, q.at('Ik'), 0.4), 1);
      persoon(ctx, 'sam', 1240, vl, 410, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: t > q.at('week') ? 'blij' : 'neutraal', t });
      SP9_laag(ctx, SP9_fase(t, q.at('kijk', 1), q.at('leggen'), 0.4), () => { SP9_kaart(ctx, 700, 170, 760, 150, 1, C.goud); text(ctx, 'Ik kijk naar je hele week.', 740, 262, fTitel(46), C.text, 'left'); });
      SP9_laag(ctx, Na, () => { SP9_week(ctx, 1340, 170, 500, 340, 1, { schuifT: 1, schuifW: ramp(t, q.at('schuift'), 1.2) });
        const k = ramp(t, q.at('schuift') + 0.4, 1.2); metaText(ctx, 'SLAAP NA DINSDAG', 1340, 560, C.teal, 'left', 22); roundRect(ctx, 1340, 580, 500 * lerp(0.55, 0.95, k), 34, 8); shape(ctx, rgba(C.teal, 0.75), C.teal, 2); }); }); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Daarom', 1, 0.6);
    SP9_spoel(ctx, 5, 1, { alles: true, iconen: true });
    const kk = [q.on('toetsen', 1, 0.4), q.on('nachten', 1, 0.4), q.on('klok', 1, 0.4)];
    SP9_laag(ctx, 1 - N, () => { SP9_stapel(ctx, 160, 820, [SP9_blok('training', 1, { t2: 'ZELFDE' }), SP9_blok('toets', kk[0]), SP9_blok('slaap', kk[1])], 1, { w: 460 });
      SP9_laag(ctx, kk[2], () => SP9_label(ctx, 'KLOK STAAT LATER', 660, 640, 1, C.teal, 'left', 24));
      const V = q.on('oorzaak', 1, 0.4); SP9_laag(ctx, V, () => { vraagteken(ctx, 1000, 420, 1, 120); SP9_label(ctx, 'ÉÉN GEVAL', 1000, 500, 1, C.koraal, 'center', 24); });
      const O = q.on('onderzoek', 1, 0.4); SP9_laag(ctx, O, () => { SP9_studie(ctx, 1220, 300, 600, 150, ['TOETSWEKEN · 101 SPELERS', 'ODDS BIJNA 2×'], 'MANN E.A. 2016', 1); SP9_studie(ctx, 1220, 480, 600, 150, ['MEER TRAINING + MINDER SLAAP', 'RUIM 2× · ZWEDEN'], 'VON ROSEN E.A. 2017', 1); SP9_meta(ctx, 'SAMENHANG', 1220, 680, 1, C.text2, 'left', 22); }); });
    SP9_laag(ctx, N, () => { metaText(ctx, 'DE NIEUWE WEEK', 160, 330, C.goud, 'left', 26); SP9_week(ctx, 160, 360, 900, 440, 1, { schuifT: 1, schuifW: 1 });
      SP9_stapel(ctx, 1180, 820, [SP9_blok('training', 1, { t2: '' }), SP9_blok('slaap', 1, { krimp: 0.45, t1: 'SLAAP' }), SP9_blok('toets', 1, { krimp: 0.6 })], 1, { w: 300, titelY: 560 });
      const p = ramp(t, q.at('naast') - 0.2, 1.0); SP9_laag(ctx, p, () => { pijl(ctx, 1560, 700, 1560 + 220 * ease(p), 460, C.teal, 1, 16, 40); metaText(ctx, 'HERSTEL', 1580, 760, C.teal, 'left', 28); }); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const vl = 760;
    persoon(ctx, 'visser', 300, vl, 420, { kijk: 1, uit: 'blij', t }); persoon(ctx, 'zwemtrainer', 640, vl, 430, { kijk: -1, uit: 'blij', t });
    SP9_label(ctx, 'TOPSPORTCOÖRDINATOR · OP SCHOOL', 300, 840, q.on('topsportco', 1, 0.4), C.goud, 'center', 22);
    SP9_label(ctx, 'ZWEMTRAINER', 700, 220, q.on('zwemtrainer', 1, 0.4), C.oker, 'center', 22);
    const I = q.on('Inspanningsfys', 1, 0.5); SP9_laag(ctx, I, () => { SP9_kaart(ctx, 960, 200, 860, 220, 1, C.teal); metaText(ctx, 'INSPANNINGSFYSIOLOOG', 1000, 262, C.teal, 'left', 28); metaText(ctx, 'PERFORMANCE ANALYST', 1000, 310, C.teal, 'left', 28);
      text(ctx, 'meten de belasting van sporters', 1000, 380, fTekst(34, 700), C.text, 'left'); });
    const O = q.on('bewegingswet', 1, 0.5); SP9_laag(ctx, O, () => { SP9_kaart(ctx, 960, 470, 860, 260, 1, C.goud); metaText(ctx, 'WO', 1000, 530, C.goud, 'left', 26); text(ctx, 'Bewegingswetenschappen', 1000, 600, fTitel(48), C.text, 'left');
      metaText(ctx, 'BV. AMSTERDAM (VU) · GRONINGEN (RUG)', 1000, 660, C.text2, 'left', 24); metaText(ctx, '2026', 1790, 710, C.grain, 'right', 22); }); }
});

// Wat word jij? · Sport en topsport 7 · Na de race — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer (outfit 'zwem' tot s06, daarna 'school' = hoodie: er is geen trainingsjack in de cast),
// de sportpsycholoog ('sportpsycholoog'), teamgenoot alleen als silhouet (afzender), trainer 'zwemtrainer' en mentor (castdocent, naamloos) alleen in s19.
// Tijdlijn bovenin, emotiemeter (paars, label 'MODEL · HOE STERK VOELT HET') rechts naast de zwemmer.

// meter rechts naast de schouder: r = return van persoon()
function meterBij(ctx, r, niv, a = 1, o = {}) { if (!r || !r.hoofd) return; const hh = r.hoofd.r / 0.55; SP7_meter(ctx, r.hoofd.x + (o.dx || hh * 2.6), (o.y != null ? o.y : r.hoofd.y - hh * 0.4), niv, a, o); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); const y0 = 600; ctx.fillStyle = SP7.water; ctx.fillRect(1060, y0, 860, 260); ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 1060; x <= 1920; x += 12) { const yy = y0 + Math.sin(x / 60 + t * 1.5) * 3; x === 1060 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
    const n = Math.floor(clamp((t - 0.3) / 2.2, 0, 1) * 24); for (let i = 0; i < n; i++) circ(ctx, 1900 - i * 34, y0 + 4, 10, (i % 6 < 3) ? '#C9454A' : '#E8E2D4');
    ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(1060, 0, 860, 875); ctx.clip(); const L = 300; zwemmer(ctx, 'sam', 1180 + ((t * 70) % 760), y0 + 0.12 * L, L, { slag: 'crawl', t }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const B = t >= q.at('zwemmer') - 0.3; // cut van tribune naar bad
    if (!B) { SP7_tribune(ctx); const r = persoon(ctx, 'sam', 560, 820, 430, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, uit: 'ernstig', t, hold: (c, x, y, an) => SP7_stift(c, x, y, an) });
      zoomCircle(ctx, 1240, 440, 280, r.handR ? r.handR.x : 600, r.handR ? r.handR.y : 640, 'OP DE RUG VAN ZIJN HAND', 1, () => { bg(ctx, 'schema'); SP7_hand(ctx, 1230, 460, 1.0, [['2:01,50', clamp((t - 0.3) / 1.6, 0, 1), SP7.stift, 0]]); });
      return; }
    const muur = 300, wl = 600, tik = q.on('tikt', 1, 0.35), kijkt = q.on('kijkt', 1, 0.5), Vr = q.on('Moet', 1, 0.5);
    SP7_badZij(ctx, muur, wl, t); SP7_tijdlijn(ctx, lerp(0, 6, fase(t, q.at('volgen'), q.at('lang') + 0.9, 1.4)), 1, { alleenActief: t > q.at('volgen') && t < q.at('lang') + 0.9 });
    SP7_bord(ctx, 140, 150, 560, 1, q.on('bord', 1, 0.4), '2:02,71', q.on('Ruim', 1, 0.4), '+1,21');
    const h = 520, hh = h * 1.04 / 6.1, y = wl - 18 + h * 1.04 - hh * 1.42;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
    const r = persoon(ctx, 'sam', 530, y, h, { outfit: 'zwem', zij: true, kijk: -1, vrij: true, bril: 'ogen', uit: kijkt > 0.5 ? 'ernstig' : 'neutraal', t, arm: [lerp(2.9, 2.15, tik), lerp(0.6, 0.25, tik)], armVer: [0.3, 0.6], knik: -0.35 * kijkt }); ctx.restore();
    SP7_waterVoor(ctx, muur, wl, t, tik * (1 - ramp(t, q.at('tikt') + 1.5, 1.5)), muur + 10);
    if (r.hoofd) laag(ctx, q.on('gloeit', 1, 0.8) * 0.45, () => { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.ellipse(r.hoofd.x - r.hoofd.r * 0.25, r.hoofd.y + r.hoofd.r * 0.3, r.hoofd.r * 0.3, r.hoofd.r * 0.18, 0, 0, 6.283); ctx.fill(); });
    const niv = niveau(1, [[q.on('limiet', 1, 0.8), 6], [q.on('gloeit', 1, 0.8), 9]]); SP7_meter(ctx, 790, 300, niv, 1);
    laag(ctx, q.on('keel', 1, 0.4) * (1 - Vr), () => metaKaart(ctx, 'KEEL DICHT', 330, 450, 1, C.koraal, 'center'));
    laag(ctx, Vr, () => { kaart(ctx, 1000, 300, 800, 300, 1, C.goud); text(ctx, 'Wegdrukken', 1060, 400, fTitel(64), C.text, 'left'); text(ctx, 'of er iets mee?', 1060, 480, fTitel(64), C.text, 'left'); metaText(ctx, 'WAT DENK JE?', 1060, 560, C.goud, 'left', 28); }); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const zit = 640, wl = 750; SP7_badrand(ctx, zit, wl, t); SP7_tijdlijn(ctx, 0);
    for (const [x, id, k] of [[1380, 'bilal', -1], [1520, 'daan', 1], [1650, 'noor', -1]]) SP7_sil(ctx, SP7.sil, (c) => persoon(c, id, x, zit - 40, 250, { outfit: 'sport', kijk: k }));
    const bril = t < q.at('reactie') ? 'ogen' : 'muts', Wv = q.on('Wat', 1, 0.4);
    const r = persoon(ctx, 'sam', 760, zit + 120, 470, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, bril, uit: t > q.at('kaken') ? 'ernstig' : 'neutraal', t });
    SP7_waterFront(ctx, wl, t);
    meterBij(ctx, r, 9, 1, { info: q.on('informatie', 1, 0.5) });
    const M = fase(t, q.at('verbergt') - 0.3, q.at('psycholoog'), 0.5);
    laag(ctx, M, () => { SP7_masker(ctx, 470, 400, 1.1); metaKaart(ctx, 'VAN BUITEN MINDER', 470, 580, 1, C.text2, 'center'); });
    laag(ctx, fase(t, q.at('voelt'), q.at('psycholoog') + 0.3, 0.5), () => metaKaart(ctx, 'VAN BINNEN NIET MINDER', 1200, 300, 1, C.paars, 'left'));
    laag(ctx, q.on('Kross', 1, 0.5) * (1 - Wv), () => { kaart(ctx, 1240, 200, 560, 150, 1, C.line); metaText(ctx, 'SHIFT · ETHAN KROSS · 2025', 1270, 256, C.grain, 'left', 28); text(ctx, 'emoties = informatie', 1270, 320, fTekst(40, 700), C.text, 'left'); });
    laag(ctx, q.on('informatie', 1, 0.4) * (1 - Wv), () => metaKaart(ctx, 'INFORMATIE', 1200, 300, 1, C.teal, 'left'));
    const hx = r.hoofd ? r.hoofd.x : 760, hy = r.hoofd ? r.hoofd.y : 420;
    [0, 1, 2].forEach(i => SP7_wolk(ctx, 260 + (i % 2) * 40, 190 + i * 150, 230, 110, '', ramp(t, q.at('Wat') + 0.15 + i * 0.45, 0.4), hx - 60, hy)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 0); antwoord(ctx, 'antwoord b: wat hij verwachtte en wat hij belangrijk vindt', 1);
    const kant = 0.16 * q.on('slechter', 1, 1.0); SP7_weegschaal(ctx, 560, 330, kant, 1, { hlL: q.on('hoopte', 1, 0.4) * (1 - q.on('Teleurstelling', 2, 0.4)) });
    metaA(ctx, 'ZEELENBERG E.A. 2000', 560, 260, q.on('uitkomst', 1, 0.4), C.grain, 'center');
    laag(ctx, q.on('belangrijk', 1, 0.4) * (1 - q.on('duw', 1, 0.4)), () => metaKaart(ctx, 'WAT HIJ BELANGRIJK VINDT', 560, 840 - 40, 1, C.goud, 'center'));
    const r = persoon(ctx, 'sam', 1230, 840, 400, { outfit: 'zwem', pose: 'zit', zitHoogte: 110, uit: 'ernstig', t });
    SP7_handdoek(ctx, r, 1);
    const zak = q.on('zakken', 1, 1.2); meterBij(ctx, r, niveau(9, [[zak, 8]]), 1);
    const P = fase(t, q.at('duw') - 0.2, q.at('informatie') + 0.4, 0.5), S = q.on('volgen', 1, 0.5);
    laag(ctx, P, () => { pijl(ctx, 1330, 380, 1690, 380, C.koraal, 1, 6, 24); metaText(ctx, 'STOP ERMEE', 1500, 350, C.koraal, 'center', 28); SP7_deur(ctx, 1790, 470, 1);
      if (S > 0) { ctx.save(); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1360, 420); ctx.lineTo(1360 + 300 * S, 330); ctx.stroke(); ctx.restore(); } });
    const sl = q.on('zakken', 1, 0.5), st = q.on('sterk', 1, 0.8), du = q.on('lang', 2, 0.8);
    SP7_schuif(ctx, 1640, 330, 230, lerp(0.9, 0.55, st), 'STERKTE', sl * (1 - P)); SP7_schuif(ctx, 1790, 330, 230, lerp(0.9, 0.45, du), 'DUUR', sl * (1 - P));
    laag(ctx, q.on('bijsturen', 1, 0.5), () => metaKaart(ctx, 'BIJSTUREN', 1715, 290, 1, C.paars, 'center')); },

  // ---------- H2 ----------
  s06(ctx, t, q) { const zit = 640, wl = 750; SP7_badrand(ctx, zit, wl, t, { bord: 'UITZWEMBAD' }); SP7_tijdlijn(ctx, 1);
    const mu = q.on('muziek', 1, 0.6), nod = mu * Math.sin(t * 5.2) * 0.5 + 0.5;
    const r = persoon(ctx, 'sam', 460, zit + 120 + nod * 4, 470, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, uit: mu > 0.5 ? 'neutraal' : 'ernstig', t });
    SP7_handdoek(ctx, r, 1); SP7_koptelefoon(ctx, r, mu); SP7_waterFront(ctx, wl, t);
    if (r.hoofd) SP7_noten(ctx, r.hoofd.x - 220, r.hoofd.y + 200, t, mu);
    meterBij(ctx, r, niveau(8, [[ramp(t, q.at('muziek'), 2.5), 7]]), 1);
    laag(ctx, q.on('zintuigen', 1, 0.4) * (1 - q.on('buiten', 1, 0.4)), () => metaKaart(ctx, 'GEREEDSCHAP: ZINTUIGEN', 160, 250, 1, C.teal, 'left'));
    metaA(ctx, 'SAARIKALLIO 2007', 160, 310, q.on('jongeren', 1, 0.4) * (1 - q.on('buiten', 1, 0.4)));
    const K = q.on('buiten', 1, 0.6); SP7_wandelKader(ctx, 1000, 150, 820, 380, t, K);
    laag(ctx, q.on('anderhalf', 1, 0.4), () => { klokje(ctx, 1410, 240, 40, ramp(t, q.at('anderhalf'), 2.2) * 0.75, 1); metaKaart(ctx, '1,5 UUR', 1470, 262, 1, C.text, 'left'); });
    const Ma = q.on('maalden', 1, 0.5), gr = q.on('minder', 1, 1.0), st = q.on('stad', 1, 0.5);
    laag(ctx, Ma, () => { kaart(ctx, 1000, 590, 820, 282, 1, C.line); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 800); ctx.lineTo(1740, 800); ctx.stroke(); metaText(ctx, 'MALEN NA DE WANDELING', 1040, 636, C.paars, 'left', 28); });
    SP7_staaf(ctx, 1210, 800, 120, lerp(100, 40, gr), C.paars, 'GROEN', Ma); SP7_staaf(ctx, 1620, 800, 120, 100, C.paars, 'STAD', Ma);
    laag(ctx, st, () => metaKaart(ctx, 'GEEN VERSCHIL', 1620, 688, 1, C.text2, 'center'));
    metaA(ctx, 'BRATMAN E.A. 2015', 1810, 570, K, C.grain, 'right'); },

  s07(ctx, t, q) { SP7_kamer(ctx, 800, { raam: 1450 }); SP7_tijdlijn(ctx, 2);
    SP7_bank(ctx, 520, 440, 640, 800); const r = persoon(ctx, 'sam', 740, 800, 430, { outfit: 'school', pose: 'zit', zitHoogte: 160, uit: 'neutraal', t }); SP7_bankVoor(ctx, 520, 440, 640);
    SP7_laptop(ctx, 330, 660, 0.5 + 0.5 * Math.sin(t * 3.1) * Math.sin(t * 1.7));
    meterBij(ctx, r, 7, 1);
    SP7_tas(ctx, 1600, 800, 1, { morgen: q.on('Morgen', 1, 0.5) });
    vraagteken(ctx, 1600, 545, q.on('wegvluchten', 1, 0.4), 110); },

  s09(ctx, t, q) { SP7_kamer(ctx, 800, { raam: 1450 }); SP7_tijdlijn(ctx, 2); antwoord(ctx, 'antwoord a: even iets anders doen mag', 1);
    SP7_bank(ctx, 520, 440, 640, 800); const r = persoon(ctx, 'sam', 740, 800, 430, { outfit: 'school', pose: 'zit', zitHoogte: 160, uit: 'neutraal', t }); SP7_bankVoor(ctx, 520, 440, 640);
    SP7_laptop(ctx, 330, 660, 0.5 + 0.5 * Math.sin(t * 3.1) * Math.sin(t * 1.7));
    meterBij(ctx, r, niveau(7, [[q.on('eraf', 1, 1.5), 5]]), 1);
    metaA(ctx, 'LYUBOMIRSKY E.A. 1998', 120, 230, q.on('proeven', 1, 0.4));
    const G = fase(t, q.at('malen'), q.at('Afleiding') + 0.6, 0.5); SP7_meter(ctx, 1250, 300, niveau(5, [[q.on('somberder', 1, 1.2), 8]]), G, { grijs: true, labelTxt: 'BLEEF MALEN' });
    const sl = q.on('nooit', 1, 0.4), op = q.on('leer', 1, 0.6);
    SP7_tas(ctx, 1600, 800, 1, { morgen: 1, slot: sl, open: op }); },

  // ---------- H3 ----------
  s10(ctx, t, q) { SP7_kamer(ctx, 800, { raam: -1 }); SP7_tijdlijn(ctx, 3); const Ps = q.on('Psychologen', 1, 0.6);
    SP7_bedAchter(ctx, 200, 640, 620); const r = persoon(ctx, 'sam', 440, 760, 420, { outfit: 'school', pose: 'zit', zitHoogte: 140, uit: t > q.at('groter') ? 'bezorgd' : 'neutraal', t, hold: (c, x, y, an) => SP7_telefoonHand(c, x, y, an) }); SP7_deken(ctx, 200, 640, 650, 800);
    const gr = q.on('groter', 1, 1.2); meterBij(ctx, r, niveau(5, [[gr, 8]]), 1, { rand: t > q.at('groter') });
    const b = [['wat een rotrace', 'ander', q.on('rotrace', 1, 0.3)], ['ja echt', 'zelf', ramp(t, q.at('rotrace') + 0.8, 0.3)], ['die limiet is gewoon te scherp', 'ander', q.on('limiet', 1, 0.3)], ['en die keerpuntrechter…', 'ander', q.on('appen', 1, 0.3)], ['precies', 'zelf', q.on('door', 1, 0.3)]];
    laag(ctx, 1 - Ps, () => { SP7_telefoon(ctx, 1000, 150, 560, 700, b, q.on('appt', 1, 0.5)); SP7_klokDigit(ctx, 1730, 300, t < q.at('elf') ? '21:00' : '23:00', q.on('appt', 1, 0.5)); });
    laag(ctx, Ps, () => { kaart(ctx, 1000, 170, 800, 170, 1, C.koraal); text(ctx, 'Co-ruminatie', 1040, 240, fTitel(56), C.text, 'left'); metaText(ctx, 'SAMEN BLIJVEN MALEN', 1040, 300, C.koraal, 'left', 28);
      metaA(ctx, 'ROSE E.A. 2007', 1800, 380, q.on('onderzoek', 1, 0.4), C.grain, 'right');
      laag(ctx, q.on('hechtere', 1, 0.4), () => { SP7_hartje(ctx, 1060, 470, 1.6, C.groen); text(ctx, 'hechtere vriendschap', 1110, 484, fTekst(40, 700), C.groen, 'left'); });
      const M = q.on('meisjes', 1, 0.8); laag(ctx, M, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1150, 790); ctx.lineTo(1650, 790); ctx.stroke(); metaText(ctx, 'MEER SOMBER EN ANGSTIG', 1400, 580, C.koraal, 'center', 28); });
      SP7_staaf(ctx, 1280, 790, 120, 150 * M, C.koraal, 'MEISJES', M); SP7_staaf(ctx, 1520, 790, 120, 30 * M, C.koraal, 'JONGENS', M); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 3); const D = q.on('Daarna', 1, 0.3);
    laag(ctx, t < q.at('Daarna') ? 1 : 0, () => { persoon(ctx, 'lotte', 600, 800, 420, { zij: true, kijk: 1, pose: 'zit', stoel: true, uit: q.on('naar', 1) > 0.5 ? 'bezorgd' : 'neutraal', t });
      roundRect(ctx, 900, 300, 760, 440, 16); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, 930, 330, 700, 380, 8); shape(ctx, '#2A3446', null);
      metaText(ctx, 'NAAR FILMPJE', 1280, 532, C.text2, 'center', 28); metaA(ctx, 'PROEF MET STUDENTEN', 900, 260, q.on('proef', 1, 0.4)); });
    laag(ctx, D, () => { const pan = (x, lab, la, friend) => { paneel(ctx, x, 180, 820, 600, '', 1);
        const rS = persoon(ctx, 'lotte', x + 300, 700, 380, { pose: 'zit', stoel: true, uit: 'bezorgd', t });
        if (friend === 'mee') persoon(ctx, 'yasmin', x + 540, 700, 380, { pose: 'zit', stoel: true, uit: 'bezorgd', t, handOpHand: rS.handL ? { x: rS.handL.x, y: rS.handL.y } : null });
        else { const rD = persoon(ctx, 'daan', x + 540, 700, 380, { pose: 'zit', stoel: true, uit: 'praat', t }); const fl = Math.cos(t * 0.9), hx = (rS.schoot ? (rS.schoot.x + (rD.schoot ? rD.schoot.x : x + 540)) / 2 : x + 420), hy = (rD.schoot ? rD.schoot.y : 560) - 70;
          ctx.save(); ctx.translate(hx, hy); ctx.scale(Math.max(0.3, Math.abs(fl)), 1); roundRect(ctx, -40, -54, 80, 108, 8); shape(ctx, fl > 0 ? '#F2F2EE' : C.teal, '#9AA3B2', 2); ctx.restore(); }
        laag(ctx, la, () => text(ctx, lab, x + 410, 760, fTekst(44, 800), C.text, 'center'));
        vraagteken(ctx, x + 760, 290, q.on('welke', 2, 0.4), 90); };
      pan(140, 'Meeleven', q.on('mee', 1, 0.4), 'mee'); pan(960, 'Anders bekijken', q.on('bekijken', 1, 0.4), 'anders'); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 3); antwoord(ctx, 'antwoord c: na de vriend die hielp anders te kijken', 1);
    const base = 760; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, base); ctx.lineTo(1000, base); ctx.stroke();
    metaText(ctx, 'VAN SLAG, 2 DAGEN LATER', 600, 290, C.paars, 'center', 28); metaA(ctx, 'NILS & RIMÉ 2012', 600, 250, 1, C.grain, 'center');
    const m = q.on('bleven', 1, 1.0), an = q.on('hielp', 1, 1.0); SP7_staaf(ctx, 400, base, 180, 360 * ramp(t, 0.6, 1.2) * (0.6 + 0.4 * m), C.paars, 'MEELEVEN', 1); SP7_staaf(ctx, 800, base, 180, lerp(216, 110, an) * ramp(t, 0.6, 1.2), C.paars, 'ANDERS BEKIJKEN', 1);
    laag(ctx, q.on('alleen', 1, 0.4), () => { SP7_hartje(ctx, 560, 400, 1.6, C.koraal); metaText(ctx, 'MINDER ALLEEN', 600, 414, C.koraal, 'left', 28); });
    const K = q.on('Kross', 1, 0.3); laag(ctx, K, () => { paneel(ctx, 1130, 260, 660, 520, '', 1);
      const rS = persoon(ctx, 'lotte', 1380, 640, 300, { pose: 'zit', stoel: true, uit: 'blij', t });
      persoon(ctx, 'yasmin', 1230, 640, 300, { pose: 'zit', stoel: true, uit: 'blij', t }); const rD = persoon(ctx, 'daan', 1580, 640, 300, { pose: 'zit', stoel: true, uit: 'praat', t }); if (rD.schoot) { roundRect(ctx, rD.schoot.x - 110, rD.schoot.y - 120, 60, 80, 6); shape(ctx, C.teal, '#9AA3B2', 2); }
      metaText(ctx, 'ADVIES KROSS', 1460, 320, C.goud, 'center', 28); text(ctx, 'steun + een nieuwe blik', 1460, 720, fTekst(40, 800), C.text, 'center'); }); },

  // ---------- H4 ----------
  s14(ctx, t, q) { const vl = 820; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 4);
    const tafel = 640; SP7_tafeltje(ctx, 570, tafel, vl);
    const praat = (t > q.at('Wat', 2) && t < q.at('Onder')) || (t > q.at('Dat', 2) && t < q.at('Welk'));
    const rP = persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: praat ? 'praat' : 'neutraal', t });
    const af = q.on('afstand', 1, 0.8) * (1 - q.on('ingestort', 1, 0.6));
    const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel: af > 0.5 ? null : tafel, leun: -10 * af, uit: t > q.at('Onder') && t < q.at('zegt') + 0.6 ? 'praat' : 'neutraal', t });
    SP7_blok(ctx, 470, tafel - 10, -0.2);
    meterBij(ctx, rS, niveau(6, [[q.on('dempt', 1, 1.2), 5]]), 1, { dx: 170 });
    laag(ctx, fase(t, q.at('helpt'), q.at('leggen'), 0.4), () => { ['DRUK', 'TEGENVALLERS', 'DOELEN'].forEach((s2, i) => metaKaart(ctx, s2, 1240, 220 + i * 80, ramp(t, q.at(['druk', 'tegenvallers', 'doelen'][i]), 0.3), C.text, 'left')); });
    const V = q.on('splittijden', 1, 0.5) * (1 - q.on('prestatiedoel', 1, 0.5));
    SP7_verslag(ctx, 1200 + 40 * af, 150, 640, ['28,40', '30,10', '31,60', '32,61'], V, { snel: q.on('snel', 1, 0.6), laatste: q.on('ingestort', 1, 0.6), ring: q.on('ingestort', 1, 0.8) });
    laag(ctx, af * V, () => metaKaart(ctx, 'MET AFSTAND', 1840, 400, 1, C.teal, 'right'));
    SP7_tablet(ctx, 1240, 450, 560, 330, t, q.on('video', 1, 0.5) * (1 - q.on('Wat', 2, 0.4)));
    laag(ctx, fase(t, q.at('Onder') - 0.2, q.at('uitkomstdoel'), 0.4), () => metaKaart(ctx, 'ONDER DE LIMIET', 1260, 470, 1, C.goud, 'left'));
    SP7_treden(ctx, 1220, 260, 600, [q.on('uitkomstdoel', 1, 0.4), q.on('prestatiedoel', 1, 0.4), q.on('procesdoel', 1, 0.4)], { vul: [0, 1, 0], vraag: q.on('Welk', 1, 0.4) }); },

  s16(ctx, t, q) { const vl = 820; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 4); antwoord(ctx, 'antwoord b: bij elk keerpunt vijf dolfijnslagen', 1);
    const tafel = 640; SP7_tafeltje(ctx, 570, tafel, vl); const jij = fase(t, q.at('Jij'), q.at('Zijn') + 0.3, 0.3);
    persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: jij > 0.5 && Math.sin(t * 9) > -0.2 ? 'praat' : 'neutraal', t });
    const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: t > q.at('plan') ? 'blij' : 'neutraal', t }); SP7_blok(ctx, 470, tafel - 10, -0.2);
    meterBij(ctx, rS, niveau(5, [[q.on('plan', 1, 1.4), 4]]), 1, { dx: 170 });
    const PL = q.on('plan', 1, 0.6), weg = q.on('Jij', 1, 0.5);
    const ex = [['ANDEREN', q.on('anderen', 1, 0.4)], ['JE VORM', q.on('vorm', 1, 0.4)], ['KIES JE ZELF', q.on('kies', 1, 0.4), C.groen]];
    laag(ctx, 1 - PL, () => { SP7_treden(ctx, 1220, 470, 600, [1, 1, 1], { vul: [0, 1 - weg, 0], hl: [0, 0, q.on('kies', 1, 0.5)], extra: ex, weg: [0, weg, 0] });
      laag(ctx, weg, () => metaKaart(ctx, 'ALLEEN EEN TIJD', 1520, 638, 1, C.koraal, 'center')); });
    const E = q.on('overzicht', 1, 0.5); laag(ctx, E, () => { metaText(ctx, 'EFFECT OP PRESTATIE', 1220, 226, C.grain, 'left', 28);
      [['PROCES', 1.36, 'grootste'], ['PRESTATIE', 0.44, ''], ['UITKOMST', 0.09, 'kleinste']].forEach(([l, d, k], i) => { const yy = 248 + i * 46; metaText(ctx, l, 1400, yy + 28, C.text2, 'right', 28); roundRect(ctx, 1420, yy, Math.max(8, 380 * d / 1.36 * ramp(t, q.at('overzicht') + 0.4 + i * 0.25, 0.8)), 34, 8); shape(ctx, rgba(C.goud, 0.7), C.goud, 1.5); }); });
    metaA(ctx, 'OVERZICHT 27 STUDIES', 1220, 412, E); metaA(ctx, 'WILLIAMSON E.A. 2022', 1220, 446, E);
    laag(ctx, PL, () => { kaart(ctx, 1220, 480, 600, 330, 1, C.goud, rgba(C.goud, 0.12 + 0.18 * ramp(t, q.at('plan') + 0.5, 1.5))); metaText(ctx, 'PLAN', 1260, 540, C.goud, 'left', 28);
      text(ctx, 'eerste 100 m rustiger', 1260, 620, fTekst(44, 800), C.text, 'left'); laag(ctx, q.on('keerpunt', 1, 0.4), () => { text(ctx, 'elk keerpunt', 1260, 700, fTekst(44, 800), C.text, 'left'); text(ctx, '5 dolfijnslagen', 1260, 760, fTekst(44, 800), C.text, 'left'); }); }); },

  // ---------- H5 ----------
  s17(ctx, t, q) { const R = q.on('Waarom', 1, 0.3), O = q.on('Onderzoekers', 1, 0.3);
    if (R < 1) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); laag(ctx, 1 - R, () => { SP7_rooster(ctx, 260, 160, 1400, 560, 1); laag(ctx, q.on('toetsen', 1, 0.4), () => metaKaart(ctx, 'EN OOK NOG TOETSEN', 1660, 800, 1, C.oker, 'right')); }); }
    if (R > 0 && t < q.at('Onderzoekers')) laag(ctx, R, () => { const vl = 820, tafel = 640; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 5); SP7_tafeltje(ctx, 570, tafel, vl);
      const neer = q.on('vraagt', 1, 0.6); const rP = persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: t < q.at('vraagt') ? 'praat' : 'neutraal', t });
      SP7_blok(ctx, lerp(rP.handR ? rP.handR.x : 420, 470, neer), lerp(rP.handR ? rP.handR.y - 40 : 560, tafel - 10, neer), -0.2);
      const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: 'denkt', t }); meterBij(ctx, rS, 4, 1, { dx: 170 });
      if (rP.hoofd) SP7_wolk(ctx, 1020, 260, 420, 150, 'Waarom zwem jij?', q.on('Waarom', 1, 0.5), rS.hoofd.x + 40, rS.hoofd.y - 30, 40); });
    if (O > 0) laag(ctx, O, () => { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); sp7Groepen(ctx, t, q, { mk: clamp((t - q.at('jaar')) / 2.5, 0, 1) * 1, vraag: q.on('Wie', 1, 0.4) }); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); const N = q.on('plant', 1, 0.3);
    laag(ctx, t < q.at('plant') ? 1 : 0, () => { antwoord(ctx, 'antwoord a: wie zwom omdat hij het zelf wilde', 1);
      sp7Groepen(ctx, t, q, { mk: 2, weg: q.on('stopte', 1, 1.6), talent: 1 - q.on('Zwemmers', 1, 0.6), zelfweg: q.on('vol', 1, 1.0) });
      metaA(ctx, 'PELLETIER E.A. 2001 · CANADA', 1800, 160, q.on('Zwemmers', 1, 0.4), C.grain, 'right');
      const T = q.on('meebeslissen', 1, 0.3); laag(ctx, T, () => { SP7_sil(ctx, SP7.silL, (c) => persoon(c, 'zwemtrainer', 1500, 640, 300, { pose: 'wijs', kijk: -1 }));
        for (const [dx, k] of [[-120, C.teal], [-40, C.goud]]) { roundRect(ctx, 1500 + dx - 30, 420, 60, 84, 8); shape(ctx, rgba(k, 0.6), k, 2); }
        for (let i = 0; i < 3; i++) SP7_telpop(ctx, 1290 + i * 44, 640, 110, '#8FA8C8');
        metaText(ctx, 'MEEBESLISSEN', 1460, 700, C.goud, 'center', 28); metaText(ctx, 'SAMENHANG, GEEN PROEF', 1460, 740, C.text2, 'center', 28); }); });
    laag(ctx, N, () => { SP7_rooster(ctx, 820, 170, 960, 460, 1, { vrij: 2, vrijA: q.on('week', 1, 0.8), legenda: false });
      persoon(ctx, 'visser', 300, 820, 420, { uit: 'blij', kijk: 1, t }); persoon(ctx, 'sam', 500, 820, 430, { outfit: 'school', uit: 'blij', pose: 'wijs', kijk: 1, t }); persoon(ctx, 'zwemtrainer', 700, 820, 430, { uit: 'blij', kijk: -1, t });
      metaText(ctx, 'MENTOR', 300, 860, C.text2, 'center', 28); metaText(ctx, 'TRAINER', 700, 860, C.text2, 'center', 28); }); },

  // ---------- H6 ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 6); const R = q.on('Dan', 1, 0.3), Hd = q.on('hand', 1, 0.4);
    laag(ctx, t < q.at('Dan') ? 1 : 0, () => { const r = persoon(ctx, 'sam', 420, 820, 440, { outfit: 'school', uit: 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y, an) => SP7_telefoonHand(c, x, y, an) }); meterBij(ctx, r, 4, 1);
      roundRect(ctx, 880, 170, 520, 640, 46); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, 898, 188, 484, 604, 32); shape(ctx, '#1C2638', null); metaText(ctx, 'NA EEN TEGENVALLER', 1140, 250, C.text2, 'center', 28);
      [['MEELEVEN', 'noor', q.on('meeleeft', 1, 0.4)], ['MEEDENKEN', 'daan', q.on('meedenkt', 1, 0.4)]].forEach(([l, id, a], i) => laag(ctx, a, () => { const yy = 330 + i * 190; roundRect(ctx, 930, yy, 420, 150, 20); shape(ctx, '#25324A', null);
        SP7_sil(ctx, SP7.silL, (c) => persoon(c, id, 1010, yy + 210, 170, {})); text(ctx, l, 1090, yy + 92, fTekst(40, 800), C.text, 'left'); })); });
    laag(ctx, R * (1 - Hd), () => { const x0 = 160, x1 = 1460, by = 330, bh = 220; SP7_baanBoven(ctx, x0, x1, by, bh);
      const t0 = q.at('race'), lenT = (q.at('Bijna') - t0) / 4, u = clamp((t - t0) / lenT, 0, 4), k = Math.min(3, Math.floor(u)), f = u - k, dir = k % 2 ? -1 : 1, mx = x0 + 110, Mx = x1 - 110, xx = dir > 0 ? lerp(mx, Mx, f) : lerp(Mx, mx, f);
      SP7_bovenZwemmer(ctx, xx, by + bh / 2 + 40, 170, u >= 4 ? 1 : dir, t);
      const splits = ['29,30', '30,20', '30,70', '31,63'];
      splits.forEach((s2, i) => { const a = ramp(u, i + 1, 0.05) || (u >= i + 1 ? 1 : 0); laag(ctx, u >= i + 1 ? 1 : 0, () => { const cx = 260 + i * 260; text(ctx, s2, cx, 260, fMeta(44), i === 3 ? mixKl('#F2F2EE', '#E07A5F', q.on('laatste', 1, 0.6)) : C.text, 'center'); metaText(ctx, ((i + 1) * 50) + ' M', cx, 210, C.text2, 'center', 28);
          if (i === 3) laag(ctx, q.on('laatste', 1, 0.6), () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, 246, 100, 40, 0, 0, 6.283); ctx.stroke(); }); }); });
      for (let i = 1; i <= 3; i++) laag(ctx, u >= i ? 1 : 0, () => { const wx = i % 2 ? x1 - 40 : x0 + 40; vink_(ctx, wx, by + bh + 70, 22, 1, C.goud); metaText(ctx, 'PROCES', wx, by + bh + 130, C.goud, 'center', 28); });
      laag(ctx, u >= 1 ? 1 : 0, () => metaA(ctx, 'RUSTIGER BEGIN', 260, 160 + 0, 1, C.goud, 'center'));
      const D = fase(t, q.at('keerpunt'), q.at('Bijna') + 0.4, 0.4); laag(ctx, D, () => { paneel(ctx, 520, 600, 640, 260, '', 1); ctx.save(); roundRect(ctx, 520, 600, 640, 260, 16); ctx.clip(); ctx.fillStyle = SP7.waterD; ctx.fillRect(520, 640, 640, 220); ctx.fillStyle = SP7.tegel; ctx.fillRect(520, 640, 20, 220);
        const tt = t - q.at('keerpunt'), sl = Math.min(5, Math.floor(tt * 2)); zwemmer(ctx, 'sam', 600 + Math.min(1, tt / 2.6) * 380, 760, 170, { slag: 'onderwater', t, kijk: 1 }); ctx.restore();
        metaText(ctx, 'ONDER WATER', 550, 636, C.teal, 'left', 28); for (let i = 0; i < 5; i++) circ(ctx, 950 + i * 38, 626, 11, i < sl ? C.goud : '#33415C'); });
      SP7_bord(ctx, 1420, 140, 460, 1, q.on('Bijna', 1, 0.4), '2:01,83', q.on('boven', 1, 0.4), '+0,33', { h: 170 });
      const lev = niveau(4, [[q.on('teleurstelling', 1, 0.8), 5], [q.on('kleiner', 1, 0.6), 3]]); SP7_meter(ctx, 1690, 450, lev, 1, { h: 240, plan: 3, planA: q.on('kleiner', 1, 0.5) });
      laag(ctx, q.on('procesdoelen', 1, 0.4), () => metaKaart(ctx, '2 PROCESDOELEN GEHAALD', 1460, 800, 1, C.goud, 'right')); });
    laag(ctx, Hd, () => { SP7_hand(ctx, 980, 470, 1.15, [['2:01,50', 1, SP7.stift, q.on('meer', 1, 0.6)], ['100 m rustig', ramp(t, q.at('hand') + 0.2, 0.8), C.goud, 0], ['5 dolfijn', ramp(t, q.at('staat') + 0.2, 0.8), C.goud, 0]]); }); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const x0 = 200, x1 = 1240, yT = 220, yB = 520, n = 7, dx = (x1 - x0) / (n - 1), Y = v => yB - (yB - yT) * v / 10;
    const pts = [[0, 9], [1, 7], [2, 5], [3, 8], [4, 5], [4.4, 4], [5, 4], [5.8, 5], [6, 3]];
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 20, yB); ctx.lineTo(x1 + 20, yB); ctx.stroke(); metaText(ctx, 'HOE STERK VOELT HET · MODEL', x0 - 20, yT - 30, C.grain, 'left', 28);
    const kort = ['0 MIN', '10 MIN', 'AVOND', '23:00', 'DAG ERNA', 'WEEK', '3 WKN'];
    kort.forEach((l, i) => { circ(ctx, x0 + i * dx, yB, 6, '#56627E'); metaText(ctx, l, x0 + i * dx, yB + 44, C.text2, 'center', 28); });
    const prog = lerp(0, 1, ramp(t, 0.3, 1.2)) * 1 + 1 * ramp(t, q.at('verwachtte'), 1) + 1 * ramp(t, q.at('muziek'), 1) + 1 * ramp(t, q.at('afstand'), 1) + 1 * ramp(t, q.at('mensen'), 1) + 1.5 * ramp(t, q.at('procesdoelen'), 1.5) + 1.5 * ramp(t, q.at('hand'), 1.2);
    const P = pts.map(([i, v]) => [x0 + i * dx, Y(v)]); const segN = P.length - 1, up = clamp(prog / 8 * segN, 0, segN);
    ctx.save(); ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i <= segN; i++) { if (up >= i) ctx.lineTo(P[i][0], P[i][1]); else if (up > i - 1) { const f = up - (i - 1); ctx.lineTo(lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)); break; } } ctx.stroke();
    for (let i = 0; i <= Math.min(segN, Math.floor(up)); i++) circ(ctx, P[i][0], P[i][1], 9, C.paars); ctx.restore();
    const kaarten = [['INFORMATIE', '', q.on('vertelt', 1, 0.5)], ['ZINTUIGEN ·', 'AANDACHT · MENSEN', q.on('stuur', 1, 0.5)], ['PROCESDOELEN', '', q.on('procesdoelen', 1, 0.5)], ['ZELF WILLEN', '', q.on('zelf', 1, 0.5)]];
    kaarten.forEach(([a1, a2, a], i) => laag(ctx, a, () => { const x = 100 + i * 440; kaart(ctx, x, 650, 420, 130, 1, i === 2 ? C.goud : C.line); metaText(ctx, a1, x + 210, a2 ? 704 : 726, i === 2 ? C.goud : C.text, 'center', 28); if (a2) metaText(ctx, a2, x + 210, 746, C.text, 'center', 28); }));
    laag(ctx, q.on('Daarbij', 1, 0.3), () => { persoon(ctx, 'sportpsycholoog', 1460, 600, 380, { uit: 'blij', kijk: 1, t }); persoon(ctx, 'sam', 1690, 600, 400, { outfit: 'school', uit: 'blij', kijk: -1, t }); metaText(ctx, 'SPORTPSYCHOLOOG', 1460, 640, C.goud, 'center', 28); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'OPLEIDINGEN · 2026', 160, 180, C.grain, 'left', 28);
    SP7_opleiding(ctx, 160, 220, 1600, 170, [['MASTER PSYCHOLOGY · UVA', 'meta'], ['track Sport and Performance Psychology', 'groot']], q.on('master', 1, 0.6), 200);
    SP7_opleiding(ctx, 160, 420, 1600, 170, [['MASTER HUMAN MOVEMENT SCIENCES · VU', 'meta'], ['Psychology in Sport, Performance and Health', 'groot']], q.on('bewegingswetenschappen', 1, 0.6), 200);
    SP7_opleiding(ctx, 160, 620, 1600, 170, [['DAARNA · VSPN', 'meta'], ['opleiding tot praktijksportpsycholoog', 'groot']], q.on('Daarna', 1, 0.6), 200); }
});

// telpoppetjes in drie groepen (s17, s19). o.mk = tijdlijnmarker 0..2 (0, 10, 22 maanden); o.weg = deel van 'moeten' dat stopt; o.talent = zichtbaarheid groep 3
function sp7Groepen(ctx, t, q, o = {}) { const lx0 = 360, lx1 = 1560, ly = 200; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx0, ly); ctx.lineTo(lx1, ly); ctx.stroke();
  [['0', 0], ['10', 0.45], ['22 MAANDEN', 1]].forEach(([l, f]) => { circ(ctx, lerp(lx0, lx1, f), ly, 7, '#56627E'); metaText(ctx, l, lerp(lx0, lx1, f), ly + 44, C.text2, 'center', 28); });
  const mk = o.mk || 0, mf = mk <= 1 ? mk * 0.45 : 0.45 + (mk - 1) * 0.55; circ(ctx, lerp(lx0, lx1, mf), ly, 12, C.goud);
  metaText(ctx, '369 WEDSTRIJDZWEMMERS', 160, 300, C.grain, 'left', 28);
  const G = [['ZELF WILLEN', 160, 1, o.zelfweg || 0, 0.06], ['MOETEN VAN ANDEREN', 720, 1, o.weg || 0, 0.55], ['TALENT', 1280, o.talent == null ? 1 : o.talent, 0, 0]];
  G.forEach(([lab, gx, ga, wg, frac], gi) => laag(ctx, ga, () => { for (let i = 0; i < 123; i++) { const c = i % 15, r = Math.floor(i / 15), stop = hash(i * 7.3 + gi * 11) < frac; const a = stop ? 1 - clamp(wg * 1.6 - hash(i * 3.1 + gi) * 0.6, 0, 1) : 1;
      SP7_telpop(ctx, gx + 20 + c * 30, 380 + r * 46, 42, '#8FA8C8', a); }
    metaText(ctx, lab, gx + 230, 800, C.text, 'center', 28); vraagteken(ctx, gx + 505, 600, o.vraag || 0, 70); })); }

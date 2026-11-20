// Wat word jij? · Sport en topsport 8 · Energiesystemen in het zwembad — scènes per alinea (v1.0, 20 nov 2026).
// Look: Schema met cast. De zwemmer (Sam, outfit 'zwem'), de zwemtrainer ('zwemtrainer'); geen namen in beeld.
// Vast beeld: mengpaneel met drie schuifjes (fosfaataccu oker, gisting oker met koraal rand, zuurstof teal).

// wereld-x van de heup tijdens de duik (zelfde formule als SP8_duik)
function SP8_duikX(tD) { if (tD <= 0) return SP8_BLOK.x; if (tD < 0.9) return 330 + 470 * clamp(tD / 0.9, 0, 1); if (tD < 1.7) return 800 + 260 * (tD - 0.9) / 0.8; return 1060 + 200 * (tD - 1.7); }
// mengpaneel tijdens de 200 m: p = afgelegde meters
function SP8_mixRace(p) { return [SP8_pl(p, [[0, 0.92], [12, 0.75], [50, 0.25], [100, 0.12], [200, 0.1]]), SP8_pl(p, [[0, 0.4], [50, 0.3], [100, 0.22], [150, 0.3], [200, 0.62]]), SP8_pl(p, [[0, 0.2], [25, 0.6], [50, 0.85], [100, 0.9], [200, 0.86]])]; }
const SP8_FR = [[0.41, 0.14, 0.45], [0.12, 0.15, 0.73], [0.07, 0.10, 0.83], [0.07, 0.28, 0.65]];
const SP8_SERIE = [27.9, 30.9, 31.7, 32.2], SP8_FINALE = [28.9, 30.6, 30.9, 30.8];
// wand-decor met trainer (s07, s09, s17): muur, waterlijn
function SP8_kantScene(ctx, t, q, o = {}) { const muur = o.muur || 1640, wl = o.wl || 560; SP8_wand(ctx, muur, wl, t);
  const tr = o.trainer === false ? null : persoon(ctx, 'zwemtrainer', o.tx || 1770, wl - 26, o.th || 400, { t, kijk: -1, uit: o.tuit || 'neutraal' });
  const r = SP8_hangen(ctx, muur, wl, t, { hijg: o.hijg, uit: o.uit, h: o.h || 470 }); SP8_waterWand(ctx, muur, wl, t); return { r, tr, muur, wl }; }
function SP8_schouder(r) { return r && r.handR && r.handR.shx != null ? { x: r.handR.shx, y: r.handR.shy } : (r && r.hoofd ? { x: r.hoofd.x - 20, y: r.hoofd.y + r.hoofd.r * 2 } : { x: 1500, y: 560 }); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.beginPath(); ctx.rect(1060, 0, 860, 875); ctx.clip(); const B = SP8_bad(ctx, 1100, 450, 1000, 380, 6, { t, blokken: false });
    const L = 64, u = (t * 0.12) % 1; SP8_spoor(ctx, 1100, 1100 + u * 1000, B.y(2) + 14, C.teal, 0.6, 10); SP8_boven(ctx, 1100 + u * 1000, B.y(2), L, t, { kijk: 1 });
    for (let i = 0; i < 4; i++) { const rr = ((t * 60 + i * 80) % 320); ctx.strokeStyle = rgba(C.teal, 0.5 * (1 - rr / 320)); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1500, B.y(4), rr, rr * 0.35, 0, 0, 6.283); ctx.stroke(); }
    ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = SP8_bad(ctx, 140, 230, 1360, 544, 8, { t, hl: 3 }), y = B.y(3), x0 = B.x0 + 30, x1 = B.x1 - 34, L = 54;
    const tB = q.at('vijftienhonderd') - 0.4, fase2 = t >= tB, P = q.on('Zelfde', 1, 0.5);
    if (!fase2) { const ts = q.at('gaat'), te = q.at('tikt') + 0.2, u = clamp((t - ts) / (te - ts), 0, 1);
      SP8_scorebord(ctx, 1560, 240, 300, 170, '50 M VRIJ', t < ts ? '0,0' : (u < 1 ? (25.4 * u).toFixed(1).replace('.', ',') : '25,4'), 1);
      SP8_spoor(ctx, x0, lerp(x0, x1, ease(u)), y, C.goud, 1, 14); SP8_boven(ctx, lerp(x0, x1, u < 1 ? u : 1), y, L, t * 1.5, { kijk: 1, stil: t < ts || u >= 1 });
      if (u >= 1) { laagTik(ctx, q, x1, y); }
      return; }
    // 1500 m: zelfde start, na twee baantjes koraal en trager
    const t0 = q.at('vijftienhonderd'), k1 = t0 + 1.0, k2 = k1 + 1.0, kap = q.at('kapot');
    SP8_scorebord(ctx, 1560, 240, 300, 170, '1500 M VRIJ', '', 1);
    let x, kijk = 1; if (t < t0) x = x0; else if (t < k1) x = lerp(x0, x1, (t - t0) / 1.0); else if (t < k2) { x = lerp(x1, x0, (t - k1) / 1.0); kijk = -1; } else { x = lerp(x0, x1, clamp((t - k2) / 9, 0, 1)); }
    const kl = SP8_hex(C.goud, C.koraal, q.on('kapot', 1, 0.8));
    if (t > t0) SP8_spoor(ctx, x0, t < k1 ? x : x1, y - 16, C.goud, 1, 10);
    if (t > k1) SP8_spoor(ctx, x1, t < k2 ? x : x0, y, C.goud, 1, 10);
    if (t > k2) SP8_spoor(ctx, x0, x, y + 16, kl, 1, 10);
    SP8_boven(ctx, x, y, L, t * (t > k2 ? 0.6 : 1.5), { kijk, stil: t < t0 });
    laag2(ctx, P, () => { SP8_kaart(ctx, 420, 390, 800, 230, 1, C.goud); text(ctx, '50 M · 1500 M', 820, 480, fTitel(64), C.text, 'center'); text(ctx, 'zelfde slag?', 820, 556, fTekst(48, 700), C.goud, 'center'); });
    SP8_meta(ctx, 'WAT DENK JE?', 820, 660, q.on('Wat', 1, 0.4), C.goud, 'center'); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const Y = 660; SP8_doorsnede(ctx, t, Y); SP8_duik(ctx, t, -1, Y);
    SP8_scorebord(ctx, 560, 190, 440, 150, 'SERIE', '200 M VRIJ', 1);
    const hl = [SP8_fase(t, q.at('fosfaataccu') - 0.1, q.at('fosfaataccu') + 1.3), SP8_fase(t, q.at('gisting') - 0.1, q.at('gisting') + 1.1), SP8_fase(t, q.at('zuurstof') - 0.1, q.at('zuurstof') + 1.4)];
    SP8_paneel(ctx, 1040, 190, 0.85, [0, 0, 0], { hl, grijs: q.on('Welke', 1, 0.5) });
    laag2(ctx, q.on('mitochondri', 1, 0.5) * (1 - q.on('Volg', 1, 0.4)), () => { const pz = [1040 + 0.85 * 710, 190 + 0.85 * 420 + 60]; mitochondrion(ctx, pz[0], pz[1], 110, 0, 1, 5, t); }); },

  s05(ctx, t, q) { const Y = 660, tS = q.at('Alle'), tD = t - tS, hx = SP8_duikX(tD), off = Math.max(0, hx - 1000);
    SP8_doorsnede(ctx, t, Y, { off }); SP8_duik(ctx, t, tD, Y, off);
    const p = SP8_pl(t, [[tS, 0], [q.at('start'), 8], [q.at('snel'), 45], [q.at('kwam'), 50], [q.at('middelste'), 55], [q.at('driekwart'), 120], [q.at('zuurstof', 2), 150], [q.at('laatste'), 152], [q.at('kwart', 2), 200]]);
    const open = ramp(t, tS, 0.6), v = SP8_mixRace(p).map(x => x * open);
    SP8_antw(ctx, 'Antwoord c', 1);
    SP8_paneel(ctx, 1040, 180, 0.85, v, { grijs: 1 - ramp(t, tS, 0.5), hl: [SP8_fase(t, q.at('fosfaataccu') - 0.1, q.at('meest') + 0.8), SP8_fase(t, q.at('gisting'), q.at('kwart', 2) + 0.8), SP8_fase(t, q.at('aerobe'), q.at('snel') + 0.6)], rand: SP8_fase(t, q.at('mengpaneel') - 0.1, q.at('race') + 1.2, 0.4) });
    if (tD > 1.0) SP8_meta(ctx, Math.min(200, Math.round(p / 5) * 5) + ' M', 1820, 840, 1, '#DDF0F8', 'right', 30);
    // gestapelde balken per 50 m
    const B = q.on('Over', 1, 0.5); laag2(ctx, B, () => { SP8_meta(ctx, 'GESCHAT · ÉÉN ONDERZOEK', 120, 220, 1, C.grain); SP8_meta(ctx, 'GOED GETRAINDE ZWEMMERS', 120, 256, 1, C.grain);
      const vul = [[q.on('fosfaataccu', 2, 0.6), q.on('bijna', 1, 0.6), q.on('zuurstof', 1, 0.6)], [q.on('middelste', 1, 0.8), q.on('middelste', 1, 0.8), q.on('middelste', 1, 0.8)], [q.on('driekwart', 1, 0.8), q.on('driekwart', 1, 0.8), q.on('driekwart', 1, 0.8)], [q.on('laatste', 1, 0.6), q.on('springt', 1, 0.6), q.on('laatste', 1, 0.6)]];
      ['0–50', '50–100', '100–150', '150–200'].forEach((lab, i) => { const x = 140 + i * 190; SP8_stapel(ctx, x, 285, 140, 240, SP8_FR[i], vul[i], 1); metaText(ctx, lab, x + 70, 565, C.text2, 'center', 26); });
      SP8_meta(ctx, 'FIGUEIREDO E.A. 2011 · HELLARD E.A. 2018', 120, 612, 1, C.grain, 'left', 24); });
    const E = q.on('estafette', 1, 0.4); SP8_stokje(ctx, 955, 430, E * (1 - q.on('schuifjes', 1, 0.5)), q.on('estafette', 1, 0.6) > 0 ? ramp(t, q.at('estafette') + 0.3, 0.5) : 0); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const R = [['50', 0.3, 'Bij', 2, ''], ['100', 0.5, '100', 1, '± 1/2'], ['200', 0.67, '200', 1, '± 2/3'], ['400', 0.82, '400', 1, '± 4/5 OF MEER'], ['800', 0.88, '1500', 1, ''], ['1500', 0.92, '1500', 1, 'NOG MEER']];
    circ(ctx, 360, 182, 12, C.teal); metaText(ctx, 'ZUURSTOF', 384, 192, C.teal, 'left', 28); circ(ctx, 650, 182, 12, C.oker); metaText(ctx, 'FOSFAATACCU EN GISTING', 674, 192, C.oker, 'left', 28);
    R.forEach(([d, fr, w, n, lab], i) => { const y = 240 + i * 88, x = 340, bw = 1060, u = i === 4 ? ramp(t, q.at('1500') - 0.6, 0.7) : q.on(w, n, 0.8);
      text(ctx, d + ' m', x - 30, y + 40, fTekst(40, 800), u > 0.5 ? C.text : C.text2, 'right'); roundRect(ctx, x, y, bw, 52, 12); shape(ctx, '#121A2A', '#3E4A62', 2);
      if (u > 0.01) { ctx.save(); roundRect(ctx, x, y, bw, 52, 12); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fillRect(x + bw * fr * ease(u), y, bw * (1 - fr) * ease(u), 52); ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(x, y, bw * fr * ease(u), 52); ctx.restore(); }
      if (lab) SP8_meta(ctx, lab, x + bw + 30, y + 38, u, C.teal, 'left', 28); });
    ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(340 + 530, 225); ctx.lineTo(340 + 530, 770); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'HELFT', 870, 800, C.text2, 'center', 24);
    SP8_meta(ctx, 'SCHATTINGEN VERSCHILLEN PER ONDERZOEK', 120, 840, 1, C.grain, 'left', 26); SP8_meta(ctx, 'ALMEIDA E.A. 2020 · IJSM 2020', 1800, 840, 1, C.grain, 'right', 26); },

  // ---------- H2 ----------
  s07(ctx, t, q) { const tK = q.at('Aan') - 0.2;
    if (t < tK) { const wl = 300, L = 430; SP8_onderWater(ctx, wl, t, t * 160); const r = zwemmer(ctx, 'sam', 900, wl + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8, kijk: 1 });
      const g = 0.35 + 0.15 * Math.sin(t * 4); for (const pt of [r.handR, r.handL, r.schouder]) if (pt) { const gr = ctx.createRadialGradient(pt.x, pt.y, 4, pt.x, pt.y, 90); gr.addColorStop(0, rgba(C.koraal, g)); gr.addColorStop(1, rgba(C.koraal, 0)); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(pt.x, pt.y, 90, 0, 6.283); ctx.fill(); }
      tag(ctx, '175 M', 200, 210, C.koraal, 1, 'center', 34);
      const S = q.on('slagen', 1, 0.5); SP8_kaartje(ctx, 1300, 150, 520, [['SLAGEN PER 50 M', 'meta', C.grain], ['34 · 36 · 37 · 39', 'groot', C.text]], S, C.line); SP8_meta(ctx, 'VOORBEELD', 1820, 330, S, C.grain, 'right', 26);
      return; }
    const K = SP8_kantScene(ctx, t, q, { hijg: true, tuit: t > q.at('Weet') && t < q.at('zwemtrainer') + 0.5 ? 'praat' : 'neutraal' });
    bubbel(ctx, 1430, 400, 'Verzuurd!', '#F2F2EE', q.on('verzuurd', 1, 0.3), 34); bubbel(ctx, 1620, 140, 'Zeker weten?', '#F2F2EE', q.on('Weet', 1, 0.3), 34);
    const Z = q.on('Wat', 1, 0.5), sc = SP8_schouder(K.r); zoomCircle(ctx, 560, 470, 330, sc.x, sc.y, '', Z, () => SP8_vezel(ctx, 560, 470, 330, { t, kracht: 1, vraag: q.on('Wat', 2, 0.5) })); },

  s09(ctx, t, q) { const K = SP8_kantScene(ctx, t, q, { hijg: true }); SP8_antw(ctx, 'Antwoord a', 1); const sc = SP8_schouder(K.r);
    const fo = ramp(t, q.at('fosfaat'), 3), zu = ramp(t, q.at('zuur'), 2), kr = 1 - 0.65 * q.on('minder', 1, 1.5), ca = 1 - 0.7 * q.on('calcium', 1, 1.5), bv = q.on('Na', 1, 0.6), la = q.on('lactaat', 1, 1.0);
    zoomCircle(ctx, 560, 470, 330, sc.x, sc.y, '', 1, () => { SP8_vezel(ctx, 560, 470, 330, { t, kracht: kr, fosfaat: fo, zuur: zu, calcium: ca, bloedvat: bv, lactaat: la }); SP8_meta(ctx, 'SNELLE VEZEL', 560, 236, q.on('snelle', 1, 0.5), C.text, 'center', 28); });
    // legenda rechts van de cirkel
    const leg = (y, a, teken, lab, kl) => SP8_laag(ctx, a, () => { teken(980, y - 10); metaText(ctx, lab, 1010, y, kl, 'left', 28); });
    leg(200, q.on('fosfaat', 1, 0.4), (x, y) => circ(ctx, x, y, 10, C.oker, '#F2E2B8', 1.5), 'FOSFAAT', C.oker);
    leg(245, q.on('zuur', 1, 0.4), (x, y) => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.lineTo(x + 9, y); ctx.moveTo(x, y - 9); ctx.lineTo(x, y + 9); ctx.stroke(); }, 'H⁺ (ZUUR)', C.koraal);
    leg(290, q.on('calcium', 1, 0.4), (x, y) => circ(ctx, x, y, 11, rgba(C.teal, 0.7)), 'CALCIUM', C.teal);
    leg(335, q.on('lactaat', 1, 0.4), (x, y) => circ(ctx, x, y, 10, SP8.lac, '#FFF4CC', 2), 'LACTAAT', SP8.lac);
    SP8_laag(ctx, q.on('lactaat', 1, 0.5), () => { SP8_lactaatMeter(ctx, 1020, 470, 0.55, 'HOOG', 1); SP8_meta(ctx, 'NA DE RACE', 1080, 438, 1, C.text2, 'left', 26); });
    SP8_meta(ctx, 'TEKEN VAN GISTING', 1080, 478, q.on('teken', 1, 0.4), SP8.lac, 'left', 26); SP8_meta(ctx, 'ZELF WEINIG EFFECT', 1080, 518, q.on('weinig', 1, 0.4), SP8.lac, 'left', 26);
    const O = q.on('onderzoekers', 1, 0.5); SP8_kaartje(ctx, 960, 690, 470, [['ONDERZOEK NOG NIET AF', 'meta', C.koraal]], O, C.koraal);
    const V = q.on('verzuurd', 1, 0.3); laag2(ctx, V, () => { bubbel(ctx, 1430, 400, 'Verzuurd', '#F2F2EE', 1, 34); SP8_doorstreep(ctx, 1360, 386, 140, ramp(t, q.at('half') - 0.4, 0.5) * 0.55, C.koraal, 6); });
    SP8_meta(ctx, 'ALLEN E.A. 2008 · EUR J APPL PHYSIOL 2025', 120, 850, 1, C.grain, 'left', 24); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); SP8_uitzwembad(ctx, t); naamBij(ctx, 'uitzwembad', '', 715, 790, 1, 'center', C.text);
    SP8_bank(ctx, 150, 240, 610, 700); const r = persoon(ctx, 'sam', 270, 700, 380, { outfit: 'zwem', pose: 'zit', zitHoogte: 90, uit: 'neutraal', t }); SP8_handdoek(ctx, r, 1);
    SP8_klokKaart(ctx, 120, 180, 1);
    SP8_proef(ctx, 1060, 200, { a: q.on('Onderzoekers', 1, 0.5) }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP8_uitzwembad(ctx, t); SP8_antw(ctx, 'Antwoord a', 1);
    const tz0 = q.at('uitzwemmen') - 0.4, tz1 = q.at('bewijs') - 0.2, zwemt = t > tz0 && t < tz1;
    SP8_bank(ctx, 150, 240, 610, 700);
    if (zwemt) { const L = 240, wl = 710, per = 7, u = ((t - tz0) % (2 * per)) / per, heen = u < 1, x = heen ? lerp(560, 880, u) : lerp(880, 560, u - 1);
      ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(heen ? 540 : 900, wl + 4); ctx.lineTo(x, wl + 4); ctx.stroke(); ctx.restore();
      zwemmer(ctx, 'sam', x, wl + 0.07 * L, L, { slag: 'rug', t, tempo: 0.7, kijk: heen ? 1 : -1 }); SP8_meta(ctx, 'RUSTIG', 715, 640, 1, C.teal, 'center', 28); }
    else { const r = persoon(ctx, 'sam', 270, 700, 380, { outfit: 'zwem', pose: 'zit', zitHoogte: 90, uit: 'neutraal', t }); SP8_handdoek(ctx, r, 1); }
    SP8_proef(ctx, 1060, 200, { tijden: [q.on('stilzitten', 1, 0.4), q.on('sneller', 1, 0.4), q.on('Tien', 1, 0.4)], hl: [0, q.on('sneller', 1, 0.5) * (1 - q.on('Tien', 1, 0.4) * 0.5), 0], lijn: q.on('lactaat', 1, 1.2) });
    SP8_meta(ctx, 'ÉÉN ONDERZOEK · 11 ZWEMMERS', 1060, 770, q.on('één', 1, 0.4), C.grain, 'left', 28); SP8_meta(ctx, 'TOUBEKIS E.A. 2008 (IJSPP)', 1060, 810, q.on('één', 1, 0.4), C.grain, 'left', 24);
    SP8_kaartje(ctx, 120, 200, 560, [['200 M: GEEN VERSCHIL', 'tekst', C.text], ['PRATAMA & YIMLAMAI 2020', 'meta', C.grain]], q.on('200', 1, 0.5), C.line);
    SP8_meta(ctx, 'HET BEWIJS IS GEMENGD', 1460, 160, q.on('gemengd', 1, 0.5), C.goud, 'center', 32); },

  // ---------- H4 ----------
  s13(ctx, t, q) { SP8_finaleScene(ctx, t, q, 'serie'); },
  s15(ctx, t, q) { SP8_finaleScene(ctx, t, q, 'finale'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const RJ = [['100', 'Bij', 1], ['200', '200', 1], ['400', '200', 1], ['800', '800', 1], ['1500', '800', 1]];
    SP8_meta(ctx, 'INTERNATIONALE FINALES · SNELHEID PER BAAN', 360, 200, 1, C.grain, 'left', 28);
    RJ.forEach(([d, w, n], i) => { const y = 230 + i * 112, u = ramp(t, q.at(w, n) + (i === 2 || i === 4 ? 0.6 : 0), 1.6);
      text(ctx, d + ' m', 320, y + 66, fTekst(40, 800), u > 0.05 ? C.text : C.text2, 'right'); SP8_profiel(ctx, 360, y, 820, 82, d, u, { piek: q.on('eindsprint', 1, 0.6) }); });
    SP8_meta(ctx, 'MET DUIK', 360 + 205, 300, q.on('duik', 1, 0.4) * ramp(t, q.at('Bij') + 0.5, 0.5), '#0F1626', 'center', 24);
    SP8_meta(ctx, 'EINDSPRINT', 1200, 230 + 4 * 112 + 40, q.on('eindsprint', 1, 0.5), C.goud, 'left', 28);
    const T = q.on('Bij', 4, 0.3); if (T > 0.01) { persoon(ctx, 'zwemtrainer', 1600, 860, 430, { t, kijk: -1, uit: t > q.at('zegt') && t < q.at('verliezen') + 0.4 ? 'praat' : 'neutraal', pose: t > q.at('zegt') ? 'wijs' : 'staan' });
      SP8_kaartje(ctx, 1290, 190, 540, [['200 M OF LANGER', 'meta', C.goud], ['eerste 50 m: niet winnen,', 'tekst', C.text], ['wel verliezen', 'tekst', C.koraal]], q.on('zegt', 1, 0.5), C.goud); }
    SP8_meta(ctx, 'ROBERTSON E.A. 2009 · MCGIBBON E.A. 2018 · EUR J SPORT SCI 2020', 120, 850, 1, C.grain, 'left', 24); },

  // ---------- H5 ----------
  s17(ctx, t, q) { const K = SP8_kantScene(ctx, t, q, { muur: 1500, wl: 600, tx: 1720, hijg: true });
    SP8_whiteboard(ctx, 140, 170, 560, 210, 1); metaText(ctx, 'MAANDAG', 170, 218, '#56627E', 'left', 28); SP8_schrijf(ctx, '4 × 50 m sprint', 170, 320, 64, SP8.inkt, ramp(t, q.at('vier') - 0.2, 1.4));
    const V = q.on('Hoe', 1, 0.5), u = 0.15 + 0.2 * ramp(t, q.at('vult'), 3) * (1 - V * 0.0);
    SP8_batterij(ctx, 820, 300, 300, 120, u, { grijs: V, vraag: V, streep: V > 0.5 ? 2 / 3 : null });
    const Z = q.on('vult', 1, 0.5) * (1 - V), sc = SP8_schouder(K.r);
    zoomCircle(ctx, 560, 640, 170, sc.x, sc.y, '', Z, () => { bg(ctx, 'micro'); mitochondrion(ctx, 560, 640, 220, -0.2, 1, 6, t); });
    SP8_laag(ctx, Z * q.on('zuurstof', 1, 0.5), () => { pijl(ctx, 700, 560, 840, 440, C.teal, 1, 7, 24); naamBij(ctx, 'zuurstof', '', 790, 600, 1, 'left', C.teal); }); },

  s19(ctx, t, q) { const t2 = q.at('tien') - 0.3, t3 = q.at('pauzes') - 0.5;
    if (t >= t3) { SP8_kantScene(ctx, t, q, { muur: 1500, wl: 600, tx: 1720, uit: 'neutraal' }); SP8_antw(ctx, 'Antwoord c', 1);
      SP8_kaartje(ctx, 140, 220, 700, [['KORTE RUST', 'meta', C.teal], ['stil aan de kant kan beter', 'tekst', C.text]], ramp(t, t3, 0.4), C.teal); SP8_meta(ctx, 'TOUBEKIS E.A. 2005 · 2008', 140, 440, ramp(t, t3, 0.4), C.grain, 'left', 24); return; }
    bg(ctx, 'schema'); SP8_antw(ctx, 'Antwoord c', 1);
    const A = 1 - ramp(t, t2, 0.4), Bb = ramp(t, t2, 0.4);
    laag2(ctx, A, () => { SP8_meta(ctx, 'HOEVEEL ZIT ER WEER IN DE ACCU', 960, 240, 1, C.text2, 'center', 30);
      ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 500); ctx.lineTo(1720, 500); ctx.stroke();
      const P = [[350, 'na de sprint', '± 1/5', 0.2, 'onderzoek', 'vijfde'], [950, '1,5 min', '± 2/3', 0.65, 'anderhalve', 'derde'], [1550, '6 min', '± 4/5 · nog niet vol', 0.85, 'zes', 'helemaal']];
      P.forEach(([x, tl, fr, v, w0, w1]) => { const a = q.on(w0, 1, 0.4), u = v * ramp(t, q.at(w0), Math.max(0.5, q.at(w1) - q.at(w0)));
        laag2(ctx, a, () => { SP8_batterij(ctx, x - 120, 340, 240, 100, u, { lab: '' }); circ(ctx, x, 500, 10, C.oker); text(ctx, tl, x, 560, fTekst(40, 800), C.text, 'center'); text(ctx, fr, x, 610, fTekst(36, 700), C.oker, 'center'); }); });
      SP8_meta(ctx, 'FIETSSPRINT VAN 30 S', 960, 700, q.on('onderzoek', 1, 0.4), C.grain, 'center', 28); SP8_meta(ctx, 'BOGDANIS E.A. 1995 · MCMAHON & JENKINS 2002', 960, 740, q.on('onderzoek', 1, 0.4), C.grain, 'center', 24); });
    laag2(ctx, Bb, () => { SP8_meta(ctx, 'SNELHEID PER SPRINT · 10 S RUST', 960, 240, 1, C.text2, 'center', 30); SP8_meta(ctx, 'SCHEMATISCH', 1450, 290, 1, C.grain, 'right', 24);
      const Hs = [360, 300, 255, 225]; Hs.forEach((h, i) => { const x = 560 + i * 230, a = ramp(t, t2 + 0.3 + i * 1.0, 0.5); laag2(ctx, a, () => { roundRect(ctx, x - 60, 720 - h * ease(a), 120, h * ease(a), 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); metaText(ctx, 'SPRINT ' + (i + 1), x, 765, C.text2, 'center', 26); });
        if (i < 3) SP8_meta(ctx, '10 S', x + 115, 700, ramp(t, t2 + 0.8 + i * 1.0, 0.4), C.teal, 'center', 24); });
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(440, 720); ctx.lineTo(1480, 720); ctx.stroke();
      SP8_kaartje(ctx, 960, 340, 420, [['TOPSNELHEID', 'meta', C.goud], ['minuten rust', 'tekst', C.text]], q.on('minuten', 2, 0.5), C.goud, 'center'); }); },

  // ---------- Recap ----------
  s20(ctx, t, q) { const Y = 780; SP8_doorsnede(ctx, t, Y, { xW: 1000 }); SP8_startblok(ctx, 1000, Y - 162, 0.8, 4); SP8_wig(ctx, zwemmer(ctx, 'sam', 1000, Y - 162, 270, { slag: 'startblok', kijk: 1 }), Y - 150);
    const A = q.on('50', 1, 0.5), Bp = q.on('1500', 1, 0.5), rnd = SP8_fase(t, q.at('ander') - 0.1, q.at('mengpaneel') + 1.5, 0.4);
    const vA = [0.92 * q.on('fosfaataccu', 1, 0.8), 0.7 * q.on('gisting', 1, 0.8), 0.22 * q.on('voorbij', 1, 0.8)];
    const vB = [0.08 * Bp, 0.12 * Bp, 0.93 * q.on('alles', 2, 1.0)];
    SP8_paneel(ctx, 130, 200, 0.8, vA, { a: A, kop: '50 m', kopKl: C.text, rand: rnd, hl: [SP8_fase(t, q.at('eruit') - 0.2, q.at('slag') + 0.6), SP8_fase(t, q.at('eruit') - 0.2, q.at('slag') + 0.6), 0] });
    SP8_paneel(ctx, 1100, 200, 0.8, vB, { a: Bp, kop: '1500 m', kopKl: C.text, rand: rnd, hl: [0, 0, SP8_fase(t, q.at('tempo') - 0.2, q.at('volhouden') + 0.6)] });
    const R = q.on('bewaart', 1, 0.5); laag2(ctx, R * Bp, () => { const x = 1100 + 0.8 * 150, y = 200 + 0.8 * (96 + 214) - 30; pijl(ctx, x + 70, y, x + 70, y - 110, C.oker, 1, 8, 24); metaText(ctx, 'EINDSPRINT', x + 70, y - 128, C.oker, 'center', 24); });
    SP8_meta(ctx, 'VEREENVOUDIGD', 1788, 580, Bp, C.grain, 'right', 24); },

  s21(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = SP8.vloer; ctx.fillRect(0, 850, W, 25);
    persoon(ctx, 'zwemtrainer', 400, 850, 470, { t, kijk: 1, uit: 'praat', pose: t > q.at('meten') ? 'wijs' : 'staan' });
    SP8_beroep(ctx, 700, 190, 600, 'zwemtrainer', '', 'stopwatch', q.on('zwemtrainer', 1, 0.5));
    SP8_beroep(ctx, 700, 330, 600, 'inspanningsfysioloog', '', 'meter', q.on('inspanningsfysiologen', 1, 0.5));
    SP8_beroep(ctx, 700, 470, 600, 'prestatieanalist', '', 'grafiek', q.on('prestatieanalisten', 1, 0.5));
    [['splittijden', 'splittijden', C.goud], ['lactaat', 'lactaat', SP8.lac], ['herstel', 'herstel,', C.teal]].forEach(([s2, w, kl], i) => tag(ctx, s2, 790 + i * 200, 680, kl, q.on(w, 1, 0.4), 'center', 30));
    const O = q.on('studie', 1, 0.5); laag2(ctx, O, () => { SP8_kaart(ctx, 1340, 330, 500, 260, 1, C.goud); metaText(ctx, 'WO · 2026', 1370, 390, C.goud, 'left', 28); text(ctx, 'bewegings-', 1370, 460, fTekst(42, 800), C.text, 'left'); text(ctx, 'wetenschappen', 1370, 515, fTekst(42, 800), C.text, 'left'); }); },
});

// klein hulpje voor fades (laag met callback)
function laag2(ctx, a, fn) { SP8_laag(ctx, a, fn); }
// aantikken bij de 50 m: ring aan de muur
function laagTik(ctx, q, x, y) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x + 20, y, 26, 0, 6.283); ctx.stroke(); ctx.restore(); }

// s13 en s15: bovenaanzicht van de baan, snelheidslint, klembord en zwemtrainer
function SP8_finaleScene(ctx, t, q, deel) { bg(ctx, 'schema');
  const lx = 160, lw = 1600, ly = 160, lh = 80; roundRect(ctx, lx - 30, ly - 24, lw + 60, lh + 48, 10); shape(ctx, SP8.vloer, rgba(C.line, 0.4), 2); ctx.fillStyle = '#3F86A8'; ctx.fillRect(lx, ly, lw, lh);
  for (const yy of [ly + 4, ly + lh - 4]) for (let x = lx; x < lx + lw; x += 16) circ(ctx, x + 8, yy, 5, (Math.floor((x - lx) / 16) % 2) ? '#3D7FB3' : '#E8E4DA');
  ctx.fillStyle = rgba('#14303F', 0.5); ctx.fillRect(lx + 64, ly + lh / 2 - 4, lw - 128, 8); ctx.fillStyle = '#C9D3DA'; ctx.fillRect(lx - 6, ly, 6, lh); ctx.fillRect(lx + lw, ly, 6, lh);
  metaText(ctx, '0 · 100 · 200 M', lx, ly - 34, C.text2, 'left', 22); metaText(ctx, '50 · 150 M', lx + lw, ly - 34, C.text2, 'right', 22);
  // zwemmer heen en weer, tempo uit de splits
  const sp = deel === 'serie' ? SP8_SERIE : SP8_FINALE, per = sp.map(s => s / 9), tot = per.reduce((a, b) => a + b, 0), tt = t % tot; let acc = 0, k = 0; while (k < 3 && tt > acc + per[k]) { acc += per[k]; k++; }
  const u = clamp((tt - acc) / per[k], 0, 1), heen = k % 2 === 0, x = heen ? lerp(lx + 30, lx + lw - 30, u) : lerp(lx + lw - 30, lx + 30, u);
  SP8_boven(ctx, x, ly + lh / 2, 58, t * (1.6 - 0.1 * k), { kijk: heen ? 1 : -1 });
  // snelheidslinten
  const L1 = deel === 'serie' ? ramp(t, q.at('splittijden') - 0.2, 2.0) : 1, L2 = deel === 'finale' ? ramp(t, q.at('finale') - 0.1, 1.6) : 0;
  SP8_lint(ctx, 360, 320, 1000, SP8_SERIE, 1, { lab: 'SERIE', vul: L1 }); if (deel === 'finale') SP8_lint(ctx, 360, 405, 1000, SP8_FINALE, 1, { lab: 'FINALE', vul: L2 });
  // klembord
  const ser = deel === 'serie' ? SP8_SERIE.map((s, i) => q.on('splittijden', 1, 0.3) > 0 ? ramp(t, q.at('splittijden') + i * 0.5, 0.3) : 0) : [1, 1, 1, 1];
  const hard = deel === 'serie' ? q.on('hard', 1, 0.4) : 1, zak = deel === 'serie' ? q.on('zakte', 1, 0.6) : 1;
  const klS = ['#121A26', '#121A26', '#121A26', '#121A26'].map((k0, i) => i === 0 ? SP8_mix('#121A26', '#A87A12', hard) : SP8_mix('#121A26', '#B8452C', zak));
  const finA = deel === 'serie' ? [q.on('seconde', 1, 0.4), 0, 0, 0] : [1, ramp(t, q.at('finale') + 0.2, 0.3), ramp(t, q.at('finale') + 0.6, 0.3), ramp(t, q.at('finale') + 1.0, 0.3)];
  const kol = [{ kop: 'SERIE', tijden: SP8_SERIE.map(s => s.toFixed(1).replace('.', ',')), a: ser, kl: klS, totaal: '2:02,7', totA: deel === 'serie' ? q.on('tijd', 2, 0.4) : 1 },
               { kop: 'FINALE', kopA: deel === 'serie' ? q.on('finale', 1, 0.4) : 1, tijden: SP8_FINALE.map(s => s.toFixed(1).replace('.', ',')), a: finA, totaal: '2:01,2', totA: deel === 'finale' ? q.on('sneller', 1, 0.4) : 0, totKl: '#2E7D46' }];
  SP8_klembord(ctx, 560, 470, 720, 400, kol, { vb: false }); SP8_meta(ctx, 'VOORBEELD', 1300, 520, 1, C.grain, 'left', 24);
  if (deel === 'finale') { const R = SP8_fase(t, q.at('snel', 2) - 0.1, q.at('zwaarder') + 0.8); laag2(ctx, R, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(560 + 720 * 0.48, 470 + 130 + 0.6 * 47.5 - 2, 80, 32, 0, 0, 6.283 * R); ctx.stroke(); }); }
  const praat = deel === 'finale' && t > q.at('Eén') && t < q.at('eindtijd') + 0.4;
  persoon(ctx, 'zwemtrainer', 1580, 862, 420, { t, kijk: -1, uit: praat ? 'praat' : 'neutraal', pose: praat ? 'wijs' : 'staan' });
  if (deel === 'finale') { bubbel(ctx, 1600, 398, 'Kijk naar je splittijden', '#F2F2EE', SP8_fase(t, q.at('Kijk') - 0.1, q.at('vasthoudt') + 0.4, 0.3), 32);
    SP8_kaartje(ctx, 120, 470, 400, [['TE SNEL BEGIN', 'meta', C.koraal], ['schoolslag', 'tekst', C.text], ['meer lactaat', 'tekst', C.text], ['voelt zwaarder', 'tekst', C.text], ['THOMPSON E.A. 2003', 'meta', C.grain]], q.on('onderzoek', 1, 0.5), C.koraal); }
}

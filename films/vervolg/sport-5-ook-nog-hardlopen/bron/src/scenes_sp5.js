// Wat word jij? · Sport en topsport 5 · Ook nog hardlopen? — scènes per alinea (v1.0, 19 nov 2026)
// Look: Schema met cast. Zwembad (vlak getekend) alleen onder scènes die in het bad spelen (cold open, H1 duik, H2 startblok, H3 jongste groep, H4 klembord).
// Lichaam, spieren en botten op gewoon navy. Geen namen in beeld; vrienden en ouders zijn figuranten.

// tijdlijnen 8 → 22 jaar (H3): route A alleen zwemmen, route B tot 13 ook voetbal en atletiek
const SP5_TL = { x0: 420, x1: 1720, yA: 360, yB: 520, yAs: 600 };
function SP5_ax(age) { return lerp(SP5_TL.x0, SP5_TL.x1, (age - 8) / 14); }
function SP5_tijdlijnen(ctx, t, a = 1, o = {}) { if (a <= 0.01) return; const T = SP5_TL; ctx.save(); ctx.globalAlpha *= a;
  // rijkoppen
  for (const [y, k, col] of [[T.yA, 'A', C.teal], [T.yB, 'B', C.groen]]) { circ(ctx, 170, y, 34, rgba(col, 0.3), col, 3); text(ctx, k, 170, y + 13, fTekst(36, 800), C.text, 'center'); }
  SP5_golfIcoon(ctx, 280, T.yA, 1.1, C.teal);
  SP5_bal(ctx, 250, T.yB - 26, 0.9, C.groen); SP5_horde(ctx, 320, T.yB - 24, 0.75, C.oker); SP5_golfIcoon(ctx, 285, T.yB + 30, 0.9, C.teal);
  // balken
  roundRect(ctx, T.x0, T.yA - 22, T.x1 - T.x0, 44, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2);
  const x13 = SP5_ax(13); [[C.teal, -24], [C.groen, -8], [C.oker, 8]].forEach(([col, dy]) => { roundRect(ctx, T.x0, T.yB + dy - 7, x13 - T.x0, 14, 6); shape(ctx, rgba(col, 0.7), col, 1.5); });
  roundRect(ctx, x13, T.yB - 22, T.x1 - x13, 44, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2);
  // as
  lijn(ctx, [[T.x0, T.yAs], [T.x1, T.yAs]], C.line, 2); for (let ag = 8; ag <= 22; ag += 2) { const x = SP5_ax(ag); lijn(ctx, [[x, T.yAs - 8], [x, T.yAs + 8]], C.line, 2); metaText(ctx, String(ag), x, T.yAs + 44, C.text2, 'center', 28); }
  metaText(ctx, 'LEEFTIJD', T.x0 - 40, T.yAs + 44, C.text2, 'right', 28);
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const Y = 700; ctx.fillStyle = SP5.tegel; ctx.fillRect(1180, Y - 30, 420, 180); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(1180, Y - 34, 426, 10);
    ctx.fillStyle = SP5.water; ctx.fillRect(1600, Y, 320, 150); SP5_waterlijn(ctx, 1600, 1920, Y, t, 1);
    SP5_startblok(ctx, 1598, Y - 34 - 128, 0.8, 4, 150); const s = zwemmer(ctx, 'sam', 1598, Y - 34 - 128, 340, { slag: 'startblok', kijk: 1 }); SP5_wig(ctx, s, Y - 34 - 128 + 12); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { SP5_badKant(ctx, t); const Ac = q.on('acht', 1, 0.5), Vr = q.on('vrienden', 1, 0.4), Hl = q.on('hardlopen', 1, 0.6), Wd = q.on('snelheid', 1, 0.5);
    trainer(ctx, 1790, t, { kijk: -1, uit: 'neutraal' });
    sam(ctx, 330, t, { pose: Vr > 0.5 ? 'vasthouden' : 'staan', uit: Vr > 0.5 ? 'blij' : 'neutraal', hold: Vr > 0.5 ? (c, hx, hy) => SP5_telefoon(c, hx, hy - 20, 1.3) : null });
    laag(ctx, (1 - Wd), () => { SP5_week(ctx, 600, 150, { a: Ac, loop: Hl, drop: 1 });
      laag(ctx, Hl, () => vraagteken(ctx, 1420, 470, 1, 90)); });
    laag(ctx, Vr * (1 - Wd), () => SP5_app(ctx, 90, 300, 'HARDLOPEN? DI DO ZA', 1));
    laag(ctx, Wd, () => { kaart(ctx, 560, 170, 1160, 300, 1, C.goud); text(ctx, 'Extra training', 610, 280, fTekst(60, 800), C.text, 'left'); text(ctx, 'of snelheid kwijt?', 610, 370, fTekst(60, 800), C.text, 'left');
      SP5_tegel(ctx, 1450, 260, 'zwem', C.teal, 1); SP5_tegel(ctx, 1590, 260, 'loop', C.groen, 1); vraagteken(ctx, 1520, 430, 1, 110); }); },

  // ---------- H1 Wat overdraagt ----------
  s03(ctx, t, q) { const ts = q.at('springt', 1), B = q.on('springt', 1, 0.3), Hv = q.on('Hoe', 1, 0.4);
    if (B < 1) { bg(ctx, 'schema'); laag(ctx, 1 - B, () => { ctx.fillStyle = '#7A3E34'; ctx.fillRect(0, GROND, W, 20); ctx.fillStyle = rgba('#F2F2EE', 0.5); for (let x = 0; x < W; x += 140) ctx.fillRect(x, GROND + 8, 70, 3);
      persoon(ctx, 'bilal', 260, GROND, 430, { outfit: 'sport', zij: true, kijk: 1, gang: 'ren', t, vooruit: true }); }); }
    laag(ctx, B, () => { const Y = 470, L = 330, tD = t - ts; SP5_badDoorsnede(ctx, t, Y, { xW: 380 }); SP5_startblok(ctx, 380, Y - 34 - 128, 0.8, 4, 145);
      let hx, hy, an = 0, slag = 'stroomlijn';
      if (tD < 0.9) { const u = clamp(tD / 0.9, 0, 1); hx = 330 + 470 * u; hy = Y - 34 - 128 - 70 - 150 * u + 470 * u * u; an = Math.atan2(-150 + 940 * u, 470); }
      else if (tD < 1.7) { const u = (tD - 0.9) / 0.8; hx = 800 + 260 * u; hy = lerp(Y + 120, Y + 0.12 * L, ease(u)); an = lerp(0.5, 0, ease(u)) * (1 - u) ; }
      else { hx = 1060 + 190 * (tD - 1.7); hy = Y + 0.12 * L; slag = 'crawl'; }
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); const r = zwemmer(ctx, 'bilal', 0, 0, L, { slag, t, kijk: 1 }); ctx.restore();
      if (tD > 1.7) SP5_waterlijn(ctx, hx - L * 0.7, hx + L * 0.8, Y, t, 1);
      SP5_spat(ctx, 830, Y, (tD - 0.75) / 0.9, 1);
      laag(ctx, Hv, () => vraagteken(ctx, hx + 40, Y - 120, 1, 120)); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: hij is niet getraind voor zwemmen', 1 - q.on('Bij', 1, 0.5));
    const Mi = q.on('mitochondriën', 1, 0.3), Pr = q.on('proef', 1, 0.3), On = q.on('onderzoek', 2, 0.3), Gz = q.on('getrainde', 1, 0.3);
    const tA = 1 - Mi, tB = Mi * (1 - Pr), tC = Pr * (1 - On), tD = On * (1 - Gz), tE = Gz;
    // A: het hart van de hardloper
    laag(ctx, tA, () => { const r = persoon(ctx, 'bilal', 480, GROND, 600, { t, outfit: 'sport', uit: 'blij' }); const w = SP5_romp(ctx, r, 1, t, 1);
      const Ab = q.on('aerobe', 1, 0.6); if (Ab > 0.01 && w) { const flow = (pts) => { ctx.save(); ctx.globalAlpha *= Ab; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 60; lijn(ctx, pts, C.teal, 7); ctx.restore(); };
        flow([[w.x, w.y], [r.handL.x, r.handL.y]]); flow([[w.x, w.y], [r.handR.x, r.handR.y]]); flow([[w.x, w.y], [r.heup.x - 40, r.heup.y + 40], [r.heup.x - 50, GROND - 30]]); flow([[w.x, w.y], [r.heup.x + 40, r.heup.y + 40], [r.heup.x + 50, GROND - 30]]); }
      SP5_meter(ctx, 1330, 360, 150, 0.35 + 0.35 * q.on('meer', 1, 1.2), 'BLOED PER SLAG', q.on('slag', 1, 0.4), C.koraal);
      laag(ctx, Ab, () => tag(ctx, 'AEROBE BASIS', 1330, 560, C.teal, 1, 'center', 36));
      laag(ctx, q.on('overdracht', 1, 0.5), () => { SP5_tegel(ctx, 1130, 730, 'loop', C.groen, 1, 140, 66); pijl(ctx, 1220, 730, 1430, 730, C.goud, 1, 5, 20); SP5_tegel(ctx, 1520, 730, 'zwem', C.teal, 1, 140, 66); metaText(ctx, 'OVERDRACHT', 1325, 680, C.goud, 'center', 28); }); });
    // B: mitochondriën in de kuit, niet in de schouder
    laag(ctx, tB, () => { const h = 600, r = persoon(ctx, 'bilal', 480, GROND, h, { t, outfit: 'sport' }); const xs = r.hoofd.x + 0.12 * h, ys = GROND - 0.8 * h, xk = r.heup.x + 0.07 * h, yk = GROND - 0.16 * h;
      metaText(ctx, 'NA LOOPTRAINING', 1290, 200, C.text2, 'center', 28);
      zoomCircle(ctx, 1020, 470, 190, xs, ys, '', 1, () => SP5_vezels(ctx, 1020, 470, 190, 5, 0, t)); naamBij(ctx, 'schouderspier', 'gelijk', 1020, 710, 1, 'center');
      zoomCircle(ctx, 1540, 470, 190, xk, yk, '', 1, () => SP5_vezels(ctx, 1540, 470, 190, 5, 6 * ramp(t, q.at('mitochondriën', 1) + 0.5, 2.5), t)); naamBij(ctx, 'kuitspier', 'meer mitochondriën', 1540, 710, 1, 'center', C.groen);
      metaA(ctx, 'BEWEGINGSWETENSCHAP · INSPANNINGSFYSIOLOGIE', 1290, 820, q.on('Bewegingswetenschappers', 1, 0.5), C.goud, 'center', 28); });
    // C: één been getraind (Saltin 1976)
    laag(ctx, tC, () => { SP5_benen(ctx, 560, 560, 1.0, C.groen, '#7A8494'); naamBij(ctx, 'getraind', '', 440, 820, 1, 'right', C.groen); naamBij(ctx, 'niet getraind', '', 680, 820, 1, 'left', C.text2);
      metaText(ctx, 'SALTIN E.A. 1976 · 4 WEKEN', 1290, 200, C.grain, 'center', 28);
      const En = q.on('enzym', 1, 0.5); zoomCircle(ctx, 1300, 480, 220, 485, 460, '', q.on('Alleen', 1, 0.5), () => SP5_vezels(ctx, 1300, 480, 220, 5, 6 * En, t));
      naamBij(ctx, 'meer enzym van de mitochondriën', '', 1300, 760, En, 'center', C.groen); });
    // D: één onderzoek op de loopband
    laag(ctx, tD, () => { SP5_loopband(ctx, 380, 560, 1.4, 1, t); metaText(ctx, 'WINST OP DE LOOPBAND', 380, 640, C.text2, 'center', 28);
      const u1 = ramp(t, q.at('zwemtraining', 1), 1.2), u2 = ramp(t, q.at('looptraining', 1), 1.2);
      SP5_staaf(ctx, 760, 330, 820, 0.83 * u1, C.teal, 'zwemtraining', u1 > 0.9 ? '+25 %' : '', 1); SP5_staaf(ctx, 760, 500, 820, 0.93 * u2, C.groen, 'looptraining', u2 > 0.9 ? '+28 %' : '', q.on('looptraining', 1, 0.4));
      metaText(ctx, '37 MANNEN, NIET-SPORTERS', 760, 640, C.text2, 'left', 28); metaText(ctx, 'ÉÉN ONDERZOEK · MSSE 1989', 760, 700, C.grain, 'left', 28); });
    // E: de goed getrainde zwemmer
    laag(ctx, tE, () => { const r = sam(ctx, 480, t, { h: 600, uit: 'blij' }); const w = SP5_romp(ctx, r, 1, t, 1); SP5_meter(ctx, 1330, 360, 150, 0.85, 'HART AL STERK', 1, C.koraal);
      const Wa = q.on('water', 1, 0.6); if (w) laag(ctx, Wa, () => { pijl(ctx, w.x + 30, w.y - 60, r.handL.x + 20, r.hoofd.y + 150, C.teal, 1, 5, 18); pijl(ctx, w.x - 60, w.y - 60, r.handR.x - 20, r.hoofd.y + 150, C.teal, 1, 5, 18); tag(ctx, 'IN HET WATER GETRAIND', 1330, 640, C.teal, 1, 'center', 36); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const Hb = q.on('Hebben', 1, 0.5);
    laag(ctx, 1 - q.on('Hebben', 1, 0.4), () => { SP5_schoen(ctx, 360, 420, 3, C.groen); metaText(ctx, 'LOPEN', 360, 520, C.groen, 'center', 28); });
    laag(ctx, Hb, () => { SP5_scheenbeen(ctx, 960, 480, 660, 1); metaText(ctx, 'SCHEENBEEN · DOORSNEDE', 960, 110, C.text2, 'center', 28);
      naamBij(ctx, 'sponsbot', '', 1080, 200, 1, 'left'); naamBij(ctx, 'schors', '', 1030, 560, 1, 'left'); naamBij(ctx, 'mergholte', '', 880, 460, 1, 'right'); });
    laag(ctx, q.on('Wat', 1, 0.5), () => vraagteken(ctx, 1400, 560, 1, 160)); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: even sterk, het water draagt je', 1 - q.on('onderzoek', 2, 0.5));
    const Vi = q.on('vierenzestig', 1, 0.3), Jo = q.on('onderzoek', 2, 0.3), tA = 1 - Vi, tB = Vi * (1 - Jo), tC = Jo;
    laag(ctx, tA, () => { const Y = 420; ctx.fillStyle = SP5.water; ctx.fillRect(120, Y, 760, 400); ctx.fillStyle = SP5.waterD; ctx.fillRect(120, Y + 220, 760, 180);
      zwemmer(ctx, 'sam', 500, Y + 0.12 * 340, 340, { slag: 'crawl', t, kijk: 1 }); SP5_waterlijn(ctx, 120, 880, Y, t, 1);
      const Dr = q.on('draagt', 1, 0.5); for (let i = 0; i < 4; i++) { const x = 260 + i * 160, k = (t * 0.6 + i * 0.25) % 1; pijl(ctx, x, 790 - 40 * k, x, 600 - 40 * k, C.teal, Dr, 6, 22); }
      naamBij(ctx, 'het water draagt je', '', 500, 360, Dr, 'center', C.teal);
      SP5_voetStoot(ctx, 1400, 780, 1.1, ramp(t, q.at('stoten', 1) - 0.4, 0.4), 1, t);
      laag(ctx, q.on('stoten', 1, 0.4), () => tag(ctx, 'STOOT', 1400, 360, C.koraal, 1, 'center', 40)); });
    laag(ctx, tB, () => { metaText(ctx, 'GÓMEZ-BRUTON E.A. 2013 · 64 ONDERZOEKEN', 960, 220, C.grain, 'center', 28); const base = 720; lijn(ctx, [[400, base], [1520, base]], C.line, 2);
      const bars = [[600, 0.42, C.teal, 'ZWEMMERS'], [960, 0.42, '#7A8494', 'NIET-SPORTERS'], [1320, 0.68, C.oker, 'SPORT MET STOTEN']];
      bars.forEach(([x, hgt, col, lab], i) => { const u = ramp(t, q.at('zwemmers', 1) + i * 0.3, 0.8); roundRect(ctx, x - 90, base - 420 * hgt * u, 180, 420 * hgt * u, 8); shape(ctx, rgba(col, 0.7), col, 2); metaText(ctx, lab, x, base + 44, C.text2, 'center', 28); });
      text(ctx, '≈', 780, base - 200, fTitel(80), C.text, 'center'); text(ctx, '<', 1140, base - 220, fTitel(80), C.text, 'center'); metaText(ctx, 'BOTSTERKTE', 400, 300, C.text2, 'left', 28); });
    laag(ctx, tC, () => { metaText(ctx, 'VLACHOPOULOS E.A. 2018 · JONGENS · 9 MAANDEN', 960, 160, C.grain, 'center', 28);
      ctx.fillStyle = SP5.tegel; ctx.fillRect(160, GROND, 700, 20); const Sp = q.on('sprongen', 2, 0.3), jy = Sp * 130 * Math.abs(Math.sin(t * Math.PI * 1.25));
      persoon(ctx, 'daan', 500, GROND - jy, 400, { t, outfit: 'zwem', uit: 'blij' });
      const He = q.on('heup', 1, 0.5), Be = q.on('benen', 1, 0.5); SP5_beenSkelet(ctx, 1300, 600, 0.8, { hals: He, been: Be }, 1);
      naamBij(ctx, 'heup', 'dijbeenhals', 1400, 300, He, 'left', C.oker); naamBij(ctx, 'beenbot', '', 1390, 640, Be, 'left', C.oker); }); },

  // ---------- H2 Wat schuurt ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const Me = q.on('meteen', 1, 0.25), Ri = q.on('risico', 1, 0.5);
    SP5_week(ctx, 300, 300, { loop: Me, drop: 0.3 }); laag(ctx, Me, () => metaText(ctx, 'VANAF MAANDAG', 830, 700, C.groen, 'center', 28));
    sam(ctx, 1640, t, { kijk: -1, uit: Ri > 0.5 ? 'verbaasd' : 'neutraal' }); laag(ctx, Ri, () => vraagteken(ctx, 1640, 380, 1, 110)); },

  s11(ctx, t, q) { const Tr = q.on('triatleten', 1, 0.3), Em = q.on('emmer', 2, 0.4), tA = 1 - Tr, tB = Tr * (1 - Em), tC = Em;
    bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: hij herstelt slechter, kans op blessure', 1 - q.on('voorbeeld', 1, 0.4));
    laag(ctx, tA, () => { ctx.fillStyle = SP5.gras; ctx.fillRect(0, 800, W, 80); ctx.fillStyle = SP5.pad; ctx.fillRect(0, 840, W, 40);
      laag(ctx, q.on('voorbeeld', 1, 0.4), () => { tag(ctx, 'VOORBEELD', 120, 150, C.text2, 1, 'left', 30); roundRect(ctx, 120, 200, 200, 120, 12); shape(ctx, '#F2EEE4', null); ctx.fillStyle = C.koraal; ctx.fillRect(120, 200, 200, 34); text(ctx, 'WEEK 2', 220, 300, fTekst(40, 800), '#1A2740', 'center'); });
      const Ts = q.on('snel', 2, 0.3), Sc = q.on('scheenbenen', 1, 0.5), Bn = q.on('benen', 2, 0.5), h = 430, x = 620;
      sam(ctx, x, t, { outfit: 'sport', uit: Sc > 0.5 ? 'moe' : 'neutraal' });
      const pi = Math.max(Sc * 0.7, Bn); if (pi > 0.01) for (const d of [-1, 1]) { ctx.save(); ctx.globalAlpha *= pi; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + d * 0.05 * h, GROND - 0.15 * h, 0.035 * h, 0.1 * h, 0, 0, 6.283); ctx.stroke();
        ctx.lineWidth = 4; ctx.beginPath(); const zx = x + d * 0.12 * h; ctx.moveTo(zx, GROND - 0.22 * h); ctx.lineTo(zx + d * 14, GROND - 0.19 * h); ctx.lineTo(zx, GROND - 0.16 * h); ctx.lineTo(zx + d * 14, GROND - 0.13 * h); ctx.stroke(); ctx.restore(); }
      laag(ctx, q.on('hart', 1, 0.4), () => { SP5_hart(ctx, x - 150, 420, 1.6, C.groen); vink_(ctx, x - 150, 360, 16, 1, C.groen); });
      trainer(ctx, 960, t, { kijk: -1, pose: Ts > 0.5 ? 'wijs' : 'staan', uit: Ts > 0.5 ? 'praat' : 'neutraal' });
      laag(ctx, q.on('schema', 1, 0.5), () => { SP5_klembord(ctx, 1220, 220, 560, 440, 1); text(ctx, 'drie keer', 1500, 340, fTekst(48, 800), '#1A2740', 'center');
        text(ctx, '5 KM', 1500, 440, fTekst(80, 800), Ts > 0.5 ? C.koraal : '#1A2740', 'center'); text(ctx, 'vanaf week 1', 1500, 540, fTekst(44, 700), '#1A2740', 'center');
        laag(ctx, Ts, () => stempel(ctx, 1500, 625, 'TE SNEL', C.koraal, 1, -0.1)); }); });
    laag(ctx, tB, () => { metaText(ctx, 'GUEVARA E.A. 2024 · TRIATLETEN', 960, 150, C.grain, 'center', 28);
      SP5_tegel(ctx, 620, 290, 'zwem', C.teal, 1, 170, 80); SP5_tegel(ctx, 960, 290, 'fiets', C.line, 1, 170, 80); SP5_tegel(ctx, 1300, 290, 'loop', C.koraal, 1, 170, 80);
      text(ctx, '45–92 % van de blessures', 1300, 410, fTekst(40, 800), C.koraal, 'center'); metaText(ctx, 'KORTE AFSTAND', 1300, 455, C.text2, 'center', 28);
      const La = q.on('langzaam', 1, 0.5); SP5_trap(ctx, 220, 820, 9, 60, 28, La, C.groen, ramp(t, q.at('langzaam', 1), 1.5)); naamBij(ctx, 'langzaam opbouwen', '', 220, 560, La, 'left', C.groen);
      kaartTekst(ctx, 1080, 600, 640, 140, '', ['fysiotherapeut · sportarts'], q.on('fysiotherapeut', 1, 0.5), C.teal); });
    laag(ctx, tC, () => { const s = 1.15, tg = []; const t8 = q.at('Acht', 1), t3 = q.at('lopen', 2);
      for (let i = 0; i < 8; i++) { const u = ramp(t, t8 + i * 0.12, 0.35); tg.push({ soort: 'zwem', kl: C.teal, a: u, drop: (1 - u) * 300 }); }
      for (let i = 0; i < 3; i++) { const u = ramp(t, t3 + i * 0.15, 0.35); tg.push({ soort: 'loop', kl: C.groen, a: u, drop: (1 - u) * 300 }); }
      SP5_emmer(ctx, 960, 780, s, { vul: 0.1 + 0.62 * ramp(t, t8, 1.6) + 0.28 * ramp(t, t3, 1.6), tegels: tg, t });
      naamBij(ctx, 'één emmer voor alles samen', '', 960, 150, q.on('samen', 1, 0.5), 'center'); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const Ov = q.on('overzicht', 1, 0.5), Dz = q.on('dezelfde', 1, 0.5), St = q.on('startblok', 1, 0.3), Tz = q.on('trainer', 1, 0.3);
    const tA = 1 - Ov, tB = Ov * (1 - Dz), tC = Dz * (1 - St), tD = St * (1 - Tz), tE = Tz;
    laag(ctx, tA, () => { ctx.fillStyle = SP5.tegel; ctx.fillRect(160, 760, 760, 120); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(160, 756, 760, 8);
      SP5_startblok(ctx, 620, 600, 1, 4, 190); const s = zwemmer(ctx, 'sam', 620, 600, 430, { slag: 'startblok', kijk: 1 }); SP5_wig(ctx, s, 612);
      SP5_meter(ctx, 1420, 330, 150, 0.85, 'EXPLOSIEVE KRACHT', 1, C.oker);
      laag(ctx, q.on('interferentie', 1, 0.5), () => tag(ctx, 'INTERFERENTIE-EFFECT', 1420, 120, C.goud, 1, 'center', 34));
      const Tw = q.on('Twee', 1, 0.5), Af = q.on('afremmen', 1, 0.6), d = 150 * Tw - 40 * Af;
      laag(ctx, Tw, () => { pijl(ctx, 1080, 640, 1080 + d + 120, 640, C.oker, 1, 8, 26); pijl(ctx, 1760, 640, 1760 - d - 120, 640, C.groen, 1, 8, 26);
        metaText(ctx, 'KRACHT', 1100, 600, C.oker, 'left', 28); metaText(ctx, 'DUUR', 1740, 600, C.groen, 'right', 28); laag(ctx, Af, () => kruis(ctx, 1420, 640, 22, 1, C.koraal)); }); });
    laag(ctx, tB, () => { metaText(ctx, 'SCHUMANN E.A. 2021 · 43 ONDERZOEKEN', 960, 160, C.grain, 'center', 28); const x = 560, w = 1000, Ex = q.on('explosieve', 1, 0.5);
      metaText(ctx, 'KRACHT + DUUR, VERGELEKEN MET ALLEEN KRACHT', x, 230, C.text2, 'left', 28);
      SP5_staaf(ctx, x, 330, w, 0.9 * ramp(t, q.at('maximale', 1), 0.8), C.oker, 'maximale kracht', '', 1); SP5_staaf(ctx, x, 480, w, 0.9 * ramp(t, q.at('spiergroei', 1), 0.8), C.oker, 'spiergroei', '', q.on('spiergroei', 1, 0.4));
      SP5_staaf(ctx, x, 630, w, 0.9 - 0.2 * ramp(t, q.at('minder', 1), 0.8), C.koraal, 'explosieve kracht', '', Ex);
      lijn(ctx, [[x + 0.9 * w, 290], [x + 0.9 * w, 700]], C.text2, 2); metaText(ctx, 'ALLEEN KRACHT', x + 0.9 * w, 750, C.text2, 'center', 28);
      laag(ctx, q.on('nauwelijks', 1, 0.4), () => text(ctx, '≈', x + 0.9 * w + 70, 440, fTitel(72), C.text, 'center')); laag(ctx, q.on('soms', 1, 0.4), () => text(ctx, 'soms minder', x + 0.7 * w + 30, 618, fTekst(36, 700), C.koraal, 'left')); });
    laag(ctx, tC, () => { roundRect(ctx, 660, 300, 600, 340, 18); shape(ctx, '#F2EEE4', C.koraal, 4); ctx.fillStyle = C.koraal; ctx.fillRect(660, 300, 600, 60); text(ctx, 'één training', 960, 345, fTekst(40, 800), '#1A2740', 'center');
      SP5_tegel(ctx, 840, 500, 'kracht', C.oker, 1, 180, 100); text(ctx, '+', 960, 520, fTitel(64), '#1A2740', 'center'); SP5_tegel(ctx, 1080, 500, 'loop', C.groen, 1, 180, 100); });
    laag(ctx, tD, () => { const Y = 470, ts = q.at('startblok', 1), tk = q.at('keerpunt', 1), L = 330; SP5_badDoorsnede(ctx, t, Y, { xW: 380, xR: 1800 }); SP5_startblok(ctx, 380, Y - 34 - 128, 0.8, 4, 145);
      if (t < tk) { const u = clamp((t - ts) / 0.9, 0, 1); if (u <= 0.01) SP5_wig(ctx, zwemmer(ctx, 'sam', 380, Y - 34 - 128, L, { slag: 'startblok', kijk: 1 }), Y - 34 - 128 + 12); else { const hx = 330 + 470 * u, hy = Y - 232 - 150 * u + 470 * u * u, an = Math.atan2(-150 + 940 * u, 470); ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, L, { slag: 'stroomlijn', fase: 0, kijk: 1 }); ctx.restore(); SP5_spat(ctx, 830, Y, (t - ts - 0.75) / 0.9, 1); } naamBij(ctx, 'startblok', '', 300, 250, 1, 'center', C.oker); }
      else { const u = clamp((t - tk) / 1.6, 0, 1); zwemmer(ctx, 'sam', 1790 - 0.62 * L - 500 * ease(u), Y + 180, L, { slag: 'onderwater', t, kijk: -1 }); naamBij(ctx, 'keerpunt', 'afzetten', 1700, 300, 1, 'center', C.oker); pijl(ctx, 1780, 560, 1700, 560, C.oker, 1 - u, 6, 20); }
      laag(ctx, q.on('genuanceerd', 1, 0.5), () => tag(ctx, 'BEWIJS GENUANCEERD', 960, 150, C.text2, 1, 'center', 32)); });
    laag(ctx, tE, () => { trainer(ctx, 330, t, { kijk: 1, uit: 'praat', pose: 'staan' }); const u = ramp(t, q.at('niet', 1), 1.4);
      roundRect(ctx, 640, 260, 1100, 380, 18); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); lijn(ctx, [[1190, 280], [1190, 620]], C.line, 2);
      metaText(ctx, 'OCHTEND', 915, 320, C.text2, 'center', 28); metaText(ctx, 'MIDDAG', 1465, 320, C.text2, 'center', 28);
      SP5_tegel(ctx, lerp(1110, 915, u), 470, 'kracht', C.oker, 1, 180, 100); SP5_tegel(ctx, lerp(1270, 1465, u), 470, 'loop', C.groen, 1, 180, 100);
      metaA(ctx, 'NIET DIRECT NA ELKAAR', 1190, 700, u, C.goud, 'center', 28); }); },

  // ---------- H3 Vroeg specialiseren of breed sporten ----------
  s13(ctx, t, q) { const Je = q.on('Je', 1, 0.3), Wd = q.on('Wat', 1, 0.3), tA = 1 - Je, tB = Je * (1 - Wd), tC = Wd;
    if (tA > 0.01) { SP5_badKant(ctx, t, { a: 1, blokken: false }); laag(ctx, tA, () => {
      [[0, 'kind'], [1, 'jens'], [2, 'kind'], [3, 'jens']].forEach(([i, id]) => { const L = 130, x = 900 + ((i * 260 + t * 70) % 1000); zwemmer(ctx, id, x, 610 + (i % 2) * 34 + 0.12 * L, L, { slag: 'crawl', t: t + i * 0.3, kijk: 1, outfit: i < 2 ? 'zwem' : 'zwemB' }); SP5_waterlijn(ctx, x - 90, x + 100, 610 + (i % 2) * 34, t, 1); });
      trainer(ctx, 1180, t, { kijk: 1 }); persoon(ctx, 'kind', 1420, GROND, 330, { t, outfit: 'zwem', kijk: -1 }); persoon(ctx, 'jens', 1580, GROND, 340, { t, outfit: 'zwem', kijk: -1, uit: 'blij' });
      persoon(ctx, 'dennis', 300, GROND, 450, { t, kijk: 1, outfit: 'jas' }); persoon(ctx, 'marieke', 520, GROND, 430, { t, kijk: 1, outfit: 'jas', uit: q.on('vragen', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
      laag(ctx, q.on('vragen', 1, 0.5), () => vraagteken(ctx, 410, 330, 1, 110)); }); } else bg(ctx, 'schema');
    laag(ctx, tB, () => { bg(ctx, 'schema'); persoon(ctx, 'jens', 330, GROND, 340, { t, outfit: 'zwem', uit: 'blij' });
      const Hj = ramp(t, q.at('hele', 1), 1.2); const M = 'JFMAMJJASOND'; for (let i = 0; i < 12; i++) { const x = 640 + i * 95; roundRect(ctx, x, 380, 80, 120, 10); shape(ctx, i < 12 * Hj ? rgba(C.teal, 0.6) : '#22304A', i < 12 * Hj ? C.teal : rgba(C.line, 0.5), 2); metaText(ctx, M[i], x + 40, 360, C.text2, 'center', 28); if (i < 12 * Hj) SP5_golfIcoon(ctx, x + 40, 440, 0.7, lighten(C.teal, 0.3)); }
      metaText(ctx, 'HET HELE JAAR', 1160, 560, C.text2, 'center', 28); laag(ctx, q.on('specialiseren', 1, 0.5), () => tag(ctx, 'SPECIALISEREN', 1160, 680, C.goud, 1, 'center', 40)); });
    laag(ctx, tC, () => { bg(ctx, 'schema'); SP5_tijdlijnen(ctx, t, 1); metaText(ctx, 'VOORBEELD', 1800, 200, C.text2, 'right', 28); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: bij de jeugd helpt het, later minder vaak', 1 - q.on('Bij', 1, 0.5));
    const Br = q.on('Breed', 2, 0.6); const T = SP5_TL;
    laag(ctx, 1 - Br, () => { SP5_tijdlijnen(ctx, t, 1);
      metaA(ctx, 'GÜLLICH E.A. 2021 · 51 ONDERZOEKEN · 6096 SPORTERS', 960, 230, q.on('eenenvijftig', 1, 0.5) * (1 - q.on('Heel', 1, 0.5)), C.grain, 'center', 28);
      const Je = q.on('jeugd', 1, 0.5), Vo = q.on('volwassen', 1, 0.5);
      laag(ctx, Je, () => { SP5_podium(ctx, SP5_ax(14), 860, 1.25, { a: 1, b: 3 }); metaText(ctx, 'JEUGD', SP5_ax(14), 680, C.text2, 'center', 28); lijn(ctx, [[SP5_ax(14), T.yAs - 16], [SP5_ax(14), T.yAs + 16]], C.goud, 5); });
      laag(ctx, Vo, () => { SP5_podium(ctx, SP5_ax(20.6), 860, 1.25, { a: 3, b: 1 }); metaText(ctx, 'VOLWASSEN · GEMIDDELD', SP5_ax(20.6) - 60, 680, C.text2, 'center', 28); lijn(ctx, [[SP5_ax(22), T.yAs - 16], [SP5_ax(22), T.yAs + 16]], C.goud, 5); });
      const Ob = q.on('overbelastingsblessures', 1, 0.5); laag(ctx, Ob * (1 - Br), () => { SP5_label(ctx, 'VAKER OVERBELASTING · EERDER GESTOPT', 420, 205, C.koraal, 1, 32); metaText(ctx, 'ASMC · JAYANTHI E.A. 2019', 1730, 280, C.grain, 'right', 28); });
      laag(ctx, q.on('samenhang', 1, 0.5) * (1 - q.on('Toch', 1, 0.5)), () => SP5_label(ctx, 'SAMENHANG ≠ OORZAAK', 1720, 120, C.goud, 1, 32, 'right'));
      const Tw = q.on('twaalf', 1, 0.5); laag(ctx, Tw, () => { const x = SP5_ax(12); ctx.save(); ctx.setLineDash([12, 10]); lijn(ctx, [[x, 300], [x, T.yAs]], C.goud, 4); ctx.restore(); tag(ctx, 'ROND 12 JAAR', x, 290, C.goud, 1, 'center', 30); }); });
    laag(ctx, Br, () => { metaText(ctx, 'BMC RES NOTES 2024 · RACEUITSLAGEN', 960, 230, C.grain, 'center', 28); const Na = q.on('Naarmate', 1, 0.8);
      const S = [['crawl', 360], ['rug', 760], ['school', 1160], ['vlinder', 1560]]; S.forEach(([sl, x], i) => SP5_slagPict(ctx, 'jens', x, 430, 220, sl, t + i * 0.2, i === 0 || i === 2 ? 1 : 1 - 0.75 * Na, 'zwem') || 0);
      ['50 M', '100 M', '200 M', '400 M'].forEach((d, i) => tag(ctx, d, 560 + i * 270, 680, C.teal, i === 1 || i === 2 ? 1 : 1 - 0.75 * Na, 'center', 32));
      laag(ctx, q.on('junior', 1, 0.5) * (1 - Na), () => tag(ctx, 'ALS JUNIOR: BREED', 960, 800, C.groen, 1, 'center', 32));
      laag(ctx, Na, () => tag(ctx, 'OUDER: STEEDS MEER KIEZEN', 960, 800, C.goud, 1, 'center', 32)); }); },

  // ---------- H4 Aanvulling of concurrent ----------
  s16(ctx, t, q) { SP5_badKant(ctx, t, { blokken: false }); const Wa = q.on('mist', 1, 0.5), Ho = q.on('Hoeveel', 1, 0.5), Wn = q.on('Wanneer', 1, 0.5), Ko = q.on('Kost', 1, 0.5);
    metaText(ctx, 'WEEK 3', 120, 140, C.text2, 'left', 28);
    sam(ctx, 260, t, { kijk: 1, uit: Ko > 0.5 ? 'verbaasd' : 'neutraal' }); trainer(ctx, 560, t, { kijk: -1, uit: 'praat' }); laag(ctx, Ko, () => vraagteken(ctx, 260, 380, 1, 110));
    const X = 860, Yb = 110, Wb = 960, P = '#1A2740'; SP5_klembord(ctx, X, Yb, Wb, 740, q.on('klembord', 1, 0.5));
    laag(ctx, Wa, () => { text(ctx, 'Wat mist het water?', X + 60, Yb + 120, fTekst(46, 800), P, 'left'); SP5_botIcoon(ctx, X + 140, Yb + 200, 1.3, C.oker); text(ctx, 'stoten', X + 210, Yb + 213, fTekst(36, 700), '#8A6A2C', 'left');
      laag(ctx, q.on('hoofd', 1, 0.4), () => { SP5_hoofdIcoon(ctx, X + 470, Yb + 196, 1.2, '#2E6F8F'); text(ctx, 'iets anders', X + 530, Yb + 213, fTekst(36, 700), '#2E6F8F', 'left'); }); });
    laag(ctx, Ho, () => { text(ctx, 'Hoeveel?', X + 60, Yb + 330, fTekst(46, 800), P, 'left'); laag(ctx, q.on('twintig', 1, 0.4), () => text(ctx, '2 × 20 min', X + 60, Yb + 400, fTekst(40, 700), '#2F6A3C', 'left'));
      laag(ctx, q.on('elke', 1, 0.4), () => { text(ctx, 'elke week iets meer', X + 330, Yb + 400, fTekst(36, 700), '#2F6A3C', 'left'); SP5_trap(ctx, X + 700, Yb + 410, 4, 30, 14, 1, '#2F6A3C'); }); });
    laag(ctx, Wn, () => { text(ctx, 'Wanneer?', X + 60, Yb + 520, fTekst(46, 800), P, 'left'); const y = Yb + 570, x0 = X + 60, w = Wb - 120;
      const He = q.on('herfst', 1, 0.5), Ka = q.on('kampioenschap', 1, 0.5); roundRect(ctx, x0, y, w, 50, 10); shape(ctx, '#D8D2C4', null);
      laag(ctx, He, () => { roundRect(ctx, x0, y, w * 0.45, 50, 10); shape(ctx, rgba(C.groen, 0.85), null); text(ctx, 'herfst: opbouw', x0 + 20, y + 36, fTekst(30, 800), P, 'left'); SP5_schoen(ctx, x0 + w * 0.4, y + 24, 0.8, '#1F4A2C'); });
      laag(ctx, Ka, () => { roundRect(ctx, x0 + w * 0.68, y, w * 0.32, 50, 10); shape(ctx, rgba(C.goud, 0.9), null); text(ctx, 'maart: kampioenschap', x0 + w * 0.69, y + 36, fTekst(28, 800), P, 'left'); kruis(ctx, x0 + w * 0.84, y + 92, 14, 1, C.koraal); SP5_schoen(ctx, x0 + w * 0.84 + 40, y + 94, 0.6, '#8A8478'); }); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: alleen als het zwemtraining of herstel opeet', 1 - q.on('Daarom', 1, 0.5));
    const Da = q.on('Daarom', 1, 0.4), Sh = q.on('schouder', 1, 0.3), Ho = q.on('houdt', 1, 0.3), Wl = q.on('doet', 1, 0.3);
    const tA = 1 - Da, tB = Da * (1 - Sh), tC = Sh * (1 - Ho), tD = Ho * (1 - Wl), tE = Wl;
    laag(ctx, tA, () => { SP5_label(ctx, 'AANVULLING', 520, 230, C.goud, 1, 40, 'center'); SP5_label(ctx, 'CONCURRENT', 1400, 230, C.koraal, 1, 40, 'center');
      const To = ramp(t, q.at('toevoegt', 1), 1.0), Op = ramp(t, q.at('opeet', 1), 1.0);
      SP5_tegel(ctx, lerp(960, 520, To), lerp(420, 400, To), 'loop', C.groen, q.on('aanvulling', 1, 0.4), 160, 76); laag(ctx, To, () => { SP5_botIcoon(ctx, 400, 500, 1.1, C.oker); text(ctx, '+', 470, 515, fTekst(40, 800), C.text, 'center'); metaText(ctx, 'WAT ZWEMMEN MIST', 520, 580, C.text2, 'center', 28); });
      laag(ctx, q.on('concurrent', 1, 0.4), () => { SP5_emmer(ctx, 960, 820, 0.62, { vul: 0.7 + 0.35 * Op, over: Op, t, tegels: [], label: 'HERSTEL' }); SP5_tegel(ctx, lerp(960, 1400, Op), lerp(560, 400, Op), 'loop', C.koraal, Op, 160, 76); });
      laag(ctx, q.on('plaats', 1, 0.5), () => { SP5_tegel(ctx, 1400, 520, 'zwem', C.teal, 0.45, 160, 76); kruis(ctx, 1400, 520, 30, 1, C.koraal); }); });
    laag(ctx, tB, () => { const x0 = 300, w = 1320, y = 420, Fa = q.on('fase', 1, 0.5); metaText(ctx, 'EEN SEIZOEN', x0, y - 40, C.text2, 'left', 28);
      [[0, 0.45, C.groen, 'OPBOUW'], [0.45, 0.25, C.goud, 'KAMPIOENSCHAP'], [0.7, 0.3, C.teal, 'RUST']].forEach(([s, l, col, lab]) => { roundRect(ctx, x0 + s * w + 4, y, l * w - 8, 70, 12); shape(ctx, rgba(col, 0.45 * Fa + 0.15), col, 2); metaText(ctx, lab, x0 + (s + l / 2) * w, y + 46, C.text, 'center', 28); });
      const Rw = q.on('rustweken', 1, 0.5); laag(ctx, Rw, () => { const cx = x0 + 0.85 * w; SP5_tegel(ctx, cx - 90, y + 160, 'fiets', C.groen, 1, 150, 70); SP5_tegel(ctx, cx + 90, y + 160, 'loop', C.groen, 1, 150, 70); tag(ctx, 'VOORBEELD', cx, y + 280, C.text2, 1, 'center', 28); naamBij(ctx, 'meer variatie', '', cx, y - 70, 1, 'center', C.groen); }); });
    laag(ctx, tC, () => { const h = 430, x = 480, r = sam(ctx, x, t, { uit: 'neutraal' }); const sx = x - 0.12 * h, sy = GROND - 0.8 * h; ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(sx, sy, 38, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'schouder', 'blessure', sx - 60, sy - 30, 1, 'right', C.koraal);
      laag(ctx, q.on('fietsen', 1, 0.5), () => SP5_tegel(ctx, 820, 520, 'fiets', C.groen, 1, 170, 80)); laag(ctx, q.on('hart', 1, 0.5), () => { SP5_hart(ctx, 820, 660, 2, C.groen); metaText(ctx, 'HART IN VORM', 820, 740, C.groen, 'center', 28); });
      trainer(ctx, 1240, t, { kijk: -1, uit: 'praat' }); laag(ctx, q.on('fysiotherapeut', 1, 0.5), () => kaartTekst(ctx, 1400, 300, 420, 110, '', ['fysiotherapeut'], 1, C.teal)); });
    laag(ctx, tD, () => { SP5_klembord(ctx, 160, 200, 640, 600, 1); const P = '#1A2740'; [['tijden', 'tijden'], ['moe', 'moeheid'], ['pijn', 'pijn']].forEach(([w, lab], i) => { const y = 360 + i * 140, v = q.on(w, 1, 0.4); roundRect(ctx, 230, y - 44, 56, 56, 8); shape(ctx, '#FFFFFF', '#8A8478', 2); vink_(ctx, 258, y - 18, 18, v, '#2F6A3C'); text(ctx, lab, 320, y, fTekst(46, 800), P, 'left'); });
      const Ac = q.on('achteruit', 1, 0.8); SP5_tijdGrafiek(ctx, 1000, 280, 760, 380, ramp(t, q.at('tijden', 1), 4), Ac, 1);
      const Te = q.on('terug', 1, 0.6); for (let i = 0; i < 3; i++) SP5_tegel(ctx, 1220 + i * 160, 790, 'loop', C.groen, 1 - Te * (i > 0 ? 1 : 0.6), 130, 60); });
    laag(ctx, tE, () => { const Y = 640, L = 300, x = 300 + ((t - q.at('doet', 1)) * 160) % 1400; ctx.fillStyle = SP5.water; ctx.fillRect(0, Y, W, 240); zwemmer(ctx, 'sam', x, Y + 0.12 * L, L, { slag: 'crawl', t, kijk: 1 }); SP5_waterlijn(ctx, 0, W, Y, t, 1);
      kaart(ctx, 360, 230, 1200, 220, 1, C.teal); text(ctx, 'Sneller in het water', 960, 320, fTekst(56, 800), C.text, 'center'); text(ctx, '= zwemtraining', 960, 400, fTekst(56, 800), C.teal, 'center'); metaText(ctx, 'TANAKA 1994', 1540, 500, C.grain, 'right', 28); }); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const v = gangSnelheid('sam', 360, 'ren', 0.85);
    // herfstbomen die voorbijschuiven
    for (let i = 0; i < 7; i++) { const x = ((i * 330 - t * v * 0.5) % 2310 + 2310) % 2310 - 200, kl = SP5.herfst[i % 4]; ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 10, 560, 20, 300); ctx.beginPath(); ctx.ellipse(x, 520, 110, 130, 0, 0, 6.283); ctx.fillStyle = rgba(kl, 0.75); ctx.fill(); }
    ctx.fillStyle = SP5.gras; ctx.fillRect(0, 820, W, 60); ctx.fillStyle = SP5.pad; ctx.fillRect(0, 846, W, 34);
    for (let i = 0; i < 14; i++) { const x = ((i * 157 - t * 60) % 2000 + 2000) % 2000, y = (i * 97 + t * 50) % 820; ctx.save(); ctx.translate(x, y); ctx.rotate(t + i); ctx.fillStyle = SP5.herfst[i % 4]; ctx.beginPath(); ctx.ellipse(0, 0, 10, 5, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    persoon(ctx, 'daan', 560, GROND, 350, { t: t + 0.3, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    persoon(ctx, 'sam', 900, GROND, 360, { t, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    persoon(ctx, 'bilal', 1240, GROND, 370, { t: t + 0.55, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    SP5_label(ctx, 'HART: DOET DEELS MEE', 100, 90, C.groen, q.on('hart', 1, 0.4), 32); SP5_label(ctx, 'ZWEMSPIEREN: ALLEEN DOOR ZWEMMEN', 100, 180, C.groen, q.on('zwemspieren', 1, 0.4), 32);
    SP5_label(ctx, 'BOTTEN: STERKER VAN STOTEN', 100, 270, C.oker, q.on('botten', 1, 0.4), 32);
    SP5_label(ctx, 'LANGZAAM OPBOUWEN', 1820, 90, C.koraal, q.on('langzaam', 1, 0.4), 32, 'right'); SP5_label(ctx, 'WAT · HOEVEEL · WANNEER', 1820, 180, C.goud, q.on('kiest', 1, 0.4), 32, 'right'); },

  s20(ctx, t, q) { bg(ctx, 'schema'); trainer(ctx, 330, t, { kijk: 1, uit: 'blij', h: 480 });
    kaartTekst(ctx, 680, 110, 1120, 150, 'SPORTBOND', ['trainerscursussen'], q.on('sportbond', 1, 0.5), C.teal);
    kaartTekst(ctx, 680, 300, 1120, 210, 'HBO · SPORTKUNDE', ['HAN Nijmegen · 4 jaar', 'o.a. trainingskunde'], q.on('hbo', 1, 0.5), C.groen);
    kaartTekst(ctx, 680, 550, 1120, 150, 'WO · BEWEGINGSWETENSCHAPPEN', ['o.a. VU Amsterdam · RUG Groningen'], q.on('bachelor', 1, 0.5), C.goud);
    metaA(ctx, '2026', 1800, 760, q.on('bachelor', 1, 0.5), C.grain, 'right', 28); }
});

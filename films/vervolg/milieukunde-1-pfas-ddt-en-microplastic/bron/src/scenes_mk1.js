// Wat word jij? · Milieukunde 1 · PFAS, DDT en microplastic — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Thijs, stagiair, outfit 'stage'; Milieukundige Iris; buurman Joost; Daan alleen op een fotootje).
// Decor 'buurtuin' (Joosts tuin met kippenren en de plas met het zeearendnest) alleen in de cold open, H2-tuin en de recap.
// Kantoor van de omgevingsdienst en het lab op navy (keuring). Geen echte plaatsnaam of fabrieksnaam in beeld.

function thijs(ctx, x, t, o = {}) { return persoon(ctx, 'thijs', x, GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: o.hand ? 'stageHand' : 'stage', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function iris(ctx, x, t, o = {}) { return persoon(ctx, 'iris', x, GROND, o.h || 445, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: o.outfit || 'veld', a: o.a == null ? 1 : o.a, hold: o.hold }); }
const eiInHand = (r = 18, kl = '#C9925E') => (c, hx, hy) => ei(c, hx + 4, hy - r * 0.9, r, kl);
// tuin in doorsnede: gras, grond (oker) met stippen, kip, ei
function tuinVak(ctx, x, y, w, gStip, eStip, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const gh = o.gh || 200;
  roundRect(ctx, x, y, w, gh, 12); shape(ctx, rgba(C.oker, 0.28), rgba(C.oker, 0.8), 2); ctx.fillStyle = rgba(C.groen, 0.55); ctx.fillRect(x, y - 14, w, 16);
  for (let i = 0; i < gStip; i++) circ(ctx, x + 30 + hash(i * 3.1 + (o.seed || 0)) * (w - 60), y + 30 + hash(i * 5.7 + (o.seed || 0)) * (gh - 60), 7, C.oker, _bioDonker(C.oker, 0.3), 1);
  kipEcht(ctx, x + w * 0.38, y - 120, 0.95, { t: o.t || 0 }); ei(ctx, x + w * 0.78, y - 40, 32, '#C9925E', 1, { stip: eStip });
  if (o.kop) text(ctx, o.kop, x + w / 2, y + gh + 50, fTekst(36, 700), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { zeearend(ctx, 1640, 540, 0.85, { kijk: -1, t, slag: 0.12, stip: 9 }); druppel(ctx, 1300, 800, 34, 1, 1); vis(ctx, 1600, 800, 170, 'voorn', { t, stip: 3 });
    pijl(ctx, 1360, 800, 1470, 800, C.line, 0.8, 3, 14); pijl(ctx, 1640, 740, 1640, 660, C.line, 0.8, 3, 14); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'buurtuin', 0.6);
    const Jo = q.on('buurman', 1, 0.3), Ir = q.on('milieukundige', 1, 0.3), Z = q.on('zeearend', 1, 0.3), Vr = q.on('Hoe', 1, 0.5);
    const kijkOp = Z > 0.5;
    laag(ctx, 1 - ramp(t, q.at('Hoe', 1) - 0.7, 0.5), () => {
      persoon(ctx, 'joost', 560, GROND, 450, { t, kijk: 1, uit: 'blij', pose: 'staan', a: Jo });
      const rT = thijs(ctx, 900, t, { hand: true, pose: q.on('milieukundige', 1) < 0.5 ? 'wijsOmhoog' : 'vasthouden', uit: kijkOp ? 'verbaasd' : 'blij', kijk: 1, hold: q.on('milieukundige', 1) < 0.5 ? null : eiInHand(22, '#D8A06A') }); if (rT.handR && q.on('milieukundige', 1) < 0.5) ei(ctx, rT.handR.x + 4, rT.handR.y - 22, 22, '#D8A06A');
      iris(ctx, 1230, t, { pose: 'vasthouden', kijk: -1, a: Ir, hold: (c, hx, hy) => { koeltas(c, hx, hy + 74, 0.62); etiket(c, hx - 18, hy + 26, 0.8, 1, -0.2); } });
      naamBij(ctx, 'Thijs', 'STAGIAIR', 900, 372, 1 - q.on('Boven', 1, 0.5), 'center');
      naamBij(ctx, 'Milieukundige Iris', 'OMGEVINGSDIENST', 1230, 362, Ir * (1 - q.on('Boven', 1, 0.5)), 'center');
      naamBij(ctx, 'Joost', 'BUURMAN', 560, 352, Jo * (1 - q.on('Boven', 1, 0.5)), 'center');
      metaA(ctx, 'VOOR HET LAB', 900, 312, q.on('lab', 1, 0.4) * (1 - q.on('milieukundige', 1, 0.4)), C.goud, 'center', 28); });
    // zeearend vliegt van het nest over de plas naar links
    const tz = q.at('zeearend', 1), u = clamp((t - tz + 1.2) / 9, 0, 1), ax = lerp(NEST[0] + 40, 380, ease(u)), ay = lerp(NEST[1] + 30, 300, Math.sin(u * 2.4) * 0.6 + u * 0.4);
    zeearend(ctx, ax, ay, 0.5, { kijk: -1, t, slag: 0.2, a: Z, stip: Math.round(q.on('gifstoffen', 1, 1.2) * 14) });
    const Wt = q.on('water', 1, 0.4) * (1 - Vr); laag(ctx, Wt, () => { druppel(ctx, 1080, 560, 26, 1, 1); metaText(ctx, 'WATER', 1080, 628, C.teal, 'center', 28); });
    laag(ctx, q.on('gifstoffen', 1, 0.4) * (1 - Vr), () => metaText(ctx, 'ZEEAREND', ax, ay + 70, C.goud, 'center', 28));
    laag(ctx, Vr, () => { kaart(ctx, 200, 240, 1180, 330, 1, C.goud); text(ctx, 'Waarom zit er meer in de arend', 250, 350, fTekst(56, 800), C.text, 'left'); text(ctx, 'dan in het water waar hij vist?', 250, 430, fTekst(56, 800), C.text, 'left');
      metaText(ctx, 'PFAS · DDT · MICROPLASTIC', 250, 510, C.goud, 'left', 28); vraagteken(ctx, 1300, 520, 1, 130); }); },

  // ---------- H1 Afbreekbaar of persistent ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const tK = q.at('kijkt', 1), B = ramp(t, tK - 0.4, 0.6);
    laag(ctx, 1 - B, () => { const r = thijs(ctx, 520, t, { pose: q.on('broer', 1) > 0.5 && q.on('lijst', 1) < 0.5 ? 'wijs' : 'staan', uit: 'blij', kijk: 1 });
      if (r.hoofd) badge(ctx, r.hoofd.x + 10, r.hoofd.y + r.hoofd.r * 4.6, 1.2, 1); tag(ctx, 'SNUFFELSTAGE · OMGEVINGSDIENST', 520, 360, C.teal, 1, 'center', 30); naamBij(ctx, 'Thijs', 'STAGIAIR', 520, 290, 1, 'center');
      laag(ctx, q.on('broer', 1, 0.3) * (1 - q.on('lijst', 1, 0.3)), () => { fotoTelefoon(ctx, 980, 520, 1.0); metaText(ctx, 'DAAN · TWEELINGBROER', 980, 720, C.grain, 'center', 28);
        laag(ctx, q.on('stoffen', 1, 0.3), () => { pfasMol(ctx, 1380, 470, 1.6, -0.2); ddtMol(ctx, 1420, 610, 1.4); metaText(ctx, 'IK TEL STOFFEN', 1400, 720, C.goud, 'center', 28); }); });
      const L = q.on('lijst', 1, 0.4); iris(ctx, 1600, t, { outfit: 'kantoor', kijk: -1, a: L, uit: 'blij' });
      klembord(ctx, 900, 300, 520, 'TE ONDERZOEKEN', [['DDT', q.on('DDT', 1, 0.3)], ['PFAS', q.on('PFAS', 1, 0.3)], ['microplastic', q.on('microplastic', 1, 0.3)]], L, { lh: 80, px: 44 });
      filmKaartje(ctx, 900, 790, 'Eén aarde · persistent', q.on('aarde', 1, 0.4)); });
    laag(ctx, B, () => { metaText(ctx, 'HOE LANG BLIJFT HET?', 160, 220, C.goud, 'left', 28); metaText(ctx, 'TIJD →', 1700, 220, C.text2, 'right', 28);
      const rij = (y, naam, kl, mol, soort, cue, n, lab, meta) => { const A = q.on(cue, n, 0.4); if (A <= 0.01) return; laag(ctx, A, () => { text(ctx, naam, 160, y + 14, fTekst(44, 800), kl, 'left'); mol(430, y); tijdBalk(ctx, 600, y, 1100, soort, clamp((t - q.at(cue, n)) / 2.5, 0, 1), 1, t);
        metaText(ctx, lab, 600, y + 86, kl, 'left', 28); if (meta) metaText(ctx, meta, 1700, y + 86, C.text2, 'right', 28); }); };
      rij(330, 'DDT', DDTK, (x, y) => ddtMol(ctx, x + 10, y + 6, 1.1), 'ddt', 'DDT', 2, 'BODEM: JAREN TOT TIENTALLEN JAREN VOOR DE HELFT', 'ATSDR');
      laag(ctx, q.on('tientallen', 1, 0.5), () => { metaText(ctx, 'IN HET LICHAAM → DDE', 1700, 296, DDTK, 'right', 28); });
      rij(540, 'PFAS', C.oker, (x, y) => pfasMol(ctx, x + 10, y, 1.2), 'pfas', 'PFAS', 2, 'BREEKT BIJNA NIET AF', '');
      rij(750, 'microplastic', '#C9CED6', (x, y) => { ctx.fillStyle = MPK; ctx.fillRect(x - 6, y - 16, 34, 26); }, 'mp', 'microplastic', 2, 'VALT UIT ELKAAR IN KLEINERE STUKJES · < 5 MM', ''); }); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const Ap = q.on('apparaat', 1, 0.6), Wk = ramp(t, q.at('Bij', 1) - 0.3, 0.6);
    // fase A: twee eieren
    laag(ctx, 1 - Ap, () => { const J = q.on('buurman', 1, 0.4), Wi = q.on('winkel', 1, 0.4); metaText(ctx, 'LAB · OMGEVINGSDIENST', 160, 220, C.text2, 'left', 28);
      ei(ctx, 700, 520, 90, '#C9925E'); etiket(ctx, 700, 640, 2.4, J); laag(ctx, J, () => text(ctx, 'Joost', 700, 760, fTekst(44, 800), C.text, 'center')); metaA(ctx, 'BUURMAN', 700, 800, J, C.grain, 'center', 28);
      ei(ctx, 1220, 520, 90, '#E8D8B8'); etiket(ctx, 1220, 640, 2.4, Wi); laag(ctx, Wi, () => { text(ctx, 'winkel', 1220, 760, fTekst(44, 800), C.text, 'center'); metaText(ctx, 'SUPERMARKT', 1220, 800, C.grain, 'center', 28); }); });
    // fase B: het apparaat
    laag(ctx, Ap * (1 - Wk), () => { ei(ctx, 230, 380, 44, '#C9925E'); ei(ctx, 230, 520, 44, '#E8D8B8'); metaText(ctx, 'JOOST', 300, 392, C.text2, 'left', 28); metaText(ctx, 'WINKEL', 300, 532, C.text2, 'left', 28);
      apparaat(ctx, 560, 240, 840, 420, q.on('sorteert', 1, 0.8), t); metaA(ctx, 'SORTEERT MOLECULEN OP GEWICHT · VEREENVOUDIGD', 980, 700, q.on('sorteert', 1), C.text2, 'center', 28);
      laag(ctx, q.on('nanogrammen', 1, 0.4), () => { kaart(ctx, 1450, 300, 400, 280, 1, C.goud); text(ctx, '1 nanogram', 1480, 380, fTekst(46, 800), C.goud, 'left'); text(ctx, '= een miljardste', 1480, 450, fTekst(36, 700), C.text, 'left'); text(ctx, 'gram', 1480, 500, fTekst(36, 700), C.text, 'left'); metaText(ctx, '0,000 000 001 G', 1480, 550, C.text2, 'left', 28); }); });
    // fase C: de uitslagen
    laag(ctx, Wk, () => { uitslag(ctx, 140, 230, 760, 470, 'EI VAN JOOST', 0.85, { seed: 2 }); const g = uitslag(ctx, 1020, 230, 760, 470, 'WINKELEI', 0.04, { seed: 5, grens: q.on('bepalingsgrens', 1, 0.5) });
      ei(ctx, 830, 290, 26, '#C9925E'); ei(ctx, 1710, 290, 26, '#E8D8B8');
      laag(ctx, q.on('PFOA', 1, 0.4), () => { tag(ctx, 'PFOA: < bepalingsgrens', 1400, 790, C.goud, 1, 'center', 34); metaText(ctx, 'PFOA = EEN VAN DE PFAS', 1400, 850, C.text2, 'center', 28); });
      laag(ctx, q.on('bepalingsgrens', 1, 0.4), () => { metaText(ctx, 'BEPALINGSGRENS', g.gx + g.gw - 6, g.gr - 12, C.goud, 'right', 28); vraagteken(ctx, 1400, 500, 1, 100); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder dan het lab goed kan meten', 1);
    const F = ramp(t, q.at('schrijft', 1) - 0.3, 0.5), D = ramp(t, q.at('Duits', 1) - 0.2, 0.4), Dw = ramp(t, q.at('Duits', 1) - 0.7, 0.4), J = q.on('buurman', 1, 0.5);
    laag(ctx, 1 - F * (1 - ramp(t, q.at('Duits', 1) + 0.1, 0.4)), () => uitslag(ctx, 140, 230, 760, 470, 'EI VAN JOOST', 0.85, { seed: 2, grens: 1, piekKl: J > 0.5 ? C.goud : C.text, rand: J > 0.5 ? C.goud : null }));
    laag(ctx, F * (1 - ramp(t, q.at('Duits', 1) - 0.6, 0.4)), () => { ei(ctx, 520, 470, 110, '#E8D8B8'); metaText(ctx, 'WINKELEI', 520, 650, C.text2, 'center', 28); });
    laag(ctx, J, () => { tag(ctx, 'ruim boven de grens', 520, 790, C.goud, 1, 'center', 34); });
    // rechts: winkelei, de grens uitgelegd
    laag(ctx, 1 - Dw, () => { const K = q.on('kleinste', 1, 0.5); laag(ctx, 1 - F, () => { const g = uitslag(ctx, 1020, 230, 760, 470, 'WINKELEI', 0.04, { seed: 5, grens: 1, rand: K > 0.5 && F < 0.5 ? C.goud : null });
      metaText(ctx, 'BEPALINGSGRENS', g.gx + g.gw - 6, g.gr - 12, C.goud, 'right', 28);
      laag(ctx, q.on('niets', 1, 0.4) * (1 - F), () => { const zone = (y0, y1) => { ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(g.gx + 2, y0, g.gw - 4, y1 - y0); }; zone(g.gr, g.gy - 2); metaText(ctx, 'HIER: NIETS …', g.gx + 20, g.gr + 40, C.text, 'left', 28); });
      laag(ctx, q.on('beetje', 1, 0.4) * (1 - F), () => { metaText(ctx, '… OF EEN HEEL KLEIN BEETJE', g.gx + 20, g.gr + 78, C.text, 'left', 28); });
      laag(ctx, q.on('beetje', 1, 0.5) * (1 - F), () => { metaText(ctx, 'WFSR-LAB: 0,025 NANOGRAM PER GRAM', 1400, 790, C.goud, 'center', 28); metaText(ctx, 'WFSR · BERENDSEN E.A. 2020', 1400, 836, C.text2, 'center', 28); }); });
      // het formulier van Thijs
      laag(ctx, F, () => { kaart(ctx, 1000, 230, 640, 470, 1, C.goud); roundRect(ctx, 1030, 260, 580, 410, 10); shape(ctx, '#F2EEE4', null);
        text(ctx, 'Meetformulier', 1060, 320, fTekst(36, 800), '#5A6478', 'left'); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(1060, 400 + i * 90); ctx.lineTo(1580, 400 + i * 90); ctx.stroke(); }
        text(ctx, 'monster: winkelei', 1060, 388, fTekst(34, 700), '#2A3446', 'left'); text(ctx, 'stof: PFOA', 1060, 478, fTekst(34, 700), '#2A3446', 'left');
        laag(ctx, q.on('minder', 1, 0.4), () => { text(ctx, '< 0,025 ng/g', 1060, 570, fTekst(48, 800), '#B8462E', 'left'); text(ctx, 'niet 0', 1440, 570, fTekst(34, 700), '#7A8494', 'left'); });
        thijs(ctx, 1760, t, { h: 400, kijk: -1, pose: 'wijs', uit: 'blij' }); }); });
    laag(ctx, D * (1 - J) * 1, () => echtKaart(ctx, 1020, 230, 800, 'DUITSLAND · MONITORING 2024', [['± 3 van de 4 eieren:', q.on('drie', 1)], ['onder de bepalingsgrens', q.on('meten', 2)]], 'BfR 2025', 1, { lh: 54, px: 40, extraH: 160,
      teken: (x, y) => { for (let i = 0; i < 4; i++) ei(ctx, x + 110 + i * 150, y + 70, 36, i < 3 ? '#9AA3B2' : '#C9925E', q.on('vier', 1, 0.4 + i * 0.15)); metaA(ctx, 'ONDER DE GRENS', x + 260, y + 140, q.on('vier', 1, 0.6), C.text2, 'center', 28); metaA(ctx, 'GEMETEN', x + 560, y + 140, q.on('vier', 1, 0.6), C.text2, 'center', 28); } }));
    laag(ctx, D * J, () => echtKaart(ctx, 1020, 230, 800, 'DUITSLAND · MONITORING 2024', ['± 3 van de 4 eieren:', 'onder de bepalingsgrens'], 'BfR 2025', 0.5, { lh: 54, px: 40, extraH: 160, teken: (x, y) => { for (let i = 0; i < 4; i++) ei(ctx, x + 110 + i * 150, y + 90, 40, i < 3 ? '#9AA3B2' : '#C9925E'); } })); },

  // ---------- H2 Bioaccumulatie ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('dier', 1, 0.4), V = q.on('DDT', 1, 0.5), Wz = q.on('Waar', 3, 0.5);
    kipEcht(ctx, 520, 560, 2.6, { t, kijkje: kipKijkje({ vet: V }, V) });
    laag(ctx, q.on('monster', 1, 0.3) * (1 - q.on('DDT', 1, 0.3)), () => { iris(ctx, 1500, t, { outfit: 'kantoor', kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => potje(c, hx, hy + 60, '', 1, { w: 70, h: 80 }) }); metaText(ctx, 'WAAR NEEM JE HET MONSTER?', 1500, 330, C.goud, 'center', 28); });
    const vx = 520 + KIP_ANKER.vet[0] * 2.6, vy = 560 + KIP_ANKER.vet[1] * 2.6;
    zoomCircle(ctx, 1330, 430, 230, vx, vy, 'VETWEEFSEL · VERGROOT', V * (1 - Wz), () => { ctx.fillStyle = '#1A1A22'; ctx.fillRect(1100, 200, 460, 460); vetDruppel(ctx, 1330, 470, 150, 1, q.on('vet', 1));
      const n = 3 + Math.round(q.on('hoopt', 1, 1.6) * 5); for (let i = 0; i < n; i++) { const tz = q.at('lost', 1) + i * 0.3, u = clamp((t - tz) / 1.6, 0, 1); const sx = 1180 + hash(i * 3) * 300, sy = lerp(240, 400 + hash(i * 7) * 140, ease(u)); ddtMol(ctx, sx, sy, 0.75, hash(i) * 2, u > 0 ? 1 : 0); } });
    laag(ctx, V * (1 - Wz), () => naamBij(ctx, 'DDT', 'LOST OP IN VET', 1330, 760, 1, 'center', DDTK));
    laag(ctx, Wz, () => { [['vet', 1170], ['bloed', 1420], ['bot', 1670]].forEach(([n, x], i) => potje(ctx, x, 640, n, 1, { w: 150, h: 170, inhoud: (cx, cy) => { if (i === 0) vetDruppel(ctx, cx, cy, 40, 1); else if (i === 1) for (let k = 0; k < 4; k++) rodeCel(ctx, cx - 30 + k * 20, cy - 10 + (k % 2) * 24, 18, k * 0.6); else { ctx.fillStyle = '#E8E2D4'; roundRect(ctx, cx - 50, cy - 10, 100, 24, 10); ctx.fill(); } } }));
      pfasMol(ctx, 1420, 300, 1.5, 0); vraagteken(ctx, 1640, 340, 1, 110); metaText(ctx, 'PFAS', 1420, 380, C.oker, 'center', 28); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: in het bloed en de lever', 1); const B = q.on('bloed', 1, 0.4), L = q.on('lever', 1, 0.4), M = ramp(t, q.at('meet', 1) - 0.3, 0.6);
    kipEcht(ctx, 640, 580, 2.4, { t, kijkje: kipKijkje({ bloed: B, lever: L }, 1) });
    laag(ctx, B, () => naamBij(ctx, 'bloed', '', 640 + KIP_ANKER.bloed[0] * 2.4, 580 + KIP_ANKER.bloed[1] * 2.4 - 40, 1, 'center', C.goud));
    laag(ctx, L, () => naamBij(ctx, 'lever', '', 640 + KIP_ANKER.lever[0] * 2.4 + 70, 580 + KIP_ANKER.lever[1] * 2.4 + 40, 1, 'left', C.goud));
    const bx = 640 + KIP_ANKER.bloed[0] * 2.4, by = 580 + KIP_ANKER.bloed[1] * 2.4, H = q.on('haken', 1, 0.5), Br = q.on('breekt', 1, 0.5);
    zoomCircle(ctx, 1320, 420, 230, bx, by, H > 0.5 ? 'BLOEDPLASMA · VERGROOT' : 'VET · VERGROOT', 1 - M, () => { ctx.fillStyle = '#1A1A22'; ctx.fillRect(1090, 190, 460, 460);
      laag(ctx, 1 - H, () => { vetDruppel(ctx, 1320, 440, 130, 1); for (let i = 0; i < 5; i++) { const an = i * 1.25 + t * 0.4; pfasMol(ctx, 1320 + Math.cos(an) * 175, 440 + Math.sin(an) * 175, 0.65, an + 1.6); } });
      laag(ctx, H, () => { rodeCel(ctx, 1150, 300, 42, 0.4); rodeCel(ctx, 1480, 560, 42, -0.3); const P = albumine(ctx, 1320, 420, 110, 1, t);
        const n = 2 + Math.round(Br * 2); ALB_PLEK.slice(0, n).forEach((k, i) => { const p = P[k], dx = p[0] - 1320, dy = p[1] - 420, d = Math.hypot(dx, dy); const u = i < 2 ? clamp((t - q.at('haken', 1) - i * 0.4) / 1.2, 0, 1) : clamp((t - q.at('kwijt', 1) - (i - 2) * 0.5) / 1.2, 0, 1);
          pfasMol(ctx, p[0] + dx / d * lerp(160, 36, ease(u)), p[1] + dy / d * lerp(160, 36, ease(u)), 0.62, Math.atan2(dy, dx) + Math.PI); }); } ); });
    laag(ctx, H * (1 - M), () => naamBij(ctx, 'albumine', 'EIWIT IN HET BLOED', 1570, 330, 1, 'left', EIWIT));
    // in en uit: veel erin, heel weinig eruit
    laag(ctx, q.on('langzaam', 1, 0.3), () => { pijl(ctx, 120, 400, 330, 450, C.oker, 1, 12, 30); metaText(ctx, 'ERIN', 120, 380, C.oker, 'left', 28); pijl(ctx, 330, 620, 160, 660, C.oker, 1, 3, 12); metaText(ctx, 'ERUIT:', 120, 712, C.oker, 'left', 28); metaText(ctx, 'HEEL LANGZAAM', 120, 748, C.oker, 'left', 28); });
    laag(ctx, q.on('bioaccumulatie', 1, 0.5) * (1 - M), () => termKaart(ctx, 1020, 700, 820, 'bioaccumulatie', 'OPHOPEN IN ÉÉN LICHAAM', 1));
    laag(ctx, M, () => { termKaart(ctx, 1020, 700, 820, 'bioaccumulatie', 'OPHOPEN IN ÉÉN LICHAAM', 1); metaText(ctx, 'MONSTER NEMEN', 1180, 250, C.goud, 'left', 28);
      laag(ctx, q.on('bloed', 2, 0.4), () => { bloedBuis(ctx, 1260, 560, 2.2); for (let k = 0; k < 5; k++) circ(ctx, 1252 + (k % 2) * 18, 470 + Math.floor(k / 2) * 22, 6, C.oker); text(ctx, 'bloed', 1260, 640, fTekst(40, 700), C.text, 'center'); });
      laag(ctx, q.on('of', 1, 0.4), () => { ei(ctx, 1600, 480, 70, '#C9925E', 1, { stip: 6 }); text(ctx, 'ei', 1600, 640, fTekst(40, 700), C.text, 'center'); }); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('grond', 1, 0.5), E = q.on('eieren', 1, 0.5), Hv = q.on('Hoe', 1, 0.5);
    metaText(ctx, 'DRIE TUINEN VERGELEKEN', 160, 220, C.goud, 'left', 28); metaText(ctx, 'SCHEMATISCH', 1760, 220, C.text2, 'right', 28);
    const tuinen = [[160, 18, 4, 'tuin 1'], [720, 9, 9, 'tuin 2'], [1280, 3, 7, 'tuin 3']];
    tuinen.forEach(([x, gs, es, kop], i) => tuinVak(ctx, x, 560, 480, Math.round(gs * Math.max(0.2, G)), Math.round(es * E), 1, { t: t + i, seed: i * 11, kop, gh: 200 }));
    laag(ctx, G * (1 - E), () => tag(ctx, 'meer PFAS in de grond', 400, 860, C.oker, 1, 'center', 30));
    laag(ctx, E * (1 - Hv), () => tag(ctx, 'niet vanzelf meer in het ei', 960, 300, C.koraal, 1, 'center', 32));
    laag(ctx, Hv, () => { pijl(ctx, 1460, 640, 1660, 540, C.goud, 1, 5, 18); vraagteken(ctx, 1600, 470, 1, 90); }); },

  s12(ctx, t, q) { const R = ramp(t, q.at('RIVM', 1) - 0.4, 0.7);
    decor(ctx, 'buurtuin', 0.6 * (1 - clamp(R * 2, 0, 1)));
    antwoord(ctx, 'antwoord a: de kip pikt wormen uit de grond', 1);
    laag(ctx, 1 - clamp(R * 2, 0, 1), () => { const Wm = q.on('regenworm', 1, 0.4), Ho = q.on('houdt', 1, 1.0), Kp = q.on('kip', 1, 0.3), Pk = q.on('pikt', 1, 0.3), Ei = q.on('ei', 1, 0.4), Rv = q.on('via', 1, 0.5), Rs = q.on('rechtstreeks', 1, 0.5);
      // grond in doorsnede
      roundRect(ctx, 120, 600, 1680, 240, 14); shape(ctx, rgba(C.oker, 0.28), rgba(C.oker, 0.8), 2); ctx.fillStyle = rgba(C.groen, 0.55); ctx.fillRect(120, 586, 1680, 16);
      for (let i = 0; i < 26; i++) circ(ctx, 160 + hash(i * 3.1) * 1600, 640 + hash(i * 5.7) * 170, 7, C.oker, _bioDonker(C.oker, 0.3), 1);
      metaText(ctx, 'GROND', 150, 820, C.oker, 'left', 28);
      const wy = 700 + Math.sin(t * 1.5) * 6, wx = 560 + Math.sin(t * 0.9) * 10; laag(ctx, Wm * (1 - Pk), () => regenworm(ctx, [[wx - 90, wy + 6], [wx - 45, wy - 8], [wx, wy + 5], [wx + 45, wy - 6], [wx + 85, wy + 2]], 1, { r: 8, stip: Math.round(Ho * 8) }));
      laag(ctx, Wm * (1 - Pk), () => naamBij(ctx, 'regenworm', 'EET GROND', wx, wy - 50, 1, 'center', C.text));
      // de kip pikt de worm
      const tp = q.at('pikt', 1), pk = t > tp && t < tp + 2.4; laag(ctx, Kp, () => { kipEcht(ctx, 760, 586 - 106 * 0.55, 0.55, { t: pk ? ((t - tp) / 1.2) % 1 : t * 0.8, houding: pk ? 'pikken' : (t > tp ? 'staan' : 'lopen') }); naamBij(ctx, 'kip', 'SCHARRELT BUITEN', 760, 420, 1 - Pk, 'center'); });
      laag(ctx, Pk, () => regenworm(ctx, [[830, 582], [856, 576], [882, 582]], 1 - clamp((t - q.at('pikt', 1) - 1.0) / 0.4, 0, 1), { r: 4, stip: 2 }));
      laag(ctx, Ei, () => { ei(ctx, 1250, 500, 56, '#C9925E', 1, { stip: 7 }); naamBij(ctx, 'ei', '', 1250, 610, 1, 'center'); });
      // de route
      laag(ctx, Rv, () => { pijl(ctx, 600, 680, 730, 600, C.goud, 1, 5, 18); pijl(ctx, 860, 500, 1150, 490, C.goud, 1, 5, 18);
        metaText(ctx, 'GROND → WORM → KIP → EI', 1100, 300, C.goud, 'left', 28); metaText(ctx, 'ARCADIS 2024 · VIER GEMEENTEN IN ZUID-HOLLAND', 1100, 340, C.text2, 'left', 28); metaText(ctx, 'RIVM 2026 · 10 PLEKKEN', 1100, 380, C.text2, 'left', 28); });
      laag(ctx, Rs, () => { stippel(ctx, 1300, 600, 1300, 572, C.text2, 1, 3); stippel(ctx, 1500, 610, 1330, 540, C.text2, 0.8, 2); metaText(ctx, 'RECHTSTREEKS: VEEL MINDER', 1520, 580, C.text2, 'left', 28); }); });
    laag(ctx, clamp(R * 2 - 1, 0, 1), () => { const s = 210, x0 = 330, y0 = 225; nederland(ctx, x0, y0, s, { stippen: q.on('zestig', 1, 1.2), koraal: q.on('eenendertig', 1, 0.4) });
      metaText(ctx, 'RIVM 2025 · EIERONDERZOEK', 160, 860, C.text2, 'left', 28); metaText(ctx, 'STIPPEN SCHEMATISCH', 160, 820, C.text2, 'left', 28);
      laag(ctx, q.on('zestig', 1, 0.4), () => { text(ctx, '60 plekken', 1020, 300, fTekst(48, 800), C.text, 'left'); });
      laag(ctx, q.on('eenendertig', 1, 0.4), () => { circ(ctx, 1040, 368, 14, C.koraal, '#121A26', 2); text(ctx, 'op 31:', 1070, 384, fTekst(48, 800), C.koraal, 'left'); });
      laag(ctx, q.on('eenendertig', 1, 0.4), () => { text(ctx, 'minder dan 1 ei per week', 1020, 450, fTekst(40, 700), C.text, 'left'); text(ctx, 'al te veel', 1020, 500, fTekst(40, 700), C.text, 'left'); });
      laag(ctx, q.on('advies', 1, 0.4), () => { kaart(ctx, 1000, 560, 820, 130, 1, C.koraal); metaText(ctx, 'ADVIES · RIVM 2025', 1030, 606, C.koraal, 'left', 28); text(ctx, 'geen eieren van hobbykippen', 1030, 664, fTekst(40, 800), C.text, 'left'); });
      laag(ctx, q.on('winkel', 1, 0.4), () => { kaart(ctx, 1000, 710, 820, 110, 1, C.groen); vink_(ctx, 1050, 765, 18, 1, C.groen); text(ctx, 'eieren uit de winkel: wel', 1090, 780, fTekst(40, 800), C.text, 'left'); }); }); },

  // ---------- H3 Biomagnificatie ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const tM = q.at('aantonen', 1), B = ramp(t, tM - 0.3, 0.6), Cg = ramp(t, q.at('zet', 1) - 0.4, 0.6);
    laag(ctx, 1 - B, () => { metaText(ctx, 'KORTE KETEN', 160, 220, C.goud, 'left', 28);
      const kol = [[340, 'grond', 3, q.on('grond', 1, 0.4)], [760, 'worm', 12, q.on('wormen', 1, 0.4)], [1180, 'ei', 6, q.on('eieren', 1, 0.4)]];
      kol.forEach(([x, n, st, a], i) => { potje(ctx, x, 620, n, Math.max(0.3, a), { w: 220, h: 260, stip: Math.round(st * a), inhoud: (cx, cy) => { if (i === 0) { ctx.fillStyle = rgba(C.oker, 0.35); ctx.fillRect(cx - 110, cy - 20, 220, 200); } } });
        if (i === 1) regenworm(ctx, [[x - 70, 420], [x - 20, 404], [x + 30, 420], [x + 70, 408]], Math.max(0.3, a), { r: 9 }); if (i === 2) ei(ctx, x, 410, 34, '#C9925E', Math.max(0.3, a)); if (i < 2) pijl(ctx, x + 140, 520, x + 280, 520, C.line, a, 3, 14); });
      laag(ctx, q.on('wet', 1, 0.4), () => { tag(ctx, 'niet elke stap meer', 760, 300, C.koraal, 1, 'center', 34); });
      metaA(ctx, 'ARCADIS 2024 · RIVM 2026', 160, 850, q.on('eieren', 1), C.text2, 'left', 28);
      laag(ctx, q.on('biomagnificatie', 1, 0.4), () => termKaart(ctx, 1420, 380, 440, 'biomagnificatie', ['PER STAP IN DE', 'KETEN MEER'], 1)); });
    laag(ctx, B * (1 - Cg), () => { metaText(ctx, 'LANGE KETEN · AANTONEN', 160, 220, C.goud, 'left', 28);
      const cues = [['water', 1], ['slakjes', 1], ['kleine', 1], ['roofvis', 1], ['arend', 1]], st = [1, 2, 4, 7, 12];
      KETEN.forEach(([k, naam], i) => { const a = 0.35 + 0.65 * q.on(cues[i][0], cues[i][1], 0.25); const x = 260 + i * 350; laag(ctx, a, () => { ketenIcoon(ctx, k, x, 470, 1.25, 1, { stip: Math.round(st[i] * q.on('monsters', 1, 0.5)), t });
          text(ctx, naam, x, 660, fTekst(38, 700), C.text, 'center'); if (i < 4) pijl(ctx, x + 120, 470, x + 220, 470, C.line, 1, 3, 14); }); });
      laag(ctx, q.on('stikstof', 1, 0.4), () => { kaart(ctx, 260, 690, 1400, 150, 1, C.goud); metaText(ctx, 'VERDIEPING', 290, 734, C.goud, 'left', 28);
        text(ctx, 'plek in de keten: zware stikstof (¹⁵N) neemt per stap toe', 290, 790, fTekst(38, 700), C.text, 'left'); metaText(ctx, 'STARRFELT E.A. 2013', 1630, 734, C.text2, 'right', 28);
        for (let i = 0; i < 5; i++) { const x = 260 + i * 350; const u = q.on('neemt', 2, 0.3 + i * 0.25); laag(ctx, u, () => { roundRect(ctx, x - 40, 600 - 20 - i * 10, 80, 20 + i * 10, 6); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); text(ctx, '¹⁵N', x + 70, 600, fTekst(28, 700), C.teal, 'center'); }); } }); });
    laag(ctx, Cg, () => { grafiekAssen(ctx, 1); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const Mp = ramp(t, q.at('microplastic', 1) - 0.3, 0.5);
    laag(ctx, 1 - 0.6 * q.on('Vissen', 1, 0.5), () => { grafiekAssen(ctx, 1);
      const D = clamp((t - q.at('DDT', 1)) / 1.8, 0, 1); grafiekLijn(ctx, DDT_V, DDTK, D, 1); laag(ctx, D > 0.95 ? 1 : 0, () => naamBij(ctx, 'DDT', 'STIJGT STERK', GX(3) - 20, GY(DDT_V[4]) - 10, 1, 'right', DDTK));
      const P = clamp((t - q.at('PFOS', 1)) / 2.2, 0, 1); grafiekLijn(ctx, PFOS_V, C.oker, P, 1, { spreid: PFOS_S.map(v => v * q.on('verschilt', 1, 0.6)) });
      laag(ctx, P > 0.95 ? 1 : 0, () => naamBij(ctx, 'PFOS', 'MEESTAL OOK', (GX(3) + GX(4)) / 2, GY(0.41) + 64, 1, 'center', C.oker));
      laag(ctx, q.on('verschilt', 1, 0.4), () => metaText(ctx, 'PFOS: PER KETEN VERSCHILLEND', GR.x + 30, GY(0.5), C.oker, 'left', 28)); });
    laag(ctx, Mp, () => { kaart(ctx, 1300, 230, 560, 620, 1, C.goud); metaText(ctx, 'MICROPLASTIC', 1330, 278, C.goud, 'left', 28);
      laag(ctx, q.on('Vissen', 1, 0.4), () => { vis(ctx, 1590, 420, 280, 'voorn', { t, plastic: 8 }); metaText(ctx, 'PLASTIC KORRELTJES', 1590, 560, C.text2, 'center', 28); });
      laag(ctx, q.on('arenden', 1, 0.4), () => { pijl(ctx, 1590, 580, 1590, 620, C.line, 1, 3, 14); zeearendZit(ctx, 1590, 830, 0.85, {}); });
      laag(ctx, q.on('Hoopt', 1, 0.4), () => vraagteken(ctx, 1790, 800, 1, 90)); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de meeste onderzoeken vinden geen toename', 1);
    grafiekAssen(ctx, 1); grafiekLijn(ctx, DDT_V, DDTK, 1, 0.35); grafiekLijn(ctx, PFOS_V, C.oker, 1, 0.35);
    const M = clamp((t - q.at('Microplastic', 1)) / 1.8, 0, 1); grafiekLijn(ctx, MP_V, '#C9CED6', M, 1, { vierkant: true });
    laag(ctx, M > 0.95 ? 1 : 0, () => naamBij(ctx, 'microplastic', 'GEEN TOENAME', (GX(3) + GX(4)) / 2, GY(0.1) - 52, 1, 'center', '#C9CED6'));
    laag(ctx, q.on('prooi', 1, 0.4) * (1 - q.on('negen', 1, 0.4)), () => { kaart(ctx, 1300, 230, 560, 330, 1); vis(ctx, 1450, 380, 200, 'voorn', { plastic: 6, t }); pijl(ctx, 1570, 380, 1650, 380, C.line, 1, 3, 14); zeearendZit(ctx, 1750, 440, 0.6, {}); metaText(ctx, 'VAN PROOI NAAR ETER', 1580, 530, C.text2, 'center', 28); });
    laag(ctx, q.on('negen', 1, 0.4), () => echtKaart(ctx, 1300, 230, 560, 'ONDERZOEKEN', [['9 van de 10:', 1], ['geen toename per stap', 1]], '', 1, { lh: 52, px: 40, extraH: 150,
      teken: (x, y) => { for (let i = 0; i < 10; i++) { roundRect(ctx, x + 30 + i * 48, y + 14, 38, 38, 6); shape(ctx, i < 9 ? '#5A6478' : rgba(C.goud, 0.3), i < 9 ? '#8FA0B5' : C.goud, 2); } metaText(ctx, 'PITT E.A. 2024', x + 28, y + 100, C.text2, 'left', 28); metaText(ctx, 'MILLER E.A. 2020', x + 28, y + 136, C.text2, 'left', 28); } }));
    laag(ctx, q.on('nanoplastic', 1, 0.4), () => { kaart(ctx, 1300, 650, 560, 100, 1, C.goud); text(ctx, 'nanoplastic: nog onbekend', 1330, 714, fTekst(36, 800), C.text, 'left'); });
    laag(ctx, q.on('bewezen', 1, 0.4), () => { kaart(ctx, 1300, 770, 560, 90, 1, C.groen); metaText(ctx, 'PER STOF: WAT IS BEWEZEN?', 1330, 826, C.groen, 'left', 28); }); },

  // ---------- H4 Normen en beleid ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); bureau(ctx, 330, 640, 400);
    iris(ctx, 230, t, { outfit: 'kantoor', kijk: 1, pose: q.on('dierproef', 1) > 0.5 ? 'wijs' : 'staan', uit: 'blij' }); thijs(ctx, 820, t, { kijk: -1, uit: q.on('mens', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('mens', 1) > 0.5 ? 'denk' : 'staan' });
    metaText(ctx, 'OMGEVINGSDIENST · KANTOOR', 160, 220, C.text2, 'left', 28);
    filmKaartje(ctx, 980, 230, 'Eén aarde · de ADI', q.on('aarde', 1, 0.4) * (1 - q.on('dierproef', 1, 0.4)));
    laag(ctx, q.on('dierproef', 1, 0.4), () => echtKaart(ctx, 980, 230, 860, 'PFOS · EFSA 2008 · DIERPROEF', [['apen · een half jaar (182 dagen)', q.on('Apen', 1)], ['geen effect bij 0,03 mg', q.on('nul', 1)], ['per kilo lichaamsgewicht per dag', q.on('kilo', 1)]], '', 1, { lh: 60, px: 42 }));
    laag(ctx, q.on('mens', 1, 0.4), () => { kaart(ctx, 980, 580, 860, 200, 1, C.goud); text(ctx, 'en een mens?', 1020, 700, fTekst(52, 800), C.text, 'left'); vraagteken(ctx, 1720, 740, 1, 120); pijl(ctx, 1410, 520, 1410, 574, C.goud, 1, 4, 16); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: minstens honderd keer minder', 1);
    const tP = q.at('Bij', 1), B = ramp(t, tP - 0.3, 0.6), tN = q.at('norm', 2), Cn = ramp(t, tN - 0.3, 0.6), tS = q.at('Stel', 1), Ds = ramp(t, tS - 0.3, 0.6);
    laag(ctx, 1 - B, () => { metaText(ctx, 'PFOS · EFSA 2008', 160, 230, C.text2, 'left', 28);
      text(ctx, '0,03 mg', 160, 340, fTekst(64, 800), C.text, 'left'); metaText(ctx, 'GEEN EFFECT BIJ APEN', 160, 390, C.groen, 'left', 28);
      const f = [['÷ 10', 'DIER → MENS', 'gevoeliger'], ['÷ 10', 'GEVOELIGE MENSEN', 'verschillen'], ['÷ 2', 'KORTE PROEF', 'veiligheidsfactor']];
      f.forEach(([d, m, c], i) => laag(ctx, q.on(c, 1, 0.4) * (i === 2 ? q.on('honderd', 1, 0.6) : 1), () => { text(ctx, d, 720 + i * 360, 340, fTekst(i === 2 ? 48 : 64, 800), i === 2 ? C.text2 : C.goud, 'left'); metaText(ctx, i === 2 ? 'EXTRA: ' + m : m, 720 + i * 360, 390, C.text2, 'left', 28); }));
      laag(ctx, q.on('honderd', 1, 0.4), () => { haak(ctx, 720, 1300, 420, '÷ 100: de veiligheidsfactor', C.groen, 1); });
      laag(ctx, q.on('honderd', 1, 0.6), () => { kaart(ctx, 160, 600, 1500, 150, 1, C.goud); text(ctx, '0,03 mg : 100 : 2 = 150 nanogram', 200, 690, fTekst(54, 800), C.text, 'left'); metaText(ctx, 'PER KILO PER DAG', 1220, 690, C.text2, 'left', 28); }); });
    laag(ctx, B * (1 - Cn), () => { echtKaart(ctx, 160, 230, 900, 'PFAS · EFSA 2020', [['norm uit onderzoek bij mensen', 1], ['kinderen: meer PFAS in het bloed', q.on('Kinderen', 1)], ['→ minder afweerstoffen na vaccinatie', q.on('minder', 1)]], '', 1, { lh: 60, px: 40 });
      laag(ctx, q.on('Kinderen', 1, 0.4), () => { [[1200, 'weinig PFAS', 1, 5], [1580, 'veel PFAS', 6, 2]].forEach(([x, lab, nP, nA], i) => { bloedBuis(ctx, x, 560, 2.2); for (let k = 0; k < Math.round(nP * q.on('bloed', 1)); k++) circ(ctx, x - 12 + (k % 2) * 20, 470 + Math.floor(k / 2) * 22, 6, C.oker);
          text(ctx, lab, x, 640, fTekst(34, 700), C.text, 'center'); laag(ctx, q.on('minder', 1, 0.6), () => { for (let k = 0; k < nA; k++) antistof(ctx, x - 110 + k * 50, 760, 1.1, 1, C.groen); }); });
        laag(ctx, q.on('vaccinatie', 1, 0.4), () => { spuit(ctx, 1390, 360, 1.1); metaText(ctx, 'VACCINATIE', 1390, 300, C.text2, 'center', 28); }); });
      laag(ctx, q.on('minder', 1, 0.6), () => metaText(ctx, 'AFWEERSTOFFEN', 1390, 850, C.groen, 'center', 28)); });
    laag(ctx, Cn * (1 - Ds), () => { kaart(ctx, 360, 260, 1200, 300, 1, C.goud); metaText(ctx, 'NORM NU · EFSA 2020', 400, 316, C.goud, 'left', 28); text(ctx, '4,4 nanogram', 400, 430, fTitel(96), C.text, 'left');
      text(ctx, 'per kilo per week', 400, 510, fTekst(44, 700), C.text, 'left'); metaText(ctx, 'SOM VAN VIER PFAS', 1530, 316, C.text2, 'right', 28);
      laag(ctx, q.on('ophoopt', 1, 0.4), () => { kaart(ctx, 360, 600, 1200, 120, 1); text(ctx, 'per week, omdat het zich ophoopt', 400, 678, fTekst(42, 700), C.text, 'left'); }); });
    laag(ctx, Ds, () => { metaText(ctx, 'REKENVOORBEELD · STEL', 160, 230, C.goud, 'left', 28);
      laag(ctx, q.on('zestig', 1, 0.25), () => { thijs(ctx, 330, t, { h: 400, kijk: 1, uit: 'neutraal' }); weegschaal(ctx, 330, GROND - 4, '60'); text(ctx, 'stel: 60 kg', 330, 420, fTekst(40, 800), C.text, 'center'); });
      laag(ctx, q.on('buurman', 1, 0.4), () => { ei(ctx, 720, 400, 56, '#C9925E', 1, { stip: 6 }); text(ctx, 'ei van Joost', 720, 520, fTekst(34, 700), C.text, 'center');
        text(ctx, 'stel: 60 g × 10 ng per gram', 900, 360, fTekst(38, 700), C.text, 'left'); laag(ctx, q.on('zeshonderd', 1, 0.4), () => text(ctx, '= 600 nanogram', 900, 420, fTekst(44, 800), C.koraal, 'left')); });
      laag(ctx, q.on('tweehonderdvierenzestig', 1, 0.4), () => { text(ctx, '4,4 × 60 = 264 nanogram per week', 900, 520, fTekst(44, 800), C.goud, 'left'); metaText(ctx, 'MAG THIJS PER WEEK', 900, 562, C.text2, 'left', 28); });
      laag(ctx, q.on('elke', 1, 0.4), () => { const x0 = 900, yb = 820, k = 0.3; roundRect(ctx, x0, yb - 600 * k, 140, 600 * k, 8); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 2.5); text(ctx, '600', x0 + 70, yb - 600 * k - 14, fTekst(34, 800), C.koraal, 'center');
        roundRect(ctx, x0 + 200, yb - 264 * k, 140, 264 * k, 8); shape(ctx, rgba(C.groen, 0.45), C.groen, 2.5); text(ctx, '264', x0 + 270, yb - 264 * k - 14, fTekst(34, 800), C.groen, 'center');
        lijn(ctx, [[x0 - 20, yb - 264 * k], [x0 + 380, yb - 264 * k]], C.goud, 3); metaText(ctx, 'NORM', x0 + 390, yb - 264 * k + 10, C.goud, 'left', 28);
        metaText(ctx, 'ELKE WEEK ÉÉN EI · VEREENVOUDIGD', x0, yb + 40, C.text2, 'left', 28); metaText(ctx, 'SOM VAN VIER PFAS', x0, yb + 76, C.text2, 'left', 28); });
      laag(ctx, q.on('ruim', 1, 0.4), () => tag(ctx, 'ruim 2× boven de norm', 1500, 680, C.koraal, 1, 'center', 36)); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const tD = q.at('Hoe', 1), B = ramp(t, tD - 0.25, 0.3), A0 = ramp(t, tD - 0.5, 0.3);
    laag(ctx, 1 - A0, () => { metaText(ctx, 'MAATREGELEN', 160, 220, C.goud, 'left', 28);
      const k = (y, kop, regel, a, kl) => laag(ctx, a, () => { kaart(ctx, 160, y, 1600, 160, 1, kl); metaText(ctx, kop, 200, y + 52, kl, 'left', 28); text(ctx, regel, 200, y + 120, fTekst(42, 800), C.text, 'left'); });
      k(250, 'ADVIES · RIVM 2025', 'geen eieren van hobbykippen', 1, C.groen);
      k(440, 'VERBOD', 'PFOS 2008 · PFOA 2020 · voorstel bijna alle PFAS (> 10.000) in 2023', q.on('verbod', 1, 0.4), C.koraal);
      k(630, 'DE VERVUILER BETAALT', 'bron onbekend? dan vaak de overheid', q.on('vervuiler', 1, 0.4), C.oker);
    });
    laag(ctx, B, () => { laag(ctx, 1 - q.on('zeventig', 1, 0.4), () => { text(ctx, 'Hoe lang na een verbod?', 960, 420, fTitel(72), C.text, 'center'); }); const x0 = 220, x1 = 1700, y = 640; const jaar = (j) => lerp(x0, x1, (j - 1950) / 50);
      lijn(ctx, [[x0, y], [x1, y]], C.line, 3); [1950, 1960, 1970, 1980, 1990, 2000].forEach(j => { lijn(ctx, [[jaar(j), y - 10], [jaar(j), y + 10]], C.line, 3); text(ctx, String(j), jaar(j), y + 50, fTekst(32, 700), C.text2, 'center'); });
      laag(ctx, q.on('zeventig', 1, 0.4), () => { roundRect(ctx, jaar(1970), y - 26, jaar(1979) - jaar(1970), 52, 10); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 2.5); text(ctx, 'DDT verboden', jaar(1974.5), y - 50, fTekst(36, 800), C.koraal, 'center'); });
      laag(ctx, q.on('zeearenden', 1, 0.4), () => { nest(ctx, 960, 400, 1.2, 1, { eieren: 2 }); zeearend(ctx, 1260, 300, 0.45, { kijk: -1, t, slag: 0.15 }); metaText(ctx, 'ZEEARENDEN · OOSTZEE', 960, 260, C.text2, 'center', 28); });
      laag(ctx, q.on('vroeger', 1, 0.4), () => { vraagteken(ctx, jaar(1992), y - 60, 1, 110); metaText(ctx, 'WEER JONGEN ZOALS VROEGER?', jaar(1992), y + 110, C.goud, 'center', 28); }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: na twintig jaar of meer', 1);
    const tP = q.at('PFAS', 1), B = ramp(t, tP - 0.3, 0.6), tI = q.at('milieukundige', 1), Ci = ramp(t, tI - 0.3, 0.6);
    laag(ctx, 1 - B, () => { const De = q.on('DDE', 1, 0.4), Nl = 0; laag(ctx, 1 - Nl, () => { nest(ctx, 380, 560, 1.5, 1, { eieren: 2, barst: De > 0.5, dun: De > 0.5 });
      laag(ctx, De, () => { ddtMol(ctx, 200, 330, 0.9); pijl(ctx, 260, 330, 330, 330, DDTK, 1, 3, 12); text(ctx, 'DDE', 340, 344, fTekst(40, 800), DDTK, 'left'); metaText(ctx, 'DUNNERE EISCHAAL', 380, 700, C.koraal, 'center', 28); });
      laag(ctx, q.on('vis', 1, 0.4), () => { vis(ctx, 300, 800, 160, 'voorn', { stip: 3, t }); metaText(ctx, 'BLEEF JAREN IN VIS', 420, 806, C.text2, 'left', 28); }); });
      // broedsucces
      const g = { x: 900, y: 260, w: 880, h: 420 }; assen(ctx, g.x, g.y, g.w, g.h, '', ''); metaText(ctx, 'NESTEN MET JONGEN', g.x, g.y - 20, C.text2, 'left', 28); metaText(ctx, 'ZWEEDSE OOSTZEEKUST · HELCOM', g.x + g.w, g.y + g.h + 80, C.text2, 'right', 28);
      const bar = (j0, j1, v, kl, a, lab) => laag(ctx, a, () => { const xa = g.x + 40 + (j0 - 1950) / 50 * (g.w - 60), xb = g.x + 40 + (j1 - 1950) / 50 * (g.w - 60), hh = v / 100 * g.h; roundRect(ctx, xa, g.y + g.h - hh, xb - xa, hh, 6); shape(ctx, rgba(kl, 0.5), kl, 2.5); text(ctx, lab, (xa + xb) / 2, g.y + g.h - hh - 14, fTekst(32, 800), kl, 'center'); });
      [1950, 1970, 1990].forEach(j => text(ctx, String(j), g.x + 40 + (j - 1950) / 50 * (g.w - 60), g.y + g.h + 40, fTekst(30, 700), C.text2, 'center'));
      bar(1950, 1956, 72, C.groen, 1, '72 %'); bar(1966, 1982, 22, C.koraal, q.on('DDE', 1, 0.6), '22 %');
      laag(ctx, q.on('tachtig', 1, 0.5), () => { const xa = g.x + 40 + 35 / 50 * (g.w - 60), xb = g.x + 40 + 44 / 50 * (g.w - 60); pijl(ctx, (xa + xb) / 2, g.y + g.h - 20, (xa + xb) / 2, g.y + g.h - 200, C.oker, 1, 5, 20); text(ctx, 'herstel', (xa + xb) / 2, g.y + g.h - 214, fTekst(32, 800), C.oker, 'center'); }); bar(1995, 2000, 72, C.groen, q.on('1995', 1, 0.5), 'als vroeger');
      laag(ctx, q.on('tachtig', 1, 0.4), () => metaText(ctx, 'HERSTEL VANAF ± 1985', g.x + 30, g.y + 30, C.oker, 'left', 28));
      laag(ctx, q.on('1995', 1, 0.4), () => metaText(ctx, 'ZOALS VÓÓR 1950 VANAF ± 1995', g.x + 30, g.y + 70, C.groen, 'left', 28)); });
    laag(ctx, B * (1 - Ci), () => { metaText(ctx, 'PFAS', 160, 300, C.oker, 'left', 28); tijdBalk(ctx, 260, 340, 1400, 'pfas', 1, 1); metaText(ctx, 'BREEKT NOG VEEL LANGZAMER AF DAN DDT', 260, 430, C.oker, 'left', 28);
      laag(ctx, q.on('wachten', 1, 0.4), () => { kaart(ctx, 1180, 690, 660, 180, 1); metaText(ctx, 'ZEEAREND NL · SOVON', 1210, 734, C.text2, 'left', 28); text(ctx, 'eerste zekere broedgeval 2006', 1210, 784, fTekst(34, 700), C.text, 'left'); text(ctx, '45 paar in 2025', 1210, 828, fTekst(34, 700), C.text, 'left'); });
      laag(ctx, q.on('wachten', 1, 0.4), () => { kaart(ctx, 260, 500, 860, 160, 1, C.goud); metaText(ctx, 'NIET WACHTEN TOT ALLE SCHADE BEWEZEN IS', 290, 630, C.text, 'left', 28);
        laag(ctx, q.on('voorzorg', 1, 0.4), () => text(ctx, 'voorzorg', 290, 580, fTekst(56, 800), C.goud, 'left')); });
 });
    laag(ctx, Ci, () => { bureau(ctx, 900, 640, 760); iris(ctx, 640, t, { outfit: 'kantoor', kijk: 1, pose: 'wijs', uit: 'blij' });
      [0, 1, 2].forEach(i => dossier(ctx, 1260, 610 - i * 14, 300, 200, '', 1, { kl: ['#9A7A4A', '#B08A5C', '#C9A35C'][i] }));
      const u = clamp((t - q.at('sluit', 1)) / 1.4, 0, 1); dossier(ctx, lerp(820, 1260, ease(u)), lerp(470, 568, ease(u)), 300, 200, 'EIEREN JOOST', 1, { rot: lerp(-0.12, 0, u) });
      laag(ctx, q.on('af', 2, 0.4), () => tag(ctx, 'loopt nog', 1260, 420, C.goud, 1, 'center', 36)); }); },

  // ---------- Recap ----------
  s23(ctx, t, q) { decor(ctx, 'buurtuin', 0.6);
    const tz = 0, u = clamp(t / 12, 0, 1), ax = lerp(NEST[0], 600, ease(u)), ay = 190 + Math.sin(u * 3) * 20; zeearend(ctx, ax, ay, 0.45, { kijk: -1, t, slag: 0.2, stip: Math.round(q.on('stapelt', 1, 1.0) * 12) });
    const Kt = q.on('vissen', 1, 0.4) * (1 - q.on('milieukundige', 1, 0.4));
    laag(ctx, Kt, () => { kaart(ctx, 160, 300, 1100, 230, 1, C.goud); druppel(ctx, 270, 430, 32, 1, 1); pijl(ctx, 330, 420, 410, 420, C.line, 1, 3, 14);
      [0, 1, 2].forEach(i => vis(ctx, 520 + i * 40, 400 + i * 22, 140, 'voorn', { stip: 2, t: t + i })); pijl(ctx, 700, 420, 800, 420, C.line, 1, 3, 14); zeearend(ctx, 990, 420, 0.38, { kijk: 1, slag: 0, stip: Math.round(q.on('stapelt', 1, 1.0) * 10) });
      laag(ctx, q.on('geschikt', 1, 0.4), () => metaText(ctx, 'ALS DE STOF DAARVOOR GESCHIKT IS', 210, 510, C.goud, 'left', 28)); });
    const M = q.on('milieukundige', 1, 0.4);
    laag(ctx, M, () => { thijs(ctx, 1100, t, { kijk: 1, uit: 'blij' }); iris(ctx, 1340, t, { kijk: 1, uit: 'blij', pose: 'wijs' });
      klembord(ctx, 1500, 210, 380, '', [['meten', q.on('meet', 1), q.on('meet', 1, 0.4)], ['waar en via wie', q.on('zoekt', 1), q.on('via', 1, 0.4)], ['per stap aantonen', q.on('toont', 1), q.on('toont', 1, 0.4)], ['norm en maatregel', q.on('norm', 1), q.on('maatregel', 1, 0.4)]], 1, { lh: 70, px: 30 }); });
    laag(ctx, (1 - M) * (1 - q.on('vissen', 1, 0.3)), () => { thijs(ctx, 1150, t, { kijk: -1, uit: 'verbaasd', pose: 'staan' }); persoon(ctx, 'joost', 560, GROND, 450, { t, kijk: 1, uit: 'blij' }); }); },

  s24(ctx, t, q) { decor(ctx, 'buurtuin', 0.35); ctx.fillStyle = rgba(C.bgSchema, 0.45); ctx.fillRect(0, 84, W, H - 84);
    roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 28);
    const rij = [['hbo', 'Milieukunde · 4 jaar', 'HAS GREEN ACADEMY, DEN BOSCH', 'hbo'], ['wo', 'Environmental Sciences · 3 jaar', 'WAGENINGEN · ENGELSTALIG', 'Wageningen'], ['werk', 'bijv. omgevingsdienst, RIVM', 'OF EEN ADVIESBUREAU', 'Daarna']];
    rij.forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 160;
      roundRect(ctx, 100, y, 1180, 140, 18); shape(ctx, rgba('#0D1420', 0.9), i < 2 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 86, fTitel(46), i < 2 ? C.groen : C.goud); text(ctx, o, 300, y + 66, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 110, C.grain, 'left', 28); ctx.restore(); });
    thijs(ctx, 1480, t, { kijk: 1, uit: 'blij' }); iris(ctx, 1720, t, { kijk: -1, uit: 'blij' }); }
});

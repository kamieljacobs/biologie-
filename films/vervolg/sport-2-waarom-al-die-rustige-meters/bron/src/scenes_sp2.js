// Wat word jij? · Sport en topsport 2 · Waarom al die rustige meters? — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast (de zwemmer = Sam, outfit 'zwem'; de zwemtrainer, garderobe 'bad'; figurant Daan in eigen zwemoutfit). Geen namen in beeld.
// Zwembad zijaanzicht (cold open), bovenaanzicht van de banen (eenvoudige vorm), Micro alleen in zoomcirkels.

// heen en weer zwemmen in een baan: geeft {x, kijk, stil}
function SP2_heenWeer(t, x0, x1, v, rust = 0) { const d = Math.abs(x1 - x0), T = d / v + rust, n = Math.floor(Math.max(0, t) / T), u = Math.max(0, t) - n * T; const heen = n % 2 === 0;
  const s = Math.min(u * v, d), stil = u * v >= d; return { x: heen ? x0 + s : x1 - s, kijk: heen ? 1 : -1, stil }; }
// drie lege balkjes (vraagmoment H1)
function SP2_legeBalken(ctx, x, y, w, a) { if (a <= 0.01) return; SP2_laag(ctx, a, () => { metaText(ctx, 'ENERGIE IN EEN 100 M', x, y - 30, C.text2, 'left', 28);
  ['AEROOB', 'FOSFAATACCU', 'GISTING'].forEach((n, i) => { const yy = y + i * 120; metaText(ctx, n, x, yy + 34, C.text, 'left', 28); roundRect(ctx, x + 300, yy, w - 300, 50, 12); shape(ctx, '#2A3446', C.line, 1.5); text(ctx, '?', x + 300 + (w - 300) / 2, yy + 40, fTitel(40), C.goud, 'center'); }); }); }
// scorebord van de wedstrijd (H3); o.bars [p1 rustig, drempel, snel, p2 ...] 0..1; o.uit: uitslag 0..1 per regel
const SP2_PLAN = [[81, 4, 15], [65, 25, 10]];
function SP2_wedstrijd(ctx, o = {}) { const { bars = [0, 0, 0, 0, 0, 0], kolom = 0, intro = 0, leeg = 0, uit = [0, 0, 0], vraag = 0, t = 0 } = o; const X0 = 120, Y0 = 190, Wb = 1680, Hb = 400;
  roundRect(ctx, X0, Y0, Wb, Hb, 14); shape(ctx, '#0B0F16', '#4A5568', 3);
  SP2_laag(ctx, intro, () => { text(ctx, '22 jonge topzwemmers', 960, Y0 + 170, fTekst(56, 800), C.text, 'center'); metaText(ctx, 'GEMIDDELD 17 JAAR', 960, Y0 + 230, C.grain, 'center', 30); });
  SP2_laag(ctx, kolom, () => { [0, 1].forEach(p => { const cx = X0 + 60 + p * 840; text(ctx, p ? 'Plan 2' : 'Plan 1', cx, Y0 + 70, fTekst(48, 800), C.text, 'left');
    ['RUSTIG', 'DREMPEL', 'SNEL'].forEach((n, i) => { const yy = Y0 + 105 + i * 62, ba = bars[p * 3 + i], col = [C.teal, C.oker, C.goud][i]; metaText(ctx, n, cx, yy + 32, ba > 0.01 ? C.text : C.text2, 'left', 28);
      roundRect(ctx, cx + 200, yy, 440, 42, 8); shape(ctx, '#1A2230', '#3A4458', 1.5);
      if (ba > 0.01) { const L = Math.max(10, 440 * SP2_PLAN[p][i] / 100 * ease(ba)); roundRect(ctx, cx + 200, yy, L, 42, 8); shape(ctx, rgba(col, 0.85), col, 2); SP2_laag(ctx, ba, () => metaText(ctx, SP2_PLAN[p][i] + ' %', cx + 210 + L + 6, yy + 32, C.text, 'left', 28)); } });
    // uitslagrij
    const uy = Y0 + 300; roundRect(ctx, cx, uy, 720, 70, 10); shape(ctx, '#1A2230', '#3A4458', 1.5);
    SP2_laag(ctx, leeg * (1 - (uit[p] || 0)), () => text(ctx, '?', cx + 360, uy + 52, fTitel(44), C.goud, 'center'));
    const ua = uit[p] || 0; SP2_laag(ctx, ua, () => { roundRect(ctx, cx, uy, 720, 70, 10); shape(ctx, p ? rgba(C.text2, 0.15) : rgba(C.groen, 0.2), p ? C.text2 : C.groen, 2); text(ctx, p ? 'bijna 0 % sneller' : 'bijna 1 % sneller', cx + 30, uy + 49, fTekst(40, 800), p ? C.text : C.groen, 'left'); }); });
    SP2_meta(ctx, 'MINDER MOE', X0 + 60 + 700, Y0 + 300 + 46, uit[2] || 0, C.groen, 'right', 28); });
  SP2_laag(ctx, vraag, () => vraagteken(ctx, 960, Y0 + 240, 1, 110)); }
// twee banen met plan 1 en plan 2 (H3)
function SP2_wedstrijdBanen(ctx, t, wissel, a = 1) { SP2_laag(ctx, a, () => { const B = SP2_banen(ctx, 330, 650, 1470, 190, 2, { t });
  metaText(ctx, 'PLAN 1', 120, B.y(0) + 10, C.text2, 'left', 28); metaText(ctx, 'PLAN 2', 120, B.y(1) + 10, C.text2, 'left', 28);
  const sw = (id, i, off) => { const m = SP2_heenWeer(t + off, 420, 1720, 150, 0.6), yy = lerp(B.y(i), B.y(1 - i), ease(wissel)); SP2_boven(ctx, m.x, yy, 74, t + off, { id, kijk: m.kijk, stil: m.stil }); };
  sw('sam', 0, 0); sw('daan', 1, 3.1); }); }

Object.assign(SCENES, {
  title(ctx, t) { const B = SP2_banen(ctx, 1040, 660, 780, 190, 2, { t });
    for (let i = 0; i < 3; i++) { const u = ((t * 0.35 + i / 3) % 1); ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.6 * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1160 + i * 260, B.y(i % 2), 16 + u * 40, 0, 6.283); ctx.stroke(); ctx.restore(); }
    const x = 1100 + ((t * 45) % 600); SP2_spoor(ctx, 1100, x - 40, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 80, t, { id: 'sam', tempo: 0.8 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const P = q.on('Toch', 1, 2.8), z = lerp(1, 1.45, P), cx = lerp(960, 2620, P), cy = lerp(540, 255, P), L = 300, WL = 470;
    const tTik = q.at('zwemmer', 1) - 0.25, xs = Math.min(70 + 272 * t, 1500 - 0.6 * L), getikt = t >= tTik;
    bg(ctx, 'schema'); ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-cx, -cy);
    SP2_badZij(ctx, { wl: WL, bodem: 860, muurX: 1500, t });
    SP2_scorebord(ctx, 700, 110, 470, 230, '100 M VRIJ', getikt ? '55,8' : (51.2 + Math.min(t, 4.6)).toFixed(1).replace('.', ','));
    SP2_laag(ctx, q.on('zwemmer', 1, 0.3) * (1 - P), () => { const g = rgba(C.goud, 0.9); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.strokeRect(690, 100, 490, 250); });
    zwemmer(ctx, 'sam', xs, WL + 0.12 * L, L, getikt ? { slag: 'crawl', fase: 0.1 } : { slag: 'crawl', t });
    // de kant: whiteboard en zwemtrainer
    SP2_bord(ctx, 2300, 95, 520, 285, { kopA: q.on('vijfduizend', 1, 0.5), bars: [q.on('vijfduizend', 1, 0.6), q.on('vijfduizend', 1, 0.6), q.on('vijfduizend', 1, 0.6)], vul: q.on('vijfduizend', 1, 1.2), hl: q.on('rustig', 1) > 0.5 ? 'rustig' : null });
    SP2_trainer(ctx, 2160, t, { y: WL - 34, h: 300, kijk: 1, uit: 'neutraal' });
    ctx.restore();
    SP2_laag(ctx, q.on('Waarom', 1, 0.5), () => { const k = q.on('Waarom', 1, 0.5); SP2_kaart(ctx, 1400 + 60 * (1 - k), 230, 460, 250, 1, C.goud);
      text(ctx, '< 1 minuut', 1440 + 60 * (1 - k), 320, fTekst(54, 800), C.goud, 'left'); text(ctx, 'kilometers', 1440 + 60 * (1 - k), 400, fTekst(44, 700), C.text, 'left'); text(ctx, 'rustig?', 1440 + 60 * (1 - k), 450, fTekst(44, 700), C.teal, 'left'); vraagteken(ctx, 1800 + 60 * (1 - k), 340, 1, 80); }); },

  // ---------- H1 Drie zones, drie energiebronnen ----------
  s03(ctx, t, q) { SP2_kant(ctx); const Ru = q.at('Rustig', 1), Dr = q.at('Drempel', 1), Sn = q.at('snel', 1);
    const hl = t >= Sn ? 'snel' : t >= Dr ? 'drempel' : t >= Ru ? 'rustig' : null;
    SP2_bord(ctx, 120, 170, 640, 390, { vul: q.on('zones', 1, 1.2), hl });
    SP2_trainer(ctx, 900, t, { kijk: -1, pose: t > q.at('zones', 1) ? 'wijs' : 'staan', uit: 'praat' });
    const B = SP2_banen(ctx, 1120, 250, 680, 360, 2, { t });
    // zwemmer rustig (teal), Daan op de drempel (oker), daarna een sprintje (goud)
    const xr = Math.min(1180 + Math.max(0, t - Ru) * 120, 1745); SP2_spoor(ctx, 1180, xr - 30, B.y(0), C.teal, q.on('Rustig', 1, 0.4));
    const xd = Math.min(1180 + Math.max(0, t - Dr) * 175, 1745); SP2_spoor(ctx, 1180, xd - 30, B.y(1), C.oker, q.on('Drempel', 1, 0.4));
    const xs = Math.max(xr - Math.max(0, t - Sn) * 330, 1300); const sp = t >= Sn;
    if (sp) SP2_spoor(ctx, xr, xs + 30, B.y(0) + 0, C.goud, 1, 22);
    SP2_boven(ctx, sp ? xs : xr, B.y(0), 120, t, { id: 'sam', kijk: sp ? -1 : 1, tempo: sp ? 1.8 : 0.8, stil: !sp && (t < Ru || xr >= 1745) });
    SP2_boven(ctx, xd, B.y(1), 116, t + 0.3, { id: 'daan', tempo: 1.2, stil: t < Dr || xd >= 1745 });
    SP2_laag(ctx, q.on('Clubs', 1, 0.5), () => tag(ctx, 'CLUBS: 3 TOT 5 ZONES', 1460, 720, C.goud, 1, 'center', 32)); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const Sn = q.at('Snelle', 1), Hv = q.on('Hoeveel', 1, 0.6), L = 380, WL = 590;
    ctx.fillStyle = SP2_K.water; ctx.fillRect(0, WL, 1000, 860 - WL); ctx.fillStyle = SP2_K.waterD; ctx.fillRect(0, 760, 1000, 100); SP2_lijn(ctx, [[0, WL], [1000, WL]], rgba('#BFE3F2', 0.7), 3);
    const tempo = t >= Sn ? 1.7 : 0.75; const r = zwemmer(ctx, 'sam', 470, WL + 0.12 * L, L, { slag: 'crawl', t: t < Sn ? t * 0.75 : Sn * 0.75 + (t - Sn) * 1.7 });
    SP2_laag(ctx, (q.on('Snelle', 1, 0.4)) * (1 - Hv), () => tag(ctx, 'SNEL', 470, 520, C.goud, 1, 'center', 30));
    SP2_laag(ctx, (1 - q.on('Snelle', 1, 0.4)) * (1 - Hv), () => tag(ctx, 'RUSTIG', 470, 520, C.teal, 1, 'center', 30));
    const cx = 1360, cy = 390, R = 290, ZA = 1 - Hv;
    zoomCircle(ctx, cx, cy, R, r.schouder.x, r.schouder.y, 'SPIERVEZEL', ZA, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const M = q.on('mitochondriën', 1, 0.5), Fo = q.on('fosfaataccu', 1, 0.5), Gi = q.on('gisting', 1, 0.6), Bl = q.on('bloed', 1, 1.2);
      const pos = SP2_vezel(ctx, cx, cy, R, { mito: 5, hl: 1, hlA: M, haarvat: 1, t, h: R * 0.7 });
      // zuurstof (teal) gaat het opgelichte mitochondrium in
      if (M > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4) % 1), p = pos[1]; SP2_o2(ctx, lerp(p.x - 40 + i * 25, p.x, u), lerp(cy - R * 0.45, p.y, u), 10, M * (1 - u) * (1 - Fo * 0.6)); }
      SP2_laag(ctx, M, () => naamBij(ctx, 'met zuurstof', '', pos[1].x, cy - R * 0.5 - 6, 1, 'center', C.groen));
      // fosfaataccu en gisting (goud) in het snelle deel
      SP2_accu(ctx, cx + R * 0.15, cy - R * 0.02, 34, 1 - 0.7 * ramp(t, q.at('fosfaataccu', 1) + 0.4, 2), Fo);
      const gx = cx + R * 0.62, gy = cy; SP2_glucose(ctx, gx, gy, 30, Gi * (1 - q.on('melkzuur', 1, 0.5)), C.oker);
      const Me = q.on('melkzuur', 1, 0.6); SP2_keten(ctx, gx - 10, gy - 30 * Me, 12, Me * (1 - Bl * 0.8), C.goud, 0.2); SP2_keten(ctx, gx + 14, gy + 30 * Me, 12, Me * (1 - Bl * 0.8), C.goud, -0.2);
      if (Bl > 0.01) for (let i = 0; i < 3; i++) SP2_lac(ctx, gx - 40 + i * 30 + Bl * 30, lerp(gy + 20, cy + R * 0.45 + 16, Bl), 9, Bl); });
    SP2_laag(ctx, q.on('melkzuur', 1, 0.5) * ZA, () => tag(ctx, 'MELKZUUR → LACTAAT', cx, 800, C.oker, 1, 'center', 30));
    SP2_legeBalken(ctx, 1040, 300, 760, Hv); },

  s06(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, "antwoord b: zo'n veertig tot vijftig procent", 1); const L = 380, WL = 590;
    ctx.fillStyle = SP2_K.water; ctx.fillRect(0, WL, 1000, 860 - WL); ctx.fillStyle = SP2_K.waterD; ctx.fillRect(0, 760, 1000, 100); SP2_lijn(ctx, [[0, WL], [1000, WL]], rgba('#BFE3F2', 0.7), 3);
    const r = zwemmer(ctx, 'sam', 470, WL + 0.12 * L, L, { slag: 'crawl', t: t * 1.6 });
    const cx = 1400, cy = 360, R = 220;
    zoomCircle(ctx, cx, cy, R, r.schouder.x, r.schouder.y, 'SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const pos = SP2_vezel(ctx, cx, cy, R, { mito: 5, hl: 1, hlA: 1, haarvat: 1, t, h: R * 0.7 });
      for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1), p = pos[1]; SP2_o2(ctx, lerp(p.x - 30 + i * 25, p.x, u), lerp(cy - R * 0.45, p.y, u), 9, 1 - u); }
      SP2_accu(ctx, cx + R * 0.2, cy, 26, 0.4, 1); SP2_keten(ctx, cx + R * 0.62, cy, 10, 1, C.goud, 0.2); });
    const V = q.on('veertig', 1, 1.4); SP2_energieBalk(ctx, 1000, 700, 800, 64, 0.45 * V, { label: 'ENERGIE IN EEN 100 M', rest: q.on('veertig', 1, 0.4) });
    SP2_laag(ctx, V, () => { text(ctx, '± 40–50 %', 1020, 745, fTekst(36, 800), '#0D1420', 'left'); });
    SP2_laag(ctx, q.on('dissimilatie', 1, 0.5), () => naamBij(ctx, 'aeroob', '', 1180, 805, 1, 'center', C.groen));
    SP2_laag(ctx, q.on('geschat', 1, 0.5), () => { SP2_kaartTekst(ctx, 120, 220, 820, 'GESCHAT', ['goed getrainde jonge zwemmers'], 1, C.line, C.goud, 40); metaText(ctx, 'RIBEIRO E.A. 2015 · HELLARD E.A. 2018', 120, 400, C.grain, 'left', 28); });
    SP2_laag(ctx, q.on('basis', 1, 0.5), () => tag(ctx, 'AEROBE BASIS', 1640, 830, C.groen, 1, 'center', 32)); },

  // ---------- H2 Wat elke zone bouwt ----------
  s07(ctx, t, q) { SP2_kant(ctx); const r = SP2_sam(ctx, 270, t, { h: 560, uit: 'blij' }); const hx = r.hoofd.x, hy = r.hoofd.y, hr = r.hoofd.r;
    const Mi = q.on('mitochondriën', 1, 1.6), Ha = q.on('haarvaten', 1, 1.6), Ha2 = q.on('hart', 1, 0.5), Sl = q.on('slag', 1, 2.0), Bl = q.on('bloed', 2, 0.5);
    const cx = 760, cy = 330, R = 220;
    zoomCircle(ctx, cx, cy, R, hx + hr * 1.7, hy + hr * 1.9, 'SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      SP2_vezel(ctx, cx, cy, R, { mito: 4 + Math.round(4 * Mi), hl: -1, haarvat: 0.35 + 0.65 * Ha, t, h: R * 0.7 });
      if (Mi > 0.01 && Mi < 1) { ctx.save(); ctx.strokeStyle = rgba(C.groen, 0.8 * (1 - Mi)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R * 0.9, 0, 6.283); ctx.stroke(); ctx.restore(); } });
    SP2_laag(ctx, Mi, () => naamBij(ctx, 'meer mitochondriën', '', cx, cy - R - 20, 1, 'center', C.groen));
    SP2_laag(ctx, Ha, () => naamBij(ctx, 'meer haarvaten', '', cx, cy + R + 84, 1, 'center', C.groen));
    const hcx = 1240, hcy = 330, HR = 160, beat = t * 6.0;
    zoomCircle(ctx, hcx, hcy, HR, hx + hr * 0.35, hy + hr * 3.0, 'HART', Ha2, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(hcx - HR, hcy - HR, 2 * HR, 2 * HR); SP2_hart(ctx, hcx - 40, hcy + 10, 1.25, beat); SP2_maatbeker(ctx, hcx + 85, hcy + 80, 60, 100, (0.45 + 0.4 * Sl) * Math.min(1, ((beat % 6.283) / 3.14))); });
    SP2_laag(ctx, Sl, () => naamBij(ctx, 'meer bloed per slag', '', hcx, hcy + HR + 84, 1, 'center', C.groen));
    // bloedbuisje: eerst meer plasma (dagen), dan meer rode bloedcellen (weken tot maanden)
    const Pl = q.on('bloedplasma', 1, 1.4), Rb = q.on('bloedcellen', 1, 1.6), bx = 1600, by = 560;
    SP2_laag(ctx, Bl, () => { SP2_buisje(ctx, bx, by, 64, 150 + 50 * Rb, 140 + 55 * Pl, 420);
      SP2_laag(ctx, q.on('dagen', 1, 0.4), () => { metaText(ctx, 'PLASMA', bx + 60, by - 250 - 40 * Pl, C.text2, 'left', 28); metaText(ctx, 'DAGEN', bx + 60, by - 215 - 40 * Pl, SP2_K.plasma, 'left', 28); });
      SP2_laag(ctx, q.on('weken', 1, 0.4), () => { metaText(ctx, 'RODE', bx + 60, by - 110, C.text2, 'left', 28); metaText(ctx, 'BLOEDCELLEN', bx + 60, by - 76, C.text2, 'left', 26); metaText(ctx, 'WEKEN TOT', bx + 60, by - 36, SP2_K.bloedL, 'left', 26); metaText(ctx, 'MAANDEN', bx + 60, by - 4, SP2_K.bloedL, 'left', 26); }); });
    metaText(ctx, 'VEREENVOUDIGD', W - 60, 100, C.text2, 'right', 28); },

  s08(ctx, t, q) { SP2_kant(ctx); const Ri = q.at('inzwemmen', 1) - 0.4, Ma = q.on('Maken', 1, 0.6), B = SP2_banen(ctx, 120, 260, 1130, 360, 2, { t, a: 1 - 0.65 * Ma });
    let zx = 1000; SP2_laag(ctx, 1 - 0.65 * Ma, () => { if (t < Ri) { const m = SP2_heenWeer(t + 2.0, 200, 1170, 420, 0.3); SP2_spoor(ctx, m.kijk > 0 ? 200 : 1170, m.x - 30 * m.kijk, B.y(0), C.goud, 1, 22); SP2_boven(ctx, m.x, B.y(0), 120, t, { id: 'sam', kijk: m.kijk, tempo: 1.9, stil: m.stil }); }
      else { const x = Math.min(220 + (t - Ri) * 110, 1150); zx = x; SP2_spoor(ctx, 220, x - 30, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', tempo: 0.7 }); }
      SP2_laag(ctx, 1 - Ma, () => tag(ctx, t < Ri ? 'SNELLE SERIE' : 'RUSTIG INZWEMMEN', 685, 220, t < Ri ? C.goud : C.teal, 1, 'center', 30)); });
    SP2_trainer(ctx, 1440, t, { kijk: -1, uit: 'neutraal' });
    const Ve = q.on('veel', 1, 1.2), We = q.on('weinig', 1, 0.3); let w = '';
    if (t >= q.at('veel', 1)) w = We > 0.5 ? '1,2' : String(Math.max(1, Math.round(1 + 8 * Ve)));
    SP2_lactaatMeter(ctx, 1720, 430, 1.35, w, 1, 1, 0);
    metaText(ctx, 'LACTAAT', 1720, 240, C.oker, 'center', 28); metaText(ctx, 'MILLIMOL', 1720, 620, C.text2, 'center', 26); metaText(ctx, 'PER LITER', 1720, 654, C.text2, 'center', 26);
    // vraagmoment: neutrale vezel
    const cx = 690, cy = 440, R = 250; zoomCircle(ctx, cx, cy, R, zx, B.y(0), 'SPIERVEZEL', Ma, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); SP2_vezel(ctx, cx, cy, R, { mito: 5, haarvat: 1, t, h: R * 0.7 }); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord b: wel, je lichaam gebruikt het meteen', 1);
    const cx = 720, cy = 500, R = 300, Ru = q.on('rustig', 1, 0.5), Ha = q.on('hart', 1, 0.6), Br = q.on('brandstof', 1, 0.5), He = q.on('herstelt', 1, 0.5);
    zoomCircle(ctx, cx, cy, R, cx, cy, 'WITTE EN RODE SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      SP2_vezel(ctx, cx, cy - 135, R, { mito: 2, wit: true, t, h: 130 });
      const rp = SP2_vezel(ctx, cx, cy + 135, R, { mito: 6, t, h: 130, hl: 2, hlA: Ru });
      // bloedvat ertussen
      ctx.fillStyle = rgba(SP2_K.bloed, 0.85); ctx.fillRect(cx - R, cy - 34, 2 * R, 68); ctx.strokeStyle = SP2_K.bloedL; ctx.lineWidth = 2; ctx.strokeRect(cx - R - 2, cy - 34, 2 * R + 4, 68);
      for (let k = 0; k < 9; k++) { const x = cx - R + ((k * 80 + t * 70) % (2 * R)); ctx.beginPath(); ctx.ellipse(x, cy + Math.sin(k) * 14, 13, 7, 0, 0, 6.283); ctx.fillStyle = SP2_K.bloedL; ctx.fill(); }
      // ook bij rustig zwemmen: lactaat uit de witte vezel gaat meteen de rode vezel in
      if (Ru > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.4 + i / 4) % 1), sx = cx - 180 + i * 110, p = rp[(i + 1) % rp.length];
        SP2_lac(ctx, lerp(sx, p.x, u), lerp(cy - 135, p.y, u), 10, Ru * (u < 0.85 ? 1 : (1 - u) / 0.15)); }
      // via het bloed naar het hart
      if (Ha > 0.01) for (let i = 0; i < 5; i++) { const u = ((t * 0.3 + i / 5) % 1); SP2_lac(ctx, lerp(cx - R, cx + R, u), cy + (i % 2 ? -12 : 12), 10, Ha); } });
    const hcx = 1450, hcy = 430, HR = 170;
    zoomCircle(ctx, hcx, hcy, HR, cx + R, cy, 'HART', Ha, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(hcx - HR, hcy - HR, 2 * HR, 2 * HR); SP2_hart(ctx, hcx, hcy + 10, 1.35, t * 6);
      for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i / 4) % 1); SP2_lac(ctx, lerp(hcx - HR, hcx - 10, u), hcy + 10 + (i - 1.5) * 26, 10, Ha * (1 - u)); } });
    SP2_lactaatMeter(ctx, 1760, 250, 0.7, '1,2', Ru, 1, 0); SP2_meta(ctx, 'LACTAAT', 1760, 120, Ru, C.oker, 'center', 26);
    SP2_laag(ctx, Br, () => tag(ctx, 'BRANDSTOF', 1110, 230, C.oker, 1, 'center', 34));
    // herstel tussen snelle herhalingen
    SP2_laag(ctx, He, () => { const x0 = 1180, y0 = 700; metaText(ctx, 'HERHALING · RUST · HERHALING', x0, y0 - 16, C.text2, 'left', 26);
      roundRect(ctx, x0, y0, 180, 56, 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); roundRect(ctx, x0 + 196, y0, 240, 56, 10); shape(ctx, rgba(C.teal, 0.45), C.teal, 2); roundRect(ctx, x0 + 452, y0, 180, 56, 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); });
    metaText(ctx, 'BROOKS 2018 · 2020', 1820, 860, C.grain, 'right', 28); },

  s11(ctx, t, q) { SP2_kant(ctx); const B = SP2_banen(ctx, 120, 300, 960, 300, 2, { t }); const Sh = q.on('schuift', 1, 2.0), Sn = q.at('snelle', 1), Ra = q.at('rust', 1);
    const G = SP2_grafiek(ctx, 1260, 250, 520, 360, { dv: 0.12 * Sh, oud: Sh, col: C.oker, curve: 1, lab: false });
    metaText(ctx, 'LACTAAT', 1260, 226, C.text2, 'left', 28); metaText(ctx, 'SNELHEID →', 1780, 654, C.text2, 'right', 28);
    SP2_laag(ctx, q.on('drempelzone', 1, 0.4), () => { const u = SP2_uVoor(4, 0.12 * Sh); circ(ctx, G.X(u), G.Y(4), 12, C.oker, '#1A2740', 2); });
    SP2_laag(ctx, Sh, () => pijl(ctx, G.X(SP2_uVoor(4, 0)) - 10, G.Y(4) - 50, G.X(SP2_uVoor(4, 0.12)) + 10, G.Y(4) - 50, C.oker, 1, 4, 16));
    SP2_laag(ctx, q.on('drempelzone', 1, 0.4) * (1 - q.on('snelle', 1, 0.4)), () => tag(ctx, 'DREMPEL', 600, 250, C.oker, 1, 'center', 30));
    // rustig zwemmen tot de snelle zone; dan een sprint over 25 m en lange rust aan de kant
    if (t < Sn) { const x = Math.min(200 + t * 90, 1000); SP2_spoor(ctx, 200, x - 30, B.y(1), C.teal, 0.6); SP2_boven(ctx, x, B.y(1), 110, t, { id: 'daan', tempo: 0.8 }); }
    const sx = Math.min(200 + Math.max(0, t - Sn) * 300, 600); SP2_laag(ctx, q.on('snelle', 1, 0.4), () => { SP2_spoor(ctx, 200, sx - 30, B.y(0), C.goud, 1, 22); SP2_boven(ctx, sx, B.y(0), 120, t, { id: 'sam', tempo: 2, stil: sx >= 600 });
      tag(ctx, 'SNEL', 600, 250, C.goud, 1, 'center', 30); SP2_lijn(ctx, [[600, 310], [600, 590]], C.text, 3, 0.7, [10, 8]); metaText(ctx, '25 M', 400, 660, C.text2, 'center', 28); });
    SP2_laag(ctx, q.on('rust', 1, 0.4), () => SP2_stopwatch(ctx, 930, 730, 70, Math.max(0, t - Ra) / 6, 1, '')); },

  // ---------- H3 De wedstrijd ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Pl = q.on('één', 1, 0.6);
    SP2_wedstrijd(ctx, { t, intro: 1 - Pl, kolom: Pl, leeg: q.on('Welk', 1, 0.5),
      bars: [q.on('vijfde', 1, 0.8), q.on('drempel', 1, 0.8), q.on('snel', 1, 0.8), q.on('rustig', 2, 0.8), q.on('kwart', 1, 0.8), q.on('snel', 2, 0.8)] });
    SP2_laag(ctx, q.on('zes', 1, 0.4) * (1 - Pl), () => tag(ctx, 'ELK PLAN 6 WEKEN', 960, 500, C.goud, 1, 'center', 32));
    SP2_meta(ctx, 'PLA E.A. 2019', 1800, 160, q.on('Onderzoekers', 1, 0.5), C.grain, 'right', 28);
    const Wi = q.on('allebei', 1, 1.0); SP2_wedstrijdBanen(ctx, t, Wi);
    SP2_laag(ctx, SP2_fase(t, q.at('allebei', 1), q.at('één', 1) - 0.2), () => tag(ctx, 'IEDEREEN DEED ALLEBEI', 960, 568, C.goud, 1, 'center', 30));
    SP2_laag(ctx, q.on('tijd', 1, 0.4) * (1 - q.on('Welk', 1, 0.4)), () => tag(ctx, '100 M OP TIJD', 960, 160, C.text2, 1, 'center', 28)); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord c: plan één, met rustig én snel', 1);
    SP2_wedstrijd(ctx, { t, kolom: 1, leeg: 1, bars: [1, 1, 1, 1, 1, 1], uit: [q.on('sneller', 1, 0.6), q.on('twee', 1, 0.6), q.on('moe', 1, 0.5)], vraag: q.on('Waarom', 1, 0.5) });
    SP2_laag(ctx, q.on('onderzoek', 1, 0.5), () => tag(ctx, 'KLEIN VERSCHIL · ÉÉN ONDERZOEK', 960, 650, C.koraal, 1, 'center', 32));
    metaText(ctx, 'PLA E.A. 2019', 1800, 160, C.grain, 'right', 28);
    SP2_wedstrijdBanen(ctx, t, 0, 1 - q.on('onderzoek', 1, 0.5)); },

  // ---------- H4 Een zone weglaten ----------
  s15(ctx, t, q) { SP2_kant(ctx); const B = SP2_banen(ctx, 120, 300, 1130, 220, 1, { t });
    const Sp = q.at('sprints', 1); const per = 5.5, u = Math.max(0, t - 0.3) % per, n = Math.floor(Math.max(0, t - 0.3) / per), heen = n % 2 === 0, d = Math.min(u * 560, 990), x = heen ? 200 + d : 1190 - d, stil = u * 560 >= 990;
    if (!stil) SP2_spoor(ctx, heen ? 200 : 1190, x - 30 * (heen ? 1 : -1), B.y(0), C.goud, 1, 22);
    SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', kijk: heen ? 1 : -1, tempo: 2, stil });
    SP2_laag(ctx, q.on('sprints', 1, 0.4), () => tag(ctx, 'ALLEEN SNEL', 685, 250, C.goud, 1, 'center', 30));
    SP2_laag(ctx, q.on('zonder', 1, 0.4), () => tag(ctx, 'GEEN RUSTIGE METERS', 685, 600, C.teal, 1, 'center', 30));
    const wk = q.on('zes', 1, 0.1) > 0 ? Math.min(6, 1 + Math.floor(Math.max(0, t - q.at('zes', 1)) / 1.1)) : 1, fl = (Math.max(0, t - q.at('zes', 1)) / 1.1) % 1;
    SP2_kalender(ctx, 1440, 170, 280, 250, wk, 0, 1, 'WEEK'); SP2_laag(ctx, q.on('zes', 1, 0.4), () => tag(ctx, '6 WEKEN', 1580, 124, C.koraal, 1, 'center', 28));
    SP2_trainer(ctx, 1580, t, { kijk: -1, uit: 'neutraal' }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const Sp = q.on('Sprints', 1, 0.5), La = q.on('Laat', 1, 0.6), Sn2 = q.at('snelle', 2) - 0.3, De = ramp(t, Sn2, 0.6), Of = q.on('Of', 1, 0.6);
    const A = 1 - La; SP2_laag(ctx, 1 - q.on('Sprints', 1, 0.6), () => SP2_antwoord(ctx, 'antwoord a: herstel, tussen herhalingen en races', 1));
    // twee rijen herhalingen: tijd per herhaling
    SP2_laag(ctx, A, () => { const He = ramp(t, 0.2, 1.5); const groep = (x0, lab, hs, col) => { metaText(ctx, lab, x0, 330, C.text, 'left', 28); SP2_lijn(ctx, [[x0 - 10, 640], [x0 + 470, 640]], C.line, 2);
        hs.forEach((h, i) => { const a = clamp(He * 5 - i, 0, 1); if (a <= 0.01) return; roundRect(ctx, x0 + i * 95, 640 - h * a, 70, h * a, 6); shape(ctx, rgba(col(i), 0.7), col(i), 2); }); };
      groep(150, 'MET RUSTIGE METERS', [210, 212, 210, 214, 212], () => C.teal); groep(760, 'ZONDER', [210, 222, 238, 256, 276], (i) => i < 2 ? C.goud : C.koraal);
      metaText(ctx, 'TIJD PER HERHALING', 150, 690, C.text2, 'left', 26);
      SP2_laag(ctx, q.on('trager', 1, 0.5), () => { pijl(ctx, 800, 440, 1200, 350, C.koraal, 1, 5, 20); tag(ctx, 'TRAGER HERSTEL?', 995, 270, C.koraal, 1, 'center', 30); });
      SP2_laag(ctx, q.on('verwachten', 1, 0.5), () => metaText(ctx, 'VERWACHTING VAN TRAINERS · NIET GEMETEN', 960, 780, C.grain, 'center', 28)); });
    SP2_laag(ctx, Sp * (1 - La), () => { const cx = 1560, cy = 450, R = 200; zoomCircle(ctx, cx, cy, R, cx, cy, 'OOK MET SPRINTS', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); SP2_vezel(ctx, cx, cy, R, { mito: 4, hl: 1, hlA: 1, haarvat: 1, t, h: R * 0.7 }); }); });
    // zonder snelle meters: fit, niet snel
    SP2_laag(ctx, La * (1 - De), () => { SP2_kant(ctx); const B = SP2_banen(ctx, 160, 330, 1300, 200, 1, { t }); const x = 260 + ((t - q.at('Laat', 1)) * 80) % 1100; SP2_spoor(ctx, 240, x - 30, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', tempo: 0.7 });
      tag(ctx, 'ALLEEN RUSTIG', 810, 280, C.teal, 1, 'center', 30); SP2_laag(ctx, q.on('fit', 1, 0.4), () => tag(ctx, 'FIT, NIET SNEL', 810, 650, C.koraal, 1, 'center', 36)); });
    // eigen beurt van de zwemtrainer
    SP2_laag(ctx, De * (1 - Of), () => { SP2_kant(ctx); SP2_trainer(ctx, 420, t, { kijk: 1, pose: 'wijs', uit: t < q.at('doen', 1) ? 'praat' : 'blij' }); SP2_sam(ctx, 760, t, { kijk: -1, uit: 'blij' });
      SP2_kaartTekst(ctx, 1040, 270, 800, '', ['De snelle meters maken je snel.', 'De rustige maken dat je ze', 'vaak kunt doen.'], 1, C.goud, C.goud, 40); });
    // nog niet beslist
    SP2_laag(ctx, Of, () => { SP2_weegschaal(ctx, 960, 700, 0.9, Math.sin(t * 1.2) * 0.05, ['meer meters'], ['minder meters,', 'racetempo']); vraagteken(ctx, 960, 400, 1, 100);
      SP2_laag(ctx, q.on('beslist', 1, 0.4), () => tag(ctx, 'NOG NIET BESLIST', 960, 230, C.koraal, 1, 'center', 32));
      metaText(ctx, 'MACINNIS & GIBALA 2017 · NUGENT E.A. 2017 · PAPADIMITRIOU E.A. 2025', 960, 860, C.grain, 'center', 26); }); },

  // ---------- H5 Hoe een trainer de zones vindt ----------
  s18(ctx, t, q) { SP2_kant(ctx); const Tw = ramp(t, q.at('zwemmers', 1) - 0.3, 0.6), Pr = q.on('prikje', 1, 0.5), Cu = q.at('Eerst', 1), Cl = q.on('clubs', 1, 0.8);
    SP2_laag(ctx, 1 - Tw, () => { const r = SP2_sam(ctx, 360, t, { h: 380, uit: t < 4 ? 'blij' : 'neutraal' });
      SP2_trainer(ctx, 640, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => SP2_lactaatMeter(c, hx, hy - 20, 0.42, t > q.at('genoteerd', 1) ? '1,1' : '', 1, 1, ramp(t, q.at('oorlel', 1) + 0.4, 0.5)) });
      SP2_laag(ctx, q.on('zeven', 1, 0.4) * (1 - Pr), () => tag(ctx, '7 × 200 M · STEEDS SNELLER', 480, 300, C.teal, 1, 'center', 30));
      const ex = r.hoofd.x + r.hoofd.r * 1.0, ey = r.hoofd.y + r.hoofd.r * 0.4;
      zoomCircle(ctx, 520, 230, 140, ex, ey, 'OORLEL', Pr * (1 - q.on('Lactaat', 1, 0.5)), () => { SP2_oor(ctx, 510, 220, 0.62, CAST.sam.huid, 1, ramp(t, q.at('oorlel', 1), 0.6));
        const st = ramp(t, q.at('oorlel', 1) + 0.3, 0.6); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(580 - 60 * st, 280, 120, 18); });
      ['LACTAAT', 'HARTSLAG', 'TIJD'].forEach((s2, i) => SP2_laag(ctx, q.on(['Lactaat', 'hartslag', 'tijd'][i], 1, 0.4), () => tag(ctx, s2, 880, 520 + i * 74, [C.oker, C.koraal, C.teal][i], 1, 'left', 28))); });
    // grafiek: per stap een punt, eerst vlak, dan steil
    const pu = Math.max(0, (t - q.at('stap', 2)) / 1.2);
    SP2_laag(ctx, 1 - Tw, () => { const g = SP2_grafiek(ctx, 1150, 210, 640, 470, { punten: pu, curve: clamp((t - Cu) / 3.4, 0, 1), col: C.text, zones: Cl, grens: q.on('Tussen', 1, 0.5) });
      SP2_laag(ctx, q.on('drempelzone', 1, 0.5) * (1 - Cl), () => { ctx.fillStyle = rgba(C.oker, 0.3); const u2 = SP2_uVoor(2), u4 = SP2_uVoor(4); ctx.fillRect(g.X(u2), 210, g.X(u4) - g.X(u2), 470); });
      SP2_laag(ctx, q.on('lactaatcurve', 1, 0.5) * (1 - Cl), () => naamBij(ctx, 'lactaatcurve', '', g.X(0.86) - 10, g.Y(8) , 1, 'right', C.text));
      SP2_laag(ctx, q.on('drempelzone', 1, 0.5), () => naamBij(ctx, 'drempelzone', '', g.X((SP2_uVoor(2) + SP2_uVoor(4)) / 2), 250, 1, 'center', C.oker));
      SP2_laag(ctx, q.on('Ongeveer', 2, 0.5) * (1 - Cl), () => tag(ctx, 'ONGEVEER', g.X((SP2_uVoor(2) + SP2_uVoor(4)) / 2), 330, C.koraal, 1, 'center', 28));
      SP2_laag(ctx, Cl, () => { const a2 = SP2_uVoor(2) + 0.05, a4 = SP2_uVoor(4) - 0.05; SP2_lijn(ctx, [[g.X(a2), 300], [g.X(a2), 680]], '#E8E4DA', 3, 1, [8, 8]); SP2_lijn(ctx, [[g.X(a4), 300], [g.X(a4), 680]], '#E8E4DA', 3, 1, [8, 8]);
        SP2_vlag(ctx, g.X(a2), 380, '#E8E4DA'); SP2_vlag(ctx, g.X(a4), 380, '#E8E4DA'); SP2_vlag(ctx, g.X(SP2_uVoor(2)), 470, C.koraal); SP2_vlag(ctx, g.X(SP2_uVoor(4)), 470, C.koraal); metaText(ctx, 'TWEE CLUBS, TWEE INDELINGEN', 1150, 760, C.grain, 'left', 26); }); });
    // vraagmoment: twee zwemmers, dezelfde tijd
    SP2_laag(ctx, Tw, () => { SP2_sam(ctx, 720, t, { kijk: 1 }); SP2_daan(ctx, 1200, t, { kijk: -1 }); tag(ctx, '200 M · 2:15', 720, 420, C.text2, 1, 'center', 32); tag(ctx, '200 M · 2:15', 1200, 420, C.text2, 1, 'center', 32); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord c: niet per se, hun lactaatcurve beslist', 1);
    const Sc = q.on('schuift', 1, 2.0), Da = q.on('Daarom', 1, 0.5), u215 = 0.6;
    const graf = (x, dv, oud, col, nr, kl, lab) => { const g = SP2_grafiek(ctx, x, 310, 640, 330, { dv, oud, zones: 1, col: C.text, lab: true });
      const l = SP2_lac_v(u215, dv), p = q.on(kl, 1, 0.5); SP2_lijn(ctx, [[g.X(u215), 310], [g.X(u215), 640]], C.text, 2, 0.8, [6, 6]); metaText(ctx, '2:15', g.X(u215), 682, C.text, 'center', 28);
      circ(ctx, g.X(u215), g.Y(l), 13, col, '#1A2740', 2); SP2_laag(ctx, p, () => naamBij(ctx, lab, '', g.X(u215) + 22, g.Y(l) - 16, 1, 'left', col));
      text(ctx, nr, x + 640, 240, fTekst(36, 700), C.text, 'right'); };
    graf(200, 0.08 + 0.12 * Sc, Sc, C.teal, 'zwemmer 1', 'rustig', 'rustig');
    graf(1080, -0.08, 0, C.oker, 'zwemmer 2', 'drempel', 'drempel');
    SP2_laag(ctx, q.on('minder', 1, 0.5) * (1 - Da), () => SP2_kaartTekst(ctx, 200, 715, 1180, 'NA MAANDEN TRAINEN', ['minder lactaat in het bloed bij dezelfde snelheid'], 1, C.groen, C.groen, 36));
    SP2_laag(ctx, Da, () => { const x0 = 360, x1 = 1560, y = 790; SP2_lijn(ctx, [[x0, y], [x1, y]], C.line, 3); metaText(ctx, 'SEIZOEN', x0 - 20, y + 10, C.text2, 'right', 28);
      for (let i = 0; i < 4; i++) { const a = q.on('keer', 1, 0.3 + i * 0.25); const x = x0 + 120 + i * 320; SP2_laag(ctx, a, () => { circ(ctx, x, y, 14, C.oker, '#1A2740', 2); metaText(ctx, 'TEST', x, y - 30, C.oker, 'center', 26); }); } });
    metaText(ctx, 'PYNE E.A. 2001 · SCRUTON E.A. 2015', 1820, 860, C.grain, 'right', 28); },

  // ---------- Recap ----------
  s21(ctx, t, q) { SP2_kant(ctx); const Ru = q.on('rustige', 1, 0.5), Sn = q.on('snelle', 1, 0.5), Op = ramp(t, q.at('doen', 1) - 2.2, 0.3);
    const b = SP2_bord(ctx, 100, 170, 720, 420, { hl: null });
    const kaartje = (i, s2, col, a) => { const r = b.rijen[i]; SP2_laag(ctx, a, () => tag(ctx, s2, 880, r.y + 14, col, 1, 'left', 30)); };
    kaartje(0, 'AEROBE BASIS · HERSTEL', C.teal, Ru); kaartje(1, 'DREMPEL OMHOOG', C.oker, q.on('snelle', 1, 0.9)); kaartje(2, 'RACESNELHEID', C.goud, Sn);
    SP2_trainer(ctx, 1380, t, { kijk: -1, uit: t > q.at('zegt', 1) && t < q.at('doen', 1) ? 'praat' : 'blij', pose: t > q.at('Zoals', 1) ? 'wijs' : 'staan' });
    // 100 m en 50 m: aeroob deel
    SP2_laag(ctx, q.on('100', 1, 0.5) * (1 - Ru), () => { SP2_energieBalk(ctx, 1000, 250, 800, 48, 0.45, { label: '100 M · AEROOB ± 40–50 %' });
      SP2_laag(ctx, q.on('50', 1, 0.5), () => { SP2_energieBalk(ctx, 1000, 380, 800, 48, 0.2, { label: '50 M · AEROOB ± 20 %' }); metaText(ctx, 'PAPADIMITRIOU E.A. 2025', 1800, 480, C.grain, 'right', 26); }); });
    // de zwemmer op het startblok
    ctx.fillStyle = SP2_K.water; ctx.fillRect(1790, SP2_GROND + 10, 130, 20); const s = 380 / 1.8;
    SP2_startblok(ctx, 1790, SP2_GROND - 0.75 * s, s, 1);
    SP2_laag(ctx, 1 - Op, () => SP2_sam(ctx, 1640, t, { h: 380, kijk: 1, uit: 'blij' }));
    SP2_laag(ctx, Op, () => zwemmer(ctx, 'sam', 1790, SP2_GROND - 0.75 * s, 380, { slag: 'startblok', kijk: 1 })); },

  s22(ctx, t, q) { SP2_kant(ctx); SP2_trainer(ctx, 330, t, { h: 440, kijk: 1, uit: t < 2.6 ? 'praat' : 'blij', pose: 'staan' });
    SP2_kaartTekst(ctx, 640, 190, 520, 'BEROEP', ['zwemtrainer'], q.on('zwemtrainer', 1, 0.4), C.goud);
    SP2_kaartTekst(ctx, 640, 360, 520, 'BEROEP', ['inspanningsfysioloog'], q.on('Inspanningsfysiologen', 1, 0.4), C.goud);
    SP2_kaartTekst(ctx, 1210, 190, 640, 'SPORTBOND · TRAINER-COACH', ['niveau 1–6', '(niet elke sport alle niveaus)'], q.on('Trainer', 2, 0.4), C.line, C.goud, 32);
    SP2_kaartTekst(ctx, 1210, 410, 640, 'WO · BEWEGINGSWETENSCHAPPEN', ['Amsterdam (VU) · Groningen (RUG)'], q.on('bewegingswetenschappen', 1, 0.4), C.line, C.goud, 32);
    SP2_kaartTekst(ctx, 1210, 580, 640, 'HBO · SPORTKUNDE', ['Nijmegen (HAN)'], q.on('hbo', 1, 0.4), C.line, C.goud, 32);
    SP2_meta(ctx, 'OPLEIDINGEN · STAND 2026', 1850, 800, q.on('Trainer', 2, 0.4), C.grain, 'right', 26); }
});

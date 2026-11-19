// Wat word jij? · Sport en topsport 3 · Sterk op het droge — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer = Sam (outfit 'zwem' in het bad, 'sport' in de krachtzaal: t-shirt, korte broek, sportschoenen),
// de krachttrainer = nieuw beroepspersonage 'krachttrainer' (teken_sp3.js, ter keuring), de fysiotherapeut = Femke ('werk'),
// de zwemtrainer = 'zwemtrainer', de baangenoot = figurant Daan in zwemkleding (naamloos). Geen namen in beeld.
// Decors (bad, krachtzaal) alleen onder scènes die daar spelen; grafieken, keten en zoomcirkels op navy.

// stroomstreepjes in het water: laten zien dat de zwemmer vooruitgaat terwijl hij stil in beeld blijft
function SP3s_stroom(ctx, t, x0, x1, y0, y1, v = 260, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.35); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 14; i++) { const yy = lerp(y0, y1, hash(i * 3.1)), L = 60 + hash(i * 7.7) * 80, xx = x1 - (((t * v + hash(i * 5.3) * (x1 - x0)) % (x1 - x0 + L))); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + L, yy); ctx.stroke(); } ctx.restore(); }
function SP3s_vraag(ctx, x, y, a, px = 130) { vraagteken(ctx, x, y, a, px); }

Object.assign(SCENES, {
  title(ctx, t) { SP3_lijn(ctx, [[1280, 700], [1840, 700]], rgba('#BFE3F2', 0.6), 3); zwemmer(ctx, 'sam', 1520 + Math.sin(t * 0.6) * 8, 790, 300, { slag: 'stroomlijn', t }); SP3_halter(ctx, 1600, 520, 1.6, 0.95); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const Tc = q.on('Toch', 1, 0.5), Wr = q.on('Waarom', 1, 0.5);
    if (Tc < 1) { bg(ctx, 'schema'); SP3_laag(ctx, 1 - Tc, () => { SP3_bad(ctx, { wl: 230, bodem: 850, t });
      const L = 520; ctx.save(); ctx.translate(900, 560); ctx.rotate(-0.12 + Math.sin(t * 0.8) * 0.02); zwemmer(ctx, 'sam', 0, Math.sin(t * 1.1) * 6, L, { slag: 'stroomlijn', t }); ctx.restore();
      const up = q.on('draagt', 1, 0.6); SP3_pijl(ctx, 900, 740, 900, 740 - 110 * up, C.goud, up, 14); }); }
    if (Tc > 0) { const gy = 760, s = 230, xs = 1330, T0 = q.at('loopt'), Ts = q.at('training') + 0.9; const v = gangSnelheid('sam', 430, 'loop'), x0 = xs - v * (Ts - T0);
      SP3_laag(ctx, Tc, () => { SP3_dek(ctx, 640, gy, 1, t); SP3_deur(ctx, 1460, gy, 250, 1);
        if (t < Ts) persoon(ctx, 'sam', x0, gy, 430, { outfit: 'zwem', zij: true, gang: 'loop', t: Math.max(0, t - T0), vooruit: true, kijk: 1 });
        else persoon(ctx, 'sam', xs, gy, 430, { outfit: 'zwem', zij: true, kijk: 1, uit: q.on('twijfelt', 1, 0.3) > 0.5 ? 'verbaasd' : 'neutraal' });
        SP3_wolk(ctx, 820, 150, 560, 170, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], q.on('twijfelt', 1, 0.4) * (1 - q.on('Waarom', 1, 0.3)), { staart: 1 });
        SP3_laag(ctx, ramp(t, q.at('Waarom') + 0.3, 0.5), () => { SP3_kaart(ctx, 120, 200, 1050, 330, 1, C.goud); text(ctx, 'Water weegt bijna niets.', 170, 320, fTekst(58, 800), C.text, 'left'); text(ctx, 'Waarom de krachtzaal?', 170, 410, fTekst(58, 800), C.goud, 'left'); vraagteken(ctx, 1080, 470, 1, 120); }); }); } },

  // ---------- H1 Afzetten tegen iets vasts ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const St = q.on('start', 1, 0.5), Hv = q.on('Hoeveel', 1, 0.5);
    // A: keerpunt vertraagd, op de rug, voeten tegen de tegels
    SP3_laag(ctx, 1 - St, () => { const muur = 1560, wl = 230; SP3_bad(ctx, { wl, bodem: 850, muur, t });
      const tz = q.at('zet'), bu = t < tz ? lerp(0.55, 1, (t - 0.3) / 2.6) : 1 - ease((t - tz) / 0.9);
      const glide = t > tz + 0.9 ? 760 * (1 - Math.exp(-(t - tz - 0.9) / 1.3)) : 0;
      const r = SP3_muurAfzet(ctx, 'sam', muur - glide, 560, 470, bu, { t });
      const contact = q.on('voeten', 1, 0.4) * (1 - ramp(t, tz + 0.5, 0.3)); SP3_laag(ctx, contact, () => { ctx.fillStyle = rgba(C.goud, 0.85); roundRect(ctx, muur - 6, 500, 14, 130, 6); ctx.fill(); });
      tag(ctx, 'ONDER 0,5 S TEGEN DE MUUR', 1180, 170, C.goud, q.on('seconde', 1, 0.4) * (1 - q.on('gestrekte', 1, 0.5)), 'center', 32);
      const af = q.on('zet', 1, 0.4) * (1 - ramp(t, q.at('Bij') - 0.6, 0.5)); SP3_pijl(ctx, muur - 20, 700, muur - 20 - 420 * ease((t - tz) / 1.2), 700, C.goud, af, 16);
      metaText(ctx, 'VERTRAAGD', 120, 290, C.grain, 'left', 26); });
    // B: de start op het blok, sprong en onderwatertraject
    SP3_laag(ctx, St * (1 - Hv), () => { const s = 240, wl = 520, bx = 330, by = wl - 0.75 * s, L = 430; SP3_bad(ctx, { wl, bodem: 850, t, x0: bx }); const dek = SP3_startKant(ctx, bx, wl, 850, s);
      ctx.fillStyle = '#22324C'; ctx.fillRect(0, 70, bx - 60, dek - 70); SP3_startblok(ctx, bx, by, s);
      const T1 = q.at('afzet') + 0.2, T2 = T1 + 1.3; const m = SP3_maat('sam', L, 'zwem');
      if (t < T1) { const z = zwemmer(ctx, 'sam', bx, by, L, { slag: 'startblok', t }); SP3_wig(ctx, z.wig, s);
        const ga = q.on('afzet', 1, 0.3); SP3_pijl(ctx, bx - 120, by + 10, bx - 20, by - 120, C.goud, ga, 12); }
      else { const h0 = [bx - 1.85 * m.hh, by - 2.05 * m.hh], he = [bx + 2.9 * s, wl + 60]; let hx, hy, p;
        if (t < T2) { const u = (t - T1) / (T2 - T1); hx = lerp(h0[0], he[0], u); hy = lerp(h0[1], he[1], u) - 0.55 * s * 4 * u * (1 - u); const dx = he[0] - h0[0], dy = (he[1] - h0[1]) - 0.55 * s * 4 * (1 - 2 * u); p = Math.atan2(-dy, dx); }
        else { const u = 1 - Math.exp(-(t - T2) / 1.6); hx = he[0] + 560 * u; hy = he[1] + 140 * ease(u * 1.6); p = lerp(-0.55, 0, ease(u * 2.2)); }
        SP3_lijf(ctx, 'sam', hx, hy, L, { naHoofd: true, pitch: p, t });
        SP3_laag(ctx, q.on('vasts', 1, 0.4), () => { ctx.fillStyle = rgba(C.goud, 0.85); roundRect(ctx, bx - 0.7 * s, by - 18, 0.7 * s, 10, 4); ctx.fill(); }); } });
    // C: de vraag: balk zonder verdeling
    SP3_laag(ctx, Hv, () => { SP3s_raceBalk(ctx, 0, 0); SP3s_vraag(ctx, 960, 720, q.on('denk', 1, 0.4), 120); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord c: bijna een derde', 1);
    const D = q.on('derde', 1, 0.6), Af = q.on('afzet', 1, 0.4), Me = q.on('erna', 1, 0.8);
    SP3s_raceBalk(ctx, D, 0, { af: Af * (1 - Me), na: Me, def: Me });
    // 25-meterbad
    SP3_laag(ctx, q.on('vijfentwintig', 1, 0.5), () => { SP3_kaart(ctx, 140, 540, 820, 300, 1, C.oker); metaText(ctx, '25-METERBAD: MEER DAN DE HELFT', 180, 595, C.oker, 'left', 26);
      const x0 = 180, w = 740, y = 650; roundRect(ctx, x0, y, w, 50, 10); shape(ctx, '#2A3446', C.line, 1.5);
      [[0, 15], [20, 35], [45, 60], [70, 85]].forEach(([a, b], i) => { const k = ramp(t, q.at('keerpunten') + i * 0.25, 0.4); if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, x0 + w * a / 100, y, w * (b - a) / 100, 50, 8); shape(ctx, rgba(C.oker, 0.8), C.oker, 2); ctx.restore(); });
      [25, 50, 75].forEach(m => { ctx.fillStyle = SP3.tegelL; ctx.fillRect(x0 + w * m / 100 - 2, y - 12, 4, 74); });
      metaText(ctx, '0', x0, y + 90, C.text2, 'left', 22); metaText(ctx, '100 M', x0 + w, y + 90, C.text2, 'right', 22); metaText(ctx, 'MARINHO E.A. 2020 · BORN E.A. 2021', x0, 815, C.grain, 'left', 20); });
    // sprong en tijd op 15 m
    SP3_laag(ctx, q.on('Britse', 1, 0.5), () => { const x = 1100, y = 640, w = 620, h = 150; SP3_kaart(ctx, x - 70, 540, w + 120, 300, 1, C.line);
      metaText(ctx, 'SPRONGHOOGTE ↔ TIJD OP 15 M', x - 40, 582, C.text2, 'left', 22); metaText(ctx, '11 BRITSE SPRINTERS', x - 40, 612, C.grain, 'left', 20);
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
      metaText(ctx, 'HOGER SPRINGEN →', x + w, y + h + 28, C.text2, 'right', 18); ctx.save(); ctx.translate(x - 16, y + h); ctx.rotate(-Math.PI / 2); metaText(ctx, 'TIJD →', 0, 0, C.text2, 'left', 18); ctx.restore();
      const P = [[0.08, 0.78], [0.16, 0.9], [0.24, 0.55], [0.33, 0.7], [0.41, 0.62], [0.5, 0.38], [0.57, 0.6], [0.66, 0.42], [0.74, 0.25], [0.82, 0.4], [0.92, 0.18]];
      P.forEach(([px, py], i) => { const k = ramp(t, q.at('hoger') + i * 0.08, 0.3); if (k > 0.01) circ(ctx, x + px * w, y + py * h, 11 * k, rgba(C.goud, 0.85), lighten(C.goud, 0.3), 2); });
      tag(ctx, 'VERBAND', x + w - 80, y + 20, C.goud, q.on('verband', 1, 0.4), 'center', 28); metaText(ctx, 'SCHEMATISCH · WEST E.A. 2011', x - 40, 822, C.grain, 'left', 18); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const wl = 350, bod = 840; SP3_bad(ctx, { wl, bodem: bod, t });
    persoon(ctx, 'sam', 620, bod, 600, { outfit: 'zwem', t, uit: 'neutraal' }); SP3_waterVoor(ctx, 0, W, wl, bod, t);
    const T = q.on('tiende', 1, 1.0); SP3_weeg(ctx, 1320, 520, 150, lerp(0.92, 0.1, T), q.on('nek', 1, 0.4), T > 0.95 ? '1/10' : '');
    SP3_laag(ctx, q.on('tiende', 1, 0.4), () => metaText(ctx, 'TOT JE NEK: RUWWEG 1/10 VAN JE GEWICHT', 1320, 760, C.text, 'center', 24));
    SP3s_vraag(ctx, 1000, 300, q.on('Waarom', 1, 0.4), 110); },

  s08(ctx, t, q) { const Kz = q.on('krachtzaal', 1, 0.5), Ex = q.on('explosiviteit', 1, 0.5);
    if (Kz < 1) { bg(ctx, 'schema'); SP3_laag(ctx, 1 - Kz, () => { ctx.fillStyle = SP3.waterT; ctx.fillRect(0, 200, W, 680); ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(W, 200); ctx.stroke();
      const snel = q.on('snelheid', 1, 0.6), f = lerp(0.45, 0.95, snel), ph = t * f * 6.283, A = 260, x = 980 + A * Math.cos(ph), v = -A * f * 6.283 * Math.sin(ph); // v < 0: hand duwt naar links
      SP3_hand(ctx, x, 520, 1.1, SP3.huidSam, 1);
      const kr = q.on('tegenwicht', 1, 0.4), dl = v < 0 ? Math.min(1, Math.pow(-v / 1500, 2)) * 1.6 : 0; for (let i = -1; i <= 1; i++) SP3_pijl(ctx, x - 90, 520 + i * 50, x - 90 - 60 - 260 * dl, 520 + i * 50, C.teal, kr * clamp(dl * 3, 0, 1), 10);
      metaText(ctx, 'TEGENWICHT VAN HET WATER', 140, 290, C.text2, 'left', 26); SP3_laag(ctx, snel, () => metaText(ctx, 'SNELLER DUWEN = MEER TEGENWICHT', 140, 330, C.teal, 'left', 26)); }); }
    if (Kz > 0) SP3_laag(ctx, Kz, () => { SP3_zaal(ctx, 1, { rek: false, raam: false }); SP3_mat(ctx, 1300, 420);
      const n = q.on('kies', 1, 0.4) + q.on('zelf', 1, 0.4) + q.on('stap', 1, 0.4) + q.on('stap', 2, 0.4);
      SP3_laag(ctx, 1 - Ex, () => { SP3_stang(ctx, 900, 520, 560, n); tag(ctx, 'ZELF KIEZEN HOE ZWAAR', 900, 300, C.oker, q.on('kies', 1, 0.4), 'center', 32);
        SP3_laag(ctx, q.on('stap', 1, 0.4), () => { for (let i = 0; i < 4; i++) { const k = ramp(t, q.at('stap') + i * 0.18, 0.3); ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, 1230 - 120 + i * 60, 400 - i * 40, 56, 30 + i * 40, 4); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); ctx.restore(); } metaText(ctx, 'STAP VOOR STAP', 1360, 425, C.groen, 'left', 22); }); });
      persoon(ctx, 'krachttrainer', 430, GROND, 480, { t, uit: 'blij', pose: q.on('zegt', 1) > 0.5 && t < q.at('explosiviteit') ? 'wijs' : 'staan', kijk: 1 });
      // sprong op de mat met een krachtpiek
      const tj = q.at('korte'), ty = t - tj; let pz;
      if (t < tj - 0.6 || Ex < 0.01) pz = null; else if (ty < 0) pz = { hurk: ease((ty + 0.6) / 0.6), up: 0 }; else if (ty < 0.7) pz = { hurk: 0, up: Math.sin(Math.PI * ty / 0.7) }; else pz = { hurk: ty < 1.0 ? (1 - (ty - 0.7) / 0.3) * 0.5 : 0, up: 0 };
      SP3_laag(ctx, Ex, () => { SP3s_springer(ctx, 1510, pz, t);
        SP3_krachtCurve(ctx, 760, 330, 420, 220, clamp((t - tj + 0.4) / 1.2, 0, 1), 1, 1); metaText(ctx, 'IN KORTE TIJD VEEL KRACHT', 970, 640, C.goud, 'center', 22); });
      SP3_meta(ctx, 'ONDER BEGELEIDING', 430, 250, q.on('begeleiding', 1, 0.4), C.groen, 'center', 26); }); },

  // ---------- H2 De romp als brug ----------
  s09(ctx, t, q) { SP3_zaal(ctx, 1); SP3_mat(ctx, 420, 760);
    const sag = 0.24 * ease((t - q.at('tijdje')) / 2.2); const r = SP3_plank(ctx, 'sam', 1050, GROND - 16, 470, { sag, t, an: 0.6 });
    const k = clamp(sag / 0.12, 0, 1), col = k > 0.4 ? C.koraal : C.goud; const L = q.on('ellebogen', 1, 0.5);
    if (sag < 0.02) SP3_lijn(ctx, [[r.schouder.x, r.schouder.y], [r.enkel.x, r.enkel.y]], C.goud, 6, L); else SP3_lijn(ctx, [[r.schouder.x, r.schouder.y], [r.heup.x, r.heup.y], [r.enkel.x, r.enkel.y]], col, 6, L);
    SP3_laag(ctx, q.on('water', 1, 0.5), () => { const x = 1170, y = 160, w = 690, h = 420; roundRect(ctx, x, y, w, h, 18); shape(ctx, '#1A2740', C.teal, 3); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
      SP3_bad(ctx, { wl: y + 120, bodem: y + h, t, x0: x, x1: x + w }); SP3s_stroom(ctx, t, x, x + w, y + 150, y + h - 20, 220);
      const Lz = 300, hx = x + 330, hy = y + 120 + 0.12 * Lz, zak = 0.1 + 0.04 * Math.sin(t * 2.4); ctx.save(); ctx.translate(hx, hy); ctx.rotate(-zak); zwemmer(ctx, 'sam', 0, 0, Lz, { slag: 'crawl', t, tempo: 1 }); ctx.restore();
      const dr = q.on('slingeren', 1, 0.5); for (let i = 0; i < 3; i++) SP3_pijl(ctx, x + 150 - 10 * i, y + 210 + i * 40, x + 150 - 10 * i - 80 - 40 * dr, y + 210 + i * 40, C.koraal, q.on('heup', 2, 0.4), 9);
      ctx.restore(); metaText(ctx, 'ONDER WATER', x + 24, y + 44, C.teal, 'left', 24); });
    SP3s_vraag(ctx, 760, 420, q.on('Waarom', 1, 0.4), 120); },

  s11(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord a: zodat de kracht niet weglekt', 1); const Pr = q.on('proef', 1, 0.6);
    SP3_laag(ctx, 1 - Pr, () => { const n = q.on('benen', 1, 0.3) + q.on('romp', 1, 0.3) + q.on('armen', 1, 0.3) + q.on('hand', 1, 0.3);
      const sl = q.on('slap', 1, 0.6) * (1 - q.on('stevige', 1, 0.6)), lek = q.on('lekt', 1, 0.3) * (1 - q.on('stevige', 1, 0.3));
      const st = q.on('stevige', 1) > 0 ? clamp((t - q.at('stevige')) / 1.4, 0, 1) : clamp((t - q.at('lekt')) / 1.6, 0, 1) * (t > q.at('lekt') ? 1 : 0);
      SP3_keten(ctx, 960, 400, { n, slap: sl, stroom: st, lek, hi: q.on('brug', 1) > 0.5 && sl < 0.1 && t < q.at('slap') ? 1 : -1, s: 0.9 });
      tag(ctx, 'MODEL', 1640, 250, C.text2, q.on('keten', 1, 0.4), 'center', 28);
      // de zwemmer onder de keten: eerst met zakkende heup (koraal), dan recht in de stroomlijn
      const Zh = q.on('heup', 1, 0.4), Sl = q.on('stroomlijn', 1, 0.5), y = 720, Lz = 300;
      SP3_laag(ctx, Zh * (1 - Sl), () => { ctx.save(); ctx.translate(820, y); ctx.rotate(-0.14); zwemmer(ctx, 'sam', 0, 0, Lz, { slag: 'crawl', t }); ctx.restore(); for (let i = 0; i < 3; i++) SP3_pijl(ctx, 640, y + 20 + i * 34, 640 - 70 - 60 * q.on('weerstand', 1, 0.4), y + 20 + i * 34, C.koraal, q.on('weerstand', 1, 0.4), 9); });
      SP3_laag(ctx, Sl, () => { zwemmer(ctx, 'sam', 820, y, Lz, { slag: 'stroomlijn', t }); SP3_lijn(ctx, [[600, y - 60], [1220, y - 60]], C.goud, 3, 0.6, [10, 8]); }); });
    SP3_laag(ctx, Pr, () => { SP3_kaart(ctx, 200, 240, 1520, 600, 1, C.groen); metaText(ctx, 'ROMPTRAINING · 50 M VRIJE SLAG', 250, 300, C.groen, 'left', 28);
      SP3_tekst(ctx, '12 weken, naast het zwemmen', 250, 390, 40, C.text, 'left', q.on('twaalf', 1, 0.4)); SP3_tekst(ctx, '20 junioren, nationaal niveau', 250, 450, 40, C.text, 'left', q.on('jonge', 1, 0.4));
      // staafje met onzekerheidsband
      const x = 1060, w = 560, y = 520, Sn = q.on('twee', 1, 0.8); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 110); ctx.lineTo(x + w, y + 110); ctx.stroke();
      [0, 1, 2, 3, 4, 5].forEach(v => { ctx.beginPath(); ctx.moveTo(x + v / 5 * w, y + 104); ctx.lineTo(x + v / 5 * w, y + 116); ctx.stroke(); metaText(ctx, v + ' %', x + v / 5 * w, y + 146, C.text2, 'center', 18); });
      SP3_laag(ctx, Sn, () => { ctx.fillStyle = rgba(C.groen, 0.22); ctx.fillRect(x + 0.2 / 5 * w, y + 20, 3.6 / 5 * w, 70); roundRect(ctx, x, y + 34, 2 / 5 * w * Sn, 42, 8); shape(ctx, rgba(C.groen, 0.8), C.groen, 2);
        metaText(ctx, '± 2 % SNELLER', x, y - 6, C.groen, 'left', 28); metaText(ctx, 'ONZEKER: 0,2–3,8 %', x + w, y - 6, C.text2, 'right', 22); });
      SP3_meta(ctx, 'KLEINE GROEP · ANDERE TRAININGSGROEP ALS VERGELIJKING', 250, 760, q.on('trainingsgroep', 1, 0.4), C.koraal, 'left', 24); metaText(ctx, 'WESTON E.A. 2015', 1680, 810, C.grain, 'right', 20); }); },

  // ---------- H3 De zwemmersschouder ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const wl = 330; SP3_bad(ctx, { wl, bodem: 850, t }); SP3s_stroom(ctx, t, 0, W, wl + 40, 820, 300);
    zwemmer(ctx, 'sam', 470, wl + 0.12 * 520, 520, { slag: 'crawl', t });
    const A = q.on('achttienduizend', 1, 0.4), cnt = Math.round(18000 * clamp((t - q.at('achttienduizend')) / 1.2, 0, 1) / 100) * 100;
    SP3_laag(ctx, A, () => { text(ctx, '± ' + cnt.toLocaleString('nl-NL'), 1500, 200, fTekst(84, 800), C.goud, 'center'); metaText(ctx, 'PER WEEK · GEMIDDELD', 1500, 250, C.text2, 'center', 24); });
    SP3_laag(ctx, q.on('enquête', 1, 0.5), () => { const x = 1140, y = 400; SP3_kaart(ctx, x, y, 700, 380, 1, C.koraal); metaText(ctx, 'ENQUÊTE VS · 15–17 JAAR', x + 30, y + 50, C.koraal, 'left', 24);
      const u = q.on('helft', 1, 0.8); roundRect(ctx, x + 30, y + 90, 640, 46, 10); shape(ctx, '#2A3446', C.line, 1.5); if (u > 0.01) { roundRect(ctx, x + 30, y + 90, 640 * 0.555 * u, 46, 10); shape(ctx, rgba(C.koraal, 0.8), C.koraal, 2); }
      ctx.fillStyle = C.text2; ctx.fillRect(x + 30 + 320, y + 80, 3, 66);
      SP3_tekst(ctx, 'Meer dan de helft had ooit', x + 30, y + 200, 34, C.text, 'left', u); SP3_tekst(ctx, 'schouderpijn die het trainen', x + 30, y + 244, 34, C.text, 'left', q.on('schouderpijn', 1, 0.4)); SP3_tekst(ctx, 'hinderde', x + 30, y + 288, 34, C.text, 'left', q.on('schouderpijn', 1, 0.4));
      metaText(ctx, 'STIRLING E.A. 2024', x + 670, y + 350, C.grain, 'right', 20); });
    SP3s_vraag(ctx, 640, 230, q.on('gebeurt', 1, 0.4), 100); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord a: de grote binnendraaiers worden vaak het sterkst', 1);
    persoon(ctx, 'sam', 230, 820, 560, { outfit: 'zwem', t }); const sx = 312, sy = 386;
    const G = q.on('grote', 1, 0.5), Bi = q.on('binnen', 1, 0.8), Dk = q.on('sterker', 1, 0.6) * (0.75 + 0.25 * Math.sin(t * 4)), Kl = q.on('kleine', 1, 0.5), Bu = q.on('buiten', 2, 0.8), Ko = q.on('kop', 1, 0.5);
    zoomCircle(ctx, 700, 450, 200, sx, sy, 'VOOR', q.on('slag', 1, 0.5), () => SP3_schouderVoor(ctx, 700, 450, 200, { dik: Dk, binnen: Bi * (1 - Kl), kop: Ko, spiegel: true }));
    SP3_laag(ctx, q.on('rug', 1, 0.5), () => { ctx.save(); ctx.beginPath(); ctx.arc(1180, 450, 200, 0, 6.283); ctx.clip(); SP3_schouderAchter(ctx, 1180, 450, 200, { dik: Dk, klein: Kl, buiten: Bu, kop: Ko, spiegel: true }); ctx.restore(); circ(ctx, 1180, 450, 200, null, C.goud, 1.5); metaText(ctx, 'ACHTER', 1180, 690, C.grain, 'center', 28); });
    naamBij(ctx, 'grote borstspier', '', 700, 300, G, 'center'); naamBij(ctx, 'brede rugspier', '', 1150, 620, q.on('rug', 1, 0.5), 'center'); naamBij(ctx, 'kleine buitendraaiers', '', 1180, 236, Kl, 'center', C.teal);
    // weegschaaltjes: binnen zwaarder (één onderzoek), en een tweede met vraagteken
    const On = q.on('onderzoek', 1, 0.5), Tg = q.on('tegen', 1, 0.5);
    SP3_laag(ctx, On, () => { SP3_balans(ctx, 1660, 560, 0.62, ease((t - q.at('onderzoek')) / 3) * 0.9); tag(ctx, 'VAAK', 1660, 300, C.oker, 1, 'center', 26); metaText(ctx, 'ÉÉN ONDERZOEK:', 1660, 640, C.text2, 'center', 20); metaText(ctx, 'IN ÉÉN SEIZOEN', 1660, 668, C.text2, 'center', 20); metaText(ctx, 'BATALHA E.A. 2014', 1660, 698, C.grain, 'center', 18); });
    SP3_laag(ctx, Tg, () => SP3_balans(ctx, 1660, 850, 0.36, 0.25 * Math.sin(t * 2), 1, { vraag: true })); },

  s15(ctx, t, q) { const St = q.on('Stel', 1, 0.5);
    if (St < 1) SP3_laag(ctx, 1 - St, () => { SP3_zaal(ctx, 1, { rek: false, raam: false }); SP3_paal(ctx, 560);
      const t0 = q.at('elastiek'), rot = t > t0 ? (1 - Math.cos(2 * Math.PI * (t - t0) / 1.7)) / 2 : 0, reps = t > t0 ? Math.floor((t - t0) / 1.7 + 0.5) : 0;
      POSES.sp3_rot = { R: [0.12, lerp(-1.3, 1.15, rot)], L: [0.14, 0.06] }; const r = persoon(ctx, 'sam', 860, GROND, 470, { outfit: 'sport', pose: 'sp3_rot', t });
      SP3_laag(ctx, q.on('elastiek', 1, 0.4), () => { if (r.handR) SP3_lijn(ctx, [[572, r.handR.y + 6], [r.handR.x, r.handR.y]], SP3.elastiek, 7, 1); });
      persoon(ctx, 'femke', 1240, GROND, 460, { outfit: 'werk', t, pose: 'vasthouden', uit: 'blij', hold: (c, x, y) => SP3_stopwatch(c, x - 10, y - 24, 24, '', 1, (t * 0.5) % 1) });
      SP3_laag(ctx, q.on('volhoudt', 1, 0.4) * (1 - q.on('onderzoek', 1, 0.4)), () => { text(ctx, '× ' + reps, 1060, 330, fTekst(60, 800), C.teal, 'center'); metaText(ctx, 'HERHALINGEN', 1060, 372, C.text2, 'center', 20); });
      SP3_meta(ctx, "VOORBEELD VAN ZO'N TEST", 860, 220, q.on('test', 1, 0.4), C.grain, 'center', 26);
      const Ond = q.on('onderzoek', 1, 0.5), In = q.on('ineens', 1, 0.5), Of = q.on('verschil', 1, 0.5);
      SP3_laag(ctx, Ond * (1 - In), () => { SP3_kaart(ctx, 1380, 160, 480, 250, 1, C.teal); text(ctx, '201 jonge zwemmers', 1410, 230, fTekst(38, 800), C.text, 'left'); metaText(ctx, '± 1 JAAR GEVOLGD', 1410, 275, C.text2, 'left', 22);
        SP3_tekst(ctx, 'minder uithouding →', 1410, 322, 28, C.text, 'left', q.on('minder', 1, 0.4)); SP3_tekst(ctx, 'wat vaker pijn', 1410, 360, 28, C.koraal, 'left', q.on('vaker', 1, 0.4)); metaText(ctx, 'FEIJEN E.A. 2021', 1840, 395, C.grain, 'right', 18); });
      SP3_laag(ctx, In * (1 - Of), () => { SP3_kaart(ctx, 1360, 130, 520, 300, 1, C.koraal); SP3_belasting(ctx, 1420, 210, 400, 170, 1, { u: clamp((t - q.at('ineens')) / 1.2, 0, 1) }); tag(ctx, 'NOG ONZEKER', 1620, 190, C.koraal, q.on('onzeker', 1, 0.4), 'center', 24); });
      SP3_laag(ctx, Of, () => { SP3_balans(ctx, 1600, 420, 0.55, 0.6 * Math.sin(t * 1.6)); tag(ctx, 'NIET ZEKER', 1600, 180, C.koraal, 1, 'center', 28); }); });
    if (St > 0) SP3_laag(ctx, St, () => { const gy = 760; SP3_dek(ctx, 560, gy, 1, t); POSES.sp3_hand = { R: [-0.8, -2.4], L: [0.14, 0.06] };
      persoon(ctx, 'sam', 1000, gy, 470, { outfit: 'zwem', pose: 'sp3_hand', uit: 'moe', t }); SP3s_vraag(ctx, 1300, 380, q.on('Wat', 2, 0.4), 120); }); },

  s17(ctx, t, q) { SP3_zaal(ctx, 1, { rek: false, raam: true }); SP3_antw(ctx, 'antwoord b: laten onderzoeken door een fysiotherapeut of sportarts', 1);
    const x = 700, y = 300, w = 520, h = 300; ctx.fillStyle = SP3.rek; ctx.fillRect(x + 80, y + h, 12, GROND - y - h); ctx.fillRect(x + w - 92, y + h, 12, GROND - y - h); SP3_kaart(ctx, x, y, w, h, 1, C.line);
    const m = clamp((t - q.at('Samen')) / 1.8, 0, 1); SP3_belasting(ctx, x + 70, y + 60, w - 120, h - 130, 1, { groen: 0, koraal: 1, m });
    persoon(ctx, 'femke', 470, GROND, 460, { outfit: 'werk', t, pose: q.on('fysiotherapeut', 1) > 0.5 ? 'wijs' : 'staan', uit: 'neutraal' });
    persoon(ctx, 'zwemtrainer', 1460, GROND, 470, { zij: true, kijk: -1, t, uit: q.on('zwemtrainer', 1) > 0.5 ? 'blij' : 'neutraal', arm: q.on('past', 1) > 0.5 ? [1.35, 0.15] : undefined });
    metaText(ctx, 'TRAININGSPLAN', x + w / 2, y + h - 14, C.text2, 'center', 20); },

  // ---------- H4 Wat als je het overslaat? ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); const Ei = q.on('eind', 1, 0.5), L = 260, sA = { wl: 340, bod: 520 }, sB = { wl: 740, bod: 860 }, s = L / 1.79 / 1.04;
    tag(ctx, 'VOORBEELD', 1700, 120, C.text2, 1, 'center', 26);
    SP3_laag(ctx, 1 - Ei, () => { for (const [S, id] of [[sA, 'sam'], [sB, 'daan']]) { SP3_bad(ctx, { wl: S.wl, bodem: S.bod, t }); SP3s_stroom(ctx, t, 0, W, S.wl + 30, S.bod - 10, 280); zwemmer(ctx, id, 760, S.wl + 0.12 * L, L, { slag: 'crawl', t }); }
      SP3_kalender(ctx, 560, 160, 800, clamp((t - q.at('seizoen')) / (q.at('eind') - q.at('seizoen')), 0, 1), q.on('seizoen', 1, 0.4));
      SP3_laag(ctx, q.on('krachtzaal', 1, 0.4), () => { SP3_halter(ctx, 1400, 440, 1.3, 1); metaText(ctx, 'OOK KRACHTZAAL', 1500, 450, C.oker, 'left', 22); });
      SP3_laag(ctx, q.on('extra', 1, 0.4), () => { tag(ctx, '+ EXTRA METERS', 1560, 820, C.teal, 1, 'center', 28); });
      SP3_wolk(ctx, 1080, 550, 470, 130, ['SPIEREN = ZWAAR', 'EN TRAAG?'], q.on('want', 1, 0.4), { staart: -1, px: 32 }); });
    SP3_laag(ctx, Ei, () => { for (const [S, id] of [[sA, 'sam'], [sB, 'daan']]) { const bx = 300, by = S.wl - 0.75 * s; SP3_bad(ctx, { wl: S.wl, bodem: S.bod, t, x0: bx }); const dek = SP3_startKant(ctx, bx, S.wl, S.bod, s); ctx.fillStyle = '#22324C'; ctx.fillRect(0, S.wl - 200, bx - 60, dek - S.wl + 200);
        SP3_startblok(ctx, bx, by, s); const z = zwemmer(ctx, id, bx, by, L, { slag: 'startblok', t }); SP3_wig(ctx, z.wig, s); }
      metaText(ctx, '100 M', 1700, 300, C.text2, 'right', 26); SP3s_vraag(ctx, 1500, 640, q.on('Klopt', 1, 0.4), 110); }); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    const Zp = q.on('Zwemmen', 1, 0.5), Wie = q.on('Wie', 1, 0.5), L = 260;
    // finish: beiden tikken aan; tussen de klokken alleen een bandje
    SP3_laag(ctx, 1 - Zp, () => { [[340, 520, 'sam'], [700, 860, 'daan']].forEach(([wl, bod, id], i) => { SP3_bad(ctx, { wl, bodem: bod, muur: 1560, t });
        const u = clamp(t / 3.4, 0, 1), hx = lerp(900, 1560 - 0.98 * L, ease(u)); if (u < 1) zwemmer(ctx, id, hx, wl + 0.12 * L, L, { slag: 'crawl', t: t + i * 0.3 }); else zwemmer(ctx, id, hx, wl + 0.18 * L, L, { slag: 'stroomlijn', t }); });
      const K = ramp(t, 3.5, 0.4); SP3_stopwatch(ctx, 1740, 300, 50, '', K, 0.62); SP3_stopwatch(ctx, 1740, 600, 50, '', K, 0.63); tag(ctx, '± 2 %?', 1740, 470, C.goud, K, 'center', 28);
      metaText(ctx, 'VOORBEELD · GEEN ECHTE UITSLAG', 1840, 230 - 20, C.grain, 'right', 22); });
    // gemiddeld ± 2 % met spreiding, en de zwemtrainer rekent
    SP3_laag(ctx, Zp * (1 - Wie), () => { const x = 200, y = 300, w = 760; SP3_kaart(ctx, x - 40, y - 60, w + 80, 520, 1, C.groen); metaText(ctx, 'ZWEMMEN + DROOGTRAINING', x, y - 10, C.groen, 'left', 24);
      const X = v => x + (v + 2) / 10 * w, yy = y + 190; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy + 90); ctx.lineTo(x + w, yy + 90); ctx.stroke(); ctx.beginPath(); ctx.moveTo(X(0), yy - 90); ctx.lineTo(X(0), yy + 96); ctx.stroke();
      [-2, 0, 2, 4, 6, 8].forEach(v => metaText(ctx, (v > 0 ? '+' : '') + v + ' %', X(v), yy + 128, C.text2, 'center', 18));
      const g = q.on('gemiddeld', 1, 0.8); SP3_laag(ctx, q.on('gemiddeld', 1, 0.4), () => { ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(-1.45), yy); ctx.lineTo(X(7.5), yy); ctx.moveTo(X(-1.45), yy - 18); ctx.lineTo(X(-1.45), yy + 18); ctx.moveTo(X(7.5), yy - 18); ctx.lineTo(X(7.5), yy + 18); ctx.stroke();
        roundRect(ctx, X(0), yy - 36, (X(2.2) - X(0)) * g, 72, 8); shape(ctx, rgba(C.groen, 0.8), C.groen, 2); metaText(ctx, 'GEMIDDELD ± 2 %', X(2.2), yy - 54, C.groen, 'center', 22); metaText(ctx, 'SPREIDING', X(7.5), yy + 50, C.text2, 'right', 18); });
      SP3_meta(ctx, 'KLEINE GROEPEN · VOORAL 50 M EN LANGER', x, y + 400, q.on('groepen', 1, 0.4), C.koraal, 'left', 22); metaText(ctx, 'FONE & VAN DEN TILLAAR 2022', x, y + 440, C.grain, 'left', 18);
      SP3_laag(ctx, q.on('zwemtrainer', 1, 0.4), () => { ctx.fillStyle = SP3.vloer; ctx.fillRect(1100, 800, 820, 8); persoon(ctx, 'zwemtrainer', 1240, 800, 470, { t, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => SP3_stopwatch(c, hx, hy - 20, 22, '', 1, 0.6) });
        SP3_stopwatch(ctx, 1620, 420, 90, '', 1, clamp((t - q.at('rekent')) / 3, 0, 1));
        SP3_tekst(ctx, '1:00,0', 1620, 590, 48, C.text, 'center', q.on('minuut', 1, 0.4)); SP3_tekst(ctx, '→ 0:58,8', 1620, 650, 48, C.groen, 'center', q.on('seconde', 1, 0.4)); metaText(ctx, '2 % VAN 60 S = 1,2 S', 1620, 700, C.text2, 'center', 20); }); });
    // wat je laat liggen: drie pictogrammen; de bewegingswetenschapper zoekt verder
    SP3_laag(ctx, Wie, () => { const y = 380, W3 = q.on('Welke', 1, 0.5), g = 0.3;
      metaText(ctx, 'WAT JE LAAT LIGGEN ALS JE HET OVERSLAAT', 960, 230, C.koraal, 'center', 24);
      SP3_icoonAfzet(ctx, 520, y, 1.2, Math.max(g, q.on('Afzet', 1, 0.4))); SP3_icoonKeten(ctx, 960, y, 1, g * (1 - q.on('romp', 1, 0.4))); SP3_icoonSchouder(ctx, 1400, y, 1, g * (1 - q.on('schouder', 1, 0.4))); naamBij(ctx, 'afzet', 'blok en muur', 520, y + 170, q.on('Afzet', 1, 0.4), 'center');
      SP3_icoonKeten(ctx, 960, y, 1, q.on('romp', 1, 0.4)); naamBij(ctx, 'stevige romp', '', 960, y + 170, q.on('romp', 1, 0.4), 'center');
      SP3_icoonSchouder(ctx, 1400, y, 1, q.on('schouder', 1, 0.4)); naamBij(ctx, 'schouder', 'heel seizoen', 1400, y + 170, q.on('schouder', 1, 0.4), 'center');
      SP3_laag(ctx, W3, () => { SP3_kaart(ctx, 660, 610, 600, 230, 1, C.teal); SP3_meet(ctx, 900, 700, 1, 1); metaText(ctx, 'BEWEGINGSWETENSCHAPPER', 960, 815, C.teal, 'center', 22); vraagteken(ctx, 1170, 760, 1, 90); }); });
    SP3_antw(ctx, 'antwoord a: nee, meestal werden ze er juist iets sneller van', 1); },

  // ---------- Recap ----------
  s21(ctx, t, q) { const Kt = q.on('keten', 1, 0.5), Zw = q.on('zwemtrainer', 1, 0.5);
    if (Kt < 1) SP3_laag(ctx, 1 - Kt, () => { SP3_zaal(ctx, 1); const n = q.on('droge', 1, 0.4) + q.on('kan', 1, 0.4) + q.on('wel', 1, 0.4); SP3_stang(ctx, 960, 520, 560, n);
      persoon(ctx, 'sam', 1420, GROND, 470, { outfit: 'sport', t, uit: 'blij' }); SP3_wolk(ctx, 1080, 140, 560, 170, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], 1, { staart: 1 }); });
    if (Kt > 0 && Zw < 1) SP3_laag(ctx, Kt * (1 - Zw), () => { bg(ctx, 'schema'); const Sp = q.on('sprong', 1, 0.4), Ro = q.on('romp', 1, 0.4), Sc = q.on('schouder', 1, 0.4), Tr = q.on('Trager', 1, 0.5);
      const hi = Sc > 0.5 ? 2 : Ro > 0.5 ? 1 : Sp > 0.5 ? 0 : -1; SP3_keten(ctx, 960, 330, { s: 0.9, hi, stroom: 1, labA: 0.6 });
      tag(ctx, 'SPRONG → START EN KEERPUNT', 300, 560, C.goud, Sp, 'left', 36); tag(ctx, 'ROMP → DE BRUG', 300, 650, C.goud, Ro, 'left', 36); tag(ctx, 'SCHOUDER → HET HELE SEIZOEN HEEL', 300, 740, C.goud, Sc, 'left', 36);
      SP3_wolk(ctx, 1260, 560, 520, 160, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], Tr, { staart: -1, px: 30, door: 'TRAAG', doorU: clamp((t - q.at('Trager') - 0.3) / 0.6, 0, 1) });
      SP3_meta(ctx, 'MEESTAL EERDER IETS SNELLER', 1520, 790, q.on('sneller', 1, 0.4), C.groen, 'center', 22); });
    if (Zw > 0) SP3_laag(ctx, Zw, () => { SP3_zaal(ctx, 1, { rek: false });
      persoon(ctx, 'zwemtrainer', 560, GROND, 470, { t, uit: 'blij' }); persoon(ctx, 'krachttrainer', 900, GROND, 480, { t, uit: 'blij' }); persoon(ctx, 'femke', 1240, GROND, 460, { outfit: 'werk', t, uit: 'blij' });
      naamBij(ctx, 'zwemtrainer', '', 560, 270, q.on('zwemtrainer', 1, 0.4), 'center'); naamBij(ctx, 'krachttrainer', '', 900, 250, q.on('krachttrainer', 1, 0.4), 'center'); naamBij(ctx, 'fysiotherapeut', '', 1240, 270, q.on('fysiotherapeut', 1, 0.4), 'center');
      SP3_laag(ctx, q.on('plannen', 1, 0.4), () => { SP3_kaart(ctx, 1460, 520, 400, 250, 1, C.teal); SP3_meet(ctx, 1640, 610, 0.9, 1); metaText(ctx, 'BEWEGINGS-', 1660, 720, C.teal, 'center', 20); metaText(ctx, 'WETENSCHAPPER', 1660, 748, C.teal, 'center', 20); }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = (y, a, kop, sub, ico) => SP3_laag(ctx, a, () => { SP3_kaart(ctx, 160, y, 1600, 150, 1, C.line); ico(260, y + 75); metaText(ctx, kop, 380, y + 66, C.goud, 'left', 26); if (sub) metaText(ctx, sub, 380, y + 112, C.text2, 'left', 22); });
    rij(270, q.on('Sportfysiotherapeut', 1, 0.4), 'HBO · FYSIOTHERAPIE → MASTER SPORTFYSIOTHERAPIE', 'SPORTFYSIOTHERAPEUT', (x, y) => gezichtIcoon(ctx, x, y, 1, 1, 'femke'));
    rij(450, q.on('Trainer', 1, 0.4), 'HBO · SPORTKUNDE', 'BIJVOORBEELD ZWEMTRAINER OF KRACHTTRAINER', (x, y) => gezichtIcoon(ctx, x, y, 1, 1, 'zwemtrainer'));
    rij(630, q.on('Bewegingswetenschappen', 1, 0.4), 'WO · BEWEGINGSWETENSCHAPPEN · 3 JAAR', 'AMSTERDAM (VU) · GRONINGEN (RUG)', (x, y) => SP3_meet(ctx, x - 20, y - 10, 0.55, 1)); },
});

// balk 'RACE 100 M · VIJFTIGMETERBAD'; D = verdeling zichtbaar (0..1), o.af = alleen het afzetmoment bij de muur, o.na = ook de meters erna, o.def = definitie
function SP3s_raceBalk(ctx, D, _, o = {}) { const { af = 0, na = 0, def = 0 } = o; const x0 = 260, w = 1400, y = 330, h = 74;
  metaText(ctx, 'RACE 100 M · VIJFTIGMETERBAD', x0, y - 96, C.text2, 'left', 26);
  roundRect(ctx, x0, y, w, h, 12); shape(ctx, '#2A3446', C.line, 2); const X = m => x0 + w * m / 100;
  ctx.fillStyle = SP3.tegelL; ctx.fillRect(X(50) - 3, y - 18, 6, h + 36); metaText(ctx, 'MUUR', X(50) + 14, y - 26, C.text2, 'left', 20);
  [0, 50, 100].forEach(m => metaText(ctx, m + ' M', X(m), y + h + 32, C.text2, m === 0 ? 'left' : m === 100 ? 'right' : 'center', 20));
  if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; [[0, 15], [45, 60]].forEach(([a, b]) => { roundRect(ctx, X(a), y, X(b) - X(a), h, 10); shape(ctx, rgba(C.oker, 0.8), C.oker, 2.5); });
    tag(ctx, 'BIJNA 1/3 VAN DE TIJD', X(30), y - 30, C.oker, 1, 'center', 30); metaText(ctx, '15 M ≈ 1/10', X(7.5), y + h / 2 + 8, '#1A2740', 'center', 22); ctx.restore(); }
  if (af > 0.01) { ctx.save(); ctx.globalAlpha *= af; roundRect(ctx, X(49), y - 8, X(51) - X(49), h + 16, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  if (na > 0.01) { ctx.save(); ctx.globalAlpha *= na; roundRect(ctx, X(49), y - 8, (X(60) - X(49)) * clamp(na, 0, 1), h + 16, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  SP3_meta(ctx, 'START = EERSTE 15 M · KEERPUNT = 5 M VOOR TOT 10 M NA DE MUUR', x0 + w / 2, y + h + 76, def, C.grain, 'center', 22); }
// sprong op de mat (zijaanzicht): pz = null (staan), {hurk 0..1, up 0..1}
function SP3s_springer(ctx, x, pz, t) { const o = { outfit: 'sport', zij: true, kijk: -1, t, uit: 'neutraal' };
  if (!pz) return persoon(ctx, 'sam', x, GROND - 16, 470, o);
  if (pz.up > 0.01) return persoon(ctx, 'sam', x, GROND - 16 - 80 * pz.up, 470, Object.assign(o, { vrij: true, been1: { th: 0.05, kn: 0.1, an: -0.6 }, been2: { th: 0, kn: 0.1, an: -0.6 }, arm: [2.8, 0.1], armVer: [2.7, 0.1] }));
  const k = pz.hurk; return persoon(ctx, 'sam', x, GROND - 16, 470, Object.assign(o, { voorover: 0.45 * k, been1: { th: 1.2 * k, kn: 1.8 * k, an: 0.5 * k }, been2: { th: 1.15 * k, kn: 1.8 * k, an: 0.5 * k }, arm: [-0.9 * k + 0.1 * (1 - k), 0.3 * k + 0.1], armVer: [-0.9 * k + 0.1 * (1 - k), 0.3 * k + 0.1] })); }

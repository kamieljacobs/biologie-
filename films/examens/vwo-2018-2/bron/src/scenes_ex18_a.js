// Examenbespreking vwo 2018-II — scènes deel a: opening (s01–s02), zo lees je een examenvraag (s04–s06), De lauwbloedige koningsvis (s07–s26).

function a_gewoonte(ctx, n, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) circ(ctx, 92 + i * 34, 76, 11, i < n ? C.goud : 'rgba(0,0,0,0)', C.goud, 2.5);
  metaText(ctx, 'GEWOONTE ' + n + ' · ' + s, 92 + 3 * 34 + 10, 86, C.text, 'left', 28); ctx.restore(); }
function a_vispunt(x, y, s, fx, fy) { return [x + fx * s, y + fy * s]; }
// warmtepijlen rond een ellips (vis), naar buiten
function a_warmteRond(ctx, x, y, rx, ry, n, len, a, t, lw = 4) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const an = (i + 0.5) / n * 6.283; const nx = Math.cos(an), ny = Math.sin(an); a_warmtePijl(ctx, x + nx * rx, y + ny * ry, nx, ny, len, a, t + i * 0.37, A_WARM, lw); } }
function a_krill(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E8946A'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 14, 0.3, 3.6); ctx.stroke(); circ(ctx, 12, 6, 3, '#121A26'); ctx.restore(); }

Object.assign(SCENES, {
  // ---------- Opening ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const tUur = q.on('drie', 1, 1.5);
    a_zaal(ctx, t, { uur: 1.5 + 0.12 * Math.min(t, 20) / 20, sector: tUur, pose: t > q.at('gevraagd', 1) && t < q.at('antwoord', 1) ? 'denk' : 'staan', uit: t > q.at('antwoord', 1) ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Noor', '', 410, 400, q.on('Dit', 1, 0.5) * (1 - q.on('Achtendertig', 1)), 'center');
    metaA_(ctx, 'VWO · BIOLOGIE · 2018 · TIJDVAK 2', 1250, 150, q.on('examen', 1), C.goud, 'left', 26);
    a_teller(ctx, 1450, 300, Math.round(38 * q.on('Achtendertig', 1, 0.9)), 'vragen', q.on('Achtendertig', 1, 0.3));
    a_teller(ctx, 1450, 450, Math.round(70 * q.on('zeventig', 1, 0.9)), 'punten', q.on('zeventig', 1, 0.3));
    a_teller(ctx, 1450, 600, 3, 'uur', q.on('drie', 1, 0.3));
    // per vraag: vraag → stof → antwoord
    const st = [['vraag', 'gevraagd', C.goud], ['stof', 'stof', C.teal], ['antwoord', 'antwoord', C.groen]];
    st.forEach(([s2, w, col], i) => { const a = q.on(w, 1, 0.4); const x = 1250 + i * 210; a_alpha(ctx, a, () => { roundRect(ctx, x, 690, 170, 76, 38); shape(ctx, rgba(col, 0.16), col, 2.5); text(ctx, s2, x + 85, 739, fTekst(32, 700), C.text, 'center'); });
      if (i < 2) pijl(ctx, x + 176, 728, x + 204, 728, C.line, q.on(st[i + 1][1], 1, 0.4), 3, 12); });
    metaA_(ctx, 'ELKE VRAAG', 1250, 660, q.on('elke', 1), C.text2, 'left', 22); },

  s02(ctx, t, q) { bg(ctx, 'schema'); metaA_(ctx, 'VIJF CONTEXTEN', W / 2, 140, q.on('Vijf', 1, 0.4), C.goud, 'center', 30);
    const cues = ['lauwbloedige', 'eilandjes', 'erfelijke', 'waterstofgas', 'muizenplagen'];
    const titels = ['De lauwbloedige koningsvis', 'Nieuwe eilandjes voor de alvleesklier', 'Een bijzondere band tussen grootvader en kleinkind', 'Biologische productie van waterstofgas', 'Wat te doen aan de muizenplagen?'];
    const iconen = [(x, y) => a_koningsvis(ctx, x, y + 10, 0.38, { t, warm: 0.5 }), (x, y) => a_eilandje(ctx, x, y + 10, 0.85, t), (x, y) => { persoon(ctx, 'henk', x - 50, y + 105, 210, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'kind', x + 60, y + 105, 140, { t, kijk: -1, uit: 'blij' }); }, (x, y) => a_waterstof(ctx, x, y + 20, 1, t), (x, y) => a_muisje(ctx, x + 20, y + 20, 0.62)];
    const w = 330, gap = 24, x0 = (W - (5 * w + 4 * gap)) / 2;
    titels.forEach((s2, i) => { const a = q.on(cues[i], 1, 0.5); const nu = i < 4 ? t >= q.at(cues[i], 1) && t < q.at(cues[i + 1], 1) : t >= q.at(cues[i], 1); a_kaart(ctx, x0 + i * (w + gap), 200, w, 480, i + 1, s2, a, nu ? 1 : 0, iconen[i]); }); },

  // ---------- Zo lees je een examenvraag ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 1, 'PUNTEN', q.on('eerste', 1, 0.4));
    const mc = ramp(t, q.at('meerkeuze', 1) + 0.25, 0.4);
    a_vraagRegel(ctx, 160, 150, 1600, { a: ramp(t, 0.2, 0.6), hp: q.on('aantal', 1, 0.8) });
    const vk = q.on('Twee', 1, 0.4) * (1 - ramp(t, q.at('Bij', 1), 0.25)), d3 = q.on('Drie', 2, 0.4), d1 = t > q.at('dingen', 1) + 0.3 ? 1 : 0, d2 = t > q.at('dingen', 1) + 0.8 ? 1 : 0, e3 = t > q.at('dingen', 2) + 0.3 ? 1 : 0;
    a_vakjes(ctx, 160, 440, 3, vk, [d1, d2, e3], [1, 1, d3]); const v2 = vk, v3 = 0;
    metaA_(ctx, '= dingen in je antwoord', 160, 610, Math.max(v2, v3), C.text2, 'left', 24);
    // meerkeuze en wel/niet: altijd 2p
    a_alpha(ctx, mc, () => { a_wwKaart(ctx, 160, 440, 520, 'A  B  C  D', 'meerkeuze', 1); a_wwKaart(ctx, 740, 440, 520, 'wel / niet', 'drie beweringen', q.on('niet', 1, 0.5)); });
    const al = q.on('altijd', 1, 0.5); stempel(ctx, 600, 470, '2p', C.goud, al, -0.12); stempel(ctx, 1180, 470, '2p', C.goud, al * q.on('niet', 1, 0.5), -0.12);
    metaA_(ctx, 'telt niet als dingen', 160, 670, q.on('geldt', 1, 0.5), C.koraal, 'left', 24); },

  s05(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 2, 'WERKWOORD', q.on('tweede', 1, 0.4));
    a_vraagRegel(ctx, 160, 150, 1600, { a: ramp(t, 0.2, 0.6), hw: q.on('werkwoord', 1, 0.8) });
    const hN = t >= q.at('noem', 1) && t < q.at('Leg', 1) ? 1 : 0, hL = t >= q.at('Leg', 1) ? 1 : 0;
    a_wwKaart(ctx, 160, 410, 500, 'Noem', 'naam of feit', q.on('noem', 1, 0.5), hN, C.teal);
    a_wwKaart(ctx, 710, 410, 500, 'Leg uit', 'keten', q.on('Leg', 1, 0.5), hL); a_wwKaart(ctx, 1260, 410, 500, 'Verklaar', 'keten', q.on('verklaar', 1, 0.5), hL);
    const b = q.on('begin', 1, 0.4), e = q.on('eind', 1, 0.4);
    const dimB = b * (1 - e), dimE = e; // alleen begin → middelste en laatste weg; alleen eind → eerste en middelste weg
    ketting(ctx, [{ t: 'oorzaak', a: q.on('oorzaak', 1, 0.5) * (1 - 0.75 * dimE) }, { t: 'tussenstap', a: q.on('tussenstap', 1, 0.5) * (1 - 0.75 * Math.max(dimB, dimE)), col: C.teal }, { t: 'gevolg uit de vraag', a: q.on('gevolg', 1, 0.5) * (1 - 0.75 * dimB), col: C.groen }], 220, 720, 1480, 1, { px: 34 });
    kruis(ctx, 960, 650, 22, q.on('mist', 1, 0.4)); },

  s06(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 3, 'TEKST LEZEN', q.on('derde', 1, 0.4)); const kl = q.on('Reken', 1, 0.6);
    a_contextTekst(ctx, 120, 160, 1150, q.on('zin', 1, 1.6), ramp(t, 0.6, 0.6));
    ketting(ctx, [{ t: 'oorzaak', a: 0.5 }, { t: 'tussenstap', col: C.teal }, { t: 'gevolg', a: 0.5, col: C.groen }], 120, 640, 1150, q.on('tussenstap', 1, 0.5), { px: 32 });
    a_alpha(ctx, kl, () => { a_wandklok(ctx, 1590, 380, 170, 1.5 + 0.25 * clamp((t - q.at('Reken', 1)) / 6, 0, 1), 1, clamp((t - q.at('Reken', 1)) / 6, 0, 1) * 0.0139 * 6 + 0.0001);
      text(ctx, '≈ 2,5 min', 1590, 640, fTitel(60), C.goud, 'center'); text(ctx, 'per punt', 1590, 690, fTekst(34, 600), C.text, 'center'); metaA_(ctx, '70 punten · 180 minuten', 1590, 750, q.on('minuut', 1, 0.6), C.text2, 'center', 22); }); },

  // ---------- De lauwbloedige koningsvis ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX, ramp(t, 0.2)); a_water(ctx, 60, 130, 1800, 740, ramp(t, 0, 0.6), t);
    const w = q.on('warmer', 1, 1.2), en = q.on('endotherm', 1, 0.6); const fy = 500 + Math.sin(t * 0.9) * 8;
    a_koningsvis(ctx, 960, fy, 1.15, { t, a: ramp(t, 0.3, 0.8), warm: w * (0.75 + 0.25 * Math.sin(t * 2.4) * en), hlVin: q.on('borstvinnen', 1, 0.5) * (1 - w) });
    naamBij(ctx, 'koningsvis', 'Lampris guttatus', 1220, 260, q.on('koningsvis', 1, 0.5) * (1 - q.on('borstvinnen', 1)), 'left');
    naamBij(ctx, 'borstvin', '', 700, fy - 110, q.on('borstvinnen', 1, 0.5) * (1 - w), 'right');
    a_thermo(ctx, 240, 760, 300, 0.32, '9 °C', A_KOUD, w); metaA_(ctx, 'WATER', 240, 820, w, C.text2, 'center', 22);
    a_thermo(ctx, 1680, 760, 300, 0.55, '14 °C', A_WARM, w); metaA_(ctx, 'VIS', 1680, 820, w, C.text2, 'center', 22);
    a_alpha(ctx, en, () => { for (let i = 0; i < 6; i++) { const an = -0.9 + i * 0.36; a_warmtePijl(ctx, 960 + Math.cos(an) * 60, fy + Math.sin(an) * 50 - 10, Math.cos(an), Math.sin(an), 70, 0.8, t + i * 0.4); } });
    naamBij(ctx, 'endotherm', 'maakt zelf warmte', 960, 850, en, 'center'); },

  s08(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Leg uit', 'Waarom is endotherm zijn ongunstig voor kleine vissoorten?', 70, 170, 860, q.on('Leg', 1, 0.5));
    const k = q.on('kleine', 1, 0.6), o = q.on('oppervlakte', 1, 0.6);
    a_water(ctx, 1000, 170, 860, 640, ramp(t, 0.2, 0.6), t);
    a_koningsvis(ctx, 1330, 480, 0.62, { t, warm: 0.6, a: ramp(t, 0.3, 0.6) }); a_koningsvis(ctx, 1700, 500 + Math.sin(t * 2) * 6, 0.22, { t: t * 1.6, warm: 0.6, a: k });
    naamBij(ctx, 'groot', '', 1330, 790, k, 'center'); naamBij(ctx, 'klein', '', 1700, 600, k, 'center');
    a_alpha(ctx, o, () => { text(ctx, 'oppervlakte', 1720, 270, fTekst(34, 600), C.goud, 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1630, 284); ctx.lineTo(1810, 284); ctx.stroke(); text(ctx, 'inhoud', 1720, 322, fTekst(34, 600), C.goud, 'center'); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2);
    a_water(ctx, 60, 140, 1800, 730, 1, t); metaA_(ctx, 'KOUD WATER', 100, 190, ramp(t, 0.2), '#9CC0E8', 'left', 22);
    const vol = q.on('volume', 1, 0.8), opp = q.on('oppervlak', 1, 0.6), gr = q.on('gram', 1, 0.6), ve = q.on('verliest', 2, 1.5);
    const bx = 640, by = 470, sx = 1450, sy = 500;
    a_koningsvis(ctx, bx, by, 0.85, { t, warm: 0.25 + 0.55 * vol }); a_koningsvis(ctx, sx, sy, 0.3, { t: t * 1.5, warm: (0.25 + 0.55 * vol) * (1 - 0.6 * ve) });
    a_warmteRond(ctx, bx - 20, by, 200, 140, 10, 46, opp, t); a_warmteRond(ctx, sx - 8, sy, 72, 50, 8, 46 + 14 * ve, opp * (1 + 0 * ve), t, 4 + 2 * ve);
    naamBij(ctx, 'warmte maken', 'hele volume', bx, by + 215, vol * (1 - opp), 'center');
    balk(ctx, 440, 770, 400, 0.28 * gr, C.goud, 'oppervlak per gram', gr); balk(ctx, 1250, 770, 400, 0.85 * gr, C.goud, 'oppervlak per gram', gr);
    naamBij(ctx, 'verliest naar verhouding meer', '', sx, 680, ve, 'center', C.koraal); },

  s10(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2);
    const tip = q.on('Let', 1, 0.5);
    punten(ctx, [{ t: 'Kleine vis verliest door groot oppervlak naar verhouding meer warmte', a: q.on('Eén', 1, 0.5), v: q.on('warmte', 1, 0.4) },
      { t: 'Dus naar verhouding meer voedsel en energie nodig', a: q.on('Twee', 2, 0.5), v: q.on('energie', 1, 0.4) }], 70, 190, 1080, 1);
    a_alpha(ctx, q.on('ongunstige', 1, 0.5), () => { roundRect(ctx, 62, 332, 1096, 100, 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
    tipKaart(ctx, "Alleen ‘ze verliezen meer warmte’ is één punt. Het ongunstige is de energie.", 70, 560, 1080, tip);
    // rechts: kleine vis die warmte verliest en veel moet eten
    a_water(ctx, 1220, 190, 640, 560, 1, t); const fx = 1560, fy = 470 + Math.sin(t * 2) * 6;
    a_koningsvis(ctx, fx, fy, 0.42, { t: t * 1.5, warm: 0.6 }); a_warmteRond(ctx, fx - 10, fy, 100, 68, 8, 40, q.on('warmte', 1, 0.5), t);
    const vo = q.on('voedsel', 1, 0.6); for (let i = 0; i < 6; i++) { const ph = ((t * 0.35 + i / 6) % 1); a_krill(ctx, 1840 - ph * 200, fy - 60 + i * 22 + Math.sin(t * 3 + i) * 8, 0.9, vo * (1 - ph) * (ph > 0.05 ? 1 : ph * 20)); }
    naamBij(ctx, 'veel eten', '', 1720, 700, vo, 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Leg uit', 'Hoe helpt veel myoglobine de koningsvis bij het jagen?', 70, 170, 860, q.on('Leg', 1, 0.5));
    a_water(ctx, 1000, 170, 860, 640, ramp(t, 0.2, 0.6), t); const dr = q.on('donkerrood', 1, 0.8);
    a_koningsvis(ctx, 1450, 490, 0.85, { t, a: ramp(t, 0.3, 0.6), vlek: (c) => { if (dr <= 0.01) return; c.save(); c.globalAlpha *= dr; c.beginPath(); c.ellipse(40, 0, 120, 70, 0, 0, 6.283); c.fillStyle = 'rgba(110,20,30,0.85)'; c.fill(); c.restore(); } });
    naamBij(ctx, 'donkerrode spieren', 'veel myoglobine', 1450, 760, dr, 'center'); },

  s12(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2);
    const hard = q.on('hard', 1, 0.6), los = q.on('los', 1, 1.6), daal = q.on('daalt', 1, 1);
    a_haarvat(ctx, 200, 210, 1520, ramp(t, 0.2, 0.6), t); naamBij(ctx, 'bloed', 'hemoglobine', 420, 135, q.on('hemoglobine', 1, 0.5), 'left');
    const knijp = hard * (0.5 + 0.5 * Math.sin(t * 6)); a_spiercel(ctx, 960, 500, 1560, 300, ramp(t, 0, 0.6), knijp);
    naamBij(ctx, 'spiercel', '', 220, 700, ramp(t, 0.4, 0.6) * (1 - q.on('Het', 1)), 'left');
    const mito = [[420, 560], [760, 430], [1130, 570], [1480, 440]]; mito.forEach(([x, y], i) => mitochondrion(ctx, x, y, 110, i % 2 ? 0.3 : -0.2, q.on('Als', 3, 0.6), 4, t));
    const myo = [[320, 430], [560, 520], [640, 400], [930, 470], [1010, 580], [1270, 450], [1350, 560], [1620, 520]];
    const bind = q.on('bindt', 1, 0.8);
    myo.forEach(([x, y], i) => { a_myoglobine(ctx, x, y, 1.05, q.on('eiwit', 1, 0.6), i * 1.3, t);
      const d = clamp(los * 1.3 - i * 0.05, 0, 1); const [mx, my] = mito[Math.min(3, Math.floor(i / 2))]; const ox = lerp(x, mx, ease(d)), oy = lerp(y - 40, my, ease(d)) + Math.sin(d * 3.14) * -40;
      a_o2(ctx, ox, oy, 1, bind * (1 - clamp((d - 0.85) / 0.15, 0, 1))); });
    naamBij(ctx, 'myoglobine', '', 640, 345, q.on('eiwit', 1, 0.5) * (1 - q.on('voorraad', 1)), 'center');
    tag(ctx, 'O₂-voorraad', 960, 720, C.teal, q.on('voorraad', 1, 0.5) * (1 - q.on('Als', 3, 0.5)), 'center', 32);
    naamBij(ctx, 'mitochondrion', 'gebruikt O₂', 1480, 720, q.on('Als', 3, 0.5), 'center');
    a_alpha(ctx, daal, () => { metaText(ctx, 'ZUURSTOFDRUK', 1780, 300, C.text2, 'right', 20); balk(ctx, 1540, 326, 240, 0.85 - 0.6 * daal, C.teal, '', 1); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2);
    punten(ctx, [{ t: 'Myoglobine slaat extra O₂ op, die vrijkomt bij veel verbruik', a: q.on('antwoord', 1, 0.5), v: q.on('vrijkomt', 1, 0.4) },
      { t: 'Spieren dissimileren langer aeroob en maken meer energie vrij', a: q.on('Daardoor', 1, 0.5), v: q.on('energie', 1, 0.4) }], 70, 190, 1080, 1);
    tipKaart(ctx, 'Maak de keten af tot in de context: de vis kan langer jagen.', 70, 520, 1080, q.on('Tip', 1, 0.5));
    // jacht rechts
    a_water(ctx, 1220, 190, 640, 560, 1, t); const ch = q.on('prooi', 1, 1); const ph = (t * 0.25) % 1;
    const px = 1760 + Math.sin(t * 1.3) * 30, py = 360 + Math.sin(t * 0.9) * 50; a_koningsvis(ctx, px, py, 0.16, { t: t * 2, a: ch });
    a_koningsvis(ctx, lerp(1420, px - 170, 0.5 + 0.5 * Math.sin(t * 0.6) * ch * 0.4 + 0.1 * ch), lerp(500, py + 60, ch), 0.45, { t: t * (1 + ch), warm: 0.5 });
    naamBij(ctx, 'prooi', '', px, py - 70, ch, 'center'); naamBij(ctx, 'jaagt langer', '', 1540, 720, q.on('jagen', 1, 0.5), 'center', C.groen); },

  s14(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX);
    const rows = ['borstvinspier', 'hart', 'schedel', 'buikholte', 'datarecorder']; const ra = rows.map((w, i) => q.on(w, 1, 0.5));
    const nu = rows.map((w, i) => (t >= q.at(w, 1) && (i === 4 || t < q.at(rows[i + 1], 1))) ? 1 : 0);
    a_tabel(ctx, 110, 290, 0.95, { a: q.on('tabel', 1, 0.6), rijA: ra, rij: nu });
    a_water(ctx, 1270, 190, 600, 600, ramp(t, 0.3, 0.6), t); const X = 1570, Y = 480, s = 0.62;
    a_koningsvis(ctx, X, Y, s, { t, zwem: 0.4 });
    const plek = [[40, -8], [140, 70], [125, -80], [10, 68]]; plek.forEach(([fx, fy], i) => { const [px, py] = a_vispunt(X, Y, s, fx, fy); const a = ra[i]; if (a <= 0.01) return; circ(ctx, px, py, 12 + 6 * nu[i], C.goud, '#121A26', 2); });
    rows.slice(0, 4).forEach((w, i) => { const [px, py] = a_vispunt(X, Y, s, plek[i][0], plek[i][1]); naamBij(ctx, w, '', px, py + (i === 2 ? -26 : 48), nu[i] * ra[i], 'center'); });
    const dr = ra[4]; a_alpha(ctx, dr, () => { const [px, py] = a_vispunt(X, Y, s, -60, -120); roundRect(ctx, px - 30, py - 16, 60, 32, 8); shape(ctx, '#E0B64A', '#121A26', 2); circ(ctx, px + 18, py, 4, '#7FC48F'); });
    naamBij(ctx, 'datarecorder', '', X - 40, 270, dr, 'center'); },

  s15(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 3, 1, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'Waarom is de buikholte toch bijna even warm als de borstvinspier?', 70, 170, 900, q.on('Verklaar', 1, 0.5));
    punten(ctx, [{ t: 'Bloed vervoert warmte van de borstvinspieren naar de buikholte', a: q.on('antwoord', 1, 0.5), v: q.on('vervoert', 1, 0.4) },
      { t: 'Of: buikholte heeft groot volume en houdt warmte goed vast', p: 'of', a: q.on('Ook', 1, 0.5), v: q.on('volume', 1, 0.4) }], 70, 450, 900, 1, { px: 32 });
    a_water(ctx, 1030, 170, 830, 660, ramp(t, 0.2, 0.6), t); const X = 1490, Y = 480, s = 0.78;
    a_koningsvis(ctx, X, Y, s, { t, zwem: 0.6, vlek: (c) => { const p = q.on('borstvinspieren', 1, 0.5); if (p > 0.01) { c.save(); c.globalAlpha *= p * (0.7 + 0.3 * Math.sin(t * 4)); const g = c.createRadialGradient(40, -6, 5, 40, -6, 90); g.addColorStop(0, rgba(A_WARM, 0.95)); g.addColorStop(1, rgba(A_WARM, 0)); c.fillStyle = g; c.fillRect(-60, -100, 200, 190); c.restore(); }
      const bh = q.on('buikholte', 2, 0.5); if (bh > 0.01) { c.save(); c.globalAlpha *= bh; c.beginPath(); c.ellipse(0, 70, 80, 46, 0, 0, 6.283); c.fillStyle = rgba(A_WARM, 0.35 + 0.3 * q.on('vervoert', 1, 1)); c.fill(); c.strokeStyle = rgba('#F2F2EE', 0.6); c.setLineDash([8, 8]); c.lineWidth = 3; c.stroke(); c.restore(); }
      const bl = q.on('bloed', 1, 0.8); if (bl > 0.01) { c.save(); c.globalAlpha *= bl; c.strokeStyle = 'rgba(200,48,44,0.9)'; c.lineWidth = 9; c.beginPath(); c.ellipse(25, 32, 70, 52, 0.5, 0, 6.283); c.stroke(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 - t * 1.6; const xx = 25 + Math.cos(an) * 70, yy = 32 + Math.sin(an) * 52; const r = Math.cos(0.5), sn = Math.sin(0.5); circ(c, 25 + (xx - 25) * r - (yy - 32) * sn, 32 + (xx - 25) * sn + (yy - 32) * r, 7, '#F2C94C'); } c.restore(); } } });
    const [bx, by] = a_vispunt(X, Y, s, 40, -6), [hx, hy] = a_vispunt(X, Y, s, 0, 70);
    naamBij(ctx, 'borstvinspier', '13,8 °C', bx - 330, by - 40, q.on('borstvinspieren', 1, 0.5), 'center'); naamBij(ctx, 'buikholte', '13,5 °C', hx - 330, hy + 60, q.on('buikholte', 2, 0.5), 'center'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 4, 'mc', ramp(t, 0, 0.4));
    welNiet(ctx, [{ t: 'Naast de borstvinspier maakt nog een ander gebied veel warmte.', a: q.on('Eén', 1, 0.5), hl: t > q.at('Eén', 1) && t < q.at('Twee', 2) ? 1 : 0 },
      { t: 'Door de grote spreiding bij de schedel zijn die metingen niet valide.', a: q.on('Twee', 2, 0.5), hl: t > q.at('Twee', 2) && t < q.at('Welke', 1) ? 1 : 0 }], 70, 150, 960, 1);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 440, 960, { a: [0, 1, 2, 3].map(i => q.on('Welke', 1, 0.4 + i * 0.1)) }, 1);
    a_tabel(ctx, 1110, 290, 0.66, { a: ramp(t, 0.5, 0.6), rij: [0, 0, q.on('ander', 1, 0.5), 0, 0], cel: [{ r: 2, k: 1, cx: 150, rx: 120, a: q.on('spreiding', 1, 0.8) }] }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 4, 'mc');
    const u2 = q.on('Uitspraak', 2, 0.4);
    welNiet(ctx, [{ t: 'Naast de borstvinspier maakt nog een ander gebied veel warmte.', v: 'wel', s: q.on('Ondersteund', 1, 0.5), hl: t < q.at('Uitspraak', 2) ? 1 : 0 },
      { t: 'Door de grote spreiding bij de schedel zijn die metingen niet valide.', v: 'niet', s: q.on('ondersteund', 2, 0.5), hl: t > q.at('Uitspraak', 2) && t < q.at('antwoord', 1) ? 1 : 0 }], 70, 150, 960, 1);
    const w1 = q.on('Ondersteund', 1, 0.6), w2 = q.on('ondersteund', 2, 0.6), g = q.on('antwoord', 1, 0.5);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 440, 960, { weg: [w1, 0, w1, w2], goed: 1, g }, 1);
    const leer = q.on('Leer', 1, 0.5);
    a_tabel(ctx, 1110, 290, 0.66, { a: 1 - 0.6 * leer, rij: [q.on('borstvinspier', 1, 0.4) * (1 - u2), 0, q.on('schedel', 1, 0.4) * (1 - u2), 0, 0],
      cel: [{ r: 2, k: 1, cx: 50, rx: 60, a: q.on('zestien', 1, 0.6) * (1 - u2), col: C.goud }, { r: 0, k: 1, cx: 50, rx: 60, a: q.on('borstvinspier', 1, 0.6) * (1 - u2), col: C.goud }, { r: 2, k: 1, cx: 150, rx: 120, a: q.on('Spreiding', 1, 0.6) * (1 - leer) }] });
    tipKaart(ctx, 'Valide: je meet wat je wilt meten.', 1090, 700, 790, q.on('valide', 2, 0.5) * (1 - q.on('Spreiding', 1, 0.4)), 30);
    tipKaart(ctx, 'Valide = je meet het goede. Betrouwbaar = herhaalbaar, weinig toeval.', 1090, 700, 790, leer, 30); },

  s18(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 5, 1, ramp(t, 0, 0.4));
    const L = q.on('lijnen', 1, 1.5);
    a_grafiek(ctx, 280, 240, 960, 520, { a: ramp(t, 0.3, 0.6), lijn: [L, L, L], diepteAs: q.on('assen', 1, 0.5), pijlD: q.on('beneden', 1, 0.8) });
    const X = (m) => 280 + m / 200 * 960; // aanwijzingen
    a_alpha(ctx, q.on('temperatuur', 1, 0.4) * (1 - q.on('diepte', 1, 0.4)), () => { roundRect(ctx, 160, 230, 92, 540, 16); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('diepte', 1, 0.4) * (1 - q.on('Welke', 1, 0.4)), () => { roundRect(ctx, 1244, 230, 150, 540, 16); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('nul', 1, 0.5) * (1 - q.on('Welke', 1, 0.4)), () => { ctx.beginPath(); ctx.arc(1265, 240, 26, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
    a_toewijzing(ctx, 1460, 300, 410, [0, 1, 2].map(i => ({ a: q.on('Welke', 1, 0.4 + i * 0.15) })), 1); },

  s19(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 5, 1);
    const tip = q.on('Tip', 1, 0.5); const fase = (a, b) => (t >= q.at(a[0], a[1]) && t < q.at(b[0], b[1])) ? 1 : 0;
    const h1 = fase(['lijn', 2], ['lijn', 3]) || fase(['veertien', 2], ['tien', 3]) ? 1 : 0, h3 = fase(['lijn', 3], ['lijn', 4]), h2 = fase(['lijn', 4], ['Controleer', 1]) || fase(['tien', 3], ['antwoord', 1]) ? 1 : 0;
    const any = h1 || h2 || h3; const dim = [any && !h1 ? 1 : 0, any && !h2 ? 1 : 0, any && !h3 ? 1 : 0];
    const G = a_grafiek(ctx, 280, 240, 960, 520, { a: 1 - 0.85 * tip, hl: [h1, h2, h3], dim, diepteAs: 1 });
    a_alpha(ctx, h3 * (1 - tip), () => { roundRect(ctx, 1244, 230, 150, 540, 16); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('twintig', 1, 0.5) * h3, () => { ctx.beginPath(); ctx.ellipse(G.X(80), G.Y(4.6), 46, 56, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); text(ctx, 'duik', G.X(80) + 60, G.Y(4.6) + 50, fTekst(32, 700), C.goud, 'left'); });
    // controle met tabel 1: 14 en 10
    const c14 = q.on('veertien', 2, 0.5) * (1 - q.on('antwoord', 1, 0.5)), c10 = q.on('tien', 3, 0.5) * (1 - q.on('antwoord', 1, 0.5));
    a_alpha(ctx, c14 * (1 - tip), () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(14)); ctx.lineTo(G.X(200), G.Y(14)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '≈ 14', G.X(4), G.Y(14) - 12, fTekst(30, 700), C.goud, 'left'); });
    a_alpha(ctx, c10 * (1 - tip), () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(10)); ctx.lineTo(G.X(200), G.Y(10)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '≈ 10', G.X(4), G.Y(10) + 36, fTekst(30, 700), C.goud, 'left'); });
    tag(ctx, '≈ 4–5 °C verschil, past bij tabel 1', 760, 200, C.goud, q.on('past', 1, 0.5) * (1 - q.on('antwoord', 1, 0.5)), 'center', 28);
    const g = q.on('antwoord', 1, 0.5);
    a_toewijzing(ctx, 1460, 300, 410, [{ v: q.on('borstvinspier', 1, 0.5), hl: h1, g }, { v: q.on('watertemperatuur', 1, 0.5), hl: h2, g }, { v: q.on('zwemdiepte', 1, 0.5), hl: h3, g }], 1);
    antwoordLabel(ctx, 'Antwoord', g * (1 - tip), 1460, 260);
    tipKaart(ctx, 'Twee y-assen? Zoek eerst uit welke as bij welke lijn hoort.', 280, 400, 1060, tip); },

  s20(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3, ramp(t, 0, 0.4));
    const lek = q.on('warmtelek', 1, 0.6), kb = q.on('kieuwbogen', 1, 0.8), lg = q.on('Leg', 1, 0.6);
    const X = 520, Y = 480, s = 0.8; a_alpha(ctx, 1 - lg, () => { a_water(ctx, 60, 170, 940, 640, 1, t); a_koningsvis(ctx, X, Y, s, { t, warm: 0.55, zwem: 0.5 });
      const [gx, gy] = a_vispunt(X, Y, s, 120, 20); for (let i = 0; i < 4; i++) { const an = -0.4 + i * 0.3; a_warmtePijl(ctx, gx + 20, gy + i * 18 - 20, Math.cos(an), Math.sin(an) + 0.4, 60, lek * (1 - 0.6 * kb), t + i * 0.5); }
      naamBij(ctx, 'kieuwen', 'warmtelek', gx, gy + 140, lek * (1 - kb), 'center');
      a_alpha(ctx, kb, () => { ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - 30); ctx.lineTo(1290, 180); ctx.moveTo(gx, gy + 30); ctx.lineTo(1290, 780); ctx.stroke(); circ(ctx, gx, gy, 30, null, C.goud, 3); }); });
    vraagKaart(ctx, 'Leg uit', 'Hoe beperkt het wondernet warmteverlies? Wat voegt het vet toe?', 70, 200, 900, lg);
    const kx = 1380, ky = 480; a_kieuwboog(ctx, kx, ky, 170, { a: kb, t, wondernet: q.on('wondernet', 1, 0.8), vet: q.on('vet', 1, 0.8), hlPl: q.on('kieuwplaatjes', 1, 0.5) * (1 - q.on('terugkomt', 1, 0.5)), hlBoog: kb * (1 - q.on('wondernet', 1, 0.5)) });
    naamBij(ctx, 'kieuwboog', '', 1270, 290, kb, 'right'); naamBij(ctx, 'kieuwplaatjes', '', 1640, 210, q.on('kieuwplaatjes', 1, 0.5), 'left');
    naamBij(ctx, 'wondernet', '', 1270, 690, q.on('wondernet', 1, 0.5), 'right'); naamBij(ctx, 'vetweefsel', '', kx - 10, ky + 12, q.on('vet', 1, 0.5), 'center'); },

  s21(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3);
    tag(ctx, 'tegenstroom', W / 2, 190, C.goud, q.on('tegenstroom', 1, 0.5) * (1 - q.on('warm', 1, 0.4)), 'center', 36);
    const kA = q.on('warm', 1, 0.6), kB = q.on('afgekoeld', 1, 0.6);
    a_tegenstroom(ctx, t, { a: ramp(t, 0.2, 0.6), kleur: Math.max(kA, kB), kA, kB, stroom: q.on('tegengestelde', 1, 0.6), warmte: q.on('geeft', 1, 0.6), terug: q.on('terug', 2, 0.6), verlies: q.on('weinig', 1, 0.6) });
    naamBij(ctx, 'naar de kieuwen', 'warm', 900, 315, kA, 'center'); naamBij(ctx, 'terug naar het lichaam', 'koud', 900, 640, kB, 'center');
    naamBij(ctx, 'lichaam', '', 185, 470, ramp(t, 0.4), 'center'); metaA_(ctx, 'KOUD WATER', 1850, 215, ramp(t, 0.4), '#9CC0E8', 'right', 22);
    naamBij(ctx, 'kieuwplaatjes', '', 1650, 740, q.on('kieuwplaatjes', 1, 0.5), 'center');
    naamBij(ctx, 'al afgekoeld', '', 1250, 315, q.on('aankomt', 1, 0.5), 'center', '#9CC0E8'); naamBij(ctx, 'wondernet', '', 760, 470, q.on('geeft', 1, 0.5), 'center'); },

  s22(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3);
    punten(ctx, [{ t: 'Bloed naar de kieuwen is warm, bloed terug is koud', a: q.on('Eén', 1, 0.5), v: q.on('koud', 1, 0.4) },
      { t: 'Wondernet: warmte gaat over van aanvoerend naar terugstromend bloed', a: q.on('Twee', 1, 0.5), v: q.on('terugstromende', 1, 0.4) },
      { t: 'Vet isoleert de kieuwboog: weinig warmteverlies', a: q.on('Drie', 3, 0.5), v: q.on('isoleert', 1, 0.4) }], 70, 160, 1100, 1, { px: 32 });
    valkuil(ctx, 'Temperatuurverschil niet genoemd: eerste punt kwijt.', 70, 690, 1100, q.on('Wie', 1, 0.5));
    a_kieuwboog(ctx, 1560, 470, 120, { a: ramp(t, 0.2, 0.6), t, vet: 1 }); naamBij(ctx, 'wondernet', '', 1470, 770, ramp(t, 0.5), 'center'); },

  s23(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2, ramp(t, 0, 0.4));
    const cl = q.on('cladogram', 1, 0.6), vijf = q.on('vijf', 1, 0.8), kleur = [C.goud, C.teal, C.koraal, C.groen, C.paars];
    a_alpha(ctx, ramp(t, 0.2, 0.6) * (1 - cl), () => { for (let i = 0; i < 48; i++) { const x = 170 + (i % 8) * 115, y = 240 + Math.floor(i / 8) * 95; const lijn = [0, 2, 2, 4, 2, 3, 4, 2, 1, 2, 4, 2][i % 12];
      a_koningsvis(ctx, x, y + Math.sin(t * 1.5 + i) * 4, 0.13, { t: t + i, zwem: 0.5 }); circ(ctx, x - 6, y + 50, 9, kleur[lijn], null, 0); ctx.save(); ctx.globalAlpha *= 1 - vijf; circ(ctx, x - 6, y + 50, 9, '#5A6478'); ctx.restore(); }
      metaText(ctx, '480 vissen · mtDNA', 170, 830, C.text2, 'left', 22); });
    const step = clamp((t - q.at('cladogram', 1)) / 2.4, 0, 1);
    a_cladogram(ctx, 110, 210, 0.82, { a: cl });
    welNiet(ctx, [{ t: 'L. immaculatus is de voorouder van alle koningsvissen', a: q.on('Drie', 1, 0.4) }, { t: 'Lijn 2 is meer verwant met 4 dan met 1', a: q.on('Drie', 1, 0.6) }, { t: 'Lijn 3 is meer verwant met 4 dan met 5', a: q.on('Drie', 1, 0.8) }], 1120, 170, 760, 1, { px: 30 }); },

  s24(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2);
    const sp = q.on('splitsingspunten', 1, 0.8), rec = q.on('recentere', 1, 0.6) * (1 - q.on('Alle', 1, 0.5)), ui = q.on('uiteinden', 2, 0.6);
    const hl = rec > 0.5 ? { l4: 1, l5: 1 } : {}; const C0 = a_cladogram(ctx, 360, 200, 0.95, { a: ramp(t, 0, 0.6), hl, nodes: { root: sp, n1: sp, n2: sp, n23: sp, n45: sp } });
    const sc = 0.95, px = (x) => 360 + x * sc, py = (y) => 200 + y * sc;
    a_alpha(ctx, rec, () => { circ(ctx, px(C0.N.n45[0]), py(C0.N.n45[1]), 30, null, C.goud, 4); naamBij(ctx, 'recente voorouder', '', px(C0.N.n45[0]) - 40, py(C0.N.n45[1]) - 40, 1, 'right', C.goud); });
    a_alpha(ctx, ui, () => { Object.values(C0.Y).forEach(y => circ(ctx, px(C0.tipX + 6), py(y), 10, C.groen)); pijl(ctx, px(0), 800, px(C0.tipX), 800, C.line, 1, 3, 16); metaText(ctx, 'VERLEDEN', px(0), 840, C.text2, 'left', 22); metaText(ctx, 'NU', px(C0.tipX), 840, C.groen, 'right', 22); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2);
    const at = (w, n = 1) => t >= q.at(w, n); let hl = {}, nodes = {};
    if (at('immaculatus') && !at('voorouder', 2)) hl = { lm: 1 };
    if (at('voorouder', 2) && !at('Bewering', 2)) nodes = { root: 1 };
    if (at('Volg') && !at('hoort')) hl = { l2: 1 };
    if (at('hoort') && !at('Samen')) { hl = { l2: 1, l3: 1, g23: 1 }; nodes = { n23: 1 }; }
    if (at('Samen') && !at('eerder')) { hl = { l2: 1, l3: 1, g23: 1, l4: 1, l5: 1, g45: 1 }; nodes = { n2: 1 }; }
    if (at('eerder') && !at('Wel')) { hl = { l1: 1 }; nodes = { n1: 1, n2: 1 }; }
    if (at('zustergroepen') && !at('dus', 2)) { hl = { l4: 1, l5: 1, g45: 1 }; nodes = { n45: 1 }; }
    if (at('dus', 2) && !at('Niet', 2)) { hl = { l3: 1, l4: 1, l5: 1 }; nodes = { n2: 1 }; }
    a_cladogram(ctx, 110, 210, 0.82, { hl, nodes });
    const b = (n) => (at('Bewering', n) && (n === 3 || !at('Bewering', n + 1))) ? 1 : 0;
    welNiet(ctx, [{ t: 'L. immaculatus is de voorouder van alle koningsvissen', v: 'niet', s: q.on('Niet', 1, 0.5), hl: b(1) }, { t: 'Lijn 2 is meer verwant met 4 dan met 1', v: 'wel', s: q.on('Wel', 1, 0.5), hl: b(2) }, { t: 'Lijn 3 is meer verwant met 4 dan met 5', v: 'niet', s: q.on('Niet', 2, 0.5), hl: b(3) }], 1120, 170, 760, 1, { px: 30 });
    naamBij(ctx, 'nu levende soort', '', 830, 745, (at('levende') && !at('voorouder', 2)) ? 1 : 0, 'left', C.goud);
    naamBij(ctx, 'voorouder', '', 160, 640, at('voorouder', 2) && !at('Bewering', 2) ? 1 : 0, 'center', C.goud); },

  s26(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 8, 2, ramp(t, 0, 0.4));
    const r1 = q.on('Eén', 1, 0.4), r2 = q.on('Twee', 2, 0.4), r3 = q.on('Drie', 2, 0.4);
    welNiet(ctx, [{ t: 'Dan had hij longen en geen kieuwen, net als walvissen', v: 'wel', s: q.on('Wel', 1, 0.5), a: r1, hl: t > q.at('Eén', 1) && t < q.at('Twee', 2) ? 1 : 0 },
      { t: 'Er heeft co-evolutie plaatsgevonden', v: 'niet', s: q.on('Niet', 1, 0.5), a: r2, hl: t > q.at('Twee', 2) && t < q.at('Drie', 2) ? 1 : 0 },
      { t: 'Koningsvissen zijn een schakel tussen koudbloedige vissen en zoogdieren', v: 'niet', s: q.on('Niet', 2, 0.5), a: r3, hl: t > q.at('Drie', 2) ? 1 : 0 }], 70, 150, 1000, 1, { px: 30 });
    metaA_(ctx, 'IS DE KONINGSVIS UIT EEN ZOOGDIER GEËVOLUEERD?', 70, 620, ramp(t, 0.4, 0.6) * (1 - r1), C.goud, 'left', 24);
    // paneel rechts per reactie
    const p1 = r1 * (1 - r2), p2 = r2 * (1 - q.on('lijken', 1, 0.5)), p3 = q.on('lijken', 1, 0.5) * (1 - r3), p4 = r3;
    a_alpha(ctx, p1, () => { a_walvis(ctx, 1480, 300, 0.9, 1); a_longen(ctx, 1480, 310, 0.8, q.on('longen', 1, 0.5)); naamBij(ctx, 'walvis · zoogdier', 'longen', 1480, 420, 1, 'center');
      a_koningsvis(ctx, 1480, 640, 0.45, { t }); naamBij(ctx, 'koningsvis', 'kieuwen', 1480, 790, 1, 'center'); });
    a_alpha(ctx, p2, () => { a_bloem(ctx, 1460, 380, 1.3, 1, t); pijl(ctx, 1560, 640, 1700, 640, C.goud, 1, 4, 16); pijl(ctx, 1700, 680, 1560, 680, C.goud, 1, 4, 16); naamBij(ctx, 'co-evolutie', 'twee soorten beïnvloeden elkaar', 1480, 780, 1, 'center'); });
    a_alpha(ctx, p3, () => { a_koningsvis(ctx, 1320, 380, 0.4, { t, warm: 0.8 }); a_walvis(ctx, 1660, 380, 0.6, 1); const g = ctx.createRadialGradient(1660, 380, 10, 1660, 380, 140); g.addColorStop(0, rgba(A_WARM, 0.5)); g.addColorStop(1, rgba(A_WARM, 0)); ctx.fillStyle = g; ctx.fillRect(1500, 260, 320, 240);
      naamBij(ctx, 'convergente evolutie', 'los van elkaar endotherm', 1490, 600, q.on('convergente', 1, 0.5), 'center', C.goud); });
    a_alpha(ctx, p4, () => { // mini-stamboom: zoogdieren apart, koningsvis tussen de vissen
      ctx.strokeStyle = '#E8E8E0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1200, 640); ctx.lineTo(1260, 640); ctx.moveTo(1260, 520); ctx.lineTo(1260, 760); ctx.moveTo(1260, 760); ctx.lineTo(1560, 760); ctx.moveTo(1260, 520); ctx.lineTo(1400, 520); ctx.moveTo(1400, 470); ctx.lineTo(1400, 570); ctx.moveTo(1400, 470); ctx.lineTo(1560, 470); ctx.moveTo(1400, 570); ctx.lineTo(1560, 570); ctx.stroke();
      text(ctx, 'andere vissen', 1580, 480, fTekst(30, 600), C.text, 'left'); text(ctx, 'koningsvis', 1580, 580, fTekst(30, 700), C.goud, 'left'); text(ctx, 'zoogdieren', 1580, 770, fTekst(30, 600), C.text, 'left');
      circ(ctx, 1560, 570, 12, C.goud); naamBij(ctx, 'nu levend, geen schakel', '', 1500, 400, q.on('levende', 1, 0.5), 'center', C.goud); }); }
});

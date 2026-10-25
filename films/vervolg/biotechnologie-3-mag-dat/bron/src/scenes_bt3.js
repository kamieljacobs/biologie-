// Wat word jij? · Biotechnologie · Mag dat? — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam practicum, Merel lab). Micro alleen in H2/H5 (DNA-streep). Voor en tegen in H6 in dezelfde neutrale kleur (evenwicht).

const HFD = (ctx, s2, a = 1) => metaA(ctx, s2, 1800, 120, a, C.goud, 'right', 28);
Object.assign(SCENES, {
  title(ctx, t) {
    bioreactor(ctx, 1380, 820, 0.8, { t }); maisPlant(ctx, 1700, 820, 420, { t, seed: 2 }); bordje(ctx, 1540, 300, 'mag dat?', 1);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const K = q.on('Maar', 1, 0.7), V = 1 - q.on('vraagt', 1, 0.6);
    ctx.save(); ctx.globalAlpha *= 1 - K * V; bioreactor(ctx, 760, FLOOR, 1, { t, sensor: 0.5 }); sam(ctx, 1240, t, { pose: 'wijs', kijk: -1 }); merel(ctx, 1560, t, { a: q.on('vraagt', 1, 0.6) }); ctx.restore();
    if (K * V > 0.01) { ctx.save(); ctx.globalAlpha *= K * V; bg(ctx, 'schema');
      akker(ctx, 560, 600, 620, { t, label: 'Verenigde Staten', sub: '', ggo: q.on('Amerika', 1) });
      akker(ctx, 1360, 600, 620, { t, label: 'Nederland', sub: '', leeg: 0 });
      tag(ctx, 'ruim 90 % van de maïs ggo', 560, 260, C.paars, q.on('negentig', 1), 'center', 30);
      tag(ctx, 'ggo-maïs zaaien?', 1360, 260, C.paars, q.on('zaaien', 1), 'center', 30); vraagteken(ctx, 1640, 300, q.on('zaaien', 1), 90); ctx.restore(); }
    vraagteken(ctx, 1800, 420, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); HFD(ctx, 'VAT TEGENOVER VELD'); bt1Antwoord(ctx, 'antwoord b: in het vat blijven ze binnen');
    bioreactor(ctx, 470, FLOOR, 0.9, { t }); inperkRand(ctx, 470, FLOOR - 10, 470, 560, q.on('ingeperkt', 1));
    naamBij(ctx, 'ingeperkt gebruik', 'AFGESLOTEN RUIMTE', 470, 248, q.on('ingeperkt', 1), 'center');
    inperkTrap(ctx, 760, 600, { a: q.on('inperkingsniveaus', 1), u: q.on('lichtste', 1, 3), hl: -1 });
    bordje(ctx, 1010, 770, 'toezicht:', q.on('veiligheidsfunctionaris', 1), 'biologisch veiligheidsfunctionaris');
    const Af = q.on('afval', 1, 0.6); merel(ctx, 1800, t, { a: Af, kijk: -1 }); autoclaaf(ctx, 1570, FLOOR, { a: Af, dicht: q.on('gedood', 1, 1), klaar: q.on('weggaat', 1) });
    naamBij(ctx, 'afval gedood', 'VOORDAT HET WEGGAAT', 1570, 590, q.on('gedood', 1), 'center'); },

  s05(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'VAT TEGENOVER VELD');
    roundRect(ctx, 0, 680, 1920, 200, 0); shape(ctx, '#22324E', null);
    akker(ctx, 700, 690, 900, { t, n: 7, h: 300, stuif: q.on('Stuifmeel', 1) });
    for (let i = 0; i < 6; i++) { const k = clamp(q.on('zaad', 1, 1.5) * 6 - i, 0, 1); zaadje(ctx, 300 + i * 150, lerp(420, 700, ease(k)), 0.6, k); }
    akker(ctx, 1560, 690, 420, { t, n: 3, h: 260, a: q.on('waait', 1) }); metaA(ctx, 'BUURAKKER', 1560, 820, q.on('waait', 1), C.grain, 'center', 28);
    naamBij(ctx, 'introductie in het milieu', 'BUITEN, NIET AF TE SLUITEN', 700, 230, q.on('introductie', 1), 'center'); },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WAT IS EEN GGO?');
    wetKaart(ctx, 960, 170, 820, ['DNA veranderd op een manier die niet', 'vanzelf gebeurt bij voortplanting of kruisen', '→ de techniek telt'], q.on('wet', 1));
    const B = q.on('bestralen', 1, 0.6); bestralingsKast(ctx, 600, 820, { a: B, t }); genStreep(ctx, 1160, 650, 560, { a: B, mut: Math.round(6 * q.on('mutaties', 1, 1.5)), seed: 8 });
    naamBij(ctx, 'willekeurige mutaties', 'GOUD', 1160, 730, q.on('mutaties', 1), 'center');
    vraagteken(ctx, 1640, 480, q.on('denk', 1), 100); },

  s08(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WAT IS EEN GGO?'); bt1Antwoord(ctx, 'antwoord a: deze oude techniek is uitgezonderd');
    bestralingsKast(ctx, 520, 760, { t }); genStreep(ctx, 1100, 560, 560, { mut: 6, seed: 8 });
    tag(ctx, 'klassieke mutagenese', 1100, 400, C.goud, q.on('mutagenese', 1), 'center', 34);
    chip(ctx, 'uitgezonderd van de ggo-regels', 1100, 680, C.groen, q.on('zondert', 1), 30);
    metaA(ctx, 'AL LANG IN GEBRUIK', 1100, 760, q.on('lang', 1), C.grain, 'center', 28); },

  s09(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WAT IS EEN GGO?');
    [['klassieke mutagenese', C.groen, 'uitgezonderd'], ['gen ingebracht', C.paars, 'ggo'], ['CRISPR', C.paars, 'ggo']].forEach(([n, col, lab], i) => {
      const x = 360 + i * 600, a = i === 2 ? q.on('CRISPR', 1) : (i === 1 ? q.on('ingebracht', 1) || 0.6 : 0.6);
      if (i === 0) { genStreep(ctx, x, 470, 400, { mut: 6, seed: 8, a }); }
      if (i === 1) { genInplak(ctx, x, 470, 400, 1, Math.max(0.6, q.on('ingebracht', 1))); }
      if (i === 2) knipDNA(ctx, x, 470, 400, q.on('gericht', 1, 2), q.on('CRISPR', 1), t);
      naamBij(ctx, n, '', x, 580, i === 2 ? q.on('CRISPR', 1) : 0.8, 'center');
      chip(ctx, lab, x, 660, col, i === 2 ? q.on('wél', 1) : 0.8, 28); });
    kaartje(ctx, 1560, 220, 420, 110, 'Europees Hof · 2018', 'VALT ONDER DE GGO-REGELS', { a: q.on('Hof', 1), col: C.goud });
    metaA(ctx, 'EFFECT KAN LIJKEN OP EEN INGEBRACHT GEN', 1260, 780, q.on('effect', 1), C.grain, 'center', 28); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WIE BESLIST?');
    dossier(ctx, lerp(300, 560, q.on('beoordeeld', 1, 1)), 300, 1, q.on('apart', 1), 'één ggo'); kaartje(ctx, 900, 300, 260, 100, 'EFSA', 'EUROPESE AUTORITEIT', { a: q.on('EFSA', 1) });
    maisPlant(ctx, 1300, 820, 380, { t, a: q.on('kijkt', 1) });
    const T = [['uitkruisen en verspreiding', 'kruist'], ['andere organismen', 'organismen'], ['resistentie', 'ongevoelig'], ['voedsel: giftig? allergie?', 'giftig']];
    T.forEach(([n, w], i) => { const x = 980 + (i % 2) * 640, y = 520 + Math.floor(i / 2) * 200; tegel(ctx, x, y, 340, 140, n, { a: q.on(w, 1), hl: q.on(w, 1) * (1 - (i < 3 ? q.on(T[i + 1][1], 1) : q.on('besluit', 1))), col: C.goud,
      icoon: i === 0 ? (xx, yy) => stuifmeel(ctx, xx - 60, yy, 120, t, 1, 8) : i === 1 ? (xx, yy) => vlinder(ctx, xx, yy, 0.8, 1, t) : i === 2 ? (xx, yy) => insect(ctx, xx - 10, yy, 0.7, 1, C.koraal) : (xx, yy) => { ctx.beginPath(); ctx.ellipse(xx, yy, 18, 34, 0.3, 0, 6.283); ctx.fillStyle = C.oker; ctx.fill(); } }); });
    vraagteken(ctx, 300, 640, q.on('besluit', 1), 100); },

  s12(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WIE BESLIST?'); bt1Antwoord(ctx, 'antwoord c: Commissie en lidstaten, na advies');
    const st = [['EFSA', 'ADVIES', 'adviseert'], ['Europese Commissie', 'VOORSTEL', 'voorstel'], ['lidstaten', 'STEMMEN', 'stemmen']];
    st.forEach(([k, s2, w], i) => { kaartje(ctx, 360 + i * 560, 330, 380, 110, k, s2, { a: q.on(w, 1), col: C.goud }); if (i) pijl(ctx, 360 + i * 560 - 330, 330, 360 + i * 560 - 220, 330, C.line, q.on(w, 1), 3, 14); });
    metaA(ctx, 'GEEN MEERDERHEID → DE COMMISSIE BESLIST', 1200, 470, q.on('meerderheid', 1), C.grain, 'center', 28);
    metaA(ctx, 'IN NEDERLAND', 960, 600, q.on('Nederland', 1), C.goud, 'center', 28);
    kaartje(ctx, 640, 700, 380, 110, 'Bureau GGO · RIVM', 'BEOORDEELT VERGUNNINGEN', { a: q.on('Bureau', 1), col: C.goud });
    kaartje(ctx, 1280, 700, 380, 110, 'COGEM', 'ADVISEERT DE REGERING', { a: q.on('COGEM', 1), col: C.goud }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WIE BESLIST?');
    rapportStapel(ctx, 480, 700, q.on('rapport', 1), 9); kaartje(ctx, 480, 330, 400, 110, 'VS-rapport · 2016', 'ZO\'N 900 PUBLICATIES', { a: q.on('negenhonderd', 1), col: C.goud });
    tag(ctx, 'geen extra gezondheidsrisico gevonden', 1260, 430, C.teal, q.on('bewijs', 1), 'center', 30);
    metaA(ctx, 'BIJ DE TOEGELATEN GGO-GEWASSEN', 1260, 490, q.on('toegelaten', 1), C.grain, 'center', 28);
    tag(ctx, 'lange termijn: moeilijk te meten', 1260, 620, C.teal, q.on('lange', 1), 'center', 30); },

  s14(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); HFD(ctx, 'WIE BESLIST?');
    bioreactor(ctx, 460, FLOOR, 0.8, { t }); sam(ctx, 900, t, { pose: 'wijs', kijk: 1 }); merel(ctx, 1400, t, { kijk: -1 });
    bubbel(ctx, 900, 300, '"Dan is het toch veilig."', '#F2F2EE', q.on('veilig', 1), 30);
    bubbel(ctx, 900, 380, '"Gewoon bang zijn."', '#F2F2EE', q.on('bang', 1), 30); },

  // ---------- H4 ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'AMERIKA EN EUROPA');
    const M = 1 - q.on('Amerika', 1, 0.6);
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; labVloer(ctx); sam(ctx, 700, t, { kijk: 1 }); merel(ctx, 1200, t, { pose: 'wijs', kijk: -1 }); bubbel(ctx, 1200, 300, '"Dat kun je niet meten."', '#F2F2EE', q.on('meten', 1), 30); ctx.restore(); }
    const S = q.on('Amerika', 1, 0.6); if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      ctx.strokeStyle = '#4A5A78'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(960, 200); ctx.lineTo(960, 840); ctx.stroke();
      text(ctx, 'Verenigde Staten', 480, 250, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'KIJKT VOORAL NAAR HET PRODUCT', 480, 296, C.grain, 'center', 28);
      maisPlant(ctx, 480, 800, 380, { t, seed: 1 }); vergrootglas(ctx, 520, 560, 70, q.on('product', 1));
      text(ctx, 'Europese Unie', 1440, 250, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'KIJKT OOK NAAR DE TECHNIEK', 1440, 296, C.grain, 'center', 28);
      const E = q.on('Europa', 1); knipDNA(ctx, 1440, 560, 520, 1, E, t); vergrootglas(ctx, 1520, 440, 70, q.on('techniek', 1));
      tag(ctx, 'voorzorgsbeginsel', 1440, 720, C.goud, q.on('voorzorgsbeginsel', 1), 'center', 32);
      metaA(ctx, 'BIJ TWIJFEL: VOORZICHTIG', 1440, 790, q.on('twijfel', 1), C.grain, 'center', 28); ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'AMERIKA EN EUROPA');
    landTegel(ctx, 520, 420, 'Spanje', 'TEELT: MON810', { a: q.on('Spanje', 1), mais: q.on('Spanje', 1) });
    tag(ctx, 'ongeveer 70.000 hectare', 520, 600, C.goud, q.on('zeventigduizend', 1), 'center', 30);
    kaartje(ctx, 520, 220, 520, 100, 'één ggo-gewas voor teelt', 'MON810 · INSECTENRESISTENTE MAÏS', { a: q.on('toegelaten', 1) });
    const P = q.on('procent', 1, 0.6); if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; metaText(ctx, 'ALLE MAÏS IN DE EU', 300, 700, C.grain, 'left', 28); roundRect(ctx, 300, 720, 600, 40, 8); shape(ctx, KL_PLANT, null); ctx.fillStyle = C.paars; ctx.fillRect(300, 720, 5, 40); text(ctx, 'ggo: nog geen 1 %', 920, 750, fTekst(28, 700), C.text, 'left'); ctx.restore(); }
    landTegel(ctx, 1400, 420, 'Nederland', '', { a: q.on('Nederland', 1) }); vraagteken(ctx, 1400, 470, q.on('Waarom', 1), 90);
    vraagteken(ctx, 1720, 700, q.on('denk', 1), 90); },

  s18(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'AMERIKA EN EUROPA'); bt1Antwoord(ctx, 'antwoord b: Nederland liet de teelt uitsluiten');
    const I = q.on('soja', 1, 0.6);
    ctx.save(); ctx.globalAlpha *= 1 - I; landTegel(ctx, 520, 450, 'Spanje', 'TEELT: MON810', { mais: 1 }); landTegel(ctx, 1400, 450, 'Nederland', 'TEELT UITGESLOTEN', { rand: q.on('deed', 1) });
    kaartje(ctx, 960, 260, 560, 100, 'sinds 2015', 'ELK EU-LAND MAG TEELT VERBIEDEN', { a: q.on('vijftien', 1) }); ctx.restore();
    if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; schip(ctx, lerp(300, 520, q.on('binnen', 1, 3)), 360, 0.9, { t }); voerZak(ctx, 960, 520, 1); koe(ctx, 1300, 520, 0.42, { t });
      metaText(ctx, 'IMPORT NA TOELATING · VOORAL VEEVOER', 760, 200, C.grain, 'center', 28); tag(ctx, 'tientallen miljoenen tonnen', 520, 470, C.oker, q.on('tientallen', 1), 'center', 28);
      pak(ctx, 1480, 820, 0.9, { kop: 'voedsel', etiket: q.on('etiket', 1), label: 'ggo' }); metaA(ctx, 'ETIKET, BEHALVE ≤ 0,9 %', 1480, 860, q.on('spoortje', 1), C.grain, 'center', 26);
      pak(ctx, 1700, 820, 0.9, { kop: 'melk', leeg: q.on('Vlees', 1), kleur: '#F2F2EE' }); metaA(ctx, 'GEEN ETIKET', 1700, 600, q.on('Vlees', 1), C.grain, 'center', 26); ctx.restore(); } },

  // ---------- H5 ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'EN CRISPR?');
    kaartje(ctx, 960, 200, 560, 100, 'nieuwe Europese wet', 'VAN KRACHT SINDS 16 JULI 2026', { a: q.on('wet', 1) });
    const c1 = q.on('één', 1), c2 = q.on('twee', 1);
    bak(ctx, 560, 640, 460, 220, 'categorie 1', 'ALS GEWONE PLANT', { a: c1 }); genStreep(ctx, 560, 520, 300, { a: c1, hlPos: 0.5 }); maisPlant(ctx, 560, 600, 0, { a: 0 });
    bak(ctx, 1360, 640, 460, 220, 'categorie 2', 'BLIJFT GGO', { a: c2 }); genInplak(ctx, 1360, 520, 300, 1, c2);
    keurmerk(ctx, 960, 470, q.on('biologische', 1), q.on('geen', 1));
    metaA(ctx, 'BIOLOGISCHE LANDBOUW: VOORLOPIG GEEN VAN BEIDE', 960, 380, q.on('geen', 1), C.grain, 'center', 28); },

  s20(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'EN CRISPR?');
    tijdlijn(ctx, 260, 520, 1400, [[0.05, '2018', 'HOF: GGO'], [0.62, '16 juli 2026', 'WET VAN KRACHT'], [0.95, '17 juli 2028', 'REGELS GELDEN']], 0.72, { u: 1, nuA: q.on('oktober', 1) });
    kaartje(ctx, 960, 260, 420, 100, 'categorie 1', 'CRISPR-PLANT · KLEINE VERANDERING', { a: 1 });
    vraagteken(ctx, 1700, 340, q.on('denk', 1), 100); },

  s22(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'EN CRISPR?'); bt1Antwoord(ctx, 'antwoord c: de regels gelden pas vanaf 2028');
    const Z = q.on('Daarna', 1, 0.6);
    tijdlijn(ctx, 260, 470, 1400, [[0.05, '2018', 'HOF: GGO'], [0.62, '16 juli 2026', 'WET VAN KRACHT'], [0.95, '17 juli 2028', 'REGELS GELDEN']], 0.72, { u: 1, nuA: 1, nuLab: 'nu: nog ggo', a: 1 - 0.85 * Z });
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; pak(ctx, 760, 830, 1, { kop: 'zaad', etiket: 1, label: 'NGT', kleur: '#B8A57A' }); pak(ctx, 1160, 830, 1, { kop: 'eten', leeg: q.on('winkel', 1) });
      metaText(ctx, 'NA 17 JULI 2028 · CATEGORIE 1', 960, 630, C.grain, 'center', 28); ctx.restore(); }
    tag(ctx, 'hangt af van wat er verandert, en van de datum', 960, 200, C.goud, q.on('hangt', 1), 'center', 30); },

  // ---------- H6 ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); HFD(ctx, 'WAT WEEGT ZWAARDER?');
    sam(ctx, 300, t, { kijk: 1 }); merel(ctx, 1620, t, { kijk: -1 }); balans(ctx, 960, 820, q.on('weegt', 1)); },

  s24(ctx, t, q) { argScene(ctx, t, q, 'voor'); },
  s25(ctx, t, q) { argScene(ctx, t, q, 'tegen'); },
  s26(ctx, t, q) { argScene(ctx, t, q, 'vraag'); },

  s28(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'WAT WEEGT ZWAARDER?'); bt1Antwoord(ctx, 'antwoord a: een etiket of een lage prijs');
    const L = q.on('waarde', 1, 1.2);
    gewichtje(ctx, 180, 262, L); metaA(ctx, 'WAARDEN · WAT JE BELANGRIJK VINDT', 230, 272, L, C.goud, 'left', 28);
    argKaart(ctx, lerp(960, 460, ease(L)), lerp(560, 370, ease(L)), 560, 'etiket belangrijker dan lage prijs?', 'OF ANDERSOM', 1, L);
    [['wie heeft de voordelen?', 'voordelen'], ['wie draagt het risico?', 'risico'], ['hoeveel onzekerheid?', 'onzekerheid']].forEach(([s2, w], i) => argKaart(ctx, 1000 + (i % 2) * 520, 370 + Math.floor(i / 2) * 110, 480, s2, '', q.on(w, 1), 1));
    meter(ctx, 180, 650, L); metaA(ctx, 'FEITEN · TE METEN', 230, 650, L, C.grain, 'left', 28);
    argKaart(ctx, 560, 740, 660, 'Bt werkt minder bij sommige insecten', '', L * 0.8); argKaart(ctx, 1300, 740, 660, 'VS: opbrengst niet sneller gestegen', '', L * 0.8);
    metaA(ctx, 'ZELFDE FEITEN, VERSCHILLENDE UITKOMST', 1260, 560, q.on('verschillend', 1), C.grain, 'center', 28); },

  s29(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); HFD(ctx, 'WAT WEEGT ZWAARDER?');
    sam(ctx, 760, t, { kijk: 1, pose: q.on('weet', 1) > 0.5 ? 'denk' : 'staan' }); merel(ctx, 1200, t, { kijk: -1 });
    bubbel(ctx, 760, 300, '"Ik dacht: alleen veiligheid."', '#F2F2EE', q.on('dacht', 1) * (1 - q.on('Merel', 1)), 30);
    bubbel(ctx, 1200, 300, '"Dat is één vraag."', '#F2F2EE', q.on('Merel', 1), 30); },

  // ---------- Recap ----------
  s30(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'SAMENGEVAT');
    akker(ctx, 480, 560, 560, { t, label: 'Verenigde Staten', ggo: 1 }); argKaart(ctx, 480, 760, 400, 'kijkt naar het product', '', q.on('kan', 1));
    landTegel(ctx, 1240, 420, 'Spanje', 'TEELT: MON810', { a: q.on('Spanje', 1), mais: 1 }); landTegel(ctx, 1600, 420, 'Nederland', 'TEELT UITGESLOTEN', { a: q.on('landen', 1), rand: 1 });
    argKaart(ctx, 1420, 640, 640, 'techniek · voorzorg · land beslist over teelt', '', q.on('techniek', 1)); },

  s31(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); HFD(ctx, 'SAMENGEVAT');
    sam(ctx, 170, t, { h: 360 }); merel(ctx, 1770, t, { h: 360, kijk: -1 });
    schoolIcoon(ctx, 560, 330, 0.9, q.on('Biology', 1), 'WO'); naamBij(ctx, 'Biology', 'RADBOUD · NIJMEGEN', 560, 470, q.on('Radboud', 1), 'center');
    schoolIcoon(ctx, 1000, 330, 0.9, q.on('Plantenwetenschappen', 1), 'WO'); naamBij(ctx, 'Plantenwetenschappen', 'WAGENINGEN', 1000, 470, q.on('Wageningen', 1), 'center');
    bordje(ctx, 620, 650, 'biologisch', q.on('veiligheidsfunctionaris', 1), 'veiligheidsfunctionaris');
    kaartje(ctx, 1220, 660, 420, 100, 'Bureau GGO · COGEM', 'BEOORDELEN EN ADVISEREN', { a: q.on('Bureau', 1) }); },

  s32(ctx, t, q) { bg(ctx, 'schema'); HFD(ctx, 'SAMENGEVAT');
    const k = (i) => q.on('films', 1, 0.5 + i * 0.4);
    bacteriePlasmide(ctx, 480, 420, 220, { a: k(0), t, gen: 1 }); naamBij(ctx, 'Bacteriën als fabriek', 'FILM 1', 480, 580, k(0), 'center');
    protease(ctx, 960, 420, 80, { a: k(1), hl: 1, plek: 'ala' }); naamBij(ctx, 'Enzymen op maat', 'FILM 2', 960, 580, k(1), 'center');
    maisPlant(ctx, 1440, 520, 260, { a: k(2), t }); naamBij(ctx, 'Mag dat?', 'FILM 3', 1440, 580, k(2), 'center');
    tag(ctx, 'met feiten, en met wat mensen belangrijk vinden', 960, 720, C.goud, q.on('feiten', 1), 'center', 32); },
});

// H6: voor en tegen op één balans, zelfde neutrale kleur; na de vraag splitst het in feiten en waarden (s28)
function argScene(ctx, t, q, deel) { bg(ctx, 'schema'); HFD(ctx, 'WAT WEEGT ZWAARDER?');
  balans(ctx, 960, 860, 1, 0, 200);
  const V = deel === 'voor' ? (w) => q.on(w, 1) : () => 1, T = deel === 'tegen' ? (w) => q.on(w, 1) : deel === 'vraag' ? () => 1 : () => 0;
  metaA(ctx, 'VOORSTANDERS', 500, 220, deel === 'voor' ? q.on('Voorstanders', 1) : 1, C.grain, 'center', 28);
  argKaart(ctx, 500, 300, 620, 'gemiddeld + 22 % opbrengst', 'VS: NIET SNELLER GESTEGEN', V('opbrengst'));
  argKaart(ctx, 500, 420, 620, 'minder insecticide (Bt-maïs)', '', V('insecticide'));
  argKaart(ctx, 500, 540, 620, 'tegen droogte en ziekte', 'DOEL VAN DE EU', V('droogte'));
  metaA(ctx, 'TEGENSTANDERS', 1420, 220, deel === 'tegen' ? q.on('Tegenstanders', 1) : (deel === 'vraag' ? 1 : 0), C.grain, 'center', 28);
  argKaart(ctx, 1420, 300, 620, 'resistentie: 3 (2005) → 26 (2020)', 'GEVALLEN · STROKEN REMMEN AF', T('gevallen'));
  argKaart(ctx, 1420, 420, 620, 'onkruid ongevoelig voor glyfosaat', 'TIENTALLEN SOORTEN', T('glyfosaat'));
  argKaart(ctx, 1420, 540, 620, 'afhankelijk van zaadbedrijven', 'OCTROOIEN', T('octrooien'));
  if (deel === 'vraag') vraagteken(ctx, 960, 470, q.on('waarde', 1), 110); }

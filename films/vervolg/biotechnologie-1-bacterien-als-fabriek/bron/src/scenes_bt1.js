// Wat word jij? · Biotechnologie en life sciences · Bacteriën als fabriek — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam stagiair, outfit practicum; Merel procestechnoloog, outfit lab); Micro alleen binnen een zoomcirkel
// (bacterie met plasmide, klont in E. coli, voorloper die gevouwen en geknipt wordt). Rode draad: één reageerbuisje wordt een medicijn.

Object.assign(SCENES, {
  title(ctx, t) {
    bioreactor(ctx, 1500, 840, 0.95, { t, sensor: 0.6, pomp: 0 });
    zoomCircle(ctx, 1080, 690, 140, 1430, 640, '', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(930, 540, 300, 300); bacteriePlasmide(ctx, 1080, 690, 240, { t, gen: 1, keten: 0.8 }); });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const V = 1 - q.on('Sam', 1, 0.8) * 0.45; // vroeger dimt een beetje als Sam komt
    ctx.save(); ctx.globalAlpha *= V; vrachtwagen(ctx, 330, 420, 0.85, q.on('slachthuis', 1)); naamBij(ctx, 'vroeger', 'SLACHTHUIS · ALVLEESKLIEREN', 300, 500, q.on('slachthuis', 1), 'center'); ctx.restore();
    const WS = weegschaal(ctx, 960, FLOOR, 0.82, { a: q.on('duizenden', 1), tilt: 0.04 + 0.16 * q.on('duizenden', 1, 1.2) });
    if (WS.L) { const k = q.on('duizenden', 1, 1.4); for (let r = 0; r < 3; r++) for (let c = 0; c < 3 - (r === 2 ? 1 : 0); c++) krat(ctx, WS.L[0] + (c - 1) * 54 + r * 26, WS.L[1] - r * 30, 0.62, clamp(k * 3 - (r * 3 + c) * 0.3, 0, 1));
      insulineFlesje(ctx, WS.R[0], WS.R[1], 0.7, q.on('één', 1)); metaA(ctx, 'DUIZENDEN KILO\'S', WS.L[0], WS.L[1] - 130, q.on('kilo', 1), C.grain, 'center', 28); metaA(ctx, '1 KILO INSULINE', WS.R[0], WS.R[1] - 90, q.on('één', 1), C.grain, 'center', 28); }
    const S = q.on('Sam', 1, 0.3);
    sam(ctx, 1520, t, { a: S, pose: 'wijsOmhoog', hold: q.on('reageerbuisje', 1) > 0.01 ? (c, hx, hy) => buisje(c, hx, hy + 70, 0.55, { a: q.on('reageerbuisje', 1) }) : null });
    naamBij(ctx, 'Sam', 'STAGIAIR · NU', 1520, 380, S, 'center');
    tag(ctx, 'genoeg voor miljoenen mensen', 1500, 170, C.goud, q.on('miljoenen', 1), 'center', 32);
    tag(ctx, 'zuiver genoeg om te spuiten', 1500, 240, C.goud, q.on('zuiver', 1), 'center', 32);
    vraagteken(ctx, 1780, 560, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord a: het menselijke insulinegen erin');
    labVloer(ctx); let BX = [300, 640]; sam(ctx, 260, t, { h: 360, hold: (c, hx, hy) => { buisje(c, hx, hy + 60, 0.5); BX = [hx, hy + 30]; } });
    zoomCircle(ctx, 1120, 500, 330, BX[0], BX[1], 'VERGROOT · ÉÉN BACTERIE ± 2 MICROMETER', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(780, 160, 680, 680);
      bacteriePlasmide(ctx, 1110, 480, 560, { t, gen: q.on('insulinegen', 1, 0.8), plasmide: 1, keten: q.on('lezen', 2, 2.2) });
      naamBij(ctx, 'plasmide', 'RINGETJE DNA', 1256, 560, q.on('plasmide', 1), 'center');
      naamBij(ctx, 'insulinegen', 'VAN DE MENS', 1200, 690, q.on('insulinegen', 1), 'center', C.goud);
      naamBij(ctx, 'eigen DNA', '', 1000, 430, q.on('genen', 1), 'center'); });
    chip(ctx, 'hoe je het erin plakt: zie de film DNA lezen', 620, 230, C.paars, q.on('DNA', 2) * (1 - q.on('lezen', 2)), 28);
    chip(ctx, 'de bacterie heeft er zelf niets aan', 1640, 230, C.koraal, q.on('niets', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const A = q.on('darmbacterie', 1, 0.5), G = q.on('bakkersgist', 1, 0.5);
    bacteriePlasmide(ctx, 620, 470, 380, { t, a: Math.max(A, 0.25), gen: 1 }); naamBij(ctx, 'E. coli', 'DARMBACTERIE · ± 2 MICROMETER', 620, 690, A, 'center');
    gistcel(ctx, 1320, 470, 180, { t, a: Math.max(G, 0.25) }); naamBij(ctx, 'bakkersgist', 'GISTCEL · ± 5 MICROMETER', 1320, 700, G, 'center');
    metaA(ctx, 'VERGROOT · VERHOUDING NIET OP SCHAAL', 960, 800, 1, C.grain, 'center', 28); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    krat(ctx, 220, 260, 1.2, 1); krat(ctx, 330, 260, 1.2, 1); naamBij(ctx, 'slachthuis', 'VARKEN EN RUND', 275, 320, 1, 'center');
    aminoRijen(ctx, 1220, 230, { a: q.on('Varkensinsuline', 1), k: 0.5 * q.on('Varkensinsuline', 1) + 0.5 * q.on('runderinsuline', 1) });
    metaA(ctx, 'GOUD = ANDER AMINOZUUR', 1220, 120, q.on('aminozuur', 1), C.goud, 'center', 28);
    chip(ctx, 'soms allergische reacties', 360, 520, C.koraal, q.on('allergische', 1), 30);
    const TL = q.on('zeventig', 1); if (TL > 0.01) { ctx.save(); ctx.globalAlpha *= TL; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(380, 720); ctx.lineTo(1540, 720); ctx.stroke();
      [['jaren 20', 'UIT ALVLEESKLIEREN', 500], ['jaren 70', 'VERWACHTING: TE WEINIG', 960], ['1982', 'UIT BACTERIËN', 1420]].forEach(([n, m, x], i) => { circ(ctx, x, 720, 10, i === 1 ? C.koraal : C.line); naamBij(ctx, n, m, x, 775, i === 2 ? 0.45 : 1, 'center'); }); ctx.restore(); }
    chip(ctx, 'te weinig alvleesklieren?', 960, 650, C.koraal, q.on('weinig', 1), 28); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    bacteriePlasmide(ctx, 620, 450, 520, { t, gen: 1, keten: 1 }); tag(ctx, 'genetisch gemodificeerd', 620, 230, C.paars, q.on('gemodificeerd', 1), 'center', 32);
    const I = q.on('insuline', 1, 0.8); for (let i = 0; i < 3; i++) { const k = clamp(I * 1.4 - i * 0.2, 0, 1); insulineMol(ctx, lerp(900, 1300 + i * 60, ease(k)), 330 + i * 170, 0.5, { a: k }); }
    vraagteken(ctx, 1640, 520, q.on('denk', 1), 120); },

  s09(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord b: een eiwit, geen organisme');
    insulineMol(ctx, 520, 360, 0.75, { a: 1 }); naamBij(ctx, 'insuline', 'EIWIT · GEEN GGO', 520, 470, q.on('eiwit', 1), 'center');
    bacteriePlasmide(ctx, 1320, 360, 440, { t, gen: 1, a: q.on('organisme', 1) }); naamBij(ctx, 'bacterie', 'ORGANISME · KAN GGO ZIJN', 1320, 500, q.on('organisme', 1), 'center');
    tag(ctx, 'menselijke insuline', 520, 580, C.groen, q.on('menselijke', 1), 'center', 30);
    insulinePen(ctx, 960, 730, 1, { a: q.on('1982', 1), rot: -0.12 }); chip(ctx, '1982 · goedgekeurd in de VS en Europa', 960, 640, C.goud, q.on('goedgekeurd', 1), 28); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const K = q.on('kolf', 1, 0.5); schudtafel(ctx, 420, 700, 320, { a: q.on('schudtafel', 1) }); kolf(ctx, 420 + Math.sin(t * 6) * 4 * q.on('schudtafel', 1), 700, 0.9, { a: K, t, golf: 1 });
    naamBij(ctx, 'kolf', '1 LITER · OP EEN SCHUDTAFEL', 420, 360, K, 'center');
    sam(ctx, 760, t, { a: q.on('Sams', 1, 0.3), pose: q.on('tien', 1) > 0.5 ? 'wijs' : 'staan' });
    const V = q.on('tien', 1, 0.6); vatGlas(ctx, 1200, FLOOR, 360, 560, { a: V, vul: 0.82, dicht: 0.5 }); naamBij(ctx, 'vat', '10 × ZOVEEL INHOUD', 1200, 250, V, 'center');
    tag(ctx, '10 × zoveel = 10 × meer?', 1200, 175, C.goud, q.on('denk', 1), 'center', 32);
    const G = q.on('ochtend', 1, 0.6); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; assen(ctx, 1480, 300, 360, 300, 'tijd', 'cellen'); const k = q.on('ochtend', 1, 2.4);
      const f1 = (u) => 1 / (1 + Math.exp(-10 * (u - 0.5))), f2 = (u) => 0.45 / (1 + Math.exp(-8 * (u - 0.55)));
      [[f1, C.teal, 'kolf'], [f2, C.koraal, 'vat']].forEach(([f, col, nm], i) => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 40 * k; j++) { const u = j / 40; const px = 1480 + u * 360, py = 600 - f(u) * 280; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); metaA(ctx, nm.toUpperCase(), 1830, 600 - f(1) * 280 - 16, k > 0.9 ? 1 : 0, col, 'right', 28); }); ctx.restore(); }
    chip(ctx, 'trager gegroeid', 1660, 250, C.koraal, q.on('trager', 1), 28);
    vraagteken(ctx, 960, 200, q.on('denk', 2), 100); },

  s12(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord c: te weinig zuurstof');
    chip(ctx, 'bij 37 °C: nog geen 7 milligram zuurstof per liter', 960, 250, C.teal, q.on('milligram', 1), 30);
    const K = q.on('kolf', 1, 0.6); kolf(ctx, 520, 760, 1.2, { a: Math.max(K, 0.3), t, golf: 1, zuurstof: q.on('oppervlak', 1) });
    naamBij(ctx, 'kolf', 'VEEL OPPERVLAK PER LITER', 520, 810, K, 'center');
    const V = q.on('groter', 1, 0.6); const R = vatGlas(ctx, 1320, 800, 340, 460, { a: V, vul: 0.85, t, zuurstof: q.on('inhoud', 1) });
    naamBij(ctx, 'groter vat', 'MINDER OPPERVLAK PER LITER', 1320, 850, V, 'center');
    const D = q.on('aanvoer', 1, 1); if (D > 0.01 && R) { ctx.save(); ctx.globalAlpha *= D * 0.55; roundRect(ctx, 1153, R.ly + 70, 334, 800 - R.ly - 74, 10); ctx.fillStyle = '#0D1420'; ctx.fill(); ctx.restore(); metaA(ctx, 'HIER KOMT WEINIG ZUURSTOF', 1320, 650, D, C.koraal, 'center', 28); }
    metaA(ctx, 'VEREENVOUDIGD', 920, 860, q.on('inhoud', 1), C.grain, 'center', 28); },

  s13(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const M = q.on('Merel', 1, 0.3); merel(ctx, 1500, t, { a: M, pose: q.on('bioreactor', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1 }); naamBij(ctx, 'Merel', 'PROCESTECHNOLOOG', 1500, 400, M, 'center');
    sam(ctx, 380, t, { a: 1, kijk: 1 });
    const BR = q.on('bioreactor', 1, 0.8); const P = bioreactor(ctx, 920, FLOOR, 1, { a: BR, t, bel: q.on('lucht', 1, 1), roer: q.on('roerder', 1), sensor: q.on('Sensoren', 1),
      hl: q.on('zuurstof', 1) > 0.5 && q.on('pomp', 1) < 0.5 ? 'O₂' : q.on('zuurgraad', 1) > 0.5 && q.on('zuurstof', 1) < 0.5 ? 'pH' : q.on('temperatuur', 1) > 0.5 && q.on('zuurgraad', 1) < 0.5 ? 'T' : null,
      pomp: q.on('pomp', 1), voeding: q.on('pomp', 1), stoom: q.on('stoom', 1) * (1 - q.on('microbe', 1)) });
    naamBij(ctx, 'bioreactor', 'AFGESLOTEN · GEREGELD', 920, 230, BR, 'center');
    if (P.lucht) metaA(ctx, 'LUCHT →', P.lucht[0] - 10, P.lucht[1] - 20, q.on('lucht', 1), C.teal, 'center', 28);
    chip(ctx, 'elk belletje = extra oppervlak', 920, 160, C.teal, q.on('belletje', 2) * (1 - q.on('computer', 1)), 28);
    chip(ctx, 'computer stuurt bij', 920, 160, C.goud, q.on('computer', 1) * (1 - q.on('steriel', 1)), 28);
    chip(ctx, 'eerst steriel: hete stoom', 920, 160, C.koraal, q.on('steriel', 1), 28);
    const MB = q.on('microbe', 1, 0.5); if (MB > 0.01) { ctx.save(); ctx.globalAlpha *= MB; circ(ctx, 1240, 300, 26, rgba(C.koraal, 0.4), C.koraal, 3); kruis(ctx, 1240, 300, 30, 1); ctx.restore(); metaA(ctx, 'VREEMDE MICROBE', 1240, 360, MB, C.koraal, 'center', 28); } },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const k = clamp((t - q.at('verdubbelt', 1)) / 4, 0, 1);
    ctx.save(); ctx.globalAlpha *= (1 - q.on('liter', 1) * 0.65); const n = k < 0.33 ? 1 : k < 0.66 ? 2 : 4; for (let i = 0; i < n; i++) bacteriePlasmide(ctx, 300 + (i % 2) * 250, 300 + Math.floor(i / 2) * 140, 210, { t, plasmide: 0.6 }); ctx.restore();
    klokje(ctx, 300, 590, 50, (t * 0.2) % 1, q.on('twintig', 1)); naamBij(ctx, 'elke 20 minuten', 'ONDER IDEALE OMSTANDIGHEDEN', 300, 690, q.on('twintig', 1), 'center');
    kolf(ctx, 700, 820, 0.9, { a: q.on('liter', 1), dicht: 0.9 }); metaA(ctx, '1 LITER', 700, 580, q.on('liter', 1), C.grain, 'center', 28);
    pijl(ctx, 820, 720, 1100, 720, C.line, q.on('duizend', 1), 4, 16);
    tank(ctx, 1380, 860, 360, 560, { a: q.on('duizend', 1), vul: 0.85 }); metaA(ctx, '1000 LITER, EVEN DICHT', 1380, 270, q.on('duizend', 1), C.grain, 'center', 28);
    vraagteken(ctx, 1720, 520, q.on('denk', 1), 110); },

  s16(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord b: ongeveer tien keer');
    const OUT = 1 - q.on('reageerbuisje', 1, 0.8);
    if (OUT > 0.01) { ctx.save(); ctx.globalAlpha *= OUT;
      const L = [['1', 'Antwoord'], ['2', 'Twee'], ['4', 'vier'], ['8', 'acht'], ['16', 'zestien'], ['…', 'zestien'], ['1024', 'duizendvierentwintig']];
      L.forEach(([s2, w], i) => { const a = i === 0 ? 1 : q.on(w, 1, 0.4) * (i === 5 ? q.on('duizendvierentwintig', 1) : 1); const x = 150 + i * 120 + (i === 6 ? 30 : 0); text(ctx, s2, x, 330, fTekst(i === 6 ? 52 : 46, 700), i === 6 ? C.goud : C.text, 'center'); ctx.globalAlpha *= 1; if (i < 6 && a > 0.01) metaA(ctx, '×2', x + 60, 280, q.on(L[i + 1][1], 1), C.grain, 'center', 28); });
      metaA(ctx, '10 KEER VERDUBBELEN = 2¹⁰ = 1024 × ZOVEEL', 520, 410, q.on('duizendvierentwintig', 1), C.goud, 'center', 28);
      const G = q.on('rechte', 1, 0.8); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; assen(ctx, 1150, 220, 560, 380, 'tijd', 'aantal'); ctx.strokeStyle = rgba(C.line, 0.8); ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1150, 600); ctx.lineTo(1710, 420); ctx.stroke(); ctx.setLineDash([]);
        metaA(ctx, 'RECHTE LIJN', 1720, 410, 1, C.line, 'left', 28); const k = q.on('harder', 1, 1.8); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); for (let j = 0; j <= 50 * k; j++) { const u = j / 50, px = 1150 + u * 560, py = 600 - (Math.pow(2, u * 10) - 1) / 1023 * 370; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); metaA(ctx, 'VERDUBBELEN', 1660, 250, k, C.teal, 'right', 28); ctx.restore(); }
      chip(ctx, '10 × 20 minuten: ruim 3 uur (theorie) · fabriek: trager', 640, 560, C.goud, q.on('uur', 1), 26); ctx.restore(); }
    const R = q.on('reageerbuisje', 1, 0.8); if (R > 0.01) {
      ctx.save(); ctx.globalAlpha *= R * (1 - q.on('schaal', 1)); buisje(ctx, 300, 760, 0.7); tank(ctx, 1200, 800, 420, 560, { vul: 0.85 }); metaA(ctx, 'ENORME TANK, BIJNA LEEG AAN CELLEN', 1200, 230, q.on('enorme', 1), C.koraal, 'center', 28);
      pijl(ctx, 380, 700, 960, 700, C.koraal, q.on('enorme', 1), 4, 16); kruis(ctx, 680, 620, 34, q.on('leeg', 1)); ctx.restore();
      const k = 1 + q.on('kolf', 1) + q.on('voorkweektank', 1) + q.on('productietank', 1); opschaalRij(ctx, 360, 720, { a: q.on('schaal', 1), k, hl: Math.min(3, Math.floor(k)) }); } },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    vatGlas(ctx, 720, FLOOR, 420, 600, { t, vul: 0.85, dicht: 1 }); naamBij(ctx, 'troebele vloeistof', 'VOL BACTERIËN', 720, 200, q.on('troebele', 1), 'center');
    sam(ctx, 1180, t, { a: 1, kijk: -1, pose: q.on('filteren', 1) > 0.5 ? 'wijs' : 'staan' });
    const F = q.on('filteren', 1, 0.6); if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1440, 420); ctx.lineTo(1600, 420); ctx.lineTo(1540, 530); ctx.lineTo(1540, 600); ctx.moveTo(1500, 530); ctx.lineTo(1500, 600); ctx.lineTo(1500, 530); ctx.lineTo(1440, 420); ctx.stroke(); ctx.restore();
      metaA(ctx, 'FILTER', 1520, 400, F, C.grain, 'center', 28); }
    const HL = q.on('heldere', 1, 0.6); if (HL > 0.01) { buisje(ctx, 1520, 820, 0.9, { a: HL, col: rgba('#9FC3D3', 0.35), vul: 0.6 }); naamBij(ctx, 'heldere vloeistof', 'HOUDEN?', 1600, 760, HL, 'left'); }
    vraagteken(ctx, 1760, 400, q.on('denk', 1), 110); },

  s19(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord c: in de cellen, in klonten');
    const K = q.on('klontert', 1, 0.8), OPEN = q.on('breekt', 1, 0.8), LOS = q.on('klonten', 1, 1.2), VW = q.on('vouwen', 1, 2.4);
    zoomCircle(ctx, 1300, 470, 320, 1300, 470, 'VERGROOT · ÉÉN E. COLI', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(970, 140, 660, 660);
      bacteriePlasmide(ctx, 1300, 470, 520, { t, a: 1 - OPEN * 0.85, klont: K * (1 - LOS), plasmide: 0.5 });
      if (LOS > 0.01) voorloper(ctx, 1260, 470, 0.5, { a: LOS, fold: VW, t });
      naamBij(ctx, 'klont', 'VOORLOPER', 1300, 650, K * (1 - LOS), 'center', C.text);
      naamBij(ctx, 'goed gevouwen', '', 1300, 650, VW, 'center'); });
    const WG = q.on('weggegooid', 1, 0.5); if (WG > 0.01) { buisje(ctx, 320, 520, 0.8, { a: WG * (1 - q.on('centrifuge', 1)), col: rgba('#9FC3D3', 0.35), vul: 0.6 }); kruis(ctx, 320, 420, 40, WG * (1 - q.on('centrifuge', 1))); metaA(ctx, 'HELDERE VLOEISTOF: GEEN INSULINE', 400, 590, WG * (1 - q.on('centrifuge', 1)), C.koraal, 'center', 28); }
    const C1 = q.on('centrifuge', 1, 0.3); centrifuge(ctx, 330, 820, 0.8, { a: C1 * (1 - OPEN * 0.6), t, draai: C1 });
    buisBezonken(ctx, 620, 820, 0.8, { a: q.on('houdt', 1), sep: q.on('houdt', 1, 1) }); naamBij(ctx, 'cellen houden', 'ONDERIN', 720, 790, q.on('houdt', 1), 'left', C.goud); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    const KN = q.on('middenstuk', 1, 1.6); const P = voorloper(ctx, 860, 520, 1.25, { fold: 1, knip: q.on('twee', 1, 1.2), t });
    naamBij(ctx, 'voorloper', 'ÉÉN LANGE KETEN', 860, 700, q.on('keten', 1) * (1 - q.on('twee', 1)), 'center');
    const E = q.on('Enzymen', 1, 0.6); if (E > 0.01 && P.knip1) { const k = clamp((t - q.at('Enzymen', 1)) / 1.5, 0, 1); [P.knip1, P.knip2].forEach(([x, y], i) => schaartje(ctx, lerp(i ? 200 : 1700, x + (i ? -40 : 40), ease(k)), lerp(i ? 200 : 760, y + (i ? -10 : 10), ease(k)), 40, { a: E * (1 - q.on('twee', 1)), sluit: KN })); metaA(ctx, 'ENZYMEN KNIPPEN', 1500, 760, E * (1 - q.on('twee', 1)), C.grain, 'center', 28); }
    naamBij(ctx, 'middenstuk', 'WORDT ERUIT GEKNIPT', 860, 200, q.on('middenstuk', 1) * (1 - q.on('twee', 1) * 0.5), 'center');
    naamBij(ctx, 'insuline', 'TWEE KETENS MET BRUGGEN', 860, 700, q.on('insuline', 1), 'center', C.groen); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    const k = clamp((t - q.at('kolom', 1)) / Math.max(1, (q.at('kolommen', 1) - q.at('kolom', 1))), 0, 1);
    kolom(ctx, 620, 790, 180, 540, { a: 1, t, k: k * 1.05, label: 'kolom', sub: 'VOL KORRELS' });
    const L = q.on('lading', 1); [['plakt lang', 'ANDERE LADING', '#6E7A90', 420], ['insuline', 'EIGEN MOMENT', KL_INS, 540], ['plakt kort', 'ANDERE LADING', '#B8C0CC', 660]].forEach(([n, m, col, y]) => { if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; circ(ctx, 790, y - 10, 12, col, n === 'insuline' ? C.goud : '#121A26', n === 'insuline' ? 3 : 2); ctx.restore(); } naamBij(ctx, n, m, 815, y, L, 'left'); });
    metaA(ctx, 'ONDERAAN ERUIT', 720, 830, q.on('onderaan', 1) * (1 - q.on('kolommen', 1)), C.grain, 'left', 28);
    const KK = q.on('kolommen', 1, 0.8); kolom(ctx, 1330, 790, 120, 380, { a: KK, t, k: 0.4, label: 'kolom 2', sub: '', toonUit: 0 }); kolom(ctx, 1640, 790, 120, 380, { a: KK, t, k: 0.6, label: 'kolom 3', sub: '', toonUit: 0 });
    const ka = q.at('kolommen', 1), kb = q.at('negenennegentig', 1); metaA(ctx, 'ELK OP IETS ANDERS', 1485, 300, KK, C.grain, 'center', 28); zuiverMeter(ctx, 1225, 200, 520, 0.4 + 0.595 * ease(clamp((t - ka) / Math.max(0.5, kb - ka), 0, 1)), q.on('kolommen', 1)); },

  // ---------- H4 ----------
  s22(ctx, t, q) { bg(ctx, 'schema');
    kaas(ctx, 330, 560, 1.1, 1); naamBij(ctx, 'kaas', '', 330, 610, 1, 'center');
    const CH = q.on('chymosine', 1, 0.6); enzymKluwen(ctx, 860, 400, 70, { a: CH, sluit: q.on('knipt', 1, 0.6) }); naamBij(ctx, 'chymosine', 'ENZYM · VERGROOT', 860, 520, CH, 'center');
    const MK = q.on('knipt', 1, 0.6); if (MK > 0.01) { const k = q.on('stremt', 1, 1); const pts1 = Array.from({ length: 7 }, (_, i) => [700 + i * 26 - k * 30, 620 + Math.sin(i) * 6]), pts2 = Array.from({ length: 7 }, (_, i) => [900 + i * 26 + k * 30, 620 + Math.sin(i + 7) * 6]); kralen(ctx, pts1, 10, C.oker, { a: MK }); kralen(ctx, pts2, 10, C.oker, { a: MK }); metaA(ctx, 'MELKEIWIT', 860, 690, MK, C.grain, 'center', 28); }
    chip(ctx, 'vroeger: uit kalvermagen', 1440, 260, C.oker, q.on('kalvermagen', 1), 28);
    const MO = q.on('micro-organismen', 1, 0.6); gistcel(ctx, 1440, 500, 110, { a: MO, t, uit: 0 }); if (MO > 0.01) { ctx.save(); ctx.globalAlpha *= MO * q.on('chymosine', 2); ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1440, 500, 70, -0.6, 0.6); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'micro-organisme', 'MET HET GEN VOOR CHYMOSINE', 1440, 670, MO, 'center'); },

  s23(ctx, t, q) { bg(ctx, 'schema');
    bierglas(ctx, 620, 780, 2.2, { a: q.on('bier', 1), t });
    const G = q.on('gist', 1, 0.6); for (let i = 0; i < 3; i++) gistcel(ctx, 1150 + i * 170, 420 + (i % 2) * 90, 60, { a: G, t, knop: 0.3 });
    naamBij(ctx, 'gist', '', 1320, 610, G, 'center');
    tag(ctx, 'suiker → alcohol + koolzuurgas', 1320, 720, C.oker, q.on('alcohol', 1), 'center', 30);
    chip(ctx, 'gisting · zie de film Alles op adem', 1320, 250, C.paars, q.on('gisting', 1), 28); },

  s24(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const S = q.on('schimmel', 1, 0.6); schimmelVat(ctx, 760, FLOOR, 1.22, { a: S, t }); naamBij(ctx, 'schimmel', 'IN EEN TOREN VAN ± 50 METER', 1000, 300, S, 'left');
    sam(ctx, 880, t, { h: 34, a: q.on('honderdvijftigduizend', 1) }); metaA(ctx, 'SAM, VOOR DE MAAT', 905, FLOOR - 50, q.on('honderdvijftigduizend', 1), C.grain, 'left', 28);
    tag(ctx, 'tot 150.000 liter', 1000, 420, C.goud, q.on('honderdvijftigduizend', 1), 'left', 32);
    chip(ctx, 'lucht stroomt erdoor', 1000, 520, C.teal, q.on('lucht', 1), 28);
    vraagteken(ctx, 1640, 520, q.on('denk', 1), 110); },

  s26(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord a: ja, ook fermentatie');
    const FD = 1 - q.on('eiwit', 1, 0.8) * 0.75;
    ctx.save(); ctx.globalAlpha *= FD; kaartje(ctx, 960, 270, 1300, 120, 'fermentatie: microben maken in een vat een product', 'MET OF ZONDER ZUURSTOF', { a: Math.max(0.35, q.on('fermentatie', 1)), col: C.teal });
    kaartje(ctx, 960, 420, 1300, 120, 'gisting: suiker omzetten zonder zuurstof', 'IETS SMALLERS · ZIE ALLES OP ADEM', { a: q.on('Gisting', 1), col: C.paars }); ctx.restore();
    const kaarten = [['de cel maakt een eiwit', 'VAN EEN INGEBRACHT GEN · INSULINE, CHYMOSINE', 'eiwit', 1, C.paars], ['de cel maakt een stof bij gisting', 'ALCOHOL EN KOOLZUURGAS', 'gisting', 2, C.oker], ['de cel zelf is het product', 'DE SCHIMMEL IN EEN VLEESVERVANGER', 'zelf', 1, C.teal]];
    kaarten.forEach(([k, s2, w, n, col], i) => kaartje(ctx, 960, 580 + i * 118, 1100, 108, k, s2, { a: q.on(w, n), col })); },

  // ---------- Recap ----------
  s27(ctx, t, q) { bg(ctx, 'schema');
    const X = [200, 450, 720, 1010, 1290, 1600];
    buisje(ctx, X[0], 560, 0.7, { a: Math.max(0.4, q.on('reageerbuisje', 1)) }); kolf(ctx, X[1], 560, 0.6, { a: q.on('verdubbelen', 1) }); tank(ctx, X[2], 560, 200, 300, { a: q.on('vat', 1) });
    centrifuge(ctx, X[3], 560, 0.55, { a: q.on('zuiver', 1), t, draai: 1 }); kolom(ctx, X[4], 560, 90, 260, { a: q.on('zuiver', 1, 1.5), t, k: 0.75, toonUit: 0 }); insulinePen(ctx, X[5], 460, 0.9, { a: q.on('kwart', 1, 0.6) });
    const PA = [['verdubbelen', 0], ['vat', 1], ['zuiver', 2], ['zuiver', 3], ['kwart', 4]]; PA.forEach(([w, i]) => pijl(ctx, X[i] + 80, 470, X[i + 1] - 80, 470, C.line, q.on(w, 1), 3, 14));
    metaA(ctx, 'OPSCHALEN', 460, 640, q.on('verdubbelen', 1), C.grain, 'center', 28); metaA(ctx, 'ZUIVEREN', 1150, 640, q.on('zuiver', 1), C.grain, 'center', 28);
    tag(ctx, 'Nederland: ruim een kwart miljoen insulinegebruikers', 960, 790, C.goud, q.on('kwart', 1), 'center', 30); },

  s28(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    sam(ctx, 180, t, { a: 1, h: 360 }); merel(ctx, 1760, t, { a: 1, h: 360, kijk: -1 });
    schoolIcoon(ctx, 470, 360, 1, q.on('mbo', 1), 'MBO'); naamBij(ctx, 'biologisch-medisch analist', 'NIVEAU 4', 470, 520, q.on('mbo', 1), 'center');
    schoolIcoon(ctx, 960, 360, 1, q.on('HAN', 1), 'HBO'); naamBij(ctx, 'Biologie en Medisch Lab.', 'HAN · NIJMEGEN', 960, 520, q.on('HAN', 1), 'center');
    schoolIcoon(ctx, 1450, 360, 1, q.on('universiteit', 1), 'WO'); naamBij(ctx, 'Molecular Life Sciences', 'RADBOUD · NIJMEGEN', 1450, 520, q.on('Radboud', 1), 'center'); naamBij(ctx, 'Biotechnologie', 'WAGENINGEN', 1450, 620, q.on('Wageningen', 1), 'center');
    fabriekIcoon(ctx, 960, 720, 0.7, q.on('dsm', 1)); naamBij(ctx, 'dsm-firmenich', 'DELFT · BIJVOORBEELD', 1080, 730, q.on('dsm', 1), 'left');
    chip(ctx, 'film 3: mag dat zomaar?', 960, 180, C.paars, q.on('drie', 1), 28); },
});

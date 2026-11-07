// Op lengte gesorteerd 2.0 — scènes, één functie per gesproken regel (s01–s38). 31 okt 2026, beeld-remake op prompt v13.
// q.at(woord) = begintijd van het eerste woord dat dit stukje bevat (zie player.js makeQ). Elke scène is in t = 0 al gevuld.
const schema = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const micro = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }; // geen korrel buiten cellen (hier is geen cel)
const R = (t, q, w, d = 0.5, n = 1, vroeg = 0.1) => ramp(t, q.at(w, n) - vroeg, d);
const UIT = (t, q, w, d = 0.4, n = 1) => 1 - ramp(t, q.at(w, n) - 0.15, d);
const GELMID = { x: GFULL.x + GFULL.w / 2, y: GFULL.y + GFULL.h / 2 };
const SP_ALLEL = LANE_BANDS.Sp.filter(b => b.kind === 'allele');

// de volledige gel uit het practicum, met namen
function volleGel(ctx, o = {}) { const G = o.G || GFULL; gelFoto(ctx, G, { key: 'vol' }); baanNamen(ctx, G, { hl: o.hl || [] }); return G; }

// mini-gel voor H3 (twee banen, ingezoomd op één STR)
function miniGel(ctx, x, y, w, h, banen, bpTop, bpBot, a = 1, key = 'mini') { if (a <= 0.01) return null; const G = gelGeo({ x, y, w, h, lanes: banen.map(b => b[0]), bpTop, bpBot, wellY: 30, yTop: 70, yBotPad: 40, bandFrac: 0.6, bandH: 14, padX: 20 });
  const bands = {}; banen.forEach(b => bands[b[0]] = b[1]); ctx.save(); ctx.globalAlpha *= a; gelFoto(ctx, G, { key, bands }); baanNamen(ctx, G, { naam: Object.fromEntries(banen.map(b => [b[0], b[2] || b[0]])) }); ctx.restore(); return G; }

Object.assign(SCENES, {
  // ---------------- titel: de gelfoto van het practicum, klein rechts
  title(ctx, t) { const G = gelGeo({ x: 1120, y: 430, w: 680, h: 440, lanes: FULL_LANES, bpTop: 310, bpBot: 44, wellY: 28, yTop: 56, yBotPad: 22, bandH: 6, padX: 16 }); gelFoto(ctx, G, { key: 'titel' }); },

  // ================= Opening =================
  s01(ctx, t, q) { schema(ctx);
    // doorlopende zoom: het gel-documentatiekastje op de labtafel, Noor ernaast → de gelfoto vult het beeld
    const z = ease(clamp((t - 1.0) / 2.0, 0, 1)), k = Math.pow(0.3, 1 - z), cx = lerp(1270, GELMID.x, z), cy = lerp(470, GELMID.y, z);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-GELMID.x, -GELMID.y); gelDocWereld(ctx, t); gelFoto(ctx, GFULL, { key: 'vol' }); ctx.restore();
    naamBij(ctx, 'gelfoto', 'practicum dna-profielen', 1560, 280, ramp(t, 0.4, 0.5) * (1 - ramp(t, 1.1, 0.4)), 'left');
    baanNamen(ctx, GFULL, { a: ramp(t, 2.6, 0.4) }); },
  s02(ctx, t, q) { schema(ctx); const G = volleGel(ctx, { hl: t > q.at('baan') - 0.1 ? ['Sp'] : [] });
    const aB = R(t, q, 'baan'), aD = R(t, q, 'band', 0.5);
    dimBanen(ctx, G, ['Sp'], aB); baanKader(ctx, G, 'Sp', aB);
    naamBij(ctx, 'baan', 'één monster', G.lx('Sp') + G.pitch / 2 + 6, G.y + 120, aB * (1 - aD), 'left');
    const y = G.Y(140); bandRing(ctx, G, 'Sp', 140, aD);
    naamBij(ctx, 'band', 'dna van één lengte', G.lx('Sp') + G.pitch / 2 + 6, y + 14, aD, 'left'); },
  s03(ctx, t, q) { schema(ctx); const s = 1 - 0.42 * ease(clamp(t / 0.9, 0, 1)), ox = lerp(0, -330, ease(clamp(t / 0.9, 0, 1)));
    ctx.save(); ctx.translate(GELMID.x + ox, GELMID.y); ctx.scale(s, s); ctx.translate(-GELMID.x, -GELMID.y); volleGel(ctx); ctx.restore();
    vraagKaart(ctx, 1220, 330, 'Hoe lees je zo’n foto af?', R(t, q, 'lees', 0.5)); vraagKaart(ctx, 1220, 530, 'Kun je hem vertrouwen?', R(t, q, 'vertrouwen', 0.5)); },

  // ================= H1 Hoe de gel werkt =================
  s04(ctx, t, q) { schema(ctx);
    // stuk gel (Schema) met een zoomcirkel naar het agarose-netwerk (Micro)
    const G = gelGeo({ x: 140, y: 250, w: 520, h: 520, lanes: FULL_LANES.slice(0, 5), bpTop: 310, bpBot: 44, wellY: 30, yTop: 60, yBotPad: 24, bandH: 6, padX: 14 });
    gelFoto(ctx, G, { key: 'stuk', wit: true }); naamBij(ctx, 'gel', 'plak agarose', G.x, G.y - 30, ramp(t, 0.2, 0.5), 'left');
    const z = R(t, q, 'netwerk', 0.7);
    zoomCircle(ctx, 1240, 450, 380, 470, 520, 'agarose · ± 100 000 × vergroot', z, () => { micro(ctx); agaroseNet(ctx, 860, 70, 760, 760, 2, 3);
      const g = R(t, q, 'gaatjes', 0.5); [[1130, 330], [1330, 520], [1160, 640], [1420, 300]].forEach(([x, y], i) => { ctx.save(); ctx.globalAlpha *= g * ramp(t, q.at('gaatjes') + i * 0.15, 0.3); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 34, 0, 6.283); ctx.stroke(); ctx.restore(); }); });
    naamBij(ctx, 'agarose', 'lange suikerketens', 1650, 250, R(t, q, 'agarose') * z, 'left');
    naamBij(ctx, 'gaatjes', 'tussen de ketens', 1650, 620, R(t, q, 'gaatjes') * z, 'left'); },
  s05(ctx, t, q) { schema(ctx);
    // doorsnede: gel in de buffer, één putje; de punt van de pipet net onder het bufferoppervlak; het monster zakt
    const x0 = 360, x1 = 1560, yb = 330, yg = 470, yd = 760, px = 960, pw = 70, pd = 110;
    ctx.save(); ctx.fillStyle = rgba(C.teal, 0.16); ctx.fillRect(x0, yb, x1 - x0, yd - yb); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke(); ctx.restore();
    ctx.beginPath(); ctx.moveTo(x0, yg); ctx.lineTo(px - pw / 2, yg); ctx.lineTo(px - pw / 2, yg + pd); ctx.lineTo(px + pw / 2, yg + pd); ctx.lineTo(px + pw / 2, yg); ctx.lineTo(x1, yg); ctx.lineTo(x1, yd); ctx.lineTo(x0, yd); ctx.closePath(); shape(ctx, '#5F6E86', LAB.lijn, 2);
    ctx.strokeStyle = LAB.lijn; ctx.lineWidth = 3; ctx.strokeRect(x0, yb - 40, x1 - x0, yd - yb + 40); // bakwand
    // monster: van de punt naar de bodem van het putje
    const d = R(t, q, 'zakt', 1.4, 1, 0.3), uit = R(t, q, 'zware', 0.8);
    const tipY = yb + 40; ctx.save(); ctx.fillStyle = rgba(GELK.kleurstof, 0.9);
    if (uit > 0.01) { const vol = uit * (1 - d); ctx.beginPath(); ctx.ellipse(px, tipY + 26 * vol + d * (yg + pd - 28 - tipY), 24 + 6 * d, 10 + 16 * vol + 6 * d, 0, 0, 6.283); ctx.fill(); }
    if (d > 0.02) { const h = 30 * d; ctx.fillRect(px - pw / 2 + 3, yg + pd - h - 2, pw - 6, h); }
    ctx.restore();
    micropipet(ctx, px, tipY, 1.5, { id: 'noor', rot: 0.18, knop: R(t, q, 'zware', 0.8), vol: 10, kleur: GELK.kleurstof });
    naamBij(ctx, 'laadbuffer', 'zwaar · met blauwe kleurstof', px + 60, tipY + 120, R(t, q, 'laadbuffer'), 'left');
    naamBij(ctx, 'PCR-product', 'zit erin', px + 60, tipY + 200, R(t, q, 'PCR') * (1 - R(t, q, 'putje', 0.4)), 'left');
    naamBij(ctx, 'putje', 'in de gel', px + 60, yg + pd + 10, R(t, q, 'putje'), 'left', C.goud);
    naamBij(ctx, 'buffer', null, x0 + 20, yb + 60, 0.8, 'left', C.text2); naamBij(ctx, 'gel', null, x0 + 20, yg + 90, 0.8, 'left', C.text2);
    schaalTekst(ctx, 'doorsnede · vergroot'); },
  s06(ctx, t, q) { micro(ctx);
    const sp = R(t, q, 'spanning', 0.5), mv = clamp((t - q.at('beweegt')) / 2.2, 0, 1), y = lerp(430, 640, ease(mv));
    elektrode(ctx, 520, 1360, 170, false, sp); elektrode(ctx, 520, 1360, 790, true, sp);
    naamBij(ctx, 'minpool', null, 1420, 150, sp * 0.9, 'left', C.text2); naamBij(ctx, 'pluspool', null, 1420, 770, R(t, q, 'pluspool'), 'left', C.koraal);
    dnaStuk(ctx, 940, y, 560, { t: t * 0.6, golf: 8, w: 30, min: t > q.at('negatief') - 0.2, minPx: 40 });
    naamBij(ctx, 'negatief geladen', 'fosfaatgroepen', 1240, 360, R(t, q, 'negatief') * (1 - sp * 0.6), 'left');
    pijlV(ctx, 940, y + 60, 940, y + 130, C.koraal, R(t, q, 'beweegt'), 4, 18);
    schaalTekst(ctx, 'dna-stuk · vergroot'); },
  s07(ctx, t, q) { schema(ctx);
    const B = gelbakBoven(ctx, 960, 470, { a: 1 });
    const a1 = R(t, q, 'putjes'), a2 = R(t, q, 'minpool'), a3 = R(t, q, 'zwarte');
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, B.put0 - 24, B.putY - 26, B.put1 - B.put0 + 48, 52, 10); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'putjes', null, B.x1 + 40, B.putY + 12, a1, 'left', C.goud);
    naamBij(ctx, 'minpool', 'zwarte elektrode', B.x1 + 40, B.minY + 12, a2, 'left', a3 > 0.5 ? C.goud : C.text);
    naamBij(ctx, 'pluspool', 'rode elektrode', B.x1 + 40, B.plusY + 12, a2 * 0.8, 'left', C.text2);
    if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, B.x0 - 14, B.minY - 22, B.x1 - B.x0 + 28, 44, 12); ctx.stroke(); ctx.restore(); }
    pijlV(ctx, B.x0 - 90, B.putY + 40, B.x0 - 90, B.plusY - 60, C.text2, R(t, q, 'daarom') * 0.9, 3, 16); metaText(ctx, 'looprichting', B.x0 - 110, (B.putY + B.plusY) / 2, C.text2, 'right', 28); metaText(ctx, 'van het dna', B.x0 - 110, (B.putY + B.plusY) / 2 + 36, C.text2, 'right', 28);
    schaalTekst(ctx, 'gelbak · bovenaanzicht'); },
  s08(ctx, t, q) { micro(ctx); agaroseNet(ctx, 260, 60, 1400, 820, 1.6, 11, 0.8);
    // kort stuk glipt (rustig, gestaag), lang stuk kronkelt en blijft haken
    const tk = clamp((t - q.at('Korte') + 0.2) / 3.0, 0, 1), tl = clamp((t - q.at('Lange') + 0.3) / 2.6, 0, 1);
    const yk = lerp(140, 760, ease(tk)), hk = Math.sin(t * 2) * 6; dnaStuk(ctx, 640 + hk, yk, 120, { rot: Math.PI / 2 * 0.85, golf: 4, t, w: 14, hl: R(t, q, 'Korte') * 0.6, min: false });
    const haak = Math.min(tl, 0.35) + Math.max(0, tl - 0.7) * 0.4; const yl = lerp(150, 760, ease(haak)), wig = Math.sin(t * 3.2) * 18 * (tl > 0.3 ? 1 : 0.3);
    dnaStuk(ctx, 1240 + wig, yl, 380, { rot: Math.PI / 2 * 0.7, golf: 26, t: t * 1.4, w: 14, hl: R(t, q, 'Lange') * 0.6, min: false });
    naamBij(ctx, 'kort stuk', 'glipt erdoor', 700, Math.min(yk + 10, 820), R(t, q, 'Korte'), 'left');
    naamBij(ctx, 'lang stuk', 'blijft haken', 1380, yl - 140, R(t, q, 'Lange'), 'left');
    pijlV(ctx, 140, 380, 140, 620, C.koraal, 0.9, 4, 16); metaText(ctx, 'naar +', 140, 670, C.koraal, 'center', 28);
    schaalTekst(ctx, 'agarose en dna · vergroot'); },
  s09(ctx, t, q) { schema(ctx);
    // één baan: drie lengtes vertrekken samen uit het putje en raken uit elkaar
    const G = gelGeo({ x: 700, y: 120, w: 200, h: 740, lanes: ['x'], bpTop: 600, bpBot: 40, wellY: 34, yTop: 70, yBotPad: 30, bandFrac: 0.7, bandH: 12, padX: 10 });
    roundRect(ctx, G.x, G.y, G.w, G.h, 12); shape(ctx, GELK.plaat, GELK.rand, 2); ctx.strokeStyle = GELK.put; ctx.lineWidth = 2; ctx.strokeRect(G.cx(0) - G.bw / 2, G.wellY - 6, G.bw, 12);
    const p = ease(clamp((t - 0.3) / 3.4, 0, 1)), L = [[400, 210], [160, 120], [60, 50]];
    L.forEach(([bp, len], i) => { const y = lerp(G.wellY + 14, G.Y(bp), p); gelBand(ctx, G.cx(0), y, G.bw, G.bandH, 1.0, 'allele');
      dnaStuk(ctx, 1040 + len / 2, y, len, { w: 12, min: false, a: ramp(t, 0.2 + i * 0.2, 0.4) });
      ctx.save(); ctx.globalAlpha *= clamp((p - 0.12) / 0.2, 0, 1); metaText(ctx, bp + ' bp', 1060 + len + 24, y + 10, C.text2, 'left', 28); ctx.restore(); });
    elektrode(ctx, 660, 940, 70, false, 0.9); elektrode(ctx, 660, 940, 900, true, 0.9);
    naamBij(ctx, 'lang', 'dicht bij het putje', 380, G.Y(400) + 12, R(t, q, 'korter', 0.5) * p, 'right');
    naamBij(ctx, 'kort', 'het verst', 380, G.Y(60) + 12, R(t, q, 'korter', 0.5, 1, -0.4) * p, 'right', C.goud);
    term(ctx, 'hoe korter, hoe verder', 1060, 820, R(t, q, 'verder', 0.5), 'left', 44); },
  s10(ctx, t, q) { micro(ctx);
    // een wolk kopieën van één lengte loopt even ver en wordt één band
    const s = ease(clamp((t - q.at('Samen') + 0.3) / 1.4, 0, 1)), y0 = lerp(180, 520, ease(clamp(t / 3.0, 0, 1)));
    for (let i = 0; i < 26; i++) { const wv = wander(i, t, 10, 0.6), x = 560 + (i % 13) * 66 + wv.x * (1 - s), y = y0 + (Math.floor(i / 13) - 0.5) * 70 * (1 - s) + hash(i * 5) * 50 * (1 - s) + wv.y * (1 - s);
      dnaStuk(ctx, x, y, 90 * (1 - 0.6 * s), { w: 11, min: false, rot: (hash(i) - 0.5) * 0.5 * (1 - s), a: 1 - 0.85 * s }); }
    if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; gelBand(ctx, 960, y0 + 10, 860, 30, 1.6, 'allele'); ctx.restore(); }
    naamBij(ctx, 'kopieën', 'allemaal dezelfde lengte', 1480, 300, R(t, q, 'kopieën') * (1 - s), 'left');
    naamBij(ctx, 'één band', 'miljoenen kopieën samen', 1440, y0 - 50, s, 'left', C.goud);
    schaalTekst(ctx, 'vergroot · kopieën als stukjes'); },
  s11(ctx, t, q) { schema(ctx);
    // twee zoomcirkels: weinig agarose (grote gaatjes) en veel agarose (kleine gaatjes); daarnaast een baantje met STR-stukken
    const b = R(t, q, 'STR', 0.6);
    [[430, 1, '1 % agarose', 'grote gaatjes', 7, 0.16], [1310, 3, '4 % agarose', 'kleine gaatjes', 9, 1]].forEach(([x, d, n, m, sd, sp], i) => {
      const a = i ? R(t, q, 'kleiner', 0.5) : 1; if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a; const goud = i && b > 0.5;
      ctx.save(); ctx.beginPath(); ctx.arc(x, 400, 230, 0, 6.283); ctx.clip(); micro(ctx); agaroseNet(ctx, x - 240, 160, 480, 480, d, sd); ctx.restore();
      ctx.strokeStyle = goud ? C.goud : C.line; ctx.lineWidth = goud ? 3 : 2; ctx.beginPath(); ctx.arc(x, 400, 230, 0, 6.283); ctx.stroke();
      naamBij(ctx, n, m, x - 130, 700, 1, 'left', goud ? C.goud : C.text);
      // baantje: STR-stukken 68–212 bp; op 1 % op een kluitje ver in de gel, op 4 % uit elkaar
      if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; const lx = x + 330, y0 = 150, y1 = 820; roundRect(ctx, lx - 50, y0, 100, y1 - y0, 10); shape(ctx, GELK.plaat, GELK.rand, 2);
        ctx.strokeStyle = GELK.put; ctx.lineWidth = 2; ctx.strokeRect(lx - 34, y0 + 22, 68, 10);
        [68, 76, 106, 112, 140, 144, 172, 200, 204].forEach(bp => { const f = Math.log(212 / bp) / Math.log(212 / 68), y = i ? lerp(260, 760, f) : lerp(690, 760, f); gelBand(ctx, lx, y, 68, 6, 1, 'allele'); });
        metaText(ctx, 'str-stukken', lx, y1 + 40, C.text2, 'center', 26); ctx.restore(); }
      ctx.restore(); }); },
  s12(ctx, t, q) { schema(ctx);
    // eerst ongekleurd (alleen de blauwe kleurstof uit de laadbuffer), dan met kleurstof en blauw licht
    const k = R(t, q, 'kleurstof', 0.8), bl = R(t, q, 'blauw', 0.8);
    const G = gelGeo({ x: 140, y: 150, w: 1100, h: 700, lanes: FULL_LANES, bpTop: 310, bpBot: 44, wellY: 34, yTop: 70, yBotPad: 28, bandH: 8 });
    ctx.save(); ctx.globalAlpha *= 1 - bl; gelFoto(ctx, G, { key: 'wit', wit: true });
    G.lanes.forEach((id, i) => { ctx.fillStyle = rgba(GELK.kleurstof, 0.75); roundRect(ctx, G.cx(i) - G.bw / 2, G.Y(38) - 4, G.bw, 10, 4); ctx.fill(); }); ctx.restore();
    if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; gelFoto(ctx, G, { key: 'blauw', blauw: true }); ctx.restore(); }
    baanNamen(ctx, G);
    naamBij(ctx, 'DNA is kleurloos', 'alleen de laadkleur is te zien', 1390, 330, R(t, q, 'kleurloos') * (1 - k), 'left');
    naamBij(ctx, 'kleurstof', 'hecht aan dna', 1400, 450, k, 'left');
    naamBij(ctx, 'blauw licht', 'banden lichten op', 1400, 570, bl, 'left', C.goud); },

  // ================= H2 Lengte aflezen =================
  s13(ctx, t, q) { schema(ctx); const G = GZOOM; gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: '' } });
    const m = R(t, q, 'marker'); dimBanen(ctx, G, ['M50'], m * (1 - R(t, q, 'enzovoort', 0.6))); baanKader(ctx, G, 'M50', m);
    [['50', 50], ['100', 100], ['150', 150]].forEach(([w, bp]) => { const a = R(t, q, w, 0.35); if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, bp + ' bp', G.x - 24, G.Y(bp) + 9, C.goud, 'right', 28); ctx.restore(); });
    [200, 250, 300].forEach((b, j) => { const a = ramp(t, q.at('enzovoort') + j * 0.2, 0.3); if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, b + ' bp', G.x - 24, G.Y(b) + 9, C.text2, 'right', 28); ctx.restore(); });
    naamBij(ctx, 'marker', 'dna-stukken met een bekende lengte', 980, 300, m, 'left'); },
  s14(ctx, t, q) { schema(ctx); const G = GZOOM; gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: '' } });
    [50, 100, 150, 200, 250, 300].forEach(b => metaText(ctx, b + ' bp', G.x - 24, G.Y(b) + 9, C.text2, 'right', 28));
    const a = R(t, q, 'band'), y = G.Y(140); bandRing(ctx, G, 'Sp', 140, ramp(t, 0.2, 0.4));
    gidsLijn(ctx, y, G.lx('Sp') - G.bw / 2 - 10, G.lx('M50') - G.bw / 2, a, C.goud, ramp(t, q.at('band') - 0.1, 0.8));
    naamBij(ctx, 'jouw band', null, G.lx('AL') - 20, y + 12, ramp(t, 0.2, 0.4), 'left', C.goud); },
  s15(ctx, t, q) { schema(ctx); const G = GZOOM; gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: '' } });
    const a1 = R(t, q, '100'), a2 = R(t, q, 'dichter', 0.5), a3 = R(t, q, 'ongeveer', 0.5);
    [50, 100, 150, 200, 250, 300].forEach(b => metaText(ctx, b + ' bp', G.x - 24, G.Y(b) + 9, (b === 100 || b === 150) && a1 > 0.5 ? C.goud : C.text2, 'right', 28));
    bandRing(ctx, G, 'M50', 100, a1); bandRing(ctx, G, 'M50', 150, a1); bandRing(ctx, G, 'Sp', 140, 1);
    gidsLijn(ctx, G.Y(140), G.lx('Sp') - G.bw / 2 - 10, G.lx('M50') - G.bw / 2, 1);
    vHaak(ctx, G.lx('M50') + G.bw / 2 + 14, G.Y(150), G.Y(140), a2, C.goud);
    term(ctx, '± 140 bp', 1000, G.Y(140) + 16, a3, 'left', 56, C.goud); },
  s16(ctx, t, q) { schema(ctx); const G = GZOOM; gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: '' } });
    [50, 100, 150, 200, 250, 300].forEach(b => metaText(ctx, b + ' bp', G.x - 24, G.Y(b) + 9, C.text2, 'right', 28));
    dimBanen(ctx, G, ['M50'], 1);
    // afstanden tussen opeenvolgende markerbanden: onderaan groot, bovenaan klein
    [[50, 100], [100, 150], [150, 200], [200, 250], [250, 300]].forEach(([a, b], i) => { const al = ramp(t, q.at('Hoger') + 0.3 + (4 - i) * 0.35, 0.35); vHaak(ctx, G.lx('M50') + G.bw / 2 + 14, G.Y(b) + 3, G.Y(a) - 3, al, i >= 3 ? C.goud : C.line); });
    term(ctx, 'hoger = dichter op elkaar', 980, G.Y(260), R(t, q, 'dichter', 0.5), 'left', 44); },
  s17(ctx, t, q) { schema(ctx); const G = GZOOM; gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: '' } });
    [50, 100, 150, 200, 250, 300].forEach(b => metaText(ctx, b + ' bp', G.x - 24, G.Y(b) + 9, C.text2, 'right', 28));
    // lengtegebieden per STR op dezelfde schaal, rechts van de gel
    const xg = 1010, ag = R(t, q, 'welke', 0.6), d8 = R(t, q, 'eigen', 0.5);
    [['TPOX', 'TPOX'], ['AMEL', 'amelogenine'], ['D8', 'D8S1179'], ['VWA', 'vWA'], ['D3', 'D3S1358']].forEach(([id, nm], i) => { const [lo, hi] = KIT[id].range, a = ag * ramp(t, q.at('welke') + i * 0.3, 0.3); if (a < 0.01) return;
      const on = id === 'D8' && d8 > 0.5, y0 = G.Y(hi) - 6, y1 = G.Y(lo) + 6; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, xg, y0, 26, y1 - y0, 8); shape(ctx, on ? C.goud : '#3A4A66', on ? C.goud : LAB.lijn, 1.5);
      naamBij(ctx, nm, lo + '–' + hi + ' bp', xg + 50 + (id === 'D3' ? 330 : 0), (y0 + y1) / 2 + (id === 'D3' ? -20 : id === 'VWA' ? 14 : 4), 1, 'left', on ? C.goud : C.text); ctx.restore(); });
    gidsLijn(ctx, G.Y(140), G.lx('Sp') + G.bw / 2 + 8, xg - 8, d8, C.goud); bandRing(ctx, G, 'Sp', 140, d8); },
  s18(ctx, t, q) { schema(ctx);
    const c = R(t, q, 'chromosoom', 0.5), f = R(t, q, 'lengte', 0.5), h = R(t, q, 'herhalingen', 0.5);
    staafChrom(ctx, 250, 470, 520, CD.std, ramp(t, 0.1, 0.5), 0.62); naamBij(ctx, 'chromosoom 8', null, 300, 220, c, 'left');
    metaText(ctx, 'str d8s1179 · uitvergroot', 520, 330, C.grain, 'left', 28);
    const r = strStuk(ctx, 520, 450, 13, { a: ramp(t, 0.3, 0.6), blok: 52, h: 56, flankL: 150, flankR: 150, hl: -1 });
    { const yb = 470 - 260 + 0.62 * 520; ctx.save(); ctx.globalAlpha *= ramp(t, 0.3, 0.6) * 0.8; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(275, yb - 6); ctx.lineTo(520, 422); ctx.moveTo(275, yb + 6); ctx.lineTo(520, 478); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= h; ctx.font = fMeta(17); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; for (let i = 0; i < 13; i++) ctx.fillText('TCTA', r.xr0 + i * 52 + 24, 456); ctx.restore();
    naamBij(ctx, 'flanken', 'samen 88 bp', 520, 540, f, 'left', C.text2);
    naamBij(ctx, 'herhalingen', 'elk 4 bp', r.xr0 + 200, 540, h, 'left', C.goud);
    term(ctx, 'lengte = 88 + 4 × n', 960, 760, R(t, q, '88', 0.5), 'center', 64); metaText(ctx, 'n = aantal herhalingen', 960, 820, C.grain, 'center', 28); },
  s19(ctx, t, q) { schema(ctx);
    const a1 = R(t, q, 'min', 0.5), a2 = R(t, q, 'Gedeeld', 0.5), a3 = R(t, q, 'allel', 0.5);
    term(ctx, 'lengte = 88 + 4 × n', 960, 170, 0.6, 'center', 44, C.text2);
    term(ctx, '140 − 88 = 52', 960, 320, a1, 'center', 64); term(ctx, '52 : 4 = 13', 960, 440, a2, 'center', 64);
    const r = strStuk(ctx, 330, 610, 13, { a: 1, blok: 72, h: 56, flankL: 140, flankR: 140, tel: clamp((t - q.at('Gedeeld')) / 1.6, 0, 1) });
    term(ctx, 'allel 13', 960, 790, a3, 'center', 72, C.goud); },
  s20(ctx, t, q) { schema(ctx); const G = GZOOM; const al = R(t, q, 'allelladder', 0.6);
    gelFoto(ctx, G, { key: 'zoom2', bands: { M50: LANE_BANDS.M50, Sp: LANE_BANDS.Sp, AL: [] } }); baanNamen(ctx, G, { naam: { M50: 'marker', Sp: 'spoor', AL: al > 0.5 ? 'ladder' : '' } });
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.rect(G.lx('AL') - G.pitch / 2, G.y, G.pitch, G.h); ctx.clip(); gelFoto(ctx, G, { key: 'zoom3', bands: { M50: [], Sp: [], AL: LANE_BANDS.AL } }); ctx.restore(); }
    naamBij(ctx, 'allelladder', 'alle allelen van de kit', 960, 220, al, 'left');
    const h = R(t, q, 'hoog', 0.5), y = G.Y(140); bandRing(ctx, G, 'Sp', 140, h); bandRing(ctx, G, 'AL', 140, R(t, q, 'ladderband', 0.4), C.goud, 5);
    gidsLijn(ctx, y, G.lx('Sp') + G.bw / 2 + 10, G.lx('AL') - G.bw / 2 - 2, h, C.goud, ramp(t, q.at('hoog') - 0.1, 0.7));
    { const A = R(t, q, 'ladderband', 0.4); if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; metaText(ctx, '13', G.lx('AL') + G.bw / 2 + 22, G.Y(140) + 9, C.goud, 'left', 28); ctx.restore(); } }
    term(ctx, 'allel 13', 1020, y + 16, R(t, q, 'allel', 0.5, 2), 'left', 56, C.goud); },

  // ================= H3 Profielen vergelijken =================
  s21(ctx, t, q) { schema(ctx);
    const v = R(t, q, 'vader', 0.5), m = R(t, q, 'moeder', 0.5);
    staafChrom(ctx, 300, 300, 330, CD.vader, ramp(t, 0.1, 0.5), 0.62); staafChrom(ctx, 300, 690, 330, CD.moeder, ramp(t, 0.1, 0.5), 0.62);
    metaText(ctx, 'chromosoom 8 · paar', 300, 100, C.grain, 'center', 28);
    naamBij(ctx, 'van je vader', null, 360, 200, v, 'left', C.text); naamBij(ctx, 'van je moeder', null, 360, 590, m, 'left', C.text);
    const r1 = strStuk(ctx, 560, 390, 13, { a: ramp(t, q.at('allelen') - 0.2, 0.5), blok: 50, h: 46, flankL: 110, flankR: 110 });
    const r2 = strStuk(ctx, 560, 780, 14, { a: ramp(t, q.at('allelen') - 0.2, 0.5), blok: 50, h: 46, flankL: 110, flankR: 110 });
    [[300, 300, 390], [300, 690, 780]].forEach(([cx, cy, sy]) => { const yb = cy - 165 + 0.62 * 330; ctx.save(); ctx.globalAlpha *= ramp(t, q.at('allelen') - 0.2, 0.5) * 0.8; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(325, yb - 6); ctx.lineTo(560, sy - 23); ctx.moveTo(325, yb + 6); ctx.lineTo(560, sy + 23); ctx.stroke(); ctx.restore(); });
    naamBij(ctx, 'allel 13', null, r1.x1 + 30, 402, R(t, q, 'allelen', 0.5), 'left', C.goud); naamBij(ctx, 'allel 14', null, r2.x1 + 30, 792, R(t, q, 'allelen', 0.5, 1, -0.3), 'left', C.goud); },
  s22(ctx, t, q) { schema(ctx);
    const het = [{ bp: 140, int: 0.95, kind: 'allele' }, { bp: 144, int: 0.95, kind: 'allele' }], hom = [{ bp: 140, int: 1.9, kind: 'allele' }];
    const a2 = R(t, q, 'gelijk', 0.5);
    const G1 = miniGel(ctx, 300, 200, 380, 620, [['h1', het, '13 en 14']], 156, 128, 1, 'het');
    const G2 = miniGel(ctx, 1100, 200, 380, 620, [['h2', hom, '13 en 13']], 156, 128, a2, 'hom');
    naamBij(ctx, 'twee banden', 'verschillend', 710, G1.Y(142) + 10, R(t, q, 'twee', 0.5), 'left');
    if (G2) naamBij(ctx, 'één band', 'extra fel', 1510, G2.Y(140) + 10, R(t, q, 'fel', 0.5), 'left', C.goud);
    metaText(ctx, 'd8s1179 · uitvergroot', 960, 900 - 40, C.grain, 'center', 28); },
  s23(ctx, t, q) { schema(ctx);
    const man = [{ bp: 106, int: 1, kind: 'allele' }, { bp: 112, int: 1, kind: 'allele' }], vr = [{ bp: 106, int: 2, kind: 'allele' }];
    const G1 = miniGel(ctx, 300, 200, 380, 620, [['m', man, 'man']], 118, 100, 1, 'man');
    const G2 = miniGel(ctx, 1100, 200, 380, 620, [['v', vr, 'vrouw']], 118, 100, 1, 'vrouw');
    naamBij(ctx, 'amelogenine', 'x en y', 960, 140, ramp(t, 0.1, 0.5), 'center');
    if (G1) { naamBij(ctx, 'Y', '112 bp', 710, G1.Y(112) + 10, R(t, q, 'Y', 0.4), 'left'); naamBij(ctx, 'X', '106 bp', 710, G1.Y(106) + 10, R(t, q, 'X', 0.4), 'left'); }
    if (G2) naamBij(ctx, 'alleen X', '106 bp', 1510, G2.Y(106) + 10, R(t, q, 'vrouw', 0.5), 'left'); },
  s24(ctx, t, q) { schema(ctx); const G = volleGel(ctx, { hl: ['Sp'] }); dimBanen(ctx, G, ['Sp', 'Eig', 'A', 'B', 'C'], 1);
    const p = clamp((t - q.at('lijn') + 0.2) / 1.6, 0, 1);
    SP_ALLEL.forEach((b, i) => gidsLijn(ctx, G.Y(b.bp), G.lx('Eig') - G.bw / 2 - 10, G.lx('C') + G.bw / 2 + 10, ramp(p, i / 12, 0.2), C.goud, 1));
    const d = R(t, q, 'dezelfde', 0.5); PROFILES && LANE_BANDS.A.filter(b => b.kind === 'allele').forEach(b => bandRing(ctx, G, 'A', b.bp, d * 0.9, C.groen, 4));
    naamBij(ctx, 'zelfde lijn', 'zelfde allel', G.lx('C') + G.bw / 2 + 20, G.Y(140) + 40, d, 'left', C.groen); },
  s25(ctx, t, q) { schema(ctx); const G = volleGel(ctx, { hl: ['Sp', 'B'] }); dimBanen(ctx, G, ['Sp', 'A', 'B'], 1);
    SP_ALLEL.forEach(b => gidsLijn(ctx, G.Y(b.bp), G.lx('Eig') - G.bw / 2 - 10, G.lx('C') + G.bw / 2 + 10, 1));
    ['A', 'B'].forEach(id => portret(ctx, VERDACHTE[id], G.lx(id), 70, 36, 1, id === 'B' ? C.koraal : C.line));
    const a = R(t, q, 'band', 0.5), bp = bpOf('TPOX', 11); bandRing(ctx, G, 'B', bp, a, C.koraal);
    naamBij(ctx, 'niet in het spoor', 'tpox · 80 bp', G.lx('C') + G.bw / 2 + 20, G.Y(bp) + 12, a, 'left', C.koraal);
    kruisje(ctx, G.lx('B') + 56, 56, 16, R(t, q, 'genoeg', 0.4));
    pil(ctx, 'niet van B', G.lx('B') + 86, 64, R(t, q, 'niet', 0.5, 2), C.koraal, 32, 'left'); },
  s26(ctx, t, q) { schema(ctx); const G = volleGel(ctx, { hl: ['Sp', 'A'] }); dimBanen(ctx, G, ['Sp', 'A'], 1);
    SP_ALLEL.forEach(b => gidsLijn(ctx, G.Y(b.bp), G.lx('Eig') - G.bw / 2 - 10, G.lx('C') + G.bw / 2 + 10, 0.9));
    ['A', 'B'].forEach(id => portret(ctx, VERDACHTE[id], G.lx(id), 70, 36, id === 'A' ? 1 : 0.35, id === 'A' ? C.groen : C.line));
    const allel = LANE_BANDS.A.filter(b => b.kind === 'allele').sort((a, b) => b.bp - a.bp);
    allel.forEach((b, i) => { const a = ramp(t, q.at('passen') + i * 0.18, 0.25); bandRing(ctx, G, 'A', b.bp, a, C.groen, 4); });
    pil(ctx, 'alle banden passen', G.lx('B') + 70, 64, R(t, q, 'elke', 0.5), C.groen, 32, 'left'); },
  s27(ctx, t, q) { schema(ctx);
    // profiel van A als streepjescode; in een menigte heeft toevallig nog iemand dezelfde code
    const code = SP_ALLEL.map(b => b.bp), bar = (x, y, w, h, a, col) => { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 8); shape(ctx, GELK.plaat, GELK.rand, 1.5); code.forEach(bp => { const f = Math.log(310 / bp) / Math.log(310 / 44); ctx.fillStyle = col; ctx.fillRect(x + 8 + f * (w - 16), y + 6, 3, h - 12); }); ctx.restore(); };
    portret(ctx, VERDACHTE.A, 260, 300, 90, 1, C.line); bar(150, 420, 220, 60, 1, `rgb(${GELK.band})`);
    naamBij(ctx, 'sterk bewijs', null, 160, 560, R(t, q, 'sterk', 0.5), 'left', C.groen);
    const m = R(t, q, 'ander', 0.6), h = R(t, q, 'toevallig', 0.6);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 14; c++) { const x = 640 + c * 82, y = 170 + r * 112, i = r * 14 + c, hit = i === 47;
      ctx.save(); ctx.globalAlpha *= m * (hit ? 1 : lerp(1, 0.45, h)); ctx.fillStyle = hit && h > 0.5 ? C.goud : C.mens; ctx.beginPath(); ctx.arc(x, y, 15, 0, 6.283); ctx.fill(); roundRect(ctx, x - 20, y + 20, 40, 52, 16); ctx.fill(); ctx.restore(); }
    if (h > 0.01) { bar(640 + 5 * 82 - 110, 170 + 3 * 112 + 86, 220, 52, h, `rgb(${GELK.band})`); }
    haak(ctx, 640, 640 + 13 * 82, 840, 'geen absoluut bewijs', C.koraal, R(t, q, 'absoluut', 0.5)); },
  s28(ctx, t, q) { schema(ctx);
    const rows = [['TPOX', '1 op 16'], ['+ D8S1179', '1 op 120'], ['+ vWA', '1 op 2 700'], ['+ D3S1358', '1 op 20 000']];
    metaText(ctx, 'kans dat een ander toevallig hetzelfde profiel heeft', 360, 170, C.grain, 'left', 28);
    rows.forEach(([n, p], i) => { const a = ramp(t, q.at('meer') - 0.2 + i * 0.45, 0.35), y = 270 + i * 95; if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      text(ctx, n, 360, y, fTekst(40, 600), C.text); text(ctx, p, 1300, y, fMeta(40), i === 3 ? C.goud : C.text, 'right');
      const w = 300 * Math.pow(0.42, i); ctx.fillStyle = rgba(C.goud, 0.8); roundRect(ctx, 1380, y - 28, Math.max(6, w), 30, 6); ctx.fill(); ctx.restore(); });
    metaText(ctx, '4 str’s in het practicum', 1380, 270 + 3 * 95 + 50, C.text2, 'left', 26);
    const l = R(t, q, 'twintig', 0.6); if (l > 0.01) { ctx.save(); ctx.globalAlpha *= l; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(360, 660); ctx.lineTo(1700, 660); ctx.stroke();
      text(ctx, 'meer dan 20 STR’s', 360, 740, fTekst(44, 700), C.groen); text(ctx, 'kleiner dan 1 op een miljard', 1700, 740, fTekst(44, 700), C.groen, 'right'); ctx.restore(); }
    metaText(ctx, 'kansen uit de allelfrequenties van het practicum', 360, 860, C.text2, 'left', 26); },

  // ================= H4 Controles en rare banden =================
  s29(ctx, t, q) { schema(ctx); const G = GLINKS; volleGel(ctx, { G, hl: ['NC'] }); const a = R(t, q, 'negatieve', 0.5); dimBanen(ctx, G, ['NC'], a); baanKader(ctx, G, 'NC', a);
    pcrBuisje(ctx, 1500, 230, 14, { vol: 25, a: R(t, q, 'water', 0.5) });
    naamBij(ctx, 'negatieve controle', 'water in plaats van dna', 1320, 560, R(t, q, 'water', 0.5), 'left');
    pil(ctx, 'hoort leeg te zijn', 1500, 700, R(t, q, 'geen', 0.5), C.groen, 32); },
  s30(ctx, t, q) { schema(ctx); const G = GLINKS; volleGel(ctx, { G, hl: ['NC'] }); dimBanen(ctx, G, ['NC'], 1); baanKader(ctx, G, 'NC', 1);
    const v = R(t, q, 'vlek', 0.5); bandRing(ctx, G, 'NC', 46, v, C.goud, 12);
    naamBij(ctx, 'vage vlek', '± 46 bp', 1320, G.Y(46) + 10, v, 'left');
    // twee primers die met hun uiteinden aan elkaar plakken
    const p = R(t, q, 'plakken', 0.8), y = 360; ctx.save(); ctx.globalAlpha *= R(t, q, 'primer', 0.5);
    const xa = lerp(1340, 1420, p), xb = lerp(1700, 1560, p);
    [[xa, y, 1], [xb, y + 30, -1]].forEach(([x, yy, dir]) => { ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 110, yy); ctx.lineTo(x + 110, yy); ctx.stroke();
      for (let i = 0; i < 9; i++) { const bx = x - 100 + i * 25; ctx.fillStyle = Object.values(DNA_BASE.base)[(i * (dir > 0 ? 1 : 3)) % 4]; ctx.fillRect(bx - 5, yy + (dir > 0 ? 3 : -17), 10, 14); } });
    ctx.restore(); naamBij(ctx, 'primer-dimeer', 'twee primers aan elkaar', 1320, 470, p, 'left', C.goud); },
  s31(ctx, t, q) { schema(ctx); const G = GLINKS; volleGel(ctx, { G, hl: ['NC'] });
    const b = R(t, q, 'echte', 0.4), wan = R(t, q, 'geen', 0.6);
    extraBand(ctx, G, 'NC', 176, 1.1, b); bandRing(ctx, G, 'NC', 176, b, C.koraal);
    naamBij(ctx, 'echte band', 'besmetting', 1320, G.Y(176) + 10, R(t, q, 'besmetting', 0.5), 'left', C.koraal);
    if (wan > 0.01) { ctx.save(); ctx.globalAlpha *= wan; ctx.fillStyle = 'rgba(26,39,64,0.55)'; ctx.fillRect(G.x, G.y, G.w, G.h); ctx.restore(); kruisje(ctx, G.x + G.w / 2, G.y + G.h / 2, 60, wan * 0.9); }
    pil(ctx, 'geen enkele band te vertrouwen', 1500, 700, wan, C.koraal, 30); },
  s32(ctx, t, q) { schema(ctx); const G = GLINKS; volleGel(ctx, { G, hl: ['PC'] }); const a = R(t, q, 'positieve', 0.5); dimBanen(ctx, G, ['PC'], a); baanKader(ctx, G, 'PC', a);
    naamBij(ctx, 'positieve controle', 'dna met een bekend profiel', 1320, 300, a, 'left');
    const bk = R(t, q, 'bekend', 0.5); const pc = LANE_BANDS.PC.filter(b => b.kind === 'allele');
    pc.forEach((b, i) => vink(ctx, G.lx('PC') + G.bw / 2 + 24, G.Y(b.bp), 10, ramp(t, q.at('banden') + i * 0.15, 0.25)));
    pil(ctx, 'PCR en gel werkten', 1520, 520, R(t, q, 'werkten', 0.5), C.groen, 32); },
  s33(ctx, t, q) { schema(ctx); const G = GLINKS; volleGel(ctx, { G, hl: ['PC', 'C'] });
    const l = R(t, q, 'leeg', 0.6), v = R(t, q, 'verdachte', 0.6);
    baanLeeg(ctx, G, 'PC', l); baanKader(ctx, G, 'PC', l, C.koraal); naamBij(ctx, 'positieve controle leeg', 'pcr of gel mislukt', 1320, 300, l, 'left', C.koraal);
    baanLeeg(ctx, G, 'C', v); baanKader(ctx, G, 'C', v, C.koraal);
    pil(ctx, 'lege baan zegt dan niets', 1520, 520, R(t, q, 'niets', 0.5), C.koraal, 30); },
  s34(ctx, t, q) { schema(ctx);
    const S = gelGeo({ x: 360, y: 150, w: 420, h: 700, lanes: ['Sp'], bpTop: 186, bpBot: 156, wellY: 30, yTop: 60, yBotPad: 40, bandFrac: 0.76, bandH: 18, padX: 20 });
    gelFoto(ctx, S, { key: 'stot' }); baanNamen(ctx, S, { naam: { Sp: 'spoor · vwa' } });
    const s = R(t, q, 'sterke', 0.5), z = R(t, q, 'zwak', 0.5), k = R(t, q, 'vier', 0.5);
    bandRing(ctx, S, 'Sp', 172, s, C.goud); bandRing(ctx, S, 'Sp', 168, z, C.goud, 6);
    naamBij(ctx, 'sterke band', '172 bp · allel 16', S.x + S.w + 30, S.Y(172) - 6, s, 'left'); naamBij(ctx, 'zwak bandje', '168 bp', S.x + S.w + 30, S.Y(168) + 46, z, 'left');
    vHaak(ctx, S.x + S.w + 8, S.Y(172), S.Y(168), k, C.goud);
    term(ctx, 'stotterband', 1320, 760, R(t, q, 'stotterband', 0.5), 'left', 56, C.goud);
    schaalTekst(ctx, 'uitvergroot'); },
  s35(ctx, t, q) { schema(ctx);
    // de mal heeft 16 herhalingen; bij het kopiëren lust er één uit de mal en slaat het polymerase hem over: de kopie heeft er 15 (4 bp korter)
    const B = 54, x0 = 220, fl = 100, yM = 330, yK = 420, sl = R(t, q, 'sloeg', 0.7), lus = 9;
    const p = clamp((t - 0.2) / Math.max(1, q.at('herhaling') + 0.8), 0, 1), front = x0 + 30 + p * (fl * 2 + 16 * B);
    metaText(ctx, 'mal · 16 herhalingen', x0, yM - 70, C.text2, 'left', 28);
    // mal: blok 9 krult als lus omhoog; de blokken erna schuiven één blok naar links (de kopie ‘ziet’ er 15)
    ctx.save(); const fla = (x, w, y) => { roundRect(ctx, x, y - 22, w, 44, 8); shape(ctx, '#3A4A66', LAB.lijn, 1.5); };
    fla(x0, fl, yM); for (let i = 0; i < 16; i++) { let x = x0 + fl + 4 + i * B, y = yM; if (i === lus) { y = yM - 60 * sl; x -= 0; } if (i > lus) x -= B * sl;
      roundRect(ctx, x, y - 19, B - 4, 38, 5); shape(ctx, i === lus ? rgba(C.goud, 0.95) : rgba(C.goud, 0.55), C.goud, 1.2); }
    fla(x0 + fl + 4 + 16 * B - B * sl, fl, yM);
    if (sl > 0.01) { ctx.globalAlpha *= sl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); const xl = x0 + fl + 4 + lus * B; ctx.moveTo(xl - 2, yM - 20); ctx.quadraticCurveTo(xl + B / 2, yM - 120, xl + B, yM - 20); ctx.stroke(); }
    ctx.restore();
    // kopie groeit onder de mal tot aan het polymerase
    metaText(ctx, 'kopie', x0, yK + 80, C.text2, 'left', 28);
    ctx.save(); ctx.beginPath(); ctx.rect(0, yK - 40, front, 80); ctx.clip(); strStuk(ctx, x0, yK, 15, { blok: B, h: 38, flankL: fl, flankR: fl }); ctx.restore();
    const ea = 1 - ramp(t, q.at('allel') - 0.3, 0.5); polymeraseAchter(ctx, front, (yM + yK) / 2, 34, { a: ea }); polymeraseVoor(ctx, front, (yM + yK) / 2, 34, { a: ea, sluit: 0.5 + 0.5 * Math.sin(t * 6) });
    naamBij(ctx, 'polymerase', null, Math.min(front + 70, 1700), yK + 90, R(t, q, 'polymerase') * ea, 'left');
    naamBij(ctx, 'één herhaling overgeslagen', 'kopie 15 · 4 bp korter', 900, 640, R(t, q, 'herhaling', 0.6), 'left', C.goud);
    pil(ctx, 'geen extra allel', 960, 800, R(t, q, 'extra', 0.5), C.koraal, 34); },
  s36(ctx, t, q) { schema(ctx);
    const MIX = { Eig: [{ bp: 200, int: 0.9, kind: 'allele' }, { bp: 208, int: 0.9, kind: 'allele' }], Mix: [{ bp: 200, int: 1.3, kind: 'allele' }, { bp: 204, int: 0.9, kind: 'allele' }, { bp: 208, int: 0.42, kind: 'allele' }], A: [{ bp: 200, int: 0.9, kind: 'allele' }, { bp: 204, int: 0.9, kind: 'allele' }] };
    const M = gelGeo({ x: 300, y: 170, w: 900, h: 680, lanes: ['Eig', 'Mix', 'A'], bpTop: 216, bpBot: 190, wellY: 30, yTop: 60, yBotPad: 40, bandFrac: 0.62, bandH: 16, padX: 20 });
    gelFoto(ctx, M, { key: 'mix', bands: MIX }); baanNamen(ctx, M, { naam: { Eig: 'eigenaar', Mix: 'ander spoor', A: 'A' } });
    metaText(ctx, 'd3s1358 · uitvergroot', 1240, 220, C.grain, 'left', 28);
    const d = R(t, q, 'twee', 0.5); MIX.Mix.forEach(b => bandRing(ctx, M, 'Mix', b.bp, d, C.goud, 6));
    naamBij(ctx, 'drie banden', 'meer dan twee', 1240, M.Y(204) + 10, d * (1 - R(t, q, 'eigenaar', 0.4)), 'left', C.goud);
    const p = R(t, q, 'personen', 0.5); gidsLijn(ctx, M.Y(204), M.lx('Mix') + M.bw / 2 + 8, M.lx('A') - M.bw / 2 - 8, p, C.groen);
    const e = R(t, q, 'eigenaar', 0.5); gidsLijn(ctx, M.Y(208), M.lx('Eig') + M.bw / 2 + 8, M.lx('Mix') - M.bw / 2 - 8, e, C.koraal);
    portret(ctx, VERDACHTE.Eig, 1440, 560, 80, e, C.koraal);
    naamBij(ctx, 'de eigenaar', 'raapte de scherven op', 1540, 560, e, 'left', C.text);
    // glasscherf
    if (e > 0.01) { ctx.save(); ctx.globalAlpha *= R(t, q, 'scherven', 0.5); ctx.beginPath(); ctx.moveTo(1400, 720); ctx.lineTo(1470, 690); ctx.lineTo(1500, 760); ctx.lineTo(1430, 790); ctx.closePath(); shape(ctx, rgba(C.teal, 0.25), LAB.lijn, 2); ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(1455, 742, 7, 0, 6.283); ctx.fill(); ctx.restore(); } },

  // ================= Samenvatting =================
  s37(ctx, t, q) { schema(ctx); samenKaarten(ctx, t, q, 1); },
  s38(ctx, t, q) { schema(ctx); samenKaarten(ctx, t, q, 2); },
});

// vier kaartjes; deel 1 (s37) bouwt 1–2 op, deel 2 (s38) 3–4
function samenKaarten(ctx, t, q, deel) {
  const K = [[120, 130, 'sorteren', 'hoe korter, hoe verder'], [1000, 130, 'aflezen', 'lengte → STR → allel'], [120, 520, 'controles', 'nc leeg · pc bekend'], [1000, 520, 'vergelijken', 'band voor band']];
  const a = deel === 1 ? [ramp(t, 0.1, 0.5), R(t, q, 'allel', 0.5)] : [1, 1];
  if (deel === 2) a.push(R(t, q, 'controles', 0.5), R(t, q, 'Vergelijk', 0.5)); else a.push(0, 0);
  K.forEach(([x, y, tt, s], i) => { const al = a[i]; if (al < 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x, y, 800, 340, 14); shape(ctx, '#22314C', C.line, 1);
    text(ctx, tt, x + 32, y + 62, fTekst(44, 700), C.goud); metaText(ctx, s, x + 32, y + 110, C.grain, 'left', 26);
    const gx = x + 470, gy = y + 40;
    if (i === 0) { roundRect(ctx, gx, gy, 90, 270, 8); shape(ctx, GELK.plaat, GELK.rand, 1.5); [[300, 40], [140, 30], [60, 22]].forEach(([bp, l]) => { const yy = gy + 30 + Math.log(400 / bp) / Math.log(400 / 40) * 220; gelBand(ctx, gx + 45, yy, 64, 7, 1, 'allele'); dnaStuk(ctx, gx + 150 + l, yy, l * 1.6, { w: 6, min: false }); }); }
    if (i === 1) { text(ctx, '140 bp', x + 40, y + 210, fMeta(40), C.text); text(ctx, '→ D8S1179', x + 40, y + 260, fTekst(36, 600), C.text); text(ctx, '→ allel 13', x + 40, y + 310, fTekst(40, 700), C.goud); }
    if (i === 2) { const G = gelGeo({ x: gx, y: gy, w: 220, h: 270, lanes: ['PC', 'NC'], bpTop: 310, bpBot: 44, wellY: 22, yTop: 40, yBotPad: 16, bandH: 5, padX: 10 }); gelFoto(ctx, G, { key: 'kc' }); baanNamen(ctx, G, {}); }
    if (i === 3) { const G = gelGeo({ x: gx, y: gy, w: 220, h: 270, lanes: ['Sp', 'A'], bpTop: 310, bpBot: 44, wellY: 22, yTop: 40, yBotPad: 16, bandH: 5, padX: 10 }); gelFoto(ctx, G, { key: 'kv' }); baanNamen(ctx, G, {}); SP_ALLEL.forEach(b => gidsLijn(ctx, G.Y(b.bp), G.x + 6, G.x + G.w - 6, 0.7, C.goud)); }
    ctx.restore(); });
}

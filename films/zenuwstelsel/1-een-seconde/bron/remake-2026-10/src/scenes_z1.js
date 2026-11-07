// ===== scenes_z1.js — Zenuwstelsel 1 'Eén seconde', lichte remake 29 okt 2026 (prompt v13, Part C) =====
// Eén functie per gesproken alinea (zelfde id's als de takes). Cues via q.at(woord, n) / q.on(woord, n, duur) op de woordtijden van de take.
const G1 = 830; // grond van de straat
function fietsX(t) { const v = 170, tb = 2.75, d = Math.max(0, t - tb); return t < tb ? 330 + v * t : 330 + v * tb + v * (Math.min(d, 0.9) - Math.min(d, 0.9) ** 2 / 1.8); }
function kaartStd(ctx, t, o = {}) { return lichaamKaart(ctx, o.cx || 470, o.yb || 1000, o.h || 820, o); }
// lichaamskaart op de standaardplek met de hersenen in een zoomcirkel rechts naast het hoofd
function kaartMetBrein(ctx, t, o = {}) { const P = kaartStd(ctx, t, o); const hz = [P.hoofd.x + 410, P.hoofd.y + 90]; const Z = breinZoom(ctx, hz[0], hz[1], 175, P.hoofd.x + P.hoofd.r * 0.9, P.hoofd.y, o.brA == null ? 1 : o.brA, { binnen: o.binnen });
  return { P, Z }; }

Object.assign(SCENES, {
  // ---------- titelkaart: rechts de fietser van voren met zijn zenuwstelsel ----------
  title(ctx, t) { const P = lichaamKaart(ctx, 1450, 1010, 780, { zen: 1 }); if (P) { const u = (t * 0.45) % 1.3; zVuur(ctx, P.merg, u * 1.6, 0.9, 7); zVuur(ctx, P.armR, (u - 0.5) * 1.6, 0.9, 5); } },

  // ---------- Cold open (Macro, straat 's avonds) ----------
  s00(ctx, t, q) { straat(ctx, G1);
    const tBal = q.at('bal'), tKnijp = q.at('knijpen'), tKind = q.at('kind'), tWeet = q.at('weet');
    // kind (Teun) komt van de overkant van de stoep aangelopen en blijft staan
    const kStart = tKind - 0.9, kd = clamp(t - kStart, 0, 1.6); if (t > kStart) { const kx = 1560 - 70 * kd; persoon(ctx, 'kind', kx, 742, 270, kd < 1.6 ? { zij: true, kijk: -1, gang: 'loop', t: kd } : { zij: true, kijk: -1, uit: 'blij' }); }
    // bal rolt de straat op
    if (t > tBal - 0.3) { const u = ease((t - tBal + 0.3) / 1.6); const bx = lerp(1400, 1250, u), by = lerp(726, G1 - 24, u) - Math.abs(Math.sin(u * 7)) * 18 * (1 - u); bal(ctx, bx, by, 24, -u * 9); }
    const x = fietsX(t), knijp = ramp(t, tKnijp - 0.05, 0.25), schrik = t > tKind + 0.2;
    fietsMetFietser(ctx, x, G1, 440, { draai: (x - 330) / 83, knijp, uit: schrik ? 'verbaasd' : 'neutraal' });
    vraagteken(ctx, x + 120, 330, q.on('weet', 1, 0.4), 120);
    tijdbalk(ctx, 0, q.on('seconde', 1, 0.5), { label: 'één seconde' }); },

  // ---------- Hoofdstuk 1 · De kaart ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const cz = q.on('hersenen', 1, 0.3) * UIT(t, q.at('perifere') - 0.2, 0.4) + q.on('centrale', 1, 0.3) * UIT(t, q.at('perifere') - 0.2, 0.4);
    const per = q.on('perifere', 1, 0.3), zen = q.on('zenuwstelsel', 1, 0.8);
    const { P, Z } = kaartMetBrein(ctx, t, { zen, cz: cz > 0.5 ? 1 : 0, per: per > 0.5 ? 1 : 0, hartA: q.on('hart', 1, 0.4), beat: t * 7, brA: q.on('hersenen', 1, 0.5),
      binnen: (B, s) => { if (cz > 0.5) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(...B(-30, -110), 270 * s, 175 * s, -0.1, 0, 6.283); ctx.stroke(); ctx.restore(); } } });
    naamBij(ctx, 'hersenen', null, Z.zx + Z.zr + 20, Z.zy - 40, q.on('hersenen', 1, 0.4), 'left', cz > 0.5 ? C.goud : C.text);
    naamBij(ctx, 'ruggenmerg', null, P.hoofd.x - 150, P.merg[Math.floor(P.merg.length * 0.55)][1], q.on('ruggenmerg', 1, 0.4), 'right', cz > 0.5 ? C.goud : C.text);
    naamBij(ctx, 'centraal zenuwstelsel', 'hersenen + ruggenmerg', 1060, 640, q.on('centrale', 1, 0.4), 'left', C.goud);
    naamBij(ctx, 'perifeer zenuwstelsel', 'alle zenuwen daarbuiten', 1060, 760, per, 'left', C.goud);
    if (per > 0.01) { ring(ctx, P.oog[0], P.oog[1], 20, q.on('ogen', 1, 0.3), C.goud); const h = zAt(P.armR, 0.88); ring(ctx, h[0], h[1], 34, q.on('armen', 1, 0.3), C.goud); ring(ctx, P.hartP[0], P.hartP[1], 40, q.on('hart', 1, 0.3), C.goud); }
    tijdbalk(ctx, 0, ramp(t, 0, 0.4), { label: 'de tijd staat stil' }); },
  q1(ctx, t, q) { vraagVoor(ctx, t, q, 'v1', [['lange'], ['bundel'], ['buisje']]); },
  a1(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('neuron'), tImp = q.at('impulsen');
    const kA = 1; const P = kaartStd(ctx, t, { zen: 1, cx: 330, h: 760, yb: 990 });
    const zp = zAt(P.armR, 0.6); const zA = ramp(t, 0, 0.5) * (1 - 0.7 * ramp(t, tImp - 0.3, 0.5));
    zoomCircle(ctx, 900, 420, 250, zp[0], zp[1], 'zenuw in de arm · doorsnede', zA, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(650, 170, 500, 500); zenuwDoorsnede(ctx, 900, 420, 220, { hl: q.on('neuron', 1, 0.4) }); });
    naamBij(ctx, 'bundel', 'vol uitlopers van zenuwcellen', 1180, 300, q.on('bundel', 1, 0.4) * zA * UIT(t, tImp - 0.3, 0.4), 'left', C.goud);
    // één uitloper hoort bij één neuron
    const nA = q.on('neuron', 1, 0.6) * UIT(t, tImp - 0.3, 0.5); if (nA > 0.01) { zenuwcel(ctx, 1290, 560, { a: nA, s: 0.7, col: Z1.zenuw, naar: [1820, 600], myeline: true, takken: 6, t }); naamBij(ctx, 'neuron', 'één zenuwcel', 1290, 740, nA, 'center', C.goud); }
    // impulsen: eerst naar binnen (hand → ruggenmerg), dan naar buiten (ruggenmerg → hand)
    const iA = ramp(t, tImp - 0.3, 0.5); if (iA > 0.01) { const tin = q.at('binnen'), tuit = q.at('buiten');
      const inP = P.armL.slice().reverse(), uitP = P.armR; zVuur(ctx, inP, (t - tin + 0.3) / 1.2, iA, 6); if (t > tin) zVuur(ctx, P.merg.slice(0, 18).reverse(), (t - tin - 0.9) / 0.6, iA, 8, false);
      zVuur(ctx, uitP, (t - tuit + 0.2) / 1.1, iA, 6);
      const hl = zAt(P.armL, 0.97), hr = zAt(P.armR, 0.97); tag(ctx, 'naar binnen', 1450, 500, C.teal, q.on('binnen', 1, 0.4), 'center', 36); tag(ctx, 'naar buiten', 1450, 600, C.teal, q.on('buiten', 1, 0.4), 'center', 36);
      naamBij(ctx, 'impuls', 'signaal door een neuron', 1450, 380, iA, 'center', C.teal); } },

  // ---------- Hoofdstuk 2 · De prikkel ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const O = [620, 420], r = 170; const oA = ramp(t, 0, 0.5);
    const bx = 140 + 30 * Math.sin(t * 0.8); bal(ctx, bx, 430, 46, t * 1.5);
    lichtStralen(ctx, [bx + 40, 430], O, r, t, q.on('Licht', 1, 0.5));
    const E = oogDoorsnede(ctx, O[0], O[1], r, { a: oA, netvlies: q.on('netvlies', 1, 0.3) });
    naamBij(ctx, 'netvlies', null, O[0] + r + 10, O[1] - r * 0.8, q.on('netvlies', 1, 0.4), 'left', C.goud);
    const zA = q.on('receptoren', 1, 0.6); zoomCircle(ctx, 1380, 430, 300, E.netvlies[0], E.netvlies[1], 'netvlies · vergroot', zA, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1080, 130, 600, 600);
      netvliesZoom(ctx, 1340, 470, 420, { licht: q.on('licht', 2, 0.4), imp: (t - q.at('impuls') + 0.2) / 1.6, hl: t > q.at('receptor') ? 3 : -1, t }); });
    naamBij(ctx, 'receptoren', 'reageren op licht', 1380, 820, zA * UIT(t, q.at('prikkel') - 0.2, 0.4), 'center', C.text);
    naamBij(ctx, 'prikkel', 'komt van buiten', 1160, 210, q.on('prikkel', 1, 0.4), 'center', '#F2E6B8');
    naamBij(ctx, 'impuls', 'signaal in het neuron', 1560, 700, q.on('impuls', 1, 0.4), 'center', C.teal);
    haak(ctx, 1110, 1650, 760, 'prikkel ≠ impuls', C.goud, q.on('verschil', 1, 0.5) * UIT(t, q.at('prikkel', 2) - 0.4, 0.4)); },
  q2(ctx, t, q) { vraagVoor(ctx, t, q, 'v2', [['Door'], ['receptor'], ['raakt']]); },
  a2(ctx, t, q) { bg(ctx, 'schema'); const tDr = q.at('Een', 1) > 11 ? q.at('Een', 1) : q.at('reageert') - 0.6, tOog = q.at('verlaat') - 0.4;
    // deel 1: drie receptoren, drie prikkels, hetzelfde signaal, verschillende plek in de hersenen
    const d1 = UIT(t, tDr, 0.5); if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; const rijen = [['licht', 'oog', 'zien', 'Licht'], ['trillingen', 'oor', 'horen', 'trillingen'], ['druk', 'huid', 'voelen', 'druk']];
      rijen.forEach(([pr, org, erv, w], i) => { const y = 270 + i * 190, a = q.on(w, 1, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
        tag(ctx, pr, 230, y + 14, '#F2E6B8', 1, 'center', 34); naamBij(ctx, org, 'receptor', 440, y + 10, 1, 'left');
        const P = [[600, y], [1250, y]]; zLijn(ctx, P, Z1.zenuw, 5); const ia = q.on('hetzelfde', 1, 0.3); if (ia > 0) for (let k = 0; k < 4; k++) { const u = ((t * 0.9 + k * 0.25) % 1); const xx = lerp(600, 1250, u); dot(ctx, xx, y, 9, C.teal, '#BFE0F0', 2); }
        const ea = q.on('aankomt', 1, 0.4); naamBij(ctx, erv, 'deel van de hersenen', 1290, y + 10, Math.max(0.0001, ea), 'left', C.goud); ctx.restore(); });
      haak(ctx, 600, 1250, 790, 'overal hetzelfde signaal', C.teal, q.on('hetzelfde', 1, 0.5) * UIT(t, q.at('Wat') - 0.2, 0.4)); ctx.restore(); }
    // deel 2: drempelwaarde, drie prikkels, alleen de sterkste geeft een impuls
    const d2 = ramp(t, tDr, 0.5) * UIT(t, tOog, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2; const x0 = 260, x1 = 1660, y0 = 740, yD = 470;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, 240); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); metaText(ctx, 'sterkte van de prikkel', x0, 220, C.text2, 'left', 26); metaText(ctx, 'tijd', x1, y0 + 40, C.text2, 'right', 26);
      ctx.strokeStyle = C.goud; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(x0, yD); ctx.lineTo(x1, yD); ctx.stroke(); ctx.setLineDash([]);
      naamBij(ctx, 'drempelwaarde', null, x1, yD - 20, q.on('drempelwaarde', 1, 0.4), 'right', C.goud);
      const pr = [[500, 620], [880, 520], [1260, 330]], ts = q.at('reageert'); pr.forEach(([px, py], i) => { const a = ramp(t, ts + i * 0.7, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, px - 40, py, 80, y0 - py, 10); shape(ctx, rgba('#F2E6B8', 0.3), '#F2E6B8', 2);
        const boven = py < yD; text(ctx, boven ? 'impuls' : 'geen impuls', px, py - 22, fTekst(32, 700), boven ? C.teal : C.text2, 'center'); if (boven) { for (let k = 0; k < 4; k++) { const xx = px + 70 + k * 46; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xx, y0 - 10); ctx.lineTo(xx, y0 - 110); ctx.stroke(); } } ctx.restore(); }); ctx.restore(); }
    // deel 3: oogzenuw, sensorische zenuw naar de hersenen, tijdbalk 100 ms
    const d3 = ramp(t, tOog, 0.5); if (d3 > 0.01) { ctx.save(); ctx.globalAlpha *= d3; const Z = breinZoom(ctx, 860, 470, 300, 860, 470, 1, { caption: 'hoofd in doorsnede',
        binnen: (B, s) => { const P = zGlad([B(200, 20), B(120, 10), B(20, -20), B(-120, -60), B(-240, -90)]); zLijn(ctx, P, Z1.zenuw, 6); zVuur(ctx, P, (t - q.at('oogzenuw')) / 1.2 + (t > q.at('honderd') ? 1 : 0), 1, 6); } });
      naamBij(ctx, 'oogzenuw', 'sensorische zenuw: naar het CZS', 1180, 520, q.on('oogzenuw', 1, 0.4), 'left', C.teal);
      ctx.restore(); }
    const ms = t < q.at('honderd') - 0.6 ? 0 : 100 * ease((t - q.at('honderd') + 0.6) / 1.0); tijdbalk(ctx, ms, q.on('tijdbalk', 1, 0.4), { marks: [[100, 'in de hersenen', C.teal, q.on('honderd', 1, 0.4)]] }); },

  // ---------- Hoofdstuk 3 · Remmen: via de hersenen ----------
  q3(ctx, t, q) { vraagVoor(ctx, t, q, 'v3', [['ruggenmerg'], ['hersenen', 2], ['nergens']]); },
  a3(ctx, t, q) { bg(ctx, 'schema'); const tNieuw = q.at('nieuwe'), tBen = q.at('beneden'), tMot = q.at('motorische'), tKn = q.at('knijpt'), tSn = q.at('Toch');
    const fase1 = UIT(t, tSn - 0.3, 0.5);
    if (fase1 > 0.01) { ctx.save(); ctx.globalAlpha *= fase1;
      const { P, Z } = kaartMetBrein(ctx, t, { zen: 1, binnen: (B, s) => { const oogP = zGlad([B(200, 20), B(120, 10), B(20, -20), B(-120, -60), B(-240, -90)]); zLijn(ctx, oogP, Z1.zenuw, 5); zVuur(ctx, oogP, 1, 1, 5, false);
        const vw = q.on('verwerkt', 1, 0.4); if (vw > 0.01) { ctx.save(); ctx.globalAlpha *= vw; dot(ctx, ...B(-240, -90), 30 * s / 0.48, rgba(C.goud, 0.35), C.goud, 2); ctx.restore(); }
        const mP = zGlad([B(-30, -250), B(-20, -60), B(-40, 120), B(-40, 360)]); zLijn(ctx, mP, Z1.zenuw, 7); zVuur(ctx, mP, (t - tNieuw) / 1.2, 1, 7); } });
      naamBij(ctx, 'beeld verwerkt', 'er rolt iets op de weg', Z.zx, Z.zy - Z.zr - 30, q.on('verwerkt', 1, 0.4) * UIT(t, tNieuw, 0.4), 'center', C.goud);
      // naar beneden door het ruggenmerg, dan via de motorische zenuw naar de hand
      const mergU = (t - tBen) / 1.0, armU = (t - tMot + 0.3) / 1.4; zVuur(ctx, P.merg.slice(0, 22), mergU, 1, 10, armU < 0); zVuur(ctx, P.armR, armU, 1, 6);
      naamBij(ctx, 'motorische zenuw', 'naar een spier of een klier', zAt(P.armR, 0.55)[0] + 50, zAt(P.armR, 0.55)[1], q.on('Motorisch', 1, 0.4) * UIT(t, tKn + 0.4, 0.4), 'left', C.teal);
      const sp = zAt(P.armR, 0.78); ring(ctx, sp[0], sp[1], 46, q.on('onderarmen', 1, 0.3), C.koraal); naamBij(ctx, 'spieren onderarm', 'trekken samen', sp[0] + 60, sp[1] + 10, q.on('onderarmen', 1, 0.4) * UIT(t, q.at('reflex') - 0.2, 0.4), 'left', C.koraal);
      // inzet: hand knijpt in de remhendel
      const kA = q.on('knijpt', 1, 0.4); if (kA > 0.01) { ctx.save(); ctx.globalAlpha *= kA * UIT(t, tSn - 0.6, 0.4); roundRect(ctx, 1340, 520, 480, 300, 18); shape(ctx, rgba(C.kast, 0.85), rgba(C.line, 0.4), 1.2);
        fietsMetFietser(ctx, 1460, 760, 300, { knijp: ramp(t, tKn, 0.3) }); ctx.restore(); }
      tag(ctx, 'geen reflex: via de hersenen', 1160, 880 - 40, C.goud, q.on('geen', 1, 0.4) * UIT(t, tSn - 0.4, 0.4), 'center', 36); ctx.restore(); }
    // fase 2: hoe snel? tijdbalk groot in beeld
    const f2 = ramp(t, tSn - 0.2, 0.5); if (f2 > 0.01) { ctx.save(); ctx.globalAlpha *= f2; const x0 = 200, x1 = 1720, y = 470, X = v => lerp(x0, x1, v / 1200);
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      for (const v of [0, 200, 400, 600, 800, 1000, 1200]) { ctx.beginPath(); ctx.moveTo(X(v), y - 10); ctx.lineTo(X(v), y + 10); ctx.stroke(); metaText(ctx, v === 0 ? '0' : (v / 1000).toFixed(1).replace('.', ',') + ' s', X(v), y + 50, C.text2, 'center', 28); }
      metaText(ctx, 'van bal tot knijpen', x0, y - 140, C.grain, 'left', 28);
      const a1 = q.on('tweehonderd', 1, 0.4), v1 = 200 * ease((t - q.at('tweehonderd') + 0.3) / 0.9); if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.goud; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(X(v1), y); ctx.stroke(); dot(ctx, X(v1), y, 14, C.goud, '#F5DE9A', 2);
        naamBij(ctx, '± 0,2 s', 'als je erop bedacht bent', X(200), y - 50, 1, 'center', C.goud); ctx.restore(); }
      regel(ctx, 'een vijfde seconde', X(200), y + 130, q.on('vijfde', 1, 0.4), C.goud, 36, 'center'); 
      const a2 = q.on('onverwacht', 1, 0.4); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; const v2 = lerp(200, 1000, ease((t - q.at('onverwacht')) / 1.2)); ctx.strokeStyle = C.text2; ctx.setLineDash([14, 10]); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(200), y); ctx.lineTo(X(v2), y); ctx.stroke(); ctx.setLineDash([]); dot(ctx, X(v2), y, 12, C.text2);
        naamBij(ctx, '± 1 s', 'bal echt onverwacht', X(1000), y - 50, ramp(t, q.at('onverwacht') + 0.8, 0.4), 'center', C.text); ctx.restore(); }
      tag(ctx, 'geoefend: honderden keren', 760, 780, C.groen, q.on('geoefend', 1, 0.4), 'center', 36); tag(ctx, 'bewust beslissen: pas later', 1360, 780, C.text2, q.on('bewust', 1, 0.4), 'center', 36);
      ctx.restore(); }
    // de tijdbalk rechtsboven loopt mee tot 0,2 s
    const ms = t < tSn ? lerp(100, 200, ease((t - tKn + 0.3) / 0.6)) : 200; tijdbalk(ctx, ms, fase1, { marks: [[100, '', C.teal, 1]] }); },

  // ---------- Hoofdstuk 4 · De reflex ----------
  q4(ctx, t, q) { vraagVoor(ctx, t, q, 'v4', [['voelt'], ['trekt', 2], ['allebei']]); },
  a4(ctx, t, q) { bg(ctx, 'schema'); const tSlaat = q.at('slaat'), tRec = q.at('Receptoren'), tKnie = q.at('kniepeesreflex'), tAan = q.at('aangeboren');
    // deel 1: de bal stuitert tegen de vingers, de hand schiet terug (fietser in zijaanzicht, geen straat: schema)
    const d1 = UIT(t, tRec - 0.3, 0.5); if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 840); ctx.lineTo(1760, 840); ctx.stroke();
      const trek = ramp(t, tSlaat + 0.25, 0.25); const R = fietsMetFietser(ctx, 760, 840, 520, { trek, uit: t > q.at('voelt') ? 'verbaasd' : 'neutraal' });
      const hx = R.stuur[0], hy = R.stuur[1]; let bx, by; if (t < tSlaat) { const u = clamp((t - tSlaat + 1.0) / 1.0, 0, 1); bx = lerp(1550, hx + 26, ease(u)); by = lerp(815, hy - 6, u) - Math.sin(u * Math.PI) * 160; }
      else { const d = t - tSlaat; bx = hx + 26 + 320 * d; by = hy - 6 - 260 * d + 900 * d * d; }
      if (t > tSlaat - 1.0 && by < 815) bal(ctx, bx, by, 26, t * 4);
      naamBij(ctx, 'eerst: hand terug', null, hx + 40, 300, q.on('terug', 1, 0.4), 'left', C.teal); naamBij(ctx, 'daarna: voelen', null, hx + 40, 380, q.on('voelt', 1, 0.4), 'left', C.text2);
      tag(ctx, 'wél een reflex', 1300, 520, C.goud, q.on('wél', 1, 0.4), 'center', 40); ctx.restore(); }
    // deel 2: de reflexboog (ruggenmerg in doorsnede + arm)
    const d2 = ramp(t, tRec - 0.3, 0.5) * UIT(t, tKnie - 0.3, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2;
      const M = ruggenmergDoorsnede(ctx, 420, 470, 1.25, {}); metaText(ctx, 'ruggenmerg · doorsnede', 420, 700, C.grain, 'center', 26);
      const eTrek = ramp(t, q.at('effector') - 0.2, 0.5) * 0.7; const A = armAnatomie(ctx, 1330, 150, 10, { u: 0.06, e: 1.15 + eTrek, huid: 1, hl: { biceps: q.on('effector', 1, 0.3) } });
      const sch = A.schouder || [1330, 160], hand = A.hand, bic = A.biceps || A.bicepsPees;
      // sensorisch neuron: receptor in de vingertop → arm → ganglion → achterhoorn
      const sens = zGlad([hand, A.elleboog ? [A.elleboog[0] + 30, A.elleboog[1] + 10] : hand, [sch[0] - 20, sch[1] + 70], [M.zenuw[0] + 60, M.zenuw[1] - 12], [M.zenuw[0], M.zenuw[1] - 10]]).concat(M.achP.slice().reverse().slice(0)).concat([M.achterhoorn]);
      const schak = zGlad([M.achterhoorn, M.midden, M.voorhoorn]);
      const mot = [M.voorhoorn].concat(M.vooP).concat(zGlad([[M.zenuw[0] + 60, M.zenuw[1] + 12], [sch[0] - 30, sch[1] + 90], bic]));
      const tS = q.at('sensorisch'), tSch = q.at('schakelneuron'), tM = q.at('motorisch'), tSp = q.at('spieren');
      const sA = q.on('sensorisch', 1, 0.4), schA = q.on('schakelneuron', 1, 0.4), mA = q.on('motorisch', 1, 0.4);
      zLijn(ctx, sens, Z1.zenuw, 5, sA); zLijn(ctx, schak, Z1.zenuw, 5, schA); zLijn(ctx, mot, Z1.zenuw, 5, mA);
      if (schA > 0.01) dot(ctx, M.midden[0], M.midden[1], 11, Z1.cel, Z1.zenuw, 2); if (mA > 0.01) dot(ctx, M.voorhoorn[0], M.voorhoorn[1], 14, Z1.cel, Z1.zenuw, 2);
      // impulsen op de cuewoorden; bij de opsomming loopt de hele boog nog een keer
      const herh = q.at('Receptor', 2); const s2 = t > herh ? (t - herh) / 1.4 : -1;
      zVuur(ctx, sens, t > herh ? s2 : (t - tS + 0.6) / 1.8, 1, 5); zVuur(ctx, schak, t > herh ? s2 * 1.4 - 1.4 : (t - tSch) / 0.5, 1, 5); zVuur(ctx, mot, t > herh ? (t - herh - 1.8) / 1.5 : (t - tM) / 1.8, 1, 5);
      ring(ctx, hand[0], hand[1], 40, q.on('Receptoren', 1, 0.3) * UIT(t, tS, 0.4), C.goud);
      naamBij(ctx, 'receptor', 'in de huid', hand[0] - 40, hand[1] + 90, q.on('Receptoren', 1, 0.4), 'center');
      naamBij(ctx, 'sensorisch neuron', null, M.ganglion[0] + 40, M.ganglion[1] - 60, sA, 'left', C.text);
      naamBij(ctx, 'schakelneuron', null, M.midden[0] - 40, M.midden[1] - 230, schA, 'center', C.text);
      naamBij(ctx, 'motorisch neuron', null, M.vooP[6][0] + 20, M.vooP[6][1] + 70, mA, 'left', C.text);
      if (bic) naamBij(ctx, 'effector', 'de spier reageert', bic[0] - 110, bic[1] - 20, q.on('effector', 1, 0.4), 'right', C.koraal);
      // reflexboog als rij van vijf, hersenen er niet tussen, pas daarna omhoog
      const rij = ['receptor', 'sensorisch neuron', 'schakelneuron', 'motorisch neuron', 'effector'], rw = ['Receptor', 'sensorisch', 'schakelneuron', 'motorisch', 'effector'], rn = [2, 2, 2, 2, 2];
      rij.forEach((s, i) => { const a = q.on(rw[i], rn[i], 0.3); const x = 180 + i * 330; tag(ctx, s, x + 120, 820, i === 0 || i === 4 ? C.goud : C.teal, a, 'center', 30); if (i < 4 && a > 0.01) { ctx.save(); ctx.globalAlpha *= a; pijl(ctx, x + 250, 802, x + 290, 802, C.line, 1, 3, 12); ctx.restore(); } });
      const om = q.on('omhoog', 1, 0.4); if (om > 0.01) { const up = zGlad([M.achterhoorn, [M.achterhoorn[0] - 60, M.achterhoorn[1] - 120], [M.achterhoorn[0] - 80, 120]]); zLijn(ctx, up, Z1.zenuw, 5, om); zVuur(ctx, up, (t - q.at('omhoog')) / 0.9, om, 5); naamBij(ctx, 'naar de hersenen: pas nu voel je het', null, M.achterhoorn[0] - 40, 110, om, 'left', C.text); }
      kruis(ctx, 230, 150, 26, q.on('niet', 1, 0.3) * UIT(t, q.at('omhoog'), 0.4)); naamBij(ctx, 'hersenen zitten er niet tussen', null, 280, 165, q.on('niet', 1, 0.3) * UIT(t, q.at('omhoog'), 0.4), 'left', C.koraal);
      ctx.restore(); }
    // deel 3: kniepeesreflex (18 ms, geen schakelneuron) en de kenmerken van een reflex
    const d3 = ramp(t, tKnie - 0.3, 0.5); if (d3 > 0.01) { ctx.save(); ctx.globalAlpha *= d3; const tik = q.at('dokter'); const zw = t > tik + 0.15 ? Math.max(0, Math.sin(Math.min(Math.PI, (t - tik - 0.15) * 6))) : 0;
      const K = beenKnie(ctx, 760, 360, 1, zw); const hamAn = t < tik ? lerp(-0.7, 0, ease((t - tik + 0.6) / 0.6)) : -0.2 * ramp(t, tik, 0.3); hamertje(ctx, K.pees[0] + 18, K.pees[1] + 4, 1, hamAn - 0.2);
      naamBij(ctx, 'kniepeesreflex', null, 980, 230, 1, 'left', C.goud); text(ctx, '18 ms', 1000, 360, fTitel(96), C.teal, 'left'); naamBij(ctx, 'geen schakelneuron', 'één schakelpunt: sensorisch → motorisch', 1000, 450, q.on('schakelneuron', 2, 0.4), 'left', C.text);
      const kk = [['aangeboren', 'aangeboren'], ['altijd hetzelfde', 'altijd'], ['nauwelijks tegen te houden', 'nauwelijks']]; kk.forEach(([s, w], i) => tag(ctx, s, 380 + i * 560, 760, C.groen, q.on(w, 1, 0.4), 'center', 36));
      haak(ctx, 160, 1760, 790, 'precies wat je wilt bij gevaar', C.groen, q.on('gevaar', 1, 0.5)); ctx.restore(); } },

  // ---------- Hoofdstuk 5 · Gas en rem ----------
  s51(ctx, t, q) { bg(ctx, 'schema'); const tAut = q.at('autonome') - 0.3, tBeide = q.at('Beide') - 0.3;
    const d1 = UIT(t, tAut, 0.5); if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; const p1 = q.on('hart', 1, 0.4), p2 = q.on('klam', 1, 0.4), p3 = q.on('pupillen', 1, 0.4);
      ctx.save(); ctx.globalAlpha *= p1; hartDoorsnede(ctx, 400, 470, 0.55, { u: (t * 2.3) % 1 }); naamBij(ctx, 'hart bonkt', null, 400, 760, 1, 'center', C.koraal); ctx.restore();
      ctx.save(); ctx.globalAlpha *= p2; handKlam(ctx, 960, 500, 1.6, ramp(t, q.at('klam'), 1.2)); naamBij(ctx, 'handen klam', null, 960, 760, 1, 'center'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= p3; oogVoor(ctx, 1520, 470, 110, lerp(0.3, 0.55, ramp(t, q.at('groter'), 1.0))); naamBij(ctx, 'pupil groter', null, 1520, 760, 1, 'center'); ctx.restore();
      tag(ctx, 'niet besloten', 960, 230, C.text2, q.on('besloten', 1, 0.4), 'center', 40); ctx.restore(); }
    const d2 = ramp(t, tAut, 0.5) * UIT(t, tBeide, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2;
      naamBij(ctx, 'autonoom zenuwstelsel', 'regelt je organen · onbewust', 960, 220, q.on('autonome', 1, 0.4), 'center', C.goud);
      const kol = [[520, 'sympathisch', 'klaar voor actie', C.koraal, 'sympathische', [['hart sneller', 'hart'], ['pupil wijder', 'pupil'], ['ademhaling dieper', 'ademhaling']]], [1400, 'parasympathisch', 'rust', C.groen, 'parasympathische', [['rust', 'rust'], ['verteren', 'verteren'], ['herstellen', 'herstellen']]]];
      for (const [x, n, sub, col, w, items] of kol) { const a = q.on(w, 1, 0.4); if (a <= 0.01) continue; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 300, 300, 600, 500, 18); shape(ctx, rgba(col, 0.1), col, 1.5); naamBij(ctx, n, sub, x, 370, 1, 'center', col);
        items.forEach(([s, ww], i) => tag(ctx, s, x, 510 + i * 100, col, q.on(ww, w === 'sympathische' ? 1 : 1, 0.4), 'center', 36)); ctx.restore(); } ctx.restore(); }
    const d3 = ramp(t, tBeide, 0.5); if (d3 > 0.01) { ctx.save(); ctx.globalAlpha *= d3; const tg = q.at('gaspedaal'), tr = q.at('rem');
      hartDoorsnede(ctx, 960, 400, 0.45, { u: (t * (t > q.at('diepst') ? 2.6 : 1.7)) % 1 }); const sP = zGlad([[300, 300], [600, 320], [820, 380]]), pP = zGlad([[1620, 300], [1320, 320], [1100, 380]]);
      zLijn(ctx, sP, C.koraal, 6); zLijn(ctx, pP, C.groen, 6); zPijlkop(ctx, sP, C.koraal); zPijlkop(ctx, pP, C.groen); naamBij(ctx, 'sympathisch', null, 300, 270, 1, 'left', C.koraal); naamBij(ctx, 'parasympathisch', null, 1620, 270, 1, 'right', C.groen);
      metaText(ctx, 'naar dezelfde organen', 960, 600, C.grain, 'center', 26);
      const gas = t > q.at('diepst') ? lerp(0.3, 0.9, ramp(t, q.at('diepst'), 0.6)) : 0.3, rem = 0.3;
      pedaal(ctx, 420, 600, gas, C.koraal, 'gas', q.on('gaspedaal', 1, 0.4)); pedaal(ctx, 1500, 600, rem, C.groen, 'rem', q.on('rem', 1, 0.4));
      ctx.restore();
      const bpm = 70 + 80 * gas - 30 * rem; hartslagMeter(ctx, 960, 770, 90, bpm, q.on('pedaal', 1, 0.4) * d3); }
    tijdbalk(ctx, lerp(200, 500, ease(t / 0.9)), UIT(t, tAut, 0.5), { marks: [[100, '', C.teal, 1], [200, '', C.teal, 1], [500, 'hart bonkt', C.koraal, q.on('halve', 1, 0.4)]] }); },
  q5(ctx, t, q) { vraagVoor(ctx, t, q, 'v5', [['Alleen'], ['parasympathische'], ['zenuwen']]); },
  a5(ctx, t, q) { bg(ctx, 'schema'); const tAn = q.at('skeletspieren') - 0.4; const d1 = UIT(t, tAn, 0.5);
    if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; const u = ramp(t, 0.3, 1.6), gas = lerp(0.9, 0.2, u), rem = lerp(0.3, 0.85, u);
      hartDoorsnede(ctx, 960, 380, 0.45, { u: (t * lerp(2.6, 1.3, u)) % 1 }); pedaal(ctx, 420, 520, gas, C.koraal, 'gas · minder'); pedaal(ctx, 1500, 520, rem, C.groen, 'rem · dieper');
      hartslagMeter(ctx, 960, 740, 90, 70 + 80 * gas - 30 * rem); tag(ctx, 'onbewust', 960, 200, C.text2, q.on('onbewust', 1, 0.4), 'center', 40); ctx.restore(); }
    const d2 = ramp(t, tAn, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2;
      roundRect(ctx, 160, 230, 760, 560, 18); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); roundRect(ctx, 1000, 230, 760, 560, 18); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5);
      naamBij(ctx, 'animaal zenuwstelsel', 'naar je skeletspieren · vaak bewust', 540, 300, q.on('animale', 1, 0.4), 'center', C.goud);
      naamBij(ctx, 'autonoom zenuwstelsel', 'naar je organen · onbewust', 1380, 300, q.on('animale', 1, 0.4), 'center', C.goud);
      const ka = q.on('Knijpen', 1, 0.4); if (ka > 0.01) { ctx.save(); ctx.globalAlpha *= ka; fietsMetFietser(ctx, 470, 690, 300, { knijp: ramp(t, q.at('Knijpen') + 0.2, 0.3) }); tag(ctx, 'knijpen in de rem', 540, 770, C.goud, 1, 'center', 32); ctx.restore(); }
      const ha = q.on('Hart', 1, 0.4); if (ha > 0.01) { ctx.save(); ctx.globalAlpha *= ha; hartDoorsnede(ctx, 1380, 490, 0.38, { u: (t * 2.2) % 1 }); tag(ctx, 'hart dat bonkt', 1380, 770, C.koraal, 1, 'center', 32); ctx.restore(); }
      ctx.restore(); } },

  // ---------- Hoofdstuk 6 · Weten (verdieping) ----------
  s61(ctx, t, q) { bg(ctx, 'schema'); const tOnd = q.at('Onderzoekers') - 0.3; const d1 = UIT(t, tOnd, 0.5);
    if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; const R = persoon(ctx, 'daan', 430, 1500, 1500, { uit: t > q.at('kind') ? 'verbaasd' : 'neutraal' });
      const wb = q.on('kind', 1, 0.4); if (wb > 0.01) { wolk(ctx, 640, 120, 360, 130, 'een kind!', wb, '#F2F2EE', 40); }
      const Z = breinZoom(ctx, 1240, 470, 290, R.hoofd.x + R.hoofd.r, R.hoofd.y, q.on('bewustwording', 1, 0.5), { binnen: (B, s) => { const g = q.on('grote', 1, 0.4); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(...B(-30, -110), 270 * s, 175 * s, -0.1, 0, 6.283); ctx.stroke(); ctx.restore(); } } });
      naamBij(ctx, 'grote hersenen', 'hier word je je bewust', 1240, 830 - 20, q.on('grote', 1, 0.4), 'center', C.goud);
      tag(ctx, 'bewust worden kost tijd', 1240, 140, C.goud, q.on('kost', 1, 0.4), 'center', 36); ctx.restore(); }
    const d2 = ramp(t, tOnd, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2; const x0 = 260, x1 = 1660, y = 480, X = v => lerp(x0, x1, v / 600);
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); for (const v of [0, 100, 200, 300, 400, 500, 600]) { ctx.beginPath(); ctx.moveTo(X(v), y - 10); ctx.lineTo(X(v), y + 10); ctx.stroke(); metaText(ctx, v + ' ms', X(v), y + 50, C.text2, 'center', 26); }
      metaText(ctx, 'meting · aanraking van de huid', x0, 220, C.grain, 'left', 28);
      naamBij(ctx, 'aanraking', null, X(0), y - 60, q.on('aanraking', 1, 0.4), 'center'); dot(ctx, X(0), y, 13 * q.on('aanraking', 1, 0.4), C.text);
      const sg = q.on('huid', 1, 0.4); if (sg > 0.01) { ctx.save(); ctx.globalAlpha *= sg; dot(ctx, X(25), y, 12, C.teal); naamBij(ctx, 'signaal in de hersenen', 'al na enkele tientallen ms', X(25) + 10, y + 120, 1, 'left', C.teal); ctx.restore(); }
      const bw = ramp(t, q.at('halve') - 0.2, 0.9); if (bw > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(X(0), y); ctx.lineTo(X(500 * bw), y); ctx.stroke(); ctx.restore(); dot(ctx, X(500 * bw), y, 14, C.goud); }
      naamBij(ctx, 'bewust', '± 0,5 s', X(500), y - 60, q.on('opmerkt', 1, 0.4), 'center', C.goud);
      const mt = q.on('meteen', 1, 0.5); if (mt > 0.01) { ctx.save(); ctx.globalAlpha *= mt; ctx.strokeStyle = C.goud; ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(500), y - 110); ctx.quadraticCurveTo(X(250), y - 290, X(10), y - 110); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, X(30), y - 135, X(8), y - 105, C.goud, 1, 4, 16); naamBij(ctx, 'voelt als: meteen', null, X(250), y - 230, 1, 'center', C.goud); ctx.restore(); }
      tag(ctx, 'je lichaam loopt voor je uit', 960, 790, C.groen, q.on('loopt', 1, 0.4), 'center', 40); ctx.restore(); } },
  q6(ctx, t, q) { vraagVoor(ctx, t, q, 'v6', [['cellichamen'], ['uitlopers'], ['bloedvaten']]); },
  a6(ctx, t, q) { bg(ctx, 'schema'); const tDrie = q.at('drie') - 0.3; const d1 = UIT(t, tDrie, 0.5);
    if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; const node = (x, y, s, sub, w, n = 1, col = C.text) => { const a = q.on(w, n, 0.4); if (a > 0.01) naamBij(ctx, s, sub, x, y, a, 'center', col); return a; };
      naamBij(ctx, 'zenuwstelsel', null, 960, 200, ramp(t, 0.6, 0.4), 'center', C.goud);
      const lijn = (a, b, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); };
      const aC = q.on('Centraal', 1, 0.4), aP = q.on('Perifeer', 1, 0.4), aA = q.on('Animaal', 1, 0.4), aU = q.on('Autonoom', 1, 0.4), aG = q.on('gas', 1, 0.4);
      lijn([960, 215], [560, 300], aC); lijn([960, 215], [1360, 300], aP); lijn([1360, 375], [1110, 450], aA); lijn([1360, 375], [1610, 450], aU); lijn([1610, 525], [1480, 610], aG); lijn([1610, 525], [1740, 610], aG);
      node(560, 340, 'centraal', 'hersenen · ruggenmerg', 'Centraal'); node(1360, 340, 'perifeer', 'alle zenuwen', 'Perifeer');
      node(1110, 490, 'animaal', 'skeletspieren · vaak bewust', 'Animaal'); node(1610, 490, 'autonoom', 'organen · onbewust', 'Autonoom');
      if (aG > 0.01) { tag(ctx, 'gas: sympathisch', 1420, 660, C.koraal, aG, 'center', 30); tag(ctx, 'rem: parasympathisch', 1720, 730, C.groen, aG, 'center', 30); }
      ctx.restore(); }
    const d2 = ramp(t, tDrie, 0.5); if (d2 > 0.01) { ctx.save(); ctx.globalAlpha *= d2; const M = ruggenmergDoorsnede(ctx, 620, 470, 1.5, { grijsHl: q.on('grijze', 1, 0.3) * UIT(t, q.at('witte') - 0.1, 0.3), witHl: q.on('witte', 1, 0.3) * UIT(t, q.at('Witte') + 1.0, 0.3), cellen: q.on('cellichamen', 1, 0.4) });
      const sens = zGlad([[1300, 120], [M.ganglion[0] + 120, M.ganglion[1] - 60]]).concat(M.achP.slice().reverse()).concat([M.achterhoorn]); const schak = zGlad([M.achterhoorn, M.midden, M.voorhoorn]); const mot = [M.voorhoorn].concat(M.vooP).concat([[1300, 700]]);
      const nU = UIT(t, q.at('cellichamen') - 0.3, 0.5), aS = q.on('Sensorisch', 1, 0.4) * nU, aSc = q.on('schakelneuronen', 1, 0.4) * nU, aM = q.on('motorisch', 1, 0.4) * nU; zLijn(ctx, sens, Z1.zenuw, 5, aS); zLijn(ctx, schak, Z1.zenuw, 5, aSc); zLijn(ctx, mot, Z1.zenuw, 5, aM);
      zVuur(ctx, sens, (t - q.at('Sensorisch')) / 1.0, aS, 5); zVuur(ctx, schak, (t - q.at('schakelneuronen')) / 0.6, aSc, 5); zVuur(ctx, mot, (t - q.at('motorisch')) / 1.0, aM, 5);
      naamBij(ctx, 'sensorisch: naar binnen', null, 1320, 150, aS, 'left', C.text); naamBij(ctx, 'schakelneuron: in het midden', null, 1320, 440, aSc, 'left', C.text); naamBij(ctx, 'motorisch: naar buiten', null, 1320, 720, aM, 'left', C.text);
      naamBij(ctx, 'grijze stof', 'cellichamen', M.grijs[0] - 30, M.grijs[1] + 240, q.on('grijze', 1, 0.4), 'center', q.on('grijze', 1, 0.3) * UIT(t, q.at('witte') - 0.1, 0.3) > 0.5 ? C.goud : C.text);
      naamBij(ctx, 'witte stof', 'uitlopers', M.wit[0] - 10, M.wit[1] - 250, q.on('witte', 1, 0.4), 'center', C.text);
      ctx.restore();
      const myA = q.on('vettige', 1, 0.5) * d2; if (myA > 0.01) { zoomCircle(ctx, 1560, 620, 190, M.wit[0] + 30, M.wit[1] + 10, null, myA, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1370, 450, 380, 380);
          for (let i = 0; i < 9; i++) { const px = 1470 + (i % 3) * 90 + (Math.floor(i / 3) % 2) * 20, py = 550 + Math.floor(i / 3) * 90; dot(ctx, px, py, 36, '#ECE6D8', '#D2C8B4', 1.5); dot(ctx, px, py, 15, '#8C8070'); } });
        naamBij(ctx, 'vettige laag', 'om de uitlopers · maakt de stof wit', 1560, 860, myA, 'center', C.goud); }
      tag(ctx, 'volgende film', 1560, 210, C.goud, q.on('volgende', 1, 0.4), 'center', 32); } },

  // ---------- Samenvatting ----------
  s70(ctx, t, q) { bg(ctx, 'schema'); const x0 = 180, x1 = 1740, y = 470, X = v => lerp(x0, x1, v / 1000);
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (const v of [0, 250, 500, 750, 1000]) { ctx.beginPath(); ctx.moveTo(X(v), y - 10); ctx.lineTo(X(v), y + 10); ctx.stroke(); metaText(ctx, v === 0 ? '0' : v === 1000 ? '1 s' : v === 500 ? '0,5 s' : '', X(v), y + 50, C.text2, 'center', 28); }
    metaText(ctx, 'één seconde op de fiets', x1, 150, C.grain, 'right', 28);
    const M = [[0, 'Nul', 1, 'licht op het netvlies', 'receptor maakt een impuls', C.teal, -2], [100, 'Honderd', 1, 'impuls in de hersenen', '0,1 s', C.teal, 1], [200, 'Tweehonderd', 1, 'handen remmen', 'via de hersenen · geleerd', C.goud, -1],
      [330, 'reflex', 1, 'bal raakt de hand: reflex', 'via het ruggenmerg · nog sneller', C.teal, 2], [500, 'halve', 1, 'hart bonkt', 'autonoom', C.koraal, -1], [580, 'weet', 1, 'nu weet je het', 'bewust', C.goud, 1]];
    let cur = 0; for (const [v, w, n, s, sub, col, kant] of M) { const a = q.on(w, n, 0.4); if (a <= 0.01) continue; cur = Math.max(cur, v); ctx.save(); ctx.globalAlpha *= a; dot(ctx, X(v), y, 12, col);
      const sg = Math.sign(kant), L = Math.abs(kant) === 2 ? 220 : 100; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(v), y + sg * 16); ctx.lineTo(X(v), y + sg * L); ctx.stroke(); ctx.restore();
      naamBij(ctx, s, sub, X(v) + (v === 0 ? -10 : 0), y + sg * (L + 30) + (sg < 0 ? -30 : 10), a, v === 0 ? 'left' : 'center', col); }
    const cx = X(lerp(0, cur, 1)); dot(ctx, cx, y, 16, C.goud, '#F5DE9A', 2);
    haak(ctx, x0, x1, 790, 'elk deel van je zenuwstelsel heeft zijn eigen snelste route', C.groen, q.on('snelste', 1, 0.5)); }
});

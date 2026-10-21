// Wat word jij? · Tandheelkunde 3 · Bloedend tandvlees — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Mondhygiënist Ilse; Opa Henk als patiënt; Dr. Kim als onderzoeker).
// Rode draad: het tandvlees van Opa Henk, van bloeden bij het poetsen tot de behandeling.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }
// één naam tegelijk op dezelfde plek: lijst [naam, sub, starttijd, kleur?]; de vorige gaat eerst weg
function volg(ctx, t, L, x, y, align = 'center') { L.forEach(([n, sub, s0, col], i) => { const s1 = i + 1 < L.length ? L[i + 1][2] : 1e9; const a = clamp((t - s0) / 0.3, 0, 1) * clamp((s1 - 0.05 - t) / 0.25, 0, 1); naamBij(ctx, n, sub, x, y, a, align, col || C.text); }); }
const sm = (u) => u * u * (3 - 2 * u);

Object.assign(SCENES, {
  title(ctx, t) { parodont(ctx, 1500, 560, 0.82, { t, rood: 0.55, zwel: 0.4, plak: 0.7, vaat: 0.5, links: { rood: 0, zwel: 0, plak: 0.2, vaat: 0 } }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('controle', 1, 1));
    laag(ctx, A, () => { wastafel(ctx, 1020, 880, 1, q.on('bloedt', 1, 1), t);
      const poets = t < q.at('omheen', 1) + 0.6; persoon(ctx, 'henk', 700, 880, 500, { t, kijk: 1, pose: 'vasthouden', uit: t > q.at('bloedt', 1) ? 'verbaasd' : 'neutraal', hold: (c, x, y, an) => tandenborstelHold(c, x, y, an + (poets ? 0.15 * Math.sin(t * 9) : 0)) });
      naamBij(ctx, 'Opa Henk', '', 700, 330, q.on('Henk', 1), 'center');
      const Z = q.on('tandvlees', 1); kiesRijT3(ctx, 1580, 520, 0.36, { t, rood: 0.7, bloed: Z, a: Z }); naamBij(ctx, 'roze schuim: bloed', '', 1580, 650, q.on('bloedt', 1) * Z, 'center');
      naamBij(ctx, 'er voorzichtig omheen', '', 1580, 300, q.on('voorzichtig', 1), 'center', C.goud); });
    laag(ctx, B, () => { tandStoel(ctx, 640, 880); persoon(ctx, 'henk', 920, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'denk' });
      persoon(ctx, 'ilse', 1340, 880, 500, { t, kijk: -1, uit: 'blij', pose: 'vasthouden', hold: spiegelHold }); naamBij(ctx, 'Mondhygiënist Ilse', '', 1340, 330, q.on('Ilse', 1), 'center');
      chip(ctx, 'minder poetsen?', 920, 300, C.goud, q.on('goed', 1), 30); vraagteken(ctx, 1140, 260, q.on('zegt', 1), 110); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b');
    kiesRijT3(ctx, 960, 620, 0.62, { t, rood: 0.8, bloed: q.on('bloeden', 1), a: clamp(t / 0.5, 0, 1) });
    naamBij(ctx, 'ontsteking', '', 960, 300, q.on('ontsteking', 1), 'center', C.koraal); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const P = q.on('plak', 1, 1.5), V = q.on('wijder', 1, 1.2), Wb = q.on('witte', 1), R = q.on('rood', 1, 1.2), Bl = q.on('bloeden', 1);
    const st = { t, rand: -112, diepte: 2, plak: P, rood: R * 0.9, zwel: R * 0.8, vaat: V, wbc: Wb * (1 - 0.5 * q.on('kwetsbaar', 1)), bloed: Bl, randje: q.on('randje', 1, 0.4) * (1 - q.on('plak', 1)), links: { plak: 0, rood: 0, zwel: 0, vaat: 0, wbc: 0, bloed: 0, randje: 0 } };
    const mx = 470, my = 540, ms = 0.78; parodont(ctx, mx, my, ms, st);
    naamBij(ctx, 'tand', '', mx, 270, q.on('rand', 1), 'center'); naamBij(ctx, 'tandvlees', '', mx - 290 * ms, my - 20, q.on('tandvlees', 1), 'center'); naamBij(ctx, 'kaakbot', '', mx - 240 * ms, my + 240 * ms, q.on('tandvlees', 1), 'center');
    // vergroting van de rand rechts
    const zx = 1360, zy = 470, zr = 330, zs = 2.5, src = pp(mx, my, ms, 200, -90), Za = q.on('randje', 1, 0.8);
    zoomCircle(ctx, zx, zy, zr, src.x, src.y, '', Za, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      parodont(ctx, zx - 195 * zs, zy + 70 * zs, zs, st);
      if (q.on('aanraking', 1) > 0.01) tandenborstel(ctx, zx + 90 - 30 * q.on('aanraking', 1, 0.5), zy - 300 + 40 * q.on('aanraking', 1, 0.5), 1.3, 2.2, q.on('aanraking', 1, 0.3)); });
    laag(ctx, Za, () => volg(ctx, t, [['randje', 'tussen tandvlees en tand', q.at('randje', 1)], ['plak', 'bacteriën in een slijmlaag', q.at('plak', 1)], ['bloedvaatjes wijder', '', q.at('wijder', 1)], ['witte bloedcellen', '', q.at('witte', 1)], ['rood en gezwollen', '', q.at('rood', 1), C.koraal], ['bloedt bij aanraking', '', q.at('aanraking', 1), C.koraal], ['gingivitis', 'ontsteking van het tandvlees', q.at('gingivitis', 1), C.koraal]], zx, 862));
    tag(ctx, 'film: De eerste verdediging', mx, 150, C.teal, q.on('verdediging', 1) * (1 - q.on('kwetsbaar', 1)), 'center', 28); },

  s06(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'DENEMARKEN · JAREN ZESTIG', 160, 150, q.on('Denemarken', 1), C.grain, 'left', 28);
    const t1 = q.at('poetsen', 1), t2 = q.at('tandvlees', 2), t3 = q.at('poetsen', 2), t4 = q.at('verdwenen', 1);
    const wk = t < t1 ? 0 : t < t2 ? 3 * sm(clamp((t - t1) / (t2 - t1), 0, 1)) : t < t3 ? 3 : 3 + sm(clamp((t - t3) / (t4 - t3), 0, 1));
    const rood = wk <= 3 ? clamp((wk - 0.4) / 2.4, 0, 1) : clamp(1 - (wk - 3) * 1.1, 0, 1);
    // twaalf proefpersonen = twaalf stukjes tandvlees
    for (let i = 0; i < 12; i++) { const a = clamp((t - q.at('Twaalf', 1) - i * 0.08) / 0.3, 0, 1); const r = rood * (0.75 + 0.25 * hash(i * 5)); tvIcoon(ctx, 410 + (i % 6) * 220, 330 + Math.floor(i / 6) * 210, 0.3, r, a); }
    chip(ctx, '12 mensen met gezond tandvlees', 960, 150, C.groen, q.on('gezond', 1) * (1 - q.on('stopten', 1)), 28);
    // tijdlijn: 3 weken niet poetsen, dan 1 week wel
    const TA = q.on('stopten', 1); laag(ctx, TA, () => { const x0 = 420, x1 = 1500, Y = 760, wx = (w) => x0 + (x1 - x0) * w / 4;
      roundRect(ctx, x0, Y - 14, wx(3) - x0, 28, 10); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); roundRect(ctx, wx(3), Y - 14, x1 - wx(3), 28, 10); shape(ctx, rgba(C.groen, 0.3), C.groen, 2);
      for (let w = 0; w <= 4; w++) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(wx(w), Y - 24); ctx.lineTo(wx(w), Y + 24); ctx.stroke(); metaText(ctx, 'week ' + w, wx(w), Y + 60, C.text2, 'center', 22); }
      regel(ctx, 'niet poetsen', (x0 + wx(3)) / 2, Y - 34, 1, C.koraal, 30, 'center', 700); regel(ctx, 'poetsen', (wx(3) + x1) / 2, Y - 34, q.on('poetsen', 2), C.groen, 30, 'center', 700);
      circ(ctx, wx(wk), Y, 18, C.goud, '#121A26', 3); });
    tag(ctx, 'omkeerbaar', 960, 150, C.groen, q.on('omkeerbaar', 1), 'center', 36); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    const kr = q.on('kruipt', 1, 2), sten = q.on('verhardt', 1, 1.5), pk = q.on('randje', 1, 2.5), af = q.on('afbreken', 1, 3) * 0.5 + q.on('zakt', 1, 1.6) * 0.5;
    const diepte = 2 + 2.6 * pk + 1.4 * af, rand = -112 + 10 * pk;
    const bot = Math.max(22 + 150 * af, rand + diepte * MM + 34);
    const st = { t, rand, diepte, bot, plak: 0.9, plakOnder: 0.35 * kr + 0.55 * pk, steen: sten, rood: 0.75, zwel: 0.5, vaat: 0.7, wbc: q.on('ontsteking', 1) * (1 - q.on('afbreken', 1)), stof: q.on('ontstekingsstoffen', 1) * (1 - q.on('parodontitis', 1) * 0.6), oc: q.on('cellen', 1) * (1 - q.on('parodontitis', 1) * 0.5), spook: q.on('zakt', 1), spookBot: 22, los: q.on('los', 1), bact: 1 - 0.55 * q.on('bacterie', 1) * (1 - q.on('ontstekingsstoffen', 1)),
      links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0, zwel: 0, vaat: 0, wbc: 0, stof: 0, oc: 0, spook: 0 } };
    const mx = 700, my = 470, ms = 0.95; const S = parodont(ctx, mx, my, ms, st);
    naamBij(ctx, 'gezond', '', mx - 330 * ms, my - 200 * ms, q.on('verder', 1), 'center', C.groen);
    tandenborstel(ctx, mx + 250 * ms, my - 330 * ms, 1, 2.0, q.on('tandenborstel', 1) * (1 - q.on('verhardt', 1)));
    const lx = mx + 450 * ms + 20, yRand = my + rand * ms, yPocket = my + (rand + diepte * MM * 0.55) * ms, yBot = my + (bot + 40) * ms;
    volg(ctx, t, [['plak onder het tandvlees', '', q.at('kruipt', 1)], ['tandsteen', 'verharde plak', q.at('verhardt', 1)]], lx, yRand - 20, 'left');
    naamBij(ctx, 'pocket', 'diepe ruimte langs de wortel', lx, yPocket + 10, q.on('pocket', 1), 'left');
    volg(ctx, t, [['ontstekingsstoffen', 'van je eigen afweer', q.at('ontstekingsstoffen', 1), '#F08A4B'], ['botafbrekende cellen', '', q.at('cellen', 1), C.paars], ['bot zakt weg', '', q.at('zakt', 1), C.goud]], lx, Math.min(yBot + 40, 830), 'left');
    kruis(ctx, mx + 210 * ms, my - 180 * ms, 18, q.on('bacterie', 1) * (1 - q.on('ontstekingsstoffen', 1)));
    naamBij(ctx, 'parodontitis', '', mx, 150, q.on('parodontitis', 1), 'center', C.koraal); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('röntgenfoto', 1, 1));
    persoon(ctx, 'ilse', 240, 880, 500, { t, kijk: 1, uit: 'neutraal', pose: B > 0.5 ? 'wijs' : 'vasthouden', hold: B > 0.5 ? null : sondeHold }); naamBij(ctx, 'Mondhygiënist Ilse', '', 240, 330, clamp(t / 0.5, 0, 1) * (1 - q.on('schuift', 1)), 'center');
    laag(ctx, A, () => { const px = 1150, py = 560, ps = 1.45; ctx.save(); roundRect(ctx, 470, 90, 1420, 770, 24); ctx.clip();
      const st = { t, rand: -100, diepte: 6, bot: 150, plak: 0.4, plakOnder: 0.3, steen: 0.5, rood: 0.7, zwel: 0.4, vaat: 0.6, links: { rand: -112, diepte: 2, bot: null, plak: 0.1, plakOnder: 0, steen: 0, rood: 0.1, zwel: 0, vaat: 0.1 } };
      const S = parodont(ctx, px, py, ps, st);
      const inL = 2 * sm(clamp((t - q.at('schuift', 1)) / 1.6, 0, 1)) * (1 - q.on('Henk', 1, 0.6)), inR = 6 * sm(clamp((t - q.at('Henk', 1)) / 1.6, 0, 1));
      const LS = tvState(Object.assign({}, st, st.links));
      sonde(ctx, px, py, ps, LS, inL, q.on('schuift', 1) * (1 - q.on('Henk', 1, 0.6)), -1); sonde(ctx, px, py, ps, tvState(st), inR, q.on('Henk', 1, 0.5), 1);
      ctx.restore(); roundRect(ctx, 470, 90, 1420, 770, 24); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
      naamBij(ctx, 'sonde met streepjes', '1 streepje = 1 mm', 680, 160, q.on('streepjes', 1) * (1 - q.on('gezond', 1)), 'center');
      naamBij(ctx, 'gezond: 1 tot 3 mm', '', 680, 160, q.on('gezond', 1), 'center', C.groen);
      naamBij(ctx, 'Opa Henk: 6 mm', 'pocket', 1680, 160, q.on('zes', 1), 'center', C.koraal); });
    laag(ctx, B, () => { const R = rontgenBot(ctx, 560, 170, 1200, 600, 1, { verlies: 0.85, lijn: q.on('bot', 1), t });
      naamBij(ctx, 'hier hoort het bot', '', 1740, R.gezond - 14, q.on('bot', 1), 'right', C.goud); naamBij(ctx, 'bot verdwenen', '', 1060, R.crest(1060) + 60, q.on('verdwenen', 1), 'center', C.koraal); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const C1 = q.on('schoonmaakt', 1, 1.2);
    parodont(ctx, 820, 470, 0.95, { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.8 * (1 - C1), plakOnder: 0.6 * (1 - C1), steen: 0.8 * (1 - C1), rood: 0.7 - 0.4 * C1, zwel: 0.4 * (1 - C1), vaat: 0.5, spook: q.on('kaakbot', 1), spookBot: 22, links: { rand: -112, diepte: 2, bot: null, plak: 0, plakOnder: 0, steen: 0, rood: 0, zwel: 0, spook: 0 } });
    persoon(ctx, 'ilse', 260, 880, 480, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: curetteHold });
    naamBij(ctx, 'schoon', '', 1300, 360, C1, 'left', C.groen); vraagteken(ctx, 1400, 560, q.on('terug', 1), 110); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const St = q.on('stopt', 1, 1.5);
    parodont(ctx, 720, 490, 0.92, { t, rand: -100 - 6 * St, diepte: 5.5 - 1.5 * St, bot: 150, plak: 0, steen: 0, rood: 0.35 * (1 - St), zwel: 0.2 * (1 - St), vaat: 0.4 * (1 - St), oc: 0.8 * (1 - St), stof: 0.6 * (1 - St), spook: q.on('weg', 1), spookBot: 22, links: { rand: -112, diepte: 2, bot: null, rood: 0, zwel: 0, oc: 0, stof: 0, spook: 0 } });
    naamBij(ctx, 'komt meestal niet terug', '', 1150, 470, q.on('groeit', 1), 'left', C.goud);
    naamBij(ctx, 'afbraak stopt', '', 1150, 600, St, 'left', C.groen);
    persoon(ctx, 'henk', 1620, 880, 470, { t, kijk: -1, uit: 'lacht', a: q.on('Henk', 1, 0.3) }); vink_(ctx, 1620, 300, 30, q.on('houden', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const [A, B0] = wisselA(q.on('Daarna', 1, 1)); const [B1, Cc] = wisselA(q.on('voortaan', 1, 1)); const B = Math.min(B0, B1);
    laag(ctx, A, () => { const kx = 1180, ky = 480, ks = 0.95; const cl = sm(clamp((t - q.at('haalt', 1)) / 3.6, 0, 1));
      const ph = t < q.at('haalt', 1) ? 0 : 1; persoon(ctx, 'ilse', 330, 880, 520, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: ph ? curetteHold : spuitHold });
      const st = { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.8 * (1 - cl), plakOnder: 0.85 * (1 - cl), steen: 1 - cl, rood: 0.7 - 0.3 * cl, zwel: 0.4, vaat: 0.5, links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.1, zwel: 0 } };
      const S = parodont(ctx, kx, ky, ks, st);
      const V = q.on('verdooft', 1); if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V * (1 - 0.6 * ph); const c = pp(kx, ky, ks, 300, 0); const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 160); g.addColorStop(0, rgba(C.teal, 0.5)); g.addColorStop(1, rgba(C.teal, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.x, c.y, 160, 0, 6.283); ctx.fill(); ctx.restore(); }
      if (ph) curette(ctx, kx, ky, ks, lerp(S.rand + 30, S.bodem - 12, 0.5 + 0.5 * Math.sin(t * 3.5)), q.on('haalt', 1, 0.4) * (1 - cl * 0.8), t);
      volg(ctx, t, [['verdoving', '', q.at('verdooft', 1), C.teal], ['plak en tandsteen eruit', 'ook diep onder het tandvlees', q.at('haalt', 1)]], 760, 200, 'center'); });
    laag(ctx, B, () => { persoon(ctx, 'henk', 420, 880, 500, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: ragerHold });
      kiesRijT3(ctx, 1220, 640, 0.66, { t, rood: 0.3, rager: 1 }); naamBij(ctx, 'ragertjes', 'elke dag, tussen de tanden', 1220, 260, q.on('ragertjes', 1), 'center'); });
    laag(ctx, Cc, () => { persoon(ctx, 'henk', 330, 880, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'ilse', 590, 880, 500, { t, kijk: -1, uit: 'blij' });
      kalenderJaar(ctx, 1000, 300, 1, { controles: q.on('drie', 1, 2.2) * 1.0, vlam: q.on('opvlammen', 1), t });
      naamBij(ctx, 'elke drie maanden', '', 1240, 240, q.on('drie', 1), 'center'); naamBij(ctx, 'kan opvlammen', '', 1560, 720, q.on('opvlammen', 1), 'center', C.koraal); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const R2 = q.on('erger', 1), Bl = q.on('bloedt', 1, 1.2), Gz = q.on('gezond', 1);
    const base = { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.6, plakOnder: 0.5, steen: 0.5, rood: 0.8, zwel: 0.5, vaat: 0.7, links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.2, zwel: 0, vaat: 0.2, bloed: 0, oc: 0, stof: 0 } };
    parodont(ctx, 520, 520, 0.6, Object.assign({}, base, { bloed: Bl, a: R2 }));
    parodont(ctx, 1400, 520, 0.6, Object.assign({}, base, { bleek: Bl, rood: 0.8, vaat: 0.7 * (1 - q.on('doorbloed', 1)), oc: q.on('doorgaat', 1), stof: q.on('doorgaat', 1), a: R2 }));
    persoon(ctx, 'ilse', 960, 880, 420, { t, kijk: 1, uit: 'neutraal', pose: 'wijs', a: 1 - R2 * 0.0 }); naamBij(ctx, 'Mondhygiënist Ilse', '', 960, 420, clamp(t / 0.5, 0, 1) * (1 - q.on('roken', 2)), 'center');
    sigaret(ctx, 1640, 240, 0.9, q.on('roken', 1), t); regel(ctx, 'niet-roker', 520, 250, R2, C.text, 36, 'center', 700); regel(ctx, 'roker', 1400, 250, R2, C.text, 36, 'center', 700);
    naamBij(ctx, 'bloedt', '', 520, 830, Bl * (1 - q.on('waarschuwing', 1)), 'center', C.koraal); naamBij(ctx, 'bloedt minder', 'minder doorbloed', 1400, 830, Bl * (1 - Gz), 'center');
    naamBij(ctx, 'lijkt gezond', 'ontsteking gaat door', 1400, 830, Gz, 'center', C.goud); tag(ctx, 'bloeden = waarschuwing', 520, 830, C.koraal, q.on('waarschuwing', 1), 'center', 28); },

  // ---------- H4 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Bij', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'henk', 760, 880, 500, { t, kijk: 1, uit: 'neutraal' }); glucosemeter(ctx, 1180, 520, 0.9, 1, { hoog: 1 }); chip(ctx, 'diabetes type 2', 1180, 280, C.goud, q.on('diabetes', 1), 32);
      naamBij(ctx, 'tandvlees', '', 760, 330, q.on('tandvlees', 1), 'center'); });
    laag(ctx, B, () => { const And = q.on('andersom', 1), Beh = q.on('Behandel', 1, 1.5);
      parodont(ctx, 470, 470, 0.48, { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.6, plakOnder: 0.6, steen: 0.5, rood: 0.6 + 0.35 * q.on('heftiger', 1) - 0.6 * Beh, zwel: 0.3 + 0.5 * q.on('heftiger', 1) - 0.6 * Beh, vaat: 0.6, wbc: 0.6 * (1 - Beh), stof: 0.8 * And * (1 - Beh * 0.7), links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.2, zwel: 0, wbc: 0, stof: 0 } });
      naamBij(ctx, 'ontstoken pocket', '', 470, 760, 1, 'center');
      glucosemeter(ctx, 1460, 470, 0.85, 1, { hoog: 1, zak: Beh }); naamBij(ctx, 'hoge bloedsuiker', '', 1460, 760, 1 - Beh, 'center'); naamBij(ctx, 'iets lager', '', 1460, 760, Beh, 'center', C.groen);
      // heen: bloedsuiker → tandvlees
      const P1 = q.on('afweer', 1) * (1 - q.on('Daarom', 1)); pijl(ctx, 1290, 230, 650, 230, C.goud, P1, 6, 22); laag(ctx, 1 - q.on('Daarom', 1), () => volg(ctx, t, [['afweer werkt minder goed', '', q.at('afweer', 1)], ['vaker en ernstiger parodontitis', '', q.at('ernstiger', 1), C.koraal]], 970, 200));
      // terug: tandvlees → bloed → cellen
      laag(ctx, And * (1 - q.on('Daarom', 1)), () => { bloedbaan(ctx, 660, 1280, 790, 1, { stof: q.on('ontstekingsstoffen', 1), t }); pijl(ctx, 1290, 790, 1340, 700, C.goud, 1, 6, 20);
        naamBij(ctx, 'ontstekingsstoffen in het bloed', '', 970, 870 - 100, q.on('ontstekingsstoffen', 1) * (1 - q.on('cellen', 1)), 'center', '#F08A4B');
        insulineCel(ctx, 970, 470, 120, q.on('cellen', 1), { open: 1 - q.on('gevoelig', 1), stof: q.on('ontstekingsstoffen', 1), t }); naamBij(ctx, 'minder gevoelig voor insuline', '', 970, 640, q.on('gevoelig', 1), 'center'); });
      tag(ctx, 'film: Suiker in balans', 970, 160, C.teal, q.on('Suiker', 2) * (1 - q.on('Behandel', 1)), 'center', 28);
      laag(ctx, q.on('Daarom', 1), () => { tag(ctx, 'tandarts', 760, 230, C.teal, 1, 'center', 32); tag(ctx, 'huisarts', 1180, 230, C.groen, 1, 'center', 32); pijl(ctx, 860, 220, 1080, 220, C.line, 1, 4, 14); pijl(ctx, 1080, 220, 860, 220, C.line, 1, 4, 14); regel(ctx, 'samenwerken', 970, 300, q.on('samen', 1), C.text, 34, 'center', 700); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('Onderzoekers', 1, 0.6);
    laag(ctx, G, () => { tvIcoon(ctx, 470, 290, 0.32, 0, 1); regel(ctx, 'zonder parodontitis', 470, 380, 1, C.text, 30, 'center', 700); stippen(ctx, 360, 450, 20, 0, C.koraal, 1, 5, 18, 56);
      tvIcoon(ctx, 1450, 290, 0.32, 0.9, q.on('parodontitis', 1)); regel(ctx, 'met parodontitis', 1450, 380, q.on('parodontitis', 1), C.text, 30, 'center', 700); stippen(ctx, 1340, 450, 20, 0, C.koraal, q.on('parodontitis', 1), 5, 18, 56);
      const H = q.on('hartinfarct', 1); laag(ctx, H, () => { [0, 7].forEach(i => circ(ctx, 360 + (i % 5) * 56, 450 + Math.floor(i / 5) * 56, 18, C.koraal)); [0, 3, 7, 11].forEach(i => circ(ctx, 1340 + (i % 5) * 56, 450 + Math.floor(i / 5) * 56, 18, C.koraal)); });
      naamBij(ctx, 'hartinfarct', 'voorbeeld', 960, 520, H * (1 - q.on('Betekent', 1)), 'center', C.koraal); });
    laag(ctx, q.on('Betekent', 1), () => { hartje(ctx, 960, 500, 0.9, 1, t); pijl(ctx, 1290, 300, 1060, 430, C.line, q.on('veroorzaakt', 1), 5, 18); vraagteken(ctx, 1180, 320, q.on('veroorzaakt', 1), 90); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const [A, B] = wisselA(q.on('echte', 1, 1));
    laag(ctx, A, () => { tvIcoon(ctx, 560, 470, 0.36, 0.9, 1); hartje(ctx, 1360, 460, 0.8, 1, t);
      regel(ctx, 'parodontitis', 560, 580, 1, C.text, 30, 'center', 700); regel(ctx, 'hartinfarct', 1360, 590, 1, C.text, 30, 'center', 700);
      // samen voorkomen: stippellijn ertussen
      ctx.save(); ctx.globalAlpha *= q.on('samen', 1); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(700, 450); ctx.lineTo(1240, 450); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'verband blijft', '', 970, 425, q.on('verband', 1), 'center', C.goud);
      // roken (en meer) voedt allebei
      const Rk = q.on('rookt', 1); sigaret(ctx, 930, 240, 0.85, Rk, t); pijl(ctx, 850, 280, 640, 380, C.koraal, q.on('parodontitis', 1), 5, 18); pijl(ctx, 1060, 280, 1290, 380, C.koraal, q.on('hartinfarct', 1), 5, 18);
      chip(ctx, 'leeftijd', 1270, 190, C.oker, q.on('rekening', 1), 26); chip(ctx, 'diabetes', 620, 190, C.oker, q.on('rekening', 1), 26);
      persoon(ctx, 'kim', 970, 880, 330, { t, kijk: 1, uit: 'neutraal', pose: 'denk', outfit: 'lab', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1120, 700, q.on('Kim', 1) * (1 - q.on('bacteriën', 1)), 'left');
      vatDoorsnede(ctx, 1660, 680, 100, q.on('bacteriën', 1), { t, bact: q.on('mond', 1) }); naamBij(ctx, 'mondbacteriën in een vernauwd bloedvat', '', 1660, 830, q.on('vernauwde', 1), 'center'); });
    laag(ctx, B, () => { persoon(ctx, 'kim', 250, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'wijs', outfit: 'lab' }); metaA(ctx, 'DE PROEF DIE NOG NODIG IS', 600, 230, 1, C.grain, 'left', 28);
      tvIcoon(ctx, 720, 400, 0.3, lerp(0.9, 0, q.on('behandeld', 1, 1.5)), 1); regel(ctx, 'behandeld', 720, 490, 1, C.text, 30, 'center', 700); stippen(ctx, 610, 540, 20, 0, C.koraal, 1, 5, 16, 50);
      tvIcoon(ctx, 1320, 400, 0.3, 0.9, 1); regel(ctx, 'niet behandeld', 1320, 490, 1, C.text, 30, 'center', 700); stippen(ctx, 1210, 540, 20, 0, C.koraal, 1, 5, 16, 50);
      hartje(ctx, 1020, 610, 0.45, q.on('hartinfarcten', 1), t); text(ctx, '?', 1020, 790, fTitel(64), C.goud, 'center');
      stempel(ctx, 1500, 260, 'nog niet bewezen', C.koraal, q.on('niet', 2), -0.12); }); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'henk', 300, 880, 480, { t, kijk: 1, pose: 'vasthouden', uit: 'lacht', hold: ragerHold }); persoon(ctx, 'ilse', 560, 880, 500, { t, kijk: -1, uit: 'blij' });
    kiesRijT3(ctx, 960, 560, 0.3, { t, rood: lerp(0.8, 0, q.on('beter', 1, 1.5)), bloed: 1 - q.on('beter', 1) });
    recapKaart(ctx, 1280, 220, 560, 'bloeden = ontsteking', C.koraal, q.on('ontsteking', 1)); recapKaart(ctx, 1280, 360, 560, 'gingivitis is omkeerbaar', C.groen, q.on('ontsteking', 2));
    recapKaart(ctx, 1280, 500, 560, 'parodontitis: bot komt niet terug', C.goud, q.on('kaakbot', 1)); recapKaart(ctx, 1280, 640, 560, 'samenhang is geen oorzaak', C.teal, q.on('bloedsuiker', 1)); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'ilse', 230, 880, 480, { t, kijk: 1, uit: 'blij' });
    tag(ctx, 'Mondzorgkunde · hbo', 620, 260, C.teal, q.on('Mondzorgkunde', 1), 'center', 34);
    regel(ctx, 'meten · behandelen · voorlichting', 620, 350, q.on('meet', 1), C.text, 30, 'center', 700); regel(ctx, 'patiënten jarenlang terugzien', 620, 420, q.on('jarenlang', 1), C.text2, 30, 'center', 600);
    persoon(ctx, 'wouter', 1100, 880, 480, { t, kijk: 1, uit: 'blij', a: q.on('Tandarts', 1, 0.3) });
    tag(ctx, 'Tandheelkunde · universiteit', 1510, 260, C.goud, q.on('tandheelkunde', 1), 'center', 34);
    regel(ctx, 'daarna eventueel:', 1510, 350, q.on('verdiepen', 1), C.text2, 28, 'center', 600); regel(ctx, 'parodontoloog', 1510, 410, q.on('parodontoloog', 1), C.text, 36, 'center', 700);
    regel(ctx, 'specialist in het tandvlees', 1510, 470, q.on('parodontoloog', 1), C.text2, 28, 'center', 600); }
});

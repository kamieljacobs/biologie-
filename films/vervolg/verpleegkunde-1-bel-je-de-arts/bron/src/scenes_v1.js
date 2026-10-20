// Wat word jij? · Verpleegkunde 1 · Bel je de arts? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk als patiënt; Verpleegkundige Jesse; Dr. Kim als arts).
// Rode draad: Henk ligt met een longontsteking op de afdeling en gaat in de loop van de dag langzaam achteruit.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function klembord(c, x, y) { c.save(); c.translate(x, y); c.rotate(-0.15); roundRect(c, -34, -46, 68, 92, 6); shape(c, '#C9A35C', '#9A7A44', 2); c.fillStyle = '#F2EEE4'; c.fillRect(-26, -34, 52, 72); c.fillStyle = '#5A6478'; for (let i = 0; i < 5; i++) c.fillRect(-18, -24 + i * 12, 36 - (i % 2) * 12, 4); c.restore(); }
// metingen (exact volgens de kopregel van het script)
const OCHTEND = [['ademfrequentie', '16'], ['saturatie', '96%'], ['pols', '88'], ['bovendruk', '118'], ['temperatuur', '38,4'], ['bewustzijn', 'alert']];
const MIDDAG = [['ademfrequentie', '24'], ['saturatie', '93%'], ['pols', '104'], ['bovendruk', '106'], ['temperatuur', '38,6'], ['bewustzijn', 'alert']];
const SCORE = [['ademfrequentie', '16', 0, '24', 2], ['saturatie', '96%', 0, '93%', 2], ['pols', '88', 0, '104', 1], ['bovendruk', '118', 0, '106', 1], ['temperatuur', '38,4', 1, '38,6', 1], ['bewustzijn', 'alert', 0, 'alert', 0], ['extra zuurstof', 'nee', 0, 'nee', 0]];

Object.assign(SCENES, {
  title(ctx, t) { henkInBed(ctx, 1450, 880, 0.95, { t, adem: 20, meter: 1, spo2: '93%' }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Jesse', 1, 0.3), M = q.on('middag', 1);
    henkInBed(ctx, 560, 880, 1, { t, a: q.on('Opa', 1, 0.3), adem: t > q.at('middag', 1) ? 24 : 16, meter: J, uit: q.on('moe', 1) > 0.5 ? 'bezorgd' : 'neutraal' });
    naamBij(ctx, 'Opa Henk', 'longontsteking', 560, 210, q.on('Opa', 1) * (1 - J), 'center');
    persoon(ctx, 'jesse', 1010, 880, 500, { t, a: J, kijk: -1, pose: 'vasthouden', hold: klembord, uit: q.on('alarmerend', 1) > 0.5 ? 'denkt' : 'neutraal' });
    naamBij(ctx, 'Verpleegkundige Jesse', '', 1010, 340, J * (1 - q.on('ademt', 1)), 'center');
    const hl = (w) => q.on(w, 1); meetLijst(ctx, 1220, 230, 320, 'OCHTEND', OCHTEND.map(([n, v]) => [n, v, 0]), q.on('Ochtends', 1));
    meetLijst(ctx, 1570, 230, 320, 'MIDDAG', MIDDAG.map(([n, v], i) => [n, v, [hl('ademt'), 0.5 * hl('ademt'), hl('hart'), 0.5 * hl('hart'), 0.5 * hl('moe'), 0][i]]), M, C.koraal);
    chip(ctx, 'geen enkele waarde echt slecht', 1555, 720, C.text2, q.on('alarmerend', 1), 28);
    telefoon(ctx, 1470, 800, 1.9, q.on('arts', 1)); belGolf(ctx, 1500, 790, q.on('arts', 1), t, 1); vraagteken(ctx, 1640, 830, q.on('denk', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('klemmetje', 1, 0.8), A = 1 - F;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; antwoord(ctx, 'Antwoord b');
      henkInBed(ctx, 960, 880, 0.9, { t, adem: 24, meter: 1 });
      const p = q.on('pols', 1), ad = q.on('ademfrequentie', 1), tp = q.on('temperatuur', 1), bw = q.on('bewustzijn', 1);
      hartje(ctx, 330, 330, 0.9, p, t, 1); naamBij(ctx, 'pols · bloeddruk', 'hart en bloedvaten', 330, 490, p, 'center');
      longen(ctx, 1590, 330, 0.95, ad, 0.5 + 0.5 * Math.sin(t * 2.5)); naamBij(ctx, 'ademfrequentie · saturatie', 'longen', 1590, 490, ad, 'center');
      thermometer(ctx, 330, 640, 0.8, tp, 0.66); naamBij(ctx, 'temperatuur', 'afweer', 330, 790, tp, 'center');
      brein(ctx, 1590, 660, 0.42, bw, { t }); naamBij(ctx, 'bewustzijn', 'hersenen', 1590, 790, bw, 'center'); ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const L = q.on('licht', 1), waarde = t > q.at('93', 1) ? '93%' : '';
      vingerMeter(ctx, 820, 500, 1.15, 1, L, waarde, t, L); naamBij(ctx, 'saturatiemeter', 'op de vinger', 640, 260, 1 - q.on('licht', 1) * 0.0, 'center');
      naamBij(ctx, 'rood licht', 'door de vingertop', 900, 700, L * (1 - q.on('kleurt', 1)), 'center');
      const z1 = q.on('zuurstof', 1), z2 = q.on('zonder', 1);
      ctx.save(); ctx.globalAlpha *= z1; ctx.beginPath(); ctx.ellipse(1500, 360, 120, 70, 0, 0, 6.283); shape(ctx, '#E0403A', '#F08070', 3); ctx.restore(); naamBij(ctx, 'bloed met zuurstof', 'helderrood', 1500, 480, z1, 'center');
      ctx.save(); ctx.globalAlpha *= z2; ctx.beginPath(); ctx.ellipse(1500, 620, 120, 70, 0, 0, 6.283); shape(ctx, '#7A2A44', '#9A4A64', 3); ctx.restore(); naamBij(ctx, 'bloed zonder zuurstof', 'donkerrood', 1500, 740, z2, 'center');
      vraagteken(ctx, 1780, 520, q.on('betekent', 1), 120); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const C1 = q.on('Zuurstof', 1), Hb = q.on('hemoglobine', 1), S = q.on('saturatie', 1), O = q.on('ontstoken', 1);
    // grote rode bloedcel met 30 hemoglobinemoleculen, 28 beladen
    const cx = 560, cy = 500; if (C1 > 0.01) { ctx.save(); ctx.globalAlpha *= C1; ctx.beginPath(); ctx.ellipse(cx, cy, 320, 260, 0, 0, 6.283); shape(ctx, '#B8303A', '#E0605A', 4); ctx.beginPath(); ctx.ellipse(cx, cy, 170, 120, 0, 0, 6.283); ctx.fillStyle = '#A0283A'; ctx.fill(); ctx.restore(); }
    naamBij(ctx, 'rode bloedcel', '', cx, 220, q.on('bloedcellen', 1), 'center');
    const LEEG = [7, 22]; let n = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const i = r * 6 + c, w = wander(i, t, 5, 0.6), x = cx - 225 + c * 90 + w.x + (r % 2) * 20, y = cy - 180 + r * 90 + w.y; const vol = !LEEG.includes(i);
      hbMol(ctx, x, y, 24, vol, Hb * clamp((t - q.at('hemoglobine', 1)) * 6 - i * 0.15, 0, 1), vol); }
    naamBij(ctx, 'hemoglobine', 'draagt zuurstof', cx, 830, Hb, 'center');
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S * (1 - O); regel(ctx, '28 van de 30 beladen', 1420, 300, 1, C.text, 40, 'center', 700); regel(ctx, '≈ 93%', 1420, 380, 1, C.goud, 64, 'center', 800); ctx.restore(); }
    const g = q.on('gezond', 1) * (1 - O), h = q.on('lager', 1) * (1 - O), fr = v => (v - 85) / 15; balk(ctx, 1080, 560, 700, fr(95), C.groen, 'gezond: 95% of meer', g); balk(ctx, 1080, 680, 700, fr(93), C.oker, 'Henk: 93%', h);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(1080 + 700 * fr(95), 530); ctx.lineTo(1080 + 700 * fr(95), 740); ctx.stroke(); ctx.setLineDash([]); text(ctx, '85%', 1080, 770, fTekst(22, 600), C.text2, 'left'); text(ctx, '100%', 1780, 770, fTekst(22, 600), C.text2, 'right'); text(ctx, '95%', 1080 + 700 * fr(95), 524, fTekst(22, 700), C.text, 'center'); ctx.restore(); }
    longblaasjesVocht(ctx, 1420, 560, 1.15, O, q.on('vocht', 1, 1.2), t); naamBij(ctx, 'ontstoken longblaasjes', 'deels vol vocht', 1550, 790, q.on('vocht', 1), 'center'); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Krijgt', 1, 0.8), A = 1 - K, Z = q.on('Toch', 1, 0.8);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const nu = t > q.at('vierentwintig', 1) - 0.3;
      henkInBed(ctx, 640, 880, 0.95, { t, adem: nu ? 24 : 16, meter: 1 }); persoon(ctx, 'jesse', 1080, 880, 500, { t, kijk: -1, pose: 'denk', uit: 'denkt' });
      horloge(ctx, 1500, 360, 120, 1, t * 6); metaA(ctx, 'EEN HELE MINUUT TELLEN', 1500, 560, q.on('minuut', 1), C.grain, 'center', 24);
      // borstkas gaat omhoog: pijltje op het ritme
      const fr = (nu ? 24 : 16) / 60, b = Math.max(0, Math.sin(t * fr * 6.283)); pijl(ctx, 870, 560, 870, 520 - 30 * b, C.teal, q.on('borstkas', 1) * (0.4 + 0.6 * b), 5, 16);
      tag(ctx, 'ochtend: 16 per minuut', 1500, 680, C.teal, q.on('zestien', 1) * (nu ? 0.5 : 1), 'center', 32); tag(ctx, 'nu: 24 per minuut', 1500, 780, C.koraal, q.on('vierentwintig', 1), 'center', 36);
      chip(ctx, 'verandert vaak als eerste', 640, 200, C.goud, q.on('eerste', 1), 30); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K * (1 - Z);
      bloedvat(ctx, 160, 380, 520, 1, t, 0); tag(ctx, 'minder zuurstof', 420, 300, C.teal, q.on('weinig', 1), 'center', 30); tag(ctx, 'meer koolstofdioxide', 420, 560, C.grain, q.on('koolstofdioxide', 1), 'center', 30);
      const hs = q.on('hersenstam', 1); brein(ctx, 1000, 420, 0.8, 1, { t }); if (hs > 0.01) { const p = 1 + 0.15 * Math.sin(t * 6); circ(ctx, 1000 + 115 * 0.8, 420 + 180 * 0.8, 46 * p, rgba(C.goud, 0.3 * hs)); circ(ctx, 1000 + 115 * 0.8, 420 + 180 * 0.8, 24, rgba(C.goud, 0.8 * hs)); }
      naamBij(ctx, 'hersenstam', 'regelt het ademen', 1100, 650, hs, 'left');
      pijl(ctx, 700, 430, 820, 430, C.line, q.on('koolstofdioxide', 1), 5, 18); pijl(ctx, 1320, 430, 1440, 430, C.goud, q.on('sneller', 1), 5, 18);
      longen(ctx, 1640, 420, 1.1, q.on('sneller', 1), 0.5 + 0.5 * Math.sin(t * 5)); naamBij(ctx, 'sneller ademen', '', 1640, 600, q.on('sneller', 1), 'center');
      tag(ctx, 'saturatie op peil houden', 1640, 720, C.groen, q.on('peil', 1), 'center', 28); tag(ctx, 'film: Uitscheiding en evenwicht', 420, 720, C.teal, q.on('koolstofdioxide', 1, 1), 'center', 24); ctx.restore(); }
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; meetLijst(ctx, 300, 230, 420, 'VAAK OVERGESLAGEN', MIDDAG.map(([n, v], i) => [n, i === 0 ? '?' : v, i === 0 ? 1 : 0]), 1, C.koraal);
      saturatieKastje(ctx, 1000, 420, 0.9); thermometer(ctx, 1240, 440, 0.8, 1, 0.66); bloeddrukMeter(ctx, 1460, 440, 0.9, 1, 0.5);
      horloge(ctx, 1240, 690, 70, q.on('apparaat', 1), t * 6); regel(ctx, 'ademfrequentie: alleen kijken en tellen', 1240, 830, q.on('apparaat', 1), C.goud, 34, 'center', 700); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Jesse', 1, 0.3);
    metaA(ctx, 'WAARSCHUWINGSSCORE · ZOALS NEWS2', 160, 140, q.on('waarschuwingsscore', 1), C.grain, 'left', 24);
    [0, 1, 2, 3].forEach(p => { const u = p === 0 ? q.on('nul', 1) : p === 3 ? q.on('drie', 1) : q.on('tot', 1); if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, 1000 + p * 80, 104, 60, 50, 10); shape(ctx, rgba(PUNTKL[p], p ? 0.85 : 0.25), PUNTKL[p], 2); text(ctx, String(p), 1030 + p * 80, 140, fTekst(30, 800), p ? '#1A2740' : C.text, 'center'); ctx.restore(); });
    metaA(ctx, 'PUNTEN', 980, 140, q.on('nul', 1), C.text2, 'right', 22);
    const ks = [q.on('ademfrequentie', 1), q.on('saturatie', 1), q.on('pols', 1), q.on('bloeddruk', 1), q.on('temperatuur', 1), q.on('krijgen', 2), q.on('krijgen', 2)];
    const hlM = [0, 1, 2, 3, 4].map(i => { const t0 = [q.at('ademfrequentie', 1), q.at('saturatie', 1), q.at('pols', 1), q.at('bloeddruk', 1), q.at('temperatuur', 1)][i]; return clamp(1 - Math.abs(t - t0 - 0.6) / 1.4, 0, 1); }).concat([0, 0]);
    scoreTabel(ctx, 180, 270, SCORE, { a: q.on('Elke', 1), uO: q.on('Ochtends', 1), uM: ks, hlM, totO: q.on('één', 1), totM: q.on('zeven', 1) });
    const S2 = q.on('samen', 2); if (S2 > 0.01) { ctx.save(); ctx.globalAlpha *= S2; roundRect(ctx, 820, 278, 340, 7 * 56 + 96, 16); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    scoreMeter(ctx, 1350, 780, 520, q.on('Ochtends', 1), q.on('grens', 1), [[1, C.groen, 'ochtend 1', q.on('één', 1)], [7, '#E8675A', 'middag 7', q.on('zeven', 1)]]);
    naamBij(ctx, 'grens', 'arts bellen', 1420, 590, q.on('grens', 1), 'left'); klokje(ctx, 1750, 560, 34, clamp((t - q.at('vaste', 1)) / 3, 0, 1), q.on('vaste', 1) * (1 - V));
    persoon(ctx, 'jesse', 1800, 880, 470, { t, a: V, kijk: -1, pose: 'denk', uit: 'denkt' }); chip(ctx, 'niet pluis? ook bellen', 1760, 330, C.goud, q.on('lage', 1), 28); },

  // ---------- H4 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Kim', 1, 0.3);
    persoon(ctx, 'jesse', 520, 880, 520, { t, kijk: 1, pose: 'denk', uit: 'praat', hold: (c, x, y) => telefoon(c, x, y - 10, 1.4, 1, 0.3) });
    naamBij(ctx, 'Verpleegkundige Jesse', '', 520, 300, 1 - q.on('kort', 1), 'center');
    persoon(ctx, 'kim', 1400, 880, 520, { t, a: K, kijk: -1, pose: 'denk', uit: 'neutraal', hold: (c, x, y) => telefoon(c, x, y - 10, 1.4, 1, -0.3) });
    naamBij(ctx, 'Dr. Kim', 'arts', 1400, 300, K * (1 - q.on('kort', 1)), 'center'); belGolf(ctx, 700, 430, K, t, 1); belGolf(ctx, 1220, 430, K, t, -1);
    chip(ctx, 'kort', 880, 250, C.teal, q.on('kort', 1), 32); chip(ctx, 'niets vergeten', 1060, 250, C.teal, q.on('ontbreken', 1), 32); vraagteken(ctx, 960, 560, q.on('eerste', 1), 140); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const B = q.on('SBAR', 1);
    persoon(ctx, 'jesse', 230, 880, 440, { t, kijk: 1, pose: 'denk', uit: 'praat', hold: (c, x, y) => telefoon(c, x, y - 8, 1.2, 1, 0.3) });
    persoon(ctx, 'kim', 1720, 880, 440, { t, kijk: -1, pose: 'denk', uit: t > q.at('meteen', 1) ? 'blij' : 'neutraal', hold: (c, x, y) => telefoon(c, x, y - 8, 1.2, 1, -0.3) });
    const ts = [q.at('situatie', 1), q.at('achtergrond', 1), q.at('beoordeling', 1), q.at('aanbeveling', 1), q.at('Zo', 1)];
    const aan = i => { const nu = t >= ts[i] && t < ts[i + 1] ? 1 : t >= ts[i + 1] ? 0.4 : 0; return nu * clamp((t - ts[i]) / 0.5, 0, 1) + (t >= ts[4] ? 0.6 : 0); };
    const D = [['S', 'Situatie', 'wie je bent · over wie je belt · wat er is', C.teal], ['B', 'Achtergrond', 'sinds gisteren longontsteking · hartfalen', C.paars], ['A', 'Beoordeling', 'score van 1 naar 7 · longontsteking erger', C.oker], ['R', 'Aanbeveling', 'wilt u nu meteen komen kijken?', C.koraal]];
    D.forEach(([l, n, c, col], i) => sbarBlok(ctx, 420, 200 + i * 140, 1080, 120, l, n, c, B * clamp((t - q.at('SBAR', 1)) * 4 - i, 0, 1), clamp(aan(i), 0, 1), col));
    klokje(ctx, 960, 820, 40, clamp((t - q.at('minuut', 1)) / 1.5, 0, 1), q.on('minuut', 1)); regel(ctx, 'in één minuut', 1020, 834, q.on('minuut', 1), C.text, 34, 'left', 700); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('dagen', 1);
    persoon(ctx, 'kim', 330, 880, 500, { t, kijk: 1, pose: 'wijs', uit: D > 0.5 ? 'blij' : 'neutraal' }); naamBij(ctx, 'Dr. Kim', '', 330, 340, 1 - q.on('Henk', 1), 'center');
    henkInBed(ctx, 820, 880, 0.92, { t, adem: D > 0.5 ? 16 : 22, meter: 1, o2: q.on('zuurstof', 1), uit: D > 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'neusbrilletje', 'extra zuurstof', 765, 400, q.on('zuurstof', 1) * (1 - q.on('longfoto', 1)), 'right');
    longfoto(ctx, 1600, 300, 0.85, q.on('longfoto', 1)); naamBij(ctx, 'longfoto', '', 1600, 460, q.on('longfoto', 1) * (1 - D), 'center');
    infuus(ctx, 1170, 860, 1, q.on('antibioticum', 1), t); naamBij(ctx, 'antibioticum', 'aangepast', 1240, 520, q.on('antibioticum', 1) * (1 - D), 'left');
    scoreDagen(ctx, 1400, 520, 420, 240, D, clamp((t - q.at('dagen', 1)) / 1.6, 0, 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'jesse', 360, 880, 540, { t, kijk: 1, pose: 'vasthouden', hold: klembord, uit: 'blij' });
    [['meten', 'meten'], ['samen lezen', 'lezen'], ['op tijd bellen', 'bel']].forEach(([s2, w], i) => { const u = q.on(w, 1); if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; const x = 720 + i * 390; roundRect(ctx, x, 180, 350, 96, 14); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); circ(ctx, x + 46, 228, 26, rgba(C.goud, 0.7)); text(ctx, String(i + 1), x + 46, 240, fTekst(32, 800), '#1A2740', 'center'); text(ctx, s2, x + 90, 240, fTekst(34, 700), C.text, 'left'); ctx.restore(); });
    const mb = q.on('mbo', 1), hb = q.on('hbo', 1), vw = q.on('vwo', 1);
    paneel(ctx, 720, 360, 520, 300, 'MBO', mb); regel(ctx, 'mbo-verpleegkunde', 980, 480, mb, C.text, 40, 'center', 800); regel(ctx, 'niveau 4 · vier jaar', 980, 550, mb, C.text2, 32, 'center', 600);
    paneel(ctx, 1300, 360, 520, 300, 'HBO', hb); regel(ctx, 'hbo-verpleegkunde', 1560, 480, hb, C.text, 40, 'center', 800); regel(ctx, 'bachelor · vier jaar', 1560, 550, hb, C.text2, 32, 'center', 600);
    if (vw > 0.01) { ctx.save(); ctx.globalAlpha *= vw; roundRect(ctx, 1300, 360, 520, 300, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } tag(ctx, 'met een vwo-diploma', 1560, 630, C.goud, vw, 'center', 28);
    regel(ctx, 'beide: BIG-geregistreerd verpleegkundige', 1270, 760, q.on('jaar', 2), C.text2, 30, 'center', 600); }
});

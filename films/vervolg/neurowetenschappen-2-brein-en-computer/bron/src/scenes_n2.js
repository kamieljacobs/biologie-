// Wat word jij? · Neurowetenschappen · Brein en computer — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Daan, Dr. Kim).
// Rode draad: Daans telefoon die zijn kattenfoto's vindt.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }

// perceptron-training: vaste startgewichten, leerregel w += 0,25·(doel − uit)·x, drempel 0,5 (uitkomst 1 = kruis)
const P_START = [-0.35, 0.36, -0.39, 0.48, -0.06, -0.38, 0.06, 0.48, 0.4];
const P_DATA = (() => { const out = []; const basis = [[KRUIS, 1], [RONDJE, 0]]; for (let i = 0; i < 40; i++) { const [p, d] = basis[i % 2]; const v = p.slice(); if (i > 3) { const idx = d ? [0, 2, 6, 8] : [1, 3, 5, 7]; v[idx[Math.floor(hash(i * 17 + 3) * 4)]] = 0; } out.push([v, d]); } return out; })();
const P_STAPPEN = (() => { let w = P_START.slice(); const st = [{ w: w.slice(), fout: 0 }]; let fout = 0; P_DATA.forEach(([x, d]) => { const s = x.reduce((a, xi, i) => a + xi * w[i], 0); const y = s >= 0.5 ? 1 : 0; if (y !== d) { fout++; w = w.map((wi, i) => wi + 0.25 * (d - y) * x[i]); } st.push({ w: w.slice(), fout, goed: y === d }); }); return st; })();
function pUit(w, x) { return x.reduce((a, xi, i) => a + xi * w[i], 0) >= 0.5 ? 'kruis' : 'rondje'; }
function foutGrafiek(ctx, x, y, w, h, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'PLAATJES', 'FOUTEN PER 10'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath();
  for (let b = 0; b < 4; b++) { if (b * 10 > n) break; let f = 0; for (let i = b * 10 + 1; i <= Math.min(n, b * 10 + 10); i++) if (P_STAPPEN[i] && !P_STAPPEN[i].goed) f++; const px = x + (b + 0.5) * w / 4, py = y + h - f / 6 * h; b ? ctx.lineTo(px, py) : ctx.moveTo(px, py); circ(ctx, px, py, 7, C.koraal); } ctx.stroke(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { netwerkje(ctx, 1150, 420, 600, 420, 1, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'daan', 340, 880, 540, { t, pose: 'vasthouden', hold: (c, hx, hy) => { c.save(); roundRect(c, hx - 18, hy - 32, 36, 64, 6); shape(c, '#20242E', '#6A7080', 2); c.restore(); } }); naamBij(ctx, 'Daan', 'zoekt zijn kattenfoto\'s', 110, 280, q.on('Daan', 1));
    galerijTelefoon(ctx, 860, 480, 0.95, 1, q.on('typt', 1), t); chip(ctx, 'nooit een naam gegeven', 860, 870, C.text2, q.on('naam', 1), 28);
    netwerkje(ctx, 1200, 260, 560, 420, q.on('programma', 1), t); naamBij(ctx, 'neuraal netwerk', 'naar de neuronen genoemd', 1280, 740, q.on('neuraal', 1)); vraagteken(ctx, 1800, 200, q.on('Leert', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const op = q.on('telt', 1);
    const ins = [{ an: 2.5, w: 2, on: q.on('prikkelen', 1) }, { an: 3.0, w: 2, on: q.on('prikkelen', 1) }, { an: 3.55, w: 1, on: q.on('prikkelen', 1) }, { an: 4.05, w: -1, on: q.on('remmen', 1) }];
    neuronSom(ctx, 760, 480, 1.05, 1, { ins, som: 4 * clamp((t - q.at('telt', 1)) / 2, 0, 1), toonSom: op, drempel: 3, vuur: clamp((t - q.at('vuurt', 1)) / 1.5, 0, 1) * (t < q.at('niet', 1) ? 1 : 0), t });
    naamBij(ctx, 'synapsen', 'duizenden per neuron', 520, 720, q.on('duizenden', 1), 'right'); naamBij(ctx, 'cellichaam', 'telt op', 700, 360, op); chip(ctx, 'boven de drempel: pulsje, altijd even groot', 1380, 300, C.goud, q.on('drempel', 1), 28); chip(ctx, 'eronder: niets', 1380, 380, C.text2, q.on('niet', 1), 28); chip(ctx, 'film: Het kabelnetwerk', 1380, 760, C.teal, q.on('kabelnetwerk', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MCCULLOCH & PITTS · 1943', 120, 140, C.grain, 'left', 30); const P = q.on('Probeer', 1, 0.6);
    mpModel(ctx, 380, 300, 1, { w: [2, 2, 1, -3], ins: P, som: q.on('optellen', 1), uit: 0, drempel: 3 });
    chip(ctx, 'later: gewichten · plus prikkelt, min remt', 960, 820, C.teal, q.on('Latere', 1) * (1 - P), 28);
    tag(ctx, 'som op of boven de drempel → 1', 1380, 640, C.goud, q.on('uitkomst', 1) * (1 - P), 'center', 30); tag(ctx, 'som onder de drempel → 0', 1380, 720, C.text2, q.on('Eronder', 1) * (1 - P), 'center', 30);
    chip(ctx, 'drempel = 3', 1060, 230, C.goud, q.on('drempel', 3), 30); vraagteken(ctx, 1520, 480, q.on('Vuurt', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); mpModel(ctx, 380, 300, 1, { w: [2, 2, 1, -3], ins: 1, som: 1, uit: q.on('drempel', 1), uitW: '0', drempel: 3 });
    regel(ctx, '2 + 2 + 1 = 5', 1440, 300, q.on('vijf', 1), C.groen, 44, 'left', 700); regel(ctx, '5 − 3 = 2', 1440, 380, q.on('min', 1), C.koraal, 44, 'left', 700); regel(ctx, '2 < 3 → 0', 1440, 460, q.on('drempel', 1), C.goud, 44, 'left', 700);
    tag(ctx, 'alles of niets: geen half pulsje', 960, 760, C.text2, q.on('alles', 1), 'center', 30); tag(ctx, 'echt neuron: ook plek en timing tellen', 960, 840, C.teal, q.on('ingewikkelder', 1), 'center', 28); },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Rosenblatt', 1, 0.8);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; const u = q.on('sterker', 1, 2); synapsLijn(ctx, 520, 360, 1, u); gewichtLijn(ctx, 1000, 460, 1600, 460, 0.1 + 0.8 * u, q.on('gewicht', 1)); regel(ctx, 'synaps sterker', 520, 700, q.on('sterker', 1), C.text, 34, 'center', 700); regel(ctx, 'gewicht groter', 1300, 560, q.on('gewicht', 1), C.teal, 34, 'center', 700); chip(ctx, 'film: Leren en onthouden', 520, 200, C.teal, 1, 28); ctx.restore(); }
    if (R > 0.01) { metaText(ctx, 'ROSENBLATT · 1958 · PERCEPTRON', 120, 140, C.grain, 'left', 30); const pix = q.on('gokt', 1) > 0.5 ? RONDJE : KRUIS; const zegt = q.on('zegt', 2) > 0.5;
      perceptron(ctx, 300, 300, R, { pix, gew: P_START, uit: zegt ? 'kruis' : '', uitCol: C.text, goed: zegt ? (q.on('was', 1) > 0.5 ? 0 : -1) : -1, lijnen: q.on('zwart', 1) });
      chip(ctx, 'boven de drempel: kruis · eronder: rondje', 1320, 760, C.goud, q.on('drempel', 1), 28); chip(ctx, 'gewichten willekeurig', 1320, 840, C.text2, q.on('willekeurig', 1), 28); tag(ctx, 'maar het was een rondje', 1500, 300, C.koraal, q.on('was', 1), 'center', 30); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const L = q.on('tientallen', 1, 0.6), V = q.on('verschoven', 1, 0.6);
    const w1 = P_STAPPEN[2].w, w0 = P_STAPPEN[1].w; const u = q.on('zwakker', 1, 1.2); const w = P_START.map((g, i) => g + (w1[i] - w0[i]) * u);
    if (L < 0.99) { perceptron(ctx, 300, 300, 1 - L, { pix: q.on('Zegt', 2) > 0.5 ? KRUIS : RONDJE, gew: w, uit: '', lijnen: 1 }); chip(ctx, 'kruis bij een rondje → zwakker', 1400, 260, C.koraal, q.on('zwakker', 1) * (1 - L), 28); chip(ctx, 'rondje bij een kruis → sterker', 1400, 340, C.groen, q.on('sterker', 1) * (1 - L), 28); }
    if (L > 0.01) { const n = clamp(Math.floor((t - q.at('tientallen', 1)) * 6), 0, 40); const S = P_STAPPEN[n]; const [pix] = P_DATA[Math.max(0, n - 1)];
      perceptron(ctx, 220, 300, L * (1 - V), { pix, gew: S.w, uit: n ? pUit(S.w, pix) : '', goed: n ? (S.goed ? 1 : 0) : -1 }); foutGrafiek(ctx, 1260, 300, 520, 300, n, L * (1 - V)); regel(ctx, 'plaatje ' + n, 1520, 700, L * (1 - V), C.text2, 30, 'center', 600);
      if (V > 0.01) { perceptron(ctx, 300, 300, V, { pix: KRUIS2, gew: P_STAPPEN[40].w, uit: pUit(P_STAPPEN[40].w, KRUIS2), goed: 1 }); chip(ctx, 'nooit gezien: kruis met een verschoven hokje', 1400, 260, C.goud, V, 28); haak(ctx, 1180, 1700, 640, 'de kennis zit in de gewichten', C.groen, q.on('kennis', 1)); } } },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('eerste', 1) + q.on('volgende', 1) + q.on('oren', 1);
    lagenNetwerk(ctx, 160, 220, 1, k, t); chip(ctx, 'niet ingeprogrammeerd: ontstaat tijdens het leren', 960, 160, C.goud, q.on('ingeprogrammeerd', 1), 28); chip(ctx, 'Hubel en Wiesel: visuele schors, eerst randjes', 960, 840, C.teal, q.on('Hubel', 1), 28); },

  s12(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'kind', 480, 880, 320, { t, uit: 'blij' }); naamBij(ctx, 'een kind', '', 560, 560, q.on('kind', 1)); netwerkje(ctx, 1100, 300, 560, 380, q.on('netwerk', 1), t); naamBij(ctx, 'netwerk', 'leert vanaf nul', 1200, 760, q.on('netwerk', 1)); vraagteken(ctx, 960, 480, q.on('voorbeelden', 1), 120); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const E = q.on('Eerlijk', 1, 0.8);
    persoon(ctx, 'kind', 360, 880, 320, { t, uit: 'blij' }); stippen(ctx, 560, 520, 3, 3, C.groen, q.on('paar', 1), 3, 18, 50); regel(ctx, 'een paar keer', 610, 600, q.on('paar', 1), C.groen, 30, 'center', 700);
    ctx.save(); ctx.globalAlpha *= q.on('duizend', 1); for (let i = 0; i < 400; i++) circ(ctx, 1050 + (i % 25) * 28, 280 + Math.floor(i / 25) * 26, 6, rgba(C.teal, 0.8)); ctx.restore(); regel(ctx, '± duizend foto\'s per soort · ruim een miljoen totaal', 1400, 740, q.on('miljoen', 1), C.teal, 30, 'center', 700);
    tag(ctx, 'maar: een kind begint niet bij nul', 960, 820, C.goud, E, 'center', 30); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('derde', 1, 0.6);
    vergKaart(ctx, 160, 260, 760, 260, 'hersenen', ['± 20 watt', 'minder dan een laptop'], C.groen, q.on('twintig', 1)); vergKaart(ctx, 1000, 260, 760, 260, 'groot AI-model trainen', ['duizenden chips tegelijk', 'honderdduizenden keren zoveel'], C.koraal, q.on('chips', 1));
    regel(ctx, 'energie', 960, 200, 1 - F, C.text2, 30, 'center', 700); ctx.save(); ctx.globalAlpha *= F; ctx.fillStyle = C.bgSchema; ctx.fillRect(140, 180, 1640, 380); ctx.restore();
    if (F > 0.01) { vergKaart(ctx, 160, 260, 760, 260, 'fout terug', ['door alle lagen uitgerekend', 'hersenen: nog onbekend'], C.paars, F); vergKaart(ctx, 1000, 260, 760, 260, 'signalen', ['neuronen: pulsjes op tijd', 'netwerk: getallen'], C.teal, q.on('pulsjes', 1)); spikeSpoor(ctx, 1080, 680, 600, [0.1, 0.18, 0.45, 0.5, 0.62, 0.9], q.on('pulsjes', 1), 1); } },

  // ---------- H4 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('programmeren', 1, 0.6);
    doolhof(ctx, 140, 190, 520, 1, clamp(t / 20, 0, 1)); metaA(ctx, 'MUIS IN EEN DOOLHOF', 400, 170, 1, C.grain, 'center', 26);
    meetNaald(ctx, 900, 230, 360, q.on('naald', 1), t, 1); chip(ctx, 'honderden neuronen · 30.000 keer per seconde', 1040, 640, C.goud, q.on('dertigduizend', 1), 26);
    pulsRijen(ctx, 1240, 230, 560, 14, q.on('uur', 1), 1, q.on('samen', 1) > 0.5 ? [2, 5, 9] : []); metaA(ctx, 'ELKE RIJ = ÉÉN CEL', 1520, 200, q.on('uur', 1), C.grain, 'center', 26);
    ctx.save(); ctx.translate(140, 610); ctx.scale(0.66, 0.66); codeVenster(ctx, 0, 0, 900, P, clamp((t - q.at('programmeren', 1)) * 1.5, 0, 6)); ctx.restore();
    persoon(ctx, 'kim', 1440, 880, 270, { t, a: q.on('Kim', 1), kijk: -1 }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1140, 760, q.on('Kim', 1)); persoon(ctx, 'daan', 1680, 880, 240, { t, a: q.on('Daan', 1), kijk: -1 }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); brein(ctx, 640, 480, 1.1, 1); chipje(ctx, 600, 330, 0.9, q.on('chipje', 1), t, 1); naamBij(ctx, 'bewegingsschors', 'stuurt bewegingen', 700, 230, q.on('bewegingen', 1)); chip(ctx, 'bijna 100 meetpuntjes · tientallen cellen', 640, 780, C.goud, q.on('meetpuntjes', 1), 28);
    robotArm(ctx, 1460, 760, 0.8, q.on('andere', 1), 0); chip(ctx, 'van hersenen naar apparaat', 1460, 200, C.teal, q.on('apparaat', 1), 28); vraagteken(ctx, 1100, 480, q.on('beweging', 2), 110); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const R = q.on('robotarm', 1, 0.6);
    pulsRijen(ctx, 160, 300, 640, 10, 1, 1, []); pijl(ctx, 830, 420, 960, 420, C.line, q.on('leert', 1), 3, 14); vergKaart(ctx, 980, 300, 520, 240, 'programma', ['patroon → beweging', 'met gewichten'], C.teal, q.on('patroon', 1));
    robotArm(ctx, 1640, 800, 0.7, R, clamp((t - q.at('robotarm', 1)) / 3, 0, 1)); chip(ctx, 'in het jaar 2011: zelf koffie drinken', 1300, 700, C.goud, q.on('koffie', 1), 28); chip(ctx, 'nog experimenteel', 1300, 780, C.text2, q.on('experimenteel', 1), 28); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); galerijTelefoon(ctx, 300, 470, 0.8, 1, 1, t); vergKaart(ctx, 560, 230, 560, 300, 'gebruikt', ['neuron als rekensom', 'lagen', 'gewichten aanpassen'], C.groen, q.on('Deels', 1)); vergKaart(ctx, 1180, 230, 600, 300, 'maar anders', ['vanaf nul: veel meer voorbeelden', 'veel meer energie', 'fout precies terugrekenen'], C.koraal, q.on('Maar', 1)); },
  s21(ctx, t, q) { bg(ctx, 'schema'); vergKaart(ctx, 240, 220, 680, 200, 'modellen', ['om de hersenen te begrijpen'], C.paars, q.on('Modellen', 1)); vergKaart(ctx, 1000, 220, 680, 200, 'programmeren', ['om metingen te lezen'], C.teal, q.on('programmeren', 1));
    ['biologie', 'psychologie', 'natuurkunde', 'informatica', 'kunstmatige intelligentie'].forEach((s2, i) => { tag(ctx, s2, 260 + i * 350, 560, C.teal, q.on(s2.split(' ')[0], 1), 'center', 28); pijl(ctx, 260 + i * 350, 590, 960 + (i - 2) * 60, 690, C.line, q.on('master', 1), 2.5, 12); }); tag(ctx, 'master neurowetenschappen', 960, 760, C.goud, q.on('master', 1), 'center', 34); }
});

// Wat word jij? · Geneeskunde en Farmacie · Welk antibioticum? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Noor als patiënt, Dr. Kim als huisarts in outfit 'gewoon').
// Rode draad: Noor met een blaasontsteking; lab en apotheek zonder personen, alleen hun werk (voedingsbodem, schijfjes, doosjes, medicatie, nieren).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// schijfjes van het antibiogram (zelfde ligging in H2, H2-antwoord, titel en recap): NIT zonder ring, AMX ring te klein
const SCHIJF = [{ dx: -150, dy: -130, code: 'NIT', ring: 0, naam: 'nitrofurantoïne' }, { dx: 150, dy: -120, code: 'FOS', ring: 95, naam: 'fosfomycine' }, { dx: -170, dy: 120, code: 'AMX', ring: 42, naam: 'amoxicilline' },
  { dx: 160, dy: 140, code: 'TMP', ring: 82, naam: 'trimethoprim' }, { dx: 0, dy: 10, code: 'CIP', ring: 105, naam: 'ciprofloxacine' }];
const GRENS = { NIT: 60, FOS: 70, AMX: 56, TMP: 60, CIP: 75 }; // schematisch, in px
function schijven(alpha = 1, lift = null) { return SCHIJF.map((s, i) => Object.assign({}, s, { a: Array.isArray(alpha) ? alpha[i] : alpha, lift: lift ? lift[i] : 0 })); }
// spreekkamer: Dr. Kim achter het bureau links, Noor rechts
function spreekkamer(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  persoon(ctx, 'kim', 330, 880, 560, { t, outfit: 'gewoon', pose: o.poseK || 'staan', kijk: 1, uit: o.uitK || 'neutraal' }); bureau(ctx, 120, 640, 520);
  persoon(ctx, 'noor', 1640, 880, 520, { t, kijk: -1, uit: o.uitN || 'neutraal', pose: o.poseN || 'staan' }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { petri(ctx, 1620, 580, 220, 1, { gazon: 1, schijf: schijven(), ringU: 0.85 + 0.15 * Math.sin(t * 0.6) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('tientallen', 1, 0.8);
    spreekkamer(ctx, t, { uitN: q.on('brandt', 1) > 0.5 && B < 0.5 ? 'verbaasd' : 'neutraal', poseK: q.on('liefst', 1) > 0.5 ? 'denk' : (q.on('test', 1) > 0.5 && B < 0.5 ? 'vasthouden' : 'staan') });
    naamBij(ctx, 'Noor', 'patiënt', 1460, 300, q.on('Noor', 1), 'right'); naamBij(ctx, 'Dr. Kim', 'huisarts', 520, 280, q.on('Kim', 1), 'left');
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      chip(ctx, 'steeds plassen', 1440, 420, C.koraal, q.on('plassen', 1), 28); chip(ctx, 'het brandt', 1440, 490, C.koraal, q.on('brandt', 1), 28);
      urinePotje(ctx, 830, 560, 1.3, q.on('test', 1)); testStrip(ctx, 1010, 520, 1.1, q.on('urine', 1), clamp((t - q.at('urine', 1) - 0.4) / 0.8, 0, 1));
      tag(ctx, 'blaasontsteking', 930, 300, C.goud, q.on('blaasontsteking', 1), 'center', 34);
      for (let i = 0; i < 5; i++) staafje(ctx, 800 + i * 60, 380 + (i % 2) * 22, 1.1, 0.3 * i, ECOLI, q.on('bacterie', 1) * clamp((t - q.at('bacterie', 1)) * 4 - i * 0.6, 0, 1));
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const D = q.on('Sommige', 1, 0.8);
      for (let i = 0; i < 18; i++) { const r = Math.floor(i / 6), c = i % 6; medDoos(ctx, 760 + c * 82, 250 + r * 76, 62, '', [C.teal, C.paars, C.groen, C.oker, C.koraal][i % 5], clamp(B * 3 - i * 0.12, 0, 1) * (1 - D * 0.8)); }
      const dozen = [['breed', C.koraal, 'Sommige'], ['smal', C.teal, 'paar'], ['nieuwste', C.paars, 'liefst']];
      dozen.forEach(([n, col, w], i) => { const x = 760 + i * 210; medDoos(ctx, x, 560, 170, n, col, q.on(w, 1)); });
      // wat ze raken: breed bijna alles, smal een paar soorten
      const k1 = q.on('bijna', 1); [C.teal, C.groen, C.paars, '#C9A35C', ECOLI].forEach((c, i) => staafje(ctx, 690 + i * 36, 690, 0.7, 1.57, c, k1, k1 > 0.5 ? 1 : 0));
      const k2 = q.on('paar', 1); [C.teal, C.groen, C.paars, '#C9A35C', ECOLI].forEach((c, i) => staafje(ctx, 900 + i * 36, 690, 0.7, 1.57, c, k2, k2 > 0.5 && i === 4 ? 1 : 0));
      vraagteken(ctx, 1180, 520, q.on('denk', 1), 120); ctx.restore(); } },

  // ---------- H1 · waar een antibioticum aangrijpt ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const P1 = q.on('Penicilline', 1, 0.8), P2 = q.on('Jouw', 1, 0.8), P3 = q.on('virus', 1, 0.8);
    antwoord(ctx, 'Antwoord b', 1 - P1);
    // intro: één grote bacterie met de drie onderdelen
    if (P1 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P1; const A0 = q.on('aangrijpt', 1);
      bacterieGroot(ctx, 900, 480, 900, 380, 1, { wand: q.on('stevige', 1), t });
      naamBij(ctx, 'celwand', 'stevig', 1380, 300, q.on('stevige', 1)); naamBij(ctx, 'ribosomen', '', 1380, 470, A0 * 0.9); naamBij(ctx, 'DNA-ring', '', 1380, 600, A0 * 0.9);
      metaA(ctx, 'BACTERIE · SCHEMATISCH', 450, 250, A0); ctx.restore(); }
    // drie aangrijpingspunten naast elkaar
    if (P1 > 0.01 && P2 < 0.99) { ctx.save(); ctx.globalAlpha *= P1 * (1 - P2); const X = [360, 960, 1560];
      const kap = clamp((t - q.at('verstoort', 1)) / 3.2, 0, 1), rb = q.on('blokkeren', 1, 1.2), db = q.on('kopiëren', 1, 1.2);
      bacterieGroot(ctx, X[0], 420, 480, 220, 1, { wand: 1, kapot: kap, t }); bacterieGroot(ctx, X[1], 420, 480, 220, q.on('blokkeren', 1, 0.4), { ribo: 1, riboBlok: rb, eiwit: rb < 0.3, t }); bacterieGroot(ctx, X[2], 420, 480, 220, q.on('verstoren', 1, 0.4), { dna: 1, dnaBlok: db, t });
      for (let i = 0; i < 6; i++) { const f = clamp((t - q.at('Penicilline', 1)) / 1.4 - i * 0.08, 0, 1); abMol(ctx, X[0] - 200 + i * 80, 290 + (1 - f) * -60 + (i % 2) * 12, 1.2, f * (1 - kap), i); }
      tag(ctx, 'celwand', X[0], 620, WAND, 1, 'center', 32); tag(ctx, 'ribosomen', X[1], 620, C.ribo, q.on('blokkeren', 1), 'center', 32); tag(ctx, 'kopiëren van DNA', X[2], 620, C.kernR, q.on('verstoren', 1), 'center', 32);
      regel(ctx, 'penicilline', X[0], 210, q.on('Penicilline', 1), AB, 32, 'center', 700); regel(ctx, 'de bacterie knapt', X[0], 720, q.on('knapt', 1), C.text, 32, 'center', 700);
      regel(ctx, 'geen eiwitten meer', X[1], 720, q.on('eiwitten', 1), C.text, 32, 'center', 700); regel(ctx, 'geen kopie', X[2], 720, q.on('kopiëren', 1), C.text, 32, 'center', 700);
      tag(ctx, 'film: Van DNA naar eiwit', X[1], 820, C.teal, q.on('eiwitten', 1), 'center', 26); ctx.restore(); }
    // bacterie tegenover mensencel
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2 * (1 - P3);
      bacterieGroot(ctx, 520, 430, 620, 280, 1, { wand: 1, ribo: q.on('anders', 1), t }); mensCel(ctx, 1380, 440, 250, 1, t, q.on('anders', 1));
      naamBij(ctx, 'bacterie', 'celwand · kleine ribosomen', 520, 650, 1, 'center'); naamBij(ctx, 'jouw cel', 'geen celwand · grotere ribosomen', 1380, 760, q.on('Jouw', 1), 'center');
      vink_(ctx, 1680, 230, 34, q.on('rust', 1)); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; virusDeeltje(ctx, 960, 450, 1.7, 1, t); naamBij(ctx, 'virus', 'geen celwand · geen ribosomen', 960, 690, 1, 'center');
      const G = q.on('griep', 1); for (let i = 0; i < 3; i++) abMol(ctx, 700 + i * 30, 300 + i * 40, 1.5, G, i); kruis(ctx, 760, 350, 50, G); tag(ctx, 'antibioticum helpt niet tegen griep', 960, 820, C.koraal, G, 'center', 30); ctx.restore(); } },

  // ---------- H2 · kweek en antibiogram ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('lab', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L;
      blaas(ctx, 420, 470, 1.15, 1, 9, 0, t); naamBij(ctx, 'E. coli', 'uit je eigen darm', 420, 760, q.on('coli', 1), 'center', ECOLI); metaA(ctx, 'BLAASONTSTEKING · MEESTAL DEZELFDE BACTERIE', 120, 180, 1);
      medDoos(ctx, 960, 470, 220, 'smal', C.teal, q.on('kiezen', 1), q.on('kiezen', 1), 'eerste keus'); tag(ctx, 'nog zonder uitslag', 960, 660, C.text2, q.on('uitslag', 1), 'center', 28);
      const N = q.on('Noor', 1, 0.3); persoon(ctx, 'noor', 1560, 880, 520, { t, a: N, kijk: -1, uit: 'neutraal', pose: 'schouders' });
      [0, 1, 2].forEach(d => { const f = clamp((t - q.at('drie', 1)) * 3 - d, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, 1170 + d * 70, 330, 60, 70, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(1170 + d * 70, 330, 60, 16); text(ctx, String(d + 1), 1200 + d * 70, 386, fTekst(30, 800), '#1A2740', 'center'); ctx.restore(); });
      tag(ctx, 'gaat niet over', 1270, 460, C.koraal, q.on('over', 1), 'center', 28); urinePotje(ctx, 1080, 760, 0.9, q.on('urine', 1) * clamp(1 - (t - q.at('lab', 1) + 0.6) * 1.5, 0, 1)); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; metaA(ctx, 'MEDISCH-MICROBIOLOGISCH LAB', 120, 160, 1);
      const G = q.on('groeit', 1, 2), S = q.at('schijfjes', 1), R = q.on('Waar', 1, 2.4), Rd = q.on('Rond', 1);
      broedstoof(ctx, 1460, 220, q.on('groeit', 1) * (1 - q.on('analist', 1)), 1); tag(ctx, 'een nacht bij 37 °C', 1610, 640, C.text2, q.on('voedingsbodem', 1) * (1 - q.on('analist', 1)), 'center', 26);
      const al = SCHIJF.map((_, i) => clamp((t - S) * 1.6 - i * 0.55, 0, 1)), lift = al.map(f => (1 - f) * 120);
      petri(ctx, 780, 470, 330, 1, { kolonies: R > 0.01 ? 0 : 26, groei: G, gazon: R, schijf: schijven(al, lift), ringU: R, hl: Rd > 0.5 ? 0 : -1 });
      naamBij(ctx, 'voedingsbodem', 'met bacteriën uit de urine', 780, 860, q.on('voedingsbodem', 1) * (1 - q.on('schijfjes', 1)), 'center');
      const cur = al.findIndex(f => f < 1); if (cur >= 0 && al[cur] > 0) { const s = SCHIJF[cur]; pincet(ctx, 780 + s.dx, 470 + s.dy - lift[cur], 1); }
      naamBij(ctx, 'schijfjes', 'elk een ander antibioticum', 1180, 330, q.on('ander', 1)); naamBij(ctx, 'heldere ring', 'hier groeit niets', 1180, 560, q.on('groeien', 1));
      if (Rd > 0.01) { tag(ctx, 'geen ring', 1260, 760, C.goud, Rd, 'center', 30); } vraagteken(ctx, 1640, 520, q.on('denk', 1), 120); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const Gr = q.on('grens', 1, 0.8), Ab = q.on('antibiogram', 1, 0.8);
    const X = 700, Y = 480; petri(ctx, X, Y, 330, 1, { gazon: 1, schijf: schijven(), hl: Gr > 0.5 ? 1 : 0 });
    // inzoomen op het schijfje zonder ring: bacteriën tot tegen het schijfje
    if (Gr < 0.99) { ctx.save(); ctx.globalAlpha *= q.on('groeien', 1) * (1 - q.on('Per', 1, 0.6)); circ(ctx, 1420, 420, 200, AGAR, C.goud, 3); ctx.save(); ctx.beginPath(); ctx.arc(1420, 420, 196, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba(GAZON, 0.85); ctx.fillRect(1220, 220, 400, 400);
      for (let i = 0; i < 40; i++) { const an = hash(i * 3 + 1) * 6.283, d = 70 + hash(i * 3 + 2) * 130; staafje(ctx, 1420 + Math.cos(an) * d, 420 + Math.sin(an) * d, 0.8, an, ECOLI, 1); }
      circ(ctx, 1420, 420, 60, '#FFFFFF', '#C9CED6', 2); text(ctx, 'NIT', 1420, 434, fTekst(36, 800), '#1A2740', 'center'); ctx.restore();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X - 150 + 30, Y - 130 - 20); ctx.lineTo(1250, 330); ctx.stroke(); ctx.setLineDash([]);
      tag(ctx, 'werkt niet bij Noor', 1420, 700, C.koraal, q.on('Noor', 1), 'center', 30); ctx.restore(); }
    // grens per middel: liniaal over de ring van FOS
    if (Gr > 0.01 && Ab < 0.99) { ctx.save(); ctx.globalAlpha *= Gr * (1 - Ab); const s = SCHIJF[1], cx = X + s.dx, cy = Y + s.dy;
      liniaal(ctx, cx - s.ring, cy + 30, 2 * s.ring + 8, q.on('heldere', 1), 2 * s.ring / 26);
      ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(cx, cy, GRENS.FOS, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'grens', 'per middel anders', 1180, 300, 1); naamBij(ctx, 'ring groot genoeg', 'gevoelig', 1180, 420, q.on('genoeg', 1), 'left', C.groen); ctx.restore(); }
    // antibiogram: tabel
    if (Ab > 0.01) { ctx.save(); ctx.globalAlpha *= Ab; const tx = 1180, ty = 230; roundRect(ctx, tx, ty, 600, 470, 16); shape(ctx, '#F2EEE4', '#B8B0A0', 2); metaText(ctx, 'ANTIBIOGRAM · E. COLI', tx + 30, ty + 50, '#5A6478', 'left', 24);
      SCHIJF.forEach((s, i) => { const ok = s.ring >= GRENS[s.code], yy = ty + 120 + i * 72, f = clamp((t - q.at('antibiogram', 1)) * 2.5 - i * 0.5, 0, 1); ctx.save(); ctx.globalAlpha *= f; text(ctx, s.naam, tx + 30, yy, fTekst(30, 700), '#1A2740', 'left'); roundRect(ctx, tx + 440, yy - 34, 130, 46, 10); shape(ctx, rgba(ok ? C.groen : C.koraal, 0.35), ok ? '#3E8A55' : '#B9452F', 2); text(ctx, ok ? 'gevoelig' : 'resistent', tx + 505, yy - 3, fTekst(22, 800), '#1A2740', 'center'); ctx.restore(); });
      tag(ctx, 'de arts kan gericht kiezen', 960, 850, C.goud, q.on('gericht', 1), 'center', 30); ctx.restore(); } },

  // ---------- H3 · smal of breed ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Daarom', 1, 0.8), NL = q.on('Nederland', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; const Br = q.on('breed', 2, 2), Gw = clamp((t - q.at('ruimte', 1) + 0.6) / 4, 0, 1);
      medDoos(ctx, 1100, 270, 180, 'breed', C.koraal, q.on('breedste', 1)); darmVenster(ctx, 560, 470, 330, 1, { breed: Br, groei: Gw, hlRes: q.on('toevallig', 1) * (1 - Gw), t });
      naamBij(ctx, 'darm', 'veel soorten bacteriën', 560, 860, q.on('darm', 1) * 0.95, 'center');
      for (let i = 0; i < 6; i++) { const f = clamp(Br * 1.5 - i * 0.1, 0, 1); abMol(ctx, 900 - f * 240 + i * 14, 300 + i * 50 + f * 40, 1.3, f * (1 - Br * 0.6), i); }
      naamBij(ctx, 'toevallig resistent', 'blijft over', 1120, 470, q.on('toevallig', 1), 'left', '#F08A70'); tag(ctx, 'krijgt alle ruimte', 1250, 590, '#D8573F', q.on('ruimte', 1), 'center', 28);
      tag(ctx, 'film: Selectie van dichtbij', 1250, 680, C.teal, q.on('Selectie', 1), 'center', 26);
      const J = q.on('jij', 1, 0.4); persoon(ctx, 'noor', 1680, 880, 420, { t, a: J, kijk: -1, uit: 'neutraal' }); kruis(ctx, 1680, 420, 30, J); regel(ctx, 'Noor: niet resistent', 1680, 360, J, C.text, 32, 'center', 700);
      vink_(ctx, 1250, 780, 22, q.on('bacteriën', 2)); regel(ctx, 'de bacteriën wel', 1285, 790, q.on('bacteriën', 2), C.text, 28, 'left', 700); ctx.restore(); }
    if (D > 0.01 && NL < 0.99) { ctx.save(); ctx.globalAlpha *= D * (1 - NL); const T = q.on('terechtkomt', 1, 1.5);
      medDoos(ctx, 960, 270, 180, 'smal', C.teal, 1, 1); darmVenster(ctx, 440, 520, 250, 1, { t }); naamBij(ctx, 'darm', 'blijft gespaard', 440, 840, T, 'center'); vink_(ctx, 640, 330, 26, T);
      blaas(ctx, 1380, 520, 1.0, 1, 9, T, t); naamBij(ctx, 'blaas', 'hier komt het middel', 1380, 800, q.on('blaasontsteking', 1), 'center');
      for (let i = 0; i < 6; i++) { const f = clamp(T * 1.5 - i * 0.1, 0, 1); abMol(ctx, 1080 + f * 230 + (i % 3) * 30, 320 + f * 120 + i * 20, 1.2, f * (1 - T * 0.5), i, C.teal); }
      const K = q.on('kort', 1); klokje(ctx, 960, 560, 60, 0.18, K); regel(ctx, 'zo kort als het kan', 960, 680, K, C.text, 30, 'center', 700); ctx.restore(); }
    if (NL > 0.01) { ctx.save(); ctx.globalAlpha *= NL; metaA(ctx, 'SCHEMATISCH · ZONDER GETALLEN', 360, 200, 1);
      regel(ctx, 'antibioticagebruik', 360, 290, 1, C.text, 34, 'left', 700); gebruikStaaf(ctx, 560, 330, 1000, 0.42 * q.on('weinig', 1, 1.2), C.teal, 'Nederland', 1); gebruikStaaf(ctx, 560, 410, 1000, 0.85 * q.on('weinig', 1, 1.2), C.oker, 'veel andere landen', 1);
      const Z = q.on('zeldzamer', 1, 1.2); regel(ctx, 'resistentie', 360, 560, q.on('resistentie', 1), C.text, 34, 'left', 700); gebruikStaaf(ctx, 560, 600, 1000, 0.18 * Z, C.teal, 'Nederland', q.on('resistentie', 1)); gebruikStaaf(ctx, 560, 680, 1000, 0.6 * Z, C.oker, 'veel andere landen', q.on('resistentie', 1));
      ctx.restore(); } },

  // ---------- H4 · als bijna niets meer werkt ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('MRSA', 1), Bu = q.on('buitenlands', 1, 0.8);
    metaA(ctx, 'ZIEKENHUIS', 120, 160, 1);
    if (Bu < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Bu; for (let i = 0; i < 4; i++) bedTop(ctx, 360 + i * 200, 690, 1); for (let i = 0; i < 4; i++) medDoos(ctx, 360 + i * 200, 380, 150, '', [C.teal, C.paars, C.groen, C.oker][i], q.on('gewone', 1)); for (let i = 0; i < 4; i++) kruis(ctx, 360 + i * 200, 370, 34, q.on('werken', 1) * clamp((t - q.at('werken', 1)) * 3 - i * 0.4, 0, 1));
      staphTros(ctx, 1380, 430, 3.2, M); naamBij(ctx, 'MRSA', 'Staphylococcus aureus · resistent', 1380, 680, M, 'center'); ctx.restore(); }
    if (Bu > 0.01) { ctx.save(); ctx.globalAlpha *= Bu; const Ap = q.on('apart', 1, 1.2), W = q.on('wattenstaafje', 1);
      tag(ctx, 'uit een buitenlands ziekenhuis', 480, 260, C.oker, 1, 'center', 30);
      isolatieDeur(ctx, 340, 340, 1, Ap, q.on('apart', 1)); naamBij(ctx, 'apart verplegen', 'eigen kamer', 700, 520, q.on('verpleegd', 1));
      wattenstaaf(ctx, 1160, 360, W, -0.35); kweekBuis(ctx, 1420, 520, W); naamBij(ctx, 'neus en keel', 'kweek in het lab', 1300, 760, q.on('neus', 1), 'center');
      staphTros(ctx, 1600, 330, 1.4, q.on('draagt', 1)); regel(ctx, '?', 1660, 300, q.on('draagt', 1), C.goud, 50, 'center', 800);
      vraagteken(ctx, 1700, 620, q.on('denk', 1), 110); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const S0 = q.on('Arts', 1, 0.5), S = clamp((t - q.at('Arts', 1) - 0.5) / 0.6, 0, 1), Ap = q.on('controleert', 1, 0.8);
    if (S0 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S0; antwoord(ctx, 'Antwoord a'); const Da = q.on('Daarom', 1, 0.8), Hb = q.on('handen', 1);
      isolatieDeur(ctx, 240, 300, 1, Da, Da); tag(ctx, 'vaak niet eens ziek', 370, 260, C.text2, q.on('ziek', 1), 'center', 28); staphTros(ctx, 370, 560, 1.2, q.on('draagt', 1) * (1 - Da));
      const B = [[900, 380], [1150, 380], [1400, 380], [1650, 380]]; B.forEach(([bx, by], i) => bedTop(ctx, bx, by + 100, 1, q.on('besmetten', 1) * (1 - Da) * clamp((t - q.at('besmetten', 1)) * 2 - i * 0.4, 0, 1)));
      // pad via handen en materialen
      if (Hb > 0.01) { const u = clamp((t - q.at('handen', 1)) / 3, 0, 1) * (1 - Da); for (let k = 0; k < 10; k++) { const f = clamp(u * 1.4 - k * 0.04, 0, 1); if (f <= 0) continue; const px = 500 + f * 1150, py = 300 + Math.sin(f * 9 + k) * 30; circ(ctx, px - k * 14, py, 9, rgba('#D8A23C', 0.85 * (1 - Da))); } }
      tag(ctx, 'via handen en materialen', 1270, 260, '#D8A23C', Hb * (1 - Da), 'center', 28);
      flacon(ctx, 760, 760, q.on('ontsmetten', 1), 1, t); regel(ctx, 'handen ontsmetten', 840, 760, q.on('ontsmetten', 1), C.text, 30, 'left', 700); kweekBuis(ctx, 1240, 760, q.on('testen', 1)); regel(ctx, 'testen', 1290, 760, q.on('testen', 1), C.text, 30, 'left', 700); regel(ctx, 'apart verplegen', 370, 860, Da, C.text, 30, 'center', 700);
      ctx.restore(); }
    if (S > 0.01 && Ap < 0.99) { ctx.save(); ctx.globalAlpha *= S * (1 - Ap);
      beroepTegel(ctx, 440, 450, 'arts', 'behandelt', C.teal, q.on('Arts', 1), (x, y) => persoon(ctx, 'kim', x, y + 80, 220, { t, outfit: 'gewoon', uit: 'blij' }));
      beroepTegel(ctx, 960, 450, 'apotheker', 'controleert het middel', C.goud, q.on('apotheker', 1), (x, y) => vijzel(ctx, x, y, 1));
      beroepTegel(ctx, 1480, 450, 'microbioloog', 'kweek en antibiogram', ECOLI, q.on('microbioloog', 1), (x, y) => petri(ctx, x, y, 80, 1, { gazon: 1, schijf: [{ dx: -30, dy: -20, code: '', ring: 26 }, { dx: 30, dy: 25, code: '', ring: 0 }] }));
      regel(ctx, 'samen', 960, 720, q.on('samen', 1), C.goud, 40, 'center', 800); ctx.restore(); }
    if (Ap > 0.01) { ctx.save(); ctx.globalAlpha *= Ap; metaA(ctx, 'APOTHEEK', 120, 160, 1); vijzel(ctx, 1760, 200, 0.7, 1);
      medicatieLijst(ctx, 160, 260, 1, q.on('medicijnen', 1, 1.5), 1); naamBij(ctx, 'past het bij', 'andere medicijnen?', 160, 650, q.on('medicijnen', 1));
      const Ni = q.on('nieren', 1), Sl = q.on('slecht', 1, 0.6); nier(ctx, 860, 430, 1.1, Ni, Sl > 0.5 ? 0 : 1); naamBij(ctx, Sl > 0.5 ? 'nieren werken slecht' : 'nieren', '', 860, 650, Ni, 'center');
      bloedSpiegel(ctx, 1160, 300, 600, 340, Ni, clamp((t - q.at('nieren', 1)) / 1.5, 0, 1), clamp((t - q.at('langer', 1) + 0.6) / 2, 0, 1));
      naamBij(ctx, 'goede nieren', '', 1360, 720, Ni, 'left', C.groen); naamBij(ctx, 'slechte nieren', 'langer in het bloed', 1360, 800, q.on('langer', 1), 'left', '#F08A70'); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const W2 = q.on('werkte', 1);
    persoon(ctx, 'noor', 1620, 880, 540, { t, kijk: -1, uit: W2 > 0.5 ? 'lacht' : 'neutraal', pose: W2 > 0.5 ? 'handenHeup' : 'staan' }); naamBij(ctx, 'Noor', W2 > 0.5 ? 'weer fit' : '', 1440, 330, q.on('Noor', 1), 'right');
    medDoos(ctx, 300, 330, 190, 'NIT', C.teal, q.on('eerste', 1)); kruis(ctx, 300, 320, 40, q.on('hielp', 1));
    petri(ctx, 650, 560, 190, q.on('antibiogram', 1), { gazon: 1, schijf: schijven(), hl: q.on('ander', 1) > 0.5 ? 1 : -1 });
    medDoos(ctx, 1030, 330, 190, 'FOS', C.teal, q.on('ander', 1), q.on('ander', 1)); tag(ctx, 'smal en kort', 1030, 500, C.teal, q.on('smal', 1), 'center', 28); vink_(ctx, 1030, 580, 30, W2);
    chip(ctx, 'darmbacteriën gespaard', 1030, 820, C.groen, q.on('spaar', 1), 26); },
  s13(ctx, t, q) { bg(ctx, 'schema');
    beroepTegel(ctx, 400, 430, 'geneeskunde', 'arts · 6 jaar', C.teal, q.on('geneeskunde', 1), (x, y) => persoon(ctx, 'kim', x, y + 80, 220, { t, outfit: 'gewoon', uit: 'blij' }));
    beroepTegel(ctx, 960, 430, 'farmacie', 'apotheker · 6 jaar', C.goud, q.on('farmacie', 1), (x, y) => vijzel(ctx, x, y, 1));
    beroepTegel(ctx, 1520, 430, 'analist', 'mbo of hbo', ECOLI, q.on('analisten', 1), (x, y) => microscoopje(ctx, x, y, 1));
    regel(ctx, 'ook in een medisch lab: analist', 1520, 680, q.on('lab', 1), C.text2, 28, 'center', 600); }
});

// Wat word jij? · Laboratoriumtechniek 3 · Wat staat er op je bloeduitslag? — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim in labjas, Yasmin in practicumkleding).
// Rode draad: de vier buisjes van Opa Henk (paars, geel, grijs, paars) en één uitslagformulier. Getallen verzonnen maar realistisch (zie sections.html).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
const NAAM = 'H. de Vries';
const VIER = [['paars', 'bloedbeeld'], ['geel', 'chemie'], ['grijs', 'glucose'], ['paars', 'bloedbank']];
function vierBuisjes(ctx, x, y, dx, h, t, a = 1, hl = -1, o = {}) { if (a <= 0.01) return; rekje(ctx, x - 50, y + h - 60, dx * 3 + 100, a);
  VIER.forEach(([d, lab], i) => { const k = hl < 0 || hl === i ? 1 : 0.35; buis(ctx, x + i * dx, y, 52, h, d, { a: a * k, t, naam: NAAM, seed: i + 1 }); if (o.labels) regel(ctx, lab, x + i * dx, y + h + 52, a * o.labels * k, C.text2, 24, 'center', 600); }); }
// gestreepte pijl naar rechts (voor de stroom door de opening)
const STROOM = { x0: 760, x1: 1780, xo: 1270, y: 330 };
function celStroom(ctx, t, t0, a = 1, laser = false) { if (a <= 0.01) return; const v = 260; // px per seconde
  for (let i = 0; i < 140; i++) { const tp = t0 + i * 0.38; const x = STROOM.xo + (t - tp) * v; if (x < STROOM.x0 + 20 || x > STROOM.x1 - 20) continue; const soort = laser ? 'w' : (i % 9 === 4 ? 'p' : 'r');
    const d = Math.abs(x - STROOM.xo), ny = d < 120 ? 0 : (hash(i * 3) - 0.5) * 120 * clamp((d - 120) / 200, 0, 1); const y = STROOM.y + ny;
    if (soort === 'r') rbc3(ctx, x, y, 22, { a, rot: i, squash: 0.9 }); else if (soort === 'p') plaatje3(ctx, x, y, 9, { a, rot: i }); else { const rond = i % 3 === 1; wbc3(ctx, x, y, rond ? 24 : 32, t, { a, seed: i, rond }); } } }
function opening(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, STROOM.x0, STROOM.y - 160, STROOM.x1 - STROOM.x0, 320, 20); shape(ctx, rgba('#CFE4F0', 0.05), C.line, 2);
  ctx.fillStyle = '#4A5878'; ctx.fillRect(STROOM.xo - 16, STROOM.y - 160, 32, 125); ctx.fillRect(STROOM.xo - 16, STROOM.y + 35, 32, 125); ctx.restore(); }
function stroomSpoor(ctx, t, t0, a = 1) { if (a <= 0.01) return; const x0 = STROOM.x0, w = STROOM.x1 - STROOM.x0, y = 720, win = 7; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke(); text(ctx, 'stroomsignaal', x0, y - 150, fTekst(24, 600), C.text2, 'left');
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y);
  for (let i = 0; i < 140; i++) { const tp = t0 + i * 0.38; if (tp > t || tp < t - win) continue; const xx = x0 + w - (t - tp) / win * w; const hgt = i % 9 === 4 ? 30 : 105 + hash(i) * 15; ctx.lineTo(xx - 10, y); ctx.lineTo(xx, y - hgt); ctx.lineTo(xx + 10, y); }
  ctx.lineTo(x0 + w, y); ctx.stroke(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { vierBuisjes(ctx, 1220, 380, 150, 360, t, 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const Y = q.on('Yasmin', 1, 0.3), F = q.on('formulier', 1);
    persoon(ctx, 'kim', 250, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: t > q.at('onderzoeken', 1) ? 'wijs' : 'staan', a: 1 - Y });
    persoon(ctx, 'henk', 560, 880, 430, { t, kijk: 1 - 2 * Y, uit: 'moe' });
    naamBij(ctx, 'Opa Henk', 'moe en koorts', 650, 380, 1 - F, 'left'); naamBij(ctx, 'Dr. Kim', 'arts', 120, 390, q.on('Kim', 1) * (1 - Y), 'left');
    tag(ctx, 'volgende maand: nieuwe heup', 560, 300, C.teal, q.on('heup', 1) * (1 - F), 'center', 28);
    formulier(ctx, 980, 170, 760, [['Hb', '', '', null, 0, q.on('Hb', 1)], ['leukocyten', '', '', null, 0, q.on('leukocyten', 1)], ['CRP', '', '', null, 0, q.on('CRP', 1)], ['bloedgroep', '', '', null, 0, q.on('bloedgroep', 1)]], F * (1 - Y), 'AANVRAAG · H. DE VRIES', 32);
    persoon(ctx, 'yasmin', 250, 880, 400, { t, a: Y, kijk: 1, outfit: 'practicum', uit: 'blij' }); naamBij(ctx, 'Yasmin', 'stagiair analist', 120, 390, Y, 'left');
    vierBuisjes(ctx, 1000, 330, 170, 380, t, q.on('buisjes', 1), -1);
    vraagteken(ctx, 1260, 250, q.on('Waarom', 1), 100); },

  // ---------- H1 Buisjes ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: elk buisje een andere stof', 1 - q.on('stollen', 1, 1.5));
    const G = q.on('gele', 1), R = q.on('grijze', 1), P = 1 - G; const fase = R > 0.5 ? 2 : G > 0.5 ? 1 : 0;
    // drie buisjes links, het actieve oplichtend
    [['paars', 'EDTA'], ['geel', 'stolbuis'], ['grijs', 'fluoride']].forEach(([d, n], i) => { const k = (t < q.at('paarse', 1) || fase === i) ? 1 : 0.35; buis(ctx, 170 + i * 150, 300, 56, 420, d, { a: k, t, naam: NAAM, seed: i + 2, inhoud: 'bloed' }); regel(ctx, n, 170 + i * 150, 790, k * q.on(i === 0 ? 'EDTA' : i === 1 ? 'versnelt' : 'fluoride', 1), C.text, 26, 'center', 700); });
    regel(ctx, 'buiten het lichaam begint het bloed te stollen', 1260, 260, q.on('stollen', 1) * (1 - q.on('paarse', 1)), C.text, 34, 'center', 700);
    // paars: EDTA vangt calcium
    if (P > 0.01) { const V = q.on('bindt', 1, 1.2), Z = q.on('cellen', 1); ctx.save(); ctx.globalAlpha *= P * q.on('paarse', 1);
      paneel(ctx, 760, 220, 1000, 600, '', 1);
      for (let i = 0; i < 6; i++) { const bx = 900 + (i % 3) * 300, by = 360 + Math.floor(i / 3) * 190, w = wander(i, t, 10, 0.6); const cx = bx + w.x * (1 - V), cy = by + w.y * (1 - V);
        const wi = wander(i + 50, t, 40, 0.5); edtaKlauw(ctx, cx, cy, 1.2, V, q.on('EDTA', 1)); caIon(ctx, lerp(cx + 90 + wi.x, cx, V), lerp(cy + wi.y, cy, V), 19, 1); }
      naamBij(ctx, 'calciumion', 'nodig voor de stolling', 800, 290, (1 - Z), 'left'); naamBij(ctx, 'EDTA', 'vangt calcium', 1420, 290, q.on('EDTA', 1) * (1 - Z), 'left');
      for (let i = 0; i < 7; i++) { const w = wander(i + 20, t, 8, 0.5); rbc3(ctx, 860 + i * 125 + w.x, 720 + w.y + (i % 2) * 30, 28, { a: Z, rot: i, squash: 0.9 }); }
      tag(ctx, 'cellen blijven los → bloedbeeld', 1260, 690, C.groen, q.on('bloedbeeld', 1), 'center', 30); ctx.restore(); }
    // geel: stollen, centrifuge, lagen
    if (G > 0.01 && R < 0.99) { ctx.save(); ctx.globalAlpha *= G * (1 - R); const C0 = q.at('centrifuge', 1), D = q.at('Daarna', 1);
      const draai = clamp((t - C0) / (D - C0), 0, 1), ang = t > C0 ? (t - C0) * 9 * (t < D ? 1 : Math.max(0, 1 - (t - D) / 0.6)) : 0;
      centri3(ctx, 900, 480, 170, ang, { vaart: t > C0 && t < D ? 1 : 0 }); regel(ctx, 'centrifuge', 900, 760, q.on('centrifuge', 1), C.text2, 26, 'center', 600);
      const sep = clamp((t - D) / 1.2, 0, 1); buis(ctx, 1380, 250, 120, 540, 'geel', { t, naam: '', inhoud: sep > 0 ? 'gestold' : 'bloed', sep, stol: q.on('versnelt', 1, 1.5), seed: 7 });
      naamBij(ctx, 'serum', 'plasma zonder fibrinogeen', 1470, 380, q.on('serum', 1), 'left'); naamBij(ctx, 'gel', '', 1470, 560, q.on('gel', 2), 'left'); naamBij(ctx, 'stolsel', 'met de cellen', 1470, 700, q.on('stolsel', 1), 'left');
      tag(ctx, 'hierin meet het lab CRP', 1640, 470, C.teal, q.on('Daarin', 1), 'center', 26); ctx.restore(); }
    // grijs: fluoride, glucose in het buisje
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; const A = q.on('Anders', 1, 1.5);
      assen3(ctx, 900, 300, 820, 380, 'uren in het buisje', 'glucose in het buisje', 1);
      const curve = (k, col) => { ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const xx = 900 + u * 800, yy = 380 + k * u * 220; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); };
      if (q.on('remt', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('remt', 1); curve(0.04, C.groen); text(ctx, 'met fluoride', 1700, 360, fTekst(26, 700), C.groen, 'right'); ctx.restore(); }
      if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; curve(0.95, C.koraal); text(ctx, 'zonder fluoride: cellen verbruiken glucose', 1700, 650, fTekst(26, 700), C.koraal, 'right'); ctx.restore(); }
      ctx.restore(); } },

  // ---------- H2 Het bloedbeeld ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const W2 = q.on('witte', 1), H2 = q.on('Hb', 1); const P1 = 1 - W2, P2 = W2 * (1 - H2);
    apparaat(ctx, 110, 220, 520, 440, 1, 'CELTELLER', { lamp: 1, t }); buis(ctx, 230, 430, 46, 300, 'paars', { t, naam: '', seed: 3 });
    regel(ctx, 'druppel bloed, sterk verdund', 370, 760, q.on('druppel', 1) * (1 - q.on('stromen', 1)), C.text2, 26, 'center', 600);
    const T0 = q.at('stromen', 1) - 3;
    opening(ctx, q.on('stromen', 1) * (1 - H2)); celStroom(ctx, t, T0, q.on('stromen', 1) * P1, false); celStroom(ctx, t, T0, P2, true);
    naamBij(ctx, 'nauwe opening', 'één cel tegelijk', STROOM.xo + 30, 205, q.on('opening', 1) * P1, 'left');
    stroomSpoor(ctx, t, T0, q.on('stroom.', 1) * P1);
    regel(ctx, 'groot piekje: rode bloedcel', 760, 860, q.on('rode', 1) * P1, C.koraal, 26, 'left', 700); regel(ctx, 'klein piekje: bloedplaatje', 1780, 860, q.on('bloedplaatjes', 1) * P1, C.grain, 26, 'right', 700);
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(STROOM.xo, 120); ctx.lineTo(STROOM.xo, 540); ctx.stroke();
      for (let k = -3; k <= 3; k++) { ctx.strokeStyle = rgba(C.teal, 0.35); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(STROOM.xo, STROOM.y); ctx.lineTo(STROOM.xo + 300, STROOM.y + k * 60); ctx.stroke(); }
      naamBij(ctx, 'laserlicht', 'verstrooiing verraadt de soort', STROOM.xo + 30, 610, 1, 'left'); chip(ctx, 'rode bloedcellen eerst opgelost', 1270, 120, C.text2, 1, 24); ctx.restore(); }
    if (H2 > 0.01) { ctx.save(); ctx.globalAlpha *= H2; const B = q.on('openbarsten', 1, 1.5);
      roundRect(ctx, 900, 230, 420, 460, 16); shape(ctx, rgba('#CFE4F0', 0.06), C.line, 3); ctx.save(); roundRect(ctx, 900, 230, 420, 460, 16); ctx.clip(); ctx.fillStyle = rgba('#E8C870', 0.25 + 0.0 * B); ctx.fillRect(900, 230, 420, 460); ctx.fillStyle = rgba(BL.rijk, 0.75 * B); ctx.fillRect(900, 230, 420, 460);
      for (let i = 0; i < 14; i++) { const w = wander(i, t, 6, 0.6); rbc3(ctx, 960 + (i % 4) * 100 + w.x, 300 + Math.floor(i / 4) * 110 + w.y, 32 * (1 + 0.4 * B), { a: 1 - B, rot: i }); } ctx.restore();
      const L = q.on('licht', 2); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = rgba('#F2F2EE', 0.9); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(760, 460); ctx.lineTo(900, 460); ctx.stroke(); ctx.strokeStyle = rgba('#F2F2EE', 0.4); ctx.beginPath(); ctx.moveTo(1320, 460); ctx.lineTo(1480, 460); ctx.stroke(); roundRect(ctx, 1480, 410, 120, 100, 10); shape(ctx, '#3A4A68', C.line, 2); text(ctx, 'meter', 1540, 470, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
      naamBij(ctx, 'hemoglobine', 'neemt licht op', 1110, 760, q.on('hemoglobine', 1), 'center'); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('lab', 1);
    const rows = [['Hb', '9,1', 'mmol/L', 0, q.on('negen', 1), 0], ['leukocyten', '15', '× 10⁹/L', 1, q.on('vijftien', 1), q.on('leukocyten', 2)], ['trombocyten', '260', '× 10⁹/L', 0, q.on('tweehonderdzestig', 1), 0]];
    formulier(ctx, 90, 190, 760, rows, 1, 'BLOEDBEELD · H. DE VRIES', 34);
    tag(ctx, 'Nederland: millimol per liter · elders: gram per liter', 500, 520, C.teal, q.on('Nederland', 1) * (1 - q.on('Leukocyten', 1)), 'center', 26);
    const R = q.on('referentiewaarde', 1); const bx = 1170, bw = 560;
    regel(ctx, 'referentiewaarde', bx, 220, R, C.groen, 30, 'left', 700);
    [['Hb (mannen)', 300], ['leukocyten', 450], ['trombocyten', 600]].forEach(([n, yy]) => regel(ctx, n, bx - 20, yy + 8, R, C.text, 26, 'right', 700));
    refBalk(ctx, bx, 300, bw, 5, 13, 8.5, 11, 9.1, R, q.on('mannen', 1, 1), { lab: '9,1', fmt: z => String(z).replace('.', ',') });
    refBalk(ctx, bx, 450, bw, 0, 25, 4, 10, 15, R, q.on('leukocyten', 2, 1), { lab: '15' });
    refBalk(ctx, bx, 600, bw, 0, 600, 150, 400, 260, R, q.on('bloedplaatjes', 1, 1), { lab: '260' });
    regel(ctx, 'wat bij gezonde mensen gewoon is', bx, 690, R * (1 - q.on('infectie', 1)), C.text2, 26, 'left', 600);
    const I = q.on('infectie', 1); if (I > 0.01) { for (let i = 0; i < 5; i++) wbc3(ctx, 1120 + i * 90, 760 + (i % 2) * 20, 30, t, { a: I * (1 - K), seed: i + 3 }); regel(ctx, 'infectie: vaak extra witte bloedcellen', 1080, 850, I * (1 - K), C.text, 26, 'left', 700); }
    persoon(ctx, 'kim', 1810, 880, 230, { t, a: q.on('lab', 1, 0.3), kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' });
    tag(ctx, 'het lab meet · de arts legt het naast de klachten', 1150, 760, C.goud, q.on('klachten', 1), 'center', 26); },

  // ---------- H3 Klinische chemie ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('CRP', 1); const P1 = 1 - P2;
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1;
      apparaat(ctx, 110, 220, 520, 440, 1, 'CHEMIE-ANALYSER', { lamp: 1, t }); buis(ctx, 230, 430, 46, 300, 'geel', { t, naam: '', inhoud: 'gestold', sep: 1, seed: 4 });
      const kl = [0.15, 0.4, 0.65, 0.9]; const Kt = q.on('reagens', 1, 1.5);
      kl.forEach((k, i) => cuvet(ctx, 900 + i * 170, 330, 90, 200, '#8C5BB0', k * Kt * (i === 3 || q.on('sterker', 1) > 0.5 ? 1 : (i === 1 ? 1 : 0)), 0, q.on('pipetteert', 1)));
      naamBij(ctx, 'serum + reagens', 'een paar microliter', 900 - 40, 290, q.on('microliter', 1), 'left');
      regel(ctx, 'meer stof → sterkere kleur', 1160, 600, q.on('sterker', 1), C.text, 30, 'center', 700); pijl(ctx, 880, 640, 1440, 640, C.goud, q.on('sterker', 1), 4, 16);
      tag(ctx, 'ijklijn → concentratie (film: Van buisje tot uitslag)', 1160, 760, C.teal, q.on('ijklijn', 1), 'center', 26); ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2;
      leverVorm3(ctx, 330, 420, 0.95, 1); naamBij(ctx, 'lever', 'maakt CRP', 230, 580, 1, 'left');
      for (let i = 0; i < 8; i++) { const ph = (t * 0.25 + i / 8) % 1; crpMol(ctx, 470 + ph * 330, 360 + Math.sin(i * 2 + ph * 6) * 50, 15, q.on('ontsteking', 1) * (1 - ph * 0.7), t + i); }
      const gx = 960, gy = 240, gw = 760, gh = 420; assen3(ctx, gx, gy, gw, gh, 'dagen na het begin', 'CRP (milligram per liter)', 1);
      for (let d = 0; d <= 5; d++) text(ctx, String(d), gx + d / 5 * gw, gy + gh + 30, fTekst(22, 600), C.text2, 'center');
      for (const v of [0, 50, 100, 150]) text(ctx, String(v), gx - 14, gy + gh - v / 180 * gh + 8, fTekst(22, 600), C.text2, 'right');
      const Y = (v) => gy + gh - v / 180 * gh; const c = (d) => d <= 0.25 ? 0 : 150 * Math.pow((d - 0.25) / 1.75, 2) * Math.exp(2 * (1 - (d - 0.25) / 1.75));
      const u = clamp((t - q.at('Binnen', 1)) / 4.5, 0, 1); ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 80 * u; i++) { const d = i / 80 * 5; const xx = gx + d / 5 * gw, yy = Y(c(d) + 3); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } if (u > 0) ctx.stroke();
      regel(ctx, 'hoogst na ± 2 dagen', gx + 2 / 5 * gw, Y(160), q.on('hoogst', 1), C.teal, 26, 'center', 700);
      const T = q.on('tien', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; ctx.fillStyle = rgba(C.groen, 0.2); ctx.fillRect(gx, Y(10), gw, Y(0) - Y(10)); ctx.restore(); regel(ctx, 'gezond: meestal onder 10', gx + gw - 10, Y(10) - 12, T, C.groen, 24, 'right', 700); }
      const Z = q.on('zestig', 1); if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(gx, Y(60)); ctx.lineTo(gx + gw, Y(60)); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); tag(ctx, 'Opa Henk: 60', gx + gw - 90, Y(60) - 14, C.goud, Z, 'center', 26); }
      regel(ctx, 'model, niet de echte meting', gx, gy - 56, 1, C.text2, 20, 'left', 500);
      const W = q.on('waar', 1); tag(ctx, 'CRP zegt niet waar, en niet waardoor', 1340, 800, C.koraal, W, 'center', 28); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('ALAT', 1); const P1 = 1 - L;
    if (P1 > 0.01) { buis(ctx, 360, 260, 70, 460, 'grijs', { t, naam: NAAM, a: P1, seed: 5 });
      tag(ctx, 'glucose: 4,9 millimol per liter', 1100, 420, C.teal, q.on('glucose', 1) * P1, 'center', 34); tag(ctx, 'nuchter: normaal', 1100, 520, C.groen, q.on('normale', 1) * P1, 'center', 30); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; const kap = clamp((t - q.at('kapot', 1)) / 3, 0, 1);
      levercellen(ctx, 230, 300, 72, { u: kap, t, kapot: 5 }); naamBij(ctx, 'levercellen', 'vol ALAT', 200, 200, 1, 'left');
      regel(ctx, 'lekt in het bloed', 560, 680, q.on('lekt', 1), BL.alat, 28, 'center', 700);
      regel(ctx, 'ALAT (eenheden per liter)', 1090, 520, q.on('bovengrens', 1), C.text, 28, 'left', 700);
      refBalk(ctx, 1090, 640, 640, 0, 80, 0, 45, 48, q.on('bovengrens', 1), q.on('achtenveertig', 1, 1), { lab: '48' });
      tag(ctx, 'Opa Henk: 48', 1410, 410, C.goud, q.on('achtenveertig', 1), 'center', 30);
      vraagteken(ctx, 1650, 380, q.on('denk', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ook gezonde mensen zitten er soms boven', 1);
    const M = q.on('Meet', 1); const K = q.on('Dr.', 1, 0.3);
    klokVerdeling(ctx, 260, 250, 1180, 360, 1, { staart: q.on('vijfennegentig', 1) });
    regel(ctx, '95 % van gezonde mensen', 850, 520, q.on('vijfennegentig', 1), C.text, 34, 'center', 800); regel(ctx, '2,5 %', 330, 600, q.on('vijfennegentig', 1), C.koraal, 26, 'center', 700); regel(ctx, '2,5 %', 1370, 600, q.on('vijfennegentig', 1), C.koraal, 26, 'center', 700);
    regel(ctx, 'referentiewaarde', 850, 680, q.on('referentiewaarde', 1), C.groen, 30, 'center', 700);
    for (let i = 0; i < 20; i++) telpop(ctx, 330 + i * 54, 820, 15, i === 13 ? C.koraal : '#7A8BA8', q.on('twintig', 1) * (1 - M));
    for (let i = 0; i < 20; i++) { const a = M; if (a <= 0.01) break; ctx.save(); ctx.globalAlpha *= a * clamp((t - q.at('Meet', 1)) * 8 - i * 0.6, 0, 1); roundRect(ctx, 312 + i * 54, 770, 40, 56, 6); shape(ctx, i === 6 ? rgba(C.koraal, 0.6) : rgba(C.groen, 0.35), i === 6 ? C.koraal : C.groen, 2); ctx.restore(); }
    regel(ctx, '20 gezonde mensen', 330, 740, q.on('twintig', 1) * (1 - M), C.text2, 24, 'left', 600); regel(ctx, '20 bepalingen bij één gezond iemand', 312, 740, M, C.text2, 24, 'left', 600);
    tag(ctx, 'erbuiten ≠ vanzelf ziek', 1660, 300, C.goud, q.on('ziek', 1), 'center', 30);
    persoon(ctx, 'kim', 1660, 880, 380, { t, a: K, kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }); },

  // ---------- H4 Bloedbank ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const A2 = q.on('andersom', 1); const T2 = q.on('genoeg', 1);
    tag(ctx, 'bloedbank', 1620, 210, C.koraal, 1, 'center', 30); buis(ctx, 1560, 260, 56, 400, 'paars', { t, naam: NAAM, seed: 9 }); tag(ctx, 'heupoperatie: bloed achter de hand', 1240, 820, C.teal, q.on('heupoperatie', 1) * (1 - q.on('mengt', 1)), 'center', 26);
    const R1 = 330, R2 = 650, xs = [380, 720, 1060]; const M = q.on('mengt', 1), Kl = q.on('klonteren', 1, 1.6);
    [['anti-A', 1], ['anti-B', 0], ['anti-D', 1]].forEach(([n, pos], i) => { putje(ctx, xs[i], R1, 115, pos ? Kl : 0, M, t, i + 1); regel(ctx, n, xs[i], R1 - 135, q.on(n, 1), C.goud, 30, 'center', 700); });
    naamBij(ctx, 'rode bloedcellen van Opa Henk', '', 720, 520, M * (1 - A2), 'center');
    tag(ctx, 'bloedgroep A, resuspositief', 720, 640, C.koraal, q.on('resuspositief', 1) * (1 - A2), 'center', 30);
    const Kb = q.on('Alleen', 1, 1.6);
    [['testcellen A', 0], ['testcellen B', 1]].forEach(([n, pos], i) => { putje(ctx, xs[i] + 170, R2, 105, pos ? Kb : 0, A2, t, i + 5, '#C9585A'); regel(ctx, n, xs[i] + 170, R2 - 122, A2, C.text, 26, 'center', 700); });
    naamBij(ctx, 'plasma van Opa Henk', 'erbij gedruppeld', 1120, R2 - 20, A2 * (1 - T2), 'left');
    tag(ctx, 'antistoffen tegen B: past bij A', 1240, 820, C.koraal, q.on('past', 1) * (1 - T2), 'center', 26);
    const B2 = q.on('twee', 1); buis(ctx, 1720, 260, 56, 400, 'paars', { t, naam: NAAM, seed: 10, a: B2 });
    regel(ctx, 'afname 1', 1560, 720, B2, C.text2, 24, 'center', 600); regel(ctx, 'afname 2', 1720, 720, B2, C.text2, 24, 'center', 600);
    tag(ctx, 'twee aparte afnames', 1640, 800, C.goud, q.on('apart', 1), 'center', 26);
    vraagteken(ctx, 1240, 160, q.on('Waarom', 1), 90); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('Daarna', 1), P3 = q.on('kruisproef', 1); const P1 = 1 - P2;
    antwoord(ctx, 'antwoord a: zo valt een verwisseld buisje op', P1);
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; buis(ctx, 600, 260, 70, 460, 'paars', { t, naam: NAAM, seed: 11 }); buis(ctx, 900, 260, 70, 460, 'paars', { t, naam: NAAM, seed: 12, a: q.on('tweede', 1) });
      regel(ctx, 'afname 1', 600, 790, 1, C.text2, 26, 'center', 700); regel(ctx, 'afname 2', 900, 790, q.on('tweede', 1), C.text2, 26, 'center', 700);
      tag(ctx, 'etiket Opa Henk, bloed van een ander', 600, 220, C.koraal, q.on('etiket', 1), 'center', 24);
      tag(ctx, 'uitslag: O', 600, 860, C.koraal, q.on('tweede', 1), 'center', 26); tag(ctx, 'uitslag: A', 900, 860, C.groen, q.on('tweede', 1), 'center', 26);
      tag(ctx, 'uitslagen verschillen → het lab ziet de fout', 1420, 480, C.goud, q.on('vangt', 1), 'center', 28); kruis(ctx, 600, 300, 26, q.on('vangt', 1)); ctx.restore(); }
    if (P2 > 0.01) { const a2 = P2 * (1 - P3); ctx.save(); ctx.globalAlpha *= a2;
      circ(ctx, 600, 470, 230, rgba(BL.plasma, 0.3), BL.plasma, 3); naamBij(ctx, 'plasma van Opa Henk', '', 400, 200, 1, 'left');
      for (let i = 0; i < 9; i++) { const w = wander(i, t, 14, 0.5); antiY(ctx, 470 + (i % 3) * 130 + w.x, 380 + Math.floor(i / 3) * 100 + w.y, 1.4, i, i === 4 ? C.koraal : C.goud, i === 4 ? q.on('irreguliere', 1) : 1); }
      tag(ctx, 'irreguliere antistof?', 600, 780, C.koraal, q.on('irreguliere', 1), 'center', 28);
      regel(ctx, 'na een transfusie of een zwangerschap', 1000, 380, q.on('zwangerschap', 1), C.text, 30, 'left', 700);
      regel(ctx, 'niet gevonden: passende bloedgroep is genoeg', 1000, 480, q.on('genoeg', 1), C.groen, 28, 'left', 700);
      regel(ctx, 'wel gevonden: bloed kiezen waar die antistof niet op bindt', 1000, 560, q.on('binden', 1), C.koraal, 28, 'left', 700); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; regel(ctx, 'kruisproef', 960, 200, 1, C.goud, 40, 'center', 800);
      circ(ctx, 400, 470, 130, rgba(BL.plasma, 0.35), BL.plasma, 3); for (let i = 0; i < 4; i++) antiY(ctx, 350 + (i % 2) * 100, 430 + Math.floor(i / 2) * 90, 1.2, i, C.goud, 1); regel(ctx, 'plasma Opa Henk', 400, 660, 1, C.text, 26, 'center', 700);
      donorZak(ctx, 1500, 470, 1.2, 1, 'donor'); regel(ctx, 'rode bloedcellen donor', 1500, 680, 1, C.text, 26, 'center', 700);
      pijl(ctx, 560, 470, 800, 470, C.line, q.on('mengt', 1), 4, 16); pijl(ctx, 1360, 470, 1120, 470, C.line, q.on('mengt', 1), 4, 16);
      putje(ctx, 960, 470, 130, 0, q.on('mengt', 1), t, 21);
      tag(ctx, 'geen klonten: dit zakje past', 960, 720, C.groen, q.on('niets', 1), 'center', 30); vink_(ctx, 1130, 340, 26, q.on('past', 1)); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    const rows = [['Hb', '9,1', 'mmol/L', 0, 1, 0], ['leukocyten', '15', '× 10⁹/L', 1, 1, q.on('Leukocyten', 1) * (1 - q.on('ALAT', 1))], ['trombocyten', '260', '× 10⁹/L', 0, 1, 0], ['CRP', '60', 'mg/L', 1, 1, q.on('Leukocyten', 1) * (1 - q.on('ALAT', 1))],
      ['glucose', '4,9', 'mmol/L', 0, 1, 0], ['ALAT', '48', 'U/L', 1, 1, q.on('ALAT', 1) * (1 - q.on('heup', 1))], ['bloedgroep', 'A pos', '', 0, 1, q.on('heup', 1)]];
    formulier(ctx, 110, 150, 800, rows, 1, 'UITSLAG · H. DE VRIES', 32);
    const kleur = ['paars', 'paars', 'paars', 'geel', 'grijs', 'geel', 'paars']; rows.forEach((r, i) => { const yy = 150 + 100 + i * 58 - 24; ctx.save(); ctx.globalAlpha *= q.on('buisje', 1); roundRect(ctx, 920, yy, 34, 18, 5); shape(ctx, DOP[kleur[i]], null); ctx.restore(); });
    persoon(ctx, 'kim', 1250, 880, 420, { t, kijk: t < q.at('klachten', 1) ? -1 : 1, outfit: 'lab', uit: 'neutraal', pose: t < q.at('klachten', 1) ? 'denk' : 'wijs' }); persoon(ctx, 'henk', 1580, 880, 430, { t, kijk: -1, uit: q.at('heup', 1) < t ? 'blij' : 'neutraal' });
    tag(ctx, 'het lab meet · de arts legt het naast de klachten', 960, 820, C.goud, q.on('meet', 1), 'center', 28); },

  s15(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'yasmin', 330, 880, 440, { t, kijk: 1, outfit: 'practicum', uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Yasmin', 'stagiair analist', 200, 380, 1, 'left');
    tag(ctx, 'mbo · analist (bv. biologisch-medisch) · niveau 4 · meestal 4 jaar', 1180, 230, C.teal, q.on('mbo', 1), 'center', 28);
    tag(ctx, 'hbo · Biologie en Medisch Laboratoriumonderzoek · 4 jaar', 1180, 330, C.paars, q.on('hbo', 1), 'center', 28);
    pijl(ctx, 1180, 250, 1180, 290, C.line, q.on('Daarna', 1), 3, 12);
    const W = [['ziekenhuislab', 'ziekenhuislabs'], ['bedrijf', 'bedrijven'], ['onderzoeksinstituut', 'onderzoeksinstituten'], ['RIVM en GGD', 'RIVM'], ['voedsel- en milieulab', 'voedsel']];
    W.forEach(([s2, w], i) => chip(ctx, s2, 820 + (i % 3) * 380, 500 + Math.floor(i / 3) * 110, C.goud, q.on(w, 1), 30));  }
});

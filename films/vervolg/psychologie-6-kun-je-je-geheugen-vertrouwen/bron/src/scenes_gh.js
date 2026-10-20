// Wat word jij? · Psychologie · Kun je je geheugen vertrouwen? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Noor als getuige, Dr. Kim als rechtspsycholoog, Daan en Yasmin als proefpersonen, Teun in de verhoorstudio).
// Rode draad: Noor en de zes foto's; brokjes herinnering; de zekerheidsmeter.

// ---------- eigen tekeningen ----------
function tafel(ctx, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A4632'; roundRect(ctx, 300, y, 1320, 30, 8); ctx.fill(); ctx.fillStyle = '#4A3826'; ctx.fillRect(320, y + 30, 1280, 860 - y); ctx.restore(); }
// foto liggend op tafel: je ziet de achterkant met het nummer (gezichten bewust niet in beeld)
function fotoKaart(ctx, x, y, nr, a = 1, hi = 0, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lift = hi * 18; roundRect(ctx, x - 60, y - 40 - lift, 120, 80, 6); shape(ctx, hi > 0.5 ? rgba(col, 0.25) : '#F2EEE4', hi > 0.5 ? col : '#B8B0A0', hi > 0.5 ? 3 : 2); text(ctx, String(nr), x, y + 12 - lift, fTekst(36, 800), '#1A2740', 'center'); ctx.restore(); }
function fotoRij(ctx, x, y, a = 1, kies = -1, gap = 150) { for (let i = 0; i < 6; i++) fotoKaart(ctx, x + i * gap, y, i + 1, a, i === kies ? 1 : 0); }
function fietsenrek(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 560, y); ctx.stroke(); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x + 40 + i * 96, y, 30, Math.PI, 0); ctx.stroke(); } ctx.restore(); }
function schoolGebouw(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1080, 180, 700, 420, 8); shape(ctx, '#2C3E5E', rgba(C.line, 0.5), 2); for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { roundRect(ctx, 1130 + k * 160, 240 + r * 150, 110, 90, 6); shape(ctx, '#3E5C86', null); } metaText(ctx, 'SCHOOL', 1430, 230, C.grain, 'center', 28); ctx.restore(); }
function snelLijnen(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.text, 0.6); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 60 - i * 10, y - 50 + i * 26); ctx.lineTo(x - 160 - i * 20, y - 50 + i * 26); ctx.stroke(); } ctx.restore(); }
function filmrol(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 8); shape(ctx, '#20242E', '#6A7080', 2); for (let i = 0; i < w / 40 - 1; i++) { roundRect(ctx, x + 18 + i * 40, y + 10, 20, 16, 3); shape(ctx, '#E8E2D8', null); roundRect(ctx, x + 18 + i * 40, y + 124, 20, 16, 3); shape(ctx, '#E8E2D8', null); } for (let k = 0; k < Math.floor(w / 170); k++) { roundRect(ctx, x + 20 + k * 170, y + 36, 150, 78, 4); shape(ctx, rgba(C.teal, 0.35), null); } ctx.restore(); }
function brokje(ctx, x, y, s2, col, a = 1, w = 200, dash = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (dash) ctx.setLineDash([10, 8]); roundRect(ctx, x - w / 2, y - 40, w, 80, 16); shape(ctx, dash ? rgba(col, 0.12) : rgba(col, 0.3), col, 2.5); ctx.setLineDash([]); text(ctx, s2, x, y + 10, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
function scherm(ctx, x, y, w, h, a = 1, t = 0, botsing = 1, glas = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0E141E', '#6A7080', 3); ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 16); ctx.clip();
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x + 8, y + h * 0.62, w - 16, h * 0.38 - 8); const c = x + w / 2, k = botsing > 0 ? clamp(((t * 0.5) % 1.4) / 1, 0, 1) : 0; const d = (1 - k) * w * 0.32;
  auto(ctx, c - 92 * 0.55 - d, y + h * 0.82, 0.55, 1); ctx.save(); ctx.translate(2 * c, 0); ctx.scale(-1, 1); auto(ctx, c - 92 * 0.55 - d, y + h * 0.82, 0.55, 1); ctx.restore();
  if (k >= 1) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const an = i * 1.05; ctx.beginPath(); ctx.moveTo(c + Math.cos(an) * 20, y + h * 0.66 + Math.sin(an) * 20); ctx.lineTo(c + Math.cos(an) * 44, y + h * 0.66 + Math.sin(an) * 44); ctx.stroke(); } }
  ctx.restore(); ctx.restore(); }
function glasIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#BFE3F0'; ctx.lineWidth = 3; ctx.fillStyle = rgba('#BFE3F0', 0.25); [[0, 0, 30], [40, 14, 22], [-34, 18, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.moveTo(x + dx * s, y + (dy - r) * s); ctx.lineTo(x + (dx + r) * s, y + dy * s); ctx.lineTo(x + (dx + r * 0.2) * s, y + (dy + r) * s); ctx.lineTo(x + (dx - r) * s, y + (dy + r * 0.3) * s); ctx.closePath(); ctx.fill(); ctx.stroke(); }); ctx.restore(); }
function zekerMeter(ctx, x, y, w, v, label, col, a = 1, pct = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, label, x, y - 18, C.grain, 'left', 28); roundRect(ctx, x, y, w, 44, 12); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); if (v > 0.02) { roundRect(ctx, x, y, Math.max(24, w * v), 44, 12); shape(ctx, rgba(col, 0.85), col, 1.5); } if (pct) text(ctx, Math.round(v * 100) + '%', x + w + 24, y + 34, fTekst(30, 700), col, 'left'); ctx.restore(); }
function checkRij(ctx, x, y, s2, a = 1, staat = 0, col = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 56, 56, 10); shape(ctx, '#2A3A58', rgba(C.line, 0.7), 2); ctx.restore(); if (staat === 1) vink_(ctx, x + 28, y - 6, 18, a); if (staat === -1) kruis(ctx, x + 28, y - 6, 16, a); regel(ctx, s2, x + 84, y + 4, a, col, 32, 'left', 700); }
function boekje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 1000, 330, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 500, y + 10); ctx.lineTo(x + 500, y + 320); ctx.stroke(); ctx.restore(); }
function verhaalKaart(ctx, x, y, s2, a = 1, col = '#7FA3C9', verzon = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 440, 120, 10); shape(ctx, verzon ? rgba(C.koraal, 0.25) : rgba(col, 0.2), verzon ? C.koraal : col, 2); ctx.font = fTekst(28, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, s2, x + 20, y + 48, 400, 34); ctx.restore(); }
function winkelcentrum(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -160, -150, 320, 150, 8); shape(ctx, '#3A4E72', rgba(C.line, 0.6), 2); ['#C98A3E', '#5BA4C9', '#7FC48F'].forEach((c2, i) => { roundRect(ctx, -140 + i * 100, -110, 80, 80, 4); shape(ctx, rgba(c2, 0.6), null); }); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(-170, -150); ctx.lineTo(0, -210); ctx.lineTo(170, -150); ctx.closePath(); ctx.fill(); ctx.restore(); }
function monitor(ctx, x, y, w, h, a = 1, t = 0, wie = 'noor') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0E141E', '#8A8E96', 4); ctx.fillStyle = '#6A7080'; ctx.fillRect(x + w / 2 - 14, y + h, 28, 50); roundRect(ctx, x + w / 2 - 90, y + h + 46, 180, 16, 6); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.rect(x + 10, y + 10, w - 20, h - 20); ctx.clip(); ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 10, y + 10, w - 20, h - 20); persoon(ctx, wie, x + w * 0.78, y + h + h * 0.9, h * 2.1, { t }); ctx.restore();
  ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.beginPath(); ctx.moveTo(x + w - 70, y + h - 70); ctx.lineTo(x + w - 70, y + h - 30); ctx.lineTo(x + w - 36, y + h - 50); ctx.closePath(); ctx.fill(); metaText(ctx, 'VERHOOR · OPNAME', x + 24, y + h - 30, C.koraal, 'left', 28); ctx.restore(); }
function camera(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -36, 100, 72, 10); shape(ctx, '#2A2F3E', '#8A8E96', 2); ctx.beginPath(); ctx.moveTo(40, -16); ctx.lineTo(80, -34); ctx.lineTo(80, 34); ctx.lineTo(40, 16); ctx.closePath(); shape(ctx, '#2A2F3E', '#8A8E96', 2); circ(ctx, -40, -18, 8, rgba('#E05050', 0.5 + 0.5 * Math.sin(t * 5))); ctx.restore(); }
function studio(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 160, 160, 1000, 700, 16); shape(ctx, '#2C3A52', rgba(C.line, 0.5), 2); roundRect(ctx, 220, 600, 340, 140, 30); shape(ctx, '#6A5A8C', null); roundRect(ctx, 240, 560, 300, 70, 26); shape(ctx, '#7A6A9C', null);
  [['#E07A5F', 760, 800], ['#5BA4C9', 830, 800], ['#E0B64A', 795, 740]].forEach(([c2, bx, by]) => { roundRect(ctx, bx - 30, by - 30, 60, 60, 6); shape(ctx, c2, null); }); ctx.restore(); }
function vergelijkKaart(ctx, x, y, w, kop, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 300, 16); shape(ctx, rgba(col, 0.14), col, 2.5); text(ctx, kop, x + w / 2, y + 60, fTekst(36, 800), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 130 + i * 52, fTekst(30, 700), C.text, 'center')); ctx.restore(); }

function hBalk(ctx, x, y, w, frac, col, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); roundRect(ctx, x, y, Math.max(24, w * frac), 40, 10); shape(ctx, rgba(col, 0.85), col, 1.5); text(ctx, s2, x + w + 30, y + 32, fTekst(32, 700), col, 'left'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { ['een kleur', 'een geluid', 'een gevoel'].forEach((w, i) => brokje(ctx, 620 + i * 340, 700, w, [C.teal, C.groen, C.paars][i], 1, 300)); brokje(ctx, 1680, 700, 'wat logisch lijkt', C.goud, 0.9, 340, true); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('week', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; schoolGebouw(ctx); ctx.fillStyle = '#2A3446'; ctx.fillRect(0, 760, W, 140); fietsenrek(ctx, 700, 780);
      [0, 1, 2, 4, 5].forEach(i => fiets(ctx, 740 + i * 96 * 1.5 * 0.67, 760, 1.5)); const go = clamp((t - q.at('stelen', 1)) / 1.6, 0, 1); fiets(ctx, 1025 + go * 1000, 760 - (go > 0 ? 10 : 0), 1.5); snelLijnen(ctx, 1025 + go * 1000, 760, go > 0.05 && go < 0.95 ? 1 : 0);
      persoon(ctx, 'noor', 420, 880, 560, { t, uit: q.on('stelen', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Noor', 'ooggetuige', 560, 320, q.on('Noor', 1));
      chip(ctx, 'een jongen neemt een fiets mee', 1000, 220, C.koraal, q.on('stelen', 1), 30); chip(ctx, 'het gaat snel', 1300, 140, C.koraal, q.on('snel', 1), 32); chip(ctx, 'capuchon op', 1600, 140, C.koraal, q.on('capuchon', 1), 32); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; metaText(ctx, 'EEN WEEK LATER · POLITIEBUREAU', 120, 140, C.grain, 'left', 30); persoon(ctx, 'noor', 560, 860, 560, { t, pose: q.on('wijst', 1) > 0.5 ? 'wijs' : 'staan', uit: 'neutraal' }); tafel(ctx, 700); fotoRij(ctx, 760, 670, q.on('zes', 1), q.on('wijst', 1) > 0.5 ? 3 : -1);
      bubbel(ctx, 1280, 300, 'die is het!', '#F2F2EE', q.on('zegt', 1), 36); stempel(ctx, 1320, 440, 'ZEKER', C.groen, q.on('zeker', 1)); vraagteken(ctx, 1700, 560, q.on('vergissen', 1), 130); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('veranderlijk', 1, 0.8);
    regel(ctx, 'Antwoord b: ook als je je zeker voelt', 120, 140, 1 - V, C.groen, 40, 'left', 700);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; const F = q.on('filmpje', 1), O = q.on('opnieuw', 1, 0.8);
      tag(ctx, 'slecht zien → meer fouten', 1500, 140, C.text2, q.on('Slecht', 1) * (1 - F), 'center', 30); regel(ctx, 'hoe werkt je geheugen?', 960, 420, q.on('geheugen', 1) * (1 - F), C.text, 48, 'center', 700);
      filmrol(ctx, 360, 230, 1200, F * (1 - O)); kruis(ctx, 960, 305, 60, q.on('werkt', 2) * (1 - O)); tag(ctx, 'geen opname', 960, 450, C.koraal, q.on('werkt', 2) * (1 - O), 'center', 32);
      const ws = [['een kleur', 'kleur', C.teal], ['een geluid', 'geluid', C.groen], ['een gevoel', 'gevoel', C.paars]];
      ws.forEach(([s2, w, col], i) => { const a2 = q.on(w, 1); const x0 = 480 + i * 480, y0 = 640, x1 = 620 + i * 340, y1 = 360; brokje(ctx, x0 + (x1 - x0) * O, y0 + (y1 - y0) * O, s2, col, a2, 300); });
      if (O > 0.01) { regel(ctx, 'ophalen = opnieuw opbouwen', 960, 230, O, C.text, 40, 'center', 700); brokje(ctx, 960, 520, q.on('logisch', 1) > 0.5 ? 'wat logisch lijkt' : '?', C.goud, q.on('Gaten', 1), 340, true); tag(ctx, 'dat merk je niet', 960, 660, C.text2, q.on('merk', 1), 'center', 32); } ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; const wob = Math.sin(t * 6) * 6 * (1 - q.on('vastgelegd', 1)); regel(ctx, 'ophalen: even veranderlijk', 960, 160, 1, C.text, 40, 'center', 700);
      ['een kleur', 'een geluid', 'een gevoel'].forEach((s2, i) => brokje(ctx, 620 + i * 340 + wob * (i - 1), 360 + wob, s2, [C.teal, C.groen, C.paars][i], 1, 300)); brokje(ctx, 960, 480, 'wat logisch lijkt', C.goud, 1, 340, true);
      const N = q.on('terechtkomen', 1); brokje(ctx, 960 + (1 - N) * 700, 600, 'iets wat je later hoorde', C.koraal, N, 420); tag(ctx, 'daarna opnieuw vastgelegd', 960, 720, C.groen, q.on('vastgelegd', 1), 'center', 32);
      chip(ctx, 'film: Leren en onthouden', 1560, 820, C.teal, q.on('Leren', 1), 28); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const T = q.on('tweede', 1, 0.8);
    metaText(ctx, 'LOFTUS & PALMER · 1974', 120, 140, C.grain, 'left', 30);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; const Fm = q.on('filmpjes', 1); [['Elizabeth Loftus', 'Loftus'], ['John Palmer', 'Palmer']].forEach(([n, w], i) => vergelijkKaart(ctx, 360 + i * 640, 300, 560, n, ['Amerikaanse psycholoog'], [C.koraal, C.teal][i], q.on(w, 1) * (1 - Fm))); regel(ctx, 'een beroemd onderzoek', 960, 720, q.on('beroemd', 1) * (1 - Fm), C.goud, 40, 'center', 700); scherm(ctx, 660, 170, 600, 300, Fm, t, 1);
      const G1 = q.on('ene', 1), G2 = q.on('andere', 1), S = q.on('snelheid', 1);
      persoon(ctx, 'daan', 300, 880, 360, { a: G1, t }); paneel(ctx, 420, 560, 520, 170, '', G1); regel(ctx, '…toen ze elkaar', 680, 625, G1, C.text, 32, 'center', 700); regel(ctx, 'RAAKTEN?', 680, 690, G1, C.teal, 44, 'center', 800);
      persoon(ctx, 'yasmin', 1620, 880, 360, { a: G2, t, kijk: -1 }); paneel(ctx, 980, 560, 520, 170, '', G2); regel(ctx, '…toen ze op elkaar', 1240, 625, G2, C.text, 32, 'center', 700); regel(ctx, 'KNALDEN?', 1240, 690, G2, C.koraal, 44, 'center', 800);
      balk(ctx, 440, 770, 480, 0.55, C.teal, 'snelheid', S); balk(ctx, 1000, 770, 480, 0.8, C.koraal, 'hoger!', S); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; regel(ctx, 'tweede proef · een week later', 960, 230, 1, C.text, 40, 'center', 700); persoon(ctx, 'daan', 520, 880, 440, { t }); persoon(ctx, 'yasmin', 1400, 880, 440, { t, kijk: -1 });
      vraagKaartje(ctx, 660, 400, 600, 'Zag je gebroken glas?', q.on('glas', 1)); glasIcoon(ctx, 960, 600, 1.4, q.on('glas', 1)); vraagteken(ctx, 960, 820, q.on('denk', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('denkt', 1, 0.8);
    regel(ctx, 'Antwoord b', 120, 140, 1, C.groen, 40, 'left', 700);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; scherm(ctx, 1260, 180, 480, 240, 1, t, 1); glasIcoon(ctx, 1500, 500, 1, q.on('nergens', 1)); kruis(ctx, 1500, 505, 50, q.on('nergens', 1)); tag(ctx, 'er lag geen glas', 1500, 640, C.koraal, q.on('nergens', 1), 'center', 30);
      metaText(ctx, 'ZEI: JA, GLAS GEZIEN · BALK = 100%', 160, 260, C.grain, 'left', 28);
      [['knalden', 0.32, C.koraal, 'drie', '≈ 1 op 3'], ['raakten', 0.14, C.teal, 'zeven', '≈ 1 op 7'], ['geen snelheidsvraag', 0.12, C.text2, 'snelheidsvraag', '≈ 1 op 8']].forEach(([l, v, col, w, s2], i) => { const a2 = q.on(w, 1); regel(ctx, l, 160, 350 + i * 140, a2, col, 32, 'left', 700); hBalk(ctx, 160, 372 + i * 140, 800, v, col, s2, a2); });
      haak(ctx, 160, 1060, 820, 'een week later maakte één woord nog verschil', C.goud, q.on('verschil', 1)); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'wat betekent dit?', 960, 240, 1, C.text, 40, 'center', 700);
      vergelijkKaart(ctx, 200, 340, 700, 'Loftus', ['het woord is in de', 'herinnering terechtgekomen'], C.koraal, 1); vergelijkKaart(ctx, 1020, 340, 700, 'andere onderzoekers', ['misschien gokten', 'mensen vooral anders'], C.teal, q.on('gokten', 1));
      tag(ctx, 'daarover is lang gediscussieerd', 960, 760, C.goud, q.on('gediscussieerd', 1), 'center', 32); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('gesprekken', 1, 0.8);
    metaText(ctx, 'LOFTUS & PICKRELL · 1995', 120, 140, C.grain, 'left', 30); regel(ctx, 'iets herinneren wat nooit gebeurd is?', 960, 200, q.on('nooit', 1), C.text, 40, 'center', 700);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; const B = q.on('boekje', 1); boekje(ctx, 460, 270, B); chip(ctx, 'verteld door een familielid', 960, 650, C.text2, q.on('familielid', 1), 30);
      ['verjaardag met taart', 'eerste dag op school', 'gevallen van de fiets'].forEach((s2, i) => { const x = [490, 990, 490][i], y = [290, 290, 450][i]; verhaalKaart(ctx, x, y, s2, B); vink_(ctx, x + 400, y + 90, 16, q.on('echt', 1)); });
      verhaalKaart(ctx, 990, 450, 'verdwaald in een winkelcentrum', q.on('verzonnen', 1) > 0.5 ? 1 : B, '#7FA3C9', q.on('verzonnen', 1) > 0.5); stempel(ctx, 1340, 560, 'VERZONNEN', C.koraal, q.on('verzonnen', 1));
      winkelcentrum(ctx, 1640, 860, 0.8, q.on('winkelcentrum', 1)); persoon(ctx, 'kind', 1700, 880, 200, { a: q.on('winkelcentrum', 1), t, uit: 'huilt' }); ctx.restore(); }
    if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; regel(ctx, 'na twee gesprekken', 560, 320, 1, C.text, 36, 'center', 700); stippen(ctx, 380, 400, 24, Math.round(6 * q.on('vier', 2)), C.goud, 1, 8, 16, 52); tag(ctx, '≈ 1 op 4 herinnerde zich er iets van', 560, 620, C.goud, q.on('vier', 2), 'center', 32);
      persoon(ctx, 'kind', 1180, 880, 300, { t, uit: 'huilt', a: q.on('details', 1) }); wolk(ctx, 1260, 300, 480, 200, '', q.on('details', 1), '#F2F2EE'); ['"een oude man hielp me"', '"ik had een blauwe jas"'].forEach((s2, i) => regel(ctx, s2, 1500, 380 + i * 56, q.on('details', 1), '#1A2740', 28, 'center', 700)); tag(ctx, 'details die er nooit waren', 1500, 600, C.koraal, q.on('nooit', 2), 'center', 30); ctx.restore(); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('regels', 1, 0.8), S = q.on('Stel', 1, 0.8);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; regel(ctx, 'fouten bij het aanwijzen', 960, 200, q.on('Fouten', 1), C.text, 40, 'center', 700); metaText(ctx, 'VERENIGDE STATEN · LATER VRIJGESPROKEN DOOR DNA-ONDERZOEK', 960, 290, C.grain, 'center', 28);
      stippen(ctx, 690, 400, 10, q.on('zeven', 1) > 0.5 ? 7 : 0, C.koraal, q.on('honderden', 1), 10, 22, 60); tag(ctx, '≈ 7 op 10 zaken', 960, 520, C.koraal, q.on('zeven', 1), 'center', 34); tag(ctx, 'een ooggetuige wees de verkeerde aan', 960, 610, C.text, q.on('ooggetuige', 1), 'center', 32); ctx.restore(); }
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R * (1 - 0.35 * S); regel(ctx, 'regels voor een eerlijke confrontatie', 120, 150, 1, C.goud, 40, 'left', 700);
      const N = q.on('Noor', 2) > 0.5 ? 1 : 0; [['agent weet niet wie de verdachte is', 'weet'], ["alle foto's passen bij de beschrijving", 'passen'], ['de dader zit er misschien niet tussen', 'misschien'], ['zekerheid meteen opschrijven', 'schrijft']].forEach(([s2, w], i) => checkRij(ctx, 160, 260 + i * 100, s2, q.on(w, 1), N));
      checkRij(ctx, 160, 660, 'achteraf geen reactie op de keuze', q.on('goed', 2), -1, C.koraal); tag(ctx, 'de rechercheur van de zaak komt binnen', 1460, 560, C.text2, q.on('rechercheur', 1), 'center', 28); bubbel(ctx, 1460, 660, 'goed zo, dat is onze verdachte!', '#F2F2EE', q.on('goed', 2), 32);
      fotoRij(ctx, 1160, 420, q.on('foto', 1) * (1 - q.on('rechercheur', 1)), -1, 130); tag(ctx, 'dubbelblind', 1000, 222, C.goud, q.on('dubbelblind', 1), 'center', 28); ctx.restore(); }
    if (S > 0.01) { regel(ctx, 'wanneer zegt zekerheid het meest?', 1400, 800, S, C.text, 36, 'center', 700); vraagteken(ctx, 1400, 400, q.on('denk', 1), 140); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('groeit', 1, 0.8), E = q.on('keer', 1, 0.8);
    regel(ctx, 'Antwoord b: meteen, bij een eerlijke confrontatie', 120, 140, 1, C.groen, 40, 'left', 700);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; zekerMeter(ctx, 260, 340, 900, 0.95, 'meteen heel zeker', C.groen, q.on('heel', 1), false); tag(ctx, 'meestal gelijk', 1500, 370, C.groen, q.on('gelijk', 1), 'center', 34);
      zekerMeter(ctx, 260, 560, 900, 0.4, 'twijfelt', C.oker, q.on('twijfelt', 1), false); tag(ctx, 'veel vaker fout', 1500, 590, C.koraal, q.on('vaker', 1), 'center', 34); ctx.restore(); }
    if (G > 0.01 && E < 0.99) { ctx.save(); ctx.globalAlpha *= G * (1 - E); const u = clamp((t - q.at('groeit', 1)) / 6, 0, 1); ctx.save(); assen(ctx, 260, 260, 1200, 440, '', ''); ctx.restore(); metaText(ctx, 'ZEKERHEID', 280, 240, C.grain, 'left', 28); metaText(ctx, 'TIJD', 1460, 760, C.grain, 'right', 28);
      ctx.strokeStyle = C.oker; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60 * u; i++) { const f = i / 60, v = 0.5 + 0.5 * (1 - Math.exp(-f * 3.2)) * (f > 0.25 ? 1 : f / 0.25); const px = 260 + f * 1200, py = 700 - v * 420; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      metaText(ctx, 'EERSTE KEER', 300, 760, C.grain, 'left', 28); bubbel(ctx, 600, 470, 'rechercheur: goed zo!', '#F2F2EE', q.on('opmerking', 1), 32); tag(ctx, 'rechtszaal: 100% zeker', 1360, 220, C.koraal, q.on('rechtszaal', 1), 'center', 32); tag(ctx, 'begon met twijfel', 520, 640, C.oker, q.on('begon', 1), 'center', 30); ctx.restore(); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; regel(ctx, 'een confrontatie doe je maar één keer', 960, 260, 1, C.goud, 40, 'center', 700);
      metaText(ctx, 'KEER 1', 560, 400, C.grain, 'center', 28); fotoKaart(ctx, 560, 480, 4, 1, 1); metaText(ctx, 'KEER 2', 1360, 400, C.grain, 'center', 28); fotoRij(ctx, 1060, 480, q.on('tweede', 1), 3, 120); pijl(ctx, 660, 480, 980, 480, C.koraal, q.on('herkent', 1), 4, 18); tag(ctx, 'herkent vooral de foto van keer 1', 960, 640, C.koraal, q.on('herkent', 1), 'center', 32); ctx.restore(); } },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Welke', 1, 0.8);
    persoon(ctx, 'kim', 360, 880, 580, { t, pose: V > 0.5 ? 'denk' : 'staan' }); naamBij(ctx, 'Dr. Kim', 'rechtspsycholoog', 480, 260, q.on('Kim', 1));
    monitor(ctx, 880, 200, 620, 360, q.on('verhoor', 1) * (1 - V), t, 'noor'); tag(ctx, 'ook een vraag kan sturen', 1190, 720, C.koraal, q.on('sturen', 1) * (1 - V), 'center', 32);
    if (V > 0.01) { ['a. Had hij een mes?', 'b. Wat had hij in zijn hand?', 'c. Vertel eens wat je zag.'].forEach((s2, i) => vraagKaartje(ctx, 880, 260 + i * 140, 820, s2, V)); vraagteken(ctx, 1800, 400, q.on('denk', 1), 110); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Kinderen', 1, 0.8), R = q.on('rapporten', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; regel(ctx, 'Antwoord c', 120, 140, 1, C.groen, 40, 'left', 700);
      vraagKaartje(ctx, 200, 230, 900, 'a. Had hij een mes?', 1, q.on('mes', 1) > 0.5 ? 'STUREND' : ''); vraagKaartje(ctx, 200, 370, 900, 'b. Wat had hij in zijn hand?', 1, q.on('vasthield', 1) > 0.5 ? 'STUREND' : ''); vraagKaartje(ctx, 200, 510, 900, 'c. Vertel eens wat je zag.', 1, '', C.groen, q.on('open', 1) > 0.5);
      tag(ctx, '"Had hij een mes?" kan een mes in de herinnering zetten', 1000, 680, C.koraal, q.on('mes', 1) * (1 - q.on('vasthield', 1)), 'center', 30); chip(ctx, 'eerst open, dan doorvragen op wat de getuige zelf noemt', 960, 780, C.groen, q.on('noemde', 1), 32);
      persoon(ctx, 'kim', 1500, 880, 560, { t, pose: 'wijs', kijk: -1 }); ctx.restore(); }
    if (K > 0.01 && R < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - R); studio(ctx); persoon(ctx, 'kind', 640, 800, 300, { t }); camera(ctx, 1060, 260, 1, q.on('gefilmd', 1), t); metaText(ctx, 'VERHOORSTUDIO · KINDEREN TOT 12', 200, 220, C.grain, 'left', 28);
      tag(ctx, 'speciaal opgeleide agenten', 1500, 300, C.text, q.on('opgeleide', 1), 'center', 30); tag(ctx, 'alles wordt gefilmd', 1500, 380, C.koraal, q.on('gefilmd', 1), 'center', 30);
      regel(ctx, 'onderzoek:', 1500, 520, q.on('onderzoeken', 1), C.goud, 34, 'center', 700); chip(ctx, 'welke vragen helpen meer vertellen?', 1500, 600, C.groen, q.on('vertellen', 1), 28); chip(ctx, 'hoe komt er niets bij?', 1500, 690, C.groen, q.on('voorkomt', 1), 28); ctx.restore(); }
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; const F = q.on('forensisch', 1, 0.8);
      document_(ctx, 420, 470, 6 * (1 - F) + 0.01, C.teal, 1 - F); regel(ctx, 'rapport voor de rechter', 420, 260, 1 - F, C.teal, 36, 'center', 700); checkRij(ctx, 900, 400, 'Werd er gestuurd?', q.on('gestuurd', 1) * (1 - F)); checkRij(ctx, 900, 520, 'Was de confrontatie eerlijk?', q.on('eerlijk', 1) * (1 - F));
      if (F > 0.01) { vergelijkKaart(ctx, 200, 300, 720, 'rechtspsycholoog', ['getuigen, verhoren,', 'het geheugen'], C.teal, F); vergelijkKaart(ctx, 1000, 300, 720, 'forensisch psycholoog', ['onderzoekt de', 'verdachte zelf'], C.paars, q.on('verdachte', 1)); } ctx.restore(); } },

  // ---------- Recap ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const Wk = q.on('werk', 1, 0.8);
    if (Wk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Wk; persoon(ctx, 'noor', 400, 880, 560, { t }); tag(ctx, 'liegt niet, en kan zich toch vergissen', 1180, 220, C.text, q.on('liegt', 1), 'center', 32);
      zekerMeter(ctx, 760, 380, 760, 0.9, 'eerste zekerheid, eerlijk', C.groen, q.on('eerste', 1), false); bubbel(ctx, 1140, 560, 'rechercheur: goed zo!', '#F2F2EE', q.on('goed', 1), 32); zekerMeter(ctx, 760, 700, 760, 1, 'daarna', C.text2, q.on('daarna', 1), false); stempel(ctx, 1150, 830, 'MINDER WAARD', C.koraal, q.on('waard', 1)); ctx.restore(); }
    if (Wk > 0.01) { ctx.save(); ctx.globalAlpha *= Wk; regel(ctx, 'het werk van een rechtspsycholoog', 960, 180, 1, C.goud, 44, 'center', 700); persoon(ctx, 'kim', 1560, 880, 560, { t, kijk: -1 });
      [['weten hoe het geheugen werkt', 'geheugen'], ['politie en rechter helpen', 'rekening'], ['studie psychologie → rechtspsychologie', 'studie']].forEach(([s2, w], i) => chip(ctx, s2, 760, 330 + i * 120, [C.teal, C.groen, C.paars][i], q.on(w, 1), 34)); ctx.restore(); } }
});

// Kun je onderzoek vertrouwen? 1.0 — scènes per alinea (prompt v13; Schema, Macro-nacht alleen voor de berkenspanners;
// CASUS-kaart = voorbeeld, BEGRIP-kaart = stof; echte personen zonder portret; de simulatie in H1 rekent echt).
const uit = (t, q, w, n = 1, d = 0.5) => 1 - q.on(w, n, d);
function openVraag(ctx, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, 960, 470, fTitel(60), C.text, 'center'); ctx.restore(); }
// binomiale verdeling van het aantal gerimpelde erwten bij 7324 zaden en p = 1/4 (normale benadering), bakken van 10
const SIM = (() => { const mu = 1831, sd = Math.sqrt(7324 * 0.25 * 0.75), lo = 1700, n = 27; const c = []; for (let i = 0; i < n; i++) { const x = lo + i * 10 + 5; c.push(Math.exp(-0.5 * ((x - mu) / sd) ** 2)); } return { mu, sd, lo, n, c, w: 10 }; })();
function simHist(ctx, x, y, w, h, g, a = 1, o = {}) { if (a <= 0.01) return; assen(ctx, x, y, w, h, { a, xl: 'aantal gerimpelde erwten', yl: 'hoe vaak' });
  const ix = v => x + (v - SIM.lo) / (SIM.n * SIM.w) * w; histogram(ctx, x, y, w, h * 0.92, SIM.c.map((v, i) => v * clamp(g * 1.3 - Math.abs(i - 13) * 0.02, 0, 1)), a, { max: 1, col: C.teal, hl: o.hl, hlCol: o.hlCol || C.koraal });
  [1750, 1800, 1850, 1900].forEach(v => { ctx.save(); ctx.globalAlpha *= a; text(ctx, String(v), ix(v), y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); });
  if (o.mendel) { const mx = ix(1850); ctx.save(); ctx.globalAlpha *= a * o.mendel; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(mx, y - h); ctx.stroke(); text(ctx, 'Mendel: 1850', mx + 10, y - h + 30, fTekst(28, 700), C.goud); ctx.restore(); }
  if (o.verw) { const vx = ix(1831); ctx.save(); ctx.globalAlpha *= a * o.verw; ctx.strokeStyle = C.groen; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vx, y); ctx.lineTo(vx, y - h); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'verwacht: 1831', vx - 10, y - h - 10, fTekst(26, 600), C.groen, 'right'); ctx.restore(); }
  return ix; }
const binX = i => SIM.lo + i * SIM.w + 5;
function erwt(ctx, x, y, r, rimpel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); if (!rimpel) ctx.arc(x, y, r, 0, 6.283); else for (let i = 0; i <= 24; i++) { const an = i / 24 * 6.283, rr = r * (0.86 + 0.1 * Math.sin(an * 5) + 0.04 * Math.sin(an * 11)); ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); }
  ctx.fillStyle = rimpel ? '#A9B65A' : '#C8D27A'; ctx.fill(); ctx.strokeStyle = '#6E7A34'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function zakje(ctx, x, y, a = 1, pak = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 120, y - 150); ctx.quadraticCurveTo(x - 150, y + 120, x, y + 130); ctx.quadraticCurveTo(x + 150, y + 120, x + 120, y - 150); ctx.closePath(); shape(ctx, '#3A4A66', '#8FA0B5', 2);
  [[-50, 40, 0], [30, 60, 0], [-10, -10, 1], [55, -20, 0]].forEach(([dx, dy, r], i) => erwt(ctx, x + dx, y + dy - (i === 2 ? pak * 220 : 0), 26, r)); ctx.restore(); }
function studieRaster(ctx, x, y, t0, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const goed = new Set([3, 11, 19, 30, 38, 47]); for (let i = 0; i < 53; i++) { const cx = x + (i % 11) * 140, cy = y + Math.floor(i / 11) * 110, f = clamp((t - t0 - i * 0.08) / 0.4, 0, 1);
    const kl = f < 0.5 ? '#2A3A58' : (goed.has(i) ? rgba(C.groen, 0.8) : '#3A4250'); ctx.save(); ctx.translate(cx + 55, cy + 40); ctx.scale(Math.abs(1 - 2 * f) || 0.05, 1); roundRect(ctx, -55, -40, 110, 80, 8); shape(ctx, kl, f >= 0.5 && goed.has(i) ? C.groen : '#5A6A88', 1.5);
    if (f < 0.5) { ctx.fillStyle = '#5A6A88'; for (let k = 0; k < 3; k++) ctx.fillRect(-36, -18 + k * 16, 72 - k * 14, 5); } else if (goed.has(i)) { ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-4, 12); ctx.lineTo(16, -12); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { simHist(ctx, 1160, 900, 640, 300, clamp(t / 3, 0, 1), 1, { verw: 1 }); },

  s01(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'biotechbedrijf', '2012', ramp(t, 0.2, 0.5)); studieRaster(ctx, 190, 230, q.at('herhalen', 1) + 0.3, t, q.on('kankerstudies', 1));
    tag(ctx, '6 van de 53', 960, 860, C.groen, q.on('zes', 1)); tag(ctx, 'goede tijdschriften', 960, 170, C.oker, q.on('tijdschriften', 1)); },

  s04(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Echt, of toeval?', ramp(t, 0.2, 0.5) * uit(t, q, 'statistiek', 1)); const a = q.on('statistiek', 1);
    for (let i = 0; i < 6; i++) dobbelsteen(ctx, 560 + i * 160, 640, 110, 1 + Math.floor(hash(i + Math.floor(t * 4)) * 6), a); regel(ctx, 'statistiek', 960, 820, a, C.goud, 44, 'center', 700); },

  s05(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Brno', 'rond 1860', q.on('Mendel', 1)); for (let i = 0; i < 24; i++) erwt(ctx, 220 + (i % 8) * 80, 300 + Math.floor(i / 8) * 80, 26, i % 4 === 3, q.on('erwten', 1));
    regel(ctx, 'ruim 7000 erwten', 500, 590, q.on('zevenduizend', 1), C.text, 34);
    const v = q.on('verwacht', 1), g = q.on('vond', 1); zinKaart(ctx, 'VERWACHT BIJ 3 : 1', '1831 gerimpeld', 1100, 220, 640, v, C.groen); zinKaart(ctx, 'MENDEL VOND', '1850 gerimpeld', 1100, 400, 640, g, C.goud);
    tag(ctx, '+19: veel?', 1420, 680, C.koraal, q.on('veel', 1)); },

  s06(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'nulhypothese', 'er is niets bijzonders: elke afwijking komt door toeval', 120, 90, q.on('nulhypothese', 1), { w: 820 });
    zinKaart(ctx, 'HIER', 'de verhouding is 3 : 1, afwijkingen alleen door toeval', 120, 420, 820, q.on('betekent', 1), C.teal); zakje(ctx, 1400, 520, q.on('zakje', 1), ease(clamp((t - q.at('greep', 1)) / 1.2, 0, 1)));
    regel(ctx, '3 rond : 1 gerimpeld', 1400, 760, q.on('knikker', 1), C.text, 32); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const g = clamp((t - q.at('duizend', 1)) / 6, 0, 1); simHist(ctx, 240, 820, 1440, 560, g, q.on('computer', 1), { verw: q.on('toeval', 2) });
    regel(ctx, Math.round(g * 1000) + ' keer', 1640, 260, q.on('duizend', 1), C.text, 34, 'right'); tag(ctx, '1810', 240 + (1810 - SIM.lo) / 270 * 1440, 200, C.teal, q.on('1810', 1)); tag(ctx, '1860', 240 + (1860 - SIM.lo) / 270 * 1440, 200, C.teal, q.on('1860', 1)); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('kleuren', 1) || q.on('minstens', 1); simHist(ctx, 240, 790, 1440, 470, 1, 1, { mendel: 1, verw: 1, hl: i => k > 0.5 && Math.abs(binX(i) - 1831) >= 19 });
    tag(ctx, '± 6 van de 10', 480, 170, C.koraal, q.on('zes', 1)); begripKaart(ctx, 'p-waarde', 'kans op zo’n grote of grotere afwijking als alleen toeval speelt', 1000, 40, q.on('p-waarde', 1), { w: 820, px: 42 }); tag(ctx, 'p ≈ 0,6', 480, 250, C.goud, q.on('ongeveer', 2)); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); simHist(ctx, 240, 820, 1440, 520, 1, 1, { verw: 1, hl: i => Math.abs(binX(i) - 1831) >= 72 });
    tag(ctx, 'grens: 0,05 = 1 op 20', 960, 210, C.koraal, q.on('grens', 1)); tag(ctx, 'significant', 360, 330, C.koraal, q.on('significant', 1)); tag(ctx, 'significant', 1560, 330, C.koraal, q.on('significant', 1)); },

  s10(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'p = 0,03', 960, 470, ramp(t, 0.3, 0.5), C.goud, 110, 'center', 700); vraagteken(ctx, 960, 680, q.on('betekent', 1), 100); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); zinKaart(ctx, 'DE P-WAARDE REKENT VANUIT DE NULHYPOTHESE', 'stel dat alleen toeval speelt: hoe vaak krijg je dan zo’n uitkomst?', 260, 120, 1400, a, C.goud);
    zinKaart(ctx, 'NIET', 'de kans dat je hypothese niet klopt', 260, 380, 660, q.on('kans', 1), C.koraal); kruis(ctx, 880, 420, 22, q.on('kans', 1));
    zinKaart(ctx, 'OOK NIET', 'hoe groot een effect is', 1000, 380, 660, q.on('groot', 1), C.koraal); kruis(ctx, 1620, 420, 22, q.on('groot', 1));
    const e = q.on('piepklein', 1); staven(ctx, 760, 860, 400, 220, [{ v: 50.4, col: C.teal, label: 'A' }, { v: 50, col: C.oker, label: 'B' }], 60, e, e); regel(ctx, 'heel veel metingen: significant, maar piepklein', 1200, 760, e, C.text2, 28, 'left'); },

  s13(ctx, t, q) { bg(ctx, 'schema'); simHist(ctx, 240, 820, 1440, 460, 1, 1, { mendel: 1, verw: 1 }); tag(ctx, 'niet significant', 960, 130, C.teal, q.on('significant', 1));
    tag(ctx, 'bewijst 3 : 1 niet', 960, 200, C.koraal, q.on('bewijst', 1)); tag(ctx, 'geen reden om te twijfelen', 960, 270, C.groen, q.on('reden', 1)); },

  s14(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'chi-kwadraattoets', 'vergelijkt waargenomen (W) en verwachte (V) aantallen', 120, 60, q.on('chi-kwadraattoets', 1), { w: 820, px: 44 });
    const s1 = q.on('verschil', 1), s2 = q.on('kwadraat', 1), s3 = q.on('deel', 1), s4 = q.on('opgeteld', 1);
    text(ctx, 'gerimpeld:', 160, 420, fTekst(34, 600), C.text); text(ctx, 'rond:', 160, 520, fTekst(34, 600), C.text);
    [['1850 − 1831 = 19', '19² = 361', '361 / 1831 = 0,20', 420], ['5474 − 5493 = −19', '19² = 361', '361 / 5493 = 0,07', 520]].forEach(([a1, a2, a3, yy]) => { regel(ctx, a1, 380, yy, s1, C.teal, 34, 'left'); regel(ctx, a2, 820, yy, s2, C.teal, 34, 'left'); regel(ctx, a3, 1120, yy, s3, C.teal, 34, 'left'); });
    regel(ctx, 'χ² = 0,20 + 0,07 ≈ 0,26', 960, 640, s4, C.goud, 44, 'center', 700);
    const g = q.on('grenswaarde', 1); ctx.save(); ctx.globalAlpha = g; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(360, 780); ctx.lineTo(1560, 780); ctx.stroke(); ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(360 + 3.84 / 6 * 1200, 750, 1200 - 3.84 / 6 * 1200, 60);
    text(ctx, '3,84', 360 + 3.84 / 6 * 1200, 840, fMeta(26), C.koraal, 'center'); ctx.beginPath(); ctx.arc(360 + 0.26 / 6 * 1200, 780, 12, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, '0,26', 360 + 0.26 / 6 * 1200, 735, fMeta(26), C.goud, 'center'); ctx.restore();
    tag(ctx, 'niet significant', 1400, 700, C.groen, q.on('onder', 1)); },

  s15(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Kan een uitkomst te mooi zijn?', ramp(t, 0.2, 0.5) * uit(t, q, 'Kleine', 1)); simHist(ctx, 240, 820, 1440, 460, 1, q.on('Kleine', 1), { verw: 1 }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); munt(ctx, 300, 420, 90, true, ramp(t, 0.2, 0.5), t * 6); const rep = [50, 49, 51, 50, 50, 51, 49, 50, 51, 50];
    rep.forEach((v, i) => { const a = q.on('meldt', 1, 0.3 + i * 0.25); regel(ctx, 'worp ' + (i + 1) + ':  ' + v + ' × kop', 640 + Math.floor(i / 5) * 560, 260 + (i % 5) * 90, a, C.text, 32, 'left'); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const rep = [50, 49, 51, 50, 50, 51, 49, 50, 51, 50], echt = [46, 53, 50, 44, 55, 48, 52, 57, 47, 51];
    regel(ctx, 'gemeld', 520, 160, 1, C.koraal, 32); regel(ctx, 'echt toeval (voorbeeld)', 1400, 160, q.on('toeval', 1), C.groen, 32);
    rep.forEach((v, i) => { const y = 220 + i * 56; ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fillRect(520 - 4, y, (v - 40) * 20, 34); text(ctx, String(v), 520 - 20, y + 27, fMeta(24), C.text, 'right'); });
    echt.forEach((v, i) => { const y = 220 + i * 56, a = q.on('toeval', 1); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(C.groen, 0.8); ctx.fillRect(1400 - 4, y, (v - 40) * 20, 34); text(ctx, String(v), 1400 - 20, y + 27, fMeta(24), C.text, 'right'); ctx.restore(); });
    tag(ctx, 'echte metingen hebben spreiding', 960, 860, C.groen, q.on('spreiding', 1)); },

  s19(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Fisher', '1936', q.on('1936', 1)); const a = q.on('proeven', 1);
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(260, 300, 1400, 240); ctx.strokeStyle = C.groen; ctx.setLineDash([8, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(260, 420); ctx.lineTo(1660, 420); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'verwachting', 1660, 290, fMeta(22), C.groen, 'right'); text(ctx, 'normale spreiding bij toeval', 270, 290, fMeta(22), C.text2); ctx.restore();
    for (let i = 0; i < 20; i++) { ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(320 + i * 68, 420 + (hash(i) - 0.5) * 30, 12, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
    tag(ctx, 'omstreden', 960, 630, C.oker, q.on('omstreden', 1)); begripKaart(ctx, 'bevestigingsbias', 'je ziet, telt of deelt in wat je verwacht', 560, 690, q.on('bevestigingsbias', 1), { w: 800, px: 42 }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Oorzaak zonder experiment?', ramp(t, 0.2, 0.5) * uit(t, q, 'longkanker', 1)); const a = q.on('longkanker', 1); sigaret(ctx, 640, 520, 3, a); regel(ctx, '→', 1000, 540, a, C.text, 80); regel(ctx, 'longkanker?', 1260, 540, a, C.koraal, 50, 'center', 700); },

  s21(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Londen', '1950', q.on('1950', 1)); const p = q.on('ziekte', 1), c = q.on('controlegroep', 1);
    regel(ctx, 'met longkanker', 500, 230, p, C.text, 32); regel(ctx, 'controlegroep', 1420, 230, c, C.text, 32);
    for (let i = 0; i < 20; i++) { const zw = i < 12; pict(ctx, 260 + (i % 10) * 52, 400 + Math.floor(i / 10) * 140, 110, i < 19 ? (zw ? '#B5473A' : C.koraal) : C.mens, p); pict(ctx, 1180 + (i % 10) * 52, 400 + Math.floor(i / 10) * 140, 110, i < 18 ? (i < 6 ? '#B5473A' : C.koraal) : C.mens, c); }
    pijl(ctx, 960, 700, 640, 700, C.oker, q.on('terug', 1), 3); regel(ctx, 'terugkijken', 800, 750, q.on('terug', 1), C.oker, 28);
    pict(ctx, 640, 860, 60, '#B5473A', q.on('meer', 1)); regel(ctx, 'rookt veel', 680, 850, q.on('meer', 1), C.text2, 26, 'left'); pict(ctx, 900, 860, 60, C.koraal, q.on('meer', 1)); regel(ctx, 'rookt', 940, 850, q.on('meer', 1), C.text2, 26, 'left'); },

  s22(ctx, t, q) { bg(ctx, 'schema'); knoop(ctx, 'roken', 600, 420, C.teal, 1, 280); knoop(ctx, 'beginnende ziekte', 1320, 420, C.koraal, q.on('ziekte', 1), 380); pijl(ctx, 1120, 420, 760, 420, C.koraal, q.on('zin', 1), 3); regel(ctx, 'omgekeerde causaliteit', 960, 520, q.on('omgekeerde', 1), C.koraal, 30); vraagteken(ctx, 960, 720, q.on('opzet', 1), 100); },

  s24(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Engeland', 'vanaf 1951', q.on('1951', 1)); begripKaart(ctx, 'cohortonderzoek', 'eerst meten, dan een groep jaren volgen', 120, 170, q.on('cohortonderzoek', 1) * uit(t, q, 'betrouwbaarder', 1), { w: 760, px: 44 });
    const g = q.on('artsen', 1); for (let i = 0; i < 40; i++) pict(ctx, 1000 + (i % 10) * 76, 300 + Math.floor(i / 10) * 120, 90, i % 3 ? C.mens : C.koraal, g); regel(ctx, '± 40.000 artsen', 1340, 840, g, C.text, 30);
    const tl = q.on('volgden', 1); pijl(ctx, 160, 700, 860, 700, C.groen, tl, 4); regel(ctx, '1951: roken gemeten', 160, 660, tl, C.text, 26, 'left'); regel(ctx, 'jaren later: wie wordt ziek?', 860, 760, tl, C.text, 26, 'right');
    tag(ctx, 'verstorende variabele blijft mogelijk', 520, 860, C.oker, q.on('verstorende', 1), 'center', 28); },

  s25(ctx, t, q) { bg(ctx, 'schema'); knoop(ctx, 'erfelijke aanleg?', 960, 160, C.oker, q.on('aanleg', 1) * uit(t, q, 'sigaretten', 1), 380);
    const d = q.on('sigaretten', 1); assen(ctx, 200, 800, 760, 420, { a: d, yl: 'longkankersterfte' }); staven(ctx, 200, 800, 760, 420, [{ v: 17, col: C.teal, label: '0' }, { v: 131, col: C.koraal, label: '1–14' }, { v: 234, col: C.koraal, label: '15–24' }, { v: 415, col: '#B5473A', label: '25+' }], 450, d, d); regel(ctx, 'sigaretten per dag', 580, 870, d, C.text2, 26);
    const s = q.on('stopte', 1); assen(ctx, 1160, 800, 600, 420, { a: s, xl: 'jaren', yl: 'risico' }); lijnen(ctx, 1160, 800, 600, 420, [{ col: C.koraal, pts: [[0, 0.3], [0.3, 0.45], [0.6, 0.65], [1, 0.85]] }, { col: C.groen, pts: [[0, 0.3], [0.3, 0.45], [0.45, 0.4], [1, 0.25]] }], s, s); regel(ctx, 'gestopt', 1700, 700, s, C.groen, 26, 'right');
    tag(ctx, 'Fishers verklaring: steeds onwaarschijnlijker', 960, 200, C.groen, q.on('onwaarschijnlijker', 1) * uit(t, q, 'adviseur', 1), 'center', 30); tag(ctx, 'adviseur van de tabaksindustrie', 960, 200, C.oker, q.on('adviseur', 1), 'center', 30); },

  s26(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'negen gezichtspunten · vier belangrijke', 960, 160, q.on('negen', 1), C.text2, 32);
    [['sterk verband, steeds opnieuw', 'sterk'], ['oorzaak vóór gevolg', 'oorzaak'], ['dosis-effectrelatie', 'dosis-effectrelatie'], ['biologisch mechanisme', 'mechanisme']].forEach(([s, w], i) => { const a = q.on(w, w === 'oorzaak' ? 2 : 1); zinKaart(ctx, String(i + 1), s, 260 + (i % 2) * 720, 240 + Math.floor(i / 2) * 200, 680, a, C.goud); vink(ctx, 900 + (i % 2) * 720, 290 + Math.floor(i / 2) * 200, 20, q.on('dezelfde', 1)); });
    tag(ctx, 'geen afvinklijst', 960, 760, C.oker, q.on('afvinklijst', 1)); },

  s27(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Hoe verbetert wetenschap zichzelf?', ramp(t, 0.2, 0.5) * uit(t, q, 'hypothese', 1)); const h = q.on('hypothese', 1);
    zinKaart(ctx, 'HYPOTHESE', 'nooit helemaal bewezen', 160, 200, 560, h, C.teal); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = q.on('standhoudt', 1, 0.3 + i * 0.2); roundRect(ctx, 200 + i * 14, 560 - i * 40, 440, 34, 6); shape(ctx, rgba(C.groen, 0.4), C.groen, 1.5); ctx.restore(); }
    plaatsIcoon(ctx, 'tijdschrift', 1100, 420, 1.2, q.on('review', 1), 'peer review'); pict(ctx, 960, 560, 120, C.mens, q.on('vakgenoten', 1)); pict(ctx, 1240, 560, 120, C.mens, q.on('vakgenoten', 1));
    plaatsIcoon(ctx, 'lab', 1580, 420, 1.2, q.on('herhalen', 1), 'herhalen'); },

  s28(ctx, t, q) { nachtDecor(ctx); casusKaart(ctx, 'Engeland', 'jaren 1950 · 2001–2007', q.on('berkenspanner', 1));
    stam(ctx, 560, 190, 790, 150, false, 1); stam(ctx, 1360, 190, 790, 150, true, 1); const e = q.on('vaker', 1);
    [[540, 340, 0], [590, 520, 1], [550, 690, 0], [1340, 330, 1], [1390, 520, 0], [1350, 700, 1]].forEach(([x, y, d], i) => { const opv = (x < 960) === !!d; berkenspanner(ctx, x, y, 1.6, d, opv ? 1 - 0.65 * e : 1, (hash(i) - 0.5) * 0.4); });
    tag(ctx, 'lichte stam', 560, 820, C.text, 1); tag(ctx, 'zwarte stam', 1360, 820, C.text, 1); tag(ctx, 'slecht gecamoufleerd: vaker opgegeten', 960, 120, C.koraal, q.on('gecamoufleerde', 1), 'center', 30);
    tag(ctx, 'kritiek → betere proef', 960, 210, C.groen, q.on('Kritiek', 1)); },

  s29(ctx, t, q) { bg(ctx, 'schema'); studieRaster(ctx, 190, 150, -10, t, q.on('kankerstudies', 1) * uit(t, q, 'tijdschriften', 1, 0.6));
    tag(ctx, 'zwakke opzet', 960, 160, C.goud, q.on('opzet', 1) * uit(t, q, 'tijdschriften', 1)); tag(ctx, 'weinig herhalingen · niet blind gemeten', 960, 260, C.koraal, q.on('herhalingen', 1) * uit(t, q, 'tijdschriften', 1), 'center', 30);
    const pb = q.on('tijdschriften', 1); plaatsIcoon(ctx, 'tijdschrift', 640, 480, 1.4, pb, 'opvallend: gepubliceerd'); ctx.save(); ctx.globalAlpha = q.on('la', 1); roundRect(ctx, 1080, 400, 460, 220, 12); shape(ctx, '#3A2E24', '#8C6A4E', 2); roundRect(ctx, 1260, 500, 100, 24, 8); shape(ctx, '#8C6A4E', null); text(ctx, 'niets gevonden', 1310, 460, fTekst(30, 600), C.text2, 'center'); ctx.restore();
    begripKaart(ctx, 'publicatiebias', 'opvallende uitkomsten worden vaker gepubliceerd', 560, 700, q.on('publicatiebias', 1), { w: 800, px: 42 }); },

  s30(ctx, t, q) { bg(ctx, 'schema'); for (let i = 0; i < 20; i++) dobbelsteen(ctx, 360 + (i % 10) * 132, 400 + Math.floor(i / 10) * 150, 100, 1 + Math.floor(hash(i * 7 + Math.floor(t * 3)) * 6), q.on('twintig', 1)); regel(ctx, '20 toetsen, geen echt effect', 960, 760, q.on('effect', 1), C.text, 34); },

  s32(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); for (let i = 0; i < 20; i++) dobbelsteen(ctx, 360 + (i % 10) * 132, 260 + Math.floor(i / 10) * 150, 100, i === 13 ? 6 : 1 + Math.floor(hash(i * 7) * 5), a, i === 13 && q.on('toevalstreffer', 1) > 0.5 ? C.goud : '#F2F2EE');
    tag(ctx, 'kans op minstens één: ± 64 %', 960, 600, C.koraal, q.on('minstens', 1)); begripKaart(ctx, 'p-hacking', 'net zo lang analyseren tot er iets significants uitkomt', 120, 640, q.on('p-hacking', 1) * uit(t, q, 'preregistratie', 1), { w: 860, px: 42 });
    begripKaart(ctx, 'preregistratie', 'vooraf vastleggen wat je meet en hoe je toetst', 120, 640, q.on('preregistratie', 1), { w: 860, px: 42 }); tag(ctx, 'ook uitkomsten zonder effect publiceren', 1420, 760, C.groen, q.on('publiceren', 1), 'center', 28); },

  s33(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Zuid-Korea', '2004–2006', q.on('2004', 1)); const y = 560; pijl(ctx, 200, y, 1720, y, C.line, 1, 3);
    [['2004', 360, '2004'], ['2005', 760, '2005'], ['peer review', 1060, 'review'], ['foto’s gelijk', 1360, 'foto'], ['ingetrokken', 1640, 'ingetrokken']].forEach(([s, x, w], i) => { const a = q.on(w, 1); ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, 14, 0, 6.283); ctx.fillStyle = i >= 3 ? C.koraal : C.teal; ctx.fill(); ctx.restore(); regel(ctx, s, x, y - 40, a, C.text, 30); });
    plaatsIcoon(ctx, 'tijdschrift', 560, 320, 0.9, q.on('2004', 1)); const f = q.on('foto', 1); [1260, 1460].forEach(x => { ctx.save(); ctx.globalAlpha = f; roundRect(ctx, x - 80, 640, 160, 120, 8); shape(ctx, '#2A3A58', '#8FA0B5', 1.5); for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(x - 40 + hash(k) * 80, 670 + hash(k * 3) * 60, 10, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fill(); } ctx.restore(); }); regel(ctx, '=', 1360, 720, f, C.koraal, 60);
    tag(ctx, 'peer review vangt geen verzonnen gegevens', 960, 880, C.oker, q.on('vangt', 1), 'center', 28); },

  s34(ctx, t, q) { bg(ctx, 'schema'); studieRaster(ctx, 190, 120, -10, t, 0.5 * ramp(t, 0.2, 0.5) * uit(t, q, 'p-waarde', 1));
    simHist(ctx, 360, 760, 1200, 360, 1, q.on('p-waarde', 1) * uit(t, q, 'correlatie', 1), { mendel: 1, verw: 1 });
    { const a = q.on('correlatie', 1) * uit(t, q, 'Dus', 1); ['sterk verband', 'oorzaak eerst', 'dosis-effect', 'mechanisme'].forEach((w, i) => { const x = 360 + i * 400, b = a * ramp(t, q.at('argumenten', 1) + i * 0.25, 0.4); knoop(ctx, w, x, 300, C.oker, b, 300); pijl(ctx, x, 345, 960 + (x - 960) * 0.25, 520, C.oker, b * 0.8, 2.5); });
      knoop(ctx, 'waarschijnlijke oorzaak', 960, 570, C.goud, a, 420); const h = q.on('herhalen', 1) * uit(t, q, 'Dus', 1); tag(ctx, 'anderen herhalen het', 960, 700, C.groen, h, 'center', 30); }
    ['is het herhaald?', 'vooraf vastgelegd?', 'wie betaalde het?'].forEach((s, i) => tag(ctx, s, 520 + i * 440, 860, [C.groen, C.teal, C.oker][i], q.on(['herhaald', 'vastgelegd', 'betaalde'][i], 1), 'center', 30)); },
};

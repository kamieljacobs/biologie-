// Wat word jij? · Verloskunde 4 · De bevalling — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra 35–40 weken, baby Lina).
// Rode draad: de thuisbevalling van Esra.

// slaapkamer thuis: vloer, raam met nacht, lamp
function thuis(ctx, a = 1) { if (a <= 0.01) return; vkA(ctx, a); ctx.fillStyle = rgba('#000000', 0.18); ctx.fillRect(0, 880, W, 200); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(W, 880); ctx.stroke();
  roundRect(ctx, 1460, 150, 340, 300, 10); shape(ctx, '#121C30', rgba(C.line, 0.6), 3); circ(ctx, 1720, 230, 30, rgba('#F2EAD0', 0.85)); for (let i = 0; i < 6; i++) circ(ctx, 1500 + hash(i) * 260, 180 + hash(i + 7) * 240, 3, rgba('#F2EAD0', 0.7));
  ctx.strokeStyle = rgba(C.line, 0.45); ctx.beginPath(); ctx.moveTo(1630, 150); ctx.lineTo(1630, 450); ctx.stroke();
  ctx.fillStyle = '#5A4030'; ctx.fillRect(160, 620, 16, 260); ctx.beginPath(); ctx.moveTo(110, 620); ctx.lineTo(226, 620); ctx.lineTo(200, 540); ctx.lineTo(136, 540); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.7); ctx.fill(); ctx.restore(); }
function verlos(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (o.thuis) thuis(ctx); else praktijk(ctx, 1, o.kamer || {});
  persoon(ctx, 'mirjam', o.mx || 700, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan', outfit: o.thuis ? 'bevalling' : undefined });
  const e = persoon(ctx, 'esra', o.ex || 1180, 880, 455, { t, kijk: -1, uit: o.uitE || 'blij', pose: o.poseE || 'staan', zwanger: o.zw == null ? 0.9 : o.zw, outfit: o.outfitE });
  if (o.lina) persoon(ctx, 'baby', (o.ex || 1180) - 10, 560, 160, { t, uit: 'slaapt' }); ctx.restore(); return e; }
// hartslaggrafiek: hartslag over tijd met wee-golven; dip: 0 = normaal herstel, 1 = slecht herstel
function ctgSpoor(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const u = o.u == null ? 1 : o.u, dip = o.dip || 0, B = (b) => y + h - (b - 80) / 120 * h;
  roundRect(ctx, x - 20, y - 20, w + 40, h * 1.7 + 40, 12); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); ctx.fillStyle = rgba(C.groen, 0.1); ctx.fillRect(x, B(160), w, B(110) - B(160));
  metaText(ctx, '160', x - 8, B(160) + 6, C.text2, 'right', 16); metaText(ctx, '110', x - 8, B(110) + 6, C.text2, 'right', 16); metaText(ctx, 'HARTSLAG KIND', x, y - 30, C.grain, 'left', 20);
  const wee = (k) => Math.max(0, Math.sin((k * 3 - 0.3) * Math.PI)) ** 2; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); const N = 200;
  for (let i = 0; i <= N * u; i++) { const k = i / N; const late = Math.max(0, Math.sin((k * 3 - 0.45) * Math.PI)) ** 2; const b = 140 + 4 * Math.sin(i * 1.7) - (1 - dip) * 14 * wee(k) - dip * 35 * late; ctx.lineTo(x + k * w, B(b)); } ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= N * u; i++) { const k = i / N; ctx.lineTo(x + k * w, y + h * 1.6 - wee(k) * h * 0.45); } ctx.stroke(); metaText(ctx, 'WEEËN', x, y + h * 1.6 + 30, C.teal, 'left', 18); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { hartSchema(ctx, 1400, 640, 0.6, 1, { ovale: 0.5 + 0.5 * Math.sin(t * 0.6), ductus: 0.3, long: 0.6, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('seconden', 1, 0.8);
    baarmoeder(ctx, 520, 520, 0.7, { week: 36, groei: 0.95, t, a: 1 - B * 0.6 }); naamBij(ctx, 'placenta', 'levert zuurstof', 780, 230, q.on('placenta', 1) * (1 - B), 'left', VK.placL);
    hartSchema(ctx, 1350, 600, 0.6, q.on('hart', 1), { ovale: 0, ductus: 0, long: 0.1, t });
    naamBij(ctx, 'twee kortsluitingen', 'het bloed gaat langs de longen', 1350, 220, q.on('kortsluitingen', 1), 'center', '#E0B0D0'); vraagteken(ctx, 960, 520, q.on('denk', 1), 120); },

  // ---------- H1 Het bevalplan ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b'); const B = q.on('voorbereiding', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; hartSchema(ctx, 960, 620, 0.62, 1, { ovale: 0.6, ductus: 0.3, long: 0.6, t }); tag(ctx, 'hoe: zie straks', 960, 230, C.text2, q.on('straks', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'bevalplan · rond 35 weken', 960, 210, q.on('bevalplan', 1), C.text, 44, 'center', 800);
      huisje(ctx, 460, 560, 1.1, q.on('thuis', 1)); regel(ctx, 'thuis', 460, 720, q.on('thuis', 1), C.groen, 34, 'center', 800);
      huisje(ctx, 960, 560, 1.1, q.on('geboortecentrum', 1), C.paars); regel(ctx, 'geboortecentrum', 960, 720, q.on('geboortecentrum', 1), C.paars, 34, 'center', 800);
      ziekenhuis(ctx, 1460, 590, 1, q.on('ziekenhuis', 1)); regel(ctx, 'ziekenhuis', 1460, 720, q.on('ziekenhuis', 1), C.teal, 34, 'center', 800);
      tag(ctx, 'gezond? overal de verloskundige', 960, 840, C.goud, q.on('alle', 1), 'center', 30); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); verlos(ctx, t, { zw: 0.85, uitE: q.on('kiest', 1) > 0.5 ? 'blij' : 'denkt', poseE: q.on('kiest', 1) > 0.5 ? 'staan' : 'denk' });
    [['ademhalen', 'Ademhalen'], ['bewegen', 'bewegen'], ['warm bad', 'bad']].forEach(([s2, w], i) => chip(ctx, s2, 760 + i * 200, 180, C.groen, q.on(w, 1), 28));
    chip(ctx, 'ruggenprik → naar het ziekenhuis', 960, 260, C.teal, q.on('ruggenprik', 1), 28); tag(ctx, 'continu controle · gynaecoloog neemt over', 960, 330, C.text2, q.on('gynaecoloog', 1), 'center', 26);
    huisje(ctx, 1500, 650, 0.7, q.on('thuis', 1)); vink_(ctx, 1600, 560, 26, q.on('thuis', 1)); tag(ctx, 'plan B: toch naar het ziekenhuis', 1500, 800, C.text2, q.on('toch', 1), 'center', 24); },

  // ---------- H2 Ontsluiting en uitdrijving ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const wee = Math.max(0, Math.sin(t * 1.3)) * q.on('samen', 1);
    baarmoeder(ctx, 600, 470, 0.75 - 0.03 * wee, { week: 40, groei: 1, t, hoofdOnder: true }); naamBij(ctx, 'baarmoederhals', '', 600, 860, q.on('baarmoederhals', 1), 'center', VK.spierD);
    tag(ctx, 'wee', 600, 120, C.koraal, wee, 'center', 30);
    const L = q.on('Rekzintuigen', 1); brein(ctx, 1380, 330, 0.55, L, { t }); pijl(ctx, 760, 760, 1240, 420, C.teal, q.on('signaal', 1), 5, 18); tag(ctx, 'meer oxytocine', 1400, 520, C.paars, q.on('oxytocine', 1), 'center', 30);
    pijl(ctx, 1300, 560, 840, 560, C.paars, q.on('sterker', 1), 5, 18); tag(ctx, 'weeën sterker: een lus die zichzelf versterkt', 1100, 820, C.goud, q.on('lus', 1), 'center', 28); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const o = clamp((t - q.at('open', 1)) / 5, 0, 1);
    baarmoeder(ctx, 560, 470, 0.75, { week: 40, groei: 1, t, hoofdOnder: true, open: o }); tag(ctx, 'eerst korter, dan open', 560, 120, C.text2, q.on('korter', 1), 'center', 28);
    regel(ctx, Math.round(o * 10) + ' cm', 1300, 300, q.on('vingers', 1), C.goud, 80, 'center', 800); naamBij(ctx, 'ontsluiting', 'volledig bij 10 centimeter', 1300, 380, q.on('tien', 1), 'center');
    tag(ctx, 'eerste kind: vaak meer dan 10 uur', 1300, 520, C.text2, q.on('uur', 1), 'center', 28); regel(ctx, 'uitdrijving: persen', 1300, 680, q.on('uitdrijving', 1), C.koraal, 44, 'center', 800); },

  s08(ctx, t, q) { bg(ctx, 'schema'); bekkenRing(ctx, 560, 470, 1.1, q.on('ingang', 1), { ingang: true, hoofd: q.on('hoofd', 2) > 0.5 ? 0 : null }); naamBij(ctx, 'ingang', 'breed van links naar rechts', 560, 790, q.on('ingang', 1), 'center');
    bekkenRing(ctx, 1360, 470, 1.1, q.on('uitgang', 1), { ingang: false }); naamBij(ctx, 'uitgang', 'breed van voor naar achter', 1360, 790, q.on('uitgang', 1), 'center');
    tag(ctx, 'het hoofd is het grootste deel', 960, 150, C.goud, q.on('grootste', 1), 'center', 30); vraagteken(ctx, 960, 470, q.on('denk', 1), 110); },

  // ---------- H3 Luisteren naar het hart ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord a'); const r = clamp((t - q.at('kwartslag', 1)) / 3, 0, 1);
    bekkenRing(ctx, 560, 470, 1.1, 1, { ingang: true, hoofd: 0 }); bekkenRing(ctx, 1360, 470, 1.1, 1, { ingang: false, hoofd: Math.PI / 2 * r });
    pijl(ctx, 800, 470, 1100, 470, C.goud, 1, 5, 18); tag(ctx, 'draait een kwartslag', 960, 200, C.goud, q.on('kwartslag', 1), 'center', 32); tag(ctx, 'kin op de borst: kleinste omtrek', 960, 840, C.teal, q.on('kin', 1), 'center', 28); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Mirjam', 1, 0.8), wee = Math.max(0, Math.sin(t * 1.2));
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; spiraalSlagader(ctx, 600, 520, 0.85, 1, { wijd: 1 - 0.75 * wee * q.on('knijpt', 1), trofo: 1, t, label: 'BAARMOEDERWAND TIJDENS EEN WEE' });
      tag(ctx, 'even minder zuurstof', 1300, 360, C.koraal, q.on('minder', 1), 'center', 30); tag(ctx, 'gezond kind: genoeg reserve', 1300, 450, C.groen, q.on('reserve', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; doptone(ctx, 340, 300, 0.7, 1, 138 - 10 * wee, t, { golf: 1 }); const slecht = q.on('slecht', 1);
      ctgSpoor(ctx, 700, 220, 1080, 300, q.on('gezonde', 1), { u: clamp((t - q.at('gezonde', 1)) / 6, 0, 1), dip: slecht });
      tag(ctx, 'dipje tijdens de wee: meestal normaal', 1240, 790, C.groen, q.on('dipje', 1) * (1 - slecht), 'center', 28); tag(ctx, 'slecht herstel na de wee: zuurstoftekort?', 1240, 790, C.koraal, slecht, 'center', 28);
      tag(ctx, 'groen vruchtwater', 340, 560, C.groen, q.on('groen', 1), 'center', 28); ziekenhuis(ctx, 340, 800, 0.6, q.on('ziekenhuis', 1)); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const g = q.on('geboren', 1, 1); verlos(ctx, t, { thuis: true, zw: 1 - g, outfitE: g > 0.5 ? 'kraam' : undefined, uitE: g > 0.5 ? 'lacht' : 'bezorgd', uitM: 'blij', poseE: g > 0.5 ? 'vasthouden' : 'staan', lina: g > 0.5 });
    doptone(ctx, 960, 260, 0.6, 1 - g, 136, t); tag(ctx, 'regelmatig', 960, 420, C.groen, q.on('regelmatig', 1) * (1 - g), 'center', 28); naamBij(ctx, 'Lina', '', 1330, 590, q.on('Lina', 1), 'center', C.goud); klokje(ctx, 1250, 230, 46, 1, q.on('uur', 1) * (1 - g)); },

  // ---------- H4 De eerste ademteug ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const o = clamp((t - q.at('trekt', 1)) / 2, 0, 1);
    longblaasje(ctx, 560, 500, 170, 1, { open: 0.3 + 0.7 * o, water: 1 - o }); naamBij(ctx, 'vol vocht', 'deel weggeperst bij de bevalling', 560, 780, q.on('vocht', 1) * (1 - o), 'center', VK.vocht); naamBij(ctx, 'lucht erin', 'longblaasjes gaan open', 560, 850, o, 'center');
    longblaasje(ctx, 1360, 500, 170, q.on('surfactant', 1), { open: 0.95, surf: 1 }); naamBij(ctx, 'surfactant', 'houdt ze open', 1360, 780, q.on('surfactant', 1), 'center', C.goud); tag(ctx, 'film: Negen maanden bouwen', 1360, 220, C.teal, q.on('film', 1), 'center', 26); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const lg = q.on('meer', 1, 2), ov = q.on('dichtgeduwd', 1, 1.2), du = q.on('samen', 1, 3);
    const A = hartSchema(ctx, 680, 640, 0.75, 1, { ovale: ov, ductus: du, long: 0.15 + 0.85 * lg, t });
    tag(ctx, 'veel meer bloed door de longen', 680, 120, '#DDE6F4', lg, 'center', 28); tag(ctx, 'druk links hoger', 1500, 300, C.goud, q.on('hoger', 1), 'center', 30);
    naamBij(ctx, 'foramen ovale', ov > 0.5 ? 'dichtgeduwd' : 'klepje, één kant op', 1500, 400, q.on('klepje', 1), 'left', C.goud); naamBij(ctx, 'ductus Botalli', du > 0.5 ? 'knijpt samen' : '', 1500, 520, q.on('ductus', 1), 'left', '#E0B0D0');
    tag(ctx, 'meer zuurstof · stoffen uit de placenta weg', 1500, 640, C.text2, q.on('zuurstofgehalte', 1), 'center', 24); tag(ctx, 'ibuprofen laat: kan de ductus te vroeg sluiten', 1500, 760, C.koraal, q.on('ibuprofen', 1), 'center', 24); },

  s15(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'baby', 500, 600, 420, { t, uit: q.on('Reageert', 1) > 0.5 ? 'huilt' : 'neutraal' });
    tag(ctx, 'na 1 en na 5 minuten', 500, 200, C.text2, q.on('minuten', 1), 'center', 28); const n = ['hart', 'Ademt', 'spierspanning', 'Reageert', 'roze'].filter(w => q.on(w, 1) > 0.5).length;
    apgar(ctx, 1100, 220, q.on('hart', 1), [2, 2, 2, 1, 2], n / 5 + (q.on('negen', 1) > 0.5 ? 0.01 : 0)); naamBij(ctx, 'Apgar-score', '0, 1 of 2 per punt', 1360, 720, q.on('Apgar', 1), 'center'); stempel(ctx, 1360, 820, 'Lina: 9', C.groen, q.on('negen', 1)); },

  // ---------- H5 De placenta komt ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); baarmoeder(ctx, 700, 500, 0.7, { week: 0, groei: 0.6, placenta: 1 - q.on('komt', 1), t });
    const v = q.on('vastzat', 1); if (v > 0.01) { vkA(ctx, v); for (let i = 0; i < 6; i++) circ(ctx, 700 + 80 + i * 22, 500 - 250 + i * 12, 8, VK.bloedM); ctx.restore(); }
    naamBij(ctx, 'open bloedvaten', 'waar de placenta vastzat', 1050, 260, v, 'left', VK.bloedM); tag(ctx, 'binnen een half uur', 700, 120, C.text2, q.on('half', 1), 'center', 28); vraagteken(ctx, 1350, 560, q.on('denk', 1), 120); },

  s18(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); const k = 0.5 + 0.5 * Math.sin(t * 2) * q.on('knijpen', 1);
    vkA(ctx, 1); ctx.translate(640, 520); for (let i = 0; i < 9; i++) { ctx.strokeStyle = rgba(VK.spier, 0.9); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-260, -200 + i * 50); ctx.lineTo(260, -200 + i * 50 + (i % 2 ? 60 : -60)); ctx.stroke(); }
    for (let i = 0; i < 3; i++) { roundRect(ctx, -170 + i * 140, -260, 50 - 34 * k, 520, 20); shape(ctx, rgba(VK.bloedM, 0.85), null); } ctx.restore();
    naamBij(ctx, 'spiervezels kriskras', 'knijpen de bloedvaten dicht', 640, 860, q.on('kriskras', 1), 'center'); tag(ctx, 'oxytocine helpt', 1300, 230, C.paars, q.on('Oxytocine', 1), 'center', 30); tag(ctx, 'ook bij zuigen aan de borst · standaard een prik', 1300, 310, C.text2, q.on('borst', 1), 'center', 26);
    maatbeker(ctx, 1450, 820, 1, q.on('milliliter', 1), 350); tag(ctx, 'vanaf ± een halve liter: extra hulp', 1060, 600, C.goud, q.on('halve', 1), 'center', 26); tag(ctx, 'meer dan een liter: naar het ziekenhuis', 1060, 680, C.koraal, q.on('liter', 2), 'center', 26); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); hartSchema(ctx, 960, 640, 0.75, 1, { ovale: q.on('klepje', 1, 1), ductus: q.on('ductus', 1, 1.5), long: 0.2 + 0.8 * q.on('longen', 1, 1), t }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); thuis(ctx); persoon(ctx, 'mirjam', 760, 880, 480, { t, kijk: 1, uit: 'blij', outfit: 'bevalling', pose: 'vasthouden' });
    klokje(ctx, 1250, 300, 60, (t * 0.05) % 1, q.on('kantoortijden', 1)); tag(ctx, 'dag en nacht bereikbaar', 1250, 440, C.goud, q.on('nacht', 1), 'center', 30); tag(ctx, 'binnen korte tijd bij de vrouw thuis', 1250, 520, C.teal, q.on('korte', 1), 'center', 28); tag(ctx, 'diensten al in de opleiding', 1250, 620, C.paars, q.on('opleiding', 1), 'center', 28); },
});

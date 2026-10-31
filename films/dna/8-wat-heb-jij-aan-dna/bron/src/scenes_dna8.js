// ===== DNA 8 · Wat heb jij aan DNA? — scènes (versie 2.0, beeld-remake prompt v13, 31 okt 2026) =====
// Eén functie per segment-id: SCENES[id](ctx, t, q). Beeldwissels hangen aan gesproken woorden (q.at / q.on), dus aan de
// bestaande takes. Rollen (personages/ROLLEN.md, LEVENSLOOP.md): jij = Noor; broer = Teun; moeder = Linda; vader = Rachid;
// tante = Tante Petra; nichtje = de baby; verloskundige = Mirjam met Esra en haar baby (hielprik, NIPT: zoals in Verloskunde 3 en 5);
// klinisch geneticus = Dr. Kim met Sanne (dragerschapstest, zoals in Erfelijkheid 6); patiënt = Opa Henk; boer = Veehouder Gerrit.
// Castnamen nooit in beeld. Telpoppetjes alleen in tellingen. De stamboom in vraag 3 gebruikt symbolen (hypothetisch, geen castpersonage
// krijgt een variant toegeschreven behalve Tante Petra, die hem in de stem al heeft).
window.__cueMis = window.__cueMis || {};
function _cue(q, w, n) { const v = q.at(w, n); if (!isFinite(v)) { const k = (q._id || '?') + ':' + w + '#' + n; window.__cueMis[k] = 1; } return v; }
const on = (q, w, n = 1, d = 0.6) => { const v = _cue(q, w, n); return isFinite(v) ? ramp(q.localT, v, d) : 0; };
const uit = (q, w, n = 1, d = 0.45) => 1 - on(q, w, n, d);
const na = (q, w, n = 1) => q.localT >= _cue(q, w, n);
const rij = (p, k, n) => clamp(p * n - k, 0, 1);

// vaste maten (Noor 1,68 m = 520 px → 1 cm ≈ 3,1 px; vloer op y = 800)
const VL = 800, MENS = 520;
const fam = (ctx, id, x, h, o = {}) => persoon(ctx, id, x, VL, h, o);

SCENES.title = (ctx, t) => { d8weegschaal(ctx, 1440, 820, Math.sin(t * 0.8) * 0.25, [['wat de test leest', 1]], [['wat jij belangrijk vindt', 1]], { s: 0.8, labL: 'de feiten', labR: 'jouw waarden' }); };

// ---------------- Cold open ----------------
SCENES.n0 = (ctx, t, q) => { q._id = 'n0'; d8bg(ctx, 'schema');
  const jou = on(q, 'jou', 1, 0.8), vraag = on(q, 'vroeg', 1, 0.8), wil = on(q, 'wil', 1, 0.6), geen = on(q, 'geen', 1, 0.6), uits = on(q, 'uitslag', 1, 0.8);
  // drie eerdere afleveringen als medaillons; ze schuiven naar boven bij 'jou' en verdwijnen bij de nieuwe vraag
  const med = [['cellen', 'in cellen', (x, y, r) => kernChromatine(ctx, x, y, r * 0.8, { c: 0.15, seed: 4 })], ['buisje', 'in een buisje', (x, y, r) => { d8buisje(ctx, x, y + r * 0.1, r / 95, { vul: 0.75, dop: 'dop' }); ctx.save(); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 8 + i * 5, y - r * 0.15); ctx.quadraticCurveTo(x - 12 + i * 7, y - r * 0.35, x - 4 + i * 4, y - r * 0.5); ctx.stroke(); } ctx.restore(); }],
    ['lab', 'in het lab', (x, y, r) => dnaLadderHelix(ctx, x - r * 0.72, y, r * 0.16, 'ATGCATTGC', { draai: 1, R: r * 0.42, s: 0.3 })]];
  med.forEach(([w, lab, fn], i) => { const a = (i ? on(q, w, 1, 0.5) : 1) * (1 - vraag); if (a <= 0.01) return; const k = ease(on(q, 'laatste', 1, 0.9)), x = lerp(560 + i * 400, 1130 + i * 290, k), y = lerp(400, 300, k), r = lerp(130, 70, k);
    ctx.save(); ctx.globalAlpha *= a * (1 - 0.4 * k); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#16203A'; ctx.fill(); ctx.save(); ctx.clip(); fn(x, y, r); ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
    metaText(ctx, lab, x, y + r + 40, C.text2, 'center', 28); ctx.restore(); });
  // jij = Noor
  fam(ctx, 'noor', lerp(700, 330, ease(vraag)), MENS, { a: jou, t, uit: vraag > 0.5 ? 'denkt' : 'blij' });
  // drie vragen die je kunt krijgen
  const pan = [['doosje', 'doosje', (x, y) => d8doosje(ctx, x, y + 20, 0.9, { open: 1 })], ['dokter', 'dokter', (x, y) => persoon(ctx, 'kim', x, y + 190, 360, { t, uit: 'blij' })],
    ['telefoontje', 'tante', (x, y) => { persoon(ctx, 'petra', x - 20, y + 190, 360, { t, uit: 'praat', pose: 'vasthouden', hold: (c, hx, hy) => d8telKlein(c, hx, hy - 4, 0.42, { ang: -0.2 }) }); d8telKlein(ctx, x + 110, y - 120, 0.7, { bel: 0.5 + 0.5 * Math.sin(t * 8) }); }]];
  pan.forEach(([w, lab, fn], i) => { const a = on(q, w, 1, 0.5) * (1 - wil); if (a <= 0.01) return; const x = 820 + i * 420, y = 400;
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 180, y - 220, 360, 440, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.save(); roundRect(ctx, x - 180, y - 220, 360, 440, 18); ctx.clip(); fn(x, y); ctx.restore(); metaText(ctx, lab, x, y + 270, C.text2, 'center', 28); ctx.restore(); });
  // wil je weten wat erin staat? → een gesloten envelop; wat doe je met de uitslag? → de balans
  d8envelop(ctx, 900, 400, 1.5, { a: wil, open: uits * 0.7, slot: 1 - uits }); d8weegschaal(ctx, 1400, 800, Math.sin(t) * 0.18, [], [], { s: 0.8, a: uits });
  tag(ctx, 'havo · vwo · één niveau', 960, 860, C.paars, geen, 'center', 30);
};

// ---------------- Hoofdstuk 1 — Een doosje van internet ----------------
SCENES.n3 = (ctx, t, q) => { q._id = 'n3';
  const genoom = na(q, 'wat'), afk = na(q, 'vergelijking'), lac = na(q, 'lactose'), dia = na(q, 'diabetes', 2);
  if (!genoom) { // thuis: spugen, postzegel, rapport op de telefoon
    d8kamer(ctx); d8tafel(ctx, 560, 1080, 610);
    const zegel = on(q, 'postzegel', 1, 0.6), rap = on(q, 'rapport', 1, 0.6), hl = na(q, 'diabetes') ? 2 : na(q, 'koriander') ? 1 : na(q, 'voorouders') ? 0 : -1;
    fam(ctx, 'noor', 420, MENS, { t, uit: rap > 0.5 ? 'verbaasd' : 'neutraal', pose: 'vasthouden', hold: (c, hx, hy) => rap > 0.5 ? d8telKlein(c, hx, hy - 6, 0.5) : d8buisje(c, hx, hy - 10, 0.28, { vul: 0.4 }) });
    d8doosje(ctx, 760, 588, 0.19, { open: 1 - zegel, zegel }); // klein naast Noor, zoals een echt doosje
    if (rap < 0.99) zoomCircle(ctx, 1020, 330, 210, 770, 585, 'het doosje', 1 - rap, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(800, 100, 440, 460); d8doosje(ctx, 1000, 360, 1.15, { open: 1 - zegel, zegel }); d8buisje(ctx, 1150, 300, 0.9, { vul: 0.55 }); });
    if (rap > 0.01) { tag(ctx, 'zes weken later', 900, 140, C.text2, on(q, 'weken', 1, 0.5) * (1 - on(q, 'voorouders', 1, 0.4)), 'center', 28);
      zoomCircle(ctx, 1320, 450, 330, 600, 505, '', rap, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(980, 110, 680, 680); d8telefoon(ctx, 1320, 450, 0.88, [['afkomst', 'je voorouders'], ['koriander', 'smaakt het naar zeep?'], ['diabetes type 2', 'een risico', C.koraal]], { p: clamp((q.localT - _cue(q, 'rapport', 1)) / 2.2, 0, 1), hl }); }); }
    return; }
  if (!afk) { // wat leest het bedrijf? een paar honderdduizend plekken in drie miljard basenparen
    d8bg(ctx, 'micro'); const g = on(q, 'wat', 1, 0.6), n = on(q, 'honderdduizend', 1, 1.2), b = on(q, 'base', 1, 0.6), vs = on(q, 'verschillen', 1, 0.5);
    d8snpDraad(ctx, 160, 1760, 200, Math.round(70 * n), { a: g * (1 - 0.6 * b), seed: 5, r: 7 });
    naamBij(ctx, 'jouw genoom', 'drie miljard basenparen', 160, 140, g * (1 - 0.6 * b));
    d8a(ctx, n * (1 - 0.6 * b), () => metaText(ctx, 'gelezen: een paar honderdduizend plekken', 1760, 270, C.goud, 'right', 28));
    if (b > 0.01) { const x0 = 560, k = 6; ctx.save(); ctx.globalAlpha *= b; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(960, 214); ctx.lineTo(x0 + k * 64, 420); ctx.stroke(); ctx.restore();
      d8snpLadders(ctx, x0, 470, 'ATTGCACGTAC', 'ATTGCAAGTAC'.split('').map((c, i) => i === k ? 'T' : 'ATTGCACGTAC'[i]).join(''), k, { a: b, hlA: vs, dx: 64, labA: 'jij', labB: 'iemand anders' });
      d8a(ctx, vs, () => naamBij(ctx, 'één base verschilt', 'een snp', x0 + 11 * 64 + 20, 600, 1, 'left', C.goud)); metaText(ctx, 'vergroot · in werkelijkheid 2 nanometer breed', 1760, 870, C.text2, 'right', 28); }
    return; }
  if (!lac) { // afkomst = vergelijking met groepen in de databank
    d8bg(ctx, 'schema'); const pat = 'ACGTTGCAGTCA', grp = [['groep 1', 'ACGTAGCTGACA', C.teal], ['groep 2', 'TCGATGCAGTCG', C.groen], ['groep 3', 'ACCTTGGAGACA', C.oker]];
    const vg = on(q, 'vergelijking', 1, 0.6), lijk = on(q, 'lijken', 1, 0.8), sch = on(q, 'schatting', 1, 0.6), ander = on(q, 'ander', 1, 0.6), X0 = 560, DX = 76;
    const tegel = (x, y, b, kader, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 28, y - 28, 56, 56, 9); shape(ctx, DNA_BASE.base[b], kader ? C.goud : null, kader ? 4 : 1); text(ctx, b, x, y + 12, fTekst(32, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); };
    d8portret(ctx, 'noor', 300, 190, 70, { rand: C.goud, t }); metaText(ctx, 'jouw snp’s', 300, 300, C.goud, 'center', 28);
    for (let i = 0; i < pat.length; i++) tegel(X0 + i * DX, 190, pat[i], false, 1);
    const top = 1 - sch;
    grp.forEach(([n, s2, kl], gi) => { const y = 400 + gi * 150, aa = vg * top; if (aa <= 0.01) return; d8raster(ctx, 255, y + 20, 3, 3, 3, kl, { s: 1, dx: 44, a: aa }); metaText(ctx, n, 300, y + 64, C.text2, 'center', 28);
      let m = 0; for (let i = 0; i < s2.length; i++) { const zelf = s2[i] === pat[i]; if (zelf) m++; tegel(X0 + i * DX, y, s2[i], zelf && lijk > 0.5, aa); }
      d8a(ctx, aa * lijk, () => text(ctx, Math.round(m / s2.length * 100) + ' % gelijk', X0 + 12 * DX, y + 12, fTekst(34, 700), kl, 'left')); });
    if (sch > 0.01) { const bars = [['bedrijf A', [0.23, 0.41, 0.36], 1], ['bedrijf B', [0.09, 0.55, 0.36], ander]];
      bars.forEach(([n, f, a], bi) => { if (a <= 0.01) return; const y = 420 + bi * 170; ctx.save(); ctx.globalAlpha *= sch * a; metaText(ctx, n, 400, y - 20, C.text2, 'left', 28); let x = 400;
        f.forEach((v, j) => { const w = 1100 * v, kl = [C.teal, C.groen, C.oker][j]; roundRect(ctx, x + 2, y, w - 4, 70, 10); shape(ctx, rgba(kl, 0.4), kl, 2); text(ctx, Math.round(v * 100) + ' %', x + w / 2, y + 46, fTekst(32, 700), C.text, 'center'); x += w; }); ctx.restore(); });
      tag(ctx, 'een schatting, geen paspoort', 950, 820, C.goud, sch, 'center', 30); }
    return; }
  if (!dia) { // lactose: één plek; koriander: deels
    d8bg(ctx, 'schema'); const l = on(q, 'lactose', 1, 0.6), kl = on(q, 'klopt', 1, 0.6), ko = on(q, 'koriander', 2, 0.6), ka = on(q, 'kans', 1, 0.6);
    d8a(ctx, Math.max(0.4, l), () => { roundRect(ctx, 160, 150, 740, 640, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8melk(ctx, 300, 330, 1.2); naamBij(ctx, 'lactose', 'melk verteren', 400, 300);
      d8snpDraad(ctx, 220, 840, 520, 0, { w: 12 }); circ(ctx, 530, 520, 16, C.goud); metaText(ctx, 'bijna helemaal één plek', 530, 590, C.goud, 'center', 28);
      d8kansmeter(ctx, 530, 760, 90, 0.95, { a: kl, kl: C.groen }); d8a(ctx, kl, () => text(ctx, 'klopt meestal', 700, 735, fTekst(32, 700), C.groen, 'left')); });
    d8a(ctx, ko, () => { roundRect(ctx, 1020, 150, 740, 640, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8koriander(ctx, 1160, 330, 1.1); naamBij(ctx, 'koriander', 'smaakt naar zeep?', 1260, 300);
      d8snpDraad(ctx, 1080, 1700, 520, 6, { w: 12, seed: 9, r: 6, kl: rgba(C.goud, 0.55) }); circ(ctx, 1390, 520, 16, C.goud); metaText(ctx, 'voor een deel één gen', 1390, 590, C.goud, 'center', 28);
      d8kansmeter(ctx, 1390, 760, 90, 0.45, { a: ka }); d8a(ctx, ka, () => text(ctx, 'een kans', 1560, 735, fTekst(32, 700), C.goud, 'left')); });
    return; }
  // diabetes, hartziekte, gewicht: honderden varianten, en leefstijl
  d8bg(ctx, 'schema'); const hv = on(q, 'honderden', 1, 1.6), ls = on(q, 'leefstijl', 1, 0.6);
  ['diabetes', 'hartziekte', 'gewicht'].forEach((w, i) => tag(ctx, w, 600 + i * 360, 170, C.koraal, on(q, w, i === 0 ? 2 : 1, 0.4), 'center', 32));
  d8snpDraad(ctx, 200, 1720, 330, Math.round(160 * hv), { w: 12, seed: 2, r: 4, kl: rgba(C.goud, 0.85) }); d8a(ctx, hv, () => metaText(ctx, 'honderden varianten · elk een kleine rol', 960, 400, C.goud, 'center', 28));
  const balk = (y, f, kl, lab, a) => d8a(ctx, a, () => { metaText(ctx, lab, 400, y - 18, C.text2, 'left', 28); roundRect(ctx, 400, y, 1120, 56, 12); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, 400, y, 1120 * f, 56, 12); shape(ctx, rgba(kl, 0.6), kl, 2); });
  balk(540, 0.16 * hv, C.goud, 'wat de varianten samen doen', hv); balk(690, 0.72 * ls, C.teal, 'leefstijl', ls); d8appel(ctx, 1600, 700, 0.9, ls); d8schoen(ctx, 1740, 712, 0.8, ls);
};
SCENES.q4v = (ctx, t, q) => { q._id = 'q4v'; d8bg(ctx, 'schema');
  d8telefoon(ctx, 760, 470, 1, [['afkomst', 'schatting'], ['koriander', 'smaakt het naar zeep?'], ['diabetes type 2', '1,3 × zo groot als gemiddeld', C.koraal]], { hl: 2 });
  d8portret(ctx, 'noor', 1300, 420, 120, { rand: C.goud, uit: 'denkt', t }); vraagteken(ctx, 1480, 360, on(q, 'betekent', 1, 0.5), 140); };

SCENES.n5 = (ctx, t, q) => { q._id = 'n5';
  const zeker = na(q, 'uitslag'), bedrijf = na(q, 'doosje'), fam_ = na(q, 'deelt'), bal = na(q, 'zet');
  if (!zeker) { // 1 op 3 gemiddeld, 1,3 × = 4 op 10; leefstijl weegt zwaarder
    d8bg(ctx, 'schema'); const g = on(q, 'gemiddeld', 1, 0.5), j = on(q, 'komma', 1, 0.5), nw = on(q, 'niet', 1, 0.5), gw = on(q, 'gewicht', 1, 0.5), boven = 1 - 0.65 * nw;
    d8a(ctx, boven, () => { d8raster(ctx, 260, 250, 30, 15, 10, C.koraal, { s: 0.9, dx: 48, a: g, p: g, kies: d8verspreid }); d8a(ctx, g, () => naamBij(ctx, 'gemiddeld', '1 op 3 · 10 van de 30', 1000, 270));
      d8raster(ctx, 260, 470, 30, 15, 13, C.koraal, { s: 0.9, dx: 48, a: j, p: j, kies: d8verspreid }); d8a(ctx, j, () => naamBij(ctx, 'jij · 1,3 × zo groot', 'zo’n 4 op 10 · 13 van de 30', 1000, 490, 1, 'left', C.koraal)); });
    if (nw > 0.01) { d8kansmeter(ctx, 520, 800, 90, 0.43, { a: nw * (1 - gw), lab: '' }); d8a(ctx, nw * (1 - gw), () => { text(ctx, 'niet waarschijnlijk', 700, 760, fTekst(32, 700), C.text, 'left'); text(ctx, 'ook geen zekerheid', 700, 806, fTekst(32, 700), C.text2, 'left'); }); }
    const balk = (y, f, kl, lab, a) => d8a(ctx, a, () => { metaText(ctx, lab, 400, y - 16, C.text2, 'left', 28); roundRect(ctx, 400, y, 1000, 46, 12); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, 400, y, 1000 * f, 46, 12); shape(ctx, rgba(kl, 0.6), kl, 2); });
    balk(720, 0.16, C.goud, 'varianten die de chip leest', gw); balk(810, 0.72, C.teal, 'gewicht · eten · bewegen', gw); d8appel(ctx, 1500, 810, 0.8, gw); d8schoen(ctx, 1640, 822, 0.7, gw);
    return; }
  if (!bedrijf) { // de kernzin: bijna altijd een kans, zelden een zekerheid
    d8bg(ctx, 'schema'); const k = on(q, 'kans', 1, 0.6), z = on(q, 'zekerheid', 2, 0.6), h = on(q, 'houd', 1, 0.6);
    const f = 0.3 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.9)); d8kansmeter(ctx, 960, 520, 230, lerp(0.5, f, k), { kl: C.goud, lab: 'bijna altijd een kans', a: 1 });
    d8a(ctx, z, () => { ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(960, 520); ctx.lineTo(1190, 520); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'zelden een zekerheid', 1220, 530, fTekst(36, 600), C.text2, 'left'); });
    haak(ctx, 700, 1220, 640, 'dit komt elk hoofdstuk terug', C.groen, h);
    return; }
  if (!fam_) { // de andere kant van het doosje: bedrijf, onderzoekers, faillissement, politie
    d8bg(ctx, 'schema'); const b = on(q, 'bedrijf', 1, 0.6), o = on(q, 'onderzoekers', 1, 0.6), f = on(q, 'failliet', 1, 0.6), p = on(q, 'politie', 1, 0.6);
    d8doosje(ctx, 260, 470, 0.7, { open: 0, zegel: 1 }); pijl(ctx, 400, 470, 640, 470, C.line, b, 3, 16);
    d8plek(ctx, 'databank', 800, 470, 1.4, { a: b }); d8a(ctx, b, () => naamBij(ctx, 'het bedrijf', 'jouw dna in de databank', 800, 640, 1, 'center'));
    const tak = (y, soort, lab, meta, kl, a) => { if (a <= 0.01) return; pijl(ctx, 920, 470, 1260, y, kl, a, 3, 16); d8plek(ctx, soort, 1360, y, 0.9, { a, kl: kl === C.line ? '#AFC0D0' : kl }); d8a(ctx, a, () => naamBij(ctx, lab, meta, 1440, y + 10, 1, 'left', kl === C.line ? C.text : kl)); };
    tak(230, 'onderzoek', 'onderzoekers', 'delen', C.line, o); tak(470, 'bedrijf', 'failliet · verkocht', 'gebeurde in 2025', C.koraal, f); tak(710, 'politie', 'de politie', 'in sommige landen', C.line, p);
    return; }
  if (!bal) { // je deelt je DNA met je familie
    d8kamer(ctx); const b = on(q, 'broer', 1, 0.5), m = on(q, 'moeder', 1, 0.5), n = on(q, 'nichtje', 1, 0.5), g = on(q, 'getekend', 1, 0.6);
    fam(ctx, 'noor', 330, MENS, { t, uit: 'neutraal' });
    // deel van het DNA dat je deelt (gemiddeld): broer en moeder ± de helft, nichtje (kind van je tante) ± een achtste
    const strip = (x, y, f, a) => d8a(ctx, a, () => { roundRect(ctx, x - 90, y, 180, 26, 8); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, x - 90, y, 180 * f, 26, 8); shape(ctx, rgba(C.goud, 0.75), C.goud, 1.5); });
    strip(330, 180, 1, 1); metaText(ctx, 'jouw dna', 330, 160, C.goud, 'center', 28);
    fam(ctx, 'kind', 760, MENS * 1.15 / 1.68, { a: b, t, uit: 'blij' }); strip(760, 380, 0.5, b); d8a(ctx, b, () => metaText(ctx, 'broer · ± de helft', 760, 360, C.text2, 'center', 28));
    fam(ctx, 'linda', 1080, MENS, { a: m, t }); strip(1080, 180, 0.5, m); d8a(ctx, m, () => metaText(ctx, 'moeder · de helft', 1080, 160, C.text2, 'center', 28));
    // nichtje (baby) in een reiswieg op de vloer, ± 50 cm
    d8a(ctx, n, () => { ctx.fillStyle = '#5A6A88'; roundRect(ctx, 1380, 690, 260, 110, 30); ctx.fill(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1510, 700, 120, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); persoon(ctx, 'baby', 1510, 712, 160, { t, uit: 'slaapt' }); });
    strip(1510, 560, 0.125, n); d8a(ctx, n, () => metaText(ctx, 'nichtje · ± een achtste', 1510, 540, C.text2, 'center', 28));
    tag(ctx, 'niets getekend', 1180, 880 - 30, C.koraal, g, 'center', 30);
    return; }
  // de balans
  d8bg(ctx, 'schema'); const L = [['nieuwsgierigheid', on(q, 'nieuwsgierigheid', 1, 0.5)], ['afkomst', on(q, 'afkomst', 1, 0.5)], ['een familielid vinden', on(q, 'familielid', 1, 0.5)]], R = [['je gegevens', on(q, 'gegevens', 1, 0.5)], ['een stukje familie', on(q, 'stukje', 1, 0.5)]];
  const w = on(q, 'balans', 1, 0.8), links = on(q, 'links', 1, 0.5), rechts = on(q, 'rechts', 1, 0.5), vs = on(q, 'verschilt', 1, 0.8);
  const tilt = -0.55 * L.reduce((s, x) => s + x[1], 0) / 3 + 0.55 * R.reduce((s, x) => s + x[1], 0) / 2.4 + vs * 0.45 * Math.sin(t * 1.2);
  d8weegschaal(ctx, 960, 820, tilt, L, R, { a: w, labL: links > 0.5 ? 'wat je wint' : '', labR: rechts > 0.5 ? 'wat je weggeeft' : '' });
  tag(ctx, 'verschilt per persoon', 960, 150, C.goud, vs, 'center', 30);
};

// ---------------- Hoofdstuk 2 — Een kind op komst ----------------
SCENES.n7 = (ctx, t, q) => { q._id = 'n7';
  const lab = na(q, 'lab'), deel = na(q, 'bijna'), nipt = na(q, 'eerder'), chrom = na(q, 'geeft'), uitsl = na(q, 'afwijkende'), aanbod = na(q, 'ook');
  if (!lab) { // hielprik thuis: Mirjam prikt, Esra kijkt, de baby ligt op het aankleedkussen
    d8kamer(ctx); d8tafel(ctx, 640, 1100, 600); ctx.fillStyle = '#7FA6C0'; roundRect(ctx, 680, 572, 380, 30, 14); ctx.fill();
    fam(ctx, 'esra', 470, MENS, { outfit: 'kraam', t, uit: 'blij' }); persoon(ctx, 'baby', 870, 584, 155, { t, uit: 'neutraal' }); fam(ctx, 'mirjam', 1180, MENS, { t, uit: 'blij', pose: 'vasthouden', kijk: -1, hold: (c, hx, hy) => d8hielkaart(c, hx, hy - 8, 0.14, { vul: on(q, 'druppels', 1, 0.8) * 0.8 }) });
    const h = on(q, 'hiel', 1, 0.6), d = on(q, 'druppels', 1, 0.8), hp = on(q, 'hielprik', 1, 0.6);
    zoomCircle(ctx, 1530, 330, 240, 950, 580, 'de hiel', h, () => { ctx.fillStyle = '#26324C'; ctx.fillRect(1280, 80, 500, 500); d8voetje(ctx, 1500, 360, 0.95, { prik: h, druppel: d }); d8hielkaart(ctx, 1600, 500, 0.55, { vul: d * 0.8 }); });
    naamBij(ctx, 'hielprik', 'dag 3 tot 7 · een paar druppels', 1530, 690, hp, 'center');
    return; }
  if (!deel) { // ruim twintig zeldzame aandoeningen; dieet, medicijn, behandeling
    d8bg(ctx, 'schema'); const l = on(q, 'lab', 1, 0.6), z = on(q, 'twintig', 1, 1.2), v = on(q, 'vroeg', 1, 0.6), i3 = on(q, 'dieet', 1, 0.5);
    d8hielkaart(ctx, 250, 330, 0.75, { vul: 1 }); pijl(ctx, 410, 330, 560, 330, C.line, l, 3, 16); d8a(ctx, l, () => metaText(ctx, 'naar het lab', 485, 420, C.text2, 'center', 28));
    const n = 26; for (let k = 0; k < n; k++) { const a = clamp(z * n - k, 0, 1); if (a <= 0.01) continue; const x = 640 + (k % 13) * 88, y = 260 + Math.floor(k / 13) * 100; d8a(ctx, a, () => { roundRect(ctx, x - 36, y - 36, 72, 72, 12); shape(ctx, rgba(C.fill, 1), C.line, 1.5); }); if (v > 0.01) vink_(ctx, x, y, 18, v * a, C.groen); }
    d8a(ctx, z, () => naamBij(ctx, 'ruim twintig zeldzame aandoeningen', '', 640, 480)); d8a(ctx, v, () => text(ctx, 'vroeg erbij = iets aan te doen', 640, 540, fTekst(34, 600), C.groen, 'left'));
    [['dieet', d8bord], ['medicijn', d8flesje], ['behandeling', d8stetho]].forEach(([w, fn], i) => { const a = on(q, w, 1, 0.5); const x = 560 + i * 400; fn(ctx, x, 690, 1.1, a); d8a(ctx, a, () => metaText(ctx, w, x, 790, C.text2, 'center', 28)); });
    d8a(ctx, on(q, 'voorkomt', 1, 0.5), () => metaText(ctx, 'schade voorkomen of beperken', 960, 850, C.groen, 'center', 28));
    return; }
  if (!nipt) { // bijna alle ouders doen mee
    d8bg(ctx, 'schema'); const b = on(q, 'bijna', 1, 1.2), m = on(q, 'moet', 1, 0.5), bl = on(q, 'balans', 1, 0.8);
    d8raster(ctx, 240, 190, 100, 10, 99, C.goud, { s: 0.9, dx: 52, dy: 62, p: b }); d8a(ctx, b, () => naamBij(ctx, 'bijna alle ouders', '± 99 van de 100', 210, 830));
    tag(ctx, 'vrijwillig', 1380, 180, C.text2, m, 'center', 30);
    d8weegschaal(ctx, 1380, 820, -0.85 * bl, [['vroeg erbij', bl]], [['een prikje', bl]], { s: 0.82, a: bl, labL: 'iets aan te doen', labR: 'in de hiel' });
    return; }
  if (!chrom) { // NIPT: stukjes DNA van het kind in het bloed van de moeder
    d8kamer(ctx); const n = on(q, 'nipt', 1, 0.6), s = on(q, 'stukjes', 1, 0.8), k = on(q, 'kind', 1, 0.6);
    fam(ctx, 'esra', 420, MENS, { t, uit: 'neutraal', zwanger: 0.85 }); fam(ctx, 'mirjam', 700, MENS, { t, uit: 'blij', pose: 'vasthouden', kijk: -1, hold: (c, hx, hy) => d8bloedbuis(c, hx, hy - 10, 0.3, { vul: 0.6 }) });
    naamBij(ctx, 'NIPT', 'bloed van de moeder', 180, 170, n);
    zoomCircle(ctx, 1320, 430, 300, 720, 520, 'bloed van de moeder · vergroot', s, () => d8plasma(ctx, 1320, 430, 300, t, { kind: k, n: 30 }));
    d8a(ctx, k * s, () => naamBij(ctx, 'stukjes DNA van het kind', 'via de placenta', 1320, 832, 1, 'center', C.goud));
    return; }
  if (!uitsl) { // extra chromosoom 21, 18 of 13 (lengtes naar basenparen: 13 ± 114, 18 ± 80, 21 ± 47 miljoen)
    d8bg(ctx, 'schema'); const sets = [['21', 105], ['18', 178], ['13', 250]];
    sets.forEach(([n, L], i) => { const a = Math.max(0.4, on(q, n, 1, 0.5)); const x = 420 + i * 540, y = 480; cdChromosoom(ctx, x - 120, y, L, { w: 24, a }); cdChromosoom(ctx, x, y, L, { w: 24, a });
      cdChromosoom(ctx, x + 120, y, L, { w: 24, a: a * on(q, n, 1, 1.2), hl: 1 }); const a3 = on(q, n, 1, 1.2); d8a(ctx, a, () => naamBij(ctx, 'chromosoom ' + n, a3 > 0.5 ? 'drie in plaats van twee' : '', x, 760, 1, 'center')); });
    tag(ctx, 'extra chromosoom 21 = downsyndroom', 420, 170, C.goud, on(q, 'downsyndroom', 1, 0.6), 'center', 30); metaText(ctx, 'lengtes naar het aantal basenparen', 1760, 870, C.text2, 'right', 28);
    return; }
  if (!aanbod) { // kans → vervolgtest → keuze
    d8bg(ctx, 'schema'); const k = on(q, 'afwijkende', 1, 0.6), v = on(q, 'vervolgtest', 1, 0.6), c = on(q, 'keuze', 1, 0.6);
    d8kansmeter(ctx, 340, 540, 140, 0.6, { a: k, kl: C.goud, lab: 'een kans', sub: 'geen diagnose' });
    pijl(ctx, 540, 490, 820, 490, C.line, v, 3, 16); d8bloedbuis(ctx, 960, 480, 1.5, { a: v, vul: 0.5, dop: '#5BA4C9' }); d8a(ctx, v, () => naamBij(ctx, 'vervolgtest', 'vlokkentest of vruchtwaterpunctie', 960, 700, 1, 'center'));
    pijl(ctx, 1100, 490, 1380, 490, C.line, c, 3, 16); d8wegwijzer(ctx, 1590, 540, 1.6, c); d8a(ctx, c, () => naamBij(ctx, 'een keuze', 'geen lab heeft het antwoord', 1590, 700, 1, 'center', C.goud));
    return; }
  // laatste zin ('Iets meer dan de helft …') is in versie 2.0 weggeknipt: de deelname is nu ± 2 op 3 tot 3 op 4 (pns.nl 2023: 67,8 %, 2024: 73,5 %)
  d8bg(ctx, 'schema'); const a2 = on(q, 'aanbod', 1, 0.5), p2 = on(q, 'plicht', 1, 0.5);
  d8bloedbuis(ctx, 700, 470, 1.5); d8wegwijzer(ctx, 1220, 520, 1.6, 1); naamBij(ctx, 'NIPT', 'een keuze', 700, 700, 1, 'center', C.goud);
  tag(ctx, 'een aanbod', 960, 200, C.groen, a2, 'center', 40); tag(ctx, 'geen plicht', 960, 290, C.text2, p2, 'center', 40);
};
SCENES.q8v = (ctx, t, q) => { q._id = 'q8v'; d8bg(ctx, 'schema');
  roundRect(ctx, 200, 170, 680, 600, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8hielkaart(ctx, 540, 360, 0.9); naamBij(ctx, 'hielprik', 'bijna alle ouders', 540, 560, 1, 'center');
  d8a(ctx, on(q, 'nipt', 1, 0.5), () => { roundRect(ctx, 1040, 170, 680, 600, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8bloedbuis(ctx, 1280, 380, 1.3); d8wegwijzer(ctx, 1500, 400, 1.1); naamBij(ctx, 'NIPT', 'een echte keuze', 1380, 600, 1, 'center', C.goud); });
  vraagteken(ctx, 960, 520, on(q, 'komt', 1, 0.5), 160); };

SCENES.n9 = (ctx, t, q) => { q._id = 'n9';
  const drag = na(q, 'nog'), drager = na(q, 'drager', 2), dertig = na(q, 'nederland'), bal = na(q, 'doet');
  if (!drag) { // allebei screening; het verschil zit in wat je daarna kunt
    d8bg(ctx, 'schema'); const vr = on(q, 'vrijwillig', 1, 0.5), sc = on(q, 'screening', 1, 0.5), kl = on(q, 'klacht', 1, 0.5), vo = on(q, 'vervolgonderzoek', 1, 0.5), vs = on(q, 'verschil', 1, 0.6), be = on(q, 'behandeling', 1, 0.6), af = on(q, 'afweging', 1, 0.6);
    const kol = (x, titel, icoon) => { roundRect(ctx, x - 330, 140, 660, 700, 20); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); icoon(); naamBij(ctx, titel, '', x, 220, 1, 'center'); };
    kol(560, 'hielprik', () => d8hielkaart(ctx, 560, 320, 0.55)); kol(1360, 'NIPT', () => d8bloedbuis(ctx, 1360, 320, 0.9));
    const gedeeld = 1 - 0.6 * vs; [['vrijwillig', vr, 440], ['screening: aan iedereen', sc, 510], ['zonder klacht', kl, 580], ['afwijkend → vervolgonderzoek', vo, 650]].forEach(([s, a, y]) => { tag(ctx, s, 560, y, C.text2, a * gedeeld, 'center', 28); tag(ctx, s, 1360, y, C.text2, a * gedeeld, 'center', 28); });
    d8a(ctx, be, () => { d8stetho(ctx, 470, 770, 0.6); text(ctx, 'begin van een behandeling', 530, 790, fTekst(32, 700), C.groen, 'left'); });
    d8a(ctx, af, () => { d8weegschaal(ctx, 1150, 812, Math.sin(t) * 0.3, [], [], { s: 0.16 }); text(ctx, 'begin van een afweging', 1230, 790, fTekst(32, 700), C.goud, 'left'); });
    return; }
  if (!drager) { // dragerschapstest bij de klinisch geneticus (Dr. Kim en een cliënte, zoals in Erfelijkheid 6)
    d8kamer(ctx); d8tafel(ctx, 700, 1220, 600); const d = on(q, 'dragerschapstest', 1, 0.6), h = on(q, 'huisarts', 1, 0.6);
    persoon(ctx, 'kim', 1340, VL, MENS, { pose: 'zit', stoel: true, tafel: 600, kijk: -1, t, uit: 'praat' }); persoon(ctx, 'sanne', 580, VL, MENS, { outfit: 'gewoon', pose: 'zit', stoel: true, tafel: 600, t, uit: 'neutraal' });
    d8a(ctx, d, () => { ctx.save(); ctx.translate(960, 590); ctx.rotate(-0.05); roundRect(ctx, -70, -12, 140, 12, 2); shape(ctx, '#F2F2EE', '#C8D0D8', 1); ctx.restore(); });
    naamBij(ctx, 'dragerschapstest', 'vóór een zwangerschap', 760, 200, d); d8a(ctx, h, () => metaText(ctx, 'via de huisarts of een klinisch geneticus', 760, 300, C.text2, 'left', 28));
    return; }
  if (!dertig) { // drager: het allel één keer (taaislijmziekte, CFTR op chromosoom 7)
    d8bg(ctx, 'schema'); const r = on(q, 'recessieve', 1, 0.6), al = on(q, 'allel', 1, 0.6), ta = on(q, 'taaislijmziekte', 1, 0.6);
    d8telpop(ctx, 360, 560, 5, '#8FA0B5'); metaText(ctx, 'drager · merkt er niets van', 360, 620, C.text2, 'center', 28);
    const x = 860, y = 480, L = 300; cdChromosoom(ctx, x, y, L, { w: 26, cen: 0.4 }); cdChromosoom(ctx, x + 220, y, L, { w: 26, cen: 0.4, segsL: [[0, 0.62, CD.std], [0.62, 0.68, C.koraal], [0.68, 1, CD.std]], segsR: [[0, 0.62, CD.std], [0.62, 0.68, C.koraal], [0.68, 1, CD.std]] });
    d8a(ctx, al, () => { genoTekst(ctx, 'A', x - 90, y + 70, 60); genoTekst(ctx, 'a', x + 310, y + 70, 60, { kl: C.koraal, kleur: false }); naamBij(ctx, 'drager: Aa', 'het allel één keer', x + 110, 820, 1, 'center'); });
    d8a(ctx, ta, () => naamBij(ctx, 'taaislijmziekte', 'recessief · gen op chromosoom 7', 1380, 330, 1, 'left', C.koraal)); d8a(ctx, r, () => metaText(ctx, 'chromosoom 7 · een paar', x + 110, 200, C.text2, 'center', 28));
    return; }
  if (!bal) { // 1 op 30 drager; Aa × Aa → 1 op 4
    d8bg(ctx, 'schema'); const d30 = on(q, 'dertig', 1, 1.2), be = on(q, 'beide', 1, 0.6), vier = on(q, 'vier', 1, 0.6), feit = on(q, 'feit', 1, 0.6);
    d8raster(ctx, 200, 260, 30, 6, 1, C.koraal, { s: 1.25, dx: 64, dy: 84, p: d30, kies: d8verspreid }); d8a(ctx, d30, () => naamBij(ctx, '± 1 op 30 is drager', 'nederland', 170, 740));
    kruisingsSchema(ctx, 1000, 280, { links: ['A', 'a'], boven: ['A', 'a'], vak: 180, a: be, prog: on(q, 'beide', 1, 2.5), kopLinks: 'ouder 2', kopBoven: 'ouder 1', hl: vier > 0.5 ? 3 : -1,
      cel: (i, j, g) => g === 'aa' ? { t: g, kl: C.koraal, vul: rgba(C.koraal, 0.25 * vier), rand: vier > 0.5 ? C.koraal : null } : undefined });
    d8a(ctx, vier, () => naamBij(ctx, 'kans 1 op 4', 'per kind', 1410, 560, 1, 'left', C.koraal)); tag(ctx, 'een feit uit de erfelijkheidsles', 1180, 850, C.groen, feit, 'center', 28);
    return; }
  d8bg(ctx, 'schema'); const b = Math.max(0.35, on(q, 'balans', 1, 0.6));
  tag(ctx, 'geen biologie meer', 960, 170, C.text2, on(q, 'biologie', 1, 0.5) * (1 - 0.5 * b), 'center', 30);
  d8weegschaal(ctx, 960, 820, Math.sin(t * 0.8) * 0.3 * b, [['zekerheid vooraf', on(q, 'zekerheid', 1, 0.5)]], [['een vraag die je niet stelde', on(q, 'gevraagd', 1, 0.5)]], { a: b, labL: 'feit', labR: 'waarde' });
};
SCENES.n9b = (ctx, t, q) => { q._id = 'n9b'; d8bg(ctx, 'schema');
  const b = on(q, 'biologisch', 1, 0.6), e = on(q, 'ethisch', 1, 0.6), na1 = on(q, 'nagaan', 1, 0.6), on2 = on(q, 'oneens', 1, 0.6), bv1 = on(q, 'bijvoorbeeld', 1, 0.5), bv2 = on(q, 'bijvoorbeeld', 2, 0.5);
  regel(ctx, 'twee soorten argumenten', 960, 420, 1 - b, C.text, 56, 'center', 700);
  d8weegschaal(ctx, 960, 860, Math.sin(t * 0.8) * 0.2, [], [], { s: 0.6, a: 1 - b });
  const kaart = (x, kl, titel, meta, a, inhoud) => d8a(ctx, a, () => { roundRect(ctx, x - 390, 120, 780, 400, 20); shape(ctx, rgba(kl, 0.1), kl, 2.5); text(ctx, titel, x, 190, fTekst(46, 700), kl, 'center'); metaText(ctx, meta, x, 240, C.text2, 'center', 28); inhoud(); });
  kaart(520, D8.feit, 'biologisch argument', 'steunt op een feit', b, () => { kruisingsSchema(ctx, 460, 330, { links: ['A', 'a'], boven: ['A', 'a'], vak: 66, hl: 3, a: bv1 }); d8a(ctx, bv1, () => text(ctx, '“de kans is 1 op 4”', 520, 495, fTekst(34, 600), C.text, 'center')); });
  kaart(1400, D8.waarde, 'ethisch argument', 'steunt op normen en waarden', e, () => { d8wolkje(ctx, 1400, 400, 'ik wil het liever niet van tevoren weten', { a: bv2, px: 32, kl: D8.waarde }); });
  d8a(ctx, na1, () => { vink_(ctx, 360, 640, 28, 1, C.groen); text(ctx, 'klopt het? na te gaan', 410, 652, fTekst(36, 700), C.groen, 'left'); });
  if (on2 > 0.01) { metaText(ctx, 'dezelfde feiten, een ander oordeel', 1400, 580, C.text2, 'center', 28); persoon(ctx, 'linda', 1250, 880, 250, { a: on2, t, uit: 'denkt' }); persoon(ctx, 'rachid', 1560, 880, 262, { a: on2, t, uit: 'praat', kijk: -1 });
    d8wolkje(ctx, 1130, 690, 'ik wil het weten', { a: on2, px: 28 }); d8wolkje(ctx, 1680, 690, 'ik liever niet', { a: on2, px: 28 }); }
};

// ---------------- Hoofdstuk 3 — Het zit in de familie ----------------
SCENES.n11 = (ctx, t, q) => { q._id = 'n11';
  const test = na(q, 'wat', 1), proc = na(q, 'met', 1), opt = na(q, 'iets'), weten = na(q, 'daarom'), hunt = na(q, 'vergelijk'), recht = na(q, 'ouder');
  if (!test) { // telefoontje: Noor en Tante Petra, elk thuis
    d8kamer(ctx); ctx.fillStyle = '#16203A'; ctx.fillRect(956, 0, 8, VL); const v = on(q, 'variant', 1, 0.6), br = on(q, 'brca1', 1, 0.6), te = on(q, 'testen', 1, 0.6);
    fam(ctx, 'noor', 330, MENS, { t, uit: te > 0.5 ? 'denkt' : 'ernstig', pose: 'vasthouden', hold: (c, hx, hy) => d8telKlein(c, hx, hy - 6, 0.5) });
    fam(ctx, 'petra', 1620, MENS, { t, uit: 'praat', pose: 'vasthouden', kijk: -1, hold: (c, hx, hy) => d8telKlein(c, hx, hy - 6, 0.5) });
    metaText(ctx, 'jij', 330, 860 - 10, C.text2, 'center', 28); d8a(ctx, 1, () => metaText(ctx, 'je tante', 1620, 860 - 10, C.text2, 'center', 28));
    zoomCircle(ctx, 960, 360, 230, 960, 360, '', v, () => { ctx.fillStyle = '#121A26'; ctx.fillRect(700, 100, 520, 520); cdChromosoom(ctx, 960, 380, 260, { w: 26, cen: 0.3, segsL: [[0, 0.62, CD.std], [0.62, 0.69, C.goud], [0.69, 1, CD.std]], segsR: [[0, 0.62, CD.std], [0.62, 0.69, C.goud], [0.69, 1, CD.std]] }); });
    naamBij(ctx, 'BRCA1', 'een gen op chromosoom 17', 960, 650, br, 'center', C.goud);
    vraagteken(ctx, 470, 280, te, 110);
    return; }
  if (!proc) { // de test is precies; de betekenis is een kans
    d8bg(ctx, 'schema'); const p = on(q, 'precies', 1, 0.6), k = on(q, 'kans', 1, 0.6);
    roundRect(ctx, 200, 200, 680, 560, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); text(ctx, 'wat de test zegt', 540, 280, fTekst(40, 700), C.text, 'center');
    tag(ctx, 'variant: ja', 540, 440, C.koraal, p, 'center', 40); tag(ctx, 'variant: nee', 540, 560, C.groen, p, 'center', 40); d8a(ctx, p, () => metaText(ctx, 'precies', 540, 680, C.text2, 'center', 28));
    d8a(ctx, k, () => { roundRect(ctx, 1040, 200, 680, 560, 20); shape(ctx, rgba(C.goud, 0.08), C.goud, 2); text(ctx, 'wat het betekent', 1380, 280, fTekst(40, 700), C.goud, 'center'); d8kansmeter(ctx, 1380, 600, 170, 0.5 + 0.2 * Math.sin(t), { lab: 'een kans' }); });
    return; }
  if (!opt) { // 70 % tegenover 1 op 7
    d8bg(ctx, 'schema'); const m = on(q, 'zeventig', 1, 1.2), z = on(q, 'zeven', 2, 1.2);
    d8raster(ctx, 260, 250, 100, 10, 70, C.koraal, { s: 0.8, dx: 46, dy: 58, p: m }); d8a(ctx, m, () => naamBij(ctx, 'met de variant', 'tot zo’n 70 van de 100', 260, 870 - 40, 1, 'left', C.koraal));
    d8raster(ctx, 1100, 250, 100, 10, 14, C.koraal, { s: 0.8, dx: 46, dy: 58, p: z, kies: d8verspreid }); d8a(ctx, z, () => naamBij(ctx, 'zonder de variant', 'ongeveer 1 op 7 · nederland', 1100, 870 - 40));
    d8a(ctx, Math.max(m, z), () => metaText(ctx, 'vrouwen die ooit borstkanker krijgen', 960, 180, C.text2, 'center', 28));
    return; }
  if (!weten) { // er is iets aan te doen
    d8bg(ctx, 'schema'); const c = Math.max(0.35, on(q, 'controleren', 1, 0.6)), o = Math.max(0.35, on(q, 'operatie', 1, 0.6)), be = on(q, 'borsten', 1, 0.6);
    d8a(ctx, c, () => { roundRect(ctx, 260, 220, 600, 480, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8kalender(ctx, 560, 420, 1.3); naamBij(ctx, 'vaker controleren', '', 560, 640, 1, 'center'); });
    d8a(ctx, o, () => { roundRect(ctx, 1060, 220, 600, 480, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); d8plek(ctx, 'kliniek', 1360, 420, 1.3); naamBij(ctx, 'operatie uit voorzorg', 'de borsten, of de eierstokken', 1360, 640, 1, 'center'); });
    tag(ctx, 'ook de kans op eierstokkanker is verhoogd', 1360, 800, C.koraal, on(q, 'verhoogd', 1, 0.5), 'center', 28);
    return; }
  if (!hunt) { // weten of niet weten; ook mannen
    d8bg(ctx, 'schema'); const w = Math.max(0.35, on(q, 'weten', 1, 0.6)), n = Math.max(0.35, on(q, 'anderen', 1, 0.6)), al = on(q, 'allebei', 1, 0.6), m = on(q, 'mannen', 1, 0.6);
    d8envelop(ctx, 560, 400, 1.5, { a: w, open: 1 }); d8a(ctx, w, () => naamBij(ctx, 'weten', '', 560, 600, 1, 'center'));
    d8envelop(ctx, 1360, 400, 1.5, { a: n, slot: 1 }); d8a(ctx, n, () => naamBij(ctx, 'niet weten', '', 1360, 600, 1, 'center'));
    haak(ctx, 460, 1460, 650, 'allebei kan', C.groen, al * (1 - m));
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; sbSymbool(ctx, 660, 780, 44, 'm', false); circ(ctx, 660, 780, 32, rgba(C.koraal, 0.85)); pijl(ctx, 720, 780, 900, 780, C.koraal, 1, 4, 18); sbSymbool(ctx, 960, 780, 44, null, false); circ(ctx, 960, 780, 30, rgba(C.koraal, 0.85)); text(ctx, 'ook mannen: hebben en doorgeven', 1040, 792, fTekst(36, 600), C.text, 'left'); ctx.restore(); }
    return; }
  if (!recht) { // Huntington
    d8bg(ctx, 'schema'); const h = 1, z = on(q, 'zeker', 1, 0.6), b = on(q, 'dertigste', 1, 1.2), ni = on(q, 'tegenhoudt', 1, 0.6);
    naamBij(ctx, 'ziekte van Huntington', 'erfelijk · dominant', 200, 170, h);
    d8kansmeter(ctx, 1500, 420, 150, 0.97 * z, { a: z, kl: C.koraal, lab: 'vrijwel zeker', sub: 'met de variant' });
    d8tijdlijn(ctx, 200, 1160, 520, { a: h, band: [30, 50], p: b }); d8a(ctx, b, () => metaText(ctx, 'meestal begint het tussen 30 en 50', lerp(200, 1160, 40 / 80), 460, C.koraal, 'center', 28));
    tag(ctx, 'nog niets dat de ziekte tegenhoudt', 680, 720, C.text2, ni, 'center', 30);
    return; }
  d8bg(ctx, 'schema'); const v = on(q, 'vijf', 2, 0.8), r = on(q, 'recht', 1, 0.6);
  d8raster(ctx, 500, 330, 10, 10, 2, C.goud, { s: 1.8, dx: 54, p: v, kies: d8verspreid }); d8a(ctx, v, () => naamBij(ctx, 'ongeveer 1 op 5 laat zich testen', 'kinderen van een ouder met huntington', 500, 460));
  d8envelop(ctx, 1460, 330, 1.2, { a: r, slot: 1 }); tag(ctx, 'het recht om niet te weten', 960, 680, C.goud, r, 'center', 40);
};
// stamboompje met symbolen (vraag 3 en het antwoord): moeder met variant (koraal), jij, je kinderen
function d8familieboom(ctx, o = {}) { const { a = 1, jijVariant = false, kinderen = 0, kindKl = null, vader = 0, vaderVraag = false, moederVariant = true, jijA = 1, jijLab = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = 44, y1 = 220, y2 = 470, y3 = 720, xv = 760, xm = 1160, xj = 960, xp = 1340; ctx.strokeStyle = C.line; ctx.lineWidth = 3;
  const lijn = (pts) => { ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]); ctx.stroke(); };
  lijn([[xv + r, y1], [xm - r, y1]]); lijn([[xj, y1], [xj, y2 - r]]);
  ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * vader; sbSymbool(ctx, xv, y1, r, 'm', false, { vraag: vaderVraag }); metaText(ctx, vaderVraag ? 'vader · nooit getest' : 'vader', xv - r - 24, y1 + 10, C.text2, 'right', 28); ctx.restore();
  sbSymbool(ctx, xm, y1, r, 'v', false); if (moederVariant) circ(ctx, xm, y1, r - 8, rgba(C.koraal, 0.85)); metaText(ctx, moederVariant ? 'moeder · variant' : 'moeder', xm + r + 24, y1 + 10, moederVariant ? C.koraal : C.text2, 'left', 28);
  ctx.save(); ctx.globalAlpha *= jijA; sbSymbool(ctx, xj, y2, r, 'v', false, { hl: 1 }); if (jijVariant) circ(ctx, xj, y2, r - 8, rgba(C.koraal, 0.85)); metaText(ctx, jijLab || (jijVariant ? 'jij · variant' : 'jij · geen variant'), xj - r - 24, y2 + 10, jijVariant ? C.koraal : C.goud, 'right', 28); ctx.restore();
  if (kinderen > 0.01) { ctx.save(); ctx.globalAlpha *= kinderen; sbSymbool(ctx, xp, y2, r, 'm', false); metaText(ctx, 'partner', xp + r + 24, y2 + 10, C.text2, 'left', 28); lijn([[xj + r, y2], [xp - r, y2]]); const mx = (xj + xp) / 2; lijn([[mx, y2], [mx, y3 - 90], [mx - 120, y3 - 90], [mx - 120, y3 - r * 1.2]]); lijn([[mx, y3 - 90], [mx + 120, y3 - 90], [mx + 120, y3 - r * 1.2]]);
    for (const dx of [-120, 120]) { sbSymbool(ctx, mx + dx, y3, r, null, false, { vraag: !kindKl }); if (kindKl) circ(ctx, mx + dx, y3, r - 10, rgba(kindKl, 0.6)); } metaText(ctx, 'je kinderen', mx, y3 + 90, C.text2, 'center', 28); ctx.restore(); }
  ctx.restore(); return { xv, y1, xj, y2, xp, xm }; }
SCENES.q12v = (ctx, t, q) => { q._id = 'q12v'; d8bg(ctx, 'schema'); const g = on(q, 'gericht', 1, 0.6), k = on(q, 'kinderen', 1, 0.6);
  d8familieboom(ctx, { jijA: Math.max(0.35, g), jijLab: g > 0.5 ? 'jij · geen variant' : 'jij', kinderen: k }); tag(ctx, 'gerichte test op die ene variant', 420, 560, C.text2, g, 'center', 28); };
SCENES.n13 = (ctx, t, q) => { q._id = 'n13';
  const dom = na(q, 'had'), vad = na(q, 'andersom'), gen = na(q, 'daarom'), verz = na(q, 'feit'), bal = na(q, 'balans', 2);
  if (!dom) { d8bg(ctx, 'schema'); const n = on(q, 'niet', 1, 0.6); d8familieboom(ctx, { kinderen: 1, kindKl: n > 0.5 ? C.groen : null }); tag(ctx, 'niet van jou', 1530, 720, C.groen, n, 'center', 32); return; }
  if (!vad) { // had je de variant wél: elk kind de helft kans (dominant)
    d8bg(ctx, 'schema'); const h = on(q, 'helft', 1, 0.6), d = on(q, 'dominant', 1, 0.6);
    sbSymbool(ctx, 300, 330, 60, 'v', false, { hl: 1 }); circ(ctx, 300, 330, 50, rgba(C.koraal, 0.85)); metaText(ctx, 'stel: jij hebt de variant', 300, 440, C.koraal, 'center', 28); genoTekst(ctx, 'Vv', 300, 530, 56, { kl: C.text, kleur: false });
    kruisingsSchema(ctx, 820, 300, { links: ['v', 'v'], boven: ['V', 'v'], vak: 160, kopBoven: 'jij', kopLinks: 'partner', klBoven: C.koraal, klLinks: C.teal, prog: on(q, 'had', 1, 2),
      cel: (i, j, g) => g.includes('V') ? { t: g, kl: C.koraal, vul: rgba(C.koraal, 0.25 * h) } : undefined });
    d8a(ctx, h, () => naamBij(ctx, 'elk kind: de helft kans', '2 van de 4', 1220, 380, 1, 'left', C.koraal)); d8a(ctx, d, () => naamBij(ctx, 'dominant', 'één keer V is genoeg', 1220, 560));
    metaText(ctx, 'V = variant · v = zonder variant', 820, 820 - 10, C.text2, 'left', 28);
    return; }
  if (!gen) { // andersom: nu weet je ook iets over je vader
    d8bg(ctx, 'schema'); const o = on(q, 'vader', 1, 0.6), h = on(q, 'hem', 1, 0.6), nw = on(q, 'misschien', 1, 0.6);
    const P = d8familieboom(ctx, { jijVariant: true, moederVariant: false, vader: 1, vaderVraag: o > 0.5 });
    pijl(ctx, P.xj - 34, P.y2 - 52, P.xv + 44, P.y1 + 54, C.goud, h, 4, 18);
    tag(ctx, 'nu weet je ook iets over hem', 960, 680, C.goud, h, 'center', 34); tag(ctx, 'misschien wilde hij dat niet weten', 960, 780, C.text2, nw, 'center', 30);
    return; }
  if (!verz) { // via een klinisch geneticus
    d8kamer(ctx); const d = on(q, 'doosje', 1, 0.6), g = on(q, 'geneticus', 1, 0.6);
    d8doosje(ctx, 330, 330, 0.9, { a: d * (1 - 0.5 * g), open: 0 }); kruis(ctx, 330, 330, 70, d * (1 - 0.5 * g));
    fam(ctx, 'kim', 760, MENS, { a: g, t, uit: 'praat', pose: 'wijs' }); d8a(ctx, g, () => naamBij(ctx, 'klinisch geneticus', 'arts voor erfelijkheid', 560, 180, 1, 'left'));
    [['wat je kunt horen', 'horen'], ['wat je ermee kunt', 'ermee'], ['wie het nog meer aangaat', 'aangaat']].forEach(([s, w], i) => tag(ctx, s, 1360, 340 + i * 130, C.goud, on(q, w, 1, 0.5), 'center', 34));
    d8a(ctx, on(q, 'vooraf', 1, 0.5), () => metaText(ctx, 'vooraf besproken', 1360, 250, C.text2, 'center', 28));
    return; }
  if (!bal) { // de verzekeraar mag niet vragen
    d8bg(ctx, 'schema'); const p = Math.max(0.4, on(q, 'levensverzekering', 1, 0.6)), n = on(q, 'vragen', 1, 0.6), w = on(q, 'wet', 1, 0.6);
    d8polis(ctx, 700, 450, 1.3, { a: p, slot: n }); tag(ctx, 'tot een paar ton', 1260, 360, C.text2, p, 'center', 32); tag(ctx, 'mag niet vragen naar erfelijkheidsonderzoek', 1260, 480, C.koraal, n, 'center', 30);
    d8a(ctx, w, () => naamBij(ctx, 'Wet op de medische keuringen', '', 1260, 620, 1, 'center'));
    return; }
  d8bg(ctx, 'schema'); const b = on(q, 'balans', 2, 0.6);
  d8weegschaal(ctx, 960, 820, Math.sin(t * 0.8) * 0.3 * b, [['een kans die je kunt verkleinen', on(q, 'verkleinen', 1, 0.5)]], [['een uitslag die ook over anderen gaat', on(q, 'anderen', 1, 0.5)]], { a: b, labL: 'feit', labR: 'waarde' });
};

// ---------------- Hoofdstuk 4 — Een medicijn op maat ----------------
SCENES.n15 = (ctx, t, q) => { q._id = 'n15';
  const pat = na(q, 'patiënt'), enz = na(q, 'ongeveer'), test = na(q, 'daarom');
  if (!pat) { d8bg(ctx, 'schema'); const s = on(q, 'sommige', 1, 0.6);
    roundRect(ctx, 200, 220, 680, 520, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); text(ctx, 'een ziekte die je misschien krijgt', 540, 300, fTekst(34, 700), C.text2, 'center'); d8kansmeter(ctx, 540, 600, 130, 0.4, { a: 0.7, sub: 'later · een kans' });
    d8a(ctx, s, () => { roundRect(ctx, 1040, 220, 680, 520, 20); shape(ctx, rgba(C.goud, 0.08), C.goud, 2); text(ctx, 'een medicijn dat je nu nodig hebt', 1380, 300, fTekst(34, 700), C.goud, 'center'); d8strip(ctx, 1380, 520, 1.3, { n: 6, vol: 6 }); metaText(ctx, 'nu', 1380, 680, C.text2, 'center', 28); });
    return; }
  if (!enz) { // Opa Henk begint aan een kuur (tabletten, thuis aan tafel; geen ziekenhuisbeeld)
    d8kamer(ctx); const p = on(q, 'chemokuur', 1, 0.6);
    persoon(ctx, 'henk', 470, VL, MENS * 1.74 / 1.68, { pose: 'zit', stoel: true, tafel: 600, t, uit: 'neutraal' }); d8tafel(ctx, 540, 1080, 600);
    d8strip(ctx, 700, 590, 0.16, {}); ctx.fillStyle = rgba('#BFD8E8', 0.5); roundRect(ctx, 790, 556, 26, 40, 4); ctx.fill();
    zoomCircle(ctx, 1450, 340, 210, 710, 585, 'tabletten · een chemokuur', p, () => { ctx.fillStyle = '#26324C'; ctx.fillRect(1200, 100, 500, 480); d8strip(ctx, 1450, 340, 1.4, {}); });
    d8a(ctx, on(q, 'darmkanker', 1, 0.6), () => metaText(ctx, 'bijvoorbeeld bij darmkanker', 1450, 640, C.text2, 'center', 28));
    return; }
  if (!test) { // 1 op 20: trage afbraak, het medicijn stapelt zich op
    d8bg(ctx, 'micro'); const tw = on(q, 'twintig', 1, 1), en = on(q, 'enzym', 1, 0.6), lg = on(q, 'langzaam', 1, 0.6), st = on(q, 'stapelt', 1, 1.5), gv = on(q, 'gevaarlijk', 1, 0.6);
    d8raster(ctx, 130, 230, 20, 5, 1, C.goud, { s: 0.9, dx: 50, dy: 70, p: tw, kies: d8verspreid }); d8a(ctx, tw, () => naamBij(ctx, '± 1 op 20', 'variant in het gen', 110, 540));
    const baan = (y, snel, lab, kl, a) => d8a(ctx, a, () => { metaText(ctx, lab, 560, y - 120, kl, 'left', 28); const ek = enzymKluwen(ctx, 1000, y, 80, { an: 0, sub: C.teal, bind: 0.5 + 0.5 * Math.sin(t * (snel ? 3 : 0.8)), knip: snel ? ((t * 0.9) % 1) : ((t * 0.25) % 1) * 0.4 });
      const n = snel ? 3 : Math.round(3 + 6 * st); for (let i = 0; i < n; i++) { const w = wander(i + (snel ? 0 : 20), t, 8, 0.6); d8molecuul(ctx, 640 + (i % 4) * 70 + w.x, y - 40 + Math.floor(i / 4) * 60 + w.y, 18, { an: i }); }
      if (snel) for (let i = 0; i < 3; i++) d8molecuul(ctx, 1180 + i * 70, y + (i % 2) * 30, 14, { half: 1, an: i, a: 0.7 }); });
    baan(360, true, 'gewoon enzym · ruimt snel op', C.groen, Math.max(0.35, en)); baan(680, false, 'trage variant · het medicijn stapelt zich op', C.koraal, Math.max(0.2, lg));
    d8bloedspiegel(ctx, 1640, 780, 520, lerp(0.35, 0.92, st), { a: lg }); tag(ctx, 'de kuur wordt gevaarlijk', 1640, 190, C.koraal, gv, 'center', 28);
    d8a(ctx, en, () => naamBij(ctx, 'enzym', 'breekt het medicijn af', 940, 500, 1, 'left'));
    return; }
  d8bg(ctx, 'schema'); const s = on(q, 'daarom', 1, 0.6), vv = on(q, 'variant', 2, 0.6), l = on(q, 'lagere', 1, 0.6), a2 = on(q, 'ander', 1, 0.6);
  d8bloedbuis(ctx, 330, 460, 1.4, { dop: '#7A5A9A' }); naamBij(ctx, 'DNA-test vooraf', 'standaard in nederland', 330, 680, s, 'center');
  pijl(ctx, 450, 420, 760, 300, C.line, s, 3, 16); pijl(ctx, 450, 500, 760, 620, C.line, vv, 3, 16);
  d8a(ctx, s, () => { text(ctx, 'zonder variant', 820, 280, fTekst(36, 700), C.text, 'left'); d8strip(ctx, 1480, 290, 0.9, { n: 6, vol: 6 }); metaText(ctx, 'gewone dosis', 1480, 390, C.text2, 'center', 28); });
  d8a(ctx, vv, () => { text(ctx, 'met variant', 820, 600, fTekst(36, 700), C.koraal, 'left'); d8strip(ctx, 1480, 610, 0.9, { n: 6, vol: l > 0.5 ? 3 : 6 }); d8a(ctx, l, () => metaText(ctx, 'lagere dosis', 1480, 710, C.koraal, 'center', 28)); });
  tag(ctx, 'of een ander middel', 1480, 800, C.text2, a2, 'center', 28);
};
SCENES.q16v = (ctx, t, q) => { q._id = 'q16v'; d8bg(ctx, 'schema'); d8portret(ctx, 'henk', 600, 430, 140, { t }); d8strip(ctx, 960, 430, 0.9, {}); d8bloedbuis(ctx, 1260, 430, 1.3, { a: on(q, 'dna', 1, 0.5) }); vraagteken(ctx, 1500, 380, on(q, 'kijkt', 1, 0.5), 140); };
SCENES.n17 = (ctx, t, q) => { q._id = 'n17';
  const bal1 = na(q, 'hier'), gg = na(q, 'dat', 1) && na(q, 'gemodificeerd'), akker = na(q, 'vragen'), feit = na(q, 'feiten');
  if (!bal1) { d8bg(ctx, 'schema'); const tu = Math.max(0.35, on(q, 'tumor', 1, 0.5)), we = Math.max(0.35, on(q, 'werking', 1, 0.5)), en = Math.max(0.35, on(q, 'enzym', 1, 0.6)), tr = on(q, 'trage', 1, 0.6);
    const vak = (x, lab, a, goed, fn) => d8a(ctx, a, () => { roundRect(ctx, x - 230, 220, 460, 440, 20); shape(ctx, goed ? rgba(C.groen, 0.08) : rgba(C.fill, 0.4), goed ? C.groen : C.line, goed ? 2.5 : 1.5); fn(); text(ctx, lab, x, 600, fTekst(36, 700), goed ? C.groen : C.text2, 'center'); });
    vak(400, 'de tumor', tu, false, () => { kruis(ctx, 400, 420, 60, 1); }); vak(960, 'de werking', we, false, () => { kruis(ctx, 960, 420, 60, 1); });
    vak(1520, 'het enzym', en, true, () => { enzymKluwen(ctx, 1520, 420, 90, { sub: C.teal, bind: 0.6 + 0.4 * Math.sin(t * 2) }); });
    tag(ctx, 'trage opruimer → lagere dosis', 1520, 760, C.koraal, tr, 'center', 30);
    return; }
  if (!gg) { d8bg(ctx, 'schema'); const b = on(q, 'balans', 1, 0.6), bw = on(q, 'bijwerking', 1, 0.5), jo = on(q, 'jou', 1, 0.5);
    d8weegschaal(ctx, 960, 820, -0.85 * bw, [['voorkomt een gevaarlijke bijwerking', bw]], [['gaat bijna alleen over jou', jo]], { a: b, labL: 'wat je wint', labR: 'wie het aangaat' }); tag(ctx, 'een eenvoudige balans', 960, 150, C.text2, b, 'center', 30);
    return; }
  if (!akker) { // gg-maïs: een bacteriegen tegen insecten; de boer en het zaadbedrijf
    d8buiten(ctx); const m = 1, bg_ = on(q, 'bacteriegen', 1, 0.6), bo = on(q, 'boer', 1, 0.6), zb = on(q, 'zaadbedrijf', 1, 0.6);
    for (let k = 0; k < 5; k++) d8mais(ctx, 140 + k * 135, 800 + (k % 2) * 6, 560 + (k % 3) * 20, { t, a: m, gen: k === 2 ? bg_ : 0 });
    zoomCircle(ctx, 1000, 300, 170, 410, 615, 'bacterie met het gen', bg_, () => { ctx.fillStyle = '#121A26'; ctx.fillRect(820, 120, 360, 360); bacterieEcht(ctx, 1000, 300, 230, { t, plasmide: true }); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1000, 300, 34, -0.6, 0.6); ctx.stroke(); });
    fam(ctx, 'gerrit', 1340, MENS * 1.8 / 1.68, { a: bo, t, uit: 'blij', outfit: 'gewoon', kijk: -1 }); d8a(ctx, bo, () => naamBij(ctx, 'de boer', 'spuit minder gif', 1420, 220, 1, 'left'));
    d8plek(ctx, 'zaad', 1720, 560, 1.1, { a: zb }); d8a(ctx, zb, () => naamBij(ctx, 'het zaadbedrijf', 'verdient aan het zaad', 1700, 700, 1, 'center'));
    return; }
  if (!feit) { // de vragen gaan over de akker
    d8buiten(ctx); const i = on(q, 'insecten', 2, 0.6), on_ = on(q, 'ongevoelig', 1, 1.5), s = on(q, 'stuifmeel', 1, 1.2), e = on(q, 'eten', 1, 0.6), g = on(q, 'gevonden', 1, 0.6);
    for (let k = 0; k < 4; k++) d8mais(ctx, 140 + k * 135, 800, 560, { t, wind: s });
    // stuifmeel waait van de pluimen naar rechts
    if (s > 0.01) for (let k = 0; k < 40; k++) { const u = ((t * 0.12 + hash(k)) % 1), x = 260 + u * 900 * s, y = 270 + hash(k * 3) * 120 + Math.sin(t + k) * 12 + u * 80; circ(ctx, x, y, 3.5, rgba('#E3C25A', 0.9 * (1 - u * 0.6) * s)); }
    d8a(ctx, s, () => metaText(ctx, 'waait het stuifmeel over?', 900, 230, C.goud, 'center', 28));
    // rupsen op een blad: de meeste gaan dood, één overleeft
    d8a(ctx, i, () => { roundRect(ctx, 1160, 130, 640, 380, 20); shape(ctx, rgba(C.fill, 0.75), C.line, 1.5); ctx.fillStyle = D8.mais; ctx.beginPath(); ctx.moveTo(1180, 400); ctx.quadraticCurveTo(1480, 230, 1790, 300); ctx.quadraticCurveTo(1480, 300, 1180, 430); ctx.fill();
      for (let k = 0; k < 4; k++) d8rups(ctx, 1290 + k * 140, 330 - k * 16, 0.9, { t: t + k, dood: k === 2 ? 0 : on_ }); if (on_ > 0.5) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1570, 296, 70, 0, 6.283); ctx.stroke(); text(ctx, 'overleeft', 1570, 410, fTekst(30, 700), C.goud, 'center'); }
      text(ctx, 'worden insecten ongevoelig?', 1480, 480, fTekst(34, 700), C.koraal, 'center'); });
    d8a(ctx, i, () => metaText(ctx, 'rups van de maïsboorder', 1480, 170, C.text2, 'center', 28));
    d8a(ctx, e, () => { roundRect(ctx, 1220, 560, 560, 230, 20); shape(ctx, rgba(C.groen, 0.08), C.groen, 2); ctx.save(); ctx.translate(1320, 680); ctx.rotate(-0.4); ctx.beginPath(); ctx.ellipse(0, 0, 28, 70, 0, 0, 6.283); shape(ctx, D8.kolf, null); ctx.restore(); text(ctx, 'het eten zelf', 1400, 640, fTekst(34, 700), C.text, 'left'); d8a(ctx, g, () => text(ctx, 'geen extra risico gevonden', 1400, 690, fTekst(30, 600), C.groen, 'left')); });
    return; }
  d8bg(ctx, 'schema'); const w = on(q, 'waarde', 1, 0.6), wi = on(q, 'wint', 1, 0.6), ri = on(q, 'risico', 2, 0.6);
  d8weegschaal(ctx, 960, 760, -0.25 + 0.5 * w + Math.sin(t * 0.7) * 0.1, [['minder gif', 1], ['geen extra risico gevonden', 1], ['ongevoelige insecten?', 1]], [['wil je zo’n plant?', w]], { s: 0.85, labL: 'de feiten', labR: 'een waarde' });
  d8a(ctx, wi, () => { naamBij(ctx, 'wie wint', 'de boer · het zaadbedrijf', 200, 180); }); d8a(ctx, ri, () => naamBij(ctx, 'wie draagt het risico', 'de akker en de natuur eromheen', 1300, 180, 1, 'left', C.koraal));
};

// ---------------- Samenvatting — Jouw balans ----------------
SCENES.n19 = (ctx, t, q) => { q._id = 'n19'; d8bg(ctx, 'schema'); const f = on(q, 'feiten', 1, 0.6), a = on(q, 'andere', 1, 0.6), op = on(q, 'opzoeken', 1, 0.6), ni = on(q, 'niemand', 1, 0.6);
  const L = [['wat de test leest', f], ['hoe zeker: bijna altijd een kans', on(q, 'kans', 1, 0.5)]], R = [['weten of niet weten', on(q, 'weten', 1, 0.5)], ['delen of niet delen', on(q, 'delen', 1, 0.5)], ['wie er nog meer in zit', on(q, 'meer', 1, 0.5)]];
  const tilt = lerp(-0.5 * f, 0.15, a) + ni * Math.sin(t * 0.8) * 0.3; d8weegschaal(ctx, 960, 840, tilt, L, R, { labL: 'de feiten', labR: a > 0.5 ? 'wat jij belangrijk vindt' : '' });
  tag(ctx, 'de feiten kun je opzoeken', 520, 130, D8.feit, op, 'center', 30); tag(ctx, 'hoe zwaar ze wegen, bepaal jij', 1400, 130, C.goud, ni, 'center', 30); };
SCENES.n20 = (ctx, t, q) => { q._id = 'n20'; d8bg(ctx, 'schema'); const ac = on(q, 'acht', 1, 0.8), ce = on(q, 'cel', 1, 0.6), jo = on(q, 'jou', 1, 0.8);
  if (ac < 0.99) { const a = 1 - ac; fam(ctx, 'noor', 620, MENS, { a, t, uit: 'denkt' }); d8envelop(ctx, 1200, 360, 1.3, { a, slot: 1 - on(q, 'liever', 1, 0.6), open: on(q, 'weten', 1, 0.8) * 0.7 }); vraagteken(ctx, 1420, 300, a * on(q, 'liever', 1, 0.5), 120); }
  if (ac > 0.01) { ctx.save(); ctx.globalAlpha *= ac; celRond(ctx, 330, 430, 150, { t }); d8a(ctx, ce, () => metaText(ctx, 'het begon in een cel', 330, 650, C.text2, 'center', 28));
    for (let k = 0; k < 8; k++) { const al = rij(ac, 0, 1) * clamp((q.localT - _cue(q, 'acht', 1)) * 3 - k * 0.6, 0, 1); circ(ctx, 600 + k * 85, 430, 16, rgba(C.goud, 0.3 + 0.7 * al), C.goud, 2); metaText(ctx, String(k + 1), 600 + k * 85, 490, C.text2, 'center', 28); }
    fam(ctx, 'noor', 1560, MENS, { a: on(q, 'eindigt', 1, 0.6), t, uit: 'blij' }); d8a(ctx, on(q, 'eindigt', 1, 0.6), () => metaText(ctx, 'het eindigt bij jou', 1560, 220, C.goud, 'center', 28)); ctx.restore(); }
};

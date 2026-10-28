// Chromosomen en de taal van erfelijkheid v2 — scènes (één functie per gesproken alinea). 25 okt 2026.
// Let op cue-woorden: q.at zoekt een stukje van een woord (hoofdletterongevoelig); 'aa' zit ook in 'maar', dus nooit op een genotype cuen.

const _vR = (ctx, lab, sub, x, y, a, al = 'left', kl = C.text) => naamBij(ctx, lab, sub, x, y, a, al, kl);

// ---- karyogram-hulp: positie van chromosoom i (0..45) tussen kern (u = 0) en karyogram (u = 1)
const KERN = { cx: 640, cy: 450, r: 330, seed: 4 };
function kernPos() { return _chromLayout(46, KERN.r, KERN.seed); }
function chromNaarKaryo(i, u) { const P = kernPos()[i], nr = P.nr + 1, kopie = i % 2, s = kSlot(nr, kopie), e = ease(u);
  return { x: lerp(KERN.cx + P.x, s.x, e), y: lerp(KERN.cy + P.y, s.y, e), rot: lerp(P.rot, 0, e), len: lerp(P.ln, kLen(nr), e), nr, kopie, cen: lerp(0.38, CEN[nr - 1], e) }; }
function tekenKaryo(ctx, u, o = {}) { const { fv = 0, fm = 0, a = 1, hl = null, dimNiet = null } = o; kernPos().forEach((P, i) => { const c = chromNaarKaryo(i, u);
  let al = a; if (dimNiet && !dimNiet(c)) al *= 0.35; chromX(ctx, c.x, c.y + (u > 0.99 ? c.len * (0.5 - c.cen) * 0 : 0), c.len, c.rot, kKleur(c.kopie, fv, fm), al, { cen: c.cen, w: lerp(c.len * 0.17, Math.min(kW, Math.max(10, c.len * 0.2)), u) }); }); }
function karyoKader(ctx, nrs, a, kl = C.goud) { if (a <= 0.01) return; nrs.forEach(nr => { const s = kSlot(nr, 0), L = kLen(nr), top = s.y - L * CEN[nr - 1] - 12, bot = s.y + L * (1 - CEN[nr - 1]) + 12;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 3; roundRect(ctx, s.x - 30 - 24, top, 108, bot - top, 10); ctx.stroke(); ctx.restore(); }); }

// ---- pagina's van hoofdstuk 4: drie simulatiepanelen
const PX3 = [120, 700, 1280], PY3 = 210;
function drie(ctx, t, q, o = {}) { const S = sims(); const st = o.start || {};
  [['AA', 'AA'], ['Aa', 'Aa'], ['aa', 'aa']].forEach(([g], i) => { const x = PX3[i], a = (o.a && o.a[i] != null) ? o.a[i] : 1; if (a <= 0.01) return;
    allelChip(ctx, g, x + PW / 2, PY3 - 62, a, { px: 40 });
    const lt = (o.tijd || 0) + (st[g] || 0); const stil = g === 'Aa' && o.aaStil;
    simPaneel(ctx, S[g], stil ? 0 : lt, x, PY3, a, { stil, rand: (o.rand && o.rand[i]) ? C.goud : null });
    if (o.meter) { const v = stil ? 0 : simMel(S[g], lt) / S.ref; melMeter(ctx, x, PY3 + PH + 22, v, a * o.meter); if (i === 0) metaText(ctx, 'melanine', x, PY3 + PH + 82, C.text2, 'left', 28); }
    if (o.staal) { const kl = g === 'aa' ? CAST.levi.huid : CAST.marieke.huid; huidStaal(ctx, x, PY3 + PH + 96, kl, a * o.staal); } }); }

Object.assign(SCENES, {
  // ---------------- titel: paar 11 van vader en moeder
  title(ctx, t) { const y = 520; chromX(ctx, 1380, y, 360, -0.08, CH.vader, 1, { w: 54, cen: 0.40 }); chromX(ctx, 1620, y + 10, 360, 0.08, CH.moeder, 1, { w: 54, cen: 0.40 });
    genBand(ctx, 1380, y, 360, 54, 0.40, 0.9); genBand(ctx, 1620, y + 10, 360, 54, 0.40, 0.9); },

  // ---------------- Cold open (Macro: de kamer)
  s01(ctx, t, q) { kamer(ctx); const v = q.on('vader', 1, 0.4), m = q.on('moeder', 1, 0.4), mid = q.on('midden', 1, 0.5);
    gezin(ctx, t, { hl: { dennis: v * (1 - mid), marieke: m * (1 - mid), sara: mid, levi: mid, jens: mid } });
    _vR(ctx, 'vader', null, gx('dennis'), kopY('dennis') - 30, v, 'center'); _vR(ctx, 'moeder', null, gx('marieke'), kopY('marieke') - 30, m, 'center'); },
  s02(ctx, t, q) { kamer(ctx); const k = q.on('kind', 1, 0.4), al = q.on('albinisme', 1, 0.5), ou = q.on('ouders', 1, 0.4), op = q.on("opa", 1, 0.5);
    gezin(ctx, t, { hl: { levi: k }, lijst: op, dim: 0 });
    _vR(ctx, 'albinisme', 'bijna geen pigment', gx('levi'), kopY('levi') - 70, al, 'center', C.goud);
    ['dennis', 'marieke'].forEach(id => _vR(ctx, 'geen albinisme', null, gx(id), kopY(id) - 30, ou * (1 - al * 0) , 'center'));
    if (op > 0.01) { ctx.save(); ctx.globalAlpha *= op; metaText(ctx, 'allemaal geen albinisme', 1660, 312, C.grain, 'center', 28); ctx.restore(); } },
  s03(ctx, t, q) { const z = 1 + 1.6 * ramp(t, q.at('inzoomen'), 2.6), d = q.on('puzzels', 1, 0.5) * (1 - q.on('inzoomen', 1, 0.8));
    ctx.save(); const fx = gx('marieke') - 70, fy = VLOER - 300; ctx.translate(fx, fy); ctx.scale(z, z); ctx.translate(-fx, -fy); kamer(ctx); gezin(ctx, t, { hl: { levi: 1 - q.on('puzzels', 1, 0.5) } }); ctx.restore();
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; ctx.fillStyle = rgba(C.bgSchema, 0.72); ctx.fillRect(0, 0, W, H); ctx.restore();
      card(ctx, 260, 300, 660, 260, 'Puzzel 1', 'Waarom is geen van de kinderen precies het midden van zijn ouders?', d);
      card(ctx, 1000, 300, 660, 260, 'Puzzel 2', 'Hoe krijgen ouders zonder albinisme een kind mét albinisme?', d * q.on('Twee', 1, 0.9)); } },

  // ---------------- Hoofdstuk 1 — Van huid naar DNA (Macro → zoomcirkel → Micro)
  s05(ctx, t, q) { const R = huidInfo(), F = huidFocus(); const groei = ramp(t, q.at('Bovenop') - 0.4, 1.6);
    // 1) de onderarm van Marieke met een zoomcirkel naar een millimeter huid
    if (groei < 0.999) { kamer(ctx); ctx.fillStyle = rgba(C.bgSchema, 0.8); ctx.fillRect(0, 0, W, H); const arm = onderarm(ctx, 110, 470, 15, { id: 'marieke', a: 1 - groei });
      _vR(ctx, 'onderarm', 'marieke', 300, 380, (1 - groei) * ramp(t, 0.2, 0.6), 'left'); }
    const cx = lerp(1300, 960, groei), cy = lerp(450, 470, groei), r = lerp(340, 1300, groei), sx = 110 + 20 * 15, sy = 470 - 3.4 * 15;
    const z0 = 2 * 340 / HUID.w, z = lerp(z0 * 1.0, 2.2, groei) * (1 + 0.8 * ramp(t, q.at('Helemaal'), 2.5));
    const fx = lerp(960, F.cel[0], groei), fy = lerp(170, F.cel[1] - 30, groei);
    zoomCircle(ctx, cx, cy, r, sx, sy, groei < 0.3 ? '1 millimeter huid' : null, 1, () => { chMicro(ctx); huidCam(ctx, z, fx, fy, cx, cy, { hl: t > q.at('Helemaal') ? 'basaal' : t > q.at('levende') ? 'levend' : t > q.at('dode') ? 'hoorn' : null, t }); });
    const S = (x, y) => [(x - fx) * z + cx, (y - fy) * z + cy];
    const lh = q.on('dode', 1, 0.4), ll = q.on('levende', 1, 0.4), lb = q.on('basale', 1, 0.4);
    if (groei > 0.98) { const [, yh] = S(0, R.yTop); _vR(ctx, 'dode, platte cellen', 'hoornlaag', 1840, Math.max(150, yh + 40), lh, 'right');
      const [, yl] = S(0, R.yKorrel); _vR(ctx, 'levende cellen', null, 1840, yl + 120, ll * (1 - lb), 'right');
      const [bx, by] = S(F.cel[0], F.cel[1]); _vR(ctx, 'basale laag', 'deze cellen delen zich', 1840, Math.min(800, by + 120), lb, 'right'); }
    chSchaal(ctx, Math.round(100 * 1.92 * z), '100 micrometer', groei * (1 - ramp(t, q.at('Helemaal'), 1)) );
    chSchaal(ctx, Math.round(10 * 1.92 * z), '10 micrometer', ramp(t, q.at('Helemaal'), 1)); },
  s06(ctx, t, q) { const F = huidFocus(); const z = lerp(2.2 * 1.8, 7.5, ramp(t, 0, 2.6)); const fx = F.cel[0], fy = F.cel[1]; chMicro(ctx);
    const S = huidCam(ctx, z, fx, fy, 760, 470, { t, hl: null }); const [ccx, ccy] = S(F.cel[0], F.cel[1]);
    const kern = q.on('celkern', 1, 0.4), dna = q.on('DNA', 1, 0.6), uit = q.on('Uitgerekt', 1, 0.5);
    // de cel en zijn kern aanwijzen
    if (q.on('Elke', 1, 0.4) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('Elke', 1, 0.4) * (1 - uit); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ccx, ccy, 5.6 * 1.92 * z, 0, 6.283); ctx.stroke(); ctx.restore(); }
    _vR(ctx, 'één cel', 'ongeveer 10 micrometer', ccx - 6 * 1.92 * z - 20, ccy - 6 * 1.92 * z, q.on('Elke', 1, 0.4) * (1 - kern), 'right');
    if (kern > 0.01) { ctx.save(); ctx.globalAlpha *= kern; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(ccx, ccy + 0.8 * 1.92 * z, 3.4 * 1.92 * z, 0, 6.283); ctx.stroke(); ctx.restore(); }
    _vR(ctx, 'celkern', '± 6 micrometer', ccx + 3.4 * 1.92 * z + 26, ccy + 0.8 * 1.92 * z + 6, kern * (1 - uit), 'left', C.goud);
    chSchaal(ctx, Math.round(10 * 1.92 * z), '10 micrometer', 1 - dna);
    // zoomcirkel naar de kern met DNA
    zoomCircle(ctx, 1500, 440, 300, ccx, ccy + 0.8 * 1.92 * z, null, dna, () => { chMicro(ctx); kernChromatine(ctx, 1500, 440, 280, { c: 0, seed: 4 }); });
    kapje(ctx, 'celkern · vergroot', 1500, 790, dna); _vR(ctx, 'DNA', null, 1500, 440 - 320, dna, 'center');
    // DNA uitgerekt naast een mens
    if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; roundRect(ctx, 80, 300, 460, 520, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); const yb = 760, hm = 300, h2 = hm * 200 / 167;
      persoon(ctx, 'marieke', 220, yb, hm, { uit: 'verbaasd' }); dnaDraad(ctx, [[400, yb], [404, yb - h2 * 0.5], [400, yb - h2]], { w: 5, kleur: C.kernR, donker: C.kern });
      text(ctx, '2 m', 440, yb - h2 / 2, fTekst(40, 700), C.kernR, 'left'); text(ctx, 'DNA uit één cel, uitgerekt', 310, 350, fTekst(32, 600), C.text, 'center'); metaText(ctx, 'marieke · 1,67 m', 310, yb + 42, C.text2, 'center', 24); ctx.restore(); } },
  s07(ctx, t, q) { chMicro(ctx); const c = ramp(t, q.at('deelt') - 0.3, Math.max(1.5, q.at('staafjes') - q.at('deelt') + 0.6));
    kernChromatine(ctx, 960, 450, 380, { c, seed: 4, membraan: 1 - 0.5 * c });
    _vR(ctx, 'losse draden DNA', null, 960, 40 + 60, q.on('kluwen', 1, 0.4) * (1 - q.on('deelt', 1, 0.4)), 'center');
    _vR(ctx, 'chromosomen', null, 960, 100, q.on('Chromosomen', 1, 0.4), 'center', C.goud);
    chMeta(ctx, 'vereenvoudigd · kern ± 6 micrometer'); },
  s08(ctx, t, q) { chMicro(ctx); const z = q.on('opgerold', 1, 0.6) * (1 - q.on('Daarom', 1, 0.6)); const L = 520, x = 520, y = 450;
    const kop = ramp(t, q.at('gekopieerd') - 0.2, 1.6); chromKopie(ctx, x, y, L, kop, { w: 84, cen: 0.38, coils: 9 });
    _vR(ctx, 'één chromosoom', 'één lang DNA-molecuul', x, 120, 1 - q.on('gekopieerd', 1, 0.4), 'center');
    _vR(ctx, 'gekopieerd', 'nu twee DNA-moleculen', x, 120, q.on('gekopieerd', 1, 0.4) * (1 - q.on('zusterchromatiden', 1, 0.4)), 'center', C.goud);
    zoomCircle(ctx, 1320, 430, 330, x + 10, y - 120, 'DNA rond eiwitten · vereenvoudigd', z, () => { chMicro(ctx); nucleosoomDraad(ctx, 1010, 470, 1640, 400, { n: 3, R: 62, t }); });
    _vR(ctx, 'eiwitten', 'histonen', 1600, 150, z, 'left');
    const zus = q.on('zusterchromatiden', 1, 0.4), cen = q.on('centromeer', 1, 0.4);
    _vR(ctx, 'zusterchromatide', null, x - 120, y + 220, zus, 'right'); _vR(ctx, 'zusterchromatide', null, x + 120, y + 220, zus, 'left');
    if (q.on('helften', 1, 0.4) > 0.01) { tag(ctx, 'identiek', x + 260, y + 12, C.text2, q.on('helften', 1, 0.4) * (1 - cen), 'center', 30); }
    if (cen > 0.01) { ctx.save(); ctx.globalAlpha *= cen; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 46, 0, 6.283); ctx.stroke(); ctx.restore(); _vR(ctx, 'centromeer', null, x + 70, y + 12, cen, 'left', C.goud); }
    chMeta(ctx, 'vergroot · een chromosoom is een paar micrometer lang'); },

  // ---------------- Hoofdstuk 2 — Het karyogram (Schema)
  s09(ctx, t, q) { chSchema(ctx); const a0 = q.at('tellen'), a1 = Math.max(a0 + 1.5, q.at('zesenveertig') - 0.1), u = clamp((t - a0) / (a1 - a0), 0, 1), n = Math.floor(u * 46 + (u >= 1 ? 0 : 0));
    ctx.save(); ctx.strokeStyle = rgba(C.kernR, 0.35); ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.ellipse(KERN.cx, KERN.cy, KERN.r, KERN.r * 0.94, 0, 0, 6.283); ctx.stroke(); ctx.restore();
    const P = kernPos(); const volg = P.map((p, i) => i).sort((i, j) => (P[i].y - P[j].y) || (P[i].x - P[j].x));
    tekenKaryo(ctx, 0, {}); volg.slice(0, n).forEach(i => circ(ctx, KERN.cx + P[i].x, KERN.cy + P[i].y, 9, C.goud));
    const ta = ramp(t, a0, 0.4); if (ta > 0.01) { text(ctx, String(n), 1440, 470, fTitel(180), rgba(C.text, ta), 'center'); metaText(ctx, 'chromosomen', 1440, 530, C.grain, 'center', 30); } },
  s10(ctx, t, q) { chSchema(ctx); tekenKaryo(ctx, 0, {}); text(ctx, '46', 1440, 330, fTitel(150), C.text, 'center'); metaText(ctx, 'chromosomen', 1440, 380, C.grain, 'center', 30);
    const x2 = q.on('zusterchromatiden', 1, 0.5), tot = q.on('tweeënnegentig', 1, 0.5);
    tag(ctx, '× 2 chromatiden', 1440, 470, C.text2, x2, 'center', 40); text(ctx, '= 92', 1440, 600, fTitel(110), rgba(C.goud, tot), 'center'); if (tot > 0.01) { ctx.save(); ctx.globalAlpha *= tot; metaText(ctx, 'chromatiden', 1440, 645, C.grain, 'center', 30); ctx.restore(); }
    if (x2 > 0.01) { chromX(ctx, 1700, 760, 150, 0, C.kernR, x2, { w: 26 }); naamBij(ctx, '2 chromatiden', null, 1640, 760, x2, 'right'); } },
  s11(ctx, t, q) { chSchema(ctx); const u = ramp(t, q.at('sorteert'), Math.max(1.5, q.at('paren') - q.at('sorteert')));
    tekenKaryo(ctx, u, {}); kLabel(ctx, ramp(t, q.at('paren'), 0.6));
    karyoKader(ctx, [1], q.on('één', 1, 0.3) * (1 - q.on('twee', 3, 0.3))); karyoKader(ctx, [2], q.on('twee', 3, 0.3) * (1 - q.on('Enzovoort', 1, 0.3)));
    const k = q.on('karyogram', 1, 0.5); _vR(ctx, 'karyogram', 'gesorteerd op lengte', 1640, 260, k, 'center', C.goud);
    if (u > 0.5) metaText(ctx, 'karyogram van een vrouw · lengtes naar aantal baseparen', 960, 110, C.text2, 'center', 28); },
  s12(ctx, t, q) { chSchema(ctx); const fv = q.on('vader', 1, 0.6), fm = q.on('moeder', 1, 0.6), ho = q.on('homologe', 1, 0.5);
    tekenKaryo(ctx, 1, { fv, fm, dimNiet: ho > 0.5 ? (c => c.nr === 1) : null }); kLabel(ctx, 1);
    _vR(ctx, 'van vader', null, 1560, 150, fv, 'left', CH.vader); _vR(ctx, 'van moeder', null, 1560, 210, fm, 'left', CH.moeder);
    karyoKader(ctx, [1], ho);
    if (ho > 0.01) { ctx.save(); ctx.globalAlpha *= ho; roundRect(ctx, 1500, 280, 380, 520, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 2); ctx.restore();
      chromX(ctx, 1630, 500, 280, 0, CH.vader, ho, { w: 38, cen: CEN[0] }); chromX(ctx, 1750, 500, 280, 0, CH.moeder, ho, { w: 38, cen: CEN[0] });
      text(ctx, 'homologe chromosomen', 1690, 330, fTekst(32, 700), rgba(C.goud, ho), 'center');
      [['even lang', 'lang'], ['zelfde bouw', 'bouw'], ['zelfde soort informatie', 'informatie']].forEach(([s, w], i) => text(ctx, s, 1690, 690 + i * 38, fTekst(30, 600), rgba(C.text, ho * q.on(w, 1, 0.4)), 'center')); } },
  s13(ctx, t, q) { chSchema(ctx); const f = ramp(t, q.at('smelten') - 0.6, 1.4), ex = 700, ey = 450;
    eicelEcht(ctx, ex, ey, 150); const zx = lerp(1500, ex + 150, f), zy = lerp(430, ey - 10, f); zaadcelEcht(ctx, zx, zy, Math.PI, t, 3.2, { a: 1 - ramp(t, q.at('smelten') + 1.0, 0.6) });
    _vR(ctx, 'eicel', null, ex, ey - 300, 1 - ramp(t, q.at('smelten') + 0.4, 0.5), 'center'); _vR(ctx, 'zaadcel', null, 1500, 330, 1 - ramp(t, q.at('smelten'), 0.5), 'center');
    const b = ramp(t, q.at('zesenveertig') - 0.2, 0.5); _vR(ctx, 'bevruchte eicel', '46 chromosomen', ex, ey - 300, b, 'center', C.goud); if (b > 0.01) text(ctx, '46', ex, ey + 30, fTitel(90), rgba('#121A26', b), 'center'); },
  s15(ctx, t, q) { chSchema(ctx); const ex = 640, ey = 450; eicelEcht(ctx, ex, ey, 230, 1, false); ctx.beginPath(); ctx.arc(ex, ey, 170, 0, 6.283); shape(ctx, '#3A3058', C.kernR, 2); const P = _chromLayout(46, 170, 6);
    for (let nr = 0; nr < 23; nr++) { const p = P[nr * 2]; chromX(ctx, ex + p.x * 0.9, ey + p.y * 0.9, p.ln * 0.9, p.rot, C.kernR, 1, { w: Math.max(7, p.ln * 0.13), coils: 0 }); }
    _vR(ctx, '23 chromosomen', 'van elk paar één', ex, ey - 300, q.on('drieëntwintig', 1, 0.5), 'center', C.goud);
    const g = q.on('zaadcel', 1, 0.5), c1 = q.on('chromatide', 1, 0.4), ld = q.on('laatste', 1, 0.5); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; roundRect(ctx, 1180, 230, 620, 470, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); ctx.restore();
      chromatide1(ctx, 1490, 450, 220, 0, C.kernR, g * c1, 38);
      text(ctx, 'zaadcel', 1490, 300, fTekst(32, 700), rgba(C.text, g), 'center'); text(ctx, 'niet gekopieerd · 1 chromatide', 1490, 640, fTekst(28, 500), rgba(C.text2, g * c1), 'center'); }
    _vR(ctx, 'nog 2 chromatiden', 'laatste deling volgt na het binnendringen van een zaadcel', ex, ey + 330, ld, 'center', C.goud); },
  s16(ctx, t, q) { chSchema(ctx); const h = q.on('haploïd', 1, 0.5), d = q.on('diploïd', 1, 0.5), m = q.on('mens', 1, 0.5);
    eicelEcht(ctx, 520, 430, 200, 1, false); ctx.beginPath(); ctx.arc(520, 430, 150, 0, 6.283); shape(ctx, '#3A3058', C.kernR, 2); const P = _chromLayout(46, 150, 6); for (let nr = 0; nr < 23; nr++) { const p = P[nr * 2]; chromX(ctx, 520 + p.x * 0.9, 430 + p.y * 0.9, p.ln * 0.9, p.rot, C.kernR, 1, { w: Math.max(6, p.ln * 0.12), coils: 0 }); }
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * d; ctx.beginPath(); ctx.arc(1360, 430, 230, 0, 6.283); shape(ctx, rgba(C.fill, 0.9), C.line, 2); ctx.restore();
    _chromLayout(46, 200, 4).forEach(p => chromX(ctx, 1360 + p.x, 430 + p.y, p.ln * 0.8, p.rot, C.kernR, 0.35 + 0.65 * d, { w: Math.max(6, p.ln * 0.13), coils: 0 }));
    _vR(ctx, 'haploïd', 'één set · n', 520, 140, h, 'center', C.goud); _vR(ctx, 'diploïd', 'twee sets · 2n', 1360, 140, d, 'center', C.goud);
    text(ctx, 'n = 23', 520, 760, fTitel(64), rgba(C.text, m), 'center'); text(ctx, '2n = 46', 1360, 760, fTitel(64), rgba(C.text, m), 'center');
    metaText(ctx, 'eicel', 520, 690, C.text2, 'center', 28); metaText(ctx, 'huidcel', 1360, 690, C.text2, 'center', 28); },
  s17(ctx, t, q) { chSchema(ctx); const au = q.on('autosomen', 1, 0.5), ge = q.on('geslachtschromosomen', 1, 0.5), vr = q.on('vrouw', 2, 0.5), mn = q.on('man', 2, 0.5), lo = q.on('Let', 1, 0.5);
    tekenKaryo(ctx, 1, { fv: 1, fm: 1, a: 1 - 0.75 * lo, dimNiet: ge > 0.5 ? (c => c.nr === 23) : (au > 0.5 ? (c => c.nr <= 22) : null) }); kLabel(ctx, 1);
    if (au > 0.01 && ge < 0.99) { ctx.save(); ctx.globalAlpha *= au * (1 - ge); _vR(ctx, 'autosomen', 'paar 1 tot en met 22', 820, 150, 1, 'center', C.goud); ctx.restore(); }
    karyoKader(ctx, [23], ge); _vR(ctx, 'geslachtschromosomen', null, kSlot(23, 0).x + 30, 900 - 60 - 600 + 410, ge * (1 - vr), 'center', C.goud);
    const px = 1690; if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; roundRect(ctx, 1520, 200, 340, 300, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); ctx.restore();
      text(ctx, 'vrouw · XX', px, 250, fTekst(34, 700), rgba(C.text, vr), 'center'); chromX(ctx, px - 50, 380, kLen(23), 0, C.kernR, vr, { cen: CEN[22] }); chromX(ctx, px + 50, 380, kLen(23), 0, C.kernR, vr, { cen: CEN[22] }); }
    if (mn > 0.01) { ctx.save(); ctx.globalAlpha *= mn; roundRect(ctx, 1520, 520, 340, 300, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); ctx.restore();
      text(ctx, 'man · XY', px, 570, fTekst(34, 700), rgba(C.text, mn), 'center'); chromX(ctx, px - 50, 700, kLen(23), 0, C.kernR, mn, { cen: CEN[22] }); chromX(ctx, px + 50, 700, kLen(24), 0, C.kernR, mn, { cen: CEN[23] });
      metaText(ctx, 'Y', px + 50, 790, C.text2, 'center', 28); }
    misvatting(ctx, 'Mannen hebben geen X-chromosoom.', 'Mannen hebben één X en één Y.', 760, 330, 900, lo, q.on('Alleen', 1, 0.5)); },

  // ---------------- Hoofdstuk 3 — Gen, locus en allel (Schema)
  s18(ctx, t, q) { chSchema(ctx); const L = 470, y = 450, cen = CEN[10], g = q.on('gen', 1, 0.5);
    chromX(ctx, 760, y, L, 0, CH.vader, 1, { w: 66, cen }); chromX(ctx, 1160, y, L, 0, CH.moeder, 1, { w: 66, cen });
    metaText(ctx, 'van vader', 760, y + L * (1 - cen) + 60, CH.vader, 'center', 28); metaText(ctx, 'van moeder', 1160, y + L * (1 - cen) + 60, CH.moeder, 'center', 28); text(ctx, 'chromosoom 11', 960, 150, fTekst(40, 700), C.text, 'center');
    const by = genBand(ctx, 760, y, L, 66, cen, q.on('stukje', 1, 0.5)); genBand(ctx, 1160, y, L, 66, cen, q.on('stukje', 1, 0.5));
    _vR(ctx, 'gen', 'instructie voor één eiwit', 600, by + 12, g, 'right', C.goud); enzymKluwen(ctx, 1450, by, 34, { a: q.on('eiwit', 1, 0.5) }); _vR(ctx, 'eiwit', null, 1500, by + 12, q.on('eiwit', 1, 0.5), 'left'); },
  s19(ctx, t, q) { chSchema(ctx); const L = 470, y = 450, cen = CEN[10];
    chromX(ctx, 760, y, L, 0, CH.vader, 1, { w: 66, cen }); chromX(ctx, 1160, y, L, 0, CH.moeder, 1, { w: 66, cen });
    const by = genBand(ctx, 760, y, L, 66, cen, 1); genBand(ctx, 1160, y, L, 66, cen, 1); const p = q.on('plek', 1, 0.8);
    if (p > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.goud, p); ctx.lineWidth = 2; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(600, by); ctx.lineTo(600 + 720 * p, by); ctx.stroke(); ctx.restore(); }
    _vR(ctx, 'locus', 'de plek van het gen', 1360, by + 12, q.on('locus', 1, 0.5), 'left', C.goud); _vR(ctx, 'gen', null, 580, by + 12, 1 - q.on('locus', 1, 0.5), 'right', C.goud); },
  s20(ctx, t, q) { chSchema(ctx); const L = 380, cen = CEN[10], y = 470; chromX(ctx, 230, y, L, 0, CH.vader, 1, { w: 52, cen }); chromX(ctx, 440, y, L, 0, CH.moeder, 1, { w: 52, cen });
    const by = genBand(ctx, 230, y, L, 52, cen, 1); genBand(ctx, 440, y, L, 52, cen, 1);
    const z = ramp(t, q.at('volgorde') - 0.6, 0.8);
    zoomCircle(ctx, 1080, 400, 0.0001 + 0, 340, by, null, 0);
    if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(490, by); ctx.lineTo(620, 180); ctx.moveTo(490, by); ctx.lineTo(620, 640); ctx.stroke(); roundRect(ctx, 620, 180, 1240, 460, 18); shape(ctx, rgba(C.bgMicro, 0.98), C.goud, 1.5); ctx.restore();
      const SV = 'GATGCTCCGCAGA', SM = 'GATGCTCTGCAGA', d = q.on('verschilt', 1, 0.5);
      [[SV, CH.vader, 300, 'van vader'], [SM, CH.moeder, 470, 'van moeder']].forEach(([s, kl, yy, lab]) => { [...s].forEach((ch, i) => { const xx = 700 + i * 78; const dif = i === 7;
          roundRect(ctx, xx, yy - 52, 66, 76, 10); shape(ctx, rgba(kl, 0.22 * z), rgba(kl, z), 1.5); text(ctx, ch, xx + 33, yy + 6, fMeta(44), rgba(C.text, z), 'center');
          if (dif && d > 0.01) { ctx.save(); ctx.globalAlpha *= z * d; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, xx - 6, yy - 58, 78, 88, 12); ctx.stroke(); ctx.restore(); } });
        metaText(ctx, lab, 700, yy + 70, kl, 'left', 28); });
      metaText(ctx, 'stukje dna-volgorde · voorbeeld', 1240, 610, C.text2, 'center', 28); }
    const al = q.on('allelen', 1, 0.5); _vR(ctx, 'twee allelen', 'twee versies van hetzelfde gen', 1240, 760, al * (1 - q.on('eiwit', 1, 0.4)), 'center', C.goud);
    const ei = q.on('eiwit', 1, 0.5); if (ei > 0.01) { enzymKluwen(ctx, 1020, 760, 46, { a: ei, seed: 4, col: _mixHex(C.enzym, CH.vader, 0.25) }); enzymKluwen(ctx, 1460, 760, 46, { a: ei, seed: 6, an: 0.3, col: _mixHex(C.enzym, CH.moeder, 0.25) }); text(ctx, 'net iets ander eiwit', 1240, 770, fTekst(32, 600), rgba(C.text, ei), 'center'); } },
  s21(ctx, t, q) { chSchema(ctx); const g = q.on('gen', 1, 0.5), al = q.on('allel', 1, 0.5), ie = q.on('Iedereen', 1, 0.5); const L = 380, cen = CEN[10], y = 470;
    chromX(ctx, 200, y, L, 0, CH.vader, 1, { w: 52, cen }); chromX(ctx, 400, y, L, 0, CH.moeder, 1, { w: 52, cen }); const by = genBand(ctx, 200, y, L, 52, cen, 1); genBand(ctx, 400, y, L, 52, cen, 1);
    metaText(ctx, 'chromosoom 11', 300, y + L * (1 - cen) + 60, C.text2, 'center', 26);
    pijl(ctx, 470, by - 20, 590, 330, C.goud, g, 3); pijl(ctx, 470, by + 10, 590, 470, C.goud, al, 3);
    termKaart(ctx, 'gen', 'het onderwerp: welk eiwit', 1020, 230, g, C.goud, 820); termKaart(ctx, 'allel', 'de versie: welke variant (één van vader, één van moeder)', 1120, 400, al, C.goud, 1020);
    misvatting(ctx, 'Gen en allel betekenen hetzelfde.', 'Iedereen heeft het gen, niet dezelfde allelen.', 1120, 600, 1020, ie, q.on('allelen', 1, 0.5)); },
  s22(ctx, t, q) { chSchema(ctx); const L = 470, y = 450, cen = CEN[10], v = q.on('vader', 1, 0.5), m = q.on('moeder', 1, 0.5);
    chromX(ctx, 760, y, L, 0, CH.vader, 1, { w: 66, cen }); chromX(ctx, 1160, y, L, 0, CH.moeder, 1, { w: 66, cen }); const by = genBand(ctx, 760, y, L, 66, cen, 1); genBand(ctx, 1160, y, L, 66, cen, 1);
    text(ctx, 'per gen op de autosomen: 2 allelen', 960, 130, fTekst(44, 700), rgba(C.text, q.on('twee', 2, 0.5)), 'center');
    _vR(ctx, 'één van je vader', null, 640, by + 12, v, 'right', CH.vader); metaText(ctx, 'de twee zusterchromatiden dragen hetzelfde allel (kopie)', 960, 860, C.text2, 'center', 26); _vR(ctx, 'één van je moeder', null, 1280, by + 12, m, 'left', CH.moeder); },

  // ---------------- Hoofdstuk 4 — Van allel naar eigenschap
  s23(ctx, t, q) { chMicro(ctx); ctx.save(); ctx.beginPath(); ctx.rect(0, 90, W, 760); ctx.clip(); const R = huidDoorsnede(ctx, 0, -330, W, 1150, { um: 220, seed: 11, mel: 1, hl: t > q.at('pigmentcellen') ? 'pigment' : null, t }); ctx.restore();
    const p = R.pig.filter(p => p[0] > 300 && p[0] < 1600)[0] || R.pig[0]; _vR(ctx, 'pigmentcel', 'melanocyt', p[0] + 90, Math.min(800, p[1] + 20), q.on('pigmentcellen', 1, 0.5), 'left', C.goud);
    _vR(ctx, 'melaninekorrels', 'naar de cellen erboven', 1840, 160, q.on('melanine', 1, 0.5), 'right');
    chSchaal(ctx, Math.round(10 * R.s), '10 micrometer'); },
  s24(ctx, t, q) { chSchema(ctx); const S = sims(), x = 700, y = 300, i = q.on('instructie', 1, 0.6);
    simPaneel(ctx, S.een, t, x, y); text(ctx, 'in de pigmentcel', x + PW / 2, y - 30, fTekst(32, 600), C.text, 'center');
    _vR(ctx, 'tyrosinase', 'enzym', x + PW + 40, y + 120, q.on('tyrosinase', 1, 0.5), 'left', C.goud);
    circ(ctx, x + PW + 50, y + 210, 7, CH.bouw); text(ctx, 'bouwsteen', x + PW + 70, y + 220, fTekst(30, 500), C.text2, 'left'); circ(ctx, x + PW + 50, y + 260, 8, CH.mel); text(ctx, 'melanine', x + PW + 70, y + 270, fTekst(30, 500), C.text2, 'left');
    const g = q.on('chromosoom', 1, 0.5); chromX(ctx, 300, 470, 380, 0, CH.vader, g, { w: 52, cen: CEN[10] }); genBand(ctx, 300, 470, 380, 52, CEN[10], g); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; metaText(ctx, 'chromosoom 11', 300, 750, C.text2, 'center', 28); ctx.restore(); }
    pijl(ctx, 360, 480, x - 20, 440, C.line, i, 3); tag(ctx, 'instructie', 530, 430, C.text2, i, 'center', 28); },
  s25(ctx, t, q) { chSchema(ctx); const S = sims(); simPaneel(ctx, S.een, t + 8, 120, 300, 0.6); text(ctx, 'in de pigmentcel', 380, 270, fTekst(32, 600), C.text, 'center');
    const A = q.on('werkend', 1, 0.5), a = q.on('fout', 1, 0.5);
    [[A, 'A', true, 'werkend enzym', 230, q.on('noemen', 1, 0.4)], [a, 'a', false, 'enzym werkt niet', 520, q.on('noemen', 2, 0.4)]].forEach(([al, l, w, s, yy, lt]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al;
      roundRect(ctx, 780, yy, 1020, 230, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); chromatide1(ctx, 880, yy + 140, 130, 0, CH.vader, 1, 34); roundRect(ctx, 860, yy + 140 - 12, 40, 24, 4); shape(ctx, C.goud, null);
      pijl(ctx, 940, yy + 115, 1040, yy + 115, C.line, 1, 3); enzym(ctx, 1120, yy + 115, w, 2.4); text(ctx, s, 1220, yy + 128, fTekst(40, 600), C.text, 'left');
      text(ctx, 'allel ' + l, 880, yy + 52, fTekst(30, 700), rgba(C.goud, lt), 'center'); ctx.restore(); }); },
  s26(ctx, t, q) { chSchema(ctx); const m = q.on('mogelijkheden', 1, 0.6), ie = q.on('Iemand', 1, 0.5);
    const vo = 1 - q.on('genotype', 1, 0.5); if (vo > 0.01) [['A', true, 'werkend enzym', 300], ['a', false, 'enzym werkt niet', 560]].forEach(([l, w, tx, yy]) => { ctx.save(); ctx.globalAlpha *= vo; roundRect(ctx, 460, yy, 1000, 200, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
      text(ctx, 'allel ' + l, 600, yy + 115, fTekst(44, 700), C.goud, 'center'); pijl(ctx, 720, yy + 100, 840, yy + 100, C.line, 1, 3); enzym(ctx, 920, yy + 100, w, 2.2); text(ctx, tx, 1020, yy + 114, fTekst(40, 600), C.text, 'left'); ctx.restore(); });
    termKaart(ctx, 'genotype', 'de combinatie van allelen', 960, 360, q.on('genotype', 1, 0.5) * (1 - m), C.goud, 760);
    const vu = vragenUit(); drie(ctx, t, q, { tijd: Math.max(0, t - q.at('mogelijkheden')), a: [m, m * q.on('mogelijkheden', 1, 1.0), m * q.on('mogelijkheden', 1, 1.4)], aaStil: !vu, rand: [0, vu ? 0 : ie, 0] }); },
  s27(ctx, t, q) { chSchema(ctx); drie(ctx, t, q, { tijd: t + 12, aaStil: true, rand: [0, 1, 0] }); },
  s29(ctx, t, q) { chSchema(ctx); const h = q.on('half', 1, 0.5), b = q.on('buitenkant', 1, 0.5);
    drie(ctx, t, q, { tijd: t + 16, start: { Aa: -16 }, meter: ramp(t, 0.4, 0.6), staal: b });
    tag(ctx, '4 werkend · 4 kapot', PX3[1] + PW / 2, PY3 + PH / 2 - 160 + 0, C.text2, h * (1 - b) * 0, 'center', 28);
    _vR(ctx, 'half zoveel enzym', null, PX3[1] + PW / 2, PY3 - 110, h * (1 - q.on('evenveel', 1, 0.4)), 'center', C.goud);
    const ev = q.on('evenveel', 1, 0.5); if (ev > 0.01) haak(ctx, PX3[0], PX3[1] + PW, PY3 + PH + 60, 'ongeveer evenveel melanine', C.groen, ev * (1 - b)); },
  s30(ctx, t, q) { chSchema(ctx); drie(ctx, t, q, { tijd: t + 30, meter: 1, staal: 1 }); const f = q.on('waarnemen', 1, 0.5), an = q.on('ander', 1, 0.5), d = q.on('dominant', 1, 0.5), r = q.on('recessief', 1, 0.5);
    termKaart(ctx, 'fenotype', 'de eigenschap die je kunt waarnemen', 960, 720, f * (1 - an), C.goud, 980);
    if (an > 0.01) haak(ctx, PX3[0], PX3[1] + PW, PY3 + PH + 160, 'ander genotype, hetzelfde fenotype', C.groen, an * (1 - d));
    _vR(ctx, 'A is dominant', 'één exemplaar is genoeg', PX3[0] + PW / 2, 760, d, 'center', C.goud); _vR(ctx, 'a is recessief', 'alleen zichtbaar bij aa', PX3[2] + PW / 2, 760, r, 'center', C.goud); },
  s31(ctx, t, q) { chSchema(ctx); drie(ctx, t, q, { tijd: t + 54, meter: 1, staal: 1, a: [0.35, 0.35, 0.35] }); const s1 = q.on('sterker', 1, 0.5) * (1 - q.on('vaker', 1, 0.4)), s2 = q.on('vaker', 1, 0.5);
    misvatting(ctx, 'Dominant = sterker: A vecht tegen a.', 'Dominant = één exemplaar is genoeg.', 960, 300, 1200, s1, q.on('vecht', 1, 0.6));
    misvatting(ctx, 'Dominant = komt vaker voor.', 'Er zijn zeldzame dominante en algemene recessieve allelen.', 960, 300, 1300, s2, q.on('bestaan', 1, 0.6)); },
  s32(ctx, t, q) { chSchema(ctx); drie(ctx, t, q, { tijd: t + 70, meter: 1, staal: 1 }); const ho = q.on('homozygoot', 1, 0.5), he = q.on('heterozygoot', 1, 0.5), no = q.on('hoofdletter', 1, 0.5);
    [0, 2].forEach(i => _vR(ctx, 'homozygoot', null, PX3[i] + PW / 2, 125, ho, 'center', C.goud)); _vR(ctx, 'heterozygoot', null, PX3[1] + PW / 2, 125, he, 'center', C.goud);
    if (no > 0.01) termKaart(ctx, 'notatie', 'dominant: hoofdletter A · recessief: kleine letter a', 960, 720, no, C.goud, 1100); },

  // ---------------- Hoofdstuk 5 — Genotype en milieu
  s33(ctx, t, q) { chSchema(ctx); const zo = q.on('zon', 1, 0.5), uv = q.on('UV-licht', 1, 0.5), br = ramp(t, q.at('UV-licht'), Math.max(1.5, q.at('bruiner') - q.at('UV-licht') + 0.5));
    onderarm(ctx, 120, 300, 11, { id: 'marieke' }); onderarm(ctx, 120, 580, 11, { id: 'marieke', bruin: br * 0.9, mouwOp: 2 });
    allelChip(ctx, 'Aa', 720, 300, q.on('genotype', 1, 0.5), { px: 34 }); allelChip(ctx, 'Aa', 720, 580, q.on('genotype', 1, 0.5), { px: 34 });
    metaText(ctx, 'schaduw', 120, 220, C.text2, 'left', 28); metaText(ctx, 'zon', 120, 500, rgba(C.goud, 1), 'left', 28); zon(ctx, 560, 470, 26, zo, t);
    if (uv > 0.01) { ctx.save(); ctx.globalAlpha *= uv; ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; for (let i = 0; i < 5; i++) { const x0 = 520 - i * 70, ph = t * 3 + i; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const yy = 470 + k * 6, xx = x0 - k * 4 + Math.sin(k * 1.2 + ph) * 5; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
    // ingezoomd: de pigmentcellen in beide armen
    const zi = q.on('pigmentcellen', 1, 0.6); [[300, 0.8, 'schaduw'], [580, 0.8 + 1.7 * br, 'zon']].forEach(([yy, mel, lab], i) => { const cy = i ? 645 : 290; zoomCircle(ctx, 1380, cy, 165, 560, yy, null, zi, () => { chMicro(ctx); ctx.save(); ctx.translate(1380, cy); ctx.scale(165 / 140, 165 / 140); huidDoorsnede(ctx, -140, -290, 280, 380, { um: 70, seed: 11, mel, t }); ctx.restore(); }); });
    _vR(ctx, 'meer melanine', null, 1570, 655, q.on('méér', 1, 0.5), 'left', C.goud);
    _vR(ctx, 'bruiner', null, 640, 690, q.on('bruiner', 1, 0.5), 'left'); },
  s34(ctx, t, q) { chSchema(ctx); const mi = q.on('milieu', 1, 0.5), bij = q.on('Bij', 1, 0.3), zo = q.on('zon', 1, 0.5);
    onderarm(ctx, 120, 260, 9, { id: 'marieke' }); onderarm(ctx, 120, 460, 9, { id: 'marieke', bruin: 0.9, mouwOp: 2 }); onderarm(ctx, 120, 660, 9, { id: 'levi', a: bij });
    allelChip(ctx, 'Aa', 600, 260, 1, { px: 30 }); allelChip(ctx, 'Aa', 600, 460, 1, { px: 30 }); allelChip(ctx, 'aa', 600, 660, bij, { px: 30 }); zon(ctx, 480, 380, 18, 1, t); zon(ctx, 480, 580, 18, zo, t);
    termKaart(ctx, 'fenotype = genotype + milieu', 'milieu: invloeden uit de omgeving, zoals zonlicht', 1240, 170, mi, C.goud, 1000);
    if (bij > 0.01) { zoomCircle(ctx, 1240, 620, 150, 480, 660, null, bij, () => { chMicro(ctx); huidDoorsnede(ctx, 1080, 320, 320, 420, { um: 70, seed: 11, mel: 0, t, huidTint: '#EED8CE' }); }); _vR(ctx, 'geen werkend enzym', 'zon helpt niet: geen pigment', 1240, 830, q.on('Hoeveel', 1, 0.5), 'center', C.goud); }
    _vR(ctx, 'niet bij elk gen zo', 'soms werkt het eiwit alleen minder goed of anders', 1240, 375, q.on('geldt', 1, 0.5), 'center'); },

  // ---------------- Hoofdstuk 6 — Terug naar de familie (Macro)
  s35(ctx, t, q) { kamer(ctx); const ch = q.on('allebei', 2, 0.5), w = q.on('wel', 1, 0.5);
    gezin(ctx, t, { hl: { dennis: q.on('Vader', 1, 0.4), marieke: q.on('moeder', 1, 0.4) } });
    ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, ch, { acc: 1, accA: w })); },
  s36(ctx, t, q) { kamer(ctx); gezin(ctx, t, { hl: { dennis: 1, marieke: 1 } }); ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, 1, { acc: 1 })); },
  s38(ctx, t, q) { kamer(ctx); const p = q.on('chromosoompaar', 1, 0.6), v = ramp(t, q.at('allebei'), 1.8), aa = q.on('dan', 1, 0.4), al = q.on('Albinisme', 2, 0.5);
    gezin(ctx, t, { hl: { levi: aa } }); ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, 1 - p, { acc: 1, accA: 1 }));
    const P = { dennis: [gx('dennis') - 190, kopY('dennis') + 130], marieke: [gx('marieke') + 190, kopY('marieke') + 120] }, LV = [gx('levi'), kopY('levi') - 125];
    paarKader(ctx, LV[0], LV[1], ramp(v, 0.5, 0.4), 90);
    ['dennis', 'marieke'].forEach((id, i) => { const [px, py] = P[id], kl = i ? CH.moeder : CH.vader; paarKader(ctx, px, py, p); staafAllel(ctx, px - 30, py, 'A', kl, p); staafAllel(ctx, px + 30, py, 'a', kl, p * (1 - ramp(v, 0, 0.05)));
      if (v > 0.01 && v < 0.99) { const x1 = LV[0] + (i ? 30 : -30), x = lerp(px + 30, x1, ease(v)), y = lerp(py, LV[1], ease(v)) - Math.sin(v * Math.PI) * 60; staafAllel(ctx, x, y, 'a', kl, 1, lerp(110, 90, ease(v))); } });
    if (v >= 0.99) ['dennis', 'marieke'].forEach((id, i) => staafAllel(ctx, LV[0] + (i ? 30 : -30), LV[1], 'a', i ? CH.moeder : CH.vader, 1, 90));
    _vR(ctx, 'van vader', null, P.dennis[0], P.dennis[1] + 125, p * (1 - v), 'center', CH.vader); _vR(ctx, 'van moeder', null, P.marieke[0], P.marieke[1] + 125, p * (1 - v), 'center', CH.moeder);
    _vR(ctx, 'geen werkend enzym', null, LV[0] + 95, LV[1] + 12, q.on('enzym', 1, 0.4) * (1 - al), 'left');
    _vR(ctx, 'albinisme', null, LV[0] + 95, LV[1] + 12, al, 'left', C.goud); },
  s39(ctx, t, q) { kamer(ctx); const n = q.on('nooit', 1, 0.5), g = q.on('generaties', 1, 0.5);
    gezin(ctx, t, { hl: { levi: 1 }, lijst: g }); ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, 1, { acc: 1, accA: n })); allelChip(ctx, 'aa', gx('levi'), kopY('levi') - 60, 1, { px: 46 });
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; text(ctx, 'minstens één van hen droeg a', 1660, 318, fTekst(28, 600), C.grain, 'center'); ctx.restore(); }
    card(ctx, 70, 130, 400, 250, null, 'Het allel a zat al generaties verborgen, steeds naast een A.', q.on('verborgen', 1, 0.5)); },

  // ---------------- Recap
  s40(ctx, t, q) { kamer(ctx); const ge = q.on('gemiddelde', 1, 0.5), vm = q.on('Van', 1, 0.5), we = q.on('Welke', 1, 0.5), br = q.on('broers', 1, 0.5);
    gezin(ctx, t, { hl: { sara: br, levi: br, jens: br } });
    allelChip(ctx, 'Aa', gx('dennis'), kopY('dennis') - 60, 1); allelChip(ctx, 'Aa', gx('marieke'), kopY('marieke') - 60, 1);
    allelChip(ctx, 'AA', gx('sara'), kopY('sara') - 60, we, { px: 40 }); allelChip(ctx, 'aa', gx('levi'), kopY('levi') - 60, 1, { px: 40 }); allelChip(ctx, 'Aa', gx('jens'), kopY('jens') - 60, we, { px: 40 });
    card(ctx, 70, 130, 400, 270, 'Geen gemiddelde', 'Per gen één allel van je vader en één van je moeder.', ge * Math.max(0.6, vm)); },
  s41(ctx, t, q) { chSchema(ctx); const a = 1; ctx.save(); ctx.globalAlpha *= a;
    const x0 = 760, y0 = 260, c = 180; ['A', 'a'].forEach((l, i) => { text(ctx, l, x0 + c * (i + 1) + c / 2, y0 - 20, fTekst(56, 700), C.text, 'center'); text(ctx, l, x0 - 10 + c / 2, y0 + c * (i + 1) - c / 2 + 20, fTekst(56, 700), C.text, 'center'); });
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { roundRect(ctx, x0 + c * (j + 1), y0 + c * i, c - 12, c - 12, 12); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); vraagteken(ctx, x0 + c * (j + 1) + c / 2 - 6, y0 + c * i + c / 2 + 30, 0.6, 80); }
    metaText(ctx, 'vader', x0 + c * 2, y0 - 90, CH.vader, 'center', 28); metaText(ctx, 'moeder', x0 - 60, y0 + c, CH.moeder, 'center', 28); ctx.restore();
    _vR(ctx, 'volgende film', 'het kruisingsschema', 960, 760, q.on('volgende', 1, 0.5), 'center', C.goud); }
});

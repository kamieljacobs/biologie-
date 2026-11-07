// Stambomen en kansrekenen 2.0 — scènes (één functie per gesproken alinea). 28 okt 2026, lichte remake.
// Cue-woorden: q.at zoekt een stukje van een woord; nooit op 'aa' cuen (zit in 'maar', 'staat').
// Personen in de stem nooit bij naam; in beeld rollen ('haar broer'), geen namen.

const _n = (ctx, lab, sub, x, y, a, al = 'center', kl = C.text) => naamBij(ctx, lab, sub, x, y, a, al, kl);
const KOP = (ctx, s, sub, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, 160, 120, C.goud, 'left', 30); if (sub) text(ctx, sub, 160, 180, fTekst(48, 700), C.text, 'left'); ctx.restore(); };
const CF = { y0: 300, dy: 250, r: 42 }; // vaste plek van de familie van de vrouw
const CFY = g => CF.y0 + (g - 1) * CF.dy;
const pos = (P, id) => { const p = P.personen.find(q => q.id === id); return [p.x, CF.y0 + (p.gen - 1) * CF.dy]; };

// spreekkamer met de vrouw (castpersonage Sanne, zonder naam) en de klinisch geneticus (Dr. Kim)
function spreekkamerScene(ctx, t, o = {}) { const { bordFn = null, form = 0, uitV = 'neutraal', uitK = 'praat' } = o; bg(ctx, 'schema');
  wandbord(ctx, 1180, 110, 640, 420); if (bordFn) { ctx.save(); roundRect(ctx, 1180, 110, 640, 420, 10); ctx.clip(); bordFn(ctx); ctx.restore(); }
  spreekkamerE6(ctx, { x0: 330, x1: 1130, top: 640, map: 1 });
  persoon(ctx, 'sanne', 560, 800, 430, { t, pose: 'zit', stoel: true, tafel: 640, uit: uitV, kijk: 1, outfit: 'gewoon' });
  persoon(ctx, 'kim', 1020, 800, 430, { t, zij: true, kijk: -1, pose: 'zit', stoel: true, tafel: 640, outfit: 'gewoon', uit: uitK });
  spreekkamerE6(ctx, { x0: 330, x1: 1130, top: 640, map: 0 });
  formulier(ctx, 700, 636, form);
  metaText(ctx, 'spreekkamer · klinische genetica', 70, 851, C.text2, 'left', 28); }
function bordStamboom(ctx, toon, o = {}) { ctx.save(); ctx.translate(1180 - 320, 110 - 60); ctx.scale(0.62, 0.62); stamboom(ctx, SB_CF, Object.assign({ y0: 300, dy: 250, r: 44, romeins: null, toon }, o)); ctx.restore(); }

Object.assign(SCENES, {
  // ---------------- titel: de familie van de vrouw, het kind als vraagteken
  title(ctx, t) { ctx.save(); ctx.translate(960, 170); ctx.scale(0.62, 0.62); const g = (n) => ramp(t, 0.4 + n * 0.6, 0.6);
    stamboom(ctx, SB_CF, { y0: 300, dy: 250, r: 44, romeins: null, toon: { v1: g(0), m1: g(0), b1: g(1), b2: g(1), zij: g(1), par: g(1), kind: g(2) }, hl: { zij: 1 } }); ctx.restore(); },

  // ---------------- Cold open: spreekkamer
  s01(ctx, t, q) { const br = q.on('broer', 1, 0.5), ou = q.on('ouders', 1, 0.5), ze = q.on('zelf', 1, 0.5), dr = q.on('Draagt', 1, 0.5), ka = q.on('kans', 1, 0.6);
    spreekkamerScene(ctx, t, { bordFn: c => { bordStamboom(c, { v1: ou, m1: ou, b1: ze, b2: br, zij: ze, par: 0, kind: ka }, { hl: { zij: dr } }); } });
    _n(ctx, 'haar broer', 'taaislijmziekte', 1180 - 320 + 880 * 0.62, 110 - 60 + 680 * 0.62, br, 'center'); },

  // ---------------- Hoofdstuk 1: de taal van een stamboom
  s03(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'de taal van een stamboom');
    const vk = q.on('vierkant', 1, 0.5), ro = q.on('rondje', 1, 0.5), ik = q.on('ingekleurd', 1, 0.5), li = q.on('lijn', 1, 0.5), da = q.on('Daaronder', 1, 0.6), ou = q.on('oud', 1, 0.5), ge = q.on('generatie', 1, 0.6), ro2 = q.on('Romeins', 1, 0.5);
    const P = { personen: [ { id: 'v', sekse: 'm', ziek: false, gen: 1, x: 700 }, { id: 'm', sekse: 'v', ziek: false, gen: 1, x: 1000 },
      { id: 'k1', sekse: 'v', ziek: false, gen: 2, x: 560, ouders: ['v', 'm'] }, { id: 'k2', sekse: 'm', ziek: true, gen: 2, x: 850, ouders: ['v', 'm'] }, { id: 'k3', sekse: 'v', ziek: false, gen: 2, x: 1140, ouders: ['v', 'm'] } ] };
    stamboom(ctx, P, { y0: 330, dy: 300, r: 44, romeins: null, toon: { v: 1, m: 1, k1: da, k2: Math.max(ik, da), k3: da }, lijnA: li, hl: { v: vk * (1 - ro), m: ro * (1 - ik) } });
    genLijnen(ctx, [330, 630], 380, 1400, ro2, ge * (1 - ro2 * 0.6));
    _n(ctx, 'man', null, 700, 255, vk); _n(ctx, 'vrouw', null, 1000, 255, ro); _n(ctx, 'een paar', null, 850, 312, li, 'center', C.grain);
    _n(ctx, 'heeft de eigenschap', null, 850, 720, ik, 'center', C.goud);
    ctx.save(); ctx.globalAlpha *= ou; metaText(ctx, 'oudste', 560, 720, C.text2, 'center', 26); metaText(ctx, 'jongste', 1140, 720, C.text2, 'center', 26); ctx.restore();
    _n(ctx, 'kinderen', 'aan één lijn', 1240, 488, da, 'left'); _n(ctx, 'generaties', 'op één hoogte · romeinse cijfers', 1440, 640, ge, 'left'); },
  s04(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'de stamboom van haar familie');
    const bo = q.on('Bovenaan', 1, 0.5), da = q.on('Daaronder', 1, 0.5), jo = q.on('jongste', 1, 0.5), on = q.on('Onderaan', 1, 0.6);
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, toon: { v1: bo, m1: bo, b1: da, b2: da, zij: 1, par: da, kind: on }, hl: { zij: 1 - jo * 0.6, b2: jo } });
    _n(ctx, 'zij', null, 1140, 640, 1, 'center', C.goud); _n(ctx, 'haar ouders', null, 880, 230, bo);
    _n(ctx, 'haar broer', 'taaislijmziekte', 880, 640, jo); _n(ctx, 'haar partner', null, 1400, 640, da); _n(ctx, 'hun kind?', null, 1270, 875, on); },

  // ---------------- Hoofdstuk 2: stap 1
  s05(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'stap 1 · dominant of recessief?');
    const zo = q.on('Zoek', 1, 0.5), ve = q.on('verborgen', 1, 0.6), re = q.on('recessief', 2, 0.5), ta = q.on('taaislijmziekte', 1, 0.5), zj = q.on('juist', 1, 0.6), dm = q.on('dominant', 2, 0.5);
    miniStamboom(ctx, 520, 330, 1.15, [false, false], { sekse: 'm', ziek: true }, { a: Math.max(0.6, zo), geno: { v: 'Aa', m: 'Aa', k: 'aa' }, genoA: ve, genoKl: { v: C.goud, m: C.goud } });
    _n(ctx, 'zonder', null, 520 - 103, 255, zo); _n(ctx, 'zonder', null, 520 + 103, 255, zo); _n(ctx, 'mét', null, 520 + 90, 520, zo, 'left', C.goud);
    haak(ctx, 360, 680, 640, 'recessief', C.groen, re); _n(ctx, 'zo is het bij taaislijmziekte', null, 520, 790, ta, 'center', C.grain);
    miniStamboom(ctx, 1380, 330, 1.15, [true, true], { sekse: 'v', ziek: false }, { a: zj });
    _n(ctx, 'mét', null, 1380 - 103, 255, zj); _n(ctx, 'mét', null, 1380 + 103, 255, zj); _n(ctx, 'zonder', null, 1380 + 90, 520, zj, 'left', C.goud);
    haak(ctx, 1220, 1540, 640, 'dominant', C.groen, dm); },
  s06(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'dominant patroon', 'ziekte van Huntington');
    const st = q.on('stamboom', 1, 0.6), ho = q.on('hoofdletter', 1, 0.5), ge = q.on('genoeg', 1, 0.6), d1 = q.on('Daarom', 1, 0.5), d2 = ramp(q.localT, q.at('Daarom') + 1.2, 0.5), d3 = ramp(q.localT, q.at('Daarom') + 2.4, 0.5);
    const T = { o: 1, om: 1, d: st, dp: st, z2: st, z: st, zp: st, dk1: ge, dk2: ge, zk1: ge, zk2: ge };
    stamboom(ctx, SB_HD, { y0: 300, dy: 230, r: 40, romeins: 140, toon: T, hl: { o: d1, d: d2, dk1: d3 } });
    ctx.save(); ctx.globalAlpha *= ho; metaText(ctx, 'A = allel voor de ziekte', 1840, 130, C.grain, 'right', 26); ctx.restore();
    _n(ctx, 'ziek → een ouder ziek', null, 300, 860, d3, 'center', C.goud); },
  s07(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'dominant patroon', 'ziekte van Huntington');
    stamboom(ctx, SB_HDQ, { y0: 300, dy: 230, r: 40, romeins: 140, toon: { o: 1, om: 1, d: 1, dp: 1, z2: 1, z: 1, zp: 1, dk1: 1, dk2: 1, zq: q.on('Kan', 1, 0.5) }, hl: { z: 1, o: q.on('vader', 1, 0.5) }, dim: { d: 0.35, dp: 0.35, dk1: 0.35, dk2: 0.35, z2: 0.35, om: 0.35 } });
    _n(ctx, 'deze man', 'niet ziek', 1120, 520, 1, 'right', C.goud); _n(ctx, 'zijn vader', 'ziek', 700, 290, q.on('vader', 1, 0.5), 'right'); _n(ctx, 'zijn kind?', null, 1310, 840, q.on('kind', 1, 0.5)); },

  s09(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'dominant patroon', 'ziekte van Huntington');
    const wi = q.on('Wie', 1, 0.5), va = q.on('vader', 1, 0.5), tv = ramp(q.localT, q.at('toevallig'), 1.2), ge = q.on('enkel', 1, 0.6), kk = q.on('kleinkinderen', 1, 0.6);
    const geno = { z: wi > 0.01 ? 'aa' : '', o: va > 0.01 ? 'Aa' : '', zp: ge > 0.01 ? 'aa' : '', zk1: ge > 0.01 ? 'aa' : '', zk2: ge > 0.01 ? 'aa' : '', om: ge > 0.01 ? 'aa' : '' };
    const dimA = 1 - ge * 0.65; stamboom(ctx, SB_HD, { y0: 300, dy: 230, r: 40, romeins: 140, geno, genoKl: { z: C.goud, zk1: C.goud, zk2: C.goud }, hl: { z: 1 }, dim: { d: dimA, dp: dimA, dk1: dimA, dk2: dimA, z2: dimA } });
    // de a van de vader reist naar de zoon; de A blijft bij de vader
    if (tv > 0.01 && tv < 0.99) reisChip(ctx, 'a', 760, 300 - 80, 1180, 530 - 80, tv, CH.vader); if (tv >= 0.99) letterChip(ctx, 'a', 1180, 530 - 80, CH.vader, 1 - ge);
    letterChip(ctx, 'A', 700, 220, CH.vader, va * (1 - ge)); if (tv < 0.01) letterChip(ctx, 'a', 760, 220, CH.vader, va);
    _n(ctx, 'geen A om door te geven', null, 1120, 665, wi * (1 - ge), 'right', C.goud);
    _n(ctx, 'geen A meer:', 'komt niet terug', 1500, 770, kk, 'left', C.groen);
    ctx.save(); ctx.globalAlpha *= va; metaText(ctx, 'A = allel voor de ziekte', 1840, 130, C.grain, 'right', 26); ctx.restore(); },
  s10(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'dominant of recessief: wie slaat over?');
    const re = q.on('recessieve', 1, 0.5), dr = q.on('dragers', 1, 0.5), ov = q.on('overslaat', 1, 0.6);
    ctx.save(); ctx.translate(-40, 200); ctx.scale(0.5, 0.5); stamboom(ctx, SB_HD, { y0: 300, dy: 230, r: 40, romeins: null }); ctx.restore();
    _n(ctx, 'dominant', 'in elke generatie', 400, 280, 1, 'center');
    stamboom(ctx, SB_REC, { y0: 300, dy: 230, r: 40, romeins: null, toon: { r1: re, r2: re, r3: re, r4: re, r5: re, r6: re }, geno: { r3: 'Aa', r4: 'Aa', r1: 'aa', r5: 'aa' }, genoA: dr, genoKl: { r3: C.goud, r4: C.goud } });
    if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(1130, 300); ctx.bezierCurveTo(980, 420, 1000, 650, 1290, 760); ctx.stroke(); ctx.restore(); text(ctx, 'lijkt over te slaan', 1000, 560, fTekst(32, 600), C.goud, 'right'); }
    _n(ctx, 'recessief', 'twee dragers', 1360, 220, re, 'center'); haak(ctx, 1150, 1580, 820, '', C.groen, 0); },

  // ---------------- Hoofdstuk 3: stap 2 en 3
  s11(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'stap 2 · autosoom of X-chromosoom?');
    const re = q.on('recessieve', 1, 0.5), en = ramp(q.localT, q.at('enige'), 1.0), zi = q.on('Zie', 1, 0.6), au = q.on('autosoom', 2, 0.5);
    miniStamboom(ctx, 420, 330, 1.05, [true, false], { sekse: 'v', ziek: true }, { a: Math.max(0.5, re), geno: { v: 'XᵃY', m: 'XᴬXᵃ', k: 'XᵃXᵃ' } });
    if (en > 0.01 && en < 0.99) reisChip(ctx, 'Xᵃ', 420 - 95, 300, 420, 470, en, CH.vader);
    _n(ctx, 'X-recessief', 'zieke dochter → zieke vader', 680, 410, re, 'left');
    miniStamboom(ctx, 420, 680, 0.95, [false, false], { sekse: 'v', ziek: true }, { a: zi, hl: { v: zi } });
    _n(ctx, 'zieke dochter, gezonde vader', null, 680, 760, zi, 'left'); _n(ctx, 'dus: gen op een autosoom', null, 680, 810, au, 'left', C.groen); },
  s12(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'stap 2 · autosoom of X-chromosoom?');
    const zo = q.on('zoon', 1, 0.5), ni = q.on('zeker', 1, 0.5), ch = q.on('chromosoom', 1, 0.6);
    ctx.save(); ctx.globalAlpha *= 0.35; miniStamboom(ctx, 420, 330, 1.05, [true, false], { sekse: 'v', ziek: true }, { geno: { v: 'XᵃY', m: 'XᴬXᵃ', k: 'XᵃXᵃ' } }); miniStamboom(ctx, 420, 680, 0.95, [false, false], { sekse: 'v', ziek: true }); ctx.restore();
    ctx.save(); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(900, 230); ctx.lineTo(900, 860); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(700, 110); ctx.scale(0.62, 0.62); stamboom(ctx, SB_CF, { y0: 300, dy: 250, r: 44, romeins: null, hl: { b2: zo }, toon: { v1: 1, m1: 1, b1: 1, b2: 1, zij: 1, par: 0, kind: 0 } }); ctx.restore();
    _n(ctx, 'alleen een zoon ziek', 'uit de stamboom niet te bepalen', 1260, 600, Math.max(zo * 0.6, ni), 'center');
    chrom7(ctx, 1680, 560, ch); _n(ctx, 'chromosoom 7', 'een autosoom', 1680, 740, ch, 'center', C.goud); },
  s13(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'stap 3 · vul de genotypen in');
    const re = q.on('recessieve', 1, 0.5), we = q.on('Werk', 1, 0.5), kr = ramp(q.localT, q.at('kreeg'), 1.2), al = q.on('allebei', 1, 0.5), dr = q.on('drager', 1, 0.6);
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, geno: { b2: re > 0.01 ? 'aa' : '', v1: al > 0.01 ? 'Aa' : '', m1: al > 0.01 ? 'Aa' : '' }, genoKl: { b2: C.goud, v1: C.goud, m1: C.goud }, hl: { b2: 1 - al * 0.5, v1: al, m1: al } });
    if (kr > 0.01 && kr < 0.99) { reisChip(ctx, 'a', 880, 520, 760, 300 - 80, kr, CH.vader); reisChip(ctx, 'a', 880, 520, 1000, 300 - 80, kr, CH.moeder); }
    if (kr >= 0.99) { letterChip(ctx, 'a', 760 + 0, 300 - 80, CH.vader, 1 - al); letterChip(ctx, 'a', 1000, 300 - 80, CH.moeder, 1 - al); }
    _n(ctx, 'werk terug', 'van aa naar de ouders', 1180, 250, we, 'left', C.goud);
    termKaartE(ctx, 'drager', 'Aa: gezond, draagt a bij zich', 1420, 640, 470, dr); },
  s14(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'stap 3 · vul de genotypen in');
    const mi = q.on('minstens', 1, 0.5), no = q.on('noteer', 1, 0.5), ou = q.on('oudste', 1, 0.5);
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, geno: { b2: 'aa', v1: 'Aa', m1: 'Aa', b1: no > 0.01 ? 'A_' : '', zij: no > 0.01 ? 'A_' : '', par: '?' }, genoKl: { b1: C.goud, zij: C.goud }, hl: { zij: mi, b1: ou } });
    termKaartE(ctx, 'drager', 'Aa: gezond, draagt a bij zich', 1420, 640, 470, 1); termKaartE(ctx, 'A_', 'AA óf Aa: minstens één A', 1420, 766, 470, no); },

  // ---------------- Hoofdstuk 4: twee derde
  s15(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'is zij drager?');
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, geno: { b2: 'aa', v1: 'Aa', m1: 'Aa', zij: q.on('Hoe', 1, 0.3) > 0.5 ? '?' : '' }, genoKl: { zij: C.goud }, hl: { zij: q.on('gezond', 1, 0.5) }, dim: { b1: 0.35, par: 0.35, kind: 0.35 } }); },
  s17(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, '300 kinderen van twee dragers', 'Aa × Aa · echte trekkingen');
    const t0 = q.at('driehonderd'), fase = isFinite(t0) ? clamp((q.localT - t0) / 5, 0, 1) : 0, el = q.on('Elk', 1, 0.5), kw = q.on('kwart', 1, 0.5), we = q.on('weg', 1, 1.0), ov = ramp(q.localT, q.at('overblijven'), 1.4), td = q.on('derde', 1, 0.6);
    const K = simRaster(ctx, 260, 330, { fase: Math.max(fase, 0.02), weg: we, sorteer: ov });
    // hoe één kind ontstaat: een allel van de vader (teal) en een van de moeder (oker)
    ctx.save(); ctx.globalAlpha *= el * (1 - kw); letterChip(ctx, 'A', 1460, 360, CH.vader); text(ctx, '+', 1520, 372, fTekst(44, 700), C.text2, 'center'); letterChip(ctx, 'a', 1580, 360, CH.moeder); text(ctx, '→ Aa', 1700, 374, fTekst(44, 700), C.text, 'center'); metaText(ctx, 'van vader · van moeder', 1520, 430, C.grain, 'center', 22); ctx.restore();
    simLegenda(ctx, 1400, 360, kw); const n = K.n; ctx.save(); ctx.globalAlpha *= kw * (1 - ov); text(ctx, 'AA ' + n.AA + ' · Aa ' + n.Aa + ' · aa ' + n.aa, 1400, 600, fTekst(36, 600), C.text, 'left'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= ov; text(ctx, 'AA · ' + n.AA, 260, 300, fTekst(40, 700), C.text, 'left'); text(ctx, 'Aa · ' + n.Aa, 680, 300, fTekst(40, 700), C.goud, 'left'); metaText(ctx, 'aa: ' + n.aa + ' · weggehaald', 1400, 600, C.text2, 'left', 26); ctx.restore();
    if (td > 0.01) { ctx.save(); ctx.globalAlpha *= td; roundRect(ctx, 1380, 640, 420, 150, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 2); text(ctx, n.Aa + ' van ' + (n.AA + n.Aa) + ' ≈ ⅔', 1590, 715, fTitel(54), C.goud, 'center'); metaText(ctx, 'gezonde kinderen die drager zijn', 1590, 765, C.grain, 'center', 22); ctx.restore(); } },

  // ---------------- Hoofdstuk 5: rekenregels
  s18(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'twee rekenregels');
    const ee = q.on('eerst', 1, 0.5), da = q.on('daarna', 1, 0.5), zt = q.on('zestiende', 1, 0.5);
    text(ctx, 'productregel', 260, 280, fTekst(48, 700), C.text, 'left'); metaText(ctx, 'en · en → vermenigvuldigen', 260, 325, C.grain, 'left', 24);
    oppModel(ctx, 300, 410, 380, { kol: ee, rij: da, kruis: zt }); ctx.save(); ctx.globalAlpha *= zt; text(ctx, '¼ × ¼ = 1/16', 490, 860, fTitel(54), C.goud, 'center'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.35; text(ctx, 'somregel', 1000, 280, fTekst(48, 700), C.text, 'left'); ctx.restore(); },
  s19(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'twee rekenregels');
    const so = q.on('somregel', 1, 0.5), ge = q.on('gezond', 1, 0.5), dk = q.on('drie', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= 0.45; text(ctx, 'productregel', 260, 280, fTekst(48, 700), C.text, 'left'); oppModel(ctx, 300, 410, 380, {}); text(ctx, '¼ × ¼ = 1/16', 490, 860, fTitel(54), C.goud, 'center'); ctx.restore();
    text(ctx, 'somregel', 1000, 280, fTekst(48, 700), C.text, 'left'); ctx.save(); ctx.globalAlpha *= so; metaText(ctx, 'óf · óf → optellen', 1000, 325, C.grain, 'left', 24); ctx.restore();
    kansBalk(ctx, 1000, 420, 760, { hl: ge }); haak(ctx, 1003, 1567, 670, 'gezond: ¼ + ½ = ¾', C.groen, dk); },
  s20(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'twee dragers, het volgende kind');
    stamboom(ctx, SB_DR, { y0: 360, dy: 280, r: 46, romeins: null, toon: { v: 1, m: 1, k1: 1, k2: q.on('Hoe', 1, 0.5) }, geno: { v: 'Aa', m: 'Aa', k1: 'aa' }, hl: { k2: q.on('volgende', 1, 0.5) } });
    _n(ctx, 'al een kind met taaislijmziekte', null, 860, 810, 1, 'center'); },
  s22(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'elk kind is een nieuwe trekking');
    const t0 = q.at('Elk'); const ge = q.on('geheugen', 1, 0.6);
    for (let i = 0; i < 3; i++) { const a = ramp(q.localT, (isFinite(t0) ? t0 : 0) + i * 1.6, 0.5), y = 320 + i * 170, d = i < 2 ? 1 - 0.5 * ramp(q.localT, (isFinite(t0) ? t0 : 0) + (i + 1) * 1.6, 0.5) : 1;
      ctx.save(); ctx.globalAlpha *= a * d; metaText(ctx, (i + 1) + 'e kind', 300, y + 10, C.text2, 'left', 28); letterChip(ctx, ['a', 'A', 'a'][i], 520, y, CH.vader); letterChip(ctx, ['a', 'a', 'A'][i], 600, y, CH.moeder);
      text(ctx, 'kans op ziek: ¼', 700, y + 14, fTekst(40, 700), C.text, 'left'); ctx.restore(); }
    card(ctx, 1220, 420, 520, 150, null, 'Toeval heeft geen geheugen.', ge); },

  // ---------------- Hoofdstuk 6: terug naar de spreekkamer
  s23(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'de familie van de vrouw');
    const te = q.on('testen', 1, 0.5), dr = q.on('drager', 1, 0.5);
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, geno: { b2: 'aa', v1: 'Aa', m1: 'Aa', b1: 'A_', zij: 'A_', par: dr > 0.01 ? 'Aa' : '?' }, genoKl: { par: C.goud }, hl: { par: te } });
    buisje(ctx, 1480, 515, 70, te); _n(ctx, 'getest', null, 1505, 470, te, 'left', C.goud); _n(ctx, 'haar partner', 'drager', 1462, 600, dr, 'left'); },
  s24(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'de kans voor hun kind');
    stamboom(ctx, SB_CF, { y0: CF.y0, dy: CF.dy, r: CF.r, romeins: 400, geno: { b2: 'aa', v1: 'Aa', m1: 'Aa', b1: 'A_', zij: 'A_', par: 'Aa' }, hl: { kind: q.on('kind', 1, 0.5) } }); },
  s26(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'de kans voor hun kind');
    const st = q.on('drager', 1, 0.4) > 0.5 ? (q.on('doorgeven', 1, 0.4) > 0.5 ? (q.on('partner', 1, 0.4) > 0.5 ? 3 : 2) : 1) : 0;
    kansBoom(ctx, 230, 470, { st, som: q.on('zesde', 1, 0.6) }); },
  s27(ctx, t, q) { const kw = q.on('kwart', 1, 0.5), ni = q.on('niet', 1, 0.5), te = q.on('dragerschapstest', 1, 0.5);
    spreekkamerScene(ctx, t, { form: te, uitV: 'neutraal', bordFn: c => { c.save(); c.globalAlpha *= 1 - kw; bordStamboom(c, null, { hl: { zij: 1 }, geno: { par: 'Aa' } }); c.restore();
      termKaartE(c, 'drager (Aa)', 'kans kind ziek: ¼', 1220, 170, 560, kw, C.goud);
      termKaartE(c, 'geen drager (AA)', 'kans kind ziek: 0', 1220, 330, 560, ni, C.groen); } });
    _n(ctx, 'dragerschapstest', null, 790, 600, te, 'center', C.goud); },

  // ---------------- Recap
  s28(ctx, t, q) { bg(ctx, 'schema'); KOP(ctx, 'het stappenplan');
    const S2 = q.on('twee', 1, 0.5), S3 = q.on('drie', 1, 0.5), S4 = q.on('vier', 1, 0.5), zo = q.on('Zo', 1, 0.6);
    const kaarten = [['dominant of recessief?', 'dominant slaat geen generatie over'], ['autosoom of X?', 'zieke dochter, gezonde vader → autosoom'], ['genotypen invullen', 'terug vanaf wie de eigenschap heeft'], ['reken de kans uit', 'en → ×, óf → +, haal weg wat je weet']];
    const a = [1, S2, S3, S4]; kaarten.forEach(([k, s], i) => stapKaart(ctx, i + 1, k, s, 160 + i * 410, 240, 380, a[i] * (1 - zo * 0.85), 0));
    if (zo > 0.01) { ctx.save(); ctx.globalAlpha *= zo; ctx.translate(560, 330); ctx.scale(0.62, 0.62); stamboom(ctx, SB_CF, { y0: 300, dy: 250, r: 44, romeins: null, geno: { zij: '⅔ drager' }, genoKl: { zij: C.goud }, hl: { zij: 1, kind: 1 } }); ctx.restore();
      text(ctx, '⅙', 560 + 1270 * 0.62 + 70, 330 + 800 * 0.62 + 20, fTitel(64), C.goud, 'left'); } }
});

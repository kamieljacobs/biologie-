// Zenuwstelsel 9 · Spieren en beweging — scènes (26 okt 2026). Cues via q.on(woord, n, duur) op de woordtijden van Roos.
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
function ring(ctx, x, y, r, a = 1, kleur = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function chipLijst(ctx, items, x, y, gap = 86, px = 30) { items.forEach(([s, a, col], i) => tag(ctx, s, x, y + i * gap, col || C.teal, a, 'left', px)); }
function bez(p0, p1, p2, p3, u) { const v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]]; }
function steen(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; z9Glad(ctx, [[x - r, y + r * 0.3], [x - r * 0.7, y - r * 0.6], [x + r * 0.1, y - r * 0.85], [x + r * 0.9, y - r * 0.4], [x + r, y + r * 0.5], [x + r * 0.2, y + r * 0.8], [x - r * 0.6, y + r * 0.75]], true); shape(ctx, '#8A8E96', '#6A6E76', 2);
  for (let i = 0; i < 9; i++) circ(ctx, x + (hash(i) - 0.5) * r * 1.3, y + (hash(i + 3) - 0.5) * r, 3 + hash(i + 7) * 5, rgba('#5A5E66', 0.6)); ctx.restore(); }
// ronde 'plaatjes' voor gewrichtjes op het skelet
function gewrichtStip(ctx, p, kleur, a = 1, r = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, p[0], p[1], r, rgba(kleur, 0.35), kleur, 3); ctx.restore(); }
function deur(ctx, x, y, h, open, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 6, y - h, 6, h); const w = h * 0.45 * Math.cos(open);
  ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + w, y - h + h * 0.06 * Math.sin(open)); ctx.lineTo(x + w, y - h * 0.06 * Math.sin(open)); ctx.lineTo(x, y); ctx.closePath(); shape(ctx, '#C9A36A', '#9A7A4A', 2);
  for (const yy of [y - h * 0.8, y - h * 0.2]) circ(ctx, x, yy, 7, '#8A94A6'); circ(ctx, x + w * 0.85, y - h * 0.5, 6, '#5A6478'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const e = 0.5 + 0.55 * (0.5 - 0.5 * Math.cos(t * 1.2)); const R = armAnatomie(ctx, 1500, 170, 11, { u: 0.08, e, huid: 1, hl: { biceps: 0.5 + 0.5 * Math.sin(t * 1.2) } });
    schooltas(ctx, R.hand[0], R.hand[1] - 4, 2.9); },
  s01(ctx, t, q) { bg(ctx, 'schema'); const veer = q.on('veertje', 1, 0.3), tas = q.on('schooltas', 1, 0.3);
    const last = tas > 0.5 ? 'tas' : veer > 0.5 ? 'veer' : null, emg = lerp(lerp(0.02, 0.08, veer), 0.75, ease((t - q.at('schooltas') - 0.3) / 1.5));
    const P = lokaal(ctx, t, { last, emg, sam: q.on('legt', 1, 0.3) > 0.5 && t < q.at('Dezelfde') ? 'wijs' : 'staan', samX: 990, plakT: 0, armE: 1.5 });
    emgPaneel(ctx, 1380, 70, 480, { t, bic: emg, triA: 0, a: q.on('Plakkers', 1, 0.6) });
    if (P.plakBiceps) { ring(ctx, P.plakBiceps[0], P.plakBiceps[1], 30, q.on('Plakkers', 1, 0.4) * UIT(t, q.at('Sam'))); naamBij(ctx, 'biceps', null, P.plakBiceps[0] + 40, P.plakBiceps[1] - 60, q.on('biceps', 1, 0.4) * UIT(t, q.at('Sam')), 'left', C.goud);
      ring(ctx, P.plakBiceps[0], P.plakBiceps[1], 30, q.on('Dezelfde', 1, 0.4)); }
    vraagteken(ctx, 960, 260, q.on('kan', 1, 0.4), 120); },
  s02(ctx, t, q) { bg(ctx, 'schema'); const P = lokaal(ctx, t, { last: 'tas', emg: 0.75, samX: 990, plakT: 0 }); emgPaneel(ctx, 1380, 70, 480, { t, bic: 0.75, triA: 0, hlB: q.on('groter', 1, 0.4) });
    if (P.plakBiceps) zoomCircle(ctx, 1240, 250, 125, P.plakBiceps[0], P.plakBiceps[1], 'IN DE SPIER', q.on('spier', 1, 0.6), () => { bg(ctx, 'micro'); spierDwars(ctx, 1240, 250, 115, { n: 80 }); vraagteken(ctx, 1240, 290, 1, 100); }); },

  // ---------- Hoofdstuk 1 · Bot en gewricht
  s05(ctx, t, q) { bg(ctx, 'schema'); BODY = { cx: 380, yb: 870, h: 760 }; const a = ramp(t, 0, 0.6); anSkeleton(a);
    if (q.on('hersenen', 1, 0.3) > 0.01) anSkull(q.on('hersenen', 1, 0.3) * UIT(t, q.at('hart'), 0.6), 1);
    { const [x0, y0] = AP(0, 2.0); ctx.save(); ctx.globalAlpha *= q.on('hart', 1, 0.4) * UIT(t, q.at('spieren'), 0.6); ctx.beginPath(); ctx.ellipse(x0, y0, 0.62 * AHH(), 0.52 * AHH(), 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    const uitC = UIT(t, q.at('Zo'), 0.6);
    chipLijst(ctx, [['dragen', q.on('draagt', 1, 0.4) * uitC], ['beschermen: hersenen, hart, longen', q.on('beschermt', 1, 0.4) * uitC], ['spieren trekken eraan', q.on('trekken', 1, 0.4) * uitC]], 820, 330, 110, 34);
    const b = q.on('Zo', 1, 0.8); if (b > 0.01) { const hum = AP(0.95, 2.2); ctx.save(); ctx.globalAlpha *= b; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(hum[0], hum[1]); ctx.lineTo(1300, 300); ctx.moveTo(hum[0], hum[1]); ctx.lineTo(1300, 640); ctx.stroke(); ctx.restore();
      gewrichtStip(ctx, hum, C.goud, b, 12); botDoorsnede(ctx, 1450, 470, 20, { a: b }); ctx.save(); ctx.globalAlpha *= b; metaText(ctx, 'OPPERARMBEEN · IN DE LENGTE DOORGESNEDEN', 1450, 860, C.grain, 'center', 22); ctx.restore(); } },
  s06(ctx, t, q) { bg(ctx, 'schema'); const b = botDoorsnede(ctx, 620, 470, 20, {}); naamBij(ctx, 'bot', null, 760, 300, 1, 'left');
    steen(ctx, 1320, 470, 150, q.on('steen', 1, 0.4)); naamBij(ctx, 'steen', null, 1320, 690, q.on('steen', 1, 0.4), 'center');
    vraagteken(ctx, 980, 500, q.on('levend', 1, 0.4), 140); },
  s08(ctx, t, q) { bg(ctx, 'schema'); const fokus = q.on('rood', 1, 0.5), uitZ = UIT(t, q.at('Rood') - 0.5, 0.6);
    const b = botDoorsnede(ctx, 500, 470, 20, { hl: fokus > 0.5 ? { rood: 1, geel: 0, kraakbeen: 0, bloedvat: 0, vlies: 0 } : {} });
    naamBij(ctx, 'bloedvat', null, b.bloedvat[0] + 30, b.bloedvat[1], q.on('bloedvaten', 1, 0.4) * uitZ, 'left');
    const z = ramp(t, 0.3, 0.6) * uitZ; zoomCircle(ctx, 1300, 420, 280, b.wand[0], b.wand[1], 'BOTWEEFSEL · VERGROOT', z, () => { botWeefsel(ctx, 1300, 420, 280, {});
      const r1 = q.on('afbreken', 1, 0.4), r2 = q.on('opbouwen', 1, 0.4); ring(ctx, 1300 - 0.35 * 280 - 50, 420 - 0.3 * 280 + 20, 34, r1, C.koraal); ring(ctx, 1300 + 0.42 * 280 + 40, 420 - 0.2 * 280 + 50, 34, r2, C.groen); });
    naamBij(ctx, 'botcellen', null, 1600, 560, q.on('cellen', 1, 0.4) * uitZ, 'center');
    naamBij(ctx, 'breekt bot af', null, 1060, 140, q.on('afbreken', 1, 0.4) * uitZ, 'center', C.koraal); naamBij(ctx, 'bouwt nieuw bot op', null, 1560, 140, q.on('opbouwen', 1, 0.4) * uitZ, 'center', C.groen);
    tag(ctx, 'een breuk groeit weer dicht', 1300, 840, C.groen, q.on('breuk', 1, 0.4) * uitZ, 'center', 28);
    naamBij(ctx, 'rood beenmerg', 'in sponsachtig bot · maakt bloedcellen', b.rood[0] + 80, b.rood[1], fokus * UIT(t, q.at('Kalkzouten'), 0.6), 'left', C.goud);
    chipLijst(ctx, [['kalkzouten → hard', q.on('Kalkzouten', 1, 0.4), C.oker], ['collageen → een beetje buigzaam', q.on('collageen', 1, 0.4), C.teal]], 1000, 380, 120, 34); },
  s09(ctx, t, q) { bg(ctx, 'schema'); const cues = [['kop', 'gewrichtskop'], ['kom', 'gewrichtskom'], ['kraakbeen', 'kraakbeen'], ['kapsel', 'kapsel'], ['smeer', 'gewrichtssmeer'], ['banden', 'gewrichtsbanden']];
    let cur = null; for (const [k, w] of cues) if (t >= q.at(w)) cur = k; const hl = {}; for (const [k] of cues) hl[k] = cur ? (k === cur ? 1 : 0.25) : 1;
    const g = gewrichtDoorsnede(ctx, 860, 400, 60, { draai: 0.15, hl, a: ramp(t, 0, 0.6) }); const L = (k, w) => q.on(w, 1, 0.4);
    naamBij(ctx, 'gewrichtskop', null, g.kop[0] + 40, g.kop[1] + 10, L('kop', 'gewrichtskop'), 'left'); naamBij(ctx, 'gewrichtskom', null, g.kom[0] - 40, g.kom[1] + 10, L('kom', 'gewrichtskom'), 'right');
    naamBij(ctx, 'kraakbeen', 'glad · geen bloedvaten', g.kraakbeen[0] - 50, g.kraakbeen[1] - 30, L('kb', 'kraakbeen'), 'right');
    naamBij(ctx, 'gewrichtskapsel', null, g.kapsel[0] + 70, g.kapsel[1] + 60, L('k', 'kapsel'), 'left'); naamBij(ctx, 'gewrichtsbanden', null, g.banden[0] + 60, g.banden[1] - 50, L('b', 'gewrichtsbanden'), 'left');
    naamBij(ctx, 'gewrichtssmeer', null, g.smeer[0] - 40, g.smeer[1] + 70, L('s', 'gewrichtssmeer'), 'right');
    metaText(ctx, 'SCHEMATISCH · SCHOUDER IN DOORSNEDE', 1500, 860, C.grain, 'center', 22); },
  s10(ctx, t, q) { bg(ctx, 'schema'); const e = t < q.at('Welk') ? (t < q.at('strekken') ? lerp(0.2, 1.6, (t - q.at('buigen')) / 0.8) : lerp(1.6, 0.2, (t - q.at('strekken')) / 0.7)) : 0.2;
    const aArm = UIT(t, q.at('Welk'), 0.6); const RA = armAnatomie(ctx, 760, 160, 10, { u: 0.05, e, huid: 1, spieren: 0.25, a: aArm }); if (RA.elleboog) naamBij(ctx, 'elleboog', null, RA.elleboog[0] - 70, RA.elleboog[1] + 10, aArm * q.on('elleboog', 1, 0.4), 'right');
    const b = q.on('Welk', 1, 0.6); if (b > 0.01) { BODY = { cx: 960, yb: 870, h: 760 }; anSkeleton(b); for (const p of [AP(0.4, 3.75), AP(0.31, 5.25), AP(1.03, 2.87)]) gewrichtStip(ctx, p, C.teal, b, 18); vraagteken(ctx, 1450, 480, q.on('draaien', 1, 0.4), 140); } },
  s12(ctx, t, q) { bg(ctx, 'schema'); BODY = { cx: 380, yb: 870, h: 760 }; anSkeleton(1);
    gewrichtStip(ctx, AP(0.4, 3.75), C.goud, q.on('heup', 1, 0.3), 18); gewrichtStip(ctx, AP(-0.4, 3.75), C.goud, q.on('heup', 1, 0.3), 18); gewrichtStip(ctx, AP(0.88, 1.55), C.goud, q.on('schouder', 1, 0.3), 18); gewrichtStip(ctx, AP(-0.88, 1.55), C.goud, q.on('schouder', 1, 0.3), 18);
    gewrichtStip(ctx, AP(1.03, 2.87), C.teal, q.on('elleboog', 1, 0.3), 18); gewrichtStip(ctx, AP(-1.03, 2.87), C.teal, q.on('elleboog', 1, 0.3), 18); gewrichtStip(ctx, AP(0.31, 5.25), C.teal, q.on('knie', 1, 0.3), 18); gewrichtStip(ctx, AP(-0.31, 5.25), C.teal, q.on('knie', 1, 0.3), 18);
    const k = ramp(t, 0.6, 0.6) * UIT(t, q.at('elleboog') - 0.2, 0.6); gewrichtDoorsnede(ctx, 1250, 440, 52, { draai: 0.45 * Math.sin(t * 1.6), a: k }); naamBij(ctx, 'kogelgewricht', 'kop in een kom: alle kanten op', 1250, 160, k * q.on('kogelgewricht', 1, 0.4), 'center', C.goud);
    const s2 = q.on('elleboog', 1, 0.6); armAnatomie(ctx, 1080, 150, 10, { u: 0.05, e: 0.9 + 0.7 * Math.sin(t * 1.8), spieren: 0, a: s2 }); deur(ctx, 1560, 640, 330, 0.7 + 0.6 * Math.sin(t * 1.8), q.on('deur', 1, 0.4));
    naamBij(ctx, 'scharniergewricht', 'alleen buigen en strekken', 1350, 800, s2 * q.on('scharniergewrichten', 1, 0.4), 'center', C.teal); }
});

// ---------- Hoofdstuk 2 · Trekken of duwen?
function modelGroot(ctx, o) { return armModel(ctx, 700, 560, 12, Object.assign({ statief: 872 }, o)); }
function emgArm(ctx, t, o) { const R = armAnatomie(ctx, 470, 150, 11.5, Object.assign({ huid: 1 }, o)); const pb = R.Up(3.9, 15), pt = R.Up(-4.4, 15);
  plakker(ctx, pb[0], pb[1], 14); if (o.plakT !== 0) { ctx.save(); ctx.globalAlpha *= o.plakT == null ? 1 : o.plakT; plakker(ctx, pt[0], pt[1], 14); ctx.restore(); } return R; }
function tafelblad(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#4A5874'; ctx.fillRect(x, y, w, 18); ctx.fillRect(x + w - 24, y + 18, 14, 120); ctx.restore(); }
Object.assign(SCENES, {
  s13(ctx, t, q) { bg(ctx, 'schema'); const kl = UIT(t, q.at('Waar') - 0.3, 0.7);
    if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; lokaal(ctx, t, { last: null, emg: 0.03, samX: 1500, plakT: 0, armE: 1.3 }); armModel(ctx, 1000, 452, 4.6, { e: 0.15, statief: 600, a: q.on('armmodel', 1, 0.4) }); ctx.restore(); }
    const g = ramp(t, q.at('Waar') - 0.3, 0.7); if (g < 0.01) return;
    const e = lerp(0.3, 1.55, (t - q.at('omhoog') + 0.9) / 1.4); ctx.save(); ctx.globalAlpha *= g;
    const M = modelGroot(ctx, { e, trekV: q.on('trekt', 1, 0.3) * UIT(t, q.at('omhoog') + 0.6), hlV: q.on('voorkant', 1, 0.3) });
    naamBij(ctx, 'latje = bot', null, M.boven[0] + 60, M.boven[1] - 120, 1, 'left'); naamBij(ctx, 'scharnier = gewricht', null, M.scharnier[0] - 50, M.scharnier[1] + 10, 1, 'right');
    naamBij(ctx, 'touwtje = spier', null, M.oogV[0] + 50, M.oogV[1] + 130, 1, 'left'); ring(ctx, M.hechtV[0], M.hechtV[1], 22, q.on('pees', 1, 0.4) * UIT(t, q.at('Noor') - 0.2));
    naamBij(ctx, 'hier: pees', null, M.hechtV[0] + 40, M.hechtV[1] + 50, q.on('pees', 1, 0.4) * UIT(t, q.at('Noor') - 0.2), 'left', C.goud);
    const ar = q.on('arm', 2, 0.6) * UIT(t, q.at('Noor') - 0.2); if (ar > 0.01) { const R = armAnatomie(ctx, 1450, 140, 10.5, { u: 0.08, e: 1.4, huid: 1, a: ar, hl: { biceps: 0 } }); ring(ctx, R.bicepsPees[0], R.bicepsPees[1], 20, ar * q.on('pees', 1, 0.4)); naamBij(ctx, 'pees', 'wit, taai koord: spier aan bot', R.bicepsPees[0] + 30, R.bicepsPees[1] + 60, ar * q.on('pees', 1, 0.4), 'left', C.goud); }
    tag(ctx, 'trekken', M.ringV[0] + 40, M.ringV[1] - 30, C.goud, q.on('trekt', 1, 0.4), 'left', 30); ctx.restore(); },
  s14(ctx, t, q) { bg(ctx, 'schema'); const M = modelGroot(ctx, { e: 1.55 }); const d = q.on('duwt', 1, 0.4);
    if (d > 0.01) { pijl(ctx, M.ringV[0], M.ringV[1] - 110, M.ringV[0], M.ringV[1] - 20, C.koraal, d, 5, 18); tag(ctx, 'duwen', M.ringV[0] + 40, M.ringV[1] - 60, C.koraal, d, 'left', 30); }
    vraagteken(ctx, M.hand[0] + 60, M.hand[1] + 20, q.on('onderarm', 1, 0.4), 120); },
  s16(ctx, t, q) { bg(ctx, 'schema'); const terug = ramp(t, q.at('achterkant') - 1.6, 1.6); const e = lerp(1.55, 0.3, terug);
    const M = modelGroot(ctx, { e, knikV: q.on('knikt', 1, 0.5) * (1 - terug), trekA: q.on('trekt', 1, 0.3), hlA: q.on('achterkant', 1, 0.3) });
    const k1 = UIT(t, q.at('Om') - 0.3); tag(ctx, 'duwen', M.ringV[0] + 40, M.ringV[1] - 60, C.koraal, k1, 'left', 30); kruis(ctx, M.ringV[0] + 200, M.ringV[1] - 76, 22, q.on('duwen', 1, 0.3) * k1);
    naamBij(ctx, 'blijft gebogen', null, M.hand[0] + 30, M.hand[1] + 70, q.on('gebogen', 1, 0.4) * k1, 'left');
    chipLijst(ctx, [['met een touw kun je niet duwen', q.on('touw', 2, 0.4), C.koraal], ['een spier kan alleen korter worden', q.on('korter', 1, 0.4), C.teal], ['een spier kan alleen trekken', q.on('dus', 1, 0.4), C.goud]], 1180, 300, 110, 32);
    tag(ctx, 'trekken', 440, M.ringA[1], C.teal, q.on('trekt', 1, 0.4), 'right', 30); },
  s17(ctx, t, q) { bg(ctx, 'schema'); const strek = ramp(t, q.at('triceps') + 1.5, 1.6), e = lerp(1.6, 0.65, strek);
    const R = armAnatomie(ctx, 600, 150, 12, { u: 0.06, e, huid: 1, hl: { biceps: q.on('biceps', 1, 0.4) * (1 - strek), triceps: q.on('triceps', 1, 0.4) } });
    const b = q.on('biceps', 1, 0.4) * UIT(t, q.at('Ze') - 0.2), tr = q.on('triceps', 1, 0.4);
    naamBij(ctx, 'biceps', null, R.biceps[0] + 40, R.biceps[1] - 20, b, 'left', C.goud); naamBij(ctx, 'buigspier', null, R.biceps[0] + 40, R.biceps[1] + 26, q.on('buigspier', 1, 0.4) * UIT(t, q.at('Ze') - 0.2), 'left', C.goud);
    ring(ctx, R.bicepsPees[0], R.bicepsPees[1], 22, q.on('pees', 1, 0.4) * UIT(t, q.at('buigspier'))); naamBij(ctx, 'pees vóór de elleboog', null, R.bicepsPees[0] + 40, R.bicepsPees[1] + 60, q.on('vóór', 1, 0.4) * UIT(t, q.at('achterkant') - 0.3), 'left');
    naamBij(ctx, 'triceps', null, R.triceps[0] - 40, R.triceps[1] - 20, tr, 'right', C.goud); naamBij(ctx, 'strekspier', null, R.triceps[0] - 40, R.triceps[1] + 26, q.on('strekspier', 1, 0.4), 'right', C.goud);
    ring(ctx, R.olecranon[0], R.olecranon[1], 22, q.on('pees', 2, 0.4) * UIT(t, q.at('strekspier'))); naamBij(ctx, 'pees achter de elleboog', null, R.olecranon[0] - 40, R.olecranon[1] + 60, q.on('achter', 2, 0.4) * UIT(t, q.at('Ze') - 0.2), 'right');
    tag(ctx, 'antagonisten: tegengestelde bewegingen', 1300, 820, C.goud, q.on('antagonisten', 1, 0.4), 'center', 32); },
  s18(ctx, t, q) { bg(ctx, 'schema'); const fase2 = ramp(t, q.at('legt'), 0.8), str = ramp(t, q.at('strekt'), 0.9);
    const R = emgArm(ctx, t, { u: lerp(0.05, 0.3, str), e: lerp(1.5, 0.75, str), plakT: q.on('plakker', 1, 0.4), hl: { biceps: q.on('schiet', 1, 0.3) * (1 - fase2) } });
    tafelblad(ctx, R.hand[0] - 300, R.hand[1] - 70, 520, q.on('tafel', 1, 0.4) * (1 - fase2)); pijl(ctx, R.hand[0] + 10, R.hand[1] - 10, R.hand[0] + 10, R.hand[1] - 60, C.goud, q.on('tillen', 1, 0.3) * (1 - fase2), 5, 16);
    if (fase2 > 0.01) tafelblad(ctx, R.hand[0] - 300, R.hand[1] + 26, 520, fase2);
    const bic = (1 - fase2) * lerp(0.05, 0.7, (t - q.at('schiet')) / 0.5) + fase2 * 0.05; const verb = ramp(t, q.at('legt'), 0.5);
    emgPaneel(ctx, 1220, 110, 620, { t, bic, tri: 0.03, triA: q.on('plakker', 1, 0.4), verbergB: verb, verbergT: verb, vraagA: q.on('Welke', 1, 0.4), hlB: q.on('schiet', 1, 0.3) * (1 - fase2) }); },
  s20(ctx, t, q) { bg(ctx, 'schema'); const R = emgArm(ctx, t, { u: 0.3, e: 0.75, hl: { triceps: q.on('triceps', 1, 0.4) } }); tafelblad(ctx, R.hand[0] - 300, R.hand[1] + 26, 520, 1);
    emgPaneel(ctx, 1220, 110, 620, { t, bic: 0.04, tri: 0.7, verbergB: UIT(t, q.at('biceps'), 0.5), verbergT: UIT(t, q.at('triceps'), 0.5), hlT: q.on('triceps', 1, 0.3) });
    pijl(ctx, R.hand[0] + 20, R.hand[1] - 80, R.hand[0] + 20, R.hand[1] - 10, C.koraal, q.on('duwt', 1, 0.3), 5, 16); tag(ctx, 'hand duwt', R.hand[0] + 50, R.hand[1] - 50, C.koraal, q.on('duwt', 1, 0.3), 'left', 28);
    const tp = R.Up(-2.6, 27), tq = R.Up(-2.6, 15); pijl(ctx, tp[0] - 30, tp[1], tq[0] - 30, tq[1], C.goud, q.on('trekt', 1, 0.3), 5, 16); tag(ctx, 'triceps trekt', tp[0] - 70, tp[1] + 10, C.goud, q.on('trekt', 1, 0.3), 'right', 28); },
  s21(ctx, t, q) { bg(ctx, 'schema'); const kort = ramp(t, q.at('millimeter'), 1.2); const R = armAnatomie(ctx, 420, 160, 16, { u: 0.06, e: lerp(1.2, 1.4, kort), huid: 1, hl: { biceps: kort } });
    const z = ramp(t, 0.2, 0.7); zoomCircle(ctx, 1350, 400, 260, R.bicepsPees[0], R.bicepsPees[1], 'PEES · VERGROOT', z, () => { bg(ctx, 'micro');
      const rek = q.on('rekt', 2, 0.6) * UIT(t, q.at('Elke'), 0.6) * 0.03; ctx.lineCap = 'round';
      for (let i = 0; i < 26; i++) { const y = 400 - 270 + i * 22; ctx.strokeStyle = i % 3 ? Z9.pees : Z9.peesR; ctx.lineWidth = 9; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const x = 1000 + k * 15 * (1 + rek); const yy = y + Math.sin(k * 0.8 + i) * 2.5 * (1 - rek * 20); k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } });
    naamBij(ctx, 'collageenvezels', 'naast elkaar, in de trekrichting', 1350, 745, q.on('collageenvezels', 1, 0.4), 'center');
    const p = q.on('trekt', 1, 0.4); pijl(ctx, 1650, 380, 1790, 380, C.goud, p, 5, 18); pijl(ctx, 1650, 440, 1790, 440, C.goud, p, 5, 18); if (p > 0.01) { ctx.save(); ctx.globalAlpha *= p; metaText(ctx, 'TREKRICHTING', 1720, 345, C.goud, 'center', 20); ctx.restore(); }
    tag(ctx, 'rekt bijna niet uit', 1350, 100, C.teal, q.on('rekt', 2, 0.4) * UIT(t, q.at('Elke')), 'center', 28);
    tag(ctx, 'het bot gaat meteen mee', R.hand[0] + 40, R.hand[1], C.goud, q.on('meteen', 1, 0.4), 'left', 28); }
});

// ---------- Hoofdstuk 3 · Schuiven, niet krimpen
function spierIcoon(ctx, x, y, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; z9Pees(ctx, [[x, y - h / 2 - 40], [x, y - h / 2 + 10]], 14, 1); z9Pees(ctx, [[x, y + h / 2 - 10], [x, y + h / 2 + 40]], 14, 1);
  ctx.beginPath(); ctx.ellipse(x, y, h * 0.23, h / 2, 0, 0, 6.283); shape(ctx, Z9.spier, Z9.spierL, 2); ctx.strokeStyle = rgba(Z9.spierL, 0.5); ctx.lineWidth = 1.5; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(x, y, h * 0.03 * Math.abs(k) + 2, h / 2 - 6, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }
function bundelDwars(ctx, cx, cy, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, cx, cy, r, rgba(Z9.pees, 0.3), Z9.peesR, 3);
  const P = [[0, 0], [0.5, 0.1], [-0.45, 0.25], [0.1, -0.52], [-0.3, -0.42], [0.45, -0.38], [0.05, 0.55], [-0.55, -0.05], [0.55, 0.45], [-0.25, 0.6]]; P.forEach(([u, v], i) => { const rr = r * (0.2 + 0.04 * hash(i)); circ(ctx, cx + u * r, cy + v * r, rr, rgba(BIO.spier, 0.8), Z9.pees, 3); for (let k = 0; k < 7; k++) circ(ctx, cx + u * r + (hash(i * 9 + k) - 0.5) * rr * 1.2, cy + v * r + (hash(i * 7 + k) - 0.5) * rr * 1.2, rr * 0.18, rgba(Z9.spierL, 0.6)); }); ctx.restore(); }
function koppenCyclus(t, q, s, ev) { const vast = ramp(t, ev.p1, 0.4) * (1 - ramp(t, ev.l1, 0.4)) + ramp(t, ev.p2, 0.4), s1 = ramp(t, ev.k1, 0.9), s2 = ramp(t, ev.k2, 0.9);
  return { vast, hoek: s1 - ramp(t, ev.l1 + 0.5, 0.5) + s2, actX: -(s1 + s2) * 1.4 * s }; }
function vierStanden(ctx, actief, a = 1) { if (a <= 0.01) return; ['1 · binden', '2 · krachtslag', '3 · loslaten', '4 · opnieuw spannen'].forEach((s2, i) => tag(ctx, s2, 330 + i * 420, 120, i === actief ? C.goud : C.line, a * (i === actief ? 1 : 0.55), 'center', 26)); }
function vliegChip(ctx, s2, van, naar, u, kleur, a = 1) { if (a <= 0.01 || u <= 0) return; const p = [lerp(van[0], naar[0], ease(u)), lerp(van[1], naar[1], ease(u)) - Math.sin(Math.min(1, u) * 3.14) * 40]; tag(ctx, s2, p[0], p[1], kleur, a, 'center', 30); }
Object.assign(SCENES, {
  s22(ctx, t, q) { bg(ctx, 'schema'); const m = ramp(t, 0, 0.6) * UIT(t, q.at('bestaat') - 0.5, 0.6);
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.save(); ctx.beginPath(); ctx.arc(960, 430, 330, 0, 6.283); ctx.clip(); ctx.fillStyle = '#E8D9E2'; ctx.fillRect(600, 80, 720, 720);
      for (let k = 0; k < 12; k++) { ctx.save(); ctx.translate(960, 430); ctx.rotate(-0.12); spierVezel(ctx, -420, -330 + k * 58, 840, 50, { seed: k + 1, streep: 9 }); ctx.restore(); } ctx.restore();
      ctx.beginPath(); ctx.arc(960, 430, 330, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke(); metaText(ctx, 'PREPARAAT · GEKLEURD · ± 400 ×', 960, 810, C.grain, 'center', 22); ctx.restore(); }
    const A = q.on('spier', 2, 0.5), B = q.on('spierbundels', 1, 0.5), Cc = q.on('spiervezels', 1, 0.5), V = q.on('cel', 1, 0.5);
    spierIcoon(ctx, 250, 380, 420, A); naamBij(ctx, 'spier', null, 330, 180, A, 'left');
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(250, 380); ctx.lineTo(760, 190); ctx.moveTo(250, 380); ctx.lineTo(760, 570); ctx.stroke(); ctx.restore(); }
    bundelDwars(ctx, 760, 380, 190, B); naamBij(ctx, 'spierbundels', 'in doorsnede', 760, 640, B, 'center');
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(760, 380); ctx.lineTo(1330, 170); ctx.moveTo(760, 380); ctx.lineTo(1330, 590); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(1330, 380, 210, 0, 6.283); ctx.clip(); bg(ctx, 'micro'); spierDwars(ctx, 1330, 380, 205, { n: 46, a: Cc }); ctx.restore(); }
    naamBij(ctx, 'spiervezels', null, 1330, 640, Cc, 'center');
    if (V > 0.01) { spierVezel(ctx, 140, 790, 1640, 60, { a: V, seed: 3 }); const d = ramp(t, q.at('ontstond'), 0.5) * UIT(t, q.at('samensmolten') + 0.2, 0.8);
      if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = C.text; ctx.lineWidth = 3; for (let k = 1; k < 8; k++) { const x = 140 + k * 205; ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x, 820); ctx.stroke(); } ctx.restore(); }
      naamBij(ctx, 'spiervezel: één lange cel', null, 140, 735, V * UIT(t, q.at('haar') - 0.3), 'left'); naamBij(ctx, 'kernen', null, 700, 735, q.on('kernen', 1, 0.4) * UIT(t, q.at('haar') - 0.3), 'left', C.paars);
      tag(ctx, 'zo dik als een haar', 400, 720, C.teal, q.on('haar', 1, 0.4), 'left', 28); tag(ctx, 'soms wel 30 cm lang', 1780, 720, C.teal, q.on('dertig', 1, 0.4), 'right', 28); } },
  s23(ctx, t, q) { bg(ctx, 'schema'); spierVezel(ctx, 160, 160, 1600, 90, { seed: 5 }); naamBij(ctx, 'spiervezel', null, 160, 100, 1, 'left');
    const f = q.on('myofibrillen', 1, 0.6); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(900, 205); ctx.lineTo(300, 290); ctx.moveTo(1000, 205); ctx.lineTo(1620, 290); ctx.stroke(); ctx.restore();
      for (let k = 0; k < 4; k++) myofibril(ctx, 300, 320 + k * 52, 1320, 40, 100, { a: f, hlIdx: k === 1 ? 2 : -1 }); naamBij(ctx, 'myofibrillen', null, 1640, 340, f, 'left'); }
    const e = q.on('eiwitdraden', 1, 0.6); if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(550, 392); ctx.lineTo(670, 590); ctx.moveTo(800, 392); ctx.lineTo(1250, 590); ctx.stroke(); ctx.restore();
      const S = sarcomeer(ctx, 960, 720, 230, { L: 2.5, rijen: 2, dz: 0.42, a: e, hl: { actine: t > q.at('myosine') ? 0.3 : 1, myosine: t > q.at('actine') && t < q.at('myosine') ? 0.3 : 1 } });
      naamBij(ctx, 'actine', 'dun', S.zL[0] - 30, S.actYs[0] + 6, q.on('actine', 1, 0.4), 'center', C.teal); naamBij(ctx, 'myosine', 'dik', 960, S.actYs[S.actYs.length - 1] + 48, q.on('myosine', 1, 0.4), 'center', C.oker); }
    tag(ctx, 'licht en donker: de streepjes', 1560, 720, C.goud, q.on('streepjes', 1, 0.4), 'center', 28); },
  s24(ctx, t, q) { bg(ctx, 'micro'); const S = sarcomeer(ctx, 960, 430, 300, { L: 2.5, rijen: 3, dz: 0.5 }); const k = q.on('korter', 1, 0.4);
    pijl(ctx, S.zL[0] - 120, 430, S.zL[0] - 20, 430, C.goud, k, 6, 20); pijl(ctx, S.zR[0] + 120, 430, S.zR[0] + 20, 430, C.goud, k, 6, 20); tag(ctx, 'korter', 960, 160, C.goud, k, 'center', 30); vraagteken(ctx, 960, 760, q.on('Hoe', 1, 0.4), 110); },
  s26(ctx, t, q) { bg(ctx, 'micro'); const f2 = ramp(t, q.at('myosinedraden') - 0.4, 0.8), duiz = ramp(t, q.at('Duizenden'), 2.4);
    const L = t < q.at('myosinedraden') ? lerp(2.5, 2.0, (t - 0.5) / 2.4) : lerp(2.5, 2.0, duiz);
    const sx = lerp(960, 400, f2), sy = lerp(330, 200, f2), ss = lerp(280, 140, f2), S = sarcomeer(ctx, sx, sy, ss, { L, rijen: 2, dz: 0.5, kop: t * 0.6 });
    const m = UIT(t, q.at('myosinedraden') - 0.4, 0.5); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; const y1 = S.actYs[0] - 26, y2 = S.ys[S.ys.length - 1] + 70; ctx.strokeStyle = C.goud; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(S.zL[0], y1); ctx.lineTo(S.zL[0] + 1.0 * ss, y1); ctx.moveTo(sx - 0.8 * ss, y2); ctx.lineTo(sx + 0.8 * ss, y2); ctx.stroke(); text(ctx, 'actine: even lang', S.zL[0] + 0.5 * ss, y1 - 14, fTekst(26, 700), C.teal, 'center'); text(ctx, 'myosine: even lang', sx, y2 + 36, fTekst(26, 700), C.oker, 'center');
      const sv = q.on('schuiven', 1, 0.4); pijl(ctx, S.zL[0] + 30, S.actYs[1], S.zL[0] + 150, S.actYs[1], C.goud, sv, 5, 16); pijl(ctx, S.zR[0] - 30, S.actYs[1], S.zR[0] - 150, S.actYs[1], C.goud, sv, 5, 16); ctx.restore(); }
    if (f2 > 0.01) { const s = 75, K = koppenCyclus(t, q, s, { p1: q.at('pakt'), k1: q.at('kantelt'), l1: q.at('los'), p2: q.at('pakt', 2), k2: q.at('weer') });
      const R = kopStand(ctx, 1060, 600, s, { a: f2, hoek: K.hoek, vast: K.vast, actX: K.actX, hl: q.on('koppen', 1, 0.3) }); metaText(ctx, 'ÉÉN MYOSINEKOP · VERGROOT', 1060, 160 + 120, C.grain, 'center', 22);
      naamBij(ctx, 'kop', null, R.kop[0] - 60, R.kop[1] + 20, q.on('koppen', 1, 0.4), 'right', C.goud); naamBij(ctx, 'actine', null, 1060 + 9 * s + 20, 600 - 1.6 * s, f2, 'left', C.teal); naamBij(ctx, 'myosine', null, 1060 + 9 * s + 20, 600 + 1.6 * s, f2, 'left', C.oker);
      tag(ctx, 'pakt vast', 640, 820, C.goud, q.on('pakt', 1, 0.3) * UIT(t, q.at('kantelt')), 'center', 28); tag(ctx, 'kantelt: actine schuift mee', 640, 820, C.goud, q.on('kantelt', 1, 0.3) * UIT(t, q.at('Dan')), 'center', 28);
      tag(ctx, 'laat los, pakt verderop vast', 640, 820, C.goud, q.on('Dan', 1, 0.3) * UIT(t, q.at('Duizenden')), 'center', 28); } },
  s27(ctx, t, q) { bg(ctx, 'micro'); const s = 75, los = ramp(t, q.at('los'), 0.4), sp = ramp(t, q.at('spant'), 0.6), aan = ramp(t, q.at('ATP') - 0.9, 0.9);
    const R = kopStand(ctx, 960, 560, s, { hoek: 1 - sp, vast: 1 - los, actX: -1.4 * s, chip: aan >= 1 ? (sp > 0.5 ? 'ADP+P' : 'ATP') : null });
    if (aan > 0 && aan < 1) vliegChip(ctx, 'ATP', [1700, 260], [R.kop[0] + 2.4 * s + 40, R.kop[1] + 1.0 * s - 14], aan, C.groen);
    tag(ctx, 'met ATP laat de kop los', 960, 840, C.groen, q.on('los', 1, 0.3) * UIT(t, q.at('spant') + 0.8), 'center', 28); tag(ctx, 'en spant zich opnieuw', 960, 840, C.groen, q.on('spant', 1, 0.3) * UIT(t, q.at('werkende')), 'center', 28);
    const mt = q.on('nieuw', 1, 0.5); if (mt > 0.01) { mitochondrion(ctx, 1560, 220, 300, -0.15, mt, 6, t); for (let k = 0; k < 3; k++) { const u = ((t - q.at('nieuw')) * 0.35 + k / 3) % 1; vliegChip(ctx, 'ATP', [1520, 260], [1150, 420], u, C.groen, mt * (1 - u * 0.6)); }
      naamBij(ctx, 'mitochondrium', 'maakt ATP', 1560, 380, q.on('mitochondriën', 1, 0.4), 'center'); } },
  s28(ctx, t, q) { bg(ctx, 'micro'); const p1 = UIT(t, q.at('rust') - 0.3, 0.6);
    if (p1 > 0.01) { const S = sarcomeer(ctx, 960, 380, 300, { L: 2.0, rijen: 2, dz: 0.5, a: p1 }); ctx.save(); ctx.globalAlpha *= p1;
      naamBij(ctx, 'Z-lijn', null, S.zL[0], S.zL[1] - 30, q.on('Z-lijnen', 1, 0.4), 'center', C.text); naamBij(ctx, 'Z-lijn', null, S.zR[0], S.zR[1] - 30, q.on('Z-lijnen', 1, 0.4), 'center', C.text);
      haak(ctx, S.zL[0], S.zR[0], 650, 'sarcomeer · ± 2 µm', C.goud, q.on('sarcomeer', 1, 0.4)); ctx.restore(); }
    const p2 = q.on('rust', 1, 0.6); if (p2 < 0.01) return; const s = 70, x0 = 260, y0 = 600;
    const D = actineDetail(ctx, x0, y0, 1400, s, { a: p2, ca: ramp(t, q.at('troponine') - 0.6, 0.6), schuif: ramp(t, q.at('schuift'), 1.2) });
    naamBij(ctx, 'actine', null, x0 - 20, y0 + 8, p2, 'right', C.teal); naamBij(ctx, 'tropomyosine', null, 1690, y0 - 40, q.on('tropomyosine', 1, 0.4), 'left', C.paars);
    const pl = q.on('plekken', 1, 0.4) * UIT(t, q.at('impuls') - 0.2); for (let k = 3; k < 32; k += 6) ring(ctx, x0 + k * 0.62 * s, y0 + 0.3 * s, 16, pl);
    naamBij(ctx, 'bindplekken voor myosine', null, x0 + 3 * 0.62 * s, y0 + 90, pl, 'center');
    naamBij(ctx, 'troponine', null, D.troponine[0], D.troponine[1] - 60, q.on('troponine', 1, 0.4), 'center', C.paars);
    const r = q.on('impuls', 1, 0.6); reticulum(ctx, x0, 290, 1400, 90, { a: r, ca: ramp(t, q.at('vrijkomen') - 0.3, 1.2), terug: 0, t });
    naamBij(ctx, 'sarcoplasmatisch reticulum', 'slaat calcium op', 960, 165, q.on('sarcoplasmatisch', 1, 0.4), 'center'); tag(ctx, 'calciumionen', 1700, 300, Z9.ca, q.on('calciumionen', 1, 0.4), 'right', 26);
    const ca2 = ramp(t, q.at('Calcium', 2) - 0.2, 0.9); if (ca2 > 0.01 && ca2 < 1) for (let k = 3; k < 32; k += 6) { const bx = x0 + (k + 1.5) * 0.62 * s + 0.25 * s; circ(ctx, bx, lerp(360, y0 - 0.5 * s, ca2), 0.17 * s, Z9.ca); }
    const kb = ramp(t, q.at('myosinekop') - 0.3, 0.8); if (kb > 0.01) { ctx.save(); ctx.globalAlpha *= kb; roundRect(ctx, x0 + 40, y0 + 3.2 * s, 1320, 0.8 * s, 0.4 * s); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1.5); ctx.restore(); naamBij(ctx, 'myosine', null, x0 + 1380, y0 + 3.9 * s, kb, 'left', C.oker); for (let k = 3; k < 32; k += 6) { const bx = x0 + k * 0.62 * s, by = lerp(y0 + 2.6 * s, y0 + 0.95 * s, kb); ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.3 * s; ctx.beginPath(); ctx.moveTo(bx, y0 + 3.4 * s); ctx.lineTo(bx, by); ctx.stroke(); circ(ctx, bx, by, 0.45 * s, lighten(Z9.myosine, 0.15), Z9.myosine, 1.5); } }
    naamBij(ctx, 'kruisbrug', null, x0 + 9 * 0.62 * s + 60, y0 + 2.2 * s, q.on('kruisbrug', 1, 0.4), 'left', C.goud); },
  s29(ctx, t, q) { bg(ctx, 'micro'); const s = 70, stop = ramp(t, q.at('Stopt') - 0.2, 0.6);
    const bind = ramp(t, q.at('bindt'), 0.4), los = ramp(t, q.at('los', 3) - 0.5, 0.4), klap = ramp(t, q.at('klapt'), 0.8), span = ramp(t, q.at('spant'), 0.6);
    let chip = 'ADP + P'; if (t > q.at('fosfaat', 2) + 0.3) chip = 'ADP'; if (t > q.at('ADP', 2) + 0.3) chip = null; if (t > q.at('ATP', 1) + 0.3) chip = 'ATP'; if (t > q.at('splitst') + 0.3) chip = 'ADP + P';
    const R = kopStand(ctx, 960, 470, s, { a: 1 - 0.65 * stop, hoek: klap * (1 - span), vast: bind * (1 - los), actX: -klap * 1.4 * s, chip });
    const pv = (t - q.at('fosfaat', 2) - 0.3) / 1.2; if (pv > 0 && pv < 1) vliegChip(ctx, 'P', [R.kop[0] + 2.4 * s + 60, R.kop[1] + s - 14], [1700, 300], pv, C.oker, 1 - pv);
    const av = (t - q.at('ADP', 2) - 0.3) / 1.2; if (av > 0 && av < 1) vliegChip(ctx, 'ADP', [R.kop[0] + 2.4 * s + 60, R.kop[1] + s - 14], [1700, 300], av, C.oker, 1 - av);
    const iv = (t - q.at('ATP', 1) + 0.9) / 1.2; if (iv > 0 && iv < 1) vliegChip(ctx, 'ATP', [1700, 300], [R.kop[0] + 2.4 * s + 60, R.kop[1] + s - 14], iv, C.groen);
    let st = -1; if (t > q.at('bindt')) st = 0; if (t > q.at('klapt')) st = 1; if (t > q.at('los', 3) - 0.5) st = 2; if (t > q.at('splitst')) st = 3; vierStanden(ctx, st, 1 - stop);
    tag(ctx, 'krachtslag', 960, 230, C.goud, q.on('krachtslag', 1, 0.3) * UIT(t, q.at('Daarna')), 'center', 30);
    const rt = stop * UIT(t, q.at('ontspant') + 0.4, 0.6); reticulum(ctx, 260, 730, 1400, 80, { a: rt, ca: 1, terug: ramp(t, q.at('pompt'), 1.6), t }); naamBij(ctx, 'reticulum pompt calcium terug', null, 960, 650, rt, 'center');
    tag(ctx, 'kost ook ATP', 1660, 650, C.groen, q.on('ATP', 3, 0.3) * rt, 'right', 26);
    const sr = q.on('ontspant', 1, 0.6); if (sr > 0.01) { const S = sarcomeer(ctx, 960, 740, 190, { L: lerp(2.0, 2.5, ramp(t, q.at('langer'), 1.5)), rijen: 2, dz: 0.45, a: sr });
      const pr = q.on('langer', 1, 0.4); pijl(ctx, S.zL[0] - 20, 740, S.zL[0] - 130, 740, C.teal, pr, 6, 18); pijl(ctx, S.zR[0] + 20, 740, S.zR[0] + 130, 740, C.teal, pr, 6, 18); tag(ctx, 'de strekspier trekt hem weer uit', 960, 620, C.teal, q.on('strekspier', 1, 0.4), 'center', 26); } },
  s30(ctx, t, q) { bg(ctx, 'micro'); const s = 75; kopStand(ctx, 960, 480, s, { hoek: 1, vast: 1, actX: -1.4 * s });
    const z = q.on('Zonder', 1, 0.4); tag(ctx, 'ATP', 1300, 300, C.groen, z, 'center', 34); kruis(ctx, 1300, 285, 40, z);
    tag(ctx, 'zonder ATP blijft de kop vastzitten', 960, 200, C.koraal, q.on('vastzitten', 1, 0.4), 'center', 30); tag(ctx, 'na de dood: het lichaam wordt stijf', 960, 820, C.text2, q.on('stijf', 1, 0.4), 'center', 28); }
});

// ---------- Hoofdstuk 4 · Wat de plakkers meten
function eenheidFan(ctx, soma, pts, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 2; ctx.lineCap = 'round';
  const mx = pts.reduce((s2, p) => s2 + p[0], 0) / pts.length, my = pts.reduce((s2, p) => s2 + p[1], 0) / pts.length, tak = [lerp(soma[0], mx, 0.45), lerp(soma[1], my, 0.45)];
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(soma[0], soma[1]); ctx.lineTo(tak[0], tak[1]); ctx.stroke(); ctx.lineWidth = 1.5; for (const p of pts) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
  for (const p of pts) { ctx.save(); ctx.translate(p[0], p[1]); roundRect(ctx, -3, -12, 6, 24, 3); shape(ctx, Z9.spier, Z9.spierL, 1); ctx.restore(); }
  circ(ctx, soma[0], soma[1], 12, kleur); ctx.restore(); }
const FAN_OOG = [...Array(5)].map((_, i) => [400 + i * 50, 700 + (i % 2) * 18]);
const FAN_KUIT = [...Array(48)].map((_, i) => [1560 + (i % 12) * 24 + (Math.floor(i / 12) % 2) * 12, 560 + Math.floor(i / 12) * 48]);
function oogKuit(ctx, t, q, o) { const { aOog = 1, aKuit = 1, standO = 0.5, standK = 0 } = o;
  oogSchema(ctx, 470, 360, 130, { a: aOog, stand: standO }); eenheidFan(ctx, [300, 600], FAN_OOG, C.goud, aOog);
  kuitSchema(ctx, 1260, 820, 13, { a: aKuit, stand: standK }); eenheidFan(ctx, [1480, 420], FAN_KUIT, C.goud, aKuit); }
let _z9SamHand = [760, 450];
function recapZ9(ctx, t, q, vwo) { lokaal(ctx, t, { last: 'tas', emg: 0.75, aSam: 0, plakT: 0 });
  metaText(ctx, 'VEERTJE', 1400, 100, C.text2, 'left', 20); emgSpoor(ctx, 1390, 112, 470, 100, { niveau: 0.08, t, rooster: false }); metaText(ctx, 'TAS', 1400, 250, C.text2, 'left', 20); emgSpoor(ctx, 1390, 262, 470, 100, { niveau: 0.75, t, rooster: false });
  const L = vwo ? [['bij een zware tas: snellere impulsen', 1, C.paars], ['een rekreflex stuurt bij', q.on('rekreflex', 1, 0.4), C.paars]] : [['een spier kan alleen trekken, via een pees', q.on('trekken', 1, 0.4), C.goud], ['een strekspier trekt de arm recht', q.on('strekspier', 1, 0.4), C.teal], ['actine en myosine schuiven, met ATP', q.on('schuiven', 1, 0.4), C.oker], ['meer motorische eenheden = meer kracht', q.on('eenheden', 1, 0.4), C.goud]];
  if (vwo) L[0][1] = ramp(t, 0, 0.5); L.forEach(([s2, a, col], i) => tag(ctx, s2, 1880, 440 + i * 96, col, a, 'right', 28)); }
Object.assign(SCENES, {
  s31(ctx, t, q) { bg(ctx, 'schema'); huidPlakker(ctx, 120, 300, 760, { t, vuur: q.on('elektrische', 1, 0.4) * UIT(t, q.at('motorische') - 0.3) }); naamBij(ctx, 'plakker', 'op de huid', 500, 200, ramp(t, 0.3, 0.5), 'center'); naamBij(ctx, 'spiervezels', null, 120, 600, q.on('spiervezels', 1, 0.4), 'left');
    const z = q.on('motorische', 1, 0.6); if (z < 0.01) return; const rm = [1520, 190], doel = [1180, 650], c1 = [1500, 420], c2 = [1180, 420];
    ctx.save(); ctx.globalAlpha *= z; ctx.beginPath(); ctx.ellipse(rm[0], rm[1], 110, 70, 0, 0, 6.283); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); metaText(ctx, 'RUGGENMERG', rm[0], rm[1] + 105, C.grain, 'center', 20);
    ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(rm[0], rm[1]); ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], doel[0], doel[1] - 34); ctx.stroke(); circ(ctx, rm[0], rm[1], 14, C.goud); ctx.restore();
    const samen = ramp(t, q.at('geeft') - 0.1, 0.4); spierVezel(ctx, 1000 + 20 * samen, 650, 820 - 40 * samen, 60, { a: z, seed: 9 }); if (samen > 0.01) { ctx.save(); ctx.globalAlpha *= samen * z; roundRect(ctx, 1000 + 20 * samen, 620, 820 - 40 * samen, 60, 30); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    const u = (t - q.at('impuls') + 0.2) / 1.0; if (u > 0 && u < 1) circ(ctx, ...bez(rm, c1, c2, [doel[0], doel[1] - 34], u), 10, '#F2E6B8');
    naamBij(ctx, 'motorische zenuwcel', null, 1350, 470, z, 'left', C.goud); naamBij(ctx, 'ook wel: bewegingszenuwcel', null, 1350, 520, q.on('bewegingszenuwcel', 1, 0.4), 'left', C.text2); },
  s32(ctx, t, q) { bg(ctx, 'micro'); const D = spierDwars(ctx, 1180, 440, 330, { n: 160, eenheden: [{ n: 9, kleur: C.goud }], aan: ramp(t, q.at('samen') - 0.2, 0.5) });
    const P = D.punten(0); eenheidZenuw(ctx, [240, 150], P, C.goud, { a: q.on('vertakt', 1, 0.6), dik: 5, puls: t > q.at('Dan') - 1.2 && t < q.at('Dan') ? 1 - (q.at('Dan') - t) / 1.2 : -1 });
    naamBij(ctx, 'motorische zenuwcel', null, 240, 110, ramp(t, 0, 0.5), 'left', C.goud); for (const p of P) ring(ctx, p[0], p[1], 16, q.on('verspreid', 1, 0.3) * UIT(t, q.at('Elk')));
    tag(ctx, 'verspreid door de spier', 1180, 850, C.goud, q.on('verspreid', 1, 0.4) * UIT(t, q.at('eindplaat') - 0.3), 'center', 28);
    const z = q.on('eindplaat', 1, 0.6); zoomCircle(ctx, 420, 600, 220, P[0][0], P[0][1], 'MOTORISCHE EINDPLAAT · VERGROOT', z, () => { bg(ctx, 'micro'); const g = ramp(t, q.at('samen') - 0.2, 0.5);
      spierVezel(ctx, 180, 700, 480, 110, { seed: 2 }); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; roundRect(ctx, 180, 645, 480, 110, 55); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
      ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(420, 380); ctx.lineTo(420, 590); ctx.stroke(); ctx.beginPath(); ctx.ellipse(420, 612, 90, 26, 0, 0, 6.283); shape(ctx, C.goud, '#B8902E', 2);
      const ach = ramp(t, q.at('acetylcholine') - 0.4, 0.6); for (let i = 0; i < 16; i++) { const u = ((t * 0.8 + hash(i)) % 1); if (ach > 0.01) circ(ctx, 350 + hash(i * 3) * 140, lerp(630, 648, u), 4.5, rgba(C.teal, ach)); } });
    naamBij(ctx, 'acetylcholine', 'signaalstof', 660, 560, q.on('acetylcholine', 1, 0.4), 'left', C.teal);
    tag(ctx, 'hoe het overspringt: film De spleet', 420, 300, C.paars, q.on('spleet', 1, 0.4) * UIT(t, q.at('heten') + 0.6), 'center', 26);
    tag(ctx, 'motorische eenheid = zenuwcel + al zijn vezels', 1180, 80 + 30, C.goud, q.on('eenheid', 1, 0.4), 'center', 30); },
  s33(ctx, t, q) { bg(ctx, 'schema'); const aO = q.on('oog', 1, 0.5), aK = q.on('kuit', 1, 0.5); oogKuit(ctx, t, q, { aOog: aO, aKuit: aK });
    naamBij(ctx, 'oogspier', null, 300, 170, aO, 'center'); naamBij(ctx, 'een paar vezels', 'hooguit enkele tientallen', 520, 800, q.on('paar', 1, 0.4), 'center', C.goud);
    naamBij(ctx, 'kuitspier', null, 1180, 210, aK, 'center'); naamBij(ctx, 'honderden vezels', 'soms wel tweeduizend', 1700, 800, q.on('honderden', 1, 0.4), 'center', C.goud);
    vraagteken(ctx, 960, 470, q.on('Met', 1, 0.4), 130); },
  s35(ctx, t, q) { bg(ctx, 'schema'); const so = t < q.at('beweegt') ? 0.5 : 0.32 + 0.045 * (Math.floor((t - q.at('beweegt')) * 3) % 8), sk = t < q.at('Je', 2) ? 0 : (Math.floor((t - q.at('Je', 2)) * 1.3) % 2);
    oogKuit(ctx, t, q, { standO: so, standK: sk, aKuit: q.on('kuit', 1, 0.3) * 0.7 + 0.3 });
    tag(ctx, 'kleine eenheden: heel kleine stapjes', 520, 820, C.goud, q.on('kleine', 1, 0.4), 'center', 28); tag(ctx, 'grote eenheden: veel kracht, grove stappen', 1500, 150, C.goud, q.on('grote', 1, 0.4), 'center', 28); },
  s36(ctx, t, q) { bg(ctx, 'schema'); const tv = q.at('veertje'), tb = q.at('boek'), tn = q.at('nog'), tt = q.at('tas');
    const last = t >= tt ? 'tas' : t >= tn ? 'boeken' : t >= tb ? 'boek' : t >= tv ? 'veer' : null; const niv = [0.01, 0.08, 0.3, 0.5, 0.78], st = last === 'tas' ? 4 : last === 'boeken' ? 3 : last === 'boek' ? 2 : last === 'veer' ? 1 : 0;
    const aan = clamp(ramp(t, tv + 0.4, 0.6) + ramp(t, tb + 0.2, 0.5) + ramp(t, tn + 0.2, 0.5) + ramp(t, tt + 0.2, 0.6), 0, 4);
    const P = lokaal(ctx, t, { last, emg: niv[st], steun: !last, armE: last ? 1.42 : 1.5, samX: 990, plakT: 0 }); emgPaneel(ctx, 1380, 70, 480, { t, bic: niv[st], triA: 0 });
    if (P.plakBiceps) { zoomCircle(ctx, 960, 230, 165, P.plakBiceps[0], P.plakBiceps[1], null, ramp(t, 0.3, 0.6), () => { bg(ctx, 'micro'); spierDwars(ctx, 960, 230, 155, { n: 110, eenheden: [{ n: 3, kleur: C.goud }, { n: 6, kleur: C.goud }, { n: 12, kleur: C.goud }, { n: 26, kleur: C.goud }], aan }); }); metaText(ctx, 'BICEPS · SCHEMATISCH', 960, 430, C.grain, 'center', 20); }
    tag(ctx, 'meer vezels tegelijk = meer kracht', 1620, 400, C.goud, q.on('hoeveel', 1, 0.4), 'center', 28); },
  s37(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'FREQUENTIE · IMPULSEN PER SECONDE', 960, 170, C.grain, 'center', 24);
    const a1 = q.on('Eén', 1, 0.4), a2 = q.on('volgende', 1, 0.4), a3 = q.on('sneller', 1, 0.4);
    trekGrafiek(ctx, 140, 290, 460, 300, { a: a1, impulsen: 1, prog: ramp(t, q.at('Eén'), 1.6), label: 'één impuls' }); trekGrafiek(ctx, 730, 290, 460, 300, { a: a2, impulsen: 3, tussen: 0.3, prog: ramp(t, q.at('volgende'), 1.8), label: 'impulsen kort na elkaar' });
    trekGrafiek(ctx, 1320, 290, 460, 300, { a: a3, impulsen: 12, tussen: 0.085, prog: ramp(t, q.at('sneller'), 1.8), label: 'nog sneller' });
    tag(ctx, 'de trekkingen tellen op', 960, 760, C.goud, q.on('tellen', 1, 0.4) * UIT(t, q.at('groter')), 'center', 30); tag(ctx, 'hoe sneller de impulsen, hoe groter de kracht', 960, 760, C.goud, q.on('groter', 1, 0.4) * UIT(t, q.at('Bij')), 'center', 30);
    tag(ctx, 'bij de tas: ook snellere impulsen', 960, 760, C.paars, q.on('Bij', 1, 0.4), 'center', 30); },
  s38(ctx, t, q) { bg(ctx, 'schema'); const val = q.at('vallen'), land = val + 0.55, zak = ramp(t, land - 0.05, 0.25) * (1 - ramp(t, q.at('vangt'), 0.8));
    const P = lokaal(ctx, t, { last: 'tas', emg: 0.6, zak, samX: 975, sam: 'wijs', uitN: t > q.at('dicht') - 0.2 ? 'slaapt' : 'neutraal', plakT: 0, valBoek: { inHand: t < val } });
    if (P.sam && P.sam.handR) _z9SamHand = [P.sam.handR.x, P.sam.handR.y];
    const u = (t - val) / 0.55; if (u > 0 && u < 1 && P.hand) { const x = lerp(_z9SamHand[0], P.hand[0] + 4, u), y = lerp(_z9SamHand[1], P.hand[1] + 40, u * u); ctx.save(); ctx.translate(x, y); ctx.rotate(u * 0.8); roundRect(ctx, -36, -8, 72, 15, 3); shape(ctx, '#3E6E5A', '#B08A5C', 1.5); ctx.restore(); }
    if (u > 0.3 && u < 1.6) for (let k = 0; k < 2; k++) pijl(ctx, _z9SamHand[0] + 30 + k * 26, _z9SamHand[1] + 20, _z9SamHand[0] + 30 + k * 26, _z9SamHand[1] + 110, C.koraal, clamp(1.6 - u, 0, 1) * 0.8, 3, 12);
    const bic = 0.45 + 0.5 * ramp(t, land, 0.12) - 0.25 * ramp(t, q.at('vangt'), 1.0);
    emgPaneel(ctx, 1380, 70, 480, { t, bic, triA: 0, verbergB: ramp(t, q.at('Wat') - 0.2, 0.5) }); tag(ctx, 'ogen dicht', 600, 180, C.text2, q.on('dicht', 1, 0.4) * UIT(t, q.at('Sam')), 'center', 26); },
  s40(ctx, t, q) { bg(ctx, 'schema'); const pa = 1;
    const ctxA = UIT(t, q.at('spierspoeltjes') - 0.4, 0.6); if (ctxA > 0.01) { ctx.save(); ctx.globalAlpha *= ctxA; lokaal(ctx, t, { last: 'tas', emg: 0.75, samX: 1060, sam: 'staan', uitN: 'slaapt', plakT: 0, scherm: false }); ctx.restore(); }
    emgPaneel(ctx, 1320, 70, 540, { t, triA: 0, hisB: (u) => u < 0.55 ? 0.35 : u < 0.66 ? 1.0 : 0.6, a: 1 }); if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(1340 + 500 * 0.55, 120); ctx.lineTo(1340 + 500 * 0.55, 290); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'boek valt', 1340 + 500 * 0.55, 360, C.koraal, ramp(t, 0.2, 0.4), 'center', 24); tag(ctx, 'nog voordat Noor iets merkt', 1590, 420, C.goud, q.on('merkt', 1, 0.4), 'center', 26);
    const b = q.on('spierspoeltjes', 1, 0.6); if (b < 0.01) return; const rek = q.on('uitgerekt', 1, 0.8), hard = q.on('harder', 1, 0.4);
    ctx.save(); ctx.globalAlpha *= b; for (let k = 0; k < 7; k++) spierVezel(ctx, 520 - 20 * rek + 10 * hard, 540 + k * 36, 1000 + 40 * rek - 20 * hard, 28, { seed: k + 2, a: 0.8 }); if (hard > 0.01) { ctx.save(); ctx.globalAlpha *= hard; roundRect(ctx, 510, 520, 1020, 250, 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    const Sp = spierspoeltje(ctx, 1000, 640, 520, { rek, vuur: q.on('sensorisch', 1, 0.4), t }); ctx.restore();
    pijl(ctx, 500, 820, 420, 820, C.koraal, rek * UIT(t, q.at('harder')), 5, 16); pijl(ctx, 1540, 820, 1620, 820, C.koraal, rek * UIT(t, q.at('harder')), 5, 16);
    naamBij(ctx, 'spierspoeltje', null, 1300, 800, b, 'left', C.goud); naamBij(ctx, 'zintuigcel', 'meet rek en snelheid', 1180, 455, q.on('zintuigcel', 1, 0.4), 'left', Z9.zenuw);
    const mx = 330, my = 250, van = Sp.zenuw, naar = [640, 560], s1 = q.on('sensorisch', 1, 0.6), m1 = q.on('motorisch', 1, 0.6);
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.beginPath(); ctx.ellipse(mx, my, 120, 90, 0, 0, 6.283); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); metaText(ctx, 'RUGGENMERG', mx, my + 125, C.grain, 'center', 20);
      ctx.lineCap = 'round'; ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.bezierCurveTo(van[0] - 150, van[1] - 200, mx + 300, my - 60, mx + 10, my - 10); ctx.stroke(); ctx.restore(); naamBij(ctx, 'sensorisch neuron', null, 700, 270, s1, 'left', Z9.zenuw);
      const u = (t - q.at('brengt')) / 1.4; if (u > 0 && u < 1) circ(ctx, ...bez(van, [van[0] - 150, van[1] - 200], [mx + 300, my - 60], [mx + 10, my - 10], u), 9, '#F2E6B8'); }
    if (m1 > 0.01) { ctx.save(); ctx.globalAlpha *= m1; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 10, my + 5); ctx.bezierCurveTo(mx + 200, my + 120, naar[0] - 300, naar[1] - 80, naar[0], naar[1]); ctx.stroke(); circ(ctx, mx + 10, my - 3, 9, C.goud); ctx.restore(); naamBij(ctx, 'motorisch neuron', null, 420, 470, m1, 'left', C.goud);
      const u = (t - q.at('motorisch') - 0.3) / 1.2; if (u > 0 && u < 1) circ(ctx, ...bez([mx + 10, my + 5], [mx + 200, my + 120], [naar[0] - 300, naar[1] - 80], naar, u), 9, '#F2E6B8'); }
    tag(ctx, 'zonder schakelneuron', mx, my - 130, C.teal, q.on('schakelneuron', 1, 0.4), 'center', 24); tag(ctx, 'rekreflex', 1080, 120, C.goud, q.on('rekreflex', 1, 0.4), 'center', 36);
    if (q.on('kniepeesreflex', 1, 0.4) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('kniepeesreflex', 1, 0.4); metaText(ctx, 'NET ALS DE KNIEPEESREFLEX', 1080, 170, C.text2, 'center', 20); ctx.restore(); } },
  s41(ctx, t, q) { bg(ctx, 'schema'); recapZ9(ctx, t, q, false); },
  s42(ctx, t, q) { bg(ctx, 'schema'); recapZ9(ctx, t, q, true); }
});

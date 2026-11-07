// Zwanger 1.0 — scènes per alinea (7 nov 2026). Lichte remake, deel 3 van de splitsing van Van bevruchting tot baby.
// Bibliotheek: blastocyste, baarmoederwand, geelLichaam, zwangerschapstest, placentaDoorsnede, vlokVergroot, bioNavelstreng,
// vrouwOrganenVoor (zwanger), buikKijkje, embryoEcht, breinVoor, follikel; eigen (teken_zw.js): zwKind, zwZak, zwGeboorte,
// zwHals, zwMelkklier. Personage zonder naam (Linda, outfit 'zwanger' = 16 jaar geleden; de baby = Noor). Gezichten heel:
// alles van binnen in een zoomcirkel náást het lichaam. Bevalling alleen in doorsnede (Kamiel 7 nov 2026, keuze 3).
function vragenUit() { try { const p = new URLSearchParams(location.search).get('vragen'); if (p) return p === 'uit'; return localStorage.getItem('bk-vragen') === 'uit'; } catch (e) { return false; } }
function fadeIO(t, a, b, d = 0.5) { return ramp(t, a, d) * (1 - ramp(t, b, d)); }
function pill(ctx, x, y, s, col, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + 48;
  roundRect(ctx, x - w / 2, y - px * 0.95, w, px * 1.6, px * 0.8); shape(ctx, rgba('#121A26', 0.85), col, 2); text(ctx, s, x, y + px * 0.2, fTekst(px, 700), col, 'center'); ctx.restore(); }
function micro2(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
function meta2(ctx, s) { metaText(ctx, s, 1880, 880, C.grain, 'right', 22); }
function vt(ctx, x, y, a, px = 120) { if (!vragenUit()) vraagteken(ctx, x, y, a, px); }
function hlabel(ctx, s, x, y, col, a = 1) { if (a <= 0.01) return; hdot(ctx, x, y - 9, col, 11, a); regel(ctx, s, x + 22, y, a, col, 28, 'left', 700); }

// ---- vaste opstellingen ----
const BW = { x: 1180, y: 600, w: 1300, h: 420 }; // baarmoederwand-strook (H1)
function wandMetEmbryo(ctx, t, o = {}) { const { los = 0, zak = 1, a = 1, nest = 1, hlB = 0, x = BW.x, w = BW.w, y = BW.y, h = BW.h, ex = x } = o;
  baarmoederwand(ctx, x, y, w, h, 0.95, { los, t, kronkel: 1, a });
  const yOpp = y + h / 2 - h * 0.42 - h * 0.06 - h * 0.5 * 0.95; const ey = lerp(yOpp - 90, yOpp + 60, ease(zak)) - 230 * ease(los);
  if (a * (1 - los * 0.6) > 0.01) { ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * ease(clamp(los * 1.4 - 0.4, 0, 1))); blastocyste(ctx, ex, ey, 70, { hlB, zona: 0 });
    if (nest > 0.01 && los < 0.05) { ctx.strokeStyle = rgba(C.goud, 0.8 * nest); ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { const an = Math.PI * (0.15 + 0.7 * i / 8); const r0 = 70; const L = 50 * ease(nest) * (0.7 + 0.5 * hash(i)); ctx.beginPath(); ctx.moveTo(ex + Math.cos(an) * r0, ey + Math.sin(an) * r0); ctx.lineTo(ex + Math.cos(an) * (r0 + L), ey + Math.sin(an) * (r0 + L)); ctx.stroke(); } }
    ctx.restore(); }
  return { ex, ey, yOpp }; }
const GL = { x: 330, y: 330, r: 150 }; // geel lichaam (H1)
const VL = { x: 700, y: 480, w: 1000, h: 578, lx: 1260 }; // vlok vergroot (H2); labels rechts ervan op x = VL.lx

Object.assign(SCENES, {
  title(ctx, t) { zwZak(ctx, 1420, 500, 250, { t, week: 22, beweeg: 0.4 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const ka = q.on('Vandaag', 1), sl = q.on('slijmvlies', 1), ni = q.on('niet', 1), kl = q.on('klompje', 1), ho = q.on('Hoe', 1);
    persoon(ctx, 'linda', 430, 880, 640, { outfit: 'zwanger', zwanger: 0, uit: 'neutraal', t, kijk: -1 });
    kalender(ctx, 640, 90, 300, { vandaag: 18, kring: ka }); regel(ctx, 'vandaag: ongesteld?', 790, 460, ka * (1 - ni), C.text, 28, 'center', 600);
    pill(ctx, 790, 460, 'blijft weg', C.goud, ni, 28);
    const b = castBuik('linda', 430, 880, 640, 0, -1);
    zoomCircle(ctx, 1430, 450, 330, b.x - 20, b.y + 10, 'baarmoederwand · vergroot', sl, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1100, 120, 660, 660);
      const w = wandMetEmbryo(ctx, t, { x: 1430, y: 560, w: 700, h: 420, zak: 1, nest: 1, hlB: kl }); });
    naamBij(ctx, 'slijmvlies blijft zitten', null, 1430, 860, ni * (1 - kl), 'center', C.groen);
    naamBij(ctx, 'een piepklein klompje cellen', null, 1430, 860, kl, 'center', C.goud);
    vt(ctx, 1000, 150, ho, 110); },

  // ---------- H1 ----------
  s03(ctx, t, q) { micro2(ctx); const ko = q.on('komt', 1); const x = lerp(300, BW.x, ease(ramp(t, 0.2, 5)));
    baarmoederwand(ctx, BW.x, BW.y + 60, 1920, BW.h, 0.95, { t, kronkel: 1 });
    blastocyste(ctx, x, 300 + 40 * Math.sin(t * 0.8), 90, { zona: 0 });
    pill(ctx, 960, 92, 'dag 5 · holle bal van ± 100 cellen', C.goud, ramp(t, 0.3, 0.6), 30);
    naamBij(ctx, 'slijmvlies van de baarmoeder', null, 200, 640, ko, 'left'); meta2(ctx, 'vergroot'); },

  s04(ctx, t, q) { micro2(ctx); const za = ramp(t, q.at('zakt') - 0.2, 3), ne = q.on('innesteling', 1), bu = q.on('buitenste', 1), he = q.on('helemaal', 1, 1.2);
    const w = wandMetEmbryo(ctx, t, { x: 960, y: BW.y + 60, w: 1920, h: BW.h, zak: za, nest: bu, hlB: bu * (1 - he) });
    if (he > 0.01) { ctx.save(); ctx.globalAlpha *= he; ctx.beginPath(); ctx.moveTo(860, w.yOpp + 4); ctx.quadraticCurveTo(960, w.yOpp - 14, 1060, w.yOpp + 4); ctx.strokeStyle = ZK.slijm; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
    pill(ctx, 960, 92, 'vanaf ± dag 6', C.goud, ramp(t, 0.3, 0.5), 30);
    naamBij(ctx, 'innesteling', null, 1150, 300, ne, 'left', C.goud); naamBij(ctx, 'buitenste cellen groeien het slijmvlies in', null, 1150, 360, bu, 'left');
    meta2(ctx, 'vergroot · ± 0,15 mm'); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const pr = q.on('progesteron', 1), ge = q.on('gele', 1), zo = q.on('Zonder', 1), sterf = ramp(t, q.at('sterft') - 0.2, 3), da = q.on('daalt', 1), lo = ramp(t, q.at('los') - 0.2, 2.5);
    geelLichaam(ctx, GL.x, GL.y, GL.r, { t, leef: 1 - 0.8 * sterf }); naamBij(ctx, 'geel lichaam', 'in de eierstok', GL.x, GL.y + GL.r + 60, ge, 'center', C.goud);
    const pad = [[GL.x + GL.r, GL.y], [800, GL.y], [800, 560], [BW.x - 300, 560]];
    lijnPad(ctx, pad, rgba(ZK.bloedM, 0.6), 10, 0.8); stroomPad(ctx, pad, ZK.P, 7, t, pr * (1 - 0.85 * da), { v: 0.22 }); hlabel(ctx, 'progesteron', 560, GL.y - 30, ZK.P, pr);
    wandMetEmbryo(ctx, t, { x: BW.x + 160, w: 1100, zak: 1, nest: 1, los: lo });
    if (zo > 0.01) { ctx.save(); ctx.globalAlpha *= zo; ctx.setLineDash([16, 12]); roundRect(ctx, 40, 60, 1840, 810, 24); ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      pill(ctx, 960, 92, 'als er geen signaal kwam…', C.koraal, zo, 30); }
    pill(ctx, GL.x, 640, 'na ± 12 dagen', C.koraal, sterf * (1 - lo), 28);
    naamBij(ctx, 'slijmvlies laat los, met het embryo', null, BW.x + 160, 880 - 40, lo, 'center', C.text); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const to = q.on('Toch', 1), hc = q.on('hCG', 1), bl = q.on('bloed', 1), lh = q.on('LH', 1), re = q.on('receptoren', 1);
    geelLichaam(ctx, GL.x, GL.y, GL.r, { t, leef: 1, receptoren: re }); naamBij(ctx, 'geel lichaam', null, GL.x, GL.y + GL.r + 60, 1, 'center', C.goud);
    wandMetEmbryo(ctx, t, { x: BW.x + 160, w: 1100, zak: 1, nest: 1, hlB: hc });
    const pad = [[BW.x + 160, 470], [BW.x + 160, 300], [800, 300], [800, GL.y], [GL.x + GL.r, GL.y]];
    lijnPad(ctx, pad, rgba(ZK.bloedM, 0.6), 10, bl); stroomPad(ctx, pad, ZK.HCG, 8, t, Math.max(hc * 0.5, bl), { v: 0.2 });
    hlabel(ctx, 'hCG', BW.x + 190, 420, ZK.HCG, hc); naamBij(ctx, 'via het bloed van de moeder', null, 820, 270, bl * (1 - lh), 'left', C.text2);
    // zelfde sleutel: LH en hCG passen op dezelfde receptor
    if (lh > 0.01) { ctx.save(); ctx.globalAlpha *= lh; paneel(ctx, 60, 560, 520, 300, 'past op dezelfde receptor', 1);
      [[200, ZK.LH, 'LH'], [440, ZK.HCG, 'hCG']].forEach(([xx, col, s]) => { ctx.fillStyle = '#7A8BA8'; ctx.fillRect(xx - 40, 800, 80, 20); ctx.beginPath(); ctx.moveTo(xx - 30, 800); ctx.lineTo(xx - 30, 750); ctx.lineTo(xx - 12, 750); ctx.lineTo(xx - 12, 780); ctx.lineTo(xx + 12, 780); ctx.lineTo(xx + 12, 750); ctx.lineTo(xx + 30, 750); ctx.lineTo(xx + 30, 800); ctx.fill();
        const yy = lerp(660, 765, ease(re)); hdot(ctx, xx, yy, col, 14); text(ctx, s, xx, 650, fTekst(28, 700), col, 'center'); });
      ctx.restore(); }
    pill(ctx, 960, 92, 'het embryo stuurt een signaal', C.oker, fadeIO(t, to, q.at('hCG') + 0.6), 30); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const le = q.on('leven', 1), pr = q.on('progesteron', 1), zi = q.on('zitten', 1), me = q.on('menstruatie', 1);
    geelLichaam(ctx, GL.x, GL.y, GL.r * 1.05, { t, leef: 1, hl: le * 0.6 }); naamBij(ctx, 'geel lichaam leeft', null, GL.x, GL.y + GL.r + 60, le, 'center', C.groen);
    const pad = [[GL.x + GL.r, GL.y], [800, GL.y], [800, 560], [BW.x - 300, 560]]; lijnPad(ctx, pad, rgba(ZK.bloedM, 0.6), 10, 0.8);
    stroomPad(ctx, pad, ZK.P, 9, t, pr, { v: 0.22 }); hlabel(ctx, 'progesteron', 560, GL.y - 30, ZK.P, pr);
    wandMetEmbryo(ctx, t, { x: BW.x + 160, w: 1100, zak: 1, nest: 1 });
    naamBij(ctx, 'slijmvlies blijft zitten', null, BW.x + 160, 300, zi, 'center', C.groen);
    if (me > 0.01) { kalender(ctx, 250, 560, 230, { a: me, vandaag: 18, kring: 1 }); kruis(ctx, 365, 720, 30, me, C.koraal); naamBij(ctx, 'geen menstruatie', null, 365, 880 - 20, me, 'center', C.koraal); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const em = q.on('embryo', 1), ur = ramp(t, q.at('urine') - 0.3, 3), an = q.on('Antistoffen', 1), st = q.on('kleurt', 1, 1.0);
    pill(ctx, 960, 92, 'hCG: alleen van een embryo', C.oker, em, 30);
    const r = zwangerschapstest(ctx, 960, 470, 1.9, { t, urine: ur, T: st, Cl: 1 });
    for (let i = 0; i < 10; i++) { const u = ((t * 0.3 + i / 10) % 1); hdot(ctx, lerp(r.tip[0] - 40, r.T[0], u), r.tip[1] + Math.sin(i * 2.1 + t) * 22, ZK.HCG, 8, ur * (1 - st * 0.7)); }
    naamBij(ctx, 'urine met hCG', null, r.tip[0] + 40, 600, ur * (1 - an), 'center', ZK.HCG);
    if (an > 0.01) { for (let k = 0; k < 5; k++) antistof(ctx, r.T[0], r.T[1] - 34 + k * 17, 7, an, Math.PI); naamBij(ctx, 'antistoffen binden hCG', null, r.T[0], 640, an, 'center', '#9FD6C4'); }
    regel(ctx, 'test', r.T[0], r.T[1] - 70, ramp(t, 0.3, 0.5), C.goud, 24, 'center', 700); regel(ctx, 'controle', r.C[0], r.C[1] - 70, ramp(t, 0.3, 0.5), C.text2, 24, 'center', 700);
    pill(ctx, 960, 780, 'twee streepjes: hCG gevonden', C.goud, st, 28); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const ne = q.on('negatief', 1); const r = zwangerschapstest(ctx, 860, 470, 1.7, { t, urine: 1, T: 0, Cl: 1 });
    pill(ctx, 860, 92, '4 dagen na de bevruchting', C.goud, ramp(t, 0.2, 0.5), 30); regel(ctx, 'test', r.T[0], r.T[1] - 64, 1, C.goud, 22, 'center', 700); regel(ctx, 'controle', r.C[0], r.C[1] - 64, 1, C.text2, 22, 'center', 700); naamBij(ctx, 'negatief: alleen het controlestreepje', null, r.T[0], 640, ne, 'center', C.text);
    vt(ctx, 1600, 460, q.on('Wat', 1), 130); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const x0 = 260, x1 = 1660, y0 = 760, h = 460, dag = d => lerp(x0, x1, d / 16);
    assen(ctx, x0, y0 - h, x1 - x0, h, null, ''); regel(ctx, 'hCG', x0, y0 - h - 20, 1, ZK.HCG, 26, 'left', 700); metaText(ctx, 'dagen na de bevruchting', x1, y0 + 80, C.grain, 'right', 22); for (let d = 0; d <= 16; d += 2) text(ctx, String(d), dag(d), y0 + 34, fTekst(22, 600), C.text2, 'center');
    const ne = q.on('innestelt', 1), bl = q.on('bloed', 1), ur = q.on('urine', 1), be = q.on('Betrouwbaar', 1);
    const kr = (d0, k) => d => d < d0 ? 0 : 1 - Math.exp(-(d - d0) * k);
    const tekenK = (f, col, a, lab, d1 = 16) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); for (let d = 0; d <= d1; d += 0.1) { const y = y0 - h * 0.9 * f(d); d ? ctx.lineTo(dag(d), y) : ctx.moveTo(dag(d), y); } ctx.stroke(); ctx.restore(); regel(ctx, lab, dag(d1) + 14, y0 - h * 0.9 * f(d1) + 10, a, col, 26, 'left', 700); };
    if (ne > 0.01) { ctx.save(); ctx.globalAlpha *= ne; ctx.fillStyle = rgba(C.goud, 0.15); ctx.fillRect(dag(6), y0 - h, dag(10) - dag(6), h); ctx.restore(); regel(ctx, 'innesteling', dag(8), y0 - h - 16, ne, C.goud, 26, 'center', 700); }
    tekenK(d => kr(7, 0.35)(d), ZK.HCG, bl, 'in bloed', 15.2); tekenK(d => 0.75 * kr(9, 0.3)(d), lighten(ZK.HCG, 0.3), ur, 'in urine', 15.2);
    if (be > 0.01) { ctx.save(); ctx.globalAlpha *= be; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dag(14), y0); ctx.lineTo(dag(14), y0 - h); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'betrouwbaar testen', 'rond de verwachte menstruatie', dag(14), y0 - h - 50, be, 'center', C.groen); }
    hdot(ctx, dag(4), y0 - 10, C.koraal, 12, ramp(t, 0.2, 0.5)); regel(ctx, 'test op dag 4', dag(4), y0 - 40, ramp(t, 0.2, 0.5) * (1 - be), C.koraal, 24, 'center', 700); },

  // ---------- H2 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const pl = q.on('placenta', 1), sa = q.on('samen', 1), na = q.on('navelstreng', 1);
    const X = 820, Y = 760, S = 2.0, Z = 0.42; vrouwOrganenVoor(ctx, X, Y, S, { t, zwanger: Z, foetus: 1 });
    const V = _vbBaarmoederVorm(Z, 1), px = X + V.rxi * 0.62 * S, py = Y + (V.yci - V.ryi * 0.72) * S, nx = X + V.rxi * 0.3 * S, ny = Y + (V.yci - V.ryi * 0.3) * S;
    if (pl > 0.01) { ctx.save(); ctx.globalAlpha *= pl * (0.5 + 0.5 * Math.sin(t * 3)); ctx.beginPath(); ctx.arc(px, py, 70, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    lijnPad(ctx, [[px + 70, py - 20], [1440, 230]], rgba(C.goud, 0.8), 2, pl); naamBij(ctx, 'placenta', 'nieuw orgaan', 1455, 240, pl, 'left', C.goud);
    lijnPad(ctx, [[nx + 10, ny], [1440, 470]], rgba(C.goud, 0.8), 2, na); naamBij(ctx, 'navelstreng', null, 1455, 480, na, 'left', C.goud);
    naamBij(ctx, 'van moeder en kind samen', null, 1455, 340, sa * (1 - na), 'left'); meta2(ctx, 'baarmoeder in doorsnede · schematisch'); },
  s13(ctx, t, q) { bg(ctx, 'schema'); const tw = q.on('Twee', 1), ee = q.on('Eén', 1);
    const r = placentaDoorsnede(ctx, 960, 600, 1300, 470, { t, vlokken: 0.5, moederbloed: 0.6, navel: 1, kleurO2: false });
    hlabel(ctx, '2 bloedvaten: weinig zuurstof, naar de placenta', 300, 140, BIO.ader, tw); hlabel(ctx, '1 bloedvat: veel zuurstof, naar het kind', 300, 200, BIO.bloed, ee);
    naamBij(ctx, 'navelstreng', 'bloed van het kind', r.navel[0] + 40, r.navel[1] - 120, ramp(t, 0.3, 0.5), 'left'); meta2(ctx, 'placenta in doorsnede · schematisch'); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const vl = q.on('vlokken', 1), ho = q.on('holtes', 1), di = q.on('dicht', 1, 0.8), la = q.on('laagje', 1);
    const A = 1 - di; if (A > 0.01) { placentaDoorsnede(ctx, 960, 600, 1300, 470, { t, a: A, vlokken: 0.4 + 0.6 * vl, moederbloed: 0.3 + 0.7 * ho, navel: 1, focus: vl > 0.5 ? 0 : -1, kleurO2: false });
      naamBij(ctx, 'vlokken', 'vaten van het kind', 1640, 300, vl * A, 'left', C.goud); naamBij(ctx, 'bloed van de moeder', null, 960, 880 - 30, ho * A, 'center', '#E8908A'); }
    if (di > 0.01) { const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, a: di, laag: la });
      naamBij(ctx, 'bloed van de moeder', null, VL.x - VL.w / 2 + 20, 150, di, 'left', '#E8908A'); naamBij(ctx, 'bloed van het kind', 'in een vlok', VL.lx, 420, di, 'left', '#B4A8E0');
      naamBij(ctx, 'dun laagje cellen', 'het bloed mengt niet', r.barriereX(700), 880 - 30, la, 'center', C.goud); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.4 }); const xb = r.barriereX(500), xm = r.moederX + 30, xk = r.kindX(500) + 60;
    const zu = q.on('zuurstof', 1), co = q.on('Koolstofdioxide', 1), an = q.on('antistoffen', 1), af = q.on('afweer', 1);
    const rij = (y, l2r, col, lab, a, vorm) => { if (a <= 0.01) return; const p = l2r ? [[xm, y], [xk, y]] : [[xk, y], [xm, y]]; lijnPad(ctx, p, rgba(col, 0.35), 3, a, [8, 8]); pijl(ctx, p[1][0] - (l2r ? 30 : -30), y, p[1][0], y, col, a, 4, 16); stroomPad(ctx, p, col, 4, t, a, { v: 0.3, r: 12, vorm }); regel(ctx, (l2r ? 'naar het kind: ' : 'naar de moeder: ') + lab, VL.lx, y + 10, a, col, 28, 'left', 700); };
    rij(260, true, '#9FC8F0', 'zuurstof', zu, 'o2'); rij(360, true, C.groen, 'voedingsstoffen', zu, 'glu'); rij(480, false, '#C9CED6', 'koolstofdioxide', co, 'co2'); rij(580, false, C.oker, 'afvalstoffen', co, 'afv'); rij(700, true, '#9FD6C4', 'antistoffen', an, 'y');
    regel(ctx, 'bloed moeder', VL.x - VL.w / 2 + 20, 160, 1, '#E8908A', 28, 'left', 700); regel(ctx, 'bloed kind', VL.x + 220, 160, 1, '#B4A8E0', 28, 'left', 700);
    pill(ctx, 960, 860, 'afweer voor de eerste maanden', '#9FD6C4', af, 28); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.5 }); const xm = r.moederX + 30, xk = r.kindX(500) + 60;
    const di = q.on('diffunderen', 1), gl = q.on('Glucose', 1), am = q.on('Aminozuren', 1), bl = q.on('blaasjes', 1);
    const rij = (y, col, lab, sub, a, vorm) => { if (a <= 0.01) return; const p = [[xm, y], [xk, y]]; lijnPad(ctx, p, rgba(col, 0.35), 3, a, [8, 8]); stroomPad(ctx, p, col, 4, t, a, { v: 0.3, r: 10, vorm }); naamBij(ctx, lab, sub, VL.lx, y + 10, a, 'left', col); };
    rij(230, '#9FC8F0', 'diffusie', 'O₂ en CO₂ · van hoog naar laag', di, 'o2'); rij(380, C.groen, 'transporteiwit', 'glucose', gl, 'glu'); rij(530, C.oker, 'actief transport', 'aminozuren · kost energie', am, 'afv'); rij(680, '#9FD6C4', 'in blaasjes', 'antistoffen · kost energie', bl, 'y');
    if (bl > 0.01) { const xb = r.barriereX(680); ctx.save(); ctx.globalAlpha *= bl; ctx.beginPath(); ctx.arc(xb, 680, 26 + 3 * Math.sin(t * 3), 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    pill(ctx, 960, 92, 'vwo · hoe komen stoffen door het laagje?', C.text2, ramp(t, 0.2, 0.5), 26); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.6 }); const al = q.on('alcohol', 1);
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; const gx = r.moederX - 60, gy = 470; ctx.beginPath(); ctx.moveTo(gx - 40, gy - 60); ctx.lineTo(gx + 40, gy - 60); ctx.quadraticCurveTo(gx + 40, gy + 20, gx, gy + 24); ctx.quadraticCurveTo(gx - 40, gy + 20, gx - 40, gy - 60); shape(ctx, rgba('#8C2A3A', 0.7), '#F2F2EE', 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx, gy + 24); ctx.lineTo(gx, gy + 90); ctx.moveTo(gx - 30, gy + 92); ctx.lineTo(gx + 30, gy + 92); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'het bloed mengt niet', null, r.barriereX(700), 880 - 30, ramp(t, 0.2, 0.5), 'center', C.goud); vt(ctx, VL.lx + 250, 470, q.on('Wat', 1), 130); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.4 }); const xm = r.moederX + 30, xk = r.kindX(500) + 60;
    const ki = q.on('kiest', 1), al = q.on('Alcohol', 1), ni = q.on('nicotine', 1), vi = q.on('virussen', 1);
    const rij = (y, col, lab, a, vorm) => { if (a <= 0.01) return; const p = [[xm, y], [xk, y]]; stroomPad(ctx, p, col, 5, t, a, { v: 0.32, r: 11, vorm }); regel(ctx, lab, VL.lx, y + 10, a, col, 30, 'left', 700); };
    rij(240, '#9FC8F0', 'zuurstof', 1, 'o2'); rij(380, '#D9DDE3', 'alcohol', al, 'alc'); rij(520, '#A89A7A', 'nicotine', ni, 'afv'); rij(660, C.koraal, 'sommige virussen en medicijnen', vi);
    pill(ctx, 960, 92, 'het laagje kiest niet', C.goud, ki, 30); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.5 }); const vr = q.on('vreemd', 1), sc = q.on('scheiding', 1);
    for (let i = 0; i < 4; i++) { const y = 200 + i * 150, xb = r.barriereX(y) - 46; const x = lerp(r.moederX - 80, xb, 0.5 + 0.5 * Math.abs(Math.sin(t * 0.9 + i))); ctx.save(); ctx.globalAlpha *= ramp(t, 0.2, 0.6); circ(ctx, x, y, 30, '#EDEFF2', '#9AA3B2', 2); circ(ctx, x - 6, y - 4, 13, '#8C7BBF'); ctx.restore(); }
    naamBij(ctx, 'afweercellen van de moeder', null, r.moederX - 60, 880 - 30, ramp(t, 0.3, 0.6), 'center', C.text);
    if (vr > 0.01) { setChipZ(ctx, VL.lx + 260, 330, vr); naamBij(ctx, 'het kind is voor de helft vreemd', null, VL.lx + 260, 470, vr, 'center'); }
    naamBij(ctx, 'scheiding houdt ze tegen', null, r.barriereX(700), 880 - 80, sc, 'center', C.goud); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const x0 = 300, x1 = 1600, y0 = 760, h = 440, m = v => lerp(x0, x1, v / 4);
    assen(ctx, x0, y0 - h, x1 - x0, h, null, 'progesteron'); metaText(ctx, 'maanden zwanger', x1, y0 + 80, C.grain, 'right', 22); for (let v = 0; v <= 4; v++) text(ctx, String(v), m(v), y0 + 34, fTekst(24, 600), C.text2, 'center');
    const p1 = ramp(t, 0.2, 2.5), p2 = q.on('placenta', 1, 2), ni = q.on('nodig', 1);
    const gl = v => v < 1.5 ? 0.45 : 0.45 * Math.max(0, 1 - (v - 1.5) / 1.3), pl = v => Math.min(1, Math.max(0, (v - 0.8) / 2.6)) * 0.95;
    const K = (f, col, a, v1, lab) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); for (let v = 0; v <= v1; v += 0.02) { const y = y0 - h * f(v); v ? ctx.lineTo(m(v), y) : ctx.moveTo(m(v), y); } ctx.stroke(); ctx.restore(); regel(ctx, lab, m(v1) + 14, y0 - h * f(v1) + 8, a, col, 26, 'left', 700); };
    K(gl, rgba(ZK.P, 0.55), p1, 4 * p1 > 0.05 ? Math.min(4, 4 * p1 + 0.01) : 0.05, 'geel lichaam'); K(pl, ZK.P, p2, Math.max(0.05, 4 * p2), 'placenta');
    pill(ctx, m(2), y0 - h - 30, 'na ± 2 maanden neemt de placenta het over', ZK.P, ni, 28); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.6 }); for (let k = 0; k < 4; k++) antistof(ctx, r.moederX - 20 + k * 30, 470 + (k % 2) * 30, 14, ramp(t, 0.3, 0.5), 0.3 * k);
    naamBij(ctx, 'antistoffen: grote eiwitten', null, VL.lx, 480, ramp(t, 0.3, 0.5), 'left', '#9FD6C4'); vt(ctx, VL.lx + 250, 470, q.on('Wat', 1), 130); },

  s24(ctx, t, q) { bg(ctx, 'schema'); const r = vlokVergroot(ctx, VL.x, VL.y, VL.w, VL.h, { t, laag: 0.6 }); const y = 470, xb = r.barriereX(y), xk = r.kindX(y) + 50, gr = q.on('groot', 1), bl = q.on('blaasjes', 1), en = q.on('energie', 1);
    const u = bl > 0.01 ? ((t - q.at('blaasjes')) * 0.22) % 1 : 0; const xm = r.moederX + 40;
    // 0–0.3 naar het laagje, 0.3–0.45 membraan stulpt in (blaasje vormt), 0.45–0.75 blaasje steekt over, 0.75–0.9 versmelt aan de kant van het kind, daarna los
    const fase = (a, b) => clamp((u - a) / (b - a), 0, 1); const x0 = xb - 34, x1 = xb + 34;
    let ax = bl > 0.01 ? (u < 0.3 ? lerp(xm, x0, fase(0, 0.3)) : u < 0.45 ? x0 : u < 0.75 ? lerp(x0, x1, fase(0.45, 0.75)) : u < 0.9 ? x1 : lerp(x1, xk, fase(0.9, 1))) : lerp(xm, x0 - 30, ramp(t, 0.2, 3));
    if (bl > 0.01 && u >= 0.3 && u < 0.9) { const g = u < 0.45 ? fase(0.3, 0.45) : u > 0.75 ? 1 - fase(0.75, 0.9) : 1; ctx.save(); ctx.globalAlpha *= bl; ctx.beginPath(); ctx.arc(ax, y, 42 * g + 4, 0, 6.283); shape(ctx, rgba('#F2E6B8', 0.35), C.goud, 4); ctx.restore(); }
    antistof(ctx, ax, y, 18, 1, 0);
    naamBij(ctx, 'te groot om te diffunderen', null, VL.lx, 360, gr * (1 - ramp(t, q.at('blaasjes') - 0.6, 0.4)), 'left', C.text);
    naamBij(ctx, 'opgenomen in een blaasje', 'aan de kant van het kind weer los', VL.lx, 360, bl, 'left', C.goud); pill(ctx, VL.lx + 180, 560, 'kost energie', C.oker, en, 28); },

  // ---------- H3 ----------
  s25(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'linda', 420, 880, 660, { outfit: 'zwanger', zwanger: 0.55, uit: 'blij', t, kijk: 1 }); const b = castBuik('linda', 420, 880, 660, 0.55, 1);
    const vv = q.on('vruchtvliezen', 1), vw = q.on('vruchtwater', 1);
    zoomCircle(ctx, 1260, 460, 360, b.x + b.rx * 0.6, b.y, 'in de baarmoeder · schematisch', ramp(t, 0.2, 0.8), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 100, 720, 720); zwZak(ctx, 1260, 460, 280, { t, week: 20, hlV: vv * (1 - vw), hlW: vw }); });
    naamBij(ctx, 'vruchtvliezen', 'de wand van de zak', 1660, 230, vv, 'left', C.goud); naamBij(ctx, 'vruchtwater', null, 1110, 640, vw, 'left', '#E9F5F2'); },

  s26(ctx, t, q) { bg(ctx, 'schema'); const st = q.on('stoten', 1), te = q.on('temperatuur', 1), be = q.on('bewegen', 1), sl = q.on('slikt', 1), pl = q.on('plast', 1);
    const sch = st * (1 - te) * Math.max(0, Math.sin((t - q.at('stoten')) * 2)) * Math.exp(-Math.max(0, t - q.at('stoten')) * 1.2);
    zwZak(ctx, 820, 470, 330, { t, week: 20, schud: sch, beweeg: be, hlW: 0.3 });
    const items = [[st, 'vangt stoten op'], [te, 'temperatuur blijft gelijk'], [be, 'ruimte om te bewegen'], [sl, 'slikt vruchtwater'], [pl, 'plast erin']];
    items.forEach(([a, s], i) => { if (a <= 0.01) return; vink_(ctx, 1290, 220 + i * 120 - 10, 18, a, C.groen); regel(ctx, s, 1330, 220 + i * 120, a, C.text, 34, 'left', 600); }); },

  s27(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, t, { a: 1, y: 520, cur: ramp(t, q.at('veertig') - 0.4, 2) * 40, me: q.on('menstruatie', 1), bev: q.on('bevruchting', 1) }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); const wk = 6, z = wk / 40; const or = q.on('organen', 1), ha = q.on('hartje', 1), em = q.on('embryo', 1);
    stadium(ctx, t, wk, { a: 1 }); tijdlijnKlein(ctx, t, { cur: wk, emb: em });
    zoomCircle(ctx, 1450, 520, 230, 560, 640, 'embryo · ± 0,5 cm · vergroot', ramp(t, 0.4, 0.8), () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1220, 290, 460, 460); const r = embryoEcht(ctx, 1460, 540, 0.85, { t, glow: ha });
      if (ha > 0.01 && r.hart) { const p = 0.5 + 0.5 * Math.sin(t * 9); ctx.save(); ctx.globalAlpha *= ha; ctx.beginPath(); ctx.arc(r.hart[0], r.hart[1], 22 + 6 * p, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } });
    naamBij(ctx, 'organen worden aangelegd', null, 1450, 830, or * (1 - ha), 'center'); naamBij(ctx, 'week 6: het hartje klopt', null, 1450, 830, ha * (1 - em), 'center', C.koraal); naamBij(ctx, 'embryo', null, 1450, 830, em, 'center', C.goud); },

  s29(ctx, t, q) { bg(ctx, 'schema'); const wk = 10; const fo = q.on('foetus', 1), dr = q.on('drie', 1), gr = q.on('groeit', 1);
    stadium(ctx, t, wk, {}); tijdlijnKlein(ctx, t, { cur: wk, emb: 1, foe: fo });
    zoomCircle(ctx, 1450, 520, 230, 560, 650, 'week 10 · ± 3 cm · vergroot', ramp(t, 0.4, 0.8), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1220, 290, 460, 460); zwZak(ctx, 1450, 520, 190, { t, week: 10 }); });
    naamBij(ctx, '± 3 cm', null, 1450, 830, dr * (1 - fo), 'center', C.goud); naamBij(ctx, 'foetus: groeit en rijpt', null, 1450, 830, fo, 'center', C.goud); },

  s30(ctx, t, q) { bg(ctx, 'schema'); const wk = 20; const vo = q.on('voelt', 1), lo = q.on('longen', 1), vr = q.on('vroeg', 1);
    stadium(ctx, t, wk, { beweeg: vo }); tijdlijnKlein(ctx, t, { cur: wk, emb: 1, foe: 1, long: lo });
    pill(ctx, 1450, 300, 'week 20: de moeder voelt het bewegen', C.goud, vo, 28); pill(ctx, 1450, 420, 'longen rijpen pas aan het eind', '#9FD6C4', lo, 28);
    naamBij(ctx, 'te vroeg geboren: vaak hulp bij het ademen', null, 1450, 520, vr, 'center'); },

  s31(ctx, t, q) { bg(ctx, 'schema'); const wk = 40; const vi = q.on('vijftig', 1), kg = q.on('kilo', 1);
    stadium(ctx, t, wk, {}); tijdlijnKlein(ctx, t, { cur: wk, emb: 1, foe: 1, long: 1 });
    if (vi > 0.01) { ctx.save(); ctx.globalAlpha *= vi; persoon(ctx, 'baby', 1440, 620, 520, { uit: 'slaapt', t }); ctx.restore();
      const x0 = 1180, px = 10.4; ctx.save(); ctx.globalAlpha *= vi; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, 700); ctx.lineTo(x0 + 50 * px, 700); ctx.stroke(); for (let c = 0; c <= 50; c += 5) { ctx.beginPath(); ctx.moveTo(x0 + c * px, 700); ctx.lineTo(x0 + c * px, 700 - (c % 10 ? 10 : 18)); ctx.stroke(); if (c % 10 === 0) text(ctx, String(c), x0 + c * px, 730, fTekst(20, 600), C.text2, 'center'); } ctx.restore(); }
    naamBij(ctx, '± 50 cm lang', null, 1440, 790, vi, 'center', C.goud); naamBij(ctx, 'ruim 3 kilo', null, 1440, 850, kg, 'center', C.goud); },

  // ---------- H4 ----------
  s32(ctx, t, q) { bg(ctx, 'schema'); const ho = q.on('hoofd', 1), dr = q.on('drukt', 1), ze = q.on('Zintuigcellen', 1), im = q.on('impulsen', 1);
    const r = zwGeboorte(ctx, 700, 840, 1.0, { t, rek: ze, druk: dr });
    naamBij(ctx, 'hoofd naar beneden', null, 980, 640, ho * (1 - dr), 'left'); naamBij(ctx, 'drukt op de baarmoederhals', null, 980, 760, dr, 'left', C.goud); naamBij(ctx, 'zintuigcellen meten rek', null, 980, 820, ze, 'left', C.goud);
    const h = hypofyseCirkel(ctx, 1520, 300, 200, 1520, 300, { a: im, hyp: 0, t }); const pad = [[r.hals[0] + 60, r.hals[1] - 20], [1180, 700], [1400, 520], [1500, 380]];
    stroomPad(ctx, pad, C.goud, 6, t, im, { v: 0.5, r: 8 }); meta2(ctx, 'doorsnede · schematisch'); },

  s33(ctx, t, q) { bg(ctx, 'schema'); const hy = q.on('hypofyse', 1), ox = q.on('oxytocine', 1), sa = q.on('samentrekken', 1), we = q.on('wee', 1);
    const wee = sa * (0.5 + 0.5 * Math.sin((t - q.at('samentrekken')) * 1.4));
    const r = zwGeboorte(ctx, 700, 840, 1.0, { t, rek: 0.5, wee });
    const h = hypofyseCirkel(ctx, 1520, 300, 200, 1520, 300, { a: 1, hyp: hy, t });
    const pad = [[h.hyp[0], h.hyp[1] + 10], [1500, 560], [1150, 600], [r.uterusR[0], r.uterusR[1]]]; lijnPad(ctx, pad, rgba(ZK.bloedM, 0.5), 8, ox); stroomPad(ctx, pad, ZK.OXY, 7, t, ox, { v: 0.3 });
    hlabel(ctx, 'oxytocine', 1180, 560, ZK.OXY, ox); naamBij(ctx, 'een wee', 'spieren in de wand trekken samen', 700, 120, we, 'center', C.koraal); },

  s34(ctx, t, q) { bg(ctx, 'schema'); const n = q.on('harder', 1), m1 = q.on('rek', 1), m2 = q.on('sterkere', 1), po = q.on('positieve', 1), lh = q.on('LH', 1) || q.on('el', 1);
    lus(ctx, t, { a: 1, sterk: 0.3 + 0.7 * Math.max(m1, m2), hl: [n, m1, m1, m2] });
    pill(ctx, 960, 92, 'positieve terugkoppeling', C.goud, po, 32); pill(ctx, 960, 880 - 30, 'net als bij de LH-piek', ZK.LH, q.on('piek', 1), 26); },

  s35(ctx, t, q) { bg(ctx, 'schema'); const op = ramp(t, q.at('open') - 0.3, 6), on = q.on('ontsluiting', 1), sc = q.on('scheuren', 1), wg = q.on('weg', 1, 2);
    const wee = 0.4 + 0.4 * Math.sin(t * 1.2); zwGeboorte(ctx, 640, 860, 0.95, { t, open: op, wee, vlies: 1 - sc * 0.5, water: 1 - wg * 0.9 });
    zwHals(ctx, 1450, 400, 1 + 9 * op, { px: 24 }); naamBij(ctx, 'baarmoederhals van onderaf', null, 1450, 160, ramp(t, 0.3, 0.6), 'center', C.text2);
    naamBij(ctx, 'ontsluiting', 'tot ± 10 cm', 1450, 760, on, 'center', C.goud); naamBij(ctx, 'vruchtvliezen scheuren', 'vruchtwater loopt weg', 1450, 860, sc, 'center', '#9FD6C4'); },

  s36(ctx, t, q) { bg(ctx, 'schema'); const ui = q.on('uitdrijving', 1), pe = q.on('perst', 1), ge = ramp(t, q.at('geboren') - 1.6, 2.4);
    zwGeboorte(ctx, 760, 740, 0.85, { t, open: 1, wee: pe, vlies: 0, water: 0, uit: ge });
    naamBij(ctx, 'uitdrijving', null, 1350, 300, ui, 'left', C.goud); naamBij(ctx, 'meepersen met de weeën', null, 1350, 380, pe, 'left'); meta2(ctx, 'doorsnede · schematisch'); },

  s37(ctx, t, q) { bg(ctx, 'schema'); const sa = q.on('samen', 1), lo = ramp(t, q.at('los') - 0.3, 3), na = q.on('nageboorte', 1);
    zwGeboorte(ctx, 760, 740, 0.85, { t, open: 0.8, wee: sa * (0.5 + 0.5 * Math.sin(t * 1.6)), vlies: 0, water: 0, uit: 1, kindA: 0, los: lo + 0.8 * ramp(t, q.at('buiten') - 0.6, 2) });
    naamBij(ctx, 'placenta laat los', null, 1350, 300, lo * (1 - na), 'left'); naamBij(ctx, 'nageboorte', 'placenta en vruchtvliezen naar buiten', 1350, 300, na, 'left', C.goud);
    persoonKlein(ctx, t, ramp(t, 0.2, 0.6)); },

  s38(ctx, t, q) { bg(ctx, 'schema'); lus(ctx, t, { a: 1, sterk: 1 }); vt(ctx, 960, 470, q.on('Wat', 1), 120); },

  s40(ctx, t, q) { bg(ctx, 'schema'); const ni = q.on('niets', 1), we = q.on('weg', 1), vz = q.on('vanzelf', 1);
    lus(ctx, t, { a: 1, sterk: 1 - 0.8 * we, breuk: we, hl: [ni, 0, 0, 0] });
    if (ni > 0.01) kruis(ctx, 960 - 270 * 0.95, 480 - 270 * 0.62, 34, ni, C.koraal);
    pill(ctx, 960, 880 - 30, 'een positieve terugkoppeling stopt niet vanzelf', C.goud, vz, 28); },

  // ---------- H5 ----------
  s41(ctx, t, q) { bg(ctx, 'schema'); const we = q.on('weg', 1), re = q.on('remde', 1), nu = q.on('Nu', 1);
    meterZ(ctx, 520, 250, 420, 1 - 0.85 * we, ZK.P, 'progesteron'); naamBij(ctx, 'placenta weg', null, 520, 760, we, 'center', C.koraal);
    zwMelkklier(ctx, 1250, 480, 1.2, { t, melk: 0.15 + 0.85 * nu });
    if (re > 0.01) { ctx.save(); ctx.globalAlpha *= re * (1 - nu); ctx.strokeStyle = ZK.P; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(640, 480); ctx.lineTo(950, 480); ctx.stroke(); ctx.fillStyle = ZK.P; ctx.fillRect(950, 450, 10, 60); ctx.restore(); naamBij(ctx, 'remt de melkproductie', null, 800, 440, re * (1 - nu), 'center', ZK.P); }
    naamBij(ctx, 'de borst kan melk maken', null, 1250, 820, nu, 'center', C.groen); meta2(ctx, 'melkkliertje · schematisch'); },

  s42(ctx, t, q) { bg(ctx, 'schema'); const pr = q.on('prolactine', 1), va = q.on('vaker', 1);
    const h = hypofyseCirkel(ctx, 380, 330, 200, 380, 330, { hyp: pr, t }); zwMelkklier(ctx, 1300, 480, 1.1, { t, melk: 0.5 + 0.5 * pr });
    const pad = [[h.hyp[0] + 10, h.hyp[1] + 20], [700, 560], [1000, 560], [1100, 480]]; lijnPad(ctx, pad, rgba(ZK.bloedM, 0.5), 8, pr); stroomPad(ctx, pad, ZK.PRL, 7, t, pr, { v: 0.3 }); hlabel(ctx, 'prolactine', 720, 620, ZK.PRL, pr);
    pill(ctx, 960, 92, 'vwo · melk maken', C.text2, ramp(t, 0.2, 0.5), 26); pill(ctx, 960, 850, 'vaker drinken → meer prolactine → meer melk', ZK.PRL, va, 28); },

  s43(ctx, t, q) { bg(ctx, 'schema'); const zu = q.on('zuigt', 1), im = q.on('impulsen', 1), ox = q.on('oxytocine', 1), sp = q.on('spiertjes', 1), sc = q.on('schiet', 1);
    const m = moederBaby(ctx, t, { x: 380, y: 880, h: 600 });
    const h = hypofyseCirkel(ctx, 900, 220, 150, m.hoofd[0] + 50, m.hoofd[1], { a: Math.max(im, ox), hyp: ox, t });
    zoomCircle(ctx, 1520, 590, 260, m.borst[0], m.borst[1], 'melkkliertje · schematisch', ramp(t, 0.2, 0.8), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1260, 330, 520, 520); zwMelkklier(ctx, 1490, 590, 0.82, { t, knijp: sp * (0.5 + 0.5 * Math.sin(t * 2)), toe: sc, hlSpier: sp });
      stroomPad(ctx, [[1290, 420], [1400, 520]], ZK.OXY, 4, t, ox, { v: 0.4 }); });
    stroomPad(ctx, [[m.borst[0] + 10, m.borst[1] - 30], [640, 330], [h.hyp[0] - 40, h.hyp[1] + 40]], C.goud, 5, t, im * (1 - ox), { v: 0.5, r: 8 });
    const bp = [[h.hyp[0], h.hyp[1] + 30], [900, 470], [700, 520], [m.borst[0] + 20, m.borst[1]]]; lijnPad(ctx, bp, rgba(ZK.bloedM, 0.5), 8, ox); stroomPad(ctx, bp, ZK.OXY, 6, t, ox, { v: 0.3 }); hlabel(ctx, 'oxytocine', 930, 470, ZK.OXY, ox);
    naamBij(ctx, 'spiertjes knijpen', null, 1520, 300, sp * (1 - sc), 'center', C.koraal); naamBij(ctx, 'de melk schiet toe', null, 1520, 300, sc, 'center', C.groen); },
  s44(ctx, t, q) { bg(ctx, 'schema'); const an = q.on('antistoffen', 1), af = q.on('afweer', 1); const m = moederBaby(ctx, t, { x: 380, y: 880, h: 600 });
    zoomCircle(ctx, 1450, 500, 300, m.borst[0], m.borst[1], 'eerste melk · schematisch', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1130, 180, 640, 640); zwMelkklier(ctx, 1410, 500, 0.95, { t, toe: 0.8, anti: an }); });
    naamBij(ctx, 'vol antistoffen', null, 1450, 890, an * (1 - af), 'center', '#9FD6C4'); pill(ctx, 960, 92, 'na de placenta: een tweede voorraad afweer', '#9FD6C4', af, 28); },

  // ---------- Recap ----------
  s45(ctx, t, q) { bg(ctx, 'schema'); const p1 = q.on('hCG', 1), p2 = q.on('druk', 1), p3 = q.on('zuigen', 1);
    const pan = (i, a, titel, fn) => { if (a <= 0.01) return; const x = 90 + i * 590, y = 150, w = 560, h = 620; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); ctx.beginPath(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); fn(x, y, w, h); ctx.restore(); text(ctx, titel, x + w / 2, y + h + 50, fTekst(30, 700), C.text, 'center'); };
    pan(0, p1, 'hCG → gele lichaam blijft', (x, y, w, h) => { geelLichaam(ctx, x + w / 2, y + 260, 140, { t, leef: 1 }); for (let k = 0; k < 6; k++) hdot(ctx, x + 60 + ((t * 60 + k * 80) % (w - 120)), y + 500, ZK.HCG, 11); });
    pan(1, p2, 'druk op de hals → weeën', (x, y, w, h) => { zwGeboorte(ctx, x + w / 2, y + h - 40, 0.62, { t, rek: 1, wee: 0.5 + 0.5 * Math.sin(t * 1.5) }); });
    pan(2, p3, 'zuigen → melk schiet toe', (x, y, w, h) => { zwMelkklier(ctx, x + w / 2 - 40, y + h / 2, 0.75, { t, toe: 1, knijp: 0.5 }); });
    pill(ctx, 960, 92, 'het kind stuurt met signalen', C.goud, q.on('signaal', 1), 30);
    const st = 1 - p1; if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; persoon(ctx, 'linda', 760, 860, 560, { outfit: 'zwanger', zwanger: 0, t, kijk: 1 }); kalender(ctx, 960, 300, 300, { vandaag: 18, kring: 1 }); vraagteken(ctx, 1400, 460, 1, 110); ctx.restore(); } },

  s46(ctx, t, q) { bg(ctx, 'schema'); const ei = q.on('eicellen', 1), aa = q.on('aangelegd', 1), op = q.on('opnieuw', 1);
    const m = moederBaby(ctx, t, { x: 480, y: 880, h: 620 });
    zoomCircle(ctx, 1380, 460, 300, m.baby[0] + 40, m.baby[1] + 10, 'eierstokje van de baby · vergroot', ei, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1080, 160, 600, 600);
      ctx.beginPath(); ctx.ellipse(1380, 460, 240, 150, -0.15, 0, 6.283); shape(ctx, '#E3BBA2', '#F2D6C4', 3); for (let i = 0; i < 22; i++) { const an = hash(i * 3) * 6.283, rr = Math.sqrt(hash(i * 7 + 1)); follikel(ctx, 1380 + Math.cos(an) * rr * 190, 460 + Math.sin(an) * rr * 110, 0, { R: 420, t }); } });
    naamBij(ctx, 'eicellen liggen al klaar', null, 1380, 870, ei * (1 - aa), 'center', C.goud); naamBij(ctx, 'aangelegd vóór de geboorte', null, 1380, 870, aa * (1 - op), 'center', C.goud); naamBij(ctx, 'zo begint het opnieuw', null, 1380, 870, op, 'center', C.goud); },
});

// ---- hulpjes voor H3–H5 ----
function tijdlijn(ctx, t, o = {}) { const { a = 1, y = 520, cur = 0, me = 0, bev = 0 } = o; const x0 = 200, x1 = 1720, w = wk => lerp(x0, x1, wk / 40);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - 14, x1 - x0, 28, 14); shape(ctx, rgba(C.line, 0.2), C.line, 1.5);
  if (cur > 0.01) { roundRect(ctx, x0, y - 14, Math.max(28, w(cur) - x0), 28, 14); shape(ctx, rgba(C.goud, 0.5), C.goud, 1.5); }
  for (let k = 0; k <= 40; k += 4) { text(ctx, String(k), w(k), y + 56, fTekst(24, 600), C.text2, 'center'); }
  metaText(ctx, 'zwangerschapsweken', x1, y + 100, C.grain, 'right', 22);
  hdot(ctx, w(0), y, C.koraal, 16, me); regel(ctx, 'eerste dag laatste menstruatie', w(0), y - 50, me, C.koraal, 28, 'left', 700);
  hdot(ctx, w(2), y, C.goud, 16, bev); regel(ctx, 'bevruchting ≈ week 2', w(2), y - 100, bev, C.goud, 28, 'left', 700);
  regel(ctx, 'geboorte ≈ week 40', w(40), y - 50, ramp(cur, 38, 1), C.groen, 28, 'right', 700); ctx.restore(); }
function tijdlijnKlein(ctx, t, o = {}) { const { cur = 0, emb = 0, foe = 0, long = 0 } = o; const x0 = 1080, x1 = 1840, y = 110, w = wk => lerp(x0, x1, wk / 40);
  roundRect(ctx, x0, y - 10, x1 - x0, 20, 10); shape(ctx, rgba(C.line, 0.2), C.line, 1.2); for (let k = 0; k <= 40; k += 10) text(ctx, String(k), w(k), y + 44, fTekst(20, 600), C.text2, 'center');
  if (emb > 0.01) { ctx.save(); ctx.globalAlpha *= emb; ctx.fillStyle = rgba(C.goud, 0.5); ctx.fillRect(w(2), y - 10, w(10) - w(2), 20); ctx.restore(); regel(ctx, 'embryo', (w(2) + w(10)) / 2, y - 22, emb, C.goud, 22, 'center', 700); }
  if (foe > 0.01) { ctx.save(); ctx.globalAlpha *= foe; ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(w(10), y - 10, w(40) - w(10), 20); ctx.restore(); regel(ctx, 'foetus', (w(10) + w(40)) / 2, y - 22, foe, C.teal, 22, 'center', 700); }
  if (long > 0.01) { ctx.save(); ctx.globalAlpha *= long; ctx.strokeStyle = '#9FD6C4'; ctx.lineWidth = 4; ctx.strokeRect(w(32), y - 14, w(40) - w(32), 28); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(w(cur), y - 26); ctx.lineTo(w(cur) - 10, y - 40); ctx.lineTo(w(cur) + 10, y - 40); ctx.closePath(); ctx.fillStyle = C.text; ctx.fill(); regel(ctx, 'week ' + cur, w(cur), y + 80, 1, C.text, 26, 'center', 700); }
// stadium: buikdoorsnede met de baarmoeder op ware verhouding en een cm-liniaal op dezelfde schaal
function stadium(ctx, t, wk, o = {}) { const s = 0.92, x = 560, y = 790; const z = wk / 40;
  const u = vrouwOrganenVoor(ctx, x, y, s, { t, zwanger: z, foetus: 1 });
  const px = 21 * s, x0 = 120; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0, y - 34 * px); ctx.stroke();
  for (let c = 0; c <= 34; c++) { ctx.beginPath(); ctx.moveTo(x0, y - c * px); ctx.lineTo(x0 + (c % 5 ? 8 : 16), y - c * px); ctx.stroke(); if (c % 10 === 0) text(ctx, c + ' cm', x0 + 24, y - c * px + 8, fTekst(20, 600), C.text2, 'left'); }
  metaText(ctx, 'op schaal', x0 + 150, y + 30, C.grain, 'left', 20); return u; }
function lus(ctx, t, o = {}) { const { a = 1, sterk = 1, hl = [0, 0, 0, 0], breuk = 0 } = o; const cx = 960, cy = 480, R = 270; const lab = ['hoofd drukt op de baarmoederhals', 'zintuigcellen → hersenen', 'hypofyse: oxytocine', 'wee: baarmoeder trekt samen'];
  const pos = [[cx, cy - R], [cx + R * 1.55, cy], [cx, cy + R], [cx - R * 1.55, cy]];
  for (let i = 0; i < 4; i++) { const [x1, y1] = pos[i], [x2, y2] = pos[(i + 1) % 4]; const al = i === 3 ? 1 - breuk : 1; if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= a * al; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 + 8 * sterk; ctx.beginPath();
    const mx = (x1 + x2) / 2 + (x1 + x2 - 2 * cx) * 0.18, my = (y1 + y2) / 2 + (y1 + y2 - 2 * cy) * 0.18; ctx.moveTo(lerp(x1, mx, 0.35), lerp(y1, my, 0.35)); ctx.quadraticCurveTo(mx, my, lerp(x2, mx, 0.35), lerp(y2, my, 0.35)); ctx.stroke();
    pijl(ctx, lerp(x2, mx, 0.42), lerp(y2, my, 0.42), lerp(x2, mx, 0.35), lerp(y2, my, 0.35), C.goud, 1, 3 + 8 * sterk, 20 + 10 * sterk); ctx.restore();
    const plus = (t * 0.6 + i * 0.25) % 1; regel(ctx, '+', mx, my + 12, a * al * (0.4 + 0.6 * sterk), C.text, 40, 'center', 800); }
  for (let i = 0; i < 4; i++) { const [x, y] = pos[i]; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const w = ctx.measureText(lab[i]).width + 50; roundRect(ctx, x - w / 2, y - 40, w, 70, 35); shape(ctx, rgba('#121A26', 0.9), hl[i] > 0.4 ? C.goud : C.line, hl[i] > 0.4 ? 4 : 2); text(ctx, lab[i], x, y + 8, fTekst(30, 700), i === 2 ? ZK.OXY : C.text, 'center'); ctx.restore(); } }
function meterZ(ctx, x, y, h, v, col, titel) { roundRect(ctx, x - 40, y, 80, h, 20); shape(ctx, '#2A3446', C.line, 2); const hv = h * clamp(v, 0, 1); roundRect(ctx, x - 40, y + h - hv, 80, hv, 20); shape(ctx, rgba(col, 0.75), col, 2); text(ctx, titel, x, y - 24, fTekst(28, 700), col, 'center'); }
function setChipZ(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 120, y - 40, 110, 80, 14); shape(ctx, rgba('#F2CF7A', 0.85), '#F2CF7A', 2); roundRect(ctx, x + 10, y - 40, 110, 80, 14); shape(ctx, rgba('#34609A', 0.85), '#7FA6D9', 2);
  text(ctx, 'moeder', x - 65, y + 10, fTekst(22, 700), '#121A26', 'center'); text(ctx, 'vader', x + 65, y + 10, fTekst(22, 700), '#F2F2EE', 'center'); ctx.restore(); }
// moeder zit met de baby tegen de borst onder een doek (gekleed); gezicht heel
function moederBaby(ctx, t, o = {}) { const { x = 380, y = 880, h = 600, doek = 1 } = o; const hh = h / 6.1, top = y - h, chestY = top + hh * 2.05;
  persoon(ctx, 'linda', x, y, h, { uit: 'blij', t, kijk: -1 });
  const L = hh * 2.7, bx = x + hh * 0.55, hoofdX = bx - L * 0.42; // baby ligt dwars voor de borst, hoofd links (bij de borst)
  persoon(ctx, 'baby', bx, chestY + L * 0.17, L, { uit: 'slaapt', t });
  if (doek > 0.01) { ctx.save(); ctx.globalAlpha *= doek; ctx.fillStyle = '#E8DCC8'; ctx.beginPath(); ctx.moveTo(hoofdX + hh * 0.35, chestY - hh * 0.55); ctx.quadraticCurveTo(bx + L * 0.2, chestY - hh * 0.95, bx + L * 0.62, chestY - hh * 0.1); ctx.quadraticCurveTo(bx + L * 0.55, chestY + hh * 0.75, bx + L * 0.1, chestY + hh * 0.7);
    ctx.quadraticCurveTo(hoofdX + hh * 0.2, chestY + hh * 0.8, hoofdX + hh * 0.3, chestY + hh * 0.2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = rgba('#C9B896', 0.7); ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(hoofdX + hh * (0.6 + 0.35 * k), chestY - hh * 0.5); ctx.quadraticCurveTo(hoofdX + hh * (0.8 + 0.35 * k), chestY, hoofdX + hh * (0.6 + 0.35 * k), chestY + hh * 0.6); ctx.stroke(); } ctx.restore(); }
  return { borst: [hoofdX - hh * 0.05, chestY - hh * 0.1], hoofd: [x, top + hh * 0.55], baby: [bx, chestY] }; }
function persoonKlein(ctx, t, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; paneel(ctx, 1320, 520, 520, 330, null, 1); persoon(ctx, 'baby', 1580, 720, 260, { uit: 'slaapt', t }); regel(ctx, 'het kind is er', 1580, 810, 1, C.text, 28, 'center', 700); ctx.restore(); }

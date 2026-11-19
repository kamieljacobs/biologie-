// Wat word jij? · Sport en topsport 4 · Eén doel of alles tegelijk? — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer (Sam, outfit 'zwem'), de zwemtrainer (klembord, stopwatch). Geen namen in beeld.
// Decor 'badrand' (eigen vector, SP4_hal) alleen onder scènes aan het bad; grafiek, jaarplan, balans en tijden op navy.
// Hoofdbeeld: het klembord met eerst drie, later vier balken (SNELHEID goud, KRACHT oker, DUUR groen, HERSTEL teal).

function SP4_trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || SP4_GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a }); }
function SP4_sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || SP4_GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: o.outfit || 'zwem', a: o.a == null ? 1 : o.a }); }
// het klembord met de proef (s03, s04, s06): vaste plek
const SP4_KB = [380, 190, 1160, 670];
function SP4_proefBord(ctx, a = 1) { const P = SP4_klembord(ctx, SP4_KB[0], SP4_KB[1], SP4_KB[2], SP4_KB[3], a); return P; }
// seizoen: 24 weken; blokken BASIS (1–8, groen=0), KRACHT (9–14, oker=1), SNELHEID (15–20, goud=2), AFBOUW (21–23), TOERNOOI (24)
function SP4_weekHL(i) { return i < 8 ? 0 : i < 14 ? 1 : i < 20 ? 2 : i < 23 ? 2 : -1; }

Object.assign(SCENES, {
  title(ctx, t) { SP4_badBoven(ctx, 1100, 500, 700, 330, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_blok(ctx, 820, SP4_GROND, 1, '4');
    SP4_trainer(ctx, 250, t, { uit: q.on('allemaal', 1) > 0.5 ? 'denkt' : 'neutraal' });
    SP4_sam(ctx, 560, t, { uit: 'blij', kijk: -1, pose: q.on('drie', 1) > 0.5 && q.on('liefst', 1) < 0.5 ? 'wijsOmhoog' : 'staan' });
    tag(ctx, '100 M SNELLER', 400, 180, C.goud, q.on('sneller', 1, 0.3), 'left', 34);
    tag(ctx, 'STERKER VAN HET BLOK', 400, 260, C.oker, q.on('sterker', 1, 0.3), 'left', 34);
    tag(ctx, '400 M VOLHOUDEN', 400, 340, C.groen, q.on('langer', 1, 0.3), 'left', 34);
    const K = q.on('allemaal', 1, 0.5), V = ramp(t, q.at('elke', 1), 1.6);
    SP4_doelBord(ctx, 1160, 250, 620, 470, [V, V, V], K, { kop: 'ELKE WEEK', gloed: q.on('vol', 2, 0.4) });
    SP4_laag(ctx, q.on('Kan', 1, 0.4), () => { SP4_kaart(ctx, 1160, 120, 620, 96, 1, C.goud); text(ctx, 'ALLES TEGELIJK?', 1470, 186, fTekst(48, 800), C.goud, 'center'); }); },

  // ---------- H1 Je wordt goed in wat je traint ----------
  s03(ctx, t, q) { SP4_hal(ctx, { t, dim: 0.55 });
    const In = ramp(t, 0, 1.0), Pr = q.on('proef', 1, 0.6), Wv = SP4_fase(t, q.at('waarvoor', 1), q.at('laat', 1));
    SP4_trainer(ctx, 190, t, { pose: Wv > 0.5 ? 'wijs' : 'staan', uit: Wv > 0.5 ? 'praat' : 'neutraal' });
    ctx.save(); ctx.translate(0, (1 - In) * 300); const P = SP4_proefBord(ctx, In); ctx.restore(); if (!P) return;
    // eerst de drie lege doelbalken
    SP4_laag(ctx, 1 - Pr, () => { SP4_mono(ctx, 'WAARVOOR TRAIN JE?', P.x + 40, P.y + 60, 30, SP4.goud);
      for (let i = 0; i < 3; i++) { const [lab, kl] = SP4_DOELEN[i]; SP4_balk(ctx, P.x + 60, P.y + 150 + i * 130, P.w - 120, 52, 0, SP4[kl], lab, 1, { gloed: Wv * (0.5 + 0.5 * Math.sin(t * 5 + i)) }); } });
    // dan de proef
    SP4_laag(ctx, Pr, () => { SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
      const wS = 10 * clamp((t - q.at('kracht', 1)) / 2.6, 0, 1), wE = 10 * clamp((t - q.at('duur', 1)) / 2.6, 0, 1);
      SP4_reeks(ctx, P, 'k', 'S', wS, { lab: 'alleen kracht', labA: ramp(t, q.at('kracht', 1) + 2.6, 0.4) });
      SP4_reeks(ctx, P, 'c', 'S', wS, { lab: 'alleen kracht', labA: ramp(t, q.at('kracht', 1) + 2.6, 0.4) });
      SP4_reeks(ctx, P, 'k', 'E', wE, { lab: 'alleen duur', labA: ramp(t, q.at('duur', 1) + 2.6, 0.4), dash: [3, 10] });
      SP4_reeks(ctx, P, 'c', 'E', wE, { lab: 'alleen duur', labA: ramp(t, q.at('duur', 1) + 2.6, 0.4), dash: [3, 10] });
      // nadruk op de uitkomst
      const nad = (p, g, d, a) => { if (a <= 0.01) return; const G = SP4_paneel(P, p), e = SP4_pt(G, 10, SP4_DATA[p][g][10]); ctx.save(); ctx.globalAlpha *= a; circ(ctx, e[0], e[1], 22, null, SP4.goud, 4); ctx.restore(); };
      nad('k', 'S', 0, SP4_fase(t, q.at('sterker', 1) - 0.2, q.at('nauwelijks', 1) + 0.6)); nad('c', 'S', 0, SP4_fase(t, q.at('nauwelijks', 1), q.at('duurgroep', 1)));
      nad('c', 'E', 0, SP4_fase(t, q.at('fitter', 2) - 0.2, q.at('niet', 1))); nad('k', 'E', 0, SP4_fase(t, q.at('niet', 1), q.at('Training', 1)));
      SP4_laag(ctx, q.on('Training', 1, 0.4), () => { roundRect(ctx, P.x + P.w / 2 - 300, P.y + 470, 600, 80, 14); shape(ctx, rgba(SP4.goud, 0.18), SP4.goud, 3); text(ctx, 'SPECIFIEK', P.x + P.w / 2, P.y + 525, fTekst(44, 800), SP4.goud, 'center'); });
      SP4_laag(ctx, q.on('Daarom', 1, 0.4), () => SP4_mono(ctx, 'EERST HET DOEL', P.x + P.w / 2, P.y + 572, 22, SP4.inkt, 'center')); }); },

  // ---------- H2 Doelen die botsen ----------
  s04(ctx, t, q) { SP4_hal(ctx, { t, dim: 0.55 }); SP4_trainer(ctx, 190, t);
    SP4_sam(ctx, 1730, t, { kijk: -1, uit: q.on('Wat', 1) > 0.5 ? 'denkt' : 'blij' });
    const P = SP4_proefBord(ctx, 1); SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
    const D = q.on('derde', 1, 0.8), wSE = 7 * clamp((t - q.at('Zeven', 1)) / 5.6, 0, 1), V = q.on('Wat', 1, 0.5);
    // referentie: kracht van de krachtgroep en conditie van de duurgroep worden gestippeld; de andere twee lijnen gaan weg
    SP4_reeks(ctx, P, 'k', 'S', 10, { dash: D > 0.5 ? [10, 10] : null, lw: 6 - 2 * D, lab: 'alleen kracht', labA: 1 });
    SP4_reeks(ctx, P, 'c', 'E', 10, { dash: [3, 10], lw: 6 - 2 * D, lab: 'alleen duur', labA: 1 });
    SP4_reeks(ctx, P, 'c', 'S', 10, { a: 1 - D, lab: 'alleen kracht', labA: 1 }); SP4_reeks(ctx, P, 'k', 'E', 10, { a: 1 - D, dash: [3, 10], lab: 'alleen duur', labA: 1 });
    SP4_laag(ctx, D, () => SP4_mono(ctx, 'KRACHT + DUUR', P.x + P.w / 2, P.y + 470, 26, SP4.inkt, 'center'));
    SP4_reeks(ctx, P, 'k', 'SE', wSE, { lw: 9, kl: '#7A5418' }); SP4_reeks(ctx, P, 'c', 'SE', wSE, { lw: 9, kl: '#24683E' });
    // vraag: grafiek stopt bij week 7
    SP4_laag(ctx, V, () => { const G = SP4_paneel(P, 'k'), [x7] = SP4_pt(G, 7, 0), [x10] = SP4_pt(G, 10, 0);
      ctx.fillStyle = rgba(SP4.goud, 0.16); ctx.fillRect(x7, G.y0, x10 - x7 + 10, G.y1 - G.y0);
      ctx.setLineDash([8, 8]); ctx.strokeStyle = SP4.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x7, G.y0); ctx.lineTo(x7, G.y1); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, '?', (x7 + x10) / 2 + 6, G.y0 + 150, fTitel(110), SP4.goud, 'center'); }); },

  s06(ctx, t, q) { const Z = q.on('Inspanningsfysiologen', 1, 0.7);
    if (Z < 1) { SP4_hal(ctx, { t, dim: 0.55 }); SP4_laag(ctx, 1 - Z, () => { SP4_trainer(ctx, 190, t);
      const P = SP4_proefBord(ctx, 1); SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
      SP4_reeks(ctx, P, 'k', 'S', 10, { dash: [10, 10], lw: 4, lab: 'alleen kracht', labA: 1 }); SP4_reeks(ctx, P, 'c', 'E', 10, { dash: [3, 10], lw: 4, lab: 'alleen duur', labA: 1 });
      const wk = 7 + clamp((t - q.at('stopt', 1)) / 1.2, 0, 1) + 2 * clamp((t - q.at('zakt', 1)) / 1.2, 0, 1), wc = 7 + 3 * clamp((t - q.at('conditie', 1)) / 1.4, 0, 1);
      SP4_reeks(ctx, P, 'k', 'SE', wk, { lw: 9, kl: '#7A5418', lab: 'kracht + duur', labDy: 56, labA: ramp(t, q.at('zakt', 1) + 1.2, 0.4) });
      SP4_reeks(ctx, P, 'c', 'SE', wc, { lw: 9, kl: '#24683E', lab: 'kracht + duur', labDy: 56, labA: ramp(t, q.at('conditie', 1) + 1.4, 0.4) });
      const I = q.on('interferentie', 1, 0.5); if (I > 0.01) SP4_laag(ctx, I, () => { roundRect(ctx, P.x + 60, P.y + 488, P.w - 120, 88, 14); shape(ctx, rgba('#0D1420', 0.92), C.koraal, 3);
        text(ctx, 'INTERFERENTIE-EFFECT', P.x + P.w / 2, P.y + 526, fTekst(34, 800), C.koraal, 'center');
        SP4_meta(ctx, 'TWEE DOELEN TEGELIJK → WINST OP ÉÉN KLEINER (HIER: KRACHT)', P.x + P.w / 2, P.y + 562, q.on('train', 1, 0.5), C.text, 'center', 22); }); }); }
    if (Z <= 0.01) return; SP4_laag(ctx, Z, () => { bg(ctx, 'schema');
      // stapel proeven die samenschuiven
      const S = q.on('tientallen', 1, 1.2), M = q.on('maximale', 1, 0.5), Kl = q.on('lijkt', 1, 0.6);
      SP4_laag(ctx, 1 - Kl, () => { for (let i = 0; i < 9; i++) { const sx = 160 + (i % 3) * 140, sy = 260 + Math.floor(i / 3) * 150, ex = 200 + i * 4, ey = 360 - i * 8; const x = lerp(sx, ex, S), y = lerp(sy, ey, S);
          roundRect(ctx, x, y, 200, 130, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); for (let k = 0; k < 4; k++) { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(x + 20, y + 26 + k * 24, 160 - (k % 2) * 50, 6); } }
        SP4_meta(ctx, 'SCHUMANN E.A. 2021', 300, 600, S, C.grain, 'center', 26); SP4_meta(ctx, 'TIENTALLEN PROEVEN', 300, 640, S, C.text2, 'center', 24);
        // drie staven: kracht + duur, vergeleken met alleen kracht
        SP4_laag(ctx, M, () => { const base = 700, ref = 340; SP4_meta(ctx, 'KRACHT + DUUR, VERGELEKEN MET ALLEEN KRACHT', 1080, 230, 1, C.text2, 'center', 24);
          ctx.setLineDash([12, 10]); ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(650, ref); ctx.lineTo(1520, ref); ctx.stroke(); ctx.setLineDash([]); SP4_meta(ctx, 'ALLEEN KRACHT', 1520, ref - 16, 1, C.oker, 'right', 22);
          ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(650, base); ctx.lineTo(1520, base); ctx.stroke();
          const st = [['MAXIMALE', 'KRACHT', 'maximale', ref], ['SPIERMASSA', '', 'spiermassa', ref], ['EXPLOSIEVE', 'KRACHT', 'explosieve', ref + 140]];
          st.forEach(([l1, l2, cue, top], i) => { const g = q.on(cue, 1, 0.8), x = 720 + i * 280, hgt = (base - top) * g; roundRect(ctx, x, base - hgt, 170, hgt, 8); shape(ctx, rgba(C.oker, 0.8), i === 2 ? C.koraal : C.oker, i === 2 ? 6 : 2);
            SP4_meta(ctx, l1, x + 85, base + 40, q.on(cue, 1, 0.3), i === 2 ? C.koraal : C.text, 'center', 22); if (l2) SP4_meta(ctx, l2, x + 85, base + 72, q.on(cue, 1, 0.3), i === 2 ? C.koraal : C.text, 'center', 22); });
          SP4_meta(ctx, 'MEESTAL GEWOON', 1000, 300, SP4_fase(t, q.at('groeien', 1), q.at('Vooral', 1) + 0.6), C.groen, 'center', 24);
          SP4_meta(ctx, 'MINDER', 1365, 462, q.on('minder', 1, 0.4), C.koraal, 'center', 26); });
        // afzet van het startblok (voorbeeld van explosieve kracht)
        SP4_laag(ctx, SP4_fase(t, q.at('sprong', 1) - 0.2, q.at('lijkt', 1) + 0.2), () => { SP4_kaart(ctx, 1540, 250, 350, 400, 1, C.koraal); const xr = 1680, yb = 470;
          ctx.fillStyle = SP4.vloer; ctx.fillRect(1556, 600, xr - 1556, 34); ctx.fillStyle = SP4.water; ctx.fillRect(xr, 560, 1874 - xr, 74); ctx.fillStyle = rgba('#9FD0EA', 0.6); ctx.fillRect(xr, 558, 1874 - xr, 4);
          ctx.fillStyle = '#B8C0C8'; ctx.fillRect(xr - 70, yb, 70, 600 - yb); const s = zwemmer(ctx, 'sam', xr, yb, 250, { slag: 'startblok', kijk: 1 }); if (s && s.wig) { roundRect(ctx, s.wig.x - 30, s.wig.y - s.wig.h, 60, s.wig.h, 4); shape(ctx, '#8A94A6', null); }
          SP4_meta(ctx, 'EXPLOSIEF: AFZET', 1715, 292, 1, C.koraal, 'center', 22); }); });
      // klokken: in één training of uren ertussen
      SP4_laag(ctx, Kl, () => { tag(ctx, 'LIJKT', 960, 200, C.goud, 1, 'center', 32);
        SP4_klok(ctx, 620, 450, 150, [[0, 0.08, C.oker], [0.08, 0.16, C.groen]], 1); SP4_meta(ctx, 'IN ÉÉN TRAINING', 620, 660, 1, C.koraal, 'center', 26); SP4_meta(ctx, 'MINDER KRACHT', 620, 700, 1, C.text2, 'center', 22);
        SP4_klok(ctx, 1300, 450, 150, [[0, 0.08, C.oker], [0.42, 0.5, C.groen]], 1); SP4_meta(ctx, 'UREN ERTUSSEN', 1300, 660, 1, C.groen, 'center', 26); SP4_meta(ctx, 'NAUWELIJKS EFFECT', 1300, 700, 1, C.text2, 'center', 22);
        vraagteken(ctx, 960, 520, q.on('Waarom', 1, 0.4), 120);
        SP4_laag(ctx, q.on('zwemmers', 1, 0.4), () => { ctx.fillStyle = rgba(C.teal, 0.25); ctx.fillRect(1500, 790, 380, 70); zwemmer(ctx, 'sam', 1660, 790 + 0.12 * 170, 170, { slag: 'crawl', t }); text(ctx, '?', 1860, 790, fTitel(70), C.goud, 'center'); }); }); }); },

  // ---------- H2 Doelen die helpen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const WL = 500, BOD = 720, L = 380;
    ctx.fillStyle = SP4.vloer; ctx.fillRect(0, WL, 280, BOD - WL); ctx.fillStyle = SP4.rand; ctx.fillRect(0, WL - 6, 290, 10);
    const g = ctx.createLinearGradient(0, WL, 0, BOD); g.addColorStop(0, '#2F6F8F'); g.addColorStop(1, '#234E6A'); ctx.fillStyle = g; ctx.fillRect(280, WL, W - 280, BOD - WL);
    ctx.fillStyle = SP4.rand; ctx.fillRect(280, BOD, W - 280, 8); ctx.fillRect(1900, WL - 6, 20, BOD - WL + 14);
    SP4_trainer(ctx, 140, t, { y: WL, h: 380, kijk: 1 });
    // de zwemmer: lengte 1 (→), lengte 2 (←); 50 m in beeld geschaald
    const t0 = q.at('laat', 1), v = 1.7 * L / 1.79, xa = 560, xb = 1620, d = xb - xa, T1 = d / v; let u = t - t0, x, kijk = 1;
    if (u < 0) x = xa; else if (u < T1) x = xa + v * u; else if (u < 2 * T1) { x = xb - v * (u - T1); kijk = -1; } else { x = xa + Math.min(d, v * (u - 2 * T1)); }
    zwemmer(ctx, 'sam', x, WL + 0.12 * L, L, { slag: u < 0 ? 'stroomlijn' : 'crawl', t: Math.max(0, u), kijk });
    ctx.strokeStyle = rgba('#9FD0EA', 0.6); ctx.lineWidth = 3; ctx.beginPath(); for (let xx = 280; xx <= W; xx += 30) { const yy = WL + Math.sin(xx * 0.03 + t * 2) * 3; xx === 280 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke();
    tag(ctx, '8 × 50 M · SNEL · KORTE RUST', 1100, 150, C.goud, q.on('acht', 1, 0.4), 'center', 34);
    const tijden = ['29,8', '30,1']; for (let i = 0; i < 8; i++) { const tx = 300 + i * 190; const klaar = i < 2 && u > (i + 1) * T1;
      SP4_tegel(ctx, tx, 760, 172, 104, klaar ? tijden[i] : '', q.on('acht', 1, 0.4), { vraag: !klaar && q.on('Wat', 1) > 0.5 && i >= 2 }); }
    SP4_meta(ctx, 'VOORBEELD', 300, 752, q.on('acht', 1, 0.4), C.grain, 'left', 20);
    SP4_stopwatch(ctx, 1640, 300, 70, t, q.on('sprinter', 1, 0.4), true); },

  s09(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord c: hij herstelt sneller tussen de herhalingen', 1);
    const MET = ['29,8', '30,0', '30,2', '30,4', '30,6', '30,8', '30,9', '31,1'], ZON = ['29,8', '30,4', '31,0', '31,6', '32,1', '32,6', '33,0', '33,4'];
    const t0 = q.at('herstelt', 1); text(ctx, 'met aerobe basis', 120, 290, fTekst(34, 700), C.groen, 'left'); text(ctx, 'zonder', 120, 430, fTekst(34, 700), C.koraal, 'left');
    for (let i = 0; i < 8; i++) { const a = ramp(t, t0 + i * 0.3, 0.3), x = 470 + i * 178, top = q.on('topsnelheid', 1, 0.4) * (i === 0 ? 1 : 0);
      SP4_tegel(ctx, x, 230, 160, 96, MET[i], a, { kl: C.groen, rand: top > 0.5 ? C.goud : C.line }); SP4_tegel(ctx, x, 370, 160, 96, ZON[i], a, { kl: i ? C.koraal : C.text, rand: top > 0.5 ? C.goud : C.line }); }
    SP4_meta(ctx, 'VOORBEELD', 1880, 500, ramp(t, t0, 0.4), C.grain, 'right', 22);
    SP4_laag(ctx, q.on('topsnelheid', 1, 0.4), () => { text(ctx, '=', 550, 358, fTitel(44), C.goud, 'center'); SP4_meta(ctx, 'TOPSNELHEID GELIJK', 470, 210, 1, C.goud, 'left', 22); });
    // zwemmer met zoomcirkel naar de spier en twee batterijen
    const A = q.on('aerobe', 1, 0.6); SP4_laag(ctx, A, () => { const WL = 700; ctx.fillStyle = rgba(C.teal, 0.28); ctx.fillRect(100, WL, 560, 160); ctx.fillStyle = rgba('#9FD0EA', 0.6); ctx.fillRect(100, WL - 2, 560, 4);
      const r = zwemmer(ctx, 'sam', 420, WL + 0.12 * 260, 260, { slag: 'crawl', fase: 0.26 }); const sx = r.schouder ? r.schouder.x : 470, sy = r.schouder ? r.schouder.y : WL;
      zoomCircle(ctx, 880, 690, 150, sx, sy, '', q.on('spieren', 1, 0.5), () => { SP4_spiervezel(ctx, 880, 690, 150); });
      SP4_meta(ctx, 'SPIER', 880, 520, q.on('spieren', 1, 0.5), C.grain, 'center', 24);
      const E = q.on('energievoorraad', 1, 0.5), per = 4, ph = ((t - q.at('energievoorraad', 1)) % per + per) % per;
      SP4_laag(ctx, E, () => { metaText(ctx, 'ENERGIEVOORRAAD IN DE RUST', 1460, 560, C.text2, 'center', 24);
        SP4_batterij(ctx, 1220, 610, 110, 200, 0.3 + 0.7 * clamp(ph / 1.4, 0, 1), C.groen, 1); SP4_meta(ctx, 'MET', 1275, 850, 1, C.groen, 'center', 24);
        SP4_batterij(ctx, 1560, 610, 110, 200, 0.3 + 0.7 * clamp(ph / 3.6, 0, 1), C.koraal, 1); SP4_meta(ctx, 'ZONDER', 1615, 850, 1, C.koraal, 'center', 24); });
      SP4_meta(ctx, 'TOMLIN & WENGER 2001', 120, 540, ramp(t, q.at('aerobe', 1) + 0.5, 0.4), C.grain, 'left', 22); }); },

  // ---------- H3 Het seizoen in blokken ----------
  s10(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_trainer(ctx, 360, t, { pose: q.on('Hoe', 1) > 0.5 ? 'denk' : 'staan', uit: q.on('Hoe', 1) > 0.5 ? 'denkt' : 'neutraal' });
    // tafel met een leeg jaarplan
    roundRect(ctx, 640, 680, 1180, 26, 6); shape(ctx, '#C9A35C', '#8A6A44', 2); ctx.fillStyle = '#8A6A44'; ctx.fillRect(670, 706, 18, 134); ctx.fillRect(1772, 706, 18, 134);
    roundRect(ctx, 700, 230, 1060, 440, 10); shape(ctx, SP4.papier, '#B8B0A0', 3);
    SP4_mono(ctx, 'JAARPLAN', 740, 284, 30, SP4.inkt);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) { roundRect(ctx, 740 + c * 76, 320 + r * 82, 66, 70, 6); shape(ctx, '#FFFFFF', '#C9C2B4', 1.5); }
    SP4_mono(ctx, 'WEEK 1', 740, 662, 18, SP4.grijs); SP4_mono(ctx, 'WEEK 52', 1718, 662, 18, SP4.grijs, 'right');
    vraagteken(ctx, 1250, 230, q.on('Hoe', 1, 0.4), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord a: in blokken, elk met een eigen hoofddoel', 1);
    const BW = 180, BH = 120, GAP = 32, X0 = 330, Y0 = 330; const cam = 2700 * ease(clamp((t - q.at('Eerst', 1)) / (q.at('snelheid', 1) + 0.6 - q.at('Eerst', 1)), 0, 1));
    // legenda (vast)
    SP4_banenLegenda(ctx, 60, Y0, BH, 1);
    ctx.save(); ctx.beginPath(); ctx.rect(300, 200, W - 300, 300); ctx.clip();
    const Bl = q.on('blokken', 1, 0.6);
    for (let i = 0; i < 24; i++) { const x = X0 + i * (BW + GAP) - cam; if (x > W + 20 || x + BW < 280) continue; const hl = SP4_weekHL(i); const ok = i < 20;
      SP4_badje(ctx, x, Y0, BW, BH, ok ? (Bl > 0.5 ? hl : -1) : -1, i < 20 ? 1 : 0.35); SP4_mono(ctx, 'WEEK ' + (i + 1), x + BW / 2, Y0 + BH + 34, 18, C.text2, 'center'); }
    // blokken met hoofddoel
    const blok = (i0, i1, s, kl) => { const xa = X0 + i0 * (BW + GAP) - cam, xb = X0 + i1 * (BW + GAP) + BW - cam; if (xb < 290 || xa > W) return; ctx.save(); ctx.globalAlpha *= Bl; ctx.strokeStyle = kl; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(xa, Y0 - 30); ctx.lineTo(xa, Y0 - 44); ctx.lineTo(xb, Y0 - 44); ctx.lineTo(xb, Y0 - 30); ctx.stroke(); const xm = clamp((Math.max(xa, 300) + Math.min(xb, W)) / 2, 380, W - 160); tag(ctx, s, xm, Y0 - 62, kl, 1, 'center', 28); ctx.restore(); };
    blok(0, 7, 'BASIS', C.groen); blok(8, 13, 'KRACHT', C.oker); blok(14, 19, 'SNELHEID', C.goud);
    ctx.restore();
    SP4_laag(ctx, q.on('periodiseren', 1, 0.5) * (1 - q.on('idee', 1, 0.5)), () => SP4_begrip(ctx, 'PERIODISEREN', 'BLOKKEN MET ELK EEN HOOFDDOEL', 960, 560, 760, 1, C.goud));
    // onderhoud: de gedimde banen
    SP4_laag(ctx, SP4_fase(t, q.at('hoofddoel', 2), q.at('idee', 1) + 0.4), () => { SP4_meta(ctx, 'GEDIMD = ONDERHOUD', 960, 720, 1, C.text, 'center', 28); SP4_meta(ctx, 'MINDER TRAINING, BLIJFT OP PEIL', 960, 762, 1, C.text2, 'center', 22); });
    // het idee: alles tegelijk = halve prikkel + vermoeidheid
    const Id = q.on('idee', 1, 0.5) * (1 - q.on('Welke', 1, 0.5)); SP4_laag(ctx, Id, () => { SP4_kaart(ctx, 300, 540, 1320, 320, 1, C.koraal);
      SP4_meta(ctx, 'IDEE: ALLES TEGELIJK VOL', 340, 590, 1, C.koraal, 'left', 26); const h = 0.5 * ramp(t, q.at('alles', 1), 1.2);
      ['SNELHEID', 'KRACHT', 'DUUR'].forEach((s, i) => { const kl = [C.goud, C.oker, C.groen][i]; metaText(ctx, s, 340, 660 + i * 66, kl, 'left', 22); roundRect(ctx, 520, 632 + i * 66, 520, 38, 8); shape(ctx, rgba('#FFFFFF', 0.08), C.line, 1.5);
        if (h > 0.01) { roundRect(ctx, 520, 632 + i * 66, 520 * h, 38, 8); shape(ctx, kl, null); } });
      SP4_meta(ctx, 'HALVE PRIKKEL', 780, 850, q.on('halve', 1, 0.4), C.text, 'center', 22);
      const v = 0.15 + 0.8 * ramp(t, q.at('stapelt', 1), 2.5); metaText(ctx, 'VERMOEIDHEID', 1340, 620, C.koraal, 'center', 22); roundRect(ctx, 1300, 640, 80, 200, 10); shape(ctx, rgba('#FFFFFF', 0.06), C.line, 2);
      roundRect(ctx, 1300, 840 - 200 * v, 80, 200 * v, 10); shape(ctx, C.koraal, null); SP4_meta(ctx, 'ISSURIN 2010', 1590, 590, 1, C.grain, 'right', 20); });
    // twee verschillende plannen met een vraagteken
    SP4_laag(ctx, q.on('Welke', 1, 0.5), () => { const plan = (y, d, lab) => { metaText(ctx, lab, 330, y + 32, C.text2, 'left', 22); let x = 520; d.forEach(([n, kl]) => { roundRect(ctx, x, y, n * 46 - 6, 48, 8); shape(ctx, kl, null); x += n * 46; }); };
      plan(600, [[8, C.groen], [6, C.oker], [6, C.goud]], 'PLAN A'); plan(700, [[6, C.groen], [4, C.oker], [3, C.goud], [3, C.oker], [4, C.goud]], 'PLAN B');
      vraagteken(ctx, 1560, 720, 1, 120); SP4_meta(ctx, 'NOG NIET MET PROEVEN VASTGESTELD', 960, 830, q.on('vastgesteld', 1, 0.4), C.text, 'center', 24); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const BW = 250, BH = 140, Y0 = 250, xs = i => 160 + i * 300;
    SP4_banenLegenda(ctx, 0, 0, 0, 0);
    const lab = ['WEEK 20', 'WEEK 21', 'WEEK 22', 'WEEK 23', 'TOERNOOI'];
    for (let i = 0; i < 5; i++) { SP4_badje(ctx, xs(i), Y0, BW, BH, i < 4 ? 2 : -1, 1); SP4_mono(ctx, lab[i], xs(i) + BW / 2, Y0 - 24, 20, i === 4 ? C.goud : C.text2, 'center'); }
    // vlag
    SP4_laag(ctx, q.on('toernooi', 1, 0.5), () => { const x = xs(4) + BW - 30; ctx.fillStyle = '#C9CED6'; ctx.fillRect(x, Y0 - 140, 6, 160); ctx.beginPath(); ctx.moveTo(x + 6, Y0 - 140); ctx.lineTo(x + 96, Y0 - 115); ctx.lineTo(x + 6, Y0 - 90); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); });
    // afbouw: drie weken
    SP4_laag(ctx, q.on('Drie', 1, 0.5), () => { const xa = xs(1), xb = xs(3) + BW; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xa, Y0 - 50); ctx.lineTo(xa, Y0 - 64); ctx.lineTo(xb, Y0 - 64); ctx.lineTo(xb, Y0 - 50); ctx.stroke(); tag(ctx, 'DRIE WEKEN AFBOUWEN', (xa + xb) / 2, Y0 - 84, C.teal, 1, 'center', 28); });
    // meters per week en tempo
    const M = q.on('minder', 1, 1.6), Hf = q.on('helft', 1, 1.0), mt = [1, lerp(1, 0.75, M), lerp(1, lerp(0.75, 0.55, Hf), M), lerp(1, lerp(0.75, 0.42, Hf), M)];
    metaText(ctx, 'METERS', 120, 470, C.text2, 'left', 24); metaText(ctx, 'TEMPO', 120, 780, C.text2, 'left', 24);
    for (let i = 0; i < 4; i++) { const x = xs(i) + 60, hh = 220 * mt[i]; roundRect(ctx, x, 720 - 220, 130, 220, 8); shape(ctx, rgba('#FFFFFF', 0.05), C.line, 1.5); roundRect(ctx, x, 720 - hh, 130, hh, 8); shape(ctx, rgba(C.teal, 0.85), null);
      SP4_meta(ctx, Math.round(mt[i] * 100) + ' %', x + 65, 490, M > 0.05 && i > 0 ? 1 : (i === 0 ? 1 : 0), C.text, 'center', 22);
      const T = q.on('wedstrijdtempo', 1, 0.5); roundRect(ctx, xs(i) + 30, 790, 190, 30, 8); shape(ctx, rgba('#FFFFFF', 0.05), C.line, 1.5); roundRect(ctx, xs(i) + 30, 790, 190 * (0.9), 30, 8); shape(ctx, rgba(C.goud, 0.35 + 0.6 * T), null); }
    SP4_meta(ctx, 'VAAK DE HELFT OF MINDER', xs(3) + BW + 40, 500, q.on('helft', 1, 0.5), C.teal, 'left', 22);
    SP4_meta(ctx, 'WEDSTRIJDTEMPO', xs(3) + BW + 40, 812, q.on('wedstrijdtempo', 1, 0.5), C.goud, 'left', 22);
    SP4_tijdbord(ctx, 1420, 580, 420, 130, '100 M', '?', q.on('tijd', 1, 0.4), C.goud); },

  s15(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord c: zijn tijd wordt korter', 1);
    const B = q.on('Bij', 1, 0.6);
    SP4_laag(ctx, 1 - B, () => { const k = ramp(t, q.at('korter', 1), 1.4), s = 60 - 1.3 * k; const tijd = s >= 60 ? '1:00,0' : s.toFixed(1).replace('.', ',');
      SP4_tijdbord(ctx, 120, 230, 560, 200, 'TIJD 100 M', tijd, 1, k > 0.5 ? C.groen : '#F2C94C');
      SP4_begrip(ctx, 'TAPEREN', 'MINDER METERS, WEL WEDSTRIJDTEMPO', 400, 480, 620, q.on('taperen', 1, 0.5), C.teal);
      const I = q.on('idee', 1, 0.5); SP4_laag(ctx, I, () => { tag(ctx, 'IDEE', 1280, 250, C.goud, 1, 'center', 30); const u = ramp(t, q.at('vermoeidheid', 1), 2.8);
        const bar = (y, lab, kl, v) => { metaText(ctx, lab, 900, y - 14, kl, 'left', 24); roundRect(ctx, 900, y, 760, 50, 10); shape(ctx, rgba('#FFFFFF', 0.06), C.line, 1.5); roundRect(ctx, 900, y, 760 * v, 50, 10); shape(ctx, kl, null); };
        bar(340, 'VERMOEIDHEID', C.koraal, lerp(0.85, 0.2, u)); bar(470, 'FITHEID', C.groen, lerp(0.85, 0.78, u)); SP4_meta(ctx, 'IN DE DRIE WEKEN AFBOUWEN', 1280, 580, 1, C.text2, 'center', 22); }); });
    SP4_laag(ctx, B, () => { SP4_meta(ctx, 'SYDNEY 2000', 960, 210, q.on('Sydney', 1, 0.4), C.goud, 'center', 30);
      const V = q.on('vergeleken', 1, 0.5); SP4_laag(ctx, V, () => { SP4_kaart(ctx, 360, 250, 480, 100, 1, C.line); text(ctx, 'wedstrijd', 600, 300, fTekst(36, 700), C.text, 'center'); SP4_meta(ctx, 'DRIE WEKEN EERDER', 600, 336, 1, C.text2, 'center', 22);
        pijl(ctx, 870, 300, 1050, 300, C.goud, 1, 5, 20); SP4_kaart(ctx, 1080, 250, 480, 100, 1, C.goud); text(ctx, 'Spelen', 1320, 300, fTekst(36, 700), C.goud, 'center'); SP4_meta(ctx, 'OLYMPISCHE TIJD', 1320, 336, 1, C.text2, 'center', 22); });
      const N = q.on('negenennegentig', 1, 0.6), G = q.on('eenennegentig', 1, 0.8);
      SP4_laag(ctx, N, () => { for (let i = 0; i < 99; i++) { const c = i % 11, r = Math.floor(i / 11); circ(ctx, 330 + c * 42, 420 + r * 42, 15, i < 91 && G > (i / 91) ? C.goud : '#4A5468'); }
        SP4_meta(ctx, '99 RACES', 540, 818, 1, C.text2, 'center', 22); SP4_meta(ctx, '91 SNELLER', 540, 852, G, C.goud, 'center', 22); });
      SP4_laag(ctx, q.on('procent', 1, 0.4), () => text(ctx, '± 2 %', 1000, 520, fTekst(110, 800), C.goud, 'left'));
      SP4_laag(ctx, q.on('Daarin', 1, 0.4), () => { tag(ctx, 'AFBOUWEN', 1090, 610, C.teal, 1, 'center', 28); text(ctx, '+', 1250, 612, fTekst(48, 800), C.text, 'center'); tag(ctx, 'SPANNING', 1420, 610, C.koraal, q.on('spanning', 1, 0.4), 'center', 28); });
      SP4_laag(ctx, q.on('Op', 1, 0.5), () => { SP4_kaart(ctx, 1000, 680, 700, 110, 1, C.goud); text(ctx, '100 m: ± 1 seconde', 1350, 748, fTekst(46, 800), C.text, 'center'); });
      SP4_meta(ctx, 'MUJIKA E.A. 2002 · SYDNEY 2000', 1880, 860, q.on('vergeleken', 1, 0.4), C.grain, 'right', 22); }); },

  // ---------- H4 Herstel hoort bij de training ----------
  s16(ctx, t, q) { const Sl = q.on('Slaap', 1, 0.6);
    if (Sl < 1) { bg(ctx, 'schema'); SP4_laag(ctx, 1 - Sl, () => { const v = q.on('vierde', 1, 0.5);
      SP4_doelBord(ctx, 160, 200, 680, 620, [0.6, 0.6, 0.6, 0.6 * ramp(t, q.at('herstel', 1), 1)], 1, { n: 4, vierde: v, kop: 'HET PLAN' });
      const U = q.on('uren', 1, 0.5); SP4_laag(ctx, U, () => { const y = 430; roundRect(ctx, 960, y, 220, 90, 12); shape(ctx, rgba(C.oker, 0.85), null); metaText(ctx, 'TRAINING', 1070, y + 56, '#0D1420', 'center', 24);
        roundRect(ctx, 1200, y, 420 * ramp(t, q.at('uren', 1), 1.2), 90, 12); shape(ctx, rgba(C.teal, 0.85), null); SP4_meta(ctx, 'HERSTEL: UREN EN DAGEN', 1410, y + 56, ramp(t, q.at('uren', 1) + 0.6, 0.4), '#0D1420', 'center', 22);
        pijl(ctx, 1640, y + 80, 1740, y - 40, C.groen, ramp(t, q.at('training', 1), 0.5), 6, 22); SP4_meta(ctx, 'STERKER', 1740, y - 60, ramp(t, q.at('training', 1), 0.5), C.groen, 'center', 26); });
      SP4_meta(ctx, 'HERSTEL STAAT IN HET PLAN', 1340, 660, q.on('Daarom', 1, 0.4), C.teal, 'center', 26); }); }
    if (Sl <= 0.01) return; SP4_laag(ctx, Sl, () => { SP4_kamer(ctx); SP4_bed(ctx, 'sam', 360, 765, 430, { t });
      SP4_nachtkastje(ctx, 1080, 670, 320); SP4_wekker(ctx, 1160, 668, q.on('Vroege', 1, 0.4)); SP4_bord(ctx, 1290, 664, q.on('eten', 1, 0.4)); SP4_bidon(ctx, 1370, 668, q.on('drinken', 1, 0.4));
      SP4_meta(ctx, 'WALSH E.A. 2021', 1880, 860, q.on('Experts', 1, 0.4), C.grain, 'right', 22);
      tag(ctx, 'MEER SLAAP NODIG?', 760, 300, C.teal, SP4_fase(t, q.at('Experts', 1), q.at('Vroege', 1) + 0.3), 'center', 30);
      tag(ctx, 'VROEG OP = MINDER SLAAP', 760, 300, C.koraal, SP4_fase(t, q.at('Vroege', 1), q.at('lichaam', 1) + 0.3), 'center', 30);
      tag(ctx, 'GENOEG ETEN EN DRINKEN', 760, 300, C.groen, SP4_fase(t, q.at('lichaam', 1), q.at('vaste', 1) + 0.3), 'center', 30);
      SP4_week(ctx, 1250, 470, 70, q.on('rustdag', 1, 0.5), { rust: 6, kop: 'ELKE WEEK EEN RUSTDAG' }); }); },

  s17(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_tijdbord(ctx, 1180, 110, 600, 180, '100 M VRIJ', '1:02,4', q.on('trager', 1, 0.4), C.koraal);
    SP4_meta(ctx, 'EERDER 1:00,4', 1780, 330, q.on('trager', 1, 0.4), C.text2, 'right', 24);
    SP4_sam(ctx, 620, t, { uit: q.on('slaapt', 1) > 0.5 ? 'moe' : 'bezorgd', kijk: 1 });
    wolk(ctx, 760, 150, 360, 110, 'slecht geslapen', q.on('slaapt', 1, 0.4), '#F2F2EE', 32);
    wolk(ctx, 820, 300, 300, 100, 'geen zin', q.on('nergens', 1, 0.4), '#F2F2EE', 32);
    vraagteken(ctx, 1480, 600, q.on('verstandig', 1, 0.4), 120); },

  s19(ctx, t, q) { const B = q.on('Langdurig', 1, 0.6), Cc = q.on('Zulke', 1, 0.6);
    if (B < 1) { SP4_hal(ctx, { t }); SP4_laag(ctx, 1 - B, () => { SP4_trainer(ctx, 700, t, { kijk: 1, uit: 'praat', pose: 'wijs' }); SP4_sam(ctx, 1040, t, { kijk: -1, uit: 'neutraal' });
      tag(ctx, 'MINDER TRAINEN', 870, 250, C.teal, q.on('minder', 1, 0.4), 'center', 32); tag(ctx, 'BESPREKEN MET TRAINER EN SPORTARTS', 870, 330, C.goud, q.on('bespreken', 1, 0.4), 'center', 30); }); }
    if (B > 0.01 && Cc < 1) SP4_laag(ctx, B * (1 - Cc), () => { bg(ctx, 'schema');
      const g = [{ s: 'TRAINING', a: 1 }, { s: 'SCHOOL', a: q.on('school', 1, 0.5) }, { s: 'WEINIG SLAAP', a: q.on('slaap', 1, 0.5) }, { s: 'TE WEINIG ETEN', a: q.on('eten', 1, 0.5) }, { s: 'EXTRA TRAINEN', a: q.on('Extra', 1, 0.5), kl: C.koraal }];
      const kant = 0.04 + g.slice(1).reduce((s, x) => s + 0.06 * x.a, 0);
      SP4_balans(ctx, 860, 300, kant, g, 1);
      SP4_begrip(ctx, 'OVERTRAINING', 'BELASTING EN HERSTEL NIET IN BALANS', 1500, 560, 700, q.on('overtraining', 1, 0.5), C.koraal);
      kruis(ctx, 230, 360, 26, q.on('erger', 1, 0.4)); SP4_meta(ctx, 'MAAKT HET ERGER', 230, 420, q.on('erger', 1, 0.4), C.koraal, 'center', 22);
      SP4_laag(ctx, q.on('één', 1, 0.5), () => { SP4_week(ctx, 1260, 720, 52, 1, { alles: true, kop: 'ÉÉN WEEK RUST' }); kruis(ctx, 1710, 750, 24, q.on('snel', 1, 0.4)); });
      tag(ctx, 'WEKEN → MAANDEN', 1740, 850, C.teal, q.on('weken', 1, 0.4), 'center', 30); });
    if (Cc > 0.01) SP4_laag(ctx, Cc, () => { SP4_hal(ctx, { t }); const Ar = SP4_fase(t, q.at('andere', 1), q.at('trainer', 2) + 0.4, 0.3);
      SP4_trainer(ctx, 560, t, { kijk: 1, uit: q.on('trainer', 2) > 0.5 ? 'praat' : 'neutraal', pose: 'staan' });
      persoon(ctx, 'kim', 820, SP4_GROND, 430, { t, kijk: 1, uit: 'blij', a: Ar });
      SP4_meta(ctx, 'SPORTARTS', 820, 380, Ar, C.text2, 'center', 24);
      SP4_sam(ctx, 1100, t, { kijk: -1, uit: 'neutraal' });
      SP4_logboek(ctx, 1340, 300, q.on('trainer', 2, 0.5), ramp(t, q.at('snel', 2), 2.0));
      SP4_meta(ctx, 'MEEUSEN E.A. 2013', 1880, 860, 1, C.grain, 'right', 22); });
    SP4_antw(ctx, 'antwoord b: minder trainen en het bespreken', 1); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Deels', 1, 1.0);
    // klembord met vier balken → jaarplan
    SP4_laag(ctx, 1 - D, () => SP4_doelBord(ctx, 560, 180, 800, 640, [0.7, 0.7, 0.7, 0.7], 1, { n: 4, kop: 'HET PLAN' }));
    SP4_laag(ctx, D, () => { metaText(ctx, 'JAARPLAN', 120, 150, C.text2, 'left', 26); const seg = [[8, C.groen, 'BASIS'], [6, C.oker, 'KRACHT'], [6, C.goud, 'SNELHEID'], [3, C.teal, 'AF'], [1, C.goud, '']]; let x = 120;
      seg.forEach(([n, kl, s], i) => { const w = n * 56 - 6; roundRect(ctx, x, 180, w * ramp(t, q.at('Deels', 1) + i * 0.15, 0.4), 70, 10); shape(ctx, kl, null); if (s) metaText(ctx, s, x + w / 2, 226, '#0D1420', 'center', 22); x += n * 56; });
      ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 40, 150, 5, 110); ctx.beginPath(); ctx.moveTo(x - 35, 150); ctx.lineTo(x + 25, 166); ctx.lineTo(x - 35, 182); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); });
    const kaartjes = [['HELPEN: AEROBE BASIS → HERSTEL', C.groen, 'helpen'], ['BOTSEN: VOORAL EXPLOSIEVE KRACHT', C.koraal, 'remmen'], ['BLOKKEN + AFBOUWEN', C.goud, 'blok'], ['HERSTEL HOORT ERBIJ', C.teal, 'winst']];
    kaartjes.forEach(([s, kl, cue], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; SP4_laag(ctx, a, () => { const y = 320 + i * 132; roundRect(ctx, 120, y, 1140, 104, 16); shape(ctx, rgba('#0D1420', 0.9), kl, 3); metaText(ctx, s, 160, y + 64, kl, 'left', 30); }); });
    SP4_laag(ctx, D, () => { SP4_blok(ctx, 1600, SP4_GROND, 1.25, '4'); SP4_sam(ctx, 1600, t, { y: SP4_GROND - 228, uit: 'blij', h: 420 }); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 460, 100, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 490, 170, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 1060, 166, C.grain, 'right', 28);
    const rij = [['diploma', 'Trainer-coach', 'LANDELIJKE KWALIFICATIES · NOC*NSF', 'Trainersdiploma', C.goud], ['hbo', 'Sportkunde', 'BV. NIJMEGEN · VAAK SPORTTRAINER', 'Sportkunde', C.groen], ['wo', 'Bewegingswetenschappen', 'VU AMSTERDAM · GRONINGEN', 'Bewegingswetenschappen', C.teal]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; SP4_laag(ctx, a, () => { const y = 240 + i * 170;
      roundRect(ctx, 460, y, 1000, 140, 18); shape(ctx, rgba('#0D1420', 0.92), kl, 2); text(ctx, n, 500, y + 66, fTitel(40), kl); text(ctx, o, 700, y + 66, fTekst(40, 700), C.text); metaText(ctx, m, 700, y + 112, C.grain, 'left', 24); }); });
    SP4_trainer(ctx, 230, t, { uit: 'blij', kijk: 1 }); SP4_meta(ctx, 'ZWEMTRAINER', 230, 380, q.on('zwemtrainer', 1, 0.4), C.text2, 'center', 22);
    SP4_lab(ctx, 1380, 640, q.on('Proeven', 1, 0.5), t);
    persoon(ctx, 'passant', 1810, SP4_GROND, 430, { t, kijk: -1, uit: 'blij', outfit: 'lab', a: q.on('Proeven', 1, 0.4) });
    SP4_meta(ctx, 'INSPANNINGSFYSIOLOOG', 1890, 340, q.on('inspanningsfysiologen', 1, 0.4), C.text2, 'right', 22); }
});
// vaste legenda van de banen links naast de rij baden (s12)
function SP4_banenLegenda(ctx, x, y, h, a = 1) { if (a <= 0.01 || h <= 0) return; ctx.save(); ctx.globalAlpha *= a; const bh = h / 3;
  SP4_BANEN.forEach(([s, kl], i) => metaText(ctx, s, x + 210, y + i * bh + bh / 2 + 8, C[kl], 'right', 22)); ctx.restore(); }

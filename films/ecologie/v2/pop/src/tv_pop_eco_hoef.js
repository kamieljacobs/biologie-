// Testvel ecologie v2, familie hoef (POPBRIEF.md): overlay op de omtrek van de vlakke rij, uit elkaar, gangstroken met steunlijnen,
// 6 tussenstanden per grote beweging, zooms (schouder, heup, kop, poten) en alle dieren op ware grootte naast het edelhert (maatstok).
const EHTV = (() => {
  const NAVY = '#16213A';
  function bg(ctx, titel) { ctx.fillStyle = NAVY; ctx.fillRect(0, 0, 1920, 1080); if (titel) { ctx.fillStyle = '#E8E2D6'; ctx.font = '600 30px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(titel, 40, 50); } }
  function label(ctx, t, x, y, c = '#C9B48A', size = 22, al = 'center') { ctx.fillStyle = c; ctx.font = `500 ${size}px "IBM Plex Mono", monospace`; ctx.textAlign = al; ctx.fillText(t, x, y); }
  function grond(ctx, x0, x1, y) { ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
  function omtrek(ctx, n, x, y, s, o = {}) { const P = ECO_HOEF[n], O = ECO_HOEF_VORM[P.D.vorm || n].omtrek; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(-(P.D.anker || 0), 0); ctx.beginPath();
    O.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = o.c || '#F2C14E'; ctx.lineWidth = o.lw || 2; ctx.setLineDash([7, 5]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  function steun(ctx, P, I, x, y, s) { for (const L of ['V', 'VF', 'A', 'AF']) { const v = I.voeten[L]; if (!v || !v.teen) continue; const px = x + (v.teen[0] - P.D.anker) * s;
      if (v.steun && v.teen[1] > -1.5) { ctx.strokeStyle = L.length > 1 ? '#78C8FF' : '#FF785A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + 4); ctx.lineTo(px, y + 26); ctx.stroke(); }
      if (v.rek > 1.01) { ctx.fillStyle = '#F33'; ctx.beginPath(); ctx.arc(px, y - 4, 6, 0, 6.283); ctx.fill(); } } }
  function zoom(ctx, P, o, cx, cy, s, vak, titel) { ctx.save(); ctx.beginPath(); ctx.rect(...vak); ctx.clip(); ctx.fillStyle = '#1C2944'; ctx.fillRect(...vak);
    P.teken(ctx, vak[0] + vak[2] / 2 - (cx - P.D.anker) * s, vak[1] + vak[3] / 2 - cy * s, s, o); ctx.restore(); ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.strokeRect(...vak); if (titel) label(ctx, titel, vak[0] + 10, vak[1] + 26, '#C9B48A', 18, 'left'); }
  return { bg, label, grond, omtrek, steun, zoom };
})();
const EHTV_N = ['schaap', 'ree', 'moeflon', 'wildzwijn', 'frisling'];
// houdingen en gangen per dier (voor de stroken en de film)
const EHTV_GANG = { schaap: ['lopen'], ree: ['lopen', 'sprong'], moeflon: ['lopen', 'rennen'], wildzwijn: ['lopen', 'draven'], frisling: ['lopen', 'draven'] };
const EHTV_HOUD = { schaap: ['staan', 'grazen', 'liggen'], ree: ['staan', 'grazen', 'liggen'], moeflon: ['staan', 'grazen'], wildzwijn: ['staan', 'wroeten'], frisling: ['staan'] };
const TV_pop_eco_hoef = {};
// overlay: staan op de omtrek van de vlakke rij, groot
for (const n of EHTV_N) TV_pop_eco_hoef['over_' + n] = (ctx) => { const P = ECO_HOEF[n], s = 640 / P.D.H; EHTV.bg(ctx, n + ': staan op de omtrek van de vlakke plaat (goud), links pop, rechts met skelet'); EHTV.grond(ctx, 20, 1900, 980);
  P.teken(ctx, 500, 980, s, { houding: 'staan' }); EHTV.omtrek(ctx, n, 500, 980, s); P.teken(ctx, 1420, 980, s, { houding: 'staan', a: 0.45, skelet: 1 }); };
// uit elkaar
for (const n of EHTV_N) TV_pop_eco_hoef['delen_' + n] = (ctx) => { const P = ECO_HOEF[n], s = 520 / P.D.H; EHTV.bg(ctx, n + ': uit elkaar (draaipunten als stip)');
  const L = [['romp', 0, 0], ['nek', 40, -30], ['kop', 80, -60], ['kaak', 110, -10], ['hum', 20, 40], ['dij', -30, 40], ['staart', -50, 0], ['kruis', 0, -60], ['rad', 30, 90], ['mc', 30, 130], ['vp', 30, 160], ['schn', -40, 90], ['mt', -40, 130], ['ap', -40, 160]];
  ctx.save(); ctx.translate(900, 820); ctx.scale(s, s); ctx.translate(-P.D.anker, 0);
  for (const [k, dx, dy] of L) { const pts = P.deel(ctx, k, dx * 0.6, dy * 0.6); ctx.fillStyle = '#FF5252'; for (const p of pts) { ctx.beginPath(); ctx.arc(p[0], p[1], 0.9 * P.D.H / 72, 0, 6.283); ctx.fill(); } }
  if (P.D.TEKEN) for (const k in P.D.TEKEN) { const tk = P.D.TEKEN[k]; ctx.save(); ctx.translate(30, -50); tk.f(ctx, P.PAL, 'vul', false, P.RESTA, P.BOT); ctx.restore(); }
  ctx.restore(); };
// gangstroken: 8 fasen met steunlijnen; plus 6 tussenstanden over één cyclus naast elkaar op één grondlijn (glijden zichtbaar)
function _ehtvGang(n, g, sk) { return (ctx) => { const P = ECO_HOEF[n], s = 250 / P.D.H * (n === 'wildzwijn' ? 0.85 : n === 'frisling' ? 0.8 : 1); EHTV.bg(ctx, n + ' · ' + g + ' (8 fasen; rood = nabij in steun, blauw = ver, rode stip = poot te kort)');
  for (let i = 0; i < 8; i++) { const t = i / 8, x = 240 + (i % 4) * 480, y = i < 4 ? 500 : 1010; EHTV.grond(ctx, x - 230, x + 230, y); P.teken(ctx, x, y, s, { houding: g, t, skelet: sk, a: sk ? 0.6 : 1 }); EHTV.steun(ctx, P, P.info({ houding: g, t }), x, y, s);
    EHTV.label(ctx, 't=' + t.toFixed(3), x, y + 50, '#8C97AE', 20); } }; }
for (const n of EHTV_N) for (const g of EHTV_GANG[n]) { TV_pop_eco_hoef['g_' + n + '_' + g] = _ehtvGang(n, g); TV_pop_eco_hoef['gs_' + n + '_' + g] = _ehtvGang(n, g, 1); }
// 6 tussenstanden (wereldpositie: het dier schuift mee, steunvoet hoort stil te staan)
function _ehtvZes(n, g) { return (ctx) => { const P = ECO_HOEF[n], s = 330 / P.D.H; EHTV.bg(ctx, n + ' · ' + g + ': 6 tussenstanden over één cyclus, wereldpositie (steunvoet = stip, mag niet schuiven)'); const y0 = 1000;
  for (let i = 0; i < 6; i++) { const t = i / 6, y = y0 - i * 0; const x = 300 + i * 0; ctx.save(); ctx.globalAlpha = 1; const row = i % 2 ? 1 : 0; ctx.restore(); }
  for (let i = 0; i < 6; i++) { const t = i / 6, x = 170 + (i % 3) * 620, y = i < 3 ? 470 : 1000; EHTV.grond(ctx, x - 160, x + 460, y); P.teken(ctx, x + 150, y, s, { houding: g, t, wereld: 1 }); const I = P.info({ houding: g, t });
    const dx = P.SNELHEID[g] * t; for (const L of ['V', 'VF', 'A', 'AF']) { const v = I.voeten[L]; if (!v.steun || v.teen[1] < -1.5) continue; const px = x + 150 + (v.teen[0] + dx - P.D.anker) * s; ctx.fillStyle = L.length > 1 ? '#78C8FF' : '#FF785A'; ctx.beginPath(); ctx.arc(px, y + 10, 6, 0, 6.283); ctx.fill(); }
    EHTV.label(ctx, 't=' + t.toFixed(2), x + 150, y + 44, '#8C97AE', 20); } }; }
for (const n of EHTV_N) for (const g of EHTV_GANG[n]) TV_pop_eco_hoef['zes_' + n + '_' + g] = _ehtvZes(n, g);
// houdingen + overgang in 6 tussenstanden (staan -> houding), gemengd met P.meng
for (const n of EHTV_N) TV_pop_eco_hoef['houd_' + n] = (ctx) => { const P = ECO_HOEF[n], s = 300 / P.D.H; const H = EHTV_HOUD[n]; EHTV.bg(ctx, n + ': houdingen (boven) en ' + (H[1] || 'staan') + ' in 6 tussenstanden (onder)');
  H.forEach((h, i) => { const x = 330 + i * 620; EHTV.grond(ctx, x - 300, x + 300, 470); P.teken(ctx, x, 470, s * 0.95, { houding: h, t: 0.25 }); EHTV.label(ctx, h, x, 510, '#8C97AE', 20); });
  if (H[1]) { const A = P.stand({ houding: 'staan' }), B = P.stand({ houding: H[1], t: 0 }); for (let i = 0; i < 6; i++) { const w = i / 5, x = 170 + i * 316; EHTV.grond(ctx, x - 150, x + 150, 1000); P.teken(ctx, x, 1000, s * 0.48, { stand: P.meng(A, B, w) }); EHTV.label(ctx, 'w=' + w.toFixed(1), x, 1040, '#8C97AE', 18); } } };
// zooms: schouder, heup, kop, voorvoet, achtervoet (staan en lopen t=0,3)
for (const n of EHTV_N) TV_pop_eco_hoef['zoom_' + n] = (ctx) => { const P = ECO_HOEF[n], z = 720 / P.D.H; EHTV.bg(ctx, n + ': zooms (boven staan, onder lopen t=0,3): schouder, heup, kop, voorvoet, achtervoet');
  for (const [r, o] of [[0, { houding: 'staan' }], [1, { houding: 'lopen', t: 0.3 }]]) { const I = P.info(o); const L = [['schouder', I.piv.hum, 1.4], ['heup', I.piv.dij, 1.4], ['kop', I.piv.kop, 1.6], ['voorvoet', I.eind('mc'), 2.6], ['achtervoet', I.eind('mt'), 2.6]];
    L.forEach(([t, c, f], i) => EHTV.zoom(ctx, P, o, c[0] + (t === 'kop' ? 8 * P.D.H / 72 : 0), c[1] + (t.endsWith('voet') ? 2 : 0), z * f * 0.5, [20 + i * 378, 80 + r * 500, 368, 490], t)); } };
// ware grootte: alle dieren naast het edelhert (maatstok) en de wolf, zelfde px/cm; meetlat in cm
TV_pop_eco_hoef.ware_grootte = (ctx) => { EHTV.bg(ctx, 'Ware grootte, raster 20 cm; maatstok edelhert 120 cm. Schoft: wolf 80, schaap 72, ree 72, moeflon 75, zeug 80, frisling 32 cm'); const s = 2.3;
  const rij = (y, L) => { ctx.strokeStyle = '#2E3A56'; ctx.lineWidth = 1; for (let h = 20; h <= 180; h += 20) { const yy = y - h * s; ctx.beginPath(); ctx.moveTo(20, yy); ctx.lineTo(1900, yy); ctx.stroke(); EHTV.label(ctx, h + '', 1895, yy - 4, '#5A6680', 14, 'right'); }
    EHTV.grond(ctx, 20, 1900, y); for (const [n, x] of L) { if (n === 'edelhert') HOEF.edelhert.teken(ctx, x, y, s, { houding: 'staan' }); else if (n === 'wolf') wolf(ctx, x, y, s, { houding: 'staan' }); else ECO_HOEF[n].teken(ctx, x, y, s, { houding: 'staan' }); EHTV.label(ctx, n, x, y + 30, '#C9B48A', 18); } };
  rij(520, [['edelhert', 220], ['wolf', 650], ['schaap', 1050], ['ree', 1460]]); rij(1000, [['edelhert', 220], ['moeflon', 640], ['wildzwijn', 1080], ['frisling', 1440]]); };
// ree zonder gewei (geit), moeflon ooi, kopvergelijking
TV_pop_eco_hoef.varianten = (ctx) => { EHTV.bg(ctx, 'Varianten: reebok / reegeit (o.gewei false), moeflonram / ooi (o.hoorns false), zeug / frisling (o.jong)'); const y = 900, s = 5.2;
  EHTV.grond(ctx, 20, 1900, y); ree(ctx, 230, y, s, {}); ree(ctx, 640, y, s, { gewei: false }); moeflon(ctx, 1050, y, s, {}); moeflon(ctx, 1450, y, s, { hoorns: false }); wildzwijn(ctx, 1780, y, s * 0.6, { jong: true });
  EHTV.label(ctx, 'bok', 230, y + 40); EHTV.label(ctx, 'geit', 640, y + 40); EHTV.label(ctx, 'ram', 1050, y + 40); EHTV.label(ctx, 'ooi', 1450, y + 40); EHTV.label(ctx, 'frisling', 1780, y + 40); };
TV_pop_eco_hoef.koppen = (ctx) => { EHTV.bg(ctx, 'Koppen (staan), groot'); EHTV_N.forEach((n, i) => { const P = ECO_HOEF[n], I = P.info({ houding: 'staan' }), c = I.piv.kop; EHTV.zoom(ctx, P, { houding: 'staan' }, c[0] + 6 * P.D.H / 72, c[1] + 6 * P.D.H / 72, 1150 / P.D.H * 0.75, [20 + i * 378, 80, 368, 960], n); }); };
// plaat (vlakke rij, boven) naast de pop in dezelfde houdingen (onder), zelfde schaal; de plaat wordt als <img> geladen (alleen voor het testvel)
const EHTV_IMG = {}; for (const p of ['schaap', 'ree', 'moeflon', 'wildzwijn']) { try { const im = new Image(); im.src = 'file:///root/biologie-/referentie/dieren/ecologie/' + p + '.webp'; EHTV_IMG[p] = im; } catch (e) {} }
// per dier: [plaat, y0 vlakke rij, y1, grond (px), [[houding, x-midden (px), t, opties], ...]]
const EHTV_PLAAT = {
  schaap: ['schaap', 370, 600, 589, [['staan', 150, 0], ['lopen', 434, 0.62], ['grazen', 700, 0], ['liggen', 940, 0]]],
  ree: ['ree', 360, 640, 632, [['staan', 125, 0], ['lopen', 355, 0.62], ['grazen', 580, 0], ['sprong', 815, 0.5], ['liggen', 1000, 0]]],
  moeflon: ['moeflon', 365, 640, 631, [['staan', 140, 0], ['lopen', 405, 0.62], ['grazen', 690, 0], ['rennen', 950, 0.5]]],
  wildzwijn: ['wildzwijn', 395, 570, 559, [['staan', 132, 0], ['lopen', 370, 0.62], ['wroeten', 600, 0.2], ['draven', 828, 0.5], ['staan', 1035, 0, 'frisling']]],
};
for (const n in EHTV_PLAAT) TV_pop_eco_hoef['plaat_' + n] = (ctx) => { const [p, y0, y1, g, L] = EHTV_PLAAT[n], P = ECO_HOEF[n], K = ECO_HOEF_VORM[n].px[2], f = 1.45, H = (y1 - y0) * f;
  EHTV.bg(ctx, n + ': vlakke rij van de plaat (boven) en de pop in dezelfde houdingen, zelfde schaal (onder)'); const im = EHTV_IMG[p];
  ctx.fillStyle = '#BDBDBD'; ctx.fillRect(0, 70, 1920, H); if (im && im.complete && im.naturalWidth) ctx.drawImage(im, 0, y0, 1280, y1 - y0, 0, 70, 1280 * f, H);
  const gy = 70 + H + 30 + (g - y0) * f; EHTV.grond(ctx, 0, 1920, gy);
  for (const [h, x, t, ander] of L) { const Q = ander ? ECO_HOEF[ander] : P, k = ander ? ECO_HOEF_VORM[ander].px[2] : K; _ecoWrap(ctx, Q, x * f, gy, k * f, { houding: h, t }); EHTV.label(ctx, h, x * f, gy + 36, '#8C97AE', 18); } };
// grote overgang staan -> houding in 6 tussenstanden (gezoomd), om gaten halverwege te zien
for (const [n, h] of [['schaap', 'grazen'], ['schaap', 'liggen'], ['ree', 'grazen'], ['ree', 'liggen'], ['moeflon', 'grazen'], ['wildzwijn', 'wroeten']]) TV_pop_eco_hoef['reeks_' + n + '_' + h] = (ctx) => { const P = ECO_HOEF[n], s = 520 / P.D.H * 0.62;
  EHTV.bg(ctx, n + ': staan -> ' + h + ' in 6 tussenstanden'); const A = P.stand({ houding: 'staan' }), B = P.stand({ houding: h, t: 0 });
  for (let i = 0; i < 6; i++) { const w = i / 5, x = 330 + (i % 3) * 630, y = i < 3 ? 520 : 1030; EHTV.grond(ctx, x - 300, x + 300, y); P.teken(ctx, x - 40, y, s, { stand: P.meng(A, B, w), zonder: [] }); EHTV.label(ctx, 'w=' + w.toFixed(1), x, y + 36, '#8C97AE', 18); } };
// zoom op hals/keel tijdens een overgang (w = 0,2 .. 1,0)
for (const [n, h] of [['schaap', 'grazen'], ['ree', 'grazen'], ['moeflon', 'grazen'], ['wildzwijn', 'wroeten']]) TV_pop_eco_hoef['keel_' + n] = (ctx) => { const P = ECO_HOEF[n], A = P.stand({ houding: 'staan' }), B = P.stand({ houding: h, t: 0 }), z = 1100 / P.D.H * 0.55;
  EHTV.bg(ctx, n + ': hals en keel bij staan -> ' + h + ' (w = 0,2 / 0,4 / 0,6 / 0,8 / 1,0), ingezoomd');
  for (let i = 0; i < 5; i++) { const st = P.meng(A, B, (i + 1) / 5), I = P.info({ stand: st }); const c = I.piv.nek; EHTV.zoom(ctx, P, { stand: st }, c[0] + 4, c[1] + 12, z, [20 + i * 378, 80, 368, 960], 'w=' + ((i + 1) / 5).toFixed(1)); } };
TV_pop_eco_hoef.kop_ree_lig = (ctx) => { const P = ECO_HOEF.ree; EHTV.bg(ctx, 'ree: kop/hals ingezoomd bij staan, grazen w=0,2 en liggen');
  const A = P.stand({ houding: 'staan' }); [[{ houding: 'staan' }], [{ stand: P.meng(A, P.stand({ houding: 'grazen' }), 0.2) }], [{ houding: 'liggen' }]].forEach(([o], i) => { const I = P.info(o), c = I.piv.kop; EHTV.zoom(ctx, P, o, c[0] - 4, c[1] + 14, 14, [20 + i * 630, 80, 620, 960]); }); };
// ---- film (render_film_eco_hoef.py): 10 s, 24 fps. Rustige achtergrond (lucht + grasland), dier beweegt door het beeld; overgangen = menging van standen ----
TV_pop_eco_hoef.film = (ctx, f) => { const fps = 24, t = f / fps, W = 1920, gy = 900;
  const lucht = ctx.createLinearGradient(0, 0, 0, gy); lucht.addColorStop(0, '#1B2A44'); lucht.addColorStop(1, '#2C4058'); ctx.fillStyle = lucht; ctx.fillRect(0, 0, W, gy);
  ctx.fillStyle = '#3E5A3A'; ctx.fillRect(0, gy, W, 1080 - gy); ctx.fillStyle = '#47653F'; ctx.fillRect(0, gy, W, 10);
  const graspol = (cam, sc) => { for (let k = -2; k < 30; k++) { const wx = k * 260 + (k * 97 % 130); const px = ((wx - cam) % (30 * 260) + 30 * 260) % (30 * 260) - 200; if (px > W + 100) continue; // graspollen in de wereld: schuiven met de camera mee (voeten glijden niet)
      ctx.fillStyle = '#56763F'; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(px + j * 9, gy + 4); ctx.lineTo(px + j * 9 + 3 + (j - 1.5) * 3, gy - 14 - (j % 2) * 6); ctx.lineTo(px + j * 9 + 7, gy + 4); ctx.closePath(); ctx.fill(); } } };
  // segmenten: [t0, t1, dier, [[houding, duur(s), freq(Hz)], ...], px/cm, label]
  const SEG = [[0, 2.6, 'schaap', [['lopen', 1.3, 0.9], ['grazen', 1.3, 0]], 6.2, 'schaap (Texelaar) · stap, grazen en kauwen'],
    [2.6, 5.0, 'ree', [['lopen', 0.9, 0.95], ['sprong', 1.5, 1.6]], 5.6, 'ree (bok) · stap, vluchtsprong'],
    [5.0, 7.2, 'moeflon', [['lopen', 1.0, 0.95], ['rennen', 1.2, 1.7]], 5.6, 'moeflon (ram) · stap, rennen'],
    [7.2, 10.0, 'wildzwijn', [['lopen', 1.0, 0.85], ['wroeten', 1.0, 0.8], ['draven', 0.8, 1.5]], 5.2, 'wild zwijn (zeug) met frisling · stap, wroeten, draf']];
  const S = SEG.find(z => t >= z[0] && t < z[1]) || SEG[SEG.length - 1]; const [t0, , n, L, s, label] = S, P = ECO_HOEF[n]; let ts = t - t0;
  // positie: integraal van de snelheid (stilstaan bij grazen/wroeten), menging 0,25 s bij elke wissel
  let x = 0, i = 0, acc = 0; const v = (h, fr) => (P.SNELHEID[h] || 0) * fr;
  for (i = 0; i < L.length; i++) { const [h, d, fr] = L[i]; const dt = Math.min(d, ts - acc); if (dt <= 0) break; x += v(h, fr) * dt; acc += d; if (ts < acc) break; }
  i = Math.min(i, L.length - 1); const [h, d, fr] = L[i], tin = ts - (acc - d); const fase = h === 'grazen' || h === 'wroeten' ? tin * 0.9 : tin * fr;
  let st = P.stand({ houding: h, t: fase % 1 }); const mw = 0.25; if (i > 0 && tin < mw) { const [hp, dp, frp] = L[i - 1]; const stp = P.stand({ houding: hp, t: ((hp === 'grazen' || hp === 'wroeten') ? dp * 0.9 : dp * frp) % 1 }); const w = tin / mw; st = P.meng(stp, st, w * w * (3 - 2 * w)); }
  const X = { schaap: 820, ree: 860, moeflon: 860, wildzwijn: 1000 }[n]; graspol(x * s, s); // camera volgt het dier
  const o = { stand: st }; if (n === 'wildzwijn' && h === 'wroeten') { ctx.fillStyle = '#4E3D2E'; const I = P.info({ stand: st }), nn = I.eind('kop'), gx = X + (nn[0] - P.D.anker) * s; ctx.beginPath(); ctx.ellipse(gx + 6, gy + 2, 70, 14, 0, Math.PI, 2 * Math.PI); ctx.fill(); }
  if (n === 'wildzwijn') { const F = ECO_HOEF.frisling, hf = h === 'wroeten' ? 'staan' : h === 'draven' ? 'draven' : 'lopen'; ecoFrisling(ctx, X - 420, gy, s, { houding: hf, t: (x / F.SNELHEID[hf === 'staan' ? 'lopen' : hf]) % 1 }); } // fase uit de afgelegde weg: de frisling loopt even snel als de zeug zonder te glijden
  P.teken(ctx, X, gy, s, o);
  ctx.fillStyle = 'rgba(14,20,34,0.55)'; ctx.fillRect(40, 40, 900, 64); ctx.fillStyle = '#E8E2D6'; ctx.font = '600 34px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(label, 60, 84); };
TV_pop_eco_hoef.film_overzicht = (ctx) => { const fr = [10, 45, 80, 110, 150, 175, 200, 230]; const c2 = document.createElement('canvas'); c2.width = 1920; c2.height = 1080; const g = c2.getContext('2d');
  ctx.fillStyle = '#16213A'; ctx.fillRect(0, 0, 1920, 1080); fr.forEach((f, i) => { g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1920, 1080); TV_pop_eco_hoef.film(g, f); ctx.drawImage(c2, (i % 4) * 480, Math.floor(i / 4) * 540, 480, 270); EHTV.label(ctx, 'f' + f, (i % 4) * 480 + 240, Math.floor(i / 4) * 540 + 300, '#C9B48A', 18); }); };

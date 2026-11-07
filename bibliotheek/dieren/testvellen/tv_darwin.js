// Testvel voor pop_darwin.js (24 okt 2026): overlay op de plaat, uit-elkaar (skelet), gangstrook met steunlijnen, 6 nekstanden, zooms.
// Plaatafbeeldingen (nandoe.png, gordeldier.png, schildpad.png) naast render.html; alleen voor het testvel.
const _TVD_IMG = {}; ['nandoe', 'gordeldier', 'schildpad'].forEach(n => { const im = new Image(); im.src = n + '.png'; _TVD_IMG[n] = im; });
// plaatfiguren: [plaat, ox, grond, K px/cm] (zelfde ijking als overtrek_cfg.py)
const _TVD_FIG = { nandoe: ['nandoe', 133, 683, 322 / 150], nandoeR: ['nandoe', 133, 336, 322 / 150], gordel: ['gordeldier', 180, 527, 202 / 43], gordelR: ['gordeldier', 180 + 7, 291, 202 / 43 * 1.2],
  zadel: ['schildpad', 799, 643, 201 / 80], zadelOp: ['schildpad', 1122, 643, 201 / 80], zadelNeer: ['schildpad', 492, 643, 201 / 80], koepel: ['schildpad', 186, 643, 228 / 110] };
function _tvdPlaat(ctx, fig, x, y, s, a = 0.45, box) { const [n, ox, gr, K] = _TVD_FIG[fig]; const im = _TVD_IMG[n]; if (!im.complete) return; const k = s / K;
  ctx.save(); ctx.globalAlpha = a; const [bx, by, bw, bh] = box; ctx.drawImage(im, bx, by, bw, bh, x + (bx - ox) * k, y + (by - gr) * k, bw * k, bh * k); ctx.restore(); }
function _tvdKop(ctx, t, sub) { ctx.fillStyle = C.text; ctx.font = '700 44px Fraunces'; ctx.textAlign = 'left'; ctx.fillText(t, 60, 70); if (sub) { ctx.fillStyle = C.text2; ctx.font = '400 26px "Source Sans 3"'; ctx.fillText(sub, 60, 110); } }
function _tvdLab(ctx, t, x, y, k = C.text2, al = 'center') { ctx.fillStyle = k; ctx.font = '500 22px "IBM Plex Mono"'; ctx.textAlign = al; ctx.fillText(t, x, y); }
function _tvdGrond(ctx, x0, x1, y) { ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
// gangstrook: n fasen naast elkaar, wereldvaste steunlijnen (steunvoet = zelfde x in elke fase)
function _tvdStrook(ctx, teken, Pp, y, s, x0, dx, n, opt = {}) { const S = Pp.D.gang.S; for (let i = 0; i < n; i++) { const t = i / n, x = x0 + i * dx; _tvdGrond(ctx, x - dx * 0.45, x + dx * 0.45, y);
    teken(ctx, x, y, s, Object.assign({ houding: 'lopen', t }, opt)); _tvdLab(ctx, 't=' + t.toFixed(2), x, y + 34); }
  // steunlijnen: posities van de steunvoeten in wereldcoördinaten (x_scherm = x_frame + voet.x*s; wereld = voet.x + S*t)
  ctx.save(); ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; for (let i = 0; i < n; i++) { const t = i / n, x = x0 + i * dx, h = Pp.houding({ houding: 'lopen', t });
    const vs = h.poten ? h.poten.map((p, j) => [p.k[0], p.steun, j]) : Object.entries(h.voeten).map(([k, v]) => [v[0], v[1] > -0.01, k]);
    vs.forEach(([vx, st, j]) => { if (!st) return; ctx.strokeStyle = (j === 0 || j === 'AN' || j === 'VN') ? '#E05A4A' : '#4A8AE0'; const X = x + vx * s; ctx.beginPath(); ctx.moveTo(X, y - 8); ctx.lineTo(X, y + 8); ctx.stroke(); }); }
  ctx.restore(); }
const TV_darwin = {
  // 1. nandoe: overlay op de vlakke plaat (staan + 3 loopfasen) en skelet
  nandoe_overlay(ctx) { _tvdKop(ctx, 'Grote nandoe · pop over de vlakke plaat', 'links: staan op de plaatfiguur (45%) · rechts: skelet, en realistische rij als ijking'); const s = 3.0, g = 900;
    _tvdPlaat(ctx, 'nandoe', 380, g, s, 0.5, [15, 352, 240, 334]); x9nandoe(ctx, 380, g, s, { a: 0.6 }); _tvdLab(ctx, 'pop 60% op plaat 50%', 380, g + 40);
    x9nandoe(ctx, 900, g, s, { skelet: true, a: 0.85 }); _tvdLab(ctx, 'skelet (heup 77 · tibia 30 · tmt 36)', 900, g + 40);
    _tvdPlaat(ctx, 'nandoeR', 1450, g, s, 1, [15, 5, 240, 334]); NandoePop.teken(ctx, 1450, g, s, { skelet: true, a: 0.0001 }); x9nandoe(ctx, 1450, g, s, { a: 0.35 }); _tvdLab(ctx, 'realistisch + pop 35%', 1450, g + 40); },
  nandoe_gang(ctx) { _tvdKop(ctx, 'Grote nandoe · stap in 8 fasen', 'steunlijnen: rood = nabije poot, blauw = verre poot (staat stil in de wereld: elke volgende strook verschuift de pas)'); const s = 1.55, g = 560;
    _tvdStrook(ctx, x9nandoe, NandoePop, g, s, 150, 232, 8);
    const g2 = 1000; for (let i = 0; i < 4; i++) { const t = i / 4; x9nandoe(ctx, 200, g2, 1.55, { houding: 'lopen', t, vooruit: true, a: 0.35 + i * 0.2 }); } _tvdGrond(ctx, 100, 1100, g2); _tvdLab(ctx, 'vooruit: true, t = 0 · 0,25 · 0,5 · 0,75 over elkaar', 640, g2 + 40); },
  nandoe_zoom(ctx) { _tvdKop(ctx, 'Grote nandoe · zooms', 'heup/knie in de veren · hak · tenen bij neerzetten (t=0) en afzetten (t=0,55)'); const s = 6.5;
    x9nandoe(ctx, 420, 1000, s, { houding: 'lopen', t: 0.0 }); x9nandoe(ctx, 1300, 1000, s, { houding: 'lopen', t: 0.55, skelet: true }); },
  // 2. gordeldier
  gordel_overlay(ctx) { _tvdKop(ctx, 'Negenbandgordeldier · pop over de vlakke plaat', 'staart 36 cm (bron; de plaat had 17 cm) · kop-romp 43 cm'); const s = 14, g = 520;
    _tvdPlaat(ctx, 'gordel', 560, g, s, 0.5, [10, 410, 300, 120]); x9gordeldier(ctx, 560, g, s, { a: 0.6 }); _tvdLab(ctx, 'pop 60% op plaat 50%', 560, g + 40);
    x9gordeldier(ctx, 1440, g, s, { skelet: true, a: 0.8 }); _tvdLab(ctx, 'skelet', 1440, g + 40);
    const g2 = 960; x9gordeldier(ctx, 560, g2, s); _tvdLab(ctx, 'staan', 560, g2 + 40); _tvdPlaat(ctx, 'gordelR', 1440, g2, s, 1, [5, 155, 345, 140]); _tvdLab(ctx, 'realistische rij (ter vergelijking)', 1440, g2 + 40); },
  gordel_gang(ctx) { _tvdKop(ctx, 'Negenbandgordeldier · stap in 8 fasen (laterale volgorde AN–VN–AF–VF)', 'rood = nabije poten, blauw = verre poten · S = 13 cm per cyclus, duty 0,68'); const s = 4.6, g = 480;
    _tvdStrook(ctx, x9gordeldier, GordelPop, g, s, 140, 235, 8);
    const g2 = 960, s2 = 9; for (let i = 0; i < 6; i++) x9gordeldier(ctx, 300, g2, s2, { houding: 'lopen', t: i / 6 * 1.0, vooruit: true, a: 0.25 + i * 0.13 }); _tvdGrond(ctx, 100, 1800, g2); _tvdLab(ctx, 'vooruit: true, 6 standen over elkaar (voeten op dezelfde plek tijdens de steun)', 900, g2 + 40); },
  gordel_zoom(ctx) { _tvdKop(ctx, 'Gordeldier · zooms', 'voorpoot met graafklauwen · achterpoot · staartwortel'); x9gordeldier(ctx, 700, 980, 26, { houding: 'lopen', t: 0.2 }); x9gordeldier(ctx, 1500, 700, 18, { houding: 'lopen', t: 0.7, skelet: true }); },
  // 3. schildpad
  schild_overlay(ctx) { _tvdKop(ctx, 'Reuzenschildpad · pop over de vlakke plaat', 'koepel (110 cm schild) · zadel nek half (plaat fig. 3) · zadel nek omhoog (fig. 4) · zadel nek omlaag (fig. 2)'); const g = 560, s = 2.2;
    _tvdPlaat(ctx, 'koepel', 330, g, s, 0.5, [30, 450, 315, 195]); x9schildpad(ctx, 'koepel', 330, g, s, { nek: 0, a: 0.6 });
    _tvdPlaat(ctx, 'zadel', 900, g, s, 0.5, [636, 470, 330, 175]); x9schildpad(ctx, 'zadel', 900, g, s, { nek: 0, a: 0.6 });
    const g2 = 1010; _tvdPlaat(ctx, 'zadelOp', 1500, g, s, 0.5, [960, 370, 295, 275]); x9schildpad(ctx, 'zadel', 1500, g, s, { nek: 1, a: 0.6 });
    _tvdPlaat(ctx, 'zadelNeer', 600, g2, s, 0.5, [335, 465, 300, 180]); x9schildpad(ctx, 'zadel', 600, g2, s, { nek: -1, a: 0.6 });
    x9schildpad(ctx, 'zadel', 1300, g2, s, { nek: 0.5, skelet: true, a: 0.8 }); _tvdLab(ctx, 'skelet: nekwortel, kop-aanzet, kantelpunt', 1300, g2 + 40); },
  schild_nek(ctx) { _tvdKop(ctx, 'Zadelschild · nek omhoog in 6 tussenstanden (o.nek 0 → 1)', 'onder: omlaag → half (o.nek −1 → 0) · voeten staan stil, schild kantelt om de achtervoeten'); const s = 1.55;
    for (let i = 0; i < 6; i++) { const n = i / 5, x = 190 + i * 310; _tvdGrond(ctx, x - 140, x + 140, 540); x9schildpad(ctx, 'zadel', x, 540, s, { nek: n }); _tvdLab(ctx, 'nek ' + n.toFixed(1), x, 575); }
    for (let i = 0; i < 6; i++) { const n = -1 + i / 5, x = 190 + i * 310; _tvdGrond(ctx, x - 140, x + 140, 960); x9schildpad(ctx, 'zadel', x, 960, s, { nek: n }); _tvdLab(ctx, 'nek ' + n.toFixed(1), x, 995); } },
  schild_naast(ctx) { _tvdKop(ctx, 'Koepel en zadel naast elkaar (zelfde schaal, s = 3,6 zoals e9s18)', 'koepel 110 cm schild, korte nek · zadel 80 cm schild, lange nek en poten'); x9lava(ctx, { hor: 520 });
    x9schildpad(ctx, 'koepel', 560, 840, 3.6); x9schildpad(ctx, 'zadel', 1360, 840, 3.6, { nek: 0 }); },
  schild_zoom(ctx) { _tvdKop(ctx, 'Zadelschild · zooms', 'nek-uitgang onder de schildrand · kop · voorpoot'); x9schildpad(ctx, 'zadel', 420, 1060, 5.2, { nek: 1 }); x9schildpad(ctx, 'zadel', 1350, 640, 5.2, { nek: 0 }); x9schildpad(ctx, 'koepel', 1350, 1070, 3.4, { nek: 0 }); }
};

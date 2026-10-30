// Testvel tekenronde 2 · vogels, vissen, reptielen, amfibieën, ongewervelden, planten. Render zonder én met dieren_overig.js voor oud/nieuw.
const _tvTak = (ctx, x1, y1, x2, y2, d = 14) => lijn(ctx, [[x1, y1], [x2, y2]], '#5A4636', d);
const TV_overig = {
  vogels(ctx) { macroNacht(ctx, { horizon: 900 }); metaText(ctx, 'TESTVEL · ZANGVOGELS (tak en grond)', 60, 50, C.text2);
    _tvTak(ctx, 60, 420, 700, 410, 18); merel(ctx, 340, 415, 2.0);
    _tvTak(ctx, 760, 400, 1300, 395, 12); grondvink(ctx, 900, 398, 1.6, { snavel: 9.3 }); grondvink(ctx, 1160, 397, 1.6, { snavel: 11, kleed: 'man' });
    lijn(ctx, [[1400, 600], [1560, 380]], '#6E9A5E', 6); lijn(ctx, [[1700, 600], [1640, 380]], '#6E9A5E', 6); zaadkraker(ctx, 1560, 384, 1.2, { snavel: 'klein' }); zaadkraker(ctx, 1640, 384, 1.2, { snavel: 'groot', kijk: -1 });
    ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 900, W, 180);
    grondvink(ctx, 300, 900, 1.6, { snavel: 9.3, pik: 1 }); merel(ctx, 700, 900, 1.6, { pik: 0.35 }); koolmees(ctx, 1100, 900, 1.5);
    _tvTak(ctx, 1300, 760, 1900, 760, 16); koolmees(ctx, 1600, 760, 1.6, { kijk: -1 }); },
  pootjes(ctx) { macroNacht(ctx, { horizon: 1000 }); metaText(ctx, 'TESTVEL · POTEN INGEZOOMD', 60, 50, C.text2);
    _tvTak(ctx, 0, 820, 900, 800, 40); grondvink(ctx, 450, 810, 5, { snavel: 9.3 });
    schors(ctx, 1000, 80, 900, 1000, { roet: 1 }); koolmees(ctx, 1400, 640, 2.4, { pik: 0.55, rot: -0.35 }); },
};
TV_overig.vleugel = function (ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL · VLIEGENDE VINK: SLAGFASEN · NEERSLAG GESPREID · OPSLAG POLS GEVOUWEN', 60, 50, C.text2);
  [0.0, 0.07, 0.14, 0.21, 0.29, 0.36, 0.43, 0.5].forEach((t, i) => { const x = 230 + (i % 4) * 470, y = 330 + Math.floor(i / 4) * 470; grondvink(ctx, x, y, 1.6, { houding: 'vliegen', t }); metaText(ctx, 't = ' + t, x - 60, y + 150, C.text2, 'left', 24); }); };
TV_overig.grote = function (ctx) { macroNacht(ctx, { horizon: 900 }); metaText(ctx, 'TESTVEL · PAUW, PAUWIN, REIGER, ZWALUW', 60, 50, C.text2);
  pauw(ctx, 560, 560, 1.1); pauw(ctx, 1260, 560, 0.9, { waaier: 1 }); pauwin(ctx, 1700, 560, 1.0, { kijk: -1 });
  vogel(ctx, 360, 1040, 1.0); zwaluw(ctx, 1000, 820, 12); zwaluw(ctx, 1500, 900, 6, { kijk: -1 }); };
TV_overig.zwemmers = function (ctx) { ctx.fillStyle = '#1E3A5A'; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL · ZWEMMERS (zwemmen t=0 / t=0.5 · recht · röntgen)', 60, 50, C.text2);
  haai(ctx, 420, 220, 0.8); dolfijn(ctx, 1000, 220, 0.8); ichthyosaurus(ctx, 1560, 220, 0.75);
  haai(ctx, 420, 500, 0.8, { t: 0.5 }); dolfijn(ctx, 1000, 500, 0.8, { t: 0.5 }); ichthyosaurus(ctx, 1560, 500, 0.75, { t: 0.5 });
  haai(ctx, 420, 820, 0.8, { rontgen: 1 }); dolfijn(ctx, 1000, 820, 0.8, { rontgen: 1 }); ichthyosaurus(ctx, 1560, 820, 0.75, { houding: 'recht' }); };
TV_overig.reptielen = function (ctx) { macroNacht(ctx, { horizon: 700 }); metaText(ctx, 'TESTVEL · KROKODIL EN HAGEDIS (lopen · liggen)', 60, 50, C.text2);
  krokodil(ctx, 480, 420, 1.0); krokodil(ctx, 1380, 420, 1.0, { houding: 'liggen' });
  hagedis(ctx, 480, 900, 1.2); hagedis(ctx, 1380, 900, 1.2, { houding: 'liggen' }); };
TV_overig.planten = function (ctx) { macroNacht(ctx, { horizon: 980, heuvel: false }); metaText(ctx, 'TESTVEL · TAK MET BLADEREN, OPUNTIA, ORCHIDEE', 60, 50, C.text2);
  const P = [[40, 700], [260, 560], [440, 480], [620, 420], [800, 400]]; const pos = takMetBladeren(ctx, P, [[0.18, 70, -1.9], [0.3, 76, 0.5], [0.45, 72, -1.2], [0.58, 78, 0.35], [0.72, 70, -1.5], [0.86, 76, 0.2]], { dikte: 10 });
  rupsOpBlad(ctx, pos[3], 0.25, { kleur: '#6BA872' }); blad(ctx, 80, 900, 120, { kleur: '#A85A44', rot: -0.15 }); rups(ctx, 180, 892, 0.3, { kleur: '#6BA872', rot: -0.15 });
  opuntia(ctx, 1050, 1080, 1.5); nestje(ctx, 1050, 1080 - 315 * 1.5, 1.2, 4);
  orchideePlant(ctx, 1560, 560, 0.85, { spoor: 300 }); };
TV_overig.houdingen = function (ctx) { macroNacht(ctx, { horizon: 900 }); metaText(ctx, 'TESTVEL · HOUDINGEN VOGELS (tak · staan · pikken · vliegen · lopen · pronk)', 60, 50, C.text2);
  _tvTak(ctx, 40, 300, 700, 300, 14); grondvink(ctx, 160, 293, 1.3, { houding: 'tak', takY: 293, takDik: 11 }); merel(ctx, 440, 293, 1.3, { houding: 'tak', takY: 293, takDik: 11 });
  grondvink(ctx, 900, 300, 1.3, { houding: 'vliegen', t: 0.1 }); merel(ctx, 1200, 300, 1.1, { houding: 'vliegen', t: 0.25 }); koolmees(ctx, 1500, 300, 1.2, { houding: 'vliegen', t: 0.05 }); zaadkraker(ctx, 1780, 300, 1.1, { houding: 'vliegen', t: 0.2 });
  ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 900, W, 180);
  grondvink(ctx, 140, 900, 1.3, { houding: 'staan' }); grondvink(ctx, 400, 900, 1.3, { houding: 'pikken' }); koolmees(ctx, 650, 900, 1.2, { houding: 'staan' });
  pauw(ctx, 1080, 900, 0.75, { houding: 'lopen', t: 0.3 }); pauwin(ctx, 1500, 900, 0.75, { houding: 'lopen', t: 0.8 }); vogel(ctx, 1800, 900, 0.75, { houding: 'lopen', t: 0.4 }); };
TV_overig.klein = function (ctx) { macroNacht(ctx, { horizon: 860 }); metaText(ctx, 'TESTVEL · CICHLIDEN, KIKKER, SLAK (2 houdingen)', 60, 50, C.text2);
  ctx.fillStyle = '#2E5A7A'; ctx.fillRect(0, 90, W, 380); cichlide(ctx, 300, 260, 2.6, { vorm: 'blauw' }); cichlide(ctx, 760, 260, 2.6, { vorm: 'rood', t: 0.4 }); cichlide(ctx, 1220, 260, 2.6, { vorm: 'vrouw' });
  kikker(ctx, 300, 760, 40); kikker(ctx, 800, 760, 30, { houding: 'springen', kleur: '#8C6A3E' }); slak(ctx, 1260, 820, 55, { t: 0.3 }); slak(ctx, 1700, 820, 55, { houding: 'ingetrokken' }); };
TV_overig.insecten = function (ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL · INSECTEN EN RUPS (2 houdingen)', 60, 50, C.text2);
  lhb(ctx, 200, 260, 1.6, { vorm: 'succinea', stippen: 14 }); lhb(ctx, 520, 260, 1.6, { vorm: 'spectabilis', houding: 'lopen', t: 0.2 }); lhb(ctx, 900, 260, 1.4, { vorm: 'succinea', houding: 'vliegen' });
  berkenspanner(ctx, 1300, 260, 0.6); berkenspanner(ctx, 1680, 260, 0.6, { vorm: 'zwart', houding: 'vliegen', t: 0.05 });
  pijlstaart(ctx, 400, 520, 1.6, { tong: 1, tongLengte: 300 }); pijlstaart(ctx, 900, 620, 1.6, { houding: 'rust' });
  rups(ctx, 1320, 640, 0.8, { houding: 'kruipen', t: 0.4 }); rups(ctx, 1680, 640, 0.8, { houding: 'lus', kleur: '#8C6A48' }); rups(ctx, 1500, 860, 0.8, { houding: 'strekken' }); };
TV_overig.reptielen_groot = function (ctx) { macroNacht(ctx, { horizon: 620 }); metaText(ctx, 'TESTVEL · KROKODIL EN HAGEDIS GROOT (lopen · liggen)', 60, 50, C.text2);
  krokodil(ctx, 600, 470, 1.6, { t: 0.3 }); krokodil(ctx, 1520, 470, 1.0, { houding: 'liggen' }); hagedis(ctx, 640, 880, 2.0, { t: 0.2 }); hagedis(ctx, 1560, 1000, 1.2, { houding: 'liggen' }); };
TV_overig.orchidee = function (ctx) { macroNacht(ctx, { horizon: 1040, heuvel: false }); metaText(ctx, 'TESTVEL · DARWINS ORCHIDEE, HELE PLANT (ware schaal 0,9 px/mm) + PLANT ZOALS IN E3S25', 60, 50, C.text2);
  orchideePlant(ctx, 700, 520, 0.9, { spoor: 300 }); orchideeBladeren(ctx, 1550, 900, 1.0); };
TV_overig.zoom = function (ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); pijlstaart(ctx, 500, 300, 3, { tong: 1, tongLengte: 120 }); pijlstaart(ctx, 1400, 300, 3, { houding: 'rust' }); orchideePlant(ctx, 960, 760, 0.6); };
// ---- Ronde 3: overlay met de referentiecontour (goud) over de eigen tekening, zelfde schaal (lengte kop–staart gelijk, voeten op dezelfde hoogte)
function _tvMeet(fn) { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); fn(g); const d = g.getImageData(0, 0, W, H).data; let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (d[(y * W + x) * 4 + 3] > 60) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return { c, x0, x1, y0, y1 }; }
function _tvOverlay(ctx, key, fn, o = {}) { const m = _tvMeet(fn); ctx.drawImage(m.c, 0, 0); const R = REF_OVERIG[key]; const sc = (m.x1 - m.x0) / (R.xr[1] - R.xr[0]); const ox = m.x0 - R.xr[0] * sc;
  const oy = o.midden ? (m.y0 + m.y1) / 2 - (R.box[1] + R.box[3]) / 2 * sc : o.grondY - R.yf * sc;
  ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 6]); ctx.beginPath(); R.pts.forEach(([px, py], i) => { const X = ox + px * sc, Y = oy + py * sc; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.closePath(); ctx.stroke(); ctx.restore();
  const hr = (R.box[3] - R.box[1]) / (R.xr[1] - R.xr[0]), hm = (m.y1 - m.y0) / (m.x1 - m.x0);
  metaText(ctx, `${key} · goud = referentie · hoogte/lengte ref ${hr.toFixed(2)} · tekening ${hm.toFixed(2)}`, 60, 1040, C.text2, 'left', 26); }
const _tvOv = (key, fn, o) => function (ctx) { macroNacht(ctx, { horizon: 980, heuvel: false }); metaText(ctx, 'OVERLAY · ' + key.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), 60, 50, C.text2); _tvOverlay(ctx, key, fn, o); };
Object.assign(TV_overig, {
  ov_grondvink: _tvOv('grondvink', (g) => grondvink(g, 960, 760, 4.2, { houding: 'tak', takY: 760, takDik: 12 }), { grondY: 760 }),
  ov_merel: _tvOv('merel', (g) => merel(g, 960, 860, 3.6, { houding: 'staan' }), { grondY: 860 }),
  ov_koolmees: _tvOv('koolmees', (g) => koolmees(g, 960, 760, 3.6, { houding: 'tak', takY: 760, takDik: 12 }), { grondY: 760 }),
  ov_vink_vlucht: _tvOv('vink_vlucht', (g) => grondvink(g, 960, 600, 4, { houding: 'vliegen', t: 0.07 }), { midden: true }),
  ov_pauw: _tvOv('pauw', (g) => pauw(g, 1200, 940, 1.9), { grondY: 940 }),
  ov_pauw_pronk: _tvOv('pauw_pronk', (g) => pauw(g, 960, 960, 1.6, { houding: 'pronk' }), { grondY: 960 }),
  ov_pauwin: _tvOv('pauwin', (g) => pauwin(g, 960, 960, 2.6), { grondY: 960 }),
  ov_reiger: _tvOv('reiger', (g) => vogel(g, 900, 980, 2.0), { grondY: 980 }),
  ov_haai: _tvOv('haai', (g) => haai(g, 960, 540, 2.4, { houding: 'recht' }), { midden: true }),
  ov_dolfijn: _tvOv('dolfijn', (g) => dolfijn(g, 960, 540, 2.4, { houding: 'recht' }), { midden: true }),
  ov_krokodil: _tvOv('krokodil', (g) => krokodil(g, 960, 760, 2.2), { grondY: 760 }),
  ov_hagedis: _tvOv('hagedis', (g) => hagedis(g, 960, 700, 3.0), { grondY: 700 }),
});

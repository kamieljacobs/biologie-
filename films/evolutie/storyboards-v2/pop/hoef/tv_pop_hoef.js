// Testvel hoefdieren-pop (POPFAMILIE.md): overlay op de omtrek van de stijlplaat, uit elkaar, gangstroken met steunlijnen, zooms, scènes.
const HFTV = (() => {
  const NAVY = '#16213A';
  function bg(ctx, titel) { ctx.fillStyle = NAVY; ctx.fillRect(0, 0, 1920, 1080); if (titel) { ctx.fillStyle = '#E8E2D6'; ctx.font = '600 30px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(titel, 40, 50); } }
  function label(ctx, t, x, y, c = '#C9B48A', size = 22, al = 'center') { ctx.fillStyle = c; ctx.font = `500 ${size}px "IBM Plex Mono", monospace`; ctx.textAlign = al; ctx.fillText(t, x, y); }
  function grond(ctx, x0, x1, y) { ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
  // omtrek van de stijlplaat (cm) op de pop-positie
  function omtrek(ctx, n, x, y, s, o = {}) { const P = HOEF[n], O = HOEF_VORM[n].omtrek; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(-(P.D.anker || 0) + (o.dx || 0), 0); ctx.beginPath();
    O.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = o.c || '#F2C14E'; ctx.lineWidth = o.lw || 2; ctx.setLineDash(o.dash || [7, 5]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  function strip(ctx, P, h, y, s, n = 8, o = {}) { const w = 1920 / n; for (let i = 0; i < n; i++) { const t = (o.t0 || 0) + i / n; const x = w * i + w * 0.5 + (o.dx || 0) * s;
      grond(ctx, w * i + 8, w * (i + 1) - 8, y); P.teken(ctx, x, y, s, { houding: h, t, skelet: o.skelet, a: o.a }); const I = P.info({ houding: h, t });
      for (const L of ['V', 'VF', 'A', 'AF']) { const v = I.voeten[L]; if (!v) continue; const px = x + (v.teen[0] - (P.D.anker || 0)) * s;
        if (v.steun) { ctx.strokeStyle = L.length > 1 ? 'rgba(120,200,255,0.75)' : 'rgba(255,120,90,0.85)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y + 6); ctx.lineTo(px, y + 26); ctx.stroke(); }
        if (v.rek > 1.005) { ctx.fillStyle = '#FF3030'; ctx.beginPath(); ctx.arc(px, y - 4, 5, 0, 6.283); ctx.fill(); } }
      label(ctx, 't=' + t.toFixed(3), x, y + 52, '#8C97AE', 18); } }
  function zoom(ctx, P, o, cx, cy, s, vak) { ctx.save(); ctx.beginPath(); ctx.rect(...vak); ctx.clip(); ctx.fillStyle = '#1C2944'; ctx.fillRect(...vak);
    P.teken(ctx, vak[0] + vak[2] / 2 - (cx - (P.D.anker || 0)) * s, vak[1] + vak[3] / 2 - cy * s, s, o); ctx.restore(); ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.strokeRect(...vak); }
  return { bg, label, grond, omtrek, strip, zoom };
})();
const HFTV_N = ['paard', 'ezel', 'muilezel', 'edelhert', 'koe', 'nijlpaard'];
const HFTV_POS = { paard: [330, 470, 1.9], ezel: [960, 470, 2.5], muilezel: [1590, 470, 2.1], edelhert: [330, 1000, 2.2], koe: [960, 1000, 1.75], nijlpaard: [1590, 1000, 1.45] };
const TV_pop_hoef = {
  staan(ctx) { HFTV.bg(ctx, 'Staan op de omtrek van de stijlplaat (goud gestippeld)'); for (const n of HFTV_N) { const [x, y, s] = HFTV_POS[n]; HFTV.grond(ctx, x - 300, x + 300, y); HOEF[n].teken(ctx, x, y, s, { houding: 'staan', a: 0.92 }); HFTV.omtrek(ctx, n, x, y, s); } },
  skelet(ctx) { HFTV.bg(ctx, 'Skelet in staan'); for (const n of HFTV_N) { const [x, y, s] = HFTV_POS[n]; HFTV.grond(ctx, x - 300, x + 300, y); HOEF[n].teken(ctx, x, y, s, { houding: 'staan', a: 0.45, skelet: 1 }); } },
  zonder(ctx) { HFTV.bg(ctx, 'Staan (zonder omtrek)'); for (const n of HFTV_N) { const [x, y, s] = HFTV_POS[n]; HFTV.grond(ctx, x - 300, x + 300, y); HOEF[n].teken(ctx, x, y, s, { houding: 'staan' }); } },
  paard_stap(ctx) { HFTV.bg(ctx, 'Paard stap (8 fasen) en draf (8 fasen); rood = nabij in steun, blauw = ver'); HFTV.strip(ctx, HOEF.paard, 'lopen', 440, 0.95); HFTV.strip(ctx, HOEF.paard, 'draven', 960, 0.95); },
  grazen(ctx) { HFTV.bg(ctx, 'Grazen / vechten / gapen'); const L = [['paard', 'grazen'], ['ezel', 'grazen'], ['muilezel', 'grazen'], ['edelhert', 'vechten'], ['koe', 'grazen'], ['nijlpaard', 'gapen']];
    for (const [n, h] of L) { const [x, y, s] = HFTV_POS[n]; HFTV.grond(ctx, x - 300, x + 300, y); HOEF[n].teken(ctx, x, y, s, { houding: h }); HFTV.label(ctx, n + ' · ' + h, x, y + 40, '#8C97AE', 18); } },
};
for (const n of HFTV_N) TV_pop_hoef['groot_' + n] = (ctx) => { const P = HOEF[n], H = P.D.H, s = 760 / H; HFTV.bg(ctx, n + ' staan, groot (links) en skelet (rechts)'); HFTV.grond(ctx, 20, 1900, 1000);
  P.teken(ctx, 480, 1000, s * 0.95, { houding: 'staan' }); P.teken(ctx, 1440, 1000, s * 0.95, { houding: 'staan', a: 0.5, skelet: 1 }); HFTV.omtrek(ctx, n, 1440, 1000, s * 0.95, { lw: 1.5 }); };
// grote gangstrook: 8 fasen in 2 rijen van 4
function _hftvGang(n, g, sk) { return (ctx) => { const P = HOEF[n], s = 250 / P.D.H * (n === 'nijlpaard' ? 0.8 : n === 'koe' ? 0.9 : 1); HFTV.bg(ctx, n + ' · ' + g + ' (8 fasen; rood = nabij in steun, blauw = ver in steun, rode stip = poot te kort)');
  for (let i = 0; i < 8; i++) { const t = i / 8, x = 240 + (i % 4) * 480, y = i < 4 ? 500 : 1010; HFTV.grond(ctx, x - 230, x + 230, y); P.teken(ctx, x, y, s, { houding: g, t, skelet: sk, a: sk ? 0.6 : 1 }); const I = P.info({ houding: g, t });
    for (const L of ['V', 'VF', 'A', 'AF']) { const v = I.voeten[L]; const px = x + (v.teen[0] - P.D.anker) * s; if (v.steun) { ctx.strokeStyle = L.length > 1 ? '#78C8FF' : '#FF785A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + 4); ctx.lineTo(px, y + 26); ctx.stroke(); } if (v.rek > 1.01) { ctx.fillStyle = '#F33'; ctx.beginPath(); ctx.arc(px, y - 4, 6, 0, 6.283); ctx.fill(); } }
    HFTV.label(ctx, 't=' + t.toFixed(3), x, y + 50, '#8C97AE', 20); } }; }
for (const n of HFTV_N) for (const g in HOEF[n].GANGEN) { TV_pop_hoef['g_' + n + '_' + g] = _hftvGang(n, g); TV_pop_hoef['gs_' + n + '_' + g] = _hftvGang(n, g, 1); }
TV_pop_hoef.nijl_gapen = (ctx) => { const P = HOEF.nijlpaard; HFTV.bg(ctx, 'Nijlpaard: staan en gapen (groot)'); HFTV.grond(ctx, 20, 1900, 980);
  P.teken(ctx, 480, 980, 2.6, { houding: 'staan' }); P.teken(ctx, 1420, 980, 2.6, { houding: 'gapen' }); };
TV_pop_hoef.nijl_zoom = (ctx) => { const P = HOEF.nijlpaard; HFTV.bg(ctx, 'Nijlpaard zooms: kop gapen, voorvoet, achtervoet'); const J = P.J;
  HFTV.zoom(ctx, P, { houding: 'gapen' }, J.kop[0] + 10, J.kop[1] - 10, 5, [30, 80, 900, 960]); HFTV.zoom(ctx, P, { houding: 'staan' }, J.vkogel[0], -20, 6, [960, 80, 450, 960]); HFTV.zoom(ctx, P, { houding: 'staan' }, J.akogel[0], -20, 6, [1440, 80, 450, 960]); };
TV_pop_hoef.koe_liggen = (ctx) => { const P = HOEF.koe; HFTV.bg(ctx, 'Koe liggen (links) en met skelet (rechts)'); HFTV.grond(ctx, 20, 1900, 900);
  P.teken(ctx, 480, 900, 3.0, { houding: 'liggen' }); P.teken(ctx, 1420, 900, 3.0, { houding: 'liggen', skelet: 1, a: 0.5 }); };
// scènes uit de storyboards waarin deze dieren voorkomen (met de pop geladen)
for (const [o, k] of [['SB3', 'e3s23'], ['SB6', 'e6s01'], ['SB6', 'e6s02'], ['SB6', 'e6s06'], ['SB6', 'e6s08'], ['SB6', 'e6s18'], ['SB6', 'e6s28'], ['SB7', 'e7q28'], ['SB7', 'e7s35'], ['SB8', 'e8s04'], ['SB8', 'e8s05'], ['SB8', 'e8s06']])
  TV_pop_hoef['sc_' + k] = (ctx) => eval(o)[k](ctx);
TV_pop_hoef.zooms = (ctx) => { HFTV.bg(ctx, 'Zooms in stap t=0,3: kop paard, schouder paard, heup paard, kop ezel, kop muilezel, kop hert');
  const L = [['paard', 'kop', 3.2], ['paard', 'schouder', 2.6], ['paard', 'heup', 2.6], ['ezel', 'kop', 4.2], ['muilezel', 'kop', 3.6], ['edelhert', 'kop', 3.0]];
  L.forEach(([n, j, s], i) => { const P = HOEF[n], I = P.info({ houding: 'lopen', t: 0.3 }), c = I.piv[j === 'schouder' ? 'hum' : j === 'heup' ? 'dij' : 'kop'] || I.piv.kop; HFTV.zoom(ctx, P, { houding: 'lopen', t: 0.3 }, c[0] + (j === 'kop' ? 12 : 0), c[1] + (j === 'kop' ? 8 : 12), s, [30 + (i % 3) * 625, 80 + Math.floor(i / 3) * 495, 610, 480]); }); };
// ---- film (render_film.py): 10,5 s, 24 fps ----
TV_pop_hoef.film = (ctx, f) => { const fps = 24, t = f / fps, W = 1920, H = 1080, gy = 930;
  const seg = [[0, 1.5, 'paard', 'lopen', null, 'paard · stap (viertakt, laterale volgorde)'], [1.5, 3.0, 'paard', 'draven', null, 'paard · draf (diagonale paren, zweeffase)'],
    [3.0, 4.3, 'ezel', 'lopen', null, 'ezel · stap'], [4.3, 5.7, 'muilezel', 'lopen', 'grazen', 'muilezel · stap, grazen'], [5.7, 7.1, 'edelhert', 'lopen', 'vechten', 'edelhert · stap, kop omlaag (bronst)'],
    [7.1, 8.9, 'koe', 'lopen', ['grazen', 'liggen'], 'koe · stap, grazen, liggen'], [8.9, 10.5, 'nijlpaard', 'lopen', 'gapen', 'nijlpaard · stap, gapen']];
  const S = seg.find(z => t >= z[0] && t < z[1]) || seg[seg.length - 1]; const [t0, t1, n, g, eind, label] = S; const P = HOEF[n], ts = t - t0, dur = t1 - t0;
  const pxcm = { paard: 3.1, ezel: 4.3, muilezel: 3.7, edelhert: 3.5, koe: 3.0, nijlpaard: 2.35 }[n];
  const freq = { lopen: { paard: 0.9, ezel: 1.05, muilezel: 0.95, edelhert: 0.9, koe: 0.8, nijlpaard: 0.75 }[n], draven: 1.4 }[g];
  const eindLijst = eind == null ? [] : Array.isArray(eind) ? eind : [eind]; const tLoop = eindLijst.length ? dur * (eindLijst.length > 1 ? 0.42 : 0.55) : dur;
  let st, snel = 0, afstand = 0;
  if (ts < tLoop) { const rem = eindLijst.length ? Math.max(0, 1 - Math.max(0, ts - tLoop + 0.35) / 0.35) : 1; snel = P.SNELHEID[g] * freq * rem; afstand = P.SNELHEID[g] * freq * ts; st = P.stand({ houding: g, t: ts * freq }); }
  else { const gs = P.stand({ houding: g, t: tLoop * freq }); afstand = P.SNELHEID[g] * freq * tLoop; const rest = (ts - tLoop) / (dur - tLoop) * eindLijst.length; const k = Math.min(eindLijst.length - 1, Math.floor(rest)), u = Math.min(1, (rest - k) * 2.2);
    const van = k === 0 ? gs : P.stand({ houding: eindLijst[k - 1] }), naar = P.stand({ houding: eindLijst[k] }); const w = u * u * (3 - 2 * u); st = P.meng(van, naar, w); }
  ctx.fillStyle = '#1E2A47'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, gy - 280, W, 280);
  const sc = (afstand * pxcm) % 600, sc2 = (afstand * pxcm * 0.35) % 900;
  ctx.fillStyle = '#2B3E5E'; for (let i = -1; i < 4; i++) { const x = i * 900 - sc2; ctx.beginPath(); ctx.ellipse(x + 300, gy - 260, 260, 60, 0, Math.PI, 0); ctx.fill(); }
  ctx.fillStyle = '#3B5240'; ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#2F4434'; for (let i = -1; i < 5; i++) { const x = i * 600 - sc; for (let k = 0; k < 6; k++) { const xx = x + k * 97 + (k % 2) * 30, yy = gy + 30 + (k * 37) % 110; ctx.beginPath(); ctx.ellipse(xx, yy, 46, 7, 0, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = '#4C6650'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  P.teken(ctx, 940, gy, pxcm, { stand: st, bek: st.bek });
  ctx.fillStyle = '#E8E2D6'; ctx.font = '600 40px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(label, 70, 90); };

// Testvel familie 'klein' (bever, konijn, sneeuwschoenhaas, bosspitsmuis) — POPBRIEF.md. Laden ná pop_eco_klein.js.
const ETV_IMG = {}; for (const n of ['bever', 'konijn', 'sneeuwschoenhaas', 'spitsmuis']) { const im = new Image(); im.src = 'out/pop_eco_klein/ref/' + n + '.png'; ETV_IMG[n] = im; }
const ETV = (() => {
  const NAVY = '#16213A';
  function bg(ctx, titel) { ctx.fillStyle = NAVY; ctx.fillRect(0, 0, 1920, 1080); if (titel) { ctx.fillStyle = '#E8E2D6'; ctx.font = '600 30px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(titel, 40, 50); } }
  function label(ctx, t, x, y, c = '#C9B48A', size = 22, al = 'center') { ctx.fillStyle = c; ctx.font = `500 ${size}px "IBM Plex Mono", monospace`; ctx.textAlign = al; ctx.fillText(t, x, y); }
  function grond(ctx, x0, x1, y) { ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
  // plaat-px -> scherm via de ijk van het dier (K, X0, G0, ky); o.dx/dy = verschuiving in cm (andere figuur op de plaat), o.sp = spiegelen om px-x
  const plaatNaar = (P, x, y, s, o = {}) => (p) => { const D = P.D, K = o.K || D.K; const px = o.sp != null ? 2 * o.sp - p[0] : p[0]; const cx = (px - (o.X0 ?? D.X0)) / K + (o.dx || 0), cy = (p[1] - (o.G0 ?? D.G0)) * (o.ky ?? D.ky ?? 1) / K;
    return [x + (cx - (D.anker || 0)) * s * (o.kijk || 1), y + cy * s]; };
  function omtrek(ctx, P, sil, x, y, s, o = {}) { const f = plaatNaar(P, x, y, s, o); ctx.save(); ctx.strokeStyle = o.c || '#F2C14E'; ctx.lineWidth = o.lw || 2.2; ctx.setLineDash(o.dash || [7, 5]);
    for (const poly of sil) { ctx.beginPath(); poly.forEach((p, i) => { const q = f(p); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath(); ctx.stroke(); } ctx.restore(); }
  // plaatuitsnede (box in px) op dezelfde ijk naast/onder de pop
  function plaat(ctx, naam, P, box, x, y, s, o = {}) { const im = ETV_IMG[naam]; if (!im || !im.complete) return; const D = P.D, ky = o.ky ?? D.ky ?? 1; const f = plaatNaar(P, x, y, s, o); const a = f([box[0], box[1]]), b = f([box[0] + box[2], box[1] + box[3]]);
    ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.drawImage(im, box[0], box[1], box[2], box[3], Math.min(a[0], b[0]), a[1], Math.abs(b[0] - a[0]), b[1] - a[1]); ctx.restore(); }
  function strip(ctx, P, h, y, s, n = 8, o = {}) { const w = (o.w || 1920) / n; for (let i = 0; i < n; i++) { const t = (o.t0 || 0) + i / n; const x = (o.x0 || 0) + w * i + w * 0.5 + (o.dx || 0) * s;
      grond(ctx, (o.x0 || 0) + w * i + 8, (o.x0 || 0) + w * (i + 1) - 8, y); P.teken(ctx, x, y, s, Object.assign({ houding: h, t }, o.extra || {})); const I = P.info({ houding: h, t });
      for (const L of ['V', 'VF', 'A', 'AF']) { const v = I.voeten[L]; if (!v) continue; const px = x + (v.teen[0] - (P.D.anker || 0)) * s;
        if (v.steun) { ctx.strokeStyle = L.length > 1 ? 'rgba(120,200,255,0.8)' : 'rgba(255,120,90,0.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + (L.length > 1 ? 18 : 6)); ctx.lineTo(px, y + (L.length > 1 ? 30 : 18)); ctx.stroke(); }
        if (v.rek > 1.005) { ctx.fillStyle = '#FF3030'; ctx.beginPath(); ctx.arc(px, y - 4, 5, 0, 6.283); ctx.fill(); } }
      label(ctx, 't=' + t.toFixed(3), x, y + 56, '#8C97AE', 18); } }
  function zoom(ctx, P, o, cx, cy, s, vak, titel) { ctx.save(); ctx.beginPath(); ctx.rect(...vak); ctx.clip(); ctx.fillStyle = '#1C2944'; ctx.fillRect(...vak);
    const an = P.D.anker || 0; P.teken(ctx, vak[0] + vak[2] / 2 - (cx - an) * s, vak[1] + vak[3] / 2 - cy * s, s, o); ctx.restore(); ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.strokeRect(...vak);
    if (titel) label(ctx, titel, vak[0] + 10, vak[1] + 26, '#C9B48A', 18, 'left'); }
  function delen(ctx, P, lijst, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-(P.D.anker || 0), 0);
    for (const [d, dx, dy] of lijst) { const pv = P.deel(ctx, d, dx, dy); ctx.fillStyle = '#FF5A5A'; for (const p of pv) { ctx.beginPath(); ctx.arc(p[0], p[1], 3 / s, 0, 6.283); ctx.fill(); } } ctx.restore(); }
  // 6 tussenstanden tussen twee standen (hoeken via de kortste weg, voeten via IK uit de eindstanden)
  function reeks(ctx, P, oA, oB, y, s, n = 6) { const w = 1920 / n;
    for (let i = 0; i < n; i++) { const u = i / (n - 1), x = w * i + w / 2; grond(ctx, w * i + 10, w * (i + 1) - 10, y); P.teken(ctx, x, y, s, Object.assign({}, u < 0.5 ? oA : oB, { stand: P.overgang(oA, oB, u) })); label(ctx, 'u=' + u.toFixed(2), x, y + 40, '#8C97AE', 18); } }
  return { bg, label, grond, omtrek, plaat, strip, zoom, delen, reeks, plaatNaar };
})();
const ETV_DELEN = (f, extra = []) => [['staart', -0.4 * f, 0.1 * f], ['lijf', 0, 0], ['dij', -0.1 * f, 0.3 * f], ['hum', 0.15 * f, 0.3 * f], ['kop', 0.3 * f, -0.15 * f], ['oor', 0.36 * f, -0.3 * f], ['oorF', 0.44 * f, -0.3 * f], ['gezicht', 0.36 * f, -0.12 * f], ['snuit', 0.32 * f, -0.1 * f],
  ['schn', -0.2 * f, 0.45 * f], ['mt', -0.12 * f, 0.55 * f], ['ap', -0.04 * f, 0.6 * f], ['rad', 0.22 * f, 0.45 * f], ['mc', 0.26 * f, 0.55 * f], ['vp', 0.3 * f, 0.6 * f], ...extra];

const TV_pop_eco_klein = {
  // ---------------- BEVER ----------------
  bever_overlay(ctx) { const P = ECO.bever, s = 9.5; ETV.bg(ctx, 'Bever staan: links plaat (vlakke rij, zelfde ijk K 2,75 px/cm, ky 0,72), rechts pop met omtrek van de plaat (geel)');
    const sil = ECOKLEIN_OVERTREK.bever._sil; ETV.grond(ctx, 40, 1880, 560); ETV.plaat(ctx, 'bever', P, [8, 430, 304, 160], 470, 560, 4.6, {}); ETV.label(ctx, 'plaat (geschaald met ky)', 470, 600, '#8C97AE', 18);
    P.teken(ctx, 1380, 560, 5.2, { houding: 'staan' }); ETV.omtrek(ctx, P, sil, 1380, 560, 5.2, {}); ETV.label(ctx, 'pop + plaatomtrek', 1380, 600, '#8C97AE', 18);
    ETV.grond(ctx, 40, 1880, 1010); P.teken(ctx, 960, 1010, s, { houding: 'staan', a: 0.55, skelet: 1 }); ETV.label(ctx, 'skelet', 960, 1050, '#8C97AE', 18); },
  bever_groot(ctx) { const P = ECO.bever; ETV.bg(ctx, 'Bever staan groot (s = 17 px/cm)'); ETV.grond(ctx, 40, 1880, 980); P.teken(ctx, 1000, 980, 17, { houding: 'staan' }); },
  bever_houdingen(ctx) { const P = ECO.bever, s = 5.2; ETV.bg(ctx, 'Bever: staan, lopen (t 0,25), knagen, zwemmen (y 0 = waterlijn); onder: skelet');
    [['staan'], ['lopen', 0.25], ['knagen', 0.1], ['zwemmen', 0.2]].forEach(([h, t], i) => { const x = 260 + i * 470; ETV.grond(ctx, x - 220, x + 220, 470); P.teken(ctx, x, 470, s, { houding: h, t }); ETV.label(ctx, h, x, 510, '#8C97AE', 18);
      ETV.grond(ctx, x - 220, x + 220, 960); P.teken(ctx, x, 960, s, { houding: h, t, a: 0.45, skelet: 1 }); }); },
  bever_zoom(ctx) { const P = ECO.bever; ETV.bg(ctx, 'Bever zooms: knagen (s 11) en zwemmen (s 9) met plaatfiguur (ijk zelfde K/ky, geel = plaat)');
    ETV.grond(ctx, 40, 900, 1000); P.teken(ctx, 520, 1000, 11, { houding: 'knagen', t: 0.1 }); ETV.plaat(ctx, 'bever', P, [588, 392, 230, 202], 220, 600, 4, { X0: 690, G0: 588 });
    ETV.grond(ctx, 980, 1900, 560); P.teken(ctx, 1440, 560, 9, { houding: 'zwemmen', t: 0.2 }); ETV.plaat(ctx, 'bever', P, [786, 470, 300, 60], 1440, 900, 4.4, { X0: 945, G0: 512, ky: 1 }); ETV.label(ctx, 'plaat zwemmen', 1440, 980, '#8C97AE', 18); },
  // ---------------- KONIJN ----------------
  konijn_overlay(ctx) { const P = ECO.konijn; ETV.bg(ctx, 'Konijn grazen (ruststand): links plaat (vlakke rij, K 5,5 px/cm), rechts pop met plaatomtrek; onder skelet');
    const sil = ECOKLEIN_OVERTREK.konijn._sil; ETV.grond(ctx, 40, 1880, 500); ETV.plaat(ctx, 'konijn', P, [176, 470, 210, 124], 480, 500, 14, {});
    P.teken(ctx, 1400, 500, 14, { houding: 'grazen' }); ETV.omtrek(ctx, P, sil, 1400, 500, 14, {});
    ETV.grond(ctx, 40, 1880, 1010); P.teken(ctx, 960, 1010, 14, { houding: 'grazen', a: 0.5, skelet: 1 }); },
  konijn_groot(ctx) { const P = ECO.konijn; ETV.bg(ctx, 'Konijn groot (s 34)'); ETV.grond(ctx, 40, 1880, 1000); P.teken(ctx, 900, 1000, 34, { houding: 'grazen' }); },
  konijn_hup(ctx) { const P = ECO.konijn; ETV.bg(ctx, 'Konijn huppen (8 fasen; rood = nabij, blauw = ver steunend) en zitten/grazen'); ETV.strip(ctx, P, 'huppen', 330, 5); ETV.strip(ctx, P, 'huppen', 620, 5, 8, { t0: 1 / 16 }); ETV.strip(ctx, P, 'huppen', 960, 5, 8, { extra: { a: 0.5, skelet: 1 } }); },
  konijn_hup_groot(ctx) { const P = ECO.konijn; ETV.bg(ctx, 'Konijn huppen groot: t 0 / 0,3 / 0,6 / 0,85 (boven), plaat fig. 3 en 4 (onder, zelfde K)');
    [0, 0.3, 0.6, 0.85].forEach((t, i) => { const x = 240 + i * 480; ETV.grond(ctx, x - 230, x + 230, 470); P.teken(ctx, x, 470, 11, { houding: 'huppen', t, skelet: i == 0 ? 1 : 0, a: i == 0 ? 0.6 : 1 }); ETV.label(ctx, 't=' + t, x, 505, '#8C97AE', 18); });
    ETV.grond(ctx, 40, 1880, 1000); ETV.plaat(ctx, 'konijn', P, [396, 412, 196, 180], 520, 1000, 11, { X0: 494, G0: 590 }); ETV.plaat(ctx, 'konijn', P, [598, 450, 200, 142], 1300, 1000, 11, { X0: 698, G0: 590 }); },
  konijn_ren(ctx) { const P = ECO.konijn; ETV.bg(ctx, 'Konijn rennen (half-bound, 8 + 8 fasen) en plaat fig. 5 (onder rechts)'); ETV.strip(ctx, P, 'rennen', 330, 5); ETV.strip(ctx, P, 'rennen', 640, 5, 8, { t0: 1 / 16 });
    ETV.strip(ctx, P, 'rennen', 960, 6, 4, { w: 1100, extra: { a: 0.55, skelet: 1 } }); ETV.plaat(ctx, 'konijn', P, [800, 432, 290, 160], 1500, 960, 5, { X0: 945, G0: 590 }); },
  konijn_houdingen(ctx) { const P = ECO.konijn, s = 13; ETV.bg(ctx, 'Konijn: zitten, grazen; plaat zitten (zelfde K) en zitten met skelet');
    ETV.grond(ctx, 40, 1880, 560); P.teken(ctx, 300, 560, s, { houding: 'zitten' }); P.teken(ctx, 900, 560, s, { houding: 'grazen' }); ETV.plaat(ctx, 'konijn', P, [18, 396, 160, 196], 1500, 560, s, { X0: 90, G0: 590 });
    ETV.grond(ctx, 40, 1880, 1000); P.teken(ctx, 300, 1000, s, { houding: 'zitten', a: 0.5, skelet: 1 }); P.teken(ctx, 900, 1000, s, { houding: 'zitten', kijk: -1 }); },
  // ---------------- SNEEUWSCHOENHAAS ----------------
  haas_vacht(ctx) { const P = ECO.haas; ETV.bg(ctx, 'Sneeuwschoenhaas: vacht 0 (zomer) -> 1 (winter) in 6 stappen (o.vacht); boven staan, onder zitten');
    for (let i = 0; i < 6; i++) { const v = i / 5, x = 170 + i * 316; ETV.grond(ctx, x - 150, x + 150, 470); P.teken(ctx, x, 470, 8, { houding: 'staan', vacht: v }); ETV.label(ctx, 'vacht ' + v.toFixed(1), x, 505, '#8C97AE', 18);
      ETV.grond(ctx, x - 150, x + 150, 1000); P.teken(ctx, x, 1000, 7.5, { houding: 'zitten', vacht: v }); } },
  haas_plaat(ctx) { const P = ECO.haas; ETV.bg(ctx, 'Sneeuwschoenhaas: plaat (vlakke rij) naast pop, zelfde schaal; zitten, rennen zomer/winter');
    ETV.grond(ctx, 40, 1880, 520); ETV.plaat(ctx, 'sneeuwschoenhaas', P, [20, 355, 200, 290], 200, 520, 8, { X0: 120, G0: 638, K: 6.35 });
    P.teken(ctx, 520, 520, 8, { houding: 'zitten' }); ETV.plaat(ctx, 'sneeuwschoenhaas', P, [235, 385, 325, 255], 1000, 520, 8, { X0: 400, G0: 638 }); P.teken(ctx, 1550, 520, 8, { houding: 'rennen', t: 0.1 });
    ETV.grond(ctx, 40, 1880, 1010); ETV.plaat(ctx, 'sneeuwschoenhaas', P, [565, 355, 170, 290], 200, 1010, 8, { X0: 650, G0: 638 }); P.teken(ctx, 520, 1010, 8, { houding: 'zitten', vacht: 'winter' });
    ETV.plaat(ctx, 'sneeuwschoenhaas', P, [740, 385, 345, 255], 1000, 1010, 8, { X0: 915, G0: 638 }); P.teken(ctx, 1550, 1010, 8, { houding: 'rennen', t: 0.1, vacht: 'winter' }); },
  haas_ren(ctx) { const P = ECO.haas; ETV.bg(ctx, 'Sneeuwschoenhaas rennen (8 + 8 fasen, zomer en winter) en skelet'); ETV.strip(ctx, P, 'rennen', 330, 4.4); ETV.strip(ctx, P, 'rennen', 640, 4.4, 8, { t0: 1 / 16, extra: { vacht: 1 } });
    ETV.strip(ctx, P, 'rennen', 960, 4.4, 8, { extra: { a: 0.5, skelet: 1 } }); },
  // ---------------- BOSSPITSMUIS ----------------
  spitsmuis_overlay(ctx) { const P = ECO.spitsmuis, s = 100; ETV.bg(ctx, 'Bosspitsmuis staan (s 100 px/cm): plaat (K 28, ky 0,88) links, pop + omtrek rechts; onder skelet en snuffelen');
    ETV.grond(ctx, 40, 1880, 470); ETV.plaat(ctx, 'spitsmuis', P, [5, 460, 305, 120], 500, 470, 55, {}); P.teken(ctx, 1400, 470, 55, { houding: 'staan' }); ETV.omtrek(ctx, P, ECOKLEIN_OVERTREK.spitsmuis._sil, 1400, 470, 55, {});
    ETV.grond(ctx, 40, 1880, 1000); P.teken(ctx, 500, 1000, 55, { houding: 'staan', a: 0.5, skelet: 1 }); P.teken(ctx, 1400, 1000, 55, { houding: 'snuffelen', t: 0.1 }); },
  spitsmuis_ren(ctx) { const P = ECO.spitsmuis; ETV.bg(ctx, 'Bosspitsmuis rennen (snel trippelen, 8 + 8 fasen) en skelet; snuffelen in 6 tijdstippen'); ETV.strip(ctx, P, 'rennen', 300, 28); ETV.strip(ctx, P, 'rennen', 560, 28, 8, { t0: 1 / 16 });
    ETV.strip(ctx, P, 'rennen', 790, 28, 8, { extra: { a: 0.5, skelet: 1 } }); for (let i = 0; i < 6; i++) { const x = 160 + i * 320; ETV.grond(ctx, x - 150, x + 150, 1010); P.teken(ctx, x, 1010, 28, { houding: 'snuffelen', t: i / 12 }); } },
  bever_lopen(ctx) { const P = ECO.bever; ETV.bg(ctx, 'Bever lopen (laterale stap, duty 0,7; 8 + 8 fasen) en skelet'); ETV.strip(ctx, P, 'lopen', 330, 2.6); ETV.strip(ctx, P, 'lopen', 640, 2.6, 8, { t0: 1 / 16 });
    ETV.strip(ctx, P, 'lopen', 960, 2.6, 8, { extra: { a: 0.5, skelet: 1 } }); },
  // ---------------- film (240 frames, 24 fps): vier vakken, elk dier laat zijn bewegingen zien ----------------
  film(ctx, f) { const T = f / 24; ctx.fillStyle = '#16213A'; ctx.fillRect(0, 0, 1920, 1080);
    const vak = (i, titel, fn) => { const x0 = (i % 2) * 960, y0 = Math.floor(i / 2) * 540; ctx.save(); ctx.beginPath(); ctx.rect(x0 + 4, y0 + 4, 952, 532); ctx.clip(); ctx.fillStyle = '#1A2740'; ctx.fillRect(x0 + 4, y0 + 4, 952, 532);
      fn(x0, y0); ctx.restore(); ETV.label(ctx, titel, x0 + 24, y0 + 40, '#C9B48A', 22, 'left'); };
    const wrap = (x, x0) => x0 - 160 + ((x % 1280) + 1280) % 1280; // dier loopt het vak uit en komt links terug
    const bijschrift = (x0, y0, t) => ETV.label(ctx, t, x0 + 936, y0 + 40, '#8C97AE', 18, 'right');
    // BEVER: lopen 0-4 s (cyclus 0,9 s), staan -> knagen (0,5 s), knagen tot 7 s, zwemmen 7-10 s
    vak(0, 'bever', (x0, y0) => { const g = y0 + 480, s = 4.2, P = ECO.bever; ctx.strokeStyle = '#4A5670'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, g); ctx.lineTo(x0 + 960, g); ctx.stroke();
      const cyc = 0.9, S = P.SNELHEID.lopen;
      if (T < 4) { const t = T / cyc; P.teken(ctx, x0 + 160 + S * s * t, g, s, { houding: 'lopen', t: t % 1 }); bijschrift(x0, y0, 'lopen'); }
      else if (T < 7) { const xb = x0 + 160 + S * s * 4 / cyc; const u = Math.min(1, (T - 4) / 0.6); const t = (T - 4) / 2.2;
        if (u < 1) P.teken(ctx, xb, g, s, { houding: 'knagen', stand: P.overgang({ houding: 'staan' }, { houding: 'knagen', t: 0 }, u), tak: u > 0.5 }); else P.teken(ctx, xb, g, s, { houding: 'knagen', t }); bijschrift(x0, y0, 'knagen'); }
      else { const w = y0 + 330; ctx.fillStyle = '#24486A'; ctx.fillRect(x0, w, 960, 210); ctx.strokeStyle = '#9CC6DE'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 96; i++) { const x = x0 + i * 10, y = w + 2 * Math.sin(i * 0.5 - T * 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        const t = (T - 7) / 1.0; P.teken(ctx, x0 + 120 + 40 * s * (T - 7), w, s, { houding: 'zwemmen', t: t % 1, water: false }); bijschrift(x0, y0, 'zwemmen (kop en rug boven water, staart = roer)'); } });
    // KONIJN: zitten 0-1,5 s, grazen 1,5-3, huppen 3-6,5 (0,5 s per sprong), rennen 6,5-10 (0,3 s per pas)
    vak(1, 'konijn', (x0, y0) => { const g = y0 + 470, s = 8.5, P = ECO.konijn; ctx.strokeStyle = '#4A5670'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, g); ctx.lineTo(x0 + 960, g); ctx.stroke();
      if (T < 1.5) { P.teken(ctx, x0 + 300, g, s, { houding: 'zitten' }); bijschrift(x0, y0, 'zitten'); }
      else if (T < 3) { P.teken(ctx, x0 + 300, g, s, { houding: 'grazen', t: T }); bijschrift(x0, y0, 'grazen'); }
      else if (T < 6.5) { const t = (T - 3) / 0.5; P.teken(ctx, wrap(240 + P.SNELHEID.huppen * s * t, x0), g, s, { houding: 'huppen', t: t % 1 }); bijschrift(x0, y0, 'huppen: achtervoeten landen vóór de voorvoeten'); }
      else { const t = (T - 6.5) / 0.3; P.teken(ctx, wrap(240 + P.SNELHEID.rennen * s * t, x0), g, s, { houding: 'rennen', t: t % 1 }); bijschrift(x0, y0, 'rennen'); } });
    // SNEEUWSCHOENHAAS: zitten zomer 0-1,5, rennen 1,5-8,5 met vachtwissel 3,5 -> 7, zitten winter 8,5-10
    vak(2, 'sneeuwschoenhaas', (x0, y0) => { const g = y0 + 480, s = 7.0, P = ECO.haas; ctx.strokeStyle = '#4A5670'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, g); ctx.lineTo(x0 + 960, g); ctx.stroke();
      const v = Math.max(0, Math.min(1, (T - 3.5) / 3.5));
      if (T < 1.5) { P.teken(ctx, x0 + 300, g, s, { houding: 'zitten', vacht: 0 }); bijschrift(x0, y0, 'zomervacht'); }
      else if (T < 8.5) { const t = (T - 1.5) / 0.32; P.teken(ctx, wrap(240 + P.SNELHEID.rennen * s * t, x0), g, s, { houding: 'rennen', t: t % 1, vacht: v }); bijschrift(x0, y0, v <= 0 ? 'rennen' : v >= 1 ? 'wintervacht' : 'vacht wordt wit (o.vacht ' + v.toFixed(1) + ')'); }
      else { P.teken(ctx, x0 + 600, g, s, { houding: 'zitten', vacht: 1 }); bijschrift(x0, y0, 'wintervacht: wit, zwarte oorpunten'); } });
    // BOSSPITSMUIS: snuffelen 0-3, rennen 3-7 (4 Hz in beeld), snuffelen 7-10
    vak(3, 'bosspitsmuis', (x0, y0) => { const g = y0 + 420, s = 44, P = ECO.spitsmuis; ctx.strokeStyle = '#4A5670'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, g); ctx.lineTo(x0 + 960, g); ctx.stroke();
      const xr = (T < 3 ? 0 : Math.min(4, T - 3)) * 4 * P.SNELHEID.rennen * s;
      if (T < 3) { P.teken(ctx, x0 + 260, g, s, { houding: T < 0.6 ? 'staan' : 'snuffelen', t: T / 2, stand: T < 0.6 ? P.overgang({ houding: 'staan' }, { houding: 'snuffelen', t: T / 2 }, T / 0.6) : undefined }); bijschrift(x0, y0, 'snuffelen (snuit beweegt)'); }
      else if (T < 7) { const t = (T - 3) * 4; P.teken(ctx, wrap(220 + xr, x0), g, s, { houding: 'rennen', t: t % 1 }); bijschrift(x0, y0, 'snel trippelen'); }
      else { P.teken(ctx, wrap(220 + xr, x0), g, s, { houding: 'snuffelen', t: (T - 7) / 2 }); bijschrift(x0, y0, 'snuffelen'); } });
  },
  film_proef(ctx) { [12, 60, 100, 130, 170, 200, 230, 239].forEach((f, i) => { ctx.save(); ctx.translate((i % 4) * 480, Math.floor(i / 4) * 540); ctx.scale(0.25, 0.5); TV_pop_eco_klein.film(ctx, f); ctx.restore(); }); },
  // ---------------- overzicht ----------------
  overzicht(ctx) { ETV.bg(ctx, 'Familie klein: alle houdingen en gangen (eigen schaal per rij)'); const rij = (P, lijst, y, s) => lijst.forEach(([h, o], i) => { const x = 170 + i * 320; ETV.grond(ctx, x - 150, x + 150, y); P.teken(ctx, x, y, s, Object.assign({ houding: h }, o || {})); ETV.label(ctx, h + (o && o.vacht ? ' ' + o.vacht : '') + (o && o.t != null ? ' t' + o.t : ''), x, y + 28, '#8C97AE', 15); });
    rij(ECO.bever, [['staan'], ['lopen', { t: 0.2 }], ['lopen', { t: 0.6 }], ['knagen', { t: 0.1 }], ['zwemmen', { t: 0.2 }]], 290, 3.3);
    rij(ECO.konijn, [['zitten'], ['grazen'], ['huppen', { t: 0.05 }], ['huppen', { t: 0.35 }], ['huppen', { t: 0.7 }], ['rennen', { t: 0.8 }]], 530, 5.6);
    rij(ECO.haas, [['zitten'], ['zitten', { vacht: 'winter' }], ['rennen', { t: 0.4 }], ['rennen', { t: 0.8 }], ['rennen', { t: 0.8, vacht: 'winter' }], ['zitten', { vacht: 0.5 }]], 790, 4.6);
    rij(ECO.spitsmuis, [['staan'], ['rennen', { t: 0.1 }], ['rennen', { t: 0.6 }], ['snuffelen', { t: 0 }], ['snuffelen', { t: 0.3 }]], 1010, 28); },
  ware_grootte(ctx) { ETV.bg(ctx, 'Ware grootte t.o.v. de wolf (schoft 80 cm), s = 4,4 px/cm: wolf, bever, konijn, sneeuwschoenhaas (zomer/winter), bosspitsmuis (+ inzet × 8)');
    const s = 4.4, y = 900; ETV.grond(ctx, 40, 1880, y); if (typeof wolf === 'function') wolf(ctx, 330, y, s, { houding: 'staan' });
    ecoBever(ctx, 820, y, s, { houding: 'staan' }); ecoKonijn(ctx, 1120, y, s, { houding: 'zitten' }); ecoSneeuwschoenhaas(ctx, 1300, y, s, { houding: 'zitten' }); ecoSneeuwschoenhaas(ctx, 1470, y, s, { houding: 'zitten', vacht: 'winter' });
    ecoSpitsmuis(ctx, 1640, y, s, { houding: 'staan' });
    // maatstok 10 cm
    ctx.strokeStyle = '#C9B48A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1740, y + 40); ctx.lineTo(1740 + 10 * s, y + 40); ctx.stroke(); ETV.label(ctx, '10 cm', 1740 + 5 * s, y + 70, '#C9B48A', 18);
    [['wolf 80 cm schoft', 330], ['bever ± 31 cm', 820], ['konijn', 1120], ['haas zomer', 1300], ['haas winter', 1470], ['spitsmuis', 1640]].forEach(([n, x]) => ETV.label(ctx, n, x, y + 110, '#8C97AE', 17));
    ctx.save(); ctx.strokeStyle = '#5A6680'; ctx.lineWidth = 2; ctx.strokeRect(1560, 520, 320, 200); ctx.restore(); ETV.grond(ctx, 1570, 1870, 690); ecoSpitsmuis(ctx, 1730, 690, s * 8, { houding: 'staan' }); ETV.label(ctx, 'spitsmuis × 8', 1720, 550, '#8C97AE', 17); },
  overgangen(ctx) { ETV.bg(ctx, '6 tussenstanden (voeten via IK): bever staan->knagen, staan->zwemmen, konijn grazen->hup, spitsmuis staan->snuffelen');
    ETV.reeks(ctx, ECO.bever, { houding: 'staan' }, { houding: 'knagen', t: 0 }, 250, 2.6); ETV.reeks(ctx, ECO.bever, { houding: 'staan' }, { houding: 'zwemmen', t: 0 }, 500, 2.6);
    ETV.reeks(ctx, ECO.konijn, { houding: 'grazen' }, { houding: 'huppen', t: 0.35 }, 760, 6); ETV.reeks(ctx, ECO.spitsmuis, { houding: 'staan' }, { houding: 'snuffelen', t: 0 }, 1010, 22); },
  delen(ctx) { ETV.bg(ctx, 'Uit elkaar (rode stip = draaipunt): bever, konijn, sneeuwschoenhaas, bosspitsmuis');
    ETV.delen(ctx, ECO.bever, ETV_DELEN(60), 420, 430, 5.4); ETV.delen(ctx, ECO.konijn, ETV_DELEN(26), 1380, 380, 11); ETV.delen(ctx, ECO.haas, ETV_DELEN(30), 420, 840, 9); ETV.delen(ctx, ECO.spitsmuis, ETV_DELEN(8), 1380, 880, 46); },
  zooms(ctx) { ETV.bg(ctx, 'Zooms: schouder, heup, kop en poten (staan/lopen/rennen, mid-cyclus)'); const W = 470, H = 490;
    const Z = [[ECO.bever, { houding: 'lopen', t: 0.3 }, 28, -14, 18, 'bever schouder (lopen)'], [ECO.bever, { houding: 'lopen', t: 0.3 }, -2, -12, 18, 'bever heup (lopen)'], [ECO.bever, { houding: 'knagen', t: 0.2 }, 30, -52, 16, 'bever kop/tak (knagen)'], [ECO.bever, { houding: 'zwemmen', t: 0.3 }, 30, -2, 12, 'bever kop zwemmen'],
      [ECO.konijn, { houding: 'huppen', t: 0.32 }, 2, -6, 20, 'konijn landing (huppen)'], [ECO.konijn, { houding: 'rennen', t: 0.8 }, 2, -10, 16, 'konijn zweef (rennen)'], [ECO.haas, { houding: 'rennen', t: 0.45, vacht: 0.5 }, 0, -8, 15, 'haas landing (vacht 0,5)'], [ECO.spitsmuis, { houding: 'snuffelen', t: 0.1 }, 2.6, -3.4, 95, 'spitsmuis kop/snuit']];
    Z.forEach(([P, o, cx, cy, s, ti], i) => { const c = i % 4, r = Math.floor(i / 4); ETV.zoom(ctx, P, o, cx, cy, s, [10 + c * (W + 6), 70 + r * (H + 10), W, H], ti); }); },
};

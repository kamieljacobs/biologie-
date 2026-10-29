/* scenes_a.js — bibliotheek voor deze film (cyclusmodel, regelkring, organen in Schema) en de hoofdstukken 0–3 */
window.OSC = {};
window.LIB = (function () {
  'use strict';
  const E = ENG, C = E.C;
  /* kleurafspraak hormonen (v3.1, 29 okt 2026): gelijk met Les 2 Voortplanting (HK() in tools/docent/voortplanting-2): FSH groen, LH goud, oestrogeen koraal,
     progesteron paars, testosteron teal, hCG oker, oxytocine teal; GnRH (releasing-hormoon) licht paars #B3A6DA. Hormonen die Les 2 niet kent (inhibine, AMH) neutraal grijs,
     DHT donker teal (familie van testosteron). Kleur is nooit de enige drager: elk hormoon staat er bij de eerste keer met naam of legenda bij.
     Overig: bloed = koraal; leven/kind/positief = groen; voedsel/cholesterol/geel lichaam = oker; focus = goud */
  const HC = { GnRH: '#B3A6DA', FSH: C.green, LH: C.gold, hCG: C.ochre, OXT: C.teal, T: C.teal, E2: C.coral, P4: C.purple, INH: C.ink2, AMH: C.ink2, DHT: C.tealD };

  /* ---------- cyclusmodel: een eenvoudig terugkoppelmodel, vast tijdstapje, deterministisch ----------
     F = grootte dominante follikel (0..1), E2 = oestrogeen, P4 = progesteron, FSH, LH, CL = geel lichaam (activiteit), endo = dikte slijmvlies.
     exo = {E2, P4} van buiten (pil), exoFrom/exoTo = dagen waarop dat geldt. Waarden in relatieve eenheden; vorm volgt het schoolboek. */
  function cycle(opts = {}) {
    const dt = 0.05, days = opts.days || 56; const n = Math.round(days / dt) + 1;
    const out = { t: new Float32Array(n), FSH: new Float32Array(n), LH: new Float32Array(n), E2: new Float32Array(n), P4: new Float32Array(n), F: new Float32Array(n), CL: new Float32Array(n), endo: new Float32Array(n), menses: new Uint8Array(n), ov: [], surge: [], dt, n };
    let F = 0.08, CLage = -1, hiE = 0, surgeT = -99, endo = 0.25, mensLeft = 3.5, cohort = 0.3, bleedAt = -99;
    let LHf = 0.3, FSHf = 0.8;
    for (let i = 0; i < n; i++) {
      const t = i * dt; out.t[i] = t;
      const exo = opts.exo && ((t >= (opts.exoFrom ?? 0) && t < (opts.exoTo ?? 1e9)) || (opts.exoFrom2 != null && t >= opts.exoFrom2)) ? opts.exo : null;
      const CL = CLage >= 0 && CLage < 14 ? Math.sin(Math.PI * Math.min(1, CLage / 14)) ** 0.8 * (CLage < 13 ? 1 : Math.max(0, 1 - (CLage - 13) / 2.2)) : 0;
      const hcgBoost = opts.hcgFrom != null && CLage >= 0 && t >= opts.hcgFrom ? 1 : 0;
      const CLeff = hcgBoost ? Math.max(CL, 0.85) : CL;
      // na het begin van de LH-piek maakt de follikel minder oestrogeen (luteïnisatie): de oestrogeenpiek ligt vóór de LH-piek
      const lut = (surgeT > 0 && t >= surgeT) ? Math.max(0.2, 0.85 - 0.45 * (t - surgeT)) : Math.max(0.85, 1 - 0.15 * Math.max(0, hiE - 1));
      let E2 = 0.12 + 1.9 * Math.pow(F, 2.2) * lut + 0.55 * CLeff; let P4 = 0.04 + 1.0 * CLeff + (surgeT > 0 && t > surgeT && CLage < 0 ? 0.12 * Math.min(1, t - surgeT) : 0);
      if (exo) { E2 = Math.max(E2, exo.E2); P4 = Math.max(P4, exo.P4); }
      // hypofyse: negatieve terugkoppeling door E2 (laag/middel) en P4; inhibine met de follikel
      const inh = 0.3 * F + (CLage >= 0 && CLage < 13 ? 0.35 : 0);   // inhibine uit follikel en (inhibine A) uit het gele lichaam
      const surge0 = Math.exp(-Math.pow((t - surgeT) / 0.7, 2));
      const FSHt = E.clamp(1.05 - 0.4 * Math.min(E2, 1.2) - 0.6 * P4 - inh + (mensLeft > 0 ? 0.12 : 0), 0.15, 1.6) + 0.55 * surge0;
      FSHf += (FSHt - FSHf) * dt * 2.2;
      // LH: basis met negatieve terugkoppeling; positieve terugkoppeling als E2 ≥ 2 dagen hoog is (en geen P4)
      if (E2 > 1.1 && P4 < 0.35 && !exo) hiE += dt; else hiE = Math.max(0, hiE - dt * 2);
      if (hiE >= 2.0 && t - surgeT > 10) { surgeT = t; out.surge.push(t); hiE = 0; }
      const surge = Math.exp(-Math.pow((t - surgeT) / 0.7, 2)) * 3.2;
      const LHt = E.clamp(0.42 - 0.12 * Math.min(E2, 1.0) - 0.3 * P4 + 0.1 * F, 0.12, 1.0) + surge;
      LHf += (LHt - LHf) * dt * 4;
      // follikel: groeit met FSH boven een drempel; de dominante follikel heeft meer receptoren (gevoeliger)
      if (CLage < 0 || CLage > 13.5) { const drive = Math.max(0, FSHf - 0.40 + 0.75 * F); F += dt * (0.127 * drive * (1 - F) * (1 + 1.2 * F)); } else F += dt * (0.02 * Math.max(0, FSHf - 0.6) * (1 - F));
      F = Math.max(0.06, F - dt * 0.004);
      // eisprong ± 36 uur na het begin van de piek
      if (surgeT > 0 && t - surgeT >= 1.5 && t - surgeT < 1.5 + dt && F > 0.5) { out.ov.push(t); CLage = 0; F = 0.08; }
      if (CLage >= 0) { CLage += dt; if (CLage > 15.5 && !hcgBoost) CLage = -1; }
      // slijmvlies: groeit met E2, verdikt met P4; valt af als P4 wegvalt na hoog te zijn geweest
      if (P4 > 0.5) bleedAt = -1; else if (bleedAt === -1 && P4 < 0.25) { bleedAt = t; mensLeft = 4; }
      if (mensLeft > 0) { mensLeft -= dt; endo = Math.max(0.22, endo - dt * 0.28); out.menses[i] = 1; }
      else endo = Math.min(1.1, endo + dt * (0.035 * E2 + 0.08 * P4));
      out.FSH[i] = FSHf; out.LH[i] = LHf; out.E2[i] = E2; out.P4[i] = P4; out.F[i] = F; out.CL[i] = CLeff; out.endo[i] = endo;
    }
    out.at = (key, t) => { const i = E.clamp(Math.round(t / dt), 0, n - 1); return out[key][i]; };
    return out;
  }
  const CYC = cycle();   // de normale cyclus; dag 0 = eerste dag van de menstruatie

  /* ---------- grafiekvak (Schema): assen #8FA0B5, raster 3 %, Meta-aswaarden ≥ 28 px ---------- */
  function graphBox(g, B, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; g.screen();
    g.grid(B.x, B.y, B.x + B.w, B.y + B.h, 50, a);
    c.save(); c.globalAlpha = a; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(B.x, B.y); c.lineTo(B.x, B.y + B.h); c.lineTo(B.x + B.w, B.y + B.h); c.stroke(); c.restore();
    if (o.xlabel) g.text(o.xlabel, B.x + B.w, B.y + B.h + 44, { size: 28, f: 'mono', color: C.grain, align: 'right', alpha: a, ls: 1.5, layer: 'meta' });
    if (o.ylabel) g.text(o.ylabel, B.x - 6, B.y - 30, { size: 28, f: 'mono', color: C.grain, alpha: a, ls: 1.5, layer: 'meta' });
    if (o.xticks) o.xticks.forEach(([v, s]) => { const x = B.x + (v - o.x0) / (o.x1 - o.x0) * B.w; c.save(); c.globalAlpha = a; c.strokeStyle = C.line; c.beginPath(); c.moveTo(x, B.y + B.h); c.lineTo(x, B.y + B.h + 8); c.stroke(); c.restore(); g.text(s, x, B.y + B.h + 44, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: a, layer: 'meta' }); });
  }
  /* lijn uit het model tot dag 'upto' */
  function curve(g, B, M, key, x0, x1, ymax, upto, col, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return null; const c = g.ctx; g.screen();
    c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = o.lw || 3; c.lineJoin = 'round'; if (o.dash) c.setLineDash(o.dash); c.beginPath();
    let last = null; const i0 = Math.max(0, Math.round(x0 / M.dt)), i1 = Math.min(M.n - 1, Math.round(Math.min(upto, x1) / M.dt));
    for (let i = i0; i <= i1; i++) { const x = B.x + (M.t[i] - x0) / (x1 - x0) * B.w, y = B.y + B.h - E.clamp(M[key][i] / ymax, 0, 1.02) * B.h; if (i === i0) c.moveTo(x, y); else c.lineTo(x, y); last = [x, y]; }
    c.stroke(); c.restore();
    if (last && o.label) { g.text(o.label, last[0] + 14, last[1] + 10, { size: 32, w: 600, color: col, alpha: a }); }
    return last;
  }
  /* legenda: lijnstukjes met naam, op één rij */
  function legend(g, x, y, items, a = 1) { if (a <= 0.01) return; const c = g.ctx; g.screen(); let cx = x; items.forEach(([name, col, dash]) => { c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 3; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(cx, y - 10); c.lineTo(cx + 40, y - 10); c.stroke(); c.restore(); const b = g.text(name, cx + 50, y, { size: 32, w: 600, color: col, alpha: a }); cx = (b ? b.x1 : cx + 100) + 36; }); }
  /* svg-versie van de cyclusgrafiek voor in de vraagkaart (HTML) */
  function cycleSVG() {
    const M = CYC, w = 900, h = 300, x0 = 0, x1 = 28, L = 70, Bm = 50, ymax = 3.4;
    const path = (key, col, dash) => { let d = ''; for (let i = 0; i <= Math.round(28 / M.dt); i++) { const x = L + (M.t[i] / 28) * (w - L - 20), y = 20 + (h - Bm - 20) * (1 - E.clamp(M[key][i] / ymax, 0, 1)); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return `<path d="${d}" fill="none" stroke="${col}" stroke-width="3" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`; };
    const ticks = [0, 7, 14, 21, 28].map((d) => { const x = L + d / 28 * (w - L - 20); return `<text x="${x}" y="${h - 14}" fill="#C9B896" font-family="IBM Plex Mono,monospace" font-size="22" text-anchor="middle">${d}</text><line x1="${x}" y1="${h - Bm}" x2="${x}" y2="${h - Bm + 6}" stroke="#8FA0B5"/>`; }).join('');
    const leg = [['FSH', HC.FSH, ''], ['LH', HC.LH, '10 7'], ['oestrogeen', HC.E2, ''], ['progesteron', HC.P4, '10 7']].map(([s, col, dash], i) => `<line x1="${L + 10 + i * 210}" y1="18" x2="${L + 50 + i * 210}" y2="18" stroke="${col}" stroke-width="3" ${dash ? `stroke-dasharray="${dash}"` : ''}/><text x="${L + 60 + i * 210}" y="25" fill="#F2F2EE" font-family="Source Sans 3,sans-serif" font-size="22">${s}</text>`).join('');
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafiek van FSH, LH, oestrogeen en progesteron over 28 dagen" style="display:block;margin:.4cqw 0 1cqw;background:#1A2740;border-radius:.6cqw">${leg}<line x1="${L}" y1="20" x2="${L}" y2="${h - Bm}" stroke="#8FA0B5" stroke-width="1.5"/><line x1="${L}" y1="${h - Bm}" x2="${w - 20}" y2="${h - Bm}" stroke="#8FA0B5" stroke-width="1.5"/>${ticks}<text x="${w - 20}" y="${h - 14}" fill="#C9B896" font-family="IBM Plex Mono,monospace" font-size="20" text-anchor="end">dag</text>${path('FSH', HC.FSH)}${path('LH', HC.LH, '10 7')}${path('E2', HC.E2)}${path('P4', HC.P4, '10 7')}</svg>`;
  }

  /* ---------- regelkring (Schema): hypothalamus, hypofyse, geslachtsklier in een kolom; pijlen in de kleur van het signaal ---------- */
  function hpg(g, o) {
    // v2.5 (prompt v8, C9): echte hersenen in plaats van tekstvakken. Hoofd in doorsnede (lib_bio hoofdHersenen) met de
    // hypothalamus en de hypofyse aan zijn steeltje; FSH en LH gaan door een echt bloedvat naar de geslachtsklier.
    // o: x (kolom), y0; alpha; hyp/pit/gon (alfa per deel), gonName, gnrh, fsh, lh (alfa), fb / fbPos (terugkoppeling), t
    const a = o.alpha == null ? 1 : o.alpha; const x = o.x || 420, y0 = o.y0 || 150; const bw = 330, bh = 96; const s = 0.62, t = o.t || 0;
    const hthP = [x, y0 + 170], hypP = [x + 5 * s, y0 + 170 + 74 * s];
    const Y = { hyp: hthP[1] - 48, pit: hypP[1] - 48, gon: y0 + 470, hthP, hypP }; if (a <= 0.01) return Y;
    const aH = a * (o.hyp == null ? 1 : o.hyp), aP = a * (o.pit == null ? 1 : o.pit), aG = a * (o.gon == null ? 1 : o.gon);
    const c = g.ctx; g.screen();
    if (Math.max(aH, aP) > 0.01) { c.save(); c.globalAlpha = Math.max(aH, aP); hoofdHersenen(c, hthP[0], hthP[1], s, { hth: aH * (o.hthGloed == null ? 1 : o.hthGloed), hyp: aP * (o.hypGloed == null ? 1 : o.hypGloed) }); c.restore();
      // v3.1 (nacontrole 29 okt): labels direct naast de gele structuren zelf (stonden links naast de kleine hersenen):
      // hypothalamus links erboven op de grote hersenen, hypofyse rechts naast de hypofyse in het Turkse zadel
      g.text('hypothalamus', hthP[0] - 22, hthP[1] - 14, { size: 32, w: 600, align: 'right', alpha: aH, halo: 7 });
      g.text('hypofyse', hypP[0] + 26, hypP[1] + 10, { size: 32, w: 600, align: 'left', alpha: aP, halo: 7 }); }
    if (aG > 0.01) { g.box(x - bw / 2, Y.gon, bw, bh, { alpha: aG }); g.text(o.gonName || 'geslachtsklier', x, Y.gon + 60, { size: 36, w: 600, align: 'center', alpha: aG }); }
    if (o.gnrh) { const ag = a * o.gnrh; const ph = (t * 1.6) % 1; if (ph < 0.6) { for (let k = 0; k < 3; k++) { const u = E.clamp(ph / 0.6 - k * 0.15, 0, 1); E.hormone(g, E.lerp(hthP[0] + 4, hypP[0], u), E.lerp(hthP[1] + 10, hypP[1] - 6, u), HC.GnRH, { r: 5, alpha: ag }); } }
      g.text('GnRH', hthP[0] - 20, hthP[1] + 24, { size: 26, w: 600, align: 'right', color: HC.GnRH, alpha: ag, halo: 6 }); }
    if (o.fsh || o.lh) { const af = a * Math.max(o.fsh || 0, o.lh || 0); const vat = [[hypP[0] + 4, hypP[1] + 16], [x + 26, y0 + 300], [x + 34, y0 + 400], [x + 20, Y.gon - 4]];
      c.save(); c.globalAlpha = af; bloedvat(c, vat, 11, t, { n: 6, cel: 6, speed: 0.25 }); c.restore();
      L_stream2(g, vat, t, 0.3, 3, HC.FSH, { alpha: a * (o.fsh || 0), r: 6 }); L_stream2(g, vat, t + 1.1, 0.3, 3, HC.LH, { alpha: a * (o.lh || 0), r: 6 });
      g.text('FSH', x - 20, y0 + 410, { size: 36, w: 600, color: HC.FSH, align: 'right', alpha: a * (o.fsh || 0) }); g.text('LH', x + 70, y0 + 410, { size: 36, w: 600, color: HC.LH, alpha: a * (o.lh || 0) }); }
    if (o.fb) { // negatieve terugkoppeling: gebogen remlijn van de klier terug naar hypofyse en hypothalamus
      const col = o.fbColor || HC.T;
      g.inhibit(x + bw / 2, Y.gon + bh / 2, hypP[0] + 22, hypP[1] + 26, { color: col, alpha: a * o.fb, lw: 2, bend: -0.35 });
      g.inhibit(x + bw / 2, Y.gon + bh / 2, hthP[0] + 40, hthP[1], { color: col, alpha: a * o.fb, lw: 2, bend: -0.42 });
      g.text('−', x + bw / 2 + 150, (hypP[1] + Y.gon) / 2, { size: 48, w: 700, color: col, alpha: a * o.fb, align: 'center' });
    }
    if (o.fbPos) { const col = o.fbColor || HC.E2; g.arrow(x + bw / 2, Y.gon + bh / 2, hypP[0] + 22, hypP[1] + 26, { color: col, alpha: a * o.fbPos, lw: 2.5, bend: -0.35 }); g.text('+', x + bw / 2 + 150, (hypP[1] + Y.gon) / 2, { size: 48, w: 700, color: col, alpha: a * o.fbPos, align: 'center' }); }
    return Y;
  }
  function L_stream2(g, pts, t, rate, n, col, o) { for (let i = 0; i < n; i++) { const p = ((t * rate + i / n) % 1); const P = bioPunt(pts, p); E.hormone(g, P[0], P[1], col, { alpha: o.alpha, r: o.r }); } }
  /* hormoonstip die langs een pad beweegt (schermruimte); p 0..1 */
  function flow(g, pts, p, col, o = {}) { const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const n = pts.length - 1; const k = E.clamp(p, 0, 1) * n; const i = Math.min(n - 1, Math.floor(k)); const f = k - i; const x = E.lerp(pts[i][0], pts[i + 1][0], f), y = E.lerp(pts[i][1], pts[i + 1][1], f); E.hormone(g, x, y, col, { alpha: a, r: o.r || 9, kind: o.kind }); }
  /* meerdere stipjes achter elkaar langs een pad, in een lus */
  function stream(g, pts, t, rate, n, col, o = {}) { for (let i = 0; i < n; i++) { const p = ((t * rate + i / n) % 1); flow(g, pts, p, col, o); } }
  /* meter/balk voor een spiegel (Schema) */
  function gauge(g, x, y, w, h, v, col, label, a = 1, o = {}) { if (a <= 0.01) return; const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a; c.fillStyle = C.fill2; c.strokeStyle = C.fillL; c.lineWidth = 1; E.rr(c, x, y, w, h, 6); c.fill(); c.stroke(); c.fillStyle = col; const hh = E.clamp(v, 0, 1) * (h - 6); E.rr(c, x + 3, y + h - 3 - hh, w - 6, hh, 4); c.fill(); c.restore(); if (label) g.text(label, x + w / 2, y + h + 36, { size: 28, f: 'mono', color: col, align: 'center', alpha: a, layer: 'meta' }); if (o.set != null) { c.save(); c.globalAlpha = a; c.strokeStyle = C.gold; c.setLineDash([6, 5]); c.lineWidth = 1.5; const sy = y + h - 3 - E.clamp(o.set, 0, 1) * (h - 6); c.beginPath(); c.moveTo(x - 10, sy); c.lineTo(x + w + 10, sy); c.stroke(); c.restore(); } }

  /* ---------- organen (Schema): baarmoeder met eileiders en eierstokken, dwarsdoorsnede ---------- */
  function uterus(g, cx, cy, s, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a; c.translate(cx, cy); c.scale(s, s);
    c.lineWidth = 1.4 / s; c.fillStyle = o.fill || C.fill; c.strokeStyle = E.lighter(o.fill || C.fill, 0.3);
    // baarmoeder (wand) als afgeronde driehoek; holte erin
    c.beginPath(); c.moveTo(-150, -120); c.quadraticCurveTo(0, -200, 150, -120); c.quadraticCurveTo(170, 20, 60, 150); c.lineTo(-60, 150); c.quadraticCurveTo(-170, 20, -150, -120); c.closePath(); c.fill(); c.stroke();
    // slijmvlies (dikte endo 0..1) langs de holte
    const en = o.endo == null ? 0.5 : o.endo; c.fillStyle = o.endoColor || C.coralL; c.strokeStyle = E.lighter(o.endoColor || C.coralL, 0.3);
    c.beginPath(); c.moveTo(-70, -100); c.quadraticCurveTo(0, -140, 70, -100); c.quadraticCurveTo(70, 30, 20, 120); c.lineTo(-20, 120); c.quadraticCurveTo(-70, 30, -70, -100); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = C.schema; const k = 1 - 0.55 * en; c.beginPath(); c.moveTo(-70 * k, -100 + 10 * en); c.quadraticCurveTo(0, -140 + 30 * en, 70 * k, -100 + 10 * en); c.quadraticCurveTo(50 * k, 30, 14 * k, 110); c.lineTo(-14 * k, 110); c.quadraticCurveTo(-50 * k, 30, -70 * k, -100 + 10 * en); c.closePath(); c.fill();
    // eileiders (buizen) en eierstokken
    c.fillStyle = o.fill || C.fill; c.strokeStyle = E.lighter(o.fill || C.fill, 0.3); c.lineWidth = 1.4 / s;
    for (const sd of [-1, 1]) {
      c.beginPath(); c.moveTo(sd * 120, -130); c.quadraticCurveTo(sd * 250, -200, sd * 330, -120); c.quadraticCurveTo(sd * 345, -108, sd * 330, -96); c.quadraticCurveTo(sd * 250, -170, sd * 120, -106); c.closePath(); c.fill(); c.stroke();
      // franje
      for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(sd * 330, -120 + i * 8); c.lineTo(sd * (350 + i * 4), -130 + i * 14); c.stroke(); }
      c.beginPath(); c.ellipse(sd * 355, -60, 42, 30, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    }
    // baarmoederhals en vagina
    c.beginPath(); c.moveTo(-60, 150); c.lineTo(-45, 260); c.lineTo(45, 260); c.lineTo(60, 150); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = C.schema; c.beginPath(); c.moveTo(-14, 150); c.lineTo(-12, 258); c.lineTo(12, 258); c.lineTo(14, 150); c.closePath(); c.fill();
    c.restore();
    return { ovL: [cx - 355 * s, cy - 60 * s], ovR: [cx + 355 * s, cy - 60 * s], tubeL: [cx - 230 * s, cy - 150 * s], tubeR: [cx + 230 * s, cy - 150 * s], cavity: [cx, cy - 20 * s], cervix: [cx, cy + 200 * s], vagina: [cx, cy + 255 * s] };
  }
  /* follikel: blaasje van hulpcellen rond een eicel */
  function follicle(g, x, y, r, o = {}) {
    const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return; const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a;
    c.fillStyle = o.fill || C.fill2; c.strokeStyle = o.stroke || C.fillL; c.lineWidth = o.lw || 1.3; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
    // hulpcellen als stippen langs de rand
    const n = Math.max(8, Math.round(r / 5)); c.fillStyle = o.cells || C.fillL; for (let i = 0; i < n; i++) { const th = i / n * Math.PI * 2; c.beginPath(); c.arc(x + Math.cos(th) * (r - 5), y + Math.sin(th) * (r - 5), 2.6, 0, Math.PI * 2); c.fill(); }
    if (o.fluid && r > 24) { c.fillStyle = C.schema; c.beginPath(); c.arc(x + r * 0.15, y - r * 0.1, r * 0.45 * o.fluid, 0, Math.PI * 2); c.fill(); }
    c.restore();
    if (o.egg !== false) { const er = Math.max(5, Math.min(14, r * 0.3)); g.disc(x - r * 0.2 * (o.fluid ? 1 : 0), y + r * 0.15 * (o.fluid ? 1 : 0), er, { fill: o.eggFill || C.nucFill, stroke: C.nucEdge, alpha: a }); }
  }
  /* geel lichaam */
  function corpusLuteum(g, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const c = g.ctx; g.screen(); c.save(); c.globalAlpha = a; c.fillStyle = o.fill || C.ochre; c.strokeStyle = E.lighter(o.fill || C.ochre, 0.3); c.lineWidth = 1.3; c.beginPath(); E.rr(c, x - r, y - r * 0.8, 2 * r, 1.6 * r, r * 0.6); c.fill(); c.stroke(); c.strokeStyle = E.lighter(o.fill || C.ochre, 0.5); for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(x - r * 0.6 + i * r * 0.4, y - r * 0.5); c.lineTo(x - r * 0.5 + i * r * 0.4, y + r * 0.5); c.stroke(); } c.restore(); }
  /* titelbeeld rechts: eicel met zaadcellen in Micro-cirkel */
  function titleImage(g, a) {
    g.zoomCircle(1440, 560, 300, 1440, 560, 0, 'micro', (gg) => {
      const c = gg.ctx; E.cell(gg, 1440, 560, 120, { alpha: a, nr: 38, nx: 10, ny: -6 });
      c.save(); c.globalAlpha = a; c.strokeStyle = C.ochreL; c.lineWidth = 6; c.beginPath(); c.arc(1440, 560, 140, 0, Math.PI * 2); c.stroke(); c.restore();
      for (let i = 0; i < 7; i++) { const th = -2.6 + i * 0.42; const d = 215 + E.hash(i) * 40; E.sperm(gg, 1440 + Math.cos(th) * d, 560 + Math.sin(th) * d, th + Math.PI, 1.6, { alpha: a, wig: i }); }
    }, null, a);
  }
  /* klok/dagteller (Meta, linksonder) */
  function dayClock(g, day, a, extra, y) { const s = `DAG ${Math.max(1, Math.floor(day) + 1)} VAN DE CYCLUS${extra ? ' · ' + extra : ''}`; if (y) g.text(s, 60, y, { size: 28, f: 'mono', color: C.grain, alpha: a, ls: 2, layer: 'meta' }); else g.meta(s, a); }

  return { HC, cycle, CYC, graphBox, curve, legend, cycleSVG, hpg, flow, stream, gauge, uterus, follicle, corpusLuteum, titleImage, dayClock };
})();

/* ========== H0 Opening — de puzzel: één dag, vijf dagen, één eicel; oma → moeder → jij; daarna de titelkaart ========== */
OSC['0'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, W = TL.W;
  const T = { eicel: W(1, 'eicel'), dag: W(1, 'dag'), zaad: W(2, 'zaadcel'), vijf: W(2, 'vijf'), vinden: W(3, 'vinden'), plek: W(3, 'plek'), moment: W(4, 'moment'),
    lukt: W(5, 'lukt'), negen: W(6, 'Negen'), moeder: W(6, 'moeder'), organen: W(7, 'organen'), signalen: W(8, 'signalen'), stijgen: W(8, 'stijgen'),
    film: W(9, 'film'), jij: W(10, 'jij'), moeder2: W(11, 'moeder'), oma: W(12, 'oma'), end: TL.E(12) };
  const TT = TL.seg('title');
  TL.cue('term', 'eicel ± 1 dag', T.eicel, T.vinden, { anchor: 'r1 eicel' }); TL.cue('term', 'zaadcel ± 5 dagen', T.zaad, T.vinden, { anchor: 'r2 zaadcel' });
  TL.cue('action', 'cellen vinden elkaar in de eileider', T.vinden, T.lukt, { anchor: 'r3 vinden' });
  TL.cue('action', 'negen maanden: figuur met groeiende buik', T.negen, T.organen, { anchor: 'r6 Negen' });
  TL.cue('action', 'organen los → signalen verbinden ze', T.organen, T.film, { anchor: 'r7 organen' });
  TL.cue('action', 'oma → moeder → jij', T.moeder2, T.end + 0.5, { anchor: 'r11 moeder' });
  TL.cue('hold', 'titelkaart', TT.t0, TT.t1);
  // v2.3: castpersonages (jij = Noor, je moeder = Linda, je oma = Oma Ria (outfit 'vroeger') toen ze zwanger was van je moeder)
  const fig = (g, id, x, y, name, a, o) => { g.screen(); castFig(g, id, x, y + 92, 285, Object.assign({ alpha: a, t: g.__t || 0 }, o)); g.text(name, x, y + 140, { size: 36, w: 600, align: 'center', alpha: a }); };
  function draw(g, t) {
    g.bg('schema');
    const aT = E.vis(t, TT.t0, null, 0.6);
    const aS = (1 - aT);
    if (aS > 0.01) {
      // deel 1: twee cellen met hun levensduur (tot 'lukt')
      const a1 = aS * E.vis(t, 0, T.lukt - 0.2, 0.4, 0.5);
      if (a1 > 0.01) {
        const meet = E.ep(t, T.vinden, 2.6);                      // bewegen naar elkaar
        const ex = E.lerp(520, 790, meet), sx = E.lerp(1400, 1130, meet);
        g.zoomCircle(ex, 470, 130, ex, 470, 0, 'micro', (gg) => { E.cell(gg, ex, 470, 70, { alpha: a1, nr: 24, nx: 6 }); }, null, a1);
        g.label('eicel', 'LEEFT ± 1 DAG', ex, 340, ex - 60, 230, { alpha: a1 * E.vis(t, T.eicel, T.vinden) });
        g.zoomCircle(sx, 470, 130, sx, 470, 0, 'micro', (gg) => { E.sperm(gg, sx + 20, 470, Math.PI + 0.15 * Math.sin(t * 6), 3.2, { alpha: a1, wig: t * 8 }); }, null, a1);
        g.label('zaadcel', 'LEEFT HOOGUIT ± 5 DAGEN', sx, 340, sx - 60, 230, { alpha: a1 * E.vis(t, T.zaad, T.vinden) });
        const aw = a1 * E.vis(t, T.plek, T.lukt);
        g.text('precies de goede plek', 960, 720, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aw });
        g.text('precies het goede moment', 960, 790, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aw * E.vis(t, T.moment, T.lukt) });
      }
      // deel 2: negen maanden en de organen die samenwerken (lukt → film)
      const a2 = aS * E.vis(t, T.lukt - 0.2, T.film - 0.2, 0.5, 0.5);
      if (a2 > 0.01) {
        const grow = E.ep(t, T.negen, 3.5);
        // v2.5 (prompt v8, C1/C9): de organen op hun echte plek in het lichaam van Linda (kijkje in hoofd en buik, lib_bio),
        // verbonden door hormonen die tussen de echte organen reizen (geen losse tekstvakjes meer)
        const LX = 470, LY = 930, LH = 680, zw = 0.15 + 0.85 * grow; const aL = a2 * E.vis(t, T.lukt, null);
        g.screen(); const P = castFig(g, 'linda', LX, LY, LH, { alpha: aL, outfit: 'zwanger', zwanger: zw, uit: 'blij', t });
        g.text('de moeder', LX, 228, { size: 36, w: 600, align: 'center', alpha: aL });
        const aO = a2 * E.vis(t, T.organen, null), aSig = a2 * E.vis(t, T.signalen, null);
        let HK = null, BK = null;
        if (aO > 0.01 && P.hoofd) { const cc = g.ctx; cc.save(); cc.globalAlpha = aO; HK = hoofdKijkje(cc, P.hoofd, { a: 0 }); BK = buikKijkje(cc, 'linda', LX, LY, LH, zw, { foetus: zw, t, hlEierstok: aSig * 0.6 }); cc.restore(); }
        // v2.6 (Kamiel 22 okt): geen hersenen over het gezicht; het gezicht blijft zichtbaar, de hersenen staan als uitvergroting ernaast
        const ZB = { x: 735, y: 205, r: 118 };
        if (HK) g.zoomCircle(ZB.x, ZB.y, ZB.r, HK.hyp[0], HK.hyp[1] - 10, P.hoofd.r * 0.42, 'schema', (gg) => { breinVoor(gg.ctx, ZB.x, ZB.y + 12, 1.42, { hth: aSig, hyp: aSig }); }, null, aO);
        // tijdlijn negen maanden
        const aM = a2 * E.vis(t, T.negen, null); const x0 = 980, x1 = 1300, ty = 860;
        g.ctx.save(); g.ctx.globalAlpha = aM; g.ctx.strokeStyle = C.line; g.ctx.lineWidth = 1.5; g.ctx.beginPath(); g.ctx.moveTo(x0, ty); g.ctx.lineTo(x1, ty); for (let i = 0; i <= 9; i++) { const x = x0 + i * (x1 - x0) / 9; g.ctx.moveTo(x, ty - 6); g.ctx.lineTo(x, ty + 6); } g.ctx.stroke(); g.ctx.fillStyle = C.gold; g.ctx.beginPath(); g.ctx.arc(x0 + grow * (x1 - x0), ty, 6, 0, 7); g.ctx.fill(); g.ctx.restore();
        g.text('9 MAANDEN', (x0 + x1) / 2, ty + 46, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aM, ls: 2, layer: 'meta' });
        if (HK && BK) {
          const hyp = HK.hyp, ov = BK.eierstokR, bm = BK.baarmoeder, fe = BK.foetus;
          const nl = { noline: true };
          const lx = LX + 150, oy = Math.min(ov[1], bm.y - 20);
          g.label('hersenen', 'HYPOTHALAMUS EN HYPOFYSE', null, null, ZB.x + ZB.r + 40, ZB.y, Object.assign({ alpha: aO }, nl));
          g.label('eierstok', null, null, null, lx, oy - 30, Object.assign({ alpha: aO }, nl));
          g.label('baarmoeder', null, null, null, lx, oy + 30, Object.assign({ alpha: aO }, nl));
          g.label('embryo', null, null, null, lx, oy + 90, Object.assign({ alpha: aO, color: C.greenL }, nl));
          if (aSig > 0.01) {
            const paths = [[[hyp[0] + 2, P.hoofd.y + P.hoofd.r * 1.25], [LX + 26, (hyp[1] + ov[1]) / 2], [ov[0], ov[1] - 6]], [[ov[0] - 6, ov[1] + 4], [bm.x + bm.rx * 0.6, bm.y]], [[bm.x, bm.y - bm.ry * 0.7], [fe[0], fe[1]]], [[fe[0] + 6, fe[1] - 6], [ov[0] - 4, ov[1] + 8]]];
            const cols = [L.HC.FSH, L.HC.E2, L.HC.P4, L.HC.hCG];
            paths.forEach((p, i) => { for (let k = 0; k < 3; k++) { const P2 = bioPunt(p, ((t * 0.35 + i * 0.25 + k / 3) % 1)); E.hormone(g, P2[0], P2[1], cols[i], { alpha: aSig, r: 6 }); } });
            g.text('hormonen: op tijd stijgen en dalen', 1180, 760, { size: 36, w: 600, align: 'center', color: C.ink2, alpha: aSig * E.vis(t, T.stijgen, null) });
          }
        }
      }
      // deel 3: één eicel; oma → moeder → jij
      const a3 = aS * E.vis(t, T.film - 0.2, null, 0.5);
      if (a3 > 0.01) {
        const aJ = a3 * E.vis(t, T.jij, null), aMo = a3 * E.vis(t, T.moeder2, null), aOma = a3 * E.vis(t, T.oma, null);
        g.__t = t; fig(g, 'noor', 1460, 640, 'jij', aJ, { uit: 'blij', pose: 'zwaai' }); fig(g, 'linda', 960, 640, 'je moeder', aMo, { outfit: 'zwanger', zwanger: 0.6, uit: 'blij' }); fig(g, 'ria', 460, 640, 'je oma', aOma, { outfit: 'vroeger', zwanger: 0.6, uit: 'blij', kijk: 1 });
        g.zoomCircle(960, 300, 120, 960, 300, 0, 'micro', (gg) => { E.cell(gg, 960, 300, 64, { alpha: a3, nr: 22, nx: 6 }); }, 'ÉÉN EICEL', a3);
        g.ctx.save(); g.ctx.globalAlpha = aOma; g.ctx.strokeStyle = C.gold; g.ctx.lineWidth = 1.5; g.ctx.setLineDash([8, 8]); g.ctx.beginPath(); g.ctx.moveTo(470, 560); g.ctx.lineTo(960, 420); g.ctx.stroke(); g.ctx.restore();
        g.text('het verhaal begint hier', 460, 320, { size: 36, w: 600, align: 'center', color: C.gold, alpha: aOma });
      }
    }
    if (aT > 0.01) E.titleCard(g, aT, 'Van bevruchting tot baby', 'voortplanting als regelsysteem', 'Een eicel leeft één dag, een zaadcel vijf. Hoe regelt het lichaam dat alles op het goede moment gebeurt, negen maanden lang?', 'VWO · VOORTPLANTING', L.titleImage);
  }
  return { sims: [], draw, T };
};

/* ========== H1 Een eicel die wacht — voorraad eicellen, ongelijke deling, zaadcellen ========== */
OSC['1'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, W = TL.W, CM = COMMON;
  const T = { oma: W(1, 'oma'), eierstokjes: W(2, 'eierstokjes'), gedeeld: W(2, 'gedeeld'), zeven: W(3, 'zeven'), meiose: W(4, 'meiose'), gestopt: W(4, 'gestopt'), profase: W(5, 'profase'),
    staan: W(6, 'staan'), jaren: W(6, 'Tientallen'), geboorte: W(7, 'geboorte'), puberteit: W(8, 'puberteit'), eisprong: W(9, 'eisprong'), film: W(10, 'film'), cyto: W(11, 'cytoplasma'),
    ongelijk: W(12, 'ongelijk'), een: W(13, 'één'), pool: W(14, 'poollichaampjes'), afsterven: W(14, 'afsterven'), waarom: W(15, 'Waarom'), mito: W(16, 'mitochondriën'), ribo: W(17, 'ribosomen'), bouw: W(17, 'bouwinstructies'),
    man: W(18, 'man'), duizend: W(19, 'duizend'), kern: W(20, 'kern'), motor: W(21, 'mitochondriën'), staart: W(21, 'staart'), wacht: W(22, 'wacht'), miljoenen: W(23, 'miljoenen'), end: TL.E(23) };
  TL.cue('action', 'oma zwanger, zoom op eierstokjes', T.oma, T.zeven, { anchor: 'r1 oma' });
  TL.cue('term', 'zeven miljoen (teller)', T.zeven, T.staan + 2, { anchor: 'r3 zeven' });
  TL.cue('term', 'profase I: chromosomen zichtbaar, pauze', T.profase, T.geboorte, { anchor: 'r5 profase' });
  TL.cue('action', 'grafiek voorraad eicellen', T.geboorte, T.cyto, { anchor: 'r7 geboorte' });
  TL.cue('action', 'ongelijke deling: poollichaampje', T.ongelijk, T.man, { anchor: 'r12 ongelijk' });
  TL.cue('term', 'mitochondriën, ribosomen, bouwinstructies', T.mito, T.man, { anchor: 'r16 mitochondriën' });
  TL.cue('action', 'zaadcellen: 1000 per seconde', T.man, T.wacht, { anchor: 'r18 man' });
  TL.cue('action', 'vergelijking op één basislijn', T.wacht, T.end + 1, { anchor: 'r22 wacht' });
  const stock = [['5 mnd vóór de geboorte', 7e6, '7 miljoen'], ['geboorte', 1.5e6, '1 à 2 miljoen'], ['puberteit', 3e5, '300 000'], ['eisprongen in een leven', 400, '± 400']];
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 1, 11, 'Waarom wacht een eicel tientallen jaren, en krijgt een zaadcel bijna niets mee?');
    if (aScene <= 0.01) return;
    const c = g.ctx;
    // deel A (oma, zoom, voorraad) tot 'film'
    const aA = aScene * E.vis(t, TL.card.t1 - 0.6, T.film + 1.6, 0.5, 0.2);
    if (aA > 0.01) {
      g.bg('schema', aA);
      const aOma = aA * E.vis(t, T.oma - 0.3, T.geboorte - 0.3);
      g.screen(); castFig(g, 'ria', 300, 700, 400, { alpha: aOma, outfit: 'vroeger', zwanger: 0.8, uit: 'blij', t }); g.text('je oma, 5 maanden zwanger', 300, 760, { size: 36, w: 600, align: 'center', alpha: aOma });
      // v2.2: kijkje in de buik: baarmoeder met vruchtwater en het ongeboren meisje (opgekruld); de zoomcirkel gaat naar haar eierstokjes
      const BU = castBuik('ria', 300, 700, 400, 0.8, 1), FB = castFoetus(g.ctx, BU.x - 4, BU.y + 2, BU.ry * 0.0058, { alpha: 0, rot: 0.25 });
      { const aIn = aOma * E.vis(t, T.oma + 1, null); if (aIn > 0.01) { const cc = g.ctx; cc.save(); cc.globalAlpha = aIn;
          cc.fillStyle = '#8C3E4A'; cc.beginPath(); cc.ellipse(BU.x, BU.y, BU.rx * 0.86, BU.ry * 0.86, 0, 0, 6.283); cc.fill(); cc.fillStyle = '#3E6E8A'; cc.beginPath(); cc.ellipse(BU.x, BU.y, BU.rx * 0.74, BU.ry * 0.74, 0, 0, 6.283); cc.fill(); cc.restore();
          castFoetus(cc, BU.x - 4, BU.y + 2, BU.ry * 0.0058, { alpha: aIn, rot: 0.25 }); } }
      const aZ = aA * E.vis(t, T.eierstokjes - 0.2, T.geboorte - 0.3);
      g.zoomCircle(1150, 450, 300, FB.bekken.x, FB.bekken.y - 4, 10, 'micro', (gg) => {
        // v2.5 (prompt v8, C9): eierstok van het ongeboren meisje in doorsnede (lib_bio eierstokDoorsnede, zonder follikels),
        // in de schors eerst oögonia die zich delen, daarna oerfollikels (eicel met één laagje platte cellen) die stil liggen in profase I
        const ctx = gg.ctx; ctx.save(); ctx.globalAlpha = aZ; eierstokDoorsnede(ctx, 1150, 455, 262, 178, { n: 0 }); ctx.restore();
        const nShow = Math.floor(10 + 150 * E.ep(t, T.gedeeld - 1.5, 3));
        for (let i = 0; i < nShow; i++) { const an = E.hash(i * 3 + 1) * Math.PI * 2, rr = E.lerp(0.62, 0.92, E.hash(i * 3 + 2)); const x = 1150 + Math.cos(an) * 262 * rr, y = 455 + Math.sin(an) * 178 * rr;
          const stopped = t > T.gestopt + E.hash(i * 3 + 7) * 2.5;
          if (stopped) { ctx.save(); ctx.globalAlpha = aZ; follikel(ctx, x, y, 0, { klein: true, seed: i }); ctx.restore(); }
          else { const sp = 1 + 0.25 * Math.sin(t * 3 + i); E.cell(gg, x, y, 8 * sp, { alpha: aZ * 0.95, nr: 4, single: true, texture: false }); } }
      }, 'EIERSTOK · VERGROOT', aZ);
      g.text(`${Math.round(E.lerp(0, 7, E.ep(t, T.gedeeld - 1.0, 3.2)) * 10) / 10 === 7 ? '7' : Math.round(E.lerp(0, 7, E.ep(t, T.gedeeld - 1.0, 3.2)) * 10) / 10} miljoen`, 1150, 860, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aA * E.vis(t, T.gedeeld, T.geboorte - 0.3) });
      g.label('profase I', 'MEIOSE GEPAUZEERD · TIENTALLEN JAREN', 1150, 160, 1250, 110, { alpha: aA * E.vis(t, T.profase, T.geboorte - 0.3), noline: true, align: 'center' });
      // voorraad als staafdiagram (log-schaal) vanaf 'geboorte'
      const aG = aA * E.vis(t, T.geboorte - 0.3, null);
      if (aG > 0.01) {
        const B = { x: 300, y: 200, w: 1300, h: 560 }; L.graphBox(g, B, { alpha: aG, ylabel: 'AANTAL EICELLEN (LOGSCHAAL)' });
        const ymax = Math.log10(1e7), ymin = 2; const bw = 200;
        const when = [T.geboorte - 0.3, T.geboorte, T.puberteit, T.eisprong];
        stock.forEach(([lab, v, s], i) => { const ai = aG * E.vis(t, when[i], null); const x = B.x + 120 + i * 320; const h = (Math.log10(v) - ymin) / (ymax - ymin) * B.h * 0.88 * E.ep(t, when[i], 0.8);
          g.box(x, B.y + B.h - h, bw, h, { alpha: ai, fill: i === 3 ? C.gold : C.fill, k: 0.3 }); g.text(s, x + bw / 2, B.y + B.h - h - 16, { size: 36, w: 600, align: 'center', color: i === 3 ? C.gold : C.ink, alpha: ai }); g.para(lab, x + bw / 2 - 150, B.y + B.h + 44, 300, 32, { size: 28, f: 'mono', color: C.grain, alpha: ai, align: 'left', layer: 'meta' }); });
        g.text('elke cyclus rijpt er één uit de voorraad', 960, 930, { size: 36, w: 600, align: 'center', color: C.ink2, alpha: aG * E.vis(t, T.eisprong + 1.5, null) });
      }
    }
    // deel B+C (Micro): de zoomcirkel groeit vanuit de staaf '± 400' tot hij het hele beeld vult; daarna blijft de look Micro
    const zp = E.ep(t, T.film - 0.3, 1.6);
    if (zp > 0.01) {
      const drawMicro = (g) => {
        const c = g.ctx;
        const aB = aScene * E.vis(t, T.film - 0.3, T.man - 0.3, 0.2, 0.5);
        if (aB > 0.01) {
          g.text("meiose zelf: zie de film Celdeling", 960, 120, { size: 36, w: 600, align: 'center', color: C.ink2, alpha: aB * E.vis(t, T.film, T.cyto + 1) });
          const p1 = E.ep(t, T.ongelijk, 2.4), p2 = E.ep(t, T.pool, 2.0);   // afsnoeren
          const cx = 820, cy = 520, R = 190;
          // v2.5 (prompt v8, C9): eicel ± 0,12 mm met zona pellucida; het poollichaampje wordt binnen de zona afgesnoerd;
          // de cel is vol: mitochondriën, ribosomen (vrij en als kralen op mRNA), mRNA als dunne slierten
          const pr = 24 * p1, pa = -0.62, pd = R + pr * 0.75 - 6 * (1 - p1); const px = cx + Math.cos(pa) * pd, py = cy + Math.sin(pa) * pd;
          c.save(); c.globalAlpha = aB; c.lineWidth = 22; c.strokeStyle = rgba('#E8DDC0', 0.22); c.beginPath(); c.arc(cx, cy, R * 1.17, 0, 7); c.stroke(); c.lineWidth = 1.5; c.strokeStyle = rgba('#E8DDC0', 0.6); for (const rr of [R * 1.17 - 11, R * 1.17 + 11]) { c.beginPath(); c.arc(cx, cy, rr, 0, 7); c.stroke(); } c.restore();
          E.cell(g, cx, cy, R, { alpha: aB, nr: 54, nx: -20, ny: 10, blob: 0.03, seed: 5 });
          const aPool = aB * (1 - 0.65 * E.ep(t, T.afsterven, 1.2));
          if (p1 > 0.02) { E.cell(g, px, py, pr, { alpha: aPool, nr: 9, single: true, texture: false }); }
          const aM = aB * E.vis(t, T.mito, null), aR = aB * E.vis(t, T.ribo, null), aI = aB * E.vis(t, T.bouw, null);
          const binnen = (i, k) => { const d = Math.sqrt(E.hash(i * k + 1)) * (R - 30), th = E.hash(i * k + 2) * Math.PI * 2; const x = cx + Math.cos(th) * d, y = cy + Math.sin(th) * d; return Math.hypot(x - (cx - 20), y - (cy + 10)) < 66 ? null : [x, y]; };
          for (let i = 0; i < 26; i++) { const p = binnen(i, 5.3); if (p) E.mito(g, p[0], p[1], 24, { alpha: aM, rot: E.hash(i) * 3 + 0.2 * Math.sin(t * 0.7 + i) }); }
          c.save(); c.globalAlpha = aR; c.fillStyle = rgba(C.grain, 0.85); for (let i = 0; i < 120; i++) { const p = binnen(i, 9.7); if (!p) continue; c.beginPath(); c.arc(p[0], p[1], 2.4, 0, 7); c.fill(); } c.restore();
          c.save(); c.globalAlpha = aI; for (let i = 0; i < 9; i++) { const p = binnen(i + 40, 13.1); if (!p) continue; const ang = E.hash(i * 3 + 11) * 6.283; const pts = []; for (let k = 0; k <= 16; k++) { const u = k / 16; pts.push([p[0] + Math.cos(ang) * u * 70 + Math.sin(u * 7 + i + t * 0.6) * 6 * Math.sin(ang + 1.57), p[1] + Math.sin(ang) * u * 70 + Math.sin(u * 7 + i + t * 0.6) * 6 * Math.cos(ang + 1.57)]); }
            c.strokeStyle = D2.rna; c.lineWidth = 1.4; c.lineCap = 'round'; c.beginPath(); pts.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.stroke();
            c.fillStyle = rgba(C.grain, 0.9 * Math.min(1, aR / Math.max(aI, 0.01))); for (let k = 3; k < 16; k += 4) { c.beginPath(); c.arc(pts[k][0], pts[k][1] - 3, 3, 0, 7); c.fill(); } } c.restore();
          const aLab = aB * E.vis(t, T.ongelijk, null);
          g.label('eicel', 'BIJNA AL HET CYTOPLASMA', null, null, cx - R * 1.17 - 34, cy - 10, { alpha: aLab, noline: true, align: 'right' });
          g.label('poollichaampje', 'STERFT AF', null, null, 1090, 330, { alpha: aB * E.vis(t, T.pool, null), noline: true });
          g.label('mitochondriën', 'ENERGIE', null, null, 1090, 470, { alpha: aM, color: C.mitoEdge, noline: true });
          g.label('ribosomen', 'EIWITTEN MAKEN', null, null, 1090, 580, { alpha: aR, color: C.grain, noline: true });
          g.label('bouwinstructies', 'KANT-EN-KLAAR mRNA', null, null, 1090, 690, { alpha: aI, color: D2.rnaR, noline: true });
          g.annot(cx - R, cx + R, cy + R * 1.17 + 18, 'het embryo draait de eerste dagen op wat de eicel meebrengt', { alpha: aB * E.vis(t, T.waarom + 1, null), color: C.green });
          g.scaleBar(200, 240, 160, '± 50 µm', aB * E.vis(t, T.ongelijk, null));
        }
        const aC = aScene * E.vis(t, T.man - 0.3, null, 0.5);
        if (aC > 0.01) {
          const aStream = aC * E.vis(t, T.man, T.wacht - 0.4);
          for (let i = 0; i < 34; i++) { const h1 = E.hash(i * 7 + 2), h2 = E.hash(i * 7 + 5); const x = ((t * (160 + h1 * 80) + i * 173) % 2300) - 100; const y = 170 + h2 * 640; zaadcelEcht(g.ctx, x, y, 0.1 * Math.sin(t * 1.3 + i), t + i * 0.37, 1.6, { a: aStream }); }
          const n = Math.floor(E.lerp(0, 1000, E.ep(t, T.duizend - 0.5, 2.5)));
          g.text(`± ${n} per seconde`, 960, 130, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aStream * E.vis(t, T.duizend - 0.5, null) });
          const aOne = aC * E.vis(t, T.kern - 0.4, T.wacht - 0.4);
          if (aOne > 0.01) {
            g.zoomCircle(960, 560, 250, 960, 560, 0, 'micro', (gg) => { E.sperm(gg, 1010, 560, 0, 7, { alpha: aOne, wig: t * 6 }); }, 'ZAADCEL · VERGROOT', aOne);
            g.label('kern', 'ALLEEN DNA', null, null, 1300, 330, { alpha: aOne * E.vis(t, T.kern, null), noline: true });
            g.label('mitochondriën', 'MOTOR', null, null, 1300, 450, { alpha: aOne * E.vis(t, T.motor, null), color: C.mitoEdge, noline: true });
            g.label('staart', 'VOORTBEWEGING', 760, 568, 440, 780, { alpha: aOne * E.vis(t, T.staart, null) });
          }
          const aV = aC * E.vis(t, T.wacht - 0.2, null);
          if (aV > 0.01) {
            const by = 700; c.save(); c.globalAlpha = aV; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(300, by); c.lineTo(1620, by); c.stroke(); c.restore();
            E.cell(g, 620, by - 190, 180, { alpha: aV, nr: 52, nx: -16, blob: 0.04 });
            g.text('één eicel', 620, by + 60, { size: 36, w: 600, align: 'center', alpha: aV }); g.text('WACHT · NEEMT ALLES MEE', 620, by + 100, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aV, layer: 'meta' });
            const aZ = aV * E.vis(t, T.miljoenen - 0.3, null);
            for (let i = 0; i < 40; i++) { const h1 = E.hash(i * 11 + 4), h2 = E.hash(i * 11 + 6); zaadcelEcht(g.ctx, 1180 + h1 * 380, by - 40 - h2 * 320, -0.3 + 0.08 * Math.sin(t * 1.5 + i), t + i * 0.41, 1.33, { a: aZ }); }
            g.scaleBar(1440, by - 400, 160, '± 50 µm', aZ);
            g.text('miljoenen zaadcellen', 1300, by + 60, { size: 36, w: 600, align: 'center', alpha: aZ }); g.text('LICHT · SNEL', 1300, by + 100, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aZ, layer: 'meta' });
          }
        }
      };
      if (zp < 1) g.zoomCircle(960, 520, E.lerp(40, 1500, zp), 1400, 700, 30, 'micro', drawMicro, null, aScene);
      else { g.bg('micro', aScene); drawMicro(g); }
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H2 Signalen van boven — hypothalamus, hypofyse, receptoren; eiwit- vs steroïdhormoon; de man; negatieve terugkoppeling ========== */
OSC['2'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { wie: TL.B(1), klieren: W(3, 'geslachtsklieren'), hersenen: W(4, 'hersenen'), hypo: W(5, 'hypothalamus'), gnrh: W(5, 'GnRH'), hypof: W(6, 'hypofyse'), twee: W(7, 'twee'), fsh: W(7, 'FSH'), lh: W(7, 'LH'),
    bloed: W(8, 'bloed'), receptor: W(9, 'receptor'), eiwit: W(10, 'eiwithormonen'), oplossen: W(11, 'lossen'), niet: W(11, 'niet'), binden: W(12, 'binden'), ketting: W(13, 'kettingreactie'),
    steroid: W(14, 'steroïden'), cholesterol: W(15, 'cholesterol'), liften: W(16, 'liften'), glippen: W(17, 'glippen'), inCel: W(17, 'ín'), genen: W(18, 'genen'),
    man: W(19, 'man'), leydig: W(20, 'Leydigcellen'), testo: W(20, 'testosteron'), sertoli: W(21, 'Sertolicellen'), verzorgers: W(22, 'verzorgers'), slim: W(23, 'slimme'), remt: W(24, 'remt'), inhibine: W(25, 'inhibine'),
    stijgt: W(26, 'Stijgt'), daalt: W(26, 'daalt'), zakt: W(27, 'zakt'), neg: W(28, 'negatieve'), stabiel: W(29, 'stabiel'), thermostaat: W(29, 'thermostaat'), end: TL.E(29) };
  TL.cue('term', 'hypothalamus / hypofyse / GnRH', T.hypo, T.eiwit, { anchor: 'r5 hypothalamus' });
  TL.cue('term', 'FSH en LH via het bloed', T.fsh, T.eiwit, { anchor: 'r7 FSH' });
  TL.cue('action', 'alleen cel met receptor reageert', T.receptor, T.eiwit, { anchor: 'r9 receptor' });
  TL.cue('look-change', 'zoomcirkel naar membraan (Micro)', T.eiwit, T.man - 0.3, { anchor: 'r10 eiwithormonen' });
  TL.cue('action', 'steroïde glipt door membraan, receptor in de cel, genen', T.steroid, T.man - 0.3, { anchor: 'r14 steroïden' });
  TL.cue('action', 'zaadbal: Leydig- en Sertolicellen', T.man, T.slim, { anchor: 'r19 man' });
  TL.cue('action', 'negatieve terugkoppeling live: spiegel stabiel', T.slim, T.end + 1, { anchor: 'r23 slimme' });
  const X = 420, Y0 = 130;
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 2, 11, 'Wie geeft het startsein, en hoe weet een cel dat een bericht voor haar is?');
    if (aScene <= 0.01) return; const c = g.ctx;
    // deel A: regelkring (Schema) tot 'eiwithormonen'
    const aA = aScene * E.vis(t, TL.card.t1 - 0.6, T.eiwit - 0.3, 0.5, 0.5);
    if (aA > 0.01) {
      g.bg('schema', aA);
      const aW = aA * E.vis(t, T.wie, T.klieren - 0.2, 0.4, 0.4);
      if (aW > 0.01) {
        g.zoomCircle(700, 500, 170, 700, 500, 0, 'micro', (gg) => { E.cell(gg, 700, 500, 90, { alpha: aW, nr: 30, nx: 8 }); E.chromosomes(gg, 708, 500, 24, 5, { alpha: aW, lw: 2.5, color: CD.std }); }, 'EICEL · WACHT', aW);
        g.zoomCircle(1220, 500, 170, 1220, 500, 0, 'micro', (gg) => { for (let i = 0; i < 5; i++) E.sperm(gg, 1150 + i * 40, 430 + i * 36, -0.2, 2.2, { alpha: aW, wig: t * 8 + i }); }, 'ZAADCELLEN · VANAF DE PUBERTEIT', aW);
        g.text('wie geeft het startsein?', 960, 190, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aW });
      }
      const aK = aA * E.vis(t, T.klieren - 0.2, null), aH = aA * E.vis(t, T.hersenen, null);
      const Y = L.hpg(g, { x: X, y0: Y0, alpha: aA, hyp: aH * E.vis(t, T.hypo, null), pit: aH * E.vis(t, T.hypof, null), gon: aK, gonName: 'zaadbal / eierstok', gnrh: aA * E.vis(t, T.gnrh, null), fsh: aA * E.vis(t, T.fsh, null), lh: aA * E.vis(t, T.lh, null), t });
      // GnRH in korte stoten (tekent hpg langs het steeltje)
      g.text('in korte stoten', X - 175, Y.hypP[1] + 78, { size: 24, f: 'mono', color: C.grain, align: 'right', alpha: aA * E.vis(t, T.gnrh + 0.5, T.hypof + 2), layer: 'meta' });
      // bloedvat van de hypofyse door het lichaam naar de cellen rechts (lib_bio bloedvat: rode bloedcellen, hormonen stromen mee)
      const aB = aA * E.vis(t, T.bloed - 0.2, null);
      const path = [[Y.hypP[0] + 6, Y.hypP[1] + 14], [X + 40, Y0 + 330], [700, Y0 + 360], [920, 330], [1250, 300], [1500, 560], [1700, 560]];
      c.save(); c.globalAlpha = aB; bloedvat(c, path, 16, t, { n: 22, cel: 9, speed: 0.06 }); c.restore();
      g.text('bloed', 940, 290, { size: 36, w: 600, color: C.coral, alpha: aB });
      L.stream(g, path, t, 0.12, 7, HC.FSH, { alpha: aB, r: 7 }); L.stream(g, path, t + 1.7, 0.12, 7, HC.LH, { alpha: aB, r: 7 });
      // drie cellen; alleen die met receptor reageert
      const aR = aA * E.vis(t, T.receptor - 0.6, null);
      const cells = [[1180, 470, false], [1420, 420, true], [1580, 760, false]];
      cells.forEach(([x, y, has], i) => { const lit = has ? 1 : 0.35; E.cell(g, x, y, 70, { alpha: aR * lit, nr: 22, fill: C.fill2, edge: C.fillL }); if (has) { E.receptor(g, x - 58, y - 30, HC.LH, { alpha: aR, rot: -Math.PI / 2 * 0 + 1.0, s: 1.1 }); const bound = E.ep(t, T.receptor + 1.2, 0.8); E.hormone(g, x - 72 + 10 * bound, y - 48 + 8 * bound, HC.LH, { alpha: aR, r: 9 }); } });
      g.label('receptor', 'PAST BIJ ÉÉN HORMOON', 1362, 390, 1280, 240, { alpha: aR, color: HC.LH });
      g.annot(1100, 1680, 835, 'alleen cellen met de juiste receptor reageren', { alpha: aR * E.vis(t, T.receptor + 1.4, null), color: C.green });
    }
    // deel B: zoomcirkel naar het membraan (Micro): eiwithormoon buiten, steroïde erdoorheen; labels buiten de cirkel (UI-laag)
    const aBp = aScene * E.vis(t, T.eiwit - 0.3, T.man - 0.3, 0.5, 0.5);
    if (aBp > 0.01) {
      g.bg('schema', aBp);
      E.cell(g, 260, 540, 80, { alpha: aBp * 0.8, nr: 26, fill: C.fill2, edge: C.fillL });
      g.text('doelcel', 260, 680, { size: 36, w: 600, align: 'center', alpha: aBp });
      const CX = 1180, CY = 520, R = 400, MX = 1080;   // cirkel en membraan
      const RC = 900, MCX = MX + RC; const memX = (yy) => MCX - Math.sqrt(RC * RC - (yy - CY) * (yy - CY)); const hoek = (yy) => Math.PI - Math.asin((yy - CY) / RC);
      const aP = aBp * E.vis(t, T.eiwit, null), aS = aBp * E.vis(t, T.steroid, null), aCh = aBp * E.vis(t, T.ketting, null);
      const pA = E.ep(t, T.oplossen, 2.2); const _ra = Math.atan2(380 - CY, memX(380) - MCX); const hx = E.lerp(860, memX(380) + Math.cos(_ra) * 108, pA), hy = E.lerp(300, 380 + Math.sin(_ra) * 108, pA);
      const pS = E.ep(t, T.glippen, 2.0), pN = E.ep(t, T.genen, 1.2);
      const sx = E.lerp(880, MX + 90, pS) + (1360 - MX - 90) * pN, sy = 760 + (650 - 760) * pN;
      g.zoomCircle(CX, CY, R, 260, 540, 80, 'micro', (gg) => {
        const cc = gg.ctx;
        // v2.5 (prompt v8, C9): het membraan is een stuk van een ronde cel (boog), fosfolipiden met twee staarten, de receptor steekt erdoorheen
        cc.save(); cc.globalAlpha = aBp * 0.14; cc.fillStyle = C.coral; cc.beginPath(); cc.moveTo(700, 100); for (let yy = 100; yy <= 940; yy += 20) cc.lineTo(memX(yy) - 40, yy); cc.lineTo(700, 940); cc.closePath(); cc.fill(); cc.restore();
        cc.save(); cc.globalAlpha = aBp; membraanBoog(cc, MCX, CY, RC, hoek(960), hoek(80), { s: 1.1, kop: C.mem, staart: rgba(C.ochreL, 0.8) }); cc.restore();
        // v3.0 (prompt v13): receptor óp het membraan = membraanReceptor uit de beeldbank (FSH- en LH-receptoren zijn G-eiwitgekoppeld); het eiwithormoon dokt in de pasvorm
        { const ry = 380, rx = memX(ry), an = Math.atan2(ry - CY, rx - MCX); cc.save(); cc.globalAlpha = aBp; membraanReceptor(cc, rx, ry, 1.15, { ang: an, membraan: false, vorm: 'rond', bind: 0, signaal: E.ep(t, T.ketting - 0.6, 0.8), t }); cc.restore(); }
        gg.text('BLOED', MX - 80, 830, { size: 28, f: 'mono', color: C.coral, align: 'center', alpha: aBp, ls: 3, layer: 'meta' });
        gg.text('CEL', MX + 200, 540, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aBp, ls: 3, layer: 'meta' });
        E.nucleus(gg, 1440, 650, 90, { alpha: aBp });
        
        E.hormone(gg, hx, hy, HC.LH, { alpha: aP, r: 13 });
        for (let i = 0; i < 5; i++) { const p = E.ep(t, T.ketting + i * 0.35, 0.5); E.hormone(gg, MX + 40 + i * 60, 400 + i * 45, HC.LH, { alpha: aCh * p, r: 6, kind: 'plain' }); }
        gg.text('kettingreactie van signalen', MX + 66, 318, { size: 30, w: 600, color: HC.LH, alpha: aCh });
        if (pS < 0.75) gg.disc(sx - 18, sy + 4, 26, { alpha: aS * (1 - E.ep(t, T.glippen + 1.2, 0.5)), fill: C.fillL });
        E.hormone(gg, sx, sy, HC.T, { alpha: aS, r: 14, kind: 'steroid' });
        { const aRc = aS * E.vis(t, T.inCel, null); if (aRc > 0.01) { cc.save(); cc.globalAlpha = aRc; enzymKluwen(cc, MX + 130, 800, 30, { col: C.enzym, an: -0.6, seed: 7, bind: E.ep(t, T.inCel + 0.4, 0.8), sub: HC.T }); cc.restore(); } }   // v3.0: receptor in de cel als kralenketen (eiwit), niet meer het schoteltje
        if (pN > 0.6) { cc.save(); cc.globalAlpha = aS * pN; cc.strokeStyle = CD.std; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(1400, 650); for (let k = 0; k <= 12; k++) cc.lineTo(1400 + k * 7, 650 + Math.sin(k) * 8); cc.stroke(); cc.restore(); }
      }, 'CELMEMBRAAN · VERGROOT', aBp);
      // labels buiten de cirkel
      g.label('eiwithormoon', 'LOST OP IN BLOED · NIET DOOR HET MEMBRAAN', null, null, 60, 250, { alpha: aP * E.vis(t, T.eiwit, T.steroid + 1), color: HC.LH, noline: true });
      g.label('receptor óp het membraan', 'EIWITHORMONEN BINDEN HIER', null, null, CX, 64, { alpha: aBp * E.vis(t, T.binden, null), color: HC.LH, noline: true, align: 'center' });
      g.label('steroïdhormoon', 'VAN CHOLESTEROL · VETOPLOSBAAR', null, null, 60, 780, { alpha: aS * E.vis(t, T.steroid, T.glippen + 1), color: HC.T, noline: true });
      g.label('transporteiwit', 'LIFT DOOR HET BLOED', null, null, 60, 880, { alpha: aS * E.vis(t, T.liften, T.glippen + 1.2), color: C.ink2, noline: true });
      g.label('receptor ín de cel', 'ZET GENEN AAN OF UIT', null, null, 1480, 880, { alpha: aS * E.vis(t, T.inCel, null), color: HC.T, noline: true });
    }
    // deel C: de man (Schema zaadbal) en de terugkoppeling
    const aCp = aScene * E.vis(t, T.man - 0.3, null, 0.5);
    if (aCp > 0.01) {
      g.bg('schema', aCp);
      const Y = L.hpg(g, { x: X, y0: Y0, alpha: aCp, gonName: 'zaadbal', gnrh: aCp, fsh: aCp, lh: aCp, fb: aCp * E.vis(t, T.remt, null), fbColor: HC.T, t });
      // zaadbal-doorsnede rechts: twee zaadbuisjes (buizen) met Leydigcellen ertussen
      // v2.5 (prompt v8, C9): zaadbal in doorsnede uit de bibliotheek: ronde zaadbuisjes met Sertolicellen en zaadcellen in wording,
      // groepjes Leydigcellen tussen de buisjes bij een haarvat; testosteron (paars) en inhibine komen er zichtbaar uit
      const bx = 1250, by = 390;
      const ZB = (() => { c.save(); c.globalAlpha = aCp; const r = zaadbalWeefsel(c, bx, by, 840, 500, { t, leydig: E.vis(t, T.leydig, T.sertoli + 1), sertoli: E.vis(t, T.sertoli, T.slim), testo: E.vis(t, T.testo, null), inhibine: E.vis(t, T.inhibine, null) }); c.restore(); return r; })();
      g.text('ZAADBAL · DOORSNEDE', bx, by + 290, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aCp, ls: 3, layer: 'meta' });
      g.label('Leydigcellen', 'MAKEN TESTOSTERON (LH)', null, null, 830, 72, { alpha: aCp * E.vis(t, T.leydig, null), color: HC.T, noline: true });
      g.label('Sertolicellen', 'VERZORGERS (FSH + TESTOSTERON)', null, null, 1300, 72, { alpha: aCp * E.vis(t, T.sertoli, null), noline: true });
      // inhibine uit Sertolicellen naar FSH
      const aI = aCp * E.vis(t, T.inhibine, null);
      g.inhibit(bx - 420, by - 110, Y.hypP[0] + 14, Y.hypP[1] - 18, { color: HC.INH, alpha: aI, lw: 2, bend: 0.12, dash: [10, 8] });
      g.text('inhibine', 600, 112, { size: 36, w: 600, color: HC.INH, alpha: aI }); g.text('REMT VOORAL FSH', 600, 144, { size: 28, f: 'mono', color: C.grain, alpha: aI, layer: 'meta' });
      g.text('testosteron', 612, 480, { size: 34, w: 600, color: HC.T, alpha: aCp * E.vis(t, T.remt, null), halo: 7 });
      // live model: spiegel testosteron met instelwaarde; verstoring op 'Stijgt'
      const aG = aCp * E.vis(t, T.stijgt - 0.3, null);
      if (aG > 0.01) {
        const tt = t - T.stijgt; // model: dT/dt = k*LH - d*T ; LH = max(0, set - T)
        let Tv = 0.55, LHv = 0.5; const dt = 0.02; const tr = []; for (let s = 0; s < Math.max(0, tt) + 0.001; s += dt) { if (s > 0.6 && s < 1.4) Tv += 0.9 * dt; LHv += ((Math.max(0.05, 0.6 - 0.9 * (Tv - 0.55)) - LHv)) * dt * 5; Tv += (0.9 * LHv - 0.9 * Tv) * dt * 2.2; tr.push([s, Tv, LHv]); }
        const B = { x: 1000, y: 745, w: 680, h: 150 }; L.graphBox(g, B, { alpha: aG }); g.text('SPIEGEL (MODEL)', B.x + B.w, B.y - 12, { align: 'right', size: 28, f: 'mono', color: C.grain, alpha: aG, layer: 'meta' });
        c.save(); c.globalAlpha = aG; c.strokeStyle = C.gold; c.setLineDash([6, 6]); c.lineWidth = 1.5; c.beginPath(); c.moveTo(B.x, B.y + B.h - 0.55 * B.h); c.lineTo(B.x + B.w, B.y + B.h - 0.55 * B.h); c.stroke(); c.setLineDash([]);
        const plot = (k, col) => { c.strokeStyle = col; c.lineWidth = 3; c.beginPath(); tr.forEach((p, i) => { const x = B.x + p[0] / 16 * B.w, y = B.y + B.h - E.clamp(p[k], 0, 1) * B.h; if (i) c.lineTo(x, y); else c.moveTo(x, y); }); c.stroke(); };
        plot(1, HC.T); plot(2, HC.LH); c.restore();
        g.text('testosteron', B.x + B.w + 10, B.y + 40, { size: 32, w: 600, color: HC.T, alpha: aG }); g.text('LH', B.x + B.w + 10, B.y + 80, { size: 32, w: 600, color: HC.LH, alpha: aG });
        g.text('instelwaarde', B.x + 10, B.y + B.h - 0.55 * B.h - 10, { size: 28, f: 'mono', color: C.gold, alpha: aG, layer: 'meta' });
      }
      g.annot(X - 165, X + 165, Y.gon + 110, 'negatieve terugkoppeling: het signaal remt zijn eigen oorzaak', { alpha: aCp * E.vis(t, T.neg, null), color: C.green, maxW: 700 });
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H3 Een wedstrijd tussen follikels — eierstok in Schema, oestrogeen in twee stappen, dominante follikel ========== */
OSC['3'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { vrouw: W(1, 'vrouw'), piek: W(3, 'piek'), follikel: W(4, 'follikel'), fsh: W(5, 'FSH'), groeien: W(6, 'groeien'), oestro: W(7, 'oestrogeen'), twee: W(7, 'twee'), buiten: W(8, 'buitenste'), lh: W(8, 'LH'), voorloper: W(8, 'voorloper'),
    binnen: W(9, 'binnenste'), fsh2: W(9, 'FSH'), aromatase: W(10, 'aromatase'), oestro2: W(10, 'oestrogeen'), dingen: W(11, 'dingen'), slijmvlies: W(12, 'baarmoederslijmvlies'), inhibine: W(13, 'inhibine'), remt: W(13, 'remt'),
    nodig: W(14, 'nodig'), sterven: W(15, 'sterven'), receptoren: W(16, 'FSH-receptoren'), redt: W(16, 'redt'), dominante: W(17, 'dominante'), eicel: W(18, 'eicel'), wedstrijd: W(19, 'wedstrijd'), strenger: W(19, 'strenger'), end: TL.E(20) };
  TL.cue('term', 'follikel', T.follikel, T.buiten, { anchor: 'r4 follikel' });
  TL.cue('action', 'FSH stijgt, groepje follikels groeit', T.fsh, T.oestro, { anchor: 'r5 FSH' });
  TL.cue('action', 'oestrogeen in twee stappen (zoom op één follikel)', T.twee, T.dingen, { anchor: 'r7 twee' });
  TL.cue('action', 'slijmvlies groeit; oestrogeen + inhibine remmen FSH', T.slijmvlies, T.nodig, { anchor: 'r12 baarmoederslijmvlies' });
  TL.cue('action', 'follikels sterven één voor één; dominante blijft', T.sterven, T.end + 1, { anchor: 'r15 sterven' });
  const fol = [[700, 330, 0.3], [560, 520, 0.6], [760, 640, 0.9], [940, 440, 1.2], [880, 760, 1.5], [1100, 620, 0.0]]; // x, y, sterfvolgorde-offset; index 5 = dominant
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 3, 11, 'Waarom rijpt er elke maand maar één eicel, terwijl er tientallen beginnen?');
    if (aScene <= 0.01) return; const c = g.ctx;
    g.bg('schema', aScene);
    // eierstok (doorsnede) links-midden
    const aO = aScene * E.vis(t, T.vrouw, null);
    // v2.5 (prompt v8, C9): eierstok in doorsnede uit de bibliotheek (schors met rustende follikels, merg met vaten)
    c.save(); c.globalAlpha = aO; eierstokDoorsnede(c, 830, 540, 400, 300, { n: 120 }); c.restore();
    const aIn = aScene * E.vis(t, T.vrouw, T.follikel - 0.3, 0.4, 0.4);
    if (aIn > 0.01) {
      const B = { x: 1380, y: 300, w: 380, h: 260 }; L.graphBox(g, B, { alpha: aIn, xlabel: 'TIJD' });   // v3.1 (nacontrole 29 okt): grafiek rechts naast de eierstok (liep er dwars doorheen)
      const c2 = g.ctx; c2.save(); c2.globalAlpha = aIn; c2.lineWidth = 3; c2.strokeStyle = HC.T; c2.beginPath(); c2.moveTo(B.x, B.y + 150); c2.lineTo(B.x + B.w, B.y + 150); c2.stroke();
      c2.strokeStyle = HC.LH; c2.beginPath(); for (let i = 0; i <= 100; i++) { const x = B.x + i / 100 * B.w; const y = B.y + B.h - 40 - 200 * Math.exp(-Math.pow((i - 55) / 5, 2)) * E.ep(t, T.piek - 0.5, 0.8); i ? c2.lineTo(x, y) : c2.moveTo(x, y); } c2.stroke(); c2.restore();
      g.text('man: stabiel', B.x + 10, B.y + 188, { size: 30, w: 600, color: HC.T, alpha: aIn, halo: 6 });
      g.text('vrouw: elke maand één piek', B.x, B.y - 30, { size: 36, w: 600, color: HC.LH, alpha: aIn * E.vis(t, T.piek - 0.5, null) });
    }
    g.text('EIERSTOK · DOORSNEDE', 830, 210, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aO, ls: 3, layer: 'meta' });
    // FSH-meter en oestrogeenmeter rechts
    const day = E.clamp((t - T.fsh) / (T.end - T.fsh) * 12, 0, 12);
    const fshV = t < T.fsh ? 0.35 : E.clamp(0.35 + 0.35 * E.ep(t, T.fsh, 2.0) - 0.45 * E.ep(t, T.remt, 6), 0, 1);
    const e2V = E.clamp(0.1 + 0.9 * E.ep(t, T.oestro, 10), 0, 1);
    const aGa = aScene * (1 - E.vis(t, T.twee - 0.2, T.slijmvlies - 0.2, 0.5, 0.5));
    L.gauge(g, 1500, 300, 70, 300, fshV, HC.FSH, 'FSH', aGa * E.vis(t, T.fsh - 0.3, null));
    L.gauge(g, 1640, 300, 70, 300, e2V, HC.E2, 'oestrogeen', aGa * E.vis(t, T.oestro, null));
    // follikels groeien met FSH; sterven af als FSH daalt (behalve de dominante)
    const grow = E.ep(t, T.groeien - 0.3, 3.0);
    fol.forEach(([x, y, off], i) => {
      // v2.5: follikels volgens het recept (lib_bio follikel): lagen hulpcellen, holte, eicel op een heuveltje; verliezers krimpen en verbleken
      const dom = i === 5; const dead = dom ? 0 : E.ep(t, T.sterven + off, 1.0);
      const f = (0.12 + 0.43 * grow + (dom ? 0.32 * E.ep(t, T.redt, 3) : 0)) * (1 - 0.35 * dead); const RF = 150; const r = E.lerp(9, RF, Math.pow(f, 1.6)) + 8;
      const a = aO * E.vis(t, T.follikel - 0.4 + i * 0.1, null) * (1 - 0.65 * dead);
      c.save(); c.globalAlpha = a; follikel(c, x, y, f, { R: RF, seed: i }); c.restore();
      if (dom && t > T.dominante) { c.save(); c.globalAlpha = a * E.vis(t, T.dominante, null); c.strokeStyle = C.gold; c.lineWidth = 2.5; c.beginPath(); c.arc(x, y, r + 6, 0, 7); c.stroke(); c.restore(); }
      // receptoren: de dominante heeft er meer
      const nR = dom ? 10 : 4; const aR = aO * E.vis(t, T.receptoren - 0.3, null) * (1 - 0.65 * dead);
      for (let k = 0; k < nR; k++) { const th = k / nR * Math.PI * 2 + i; E.receptor(g, x + Math.cos(th) * (r + 6), y + Math.sin(th) * (r + 6), HC.FSH, { alpha: aR, rot: th + Math.PI / 2, s: 0.35 }); }
    });
    g.label('follikel', 'BLAASJE VAN HULPCELLEN ROND EEN EICEL', null, null, 1120, 200, { alpha: aO * E.vis(t, T.follikel, T.buiten), noline: true });
    g.text(`${Math.round(E.lerp(0, 100, E.ep(t, T.groeien, 2)))}`, -100, -100, { alpha: 0 });
    // zoom: één follikel vergroot met twee cellagen (buiten → binnen) tussen 'twee' en 'dingen'
    const aZ = aScene * E.vis(t, T.twee - 0.2, T.slijmvlies - 0.2, 0.5, 0.5);
    if (aZ > 0.01) {
      g.zoomCircle(1250, 470, 300, 1100, 620, 52, 'schema', (gg) => {
        const cx = 1250, cy = 470; const cc = gg.ctx;
        // buitenste laag (theca) en binnenste laag (granulosa) als ringen
        // v2.5: één follikel vergroot: theca (spoelvormige buitenste cellen) rond de granulosa (binnenste cellen), vochtholte en eicel
        cc.save(); cc.globalAlpha = aZ; cc.beginPath(); cc.arc(cx, cy, 272, 0, 7); cc.arc(cx, cy, 214, 0, 7, true); cc.fillStyle = rgba('#C98A6A', 0.32); cc.fill('evenodd');
        cc.strokeStyle = rgba('#C98A6A', 0.75); cc.lineWidth = 1.5; cc.beginPath(); cc.arc(cx, cy, 272, 0, 7); cc.stroke();
        for (let L2 = 0; L2 < 3; L2++) for (let k = 0; k < 44; k++) { const th = k / 44 * 6.283 + L2 * 0.05; const rr = 226 + L2 * 16; cc.beginPath(); cc.ellipse(cx + Math.cos(th) * rr, cy + Math.sin(th) * rr, 13, 3.4, th + Math.PI / 2, 0, 7); cc.fillStyle = rgba('#9C6A4A', 0.6); cc.fill(); }
        follikel(cc, cx, cy, 0.62, { R: 330, seed: 3 }); cc.restore();
        // stap 1: LH-stipjes landen op de buitenste laag, voorloper (paars-donker ruit) ontstaat en gaat naar binnen
        const a1 = aZ * E.vis(t, T.lh, null); for (let k = 0; k < 4; k++) { const th = -1.2 + k * 0.5; const p = (t * 0.45 + k * 0.25) % 1; E.hormone(gg, cx + Math.cos(th) * (330 - 70 * p), cy + Math.sin(th) * (330 - 70 * p), HC.LH, { alpha: a1, r: 8 }); }
        const a2 = aZ * E.vis(t, T.voorloper, null); for (let k = 0; k < 3; k++) { const th = -0.4 + k * 0.5; const p = (t * 0.4 + k * 0.33) % 1; E.hormone(gg, cx + Math.cos(th) * (255 - 70 * p), cy + Math.sin(th) * (255 - 70 * p), HC.INH, { alpha: a2, r: 10, kind: 'steroid' }); }
        // stap 2: FSH op de binnenste laag; enzym aromatase (grijsblauw met gouden actief centrum) zet voorloper om in oestrogeen
        const a3 = aZ * E.vis(t, T.fsh2, null); for (let k = 0; k < 3; k++) { const th = 2.0 + k * 0.5; const p = (t * 0.45 + k * 0.3) % 1; E.hormone(gg, cx + Math.cos(th) * (330 - 100 * p), cy + Math.sin(th) * (330 - 100 * p), HC.FSH, { alpha: a3, r: 8 }); }
        const a4 = aZ * E.vis(t, T.aromatase, null); gg.disc(cx + 150, cy + 120, 30, { alpha: a4, fill: '#7A8BA8' }); gg.ctx.save(); gg.ctx.globalAlpha = a4; gg.ctx.fillStyle = C.gold; gg.ctx.beginPath(); gg.ctx.arc(cx + 150, cy + 120, 10, 0, 7); gg.ctx.fill(); gg.ctx.restore();
        gg.text('aromatase', cx + 190, cy + 130, { size: 36, w: 600, color: C.ink, alpha: a4 });
        const a5 = aZ * E.vis(t, T.oestro2, null); for (let k = 0; k < 5; k++) { const p = (t * 0.4 + k * 0.2) % 1; E.hormone(gg, cx + 150 + Math.cos(1.0 + k) * (40 + 220 * p), cy + 120 + Math.sin(1.0 + k) * (40 + 220 * p), HC.E2, { alpha: a5 * (1 - p * 0.5), r: 10, kind: 'steroid' }); }
      }, null, aZ);
      g.label('buitenste cellen', 'LH → VOORLOPER (MANNELIJK HORMOON)', 1250, 200, 1250, 90, { alpha: aZ * E.vis(t, T.buiten, null), color: HC.LH, align: 'center' });
      g.label('binnenste cellen', 'FSH → AROMATASE → OESTROGEEN · VERGROOT', 1250, 650, 1250, 850, { alpha: aZ * E.vis(t, T.binnen, null), color: HC.FSH, align: 'center' });
    }
    // oestrogeen: slijmvlies groeit (strook rechtsonder) en remt FSH (remlijn naar de meter)
    const aS = aScene * E.vis(t, T.slijmvlies - 0.2, null);
    // v2.5 (prompt v8, C9): baarmoederwand uit de bibliotheek; het slijmvlies groeit zichtbaar aan met klieren en bloedvaatjes
    c.save(); c.globalAlpha = aS; baarmoederwand(c, 1580, 150, 380, 190, 0.15 + 0.55 * E.ep(t, T.slijmvlies, 4), { t }); c.restore();
    g.text('baarmoederslijmvlies groeit aan', 1580, 290, { size: 36, w: 600, align: 'center', color: C.ink, alpha: aS, halo: 7 });
    const aI = aScene * E.vis(t, T.inhibine, null);
    g.inhibit(1640, 620, 1535, 310, { color: HC.E2, alpha: aI, lw: 2, bend: 0.25 });
    g.text('+ inhibine', 1380, 700, { size: 32, w: 600, color: HC.INH, alpha: aI });
    g.text('−', 1440, 340, { size: 48, w: 700, color: HC.E2, alpha: aI, align: 'center' });
    g.label('dominante follikel', 'MEESTE FSH-RECEPTOREN · ONZE EICEL', null, null, 1260, 800, { alpha: aScene * E.vis(t, T.dominante, null), color: C.gold, noline: true });
    g.annot(430, 1100, 845, 'de koploper maakt de regels strenger: meer oestrogeen, minder FSH voor de rest', { alpha: aScene * E.vis(t, T.wedstrijd, null), color: C.green, maxW: 1400 });
    L.dayClock(g, day, aScene * E.vis(t, T.fsh, null), null, 120);
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* scenes_b.js — hoofdstukken 4–7: cyclus en eisprong, bevruchting, innesteling en hCG, placenta */

/* ========== H4 Van rem naar gaspedaal — regelkring (Schema) links, grafiek uit het model rechts, met een zichtbare dagklok ========== */
OSC['4'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON, M = L.CYC;
  const T = { groeit: W(1, 'groeit'), opmerkelijks: W(2, 'opmerkelijks'), remt: W(3, 'remt'), hoog: W(4, 'hoog'), omslaat: W(4, 'om'), stimuleren: W(5, 'stimuleren'), meer: W(6, 'Meer'), positief: W(7, 'positieve'),
    piek: W(8, 'LH-piek'), drie: W(9, 'drie'), meiose: W(10, 'meiose'), wand: W(11, 'wand'), scheurt: W(12, 'scheurt'), eisprong: W(13, 'eisprong'), metafase: W(14, 'metafase'), zaadcel: W(15, 'zaadcel'),
    geel: W(16, 'gele'), progesteron: W(17, 'progesteron'), dikker: W(18, 'dikker'), bloedvaten: W(19, 'bloedvaten'), remt2: W(20, 'remt'), geen: W(21, 'geen'), sterft: W(22, 'sterft'), twaalf: W(22, 'twaalf'), zakt: W(23, 'zakt'),
    slagaders: W(24, 'slagaders'), afgestoten: W(25, 'afgestoten'), menstruatie: W(25, 'menstruatie'), stijgt: W(26, 'stijgt'), opnieuw: W(27, 'opnieuw'), end: TL.E(27) };
  // dagklok: narratietijd → dag van de cyclus (stuksgewijs lineair)
  const S0 = M.surge[0], O0 = M.ov[0]; const KF = [[TL.card.t1, 6], [T.remt, 9], [T.hoog, S0 - 2], [T.piek - 0.5, S0 - 0.3], [T.piek + 1.5, S0 + 0.5], [T.scheurt, O0 - 0.4], [T.eisprong + 0.5, O0 + 0.1], [T.geel, 16], [T.dikker, 19], [T.remt2, 21], [T.sterft, 24], [T.zakt, 26], [T.menstruatie, 28.2], [T.stijgt, 29.5], [T.end, 31]];
  const dayAt = (t) => { if (t <= KF[0][0]) return KF[0][1]; for (let i = 1; i < KF.length; i++) if (t <= KF[i][0]) return E.lerp(KF[i - 1][1], KF[i][1], (t - KF[i - 1][0]) / (KF[i][0] - KF[i - 1][0])); return KF[KF.length - 1][1]; };
  TL.cue('action', 'grafiek tekent zich tot de dag van de klok', TL.card.t1, T.end, { anchor: 'r1 groeit' });
  TL.cue('action', 'remlijn (−) wordt stimuleerlijn (+)', T.omslaat, T.piek, { anchor: 'r4 om' });
  TL.cue('term', 'positieve terugkoppeling (haak)', T.positief, T.drie, { anchor: 'r7 positieve' });
  TL.cue('action', 'eicel maakt meiose I af; wand breekt; eisprong', T.meiose, T.metafase + 3, { anchor: 'r10 meiose' });
  TL.cue('term', 'geel lichaam → progesteron', T.geel, T.sterft, { anchor: 'r16 gele' });
  TL.cue('action', 'slijmvlies dikker, bloedvaten en klieren', T.dikker, T.sterft, { anchor: 'r18 dikker' });
  TL.cue('action', 'geel lichaam sterft, progesteron zakt, menstruatie', T.sterft, T.stijgt, { anchor: 'r22 sterft' });
  const B = { x: 900, y: 150, w: 900, h: 520 }, X0 = 0, X1 = 31, YMAX = 3.4;
  const dx = (d) => B.x + (d - X0) / (X1 - X0) * B.w;
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 4, 11, 'Hoe kan hetzelfde hormoon eerst remmen en dan juist aanjagen?');
    if (aScene <= 0.01) return; const c = g.ctx;
    g.bg('schema', aScene);
    const day = dayAt(t), a = aScene;
    // ---- grafiek rechts ----
    L.graphBox(g, B, { alpha: a, x0: X0, x1: X1, xticks: [[1, '1'], [7, '7'], [14, '14'], [21, '21'], [28, '28']], xlabel: 'DAG', ylabel: 'SPIEGEL (MODEL)' });
    L.legend(g, 1130, B.y - 26, [['FSH', HC.FSH], ['LH', HC.LH, [12, 8]], ['oestrogeen', HC.E2], ['progesteron', HC.P4, [12, 8]]], a);
    // menstruatie-vakken (koraal, gedempt)
    c.save(); c.globalAlpha = a * 0.22; c.fillStyle = C.coral; for (let i = 0; i < M.n; i++) { if (M.menses[i] && M.t[i] <= Math.min(day, X1)) c.fillRect(dx(M.t[i]), B.y, B.w / (X1 - X0) * M.dt + 0.5, B.h); } c.restore();
    L.curve(g, B, M, 'FSH', X0, X1, YMAX, day, HC.FSH, { alpha: a });
    L.curve(g, B, M, 'LH', X0, X1, YMAX, day, HC.LH, { alpha: a, dash: [12, 8] });
    L.curve(g, B, M, 'E2', X0, X1, YMAX, day, HC.E2, { alpha: a });
    L.curve(g, B, M, 'P4', X0, X1, YMAX, day, HC.P4, { alpha: a, dash: [12, 8] });
    // dagklok als verticale lijn
    c.save(); c.globalAlpha = a; c.strokeStyle = C.gold; c.lineWidth = 1.5; c.setLineDash([6, 6]); c.beginPath(); c.moveTo(dx(Math.min(day, X1)), B.y); c.lineTo(dx(Math.min(day, X1)), B.y + B.h); c.stroke(); c.restore();
    // slijmvlies-strook onder de grafiek: dikte uit het model
    // v2.5 (prompt v8, C9): baarmoederwand uit de bibliotheek; dikte uit het model, klieren kronkelen na de eisprong, afstoten bij de menstruatie
    const en = M.at('endo', Math.min(day, 56)); const los = day > 27.6 && day < 29.6 ? E.clamp((day - 27.6) / 1.4, 0, 1) : 0; const kr = E.clamp((day - 15) / 5, 0, 1) * (1 - los);
    c.save(); c.globalAlpha = a; c.beginPath(); c.rect(B.x - 10, 752, B.w + 20, 200); c.clip(); baarmoederwand(c, B.x + B.w / 2, 850, B.w, 130, 0.12 + 0.85 * en, { los, kronkel: kr, t }); c.restore();
    g.text('BAARMOEDERSLIJMVLIES', B.x + 10, 742, { size: 28, f: 'mono', color: C.grain, alpha: a, layer: 'meta' });
    L.dayClock(g, day, a, '1 S ≈ 0,3 DAG', 100);
    // ---- links: regelkring hypofyse ↔ follikel ----
    const fbNeg = E.vis(t, T.remt, T.omslaat + 0.8), fbPos = E.vis(t, T.omslaat + 0.4, T.drie), fbNeg2 = E.vis(t, T.remt2, T.stijgt);
    g.box(140, 160, 420, 96, { alpha: a }); g.text('hypofyse', 350, 220, { size: 36, w: 600, align: 'center', alpha: a });
    // follikel / geel lichaam onderaan
    const Fv = M.at('F', Math.min(day, 56)); const CLv = M.at('CL', Math.min(day, 56));
    const fr = 40 + 70 * Fv; const fx = 350, fy = 560;
    const ovp = E.ep(t, T.scheurt, 1.2);   // eisprong: eicel verlaat de follikel
    if (day < 14.4 || t < T.geel) { c.save(); c.globalAlpha = a * (1 - E.ep(t, T.geel - 0.3, 0.6)); follikel(c, fx, fy, E.clamp(0.55 + 0.45 * Fv, 0, 1), { R: fr / 0.9, eicel: false, seed: 5 }); c.restore(); }
    // eicel: in de follikel, dan eruit; poollichaampje bij meiose I
    const ex = fx - fr * 0.25 + 160 * ovp, ey = fy + fr * 0.2 - 120 * ovp;
    const aE = a * (1 - E.ep(t, T.geel + 1.5, 0.6));
    E.cell(g, ex, ey, 22, { alpha: aE, nr: 8, nucleus: t < T.meiose });
    if (t >= T.meiose) { E.chromosomes(g, ex, ey, 14, 3, { alpha: aE, lw: 2, color: CD.std }); const pp = E.ep(t, T.meiose + 0.5, 1.2); E.cell(g, ex + 22 + 8 * pp, ey - 18, 6 * pp, { alpha: aE * 0.8, nucleus: false, single: true }); }
    g.label('eicel', t >= T.metafase ? 'STIL IN METAFASE II' : t >= T.meiose ? 'MAAKT MEIOSE I AF' : 'WACHT IN PROFASE I', ex + 20, ey, 600, 500, { alpha: aE * E.vis(t, T.meiose, null) });
    // wand breekt: streepjes rond de follikel
    if (t > T.wand && t < T.geel) { c.save(); c.globalAlpha = a * E.vis(t, T.wand, T.geel); c.strokeStyle = C.gold; c.lineWidth = 2; for (let i = 0; i < 6; i++) { const th = -0.9 + i * 0.3; c.beginPath(); c.moveTo(fx + Math.cos(th) * (fr + 6), fy + Math.sin(th) * (fr + 6)); c.lineTo(fx + Math.cos(th) * (fr + 24), fy + Math.sin(th) * (fr + 24)); c.stroke(); } c.restore(); }
    // geel lichaam
    // v2.5 (prompt v8, C9): geel lichaam als weefsel (lib_bio geelLichaam): geplooide wand van luteïnecellen; verschrompelt als het afsterft
    { c.save(); c.globalAlpha = a; geelLichaam(c, fx, fy, 74, { a: E.vis(t, T.geel - 0.2, null), leef: E.c01(0.15 + CLv * 1.3), t }); c.restore(); }
    g.label(t >= T.geel ? 'geel lichaam' : 'dominante follikel', t >= T.geel ? 'MAAKT PROGESTERON (EN OESTROGEEN)' : 'MAAKT STEEDS MEER OESTROGEEN', fx, fy + 76, 140, 710, { alpha: a, color: t >= T.geel ? C.ochre : C.gold });
    // pijlen: hormonen omhoog (oestrogeen/progesteron naar de hypofyse), LH omlaag naar de follikel
    const colUp = t >= T.geel ? HC.P4 : HC.E2;
    if (fbNeg > 0.01 || fbNeg2 > 0.01) { const aa = a * Math.max(fbNeg, fbNeg2); g.inhibit(430, fy - fr - 20, 430, 262, { color: colUp, alpha: aa, lw: 2.5 }); g.text('−', 470, 420, { size: 48, w: 700, color: colUp, alpha: aa }); g.text(t >= T.geel ? 'progesteron + oestrogeen remmen' : 'oestrogeen remt', 460, 350, { size: 32, w: 600, color: colUp, alpha: aa }); }
    if (fbPos > 0.01) { g.arrow(430, fy - fr - 20, 430, 262, { color: HC.E2, alpha: a * fbPos, lw: 2.5 }); g.text('+', 470, 420, { size: 48, w: 700, color: HC.E2, alpha: a * fbPos }); g.text('oestrogeen stimuleert', 460, 350, { size: 32, w: 600, color: HC.E2, alpha: a * fbPos }); }
    const aLH = a * E.vis(t, T.stimuleren, T.drie); g.arrow(270, 262, 270, fy - fr - 20, { color: HC.LH, alpha: aLH, lw: 2.5 }); g.text('LH', 230, 420, { size: 36, w: 600, color: HC.LH, align: 'right', alpha: aLH });
    g.annot(140, 560, 790, 'positieve terugkoppeling: het signaal versterkt zichzelf', { alpha: a * E.vis(t, T.positief, T.drie), color: C.green, maxW: 520 });
    g.annot(140, 560, 790, 'ongeveer twee dagen hoog: dan slaat het effect om', { alpha: a * E.vis(t, T.hoog, T.omslaat + 1.5), color: C.coral, maxW: 520 });
    g.text('LH-piek', dx(M.surge[0]) + 16, B.y + 60, { size: 36, w: 600, color: HC.LH, alpha: a * E.vis(t, T.piek, null) });
    g.text('eisprong', dx(M.ov[0]) + 10, B.y + 120, { size: 36, w: 600, color: C.gold, alpha: a * E.vis(t, T.eisprong, null) });
    g.text('menstruatie', dx(28.3) - 160, B.y + 60, { size: 36, w: 600, color: C.coral, alpha: a * E.vis(t, T.menstruatie, null) });
    g.annot(140, 560, 790, 'geen embryo: na ± 12 dagen sterft het gele lichaam af', { alpha: a * E.vis(t, T.sterft, T.stijgt), color: C.coral, maxW: 520 });
    g.annot(140, 560, 790, 'de rem valt weg: FSH stijgt, de cyclus begint opnieuw', { alpha: a * E.vis(t, T.stijgt, null), color: C.green, maxW: 520 });
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H5 De ontmoeting — Schema (de weg) → zoomcirkel groeit → Micro: capacitatie, zona pellucida, acrosoomreactie, calciumgolf, zygote ========== */
OSC['5'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { zaadlozing: W(1, 'zaadlozing'), twintigste: W(2, 'twintigste'), zwaar: W(2, 'zwaar'), zuur: W(3, 'Zuur'), slijm: W(3, 'slijm'), afweer: W(3, 'afweercellen'), verkeerde: W(3, 'verkeerde'), honderd: W(4, 'honderd'),
    onderweg: W(5, 'Onderweg'), cholesterol: W(6, 'cholesterol'), capacitatie: W(7, 'capacitatie'), follikelcellen: W(8, 'follikelcellen'), zona: W(9, 'zona'), bindt: W(10, 'Bindt'), blaasje: W(10, 'blaasje'), acrosoom: W(11, 'acrosoom'),
    enzymen: W(12, 'enzymen'), tunneltje: W(12, 'tunneltje'), reactie: W(13, 'acrosoomreactie'), versmelt: W(14, 'versmelt'), kern: W(15, 'kern'), golf: W(16, 'golf'), korrels: W(17, 'korrels'), lozen: W(17, 'lozen'),
    veranderen: W(18, 'veranderen'), geen: W(18, 'geen'), waarom: W(19, 'Waarom'), drie: W(20, 'drie'), niet: W(21, 'niet'), wakker: W(22, 'wakker'), tweede: W(23, 'tweede'), pool: W(23, 'poollichaampje'), samen: W(24, 'samen'), zygote: W(25, 'zygote'), end: TL.E(25) };
  TL.cue('action', 'teller 200 miljoen → honderden; hindernissen', T.zaadlozing, T.onderweg, { anchor: 'r1 zaadlozing' });
  TL.cue('look-change', 'zoomcirkel groeit naar Micro bij de eicel', T.onderweg - 0.5, T.onderweg + 1.5, { anchor: 'r5 Onderweg' });
  TL.cue('term', 'capacitatie', T.capacitatie, T.follikelcellen + 2, { anchor: 'r7 capacitatie' });
  TL.cue('term', 'zona pellucida', T.zona, T.end, { anchor: 'r9 zona' });
  TL.cue('term', 'acrosoom / acrosoomreactie', T.acrosoom, T.versmelt + 3, { anchor: 'r11 acrosoom' });
  TL.cue('action', 'calciumgolf en corticale reactie', T.golf, T.waarom, { anchor: 'r16 golf' });
  TL.cue('action', 'meiose II af, poollichaampje, zygote', T.wakker, T.end + 1, { anchor: 'r22 wakker' });
  const EX = 1180, EY = 540, ER = 230;   // eicel (Micro)
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 5, 11, 'Waarom kan maar één zaadcel naar binnen, en hoe weet de eicel dat?');
    if (aScene <= 0.01) return; const c = g.ctx;
    // ---- deel A: de weg (Schema) ----
    const zp = E.ep(t, T.onderweg - 0.5, 2.0);
    const aA = aScene * (1 - E.ep(t, T.onderweg + 1.5, 0.3));
    if (aA > 0.01 && zp < 1) {
      g.bg('schema', aA);
      const U = L.uterus(g, 960, 500, 1.55, { alpha: aA, endo: 0.6 });
      // zaadcellen: van vagina omhoog naar de eileider; aantal neemt af met de teller
      const n = Math.floor(E.lerp(200, 6, E.ep(t, T.zwaar, T.honderd - T.zwaar)));
      const cnt = Math.round(E.lerp(200000000, 300, E.easeO(E.ep(t, T.zwaar, T.honderd - T.zwaar))));
      const path = [U.vagina, U.cervix, U.cavity, [U.tubeR[0], U.tubeR[1] + 30], U.ovR];
      const aSp = aA * E.vis(t, T.zaadlozing, null);
      for (let i = 0; i < Math.min(n, 60); i++) { const h = E.hash(i * 3.3 + 1); const p = E.c01(((t - T.zaadlozing) * 0.08 + h * 0.5) % 1.0); const k = p * (path.length - 1), ii = Math.min(path.length - 2, Math.floor(k)), f = k - ii; const x = E.lerp(path[ii][0], path[ii + 1][0], f) + (E.hash(i * 7) - 0.5) * 60, y = E.lerp(path[ii][1], path[ii + 1][1], f) + (E.hash(i * 5) - 0.5) * 40; E.sperm(g, x, y, Math.atan2(path[ii + 1][1] - path[ii][1], path[ii + 1][0] - path[ii][0]), 1.3, { alpha: aSp, wig: t * 8 + i }); }
      g.text(cnt.toLocaleString('nl-NL') + ' zaadcellen', 960, 120, { size: 48, w: 600, align: 'center', color: C.gold, alpha: aSp });
      g.label('zuur', 'VAGINA', U.vagina[0] + 20, U.vagina[1], 1250, 860, { alpha: aA * E.vis(t, T.zuur, null), color: C.coral });
      g.label('slijm', 'BAARMOEDERHALS', U.cervix[0] + 20, U.cervix[1], 1250, 760, { alpha: aA * E.vis(t, T.slijm, null), color: C.coral });
      g.label('afweercellen', 'BAARMOEDER', U.cavity[0] + 30, U.cavity[1], 1250, 660, { alpha: aA * E.vis(t, T.afweer, null), color: C.coral });
      g.label('de verkeerde eileider', 'HELFT GAAT LINKS', U.tubeL[0], U.tubeL[1] - 10, 200, 230, { alpha: aA * E.vis(t, T.verkeerde, null), color: C.coral });
      g.scaleBar(120, 900, 150, '± 2 cm', aA);
      g.text('zaadcel ± 0,05 mm · niet op schaal', 120, 860, { size: 28, f: 'mono', color: C.grain, alpha: aA * E.vis(t, T.twintigste, null), layer: 'meta' });
    }
    // ---- deel B: Micro (groeiende zoomcirkel vanaf de eierstokkant van de eileider) ----
    if (zp > 0.01) {
      const drawMicro = (g) => {
        const a = aScene;
        const bound = E.ep(t, T.bindt, 1.0);            // zaadcel bindt aan de zona
        const acro = E.ep(t, T.blaasje, 0.8), tun = E.ep(t, T.enzymen, 2.6), fuse = E.ep(t, T.versmelt, 1.5), nucIn = E.ep(t, T.kern, 1.6);
        const wave = E.ep(t, T.golf, 2.2), cort = E.ep(t, T.korrels, 1.4), hard = E.ep(t, T.veranderen, 1.5);
        const m2 = E.ep(t, T.tweede, 1.4), pn = E.ep(t, T.samen, 1.8);
        // follikelcellen (buitenste ring) en zona pellucida (dikke mantel)
        // v2.5 (prompt v8, C9): op schaal (200 px = 50 µm): eicel ± 115 µm, zona ± 12 µm dik, stralenkrans = twee lagen
        // follikelcellen van ± 10 µm met openingen; zaadcel ± 55 µm (kop ± 5 µm) uit de bibliotheek
        const aF = a * E.vis(t, T.follikelcellen - 0.3, null);
        for (let L2 = 0; L2 < 2; L2++) { const nC = L2 ? 46 : 38; for (let i = 0; i < nC; i++) { const th = i / nC * Math.PI * 2 + L2 * 0.07 + 0.05 * Math.sin(i * 3.7); if (Math.abs(((th - Math.PI + 9.42) % 6.283) - 3.14) < 0.09) continue;
          const d = ER + 76 + L2 * 40 + 6 * Math.sin(i * 2.3 + L2); const rr = 15 + 4 * E.hash(i * 7 + L2); E.cell(g, EX + Math.cos(th) * d, EY + Math.sin(th) * d, rr, { alpha: aF * (L2 ? 0.8 : 1), nr: rr * 0.42, single: true, fill: C.fill2, edge: C.fillL, rot: th, ry: rr * 0.78, texture: false, nucleus: true }); } }
        { const aZ2 = a * E.vis(t, T.zona - 0.3, null); c.save(); c.globalAlpha = aZ2 * (0.5 + 0.35 * hard); c.lineWidth = 48; c.strokeStyle = hard > 0 ? E.mix(C.ochreL, C.grain, hard) : C.ochreL; c.beginPath(); c.arc(EX, EY, ER + 28, 0, Math.PI * 2); c.stroke();
          c.globalAlpha = aZ2 * 0.5; c.lineWidth = 1.2; c.strokeStyle = E.lighter(C.ochreL, 0.4); for (let i = 0; i < 70; i++) { const th = i / 70 * 6.283 + E.hash(i) * 0.05, rr = ER + 10 + 36 * E.hash(i * 3 + 1); c.beginPath(); c.arc(EX, EY, rr, th, th + 0.08); c.stroke(); } c.restore(); }
        // tunneltje door de zona op de plek van de zaadcel (links, hoek π)
        if (tun > 0) { c.save(); c.globalAlpha = a; c.strokeStyle = C.micro; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(EX - ER - 54, EY); c.lineTo(EX - ER - 54 + 52 * tun, EY); c.stroke(); c.restore(); }
        // eicel zelf
        E.cell(g, EX, EY, ER, { alpha: a, nucleus: false, blob: 0.02 });
        // kern van de eicel: metafase II (chromosomen) → maakt deling af → voorkern
        const aEn = a * (1 - pn); E.chromosomes(g, EX + 60, EY - 40, 40, 6, { alpha: aEn, lw: 3, color: CD.std });
        g.label('eicel', 'STIL IN METAFASE II', EX + 60, EY - 60, EX, EY - 120, { alpha: a * E.vis(t, T.follikelcellen - 0.3, T.wakker), noline: true, align: 'center' });
        // tweede poollichaampje
        if (m2 > 0) E.cell(g, EX + ER - 30 + 50 * m2, EY - 120, 16 * m2, { alpha: a * 0.8, nr: 5, single: true });
        // voorkernen samen
        if (pn > 0) { E.nucleus(g, EX + 60 - 30 * pn, EY - 40 + 20 * pn, 44, { alpha: a * pn }); E.nucleus(g, EX - 90 + 40 * pn, EY + 10, 44, { alpha: a * pn }); }
        // corticale korrels onder het membraan; lozen naar buiten
        const nK = 36; for (let i = 0; i < nK; i++) { const th = i / nK * Math.PI * 2; const d = ER - 16 + 36 * cort * E.c01((wave * 2.2 - (1 - Math.cos(th - Math.PI)) / 2)); const aK = a * E.vis(t, T.golf - 0.2, null) * (1 - 0.7 * E.c01(cort * 1.2 - 0.3)); g.disc(EX + Math.cos(th) * d, EY + Math.sin(th) * d, 6, { alpha: aK, fill: C.vesFill, stroke: C.vesEdge }); }
        // calciumgolf: teal ring vanaf de ingang naar rechts
        if (wave > 0 && wave < 1) { c.save(); c.globalAlpha = a * (1 - wave) * 0.9; c.strokeStyle = C.teal; c.lineWidth = 8; c.beginPath(); c.arc(EX - ER, EY, wave * ER * 2.1, -Math.PI / 2, Math.PI / 2); c.stroke(); c.restore(); }
        // zaadcellen: één hoofdrolspeler (links) plus enkele die later afketsen
        const sx0 = EX - ER - 128, sy0 = EY;
        const sx = E.lerp(EX - ER - 470, sx0, E.ep(t, T.follikelcellen, T.bindt - T.follikelcellen)) + 62 * bound + 46 * tun + 20 * fuse;
        // cholesterol dat uit het membraan gaat (capacitatie): oker ruitjes die wegdrijven
        const cap = E.ep(t, T.cholesterol, 2.5); const aCap = a * E.vis(t, T.cholesterol - 0.2, T.follikelcellen + 1);
        for (let i = 0; i < 6; i++) { const h = E.hash(i * 4 + 1); E.hormone(g, sx + 4 - 9 * i + (h - 0.5) * 12 - 50 * cap * h, sy0 - 14 - 70 * cap * (0.4 + h), C.ochre, { alpha: aCap * (1 - cap * 0.7), r: 4.5, kind: 'steroid', rot: h * 3 }); }
        zaadcelEcht(c, sx, sy0, 0.08 * Math.sin(t * 2) * (1 - bound), t * (1 - 0.8 * bound), 1.67, { a: a * (1 - E.ep(t, T.kern + 1.6, 0.6)), acro: acro < 0.5 ? C.vesEdge : rgba(C.vesEdge, 0.15), slag: 1.2 });
        // acrosoom opent: enzymen (gouden stipjes) komen vrij
        if (acro > 0) for (let i = 0; i < 10; i++) { const h = E.hash(i * 2.1); E.hormone(g, sx + 14 + 30 * tun * h + (h - 0.5) * 10, sy0 + (E.hash(i * 3.7) - 0.5) * 30 * acro, C.gold, { alpha: a * acro * (1 - fuse), r: 3, kind: 'plain' }); }
        // kern gaat naar binnen (paarse bol)
        if (nucIn > 0) E.nucleus(g, E.lerp(sx + 4, EX - 90, nucIn), E.lerp(sy0, EY + 10, nucIn), 7 + 37 * nucIn, { alpha: a * (1 - pn) });
        // andere zaadcellen die afketsen na de corticale reactie
        const aO = a * E.vis(t, T.golf, null); for (let i = 0; i < 5; i++) { const th = 0.75 + i * 0.42; const bounce = hard > 0.3 ? 18 * Math.abs(Math.sin(t * 2 + i)) : 0; const d = ER + 62 + bounce; zaadcelEcht(c, EX + Math.cos(th) * d, EY + Math.sin(th) * d, th + Math.PI, t + i * 0.3, 1.67, { a: aO }); }
        // labels (buiten de eicel)
        // labels in vaste vakken naast de tekening (geen overlap met de zaadcel op y = EY)
        const nl = { noline: true };
        g.label('capacitatie', 'CHOLESTEROL UIT HET MEMBRAAN', null, null, 120, 400, Object.assign({ alpha: a * E.vis(t, T.capacitatie, T.bindt), color: C.ochre }, nl));
        g.label('follikelcellen', 'LAAG HULPCELLEN', null, null, 1560, 200, Object.assign({ alpha: aF * (1 - E.vis(t, T.pool - 0.5, null)) }, nl));
        g.label('zona pellucida', 'MANTEL VAN GLYCOPROTEÏNEN', null, null, 1400, 880, Object.assign({ alpha: a * E.vis(t, T.zona, null), color: C.ochreL }, nl));
        g.label('acrosoom', 'BLAASJE MET ENZYMEN', null, null, 120, 400, Object.assign({ alpha: a * E.vis(t, T.acrosoom, T.versmelt), color: C.vesEdge }, nl));
        g.label('acrosoomreactie', 'TUNNELTJE DOOR DE ZONA', null, null, 120, 700, Object.assign({ alpha: a * E.vis(t, T.reactie, T.golf), color: C.gold }, nl));
        g.label('corticale korrels', 'VERANDEREN DE ZONA: GEEN TWEEDE ZAADCEL', null, null, 120, 700, Object.assign({ alpha: a * E.vis(t, T.korrels, T.waarom), color: C.vesEdge }, nl));
        g.label('calciumgolf', 'MAAKT DE EICEL WAKKER', null, null, 120, 400, Object.assign({ alpha: a * E.vis(t, T.golf, T.korrels + 2), color: C.teal }, nl));
        g.label('tweede poollichaampje', 'MEIOSE II AF', null, null, 1500, 330, Object.assign({ alpha: a * E.vis(t, T.pool, null) }, nl));
        g.annot(EX - ER, EX + ER, EY - ER - 100, 'twee zaadcellen: drie sets chromosomen, geen normale ontwikkeling', { alpha: a * E.vis(t, T.drie, T.wakker), color: C.coral, maxW: 900, above: true });
        g.annot(EX - ER, EX + ER, EY - ER - 100, 'zygote: een nieuwe combinatie van 46 chromosomen', { alpha: a * E.vis(t, T.zygote, null), color: C.green, maxW: 900, above: true });
        g.scaleBar(160, 130, 200, '± 50 µm', a * E.vis(t, T.onderweg + 1.5, null));
      };
      if (zp < 1) g.zoomCircle(EX, EY, E.lerp(30, 1500, zp), 1400, 340, 24, 'micro', drawMicro, null, aScene);
      else { g.bg('micro', aScene); drawMicro(g); }
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H6 Een bericht aan het gele lichaam — eileider (Schema) met zoomcirkel: klieving, blastocyste, innesteling; hCG; zwangerschapstest ========== */
OSC['6'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { trilharen: W(1, 'Trilharen'), deelt: W(2, 'deelt'), twee: W(2, 'twee'), vier: W(2, 'vier'), acht: W(2, 'acht'), zestien: W(2, 'zestien'), klieving: W(3, 'klievingsdelingen'), groeien: W(4, 'groeien'), kleiner: W(5, 'kleiner'), cyto: W(6, 'cytoplasma'),
    vijf: W(7, 'vijf'), blasto: W(7, 'blastocyste'), trofo: W(8, 'trofoblast'), bcm: W(9, 'binnenste'), kruipt: W(10, 'kruipt'), nestelt: W(11, 'nestelt'), groeit: W(12, 'groeit'), probleem: W(13, 'probleem'), twaalf: W(14, 'twaalf'),
    sterft: W(15, 'Sterft'), afgestoten: W(15, 'afgestoten'), met: W(16, 'mét'), bericht: W(17, 'bericht'), hcg: W(18, 'hCG'), lijkt: W(18, 'lijkt'), bloed: W(19, 'bloed'), bindt: W(20, 'bindt'), leven: W(21, 'leven'), blijft: W(22, 'blijft'), geen: W(23, 'geen'),
    omdat: W(24, 'Omdat'), innesteling: W(25, 'innesteling'), betrouwbaar: W(26, 'betrouwbaar'), test: W(27, 'zwangerschapstest'), antistoffen: W(27, 'antistoffen'), streepje: W(28, 'streepje'), placenta: W(29, 'placenta'), nodig: W(30, 'nodig'), end: TL.E(30) };
  TL.cue('action', 'zygote door de eileider; zoom: klieving 2-4-8-16', T.trilharen, T.vijf, { anchor: 'r1 Trilharen' });
  TL.cue('term', 'blastocyste, trofoblast, binnenste celmassa', T.blasto, T.probleem, { anchor: 'r7 blastocyste' });
  TL.cue('action', 'innesteling in het slijmvlies', T.nestelt, T.probleem, { anchor: 'r11 nestelt' });
  TL.cue('action', 'geel lichaam met 12-dagenklok; progesteron zakt (scenario)', T.probleem, T.bericht, { anchor: 'r13 probleem' });
  TL.cue('term', 'hCG → LH-receptoren van het gele lichaam', T.hcg, T.omdat, { anchor: 'r18 hCG' });
  TL.cue('action', 'zwangerschapstest: antistoffen binden hCG', T.test, T.placenta, { anchor: 'r27 zwangerschapstest' });
  TL.cue('action', 'tijdlijn weken: placenta neemt over', T.placenta, T.end + 1, { anchor: 'r29 placenta' });
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 6, 11, 'Hoe voorkomt een embryo van een paar dagen oud dat het wordt weggespoeld?');
    if (aScene <= 0.01) return; const c = g.ctx;
    g.bg('schema', aScene);
    // ---- deel A: eileider en baarmoeder (Schema), zygote reist; zoomcirkel met klieving/blastocyste/innesteling ----
    const aA = aScene * E.vis(t, TL.card.t1 - 0.5, T.probleem - 0.2, 0.4, 0.5);
    if (aA > 0.01) {
      const U = L.uterus(g, 760, 560, 1.15, { alpha: aA, endo: 0.9 });
      // reis van eierstok rechts → baarmoederholte; p 0..1 tot 'nestelt'
      const p = E.ep(t, T.trilharen, T.nestelt - T.trilharen);
      const path = [U.ovR, [U.tubeR[0] + 60, U.tubeR[1] - 20], [U.tubeR[0] - 60, U.tubeR[1]], [U.cavity[0] + 40, U.cavity[1] - 60], [U.cavity[0] + 30, U.cavity[1] + 10]];
      const k = p * (path.length - 1), ii = Math.min(path.length - 2, Math.floor(k)), f = k - ii; const zx = E.lerp(path[ii][0], path[ii + 1][0], f), zy = E.lerp(path[ii][1], path[ii + 1][1], f);
      g.disc(zx, zy, 9, { alpha: aA, fill: C.green });
      // trilharen: kleine schuine streepjes in de eileider
      c.save(); c.globalAlpha = aA * E.vis(t, T.trilharen, T.deelt + 2); c.strokeStyle = C.line; c.lineWidth = 1.5; for (let i = 0; i < 14; i++) { const x = U.tubeR[0] + 150 - i * 22, y = U.tubeR[1] - 30 + i * 2; const ph = Math.sin(t * 6 - i * 0.6) * 6; c.beginPath(); c.moveTo(x, y + 20); c.lineTo(x - 6 + ph, y); c.stroke(); } c.restore();
      g.text('1 S ≈ 6 UUR · NIET OP SCHAAL', 60, 912, { size: 28, f: 'mono', color: C.grain, alpha: aA, ls: 2, layer: 'meta' });
      g.label('eileider', 'TRILHAREN EN SPIERTJES', U.tubeR[0] - 40, U.tubeR[1] - 36, 560, 150, { alpha: aA * E.vis(t, T.trilharen, T.klieving) });
      // zoomcirkel: embryo vergroot (zelfde grootte, cellen kleiner), blastocyste, innesteling
      const nCells = t < T.twee ? 1 : t < T.vier ? 2 : t < T.acht ? 4 : t < T.zestien ? 8 : 16;
      const aZ = aA * E.vis(t, T.deelt - 0.6, null);
      const ZX = 1450, ZY = 470, ZR = 300;
      g.zoomCircle(ZX, ZY, ZR, zx, zy, 12, 'micro', (gg) => {
        const R = 150; const blast = E.ep(t, T.vijf, 1.6), hatch = E.ep(t, T.kruipt, 1.6), nest = E.ep(t, T.nestelt, 2.5);
        const cx = ZX, cy = ZY + 40 * nest;
        // slijmvlies onderin bij innesteling
        if (hatch > 0) { gg.ctx.save(); gg.ctx.globalAlpha = aZ * hatch; baarmoederwand(gg.ctx, ZX, ZY + 262, 660, 240, 0.9, { kronkel: 1, t }); gg.ctx.restore(); }   // v2.5: echte baarmoederwand (lib_bio)
        // zona pellucida (verdwijnt bij 'kruipt')
        gg.ctx.save(); gg.ctx.globalAlpha = aZ * (1 - hatch) * 0.7; gg.ctx.strokeStyle = C.ochreL; gg.ctx.lineWidth = 14; gg.ctx.beginPath(); gg.ctx.arc(cx, cy, R + 14, 0, Math.PI * 2); gg.ctx.stroke(); gg.ctx.restore();
        if (blast < 0.5) {
          // klievingscellen: n cellen in een bol van vaste grootte
          const n = nCells; const r = R / Math.pow(n, 0.5) * (n === 1 ? 1 : 1.15);
          for (let i = 0; i < n; i++) { const th = i / n * Math.PI * 2 + 0.3, d = n === 1 ? 0 : R - r; E.cell(gg, cx + Math.cos(th) * d * (n > 4 ? 0.8 : 1), cy + Math.sin(th) * d * (n > 4 ? 0.8 : 1), r, { alpha: aZ, nr: r * 0.3 }); }
        } else {
          // blastocyste: holle bal; trofoblast-ring (cellen) en binnenste celmassa; bij nestelen groeit de trofoblast het slijmvlies in
          E.cell(gg, cx, cy, R, { alpha: aZ, nucleus: false });
          for (let i = 0; i < 26; i++) { const th = i / 26 * Math.PI * 2; E.cell(gg, cx + Math.cos(th) * (R - 14), cy + Math.sin(th) * (R - 14), 14, { alpha: aZ, nr: 5, single: true, fill: C.fill2, edge: C.fillL }); }
          for (let i = 0; i < 7; i++) { const h1 = E.hash(i * 3 + 1), h2 = E.hash(i * 3 + 2); E.cell(gg, cx - 60 + h1 * 60, cy - 60 + h2 * 50, 16, { alpha: aZ, nr: 6, single: true, fill: C.fill2, edge: C.greenL }); }
          if (nest > 0) for (let i = 0; i < 5; i++) { const x = cx - 80 + i * 40; gg.ctx.save(); gg.ctx.globalAlpha = aZ; gg.ctx.strokeStyle = C.fillL; gg.ctx.lineWidth = 6; gg.ctx.beginPath(); gg.ctx.moveTo(x, cy + R - 10); gg.ctx.lineTo(x + (i - 2) * 12, cy + R + 60 * nest); gg.ctx.stroke(); gg.ctx.restore(); }
        }
      }, null, aZ);
      g.text(t < T.vijf ? `${nCells} ${nCells === 1 ? 'cel' : 'cellen'}` : 'blastocyste', ZX, ZY + ZR + 46, { size: 36, w: 600, align: 'center', color: C.ink, alpha: aZ });
      g.text(t < T.vijf ? 'ZELFDE GROOTTE · CELLEN STEEDS KLEINER' : t < T.kruipt ? 'DAG 5 · HOLLE BAL' : 'DAG 6 · INNESTELING', ZX, ZY + ZR + 82, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aZ * E.vis(t, T.klieving, null), layer: 'meta' });
      g.label('trofoblast', 'WORDT KINDSDEEL VAN DE PLACENTA', null, null, ZX, 96, { alpha: aA * E.vis(t, T.trofo, null), noline: true, align: 'center' });
      g.label('binnenste celmassa', 'WORDT HET KIND', null, null, 1130, 210, { alpha: aA * E.vis(t, T.bcm, null), color: C.greenL, noline: true, align: 'right' });
      g.label('baarmoederslijmvlies', 'DIK DOOR PROGESTERON', null, null, 1130, 310, { alpha: aA * E.vis(t, T.nestelt, null), color: C.coralL, noline: true, align: 'right' });
    }
    // ---- deel B: het probleem en het bericht (Schema regelkring: geel lichaam ↔ slijmvlies ↔ embryo) ----
    const aB = aScene * E.vis(t, T.probleem - 0.2, T.test - 0.3, 0.5, 0.5);
    if (aB > 0.01) {
      const scen = E.vis(t, T.sterft, T.bericht - 0.2, 0.4, 0.4);   // scenario: geel lichaam sterft
      const rescue = E.vis(t, T.leven, null);
      // geel lichaam links met klok
      const clv = 1 - 0.65 * scen * E.ep(t, T.sterft, 1.2);
      // v2.5: geel lichaam als weefsel; LH-receptoren op een cel aan de linkerkant (180° gedraaid getekend), daar komt het bloedvat met hCG aan
      { c.save(); c.globalAlpha = aB; c.translate(840, 840); c.rotate(Math.PI); geelLichaam(c, 420, 420, 92, { leef: E.c01((clv - 0.35) / 0.65), receptoren: E.vis(t, T.bindt - 0.5, null), t }); c.restore(); }
      g.label('geel lichaam', t >= T.leven ? 'BLIJFT LEVEN · BLIJFT PROGESTERON MAKEN' : 'LEEFT MAAR ± 12 DAGEN', 420, 500, 230, 600, { alpha: aB, color: C.ochre });
      // klok: ring die vol loopt tot 12 dagen
      const dayp = E.c01(E.ep(t, T.twaalf - 0.5, 2.5)); c.save(); c.globalAlpha = aB * E.vis(t, T.twaalf - 0.5, null); c.strokeStyle = C.fillL; c.lineWidth = 8; c.beginPath(); c.arc(420, 230, 48, 0, Math.PI * 2); c.stroke(); c.strokeStyle = C.gold; c.beginPath(); c.arc(420, 230, 48, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * dayp); c.stroke(); c.restore();
      g.text('12 dagen', 490, 242, { size: 32, w: 600, alpha: aB * E.vis(t, T.twaalf - 0.5, null) });
      // progesteron naar het slijmvlies
      const pv = t < T.sterft ? 1 : t < T.leven ? 1 - 0.8 * E.ep(t, T.sterft, 1.6) : E.lerp(0.2, 1, E.ep(t, T.leven, 1.2));
      L.gauge(g, 700, 300, 60, 260, pv, HC.P4, 'progesteron', aB);
      // slijmvlies met embryo rechts; wordt afgestoten in het scenario
      const shed = scen * E.ep(t, T.afgestoten, 1.4);
      // v2.5 (prompt v8, C9): baarmoederwand uit de bibliotheek met een ingenesteld embryo (blastocyste); zonder progesteron laat het slijmvlies los, mét het embryo
      const BW = (() => { c.save(); c.globalAlpha = aB; const r = baarmoederwand(c, 1180, 500, 560, 260, 0.85, { los: shed, kronkel: 1, t }); c.restore(); return r; })();
      const emY = BW.oppervlak + 6 - (shed > 0.05 ? 120 * shed : 0), emX = 1180 + 20 * shed;
      { const er = 30; c.save(); c.globalAlpha = aB * (1 - 0.5 * shed); c.lineWidth = 2; c.strokeStyle = C.greenL; c.fillStyle = rgba(C.green, 0.25); c.beginPath(); c.arc(emX, emY, er, 0, 7); c.fill(); c.stroke(); c.fillStyle = C.green; c.beginPath(); c.ellipse(emX - 8, emY - 10, 13, 10, 0, 0, 7); c.fill();
        for (let k = 0; k < 14; k++) { const th = k / 14 * 6.283; c.beginPath(); c.arc(emX + Math.cos(th) * (er - 3), emY + Math.sin(th) * (er - 3), 3.2, 0, 7); c.fillStyle = C.greenL; c.fill(); } c.restore(); }
      g.text('embryo', emX, emY - 46, { size: 36, w: 600, align: 'center', color: C.greenL, alpha: aB * (1 - 0.5 * shed), halo: 7 });
      g.text('baarmoederslijmvlies', 1180, 680, { size: 36, w: 600, align: 'center', alpha: aB });
      g.annot(900, 1460, 700, 'zonder progesteron: slijmvlies afgestoten, mét het embryo', { alpha: aB * scen, color: C.coral, maxW: 700 });
      // hCG: van de trofoblast via het bloed naar de LH-receptoren van het gele lichaam
      const aH = aB * E.vis(t, T.hcg, null);
      const path = [[1230, BW.oppervlak + 24], [1490, 560], [1500, 880], [180, 880], [150, 640], [300, 432]];
      c.save(); c.globalAlpha = aH; bloedvat(c, path, 14, t, { n: 16, cel: 8, speed: 0.07 }); c.restore();
      L.stream(g, path, t, 0.22, 7, HC.hCG, { alpha: aH * E.vis(t, T.bloed - 0.5, null), r: 9 });
      g.text('bloed', 1530, 760, { size: 32, w: 600, color: C.coral, alpha: aH * E.vis(t, T.bloed, null) });
      g.label('hCG', 'VAN DE TROFOBLAST · LIJKT OP LH', null, null, 880, 800, { alpha: aH, color: HC.hCG, noline: true });
      g.label('LH-receptor', 'OOK hCG PAST ERIN', null, null, 60, 320, { alpha: aB * E.vis(t, T.bindt, null), color: HC.LH, noline: true });
      g.annot(230, 800, 700, 'hCG houdt het gele lichaam in leven: geen menstruatie', { alpha: aB * rescue, color: C.green, maxW: 600 });
    }
    // ---- deel C: zwangerschapstest en tijdlijn weken ----
    const aC = aScene * E.vis(t, T.test - 0.3, null, 0.5);
    if (aC > 0.01) {
      // v2.5 (prompt v8, C9): een herkenbare zwangerschapstest (lib_bio): urine trekt door het lontje naar het venster,
      // antistoffen op de teststreep vangen hCG en kleuren; de controlestreep kleurt altijd
      const flowp = E.ep(t, T.test, 3.0); const aLine = E.ep(t, T.streepje, 1.2);
      const ZT = (() => { c.save(); c.globalAlpha = aC; const r = zwangerschapstest(c, 760, 370, 1.4, { t, urine: flowp, T: aLine, Cl: 1 }); c.restore(); return r; })();
      g.text('zwangerschapstest', 320, 250, { size: 36, w: 600, alpha: aC });
      const V = ZT.venster; for (let i = 0; i < 10; i++) { const h = E.hash(i * 2 + 1); const x = ZT.tip[0] + ((h * 900 + (t - T.test) * 160) % (V[2] - ZT.tip[0])); if (x < E.lerp(ZT.tip[0], V[2], flowp) && x < ZT.T[0] - 6) E.hormone(g, x, ZT.tip[1] + (E.hash(i * 5) - 0.5) * 22, HC.hCG, { alpha: aC * E.vis(t, T.test, null), r: 5 }); }
      // antistoffen (Y-vormpjes) op de teststreep, net boven het venster uitvergroot
      const ax = ZT.T[0]; c.save(); c.globalAlpha = aC * E.vis(t, T.antistoffen - 0.3, null); c.strokeStyle = C.teal; c.lineWidth = 3; c.lineCap = 'round'; for (let i = 0; i < 5; i++) { const xx = ax - 48 + i * 24, yy = V[1] - 46; c.beginPath(); c.moveTo(xx, yy + 18); c.lineTo(xx, yy + 8); c.moveTo(xx - 7, yy); c.lineTo(xx, yy + 8); c.lineTo(xx + 7, yy); c.stroke(); if (aLine > 0.3 + i * 0.12) E.hormone(g, xx, yy - 4, HC.hCG, { alpha: aC, r: 5 }); } c.restore();
      g.label('antistoffen tegen hCG', 'BINDEN hCG UIT DE URINE', null, null, ax, 560, { alpha: aC * E.vis(t, T.antistoffen, null), color: C.teal, noline: true, align: 'center' });
      g.text('controlestreep', ZT.C[0] + 20, 520, { size: 28, f: 'mono', color: C.grain, align: 'left', alpha: aC, layer: 'meta' });
      // tijdlijn weken
      const aT = aC * E.vis(t, T.placenta - 0.3, null);
      const x0 = 300, x1 = 1620, y = 760; c.save(); c.globalAlpha = aT; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); for (let w = 0; w <= 12; w++) { const x = x0 + w / 12 * (x1 - x0); c.moveTo(x, y - 8); c.lineTo(x, y + 8); } c.stroke(); c.restore();
      for (let w = 0; w <= 12; w += 2) g.text(String(w), x0 + w / 12 * (x1 - x0), y + 44, { size: 28, f: 'mono', color: C.grain, align: 'center', alpha: aT, layer: 'meta' });
      g.text('WEKEN', x0 - 24, y + 44, { size: 28, f: 'mono', color: C.grain, align: 'right', alpha: aT, layer: 'meta' });
      // v3.1 (29 okt 2026): geleidelijke overname rond week 7–10 (Endotext 'luteal-placental shift' week 7–9; Neumann e.a. 2020: placenta vanaf week 7).
      // Geel lichaam (oker) dooft uit tussen week 7 en 10; placenta (groen) begint in week 7 en groeit; band week 7–10 = de overgang.
      const pw = E.ep(t, T.placenta, 1.6), wx = (w) => x0 + w / 12 * (x1 - x0);
      c.save(); c.globalAlpha = aT * 0.16 * pw; c.fillStyle = C.green; c.fillRect(wx(7), y - 170, wx(10) - wx(7), 170); c.restore();
      { const gr = c.createLinearGradient(wx(7), 0, wx(10), 0); gr.addColorStop(0, C.ochre); gr.addColorStop(1, 'rgba(201,163,92,0.12)');
        g.box(x0, y - 80, wx(7) - x0, 30, { alpha: aT, fill: C.ochre, r: 6 }); c.save(); c.globalAlpha = aT; c.fillStyle = gr; E.rr(c, wx(7) - 6, y - 80, wx(10) - wx(7) + 6, 30, 6); c.fill(); c.restore(); }
      g.text('geel lichaam maakt progesteron', x0 + 10, y - 92, { size: 32, w: 600, color: C.ochre, alpha: aT });
      { const gr = c.createLinearGradient(wx(7), 0, wx(10), 0); gr.addColorStop(0, 'rgba(127,196,143,0.15)'); gr.addColorStop(1, C.green);
        const L1 = (x1 - wx(7)) * pw; c.save(); c.globalAlpha = aT; c.fillStyle = gr; E.rr(c, wx(7), y - 130, L1, 30, 6); c.fill(); c.restore(); }
      g.text('placenta neemt het over', wx(7), y - 142, { size: 32, w: 600, color: C.green, alpha: aT * pw });
      g.annot(wx(7), wx(10), y + 70, 'geleidelijk, rond week 7–10 van de zwangerschap', { alpha: aT * E.vis(t, T.nodig - 1, null), color: C.green, maxW: 700 });
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H7 Dichtbij, maar gescheiden — placenta als doorsnede (Schema): vlokken, holtes met moederbloed, de dunne laag, wat erdoor gaat ========== */
OSC['7'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { zuurstof: W(1, 'zuurstof'), kwijt: W(2, 'kwijt'), placenta: W(3, 'placenta'), vlokken: W(4, 'vlokken'), holtes: W(5, 'holtes'), mengt: W(6, 'mengt'), laag: W(7, 'laag'), diffunderen: W(8, 'diffunderen'), glucose: W(9, 'Glucose'), amino: W(10, 'Aminozuren'),
    antistoffen: W(11, 'antistoffen'), voorraad: W(12, 'voorraad'), alles: W(13, 'alles'), alcohol: W(14, 'alcohol'), makkelijk: W(15, 'makkelijk'), virussen: W(16, 'virussen'), reden: W(17, 'reden'), vreemd: W(18, 'vreemd'), afweercellen: W(19, 'afweercellen'), end: TL.E(19) };
  TL.cue('action', 'doorsnede placenta: vlokken in holtes met moederbloed', T.placenta, T.mengt, { anchor: 'r3 placenta' });
  TL.cue('action', 'dunne laag cellen ertussen (goud)', T.laag, T.diffunderen + 3, { anchor: 'r7 laag' });
  TL.cue('action', 'stoffen: O2/CO2 diffusie, glucose via transporteiwit, aminozuren actief, antistoffen', T.diffunderen, T.alles, { anchor: 'r8 diffunderen' });
  TL.cue('action', 'alcohol en nicotine gaan er net zo makkelijk door; virussen', T.alcohol, T.reden, { anchor: 'r14 alcohol' });
  TL.cue('action', 'afweercellen van de moeder blijven buiten', T.afweercellen, T.end + 1, { anchor: 'r19 afweercellen' });
  const LX = 960;   // de laag loopt verticaal: links moederbloed, rechts kindvlok
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 7, 11, 'Hoe krijgt het kind zuurstof van de moeder zonder dat hun bloed mengt?');
    if (aScene <= 0.01) return; const c = g.ctx; const a = aScene;
    g.bg('schema', a);
    // deel A: overzicht (baarmoederwand met placenta) tot 'laag', daarna inzoomen op één vlok (Schema blijft Schema: knip naar grotere doorsnede)
    const zoom = E.ep(t, T.mengt - 0.3, 1.0);
    const aOv = a * (1 - zoom);
    if (aOv > 0.01) {
      // v2.5 (prompt v8, C9): placenta in doorsnede (lib_bio): navelstreng naar het kind, vlokbomen met haarvaatjes van het kind
      // die in meren van moederbloed hangen; spiraalslagaders uit de baarmoederwand spuiten het moederbloed erin
      const FK = castFoetus(c, 960, 200, 0.5, { alpha: 0, rot: 0.2 });
      c.save(); c.globalAlpha = aOv; const PL = placentaDoorsnede(c, 960, 590, 1300, 470, { t, vlokken: E.vis(t, T.vlokken - 0.6, null, 1.2), moederbloed: E.vis(t, T.holtes - 0.4, null, 1.2), navel: 1, kind: [FK.navel.x, FK.navel.y], kleurO2: false }); c.restore();
      castFoetus(c, 960, 200, 0.5, { alpha: aOv, rot: 0.2 });
      g.text('kind', 1040, 120, { size: 36, w: 600, alpha: aOv, halo: 7 });
      const aV = aOv * E.vis(t, T.vlokken - 0.3, null);
      g.label('vlokken', null, null, null, 1640, 430, { alpha: aV, noline: true }); ['TROFOBLAST ·', 'BLOEDVAATJES', 'VAN HET KIND'].forEach((r, k) => g.text(r, 1640, 466 + k * 30, { size: 26, f: 'mono', color: C.grain, alpha: aV, ls: 1.5, layer: 'meta', halo: 6 }));
      g.para('holtes met bloed van de moeder', 1640, 610, 260, 38, { size: 32, w: 600, color: C.coralL, alpha: aOv * E.vis(t, T.holtes, null) });
      g.text('BAARMOEDERWAND', 1640, 800, { size: 26, f: 'mono', color: C.grain, alpha: aOv, layer: 'meta', ls: 1.5 });
      g.text('zuurstof, voedingsstoffen', 1150, 230, { size: 32, w: 600, color: C.teal, alpha: aOv * E.vis(t, T.zuurstof, null) }); g.text('CO₂, afvalstoffen', 1150, 275, { size: 32, w: 600, color: C.ochre, alpha: aOv * E.vis(t, T.kwijt, null) });
      g.arrow(1110, 330, 1080, 250, { color: C.teal, alpha: aOv * E.vis(t, T.zuurstof, null), lw: 2 }); g.arrow(1120, 260, 1150, 330, { color: C.ochre, alpha: aOv * E.vis(t, T.kwijt, null), lw: 2 });
      g.text('PLACENTA · DOORSNEDE · NIET OP SCHAAL', 60, 912, { size: 28, f: 'mono', color: C.grain, alpha: aOv, ls: 2, layer: 'meta' });
    }
    // deel B: één vlok groot: links moederbloed, dunne laag (goud), rechts bloedvat van het kind
    const aZ = a * zoom;
    if (aZ > 0.01) {
      // v2.5 (prompt v8, C9): één vlok vergroot (lib_bio): links moederbloed, de dunne laag (syncytiotrofoblast + haarvatwand), rechts een haarvat van het kind
      const aL = aZ * E.vis(t, T.laag - 0.3, null);
      c.save(); c.globalAlpha = aZ; const VK = vlokVergroot(c, 1350, 520, 1100, 636, { t, laag: aL }); c.restore();
      const bX = VK.barriereX, kX = VK.kindX, mX = Math.max(860, VK.moederX);
      g.text('BLOED VAN DE MOEDER', 820, 84, { size: 28, f: 'mono', color: C.coralL, alpha: aZ, ls: 3, layer: 'meta' });
      g.text('BLOED VAN HET KIND', kX(520) + 60, 84, { size: 28, f: 'mono', color: C.coralL, align: 'left', alpha: aZ, ls: 3, layer: 'meta' });
      g.label('dunne laag cellen', 'ERTUSSEN · BLOED MENGT NIET', null, null, 1180, 900, { alpha: aL, color: C.gold, noline: true });
      // stoffen die oversteken (deeltjes bewegen van links naar rechts door de laag; moleculen als kleine vormen in hun betekeniskleur)
      const cross = (t0, col, y, dir, n, o = {}) => { const aa = aZ * E.vis(t, t0, null); for (let i = 0; i < n; i++) { const p = ((t - t0) * 0.25 + i / n) % 1; const x = dir > 0 ? E.lerp(mX, kX(y), p) : E.lerp(kX(y), mX, p); E.hormone(g, x, y + Math.sin(p * 9 + i) * 8, col, { alpha: aa, r: o.r || 7, kind: o.kind || 'plain' }); } return aa; };
      const aO2 = cross(T.diffunderen, C.teal, 300, 1, 5); cross(T.diffunderen, C.ochre, 340, -1, 5);
      g.label('zuurstof → · ← CO₂', 'DIFFUSIE, VAN HOOG NAAR LAAG', 700, 320, 60, 300, { alpha: aO2, color: C.teal, noline: true });
      const aG = cross(T.glucose, C.ochre, 440, 1, 4, { r: 9 }); E.receptor(g, bX(440), 440, C.ochre, { alpha: aG, rot: -Math.PI / 2, s: 0.7 });
      g.label('glucose', 'MET TRANSPORTEIWIT', 700, 440, 60, 440, { alpha: aG, color: C.ochre, noline: true });
      const aAm = cross(T.amino, C.ochreL, 540, 1, 4, { r: 6 }); g.label('aminozuren', 'ACTIEF OPGENOMEN (KOST ENERGIE)', 700, 540, 60, 560, { alpha: aAm, color: C.ochreL, noline: true });
      // antistoffen: Y-vormen in teal, actief doorgegeven
      const aAb = aZ * E.vis(t, T.antistoffen, null); c.save(); c.globalAlpha = aAb; c.strokeStyle = C.teal; c.lineWidth = 3; for (let i = 0; i < 4; i++) { const p = ((t - T.antistoffen) * 0.2 + i / 4) % 1; const x = E.lerp(mX, kX(640), p), y = 640; c.beginPath(); c.moveTo(x, y + 12); c.lineTo(x, y); c.moveTo(x - 8, y - 10); c.lineTo(x, y); c.lineTo(x + 8, y - 10); c.stroke(); } c.restore();
      g.label('antistoffen van de moeder', 'VOORRAAD AFWEER VOOR DE EERSTE MAANDEN', 700, 640, 60, 680, { alpha: aAb, color: C.teal, noline: true });
      // alcohol, nicotine (koraal: let op), virussen
      const aAl = cross(T.alcohol, C.coral, 720, 1, 5, { kind: 'steroid', r: 7 }); g.label('alcohol, nicotine', 'KLEIN EN ONGELADEN: GAAN ER ZO DOOR', 700, 740, 60, 800, { alpha: aAl, color: C.coral, noline: true });
      const aVi = aZ * E.vis(t, T.virussen, null); for (let i = 0; i < 2; i++) { const p = ((t - T.virussen) * 0.15 + i / 2) % 1; const x = E.lerp(mX, kX(780), p); c.save(); c.globalAlpha = aVi; hivVirus(c, x, 780, 12, { t }); c.restore(); }
      g.text('sommige virussen', 330, 800, { size: 32, w: 600, color: C.coral, alpha: aVi });
      // afweercellen van de moeder: grote cellen die tegen de laag stuiten
      const aIm = aZ * E.vis(t, T.reden, null); for (let i = 0; i < 3; i++) { const p = E.c01(((t - T.reden) * 0.12 + i / 3) % 1); const yy = 260 + i * 240; const x = E.lerp(mX, bX(yy) - 60, Math.min(p, 0.9)); E.cell(g, x, yy, 40, { alpha: aIm, nr: 16, fill: C.fill2, edge: C.fillL, texture: false }); }
      g.annot(bX(520) - 40, bX(520) + 40, 196, 'afweercellen van de moeder komen er bijna niet door', { alpha: aZ * E.vis(t, T.afweercellen, null), color: C.green, maxW: 900, h: 8, above: true });
      g.text('PLACENTA · ÉÉN VLOK VERGROOT · NIET OP SCHAAL', 60, 912, { size: 28, f: 'mono', color: C.grain, alpha: aZ, ls: 2, layer: 'meta' });
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* scenes_c.js — hoofdstukken 8–11: geslachtsontwikkeling, geboorte, ingrijpen, hulp bij zwangerschap; eindkaart */

/* ========== H8 Man of vrouw? — Schema: aanleg met twee buisstelsels; SRY, AMH, testosteron; vergelijking op één basislijn ========== */
OSC['8'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { zygote: W(1, 'zygote'), xxxy: W(2, 'XX'), zaadcel: W(3, 'zaadcel'), zes: W(4, 'zes'), aanleg: W(5, 'aanleg'), buisjes: W(5, 'buisjes'), wolff: W(6, 'Wolff'), muller: W(6, 'Müller'), sry: W(7, 'SRY-gen'), eiwit: W(8, 'eiwit'), zaadbal: W(8, 'zaadbal'),
    sertoli: W(9, 'Sertolicellen'), amh: W(10, 'anti-Müllerhormoon'), verdwijnen: W(10, 'verdwijnen'), leydig: W(11, 'Leydigcellen'), testo: W(11, 'testosteron'), stand: W(12, 'stand'), bijbal: W(12, 'bijbal'), zaadleider: W(13, 'zaadleider'),
    dht: W(14, 'dihydrotestosteron'), uitwendig: W(15, 'uitwendige'), zonder: W(16, 'Zonder'), eierstok: W(16, 'eierstok'), geenAmh: W(17, 'geen'), eileiders: W(17, 'eileiders'), baarmoeder: W(18, 'baarmoeder'), geenT: W(19, 'geen'), verschil: W(20, 'verschil'), twee: W(21, 'twee'), ontbreken: W(22, 'ontbreken'), end: TL.E(22) };
  TL.cue('term', 'XX / XY bij de bevruchting', T.xxxy, T.zes, { anchor: 'r2 XX' });
  TL.cue('term', 'buizen van Wolff en Müller', T.wolff, T.end, { anchor: 'r6 Wolff' });
  TL.cue('action', 'SRY → zaadbal; AMH → Müller weg; testosteron → Wolff blijft; DHT → uitwendig', T.sry, T.zonder, { anchor: 'r7 SRY-gen' });
  TL.cue('action', 'zonder SRY: eierstok, Müller blijft, Wolff weg', T.zonder, T.verschil, { anchor: 'r16 Zonder' });
  TL.cue('term', 'twee actieve signalen vs ontbreken (haak)', T.twee, T.end + 1, { anchor: 'r21 twee' });
  /* één aanleg-schema: gonade bovenaan, Wolff (links) en Müller (rechts) als buizen naar beneden, uitwendig onderaan */
  function anlage(g, cx, cy, s, o) {
    const c = g.ctx; const a = o.alpha; if (a <= 0.01) return;
    const gon = o.gon || 'aanleg';   // 'aanleg' | 'zaadbal' | 'eierstok'
    // gonade
    g.disc(cx, cy, 48 * s, { alpha: a, fill: gon === 'zaadbal' ? C.fill2 : gon === 'eierstok' ? C.fill2 : C.fill, stroke: gon === 'aanleg' ? undefined : C.gold, ry: 36 * s });
    // buizen: Wolff (links van het midden) en Müller (rechts), beide van de gonade naar beneden; alfa per buis
    const tube = (dx, aT, col) => { if (aT <= 0.01) return; c.save(); c.globalAlpha = a * aT; c.strokeStyle = col || C.line; c.lineWidth = 10 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx + dx * s, cy + 40 * s); c.quadraticCurveTo(cx + dx * 1.6 * s, cy + 160 * s, cx + dx * 0.5 * s, cy + 300 * s); c.stroke(); c.restore(); };
    tube(-34, o.wolff == null ? 1 : o.wolff, o.wolffCol); tube(34, o.muller == null ? 1 : o.muller, o.mullerCol);
    // uitwendig: neutraal bultje onderaan
    g.disc(cx, cy + 330 * s, 40 * s, { alpha: a * (o.ext == null ? 1 : o.ext), fill: C.fill, ry: 22 * s, stroke: o.extCol });
  }
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 8, 11, 'Hoe wordt uit één en dezelfde aanleg een jongen of een meisje?');
    if (aScene <= 0.01) return; const c = g.ctx; const a = aScene;
    g.bg('schema', a);
    // deel A: zygote met XX/XY (tot 'zes')
    const aA = a * E.vis(t, TL.card.t1 - 0.5, T.zes - 0.3, 0.4, 0.5);
    if (aA > 0.01) {
      g.zoomCircle(960, 500, 230, 960, 500, 0, 'micro', (gg) => { E.cell(gg, 960, 500, 120, { alpha: aA, nucleus: false }); E.nucleus(gg, 960, 500, 60, { alpha: aA }); }, 'ZYGOTE', aA);
      const aX = aA * E.vis(t, T.xxxy, null);
      g.text('XX', 560, 520, { size: 96, f: 'serif', color: C.purpleL, align: 'center', alpha: aX }); g.text('of', 760, 520, { size: 48, color: C.ink2, align: 'center', alpha: aX }); g.text('XY', 1360, 520, { size: 96, f: 'serif', color: C.purpleL, align: 'center', alpha: aX });
      g.text('lag al vast bij de bevruchting: X- of Y-zaadcel', 960, 820, { size: 36, w: 600, align: 'center', color: C.ink2, alpha: aA * E.vis(t, T.zaadcel, null) });
    }
    // deel B: aanleg midden; vanaf 'Zonder' splitst het in twee kolommen (XY links, XX rechts) op één basislijn
    const aB = a * E.vis(t, T.zes - 0.3, null, 0.5);
    if (aB > 0.01) {
      // v2.5 (prompt v8, C9 + C8): de echte aanleg (lib_bio aanlegGeslacht): geslachtsklieren, buizen van Wolff (paars) en Müller (roze)
      // naar de urogenitale opening; bij XY vervormt hij vloeiend tot zaadbal, bijbal, zaadleider en zaadblaasje, bij XX tot eierstok, eileider en baarmoeder
      const split = E.ep(t, T.zonder - 0.4, 1.2);
      const xM = E.lerp(820, 700, split), xF = 1210;
      const sM = E.lerp(1.4, 1.0, split), y0 = 200; const cyOf = (sc) => y0 - 40 + 220 * sc;
      const aMHd = E.ep(t, T.verdwijnen, 1.5), tW = E.ep(t, T.stand, 1.0);
      const man = 0.35 * E.ep(t, T.zaadbal, 1.4) + 0.35 * aMHd + 0.3 * tW;
      const AM = (() => { c.save(); c.globalAlpha = aB; const r = aanlegGeslacht(c, xM, cyOf(sM), sM, { t, man, hlGonade: E.vis(t, T.aanleg, T.wolff), hlWolff: E.vis(t, T.wolff, T.muller) + (t >= T.stand ? 0.6 * E.vis(t, T.stand, T.zonder) : 0), hlMuller: E.vis(t, T.muller, T.sry) }); c.restore(); return r; })();
      // labels bij de aanleg (vóór de splitsing: alleen deze kolom)
      const aL = aB * (1 - split); const nl = { noline: true };
      g.label('aanleg geslachtsklier', 'TOT WEEK 6 HETZELFDE', null, null, xM + 185 * sM, AM.gonade[1] - 10, Object.assign({ alpha: aL * E.vis(t, T.aanleg, T.sry) }, nl));
      g.label('buis van Wolff', '', null, null, xM - 185 * sM, AM.wolff[1], Object.assign({ alpha: aL * E.vis(t, T.wolff, T.sertoli), color: C.purpleL, align: 'right' }, nl));
      g.label('buis van Müller', '', null, null, xM + 185 * sM, AM.muller[1] + 40, Object.assign({ alpha: aL * E.vis(t, T.muller, T.sertoli), color: '#E8A2A6' }, nl));
      // SRY op het Y-chromosoom → zaadbal
      const aS = aB * E.vis(t, T.sry, T.zonder - 0.5) * (1 - split);
      c.save(); c.globalAlpha = aS; c.strokeStyle = C.purpleL; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(1500, 180); c.lineTo(1500, 320); c.moveTo(1470, 180); c.lineTo(1500, 250); c.stroke(); c.fillStyle = C.gold; c.fillRect(1492, 270, 16, 22); c.restore();
      g.label('SRY-gen', 'OP HET Y-CHROMOSOOM', 1500, 281, 1540, 260, { alpha: aS, color: C.gold });
      g.arrow(1470, 300, AM.gonade[0] + 30, AM.gonade[1] - 20, { color: C.gold, alpha: aS * E.vis(t, T.eiwit, null), lw: 2, bend: 0.12 });
      g.text('eiwit → aanleg wordt zaadbal', 1130, 130, { size: 32, w: 600, color: C.gold, alpha: aS * E.vis(t, T.eiwit, null), align: 'center' });
      // Sertoli → AMH → Müller verdwijnt; Leydig → testosteron → Wolff blijft (bijbal, zaadleider, zaadblaasjes); DHT → uitwendig
      const aAm = aB * E.vis(t, T.sertoli, null) * (1 - split), aTe = aB * E.vis(t, T.leydig, null) * (1 - split);
      for (let i = 0; i < 4; i++) { const p = (t * 0.4 + i * 0.25) % 1; E.hormone(g, E.lerp(AM.gonade[0], AM.muller[0], p), E.lerp(AM.gonade[1], AM.muller[1], p), HC.AMH, { alpha: aAm * (1 - aMHd * 0.5), r: 8, kind: 'plain' }); }
      g.label('Sertolicellen → anti-Müllerhormoon', 'BUIZEN VAN MÜLLER VERDWIJNEN', null, null, 1130, 560, Object.assign({ alpha: aAm, color: HC.AMH }, nl));
      for (let i = 0; i < 4; i++) { const p = (t * 0.4 + i * 0.25) % 1; E.hormone(g, E.lerp(AM.gonade[0], AM.wolff[0], p), E.lerp(AM.gonade[1], AM.wolff[1], p), HC.T, { alpha: aTe, r: 9, kind: 'steroid' }); }
      g.label('Leydigcellen → testosteron', 'BUIZEN VAN WOLFF BLIJVEN', null, null, 120, 600, Object.assign({ alpha: aTe, color: HC.T }, nl));
      g.lines(['bijbal', 'zaadleider', 'zaadblaasjes'], 120, 700, 40, { size: 36, w: 600, color: HC.T, alpha: aB * tW * (1 - split) });
      g.label('dihydrotestosteron (DHT)', 'PENIS EN BALZAK', null, null, 1130, 760, Object.assign({ alpha: aB * E.vis(t, T.dht, null) * (1 - split), color: HC.DHT }, nl));
      // vrouwelijke kolom (vanaf 'Zonder'): geen SRY → eierstok; geen AMH → Müller blijft (eileiders, baarmoeder, vagina); geen T → Wolff verdwijnt
      if (split > 0.01) {
        const aF = aB * split; const wolffGone = E.ep(t, T.geenT, 1.4);
        c.save(); c.globalAlpha = aF; aanlegGeslacht(c, xF, cyOf(1), 1, { t, vrouw: 0.4 * E.ep(t, T.eierstok, 1.4) + 0.3 * E.ep(t, T.eileiders, 1.4) + 0.3 * wolffGone, hlMuller: E.vis(t, T.eileiders, T.verschil) }); c.restore();
        g.text('XY', xM, 120, { size: 64, f: 'serif', color: C.purpleL, align: 'center', alpha: aF }); g.text('XX', xF, 120, { size: 64, f: 'serif', color: C.purpleL, align: 'center', alpha: aF });
        g.lines(['SRY → zaadbal', 'AMH → Müller weg', 'testosteron → Wolff blijft', 'DHT → penis, balzak'], 100, 320, 46, { size: 32, w: 600, color: HC.T, alpha: aF });
        g.lines(['geen SRY → eierstok', 'geen AMH → Müller blijft:', 'eileiders, baarmoeder, vagina', 'geen testosteron → Wolff weg'], 1440, 320, 46, { size: 32, w: 600, color: HC.AMH, alpha: aF * E.vis(t, T.eierstok, null) });
        // basislijn
        c.save(); c.globalAlpha = aF; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(160, 700); c.lineTo(1760, 700); c.stroke(); c.restore();
        g.annot(160, 900, 720, 'twee actieve signalen nodig', { alpha: aF * E.vis(t, T.twee, null), color: C.green, maxW: 700 });
        g.annot(1020, 1760, 720, 'het ontbreken van die signalen is genoeg', { alpha: aF * E.vis(t, T.ontbreken, null), color: C.green, maxW: 700 });
      }
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H9 Een lus die zichzelf versterkt — Schema: baarmoeder met kind, rekzintuigen, hypothalamus/hypofyse, oxytocine; lusdiagram met meter ========== */
OSC['9'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { negen: W(1, 'negen'), signaal: W(2, 'signaal'), hoofd: W(3, 'hoofd'), drukt: W(3, 'drukt'), rek: W(4, 'Rekzintuigen'), hypo: W(4, 'hypothalamus'), achterkwab: W(5, 'achterkwab'), oxy: W(5, 'oxytocine'), samentrekken: W(6, 'samentrekken'), wee: W(6, 'wee'),
    duwt: W(7, 'duwt'), meer: W(8, 'Meer'), sterkere: W(8, 'sterkere'), positief: W(9, 'positieve'), oploopt: W(10, 'op'), doorbreekt: W(10, 'doorbreekt'), geboorte: W(11, 'geboorte'), eruit: W(12, 'eruit'), stopt: W(12, 'stopt'), end: TL.E(12) };
  TL.cue('action', 'hoofd drukt op baarmoederhals; rekzintuigen → hypothalamus → oxytocine → wee', T.hoofd, T.positief, { anchor: 'r3 hoofd' });
  TL.cue('term', 'positieve terugkoppeling (lus met +)', T.positief, T.geboorte, { anchor: 'r9 positieve' });
  TL.cue('action', 'geboorte: rek valt weg, signaal stopt (meter zakt)', T.geboorte, T.end + 1, { anchor: 'r11 geboorte' });
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 9, 11, 'Waarom worden weeën vanzelf steeds sterker, en wat zet de lus stil?');
    if (aScene <= 0.01) return; const c = g.ctx; const a = aScene;
    g.bg('schema', a);
    // model: lus loopt op vanaf 'drukt' tot 'geboorte', dan terug naar nul
    const tt = t - T.drukt; let stretch = 0, oxt = 0; const dt = 0.02;
    for (let s = 0; s < Math.max(0, tt); s += dt) { const born = (T.drukt + s) >= T.eruit; const push = born ? 0 : 0.35 + 1.1 * oxt; stretch += (push - stretch) * dt * 1.2; oxt += ((born ? 0 : 0.9 * stretch) - oxt) * dt * 1.0; }
    const level = E.c01(oxt / 1.6);
    // baarmoeder (doorsnede) links met kind (hoofd naar beneden); weeën: wand trekt samen op het ritme van de meter
    const bx = 640, by = 480, sq = 1 - 0.06 * level * (0.5 + 0.5 * Math.sin(t * 2.2));
    const born = E.ep(t, T.eruit, 1.6);
    c.save(); c.globalAlpha = a; c.fillStyle = C.fill; c.strokeStyle = C.fillL; c.lineWidth = 1.4; c.beginPath(); c.ellipse(bx, by, 250 * sq, 300, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = C.schema; c.beginPath(); c.ellipse(bx, by, 200 * sq, 250, 0, 0, Math.PI * 2); c.fill();
    // baarmoederhals (onder) met rekzintuigen
    c.fillStyle = C.fill; c.beginPath(); c.moveTo(bx - 70, by + 230); c.lineTo(bx - 50 - 30 * born, by + 400); c.lineTo(bx + 50 + 30 * born, by + 400); c.lineTo(bx + 70, by + 230); c.closePath(); c.fill(); c.stroke();
    c.restore();
    // kind: hoofd naar beneden, drukt op de hals; bij de geboorte schuift het naar beneden/buiten
    const ky = by + 30 + 30 * level + 300 * born;   // kind met het hoofd naar beneden (figuur 180° gedraaid)
    // v2.2: vruchtwater, placenta en navelstreng; het kind opgekruld met het hoofd naar beneden (castboekstijl); na de geboorte de baby uit het castboek
    const aKind = a * (1 - E.ep(t, T.eruit + 0.9, 0.7));
    c.save(); c.globalAlpha = a * (1 - born); c.fillStyle = 'rgba(94,143,168,0.28)'; c.beginPath(); c.ellipse(bx, by, 200 * sq, 250, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#8C3E4A'; c.beginPath(); c.ellipse(bx - 118 * sq, by - 168, 66, 42, 0.75, 0, Math.PI * 2); c.fill(); c.fillStyle = '#A85060'; c.beginPath(); c.ellipse(bx - 110 * sq, by - 160, 44, 26, 0.75, 0, Math.PI * 2); c.fill(); c.restore();
    const FK = castFoetus(c, bx + 6, ky - 95, 0.92, { alpha: 0, rot: Math.PI });
    bioNavelstreng(c, bx - 100 * sq, by - 150, FK.navel.x, FK.navel.y, t, aKind * (1 - born), 12);   // v3.0: kleur volgt zuurstof (slagaders blauw, ader rood)
    castFoetus(c, bx + 6, ky - 95, 0.92, { alpha: aKind, rot: Math.PI });
    g.screen(); castFig(g, 'baby', bx + 330, 900, 230, { alpha: a * E.vis(t, T.eruit + 1.0, null, 0.6), uit: t > T.stopt + 1 ? 'slaapt' : 'blij', t });
    g.label('hoofd drukt op de baarmoederhals', 'REKZINTUIGEN MELDEN DE REK', bx - 66, by + 300, 60, 700, { alpha: a * E.vis(t, T.hoofd, T.eruit), color: C.teal });
    // zenuwimpuls (teal stipjes) van de hals naar de hypothalamus (rechtsboven), oxytocine (teal) terug naar de baarmoederwand via het bloed
    const Y = L.hpg(g, { x: 1250, y0: 120, alpha: a * E.vis(t, T.rek, null), gon: 0, hyp: 1, pit: 1, hypGloed: E.vis(t, T.achterkwab, null), t });
    c.save(); c.globalAlpha = a * E.vis(t, T.rek, null); c.strokeStyle = C.teal; c.lineWidth = 1.5; c.setLineDash([4, 8]); c.beginPath(); c.moveTo(bx + 70, by + 300); c.quadraticCurveTo(1000, 760, Y.hthP[0] - 30, Y.hthP[1] + 6); c.stroke(); c.restore();
    const aImp = a * E.vis(t, T.rek, T.eruit); for (let i = 0; i < 4; i++) { const p = (t * 0.6 + i * 0.25) % 1; const x = (1 - p) * (1 - p) * (bx + 70) + 2 * (1 - p) * p * 1000 + p * p * (Y.hthP[0] - 30), y = (1 - p) * (1 - p) * (by + 300) + 2 * (1 - p) * p * 760 + p * p * (Y.hthP[1] + 6); E.hormone(g, x, y, C.teal, { alpha: aImp * level, r: 5, kind: 'plain' }); }
    g.text('impulsen', 1090, 600, { size: 32, w: 600, color: C.teal, alpha: a * E.vis(t, T.rek, null) });
    g.label('achterkwab hypofyse', 'GEEFT OXYTOCINE AF', 1415, Y.pit + 48, 1440, 360, { alpha: a * E.vis(t, T.achterkwab, null), color: HC.OXT });
    // oxytocine naar de baarmoederwand (bloed, koraal) en de meter
    const path = [[Y.hypP[0] + 6, Y.hypP[1] + 14], [1262, 420], [1250, 620], [bx + 300, 620], [bx + 240, by + 100]];
    c.save(); c.globalAlpha = a * E.vis(t, T.oxy, null); bloedvat(c, [[Y.hypP[0] + 6, Y.hypP[1] + 14], [1262, 420], [1250, 620], [bx + 300, 620], [bx + 240, by + 100]], 13, t, { n: 16, cel: 7, speed: 0.08 }); c.restore();
    L.stream(g, path, t, 0.3, Math.round(2 + 6 * level), HC.OXT, { alpha: a * E.vis(t, T.oxy, T.eruit), r: 8 });
    g.text('oxytocine', 1270, 560, { size: 36, w: 600, color: HC.OXT, alpha: a * E.vis(t, T.oxy, null) });
    L.gauge(g, 1790, 160, 70, 300, level, HC.OXT, 'oxytocine', a * E.vis(t, T.oxy, null));
    g.text('wee', bx + 300, by + 60, { size: 36, w: 600, color: C.coral, alpha: a * E.vis(t, T.samentrekken, null) * (0.4 + 0.6 * level) });
    // lus: + tekens
    const aP = a * E.vis(t, T.meer, T.eruit);
    g.text('+', 1060, 470, { size: 48, w: 700, color: HC.OXT, alpha: aP, align: 'center' }); g.text('+', 900, 680, { size: 48, w: 700, color: HC.OXT, alpha: aP, align: 'center' });
    g.annot(1000, 1700, 680, 'positieve terugkoppeling: meer rek → meer oxytocine → sterkere weeën → meer rek', { alpha: a * E.vis(t, T.positief, T.geboorte), color: C.green, maxW: 700 });
    g.annot(1000, 1700, 680, 'de geboorte doorbreekt de lus: de rek valt weg, het signaal stopt', { alpha: a * E.vis(t, T.geboorte, null), color: C.green, maxW: 700 });
    g.meta('MODEL · WEEËN VERSNELD', a * E.vis(t, T.drukt, null));
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H10 Ingrijpen in de signalen — Schema: pil (model), spiraaltjes, morning-afterpil, abortuspil, condoom; hiv in zoomcirkel (Micro); antibiotica ========== */
OSC['10'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { begrijpt: W(1, 'begrijpt'), anticonceptie: W(2, 'anticonceptie'), pil: W(3, 'combinatiepil'), spiegels: W(4, 'spiegels'), fsh: W(5, 'FSH'), piek: W(6, 'LH-piek'), eisprong: W(6, 'eisprong'), slijm: W(7, 'slijm'), taai: W(7, 'taai'), stopweek: W(9, 'stopweek'), onttrekking: W(10, 'onttrekkingsbloeding'),
    hspiraal: W(11, 'hormoonspiraaltje'), dun: W(12, 'dun'), kspiraal: W(13, 'koperspiraaltje'), koper: W(14, 'koperionen'), map: W(15, 'morning-afterpil'), uit: W(15, 'uit'), voordat: W(16, 'voordat'), abortus: W(17, 'abortuspil'), mife: W(18, 'mifepriston'), afgestoten: W(19, 'afgestoten'),
    soa: W(20, 'soa\'s'), condoom: W(20, 'condoom'), hiv: W(22, 'hiv'), thelper: W(23, 'T-helpercellen'), rna: W(25, 'RNA'), inbouwt: W(26, 'bouwt'), daalt: W(27, 'daalt'), aids: W(28, 'aids'), antibiotica: W(29, 'Antibiotica'), celwand: W(31, 'celwand'), virus: W(32, 'virus'), remmers: W(33, 'virusremmers'), end: TL.E(34) };
  TL.cue('action', 'pilmodel: spiegels hoog, FSH laag, geen piek; stopweek', T.pil, T.hspiraal, { anchor: 'r3 combinatiepil' });
  TL.cue('action', 'spiraaltjes in de baarmoeder', T.hspiraal, T.map, { anchor: 'r11 hormoonspiraaltje' });
  TL.cue('action', 'morning-afterpil op de tijdlijn van de LH-piek', T.map, T.abortus, { anchor: 'r15 morning-afterpil' });
  TL.cue('action', 'mifepriston blokkeert de progesteronreceptor', T.abortus, T.soa, { anchor: 'r17 abortuspil' });
  TL.cue('look-change', 'zoomcirkel: hiv in een T-helpercel (Micro)', T.hiv, T.antibiotica, { anchor: 'r22 hiv' });
  TL.cue('action', 'antibiotica: bacterie heeft celwand en eigen ribosomen; virus niet', T.antibiotica, T.end + 1, { anchor: 'r29 Antibiotica' });
  const PIL = L.cycle({ days: 35, exo: { E2: 0.9, P4: 0.8 }, exoFrom: 0, exoTo: 21, exoFrom2: 28 });   // 21 dagen pil, stopweek, dan de volgende strip
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 10, 11, 'Als je de signalen kent, kun je ze nadoen, blokkeren of uitstellen. Hoe?');
    if (aScene <= 0.01) return; const c = g.ctx; const a = aScene;
    g.bg('schema', a);
    // ---- deel A: de pil als model (tot 'hormoonspiraaltje') ----
    const aA = a * E.vis(t, TL.card.t1 - 0.5, T.hspiraal - 0.3, 0.4, 0.5);
    if (aA > 0.01) {
      const Y = L.hpg(g, { x: 440, y0: 130, alpha: aA, gonName: 'eierstok', fsh: aA * 0.4, lh: aA * 0.4, gnrh: aA * 0.4, t });
      const aP = aA * E.vis(t, T.pil, null);
      // de pil: twee moleculen (oestrogeen paars, progestageen paars-licht) die de spiegel hoog houden → remlijn naar de hypofyse
      g.box(680, 140, 300, 110, { alpha: aP, fill: C.fill2, r: 55 }); E.hormone(g, 740, 195, HC.E2, { alpha: aP, r: 16, kind: 'steroid' }); E.hormone(g, 800, 195, HC.P4, { alpha: aP, r: 16, kind: 'steroid' });
      g.text('combinatiepil', 860, 208, { size: 36, w: 600, alpha: aP }); g.label('oestrogeen + progestageen', 'NAGEMAAKT PROGESTERON', 800, 250, 700, 300, { alpha: aP, color: HC.P4, noline: true });
      g.inhibit(690, 250, Y.hypP[0] + 14, Y.hypP[1] - 18, { color: HC.P4, alpha: aA * E.vis(t, T.spiegels, null), lw: 2.5, bend: 0.1 }); g.text('−', 640, 330, { size: 48, w: 700, color: HC.P4, alpha: aA * E.vis(t, T.spiegels, null) });
      // grafiek: model met de pil, 35 dagen; FSH blijft laag, geen LH-piek; stopweek: bloeding
      const B = { x: 1080, y: 160, w: 760, h: 420 }; const day = E.lerp(0, 35, E.ep(t, T.spiegels, T.onttrekking + 1.5 - T.spiegels));
      L.graphBox(g, B, { alpha: aP, x0: 0, x1: 35, xticks: [[1, '1'], [7, '7'], [14, '14'], [21, '21'], [28, '28']], xlabel: 'DAG' });
      L.legend(g, 1100, B.y - 26, [['FSH', HC.FSH], ['LH', HC.LH, [12, 8]], ['oestr.', HC.E2], ['prog.', HC.P4, [12, 8]]], aP);
      c.save(); c.globalAlpha = aP * 0.22; c.fillStyle = C.coral; for (let i = 0; i < PIL.n; i++) if (PIL.menses[i] && PIL.t[i] <= day && PIL.t[i] > 1) c.fillRect(B.x + PIL.t[i] / 35 * B.w, B.y, B.w / 35 * PIL.dt + 0.5, B.h); c.restore();
      c.save(); c.globalAlpha = aP * 0.5; c.fillStyle = C.fillL; c.fillRect(B.x, B.y + 2, B.w * 21 / 35, 6); c.restore(); g.text('PIL · 21 DAGEN', B.x + 10, B.y + 34, { size: 28, f: 'mono', color: C.grain, alpha: aP, layer: 'meta' }); g.text('STOPWEEK', B.x + B.w * 21 / 35 + 10, B.y + 34, { size: 28, f: 'mono', color: C.coral, alpha: aP * E.vis(t, T.stopweek, null), layer: 'meta' });
      L.curve(g, B, PIL, 'FSH', 0, 35, 3.4, day, HC.FSH, { alpha: aP }); L.curve(g, B, PIL, 'LH', 0, 35, 3.4, day, HC.LH, { alpha: aP, dash: [12, 8] }); L.curve(g, B, PIL, 'E2', 0, 35, 3.4, day, HC.E2, { alpha: aP }); L.curve(g, B, PIL, 'P4', 0, 35, 3.4, day, HC.P4, { alpha: aP, dash: [12, 8] });
      g.annot(B.x, B.x + B.w * 0.55, B.y + B.h + 70, 'te weinig FSH voor een follikel: geen LH-piek, geen eisprong', { alpha: aP * E.vis(t, T.fsh, T.stopweek), color: C.green, maxW: 560 });
      g.annot(B.x + B.w * 0.45, B.x + B.w, B.y + B.h + 70, 'stopweek: onttrekkingsbloeding, geen echte menstruatie', { alpha: aP * E.vis(t, T.stopweek, null), color: C.coral, maxW: 520 });
      // taai slijm in de baarmoederhals (klein schema links-onder)
      const aS = aA * E.vis(t, T.slijm, T.stopweek); g.box(560, 740, 140, 130, { alpha: aS, fill: C.fill, r: 30 }); c.save(); c.globalAlpha = aS; c.fillStyle = C.ochreL; for (let i = 0; i < 20; i++) { const h1 = E.hash(i * 2 + 1), h2 = E.hash(i * 2 + 2); c.beginPath(); c.arc(580 + h1 * 100, 755 + h2 * 100, 5, 0, 7); c.fill(); } c.restore();
      for (let i = 0; i < 3; i++) E.sperm(g, 500 + 10 * Math.sin(t * 5 + i), 900 - i * 35, -Math.PI / 2 + 0.2 * Math.sin(t * 4 + i), 1.6, { alpha: aS, wig: t * 8 + i });
      g.label('taai slijm in de baarmoederhals', 'ZAADCELLEN KOMEN ER MOEILIJK DOOR', 700, 800, 740, 800, { alpha: aS, color: C.ochreL });
    }
    // ---- deel B: spiraaltjes, morning-afterpil, abortuspil, condoom (tot 'hiv') ----
    const aB = a * E.vis(t, T.hspiraal - 0.3, T.hiv - 0.3, 0.5, 0.5);
    if (aB > 0.01) {
      // baarmoeder links met spiraaltje
      const U = L.uterus(g, 440, 440, 0.9, { alpha: aB, endo: t >= T.dun ? 0.25 : 0.7 });
      const aH = aB * E.vis(t, T.hspiraal, T.kspiraal), aK = aB * E.vis(t, T.kspiraal, null);
      const iud = (col, aa) => { if (aa <= 0.01) return; c.save(); c.globalAlpha = aa; c.strokeStyle = col; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(U.cavity[0], U.cavity[1] - 60); c.lineTo(U.cavity[0], U.cavity[1] + 70); c.moveTo(U.cavity[0] - 40, U.cavity[1] - 50); c.lineTo(U.cavity[0] + 40, U.cavity[1] - 50); c.stroke(); c.restore(); };
      iud(HC.P4, aH); iud(C.ochre, aK);
      for (let i = 0; i < 5; i++) { const p = (t * 0.35 + i * 0.2) % 1; E.hormone(g, U.cavity[0] + (E.hash(i) - 0.5) * 120 * p, U.cavity[1] + (E.hash(i * 3) - 0.5) * 160 * p, t >= T.kspiraal ? C.ochre : HC.P4, { alpha: (t >= T.kspiraal ? aK : aH) * (1 - p), r: 6, kind: t >= T.kspiraal ? 'plain' : 'steroid' }); }
      g.label('hormoonspiraaltje', 'PROGESTAGEEN, ALLEEN PLAATSELIJK: TAAI SLIJM, DUN SLIJMVLIES', U.cavity[0] + 10, U.cavity[1] - 50, 700, 150, { alpha: aH, color: HC.P4 });
      g.label('koperspiraaltje', 'KOPERIONEN: GIFTIG VOOR ZAADCELLEN, INNESTELING ONWAARSCHIJNLIJK', U.cavity[0] + 10, U.cavity[1] - 50, 700, 150, { alpha: aK * E.vis(t, T.kspiraal, T.map), color: C.ochre });
      // morning-afterpil: tijdlijn met de LH-piek; de pil vóór de piek stelt hem uit
      const aM = aB * E.vis(t, T.map, T.abortus); const Bx = 760, By = 300, Bw = 1000, Bh = 240;
      if (aM > 0.01) {
        L.graphBox(g, { x: Bx, y: By, w: Bw, h: Bh }, { alpha: aM, xlabel: 'DAGEN' });
        const shift = 120 * E.ep(t, T.uit, 1.5);
        c.save(); c.globalAlpha = aM; c.strokeStyle = HC.LH; c.lineWidth = 3; c.setLineDash([12, 8]); c.beginPath(); for (let i = 0; i <= 200; i++) { const x = Bx + i / 200 * Bw; const y = By + Bh - 30 - 180 * Math.exp(-Math.pow((x - (Bx + 420 + shift)) / 28, 2)); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.restore();
        g.text('LH-piek', Bx + 440 + shift, By + 40, { size: 32, w: 600, color: HC.LH, alpha: aM });
        E.hormone(g, Bx + 300, By + Bh - 60, HC.P4, { alpha: aM, r: 16, kind: 'steroid' }); g.label('morning-afterpil', 'VÓÓR DE PIEK: STELT DE PIEK UIT', Bx + 300, By + Bh - 76, Bx + 60, By + Bh - 150, { alpha: aM, color: HC.P4 });
        E.hormone(g, Bx + 620, By + Bh - 60, HC.P4, { alpha: aM * E.vis(t, T.voordat, null), r: 16, kind: 'steroid' }); g.label('te laat', 'NA HET BEGIN VAN DE PIEK: WERKT NIET', Bx + 620, By + Bh - 76, Bx + 420, By + Bh + 90, { alpha: aM * E.vis(t, T.voordat, null), color: C.coral });
      }
      // abortuspil: mifepriston blokkeert de progesteronreceptor
      const aAb = aB * E.vis(t, T.abortus, T.soa);
      if (aAb > 0.01) {
        E.cell(g, 1150, 420, 120, { alpha: aAb, nr: 36, fill: C.fill2, edge: C.fillL }); E.receptor(g, 1060, 380, HC.P4, { alpha: aAb, rot: -1.2, s: 1.3 });
        const blk = E.ep(t, T.mife, 1.2); E.hormone(g, 1040 - 60 * blk + 30, 330 - 40 * blk, '#8FA0B5', { alpha: aAb * E.vis(t, T.mife - 0.3, null), r: 14, kind: 'steroid' });
        E.hormone(g, 980 + 10 * Math.sin(t * 4), 300, HC.P4, { alpha: aAb, r: 14, kind: 'steroid' });
        g.label('mifepriston', 'BLOKKEERT DE PROGESTERONRECEPTOR', 1000, 300, 1300, 250, { alpha: aAb * E.vis(t, T.mife, null), color: C.ink2 });
        g.text('cel van het slijmvlies', 1150, 580, { size: 36, w: 600, align: 'center', alpha: aAb });
        g.annot(1030, 1270, 600, 'alsof het progesteron wegvalt: slijmvlies afgestoten', { alpha: aAb * E.vis(t, T.afgestoten - 1, null), color: C.coral, maxW: 600 });
      }
      // condoom
      const aC = aB * E.vis(t, T.soa, null);
      g.box(1400, 700, 360, 60, { alpha: aC, fill: C.fill2, r: 30 }); g.label('condoom', 'OOK TEGEN SOA\'S', 1580, 700, 1400, 660, { alpha: aC * E.vis(t, T.condoom, null), color: C.green, noline: true });
      g.text("geen van deze middelen beschermt tegen soa's", 1580, 820, { size: 32, w: 600, color: C.coral, align: 'center', alpha: aC * E.vis(t, T.soa, T.condoom + 1.5) });
    }
    // ---- deel C: hiv (zoomcirkel Micro) en antibiotica ----
    const aCp = a * E.vis(t, T.hiv - 0.3, null, 0.5);
    if (aCp > 0.01) {
      const aHiv = aCp * E.vis(t, T.hiv, null);
      const ZX = 560, ZY = 480, ZR = 330;
      const inf = E.ep(t, T.rna, 2.5), integ = E.ep(t, T.inbouwt, 1.5);
      g.zoomCircle(ZX, ZY, ZR, ZX, ZY, 0, 'micro', (gg) => {
        // v2.5 (prompt v8, C9): T-helpercel met grote kern en CD4-receptoren, hiv met envelop-eiwitten (lib_bio); het virus bindt,
        // versmelt met het membraan, RNA wordt DNA en wordt in het DNA van de kern ingebouwd
        const cc = gg.ctx; cc.save(); cc.globalAlpha = aHiv; const TC = tHelperCel(cc, ZX + 60, ZY + 20, 180, { t }); cc.restore();
        const ang = Math.PI + 0.42, rp = TC.receptor(ang), rv = 40; const dir = [Math.cos(ang), Math.sin(ang)];
        const app = E.ep(t, T.thelper - 0.5, 2.0), fus = E.ep(t, T.thelper + 1.6, 1.8);
        const vx = rp[0] + dir[0] * (rv + 4 + 160 * (1 - app)), vy = rp[1] + dir[1] * (rv + 4 + 160 * (1 - app));
        const aV = aHiv * (1 - E.ep(t, T.rna + 0.6, 0.8));
        cc.save(); cc.globalAlpha = aV; hivVirus(cc, vx, vy, rv, { t, rot: ang + Math.PI - Math.PI / 2, fuseer: fus }); cc.restore();
        // RNA (koraal) in de cel → DNA (paars) → naar de kern en ingebouwd
        const k = TC.kern; const sx0 = rp[0] - dir[0] * 40, sy0 = rp[1] - dir[1] * 40;
        const rx = E.lerp(sx0, k[0] - k[2] * 0.9, inf), ry = E.lerp(sy0, k[1] - 10, inf);
        cc.save(); cc.globalAlpha = aHiv * E.vis(t, T.rna, T.inbouwt + 1); cc.strokeStyle = inf < 0.5 ? D2.rna : CD.std; cc.lineWidth = 2.2; cc.lineCap = 'round'; cc.beginPath(); for (let q = 0; q <= 14; q++) cc.lineTo(rx + q * 5, ry + Math.sin(q * 1.3 + t * 2) * 5); cc.stroke(); cc.restore();
        if (integ > 0) { const ix = E.lerp(k[0] - k[2] * 0.9, k[0] - 30, integ), iy = E.lerp(k[1] - 10, k[1] + 10, integ); cc.save(); cc.globalAlpha = aHiv; cc.strokeStyle = CD.std; cc.lineWidth = 2.6; cc.beginPath(); for (let q = 0; q <= 14; q++) cc.lineTo(ix + q * 5, iy + Math.sin(q * 1.3) * 5); cc.stroke(); cc.restore(); }
      }, 'T-HELPERCEL · VERGROOT · VIRUS NIET OP SCHAAL', aHiv);
      g.label('hiv', 'VIRUS · INFECTEERT T-HELPERCELLEN', null, null, 120, 120, { alpha: aHiv, color: C.coral, noline: true });
      g.label('RNA → DNA, ingebouwd in het DNA van de cel', 'VIRUS GEBRUIKT DE ONDERDELEN VAN DE CEL', ZX, ZY + 20, 120, 902, { alpha: aCp * E.vis(t, T.rna, null), color: D2.rnaR, noline: true });
      // aantal T-helpercellen daalt (staaf) → aids
      const aD = aCp * E.vis(t, T.daalt, null); const lvl = 1 - 0.8 * E.ep(t, T.daalt, 4);
      L.gauge(g, 1000, 200, 70, 300, lvl, C.teal, 'T-helpercellen', aD);
      g.text('te weinig afweer: aids', 940, 600, { size: 36, w: 600, color: C.coral, alpha: aCp * E.vis(t, T.aids, null) });
      // antibiotica: bacterie (teal/grijs, met celwand en ribosomen) vs virus (geen van beide)
      const aAn = aCp * E.vis(t, T.antibiotica, null);
      { c.save(); c.globalAlpha = aAn; bacterieCel(c, 1480, 330, 360, { t, antibiotica: 0.9 * E.ep(t, T.celwand + 1.2, 3), hlWand: E.vis(t, T.celwand, T.virus), hlRibo: E.vis(t, T.celwand + 0.6, T.virus) }); c.restore(); }   // v2.5: bacterie volgens het recept (lib_bio)
      g.label('bacterie', 'CELWAND + RIBOSOMEN: DOELWIT ANTIBIOTICA', 1480, 160, 1150, 100, { alpha: aAn, color: C.teal, noline: true });
      for (let i = 0; i < 4; i++) E.hormone(g, 1320 + i * 90, 444 + 8 * Math.sin(t * 3 + i), C.green, { alpha: aAn * E.vis(t, T.celwand, null), r: 9, kind: 'plain' });
      g.text('antibiotica', 1700, 456, { size: 32, w: 600, color: C.green, alpha: aAn * E.vis(t, T.celwand, null) });
      const aV = aCp * E.vis(t, T.virus, null); { c.save(); c.globalAlpha = aV; hivVirus(c, 1480, 560, 34, { t }); c.restore(); }
      g.label('virus', 'GEEN CELWAND OF RIBOSOMEN: GEEN EFFECT', 1480, 534, 1180, 640, { alpha: aV, color: C.coral, noline: true });
      g.annot(1300, 1760, 760, 'virusremmers onderdrukken hiv, maar verwijderen het niet', { alpha: aCp * E.vis(t, T.remmers, null), color: C.green, maxW: 560 });
    }
    CM.after(g, t, TL);
  }
  return { sims: [], draw, T };
};

/* ========== H11 Als het niet vanzelf gaat — keten met schakels; chlamydia en de eileider; ivf-tijdlijn; recap; eindkaart ========== */
OSC['11'] = function ({ TL }) {
  const E = ENG, C = E.C, L = LIB, HC = L.HC, W = TL.W, CM = COMMON;
  const T = { zes: W(1, 'zes'), keten: W(2, 'keten'), schakel: W(2, 'schakel'), zaadcellen: W(3, 'zaadcellen'), eisprong: W(4, 'eisprong'), eileiders: W(5, 'eileiders'), chlamydia: W(6, 'chlamydia'), klachten: W(7, 'klachten'), ontsteken: W(8, 'ontsteken'), littekens: W(9, 'littekens'),
    langs: W(10, 'langs'), steken: W(11, 'steken'), buiten: W(12, 'buitenbaarmoederlijke'), ivf: W(13, 'ivf'), injecties: W(14, 'injecties'), tien: W(15, 'tien'), onderdrukt: W(16, 'onderdrukt'), hcg: W(18, 'hCG'), nabootst: W(19, 'bootst'), naald: W(20, 'naald'),
    lab: W(21, 'lab'), icsi: W(23, 'ICSI'), overgeslagen: W(24, 'overgeslagen'), terug: W(25, 'teruggeplaatst'), progesteron: W(26, 'progesteron'), nadoen: W(28, 'nadoen'), fsh2: W(28, 'FSH'), piek2: W(28, 'LH-piek'), prog2: W(29, 'progesteron'), oma: W(30, 'oma'), jou: W(30, 'jou'), vragen: W(31, 'vragen'), end: TL.E(31) };
  TL.cue('action', '1 op 6 stellen', T.zes, T.keten, { anchor: 'r1 zes' });
  TL.cue('action', 'keten met schakels die kunnen misgaan', T.keten, T.chlamydia, { anchor: 'r2 keten' });
  TL.cue('action', 'eileider: chlamydia, ontsteking, litteken, zaadcel/embryo blijft steken', T.chlamydia, T.ivf, { anchor: 'r6 chlamydia' });
  TL.cue('action', 'ivf-tijdlijn: FSH, onderdrukker, hCG, punctie, lab, ICSI, terugplaatsen, progesteron', T.ivf, T.nadoen, { anchor: 'r13 ivf' });
  TL.cue('action', 'recap: drie signalen op één basislijn; oma → jij', T.nadoen, T.end + 1, { anchor: 'r28 nadoen' });
  TL.cue('hold', 'eindkaart', TL.seg('end').t0, TL.seg('end').t1);
  function draw(g, t) {
    const aScene = CM.fixed(g, t, TL, 11, 11, 'Waar kan de keten breken, en hoe doen artsen de signalen na?');
    if (aScene <= 0.01) return; const c = g.ctx; const a = aScene;
    g.bg('schema', a);
    // deel A: 1 op 6 en de keten (tot 'chlamydia')
    const aA = a * E.vis(t, TL.card.t1 - 0.5, T.chlamydia - 0.3, 0.4, 0.5);
    if (aA > 0.01) {
      const aZ = aA * E.vis(t, T.zes - 0.5, T.keten + 1);
      for (let i = 0; i < 6; i++) { const x = 360 + i * 240; E.person(g, x - 30, 300, 150, { alpha: aZ, color: i === 0 ? C.coral : C.ink2 }); E.person(g, x + 30, 300, 150, { alpha: aZ, color: i === 0 ? C.coral : C.ink2 }); }
      g.text('bij ongeveer 1 op de 6 stellen lukt het niet binnen een jaar', 960, 420, { size: 36, w: 600, align: 'center', alpha: aZ });
      // keten: schakels op één lijn
      const aK = aA * E.vis(t, T.keten, null); const links = [['zaadcellen', T.zaadcellen], ['eisprong', T.eisprong], ['eileider', T.eileiders], ['bevruchting', null], ['innesteling', null]];
      links.forEach(([n, tw], i) => { const x = 300 + i * 330; g.box(x, 560, 280, 90, { alpha: aK, fill: C.fill, r: 45, stroke: tw && t >= tw ? C.coral : undefined, lw: tw && t >= tw ? 3 : 1.2 }); g.text(n, x + 140, 616, { size: 36, w: 600, align: 'center', alpha: aK, color: tw && t >= tw ? C.coral : C.ink }); if (i) g.arrow(x - 50, 605, x - 4, 605, { color: C.line, alpha: aK, lw: 1.5 }); });
      g.para('te weinig, of slecht bewegend', 300, 700, 280, 32, { size: 28, f: 'mono', color: C.coral, alpha: aA * E.vis(t, T.zaadcellen, null), layer: 'meta' });
      g.para('geen eisprong (hormoonbalans)', 630, 700, 280, 32, { size: 28, f: 'mono', color: C.coral, alpha: aA * E.vis(t, T.eisprong, null), layer: 'meta' });
      g.para('niet doorgankelijk', 960, 700, 280, 32, { size: 28, f: 'mono', color: C.coral, alpha: aA * E.vis(t, T.eileiders, null), layer: 'meta' });
    }
    // deel B: de eileider en chlamydia (tot 'ivf')
    const aB = a * E.vis(t, T.chlamydia - 0.3, T.ivf - 0.3, 0.5, 0.5);
    if (aB > 0.01) {
      // eileider als buis (Schema), links eierstok, rechts baarmoeder
      const y = 480; const scar = E.ep(t, T.littekens, 2.5), infl = E.ep(t, T.ontsteken, 1.5) * (1 - 0.5 * scar);
      // v2.5 (prompt v8, C9): eileider in lengtedoorsnede (lib_bio eileiderLangs): trechter met franjes, geplooid slijmvlies met trilharen
      // die naar de baarmoeder slaan; chlamydia → ontsteking → littekens die de buis vernauwen
      c.save(); c.globalAlpha = aB; const EL = eileiderLangs(c, 300, 1680, y, 220, { t, ontsteking: infl, litteken: scar, plek: 0.55 }); c.restore();
      g.text('EILEIDER · DOORSNEDE', 300, y - 160, { size: 28, f: 'mono', color: C.grain, alpha: aB, ls: 3, layer: 'meta' });
      g.text('eierstok →', 220, y + 10, { size: 32, w: 600, color: C.ink2, align: 'right', alpha: aB }); g.text('→ baarmoeder', 1700, y + 10, { size: 32, w: 600, color: C.ink2, alpha: aB });
      // chlamydia-bacteriën (teal staafjes) in de holte en tegen het slijmvlies, rond het midden
      const aC = aB * E.vis(t, T.chlamydia, T.littekens + 2); c.save(); c.globalAlpha = aC; for (let i = 0; i < 16; i++) { const u = 0.42 + 0.26 * E.hash(i * 5 + 1); const L0 = EL.lumen(u); const off = (E.hash(i * 5 + 2) * 2 - 1) * L0[2] * 0.85; c.save(); c.translate(L0[0], L0[1] + off); c.rotate(E.hash(i * 7) * 3); E.rr(c, -7, -3, 14, 6, 3); c.fillStyle = C.teal; c.fill(); c.restore(); } c.restore();
      g.label('chlamydia', 'BACTERIE · VAAK ZONDER KLACHTEN', null, null, 1000, 250, { alpha: aC, color: C.teal, noline: true });
      g.label('ontsteking', 'WAND ONTSTOKEN', null, null, 820, 690, { alpha: aB * E.vis(t, T.ontsteken, T.littekens), color: C.coral, noline: true });
      g.label('littekens', 'VERNAUWEN OF SLUITEN DE EILEIDER AF', null, null, 820, 690, { alpha: aB * E.vis(t, T.littekens, null), color: C.coral, noline: true });
      // zaadcellen komen niet langs (van rechts), of een embryo blijft steken (van links)
      const aSp = aB * E.vis(t, T.langs - 0.5, T.steken); for (let i = 0; i < 4; i++) { const p = E.c01(((t - T.langs + 1) * 0.25 + i * 0.25) % 1); const L0 = EL.lumen(E.lerp(0.97, 0.6, Math.min(p, 0.95))); zaadcelEcht(c, L0[0], L0[1] + (i - 1.5) * Math.min(10, L0[2] * 0.4), Math.PI, t + i * 0.3, 0.9, { a: aSp }); }
      const aEm = aB * E.vis(t, T.steken, null); const LE = EL.lumen(E.lerp(0.1, 0.5, E.ep(t, T.steken, 2.5))); const er = Math.min(24, Math.max(14, LE[2] * 0.9));
      if (aEm > 0.01) { c.save(); c.globalAlpha = aEm; c.lineWidth = 5; c.strokeStyle = rgba('#E8DDC0', 0.45); c.beginPath(); c.arc(LE[0], LE[1], er + 4, 0, 7); c.stroke(); c.restore(); for (let k = 0; k < 8; k++) { const th = k / 8 * 6.283; E.cell(g, LE[0] + Math.cos(th) * er * 0.5, LE[1] + Math.sin(th) * er * 0.5, er * 0.48, { alpha: aEm, nr: er * 0.2, single: true, texture: false, fill: C.fill2, edge: C.greenL }); } }
      g.label('embryo blijft steken', 'BUITENBAARMOEDERLIJKE ZWANGERSCHAP', null, null, 300, 800, { alpha: aB * E.vis(t, T.buiten - 1, null), color: C.green, noline: true });
    }
    // deel C: ivf-tijdlijn (tot 'nadoen')
    const aCp = a * E.vis(t, T.ivf - 0.3, T.nadoen - 0.3, 0.5, 0.5);
    if (aCp > 0.01) {
      const x0 = 200, x1 = 1720, y = 520; c.save(); c.globalAlpha = aCp; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); c.restore();
      g.text('IVF · TIJDLIJN (PRINCIPE, VERSCHILT PER KLINIEK)', 60, 912, { size: 28, f: 'mono', color: C.grain, alpha: aCp, ls: 2, layer: 'meta' });
      const steps = [[T.injecties, 'FSH-injecties', 'DAGELIJKS · ± 10 FOLLIKELS', HC.FSH, 0.06], [T.onderdrukt, 'LH-piek onderdrukt', 'NIET TE VROEG VRIJ', HC.LH, 0.24], [T.hcg, 'hCG-injectie', 'BOOTST DE LH-PIEK NA', HC.hCG, 0.42], [T.naald, 'punctie', '± 36 UUR LATER', C.ink2, 0.56], [T.lab, 'lab', 'EICEL + ZAADCELLEN', C.ink2, 0.70], [T.terug, 'terugplaatsen', 'EMBRYO + PROGESTERON', HC.P4, 0.88]];
      steps.forEach(([tw, n, note, col, p], i) => { const aa = aCp * E.vis(t, tw, null); const x = x0 + p * (x1 - x0); const up = i % 2 === 0; g.disc(x, y, 12, { alpha: aa, fill: col }); c.save(); c.globalAlpha = aa; c.strokeStyle = C.line; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x, up ? y - 110 : y + 110); c.stroke(); c.restore(); g.label(n, note, null, null, i === 5 ? x - 160 : x - 20, up ? y - 130 : y + 160, { alpha: aa, color: col, noline: true }); });
      // follikels (tien) bij FSH; eicellen in een schaaltje bij lab; ICSI-naald
      const aF = aCp * E.vis(t, T.tien, T.lab); for (let i = 0; i < 10; i++) { const h1 = E.hash(i * 3 + 1), h2 = E.hash(i * 3 + 2); L.follicle(g, 240 + h1 * 320, 740 + h2 * 120, 18 + 8 * E.ep(t, T.tien, 2), { alpha: aF, fluid: 0.5 }); }
      g.text('± 10 follikels tegelijk', 400, 715, { size: 32, w: 600, color: HC.FSH, align: 'center', alpha: aF });
      const aL = aCp * E.vis(t, T.lab, null); g.box(1000, 760, 380, 140, { alpha: aL, fill: C.fill2, r: 70 }); E.cell(g, 1150, 830, 40, { alpha: aL, nr: 14 }); for (let i = 0; i < 3; i++) E.sperm(g, 1250 + i * 30, 805 + i * 25, Math.PI + 0.3, 1.5, { alpha: aL, wig: t * 7 + i });
      const aI = aCp * E.vis(t, T.icsi, null); c.save(); c.globalAlpha = aI; c.strokeStyle = C.ink; c.lineWidth = 4; c.beginPath(); c.moveTo(1380, 725); c.lineTo(1190 + 20 * (1 - E.ep(t, T.icsi, 1)), 830); c.stroke(); c.restore();
      g.label('ICSI', 'ÉÉN ZAADCEL IN DE EICEL', null, null, 1400, 820, { alpha: aI, noline: true });
    }
    // deel D: recap op één basislijn en oma → jij
    const aD = a * E.vis(t, T.nadoen - 0.3, null, 0.5);
    if (aD > 0.01) {
      const by = 560; c.save(); c.globalAlpha = aD; c.strokeStyle = C.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(300, by); c.lineTo(1620, by); c.stroke(); c.restore();
      const items = [[T.fsh2, 'FSH', 'FOLLIKELS LATEN GROEIEN', HC.FSH], [T.piek2, 'LH-piek', 'EICEL RIJP, EISPRONG', HC.LH], [T.prog2, 'progesteron', 'SLIJMVLIES KLAAR', HC.P4]];
      items.forEach(([tw, n, note, col], i) => { const aa = aD * E.vis(t, tw, null); const x = 500 + i * 460; L.gauge(g, x - 35, by - 260, 70, 250, 0.4 + 0.3 * i, col, null, aa); g.label(n, note, null, null, x - 120, by + 50, { alpha: aa, color: col, noline: true }); });
      g.annot(300, 1620, by + 130, 'ivf werkt alleen omdat artsen de signalen nadoen: precies op tijd', { alpha: aD * E.vis(t, T.prog2 + 0.8, T.oma), color: C.green, maxW: 1200 });
      const aO = aD * E.vis(t, T.oma, null);
      g.screen(); castFig(g, 'ria', 300, 896, 220, { alpha: aO, outfit: 'vroeger', zwanger: 0.6, uit: 'blij', t }); g.text('je oma', 300, 934, { size: 32, w: 600, align: 'center', alpha: aO });
      castFig(g, 'noor', 1620, 896, 215, { alpha: aO * E.vis(t, T.jou, null), uit: 'blij', pose: 'zwaai', kijk: -1, t }); g.text('jij', 1620, 934, { size: 32, w: 600, align: 'center', alpha: aO * E.vis(t, T.jou, null) });
      c.save(); c.globalAlpha = aO * E.vis(t, T.jou, null); c.strokeStyle = C.gold; c.lineWidth = 1.5; c.setLineDash([8, 8]); c.beginPath(); c.moveTo(380, 800); c.lineTo(1540, 800); c.stroke(); c.restore();
    }
    const aQ = CM.after(g, t, TL);
    const EN = TL.seg('end'); const aE = E.vis(t, EN.t0, EN.t1 - 0.2, 0.6, 0.5);
    if (aE > 0.01) E.endCard(g, aE, ['Alleen cellen met de juiste receptor reageren op een hormoon. Daarom kan hCG het werk van LH overnemen.', 'Hetzelfde hormoon kan remmen (negatieve terugkoppeling) én aanjagen (positieve terugkoppeling, zoals de LH-piek en de weeën).', 'Anticonceptie, zwangerschapstest en ivf grijpen allemaal in op precies deze signalen.'], 'wie de signalen begrijpt, begrijpt de hele keten');
  }
  return { sims: [], draw, T };
};



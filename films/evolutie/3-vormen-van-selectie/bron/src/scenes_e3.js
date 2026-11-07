// Film 3 · Vormen van selectie — geanimeerde scènes (keyframes uit sb3.js als eindbeeld, opgebouwd in de maat van de stem).
const e3Schema = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const e3Cam = (ctx, cx, cy, z) => { ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
const e3K = (kg) => (kg - 1) / 4.5; // geboortegewicht → 0..1 op de as (1–5,5 kg)
const e3Overl = (u) => { const kg = 1 + u * 4.5; return 0.15 + 0.85 * Math.exp(-0.5 * ((kg - 3.55) / (kg < 3.55 ? 0.85 : 0.75)) ** 2); };
const e3OverlNu = (u) => { const kg = 1 + u * 4.5; const v = kg < 2.5 ? Math.exp(-0.5 * ((kg - 2.5) / 0.6) ** 2) : kg > 4.5 ? Math.exp(-0.5 * ((kg - 4.5) / 0.6) ** 2) : 1; return 0.55 + 0.43 * v; };
// pauw / pauwin lopen zonder glijden: x schuift met de gangsnelheid (S = 76 eenheden per cyclus × schaal)
const E3_PAUW_S = 76;
const e3Loop = (x0, s, fase, kijk = 1) => x0 + kijk * E3_PAUW_S * s * fase;
const e3Liniaal = (ctx, lx, ly0, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, lx, ly0, 54, 600, 6); shape(ctx, '#C9B896', '#E6DCC0', 2);
  for (let c = 0; c <= 30; c++) { const yy = ly0 + c * 20; ctx.strokeStyle = '#3A3026'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, yy); ctx.lineTo(lx + (c % 5 ? 14 : 28), yy); ctx.stroke(); if (c % 10 === 0) metaText(ctx, String(c), lx + 70, yy + 10, C.text2, 'left', 26); }
  metaText(ctx, 'cm', lx + 70, ly0 + 640, C.text2, 'left', 26); ctx.restore(); };
const e3Harde = (ctx, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(1480 + i * 46, 768 + (i % 2) * 12, 16, 12, 0, 0, 6.283); ctx.fillStyle = '#7A5A3A'; ctx.fill(); ctx.strokeStyle = '#A08060'; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); };

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (drie histogrammen, rustig levend)
  title(ctx, t) {
    const zw = Math.sin(t * 0.6), N = E3.N;
    E3.histo(ctx, 1460, 300, 320, 150, (u) => N(u, 0.56 + 0.06 * zw, 0.13), { oud: (u) => N(u, 0.45, 0.13), n: 16 });
    E3.histo(ctx, 1460, 570, 320, 150, (u) => 0.55 * 0.14 / (0.09 + 0.015 * zw) * N(u, 0.5, 0.09 + 0.015 * zw), { norm: false, oud: (u) => 0.55 * N(u, 0.5, 0.14), oudNorm: 1, n: 16 });
    const g = 0.25 + 0.025 * zw; E3.histo(ctx, 1460, 840, 320, 150, (u) => Math.max(N(u, g, 0.08), N(u, 1 - g, 0.08)), { n: 16 });
    metaText(ctx, 'gericht', 1620, 340, C.text2, 'center', 24); metaText(ctx, 'stabiliserend', 1620, 610, C.text2, 'center', 24); metaText(ctx, 'splitsend', 1620, 878, C.text2, 'center', 24); },

  // ---------------- Opening
  s01(ctx, t, q) { macroNacht(ctx, { horizon: 640 });
    const s = 1.75, per = 1.4, fase = t / per, x = e3Loop(1240 - E3_PAUW_S * s * (11 / per), s, fase);
    pauw(ctx, x, 820, s, { houding: 'lopen', t: fase });
    naamBij(ctx, 'sleep ± 1,5 m', q.on('energie') > 0.01 ? 'kost energie · valt op' : null, x - 620, 420, q.on('anderhalve'), 'center');
    evoSchaal(ctx, 'pauw van kop tot sleep ± 2 m'); },
  s02(ctx, t, q) { e3Schema(ctx);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, 860); ctx.lineTo(1720, 860); ctx.stroke();
    persoon(ctx, 'mirjam', 640, 860, 560, { pose: q.on('Neem') > 0.5 ? 'wijs' : 'staan', uit: 'blij', t });
    E3.weegTafel(ctx, 1080, 860, 3.5, t);
    naamBij(ctx, 'Verloskundige Mirjam', null, 640, 250, 1 - q.on('Neem', 1, 0.8), 'center');
    vraagteken(ctx, 1080, 330, q.on('zwaarder', 1, 0.4), 110); },

  // ---------------- H1 Gerichte selectie
  s04(ctx, t, q) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
    ctx.save(); e3Cam(ctx, 1110, 460, lerp(0.72, 1, ease(t / 3.2))); E3.stam(ctx, 0);
    berkenspanner(ctx, 950, 380, 0.55, { vorm: 'licht', rot: -0.1 });
    berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    ctx.restore();
    focusRing(ctx, 950, 380, 170, 120, q.on('lichte') * (1 - q.on('bijna'))); focusRing(ctx, 1270, 660, 170, 120, q.on('bijna') * (1 - q.on('verschil')));
    naamBij(ctx, 'berkenspanner', 'biston betularia', 140, 200, q.on('berkenspanner'), 'left');
    naamBij(ctx, 'lichte vorm', null, 670, 390, q.on('lichte'), 'right'); naamBij(ctx, 'zwarte vorm', null, 1550, 670, q.on('zwarte', 2), 'left');
    const ga = q.on('allelen'); if (ga > 0.01) metaText(ctx, '1 gen · 2 allelen', 140, 290, rgba(C.grain, ga), 'left', 26);
    evoSchaal(ctx, 'spanwijdte ± 5 cm · 1,5× vergroot'); },
  s05(ctx, t, q) { const r = q.on('Roet', 1, 2.6); E3.stam(ctx, r); E3.roet(ctx, t - q.at('Fabrieken'), q.on('Fabrieken', 1, 1.2));
    berkenspanner(ctx, 950, 380, 0.55, { vorm: 'licht', rot: -0.1 }); berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    focusRing(ctx, 1270, 660, 170, 120, q.on('gevangen') * (1 - q.on('Fabrieken')));
    focusRing(ctx, 950, 380, 170, 120, q.on('sterven'));
    text(ctx, 'Manchester', 1560, 180, fTitel(60), rgba(C.text, q.on('Manchester')), 'left'); metaText(ctx, 'het jaar 1848', 1560, 226, rgba(C.grain, q.on('1848')), 'left', 28);
    evoSchaal(ctx, '1,5× vergroot · roet op de schors'); },
  s06(ctx, t, q) { E3.stam(ctx, 1); E3.roet(ctx, t + 8, 1);
    berkenspanner(ctx, 950, 380, 0.55, { vorm: 'licht', rot: -0.1 }); berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    text(ctx, 'Manchester', 1560, 180, fTitel(60), C.text, 'left'); metaText(ctx, 'het jaar 1848', 1560, 226, C.grain, 'left', 28);
    vraagteken(ctx, 1110, 560, q.on('gebeurt', 1, 0.5), 120); evoSchaal(ctx, '1,5× vergroot · roet op de schors'); },
  s08(ctx, t, q) { E3.stam(ctx, 1);
    berkenspanner(ctx, 1270, 660, 0.55, { vorm: 'zwart', rot: 0.15 });
    const na = q.on('nakomelingen', 1, 1.2); for (const [x, y, r, k] of [[860, 790, 0.3, 0], [1430, 330, -0.2, 0.25], [1080, 110, 0.1, 0.5]]) berkenspanner(ctx, x, y, 0.42, { vorm: 'zwart', rot: r, a: clamp(na * 1.6 - k, 0, 1) });
    const land = q.at('vogel') + 0.4, pik = q.at('eerst'), weg = q.at('1895') - 0.6;
    const gepakt = t > pik + 0.35;
    if (!gepakt) berkenspanner(ctx, 1160, 300, 0.55, { vorm: 'licht', rot: -0.2 });
    const prooi = gepakt ? (c, x, y) => berkenspanner(c, x + 22, y + 4, 0.2, { vorm: 'licht', rot: 1.3 }) : null;
    if (t < land) { const p = E3.vlucht([-160, 700], [920, 520], t / land, 20); koolmees(ctx, p[0], p[1], 2.4, { houding: 'vliegen', t }); }
    else if (t < weg) koolmees(ctx, 920, 520, 2.4, { pik: 0.55 * q.on('eerst', 1, 0.35) * (1 - 0.6 * ramp(t, pik + 0.5, 0.5)), rot: -0.35, prooi });
    else { const p = E3.vlucht([920, 520], [2150, 80], (t - weg) / 1.6, -60); koolmees(ctx, p[0], p[1], 2.4, { houding: 'vliegen', t, prooi }); }
    focusRing(ctx, 1270, 660, 170, 120, q.on('Zwarte') * (1 - q.on('nakomelingen')));
    text(ctx, '98 % zwart', 1550, 180, fTitel(60), rgba(C.oker, q.on('achtennegentig')), 'left'); metaText(ctx, 'het jaar 1895', 1550, 226, rgba(C.grain, q.on('1895')), 'left', 26);
    evoSchaal(ctx, 'koolmees ± 14 cm · vlinder ± 5 cm'); },
  s09(ctx, t, q) { e3Schema(ctx);
    const x = 300, y = 780, w = 1300, h = 480, X = (j) => (j - 1840) / 180;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'aandeel zwarte berkenspanners', xt: [[X(1850), '1850'], [X(1900), '1900'], [X(1950), '1950'], [X(2000), '2000']], yt: [[0, '0 %'], [0.5, '50 %'], [1, '100 %']] });
    const D = [[1840, 0.0], [1848, 0.01], [1860, 0.15], [1875, 0.7], [1895, 0.98], [1930, 0.97], [1956, 0.94], [1970, 0.85], [1985, 0.6], [2000, 0.2], [2015, 0.03]];
    const P = D.map(([j, v]) => [x + X(j) * w, y - v * h]), P1 = P.slice(0, 7), P2 = P.slice(6), L1 = E3.lengte(P1), L2 = E3.lengte(P2);
    const d1 = ease(t / 2.4), d2 = ramp(t, q.at('licht'), q.at('zeldzaam') - q.at('licht') + 0.4);
    lijnPad(ctx, d2 > 0 ? P1 : E3.deel(P1, L1 * d1), C.oker, 6); if (d2 > 0) lijnPad(ctx, E3.deel(P2, L2 * d2), C.oker, 6);
    const kop = d2 > 0 ? E3.deel(P2, L2 * d2).pop() : E3.deel(P1, L1 * d1).pop(); circ(ctx, kop[0], kop[1], 9, C.oker);
    const lijnJ = (j, l, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([6, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + X(j) * w, y); ctx.lineTo(x + X(j) * w, y - h - 10); ctx.stroke(); ctx.restore(); metaText(ctx, l, x + X(j) * w + 12, y - h + 4, rgba(C.goud, a), 'left', 26); };
    lijnJ(1848, 'eerste zwarte', ease(t / 0.8)); lijnJ(1956, 'schone-luchtwet', q.on('1956'));
    const e = q.on('Tegenwoordig'); if (e > 0.01) { focusRing(ctx, P[10][0], P[10][1], 34, 34, e); metaText(ctx, 'een paar %', P[10][0] + 10, P[10][1] - 70, rgba(C.oker, e), 'center', 26); }
    evoSchaal(ctx, 'vereenvoudigd · geen echte meetreeks'); },
  s10(ctx, t, q) { e3Schema(ctx);
    const t0 = q.at('schuift'), stap = (k) => ease((t - t0 - k * 0.75) / 0.6); const mu = 0.45 + 0.17 * (stap(0) + stap(1) + stap(2)) / 3;
    histogram(ctx, 460, 760, 1000, 420, mu, 0.13, { kleur: C.teal, oud: t > t0 ? { mu: 0.45, sd: 0.13 } : null, as: ['licht', 'donker'] });
    pijl(ctx, 860, 290, lerp(870, 1080, q.on('voordeel', 1, 0.8)), 290, C.goud, q.on('kant', 1, 0.4), 4, 16);
    haak(ctx, 460, 1460, 800, 'gerichte selectie', C.groen, q.on('gerichte'));
    const v = q.on('vinken'); if (v > 0.01) { grondvink(ctx, 1660, 250, 1.1, { a: v, houding: 'staan' }); metaText(ctx, 'vinken · film 2', 1660, 300, rgba(C.text2, v), 'center', 24); } },

  // ---------------- H2 Stabiliserende selectie
  s11(ctx, t, q) { e3Schema(ctx);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, 860); ctx.lineTo(1720, 860); ctx.stroke();
    persoon(ctx, 'mirjam', 600, 860, 560, { uit: 'praat', pose: q.on('weegt') > 0.5 ? 'wijs' : 'staan', t });
    E3.weegTafel(ctx, 1040, 860, 3.2, t);
    naamBij(ctx, 'Verloskundige Mirjam', null, 600, 250, q.on('Verloskundige', 1, 0.3) * (1 - q.on('geboortegewicht')), 'center');
    naamBij(ctx, 'geboortegewicht', q.on('erfelijke') > 0.01 ? 'erfelijk én omgeving' : (q.on('voeding') > 0.01 ? 'voeding · gezondheid' : null), 1500, 380, q.on('geboortegewicht'), 'left'); },
  s12(ctx, t, q) { e3Schema(ctx);
    const x = 360, y = 780, w = 1200, h = 440;
    E3.histo(ctx, x, y, w, h, (u) => E3.N(u, e3K(3.3), 0.12), { grow: ramp(t, q.at('duizenden'), 3.5) });
    for (let kg = 1; kg <= 5; kg++) metaText(ctx, kg + ' kg', x + e3K(kg) * w, y + 46, C.text2, 'center', 28);
    metaText(ctx, 'geboortegewicht', x + w, y + 90, rgba(C.grain, q.on('geboortegewicht')), 'right', 28); metaText(ctx, 'aantal baby\'s', x, y - h - 40, rgba(C.grain, q.on('duizenden')), 'left', 28);
    text(ctx, 'Londen', 140, 220, fTekst(48, 700), rgba(C.text, q.on('Londen')), 'left'); metaText(ctx, 'geboren 1935–1946', 140, 262, rgba(C.grain, q.on('1935')), 'left', 26); },
  s13(ctx, t, q) { e3Schema(ctx);
    const x = 360, y = 780, w = 1200, h = 440;
    E3.histo(ctx, x, y, w, h, (u) => E3.N(u, e3K(3.3), 0.12));
    for (let kg = 1; kg <= 5; kg++) metaText(ctx, kg + ' kg', x + e3K(kg) * w, y + 46, C.text2, 'center', 28);
    text(ctx, 'Londen', 140, 220, fTekst(48, 700), C.text, 'left'); metaText(ctx, 'geboren 1935–1946', 140, 262, C.grain, 'left', 26);
    vraagteken(ctx, 1500, 360, q.on('Welke', 1, 0.5), 110); },
  s15(ctx, t, q) { e3Schema(ctx);
    const x = 360, y = 780, w = 1200, h = 440, hh = h * lerp(1, 0.7, ease(t / 1));
    const dl = q.on('lichtere'), dr = q.on('zware');
    E3.histo(ctx, x, y, w, hh, (u) => E3.N(u, e3K(3.3), 0.12), { dimF: (u) => 1 - (u < e3K(2.2) ? dl : 0) - (u > e3K(4.4) ? dr : 0) });
    for (let kg = 1; kg <= 5; kg++) metaText(ctx, kg + ' kg', x + e3K(kg) * w, y + 46, C.text2, 'center', 28);
    const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80; P.push([x + u * w, y - h * e3Overl(u)]); }
    const c = q.on('overleefden', 1, 1.6); if (c > 0.01) lijnPad(ctx, E3.deel(P, E3.lengte(P) * c), C.groen, 6);
    naamBij(ctx, 'overleving', null, x + e3K(3.55) * w, y - h - 30, q.on('overleefden', 1, 0.6), 'center', C.groen);
    metaText(ctx, 'te licht', x + e3K(1.4) * w, y - h * 0.5, rgba(C.koraal, dl), 'center', 28); metaText(ctx, 'te zwaar', x + e3K(5.1) * w, y - h * 0.5, rgba(C.koraal, dr), 'center', 28);
    evoSchaal(ctx, 'vereenvoudigd · naar karn & penrose 1951'); },
  s16(ctx, t, q) { e3Schema(ctx);
    const sd = lerp(0.14, 0.08, ramp(t, q.at('nadeel'), q.at('spreiding') - q.at('nadeel') + 0.7)), amp = 0.55 * 0.14 / sd;
    E3.histo(ctx, 460, 760, 1000, 420, (u) => amp * E3.N(u, 0.5, sd), { norm: false, oud: t > q.at('nadeel') ? (u) => 0.55 * E3.N(u, 0.5, 0.14) : null, oudNorm: 1, as: ['licht', 'zwaar'] });
    const pa = q.on('uitersten', 1, 0.5); pijl(ctx, 640, 420, lerp(650, 820, pa), 420, C.goud, pa, 4, 16); pijl(ctx, 1280, 420, lerp(1270, 1100, pa), 420, C.goud, pa, 4, 16);
    const g = q.on('gemiddelde'); if (g > 0.01) { ctx.save(); ctx.globalAlpha = g; ctx.setLineDash([6, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 760); ctx.lineTo(960, 300); ctx.stroke(); ctx.restore(); }
    haak(ctx, 460, 1460, 800, 'stabiliserende selectie', C.groen, q.on('stabiliserende')); },
  s17(ctx, t, q) { e3Schema(ctx);
    const x = 360, y = 780, w = 1200, h = 440, K = e3K;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'geboortegewicht', yLabel: 'overleving', xt: [[K(1), '1 kg'], [K(2), '2'], [K(3), '3'], [K(4), '4'], [K(5), '5']] });
    const m = ramp(t, q.at('couveuses'), q.at('twee') - q.at('couveuses'));
    const Pold = [], Pnu = []; for (let i = 0; i <= 80; i++) { const u = i / 80; Pold.push([x + u * w, y - h * e3Overl(u)]); Pnu.push([x + u * w, y - h * lerp(e3Overl(u), e3OverlNu(u), m)]); }
    if (m > 0.01) lijnPad(ctx, Pold, rgba(C.groen, 0.8), 4, [10, 10]);
    lijnPad(ctx, Pnu, C.groen, m > 0.01 ? 7 : 6);
    const zr = q.on('zware') * (1 - q.on('veranderd')); if (zr > 0.01) { lijnPad(ctx, Pold.slice(Math.round(80 * K(4.2))), rgba(C.koraal, zr), 8); metaText(ctx, 'te zwaar', x + K(5.1) * w, y - h * 0.5, rgba(C.koraal, zr), 'center', 28); }
    naamBij(ctx, 'vroeger', null, x + K(1.6) * w, y - h * 0.32, m, 'center', C.text2);
    naamBij(ctx, 'nu, met goede zorg', null, x + K(3.5) * w, y - h - 60, q.on('couveuses'), 'center', C.groen);
    const b1 = q.on('twee'), b2 = q.on('vier'); if (b1 > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha = b1; const xa = x + K(2.5) * w, xb = x + lerp(K(2.5), K(4.5), b2) * w; ctx.beginPath(); ctx.moveTo(xa, y - 16); ctx.lineTo(xb, y - 16); ctx.stroke(); ctx.restore(); }
    evoSchaal(ctx, 'vereenvoudigd · naar ulizzi e.a. 2002'); },

  // ---------------- H3 Splitsende selectie
  s18(ctx, t, q) { macroNacht(ctx, { horizon: 860 });
    zegge(ctx, 520, 900, 620, { buig: 0.04 + 0.006 * Math.sin(t * 0.9) }); zegge(ctx, 1340, 900, 640, { zaad: '#8A6A40', buig: -0.03 + 0.006 * Math.sin(t * 0.8 + 1) });
    lijn(ctx, [[760, 900], [700, 760], [560, 608], [420, 560]], '#6E9A5E', 7); lijn(ctx, [[1180, 900], [1240, 760], [1380, 598], [1520, 556]], '#6E9A5E', 7);
    const in1 = clamp(t / 1.8, 0, 1), in2 = clamp((t - 0.9) / 1.8, 0, 1);
    const sk1 = q.on('kleine') > 0.5 ? C.goud : null, sk2 = q.on('grote') > 0.5 ? C.goud : null;
    if (in1 < 1) { const p = E3.vlucht([-120, 260], [560, 608], in1, 60); zaadkraker(ctx, p[0], p[1], 2.6, { snavel: 'klein', houding: 'vliegen', t }); } else zaadkraker(ctx, 560, 608, 2.6, { snavel: 'klein', snavelKleur: sk1 });
    if (in2 < 1) { if (in2 > 0) { const p = E3.vlucht([2040, 240], [1380, 598], in2, 60); zaadkraker(ctx, p[0], p[1], 2.6, { snavel: 'groot', kijk: -1, houding: 'vliegen', t }); } } else zaadkraker(ctx, 1380, 598, 2.6, { snavel: 'groot', kijk: -1, snavelKleur: sk2 });
    naamBij(ctx, 'kleine snavel', null, 640, 220, q.on('kleine'), 'center', C.goud); naamBij(ctx, 'grote snavel', null, 1300, 220, q.on('grote'), 'center', C.goud);
    naamBij(ctx, 'zwartbuikzaadkraker', 'pyrenestes ostrinus · kameroen', 960, 120, q.on('zwartbuikzaadkraker'), 'center');
    evoSchaal(ctx, 'vogel ± 15 cm'); },
  s19(ctx, t, q) { macroNacht(ctx, { horizon: 860 });
    for (const bx of [380, 960, 1540]) lijn(ctx, [[bx + 120, 900], [bx + 40, 760], [bx, 636], [bx - 140, 600]], '#6E9A5E', 7);
    const zk = q.on('zachte'), hk = q.on('harde'), md = q.on('ertussenin');
    for (let i = 0; i < 5; i++) zaadje(ctx, 300 + i * 40, 760 + (i % 2) * 14, 1.4, { kleur: '#D9C08A', a: zk });
    e3Harde(ctx, hk);
    const pk1 = t > q.at('eet') && t < q.at('zegge') + 0.4 ? 0.5 - 0.5 * Math.cos((t - q.at('eet')) * 9) : 0; // snel pikken
    const pk2 = t > q.at('kraakt') && t < q.at('zegge', 2) + 0.4 ? 0.5 - 0.5 * Math.cos((t - q.at('kraakt')) * 3.5) : 0; // langzaam kraken
    zaadkraker(ctx, 380, 636, 1.5, { snavel: 'klein', snavelKleur: q.on('kleine') > 0.5 ? C.goud : null, pik: 0.5 * pk1 });
    gedimd(ctx, 1 - 0.65 * md, (g) => zaadkraker(g, 960, 636, 1.5, { snavel: 'midden' }));
    zaadkraker(ctx, 1540, 636, 1.5, { snavel: 'groot', snavelKleur: q.on('grote') > 0.5 ? C.goud : null, pik: 0.5 * pk2 });
    naamBij(ctx, 'zachte zaden', null, 380, 830, zk, 'center'); naamBij(ctx, 'harde zaden', null, 1540, 830, hk, 'center');
    naamBij(ctx, 'ertussenin', 'in geen van beide goed', 960, 360, 0.6 * md, 'center');
    evoSchaal(ctx, 'zaden vergroot'); },
  s20(ctx, t, q) { macroNacht(ctx, { horizon: 860 });
    for (const bx of [380, 960, 1540]) lijn(ctx, [[bx + 120, 900], [bx + 40, 760], [bx, 636], [bx - 140, 600]], '#6E9A5E', 7);
    for (let i = 0; i < 5; i++) zaadje(ctx, 300 + i * 40, 760 + (i % 2) * 14, 1.4, { kleur: '#D9C08A' }); e3Harde(ctx, 1);
    zaadkraker(ctx, 380, 636, 1.5, { snavel: 'klein' }); zaadkraker(ctx, 960, 636, 1.5, { snavel: 'midden' }); zaadkraker(ctx, 1540, 636, 1.5, { snavel: 'groot' });
    vraagteken(ctx, 960, 400, q.on('snavels', 1, 0.5), 120); evoSchaal(ctx, 'zaden vergroot'); },
  s22(ctx, t, q) { e3Schema(ctx); const N = E3.N;
    const m = ramp(t, q.at('histogram'), q.at('toppen') - q.at('histogram') + 0.6), uit = ramp(t, q.at('groeien'), 1.6) * 0.05;
    const bim = (u) => Math.max(N(u, 0.27 - uit, 0.08), N(u, 0.73 + uit, 0.08)), dd = q.on('midden', 1, 0.8) * (1 - m);
    E3.histo(ctx, 460, 760, 1000, 420, (u) => lerp(N(u, 0.5, 0.14), bim(u), m), { dimF: (u) => 1 - (Math.abs(u - 0.5) < 0.12 ? dd : 0), as: ['kleine snavel', 'grote snavel'] });
    haak(ctx, 460, 1460, 800, 'splitsende selectie', C.groen, q.on('splitsende'));
    metaText(ctx, 'vooral één gen bepaalt klein of groot', 960, 180, rgba(C.grain, q.on('bepaalt')), 'center', 26);
    const pa = q.on('soorten', 1, 0.6), pv = ramp(t, q.at('groeien'), 1.6) * 40;
    pijl(ctx, 700 - pv, 300, 560 - pv, 300, C.goud, pa, 4, 16); pijl(ctx, 1220 + pv, 300, 1360 + pv, 300, C.goud, pa, 4, 16);
    naamBij(ctx, 'kan leiden tot nieuwe soorten', null, 960, 262, pa, 'center', C.goud); },

  // ---------------- H4 Seksuele selectie
  s23(ctx, t, q) { macroNacht(ctx, { horizon: 700 });
    const w = ramp(t, q.at('waaier') - 0.3, 1.2), tr = t > q.at('trillen') - 0.5 ? t : 0;
    if (w <= 0) pauw(ctx, 760, 880, 1.25, { houding: 'rust' }); else pauw(ctx, 760, 880, 1.25, { houding: 'pronk', waaier: 0.5 + 0.5 * w, t: tr });
    const s = 1.1, per = 0.62, n = 6, tl = n * per, fase = Math.min(t, tl) / per, x0 = 1560 + E3_PAUW_S * s * n;
    pauwin(ctx, e3Loop(x0, s, fase, -1), 880, s, t < tl ? { kijk: -1, houding: 'lopen', t: fase } : { kijk: -1 });
    naamBij(ctx, 'pauwin', 'kiest', 1560, 900, q.on('pauwin'), 'center'); },
  s24(ctx, t, q) { macroNacht(ctx, { horizon: 700 });
    pauw(ctx, 760, 880, 1.25, { houding: 'pronk', waaier: 1, t: t + 10 }); pauwin(ctx, 1560, 880, 1.1, { kijk: -1 });
    vraagteken(ctx, 1250, 360, q.on('opvallende', 1, 0.5), 120); },
  s26(ctx, t, q) { macroNacht(ctx, { horizon: 700 });
    const dm = 1 - 0.65 * q.on('gekozen');
    gedimd(ctx, dm, (g) => pauw(g, 520, 880, 0.95, { waaier: 1, vlekken: 0.25, t: t * 0.6 }));
    pauw(ctx, 1200, 880, 0.95, { waaier: 1, t });
    const s = 0.95, per = 0.6, n = 6, tl = n * per, fase = Math.min(t, tl) / per, xs = 1580 + E3_PAUW_S * s * n;
    pauwin(ctx, e3Loop(xs, s, fase, -1), 880, s, t < tl ? { houding: 'lopen', t: fase, kijk: -1 } : { kijk: -1 });
    naamBij(ctx, 'veel minder oogvlekken', q.on('gekozen') > 0.01 ? 'minder vaak gekozen' : null, 520, 290, lerp(1, 0.8, q.on('gekozen')) * q.on('minder'), 'center');
    naamBij(ctx, 'gekozen', q.on('jongen') > 0.01 ? 'meer jongen' : null, 1200, 290, q.on('gekozen', 2), 'center', C.goud);
    naamBij(ctx, 'seksuele selectie', 'door het andere geslacht', 1780, 200, q.on('seksuele'), 'right');
    vraagteken(ctx, 860, 420, 0.85 * q.on('onderzoeken', 1, 0.6), 90); },
  s27(ctx, t, q) { macroNacht(ctx, { horizon: 700 });
    const k = ramp(t, q.at('vechten') - 0.6, 0.6) * 0.5, vecht = t > q.at('vechten');
    const duw = vecht ? 14 * Math.sin((t - q.at('vechten')) * 1.6) : 0, win = ramp(t, q.at('wint'), 1.2) * 60;
    const o1 = vecht ? { kop: 0.85 } : { kop: k }, o2 = vecht ? { kop: 0.85, kijk: -1 } : { kop: k, kijk: -1 };
    edelhert(ctx, 760 + duw + win, 920, 1.25, o1); edelhert(ctx, 1460 + duw + win, 920, 1.25, o2);
    naamBij(ctx, 'edelherten in de bronst', q.on('vier') > 0.01 ? '± 1 op de 4 volwassen herten per jaar gewond' : null, 960, 200, q.on('Edelherten'), 'center');
    evoSchaal(ctx, 'schofthoogte ± 1,2 m'); },
  s28(ctx, t, q) { e3Schema(ctx);
    const hoek = -0.06 * q.on('overleven', 1, 0.8) * (1 - q.on('voortplanten', 1, 0.1)) + 0.12 * q.on('voortplanten', 1, 1.4);
    E3.balans(ctx, hoek, q.on('nadeel'), q.on('voortplanten'));
    metaText(ctx, 'fitness = aantal nakomelingen', 960, 850, rgba(C.groen, q.on('Fitness')), 'center', 28); },

  // ---------------- H5 Co-evolutie
  s29(ctx, t, q) { macroNacht(ctx, { horizon: 980, heuvel: false });
    const fx = 869, fy = 511, ny = fy + 285 * 1.6; const a = ramp(t, q.at('nectar') - 0.8, 1.6), b = ramp(t, q.at('buis') - 0.2, 1.6);
    const z = lerp(1.7, 1, b), cy = lerp(lerp(fy, ny - 60, a), 540, b), cx = lerp(fx, 960, b);
    ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-cx, -cy);
    orchideePlant(ctx, 620, 470, 1.6, { spoor: 300, bloemen: [[2, 1, 1]] });
    ctx.restore();
    naamBij(ctx, 'Darwins orchidee', 'angraecum sesquipedale · madagaskar', 1260, 200, q.on('Darwins'), 'left');
    naamBij(ctx, 'buis met nectar', q.on('twintig') > 0.01 ? '20 tot 35 cm' : null, 1020, 780, q.on('buis', 1, 0.8) * b, 'left');
    evoSchaal(ctx, 'spoor ± 30 cm'); },
  s30(ctx, t, q) { macroNacht(ctx, { horizon: 980, heuvel: false });
    orchidee(ctx, 760, 220, 2.0, { spoor: 300 });
    const ra = q.on('voorspelde', 1, 0.8); e3Liniaal(ctx, lerp(1180, 1080, ra), 240, ra);
    const tg = ramp(t, q.at('tong'), q.at('lang') - q.at('tong') + 0.3); if (tg > 0.01) { ctx.save(); ctx.setLineDash([10, 10]); const P = [[1420, 300], [1400, 600], [1380, 840]]; lijn(ctx, E3.deel(P, E3.lengte(P) * tg), C.goud, 3); ctx.restore(); }
    text(ctx, 'het jaar 1862', 1300, 180, fTitel(56), rgba(C.text, q.on('1862')), 'left'); metaText(ctx, 'darwin voorspelt een lange tong', 1300, 224, rgba(C.grain, q.on('voorspelde')), 'left', 26);
    evoSchaal(ctx, 'op schaal · liniaal in cm'); },
  s31(ctx, t, q) { macroNacht(ctx, { horizon: 980, heuvel: false });
    orchidee(ctx, 760, 220, 2.0, { spoor: 300 }); e3Liniaal(ctx, 1080, 240, 1);
    ctx.save(); ctx.setLineDash([10, 10]); lijn(ctx, [[1420, 300], [1400, 600], [1380, 840]], C.goud, 3); ctx.restore();
    vraagteken(ctx, 1600, 560, q.on('buis', 1, 0.5), 120); evoSchaal(ctx, 'op schaal · liniaal in cm'); },
  s33(ctx, t, q) { macroNacht(ctx, { horizon: 980, heuvel: false });
    const fx = 760, fy = 260, fs = 2.0;
    orchidee(ctx, fx, fy, fs, { spoor: 300, nectar: false });
    const S = [[2, 6], [6, 40], [10, 90], [12, 150], [6, 210], [-4, 260], [-8, 296]].map(([px, py]) => [fx + px * fs, fy + py * fs]);
    const nk = 1 - 0.7 * q.on('nectar', 1, 1.2); { const n = S[S.length - 1]; lijn(ctx, [[n[0] + 1, n[1] - 68 * nk], [n[0], n[1] - 4]], C.goud, 8); }
    const inv = clamp(t / q.at('beschreven'), 0, 1), dicht = q.on('kop', 1, 1.2), bob = 4 * Math.sin(t * 2.2);
    let vx = 1000, vy = 238; if (inv < 1) { const p = E3.vlucht([1900, 120], [1000, 238], inv, -40); vx = p[0]; vy = p[1]; }
    vx = lerp(vx, 830, dicht); vy = lerp(vy, 236, dicht) + bob;
    const uit = ramp(t, q.at('tong'), q.at('lang') - q.at('tong') + 0.3), diep = ramp(t, q.at('diep') - 0.3, 1.4);
    if (diep > 0) lijn(ctx, E3.deel(S.slice(1), E3.lengte(S.slice(1)) * diep).map((p) => [p[0] - 1, p[1]]), '#3A3028', 2.5);
    const open = [fx + 3 * fs, fy + 10 * fs], doel = [lerp(vx - 70, open[0], uit), lerp(vy + 60, open[1], uit)];
    pijlstaart(ctx, vx, vy, 1.0, { kijk: -1, houding: 'zweven', t, tong: uit > 0.02 ? 1 : 0, tongEind: [vx - doel[0], doel[1] - vy] });
    if (uit > 0.02) { const m0 = [vx - 44, vy + 2], P = []; for (let i = 0; i <= 20; i++) { const u = i / 20, c1 = [vx - 60, vy + 20]; P.push([(1 - u) ** 2 * m0[0] + 2 * u * (1 - u) * c1[0] + u * u * doel[0], (1 - u) ** 2 * m0[1] + 2 * u * (1 - u) * c1[1] + u * u * doel[1]]); } lijn(ctx, P, '#B8A488', 3); }
    if (diep > 0) lijn(ctx, E3.deel(S.slice(1), E3.lengte(S.slice(1)) * diep).map((p) => [p[0] - 1, p[1]]), '#5A4636', 4);
    const pol = q.on('stuifmeel', 1, 0.4); if (pol > 0.01) circ(ctx, vx - 40, vy - 6, 6, rgba('#E6C84A', pol), rgba('#B8962E', pol), 1.5);
    naamBij(ctx, 'pijlstaartvlinder', 'xanthopan praedicta · beschreven in 1903', 1060, 400, q.on('pijlstaartvlinder'), 'left');
    naamBij(ctx, 'tong tot ± 28 cm', 'reikt tot de nectar', 820, 860, q.on('dertig'), 'left');
    evoSchaal(ctx, 'op schaal'); },
  s34(ctx, t, q) { e3Schema(ctx);
    const cx = 960, cy = 470, R = 230, ar = q.on('selectiedruk', 1, 1), rot = t * 0.25;
    if (ar > 0.01) { ctx.save(); ctx.globalAlpha = ar; ctx.lineWidth = 6; for (const [a0, a1, kl] of [[-2.6, -0.5, C.groen], [0.55, 2.65, C.oker]]) { const b0 = a0 + rot, b1 = a1 + rot; ctx.strokeStyle = kl; ctx.beginPath(); ctx.arc(cx, cy, R, b0, b1); ctx.stroke(); const ex = cx + Math.cos(b1) * R, ey = cy + Math.sin(b1) * R, ta = b1 + Math.PI / 2; pijl(ctx, ex - Math.cos(ta) * 30, ey - Math.sin(ta) * 30, ex, ey, kl, 1, 6, 22); } ctx.restore(); }
    const gen = ramp(t, q.at('generatie'), q.at('generatie', 2) - q.at('generatie') + 1), kort = q.on('korter', 1, 0.8) * (1 - q.on('verklaring', 1, 0.8));
    orchidee(ctx, cx - 420, cy - 120, 0.75, { spoor: lerp(230, 300, gen) - 70 * kort, a: q.on('soorten') });
    pijlstaart(ctx, cx + 400, cy - 10, 2.2, { kijk: -1, tong: 0, houding: 'zweven', t, a: q.on('soorten') });
    naamBij(ctx, 'langere buis', null, cx - 420, cy + 240, q.on('generatie'), 'center', C.groen); naamBij(ctx, 'langere tong', null, cx + 430, cy + 120, q.on('generatie'), 'center', C.oker);
    haak(ctx, 520, 1400, 760, 'co-evolutie: een wapenwedloop', C.groen, q.on('wapenwedloop'));
    naamBij(ctx, 'proef · Nilsson 1988', q.on('korter') > 0.01 ? 'kortere buis → minder bestoven' : null, 360, 170, q.on('proef'), 'center', C.text2);
    naamBij(ctx, 'andere verklaring · Wasserthal 1997', q.on('spinnen') > 0.01 ? 'lange tong houdt afstand tot spinnen' : null, 1500, 170, q.on('verklaring'), 'center', C.text2); },

  // ---------------- Samenvatting
  s35(ctx, t, q) { e3Schema(ctx); const N = E3.N;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 760); ctx.lineTo(1780, 760); ctx.stroke();
    const g = q.on('Gerichte'), s = q.on('Stabiliserende'), p = q.on('Splitsende'), dimA = (v) => 0.3 + 0.7 * v;
    const mu = lerp(0.45, 0.62, ramp(t, q.at('Gerichte') + 0.6, 1.6)), sd = lerp(0.14, 0.08, ramp(t, q.at('Stabiliserende') + 0.6, 1.4)), m = ramp(t, q.at('Splitsende') + 0.5, 1.3);
    E3.histo(ctx, 200, 740, 420, 240, (u) => N(u, mu, 0.13), { a: dimA(g), oud: g > 0.01 ? (u) => N(u, 0.45, 0.13) : null });
    E3.histo(ctx, 750, 740, 420, 240, (u) => 0.55 * 0.14 / sd * N(u, 0.5, sd), { a: dimA(s), norm: false, oud: s > 0.01 ? (u) => 0.55 * N(u, 0.5, 0.14) : null, oudNorm: 1 });
    E3.histo(ctx, 1300, 740, 420, 240, (u) => lerp(N(u, 0.5, 0.14), Math.max(N(u, 0.27, 0.08), N(u, 0.73, 0.08)), m), { a: dimA(p) });
    const pw = q.on('pauw', 1, 0.8), dier = 1 - 0.75 * pw;
    berkenspanner(ctx, 410, 330, 0.32, { vorm: 'licht', a: dimA(g) * dier }); persoon(ctx, 'baby', 960, 340, 170, { uit: 'blij', a: dimA(s) * dier, t }); zaadkraker(ctx, 1500, 360, 0.8, { snavel: 'groot', a: dimA(p) * dier, houding: 'staan' });
    const bb = q.on('baby'); metaText(ctx, 'gericht', 410, 820, rgba(C.text2, dimA(g)), 'center', 28); metaText(ctx, 'stabiliserend', 960, 820, rgba(bb > 0.5 ? C.groen : C.text2, dimA(s)), 'center', 28); metaText(ctx, 'splitsend', 1510, 820, rgba(C.text2, dimA(p)), 'center', 28);
    focusRing(ctx, 960, 620, 70, 120, q.on('midden') * (1 - pw));
    if (pw > 0.01) { ctx.save(); ctx.fillStyle = rgba(C.bgSchema, 0.8 * pw); ctx.fillRect(0, 90, W, 380); ctx.restore(); pauw(ctx, 700, 430, 0.62, { houding: 'rust', a: pw }); ctx.save(); ctx.globalAlpha = pw; E3.balansMini(ctx, 1280, 260, 0.12 * q.on('wint', 1, 1)); ctx.restore(); } },
});

window.VRAAG_VANAF = { s33: 'Nog' }; // Vragen uit: ook de aanloop 'Nog één vraag. Een huidcel …' weg (B11)
// Celdeling 2.0 — scènes (lichte remake, prompt v10, 26 okt 2026). Eén functie per gesproken alinea.
// q.at('woord', n) = start van het n-de woord dat 'woord' bevat (hoofdletterongevoelig, stukje van een woord).
// Vaderskant teal (CD.vader), moederskant oker (CD.moeder), zoals Chromosomen 2.1. 'Ons paar' = het lange paar, gouden rand.
// Nieuwe tekeningen: teken_celdeling.js (cdChromosoom, cdEen, cdKluwen, cdCel, cdPool, cdDraad, cdKernmembraan, cdTeller).

C.vader = CD.vader; C.moeder = CD.moeder; C.spoel = '#8FA0B5'; // oude helpers (chrom_lib, comparePanels) krijgen dezelfde kleuren
const KL = { L: 140, w: 15 };
// modelcel 2n = 4: plekken in de metafase (y per chromosoom) en in de profase (verspreid in de kern)
const MOD = [{ p: 'L', k: 'vader', py: [-80, -62] }, { p: 'L', k: 'moeder', py: [70, -22] }, { p: 'K', k: 'vader', py: [-40, 44] }, { p: 'K', k: 'moeder', py: [90, 92] }];
const MY = [-240, -75, 75, 190]; // y in het equatorvlak t.o.v. het midden
function onsPaar(m) { return m.p === 'L'; }
function lenOf(m, L = KL.L) { return m.p === 'L' ? L : L * 0.62; }
function cenOf(m) { return m.p === 'L' ? 0.38 : 0.30; }
function micro2(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
function meta2(ctx, s, a = 1) { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, W - 40, H - 22, C.text2, 'right', 24); ctx.restore(); } }
const vragenUit2 = () => (typeof state !== 'undefined' && state && state.vragen === 'uit');

// ---- de mitosecel: één doorlopende toestand st = {c: condensatie, nm: kernmembraan weg 0..1, sp: spoel, me: naar het midden,
//      an: anafase 0..1, te: telofase 0..1, cy: insnoeren 0..1, hl: gouden rand om ons paar}
function mitoseCel(ctx, cx, cy, st, t) {
  const { c = 1, nm = 1, sp = 1, me = 1, an = 0, te = 0, cy: ins = 0, hl = 0, s = 1 } = st;
  const rx = 560 * s, ry = 340 * s, pol = 470 * s * lerp(0.75, 1, ease(sp)) + 70 * s * ease(an);
  cdCel(ctx, cx, cy, rx + 40 * s * ease(an), ry, { insnoer: ins, t });
  const pl = cx - pol, pr = cx + pol;
  cdPool(ctx, pl, cy, ease(sp)); cdPool(ctx, pr, cy, ease(sp));
  if (nm < 0.99) cdKernmembraan(ctx, cx, cy, 300 * s, nm, 1);
  // nieuwe kernen in de telofase
  if (te > 0.01) for (const sx of [-1, 1]) { ctx.save(); ctx.globalAlpha *= ease(te); ctx.beginPath(); ctx.arc(cx + sx * 330 * s, cy, 150 * s, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.16); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); ctx.restore(); }
  const d = ease(an) * 300 * s; // afstand die de chromatiden afleggen
  MOD.forEach((m, i) => {
    const len = lenOf(m, KL.L * s), cen = cenOf(m), w = KL.w * s * lerp(0.9, 1, c);
    const y0 = cy + m.py[0] * s, x0 = cx + m.py[1] * s * 2.2; // plek in de kern
    const xm = cx, ym = cy + MY[i] * s;                      // plek in het equatorvlak
    const x = lerp(x0, xm, ease(me)), y = lerp(y0, ym, ease(me));
    const kl = CD[m.k], mijn = onsPaar(m) ? hl : 0;
    if (an <= 0.001) {
      // trekdraden naar beide kinetochoren
      if (sp > 0.05 && nm > 0.6) { const ad = clamp((nm - 0.6) / 0.4, 0, 1) * ease(sp); cdDraad(ctx, pl, cy, x - w * 1.15, y, ad); cdDraad(ctx, pr, cy, x + w * 1.15, y, ad); }
      if (c < 0.999) cdKluwen(ctx, x, y, len, { c, dubbel: true, w, cen, kl, seed: i * 5 + 3, R: len * 0.42, hl: mijn });
      else cdChromosoom(ctx, x, y, len, { w, cen, kl, kin: nm > 0.6, hl: mijn });
    } else {
      // anafase: centromeer vóórop, armen slepen; telofase: ontrollen (alpha omlaag, draad terug)
      const yy = lerp(ym, cy + MY[i] * s * 0.55, ease(an));
      cdDraad(ctx, pl, cy, xm - d - w * 0.7, yy, 1 - ease(te)); cdDraad(ctx, pr, cy, xm + d + w * 0.7, yy, 1 - ease(te));
      const zw = 0.85 * Math.sin(Math.PI * clamp(an, 0, 1)) + 0.25 * ease(an) * (1 - ease(te));
      for (const sx of [-1, 1]) {
        const xx = xm + sx * (w * 0.55 + d);
        if (te < 0.5) cdEen(ctx, xx, yy, len, { w, cen, kant: -sx, zwaai: zw, kl, kin: te < 0.2, a: 1 - te * 0.6 });
        if (te > 0.2) { const P = cdPad(xx, yy, len, 0, { cen }); const K = _cdKronkel(P.length, i * 7 + (sx > 0 ? 3 : 0), len * 0.42).map(q => [xx + q[0] * 0.7, yy + q[1] * 0.7]);
          ctx.save(); ctx.globalAlpha *= ease((te - 0.2) / 0.8); dnaDraad(ctx, K, { w: 3, kleur: kl, donker: _cdk(kl) }); ctx.restore(); }
      }
      if (mijn > 0.01 && te < 0.6) for (const sx of [-1, 1]) { ctx.save(); ctx.globalAlpha *= mijn * (1 - te); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(xm + sx * (d + w), yy + len * (0.5 - cen), w * 2.2 + 40 * zw, len * 0.6, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    }
  });
  if (sp > 0.05 && an > 0.001 && te < 0.9) for (let k = -2; k <= 2; k++) cdDraad(ctx, pl, cy, pr, cy + k * 22 * s, 0.3 * (1 - te));
  return { pl, pr };
}

// ---- meiosecel: paren tegen elkaar (st.pa), crossing-over (st.co), in het equatorvlak als paren (st.eq), uit elkaar (st.an)
const COSEG = { L: { v: [[0, 0.68, CD.vader], [0.68, 1, CD.moeder]], m: [[0, 0.68, CD.moeder], [0.68, 1, CD.vader]] }, K: { v: [[0, 0.6, CD.vader], [0.6, 1, CD.moeder]], m: [[0, 0.6, CD.moeder], [0.6, 1, CD.vader]] } };
// volgorde in het equatorvlak (meiose I): lange paar vader links, korte paar moeder links (toeval)
const M1 = [{ p: 'L', links: 'vader', y: -110 }, { p: 'K', links: 'moeder', y: 130 }];
function meioseCel(ctx, cx, cy, st, t) {
  const { pa = 1, co = 0, eq = 1, an = 0, sp = 1, hl = 0, ins = 0, s = 1 } = st;
  const rx = 560 * s, ry = 340 * s; cdCel(ctx, cx, cy, rx + 30 * ease(an) * s, ry, { insnoer: ins, t });
  const pol = 470 * s + 40 * s * ease(an), pl = cx - pol, pr = cx + pol; cdPool(ctx, pl, cy, ease(sp)); cdPool(ctx, pr, cy, ease(sp));
  const w = KL.w * s, d = ease(an) * 270 * s;
  M1.forEach((P, j) => {
    const len = P.p === 'L' ? KL.L * s : KL.L * 0.62 * s, cen = P.p === 'L' ? 0.38 : 0.30;
    const startY = cy + (j ? 80 : -60) * s, startX = cx + (j ? 160 : -170) * s; // los in de cel (begin profase I)
    const y = lerp(startY, cy + P.y * s, ease(eq)), xm = lerp(startX, cx, ease(eq));
    const gap = lerp(140 * s, w * 1.15 + 4, ease(pa)); // afstand tussen de homologen
    const left = P.links, right = left === 'vader' ? 'moeder' : 'vader';
    const segL = co > 0.5 ? (left === 'vader' ? { L: [[0, 1, CD.vader]], R: COSEG[P.p].v } : { L: COSEG[P.p].m, R: [[0, 1, CD.moeder]] }) : null;
    const segR = co > 0.5 ? (right === 'vader' ? { L: COSEG[P.p].v, R: [[0, 1, CD.vader]] } : { L: [[0, 1, CD.moeder]], R: COSEG[P.p].m }) : null;
    // de buitenste chromatide blijft één kleur; de binnenste (naar de homoloog toe) krijgt het geruilde stuk
    const xl = xm - gap - d, xr = xm + gap + d;
    if (sp > 0.05 && eq > 0.5) { const ad = ease(sp) * clamp((eq - 0.5) * 2, 0, 1); cdDraad(ctx, pl, cy, xl - w * 1.15, y, ad); cdDraad(ctx, pr, cy, xr + w * 1.15, y, ad); }
    const zw = 0.6 * Math.sin(Math.PI * clamp(an, 0, 1)) + 0.2 * ease(an);
    const oL = cdChromosoom(ctx, xl, y, len, { w, cen, kl: CD[left], segsL: segL ? segL.L : null, segsR: segL ? segL.R : null, kin: eq > 0.5, hl: P.p === 'L' ? hl : 0, rot: 0 });
    cdChromosoom(ctx, xr, y, len, { w, cen, kl: CD[right], segsL: segR ? segR.L : null, segsR: segR ? segR.R : null, kin: eq > 0.5, hl: P.p === 'L' ? hl : 0 });
    // chiasma (het kruispunt) zichtbaar tijdens de crossing-over
    const ch = Math.sin(Math.PI * clamp(co, 0, 1)); if (ch > 0.02) { const yy = y - len * cen + (P.p === 'L' ? 0.68 : 0.6) * len; ctx.save(); ctx.globalAlpha *= ch; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xm, yy, w * 1.6, 0, 6.283); ctx.stroke();
      ctx.strokeStyle = CD[left]; ctx.lineWidth = w * 0.7; ctx.beginPath(); ctx.moveTo(xm - gap + w * 0.5, yy - w * 1.2); ctx.lineTo(xm + gap - w * 0.5, yy + w * 1.2); ctx.stroke(); ctx.strokeStyle = CD[right]; ctx.beginPath(); ctx.moveTo(xm + gap - w * 0.5, yy - w * 1.2); ctx.lineTo(xm - gap + w * 0.5, yy + w * 1.2); ctx.stroke(); ctx.restore(); }
  });
  if (eq > 0.5) { ctx.save(); ctx.globalAlpha *= clamp((eq - 0.5) * 2, 0, 1) * (1 - ease(an)); ctx.setLineDash([8, 9]); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy - 300 * s); ctx.lineTo(cx, cy + 300 * s); ctx.stroke(); ctx.restore(); }
  return { pl, pr };
}
// kleurinhoud van een cel na meiose I (links = cel met lange vader-gemengd en korte moeder-gemengd)
const NA_M1 = { links: [{ p: 'L', kl: 'vader', sL: [[0, 1, CD.vader]], sR: COSEG.L.v }, { p: 'K', kl: 'moeder', sL: COSEG.K.m, sR: [[0, 1, CD.moeder]] }],
  rechts: [{ p: 'L', kl: 'moeder', sL: COSEG.L.m, sR: [[0, 1, CD.moeder]] }, { p: 'K', kl: 'vader', sL: [[0, 1, CD.vader]], sR: COSEG.K.v }] };

Object.assign(SCENES, {
  title(ctx, t) { cdCel(ctx, 1450, 520, 300, 220, { insnoer: 0.45 + 0.1 * Math.sin(t * 0.8), t }); for (const sx of [-1, 1]) { cdEen(ctx, 1450 + sx * 120, 470, 120, { w: 14, kl: CD.vader, kant: -sx }); cdEen(ctx, 1450 + sx * 120, 590, 76, { w: 14, kl: CD.moeder, kant: -sx, cen: 0.3 }); } },

  // ---------------- Cold open
  s01(ctx, t, q) {
    bg(ctx, 'schema');
    const human1 = ramp(t, q.at('tientallen'), 0.8);
    const g = clamp((t - q.at('Nu')) / 2.0, 0, 1) * 6;
    cellSwarm(ctx, 600, 470, g, 180, 1 - human1);
    pill(ctx, 600, 820, 'een bevruchte eicel', C.grain, fadeIO(t, 0.3, q.at('Nu'), 0.4), 26);
    if (human1 > 0) { ctx.save(); ctx.globalAlpha = human1; persoon(ctx, 'noor', 600, 830, 600, { uit: 'blij', t }); ctx.restore(); pill(ctx, 600, 170, 'tientallen biljoenen cellen', C.goud, human1 * (1 - ramp(t, q.at('Elke', 2), 0.4)), 32); }
    const z = ramp(t, q.at('bijna'), 0.7);
    zoomCircle(ctx, 1360, 440, 300, 640, 520, 'één cel · één kern', z * (1 - ramp(t, q.at('Elke', 2), 0.5)), () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1060, 140, 600, 600);
      kernChromatine(ctx, 1360, 440, 230, { c: 0, seed: 4, kleuren: (i) => i === 0 ? CD.vader : i === 1 ? CD.moeder : C.kernR }); });
    if (z > 0) pill(ctx, 1360, 845, 'uitgerekt 2 meter DNA, in een kern van een paar micrometer', C.paars, ramp(t, q.at('meter'), 0.5) * (1 - ramp(t, q.at('Elke', 2), 0.5)), 24);
    const dv = ramp(t, q.at('Elke', 2), 0.6); if (dv > 0) { ctx.save(); ctx.globalAlpha = dv;
      cdCel(ctx, 1360, 470, 330, 230, { insnoer: 0.8 * ramp(t, q.at('Elke', 2) + 0.3, 1.6), t }); if (!vragenUit2()) for (const sx of [-1, 1]) text(ctx, '?', 1360 + sx * 150, 500, fTitel(90), C.goud, 'center'); ctx.restore();
      pill(ctx, 1360, 800, 'geen stukje te veel, geen stukje te weinig', C.goud, ramp(t, q.at('Geen'), 0.4), 26); }
  },

  // ---------------- H1 Waarom delen?
  s04(ctx, t, q) {
    micro2(ctx);
    const tGr = q.at('groeien'), tHe = q.at('herstellen'), tVe = q.at('vervangen'), tOn = q.at('Onderin'), tBe = q.at('beenmerg');
    // 0: groeien (cellen delen), 1: huid van Noor (schaafwond, basale laag), 2: beenmerg
    const A0 = fadeIO(t, -1, tHe, 0.5), A1 = fadeIO(t, tHe, tBe, 0.5), A2 = ramp(t, tBe, 0.5);
    pill(ctx, 960, 130, 'eerst kopiëren, dan verdelen', C.goud, fadeIO(t, 0, q.at('waarom'), 0.4), 32);
    if (A0 > 0.01) { ctx.save(); ctx.globalAlpha *= A0; cellSwarm(ctx, 960, 470, clamp((t - tGr) / 3, 0, 1) * 5 + (t > tGr ? 0 : 0), 230, 1); pill(ctx, 960, 820, 'groeien: van één cel naar een heel mens', C.groen, ramp(t, tGr, 0.4), 28); ctx.restore(); }
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1;
      // onderarm van Noor met schaafwond, zoomcirkel naar de huid (doorsnede, basale laag deelt)
      onderarm(ctx, 330, 470, 13, { id: 'noor', kijk: 1 });
      const wx = 520, wy = 470; ctx.save(); ctx.globalAlpha *= 0.85 * (1 - 0.6 * ramp(t, tHe + 1.5, 4)); ctx.beginPath(); ctx.ellipse(wx, wy, 30, 14, 0.2, 0, 6.283); ctx.fillStyle = '#B5574A'; ctx.fill(); ctx.restore();
      zoomCircle(ctx, 1260, 450, 330, wx, wy, 'huid · doorsnede', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(930, 120, 660, 660); ctx.save(); ctx.translate(930, 230); huidDoorsnede(ctx, 0, 0, 660, 460, { um: 160, mel: 1, deling: 1, seed: 7, t }); ctx.restore();
        // dode cellen schilferen bovenaan af
        const sh = ramp(t, tOn, 0.5); if (sh > 0) for (let k = 0; k < 5; k++) { const u = ((t * 0.18 + k / 5) % 1); ctx.save(); ctx.globalAlpha *= sh * (1 - u); ctx.translate(980 + k * 120, 250 - u * 80); ctx.rotate(u * 0.6); roundRect(ctx, -34, -6, 68, 12, 5); shape(ctx, '#D9C2A0', null); ctx.restore(); } });
      naamBij(ctx, 'schaafwond', 'cellen aan de rand delen', wx, wy + 90, ramp(t, q.at('schaafwond'), 0.4) * (1 - ramp(t, tOn, 0.4)), 'center', C.koraal);
      naamBij(ctx, 'onderin: cellen delen', 'de basale laag', 1260, 820, ramp(t, tOn, 0.4), 'center', C.groen);
      naamBij(ctx, 'bovenaan slijten dode cellen af', null, 1260, 92, ramp(t, q.at('bovenaan'), 0.4), 'center');
      ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; for (let k = 0; k < 40; k++) { const u = ((t * 0.2 + hash(k) * 3) % 1); rodeBloedcel(ctx, 300 + hash(k * 3) * 1320, 200 + u * 520, 26, hash(k) * 6, k % 3 === 0 ? 1 : 0, 0.85); }
      ctx.restore(); pill(ctx, 960, 820, 'in je beenmerg: elke seconde zo\'n 2 miljoen nieuwe rode bloedcellen', C.koraal, ramp(t, tBe + 0.2, 0.4), 28); }
    meta2(ctx, 'schematisch · niet op schaal');
  },
  s05(ctx, t, q) {
    micro2(ctx);
    const tWa = q.at('Waarom'), tZo = q.at('Zo');
    const ec = 1 - ramp(t, tWa, 0.5);
    if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec; vpEencellige(ctx, 960, 470, ramp(t, q.at('worden'), 2.2), t); pill(ctx, 960, 780, 'eencellige: uit één cel worden er twee', C.goud, ramp(t, 0.3, 0.4), 28); ctx.restore(); }
    const big = ramp(t, tWa, 0.5) * (1 - ramp(t, tZo, 0.6));
    if (big > 0.01) { ctx.save(); ctx.globalAlpha = big; const r = lerp(140, 320, ramp(t, q.at('groter'), 2.5));
      cdCel(ctx, 960, 480, r, r * 0.95, { t }); ctx.beginPath(); ctx.arc(960 + r * 0.12, 470, r * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.3); ctx.fill();
      const ox = ramp(t, q.at('weg'), 0.5); if (ox > 0) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.2832; const u = ((t * 0.25 + k / 8) % 1); o2(ctx, 960 + Math.cos(a) * lerp(r + 60, r * 0.4, u), 480 + Math.sin(a) * lerp(r + 60, r * 0.4, u) * 0.95, 1, ox * (1 - u * 0.6)); }
      const mid = ramp(t, q.at('midden'), 0.5); if (mid > 0) { ctx.save(); ctx.globalAlpha *= mid; ctx.beginPath(); ctx.arc(960, 480, r * 0.3, 0, 6.2832); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); naamBij(ctx, 'het midden', 'krijgt te laat zuurstof', 960, 480 + r + 60, mid, 'center', C.koraal); }
      pill(ctx, 960, 130, 'hoe groter de cel, hoe verder de weg voor diffusie', C.teal, ramp(t, q.at('Hoe'), 0.4) * (1 - ramp(t, q.at('midden'), 0.3)), 26); ctx.restore(); }
    const two = ramp(t, tZo, 0.6); if (two > 0) { ctx.save(); ctx.globalAlpha = two; cdCel(ctx, 960, 480, 320, 220, { insnoer: 0.85 * ramp(t, q.at('deelt'), 1.6), t }); ctx.restore(); pill(ctx, 960, 800, 'een gegroeide cel deelt in tweeën: cellen blijven klein', C.groen, ramp(t, q.at('gegroeid'), 0.4), 28); }
    meta2(ctx, 'schematisch · niet op schaal');
  },

  // ---------------- H2 Celcyclus (ring uit 1.4, met kleuren van Part C)
  s06(ctx, t, q) { bg(ctx, 'schema'); cycleRing(ctx, t, q, { phase: 'intro' }); },
  s08(ctx, t, q) {
    bg(ctx, 'schema'); cycleRing(ctx, t, q, { phase: 'copy' });
    const a = ramp(t, q.at('dubbel'), 0.5); if (a > 0) { ctx.save(); ctx.globalAlpha = a; cdKluwen(ctx, 1380, 470, 150, { c: 0, dubbel: false, w: 14, kl: CD.vader, seed: 3, R: 70 }); cdKluwen(ctx, 1640, 470, 150, { c: 0, dubbel: true, w: 14, kl: CD.vader, seed: 3, R: 70 }); arrow(ctx, 1460, 470, 1560, 470, C.goud, 4, 16); metaText(ctx, 'na het kopiëren: dubbel', 1510, 600, C.grain, 'center', 22); ctx.restore(); }
    pill(ctx, 1500, 780, 'zie de film DNA kopiëren', C.paars, ramp(t, q.at('film'), 0.4), 26);
  },
  s09(ctx, t, q) {
    bg(ctx, 'schema'); cycleRing(ctx, t, q, { phase: 'g1sg2' });
    // de draad wordt dubbel in de S-fase (morph), rechtsonder
    const d = ramp(t, q.at('draad'), 1.4) * (1 - ramp(t, q.at('G2'), 0.5)); if (d > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, d * 3); const P = _cdKronkel(24, 9, 60).map(p => [1390 + p[0], 760 + p[1]]); dnaDraad(ctx, P, { w: 4, kleur: CD.vader, donker: _cdk(CD.vader) }); ctx.globalAlpha *= d; dnaDraad(ctx, P.map(p => [p[0] + 7, p[1] + 8]), { w: 4, kleur: CD.vader, donker: _cdk(CD.vader) }); ctx.restore(); metaText(ctx, 'één draad → dubbele draad', 1390, 860, C.grain, 'center', 22); }
  },
  s10(ctx, t, q) { bg(ctx, 'schema'); cycleRing(ctx, t, q, { phase: 'check' }); },

  // ---------------- H3 Chromosomen tellen
  s11(ctx, t, q) {
    micro2(ctx);
    const tZe = q.at('zesenveertig'), tVa = q.at('vader'), tHo = q.at('homologe');
    const kl = (i) => (i === 0 ? CD.vader : i === 1 ? CD.moeder : '#7E6FB0');
    const pa = ramp(t, tVa, 0.6);
    kernChromatine(ctx, 700, 470, 340, { c: 0, seed: 4, kleuren: (i) => pa > 0.3 ? kl(i) : (i < 2 ? '#9C8FD0' : '#7E6FB0') });
    naamBij(ctx, 'chromatine', 'DNA los in de kern', 1080, 300, ramp(t, q.at('chromatine'), 0.4), 'left');
    naamBij(ctx, 'één draad = één chromosoom', null, 1080, 380, ramp(t, q.at('Elke'), 0.4), 'left');
    const c46 = ramp(t, tZe, 0.5); if (c46 > 0) { ctx.save(); ctx.globalAlpha *= c46; text(ctx, '46', 1260, 520, fTitel(110), C.goud, 'center'); metaText(ctx, 'chromosomen · 23 paren', 1260, 570, C.grain, 'center', 24); ctx.restore(); }
    if (pa > 0) { naamBij(ctx, 'van je vader', null, 1080, 660, pa, 'left', CD.vader); naamBij(ctx, 'van je moeder', null, 1080, 710, pa, 'left', CD.moeder); }
    pill(ctx, 960, 830, 'homologe chromosomen: even lang, dezelfde genen op dezelfde plekken', C.goud, ramp(t, tHo, 0.4), 26);
    meta2(ctx, 'kern · ± 6 micrometer · draden niet op schaal');
  },
  s12(ctx, t, q) {
    micro2(ctx); const xy = ramp(t, q.at('XY'), 0.6);
    karyo(ctx, 280, 220, 1360, 420, { alpha: 1, hl: ramp(t, q.at('geslachtschromosomen'), 0.4) > 0 ? [22] : null, sex: xy > 0.5 ? 'XY' : 'XX' });
    pill(ctx, 960, 150, '22 paren autosomen: bij mannen en vrouwen hetzelfde', C.grain, fadeIO(t, 0, q.at('drieëntwintigste'), 0.4), 28);
    const g = ramp(t, q.at('geslachtschromosomen'), 0.5); if (g > 0) { ctx.save(); ctx.globalAlpha = g; text(ctx, 'vrouw: XX', 800, 760, fTekst(36, 600), xy > 0.5 ? C.text2 : C.text, 'left'); text(ctx, 'man: XY', 1180, 760, fTekst(36, 600), xy > 0.5 ? C.text : C.text2, 'left'); ctx.restore(); }
    meta2(ctx, 'karyogram · schematisch');
  },
  s13(ctx, t, q) {
    micro2(ctx);
    const tRo = q.at('rolt'), tGe = q.at('gekopieerd'), tCh = q.at('chromatiden'), tCe = q.at('centromeer'), tLe = q.at('Let'), tPa = q.at('paar'), tX2 = q.at('X-vorm', 2), tDe = q.at('Deze');
    const p1 = 1 - ramp(t, tLe, 0.6), p2 = ramp(t, tLe, 0.6) * (1 - ramp(t, tDe, 0.6)), p3 = ramp(t, tDe, 0.6);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      // het gevolgde chromosoom (vaderskant): dubbele draad die condenseert tot een X-vorm (morph)
      const c = ramp(t, tRo, 3.2);
      cdKluwen(ctx, 960, 450, 380, { c, dubbel: true, w: 40, kl: CD.vader, seed: 11, R: 190 });
      naamBij(ctx, 'chromatide', null, 960 - 120, 270, ramp(t, tCh, 0.5), 'right'); naamBij(ctx, 'chromatide', null, 960 + 120, 270, ramp(t, tCh, 0.5), 'left');
      naamBij(ctx, 'centromeer', null, 1030, 465, ramp(t, tCe, 0.5), 'left');
      pill(ctx, 960, 820, 'het DNA is al gekopieerd: twee gelijke helften', C.goud, fadeIO(t, tGe, q.at('X-vorm'), 0.4), 28);
      pill(ctx, 960, 820, 'X-vorm: één chromosoom met twee chromatiden', C.goud, ramp(t, q.at('X-vorm'), 0.4), 28);
      metaText(ctx, 'onder de microscoop zichtbaar', 960, 130, C.grain, 'center', 24); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      pill(ctx, 960, 130, 'twee soorten twee', C.goud, 1, 34);
      const pa = ramp(t, tPa, 0.5), xa = ramp(t, tX2, 0.5);
      ctx.save(); ctx.globalAlpha *= pa; roundRect(ctx, 180, 220, 700, 540, 16); shape(ctx, rgba(C.fill, 0.55), C.line, 1); cdChromosoom(ctx, 450, 430, 240, { w: 26, kl: CD.vader, hl: 1 }); cdChromosoom(ctx, 610, 430, 240, { w: 26, kl: CD.moeder, hl: 1 }); text(ctx, 'een paar = 2 chromosomen', 530, 690, fTekst(34, 600), C.text, 'center'); metaText(ctx, 'één van vaderskant, één van moederskant', 530, 730, C.grain, 'center', 20); ctx.restore();
      ctx.save(); ctx.globalAlpha *= xa; roundRect(ctx, 1040, 220, 700, 540, 16); shape(ctx, rgba(C.fill, 0.55), C.line, 1); cdChromosoom(ctx, 1390, 430, 240, { w: 26, kl: CD.vader }); text(ctx, 'een X-vorm = 1 chromosoom', 1390, 690, fTekst(34, 600), C.text, 'center'); metaText(ctx, 'met 2 gelijke chromatiden', 1390, 730, C.grain, 'center', 20); ctx.restore();
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; mitoseCel(ctx, 960, 470, { c: 1, nm: 0.2, sp: 0, me: 0, s: 0.95 }, t); ctx.restore(); }
    meta2(ctx, 'model · niet op schaal');
  },
  s15(ctx, t, q) {
    micro2(ctx); const hum = ramp(t, q.at('mens'), 0.6), tc = q.at('centromeren');
    ctx.save(); ctx.globalAlpha = 1 - hum; mitoseCel(ctx, 960, 470, { c: 1, nm: 0.2, sp: 0, me: 0, s: 0.95 }, t);
    MOD.forEach((m, i) => { const a = ramp(t, tc + 0.3 + i * 0.35, 0.25); if (a <= 0) return; const x = 960 + m.py[1] * 0.95 * 2.2, y = 470 + m.py[0] * 0.95; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 18, 0, 6.2832); ctx.stroke(); text(ctx, String(i + 1), x + 30, y - 18, fTekst(36, 700), C.goud, 'left'); ctx.restore(); });
    pill(ctx, 960, 830, 'modelcel: 4 centromeren = 4 chromosomen, in 2 paren', C.goud, ramp(t, q.at('modelcel'), 0.4), 28); ctx.restore();
    cdTeller(ctx, [['model', '4 · 8'], ['mens', '46 · 92', C.goud]], ramp(t, tc, 0.4) * (1 - hum), 1560, 150);
    if (hum > 0) { ctx.save(); ctx.globalAlpha = hum; text(ctx, '46', 720, 470, fTitel(150), C.goud, 'center'); metaText(ctx, 'chromosomen', 720, 540, C.grain, 'center', 28); text(ctx, '92', 1200, 470, fTitel(150), C.paars, 'center'); metaText(ctx, 'chromatiden', 1200, 540, C.grain, 'center', 28); metaText(ctx, 'een menselijke cel, begin van de mitose', 960, 700, C.text2, 'center', 24); ctx.restore(); }
    meta2(ctx, 'model · 2n = 4');
  },

  // ---------------- H4 Mitose: één doorlopende cel
  s16(ctx, t, q) {
    micro2(ctx);
    const tPr = q.at('Profase'), tRo = q.at('rollen'), tTr = q.at('trekdraden'), tKm = q.at('kernmembraan'), tMe = q.at('Metafase'), tTk = q.at('trekken'), tEq = q.at('equatorvlak'), tCe = q.at('centromeer'), tPa = q.at('paar');
    const st = { c: 0.15 + 0.85 * ramp(t, tRo, 2.6), nm: ramp(t, tKm, 1.4), sp: ramp(t, tTr, 1.8), me: ramp(t, tTk, 2.4), hl: ramp(t, tPa, 0.5) };
    mitoseCel(ctx, 960, 470, st, t);
    pill(ctx, 960, 92, 'profase', C.goud, fadeIO(t, tPr, tMe, 0.3), 34); pill(ctx, 960, 92, 'metafase', C.goud, ramp(t, tMe, 0.3), 34);
    naamBij(ctx, 'ons paar', 'vaderskant · moederskant', 1260, 300, fadeIO(t, tPa, tPr, 0.4), 'left', C.goud);
    naamBij(ctx, 'pool', null, 960 - 470, 400, fadeIO(t, q.at('polen'), q.at('spoelfiguur') + 1, 0.4), 'center');
    naamBij(ctx, 'spoelfiguur', 'trekdraden vanuit de twee polen', 960, 860, fadeIO(t, q.at('spoelfiguur'), tMe, 0.4), 'center');
    naamBij(ctx, 'kernmembraan', 'valt uit elkaar', 1300, 220, fadeIO(t, tKm, tMe, 0.4), 'left');
    naamBij(ctx, 'equatorvlak', null, 990, 860, ramp(t, tEq, 0.5), 'left', C.goud);
    pill(ctx, 960, 92, '', C.goud, 0, 30);
    meta2(ctx, 'model · 2n = 4 · niet op schaal');
  },
  e01(ctx, t, q) {
    micro2(ctx);
    const tKi = q.at('kinetochoren'), tTr = q.at('trekdraden'), tHa = q.at('Hangt'), tTe = q.at('tegen'), tHn = q.at('Hangen'), tLo = q.at('los'), tWa = q.at('wachtsignaal'), tPa = q.at('Pas'), tKn = q.at('knipt'), tCo = q.at('cohesine'), tGi = q.at('gif');
    const PL = [250, 470], PR = [1670, 470], cx0 = 960, cy = 470;
    const fout = ramp(t, tHn, 0.8) * (1 - ramp(t, tLo + 0.4, 0.8)); // beide aan dezelfde pool
    const losR = ramp(t, tLo, 0.8) * (1 - ramp(t, tPa, 0.8));
    const gif = ramp(t, tGi, 0.8);
    const tens = ramp(t, tTe, 0.8) * (1 - ramp(t, tHn, 0.5)) + ramp(t, tPa + 0.3, 0.8) * (1 - gif);
    const cut = ramp(t, tKn + 0.4, 1.2) * (1 - gif);
    const cx = cx0 - 120 * fout;
    cdPool(ctx, PL[0], PL[1], 1); cdPool(ctx, PR[0], PR[1], 1);
    const L = 420, w = 44, gap = w * 0.55 + tens * 12;
    const kL = [cx - gap - w * 0.62, cy], kR = [cx + gap + w * 0.62, cy];
    const attL = ramp(t, tTr, 1.2) * (1 - gif), attR = ramp(t, tTr + 0.5, 1.2) * (1 - fout) * (1 - losR) * (1 - gif) + ramp(t, tPa, 0.8) * (1 - gif) * 0;
    const rechtsGoed = (t < tHn ? attR : 0) + ramp(t, tPa, 0.8) * (1 - gif);
    for (let k = -2; k <= 2; k++) { cdDraad(ctx, PL[0], PL[1], kL[0], kL[1] + k * 6, attL, CD.draad, 2); cdDraad(ctx, PR[0], PR[1], kR[0], kR[1] + k * 6, clamp(rechtsGoed, 0, 1), CD.draad, 2); }
    // foute draad: van de linkerpool naar het rechterkinetochoor, met een boog
    if (fout > 0.01) { ctx.save(); ctx.globalAlpha *= fout; ctx.strokeStyle = C.koraal; ctx.lineWidth = 2.2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(PL[0], PL[1]); ctx.bezierCurveTo(PL[0] + 300, cy - 300, kR[0] + 120, cy - 240 + k * 8, kR[0], kR[1] + k * 6); ctx.stroke(); } ctx.restore(); }
    cdChromosoom(ctx, cx, cy, L, { w, kl: CD.moeder, kin: ramp(t, tKi, 0.5) > 0.5, ringen: 1 - cut, uiteen: 0 });
    if (tens > 0.05) { arrow(ctx, kL[0] - 30, cy + 170, kL[0] - 150, cy + 170, C.goud, 5, 18, Math.min(1, tens) * (t < tHn ? 1 : 0)); arrow(ctx, kR[0] + 30, cy + 170, kR[0] + 150, cy + 170, C.goud, 5, 18, Math.min(1, tens) * (t < tHn ? 1 : 0)); }
    naamBij(ctx, 'kinetochoor', 'eiwitplaatje, één per chromatide', kL[0] - 40, cy - 60, fadeIO(t, tKi, tHa, 0.4), 'right', C.text);
    naamBij(ctx, 'centromeer onder spanning', null, cx + 80, cy + 250, fadeIO(t, q.at('spanning'), tHn, 0.4), 'left', C.groen);
    naamBij(ctx, 'geen spanning: draden laten los', null, cx + 80, cy + 250, fadeIO(t, tHn + 1, tLo + 1, 0.4), 'left', C.koraal);
    const blink = losR > 0.01 && t < tPa; if (blink) { const ww = (t * 1.6) % 1; ctx.save(); ctx.globalAlpha *= losR; ctx.strokeStyle = rgba(C.koraal, 1 - ww); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(kR[0], cy, 20 + ww * 80, 0, 6.283); ctx.stroke(); ctx.restore(); naamBij(ctx, 'los kinetochoor: wachtsignaal', null, kR[0] + 60, cy - 80, losR, 'left', C.koraal); }
    naamBij(ctx, 'cohesine', 'eiwitringen', cx + 90, cy - 150, fadeIO(t, tKn, tGi, 0.4), 'left', C.grain);
    if (cut > 0.05 && cut < 0.98) { ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * cut); for (const f of [0.12, 0.52, 0.86]) { const yy = cy - L * 0.38 + f * L; ctx.beginPath(); ctx.moveTo(cx + 40, yy); ctx.arc(cx + 40, yy, 14, 0.5, 5.8); ctx.closePath(); ctx.fillStyle = C.groen; ctx.fill(); } ctx.restore(); naamBij(ctx, 'een enzym knipt', null, cx + 90, cy + 120, Math.sin(Math.PI * cut), 'left', C.groen); }
    if (gif > 0.01) { ctx.save(); ctx.globalAlpha *= gif; for (let k = 0; k < 26; k++) { const a = hash(k) * 6.2832, dd = 60 + hash(k + 50) * 80; for (const P of [PL, PR]) dot0(ctx, P[0] + Math.cos(a + t * 0.3) * dd, P[1] + Math.sin(a + t * 0.3) * dd, 4, C.koraal); } ctx.restore();
      pill(ctx, 960, 830, 'gif: trekdraden kunnen niet aanhaken', C.koraal, gif, 28); if (!vragenUit2()) { const qa = ramp(t, tGi + 2.5, 0.5); if (qa > 0) text(ctx, '?', 1300, 360, fTitel(160), rgba(C.goud, qa), 'center'); } }
    meta2(ctx, 'één chromosoom vergroot · schematisch');
  },
  e03(ctx, t, q) {
    micro2(ctx);
    const tKa = q.at('kanker'), tTr = q.at('trekken'), tKo = q.at('korter'), tAf = q.at('afgebroken'), tHo = q.at('houdt'), tTe = q.at('Terug');
    const close = 1 - ramp(t, tTr, 0.7);
    if (close > 0.01) { ctx.save(); ctx.globalAlpha *= close;
      mitoseCel(ctx, 960, 470, { c: 1, nm: 1, sp: 1, me: 1 * 0.0, s: 0.9 }, t);
      MOD.forEach((m, i) => { const x = 960 + m.py[1] * 0.9 * 2.2, y = 470 + m.py[0] * 0.9; const ww = ((t * 1.4) + i * 0.25) % 1; ctx.save(); ctx.strokeStyle = rgba(C.koraal, 1 - ww); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 14 + ww * 50, 0, 6.2832); ctx.stroke(); ctx.restore(); });
      pill(ctx, 960, 92, 'alle kinetochoren los: de cel blijft wachten in de metafase', C.koraal, 1, 28);
      pill(ctx, 960, 830, 'sommige middelen tegen kanker: de deling stopt', C.paars, ramp(t, tKa, 0.5), 28);
      ctx.restore(); }
    const ana = ramp(t, tTr, 0.7);
    if (ana > 0.01) { ctx.save(); ctx.globalAlpha *= ana * (1 - ramp(t, tTe + 0.2, 0.6));
      const P = [220, 470]; cdPool(ctx, P[0], P[1], 1); metaText(ctx, 'pool', 220, 560, C.grain, 'center', 24);
      const x0 = 1180, x1 = 600, u = clamp((t - tKo) / (tTe - tKo), 0, 1), xk = x0 + (x1 - x0) * ease(u);
      cdEen(ctx, xk + 26, 470, 320, { w: 32, kl: CD.moeder, kant: 1, zwaai: 0.6, kin: true });
      const B = 24; [452, 470, 488].forEach((y, j) => { const n = Math.floor((xk - P[0] - 10) / B); for (let i = 0; i < n; i++) { const bx = P[0] + 12 + i * B; roundRect(ctx, bx, y - 6, B - 4, 12, 4); shape(ctx, rgba(C.spoel, 0.9), null); }
        const nMax = Math.floor((x0 - P[0] - 10) / B); for (let i = n; i < nMax; i++) { const xr = P[0] + 10 + (i + 1) * B; const ur = (xr - x0) / (x1 - x0); const tr = tKo + ur * (tTe - tKo); const age = t - tr; if (age < 0 || age > 1.6) continue; const dx = (hash(i * 7 + j) - 0.3) * 60 * age, dy = (hash(i * 9 + j) - 0.5) * 90 * age; dot0(ctx, P[0] + 12 + i * B + dx + 8, y + dy, 5, rgba(C.spoel, 0.8 * (1 - age / 1.6))); } });
      const ge = fadeIO(t, tAf - 0.6, tHo + 1.0, 0.4); if (ge > 0) { ctx.save(); ctx.globalAlpha *= ge; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xk - 6, 470, 44, 0, 6.2832); ctx.stroke(); ctx.restore(); }
      naamBij(ctx, 'trekdraad', 'rijtje eiwitblokjes', 520, 400, fadeIO(t, tTr + 0.4, tAf - 0.6, 0.4) * (xk > 700 ? 1 : 0), 'center');
      naamBij(ctx, 'afbreken', 'bij het kinetochoor', xk - 60, 600, fadeIO(t, tAf - 0.6, tHo, 0.4), 'right', C.goud);
      naamBij(ctx, 'kinetochoor', 'houdt het uiteinde vast', xk - 40, 400, fadeIO(t, tHo, tTe, 0.4), 'right', C.goud);
      pill(ctx, 960, 92, 'draad wordt korter → chromatide gaat mee naar de pool', C.text, fadeIO(t, tKo, tTe, 0.5), 28);
      ctx.restore(); }
    pill(ctx, 960, 470, 'terug naar de hoofdlijn', C.goud, ramp(t, tTe + 0.4, 0.5), 34);
    meta2(ctx, 'schematisch · niet op schaal');
  },
  s17(ctx, t, q) {
    micro2(ctx);
    const tAn = q.at('trekken'), tKi = q.at('Kijk'), tLi = q.at('links'), tMo = q.at('moederskant'), tVa = q.at('Vanaf'), tEv = q.at('Even'), tTf = q.at('Telofase'), tKm = q.at('kernmembraan'), tOn = q.at('Ondertussen'), tDo = q.at('dochtercellen'), tPl = q.at('plantencel'), tCp = q.at('celplaat');
    const plant = ramp(t, tPl, 0.6);
    const st = { c: 1, nm: 1, sp: 1, me: 1, an: ramp(t, tAn, 3.0), te: ramp(t, tKm, 2.2), cy: 0.9 * ramp(t, tOn, 2.4), hl: ramp(t, tKi, 0.4) * (1 - ramp(t, tVa + 1, 0.6)) };
    ctx.save(); ctx.globalAlpha = 1 - 0.88 * plant; mitoseCel(ctx, 960, 470, st, t); ctx.restore();
    pill(ctx, 960, 92, 'anafase', C.goud, fadeIO(t, 0, tTf, 0.3), 34); pill(ctx, 960, 92, 'telofase', C.goud, fadeIO(t, tTf, tOn, 0.3), 34); pill(ctx, 960, 92, 'cytokinese', C.goud, fadeIO(t, tOn, tPl, 0.3), 34);
    pill(ctx, 960, 860, 'centromeren splitsen', C.text, fadeIO(t, q.at('splitsen'), tKi, 0.4), 26);
    naamBij(ctx, 'van vaderskant: één chromatide naar elke pool', null, 960, 860, fadeIO(t, tKi + 1, tMo, 0.4), 'center', CD.vader);
    naamBij(ctx, 'van moederskant ook', null, 960, 860, fadeIO(t, tMo, tVa, 0.4), 'center', CD.moeder);
    pill(ctx, 960, 860, 'elke chromatide heet nu een chromosoom', C.text, fadeIO(t, tVa, tEv, 0.4), 26);
    pill(ctx, 960, 860, 'mens: even 92 chromosomen in één cel', C.goud, fadeIO(t, tEv, tTf, 0.4), 26);
    pill(ctx, 960, 860, 'twee dochtercellen', C.groen, fadeIO(t, tDo, tPl, 0.4), 28);
    if (plant > 0) { ctx.save(); ctx.globalAlpha = plant; const x0 = 960, y0 = 470; roundRect(ctx, x0 - 420, y0 - 240, 840, 480, 22); ctx.fillStyle = rgba(C.fill, 0.8); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 14; ctx.stroke();
      for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(x0 + sx * 220, y0, 90, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.2); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); }
      const cp = ramp(t, tCp, 1.4); ctx.strokeStyle = C.groen; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0 - 200 * cp); ctx.lineTo(x0, y0 + 200 * cp); ctx.stroke();
      for (let k = 0; k < 8; k++) { const yy = y0 - 180 + k * 52; if (Math.abs(yy - y0) < 200 * cp) continue; dot0(ctx, x0 + (hash(k) * 2 - 1) * 14, yy, 7, rgba(C.groen, 0.8)); }
      naamBij(ctx, 'celplaat', 'wordt een nieuwe celwand', x0, 190, ramp(t, tCp, 0.5), 'center', C.groen); metaText(ctx, 'plantencel', x0, y0 + 290, C.grain, 'center', 24); ctx.restore(); }
    meta2(ctx, 'model · 2n = 4 · niet op schaal');
  },
  s19(ctx, t, q) {
    micro2(ctx);
    for (const sx of [-1, 1]) { const cx = 960 + sx * 360; cdCel(ctx, cx, 470, 260, 230, { t, seed: sx + 4 }); ctx.beginPath(); ctx.arc(cx, 470, 160, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.16); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke();
      MOD.forEach((m, i) => cdEen(ctx, cx - 75 + i * 50, 470 + (m.p === 'L' ? -10 : 20), lenOf(m, 150), { w: 13, cen: cenOf(m), kl: CD[m.k] })); }
    cdTeller(ctx, [['dochtercel model', '4'], ['dochtercel mens', '46', C.goud]], ramp(t, 0.2, 0.4), 1560, 150);
    pill(ctx, 960, 830, 'van elk chromosoom één chromatide', C.text, ramp(t, q.at('chromatide'), 0.4), 28);
    metaText(ctx, 'opgerold getekend om te kunnen tellen', 960, 120, C.text2, 'center', 22);
    meta2(ctx, 'model · 2n = 4');
  },
  s20(ctx, t, q) {
    bg(ctx, 'schema');
    const pts = [[0, 1], [0.22, 1], [0.42, 2], [0.72, 2], [0.74, 1], [1, 1]];
    const pr = clamp((t - q.at('Noem')) / (q.at('weer') + 0.6 - q.at('Noem')), 0, 1);
    dnaGraph(ctx, 260, 180, 1400, 520, pts, pr, { labels: [{ s: 'G1', x: 0.11, a: ramp(t, q.at('Noem'), 0.4) }, { s: 'S: kopiëren', x: 0.32, a: ramp(t, q.at('verdubbelt'), 0.4) }, { s: 'G2', x: 0.57, a: ramp(t, q.at('verdubbelt'), 0.4) }, { s: 'mitose', x: 0.73, a: ramp(t, q.at('mitose'), 0.4) }, { s: 'G1', x: 0.87, a: ramp(t, q.at('mitose'), 0.4) }] });
    pill(ctx, 960, 800, 'niet gehalveerd: eerst verdubbeld, dan eerlijk verdeeld', C.groen, fadeIO(t, q.at('gehalveerd'), q.at('dochtercellen'), 0.4), 28);
    pill(ctx, 960, 800, 'twee genetisch gelijke dochtercellen', C.groen, ramp(t, q.at('dochtercellen'), 0.4), 28);
  },

  // ---------------- H5 Meiose
  s22(ctx, t, q) {
    micro2(ctx);
    // Rachid en Linda: gezichten heel, organen in een zoomcirkel náást het lichaam (BEELDAFSPRAKEN 25 okt 2026)
    const tTe = q.at('teelballen'), tEi = q.at('eierstokken'), tRe = q.at('reductiedeling'), tDe = q.at('delingen');
    persoon(ctx, 'rachid', 330, 840, 560, { uit: 'neutraal', kijk: 1, t }); persoon(ctx, 'linda', 900, 840, 540, { uit: 'neutraal', kijk: -1, t });
    const zt = ramp(t, tTe, 0.5), ze = ramp(t, tEi, 0.5);
    zoomCircle(ctx, 560, 300, 150, 330, 840 - 560 * 0.47, 'teelbal · doorsnede', zt, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(400, 140, 320, 320); zaadbalDoorsnede(ctx, 560, 300, 130, 105, { t }); });
    zoomCircle(ctx, 1180, 300, 150, 900, 840 - 540 * 0.45, 'eierstok · doorsnede', ze, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1020, 140, 320, 320); eierstokDoorsnede(ctx, 1180, 300, 130, 95, { t, n: 90 }); });
    pill(ctx, 1560, 560, 'meiose: in teelballen en eierstokken', C.paars, zt, 26);
    pill(ctx, 1560, 660, 'reductiedeling: 46 → 23', C.goud, ramp(t, tRe, 0.4), 26);
    pill(ctx, 1560, 760, 'twee delingen, één keer kopiëren', C.text, ramp(t, tDe, 0.4), 26);
    meta2(ctx, 'niet op schaal');
  },
  s23(ctx, t, q) {
    micro2(ctx);
    const tLa = q.at('lange'), tTe = q.at('tegen'), tWi = q.at('wisselen'), tCo = q.at('crossing'), tKi = q.at('Kijk'), tMi = q.at('minstens'), tEq = q.at('equatorvlak'), tPa = q.at('paren', 2), tDa = q.at('Daarna');
    const st = { pa: ramp(t, tTe, 1.8), co: ramp(t, tWi, 2.2), eq: ramp(t, tEq - 0.6, 2.0), an: ramp(t, tDa, 2.4), sp: ramp(t, tEq - 1, 1.5), hl: ramp(t, tLa, 0.4) };
    meioseCel(ctx, 960, 470, st, t);
    pill(ctx, 960, 92, 'meiose I', C.goud, 1, 34);
    naamBij(ctx, 'ons paar', 'het lange paar', 560, 300, fadeIO(t, tLa, tWi, 0.4), 'right', C.goud);
    naamBij(ctx, 'crossing-over', 'stukken uitwisselen', 1180, 300, fadeIO(t, tCo, tMi + 1, 0.4), 'left', C.goud);
    naamBij(ctx, 'vaderskant met een stuk van moederskant, en andersom', null, 960, 860, fadeIO(t, tKi, tMi, 0.4), 'center');
    pill(ctx, 960, 860, 'bij elk paar minstens één keer (hier getekend: één keer)', C.text, fadeIO(t, tMi, tEq, 0.4), 26);
    pill(ctx, 960, 860, 'meiose I: als paren in het equatorvlak', C.goud, fadeIO(t, tPa, tDa, 0.4), 28);
    pill(ctx, 960, 860, 'de paren gaan uit elkaar', C.goud, ramp(t, tDa, 0.4), 28);
    meta2(ctx, 'model · 2n = 4 · niet op schaal');
  },
  s24(ctx, t, q) {
    micro2(ctx);
    const tM2 = q.at('meiose', 3), tMan = q.at('man'), tVr = q.at('vrouw'), tLa = q.at('laatste'), tGr = q.at('grote');
    const A = 1 - ramp(t, tM2, 0.6), B = ramp(t, tM2, 0.6) * (1 - ramp(t, tMan - 0.2, 0.5)), Cc = ramp(t, tMan - 0.2, 0.5);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const cyI = ramp(t, 0.2, 2.0);
      cdCel(ctx, 960, 470, 600, 340, { insnoer: 0.9 * cyI, t });
      [['links', -1], ['rechts', 1]].forEach(([k, sx]) => NA_M1[k].forEach((c, j) => cdChromosoom(ctx, 960 + sx * lerp(60, 330, cyI), 400 + j * 150, c.p === 'L' ? 200 : 124, { w: 16, cen: c.p === 'L' ? 0.38 : 0.3, kl: CD[c.kl], segsL: c.sL, segsR: c.sR, hl: c.p === 'L' ? 1 : 0 })));
      cdTeller(ctx, [['per cel · model', '2'], ['per cel · mens', '23', C.goud]], ramp(t, 0.4, 0.4), 1560, 150);
      pill(ctx, 960, 860, 'van elk paar één chromosoom, nog met twee chromatiden', C.goud, ramp(t, q.at('paar'), 0.4), 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const sp = ramp(t, q.at('chromatiden', 2), 2.2);
      [['links', -1], ['rechts', 1]].forEach(([k, sx]) => { const cx = 960 + sx * 420; cdCel(ctx, cx, 470, 330, 270, { insnoer: 0.85 * ramp(t, q.at('mitose'), 1.4), t, seed: sx + 2 }); cdPool(ctx, cx - 250, 470, 1); cdPool(ctx, cx + 250, 470, 1);
        NA_M1[k].forEach((c, j) => { const y = 400 + j * 150, len = c.p === 'L' ? 190 : 118, cen = c.p === 'L' ? 0.38 : 0.3; if (sp < 0.02) cdChromosoom(ctx, cx, y, len, { w: 15, cen, kl: CD[c.kl], segsL: c.sL, segsR: c.sR, kin: true });
          else { const dd = ease(sp) * 140, zw = 0.7 * Math.sin(Math.PI * sp); cdEen(ctx, cx - 8 - dd, y, len, { w: 15, cen, kant: 1, zwaai: zw, segs: c.sL }); cdEen(ctx, cx + 8 + dd, y, len, { w: 15, cen, kant: -1, zwaai: zw, segs: c.sR }); } }); });
      pill(ctx, 960, 92, 'meiose II: de chromatiden gaan uit elkaar, net als bij de mitose', C.goud, 1, 28); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc;
      const G = [NA_M1.links.map(c => c.sL), NA_M1.links.map(c => c.sR), NA_M1.rechts.map(c => c.sL), NA_M1.rechts.map(c => c.sR)];
      G.forEach((segs, i) => { const x = 360 + i * 400, y = 300; zaadcelEcht(ctx, x, y, 0, t + i, 1.6); cdEen(ctx, x - 10, y - 2, 44, { w: 6, segs: segs[0] }); cdEen(ctx, x + 8, y + 2, 28, { w: 6, segs: segs[1], cen: 0.3 }); });
      naamBij(ctx, 'man: vier zaadcellen', 'elk een andere mengeling', 960, 450, ramp(t, tMan, 0.4), 'center');
      const v = ramp(t, tVr, 0.5); if (v > 0) { ctx.save(); ctx.globalAlpha *= v; eicelEcht(ctx, 760, 690, 95, 1, false); for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.arc(960 + k * 90, 720, 26, 0, 6.283); shape(ctx, rgba(C.fill, 0.8), C.er, 1.5); }
        naamBij(ctx, 'vrouw: één grote eicel', 'de laatste stap pas bij de bevruchting', 760, 830, 1, 'center'); naamBij(ctx, 'kleine cellen', 'gaan te gronde', 1100, 790, ramp(t, q.at('andere'), 0.4), 'left'); ctx.restore(); }
      ctx.restore(); }
    meta2(ctx, 'model · niet op schaal');
  },
  x01(ctx, t, q) {
    bg(ctx, 'schema');
    const tZa = q.at('Zaadcellen'), tVr = q.at('vrouw'), tLi = q.at('Linda'), tRi = q.at('Ria'), tEi = q.at('eierstokken'), tCr = q.at('crossing'), tSt = q.at('stopten'), tOo = q.at('oöcyt'), tZe = q.at('zevenentwintig'), tHo = q.at('Hoe', 2);
    const za = fadeIO(t, tZa, tLi, 0.5); if (za > 0) { ctx.save(); ctx.globalAlpha *= za; for (let i = 0; i < 8; i++) zaadcelEcht(ctx, 520 + i * 120, 330 + Math.sin(i * 1.7) * 40, 0, t + i * 0.3, 1.3); metaText(ctx, 'man: vanaf de puberteit elke dag nieuwe zaadcellen', 960, 500, C.grain, 'center', 26); ctx.restore(); }
    pill(ctx, 960, 110, 'hoe lang duurt de meiose van een eicel?', C.oker, fadeIO(t, 0.2, tLi, 0.4), 32);
    const tl = ramp(t, tLi, 0.6), yb = 760;
    if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(180, yb + 40); ctx.lineTo(1760, yb + 40); ctx.stroke();
      const ar = ramp(t, tRi, 0.5), al = ramp(t, tZe, 0.5), an = ramp(t, tLi, 0.5);
      ctx.save(); ctx.globalAlpha *= ar; persoon(ctx, 'ria', 330, yb, 330, { outfit: 'vroeger', zwanger: 0.85, uit: 'blij', t }); metaText(ctx, '± 45 jaar geleden', 330, yb + 82, C.text2, 'center', 22); text(ctx, 'oma Ria zwanger van Linda', 330, yb + 122, fTekst(30, 600), C.text, 'center'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= al; persoon(ctx, 'linda', 1080, yb, 340, { outfit: 'zwanger', zwanger: 0, uit: 'blij', t, kijk: 1 }); metaText(ctx, '± 17 jaar geleden', 1080, yb + 82, C.text2, 'center', 22); text(ctx, 'Linda 27: eisprong', 1080, yb + 122, fTekst(30, 600), C.text, 'center'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= an; persoon(ctx, 'noor', 1600, yb, 330, { uit: 'blij', t, kijk: -1 }); metaText(ctx, 'nu', 1600, yb + 82, C.text2, 'center', 22); text(ctx, 'Noor 16', 1600, yb + 122, fTekst(30, 600), C.text, 'center'); ctx.restore();
      ctx.restore(); }
    // de oöcyt: paren tegen elkaar met crossing-over, dan stil (pauzeteken)
    const oc = ramp(t, tEi, 0.6); if (oc > 0.01) { ctx.save(); ctx.globalAlpha *= oc * (1 - 0.0); const x = 470, y = 230, cr = ramp(t, tCr, 1.2);
      ctx.beginPath(); ctx.arc(x, y, 120, 0, 6.283); shape(ctx, rgba(C.fill, 0.9), '#E6C9A8', 2.5);
      cdChromosoom(ctx, x - 20, y, 140, { w: 12, kl: CD.vader, segsR: cr > 0.5 ? COSEG.L.v : null }); cdChromosoom(ctx, x + 20, y, 140, { w: 12, kl: CD.moeder, segsL: cr > 0.5 ? COSEG.L.m : null });
      const pz = ramp(t, tSt, 0.4); if (pz > 0) { ctx.save(); ctx.globalAlpha *= pz; for (const dx of [-14, 14]) { roundRect(ctx, x + 150 + dx - 8, y - 30, 16, 60, 4); shape(ctx, C.oker, null); } ctx.restore(); }
      naamBij(ctx, 'crossing-over', null, x, y - 150, fadeIO(t, tCr, tSt, 0.4), 'center', C.goud);
      naamBij(ctx, 'oöcyt', 'meiose I staat stil', x, y + 170, ramp(t, tOo, 0.4), 'center');
      ctx.restore(); }
    const bal = ramp(t, tZe, 0.8); if (bal > 0) { ctx.save(); ctx.globalAlpha *= bal; roundRect(ctx, 620, 212, lerp(0, 600, bal), 36, 18); shape(ctx, rgba(C.paars, 0.35), C.paars, 1.5); text(ctx, 'stil · ± 27 jaar', 920, 240, fTekst(30, 700), C.text, 'center'); eicelEcht(ctx, 1290, 230, 34, 1, true); ctx.restore(); }
    if (!vragenUit2()) { const qa = ramp(t, tHo, 0.5); if (qa > 0) text(ctx, '?', 1500, 280, fTitel(120), rgba(C.goud, qa), 'center'); }
    meta2(ctx, 'niet op schaal');
  },
  x02(ctx, t, q) {
    micro2(ctx);
    const tVl = q.at('Vlak'), tPo = q.at('poollichaampje'), tDa = q.at('Daarna'), tPa = q.at('Pas'), tAl = q.at('Al'), tSl = q.at('slijten'), tDat = q.at('Dat'), tTe = q.at('Terug');
    pill(ctx, 960, 92, 'ruim 27 jaar stil: sinds vóór Linda\'s geboorte', C.oker, fadeIO(t, 0, tVl, 0.4), 30);
    const A = 1 - ramp(t, tAl - 0.2, 0.4);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const x = 820, y = 500, m1 = ramp(t, tVl, 2.0), m2 = ramp(t, tPa, 1.6);
      eicelEcht(ctx, x, y, 165, 1, true);
      // meiose I af: één chromosoom (met 2 chromatiden) blijft, één gaat het poollichaampje in
      const pb = [x + 330, y - 220]; const pa1 = ramp(t, tPo, 0.6);
      cdChromosoom(ctx, x - 70 - 20 * (1 - m1), y, 150, { w: 14, kl: CD.vader, segsR: COSEG.L.v });
      if (m1 < 0.98) cdChromosoom(ctx, lerp(x - 30, pb[0], m1), lerp(y, pb[1], m1), lerp(150, 60, m1), { w: lerp(14, 6, m1), kl: CD.moeder, segsL: COSEG.L.m });
      if (pa1 > 0) { ctx.save(); ctx.globalAlpha *= pa1; ctx.beginPath(); ctx.arc(pb[0], pb[1], 46, 0, 6.283); shape(ctx, rgba(C.fill, 0.85), '#E6C9A8', 2); ctx.restore(); naamBij(ctx, 'poollichaampje', null, pb[0] + 60, pb[1] + 10, pa1, 'left'); }
      naamBij(ctx, 'stil in meiose II', 'zo komt hij vrij bij de eisprong', x + 260, y + 40, fadeIO(t, tDa, tPa, 0.4), 'left', C.oker);
      if (m2 > 0) { zaadcelEcht(ctx, lerp(x - 520, x - 250, m2), y + 20, 0, t, 1.8); naamBij(ctx, 'zaadcel dringt binnen', 'pas dan meiose II af', x - 380, y + 140, m2, 'center'); }
      ctx.restore(); }
    const B = ramp(t, tAl + 0.2, 0.5);
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const sl = ramp(t, tSl, 3.5);
      cdChromosoom(ctx, 700, 470, 360, { w: 40, kl: CD.vader, segsR: COSEG.L.v, ringen: 1 - 0.75 * sl });
      text(ctx, 'jong', 1180, 380, fTekst(34, 600), C.text, 'left'); text(ctx, 'oud', 1180, 560, fTekst(34, 600), C.text2, 'left');
      for (let k = 0; k < 5; k++) { ctx.save(); ctx.strokeStyle = C.grain; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1330 + k * 50, 370, 18, 7, 0, 0, 6.283); ctx.stroke(); ctx.globalAlpha *= sl; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.ellipse(1330 + k * 50, 550, 18, 7, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      naamBij(ctx, 'cohesine', 'eiwitringen', 900, 300, 1, 'left', C.grain);
      pill(ctx, 960, 860, 'waarschijnlijk een belangrijke reden: bij oudere moeders vaker fouten', C.koraal, ramp(t, tDat, 0.4) * (1 - ramp(t, tTe, 0.4)), 26);
      ctx.restore(); }
    pill(ctx, 960, 470, 'terug naar de hoofdlijn', C.goud, ramp(t, tTe + 0.3, 0.5), 34);
    meta2(ctx, 'niet op schaal');
  },
  s25(ctx, t, q) {
    bg(ctx, 'schema');
    const pts = [[0, 1], [0.15, 1], [0.32, 2], [0.45, 2], [0.47, 1], [0.7, 1], [0.72, 0.5], [1, 0.5]];
    const pr = clamp((t - q.at('van')) / (q.at('half') + 0.8 - q.at('van')), 0, 1);
    dnaGraph(ctx, 260, 180, 1400, 560, pts, pr, { labels: [{ s: 'kopiëren', x: 0.24, a: ramp(t, q.at('van'), 0.3) }, { s: 'meiose I', x: 0.46, a: ramp(t, q.at('meiose'), 0.3) }, { s: 'meiose II', x: 0.71, a: ramp(t, q.at('meiose', 2), 0.3) }], title: 'DNA per kern bij de meiose' });
  },
  s26(ctx, t, q) {
    micro2(ctx);
    const tTo = q.at('toeval'), tMa = q.at('macht'), tCr = q.at('crossing'), tVe = q.at('verschilt'), tBe = q.at('bevruchting'), tSa = q.at('samen'), tWe = q.at('weer');
    const A = 1 - ramp(t, tCr, 0.6), B = ramp(t, tCr, 0.6) * (1 - ramp(t, tBe, 0.6)), Cc = ramp(t, tBe, 0.6);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      // vier mogelijke verdelingen van twee paren (2² in het model)
      const comb = [['vader', 'vader'], ['vader', 'moeder'], ['moeder', 'vader'], ['moeder', 'moeder']];
      comb.forEach(([l, k], i) => { const cx = 330 + i * 420, a = ramp(t, tTo + 0.2 + i * 0.4, 0.4); ctx.save(); ctx.globalAlpha *= a; cdCel(ctx, cx, 420, 150, 140, { t, seed: i }); cdEen(ctx, cx - 30, 410, 140, { w: 14, kl: CD[l] }); cdEen(ctx, cx + 30, 430, 86, { w: 14, kl: CD[k], cen: 0.3 }); ctx.restore(); });
      metaText(ctx, 'model met 2 paren: 2 × 2 = 4 combinaties', 960, 640, C.grain, 'center', 24);
      const n = ramp(t, tMa, 0.5); if (n > 0) { ctx.save(); ctx.globalAlpha *= n; text(ctx, 'mens: 2²³ ≈ 8 miljoen combinaties', 960, 760, fTitel(54), C.goud, 'center'); ctx.restore(); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      const G = [NA_M1.links.map(c => c.sL), NA_M1.links.map(c => c.sR), NA_M1.rechts.map(c => c.sL), NA_M1.rechts.map(c => c.sR)];
      G.forEach((segs, i) => { const cx = 330 + i * 420; cdCel(ctx, cx, 430, 150, 140, { t, seed: i + 9 }); cdEen(ctx, cx - 30, 420, 160, { w: 16, segs: segs[0] }); cdEen(ctx, cx + 30, 440, 100, { w: 16, segs: segs[1], cen: 0.3 }); });
      pill(ctx, 960, 760, 'door crossing-over: een nieuwe mengeling van vaderskant en moederskant', C.groen, ramp(t, tCr + 0.5, 0.4) * (1 - ramp(t, tVe, 0.3)), 26);
      pill(ctx, 960, 760, 'bijna elke geslachtscel is anders', C.groen, ramp(t, tVe, 0.4), 28); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; const m = ramp(t, tSa, 1.2); eicelEcht(ctx, 1120, 470, 140, 1, true); zaadcelEcht(ctx, lerp(520, 980, m), 470, 0, t, 2.2);
      text(ctx, 'n', lerp(520, 980, m), 380, fTekst(40, 700), C.text, 'center'); text(ctx, 'n', 1120, 300, fTekst(40, 700), C.text, 'center');
      const r = ramp(t, tWe, 0.5); if (r > 0) { ctx.save(); ctx.globalAlpha *= r; text(ctx, '= 2n = 46', 1320, 490, fTitel(64), C.goud, 'left'); ctx.restore(); } ctx.restore(); }
    meta2(ctx, 'model · niet op schaal');
  },

  // ---------------- H6 Naast elkaar: hetzelfde lange paar in drie metafasen
  s27(ctx, t, q) { bg(ctx, 'schema'); drieMetafasen(ctx, t, vragenUit2() ? 1 : 0, ramp(t, 0.2, 0.5)); },
  s29(ctx, t, q) {
    bg(ctx, 'schema'); const tab = ramp(t, q.at('Mitose:'), 0.6);
    drieMetafasen(ctx, t, 1, 1 - tab);
    if (tab > 0) { ctx.save(); ctx.globalAlpha = tab;
      const rows = [['', 'mitose', 'meiose'], ['delingen', '1', '2'], ['dochtercellen', '2', '4 zaadcellen / 1 eicel'], ['chromosomen', '2n (diploïd)', 'n (haploïd)'], ['genetisch', 'gelijk', 'verschillend'], ['doel', 'groei, herstel, vervanging', 'voortplanting']];
      const cues = [null, 'deling', 'dochtercellen', 'diploïd', 'genetisch', 'groei'];
      rows.forEach((r, i) => { const a = i === 0 ? 1 : ramp(t, q.at(cues[i]), 0.4); const am = i === 0 ? 1 : ramp(t, q.at('Meiose:'), 0.4); const y = 180 + i * 95;
        if (i > 0) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.3); ctx.beginPath(); ctx.moveTo(220, y - 60); ctx.lineTo(1700, y - 60); ctx.stroke(); ctx.restore(); }
        text(ctx, r[0], 240, y, fTekst(32, 600), C.text2, 'left');
        ctx.save(); ctx.globalAlpha *= a; text(ctx, r[1], 820, y, fTekst(i ? 32 : 38, 600), i ? C.text : C.goud, 'left'); ctx.restore();
        ctx.save(); ctx.globalAlpha *= am; text(ctx, r[2], 1280, y, fTekst(i ? 32 : 38, 600), i ? C.text : C.paars, 'left'); ctx.restore(); });
      pill(ctx, 960, 820, 'meiose is niet gewoon twee keer mitose', C.koraal, ramp(t, q.at('gewoon'), 0.4), 30);
      ctx.restore(); }
  },
  s32(ctx, t, q) {
    micro2(ctx);
    text(ctx, '24 + 23 = 47', 960, 200, fTitel(70), C.goud, 'center');
    karyo(ctx, 280, 300, 1360, 420, { alpha: ramp(t, q.at('nummer'), 0.6), hl: [20], sex: 'XX', tris: 20 });
    pill(ctx, 960, 800, 'trisomie 21: het syndroom van Down', C.paars, ramp(t, q.at('trisomie'), 0.4), 30);
    meta2(ctx, 'karyogram · schematisch');
  },
  s33(ctx, t, q) {
    bg(ctx, 'schema'); const quiz = ramp(t, q.at('vraag', 2), 0.6); const pa = 1 - quiz;
    pill(ctx, 960, 130, 'hoe verdeelt een cel zijn DNA eerlijk?', C.goud, fadeIO(t, 0, q.at('verdeelt'), 0.4) * pa, 30);
    if (pa > 0) { ctx.save(); ctx.globalAlpha = pa;
      const P = [['eerst kopiëren, in de interfase', 'kopiëren'], ['mitose: twee dochtercellen, 46, gelijk', 'mitose'], ['meiose: eerst paren, dan chromatiden', 'meiose'], ['geslachtscellen: n = 23, verschillend', 'haploïde']];
      P.forEach((p, i) => { const a = ramp(t, q.at(p[1]), 0.5); if (a <= 0) return; const x = 110 + i * 430, y = 220, w = 400, h = 480; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.55), C.line, 1); const cx = x + w / 2, cy = y + 200;
        if (i === 0) { cdKluwen(ctx, cx - 80, cy, 120, { c: 0, dubbel: false, w: 12, kl: CD.vader, seed: 2, R: 50 }); arrow(ctx, cx - 25, cy, cx + 25, cy, C.goud, 4, 14); cdChromosoom(ctx, cx + 90, cy, 130, { w: 14, kl: CD.vader }); }
        if (i === 1) for (const sx of [-1, 1]) { cdCel(ctx, cx + sx * 90, cy, 80, 72, { seed: sx }); MOD.forEach((m, j) => cdEen(ctx, cx + sx * 90 - 30 + j * 20, cy, lenOf(m, 70), { w: 7, kl: CD[m.k], cen: cenOf(m) })); }
        if (i === 2) { cdChromosoom(ctx, cx - 30, cy, 150, { w: 14, kl: CD.vader, segsR: COSEG.L.v }); cdChromosoom(ctx, cx + 30, cy, 150, { w: 14, kl: CD.moeder, segsL: COSEG.L.m }); }
        if (i === 3) { const G = [NA_M1.links.map(c => c.sL), NA_M1.links.map(c => c.sR), NA_M1.rechts.map(c => c.sL), NA_M1.rechts.map(c => c.sR)]; G.forEach((segs, k) => { const gx = cx - 120 + k * 80; cdCel(ctx, gx, cy, 36, 34, { seed: k }); cdEen(ctx, gx - 8, cy, 40, { w: 6, segs: segs[0] }); cdEen(ctx, gx + 8, cy, 26, { w: 6, segs: segs[1], cen: 0.3 }); }); }
        ctx.font = fTekst(28, 600); ctx.fillStyle = C.text; ctx.textAlign = 'center'; wrap(ctx, p[0], cx, y + h - 90, w - 40, 34); ctx.restore(); });
      ctx.restore(); }
    if (quiz > 0) { ctx.save(); ctx.globalAlpha = quiz; const hc = ramp(t, q.at('huidcel'), 0.5), zc = ramp(t, q.at('zaadcel'), 0.5);
      ctx.save(); ctx.globalAlpha *= hc; cdCel(ctx, 560, 440, 150, 120, { t }); ctx.beginPath(); ctx.arc(570, 440, 60, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.3); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.stroke(); metaText(ctx, 'huidcel (deelt niet)', 560, 620, C.grain, 'center', 22); ctx.restore();
      ctx.save(); ctx.globalAlpha *= zc; zaadcelEcht(ctx, 1360, 440, 0, t, 2.6); metaText(ctx, 'zaadcel', 1300, 620, C.grain, 'center', 22); ctx.restore();
      text(ctx, 'meer DNA in de kern?', 960, 200, fTekst(44, 600), C.text, 'center'); ctx.restore(); }
  },
  s35(ctx, t, q) {
    bg(ctx, 'schema');
    const bars = [['huidcel', 46, C.paars, '46 chromosomen (2n)'], ['zaadcel', 23, C.text2, '23 chromosomen (n)']];
    bars.forEach((b, i) => { const y = 320 + i * 170; const w = b[1] / 46 * 1000 * ramp(t, 0.3 + i * 0.6, 0.8); roundRect(ctx, 520, y, Math.max(4, w), 90, 12); ctx.fillStyle = rgba(b[2], 0.75); ctx.fill(); text(ctx, b[0], 490, y + 60, fTekst(38, 600), C.text, 'right'); metaText(ctx, b[3], 540 + w, y + 56, C.grain, 'left', 22); });
    pill(ctx, 960, 800, 'ongeveer twee keer zoveel DNA in de kern', C.goud, ramp(t, q.at('ongeveer'), 0.4), 30);
  },
});

// drie metafasen naast elkaar met hetzelfde lange paar (H6)
function drieMetafasen(ctx, t, reveal, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const pan = [[340, 'mitose', 'elk voor zich · 2n'], [960, 'meiose I', 'als paren'], [1580, 'meiose II', 'elk voor zich · n']];
  pan.forEach(([x, tt, s], k) => { roundRect(ctx, x - 290, 140, 580, 660, 18); shape(ctx, '#202E48', rgba(C.line, 0.6), 1.2);
    text(ctx, tt, x, 210, fTitel(48), k === 1 && reveal ? C.goud : C.text, 'center'); if (reveal) metaText(ctx, s, x, 250, C.text2, 'center', 22);
    ctx.save(); ctx.setLineDash([5, 7]); ctx.strokeStyle = rgba(C.goud, 0.5); ctx.beginPath(); ctx.moveTo(x, 290); ctx.lineTo(x, 760); ctx.stroke(); ctx.restore();
    cdPool(ctx, x - 240, 520, 0.9); cdPool(ctx, x + 240, 520, 0.9);
    if (!reveal) { text(ctx, '?', x, 560, fTitel(100), C.goud, 'center'); return; }
    const w = 12, L = 170, a = ramp(t, 0.2, 0.5); ctx.save(); ctx.globalAlpha *= a;
    if (k === 0) MOD.forEach((m, i) => { const y = 340 + i * 115; cdDraad(ctx, x - 240, 520, x - 16, y); cdDraad(ctx, x + 240, 520, x + 16, y); cdChromosoom(ctx, x, y, lenOf(m, L * 0.62), { w, cen: cenOf(m), kl: CD[m.k], kin: true, hl: onsPaar(m) ? 0.8 : 0 }); });
    if (k === 1) M1.forEach((P, j) => { const y = j ? 650 : 400, len = P.p === 'L' ? L : L * 0.62, l = P.links, r = l === 'vader' ? 'moeder' : 'vader'; cdDraad(ctx, x - 240, 520, x - 50, y); cdDraad(ctx, x + 240, 520, x + 50, y);
      cdChromosoom(ctx, x - 28, y, len, { w, cen: P.p === 'L' ? 0.38 : 0.3, kl: CD[l], segsL: l === 'vader' ? null : COSEG[P.p].m, segsR: l === 'vader' ? COSEG[P.p].v : null, hl: P.p === 'L' ? 0.8 : 0 });
      cdChromosoom(ctx, x + 28, y, len, { w, cen: P.p === 'L' ? 0.38 : 0.3, kl: CD[r], segsL: r === 'vader' ? COSEG[P.p].v : null, segsR: r === 'vader' ? null : COSEG[P.p].m, hl: P.p === 'L' ? 0.8 : 0 }); });
    if (k === 2) NA_M1.links.forEach((c, j) => { const y = j ? 640 : 410; cdDraad(ctx, x - 240, 520, x - 16, y); cdDraad(ctx, x + 240, 520, x + 16, y); cdChromosoom(ctx, x, y, c.p === 'L' ? L : L * 0.62, { w, cen: c.p === 'L' ? 0.38 : 0.3, kl: CD[c.kl], segsL: c.sL, segsR: c.sR, kin: true, hl: c.p === 'L' ? 0.8 : 0 }); });
    ctx.restore(); });
  ctx.restore(); }

// ---- oude scènes (1.x), alleen nieuwe cues en kleuren
Object.assign(SCENES, {
  v01(ctx, t, q){
  bg(ctx,'schema');
  const tB=q.at('eencellige')-0.3, tC=q.at('geslachtelijke',2)-0.2;
  const A=1-ramp(t,tB,0.6), B=ramp(t,tB,0.6)*(1-0.9*ramp(t,tC,0.6));
  pill(ctx,960,92,'ongeslachtelijke voortplanting: één ouder, geen bevruchting',C.goud,ramp(t,q.at('ongeslachtelijke'),0.5)*(1-ramp(t,tC,0.5)),30);
  if(A>0.01){ ctx.save(); ctx.globalAlpha*=A;
    const chs=(s)=>MODEL.map((m,i)=>({x:[-40,-12,16,44][i]*s,y:(m.pair?24:-22)*s,len:m.len*0.42*s,color:m.color,dup:false,w:9*s}));
    cellWith(ctx,520,470,150,chs(1.25),{nuc:true});
    naamBij(ctx,'ouder','één organisme',520,262,1,'center');
    const d=ramp(t,q.at('mitose',2),1.4);
    arrow(ctx,710,470,980,470,C.goud,5,18,ramp(t,q.at('mitose',2),0.4)); metaA(ctx,'mitose',845,440,C.goud,ramp(t,q.at('mitose',2),0.4),22);
    if(d>0){ for(const [x,y] of [[1240,330],[1560,600]]){ ctx.save(); ctx.globalAlpha*=d; cellWith(ctx,x,y,lerp(60,120,d),chs(lerp(0.5,1,d)),{nuc:true}); ctx.restore(); } }
    naamBij(ctx,'nakomelingen','',1400,170,ramp(t,q.at('nakomelingen'),0.5),'center');
    pill(ctx,960,820,'genetisch gelijk aan de ouder: klonen',C.groen,ramp(t,q.at('klonen'),0.5),30);
    ctx.restore(); }
  if(B>0.01){ ctx.save(); ctx.globalAlpha*=B;
    const P=[[270,'eencellige','deelt in tweeën','eencellige'],[730,'knopvorming','gist · zoetwaterpoliep','Gist'],[1190,'uitlopers','aardbeiplant','aardbeiplant'],[1650,'bladluis','jongen zonder bevruchting','bladluis']];
    P.forEach(([cx,naam,meta,cue],k)=>{ const on=ramp(t,q.at(cue)-0.2,0.5); const nx=k<3?q.at(P[k+1][3])-0.2:tC; const foc=on*(1-0.5*ramp(t,nx,0.5));
      ctx.save(); ctx.globalAlpha*=0.35+0.65*on; roundRect(ctx,cx-205,170,410,640,18); shape(ctx,rgba(C.fill,0.55),foc>0.6?C.goud:C.line,foc>0.6?3:1.2);
      const cy=430, u=t-q.at(cue);
      if(k===0) vpEencellige(ctx,cx,cy,ramp(u,0.4,2.2),t);
      if(k===1) vpKnop(ctx,cx,cy,ramp(u,0.3,2.5),ramp(t,q.at('knop'),2.5),t);
      if(k===2) vpAardbei(ctx,cx,cy,ramp(t,q.at('uitlopers'),1.6),ramp(t,q.at('plantjes'),1.6),0);
      if(k===3) vpBladluis(ctx,cx,cy,ramp(t,q.at('jongen'),2.2),t);
      naamBij(ctx,naam,meta,cx,730,1,'center',foc>0.6?C.goud:C.text); ctx.restore(); });
    metaText(ctx,'nakomelingen zijn klonen van de ouder',960,862,C.grain,'center',22);
    ctx.restore(); }
  const cC=ramp(t,tC,0.6); if(cC>0){ pill(ctx,960,470,'geslachtelijke voortplanting: twee ouders, een andere deling',C.paars,cC,34); }
  scaleBar(ctx);
},
  s21(ctx, t, q){
  bg(ctx,'schema');
  const dip=ramp(t,q.at('lichaamscel'),0.6); const a1=1-dip;
  if(a1>0){ ctx.save(); ctx.globalAlpha=a1; const meet=ramp(t,q.at('versmelten'),1.6);
    egg(ctx,1100,470,150,1); sperm(ctx,lerp(500,930,meet),470,2,1,0,t);
    text(ctx,'46',lerp(500,930,meet),400,fTekst(36,700),C.text,'center'); text(ctx,'46',1100,330,fTekst(36,700),C.text,'center');
    const k=ramp(t,q.at('kind'),0.5); if(k>0){ ctx.save(); ctx.globalAlpha*=k; text(ctx,'= 92 ?',1400,490,fTitel(70),C.koraal,'left'); crossOut(ctx,1500,470,70,ramp(t,q.at('tweeënnegentig'),0.3)); ctx.restore(); }
    ctx.restore(); }
  if(dip>0){ ctx.save(); ctx.globalAlpha=dip; const hap=ramp(t,q.at('geslachtscel'),0.6);
    cellWith(ctx,560,470,220,[{x:-70,y:-40,len:85,color:C.vader,dup:false},{x:-40,y:-40,len:85,color:C.moeder,dup:false},{x:40,y:40,len:55,color:C.vader,dup:false},{x:70,y:40,len:55,color:C.moeder,dup:false}],{nuc:true});
    text(ctx,'diploïd',560,190,fTekst(40,600),C.text,'center'); text(ctx,'2n = 46',560,800,fTitel(48),C.goud,'center');
    ctx.save(); ctx.globalAlpha*=hap; cellWith(ctx,1360,470,170,[{x:-30,y:-30,len:85,color:C.moeder,dup:false},{x:35,y:35,len:55,color:C.vader,dup:false}],{nuc:true}); text(ctx,'haploïd',1360,190,fTekst(40,600),C.text,'center'); text(ctx,'n = 23',1360,800,fTitel(48),C.goud,'center'); metaText(ctx,'van elk paar één',1360,700,C.grain,'center',22); ctx.restore();
    metaText(ctx,'paren chromosomen',560,710,C.grain,'center',22); ctx.restore(); }
},
  v02(ctx, t, q){
  bg(ctx,'schema');
  const tB=q.at('Ongeslachtelijke')-0.2; const A=1-ramp(t,tB,0.6), B=ramp(t,tB,0.6);
  pill(ctx,960,92,'geslachtelijke voortplanting',C.paars,A*ramp(t,0.2,0.5),30);
  if(A>0.01){ ctx.save(); ctx.globalAlpha*=A;
    const P1=[C.vader,'#3E7FA3'], P2=[C.moeder,'#A88440'];
    const ch=(La,Sa,s=1)=>[{x:-22*s,y:0,len:70*s,color:La,dup:false,w:10*s},{x:22*s,y:0,len:44*s,color:Sa,dup:false,w:10*s}];
    const ch4=(L1,L2,S1,S2,s=1)=>[{x:-36*s,y:-14*s,len:70*s,color:L1,dup:false,w:10*s},{x:-12*s,y:-14*s,len:70*s,color:L2,dup:false,w:10*s},{x:14*s,y:18*s,len:44*s,color:S1,dup:false,w:10*s},{x:38*s,y:18*s,len:44*s,color:S2,dup:false,w:10*s}];
    const par=ramp(t,q.at('geslachtelijke')+0.4,0.6);
    ctx.save(); ctx.globalAlpha*=par;
    cellWith(ctx,420,255,105,ch4(P1[0],P1[1],P1[0],P1[1],1.1),{nuc:true}); cellWith(ctx,1500,255,105,ch4(P2[0],P2[1],P2[0],P2[1],1.1),{nuc:true});
    naamBij(ctx,'ouder 1','2n',290,250,1,'right'); naamBij(ctx,'ouder 2','2n',1630,250,1,'left'); ctx.restore();
    const mei=ramp(t,q.at('meiose'),0.8); const fus=ramp(t,q.at('versmelten'),1.6); const zy=ramp(t,q.at('zygote')-0.3,0.5);
    const G1=[[300,ch(P1[0],P1[1],0.8)],[540,ch(P1[1],P1[0],0.8)]], G2=[[1380,ch(P2[0],P2[0],0.8)],[1620,ch(P2[1],P2[1],0.8)]];
    if(mei>0){ ctx.save(); ctx.globalAlpha*=mei;
      for(const [x] of G1) arrow(ctx,420,370,x,430,C.line,2.5,12,1); for(const [x] of G2) arrow(ctx,1500,370,x,430,C.line,2.5,12,1);
      G1.forEach(([x,c],i)=>{ const mv=i===1?fus:0; const gx=lerp(x,880,mv); ctx.save(); ctx.globalAlpha*=(1-zy*(i===1?1:0)); cellWith(ctx,gx,500,58,c); ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(gx-58,500); for(let k=0;k<=16;k++) ctx.lineTo(gx-58-k*5,500+Math.sin(k*0.8+t*8)*5); ctx.stroke(); ctx.restore(); });
      G2.forEach(([x,c],i)=>{ const mv=i===0?fus:0; const gx=lerp(x,1040,mv); ctx.save(); ctx.globalAlpha*=(1-zy*(i===0?1:0)); cellWith(ctx,gx,500,64,c); ctx.restore(); });
      metaText(ctx,'zaadcellen · n',420,610,C.grain,'center',20); metaText(ctx,'eicellen · n',1500,610,C.grain,'center',20);
      pill(ctx,960,385,'meiose → haploïde geslachtscellen',C.goud,ramp(t,q.at('haploïde'),0.4)*(1-ramp(t,q.at('bevruchting'),0.4)),26);
      ctx.restore(); }
    if(zy>0){ ctx.save(); ctx.globalAlpha*=zy; cellWith(ctx,960,500,88,ch4(P1[1],P2[0],P1[0],P2[0],1.05),{nuc:true}); ctx.restore();
      naamBij(ctx,'zygote','bevruchte eicel',960,370,zy,'center'); metaA(ctx,'weer diploïd · 2n',960,622,C.goud,ramp(t,q.at('diploïd'),0.3),20); }
    const kids=ramp(t,q.at('nakomelingen'),0.6);
    if(kids>0){ const K=[[P1[0],P2[1],P1[1],P2[0]],[P1[1],P2[0],P1[0],P2[0]],[P1[0],P2[0],P1[0],P2[1]],[P1[1],P2[1],P1[1],P2[1]]];
      K.forEach((c,i)=>{ ctx.save(); ctx.globalAlpha*=ramp(t,q.at('nakomelingen')+i*0.25,0.4); cellWith(ctx,600+i*240,765,56,ch4(c[0],c[1],c[2],c[3],0.7)); ctx.restore(); });
      metaA(ctx,'nakomelingen: allemaal anders',960,862,C.grain,kids,22); }
    pill(ctx,960,680,'variatie: door meiose en door toeval bij de bevruchting',C.groen,ramp(t,q.at('verschillen'),0.4),24);
    ctx.restore(); }
  if(B>0.01){ ctx.save(); ctx.globalAlpha*=B;
    const L=ramp(t,q.at('geslachtelijke',2)-0.2,0.5), R=ramp(t,q.at('geslachtelijke',3)-0.2,0.5);
    const ziek=ramp(t,q.at('ziekte'),1.6), dood=ramp(t,q.at('sterven'),0.6), ziekR=ramp(t,q.at('omgeving')-0.6,1.4), doodR=ramp(t,q.at('verandert'),0.6);
    const kols=[[500,'ongeslachtelijk',L],[1420,'geslachtelijk',R]];
    const VAR=[[C.vader,C.moeder],[C.moeder,'#3E7FA3'],['#A88440',C.vader],[C.goud,C.moeder],[C.vader,C.groen],[C.groen,'#A88440']];
    const blijft=[1,4];
    kols.forEach(([cx,naam,a],side)=>{ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
      roundRect(ctx,cx-420,150,840,700,18); shape(ctx,rgba(C.fill,0.45),C.line,1.2);
      text(ctx,naam,cx,225,fTekst(44,600),side?C.paars:C.goud,'center');
      for(let i=0;i<6;i++){ const x=cx-300+i*120, y=390; const c=side?VAR[i]:[C.goud,C.goud];
        const sterf=side?(blijft.includes(i)?0:doodR):dood; ctx.save(); ctx.globalAlpha*=1-0.75*sterf;
        cellWith(ctx,x,y,46,[{x:-11,y:0,len:46,color:c[0],dup:false,w:9},{x:11,y:0,len:46,color:c[1],dup:false,w:9}]); ctx.restore();
        if(sterf>0.05) crossOut(ctx,x,y,24,sterf);
        if(side&&blijft.includes(i)&&doodR>0){ ctx.save(); ctx.globalAlpha*=doodR; ctx.strokeStyle=C.groen; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y,58,0,6.2832); ctx.stroke(); ctx.restore(); } }
      const z=side?ziekR:ziek; if(z>0&&z<1){ for(let k=0;k<5;k++){ const x=cx-380+z*760, y=320+k*36; ctx.save(); ctx.globalAlpha*=Math.sin(z*Math.PI); dot0(ctx,x+Math.sin(k*2.1+t*3)*14,y,9,C.koraal); for(let s=0;s<6;s++){ const an=s/6*6.2832; ctx.strokeStyle=C.koraal; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+Math.sin(k*2.1+t*3)*14+Math.cos(an)*9,y+Math.sin(an)*9); ctx.lineTo(x+Math.sin(k*2.1+t*3)*14+Math.cos(an)*15,y+Math.sin(an)*15); ctx.stroke(); } ctx.restore(); } }
      const pros=side?[['− trager',C.koraal,'trager'],['+ variatie',C.groen,'variatie'],['meer kans dat sommige overleven',C.groen,'overleven']]:[['+ snel',C.groen,'snel'],['+ geen partner nodig',C.groen,'partner'],['− geen variatie',C.koraal,'gelijk']];
      pros.forEach(([s,col,cue],j)=>pill(ctx,cx,560+j*95,s,col,ramp(t,q.at(cue),0.4),30));
      if(!side) metaA(ctx,'nieuwe ziekte: allemaal tegelijk weg',cx,820,C.koraal,ramp(t,q.at('sterven'),0.4),20);
      if(side) metaA(ctx,'omgeving verandert: een paar overleven',cx,820,C.groen,ramp(t,q.at('verandert'),0.4),20);
      ctx.restore(); });
    ctx.restore(); }
  scaleBar(ctx);
},
  s30(ctx, t, q){
  micro(ctx); const nd=ramp(t,q.at('meiose'),0.6); const k1=1-nd;
  if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    const brk=ramp(t,q.at('Raken'),0.6), tum=ramp(t,q.at('tumor'),2.0), inv=ramp(t,q.at('kanker'),1.5);
    // tissue: neat row of cells
    for(let k=0;k<12;k++){ roundRect(ctx,180+k*130,620,120,90,14); shape(ctx,rgba(C.koraal,0.2),rgba(C.koraal,0.6),1.5); }
    if(tum>0){ const n=Math.floor(4+tum*40); for(let k=0;k<n;k++){ const a=hash(k*3)*6.28, d=Math.sqrt(hash(k*3+1))*lerp(40,200,tum); dot0(ctx,900+Math.cos(a)*d*1.3,430+Math.sin(a)*d*0.8,22,rgba(C.koraal,0.55)); } }
    if(inv>0){ for(let k=0;k<6;k++){ const u=clamp(inv*1.2-k*0.1,0,1); dot0(ctx,900+(k-2.5)*70,lerp(560,680,u),18,rgba(C.koraal,0.75)); } }
    // brake light
    const gx=1500, gy=250; roundRect(ctx,gx-50,gy-110,100,220,20); shape(ctx,rgba(C.bgSchema,0.9),C.line,1.5); dot0(ctx,gx,gy-50,30,C.groen); dot0(ctx,gx,gy+50,30,rgba(C.koraal,0.25)); if(brk>0.5) crossOut(ctx,gx,gy+50,26,brk); metaText(ctx,brk>0.5?'rem kapot: altijd groen':'controlepunt',gx,gy+150,C.grain,'center',22);
    pill(ctx,700,150,'normaal: alleen delen als het nodig is',C.groen,fadeIO(t,q.at('Normaal'),q.at('Raken'),0.4),28);
    pill(ctx,700,150,'fouten in het DNA: de rem gaat kapot',C.koraal,fadeIO(t,q.at('Raken'),q.at('tumor'),0.4),28);
    pill(ctx,700,150,'tumor: cellen blijven delen',C.koraal,fadeIO(t,q.at('tumor'),q.at('kanker'),0.4),28);
    pill(ctx,700,150,'kanker: cellen dringen andere weefsels binnen',C.koraal,ramp(t,q.at('kanker'),0.4),28); ctx.restore(); }
  if(nd>0){ ctx.save(); ctx.globalAlpha=nd; const sep=ramp(t,q.at('Soms',2),2.5), res=ramp(t,q.at('ene'),0.6);
    cellBody(ctx,960,430,520,280,ramp(t,q.at('ene'),1.0));
    // pair A fails to separate (both go left), pair B separates normally
    const y1=360, y2=520; chromX(ctx,960-34-sep*300,y1,110,C.vader,{w:16}); chromX(ctx,960+34-sep*240,y1,110,C.moeder,{w:16}); chromX(ctx,960-34-sep*300,y2,70,C.vader,{w:16}); chromX(ctx,960+34+sep*300,y2,70,C.moeder,{w:16});
    pill(ctx,960,100,'non-disjunctie: een paar gaat niet uit elkaar',C.koraal,ramp(t,q.at('disjunctie'),0.4),28);
    if(res>0){ ctx.save(); ctx.globalAlpha*=res; text(ctx,'één te veel',640,780,fTekst(34,700),C.koraal,'center'); text(ctx,'één te weinig',1280,780,fTekst(34,700),C.koraal,'center'); ctx.restore(); }
    const e=ramp(t,q.at('eicel'),0.5); if(e>0){ ctx.save(); ctx.globalAlpha*=e; bg(ctx,'micro'); egg(ctx,1100,470,150,1); text(ctx,'24',1100,330,fTekst(40,700),C.koraal,'center'); sperm(ctx,560,470,2,ramp(t,q.at('zaadcel'),0.4),0,t); ctx.save(); ctx.globalAlpha*=ramp(t,q.at('zaadcel'),0.4); text(ctx,'23',560,400,fTekst(40,700),C.text,'center'); ctx.restore(); if(!vragenUit2()) text(ctx,'?',1400,500,fTitel(90),C.goud,'center'); ctx.restore(); } ctx.restore(); }
  scaleBar(ctx);
}
});
MODEL.forEach(m => { m.color = /v$/.test(m.id) ? CD.vader : CD.moeder; });

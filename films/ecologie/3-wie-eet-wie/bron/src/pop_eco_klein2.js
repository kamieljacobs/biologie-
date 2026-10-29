// Ecologie v2, familie klein2 (29 okt 2026): gaai, pimpelmees, pissebed, regenworm, duizendpoot, leverbotslak (Galba truncatula),
// steenvlieglarve, eendagsvlieglarve, rode muggenlarve en planten (eikenblad in afbraak, witte klaver met wortelknolletjes, helm, struikheide,
// jonge grove den, berk en zomereik). POPBRIEF.md. Laadt NA pop_vogels.js (gebruikt VogelPop en VogelZang; voegt alleen nieuwe soorten toe).
// Aanroep voor alles: naam(ctx, x, y, s, { houding, t, kijk, a, ... }) met x/y = grondpunt, s = px per cm (zoals wolf in wolf_pop.js),
// t = fase 0..1 (mag doorlopen), kijk = ±1. Maten en bronnen: lessen_pop_eco_klein2.md.
const EcoK2 = (() => {
  const V = VogelPop, Z = VogelZang;
  const { RAD, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, mix, DK, LT, hermite, crs, cro, buis, tf, render, ik } = V;
  const VER = (c) => mix(c, 0.3, '#2E2B29');
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const TAU = Math.PI * 2;
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  // ============================== VOGELS ==============================
  // Gaai: eigen eenheid 1 = 1,25 mm (2,5 x de grondvink-eenheid), zodat het zangvogelsjabloon van VogelZang dezelfde getallen houdt.
  // Maten (bron wint): lengte 34 cm (32–36), vleugel 181 mm (BTO), staart ± 150 mm, tarsus ± 44 mm, snavel ± 30 mm.
  const EIKEL = { l: 2.2, b: 1.45 }; // zomereik-eikel (cm): 1,5–3 cm lang, napje ondiep (± 1/3)
  function eikel(ctx, x, y, a, k, o = {}) { // k = eenheden per cm; a = richting van de lange as (punt vooruit)
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(k, k); const l = EIKEL.l, b = EIKEL.b;
    const noot = [[-l * 0.5, 0], [-l * 0.42, -b * 0.44], [-l * 0.1, -b * 0.5], [l * 0.22, -b * 0.44], [l * 0.44, -b * 0.2], [l * 0.5, 0], [l * 0.44, b * 0.2], [l * 0.22, b * 0.44], [-l * 0.1, b * 0.5], [-l * 0.42, b * 0.44]];
    ctx.lineJoin = 'round'; vul(ctx, noot, o.ver ? VER('#A06C36') : '#A06C36', LT('#A06C36', 0.35), 0.06);
    vul(ctx, [[-l * 0.05, -b * 0.3], [l * 0.3, -b * 0.3], [l * 0.42, -b * 0.12], [l * 0.1, -b * 0.18]], '#BC8A50');
    circ(ctx, l * 0.5, 0, 0.05, '#5A3E22');
    const nap = [[-l * 0.52, 0], [-l * 0.5, -b * 0.47], [-l * 0.2, -b * 0.55], [-l * 0.14, -b * 0.3], [-l * 0.14, b * 0.3], [-l * 0.2, b * 0.55], [-l * 0.5, b * 0.47]];
    vul(ctx, nap, '#7A6648', LT('#7A6648', 0.3), 0.05);
    ctx.strokeStyle = '#5E4E36'; ctx.lineWidth = 0.035; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-l * (0.5 - i * 0.08), -b * 0.48); ctx.lineTo(-l * (0.5 - i * 0.08), b * 0.48); ctx.stroke(); }
    ctx.restore(); }

  function gaaiDef(o) {
    const pal = { basis: '#B08E80', rug: '#A28A82', buik: '#C6A496', keel: '#D6C6BA', mantel: '#A6897C' };
    const KS = 1.3, ks = (P) => P.map(q => [q[0] * KS, q[1] * KS]); // kop 1,3x zo groot als het zangvogelsjabloon (plaat: kop ± 1/3 van de lijfhoogte)
    const kop = { kl: '#B49284', K: ks([[-20, 16], [-21, -4], [-12, -19], [2, -24], [15, -21], [23, -11], [25, 3], [18, 13], [0, 18]]),
      lagen: [{ p: ks([[-34, -40], [34, -40], [22, -14], [10, -16], [-2, -17], [-14, -13], [-34, -4]]), c: '#E2D8D0' },
        { p: ks([[10, 7], [30, 3], [30, 30], [-4, 30], [2, 19]]), c: '#DCCEC4' }],
      na: (ctx, oo, P) => { ctx.save(); ctx.scale(KS, KS);
        ctx.fillStyle = '#2A2522'; for (const [x, y] of [[-8, -16], [-1, -18.5], [6, -17.5], [1, -14]]) { ctx.beginPath(); ctx.ellipse(x, y, 2.0, 1.0, -0.35, 0, TAU); ctx.fill(); } // kruin: 4 korte zwarte stippels
        vul(ctx, [[15.5, 0.5], [18.5, 3], [15, 8], [9, 14.5], [4, 19.5], [-0.5, 18.5], [1.5, 13.5], [7, 7], [12, 2]], '#1E1B1C'); // baardstreep: breed, vanaf de snavelbasis schuin naar achter-onder
        if (oo.eikelBek) eikel(ctx, 44 + EIKEL.l * 8 * 0.3, 1.5, 0.06, 8);
        vul(ctx, [[15, -7], [26, -7], [37, -4], [44, 0], [36, 1], [15, 1]], '#3A3A40', '#55555C', 0.8); // bovensnavel
        vul(ctx, [[15, 1], [36, 1], [43, 1.5], [33, 5], [15, 6]], '#4A4A50', '#5C5C62', 0.8); // ondersnavel
        lijn(ctx, [[16, 1], [42, 1]], '#1C1C20', 0.9);
        dierOog(ctx, 7, -4.5, 3.4, '#DCE6F0', { rand: '#C9BDB2' }); ctx.restore(); } };
    // open vleugel (vlucht): blauw gestreept vlak op de grote dekveren bij de pols, wit vlak op de basis van de binnenste armpennen
    const blauw = (ctx, g, pr, ver) => { const c = (k) => ver ? VER(k) : k; const d = g.dS, Q = (u0, u1, a, b) => [add(LP(g.Wr, g.E, u0), mul(d, a)), add(LP(g.Wr, g.E, u1), mul(d, a)), add(LP(g.Wr, g.E, u1), mul(d, b)), add(LP(g.Wr, g.E, u0), mul(d, b))].map(pr);
      ctx.fillStyle = c('#1E1E22'); V.pad(ctx, Q(-0.35, 0.05, 6, 30)); ctx.fill();
      ctx.fillStyle = c('#3A84C4'); V.pad(ctx, Q(0.0, 0.62, 10, 30)); ctx.fill();
      for (let k = 1; k < 6; k++) { const u = k / 6 * 0.62; const p = [add(LP(g.Wr, g.E, u), mul(d, 10)), add(LP(g.Wr, g.E, u), mul(d, 30))].map(pr); ctx.strokeStyle = c('#14223C'); ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.stroke(); }
      ctx.fillStyle = c('#F0EDE8'); V.pad(ctx, Q(0.66, 1.0, 22, 44)); ctx.fill(); };
    // dichte vleugel (zitten/staan): vlakken in schermrichting langs de vleugel (pols -> handpunt), zoals op de plaat:
    // roze schouderveren boven, blauw gestreept vlak (grote dekveren), zwart erachter met een wit vlak, zwarte tertiairen.
    const dicht = (P, Tb) => { const v = P.vl && P.vl.n; if (!v || v.f < 0.7 || (P.vl.vlieg && v.f < 0.95)) return [];
      const sp = Z.spec('gaai'); const Wd = sp.vl, g = V.vleugelGeo(Wd, v.f, v.sweep || 0), k = Math.sin(v.phi + V.EPS), sw = Tb(Wd.sch), ax = dir(P.tb), up = [Math.sin(P.tb), -Math.cos(P.tb)];
      const pr = (q) => add(sw, add(mul(ax, q[0]), mul(up, q[1] * k * (Wd.bk ?? 1))));
      const A = pr(g.Wr), B = pr(g.T), as = V.ang(sub(B, A)), e = dir(as), n = [-e[1], e[0]]; const at = (a, b) => add(A, add(mul(e, a + 12), mul(n, b))); // +12: patroon achter de (grotere) nek
      const D = [{ b: crs([[74, -45], [44, -45], [14, -38], [-4, -31], [14, -27], [46, -30], [72, -34]].map(q => [q[0] * 0.82, q[1] * 0.76]), 1).map(Tb), c: '#A6897C', r: false }];
      D.push({ b: crs([at(4, -6), at(46, -4), at(66, 6), at(58, 16), at(36, 15), at(10, 12), at(2, 4)], 1), c: '#1E1E22', r: false }); // zwart (handdekveren, tertiairen)
      D.push({ b: crs([at(40, 4), at(52, 3), at(58, 9), at(50, 14), at(40, 12)], 1), c: '#F2EFEA', r: false }); // één rustige witte vlek (basis armpennen)
      const bl = [at(-2, -3), at(34, -4), at(38, 11), at(2, 13)]; D.push({ b: crs(bl, 1), c: '#3C86C6', r: false, l: [{ p: [at(0, 6), at(40, 5), at(40, 14), at(0, 14)], c: '#2F72B0' }, ...[1, 2, 3, 4, 5].map(i => ({ lijn: [at(-2 + i * 6.3, -4), at(0 + i * 6.3, 13)], c: '#13213A', w: 0.9 }))] });
      D.push({ b: crs([at(-8, -10), at(20, -16), at(52, -14), at(70, -8), at(50, -6), at(30, -6), at(8, -4), at(-6, -2)], 1), c: '#A6897C', r: false }); // schouderveren (roze) over de bovenrand
      return D; };
    return { naam: 'gaai', kopF: [30, -118], pikR: 0.7, sx: 0.82, sy: 0.76, rw: 0.9, pal, kop, kopAan: [-8, 8], extra: { vlNa: dicht },
      tbStaan: -38, heupH: 58, tsStaan: 16, taStaan: 64, voetDx: [8, -6], tbTak: -40, heupTak: 46, tsTak: 16, taTak: 74,
      poot: { fem: 28, tib: 46, tars: 35, teen: 25, hal: 19, tw: 4.4, kl: '#A08478', klauw: '#2A2420', dij: [22, 13] }, dijKl: '#C2A092',
      staart: { L: 120, wb: 16, wt: 20, n: 6, kl: '#1E1E22', rand: '#4A4A50', rond: 1 },
      vl: { sch: [56, -29], hum: 30, uln: 36, man: 26, P: [94, 106, 114, 117, 116, 110, 102, 96, 92], S: [86, 85, 84, 83, 82, 82, 81, 80, 80], T: [62, 56, 48], pw1: 58,
        pal: { veer: '#2C2C30', zoom: '#8E8E94', dek: '#A3887C', onder: '#6E6A6C', kleinDek: '#A07A6A', tert: '#26221F', arm: '#1E1E22', hand: '#2E2E33', dekPatroon: (ctx, g, pr, ver) => blauw(ctx, g, pr, ver) } },
      rompLagen: (sx, sy) => { const sc = (P) => P.map(p => [p[0] * sx, p[1] * sy]);
        return [{ p: sc([[-70, -70], [130, -80], [110, -30], [60, -28], [0, -18], [-60, -8]]), c: pal.rug },
          { p: sc([[130, -16], [96, 2], [60, 14], [20, 18], [-20, 12], [-60, 2], [-70, 60], [130, 60]]), c: pal.buik },
          { p: sc([[-24, 16], [-60, 2], [-70, 60], [-4, 60]]), c: '#EEE8E2' },
          { p: sc([[-62, -10], [-30, -26], [-24, -44], [-70, -44]]), c: '#F2EEEA' }]; },
      bound: 0.1, slagen: 3, hup: { l: 80, h: 30 } }; }

  // Pimpelmees: variant van de koolmees (VogelZang.DEFS.koolmees), eenheid 1 = 0,5 mm x 0,83 (11,5 i.p.v. 14 cm).
  function pimpelDef(o) { const d = Z.DEFS.koolmees(o);
    const pal = { basis: '#8EA050', rug: '#8A9C4C', buik: '#E8CF3E', keel: '#E8CF3E', zwart: '#1E2A4E', mantel: '#8A9C4C' };
    d.naam = 'pimpelmees'; d.pal = pal;
    d.kop = { kl: '#F2F2EE', K: [[-22, 16], [-21, -8], [-9, -22], [8, -24], [20, -18], [26, -6], [26, 8], [16, 16], [-4, 20]],
      lagen: [{ p: [[-34, -40], [30, -40], [18, -16], [6, -15], [-6, -15], [-18, -11], [-34, -6]], c: '#3A7CC2' }, // blauwe kap
        { lijn: [[25, -4], [14, -8], [2, -8], [-12, -6], [-24, -4]], c: '#1E2A4E', w: 3.0 }, // oogstreep naar de nek
        { lijn: [[-24, -4], [-18, 6], [-6, 14], [8, 16], [18, 13], [24, 10]], c: '#1E2A4E', w: 3.2 }, // halsband om de witte wang
        { p: [[12, 13], [26, 9], [28, 24], [10, 24]], c: '#1E2440' }],
      na: (ctx, oo) => { vul(ctx, [[24, -4], [32, -1], [35, 1], [31, 3], [24, 4]], '#24252C', '#4A4C56', 0.8); lijn(ctx, [[25, 1], [34, 1]], '#0E0F12', 0.8); dierOog(ctx, 13, -8, 3.4, '#2A1A12'); if (oo.prooi) oo.prooi(ctx, 36, 0); } };
    d.poot = Object.assign({}, d.poot, { kl: '#6A7A94', klauw: '#2A2E38' }); d.dijKl = '#D8D2BC';
    d.staart = Object.assign({}, d.staart, { L: 108, kl: '#3E78BC', rand: '#7AA6D8', wit: null });
    d.vl = Object.assign({}, d.vl, { pal: { veer: '#3A70B0', zoom: '#B8CCE6', dek: '#4A86C4', onder: '#B4BCC6', band: '#F2F2EE', kleinDek: '#5A90C8', tert: '#4A7AB4' } });
    d.rompLagen = (sx, sy) => { const sc = (P) => P.map(p => [p[0] * sx, p[1] * sy]);
      return [{ p: sc([[-70, -70], [130, -80], [110, -30], [60, -28], [0, -18], [-60, -8]]), c: pal.rug },
        { p: sc([[130, -24], [96, -4], [60, 8], [20, 14], [-20, 10], [-60, 0], [-70, 60], [130, 60]]), c: pal.buik },
        { p: sc([[-30, 16], [-60, 2], [-70, 60], [-10, 60]]), c: '#E2E0D2' },
        { lijn: sc([[92, 2], [80, 16], [66, 26]]), c: '#6A7488', w: 1.6 }]; }; // smal donker buikstreepje (kort)
    return d; }
  Z.DEFS.gaai = gaaiDef; Z.DEFS.pimpelmees = pimpelDef;
  const VOGEL = { gaai: { u: 0.125 }, pimpelmees: { u: 0.05 * 0.83 } }; // cm per eenheid

  function nekPts(sp, P) { const Tb = tf(P.heup, P.tb), Tk = tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
  const TIP = [44 * 1.3, 1.3]; // snavelpunt gaai (kop-lokaal, kop 1,3x)
  // DUWEN (gaai): t 0–0,18 bukken met de eikel · 0,18–0,72 drie keer duwen (eikel zakt telkens dieper, blijft in de grond)
  // · 0,72–0,86 twee tikjes om de grond dicht te maken · 0,86–1 weer rechtop. Eikel 2,2 cm; diepte tot 2,6 cm (helemaal onder).
  function duwPose(sp, t, o) {
    const P0 = Z.pose(sp, 'staan', {}); const u = 1 / VOGEL.gaai.u; // eenheden per cm
    let a, D = null, tipY = null, los = false, dek = 0; const tkB = 1.2; // snavel ± 69° omlaag
    const Lac = EIKEL.l * u * Math.sin(tkB);
    if (t < 0.18) { a = ss(t / 0.18); }
    else if (t < 0.72) { a = 1; const q = (t - 0.18) / 0.54 * 3, k = Math.min(2, Math.floor(q)), w = q - k; const d0 = [0, 0.9, 1.8][k], d1 = [0.9, 1.8, 2.6][k];
      D = L(d0, d1, ss((w - 0.1) / 0.45)) * u; const lift = Math.sin(Math.PI * cl((w - 0.6) / 0.4, 0, 1)) * 12; tipY = D - Lac - lift; los = k > 0 || w > 0.6; }
    else if (t < 0.86) { a = 1; const w = (t - 0.72) / 0.14; D = 2.6 * u; dek = ss(w * 1.4); tipY = -4 - 10 * Math.abs(Math.sin(Math.PI * w * 2)); los = true; }
    else { a = 1 - ss((t - 0.86) / 0.14); D = 2.6 * u; dek = 1; los = true; }
    const P = { poot: P0.poot, vl: P0.vl }; P.tb = P0.tb + 40 * RAD * a; P.heup = add(P0.heup, [10 * a, 6 * a]); P.ts = P0.ts + 0.1 * a;
    P.tk = L(P0.tk, tkB, a); const tipNat = add(P0.kop, rot(TIP, P0.tk)); const tipX = tipNat[0] + 14;
    if (tipY == null) tipY = L(tipNat[1], -Lac, a * a); // bukken: snavel met eikel naar de grond
    const tip = [L(tipNat[0], tipX, a), tipY]; P.kop = sub(tip, rot(TIP, P.tk));
    P.nekPts = nekPts(sp, P);
    const ac = D == null ? null : { x: tipX, D, a: tkB };
    return { P, eikelBek: !los, ac, dek, tipX, Lac }; }

  function vogel(naam, ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return;
    const u = VOGEL[naam].u, su = s * u, kijk = o.kijk || 1, sp = Z.spec(naam, o); const vx = sp.def.voetX;
    let h = o.houding || 'staan'; const oo = Object.assign({}, o); if (o.takDik != null) oo.takDik = o.takDik / u; else oo.takDik = 1.0 / u;
    if (h === 'eikel') { h = 'staan'; oo.eikelBek = true; }
    let P, extra = null;
    if (h === 'duwen' && naam === 'gaai') { const r = duwPose(sp, fr(o.t || 0), o); P = r.P; oo.eikelBek = r.eikelBek && !r.ac; extra = r; }
    else P = Z.pose(sp, h, oo);
    const X = x - vx * su * kijk;
    if (extra && extra.ac) { // eikel in de grond (alleen het deel boven het maaiveld is zichtbaar) + kuiltje / dichtgemaakte grond
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(X, y); ctx.scale(su * kijk, su); const ac = extra.ac, k = 1 / u, half = EIKEL.l * k / 2;
      const c = [ac.x + Math.cos(ac.a) * half, ac.D - Math.sin(ac.a) * half];
      ctx.save(); ctx.beginPath(); ctx.rect(-1000, -1000, 2000, 1000); ctx.clip(); eikel(ctx, c[0], c[1], ac.a, k); ctx.restore();
      const Lac = EIKEL.l * k * Math.sin(ac.a), hx = ac.x + Math.cos(ac.a) * Math.max(0, (Lac - ac.D) / Math.sin(ac.a)) + 0.3 * k; ctx.fillStyle = '#4A3A2C'; ctx.beginPath(); ctx.ellipse(hx, 0, 1.2 * k, 0.3 * k, 0, 0, TAU); ctx.fill();
      if (extra.dek > 0) { ctx.fillStyle = '#6A5440'; ctx.beginPath(); ctx.ellipse(hx, 0, 1.4 * k * extra.dek, 0.45 * k * extra.dek, 0, Math.PI, 0); ctx.fill(); }
      ctx.restore(); }
    if (o.alleenDelen) return { P, sp, su, X, D: V.delen(sp, P, oo).D, oo };
    const D = V.teken(ctx, sp, P, X, y, su, oo); return { P, sp, su, X, D }; }

  // ============================== ONGEWERVELDEN ==============================
  // gemeenschappelijk: delen in cm, render met lichte silhouetrand (VogelPop.render, twee passes), kop naar +x.
  function teken(ctx, x, y, s, o, fn) { if ((o.a ?? 1) <= 0.01) return; const kijk = o.kijk || 1;
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * kijk, s); const r = fn(1.1 / s); ctx.restore(); return r; }
  const poot2 = (heup, voet, l1, l2, hoog = -1) => { const a = ik(heup, voet, l1, l2, 1), b = ik(heup, voet, l1, l2, -1); const kn = (a.knie[1] < b.knie[1]) === (hoog < 0) ? a.knie : b.knie; return kn; };
  // gang: positie van een voet t.o.v. de rust-x (stance: achteruit, zwaai: vooruit), fase p, duty b, amplitude A, zwaaihoogte h
  function voet(p, b, A, h) { p = fr(p); if (p < b) { const u = p / b; return [A * (0.5 - u), 0, true]; } const u = (p - b) / (1 - b); return [hermite(-A / 2, A / 2, -A * 0.4, -A * 0.4, u), -h * Math.sin(Math.PI * u), false]; }
  function oogje(ctx, x, y, r, kl = '#16161A') { ctx.save(); ctx.translate(x, y); ctx.scale(r / 10, r / 10); dierOog(ctx, 0, 0, 10, kl, { pupil: 'vol' }); ctx.restore(); }
  function sprieten(D, basis, a0, segs, w, kl, t, zw = 0.08) { // geleed sprietje (polylijn van buisjes)
    let p = basis, a = a0; for (let i = 0; i < segs.length; i++) { a += (i ? 0.06 : 0) + zw * Math.sin(TAU * t + i * 0.5) * 0.3; const q = add(p, mul(dir(a), segs[i]));
      D.push({ b: buis([p, q], [w * (1 - i * 0.04), w * (0.95 - i * 0.04)]).pts, c: i % 2 ? DK(kl, 0.12) : kl }); p = q; } return p; }

  // ---------- PISSEBED (Porcellio scaber / Oniscus asellus) ----------
  // 1,6 cm lang (P. scaber tot 2 cm), 0,75 cm breed, 7 paar looppoten (één per borstsegment), 7 borst- + 5 achterlijfsegmenten, telson + 2 uropoden.
  // Gang: metachrone golf van achter naar voor, links-rechts in tegenfase, duty 0,62; S = 0,42 cm per cyclus.
  const PIS = { L: 1.6, B: 0.75, S: 0.22, b: 0.62, kl: '#7E7E84', klD: '#66666C', rand: '#C2BCB2', poot: '#C8BEB0' };
  function pissebed(o = {}) { const t = o.t || 0, boven = o.houding === 'boven', D = [], h = PIS.L / 2, A = PIS.S * PIS.b, wx = o.vooruit ? PIS.S * t : 0;
    const segX = [0.62]; for (let i = 1; i <= 7; i++) segX.push(0.62 - i * 0.155); const pl = []; for (let i = 1; i <= 5; i++) pl.push(segX[7] - i * 0.046); // grenzen
    const legX = []; for (let i = 0; i < 7; i++) legX.push((segX[i] + segX[i + 1]) / 2);
    const fase = (i, ver) => t - (6 - i) / 7 + (ver ? 0.5 : 0);
    if (!boven) { // ZIJAANZICHT
      const bodem = -0.09, top = (x) => bodem - 0.36 * Math.pow(cl(1 - Math.pow(x / 0.8, 2), 0, 1), 0.5) - 0.02;
      const B = []; for (let i = 0; i <= 40; i++) { const x = -0.8 + 1.6 * i / 40; B.push([x, top(x)]); } for (let i = 40; i >= 0; i--) { const x = -0.8 + 1.6 * i / 40; B.push([x, bodem + 0.01 * Math.sin(x * 40)]); }
      const poten = (ver) => { for (let i = 0; i < 7; i++) { const [dx, dy, st] = voet(fase(i, ver), PIS.b, A, 0.05); const off = 0.04 - i * 0.025 + (ver ? 0.02 : 0);
        const heup = [legX[i] + wx, bodem - 0.03], F = [legX[i] + off + dx + wx, dy]; const kn = add(LP(heup, F, 0.45), [0.035, 0]);
        D.push({ b: buis([heup, kn, F], [0.05, 0.04, 0.018]).pts, c: ver ? VER(PIS.poot) : PIS.poot, na: o.steun && st && !ver ? (ctx) => circ(ctx, F[0], 0.03, 0.025, '#5CC48A') : null }); } };
      poten(true);
      const ant = (ver) => { const b0 = [0.76 + wx, -0.17]; sprieten(D, b0, (ver ? -0.1 : 0.15) + 0.06 * Math.sin(TAU * t), [0.06, 0.06, 0.08, 0.1, 0.11, 0.1, 0.09], 0.032, ver ? VER('#6A6A70') : '#6A6A70', t); };
      ant(true);
      const Bw = B.map(p => [p[0] + wx, p[1]]);
      D.push({ b: Bw, c: PIS.kl, l: [{ p: [[-1, bodem - 0.12], [1, bodem - 0.12], [1, 0.2], [-1, 0.2]].map(p => [p[0] + wx, p[1]]), c: PIS.klD },
        ...segX.concat(pl).map((sx, i) => ({ lijn: [[sx + wx + 0.01, top(sx) - 0.02], [sx + wx - 0.025, (top(sx) + bodem) / 2], [sx + wx - 0.035, bodem + 0.02]], c: PIS.rand, w: i < 8 ? 0.014 : 0.01 })),
        { p: [[0.62, -1], [1, -1], [1, 1], [0.62, 1]].map(p => [p[0] + wx, p[1]]), c: '#727278' }] });
      // uropode
      D.push({ b: buis([[-0.76 + wx, bodem - 0.04], [-0.9 + wx, bodem - 0.02]], [0.05, 0.015]).pts, c: '#8A8A90' });
      poten(false); ant(false);
      D.push({ na: (ctx) => oogje(ctx, 0.71 + wx, -0.24, 0.035) });
    } else { // BOVENAANZICHT (y = zijwaarts)
      const hw = (x) => PIS.B / 2 * Math.pow(cl(1 - Math.pow((x + 0.05) / 0.85, 2), 0, 1), 0.42);
      const poten = () => { for (const zk of [-1, 1]) for (let i = 0; i < 7; i++) { const [dx, , st] = voet(fase(i, zk > 0), PIS.b, A, 0.05); const off = 0.05 - i * 0.025;
        const heup = [legX[i] + wx, zk * hw(legX[i]) * 0.6], F = [legX[i] + off + dx + wx, zk * (hw(legX[i]) + 0.13 + (st ? 0 : -0.02))]; const kn = add(LP(heup, F, 0.5), [0, zk * 0.04]);
        D.push({ b: buis([heup, kn, F], [0.05, 0.04, 0.018]).pts, c: PIS.poot, na: o.steun && st ? (ctx) => circ(ctx, F[0], F[1], 0.025, '#5CC48A') : null }); } };
      poten();
      for (const zk of [-1, 1]) sprieten(D, [0.74 + wx, zk * 0.12], zk * (0.55 + 0.05 * Math.sin(TAU * t)), [0.06, 0.06, 0.08, 0.1, 0.11, 0.1, 0.09], 0.032, '#6A6A70', t);
      for (const zk of [-1, 1]) D.push({ b: buis([[-0.74 + wx, zk * 0.05], [-0.9 + wx, zk * 0.12]], [0.05, 0.015]).pts, c: '#8A8A90' });
      const O = []; for (let i = 0; i <= 50; i++) { const x = 0.8 - 1.6 * i / 50; let w = hw(x); if (x < segX[7]) w = Math.min(w, 0.2 + (x - segX[12 - 5]) * 0.3); const sp = x < 0.62 && x > segX[7] ? 0.015 * fr((0.62 - x) / 0.155) : 0; O.push([x, -(w + sp)]); }
      const O2 = O.map(p => [p[0], -p[1]]).reverse(); const body = O.concat(O2).map(p => [p[0] + wx, p[1]]);
      const lagen = [{ p: [[0.62, -1], [1, -1], [1, 1], [0.62, 1]].map(p => [p[0] + wx, p[1]]), c: '#727278' }];
      for (const sx of segX.concat(pl)) { const pts = []; for (let k = -10; k <= 10; k++) { const yy = k / 10 * 0.45; pts.push([sx + wx - 0.04 * (1 - Math.pow(k / 10, 2)), yy]); } lagen.push({ lijn: pts, c: PIS.rand, w: 0.014 }); }
      for (let i = 0; i < 14; i++) lagen.push({ p: crs([[0, -0.02], [0.03, 0], [0, 0.02], [-0.03, 0]].map(p => add(p, [legX[i % 7] - 0.05 + wx, (i < 7 ? -1 : 1) * (0.1 + 0.06 * rnd(i))]))), c: '#9A9AA0' });
      D.push({ b: body, c: PIS.kl, l: lagen });
      D.push({ na: (ctx) => { oogje(ctx, 0.7 + wx, -0.15, 0.03); oogje(ctx, 0.7 + wx, 0.15, 0.03); } });
    }
    return D; }

  // ---------- REGENWORM (Lumbricus terrestris) ----------
  // 20 cm (tot 30), diameter 0,8 cm, 140 segmenten, zadel (clitellum) op segment 32–37. Peristaltiek: golven lopen van kop naar staart;
  // dik/kort = verankerd (borstels uit), dun/lang = schuift vooruit (borstels in). 2 golven tegelijk op het lijf, lengteverandering ± 35%.
  const WORM = { N: 140, L: 20, r: 0.4, eps: 0.35, golven: 2, kl: '#B0625A', rug: '#8C4440', buik: '#CE8E80', zadel: '#D9927C' };
  function wormToestand(t) { const N = WORM.N, l0 = WORM.L / N, ls = [], rs = [], an = [];
    for (let i = 0; i < N; i++) { const w = cl(1.15 * Math.sin(TAU * (t - WORM.golven * i / N)), -1, 1); const k = 1 - WORM.eps * w; // w>0: dik/kort
      const taper = Math.min(1, 0.35 + i / 10 * 0.65) * Math.min(1, 0.55 + (N - 1 - i) / 22 * 0.45) * (i >= 31 && i <= 36 ? 1.12 : 1);
      ls.push(l0 * k); rs.push(WORM.r * taper / Math.sqrt(k)); an.push(w > 0.45); }
    return { ls, rs, an }; }
  const WCACHE = new Map();
  function wormKop(t) { // kop-positie zodat verankerde segmenten stilstaan (numeriek geïntegreerd vanaf t = 0)
    const key = Math.round(t * 960) / 960; if (WCACHE.has(key)) return WCACHE.get(key); const n = Math.max(1, Math.round(Math.abs(key) * 96)); let x = 0, prev = wormToestand(0);
    const pos = (S) => { const out = []; let c = 0; for (let i = 0; i < S.ls.length; i++) { out.push(c + S.ls[i] / 2); c += S.ls[i]; } return out; };
    let pp = pos(prev); for (let k = 1; k <= n; k++) { const tt = key * k / n, S = wormToestand(tt), p = pos(S); let sum = 0, m = 0;
      for (let i = 0; i < p.length; i++) if (S.an[i] && prev.an[i]) { sum += p[i] - pp[i]; m++; } if (m) x += sum / m; prev = S; pp = p; }
    WCACHE.set(key, x); return x; }
  function regenworm(o = {}) { const t = o.t || 0, boven = o.houding === 'boven', D = [], S = wormToestand(t); const xk = (o.vooruit ? wormKop(t) : 0) + WORM.L / 2;
    const buig = o.buig ?? (boven ? 1.2 : 0); const cs = []; let c = 0; const N = WORM.N;
    for (let i = 0; i < N; i++) { const xx = xk - c - S.ls[i] / 2; c += S.ls[i]; cs.push(xx); }
    const pad = (xx) => boven ? [xx, buig * Math.sin(xx / 4.2)] : [xx, 0]; // pad in de wereld (de worm volgt zijn spoor)
    const C = cs.map(pad), up = [], dn = []; for (let i = 0; i < N; i++) { const a = C[Math.max(0, i - 1)], b = C[Math.min(N - 1, i + 1)], d = sub(a, b), l = len(d) || 1, n = [-d[1] / l, d[0] / l];
      const r = S.rs[i] * (boven ? 1 : (i > N - 22 ? L(1, 0.8, (i - N + 22) / 22) : 1)); const cy = boven ? C[i] : [C[i][0], -r]; up.push(add(cy, mul(n, -r))); dn.push(add(cy, mul(n, r))); }
    const kopP = boven ? add(C[0], [S.rs[0] * 0.9, 0]) : [C[0][0] + S.rs[0] * 0.9, -S.rs[0] * 0.9]; const staartP = boven ? sub(C[N - 1], [S.rs[N - 1], 0]) : [C[N - 1][0] - S.rs[N - 1], -S.rs[N - 1] * 0.8];
    const body = [kopP, ...up, staartP, ...dn.reverse()]; dn.reverse();
    const lagen = [];
    if (!boven) { lagen.push({ p: [...up, ...up.map((p, i) => LP(p, dn[i], 0.42)).reverse()], c: WORM.rug }); lagen.push({ p: [...dn, ...dn.map((p, i) => LP(p, up[i], 0.22)).reverse()], c: WORM.buik }); }
    else { lagen.push({ p: [...up.map((p, i) => LP(p, dn[i], 0.25)), ...up.map((p, i) => LP(p, dn[i], 0.75)).reverse()], c: WORM.rug }); }
    lagen.push({ p: [...up.slice(30, 38), ...dn.slice(30, 38).reverse()], c: WORM.zadel });
    for (let i = 1; i < N; i++) { if (i > 30 && i < 38) continue; const a = LP(up[i - 1], up[i], 0.5), b = LP(dn[i - 1], dn[i], 0.5); lagen.push({ lijn: [a, b], c: 'rgba(70,30,28,0.16)', w: 0.016 }); }
    for (const i of [30, 37]) lagen.push({ lijn: [LP(up[i - 1], up[i], 0.5), LP(dn[i - 1], dn[i], 0.5)], c: 'rgba(120,60,50,0.5)', w: 0.03 });
    D.push({ b: body, c: WORM.kl, l: lagen });
    if (o.anker) D.push({ na: (ctx) => { for (let i = 0; i < N; i += 1) if (S.an[i] && i % 4 === 0) { ctx.fillStyle = '#F2C94C'; ctx.beginPath(); ctx.arc(C[i][0], boven ? C[i][1] : 0.06, 0.06, 0, TAU); ctx.fill(); } } });
    return D; }

  // ---------- DUIZENDPOOT (Lithobius forficatus) ----------
  // 2,5 cm (18–30 mm), 0,4 cm breed, kastanjebruin; 15 paar poten (het laatste paar lang en naar achter gericht, loopt niet mee),
  // tergieten afwisselend lang en kort, gifklauwen (forcipulen) onder de kop, sprieten ± 1 cm. Gang: golf van voor naar achter (retrograad),
  // links-rechts in tegenfase, duty 0,5, lichte zijwaartse golving van het lijf.
  const DZP = { L: 2.5, B: 0.4, S: 0.5, b: 0.5, kl: '#8A4A2A', klD: '#6E381E', rand: '#B87048', poot: '#D0904E', kop: '#6A3820' };
  function duizendpoot(o = {}) { const t = o.t || 0, D = [], wx = o.vooruit ? DZP.S * t : 0, A = DZP.S * DZP.b, n = 15;
    const x0 = 1.05, dxs = 2.05 / n; const seg = []; for (let i = 0; i < n; i++) seg.push(x0 - (i + 0.5) * dxs);
    const golf = (x) => 0.03 * Math.sin(TAU * (t * 2) + x * 3); const hw = (x) => DZP.B / 2 * (x > 0.95 ? 0.85 : x < -0.8 ? 0.8 + (x + 0.8) * 0.4 : 1);
    for (const zk of [-1, 1]) for (let i = 0; i < n; i++) { const x = seg[i], last = i === n - 1; const by = golf(x) + zk * hw(x) * 0.8; const heup = [x + wx, by];
      if (last) { const F = [x - 0.75 + wx, zk * 0.45 + golf(x - 0.7)]; D.push({ b: buis([heup, LP(heup, F, 0.4), F], [0.05, 0.04, 0.02]).pts, c: DZP.poot }); continue; }
      const [dx, , st] = voet(t * 2 + i * (2 / 14) + (zk > 0 ? 0.5 : 0), DZP.b, A / 2, 0.05); const ll = 0.3 + i * 0.012, off = 0.05 - i * 0.012;
      const F = [x + off + dx + wx, by + zk * (ll + (st ? 0 : -0.04))]; const kn = add(LP(heup, F, 0.45), [0.06, zk * 0.05]);
      D.push({ b: buis([heup, kn, F], [0.05, 0.04, 0.015]).pts, c: DZP.poot, na: o.steun && st ? (ctx) => circ(ctx, F[0], F[1], 0.03, '#5CC48A') : null }); }
    for (const zk of [-1, 1]) sprieten(D, [1.22 + wx, zk * 0.07], zk * (0.35 + 0.05 * Math.sin(TAU * t * 2 + zk)), new Array(14).fill(0.07), 0.03, '#A86438', t, 0.15);
    // lijf: segmenten als ronde plaatjes (lang/kort afwisselend)
    const O = []; const xs = []; for (let i = 0; i <= 60; i++) xs.push(1.12 - 2.3 * i / 60);
    for (const x of xs) O.push([x + wx, golf(x) - hw(x)]); for (const x of [...xs].reverse()) O.push([x + wx, golf(x) + hw(x)]);
    const lagen = []; let xb = x0; for (let i = 0; i < n; i++) { const xe = xb - dxs; const p = [[xb, -1], [xe + 0.02, -1], [xe + 0.02, 1], [xb, 1]].map(q => [q[0] + wx, q[1]]); lagen.push({ p, c: i % 2 ? DZP.klD : DZP.kl });
      lagen.push({ lijn: [[xe + wx + 0.02, golf(xe) - 0.3], [xe + wx - 0.01, golf(xe)], [xe + wx + 0.02, golf(xe) + 0.3]], c: DZP.rand, w: 0.02 }); xb = xe; }
    D.push({ b: O, c: DZP.kl, l: lagen });
    // kop met forcipulen
    const K = crs([[1.0, -0.2], [1.18, -0.2], [1.27, -0.12], [1.3, 0], [1.27, 0.12], [1.18, 0.2], [1.0, 0.2]].map(p => [p[0] + wx, p[1]]), 1);
    for (const zk of [-1, 1]) D.push({ b: buis([[1.08 + wx, zk * 0.12], [1.3 + wx, zk * 0.14], [1.36 + wx, zk * 0.04]], [0.06, 0.04, 0.01]).pts, c: '#5A2C18' });
    D.push({ b: K, c: DZP.kop, na: (ctx) => { oogje(ctx, 1.16 + wx, -0.13, 0.03); oogje(ctx, 1.16 + wx, 0.13, 0.03); } });
    return D; }

  // ---------- LEVERBOTSLAK (Galba truncatula) ----------
  // Huisje 1,0 cm hoog (5–12 mm), 0,5 cm breed, 5 windingen, spits en getrapt (diepe naden), rechtsgewonden, dun en bruin-doorschijnend,
  // mondopening < 1/2 van de hoogte. Eén paar platte driehoekige tentakels met de ogen aan de VOET (geen steeltjes-ogen zoals een tuinslak).
  const SLAK = { H: 1.0, kl: '#9A7A52', klL: '#C2A478', klD: '#5E4630', lijf: '#7A766C', lijfL: '#9C978A' };
  // huisje van Galba truncatula: 5 bolle, getrapte windingen (diepe naden), lichaamswinding ± 60% van de hoogte, mond ± 45% van de hoogte.
  // Lokale cm: apex (0, -H), basis rond y = 0, as verticaal. Naden zakken naar rechts (naar de mond) zoals bij een rechtsgewonden huisje.
  let _HUIS = null;
  const L1 = (a, b, u) => a + (b - a) * u;
  function huisje() { if (_HUIS) return _HUIS; const H = SLAK.H, nW = 5; const hs = [], rs = []; let h = 1, r = 0.25;
    for (let k = 0; k < nW; k++) { hs.push(h); rs.push(r); h *= 0.5; r *= 0.66; } const tot = hs.reduce((a, b) => a + b, 0); for (let k = 0; k < nW; k++) hs[k] *= H / tot;
    const Lz = [], Rz = [], naden = [], glans = []; let yb = 0; const ys = []; for (let k = 0; k < nW; k++) { ys.push([yb, yb - hs[k]]); yb -= hs[k]; }
    for (let k = nW - 1; k >= 0; k--) { const [y0, y1] = ys[k], r0 = rs[k], rUp = k < nW - 1 ? rs[k + 1] * 0.9 : 0.015, rDn = k ? rs[k - 1] * 0.88 : r0 * 0.55;
      for (let i = 0; i <= 10; i++) { const u = i / 10, y = L1(y1, y0, u); const bol = Math.sin(Math.PI * Math.min(1, 0.12 + u * 0.95)); const w = (k === 0 ? L1(rUp, rDn, u) : L1(rUp, rDn * 0.98, u)) * (1 - bol) + r0 * bol; // bolle winding: max r0 in het midden
        const sl = 0.035 * (k === nW - 1 ? 0 : 1); Lz.push([-w, y + sl]); Rz.push([w, y - sl]); }
      if (k < nW - 1) naden.push([[-rUp * 1.05, y1 + 0.035], [0, y1 + 0.005], [rUp * 1.05, y1 - 0.035]]); // naad loopt schuin omlaag naar links = rechtsgewonden van achteren gezien
      glans.push([[-r0 * 0.55, L1(y1, y0, 0.25)], [-r0 * 0.62, L1(y1, y0, 0.55)]]); }
    const omtrek = [...Lz, ...Rz.reverse()];
    return (_HUIS = { omtrek, naden, glans, ys, rs }); }
  function leverbotslak(o = {}) { const t = o.t || 0, D = [], wx = o.vooruit ? 0.25 * t : 0; const rek = 1 + 0.05 * Math.sin(TAU * t);
    // voet en kop
    const vl = 0.95 * rek; const voetP = [[-0.45, 0], [-0.32, -0.08], [0.1, -0.14], [0.38, -0.17], [0.5, -0.18], [0.57, -0.13], [0.59, -0.04], [0.55, 0], [0.1, 0.01]].map(p => [p[0] * vl / 0.95 + wx, p[1]]);
    const tent = (ver) => { const b = [0.48 * rek + wx, -0.15], a = -0.55 + (ver ? -0.25 : 0) + 0.12 * Math.sin(TAU * t + (ver ? 1 : 0)); const tip = add(b, mul(dir(a), 0.22)), n = mul(dir(a + Math.PI / 2), 0.05);
      D.push({ b: [add(b, n), tip, sub(b, n)], c: ver ? VER(SLAK.lijf) : SLAK.lijfL }); };
    tent(true);
    const lagen = [{ p: [[-1, -0.02], [1, -0.02], [1, 0.1], [-1, 0.1]], c: SLAK.lijf }];
    for (let k = 0; k < 4; k++) { const xx = -0.35 + fr(k / 4 - t) * 0.85 + wx; lagen.push({ lijn: [[xx, -0.03], [xx + 0.06, 0.0]], c: DK(SLAK.lijf, 0.2), w: 0.02 }); }
    D.push({ b: crs(voetP, 0.5), c: SLAK.lijfL, l: lagen, na: (ctx) => oogje(ctx, 0.47 * rek + wx, -0.13, 0.022) });
    tent(false);
    // huisje van achteren-opzij gezien (de mondopening ligt onderop, tegen de voet), top naar achter-boven
    const sh = huisje(); const as = o.huisHoek ?? -0.88, c0 = [0.12 + wx + 0.01 * Math.sin(TAU * t), -0.1];
    const T = (p) => add(c0, rot(p, as));
    D.push({ b: sh.omtrek.map(T), c: SLAK.kl, l: [{ p: sh.omtrek.map(p => [p[0] * 0.55 + sh.rs[0] * 0.42, p[1]]).map(T), c: DK(SLAK.kl, 0.1) }, ...sh.naden.map(N => ({ lijn: N.map(T), c: SLAK.klD, w: 0.014 })), ...sh.glans.map(G => ({ lijn: G.map(T), c: SLAK.klL, w: 0.035 }))] });
    return D; }

  // ---------- WATERLARVEN ----------
  // generieke insectenlarve: zij- of bovenaanzicht, kop naar +x. g = gegevens per soort.
  function larve(g, o = {}) { const t = o.t || 0, boven = o.houding === 'boven', D = [], wx = o.vooruit ? g.S * t : 0;
    const Lk = g.L, hw = (x) => g.B / 2 * g.prof(x / (Lk / 2)); // x van -L/2 (achter) tot +L/2 (kop)
    const hoogte = g.H;
    // poten (3 paar), driepootgang: (V1, A3, M2-ander) samen
    const legX = g.pootX.map(f => f * Lk / 2); const fasen = [0, 0.5, 0];
    const potenZij = (ver) => { legX.forEach((lx, i) => { const ph = fr(t * (o.lopen ? 1 : 0) + (i === 1 ? 0.5 : 0) + (ver ? 0.5 : 0)); const [dx, dy] = o.lopen ? voet(ph, 0.6, g.S * 0.6, 0.06) : [0, 0];
      const heup = [lx + wx, -hoogte * 0.45], F = [lx + g.pootOff[i] + dx + wx + (ver ? 0.04 : 0), dy]; const kn = poot2(heup, F, g.dij, g.scheen, -1);
      const c = ver ? VER(g.poot) : g.poot; D.push({ b: buis([heup, kn], [g.dijW, g.dijW * 0.7]).pts, c }); D.push({ b: buis([kn, F, add(F, [g.pootOff[i] > 0 ? 0.08 : -0.08, 0])], [g.dijW * 0.55, g.dijW * 0.4, 0.015]).pts, c: DK(c, 0.06) }); }); };
    const potenBoven = () => { for (const zk of [-1, 1]) legX.forEach((lx, i) => { const ph = fr(t * (o.lopen ? 1 : 0) + (i === 1 ? 0.5 : 0) + (zk > 0 ? 0.5 : 0)); const [dx] = o.lopen ? voet(ph, 0.6, g.S * 0.6, 0.06) : [0, 0];
      const heup = [lx + wx, zk * hw(lx) * 0.6], F = [lx + g.pootOff[i] * 1.2 + dx + wx, zk * (hw(lx) + g.dij * 0.9 + g.scheen * 0.5)]; const kn = [lx + g.pootOff[i] * 0.2 + wx + dx * 0.4, zk * (hw(lx) + g.dij * 0.85)];
      D.push({ b: buis([heup, kn], [g.dijW, g.dijW * 0.7]).pts, c: g.poot }); D.push({ b: buis([kn, F, add(F, [g.pootOff[i] > 0 ? 0.06 : -0.06, zk * 0.03])], [g.dijW * 0.55, g.dijW * 0.4, 0.015]).pts, c: DK(g.poot, 0.06) }); }); };
    // staartdraden en sprieten
    const draden = (zk, ver) => { for (let k = 0; k < g.cerci; k++) { const sp = g.cerci === 3 ? (k - 1) * 0.28 : (k - 0.5) * 0.5; const a = Math.PI + (boven ? sp : sp * 0.25 - 0.12) + 0.06 * Math.sin(TAU * t * 2 + k);
      const b0 = boven ? [-Lk / 2 + wx, sp * 0.05] : [-Lk / 2 + wx, -hoogte * 0.5]; const pts = [b0]; for (let i = 1; i <= 8; i++) pts.push(add(pts[i - 1], mul(dir(a + (i * 0.02) * (k - 1)), g.cercL / 8)));
      D.push({ b: buis(pts, [0.03, 0.012]).pts, c: ver ? VER(g.draad) : g.draad, na: g.franje ? (ctx) => { ctx.strokeStyle = rgba(g.draad, 0.4); ctx.lineWidth = 0.005; for (let i = 2; i < 8; i++) { const p = pts[i], n = mul(dir(a + Math.PI / 2), 0.04); ctx.beginPath(); ctx.moveTo(...sub(p, n)); ctx.lineTo(...add(p, n)); ctx.stroke(); } } : null }); } };
    const spriet = (zk, ver) => { const b0 = boven ? [Lk / 2 + wx - 0.02, zk * 0.06] : [Lk / 2 + wx - 0.02, -hoogte * 0.7]; const a = boven ? zk * 0.35 : -0.3 + (ver ? -0.08 : 0);
      const pts = [b0]; for (let i = 1; i <= 8; i++) pts.push(add(pts[i - 1], mul(dir(a + zk * i * 0.03 + 0.04 * Math.sin(TAU * t + i * 0.3)), g.sprL / 8))); D.push({ b: buis(pts, [0.025, 0.01]).pts, c: ver ? VER(g.draad) : g.draad }); };
    // kieuwplaatjes (eendagsvlieg): 7 paar op achterlijfsegment 1–7, slaan metachroon (golf van achter naar voor)
    const kieuwen = (zk, ver) => { if (!g.kieuw) return; for (let k = 0; k < 7; k++) { const xb = g.kieuwX0 - k * g.kieuwDx; const slag = Math.sin(TAU * (t * g.kieuwF) + (6 - k) * 0.55) * 0.6;
      const sz = g.kieuw * (1 - k * 0.06); if (boven) { const b0 = [xb + wx, zk * hw(xb) * 0.85], a = zk * (Math.PI / 2 + 0.45) + zk * slag * 0.5;
        const c = add(b0, mul(dir(a), sz * 0.55)); const P = []; for (let i = 0; i < 12; i++) { const q = i / 12 * TAU; P.push(add(c, add(mul(dir(a), Math.cos(q) * sz * 0.55), mul(dir(a + Math.PI / 2), Math.sin(q) * sz * 0.3)))); }
        D.push({ b: P, c: g.kieuwKl, o: [DK(g.kieuwKl, 0.15), 0.01] }); }
      else { const b0 = [xb + wx, -hoogte * (0.55 + (ver ? 0.15 : 0))]; const a = -Math.PI / 2 - 0.55 + slag * 0.7; const c = add(b0, mul(dir(a), sz * 0.5)); const P = [];
        for (let i = 0; i < 12; i++) { const q = i / 12 * TAU; P.push(add(c, add(mul(dir(a), Math.cos(q) * sz * 0.5), mul(dir(a + Math.PI / 2), Math.sin(q) * sz * 0.28 * (0.6 + 0.4 * Math.abs(Math.cos(TAU * t * g.kieuwF + (6 - k) * 0.55))))))); }
        D.push({ b: P, c: ver ? VER(g.kieuwKl) : g.kieuwKl, o: [DK(g.kieuwKl, 0.18), 0.01] }); } } };
    if (!boven) { draden(0, true); spriet(-1, true); potenZij(true); kieuwen(0, true);
      const xs = []; for (let i = 0; i <= 60; i++) xs.push(-Lk / 2 + Lk * i / 60); const top = (x) => -hoogte * 0.5 - hoogte * 0.5 * g.prof(x / (Lk / 2)), bot = (x) => -hoogte * 0.5 + hoogte * 0.45 * g.prof(x / (Lk / 2));
      const O = xs.map(x => [x + wx, top(x)]).concat([...xs].reverse().map(x => [x + wx, bot(x)]));
      const lagen = [{ p: xs.map(x => [x + wx, bot(x) - hoogte * 0.25 * g.prof(x / (Lk / 2))]).concat([...xs].reverse().map(x => [x + wx, 1])), c: g.klL }];
      g.segX.forEach((sx, i) => { const x = sx * Lk / 2; lagen.push({ lijn: [[x + wx, top(x) - 0.02], [x + wx - 0.01, bot(x) + 0.02]], c: DK(g.kl, 0.25), w: 0.012 }); });
      if (g.vlerk) lagen.push({ p: crs(g.vlerk.map(p => [p[0] * Lk / 2 + wx, top(p[0] * Lk / 2) + p[1]]), 0.5), c: g.klD });
      if (g.vlek) g.vlek(lagen, wx, top, bot, false);
      D.push({ b: O, c: g.kl, l: lagen, na: (ctx) => oogje(ctx, Lk / 2 * 0.86 + wx, -hoogte * 0.68, hoogte * 0.14) });
      if (g.kieuwTuft) for (const lx of legX) D.push({ na: (ctx) => { ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 0.012; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(lx + wx, -hoogte * 0.12); ctx.lineTo(lx + wx - 0.04 + k * 0.02, -hoogte * 0.12 + 0.06 + 0.01 * (k % 2)); ctx.stroke(); } } });
      kieuwen(0, false); potenZij(false); spriet(-1, false); draden(0, false); }
    else { draden(0, false); potenBoven(); for (const zk of [-1, 1]) spriet(zk, false); kieuwen(-1, false); kieuwen(1, false);
      const xs = []; for (let i = 0; i <= 60; i++) xs.push(Lk / 2 - Lk * i / 60); const O = xs.map(x => [x + wx, -hw(x)]).concat([...xs].reverse().map(x => [x + wx, hw(x)]));
      const lagen = []; g.segX.forEach((sx) => { const x = sx * Lk / 2; lagen.push({ lijn: [[x + wx, -hw(x)], [x + wx - 0.02, 0], [x + wx, hw(x)]], c: DK(g.kl, 0.25), w: 0.012 }); });
      lagen.push({ lijn: [[Lk / 2 + wx, 0], [-Lk / 2 + wx, 0]], c: DK(g.kl, 0.15), w: 0.012 });
      if (g.vlerkB) for (const zk of [-1, 1]) for (const vb of g.vlerkB) lagen.push({ p: crs(vb.map(p => [p[0] * Lk / 2 + wx, zk * p[1] * g.B / 2]), 0.5), c: g.klD });
      if (g.vlek) g.vlek(lagen, wx, null, null, true, hw);
      D.push({ b: O, c: g.kl, l: lagen, na: (ctx) => { for (const zk of [-1, 1]) oogje(ctx, Lk / 2 * 0.86 + wx, zk * hw(Lk / 2 * 0.86) * 0.8, g.B * 0.1); } }); }
    return D; }
  // Steenvlieglarve (Perlidae, bv. Perla): lijf 2,2 cm (8–30 mm), 2 staartdraden ± 1 cm, lange sprieten, 2 paar vleugelschedes,
  // witte kieuwbosjes aan de basis van de poten (onder het borststuk), stevige platte dijen. Geelbruin met donker patroon.
  const STEEN = { L: 2.2, B: 0.6, H: 0.4, S: 0.35, cerci: 2, cercL: 1.0, sprL: 1.0, kl: '#9A7E46', klD: '#6A5430', klL: '#C2A66A', poot: '#B09058', draad: '#9A8050',
    prof: (u) => u > 0.82 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.82) / 0.18, 2))) * 0.8 + 0.1 : u > 0.25 ? 0.95 : 0.35 + 0.6 * Math.pow((u + 1) / 1.25, 0.8),
    pootX: [0.62, 0.42, 0.22], pootOff: [0.42, 0.06, -0.45], dij: 0.42, scheen: 0.42, dijW: 0.09,
    segX: [0.82, 0.62, 0.42, 0.24, 0.1, -0.04, -0.18, -0.32, -0.46, -0.6, -0.74, -0.87], vlerk: [[0.55, 0.04], [0.32, 0.03], [0.24, 0.1], [0.46, 0.12]],
    vlerkB: [[[0.6, 0.3], [0.38, 0.7], [0.3, 0.95], [0.5, 0.75]], [[0.4, 0.3], [0.18, 0.7], [0.1, 0.95], [0.3, 0.75]]], kieuwTuft: true,
    vlek: (lagen, wx, top, bot, boven, hw) => { const Lk = 2.2; if (boven) { for (let i = 0; i < 6; i++) { const x = (-0.1 - i * 0.14) * Lk / 2; lagen.push({ p: crs([[x + 0.06, 0], [x, -0.07], [x - 0.06, 0], [x, 0.07]].map(p => [p[0] + wx, p[1]]), 0.5), c: '#5E4A2A' }); } }
      else lagen.push({ p: [[-1.2 + wx, -0.3], [0.9 + wx, -0.3], [0.9 + wx, -0.27], [-1.2 + wx, -0.27]], c: '#6A5430' }); } };
  // Eendagsvlieglarve (Cloeon / Baetidae): lijf 0,9 cm (3–20 mm), 3 staartdraden ± 0,5 cm met zwemfranje, 7 paar plaatvormige kieuwen
  // langs achterlijfsegment 1–7 die ritmisch slaan (golf van achter naar voor), slanke poten, olijfbruin.
  const EENDAG = { L: 0.9, B: 0.22, H: 0.16, S: 0.2, cerci: 3, cercL: 0.5, sprL: 0.32, kl: '#8A7C50', klD: '#62583A', klL: '#B4A678', poot: '#A89A6A', draad: '#9A8C5E', franje: true,
    prof: (u) => u > 0.8 ? Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.8) / 0.2, 2))) * 0.8 + 0.2 : u > 0.2 ? 1 : 0.3 + 0.7 * Math.pow((u + 1) / 1.2, 0.9),
    pootX: [0.62, 0.47, 0.32], pootOff: [0.12, 0.02, -0.14], dij: 0.11, scheen: 0.13, dijW: 0.03,
    segX: [0.78, 0.6, 0.46, 0.3, 0.14, 0.0, -0.14, -0.28, -0.42, -0.56, -0.7, -0.84], vlerk: [[0.5, 0.01], [0.24, 0.0], [0.18, 0.04], [0.42, 0.05]],
    vlerkB: [[[0.55, 0.3], [0.3, 0.7], [0.2, 0.95], [0.45, 0.8]]], kieuw: 0.11, kieuwX0: 0.12 * 0.45, kieuwDx: 0.062, kieuwF: 3, kieuwKl: '#C8BE98' };
  // Rode muggenlarve (Chironomus, 'bloedworm'): 1,5 cm (10–20 mm), 0,12 cm dik, rood door hemoglobine, donkere kopkapsel,
  // 1 paar voorschijnpootjes onder het borststuk, 1 paar naschuivers met haakjes, 4 anale papillen, 2 paar buisjes onder segment 11.
  // Zwemmen: grote zijwaartse 'achtjes'-slagen (figure-of-eight; Brackenbury), kop zakt aan het begin van elke halve slag.
  const MUG = { L: 1.5, d: 0.12, n: 12, kl: '#C42A38', klD: '#961C28', klL: '#E0505C', kop: '#5A3020' };
  function muggenlarve(o = {}) { const t = o.t || 0, boven = o.houding === 'boven', D = [], N = 40, ds = MUG.L / N; const amp = o.houding === 'rust' ? 0.15 : 1;
    // kromming langs het lijf (s = 0 kop, 1 staart): C-bocht die van kant wisselt + lopende component
    const kap = (s) => (boven ? 1 : 0.3) * amp * (4.2 * Math.sin(TAU * t) * (0.4 + 0.6 * Math.sin(Math.PI * s)) + 1.4 * Math.sin(TAU * t - 4 * s));
    const P = [[0, 0]]; let a = Math.PI + 0.3 * amp * Math.sin(TAU * t + 0.6); for (let i = 1; i <= N; i++) { a += kap(i / N) * ds; P.push(add(P[i - 1], mul(dir(a), ds))); }
    let cx = 0, cy = 0; for (const p of P) { cx += p[0]; cy += p[1]; } cx /= P.length; cy /= P.length;
    const rr = boven ? 0 : -ang(sub(P[0], P[N])); let Q = P.map(p => rot(sub(p, [cx, cy]), rr));
    if (!boven) { let ym = -1e9; for (const p of Q) ym = Math.max(ym, p[1]); Q = Q.map(p => [p[0], p[1] - ym - MUG.d * 0.5]); } const W = Q.map((p, i) => MUG.d * (i < 2 ? 0.8 : i > N - 3 ? 0.75 : 1));
    // naschuivers + papillen
    const e = Q[N], e2 = Q[N - 2], ae = ang(sub(e, e2));
    for (const zk of [-1, 1]) D.push({ b: buis([e, add(e, mul(dir(ae + zk * 0.5), 0.08))], [0.035, 0.02]).pts, c: '#E8D8C8' });
    for (const zk of [-1, 1]) D.push({ b: buis([LP(e, e2, 0.4), add(LP(e, e2, 0.4), mul(dir(ae + zk * 1.2), 0.06))], [0.03, 0.015]).pts, c: MUG.klL });
    const i11 = Math.round(N * 10.5 / 12); const b11 = Q[i11], a11 = ang(sub(Q[i11 + 1], Q[i11 - 1]));
    for (const zk of [-1, 1]) D.push({ b: buis([b11, add(b11, mul(dir(a11 + Math.PI / 2 * zk + 0.3 * zk), 0.11))], [0.03, 0.02]).pts, c: MUG.klD });
    const nb = buis(Q, W.map(w => w)); const segL = []; const M = nb.mid; for (let k = 1; k < MUG.n; k++) { const j = Math.round(k / MUG.n * (M.length - 1)); const d = sub(M[Math.min(M.length - 1, j + 1)], M[Math.max(0, j - 1)]), l = len(d) || 1, n = [d[1] / l * MUG.d * 0.55, -d[0] / l * MUG.d * 0.55]; segL.push({ lijn: [add(M[j], n), sub(M[j], n)], c: MUG.klD, w: 0.01 }); }
    D.push({ b: nb.pts, c: MUG.kl, l: [{ lijn: nb.mid.map((p, i, A) => { const n = A[Math.min(A.length - 1, i + 1)], d = sub(n, p), l = len(d) || 1; return add(p, mul([d[1] / l, -d[0] / l], MUG.d * 0.22)); }), c: MUG.klL, w: MUG.d * 0.22 }, ...segL] });
    // voorschijnpootjes
    const a0 = ang(sub(Q[0], Q[2])); D.push({ b: buis([Q[3], add(Q[3], mul(dir(a0 + Math.PI / 2 + 0.2), 0.09))], [0.04, 0.025]).pts, c: '#D88A70' });
    const K = []; for (let i = 0; i < 12; i++) { const q = i / 12 * TAU; K.push(add(Q[0], add(mul(dir(a0), Math.cos(q) * 0.085 + 0.04), mul(dir(a0 + Math.PI / 2), Math.sin(q) * 0.065)))); }
    D.push({ b: K, c: MUG.kop, na: (ctx) => oogje(ctx, ...add(Q[0], add(mul(dir(a0), 0.06), mul(dir(a0 - Math.PI / 2), 0.03))), 0.016) });
    return D; }

  // ============================== PLANTEN ==============================
  // Stilstaand; o.wind 0..1 (zacht wiegen, fase o.t, 1 cyclus = 0..1) en o.groei 0..1. Bovengronds wiegt, wortels niet. cm, grond y = 0.
  const wieg = (o, H) => { const w = o.wind || 0, t = o.t || 0; return (p) => { if (p[1] >= 0 || !w) return p; const h = -p[1] / H; return [p[0] + w * H * 0.035 * h * h * Math.sin(TAU * t - h * 0.9), p[1] + w * H * 0.004 * h * h * h]; }; };
  function lijnP(ctx, P, c, w) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  function vulP(ctx, P, c) { ctx.fillStyle = c; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); }
  // wortelstelsel: vertakte lijnen naar beneden (deterministisch)
  function wortels(ctx, x0, diepte, breed, n, kl, w0, seed = 1, cb = null, maxD = 3) { const tak = (p, a, l, w, d, s) => { if (d > maxD || l < diepte * 0.05) return; const pts = [p]; let q = p, aa = a;
      for (let i = 1; i <= 6; i++) { aa += (rnd(s * 7 + i) - 0.5) * 0.35; q = add(q, mul(dir(aa), l / 6)); q = [cl(q[0], x0 - breed, x0 + breed), q[1]]; pts.push(q); }
      lijnP(ctx, pts, kl, w); if (cb) cb(pts, d, s);
      for (let k = 1; k <= 3; k++) { const i = 1 + Math.floor(rnd(s * 3 + k) * 4); const zk = rnd(s * 11 + k) > 0.5 ? 1 : -1; tak(pts[i], Math.PI / 2 + zk * (0.6 + rnd(s + k) * 0.6), l * 0.55, w * 0.6, d + 1, s * 3 + k); } };
    for (let k = 0; k < n; k++) tak([x0 + (k - (n - 1) / 2) * 0.3, 0], Math.PI / 2 + (k - (n - 1) / 2) * (1.0 / Math.max(1, n - 1)) * 1.1, diepte * (0.75 + 0.3 * rnd(seed + k)), w0, 0, seed * 10 + k); }

  // ---------- EIKENBLAD in afbraak (o.stadium 0..1: vers → gaatjes → nerfskelet → snippers) ----------
  // Zomereikblad 11 cm (7–14 cm), 4–5 paar ronde lobben, zeer korte steel, oortjes aan de voet.
  const BLAD = { L: 11, B: 6.4 };
  function bladVorm() { const P = []; const n = 5; // lobben langs elke kant
    const rand = (u) => { const lob = Math.pow(Math.abs(Math.sin(u * n * Math.PI)), 0.7); const env = Math.sin(Math.PI * Math.pow(u, 0.85)) * (u < 0.12 ? 0.6 + u * 3.3 : 1); return env * (0.55 + 0.45 * lob); };
    for (let i = 0; i <= 80; i++) { const u = i / 80; P.push([u * BLAD.L, -BLAD.B / 2 * rand(u)]); } for (let i = 80; i >= 0; i--) { const u = i / 80; P.push([u * BLAD.L, BLAD.B / 2 * rand(u + 0.05)]); }
    return P; }
  const BLADP = bladVorm();
  function eikenblad(ctx, x, y, s, o = {}) { const st = cl(o.stadium || 0, 0, 1); if ((o.a ?? 1) <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.rotate(o.hoek ?? -0.2); ctx.scale(s * (o.kijk || 1), s); ctx.translate(-BLAD.L / 2, 0); // anker = midden van het blad
    const kl = st < 0.33 ? mix('#C08848', st / 0.33 * 0.6, '#8E5A30') : '#8E5A30', nerf = st < 0.5 ? '#6E4424' : mix('#D8C8A6', 0, '#D8C8A6');
    const nerven = () => { const P = [[0 - 0.8, 0], [BLAD.L, 0]]; const out = [P]; for (let k = 1; k <= 5; k++) for (const zk of [-1, 1]) { const u = (k - 0.5) / 5.3; out.push([[u * BLAD.L, 0], [u * BLAD.L + 1.2, zk * BLAD.B * 0.38 * Math.sin(Math.PI * Math.min(0.95, u + 0.1))]]); } return out; };
    const N = nerven();
    if (st < 0.66) { // 0–0,33 vers → gaatjes (vraat, schimmel); 0,33–0,66 het bladmoes verdwijnt, het nerfskelet blijft
      const holes = []; const nh = Math.round(cl(st / 0.33, 0, 1) * 14);
      for (let i = 0, tries = 0; holes.length < nh && tries < 400; tries++, i++) { const u = 0.14 + 0.78 * rnd(i * 3.1), v = (rnd(i * 5.7) - 0.5) * 0.7; const r = 0.18 + 0.32 * rnd(i * 1.3); const q = [u * BLAD.L, v * BLAD.B / 2];
        if (holes.every(h => Math.hypot(h[0] - q[0], h[1] - q[1]) > h[2] + r + 0.1)) holes.push([q[0], q[1], r * Math.min(1, 0.4 + cl(st / 0.33, 0, 1))]); }
      const bladA = st > 0.33 ? 1 - 0.7 * ss((st - 0.33) / 0.33) : 1;
      ctx.save(); ctx.beginPath(); BLADP.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.clip(); ctx.beginPath(); ctx.rect(-5, -10, BLAD.L + 10, 20); for (const [hx, hy, r] of holes) { ctx.moveTo(hx + r * 1.15, hy); ctx.ellipse(hx, hy, r * 1.15, r * 0.8, 0, 0, TAU); }
      ctx.fillStyle = st > 0.33 ? rgba(mix(kl, ss((st - 0.33) / 0.33), '#B89A72'), bladA) : kl; ctx.fill('evenodd');
      if (st > 0.2) { ctx.strokeStyle = rgba('#5A3418', 0.5 * cl((st - 0.2) / 0.1, 0, 1) * (st > 0.33 ? bladA : 1)); ctx.lineWidth = 0.08; for (const [hx, hy, r] of holes) { ctx.beginPath(); ctx.ellipse(hx, hy, r * 1.15, r * 0.8, 0, 0, TAU); ctx.stroke(); } } ctx.restore();
      lijnP(ctx, [[-0.8, 0], [0.2, 0]], '#6E4424', 0.18);
      const nkl = st < 0.33 ? '#7A4A26' : mix('#7A4A26', ss((st - 0.33) / 0.33), '#D8C8A6');
      N.forEach((P, i) => lijnP(ctx, P, nkl, i ? 0.08 : 0.17));
      if (st > 0.33) { const q = ss((st - 0.33) / 0.33); ctx.strokeStyle = rgba('#D8C8A6', q * 0.75); ctx.lineWidth = 0.035; // fijne nerven (netwerk) worden zichtbaar
        for (let k = 1; k < N.length; k++) { const [a0, a1] = N[k]; for (let j = 1; j < 4; j++) { const m = LP(a0, a1, j / 4), m2 = N[k + 2 < N.length ? k + 2 : k][1] ? LP(N[Math.min(N.length - 1, k + 2)][0], N[Math.min(N.length - 1, k + 2)][1], j / 4) : m; ctx.beginPath(); ctx.moveTo(...m); ctx.lineTo(...LP(m, m2, 0.5)); ctx.stroke(); } } } }
    else { // snippers: het skelet valt in stukjes die uit elkaar drijven en krimpen
      const q = (st - 0.66) / 0.34; const n = 9;
      for (let i = 0; i < n; i++) { const u = 0.1 + 0.8 * (i + 0.5) / n, v = (rnd(i * 9.1) - 0.5) * 0.5; const c = [u * BLAD.L, v * BLAD.B / 2]; const r = (0.9 - 0.5 * q) * (0.7 + 0.5 * rnd(i)); const d = mul([rnd(i * 2) - 0.5, rnd(i * 3) - 0.5], q * 3);
        const P = []; for (let k = 0; k < 7; k++) { const a = k / 7 * TAU; P.push(add(add(c, d), mul(dir(a), r * (0.7 + 0.5 * rnd(i * 10 + k))))); }
        ctx.save(); ctx.globalAlpha *= 1 - q * 0.25; vulP(ctx, crs(P, 0.2), mix('#8E5A30', 0.25 + 0.2 * rnd(i), '#5A3A22'));
        lijnP(ctx, [add(add(c, d), [-r * 0.6, 0]), add(add(c, d), [r * 0.6, rnd(i) - 0.5])], '#C8B48E', 0.05); ctx.restore(); } }
    ctx.restore(); }

  // ---------- WITTE KLAVER (Trifolium repens) ----------
  // Kruipende uitlopers, drietallige bladeren (blaadjes 1–2 cm met lichte V-tekening) op lange stelen, witte bolletjes ± 2 cm
  // op lange bloemstelen; plant 10–20 cm hoog. Wortels ± 15 cm met roze, langwerpige wortelknolletjes van 2–4 mm (actief = roze
  // van binnen door leghemoglobine). o.knol (standaard 1) vergroot alleen de knolletjes (bv. 2 voor een uitleg in de klas).
  function klaver(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const g = o.groei ?? 1, W = wieg(o, 14);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
    // kruipende stengel (uitloper) over de grond met knopen; uit elke knoop wortels omlaag en een bladsteel omhoog
    const L0 = 8 * g, knopen = [-L0, -L0 * 0.45, 0.15 * L0, L0 * 0.7].map(v => [v, -0.25]);
    // wortels: per knoop 2–3 rustige wortels met een paar zijwortels; ± 15 roze knolletjes (langwerpig, 2–4 mm)
    const kn = []; knopen.forEach(([kx], i) => { for (let r = 0; r < (i % 2 ? 2 : 3); r++) { const sd = i * 7 + r; const a0 = Math.PI / 2 + (r - 1) * 0.45 + (rnd(sd) - 0.5) * 0.3, l = (5 + 6 * rnd(sd * 3)) * (0.3 + 0.7 * g);
        const P = [[kx, 0]]; let q = [kx, 0], a = a0; for (let k = 1; k <= 6; k++) { a += (rnd(sd * 11 + k) - 0.5) * 0.3; q = add(q, mul(dir(a), l / 6)); P.push(q); } lijnP(ctx, P, '#C8AA84', 0.11);
        for (let z = 1; z <= 2; z++) { const b0 = P[1 + z * 2], za = a0 + (z % 2 ? 0.9 : -0.9), e = add(b0, mul(dir(za), l * 0.35)); lijnP(ctx, [b0, LP(b0, e, 0.5), e], '#C8AA84', 0.07); kn.push([LP(b0, e, 0.55), za, sd * 5 + z]); }
        kn.push([P[2], a0 + 1.4, sd * 13]); kn.push([P[4], a0 - 1.4, sd * 17]); } });
    kn.sort((a, b) => rnd(a[2]) - rnd(b[2])); const kk = (o.knol ?? 1) * Math.min(1, g * 1.5);
    for (const [p, a, sd] of kn.slice(0, Math.round(15 * Math.min(1, g * 1.3)))) { const l = (0.32 + 0.1 * rnd(sd)) * kk, b = 0.2 * kk; ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(a);
      ctx.fillStyle = '#E8809E'; ctx.strokeStyle = '#9A3E5E'; ctx.lineWidth = 0.035; ctx.beginPath(); ctx.ellipse(l * 0.3, 0, l / 2, b / 2, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#F2AFC2'; ctx.beginPath(); ctx.ellipse(l * 0.22, -b * 0.15, l * 0.2, b * 0.13, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    // uitloper (iets dikker, groen) met knoopjes
    lijnP(ctx, [[-L0 - 1, -0.15], ...knopen, [L0 + 1, -0.2]], '#6E9448', 0.28); for (const k of knopen) circ(ctx, k[0], k[1], 0.2, '#5E8440');
    // drietallig blad, licht schuin van opzij: blaadjes omgekeerd eirond (smalle voet, brede ronde top) met een lichte V-tekening
    const blaadje = (b, a, l, kl) => { const P = []; for (let i = 0; i <= 20; i++) { const u = i / 20; const w = l * 0.42 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 0.85 + 0.08)), 0.8) * (0.45 + 0.55 * u); P.push(add(b, add(mul(dir(a), u * l), mul(dir(a + Math.PI / 2), w)))); }
      for (let i = 20; i >= 0; i--) { const u = i / 20; const w = l * 0.42 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 0.85 + 0.08)), 0.8) * (0.45 + 0.55 * u); P.push(add(b, add(mul(dir(a), u * l), mul(dir(a - Math.PI / 2), w)))); }
      vulP(ctx, P.map(W), kl); const v = [add(b, add(mul(dir(a), l * 0.42), mul(dir(a + 1.57), l * 0.22))), add(b, mul(dir(a), l * 0.62)), add(b, add(mul(dir(a), l * 0.42), mul(dir(a - 1.57), l * 0.22)))];
      lijnP(ctx, v.map(W), '#B2D49C', 0.1); lijnP(ctx, [b, add(b, mul(dir(a), l * 0.9))].map(W), DK(kl, 0.12), 0.05); };
    const blad3 = (b, l, a0) => { blaadje(b, a0 - 1.15, l * 0.92, '#4A8442'); blaadje(b, a0 + 1.15, l * 0.92, '#4A8442'); blaadje(b, a0, l, '#56944C'); };
    const stelen = [[0, 6.5, -0.12, 1], [1, 8.5, 0.1, 0], [1, 5.5, -0.3, 1], [2, 7.5, 0.18, 0], [3, 6, 0.25, 1], [2, 9.5, -0.08, 1]];
    stelen.forEach(([ki, h, bo, z]) => { const k = knopen[ki], hh = h * g; const top = [k[0] + bo * hh, k[1] - hh]; lijnP(ctx, [k, [k[0] + bo * hh * 0.3, k[1] - hh * 0.55], top].map(W), '#78A058', 0.13);
      if (g > 0.15) blad3(top, 1.7 * Math.min(1, g * 1.3), -Math.PI / 2 + bo * 0.8 + (z ? 0.15 : -0.15)); });
    // witte bolvormige bloemhoofdjes (± 2 cm) op een lange steel; onderste bloempjes hangen al iets en zijn bruiniger
    if (g > 0.5) { const bl = Math.min(1, (g - 0.5) * 2.5); for (const [ki, h, bo] of [[1, 12.5, -0.05], [2, 14, 0.06]]) { const k = knopen[ki], top = [k[0] + bo * h * g, k[1] - h * g]; lijnP(ctx, [k, [k[0] + bo * h * g * 0.4, k[1] - h * g * 0.5], top].map(W), '#80A860', 0.12);
      const c = W(top), r = 1.0 * bl; ctx.fillStyle = '#D9CDB4'; ctx.beginPath(); ctx.arc(c[0], c[1] + 0.12 * bl, r * 0.92, 0, TAU); ctx.fill();
      for (let i = 0; i < 18; i++) { const a = -Math.PI / 2 + (i / 17 - 0.5) * 4.4; const p0 = add(c, mul(dir(a), r * 0.35)), p1 = add(c, mul(dir(a), r)); lijnP(ctx, [p0, p1], i % 4 ? '#F4F1E8' : '#E6DCC6', 0.26 * bl); }
      ctx.fillStyle = '#F7F4EC'; ctx.beginPath(); ctx.arc(c[0], c[1] - 0.1 * bl, r * 0.5, 0, TAU); ctx.fill(); } }
    ctx.restore(); }

  // ---------- HELM (Ammophila arenaria) op een duintje ----------
  // Pol 50–120 cm hoog, grijsgroene, ingerolde bladeren tot ± 1 m die overbuigen, strogele aar tot 30 cm; lange wortelstokken
  // die met het zand meegroeien en diep reiken (tekening tot ± 1,4 m onder het zand).
  function helm(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const g = o.groei ?? 1, W = wieg(o, 100);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
    // duintje (doorsnede): zand boven en onder het maaiveld
    const D = []; for (let i = 0; i <= 30; i++) { const u = i / 30 * 2 - 1; D.push([u * 70, -22 * Math.pow(Math.cos(u * Math.PI / 2), 1.6)]); } vulP(ctx, [...D, [70, 0], [-70, 0]], '#C9B48A');
    vulP(ctx, [...D, ...D.map(p => [p[0] * 0.97, p[1] * 0.85 + 0.5]).reverse()], '#DCC9A0');
    // wortelstokken + wortels
    ctx.save(); ctx.translate(0, -20); wortels(ctx, 0, 150 * (0.4 + 0.6 * g), 55, 4, '#9C8460', 0.9, 7, null, 2); lijnP(ctx, [[-55, 18], [-20, 10], [0, 4], [25, 12], [60, 20]], '#8A7250', 1.2); ctx.restore();
    // bladeren
    const n = 26; for (let i = 0; i < n; i++) { const b = (rnd(i * 1.7) - 0.5) * 12, lean = (i / (n - 1) - 0.5) * 1.6 + (rnd(i) - 0.5) * 0.4; const l = (60 + 45 * rnd(i * 2.9)) * g; const pts = [];
      for (let k = 0; k <= 10; k++) { const u = k / 10; const a = -Math.PI / 2 + lean * (0.25 + u * u * 1.1); const prev = k ? pts[k - 1] : [b, -20]; pts.push(k ? add(prev, mul(dir(a), l / 10)) : prev); }
      lijnP(ctx, pts.map(W), i % 3 ? '#7E9A78' : '#94AA88', 1.1); }
    if (g > 0.6) { const q = Math.min(1, (g - 0.6) * 2.5); for (const [b, h, le] of [[-3, 95, -0.08], [4, 105, 0.06], [9, 88, 0.15]]) { const base = [b, -20], top = [b + le * h, -20 - h * q]; lijnP(ctx, [base, LP(base, top, 0.5), top].map(W), '#B8A878', 0.6);
      const a = add(top, [0, 0]), bb = add(top, mul(dir(-Math.PI / 2 + le), -22 * q)); lijnP(ctx, [W(a), W(bb)], '#D6C48E', 2.6); } }
    ctx.restore(); }

  // ---------- STRUIKHEIDE (Calluna vulgaris) ----------
  // Dwergstruik 20–50 cm, houtige kronkelige takjes met piepkleine schubblaadjes (2–3 mm), lila-roze bloempjes in trossen, ondiepe fijne wortels.
  function struikheide(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const g = o.groei ?? 1, W = wieg(o, 40);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
    wortels(ctx, 0, 22 * (0.4 + 0.6 * g), 18, 4, '#8E6E52', 0.4, 4);
    const tak = (p, a, l, w, d, sd) => { const q = add(p, mul(dir(a), l)); lijnP(ctx, [p, LP(p, q, 0.5), q].map(W), '#6A4C36', w);
      if (d < 3) for (let k = 0; k < 3; k++) tak(LP(p, q, 0.5 + 0.25 * k), a + (rnd(sd + k) - 0.5) * 1.1, l * 0.62, w * 0.65, d + 1, sd * 3 + k);
      else { const n = 7; for (let k = 0; k < n; k++) { const u = k / n; const c = W(add(LP(p, q, 0.25 + u * 0.75), [0, 0])); ctx.fillStyle = '#4E7044'; ctx.beginPath(); ctx.ellipse(c[0] - 0.8, c[1], 1.0, 0.35, a, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(c[0] + 0.8, c[1], 1.0, 0.35, a, 0, TAU); ctx.fill();
          if (g > 0.6 && u > 0.35) { ctx.fillStyle = k % 2 ? '#D88CB4' : '#C878A4'; ctx.beginPath(); ctx.ellipse(c[0] + (k % 2 ? 0.9 : -0.9), c[1] + 0.3, 0.7 * Math.min(1, (g - 0.6) * 3), 0.5 * Math.min(1, (g - 0.6) * 3), 0, 0, TAU); ctx.fill(); } } } };
    for (let k = 0; k < 6; k++) tak([(k - 2.5) * 2, 0], -Math.PI / 2 + (k - 2.5) * 0.22, 16 * g, 1.1, 0, k + 1);
    ctx.restore(); }

  // ---------- JONGE BOMEN: grove den, ruwe berk, zomereik ----------
  // Grove den (Pinus sylvestris): 1,8 m, één takkrans per jaar, naalden per 2 (4–7 cm) blauwgroen, bovenstam oranjebruin, penwortel.
  // Ruwe berk (Betula pendula): 2,4 m, witte bast met donkere vlekken, hangende twijgjes, ruitvormige getande blaadjes 3–7 cm.
  // Zomereik (Quercus robur): 1,6 m, grillige vertakking, gelobde bladeren met zeer korte steel, sterke penwortel.
  // bladmassa: golvende ellips (rustige rand), punten door de wind-functie; 3 tonen (donker onder-rechts, midden, licht boven-links)
  function massa(ctx, W, c, rx, ry, sd, kl, golf = 0.1, n = 9) { const P = []; for (let i = 0; i < 48; i++) { const a = i / 48 * TAU; const r = 1 + golf * Math.sin(a * n + sd) * (0.6 + 0.4 * rnd(sd + i % n)); P.push([c[0] + Math.cos(a) * rx * r, c[1] + Math.sin(a) * ry * r]); } vulP(ctx, P.map(W), kl); }
  function kroonVlek(ctx, W, c, rx, ry, sd, tonen, golf, n) { massa(ctx, W, c, rx, ry, sd, tonen[0], golf, n); massa(ctx, W, [c[0] - rx * 0.08, c[1] - ry * 0.1], rx * 0.84, ry * 0.8, sd + 3, tonen[1], golf, n); massa(ctx, W, [c[0] - rx * 0.28, c[1] - ry * 0.32], rx * 0.45, ry * 0.4, sd + 7, tonen[2], golf * 0.8, n); }
  function boom(ctx, x, y, s, o, soort) { if ((o.a ?? 1) <= 0.01) return; const g = o.groei ?? 1; const H = { den: 180, berk: 240, eik: 160 }[soort] * (0.2 + 0.8 * g), W = wieg(o, H);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
    wortels(ctx, 0, H * 0.3, H * 0.26, 3, '#8A6A4C', H * 0.012, soort.length, null, 2); // rustiger: 3 hoofdwortels, 2 niveaus
    const sw = H * (soort === 'berk' ? 0.026 : soort === 'eik' ? 0.04 : 0.032);
    const stamPad = soort === 'eik' ? [[0, 0], [H * 0.02, -H * 0.2], [-H * 0.015, -H * 0.4], [H * 0.01, -H * 0.62], [0, -H * 0.8]] : [[0, 0], [H * 0.006, -H * 0.5], [-H * 0.004, -H * 0.98]];
    const stam = (kl, w0, w1) => { const P = V.cro(stamPad, H / 40); for (let i = 1; i < P.length; i++) { const u = i / P.length; lijnP(ctx, [P[i - 1], P[i]].map(W), kl, L(w0, w1, u)); } };
    if (soort === 'den') { // grove den: kroon in losse etages (pluimen), bovenstam oranje
      stam('#7A5038', sw, sw * 0.35); const Ps = V.cro(stamPad, H / 40); for (let i = Math.floor(Ps.length * 0.45); i < Ps.length; i++) lijnP(ctx, [Ps[i - 1], Ps[i]].map(W), '#D07E40', sw * 0.55 * (1 - i / Ps.length * 0.6));
      const T = ['#36604E', '#46745C', '#5E8E6E']; const et = Math.max(2, Math.round(5 * g));
      for (let k = 0; k < et; k++) { const h = 0.4 + k * 0.52 / et, w = H * 0.2 * (1 - k / et * 0.6), zk = k % 2 ? 1 : -1;
        for (const z of [-1, 1]) { const tw = [0, -H * h], e = [z * w * 0.95, -H * (h + 0.04)]; lijnP(ctx, [tw, LP(tw, e, 0.6)].map(W), '#6A4630', sw * 0.3);
          kroonVlek(ctx, W, [z * w * 0.55 + zk * H * 0.01, -H * (h + 0.05)], w * 0.55, H * 0.055, k * 5 + (z + 1), T, 0.14, 11); } }
      kroonVlek(ctx, W, [0, -H * 0.95], H * 0.07, H * 0.07, 41, T, 0.14, 11); }
    else if (soort === 'berk') { // berk: smalle luchtige kroon, hangende twijgjes, witte stam met zwarte vlekken
      const T = ['#5C8C3E', '#72A24C', '#94BE68'];
      for (let k = 0; k < 7; k++) { const zk = k % 2 ? 1 : -1, h = 0.4 + k * 0.08, b0 = [0, -H * h], e = [zk * H * (0.08 - k * 0.006), -H * (h + 0.08)]; lijnP(ctx, [b0, LP(b0, e, 0.5), e].map(W), '#5A4A42', sw * 0.3);
        for (let j = 0; j < 3; j++) { const q = LP(b0, e, 0.4 + j * 0.25); lijnP(ctx, [q, add(q, [zk * H * 0.015, H * 0.05]), add(q, [zk * H * 0.02, H * 0.09])].map(W), '#6A5A50', 0.35); } } // hangende twijgjes
      for (const [cx, cy, rx, ry, sd] of [[-0.05, 0.52, 0.075, 0.08, 1], [0.05, 0.6, 0.075, 0.08, 2], [-0.04, 0.7, 0.07, 0.07, 3], [0.04, 0.79, 0.06, 0.07, 4], [0, 0.89, 0.05, 0.06, 5]])
        kroonVlek(ctx, W, [cx * H, -cy * H], rx * H, ry * H, sd * 7, T, 0.16, 13);
      for (let i = 0; i < 6; i++) { const j = 0.45 + i * 0.09, q = [0, -H * j], zk = i % 2 ? 1 : -1; lijnP(ctx, [add(q, [zk * H * 0.03, 0]), add(q, [zk * H * 0.07, H * 0.06]), add(q, [zk * H * 0.09, H * 0.12])].map(W), '#5E8E40', 0.5); }
      stam('#ECE8DE', sw, sw * 0.3); const Ps = V.cro(stamPad, H / 40);
      for (let i = 0; i < 9; i++) { const p = W(Ps[Math.floor((0.06 + i * 0.075) * Ps.length)]), wv = sw * (0.8 - i * 0.05); vulP(ctx, [[p[0] - wv * 0.5, p[1]], [p[0] + wv * (i % 2 ? 0.1 : 0.35), p[1] - H * 0.008], [p[0] + wv * 0.2, p[1] + H * 0.006]], '#2E2A28'); } }
    else { // zomereik: brede ronde kroon uit wolkvormige bladmassa's, knoestige stam die zich in de kroon vertakt
      const T = ['#3E6A32', '#4E7E3C', '#6E9C52'];
      stam('#5E4A38', sw, sw * 0.45); for (const [z, h, e] of [[-1, 0.5, [-0.16, 0.66]], [1, 0.58, [0.17, 0.7]], [-1, 0.68, [-0.09, 0.82]]]) { const b0 = [0, -H * h]; lijnP(ctx, [b0, [e[0] * H * 0.6, -H * (h + 0.08)], [e[0] * H, -H * e[1]]].map(W), '#5E4A38', sw * 0.4); }
      for (const [cx, cy, rx, ry, sd] of [[-0.17, 0.66, 0.12, 0.1, 1], [0.18, 0.7, 0.12, 0.1, 2], [0, 0.66, 0.15, 0.12, 3], [-0.09, 0.82, 0.13, 0.1, 4], [0.1, 0.84, 0.12, 0.1, 5], [0, 0.95, 0.1, 0.08, 6]])
        kroonVlek(ctx, W, [cx * H, -cy * H], rx * H, ry * H, sd * 5, T, 0.12, 8);
      for (const [z, h] of [[-1, 0.4], [1, 0.46]]) { const b0 = [0, -H * h]; lijnP(ctx, [b0, [z * H * 0.06, -H * (h + 0.04)]].map(W), '#5E4A38', sw * 0.25); } }
    ctx.restore(); }

  return { RAD, vogel, duwPose, eikel, EIKEL, VOGEL, teken, render, pissebed, PIS, regenworm, WORM, wormToestand, wormKop, duizendpoot, DZP, leverbotslak, SLAK, larve, STEEN, EENDAG, muggenlarve, MUG,
    eikenblad, klaver, helm, struikheide, boom, BLAD };
})();

// ---- aanroep: naam(ctx, x, y, s, o), s = px per cm, x/y = grondpunt ----
function ecoGaai(ctx, x, y, s, o = {}) { return EcoK2.vogel('gaai', ctx, x, y, s, o); }               // houding: staan | eikel | duwen (t) | tak | vliegen (t) | hippen (t) | pikken
function ecoPimpelmees(ctx, x, y, s, o = {}) { return EcoK2.vogel('pimpelmees', ctx, x, y, s, o); }   // zelfde houdingen als de koolmees: staan | tak | schuin | klampen | vliegen | hippen | pikken
function _ecoK2(fn) { return (ctx, x, y, s, o = {}) => EcoK2.teken(ctx, x, y, s, o, (rw) => { const D = fn(o); EcoK2.render(ctx, D, rw); return D; }); }
const ecoPissebed = _ecoK2(EcoK2.pissebed);        // houding: 'zij' (standaard) | 'boven'; t = loopfase; vooruit: true = steunpoten staan stil in de wereld
const ecoRegenworm = _ecoK2(EcoK2.regenworm);      // houding: 'zij' | 'boven' (volgt een S-spoor, o.buig); t = peristaltiekfase; vooruit; anker: true toont verankerde segmenten
const ecoDuizendpoot = _ecoK2(EcoK2.duizendpoot);  // bovenaanzicht; t = loopfase; vooruit
const ecoLeverbotslak = _ecoK2(EcoK2.leverbotslak); // kruipen; t; vooruit
const ecoSteenvlieglarve = _ecoK2((o) => EcoK2.larve(EcoK2.STEEN, o));   // houding: 'zij' | 'boven'; lopen: true (driepootgang met t)
const ecoEendagsvlieglarve = _ecoK2((o) => EcoK2.larve(EcoK2.EENDAG, o)); // houding: 'zij' | 'boven'; t = kieuwslag (3 slagen per t-eenheid)
const ecoMuggenlarve = _ecoK2(EcoK2.muggenlarve);  // houding: 'zij' | 'boven' | 'rust'; t = kronkelfase (achtjesslag)
function ecoEikenblad(ctx, x, y, s, o = {}) { return EcoK2.eikenblad(ctx, x, y, s, o); } // o.stadium 0..1, o.hoek; anker = midden van het blad
function ecoKlaver(ctx, x, y, s, o = {}) { return EcoK2.klaver(ctx, x, y, s, o); }       // o.wind, o.t, o.groei, o.knol
function ecoHelm(ctx, x, y, s, o = {}) { return EcoK2.helm(ctx, x, y, s, o); }           // anker = voet van de pol op het maaiveld van het duintje
function ecoStruikheide(ctx, x, y, s, o = {}) { return EcoK2.struikheide(ctx, x, y, s, o); }
function ecoGroveDen(ctx, x, y, s, o = {}) { return EcoK2.boom(ctx, x, y, s, o, 'den'); }
function ecoBerk(ctx, x, y, s, o = {}) { return EcoK2.boom(ctx, x, y, s, o, 'berk'); }
function ecoZomereik(ctx, x, y, s, o = {}) { return EcoK2.boom(ctx, x, y, s, o, 'eik'); }
// korte namen (bestonden nog niet in src/)
var gaai = ecoGaai, pimpelmees = ecoPimpelmees, pissebed = ecoPissebed, regenworm = ecoRegenworm, duizendpoot = ecoDuizendpoot, leverbotslak = ecoLeverbotslak,
  steenvlieglarve = ecoSteenvlieglarve, eendagsvlieglarve = ecoEendagsvlieglarve, muggenlarve = ecoMuggenlarve, eikenblad = ecoEikenblad, witteKlaver = ecoKlaver,
  helm = ecoHelm, struikheide = ecoStruikheide, groveDen = ecoGroveDen, berk = ecoBerk, zomereik = ecoZomereik;

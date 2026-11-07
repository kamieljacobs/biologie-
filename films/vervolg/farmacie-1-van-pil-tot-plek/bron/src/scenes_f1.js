// Wat word jij? · Farmacie en Verpleegkunde · Van pil tot plek en weer terug — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Noor en Opa Henk aan tafel met de pillendoos; Apotheker Ravi in de recap).
// Rode draad: Noor vult de pillendoos van Opa Henk. 'De bloeddrukpil' = amlodipine (docentdeel).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
const PARA = C.teal;
// keuken: Noor en Opa Henk aan tafel met de pillendoos
function keuken(ctx, t, o = {}) { const { bd = 0, uitN = 'blij', uitH = 'neutraal', poseN = 'staan', poseH = 'staan', hold = null } = o;
  persoon(ctx, 'noor', 440, 880, 420, { t, kijk: 1, uit: uitN, pose: poseN, hold });
  persoon(ctx, 'henk', 1530, 880, 460, { t, kijk: -1, uit: uitH, pose: poseH });
  tafel(ctx, 650, 240, 1720); pillendoos(ctx, 700, 490, 520, o.doosA == null ? 1 : o.doosA, { bd }); }
// halveringscurves
const halfP = (x) => 100 * Math.pow(0.5, x / 2);
const bateman = (x) => 160 * (Math.exp(-0.3466 * x) - Math.exp(-2 * x));
const zaag = (d) => { let s = 0; for (let n = 0; n <= Math.floor(d + 1e-9); n++) s += 30 * Math.pow(0.5, (d - n) / 1.5); return s; };

Object.assign(SCENES, {
  title(ctx, t) { pillendoos(ctx, 1100, 650, 620, 1, { bd: 7, labels: false }); tablet(ctx, 1500, 560, 22); capsule(ctx, 1600, 575, 1.6, PIL.bd, '#F2F2EE', -0.3); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('verschil', 1);
    keuken(ctx, t, { bd: clamp((t - q.at('bloeddrukpil', 1) - 0.3) * 2.4, 0, 7), doosA: q.on('pillendoos', 1), poseN: 'staan', uitH: V > 0.5 ? 'denkt' : 'neutraal', poseH: 'staan' });
    const nm = q.on('Noor', 1) * (1 - q.on('bloeddrukpil', 1)); naamBij(ctx, 'Noor', '', 440, 420, nm, 'center'); naamBij(ctx, 'Opa Henk', '', 1530, 400, nm, 'center');
    blister(ctx, 1290, 440, 4, q.on('paracetamol', 1));
    chip(ctx, 'bloeddrukpil · 1× per dag', 960, 380, PIL.bd, q.on('één', 1), 28); chip(ctx, 'paracetamol · tot 4× per dag', 1330, 300, PARA, q.on('vier', 1), 28);
    vraagteken(ctx, 960, 250, V, 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('binnenkomen', 1, 0.8), D = q.on('Daarvoor', 1, 0.8), M = q.on('membraan', 1, 0.8);
    antwoord(ctx, 'Antwoord b', 1 - B);
    laag(ctx, 1 - B, () => { capsule(ctx, 700, 470, 3, PIL.bd, '#F2F2EE', -0.3); tablet(ctx, 1220, 470, 44);
      naamBij(ctx, 'bloeddrukpil', 'traag opgeruimd', 700, 600, q.on('opruimt', 1), 'center'); naamBij(ctx, 'paracetamol', 'snel opgeruimd', 1220, 600, q.on('opruimt', 1), 'center');
      chip(ctx, 'niet: hoe sterk · wel: hoe snel weg', 960, 330, C.goud, q.on('lichaam', 1), 28); });
    // maag en darm
    laag(ctx, ramp(t, q.at('binnenkomen', 1) + 0.9, 0.6) * (1 - D), () => { maag(ctx, 700, 380, 1, 1); dunneDarm(ctx, 1200, 660, 0.9, 1);
      naamBij(ctx, 'maag', '', 940, 260, q.on('maag', 1), 'left'); naamBij(ctx, 'dunne darm', '', 1200, 520, q.on('darm.', 1), 'center');
      const tv = q.at('valt', 1), fall = clamp((t - tv + 0.4) / 0.8, 0, 1), split = clamp((t - tv - 0.4) / 1.2, 0, 1), go = clamp((t - q.at('opgenomen', 1)) / 1.8, 0, 1);
      if (split < 0.05) capsule(ctx, 700, lerp(100, 400, ease(fall)), 1.6, PIL.bd, '#F2F2EE', -0.3 + fall);
      else for (let i = 0; i < 12; i++) { const w = wander(i, t, 10, 0.6), sx = 700 + (hash(i * 3) - 0.5) * 180 * split + w.x, sy = 410 + (hash(i * 5) - 0.5) * 120 * split + w.y, tx = 1050 + (i % 6) * 60, ty = 590 + Math.floor(i / 6) * 140;
        molecuul(ctx, lerp(sx, tx, ease(go - (i % 4) * 0.05)), lerp(sy, ty, ease(go - (i % 4) * 0.05)), 1.1, PIL.bd, 1); } });
    // darmcellen in een boog (de darm is rond)
    const cx = 960, cy = 2450, R = 2000;
    laag(ctx, D * (1 - M), () => { darmBoog(ctx, cx, cy, R, -Math.PI / 2 - 0.39, -Math.PI / 2 + 0.39, 6, 170, 1);
      tag(ctx, 'film: Van darm naar bloed', 960, 110, C.teal, 1, 'center', 26); naamBij(ctx, 'darmcellen', '', 960, 360, 1, 'center'); naamBij(ctx, 'darmholte', '', 960, 640, 1, 'center'); naamBij(ctx, 'bloed', '', 1500, 230, 1, 'center');
      for (let i = 0; i < 8; i++) { const ph = (t * 0.25 + hash(i * 7)) % 1, an = -Math.PI / 2 + (hash(i * 11) - 0.5) * 0.6, r = R - 260 + ph * 480; const [x, y] = opBoog(cx, cy, r, an); molecuul(ctx, x, y, 1, PIL.bd, clamp(1.5 - Math.abs(ph - 0.5) * 3, 0, 1)); } });
    // het membraan: dubbel laagje vet
    const mx = 960, my = 2700, MR = 2200;
    laag(ctx, M, () => { dubbelLaag(ctx, mx, my, MR, -Math.PI / 2 - 0.4, -Math.PI / 2 + 0.4, 130, 1, t);
      naamBij(ctx, 'membraan', 'dubbel laagje vet', 1450, 330, q.on('vet.', 1), 'center'); naamBij(ctx, 'darmholte', '', 300, 800, 1, 'center'); naamBij(ctx, 'in de darmcel', '', 300, 300, 1, 'center');
      tag(ctx, 'film: Diffusie en osmose', 960, 110, C.teal, q.on('dubbel', 1), 'center', 26);
      const tv = q.at('vet', 2), uv = clamp((t - tv) / 2.4, 0, 1); vetStof(ctx, 760, lerp(800, 330, ease(uv)) + Math.sin(t * 2) * 4, 1, q.on('vet', 2, 0.3));
      naamBij(ctx, 'lost op in vet', '', 760 + 100, lerp(800, 330, ease(uv)) + 10, q.on('vet', 2), 'left', '#F0C060');
      const tw = q.at('water', 1), uw = clamp((t - tw) / 1.6, 0, 1), yw = uw < 0.6 ? lerp(830, 720, ease(uw / 0.6)) : lerp(720, 790, ease((uw - 0.6) / 0.4)); waterStof(ctx, 1250, yw, 1, q.on('water', 1, 0.3), t);
      naamBij(ctx, 'lost alleen op in water', '', 1335, yw + 12, q.on('water', 1), 'left', C.teal); kruis(ctx, 1250, 650, 22, q.on('slecht', 1));
      chip(ctx, 'een goed medicijn lost ook in vet op', 960, 220, C.goud, q.on('ontwerpt', 1), 28); }); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('nitroglycerine', 1);
    const path = [[430, 690], [470, 610], [500, 520], [560, 440], [700, 360], [880, 330], [1060, 330]];
    dunneDarm(ctx, 430, 690, 0.7, 1); vat(ctx, path.slice(0, 5), '#7A6AB8', 26, 1); vat(ctx, path.slice(4), '#D8573F', 26, 1); leverVorm(ctx, 700, 360, 0.85, 1); hart(ctx, 1130, 330, 0.8, 1, t);
    pijl(ctx, 1210, 330, 1330, 330, '#D8573F', q.on('rest', 1), 5, 18);
    naamBij(ctx, 'dunne darm', '', 430, 810, 1, 'center'); naamBij(ctx, 'poortader', '', 455, 520, q.on('eerst', 1), 'right'); naamBij(ctx, 'lever', '', 700, 505, q.on('lever.', 1), 'center'); naamBij(ctx, 'hart', '', 1130, 430, q.on('rest', 1), 'center');
    const E = q.on('enzymen', 1); [[640, 340], [730, 395], [800, 320]].forEach(([x, y], i) => enzym(ctx, x, y, 0.2, { soort: 'protease', a: E, rot: i * 1.1, t }));
    naamBij(ctx, 'enzymen', 'breken af', 700, 225, E * (1 - q.on('Bij', 1)), 'center');
    tag(ctx, 'film: De lever als fabriek', 960, 630, C.teal, q.on('enzymen', 1) * (1 - q.on('deel', 1)), 'center', 26);
    const frac = 0.4 * q.on('deel', 1, 1.2) + 0.55 * q.on('bijna', 1, 1.2), col = N > 0.5 ? PIL.nitro : PIL.bd;
    for (let k = 0; k < 16; k++) { const ph = (t * 0.16 + hash(k * 3 + 1)) % 1, weg = hash(k * 5 + 2) < frac; if (weg && ph > 0.55) { const f = (ph - 0.55) / 0.45; const [x, y] = padPos(path, 0.55); molecuul(ctx, x + (hash(k) - 0.5) * 80, y + (hash(k * 2) - 0.5) * 60, 1, col, 1 - f, clamp(f * 4, 0, 1)); }
      else { const [x, y] = padPos(path, ph); molecuul(ctx, x, y, 1, col, clamp(ph * 8, 0, 1) * clamp((1 - ph) * 8, 0, 1)); } }
    // van honderd moleculen komt een deel verder
    const G = q.on('deel', 1); metaA(ctx, 'van 100 moleculen komen verder:', 1380, 225, G, C.grain, 'left', 22);
    const weg = 40 * clamp((t - q.at('weg', 1)) / 1.5, 0, 1) + 55 * clamp((t - q.at('bijna', 1)) / 1.5, 0, 1); honderd(ctx, 1397, 270, weg, G, col);
    chip(ctx, 'nog ' + Math.round(100 - weg), 1550, 640, C.goud, G, 30);
    tablet(ctx, 200, lerp(190, 600, ease(clamp((t - q.at('Slik', 1)) / 1.2, 0, 1))), 26, N * (1 - q.on('in,', 1, 0.6) * 0.0), PIL.nitro); naamBij(ctx, 'nitroglycerine', 'bij pijn op de borst', 250, 205, N * (1 - q.on('Slik', 1)), 'left');
    vraagteken(ctx, 960, 200, q.on('patiënt', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('reden', 1, 0.8);
    antwoord(ctx, 'Antwoord c', 1 - P);
    laag(ctx, 1 - P, () => { const vaat = [[620, 690], [1000, 720], [1300, 640], [1420, 420], [1500, 320]];
      tongSchema(ctx, 680, 520, 1.3, 1, q.on('bloedvaten', 1), t); naamBij(ctx, 'tong', '', 600, 420, q.on('tong', 1), 'center');
      sprayFles(ctx, 1150, 300, 1, 1, -1.0); vat(ctx, vaat, '#D8573F', 20, q.on('bloed', 2)); hart(ctx, 1560, 250, 0.7, 1, t); naamBij(ctx, 'hart', '', 1680, 260, 1, 'left');
      leverVorm(ctx, 1640, 600, 0.38, 0.35); naamBij(ctx, 'lever', 'niet langs', 1640, 690, q.on('lever', 1), 'center', C.text2);
      naamBij(ctx, 'kleine bloedvaten', 'onder de tong', 330, 790, q.on('bloedvaten', 1), 'center');
      const sp = clamp((t - 0.2) / 2.2, 0, 1); for (let i = 0; i < 10; i++) { const u = (sp * 1.6 - i * 0.06); if (u <= 0 || u >= 1) continue; const [x, y] = padPos([[1090, 230], [880, 420], [700, 620]], u); circ(ctx, x + (hash(i) - 0.5) * 30, y + (hash(i * 3) - 0.5) * 30, 5, rgba(PIL.nitro, 0.8)); }
      const B = q.on('bloed', 2); for (let k = 0; k < 10; k++) { const ph = (t * 0.22 + hash(k * 9)) % 1; const [x, y] = padPos(vaat, ph); molecuul(ctx, x, y, 0.9, PIL.nitro, B * clamp(ph * 8, 0, 1) * clamp((1 - ph) * 8, 0, 1)); }
      klokje(ctx, 1560, 120, 34, clamp((t - q.at('minuten', 1)) / 1.5, 0, 0.08), q.on('minuten', 1)); chip(ctx, 'werkt binnen een paar minuten', 1290, 140, C.groen, q.on('werkt', 1), 26); });
    laag(ctx, P, () => { const I = [['onder de tong', '', q.on('reden', 1), 1], ['pleister', 'via de huid', q.on('pleisters', 1), 1], ['injectie', 'direct in het bloed', q.on('injecties', 1), 1], ['zetpil', 'deels', q.on('zetpillen', 1), 0.5]];
      I.forEach(([n, s2, a, v], i) => { const x = 330 + i * 420, y = 470; if (i === 0) sprayFles(ctx, x, y, 1, a, -0.3); else if (i === 1) pleister(ctx, x, y, 1.2, a); else if (i === 2) injectie(ctx, x, y, 1.3, a); else zetpil(ctx, x, y, 1.3, a);
        naamBij(ctx, n, s2, x, 650, a, 'center'); if (v === 1) vink_(ctx, x, 300, 26, a); else vink_(ctx, x, 300, 26, a, C.oker); });
      metaA(ctx, 'niet eerst langs de lever', 960, 210, q.on('reden', 1), C.grain, 'center', 26);
      haak(ctx, 160, 1760, 730, 'de weg bepaalt hoeveel er aankomt', C.goud, q.on('weg', 1)); }); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Stel', 1, 0.8);
    persoon(ctx, 'noor', 220, 880, 380, { t, kijk: 1, uit: 'denkt', pose: 'denk', a: q.on('Noor', 1, 0.3) });
    const gx = 520, gy = 250, gw = 1200, gh = 470;
    laag(ctx, 1 - S, () => { const u = clamp((t - q.at('stijgt', 1)) / 6.5, 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 100, xt: [0, 2, 4, 6, 8, 10, 12], curves: [{ f: bateman, col: q.on('paracetamol', 1) > 0.5 ? PARA : '#F2F2EE', u, punt: true }], yHi: q.on('bloedspiegel', 1) });
      chip(ctx, 'lever en nieren ruimen op', 1300, 330, C.oker, q.on('ruimen', 1), 26);
      const H = q.on('helft', 1); if (H > 0.01) { laag(ctx, H, () => { [3, 5].forEach(x => { circ(ctx, G.X(x), G.Y(bateman(x)), 9, C.goud); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(x), G.Y(bateman(x))); ctx.lineTo(G.X(x), gy + gh); ctx.stroke(); ctx.setLineDash([]); });
        pijl(ctx, G.X(3), gy + gh - 40, G.X(5) - 4, gy + gh - 40, C.goud, 1, 3, 14); pijl(ctx, G.X(5), gy + gh - 40, G.X(3) + 4, gy + gh - 40, C.goud, 1, 3, 14);
        text(ctx, 'de helft weg', G.X(5) + 24, G.Y(bateman(5)) - 14, fTekst(28, 700), C.goud, 'left'); }); }
      naamBij(ctx, 'halfwaardetijd', '', G.X(4), gy + gh - 64, q.on('halfwaardetijd', 1), 'center', C.goud);
      chip(ctx, '± 2 uur', G.X(4), gy + gh - 120, C.goud, q.on('twee', 1), 26);
      naamBij(ctx, 'paracetamol', '', G.X(1.6), G.Y(90), q.on('paracetamol', 1), 'left', PARA); });
    laag(ctx, S, () => { const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 110, xt: [0, 2, 4, 6, 8, 10, 12], yt: [25, 50, 100], curves: [] });
      const h = q.on('honderd', 1); circ(ctx, G.X(0), G.Y(100), 11 * h, PARA); naamBij(ctx, '100 eenheden', '', G.X(0) + 30, G.Y(100) + 10, h, 'left', PARA);
      const K = q.on('kwart', 1); if (K > 0.01) laag(ctx, K, () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(25)); ctx.lineTo(G.X(12), G.Y(25)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'een kwart', G.X(12) - 10, G.Y(25) - 16, fTekst(28, 700), C.goud, 'right'); });
      vraagteken(ctx, G.X(6), G.Y(60), q.on('hoeveel', 2), 110); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const Cc = q.on('bloeddrukpil', 1, 0.8), Dd = q.on('Slik', 1, 0.8);
    antwoord(ctx, 'Antwoord a', 1 - Cc);
    const gx = 520, gy = 250, gw = 1200, gh = 470;
    // B: halveren in stapjes, grens, opnieuw slikken
    laag(ctx, 1 - Cc, () => { const seg = (a0, a1, x0, x1) => lerp(x0, x1, ease((t - a0) / (a1 - a0)));
      let x1 = 0; if (t < q.at('weer', 1)) x1 = seg(q.at('twee', 1), q.at('weg', 1) + 0.3, 0, 2); else if (t < q.at('paar', 1)) x1 = seg(q.at('twee', 2), q.at('was', 1), 2, 4); else if (t < q.at('opnieuw', 1)) x1 = seg(q.at('zakt', 1), q.at('waarboven', 1), 4, 6); else x1 = seg(q.at('opnieuw', 1), q.at('opnieuw', 1) + 0.9, 6, 12);
      const f = (x) => halfP(x) + (x >= 6 ? halfP(x - 6) : 0);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 110, xt: [0, 2, 4, 6, 8, 10, 12], yt: [25, 50, 100], curves: [{ f, col: PARA, u: x1 / 12, punt: true }], grens: 35, grensA: q.on('grens', 1), grensLab: 'werkt' });
      [[2, '50', q.on('helft', 1)], [4, '25', q.on('helft', 2)]].forEach(([x, s2, a]) => { if (a <= 0.01) return; laag(ctx, a, () => { circ(ctx, G.X(x), G.Y(halfP(x)), 10, C.goud); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(halfP(x))); ctx.lineTo(G.X(x), G.Y(halfP(x))); ctx.lineTo(G.X(x), gy + gh); ctx.stroke(); ctx.setLineDash([]); text(ctx, s2, G.X(x) + 20, G.Y(halfP(x)) - 16, fTekst(32, 800), C.goud, 'left'); }); });
      naamBij(ctx, 'onder de grens', '', G.X(5.2), G.Y(35) + 60, q.on('onder', 1) * (1 - q.on('opnieuw', 1)), 'center', C.koraal);
      laag(ctx, q.on('opnieuw', 1), () => tablet(ctx, G.X(6), G.Y(118), 18)); });
    // C: paracetamol tegenover de bloeddrukpil (één dag)
    laag(ctx, Cc * (1 - Dd), () => { persoon(ctx, 'henk', 230, 880, 400, { t, kijk: 1, uit: 'neutraal', a: q.on('Henk', 1, 0.3) });
      const u = clamp((t - q.at('halfwaardetijd', 1)) / 2.4, 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 24, ymax: 110, xt: [0, 6, 12, 18, 24], curves: [{ f: halfP, col: PARA, a: 0.7 }, { f: (x) => 100 * Math.pow(0.5, x / 36), col: PIL.bd, u, punt: true }], grens: 35, grensA: 1, grensLab: 'werkt' });
      naamBij(ctx, 'paracetamol', '', G.X(2.6), G.Y(60), 1, 'left', PARA); naamBij(ctx, 'bloeddrukpil', 'halfwaardetijd ± 36 uur', G.X(17), G.Y(100), q.on('anderhalve', 1), 'center', PIL.bd);
      chip(ctx, 'de hele dag boven de grens', G.X(14), G.Y(45), PIL.bd, q.on('boven', 2), 26); });
    // D: elke dag een pil → zaagtand tot een vlak niveau
    laag(ctx, Dd, () => { const u = clamp((t - q.at('elke', 1)) / (q.at('verdwijnt', 1) - q.at('elke', 1) + 0.4), 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 10, ymax: 100, xt: [0, 2, 4, 6, 8, 10], xlab: 'tijd (dagen)', curves: [{ f: zaag, col: PIL.bd, u, punt: true }] });
      for (let n = 0; n <= 10 * u; n++) capsule(ctx, G.X(n), gy + gh + 124, 0.55, PIL.bd, '#F2F2EE', 0, 0.9);
      const S = q.on('stapelt', 1); naamBij(ctx, 'stapelt zich op', '', G.X(2.2), G.Y(70), S * (1 - q.on('evenveel', 1)), 'center', PIL.bd);
      const B = q.on('halfwaardetijden', 1); if (B > 0.01) laag(ctx, B, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), gy - 4); ctx.lineTo(G.X(0), gy + 10); ctx.moveTo(G.X(0), gy + 3); ctx.lineTo(G.X(7), gy + 3); ctx.moveTo(G.X(7), gy - 4); ctx.lineTo(G.X(7), gy + 10); ctx.stroke(); text(ctx, '4 tot 5 halfwaardetijden', G.X(3.5), gy - 14, fTekst(28, 700), C.goud, 'center'); });
      const E = q.on('evenveel', 1); if (E > 0.01) laag(ctx, E, () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.text, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(6.5), G.Y(66)); ctx.lineTo(G.X(10), G.Y(66)); ctx.stroke(); ctx.setLineDash([]); });
      naamBij(ctx, 'vlak niveau', 'erbij = eraf', G.X(8.4), G.Y(92), E, 'center');
      chip(ctx, 'na ± een week: volle werking', G.X(7), G.Y(30), C.groen, q.on('week', 1), 28); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('stoffen', 1, 0.8);
    laag(ctx, 1 - I, () => { const O = q.on('ouderen', 1); nierFilter(ctx, 560, 400, 0.9, 1, t, 1); naamBij(ctx, 'nier', 'filtert het bloed', 560, 700, 1 - O, 'center'); naamBij(ctx, 'jonge nier', '', 520, 700, O, 'center');
      laag(ctx, O, () => { nierFilter(ctx, 1120, 400, 0.9, 0.75, t, 0.3); }); naamBij(ctx, 'oudere nier', 'filtert minder', 1080, 700, O, 'center');
      naamBij(ctx, 'urine', '', 610, 620, q.on('urine', 1) * (1 - O), 'left', '#E0C860');
      const S = q.on('bloedspiegel', 1), L = q.on('lagere', 1, 1.2); metaA(ctx, 'bloedspiegel', 1530, 250, S, C.grain, 'center', 22);
      spiegelStaaf(ctx, 1420, 280, 340, 0.45, PIL.bd, 'jong', S); spiegelStaaf(ctx, 1580, 280, 340, lerp(0.45, 0.88, q.on('hoog', 1, 1.2)) - 0.4 * L, PIL.bd, 'oud', S, 0.7);
      laag(ctx, S, () => text(ctx, 'te hoog', 1690, 280 + 340 * 0.3 + 10, fTekst(26, 700), C.koraal, 'left')); chip(ctx, 'lagere dosis', 1615, 760, C.groen, L, 28); });
    laag(ctx, I, () => { const cx = 760, cy = 2300, R = 1900, d = 170, a0 = -Math.PI / 2 - 0.25, a1 = -Math.PI / 2 + 0.25, n = 4;
      darmBoog(ctx, cx, cy, R, a0, a1, n, d, q.on('darmwand', 1)); naamBij(ctx, 'darmwand', '', 760, 105, q.on('darmwand', 1), 'center');
      const Gs = q.on('Grapefruitsap', 1), Rm = q.on('remt', 1) * (1 - q.on('Hetzelfde', 1)), Tw = q.on('Hetzelfde', 1), Dw = q.on('darmwand', 1);
      for (let k = 0; k < n; k++) { const an = a0 + (a1 - a0) * (k + 0.5) / n, [ex, ey] = opBoog(cx, cy, R + d * 0.42, an); enzym(ctx, ex, ey, 0.22, { soort: 'protease', a: Dw, rot: an + Math.PI / 2, t }); kruis(ctx, ex, ey, 30, Rm); }
      naamBij(ctx, 'enzym', 'breekt af', 1290, 330, Dw, 'left');
      const cut = 0.7 * (1 - Rm) * (1 - Tw) + 0.45 * Tw;
      for (let k = 0; k < 14; k++) { const ph = (t * 0.2 + hash(k * 13)) % 1, an = a0 + (a1 - a0) * ((k % n) + 0.5 + (hash(k) - 0.5) * 0.3) / n, rE = R + d * 0.42, r = R - 300 + ph * (d + 380), weg = hash(k * 7 + 1) < cut, col = Tw > 0.5 && k % 2 ? C.teal : PIL.sim;
        if (weg && r > rE - 30) { const f = (r - rE + 30) / (R + d + 80 - rE); const [x, y] = opBoog(cx, cy, rE - 34, an); molecuul(ctx, x, y + 10, 1, col, Dw * (1 - f), clamp(f * 4, 0, 1)); }
        else { const [x, y] = opBoog(cx, cy, r, an); molecuul(ctx, x, y, 1, col, Dw * clamp(ph * 6, 0, 1) * clamp((1 - ph) * 6, 0, 1)); } }
      grapefruit(ctx, 190, 600, 70, Gs * (1 - Tw)); naamBij(ctx, 'grapefruitsap', '', 190, 720, Gs * (1 - Tw), 'center', '#F2B04A');
      if (Gs > 0.01) for (let i = 0; i < 8; i++) { const ph = (t * 0.3 + i / 8) % 1, [x, y] = padPos([[250, 580], [500, 520], [700, 470]], ph); circ(ctx, x + Math.sin(i * 3 + t) * 10, y + (hash(i) - 0.5) * 50, 6, rgba('#F2B04A', 0.8 * Gs * (1 - Tw) * q.on('remt', 1))); }
      capsule(ctx, 380, 800, 1.4, PIL.sim, PIL.sim, 0, q.on('cholesterolverlager', 1) * (1 - Tw)); naamBij(ctx, 'simvastatine', 'cholesterolverlager', 450, 800, q.on('simvastatine', 1) * (1 - Tw), 'left', PIL.sim);
      const M = q.on('meer', 1); metaA(ctx, 'simvastatine in het bloed', 1630, 250, M, C.grain, 'center', 22);
      spiegelStaaf(ctx, 1500, 290, 340, 0.24, PIL.sim, 'zonder sap', M); spiegelStaaf(ctx, 1680, 290, 340, 0.24 + (0.86 - 0.24) * q.on('meer', 1, 1.5), PIL.sim, 'met sap', M);
      bijsluiter(ctx, 1180, 740, 0.6, q.on('bijsluiter', 1) * (1 - Tw));
      chip(ctx, 'twee medicijnen · hetzelfde enzym', 760, 820, C.teal, Tw, 28); }); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('farmacokinetiek', 1);
    keuken(ctx, t, { bd: 7, uitN: 'blij', uitH: 'blij', poseN: 'vasthouden', hold: (c, x, y) => capsule(c, x, y - 6, 1, PIL.bd, '#F2F2EE', -0.4) });
    const R = [['pil', 'pillendoos'], ['darm', 'Opname'], ['lever', 'lever'], ['bloed', 'halfwaardetijd'], ['nier', 'nieren']];
    R.forEach(([s2, w], i) => { const x = 560 + i * 200, aan = q.on(w, 1); routeIcoon(ctx, s2, x, 180, 1, aan); if (i) pijl(ctx, x - 150, 180, x - 60, 180, C.line, 0.7, 3, 12); });
    ['opname', 'lever', 'halfwaardetijd', 'nieren'].forEach((s2, i) => regel(ctx, s2, 760 + i * 200, 262, q.on(['Opname', 'lever', 'halfwaardetijd', 'nieren'][i], 1), C.text2, 22, 'center', 700));
    chip(ctx, 'hoe vaak', 700, 350, C.goud, q.on('vaak', 1) * (1 - F), 26); chip(ctx, 'hoeveel', 960, 350, C.goud, q.on('hoeveel', 1) * (1 - F), 26); chip(ctx, 'op welke manier', 1220, 350, C.goud, q.on('manier', 1) * (1 - F), 26);
    regel(ctx, 'farmacokinetiek', 960, 360, F, C.goud, 52, 'center', 800); metaA(ctx, 'wat je lichaam met een medicijn doet', 960, 405, q.on('lichaam', 1), C.text2, 'center', 22); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Verpleegkundigen', 1);
    persoon(ctx, 'ravi', 420, 880, 470, { t, kijk: 1, uit: 'blij', pose: t > q.at('past', 1) && t < q.at('Verpleegkundigen', 1) ? 'wijs' : 'staan' }); balie(ctx, 160, 760, 650);
    naamBij(ctx, 'Apotheker Ravi', 'rekent elke dag', 420, 360, q.on('Apothekers', 1, 0.3) * (1 - q.on('nieren', 1)), 'center');
    laag(ctx, q.on('nieren', 1), () => { nierVorm(ctx, 620, 520, 0.9, -1, 1); text(ctx, '→', 680, 534, fTekst(44, 700), C.text2, 'left'); });
    chip(ctx, 'nieren minder goed → dosis aanpassen', 470, 300, C.oker, q.on('dosis', 1), 26);
    medicijnKar(ctx, 1150, 840, 1.1, V); naamBij(ctx, 'medicijnkar', 'verpleegkundige geeft medicijnen', 1150, 350, V, 'center');
    const O = [['farmacie', 'universiteit', 'farmacie'], ['apothekersassistent', 'mbo', 'apothekersassistent'], ['verpleegkunde', 'mbo of hbo', 'verpleegkunde.']];
    O.forEach(([n, s2, w], i) => { const a = q.on(w, 1); naamBij(ctx, n, s2, 1650, 470 + i * 120, a, 'center', C.teal); }); }
});

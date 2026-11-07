// Cellen · Bacteriën, virussen en schimmels — Wat groeit er op je boterham? — scènes per alinea (v1.0, 26 okt 2026, script v2).
// Look: Schema (keuken, lokaal, schema's) met cast (Noor, Teun, Mevrouw Visser); Micro in zoomcirkels (hyfe, bacterie, virus);
// Macro-dag alleen in de tuin (paddenstoel). Kleuren: brood oker, schimmel/bacterie teal-grijs, DNA grijs, RNA teal, kern paars, focus goud,
// koraal = let op. Eén proef draagt de film: drie dichte zakjes brood (H1) en drie dichte schaaltjes (H3).

// ---------- hulpjes ----------
const FL = 820, TAFEL = 565;
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function vloer(ctx, col = '#22324E') { ctx.fillStyle = col; ctx.fillRect(0, FL, W, 70); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, FL); ctx.lineTo(W, FL); ctx.stroke(); }
function tafel(ctx, x0, x1, y, col = '#3A4A66') { roundRect(ctx, x0, y, x1 - x0, 22, 6); shape(ctx, col, rgba(C.line, 0.6), 2); ctx.fillStyle = col; ctx.fillRect(x0 + 30, y + 22, 18, FL - y - 22); ctx.fillRect(x1 - 48, y + 22, 18, FL - y - 22); }
function keuken(ctx) { bg(ctx, 'schema'); ctx.fillStyle = '#22314C'; ctx.fillRect(0, 0, W, FL); [[120, 110, 420, 230], [1380, 110, 420, 230]].forEach(([x, y, w, h]) => { roundRect(ctx, x, y, w, h, 10); shape(ctx, '#2C3E5E', rgba(C.line, 0.45), 2); ctx.strokeStyle = rgba(C.line, 0.3); ctx.beginPath(); ctx.moveTo(x + w / 2, y + 12); ctx.lineTo(x + w / 2, y + h - 12); ctx.stroke(); }); vloer(ctx); }
function lokaal(ctx) { bg(ctx, 'schema'); ctx.fillStyle = '#1E2C46'; ctx.fillRect(0, 0, W, FL); roundRect(ctx, 560, 70, 800, 170, 10); shape(ctx, '#24364F', rgba(C.line, 0.4), 2); vloer(ctx); }
function metaRaw(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); ctx.letterSpacing = '2px'; ctx.fillStyle = col; ctx.textAlign = al; ctx.fillText(s2, x, y); ctx.letterSpacing = '0px'; ctx.restore(); }
function schaalbalk(ctx, px, s2, a = 1, x = 70, y = 856) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y); ctx.lineTo(x + px, y); ctx.lineTo(x + px, y - 10); ctx.stroke(); ctx.restore(); metaRaw(ctx, s2, x + px + 18, y + 4, a, C.text2, 'left', 26); }
function binnen(ctx, cx, cy, r, look = 'micro') { ctx.fillStyle = look === 'micro' ? C.bgMicro : '#1A2740'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); }
function noor(ctx, x, t, o = {}) { return persoon(ctx, 'noor', x, o.voet || FL, o.h || 560, Object.assign({ t, uit: 'neutraal', kijk: -1 }, o)); }
function teun(ctx, x, t, o = {}) { return persoon(ctx, 'kind', x, o.voet || FL, o.h || 390, Object.assign({ t, uit: 'neutraal', kijk: 1 }, o)); }
function visser(ctx, x, t, o = {}) { return persoon(ctx, 'visser', x, o.voet || FL, o.h || 600, Object.assign({ t, uit: 'neutraal', kijk: 1, outfit: 'practicum' }, o)); }
const BROOD_W = [{ u: 0.32, v: 0.4, r: 0.16, k: 1, soort: 'groen', seed: 5 }, { u: 0.66, v: 0.62, r: 0.13, k: 1, soort: 'zwart' }, { u: 0.6, v: 0.25, r: 0.06, k: 0.8, soort: 'groen', seed: 9 }];
function plekken(k, n = 3) { return BROOD_W.slice(0, n).map(s => Object.assign({}, s, { k: s.k * clamp(k, 0, 1) })); }
function trommelBrood(ctx, x, y, w, open, k = 1) { miTrommel(ctx, x, y, w, { open, binnen: (c, xx, yy, wb) => miBoterham(c, xx, yy + 4, wb * 0.62, { rot: -0.06, schimmel: plekken(k) }) }); }
const ZAK = [['droog', 0.25, 0.4], ['nat', 1, 1], ['nat · koelkast', 0.4, 0.55]]; // label, groeisnelheid, eindgrootte
function zakjes(ctx, x0, y, w, gap, groei, a = [1, 1, 1], o = {}) { ZAK.forEach(([lab, v, eind], i) => { if (a[i] <= 0.01) return; const k = clamp(groei * v, 0, 1) * eind;
  laag(ctx, a[i], () => { miZakje(ctx, x0 + i * gap, y, w, { label: o.labels === false ? '' : lab, droog: i === 0 ? 0.6 : 0, schimmel: k > 0.01 ? [{ u: 0.35, v: 0.4, r: 0.2, k, soort: i === 1 ? 'groen' : 'zwart', seed: 3 + i }, { u: 0.68, v: 0.66, r: 0.14, k: k * 0.8, soort: 'groen', seed: 7 + i }] : [] });
    if (i === 2 && o.koud !== false) metaA(ctx, '❄ 4 °C', x0 + i * gap, y - w * 0.68, 1, C.teal, 'center', 24); }); }); }
function prullenbak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -50, -110, 100, 110, 10); shape(ctx, '#3A4A66', C.line, 2); roundRect(ctx, -60, -126, 120, 18, 6); shape(ctx, '#4A5A76', C.line, 2); ctx.restore(); }
function pijlChip(ctx, s2, x, y, col, a) { tag(ctx, s2, x, y, col, a, 'center', 30); }
function telefoon(c, x, y) { roundRect(c, x - 32, y - 60, 64, 116, 10); shape(c, '#1A1F2A', '#9AA3B2', 2); roundRect(c, x - 26, y - 50, 52, 92, 4); shape(c, '#2A3A58', null); miSchaal(c, x, y - 4, 20, { kol: 1, seed: 2, dicht: 0 }); }

// klaverwortel met knolletjes (Schema): wortel, knolletjes als ronde bolletjes; pijlen stikstof (teal) in, suiker (oker) terug
function klaverWortel(ctx, x, y, s = 1, o = {}) { const { a = 1, n2 = 0, suiker = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, 0); ctx.stroke();
  for (const [dx, dy] of [[-60, -170], [0, -200], [60, -170]]) { ctx.beginPath(); ctx.ellipse(dx, dy, 34, 30, 0, 0, 6.283); shape(ctx, '#7FC48F', '#A8DDB4', 2); }
  ctx.strokeStyle = '#C9B38A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-10, 80, -40, 170); ctx.moveTo(0, 30); ctx.quadraticCurveTo(50, 90, 80, 160); ctx.moveTo(-5, 60); ctx.quadraticCurveTo(-70, 90, -110, 120); ctx.stroke();
  for (const [kx, ky] of [[-28, 120], [62, 112], [-80, 104], [-38, 160]]) { circ(ctx, kx, ky, 16, '#D6B58A', '#F0D6AE', 2); }
  if (n2 > 0.01) { pijl(ctx, -170, 40, -100, 95, C.teal, n2, 4, 14); text(ctx, 'stikstof', -175, 25, fTekst(30, 700), C.teal, 'right'); }
  if (suiker > 0.01) { pijl(ctx, 30, -60, 70, 95, C.oker, suiker, 4, 14); text(ctx, 'suikers', 90, -40, fTekst(30, 700), C.oker, 'left'); }
  ctx.restore(); }
// voet met schimmel tussen de tenen (Schema, zijaanzicht van boven)
function voetSchimmel(ctx, x, y, s = 1, a = 1, k = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-14, 150); ctx.bezierCurveTo(-58, 150, -66, 100, -60, 50); ctx.bezierCurveTo(-56, 10, -72, -30, -70, -60); ctx.bezierCurveTo(-66, -96, 62, -100, 66, -64); ctx.bezierCurveTo(70, -30, 42, 10, 40, 60); ctx.bezierCurveTo(38, 110, 30, 150, -14, 150); ctx.closePath(); shape(ctx, '#C69A78', '#DDB898', 2);
  const T = [[-54, -96, 17, 22], [-24, -112, 13, 17], [2, -114, 12, 15], [26, -108, 11, 14], [48, -96, 10, 12]];
  T.forEach(([tx, ty, rx, ry]) => { ctx.beginPath(); ctx.ellipse(tx, ty, rx, ry, 0, 0, 6.283); shape(ctx, '#C69A78', '#DDB898', 2); });
  if (k > 0.01) [[-38, -94], [-11, -104], [14, -104], [37, -96]].forEach(([px, py], i) => miKolonie(ctx, px, py + 14, 11, k, 'zwart', 0, 20 + i));
  ctx.restore(); }
// yoghurtbeker (oker product)
function yoghurt(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, -110); ctx.lineTo(60, -110); ctx.lineTo(45, 0); ctx.lineTo(-45, 0); ctx.closePath(); shape(ctx, '#E8E2D2', '#C9C2B0', 2); roundRect(ctx, -66, -122, 132, 16, 5); shape(ctx, C.oker, '#E3C27E', 2); text(ctx, 'yoghurt', 0, -48, fTekst(26, 700), '#4A3A20', 'center'); ctx.restore(); }
// brood heel (bovenaanzicht van opzij): bol brood
function broodHeel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - w * 0.55, w, w * 0.55, w * 0.22); shape(ctx, MI.korst, MI.korstR, 2); ctx.strokeStyle = rgba('#7A5428', 0.6); ctx.lineWidth = 3; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x + i * w * 0.22 - 20, y - w * 0.42); ctx.lineTo(x + i * w * 0.22 + 20, y - w * 0.3); ctx.stroke(); } ctx.restore(); }
// sporen (vergroot) die neerdwarrelen; seed per scène
function sporenRegen(ctx, t, x0, x1, y0, y1, n = 50, a = 1, seed = 4) { if (a <= 0.01) return; const r = miRng(seed); ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const bx = x0 + r() * (x1 - x0), sp = 18 + r() * 26, ph = r() * (y1 - y0); const y = y0 + ((ph + t * sp) % (y1 - y0)); const x = bx + Math.sin(t * 0.8 + i) * 14;
    circ(ctx, x, y, 3.2 + r() * 2.2, rgba('#C8CED6', 0.85), rgba('#F2F2EE', 0.6), 1); } ctx.restore(); }
// groeigrafiek: aantal bacteriën (log-achtig weergegeven als logistische curve)
function groeiGrafiek(ctx, x, y, w, h, u, a = 1, plat = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'tijd', 'aantal bacteriën');
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); const N = 120; for (let i = 0; i <= N * u; i++) { const s = i / N; const L = 1 / (1 + Math.exp(-(s - 0.5) * 10)); const exp = Math.min(1.05, Math.exp((s - 0.85) * 5.5)); const v = lerp(exp, L, plat); const px = x + s * w, py = y + h - v * h * 0.92; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { miBoterham(ctx, 1480, 560, 420, { rot: -0.05, schimmel: plekken(1) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { keuken(ctx); tafel(ctx, 640, 1280, TAFEL, '#8C6A44');
    const O = q.on('vergeten', 1, 0.8); trommelBrood(ctx, 960, TAFEL - 18, 70, O, 1);
    zoomCircle(ctx, 960, 300, 210, 960, TAFEL - 30, '', q.on('pluis', 1, 0.8), () => { binnen(ctx, 960, 300, 210, 'schema'); trommelBrood(ctx, 960, 300, 330, 1, 1); });
    metaA(ctx, 'EEN WEEK VERGETEN', 960, 480, q.on('vergeten', 1) * (1 - q.on('pluis', 1)), C.goud, 'center'); metaA(ctx, 'VERGROOT', 1190, 310, q.on('pluis', 1), C.grain, 'left', 24);
    noor(ctx, 1420, t, { uit: q.on('pluis', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    teun(ctx, 540, t, { uit: q.on('plantje', 1) > 0.5 ? 'blij' : 'neutraal', pose: q.on('broertje', 1) > 0.5 ? 'wijs' : 'staan' });
    bubbel(ctx, 380, 330, 'Er groeit een plantje!', C.text, q.on('plantje', 1));
    vraagteken(ctx, 1240, 500, q.on('dichte', 1), 80); },
  // ---------- H1 Drie zakjes ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: sporen uit de lucht', 1 - q.on('schimmel', 1));
    const S = q.on('sporen', 1, 0.8); sporenRegen(ctx, t, 120, 1800, 120, 760, 70, S);
    miBoterham(ctx, 960, 520, 300, { schimmel: plekken(q.on('nieuwe', 1, 2)) });
    metaA(ctx, 'SPOREN · VERGROOT', 1780, 860, S, C.grain, 'right', 24);
    const V = q.on('vanzelf', 1); laag(ctx, V, () => { pijlChip(ctx, 'oud brood → schimmel', 480, 220, C.koraal, 1); kruis(ctx, 480, 208, 34, 1, C.koraal); }); },
  s05(ctx, t, q) { lokaal(ctx); tafel(ctx, 560, 1360, TAFEL);
    visser(ctx, 460, t, { pose: q.on('dicht', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1480, t, { outfit: 'practicum' });
    const D = q.on('Drie', 1, 0.8); const A = [D, q.on('nat', 1), q.on('koelkast', 1)];
    ZAK.forEach(([lab], i) => laag(ctx, A[i], () => { miZakje(ctx, 860 + i * 100, TAFEL - 44, 76, {}); naamBij(ctx, i === 2 ? 'koelkast' : lab, '', 860 + i * 100, TAFEL - 110, 1, 'center'); }));
    metaA(ctx, 'DICHT LATEN', 960, 300, q.on('dicht', 1), C.koraal, 'center');
    bubbel(ctx, 520, 250, 'Je kijkt door het plastic.', C.text, q.on('plastic', 1)); vraagteken(ctx, 960, 380, q.on('eerst', 1), 70); },
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: het natte sneetje op kamertemperatuur', 1 - q.on('deze', 1));
    const G = clamp((t - 0.6) / Math.max(1, q.at('vochtig', 1) - 0.6), 0, 1); zakjes(ctx, 520, 430, 190, 440, G); metaA(ctx, 'KAMERTEMPERATUUR', 740, 240, 1, C.text2, 'center', 22);
    // tijdbalk zonder dagen
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(360, 780); ctx.lineTo(1560, 780); ctx.stroke(); circ(ctx, lerp(360, 1560, G), 780, 12, C.goud);
    metaA(ctx, 'BEGIN', 360, 830, 1, C.text2, 'center', 24); metaA(ctx, 'LATER', 960, 830, 1, C.text2, 'center', 24); metaA(ctx, 'NOG LATER', 1560, 830, 1, C.text2, 'center', 24);
    metaA(ctx, 'IN DEZE PROEF', 1820, 120, q.on('deze', 1), C.grain, 'right', 24);
    haak(ctx, 820, 1100, 620, 'warm en vochtig: snelst', C.groen, q.on('vochtig', 1)); },
  s08(ctx, t, q) { bg(ctx, 'schema'); tafel(ctx, 420, 1500, 640, '#5A6A84'); vloer(ctx);
    const D = q.on('dicht', 1); zakjes(ctx, 1640, 430, 110, 0, 1, [D, 0, 0], { labels: false, koud: false });
    const B = q.on('bakken', 1, 0.6), A = q.on('afkoelen', 1), Sn = q.on('snijden', 1), I = q.on('inpakken', 1);
    broodHeel(ctx, 640, 630, 300, 1 - Sn * 0.4); laag(ctx, B, () => metaA(ctx, 'UIT DE OVEN · GEEN SPOREN', 640, 470, 1 - A, C.text2, 'center', 24));
    sporenRegen(ctx, t, 520, 1300, 200, 610, 46, A, 6); metaA(ctx, 'SPOREN · VERGROOT', 1780, 860, A, C.grain, 'right', 24);
    laag(ctx, Sn, () => { miBoterham(ctx, 940, 580, 150, {}); miBoterham(ctx, 1110, 580, 150, {}); });
    laag(ctx, I, () => { roundRect(ctx, 1240, 470, 170, 190, 12); shape(ctx, rgba('#DDE6EE', 0.1), rgba('#DDE6EE', 0.6), 2); miBoterham(ctx, 1325, 575, 120, {}); });
    ['afkoelen', 'snijden', 'inpakken'].forEach((w, i) => pijlChip(ctx, w, 640 + i * 340, 760, C.goud, q.on(w, 1)));
    haak(ctx, 1560, 1720, 560, 'sporen zaten er al op', C.groen, q.on('zaten', 1)); },

  // ---------- H2 Draden in het brood ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); zakjes(ctx, 360, 470, 260, 0, 1, [1, 0, 0], { labels: false, koud: false });
    const Z = q.on('Zoom', 1, 0.8), H = q.on('hyfen', 1, 1.5), M = q.on('mycelium', 1), Sp = q.on('steeltjes', 1, 1.2);
    zoomCircle(ctx, 1180, 440, 360, 380, 430, 'IN HET BROOD · VERGROOT', Z, () => { binnen(ctx, 1180, 440, 360); miMycelium(ctx, 1180, 470, 760, 640, { k: lerp(0.15, 0.62, H) + 0.38 * Sp, sporen: 1, opp: 0.32, t }); });
    laag(ctx, Z, () => { naamBij(ctx, 'hyfen', 'SCHIMMELDRADEN', 1430, 700, H); naamBij(ctx, 'mycelium', 'ALLE HYFEN SAMEN', 820, 300, M, 'right'); naamBij(ctx, 'sporen', 'OP STEELTJES', 1300, 170, Sp); });
    schaalbalk(ctx, 60, '± 10 µm', Z * H); },
  s10(ctx, t, q) { bg(ctx, 'micro'); miMycelium(ctx, 860, 540, 1300, 760, { k: 1, sporen: 1, opp: 0.3, hl: q.on('kernen', 1), enz: q.on('enzymen', 1, 1.2), zak: 1, t });
    naamBij(ctx, 'enzymen', 'GAAN NAAR BUITEN', 300, 560, q.on('enzymen', 1), 'right'); naamBij(ctx, 'zetmeel', 'WORDT AFGEBROKEN', 1300, 640, q.on('verteert', 1));
    zoomCircle(ctx, 1640, 330, 190, 1640, 330, 'EEN HYFE · VERGROOT', q.on('kernen', 1), () => { binnen(ctx, 1640, 330, 190);
      const W2 = q.on('chitine', 1); ctx.lineCap = 'round'; ctx.strokeStyle = W2 > 0.5 ? C.goud : MI.hyfeR; ctx.lineWidth = 92; ctx.beginPath(); ctx.moveTo(1440, 330); ctx.lineTo(1840, 330); ctx.stroke();
      ctx.strokeStyle = '#3E5A66'; ctx.lineWidth = 76; ctx.stroke(); [1520, 1620, 1720].forEach(x => circ(ctx, x, 330 + (x % 3 - 1) * 10, 13, rgba(MI.kern, 0.9), MI.kern, 1.5)); });
    naamBij(ctx, 'kern', 'EUKARYOOT', 1640, 230, q.on('kernen', 1), 'center'); naamBij(ctx, 'celwand', 'MET CHITINE', 1640, 450, q.on('chitine', 1), 'center');
    schaalbalk(ctx, 60, '± 10 µm', 1); },
  s11(ctx, t, q) { keuken(ctx); tafel(ctx, 640, 1280, TAFEL, '#8C6A44'); miBoterham(ctx, 960, TAFEL - 18, 40, { schimmel: plekken(1, 2) });
    zoomCircle(ctx, 960, 300, 210, 960, TAFEL - 30, '', 1, () => { binnen(ctx, 960, 300, 210, 'schema'); miBoterham(ctx, 940, 310, 280, { schimmel: plekken(1, 2) });
      laag(ctx, q.on('snijden', 1), () => { ctx.save(); ctx.translate(1110, 330); ctx.rotate(-0.5); roundRect(ctx, -9, -110, 18, 140, 6); shape(ctx, '#C8CED6', '#F2F2EE', 2); roundRect(ctx, -12, 30, 24, 70, 8); shape(ctx, '#5A3A28', '#8C5A3A', 2); ctx.restore(); }); });
    metaA(ctx, 'VERGROOT', 1190, 310, 1, C.grain, 'left', 24); noor(ctx, 1420, t, { pose: 'denk' }); vraagteken(ctx, 1260, 500, q.on('denk', 1), 70); },
  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de draden zitten dieper', 1 - q.on('Wat', 1));
    // doorsnede van de snee
    const x = 960, y = 470, w = 900, h = 200; roundRect(ctx, x - w / 2, y - h / 2, w, h, 26); shape(ctx, MI.korst, MI.korstR, 2); roundRect(ctx, x - w / 2 + 16, y - h / 2 + 14, w - 32, h - 28, 18); ctx.fillStyle = MI.kruim; ctx.fill();
    miKolonie(ctx, 840, y - h / 2 - 4, 40, 1, 'groen', 0, 5); metaA(ctx, 'DOORSNEDE · VEREENVOUDIGD', 1820, 120, 1, C.grain, 'right', 24);
    const D = q.on('dieper', 1, 1.2); ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 16, y - h / 2 + 14, w - 32, h - 28); ctx.clip(); const r = miRng(8); ctx.strokeStyle = rgba('#3E5A66', 0.85 * D); ctx.lineWidth = 3;
    for (let i = 0; i < 16; i++) { let px = 840 + (r() - 0.5) * 30, py = y - h / 2 + 10; ctx.beginPath(); ctx.moveTo(px, py); for (let j = 0; j < 8; j++) { px += (r() - 0.5) * 90 * D; py += 22 * D; ctx.lineTo(px, py); } ctx.stroke(); } ctx.restore();
    naamBij(ctx, 'wat je ziet', '', 840, y - h / 2 - 60, 1, 'center'); naamBij(ctx, 'draden', 'ONZICHTBAAR', 1100, y + h / 2 + 50, D);
    pijlChip(ctx, 'sommige maken gifstoffen', 960, 720, C.koraal, q.on('gifstoffen', 1)); prullenbak(ctx, 1640, 800, 1, q.on('weg', 1)); },
  s14(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('knopvorming', 1, 1.2), C2 = q.on('koolstofdioxide', 1), R = q.on('rees', 1, 1.5);
    broodHeel(ctx, 420, 620, 360, 1); naamBij(ctx, 'brood', 'GEBAKKEN MET GIST', 420, 700, 1, 'center');
    zoomCircle(ctx, 1000, 380, 260, 420, 520, 'GISTCEL · VERGROOT', q.on('gist', 1, 0.6), () => { bg(ctx, 'micro'); miGist(ctx, 980, 390, 62, { knop: lerp(0.12, 1, K) }); });
    naamBij(ctx, 'knop', 'NIEUWE GISTCEL', 1150, 256, K, 'center'); schaalbalk(ctx, 124, '5 µm', q.on('gist', 1));
    laag(ctx, C2, () => { roundRect(ctx, 1400, 560 - 140 * R, 400, 220 + 140 * R, 60); shape(ctx, '#E2CC9C', '#F0E0BC', 2);
      const r = miRng(12); for (let i = 0; i < 22; i++) { const bx = 1440 + r() * 320, by = 590 + r() * 150 - ((t * 30 + r() * 200) % 220) * R; circ(ctx, bx, by, 6 + r() * 7, rgba('#F6F6F0', 0.7), rgba(C.teal, 0.8), 1.5); }
      naamBij(ctx, 'belletjes CO₂', 'DEEG RIJST', 1600, 340 - 100 * R, 1, 'center'); }); },
  s15(ctx, t, q) { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5FA86E'; ctx.fillRect(0, 600, W, 40); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 640, W, 260);
    miPaddenstoel(ctx, 800, 640, 0.6, { draden: 0 }); naamBij(ctx, 'paddenstoel', '', 700, 500, q.on('paddenstoel', 1), 'right');
    teun(ctx, 1060, t, { voet: 640, h: 400, kijk: -1, pose: q.on('tekent', 1) > 0.5 ? 'vasthouden' : 'staan', uit: 'blij', hold: q.on('tekent', 1) > 0.5 ? (c, x, y) => { roundRect(c, x - 40, y - 60, 80, 100, 6); shape(c, '#F2F2EE', '#9AA3B2', 2); laag(c, q.on('tekent', 1, 1.5), () => miPaddenstoel(c, x, y + 20, 0.22, { draden: 0.6 })); } : null });
    vraagteken(ctx, 1400, 360, q.on('eigenlijk', 1), 90); },
  s17(ctx, t, q) { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5FA86E'; ctx.fillRect(0, 600, W, 40); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 640, W, 260);
    laag(ctx, 1 - q.on('Daarin', 1), () => { roundRect(ctx, 96, 104, 1000, 64, 14); shape(ctx, rgba('#0D1420', 0.85), null); antwoord(ctx, 'antwoord a: het vruchtlichaam van een schimmel', 1); });
    const D = q.on('grootste', 1, 1.2); ctx.save(); ctx.beginPath(); ctx.rect(0, 640, W, 240); ctx.clip(); miPaddenstoel(ctx, 800, 640, 1.8 * D + 0.01, { draden: 1, alleenDraden: true, a: D }); ctx.restore();
    miPaddenstoel(ctx, 800, 640, 0.6, { draden: 0 });
    const S = q.on('sporen', 1); laag(ctx, S, () => { const r = miRng(3); for (let i = 0; i < 14; i++) { const ph = (t * 0.6 + r()) % 1; circ(ctx, 760 + r() * 80, 600 - 30 + ph * 60, 2.5, rgba('#E8DCC2', 1 - ph)); } metaA(ctx, 'SPOREN · VERGROOT', 960, 470, 1, C.grain, 'left', 24); });
    naamBij(ctx, 'vruchtlichaam', '', 700, 500, 1, 'right'); naamBij(ctx, 'mycelium', 'HET GROOTSTE DEEL', 1260, 790, D);
    laag(ctx, q.on('rijk', 1), () => { roundRect(ctx, 1220, 200, 600, 200, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 2);
      text(ctx, 'plant', 1320, 330, fTekst(32, 700), C.groen, 'center'); text(ctx, 'schimmel', 1520, 330, fTekst(32, 700), C.goud, 'center'); text(ctx, 'dier', 1720, 330, fTekst(32, 700), C.oker, 'center');
      metaText(ctx, 'EIGEN RIJK', 1520, 250, C.grain, 'center', 22); pijl(ctx, 1600, 300, 1680, 300, C.goud, q.on('dieren', 1), 3, 12); }); },

  // ---------- H3 Puntjes op de voedingsbodem ----------
  s18(ctx, t, q) { lokaal(ctx); tafel(ctx, 560, 1360, TAFEL);
    visser(ctx, 460, t, { pose: q.on('vingers', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1480, t, { outfit: 'practicum' });
    const S = q.on('schaaltjes', 1, 0.8); [0, 1, 2].forEach(i => laag(ctx, S, () => miSchaal(ctx, 900 + i * 60, TAFEL - 8, 16, { kol: 0, dicht: 1 })));
    zoomCircle(ctx, 960, 290, 230, 960, TAFEL - 20, '', S, () => { binnen(ctx, 960, 290, 230, 'schema');
      const open3 = fase(t, q.at('open', 1) - 0.3, q.at('lokaal', 1) + 1.6, 0.4), druk = fase(t, q.at('drukt', 1), q.at('vingers', 1) + 1.0, 0.3);
      [['dicht', 0], ['vingers', 1], ['lucht', 2]].forEach(([lab, i]) => { const x = 810 + i * 150; miSchaal(ctx, x, 280, 56, { kol: 0, dicht: i === 2 ? 1 - open3 : (i === 1 ? 1 - druk : 1) }); naamBij(ctx, lab, '', x, 380, 1, 'center'); });
      laag(ctx, open3, () => { circ(ctx, 1110, 186, 54, rgba('#AFC0D0', 0.08), '#AFC0D0', 2.5); metaText(ctx, '10 MIN OPEN', 1110, 140, C.goud, 'center', 24); });
      laag(ctx, druk, () => { ctx.fillStyle = '#C69A78'; ctx.strokeStyle = '#DDB898'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { roundRect(ctx, 932 + i * 14, 236 + Math.abs(i - 1.5) * 6, 12, 54, 6); ctx.fill(); ctx.stroke(); } }); });
    metaA(ctx, 'VERGROOT', 1210, 300, S, C.grain, 'left', 24); metaA(ctx, 'DAARNA DICHT · KAMERTEMPERATUUR · NIET OPENEN', 960, 590, q.on('lokaal', 1, 0.6), C.koraal, 'center', 24); },
  s19(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('puntjes', 1, 2.5);
    [['dicht gebleven', 0.12], ['vingers', 1], ['lucht', 0.4]].forEach(([lab, k], i) => miSchaal(ctx, 560 + i * 400, 400, 150, { kol: k * P, seed: i + 1, label: lab, n: 24 }));
    naamBij(ctx, 'kolonie', 'HOOPJE BACTERIËN', 960, 200, q.on('kolonie', 1), 'center');
    laag(ctx, q.on('enkele', 1), () => zoomCircle(ctx, 960, 720, 120, 960, 470, 'BEGIN: VAAK ÉÉN CEL', 1, () => { binnen(ctx, 960, 720, 120); miBacterie(ctx, 960, 720, 110, {}); })); },
  s20(ctx, t, q) { bg(ctx, 'micro'); const Z = q.on('Zoom', 1, 0.8);
    laag(ctx, 0.55 * q.on('lang', 1), () => { ctx.beginPath(); ctx.arc(960, 760 + 5000, 5000, -Math.PI / 2 - 0.2, -Math.PI / 2 + 0.2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); metaA(ctx, 'RAND VAN JOUW CEL', 1600, 800, 1, C.text2, 'center', 24); });
    const hl = { dna: q.on('DNA', 1) * (1 - q.on('plasmiden', 1)) > 0.5, plasmide: q.on('plasmiden', 1) * (1 - q.on('celmembraan', 1)) > 0.5, membraan: q.on('celmembraan', 1) * (1 - q.on('celwand', 1)) > 0.5, wand: q.on('celwand', 1) * (1 - q.on('ribosomen', 1)) > 0.5, ribo: q.on('ribosomen', 1) * (1 - q.on('zweepdraad', 1)) > 0.5, flagel: q.on('zweepdraad', 1) * (1 - q.on('wél', 1)) > 0.5 };
    laag(ctx, Z, () => miBacterie(ctx, 1060, 440, 700 * lerp(0.4, 1, Z), { flagel: q.on('zweepdraad', 1) > 0.3, hl, t }));
    metaA(ctx, 'MODEL · E. COLI', 1820, 120, Z, C.grain, 'right', 26);
    naamBij(ctx, 'DNA', 'ÉÉN RING', 1035, 236, q.on('DNA', 1), 'center'); naamBij(ctx, 'plasmide', '', 1340, 650, q.on('plasmiden', 1), 'center');
    naamBij(ctx, 'celmembraan', '', 1090, 650, q.on('celmembraan', 1), 'center'); naamBij(ctx, 'celwand', '', 820, 650, q.on('celwand', 1), 'center');
    naamBij(ctx, 'ribosomen', 'KLEINER', 1480, 430, q.on('ribosomen', 1)); naamBij(ctx, 'zweepdraad', '', 420, 330, q.on('zweepdraad', 1), 'center');
    schaalbalk(ctx, 260, '1 µm', Z); vraagteken(ctx, 1640, 230, q.on('wél', 1), 80); },
  s22(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord a: een kern', 1 - q.on('bacterie', 1));
    ctx.beginPath(); ctx.arc(560, 470, 260, 0, 6.283); shape(ctx, rgba('#C9B896', 0.08), '#AFC0D0', 3); for (let i = 0; i < 30; i++) circ(ctx, 560 + Math.cos(i * 2.4) * (60 + (i * 37) % 170), 470 + Math.sin(i * 2.4) * (60 + (i * 53) % 170), 3, rgba('#C9B896', 0.35)); circ(ctx, 480, 430, 86, rgba(C.kern, 0.6), q.on('kern', 1) > 0.5 && q.on('prokaryoot', 1) < 0.5 ? C.goud : C.kernR, 3);
    naamBij(ctx, 'jouw cel', 'EUKARYOOT · MET KERN', 560, 790, 1, 'center');
    miBacterie(ctx, 1360, 470, 300, {}); naamBij(ctx, 'bacterie', 'PROKARYOOT · GEEN KERN', 1360, 640, q.on('prokaryoot', 1), 'center');
    laag(ctx, q.on('kern', 1), () => { ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; roundRect(ctx, 1290, 420, 120, 100, 14); ctx.stroke(); ctx.restore(); });
    metaA(ctx, 'NIET OP SCHAAL', 1820, 860, 1, C.grain, 'right', 24); },
  s23(ctx, t, q) { bg(ctx, 'micro'); const t0 = q.at('kopieert', 1), t1 = q.at('splitst', 1) + 2.2; const f = clamp((t - t0 + 0.5) / Math.max(1, t1 - t0), 0, 1);
    miBacterie(ctx, 960, 450, 400, { fase: f, t, plasmide: true });
    naamBij(ctx, 'DNA kopiëren', '', 960, 260, fase(t, q.at('kopieert', 1), q.at('groeit', 1) + 1.2), 'center'); naamBij(ctx, 'groeien', '', 960, 260, fase(t, q.at('groeit', 1), q.at('splitst', 1)), 'center'); naamBij(ctx, 'in twee', 'TWEEDELING', 960, 260, q.on('splitst', 1), 'center');
    laag(ctx, q.on('twintig', 1), () => { klokje(ctx, 1600, 220, 60, (t * 0.2) % 1); metaText(ctx, '± 20 MIN · IDEAAL', 1600, 330, C.grain, 'center', 24); });
    vraagteken(ctx, 960, 720, q.on('uur', 1), 80); schaalbalk(ctx, 150, '1 µm', 1); },
  s25(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: acht', 1 - q.on('twee', 1));
    const st = [['twee', 2], ['vier', 4], ['acht', 8]]; let n = 1; st.forEach(([w, v]) => { if (q.on(w, 1) > 0.5) n = v; });
    text(ctx, String(n), 420, 380, fTitel(140), C.teal, 'center'); metaA(ctx, 'BACTERIËN', 420, 430, 1, C.grain, 'center', 24);
    for (let i = 0; i < n; i++) miBacterie(ctx, 260 + (i % 4) * 110, 520 + Math.floor(i / 4) * 70, 70, {});
    laag(ctx, q.on('zestien', 1), () => { text(ctx, '16 miljoen', 420, 760, fTitel(64), C.teal, 'center'); metaA(ctx, 'NA ACHT UUR', 420, 800, 1, C.grain, 'center', 22); });
    const G = q.on('zestien', 1, 1.5); groeiGrafiek(ctx, 900, 220, 860, 520, G, G, q.on('vlakt', 1, 1.2));
    pijlChip(ctx, 'als niets het tegenhoudt', 1330, 200, C.goud, q.on('tegenhoudt', 1)); pijlChip(ctx, 'voedsel op, afval erbij', 1560, 340, C.koraal, q.on('afval', 1)); },

  // ---------- H4 Een nies? Liever niet ----------
  s26(ctx, t, q) { lokaal(ctx); tafel(ctx, 560, 1360, TAFEL);
    visser(ctx, 460, t, { kijk: 1, pose: q.on('Niezen', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1480, t, { outfit: 'practicum', uit: q.on('verkouden', 1) > 0.5 ? 'moe' : 'neutraal', pose: 'vasthouden', hold: (c, x, y) => { c.beginPath(); c.moveTo(x - 22, y - 14); c.lineTo(x + 18, y - 22); c.lineTo(x + 24, y + 16); c.lineTo(x - 16, y + 22); c.closePath(); shape(c, '#F2F2EE', '#C8CED6', 1.5); } });
    naamBij(ctx, 'zakdoek', 'VERKOUDEN', 1235, 466, q.on('verkouden', 1) * (1 - q.on('Niezen', 1)), 'center');
    miSchaal(ctx, 960, TAFEL - 8, 16, { kol: 0, dicht: 0 });
    zoomCircle(ctx, 960, 300, 170, 960, TAFEL - 20, '', q.on('Niezen', 1), () => { binnen(ctx, 960, 300, 170, 'schema'); miSchaal(ctx, 960, 300, 90, { kol: 0, dicht: 0 }); kruis(ctx, 960, 300, 56, 1, C.koraal); });
    metaA(ctx, 'NIET OP SCHOOL', 960, 510, q.on('Niezen', 1), C.koraal, 'center', 26);
    bubbel(ctx, 400, 230, 'Niezen op een schaaltje doen we niet.', C.text, fase(t, q.at('Niezen', 1), q.at('ziekteverwekkers', 1) - 1.4));
    bubbel(ctx, 400, 230, 'In een nies kunnen ziekteverwekkers zitten.', C.text, fase(t, q.at('ziekteverwekkers', 1) - 1.4, q.at('Stel', 1) + 0.6));
    vraagteken(ctx, 1240, 300, q.on('Stel', 1), 80); },
  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: geen menselijke cellen om in te groeien', 1 - q.on('voedingsbodem', 1));
    miSchaal(ctx, 380, 480, 130, { kol: 0, dicht: 1, label: 'geen virussen', a: 1 - 0.65 * q.on('gastheer', 1) });
    const Z = q.on('gastheer', 1, 0.8); noor(ctx, 860, t, { h: 420, voet: 820, kijk: 1, uit: 'moe', a: Z });
    zoomCircle(ctx, 1400, 420, 300, 905, 455, 'NEUSSLIJMVLIES · VERGROOT', Z, () => { binnen(ctx, 1400, 420, 300); ctx.beginPath(); ctx.arc(1400, 860, 600, 0, 6.283); shape(ctx, rgba('#C9B896', 0.08), '#AFC0D0', 4); circ(ctx, 1360, 640, 70, rgba(C.kern, 0.5), C.kernR, 2); miVirus(ctx, 1400, 236, 30, { envelop: 0 }); });
    naamBij(ctx, 'menselijke cel', 'GASTHEER', 1400, 600, q.on('mens', 1), 'center'); },
  s29(ctx, t, q) { bg(ctx, 'micro'); const L = q.on('elektronenmicroscoop', 1, 0.8), V = 1 - L;
    laag(ctx, V, () => { const E = q.on('envelop', 1); miVirus(ctx, 520, 400, 190, { open: q.on('eiwitmantel', 1) * 0.6, envelop: 0 }); naamBij(ctx, 'eiwitmantel', '', 520, 640, q.on('eiwitmantel', 1), 'center'); naamBij(ctx, 'RNA of DNA', '', 520, 420, q.on('DNA', 1), 'center', C.text);
      laag(ctx, E, () => { miVirus(ctx, 1100, 380, 150, { envelop: 1 }); naamBij(ctx, 'griepvirus', '', 1100, 600, 1, 'center'); metaRaw(ctx, 'met envelop · ± 100 nm', 1100, 632, 1, C.grain, 'center', 24); });
      laag(ctx, q.on('dertig', 1), () => { miVirus(ctx, 1480, 440, 45, {}); naamBij(ctx, 'verkoudheidsvirus', '', 1480, 540, 1, 'center'); metaRaw(ctx, '± 30 nm', 1480, 572, 1, C.grain, 'center', 24); });
      laag(ctx, q.on('tientallen', 1), () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 700, W, 170); ctx.clip(); ctx.beginPath(); ctx.arc(1300, 730 + 1200, 1200, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), '#7FB8D6', 10); ctx.restore(); metaRaw(ctx, 'rand van één E. coli, op dezelfde schaal (± 0,8 µm dik)', 1300, 690, 1, C.grain, 'center', 24); });
      metaRaw(ctx, 'op schaal: 100 nm ≈ 300 px', 1820, 120, q.on('honderd', 1), C.grain, 'right', 22); });
    laag(ctx, L, () => { bg(ctx, 'schema'); miLadder(ctx, 220, 560, 1480, [
      { naam: 'verkoudheidsvirus', sub: '30 nm', m: 3e-8, teken: (c, x, y) => miVirus(c, x, y + 30, 14, {}) },
      { naam: 'griepvirus', sub: '100 nm', m: 1e-7, teken: (c, x, y) => miVirus(c, x, y + 20, 26, { envelop: 1 }) },
      { naam: 'E. coli', sub: '2 µm', m: 2e-6, teken: (c, x, y) => miBacterie(c, x, y + 20, 80, { plasmide: false }) },
      { naam: 'gistcel', sub: '5 µm', m: 5e-6, teken: (c, x, y) => miGist(c, x, y + 20, 32, { knop: 0.3 }) },
      { naam: 'jouw cel', sub: '10–100 µm', m: 3e-5, teken: (c, x, y) => { circ(c, x, y + 10, 44, rgba('#C9B896', 0.1), '#AFC0D0', 2); circ(c, x - 6, y + 6, 14, rgba(C.kern, 0.7)); } }], { k: 1 });
      const gx = 220 + (Math.log10(2e-7) + 8) / 4 * 1480; ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, 300); ctx.lineTo(gx, 720); ctx.stroke(); ctx.restore();
      text(ctx, '← alleen elektronenmicroscoop', gx - 16, 770, fTekst(28, 700), C.koraal, 'right'); text(ctx, 'lichtmicroscoop →', gx + 16, 770, fTekst(28, 700), C.teal, 'left'); metaRaw(ctx, 'grens ± 0,2 µm', gx, 286, 1, C.koraal, 'center', 24);
      metaText(ctx, 'LOGARITMISCHE SCHAAL', 1820, 120, C.grain, 'right', 22); }); },
  s30(ctx, t, q) { lokaal(ctx); noor(ctx, 760, t, { outfit: 'practicum', kijk: 1, uit: 'moe', pose: 'vasthouden', hold: (c, x, y) => { roundRect(c, x - 34, y - 22, 68, 40, 6); shape(c, C.oker, '#E3C27E', 2); } });
    naamBij(ctx, 'antibioticum', '', 900, 520, q.on('antibioticum', 1));
    miVirus(ctx, 1380, 420, 60, {}); metaA(ctx, 'VERKOUDHEIDSVIRUS · VERGROOT', 1380, 520, q.on('verkoudheid', 1), C.grain, 'center', 24); vraagteken(ctx, 1380, 300, q.on('Helpt', 1), 90); },
  s32(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord a: een virus mist de onderdelen', 1 - q.on('grijpen', 1));
    miBacterie(ctx, 640, 450, 420, { hl: { wand: q.on('celwand', 1) > 0.5, ribo: q.on('ribosomen', 1) > 0.5 } }); naamBij(ctx, 'celwand', '', 640, 600, q.on('celwand', 1), 'center'); naamBij(ctx, 'ribosomen', 'ANDERS DAN DE JOUWE', 640, 320, q.on('ribosomen', 1), 'center');
    miVirus(ctx, 1400, 450, 110, {}); naamBij(ctx, 'virus', 'GEEN CELWAND · GEEN RIBOSOMEN', 1400, 640, q.on('virus', 1), 'center'); kruis(ctx, 1400, 450, 50, q.on('niet', 2), C.koraal);
    metaA(ctx, 'NIET OP SCHAAL', 1820, 860, 1, C.grain, 'right', 24); },
  // ---------- H5 Wie leeft waarvan? ----------
  s33(ctx, t, q) { keuken(ctx); noor(ctx, 1240, t, { kijk: -1, pose: 'vasthouden', hold: telefoon }); teun(ctx, 820, t, { uit: q.on('Bah', 1) > 0.5 ? 'moe' : 'neutraal', kijk: 1 });
    bubbel(ctx, 720, 310, 'Bah, bacteriën!', C.text, q.on('Bah', 1) * (1 - q.on('evenveel', 1)));
    laag(ctx, q.on('schatting', 1), () => { roundRect(ctx, 1380, 380, 460, 180, 18); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2); text(ctx, 'bacteriën ≈ eigen cellen', 1610, 460, fTekst(32, 700), C.teal, 'center'); metaText(ctx, 'SCHATTING · 2016', 1610, 515, C.grain, 'center', 24); });
    vraagteken(ctx, 1610, 640, q.on('zegt', 1), 80); },
  s35(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: lang niet alle maken je ziek', 1 - q.on('Lang', 1));
    const K = q.on('leefwijzen', 1); ['reducent', 'mutualisme', 'parasiet'].forEach((s2, i) => laag(ctx, clamp(K * 3 - i, 0, 1), () => { roundRect(ctx, 260 + i * 500, 380, 400, 220, 18); shape(ctx, '#22324E', rgba(C.line, 0.6), 2); text(ctx, s2, 460 + i * 500, 500, fTekst(40, 700), C.text, 'center'); }));
    laag(ctx, q.on('gezond', 1) * (1 - K), () => { noor(ctx, 960, t, { voet: 820, h: 520, uit: 'blij', kijk: 1 }); }); },
  s36(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('reducent', 1), A = q.on('breekt', 1), V = q.on('vrij', 1), P = q.on('planten', 1);
    miBoterham(ctx, 420, 430, 260, { schimmel: plekken(1), droog: 0 }); naamBij(ctx, 'reducent', 'BREEKT DODE RESTEN AF', 420, 640, R, 'center');
    pijl(ctx, 600, 430, 860, 430, C.line, clamp(A, 0, 1), 3, 14); laag(ctx, clamp(A, 0, 1), () => { for (let i = 0; i < 12; i++) circ(ctx, 980 + (i % 4) * 34, 400 + Math.floor(i / 4) * 34, 9, C.oker, '#E3C27E', 1.5); naamBij(ctx, 'stoffen', 'IN DE BODEM', 1030, 560, 1, 'center'); });
    pijl(ctx, 1160, 430, 1380, 430, C.line, V, 3, 14); laag(ctx, P, () => { ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1520, 560); ctx.lineTo(1520, 330); ctx.stroke(); for (const [dx, dy, r] of [[-50, 380, 0.6], [50, 350, -0.6], [-40, 300, 0.5]]) { ctx.beginPath(); ctx.ellipse(1520 + dx, dy, 48, 20, r, 0, 6.283); shape(ctx, '#7FC48F', '#A8DDB4', 2); } naamBij(ctx, 'plant', 'NEEMT OP', 1520, 620, 1, 'center'); }); },
  s37(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('mutualisme', 1), P = q.on('parasiet', 1), S = q.on('symbiose', 1);
    laag(ctx, M, () => { ctx.fillStyle = rgba('#3A2E24', 0.6); ctx.fillRect(160, 470, 760, 300); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(160, 470); ctx.lineTo(920, 470); ctx.stroke();
      klaverWortel(ctx, 520, 470, 1.2, { n2: q.on('stikstof', 1), suiker: q.on('suikers', 1) }); naamBij(ctx, 'mutualisme', 'BEIDE VOORDEEL · +/+', 520, 820, 1, 'center', C.groen); naamBij(ctx, 'knolletjes', 'BACTERIËN', 690, 610, q.on('wortelknolletjes', 1)); });
    laag(ctx, P, () => { voetSchimmel(ctx, 1380, 520, 1.3, 1, q.on('voetschimmel', 1, 0.8)); naamBij(ctx, 'parasiet', 'VOORDEEL · GASTHEER NADEEL · +/−', 1380, 820, 1, 'center', C.koraal); naamBij(ctx, 'voetschimmel', 'TUSSEN DE TENEN', 1560, 360, q.on('voetschimmel', 1)); });
    haak(ctx, 300, 1620, 140, '', C.goud, S); laag(ctx, S, () => text(ctx, 'symbiose: nauw samenleven', 960, 110, fTekst(38, 700), C.goud, 'center')); },
  s38(ctx, t, q) { bg(ctx, 'schema'); const Y = q.on('yoghurt', 1), F = q.on('Fleming', 1, 0.8);
    laag(ctx, Y * (1 - F * 0.6), () => { yoghurt(ctx, 380, 560, 1.4); naamBij(ctx, 'melkzuurbacteriën', '', 380, 640, 1, 'center'); });
    laag(ctx, F, () => { miSchaalBoven(ctx, 1100, 450, 220, { kol: 1, seed: 9, n: 40 }); ctx.save(); ctx.beginPath(); ctx.arc(1100, 450, 120, 0, 6.283); ctx.fillStyle = '#B9A77A'; ctx.fill(); ctx.restore(); miKolonie(ctx, 1100, 450, 46, 1, 'groen', 0, 5);
      ctx.save(); ctx.setLineDash([8, 7]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(1100, 450, 120, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'Penicillium', 'SCHIMMEL', 1100, 210, 1, 'center'); naamBij(ctx, 'geen bacteriën', '', 1100, 540, q.on('eromheen', 1), 'center'); metaA(ctx, 'HET JAAR 1928', 1100, 740, 1, C.grain, 'center', 24); });
    pijlChip(ctx, 'penicilline: eerste antibioticum', 1540, 200, C.goud, q.on('penicilline', 1)); },
  // ---------- Recap ----------
  s39(ctx, t, q) { keuken(ctx); tafel(ctx, 640, 1280, TAFEL, '#8C6A44'); const W2 = q.on('weg', 1);
    trommelBrood(ctx, 960, TAFEL - 18, 70, 1, 1 - W2);
    zoomCircle(ctx, 960, 300, 230, 960, TAFEL - 30, '', 1 - W2, () => { binnen(ctx, 960, 300, 230, 'schema'); trommelBrood(ctx, 960, 300, 360, 1, 1);
      sporenRegen(ctx, t, 760, 1160, 90, 300, 18, fase(t, q.at('sporen', 1), q.at('vochtige', 1) + 1));
      laag(ctx, fase(t, q.at('hyfen', 1), q.at('weg', 1)), () => { ctx.save(); ctx.beginPath(); ctx.arc(960, 300, 230, 0, 6.283); ctx.clip(); miMycelium(ctx, 960, 360, 520, 260, { k: 1, sporen: 1, opp: 0.2, zak: 0.6 }); ctx.restore(); });
      laag(ctx, fase(t, q.at('bacteriën', 1), q.at('weg', 1)), () => [[880, 420], [1040, 440]].forEach(([x, y]) => miBacterie(ctx, x, y, 60, {})));
      laag(ctx, fase(t, q.at('Virussen', 1), q.at('weg', 1)), () => { miVirus(ctx, 1110, 180, 22, {}); kruis(ctx, 1110, 180, 26, 1, C.koraal); }); });
    pijlChip(ctx, 'hyfen diep het brood in', 960, 590, C.goud, fase(t, q.at('hyfen', 1), q.at('bacteriën', 1)));
    pijlChip(ctx, 'misschien bacteriën: tweedeling', 960, 590, C.teal, fase(t, q.at('bacteriën', 1), q.at('Virussen', 1)));
    pijlChip(ctx, 'virussen niet: geen gastheercel', 960, 590, C.koraal, fase(t, q.at('Virussen', 1), q.at('weg', 1)));
    prullenbak(ctx, 1640, 800, 0.6, W2); metaA(ctx, 'VERGROOT', 1210, 310, 1 - W2, C.grain, 'left', 24);
    noor(ctx, 1420, t, { kijk: -1 }); teun(ctx, 460, t, { pose: q.on('tekent', 1) > 0.5 ? 'vasthouden' : 'staan', uit: 'blij', hold: q.on('tekent', 1) <= 0.5 ? null : (c, x, y) => { roundRect(c, x - 70, y - 110, 140, 170, 8); shape(c, '#F2F2EE', '#9AA3B2', 2); miPaddenstoel(c, x, y + 20, 0.42, { draden: 0.5 }); } }); },
});

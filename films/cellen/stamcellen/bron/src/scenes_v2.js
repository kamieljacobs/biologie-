// Cellen · Stamcellen 2.0 — scènes per alinea (beeld-remake op prompt v13, 29 okt 2026; takes en cues van 1.2).
// Rode draad: dezelfde chromosomen (genChrom) onder elke cel, alleen het gen dat aan staat licht goud op.
const X4 = [330, 730, 1130, 1530], X5 = [250, 600, 950, 1300, 1650];
const NAAM = { zenuw: 'zenuwcel', spier: 'spiercel', alv: 'alvleeskliercel', huid: 'huidcel', bloed: 'rode bloedcel', hart: 'hartspiercel', stam: 'stamcel' };
function stam(ctx, x, y, r, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _scbCel(ctx, x, y, r, 0, 0.5, Math.max(1, r * 0.03)); if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.stroke(); } ctx.restore(); }
// cel gecentreerd tekenen (de zenuwcel heeft een lang axon naar rechts)
function cel(ctx, tp, x, y, u, t, a = 1) { celType(ctx, tp, tp === 'zenuw' ? x - u * 0.9 : x, y, u, t, a); }
const uitF = a => 1 - clamp(a * 2, 0, 1), inF = a => clamp(a * 2 - 1, 0, 1); // eerst het oude weg, dan het nieuwe (geen dubbelbeeld)
const beat = (t, ph = 0, f = 1.2) => Math.pow(Math.max(0, Math.sin((t * f + ph) * Math.PI)), 6);
// één rij cellen met dezelfde chromosomen; o: {X, types, y, u, a(i), aan(i), ring(i), namen(i), naamA(i), leegBloed}
function celRij(ctx, t, o) { const { X, types, y = 320, u = 50, ly = 470, cy = 600, len = 280 } = o;
  types.forEach((tp, i) => { const a = o.a ? o.a(i) : 1; if (a <= 0.01) return; const x = X[i];
    if (tp === 'bloed') { ctx.save(); ctx.globalAlpha *= a; rodeBloedcel(ctx, x - u * 0.45, y, u * 0.42, 0, 0); rodeBloedcel(ctx, x + u * 0.5, y, u * 0.42, Math.PI / 2, 1); ctx.restore(); }
    else cel(ctx, tp, x, y, u, t, a);
    naamBij(ctx, NAAM[tp], null, x, ly, a * (o.naamA ? o.naamA(i) : 1), 'center', C.text);
    const ca = o.chromA ? o.chromA(i) : a; if (ca <= 0.01) return;
    const cx = o.vlieg ? lerp(960, x, o.vlieg(i)) : x, cyy = o.vlieg ? lerp(cy + 40, cy, o.vlieg(i)) : cy;
    genChrom(ctx, cx, cyy, len, { a: ca, leeg: tp === 'bloed', aan: CEL_GEN[tp], aanA: o.aan ? o.aan(i) : 0, ring: o.ring ? o.ring(i) : null, ringA: o.ringA ? o.ringA(i) : 0, namen: o.namen ? o.namen(i) : 0 }); }); }

// knie in een zoomcirkel: huid met knieschijf, schaafwond die heelt (schaafwond uit de beeldbank, hier op de knie)
function knieHuid(ctx, x, y, r, heel) { ctx.fillStyle = CAST.noor.huid; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = rgba('#000000', 0.06); ctx.beginPath(); ctx.ellipse(x, y - r * 0.05, r * 0.55, r * 0.62, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.07); ctx.beginPath(); ctx.ellipse(x - r * 0.08, y - r * 0.18, r * 0.32, r * 0.3, 0, 0, 6.283); ctx.fill();
  // 2.1 (open punt frisse review): na de korst geen egale roze vlek, maar gewone huid met hooguit een vaag lichter plekje
  const plek = ease(clamp((heel - 0.5) / 0.2, 0, 1)); if (plek > 0.01) { ctx.fillStyle = rgba('#FFFFFF', 0.07 * plek); ctx.beginPath(); ctx.ellipse(x, y + r * 0.05, r * 0.5, r * 0.32, 0, 0, 6.283); ctx.fill(); }
  schaafwond(ctx, x, y + r * 0.05, r * 0.24, { heel, cx: 0, cyy: 0, rx: 2.4, ry: 1.5, kijk: 1, a: 1 - ease(clamp((heel - 0.55) / 0.15, 0, 1)) }); }
// infarct: stuk van de linkerkamerwand sterft af (donker) en wordt littekenweefsel (grijs-wit met bindweefselstreepjes)
// Recept: OpenStax A&P 2e § 19.1 (myocardinfarct: afgestorven spier wordt vervangen door bindweefsel, dat niet samentrekt).
function infarct(ctx, x, y, s, dood, litteken) { if (dood <= 0.01) return; ctx.save(); ctx.globalAlpha *= dood; ctx.translate(x + 168 * s, y + 175 * s); ctx.rotate(-0.55);
  ctx.beginPath(); ctx.ellipse(0, 0, 34 * s, 62 * s, 0, 0, 6.283); ctx.fillStyle = mix('#4A1E22', '#CFC6B4', litteken); ctx.fill();
  if (litteken > 0.3) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#9A9284', litteken); ctx.lineWidth = Math.max(1, 2 * s); for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(-40 * s, i * 14 * s); ctx.bezierCurveTo(-10 * s, i * 14 * s - 6 * s, 10 * s, i * 14 * s + 6 * s, 40 * s, i * 14 * s); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function hartMetInfarct(ctx, x, y, s, t, o = {}) { const { a = 1, dood = 0, litteken = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hartDoorsnede(ctx, x, y, s, { u: (t * 1.1) % 1, t, detail: 0.6 }); infarct(ctx, x, y, s, dood, litteken); ctx.restore(); }
// beenmerg-veld met cellen (Micro): rode bloedcellen, een paar witte, stamcellen; leukemie (o.leuk 0..1) vervangt ze door blasten
const _BM = Array.from({ length: 22 }, (_, i) => { const an = i * 2.399, d = Math.sqrt((i + 0.5) / 22) * 0.86; return [Math.cos(an) * d, Math.sin(an) * d, i % 5 === 0 ? 's' : (i % 4 === 1 ? 'w' : 'r'), hash(i * 3.1)]; });
function blast(ctx, x, y, r) { _scbCel(ctx, x, y, r, 0, 0.66, Math.max(1, r * 0.03), false); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2.5; ctx.stroke(); }
function beenmergVeld(ctx, x, y, R, t, o = {}) { const { leuk = 0, leeg = 0, donor = 0, nieuw = 0 } = o;
  _BM.forEach(([px, py, sr, h], i) => { const cx = x + px * R + Math.sin(t * 0.4 + i) * 3, cy = y + py * R + Math.cos(t * 0.35 + i) * 3; const isB = leuk * 1.25 - h > 0.15; const al = 1 - leeg;
    if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al;
    if (isB) blast(ctx, cx, cy, R * 0.12); else if (sr === 'r') rodeBloedcel(ctx, cx, cy, R * 0.075, i, i % 3 === 0 ? 0.7 : 0); else if (sr === 'w') witteBloedcellen(ctx, cx, cy, R * 0.2, { soort: 'neutrofiel', t }); else stam(ctx, cx, cy, R * 0.09);
    ctx.restore(); });
  if (donor > 0.01) [[-0.35, -0.1], [0.1, 0.3], [0.3, -0.35]].forEach(([px, py], i) => { const u = ease(clamp(donor * 1.4 - i * 0.2, 0, 1)); const cx = lerp(x - R * 1.1, x + px * R, u), cy = y + py * R; ctx.save(); ctx.globalAlpha *= clamp(u * 3, 0, 1); stam(ctx, cx, cy, R * 0.09); ctx.beginPath(); ctx.arc(cx, cy, R * 0.115, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.stroke();
      for (let k = 0; k < 4; k++) { const n = ease(clamp(nieuw * 1.5 - k * 0.15 - i * 0.1, 0, 1)); if (n <= 0.01) continue; const an = k * 1.57 + i, qx = cx + Math.cos(an) * R * 0.2 * n, qy = cy + Math.sin(an) * R * 0.2 * n; ctx.save(); ctx.globalAlpha *= n; rodeBloedcel(ctx, qx, qy, R * 0.07, an, 0); ctx.beginPath(); ctx.arc(qx, qy, R * 0.085, 0, 6.283); ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
      ctx.restore(); }); }
function bloedplaatje(ctx, x, y, r, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.55, 0, 0, 6.283); shape(ctx, '#C9A0A8', '#E6C6CC', 1); ctx.fillStyle = rgba('#7A4A5A', 0.6); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc((i - 1) * r * 0.4, (i % 2 - 0.5) * r * 0.2, r * 0.13, 0, 6.283); ctx.fill(); } ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1420, cy = 460; stam(ctx, cx, cy, 78, 1); const doel = [['zenuw', -150], ['spier', -80], ['alv', 0], ['huid', 80], ['bloed', 150]];
    doel.forEach(([tp, deg], i) => { const an = (deg - 90) * Math.PI / 180, R = 290, x = cx + Math.sin(-an - Math.PI / 2) * 0 + Math.cos(an) * R, y = cy + Math.sin(an) * R * 0.95 + 40; const g = ease(clamp(t * 0.8 - i * 0.15, 0, 1));
      pijl(ctx, cx + Math.cos(an) * 105, cy + Math.sin(an) * 100 + 10, cx + Math.cos(an) * (105 + 90 * g), cy + Math.sin(an) * (100 + 85 * g) + 10, C.line, g, 3);
      const tx = x, ty = y + (an > 0 ? 40 : 0); if (tp === 'bloed') { ctx.save(); ctx.globalAlpha *= g; rodeBloedcel(ctx, tx, ty, 24, 0, 0); ctx.restore(); } else cel(ctx, tp, tx, ty, 36, t, g); }); },

  s01(ctx, t, q) { bg(ctx, 'schema');
    const heel = ramp(t, q.at('later', 1), q.at('hersteld', 1) - q.at('later', 1) + 0.4), wond = q.on('schaaft', 1);
    const N = persoon(ctx, 'noor', 330, 870, 610, { outfit: 'sport', t, uit: heel > 0.6 ? 'blij' : 'neutraal' });
    const kx = N.heup.x + 36, ky = N.heup.y + (870 - N.heup.y) * 0.46;
    if (wond * (1 - heel) > 0.01) { ctx.save(); ctx.globalAlpha *= wond * (1 - heel); ctx.beginPath(); ctx.ellipse(kx, ky, 10, 7, 0, 0, 6.283); ctx.fillStyle = '#B5474A'; ctx.fill(); ctx.restore(); }
    zoomCircle(ctx, 760, 330, 175, kx + 8, ky, 'knie', wond, () => knieHuid(ctx, 760, 330, 175, heel));
    tag(ctx, 'schaafwond', 760, 640, C.koraal, wond * clamp(1 - heel * 2, 0, 1)); tag(ctx, 'na twee weken: hersteld', 760, 640, C.groen, clamp(heel * 2 - 1, 0, 1));
    const hz = q.on('hartinfarct', 1), lw = q.on('littekenweefsel', 1, 1.2);
    hartMetInfarct(ctx, 1460, 430, 0.62, t, { a: hz, dood: q.on('sterft', 1, 1.0), litteken: lw });
    tag(ctx, 'hartinfarct: hartspier sterft af', 1460, 800, C.koraal, hz * clamp(1 - lw * 2, 0, 1)); tag(ctx, 'littekenweefsel: groeit niet terug', 1460, 800, C.text2, clamp(lw * 2 - 1, 0, 1));
    vraagteken(ctx, 1080, 300, q.on('Waarom', 1), 130); },

  s04(ctx, t, q) { bg(ctx, 'micro'); const B = q.on('Nu', 1, 0.8), K = q.on('kopie', 1, 0.8);
    fade(ctx, uitF(B), () => { const f = q.at('deelde', 1) < 99 ? clamp((t - q.at('deelde', 1)) / ((q.at('weer', 1) - q.at('deelde', 1)) + 0.9) * 3, 0, 3) : 0;
      const ea = Math.max(ramp(t, 0, 0.6), q.on('cel', 1)); klieving(ctx, 960, 440, 175, f, { a: ea }); // frisse review 30 okt: eicel al bij t = 0, niet een losse schaalmaat op leeg beeld
      naamBij(ctx, 'bevruchte eicel', null, 960, 205, q.on('bevruchte', 1) * (1 - q.on('deelde', 1)), 'center'); naamBij(ctx, 'mitose: steeds meer cellen', null, 960, 205, q.on('deelde', 1), 'center');
      ctx.save(); ctx.globalAlpha *= ea; metaText(ctx, '± 0,1 mm', 960, 700, C.grain, 'center', 28); ctx.restore(); });
    fade(ctx, inF(B) * uitF(K), () => { gedifferentieerdeCellen(ctx, 960, 430, 1.6, { d: ramp(t, q.at('Nu', 1) + 0.5, 3), genen: 0, t });
      tag(ctx, '± 30 biljoen cellen, meer dan 200 soorten', 960, 820, C.goud, q.on('dertig', 1)); });
    fade(ctx, inF(K), () => { const nm = ['zenuwcel', 'spiercel', 'alvleesklier', 'lichaamscellen'];
      celRij(ctx, t, { X: X5, types: ['zenuw', 'spier', 'alv', 'huid', 'bloed'], u: 58, len: 280,
        a: i => i === 4 ? q.on('rode', 1) : Math.max(0.35, q.on(nm[i], 1)), chromA: i => i === 4 ? q.on('kern', 1) : ease(clamp((t - q.at('kopie', 1) - i * 0.3) / 0.7, 0, 1)) });
      naamBij(ctx, 'een kopie van hetzelfde DNA', null, 960, 150, 1, 'center', C.text);
      haak(ctx, X5[0] - 140, X5[3] + 140, 640, 'dezelfde chromosomen, dezelfde genen', C.groen, q.on('dezelfde', 1));
      if (q.on('kern', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('kern', 1); metaText(ctx, 'geen kern, dus geen DNA', X5[4], 700, C.grain, 'center', 28); ctx.restore(); } }); },

  s05(ctx, t, q) { bg(ctx, 'micro'); const g = q.on('genen', 1), ins = q.on('insuline', 1), hu = q.on('huidcellen', 1), dif = q.on('gedifferentieerd', 1), df = q.on('differentiatie', 1);
    const focus = ins * (1 - dif);
    celRij(ctx, t, { X: X4, types: ['zenuw', 'spier', 'alv', 'huid'], u: 66, len: 320, a: i => (i < 2 ? 1 - 0.65 * focus : 1),
      aan: i => ease(clamp((t - q.at('genen', 1) - i * 0.25) / 0.6, 0, 1)), ring: i => i === 3 ? 'insuline' : null, ringA: i => i === 3 ? hu * (1 - dif) : 0,
      namen: i => (i === 2 && ins > 0.01) || (i === 3 && hu > 0.01) ? 'insuline' : 0 });
    if (ins > 0.01) { ctx.save(); ctx.globalAlpha *= ins * (1 - dif); ctx.beginPath(); ctx.arc(X4[2], 320, 92, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); }
    tag(ctx, 'insuline-gen: aan', X4[2], 770, C.groen, ins * (1 - dif)); tag(ctx, 'insuline-gen: uit, wel aanwezig', X4[3], 770, C.koraal, hu * (1 - dif));
    tag(ctx, 'gedifferentieerd: eigen bouw, eigen taak', 960, 790, C.goud, dif * (1 - df)); tag(ctx, 'differentiatie: andere genen gaan aan', 960, 790, C.goud, df); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const N = persoon(ctx, 'noor', 300, 870, 620, { t, uit: 'neutraal' });
    const za = q.on('zenuwcel', 1), sa = q.on('spiercel', 1), d = q.on('DNA', 1);
    zoomMicro(ctx, 770, 270, 150, N.hoofd.x + N.hoofd.r * 0.9, N.hoofd.y - N.hoofd.r * 0.2, null, za, () => { zenuwcel(ctx, 730, 280, { s: 0.75, naar: [860, 300], seed: 3, takken: 5, t }); });
    zoomMicro(ctx, 770, 650, 150, N.heup.x + 40, N.heup.y + 70, null, sa, () => { spierVezel(ctx, 650, 650, 240, 56, { seed: 5, streep: 8 }); });
    naamBij(ctx, 'zenuwcel uit je hersenen', null, 1360, 210, za, 'center'); naamBij(ctx, 'spiercel uit je been', null, 1360, 590, sa, 'center');
    genChrom(ctx, 1360, 290, 380, { a: d }); genChrom(ctx, 1360, 670, 380, { a: d });
    vraagteken(ctx, 1360, 515, q.on('verschil', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'micro'); const B = q.on('gedifferentieerde', 1, 0.8);
    tag(ctx, 'antwoord b: hetzelfde DNA, andere genen aan', 960, 130, C.goud, q.on('Antwoord', 1) * (1 - B));
    fade(ctx, uitF(B), () => { const v = q.on('verschil', 1), sp = q.on('spiercel', 1);
      celRij(ctx, t, { X: [520, 1400], types: ['zenuw', 'spier'], y: 320, u: 62, ly: 480, cy: 600, len: 420, aan: () => v, ring: i => i === 1 ? 'zenuw' : null, ringA: i => i === 1 ? sp : 0, namen: () => ['zenuw', 'spier'] });
      tag(ctx, 'zenuwgen: zit erin, maar staat uit', 1400, 760, C.koraal, q.on('alleen', 1)); });
    fade(ctx, inF(B), () => { cel(ctx, 'zenuw', 520, 380, 70, t); naamBij(ctx, 'zenuwcel: deelt niet', null, 520, 560, q.on('zenuwcel', 2), 'center', C.text); kruis(ctx, 700, 260, 24, q.on('deelt', 1));
      hartspiercel(ctx, 1240, 380, 340, 72, { c: beat(t), a: q.on('hartspiercel', 1), vertak: 1 }); naamBij(ctx, 'hartspiercel: deelt bijna niet', null, 1410, 560, q.on('hartspiercel', 1), 'center', C.text);
      tag(ctx, 'stabiel lichaam', 700, 760, C.groen, q.on('stabiel', 1)); tag(ctx, 'slecht nieuws na een infarct', 1260, 760, C.koraal, q.on('infarct', 1)); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('Vlak', 1, 0.8), U = q.on('Daarnaast', 1, 0.8), D = q.on('markeringen', 2, 1.0);
    fade(ctx, uitF(A), () => { genChrom(ctx, 960, 450, 760, { aan: 'insuline', aanA: q.on('gen', 1), namen: 'insuline', w: 60 }); naamBij(ctx, 'wat zet een gen aan?', null, 960, 300, q.on('gen', 1), 'center'); });
    fade(ctx, inF(A) * uitF(U), () => { const x = 760, y = 540, s = 1.35, tf = q.on('transcriptiefactoren', 1, 1.2), pol = q.on('polymerase', 1, 1.4), ov = q.on('overschrijven', 1);
      const r = transcriptiefactor(ctx, x, y, s, { dna: true, gebonden: tf, polymerase: pol, t, a: 1 });
      naamBij(ctx, 'promotor', null, x - 60 * s, y + 120, q.on('promotor', 1), 'center', C.goud);
      ctx.save(); ctx.globalAlpha *= q.on('gen', 2); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 140 * s, y + 70 * s); ctx.lineTo(x + 300 * s, y + 70 * s); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'gen', null, x + 220 * s, y + 140, q.on('gen', 2), 'center', C.groen);
      naamBij(ctx, 'transcriptiefactoren', null, x - 40 * s, y - 340, q.on('transcriptiefactoren', 1), 'center');
      naamBij(ctx, 'RNA-polymerase', null, x + 185 * s, y - 175, pol, 'left');
      if (ov > 0.01) mrnaSliert(ctx, x + 185 * s + 30, y - 100, 60 + 340 * ramp(t, q.at('overschrijven', 1), 2.5), { a: ov, rot: -0.35, seed: 2, t });
      tag(ctx, 'gen aan: er wordt RNA gemaakt', 1500, 330, C.groen, ov);
      tag(ctx, 'elke celsoort: eigen combinatie van transcriptiefactoren', 960, 840, C.text2, q.on('combinatie', 1)); });
    fade(ctx, inF(U), () => { const m = q.on('methylgroep', 1, 1.2), str = q.on('strak', 1, 1.5), tfB = ramp(t, q.at('wordt', 1), 2.2), dl = ramp(t, q.at('blijven', 1), 2.5);
      const mx = lerp(620, 960, D), my = lerp(470, 440, D);
      const r = methylgroep(ctx, mx, my, 0.85, { m, tf: D > 0.5 ? 0 : tfB, deling: dl * D, t, tfUit: true }); // 2.1: transcriptiefactor vervaagt tijdens het wegdrijven (open punt frisse review)
      if (r.sites && r.sites.length) naamBij(ctx, 'methylgroep op de promotor', null, mx, 690, m * (1 - D), 'center', '#8CCB5E'); // frisse review 30 okt: onder de DNA, niet over de transcriptiefactor die wegdrijft
      fade(ctx, 1 - D, () => { nucleosoomDraad(ctx, 1180, 470, 1820, 470, { n: 4, R: 52, compact: str, t }); naamBij(ctx, 'histonen', null, 1500, 330, q.on('histonen', 1), 'center');
        tag(ctx, 'strak gewonden', 1500, 640, C.text2, str); });
      tag(ctx, 'gen uit: niet overgeschreven', 620, 790, C.koraal, q.on('overgeschreven', 1) * (1 - D));
      if (D > 0.01 && r.dochters) { const h = q.on('huidcel', 1); r.dochters.forEach(([dx, dy]) => cel(ctx, 'huid', 380, dy, 44, t, h * D)); naamBij(ctx, 'huidcel', null, 380, 860 - 40, h * D, 'center'); }
      tag(ctx, 'markeringen blijven na de deling: epigenetica', 960, 850, C.goud, q.on('epigenetica', 1)); }); },

  s10(ctx, t, q) { bg(ctx, 'micro'); const X0 = 120, Y0 = 120, Wd = 860, Hd = 700;
    const info = huidDoorsnede(ctx, X0, Y0, Wd, Hd, { um: 200, deling: ramp(t, q.at('deling', 1), 1.6), hl: q.on('kiemlaag', 1) * (1 - q.on('omhoog', 1)) > 0.5 ? 'basaal' : null, t, a: Math.max(ramp(t, 0, 0.6), q.on('Onderin', 1)) }); // frisse review 30 okt: beeld al gevuld bij t = 0
    naamBij(ctx, 'opperhuid', null, X0 + Wd / 2, Y0 - 20, q.on('opperhuid', 1), 'center');
    if (info.yBasaal) naamBij(ctx, 'kiemlaag', 'stamcellen', X0 + Wd + 16, info.yBasaal(X0 + Wd) - 20, q.on('kiemlaag', 1), 'left', C.goud);
    // één cel volgen (gouden rand): van de kiemlaag omhoog, verhoornt, schilfert af
    const u = clamp((t - q.at('omhoog', 1) + 0.6) / (q.at('schilfert', 1) - q.at('omhoog', 1) + 0.8), 0, 1), fl = ramp(t, q.at('schilfert', 1) + 0.3, 1.6);
    if (u > 0.001 && info.deel && info.s) { const s = info.s, x0 = info.deel[0], y0 = info.deel[1] - 14 * s, yT = Y0 + 10 * s; const x = x0 - u * 30 + fl * 40, y = lerp(y0, yT, ease(u)) - fl * 70;
      const w = lerp(11, 30, u) * s, h = lerp(10, 2.6, u) * s, col = mix('#3A3348', '#D9C9A0', clamp((u - 0.3) / 0.45, 0, 1));
      ctx.save(); ctx.globalAlpha *= (1 - fl); ctx.translate(x, y); ctx.rotate(fl * 0.4); roundRect(ctx, -w / 2, -h / 2, w, h, Math.min(h / 2, 4 * s)); shape(ctx, col, C.goud, 5);
      if (u < 0.65) { ctx.globalAlpha *= 1 - u / 0.65; ctx.beginPath(); ctx.ellipse(0, 0, Math.min(w, h) * 0.35, Math.min(w, h) * 0.3, 0, 0, 6.283); ctx.fillStyle = _GD.kern; ctx.fill(); } ctx.restore(); }
    naamBij(ctx, 'verhoornt', null, X0 + Wd + 16, Y0 + 180, q.on('verhoornt', 1), 'left', C.text); naamBij(ctx, 'dood, schilfert af', null, X0 + Wd + 16, Y0 + 30, q.on('schilfert', 1), 'left', C.text);
    // rechts: de deling van een stamcel (asymmetrisch)
    fade(ctx, q.on('stamcel', 2) * (1 - q.on('verhoornt', 1)), () => { const f = ramp(t, q.at('deling', 1), 1.4), sx = 1520, sy = 640;
      if (f < 0.02) stam(ctx, sx, sy, 50, 1, 1); else { const d = ease(f) * 120; stam(ctx, sx - d, sy, 46, 1, q.on('stamcel', 3)); const up = q.on('andere', 1, 1.2); stam(ctx, sx + d, sy - up * 220, 46, 1 - up); cel(ctx, 'huid', sx + d, sy - up * 220, 42, t, up); }
      naamBij(ctx, 'stamcel', 'nog niet gespecialiseerd', sx, sy + 110, 1 - q.on('meestal', 1), 'center', C.text);
      naamBij(ctx, 'blijft stamcel', null, sx - 120, sy + 110, q.on('stamcel', 3), 'center', C.goud);
      if (q.on('andere', 1) > 0.01) { pijl(ctx, sx + 120, sy - 60, sx + 120, sy - 160, C.line, q.on('andere', 1)); naamBij(ctx, 'schuift omhoog', null, sx + 140, sy - 260, q.on('andere', 1), 'center'); } });
    tag(ctx, 'voorraad stamcellen blijft op peil', 1460, 800, C.goud, q.on('voorraad', 1) * (1 - q.on('weken', 1))); tag(ctx, 'in ± 4 weken een nieuwe opperhuid', 1460, 800, C.groen, q.on('weken', 1)); },

  s11(ctx, t, q) { bg(ctx, 'micro'); const M = q.on('Misschien', 1, 0.8);
    tag(ctx, 'antwoord a: in je huid zitten cellen die zich blijven delen', 960, 110, C.goud, q.on('Antwoord', 1) * (1 - M));
    fade(ctx, uitF(M), () => { huidDoorsnede(ctx, 110, 190, 720, 520, { um: 170, hl: q.on('huid', 1) > 0.5 ? 'basaal' : null, deling: (t * 0.25) % 1, t });
      naamBij(ctx, 'huid: stamcellen in de kiemlaag', null, 470, 770, q.on('huid', 1), 'center', C.groen);
      hartspierWeefsel(ctx, 1060, 230, 720, 440, { a: q.on('hartspier', 1), n: 4, m: 3, fase: i => beat(t, 0) });
      kruis(ctx, 1810, 200, 24, q.on('gevonden', 1)); naamBij(ctx, 'hartspier: geen stamcellen gevonden', null, 1420, 750, q.on('gevonden', 1), 'center', C.koraal);
      tag(ctx, 'hartspiercellen: hooguit 1 % per jaar vernieuwd', 1420, 840, C.text2, q.on('procent', 1)); });
    fade(ctx, inF(M), () => { const k = 3; // 3 px per µm
      hartspiercel(ctx, 240, 450, 100 * k, 18 * k, { c: beat(t), vertak: 0 }); naamBij(ctx, 'hartspiercel', '50–100 micrometer lang', 390, 360, 1, 'center');
      tag(ctx, '"te groot om te delen"?', 390, 600, C.text2, q.on('groot', 1) * (1 - q.on('eicel', 1)));
      const f = ramp(t, q.at('deelt', 1), 1.6); klieving(ctx, 1300, 450, 55 * k, f, { a: q.on('eicel', 1) }); naamBij(ctx, 'bevruchte eicel', '± 0,1 mm', 1300, 230, q.on('eicel', 1), 'center');
      naamBij(ctx, 'en die deelt wél', null, 1300, 700, q.on('deelt', 1), 'center', C.groen);
      schaalStreep(ctx, 160, 760, 50 * k, '50 µm', 1);
      tag(ctx, 'het gaat om specialisatie, niet om grootte', 960, 840, C.goud, q.on('specialisatie', 1)); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('volwassen', 1, 0.8), dm = q.on('darm', 1);
    fade(ctx, uitF(V), () => { const bx = 230, by = 480, bs = 16; botDoorsnede(ctx, bx, by, bs, { a: q.on('Stamcellen', 1, 0.4) }); naamBij(ctx, 'bot', null, bx + 70, by + 120, q.on('Stamcellen', 1, 0.4), 'left', C.text2);
      zoomMicro(ctx, 720, 390, 230, bx, by - 15 * bs, 'rood beenmerg', q.on('beenmerg', 1), () => { stamcelDeling(ctx, 565, 300, 38, { f: ramp(t, q.at('dochtercellen', 1), 3.5), soort: 'volwassen', t });
        const w = q.on('witte', 1); ctx.save(); ctx.globalAlpha *= w; witteBloedcellen(ctx, 640, 520, 46, { soort: 'neutrofiel', t }); witteBloedcellen(ctx, 740, 525, 46, { soort: 'bcel', t }); ctx.restore();
        ctx.save(); ctx.globalAlpha *= q.on('bloedplaatjes', 1); bloedplaatje(ctx, 820, 510, 9, 0.3); bloedplaatje(ctx, 845, 535, 8, 1.2); bloedplaatje(ctx, 810, 545, 8, 2); ctx.restore(); });
      naamBij(ctx, 'stamcel', null, 470, 250, q.on('stamcellen', 2), 'center', C.text);
      tag(ctx, '± 2 miljoen rode bloedcellen per seconde', 720, 720, BIO.bloedL, q.on('miljoen', 1)); tag(ctx, 'plus witte bloedcellen en bloedplaatjes', 720, 800, C.text2, q.on('witte', 1));
      fade(ctx, dm, () => { darmvlok(ctx, 1500, 790, 540, 230, 1, { t }); stam(ctx, 1385, 768, 16, 1); stam(ctx, 1615, 768, 16, 1);
        for (let i = 0; i < 2; i++) { const u = ((t - q.at('darm', 1)) * 0.11 + i * 0.5) % 1; const side = i ? 1 : -1; ctx.save(); ctx.globalAlpha *= Math.sin(u * Math.PI); ctx.beginPath(); ctx.ellipse(1500 + side * (105 - 30 * u), 760 - u * 470, 10, 14, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
        naamBij(ctx, 'darmwand: binnenste laag', null, 1500, 215, 1 - q.on('drie', 1) * 0, 'center'); naamBij(ctx, 'stamcellen', null, 1500, 860 - 20, q.on('stamcellen', 3), 'center', C.goud);
        tag(ctx, 'elke 3 tot 5 dagen nieuw', 1500, 140, C.goud, q.on('drie', 1)); }); });
    fade(ctx, inF(V), () => { tag(ctx, 'volwassen stamcel: alleen celsoorten van het eigen weefsel', 960, 140, C.goud, 1); const b = q.on('bloedstamcel', 1);
      stam(ctx, 640, 470, 64, 1); naamBij(ctx, 'bloedstamcel', null, 640, 600, b, 'center');
      pijl(ctx, 720, 430, 1000, 320, C.groen, b); rodeBloedcel(ctx, 1080, 320, 30, 0, 0, b); witteBloedcellen(ctx, 1170, 320, 70, { soort: 'neutrofiel', a: b, t }); bloedplaatje(ctx, 1240, 330, 10, 0.5); vink(ctx, 1320, 310, 20, q.on('bloedcellen', 3));
      pijl(ctx, 720, 510, 1000, 620, C.koraal, q.on('huid', 1)); cel(ctx, 'huid', 1100, 630, 48, t, q.on('huid', 1)); kruis(ctx, 1230, 630, 20, q.on('huid', 1)); }); },

  s13(ctx, t, q) { bg(ctx, 'micro'); const kw = q.on('kweken', 1, 1.0), cs = q.on('celsoort', 1) * (1 - kw), x = 640, y = 460, R = 200, icm = -Math.PI * 0.3;
    blastocyste(ctx, x, y, R, { a: q.on('embryo', 1, 0.8), icm, hlI: q.on('klompje', 1) });
    naamBij(ctx, 'embryo van 5 dagen: holle bol', null, x, y + R + 70, q.on('holle', 1), 'center'); 
    const ix = x + Math.cos(icm) * R * 0.55, iy = y + Math.sin(icm) * R * 0.55;
    naamBij(ctx, 'binnenste celmassa', null, x + 40, y - R - 40, q.on('klompje', 1), 'center', C.goud);
    fade(ctx, cs * uitF(kw), () => { const D = [['zenuw', 1350, 230], ['spier', 1500, 410], ['alv', 1400, 590], ['hart', 1560, 760]]; D.forEach(([tp, dx, dy], i) => { const g = ease(clamp((t - q.at('celsoort', 1) - i * 0.2) / 0.6, 0, 1)); boogPijl(ctx, ix + 60, iy, dx - 120, dy, 0.08, C.line, g, 2.5); cel(ctx, tp, dx, dy, 40, t, g); });
      naamBij(ctx, 'elke celsoort', null, 1700, 140, 1, 'center', C.text); });
    fade(ctx, inF(kw), () => { const ps = petrischaal(ctx, 1460, 520, 3.6, { gazon: false, schijf: false, groei: ramp(t, q.at('kweken', 1), 1.8), t }); boogPijl(ctx, ix + 60, iy, 1300, 420, -0.12, C.line, 1, 2.5); naamBij(ctx, 'kweek in het lab', null, 1460, 750, 1, 'center'); });
    tag(ctx, 'embryonale stamcellen', 1460, 840, C.goud, q.on('embryonale', 2)); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Daarna', 1, 0.8), P = q.on('donor', 2, 0.8), D = q.on('Daarna', 2, 0.8);
    fade(ctx, uitF(B), () => { const bx = 240, by = 480, bs = 16; botDoorsnede(ctx, bx, by, bs, {});
      zoomMicro(ctx, 820, 430, 290, bx, by - 15 * bs, 'beenmerg', 1, () => beenmergVeld(ctx, 820, 430, 290, t, { leuk: ramp(t, q.at('afwijkende', 1), 4.5), leeg: 0.8 * ramp(t, q.at('vernietigen', 1), 2.2) }));
      tag(ctx, 'leukemie: afwijkende bloedcellen', 1480, 330, C.koraal, q.on('afwijkende', 1)); tag(ctx, 'delen ongeremd, verdringen gezonde cellen', 1480, 420, C.text2, q.on('ongeremd', 1));
      tag(ctx, 'chemo (soms bestraling)', 1480, 560, C.teal, q.on('chemo', 1)); });
    fade(ctx, inF(B) * uitF(P), () => { const E = persoon(ctx, 'erik', 420, 860, 560, { pose: 'zit', stoel: true, t, uit: 'neutraal' }); const h = (E.handR && E.handL) ? (E.handR.x > E.handL.x ? E.handR : E.handL) : { x: 480, y: 640 };
      infuus(ctx, 700, 860, 520, [h.x + 6, h.y - 10], { a: q.on('infuus', 1), t, stroom: q.on('bloedstamcellen', 1) }); naamBij(ctx, 'stamcellen van een donor', null, 690, 330, q.on('bloedstamcellen', 1), 'right', C.teal);
      zoomMicro(ctx, 1380, 470, 260, E.heup.x + 50, E.heup.y - 10, 'beenmerg', q.on('zoeken', 1), () => beenmergVeld(ctx, 1380, 470, 260, t, { leeg: 1, donor: ramp(t, q.at('zoeken', 1), 2.2), nieuw: ramp(t, q.at('gezond', 2), 2) }));
      tag(ctx, 'zoeken zelf het beenmerg op', 1380, 830, C.teal, q.on('zoeken', 1) * (1 - q.on('gezond', 2))); tag(ctx, 'en maken daar gezond bloed', 1380, 830, C.groen, q.on('gezond', 2)); });
    fade(ctx, inF(P) * uitF(D), () => { const he = q.on('herkenningseiwitten', 1), an = q.on('Anders', 1);
      tag(ctx, 'de donor moet passen: bijna dezelfde herkenningseiwitten', 960, 140, C.goud, q.on('passen', 1));
      hlaCel(ctx, 520, 440, 110, 0, { t, a: 1 }); naamBij(ctx, 'cel van de donor', null, 520, 650, 1, 'center');
      hlaCel(ctx, 960, 440, 110, 0, { t, a: he }); naamBij(ctx, 'cel van de patiënt', null, 960, 650, he, 'center'); vink(ctx, 740, 440, 26, he);
      fade(ctx, an, () => { hlaCel(ctx, 1450, 440, 110, 1, { kleur: C.koraal, t }); const wx = lerp(1880, 1660, ramp(t, q.at('afweersysteem', 1), 1.5)); witteBloedcellen(ctx, wx, 470, 150, { soort: 'neutrofiel', t }); kruis(ctx, 1450, 270, 24, q.on('ruimt', 1));
        naamBij(ctx, 'past niet: afstoting', null, 1450, 650, 1, 'center', C.koraal); });
      tag(ctx, 'of de donorcellen keren zich tegen de patiënt', 960, 800, C.koraal, q.on('keren', 1)); });
    fade(ctx, inF(D), () => { const E = persoon(ctx, 'erik', 380, 870, 640, { t, uit: 'blij' });
      const srcB = [E.heup.x - 20, E.heup.y - 200], srcH = E.handR ? [E.handR.x, E.handR.y - 40] : [460, 640], srcG = [E.heup.x, E.heup.y + 30];
      const rows = [[200, 'bloed', 'DNA en bloedgroep van de donor', C.teal, q.on('Daarna', 2, 1.2), srcB], [470, 'huid', 'eigen DNA', C.oker, q.on('huid', 1), srcH], [740, 'geslachtscellen', 'eigen DNA', C.oker, q.on('geslachtscellen', 1), srcG]];
      rows.forEach(([yy, nm, dna, col, a, src], i) => { zoomMicro(ctx, 900, yy, 110, src[0], src[1], null, a, () => { if (i === 0) { for (let k = 0; k < 4; k++) { const px = 860 + (k % 2) * 80, py = yy - 30 + Math.floor(k / 2) * 60; rodeBloedcel(ctx, px, py, 24, k, 0); ctx.beginPath(); ctx.arc(px, py, 29, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.stroke(); } }
          else if (i === 1) cel(ctx, 'huid', 900, yy, 46, t); else zaadcelEcht(ctx, 860, yy, 0, t, 2.2); });
        naamBij(ctx, nm, null, 1050, yy - 10, a, 'left'); tag(ctx, dna, 1050, yy + 60, col, a * (i === 0 ? q.on('DNA', 1) : 1), 'left'); });
      metaText(ctx, 'gekleurde rand = cel van de donor', 1050, 860, C.grain, 'left', 28); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const a = Math.max(ramp(t, 0, 0.6), q.on('bloedstamcellen', 1)), h = q.on('hart', 1); // frisse review 30 okt: bloedstamcel al bij t = 0
    stam(ctx, 480, 450, 100, a); naamBij(ctx, 'bloedstamcel', null, 480, 700, a, 'center');
    pijl(ctx, 700, 450, 1080, 450, C.line, h); hartMetInfarct(ctx, 1400, 430, 0.62, t, { a: h, dood: 1, litteken: 1 }); naamBij(ctx, 'beschadigd hart', null, 1400, 790, h, 'center');
    vraagteken(ctx, 890, 380, q.on('herstellen', 1), 120); },

  s17(ctx, t, q) { bg(ctx, 'micro'); const M = q.on('Misschien', 1, 0.8), H = q.on('huidcel', 1, 0.8);
    tag(ctx, 'antwoord c: ze kunnen alleen bloedcellen maken', 960, 120, C.goud, q.on('Antwoord', 1) * (1 - M));
    fade(ctx, uitF(H), () => { const b = q.on('bloedcellen', 1), hs = q.on('hartspier', 1);
      stam(ctx, 420, 430, 72, 1); naamBij(ctx, 'bloedstamcel', null, 420, 560, 1, 'center');
      fade(ctx, 1 - M, () => { pijl(ctx, 510, 390, 760, 270, C.groen, b); rodeBloedcel(ctx, 820, 260, 28, 0, 0, b); witteBloedcellen(ctx, 905, 260, 70, { soort: 'neutrofiel', a: b, t }); if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; bloedplaatje(ctx, 970, 270, 10, 0.4); ctx.restore(); } vink(ctx, 1040, 250, 20, b);
        pijl(ctx, 510, 470, 760, 600, C.koraal, q.on('geprobeerd', 1)); hartspiercel(ctx, 780, 620, 220, 46, { a: q.on('geprobeerd', 1), vertak: 0 }); kruis(ctx, 1040, 620, 20, hs);
        tag(ctx, 'geprobeerd: geen nieuwe hartspier', 840, 760, C.koraal, hs); });
      genChrom(ctx, 1500, 430, 460, { a: q.on('genen', 1), aan: 'hemo', aanA: q.on('genen', 1), ring: 'spier', ringA: q.on('vast', 1), namen: ['spier', 'hemo'], w: 40 });
      naamBij(ctx, 'alle genen zitten erin', null, 1500, 330, q.on('genen', 1) * (1 - q.on('keuzes', 1)), 'center'); naamBij(ctx, 'maar de keuzes liggen vast', null, 1500, 330, q.on('keuzes', 1), 'center', C.koraal);
      tag(ctx, 'in het lab: bijna', 1500, 640, C.goud, q.on('lab', 1)); });
    fade(ctx, inF(H), () => { const tz = q.on('terugzetten', 1, 1.2), ip = q.on('stamcel', 2, 1.0);
      cel(ctx, 'huid', 330, 360, 58, t); naamBij(ctx, 'gewone huidcel', null, 330, 480, 1, 'center'); genChrom(ctx, 330, 590, 300, { aan: 'keratine', aanA: 1 - tz * 0.0 });
      pijl(ctx, 500, 360, 760, 360, C.goud, tz, 4); naamBij(ctx, 'terugzetten', null, 630, 320, tz, 'center', C.goud);
      stam(ctx, 920, 360, 70, ip, q.on('geïnduceerde', 1)); naamBij(ctx, 'geïnduceerde stamcel', null, 920, 480, q.on('geïnduceerde', 1), 'center', C.goud); genChrom(ctx, 920, 590, 300, { a: ip, aan: null });
      const D = [['zenuw', 1380, 240], ['alv', 1420, 420], ['hart', 1440, 600]], hc = q.on('hartspiercellen', 1);
      D.forEach(([tp, dx, dy], i) => { const g = ease(clamp((t - q.at('celsoort', 1) - i * 0.2) / 0.6, 0, 1)); const dim = tp === 'hart' ? 1 : 1 - 0.65 * hc; boogPijl(ctx, 1010, 360, dx - 130, dy, 0.06, C.line, g * dim, 2.5); cel(ctx, tp, dx, dy, 40, t, g * dim); });
      naamBij(ctx, 'hartspiercellen', null, 1520, 700, hc, 'center', C.goud); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('veel', 1, 0.8), sync = ramp(t, q.at('tegelijk', 1) - 0.4, 1.2), sig = q.on('signaal', 1);
    const m = microscoop(ctx, 270, 840, 1.25, { licht: true }); metaText(ctx, 'microscoop', 270, 880, C.grain, 'center', 28);
    zoomMicro(ctx, 1160, 420, 340, m.objectief[0], m.objectief[1] + 20, null, 1, () => {
      fade(ctx, 1 - V, () => { hartspiercel(ctx, 1000, 420, 320, 64, { c: beat(t, 0.2, 0.8), vertak: 1 }); });
      fade(ctx, V, () => { const ph = i => hash(i * 7.7) * 2, rate = i => 0.7 + 0.6 * hash(i * 3.3);
        const golf = sig * (1 - sync) > 0.01 ? ((t - q.at('signaal', 1)) * 0.6) % 1 : -1;
        hartspierWeefsel(ctx, 860, 210, 600, 420, { n: 5, m: 3, fase: i => sync > 0.99 ? beat(t, 0, 1.1) : lerp(beat(t, ph(i), rate(i)), beat(t, 0, 1.1), sync), golf, golfA: sig * (1 - sync) }); }); });
    const T = [['losse', 'één losse cel: klopt al, in zijn eigen tempo', C.text2], ['signaal', 'ze geven een signaal aan elkaar door', C.goud], ['tegelijk', 'samen in één ritme', C.groen], ['weefsel', 'weefsel: groep gelijke cellen met dezelfde taak', C.teal], ['emergente', 'emergente eigenschap: het geheel kan wat één cel niet kan', C.goud]];
    T.forEach(([w, s, col], i) => { const nx = T[i + 1] ? q.on(T[i + 1][0], 1, 0.5) : 0; tag(ctx, s, 1160, 840, col, inF(q.on(w, 1, 0.5) * 0.5 + 0.5) * q.on(w, 1, 0.5) * uitF(nx)); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const ips = q.on('Geïnduceerde', 1);
    naamBij(ctx, 'embryonale stamcellen', null, 480, 120, 1, 'center', C.goud); blastocyste(ctx, 480, 330, 145, { a: 1 - 0.55 * q.on('verloren', 1), icm: -Math.PI * 0.3, hlI: 1 }); kruis(ctx, 650, 190, 22, q.on('verloren', 1));
    tag(ctx, 'het embryo gaat verloren', 480, 600, C.koraal, q.on('verloren', 1)); tag(ctx, 'restembryo’s van ivf, met toestemming', 480, 690, C.text2, q.on('ivf', 1)); tag(ctx, 'strenge regels (Embryowet)', 480, 780, C.text2, q.on('streng', 1));
    ctx.save(); ctx.globalAlpha *= ips * 0.6; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(960, 120); ctx.lineTo(960, 820); ctx.stroke(); ctx.restore();
    fade(ctx, ips, () => { naamBij(ctx, 'geïnduceerde stamcellen', null, 1440, 120, 1, 'center', C.goud); cel(ctx, 'huid', 1230, 300, 52, t); pijl(ctx, 1340, 300, 1500, 300, C.goud, 1, 3.5); stam(ctx, 1610, 300, 66, 1);
      const tu = q.on('tumoren', 1); if (tu > 0.01) tumorGroei(ctx, 1440, 470, 0.5, { a: tu, g: ramp(t, q.at('tumoren', 1), 3), t });
      tag(ctx, 'eigen cellen: in principe geen afstoting', 1440, 600, C.groen, q.on('afgestoten', 1)); tag(ctx, 'risico: tumoren', 1440, 690, C.koraal, tu); tag(ctx, 'nu: vooral in het lab, een paar proeven', 1440, 780, C.text2, q.on('proeven', 1)); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const Y = q.on('2006', 1, 0.8);
    fade(ctx, uitF(Y), () => { const rows = [['totipotent', 'hele lichaam + placenta'], ['pluripotent', 'elke celsoort, geen placenta'], ['multipotent', 'een paar celsoorten van het eigen weefsel'], ['unipotent', 'maar één celsoort']];
      const cur = ['totipotent', 'pluripotent', 'multipotent', 'unipotent'].reduce((k, w, i) => q.on(w, 1) > 0.5 ? i : k, -1);
      rows.forEach(([nm, uitleg], i) => { const y = 200 + i * 165, a = Math.max(0.25, q.on(nm, 1)), wb = 1250 - i * 210; ctx.save(); ctx.globalAlpha *= a;
        roundRect(ctx, 420, y - 62, wb, 124, 22); shape(ctx, rgba(C.fill, 0.7), i === cur ? C.goud : rgba(C.line, 0.6), i === cur ? 2.5 : 1.5);
        text(ctx, nm, 456, y - 8, fTekst(40, 700), i === cur ? C.goud : C.text, 'left'); text(ctx, uitleg, 456, y + 40, fTekst(34, 400), C.text2, 'left');
        if (i === 0) klieving(ctx, 260, y, 52, 1); else if (i === 1) blastocyste(ctx, 260, y, 58, { icm: -Math.PI * 0.3, hlI: q.on('celmassa', 1) }); else if (i === 2) { stam(ctx, 225, y, 30); rodeBloedcel(ctx, 295, y - 26, 16, 0, 0); witteBloedcellen(ctx, 300, y + 26, 40, { soort: 'neutrofiel', t }); } else { stam(ctx, 225, y, 30); cel(ctx, 'huid', 305, y, 26, t); }
        ctx.restore(); });
      naamBij(ctx, 'binnenste celmassa', 'embryonale stamcellen', 1480, 200 + 165 - 4, q.on('celmassa', 1) * (1 - q.on('multipotent', 1)), 'left', C.goud);
      naamBij(ctx, 'stamcel in de kiemlaag', null, 456 + 620, 200 + 3 * 165 + 44, q.on('kiemlaag', 1), 'left', C.goud); });
    fade(ctx, inF(Y), () => { const mens = q.on('menselijke', 1), ip = q.on('iPS', 1), f = q.on('vier', 1, 1.2), in_ = ramp(t, q.at('vier', 1) + 1.0, 1.4);
      naamBij(ctx, Yamanaka2012(q) ? 'Nobelprijs 2012' : (mens > 0.5 ? '2007 · ook bij de mens' : '2006 · Yamanaka'), null, 960, 130, 1, 'center', C.goud);
      cel(ctx, 'huid', 380, 400, 62, t); naamBij(ctx, mens > 0.5 ? 'huidcel van een mens' : 'cel van een muis', null, 380, 530, q.on('muis', 1), 'center'); genChrom(ctx, 380, 640, 300, { aan: 'keratine', aanA: 1 - ease(in_) });
      const cols = [C.koraal, C.teal, C.groen, C.oker]; for (let i = 0; i < 4; i++) { const sx = 640 + i * 70, sy = 400 + Math.sin(t * 1.5 + i) * 10 * (1 - in_), ex = 360 + (i - 1.5) * 26, ey = 400; enzymKluwen(ctx, lerp(sx, ex, ease(in_)), lerp(sy, ey, ease(in_)), 28 * (1 - 0.4 * in_), { a: f * (1 - ramp(t, q.at('later', 1), 0.8)), col: cols[i], seed: i + 2 }); }
      naamBij(ctx, '4 transcriptiefactoren', null, 745, 330, f * (1 - in_), 'center');
      pijl(ctx, 540, 400, 1060, 400, C.goud, in_, 4); stam(ctx, 1200, 400, 80, in_); naamBij(ctx, 'iPS-cel', 'geïnduceerde pluripotente stamcel', 1200, 535, ip, 'center', C.goud); genChrom(ctx, 1200, 660, 300, { a: in_, aan: null });
      tag(ctx, 'Yamanaka en John Gurdon', 1500, 820, C.goud, q.on('2012', 1)); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('DNA', 1, 0.8), K = q.on('kiemlaag', 1, 0.8);
    fade(ctx, uitF(A), () => { zoomMicro(ctx, 560, 420, 210, 560, 420, null, 1, () => knieHuid(ctx, 560, 420, 210, 1)); naamBij(ctx, 'huid herstelt', null, 560, 690, 1, 'center', C.groen);
      hartMetInfarct(ctx, 1400, 420, 0.62, t, { dood: 1, litteken: 1 }); naamBij(ctx, 'hartspier bijna niet', null, 1400, 780, 1, 'center', C.koraal); vraagteken(ctx, 980, 330, 1, 120); });
    fade(ctx, inF(A) * uitF(K), () => { celRij(ctx, t, { X: X4, types: ['zenuw', 'spier', 'alv', 'huid'], u: 66, len: 320, aan: i => ease(clamp((t - q.at('differentiatie', 1) - i * 0.2) / 0.6, 0, 1)) });
      tag(ctx, 'zelfde DNA, andere genen aan: differentiatie', 960, 140, C.goud, q.on('differentiatie', 1)); tag(ctx, 'gespecialiseerde cellen delen vaak niet meer', 960, 790, C.text2, q.on('Gespecialiseerde', 1)); });
    fade(ctx, inF(K), () => { huidDoorsnede(ctx, 110, 200, 720, 520, { um: 170, hl: 'basaal', deling: (t * 0.25) % 1, t }); naamBij(ctx, 'kiemlaag: stamcellen die blijven delen', null, 470, 780, 1, 'center', C.groen);
      hartspierWeefsel(ctx, 1060, 240, 720, 440, { n: 4, m: 3, fase: () => beat(t) }); kruis(ctx, 1810, 210, 24, q.on('gevonden', 1)); naamBij(ctx, 'hartspier: geen stamcellen gevonden', null, 1420, 760, q.on('gevonden', 1), 'center', C.koraal);
      tag(ctx, 'antwoord a: in je huid zitten cellen die zich blijven delen', 960, 130, C.goud, q.on('antwoord', 1)); }); },
};
function Yamanaka2012(q) { return q.on('2012', 1) > 0.5; }

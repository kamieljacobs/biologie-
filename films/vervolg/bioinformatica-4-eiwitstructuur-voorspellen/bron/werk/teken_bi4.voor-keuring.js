// Wat word jij? · Bio-informatica · film 4 Van letters naar vorm — eigen tekeningen (fase A, 25 okt 2026)
// Hart van de film: EIWITMODEL dat vouwt (eiwit3D). Recept (bronnen: leerboekgeometrie van de eiwitketen, RCSB PDB-101
// 'Guide to understanding PDB data'; Nobelcomité Scheikunde 2024, Scientific background; Jumper e.a. 2021):
//  - één kraal per aminozuur (het Cα-atoom), afstand tussen buren 3,8 Å, kraal r = 1,75 Å (kralen raken net niet);
//  - α-helix: 3,6 aminozuren per winding (100° per kraal), stijging 1,5 Å per kraal, straal 2,3 Å → burenafstand 3,8 Å;
//  - β-streng: 3,3 Å per kraal, licht zigzag (± 0,8 Å); strengen naast elkaar op 4,8 Å (antiparallel, haarspelden);
//  - ongevouwen: een losse kluwen (random coil), ± 2× zo groot als het gevouwen eiwit (geen meterslange rechte draad);
//  - vouwen = morph in twee fasen: eerst lokale structuur (helices draaien op), dan de hele keten tot een compacte vorm;
//  - holte (actieve plek) = de kralen eromheen, gouden rand; geen bol, geen massief blok.
// Het model is verzonnen (een ββ β-blad met twee helices en een losse lus), geen echte PDB-structuur: in beeld 'model'.
// Bekende fouten: eiwit als bol; vouwen als wissel; helix links- in plaats van rechtsdraaiend; kralen die door elkaar schuiven.
// Kleuren: aminozuren oker (AAT uit de DNA-reeks, dnalib.js); betrouwbaarheid per stuk zoals de AlphaFold-databank
// (donkerblauw zeer zeker → lichtblauw → geel → oranje zeer onzeker; EMBL-EBI pLDDT, UCSF ChimeraX alphafold-colors), gedempt.

const AAT4 = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F'];
const KL_PL = ['#3F6FC0', '#7FB6E0', '#E6C64A', '#EE8A3C']; // pLDDT > 90, 70–90, 50–70, < 50
const KL_MEET = '#E8ECF0';   // gemeten structuur (uit de envelop): wit-grijs
const KL_MED = C.teal;       // medicijn: product in teal (Part C)
const KL_PAPIER = '#F2EEE4', KL_PAPIER_R = '#B8B0A0';
const FLOOR = 860;

function bi4Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function bi4Rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const uit = (t, t0, d = 0.5) => 1 - ease((t - t0) / d);
function microVlak(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // Micro-achtergrond zonder korrel (BEELDAFSPRAKEN)

// ======================================================================================
// EIWITMODEL — geometrie (eenmalig berekend)
// ======================================================================================
const V3 = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  len: a => Math.hypot(a[0], a[1], a[2]), norm: a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], lerp: (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u] };
function _cr3(p0, p1, p2, p3, t) { const t2 = t * t, t3 = t2 * t; return [0, 1, 2].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)); }
// gladde lus door controlepunten, gelijk verdeeld op ± 3,8 Å; geeft alleen de tussenliggende kralen (zonder begin en eind)
function _lus3(pts) { const dense = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p3 = pts[Math.min(pts.length - 1, i + 2)]; for (let k = 0; k < 40; k++) dense.push(_cr3(p0, pts[i], pts[i + 1], p3, k / 40)); } dense.push(pts[pts.length - 1]);
  const L = [0]; for (let i = 1; i < dense.length; i++) L.push(L[i - 1] + V3.len(V3.sub(dense[i], dense[i - 1]))); const tot = L[L.length - 1]; const n = Math.max(1, Math.round(tot / 3.8)); const out = [];
  for (let j = 1; j < n; j++) { const d = tot * j / n; let i = 1; while (i < L.length - 1 && L[i] < d) i++; const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); out.push(V3.lerp(dense[i - 1], dense[i], f)); } return out; }
function _helix3(A, ax, n, ph0) { let u = V3.cross(ax, [0, 0, 1]); if (V3.len(u) < 0.1) u = V3.cross(ax, [1, 0, 0]); u = V3.norm(u); const v = V3.cross(ax, u); const out = [];
  for (let i = 0; i < n; i++) { const c = V3.add(A, V3.mul(ax, 1.5 * i)), an = ph0 + i * 100 * Math.PI / 180; out.push(V3.add(c, V3.add(V3.mul(u, 2.3 * Math.cos(an)), V3.mul(v, 2.3 * Math.sin(an))))); } return { pts: out, u, v }; }
function _streng3(x, yA, dir, n, z0 = 0) { const out = []; for (let i = 0; i < n; i++) out.push([x, yA + dir * 3.3 * i, z0 + (i % 2 ? 0.8 : -0.8)]); return out; }

const EIWIT = (() => {
  const P = [], T = [], H = []; // posities, soort ('t' staart, 'h' helix, 's' streng, 'l' lus, 'c' C-lus), helixinfo
  const add = (pts, tp) => pts.forEach(p => { P.push(p); T.push(tp); });
  const hA = _helix3([-3.2, 10.5, -10], [0, -1, 0], 14, 0.4);
  const s1 = _streng3(-4.8, -9.9, 1, 7), s2 = _streng3(0, 9.9, -1, 7), s3 = _streng3(4.8, -9.9, 1, 7);
  const hB = _helix3([8.8, -8.2, 7.2], [0, 1, 0], 12, 2.2);
  const nStart = [-8, 19.5, -3];
  add([nStart], 't'); add(_lus3([nStart, [-6.5, 16.5, -6], hA.pts[0]]), 't');
  const iHA = P.length; add(hA.pts, 'h'); H.push({ i0: iHA, n: 14, A: [-3.2, 10.5, -10], ax: [0, -1, 0], ph0: 0.4, u: hA.u, v: hA.v });
  add(_lus3([hA.pts[13], [-5, -13.5, -7], [-6.5, -13, -2.5], s1[0]]), 'l');
  const iS1 = P.length; add(s1, 's');
  add(_lus3([s1[6], [-2.4, 12.8, 0.6], s2[0]]), 'l');
  const iS2 = P.length; add(s2, 's');
  add(_lus3([s2[6], [2.4, -12.8, 0.6], s3[0]]), 'l');
  const iS3 = P.length; add(s3, 's');
  add(_lus3([s3[6], [8.2, 13.6, 1.2], [13.6, 5, 2.2], [13.2, -6.5, 4.2], hB.pts[0]]), 'l');
  const iHB = P.length; add(hB.pts, 'h'); H.push({ i0: iHB, n: 12, A: [8.8, -8.2, 7.2], ax: [0, 1, 0], ph0: 2.2, u: hB.u, v: hB.v });
  const cEnd = [-8.6, 1.5, 9.5], cEndM = [-9.2, 13.5, -4.5];
  const cCtl = [hB.pts[11], [4.5, 12.5, 10.5], [-0.5, 8.6, 12.4], [-5.2, 5.4, 11.4], cEnd];
  const iC = P.length; const cL = _lus3(cCtl); add(cL, 'c'); add([cEnd], 'c');
  const N = P.length;
  // gemeten structuur (envelop): kern gelijk op ± 0,5 Å, de C-lus ligt anders (naar achteren en boven)
  const rnd = bi4Rng(77); const M = P.map((p, i) => i < iC ? [p[0] + (rnd() - 0.5) * 0.9, p[1] + (rnd() - 0.5) * 0.9, p[2] + (rnd() - 0.5) * 0.9] : null);
  const cM = _lus3([hB.pts[11], [7.5, 16.5, 3.5], [2.5, 19.5, -1.5], [-3.5, 17.5, -3.5], cEndM]); cM.push(cEndM);
  for (let k = 0; k < N - iC; k++) M[iC + k] = cM[Math.min(cM.length - 1, Math.round(k * (cM.length - 1) / Math.max(1, N - iC - 1)))];
  // ongevouwen kluwen: willekeurige wandeling met voorkeur voor rechtdoor, binnen een kader (± 2× het gevouwen eiwit)
  const r = bi4Rng(11); const U = []; let p = [-30, 4, 0], dir = [1, 0.2, 0];
  for (let i = 0; i < N; i++) { U.push(p); let nd = V3.norm(V3.add(V3.mul(dir, 2.2), [r() - 0.5, (r() - 0.5) * 1.6, (r() - 0.5) * 0.7]));
    const q = V3.add(p, V3.mul(nd, 3.8)); if (Math.abs(q[1]) > 15) nd[1] *= -1; if (Math.abs(q[2]) > 6) nd[2] *= -1; if (q[0] > 32 || q[0] < -34) nd[0] *= -1; dir = nd; p = V3.add(p, V3.mul(V3.norm(nd), 3.8)); }
  { const c = U.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / N); for (let i = 0; i < N; i++) U[i] = V3.sub(U[i], c); }
  // tussenstand: helices al opgedraaid op hun plek in de kluwen, de rest nog los (vouwen fase 1)
  const I = U.map(q => q.slice());
  H.forEach(h => { const seg = U.slice(h.i0, h.i0 + h.n); const c = seg.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / h.n); const ax = V3.norm(V3.sub(seg[h.n - 1], seg[0]));
    const st = V3.sub(c, V3.mul(ax, 1.5 * (h.n - 1) / 2)); const hp = _helix3(st, ax, h.n, h.ph0).pts; hp.forEach((q, k) => { I[h.i0 + k] = q; });
    for (let k = 1; k <= 3; k++) { const a1 = h.i0 - k, b1 = h.i0 + h.n - 1 + k, w = (4 - k) / 4; if (a1 >= 0) I[a1] = V3.lerp(U[a1], hp[0], w * 0.6); if (b1 < N) I[b1] = V3.lerp(U[b1], hp[h.n - 1], w * 0.6); } });
  // gesmolten bol (molten globule): al de vorm van het eiwit, maar ruimer en rommelig; tussenstap zodat het vouwen niet door een platte lijn gaat
  const rg = bi4Rng(23); const G = P.map((q, i) => V3.add(V3.mul(q, 1.35), [(rg() - 0.5) * 7, (rg() - 0.5) * 7, (rg() - 0.5) * 7]));
  // betrouwbaarheid per aminozuur (verzonnen voor het model, patroon zoals vaak: kern hoog, uiteinden en losse lus laag)
  const PL = T.map((tp, i) => tp === 'h' || tp === 's' ? 93 : tp === 'l' ? 82 : tp === 't' ? 58 : 38);
  // holte: middelpunt vóór het blad tussen streng 1 en 2; bekleed door de kralen binnen 7,5 Å
  const POCKET = [-2.4, -1.4, 5.4]; const lining = []; for (let i = 0; i < iC; i++) if (V3.len(V3.sub(P[i], POCKET)) < 7.6) lining.push(i);
  const s1i = Array.from({ length: 7 }, (_, k) => iS1 + k), s2i = Array.from({ length: 7 }, (_, k) => iS2 + k), s3i = Array.from({ length: 7 }, (_, k) => iS3 + k);
  // het contactpaar (samen veranderen): s1[3] en s2[3] liggen naast elkaar in het blad (4,8 Å)
  const PAAR = [s1i[3], s2i[3]];
  // gemuteerd aminozuur in de holte: een kraal van streng 1 die naar voren (naar de holte) wijst
  let MUT = s1i[2]; { let best = -1e9; s1i.concat(s2i).forEach(i => { if (P[i][2] > 0 && lining.includes(i) && P[i][1] < best + 99) { const sc = -V3.len(V3.sub(P[i], POCKET)); if (sc > best) { best = sc; MUT = i; } } }); }
  // aminozuurletters (verzonnen volgorde met het patroon van helices en strengen; geen echt eiwit)
  const HEL = 'AEELLKKALELAKKLG', STR = 'KVTVEVY', LUS = 'GDNPSG', STAART = 'MSQ', CL = 'GSNEPKGTDQS';
  const SEQ = T.map((tp, i) => tp === 't' ? STAART[i % 3] : tp === 'h' ? HEL[(i - (i >= iHB ? iHB : iHA)) % HEL.length] : tp === 's' ? STR[(i - (i >= iS3 ? iS3 : i >= iS2 ? iS2 : iS1)) % 7] : tp === 'c' ? CL[(i - iC) % CL.length] : LUS[i % 6]);
  SEQ[PAAR[0]] = 'K'; SEQ[PAAR[1]] = 'E';
  const KIND = SEQ.map(ch => (ch.charCodeAt(0) * 7) % 5);
  return { P, T, H, M, U, I, G, N, PL, POCKET, lining, PAAR, MUT, SEQ, KIND, iC, iHB, s1i, s2i, s3i, hA, hB };
})();

function plKleur(v) { return v > 90 ? KL_PL[0] : v > 70 ? KL_PL[1] : v > 50 ? KL_PL[2] : KL_PL[3]; }
// beweging bij binding (vorm verandert even): helix B + C-lus kantelen rond kraal iHB-3 naar de holte toe
function _dicht(p, i, k) { if (k <= 0 || i < EIWIT.iHB - 3) return p; const piv = EIWIT.P[EIWIT.iHB - 3], an = -0.22 * k; const d = V3.sub(p, piv);
  const c = Math.cos(an), s = Math.sin(an); return V3.add(piv, [d[0] * c - d[2] * s * 0.3 - d[1] * s * 0.25, d[1] * c + d[0] * s * 0.25, d[2] * c + d[0] * s * 0.3]); }
// mutant: de kern blijft, de holte vernauwt (bekleding schuift 1–1,5 Å naar binnen)
function _mutant(p, i) { const E = EIWIT; if (!E.lining.includes(i) || i === E.MUT) return p; const d = V3.sub(E.POCKET, p); return V3.add(p, V3.mul(V3.norm(d), 1.1)); }

// keten bij vouwfractie f: morph van de BINDINGSRICHTINGEN (elke binding blijft 3,8 Å; geen kralen die door een rechte lijn schuiven)
// sleutelstanden: U (losse kluwen) → I (helices opgedraaid) → G (ruime, rommelige vorm) → P (gevouwen)
const _ketCache = {};
function _richt(K) { const out = []; for (let i = 0; i < K.length - 1; i++) out.push(V3.norm(V3.sub(K[i + 1], K[i]))); return out; }
function _slerp(a, b, u) { const d = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1); if (d > 0.9995) return V3.norm(V3.lerp(a, b, u)); const th = Math.acos(d), s0 = Math.sin((1 - u) * th) / Math.sin(th), s1 = Math.sin(u * th) / Math.sin(th); return V3.add(V3.mul(a, s0), V3.mul(b, s1)); }
function _centr(K) { return K.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / K.length); }
function eiwitKeten(f) { const key = Math.round(clamp(f, 0, 1) * 400); if (_ketCache[key]) return _ketCache[key]; const E = EIWIT; f = key / 400;
  if (!E._R) { E._R = [E.U, E.I, E.G, E.P].map(_richt); E._C = [E.U, E.I, E.G, E.P].map(_centr); }
  const st = [0, 0.32, 0.62, 1]; let k = 0; while (k < 2 && f > st[k + 1]) k++; const u = ease(clamp((f - st[k]) / (st[k + 1] - st[k]), 0, 1));
  let out;
  if (f >= 0.999) out = E.P.map(q => q.slice()); else {
    const Ra = E._R[k], Rb = E._R[k + 1]; out = [[0, 0, 0]]; for (let i = 0; i < Ra.length; i++) out.push(V3.add(out[i], V3.mul(_slerp(Ra[i], Rb[i], u), 3.8)));
    // laatste stuk: zacht naar de echte eindvorm trekken, zodat de vorm precies op P eindigt
    const c0 = _centr(out), c1 = V3.lerp(E._C[k], E._C[k + 1], u); out = out.map(q => V3.add(V3.sub(q, c0), c1));
    if (k === 2) { const w = ease(clamp((u - 0.55) / 0.45, 0, 1)); out = out.map((q, i) => V3.lerp(q, E.P[i], w)); } }
  _ketCache[key] = out; return out; }
// positie van kraal i bij vouwfractie f
function eiwitPos(i, f, o = {}) { const E = EIWIT; const fb = ease(clamp((f - 0.62) / 0.38, 0, 1));
  let p = eiwitKeten(f)[i];
  if (o.mutant) p = V3.lerp(p, _mutant(p, i), fb * o.mutant);
  if (o.dicht) p = _dicht(p, i, o.dicht * fb);
  if (o.lusM && i >= E.iC) p = V3.lerp(p, E.M[i], o.lusM);
  return p; }
// projectie: draai om de y-as (yaw), kantel om de x-as (pitch), zwakke perspectief
function proj3(p, cam) { const { x, y, s, yaw = 0, pitch = -0.18 } = cam; const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy; const y2 = p[1] * cp - z1 * sp, z2 = p[1] * sp + z1 * cp; const k = 140 / (140 - z2);
  return [x + x1 * s * k, y - y2 * s * k, z2, k]; }

// HOOFDFUNCTIE: het eiwitmodel tekenen.
// o: fold 0..1 · yaw · t (trilling) · a · kleur 'oker'|'pl' · hl [indices goud omrand] · holte 0..1 · medicijn 0..1 (in de holte) / medicijnPos [x,y,z]
//    lint 0..1 (helices en strengen als vlakken) · mutant 0..1 · meting 0..1 (gemeten structuur erover) · verschil 0..1 (koraal lijntjes C-lus)
//    dicht 0..1 · letters 0..1 · dimKern · labels (geen tekst: namen zet de scène met naamBij)
function eiwit3D(ctx, x, y, s, o = {}) { const E = EIWIT; const { fold = 1, yaw = 0.95, pitch = -0.32, t = 0, a = 1, kleur = 'oker', hl = [], holte = 0, medicijn = 0, lint = 0, mutant = 0, meting = 0, verschil = 0, dicht = 0, letters = 0, plA = 1, ruis = 1, lusM = 0, medVast = 1 } = o;
  if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; const cam = { x, y, s, yaw, pitch };
  const los = 1 - ease(clamp((fold - 0.6) / 0.4, 0, 1)) * 0.75; // ongevouwen trilt meer (warmtebeweging)
  const P3 = []; for (let i = 0; i < E.N; i++) { let p = eiwitPos(i, fold, { mutant, dicht, lusM }); const w = wander(i * 3 + 7, t, 0.32 * ruis * los + (i >= E.iC ? 0.25 * ruis : 0), 0.7); p = [p[0] + w.x, p[1] + w.y, p[2]]; P3.push(p); }
  const S = P3.map(p => proj3(p, cam)); const R = (o.r || 1.4) * s; const items = [];
  const bead = (i, col) => { const q = S[i]; const k = q[3]; const dk = clamp((q[2] + 14) / 28, 0, 1); items.push({ z: q[2] + 0.01, f: () => {
      const rr = R * k, c = col(i); ctx.save(); ctx.globalAlpha *= 0.62 + 0.38 * dk; ctx.beginPath(); ctx.arc(q[0], q[1], rr, 0, 6.283); shape(ctx, c, lighten(c, 0.38), 1.3);
      if (hl.includes(i)) { ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(q[0], q[1], rr + 4, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
      if (letters > 0.01 && rr > 11) { ctx.globalAlpha = a * letters * (0.62 + 0.38 * dk); text(ctx, E.SEQ[i], q[0], q[1] + rr * 0.36, `700 ${Math.round(rr * 1.0)}px ${F.meta}`, C.bgMicro, 'center'); }
      ctx.restore(); } }); };
  const okerK = i => AAT4[E.KIND[i]];
  const plK = i => { const c = plKleur(E.PL[i]); return plA >= 0.99 ? c : _mixHexBi(okerK(i), c, plA); };
  const colF = kleur === 'pl' ? plK : okerK;
  const colM = i => ((mutant > 0.5 || (o.mutKleur || 0) > 0.5) && i === E.MUT) ? C.koraal : colF(i);
  // ketting (ruggengraat) tussen de kralen
  for (let i = 0; i < E.N - 1; i++) { const p = S[i], q = S[i + 1]; const c = kleur === 'pl' ? colF(i) : lighten(V.ew, 0.25); items.push({ z: (p[2] + q[2]) / 2 - 0.5, f: () => { ctx.strokeStyle = c; ctx.lineWidth = 0.7 * s * (p[3] + q[3]) / 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }); }
  // vlakken: strengen als platte pijlen, helices als lint (alleen in de gevouwen vorm)
  const LA = lint * ease(clamp((fold - 0.9) / 0.1, 0, 1)) * (1 - mutant * 0);
  if (LA > 0.01) {
    [E.s1i, E.s2i, E.s3i].forEach(si => { const pts = si.map(i => P3[i]); const a0 = pts[0], a1 = pts[pts.length - 1]; const dir = V3.norm(V3.sub(a1, a0)); const nrm = [1, 0, 0]; const side = V3.norm(V3.cross(dir, V3.cross(nrm, dir)));
      const wdt = 2.0, poly = [V3.add(a0, V3.mul(side, -wdt)), V3.add(V3.sub(a1, V3.mul(dir, 3)), V3.mul(side, -wdt)), V3.add(V3.sub(a1, V3.mul(dir, 3)), V3.mul(side, -wdt * 1.8)), V3.add(a1, V3.mul(dir, 1.2)), V3.add(V3.sub(a1, V3.mul(dir, 3)), V3.mul(side, wdt * 1.8)), V3.add(V3.sub(a1, V3.mul(dir, 3)), V3.mul(side, wdt)), V3.add(a0, V3.mul(side, wdt))].map(p => proj3(p, cam));
      const z = poly.reduce((m, q) => m + q[2], 0) / poly.length; const c = kleur === 'pl' ? colF(si[3]) : '#D9B97A';
      items.push({ z: z - 0.9, f: () => { ctx.save(); ctx.globalAlpha *= LA; ctx.beginPath(); poly.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); shape(ctx, rgba(c, 0.55), rgba(lighten(c, 0.3), 0.95), 2); ctx.restore(); } }); });
    E.H.forEach(h => { for (let u = 0; u < h.n - 1; u += 0.25) { const pa = _hpt(h, u, P3), pb = _hpt(h, u + 0.25, P3); const qa = proj3(pa, cam), qb = proj3(pb, cam); const c = kleur === 'pl' ? colF(h.i0 + Math.round(u)) : '#D9B97A';
        items.push({ z: (qa[2] + qb[2]) / 2 - 0.2, f: () => { ctx.save(); ctx.globalAlpha *= LA * (0.55 + 0.45 * clamp((qa[2] + 14) / 28, 0, 1)); ctx.strokeStyle = rgba(c, 0.85); ctx.lineWidth = 1.9 * s * qa[3]; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(qa[0], qa[1]); ctx.lineTo(qb[0], qb[1]); ctx.stroke(); ctx.restore(); } }); } });
  }
  for (let i = 0; i < E.N; i++) bead(i, colM);
  // zijketen van het gemuteerde aminozuur: steekt de holte in
  if (mutant > 0.01) { const i = E.MUT, p = P3[i]; const d = V3.norm(V3.sub(E.POCKET, p)); const sc = proj3(V3.add(p, V3.mul(d, 3.4 * mutant)), cam); const q = S[i];
    items.push({ z: sc[2] + 0.02, f: () => { ctx.save(); ctx.globalAlpha *= mutant; ctx.strokeStyle = C.koraal; ctx.lineWidth = 0.7 * s; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(sc[0], sc[1]); ctx.stroke(); ctx.beginPath(); ctx.arc(sc[0], sc[1], 2.0 * s * sc[3], 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 1.4); ctx.restore(); } }); }
  // holte: zachte gouden schijf achter de bekleding + gouden rand om de bekledende kralen
  const pc = proj3(dicht > 0 ? V3.add(E.POCKET, [0.6 * dicht, 0, 0]) : E.POCKET, cam);
  if (holte > 0.01) { items.push({ z: pc[2] - 3.5, f: () => { ctx.save(); ctx.globalAlpha *= holte * 0.9; ctx.beginPath(); ctx.ellipse(pc[0], pc[1], 6.2 * s * pc[3] * (1 - 0.18 * mutant), 5 * s * pc[3] * (1 - 0.18 * mutant), 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.16), rgba(C.goud, 0.85), 2.5); ctx.restore(); } });
    E.lining.forEach(i => { const q = S[i]; items.push({ z: q[2] + 0.02, f: () => { ctx.save(); ctx.globalAlpha *= holte; ctx.beginPath(); ctx.arc(q[0], q[1], R * q[3] + 1.5, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2; ctx.stroke(); ctx.restore(); } }); }); }
  // medicijn (klein molecuul: ring met staartje), in de holte of op een eigen plek
  if (medicijn > 0.01) { const mp = o.medicijnPos ? proj3(o.medicijnPos, cam) : [pc[0], pc[1], pc[2] + 1.5, pc[3]]; items.push({ z: mp[2] + (o.medicijnPos ? 0 : 1.2), f: () => (o.substraat ? substraatMol : medicijnMol)(ctx, mp[0], mp[1], s * 0.2 * mp[3], { a: medicijn, rot: 0.3 + (o.medRot || 0) }) }); }
  // contacten: buren in het β-blad (antiparallel: s1[k] ligt naast s2[6-k], s2[k] naast s3[6-k]) als teal stippellijntjes = 'schets van de vorm'
  if ((o.contact || 0) > 0.01) { for (let k = 0; k < 7; k++) for (const [A1, B1] of [[E.s1i, E.s2i], [E.s2i, E.s3i]]) { const p = S[A1[k]], q = S[B1[6 - k]]; items.push({ z: (p[2] + q[2]) / 2 + 0.03, f: () => { ctx.save(); ctx.globalAlpha *= o.contact; ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.restore(); } }); } }
  items.sort((A, B) => A.z - B.z).forEach(it => it.f());
  // gemeten structuur (uit de envelop) eroverheen: wit-grijze dunne lijn met holle kraaltjes
  if (meting > 0.01) { const MS = E.M.map(p => proj3(p, cam)); ctx.save(); ctx.globalAlpha *= meting; ctx.strokeStyle = rgba(KL_MEET, 0.9); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); MS.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
    MS.forEach(q => { circ(ctx, q[0], q[1], R * q[3] * 0.35, KL_MEET); });
    if (verschil > 0.01) { ctx.globalAlpha = a * verschil; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); for (let i = E.iC; i < E.N; i += 2) { const p = S[i], q = MS[i]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } ctx.setLineDash([]); }
    ctx.restore(); }
  ctx.restore();
  // terug: schermposities voor labels
  const box = S.reduce((b, q) => [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[0]), Math.max(b[3], q[1])], [1e9, 1e9, -1e9, -1e9]);
  return { S, pocket: pc, box, lus: S[E.iC + Math.floor((E.N - E.iC) / 2)] };
}
function _hpt(h, u, P3) { const i = Math.floor(u), f = u - i; const a = P3[h.i0 + Math.min(i, h.n - 1)], b = P3[h.i0 + Math.min(i + 1, h.n - 1)];
  // volg de echte helix: interpoleer langs de winding (hoek) in plaats van rechte koorde
  const A0 = V3.add(h.A, V3.mul(h.ax, 1.5 * u)), an = h.ph0 + u * 100 * Math.PI / 180; const ideal = V3.add(A0, V3.add(V3.mul(h.u, 2.3 * Math.cos(an)), V3.mul(h.v, 2.3 * Math.sin(an))));
  const lin = V3.lerp(a, b, f); const ia = EIWIT.P[h.i0 + Math.min(i, h.n - 1)], ib = EIWIT.P[h.i0 + Math.min(i + 1, h.n - 1)]; const off = V3.sub(ideal, V3.lerp(ia, ib, f)); return V3.add(lin, off); }
function _mixHexBi(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k);
  return '#' + ((1 << 24) + (m(16) << 16) + (m(8) << 8) + m(0)).toString(16).slice(1); }
// klein medicijnmolecuul: zeshoekige ring met een staartje (vorm, geen bolletje), teal
function medicijnMol(ctx, x, y, s, o = {}) { const { a = 1, rot = 0, col = KL_MED } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3; const px = Math.cos(an) * 14, py = Math.sin(an) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.55), lighten(col, 0.35), 2.5);
  ctx.strokeStyle = lighten(col, 0.2); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(12, -7); ctx.lineTo(26, -14); ctx.lineTo(36, -6); ctx.stroke(); circ(ctx, 36, -6, 5, col, lighten(col, 0.35), 2);
  ctx.restore(); }

// substraat (klein voedingsmolecuul, oker: vijfring met zijtak) — anders dan het medicijn (teal)
function substraatMol(ctx, x, y, s, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / 5; const px = Math.cos(an) * 14, py = Math.sin(an) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(V.kh, 0.75), lighten(V.kh, 0.3), 2.5);
  ctx.strokeStyle = V.kh; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(13, 4); ctx.lineTo(28, 10); ctx.stroke(); ctx.restore(); }
// legenda betrouwbaarheid per stuk (blauw zeker → oranje onzeker)
function plLegenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 92;
  KL_PL.forEach((c, i) => { roundRect(ctx, x + i * (w + 6), y, w, 26, 6); shape(ctx, c, lighten(c, 0.3), 1); });
  metaText(ctx, 'zeker', x, y + 62, C.text2, 'left', 26); metaText(ctx, 'onzeker', x + 4 * (w + 6) - 6, y + 62, C.text2, 'right', 26); ctx.restore(); }

// ribosoom (zoals de DNA-reeks: twee subeenheden, licht oker-grijs) met een uitkomende keten
function ribosoomBi(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c = '#C9B896', d = lighten(c, 0.35);
  blob(ctx, x, y - w * 0.18, w * 0.55, w * 0.36, 0.04, 3); shape(ctx, rgba(c, 0.9), d, 1.5); blob(ctx, x, y + w * 0.30, w * 0.5, w * 0.2, 0.04, 7); shape(ctx, rgba(c, 0.75), d, 1.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w * 0.9, y + w * 0.14); ctx.bezierCurveTo(x - w * 0.3, y + w * 0.06, x + w * 0.3, y + w * 0.2, x + w * 0.95, y + w * 0.1); ctx.stroke(); // mRNA (paars, dun)
  ctx.restore(); }

// antistof (Y van vier ketens), uit Forensisch 1 (bibliotheek), met een vorm die hij grijpt
function antistofBi(ctx, x, y, s, rot = 0, o = {}) { const { a = 1, col = '#AFC0D0' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 7; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 4, 40); ctx.lineTo(d * 4, 0); ctx.lineTo(d * 24, -26); ctx.stroke(); }
  ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = 5; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 16, -4); ctx.lineTo(d * 34, -26); ctx.stroke(); } ctx.restore(); }

// ======================================================================================
// REEKSOBJECT: scherm met code / sequenties (zoals beschreven in bi1/brief.md; teken_bi1.js bestond nog niet → hier gemaakt)
// ======================================================================================
// venster: afgeronde rechthoek #121A26, rand 1 px #8FA0B5, tabbalk #0D1420 met één tab in Meta
function codeScherm(ctx, x, y, w, h, tab, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#121A26', C.line, 1);
  ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = '#0D1420'; ctx.fillRect(x, y, w, 52); ctx.restore();
  ctx.font = fMeta(24); ctx.letterSpacing = '2px'; const tw = ctx.measureText(tab).width + 40; ctx.letterSpacing = '0px';
  roundRect(ctx, x + 14, y + 8, tw, 44, 8); shape(ctx, '#121A26', null); ctx.fillStyle = '#121A26'; ctx.fillRect(x + 14, y + 36, tw, 16);
  ctx.save(); ctx.font = fMeta(24); ctx.letterSpacing = '2px'; ctx.fillStyle = C.text; ctx.textAlign = 'left'; ctx.fillText(tab, x + 34, y + 39); ctx.restore();
  ctx.restore(); }
// lettertegel voor een aminozuur (oker-tinten zoals de kralen, donkere letter); stijl: rand koraal (verschil), goud (focus), groen (gelijk)
function aaTegel(ctx, x, y, ch, o = {}) { const { a = 1, w = 40, h = 48, rand = null, dim = false, gat = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (dim ? 0.35 : 1);
  if (gat) { roundRect(ctx, x, y, w, h, 7); ctx.setLineDash([4, 4]); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.line; ctx.fillRect(x + w * 0.3, y + h / 2 - 1.5, w * 0.4, 3); ctx.restore(); return; }
  const c = AAT4[(ch.charCodeAt(0) * 7) % 5]; roundRect(ctx, x, y, w, h, 7); shape(ctx, c, rand || lighten(c, 0.35), rand ? 3 : 1);
  text(ctx, ch, x + w / 2, y + h * 0.72, `700 ${Math.round(h * 0.62)}px ${F.meta}`, C.bgMicro, 'center'); ctx.restore(); }
function aaRij(ctx, x, y, seq, o = {}) { const { a = 1, w = 40, gap = 4, upto = seq.length, hlCol = {}, dimAll = false } = o; for (let i = 0; i < Math.min(upto, seq.length); i++) aaTegel(ctx, x + i * (w + gap), y, seq[i], { a, w, h: Math.round(w * 1.2), rand: hlCol[i] || null, dim: dimAll && !hlCol[i] }); }
// knipperende cursor
function cursor(ctx, x, y, h, t, a = 1) { if (a <= 0.01 || Math.sin(t * 6) < 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud; ctx.fillRect(x, y, 4, h); ctx.restore(); }
// voortgangsbalk in een venster
function voortgang(ctx, x, y, w, frac, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 18, 9); shape(ctx, '#22304A', C.line, 1);
  if (frac > 0.01) { roundRect(ctx, x, y, Math.max(18, w * frac), 18, 9); shape(ctx, rgba(C.teal, 0.8), C.teal, 1); } if (lab) metaText(ctx, lab, x, y - 16, C.text2, 'left', 24); ctx.restore(); }

// ======================================================================================
// Lab, papier en voorwerpen (Schema)
// ======================================================================================
// envelop met zegel; open 0..1 = klep omhoog; uit 0..1 = kaartje met de gemeten vorm schuift eruit
function envelopBi(ctx, x, y, s, o = {}) { const { a = 1, open = 0, uit = 0, zegel = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 260, h = 170;
  if (uit > 0.01) { const dy = -120 * ease(uit); roundRect(ctx, -w / 2 + 18, -h / 2 + 10 + dy, w - 36, h - 30, 6); shape(ctx, '#FBF8F1', KL_PAPIER_R, 2);
    ctx.save(); roundRect(ctx, -w / 2 + 18, -h / 2 + 10 + dy, w - 36, h - 30, 6); ctx.clip(); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, [[-70, 10 + dy], [-40, -30 + dy], [-10, 0 + dy], [20, -34 + dy], [50, -6 + dy], [72, -26 + dy]], false); ctx.stroke(); ctx.restore(); }
  roundRect(ctx, -w / 2, -h / 2, w, h, 10); shape(ctx, KL_PAPIER, KL_PAPIER_R, 2.5);
  ctx.strokeStyle = KL_PAPIER_R; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(-w * 0.08, 0); ctx.moveTo(w / 2, h / 2); ctx.lineTo(w * 0.08, 0); ctx.stroke();
  const fy = lerp(h * 0.12, -h * 1.05, ease(open)); // klep: punt zakt naar beneden (dicht) of klapt omhoog (open)
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, fy); ctx.lineTo(w / 2, -h / 2); ctx.closePath(); shape(ctx, open > 0.5 ? '#E6E0D2' : '#EEE8DA', KL_PAPIER_R, 2.5);
  if (zegel > 0.01 && open < 0.4) { ctx.save(); ctx.globalAlpha *= zegel * (1 - open / 0.4); circ(ctx, 0, h * 0.1, 24, '#B8483A', '#8E3328', 2.5); circ(ctx, 0, h * 0.1, 13, null, '#E07A5F', 2); ctx.restore(); }
  ctx.restore(); }
// envelop als vast UI-element rechtsboven ('gemeten · nog geheim')
function envUI(ctx, o = {}) { const { a = 1, open = 0, uit = 0 } = o; if (a <= 0.01) return; envelopBi(ctx, 1770, 112, 0.42, { a, open, uit }); metaA(ctx, open > 0.5 ? 'gemeten · open' : 'gemeten · nog geheim', 1880, 190, a, C.grain, 'right', 22); }
// briefje met ± 30 letters (IBM Plex Mono)
function briefje(ctx, x, y, seq, o = {}) { const { a = 1, upto = 30, w = 520, rot = -0.03 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -70, w, 140, 8); shape(ctx, '#FBF8F1', KL_PAPIER_R, 2); const s15 = seq.slice(0, 15), s2 = seq.slice(15, 30);
  ctx.font = `600 34px ${F.meta}`; ctx.fillStyle = '#1A2740'; ctx.textAlign = 'left'; ctx.letterSpacing = '4px'; const n = Math.min(upto, 30);
  ctx.fillText(s15.slice(0, Math.min(15, n)), -w / 2 + 30, -12); if (n > 15) ctx.fillText(s2.slice(0, n - 15) + (n >= 30 ? '…' : ''), -w / 2 + 30, 38); ctx.letterSpacing = '0px'; ctx.restore(); }
// bureau met beeldscherm (achter het scherm zit het editorvenster)
function bureau(ctx, x, w, a = 1, o = {}) { if (a <= 0.01) return; const { scherm = 1, inhoud = null } = o; ctx.save(); ctx.globalAlpha *= a; const top = FLOOR - 250;
  ctx.fillStyle = '#3A4A68'; ctx.fillRect(x - w / 2 + 30, top + 16, 16, 234); ctx.fillRect(x + w / 2 - 46, top + 16, 16, 234);
  roundRect(ctx, x - w / 2, top, w, 22, 6); shape(ctx, '#4A5B7C', rgba(C.line, 0.5), 1.5);
  if (scherm > 0.01) { ctx.save(); ctx.globalAlpha *= scherm; ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 14, top - 70, 28, 70); roundRect(ctx, x - 80, top - 10, 160, 12, 5); shape(ctx, '#3A4458', null);
    roundRect(ctx, x - 230, top - 330, 460, 270, 14); shape(ctx, '#2A3446', '#5A6478', 2); roundRect(ctx, x - 216, top - 316, 432, 242, 6); shape(ctx, '#121A26', null);
    if (inhoud) { ctx.save(); ctx.beginPath(); ctx.rect(x - 216, top - 316, 432, 242); ctx.clip(); inhoud(x - 216, top - 316, 432, 242); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }
// gang/werkplek-achtergrond (alleen in scènes met mensen op de afdeling)
function afdeling(ctx, a = 1, raam = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324E'; ctx.fillRect(0, 210, W, 640); ctx.fillStyle = '#2C3B57'; ctx.fillRect(0, 850, W, 30); ctx.fillStyle = '#3A4A68'; ctx.fillRect(0, 836, W, 14);
  // raam met lamellen links, deur rechts
  if (raam) { roundRect(ctx, 120, 290, 360, 280, 8); shape(ctx, '#2A3E5E', rgba(C.line, 0.45), 2); ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 2; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(130, 310 + k * 30); ctx.lineTo(470, 310 + k * 30); ctx.stroke(); } }
  roundRect(ctx, 1560, 360, 180, 476, 6); shape(ctx, '#3B4C6C', rgba(C.line, 0.55), 2); circ(ctx, 1580, 600, 8, '#C9CED6'); roundRect(ctx, 1600, 400, 100, 54, 4); shape(ctx, '#2F3F5E', rgba(C.line, 0.4), 1.5);
  metaA(ctx, 'lab', 1650, 436, 0.8, C.text2, 'center', 22); ctx.restore(); }

// kristalplaatje (van boven): 24 putjes; in één putje kristallen
function kristalPlaat(ctx, x, y, s, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -116, 340, 232, 14); shape(ctx, rgba('#AFC0D0', 0.18), '#AFC0D0', 2);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const px = -125 + c * 50, py = -75 + r * 50; ctx.beginPath(); ctx.arc(px, py, 18, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), rgba('#AFC0D0', 0.8), 1.5);
    if (r === 1 && c === 2) { kristalletjes(ctx, px, py, 0.5, 1); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(px, py, 24, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } } }
  ctx.restore(); }
function kristalletjes(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-8, -4, 0.3, 1], [7, 5, -0.5, 0.8], [2, -10, 1.1, 0.6], [-4, 9, 0.8, 0.7]].forEach(([dx, dy, r, k]) => { ctx.save(); ctx.translate(x + dx * s * 2, y + dy * s * 2); ctx.rotate(r); ctx.scale(s * k, s * k);
    ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(9, -4); ctx.lineTo(6, 10); ctx.lineTo(-6, 10); ctx.lineTo(-9, -4); ctx.closePath(); shape(ctx, rgba('#BFE3F2', 0.75), '#E8F6FC', 1.5); ctx.restore(); }); ctx.restore(); }
// rooster van gelijke moleculen in een kristal (inhoud van een zoomcirkel): steeds hetzelfde mini-eiwitje
function kristalRooster(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = 92, dy = 80;
  for (let r = -3; r <= 3; r++) for (let c = -4; c <= 4; c++) { const px = x + c * dx + (r % 2) * 0, py = y + r * dy; if (Math.abs(px - x) > w / 2 + 50 || Math.abs(py - y) > h / 2 + 50) continue; miniEiwit(ctx, px, py, 1, 1); }
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; ctx.setLineDash([4, 6]); for (let r = -3; r <= 3; r++) { ctx.beginPath(); ctx.moveTo(x - w, y + r * dy + 40); ctx.lineTo(x + w, y + r * dy + 40); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// klein gevouwen eiwitje (2D-icoon van hetzelfde model, voor roosters, kaarten en stapels)
function miniEiwit(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { col = V.ew, lijn = null } = o; ctx.save(); ctx.globalAlpha *= a; const pts = [[-26, -20], [-30, 0], [-22, 18], [-6, 22], [-8, 2], [-2, -18], [10, -20], [8, 0], [14, 20], [28, 16], [30, -4], [22, -22]].map(([px, py]) => [x + px * s, y + py * s]);
  ctx.strokeStyle = lijn || lighten(col, 0.25); ctx.lineWidth = 3 * s; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); if (!lijn) pts.forEach((p, i) => circ(ctx, p[0], p[1], 5 * s, AAT4[i % 5], lighten(AAT4[i % 5], 0.3), 1)); ctx.restore(); }
// röntgenopstelling in zijaanzicht: bron → kristal → detector met stippenpatroon
function rontgen(ctx, x, y, o = {}) { const { a = 1, bundel = 0, stip = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 300, y - 46, 150, 92, 12); shape(ctx, '#3A4458', C.line, 1.5); metaText(ctx, 'röntgen', x - 225, y + 86, C.text2, 'center', 22);
  if (bundel > 0.01) { ctx.save(); ctx.globalAlpha *= bundel; ctx.strokeStyle = rgba('#B8A8F0', 0.85); ctx.lineWidth = 6; const e = lerp(x - 150, x, ease(bundel)); ctx.beginPath(); ctx.moveTo(x - 150, y); ctx.lineTo(e, y); ctx.stroke();
    if (bundel > 0.6) { ctx.globalAlpha *= (bundel - 0.6) / 0.4; ctx.lineWidth = 2; ctx.strokeStyle = rgba('#B8A8F0', 0.5); for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 230, y + k * 46); ctx.stroke(); } } ctx.restore(); }
  kristalletjes(ctx, x, y, 0.9, 1);
  roundRect(ctx, x + 230, y - 170, 26, 340, 6); shape(ctx, '#2A3446', C.line, 1.5); metaText(ctx, 'detector', x + 243, y + 210, C.text2, 'center', 22);
  if (stip > 0.01) { roundRect(ctx, x + 300, y - 150, 300, 300, 10); shape(ctx, '#0D1420', C.line, 1); const rnd = bi4Rng(5); for (let k = 0; k < 90; k++) { const an = rnd() * 6.283, rr = 20 + rnd() * 120; if (k / 90 > stip) break; const b = rnd();
      circ(ctx, x + 450 + Math.cos(an) * rr, y + Math.sin(an) * rr, 2 + b * 4, rgba('#E8ECF0', 0.4 + b * 0.6)); } circ(ctx, x + 450, y, 6, '#0D1420', C.line, 1); }
  ctx.restore(); }
// cryo-EM: rooster (van boven) met bevroren losse eiwitten in dun ijs
function cryoRooster(ctx, x, y, r, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#BFE3F2', 0.12), '#BFE3F2', 2);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba('#AFC0D0', 0.35); ctx.lineWidth = 2; for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(x + k * r / 5, y - r); ctx.lineTo(x + k * r / 5, y + r); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - r, y + k * r / 5); ctx.lineTo(x + r, y + k * r / 5); ctx.stroke(); }
  const rnd = bi4Rng(9); for (let k = 0; k < 14; k++) { const px = x + (rnd() - 0.5) * r * 1.5, py = y + (rnd() - 0.5) * r * 1.5; ctx.save(); ctx.translate(px, py); ctx.rotate(rnd() * 6.283); miniEiwit(ctx, 0, 0, 0.42 * r / 150, 1); ctx.restore(); }
  ctx.restore(); ctx.restore(); }
// sneeuwvlok-icoon (bevroren)
function sneeuw(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#BFE3F2'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const an = k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * r, y - Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }
// kalender met maanden die omslaan
function kalenderBi(ctx, x, y, s, frac, a = 1) { if (a <= 0.01) return; const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']; const n = Math.floor(frac * 30); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 170, 12); shape(ctx, KL_PAPIER, KL_PAPIER_R, 2); ctx.fillStyle = '#B8483A'; ctx.fillRect(-90, -80, 180, 44); circ(ctx, -50, -84, 7, '#5A6478'); circ(ctx, 50, -84, 7, '#5A6478');
  text(ctx, M[n % 12], 0, 30, fTekst(54, 800), '#1A2740', 'center'); text(ctx, 'jaar ' + (1 + Math.floor(n / 12)), 0, 72, fTekst(24, 700), '#5A6478', 'center'); ctx.restore(); }
// stapel voorbeeldkaarten (volgorde + gemeten vorm)
function voorbeeldKaart(ctx, x, y, s, seed, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -70, 220, 140, 10); shape(ctx, '#22304A', C.line, 1.5);
  const r = bi4Rng(seed); let sq = ''; for (let k = 0; k < 10; k++) sq += 'ACDEFGHIKLMNPQRSTVWY'[Math.floor(r() * 20)]; ctx.font = `600 20px ${F.meta}`; ctx.fillStyle = C.text2; ctx.textAlign = 'left'; ctx.letterSpacing = '2px'; ctx.fillText(sq, -94, -38); ctx.letterSpacing = '0px';
  ctx.save(); ctx.rotate((r() - 0.5) * 1.2); miniEiwit(ctx, 0, 18, 1.1, 1); ctx.restore(); ctx.restore(); }
// opleidingskaart (uit Forensisch 2)
function opleidingBi(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 24); text(ctx, naam, x + 26, y + 90, fTekst(naam.length > 30 ? 30 : 36, 700), C.text, 'left'); text(ctx, waar, x + 26, y + 130, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }
// werkplek-icoon (lijnicoon in afgeronde rechthoek, Part C mens-en-maatschappij)
function werkIcoon(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 60, 120, 120, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 34, y - 26, 68, 58); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 18); ctx.moveTo(x - 16, y + 2); ctx.lineTo(x + 16, y + 2); ctx.stroke(); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 40, y - 18); ctx.lineTo(x, y - 40); ctx.lineTo(x + 40, y - 18); ctx.closePath(); ctx.stroke(); for (const k of [-24, -8, 8, 24]) { ctx.beginPath(); ctx.moveTo(x + k, y - 12); ctx.lineTo(x + k, y + 28); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 40, y + 34); ctx.lineTo(x + 40, y + 34); ctx.stroke(); }
  if (soort === 'bedrijf') { ctx.beginPath(); ctx.moveTo(x - 38, y + 34); ctx.lineTo(x - 38, y - 6); ctx.lineTo(x - 14, y + 8); ctx.lineTo(x - 14, y - 6); ctx.lineTo(x + 10, y + 8); ctx.lineTo(x + 10, y - 34); ctx.lineTo(x + 30, y - 34); ctx.lineTo(x + 30, y + 34); ctx.closePath(); ctx.stroke(); }
  ctx.restore(); }
// naamkaartje zonder portret (echte personen: alleen naam)
function naamKaartje(ctx, x, y, naam, sub, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 700); const w = Math.max(ctx.measureText(naam).width, 200) + 60;
  roundRect(ctx, x - w / 2, y - 50, w, 100, 14); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, naam, x, y - 4, fTekst(36, 700), C.text, 'center'); metaText(ctx, sub, x, y + 34, C.grain, 'center', 22); ctx.restore(); }
// filmkaartje (verwijzing naar een eerdere film)
function filmKaartje(ctx, x, y, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const w = ctx.measureText(titel).width + 90; roundRect(ctx, x - w / 2, y - 40, w, 70, 12); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
  ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(x - w / 2 + 22, y - 18); ctx.lineTo(x - w / 2 + 42, y - 5); ctx.lineTo(x - w / 2 + 22, y + 8); ctx.closePath(); ctx.fill(); text(ctx, titel, x + 14, y + 6, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
// lus-icoon (gok → vergelijk → bijstellen)
function lusPijl(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; const off = t * 0.9;
  for (let k = 0; k < 3; k++) { const a0 = off + k * 2.094 + 0.35, a1 = a0 + 1.4; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); const hx = x + Math.cos(a1) * r, hy = y + Math.sin(a1) * r, an = a1 + Math.PI / 2;
    ctx.fillStyle = rgba(C.line, 0.8); ctx.beginPath(); ctx.moveTo(hx + Math.cos(an) * 14, hy + Math.sin(an) * 14); ctx.lineTo(hx + Math.cos(an + 2.5) * 10, hy + Math.sin(an + 2.5) * 10); ctx.lineTo(hx + Math.cos(an - 2.5) * 10, hy + Math.sin(an - 2.5) * 10); ctx.closePath(); ctx.fill(); } ctx.restore(); }
// staafdiagram scorebord CASP
function scorebord(ctx, x, y, w, h, o = {}) { const { a = 1, b16 = 0, b18 = 0, b20 = 0, lijn = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  [0, 50, 100].forEach(v => { const yy = y + h - h * v / 100; metaText(ctx, String(v), x - 16, yy + 9, C.text2, 'right', 26); ctx.strokeStyle = rgba('#FFFFFF', 0.04); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); });
  metaText(ctx, 'score', x, y - 22, C.text2, 'left', 26);
  const B = [['2016', 38, b16, '< 40'], ['2018', 60, b18, '± 60'], ['2020', 90, b20, '± 90']]; const bw = w / 5;
  B.forEach(([j, v, k, lab], i) => { const bx = x + bw * (0.7 + i * 1.45), bh = h * v / 100 * ease(k); if (k > 0.01) { roundRect(ctx, bx, y + h - bh, bw, bh, 8); shape(ctx, rgba(i === 0 ? C.line : C.teal, i === 0 ? 0.35 : 0.6), i === 0 ? C.line : C.teal, 2);
      text(ctx, lab, bx + bw / 2, y + h - bh - 18, fTekst(36, 700), C.text, 'center'); } metaA(ctx, j, bx + bw / 2, y + h + 40, k > 0.01 ? 1 : 0.35, C.text2, 'center', 26); });
  if (lijn > 0.01) { const yy = y + h - h * 0.9; ctx.save(); ctx.globalAlpha *= lijn; ctx.strokeStyle = C.groen; ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * lijn, yy); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); }
// waaier van mogelijkheden: elke schakel drie kanten op (boom die uitwaaiert)
function waaier(ctx, x, y, w, h, d, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lv = Math.min(6, Math.floor(d * 6.999)); const part = d * 6.999 - lv;
  let nodes = [[x, y + h / 2]]; for (let L = 1; L <= lv + 1; L++) { const k = L <= lv ? 1 : part; const n = Math.pow(3, L); const nx = x + w * L / 7; const next = [];
    nodes.forEach((p, i) => { for (let c = 0; c < 3; c++) { const j = i * 3 + c; const ny = y + h * (j + 0.5) / n; next.push([nx, ny]); ctx.strokeStyle = rgba(V.ew, 0.25 + 0.5 / L); ctx.lineWidth = Math.max(0.6, 3 - L * 0.4); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(lerp(p[0], nx, k), lerp(p[1], ny, k)); ctx.stroke(); } });
    nodes = next; } ctx.restore(); }

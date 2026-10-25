// DNA kopiëren (DNA 2, lichte remake) — nieuwe tekeningen, kandidaat voor bibliotheek/lib_bio.js. 25 okt 2026, ronde 1.
// Vereist lib.js (C, rgba, lighten, ease, clamp, lerp, roundRect, shape, text, fTekst, metaText), lib_bio.js (_mixHex, _bioCirc,
// bioPad, enzymKluwen, huidDoorsnede, kernChromatine, onderarm), lib_micro_evo.js (dnaDraad), lib_cast.js (CAST, persoon).
//
// RECEPT DNA-REPLICATIE (bronnen: OpenStax-afgeleid 'DNA Replication in Prokaryotes' (Principles of Biology, CC BY); Leman & Noguchi
// 2013 Genes 4:1; Meselson & Stahl 1958 PNAS 44:671; BioNumbers 108756, 111200, 112260; zie bron/remake-2026-10/bronnen.md):
//  - DNA 2 nm breed, 0,34 nm per basenpaar (dx = 0,17 × breedte), rechtsdraaiend, ±10 bp per winding; vóór de vork blijft het DNA een
//    helix die meedraait als de helicase afwikkelt; achter de vork twee enkele strengen waarvan de basen naar elkaar toe wijzen.
//  - Nieuwe nucleotiden komen altijd aan het 3'-uiteinde: de nieuwe streng groeit 5' → 3', antiparallel aan de matrijs.
//  - Leidende streng: één primer bij het startpunt, daarna continu mét de vork mee. Volgende streng: per fragment een RNA-primer
//    (±10 nt, teal) van primase vlak achter de helicase, polymerase bouwt van de vork af tot het vorige fragment, vervangt die
//    primer door DNA, ligase sluit de knip. Okazaki-fragmenten bij eukaryoten 100–200 nt (hier korter getekend: 'niet op schaal').
//  - Helicase (eukaryoot: CMG) is een ring van zes eiwitten om de matrijs van de leidende streng en schuift 3' → 5' over die streng.
//  - Kleurbetekenis in deze film: oude (zware) streng = donker paars C.kern, nieuwe (lichte) streng = licht paars; RNA-primer teal;
//    enzymen grijsblauw #7A8BA8 met actief centrum goud (C9). Basen: de vier paarse reekstinten (A licht … G donker).
//  Bekende fouten: polymerase die 3' → 5' bouwt; Okazaki-fragmenten die naar de vork toe groeien; vork zonder primers;
//  een platte ladder vóór de vork; nucleotiden die al op de matrijs 'vastzitten' voordat het enzym er is.

const D2 = {
  oud: '#6E5A9E', oudR: '#A392D6', nieuw: '#B9ACE6', nieuwR: '#DCD4F5',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  rbase: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE', U: '#121A26' },
};
const D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
const d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];

// ---------- basen: de ringvorm van de DNA-reeks (baseRing uit lib_bio.js, besluit DNA 1 t2, 25 okt 2026) ----------
// RNA-base in dezelfde vorm (U = pyrimidine, zoals T), in de teal RNA-tinten (C1: RNA teal). Kandidaat voor lib_bio.js.
const RNA_BASE = { base: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, letter: { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' } };
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U') { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, 43 * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
// d2Base: base met voet op (x, y), wijst in richting ang; L = halve sport. Schaal zo dat purine + pyrimidine = 2L (één sport).
// Kleine basen (breedte < 9 px) als staafje in dezelfde tint (lessen_dna: ringen bij verkorting niet leesbaar).
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = (pur ? 112 : 72) * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    ctx.beginPath(); ctx.rect(-hw, 0, hw * 2, len); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0; // wijst omhoog: dir −1, dan staat de letter rechtop
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand });
  ctx.restore(); }

// suiker-fosfaatruggengraat langs punten P (array [x,y]); o.kleur, o.bw, o.dots = indices waar een fosfaat staat
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }

// ---------- ENZYMEN ----------
// DNA-polymerase, zijaanzicht langs het DNA (recept: 'rechterhand' met handpalm, vingers en duim rond matrijs en nieuwe streng;
// vingers sluiten om een nucleotide die past; ringvormige klem (sliding clamp) houdt het enzym op het DNA). (x, y) = het actieve
// centrum (3'-uiteinde van de nieuwe streng), g = DNA-breedte in px, dir = +1 bouwt naar rechts / -1 naar links, up = +1 nieuwe streng
// boven de matrijs / -1 eronder. Twee lagen: polymeraseAchter vóór het DNA tekenen, polymeraseVoor erna.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  // lokaal: nieuwe streng op y = +0.5g? -> we werken met de nieuwe streng op y = -0.5g*(-1)... eenvoud: DNA-as op y = 0, nieuwe streng op +0.5g (na scale = boven bij up=1)
  // handpalm (achter het DNA, donker): grote vorm rond het basenpaar in het actieve centrum
  ctx.beginPath(); bioPad(ctx, [[-1.15 * g, -0.2 * g], [-0.95 * g, 0.95 * g], [-0.1 * g, 1.25 * g], [0.85 * g, 1.05 * g], [1.2 * g, 0.2 * g], [0.95 * g, -0.95 * g], [0.0, -1.2 * g], [-0.9 * g, -0.95 * g]], true);
  shape(ctx, D2.enzDD, _mixHex(D2.enzDD, '#FFFFFF', 0.25), 1.5);
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = '#8796B0'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = D2.enz, rand = hl > 0.01 ? _mixHex(D2.enzR, C.goud, hl) : D2.enzR, lw = hl > 0.01 ? 3 : 1.5;
  // duim: grijpt het nieuwe dubbelstrengs stuk achter het actieve centrum (boven de nieuwe streng)
  ctx.beginPath(); bioPad(ctx, [[-1.05 * g, 0.75 * g], [-0.75 * g, 1.22 * g], [-0.2 * g, 1.28 * g], [0.05 * g, 1.0 * g], [-0.35 * g, 0.78 * g], [-0.8 * g, 0.68 * g]], true); shape(ctx, vul, rand, lw);
  // vingers: boven de inkomende nucleotide; draaien omlaag als hij past (sluit 0 → 1)
  ctx.save(); ctx.translate(0.3 * g, 1.0 * g); ctx.rotate(lerp(0.32, -0.08, ease(sluit)));
  ctx.beginPath(); bioPad(ctx, [[0.0, 0.0], [0.2 * g, 0.32 * g], [0.75 * g, 0.3 * g], [1.0 * g, 0.0], [0.85 * g, -0.22 * g], [0.35 * g, -0.12 * g]], true); shape(ctx, vul, rand, lw);
  ctx.strokeStyle = rgba(_mixHex(vul, '#FFFFFF', 0.35), 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0.25 * g, 0.12 * g); ctx.lineTo(0.8 * g, 0.08 * g); ctx.stroke(); ctx.restore();
  // onderkaak onder de matrijs
  ctx.beginPath(); bioPad(ctx, [[-0.9 * g, -0.72 * g], [-0.6 * g, -1.18 * g], [0.3 * g, -1.22 * g], [0.95 * g, -0.95 * g], [1.05 * g, -0.68 * g], [0.2 * g, -0.74 * g]], true); shape(ctx, vul, rand, lw);
  // actief centrum (goud): de holte boven het volgende matrijsbasisje
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, 0.26 * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#A4B2CA'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }

// helicase: ring van zes eiwitten (scheef gezien) om één streng; (x, y) = midden van de ring op die streng; r = straal; fase = draaien
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kralen = []; for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + fase; kralen.push([x + Math.sin(an) * r * 0.42, y + Math.cos(an) * r, Math.sin(an + 1.57) /*diepte*/, an]); }
  kralen.sort((p, q) => p[2] - q[2]);
  kralen.forEach(([kx, ky, z]) => { const voor = z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const vul = voor ? '#8E9CB8' : D2.enzD; ctx.beginPath(); ctx.ellipse(kx, ky, r * 0.4, r * 0.36, 0, 0, 6.283); shape(ctx, vul, hl > 0.01 && voor ? _mixHex(D2.enzR, C.goud, hl) : _mixHex(vul, '#FFFFFF', 0.3), hl > 0.01 && voor ? 3 : 1.5); });
  ctx.restore(); }
// primase en ligase: kleinere enzymen (kluwen met goud actief centrum, lib_bio enzymKluwen)
function primase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#6F86A0', seed: 2 }, o)); }
function ligase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#8392AE', seed: 7 }, o)); }

// vrije DNA-nucleotide: fosfaat + suiker (vijfhoek) + base; vereenvoudigd (in het kernplasma eigenlijk met drie fosfaatgroepen)
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links, base wijst omhoog (-y)
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, D2.oud, rand || D2.oudR, rand ? 3 : 1.5);
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-24 * s, 8 * s); ctx.stroke();
  _bioCirc(ctx, -30 * s, 9 * s, 9 * s, D2.oudR, rand || '#D8CFF2', rand ? 3 : 1.2);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }

// ---------- REPLICATIEVORK ----------
// st = { f: vorkpositie (bp), i0, i1: zichtbaar bereik (bp), X0: x van bp i0, cy, g: breedte (px), dx (px per bp; standaard 0,17 g),
//        Dmax: halve afstand tussen de dochters, Lsplit (bp), Ltw (bp), Lf: lengte Okazaki-fragment (bp), pl: primerlengte (bp),
//        p1: eerste primer van de volgende streng (bp), vlag: snelheid lagging-polymerase t.o.v. de vork, t: tijd (rustige beweging),
//        toon: {helicase, poly, primase, ligase, nieuw}, letters: bool, startLead: bp van de leidende primer }
// Geeft posities terug voor labels.
function vorkModel(st) { const S = Object.assign({ i0: 0, i1: 120, X0: 80, cy: 450, g: 56, Dmax: 210, Lsplit: 14, Ltw: 12, Lf: 30, pl: 4, p1: 12, vlag: 1.35, startLead: 0, lead: 3 }, st);
  S.dx = S.dx || S.g * 0.17; const X = (i) => S.X0 + (i - S.i0) * S.dx;
  const D = (i) => i >= S.f ? S.g / 2 : S.g / 2 + (S.Dmax - S.g / 2) * ease((S.f - i) / S.Lsplit);
  const yT = (i) => S.cy - D(i), yB = (i) => S.cy + D(i);
  // Okazaki-fragmenten
  const frags = []; for (let k = 1; ; k++) { const p = S.p1 + (k - 1) * S.Lf; if (p - S.pl > S.f + 2) break;
    const a = p + 2, e = a + S.pl * 0.5; const primN = clamp((S.f - a) / (S.pl * 0.5), 0, 1) * S.pl; // aantal primerbasen
    const ondergrens = k === 1 ? S.startLead : S.p1 + (k - 2) * S.Lf - S.pl + 1;     // tot waar de polymerase doorbouwt (incl. vervangen primer vorige)
    const q = Math.max(ondergrens, p - S.pl + 1 - Math.max(0, S.f - e) * S.vlag);     // 3'-uiteinde (linkerkant)
    const klaar = q <= ondergrens + 0.01, fKlaar = e + (p - S.pl + 1 - ondergrens) / S.vlag;
    frags.push({ k, p, a, e, primN, q, klaar, fKlaar, ondergrens }); }
  // per bp: wat zit er op de nieuwe onderstreng? 0 = niets, 1 = DNA, 2 = RNA-primer
  const onder = (i) => { for (const F of frags) { const lo = F.p - S.pl + 1; if (i <= F.p && i >= F.p - F.primN + 1 && i >= lo) { // primerdeel van dit fragment
        const vervangen = frags.some(G => G.k === F.k + 1 && G.q <= i); return vervangen ? 1 : 2; }
      if (i < lo && i >= F.q) return 1; } return 0; };
  // ligase-knippen: na het vervangen van een primer wordt de knip bij (p_vorige - pl + 0.5) gedicht
  const knips = frags.filter(F => F.k >= 2).map(F => { const prev = frags[F.k - 2]; const xN = prev.p - S.pl + 0.5; const tKl = F.fKlaar; return { i: xN, s: clamp((S.f - tKl) / 4, 0, 1), k: F.k }; });
  return Object.assign(S, { X, D, yT, yB, frags, onder, knips }); }

function vorkTeken(ctx, st) { const M = vorkModel(st); const { g, dx, cy, f, i0, i1, X, yT, yB } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, nieuw: 1, lead: 1, lag: 1 }, M.toon || {});
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1.6, dx * 0.34), vorm = dx >= 22, letters = !!M.letters && dx >= 30;
  const iA = Math.floor(i0), iB = Math.ceil(i1);
  // --- vóór de vork: helix die meedraait (fase volgt f) ---
  const tw = (i) => ease((i - f) / M.Ltw), fase = (i) => (i / 10) * 6.283 - f * 0.628 + 0.6;
  const Ytop = (i) => i <= f ? yT(i) : cy + lerp(-g / 2, -g / 2 * Math.cos(fase(i)), tw(i)), Ybot = (i) => i <= f ? yB(i) : cy + lerp(g / 2, g / 2 * Math.cos(fase(i) + 2.3), tw(i));
  const Ztop = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i)), tw(i)), Zbot = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i) + 2.3), tw(i));
  const pts = (fy, a, b) => { const P = []; for (let i = a; i <= b + 1e-6; i += 0.25) P.push([X(i), fy(i)]); return P; };
  // achterkant van de helix eerst
  const helixDeel = (fy, fz, kleur, voor) => { let cur = []; const segs = []; for (let i = Math.max(f, iA); i <= iB; i += 0.25) { const z = fz(i) >= 0; if (z === voor) cur.push([X(i), fy(i)]); else { if (cur.length > 1) segs.push(cur); cur = []; } } if (cur.length > 1) segs.push(cur);
    segs.forEach(P => d2Rug(ctx, P, { kleur: voor ? kleur : _mixHex(kleur, '#000000', 0.35), bw })); };
  helixDeel(Ytop, Ztop, D2.oud, false); helixDeel(Ybot, Zbot, D2.oud, false);
  // sporten vóór de vork
  for (let i = Math.max(Math.ceil(f), iA); i <= iB; i++) { const xa = X(i), ya = Ytop(i), yb = Ybot(i), mid = (ya + yb) / 2, b = d2seq(i); const z = (Ztop(i) + Zbot(i)) / 2; const dk = z < 0 ? 0.3 : 0;
    const Lh = Math.abs(yb - ya) / 2 - bw * 0.4; if (Lh < 2) continue; ctx.save(); ctx.globalAlpha *= z < 0 ? 0.8 : 1;
    d2Base(ctx, xa, ya + Math.sign(yb - ya) * bw * 0.4, yb > ya ? Math.PI / 2 : -Math.PI / 2, b, Lh, hw, { vorm: false }); d2Base(ctx, xa, yb - Math.sign(yb - ya) * bw * 0.4, yb > ya ? -Math.PI / 2 : Math.PI / 2, D2.comp[b], Lh, hw, { vorm: false }); ctx.restore(); }
  helixDeel(Ytop, Ztop, D2.oud, true); helixDeel(Ybot, Zbot, D2.oud, true);
  // --- achter de vork: twee matrijzen + nieuwe strengen ---
  const iF = Math.min(f, iB);
  if (iF > iA) {
    // helling per bp (voor schuine basen)
    const ang = (fy, i, sgn) => { const d = (fy(i + 0.3) - fy(i - 0.3)) / (0.6 * dx); return Math.atan2(1, -d) * sgn; };
    // nieuwe strengen: leidende (boven, onder de bovenmatrijs) en volgende (onder)
    const leadEind = Math.min(iF - M.lead, iB), leadStart = Math.max(M.startLead, iA);
    const yTn = (i) => yT(i) + g, yBn = (i) => yB(i) - g;
    // matrijs-basen + nieuwe basen per bp
    for (let i = iA; i <= iF; i++) { const b = d2seq(i), xa = X(i);
      const nT = toon.nieuw && toon.lead && i >= leadStart && i <= leadEind; const nB = toon.nieuw && toon.lag ? M.onder(i) : 0;
      const aT = Math.atan2(yT(i + 0.3) - yT(i - 0.3), 0.6 * dx), aB = Math.atan2(yB(i + 0.3) - yB(i - 0.3), 0.6 * dx);
      const primLead = i < M.startLead + M.pl;
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, letter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, letter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, letter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, letter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - 0.45, R.b + 0.45), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }

// enzymen op de vork (na vorkTeken: polymerase heeft een achterlaag; daarom tekent vorkEnzymen het DNA niet opnieuw maar legt de voorkant erover)
function vorkEnzymen(ctx, M, o = {}) { const { g, f, X, yT, yB, dx } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, lead: 1, lag: 1 }, M.toon || {}); const hl = o.hl || {}; const out = {};
  const gp = g * 0.55; // grootte enzym t.o.v. DNA (vereenvoudigd: in het echt groter)
  // helicase op de bovenste streng (matrijs van de leidende streng), net vóór de vork
  if (toon.helicase) { const hx = X(f + 0.6), hy = yT(f) ; helicaseRing(ctx, hx, hy, g * 0.62, { fase: t * 2.4 + f * 0.5, laag: 'voor', hl: hl.helicase || 0 }); out.helicase = [hx, hy]; }
  // leidende polymerase
  if (toon.poly && toon.lead && M.leadEind > M.startLead) { const i = M.leadEind + 0.5, x = X(i), yc = (yT(i) + M.yTn(i)) / 2; const rot = Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx);
    polymeraseVoor(ctx, x, yc, gp, { dir: 1, up: -1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6), hl: hl.poly || 0 }); out.polyLead = [x, yc]; }
  // volgende streng: polymerase op het actieve fragment (of in de sprong naar de volgende primer)
  if (toon.poly && toon.lag && M.frags.length) { let F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); let x, y, rot = 0;
    if (F) { const i = F.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; rot = Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx); }
    else { const done = [...M.frags].reverse().find(F => F.klaar), nxt = M.frags.find(G => !G.klaar && (!done || G.k > done.k));
      if (done && nxt) { const u = clamp((f - done.fKlaar) / Math.max(0.5, nxt.e - done.fKlaar), 0, 1), i0 = done.q - 0.5, i1 = nxt.p - M.pl + 0.5; const ii = lerp(i0, i1, ease(u));
        x = X(ii); y = (yB(ii) + M.yBn(ii)) / 2 + Math.sin(Math.PI * ease(u)) * g * 1.6; } else if (done) { const i = done.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; } }
    if (x != null) { polymeraseVoor(ctx, x, y, gp, { dir: -1, up: 1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6 + 1), hl: hl.poly || 0 }); out.polyLag = [x, y]; } }
  // primase: bij de nieuwste primer, vlak achter de helicase
  if (toon.primase) { const F = [...M.frags].reverse().find(F => F.primN > 0.01); if (F && (F.primN < M.pl - 0.01 || f - F.e < 1.8)) { const i = F.p - F.primN + 0.5, x = X(i), y = M.yBn(i) + g * 0.55; primase(ctx, x, y, g * 0.42, { an: 0.4, hl: hl.primase || 0 }); out.primase = [x, y]; } }
  // ligase bij een knip die gedicht wordt
  if (toon.ligase) { const K = M.knips.find(K => K.s > 0 && K.s < 1); if (K) { const x = X(K.i), y = M.yBn(K.i) + g * 0.48; ligase(ctx, x, y, g * 0.4, { an: -1.2, sluit: K.s, hl: hl.ligase || 0 });
      if (K.s > 0.6) { ctx.save(); ctx.globalAlpha *= (1 - K.s) * 2.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, M.yBn(K.i), g * 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } out.ligase = [x, y]; } }
  return out; }
// achterlagen van de polymerasen (vóór vorkTeken aanroepen met hetzelfde model; vorkModel is goedkoop)
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + 0.6), yT(f), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx) }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }

// ---------- SCHAAFWOND op een onderarm (zelfde transformatie als onderarm: elleboog (x, y), s px per cm, kijk) ----------
// heel 0 = vers (rauw, rood, puntjes), 0,35 = korst, 0,7 = roze nieuwe huid, 1 = genezen. Recept (wondgenezing: stolsel/korst binnen
// uren, nieuwe opperhuid groeit vanaf de randen onder de korst in ±1 week): vlakke vormen, geen bloed dat druppelt.
function schaafwond(ctx, x, y, s, o = {}) { const { heel = 0, kijk = 1, a = 1, cx = 13, cyy = 0.6, rx = 2.6, ry = 1.25, seed = 3 } = o; if (a <= 0.01 || heel >= 0.999) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s);
  const rand = (k) => { const P = []; for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283; const w = 1 + 0.13 * Math.sin(an * 3 + seed) + 0.08 * Math.sin(an * 7 + seed * 2); P.push([cx + Math.cos(an) * rx * w * k, cyy + Math.sin(an) * ry * w * k]); } return P; };
  const huid = (CAST && CAST.noor && CAST.noor.huid) || '#D9A982';
  const vers = 1 - ease(heel / 0.35), korst = ease(heel / 0.35) * (1 - ease((heel - 0.55) / 0.2)), roze = ease((heel - 0.55) / 0.2) * (1 - ease((heel - 0.8) / 0.2));
  if (vers > 0.01) { ctx.save(); ctx.globalAlpha *= vers; ctx.beginPath(); bioPad(ctx, rand(1.12), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.35); ctx.fill();
    ctx.beginPath(); bioPad(ctx, rand(0.95), true); ctx.fillStyle = '#B84A44'; ctx.fill();
    for (let i = 0; i < 22; i++) { const u = hash(seed + i), v = hash(seed + i * 7); _bioCirc(ctx, cx + (u - 0.5) * rx * 1.6, cyy + (v - 0.5) * ry * 1.4, 0.07 + 0.05 * hash(i), '#7E2A2A'); }
    ctx.strokeStyle = rgba('#F0C8B8', 0.6); ctx.lineWidth = 0.06; for (let i = 0; i < 7; i++) { const yy = cyy - ry * 0.7 + i * ry * 0.23; ctx.beginPath(); ctx.moveTo(cx - rx * 0.7, yy); ctx.lineTo(cx + rx * 0.6, yy + 0.1); ctx.stroke(); } ctx.restore(); }
  if (korst > 0.01) { ctx.save(); ctx.globalAlpha *= korst; ctx.beginPath(); bioPad(ctx, rand(1.08), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.25); ctx.fill();
    const kk = 0.95 - 0.35 * ease((heel - 0.35) / 0.3); ctx.beginPath(); bioPad(ctx, rand(kk), true); ctx.fillStyle = '#6A3428'; ctx.fill(); ctx.strokeStyle = '#4E241C'; ctx.lineWidth = 0.08; ctx.stroke();
    ctx.strokeStyle = rgba('#8E4A38', 0.8); ctx.lineWidth = 0.05; for (let i = 0; i < 9; i++) { const u = hash(seed * 3 + i) - 0.5, v = hash(seed * 5 + i) - 0.5; ctx.beginPath(); ctx.moveTo(cx + u * rx * kk, cyy + v * ry * kk); ctx.lineTo(cx + u * rx * kk + 0.3, cyy + v * ry * kk + 0.12); ctx.stroke(); } ctx.restore(); }
  if (roze > 0.01) { ctx.save(); ctx.globalAlpha *= roze; ctx.beginPath(); bioPad(ctx, rand(1.0), true); ctx.fillStyle = _mixHex(huid, '#E89A9A', 0.4); ctx.fill(); ctx.restore(); }
  ctx.restore(); }

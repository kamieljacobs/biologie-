// Op maat gekopieerd 2.0 (DNA-technieken 1) — eigen tekenhulpen. 31 okt 2026.
// Beeldbank (lib_bio.js): pcrBuisje, thermocycler, micropipet, polymeraseAchter/-Voor, vrijNucleotide, d2Base, d2Rug,
// baseBruggen, dnaLadderHelix, dnaDraad, cdChromosoom, bacterieEcht, eiwitVouw; cast: persoon (lib_cast.js).
// Nieuw in deze film (C9, recept bij elke functie): gelFoto (gel zoals in het practicum), streng/ladderPaar (rechte
// DNA-ladder met puzzelbasen en losse strengen), strengenbord (strengenmodel H3–H6), heteBron, huidschilfer, pipetpunt.
// Getallen komen uit het practicum tools/dna-profielen (kit: lengte = flank + 4 × n; vWA flank 108, chromosoom 12).

const sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const mic = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }; // Micro zonder korrel (Kamiel 15 okt 2026)
const fade = (t, t0, t1, d = 0.5) => ramp(t, t0, d) * (1 - ramp(t, t1, d));
const meta = (ctx, s, x, y, al = 'left', kl = C.text2, a = 1, px = 28) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, kl, al, px); ctx.restore(); };
const nb = (ctx, n, m, x, y, a = 1, al = 'left', kl = C.text) => naamBij(ctx, n, m, x, y, a, al, kl);
function zin(ctx, s, x, y, a = 1, kl = C.text, px = 40, al = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), kl, al); ctx.restore(); }
function pil(ctx, s, x, y, kl, a = 1, px = 32, al = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40, x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x;
  roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(kl, 0.16), kl, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); return w; }
function haakK(ctx, x1, x2, y, kl, a = 1, omlaag = true) { if (a <= 0.01) return; const d = omlaag ? 12 : -12; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1, y + d); ctx.lineTo(x2, y + d); ctx.lineTo(x2, y); ctx.stroke(); ctx.restore(); }
function kruisje(ctx, x, y, s, a = 1, kl = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vinkje(ctx, x, y, s, a = 1, kl = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function vraagT(ctx, x, y, a = 1, px = 110) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function pijlK(ctx, x1, y1, x2, y2, kl = C.line, a = 1, lw = 3, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }
function ring(ctx, x, y, r, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function rng(seed) { let k = 0; return () => hash(seed * 977 + (k++) * 13.37); }
const mooi = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// =====================================================================================
// GELFOTO zoals in het practicum (tools/dna-profielen, stap 7): gel in het UV-kastje, banen naast elkaar met hun label
// erboven, putjes bovenaan, korte stukken onderaan. Recept (OpenStax Biology 2e § 17.1; practicum): afstand lineair met
// −log(lengte), hier dezelfde as als het practicum (330 → 40 bp); marker M50 = 50 … 350 bp, 250 bp dubbel zo fel;
// banden warm wit (gekleurd DNA onder UV) met een zwakke uitstrijk eronder, geen gloed (Part C). Eén band = heel veel
// moleculen van dezelfde lengte. Bekende fouten: grote stukken het verst; banden in een baan zonder DNA (behalve bij
// besmetting); een gel als witte kaart.
// lanes: [{l: 'Sp', b: [{bp, int}], hl, a}] ; o.loop 0..1 (hoe ver de banden al zijn, voor 'even ver' in H6), o.a.
// Geeft { X(i), Y(bp), bw, put } terug. (Kandidaat voor de bibliotheek: gelElektroforese met o.bpBereik.)
// =====================================================================================
const GEL = { bpTop: 330, bpBot: 40, M50: [50, 100, 150, 200, 250, 300, 350].map(bp => ({ bp, int: bp === 250 ? 1 : 0.55 })) };
function gelFoto(ctx, x, y, w, h, lanes, o = {}) {
  const { a = 1, loop = 1, labels = 1, kast = true } = o; const n = lanes.length, padX = 26, pitch = (w - 2 * padX) / n, bw = Math.min(110, pitch * 0.66);
  const put = y + 58, yTop = y + 96, yBot = y + h - 34;
  const X = (i) => x + padX + pitch * (i + 0.5), Y0 = (bp) => yTop + (Math.log(GEL.bpTop) - Math.log(bp)) / (Math.log(GEL.bpTop) - Math.log(GEL.bpBot)) * (yBot - yTop);
  const Y = (bp) => lerp(put + 8, Y0(bp), loop);
  const ret = { X, Y, bw, put };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a;
  if (kast) { roundRect(ctx, x - 26, y - 26, w + 52, h + 52, 18); shape(ctx, '#2B2F38', '#4A505C', 2); }
  ctx.fillStyle = '#14171C'; ctx.fillRect(x, y, w, h);
  lanes.forEach((L, i) => { const la = L.a == null ? 1 : L.a; ctx.fillStyle = '#2E333B'; ctx.fillRect(X(i) - bw / 2, put - 5, bw, 10);
    if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels; metaText(ctx, L.l, X(i), y + 36, L.hl ? C.goud : C.text2, 'center', 26); ctx.restore(); }
    (L.b || []).forEach(B => { const yy = Y(B.bp), k = clamp(B.int == null ? 1 : B.int, 0, 2) * la; if (k <= 0.01) return;
      ctx.fillStyle = `rgba(255,225,190,${0.07 * Math.min(1, k)})`; ctx.fillRect(X(i) - bw / 2 + 3, yy, bw - 6, 16);
      ctx.fillStyle = `rgba(255,238,214,${Math.min(1, 0.25 + 0.55 * k)})`; roundRect(ctx, X(i) - bw / 2 + 2, yy - (B.dik || 4), bw - 4, 2 * (B.dik || 4), 4); ctx.fill(); });
    if (L.hl > 0.01) { ctx.save(); ctx.globalAlpha *= L.hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; roundRect(ctx, X(i) - bw / 2 - 8, put - 18, bw + 16, yBot - put + 34, 10); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); return ret;
}

// =====================================================================================
// RECHTE DNA-STRENG MET PUZZELBASEN (Micro). Recept: zelfde basevorm als de hele DNA-reeks (d2Base / baseRing uit lib_bio.js,
// palet B); ruggengraat = d2Rug (oud grijs, nieuw bijna wit, primer goud). Basen in een paar raken elkaar net: afstand tussen
// de twee ruggengraten = 2 × 0,87 × L + 4 px (lengte van een base = DNA_BASE.len × 2L/184 ≈ 0,87 L). Eén base per dx.
// dir 1 = ruggengraat bovenaan, basen omlaag (5′ links); dir −1 = ruggengraat onderaan, basen omhoog (3′ links).
// o: i0, i1 (bereik), kleur (rug), a, L, hw, aI(i) (alfa per base), rugVan/rugTot (alleen dit stuk ruggengraat), hlI(i) → rand.
// =====================================================================================
const LADL = 42, LADHW = 14;
const ladGap = (L = LADL) => 2 * 0.87 * L + 4;
function streng(ctx, x0, y, dx, seq, dir, o = {}) {
  const { i0 = 0, i1 = seq.length - 1, kleur = D2.oud, a = 1, L = LADL, hw = LADHW, aI = null, hlI = null, rugA = 1 } = o; if (a <= 0.01 || i1 < i0) return;
  ctx.save(); ctx.globalAlpha *= a;
  if (rugA > 0.01) { ctx.save(); ctx.globalAlpha *= rugA; d2Rug(ctx, [[x0 + i0 * dx - dx * 0.45, y], [x0 + i1 * dx + dx * 0.45, y]], { kleur, bw: Math.max(6, L * 0.32) }); ctx.restore(); }
  for (let i = i0; i <= i1; i++) { const b = seq[i]; if (!b || b === ' ') continue; const ai = aI ? aI(i) : 1; if (ai <= 0.01) continue;
    d2Base(ctx, x0 + i * dx, y + (dir > 0 ? 3 : -3), dir > 0 ? Math.PI / 2 : -Math.PI / 2, b, L, hw, { a: ai, rand: hlI ? hlI(i) : null }); }
  ctx.restore();
}
const compl = (s) => s.split('').map(b => D2.comp[b] || ' ').join('');

// vrije nucleotide die op plek (x, y) aankomt: van (x0, y0) met een boogje, f 0..1 (C8: boog, easing)
function nucVlucht(ctx, x0, y0, x, y, b, f, s = 0.9, dir = -1) { const e = ease(f); if (f <= 0) return; const mx = (x0 + x) / 2 + (y0 - y) * 0.25, my = (y0 + y) / 2 - 40;
  const px = (1 - e) * (1 - e) * x0 + 2 * (1 - e) * e * mx + e * e * x, py = (1 - e) * (1 - e) * y0 + 2 * (1 - e) * e * my + e * e * y;
  vrijNucleotide(ctx, px, py, b, lerp(0.8, dir > 0 ? Math.PI : 0, e), s, { a: ramp(f, 0, 0.15) }); }

// =====================================================================================
// STRENGENMODEL (H3–H6), overgenomen uit versie 1.0 (zelfde getallen als het practicum): strengen als stukken op een
// nucleotide-as. Doelstuk 0–172: primer 1 op 0–20 (bindt op 'onderste' strengen, bouwt naar rechts), primer 2 op
// 152–172 (bindt op 'bovenste' strengen, bouwt naar links); STR 56–120 (16 × TCTA). dir +1: 5′ links, 3′ rechts.
// Eén cyclus = perfecte verdubbeling; hoe ver het polymerase komt (900–1500 nt) is vast gezaaid (deterministisch).
// =====================================================================================
const PCR = { P: 20, A: 0, B: 172, STR0: 56, STR1: 120, INF: 1e7 };
const spanS = (s) => [Math.min(s.s5, s.s3), Math.max(s.s5, s.s3)];
function origMol() { return { top: { kind: 'orig', dir: 1, s5: -PCR.INF, s3: PCR.INF }, bot: { kind: 'orig', dir: -1, s5: PCR.INF, s3: -PCR.INF } }; }
function nieuwOp(t, Lext) { const [lo, hi] = spanS(t);
  if (t.dir === -1) { if (lo > PCR.A || hi < PCR.A + PCR.P) return null; const end = Math.min(hi, PCR.A + Lext); return { kind: end === PCR.B ? 'maat' : 'lang', dir: 1, s5: PCR.A, s3: end }; }
  if (lo > PCR.B - PCR.P || hi < PCR.B) return null; const end = Math.max(lo, PCR.B - Lext); return { kind: end === PCR.A ? 'maat' : 'lang', dir: -1, s5: PCR.B, s3: end }; }
function pcrCyclus(mols, c) { const out = []; mols.forEach((m, i) => { const r = rng(c * 31 + i * 7 + 3);
  out.push({ top: m.top, bot: nieuwOp(m.top, 900 + r() * 600), nieuw: 'bot', ouder: i }); out.push({ top: nieuwOp(m.bot, 900 + r() * 600), bot: m.bot, nieuw: 'top', ouder: i }); }); return out; }
const CYC = (() => { const s = [[origMol()]]; for (let c = 1; c <= 3; c++) s.push(pcrCyclus(s[c - 1], c)); return s; })();
// as: doelstuk lineair (kin px per nt), flanken ingekort tot D nt in de ruimte ernaast
function bordMap(x0, x1, kin, D) { const inW = PCR.B * kin, outW = (x1 - x0 - inW) / 2, kout = outW / D, xa = x0 + outW, xb = xa + inW;
  return { x0, x1, xa, xb, kin, X: (nt) => nt < PCR.A ? xa + (nt - PCR.A) * kout : nt > PCR.B ? xb + (nt - PCR.B) * kout : xa + (nt - PCR.A) * kin }; }
const SKLEUR = { orig: D2.oud, lang: D2.nieuw, maat: C.groen };
// één streng: lijn in de kleur van zijn soort, primer goud aan het 5′-uiteinde, rafelig 3′-uiteinde buiten het bord
// o: a, w, groei (huidige 3′-positie), eind (5′/3′ tonen), rand (gouden omlijning: deze molecuul volgen)
function bordStreng(ctx, M, s, y, o = {}) { if (!s) return; const { a = 1, w = 12, eind = 0, rand = 0 } = o; if (a <= 0.01) return;
  let s3 = s.s3; if (o.groei != null) s3 = s.dir > 0 ? Math.min(s.s3, o.groei) : Math.max(s.s3, o.groei);
  if ((s.dir > 0 && s3 <= s.s5) || (s.dir < 0 && s3 >= s.s5)) return;
  const lo = Math.min(s.s5, s3), hi = Math.max(s.s5, s3), xl = Math.max(M.X(lo), M.x0 - 10), xr = Math.min(M.X(hi), M.x1 + 10);
  const kl = SKLEUR[s.kind] || D2.nieuw; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  if (rand > 0.01) { ctx.save(); ctx.globalAlpha *= rand * 0.55; ctx.strokeStyle = C.goud; ctx.lineWidth = w + 10; ctx.beginPath(); ctx.moveTo(xl, y); ctx.lineTo(xr, y); ctx.stroke(); ctx.restore(); }
  ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(xl, y); ctx.lineTo(xr, y); ctx.stroke();
  const rafel = (x, d) => { ctx.fillStyle = kl; for (let k = 0; k < 4; k++) { const xx = x + d * (8 + k * 10); ctx.globalAlpha *= 0.7; ctx.fillRect(xx - 3, y - w / 2, 6, w); } };
  if (s.kind !== 'orig') { // primer = eerste 20 nt vanaf 5′
    const p0 = s.s5, p1 = s.s5 + s.dir * PCR.P; ctx.strokeStyle = C.goud; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(M.X(p0), y); ctx.lineTo(M.X(p1), y); ctx.stroke();
    if (Math.abs(s3) > 1e5 || M.X(s3) > M.x1 || M.X(s3) < M.x0) { ctx.save(); rafel(s.dir > 0 ? xr : xl, s.dir); ctx.restore(); } }
  if (eind > 0.01) { ctx.save(); ctx.globalAlpha *= eind; const x5 = s.dir > 0 ? xl : xr, x3 = s.dir > 0 ? xr : xl, d5 = s.dir > 0 ? -1 : 1;
    text(ctx, "5′", x5 + d5 * 22, y + 10, fMeta(28), C.text2, 'center'); text(ctx, "3′", x3 - d5 * (s.kind === 'orig' || Math.abs(s3) > 1e5 || M.X(s3) > M.x1 || M.X(s3) < M.x0 ? 64 : 22), y + 10, fMeta(28), C.text2, 'center'); ctx.restore(); }
  ctx.restore(); }
// gids: primerplekken (goud gestippeld), STR als rij TCTA-tikjes, 'ingekort' in de flanken
function bordGids(ctx, M, y0, y1, o = {}) { const { a = 1, namen = 1, str = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba('#FFFFFF', 0.025); ctx.fillRect(M.x0, y0, M.xa - M.x0 - 8, y1 - y0); ctx.fillRect(M.xb + 8, y0, M.x1 - M.xb - 8, y1 - y0);
  meta(ctx, 'ingekort', (M.x0 + M.xa) / 2, y1 + 34, 'center', C.text2, 0.8, 24); meta(ctx, 'ingekort', (M.xb + M.x1) / 2, y1 + 34, 'center', C.text2, 0.8, 24);
  ctx.strokeStyle = rgba(C.goud, 0.35); ctx.setLineDash([3, 8]); ctx.lineWidth = 2; for (const nt of [PCR.A, PCR.A + PCR.P, PCR.B - PCR.P, PCR.B]) { const x = M.X(nt); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); } ctx.setLineDash([]);
  if (str > 0.01) { ctx.save(); ctx.globalAlpha *= str; const xs = M.X(PCR.STR0), xe = M.X(PCR.STR1), st = (xe - xs) / 64; for (let k = 0; k < 64; k++) { ctx.fillStyle = DNA_BASE.base['TCTA'[k % 4]]; ctx.fillRect(xs + k * st + 0.5, y0 - 16, Math.max(1, st - 1), 10); } ctx.restore(); }
  if (namen > 0.01) { ctx.save(); ctx.globalAlpha *= namen; text(ctx, 'primer 1', M.X(10), y0 - 26, fTekst(30, 600), C.goud, 'center'); text(ctx, 'primer 2', M.X(162), y0 - 26, fTekst(30, 600), C.goud, 'center'); text(ctx, 'STR', M.X(88), y0 - 26, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }
// klein molecuul (twee strengen) in een raster (H3 s24, H4): eigen map per cel
function bordMol(ctx, M, m, y, o = {}) { const g = o.gap || 22; bordStreng(ctx, M, m.top, y, o); bordStreng(ctx, M, m.bot, y + g, o); }

// =====================================================================================
// INGREDIËNTENRIJ (H1): vijf kaartjes boven in beeld die zich vullen als de stem ze noemt; telkens hetzelfde icoon als
// later in de film (template grijs, primers goud, Taq als kralenkluwen, nucleotiden in palet B, buffer teal met Mg²⁺).
// =====================================================================================
const ING = ['template', 'primers', 'Taq-polymerase', 'nucleotiden', 'buffer'];
function ingIcoon(ctx, k, x, y, t) {
  if (k === 0) { ctx.strokeStyle = D2.oud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 44, y - 9); ctx.lineTo(x + 44, y - 9); ctx.moveTo(x - 44, y + 9); ctx.lineTo(x + 44, y + 9); ctx.stroke();
    for (let i = 0; i < 9; i++) { ctx.fillStyle = DNA_BASE.base['GATCTATCA'[i]]; ctx.fillRect(x - 40 + i * 10, y - 6, 6, 12); } }
  else if (k === 1) { ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 46, y - 10); ctx.lineTo(x - 6, y - 10); ctx.moveTo(x + 6, y + 10); ctx.lineTo(x + 46, y + 10); ctx.stroke(); }
  else if (k === 2) { polymeraseAchter(ctx, x + 4, y, 15, { klem: false }); polymeraseVoor(ctx, x + 4, y, 15, { klem: false, sluit: 0.6 }); }
  else if (k === 3) { vrijNucleotide(ctx, x - 30, y + 4, 'A', -0.2, 0.42, {}); vrijNucleotide(ctx, x + 2, y - 4, 'C', 0.1, 0.42, {}); vrijNucleotide(ctx, x + 34, y + 6, 'G', -0.1, 0.42, {}); }
  else { ctx.beginPath(); ctx.moveTo(x - 6, y - 26); ctx.bezierCurveTo(x - 30, y + 2, x - 22, y + 24, x - 6, y + 24); ctx.bezierCurveTo(x + 10, y + 24, x + 18, y + 2, x - 6, y - 26); shape(ctx, rgba(C.teal, 0.55), C.teal, 1.5);
  }
}
function ingRij(ctx, n, o = {}) { const { a = 1, hl = -1, leeg = -1, t = 0, y = 92 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const w = 330, gap = 16, x0 = W / 2 - (5 * w + 4 * gap) / 2;
  for (let k = 0; k < 5; k++) { const x = x0 + k * (w + gap), vol = typeof n === 'number' ? clamp(n - k, 0, 1) : n[k];
    roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(C.fill, 0.5 + 0.3 * vol), k === hl ? C.goud : rgba(C.line, 0.5), k === hl ? 3 : 1.5);
    if (k === leeg) { ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; roundRect(ctx, x + 6, y + 6, w - 12, 84, 10); ctx.stroke(); ctx.restore(); }
    if (vol > 0.01) { ctx.save(); ctx.globalAlpha *= vol; ingIcoon(ctx, k, x + 66, y + 48, t); text(ctx, ING[k], x + 124, y + 58, fTekst(29, 600), C.text, 'left'); ctx.restore(); } }
  meta(ctx, 'in het buisje', x0, y - 14, 'left', C.text2, 1, 24); ctx.restore(); }

// =====================================================================================
// STAPPENBALK + THERMOMETER (H2): de drie stappen van één cyclus; de actieve stap goud, de thermometer toont het getal
// dat de stem noemt (BEELDAFSPRAKEN 29 okt: een meter toont het genoemde getal op dat moment).
// =====================================================================================
const STAPPEN = [['1', '95 °C', 'denatureren'], ['2', '55–60 °C', 'primers binden'], ['3', '72 °C', 'verlengen']];
function stappenBalk(ctx, actief, o = {}) { const { a = 1, temp = null, y = 96 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const w = 430, gap = 26, x0 = 170;
  STAPPEN.forEach(([n, T, nm], k) => { const x = x0 + k * (w + gap), on = actief === k;
    roundRect(ctx, x, y, w, 84, 14); shape(ctx, rgba(C.fill, on ? 0.85 : 0.4), on ? C.goud : rgba(C.line, 0.45), on ? 3 : 1.5);
    ctx.save(); ctx.globalAlpha *= on ? 1 : 0.55; text(ctx, n, x + 34, y + 56, fTitel(40), on ? C.goud : C.text2, 'center'); text(ctx, nm, x + 70, y + 40, fTekst(32, 700), C.text, 'left'); metaText(ctx, T, x + 70, y + 72, C.grain, 'left', 24); ctx.restore();
    if (k < 2) pijlK(ctx, x + w + 4, y + 42, x + w + gap - 4, y + 42, C.line, 0.7, 2, 10); });
  if (temp != null) thermo(ctx, 1640, y - 4, temp, 1); ctx.restore(); }
function thermo(ctx, x, y, T, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 92, f = clamp((T - 20) / 80, 0, 1);
  roundRect(ctx, x, y, 22, h, 11); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); circ(ctx, x + 11, y + h + 10, 18, C.koraal);
  ctx.fillStyle = C.koraal; ctx.fillRect(x + 6, y + h - h * f, 10, h * f + 4); text(ctx, Math.round(T) + ' °C', x + 44, y + 64, fTekst(40, 700), C.text, 'left'); ctx.restore(); }

// =====================================================================================
// HETE BRON (Macro, voor 'Taq komt uit een bacterie die in hete bronnen leeft'): vlakke poel met oranje/oker randen van
// bacteriematten, stoom als drie zachte lijnen. Recept: Thermus aquaticus werd in 1966–1969 gevonden in hete bronnen
// in Yellowstone (Brock & Freeze 1969); groeit bij ± 50–80 °C, optimum ± 70 °C. Geen tekst in het landschap.
// =====================================================================================
function heteBron(ctx, x, y, w, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#25385A'; ctx.fillRect(x, y + h * 0.42, w, h);
  ctx.fillStyle = C.bgMacroHill; ctx.beginPath(); ctx.moveTo(x, y + h * 0.5); ctx.quadraticCurveTo(x + w * 0.3, y + h * 0.36, x + w * 0.6, y + h * 0.48); ctx.quadraticCurveTo(x + w * 0.85, y + h * 0.4, x + w, y + h * 0.46); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.fill();
  ctx.fillStyle = '#6B5A3E'; ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h * 0.74, w * 0.44, h * 0.2, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#C9803A'; ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h * 0.74, w * 0.38, h * 0.165, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = C.oker; ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h * 0.74, w * 0.31, h * 0.13, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#2E86A8'; ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h * 0.74, w * 0.24, h * 0.095, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = rgba('#E8EEF4', 0.35); ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const bx = x + w * (0.4 + 0.1 * k), ph = t * 0.6 + k * 2; ctx.beginPath(); for (let j = 0; j <= 10; j++) { const yy = y + h * 0.66 - j * h * 0.045, xx = bx + Math.sin(ph + j * 0.7) * 12; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }

// =====================================================================================
// LOSSE HUIDSCHILFER (H5): plat, veelhoekig hoornplaatje (dode cel uit de hoornlaag) — recept: hoornlaagcellen zijn
// platte schubjes van ± 30–40 µm zonder kern (OpenStax A&P § 5.1); een huidschilfer = een plukje ervan. Wat de PCR
// kopieert is DNA uit cellen met kern (zoals haarwortels en vers afgeschilferde levende cellen); hier één plukje met
// een paar cellen waarin nog een kernrest zit. Oker (organisme), dun omrand.
// =====================================================================================
function huidschilfer(ctx, x, y, s, rot, a = 1, seed = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); const r = rng(seed);
  for (let k = 0; k < 4; k++) { const cx = (r() - 0.5) * 40 * s, cy = (r() - 0.5) * 26 * s, R = (22 + r() * 8) * s; ctx.beginPath(); for (let j = 0; j < 6; j++) { const an = j / 6 * 6.283 + r() * 0.4; const rr = R * (0.8 + 0.3 * r()); j ? ctx.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.7) : ctx.moveTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.7); } ctx.closePath();
    shape(ctx, rgba('#E2C6A2', 0.55), '#F0DCC0', 1.5); if (k < 2) circ(ctx, cx + 3 * s, cy, 4.5 * s, rgba(C.kernR, 0.8)); }
  ctx.restore(); }

// =====================================================================================
// PIPETPUNT (H5): losse wegwerppunt (± 5 cm voor 20 µl … 7 cm voor 1000 µl, doorzichtig polypropyleen) in een rek.
// =====================================================================================
function pipetpunt(ctx, x, y, s, a = 1, kl = C.er) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 4 * s, y); ctx.lineTo(x + 4 * s, y); ctx.lineTo(x + 1 * s, y + 46 * s); ctx.lineTo(x - 1 * s, y + 46 * s); ctx.closePath(); shape(ctx, rgba(kl, 0.18), kl, 1.5); ctx.restore(); }

// STR-blokjes: n herhalingen TCTA als een rij gekleurde blokjes (palet B), breedte per herhaling bw
function strBlok(ctx, x, y, n, bw, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const nz = o.zicht == null ? n : o.zicht;
  for (let k = 0; k < n; k++) { const zz = clamp(nz - k, 0, 1); if (zz <= 0.01) continue; ctx.save(); ctx.globalAlpha *= zz; for (let j = 0; j < 4; j++) { ctx.fillStyle = DNA_BASE.base['TCTA'[j]]; ctx.fillRect(x + k * bw + j * (bw - 3) / 4 + 1, y, (bw - 3) / 4 - 1, h); } ctx.restore(); }
  ctx.restore(); }
// PCR-product als schema: primer | flank | STR × n | flank | primer, lengte schaalt mee (px per bp)
function product(ctx, x, y, n, pxbp, o = {}) { const { a = 1, h = 26, kl = C.groen, namen = 0, lab = null } = o; if (a <= 0.01) return 0; const L = (108 + 4 * n) * pxbp; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, L, h, 5); shape(ctx, rgba(kl, 0.35), kl, 1.5);
  ctx.fillStyle = C.goud; ctx.fillRect(x, y, 20 * pxbp, h); ctx.fillRect(x + L - 20 * pxbp, y, 20 * pxbp, h);
  strBlok(ctx, x + 56 * pxbp, y + 4, n, 4 * pxbp, h - 8);
  if (namen > 0.01) { ctx.save(); ctx.globalAlpha *= namen; text(ctx, 'primer', x + 10 * pxbp, y - 14, fTekst(28, 600), C.goud, 'center'); text(ctx, 'primer', x + L - 10 * pxbp, y - 14, fTekst(28, 600), C.goud, 'center'); text(ctx, 'STR · TCTA × ' + n, x + (56 + 2 * n) * pxbp, y - 14, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
  if (lab) text(ctx, lab, x + L + 24, y + h - 2, fMeta(28), C.text2, 'left');
  ctx.restore(); return L; }

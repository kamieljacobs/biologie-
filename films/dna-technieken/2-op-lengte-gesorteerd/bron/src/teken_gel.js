// Op lengte gesorteerd 2.0 — tekenhulpen en gelmodel (31 okt 2026, beeld-remake op prompt v13).
// Het gelmodel (KIT, PROFILES, banden, gelGeo) is ongewijzigd overgenomen uit versie 1.0, die byte-gelijk is aan de
// kopie in het practicum tools/dna-profielen/ (r. 3776–3870 daar): zelfde kit, profielen, marker, allelladder en
// bandposities (log-schaal tussen bpTop en bpBot). Alleen het tekenen is nieuw (Part C, zonder gloed).

// ---------------- kit en profielen (= practicum) ----------------
const KIT = {
  TPOX: { name: 'TPOX', flank: 36, chrom: 2, range: [68, 84], alleles: [8, 9, 10, 11, 12] },
  AMEL: { name: 'amelogenine', chrom: 'X/Y', range: [106, 112], alleles: ['X', 'Y'], X: 106, Y: 112 },
  D8: { name: 'D8S1179', flank: 88, chrom: 8, range: [128, 152], alleles: [10, 11, 12, 13, 14, 15, 16] },
  VWA: { name: 'vWA', flank: 108, chrom: 12, range: [164, 184], alleles: [14, 15, 16, 17, 18, 19] },
  D3: { name: 'D3S1358', flank: 140, chrom: 3, range: [196, 212], alleles: [14, 15, 16, 17, 18] },
};
const LOCI_ORDER = ['TPOX', 'AMEL', 'D8', 'VWA', 'D3'];
const EFF = { AMEL: 1.0, TPOX: 1.0, D8: 0.95, VWA: 0.92, D3: 0.88 };
const bpOf = (loc, a) => loc === 'AMEL' ? KIT.AMEL[a] : KIT[loc].flank + 4 * a;
const PROFILES = {
  Eig: { AMEL: ['X', 'X'], TPOX: [8, 11], D8: [12, 15], VWA: [17, 17], D3: [15, 17] },
  Sp: { AMEL: ['X', 'Y'], TPOX: [8, 10], D8: [13, 14], VWA: [16, 16], D3: [15, 16] },
  A: { AMEL: ['X', 'Y'], TPOX: [8, 10], D8: [13, 14], VWA: [16, 16], D3: [15, 16] },
  B: { AMEL: ['X', 'Y'], TPOX: [8, 11], D8: [13, 14], VWA: [16, 16], D3: [15, 16] },
  C: { AMEL: ['X', 'Y'], TPOX: [9, 11], D8: [11, 15], VWA: [15, 18], D3: [14, 17] },
  PC: { AMEL: ['X', 'X'], TPOX: [8, 8], D8: [13, 13], VWA: [17, 18], D3: [14, 15] },
};
const DIMER = { bp: 46, int: 0.55, kind: 'dimer' };
function profileBands(prof, o = {}) {
  const out = [];
  for (const loc of LOCI_ORDER) {
    const [a1, a2] = prof[loc]; const eff = EFF[loc] * (o.scale || 1);
    const al = a1 === a2 ? [[a1, 2 * eff]] : [[a1, eff], [a2, eff]];
    for (const [a, int] of al) {
      out.push({ bp: bpOf(loc, a), int, kind: 'allele', locus: loc, allele: a });
      if (loc !== 'AMEL' && o.stutter !== false) out.push({ bp: bpOf(loc, a) - 4, int: int * 0.1, kind: 'stutter', locus: loc, allele: a });
    }
  }
  if (o.dimer !== false) out.push(Object.assign({}, DIMER));
  return out;
}
function markerBands() { return [50, 100, 150, 200, 250, 300, 350].map(bp => ({ bp, int: bp === 250 ? 2.1 : 1.0, kind: 'ladder' })); }
function alleleLadderBands() { const out = []; for (const loc of LOCI_ORDER) for (const a of KIT[loc].alleles) out.push({ bp: bpOf(loc, a), int: 0.7, kind: 'ladder', locus: loc, allele: a, thin: true }); return out; }
const LANE_BANDS = {
  M50: markerBands(), Eig: profileBands(PROFILES.Eig), Sp: profileBands(PROFILES.Sp), A: profileBands(PROFILES.A),
  B: profileBands(PROFILES.B), C: profileBands(PROFILES.C), PC: profileBands(PROFILES.PC), NC: [Object.assign({}, DIMER)], AL: alleleLadderBands(),
};
const FULL_LANES = ['M50', 'Eig', 'Sp', 'A', 'B', 'C', 'PC', 'NC', 'AL'];
function gelGeo(g) {
  const n = g.lanes.length, padX = g.padX == null ? 30 : g.padX;
  const pitch = (g.w - 2 * padX) / n, bw = pitch * (g.bandFrac || 0.72);
  const wellY = g.y + (g.wellY || 70), yTop = g.y + (g.yTop || 112), yBot = g.y + g.h - (g.yBotPad || 40);
  const lt = Math.log(g.bpTop || 330), lb = Math.log(g.bpBot || 40); const cx = i => g.x + padX + pitch * (i + 0.5);
  return Object.assign({}, g, { n, pitch, bw, wellY, yTop, yBot, cx, bandH: g.bandH || 7, lx: id => cx(g.lanes.indexOf(id)),
    Y: bp => yTop + (lt - Math.log(bp)) / (lt - lb) * (yBot - yTop), BP: y => Math.exp(lt - (y - yTop) / (yBot - yTop) * (lt - lb)) });
}

// ---------------- lay-outs (zelfde schaal als versie 1.0, alleen boven de ondertitelzone) ----------------
const GFULL = gelGeo({ x: 170, y: 150, w: 1580, h: 720, lanes: FULL_LANES, bpTop: 310, bpBot: 44, wellY: 34, yTop: 70, yBotPad: 28, bandH: 8 });
const GLINKS = gelGeo({ x: 90, y: 150, w: 1120, h: 720, lanes: FULL_LANES, bpTop: 310, bpBot: 44, wellY: 34, yTop: 70, yBotPad: 28, bandH: 8 });
const GZOOM = gelGeo({ x: 300, y: 130, w: 600, h: 750, lanes: ['M50', 'Sp', 'AL'], bpTop: 310, bpBot: 44, wellY: 34, yTop: 70, yBotPad: 30, bandFrac: 0.62, bandH: 10 });

// ---------------- kleuren van de gelfoto (= practicum, PALETTE.photo en de stand 'blauw licht') ----------------
const GELK = { plaat: '#0A0E10', rand: '#46536A', band: '226,255,214', put: 'rgba(210,235,225,0.32)', blauw: '#14244A', blauwBand: '150,255,175', wit: '#7F90A8', kleurstof: '#4A57B0' };
const LAB = { lijn: '#AFC0D0', min: '#2A2F38', plus: C.koraal };

function bandAlpha(int) { return clamp(0.2 + 0.7 * Math.min(int, 1.4) / 1.4 + 0.1 * clamp(int - 1.4, 0, 1), 0, 1); }
// één band: zachte rand door twee lagen (geen gloed); kind 'dimer' = vage, brede vlek
function gelBand(ctx, x, y, bw, bh, int, kind, o = {}) {
  const col = o.blauw ? GELK.blauwBand : GELK.band, a = (o.a == null ? 1 : o.a);
  if (kind === 'dimer') { for (let k = 0; k < 4; k++) { ctx.fillStyle = `rgba(${col},${0.07 * int * a})`; ctx.beginPath(); ctx.ellipse(x, y, bw * (0.32 + 0.1 * k), bh * (0.9 + 0.5 * k), 0, 0, 6.283); ctx.fill(); } return; }
  const al = bandAlpha(int) * a;
  ctx.fillStyle = `rgba(${col},${al * 0.22})`; roundRect(ctx, x - bw / 2 - 2, y - bh / 2 - 3, bw + 4, bh + 6, Math.min(5, bh / 2 + 3)); ctx.fill();
  ctx.fillStyle = `rgba(${col},${al})`; roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, Math.min(4, bh / 2)); ctx.fill();
}
const _gelCache = new Map();
// gelfoto (plaat + putjes + banen); o.bands (per baan), o.blauw (blauw licht), o.wit (ongekleurd, geen banden), o.only (lijst banen met banden)
function gelFoto(ctx, G, o = {}) {
  const key = (o.key || 'g') + '|' + G.x + ',' + G.y + ',' + G.w + ',' + G.h + '|' + (o.blauw ? 'b' : o.wit ? 'w' : 'f');
  let c = _gelCache.get(key);
  if (!c) {
    c = document.createElement('canvas'); c.width = Math.ceil(G.w) + 8; c.height = Math.ceil(G.h) + 8; const g = c.getContext('2d'); g.translate(4 - G.x, 4 - G.y);
    roundRect(g, G.x, G.y, G.w, G.h, 12); g.fillStyle = o.blauw ? GELK.blauw : o.wit ? GELK.wit : GELK.plaat; g.fill(); g.strokeStyle = GELK.rand; g.lineWidth = 2; g.stroke();
    g.save(); roundRect(g, G.x, G.y, G.w, G.h, 12); g.clip();
    const bands = o.bands || LANE_BANDS;
    G.lanes.forEach((id, i) => { const x = G.cx(i);
      g.strokeStyle = o.wit ? 'rgba(60,80,95,0.55)' : GELK.put; g.lineWidth = 2; g.strokeRect(x - G.bw / 2, G.wellY - 6, G.bw, 12);
      if (o.wit) return;
      for (const b of (bands[id] || [])) { if (b.bp > G.bpTop * 0.99 || b.bp < G.bpBot * 1.02) continue;
        gelBand(g, x, G.Y(b.bp), b.thin ? G.bw * 0.86 : G.bw, b.thin ? Math.max(3, G.bandH * 0.55) : G.bandH, b.int * (o.gain || 1), b.kind, { blauw: o.blauw }); } });
    g.restore(); _gelCache.set(key, c);
  }
  ctx.drawImage(c, G.x - 4, G.y - 4);
}
// baannamen boven de gel (Meta, 28 px); o.hl = lijst banen in tekstkleur, o.a
function baanNamen(ctx, G, o = {}) { const hl = o.hl || [];
  G.lanes.forEach((id, i) => { const on = hl.includes(id); const a = (o.a == null ? 1 : o.a) * (hl.length && !on ? 0.5 : 1); if (a < 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; metaText(ctx, (o.naam && id in o.naam) ? o.naam[id] : id, G.cx(i) + 2, G.y - 16, on ? C.goud : C.text2, 'center', 28); ctx.restore(); }); }
// alles behalve de genoemde banen dimmen (35 %)
function dimBanen(ctx, G, houd, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.65; ctx.fillStyle = C.bgSchema;
  G.lanes.forEach((id, i) => { if (houd.includes(id)) return; ctx.fillRect(G.cx(i) - G.pitch / 2, G.y + 2, G.pitch, G.h - 4); }); ctx.restore(); }
function baanKader(ctx, G, id, a, col = C.goud) { if (a <= 0.01) return; const x = G.lx(id); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; roundRect(ctx, x - G.pitch / 2 + 6, G.y + 8, G.pitch - 12, G.h - 16, 8); ctx.stroke(); ctx.restore(); }
function bandRing(ctx, G, id, bp, a, col = C.goud, pad = 7) { if (a <= 0.01) return; const x = G.lx(id), y = G.Y(bp); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; roundRect(ctx, x - G.bw / 2 - pad, y - G.bandH / 2 - pad, G.bw + 2 * pad, G.bandH + 2 * pad, 7); ctx.stroke(); ctx.restore(); }
function gidsLijn(ctx, y, x0, x1, a, col = C.goud, p = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, p), y); ctx.stroke(); ctx.restore(); }
// baan leegmaken (gelkleur over de banden)
function baanLeeg(ctx, G, id, a) { if (a <= 0.01) return; const x = G.lx(id); ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = GELK.plaat; ctx.fillRect(x - G.pitch / 2 + 4, G.wellY + 9, G.pitch - 8, G.yBot - G.wellY + 4); ctx.restore(); }
function extraBand(ctx, G, id, bp, int, a) { if (a <= 0.01) return; ctx.save(); gelBand(ctx, G.lx(id), G.Y(bp), G.bw, G.bandH, int, 'allele', { a }); ctx.restore(); }

// ---------------- UI-hulpjes ----------------
function term(ctx, s, x, y, a = 1, align = 'left', px = 48, col = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.font = fTekst(px, 700); ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.strokeStyle = 'rgba(18,26,38,0.9)'; ctx.lineWidth = 8; ctx.strokeText(s, x, y); ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore(); }
function pil(ctx, s, x, y, a = 1, col = C.goud, px = 32, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 36, h = px + 20; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, 'rgba(18,26,38,0.88)', col, 2); text(ctx, s, x0 + w / 2, y + px * 0.36, fTekst(px, 600), col, 'center'); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, s * 0.28); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function kruisje(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, s * 0.28); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function pijlV(ctx, x1, y1, x2, y2, col, a = 1, lw = 3, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath(); ctx.moveTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }
function schaalTekst(ctx, s) { metaText(ctx, s, W - 60, 46, C.text2, 'right', 28); }
// verticale haak (accolade) links of rechts van een stuk
function vHaak(ctx, x, y0, y1, a, col = C.goud, links = false) { if (a <= 0.01) return; const d = links ? -14 : 14; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d, y1); ctx.lineTo(x, y1); ctx.moveTo(x + d, (y0 + y1) / 2); ctx.lineTo(x + 2 * d, (y0 + y1) / 2); ctx.stroke(); ctx.restore(); }

// portret van een castpersonage (buste in een cirkel): voor verdachten en de eigenaar (figuranten, geen namen in beeld)
function portret(ctx, id, x, y, r, a = 1, ring = C.line, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#26364F'; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 1, 0, 6.283); ctx.clip();
  persoon(ctx, id, x, y + r * 4.8, r * 5.6, { uit: o.uit || 'neutraal', outfit: o.outfit }); ctx.restore();
  ctx.strokeStyle = ring; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
const VERDACHTE = { A: 'erik', B: 'passant', C: 'joost', Eig: 'wilma' };

// ---------------- micro: agarose-netwerk en DNA-stukken ----------------
// netwerk van agarose (lange suikerketens die bundels vormen) als vaste, gecachete laag; dicht = 1 (± 1 %) … 3 (± 4 %)
const _netCache = new Map();
function agaroseNet(ctx, x, y, w, h, dicht = 2, seed = 3, a = 1) { if (a <= 0.01) return; const key = [x, y, w, h, dicht, seed].join(',');
  let c = _netCache.get(key);
  if (!c) { c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); const n = Math.round(9 * dicht * dicht + 8);
    g.lineCap = 'round';
    for (let i = 0; i < n; i++) { const r = (k) => hash(seed * 97 + i * 13 + k);
      const x0 = r(1) * w, y0 = r(2) * h, an = r(3) * 6.283, L = (0.35 + 0.5 * r(4)) * Math.max(w, h) / Math.sqrt(dicht);
      g.strokeStyle = rgba(LAB.lijn, 0.55 + 0.25 * r(5)); g.lineWidth = 3 + 2 * r(6);
      g.beginPath(); g.moveTo(x0, y0); const steps = 8; for (let s = 1; s <= steps; s++) { const f = s / steps, b = an + Math.sin(f * 3 + r(7) * 6) * 0.35; g.lineTo(x0 + Math.cos(b) * L * f, y0 + Math.sin(b) * L * f); } g.stroke(); }
    _netCache.set(key, c); }
  ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(c, x, y); ctx.restore(); }
// DNA-stuk (dubbelstrengs, grijs) als korte draad met min-tekens bij de fosfaatgroepen; len in px, horizontaal of schuin
function dnaStuk(ctx, x, y, len, o = {}) { const { a = 1, rot = 0, golf = 0, t = 0, min = true, w = 9, hl = 0, minPx = 24 } = o; if (a <= 0.01) return;
  const P = []; const n = Math.max(3, Math.round(len / 18)); for (let i = 0; i <= n; i++) { const f = i / n; P.push([x + Math.cos(rot) * (f - 0.5) * len - Math.sin(rot) * Math.sin(f * 5 + t) * golf, y + Math.sin(rot) * (f - 0.5) * len + Math.cos(rot) * Math.sin(f * 5 + t) * golf]); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = w + 8; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  dnaDraad(ctx, P, { w, a });
  if (min && len > 30) { ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(minPx, 700); ctx.fillStyle = C.teal; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const k = Math.max(1, Math.round(len / 46)), off = w / 2 + minPx * 0.55;
    for (let i = 0; i < k; i++) { const f = (i + 0.5) / k, p = P[Math.round(f * n)]; ctx.fillText('−', p[0] - Math.sin(rot) * off, p[1] + Math.cos(rot) * off * (i % 2 ? -1 : 1)); } ctx.restore(); } }

// ---------------- elektroden (bovenaanzicht, zelfde richting als de foto: min boven, plus onder) ----------------
function elektrode(ctx, x0, x1, y, plus, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = plus ? LAB.plus : '#0E1116'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  ctx.fillStyle = plus ? LAB.plus : '#0E1116'; ctx.strokeStyle = plus ? lighten(C.koraal, 0.3) : '#4A505C'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x1 + 26, y, 20, 0, 6.283); ctx.fill(); ctx.stroke();
  text(ctx, plus ? '+' : '−', x1 + 26, y + 11, fTekst(34, 700), plus ? '#121A26' : C.text, 'center'); ctx.restore(); }

// ---------------- STR-stuk: flank + herhalingen van 4 bp (TCTA) ----------------
function strStuk(ctx, x, y, n, o = {}) { const { a = 1, blok = 34, h = 40, flankL = 120, flankR = 120, tel = 0, hl = -1, verdwijn = -1, vd = 0 } = o; if (a <= 0.01) return { x1: x };
  ctx.save(); ctx.globalAlpha *= a;
  const fl = (x0, w) => { roundRect(ctx, x0, y - h / 2, w, h, 8); shape(ctx, '#3A4A66', LAB.lijn, 1.5); };
  fl(x, flankL); let xx = x + flankL + 4;
  for (let i = 0; i < n; i++) { let bw = blok; if (i === verdwijn) bw = blok * (1 - vd); if (bw < 1) continue; ctx.save(); if (i === verdwijn) ctx.globalAlpha *= 1 - vd;
    roundRect(ctx, xx, y - h / 2 + 3, bw - 4, h - 6, 5); shape(ctx, i === hl ? C.goud : rgba(C.goud, 0.55), C.goud, 1.2);
    if (tel > 0 && i < Math.round(tel * n)) text(ctx, String(i + 1), xx + (bw - 4) / 2, y - h / 2 - 12, fMeta(24), C.grain, 'center'); ctx.restore(); xx += bw; }
  fl(xx + 2, flankR); ctx.restore(); return { x1: xx + 2 + flankR, xr0: x + flankL + 4, xr1: xx }; }

// chromosoom als staafje (één chromatide, vóór het kopiëren) met een gouden plek voor de STR
function staafChrom(ctx, x, y, len, kleur, a = 1, plek = 0.62, lbl = null) { if (a <= 0.01) return; const w = 46; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - len / 2, w, len, w / 2); shape(ctx, kleur, lighten(kleur, 0.35), 2);
  ctx.fillStyle = 'rgba(18,26,38,0.35)'; ctx.beginPath(); ctx.ellipse(x, y - len * 0.12, w / 2 - 3, 9, 0, 0, 6.283); ctx.fill(); // centromeer-insnoering
  ctx.fillStyle = C.goud; ctx.fillRect(x - w / 2 + 2, y - len / 2 + len * plek - 6, w - 4, 12); ctx.restore(); }

// lab-scène van de opening: gel-documentatiekastje met de gelfoto en Noor ernaast (in GFULL-coördinaten)
function gelDocWereld(ctx, t) {
  // tafel
  ctx.save(); ctx.fillStyle = '#2A3A58'; ctx.fillRect(-2600, 1010, 6200, 70); ctx.fillStyle = '#22314C'; ctx.fillRect(-2400, 1080, 90, 640); ctx.fillRect(3200, 1080, 90, 640); ctx.restore();
  // kastje (geldoc) rond de gel
  roundRect(ctx, 70, 30, 1780, 980, 40); shape(ctx, '#2B2F38', '#4A505C', 6);
  roundRect(ctx, 120, 80, 1680, 860, 18); shape(ctx, '#05080A', '#4A505C', 4);
  persoon(ctx, 'noor', -1350, 1700, 1750, { outfit: 'practicum', kijk: 1, pose: 'wijs', uit: 'neutraal', t });
}

// vraagkaartje van de opening (Tekst 44, goud kader)
function vraagKaart(ctx, x, y, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(44, 700); const w = ctx.measureText(s).width + 64; roundRect(ctx, x, y - 60, w, 120, 14); shape(ctx, 'rgba(18,26,38,0.9)', C.goud, 2); text(ctx, s, x + 32, y + 15, fTekst(44, 700), C.text); ctx.restore(); }

// GELBAK IN BOVENAANZICHT (nieuw object, voor de bibliotheek). Zelfde richting als de gelfoto: putjes en minpool boven,
// pluspool onder. Recept (minigel, zie gelElektroforese in lib_bio.js): bak ± 25 × 12 cm met buffer, gel ± 7 × 10 cm
// in het midden, putjes ± 5 mm breed op een rij vlak bij de min, elektrodedraad (platina) over de hele breedte langs
// de korte kanten: zwart = min (bij de putjes), rood = plus. Bekende fouten: putjes bij de plus; draad onder de gel.
// x, y = midden; geeft { x0, x1, putY, put0, put1, minY, plusY } terug.
function gelbakBoven(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a, bw = 560, bh = 760, gw = 420, gh = 470; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const x0 = x - bw / 2, y0 = y - bh / 2; roundRect(ctx, x0, y0, bw, bh, 22); shape(ctx, '#22314C', LAB.lijn, 3); // bak
  roundRect(ctx, x0 + 16, y0 + 16, bw - 32, bh - 32, 14); shape(ctx, rgba(C.teal, 0.14), null); // buffer
  const minY = y0 + 60, plusY = y0 + bh - 60; [[minY, false], [plusY, true]].forEach(([yy, pl]) => { ctx.strokeStyle = pl ? LAB.plus : '#0E1116'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0 + 30, yy); ctx.lineTo(x0 + bw - 30, yy); ctx.stroke();
    ctx.fillStyle = pl ? LAB.plus : '#0E1116'; ctx.beginPath(); ctx.arc(x0 + bw - 30, yy, 16, 0, 6.283); ctx.fill(); ctx.strokeStyle = pl ? lighten(C.koraal, 0.3) : '#4A505C'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = pl ? LAB.plus : '#0E1116'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + bw - 30, yy); ctx.bezierCurveTo(x0 + bw + 60, yy, x0 + bw + 40, pl ? yy + 80 : yy - 80, x0 + bw + 120, pl ? yy + 110 : yy - 110); ctx.stroke(); });
  const gx = x - gw / 2, gy = y - gh / 2 + 10; roundRect(ctx, gx, gy, gw, gh, 8); shape(ctx, '#5F6E86', '#8C9BB0', 2); // gel
  const putY = gy + 40, n = 8, pitch = (gw - 40) / n; for (let i = 0; i < n; i++) { ctx.fillStyle = '#2A3A58'; ctx.fillRect(gx + 20 + i * pitch + pitch * 0.18, putY - 6, pitch * 0.64, 12); }
  ctx.restore(); return { x0, x1: x0 + bw, putY, put0: gx + 20, put1: gx + gw - 20, minY, plusY }; }

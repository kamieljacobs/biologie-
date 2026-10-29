// Cellen · Stamcellen 2.0 — eigen objecten van deze film (prompt v13, C9). Rest uit bibliotheek/lib_bio.js en personages/lib_cast.js.
const vragenUit = () => (typeof state !== 'undefined' && state && state.vragen === 'uit');
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01 || vragenUit()) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 36, align = 'center', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x0, y0, x1, y1, col = C.line, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0), k = 8 + lw * 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - k * Math.cos(an - 0.45), y1 - k * Math.sin(an - 0.45)); ctx.lineTo(x1 - k * Math.cos(an + 0.45), y1 - k * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function boogPijl(ctx, x0, y0, x1, y1, buig, col = C.line, a = 1, lw = 3) { if (a <= 0.01) return; const mx = (x0 + x1) / 2 - (y1 - y0) * buig, my = (y0 + y1) / 2 + (x1 - x0) * buig; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(mx, my, x1, y1); ctx.stroke(); const an = Math.atan2(y1 - my, x1 - mx), k = 8 + lw * 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - k * Math.cos(an - 0.45), y1 - k * Math.sin(an - 0.45)); ctx.lineTo(x1 - k * Math.cos(an + 0.45), y1 - k * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function fade(ctx, a, f) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); }
function mix(a, b, u) { return _mixHex(a, b, clamp(u, 0, 1)); }
// zoomcirkel met micro-achtergrond binnenin (Part C5)
function zoomMicro(ctx, x, y, r, sx, sy, cap, a, f) { if (a <= 0.01) return; zoomCircle(ctx, x, y, r, sx, sy, cap, a, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); f(); }); }

// =====================================================================================
// GEN-CHROMOSOOM: het vaste beeldmotief van deze film ('zelfde DNA, andere genen aan').
// Recept: elke lichaamscel (behalve de rode bloedcel, die zijn kern verliest) heeft dezelfde chromosomen met dezelfde
// genen (OpenStax Biology 2e § 16.1 'Regulation of gene expression'; NIH Stem Cell Basics). Getekend als één chromosoom
// in rust (één chromatide, de cel deelt niet), standaardkleur palet B (CD.std grijs), centromeer op 0,38. Vijf genen als
// banden op vaste plekken, in elke celsoort precies dezelfde; alleen het gen dat aan staat is goud. Een gen dat uit staat
// maar wél aanwezig is, krijgt met o.ring een gestippelde koraalrand. Bekende fout: per celsoort andere banden tekenen
// (dan lijkt het DNA verschillend); paarse chromosomen (palet B: grijs).
// o: a, aan (gen-id of lijst), aanA 0..1, ring (gen-id), ringA, namen 0..1 (gennamen erboven/eronder), leeg (rode bloedcel).
// =====================================================================================
const GENEN = [{ id: 'zenuw', naam: 'zenuwgen', u: 0.10 }, { id: 'spier', naam: 'spiergen', u: 0.25 }, { id: 'insuline', naam: 'insuline', u: 0.52 }, { id: 'keratine', naam: 'huidgen', u: 0.69 }, { id: 'hemo', naam: 'hemoglobine', u: 0.86 }];
const CEL_GEN = { zenuw: 'zenuw', spier: 'spier', alv: 'insuline', huid: 'keratine', bloed: 'hemo', stam: null, hart: 'spier' };
function genChrom(ctx, x, y, len, o = {}) {
  const { a = 1, aan = null, aanA = 1, ring = null, ringA = 0, namen = 0, namenA = 1, leeg = false, kl = CD.std, w = Math.max(14, len * 0.1) } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const x0 = x - len / 2, cen = 0.38;
  const half = (u) => { const d = Math.abs(u - cen); const pinch = 1 - 0.32 * Math.exp(-Math.pow(d / 0.035, 2)); const tip = Math.min(1, Math.sqrt(Math.min(u, 1 - u) / 0.05)); return w / 2 * pinch * tip; };
  const pad = () => { ctx.beginPath(); const N = 60; for (let i = 0; i <= N; i++) { const u = i / N; ctx.lineTo(x0 + u * len, y - half(u)); } for (let i = N; i >= 0; i--) { const u = i / N; ctx.lineTo(x0 + u * len, y + half(u)); } ctx.closePath(); };
  if (leeg) { ctx.setLineDash([8, 7]); pad(); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); return; }
  pad(); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = _cdk(kl, 0.45); ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); pad(); ctx.clip(); const aanL = Array.isArray(aan) ? aan : [aan];
  GENEN.forEach(g => { const bx = x0 + g.u * len, bw = Math.max(6, len * 0.055); ctx.fillStyle = '#5E6A80'; ctx.fillRect(bx - bw / 2, y - w, bw, 2 * w);
    if (aanL.includes(g.id) && aanA > 0.01) { ctx.save(); ctx.globalAlpha *= aanA; ctx.fillStyle = C.goud; ctx.fillRect(bx - bw / 2, y - w, bw, 2 * w); ctx.restore(); } });
  ctx.restore();
  if (ring && ringA > 0.01) { const g = GENEN.find(q => q.id === ring), bx = x0 + g.u * len; ctx.save(); ctx.globalAlpha *= ringA; ctx.setLineDash([6, 5]); roundRect(ctx, bx - len * 0.05, y - w * 0.95, len * 0.1, w * 1.9, 8); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if (namen && namenA > 0.01) { const lst = namen === true ? GENEN.map(g => g.id) : (Array.isArray(namen) ? namen : [namen]); ctx.save(); ctx.globalAlpha *= namenA; GENEN.filter(g => lst.includes(g.id)).forEach((g, k) => { const bx = x0 + g.u * len, onder = lst.length > 1 && k % 2 === 1; metaText(ctx, g.naam, bx, onder ? y + w + 36 : y - w - 14, aanL.includes(g.id) ? C.goud : C.grain, 'center', 28); }); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// BÈTACEL (insulinemakende cel uit een eilandje van Langerhans in de alvleesklier).
// Recept (OpenStax A&P 2e § 17.9; Junqueira h. 20): ± 10–15 µm, veelhoekig in het eilandje, ronde kern ongeveer in het
// midden, cytoplasma vol secretiekorrels met insuline (± 0,3 µm: donkere kern met lichte halo), ruw ER en golgi. Bekende
// fouten: lege cel; korrels als felle stippen; zeshoek met rechte zijden. u = maat-eenheid zoals _gdCel (cel ± 2u breed).
// =====================================================================================
function betacel(ctx, x, y, u, o = {}) {
  const { a = 1, korrels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lw = Math.max(1, u * 0.025);
  const P = _gdPoly(x, y, u * 1.0, 7, 41); ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip();
  for (let k = 0; k < 3; k++) { ctx.strokeStyle = rgba(_GD.er, 0.5); ctx.lineWidth = Math.max(0.7, u * 0.02); ctx.beginPath(); ctx.arc(x + u * 0.05, y + u * 0.05, u * (0.42 + k * 0.1), 0.4, 1.6); ctx.stroke(); }
  for (let i = 0; i < 26; i++) { const an = hash(i * 5.1 + 2) * 6.283, d = u * (0.42 + 0.45 * hash(i * 3.7)); const kx = x + Math.cos(an) * d, ky = y + Math.sin(an) * d * 0.95;
    ctx.globalAlpha *= 1; ctx.beginPath(); ctx.arc(kx, ky, u * 0.065, 0, 6.283); ctx.fillStyle = rgba('#E6DCC6', 0.18 * korrels); ctx.fill(); ctx.beginPath(); ctx.arc(kx, ky, u * 0.034, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.9 * korrels); ctx.fill(); }
  ctx.restore(); _gdKern(ctx, x - u * 0.05, y - u * 0.02, u * 0.3, lw); ctx.restore(); }

// cel van een bepaald type (eindcel), zelfde schaal-eenheid u als gedifferentieerdeCellen
function celType(ctx, tp, x, y, u, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (tp === 'alv') betacel(ctx, x, y, u);
  else if (tp === 'stam') _scbCel(ctx, x, y, u * 0.9, 0, 0.5, Math.max(1, u * 0.025));
  else if (tp === 'hart') hartspiercel(ctx, x - u * 1.6, y, u * 3.2, u * 0.8, { t });
  else _gdCel(ctx, tp, x, y, u, t);
  ctx.restore(); }

// =====================================================================================
// HARTSPIERCEL. Recept (C9 Weefsels; OpenStax A&P 2e § 19.2 'Cardiac muscle'; Junqueira h. 10): ± 100 µm lang en
// 10–25 µm breed, vertakt (Y), dwarsgestreept, één (soms twee) ovale kern(en) in het midden, aan de uiteinden een
// tussenschijf (intercalated disc: donkere trapvormige lijn met gap junctions, waardoor het signaal doorloopt).
// Samentrekken (o.c 0..1): de cel wordt ± 10 % korter, de strepen schuiven dichter op. Bekende fouten: spoelvorm met
// één kern (dat is gladde spier); kernen aan de rand (skeletspier); geen vertakking.
// x = linkeruiteinde, y = as, len, h = dikte. o.vertak = -1|0|1 (tak omhoog/omlaag aan de rechterkant), o.disc.
// =====================================================================================
function hartspiercel(ctx, x, y, len, h, o = {}) {
  const { a = 1, c = 0, vertak = 1, disc = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = len * (1 - 0.1 * clamp(c, 0, 1)), x0 = x + (len - L) / 2, hh = h * (1 + 0.08 * clamp(c, 0, 1)), r = hh * 0.35;
  const delen = [() => roundRect(ctx, x0, y - hh / 2, L, hh, r)];
  if (vertak) delen.push(() => { ctx.save(); ctx.translate(x0 + L * 0.55, y); ctx.rotate(-vertak * 0.42); roundRect(ctx, 0, -hh * 0.4, L * 0.5, hh * 0.8, r); ctx.restore(); });
  const rand = hl > 0.5 ? C.goud : BIO.spierL; ctx.lineJoin = 'round';
  delen.forEach(d => { d(); ctx.strokeStyle = rand; ctx.lineWidth = (hl > 0.5 ? 2.5 : 1.5) * 2; ctx.stroke(); });
  delen.forEach(d => { d(); ctx.fillStyle = mix(BIO.spier, '#121A26', 0.12); ctx.fill(); });
  const st = Math.max(5, h * 0.2) * (1 - 0.12 * c); ctx.strokeStyle = rgba('#3E1C1A', 0.5); ctx.lineWidth = Math.max(1, st * 0.32);
  delen.forEach(d => { ctx.save(); d(); ctx.clip(); for (let xx = x0 - h; xx < x0 + L + h; xx += st) { ctx.beginPath(); ctx.moveTo(xx, y - L); ctx.lineTo(xx + (vertak ? 0 : 0), y + L); ctx.stroke(); } ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(x0 + L * 0.35, y, h * 0.3, h * 0.19, 0, 0, 6.283); shape(ctx, _GD.kern, _GD.kernR, 1.2);
  if (disc) { ctx.strokeStyle = '#2A1214'; ctx.lineWidth = Math.max(2, h * 0.08); ctx.lineJoin = 'miter'; for (const dx of [x0 + r * 0.25, x0 + L - r * 0.25]) { ctx.beginPath(); const s2 = hh * 0.8 / 4; ctx.moveTo(dx, y - hh * 0.4); for (let k = 0; k < 4; k++) ctx.lineTo(dx + (k % 2 ? -3 : 3), y - hh * 0.4 + s2 * (k + 1)); ctx.stroke(); } }
  ctx.restore(); }
// hartspierweefsel: rijen vertakte cellen die met tussenschijven aan elkaar vastzitten. o.fase(i) → 0..1 samentrekken per cel.
function hartspierWeefsel(ctx, x, y, w, h, o = {}) { const { a = 1, fase = () => 0, n = 4, m = 4, golf = -1, golfA = 0 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a;
  const rh = h / n, cw = w / m, cel = []; for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) { const i = r * m + c, off = (r % 2) * cw * 0.45, xx = x + c * cw + off - (r % 2 ? cw * 0.45 : 0), yy = y + r * rh + rh / 2; cel.push([xx, yy, i]); }
  ctx.save(); ctx.beginPath(); ctx.rect(x - 4, y - rh, w + 8, h + 2 * rh); ctx.clip();
  cel.forEach(([xx, yy, i]) => hartspiercel(ctx, xx, yy, cw * 1.02, rh * 0.62, { c: fase(i), vertak: (i % 3 === 0 ? 1 : (i % 3 === 1 ? 0 : -1)), seed: i }));
  if (golfA > 0.01 && golf >= 0) { ctx.save(); ctx.globalAlpha *= golfA; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + golf * w, y - 10); ctx.lineTo(x + golf * w, y + h + 10); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore(); return cel; }

// =====================================================================================
// KLIEVING: bevruchte eicel (± 0,1 mm) in de zona pellucida die deelt in 2, 4, 8 cellen zonder te groeien (de cellen
// worden kleiner). Recept (Sadler h. 3; OpenStax Biology 2e § 43.6): eerste deling ± 30 uur na de bevruchting, daarna
// ± elke 12–24 uur; de zona blijft even groot. Bekende fouten: embryo dat groeit tijdens de klieving; cellen die
// buiten de zona steken. f = 0..3 (0 = 1 cel, 1 = 2, 2 = 4, 3 = 8); vloeiend: een cel snoert in voor hij deelt.
// =====================================================================================
function klieving(ctx, x, y, r, f, o = {}) { const { a = 1, voorkernen = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); ctx.strokeStyle = rgba('#E6DCC6', 0.5); ctx.lineWidth = r * 0.09; ctx.stroke();
  const st = Math.floor(clamp(f, 0, 3)), u = ease(clamp(f - st, 0, 1)); const n = Math.pow(2, st), lw = Math.max(1, r * 0.012);
  const pos = (k) => { if (k === 1) return [[0, 0, 0.98]]; if (k === 2) return [[-0.5, 0, 0.5], [0.5, 0, 0.5]]; if (k === 4) return [[-0.47, -0.42, 0.46], [0.47, -0.42, 0.46], [-0.47, 0.42, 0.46], [0.47, 0.42, 0.46]];
    return [[-0.5, -0.5, 0.38], [0.1, -0.62, 0.36], [0.62, -0.2, 0.37], [-0.66, 0.1, 0.36], [0.55, 0.42, 0.37], [-0.2, 0.6, 0.38], [-0.08, 0.02, 0.36], [0.2, 0.15, 0.3]]; };
  const A = pos(n), B = st < 3 ? pos(n * 2) : null;
  const cel = (cx, cy, rr) => { ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.283); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3); };
  if (!B || u < 0.01) A.forEach(([px, py, pr], i) => { cel(x + px * r, y + py * r, pr * r); if (n === 1 && voorkernen) { _gdKern(ctx, x - r * 0.2, y, r * 0.17, lw); _gdKern(ctx, x + r * 0.2, y + r * 0.04, r * 0.16, lw); } else _gdKern(ctx, x + px * r + pr * r * 0.08, y + py * r, pr * r * 0.36, lw); });
  else A.forEach(([px, py, pr], i) => { const [ax, ay, ar] = B[2 * i], [bx, by, br] = B[2 * i + 1]; // insnoeren: twee kinderen schuiven uit één moeder
    for (const [qx, qy, qr] of [[ax, ay, ar], [bx, by, br]]) { const cx = lerp(px, qx, u), cy = lerp(py, qy, u), rr = lerp(pr * 0.72, qr, u); cel(x + cx * r, y + cy * r, rr * r); _gdKern(ctx, x + cx * r, y + cy * r, rr * r * 0.36, lw); } });
  ctx.restore(); }

// =====================================================================================
// INFUUS aan een standaard. Recept: zak van ± 25 × 15 cm aan een haak op ± 1,8 m, druppelkamer onder de zak, slangetje
// naar de arm (Verpleegkunde: 'infuus aanleggen'). Stamceltransplantatie: de zak bevat het stamcelproduct, dat via een
// infuus de bloedbaan in gaat (Sanquin; Matchis). x = voet van de standaard, y = vloer; h = hoogte in px; doel = [x, y] arm.
// =====================================================================================
function infuus(ctx, x, y, h, doel, o = {}) { const { a = 1, t = 0, stroom = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = h / 180;
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4 * k * 1.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.lineTo(x + 18 * k, y - h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 22 * k, y); ctx.lineTo(x + 22 * k, y); ctx.stroke();
  const bx = x + 18 * k, by = y - h + 6 * k; roundRect(ctx, bx - 12 * k, by, 24 * k, 34 * k, 5 * k); shape(ctx, rgba('#C9E0E8', 0.18), rgba('#C9E0E8', 0.8), 2); roundRect(ctx, bx - 10 * k, by + 12 * k, 20 * k, 20 * k, 4 * k); shape(ctx, rgba('#E8B4A0', 0.55), null);
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(bx - 6 * k + (i % 3) * 6 * k, by + 18 * k + Math.floor(i / 3) * 8 * k, 1.8 * k, 0, 6.283); ctx.fillStyle = '#B8C8DC'; ctx.fill(); }
  roundRect(ctx, bx - 3 * k, by + 38 * k, 6 * k, 10 * k, 2 * k); shape(ctx, rgba('#C9E0E8', 0.2), rgba('#C9E0E8', 0.8), 1.5);
  const p0 = [bx, by + 48 * k], c1 = [bx, (by + doel[1]) / 2 + 40 * k], P = (u) => [lerp(lerp(p0[0], c1[0], u), lerp(c1[0], doel[0], u), u), lerp(lerp(p0[1], c1[1], u), lerp(c1[1], doel[1], u), u)];
  ctx.strokeStyle = rgba('#C9E0E8', 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(...p0); ctx.quadraticCurveTo(c1[0], c1[1], doel[0], doel[1]); ctx.stroke();
  if (stroom > 0.01) for (let i = 0; i < 5; i++) { const u = ((t * 0.25 + i / 5) % 1); const [px, py] = P(u); ctx.beginPath(); ctx.arc(px, py, 3.5 * k * 0.8 + 2, 0, 6.283); ctx.fillStyle = rgba('#B8C8DC', stroom); ctx.fill(); }
  ctx.restore(); }

// =====================================================================================
// CEL MET HERKENNINGSEIWITTEN (HLA). Recept (Janeway, Immunobiology h. 6; Matchis 'HLA-typering'): op bijna elke
// lichaamscel staan HLA-eiwitten loodrecht in het membraan; het afweersysteem herkent cellen met andere HLA als vreemd.
// Donor en patiënt moeten (bijna) dezelfde HLA-typen hebben. Getekend als steeltje door het membraan met een kopje dat
// een vorm heeft (vorm 0 = rond, 1 = vierkant, 2 = driehoek); kleur teal (informatie), bij een mismatch koraal.
// =====================================================================================
function hlaCel(ctx, x, y, r, vorm, o = {}) { const { a = 1, kleur = C.teal, n = 9, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.2, cs = Math.cos(an), sn = Math.sin(an), bx = x + cs * r, by = y + sn * r, hx = x + cs * (r + r * 0.24), hy = y + sn * (r + r * 0.24), s = r * 0.075;
    ctx.strokeStyle = lighten(kleur, 0.2); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.beginPath(); ctx.moveTo(x + cs * r * 0.94, y + sn * r * 0.94); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); ctx.beginPath(); if (vorm === 0) ctx.arc(s * 0.9, 0, s, 0, 6.283); else if (vorm === 1) ctx.rect(0, -s, 2 * s, 2 * s); else { ctx.moveTo(0, -s * 1.1); ctx.lineTo(2.1 * s, 0); ctx.lineTo(0, s * 1.1); ctx.closePath(); } shape(ctx, kleur, lighten(kleur, 0.35), 1.2); ctx.restore(); }
  celRond(ctx, x, y, r, { t, seed: 3 + vorm }); ctx.restore(); }

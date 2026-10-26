// ===== teken_mi.js · Bacteriën, virussen en schimmels (films/cellen/microben) =====
// Nieuwe tekeningen (kandidaat voor bibliotheek/lib_bio.js). Recepten bovenaan elke functie.
// Kleuren: brood = oker (voedsel), schimmel en bacterie = teal/grijs (organismengroep C3), DNA/RNA = paars,
// eiwitmantel = grijsblauw (eiwit, C.enzym-familie). Geen gloed, geen verloop.

function miRng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const MI = { korst: '#A0743F', korstR: '#C79A5E', kruim: '#E2CC9C', kruimR: '#F0E0BC', porie: '#C2A672',
  hyfe: '#D8DEE2', hyfeR: '#F2F2EE', sporZw: '#3A4048', sporZwR: '#6A7280', peni: '#6F9FA8', peniR: '#A9CDD2',
  trommel: '#4E7FA6', trommelR: '#7FA8C8', mantel: '#8E9DB8', mantelR: '#C4CEDF', rna: '#BBAFE0' };

// ---------------------------------------------------------------------------------------------
// BOTERHAM (bovenaanzicht). Recept: een snee bruin of wit brood is ± 10–12 cm breed; vorm = rechthoek met bolle
// bovenkant (kapje van het blik), korst ± 4–6 % van de breedte, kruim met onregelmatige poriën (gasbellen van gist).
// w = breedte in px. schimmel = [{u, v, r, k, soort}] (u,v = 0..1 in de snee, r = straal als deel van w, k = groei 0..1,
// soort 'zwart' (Rhizopus: wit pluis met zwarte puntjes) of 'groen' (Penicillium: fluweelachtig grijsgroen met witte rand)).
// Bekende fout: schimmel als egale vlek; een boterham als ovaal.
// ---------------------------------------------------------------------------------------------
function miBoterhamPad(ctx, x, y, w) { const h = w * 0.92, k = w * 0.06; const L = x - w / 2, R = x + w / 2, B = y + h / 2, T = y - h / 2 + w * 0.16;
  ctx.beginPath(); ctx.moveTo(L + k, B); ctx.lineTo(R - k, B); ctx.quadraticCurveTo(R, B, R, B - k); ctx.lineTo(R, T);
  ctx.bezierCurveTo(R + w * 0.04, T - w * 0.2, x + w * 0.22, y - h / 2 - w * 0.04, x, y - h / 2); ctx.bezierCurveTo(x - w * 0.22, y - h / 2 - w * 0.04, L - w * 0.04, T - w * 0.2, L, T);
  ctx.lineTo(L, B - k); ctx.quadraticCurveTo(L, B, L + k, B); ctx.closePath(); }
function miBoterham(ctx, x, y, w, o = {}) { const { a = 1, t = 0, schimmel = [], rot = 0, droog = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.translate(-x, -y);
  miBoterhamPad(ctx, x, y, w); shape(ctx, MI.korst, MI.korstR, 2);
  ctx.save(); ctx.translate(x, y + w * 0.01); ctx.scale(0.9, 0.9); ctx.translate(-x, -y); miBoterhamPad(ctx, x, y, w); ctx.fillStyle = droog > 0 ? _mixHex(MI.kruim, '#CDBB90', droog) : MI.kruim; ctx.fill(); ctx.clip();
  const rnd = miRng(71); for (let i = 0; i < 70; i++) { const px = x + (rnd() - 0.5) * w, py = y + (rnd() - 0.5) * w * 0.95, rr = w * (0.006 + rnd() * 0.016);
    ctx.beginPath(); ctx.ellipse(px, py, rr * (1 + rnd() * 0.8), rr, rnd() * 3, 0, 6.283); ctx.fillStyle = rgba(MI.porie, 0.55); ctx.fill(); }
  for (const s of schimmel) miKolonie(ctx, x - w / 2 + s.u * w, y - w * 0.46 + s.v * w * 0.92, s.r * w, s.k, s.soort || 'zwart', t, s.seed || 3);
  ctx.restore(); ctx.restore(); }

// KOLONIE (macro, op voedsel). Recept: een schimmelkolonie groeit vanuit één spore rond naar buiten; de rand is jong wit
// mycelium, het midden ouder en gekleurd door sporen. Rhizopus: wit-grijs pluis met zwarte stipjes (sporangia, ± 0,1–0,2 mm).
// Penicillium: fluweelachtig grijsgroen midden, witte rand. k = groei 0..1 (straal ∝ k).
function miKolonie(ctx, x, y, r, k = 1, soort = 'zwart', t = 0, seed = 3) { if (k <= 0.01) return; const R = r * clamp(k, 0, 1), rnd = miRng(seed * 977 + 13); ctx.save();
  // rafelige witte rand: korte draadjes naar buiten
  ctx.strokeStyle = rgba(MI.hyfeR, 0.55); ctx.lineWidth = Math.max(1, R * 0.018); ctx.lineCap = 'round';
  for (let i = 0; i < 90; i++) { const an = i / 90 * 6.283 + rnd() * 0.07, r0 = R * (0.55 + rnd() * 0.25), r1 = R * (0.9 + rnd() * 0.22); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0);
    ctx.quadraticCurveTo(x + Math.cos(an + 0.08) * (r0 + r1) / 2, y + Math.sin(an + 0.08) * (r0 + r1) / 2, x + Math.cos(an + (rnd() - 0.5) * 0.12) * r1, y + Math.sin(an + (rnd() - 0.5) * 0.12) * r1); ctx.stroke(); }
  blob(ctx, x, y, R * 0.82, R * 0.8, 0.08, seed, 0); ctx.fillStyle = rgba(MI.hyfe, 0.55); ctx.fill();
  if (soort === 'groen') { blob(ctx, x, y, R * 0.62, R * 0.6, 0.1, seed + 1, 0); ctx.fillStyle = rgba(MI.peni, 0.9 * ease((k - 0.25) / 0.5)); ctx.fill();
    for (let i = 0; i < 40; i++) { const an = rnd() * 6.283, rr = Math.sqrt(rnd()) * R * 0.55; circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, Math.max(0.8, R * 0.025), rgba(MI.peniR, 0.5 * ease((k - 0.3) / 0.5))); } }
  else { const n = Math.round(60 * k * k); for (let i = 0; i < n; i++) { const an = rnd() * 6.283, rr = Math.sqrt(rnd()) * R * 0.7;
      circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, Math.max(1.1, R * (0.022 + rnd() * 0.018)), rgba(MI.sporZw, 0.9)); } }
  ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// BROODTROMMEL (bovenaanzicht). Recept: lunchbox ± 18 × 13 × 6 cm, kunststof met ronde hoeken; van boven zie je de rand
// (wanddikte) en de bodem; het deksel ligt ernaast of erop. w = buitenbreedte, verhouding 18:13. open 0..1 schuift het
// deksel van de bak af naar rechts. binnen(ctx, x, y, wBinnen) tekent de inhoud (vóór het deksel).
// ---------------------------------------------------------------------------------------------
function miTrommel(ctx, x, y, w, o = {}) { const { a = 1, open = 0, binnen = null, col = MI.trommel } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = w * 13 / 18, r = w * 0.09, wd = w * 0.05;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, r); shape(ctx, col, MI.trommelR, 2.5);
  roundRect(ctx, x - w / 2 + wd, y - h / 2 + wd, w - 2 * wd, h - 2 * wd, r * 0.75); shape(ctx, _mixHex(col, '#1A2740', 0.62), rgba(MI.trommelR, 0.45), 2);
  if (binnen) { ctx.save(); roundRect(ctx, x - w / 2 + wd, y - h / 2 + wd, w - 2 * wd, h - 2 * wd, r * 0.75); ctx.clip(); binnen(ctx, x, y, w - 2 * wd); ctx.restore(); }
  const dx = ease(open) * w * 1.08; if (open < 0.999 || true) { const lx = x + dx; ctx.save(); ctx.globalAlpha *= open > 0.98 ? 0.95 : 1;
    roundRect(ctx, lx - w / 2 - 6, y - h / 2 - 6, w + 12, h + 12, r * 1.05); shape(ctx, lighten(col, 0.14), MI.trommelR, 2.5);
    roundRect(ctx, lx - w / 2 + w * 0.08, y - h / 2 + h * 0.1, w * 0.84, h * 0.8, r * 0.7); ctx.strokeStyle = rgba(MI.trommelR, 0.5); ctx.lineWidth = 2; ctx.stroke();
    for (const sd of [-1, 1]) { roundRect(ctx, lx + sd * (w / 2 + 2) - 10, y - h * 0.16, 20, h * 0.32, 6); shape(ctx, lighten(col, 0.28), MI.trommelR, 1.5); } ctx.restore(); }
  ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// HYFEN EN MYCELIUM IN HET BROOD (micro, doorsnede bovenkant van de snee). Recept (getallen.md): hyfe = buisvormige
// draad van ± 5–10 µm doorsnee met celwand van chitine en cytoplasma met kernen; Rhizopus-hyfen hebben (bijna) geen
// tussenschotten. Groei aan de top; vertakken achter de top. Sporendrager (sporangiofoor) staat recht omhoog uit het
// oppervlak met bovenop een bolvormig sporenzakje (sporangium, ± 100–200 µm) vol sporen; rhizoïden onderaan.
// Het kruim: zetmeelkorrels (oker) en luchtgaten. De hyfe scheidt enzymen uit (oker stipjes worden kleiner).
// Opties: k = groei 0..1, sporen 0..1 (sporenzakje rijp / opengebarsten), enz 0..1 (enzymen zichtbaar), hl = focus op één hyfe.
// Bekende fout: hyfen als losse streepjes; sporen groter dan de draad; schimmel alleen op het oppervlak.
// ---------------------------------------------------------------------------------------------
function miMycelium(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, k = 1, sporen = 1, enz = 0, hl = 0, opp = 0.34, zak = 1, n = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = x - w / 2, T = y - h / 2, B = y + h / 2, yo = T + h * opp; // yo = oppervlak van het brood
  // kruim: lichte oker matrix met luchtgaten
  ctx.save(); ctx.beginPath(); ctx.moveTo(L, B); ctx.lineTo(L, yo); for (let i = 0; i <= 40; i++) ctx.lineTo(L + i / 40 * w, yo + Math.sin(i * 1.7) * 4); ctx.lineTo(L + w, B); ctx.closePath(); ctx.fillStyle = rgba('#B8955A', 0.42); ctx.fill(); ctx.strokeStyle = rgba(MI.kruimR, 0.55); ctx.lineWidth = 2; ctx.stroke(); ctx.clip();
  const rnd = miRng(5); for (let i = 0; i < 16; i++) { const px = L + rnd() * w, py = yo + 50 + rnd() * (B - yo - 30), r = 20 + rnd() * 30; ctx.beginPath(); ctx.ellipse(px, py, r * 1.35, r, rnd() * 3, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.85); ctx.fill(); ctx.strokeStyle = rgba(MI.kruimR, 0.3); ctx.lineWidth = 1.2; ctx.stroke(); }
  const zm = []; for (let i = 0; i < 90; i++) { const px = L + rnd() * w, py = yo + 14 + rnd() * (B - yo - 14), r = 6 + rnd() * 10; zm.push([px, py, r]); }
  ctx.restore();
  // hyfen: vertakte boom die vanuit de kiemplek (x0) het kruim in groeit (naar beneden en opzij)
  const x0 = x - w * 0.08, rh = miRng(19), takken = []; const groei = (px, py, an, len, d, id) => { if (d > 3) return; const m = 7; let cx = px, cy = py; const pts = [[cx, cy]];
    for (let i = 0; i < m; i++) { an += (rh() - 0.5) * 0.45; if (cy < yo + 26 && Math.sin(an) < 0.35) an = Math.atan2(Math.abs(Math.sin(an)) + 0.4, Math.cos(an)); cx += Math.cos(an) * len / m; cy += Math.sin(an) * len / m; pts.push([cx, cy]); }
    takken.push({ pts, d, id }); const nk = d < 2 ? 2 : 1; for (let j = 0; j < nk; j++) { const u = 0.3 + rh() * 0.5, q = pts[Math.round(u * m)]; groei(q[0], q[1], an + (j ? -1 : 1) * (0.5 + rh() * 0.5), len * 0.7, d + 1, id + j); } };
  [[0.25, 0.42], [0.62, 0.4], [0.9, 0.34], [0.05, 0.36], [0.45, 0.48]].forEach(([an, f], i) => groei(x0, yo + 10, Math.PI * an + 0.05, h * f, i > 2 ? 1 : 0, 'h' + i));
  const hd = Math.max(6, w * 0.0095);
  for (const tk of takken) { const k0 = tk.d * 0.15, u = clamp((k - k0) / 0.45, 0, 1); if (u <= 0) continue; const m = Math.max(2, Math.round(u * (tk.pts.length - 1)) + 1); const P = tk.pts.slice(0, m);
    const foc = hl > 0.01 && tk.id === 'h1' ? hl : 0; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); bioPad(ctx, P); ctx.strokeStyle = foc > 0 ? _mixHex(MI.hyfeR, '#E0B64A', foc) : MI.hyfeR; ctx.lineWidth = hd + 3; ctx.stroke();
    ctx.beginPath(); bioPad(ctx, P); ctx.strokeStyle = '#3E5A66'; ctx.lineWidth = hd - 2; ctx.stroke();
    for (let i = 1; i < P.length - 1; i += 2) circ(ctx, P[i][0], P[i][1], hd * 0.2, rgba(MI.rna, 0.9));
    if (enz > 0.01) { const e = P[P.length - 1]; for (let j = 0; j < 4; j++) { const an = j * 1.55 + t * 0.5, rr = hd * (2.4 + j * 0.6) * enz; circ(ctx, e[0] + Math.cos(an) * rr, e[1] + Math.sin(an) * rr, 3.2, rgba('#7A8BA8', 0.95 * enz), rgba(C.goud, 0.85 * enz), 1.2); } } }
  // zetmeelkorrels (worden kleiner waar enzymen werken)
  for (const [px, py, r] of zm) { let rr = r; if (enz > 0.01) { const dd = Math.hypot(px - x0, py - yo - h * 0.2); rr = r * (1 - 0.65 * enz * clamp(1 - dd / (h * 0.5), 0, 1)); }
    if (rr < 1.5) continue; ctx.beginPath(); ctx.ellipse(px, py, rr, rr * 0.82, 0.4, 0, 6.283); shape(ctx, rgba(C.oker, 0.6), rgba('#E8D29A', 0.7), 1); }
  // sporendragers (sporangioforen) met sporenzakje bovenop, rhizoïden onderaan
  const sd = ease((k - 0.55) / 0.35) * zak, tops = [];
  if (sd > 0.01) for (let j = 0; j < n; j++) { const sx = x0 + (j - (n - 1) / 2) * w * 0.12 + (j === 1 ? 0 : 6), hgt = (yo - T - h * 0.1) * (j === 1 ? 1 : 0.78 - 0.08 * j) * sd, top = yo - hgt;
    ctx.strokeStyle = MI.hyfeR; ctx.lineWidth = hd + 3; ctx.beginPath(); ctx.moveTo(sx, yo + 8); ctx.quadraticCurveTo(sx + (j - 1) * 10, (yo + top) / 2, sx + (j - 1) * 6, top); ctx.stroke(); ctx.strokeStyle = '#3E5A66'; ctx.lineWidth = hd - 2; ctx.stroke();
    ctx.strokeStyle = rgba(MI.hyfeR, 0.85); ctx.lineWidth = 2.2; for (let q = 0; q < 5; q++) { ctx.beginPath(); ctx.moveTo(sx, yo + 8); ctx.quadraticCurveTo(sx + (q - 2) * 12, yo + 24, sx + (q - 2) * 24, yo + 40 + (q % 2) * 10); ctx.stroke(); }
    const R = w * 0.04 * (j === 1 ? 1 : 0.85) * sd, cx = sx + (j - 1) * 6, cy = top - R * 0.9, open = clamp(sporen - 1, 0, 1); tops.push([cx, cy, R]);
    const rs = miRng(31 + j); const sp = [];
    for (let i = 0; i < 40; i++) { const an = rs() * 6.283, rr = Math.sqrt(rs()) * R * 0.85; const vl = open * (50 + rs() * 300); sp.push([cx + Math.cos(an) * (rr + vl), cy + Math.sin(an) * (rr + vl) - open * rs() * 100]); }
    if (open < 0.6) { ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); shape(ctx, rgba(MI.sporZw, 0.95 * (1 - open / 0.6)), MI.sporZwR, 2); }
    for (const [px, py] of sp) circ(ctx, px, py, Math.max(2.4, hd * 0.55), open > 0.05 ? MI.sporZwR : '#2A3038', rgba('#9AA3B2', open > 0.05 ? 0.85 : 0.5), 1);
    ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.4, R * 0.42, R * 0.5, 0, 0, 6.283); ctx.strokeStyle = rgba(MI.hyfeR, 0.7); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); return { oppY: yo, kiem: [x0, yo + 10], zakjes: tops }; }

// SPORE (micro): rond, ± 5–10 µm, dikke wand, één kern. kiem 0..1: kiembuis groeit uit tot hyfe.
function miSpore(ctx, x, y, r, o = {}) { const { a = 1, kiem = 0, an = 0.6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kiem > 0.01) { const L = r * 6 * kiem; ctx.lineCap = 'round'; ctx.strokeStyle = MI.hyfeR; ctx.lineWidth = r * 0.9; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an) * L * 0.5 + r, y + Math.sin(an) * L * 0.5, x + Math.cos(an) * L, y + Math.sin(an) * L); ctx.stroke();
    ctx.strokeStyle = '#3E5A66'; ctx.lineWidth = r * 0.55; ctx.stroke(); }
  circ(ctx, x, y, r, MI.sporZwR, MI.hyfeR, Math.max(1.5, r * 0.14)); circ(ctx, x + r * 0.15, y - r * 0.1, r * 0.3, rgba(MI.rna, 0.9)); ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// VIRUSDEELTJE (micro). Recept (getallen.md): geen cel; eiwitmantel (capside) van herhaalde eiwitbouwstenen
// (capsomeren) om DNA óf RNA; sommige virussen hebben daaromheen een envelop (vetlaagje uit de gastheercel) met
// eiwitsteeltjes (griepvirus ± 80–120 nm, rond tot draadvormig). Verkoudheidsvirus (rhinovirus) ± 30 nm, zonder envelop.
// envelop = 0 → kale twintigvlakkige mantel (vooraanzicht = zeshoek met driehoekige vlakken); envelop = 1 → griepachtig.
// open 0..1: mantel half doorzichtig zodat het RNA (paars) zichtbaar is.
// Bekende fout: virus als bolletje met stekeltjes in bacteriekleur; virus met organellen of ribosomen.
// ---------------------------------------------------------------------------------------------
function miVirus(ctx, x, y, r, o = {}) { const { a = 1, t = 0, envelop = 0, open = 0, rot = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const rc = envelop > 0.5 ? r * 0.72 : r;
  if (envelop > 0.01) { ctx.save(); ctx.globalAlpha *= envelop; const n = 26; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.05 * Math.sin(i * 3.1); const c = Math.cos(an), s = Math.sin(an), L = r * (i % 3 === 0 ? 0.24 : 0.2);
      ctx.strokeStyle = i % 3 === 0 ? '#C9B896' : MI.mantelR; ctx.lineWidth = Math.max(2, r * 0.05); ctx.beginPath(); ctx.moveTo(c * r, s * r); ctx.lineTo(c * (r + L), s * (r + L)); ctx.stroke();
      circ(ctx, c * (r + L), s * (r + L), Math.max(2.2, r * (i % 3 === 0 ? 0.055 : 0.045)), i % 3 === 0 ? '#C9B896' : MI.mantelR); }
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, rgba('#E0C07A', 0.18), '#E8D29A', Math.max(2, r * 0.05)); ctx.beginPath(); ctx.arc(0, 0, r * 0.93, 0, 6.283); ctx.strokeStyle = rgba('#E8D29A', 0.6); ctx.lineWidth = Math.max(1.5, r * 0.03); ctx.stroke(); ctx.restore(); }
  // erfelijk materiaal (RNA of DNA, paars)
  ctx.save(); ctx.strokeStyle = MI.rna; ctx.lineWidth = Math.max(1.6, rc * 0.045); ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const u = i / 160 * 6.283 * 3; const rr = rc * (0.18 + 0.42 * Math.abs(Math.sin(u * 0.53 + 0.4))); const px = Math.cos(u * 1.7) * rr, py = Math.sin(u * 2.3) * rr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore();
  // eiwitmantel: zeshoek met capsomeren
  const hex = [...Array(6)].map((_, i) => [Math.cos(i / 6 * 6.283 + Math.PI / 6) * rc, Math.sin(i / 6 * 6.283 + Math.PI / 6) * rc]);
  const alf = 1 - 0.65 * open; ctx.beginPath(); hex.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = rgba(MI.mantel, 0.85 * alf); ctx.fill();
  ctx.strokeStyle = rgba(MI.mantelR, 0.55 * alf); ctx.lineWidth = Math.max(1, rc * 0.025); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(hex[i][0] * 0.38, hex[i][1] * 0.38); ctx.lineTo(hex[i][0], hex[i][1]); ctx.stroke(); }
  ctx.beginPath(); hex.forEach((p, i) => { const q = [p[0] * 0.38, p[1] * 0.38]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath(); ctx.stroke();
  // capsomeren als kralen op de vlakken
  const bead = Math.max(1.8, rc * 0.075); for (let ring = 1; ring <= 3; ring++) { const f = ring / 3.35; for (let i = 0; i < 6 * ring; i++) { const s = i / ring, k = Math.floor(s), u = s - k; const A = hex[k % 6], B = hex[(k + 1) % 6]; const px = (A[0] + (B[0] - A[0]) * u) * f, py = (A[1] + (B[1] - A[1]) * u) * f;
      circ(ctx, px, py, bead, rgba(hl > 0.01 ? _mixHex(MI.mantelR, '#E0B64A', hl) : MI.mantelR, 0.75 * alf)); } }
  ctx.beginPath(); hex.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.strokeStyle = hl > 0.01 ? _mixHex(MI.mantelR, '#E0B64A', hl) : MI.mantelR; ctx.lineWidth = Math.max(1.5, rc * 0.04); ctx.stroke();
  ctx.restore(); }

// BACTERIOFAAG (micro). Recept: kop = twintigvlak met DNA (± 50–100 nm), staart (koker), basisplaat met staartvezels.
function miFaag(ctx, x, y, s, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  miVirus(ctx, 0, -60, 44, { open: 0.2 }); roundRect(ctx, -9, -20, 18, 70, 6); shape(ctx, MI.mantel, MI.mantelR, 2); for (let i = 0; i < 6; i++) { ctx.strokeStyle = rgba(MI.mantelR, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-9, -12 + i * 10); ctx.lineTo(9, -12 + i * 10); ctx.stroke(); }
  roundRect(ctx, -22, 48, 44, 10, 4); shape(ctx, MI.mantel, MI.mantelR, 2); ctx.strokeStyle = MI.mantelR; ctx.lineWidth = 3; ctx.lineJoin = 'round';
  for (const sx of [-1, 1]) for (const k of [0, 1]) { ctx.beginPath(); ctx.moveTo(sx * (10 + k * 8), 56); ctx.lineTo(sx * (40 + k * 16), 86 + k * 6); ctx.lineTo(sx * (30 + k * 26), 124 + k * 4); ctx.stroke(); }
  ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// TWEEDELING (micro). Recept: een staafbacterie groeit tot ± 2× zijn lengte, kopieert zijn ringchromosoom, de twee
// kopieën schuiven uit elkaar, in het midden groeit een nieuwe wand naar binnen (insnoering) tot twee cellen.
// fase 0..1: 0–0.4 groeien + DNA kopiëren, 0.4–0.85 insnoeren, 0.85–1 los. Hergebruikt de vormtaal van bacterieCel.
// ---------------------------------------------------------------------------------------------
function miBacterie(ctx, x, y, L, o = {}) { const { a = 1, t = 0, rot = 0, fase = 0, plasmide = true, flagel = false, hl = {}, wandA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const g = ease(clamp(fase / 0.4, 0, 1)), ins = ease(clamp((fase - 0.4) / 0.45, 0, 1)), los = ease(clamp((fase - 0.85) / 0.15, 0, 1));
  const hw = L * 0.21, len = L * (1 + g), gap = los * hw * 0.6, wand = Math.max(4, hw * 0.16);
  // omtrek als profiel: capsule (halve cirkels aan de uiteinden) met een gladde insnoering in het midden
  const pad = (inset) => { const r = hw - inset; ctx.beginPath(); const N = 120;
    const caps = (cx, hl2) => { ctx.moveTo(cx - hl2 + r, -r); ctx.lineTo(cx + hl2 - r, -r); ctx.arc(cx + hl2 - r, 0, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(cx - hl2 + r, r); ctx.arc(cx - hl2 + r, 0, r, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); };
    if (ins > 0.995) { const hl2 = len / 4 - inset * 0.5; caps(-(len / 4 + gap / 2), hl2); caps(len / 4 + gap / 2, hl2); return; }
    const prof = (xx) => { const ax = Math.abs(xx), end = len / 2 - ax; let yy = r; if (end < r) yy = Math.sqrt(Math.max(0, r * r - (r - end) * (r - end)));
      const nk = 1 - ins * 0.97 * Math.exp(-Math.pow(ax / (r * 0.85), 2)); return yy * nk; };
    for (let i = 0; i <= N; i++) { const xx = -len / 2 + inset + (len - 2 * inset) * i / N; i ? ctx.lineTo(xx, -prof(xx)) : ctx.moveTo(xx, -prof(xx)); }
    for (let i = N; i >= 0; i--) { const xx = -len / 2 + inset + (len - 2 * inset) * i / N; ctx.lineTo(xx, prof(xx)); } ctx.closePath(); };
  if (flagel) { ctx.beginPath(); const fl = L * 1.8; for (let i = 0; i <= 60; i++) { const u = i / 60, d = u * fl; ctx.lineTo(-len / 2 - gap / 2 - d, Math.sin(d / (L * 0.4) * 6.283 - t * 8) * hw * 0.45 * Math.min(1, u * 4)); } ctx.strokeStyle = rgba(hl.flagel ? '#E0B64A' : '#F2F2EE', 0.8); ctx.lineWidth = 2.4; ctx.stroke(); }
  pad(0); shape(ctx, rgba(C.teal, 0.2 * wandA), rgba(hl.wand ? '#E0B64A' : '#7FB8D6', wandA), wand);
  pad(wand * 0.5 + 2); ctx.fillStyle = rgba('#7FC48F', 0.13); ctx.fill(); ctx.strokeStyle = hl.membraan ? '#E0B64A' : '#AFC0D0'; ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); pad(wand * 0.5 + 3); ctx.clip();
  const sch = lerp(0, len / 4 + gap / 2, ease(clamp((fase - 0.2) / 0.3, 0, 1))), kop = ease(clamp((fase - 0.1) / 0.25, 0, 1));
  for (let i = 0; i < 80; i++) { const px = (hash(i * 2.7 + 1) - 0.5) * (len + gap) * 0.94, py = (hash(i * 3.9 + 2) - 0.5) * hw * 1.6; circ(ctx, px, py, Math.max(1.8, hw * 0.05), hl.ribo ? '#E0B64A' : rgba('#C9B896', 0.85)); }
  const rx = Math.min(L * 0.26, len / 4 - hw * 0.15);
  const dna = (cx, al) => { ctx.beginPath(); for (let i = 0; i <= 160; i++) { const u = i / 160 * 6.283; const cr = hw * (0.09 + 0.035 * Math.sin(u * 3)); const px = cx + Math.cos(u) * rx + Math.cos(u * 21) * cr, py = Math.sin(u) * hw * 0.3 + Math.sin(u * 21) * cr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.strokeStyle = rgba(hl.dna ? '#E0B64A' : '#BBAFE0', 0.95 * al); ctx.lineWidth = 2.2; ctx.stroke(); };
  dna(-sch, 1); if (kop > 0.01) dna(sch, kop);
  if (plasmide) { const pl = (px, py, al) => { ctx.beginPath(); ctx.ellipse(px, py, hw * 0.13, hw * 0.1, 0.3, 0, 6.283); ctx.strokeStyle = rgba(hl.plasmide ? '#E0B64A' : '#BBAFE0', al); ctx.lineWidth = 2.2; ctx.stroke(); };
    pl(-(len + gap) * 0.38, hw * 0.45, 1); pl((len + gap) * 0.38, -hw * 0.45, kop); }
  ctx.restore(); ctx.restore(); return { lengte: len + gap, half: hw }; }

// GISTCEL hergebruik uit teken_bt1 (gistcel) — hier een eenvoudige versie met knop.
function miGist(ctx, x, y, r, o = {}) { const { a = 1, knop = 0.4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.86, 0.2, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), '#7FB8D6', 3);
  if (knop > 0.01) { const kr = r * 0.5 * knop; ctx.beginPath(); ctx.arc(x + r * 0.95, y - r * 0.45, kr, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), '#7FB8D6', 3); }
  circ(ctx, x - r * 0.15, y + r * 0.05, r * 0.3, rgba('#8C7BBF', 0.7), '#A392D6', 2); ctx.beginPath(); ctx.ellipse(x + r * 0.35, y + r * 0.25, r * 0.3, r * 0.22, 0, 0, 6.283); ctx.fillStyle = rgba('#5BA4C9', 0.25); ctx.fill();
  ctx.restore(); }

// SCHAALLADDER (schema): balk op log-schaal van 10 nm tot 100 µm met objecten erboven. items = [{naam, m (meter), kleur}]
function miLadder(ctx, x, y, w, items, o = {}) { const { a = 1, k = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const lo = -8, hi = -4, X = (m) => x + (Math.log10(m) - lo) / (hi - lo) * w;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  [['10 nm', 1e-8], ['100 nm', 1e-7], ['1 µm', 1e-6], ['10 µm', 1e-5], ['100 µm', 1e-4]].forEach(([s, m]) => { const px = X(m); ctx.beginPath(); ctx.moveTo(px, y - 8); ctx.lineTo(px, y + 8); ctx.stroke(); ctx.save(); ctx.font = fMeta(28); ctx.fillStyle = C.text2; ctx.textAlign = 'center'; ctx.fillText(s, px, y + 44); ctx.restore(); });
  items.forEach((it, i) => { const u = clamp(k * items.length - i, 0, 1); if (u <= 0) return; const px = X(it.m); ctx.save(); ctx.globalAlpha *= u; if (it.teken) it.teken(ctx, px, y - 70); naamBij(ctx, it.naam, '', px, y - 160, 1, 'center'); if (it.sub) { ctx.save(); ctx.font = fMeta(24); ctx.fillStyle = C.grain; ctx.textAlign = 'center'; ctx.fillText(it.sub, px, y - 126); ctx.restore(); } ctx.restore(); });
  ctx.restore(); }

// PETRISCHAAL (bovenaanzicht, Schema-lab). Recept: Ø ± 9 cm, deksel iets groter, voedingsbodem als vlak (oker-licht),
// kolonies als stipjes (teal/grijs, rond, glanzend randje), dicht = plakband (twee stroken) over de rand.
function miSchaal(ctx, x, y, r, o = {}) { const { a = 1, kol = 0, seed = 1, dicht = 1, label = '', n = 18 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r * 1.06, rgba('#AFC0D0', 0.08), '#AFC0D0', 2.5); circ(ctx, x, y, r * 0.97, '#B9A77A', rgba('#E8D9A8', 0.7), 1.5);
  const rnd = miRng(seed * 31 + 7); for (let i = 0; i < n; i++) { const u = clamp(kol * n - i, 0, 1); if (u <= 0) break; const an = rnd() * 6.283, rr = Math.sqrt(rnd()) * r * 0.82, kr = r * (0.03 + rnd() * 0.04) * u;
    circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, kr, '#C9D6DA', '#F2F2EE', 1.2); }
  if (dicht > 0.01) { ctx.save(); ctx.globalAlpha *= dicht; ctx.strokeStyle = rgba('#E0D6B8', 0.75); ctx.lineWidth = r * 0.16; for (const an of [0.4, 0.4 + Math.PI]) { ctx.beginPath(); ctx.arc(x, y, r * 1.06, an - 0.28, an + 0.28); ctx.stroke(); } ctx.restore(); }
  if (label) metaText(ctx, label, x, y + r * 1.06 + 44, C.grain, 'center', 28);
  ctx.restore(); }
// ZAKJE met boterham (dicht, plastic): boterham + doorzichtige rechthoek met sluitstrip.
function miZakje(ctx, x, y, w, o = {}) { const { a = 1, schimmel = [], label = '', droog = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  miBoterham(ctx, x, y + w * 0.05, w * 0.78, { schimmel, droog }); roundRect(ctx, x - w / 2, y - w * 0.55, w, w * 1.15, 14); shape(ctx, rgba('#DDE6EE', 0.1), rgba('#DDE6EE', 0.6), 2);
  ctx.fillStyle = rgba('#E07A5F', 0.7); ctx.fillRect(x - w / 2 + 6, y - w * 0.55 + 10, w - 12, 8);
  if (label) metaText(ctx, label, x, y + w * 0.6 + 44, C.grain, 'center', 28); ctx.restore(); }
// PADDENSTOEL met mycelium in de grond (Macro, doorsnede). Recept: hoed + steel boven de grond; in de grond een netwerk
// van witte draden dat veel verder reikt dan de paddenstoel breed is.
function miPaddenstoel(ctx, x, y, s, o = {}) { const { a = 1, draden = 1, alleenDraden = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (draden > 0.01) { const rnd = miRng(11); ctx.strokeStyle = rgba('#E8E4DA', 0.75 * draden); ctx.lineCap = 'round';
    const tak = (px, py, an, L, d) => { if (d > 4) return; let cx = px, cy = py; ctx.lineWidth = Math.max(1, 3.2 - d * 0.6) * s; ctx.beginPath(); ctx.moveTo(cx, cy); for (let i = 0; i < 6; i++) { an += (rnd() - 0.5) * 0.6; cx += Math.cos(an) * L / 6; cy += Math.sin(an) * L / 6; ctx.lineTo(cx, cy); } ctx.stroke();
      tak(cx, cy, an - 0.6, L * 0.7, d + 1); tak((px + cx) / 2, (py + cy) / 2, an + 0.7, L * 0.6, d + 1); };
    for (const an of [0.25, 0.9, 1.6, 2.3, 2.9]) tak(x, y + 6 * s, an, 140 * s * draden, 0); }
  if (alleenDraden) { ctx.restore(); return; }
  ctx.fillStyle = '#E8DCC2'; ctx.beginPath(); ctx.moveTo(x - 14 * s, y); ctx.quadraticCurveTo(x - 18 * s, y - 60 * s, x - 11 * s, y - 110 * s); ctx.lineTo(x + 11 * s, y - 110 * s); ctx.quadraticCurveTo(x + 18 * s, y - 60 * s, x + 14 * s, y); ctx.closePath(); shape(ctx, '#E8DCC2', '#F6EEDC', 2);
  ctx.beginPath(); ctx.moveTo(x - 80 * s, y - 104 * s); ctx.bezierCurveTo(x - 76 * s, y - 175 * s, x + 76 * s, y - 175 * s, x + 80 * s, y - 104 * s); ctx.quadraticCurveTo(x, y - 92 * s, x - 80 * s, y - 104 * s); shape(ctx, '#A8643C', '#C98458', 2);
  ctx.strokeStyle = rgba('#5A3A28', 0.5); ctx.lineWidth = 1.5; for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(x + i * 11 * s, y - 100 * s); ctx.lineTo(x + i * 5 * s, y - 108 * s); ctx.stroke(); }
  ctx.restore(); }

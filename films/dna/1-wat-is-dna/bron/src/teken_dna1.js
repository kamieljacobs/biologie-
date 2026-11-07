// Wat is DNA? 3.0 — eigen tekenhulpen (lichte remake, 26 okt 2026). Basevorm, nucleotide en ladder/helix komen uit
// bibliotheek/lib_bio.js (baseRing, baseBruggen, nucleotideRing, dnaLadderHelix, DNA_BASE). Micro zonder korrel (BEELDAFSPRAKEN).
function chMicro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
function chSchema(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function chSchaal(ctx, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(70, 840, px, 5); metaText(ctx, lab, 70 + px + 20, 851, C.text2, 'left', 28); ctx.restore(); }
function chMeta(ctx, s, a = 1, x = W - 70, al = 'right') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, 851, C.text2, al, 28); ctx.restore(); }
function term(ctx, s, x, y, a = 1, al = 'center', px = 48, kl = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, 700), kl, al); ctx.restore(); }
function dimLaag(ctx, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(C.bgSchema, 0.78); ctx.fillRect(0, 0, W, H); ctx.restore(); }
function ring(ctx, x, y, r, a = 1, kl = C.goud, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function kader(ctx, x, y, w, h, a = 1, kl = C.goud, lw = 3, r = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; roundRect(ctx, x, y, w, h, r); ctx.stroke(); ctx.restore(); }

// ---------- practicumlokaal (Macro, vlak) ----------
const VLOER = 846;
function lokaal(ctx) { ctx.fillStyle = '#20304C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#2F4268'; ctx.fillRect(0, VLOER - 10, W, 10); ctx.fillStyle = '#34405A'; ctx.fillRect(0, VLOER, W, H - VLOER);
  roundRect(ctx, 1380, 170, 360, 230, 8); shape(ctx, '#2C4A6E', '#3E5E86', 3); ctx.fillStyle = '#3E5E86'; ctx.fillRect(1557, 170, 6, 230); // raam
  roundRect(ctx, 60, 640, 760, 26, 6); shape(ctx, '#3E4E6E', '#56688C', 2); ctx.fillStyle = '#2C3A56'; ctx.fillRect(90, 666, 24, 180); ctx.fillRect(766, 666, 24, 180);
  roundRect(ctx, 120, 586, 170, 54, 6); shape(ctx, '#2A3A58', '#8FA0B5', 1.5); for (let i = 0; i < 4; i++) { roundRect(ctx, 136 + i * 38, 520, 20, 100, 9); shape(ctx, rgba('#AFC0D0', 0.25), '#AFC0D0', 1.5); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 640); ctx.lineTo(700, 540); ctx.quadraticCurveTo(700, 510, 670, 510); ctx.lineTo(650, 520); ctx.stroke();
  // flesjes: zout water, afwasmiddel, alcohol (op de tafel)
  [[360, '#5BA4C9', 'zout'], [430, '#7FC48F', 'zeep'], [500, '#AFC0D0', 'alcohol']].forEach(([x, k]) => { roundRect(ctx, x, 560, 44, 80, 8); shape(ctx, rgba(k, 0.35), lighten(k, 0.2), 1.5); roundRect(ctx, x + 12, 540, 20, 22, 4); shape(ctx, '#56688C', null); }); }

// reageerbuis met DNA-practicum: o.water (spoelwater met wangcellen), o.zeep, o.alc (alcohollaag), o.draad (0..1 groei van de witte draadjes)
function buisje(ctx, x, y, h, o = {}) { const { a = 1, water = 1, zeep = 1, alc = 1, draad = 1, t = 0 } = o; if (a <= 0.01) return; const w = h * 0.2;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-w / 2, -h); ctx.lineTo(-w / 2, -w / 2); ctx.arc(0, -w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(w / 2, -h); };
  ctx.save(); pad(); ctx.clip();
  const hw = h * 0.45 * water; if (hw > 1) { ctx.fillStyle = rgba(zeep > 0.5 ? '#C9D6E4' : '#9EC3D9', 0.22 + 0.14 * zeep); ctx.fillRect(-w, -hw, 2 * w, hw); }
  const ha = h * 0.33 * alc; if (ha > 1) { ctx.fillStyle = rgba('#AFC0D0', 0.12); ctx.fillRect(-w, -hw - ha, 2 * w, ha); ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-w, -hw); ctx.lineTo(w, -hw); ctx.stroke(); }
  if (draad > 0.01) { ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = Math.max(1.5, w * 0.05); ctx.lineCap = 'round';
    for (let k = 0; k < 7; k++) { ctx.beginPath(); let px = (hash(k * 3) - 0.5) * w * 0.7, py = -hw; ctx.moveTo(px, py); const n = Math.ceil(6 * draad);
      for (let q = 0; q < n; q++) { px += (hash(k * 11 + q) - 0.5) * w * 0.3 + Math.sin(t * 0.8 + k + q) * 0.8; py -= h * 0.035 * (0.6 + hash(k + q * 7)) * Math.min(1, draad * 6 - q); ctx.lineTo(px, py); } ctx.stroke(); } }
  ctx.restore();
  pad(); ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = Math.max(2, w * 0.06); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -h, w / 2 + 3, w * 0.12, 0, 0, 6.283); ctx.stroke();
  ctx.restore(); return { grens: [x, y - h * 0.45 * water] }; }

// ---------- wangcellen (uitstrijkje wangslijmvlies; cel ± 73 µm, kern ± 9 µm: Rom J Morphol Embryol 2010) ----------
function wangcellen(ctx, x, y, w, h, o = {}) {
  const { umPx = 5, a = 1, focus = -1, seed = 3, kernA = 1, focusA = 1 } = o; if (a <= 0.01) return [];
  const D = 73 * umPx, cols = Math.ceil(w / (D * 0.85)) + 1, rows = Math.ceil(h / (D * 0.8)) + 1, pts = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const k = r * 31 + c * 7 + seed * 13; pts.push([x + (c + 0.5 * (r % 2) + (hash(k) - 0.5) * 0.5) * D * 0.85, y + (r + (hash(k + 1) - 0.5) * 0.5) * D * 0.8]); }
  const cel = _bioVoronoi('wang' + seed + '_' + Math.round(D) + '_' + Math.round(x) + '_' + Math.round(y) + '_' + w, pts, D * 0.62, D * 0.06, 28);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const out = [];
  cel.forEach((cc, i) => { const P = cc.pts.map(([px, py], k) => { const j = hash(i * 17 + k * 3 + seed) - 0.5; return [px + j * D * 0.05, py + j * D * 0.04]; });
    ctx.beginPath(); bioPad(ctx, P, true); ctx.closePath(); shape(ctx, rgba('#AFC0D0', 0.16 + 0.06 * hash(i * 5 + seed)), rgba('#C9D6E4', 0.55), 1.5);
    ctx.strokeStyle = rgba('#C9D6E4', 0.22); ctx.lineWidth = 1.2; for (let k = 0; k < 2; k++) { const an = hash(i * 9 + k) * 6.283, L = D * (0.15 + 0.15 * hash(i + k * 5)); const px = cc.c[0] + Math.cos(an + 1) * D * 0.18, py = cc.c[1] + Math.sin(an + 1) * D * 0.18; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + Math.cos(an) * L * 0.5 + 6, py + Math.sin(an) * L * 0.5 - 6, px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
    const kx = cc.c[0] + (hash(i * 3 + seed) - 0.5) * D * 0.08, ky = cc.c[1] + (hash(i * 4 + seed) - 0.5) * D * 0.08, kr = 8.7 * umPx / 2;
    if (kernA > 0.01) { ctx.save(); ctx.globalAlpha *= kernA; ctx.beginPath(); ctx.ellipse(kx, ky, kr * 1.08, kr * 0.92, hash(i) * 3, 0, 6.283); shape(ctx, rgba(C.kern, 0.85), C.kernR, 1.2);
      for (let k = 0; k < 7; k++) { const an = hash(i * 7 + k) * 6.283, rr = kr * 0.6 * Math.sqrt(hash(i * 11 + k)); _bioCirc(ctx, kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, Math.max(0.8, kr * 0.12), rgba(C.kernR, 0.55)); } ctx.restore(); }
    if (i === focus && focusA > 0.01) { ctx.save(); ctx.globalAlpha *= focusA; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, P, true); ctx.closePath(); ctx.stroke(); ctx.restore(); }
    out.push({ c: cc.c, kern: [kx, ky], kr, P }); });
  ctx.restore(); return out;
}
let _wangInfo = null; // posities van het vaste uitstrijkje (umPx 9, seed 8) zonder te tekenen
function wangInfo() { if (!_wangInfo) { const c = document.createElement('canvas'); c.width = 8; c.height = 8; _wangInfo = wangcellen(c.getContext('2d'), 0, 0, W, 880, { umPx: 9, seed: 8 }); } return _wangInfo; }

// tennisbal (6,7 cm, ITF 6,54–6,86 cm)
function tennisbal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _bioCirc(ctx, x, y, r, '#C9D45C', '#E3EC8A', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = Math.max(2, r * 0.05); ctx.beginPath(); ctx.arc(x - r * 1.35, y, r, -0.75, 0.75); ctx.stroke(); ctx.beginPath(); ctx.arc(x + r * 1.35, y, r, Math.PI - 0.75, Math.PI + 0.75); ctx.stroke(); ctx.restore(); }

// lettertegel (Schema) in de basentint
function tegel(ctx, x, y, b, o = {}) { const { a = 1, w = 40, h = 60, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = DNA_BASE.base[b];
  roundRect(ctx, x, y, w, h, 7); shape(ctx, k, rand || lighten(k, 0.3), rand ? 3 : 1.2); text(ctx, b, x + w / 2, y + h * 0.66, fTekst(h * 0.5, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }

// plantje met wortels in de bodem (Schema); deeltjes fosfaat en nitraat (oker) stromen de wortel in
function plantje(ctx, x, y, s = 1, a = 1, t = 0, stroom = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#3A2E24'; ctx.fillRect(x - 260 * s, y, 520 * s, 210 * s); // bodem
  ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; const wortels = [[0, 170], [-80, 140], [70, 150], [-130, 90], [120, 100]];
  wortels.forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + dx * 0.4 * s, y + dy * 0.5 * s, x + dx * s, y + dy * s); ctx.stroke(); });
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 230 * s); ctx.stroke();
  [[-1, 80], [1, 140], [-1, 190]].forEach(([k, h]) => { ctx.beginPath(); ctx.ellipse(x + k * 52 * s, y - h * s, 54 * s, 20 * s, k * -0.5, 0, 6.283); shape(ctx, '#7FC48F', '#5FA86E', 1.5); });
  if (stroom > 0.01) for (let i = 0; i < 14; i++) { const w = wortels[i % 5], u = ((t * 0.35 + i / 14) % 1), dx = w[0] * s * (1 - u), dy = w[1] * s * (1 - u);
    ctx.globalAlpha = a * stroom * Math.min(1, u * 4); ctx.fillStyle = C.oker; ctx.beginPath(); ctx.arc(x + dx + (hash(i) - 0.5) * 30 * s, y + dy + (hash(i + 3) - 0.5) * 20 * s, 6 * s, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// thermometer (koraal = warmte)
function thermo(ctx, x, y, h, f, a = 1, lab = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 44, h, 22); shape(ctx, '#2A3A58', C.line, 1.5);
  const hh = (h - 20) * clamp(f, 0.06, 1); roundRect(ctx, x + 10, y + h - 10 - hh, 24, hh, 12); shape(ctx, C.koraal, null); _bioCirc(ctx, x + 22, y + h + 4, 26, C.koraal, C.line, 1.5);
  if (lab) text(ctx, lab, x - 18, y + h - 10 - hh + 12, fTekst(32, 600), C.koraal, 'right'); ctx.restore(); }

// handgetekende ladder van één stuk met losse sporten (Schema/Micro): top-streng seq, partners met alpha per index (pa(i)), sep schuift de strengen uit elkaar
function stukLadder(ctx, x0, y, dx, seq, o = {}) { const { s = 0.9, pa = () => 1, sep = 0, a = 1, hl = -1, bruggenA = 1, rugHl = 0 } = o; if (a <= 0.01) return; const n = seq.length;
  const span = (112 + 72) * s + 16 * s + 10, yT = y - sep * 60, yB = y + span + sep * 60;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const rail = (yy, al) => { ctx.save(); ctx.globalAlpha *= al; if (rugHl > 0.01) { ctx.strokeStyle = rgba(C.goud, rugHl); ctx.lineWidth = 26 * s; ctx.beginPath(); ctx.moveTo(x0 - dx * 0.5, yy); ctx.lineTo(x0 + dx * (n - 0.5), yy); ctx.stroke(); }
    ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 16 * s; ctx.beginPath(); ctx.moveTo(x0 - dx * 0.5, yy); ctx.lineTo(x0 + dx * (n - 0.5), yy); ctx.stroke(); ctx.strokeStyle = DNA_BASE.rug; ctx.lineWidth = 9 * s; ctx.stroke();
    for (let i = 0; i < n; i++) _bioCirc(ctx, x0 + dx * (i - 0.5), yy, 6 * s, '#5E4E96', '#A392D6', 1); ctx.restore(); };
  rail(yT, 1); const anyB = [...seq].some((_, i) => pa(i) > 0.01); if (anyB) rail(yB, Math.max(...[...seq].map((_, i) => pa(i))));
  for (let i = 0; i < n; i++) { const b = seq[i], c = DNA_BASE.comp[b], x = x0 + i * dx, p = pa(i);
    baseRing(ctx, x, yT + 8 * s, b, 1, { s, rand: i === hl ? C.goud : null });
    if (p > 0.01) { baseRing(ctx, x, yB - 8 * s + (1 - p) * 120, c, -1, { s, a: p });
      if (p > 0.98 && sep < 0.05) baseBruggen(ctx, x, yT + 8 * s + DNA_BASE.len * s, yB - 8 * s - DNA_BASE.len * s, b, s, bruggenA); } }
  ctx.restore(); return { yT, yB, span }; }

// kralenketting van nucleosomen die opvouwt (MOET 4 frisse review): op 0 = losse kralenketting langs een golf, op 1 = kralen dicht
// opeen in een spiraal (± 6 per winding, vezel ± 30 nm, vereenvoudigd). Klosje = histonschijf (grijsblauw) met ± 1,65 winding DNA (paars).
function kralenVouw(ctx, cx, cy, L, op, o = {}) { const { n = 14, R = 26, a = 1, t = 0 } = o; if (a <= 0.01) return []; const e = ease(op);
  const pts = []; for (let i = 0; i < n; i++) { const u = i / (n - 1);
    const xa = cx - L / 2 + u * L, ya = cy + Math.sin(u * 9 + 0.5) * R * 1.4; // los
    const th = i * 2 * Math.PI / 6, xb = cx - L * 0.18 + i * L * 0.36 / (n - 1) + Math.cos(th) * R * 0.25, yb = cy + Math.sin(th) * R * 1.9; // spiraal (zijaanzicht)
    pts.push([lerp(xa, xb, e), lerp(ya, yb, e), Math.cos(th) * e]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(2, R * 0.16); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); // linker-DNA
  const ord = pts.map((p, i) => i).sort((i, j) => pts[i][2] - pts[j][2]);
  ord.forEach(i => { const [x, y, z] = pts[i], sh = 0.75 + 0.25 * (z + 1) / 2; ctx.save(); ctx.globalAlpha *= sh;
    ctx.beginPath(); ctx.ellipse(x, y, R, R * 0.72, 0.3, 0, 6.283); shape(ctx, '#7A8BA8', '#A4B2CA', 1.2);
    ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.6, R * 0.14); ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R * 0.8, 0.3, -2.6, 2.6); ctx.stroke(); ctx.restore(); });
  ctx.restore(); return pts; }

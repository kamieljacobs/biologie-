// Variant C (ronde 2, 27 okt 2026) = B (weefselbeeld) + ruwe, gescheurde zijkanten aan de loslatende platen, bloed
// langs de scheuren en druppels onder de platen; geen plaat meer gedimd. Dikte 1–7 mm níet in beeld aangeduid
// (kan niet zonder tekst).
// =====================================================================================
// BAARMOEDERWAND (variant: weefselbeeld met cellen). Recept: spierlaag (myometrium, 1–2 cm) uit spoelvormige gladde
// spiercellen met één kern; slijmvlies: basale laag (blijft) en functionele laag (1 mm na de menstruatie → 5–7 mm);
// stroma = losse bindweefselcellen (kernen); klieren = buisjes bekleed met één laag cilindercellen rond een holte,
// die op het oppervlak openen, later kronkelend; spiraalslagaders kronkelen omhoog. Menstruatie: spiraalslagaders
// knijpen dicht, de functionele laag scheurt in platen die loslaten, kantelen en met bloed de holte in en weg
// (naar rechts = baarmoederhals) schuiven; de basale laag met de klierbodems blijft. Bron: Junqueira h. 22;
// Guyton h. 82; LibreTexts/OpenStax A&P 27.2. Bekende fouten: ballonnen boven de wand; klieren zonder holte.
// dikte 0..1, los 0..1, kronkel 0..1. Geeft { oppervlak, basaal, spier } terug.
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const sc = Math.min(1, h / 300), L = Math.max(0.6, sc), fijn = sc > 0.4;
  const spierH = h * 0.42, basaal = h * 0.07, fmax = h * 0.48; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH; const lf = clamp(los, 0, 1);
  const x0 = x - w / 2; ctx.beginPath(); ctx.rect(x0, y - h / 2 - h, w, h * 2.5); ctx.clip();
  // spierlaag: spoelcellen met kern
  ctx.save(); roundRect(ctx, x0, ys, w, spierH, 10 * sc); ctx.fillStyle = rgba(BIO.spier, 0.5); ctx.fill(); ctx.clip();
  const sw = 46 * sc, sh = 7 * sc;
  for (let r = 0; r * sh * 1.6 < spierH + sh; r++) for (let c = -1; c * sw < w + sw; c++) { const cx = x0 + (c + (r % 2) * 0.5) * sw + (hash(r * 31 + c) - 0.5) * 8 * sc, cy = ys + r * sh * 1.6 + 4 * sc;
    ctx.beginPath(); ctx.ellipse(cx, cy, sw * 0.48, sh * 0.62, 0.06 * Math.sin(r + c), 0, 6.283); shape(ctx, rgba(BIO.spierL, 0.28), fijn ? rgba(BIO.spierL, 0.5) : null, 0.8 * L);
    if (fijn) { ctx.beginPath(); ctx.ellipse(cx, cy, sw * 0.12, sh * 0.2, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); } }
  ctx.restore();
  // slijmvlies: basale laag + functionele laag als platen (scheuren bij los)
  const NP = 4, plaatB = w / NP;
  const nk = Math.max(5, Math.round(w / (90 * Math.max(sc, 0.5)))), klX = Array.from({ length: nk }, (_, k) => x0 + (k + 0.5) * w / nk);
  const klier = (kx, k, ytop) => { const pts = []; for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push([kx + Math.sin(u * 13 + k) * 8 * sc * kronkel * dikte, lerp(yba + basaal * 0.6, ytop, u)]); } return pts; };
  const tekenLaag = (clipFn) => {
    ctx.save(); clipFn(); ctx.clip(); ctx.fillStyle = rgba(BIO.slijm, 0.62); ctx.fillRect(x0, yf - 20, w, yba + basaal - yf + 20);
    if (fijn) { ctx.fillStyle = rgba('#7E3E4A', 0.55); for (let i = 0; i < Math.round(w * fH / 260); i++) { const px = x0 + hash(seed + i * 2.1) * w, py = lerp(yba + basaal, yf, hash(seed + i * 3.3)); ctx.beginPath(); ctx.ellipse(px, py, 2.6 * L, 1.6 * L, hash(i) * 3, 0, 6.283); ctx.fill(); } }
    klX.forEach((kx, k) => { const pts = klier(kx, k, yf); const bw = Math.max(2.5, (6 + 3 * kronkel * dikte) * sc);
      ctx.strokeStyle = rgba('#F2D6CC', 0.9); ctx.lineWidth = bw * 2.6; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
      ctx.strokeStyle = '#5E2A34'; ctx.lineWidth = bw * 0.9; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
      if (fijn) { ctx.fillStyle = rgba(BIO.kern, 0.85); for (let i = 1; i < 24; i += 2) { const p = pts[i], q = pts[i + 1]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]) + Math.PI / 2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(p[0] + Math.cos(an) * bw * 0.85 * sd, p[1] + Math.sin(an) * bw * 0.85 * sd, bw * 0.28, bw * 0.16, an, 0, 6.283); ctx.fill(); } } } });
    for (let k = 0; k < 5; k++) { const kx = x0 + (k + 1) * w / 6 + 20 * sc; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - lf * 0.4)); ctx.lineWidth = Math.max(1.5, 3.2 * sc); ctx.beginPath();
      for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys, yf + 8 * sc, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9 * sc; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
    ctx.restore(); };
  // basale laag (blijft altijd)
  tekenLaag(() => { ctx.beginPath(); ctx.rect(x0, yba, w, basaal); });
  ctx.fillStyle = rgba(BIO.slijmD, 0.35); ctx.fillRect(x0, yba, w, basaal);
  // functionele laag: NP platen; los = scheur, kantelen, wegschuiven naar rechts
  const naad = (i) => x0 + i * plaatB + (i > 0 && i < NP ? (hash(seed + i) - 0.5) * plaatB * 0.4 : 0);
  for (let p = 0; p < NP; p++) { const xa = naad(p), xb = naad(p + 1), dl = clamp(lf * 1.6 - hash(seed + p * 3) * 0.6, 0, 1);
    const til = ease(dl), dx = til * (0.15 + 0.25 * hash(p + 7)) * plaatB, dy = -til * fH * (0.12 + 0.12 * hash(p + 9)), rot = til * (hash(p + 4) - 0.3) * 0.35;
    ctx.save(); const cxp = (xa + xb) / 2, cyp = (yf + yba) / 2;
    ctx.translate(cxp + dx, cyp + dy); ctx.rotate(rot); ctx.translate(-cxp, -cyp);
    const rand = []; for (let i = 0; i <= 8; i++) { const u = i / 8; rand.push([lerp(xa, xb, u), yf + 5 * sc * Math.sin((lerp(xa, xb, u) - x0) / w * 6.283 * 3 + seed)]); }
    const onder = []; for (let i = 8; i >= 0; i--) { const u = i / 8; onder.push([lerp(xa, xb, u), yba - (dl > 0 ? 4 * sc * hash(p * 11 + i) : 0)]); }
    const scheur = (xs, sd) => { const pts = []; for (let i = 0; i <= 7; i++) { const u = i / 7; pts.push([xs + (dl > 0 ? sd * (hash(p * 31 + i * 7 + (sd > 0 ? 3 : 0)) - 0.5) * 16 * sc * Math.min(1, dl * 2) : 0), lerp(yf, yba, u)]); } return pts; }; // ruwe, gescheurde zijkant
    const L1 = scheur(xa, 1), R1 = scheur(xb, -1);
    const vorm = () => { ctx.beginPath(); ctx.moveTo(L1[L1.length - 1][0], L1[L1.length - 1][1]); [...L1.slice().reverse(), ...rand, ...R1, ...onder].forEach(q => ctx.lineTo(q[0], q[1])); ctx.closePath(); };
    tekenLaag(vorm); if (dl > 0) { vorm(); ctx.strokeStyle = rgba(BIO.bloed, 0.9); ctx.lineWidth = 2.2 * L; ctx.stroke();
      ctx.fillStyle = rgba(BIO.bloed, 0.85); for (let i = 0; i < 5; i++) { const q = onder[1 + Math.floor(hash(p * 13 + i) * 7)]; ctx.beginPath(); ctx.ellipse(q[0], q[1] + 3 * sc, 4 * sc, (3 + 6 * hash(p + i)) * sc * dl, 0, 0, 6.283); ctx.fill(); } }
    ctx.strokeStyle = rgba('#F6E2D6', 0.9); ctx.lineWidth = 3 * L; ctx.beginPath(); rand.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
    ctx.restore(); }
  // bloed op de wond en tussen de platen
  if (lf > 0.01) { ctx.save(); ctx.fillStyle = rgba(BIO.bloed, 0.8 * Math.min(1, lf * 2)); ctx.beginPath(); ctx.moveTo(x0, yba + 2);
    for (let i = 0; i <= 40; i++) { const xx = x0 + i / 40 * w; ctx.lineTo(xx, yba - (4 + 10 * hash(seed + i * 2.7)) * sc * Math.min(1, lf * 2)); } ctx.lineTo(x0 + w, yba + 2); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}

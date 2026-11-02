// Wat word jij? · Forensisch onderzoek 4 · Stille getuigen — eigen tekeningen (testvel, 1 nov 2026)
// Look: Schema op navy, Micro voor haar, stuifmeel en kiezelwier. Geen lichaam, geen wond (reeksbrief): longblaasje en bot
// alleen als los schema. Kleuren: goud = focus, oker = stuifmeel/bodem, groen = plant, teal = water, koraal = bloed/let op,
// paars alleen voor celkernen (haarwortel). Elke functie tekent rond (x, y) en neemt o.a (doorzichtigheid).
// Bronnen voor vorm en maat (zie ook getallen.md):
//  haar: Deedrick & Koch (FBI, B2/B3): mens merg < 1/3 van de dikte, vormloos, onderbroken of afwezig; dier > 1/3, doorlopend,
//        met cellen/vacuolen; schubjes plat en overlappend (imbricaat); hond: merg ± 50 % (Ahmed 2018, B4); uitgevallen haar
//        (telogeen) = knotsvormige wortel (B2); groeiend haar: wortel met veel cellen met een kern (SWGMAT, B1).
//  stuifmeel: gras (Poaceae) één porie (ulcus) met annulus en operculum, bolrond, 10–40 µm (PalDat Poa annua; Terni,
//        'Pollen morphology description – forensic palynology'); berk drie poriën op de evenaar, in poolaanzicht rond-
//        driehoekig, glad, 18–24 µm (PalDat Betula pendula; Terni); insectenstuifmeel vaak stekelig (echinaat, bv.
//        Asteraceae; Terni) en kleverig door pollenkitt, windstuifmeel droog en poederig (Hesse 1978, Plant Syst Evol 130).
//  hommel: aardhommel-werkster 11–17 mm, borststuk voor geel, achterlijf zwart met gele band en witte staart (DELTA Bombus
//        terrestris); bouw volgens insectZij (bibliotheek/dieren/lib_dieren.js): poten en vleugels aan het borststuk.
//  kiezelwier: schaal van kiezel in twee helften als een doosje; centrisch = rond, pennaat = bootvormig, rijen gaatjes
//        (striae), bij sommige een spleet (rafe) in de lengte (Landcare Research 'Diatom structure'; ADIAC B18: 10–100 µm).

const FO4 = {
  papier: '#ECE6D8', papierR: '#B8B0A0', inkt: '#1A2740', inkt2: '#5A6478',
  haar: '#8A5E40', haarL: '#B08A64', merg: '#2E211A', schub: '#D9C6A6',
  korrel: '#E3C46A', korrelL: '#F2DE98', korrelD: '#B8963E', insect: '#E6A84A', kleef: '#D98A2E',
  glas: '#CFE8EE', glasD: '#8FB8C4', plastide: '#B8893A',
  wand: '#D79A93', wandL: '#EDC3BC', wandD: '#B57872', bloed: '#C2453E', bloedL: '#E07A6A',
  kern: '#6E5A9E', kernL: '#A392D6', weefsel: '#E3A6A0',
  gras: '#A9BC5E', berk: '#C9A35C', struik: '#E07A5F', bloem: '#E58FA0',
  rubber: '#6E7480', middenzool: '#E6E2DA', stof: '#5A6478', grond: '#6A5240'
};
const _fo4dk = (h, k = 0.25) => _mixHex(h, '#000000', k), _fo4lt = (h, k = 0.25) => _mixHex(h, '#FFFFFF', k);
function _fo4laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// Catmull-Rom door punten (kopie van bioPad uit bibliotheek/lib_bio.js; bioPad zit niet in scenes_kop.js)
function fo4_pad(ctx, pts, closed = false) { const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]; const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]); } if (closed) ctx.closePath(); }
// schaalbalk in Micro: eenheid voluit (C10.4)
function fo4_schaal(ctx, x, y, len, tekst, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10); ctx.moveTo(x + len, y - 10); ctx.lineTo(x + len, y + 10); ctx.stroke();
  metaText(ctx, tekst, x + len / 2, y + 40, C.grain, 'center', 28); ctx.restore(); }

// =====================================================================================
// HAAR — lengtedoorsnede (zoals onder de lichtmicroscoop: doorvallend licht, merg donker omdat er lucht in zit).
// (x, y) = midden, horizontaal, o.len = lengte in px, s: dikte 90·s px. o.soort 'mens' | 'hond'.
// Mens: merg ± 0,16 van de dikte, vormloos, onderbroken (o.merg = 0: afwezig). Hond: merg ± 0,5, doorlopend, met cellen.
// Lagen van buiten naar binnen: schubjes (dun, licht, getand naar de punt), schors met pigmentkorrels, merg.
// Geeft ankers {schubjes, schors, merg}. Bekende fouten: merg even breed bij mens en hond; schubjes die naar de wortel wijzen.
// =====================================================================================
function fo4_haarLengte(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'mens', len = 700, merg = 1, schub = 1, seed = 3, punt = 1 } = o;
  const D = 90 * s, L = len, x0 = x - L / 2, x1 = x + L / 2, hond = soort === 'hond';
  const anker = { schubjes: [x, y - D / 2], schors: [x - L * 0.25, y - D * 0.28], merg: [x + L * 0.1, y] }; if (a <= 0.01) return anker;
  const kl = o.kleur || (hond ? '#9C7A56' : FO4.haar);
  ctx.save(); ctx.globalAlpha *= a;
  // schacht als vlak met licht golvende rand; de rand zelf is de schubjeslaag
  const rand = (sg) => { const P = []; for (let i = 0; i <= 60; i++) { const u = i / 60; P.push([x0 + u * L, y + sg * (D / 2 + Math.sin(u * 7 + seed) * D * 0.012)]); } return P; };
  const boven = rand(-1), onder = rand(1);
  const omtrek = () => { ctx.beginPath(); boven.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = onder.length - 1; i >= 0; i--) ctx.lineTo(onder[i][0], onder[i][1]); ctx.closePath(); };
  omtrek(); ctx.fillStyle = kl; ctx.fill();
  ctx.save(); omtrek(); ctx.clip();
  // pigmentkorrels in de schors: langwerpig, in de lengte gericht
  const nK = Math.round(L * D / 260);
  for (let i = 0; i < nK; i++) { const px = x0 + hash(i * 3 + seed) * L, py = y + (hash(i * 3 + 1 + seed) - 0.5) * D * 0.86;
    ctx.fillStyle = rgba(_fo4dk(kl, 0.5), 0.55 + 0.35 * hash(i + 9)); ctx.beginPath(); ctx.ellipse(px, py, (2.4 + 2.6 * hash(i * 7)) * s * (hond ? 1.5 : 1), 1.2 * s + 0.6, 0, 0, 6.283); ctx.fill(); }
  // merg
  if (merg > 0.01) { ctx.save(); ctx.globalAlpha *= merg;
    if (hond) { const h = D * 0.5; ctx.fillStyle = FO4.merg; roundRect(ctx, x0 - 10, y - h / 2, L + 20, h, h * 0.35); ctx.fill();
      // regelmatige cellen (vacuolen) in twee rijen, licht verschoven
      const cw = h * 0.42; for (let k = 0, xx = x0 + cw * 0.3; xx < x1 + cw; k++, xx += cw * 0.92) for (const r of [-1, 1]) {
        ctx.beginPath(); ctx.ellipse(xx + (r > 0 ? cw * 0.46 : 0), y + r * h * 0.22, cw * 0.38, h * 0.17, 0, 0, 6.283); ctx.fillStyle = '#5E4636'; ctx.fill(); } }
    else { const h = D * 0.16; let xx = x0 + hash(seed) * 30; let k = 0; // onderbroken, vormloos merg
      while (xx < x1) { const l = (30 + hash(k * 5 + seed) * 110) * s, gat = (18 + hash(k * 5 + 2 + seed) * 70) * s; const hh = h * (0.7 + 0.5 * hash(k + 4));
        ctx.beginPath(); fo4_pad(ctx, [[xx, y], [xx + l * 0.2, y - hh / 2], [xx + l * 0.6, y - hh * 0.6], [xx + l, y - hh * 0.1], [xx + l * 0.75, y + hh / 2], [xx + l * 0.3, y + hh * 0.45]], true); ctx.fillStyle = FO4.merg; ctx.fill();
        xx += l + gat; k++; } }
    ctx.restore(); }
  // schubjes: vage overlappende randen dwars over de schacht (imbricaat, open kant naar de punt = rechts)
  if (schub > 0.01) { ctx.save(); ctx.globalAlpha *= 0.32 * schub; ctx.strokeStyle = FO4.schub; ctx.lineWidth = 1.4;
    for (let xx = x0 + 10, k = 0; xx < x1; xx += D * (hond ? 0.34 : 0.42), k++) { ctx.beginPath(); const w = D * 0.09 * (0.7 + 0.6 * hash(k + seed));
      for (let j = 0; j <= 12; j++) { const v = j / 12, yy = y - D / 2 + v * D; const px = xx + Math.sin(v * Math.PI) * w * 2 + Math.sin(v * 9 + k) * w * 0.4; j ? ctx.lineTo(px, yy) : ctx.moveTo(px, yy); } ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  // schubjeslaag langs beide randen: lichte band met tandjes die naar de punt wijzen
  for (const sg of [-1, 1]) { ctx.save(); ctx.fillStyle = rgba(FO4.schub, 0.55); const th = D * 0.07;
    ctx.beginPath(); const P = sg < 0 ? boven : onder; P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = P.length - 1; i >= 0; i--) ctx.lineTo(P[i][0], P[i][1] - sg * th); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = rgba(FO4.schub, 0.7); ctx.lineWidth = 1.1; ctx.beginPath(); const st = D * 0.2;
    for (let xx = x0; xx < x1 - st; xx += st) { const yy = y + sg * D / 2; ctx.moveTo(xx, yy); ctx.lineTo(xx + st * 0.85, yy + sg * D * 0.02); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker; }

// HAAR — dwarsdoorsnede. (x, y) = midden, r = straal. Mens: rond tot iets ovaal, klein merg of geen; hond: merg ± de helft.
function fo4_haarDwars(ctx, x, y, r, o = {}) { const { a = 1, soort = 'mens', merg = 1, seed = 5 } = o; if (a <= 0.01) return; const hond = soort === 'hond';
  const kl = o.kleur || (hond ? '#9C7A56' : FO4.haar); ctx.save(); ctx.globalAlpha *= a;
  const ry = r * (o.ovaal || 1);
  ctx.beginPath(); ctx.ellipse(x, y, r, ry, 0, 0, 6.283); ctx.fillStyle = rgba(FO4.schub, 0.7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, r * 0.9, ry * 0.9, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  // schubjes als dunne ringen (meerdere lagen over elkaar)
  ctx.strokeStyle = rgba(FO4.schub, 0.8); ctx.lineWidth = 1; for (const k of [0.95, 0.925]) { ctx.beginPath(); ctx.ellipse(x, y, r * k, ry * k, 0, 0, 6.283); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, r * 0.9, ry * 0.9, 0, 0, 6.283); ctx.clip();
  for (let i = 0; i < Math.round(r * r / 70); i++) { const an = hash(i * 2 + seed) * 6.283, d = Math.sqrt(hash(i * 2 + 1 + seed)) * r * 0.86; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * (ry / r), 1.2 + 1.6 * hash(i + 3), rgba(_fo4dk(kl, 0.5), 0.7)); }
  ctx.restore();
  if (merg > 0.01) { ctx.save(); ctx.globalAlpha *= merg;
    if (hond) { const R = r * 0.5; ctx.beginPath(); ctx.ellipse(x, y, R, R * (ry / r), 0, 0, 6.283); ctx.fillStyle = FO4.merg; ctx.fill();
      const P = [[0, 0], [0.55, 0], [-0.55, 0], [0.28, 0.5], [-0.28, 0.5], [0.28, -0.5], [-0.28, -0.5]]; P.forEach(([u, v]) => { ctx.beginPath(); ctx.ellipse(x + u * R, y + v * R * (ry / r), R * 0.2, R * 0.18, 0, 0, 6.283); ctx.fillStyle = '#5E4636'; ctx.fill(); }); }
    else { const R = r * 0.16; ctx.beginPath(); fo4_pad(ctx, [[x - R, y], [x - R * 0.3, y - R * 1.1], [x + R * 0.9, y - R * 0.5], [x + R * 0.8, y + R * 0.7], [x - R * 0.2, y + R]], true); ctx.fillStyle = FO4.merg; ctx.fill(); }
    ctx.restore(); }
  ctx.restore(); }

// HAARWORTEL. (x, y) = wortelpunt, schacht loopt naar rechts (o.len), dikte 60·s. o.soort 'groeiend' | 'uitgevallen'.
// Groeiend (eruit getrokken, groeifase): wortel iets verbreed en vervormd, met weefsel eromheen vol cellen met een kern (paars).
// Uitgevallen (rustfase): knotsje: ronde, verhoornde verdikking met een borsteltje vezels, (bijna) geen kernen.
// o.kernen 0..1 = kernen zichtbaar (voor een opbouw), o.hl = gouden rand om de wortel. Geeft {wortel, schacht}.
function fo4_haarWortel(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'groeiend', len = 420, kernen = 1, hl = 0, seed = 2 } = o;
  const D = 60 * s, kl = o.kleur || FO4.haar, groei = soort === 'groeiend';
  const anker = { wortel: [x + (groei ? 70 : 30) * s, y], schacht: [x + len * 0.7, y] }; if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // schacht
  const xs = x + (groei ? 150 : 46) * s; roundRect(ctx, xs - 10, y - D / 2, x + len - xs + 10, D, 4); ctx.fillStyle = kl; ctx.fill();
  ctx.fillStyle = rgba(FO4.schub, 0.5); ctx.fillRect(xs - 10, y - D / 2, x + len - xs + 10, D * 0.07); ctx.fillRect(xs - 10, y + D / 2 - D * 0.07, x + len - xs + 10, D * 0.07);
  for (let i = 0; i < 60; i++) circ(ctx, xs + hash(i + seed) * (x + len - xs), y + (hash(i * 3 + seed) - 0.5) * D * 0.8, 1.5, rgba(_fo4dk(kl, 0.5), 0.7));
  if (groei) {
    // weefsel (wortelschede) om het onderste deel: zacht roze, vol cellen
    const W = [[x - 8 * s, y], [x + 10 * s, y - 52 * s], [x + 80 * s, y - 62 * s], [x + 160 * s, y - 44 * s], [x + 190 * s, y - 34 * s], [x + 190 * s, y + 34 * s], [x + 160 * s, y + 46 * s], [x + 80 * s, y + 64 * s], [x + 10 * s, y + 54 * s]];
    ctx.beginPath(); fo4_pad(ctx, W, true); ctx.fillStyle = rgba(FO4.weefsel, 0.85); ctx.fill();
    // de wortel zelf: schacht die smaller en lichter wordt, met een verbrede, zachte onderkant
    ctx.beginPath(); fo4_pad(ctx, [[x + 6 * s, y], [x + 30 * s, y - 34 * s], [x + 100 * s, y - 30 * s], [x + 160 * s, y - D / 2], [x + 160 * s, y + D / 2], [x + 100 * s, y + 30 * s], [x + 30 * s, y + 34 * s]], true);
    ctx.fillStyle = _mixHex(kl, FO4.weefsel, 0.45); ctx.fill();
    // cellen met kern in het weefsel (polygonen met afgeronde hoeken)
    if (kernen > 0.01) { ctx.save(); ctx.beginPath(); fo4_pad(ctx, W, true); ctx.clip();
      const P = []; for (let i = 0; i < 46; i++) P.push([x + (hash(i * 5 + seed) * 196 - 6) * s, y + (hash(i * 5 + 1 + seed) - 0.5) * 120 * s]);
      P.forEach(([px, py], i) => { const rr = (8 + 3 * hash(i + 7)) * s; ctx.save(); ctx.globalAlpha *= kernen;
        ctx.beginPath(); ctx.ellipse(px, py, rr * 1.15, rr, hash(i) * 3, 0, 6.283); ctx.strokeStyle = rgba(FO4.wandD, 0.55); ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(px, py, rr * 0.45, rr * 0.38, hash(i + 2) * 3, 0, 6.283); ctx.fillStyle = FO4.kern; ctx.fill(); ctx.strokeStyle = FO4.kernL; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); });
      ctx.restore(); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); fo4_pad(ctx, W, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  } else {
    // knotsje: ronde verdikking, lichter (verhoornd, weinig pigment), met vezels als borsteltje naar de schacht
    const R = D * 0.78, cx = x + R;
    ctx.beginPath(); fo4_pad(ctx, [[x, y], [x + R * 0.25, y - R * 0.85], [cx + R * 0.4, y - R * 0.95], [cx + R * 1.3, y - D * 0.5], [cx + R * 1.3, y + D * 0.5], [cx + R * 0.4, y + R * 0.95], [x + R * 0.25, y + R * 0.85]], true);
    ctx.fillStyle = '#C9A77E'; ctx.fill(); ctx.strokeStyle = _fo4lt('#C9A77E', 0.3); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = rgba(_fo4dk(kl, 0.2), 0.7); ctx.lineWidth = 1.4; for (let i = 0; i < 9; i++) { const v = (i / 8 - 0.5) * D * 0.8; ctx.beginPath(); ctx.moveTo(cx - R * 0.2, y + v * 1.25); ctx.quadraticCurveTo(cx + R * 0.6, y + v * 1.1, cx + R * 1.4, y + v * 0.85); ctx.stroke(); }
    // meestal weinig kernen: hooguit één vage
    if (kernen > 0.01 && o.eenKern !== false) { ctx.save(); ctx.globalAlpha *= kernen * 0.7; ctx.beginPath(); ctx.ellipse(x + R * 0.55, y + R * 0.2, 5 * s, 4 * s, 0.4, 0, 6.283); ctx.fillStyle = FO4.kern; ctx.fill(); ctx.restore(); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.ellipse(cx, y, R * 1.25, R * 1.15, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  }
  ctx.restore(); return anker; }

// =====================================================================================
// STUIFMEELKORRELS (Micro). (x, y) = midden, r = straal in px. soort 'gras' | 'berk' | 'insect'.
// Gras: bolrond, één porie met een verdikte ring (annulus) en dekseltje (operculum), fijn korrelig oppervlak.
// Berk: in poolaanzicht rond-driehoekig met drie poriën op de hoeken, die iets uitsteken; glad.
// Insect: stekels rondom (echinaat, zoals Asteraceae), drie spleetjes; o.kleef 0..1 = kleverig laagje (pollenkitt).
// Even grote korrels: echt 10–40 µm, gras iets groter dan berk. Bekende fouten: berk met één porie, gras met stekels.
// =====================================================================================
function fo4_korrel(ctx, x, y, r, soort = 'gras', o = {}) { const { a = 1, rot = 0, kleef = 0, hl = 0, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const vul = soort === 'insect' ? FO4.insect : FO4.korrel, rand = _fo4lt(vul, 0.35), donker = _fo4dk(vul, 0.3);
  const vlek = (pad) => { ctx.save(); pad(); ctx.clip(); ctx.beginPath(); ctx.ellipse(-r * 0.25, -r * 0.28, r * 0.55, r * 0.45, -0.5, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.fill(); ctx.restore(); };
  if (soort === 'gras') {
    const pad = () => { ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.92, 0, 0, 6.283); };
    pad(); ctx.fillStyle = vul; ctx.fill(); vlek(pad);
    ctx.save(); pad(); ctx.clip(); for (let i = 0; i < Math.round(r * 1.6); i++) { const an = hash(i * 2 + seed) * 6.283, d = Math.sqrt(hash(i * 2 + 1 + seed)) * r; circ(ctx, Math.cos(an) * d, Math.sin(an) * d, Math.max(0.8, r * 0.025), rgba(donker, 0.45)); } ctx.restore();
    pad(); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    // porie met annulus en operculum, iets uit het midden (heteropolair)
    const px = r * 0.38, py = -r * 0.3, ra = r * 0.22; circ(ctx, px, py, ra, donker); circ(ctx, px, py, ra * 0.62, _fo4dk(vul, 0.55)); circ(ctx, px, py, ra * 0.28, _fo4lt(vul, 0.1));
  } else if (soort === 'berk') {
    const H = []; for (let k = 0; k < 3; k++) H.push(-Math.PI / 2 + k * 2.094);
    const pts = []; for (let i = 0; i < 60; i++) { const an = i / 60 * 6.283; let rr = r * (0.86 + 0.12 * Math.cos(3 * (an + Math.PI / 2))); for (const h of H) { const d = Math.atan2(Math.sin(an - h), Math.cos(an - h)); rr += r * 0.1 * Math.exp(-d * d / 0.02); } pts.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
    const pad = () => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
    pad(); ctx.fillStyle = vul; ctx.fill(); vlek(pad); pad(); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    for (const h of H) { const qx = Math.cos(h) * r * 0.86, qy = Math.sin(h) * r * 0.86; // porie op een schildje (aspis)
      ctx.beginPath(); ctx.ellipse(qx, qy, r * 0.2, r * 0.13, h + Math.PI / 2, 0, 6.283); ctx.fillStyle = donker; ctx.fill(); ctx.beginPath(); ctx.ellipse(qx + Math.cos(h) * r * 0.03, qy + Math.sin(h) * r * 0.03, r * 0.09, r * 0.06, h + Math.PI / 2, 0, 6.283); ctx.fillStyle = _fo4dk(vul, 0.6); ctx.fill(); }
  } else {
    const N = 22, pad = () => { ctx.beginPath(); ctx.arc(0, 0, r * 0.84, 0, 6.283); };
    if (kleef > 0.01) { ctx.save(); ctx.globalAlpha *= kleef; ctx.beginPath(); fo4_pad(ctx, Array.from({ length: 12 }, (_, i) => { const an = i / 12 * 6.283, rr = r * (1.12 + 0.1 * Math.sin(i * 2.3 + seed)); return [Math.cos(an) * rr, Math.sin(an) * rr]; }), true); ctx.fillStyle = rgba(FO4.kleef, 0.55); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = vul; for (let i = 0; i < N; i++) { const an = i / N * 6.283 + seed; ctx.beginPath(); ctx.moveTo(Math.cos(an - 0.13) * r * 0.82, Math.sin(an - 0.13) * r * 0.82); ctx.lineTo(Math.cos(an) * r * 1.06, Math.sin(an) * r * 1.06); ctx.lineTo(Math.cos(an + 0.13) * r * 0.82, Math.sin(an + 0.13) * r * 0.82); ctx.closePath(); ctx.fill(); }
    pad(); ctx.fillStyle = vul; ctx.fill(); vlek(pad); pad(); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    // stekels op het oppervlak, regelmatig verdeeld (van boven gezien: stip met lichte punt)
    ctx.save(); pad(); ctx.clip(); for (const [d, m] of [[0.32, 6], [0.6, 12]]) for (let i = 0; i < m; i++) { const an = i / m * 6.283 + d * 3 + seed; const px = Math.cos(an) * d * r, py = Math.sin(an) * d * r; circ(ctx, px, py, r * 0.055, _fo4dk(vul, 0.18)); circ(ctx, px, py, r * 0.022, rand); } ctx.restore();
    // drie spleetjes (plooien met porie) op de evenaar: smalle lensjes
    ctx.fillStyle = _fo4dk(vul, 0.45); for (let k = 0; k < 3; k++) { const an = -Math.PI / 2 + k * 2.094 + 1.047; ctx.beginPath(); ctx.ellipse(Math.cos(an) * r * 0.62, Math.sin(an) * r * 0.62, r * 0.2, r * 0.045, an + Math.PI / 2, 0, 6.283); ctx.fill(); }
    if (kleef > 0.01) { ctx.save(); ctx.globalAlpha *= kleef; ctx.fillStyle = rgba(FO4.kleef, 0.7); for (let k = 0; k < 4; k++) { const an = hash(k + seed * 3) * 6.283; ctx.beginPath(); ctx.ellipse(Math.cos(an) * r * 0.5, Math.sin(an) * r * 0.5, r * 0.14, r * 0.09, an, 0, 6.283); ctx.fill(); } ctx.restore(); }
  }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(0, 0, r * 1.22, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// klontje insectenstuifmeel: korrels die door pollenkitt aan elkaar plakken (o.n 3–7)
function fo4_klontje(ctx, x, y, r, o = {}) { const { a = 1, n = 5, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = [[0, 0], [1.55, 0.25], [-1.5, 0.35], [0.4, -1.45], [-0.9, -1.3], [0.9, 1.4], [-0.6, 1.5]].slice(0, n);
  ctx.beginPath(); fo4_pad(ctx, P.map(([u, v], i) => [x + u * r * 1.05 + Math.cos(i * 2) * r * 0.5, y + v * r * 1.05 + Math.sin(i * 2) * r * 0.5]), true); ctx.fillStyle = rgba(FO4.kleef, 0.45); ctx.fill();
  P.forEach(([u, v], i) => fo4_korrel(ctx, x + u * r, y + v * r, r * 0.82, 'insect', { kleef: 0.8, seed: seed + i, rot: i }));
  ctx.restore(); }
// wolk windstuifmeel (gras en berk): droog en los, waait met de wind mee naar rechts. u 0..1 = hoe ver, t = tijd (zweven)
function fo4_stuifwolk(ctx, x, y, o = {}) { const { a = 1, u = 1, t = 0, n = 70, ver = 900, r = 6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const f = hash(i * 7 + 1); if (f > u) continue; const d = f * ver, spread = 30 + d * 0.32; const w = wander(i, t, 10, 0.6);
    const px = x + d + w.x, py = y - d * 0.12 + (hash(i * 7 + 3) - 0.5) * 2 * spread + w.y; const gras = i % 2 === 0;
    ctx.save(); ctx.globalAlpha *= 1 - 0.55 * (d / ver);
    if (gras) { circ(ctx, px, py, r, FO4.korrel); circ(ctx, px + r * 0.35, py - r * 0.3, r * 0.3, FO4.korrelD); }
    else { ctx.beginPath(); for (let k = 0; k < 3; k++) { const an = -Math.PI / 2 + k * 2.094 + i; ctx.lineTo(px + Math.cos(an) * r * 1.05, py + Math.sin(an) * r * 1.05); ctx.lineTo(px + Math.cos(an + 1.047) * r * 0.85, py + Math.sin(an + 1.047) * r * 0.85); } ctx.closePath(); ctx.fillStyle = _fo4dk(FO4.korrel, 0.08); ctx.fill(); }
    ctx.restore(); }
  ctx.restore(); }

// =====================================================================================
// HOMMEL (aardhommel-werkster, zijaanzicht, kop naar rechts). Bouw uit insectZij (bibliotheek/dieren/lib_dieren.js, bij):
// drie lichaamsdelen, zes gelede poten en vier vleugels aan het borststuk, geknikte antenne vóór het oog. Hommel ronder en
// harig: borststuk voor geel, achter zwart; achterlijf zwart met gele band en witte staart (DELTA). Echt 11–17 mm.
// Eenheid 0,1 mm: s = 1 → 150 px. o.houding 'staan' | 'vliegen' | 'bestuiven' (zweven, korfjes vol stuifmeel), t = tijd.
// (x, y): bij 'staan' de grond onder het midden, anders het midden van het borststuk. Geeft {kop, borst, achterlijf}.
// =====================================================================================
function _fo4insPoot(ctx, H, F, lf, lt, kleur, w, voetDir) { // kopie van _insPoot (lib_dieren.js): 2-bots-IK, knie boven
  const dx = F[0] - H[0], dy = F[1] - H[1]; let d = Math.hypot(dx, dy); const dm = (lf + lt) * 0.98; let Fx = F[0], Fy = F[1];
  if (d > dm) { Fx = H[0] + dx / d * dm; Fy = H[1] + dy / d * dm; d = dm; }
  const an = Math.atan2(Fy - H[1], Fx - H[0]), b = Math.acos(clamp((lf * lf + d * d - lt * lt) / (2 * lf * d), -1, 1));
  const k1 = [H[0] + Math.cos(an - b) * lf, H[1] + Math.sin(an - b) * lf], k2 = [H[0] + Math.cos(an + b) * lf, H[1] + Math.sin(an + b) * lf], K = k1[1] < k2[1] ? k1 : k2;
  ctx.lineCap = 'round'; ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(K[0], K[1]); ctx.stroke();
  ctx.lineWidth = w * 0.75; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(Fx, Fy); ctx.stroke();
  ctx.lineWidth = w * 0.5; ctx.beginPath(); ctx.moveTo(Fx, Fy); ctx.lineTo(Fx + voetDir * lt * 0.4, Fy + 1); ctx.stroke(); return [K, [Fx, Fy]]; }
function fo4_hommel(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, stuifmeel = null } = o; const houding = o.houding || 'staan'; const vliegt = houding !== 'staan';
  const M = (px, py) => [x + px * s * kijk, y + py * s]; const lift = vliegt ? 0 : -46;
  const anker = { kop: M(40, -40 - lift - 46 + 46), borst: M(0, -46 - lift + 46), achterlijf: M(-52, -40 - lift + 46) };
  if (a <= 0.01) return anker; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.translate(0, vliegt ? 0 : -46); ctx.lineJoin = 'round';
  const ZW = '#231E1C', ZW2 = '#3A3230', GEEL = '#E8C04A', WIT = '#EEE8DC', POOT = '#2E2624';
  const slag = vliegt ? Math.sin(t * Math.PI * 2 * 3) : 0;
  const vleugel = (ver) => { ctx.save(); ctx.translate(-2, -22); const hoek = vliegt ? -0.4 - slag * 0.8 : 0.1; ctx.rotate(hoek);
    const V = [[2, -2], [-28, -12], [-70, -14], [-90, -6], [-84, 4], [-46, 5], [-6, 4]], A = [[-8, 2], [-38, 3], [-58, 8], [-52, 14], [-28, 11], [-8, 6]];
    for (const [pts, al] of [[A, 0.3], [V, 0.36]]) { ctx.beginPath(); fo4_pad(ctx, pts, true); ctx.fillStyle = `rgba(190,196,206,${ver ? al * 0.7 : al})`; ctx.fill(); ctx.strokeStyle = 'rgba(150,150,150,0.7)'; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.strokeStyle = 'rgba(90,80,70,0.7)'; ctx.lineWidth = 1.1; for (const [ex, ey] of [[-74, -9], [-56, -2], [-36, 2]]) { ctx.beginPath(); ctx.moveTo(-4, 0); ctx.quadraticCurveTo(ex * 0.5, -8, ex, ey); ctx.stroke(); }
    ctx.restore(); };
  const heup = [[14, 14], [2, 18], [-10, 16]], lf = [16, 18, 24], lt = [16, 19, 26];
  const poten = (ver) => { const kl = ver ? '#1A1614' : POOT; for (let i = 0; i < 3; i++) { const H = [heup[i][0] - (ver ? 3 : 0), heup[i][1] - (ver ? 1 : 0)]; let F;
      if (vliegt) F = [H[0] - 4 - (i - 1) * 6, H[1] + lf[i] * 0.95 + (houding === 'bestuiven' ? 6 : 0)];
      else F = [[30, 46], [4, 46], [-30, 46]][i].map((v, k) => v + (ver && k === 0 ? 5 : 0));
      const [K, Fp] = _fo4insPoot(ctx, H, F, lf[i], lt[i], kl, 3.4, i === 2 ? -1 : 1);
      // haartjes op de poten
      ctx.strokeStyle = rgba('#6A5E54', 0.7); ctx.lineWidth = 0.8; for (let k = 1; k < 4; k++) { const px = lerp(K[0], Fp[0], k / 4), py = lerp(K[1], Fp[1], k / 4); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 4, py - 2); ctx.stroke(); }
      if (i === 2) { const vol = stuifmeel == null ? (houding === 'bestuiven' ? 1 : 0.4) : stuifmeel; if (vol > 0.05) { const kx = (K[0] + Fp[0]) / 2, ky = (K[1] + Fp[1]) / 2; ctx.beginPath(); ctx.ellipse(kx, ky, 4 + vol * 4, 6 + vol * 4, 0.5, 0, 6.283); ctx.fillStyle = ver ? '#B8892E' : '#E8B840'; ctx.fill(); } } } };
  const harig = (cx, cy, rx, ry, rot, kleur, n) => { ctx.strokeStyle = kleur; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const an = i / n * 6.283, r1 = 0.96, r2 = 1.05 + 0.04 * hash(i * 3);
      const ca = Math.cos(an), sa = Math.sin(an), cr = Math.cos(rot), sr = Math.sin(rot); const p = (k) => [cx + (ca * rx * k) * cr - (sa * ry * k) * sr, cy + (ca * rx * k) * sr + (sa * ry * k) * cr]; const [ax, ay] = p(r1), [bx, by] = p(r2); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); } };
  vleugel(true); poten(true);
  // achterlijf: zwart, gele band, witte staart (staart naar links)
  ctx.save(); ctx.translate(-52, 6); ctx.rotate(0.18); const AL = (k = 1) => { ctx.beginPath(); ctx.ellipse(0, 0, 42 * k, 32 * k, 0, 0, 6.283); };
  harig(0, 0, 42, 32, 0, ZW2, 70); AL(); ctx.fillStyle = ZW; ctx.fill();
  ctx.save(); AL(); ctx.clip(); ctx.fillStyle = GEEL; ctx.fillRect(14, -40, 13, 80); ctx.fillStyle = WIT; ctx.fillRect(-50, -40, 24, 80); ctx.restore();
  ctx.restore();
  // borststuk: rond, voor geel, achter zwart
  harig(0, 0, 28, 27, 0, ZW2, 60); ctx.beginPath(); ctx.ellipse(0, 0, 28, 27, 0, 0, 6.283); ctx.fillStyle = ZW; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 28, 27, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = GEEL; ctx.beginPath(); ctx.ellipse(16, -2, 18, 34, 0.2, 0, 6.283); ctx.fill(); ctx.restore();
  // kop met groot facetoog, geknikte antenne vóór het oog, kaken
  ctx.beginPath(); fo4_pad(ctx, [[30, -10], [40, -18], [50, -12], [54, 4], [48, 16], [36, 14], [28, 4]], true); ctx.fillStyle = ZW; ctx.fill();
  ctx.beginPath(); ctx.ellipse(40, -2, 5.5, 10, -0.2, 0, 6.283); ctx.fillStyle = '#0E0C0B'; ctx.fill(); ctx.beginPath(); ctx.ellipse(38.5, -6, 1.6, 3, -0.2, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill();
  ctx.strokeStyle = ZW; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(47, -12); ctx.lineTo(52, -30); ctx.lineTo(68, -24); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(50, 14); ctx.quadraticCurveTo(55, 20, 52, 25); ctx.stroke();
  poten(false); vleugel(false);
  ctx.restore(); return anker; }

// =====================================================================================
// BLOEIENDE STRUIK (insectenbestoven; de film noemt geen soort). Keuring ronde 4 (Kamiel 2 nov 2026): rozenachtige struik
// met losse bloemetjes, geen rododendron. Boogvormige takken met doorntjes, samengestelde bladeren (5 deelblaadjes),
// losse open bloemen met vijf brede kroonbladen en een geel hart (meeldraden), een paar knoppen. Koraal/roze.
// (x, yb) = voet op de grond, s = schaal (s = 1 → ± 360 px breed, 300 px hoog). Geen zichtbare wortels (BEELDAFSPRAKEN).
// o.klontjes 0..1 = kleverige stuifmeelklontjes in de bloemharten. Geeft de bloemposities (voor de hommel).
// =====================================================================================
function _fo4bloem(ctx, x, y, r, col) { for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.48, y + Math.sin(an) * r * 0.48, r * 0.56, r * 0.42, an, 0, 6.283); ctx.fillStyle = i === 0 ? _fo4lt(col, 0.12) : col; ctx.fill(); }
  ctx.fillStyle = _fo4dk(col, 0.35); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + (k - 1.5) * r * 0.16, y - r * 0.5 + Math.abs(k - 1.5) * r * 0.06, r * 0.06, 0, 6.283); ctx.fill(); } circ(ctx, x, y, r * 0.16, _fo4lt(col, 0.45)); }
// open rozenbloem van voren: vijf brede, licht hartvormige kroonbladen die overlappen, geel hart met een krans meeldraden
function _fo4roos(ctx, x, y, r, col, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.save(); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.25, -r * 0.55, r * 1.05, -r * 0.62, r * 1.02, -r * 0.05); ctx.quadraticCurveTo(r * 0.98, r * 0.08, r * 0.9, r * 0.12);
    ctx.bezierCurveTo(r * 1.0, r * 0.62, r * 0.25, r * 0.55, 0, 0); ctx.fillStyle = i % 2 ? col : _fo4lt(col, 0.1); ctx.fill(); ctx.strokeStyle = _fo4dk(col, 0.18); ctx.lineWidth = Math.max(1, r * 0.04); ctx.stroke(); ctx.restore(); }
  circ(ctx, 0, 0, r * 0.3, '#E8C04A'); ctx.fillStyle = '#C9962E'; for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; circ(ctx, Math.cos(an) * r * 0.24, Math.sin(an) * r * 0.24, r * 0.05, '#B8862A'); }
  circ(ctx, 0, 0, r * 0.11, '#9AA84E'); ctx.restore(); }
function _fo4knop(ctx, x, y, r, col, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, -r * 0.6, r * 0.42, r * 0.7, 0, 0, 6.283); ctx.fillStyle = _fo4dk(col, 0.1); ctx.fill();
  ctx.fillStyle = '#5E8A4A'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(d * r * 0.55, -r * 0.4, d * r * 0.2, -r * 0.95); ctx.quadraticCurveTo(d * r * 0.1, -r * 0.4, 0, 0); ctx.fill(); } ctx.restore(); }
// samengesteld blad: steeltje met 5 gezaagde deelblaadjes (2 paar + topblaadje)
function _fo4samBlad(ctx, x, y, L, an, col) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = _fo4dk(col, 0.15); ctx.lineWidth = Math.max(1.2, L * 0.03); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L * 0.82, 0); ctx.stroke();
  const deel = (px, py, l, a2) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a2); ctx.beginPath(); const w = l * 0.32; ctx.moveTo(0, 0);
      for (let k = 0; k <= 6; k++) { const u = k / 6, yy = -Math.sin(u * Math.PI) * w - (k % 2 ? 0 : w * 0.12) * Math.sin(u * Math.PI); ctx.lineTo(u * l, yy); }
      for (let k = 6; k >= 0; k--) { const u = k / 6, yy = Math.sin(u * Math.PI) * w + (k % 2 ? 0 : w * 0.12) * Math.sin(u * Math.PI); ctx.lineTo(u * l, yy); } ctx.closePath(); ctx.fillStyle = col; ctx.fill();
      ctx.strokeStyle = _fo4lt(col, 0.2); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(l * 0.05, 0); ctx.lineTo(l * 0.9, 0); ctx.stroke(); ctx.restore(); };
  deel(L * 0.3, 0, L * 0.36, -1.05); deel(L * 0.3, 0, L * 0.36, 1.05); deel(L * 0.56, 0, L * 0.38, -0.95); deel(L * 0.56, 0, L * 0.38, 0.95); deel(L * 0.8, 0, L * 0.42, 0);
  ctx.restore(); }
// takken: [startdx, eind dx, eind dy, buiging] (boogvorm, rozen hangen over)
const _FO4TAK = [[-10, -175, -150, -0.6], [-4, -120, -235, -0.35], [2, -40, -285, -0.15], [6, 45, -295, 0.15], [10, 125, -240, 0.35], [12, 180, -150, 0.6], [-6, -70, -190, -0.3], [8, 85, -200, 0.3]];
function fo4_struik(ctx, x, yb, s = 1, o = {}) { const { a = 1, bloei = 1, klontjes = 0, kleur = FO4.bloem } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; const tros = [];
  const BL = '#4F7E4A', BL2 = '#3F6E44';
  const pt = (T, u) => { const [x0, ex, ey, b] = T; const cx = x + (x0 + ex * 0.2 + b * 120) * s, cy = yb + ey * 0.85 * s; const p0 = [x + x0 * s, yb], p2 = [x + ex * s, yb + ey * s];
    return [(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * cx + u * u * p2[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * cy + u * u * p2[1]]; };
  // takken met doorntjes
  _FO4TAK.forEach((T, i) => { ctx.strokeStyle = '#6E6A3E'; ctx.lineCap = 'round'; ctx.lineWidth = (6 - (i > 5 ? 1.5 : 0)) * s; ctx.beginPath(); for (let k = 0; k <= 16; k++) { const p = pt(T, k / 16); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
    ctx.fillStyle = '#8A6A44'; for (let k = 3; k < 15; k += 2) { const p = pt(T, k / 16), q = pt(T, (k + 1) / 16), an = Math.atan2(q[1] - p[1], q[0] - p[0]) + (k % 4 ? 1 : -1) * 1.2; ctx.beginPath(); ctx.moveTo(p[0] + Math.cos(an + 1.57) * 2.5 * s, p[1] + Math.sin(an + 1.57) * 2.5 * s); ctx.lineTo(p[0] + Math.cos(an) * 9 * s, p[1] + Math.sin(an) * 9 * s); ctx.lineTo(p[0] - Math.cos(an + 1.57) * 2.5 * s, p[1] - Math.sin(an + 1.57) * 2.5 * s); ctx.fill(); } });
  // samengestelde bladeren langs de takken
  _FO4TAK.forEach((T, i) => { for (let k = 4; k <= 15; k += 2) { const u = k / 16, p = pt(T, u), q = pt(T, u + 0.03), an = Math.atan2(q[1] - p[1], q[0] - p[0]); const kant = (k / 2) % 2 ? 1 : -1;
      _fo4samBlad(ctx, p[0], p[1], (52 + 14 * hash(i * 9 + k)) * s, an + kant * (0.9 + 0.3 * hash(i + k)), (i + k) % 3 ? BL : BL2); } });
  // losse bloemen en knoppen
  if (bloei > 0.01) { ctx.save(); ctx.globalAlpha *= bloei;
    _FO4TAK.forEach((T, i) => { const pos = i > 5 ? [0.7] : [0.55, 0.98]; pos.forEach((u, j) => { const p = pt(T, u); const r = (i > 5 ? 22 : 26 + 4 * hash(i + j)) * s;
        if ((i + j) % 4 === 3) { _fo4knop(ctx, p[0], p[1], r * 0.9, kleur, (T[3]) * 1.2); return; }
        _fo4roos(ctx, p[0], p[1], r, kleur, hash(i * 3 + j) * 1.2); tros.push([p[0], p[1]]);
        if (klontjes > 0.01) { ctx.save(); ctx.globalAlpha *= klontjes; for (let q = 0; q < 3; q++) { const an = q * 2.1 + i; circ(ctx, p[0] + Math.cos(an) * r * 0.16, p[1] + Math.sin(an) * r * 0.16, 4 * s, FO4.insect); circ(ctx, p[0] + Math.cos(an) * r * 0.16 + 2.5 * s, p[1] + Math.sin(an) * r * 0.16 + 2 * s, 3 * s, FO4.kleef); } ctx.restore(); } }); });
    ctx.restore(); }
  ctx.restore(); return tros; }

// =====================================================================================
// SCHOEN (sneaker, zijaanzicht, neus naar rechts). (x, y) = grond onder het midden, s = 1 → 300 px lang.
// Zool met profiel (noppen), middenzool licht, bovenwerk, veters. o.vies 0..1 = aarde aan de zool.
// =====================================================================================
function fo4_schoen(ctx, x, y, s = 1, o = {}) { const { a = 1, vies = 0, kleur = '#4E6A8A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // loopzool met noppen
  ctx.fillStyle = FO4.rubber; for (let i = 0; i < 11; i++) { const nx = -138 + i * 26; ctx.fillRect(nx, -6, 15, 6); }
  ctx.beginPath(); fo4_pad(ctx, [[-148, -6], [-150, -20], [-60, -22], [80, -22], [146, -18], [152, -8], [140, -6]], true); ctx.fillStyle = FO4.rubber; ctx.fill();
  // middenzool
  ctx.beginPath(); fo4_pad(ctx, [[-150, -20], [-152, -44], [-80, -40], [40, -38], [130, -34], [150, -20], [60, -20]], true); ctx.fillStyle = FO4.middenzool; ctx.fill();
  // bovenwerk
  ctx.beginPath(); fo4_pad(ctx, [[-146, -40], [-150, -92], [-126, -128], [-86, -122], [-50, -118], [-10, -96], [40, -74], [100, -60], [142, -46], [140, -34], [40, -38], [-80, -40]], true); ctx.fillStyle = kleur; ctx.fill();
  ctx.beginPath(); fo4_pad(ctx, [[60, -38], [100, -62], [140, -48], [146, -34]], true); ctx.fillStyle = _fo4lt(kleur, 0.18); ctx.fill(); // neus
  ctx.beginPath(); fo4_pad(ctx, [[-146, -42], [-150, -92], [-112, -96], [-100, -42]], true); ctx.fillStyle = _fo4dk(kleur, 0.2); ctx.fill(); // hielstuk
  ctx.beginPath(); ctx.moveTo(-130, -126); ctx.quadraticCurveTo(-104, -110, -76, -120); ctx.lineWidth = 6; ctx.strokeStyle = _fo4dk(kleur, 0.45); ctx.stroke(); // instap
  ctx.strokeStyle = '#E6E2DA'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const vx = -58 + i * 22, vy = -112 + i * 11; ctx.beginPath(); ctx.moveTo(vx - 8, vy - 6); ctx.lineTo(vx + 12, vy + 8); ctx.moveTo(vx - 8, vy + 8); ctx.lineTo(vx + 12, vy - 4); ctx.stroke(); }
  if (vies > 0.01) { ctx.save(); ctx.globalAlpha *= vies; ctx.fillStyle = FO4.grond; for (let i = 0; i < 10; i++) { const nx = -125 + i * 26; ctx.beginPath(); ctx.ellipse(nx, -3, 7, 3.5, 0, 0, 6.283); ctx.fill(); } // aarde in de groeven
    for (let i = 0; i < 5; i++) { const nx = -110 + i * 58 + hash(i) * 14; ctx.beginPath(); ctx.ellipse(nx, -1, 16 + hash(i + 2) * 10, 4, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// SCHOENZOOL MET LAAGJES (uitvergroot): doorsnede van een stuk loopzool, onderkant naar boven (zoals de onderzoeker hem
// bekijkt), met de noppen als blokken. In de groeven en erbovenop liggen laagjes stof met stuifmeel: de oudste diep in de
// groef, de laatste plek bovenop en het dikst (Riding 2007, B16: de laatste plek overheerst). (x, y) = midden onderkant
// rubber, w = breedte (± 900). o.lagen = [{kl, d}] van oud naar nieuw (d in px), o.groei 0..1 voor de bovenste laag,
// o.slijt 0..1 = oudere lagen boven de groef vallen af. Geeft {boven: punt boven de bovenste laag}.
function fo4_zool(ctx, x, y, w = 900, o = {}) { const { a = 1, groei = 1, slijt = 0 } = o; const lagen = o.lagen || [{ kl: '#7A8494', d: 14 }, { kl: '#A88B5E', d: 16 }, { kl: '#6E9A5A', d: 44 }];
  const x0 = x - w / 2, nN = 6, nb = w / nN, nopB = nb * 0.62, nopH = 60, basH = 36; const top0 = y - basH; // bovenkant zoolplaat
  const anker = { boven: [x, top0 - nopH] }; if (a <= 0.01) return anker; ctx.save(); ctx.globalAlpha *= a;
  // rubber: zoolplaat + noppen (één silhouet)
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0, top0);
  for (let i = 0; i < nN; i++) { const cx = x0 + nb * (i + 0.5); ctx.lineTo(cx - nopB / 2, top0); ctx.lineTo(cx - nopB / 2 + 6, top0 - nopH); ctx.lineTo(cx + nopB / 2 - 6, top0 - nopH); ctx.lineTo(cx + nopB / 2, top0); }
  ctx.lineTo(x0 + w, top0); ctx.lineTo(x0 + w, y); ctx.closePath(); ctx.fillStyle = FO4.rubber; ctx.fill();
  ctx.fillStyle = FO4.middenzool; ctx.fillRect(x0, y, w, 26); // middenzool eronder
  // laagjes: vullen eerst de groeven, dan over de noppen heen
  let lvl = 0; // hoogte boven top0
  lagen.forEach((L, i) => { const nieuw = i === lagen.length - 1; let d = L.d * (nieuw ? groei : 1); if (d <= 0.3) return;
    const h0 = lvl, h1 = lvl + d; const boven = Math.max(0, h1 - nopH) - Math.max(0, h0 - nopH); // deel boven de noppen
    // in de groeven (altijd blijft dat zitten)
    const g0 = Math.min(h0, nopH), g1 = Math.min(h1, nopH);
    if (g1 > g0) for (let k = 0; k <= nN; k++) { const gx0 = k === 0 ? x0 : x0 + nb * (k - 0.5) + nopB / 2 - 6 * (g1 / nopH), gx1 = k === nN ? x0 + w : x0 + nb * (k + 0.5) - nopB / 2 + 6 * (g1 / nopH); if (gx1 <= gx0) continue;
      ctx.fillStyle = L.kl; ctx.fillRect(gx0, top0 - g1, gx1 - gx0, g1 - g0); }
    // boven de noppen: doorlopende laag, golvend; oudere lagen slijten hier weg
    if (boven > 0.3) { const bb = boven * (nieuw ? 1 : 1 - slijt); if (bb > 0.3) { const b0 = Math.max(nopH, h0); ctx.beginPath(); ctx.moveTo(x0, top0 - b0);
      for (let k = 0; k <= 40; k++) { const u = k / 40; ctx.lineTo(x0 + u * w, top0 - b0 - bb - Math.sin(u * 11 + i) * Math.min(4, bb * 0.2)); } ctx.lineTo(x0 + w, top0 - b0); ctx.closePath(); ctx.fillStyle = L.kl; ctx.fill(); } }
    // stuifmeelkorreltjes in de laag (in de groeven en erboven)
    for (let k = 0; k < Math.round(w * d / 900); k++) { const px = x0 + hash(k * 3 + i * 17) * w, hh = h0 + hash(k * 3 + 1 + i * 17) * d; const inNop = hh < nopH && Math.abs(((px - x0) % nb) - nb / 2) < nopB / 2 - 4; if (inNop) continue; if (hh > nopH && !nieuw && slijt > 0.5) continue;
      circ(ctx, px, top0 - hh, 2.6, rgba(FO4.korrelL, 0.8)); }
    lvl = h1; });
  anker.boven = [x, top0 - Math.max(nopH, lvl) - 10]; ctx.restore(); return anker; }

// =====================================================================================
// STAAFDIAGRAM 'MENGSEL': per plek één gestapelde staaf met het aandeel gras, berk en struik. Verzonnen casuswaarden, geen
// getallen in beeld. (x, y) = linksboven, w × h = vlak. o.staven = [{naam, delen:[gras, berk, struik]}], o.groei 0..1,
// o.hl = index met gouden rand, o.dim = lijst indexen op 35 %.
// =====================================================================================
// keuring ronde 4 + frisse review: schoen duidelijk dichter bij de achtertuin dan bij de straat, maar niet gelijk ('iets beter')
const FO4_MENGSEL = [{ naam: 'SCHOEN', delen: [0.42, 0.36, 0.22] }, { naam: 'ACHTERTUIN', delen: [0.32, 0.36, 0.32] }, { naam: 'VOORTUIN', delen: [0.55, 0.45, 0] }, { naam: 'STRAAT\nVERDACHTE', delen: [0.64, 0.36, 0] }];
function fo4_mengsel(ctx, x, y, w, h, o = {}) { const { a = 1, groei = 1, hl = -1, dim = [], legenda = 1 } = o; const st = o.staven || FO4_MENGSEL; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  metaText(ctx, 'MENGSEL', x, y + 28, C.grain, 'left', 28);
  const base = y + h - 80, top = y + 70, bw = Math.min(120, w / st.length * 0.45), kl = [FO4.gras, FO4.berk, FO4.struik];
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x + w, base); ctx.stroke();
  st.forEach((S, i) => { const cx = x + w * (i + 0.5) / st.length; ctx.save(); if (dim.includes(i)) ctx.globalAlpha *= 0.35; let yy = base;
    S.delen.forEach((d, k) => { const hh = (base - top) * d * clamp(groei * 1.2 - i * 0.07, 0, 1); if (hh < 0.5) return; ctx.fillStyle = kl[k]; ctx.fillRect(cx - bw / 2, yy - hh, bw, hh); ctx.fillStyle = rgba(C.bgSchema, 0.6); ctx.fillRect(cx - bw / 2, yy - hh, bw, 2); yy -= hh; });
    if (hl === i) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.strokeRect(cx - bw / 2 - 6, yy - 6, bw + 12, base - yy + 6); }
    S.naam.split('\n').forEach((r, j) => metaText(ctx, r, cx, base + 40 + j * 34, hl === i ? C.goud : C.text, 'center', 28)); ctx.restore(); });
  if (legenda > 0.01) { ctx.save(); ctx.globalAlpha *= legenda; ['GRAS', 'BERK', 'STRUIK'].forEach((n, k) => { const lx = x + w - 3 * 200 + k * 200 + 10, ly = y + 18; ctx.fillStyle = kl[k]; roundRect(ctx, lx, ly - 18, 26, 26, 5); ctx.fill(); metaText(ctx, n, lx + 38, ly + 4, C.text2, 'left', 28); }); ctx.restore(); }
  ctx.restore(); }

// =====================================================================================
// KIEZELWIER (Micro): schaaltje van kiezel (glas), twee helften als een doosje; van boven (klepaanzicht).
// soort 'boot' (pennaat, zoals Navicula: spits ovaal, rafe met knopje in het midden, rijen gaatjes dwars), 'schijf'
// (centrisch, zoals Cyclotella: rond, rijen gaatjes vanuit het midden), 'staaf' (pennaat zonder rafe, zoals Ulnaria).
// o.levend 0..1 = goudbruine bladgroenkorrels binnenin (na het zuur: alleen het lege schaaltje). s = 1: boot 120 px lang.
// =====================================================================================
function fo4_kiezelwier(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'boot', levend = 0, rot = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const lw = 1.8 / Math.max(0.4, s);
  if (soort === 'schijf') { const R = 50;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.fillStyle = rgba(FO4.glas, 0.22); ctx.fill(); ctx.strokeStyle = FO4.glas; ctx.lineWidth = lw * 1.4; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, R * 0.9, 0, 6.283); ctx.lineWidth = lw * 0.7; ctx.strokeStyle = rgba(FO4.glas, 0.6); ctx.stroke();
    if (levend > 0.01) { ctx.save(); ctx.globalAlpha *= levend; for (let i = 0; i < 7; i++) { const an = i / 7 * 6.283 + 0.3, d = i % 2 ? R * 0.5 : R * 0.6; ctx.beginPath(); ctx.ellipse(Math.cos(an) * d, Math.sin(an) * d, 9, 6, an, 0, 6.283); ctx.fillStyle = FO4.plastide; ctx.fill(); } ctx.restore(); }
    for (let k = 0; k < 28; k++) { const an = k / 28 * 6.283; for (let j = 0; j < 5; j++) { const d = R * (0.42 + j * 0.115); circ(ctx, Math.cos(an) * d, Math.sin(an) * d, 2.1, FO4.glasD); } }
    circ(ctx, 0, 0, R * 0.12, null, rgba(FO4.glas, 0.6), lw * 0.7);
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(0, 0, R + 10, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4 / s; ctx.stroke(); ctx.restore(); }
  } else { const staaf = soort === 'staaf'; const L = staaf ? 100 : 60, B = staaf ? 10 : 17;
    const omtrek = () => { ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50 * 2 - 1; const w = staaf ? B * (0.85 + 0.25 * Math.exp(-Math.pow((Math.abs(u) - 0.94) / 0.05, 2))) * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), 12))) : B * Math.pow(Math.max(0, 1 - u * u), 0.72); ctx.lineTo(u * L, -w); }
      for (let i = 50; i >= 0; i--) { const u = i / 50 * 2 - 1; const w = staaf ? B * (0.85 + 0.25 * Math.exp(-Math.pow((Math.abs(u) - 0.94) / 0.05, 2))) * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), 12))) : B * Math.pow(Math.max(0, 1 - u * u), 0.72); ctx.lineTo(u * L, w); } ctx.closePath(); };
    omtrek(); ctx.fillStyle = rgba(FO4.glas, 0.22); ctx.fill(); ctx.strokeStyle = FO4.glas; ctx.lineWidth = lw * 1.4; ctx.stroke();
    if (levend > 0.01) { ctx.save(); ctx.globalAlpha *= levend; omtrek(); ctx.clip(); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * B * 0.45, L * 0.7, B * 0.32, 0, 0, 6.283); ctx.fillStyle = FO4.plastide; ctx.fill(); } ctx.restore(); }
    // rijen gaatjes (striae) dwars op de lengte, licht uitwaaierend
    ctx.save(); omtrek(); ctx.clip(); const stap = staaf ? 6 : 5.2;
    for (let xx = -L + stap; xx < L; xx += stap) { for (const sg of [-1, 1]) { const n = staaf ? 2 : 4; for (let j = 0; j < n; j++) { const yy = sg * (staaf ? 2 + j * 3 : 3.5 + j * 3.4); circ(ctx, xx + sg * xx * 0.0 + (staaf ? 0 : (yy / B) * xx * 0.06), yy, staaf ? 1.1 : 1.3, FO4.glasD); } } }
    ctx.restore();
    if (!staaf) { ctx.strokeStyle = FO4.glas; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(-L * 0.92, 0); ctx.lineTo(-3, 0); ctx.moveTo(3, 0); ctx.lineTo(L * 0.92, 0); ctx.stroke(); // rafe
      ctx.beginPath(); ctx.ellipse(0, 0, 4, 6, 0, 0, 6.283); ctx.fillStyle = rgba(FO4.glas, 0.6); ctx.fill(); circ(ctx, -L * 0.92, 0, 2.2, FO4.glas); circ(ctx, L * 0.92, 0, 2.2, FO4.glas); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.ellipse(0, 0, L + 10, B + 10, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4 / s; ctx.stroke(); ctx.restore(); }
  }
  ctx.restore(); }
// druppel plaswater vol kiezelwieren (levend, ze drijven langzaam rond). (x, y) = midden van het bolle deel, r = straal.
function fo4_druppel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, n = 16, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); ctx.moveTo(x, y - r * 1.7); ctx.bezierCurveTo(x + r * 0.45, y - r * 0.9, x + r, y - r * 0.3, x + r, y + r * 0.1); ctx.arc(x, y + r * 0.1, r, 0, Math.PI); ctx.bezierCurveTo(x - r, y - r * 0.3, x - r * 0.45, y - r * 0.9, x, y - r * 1.7); ctx.closePath(); };
  pad(); ctx.fillStyle = rgba(C.teal, 0.28); ctx.fill();
  ctx.save(); pad(); ctx.clip(); const S = ['boot', 'schijf', 'staaf', 'boot'];
  for (let i = 0; i < n; i++) { const w = wander(i + 30, t, r * 0.06, 0.3); const an = hash(i * 5) * 6.283, d = Math.sqrt(hash(i * 5 + 1)) * r * 0.82;
    fo4_kiezelwier(ctx, x + Math.cos(an) * d + w.x, y + r * 0.1 + Math.sin(an) * d * 0.95 + w.y, r / 440 * (0.8 + 0.4 * hash(i + 2)) * (S[i % 4] === 'schijf' ? 0.75 : 1), { soort: S[i % 4], levend, rot: hash(i * 5 + 3) * 3.1 }); }
  ctx.restore(); pad(); ctx.strokeStyle = _fo4lt(C.teal, 0.35); ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x - r * 0.42, y - r * 0.15, r * 0.12, r * 0.24, -0.4, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.18); ctx.fill(); ctx.restore(); }

// =====================================================================================
// LONGBLAASJE MET SCHEURTJE (los schema, niet op een mens). Eén blaasje vol water, met daartegen een haarvat; op de plek
// waar ze elkaar raken een scheurtje. o.u 0..1: één kiezelwier gaat door het scheurtje (0–0,5) en drijft met het bloed mee
// (0,5–1). o.scheur 0..1, o.water 0..1, t = tijd (bloedcellen stromen). Kleuren wand en bloed uit longblaasje() in lib_bio.js.
// Niet op schaal: echt is een blaasje ± 200 µm en een haarvat ± 8 µm. (x, y) = midden blaasje, s = 1 → r 170.
// Geeft ankers {blaasje, haarvat, scheur}.
// =====================================================================================
function fo4_longblaasje(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, u = 0, scheur = 1, water = 1, n = 6 } = o;
  const R = 170 * s, th = 12 * s, ca = 0.75, cx = x + Math.cos(ca) * R, cy = y + Math.sin(ca) * R; // contactpunt rechtsonder
  const nx = Math.cos(ca), ny = Math.sin(ca), tx = -ny, ty = nx, hw = 26 * s; // tangent: richting van het vat
  const mx = cx + nx * hw, my = cy + ny * hw; // middellijn haarvat
  const anker = { blaasje: [x - R * 0.3, y - R * 0.3], haarvat: [mx + tx * 200 * s, my + ty * 200 * s], scheur: [cx, cy] }; if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const gat = 0.13 * scheur; // halve hoek van het scheurtje
  // haarvat: buis langs het blaasje, bloed stroomt van linksonder naar rechtsboven
  const P0 = [mx - tx * 300 * s, my - ty * 300 * s], P1 = [mx + tx * 330 * s, my + ty * 330 * s];
  ctx.strokeStyle = rgba(FO4.bloed, 0.35); ctx.lineWidth = hw * 2; ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(P1[0], P1[1]); ctx.stroke();
  for (let i = 0; i < 9; i++) { const f = ((t * 0.12 + i / 9) % 1); const px = lerp(P0[0], P1[0], f), py = lerp(P0[1], P1[1], f), off = (hash(i) - 0.5) * hw * 0.6;
    ctx.save(); ctx.translate(px + nx * off, py + ny * off); ctx.rotate(Math.atan2(ty, tx) + 0.3); ctx.beginPath(); ctx.ellipse(0, 0, 14 * s, 8 * s, 0, 0, 6.283); ctx.fillStyle = FO4.bloed; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, 7 * s, 3.5 * s, 0, 0, 6.283); ctx.fillStyle = _fo4dk(FO4.bloed, 0.2); ctx.fill(); ctx.restore(); }
  // wanden van het haarvat (de kant van het blaasje heeft het scheurtje)
  ctx.strokeStyle = FO4.wandD; ctx.lineWidth = 7 * s;
  const lijn = (o0, o1, f0, f1) => { ctx.beginPath(); ctx.moveTo(lerp(P0[0], P1[0], f0) + nx * o0, lerp(P0[1], P1[1], f0) + ny * o0); ctx.lineTo(lerp(P0[0], P1[0], f1) + nx * o1, lerp(P0[1], P1[1], f1) + ny * o1); ctx.stroke(); };
  lijn(hw, hw, 0, 1); const fc = 300 / 630, fg = gat * R / (630 * s);
  lijn(-hw, -hw, 0, fc - fg); lijn(-hw, -hw, fc + fg, 1);
  // blaasje: wand als ring met een gat bij het contactpunt; binnen water
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; ctx.beginPath(); ctx.arc(x, y, R - th / 2, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.3); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = FO4.wand; ctx.lineWidth = th; ctx.beginPath(); ctx.arc(x, y, R, ca + gat, ca - gat + 6.283); ctx.stroke();
  ctx.strokeStyle = FO4.wandL; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, R - th / 2, ca + gat, ca - gat + 6.283); ctx.stroke();
  // rafelig randje bij het scheurtje (koraal = let op)
  if (scheur > 0.01) { ctx.save(); ctx.globalAlpha *= scheur; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; for (const sg of [-1, 1]) { const an = ca + sg * gat; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (R - th), y + Math.sin(an) * (R - th)); ctx.lineTo(x + Math.cos(an - sg * 0.02) * R, y + Math.sin(an - sg * 0.02) * R); ctx.lineTo(x + Math.cos(an) * (R + th + hw * 0.1), y + Math.sin(an) * (R + th + hw * 0.1)); ctx.stroke(); } ctx.restore(); }
  // kiezelwieren in het water; de eerste maakt de reis
  for (let i = 1; i < n; i++) { const an = hash(i * 9) * 6.283, d = Math.sqrt(hash(i * 9 + 1)) * R * 0.7; const w = wander(i, t, 6, 0.4); fo4_kiezelwier(ctx, x + Math.cos(an) * d + w.x, y + Math.sin(an) * d + w.y, 0.32 * s, { soort: i % 2 ? 'boot' : 'schijf', rot: an, levend: 0.6 }); }
  let kx, ky; if (u <= 0.5) { const f = ease(u / 0.5); kx = lerp(x + Math.cos(ca) * R * 0.45, cx + nx * hw, f); ky = lerp(y + Math.sin(ca) * R * 0.45, cy + ny * hw, f); }
  else { const f = ease((u - 0.5) / 0.5); kx = lerp(mx, P1[0] - tx * 40 * s, f); ky = lerp(my, P1[1] - ty * 40 * s, f); }
  fo4_kiezelwier(ctx, kx, ky, 0.32 * s, { soort: 'boot', rot: u <= 0.5 ? ca : Math.atan2(ty, tx), levend: 0.6, hl: 1 });
  ctx.restore(); return anker; }

// =====================================================================================
// BOT IN DOORSNEDE MET BEENMERG (los schema). Kopie van botDoorsnede uit bibliotheek/lib_bio.js (pijpbeen in de lengte:
// rood beenmerg in sponsbot aan de uiteinden, geel beenmerg in de mergholte, kraakbeen, beenvlies, bloedvat naar binnen),
// met o.kiezel 0..1: kleine kiezelwieren in het rode beenmerg. (x, y) = midden, s = 14 → ± 420 px hoog.
// =====================================================================================
const FO4_Z9 = { bot: '#E6DCC6', botS: '#B8AC92', botR: '#CFC3A8', kraak: '#BFD8E4', kraakR: '#E4F0F6', merg: '#C2453E', mergG: '#D9BC6A' };
function fo4_bot(ctx, x, y, s, o = {}) { const { a = 1, hl = {}, len = 30, rood = 1, kiezel = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.35 + 0.65 * (hl[k] == null ? 1 : hl[k]); const Z9 = FO4_Z9;
  const w = 1.25 * s, k1 = 2.6 * s, H = len * s / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(-w, -H + k1 * 1.4); ctx.bezierCurveTo(-w * 1.4, -H + k1 * 0.8, -k1, -H + k1 * 0.6, -k1, -H); ctx.arc(0, -H, k1, Math.PI, 0); ctx.bezierCurveTo(k1, -H + k1 * 0.6, w * 1.4, -H + k1 * 0.8, w, -H + k1 * 1.4);
    ctx.lineTo(w, H - k1 * 1.4); ctx.bezierCurveTo(w * 1.4, H - k1 * 0.8, k1 * 1.1, H - k1 * 0.5, k1 * 1.05, H); ctx.arc(0, H, k1 * 1.05, 0, Math.PI); ctx.bezierCurveTo(-k1 * 1.1, H - k1 * 0.5, -w * 1.4, H - k1 * 0.8, -w, H - k1 * 1.4); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= L('bot'); omtrek(); shape(ctx, Z9.bot, Z9.botS, 1.5); ctx.restore();
  ctx.save(); omtrek(); ctx.clip();
  ctx.save(); ctx.globalAlpha *= L('rood'); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * (H - 0.15 * s), k1 * 0.86, k1 * 1.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(Z9.merg, '#E6DCC6', 1 - 0.75 * rood); ctx.fill();
    for (let i = 0; i < 90; i++) { const px = (hash(i + sg * 7) - 0.5) * k1 * 1.6, py = sg * (H - 0.15 * s) + (hash(i * 3 + sg) - 0.5) * k1 * 2.8; circ(ctx, px, py, 2 + hash(i + 11) * 3, Z9.botR); } } ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('geel'); roundRect(ctx, -w * 0.62, -H + k1 * 1.3, w * 1.24, 2 * H - k1 * 2.6, w * 0.5); ctx.fillStyle = Z9.mergG; ctx.fill(); ctx.restore();
  if (kiezel > 0.01) { ctx.save(); ctx.globalAlpha *= kiezel; for (let i = 0; i < 6; i++) { const sg = i % 2 ? 1 : -1; fo4_kiezelwier(ctx, (hash(i * 4 + 2) - 0.5) * k1 * 1.1, sg * (H - 0.15 * s) + (hash(i * 4 + 3) - 0.5) * k1 * 1.8, s * 0.016, { soort: i % 3 ? 'boot' : 'schijf', rot: hash(i) * 3, hl: 0 }); } ctx.restore(); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, -H, k1, Math.PI + 0.25, -0.25); ctx.arc(0, -H, k1 - 0.3 * s, -0.25, Math.PI + 0.25, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  ctx.save(); ctx.strokeStyle = rgba('#C9B896', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w - 2.5, -H + k1 * 1.5); ctx.lineTo(-w - 2.5, H - k1 * 1.5); ctx.moveTo(w + 2.5, -H + k1 * 1.5); ctx.lineTo(w + 2.5, H - k1 * 1.5); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('bloedvat'); ctx.strokeStyle = FO4.bloed; ctx.lineWidth = 0.28 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(w + 2.2 * s, -0.2 * H); ctx.quadraticCurveTo(w + 0.6 * s, -0.1 * H, w - 0.2 * s, 0); ctx.quadraticCurveTo(0, 0.12 * H, -0.3 * s, 0.6 * H); ctx.moveTo(-0.1 * s, 0.05 * H); ctx.quadraticCurveTo(0.2 * s, -0.3 * H, 0, -0.7 * H); ctx.stroke(); ctx.restore();
  ctx.restore();
  return { rood: [x, y - H], geel: [x, y + 0.1 * H], bloedvat: [x + w + 1.4 * s, y - 0.18 * H] }; }

// =====================================================================================
// LAB: monsterpotje, buisje met zuur, preparaatglaasje
// =====================================================================================
// monsterpotje met etiket (naar potje uit Geneeskunde 4 / Labtechniek 1). (x, y) = onderkant midden. lab = tekst op het etiket,
// o.inhoud 'long' | 'beenmerg' | null, o.kiezel n = kleine kiezelwieren in de vloeistof (o.kiezelA), o.onder = tekst eronder,
// o.gl = gouden rand.
function fo4_monsterpot(ctx, x, y, s = 1, lab = '', o = {}) { const { a = 1, inhoud = null, kiezel = 0, kiezelA = 1, gl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -85, -200, 170, 200, 22); shape(ctx, rgba('#CFE4F0', 0.12), gl > 0.5 ? C.goud : '#AFC0D0', gl > 0.5 ? 4 : 3);
  ctx.save(); roundRect(ctx, -85, -200, 170, 200, 22); ctx.clip(); ctx.fillStyle = rgba('#DDEFF0', 0.2); ctx.fillRect(-85, -150, 170, 150);
  if (inhoud) { const kl = inhoud === 'long' ? '#D99A9A' : '#B5443E', kl2 = inhoud === 'long' ? '#F0C0BC' : '#D9BC6A'; const dy = -36 + Math.sin(t * 1.2) * 3;
    ctx.beginPath(); fo4_pad(ctx, [[-44, dy], [-30, dy - 22], [10, dy - 26], [44, dy - 12], [40, dy + 12], [0, dy + 18], [-38, dy + 12]], true); ctx.fillStyle = kl; ctx.fill();
    if (inhoud === 'long') { for (let i = 0; i < 10; i++) circ(ctx, -30 + hash(i) * 66, dy - 14 + hash(i + 4) * 24, 4, kl2); } else { ctx.beginPath(); ctx.ellipse(18, dy - 2, 16, 9, 0.2, 0, 6.283); ctx.fillStyle = kl2; ctx.fill(); } }
  if (kiezel > 0 && kiezelA > 0.01) { ctx.save(); ctx.globalAlpha *= kiezelA; for (let i = 0; i < kiezel; i++) fo4_kiezelwier(ctx, -50 + hash(i * 3 + 1) * 100, -128 + hash(i * 3 + 2) * 60, 0.4, { soort: i % 2 ? 'boot' : 'schijf', rot: hash(i) * 3 }); ctx.restore(); }
  ctx.restore();
  roundRect(ctx, -93, -232, 186, 40, 10); shape(ctx, '#F2F2EE', '#C9CED6', 2);
  if (lab) { roundRect(ctx, -70, -186, 140, 46, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.font = fTekst(30, 800); const fw = ctx.measureText(lab).width; text(ctx, lab, 0, -152, fTekst(Math.min(30, 30 * 124 / fw), 800), FO4.inkt, 'center'); }
  if (o.onder) o.onder.split('\n').forEach((r, i) => text(ctx, r, 0, 48 + i * 38, fTekst(32, 700), gl > 0.5 ? C.goud : C.text, 'center'));
  ctx.restore(); }
// buisje met zuur: het weefsel lost op (o.u 0..1), belletjes stijgen, de lege schaaltjes zakken naar de bodem.
// (x, y) = onderkant midden, s = 1 → 340 px hoog. Vloeistof lichtgeel (salpeterzuur), etiket 'ZUUR' in koraal.
function fo4_zuurbuis(ctx, x, y, s = 1, o = {}) { const { a = 1, u = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const W = 40, H = 340, buis = () => { ctx.beginPath(); ctx.moveTo(-W, -H); ctx.lineTo(-W, -W); ctx.arc(0, -W, W, Math.PI, 0, true); ctx.lineTo(W, -H); };
  ctx.save(); buis(); ctx.closePath(); ctx.clip(); ctx.fillStyle = rgba('#E9DFA6', 0.42); ctx.fillRect(-W, -H * 0.62, 2 * W, H * 0.62);
  const g = 1 - ease(u); if (g > 0.02) { ctx.beginPath(); fo4_pad(ctx, [[-26 * g, -120], [-10 * g, -120 - 22 * g], [22 * g, -120 - 18 * g], [28 * g, -120 + 4 * g], [6 * g, -120 + 20 * g], [-22 * g, -120 + 14 * g]], true); ctx.fillStyle = '#C77B72'; ctx.fill(); }
  if (u > 0.02 && u < 0.98) for (let i = 0; i < 10; i++) { const f = (t * 0.4 + hash(i)) % 1; circ(ctx, -18 + hash(i + 3) * 36, -110 - f * 90, 3 + hash(i + 5) * 2, null, rgba('#F2F2EE', 0.6 * (1 - f)), 1.2); }
  for (let i = 0; i < 5; i++) { const f = ease(clamp(u * 1.4 - i * 0.08, 0, 1)); if (f < 0.02) continue; fo4_kiezelwier(ctx, -20 + i * 10, lerp(-120, -22 - (i % 2) * 8, f), 0.2, { soort: i % 2 ? 'schijf' : 'boot', rot: i * 0.7, a: f }); }
  ctx.restore(); buis(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -H, W + 4, 6, 0, 0, 6.283); ctx.stroke();
  roundRect(ctx, -W - 6, -H + 36, 2 * W + 12, 44, 6); shape(ctx, '#F2EEE4', C.koraal, 2.5); text(ctx, 'ZUUR', 0, -H + 68, fTekst(26, 800), _fo4dk(C.koraal, 0.25), 'center');
  ctx.restore(); }
// preparaatglaasje (naar glaasje uit Labtechniek 1). (x, y) = midden, s = 1 → 300 × 90. o.inhoud 'leeg' | 'kiezel' | 'haar' | 'weefsel',
// o.lab = tekst eronder (meta), o.hl = gouden rand.
function fo4_glaasje(ctx, x, y, s = 1, o = {}) { const { a = 1, inhoud = 'leeg', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -45, 300, 90, 6); shape(ctx, rgba('#DCEBF4', 0.28), hl > 0.5 ? C.goud : '#AFC0D0', hl > 0.5 ? 4 : 2.5); ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(-146, -41, 70, 82);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-136, -20, 50, 5); ctx.fillRect(-136, -6, 40, 5);
  roundRect(ctx, -10, -38, 100, 76, 3); ctx.fillStyle = rgba('#F2F2EE', 0.12); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.45); ctx.lineWidth = 1.5; ctx.stroke(); // dekglaasje
  if (inhoud === 'kiezel') { for (let i = 0; i < 4; i++) fo4_kiezelwier(ctx, 10 + hash(i * 2) * 60, -22 + hash(i * 2 + 1) * 44, 0.13, { soort: i % 2 ? 'boot' : 'schijf', rot: i }); }
  else if (inhoud === 'haar') { ctx.strokeStyle = FO4.haar; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-2, 22); ctx.quadraticCurveTo(40, -30, 84, 10); ctx.stroke(); }
  else if (inhoud === 'weefsel') { ctx.beginPath(); ctx.ellipse(40, 0, 36, 22, 0, 0, 6.283); ctx.fillStyle = rgba('#D99A9A', 0.6); ctx.fill(); }
  ctx.restore(); if (o.lab) { ctx.save(); ctx.globalAlpha *= a; metaText(ctx, o.lab, x, y + 60 * s + 30, hl > 0.5 ? C.goud : C.grain, 'center', 28); ctx.restore(); } }

// =====================================================================================
// PAPIER: verzegeld bewijszakje, typemachinekaart 'VERKLARING', rapportblad
// =====================================================================================
// bewijszakje (naar bewijszak uit Forensisch 2 en zakPapier uit Forensisch 1): doorzichtig, rode zegelstrook, etiket met tekst.
// (x, y) = midden, s = 1 → 260 × 340. lab: regels gescheiden door '\n'. o.inhoud 'schoen' | 'haar' | 'preparaat', o.hl = goud.
function fo4_zakje(ctx, x, y, s = 1, lab = '', o = {}) { const { a = 1, inhoud = null, hl = 0, zegel = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -170, 260, 340, 14); shape(ctx, rgba('#DCE5EC', 0.12), hl > 0.5 ? C.goud : rgba('#DCE5EC', 0.7), hl > 0.5 ? 5 : 2.5);
  if (zegel > 0.01) { ctx.save(); ctx.globalAlpha *= zegel; ctx.fillStyle = rgba(C.koraal, 0.9); ctx.fillRect(-128, -168, 256, 30); text(ctx, 'ZEGEL', 0, -145, fMeta(22), '#FFFFFF', 'center'); ctx.restore(); }
  if (inhoud === 'schoen') fo4_schoen(ctx, 0, 30, 0.72, { vies: 0.8 });
  else if (inhoud === 'haar') { ctx.strokeStyle = '#3A2A20'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.bezierCurveTo(-30, -70, 10, 40, 40, -30); ctx.quadraticCurveTo(60, -70, 80, -40); ctx.stroke(); }
  else if (inhoud === 'preparaat') fo4_glaasje(ctx, 0, -30, 0.68, { inhoud: 'weefsel' });
  const regels = lab.split('\n'); const lh = 36, eh = 26 + regels.length * lh;
  roundRect(ctx, -110, 150 - eh, 220, eh, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5);
  regels.forEach((r, i) => { ctx.font = fMeta(28); ctx.letterSpacing = '2px'; const fw = ctx.measureText(r).width; ctx.letterSpacing = '0px'; ctx.save(); ctx.letterSpacing = '2px'; text(ctx, r, 0, 150 - eh + 44 + i * lh, fMeta(Math.min(28, 28 * 196 / fw)), FO4.inkt, 'center'); ctx.restore(); });
  ctx.restore(); }
// kleine ondertekening (korrel, haar of kiezelwier), getekend over een stippellijn
function fo4_handtekening(ctx, x, y, soort, s = 1) { if (soort === 'korrel') fo4_korrel(ctx, x, y, 30 * s, 'gras');
  else if (soort === 'kiezel') fo4_kiezelwier(ctx, x, y, 0.8 * s, { soort: 'boot', rot: -0.15 });
  else { ctx.save(); ctx.strokeStyle = FO4.haar; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 60 * s, y + 8 * s); ctx.bezierCurveTo(x - 20 * s, y - 30 * s, x + 10 * s, y + 26 * s, x + 60 * s, y - 14 * s); ctx.stroke(); ctx.restore(); } }
// typemachinekaart 'VERKLARING n' met ondertekening. (x, y) = linksboven, w = breedte. o.regels = getypte zinnen (leeg = geen
// ik-tekst, zoals in H3), o.typ 0..1 = hoeveel er al getypt is, o.teken 'korrel' | 'haar' | 'kiezel', o.rot (standaard licht scheef).
function fo4_verklaring(ctx, x, y, w, nr, o = {}) { const { a = 1, typ = 1, regels = [], teken = 'korrel', px = 30, tekenA = 1 } = o; if (a <= 0.01) return 0;
  const lijnen = []; ctx.font = fMeta(px); regels.forEach(r => { let reg = ''; r.split(' ').forEach(wd => { const t2 = reg ? reg + ' ' + wd : wd; if (ctx.measureText(t2).width > w - 70 && reg) { lijnen.push(reg); reg = wd; } else reg = t2; }); if (reg) lijnen.push(reg); });
  const h = 120 + lijnen.length * (px + 16) + 120;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot == null ? -0.012 : o.rot);
  roundRect(ctx, 0, 0, w, h, 6); shape(ctx, FO4.papier, FO4.papierR, 2);
  const kop = o.kop || ('VERKLARING ' + nr + (regels.length ? '' : ' · GEEN')); ctx.font = `700 ${px + 6}px ${F.meta}`; const kw = ctx.measureText(kop).width; text(ctx, kop, 34, 62, `700 ${px + 6}px ${F.meta}`, FO4.inkt, 'left'); ctx.fillStyle = FO4.inkt; ctx.fillRect(34, 76, Math.min(w - 68, kw), 3);
  const tot = lijnen.join('').length; let n = Math.floor(tot * typ);
  lijnen.forEach((r, i) => { const s2 = r.slice(0, Math.max(0, n)); n -= r.length; text(ctx, s2, 34, 132 + i * (px + 16), fMeta(px), FO4.inkt, 'left'); });
  const ly = h - 50; ctx.strokeStyle = FO4.inkt2; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(w * 0.42, ly); ctx.lineTo(w - 34, ly); ctx.stroke(); ctx.setLineDash([]);
  text(ctx, 'getekend:', w * 0.42, ly + 34, fMeta(22), FO4.inkt2, 'left');
  if (tekenA > 0.01) { ctx.save(); ctx.globalAlpha *= tekenA; fo4_handtekening(ctx, w * 0.72, ly - 26, teken, 1); ctx.restore(); }
  ctx.restore(); return h; }
// rapportblad met drie regels die zich invullen. (x, y) = linksboven, w = breedte (± 700). o.vul = [u1, u2, u3] (0..1, typen),
// o.hl = index met gouden markering. Teksten uit het script (doorlopend beeld).
const FO4_RAPPORT = [['SCHOEN', 'PAST IETS BETER BIJ DE ACHTERTUIN'], ['HAAR', 'MENS · KAN VAN HEM ZIJN · NAAR DNA-LAB'], ['PREPARAAT (ANDERE ZAAK)', 'ÉÉN GEWICHT, OMSTREDEN']];
function fo4_rapport(ctx, x, y, w = 700, o = {}) { const { a = 1, vul = [0, 0, 0], hl = -1, px = 28 } = o; const R = o.regels || FO4_RAPPORT; if (a <= 0.01) return 0;
  const wrapR = (s2, f, ls) => { ctx.font = f; ctx.letterSpacing = ls; const out = []; let reg = ''; s2.split(' ').forEach(wd => { const t2 = reg ? reg + ' ' + wd : wd; if (ctx.measureText(t2).width > w - 76 && reg) { out.push(reg); reg = wd; } else reg = t2; }); if (reg) out.push(reg); ctx.letterSpacing = '0px'; return out; };
  const fK = fMeta(26), fV = `700 ${px}px ${F.meta}`, lhK = 34, lhV = px + 14;
  const kop = R.map(([k]) => wrapR(k, fK, '2px')), rij = R.map(([, v]) => wrapR(v, fV, '1px'));
  const hs = R.map((_, i) => 24 + kop[i].length * lhK + rij[i].length * lhV + 26); const h = 110 + hs.reduce((p, q) => p + q, 0);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 8); shape(ctx, FO4.papier, FO4.papierR, 2);
  text(ctx, 'RAPPORT', x + 36, y + 60, `700 36px ${F.meta}`, FO4.inkt, 'left'); ctx.fillStyle = rgba(FO4.inkt2, 0.6); ctx.fillRect(x + 36, y + 80, w - 72, 2);
  let yy = y + 104; R.forEach((_, i) => { const on = hl === i;
    if (on) { ctx.fillStyle = rgba(C.goud, 0.28); ctx.fillRect(x + 20, yy, w - 40, hs[i] - 8); }
    kop[i].forEach((r, j) => { ctx.save(); ctx.letterSpacing = '2px'; text(ctx, r, x + 36, yy + 36 + j * lhK, fK, on ? '#7A5A10' : FO4.inkt2, 'left'); ctx.restore(); });
    const vy = yy + 36 + kop[i].length * lhK + 6; const lines = rij[i], tot = lines.join('').length; let n = Math.floor(tot * clamp(vul[i] || 0, 0, 1));
    if ((vul[i] || 0) <= 0.001) { ctx.strokeStyle = rgba(FO4.inkt2, 0.6); ctx.lineWidth = 2; ctx.setLineDash([5, 7]); lines.forEach((_, j) => { ctx.beginPath(); ctx.moveTo(x + 36, vy + j * lhV + 4); ctx.lineTo(x + w - 40, vy + j * lhV + 4); ctx.stroke(); }); ctx.setLineDash([]); }
    lines.forEach((l, j) => { const s2 = l.slice(0, Math.max(0, n)); n -= l.length; ctx.save(); ctx.letterSpacing = '1px'; text(ctx, s2, x + 36, vy + j * lhV, fV, FO4.inkt, 'left'); ctx.restore(); });
    yy += hs[i]; });
  ctx.restore(); return h; }

// =====================================================================================
// GRONDPOTJE (vergelijkingsmonster, naar potje uit Milieukunde 1). (x, y) = onderkant midden, lab = naam eronder (wordt
// gesplitst op '\n'), o.bloem 0..1 = takje van de struik met bloemetjes erbij (alleen 'ACHTERTUIN'), o.gl = goud.
// =====================================================================================
function fo4_grondpot(ctx, x, y, s = 1, lab = '', o = {}) { const { a = 1, bloem = 0, gl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 140, h = 160;
  if (bloem > 0.01) { ctx.save(); ctx.globalAlpha *= bloem; ctx.strokeStyle = '#6A5240'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -h * 0.5); ctx.quadraticCurveTo(20, -h - 30, 30, -h - 70); ctx.stroke();
    _fo4samBlad(ctx, 20, -h - 20, 50, -2.6, '#4F7E4A'); _fo4samBlad(ctx, 26, -h - 40, 50, -0.5, '#3F6E44'); _fo4roos(ctx, 30, -h - 80, 20, FO4.bloem, 0.3); _fo4knop(ctx, 4, -h - 62, 14, FO4.bloem, -0.5); ctx.restore(); }
  roundRect(ctx, -w / 2, -h, w, h, 14); shape(ctx, rgba('#AFC0D0', 0.12), gl > 0.5 ? C.goud : '#AFC0D0', gl > 0.5 ? 4 : 2.5);
  ctx.save(); roundRect(ctx, -w / 2 + 6, -h * 0.55, w - 12, h * 0.55 - 6, 10); ctx.clip(); ctx.fillStyle = FO4.grond; ctx.fillRect(-w / 2, -h * 0.55, w, h); ctx.fillStyle = _fo4lt(FO4.grond, 0.15); ctx.fillRect(-w / 2, -h * 0.55, w, 12);
  for (let i = 0; i < 14; i++) circ(ctx, -w / 2 + 14 + hash(i * 3) * (w - 28), -h * 0.45 + hash(i * 3 + 1) * h * 0.4, 2 + hash(i) * 3, rgba(_fo4dk(FO4.grond, 0.3), 0.9)); ctx.restore();
  roundRect(ctx, -w / 2 - 6, -h - 22, w + 12, 26, 6); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  lab.split('\n').forEach((r, i) => text(ctx, r, 0, 46 + i * 38, fTekst(32, 700), gl > 0.5 ? C.goud : C.text, 'center'));
  ctx.restore(); }

// =====================================================================================
// FILMHULPJES (bouw 2 nov 2026). balans en opleiding: kopie uit Forensisch 2 (teken_fo2.js); hondenmand uit Forensisch 1.
// =====================================================================================
const KL_METAAL = '#AFC0D0';
// BALANS (weegschaal met twee schalen). (x, y) = draaipunt boven op de paal. s = schaal.
// o.tilt: 0 = in evenwicht, 1 = links (hypothese 1) helemaal omlaag. o.L / o.R = {naam, sub, kans, aN, aK}
// Namen staan direct onder de schaal (naamBij), de kans eronder. Bekende fout: schalen die met de balk mee kantelen.
function balans(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const tilt = clamp(o.tilt || 0, -1, 1);
  const th = -tilt * 0.3, L = 340 * s, hang = 170 * s, pw = 210 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // voet en paal
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 80 * s, y + 352 * s, 160 * s, 24 * s, 10 * s); shape(ctx, '#2A3A58', KL_METAAL, 2);
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(x, y + 352 * s); ctx.lineTo(x, y); ctx.stroke();
  ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y + 340 * s); ctx.lineTo(x, y + 20 * s); ctx.stroke();
  // wijzer
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(th) * 90 * s, y - Math.cos(th) * 90 * s); ctx.stroke();
  // balk
  const ex = Math.cos(th) * L, ey = Math.sin(th) * L;
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke();
  circ(ctx, x, y, 16 * s, '#2A3A58', KL_METAAL, 3);
  const pan = (px, py, kant) => { // touwtjes + schaal, altijd recht naar beneden
    ctx.strokeStyle = rgba(KL_METAAL, 0.9); ctx.lineWidth = 2.2;
    const by = py + hang; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px + pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px, by - 6 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - pw * 0.52, by); ctx.quadraticCurveTo(px, by + 62 * s, px + pw * 0.52, by); ctx.closePath(); shape(ctx, '#2A3A58', KL_METAAL, 2.5);
    circ(ctx, px, py, 6 * s, KL_METAAL);
    const d = kant < 0 ? o.L : o.R; if (!d) return;
    if (d.vul) d.vul(ctx, px, by, s);
    naamBij(ctx, d.naam, d.sub || '', px, by + 78 * s, d.aN == null ? 1 : d.aN, 'center');
    if (d.kans) { const ak = d.aK == null ? 1 : d.aK; if (ak > 0.01) regel(ctx, d.kans, px, by + 78 * s + (d.sub ? 76 : 50), ak, d.kansKl || C.goud, 34, 'center', 800); } };
  pan(x - ex, y - ey, -1); pan(x + ex, y + ey, 1);
  if (o.titel) metaA(ctx, o.titel, x, y - 110 * s, o.aT == null ? 1 : o.aT, C.grain, 'center', o.titelPx || 26);
  ctx.restore();
}
function opleiding(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 24);
  text(ctx, naam, x + 26, y + 90, fTekst(naam.length > 30 ? 30 : 36, 700), C.text, 'left');
  text(ctx, waar, x + 26, y + 130, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }

function hondenmand(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -10, 110, 34, 0, 0, 6.283); shape(ctx, '#8C5A3A', '#B08A5C', 2);
  ctx.beginPath(); ctx.ellipse(0, -18, 84, 20, 0, 0, 6.283); shape(ctx, '#C46A5A', '#D9907E', 1.5);
  ctx.beginPath(); ctx.ellipse(0, -18, 50, 10, 0, 0, 6.283); ctx.fillStyle = '#B05A4A'; ctx.fill(); ctx.restore(); }

// ---------- algemene hulpjes (zoals mk1) ----------
const GROND = 860;
function VU() { try { return typeof state !== 'undefined' && state && state.vragen === 'uit'; } catch (e) { return false; } }
// antwoordlabel bovenaan; bij Vragen uit alleen de inhoud (zoals scripts/antwoordtekst.py)
function antwoord(ctx, s2, a = 1) { if (VU()) return; // frisse review: zonder vraag zijn ingekorte koppen cryptisch of lezen als conclusie
  regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 64, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 18); ctx.lineTo(x + 52, y + 32); ctx.lineTo(x + 26, y + 46); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 66, y + 43, fTekst(30, 700), C.text, 'left'); ctx.restore(); }
// kaart met kop (meta) en regels; geeft de hoogte
function infoKaart(ctx, x, y, w, kop, regels, a = 1, o = {}) { if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 54, h = 84 + regels.length * lh + (o.extraH || 0) + (o.bron ? 44 : 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(o.rand || C.line, 0.9), 2); metaText(ctx, kop, x + 28, y + 48, o.kopKl || C.goud, 'left', 28);
  regels.forEach((r, i) => { const [s2, ra, kl] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 28, y + 108 + i * lh, fTekst(o.px || 38, 700), kl || C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 84 + regels.length * lh, w);
  if (o.bron) metaText(ctx, o.bron, x + 28, y + h - 20, C.text2, 'left', 26); ctx.restore(); return h; }
// Micro-vlak zonder korrel (BEELDAFSPRAKEN): donkerder navy
function micro(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// rond Micro-venster (voor een vergroting zonder bron): donkere cirkel met gouden rand en bijschrift
function microVenster(ctx, x, y, r, cap, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); fn(); ctx.restore();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); if (cap) metaText(ctx, cap, x, y + r + 40, C.grain, 'center', 28); ctx.restore(); }
// zoomcirkel met donkere binnenkant (lib.js zoomCircle tekent alleen de lijnen)
function zoom(ctx, x, y, r, sx, sy, cap, a, fn) { zoomCircle(ctx, x, y, r, sx, sy, cap, a, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); fn(); }); }

// ---------- decor (zoals mk1) ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }

// ---------- personages (Keuring ronde 4: palynoloog even lang als Milieukundige Iris, 445) ----------
function bilal(ctx, x, t, o = {}) { return persoon(ctx, 'bilal', x, o.y || GROND, o.h || 455, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: o.outfit || 'practicum', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function kim(ctx, x, t, o = {}) { return persoon(ctx, 'kim', x, o.y || GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'lab', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function palyno(ctx, x, t, o = {}) { return persoon(ctx, 'palynoloog', x, o.y || GROND, 445, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'vasthouden', outfit: 'lab', a: o.a == null ? 1 : o.a, hold: o.hold === undefined ? preparaatDoosInHand : o.hold }); }
// preparaatdoosje: plat doosje met gleufjes en een paar glaasjes (attribuut van de palynoloog, castvel)
function preparaatDoos(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -46, -30, 92, 60, 6); shape(ctx, '#5E6E84', '#2E3A4E', 2); roundRect(ctx, -40, -24, 80, 48, 4); shape(ctx, '#3A465A', null);
  for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 3 === 1 ? '#CFE8EE' : '#26303F'; ctx.fillRect(-34 + i * 10.5, -20, 5, 40); if (i % 3 === 1) { ctx.fillStyle = '#ECE6D8'; ctx.fillRect(-34 + i * 10.5, -20, 5, 10); } } ctx.restore(); }
function preparaatDoosInHand(c, hx, hy) { preparaatDoos(c, hx + 6, hy - 18, 0.8); }
// microscoop (naar microscoopje uit Geneeskunde 3), (x, y) = onderkant voet
function microscoop(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -22, 140, 22, 6); shape(ctx, '#C9D0DA', '#8A94A2', 2); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(40, -22); ctx.quadraticCurveTo(64, -110, 20, -160); ctx.stroke();
  ctx.fillStyle = '#8A94A2'; ctx.fillRect(-54, -82, 92, 10); ctx.fillStyle = '#ECE6D8'; ctx.fillRect(-36, -88, 60, 6);
  ctx.save(); ctx.translate(-6, -150); ctx.rotate(-0.42); roundRect(ctx, -16, -70, 32, 120, 7); shape(ctx, '#E8E2D4', '#B8B0A0', 2); roundRect(ctx, -11, -92, 22, 26, 4); shape(ctx, '#3A4458', null); ctx.fillStyle = '#5A6478'; ctx.fillRect(-12, 48, 24, 14); ctx.restore();
  circ(ctx, 46, -60, 13, '#8A94A2', '#5A6478', 2); ctx.restore(); }
// tafel van opzij (tafelblad op hoogte y)
function tafel(ctx, x, y, w, a = 1, kl = '#5A4A3E') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 16, 5); shape(ctx, kl, _fo4lt(kl, 0.2), 1.5); ctx.fillStyle = _fo4dk(kl, 0.2); ctx.fillRect(x - w / 2 + 20, y + 16, 14, GROND - y - 16); ctx.fillRect(x + w / 2 - 34, y + 16, 14, GROND - y - 16); ctx.restore(); }
// verhoorkamer (schema op navy): grijze wand, tafel, lamp
function verhoorkamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#2A3446', 0.7); ctx.fillRect(0, 84, W, GROND - 84); ctx.fillStyle = rgba('#3A4458', 0.6); ctx.fillRect(0, GROND, W, H - GROND);
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(960, 84); ctx.lineTo(960, 210); ctx.stroke(); ctx.beginPath(); ctx.moveTo(900, 250); ctx.lineTo(1020, 250); ctx.lineTo(990, 210); ctx.lineTo(930, 210); ctx.closePath(); shape(ctx, '#5A6478', '#AFC0D0', 2);
  ctx.fillStyle = rgba('#F2E6B0', 0.06); ctx.beginPath(); ctx.moveTo(910, 250); ctx.lineTo(1010, 250); ctx.lineTo(1250, 700); ctx.lineTo(670, 700); ctx.closePath(); ctx.fill(); ctx.restore(); }
// rand van een kapot raam met drie haren (o.n zichtbaar)
function raamRand(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 3, hl = -1 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#B4533E'; ctx.fillRect(-260, -200, 70, 420); ctx.fillStyle = '#E8E2D4'; ctx.fillRect(-195, -200, 34, 420); // muur + kozijn
  ctx.beginPath(); ctx.moveTo(-161, -200); ctx.lineTo(120, -200); ctx.lineTo(60, -150); ctx.lineTo(110, -90); ctx.lineTo(10, -40); ctx.lineTo(70, 10); ctx.lineTo(-40, 70); ctx.lineTo(20, 140); ctx.lineTo(-90, 220); ctx.lineTo(-161, 220); ctx.closePath(); shape(ctx, rgba('#CFE8EE', 0.28), rgba('#E8F4F8', 0.8), 2.5);
  ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-140, -170); ctx.lineTo(-60, -60); ctx.stroke();
  const P = [[90, -120, [[140, -60], [128, 30], [150, 90]]], [40, -30, [[90, 30], [74, 110], [96, 180]]], [-10, 100, [[30, 160], [12, 230], [40, 290]]]], ank = [];
  P.slice(0, n).forEach(([px, py, pts], i) => { ctx.strokeStyle = i === 0 ? '#9C7A56' : '#5A3E2A'; ctx.lineWidth = i === 0 ? 3 : 3.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py); ctx.bezierCurveTo(pts[0][0], pts[0][1], pts[1][0], pts[1][1], pts[2][0], pts[2][1]); ctx.stroke();
    if (hl === i) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(pts[1][0], pts[1][1], 34, 0, 6.283); ctx.stroke(); } ank.push([x + pts[1][0] * s, y + pts[1][1] * s]); });
  ctx.restore(); return ank; }
// graspol met bloeiaren en een berk (windbestuivers), (x, yb) = voet
function gras(ctx, x, yb, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yb); ctx.scale(s, s); ctx.lineCap = 'round';
  for (let i = 0; i < 16; i++) { const dx = (i - 7.5) * 9, h = 120 + 70 * hash(i * 3), b = (hash(i) - 0.5) * 60 + Math.sin(t * 1.4 + i) * 6; ctx.strokeStyle = i % 3 ? '#7FA05A' : '#6A8C4A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(dx * 0.4, 0); ctx.quadraticCurveTo(dx, -h * 0.5, dx + b, -h); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { const dx = (i - 1.5) * 26, h = 230 + 30 * hash(i + 9), sw = Math.sin(t * 1.2 + i) * 10; ctx.strokeStyle = '#9AAE62'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(dx * 0.3, 0); ctx.quadraticCurveTo(dx, -h * 0.6, dx + sw, -h); ctx.stroke();
    for (let k = 0; k < 6; k++) { ctx.fillStyle = '#C9B86A'; ctx.beginPath(); ctx.ellipse(dx + sw + (k % 2 ? 7 : -7), -h + 8 + k * 11, 6, 3.2, k % 2 ? 0.6 : -0.6, 0, 6.283); ctx.fill(); } }
  ctx.restore(); }
function berk(ctx, x, yb, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yb); ctx.scale(s, s);
  ctx.fillStyle = '#E8E4DA'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-8, -420); ctx.lineTo(8, -420); ctx.lineTo(14, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2A2A2E'; for (let i = 0; i < 12; i++) { const yy = -30 - i * 32 - hash(i) * 10; ctx.fillRect(-12 + hash(i + 3) * 8, yy, 8 + hash(i + 5) * 10, 4); }
  ctx.strokeStyle = '#E8E4DA'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const [y0, dx, dy] of [[-260, -90, -90], [-300, 80, -80], [-350, -60, -70], [-380, 50, -60]]) { ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(dx, y0 + dy); ctx.stroke(); }
  for (let i = 0; i < 70; i++) { const an = hash(i * 2) * 6.283, d = Math.sqrt(hash(i * 2 + 1)); const bx = Math.cos(an) * 150 * d, by = -390 + Math.sin(an) * 120 * d + Math.sin(t + i) * 2; ctx.fillStyle = i % 3 ? '#7FA05A' : '#9AB86A'; ctx.beginPath(); ctx.ellipse(bx, by, 11, 7, an, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = '#B8A04A'; ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { const bx = -120 + i * 30, by = -330 + hash(i + 2) * 70; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + 4, by + 20, bx - 2, by + 38); ctx.stroke(); } // katjes
  ctx.restore(); }
// kalender: dag 1 (inbraak) en dag 4 (in beslag)
function kalenderFo4(ctx, x, y, s = 1, o = {}) { const { a = 1, d1 = 1, d4 = 1, pijl: pA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 470, 230, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(0, 0, 470, 46); metaText(ctx, 'DAGEN', 235, 34, '#F2F2EE', 'center', 26);
  for (let i = 0; i < 5; i++) { const cx = 55 + i * 90; text(ctx, String(i + 1), cx, 150, fTekst(46, 800), '#3A3A3A', 'center'); }
  if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; circ(ctx, 55, 134, 36, null, C.koraal, 4); text(ctx, 'inbraak', 55, 208, fTekst(22, 700), '#7A3A30', 'center'); ctx.restore(); }
  if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; pijl(ctx, 100, 98, 380, 98, '#8A6A20', 1, 3, 12); ctx.restore(); }
  if (d4 > 0.01) { ctx.save(); ctx.globalAlpha *= d4; circ(ctx, 415, 134, 36, null, '#B8862A', 4); text(ctx, 'in beslag', 415, 208, fTekst(22, 700), '#7A5A10', 'center'); ctx.restore(); }
  ctx.restore(); }
// dossier 'ANDERE ZAAK': map die in beeld schuift
function dossierMap(ctx, x, y, a = 1, lab = 'ANDERE ZAAK') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 110, y); ctx.lineTo(x + 136, y + 26); ctx.lineTo(x + 440, y + 26); ctx.lineTo(x + 440, y + 300); ctx.lineTo(x, y + 300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#F2EAD8'; ctx.fillRect(x + 26, y + 60, 388, 210); text(ctx, lab, x + 220, y + 180, `700 40px ${F.meta}`, '#7A3A30', 'center'); ctx.restore(); }
// weegschaal met één schaal en drie gewichtjes (wat de patholoog meeweegt). n = aantal zichtbare gewichtjes (0..3, mag fractie)
function weegHoop(ctx, x, y, labels, n = 3, a = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 200, y, 400, 26, 8); shape(ctx, '#2A3A58', KL_METAAL, 2); ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 60); ctx.stroke(); roundRect(ctx, x - 230, y - 76, 460, 18, 6); shape(ctx, '#3A4A68', KL_METAAL, 2);
  labels.forEach((l, i) => { const u = clamp(n - i, 0, 1); if (u <= 0.01) return; const by = y - 76 - (i + 1) * 92 + (1 - ease(u)) * -60; ctx.save(); ctx.globalAlpha *= ease(u); roundRect(ctx, x - 210 + i * 18, by, 420 - i * 36, 86, 10); shape(ctx, hl === i ? rgba(C.goud, 0.25) : rgba('#5A6478', 0.9), hl === i ? C.goud : '#8FA0B5', 2.5);
    text(ctx, l, x + 0, by + 56, fTekst(i === 2 ? 30 : 32, 700), C.text, 'center'); ctx.restore(); });
  ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }

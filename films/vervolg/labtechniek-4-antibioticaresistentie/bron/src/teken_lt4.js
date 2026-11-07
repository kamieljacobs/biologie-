// Wat word jij? · Laboratoriumtechniek · Antibioticaresistentie: kweken, testen en selectie — eigen tekeningen (24 okt 2026)
// Getallen nagerekend in reken/verdunning.py: 680 / 68 / 7 kolonies bij 0,1 ml uit de 10^-4, 10^-5 en 10^-6-verdunning
// -> 6,8 x 10^7 per ml; 7 kolonies uit 10^9 cellen op de plaat met antibioticum.
// Bacterie: bibliotheek/lib_bio.js (bacterieCel, bacterieGroot) waar het past; hieronder alleen wat die niet heeft.

const KL_PLAAT = '#E8E2D2';       // agar (lichtbeige, doorschijnend)
const KL_SCHAAL = '#C9CED6';      // rand van de petrischaal
const KL_KOLONIE = '#F2EAD0';     // kolonie op de agar

// ---- zaadbaar pseudotoeval, zodat elke kolonie altijd op dezelfde plek staat ----
function rngL(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// n punten gelijkmatig in een cirkel van straal R (gecachet per sleutel)
const _PUNTEN = {};
function puntenInCirkel(key, n, R, seed) {
  if (_PUNTEN[key]) return _PUNTEN[key];
  const r = rngL(seed), out = [];
  for (let i = 0; i < n; i++) { const rr = R * Math.sqrt(r()), an = r() * 6.283; out.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
  return (_PUNTEN[key] = out);
}

// =====================================================================================
// PETRISCHAAL van boven. Recept: rond schaaltje van 90 mm met een rand (deksel iets groter),
// agar als vlakke lichtbeige schijf met een dunne glansrand; kolonies als kleine ronde bolletjes
// met een zachte rand, niet precies even groot, en nooit buiten de agar.
// Bekende fouten: kolonies tot tegen de rand (de agar loopt niet tot de rand van de schaal),
// kolonies allemaal even groot, agar wit (dan kun je een heldere remzone niet laten zien).
// o.kolonies = aantal, o.groei 0..1 (hoe ver de kolonies gegroeid zijn), o.leeg = alleen agar,
// o.open 0..1 (deksel schuift een klein stukje open: ± 0,3 R, één kant blijft op de plaat),
// o.waas 0..1 (gesloten groei over de hele plaat), o.seed.
// =====================================================================================
function petrischaal(ctx, x, y, R, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { kolonies = 0, groei = 1, open = 0, waas = 0, seed = 7, label = null, omlijst = 0 } = o;
  const Ra = R * 0.9; // de agar loopt niet tot de rand
  ctx.save(); ctx.globalAlpha *= a;
  // schaal + agar
  circ(ctx, x, y, R, rgba(KL_SCHAAL, 0.18), rgba(KL_SCHAAL, 0.8), 3);
  circ(ctx, x, y, Ra, rgba(KL_PLAAT, 0.9), rgba('#B9B09A', 0.9), 2);
  // gesloten waas: dichte groei over de hele agar
  if (waas > 0.01) { ctx.save(); ctx.globalAlpha *= waas; circ(ctx, x, y, Ra - 2, rgba('#DED6BE', 0.95));
    const wp = puntenInCirkel('waas' + seed + '_' + Math.round(Ra), 420, Ra - 6, seed + 31);
    wp.forEach(([px, py], i) => circ(ctx, x + px, y + py, 2.2 + 1.6 * hash(i * 3 + seed), rgba('#F2EAD0', 0.75)));
    ctx.restore(); }
  // remzones onder de schijfjes (donkere ring = geen groei), eerst de groei, dan de zones
  if (kolonies > 0) {
    const schaal = kolonies <= 12 ? 2.6 : (kolonies <= 90 ? 1.5 : 1);
    const marge = 10 + 4.2 * schaal;   // kolonies nooit over de rand van de agar
    const pts = puntenInCirkel('kol' + seed + '_' + kolonies + '_' + Math.round(Ra - marge), kolonies, Ra - marge, seed);
    const g = ease(groei);
    pts.forEach(([px, py], i) => { const rr = (1.6 + 2.6 * hash(i * 5 + seed)) * g * schaal; if (rr < 0.3) return;
      circ(ctx, x + px, y + py, rr + 1.2, rgba('#B9B09A', 0.35));
      circ(ctx, x + px, y + py, rr, rgba(KL_KOLONIE, 0.95)); });
  }
  // deksel dat een stukje open schuift
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= 0.55; ctx.translate(R * 0.12 * ease(open), -R * 0.3 * ease(open));
    circ(ctx, x, y, R * 1.03, rgba('#D8DEE4', 0.16), rgba('#D8DEE4', 0.7), 3); ctx.restore(); }
  if (omlijst > 0.01) { ctx.save(); ctx.globalAlpha *= omlijst; circ(ctx, x, y, R + 14, null, C.groen, 6); ctx.restore(); }
  ctx.restore();
  if (label) naamBij(ctx, label[0], label[1] || '', x, y + R + 54, a, 'center');
}

// Zelfde schaal, maar met echte schijfjes en remzones die netjes getekend worden.
// zones: [{an, mm, nm}] — an = hoek, mm = diameter van de remzone in millimeter, nm = label
function antibiogramPlaat(ctx, x, y, R, zones, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { groei = 1, meet = -1, seed = 11, toonMm = 0 } = o;
  const Ra = R * 0.9, mmPx = Ra / 35; // 35 mm halve agar in beeld
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, R, rgba(KL_SCHAAL, 0.18), rgba(KL_SCHAAL, 0.8), 3);
  circ(ctx, x, y, Ra, rgba(KL_PLAAT, 0.9), rgba('#B9B09A', 0.9), 2);
  // gelijkmatige groei over de hele plaat
  if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= ease(groei); circ(ctx, x, y, Ra - 2, rgba('#DED6BE', 0.95));
    puntenInCirkel('abg' + seed + '_' + Math.round(Ra), 380, Ra - 6, seed).forEach(([px, py], i) => circ(ctx, x + px, y + py, 2 + 1.5 * hash(i * 7 + seed), rgba('#F2EAD0', 0.7)));
    ctx.restore(); }
  // remzones (geen groei): agar zonder bacteriën, dus de kleur van de lege agar
  zones.forEach((z, i) => {
    const cx = x + Math.cos(z.an) * Ra * 0.5, cy = y + Math.sin(z.an) * Ra * 0.5;
    const zr = Math.max(Ra * 0.09, z.mm / 2 * mmPx * ease(groei));
    if (z.mm > 7) circ(ctx, cx, cy, zr, rgba(KL_PLAAT, 1), rgba('#B9B09A', 0.5), 1.5);
    circ(ctx, cx, cy, Ra * 0.085, '#F6F2E6', '#A8A08C', 1.5); // papieren schijfje
    if (toonMm > 0.01 && z.nm) { ctx.save(); ctx.globalAlpha *= toonMm;
      const lx = x + Math.cos(z.an) * (R + 44), ly = y + Math.sin(z.an) * (R + 44) + 8;
      metaText(ctx, z.nm, lx, ly, C.grain, Math.cos(z.an) < -0.3 ? 'right' : (Math.cos(z.an) > 0.3 ? 'left' : 'center'), 20); ctx.restore(); }
    if (meet === i) { // liniaal over de zone
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - zr, cy); ctx.lineTo(cx + zr, cy); ctx.stroke();
      [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(cx + s * zr, cy - 12); ctx.lineTo(cx + s * zr, cy + 12); ctx.stroke(); });
      ctx.restore();
      regel(ctx, z.mm + ' mm', cx, cy - zr - 22, 1, C.goud, 34, 'center', 800);
    }
  });
  ctx.restore();
}

// =====================================================================================
// ENTOOG (inoculatielus). Recept: metalen steel met een handgreep en aan het eind een lusje
// van ± 3 mm; in de vlam gloeit de draad oranje-wit van de punt naar de steel, daarna koelt hij af.
// Bekende fout: een lus als dichte schijf (het is een open oogje).
// hitte 0..1 (0 = koud, 1 = gloeiend)
// =====================================================================================
function entoog(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { hitte = 0, rot = -0.5 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -150, -11, 90, 22, 9); shape(ctx, '#3A4458', '#6A7488', 2);          // greep
  ctx.strokeStyle = hitte > 0.05 ? lighten('#E07A5F', 0.25 * hitte) : '#B8C0D0';       // draad
  ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(-16, 0); ctx.stroke();
  if (hitte > 0.05) { ctx.save(); ctx.globalAlpha *= 0.5 * hitte; ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = 13;
    ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-16, 0); ctx.stroke(); ctx.restore(); }
  circ(ctx, 0, 0, 16, null, hitte > 0.05 ? lighten('#F2C94C', 0.2 * hitte) : '#D8DEE4', 5); // het oogje
  if (hitte > 0.4) { ctx.save(); ctx.globalAlpha *= 0.45 * (hitte - 0.4) / 0.6; circ(ctx, 0, 0, 26, rgba('#F2C94C', 0.6)); ctx.restore(); }
  ctx.restore();
}

// Gasvlam (brander): voetstuk, buisje, en een blauwe kegel met een lichtere binnenkegel die leeft.
function brander(ctx, x, voetY, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, vlam = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, voetY); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 54, 15, 0, 0, 6.283); shape(ctx, '#3A4458', '#6A7488', 2);
  roundRect(ctx, -13, -150, 26, 150, 6); shape(ctx, '#4A5468', '#7A8498', 2);
  if (vlam > 0.01) { ctx.save(); ctx.globalAlpha *= vlam; const w = 1 + 0.07 * Math.sin(t * 7);
    ctx.beginPath(); ctx.moveTo(-15, -150); ctx.quadraticCurveTo(-11, -196 * w, 0, -224 * w); ctx.quadraticCurveTo(11, -196 * w, 15, -150); ctx.closePath();
    shape(ctx, rgba('#5BA4C9', 0.55), rgba('#8FD0E8', 0.8), 2);
    ctx.beginPath(); ctx.moveTo(-7, -150); ctx.quadraticCurveTo(-5, -176 * w, 0, -190 * w); ctx.quadraticCurveTo(5, -176 * w, 7, -150); ctx.closePath();
    shape(ctx, rgba('#2E6FBF', 0.8), null); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// VEILIGHEIDSKABINET (klasse II). Recept: kast met een open werkopening aan de voorkant en een
// ruit die halverwege zakt; de lucht stroomt aan de voorkant naar binnen (pijlen naar binnen en
// omlaag) en gaat door een filter bovenin weer naar buiten. Bron: Maastricht University, procedure
// veiligheidskabinet type II; NuAire class II type A2.
// Bekende fout: pijlen die naar de gebruiker toe waaien (dan beschermt de kast niets).
// =====================================================================================
function veiligheidskabinet(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, stroom = 1, filterHl = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, rgba('#2A3446', 0.9), '#7A8498', 3);
  // filter bovenin
  const fh = h * 0.12, fy = y - h / 2 + h * 0.05;
  roundRect(ctx, x - w / 2 + 16, fy, w - 32, fh, 6);
  shape(ctx, rgba(filterHl > 0.01 ? C.teal : '#4A5468', filterHl > 0.01 ? 0.3 : 0.6), filterHl > 0.01 ? C.teal : '#8FA0B5', 2);
  for (let i = 0; i < 11; i++) { const px = x - w / 2 + 26 + i * (w - 52) / 10; ctx.strokeStyle = rgba('#8FA0B5', 0.55); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, fy + 4); ctx.lineTo(px, fy + fh - 4); ctx.stroke(); }
  // de ruit staat half open; daaronder de werkopening
  const oy = y + h * 0.1, ruitY = fy + fh + 8;
  roundRect(ctx, x - w / 2 + 12, ruitY, w - 24, oy - ruitY, 6); shape(ctx, rgba('#8FD0E8', 0.1), rgba('#AFC0D0', 0.7), 2);
  // werkopening: donkere spleet onder de ruit
  ctx.fillStyle = rgba('#0D1420', 0.75); ctx.fillRect(x - w / 2 + 12, oy, w - 24, h * 0.1);
  // werkblad met een plaat erop
  ctx.fillStyle = rgba('#3A4458', 0.95); ctx.fillRect(x - w / 2 + 12, y + h * 0.25, w - 24, 12);
  ctx.beginPath(); ctx.ellipse(x, y + h * 0.25 - 6, w * 0.13, 9, 0, 0, 6.283); shape(ctx, rgba(KL_PLAAT, 0.6), rgba(KL_SCHAAL, 0.8), 1.5);
  // luchtstroom: aan de voorkant door de werkopening naar binnen, dan omlaag en onder het blad weg
  if (stroom > 0.01) { ctx.save(); ctx.globalAlpha *= stroom;
    for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, py = oy + h * 0.05;
      pijl(ctx, x - w / 2 - 110 + u * 70, py, x - w / 2 - 110 + u * 70 + 56, py, C.teal, 0.85, 5, 14);
      pijl(ctx, x + w / 2 + 110 - u * 70, py, x + w / 2 + 110 - u * 70 - 56, py, C.teal, 0.85, 5, 14); }
    for (let i = 0; i < 5; i++) { const u = (t * 0.45 + i / 5) % 1, px = x - w / 2 + 60 + i * (w - 120) / 4;
      pijl(ctx, px, ruitY + 14, px, ruitY + 14 + u * (y + h * 0.25 - ruitY - 32), rgba(C.teal, 0.5), 0.9, 3, 10); }
    ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// VERDUNNINGSREEKS: rij buisjes, elk 1 op 10 van het vorige; de troebelheid neemt per buisje af.
// stap = hoeveel buisjes al gevuld zijn (0..n, mag gebroken zijn); pipet = index waar de pipet staat.
// =====================================================================================
function verdunningsreeks(ctx, x0, y, n, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { stap = n, dx = 132, bw = 58, bh = 170, labels = true, pipet = -1, t = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * dx, vul = clamp(stap - i, 0, 1);
    // buisje: ronde bodem
    ctx.beginPath(); ctx.moveTo(x - bw / 2, y - bh); ctx.lineTo(x - bw / 2, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2, Math.PI, 0, true); ctx.lineTo(x + bw / 2, y - bh); ctx.closePath();
    shape(ctx, rgba('#8FD0E8', 0.08), rgba('#AFC0D0', 0.75), 2.5);
    if (vul > 0.01) { // vloeistof, steeds lichter troebel
      const tro = 0.55 * Math.pow(0.55, i) + 0.05;
      ctx.save(); ctx.beginPath(); ctx.moveTo(x - bw / 2 + 3, y - bh * 0.72); ctx.lineTo(x - bw / 2 + 3, y - bw / 2);
      ctx.arc(x, y - bw / 2, bw / 2 - 3, Math.PI, 0, true); ctx.lineTo(x + bw / 2 - 3, y - bh * 0.72); ctx.closePath();
      ctx.globalAlpha *= ease(vul); shape(ctx, rgba('#E8E2D2', tro), null); ctx.restore(); }
    if (labels) metaText(ctx, ['10', '100', '1000', '10 000', '100 000', '1 miljoen'][i] || '', x, y + 44, C.text2, 'center', 18);
    if (i < n - 1) pijl(ctx, x + bw / 2 + 8, y - bh * 0.55, x + dx - bw / 2 - 8, y - bh * 0.55, rgba(C.goud, 0.8), ease(clamp(stap - i - 0.5, 0, 1)), 3, 11);
  }
  if (labels) metaText(ctx, 'keer verdund', x0 + (n - 1) * dx + 86, y + 44, C.text2, 'left', 16);
  if (pipet >= 0) { const px = x0 + pipet * dx; pipetje(ctx, px, y - bh - 34, 1, { a: 1, t }); }
  ctx.restore();
}

// pipet met een druppel aan de punt
function pipetje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, druppel = 1, volume = null } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -15, -150, 30, 108, 8); shape(ctx, '#4A5468', '#8FA0B5', 2);
  ctx.beginPath(); ctx.moveTo(-11, -42); ctx.lineTo(11, -42); ctx.lineTo(4, 4); ctx.lineTo(-4, 4); ctx.closePath();
  shape(ctx, rgba('#AFC0D0', 0.3), '#AFC0D0', 2);
  if (druppel > 0.01) { const dy = 10 + 16 * ((t * 1.2) % 1); ctx.save(); ctx.globalAlpha *= druppel * (1 - (t * 1.2) % 1);
    ctx.beginPath(); ctx.ellipse(0, dy, 6, 8, 0, 0, 6.283); shape(ctx, rgba('#E8E2D2', 0.85), null); ctx.restore(); }
  if (volume) { ctx.restore(); metaText(ctx, volume, x + 26, y - 96, C.goud, 'left', 20); return; }
  ctx.restore();
}

// =====================================================================================
// MIC-REEKS: buisjes waarin de concentratie elke stap verdubbelt; troebel tot de MIC, daarna helder.
// conc = [0.016, ...]; mic = de eerste heldere concentratie; toon 0..1 = hoeveel buisjes al staan.
// =====================================================================================
function micReeks(ctx, x0, y, conc, mic, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { dx = 124, bw = 56, bh = 150, toon = 1, hlMic = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  conc.forEach((c, i) => {
    const x = x0 + i * dx, op = clamp(toon * conc.length - i, 0, 1); if (op <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= ease(op);
    ctx.beginPath(); ctx.moveTo(x - bw / 2, y - bh); ctx.lineTo(x - bw / 2, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2, Math.PI, 0, true); ctx.lineTo(x + bw / 2, y - bh); ctx.closePath();
    shape(ctx, rgba('#8FD0E8', 0.08), rgba('#AFC0D0', 0.75), 2.5);
    const groei = c < mic - 1e-9;
    ctx.beginPath(); ctx.moveTo(x - bw / 2 + 3, y - bh * 0.76); ctx.lineTo(x - bw / 2 + 3, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2 - 3, Math.PI, 0, true); ctx.lineTo(x + bw / 2 - 3, y - bh * 0.76); ctx.closePath();
    shape(ctx, groei ? rgba('#E8E2D2', 0.6) : rgba('#8FD0E8', 0.1), null);
    metaText(ctx, String(c).replace('.', ','), x, y + 42, groei ? C.grain : C.teal, 'center', 19);
    if (Math.abs(c - mic) < 1e-9 && hlMic > 0.01) { ctx.save(); ctx.globalAlpha *= hlMic;
      roundRect(ctx, x - bw / 2 - 10, y - bh - 12, bw + 20, bh + 26, 10); shape(ctx, null, C.groen, 5); ctx.restore(); }
    ctx.restore();
  });
  metaText(ctx, 'milligram per liter', x0 + (conc.length - 1) * dx / 2, y + 84, C.text2, 'center', 17);
  ctx.restore();
}

// =====================================================================================
// BREEKPUNT-SCHAAL: een as in millimeter met een vaste grens; links resistent, rechts gevoelig,
// met een smalle tussenstrook. Twee gemeten zones komen er als stippen op te staan.
// =====================================================================================
function breekpuntAs(ctx, x, y, w, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { grens = 19, tussen = 2, lo = 0, hi = 34, punten = [], toonLab = 1 } = o;
  const X = v => x + (v - lo) / (hi - lo) * w;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, X(lo), y - 20, X(grens) - X(lo), 40, 6); shape(ctx, rgba(C.koraal, 0.2), rgba(C.koraal, 0.8), 2);
  roundRect(ctx, X(grens), y - 20, X(grens + tussen) - X(grens), 40, 6); shape(ctx, rgba(C.oker, 0.25), rgba(C.oker, 0.8), 2);
  roundRect(ctx, X(grens + tussen), y - 20, X(hi) - X(grens + tussen), 40, 6); shape(ctx, rgba(C.groen, 0.2), rgba(C.groen, 0.8), 2);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(X(grens), y - 30); ctx.lineTo(X(grens), y + 46); ctx.stroke();
  if (toonLab > 0.01) { ctx.save(); ctx.globalAlpha *= toonLab;
    regel(ctx, 'resistent', X(lo) + 14, y + 128, 1, C.koraal, 30, 'left', 700);
    regel(ctx, 'gevoelig', X(hi) - 14, y + 128, 1, C.groen, 30, 'right', 700);
    metaText(ctx, 'breekpunt', X(grens), y + 82, C.goud, 'center', 20);
    metaText(ctx, 'tussengebied', X(grens + tussen / 2), y + 110, C.oker, 'center', 18); ctx.restore(); }
  // gemeten zones: afwisselend boven elkaar, zodat de labels elkaar niet raken
  punten.forEach((p, i) => { const col = p.v >= grens + tussen ? C.groen : (p.v >= grens ? C.oker : C.koraal);
    circ(ctx, X(p.v), y, 15, rgba(col, 0.9), col, 3);
    if (p.nm) regel(ctx, p.nm, X(p.v), y - 46 - i * 54, p.a == null ? 1 : p.a, col, 30, 'center', 700); });
  metaText(ctx, 'remzone in millimeter', X(hi), y + 176, C.text2, 'right', 18);
  ctx.restore();
}

// =====================================================================================
// BACTERIE met plasmide, voor conjugatie. Recept: staafvorm met een dikke celwand en een membraan
// eronder; binnen het membraan een opgekruld nucleoïde en een of meer kleine ringetjes (plasmiden);
// alles helemaal binnen het membraan (BEELDAFSPRAKEN 23 okt 2026). Een pilus is een dun buisje
// tussen twee cellen; de kopie van het plasmide gaat zichtbaar door de wand heen.
// Bekende fouten: plasmide half over de rand, pilus als los haartje, kern in een bacterie.
// =====================================================================================
function bacterieLT(ctx, x, y, L, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { rot = 0, col = C.teal, plasmide = 0, mutatie = 0, t = 0, dood = 0, hlGen = 0 } = o;
  const hw = L / 4.4;
  ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot);
  const kleur = dood > 0.5 ? C.text2 : col;
  // celwand + membraan (capsule)
  roundRect(ctx, -L / 2, -hw, L, 2 * hw, hw); shape(ctx, rgba(kleur, 0.16), rgba(kleur, 0.9), Math.max(3, hw * 0.22));
  roundRect(ctx, -L / 2 + hw * 0.3, -hw + hw * 0.3, L - hw * 0.6, 2 * hw - hw * 0.6, hw * 0.7);
  shape(ctx, null, rgba('#F2E6C8', 0.6), Math.max(1.2, hw * 0.07));
  // nucleoïde: één kronkelende lus binnen het membraan
  ctx.save(); roundRect(ctx, -L / 2 + hw * 0.35, -hw + hw * 0.35, L - hw * 0.7, 2 * hw - hw * 0.7, hw * 0.65); ctx.clip();
  ctx.strokeStyle = rgba(hlGen > 0.01 ? C.goud : C.paars, 0.95); ctx.lineWidth = Math.max(2, hw * 0.13);
  ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = i / 120 * 6.283;
    const px = -L * 0.08 + Math.cos(u) * L * 0.2 + Math.cos(u * 9) * hw * 0.17, py = Math.sin(u) * hw * 0.34 + Math.sin(u * 9) * hw * 0.13;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // het veranderde gen als een opvallend stukje op de lus
  if (mutatie > 0.01) { ctx.save(); ctx.globalAlpha *= mutatie; const u = 1.1;
    const px = -L * 0.08 + Math.cos(u) * L * 0.2 + Math.cos(u * 9) * hw * 0.17, py = Math.sin(u) * hw * 0.34 + Math.sin(u * 9) * hw * 0.13;
    circ(ctx, px, py, Math.max(4, hw * 0.2), C.goud, lighten(C.goud, 0.3), 2); ctx.restore(); }
  // ribosomen
  for (let i = 0; i < 26; i++) { const px = (hash(i * 2.3 + 1) - 0.5) * (L - hw), py = (hash(i * 3.1 + 2) - 0.5) * (1.5 * hw);
    if (Math.abs(px + L * 0.08) < L * 0.24 && Math.abs(py) < hw * 0.45) continue;
    circ(ctx, px, py, Math.max(1.6, hw * 0.055), rgba('#C9B896', 0.85)); }
  // plasmide: klein ringetje, helemaal binnen het membraan
  if (plasmide > 0.01) { ctx.save(); ctx.globalAlpha *= plasmide;
    const pr = hw * 0.38, px0 = L * 0.3, py0 = hw * 0.25, lw = Math.max(3, hw * 0.13);
    ctx.beginPath(); ctx.ellipse(px0, py0, pr, pr * 0.78, 0.3, 0, 6.283); shape(ctx, null, C.groen, lw);
    ctx.beginPath(); ctx.ellipse(px0, py0, pr, pr * 0.78, 0.3, -0.6, 0.6);  // het resistentiegen
    ctx.strokeStyle = C.goud; ctx.lineWidth = lw + 2; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  ctx.restore();  // clip
  ctx.restore();  // translate/rotate
  return { rechts: [x + Math.cos(rot) * L / 2, y + Math.sin(rot) * L / 2], links: [x - Math.cos(rot) * L / 2, y - Math.sin(rot) * L / 2] };
}

// los plasmide-ringetje (voor de kopie die overgaat)
function plasmideRing(ctx, x, y, r, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { col = C.groen, gen = 1, lw = 5 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0.3, 0, 6.283);
  shape(ctx, null, col, lw);
  if (gen > 0.01) { ctx.save(); ctx.globalAlpha *= gen; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0.3, -0.5, 0.5);
    ctx.strokeStyle = C.goud; ctx.lineWidth = lw + 3; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// pilus tussen twee punten: een dun buisje met een lichte wand
function pilus(ctx, p1, p2, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { groei = 1, t = 0 } = o;
  const g = ease(groei), x2 = p1[0] + (p2[0] - p1[0]) * g, y2 = p1[1] + (p2[1] - p1[1]) * g;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba('#AFC0D0', 0.9); ctx.lineWidth = 13; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.strokeStyle = rgba('#1A2740', 0.8); ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
  return [x2, y2];
}

// =====================================================================================
// WARMTEKAST: kast met een glazen deur, roosters met platen erin, en een temperatuurdisplay.
// =====================================================================================
function warmtekast(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { graden = '37 °C', platen = 4, hl = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba('#2A3446', 0.95), hl > 0.01 ? C.goud : '#7A8498', hl > 0.01 ? 4 : 3);
  roundRect(ctx, x - w / 2 + 14, y - h / 2 + 58, w - 28, h - 86, 8); shape(ctx, rgba('#8FD0E8', 0.07), rgba('#AFC0D0', 0.6), 2);
  for (let i = 0; i < platen; i++) { const py = y - h / 2 + 92 + i * (h - 150) / Math.max(1, platen - 1);
    ctx.strokeStyle = rgba('#8FA0B5', 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w / 2 + 24, py); ctx.lineTo(x + w / 2 - 24, py); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, py - 6, w * 0.19, 7, 0, 0, 6.283); shape(ctx, rgba(KL_PLAAT, 0.5), rgba(KL_SCHAAL, 0.7), 1.5); }
  roundRect(ctx, x - w / 2 + 18, y - h / 2 + 14, 118, 34, 5); shape(ctx, rgba('#0D1420', 0.9), '#6A7488', 2);
  text(ctx, graden, x - w / 2 + 77, y - h / 2 + 39, fMeta(24), C.goud, 'center');
  ctx.restore();
}

// potje urine met etiket
function monsterPotje(ctx, x, voetY, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { etiket = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, voetY); ctx.scale(s, s);
  roundRect(ctx, -34, -96, 68, 96, 7); shape(ctx, rgba('#AFC0D0', 0.2), rgba('#C9CED6', 0.85), 2.5);
  roundRect(ctx, -31, -58, 62, 55, 5); shape(ctx, rgba('#E0B64A', 0.45), null);              // urine
  roundRect(ctx, -38, -112, 76, 20, 5); shape(ctx, '#D8DEE4', '#9AA3B2', 2);                  // deksel
  if (etiket > 0.01) { ctx.save(); ctx.globalAlpha *= etiket; roundRect(ctx, -29, -88, 58, 26, 3); shape(ctx, '#F2F2EE', '#9AA3B2', 1.5);
    ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; [-80, -72].forEach(yy => { ctx.beginPath(); ctx.moveTo(-23, yy); ctx.lineTo(19, yy); ctx.stroke(); }); ctx.restore(); }
  ctx.restore();
}

// doosje antibiotica (leeg), in de hand van Opa Henk
function pilDoosje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { rot = -0.12 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -46, -32, 92, 64, 6); shape(ctx, '#E8ECF0', '#9AA3B2', 2.5);
  ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fillRect(-46, -32, 92, 13);
  ctx.strokeStyle = '#8A93A2'; ctx.lineWidth = 2.5; [-6, 4, 14].forEach(yy => { ctx.beginPath(); ctx.moveTo(-34, yy); ctx.lineTo(22 + yy, yy); ctx.stroke(); });
  ctx.restore();
}

// telefoon in de hand (recap)
function telefoontje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -17, -34, 34, 68, 7); shape(ctx, '#2A3446', '#8FA0B5', 2);
  roundRect(ctx, -13, -29, 26, 52, 4); shape(ctx, rgba('#8FD0E8', 0.3), null);
  for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 0.7 * (1 - u);
    circ(ctx, 0, -40, 14 + u * 26, null, rgba(C.teal, 0.8), 3); ctx.restore(); }
  ctx.restore();
}

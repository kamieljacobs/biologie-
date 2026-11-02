// Wat word jij? · Milieukunde 2 · Van wieg tot graf — eigen tekeningen (testvel, 1 nov 2026)
// Seriekleuren (script_v2): oker = grondstof en fabriek, teal = water, groen = land en bos, blauw = stikstof naar zee,
// koraal = broeikasgas (CO₂-eq), goud = focus / functionele eenheid / advies. Plastic lichtgrijs, papier kraftbruin. Geen paars.
// Alle functies: (ctx, x, y, s, o) rond (x, y); tassen staan met (x, y) = midden van de bodem, tenzij o.hang (dan = handvat).
// Maatvoering tassen: 1 cm = MK2_CM px bij s = 1. Gewichten (getallen 5, 8, 17, 26): dun plastic tasje 8 g (VK, HDPE),
// stevige plastic tas 30 g (NL, LDPE), papieren tas 55 g (VK) / 51 g (NL) / 45 g (DK). Afmetingen staan niet in de bronnen:
// geschat, met de inhoudsverhouding uit het Britse onderzoek (7,4 tegen 5,9 dingen per tas, getal 32 → papier ± 1,26× het
// voorvlak van het dunne tasje). Zie het verslag (twijfels).

const MK2_CM = 6;
const MK2 = {
  plastic: '#DCE1E7', plasticR: '#F4F6F8', plasticD: '#A9B2BF',      // dun tasje: lichtgrijs, iets doorschijnend
  ldpe: '#B9C2CE', ldpeR: '#DCE2EA', ldpeD: '#8D98A8',               // stevige tas: dikker, dichter grijs
  kraft: '#B98A57', kraftR: '#D4AC7C', kraftD: '#8E643A',            // papier: kraftbruin
  katoen: '#E8DFCB', katoenR: '#F6F0E2', katoenD: '#BFB298',         // katoen: ecru
  stikstof: '#5B7FD6',                                               // blauw = stikstof naar zee
  papier: '#F2EEE4', papierD: '#C9C0AE', inkt: '#2E3A52', potlood: '#4A3E30'
};

// ---------- kleine hulpjes (zoals mk1: laag, lijn, metaA) ----------
function mk2_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function mk2_lijn(ctx, pts, col, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function mk2_meta(ctx, s2, x, y, col = C.grain, al = 'left', px = 28, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function mk2_bol(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }

// =====================================================================
// 1. DE TASSEN
// =====================================================================

// DUN PLASTIC TASJE (hemdtasje, HDPE, 8 g): 28 cm breed, 38 cm lijf + 14 cm hengsels uit één stuk folie, zijvouwen, lasnaad
// onderaan. o.vol 0..1 = bol van de boodschappen; o.hang = aan de hand (x, y = waar de hengsels samenkomen); o.kreuk = rimpels.
function mk2_plasticTasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vol = 0, hang = false, kreuk = 1, kl = MK2.plastic, klR = MK2.plasticR, klD = MK2.plasticD } = o; if (a <= 0.01) return;
  const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); if (hang) ctx.translate(0, 52 * c);
  const B = 14 * c, Hl = 38 * c, Hh = 52 * c, bol = vol * 2.2 * c, hx = hang ? 3 * c : 6 * c, hb = hang ? 2.5 * c : 0; // hengsels naar elkaar toe bij hangen
  ctx.beginPath(); ctx.moveTo(-B + 1 * c, 0); ctx.lineTo(B - 1 * c, 0);
  ctx.quadraticCurveTo(B + bol, -Hl * 0.5, B - (hang ? 2 * c : 0), -Hl);       // rechterzij
  ctx.lineTo(hx + 8 * c - hb, -Hh + 2 * c); ctx.quadraticCurveTo(hx + 8 * c - hb, -Hh, hx + 6 * c - hb, -Hh); // rechterhengsel
  ctx.lineTo(hx + 1 * c, -Hh); ctx.quadraticCurveTo(hx, -Hh, hx, -Hh + 2 * c); ctx.lineTo(hx, -Hl - 1 * c);
  ctx.quadraticCurveTo(0, -Hl + 3 * c, -hx, -Hl - 1 * c);                       // opening
  ctx.lineTo(-hx, -Hh + 2 * c); ctx.quadraticCurveTo(-hx, -Hh, -hx - 1 * c, -Hh); ctx.lineTo(-hx - 6 * c + hb, -Hh);
  ctx.quadraticCurveTo(-hx - 8 * c + hb, -Hh, -hx - 8 * c + hb, -Hh + 2 * c); ctx.lineTo(-B + (hang ? 2 * c : 0), -Hl);
  ctx.quadraticCurveTo(-B - bol, -Hl * 0.5, -B + 1 * c, 0); ctx.closePath();
  ctx.fillStyle = rgba(kl, 0.9); ctx.fill(); ctx.strokeStyle = klR; ctx.lineWidth = 2; ctx.stroke();
  // zijvouwen (gusset) en lasnaad
  ctx.strokeStyle = rgba(klD, 0.9); ctx.lineWidth = 2;
  [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 3 * c), -2 * c); ctx.quadraticCurveTo(k * (B - 2.5 * c + bol * 0.6), -Hl * 0.5, k * (B - 3.2 * c), -Hl + 1 * c); ctx.stroke(); });
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-B + 2 * c, -1.2 * c); ctx.lineTo(B - 2 * c, -1.2 * c); ctx.stroke();
  // rimpels in de folie
  if (kreuk > 0.01) { ctx.strokeStyle = rgba(klD, 0.55 * kreuk); ctx.lineWidth = 1.6; [[-6, -10, -2, -20], [3, -6, 7, -16], [-9, -24, -4, -32], [4, -25, 9, -33], [-1, -14, 2, -27]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0 * c, y0 * c); ctx.quadraticCurveTo((x0 + x1) / 2 * c + 1.2 * c, (y0 + y1) / 2 * c, x1 * c, y1 * c); ctx.stroke(); }); }
  ctx.restore();
}

// STEVIGE PLASTIC TAS (LDPE, 30 g, 'middelgrote tas' TNO): 40 × 45 cm, dikke folie met uitgestanst handvat (ovaal gat met
// verstevigde rand), bodemvouw zichtbaar. Dichter grijs en dubbele rand, zodat hij duidelijk dikker leest dan het dunne tasje.
function mk2_plasticTas(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vol = 0 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 20 * c, H = 45 * c, bol = vol * 1.5 * c;
  const Bt = B - 1.5 * c; // bovenkant iets smaller dan de bodem (zijvouw)
  ctx.beginPath(); ctx.moveTo(-B, 0); ctx.lineTo(B, 0); ctx.quadraticCurveTo(B + 0.6 * c + bol, -H * 0.5, Bt, -H + 1 * c); ctx.quadraticCurveTo(Bt, -H, Bt - 1 * c, -H);
  ctx.lineTo(-Bt + 1 * c, -H); ctx.quadraticCurveTo(-Bt, -H, -Bt, -H + 1 * c); ctx.quadraticCurveTo(-B - 0.6 * c - bol, -H * 0.5, -B, 0); ctx.closePath();
  // handvatgat als gat in de vorm (evenodd)
  ctx.moveTo(6 * c, -H + 5.5 * c); ctx.ellipse(0, -H + 5.5 * c, 6 * c, 2.2 * c, 0, Math.PI * 2, 0, true);
  ctx.fillStyle = MK2.ldpe; ctx.fill('evenodd'); ctx.strokeStyle = MK2.ldpeR; ctx.lineWidth = 3; ctx.stroke();
  // verstevigde rand rond het handvat + versterkte bovenband (dikker materiaal)
  ctx.beginPath(); ctx.ellipse(0, -H + 5.5 * c, 7.6 * c, 3.6 * c, 0, 0, 6.283); ctx.strokeStyle = MK2.ldpeD; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = rgba(MK2.ldpeD, 0.35); ctx.fillRect(-Bt + 0.5 * c, -H + 10.5 * c, 2 * Bt - 1 * c, 1.2 * c);
  // zijvouwen en dikke rand (dikte van de folie)
  ctx.strokeStyle = rgba(MK2.ldpeD, 0.8); ctx.lineWidth = 2.5; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 3.5 * c), -3.5 * c); ctx.lineTo(k * (Bt - 2.5 * c), -H + 12 * c); ctx.stroke(); });
  ctx.strokeStyle = rgba(MK2.ldpeR, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-Bt + 1.2 * c, -H + 1.4 * c); ctx.lineTo(Bt - 1.2 * c, -H + 1.4 * c); ctx.stroke();
  // bodemvouw
  ctx.fillStyle = rgba(MK2.ldpeD, 0.5); ctx.beginPath(); ctx.moveTo(-B, 0); ctx.lineTo(B, 0); ctx.lineTo(B - 2 * c, -3.5 * c); ctx.lineTo(-B + 2 * c, -3.5 * c); ctx.closePath(); ctx.fill();
  ctx.restore();
}

// PAPIEREN TAS (boodschappentas, 55 g VK / 51 g NL / 45 g DK): voorvlak 32 × 42 cm, zijvouw 17 cm (hier een smalle strook in
// driekwartaanzicht), ingevouwen bovenrand, getwijnde papieren hengsels (± 12 cm boog), bodemvouw.
function mk2_papierTas(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hang = false } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 16 * c, H = 42 * c, Z = 6 * c; // Z = zichtbare zijvouw
  if (hang) ctx.translate(0, H + 12 * c);
  // zijvouw (rechts, donkerder) met de W-vouw
  ctx.beginPath(); ctx.moveTo(B, 0); ctx.lineTo(B + Z, -2 * c); ctx.lineTo(B + Z, -H - 2 * c); ctx.lineTo(B, -H); ctx.closePath(); ctx.fillStyle = MK2.kraftD; ctx.fill();
  ctx.strokeStyle = rgba('#6E4A28', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(B + Z / 2, -1 * c); ctx.lineTo(B + Z / 2, -H - 1 * c); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(B, 0); ctx.lineTo(B + Z / 2, -5 * c); ctx.lineTo(B + Z, -2 * c); ctx.stroke();
  // achterste hengsel
  const hengsel = (dx, kl, lw) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx - 7 * c, -H + 3 * c); ctx.bezierCurveTo(dx - 7 * c, -H - 13 * c, dx + 7 * c, -H - 13 * c, dx + 7 * c, -H + 3 * c); ctx.stroke(); };
  hengsel(Z * 0.6, MK2.kraftD, 1.3 * c);
  // voorvlak
  ctx.beginPath(); ctx.rect(-B, -H, 2 * B, H); ctx.fillStyle = MK2.kraft; ctx.fill();
  ctx.fillStyle = MK2.kraftR; ctx.fillRect(-B, -H, 2 * B, 4 * c);          // ingevouwen bovenrand
  ctx.strokeStyle = rgba('#6E4A28', 0.55); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-B, -H + 4 * c); ctx.lineTo(B, -H + 4 * c); ctx.stroke();
  ctx.fillStyle = rgba(MK2.kraftD, 0.55); ctx.fillRect(-B, -5 * c, 2 * B, 5 * c); // bodemvouw
  ctx.strokeStyle = rgba('#6E4A28', 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-B + 1.5 * c, -5 * c); ctx.lineTo(-B + 1.5 * c, -H + 4 * c); ctx.stroke();
  // voorste hengsel met twist-streepjes
  hengsel(0, MK2.kraftD, 1.3 * c); ctx.strokeStyle = rgba(MK2.kraftR, 0.8); ctx.lineWidth = 1.2;
  for (let i = 1; i < 12; i++) { const u = i / 12, bx = (1 - u) ** 3 * -7 + 3 * (1 - u) ** 2 * u * -7 + 3 * (1 - u) * u * u * 7 + u ** 3 * 7, by = (1 - u) ** 3 * 3 + 3 * (1 - u) ** 2 * u * -13 + 3 * (1 - u) * u * u * -13 + u ** 3 * 3; ctx.beginPath(); ctx.moveTo((bx - 0.4) * c, (-H / c + by - 0.4) * c); ctx.lineTo((bx + 0.4) * c, (-H / c + by + 0.4) * c); ctx.stroke(); }
  // lijmplekjes van het hengsel
  ctx.fillStyle = MK2.kraftR; [-7, 7].forEach(k => { roundRect(ctx, (k - 1.6) * c, -H + 1.2 * c, 3.2 * c, 2.6 * c, 3); ctx.fill(); });
  ctx.restore();
}

// PAPIEREN TASJE (lunchzakje van Thijs, kraft): 15 cm breed, 26 cm hoog, zijvouw als twee lijnen, bovenrand twee keer omgevouwen
// (flap, o.open = flap omhoog: tasje staat open). o.turf = aantal streepjes (pen) op het voorvlak, o.scheur 0..1 = scheurtje
// rechtsboven (bij streepje tien, twijfel t9). o.hang = aan de hand (x, y = midden van de omgevouwen rand).
function mk2_papierTasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, open = 0, turf = 0, scheur = 0, hang = false, lunch = 0 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 7.5 * c, H = 26 * c, F = 4 * c; if (hang) ctx.translate(0, H - F * (1 - open));
  const top = -H + F * (1 - open); // bovenkant (dichtgevouwen lager)
  // inhoud (broodje, appel) steekt boven het open tasje uit
  if (open > 0.3 && lunch > 0.01) mk2_laag(ctx, lunch, () => { mk2_bol(ctx, 2.5 * c, top - 1.8 * c, 3.2 * c, '#C8473C', '#E07A6A', 1.5); ctx.strokeStyle = '#6A4A2A'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(2.8 * c, top - 5 * c); ctx.lineTo(3.3 * c, top - 6.4 * c); ctx.stroke();
    roundRect(ctx, -6 * c, top - 3.2 * c, 7.5 * c, 4 * c, 1.6 * c); shape(ctx, '#D9B56E', '#EED29A', 1.5); ctx.fillStyle = '#7FC48F'; ctx.fillRect(-5.6 * c, top - 0.6 * c, 6.8 * c, 0.8 * c); });
  ctx.beginPath(); ctx.moveTo(-B, 0); ctx.lineTo(B, 0); ctx.lineTo(B, top); ctx.lineTo(-B, top); ctx.closePath(); ctx.fillStyle = MK2.kraft; ctx.fill();
  if (open > 0.5) { // open: gekartelde rand en de binnenkant
    ctx.fillStyle = MK2.kraftD; ctx.beginPath(); ctx.moveTo(-B, top); for (let i = 0; i <= 10; i++) ctx.lineTo(-B + i * 2 * B / 10, top + (i % 2 ? 0.7 * c : 0)); ctx.lineTo(B, top + 1.6 * c); ctx.lineTo(-B, top + 1.6 * c); ctx.closePath(); ctx.fill(); }
  else { // omgevouwen flap
    ctx.fillStyle = MK2.kraftR; ctx.fillRect(-B, top, 2 * B, F * 0.55); ctx.strokeStyle = rgba('#6E4A28', 0.6); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-B, top + F * 0.55); ctx.lineTo(B, top + F * 0.55); ctx.stroke(); }
  ctx.strokeStyle = rgba('#6E4A28', 0.45); ctx.lineWidth = 1.6; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 1.4 * c), -0.5 * c); ctx.lineTo(k * (B - 1.4 * c), top + F); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-B + 1.4 * c, -3 * c); ctx.lineTo(0, -1.4 * c); ctx.lineTo(B - 1.4 * c, -3 * c); ctx.stroke(); // bodemvouw
  if (turf > 0.01) mk2_turf(ctx, -B + 3.2 * c, top + F + 2.6 * c, Math.min(turf, 10), { h: 3.6 * c, gap: 1.4 * c, kl: MK2.potlood, lw: 3, perRij: 5 });
  if (scheur > 0.01) mk2_laag(ctx, scheur, () => { ctx.beginPath(); ctx.moveTo(B, top + F + 0.5 * c); ctx.lineTo(B - 1.3 * c, top + F + 1.8 * c); ctx.lineTo(B - 0.6 * c, top + F + 2.8 * c); ctx.lineTo(B - 2.2 * c, top + F + 4.4 * c); ctx.lineTo(B - 1.6 * c, top + F + 5.2 * c); ctx.lineTo(B, top + F + 4.0 * c); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = MK2.kraftR; ctx.lineWidth = 1.5; ctx.stroke(); });
  ctx.restore();
}

// KATOENEN TAS (tote): 38 × 42 cm, twee lange hengsels (2,5 cm breed, boog ± 28 cm), gestikte zoom (stippellijn), ecru.
function mk2_katoenTas(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hang = false } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 19 * c, H = 42 * c; if (hang) ctx.translate(0, H + 28 * c);
  const hengsel = (kl) => { ctx.strokeStyle = kl; ctx.lineWidth = 2.5 * c; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-9 * c, -H + 3 * c); ctx.bezierCurveTo(-9 * c, -H - 36 * c, 9 * c, -H - 36 * c, 9 * c, -H + 3 * c); ctx.stroke(); };
  ctx.save(); ctx.translate(1.5 * c, -0.6 * c); hengsel(MK2.katoenD); ctx.restore();   // achterste hengsel
  roundRect(ctx, -B, -H, 2 * B, H, 0.8 * c); ctx.fillStyle = MK2.katoen; ctx.fill();
  ctx.fillStyle = rgba(MK2.katoenD, 0.35); ctx.fillRect(-B, -H, 2 * B, 3 * c);                  // omgeslagen zoom
  hengsel(MK2.katoenR); ctx.strokeStyle = rgba(MK2.katoenD, 0.9); ctx.lineWidth = 1.4; ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.moveTo(-B + 1 * c, -H + 3.6 * c); ctx.lineTo(B - 1 * c, -H + 3.6 * c); ctx.stroke();
  [-9, 9].forEach(k => { ctx.strokeRect((k - 1.6) * c, -H + 0.6 * c, 3.2 * c, 5 * c); });   // vastgestikte hengsels
  ctx.setLineDash([]); ctx.strokeStyle = rgba(MK2.katoenD, 0.5); ctx.lineWidth = 1.5; // zachte stofplooien
  [[-10, -6, -12, -20], [8, -4, 11, -18]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0 * c, y0 * c); ctx.quadraticCurveTo((x0 + x1) / 2 * c + 1.5 * c, (y0 + y1) / 2 * c, x1 * c, y1 * c); ctx.stroke(); });
  ctx.restore();
}

// klein tasje voor rasters en vakken (4 soorten), 1 eenheid ≈ 1 px; s = hoogte in px van het lijf
function mk2_miniTas(ctx, x, y, h, soort, a = 1) { if (a <= 0.01) return; const s = h / (MK2_CM * 45);
  if (soort === 'plastic') mk2_plasticTasje(ctx, x, y, s * 0.95, { a, kreuk: 0 });
  else if (soort === 'ldpe') mk2_plasticTas(ctx, x, y, s, { a });
  else if (soort === 'katoen') mk2_katoenTas(ctx, x, y, s * 0.85, { a });
  else if (soort === 'tasje') mk2_papierTasje(ctx, x, y, s * 1.3, { a });
  else mk2_papierTas(ctx, x, y, s, { a }); }

// TURFLIJST: groepjes van vier streepjes met een schuine vijfde. n mag een breuk zijn (het laatste streepje groeit).
// Geeft de breedte terug. o.perRij = streepjes per rij (daarna een nieuwe rij).
function mk2_turf(ctx, x, y, n, o = {}) { const { h = 40, gap = 14, kl = C.text, lw = 4, perRij = 25, a = 1 } = o; if (a <= 0.01 || n <= 0) return 0; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const groep = 4 * gap + gap * 1.6; let maxx = 0;
  for (let i = 0; i < Math.ceil(n); i++) { const f = Math.min(1, n - i); const rij = Math.floor(i / perRij), j = i % perRij, g = Math.floor(j / 5), k = j % 5; const gx = x + g * groep, gy = y + rij * h * 1.5;
    ctx.beginPath(); if (k < 4) { const xx = gx + k * gap + (hash(i * 3.3) - 0.5) * gap * 0.15; ctx.moveTo(xx, gy + h); ctx.lineTo(xx + (hash(i) - 0.5) * gap * 0.2, gy + h - h * f); maxx = Math.max(maxx, xx); }
    else { ctx.moveTo(gx - gap * 0.45, gy + h * 0.85); ctx.lineTo(gx - gap * 0.45 + (3 * gap + gap * 0.9) * f, gy + h * 0.85 - h * 0.7 * f); maxx = Math.max(maxx, gx + 3.5 * gap); } ctx.stroke(); }
  ctx.restore(); return maxx - x; }

// =====================================================================
// 2. STROOK 'VAN WIEG TOT GRAF' en de pictogrammen per stap (y = grondlijn, ± 120 px hoog bij s = 1)
// =====================================================================

// ja-knikker (oliebron): bok, balans, paardenkop, contragewicht; t laat hem knikken
function mk2_oliebron(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kl = '#9A7A3E', klL = C.oker; ctx.fillStyle = '#5A4A34'; ctx.fillRect(-70, -8, 140, 8);
  ctx.strokeStyle = kl; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(0, -84); ctx.lineTo(26, -8); ctx.stroke(); // bok
  const an = Math.sin(t * 1.6) * 0.18; ctx.save(); ctx.translate(0, -84); ctx.rotate(an);
  roundRect(ctx, -62, -6, 112, 12, 5); shape(ctx, klL, null); // balans
  ctx.beginPath(); ctx.moveTo(-62, -12); ctx.quadraticCurveTo(-82, -6, -76, 22); ctx.lineTo(-62, 8); ctx.closePath(); shape(ctx, klL, null); // paardenkop
  ctx.restore(); mk2_bol(ctx, 0, -84, 6, '#5A4A34');
  const kx = -76 * Math.cos(an) - 22 * Math.sin(an) * 0 , ky = -84 + (-76) * Math.sin(an) + 22; ctx.strokeStyle = '#6E6A66'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70 * Math.cos(an), -84 - 70 * Math.sin(an) + 22); ctx.lineTo(-70, -8); ctx.stroke(); // stang naar de put
  ctx.save(); ctx.translate(44, -50); mk2_bol(ctx, 0, 0, 16, '#7A6440'); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4 * Math.cos(an) - 0, -34 + 34 * an); ctx.stroke(); ctx.restore(); // krukas
  roundRect(ctx, -78, -22, 16, 14, 3); shape(ctx, '#5A4A34', null); ctx.restore(); }

// plasticgranulaat (korrels): bergje lensvormige korrels + een paar losse
function mk2_korrels(ctx, x, y, s = 1, o = {}) { const { a = 1, kl = MK2.plastic } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const korrel = (px, py, r) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.72, hash(px * 0.37 + py) * 3, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = '#8A94A4'; ctx.lineWidth = 1.4; ctx.stroke(); };
  for (let rij = 0; rij < 6; rij++) { const n = 9 - rij, w = n * 13; for (let i = 0; i < n; i++) korrel(-w / 2 + 6 + i * 13 + (hash(rij * 9 + i) - 0.5) * 4, -6 - rij * 10 + (hash(i * 5 + rij) - 0.5) * 3, 6.5); }
  korrel(-66, -5, 6); korrel(62, -4, 6); korrel(52, -12, 5.5); ctx.restore(); }

// fabriek: hal met zaagtanddak, schoorsteen (rookwolkje grijs, o.rook 0..1), o.kl = accentkleur van het dak
function mk2_fabriek(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, rook = 1, kl = C.oker } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#4A5672'; ctx.fillRect(34, -118, 18, 70); // schoorsteen
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-70, -50); for (let i = 0; i < 3; i++) { ctx.lineTo(-70 + i * 40, -78); ctx.lineTo(-30 + i * 40, -50); } ctx.lineTo(70, -50); ctx.lineTo(70, 0); ctx.closePath(); ctx.fillStyle = '#5A6884'; ctx.fill();
  ctx.fillStyle = kl; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-70 + i * 40, -78); ctx.lineTo(-64 + i * 40, -78); ctx.lineTo(-30 + i * 40, -54); ctx.lineTo(-30 + i * 40, -50); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#2A3A58'; for (let i = 0; i < 3; i++) ctx.fillRect(-58 + i * 34, -38, 20, 16); ctx.fillStyle = '#33405C'; ctx.fillRect(40, -30, 22, 30);
  if (rook > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 0.35 + i / 3) % 1; mk2_bol(ctx, 43 + ph * 22, -126 - ph * 40, 9 + ph * 10, rgba('#AEB6C2', 0.75 * rook * (1 - ph))); }
  ctx.restore(); }

// containerschip (naar schip() uit Biotechnologie 3, teken_bt3.js): romp, containers in rijen, brug achter; t = deinen
function mk2_schip(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.4) * 2); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-84, -30); ctx.lineTo(90, -30); ctx.lineTo(74, 0); ctx.lineTo(-76, 0); ctx.closePath(); ctx.fillStyle = '#3A4A66'; ctx.fill(); ctx.fillStyle = '#B8473C'; ctx.fillRect(-80, -9, 160, 5);
  const kl = ['#C9A35C', '#5BA4C9', '#B8473C', '#7FC48F', '#9AA3B2'];
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { roundRect(ctx, -70 + i * 24, -50 - r * 18, 22, 17, 2); shape(ctx, kl[(i + r * 2) % 5], null); }
  roundRect(ctx, 56, -70, 22, 40, 3); shape(ctx, '#C9D2DE', null); ctx.fillStyle = '#2A3A58'; ctx.fillRect(59, -64, 16, 5);
  ctx.strokeStyle = rgba('#6A8BB5', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 50, 6); ctx.quadraticCurveTo(-78 + i * 50, 0, -66 + i * 50, 6); ctx.stroke(); }
  ctx.restore(); }

// vrachtwagen (naar vrachtwagen() uit Biotechnologie 1, teken_bt1.js), klein, met dozen in plaats van kratten
function mk2_vrachtwagen(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -74, -66, 100, 52, 4); shape(ctx, '#4A5A78', null); roundRect(ctx, 30, -50, 40, 36, 6); shape(ctx, '#5A6E92', null); roundRect(ctx, 44, -46, 20, 14, 3); shape(ctx, '#9AB4CF', null);
  [-52, 0, 50].forEach(wx => { mk2_bol(ctx, wx, -10, 10, '#1C2436', '#8FA0B5', 1.5); mk2_bol(ctx, wx, -10, 4, '#5D6E8C'); }); ctx.restore(); }

// winkel: pui met luifel (strepen), etalage en deur; geen naam of logo
function mk2_winkel(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5A6884'; ctx.fillRect(-64, -96, 128, 96); ctx.fillStyle = '#4A5672'; ctx.fillRect(-70, -104, 140, 10);
  for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#E8E2D4' : '#7FA88A'; ctx.beginPath(); ctx.moveTo(-70 + i * 20, -92); ctx.lineTo(-50 + i * 20, -92); ctx.lineTo(-50 + i * 20, -74); ctx.quadraticCurveTo(-60 + i * 20, -66, -70 + i * 20, -74); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#9AB4CF'; ctx.fillRect(-54, -58, 56, 42); ctx.fillStyle = '#2A3A58'; ctx.fillRect(16, -58, 34, 58);
  ctx.fillStyle = rgba('#C9A35C', 0.9); ctx.fillRect(-48, -30, 12, 14); ctx.fillStyle = rgba('#E07A5F', 0.9); ctx.fillRect(-32, -26, 10, 10); ctx.fillStyle = rgba('#7FC48F', 0.9); ctx.fillRect(-18, -32, 12, 16);
  ctx.restore(); }

// afval: grijze container (kliko). o.soort 'stort' (berg ernaast) | 'verbranden' (vlammetje en schoorsteentje) | 'bak'
function mk2_afval(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'bak', t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'stort') { ctx.beginPath(); ctx.moveTo(-10, 0); ctx.quadraticCurveTo(40, -66, 90, 0); ctx.closePath(); ctx.fillStyle = '#6A5A48'; ctx.fill(); [[22, -14, '#AEB6C2'], [44, -26, '#B98A57'], [60, -12, '#AEB6C2'], [36, -8, '#C9A35C']].forEach(([px, py, k]) => { roundRect(ctx, px, py, 12, 8, 2); shape(ctx, k, null); }); }
  if (soort === 'verbranden') { ctx.fillStyle = '#4A5672'; ctx.fillRect(18, -96, 50, 96); ctx.fillStyle = '#3A4660'; ctx.fillRect(48, -130, 12, 36); ctx.fillStyle = '#2A3448'; ctx.fillRect(26, -50, 28, 26);
    const fl = 1 + Math.sin(t * 9) * 0.12; ctx.beginPath(); ctx.moveTo(30, -26); ctx.quadraticCurveTo(28, -40 * fl, 40, -48 * fl); ctx.quadraticCurveTo(52, -38 * fl, 50, -26); ctx.closePath(); ctx.fillStyle = C.koraal; ctx.fill(); }
  const dx = soort === 'bak' ? 0 : -46; roundRect(ctx, dx - 26, -74, 52, 74, 5); shape(ctx, '#7A8494', null); roundRect(ctx, dx - 30, -82, 60, 10, 4); shape(ctx, '#5E6878', null);
  ctx.fillStyle = '#5E6878'; ctx.fillRect(dx - 22, -60, 44, 4); mk2_bol(ctx, dx - 18, -4, 6, '#2A3040'); mk2_bol(ctx, dx + 18, -4, 6, '#2A3040'); ctx.restore(); }

// bos: drie naaldbomen en een berk (papier komt uit naald- en loofhout), zonder wortels; o.groei 0..1 = teruggroeien (vraag 2)
function mk2_bos(ctx, x, y, s = 1, o = {}) { const { a = 1, groei = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const den = (bx, h, k) => { const g = clamp(groei * 1.2 - k * 0.15, 0.15, 1); h *= g; ctx.fillStyle = '#6A4A30'; ctx.fillRect(bx - 3, -h * 0.22, 6, h * 0.22); for (let i = 0; i < 3; i++) { const yy = -h * (0.15 + i * 0.25), w = h * (0.32 - i * 0.07); ctx.beginPath(); ctx.moveTo(bx - w, yy); ctx.lineTo(bx, yy - h * 0.42); ctx.lineTo(bx + w, yy); ctx.closePath(); ctx.fillStyle = i % 2 ? '#5FA86E' : '#4E9460'; ctx.fill(); } };
  den(-46, 110, 0); den(40, 96, 2); den(-6, 126, 1);
  const g = clamp(groei * 1.2 - 0.4, 0.15, 1), bh = 90 * g; ctx.fillStyle = '#E8E2D4'; ctx.fillRect(64, -bh * 0.55, 6, bh * 0.55); ctx.fillStyle = '#2A2A2A'; [0.15, 0.3, 0.42].forEach(f => ctx.fillRect(64, -bh * f, 4, 2));
  ctx.beginPath(); ctx.ellipse(67, -bh * 0.72, bh * 0.2, bh * 0.28, 0, 0, 6.283); ctx.fillStyle = C.groen; ctx.fill();
  ctx.restore(); }

// pulp: bergje houtsnippers en een kuip met papierpulp (beige brij in water)
function mk2_pulp(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 16; i++) { const px = -72 + hash(i * 3.1) * 40, py = -4 - hash(i * 7.7) * (22 - Math.abs(px + 52) * 0.6); ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i) * 3); ctx.fillStyle = i % 2 ? '#C9A35C' : '#B08A50'; ctx.fillRect(-6, -2.5, 12, 5); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-18, -66); ctx.lineTo(70, -66); ctx.lineTo(62, 0); ctx.lineTo(-10, 0); ctx.closePath(); ctx.fillStyle = '#5A6884'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(26, -64, 44, 9, 0, 0, 6.283); ctx.fillStyle = '#D9CBA8'; ctx.fill();
  ctx.strokeStyle = rgba('#A8977A', 0.9); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(26 + Math.sin(t + i) * 4, -64, 30 - i * 9, 5 - i * 1.4, 0, 0, 6.283); ctx.stroke(); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, -64); ctx.lineTo(26 + Math.cos(t * 2) * 6, -96); ctx.stroke(); // roerder
  ctx.restore(); }

// papierfabriek met waterpijp: hal + papiermachine (rollen) + teal pijp die water aanvoert (o.water 0..1 = stroom zichtbaar)
function mk2_papierfabriek(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, water = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // waterpijp links: van een golfje (rivier) de fabriek in
  ctx.strokeStyle = '#3E7FA6'; ctx.lineWidth = 12; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke();
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; ctx.strokeStyle = '#CFE6F2'; ctx.lineWidth = 3; ctx.setLineDash([6, 10]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke(); ctx.restore(); }
  ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(-114 + i * 18, 0); ctx.quadraticCurveTo(-108 + i * 18, -6, -102 + i * 18, 0); ctx.stroke(); }
  mk2_fabriek(ctx, 0, 0, 0.92, { t, kl: C.oker, rook: 0.7 });
  // papierrol voor de deur
  ctx.beginPath(); ctx.ellipse(84, -14, 8, 14, 0, 0, 6.283); ctx.fillStyle = '#E8E2D4'; ctx.fill(); ctx.fillStyle = '#E8E2D4'; ctx.fillRect(84, -28, 26, 28); ctx.beginPath(); ctx.ellipse(110, -14, 8, 14, 0, 0, 6.283); ctx.fillStyle = '#F4F0E6'; ctx.fill(); mk2_bol(ctx, 110, -14, 3, '#8A8270');
  ctx.restore(); }

// pijltje 'erin' (boven de streep, naar beneden in de stap) of 'eruit' (onder de streep, naar beneden weg)
function mk2_inUit(ctx, x, yLijn, soort, a = 1, s = 1) { if (a <= 0.01) return; const up = soort === 'in'; const kl = up ? C.oker : C.koraal;
  const y0 = up ? yLijn - 168 * s : yLijn + 18 * s, y1 = up ? yLijn - 128 * s : yLijn + 66 * s; pijl(ctx, x, y0, x, y1, kl, a, Math.max(3, 5 * s), Math.max(10, 16 * s)); }

// LANGE STROOK 'WIEG → GRAF': papierstrook met twee rijen (plastic boven, papier onder), elk met een streep; per stap een
// pictogram op de streep, 'erin'-pijltje erboven en 'eruit'-pijltje eronder. o.u 0..1 = uitrollen (rol rechts),
// o.rijen 'beide'|'plastic'|'papier', o.n = aantal getekende stappen per rij (0..6, breuk = verschijnt), o.pijlen 0..1,
// o.hl = [kolommen] goud omrand, o.afval = [plastic, papier] 'stort'|'verbranden'|'bak', o.t. Geeft {kol: [x…], rij: [y plastic, y papier]} terug (lijnhoogtes, voor de scènes).
const MK2_STAPPEN = ['GRONDSTOF', 'MATERIAAL', 'FABRIEK', 'VERVOER', 'WINKEL', 'AFVAL'];
function mk2_strook(ctx, x, y, w, o = {}) {
  const { a = 1, u = 1, rijen = 'beide', n = 6, pijlen = 1, hl = [], t = 0, s = 1, kop = 1, afval = ['stort', 'stort'] } = o; // afval: Brits onderzoek 86 % stort (getal 17) const H = 560 * s;
  const kol = MK2_STAPPEN.map((_, i) => x + 240 * s + i * (w - 370 * s) / 5), rij = [y + 230 * s, y + 470 * s];
  if (a <= 0.01) return { kol, rij }; ctx.save(); ctx.globalAlpha *= a;
  const wu = Math.max(40, w * u); ctx.save(); ctx.beginPath(); ctx.rect(x - 4, y - 10, wu + 4, H + 20); ctx.clip();
  roundRect(ctx, x, y, w, H, 6); ctx.fillStyle = MK2.papier; ctx.fill(); ctx.fillStyle = rgba(MK2.papierD, 0.5); ctx.fillRect(x, y + H - 8, w, 8);
  if (kop > 0.01) { mk2_laag(ctx, kop, () => { text(ctx, 'WIEG', x + 34 * s, y + 62 * s, fTekst(40 * s, 800), MK2.inkt, 'left'); text(ctx, 'GRAF', x + w - 34 * s, y + 62 * s, fTekst(40 * s, 800), MK2.inkt, 'right');
    ctx.strokeStyle = rgba(MK2.inkt, 0.5); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x + 170 * s, y + 50 * s); ctx.lineTo(x + w - 170 * s, y + 50 * s); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, x + w - 200 * s, y + 50 * s, x + w - 166 * s, y + 50 * s, rgba(MK2.inkt, 0.5), 1, 2, 12); }); }
  // goud omrande kolommen (vraag 1)
  hl.forEach(k => { roundRect(ctx, kol[k] - 118 * s, y + 80 * s, 236 * s, H - 100 * s, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = rgba(C.goud, 0.1); ctx.fill(); });
  const rijTek = (r, soort) => { const yl = rij[r]; ctx.strokeStyle = rgba(MK2.inkt, 0.75); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40 * s, yl); ctx.lineTo(x + w - 40 * s, yl); ctx.stroke();
    mk2_miniTas(ctx, x + 80 * s, yl - 8 * s, 110 * s, soort === 'plastic' ? 'plastic' : 'papier');
    const icons = soort === 'plastic'
      ? [(cx, cy, aa) => mk2_oliebron(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_korrels(ctx, cx, cy, s, { a: aa }), (cx, cy, aa) => mk2_fabriek(ctx, cx, cy, s * 0.9, { a: aa, t }), (cx, cy, aa) => mk2_schip(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_winkel(ctx, cx, cy, s * 0.8, { a: aa }), (cx, cy, aa) => mk2_afval(ctx, cx, cy, s * 0.85, { a: aa, soort: afval[0], t })]
      : [(cx, cy, aa) => mk2_bos(ctx, cx, cy, s * 0.85, { a: aa }), (cx, cy, aa) => mk2_pulp(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_papierfabriek(ctx, cx, cy, s * 0.8, { a: aa, t }), (cx, cy, aa) => mk2_vrachtwagen(ctx, cx, cy, s, { a: aa }), (cx, cy, aa) => mk2_winkel(ctx, cx, cy, s * 0.8, { a: aa }), (cx, cy, aa) => mk2_afval(ctx, cx, cy, s * 0.85, { a: aa, soort: afval[1], t })];
    icons.forEach((fn, i) => { const aa = clamp(n - i, 0, 1); if (aa <= 0.01) return; fn(kol[i], yl - 2 * s, aa); mk2_inUit(ctx, kol[i] - 40 * s, yl, 'in', aa * pijlen, s); mk2_inUit(ctx, kol[i] + 40 * s, yl, 'uit', aa * pijlen, s); }); };
  if (rijen !== 'papier') rijTek(0, 'plastic'); if (rijen !== 'plastic') rijTek(1, 'papier');
  ctx.restore();
  if (u < 0.999) { const rx = x + wu; roundRect(ctx, rx - 14, y - 10, 34, H + 20, 16); ctx.fillStyle = '#DCD4C2'; ctx.fill(); ctx.fillStyle = '#C4BAA4'; ctx.fillRect(rx + 2, y - 4, 6, H + 8); } // de rol
  ctx.restore(); return { kol, rij }; }

// =====================================================================
// 3. VIER VAKKEN, METHAAN → CO₂, WEEGSCHAAL EN SCHUIFJE
// =====================================================================

// De vier milieueffecten (TNO 2015 via CE Delft, getallen 8): verhouding plastic : papier per vak, slechtste = 1.
// Klimaat: papier 1,3× beter · stikstof naar zee: papier 3,3× minder · land: papier 244× meer · water: papier 38× meer.
const MK2_VAK = [
  { id: 'klimaat',  naam: 'KLIMAAT',           eenheid: 'KG CO₂',      kl: C.koraal,     p: 1,       q: 1 / 1.3, maal: '1,3×' },
  { id: 'stikstof', naam: 'STIKSTOF NAAR ZEE', eenheid: 'KG N',        kl: MK2.stikstof, p: 1,       q: 1 / 3.3, maal: '3,3×' },
  { id: 'land',     naam: 'LAND',              eenheid: 'M² PER JAAR', kl: C.groen,      p: 1 / 244, q: 1,       maal: '244×' },
  { id: 'water',    naam: 'WATER',             eenheid: 'LITER',       kl: C.teal,       p: 1 / 38,  q: 1,       maal: '38×' }];
// één vak: titel + eenheid in de vakkleur, twee staafjes (plastic tas / papieren tas) op één grondlijn, mini-tas eronder.
// o.staaf 0..1 = groeien (plastic eerst, dan papier), o.hl = goud omrand, o.maal = verhoudingslabel boven het hoogste staafje.
function mk2_vak(ctx, x, y, w, h, i, o = {}) { const { a = 1, staaf = 1, hl = 0, maal = 0, plasticSoort = 'ldpe' } = o; if (a <= 0.01) return; const V = MK2_VAK[i]; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.85), hl > 0.5 ? C.goud : rgba(V.kl, 0.9), hl > 0.5 ? 4 : 2.5);
  ctx.fillStyle = V.kl; roundRect(ctx, x, y, w, 12, 6); ctx.fill();
  let px = 38; ctx.font = fTekst(px, 800); while (px > 26 && ctx.measureText(V.naam).width > w - 30) { px -= 2; ctx.font = fTekst(px, 800); } text(ctx, V.naam, x + w / 2, y + 62, fTekst(px, 800), V.kl, 'center'); metaText(ctx, V.eenheid, x + w / 2, y + 104, C.text2, 'center', 28);
  const g0 = y + h - 110, Hm = h - 280, bw = Math.min(70, w * 0.22); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 24, g0); ctx.lineTo(x + w - 24, g0); ctx.stroke();
  [[V.p, MK2.ldpe, x + w * 0.32, plasticSoort], [V.q, MK2.kraft, x + w * 0.68, 'papier']].forEach(([v, kl, bx, soort], k) => { const gr = clamp(staaf * 2 - k, 0, 1); const hh = Math.max(5, Hm * v * ease(gr));
    if (gr > 0.01) { roundRect(ctx, bx - bw / 2, g0 - hh, bw, hh, Math.min(6, hh / 2)); ctx.fillStyle = kl; ctx.fill(); }
    mk2_miniTas(ctx, bx, g0 + 82, 60, soort); });
  if (maal > 0.01) { const big = V.p >= V.q ? x + w * 0.32 : x + w * 0.68; mk2_laag(ctx, maal, () => text(ctx, V.maal, big, g0 - Hm - 16, fTekst(36, 800), C.text, 'center')); }
  ctx.restore(); }
// vier vakken naast elkaar; o.n = aantal zichtbare vakken (breuk = faden), o.staaf = [4 × 0..1] of één getal
function mk2_vierVakken(ctx, x, y, w, h, o = {}) { const { a = 1, n = 4, staaf = 1, hl = -1, maal = 0 } = o; const gap = 28, vw = (w - 3 * gap) / 4;
  for (let i = 0; i < 4; i++) { const av = clamp(n - i, 0, 1); mk2_vak(ctx, x + i * (vw + gap), y, vw, h, i, { a: a * av, staaf: Array.isArray(staaf) ? staaf[i] : staaf, hl: hl === i ? 1 : 0, maal }); } }

// METHAAN WORDT CO₂: grijs wolkje met methaanmoleculen (C met vier H, bol-en-staaf in neutrale tinten) dat krimpt, terwijl een
// koraal blok 'CO₂' groeit. u 0..1. Geen koe (methaan in de pens zit in Eén aarde).
function mk2_methaan(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(t * 0.3);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = r * 0.18; [[0, -1], [0.94, 0.33], [-0.47, 0.6], [-0.47, -0.2]].forEach(([dx, dy], k) => { const L = r * (k === 3 ? 0.9 : 1.25); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx * L, dy * L); ctx.stroke(); mk2_bol(ctx, dx * L, dy * L, r * 0.36, '#F2F2EE', '#C9CED6', 1.2); });
  mk2_bol(ctx, 0, 0, r * 0.55, '#5E6878', '#9AA3B2', 1.5); ctx.restore(); }
function mk2_methaanNaarCO2(ctx, x, y, s = 1, u = 0, o = {}) { const { a = 1, t = 0, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 1 - ease(u / 0.75), b = ease((u - 0.25) / 0.6); // wolk krimpt en schuift naar links weg terwijl het blok groeit
  if (w > 0.01) { ctx.save(); ctx.translate(-90 * (1 - w), -40 * (1 - w)); ctx.scale(0.35 + 0.65 * w, 0.35 + 0.65 * w); ctx.globalAlpha *= Math.min(1, w * 2.5);
    ctx.fillStyle = '#7C8698'; [[-60, 10, 52], [0, -18, 66], [62, 6, 54], [20, 30, 50], [-28, 34, 44]].forEach(([cx, cy, rr]) => { ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.283); ctx.fill(); });
    mk2_methaan(ctx, -40, 4, 16, t); mk2_methaan(ctx, 34, -12, 16, t + 2); mk2_methaan(ctx, 22, 34, 13, t + 4);
    if (labels > 0.01 && w > 0.6) metaText(ctx, 'METHAAN', 0, 120, C.text2, 'center', 28); ctx.restore(); }
  if (b > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, b * 2); const z = 20 + 60 * b; // kubus van drie vlakken
    ctx.beginPath(); ctx.moveTo(-z, -z * 0.4); ctx.lineTo(0, -z * 0.8); ctx.lineTo(z, -z * 0.4); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = '#F0A48E'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-z, -z * 0.4); ctx.lineTo(0, 0); ctx.lineTo(0, z * 1.1); ctx.lineTo(-z, z * 0.7); ctx.closePath(); ctx.fillStyle = C.koraal; ctx.fill();
    ctx.beginPath(); ctx.moveTo(z, -z * 0.4); ctx.lineTo(0, 0); ctx.lineTo(0, z * 1.1); ctx.lineTo(z, z * 0.7); ctx.closePath(); ctx.fillStyle = '#B85A44'; ctx.fill();
    if (b > 0.6) text(ctx, 'CO₂', -z * 0.5, z * 0.55, fTekst(34, 800), '#2A1A14', 'center'); if (labels > 0.01 && b > 0.6) metaText(ctx, 'OMGEREKEND NAAR CO₂', 0, 80 * 1.1 + 50, C.koraal, 'center', 28); ctx.restore(); }
  ctx.restore(); }

// eenheidsblokje voor op de weegschaal: kleine kaart met eenheid in de vakkleur
function mk2_eenheid(ctx, x, y, s2, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 800); const w = ctx.measureText(s2).width + 36; roundRect(ctx, x - w / 2, y - 52, w, 52, 8); shape(ctx, rgba(kl, 0.25), kl, 2.5); text(ctx, s2, x, y - 16, fTekst(30, 800), C.text, 'center'); ctx.restore(); }

// WEEGSCHAAL (balans, naar weegschaal() uit Biotechnologie 1, teken_bt1.js): o.tilt > 0 = links omlaag; o.links/o.rechts(ctx, px, py)
// tekenen de inhoud op de schaal (py = bodem van de schaal); o.zoek 0..1 laat de balk heen en weer zoeken (vraag 3), o.t.
function mk2_weegschaal(ctx, x, y, s = 1, o = {}) { const { a = 1, zoek = 0, t = 0 } = o; let tilt = o.tilt || 0; tilt += zoek * Math.sin(t * 2.4) * 0.16; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -260); ctx.stroke(); roundRect(ctx, -70, -10, 140, 20, 6); shape(ctx, '#33456A', '#8FA0B5', 2);
  ctx.save(); ctx.translate(0, -260); ctx.rotate(-tilt); ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.stroke(); mk2_bol(ctx, 0, 0, 10, C.goud); ctx.restore();
  const L = [-230 * Math.cos(tilt), -260 + Math.sin(tilt) * 230], R = [230 * Math.cos(tilt), -260 - Math.sin(tilt) * 230];
  [[L, o.links], [R, o.rechts]].forEach(([[px, py], fn]) => { ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 80, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 80, py + 110); ctx.stroke();
    if (fn) fn(ctx, px, py + 108); ctx.beginPath(); ctx.ellipse(px, py + 112, 100, 14, 0, 0, Math.PI); ctx.fillStyle = '#33456A'; ctx.fill(); ctx.stroke(); });
  ctx.restore(); }

// SCHUIFJE 'HOE ZWAAR WEEGT LAND?' (illustratie, zonder getallen): balk met links KLIMAAT (koraal) en rechts LAND (groen),
// gouden knop op v (0 = klimaat zwaar, 1 = land zwaar). Eronder de twee tassen: de winnaar komt omhoog met een gouden ring.
// Richting (getallen 11, 12, t4): land zwaarder → plastic wint; klimaat zwaarder → papier wint.
function mk2_schuifje(ctx, x, y, w, v, o = {}) { const { a = 1, tassen = 1, kop = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kop > 0.01) mk2_laag(ctx, kop, () => text(ctx, 'HOE ZWAAR WEEGT LAND?', x, y - 70, fTekst(40, 800), C.text, 'center'));
  roundRect(ctx, x - w / 2, y - 9, w, 18, 9); ctx.fillStyle = '#2A3A58'; ctx.fill();
  roundRect(ctx, x - w / 2, y - 9, w * v, 18, 9); ctx.fillStyle = rgba(C.groen, 0.7); ctx.fill();
  roundRect(ctx, x - w / 2 + w * v, y - 9, w * (1 - v), 18, 9); ctx.fillStyle = rgba(C.koraal, 0.7); ctx.fill();
  text(ctx, 'KLIMAAT', x - w / 2 - 24, y + 12, fTekst(36, 800), C.koraal, 'right'); text(ctx, 'LAND', x + w / 2 + 24, y + 12, fTekst(36, 800), C.groen, 'left');
  mk2_bol(ctx, x - w / 2 + w * v, y, 26, C.goud, '#F2D88A', 3);
  if (tassen > 0.01) mk2_laag(ctx, tassen, () => { const win = clamp((v - 0.5) * 6, -1, 1); // >0 plastic wint
    [[x - 110, 'ldpe', win], [x + 110, 'papier', -win]].forEach(([tx, soort, ww]) => { const up = Math.max(0, ww) * 30, ty = y + 230 - up;
      if (ww > 0.3) { ctx.beginPath(); ctx.arc(tx, ty - 72, 96, 0, 6.283); ctx.strokeStyle = rgba(C.goud, (ww - 0.3) / 0.7); ctx.lineWidth = 5; ctx.stroke(); }
      mk2_miniTas(ctx, tx, ty, 120, soort, ww < -0.3 ? 0.55 : 1); }); });
  ctx.restore(); }

// =====================================================================
// 4. EEN MAAND BOODSCHAPPEN, TASJES IN RIJEN, RAPPORTEN
// =====================================================================

// één boodschap (± 40 px): 0 melkpak, 1 blik, 2 fles, 3 appel, 4 brood, 5 doos, 6 banaan, 7 pot
function mk2_boodschap(ctx, x, y, k, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (k === 0) { ctx.fillStyle = '#E8ECF2'; ctx.fillRect(-12, -40, 24, 40); ctx.beginPath(); ctx.moveTo(-12, -40); ctx.lineTo(0, -50); ctx.lineTo(12, -40); ctx.fill(); ctx.fillStyle = '#5B8CC9'; ctx.fillRect(-12, -24, 24, 10); }
  else if (k === 1) { ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-12, -30, 24, 30); ctx.fillStyle = '#C8473C'; ctx.fillRect(-12, -22, 24, 12); }
  else if (k === 2) { ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -28); ctx.lineTo(-4, -36); ctx.lineTo(-4, -46); ctx.lineTo(4, -46); ctx.lineTo(4, -36); ctx.lineTo(9, -28); ctx.lineTo(9, 0); ctx.closePath(); ctx.fill(); }
  else if (k === 3) { mk2_bol(ctx, 0, -13, 13, '#C8473C'); ctx.fillStyle = '#7FC48F'; ctx.beginPath(); ctx.ellipse(5, -28, 5, 2.5, -0.5, 0, 6.283); ctx.fill(); }
  else if (k === 4) { roundRect(ctx, -22, -24, 44, 24, 10); ctx.fillStyle = '#C9A35C'; ctx.fill(); ctx.strokeStyle = '#E2C487'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 12 - 4, -20); ctx.lineTo(i * 12 + 4, -8); ctx.stroke(); } }
  else if (k === 5) { ctx.fillStyle = '#E07A5F'; ctx.fillRect(-16, -38, 32, 38); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-10, -28, 20, 10); }
  else if (k === 6) { ctx.strokeStyle = '#E8C84A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -30, 22, 0.5, 2.4); ctx.stroke(); }
  else { ctx.fillStyle = '#B85A44'; roundRect(ctx, -11, -30, 22, 30, 5); ctx.fill(); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-12, -36, 24, 7); }
  ctx.restore(); }
// STAPEL 'EEN MAAND BOODSCHAPPEN' (VK: 483 dingen, getal 32): een berg van ± 75 getekende boodschappen (niet 483: leesbaar),
// o.n 0..1 = opbouw van onder naar boven.
function mk2_boodschappen(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  let idx = 0; const tot = 75; for (let r = 0; r < 9; r++) { const m = 14 - r * 1.5 | 0; for (let i = 0; i < m; i++) { idx++; const f = clamp(n * tot - idx + 1, 0, 1); if (f <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= f; mk2_boodschap(ctx, (i - (m - 1) / 2) * 40 + (hash(idx * 1.7) - 0.5) * 10, -r * 36 - (1 - f) * 20, Math.floor(hash(idx * 3.9) * 8), 0.95 + hash(idx) * 0.15); ctx.restore(); } }
  ctx.restore(); }
// TASJES IN EEN RASTER (82 dunne plastic of 65 papieren, getal 32); o.k = aantal getoond (breuk mag)
function mk2_tasjesRaster(ctx, x, y, n, soort, o = {}) { const { a = 1, per = 10, gap = 44, h = 38, k = n } = o; if (a <= 0.01) return; for (let i = 0; i < n; i++) { const f = clamp(k - i, 0, 1); if (f <= 0.01) continue; mk2_miniTas(ctx, x + (i % per) * gap, y + Math.floor(i / per) * (h * 1.5), h, soort, a * f); } }

// RAPPORT met aannames (VK 2011 / Denemarken 2018): crème vel met kop, jaartal, grijze tekstregels en daaronder de aannames als
// regels. o.n = aantal getoonde aannames (breuk), o.hl = index goud gemarkeerd, o.vraag 0..1 = groot vraagteken erop (vraag 5).
function mk2_rapport(ctx, x, y, w, kop, jaar, rijen = [], o = {}) { const { a = 1, n = rijen.length, hl = -1, vraag = 0, rot = 0, kl = C.goud } = o; if (a <= 0.01) return 0;
  const rh = 58, h = 250 + rijen.length * rh; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot); ctx.translate(-w / 2, -h / 2);
  roundRect(ctx, 0, 0, w, h, 8); shape(ctx, MK2.papier, MK2.papierD, 2); ctx.fillStyle = kl; ctx.fillRect(0, 0, 14, h);
  { let px = 38; ctx.font = fTekst(px, 800); while (px > 24 && ctx.measureText(kop).width > w - (vraag > 0.01 ? 170 : 70)) { px -= 2; ctx.font = fTekst(px, 800); } text(ctx, kop, 40, 62, fTekst(px, 800), MK2.inkt, 'left'); } metaText(ctx, jaar, 40, 104, '#5A6478', 'left', 28);
  ctx.fillStyle = '#C9C0AE'; for (let i = 0; i < 4; i++) ctx.fillRect(40, 134 + i * 20, w - 90 - (i % 2) * 70, 7);
  metaText(ctx, 'AANNAMES', 40, 236, '#5A6478', 'left', 24);
  rijen.forEach((r, i) => { const f = clamp(n - i, 0, 1); if (f <= 0.01) return; const ry = 254 + i * rh; ctx.save(); ctx.globalAlpha *= f; if (i === hl) { roundRect(ctx, 26, ry - 6, w - 52, rh - 6, 6); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); }
    let px = 30; ctx.font = fTekst(px, 700); while (px > 20 && ctx.measureText(r).width > w - 70) { px -= 1; ctx.font = fTekst(px, 700); } text(ctx, r, 40, ry + 36, fTekst(px, 700), MK2.inkt, 'left'); ctx.restore(); });
  if (vraag > 0.01) mk2_laag(ctx, vraag, () => { mk2_bol(ctx, w - 70, 80, 46, C.goud); text(ctx, '?', w - 70, 104, fTitel(68), '#1A2740', 'center'); });
  ctx.restore(); return h; }

// =====================================================================
// 5. PEDAALEMMER, BERM, POSTER, ADVIESBRIEF, TABLET
// =====================================================================

// PEDAALEMMER (zijaanzicht, ± 40 cm hoog) met een dun plastic tasje als vuilniszak: rand van het tasje over de emmerrand
// geslagen, de hengsels hangen er links en rechts overheen. o.deksel 0..1 = open (scharnier achter), o.tasje 0..1.
function mk2_pedaalemmer(ctx, x, y, s = 1, o = {}) { const { a = 1, deksel = 0, tasje = 1 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 14 * c, H = 38 * c;
  ctx.beginPath(); ctx.moveTo(-B + 2.2 * c, 0); ctx.lineTo(B - 2.2 * c, 0); ctx.lineTo(B, -H); ctx.lineTo(-B, -H); ctx.closePath(); ctx.fillStyle = '#C9D2DE'; ctx.fill(); // romp (rvs-licht), iets taps
  ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(-B * 0.55, -H + 2 * c, 2.2 * c, H - 4 * c); ctx.fillStyle = '#8D98A8'; ctx.fillRect(-B + 1 * c, -1.6 * c, 2 * B - 2 * c, 1.6 * c);
  roundRect(ctx, -B * 0.25 - 0.5 * c, -1.4 * c, B * 0.5 + 1 * c, 2.2 * c, 4); shape(ctx, '#5E6878', null);  // pedaal
  if (tasje > 0.01) mk2_laag(ctx, tasje, () => { // tasje over de rand + hengsels
    ctx.fillStyle = rgba(MK2.plastic, 0.95); ctx.fillRect(-B - 0.4 * c, -H, 2 * B + 0.8 * c, 4.5 * c);
    ctx.strokeStyle = MK2.plasticD; ctx.lineWidth = 1.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-B + (i * 6 + 2) * c, -H + 0.5 * c); ctx.lineTo(-B + (i * 6 + 3) * c, -H + 4 * c); ctx.stroke(); }
    [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * B, -H + 0.5 * c); ctx.quadraticCurveTo(k * (B + 4 * c), -H + 3 * c, k * (B + 1.5 * c), -H + 9 * c); ctx.lineTo(k * (B + 0.2 * c), -H + 8 * c); ctx.quadraticCurveTo(k * (B + 2.2 * c), -H + 3.5 * c, k * (B - 0.5 * c), -H + 2 * c); ctx.closePath(); ctx.fillStyle = MK2.plastic; ctx.fill(); }); });
  ctx.save(); ctx.translate(B, -H); ctx.rotate(-deksel * 1.25); // deksel, scharnier rechtsachter
  ctx.beginPath(); ctx.moveTo(0.4 * c, 0); ctx.lineTo(-2 * B - 0.4 * c, 0); ctx.quadraticCurveTo(-B, -3.2 * c, 0.4 * c, 0); ctx.closePath(); ctx.fillStyle = '#AFBAC8'; ctx.fill(); ctx.fillStyle = '#8D98A8'; ctx.fillRect(-2 * B, -0.8 * c, 2 * B, 1.2 * c); ctx.restore();
  ctx.restore(); }

// tasje dat plat in de berm ligt (gekreukt, liggend), voor mk2_berm
function mk2_tasjeLiggend(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(Math.PI / 2 - 0.08); ctx.scale(0.62 * s, 0.5 * s);
  mk2_plasticTasje(ctx, 0, 14 * MK2_CM, 1, { kreuk: 1.4 }); ctx.restore(); }
function _mk2_tasjeLiggendOud(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.12);
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(-96, -22, -70, -34); ctx.lineTo(-40, -30); ctx.quadraticCurveTo(-30, -52, -10, -46); ctx.quadraticCurveTo(10, -40, 20, -34); ctx.lineTo(70, -38); ctx.quadraticCurveTo(100, -30, 96, -8); ctx.quadraticCurveTo(40, 8, -90, 0); ctx.closePath();
  ctx.fillStyle = rgba(MK2.plastic, 0.92); ctx.fill(); ctx.strokeStyle = MK2.plasticD; ctx.lineWidth = 1.8; [[-70, -8, -40, -26], [-20, -6, 0, -32], [30, -6, 60, -28], [-50, -16, 30, -18]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + 8, (y0 + y1) / 2, x1, y1); ctx.stroke(); });
  ctx.restore(); }
// BERM met een tasje dat uiteenvalt: grond (bodemband oker-bruin) met een grasrand; u 0..1: 0 heel, 0.35 scheuren, 0.65 losse
// snippers, 1 piepkleine stukjes (microplastic) in het gras en de bovenste grond. o.t = gras wiegt.
function mk2_berm(ctx, x, y, w, o = {}) { const { a = 1, u = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#4A3A2A'; ctx.fillRect(x, y, w, 120); ctx.fillStyle = '#5A4632'; ctx.fillRect(x, y, w, 30); ctx.fillStyle = '#3F5A3E'; ctx.fillRect(x, y - 16, w, 18);
  const cx = x + w / 2;
  if (u < 0.6) mk2_tasjeLiggend(ctx, cx - 40, y - 6, 1, 1 - ease((u - 0.45) / 0.15));
  if (u > 0.25 && u < 0.6) { ctx.strokeStyle = rgba('#1A2740', ease((u - 0.25) / 0.15)); ctx.lineWidth = 4; [[-95, -52, -86, -26], [-30, -58, -22, -28], [30, -54, 38, -26]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(cx + x0, y + y0); ctx.lineTo(cx + (x0 + x1) / 2 + 6, y + (y0 + y1) / 2); ctx.lineTo(cx + x1, y + y1); ctx.stroke(); }); }
  if (u > 0.45) { const f = ease((u - 0.45) / 0.55); // snippers worden kleiner en verspreiden zich
    for (let i = 0; i < 46; i++) { const hx = (hash(i * 2.3) - 0.5), hy = hash(i * 5.1); const px = cx + hx * Math.min(w - 40, 180 + 420 * f), py = y - 10 - (1 - f) * 30 * hash(i) + f * hy * 60; const r = lerp(16, 3.2, f) * (0.6 + 0.6 * hash(i * 9));
      if (i > 14 && f < 0.3) continue; ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i * 7) * 3); ctx.beginPath(); ctx.moveTo(-r, -r * 0.4); ctx.lineTo(r * 0.6, -r * 0.7); ctx.lineTo(r, r * 0.3); ctx.lineTo(-r * 0.4, r * 0.6); ctx.closePath(); ctx.fillStyle = rgba(MK2.plastic, 0.95); ctx.fill(); ctx.restore(); } }
  for (let i = 0; i < Math.floor(w / 14); i++) { const gx = x + i * 14 + hash(i) * 8, gh = 18 + hash(i * 3) * 26, sw = Math.sin(t * 1.3 + i * 0.7) * 3; ctx.strokeStyle = i % 3 ? '#5FA86E' : '#7FC48F'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, y - 4); ctx.quadraticCurveTo(gx + sw, y - gh * 0.6, gx + sw * 2 + 3, y - gh); ctx.stroke(); }
  ctx.restore(); }

// POSTERONTWERP 'KIES PAPIER · BETER VOOR HET MILIEU' (van de gemeente, zonder naam of logo): A-formaat (1 : 1,41), groene kop,
// grote papieren tas met een blaadje. o.briefje 0..1 = geel plakbriefje 'EERST LATEN NAKIJKEN', o.rot.
function mk2_poster(ctx, x, y, w, o = {}) { const { a = 1, briefje = 0, rot = 0 } = o; if (a <= 0.01) return; const h = w * 1.414; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = '#F2EEE4'; ctx.fill(); ctx.fillStyle = '#3E7A52'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.27);
  const f = w / 420; text(ctx, 'KIES', 0, -h / 2 + 74 * f, fTekst(56 * f, 800), '#F2F2EE', 'center'); text(ctx, 'PAPIER', 0, -h / 2 + 136 * f, fTekst(64 * f, 800), '#F2F2EE', 'center');
  mk2_papierTas(ctx, -10 * f, h * 0.27, 0.9 * f);
  ctx.save(); ctx.translate(92 * f, -10 * f); ctx.rotate(0.5); ctx.beginPath(); ctx.moveTo(0, 30 * f); ctx.quadraticCurveTo(-34 * f, -10 * f, 0, -46 * f); ctx.quadraticCurveTo(34 * f, -10 * f, 0, 30 * f); ctx.fillStyle = '#5FA86E'; ctx.fill(); ctx.strokeStyle = '#3E7A52'; ctx.lineWidth = 3 * f; ctx.beginPath(); ctx.moveTo(0, 34 * f); ctx.lineTo(0, -36 * f); ctx.stroke(); ctx.restore();
  text(ctx, 'BETER VOOR HET MILIEU', 0, h / 2 - 40 * f, fTekst(30 * f, 800), '#3E7A52', 'center');
  if (briefje > 0.01) mk2_laag(ctx, briefje, () => { ctx.save(); ctx.translate(w * 0.22, -h * 0.05); ctx.rotate(0.08 - rot); roundRect(ctx, -110 * f, -70 * f, 220 * f, 140 * f, 4); ctx.fillStyle = '#F2D86A'; ctx.fill(); ctx.fillStyle = rgba('#C9A83A', 0.6); ctx.fillRect(-110 * f, -70 * f, 220 * f, 16 * f);
    text(ctx, 'EERST LATEN', 0, -8 * f, fTekst(30 * f, 800), '#3A2E14', 'center'); text(ctx, 'NAKIJKEN', 0, 30 * f, fTekst(30 * f, 800), '#3A2E14', 'center'); ctx.restore(); });
  ctx.restore(); }

// ADVIESBRIEF van de omgevingsdienst aan de gemeente: kop 'ADVIES', 'AAN: GEMEENTE', getypte regels (o.typ 0..1 = hoeveel er
// staat; echte zinnen in o.regels, anders grijze balkjes), blok 'AANNAMES', en o.stempel 0..1 = gouden stempel 'BESLUIT: GEMEENTE'.
function mk2_adviesbrief(ctx, x, y, w, o = {}) { const { a = 1, typ = 1, stempel: st = 0, regels = null, aannames = ['WELKE TASSEN', 'WELKE STUDIES', 'WELKE AFVALVERWERKING'], rot = 0 } = o; if (a <= 0.01) return;
  const sc = w / 520; w = 520; const h = w * 1.3; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.translate(-w / 2, -h / 2);
  roundRect(ctx, 0, 0, w, h, 6); shape(ctx, MK2.papier, MK2.papierD, 2);
  metaText(ctx, 'OMGEVINGSDIENST', 36, 52, '#5A6478', 'left', 24); metaText(ctx, 'AAN: GEMEENTE', w - 36, 84, '#5A6478', 'right', 24);
  text(ctx, 'ADVIES', 36, 116, fTekst(50, 800), MK2.inkt, 'left'); ctx.fillStyle = C.goud; ctx.fillRect(36, 132, 120, 6);
  const nRegel = 6, nTot = nRegel + aannames.length; let k = 0;
  for (let i = 0; i < nRegel; i++, k++) { const f = clamp(typ * nTot - k, 0, 1); if (f <= 0.01) break; if (regels && regels[i]) { ctx.save(); ctx.beginPath(); ctx.rect(36, 160 + i * 44, (w - 72) * f, 44); ctx.clip(); text(ctx, regels[i], 36, 192 + i * 44, fTekst(28, 600), MK2.inkt, 'left'); ctx.restore(); }
    else { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(36, 178 + i * 44, (w - 72 - (i % 3) * 60) * f, 9); } }
  const ay = 180 + nRegel * 44; if (typ * nTot > nRegel) { metaText(ctx, 'AANNAMES', 36, ay + 10, '#5A6478', 'left', 24);
    aannames.forEach((s2, i) => { const f = clamp(typ * nTot - nRegel - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; mk2_bol(ctx, 46, ay + 42 + i * 40, 5, MK2.inkt); text(ctx, s2, 62, ay + 52 + i * 40, fTekst(28, 700), MK2.inkt, 'left'); ctx.restore(); }); }
  if (st > 0.01) { const zs = 1 + (1 - ease(st)) * 0.5; ctx.save(); ctx.translate(w * 0.62, h - 56); ctx.scale(zs * 0.85, zs * 0.85); stempel(ctx, 0, 0, 'BESLUIT: GEMEENTE', '#B08A2A', Math.min(1, st * 2), -0.12); ctx.restore(); }
  ctx.restore(); }

// TABLET van Iris met het verzoek van de gemeente: 'GEMEENTE · VERZOEK OM ADVIES' + klein posterontwerp. o.scherm = eigen
// inhoud (ctx, x0, y0, w, h) in plaats van het verzoek.
function mk2_tablet(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -230, -165, 460, 330, 22); ctx.fillStyle = '#1E232C'; ctx.fill(); roundRect(ctx, -212, -147, 424, 294, 8); ctx.fillStyle = '#EEF1F5'; ctx.fill(); mk2_bol(ctx, 221, 0, 4, '#5A6070');
  if (o.scherm) o.scherm(ctx, -212, -147, 424, 294);
  else { ctx.fillStyle = '#3E7A52'; ctx.fillRect(-212, -147, 424, 44); text(ctx, 'GEMEENTE · VERZOEK OM ADVIES', -196, -116, fTekst(22, 800), '#F2F2EE', 'left');
    ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 6; i++) ctx.fillRect(-196, -80 + i * 26, 210 - (i % 2) * 50, 8);
    mk2_poster(ctx, 128, 6, 120, {}); }
  ctx.restore(); }

// Evolutie v2 · film 1 Wat is evolutie eigenlijk? — film-eigen tekeningen (22 okt 2026)
// Allelen in de hele reeks: allel 1 teal (EVO.a1), allel 2 oker (EVO.a2). In film 1: teal = allel voor zwart (dominant), oker = allel voor oranje (succinea, recessief).

// ---- Kozijnhoek (Macro, close-up): houten kozijn met glas, achter het glas de Macro-nacht (lucht, heuvels) ----
// Schaal: lieveheersbeestje s = 0.42 → ±70 px voor 7 mm, dus 1 cm ≈ 100 px; kozijnbalk 6 cm ≈ 600 px breed is te veel, we tonen 2 balken van ±300 px (deel in beeld).
function kozijnHoek(ctx, o = {}) {
  const { glasX = 0, glasB = 1250, dorpelY = 640 } = o;
  // achter het glas: Macro-nacht
  ctx.save(); ctx.beginPath(); ctx.rect(glasX, 0, glasB, dorpelY); ctx.clip();
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#243656'; ctx.fillRect(0, 420, W, 220);
  vul(ctx, [[-50, 520], [260, 470], [600, 505], [900, 450], [1300, 500], [1300, 700], [-50, 700]], C.bgMacroHill);
  // boomsilhouetten in de tuin (drie varianten, onregelmatig)
  for (const [bx, bs] of [[180, 1], [430, 0.8], [980, 1.15], [1120, 0.9]]) { vul(ctx, [[bx - 60 * bs, 520], [bx, 330 * (2 - bs) * 0.5 + 200], [bx + 60 * bs, 520]], '#2A4436'); }
  // maan
  circ(ctx, 980, 150, 38, '#E6E1CF'); circ(ctx, 994, 140, 34, C.bgMacroSky);
  // weerkaatsing in het glas: twee zachte strepen (geen verloop: vlakke banden)
  ctx.fillStyle = 'rgba(242,242,238,0.05)'; ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(320, 0); ctx.lineTo(80, dorpelY); ctx.lineTo(-40, dorpelY); ctx.fill();
  ctx.restore();
  // kozijn: verticale stijl rechts en onderdorpel; hout in gebroken wit met lichte nerf
  const hout = '#D9D2C2', houtS = '#BDB5A3', houtL = '#ECE7DA';
  ctx.fillStyle = hout; ctx.fillRect(glasX + glasB, 0, W - glasX - glasB, dorpelY + 40);
  // glaslat (schuine sponning) langs glas
  ctx.fillStyle = houtS; ctx.beginPath(); ctx.moveTo(glasB, 0); ctx.lineTo(glasB + 26, 0); ctx.lineTo(glasB + 26, dorpelY + 26); ctx.lineTo(glasB, dorpelY); ctx.fill();
  ctx.fillStyle = houtS; ctx.beginPath(); ctx.moveTo(0, dorpelY); ctx.lineTo(glasB, dorpelY); ctx.lineTo(glasB + 26, dorpelY + 26); ctx.lineTo(0, dorpelY + 26); ctx.fill();
  // onderdorpel (vensterbank), schuin aflopend vlak
  ctx.fillStyle = hout; ctx.fillRect(0, dorpelY + 26, W, 200);
  ctx.fillStyle = houtL; ctx.fillRect(0, dorpelY + 26, W, 10);
  ctx.fillStyle = houtS; ctx.fillRect(0, dorpelY + 226, W, 14);
  ctx.fillStyle = '#5A4A3E'; ctx.fillRect(0, dorpelY + 240, W, H - dorpelY - 240); // muur onder de dorpel (baksteen, egaal)
  for (let r = 0; r < 4; r++) for (let k = 0; k < 14; k++) { const bx = k * 150 + (r % 2) * 75 - 40, by = dorpelY + 246 + r * 52; roundRect(ctx, bx, by, 142, 46, 4); shape(ctx, '#6B4A3A', '#7A5848', 1); }
  // houtnerf (lichte lijnen, rustig)
  ctx.strokeStyle = rgba(houtS, 0.6); ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(glasB + 60 + i * 95, 0); ctx.bezierCurveTo(glasB + 80 + i * 95, 200, glasB + 40 + i * 95, 400, glasB + 70 + i * 95, dorpelY); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, dorpelY + 60 + i * 40); ctx.bezierCurveTo(500, dorpelY + 50 + i * 40, 1100, dorpelY + 75 + i * 40, W, dorpelY + 58 + i * 40); ctx.stroke(); }
}

// ---- Chromosomenpaar (Schema): twee homologe chromosomen (niet verdubbeld: staafjes), paars, met één gen als band in de allelkleur ----
// (x, y) = midden; h = lengte; o.allelen = [kleurLinks, kleurRechts]; o.band = positie 0..1 van het gen; o.labels
function chromosoomPaar(ctx, x, y, h, o = {}) {
  const { allelen = [EVO.a1, EVO.a2], band = 0.32, a = 1, breed = 34, gap = 30, cen = 0.58, nieuw = null } = o;
  ctx.save(); ctx.globalAlpha *= a;
  for (let k = 0; k < 2; k++) {
    const cx = x + (k ? 1 : -1) * (gap / 2 + breed / 2); const top = y - h / 2;
    // chromosoom met insnoering bij het centromeer
    const cy = top + h * cen, r = breed / 2;
    ctx.beginPath(); ctx.moveTo(cx - r, top + r); ctx.arc(cx, top + r, r, Math.PI, 0); ctx.lineTo(cx + r, cy - 10); ctx.quadraticCurveTo(cx + r * 0.45, cy, cx + r, cy + 10);
    ctx.lineTo(cx + r, top + h - r); ctx.arc(cx, top + h - r, r, 0, Math.PI); ctx.lineTo(cx - r, cy + 10); ctx.quadraticCurveTo(cx - r * 0.45, cy, cx - r, cy - 10); ctx.closePath();
    shape(ctx, C.kern, C.kernR, 2);
    // lichte dwarsbandjes (echte structuur: bandenpatroon)
    ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.kernR, 0.35); for (const f of [0.14, 0.48, 0.7, 0.84]) ctx.fillRect(cx - r, top + h * f, breed, 6);
    const kl = (nieuw && nieuw[0] === k) ? nieuw[1] : allelen[k]; ctx.fillStyle = kl; ctx.fillRect(cx - r, top + h * band - 11, breed, 22); ctx.restore();
    ctx.strokeStyle = (nieuw && nieuw[0] === k) ? C.goud : _lt(kl, 0.45); ctx.lineWidth = (nieuw && nieuw[0] === k) ? 3 : 1.5; ctx.strokeRect(cx - r - 2, top + h * band - 12, breed + 4, 24);
  }
  ctx.restore();
}

// ---- Thermometer (Schema-lijntekening, labbibliotheek): o.f = vulling 0..1 ----
function thermometer(ctx, x, y, h, f, kleur = C.koraal, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; const r = h * 0.11, w = h * 0.1;
  roundRect(ctx, x - w / 2, y - h, w, h - r, w / 2); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.stroke();
  circ(ctx, x, y - r * 0.6, r, kleur, C.er, 3);
  ctx.fillStyle = kleur; roundRect(ctx, x - w * 0.22, y - r - (h - 2.2 * r) * f, w * 0.44, (h - 2.2 * r) * f + r * 0.6, w * 0.2); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = 2; for (let i = 1; i < 6; i++) { const yy = y - r * 1.6 - (h - 2.6 * r) * i / 6; ctx.beginPath(); ctx.moveTo(x + w / 2, yy); ctx.lineTo(x + w / 2 + 12, yy); ctx.stroke(); }
  ctx.restore();
}

// ---- Kaart van Nederland (Schema: kaart als schema) ----
// Contour uit afgeronde coördinaten (graden), handmatig vereenvoudigd; IJsselmeer/Markermeer als waterplas; Waddeneilanden als ellipsen.
const NL_CONTOUR = [[51.37, 3.37], [51.44, 3.55], [51.53, 3.44], [51.6, 3.68], [51.72, 3.69], [51.84, 3.87], [51.98, 4.11], [52.1, 4.27], [52.25, 4.43], [52.46, 4.57], [52.77, 4.66], [52.96, 4.74], [52.93, 5.06], [53.07, 5.33], [53.18, 5.41], [53.33, 5.65], [53.4, 6.0], [53.42, 6.28], [53.46, 6.75], [53.34, 6.93], [53.28, 7.2], [53.18, 7.21], [52.85, 7.06], [52.65, 7.03], [52.63, 6.73], [52.45, 7.0], [52.37, 7.07], [52.24, 7.06], [52.08, 6.76], [51.97, 6.83], [51.83, 6.4], [51.86, 6.0], [51.72, 5.95], [51.55, 6.15], [51.37, 6.22], [51.2, 6.08], [51.05, 6.0], [50.9, 6.08], [50.76, 6.02], [50.76, 5.7], [50.95, 5.75], [51.15, 5.85], [51.26, 5.55], [51.42, 5.05], [51.44, 4.85], [51.48, 4.5], [51.36, 4.38], [51.27, 4.25], [51.27, 3.8], [51.25, 3.5]];
const NL_IJSSEL = [[52.93, 5.08], [53.05, 5.3], [52.88, 5.42], [52.72, 5.58], [52.6, 5.55], [52.55, 5.33], [52.42, 5.2], [52.33, 5.08], [52.4, 5.0], [52.55, 5.06], [52.72, 5.08]];
const NL_WAD = [[53.08, 4.82, 9, 3.5], [53.25, 5.12, 11, 2.6], [53.38, 5.36, 10, 2.4], [53.45, 5.77, 11, 2.2], [53.48, 6.15, 7, 1.8]];
function nlXY(lat, lon, x, y, s) { return [x + (lon - 5.3) * 68 * 0.616 * s, y - (lat - 52.15) * 68 * s]; }
function kaartNL(ctx, x, y, s = 1, o = {}) {
  const { a = 1, land = C.fill, rand = C.line, water = rgba(C.teal, 0.28) } = o;
  ctx.save(); ctx.globalAlpha *= a;
  vul(ctx, NL_CONTOUR.map(([la, lo]) => nlXY(la, lo, x, y, s)), land, rand, 3);
  vul(ctx, NL_IJSSEL.map(([la, lo]) => nlXY(la, lo, x, y, s)), water, rgba(C.teal, 0.6), 2);
  for (const [la, lo, rx, ry] of NL_WAD) { const [px, py] = nlXY(la, lo, x, y, s); ctx.beginPath(); ctx.ellipse(px, py, rx * s, ry * s, -0.25, 0, 6.283); shape(ctx, land, rand, 2); }
  ctx.restore();
}

// ---- Lieveheersbeestjes in een groep (gedeelde schikking): kleurvormen volgens de telling (±81% oranje, ±15% vier vlekken, ±4% twee vlekken) ----
function lhbGroep(ctx, plekken, s, o = {}) { const { a = 1, dimOranje = false } = o;
  plekken.forEach(([x, y, vorm, st, rot], i) => lhb(ctx, x, y, s * (0.92 + 0.16 * hash(i * 3.3)), { vorm, stippen: st, rot, a: a * (dimOranje && vorm === 'succinea' ? 0.35 : 1) })); }

// ---- Knikker (allel) los, zelfde tekenregel als in pot() ----
function knikker(ctx, x, y, r, kleur, a = 1) { ctx.save(); ctx.globalAlpha *= a; const rr = kleur === EVO.a1 ? EVO.a1R : kleur === EVO.a2 ? EVO.a2R : _lt(kleur, 0.4); circ(ctx, x, y, r, kleur, rr, 2); circ(ctx, x - r * 0.35, y - r * 0.35, r * 0.22, 'rgba(255,255,255,0.35)'); ctx.restore(); }

// ---- Eén chromosoom (zoals in chromosoomPaar), bv. in een geslachtscel ----
function chromosoom1(ctx, x, y, h, kleur, o = {}) {
  const { band = 0.32, breed = 34, cen = 0.58, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const top = y - h / 2, r = breed / 2, cy = top + h * cen, cx = x;
  ctx.beginPath(); ctx.moveTo(cx - r, top + r); ctx.arc(cx, top + r, r, Math.PI, 0); ctx.lineTo(cx + r, cy - 10); ctx.quadraticCurveTo(cx + r * 0.45, cy, cx + r, cy + 10);
  ctx.lineTo(cx + r, top + h - r); ctx.arc(cx, top + h - r, r, 0, Math.PI); ctx.lineTo(cx - r, cy + 10); ctx.quadraticCurveTo(cx - r * 0.45, cy, cx - r, cy - 10); ctx.closePath();
  shape(ctx, C.kern, C.kernR, 2); ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.kernR, 0.35); for (const f of [0.14, 0.48, 0.7, 0.84]) ctx.fillRect(cx - r, top + h * f, breed, 6);
  ctx.fillStyle = kleur; ctx.fillRect(cx - r, top + h * band - 11, breed, 22); ctx.restore(); ctx.strokeStyle = _lt(kleur, 0.45); ctx.lineWidth = 1.5; ctx.strokeRect(cx - r - 2, top + h * band - 12, breed + 4, 24); ctx.restore(); }

// ---- Geslachtscel als schema: eicel (groot, lichte rand) of zaadcel (kop + staart), met één chromosoom ----
function geslachtscel(ctx, x, y, soort, kleur, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a;
  if (soort === 'ei') { circ(ctx, x, y, 78 * s, rgba('#F6EEDC', 0.16), rgba('#F6EEDC', 0.8), 2.5); chromosoom1(ctx, x, y, 96 * s, kleur, { breed: 24 * s }); }
  else { ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.bezierCurveTo(x - 80 * s, y - 16 * s, x - 110 * s, y + 16 * s, x - 150 * s, y); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y, 44 * s, 30 * s, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.16), rgba('#F2F2EE', 0.8), 2.5); chromosoom1(ctx, x + 4 * s, y, 44 * s, kleur, { breed: 16 * s, band: 0.3 }); }
  ctx.restore(); }

// ---- Huisgevel met raam (Macro-nacht), voor het uitzoomen van kozijn naar tuin ----
function huisGevel(ctx, x, y, w, h, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - 30, y - h); ctx.lineTo(x + w / 2, y - h - h * 0.55); ctx.lineTo(x + w + 30, y - h); ctx.closePath(); ctx.fillStyle = '#4A3A44'; ctx.fill();
  ctx.fillStyle = '#6B4A3A'; ctx.fillRect(x, y - h, w, h);
  ctx.strokeStyle = '#7A5848'; ctx.lineWidth = 1.5; for (let r = 0; r < h / 26; r++) { ctx.beginPath(); ctx.moveTo(x, y - h + r * 26); ctx.lineTo(x + w, y - h + r * 26); ctx.stroke(); }
  const ram = (rx, ry, rw, rh) => { ctx.fillStyle = '#D9D2C2'; ctx.fillRect(rx - 10, ry - 10, rw + 20, rh + 20); ctx.fillStyle = '#E8C46A'; ctx.fillRect(rx, ry, rw, rh); ctx.fillStyle = '#D9D2C2'; ctx.fillRect(rx + rw / 2 - 4, ry, 8, rh); ctx.fillRect(rx, ry + rh / 2 - 4, rw, 8); };
  ram(x + w * 0.14, y - h * 0.78, w * 0.26, h * 0.32); ram(x + w * 0.6, y - h * 0.78, w * 0.26, h * 0.32);
  ctx.fillStyle = '#3A4A66'; ctx.fillRect(x + w * 0.42, y - h * 0.4, w * 0.16, h * 0.4);
  ctx.restore(); }

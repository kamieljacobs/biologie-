// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 10.2 en 10.3): A-band (donker) en I-band (licht) in twee tinten met een
// dunne Z-lijn midden in de I-band, zodat de zoom naar sarcomeer/myofibril aansluit; o.c 0..1 = samentrekken: alleen de
// I-banden worden smaller (de A-band houdt zijn breedte, sliding filament), de vezel wordt korter (± 20 %) en dikker
// (volume blijft gelijk); een vezel is centimeters lang, dus de uiteinden vallen buiten beeld (o.eind = true geeft de
// oude ronde uiteinden). Dun bindweefselvlies (endomysium) om elke vezel.
// v2.1 (blinde beoordeling ronde 2): rustiger strepen (bredere banden, H-zone alleen als hij breed genoeg is, geen rafelrand);
// samentrekken nu ook in de bundel zichtbaar: vezels korter én dikker (sarcomeer houdt zijn volume: Millman e.a. 1966 J Cell
// Biol 33:255 'the myofilament lattice expands as the sarcomere shortens'; SICB-abstract 'Myofilament lattice spacing increases
// as muscles shorten'), lichte banden smaller, donkere banden even breed (OpenStax A&P 10.3).
// x = linkerkant (bij c > 0 trekt de vezel naar het midden toe), y = midden, w × h; o.streep = afstand van de strepen (px).
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, streep = 12, c = 0, eind = false } = o; if (a <= 0.01) return;
  const k = clamp(c, 0, 1), L = w * (1 - 0.2 * k), H = h / Math.sqrt(1 - 0.2 * k), x0 = x + (w - L) / 2, st = streep * (1 - 0.2 * k);
  ctx.save(); ctx.globalAlpha *= a;
  const wob = (xx, z) => Math.sin(xx / (L * 0.23 + 40) + seed * 1.7 + z) * H * 0.06 ; // zachte golving van de rand (geen fijne rafel)
  const vorm = () => { if (eind) return roundRect(ctx, x0, y - H / 2, L, H, H / 2); ctx.beginPath(); for (let xx = x0; xx <= x0 + L; xx += 6) ctx.lineTo(xx, y - H / 2 + wob(xx, 0)); for (let xx = x0 + L; xx >= x0; xx -= 6) ctx.lineTo(xx, y + H / 2 + wob(xx, 1.3)); ctx.closePath(); };
  vorm(); ctx.fillStyle = '#C98A80'; ctx.fill(); // I-band (licht) als ondergrond
  ctx.save(); vorm(); ctx.clip();
  const aw = streep * 0.62; // A-band: vaste breedte (± 1,6 µm van 2,5)
  for (let xx = x0 + st * 0.5; xx < x0 + L + st; xx += st) { ctx.fillStyle = '#8E3E38'; ctx.fillRect(xx - aw / 2, y - H / 2, aw, H); // A-band
    if (st > 18) { ctx.fillStyle = rgba('#C98A80', 0.45); ctx.fillRect(xx - aw * 0.1, y - H / 2, aw * 0.2, H); }                // H-zone (alleen als de strepen breed genoeg zijn)
    ctx.fillStyle = rgba('#3A1612', 0.75); ctx.fillRect(xx + st / 2 - 0.6, y - H / 2, 1.2, H); }                                    // Z-lijn
  ctx.fillStyle = rgba('#2A0E0C', 0.22); ctx.fillRect(x0, y + H * 0.22, L, H); ctx.fillStyle = rgba('#FFE8E0', 0.10); ctx.fillRect(x0, y - H / 2, L, H * 0.22); // ronde vezel: schaduwstrook onder, lichte strook boven (vlak)
  for (let m = 0; m < Math.max(1, Math.round(L / 90)); m++) { const kx = x0 + 30 + m * 90 + hash(seed + m) * 30, top = hash(seed * 3 + m) > 0.5; ctx.beginPath(); ctx.ellipse(kx, (top ? y - H / 2 + wob(kx, 0) : y + H / 2 + wob(kx, 1.3)) + (top ? 1 : -1) * Math.max(2.5, H * 0.07), Math.max(6, H * 0.32), Math.max(1.6, H * 0.06), 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore();
  vorm(); ctx.strokeStyle = rgba('#EAD2C6', 0.8); ctx.lineWidth = 1.5; ctx.stroke(); // celmembraan + endomysium
  ctx.restore();
}
// SPIERBUNDEL: vezels naast elkaar binnen een bindweefselvlies (perimysium), ertussen dun bindweefsel met een haarvat;
// de vezels lopen door tot buiten de uitsnede. o: a, n, h (vezeldikte px), c 0..1 (samentrekken, zie spierVezel), t.
// Geeft { vlies: [x,y], vezels: [[x,y]…] } terug.
function spierBundel(ctx, x, y, w, o = {}) {
  const { a = 1, n = 4, h = 26, c = 0, t = 0 } = o; if (a <= 0.01) return { vlies: [x, y], vezels: [] };
  const k = clamp(c, 0, 1), H = h / Math.sqrt(1 - 0.2 * k), gap = Math.max(3, h * 0.16), tot = n * H + (n - 1) * gap, R = tot / 2 + gap * 1.6;
  const L = w * (1 - 0.2 * k), x0 = x + (w - L) / 2;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0 - 4, y - R, L + 8, 2 * R, Math.min(R, 14)); ctx.fillStyle = '#8A6A64'; ctx.fill(); // bindweefsel
  ctx.save(); roundRect(ctx, x0 - 4, y - R, L + 8, 2 * R, Math.min(R, 14)); ctx.clip();
  const vezels = [];
  for (let i = 0; i < n; i++) { const yy = y - tot / 2 + H / 2 + i * (H + gap) + (hash(i * 3.1) - 0.5) * gap * 0.6; vezels.push([x + w / 2, yy]);
    spierVezel(ctx, x0 - 6 + (hash(i * 7) - 0.5) * 10, yy, L + 12, H * (0.92 + 0.16 * hash(i * 5.3)), { seed: i + 3, c: 0, streep: Math.max(12, h * 0.45) * (1 - 0.2 * k) }); }
  if (n > 1) { const yy = y - tot / 2 + H + gap * 0.5 + (Math.floor(n / 2) - 1) * (H + gap); ctx.strokeStyle = '#A8443C'; ctx.lineWidth = Math.max(2, gap * 0.7); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(x0 + L * 0.3, yy - gap * 0.3, x0 + L * 0.7, yy + gap * 0.3, x0 + L, yy); ctx.stroke(); } // haarvat
  ctx.restore();
  roundRect(ctx, x0 - 4, y - R, L + 8, 2 * R, Math.min(R, 14)); ctx.strokeStyle = '#E2CEC6'; ctx.lineWidth = Math.max(2, gap * 0.6); ctx.stroke(); // perimysium
  ctx.restore(); return { vlies: [x + w / 2, y - R], vezels };
}

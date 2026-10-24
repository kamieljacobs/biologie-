// Film 7 · Hoe weten we dat? — eigen hulpfuncties voor de animatie (na lib_dieren/lib_micro_evo, vóór sb7.js). Niets gedeelds aangepast.
const E7 = {};
E7.sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
E7.met = (ctx, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
E7.lijnStuk = (ctx, x1, y1, x2, y2, u, col = C.line, lw = 4, a = 1) => { if (u <= 0.001 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, u), lerp(y1, y2, u)); ctx.stroke(); ctx.restore(); };
E7.gestippeld = (ctx, x1, y1, x2, y2, u, col, lw = 2.5, a = 1) => { if (u <= 0.001 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([9, 8]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, u), lerp(y1, y2, u)); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); };

// zand- en kleikorrels die rustig door het water zakken (x0..x1, van y0 tot de bodem yb)
E7.zand = function (ctx, x0, x1, y0, yb, t, a = 1, n = 46) { if (a <= 0.01 || yb <= y0 + 4) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#C9B896', 0.55);
  for (let i = 0; i < n; i++) { const sp = 26 + hash(i * 5) * 22, H0 = yb - y0, y = y0 + ((hash(i * 3) * H0 + t * sp) % H0), x = x0 + hash(i * 7) * (x1 - x0) + Math.sin(t * 0.8 + i) * 6; circ(ctx, x, y, 2.4 + hash(i) * 1.6); }
  ctx.restore(); };

// omgeklapte stapel P/Q/R zoals pqrLagen (sb7), met eigen alfa per letter en gouden R los te zetten
E7.pqr = function (ctx, x, y, w, h, rot, o = {}) { const { a = 1, nadruk = -1, goud = false, letA = [1, 1, 1], rGoud = goud, fs = 1.3 } = o; if (a <= 0.01) return;
  const cx = x + w / 2, cy = y + h / 2, L = ['R', 'Q', 'P'];
  gesteente(ctx, x, y, w, h, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { rot, golf: 3, a, nadruk, fossielen: [{ soort: 'schelp', laag: 0, x: 0.4, s: fs, goud }] });
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 3; i++) { if (letA[i] <= 0.01) continue; const ly = h / 2 - (i + 0.5) * h / 3, lx = -w / 2 - 50, px = cx + lx * Math.cos(rot) - ly * Math.sin(rot), py = cy + lx * Math.sin(rot) + ly * Math.cos(rot);
    ctx.save(); ctx.globalAlpha *= letA[i]; text(ctx, L[i], px, py + 16, fTekst(46, 800), i === 0 && rGoud ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore(); };

// één rij DNA-letters; ref = vergelijkrij (verschillen goud, met dif 0..1); o.ins = [b, e] ingevoegd stuk (paars), o.open 0..1 = gat voor het ingevoegde stuk,
// o.drop 0..1 = ingevoegde letters vallen erin, o.gat = toon gestippelde lege vakjes (koe)
E7.rij = function (ctx, x, y, naam, seq, o = {}) { const { ref = null, dif = 1, cw = 44, ch = 56, a = 1, naamW = 220, ins = null, open = 1, drop = 1, gat = 0, naamA = 1 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; if (naam && naamA > 0.01) { ctx.save(); ctx.globalAlpha *= naamA; text(ctx, naam, x + naamW - 24, y + ch * 0.68, fTekst(36, 600), C.text, 'right'); ctx.restore(); }
  const nIns = ins ? ins[1] - ins[0] : 0;
  [...seq].forEach((b, i) => { let xx = x + naamW + i * cw, yy = y, aa = 1; const inIns = ins && i >= ins[0] && i < ins[1];
    if (ins && i >= ins[1]) xx -= nIns * cw * (1 - open);
    if (inIns && b !== '-') { yy = y - (1 - ease(drop)) * 130; aa = clamp(drop * 2, 0, 1); }
    if (aa <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= aa; roundRect(ctx, xx + 3, yy, cw - 6, ch, 8);
    if (b === '-') { ctx.globalAlpha *= gat; ctx.setLineDash([5, 5]); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); return; }
    const d = ref && ref[i] && b !== ref[i] ? (typeof dif === 'function' ? dif(i) : dif) : 0;
    if (inIns) shape(ctx, rgba(C.paars, 0.55), _lt(C.paars, 0.4), 2.5);
    else { shape(ctx, rgba(C.paars, 0.22), rgba(C.paars, 0.6), 1.2); if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; roundRect(ctx, xx + 3, yy, cw - 6, ch, 8); shape(ctx, rgba(C.goud, 0.28), C.goud, 2.5); ctx.restore(); } }
    text(ctx, b, xx + cw / 2, yy + ch * 0.7, fTekst(34, 700), C.text, 'center');
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; text(ctx, b, xx + cw / 2, yy + ch * 0.7, fTekst(34, 700), C.goud, 'center'); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); };

// heupbotjes van de bultrug opnieuw tekenen (zelfde rekensom als _zwSkelet), voor gouden botjes over een gedimd skelet; res = return van bultrug()
E7.heup = function (ctx, x, y, s, res, a = 1, kleur = C.goud) { if (!res || a <= 0.01) return; const def = ZW_DEF.bultrug, S = def.skel, B = res.B, L = B.pr.Ls;
  const pt = (ss, d) => ZwPop.pt(B, ss * L, d * ZwPop.profAt(B.pr.P, ss * L)[d >= 0 ? 0 : 1]);
  _bd(ctx, x, y, s, 1, a); const [ss, d, l] = S.heup, p = pt(ss, d), F = ZwPop.frame(B, ss * L); const b = [p[0] - F.t[0] * -l * 0.9 + F.n[0] * -l * 0.25, p[1] - F.t[1] * -l * 0.9 + F.n[1] * -l * 0.25];
  bot(ctx, p[0], p[1], b[0], b[1], Math.max(4, l * 0.22), kleur); bot(ctx, p[0] + 6, p[1] + 6, b[0] + 6, b[1] + 8, Math.max(3, l * 0.16), kleur);
  const m = [(p[0] + b[0]) / 2 + 3, (p[1] + b[1]) / 2 + 4]; ctx.restore(); return [x + m[0] * s, y + m[1] * s]; };

// röntgenbeeld van een staartwervel-rij (spookstaart) achter het staartbeen
E7.spookStaart = function (ctx, x, y, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.setLineDash([6, 6]);
  for (let i = 0; i < 9; i++) { const yy = 120 + i * 24, w = 22 - i * 1.6; roundRect(ctx, -w / 2 + i * 7, yy, w, 18, 5); ctx.strokeStyle = C.line; ctx.lineWidth = 1.8; ctx.stroke(); }
  ctx.setLineDash([]); ctx.restore(); };

// stamboom op de tijdas (zoals sb7 e7s18), met groei: g = hoofdlijn 0..1, tak[i] 0..1, dier[i] 0..1, nad = index die oplicht
E7.boom = function (ctx, g, tak, dier, nad = -1, t = 0, gen = 0) {
  const X = tijdAsMj(ctx, 160, 840, 1600, 52, 36, { stap: 2, nu: true }), yT = 560;
  if (g > 0.001) { ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(52), yT); ctx.lineTo(lerp(X(52), X(0), g), yT); ctx.stroke(); }
  // generaties: stipjes die langzaam over de hoofdlijn schuiven
  if (gen > 0.01) { for (let i = 0; i < 26; i++) { const u = ((i / 26) + t * 0.03) % 1, px = lerp(X(52), X(0) - 30, u); circ(ctx, px, yT, 4, rgba(C.text, 0.55 * gen)); } }
  const T = [[50, -160, (x, y, a) => pakicetus(ctx, x, y, 0.42, { a, t }), 'Pakicetus', 0, -150], [48, 150, (x, y, a) => ambulocetus(ctx, x, y - 6, 0.36, { a, t }), 'Ambulocetus', 0, 60],
    [47, -160, (x, y, a) => rodhocetus(ctx, x + 60, y - 20, 0.38, { a, t }), 'Rodhocetus', 200, -90], [40, 150, (x, y, a) => basilosaurus(ctx, x, y - 26, 0.24, { a, t }), 'Basilosaurus', 0, 30]];
  T.forEach(([mj, dy, fn, naam, lx, ly], i) => { const u = tak[i]; if (u <= 0.001) return; const px = X(mj + 0.8), ex = X(mj), ey = yT + dy;
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, yT); ctx.lineTo(lerp(px, ex, u), lerp(yT, ey, u)); ctx.stroke(); circ(ctx, px, yT, 7, C.bgSchema, C.line, 3);
    if (u > 0.98) circ(ctx, ex, ey, 6, C.line);
    const da = dier[i]; if (da > 0.01) { if (nad === i) { ctx.save(); ctx.globalAlpha *= da; circ(ctx, ex + (i === 2 ? 60 : 0), ey - 34, 66, rgba(C.goud, 0.10), rgba(C.goud, 0.8), 2); ctx.restore(); }
      fn(ex, ey - 12, da); naamBij(ctx, naam, 'ongeveer ' + mj + ' miljoen jaar', ex + lx, ey + ly, da, 'center', nad === i ? C.goud : C.text); } });
  return X; };

// oogpunt (lokale eenheden t.o.v. het anker) van een dier in een houding, één keer gemeten op een los canvas
E7._oog = {};
E7.oogOffset = function (key, fn, data, o) { if (E7._oog[key]) return E7._oog[key];
  const c = document.createElement('canvas'); c.width = 4; c.height = 4; const r = fn(c.getContext('2d'), 0, 0, 1, o); const p = ZwPop.pt(r.B, ...data.punten.oog); return (E7._oog[key] = p); };
// punt aan de buikkant van een zwemmer op fractie u van de lengte (wereldcoördinaten); res = return van het dier
E7.buik = (res, x, y, s, u, d = -1, kijk = 1) => { const B = res.B, L = B.pr.Ls, pr = ZwPop.profAt(B.pr.P, u * L), p = ZwPop.pt(B, u * L, d * pr[d >= 0 ? 0 : 1]); return [x + kijk * s * p[0], y + s * p[1]]; };
E7.wereld = (p, x, y, s, kijk = 1) => [x + kijk * s * p[0], y + s * p[1]];

// klein klokje met wijzer (tikt in stappen)
E7.klok = function (ctx, x, y, r, tik, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.fill, 0.9), C.line, 3);
  for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); ctx.lineTo(x + Math.cos(an) * r * 0.9, y + Math.sin(an) * r * 0.9); ctx.stroke(); }
  const an = -Math.PI / 2 + tik / 12 * 6.283; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.72, y + Math.sin(an) * r * 0.72); ctx.stroke(); circ(ctx, x, y, 4, C.goud); ctx.restore(); };

// steentje met radioactieve atomen (teal = nog niet vervallen, grijs = vervallen)
// hl = aantal verstreken halveringstijden; atoom i vervalt na -log2(1-hash) halveringstijden; o.steen = steentje eromheen
E7.atomen = function (ctx, cx, cy, rx, ry, hl, a = 1, seed = 1, n = 16, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.steen !== false) { ctx.beginPath(); ctx.ellipse(cx, cy, rx * 1.12, ry * 1.12, 0.05, 0, 6.283); shape(ctx, o.kleur || '#8C7258', _lt(o.kleur || '#8C7258', 0.25), 2); }
  const r = o.r || 8;
  for (let i = 0; i < n; i++) { const an = hash(i * 7 + seed) * 6.283, d = Math.sqrt(hash(i * 13 + seed)) * 0.82, x = cx + Math.cos(an) * rx * d, y = cy + Math.sin(an) * ry * d;
    const th = -Math.log2(1 - hash(i * 3 + seed) * 0.995), weg = hl > th, k = o.ak || C.teal; circ(ctx, x, y, r, weg ? rgba(C.line, 0.45) : k, weg ? null : _lt(k, 0.4), 1.5); }
  ctx.restore(); };

// dood dier (Pakicetus) op zijn zij, in dezelfde maat en ligging als fossiel(ctx, 'pakicetus', …): lijf, kop, staart, poten
E7.kadaver = function (ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const k = '#88725A', d = '#6A5644'; ctx.lineCap = 'round';
  ctx.strokeStyle = d; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(26, 4); ctx.lineTo(32, 28); ctx.lineTo(26, 50); ctx.moveTo(-30, 4); ctx.lineTo(-36, 30); ctx.lineTo(-30, 52); ctx.stroke();
  ctx.strokeStyle = k; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-88, -2); ctx.quadraticCurveTo(-130, -8, -150, 6); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-24, 0, 70, 20, -0.03, 0, 6.283); shape(ctx, k, _dk(k, 0.25), 1.5);
  ctx.beginPath(); ctx.ellipse(56, -3, 30, 12, -0.08, 0, 6.283); shape(ctx, k, _dk(k, 0.25), 1.5); ctx.beginPath(); ctx.moveTo(78, -6); ctx.lineTo(96, -2); ctx.lineTo(80, 4); ctx.closePath(); ctx.fillStyle = k; ctx.fill();
  ctx.strokeStyle = '#2E2620'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(62, -8); ctx.lineTo(70, -8); ctx.stroke(); // gesloten oog
  ctx.restore(); };

// ---- herstelronde na review ----
// punt op de rug van Noor (h 620, voet 880, kijkt naar links) op bilhoogte: begin van de zoomlijnen naar het staartbeen
const E7_STUIT = [566, 590];

// halveringsgrafiek zoals in teken_evo7, maar met '± 5700 jaar' (zelfde getal als de stem)
function halveringsGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, n = 4, u = 1, maxLabel = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let i = 1; i <= n; i++) ctx.fillRect(x + i * w / n, y - h, 1.5, h);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 20, y); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 120 * u; i++) { const f = i / 120, px = x + f * w, py = y - h * Math.pow(0.5, f * n); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  for (let i = 0; i <= Math.min(n, Math.floor(n * u + 0.001)); i++) { const px = x + i * w / n, py = y - h * Math.pow(0.5, i); circ(ctx, px, py, 8, C.teal, _lt(C.teal, 0.4), 2); if (i <= maxLabel) text(ctx, String(Math.round(100 * Math.pow(0.5, i) * 10) / 10).replace('.', ',') + '%', px + 16, py - 14, fTekst(32, 700), C.text, 'left');
    metaText(ctx, i === 0 ? '0' : i + '×', px, y + 40, C.text2, 'center', 26); }
  metaText(ctx, '× ± 5700 jaar', x + w, y + 80, C.text2, 'right', 26); metaText(ctx, 'koolstof-14 over', x, y - h - 70, C.grain, 'left', 26);
  ctx.restore(); }

// sprongbeen (astragalus) van een evenhoevige, vooraanzicht: boven én onder een katrol (twee ruggen met een groef ertussen)
// a = zichtbaarheid, v = 0..1 nadruk op de katrolvorm (gouden rand, groeven en rolpijltjes)
E7.katrolbot = function (ctx, x, y, s = 1, a = 1, v = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * 1.3, s * 1.3);
  const kat = (sy) => { // één katrol: buitenrand van de ruggen met groef in het midden; sy = -1 boven, 1 onder
    ctx.lineTo(-70, sy * 62); ctx.quadraticCurveTo(-72, sy * 96, -44, sy * 98); ctx.quadraticCurveTo(-14, sy * 98, 0, sy * 76); ctx.quadraticCurveTo(14, sy * 98, 44, sy * 98); ctx.quadraticCurveTo(72, sy * 96, 70, sy * 62); };
  ctx.beginPath(); ctx.moveTo(-58, 0); kat(-1); ctx.quadraticCurveTo(54, -30, 56, 0); ctx.quadraticCurveTo(54, 30, 70, 62);
  ctx.lineTo(70, 62); ctx.quadraticCurveTo(72, 96, 44, 98); ctx.quadraticCurveTo(14, 98, 0, 76); ctx.quadraticCurveTo(-14, 98, -44, 98); ctx.quadraticCurveTo(-72, 96, -70, 62); ctx.quadraticCurveTo(-54, 30, -58, 0); ctx.closePath();
  shape(ctx, BOT.kaal, v > 0.5 ? C.goud : BOT.kaalR, 2 + 2 * v);
  // groeven: ondiepe goot midden over beide katrollen, en schaduw op de ruggen
  ctx.strokeStyle = rgba(BOT.kaalR, 0.9); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (const sy of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, sy * 76); ctx.quadraticCurveTo(-3, sy * 52, 0, sy * 32); ctx.stroke();
    for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 38, sy * 70, 22, 12, 0, sy < 0 ? Math.PI : 0, sy < 0 ? 2 * Math.PI : Math.PI); ctx.stroke(); } }
  if (v > 0.01) { ctx.globalAlpha *= v; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; // rolpijltjes: de katrollen rollen als een wiel
    for (const sy of [-1, 1]) { const ph = Math.sin(t * 1.6) * 0.25; ctx.beginPath(); const c0 = sy < 0 ? -Math.PI / 2 : Math.PI / 2; ctx.beginPath(); ctx.arc(0, sy * 56, 66, c0 - 0.6 + ph, c0 + 0.6 + ph); ctx.stroke(); } }
  ctx.restore(); };

// legenda: rij van [naam, kleur, alfa] met kleurvakje, gecentreerd op cx
E7.legenda = function (ctx, cx, y, items) { const f = fTekst(32, 600); ctx.save(); ctx.font = f; const ws = items.map(([n]) => ctx.measureText(n).width), gap = 70, sw = 26;
  const tot = ws.reduce((p, w) => p + sw + 14 + w, 0) + gap * (items.length - 1); let x = cx - tot / 2;
  items.forEach(([n, k, a], i) => { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - sw + 4, sw, sw, 6); shape(ctx, k, _lt(k, 0.35), 1.5); text(ctx, n, x + sw + 14, y, f, C.text, 'left'); ctx.restore(); } x += sw + 14 + ws[i] + gap; });
  ctx.restore(); };

// bekken van een viervoetig landdier, zijaanzicht (kop links): darmbeen schuin naar de wervelkolom, heupkom, zitbeen en schaambeen met het gat ertussen
E7.bekken = function (ctx, x, y, s = 1, a = 1, goud = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const rand = goud ? C.goud : BOT.kaalR, lw = goud ? 4 : 2;
  ctx.beginPath(); ctx.moveTo(-92, -10); ctx.quadraticCurveTo(-40, -22, 14, -10); ctx.quadraticCurveTo(28, 22, 24, 54); ctx.lineTo(8, 68); ctx.quadraticCurveTo(-16, 46, -44, 34); ctx.quadraticCurveTo(-80, 24, -92, -10); ctx.closePath(); shape(ctx, BOT.kaal, rand, lw); // darmbeen
  ctx.beginPath(); ctx.moveTo(14, 60); ctx.quadraticCurveTo(64, 56, 104, 80); ctx.quadraticCurveTo(122, 104, 96, 126); ctx.quadraticCurveTo(54, 134, 14, 112); ctx.quadraticCurveTo(-8, 96, 14, 60); ctx.closePath();
  ctx.moveTo(84, 96); ctx.ellipse(56, 96, 28, 17, 0.1, 0, 6.283); ctx.fillStyle = BOT.kaal; ctx.fill('evenodd'); ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); // zitbeen + schaambeen met gat
  circ(ctx, 6, 78, 19, _dk(BOT.kaal, 0.18), rand, lw); circ(ctx, 6, 78, 10, _dk(BOT.kaal, 0.35)); // heupkom
  ctx.restore(); };

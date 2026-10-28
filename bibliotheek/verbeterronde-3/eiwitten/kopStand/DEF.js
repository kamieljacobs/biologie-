// ---------- MYOSINEKOP (kopStand) (verbeterronde 3 eiwitten, 28 okt 2026: kralenketen) ----------
// Kralen hier bewust groter dan _kkKluwen kiest (± 0,15 s), zodat ze bij de grote actinebolletjes passen.
// Kop = gevouwen kralenketen in dezelfde ovale omtrek; hals = korte α-helix van kralen (de hefboomarm); gedimde buurkoppen ook als kralen.
// Gouden rand bij hl > 0,5 blijft; de ATP-holte blijft een donker vlekje op de kop.
// Zelfde aanroep, plaats, grootte en ankerpunten als nu; alleen de eiwitten zijn een kralenketen (_kkKluwen/_kkPad/_kkHelix uit
// verbeterronde-2/eiwitten/_hulp.js), zoals Kamiel voor alle eiwitten koos (C9, BEELDAFSPRAKEN: keten van aminozuren die vouwt,
// geen vlakke vorm). Het receptcommentaar boven de functie in lib_bio.js blijft gelden; alleen deze functie vervangen.
const _MYO_KOP = _ellips(55, 85), _MYO_BUUR = _ellips(45, 70); // kop en gedimde buurkoppen (ontwerpeenheden, 100 = s)
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, _mixHex(Z9.myosine, '#FFFFFF', 0.3), 1.5);
  // naastgelegen koppen op de dikke draad (context, gedimd)
  ctx.save(); ctx.globalAlpha *= 0.35; for (const dx of [-5.5, 5.5]) { const hx = x + dx * s; ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.3 * s; ctx.beginPath(); ctx.moveTo(hx, my - 0.45 * s); ctx.lineTo(hx - 0.5 * s, my - 1.5 * s); ctx.stroke(); ctx.save(); ctx.translate(hx - 0.6 * s, my - 1.9 * s); ctx.rotate(-0.3); _grKralen(ctx, 0, 0, _MYO_BUUR.binnen, { bbox: _MYO_BUUR.bbox, sc: s / 100, r: 16, col: Z9.myosine, seed: 2, key: 'myoBuur' }); ctx.restore(); } ctx.restore();
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip(); _spA_actine(ctx, x - 10 * s, ay, x + 10 * s, s, actX, plekken); ctx.restore();
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  _kkHelix(ctx, [nx, ny], [kx, kopY + 0.55 * s], Math.max(2, 0.15 * s), Z9.myosine, { amp: 0.7 }); // hals = hefboom-α-helix
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.6 * s, 0.9 * s, 0, 0, 6.283); ctx.fillStyle = rgba(_mixHex(Z9.myosine, '#121A26', 0.5), 0.6); ctx.fill(); if (hl > 0.5) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
  _grKralen(ctx, 0, 0, _MYO_KOP.binnen, { bbox: _MYO_KOP.bbox, sc: s / 100, r: 15, col: _mixHex(Z9.myosine, '#FFFFFF', 0.15), seed: 5, key: 'myoKop' });
  ctx.beginPath(); ctx.ellipse(0.1 * s, -0.35 * s, 0.18 * s, 0.12 * s, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.45); ctx.fill(); ctx.restore(); // ATP-holte
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; _spA_chip(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, Math.max(12, Math.round(0.42 * s))); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}

// Koeien voor vdb: koe7-pop (HoefPop) met rasfuncties, letterlijk uit lb3/teken_lb3.js r. 7 en 19-70 (Fokken, goedgekeurd); plus een vleesras (Limousin-achtig roodbruin) en kalf.
const _dk3 = (hex, k = 0.25) => _mixHex(hex, '#000000', k), _lt3 = (hex, k = 0.25) => _mixHex(hex, '#FFFFFF', k);
// ---------- KOEIEN: koe7-pop (HoefPop, bibliotheek) met eigen kleuren per ras ----------
// Alleen kleur, dikte van de poten en kleine toevoegingen (uier, blaar, neusring, nekkam) verschillen; vorm, skelet en gang zijn de goedgekeurde koe7.
const _KOE_BASIS = { H: 140, oogR: 2.7, oogStijl: 'koe', kopVolg: 0.95, neusK: '#7A4A44', mondK: '#7A5048', iris: '#2A1A10', dikV: 1.2, dikA: 1.15, verKleur: '#3A2E2E',
  HOEF: { type: 'klauw', L: 11, hv: 6.5, hh: 3.5, kleur: '#4A3D36' } };
const _ZW = '#25211F', _ZWOOR = '#1C1917', _WIT = '#EEE8DE', _WITPOOT = '#E9E3D8';
const _pootK = (c) => ({ rad: { c }, mc: { c }, vp: { c }, schn: { c }, mt: { c }, ap: { c } });
// ---------- eigen silhouetten (Kamiel 26 okt 2026, beeldreview MOET 5/6): vorm van koe7 vervormd, skelet en gang blijven die van de pop ----------
// _vormT past fn(x, y) toe op elk punt [x, y] in de vorm (gewrichten, delen, lagen, omtrek, oog, neus, mond); _deelSchaal vergroot één deel rond zijn zwaartepunt.
function _vormT(V, fn) { const f = (o) => Array.isArray(o) ? ((o.length === 2 && typeof o[0] === 'number' && typeof o[1] === 'number') ? fn(o[0], o[1]) : o.map(f)) : (o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)])) : o); return f(V); }
function _deelSchaal(V, deel, kx, ky, dx = 0, dy = 0) { const d = V.delen[deel]; const P = d.basis; const cx = P.reduce((s, p) => s + p[0], 0) / P.length, cy = P.reduce((s, p) => s + p[1], 0) / P.length;
  const g = (x, y) => [cx + (x - cx) * kx + dx, cy + (y - cy) * ky + dy]; V.delen[deel] = _vormT(d, g); }
// dubbeldoelkoe (oud Fries-Hollands): korte poten, diep en breed lijf, vlezige dij en schouder, rechte rug. Buiklijn −62 cm → −42; boven de buik iets dieper (×1,12)
const _DD_Y = (y) => y <= -62 ? -42 + (y + 62) * 1.12 : y * (42 / 62);
HOEF_VORM.koeDD = _vormT(HOEF_VORM.koe, (x, y) => [x * 1.02, _DD_Y(y)]); _deelSchaal(HOEF_VORM.koeDD, 'dij', 1.18, 1.1, -2, 2); _deelSchaal(HOEF_VORM.koeDD, 'hum', 1.15, 1.1, 2, 2);
// stier: zware nek met schouderkam, brede kop, diepe borst; poten normaal lang
HOEF_VORM.koeStier = _vormT(HOEF_VORM.koe, (x, y) => { const nk = Math.exp(-(((x - 62) / 26) ** 2)) * clamp((-y - 95) / 40, 0, 1); const bo = x > 30 && y > -85 && y < -55 ? (y + 85) / 30 * 6 : 0; return [x, y - nk * 14 + bo]; });
_deelSchaal(HOEF_VORM.koeStier, 'nek', 1.22, 1.25, 0, -3); _deelSchaal(HOEF_VORM.koeStier, 'kop', 1.14, 1.12); _deelSchaal(HOEF_VORM.koeStier, 'kaak', 1.15, 1.15); _deelSchaal(HOEF_VORM.koeStier, 'hum', 1.12, 1.08);
function _lb3KoeDef(o, vorm = 'koe') { const d = _hoefDef(vorm, Object.assign({}, _KOE_BASIS, o, {
    HOUDING: { staan: { ver: { V: -8, A: 8 } }, grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 14 }, dy: 6, A: { nek: 62 }, reik: 1 }, liggen: _koeLig(HOEF_VORM[vorm].J) },
    GANGEN: { lopen: _hoefStap(130, 0.65, 0.88, { scap: 12, rol: 1.0 }) } })); return d; }
const KOE_RAS = {
  // Holstein zwartbont: zwarte basis met witte vlekken (de witte lappen van de MRIJ-plaat), witte poten, kop zwart met witte bles
  holstein: { def: _lb3KoeDef({ dikV: 1.0, dikA: 0.98, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.95, sy: 1.04, uier: 1.3, staartWit: 1 },
  // dubbeldoelkoe (oud zwartbont Fries-Hollands type, melk én vlees): zelfde kleuren, gedrongen, dikke poten, klein uier
  dubbel: { def: _lb3KoeDef({ dikV: 1.45, dikA: 1.45, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }, 'koeDD'), sx: 1.0, sy: 1.0, uier: 0.35, staartWit: 1, yT: _DD_Y },
  // Groninger blaarkop: zwart met witte kop en zwarte 'blaren' rond de ogen, witte buik en staartpunt, zwarte poten
  blaarkop: { def: _lb3KoeDef({ dikV: 1.25, dikA: 1.2, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#C6AD9B': '#E6DFD4' }, WEG: ['#E8D7C6:romp', '#834B30:kop'], POOT: _pootK('#2E2A27'),
      GEZICHT: (ctx) => { const O = HOEF_VORM.koe.oog; ctx.fillStyle = _ZW; ctx.beginPath(); ctx.ellipse(O[0] - 0.5, O[1] + 0.3, 7.2, 5.6, -0.3, 0, 6.283); ctx.fill(); } }), sx: 1.0, sy: 0.97, uier: 0.85, staartWit: 1, buikWit: 1 },
  // stier (Holstein): zwartbont, zwaarder voorhand, geen uier, neusring
  stier: { def: _lb3KoeDef({ dikV: 1.35, dikA: 1.3, KLEUR: { '#834B30': '#201C1A', '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#C9C1B6' }, POOT: _pootK('#D9D2C8'),
      GEZICHT: (ctx) => { const N = HOEF_VORM.koeStier.neusgat; ctx.strokeStyle = '#C9B26A'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.ellipse(N[0] + 2.5, N[1] + 6.5, 4, 4.8, 0.2, 0, 6.283); ctx.stroke(); } }, 'koeStier'), sx: 1.1, sy: 1.08, uier: 0, kam: 0, scrotum: 1 },
  // stierkalfje: Holstein-kleuren, kortere romp (sx < sy): poten lijken naar verhouding langer
  // vdb: vleesrund (Limousin-achtig, effen roodbruin, lichtere buik en snuit; geen groot uier) en roodbruin kalf
  vlees: { def: _lb3KoeDef({ dikV: 1.3, dikA: 1.3, KLEUR: { '#834B30': '#A4552E', '#6A3824': '#7A3C20', '#E8D7C6': '#C98A5A', '#C6AD9B': '#D9B08A' }, POOT: _pootK('#A4552E') }, 'koeDD'), sx: 1.02, sy: 1.0, uier: 0.25, staartWit: 0, yT: _DD_Y },
  vleeskalf: { def: _lb3KoeDef({ dikV: 0.95, dikA: 0.95, KLEUR: { '#834B30': '#B0623A', '#6A3824': '#84452A', '#E8D7C6': '#D19A6A', '#C6AD9B': '#DDB892' }, POOT: _pootK('#B0623A') }), sx: 0.72, sy: 0.95, uier: 0 },
  kalf: { def: _lb3KoeDef({ dikV: 0.9, dikA: 0.9, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.76, sy: 1.0, uier: 0 }
};
for (const k in KOE_RAS) KOE_RAS[k].pop = HoefPop.maak(KOE_RAS[k].def);
// koe in wereldcoördinaten: x,y = midden onder de poten op de grond; P = px per cm; o: houding, t, kijk, a, uier (overschrijft ras)
function rund(ctx, ras, x, y, P, o = {}) { const R = KOE_RAS[ras]; if (!R) return; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(R.sx, R.sy);
  const pop = R.pop, an = pop.D.anker || 0, X = (cx) => kijk * P * (cx - an), Y = (cy) => P * (R.yT ? R.yT(cy) : cy);
  pop.teken(ctx, 0, 0, P, { houding: o.houding || 'staan', t: o.t || 0, kijk });
  // uier: ná de pop, vóór de nabije achterpoot (die staat er op x ≈ −60 tot −46 cm, het uier begint op −47); bovenrand valt in de buik
  const ui = o.uier != null ? o.uier : R.uier; if (ui > 0.01) { const u = ui, d = 13 * u; ctx.fillStyle = '#DDB0A3'; ctx.beginPath(); ctx.moveTo(X(-47), Y(-56)); ctx.bezierCurveTo(X(-50), Y(-56 + d * 0.9), X(-40), Y(-55 + d), X(-28), Y(-55 + d)); ctx.bezierCurveTo(X(-14), Y(-55 + d), X(-9), Y(-54 + d * 0.5), X(-8), Y(-57)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = rgba('#B98374', 0.4); ctx.beginPath(); ctx.ellipse(X(-28), Y(-55 + d * 0.86), P * 13, P * 2.4 * u, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba('#B98374', 0.55); ctx.lineWidth = Math.max(1, P * 0.45); ctx.beginPath(); ctx.moveTo(X(-28), Y(-55)); ctx.quadraticCurveTo(X(-27), Y(-55 + d * 0.5), X(-28), Y(-55 + d * 0.9)); ctx.stroke();
    ctx.fillStyle = '#C98E80'; for (const tx of [-39, -17]) { roundRect(ctx, X(tx) - P * 1.3, Y(-56 + d), P * 2.6, P * 5, P * 1.2); ctx.fill(); } }
  // nekkam van de stier: zware bult boven hals en schoft (stieren hebben een veel dikkere nek dan koeien)
  if (R.kam) { ctx.fillStyle = '#201C1A'; ctx.beginPath(); ctx.moveTo(X(26), Y(-132)); ctx.quadraticCurveTo(X(58), Y(-162), X(94), Y(-150)); ctx.quadraticCurveTo(X(102), Y(-122), X(82), Y(-100)); ctx.lineTo(X(40), Y(-110)); ctx.closePath(); ctx.fill(); }
  // scrotum: sober, tussen de achterpoten (achter de nabije achterpoot getekend zou beter zijn; hier na de pop, klein en in een gedempte huidtint)
  if (R.scrotum) { ctx.fillStyle = '#B8A49A'; ctx.beginPath(); ctx.moveTo(X(-44), Y(-66)); ctx.bezierCurveTo(X(-50), Y(-56), X(-48), Y(-44), X(-41), Y(-43)); ctx.bezierCurveTo(X(-34), Y(-44), X(-33), Y(-56), X(-38), Y(-66)); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// schofthoogte van een ras in px (handig voor labels boven de koe)
const rundTop = (ras, y, P) => y - P * 150 * (KOE_RAS[ras] ? KOE_RAS[ras].sy : 1);

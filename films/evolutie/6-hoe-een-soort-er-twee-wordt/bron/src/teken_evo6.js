// Evolutie v2 · film 6 Hoe één soort er twee wordt — film-eigen tekeningen (22 okt 2026)
// ===== VIERVOETERS volgens C9 (skelet eerst, dan lijf) — gedeeld met teken_evo6.js (identieke kopie daar) =====
// Alle maten in eenheden van de schofthoogte H (cm); s = px per cm, zodat dieren met dezelfde s onderling op schaal staan.
// Anker (x, y) = midden onder het dier op de grond; kop naar rechts, o.kijk = -1 spiegelt.
// Recept hond/wolf: lijflengte (boeg–zitbeen) ±1,1–1,2 H; borstbeen op ±0,5 H; voorbeen: schouder → elleboog tegen de borst → pols (voorvoet) op ±0,12 H → poot;
//   achterbeen: heup → knie (hoog, tegen de buik, wijst naar voren) → hiel/spronggewricht op ±0,27 H (wijst naar achter) → poot. Bekende fout: 'knie' naar achter onderaan.
// Recept paard/ezel: lijflengte ±1,0–1,05 H; borstbeen ±0,55 H; voorknie (pols) ±0,3 H, kogel ±0,12 H, hoef met schuine voorwand ±50°;
//   achterbeen: knie hoog tegen de buik, sprong (hiel) ±0,33 H; hals ±0,5 H schuin omhoog, hoofd ±0,4 H (ezel ±0,45 H) schuin omlaag. Pupil liggend.
function _vvPt(x, y, H, s, k) { return (p) => [x + k * p[0] * H * s, y - p[1] * H * s]; }
function _ketting(ctx, T, J, kleur, rand) { // ledemaat als vloeiende omtrek rond een gewrichtsketen [[x, y, breedte], ...]
  const L = [], R = []; for (let i = 0; i < J.length; i++) { const a = J[Math.max(0, i - 1)], b = J[Math.min(J.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
    L.push([J[i][0] - dy * J[i][2] / 2, J[i][1] + dx * J[i][2] / 2]); R.push([J[i][0] + dy * J[i][2] / 2, J[i][1] - dx * J[i][2] / 2]); }
  const P = [...L, ...R.reverse()].map(T); vul(ctx, P, kleur, rand || null, 1.5); }
function _kopOmtrek(K) { const { l, ds, dm, mr } = K, st = (1 - mr) * l; // kop in eigen assenstelsel: x naar de neus, y omhoog
  return K.vorm || [[-0.02 * l, 0.15 * ds], [0.05 * l, 0.75 * ds], [0.3 * st, ds], [0.75 * st, 0.95 * ds], [st, (K.stop ? 0.62 : 0.8) * ds], [st + 0.5 * mr * l, 0.62 * dm + 0.1 * ds], [0.97 * l, 0.5 * dm], [l, 0.2 * dm], [l, -0.25 * dm], [0.93 * l, -0.55 * dm],
    [st + 0.2 * mr * l, -0.62 * dm], [st, -0.7 * dm - 0.15 * ds], [0.35 * st, -0.8 * ds], [0.05 * l, -0.62 * ds]]; }
function viervoeter(ctx, x, y, s, P, o = {}) {
  const { kijk = 1, a = 1, kopHoek = 0, nadruk = null } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const T = _vvPt(x, y, P.H, s, kijk), Hp = P.H * s;
  const ver = P.verK || _dk(P.kleur, 0.22);
  const ofs = (J, dx) => J.map(([a1, b1, w]) => [a1 + dx, b1, w]);
  // verre poten
  _ketting(ctx, T, ofs(P.voor, -0.07), ver); _ketting(ctx, T, ofs(P.achter, 0.07), ver);
  if (P.voetVer !== false) { P.voet(ctx, T, ofs(P.voor, -0.07), _dk(P.hoefK || ver, 0.15), Hp, kijk); P.voet(ctx, T, ofs(P.achter, 0.07), _dk(P.hoefK || ver, 0.15), Hp, kijk); }
  if (P.staart) P.staart(ctx, T, P, Hp, kijk);
  // lijf (met hals)
  const lijf = P.lijf.map(T); vul(ctx, lijf, P.kleur);
  binnen(ctx, lijf, () => { if (P.tekening) P.tekening(ctx, T, P, Hp, kijk); });
  // nabije poten
  _ketting(ctx, T, P.voor, P.pootK || P.kleur); _ketting(ctx, T, P.achter, P.pootK || P.kleur);
  if (P.pootTekening) P.pootTekening(ctx, T, P, Hp, kijk);
  P.voet(ctx, T, P.voor, P.hoefK || P.pootK || P.kleur, Hp, kijk); P.voet(ctx, T, P.achter, P.hoefK || P.pootK || P.kleur, Hp, kijk);
  // kop: assenstelsel op de nek (P.nek = aanzet), hoek omlaag
  const K = P.kop, an = (K.hoek || 0) + kopHoek, ca = Math.cos(an), sa = Math.sin(an), [ox, oy] = K.op;
  const KT = (p) => T([ox + p[0] * ca + p[1] * sa, oy - p[0] * sa + p[1] * ca]);
  if (P.oorVer) P.oorVer(ctx, KT, K, P); else if (P.oor && P.oorDubbel !== false) { const KT2 = (p) => KT([p[0] - 0.07 * K.l, p[1]]); ctx.save(); ctx.filter = 'brightness(0.72)'; P.oor(ctx, KT2, K, P); ctx.restore(); }
  const kop = _kopOmtrek(K).map(KT); vul(ctx, kop, P.kopK || P.kleur);
  binnen(ctx, kop, () => { if (P.kopTekening) P.kopTekening(ctx, KT, K, P); });
  const ogen = KT(K.oog); dierOog(ctx, ogen[0], ogen[1], K.oogR * Hp, P.iris || '#3A2614', { pupil: P.pupil || 'rond', rand: P.oogRand || null });
  const nz = KT([K.l * 0.985, 0.1 * K.dm]); ctx.fillStyle = P.neusK || _dk(P.kopK || P.kleur, 0.55); ctx.beginPath(); ctx.ellipse(nz[0], nz[1], K.dm * 0.22 * Hp, K.dm * 0.14 * Hp, 0, 0, 6.283); ctx.fill();
  if (P.oor) P.oor(ctx, KT, K, P);
  if (P.manen) P.manen(ctx, T, P, Hp, kijk);
  if (nadruk) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 7]); const c = T(nadruk); ctx.beginPath(); ctx.arc(c[0], c[1], nadruk[2] * Hp, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); return { T, KT, Hp };
}
// ---- voeten ----
function _poot(ctx, T, J, kleur, Hp, kijk) { const e = J[J.length - 1], p = T([e[0] + 0.03, 0.025]); ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(p[0], p[1], e[2] * 0.75 * Hp, e[2] * 0.36 * Hp, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = _dk(kleur, 0.35); ctx.lineWidth = Math.max(0.8, Hp * 0.004); for (const d of [0.01, 0.035]) { const q = T([e[0] + d + 0.02, 0.045]), r = T([e[0] + d + 0.022, 0.012]); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(r[0], r[1]); ctx.stroke(); } }
function _hoef(ctx, T, J, kleur, Hp, kijk) { const e = J[J.length - 1], w = e[2] * 1.55, h = e[2] * 1.05; // schuine voorwand, platte zool, iets breder dan de kogel
  const P = [T([e[0] - w * 0.5, h]), T([e[0] + w * 0.3, h]), T([e[0] + w * 0.75, 0]), T([e[0] - w * 0.55, 0])]; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill(); }
// ---- oren ----
function _oorRecht(kl, bin, h, b0, b1, kantel = -0.25) { return (ctx, KT, K) => { const l = K.l, ds = K.ds; const v = [b0 * l, ds * 0.9], w = [b1 * l, ds * 0.86], tip = [(b0 + b1) / 2 * l + kantel * h * l, ds + h * l];
  vul(ctx, [KT(v), KT([lerp(v[0], tip[0], 0.6) - 0.02 * l, lerp(v[1], tip[1], 0.6)]), KT(tip), KT([lerp(w[0], tip[0], 0.5) + 0.03 * l, lerp(w[1], tip[1], 0.5)]), KT(w)], kl);
  if (bin) vul(ctx, [KT([lerp(v[0], w[0], 0.25), v[1] + 0.02 * l]), KT([lerp(v[0], tip[0], 0.8) + 0.01 * l, lerp(v[1], tip[1], 0.8)]), KT([lerp(w[0], tip[0], 0.45), lerp(w[1], tip[1], 0.45)]), KT([lerp(v[0], w[0], 0.7), v[1] + 0.02 * l])], bin); }; }
function _oorHangend(kl, lang) { return (ctx, KT, K) => { const l = K.l, ds = K.ds; vul(ctx, [KT([0.12 * l, ds * 0.92]), KT([0.42 * l, ds * 0.86]), KT([0.36 * l, ds * 0.2]), KT([0.3 * l, -lang * l]), KT([0.12 * l, -lang * l * 0.9]), KT([0.06 * l, ds * 0.3])], kl); }; }
// ---- staarten ----
function _staartBos(kl, punt, lengte = 0.6, dik = 0.1) { return (ctx, T, P, Hp) => { const r = P.staartWortel; const pts = [[r[0] + 0.03, r[1] + 0.02], [r[0] - 0.08, r[1] - 0.06], [r[0] - 0.12, r[1] - lengte * 0.5], [r[0] - 0.08 - dik * 0.3, r[1] - lengte], [r[0] - 0.08 + dik * 0.5, r[1] - lengte * 0.98], [r[0] - 0.05 + dik * 0.6, r[1] - lengte * 0.5], [r[0] + 0.0 + dik * 0.3, r[1] - 0.08]];
  vul(ctx, pts.map(T), kl); if (punt) binnen(ctx, pts.map(T), () => { const c = T([r[0] - 0.08, r[1] - lengte * 0.95]); ctx.fillStyle = punt; ctx.beginPath(); ctx.arc(c[0], c[1], dik * 0.55 * Hp, 0, 6.283); ctx.fill(); }); }; }
function _staartHaar(kl, lengte = 0.62, vol = 1) { return (ctx, T, P) => { const r = P.staartWortel; const pts = [[r[0] + 0.02, r[1] + 0.01], [r[0] - 0.06, r[1] - 0.02], [r[0] - 0.1 * vol, r[1] - lengte * 0.45], [r[0] - 0.09 * vol, r[1] - lengte], [r[0] - 0.02, r[1] - lengte * 1.02], [r[0] + 0.0, r[1] - lengte * 0.5], [r[0] + 0.03, r[1] - 0.06]]; vul(ctx, pts.map(T), kl);
  ctx.strokeStyle = _lt(kl, 0.15); ctx.lineWidth = 1.5; for (let i = 0; i < 4; i++) { const a1 = T([r[0] - 0.02 - i * 0.02 * vol, r[1] - 0.1]), b1 = T([r[0] - 0.03 - i * 0.02 * vol, r[1] - lengte * 0.9]); ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.quadraticCurveTo(a1[0], (a1[1] + b1[1]) / 2, b1[0], b1[1]); ctx.stroke(); } }; }
function _staartKwast(kl, kwast, lengte = 0.5) { return (ctx, T, P, Hp) => { const r = P.staartWortel; const a1 = T(r), b1 = T([r[0] - 0.05, r[1] - lengte * 0.8]); ctx.strokeStyle = kl; ctx.lineWidth = 0.03 * Hp; ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.quadraticCurveTo(T([r[0] - 0.06, r[1] - 0.2])[0], T([r[0] - 0.06, r[1] - 0.2])[1], b1[0], b1[1]); ctx.stroke();
  vul(ctx, [[r[0] - 0.035, r[1] - lengte * 0.72], [r[0] - 0.08, r[1] - lengte * 0.95], [r[0] - 0.05, r[1] - lengte * 1.05], [r[0] - 0.02, r[1] - lengte * 0.92]].map(T), kwast); }; }


// ===== HONDACHTIGEN (kopie uit teken_evo4.js, identiek): één skelet, rassen via parameters =====
// p: H (cm), B lijflengte, hb hoogte borstbeen, nek, croup (val van het kruis), dik (pootdikte), kop {l, ds, dm, mr, stop, hoek, oogR}
function hondSkelet(p) { const B = p.B, xf = B / 2, xb = -B / 2, hb = p.hb, t = p.dik || 1, nk = p.nek ?? 0.2, cr = p.croup || 0, poot = hb / 0.5;
  const poll = [xf + 0.1 + nk * 0.3, 1 + nk];
  const lijf = [[xb + 0.03, 0.93 + cr * 0.6], [xb + 0.14, 0.98 + cr], [0, 0.965 + cr * 0.4], [xf - 0.22, 1.0], [xf - 0.06, 1.02 + nk * 0.3], [poll[0] - 0.07, poll[1] + 0.01], [poll[0] + 0.03, poll[1] - 0.03], [poll[0] + 0.05, poll[1] - 0.17],
    [xf + 0.08, 0.78], [xf + 0.04, 0.66], [xf - 0.08, hb + 0.02], [0, hb + 0.02], [xb + 0.3, hb + 0.08 + (p.tuck || 0.06)], [xb + 0.2, hb + 0.06], [xb - 0.03, 0.66], [xb - 0.02, 0.84]];
  const voor = [[xf - 0.08, 0.82, 0.2 * t], [xf - 0.13, hb + 0.02, 0.13 * t], [xf - 0.11, 0.12 * poot, 0.065 * t], [xf - 0.07, 0.04, 0.07 * t]];
  const achter = [[xb + 0.1, 0.84, 0.25 * t], [xb + 0.24, Math.max(hb + 0.02, 0.4), 0.15 * t], [xb - 0.03, 0.27 * poot, 0.07 * t], [xb + 0.04, 0.04, 0.065 * t]];
  return { lijf, voor, achter, staartWortel: [xb + 0.04, 0.92 + cr * 0.6], poll }; }
function maakHond(p) { const sk = hondSkelet(p); const K = Object.assign({ hoek: 0.25, oog: null, oogR: 0.012 }, p.kop); K.op = [sk.poll[0] - 0.04, sk.poll[1] - 0.06]; if (!K.oog) K.oog = [(1 - K.mr) * K.l * 0.82, K.ds * 0.42]; return Object.assign({ voet: _poot }, sk, p, { kop: K }); }
var WOLF = maakHond({ H: 80, B: 1.2, hb: 0.5, nek: 0.1, dik: 1, kop: { l: 0.36, ds: 0.13, dm: 0.075, mr: 0.48, stop: false, hoek: 0.2, oogR: 0.016 },
  kleur: '#8E8A84', verK: '#6E6A65', pootK: '#A8A196', kopK: '#968F86', iris: '#C98E2E', neusK: '#1E1A18', staart: _staartBos('#7E7A74', '#2A2624', 0.58, 0.14),
  oor: _oorRecht('#8E8A84', '#CFC8BA', 0.36, 0.06, 0.24),
  tekening(ctx, T) { vul(ctx, [[-0.55, 0.98], [0.1, 1.02], [0.45, 1.06], [0.4, 0.85], [-0.1, 0.83], [-0.5, 0.86]].map(T), '#625E59'); vul(ctx, [[0.72, 0.95], [0.68, 0.62], [0.5, 0.52], [0.0, 0.5], [-0.3, 0.6], [0.2, 0.58], [0.55, 0.7], [0.62, 0.95]].map(T), '#D2CBBE'); },
  kopTekening(ctx, KT, K) { vul(ctx, [[0.18, -0.02], [0.37, -0.01], [0.37, -0.1], [0.05, -0.12]].map(KT), '#DDD6C9'); } });
var HONDEN = {
  herder: maakHond({ H: 62, B: 1.3, hb: 0.48, nek: 0.14, croup: -0.07, dik: 0.95, kop: { l: 0.37, ds: 0.12, dm: 0.07, mr: 0.5, stop: true, hoek: 0.2, oogR: 0.016 },
    kleur: '#B07A3E', verK: '#8A5E2E', iris: '#4A2E14', neusK: '#151210', staart: _staartBos('#3A2E26', null, 0.62, 0.12), oor: _oorRecht('#2A2420', '#6E4A2E', 0.42, 0.05, 0.25),
    tekening(ctx, T) { vul(ctx, [[-0.65, 0.92], [0, 1.0], [0.4, 1.05], [0.35, 0.78], [-0.1, 0.72], [-0.55, 0.78]].map(T), '#2A2420'); },
    kopTekening(ctx, KT, K) { vul(ctx, [[0.2, 0.06], [0.4, 0.03], [0.4, -0.1], [0.18, -0.12]].map(KT), '#2A2420'); } }),
  teckel: maakHond({ H: 23, B: 1.95, hb: 0.24, nek: 0.25, dik: 1.35, tuck: 0.02, kop: { l: 0.62, ds: 0.2, dm: 0.11, mr: 0.5, stop: false, hoek: 0.15, oogR: 0.022 },
    kleur: '#9C4E26', verK: '#7A3C1E', iris: '#3A2010', neusK: '#151210', staart: _staartBos('#8A4220', null, 0.4, 0.06), oor: _oorHangend('#7A3C1E', 0.18), oorDubbel: false }),
  mops: maakHond({ H: 29, B: 1.05, hb: 0.47, nek: 0.1, dik: 1.25, kop: { l: 0.3, ds: 0.2, dm: 0.18, mr: 0.14, stop: true, hoek: 0.0, oogR: 0.03, oog: [0.17, 0.08] },
    kleur: '#CDB48A', verK: '#A8906A', iris: '#24160C', neusK: '#151210', oogRand: '#151210',
    staart: (ctx, T, P, Hp) => { const r = P.staartWortel, c = T([r[0] + 0.02, r[1] + 0.1]); ctx.strokeStyle = '#B89E74'; ctx.lineWidth = 0.07 * Hp; ctx.beginPath(); ctx.arc(c[0], c[1], 0.08 * Hp, 0.6, 5.4); ctx.stroke(); },
    oorDubbel: false, oor: (ctx, KT, K) => vul(ctx, [[0.04, 0.19], [0.13, 0.2], [0.14, 0.1], [0.07, 0.12]].map(KT), '#2A2420'),
    kopTekening(ctx, KT) { vul(ctx, [[0.2, 0.2], [0.34, 0.15], [0.34, -0.25], [0.18, -0.25]].map(KT), '#2A2420'); } }),
  chihuahua: maakHond({ H: 20, B: 1.05, hb: 0.52, nek: 0.25, dik: 0.75, kop: { l: 0.4, ds: 0.2, dm: 0.08, mr: 0.3, stop: true, hoek: 0.2, oogR: 0.035 },
    kleur: '#D8B07A', verK: '#B08A58', iris: '#24160C', neusK: '#151210', staart: (ctx, T, P, Hp) => { const r = P.staartWortel; ctx.strokeStyle = '#C89E68'; ctx.lineWidth = 0.05 * Hp; const a1 = T(r), b1 = T([r[0] - 0.1, r[1] + 0.35]); ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.quadraticCurveTo(T([r[0] - 0.22, r[1] + 0.1])[0], T([r[0] - 0.22, r[1] + 0.1])[1], b1[0], b1[1]); ctx.stroke(); },
    oor: _oorRecht('#D8B07A', '#E8B8A0', 0.62, 0.03, 0.3, -0.35) }),
};
function wolf(ctx, x, y, s, o = {}) { return viervoeter(ctx, x, y, s, WOLF, o); }
function hond(ctx, ras, x, y, s, o = {}) { return viervoeter(ctx, x, y, s, HONDEN[ras], o); }


// ===== PAARDACHTIGEN: paard, ezel, muilezel (zelfde schaal: s = px per cm) =====
// Maten: paard (warmbloed) schofthoogte ±160 cm, lijflengte ≈ schofthoogte, hoofd ±60 cm; ezel (Nederlandse standaardezel) ±110 cm, oren ±25 cm, kwaststaart, rechtopstaande manen,
// lichte snuit en buik, oogring, donkere aalstreep en schouderkruis; muilezel (paardenhengst × ezelin) ±130 cm, oren tussen paard en ezel in, staart met haar vanaf halverwege.
// Bekende fouten: hiel (sprong) op de plek van de knie; hoef als stip; oren als konijnenoren recht omhoog; ezel als kleine kopie van een paard.
function paardSkelet(p) { const B = p.B || 1.0, xf = B / 2, xb = -B / 2, hb = p.hb, t = p.dik || 1, poll = p.poll;
  const lijf = [[xb + 0.02, 0.93], [xb + 0.16, 0.995], [-0.06, 0.955 - (p.rugZak || 0)], [xf - 0.2, 1.0], [xf - 0.06, 1.05], [lerp(xf - 0.06, poll[0], 0.55) - 0.02, lerp(1.05, poll[1], 0.55) + (p.kam || 0.03)], [poll[0] - 0.05, poll[1] + 0.01], [poll[0] + 0.03, poll[1] - 0.03],
    [poll[0] + 0.06, poll[1] - 0.12], [lerp(poll[0], xf + 0.12, 0.5), lerp(poll[1] - 0.12, 0.8, 0.5)], [xf + 0.12, 0.8], [xf + 0.1, 0.7], [xf + 0.03, 0.6], [xf - 0.1, hb], [-0.05, hb - 0.015], [xb + 0.3, hb + 0.02], [xb + 0.23, hb + 0.09], [xb - 0.05, 0.72], [xb - 0.04, 0.86]];
  const fx = xf - 0.1, bx = xb + 0.03;
  const voor = [[fx + 0.01, 0.78, 0.2 * t], [fx - 0.02, hb + 0.02, 0.13 * t], [fx - 0.01, 0.42, 0.085 * t], [fx, 0.3, 0.075 * t], [fx, 0.2, 0.055 * t], [fx + 0.005, 0.12, 0.068 * t], [fx + 0.04, 0.05, 0.05 * t], [fx + 0.055, 0.02, 0.05 * t]];
  const achter = [[bx + 0.1, 0.84, 0.3 * t], [bx + 0.24, hb + 0.03, 0.16 * t], [bx + 0.1, 0.45, 0.11 * t], [bx - 0.01, p.spr || 0.34, 0.08 * t], [bx, 0.22, 0.058 * t], [bx + 0.005, 0.12, 0.068 * t], [bx + 0.04, 0.05, 0.05 * t], [bx + 0.055, 0.02, 0.05 * t]];
  return { lijf, voor, achter, staartWortel: [xb + 0.03, 0.935], poll }; }
function _paardKop(l, bv, kaak) { return [[-0.03, 0.03], [0.02, 0.07], [0.3 * l, 0.075], [0.8 * l, 0.055], [0.97 * l, 0.04], [1.02 * l, 0.005], [0.99 * l, -0.035], [0.9 * l, -0.045], [0.6 * l, -0.045], [0.38 * l, -0.06 - kaak * 0.3], [0.2 * l, -0.1 - kaak], [0.05 * l, -0.1 - kaak * 0.6], [-0.04, -0.05]]; }
function _oorPaard(kl, bin, h, br = 0.03) { return (ctx, KT, K) => { const b0 = KT([0.0, 0.065]), b1 = KT([0.07 * K.l / 0.38, 0.06]); const e = Math.hypot(KT([1, 0])[0] - KT([0, 0])[0], KT([1, 0])[1] - KT([0, 0])[1]); // e = px per H
  const sg = Math.sign(KT([1, 0])[0] - KT([0, 0])[0]) || 1, dx = (b1[0] - b0[0]) * 0.5, tip = [b0[0] + dx - sg * h * e * 0.12, b0[1] - h * e];
  vul(ctx, [b0, [lerp(b0[0], tip[0], 0.55) - br * e, lerp(b0[1], tip[1], 0.55)], tip, [lerp(b1[0], tip[0], 0.55) + br * e * 0.8, lerp(b1[1], tip[1], 0.55)], b1], kl);
  if (bin) vul(ctx, [[lerp(b0[0], b1[0], 0.3), lerp(b0[1], b1[1], 0.3) - 0.01 * e], [lerp(b0[0], tip[0], 0.85), lerp(b0[1], tip[1], 0.85)], [lerp(b1[0], tip[0], 0.6), lerp(b1[1], tip[1], 0.6)]], bin); }; }
function _manen(kl, hoog, val = 0) { return (ctx, T, P, Hp) => { const p = P.poll, xf = (P.B || 1) / 2; const A = [], n = 9; // langs de halskam van achter het oor tot de schoft
  for (let i = 0; i <= n; i++) { const u = i / n; A.push([lerp(p[0] - 0.06, xf - 0.1, u), lerp(p[1] - 0.01, 1.0, u) + Math.sin(u * 3.14) * (P.kam || 0.03) * 0.55]); }
  const B = A.slice().reverse().map(([a, b], i) => [a + 0.02, b + 0.02 + hoog * (0.75 + 0.25 * Math.sin(i * 1.7))]);
  vul(ctx, [...A, ...B].map(T), kl); }; }
const PAARD = (() => { const p = { H: 160, B: 1.02, hb: 0.5, poll: [0.84, 1.26], kam: 0.05, dik: 1 }; const sk = paardSkelet(p);
  return Object.assign({ voet: _hoef }, sk, p, { kleur: '#8C5A3A', verK: '#6E4630', pootK: '#8C5A3A', hoefK: '#2A2420', kopK: '#8C5A3A', iris: '#2A1A10', pupil: 'liggend', neusK: '#3A2A22',
    kop: { l: 0.38, ds: 0.075, dm: 0.04, mr: 0.3, hoek: 0.9, op: [0.82, 1.23], oog: [0.08, 0.035], oogR: 0.011, vorm: _paardKop(0.38, 0, 0.02) },
    staart: _staartHaar('#1E1814', 0.62, 1.1), manen: _manen('#1E1814', 0.035, 0), oor: _oorPaard('#8C5A3A', '#5A3A28', 0.085),
    pootTekening(ctx, T) { for (const J of [PAARD.voor, PAARD.achter]) { const pts = J.slice(3); const L2 = [], R2 = []; for (const [a1, b1, w] of pts) { L2.push([a1 - w * 0.55, b1]); R2.push([a1 + w * 0.55, b1]); } vul(ctx, [...L2, ...R2.reverse()].map(T), '#1E1814'); } }, // zwarte onderbenen (bruin paard)
    kopTekening(ctx, KT) { vul(ctx, [[0.13, 0.075], [0.3, 0.07], [0.3, 0.05], [0.14, 0.055]].map(KT), '#E6DCCB'); } }); })(); // bles langs de neusrug
const EZEL = (() => { const p = { H: 110, B: 1.02, hb: 0.48, poll: [0.72, 1.24], kam: 0.02, dik: 1.05, rugZak: 0.01 }; const sk = paardSkelet(p);
  return Object.assign({ voet: _hoef }, sk, p, { kleur: '#8A8580', verK: '#6A6560', pootK: '#8A8580', hoefK: '#2E2824', kopK: '#8A8580', iris: '#2A1A10', pupil: 'liggend', neusK: '#3A3430', oogRand: '#E6E0D4', buik: '#E6E0D4',
    kop: { l: 0.45, ds: 0.09, dm: 0.05, mr: 0.3, hoek: 0.8, op: [0.7, 1.21], oog: [0.1, 0.04], oogR: 0.014, vorm: _paardKop(0.45, 0, 0.03).map(([a1, b1]) => [a1, b1 * 1.25]) },
    staart: _staartKwast('#7A7570', '#2A2624', 0.5), manen: _manen('#3A3430', 0.06, 0), oor: _oorPaard('#8A8580', '#3A3430', 0.25, 0.06),
    tekening(ctx, T) { vul(ctx, [[-0.42, 0.56], [-0.2, 0.46], [0.15, 0.45], [0.36, 0.5], [0.2, 0.58], [-0.2, 0.6]].map(T), '#D8D2C6');
      ctx.strokeStyle = '#3A3430'; ctx.lineWidth = 0.025 * (T([1, 0])[0] - T([0, 0])[0]) * Math.sign(T([1, 0])[0] - T([0, 0])[0]); ctx.lineCap = 'round'; const a1 = T([-0.48, 0.97]), b1 = T([0.32, 1.0]); ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.quadraticCurveTo(T([-0.05, 0.955])[0], T([-0.05, 0.955])[1], b1[0], b1[1]); ctx.stroke(); // aalstreep
      const c1 = T([0.31, 1.0]), d1 = T([0.36, 0.8]); ctx.beginPath(); ctx.moveTo(c1[0], c1[1]); ctx.lineTo(d1[0], d1[1]); ctx.stroke(); }, // schouderkruis
    kopTekening(ctx, KT) { vul(ctx, [[0.3, 0.12], [0.5, 0.1], [0.5, -0.1], [0.28, -0.12]].map(KT), '#E6E0D4'); } }); })();
const MUILEZEL = (() => { const p = { H: 130, B: 1.02, hb: 0.49, poll: [0.75, 1.28], kam: 0.025, dik: 1.0 }; const sk = paardSkelet(p);
  return Object.assign({ voet: _hoef }, sk, p, { kleur: '#6E4E3A', verK: '#563C2C', pootK: '#6E4E3A', hoefK: '#2A2420', kopK: '#6E4E3A', iris: '#2A1A10', pupil: 'liggend', neusK: '#2E2420', oogRand: '#B89C84',
    kop: { l: 0.42, ds: 0.082, dm: 0.045, mr: 0.3, hoek: 0.88, op: [0.73, 1.25], oog: [0.09, 0.038], oogR: 0.012, vorm: _paardKop(0.42, 0, 0.025).map(([a1, b1]) => [a1, b1 * 1.12]) },
    staart: _staartHaar('#2E241E', 0.55, 0.7), manen: _manen('#2E241E', 0.045, 0), oor: _oorPaard('#6E4E3A', '#3A2A20', 0.18, 0.04),
    tekening(ctx, T) { vul(ctx, [[-0.45, 0.6], [0.0, 0.48], [0.35, 0.53], [0.3, 0.6], [-0.2, 0.62]].map(T), '#9C7A60'); },
    kopTekening(ctx, KT) { vul(ctx, [[0.3, 0.12], [0.5, 0.1], [0.5, -0.1], [0.28, -0.12]].map(KT), '#B89C84'); } }); })();
function paard(ctx, x, y, s, o = {}) { return viervoeter(ctx, x, y, s, PAARD, o); }
function ezel(ctx, x, y, s, o = {}) { return viervoeter(ctx, x, y, s, EZEL, o); }
function muilezel(ctx, x, y, s, o = {}) { return viervoeter(ctx, x, y, s, MUILEZEL, o); }

// ===== CICHLIDEN uit het Victoriameer: Pundamilia (zijaanzicht) =====
// Recept: ±10–12 cm, zijdelings afgeplat baarsachtig lijf (hoogte ±0,35 × lengte), lange rugvin met stekelstralen voor en zachte stralen achter, ronde staartvin,
// aarsvin met eivlekken (geel), borstvin achter de kieuwdeksel, groot oog hoog in de kop met gouden iris. Mannetje P. pundamilia: blauwgrijs met 5–6 donkere dwarsbanden en zwarte borst;
// mannetje P. nyererei: rode rug en rugvin, geel-oranje flanken, donkere banden; vrouwtje van beide: geelbruin, onopvallend. Anker = midden van het lijf; s = 1 → 1 px per mm.
function cichlide(ctx, x, y, s = 1, o = {}) { const { vorm = 'blauw', kijk = 1, a = 1, rot = 0 } = o; _bd(ctx, x, y, s, kijk, a, rot);
  const K = vorm === 'blauw' ? { lijf: '#7FA6C4', rug: '#5A84A8', buik: '#B8CCDA', band: '#3A4E66', vin: '#6E94B4', borst: '#2A3442' }
    : vorm === 'rood' ? { lijf: '#E0A84A', rug: '#C8503A', buik: '#E8C470', band: '#7A3A2A', vin: '#C8503A', borst: '#5A3A2A' }
    : { lijf: '#B8A27A', rug: '#8E7A58', buik: '#D4C29C', band: '#8E7A58', vin: '#A8936C', borst: '#B8A27A' };
  const L = 110, hgt = 38;
  const lijf = [[-L / 2, 0], [-L * 0.38, -hgt * 0.42], [-L * 0.1, -hgt * 0.62], [L * 0.2, -hgt * 0.55], [L * 0.42, -hgt * 0.25], [L * 0.52, -2], [L * 0.5, 6], [L * 0.38, hgt * 0.32], [L * 0.1, hgt * 0.48], [-L * 0.25, hgt * 0.38], [-L * 0.42, hgt * 0.15]];
  // vinnen achter het lijf
  vul(ctx, [[-L * 0.42, -6], [-L * 0.72, -hgt * 0.5], [-L * 0.78, 0], [-L * 0.72, hgt * 0.5], [-L * 0.42, 6]], K.vin); // staartvin (rond)
  ctx.strokeStyle = _dk(K.vin, 0.2); ctx.lineWidth = 0.8; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(-L * 0.45, i * 1.5); ctx.lineTo(-L * 0.74, i * hgt * 0.13); ctx.stroke(); }
  vul(ctx, [[L * 0.3, -hgt * 0.4], [L * 0.2, -hgt * 0.95], [-L * 0.1, -hgt * 1.0], [-L * 0.38, -hgt * 0.95], [-L * 0.5, -hgt * 0.55], [-L * 0.35, -hgt * 0.4]], K.vin); // rugvin
  ctx.strokeStyle = _dk(K.vin, 0.25); for (let i = 0; i < 10; i++) { const u = i / 9; ctx.beginPath(); ctx.moveTo(lerp(L * 0.28, -L * 0.38, u), -hgt * 0.45); ctx.lineTo(lerp(L * 0.24, -L * 0.42, u), -hgt * (0.9 + 0.08 * Math.sin(u * 3))); ctx.stroke(); }
  vul(ctx, [[-L * 0.05, hgt * 0.42], [-L * 0.2, hgt * 0.85], [-L * 0.42, hgt * 0.62], [-L * 0.38, hgt * 0.3]], K.vin); // aarsvin
  for (const [ex, ey] of [[-L * 0.26, hgt * 0.62], [-L * 0.33, hgt * 0.55]]) circ(ctx, ex, ey, 2.8, '#E8C94A', '#B8962E', 0.8); // eivlekken
  vul(ctx, [[L * 0.18, hgt * 0.42], [L * 0.1, hgt * 0.85], [L * 0.03, hgt * 0.45]], K.vin); // buikvin
  vul(ctx, lijf, K.lijf);
  binnen(ctx, lijf, () => { vul(ctx, [[-L * 0.6, -hgt], [L * 0.6, -hgt], [L * 0.6, -hgt * 0.15], [-L * 0.6, -hgt * 0.05]], K.rug); vul(ctx, [[-L * 0.6, hgt * 0.15], [L * 0.6, hgt * 0.05], [L * 0.6, hgt], [-L * 0.6, hgt]], K.buik);
    if (vorm !== 'vrouw') vul(ctx, [[L * 0.4, 0], [L * 0.2, hgt * 0.2], [L * 0.05, hgt * 0.6], [L * 0.3, hgt * 0.6]], K.borst);
    ctx.fillStyle = rgba(K.band, vorm === 'vrouw' ? 0.25 : 0.55); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(L * 0.22 - i * L * 0.12, 0, 3.4, hgt * 0.7, 0.1, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = 0.8; for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-L * 0.35 + i * L * 0.075 + (r % 2) * 3, -hgt * 0.3 + r * hgt * 0.2, 3, 0.3, 2.8); ctx.stroke(); } }); // schubben langs de rand
  ctx.strokeStyle = _dk(K.lijf, 0.3); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(L * 0.3, -hgt * 0.35); ctx.quadraticCurveTo(L * 0.22, 0, L * 0.3, hgt * 0.3); ctx.stroke(); // kieuwdeksel
  vul(ctx, [[L * 0.24, 2], [L * 0.04, -4], [L * 0.02, 6], [L * 0.22, 7]], rgba(K.vin, 0.8)); // borstvin
  dierOog(ctx, L * 0.38, -hgt * 0.16, 5.5, '#C9A030', { pupil: 'rond' });
  ctx.strokeStyle = _dk(K.lijf, 0.45); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(L * 0.52, 2); ctx.lineTo(L * 0.46, 4); ctx.stroke(); // bek
  ctx.restore(); }

// ===== KAART MET BARRIÈRE (Schema) =====
// eiland/land als vlak; een rivier (C.water) die van boven naar beneden snijdt; o.rivier 0..1 = breedte; o.stippen = [[x, y, kleur], ...] in 0..1 van de kaart
function kaartBarriere(ctx, x, y, w, h, o = {}) { const { rivier = 1, a = 1, stippen = [], soort = 'rivier' } = o; ctx.save(); ctx.globalAlpha *= a;
  const land = [[x, y + h * 0.15], [x + w * 0.2, y], [x + w * 0.55, y + h * 0.05], [x + w * 0.85, y], [x + w, y + h * 0.25], [x + w * 0.95, y + h * 0.7], [x + w * 0.75, y + h], [x + w * 0.35, y + h * 0.95], [x + w * 0.05, y + h * 0.8]];
  vul(ctx, land, '#2F4A3A', '#5E7A66', 2.5);
  if (rivier > 0) { ctx.save(); zacht(ctx, land); ctx.clip(); const rw = 10 + 50 * rivier;
    if (soort === 'rivier') { const P = []; for (let i = 0; i <= 12; i++) { const u = i / 12; P.push([x + w * 0.5 + Math.sin(u * 7) * w * 0.05, y - 10 + u * (h + 20)]); } lijn(ctx, P, C.water, rw); lijn(ctx, P, _lt(C.water, 0.3), 2); }
    else { // bergketen
      for (let i = 0; i < 7; i++) { const mx = x + w * 0.5 + (i % 2 ? 38 : -30) + Math.sin(i) * 10, my = y + h * (0.08 + i * 0.14); ctx.beginPath(); ctx.moveTo(mx - 50 * rivier - 20, my + 40); ctx.lineTo(mx, my - 30 * rivier - 10); ctx.lineTo(mx + 50 * rivier + 20, my + 40); ctx.closePath(); ctx.fillStyle = C.berg; ctx.fill(); ctx.beginPath(); ctx.moveTo(mx - 12, my - 10 * rivier); ctx.lineTo(mx, my - 30 * rivier - 10); ctx.lineTo(mx + 12, my - 10 * rivier); ctx.closePath(); ctx.fillStyle = C.bergTop; ctx.fill(); } }
    ctx.restore(); }
  for (const [sx, sy, k, al = 1] of stippen) populatieStip(ctx, x + sx * w, y + sy * h, 11, k, al);
  ctx.restore(); }

// ===== CHROMOSOMEN BIJ DE MEIOSE VAN EEN MUILEZEL (Schema) =====
// Elk chromosoom als een staafje met centromeer; paardenset in licht paars, ezelset in donker paars. paren = lijst [lengte1, lengte2|null, past(bool)]
function chromosoom(ctx, x, y, l, kleur, a = 1) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 7, y - l / 2, 14, l, 7); shape(ctx, kleur, _lt(kleur, 0.3), 1.5); ctx.fillStyle = C.bgSchema; ctx.fillRect(x - 7, y - l * 0.12, 3, 6); ctx.fillRect(x + 4, y - l * 0.12, 3, 6); ctx.restore(); }

// ===== Kleine dieren voor de barrièrescène en de kikkervraag (zijaanzicht, s = px per cm) =====
// Bosmuis: lijf ±9 cm, staart ±9 cm, grote oren en ogen (echt: muizen hebben relatief grote ogen); vogel (zwaluw) in vlucht ±18 cm, vleugels lang en spits;
// tuinslak: huis ±3 cm met spiraal, voet met twee paar tentakels (ogen op de lange); bruine kikker ±8 cm, zittend, lange achterpoten gevouwen, trommelvlies achter het oog.
function _oogK(ctx, x, y, r, iris, o) { const m = ctx.getTransform(), sx = Math.hypot(m.a, m.b); const px = m.a * x + m.c * y + m.e, py = m.b * x + m.d * y + m.f; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); dierOog(ctx, px, py, r * sx, iris, o); ctx.restore(); }
function muis(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; _bd(ctx, x, y, s, kijk, a);
  ctx.strokeStyle = '#9C7A5E'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(-4, -2); ctx.quadraticCurveTo(-10, 0, -14, -1.5); ctx.stroke(); // staart
  vul(ctx, [[-5, -0.5], [-4.6, -3.4], [-1, -4.6], [2.6, -4], [4.6, -2.6], [5.4, -1.2], [3, -0.2], [-2, 0]], '#9C7A5E'); vul(ctx, [[-3.5, -0.4], [0, -1.6], [3, -0.6]], '#D8C8B0');
  for (const px of [-3, 2.4]) { ctx.strokeStyle = '#C8A890'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(px, -0.6); ctx.lineTo(px + 0.4, 0); ctx.stroke(); }
  circ(ctx, 2.2, -4.6, 1.3, '#B88E78'); circ(ctx, 2.2, -4.6, 0.8, '#D8A898'); _oogK(ctx, 3.6, -2.9, 0.55, '#120C08', { pupil: 'vol' }); circ(ctx, 5.4, -1.3, 0.3, '#3A2420'); ctx.restore(); }
function zwaluw(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; _bd(ctx, x, y, s, kijk, a);
  vul(ctx, [[-1, -0.4], [-6, -6], [-12, -10], [-4, -3]], '#5A72A0'); vul(ctx, [[-9, 0], [-12, 1.4], [-14.5, 2.6], [-11, -0.5], [-14, -1.6], [-9, -1]], '#5A72A0');
  vul(ctx, [[-9, 0.2], [-5, -1.6], [2, -1.6], [5, -0.6], [3.6, 0.6], [-3, 1.2]], '#5A72A0'); vul(ctx, [[-4, 0.8], [1, 0.1], [3, 0.7], [-1, 1.4]], '#E6DCCB'); vul(ctx, [[2.5, -0.1], [4.6, -0.5], [3.6, 0.5]], '#B8503A');
  vul(ctx, [[0, -0.8], [-3, 4], [-9, 9], [-1, 1.4]], '#4A6290'); _oogK(ctx, 3, -0.9, 0.45, '#0A0A0A', { pupil: 'vol' }); ctx.restore(); }
function slak(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; _bd(ctx, x, y, s, kijk, a);
  vul(ctx, [[-3.6, 0], [-2, -0.9], [2.4, -1], [3.6, -2.2], [4.4, -2], [4.6, -0.6], [3.6, 0]], '#A8927A');
  ctx.strokeStyle = '#A8927A'; ctx.lineWidth = 0.35; for (const [dx, h] of [[0.2, 1.9], [-0.4, 1.4]]) { ctx.beginPath(); ctx.moveTo(4 + dx, -2); ctx.lineTo(4.6 + dx + h * 0.3, -2 - h); ctx.stroke(); circ(ctx, 4.6 + dx + h * 0.3, -2 - h, 0.22, '#3A2A20'); }
  circ(ctx, -0.6, -2.4, 2.2, '#C9A35C', '#8C6A3A', 0.25); ctx.strokeStyle = '#8C6A3A'; ctx.lineWidth = 0.3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const t = i / 40 * 6.283 * 1.8, r = 2 * (1 - i / 44); const px = -0.6 + Math.cos(t) * r, py = -2.4 + Math.sin(t) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
function kikker(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1, kleur = '#7E8A4E' } = o; _bd(ctx, x, y, s, kijk, a); const d = _dk(kleur, 0.25);
  vul(ctx, [[-4.2, -0.4], [-1, -0.8], [-2.6, -2.2], [-4.2, -2.6]], d); // gevouwen achterpoot (verre kant)
  vul(ctx, [[-4.4, -1.6], [-3.6, -3.8], [-0.5, -4.6], [2.6, -4.2], [4.2, -3.2], [4.4, -2.4], [2.6, -1.6], [0, -1], [-3, -0.8]], kleur);
  vul(ctx, [[-3.8, -1.2], [-1.4, -3], [0.4, -2], [-0.6, -0.6], [1, -0.4], [1.6, 0], [-2.6, 0], [-4.2, -0.6]], d); // dij + onderbeen gevouwen
  vul(ctx, [[1.6, -2], [2.2, -0.6], [2.8, 0], [2, 0], [1.4, -0.6], [1, -1.8]], kleur); // voorpoot vast aan de borst
  vul(ctx, [[-3, -3.6], [0, -4.4], [2.4, -4], [0, -3.8]], _lt(kleur, 0.2)); circ(ctx, 1.2, -3.2, 0.9, '#5A3A28'); // trommelvlies
  _oogK(ctx, 2.6, -4.3, 0.7, '#B8902E', { pupil: 'liggend' }); ctx.restore(); }

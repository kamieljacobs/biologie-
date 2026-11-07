// Evolutie v2 · film 4 De mens als selectiefactor — film-eigen tekeningen (22 okt 2026)
// Alle dieren in centimeters: s = 1 → 1 px per cm, zodat dieren op dezelfde s ook onderling op schaal staan.
// Anker (x, y) = midden onder het dier op de grond; kop naar rechts (o.kijk = -1 spiegelt).

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

// ===== HONDACHTIGEN: één skelet, rassen via parameters =====
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


// ===== BACTERIËN (Micro) =====
// Recept: E. coli is een staafje van ±2 µm lang en ±0,8 µm breed (verhouding ±2,5:1), celwand + membraan als dubbele lichte rand,
// DNA (nucleoïde) als losse kluwen draad in het midden (paars), plasmiden als kleine ringen (paars) met het resistentiegen (oker = allel 2).
// Gevoelig = teal (allel 1), resistent = oker (allel 2). Gedood = 35% en een open, gescheurde wand.
function bacterie(ctx, x, y, len, rot = 0, o = {}) {
  const { type = 'gevoelig', plasmide = 0, dood = 0, deling = 0, a = 1, focus = false, seed = 1, zweep = true } = o;
  const w = len * 0.4, kl = type === 'resistent' ? EVO.a2 : EVO.a1;
  ctx.save(); ctx.globalAlpha *= a * (dood ? 0.4 : 1); ctx.translate(x, y); ctx.rotate(rot);
  // zweepdraden (flagellen): dunne golvende lijnen vanaf de wand
  if (zweep && !dood) { ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = Math.max(1, len / 140); for (let i = 0; i < 3; i++) { const sx = -len / 2 + w * 0.3, sy = (i - 1) * w * 0.25; ctx.beginPath(); ctx.moveTo(sx, sy); for (let k = 1; k <= 12; k++) ctx.lineTo(sx - k * len * 0.05, sy + Math.sin(k * 0.9 + i + seed) * w * 0.12 + (i - 1) * k * w * 0.02); ctx.stroke(); } }
  const vorm = () => { if (deling > 0) { const k = 1 - deling * 0.7; ctx.beginPath(); ctx.moveTo(-len / 2 + w / 2, -w / 2); ctx.quadraticCurveTo(-len * 0.12, -w / 2, 0, -w / 2 * k); ctx.quadraticCurveTo(len * 0.12, -w / 2, len / 2 - w / 2, -w / 2); ctx.arc(len / 2 - w / 2, 0, w / 2, -1.5708, 1.5708); ctx.quadraticCurveTo(len * 0.12, w / 2, 0, w / 2 * k); ctx.quadraticCurveTo(-len * 0.12, w / 2, -len / 2 + w / 2, w / 2); ctx.arc(-len / 2 + w / 2, 0, w / 2, 1.5708, 4.712); ctx.closePath(); } else roundRect(ctx, -len / 2, -w / 2, len, w, w / 2); };
  vorm(); ctx.fillStyle = rgba(kl, 0.28); ctx.fill();
  if (dood) { ctx.setLineDash([len * 0.12, len * 0.06]); }
  ctx.strokeStyle = _lt(kl, 0.2); ctx.lineWidth = Math.max(1.5, len / 60); vorm(); ctx.stroke();
  ctx.save(); ctx.scale((len - w * 0.18) / len, (w - w * 0.18) / w); ctx.lineWidth = Math.max(1, len / 110); vorm(); ctx.stroke(); ctx.restore(); ctx.setLineDash([]);
  if (len > 60) { // binnenkant alleen als hij groot genoeg is
    ctx.save(); vorm(); ctx.clip();
    for (let i = 0; i < Math.round(len / 7); i++) circ(ctx, (hash(i * 7 + seed) - 0.5) * len * 0.85, (hash(i * 11 + seed) - 0.5) * w * 0.7, Math.max(1.2, len / 120), rgba(C.ribo, 0.45)); // ribosomen
    ctx.strokeStyle = rgba(C.kernR, 0.8); ctx.lineWidth = Math.max(1.2, len / 130); // nucleoïde: losse, zacht kronkelende draad (geen zigzag)
    const nc = deling > 0.5 ? [-len * 0.22, len * 0.22] : [0];
    for (const cx of nc) { const P = []; for (let k = 0; k <= 18; k++) { const t = k / 18 * 6.283; P.push([cx + Math.cos(t * 2 + seed) * len * 0.11 + Math.sin(t * 3) * len * 0.04, Math.sin(t * 3 + seed) * w * 0.2]); } lijn(ctx, P, rgba(C.kernR, 0.8), Math.max(1.2, len / 130), true); }
    ctx.restore();
  }
  for (let i = 0; i < plasmide; i++) { const px = len * (0.24 - (i % 2) * 0.5) + (i > 1 ? len * 0.1 : 0), py = (i % 2 ? 1 : -1) * w * 0.17; plasmideRing(ctx, px, py, Math.max(5, len * 0.07), { gen: true }); }
  if (focus) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.save(); ctx.scale(1 + 16 / len, 1 + 16 / w); vorm(); ctx.restore(); ctx.stroke(); }
  ctx.restore();
}
function plasmideRing(ctx, x, y, r, o = {}) { const { gen = true, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.22); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
  if (gen) { ctx.strokeStyle = EVO.a2; ctx.lineWidth = Math.max(2.5, r * 0.42); ctx.beginPath(); ctx.arc(x, y, r, -0.7, 0.9); ctx.stroke(); } ctx.restore(); }
// geslachtsdraad (pilus) tussen twee bacteriën; u = waar het plasmide-kopie onderweg is (0..1)
function pilus(ctx, x1, y1, x2, y2, u = -1, r = 10) { ctx.save(); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 18, x2, y2); ctx.stroke();
  if (u >= 0) { const t = u, mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 18; const px = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t * t * x2, py = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t * t * y2; plasmideRing(ctx, px, py, r); } ctx.restore(); }
// antibioticum-molecuul (bètalactam: vierring aan vijfring), koraal; r ≈ halve breedte
function antibioticum(ctx, x, y, r = 10, rot = 0, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = C.koraal; ctx.fillStyle = rgba(C.koraal, 0.35); ctx.lineWidth = Math.max(1.5, r * 0.2);
  ctx.beginPath(); ctx.rect(-r, -r * 0.5, r, r); ctx.fill(); ctx.stroke(); ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566 + 0.31; const px = r * 0.62 + Math.cos(an) * r * 0.62, py = Math.sin(an) * r * 0.62; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r, -r * 0.5); ctx.lineTo(-r * 1.5, -r * 0.9); ctx.stroke(); ctx.restore(); }
// griepvirus: bolletje (±100 nm) met uitsteeksels loodrecht op de envelop
function griepVirus(ctx, x, y, r, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C9B896'; ctx.lineWidth = Math.max(1.2, r * 0.07);
  for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.28, y + Math.sin(an) * r * 1.28); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3, r * 0.07, '#C9B896'); }
  circ(ctx, x, y, r, '#5A5446', '#C9B896', Math.max(1.5, r * 0.08)); ctx.strokeStyle = rgba(C.kernR, 0.8); ctx.lineWidth = Math.max(1, r * 0.06); for (let k = 0; k < 8; k++) { const an = k * 0.785; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.2, y + Math.sin(an) * r * 0.2); ctx.quadraticCurveTo(x + Math.cos(an + 0.4) * r * 0.5, y + Math.sin(an + 0.4) * r * 0.5, x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6); ctx.stroke(); } ctx.restore(); }
// petrischaal van boven met kolonies (Schema-labbibliotheek)
function petrischaal(ctx, x, y, r, kolonies = [], o = {}) { const { a = 1, schijfje = false } = o; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#C9B896', 0.12), C.er, 3); circ(ctx, x, y, r - 10, null, rgba(C.er, 0.5), 1.5);
  for (const [kx, ky, kr, k] of kolonies) circ(ctx, x + kx * r, y + ky * r, kr, rgba(k, 0.75), _lt(k, 0.3), 1.5);
  if (schijfje) { circ(ctx, x, y, r * 0.42, rgba(C.koraal, 0.06), rgba(C.koraal, 0.5), 2); circ(ctx, x, y, r * 0.12, '#EDE6D2', '#B8B0A0', 2); } ctx.restore(); }

// ===== KOOL: wilde kool en zijn groenten (Brassica oleracea) =====
// Recept: wilde kool = losse rozet van blauwgroene, gelobde, wasachtige bladeren op een korte stengel, in het tweede jaar een bloeistengel met gele kruisbloemen (kalkkliffen, Kanaalkust).
// Uitvergroot deel: boerenkool = blad · sluitkool/rode kool = eindknop · spruitjes = zijknoppen · koolrabi = stengel · broccoli en bloemkool = bloeiwijze.
const KOOL = { blad: '#7FA88E', bladD: '#5E8A72', nerf: '#B8D0BE', bloem: '#E8C94A' };
function _koolBlad(ctx, x, y, l, w, an, kleur = KOOL.blad, krul = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); const P = []; const N = 14;
  for (let i = 0; i <= N; i++) { const u = i / N, b = Math.sin(u * Math.PI) * w * (1 + 0.18 * Math.sin(u * 18) * (krul ? 1.6 : 0.5)); P.push([u * l, -b]); }
  for (let i = N; i >= 0; i--) { const u = i / N, b = Math.sin(u * Math.PI) * w * 0.85 * (1 + 0.18 * Math.sin(u * 18 + 1) * (krul ? 1.6 : 0.5)); P.push([u * l, b]); }
  vul(ctx, P, kleur, _dk(kleur, 0.2), 1.5); ctx.strokeStyle = KOOL.nerf; ctx.lineWidth = Math.max(1.2, w * 0.06); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(l * 0.95, 0); ctx.stroke();
  for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(l * k / 5.5, 0); ctx.lineTo(l * k / 5.5 + l * 0.12, -w * 0.6); ctx.moveTo(l * k / 5.5, 0); ctx.lineTo(l * k / 5.5 + l * 0.12, w * 0.55); ctx.stroke(); } ctx.restore(); }
function _kruisbloem(ctx, x, y, r) { for (let i = 0; i < 4; i++) { const an = i * 1.5708 + 0.785; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.55, r * 0.38, an, 0, 6.283); ctx.fillStyle = KOOL.bloem; ctx.fill(); } circ(ctx, x, y, r * 0.25, '#B8962E'); }
// kool(ctx, soort, x, y, s): anker = grond onder de plant; s = 1 → ± 1 px per cm
function kool(ctx, soort, x, y, s = 1, o = {}) { const { a = 1, nadruk = false } = o; _bd(ctx, x, y, s, 1, a);
  const steel = (h, d = 3, kleur = '#8FAE96') => { ctx.fillStyle = kleur; roundRect(ctx, -d / 2, -h, d, h, d / 2); ctx.fill(); };
  if (soort === 'wild') { steel(62, 2.5, '#7FA08A'); ctx.strokeStyle = '#7FA08A'; ctx.lineWidth = 1.2; // bloeitros: elke kruisbloem op een eigen steeltje aan de stengel
    for (let i = 0; i < 8; i++) { const yy = -40 - i * 4.2, k = i % 2 ? 1 : -1, bx = k * (7 - i * 0.5), by = yy - 4; ctx.beginPath(); ctx.moveTo(0, yy + 3); ctx.quadraticCurveTo(k * 3, yy, bx, by); ctx.stroke(); _kruisbloem(ctx, bx, by, 3); }
    for (let i = 0; i < 5; i++) _koolBlad(ctx, 0, -3 - i * 2, 26 - i * 2, 11, -Math.PI / 2 + (i - 2) * 0.62, i % 2 ? '#8DB3A4' : '#79A396'); }
  else if (soort === 'boerenkool') { steel(55, 4); for (let i = 0; i < 9; i++) _koolBlad(ctx, 0, -10 - i * 5.5, 30 - i * 1.4, 8, -Math.PI / 2 + (i % 2 ? 1 : -1) * (0.5 + 0.08 * i), i % 2 ? '#4F7A5E' : '#5E8A6A', 1); }
  else if (soort === 'sluitkool' || soort === 'rodekool') { const k = soort === 'rodekool' ? ['#7A5A8C', '#8E6EA0', '#B8A0C8'] : ['#9CC4A6', '#B4D4BA', '#DCEBDD'];
    for (const sg of [-1, 1]) _koolBlad(ctx, sg * 4, -8, 30, 13, sg > 0 ? -0.35 : Math.PI + 0.35, k[0]); ctx.beginPath(); ctx.ellipse(0, -22, 19, 17, 0, 0, 6.283); ctx.fillStyle = k[1]; ctx.fill(); ctx.strokeStyle = k[2]; ctx.lineWidth = 1.4;
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-3 + i * 2, -22, 17 - i * 4, 15 - i * 3.5, 0.2, -2.6, 0.6); ctx.stroke(); } }
  else if (soort === 'spruitjes') { steel(78, 5, '#8FAE96'); for (let i = 0; i < 12; i++) { const yy = -10 - i * 5.5; const sx = (i % 2 ? 1 : -1) * 4.6; ctx.beginPath(); ctx.ellipse(sx, yy, 3.3, 3, 0, 0, 6.283); ctx.fillStyle = '#8FC08E'; ctx.fill(); ctx.strokeStyle = '#5E8A6A'; ctx.lineWidth = 0.8; ctx.stroke(); }
    for (let i = 0; i < 6; i++) _koolBlad(ctx, 0, -78, 20, 7, -Math.PI / 2 + (i - 2.5) * 0.5, '#6E9A7C'); }
  else if (soort === 'koolrabi') { for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.45; const bx = Math.cos(an) * 10, by = -14 + Math.sin(an) * 10; ctx.strokeStyle = '#A8C8A8'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(an) * 10, by + Math.sin(an) * 14); ctx.stroke(); _koolBlad(ctx, bx + Math.cos(an) * 10, by + Math.sin(an) * 14, 17, 6, an, '#7FA88E'); }
    ctx.beginPath(); ctx.ellipse(0, -13, 12, 11.5, 0, 0, 6.283); ctx.fillStyle = '#C8DDB0'; ctx.fill(); ctx.strokeStyle = '#9AB888'; ctx.lineWidth = 1.2; ctx.stroke(); steel(3, 2, '#9AB888'); }
  else if (soort === 'broccoli') { steel(26, 7, '#8FB896'); for (let i = 0; i < 4; i++) _koolBlad(ctx, 0, -10, 20, 6, -Math.PI / 2 + (i - 1.5) * 0.9, '#6E9A7C');
    for (let i = 0; i < 26; i++) { const an = hash(i * 3) * 6.283, d = Math.sqrt(hash(i * 3 + 1)); circ(ctx, Math.cos(an) * d * 13, -32 + Math.sin(an) * d * 7, 4.2, i % 3 ? '#4E7E58' : '#5E9068', '#3E6A48', 0.8); } }
  else if (soort === 'bloemkool') { for (const sg of [-1, 1]) for (let i = 0; i < 2; i++) _koolBlad(ctx, sg * 6, -6, 28 - i * 4, 11, sg > 0 ? -0.5 - i * 0.4 : Math.PI + 0.5 + i * 0.4, '#7FA88E');
    for (let i = 0; i < 24; i++) { const an = hash(i * 5) * 3.14 + 3.14, d = Math.sqrt(hash(i * 5 + 1)); circ(ctx, Math.cos(an) * d * 13, -16 + Math.sin(an) * d * 11, 4, '#EDE6D2', '#C9C0A8', 0.8); } }
  if (nadruk) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / s; ctx.setLineDash([4 / s, 3 / s]); ctx.beginPath(); ctx.ellipse(nadruk[0], nadruk[1], nadruk[2], nadruk[3], 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }

// ===== GENENBANK (Schema): rek met zaadmonsters in de vriezer =====
// CGN Wageningen bewaart zaad bij −20 °C in afgesloten zakjes/potten; reservekopie in de Svalbard Global Seed Vault.
function zaadPotje(ctx, x, y, h, kleur, label) { roundRect(ctx, x - h * 0.32, y - h, h * 0.64, h, h * 0.1); shape(ctx, rgba(C.fill, 0.9), EVO.glas, 2); roundRect(ctx, x - h * 0.36, y - h - h * 0.12, h * 0.72, h * 0.14, 4); shape(ctx, '#3A4A66', C.line, 1.5);
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x + (hash(i + h) - 0.5) * h * 0.44, y - h * 0.12 - (i % 3) * h * 0.13 - Math.floor(i / 3) * h * 0.04, h * 0.07, h * 0.045, hash(i) * 3, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); }
  if (label) { roundRect(ctx, x - h * 0.26, y - h * 0.78, h * 0.52, h * 0.22, 3); ctx.fillStyle = '#EDE6D2'; ctx.fill(); } }
function genenbankRek(ctx, x, y, w, h, o = {}) { const { rijen = 3, per = 6, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.bgMicro, 0.6), C.line, 2);
  const kleuren = ['#C9A35C', '#8C6A3A', '#D8C08A', '#6E5A3E', '#B08A5C', '#E0D2A8'];
  for (let r = 0; r < rijen; r++) { const yy = y + (r + 1) * h / rijen - 16; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 14, yy + 4); ctx.lineTo(x + w - 14, yy + 4); ctx.stroke();
    for (let i = 0; i < per; i++) zaadPotje(ctx, x + 50 + i * (w - 100) / (per - 1), yy, h / rijen * 0.62, kleuren[(i + r * 2) % 6], true); }
  // ijskristalletjes in de hoek als 'vriezer'
  ctx.strokeStyle = C.er; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const cx = x + w - 40, cy = y + 34; ctx.beginPath(); ctx.moveTo(cx + Math.cos(k * 1.047) * 14, cy + Math.sin(k * 1.047) * 14); ctx.lineTo(cx - Math.cos(k * 1.047) * 14, cy - Math.sin(k * 1.047) * 14); ctx.stroke(); }
  ctx.restore(); }

// ===== Schema-iconen: ziekenhuis, apotheekdoosje =====
function ziekenhuisIcoon(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -150, 220, 150, 12); shape(ctx, rgba(C.fill, 0.9), C.line, 2.5);
  roundRect(ctx, -40, -210, 80, 70, 8); shape(ctx, rgba(C.fill, 0.9), C.line, 2.5); ctx.fillStyle = C.koraal; ctx.fillRect(-8, -198, 16, 46); ctx.fillRect(-23, -183, 46, 16);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { roundRect(ctx, -90 + i * 48, -128 + r * 50, 32, 30, 4); ctx.fillStyle = rgba(C.er, 0.35); ctx.fill(); } roundRect(ctx, -22, -50, 44, 50, 4); ctx.fillStyle = rgba(C.er, 0.5); ctx.fill(); ctx.restore(); }
function medicijnDoosje(ctx, x, y, w, kleur = C.koraal, tekstje = 'antibioticum') { roundRect(ctx, x - w / 2, y - w * 0.55, w, w * 0.55, 6); shape(ctx, '#EDE6D2', '#B8B0A0', 2); ctx.fillStyle = kleur; ctx.fillRect(x - w / 2, y - w * 0.55 + w * 0.08, w, w * 0.12);
  if (tekstje) { ctx.save(); ctx.font = fTekst(Math.max(14, w * 0.11), 700); ctx.fillStyle = '#3A3A3A'; ctx.textAlign = 'center'; ctx.fillText(tekstje, x, y - w * 0.15); ctx.restore(); } }

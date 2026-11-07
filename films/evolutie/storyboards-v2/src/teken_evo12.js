// Evolutie v2 — extra film 12 'Hoe werden we mens?' — film-eigen tekeningen (23 okt 2026). Voorvoegsel e12 tegen botsingen.
// Laad na lib_evo en pop_rept_chimp: python3 render.py e12_land,pop_rept_chimp,teken_evo12,sb12 SB12
//
// ---- Mensachtigen in zijaanzicht (castboekstijl: vlak, gezicht met oog en mond, huidskleur, geen omlijning) ----
// Recept (C9): verhoudingen als fractie van de lichaamslengte H, uit bronnen:
//  sapiens   schouder 0,818 · heup 0,53 · knie 0,285 · bovenarm 0,186 · onderarm 0,146 · hand 0,108 · hoofd 0,13 (Drillis & Contini, via Winter; Chaffin)
//  neanderthaler man ±165 cm / vrouw ±155 cm, gedrongen, brede diepe borstkas, korte onderarmen en onderbenen (NHM 'Who were the Neanderthals'; Wikipedia Neanderthal anatomy);
//            schedel lang en laag, wenkbrauwboog, knobbel achteraan (occipital bun), grote neus, vooruitstekend middengezicht, geen kin (Bryn Mawr lab; NHM)
//  erectus   Turkana-jongen ±160 cm bij ±9–12 jaar; romp- en beenverhoudingen als de moderne mens (Live Science; talkorigins); lage schedel, wenkbrauwboog, geen kin
//  afarensis Lucy ±107 cm, 28 kg; opperarm/dijbeen 84,6 % (mens 71,8, chimp ±100) (talkorigins Lucy); lange armen, kromme vingers, dijbeen schuin naar de knie,
//            kleine hersenpan en vooruitstekende snuit (Australian Museum). Lichaamsbeharing en huidskleur = reconstructie.
//  floresiensis LB1 ±106 cm, hersenen ±380 cm³ (Brown e.a. 2004 via alchetron); lange voeten (±20 cm), geen kin.
// Bekende fouten: neanderthaler voorovergebogen met gebogen knieën (Boule 1911; weerlegd door Straus & Cave 1957); 'holbewoner' met knots; mensachtigen als één rij (mars).
const E12_SOORT = {
  sapiens:      { H: 172, hoofd: 0.13, sch: 0.818, heup: 0.53, knie: 0.285, arm1: 0.186, arm2: 0.146, hand: 0.10, voet: 0.15, borst: 1.0, buik: 1.0, schedel: 'sapiens',
                  huid: '#8A5E44', haar: '#1E1612', wenk: '#1E1612', kleed: '#9A7A56', kleedD: '#7E6244', boven: true },
  neanderthaler:{ H: 165, hoofd: 0.14, sch: 0.80, heup: 0.505, knie: 0.275, arm1: 0.19, arm2: 0.128, hand: 0.10, voet: 0.15, borst: 1.42, buik: 1.25, schedel: 'neanderthaler',
                  huid: '#B98C6A', haar: '#5A3A26', wenk: '#4A2E1E', kleed: '#8C6A4A', kleedD: '#735638', baard: true, boven: true },
  neanderthalerV:{ H: 155, hoofd: 0.145, sch: 0.80, heup: 0.505, knie: 0.275, arm1: 0.19, arm2: 0.128, hand: 0.10, voet: 0.15, borst: 1.36, buik: 1.2, schedel: 'neanderthaler',
                  huid: '#B48866', haar: '#6A4430', wenk: '#5A3A26', kleed: '#9A7650', kleedD: '#7E603F', lang: true, boven: true },
  erectus:      { H: 175, hoofd: 0.125, sch: 0.815, heup: 0.535, knie: 0.29, arm1: 0.185, arm2: 0.142, hand: 0.10, voet: 0.15, borst: 0.98, buik: 0.95, schedel: 'erectus',
                  huid: '#6A4632', haar: '#18120E', wenk: '#18120E', kleed: '#8C6A48', kleedD: '#735638' },
  afarensis:    { H: 107, hoofd: 0.19, sch: 0.76, heup: 0.48, knie: 0.255, arm1: 0.192, arm2: 0.17, hand: 0.115, voet: 0.16, borst: 1.25, buik: 1.35, schedel: 'afarensis',
                  huid: '#7A5A44', haar: '#4E3C2E', wenk: '#2E2219', vacht: true },
  floresiensis: { H: 106, hoofd: 0.16, sch: 0.785, heup: 0.49, knie: 0.26, arm1: 0.195, arm2: 0.15, hand: 0.105, voet: 0.19, borst: 1.15, buik: 1.2, schedel: 'floresiensis',
                  huid: '#7A5440', haar: '#1E1612', wenk: '#1E1612', kleed: '#8C6A48', kleedD: '#735638' }
};
// Profiel van het hoofd (kijkt naar rechts), eenheid u, oorsprong = bovenkant van de nek (bij het oor), y omlaag.
const E12_KOP = {
  sapiens:      { P: [[-0.25, 0.2], [-0.47, -0.12], [-0.42, -0.56], [-0.05, -0.8], [0.3, -0.65], [0.43, -0.36], [0.45, -0.2], [0.42, -0.14], [0.56, 0.02], [0.46, 0.06], [0.47, 0.13], [0.44, 0.17], [0.46, 0.21], [0.43, 0.31], [0.24, 0.34], [0.02, 0.24]],
                  oog: [0.3, -0.12], oor: [-0.1, -0.04], mond: [0.44, 0.17], neus: [0.47, 0.03], hairTop: 0.8 },
  neanderthaler:{ P: [[-0.25, 0.2], [-0.56, 0.0], [-0.66, -0.16], [-0.56, -0.42], [-0.12, -0.64], [0.22, -0.56], [0.44, -0.36], [0.58, -0.27], [0.55, -0.17], [0.52, -0.14], [0.72, 0.03], [0.6, 0.09], [0.62, 0.15], [0.58, 0.19], [0.59, 0.23], [0.5, 0.34], [0.26, 0.37], [0.03, 0.25]],
                  oog: [0.38, -0.12], oor: [-0.12, -0.02], mond: [0.58, 0.19], neus: [0.62, 0.04], torus: [[0.3, -0.34], [0.58, -0.27], [0.55, -0.19], [0.3, -0.24]], hairTop: 0.64 },
  erectus:      { P: [[-0.25, 0.2], [-0.52, -0.02], [-0.56, -0.2], [-0.45, -0.44], [-0.1, -0.6], [0.2, -0.52], [0.4, -0.36], [0.53, -0.27], [0.5, -0.17], [0.47, -0.14], [0.6, 0.02], [0.52, 0.07], [0.56, 0.14], [0.53, 0.19], [0.54, 0.23], [0.47, 0.34], [0.24, 0.37], [0.02, 0.25]],
                  oog: [0.34, -0.12], oor: [-0.12, -0.02], mond: [0.53, 0.19], neus: [0.53, 0.03], torus: [[0.28, -0.33], [0.53, -0.27], [0.5, -0.19], [0.28, -0.24]], hairTop: 0.6 },
  afarensis:    { P: [[-0.22, 0.16], [-0.44, -0.06], [-0.4, -0.38], [-0.05, -0.55], [0.24, -0.46], [0.4, -0.3], [0.42, -0.22], [0.38, -0.17], [0.47, -0.04], [0.64, 0.07], [0.66, 0.13], [0.6, 0.17], [0.6, 0.21], [0.47, 0.32], [0.22, 0.34], [0.0, 0.22]],
                  oog: [0.3, -0.13], oor: [-0.12, -0.04], mond: [0.62, 0.15], neus: [0.5, -0.0], torus: [[0.2, -0.32], [0.42, -0.24], [0.39, -0.18], [0.2, -0.24]], hairTop: 0.55, snuit: true },
  floresiensis: { P: [[-0.24, 0.18], [-0.46, -0.06], [-0.44, -0.4], [-0.08, -0.6], [0.24, -0.5], [0.4, -0.32], [0.46, -0.24], [0.43, -0.16], [0.53, 0.02], [0.46, 0.07], [0.52, 0.14], [0.5, 0.19], [0.5, 0.23], [0.43, 0.33], [0.22, 0.35], [0.01, 0.24]],
                  oog: [0.3, -0.12], oor: [-0.1, -0.03], mond: [0.5, 0.19], neus: [0.5, 0.03], torus: [[0.24, -0.3], [0.46, -0.24], [0.43, -0.18], [0.24, -0.23]], hairTop: 0.6 }
};
function e12Pad(ctx, P, open = false) { zacht(ctx, P, !open); }
function e12Kop(ctx, sk, S, u, o = {}) { // tekent het hoofd in lokale coördinaten (al getransleerd/geroteerd), u = eenheid
  const K = E12_KOP[sk], P = K.P.map(([x, y]) => [x * u, y * u]); const huid = S.huid, ink = _dk(huid, 0.68);
  const Pu = K.P.map(([x, y]) => [x * u * 1.05 - 0.01 * u, y * u * 1.05 - 0.01 * u]);
  if (S.lang) vul(ctx, [[-0.3 * u, -0.3 * u], [-0.62 * u, 0.0], [-0.6 * u, 0.62 * u], [-0.3 * u, 0.7 * u], [-0.12 * u, 0.3 * u]], S.haar); // lang haar achter de nek
  ctx.fillStyle = huid; e12Pad(ctx, P); ctx.fill();
  if (S.vacht) { ctx.save(); e12Pad(ctx, Pu); ctx.clip(); ctx.fillStyle = S.haar; ctx.beginPath(); ctx.moveTo(0.42 * u, -0.9 * u); ctx.lineTo(0.3 * u, -0.3 * u); ctx.quadraticCurveTo(0.12 * u, -0.08 * u, 0.12 * u, 0.12 * u); ctx.quadraticCurveTo(0.1 * u, 0.3 * u, 0.2 * u, 0.45 * u); ctx.lineTo(-1 * u, 0.6 * u); ctx.lineTo(-1 * u, -1 * u); ctx.closePath(); ctx.fill(); ctx.restore(); }
  else { const hl = K.hairTop; ctx.save(); e12Pad(ctx, Pu); ctx.clip(); ctx.fillStyle = S.haar; ctx.beginPath(); // haarlijn: voorhoofd -> slaap -> boven het oor -> nek
    ctx.moveTo(0.6 * u, -1.1 * u); ctx.lineTo(0.5 * u, (-hl + 0.22) * u); ctx.quadraticCurveTo(0.2 * u, (-hl + 0.16) * u, 0.12 * u, -0.22 * u); ctx.quadraticCurveTo(0.02 * u, -0.2 * u, -0.06 * u, -0.2 * u);
    ctx.quadraticCurveTo(-0.24 * u, -0.16 * u, -0.26 * u, 0.06 * u); ctx.lineTo(-0.3 * u, 0.3 * u); ctx.lineTo(-1 * u, 0.4 * u); ctx.lineTo(-1 * u, -1.2 * u); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (K.torus) { vul(ctx, K.torus.map(([x, y]) => [x * u, y * u]), _dk(huid, 0.1)); }
  // oor
  ctx.fillStyle = _dk(huid, 0.14); ctx.beginPath(); ctx.ellipse(K.oor[0] * u, K.oor[1] * u, 0.09 * u, 0.13 * u, 0.15, 0, 6.283); ctx.fill();
  ctx.strokeStyle = _dk(huid, 0.3); ctx.lineWidth = Math.max(1, u * 0.018); ctx.beginPath(); ctx.arc(K.oor[0] * u, K.oor[1] * u, 0.05 * u, -1.2, 1.4); ctx.stroke();
  // haar voor (pony/haarlijn) en baard
  if (S.baard) { vul(ctx, [[-0.02 * u, 0.06 * u], [0.12 * u, 0.36 * u], [0.32 * u, 0.44 * u], [0.5 * u, 0.4 * u], [0.6 * u, 0.25 * u], [0.55 * u, 0.22 * u], [0.46 * u, 0.24 * u], [0.32 * u, 0.2 * u], [0.12 * u, 0.12 * u]], S.haar); }
  // oog: klein wit, donkere iris, lichtpuntje (castboek); wenkbrauw
  const [ox, oy] = [K.oog[0] * u, K.oog[1] * u]; ctx.fillStyle = '#F6F1E8'; ctx.beginPath(); ctx.ellipse(ox, oy, 0.075 * u, 0.06 * u, 0, 0, 6.283); ctx.fill();
  circ(ctx, ox + 0.03 * u, oy + 0.005 * u, 0.045 * u, '#2A1C14'); circ(ctx, ox + 0.045 * u, oy - 0.015 * u, 0.015 * u, '#FFFFFF');
  ctx.strokeStyle = S.wenk; ctx.lineWidth = Math.max(1.4, u * 0.035); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ox - 0.08 * u, oy - 0.11 * u); ctx.quadraticCurveTo(ox + 0.03 * u, oy - 0.16 * u, ox + 0.12 * u, oy - 0.11 * u); ctx.stroke();
  circ(ctx, ox, oy + 0.17 * u, 0.07 * u, rgba('#E07A5F', 0.14));
  // neusvleugel en mond
  ctx.strokeStyle = _dk(huid, 0.3); ctx.lineWidth = Math.max(1.2, u * 0.022); ctx.beginPath(); ctx.arc(K.neus[0] * u - 0.06 * u, K.neus[1] * u + 0.02 * u, 0.045 * u, -0.6, 1.9); ctx.stroke();
  const [mx, my] = [K.mond[0] * u, K.mond[1] * u]; ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.4, u * 0.026); ctx.beginPath(); ctx.moveTo(mx - 0.13 * u, my + 0.005 * u);
  if (o.uit === 'praat') { ctx.fillStyle = '#4A2424'; ctx.beginPath(); ctx.ellipse(mx - 0.04 * u, my + 0.01 * u, 0.05 * u, 0.035 * u, 0, 0, 6.283); ctx.fill(); }
  else { ctx.quadraticCurveTo(mx - 0.06 * u, my + 0.03 * u, mx, my); ctx.stroke(); }
}
// pose: 'staan' | 'loop' (o.t fase) | 'boule' (Boules foute reconstructie) | 'kniel' (werkt op de grond) | 'zit' | 'draag' (arm naar voren, o.hold)
function e12Pose(pose, t, S) { const ph = (t || 0) * 6.283;
  if (pose === 'loop') { // gangcyclus uit het castboek (GANG.loop, Perry & Burnfield): dijbeen- en kniehoeken per fase, armen tegengesteld (review 24 okt: pas was te groot)
    const G = GANG.loop, D = Math.PI / 180, p1 = ((t || 0) % 1 + 1) % 1, p2 = (p1 + 0.5) % 1, th = (p) => _kf(G.th, p) * D, kn = (p) => _kf(G.kn, p) * D;
    return { lean: 0.03, th: [th(p1), th(p2)], kn: [kn(p1), kn(p2)], sh: [-0.32 * Math.sin(ph), 0.32 * Math.sin(ph)], el: [0.3, 0.3], kop: 0 }; }
  if (pose === 'boule') return { lean: 0.42, th: [0.42, 0.3], kn: [0.62, 0.5], sh: [-0.32, -0.42], el: [0.25, 0.3], kop: -0.25 };
  if (pose === 'kniel') return { lean: 0.38, th: [1.25, -0.05], kn: [1.45, 1.52], sh: [0.75, 0.55], el: [0.9, 1.0], kop: 0.1, voet2: 3.14 };
  if (pose === 'zit') return { lean: 0.12, th: [1.5, 1.38], kn: [1.42, 1.2], sh: [0.5, 0.35], el: [0.8, 0.9], kop: 0.05, zit: true };
  if (pose === 'draag') return { lean: 0.02, th: [0.04, -0.04], kn: [0.04, 0.04], sh: [0.95, 0.15], el: [0.45, 0.25], kop: 0 };
  if (pose === 'wijs') return { lean: 0.02, th: [0.05, -0.05], kn: [0.03, 0.03], sh: [1.35, 0.1], el: [0.05, 0.25], kop: -0.05 };
  return { lean: 0, th: [0.04, -0.04], kn: [0.03, 0.03], sh: [0.06, -0.06], el: [0.18, 0.22], kop: 0 }; }
// Hoofdfunctie. (x, y) = midden tussen de voeten op de grond; hpx = lengte in px van een staande volwassene (o.echt: maat volgt E12_SOORT.H met o.pxcm)
function e12Mens(ctx, soort, x, y, hpx, o = {}) { const S = E12_SOORT[soort]; if (!S) return {}; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const H = hpx, kijk = o.kijk || 1, sk = S.schedel, Pz = Object.assign(e12Pose(o.pose || 'staan', o.t, S), o.hoek || {});
  const L1 = (S.heup - S.knie) * H, L2 = (S.knie - 0.04) * H, A1 = S.arm1 * H, A2 = S.arm2 * H, Lr = (S.sch - S.heup) * H;
  // benen t.o.v. de heup: punt van knie, enkel, hiel, teen
  const been = (th, kn, vh = 0) => { const kx = Math.sin(th) * L1, ky = Math.cos(th) * L1, sa = th - kn, ax = kx + Math.sin(sa) * L2, ay = ky + Math.cos(sa) * L2; const fa = vh;
    const vx = Math.cos(fa) * S.voet * H, vy = -Math.sin(fa) * S.voet * H; return { kx, ky, ax, ay, hx: ax - vx * 0.22, hy: ay + 0.035 * H - vy * 0.22, tx: ax + vx * 0.78, ty: ay + 0.035 * H + vy * 0.78 }; };
  const B = [been(Pz.th[0], Pz.kn[0]), been(Pz.th[1], Pz.kn[1], Pz.voet2 || 0)];
  // laagste punt bepaalt de heuphoogte (voeten of knie op de grond)
  let low = -1e9; for (const b of B) low = Math.max(low, b.ay + 0.035 * H, b.hy, b.ty, Pz.voet2 ? b.ky + 0.03 * H : -1e9); const hipY = y - low, hipX = x;
  ctx.save(); ctx.globalAlpha *= a; if (kijk < 0) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); } ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (Pz.zit) { const sy = hipY + 0.06 * H; vul(ctx, [[x - 0.17 * H, y], [x - 0.15 * H, sy + 0.02 * H], [x - 0.06 * H, sy - 0.005 * H], [x + 0.08 * H, sy + 0.01 * H], [x + 0.12 * H, y]], '#6E6A62', '#8A867C', 2); } // steen om op te zitten
  const huidV = S.vacht ? _dk(S.haar, 0.18) : _dk(S.huid, 0.16), huid = S.vacht ? S.haar : S.huid;
  const tekenBeen = (b, ver) => { const c = ver ? huidV : huid; ctx.strokeStyle = c; ctx.lineWidth = 0.085 * H * (S.borst > 1.2 ? 1.12 : 1); ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(hipX + b.kx, hipY + b.ky); ctx.stroke();
    ctx.lineWidth = 0.06 * H * (S.borst > 1.2 ? 1.1 : 1); ctx.beginPath(); ctx.moveTo(hipX + b.kx, hipY + b.ky); ctx.lineTo(hipX + b.ax, hipY + b.ay); ctx.stroke();
    const vk = S.vacht ? (ver ? _dk(S.huid, 0.16) : S.huid) : c; ctx.fillStyle = vk; vul(ctx, [[hipX + b.hx, hipY + b.hy], [hipX + b.ax - 0.02 * H, hipY + b.ay - 0.02 * H], [hipX + b.ax + 0.03 * H, hipY + b.ay], [hipX + b.tx, hipY + b.ty - 0.012 * H], [hipX + b.tx + 0.005 * H, hipY + b.ty + 0.004 * H], [hipX + b.hx, hipY + b.hy + 0.004 * H]], vk); };
  // romp-frame: draait om de heup met lean
  const R = (px, py) => [hipX + px * Math.cos(Pz.lean) - py * Math.sin(Pz.lean) * -1 * 0 + Math.sin(Pz.lean) * -py, hipY + py * Math.cos(Pz.lean) + px * Math.sin(Pz.lean) * 0];
  const rot = (px, py) => { const c = Math.cos(Pz.lean), s = Math.sin(Pz.lean); return [hipX + px * c - py * s, hipY + px * s + py * c]; };
  const shJ = rot(0.0, -Lr + 0.03 * H);
  const arm = (shA, el, ver, hold) => { const c = ver ? huidV : huid; const u1 = shA + Pz.lean, ex = shJ[0] + Math.sin(u1) * A1, ey = shJ[1] + Math.cos(u1) * A1, u2 = u1 + el, hx = ex + Math.sin(u2) * A2, hy = ey + Math.cos(u2) * A2;
    const dk = S.borst > 1.2 ? 1.15 : 1; if (!ver) { ctx.strokeStyle = rgba('#0B1020', 0.35); ctx.lineWidth = 0.055 * H * dk + 0.008 * H; ctx.beginPath(); ctx.moveTo(shJ[0], shJ[1]); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); }
    ctx.strokeStyle = c; ctx.lineWidth = 0.055 * H * dk; ctx.beginPath(); ctx.moveTo(shJ[0], shJ[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 0.046 * H * dk; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    const hc = S.vacht ? (ver ? _dk(S.huid, 0.16) : S.huid) : c; const hl = S.hand * H; ctx.fillStyle = hc; ctx.beginPath(); ctx.ellipse(hx + Math.sin(u2) * hl * 0.4, hy + Math.cos(u2) * hl * 0.4, hl * 0.28, hl * 0.52, -u2, 0, 6.283); ctx.fill();
    const hp = { x: hx + Math.sin(u2) * hl * 0.6, y: hy + Math.cos(u2) * hl * 0.6, ang: u2 }; if (hold) hold(ctx, hp.x, hp.y, u2); return hp; };
  tekenBeen(B[1], true); const handVer = arm(Pz.sh[1], Pz.el[1], true);
  // romp
  const bK = S.borst, uK = S.buik, Hh = H;
  const romp = [[-0.045, -Lr / Hh - 0.03], [-0.07 * Math.sqrt(bK), -Lr / Hh + 0.025], [-0.072 * bK, -Lr / Hh + 0.09], [-0.05 * Math.sqrt(bK), -0.12], [-0.075, -0.02], [-0.07, 0.04], [-0.02, 0.06], [0.03, 0.05], [0.055 * uK, -0.02], [0.06 * uK, -0.11], [0.072 * bK, -Lr / Hh + 0.13], [0.062 * bK, -Lr / Hh + 0.03], [0.035, -Lr / Hh - 0.035]].map(([px, py]) => rot(px * Hh, py * Hh));
  vul(ctx, romp, huid);
  if (S.vacht) { ctx.save(); zacht(ctx, romp); ctx.clip(); ctx.strokeStyle = _lt(S.haar, 0.08); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { const [p, q] = [rot(-0.05 * Hh + i * 0.012 * Hh, -Lr * (0.2 + i * 0.07)), rot(-0.035 * Hh + i * 0.012 * Hh, -Lr * (0.15 + i * 0.07))]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } ctx.restore(); }
  // kleding: heupvel, cape of bovenstuk (reconstructie)
  if (S.kleed) { const wrap = [[-0.056, -0.085], [0.058 * uK, -0.09], [0.064 * uK, 0.0], [0.056, 0.1], [0.0, 0.085], [-0.048, 0.11], [-0.07, 0.04]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, wrap, S.kleed);
    lijn(ctx, [rot(-0.054 * Hh, -0.078 * Hh), rot(0.056 * uK * Hh, -0.083 * Hh)], S.kleedD, 0.012 * Hh);
    if (S.cape) { const cp = [[-0.04, -Lr / Hh - 0.03], [-0.085 * Math.min(bK, 1.2), -Lr / Hh + 0.04], [-0.09, -Lr / Hh + 0.2], [-0.07, -0.16], [0.02, -0.2], [0.075 * bK, -Lr / Hh + 0.14], [0.065 * bK, -Lr / Hh + 0.02], [0.02, -Lr / Hh - 0.035]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, cp, S.kleed); ctx.save(); zacht(ctx, cp); ctx.clip(); ctx.fillStyle = S.kleedD; ctx.beginPath(); const [cx2, cy2] = rot(-0.07 * Hh, -Lr * 0.55); ctx.ellipse(cx2, cy2, 0.03 * Hh, 0.2 * Hh, Pz.lean, 0, 6.283); ctx.fill(); ctx.restore(); }
    if (S.boven) { const bt = [[-0.04, -Lr / Hh - 0.025], [-0.07 * Math.sqrt(bK), -Lr / Hh + 0.03], [-0.072 * bK, -Lr / Hh + 0.1], [-0.052 * Math.sqrt(bK), -0.06], [0.056 * S.buik, -0.07], [0.068 * bK, -Lr / Hh + 0.13], [0.058 * bK, -Lr / Hh + 0.03], [0.03, -Lr / Hh - 0.03]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, bt, S.kleed); lijn(ctx, [rot(0.02 * Hh, -Lr + 0.02 * Hh), rot(0.04 * Hh, -0.1 * Hh)], S.kleedD, 0.006 * Hh); } }
  tekenBeen(B[0], false);
  // nek + hoofd
  const u = S.hoofd * H / 1.13, nek = rot(0.012 * H, -Lr - 0.02 * H), kopO = rot(0.022 * H + (Pz.kop < 0 ? -Pz.kop * 0.05 * H : 0), -(H * (1 - S.hoofd) + 0.33 * u - S.heup * H) - (o.pose === 'boule' ? -0.01 * H : 0));
  ctx.strokeStyle = S.vacht ? S.haar : _dk(S.huid, 0.08); ctx.lineWidth = 0.068 * H; ctx.beginPath(); ctx.moveTo(nek[0], nek[1]); ctx.lineTo(kopO[0], kopO[1] + 0.02 * H); ctx.stroke();
  ctx.save(); ctx.translate(kopO[0], kopO[1]); ctx.rotate(Pz.kop * 0.6); e12Kop(ctx, sk, S, u, o); ctx.restore();
  const hand = arm(Pz.sh[0], Pz.el[0], false, o.hold);
  ctx.restore();
  const m = (p) => kijk < 0 ? { ...p, x: 2 * x - p.x } : p;
  return { hoofd: m({ x: kopO[0], y: kopO[1] - 0.3 * u }), hand: m(hand), handVer: m(handVer), top: y - H };
}

// ---- Schedels in zijaanzicht (Schema, lijntekening in bot-tint); vorm vergelijken, niet op schaal tenzij o.mm ----
// Kenmerken: chimp/afarensis lage kleine hersenpan + snuit; erectus lang en laag + wenkbrauwboog; neanderthaler lang, laag, breed, knobbel achter, groot neusgat, geen kin (La Chapelle: lengte 208 mm, 1620 cm³ (3B Scientific VP751));
// sapiens hoog en rond, recht voorhoofd, vlak gezicht, kin (Bryn Mawr lab).
const E12_SCHEDEL = {
  chimp:        { P: [[-0.5, -0.05], [-0.46, -0.3], [-0.2, -0.48], [0.12, -0.42], [0.3, -0.3], [0.42, -0.26], [0.46, -0.16], [0.64, -0.08], [0.72, 0.06], [0.7, 0.16], [0.56, 0.22], [0.5, 0.36], [0.2, 0.36], [0.02, 0.2], [-0.1, 0.1], [-0.36, 0.08]], oog: [0.32, -0.12, 0.09], neus: [0.6, 0.0] },
  afarensis:    { P: [[-0.48, -0.06], [-0.46, -0.32], [-0.18, -0.5], [0.14, -0.44], [0.3, -0.32], [0.42, -0.27], [0.44, -0.16], [0.6, -0.06], [0.68, 0.08], [0.66, 0.18], [0.54, 0.24], [0.48, 0.36], [0.2, 0.36], [0.02, 0.2], [-0.1, 0.1], [-0.36, 0.06]], oog: [0.32, -0.12, 0.09], neus: [0.56, 0.0] },
  erectus:      { P: [[-0.6, -0.04], [-0.62, -0.26], [-0.36, -0.52], [0.06, -0.56], [0.3, -0.42], [0.46, -0.32], [0.5, -0.2], [0.56, -0.06], [0.6, 0.1], [0.58, 0.2], [0.5, 0.26], [0.46, 0.36], [0.2, 0.38], [0.02, 0.22], [-0.1, 0.12], [-0.42, 0.08]], oog: [0.36, -0.12, 0.09], neus: [0.55, 0.02] },
  neanderthaler:{ P: [[-0.66, -0.06], [-0.74, -0.2], [-0.64, -0.42], [-0.3, -0.62], [0.1, -0.64], [0.34, -0.5], [0.52, -0.36], [0.56, -0.22], [0.62, -0.06], [0.66, 0.1], [0.62, 0.2], [0.54, 0.26], [0.48, 0.38], [0.22, 0.4], [0.02, 0.22], [-0.1, 0.12], [-0.46, 0.08]], oog: [0.4, -0.12, 0.1], neus: [0.6, 0.03] },
  sapiens:      { P: [[-0.52, -0.04], [-0.58, -0.3], [-0.4, -0.62], [0.0, -0.78], [0.3, -0.66], [0.42, -0.42], [0.44, -0.22], [0.46, -0.06], [0.48, 0.1], [0.44, 0.2], [0.42, 0.28], [0.44, 0.4], [0.2, 0.4], [0.02, 0.22], [-0.1, 0.12], [-0.4, 0.08]], oog: [0.3, -0.12, 0.09], neus: [0.44, 0.02] }
};
function e12Schedel(ctx, soort, x, y, s = 1, o = {}) { const K = E12_SCHEDEL[soort]; if (!K) return; const { a = 1, kleur = '#D8CDB6', kijk = 1, nadruk = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const P = K.P.map(([px, py]) => [px * 200, py * 200]);
  vul(ctx, P, kleur, _dk(kleur, 0.35), 3 / s);
  // hersenpan-vlak (lichter) als nadruk op de herseninhoud
  if (nadruk) { ctx.save(); zacht(ctx, P); ctx.clip(); ctx.fillStyle = rgba(nadruk, 0.28); ctx.beginPath(); ctx.rect(-200, -200, 400, 170 + (soort === 'sapiens' ? 10 : 0)); ctx.fill(); ctx.restore(); }
  circ(ctx, K.oog[0] * 200, K.oog[1] * 200, K.oog[2] * 200, _dk(kleur, 0.55)); vul(ctx, [[K.neus[0] * 200 - 14, K.neus[1] * 200 - 14], [K.neus[0] * 200 - 2, K.neus[1] * 200 - 4], [K.neus[0] * 200 - 8, K.neus[1] * 200 + 18], [K.neus[0] * 200 - 20, K.neus[1] * 200 + 8]], _dk(kleur, 0.5));
  // jukboog, gehoorgang, tanden, kaakhoek
  lijn(ctx, [[-0.2 * 200, 0.02 * 200], [0.25 * 200, 0.04 * 200]], _dk(kleur, 0.3), 3 / s); circ(ctx, -0.26 * 200, 0.02 * 200, 8, _dk(kleur, 0.55));
  const tx = K.P[11] ? K.P[11][0] * 200 : 0; for (let i = 0; i < 4; i++) roundRect(ctx, tx - 50 + i * 12, (soort === 'sapiens' ? 0.28 : 0.24) * 200, 9, 14, 3), shape(ctx, '#EFE8D8', _dk(kleur, 0.3), 1);
  lijn(ctx, [[0.0, 0.22 * 200], [0.1 * 200, 0.32 * 200]], _dk(kleur, 0.3), 2.5 / s);
  ctx.restore(); }

// ---- Maatcilinder met herseninhoud (Schema): hoogte evenredig met het volume, op schaal ten opzichte van elkaar ----
function e12Cilinder(ctx, x, y, vol, o = {}) { const { schaal = 0.22, a = 1, kleur = C.paars, label = null, meta = null, w = 120, max = 1800 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hMax = max * schaal, h = vol * schaal; ctx.strokeStyle = EVO.glas; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - hMax - 20); ctx.lineTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y - hMax - 20); ctx.stroke();
  ctx.fillStyle = rgba(kleur, 0.7); ctx.fillRect(x - w / 2 + 4, y - h, w - 8, h - 3); ctx.fillStyle = _lt(kleur, 0.3); ctx.fillRect(x - w / 2 + 4, y - h, w - 8, 4);
  for (let v = 500; v <= max; v += 500) { lijn(ctx, [[x - w / 2, y - v * schaal], [x - w / 2 + 18, y - v * schaal]], EVO.glas, 2); }
  if (label) text(ctx, label, x, y + 50, fTekst(36, 600), C.text, 'center'); if (meta) metaText(ctx, meta, x, y + 86, C.grain, 'center', 26);
  if (vol > 0) text(ctx, vol + ' cm³', x, y - h - 18, fTekst(34, 700), C.text, 'center'); ctx.restore(); }

// ---- Voetafdruk (bovenaanzicht) in vulkanische as. len = lengte in px; grote teen in lijn (Laetoli: 18–26 cm, Masao e.a. 2016 eLife) ----
function e12Voetafdruk(ctx, x, y, len, rot = 0, o = {}) { const { links = false, a = 1, kleur = '#4E4A44', rand = '#8A847A', aap = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(links ? -1 : 1, 1);
  const L = len, B = len * 0.42; // hiel achter (y+), tenen voor (y-)
  const zool = aap ? [[0, L * 0.5], [B * 0.32, L * 0.35], [B * 0.42, 0], [B * 0.5, -L * 0.25], [B * 0.3, -L * 0.42], [-B * 0.1, -L * 0.4], [-B * 0.38, -L * 0.1], [-B * 0.3, L * 0.3]]
    : [[0, L * 0.5], [B * 0.3, L * 0.38], [B * 0.32, L * 0.08], [B * 0.48, -L * 0.2], [B * 0.42, -L * 0.34], [-B * 0.05, -L * 0.36], [-B * 0.42, -L * 0.3], [-B * 0.3, -L * 0.05], [-B * 0.18, L * 0.3]];
  vul(ctx, zool, kleur, rand, 2);
  const tenen = aap ? [[-B * 0.62, -L * 0.18, 0.13], [-B * 0.05, -L * 0.48, 0.09], [B * 0.15, -L * 0.48, 0.085], [B * 0.32, -L * 0.44, 0.08], [B * 0.46, -L * 0.36, 0.07]]
    : [[-B * 0.22, -L * 0.45, 0.14], [B * 0.06, -L * 0.47, 0.085], [B * 0.22, -L * 0.44, 0.075], [B * 0.35, -L * 0.39, 0.065], [B * 0.45, -L * 0.32, 0.06]];
  for (const [tx, ty, r] of tenen) { ctx.beginPath(); ctx.ellipse(tx, ty, r * L * 0.62, r * L * 0.78, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }
function e12AsVlak(ctx, x, y, w, h, o = {}) { const { seed = 2 } = o; roundRect(ctx, x, y, w, h, 24); shape(ctx, '#7A746A', '#9A9488', 2); ctx.save(); roundRect(ctx, x, y, w, h, 24); ctx.clip();
  for (let i = 0; i < 70; i++) { const px = x + hash(seed + i * 3.3) * w, py = y + hash(seed + i * 7.1) * h; circ(ctx, px, py, 2 + hash(i * 1.7) * 4, rgba('#5E5A52', 0.5)); } ctx.restore(); }

// ---- Handbijl (Acheuléen): druppelvorm ±20–25 cm (Britannica), aan twee kanten bijgeslagen ----
function e12Handbijl(ctx, x, y, len, o = {}) { const { rot = 0, a = 1, kleur = '#B8A27E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const L = len, B = len * 0.6; const P = [[0, -L / 2], [B * 0.22, -L * 0.32], [B * 0.42, -L * 0.02], [B * 0.5, L * 0.22], [B * 0.36, L * 0.42], [0, L / 2], [-B * 0.36, L * 0.42], [-B * 0.5, L * 0.22], [-B * 0.42, -L * 0.02], [-B * 0.22, -L * 0.32]];
  vul(ctx, P, kleur, _dk(kleur, 0.35), Math.max(1.5, L * 0.012)); ctx.save(); zacht(ctx, P); ctx.clip();
  const vlak = [[-0.3, -0.25, 0.22], [0.25, -0.2, 0.2], [-0.35, 0.12, 0.24], [0.32, 0.15, 0.24], [0.0, -0.02, 0.2], [-0.15, 0.36, 0.2], [0.18, 0.38, 0.2], [0.02, -0.38, 0.14]];
  vlak.forEach(([fx, fy, r], i) => { ctx.beginPath(); ctx.ellipse(fx * B, fy * L, r * B, r * B * 0.75, i, 0, 6.283); ctx.fillStyle = i % 2 ? _dk(kleur, 0.1) : _lt(kleur, 0.08); ctx.fill(); ctx.strokeStyle = _dk(kleur, 0.25); ctx.lineWidth = Math.max(1, L * 0.006); ctx.stroke(); });
  ctx.restore(); ctx.restore(); }
// ---- Speer met stenen punt (neanderthaler) ----
function e12Speer(ctx, x1, y1, x2, y2, o = {}) { const { a = 1, w = 8 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lijn(ctx, [[x1, y1], [x2, y2]], '#8A6A44', w); const an = Math.atan2(y2 - y1, x2 - x1);
  ctx.translate(x2, y2); ctx.rotate(an); vul(ctx, [[-6, -w * 0.9], [w * 4, 0], [-6, w * 0.9]], '#C8BCA4', '#8A8070', 1.5); lijn(ctx, [[-10, -w * 0.8], [-2, w * 0.8]], '#5A4A3A', 3); ctx.restore(); }
// ---- Vuur met haardstenen (Macro), vlammen rustig ----
function e12Vuur(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, aan = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 7; i++) { const an = Math.PI * (0.05 + i / 6 * 0.9); ctx.beginPath(); ctx.ellipse(Math.cos(an) * 70, -Math.sin(an) * 8 + 4, 22, 13, 0, 0, 6.283); ctx.fillStyle = i % 2 ? '#6E6A62' : '#5E5A54'; ctx.fill(); }
  lijn(ctx, [[-50, -6], [40, -22]], '#5A4030', 12); lijn(ctx, [[-40, -20], [52, -4]], '#6A4A34', 12);
  if (aan > 0.01) { ctx.globalAlpha *= aan; vul(ctx, [[-44, -8], [-30, -70], [-10, -40], [2, -112 - 6 * Math.sin(t * 5)], [18, -50], [34, -80], [44, -10]], C.koraal); vul(ctx, [[-24, -10], [-10, -48], [4, -80], [16, -40], [26, -10]], '#E0B64A'); }
  ctx.restore(); }
// ---- Pyriet en vuursteen (Barnham, ±400 000 jaar; Ashton e.a. 2025 Nature) ----
function e12Pyriet(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); // kubische kristallen (pyriet), messinggeel, vlakke zijden
  const kubus = (cx, cy, r) => { ctx.beginPath(); ctx.moveTo(cx - r, cy - r * 0.4); ctx.lineTo(cx, cy - r * 0.9); ctx.lineTo(cx + r, cy - r * 0.4); ctx.lineTo(cx, cy + 0.1 * r); ctx.closePath(); ctx.fillStyle = '#D8C27A'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - r, cy - r * 0.4); ctx.lineTo(cx, cy + 0.1 * r); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy + r * 0.5); ctx.closePath(); ctx.fillStyle = '#A8924A'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + r, cy - r * 0.4); ctx.lineTo(cx, cy + 0.1 * r); ctx.lineTo(cx, cy + r); ctx.lineTo(cx + r, cy + r * 0.5); ctx.closePath(); ctx.fillStyle = '#8A763A'; ctx.fill(); };
  kubus(-18, 6, 22); kubus(16, 0, 26); kubus(0, -22, 16); ctx.restore(); }
// ---- Zeearendklauw met snijsporen (Krapina, ±130 000 jaar; Radovčić e.a. 2015) ----
function e12Klauw(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  vul(ctx, [[-14, -40], [12, -40], [18, -10], [14, 20], [0, 50], [-16, 64], [-6, 30], [-14, 0]], '#E8E0CC', '#A89E86', 2); vul(ctx, [[-16, -40], [14, -40], [16, -50], [-16, -50]], '#C8BEA6');
  for (let i = 0; i < 4; i++) lijn(ctx, [[-10, -30 + i * 9], [8, -26 + i * 9]], '#8A7E66', 2); ctx.restore(); }
// ---- Grotwand met handafdruk (negatief, rode oker) ----
function e12Grotwand(ctx, x, y, w, h) { vul(ctx, [[x, y + 30], [x + w * 0.3, y], [x + w * 0.7, y + 20], [x + w, y + 10], [x + w + 20, y + h * 0.5], [x + w, y + h], [x + w * 0.4, y + h + 20], [x - 20, y + h - 10]], '#6E5E52', '#8C7A6A', 2);
  ctx.save(); zacht(ctx, [[x, y + 30], [x + w * 0.3, y], [x + w * 0.7, y + 20], [x + w, y + 10], [x + w + 20, y + h * 0.5], [x + w, y + h], [x + w * 0.4, y + h + 20], [x - 20, y + h - 10]]); ctx.clip(); for (let i = 0; i < 40; i++) circ(ctx, x + hash(i * 3) * w, y + hash(i * 5) * h, 6 + hash(i) * 14, rgba('#5A4C42', 0.5)); ctx.restore(); }
function e12Handafdruk(ctx, x, y, s = 1, rot = 0, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = rgba('#B4482E', 0.55); ctx.beginPath(); ctx.ellipse(0, 0, 90, 110, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#6E5E52'; ctx.beginPath(); ctx.ellipse(0, 30, 34, 40, 0, 0, 6.283); ctx.fill(); // palm
  const vingers = [[-38, 4, -0.9, 34], [-22, -22, -0.25, 52], [-4, -30, -0.05, 58], [14, -26, 0.12, 54], [30, -14, 0.35, 42]];
  for (const [fx, fy, r, l] of vingers) { ctx.save(); ctx.translate(fx, fy); ctx.rotate(r); roundRect(ctx, -8, -l, 16, l + 10, 8); ctx.fill(); ctx.restore(); }
  roundRect(ctx, -24, 56, 48, 44, 10); ctx.fill(); ctx.restore(); }
// ---- Vingerbotje (Denisova, 2008) en tand ----
function e12Vingerbot(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[-30, -12], [-20, -16], [20, -10], [32, -14], [36, 0], [32, 14], [20, 10], [-20, 14], [-30, 12], [-36, 0]], '#E2D8C2', '#A89E86', 2); ctx.restore(); }

// ---- Vlakke kaart (Schema, equirectangulair) met echte kustlijnen uit E12_LAND ----
let _e12Polys = null;
function e12Polys() { if (_e12Polys) return _e12Polys; _e12Polys = E12_LAND.split(';').map(r => { const n = r.split(',').map(Number), pts = []; let px = 0, py = 0; for (let i = 0; i < n.length; i += 2) { px += n[i]; py += n[i + 1]; pts.push([px / 10, py / 10]); } return pts; }); return _e12Polys; }
function e12Kaart(ctx, x, y, w, h, o = {}) { const { lon = [-20, 150], lat = [-45, 66], a = 1, land = '#2F4562', rand = '#6E829E' } = o; ctx.save(); ctx.globalAlpha *= a;
  const X = (lo) => x + (lo - lon[0]) / (lon[1] - lon[0]) * w, Y = (la) => y + (lat[1] - la) / (lat[1] - lat[0]) * h;
  roundRect(ctx, x, y, w, h, 18); ctx.fillStyle = '#16233A'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  ctx.beginPath(); for (const p of e12Polys()) { let prev = null; p.forEach(([lo, la], i) => { if (i === 0 || (prev && Math.abs(lo - prev) > 180)) ctx.moveTo(X(lo), Y(la)); else ctx.lineTo(X(lo), Y(la)); prev = lo; }); ctx.closePath(); }
  ctx.fillStyle = land; ctx.fill('evenodd'); ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); ctx.restore();
  return { X, Y }; }
// gebied als zacht vlak (lon/lat-punten), gestippelde rand
function e12Gebied(ctx, K, pts, kleur, o = {}) { const { a = 0.28, streep = true } = o; const P = pts.map(([lo, la]) => [K.X(lo), K.Y(la)]); ctx.save(); vul(ctx, P, rgba(kleur, a)); if (streep) { ctx.setLineDash([10, 8]); zacht(ctx, P); ctx.strokeStyle = kleur; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]); } ctx.restore(); }
function e12Route(ctx, K, pts, kleur, o = {}) { const { lw = 6, a = 1 } = o; const P = pts.map(([lo, la]) => [K.X(lo), K.Y(la)]); ctx.save(); ctx.globalAlpha *= a; lijn(ctx, P, kleur, lw);
  const n = P.length, [x1, y1] = P[n - 2], [x2, y2] = P[n - 1]; pijl(ctx, x1 + (x2 - x1) * 0.6, y1 + (y2 - y1) * 0.6, x2, y2, kleur, 1, lw, 22); ctx.restore(); }

// ---- Genoom als 22 + X chromosomen (DNA paars) met stukjes neanderthaler-DNA (oker) en denisova-DNA (koraal) ----
// ±2 % van het genoom van mensen buiten Afrika (Prüfer e.a. 2017: 1,8–2,6 %); hier ±2 % van de getekende lengte, verspreid in korte stukken.
function e12Genoom(ctx, x, y, w, o = {}) { const { pNea = 0.02, pDen = 0, a = 1, seed = 3, h = 300 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const lens = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156]; const tot = lens.reduce((s, v) => s + v, 0), bw = w / 23;
  let nNea = 0, nTot = 0;
  lens.forEach((L, i) => { const hh = L / 249 * h, cx = x + (i + 0.5) * bw; roundRect(ctx, cx - bw * 0.3, y - hh, bw * 0.6, hh, bw * 0.3); shape(ctx, rgba(C.paars, 0.75), _lt(C.paars, 0.3), 1.5);
    const stukken = Math.round(L / tot * 60); for (let k = 0; k < stukken; k++) { const r = hash(seed + i * 13 + k * 7.7); const sh = hh * 0.02 * (0.5 + hash(i + k * 3) * 1.6);
      if (r < pNea * 26) { ctx.fillStyle = C.oker; ctx.fillRect(cx - bw * 0.3, y - hh + hash(i * 5 + k) * (hh - sh), bw * 0.6, sh); }
      else if (pDen && r > 1 - pDen * 26) { ctx.fillStyle = C.koraal; ctx.fillRect(cx - bw * 0.3, y - hh + hash(i * 9 + k) * (hh - sh), bw * 0.6, sh); } } });
  ctx.restore(); }

// ---- Tijdstruik (Schema): soorten als balken op een niet-lineaire tijdas (wortel van de tijd), takken vereenvoudigd ----
// tijd in miljoen jaar (Mj). Bronnen per soort in f12.json 'getallen'.
const E12_STRUIK = [
  { id: 'chimp', naam: 'chimpansee-lijn', van: 7, tot: 0, rij: 0, kleur: '#9AA3B2' },
  { id: 'afarensis', naam: 'Australopithecus afarensis', van: 3.9, tot: 2.8, rij: 1 },
  { id: 'erectus', naam: 'Homo erectus', van: 1.9, tot: 0.11, rij: 2 },
  { id: 'denisova', naam: 'denisovamensen', van: 0.3, tot: 0.05, rij: 3, onzeker: true },
  { id: 'neanderthaler', naam: 'neanderthaler', van: 0.4, tot: 0.04, rij: 4, kleur: C.oker },
  { id: 'floresiensis', naam: 'Homo floresiensis', van: 0.19, tot: 0.05, rij: 5 },
  { id: 'sapiens', naam: 'Homo sapiens', van: 0.3, tot: 0, rij: 6, kleur: C.teal }];
function e12TijdX(x, w, mj) { return x + w * (1 - Math.sqrt(mj / 7)); }
function e12Struik(ctx, x, y, w, h, o = {}) { const { a = 1, nu = null, markeer = [], dim = [], toon = null, takken = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const X = (mj) => e12TijdX(x, w, mj), rijH = h / 7, RY = (r) => y + (r + 0.5) * rijH;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y + h + 20); ctx.lineTo(x + w, y + h + 20); ctx.stroke();
  for (const [mj, lab] of [[7, '7 Mj'], [4, '4'], [2, '2'], [1, '1'], [0.4, '0,4'], [0.1, '0,1'], [0, 'nu']]) { const px = X(mj); lijn(ctx, [[px, y + h + 12], [px, y + h + 28]], C.line, 2); metaText(ctx, lab, px, y + h + 62, C.text2, 'center', 26); }
  metaText(ctx, 'miljoen jaar geleden · as niet lineair', x, y + h + 100, C.text2, 'left', 24);
  if (takken) { ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba('#8FA0B5', 0.6); ctx.lineWidth = 2.5; const L = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.bezierCurveTo(x1 + 30, y1, x2 - 30, y2, x2, y2); ctx.stroke(); };
    const st = Object.fromEntries(E12_STRUIK.map(s => [s.id, s])); const vis = (id) => !toon || toon.includes(id);
    if (vis('afarensis')) L(X(6.5), RY(0), X(3.9), RY(1)); if (vis('erectus')) L(X(3.0), RY(1), X(1.9), RY(2)); if (vis('sapiens')) L(X(0.75), RY(2.5), X(0.3), RY(6)); if (vis('neanderthaler')) L(X(0.75), RY(2.5), X(0.4), RY(4)); if (vis('denisova')) L(X(0.55), RY(4), X(0.3), RY(3));
    if (vis('floresiensis')) L(X(1.2), RY(2), X(0.19), RY(5)); ctx.setLineDash([]); }
  for (const s of E12_STRUIK) { if (toon && !toon.includes(s.id)) continue; const gd = dim.includes(s.id), kl = s.kleur || '#C8BCA4'; ctx.save(); ctx.globalAlpha *= gd ? 0.35 : 1;
    const x1 = X(s.van), x2 = X(s.tot), yy = RY(s.rij); roundRect(ctx, x1, yy - 16, Math.max(10, x2 - x1), 32, 16); if (s.onzeker) { ctx.setLineDash([8, 6]); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = rgba(kl, 0.35); ctx.fill(); } else shape(ctx, rgba(kl, 0.85), _lt(kl, 0.3), 2);
    if (markeer.includes(s.id)) { roundRect(ctx, x1 - 6, yy - 22, Math.max(10, x2 - x1) + 12, 44, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }
    const lx = s.tot < 0.5 ? x1 - 16 : x2 + 16; text(ctx, s.naam, lx, yy + 12, fTekst(32, 600), C.text, s.tot < 0.5 ? 'right' : 'left'); ctx.restore(); }
  if (nu != null) { const px = X(nu); ctx.setLineDash([10, 8]); lijn(ctx, [[px, y - 20], [px, y + h + 10]], C.goud, 3); ctx.setLineDash([]); }
  ctx.restore(); return { X, RY }; }

// ---- Cladogram mens–chimpansee met de gemeenschappelijke voorouder als knooppunt (Schema) ----
function e12Splitsing(ctx, x, y, w, h, o = {}) { const { a = 1, vraag = false } = o; ctx.save(); ctx.globalAlpha *= a; const kx = x + w / 2, ky = y + h;
  lijn(ctx, [[kx, ky], [x, y]], C.line, 6); lijn(ctx, [[kx, ky], [x + w, y]], C.line, 6); lijn(ctx, [[kx, ky], [kx, ky + 70]], C.line, 6); circ(ctx, kx, ky, 16, C.bgSchema, C.goud, 5);
  if (vraag) text(ctx, '?', kx, ky + 15, fTekst(30, 800), C.goud, 'center'); ctx.restore(); return { kx, ky }; }

// ---- Grafsilhouet niet gebruikt; botje met DNA-draad (oud DNA) ----
function e12BotDNA(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  vul(ctx, [[-120, -16], [-100, -34], [-80, -22], [80, -22], [100, -34], [124, -16], [116, 4], [126, 22], [104, 34], [80, 20], [-80, 20], [-100, 34], [-124, 22], [-116, 2]], '#D8CDB6', '#A89E86', 2);
  ctx.strokeStyle = C.paars; ctx.lineWidth = 4; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = 140 + u * 260, py = -10 + Math.sin(u * 12 + k * Math.PI) * 18 - u * 40; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 2; for (let i = 0; i <= 24; i++) { const u = i / 24, px = 140 + u * 260; ctx.beginPath(); ctx.moveTo(px, -10 + Math.sin(u * 12) * 18 - u * 40); ctx.lineTo(px, -10 + Math.sin(u * 12 + Math.PI) * 18 - u * 40); ctx.stroke(); }
  ctx.restore(); }
// ---- Achtergrond: koude steppe in de nacht (Macro), met besneeuwde bergen ----
function e12Steppe(ctx, o = {}) { const { horizon = 640 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  vul(ctx, [[-50, horizon], [260, horizon - 220], [520, horizon - 60], [820, horizon - 280], [1120, horizon - 40], [1420, horizon - 200], [1700, horizon - 70], [1980, horizon - 160], [1980, horizon + 40], [-50, horizon + 40]], C.berg);
  for (const [bx, by] of [[260, horizon - 220], [820, horizon - 280], [1420, horizon - 200]]) vul(ctx, [[bx - 50, by + 52], [bx, by], [bx + 54, by + 56], [bx + 20, by + 44], [bx - 10, by + 60]], C.bergTop);
  vul(ctx, [[-50, horizon + 10], [500, horizon - 30], [1100, horizon + 10], [1600, horizon - 20], [1980, horizon + 10], [1980, H], [-50, H]], C.bgMacroHill);
  vul(ctx, [[-50, horizon + 140], [600, horizon + 110], [1300, horizon + 150], [1980, horizon + 120], [1980, H], [-50, H]], C.bgMacroFront); }
function e12Savanne(ctx, o = {}) { macroNacht(ctx, o); const hz = o.horizon || 640; for (const [tx, s] of [[300, 1], [1500, 1.2], [1720, 0.8]]) { lijn(ctx, [[tx, hz + 20], [tx, hz - 120 * s]], '#3A2E24', 10 * s); vul(ctx, [[tx - 120 * s, hz - 110 * s], [tx, hz - 150 * s], [tx + 130 * s, hz - 115 * s], [tx + 40 * s, hz - 95 * s], [tx - 50 * s, hz - 95 * s]], '#2E5040'); } }

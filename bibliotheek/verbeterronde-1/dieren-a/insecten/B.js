// =====================================================================================
// INSECTEN (bovenaanzicht, kop naar boven, zoals lhb): honingbij (werkster), gouden loopkever, rode bosmier, dagpauwoog.
// Recept (C9): drie lichaamsdelen na elkaar op één as (kop, borststuk, achterlijf); zes gelede poten, allemaal uit het
// borststuk, gespreid in een brede stand; vleugels (twee paar) aan het borststuk; niets aan het achterlijf (Life 11e
// fig. 31.26; NCSU 'locomotion': brede stand, driepootgang). Lopen = driepootgang L1 R2 L3 ↔ R1 L2 R3 (Zollikofer 1994):
// van boven zie je de twee driehoeken om beurten neerzetten. Maten (1 eenheid = 0,1 mm): bij ± 13 mm (voor- en
// achtervleugel gekoppeld, in rust plat over het achterlijf; Hepburn & Radloff 2004), korfje op de achterscheen; mier
// ± 7 mm met geknikte antenne en steeltje (idtools PIAkey); loopkever ± 25 mm, dekschilden met ribbels, draadvormige
// antennes; dagpauwoog spanwijdte ± 65 mm, bovenkant purperrood met vier oogvlekken, 4 volwaardige poten (DELTA).
// Aanroep: insect(ctx, soort, x, y, s, o)  (x, y) = midden van het lijf; o.houding 'lopen' (t = fase 0–1), 'staan',
// 'vliegen' (t = vleugelslag; van boven wordt de vleugel korter als hij omhoog/omlaag staat), bij ook 'bestuiven',
// vlinder ook 'rust' (zonnen met open vleugels). o.rot (radialen, 0 = kop naar boven), o.a. Geeft {kop, borst, achterlijf}.
// Bekende fouten: poten aan het achterlijf; alle poten tegelijk; antenne uit het oog; kever als rond knoopje.
// =====================================================================================
var INSECT_SOORT = {
  bij: { kleuren: { kop: '#2E2824', borst: '#7E6440', haar: '#B89A68', band: '#C9953A', donker: '#352B24', poot: '#6A5644', oog: '#1A1614' },
    heup: [[7, -36], [8, -28], [8, -20]], rust: [[-30, -60], [-40, -26], [-34, 16]], lf: [16, 18, 22], lt: [17, 19, 26], stride: 22, kop: -52, borst: -28, al: 16 },
  mier: { kleuren: { kop: '#8E4A34', borst: '#9A5236', donker: '#2E2624', poot: '#7A4430', oog: '#1A1614' },
    heup: [[3, -14], [3, -9], [3, -4]], rust: [[-24, -34], [-30, -8], [-26, 18]], lf: [15, 17, 19], lt: [15, 17, 21], stride: 18, kop: -30, borst: -10, al: 16 },
  kever: { kleuren: { schild: '#6E7E3A', schildL: '#A2A856', schildD: '#3E4A24', kop: '#5E6E34', poot: '#9A5A3A', oog: '#1A1614' },
    heup: [[12, -64], [16, -38], [18, -18]], rust: [[-62, -110], [-76, -34], [-70, 50]], lf: [36, 40, 48], lt: [38, 44, 54], stride: 38, kop: -112, borst: -80, al: 10 },
  vlinder: { kleuren: { lijf: '#3A2E28', haar: '#6A5646', boven: '#8E3A36', bovenD: '#5A2422', geel: '#D8B65A', blauw: '#6E8EB8', oog: '#1A1614' },
    heup: [[0, 0], [5, -8], [5, 2]], rust: [[0, 0], [-26, -24], [-26, 20]], lf: [0, 20, 22], lt: [0, 22, 24], stride: 0, kop: -58, borst: -30, al: 30 }
};
function _insPootB(ctx, H, F, lf, lt, kleur, w, kant) { // 2-bots-IK in het vlak, knie naar buiten (kant ±1)
  const dx = F[0] - H[0], dy = F[1] - H[1]; let d = Math.hypot(dx, dy); const dm = (lf + lt) * 0.98; let Fx = F[0], Fy = F[1];
  if (d > dm) { Fx = H[0] + dx / d * dm; Fy = H[1] + dy / d * dm; d = dm; }
  const a = Math.atan2(Fy - H[1], Fx - H[0]); const b = Math.acos(Math.max(-1, Math.min(1, (lf * lf + d * d - lt * lt) / (2 * lf * d))));
  const k1 = [H[0] + Math.cos(a - b) * lf, H[1] + Math.sin(a - b) * lf], k2 = [H[0] + Math.cos(a + b) * lf, H[1] + Math.sin(a + b) * lf];
  const K = (k1[0] * kant > k2[0] * kant) ? k1 : k2; ctx.lineCap = 'round'; ctx.strokeStyle = kleur;
  ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(K[0], K[1]); ctx.stroke();
  ctx.lineWidth = w * 0.72; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(Fx, Fy); ctx.stroke();
  const ux = (Fx - K[0]) / (lt || 1), uy = (Fy - K[1]) / (lt || 1); ctx.lineWidth = w * 0.45; ctx.beginPath(); ctx.moveTo(Fx, Fy); ctx.lineTo(Fx + ux * lt * 0.35, Fy + uy * lt * 0.35); ctx.stroke(); // voet
  return K; }
function insect(ctx, soort, x, y, s = 1, o = {}) {
  const P = INSECT_SOORT[soort] || INSECT_SOORT.bij, K = P.kleuren; const { a = 1, t = 0, rot = 0 } = o; if (a <= 0.01) return;
  const houding = o.houding || (soort === 'vlinder' ? 'vliegen' : 'staan'); const vliegt = houding === 'vliegen' || houding === 'bestuiven';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round';
  const M = (px, py) => [x + (px * Math.cos(rot) - py * Math.sin(rot)) * s, y + (px * Math.sin(rot) + py * Math.cos(rot)) * s];
  const pad = pts => { ctx.beginPath(); bioPad(ctx, pts, true); };
  const ell = (cx, cy, rx, ry, c, r = 0) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, r, 0, 6.283); ctx.fillStyle = c; ctx.fill(); };
  const slag = vliegt ? Math.cos(t * Math.PI * 2) : 1; // van boven: projectie van de vleugel op het vlak
  // ---- poten ----
  for (const kant of [-1, 1]) for (let i = 0; i < 3; i++) { if (soort === 'vlinder' && i === 0) continue;
    const H = [kant * P.heup[i][0], P.heup[i][1]]; let F = [kant * -P.rust[i][0], P.rust[i][1]];
    if (houding === 'lopen') { const groep = (i % 2 === 0) === (kant < 0) ? 0 : 0.5; const p = ((t + groep) % 1 + 1) % 1, duty = 0.55;
      const dy = p < duty ? P.stride * (-0.5 + p / duty) : P.stride * (0.5 - (0.5 - 0.5 * Math.cos(Math.PI * (p - duty) / (1 - duty)))); F = [F[0] + (p < duty ? 0 : kant * 3), F[1] + dy]; }
    if (vliegt) F = [H[0] + kant * 6, H[1] + 14 + i * 4];
    const w = soort === 'kever' ? 5.5 : soort === 'vlinder' ? 2.2 : 2.8; _insPootB(ctx, H, F, P.lf[i], P.lt[i], K.poot || K.lijf, w, kant);
    if (soort === 'bij' && i === 2) { const vol = houding === 'bestuiven' ? 1 : (o.stuifmeel || 0); const kx = (H[0] + F[0]) / 2 + kant * 4, ky = (H[1] + F[1]) / 2 + 3; ell(kx, ky, 3 + vol * 3.5, 5.5 + vol * 3, vol > 0.05 ? '#E0B64A' : K.poot, kant * 0.5); } }
  let A;
  if (soort === 'bij') {
    if (!vliegt) for (const kant of [-1, 1]) { pad([[kant * 6, -32], [kant * 18, -18], [kant * 20, 16], [kant * 12, 44], [kant * 4, 40], [kant * 2, -10]]); ctx.fillStyle = 'rgba(214,226,236,0.30)'; ctx.fill(); } // vleugels plat over het achterlijf (onder het lijf getekend, zichtbaar langs de rand)
    pad([[0, -14], [14, -8], [17, 14], [12, 40], [0, 50], [-12, 40], [-17, 14], [-14, -8]]); ctx.fillStyle = K.band; ctx.fill(); ctx.save(); pad([[0, -14], [14, -8], [17, 14], [12, 40], [0, 50], [-12, 40], [-17, 14], [-14, -8]]); ctx.clip(); ctx.fillStyle = K.donker; for (let k = 0; k < 5; k++) ctx.fillRect(-20, -2 + k * 11, 40, 4.5); ctx.restore();
    ell(0, -28, 17, 16, K.borst); ctx.strokeStyle = K.haar; ctx.lineWidth = 1.1; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 15, -28 + Math.sin(an) * 14); ctx.lineTo(Math.cos(an) * 19, -28 + Math.sin(an) * 18); ctx.stroke(); }
    ell(0, -50, 13, 9, K.kop); ell(-9, -50, 4.5, 7.5, K.oog, 0.3); ell(9, -50, 4.5, 7.5, K.oog, -0.3);
    ctx.strokeStyle = K.kop; ctx.lineWidth = 2; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 3, -57); ctx.lineTo(k * 6, -70); ctx.lineTo(k * 16, -80); ctx.stroke(); }
    if (vliegt || o.vleugelsOpen) for (const kant of [-1, 1]) { const sp = Math.max(0.25, Math.abs(slag)); // voor- en achtervleugel gekoppeld, zijwaarts
      ctx.save(); ctx.translate(kant * 8, -32); ctx.scale(kant * sp, 1); pad([[0, 0], [30, -12], [78, -10], [92, 0], [84, 10], [30, 14], [0, 8]]); ctx.fillStyle = 'rgba(214,226,236,0.36)'; ctx.fill(); ctx.strokeStyle = 'rgba(190,204,218,0.8)'; ctx.lineWidth = 1; ctx.stroke();
      pad([[0, 10], [26, 16], [56, 20], [52, 30], [22, 28], [0, 18]]); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(120,110,96,0.6)'; ctx.beginPath(); ctx.moveTo(2, 2); ctx.lineTo(70, -6); ctx.moveTo(2, 4); ctx.lineTo(56, 6); ctx.stroke(); ctx.restore(); }
    if (houding === 'bestuiven') { ctx.fillStyle = '#E0B64A'; for (let k = 0; k < 14; k++) ell(((k * 37) % 26) - 13, -40 + ((k * 23) % 26), 1.3, 1.3, '#E0B64A'); }
  } else if (soort === 'mier') {
    ell(0, 16, 11, 13, K.donker); ctx.strokeStyle = rgba('#5A4A44', 0.8); ctx.lineWidth = 1; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(0, 10 + k * 7, 10 - k * 1.5, 2, 0, 0, Math.PI); ctx.stroke(); }
    ell(0, 1, 3.5, 2.5, K.borst); pad([[0, -20], [6, -16], [5, -8], [3, -3], [-3, -3], [-5, -8], [-6, -16]]); ctx.fillStyle = K.borst; ctx.fill();
    pad([[0, -38], [9, -35], [11, -27], [7, -21], [-7, -21], [-11, -27], [-9, -35]]); ctx.fillStyle = K.kop; ctx.fill(); ell(-8, -29, 2, 3, K.oog); ell(8, -29, 2, 3, K.oog);
    ctx.strokeStyle = '#5A2E22'; ctx.lineWidth = 1.8; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 3, -37); ctx.lineTo(k * 6, -43); ctx.stroke(); }
    ctx.strokeStyle = K.kop; ctx.lineWidth = 1.6; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 5, -34); ctx.lineTo(k * 16, -42); ctx.lineTo(k * 14, -56); ctx.stroke(); } // geknikte antenne
  } else if (soort === 'kever') {
    const vl = vliegt ? 1 : 0;
    if (vl) for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * 10, -52); ctx.scale(kant * Math.max(0.3, Math.abs(slag)), 1); pad([[0, 0], [60, -10], [150, 10], [140, 40], [60, 40], [0, 20]]); ctx.fillStyle = 'rgba(214,220,226,0.4)'; ctx.fill(); ctx.strokeStyle = 'rgba(160,160,150,0.8)'; ctx.stroke(); ctx.restore(); }
    for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * vl * 26, -vl * 8); ctx.rotate(kant * vl * 0.55); const E = [[0, -58], [kant * 34, -56], [kant * 46, -10], [kant * 44, 50], [kant * 26, 92], [0, 104]]; pad(E); ctx.fillStyle = K.schild; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.save(); pad(E); ctx.clip(); ctx.strokeStyle = rgba(K.schildD, 0.85); ctx.lineWidth = 1.6; for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(kant * k * 8.5, -56); ctx.quadraticCurveTo(kant * k * 10.5, 20, kant * k * 5, 100); ctx.stroke(); }
      ctx.strokeStyle = rgba(K.schildL, 0.55); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kant * 30, -40); ctx.quadraticCurveTo(kant * 38, 20, kant * 26, 70); ctx.stroke(); ctx.restore(); ctx.restore(); }
    pad([[0, -60], [24, -64], [30, -80], [22, -96], [0, -98], [-22, -96], [-30, -80], [-24, -64]]); ctx.fillStyle = K.kop; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.lineWidth = 1.4; ctx.stroke(); // halsschild
    pad([[0, -98], [14, -100], [16, -116], [8, -124], [-8, -124], [-16, -116], [-14, -100]]); ctx.fillStyle = K.kop; ctx.fill(); ell(-14, -112, 4, 5, K.oog); ell(14, -112, 4, 5, K.oog);
    ctx.strokeStyle = '#3A2E22'; ctx.lineWidth = 3.4; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 6, -123); ctx.quadraticCurveTo(k * 10, -136, k * 3, -140); ctx.stroke(); }
    ctx.strokeStyle = K.poot; ctx.lineWidth = 2.4; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 12, -120); for (let j = 1; j <= 11; j++) ctx.lineTo(k * (12 + j * 5.5), -120 - j * 8 + j * j * 0.2); ctx.stroke(); }
  } else { // vlinder: vleugels open; van boven korter naarmate de slag omhoog/omlaag staat
    const sp = houding === 'rust' ? 1 : Math.max(0.12, Math.abs(slag));
    for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * 6, -30); ctx.scale(kant * sp, 1);
      const HV = [[0, 6], [70, 10], [150, 40], [176, 96], [150, 150], [80, 172], [20, 120]], VV = [[0, -2], [80, -40], [180, -76], [260, -80], [276, -50], [240, 10], [170, 60], [70, 52], [8, 20]];
      for (const [pts, oogXY, isV] of [[HV, [140, 70], false], [VV, [210, -40], true]]) { pad(pts); ctx.fillStyle = K.boven; ctx.fill(); ctx.strokeStyle = K.bovenD; ctx.lineWidth = 1.6; ctx.stroke();
        ctx.save(); pad(pts); ctx.clip(); ctx.fillStyle = rgba('#3A2A28', 0.55); ctx.beginPath(); ctx.moveTo(0, 0); for (const p of pts) ctx.lineTo(p[0] * 0.25, p[1] * 0.25); ctx.fill(); // donkere vleugelvoet
        ctx.strokeStyle = rgba('#2A1E1C', 0.8); ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); // donkere zoom
        const [ex, ey] = oogXY; if (isV) { ell(ex, ey, 30, 26, K.geel); ell(ex, ey, 22, 19, '#5E3A5A'); ell(ex - 4, ey - 2, 10, 8, K.blauw); ell(130, -50, 22, 10, '#1E1A1C', -0.35); ell(165, -62, 12, 8, '#E6D8B8', -0.35); }
        else { ell(ex, ey, 30, 32, '#C9B9A0'); ell(ex, ey, 25, 27, '#1E1A1C'); for (let k = 0; k < 4; k++) ell(ex - 8 + k * 5, ey - 8 + k * 5, 4, 4, K.blauw); }
        ctx.restore(); }
      ctx.restore(); }
    ell(0, 30, 9, 50, K.lijf); ell(0, -30, 13, 22, K.lijf); ctx.strokeStyle = K.haar; ctx.lineWidth = 1; for (let k = 0; k < 10; k++) { const an = k / 10 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 12, -30 + Math.sin(an) * 20); ctx.lineTo(Math.cos(an) * 15, -30 + Math.sin(an) * 23); ctx.stroke(); }
    ell(0, -58, 10, 9, K.lijf); ell(-7, -59, 4.5, 5.5, '#4E4038'); ell(7, -59, 4.5, 5.5, '#4E4038');
    ctx.strokeStyle = K.lijf; ctx.lineWidth = 2; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 4, -66); ctx.quadraticCurveTo(k * 16, -110, k * 34, -142); ctx.stroke(); ell(k * 35, -145, 4, 7, K.lijf, k * 0.5); }
  }
  A = { kop: M(0, P.kop), borst: M(0, P.borst), achterlijf: M(0, P.al) };
  ctx.restore(); return A; }

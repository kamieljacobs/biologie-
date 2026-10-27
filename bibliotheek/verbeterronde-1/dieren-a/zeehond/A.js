// GEWONE ZEEHOND (ruggengraat-pop) — variant A: (1) kop met een hoger, ronder voorhoofd (bovenprofiel op 7–16 cm van de
// neus ± 12–17 % hoger), zodat de kop ook klein als zeehondenkop leest en niet als vissenkop; (2) voorflipper donkerder
// (#5A5C58 → #3A3C39) zodat hij op 80 px tegen de lichte flank afsteekt. Rest van de pop ongewijzigd (volledige kopie van
// ZeehondPop, hier ZeehondPopA genoemd zodat hij naast de oude kan laden; bij plakken de oude vervangen en de naam terugzetten).
// Bron voor de kopvorm: Phoca vitulina heeft een ronde kop met kort snuit en een duidelijke stop (zie bron.md).
var ZeehondPopA = (() => {
  const RAD = Math.PI / 180, sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }, fr = (u) => u - Math.floor(u);
  const mix = (h, k, m) => HondPop.mixHex(h, k, m);
  const L = 135, KS = [0, 10, 20, 31, 43, 56, 70, 84, 98, 110, 121, 130, 135]; // gewrichten op s (cm)
  const PROF = [[0, 1.8, 2.4], [3, 3.9, 3.9], [7, 6.9, 5.3], [11, 8.5, 6.6], [16, 8.3, 7.2], [22, 7.9, 7.8], [28, 8.6, 9.0], [40, 11.4, 11.8], [55, 14.2, 14.8], [68, 15.6, 16.2], [82, 15.2, 15.6],
    [96, 12.6, 12.8], [108, 9.4, 9.0], [118, 6.4, 5.8], [126, 4.0, 3.6], [131, 2.6, 2.4], [135, 1.6, 1.6]];
  const prof = (s) => { let i = 0; while (i < PROF.length - 2 && PROF[i + 1][0] < s) i++; const u = Math.max(0, Math.min(1, (s - PROF[i][0]) / (PROF[i + 1][0] - PROF[i][0]))); // Catmull-Rom over de profielwaarden (glad, geen golven)
    const r = []; for (const k of [1, 2]) { const p0 = PROF[Math.max(0, i - 1)][k], p1 = PROF[i][k], p2 = PROF[i + 1][k], p3 = PROF[Math.min(PROF.length - 1, i + 2)][k]; r.push(0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u)); } return r; };
  const PAL = { rug: '#5F625E', flank: '#8B8D87', buik: '#C3C5BD', vlek: '#4A4C48', vlekL: '#6F716C', flipper: '#3A3C39', klauw: '#24221F', neus: '#1A1918', oog: '#100D0C', snor: '#E6E4DC' };
  // keten: hoeken per segment (wereld, 0 = naar achter (-x)... wij leggen de keten van neus (x groot) naar staart: richting = 180° + hoek)
  function keten(hoeken, yaw) { // hoeken[i] = helling van segment i (rad, + = staart omlaag t.o.v. de neus); yaw[i] = zijwaartse buiging (alleen verkorting)
    const P = [[0, 0]]; for (let i = 0; i < KS.length - 1; i++) { const l = (KS[i + 1] - KS[i]) * Math.cos(yaw ? yaw[i] : 0), a = hoeken[i]; const p = P[i]; P.push([p[0] - l * Math.cos(a), p[1] + l * Math.sin(a)]); } return P; }
  function punt(P, s) { let i = 0; while (i < KS.length - 2 && KS[i + 1] < s) i++; const u = (s - KS[i]) / (KS[i + 1] - KS[i]); const a = P[i], b = P[i + 1]; // positie + raaklijn (glad: Catmull-Rom)
    const p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(P.length - 1, i + 2)]; const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2];
    const u2 = u * u, u3 = u2 * u; const h = [2 * u3 - 3 * u2 + 1, u3 - 2 * u2 + u, -2 * u3 + 3 * u2, u3 - u2], d = [6 * u2 - 6 * u, 3 * u2 - 4 * u + 1, -6 * u2 + 6 * u, 3 * u2 - 2 * u];
    const q = [h[0] * a[0] + h[1] * ta[0] + h[2] * b[0] + h[3] * tb[0], h[0] * a[1] + h[1] * ta[1] + h[2] * b[1] + h[3] * tb[1]], t = [d[0] * a[0] + d[1] * ta[0] + d[2] * b[0] + d[3] * tb[0], d[0] * a[1] + d[1] * ta[1] + d[2] * b[1] + d[3] * tb[1]];
    const tl = Math.hypot(t[0], t[1]) || 1; return { p: q, t: [t[0] / tl, t[1] / tl], n: [-t[1] / tl, t[0] / tl] }; } // n = naar boven (rug) bij een keten die naar -x loopt
  // punt op de huid: s langs de keten, v in [-1 (rug), +1 (buik)]
  const huid = (P, s, v) => { const { p, n } = punt(P, s), [b, o] = prof(s); const d = v < 0 ? -v * b : -v * o; return [p[0] + n[0] * d, p[1] + n[1] * d]; };
  function band(P, s0, s1, v0, v1, n = 40) { const A = [], B = []; for (let i = 0; i <= n; i++) { const s = s0 + (s1 - s0) * i / n; const vv0 = typeof v0 === 'function' ? v0(s) : v0, vv1 = typeof v1 === 'function' ? v1(s) : v1; A.push(huid(P, s, vv0)); B.push(huid(P, s, vv1)); } return A.concat(B.reverse()); }
  function pad(ctx, pts) { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); }
  // vlekken (vast in s,v): onregelmatig, dichter op de rug
  const VLEK = []; { let k = 0; for (let i = 0; i < 600 && VLEK.length < 95; i++) { const s = 18 + HondPop.hsh(i * 3.1) * 108, v = -0.95 + HondPop.hsh(i * 7.3 + 2) * 1.35; if (v > 0.15 && HondPop.hsh(i * 1.9) > 0.3) continue;
      if (VLEK.some(q => Math.abs(q[0] - s) < 3.4 && Math.abs(q[1] - v) < 0.2)) continue; VLEK.push([s, v, 0.45 + HondPop.hsh(i * 5.5) * 0.85, HondPop.hsh(i * 9.1)]); k++; } }
  // ---- houdingen -> keten ----
  function houding(o) { const h = o.houding || 'liggen', t = fr(o.t || 0); const n = KS.length - 1; const hk = new Array(n).fill(0); let yaw = null, flip = { voor: 0.15, spreid: [0.55, 0.45], achter: -0.05 }, hoog = 0, dx = 0;
    if (h === 'zwemmen') { yaw = []; for (let i = 0; i < n; i++) { const u = KS[i] / L; const A = 0.42 * Math.pow(Math.max(0, (u - 0.35) / 0.65), 1.6); yaw.push(A * Math.sin(2 * Math.PI * t - 4.2 * u)); hk[i] = 0.025 * Math.sin(2 * Math.PI * 2 * t - 3 * u); }
      hk[0] = hk[1] = -0.04; const sw = Math.sin(2 * Math.PI * t - 4.2); flip = { voor: 0.12, spreid: [Math.max(0.06, sw), Math.max(0.06, -sw)], achter: 0.1 * Math.sin(2 * Math.PI * t - 4.2), yaw: 0.6 * Math.cos(2 * Math.PI * t - 4.2) }; hoog = 24; }
    else { // liggen / rupsen: achterlijf plat, kop omhoog; rupsen = bult in de lende die groeit (borst vast) en weer verdwijnt (bekken vast)
      const a = h === 'rupsen' ? Math.pow(Math.sin(Math.PI * t), 2) : 0; const kopOp = (o.kopOp ?? 1) * (h === 'rupsen' ? 0.7 + 0.5 * (t > 0.5 ? Math.sin(Math.PI * (t - 0.5) * 2) : 0) : 1);
      hk[0] = 0.62 * kopOp; hk[1] = 0.56 * kopOp; hk[2] = 0.36 * kopOp; hk[3] = 0.1 * kopOp; // kop en hals omhoog (neus iets omlaag t.o.v. de hals)
      const bult = [0, 0, 0, 0, -0.08, -0.32, -0.38, 0.12, 0.42, 0.32, 0.1, 0.02]; for (let i = 0; i < n; i++) hk[i] += bult[i] * a * 1.1;
      hk[10] += 0.06; hk[11] += 0.1; // staartstompje iets omlaag, flippers op de grond
      flip = { voor: h === 'rupsen' ? 0.3 - 0.3 * Math.sin(2 * Math.PI * t) : 0.22, spreid: [0.3, 0.22], achter: -0.26 + 0.12 * a }; }
    const P = keten(hk, yaw); return { P, flip, hoog, h, t }; }
  // ---- delen ----
  function voorflipper(ctx, P, f, pal, ver) { const { p, t } = punt(P, 34), [, o] = prof(34); const n = [-t[1], t[0]]; const root = [p[0] - n[0] * o * 0.55, p[1] - n[1] * o * 0.55];
    ctx.save(); ctx.translate(root[0], root[1]); ctx.rotate(Math.atan2(t[1], t[0]) - (ver ? 0.15 : 0) - f.voor); // as: langs het lijf naar achter, dan omlaag draaien
    const F = HondPop.spline([[-3.5, -3.0], [5, -3.3], [12, -2.6], [17, -1.2], [18.4, 0.8], [16.6, 2.5], [9, 3.2], [1, 3.4], [-3.5, 2.4]]);
    pad(ctx, F); ctx.fillStyle = ver ? mix(pal.flipper, 0.3, '#2E2C2A') : pal.flipper; ctx.fill();
    if (!ver) { ctx.fillStyle = pal.klauw; for (let i = 0; i < 4; i++) { const y = -1.6 + i * 1.15; ctx.beginPath(); ctx.moveTo(16.6 + i * 0.25, y - 0.3); ctx.lineTo(18.8 + i * 0.1, y + 0.1); ctx.lineTo(16.8 + i * 0.25, y + 0.45); ctx.closePath(); ctx.fill(); } }
    ctx.restore(); }
  function achterflipper(ctx, P, f, spreid, dy, pal, ver) { const { p, t } = punt(P, 131); ctx.save(); ctx.translate(p[0], p[1] + dy); ctx.rotate(Math.atan2(t[1], t[0]) - f.achter); // as naar achter (+x lokaal = weg van het lijf)
    const lf = 24 * (f.yaw != null ? 0.82 + 0.18 * Math.abs(Math.cos(f.yaw)) : 1), b = 1.2 + 11 * spreid; // waaier: tenen 1 en 5 langer (holle achterrand)
    const F = [[-2, -2.4], [6, -2.6 - b * 0.25], [lf, -b], [lf - 4.5, -b * 0.35], [lf - 6, 0], [lf - 4.5, b * 0.35], [lf, b], [6, 2.6 + b * 0.25], [-2, 2.4]];
    pad(ctx, F); ctx.fillStyle = ver ? mix(pal.flipper, 0.35, '#2E2C2A') : pal.flipper; ctx.fill();
    if (!ver && spreid > 0.3) { ctx.strokeStyle = mix(pal.flipper, 0.35, '#1C1B1A'); ctx.lineWidth = 0.35; for (const k of [-0.6, -0.2, 0.2, 0.6]) { ctx.beginPath(); ctx.moveTo(4, k * 2.2); ctx.lineTo(lf - 5.5 + Math.abs(k) * 4, k * b * 0.95); ctx.stroke(); } }
    ctx.restore(); }
  function omtrek(P) { const N = 90, A = [], B = []; for (let i = 0; i <= N; i++) { const s = L * i / N; A.push(huid(P, s, -1)); B.push(huid(P, s, 1)); } return A.concat(B.reverse()); }
  function teken(ctx, x, y, s, o = {}) {
    if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas) { if ((o.a ?? 1) <= 0.01) return; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
      k.setTransform(ctx.getTransform()); teken(k, x, y, s, Object.assign({}, o, { a: 1 })); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return; }
    const H = houding(o), P = H.P, pal = PAL; const OM = omtrek(P);
    // plaatsen: liggen/rupsen -> laagste buikpunt op de grond; zwemmen -> lijf 'hoog' cm boven y; x: anker = midden van de romp (s = 70), rupsen schuift (borst of bekken vast)
    let minY = -1e9; for (const q of OM) minY = Math.max(minY, q[1]); let ox = -punt(P, 66).p[0], oy = H.hoog ? -H.hoog - prof(68)[1] - punt(P, 68).p[1] : -minY + 1.6; // op het land zakt de buik ±1,6 cm plat (weggeknipt)
    if (H.h === 'rupsen') { const ruw = (tt) => { const Q = houding(Object.assign({}, o, { t: tt })).P; return { f: huid(Q, 40, 1)[0], r: huid(Q, 104, 1)[0] }; }; const r0 = ruw(0), rm = ruw(0.5), D0 = r0.f - r0.r, Dm = rm.f - rm.r, adv = D0 - Dm;
      const cur = ruw(H.t); let off; if (H.t < 0.5) off = r0.f - cur.f; else off = (r0.f - Dm) - cur.r; // borst vast, dan bekken vast (per cyclus adv cm vooruit)
      ox = -punt(houding({ houding: 'liggen' }).P, 66).p[0] + off + (o.wereld ? adv * H.t : 0); }
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
    if (!H.hoog) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400.3); ctx.clip(); } // op het land: flippers niet door de grond
    ctx.translate(ox, oy); ctx.lineJoin = 'round';
    const sp = H.flip.spreid, ver = (fn) => fn(true), nb = (fn) => fn(false);
    // twee passes: lichte rand om het silhouet, dan de vlakken (achter naar voor: verre achterflipper, verre voorflipper, lijf, nabije achterflipper, nabije voorflipper)
    const delen = [(m) => achterflipper(ctx, P, H.flip, sp[1], -1.2, pal, true), (m) => voorflipper(ctx, P, H.flip, pal, true), 'lijf', (m) => achterflipper(ctx, P, H.flip, sp[0], 0.8, pal, false), (m) => voorflipper(ctx, P, H.flip, pal, false)];
    const randK = mix(pal.flank, 0.3, '#F2EEE6');
    for (const d of delen) { if (d === 'lijf') { pad(ctx, OM); ctx.strokeStyle = randK; ctx.lineWidth = 1.1; ctx.stroke(); continue; } ctx.save(); ctx.globalCompositeOperation = 'source-over'; const f = ctx.fill; ctx.fill = function () { ctx.strokeStyle = randK; ctx.lineWidth = 1.1; ctx.stroke(); }; d(); ctx.fill = f; ctx.restore(); }
    for (const d of delen) { if (d !== 'lijf') { d(); continue; }
      pad(ctx, OM); ctx.fillStyle = pal.flank; ctx.fill(); ctx.save(); pad(ctx, OM); ctx.clip();
      pad(ctx, band(P, -2, L + 2, -1.3, (s) => -0.38 + 0.12 * Math.sin(s * 0.11))); ctx.fillStyle = pal.rug; ctx.fill(); // donkere rug
      pad(ctx, band(P, -2, L + 2, (s) => s < 20 ? 0.15 + 0.2 * (1 - s / 20) : 0.42 - 0.05 * Math.sin(s * 0.09), 1.3)); ctx.fillStyle = pal.buik; ctx.fill(); // lichte buik en keel
      for (const [vs, vv, r, k] of VLEK) { const q = huid(P, vs, vv); ctx.fillStyle = vv < -0.35 ? pal.vlekL : pal.vlek; ctx.beginPath(); ctx.ellipse(q[0], q[1], r * 1.25, r * 0.8, k * 3, 0, 6.283); ctx.fill(); }
      // snuit: lichte snorharenkussens, neusgat, mond
      const sn = huid(P, 4.5, 0.25); ctx.fillStyle = mix(pal.buik, 0.15, '#FFFFFF'); ctx.beginPath(); ctx.ellipse(sn[0], sn[1], 3.6, 2.6, 0, 0, 6.283); ctx.fill();
      ctx.restore();
      const no = huid(P, 0.8, -0.35), oo = huid(P, 12.5, -0.3), oor = huid(P, 21, -0.15), m0 = huid(P, 1.5, 0.5), m1 = huid(P, 7.5, 0.55);
      ctx.fillStyle = pal.neus; ctx.beginPath(); ctx.ellipse(no[0], no[1], 0.9, 0.55, 0.5, 0, 6.283); ctx.fill();
      ctx.strokeStyle = '#2A2826'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(m0[0], m0[1]); ctx.quadraticCurveTo((m0[0] + m1[0]) / 2, m1[1] + 0.6, m1[0], m1[1]); ctx.stroke();
      ctx.fillStyle = pal.oog; ctx.beginPath(); ctx.ellipse(oo[0], oo[1], 1.85, 1.6, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(oo[0] + 0.55, oo[1] - 0.55, 0.42, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#3A3B38'; ctx.beginPath(); ctx.arc(oor[0], oor[1], 0.45, 0, 6.283); ctx.fill(); // gehooropening, geen oorschelp
      ctx.strokeStyle = pal.snor; ctx.lineWidth = 0.16; for (let i = 0; i < 5; i++) { const a = huid(P, 3.2 + i * 0.6, 0.1 + i * 0.07); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(a[0] + 5, a[1] - 0.6 + i * 0.4, a[0] + 9.5, a[1] + 0.8 + i * 1.3); ctx.stroke(); }
    }
    ctx.restore(); }
  function vooruit() { const r = (tt) => { const Q = houding({ houding: 'rupsen', t: tt }).P; return huid(Q, 40, 1)[0] - huid(Q, 104, 1)[0]; }; return r(0) - r(0.5); } // cm per rupscyclus
  return { teken, houding, punt, prof, L, vooruit };
})();
function zeehond(ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o); oo.houding = { lopen: 'rupsen', kruipen: 'rupsen', staan: 'liggen' }[oo.houding] || oo.houding || 'liggen'; return ZeehondPopA.teken(ctx, x, y, s * 414 / 159, oo); }

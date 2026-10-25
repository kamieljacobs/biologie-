// ---- uit bibliotheek/dieren/lib_dieren.js: dierOog + wolf_pop.js (goedgekeurde wolf) ----
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
// Wolf als uitknippop (cut-out rig), 23 okt 2026 — proef WOLFPOP.md
// Werkwijze: skelet uit gewrichtspunten op het ElevenLabs-modelblad (houding 1 = rust), delen getekend in de stijl van de
// samengestelde wolf op het uitknipvel (3 tonen: donker zadel, grijs-tan flank, creme buik/poten), elk deel aan één bot,
// romp/nek/staart met zachte gewichten over 2-3 botten (geen naad), poten als losse delen met ronde overlap.
// Houdingen = bothoeken gemeten op het modelblad (tabellen hieronder); lopen/draven = gangmodel met vaste steunvoet en 2-bots-IK.
// API: wolfPop(ctx, x, y, schaal, o)  x,y = midden onder het dier op de grond; schaal = px per cm (schofthoogte 80 cm).
//   o.houding: 'staan' | 'lopen' | 'draven' | 'zitten' | 'liggen' | 'huilen' (ook 'contact', 'passeer', 'draf' = modelblad 2-4)
//   o.t: 0-1 (cyclus bij lopen/draven), o.kijk: -1 spiegelt, o.a: dekking, o.wereld: true = dier schuift S*t mee (steunvoet staat stil)

// <<TABELLEN (gegenereerd door referentie/wolfpop/meet_houdingen.py; niet met de hand aanpassen)
const WP_K = 2.9750, WP_X0 = 168, WP_G0 = 300; // px op modelblad -> cm
const WP_BOTEN = [["rompV",null,"midrug","nekBasis"],["rompA",null,"midrug","kruis"],["nek","rompV","nekBasis","kop"],["kop","nek","kop","neus"],["kaak","kop","kaak","kin"],["scap","rompV","schoft","schouder"],["hum","scap","schouder","elleboog"],["rad","hum","elleboog","pols"],["mc","rad","pols","vkogel"],["vp","mc","vkogel","vteen"],["scapF","rompV","schoft","schouder"],["humF","scapF","schouder","elleboog"],["radF","humF","elleboog","pols"],["mcF","radF","pols","vkogel"],["vpF","mcF","vkogel","vteen"],["dij","rompA","heup","knie"],["schn","dij","knie","hak"],["mt","schn","hak","akogel"],["ap","mt","akogel","ateen"],["dijF","rompA","heup","knie"],["schnF","dijF","knie","hak"],["mtF","schnF","hak","akogel"],["apF","mtF","akogel","ateen"],["st0","rompA","staart0","staart1"],["st1","st0","staart1","staart2"],["st2","st1","staart2","staart3"]];
const WP_J = {"midrug":[2.353,-68.908],"nekBasis":[31.597,-68.908],"kop":[51.765,-81.345],"neus":[77.311,-71.261],"kaak":[63.193,-68.571],"kin":[73.277,-68.235],"schoft":[26.218,-73.95],"kruis":[-29.58,-68.908],"schouder":[39.328,-59.16],"elleboog":[27.563,-37.311],"pols":[27.899,-13.445],"vkogel":[31.597,-3.697],"vteen":[38.319,-1.008],"heup":[-28.908,-60.504],"knie":[-20.504,-37.983],"hak":[-37.311,-18.151],"akogel":[-35.63,-3.697],"ateen":[-28.908,-1.008],"staart0":[-34.958,-69.916],"staart1":[-42.353,-51.092],"staart2":[-46.387,-33.613],"staart3":[-45.042,-14.118],"elleboogF":[32.269,-36.975],"polsF":[33.277,-13.109],"vkogelF":[38.319,-3.697],"vteenF":[45.042,-1.008],"knieF":[-14.79,-41.345],"hakF":[-26.555,-18.151],"akogelF":[-24.202,-3.697],"ateenF":[-17.479,-1.008]};
const WP_HOUDING = {"staan":{"R":[2.35,-68.91],"A":{"rompV":0.0,"rompA":180.0,"nek":-31.7,"kop":21.5,"kaak":1.9,"scap":48.4,"hum":118.3,"rad":89.2,"mc":69.2,"vp":21.8,"dij":69.5,"schn":130.3,"mt":83.4,"ap":21.8,"scapF":48.4,"humF":113.6,"radF":80.4,"mcF":61.8,"vpF":21.8,"dijF":53.6,"schnF":117.3,"mtF":80.8,"apF":21.8,"st0":111.4,"st1":103.0,"st2":86.1}},"contact":{"R":[2.35,-63.87],"A":{"rompV":1.3,"rompA":-177.6,"nek":-41.4,"kop":12.8,"kaak":-6.9,"scap":49.8,"hum":104.7,"rad":51.8,"mc":43.3,"vp":15.4,"dij":49.1,"schn":99.2,"mt":41.3,"ap":18.4,"scapF":49.8,"humF":131.1,"radF":116.2,"mcF":70.0,"vpF":20.0,"dijF":94.3,"schnF":144.8,"mtF":84.0,"apF":20.0,"st0":113.8,"st1":113.5,"st2":116.3}},"passeer":{"R":[2.35,-64.2],"A":{"rompV":0.7,"rompA":-177.6,"nek":-39.8,"kop":12.1,"kaak":-7.5,"scap":49.1,"hum":137.1,"rad":72.7,"mc":149.6,"vp":153.4,"dij":45.3,"schn":103.6,"mt":51.7,"ap":17.7,"scapF":49.1,"humF":120.5,"radF":56.9,"mcF":67.2,"vpF":13.1,"dijF":96.6,"schnF":143.0,"mtF":78.1,"apF":20.9,"st0":113.5,"st1":115.4,"st2":111.7}},"draf":{"R":[2.35,-61.18],"A":{"rompV":2.6,"rompA":180.0,"nek":-16.7,"kop":10.0,"kaak":-9.6,"scap":51.1,"hum":150.9,"rad":62.4,"mc":159.0,"vp":156.5,"dij":37.1,"schn":99.9,"mt":39.8,"ap":17.1,"scapF":51.1,"humF":90.6,"radF":34.0,"mcF":49.1,"vpF":25.3,"dijF":77.8,"schnF":157.9,"mtF":112.4,"apF":126.9,"st0":123.9,"st1":120.4,"st2":111.3}},"zitten":{"R":[2.35,-34.29],"A":{"rompV":-58.1,"rompA":130.0,"nek":-58.8,"kop":4.4,"kaak":-15.2,"scap":-9.7,"hum":108.5,"rad":84.4,"mc":71.6,"vp":17.1,"dij":-100.3,"schn":68.6,"mt":4.0,"ap":13.1,"scapF":-9.7,"humF":102.1,"radF":78.5,"mcF":66.0,"vpF":16.3,"dijF":-95.8,"schnF":66.6,"mtF":5.1,"apF":14.0,"st0":165.1,"st1":6.4,"st2":4.0}},"liggen":{"R":[2.35,-22.52],"A":{"rompV":-8.0,"rompA":177.5,"nek":-60.6,"kop":7.6,"kaak":-12.0,"scap":40.4,"hum":83.0,"rad":-29.1,"mc":3.6,"vp":8.1,"dij":-0.0,"schn":160.1,"mt":6.2,"ap":8.4,"scapF":40.4,"humF":85.0,"radF":-37.0,"mcF":5.4,"vpF":7.1,"dijF":-26.4,"schnF":135.6,"mtF":6.2,"apF":8.4,"st0":107.0,"st1":9.9,"st2":-4.1}},"huilen":{"R":[2.35,-38.43],"A":{"rompV":-53.7,"rompA":131.2,"nek":-51.9,"kop":-58.3,"kaak":-59.6,"scap":-5.3,"hum":83.9,"rad":83.1,"mc":68.2,"vp":17.4,"dij":-60.6,"schn":83.7,"mt":2.2,"ap":16.7,"scapF":-5.3,"humF":92.6,"radF":79.3,"mcF":81.9,"vpF":17.4,"dijF":-61.8,"schnF":77.5,"mtF":3.4,"apF":17.5,"st0":62.2,"st1":-152.6,"st2":-171.7}},"drafvol":{"R":[2.35,-64.43],"A":{"rompV":4.6,"rompA":179.3,"nek":-10.1,"kop":19.3,"kaak":-0.4,"scap":53.1,"hum":89.7,"rad":29.0,"mc":26.6,"vp":11.3,"dij":121.3,"schn":158.8,"mt":125.2,"ap":122.5,"scapF":53.1,"humF":158.6,"radF":95.7,"mcF":160.3,"vpF":143.1,"dijF":37.4,"schnF":98.5,"mtF":46.6,"apF":8.5,"st0":158.3,"st1":149.3,"st2":144.8}},"snuffelen":{"R":[2.35,-64.56],"A":{"rompV":26.6,"rompA":-178.5,"nek":54.3,"kop":58.0,"kaak":38.4,"scap":75.0,"hum":175.2,"rad":81.4,"mc":69.4,"vp":22.4,"dij":43.4,"schn":111.8,"mt":58.8,"ap":16.9,"scapF":75.0,"humF":140.5,"radF":32.1,"mcF":42.0,"vpF":21.8,"dijF":65.9,"schnF":138.7,"mtF":74.1,"apF":25.0,"st0":94.4,"st1":114.3,"st2":105.6}}};
// TABELLEN>>

const WolfPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);

  // ---------- skelet ----------
  const BOT = {}, ORDE = [];
  for (const [n, par, j0, j1] of WP_BOTEN) {
    const v = sub(WP_J[j1], WP_J[j0]);
    BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: WP_J[j0] }; ORDE.push(n);
  }
  for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
  const ROOT0 = WP_J.midrug;

  // ---------- kleuren ----------
  const PAL = { zadel: '#4D4B48', grijsD: '#67635E', grijs: '#837E78', grijsL: '#A39C93', flank: '#9B8F7F', tan: '#B0976F',
    licht: '#C8BBA6', creme: '#E4DACA', neus: '#1D1B1A', klauw: '#24211F', oorbin: '#D8C7B1', pad: '#3B3633', mond: '#2A2220', tong: '#B86A64' };
  const NAVY = '#16213A';
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], 0.34, '#3E3A36');
  const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6'); // lichte randlijn om het silhouet
  const rand = (c) => mixHex(c, 0.42, '#0B111C');

  // ---------- tekenvormen: punten in px van modelblad houding 1, omgezet naar cm ----------
  const cm = (p) => [(p[0] - WP_X0) / WP_K, (p[1] - WP_G0) / WP_K];
  function hsh(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  // gesloten Catmull-Rom door de punten (punt met 3e waarde 1 = scherpe hoek), dicht bemonsterd; idx = index per controlepunt
  function spline(P) {
    const n = P.length, out = [], idx = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.8)); idx.push(out.length);
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u;
        const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); }
    }
    return { pts: out, idx };
  }
  // vachtpieken op een stuk van de omtrek: [i0, i1, hoogte, breedte, stroming(-1 = naar achter)]
  function pieken(S, spans, seed) {
    const pts = S.pts, n = pts.length; let area = 0;
    for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
    const sg = area > 0 ? 1 : -1; const vervang = [];
    spans.forEach(([i0, i1, amp, w, flow = -1], si) => {
      const a = S.idx[i0], b = S.idx[i1]; const seg = []; for (let i = a; ; i = (i + 1) % n) { seg.push(i); if (i === b) break; }
      const cum = [0]; for (let k = 1; k < seg.length; k++) cum.push(cum[k - 1] + len(sub(pts[seg[k]], pts[seg[k - 1]])));
      const tot = cum[cum.length - 1]; const at = (s) => { let k = 1; while (k < cum.length - 1 && cum[k] < s) k++; const u = (s - cum[k - 1]) / Math.max(1e-6, cum[k] - cum[k - 1]); const p = pts[seg[k - 1]], q = pts[seg[k]]; return [[p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u], sub(q, p)]; };
      const nieuw = []; let s = 0, j = 0;
      while (s < tot - 0.5) { const ww = w * (0.75 + 0.5 * hsh(seed * 31 + si * 7 + j)); const e = Math.min(tot, s + ww);
        const [p0] = at(s); const [pm, tg] = at((s + e) / 2); const tl = len(tg) || 1; const t = [tg[0] / tl, tg[1] / tl];
        const nrm = [sg * t[1], -sg * t[0]]; const lean = (t[0] * flow > 0 ? 1 : -1) * 0.7 * ww;
        const h = amp * (0.6 + 0.7 * hsh(seed * 17 + si * 13 + j * 3));
        const [p1] = at(e); const tip = [pm[0] + t[0] * lean + nrm[0] * h, pm[1] + t[1] * lean + nrm[1] * h];
        nieuw.push(p0, [p0[0] + (tip[0] - p0[0]) * 0.5 + nrm[0] * h * 0.16, p0[1] + (tip[1] - p0[1]) * 0.5 + nrm[1] * h * 0.16], tip, [tip[0] + (p1[0] - tip[0]) * 0.55 - nrm[0] * h * 0.08, tip[1] + (p1[1] - tip[1]) * 0.55 - nrm[1] * h * 0.08]); s = e; j++; }
      nieuw.push(at(tot)[0]); vervang.push({ a, b, nieuw });
    });
    // bouw nieuwe lijst: vervang segmenten (oplopend, zonder wrap-overlap)
    vervang.sort((p, q) => p.a - q.a); const res = []; let i = 0;
    const wrap = vervang.find(v => v.b < v.a);
    if (wrap) { i = wrap.b + 1; }
    const eind = wrap ? wrap.a : n;
    for (const v of vervang) { if (v === wrap) continue; while (i < v.a) res.push(pts[i++]); res.push(...v.nieuw); i = v.b + 1; }
    while (i < eind) res.push(pts[i++]); if (wrap) res.push(...wrap.nieuw);
    return res;
  }
  function open(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.8));
      for (let k = 0; k <= st; k++) { const u = k / st, u2 = u * u, u3 = u2 * u; out.push([(2 * u3 - 3 * u2 + 1) * a[0] + (u3 - 2 * u2 + u) * ta[0] + (-2 * u3 + 3 * u2) * b[0] + (u3 - u2) * tb[0], (2 * u3 - 3 * u2 + 1) * a[1] + (u3 - 2 * u2 + u) * ta[1] + (-2 * u3 + 3 * u2) * b[1] + (u3 - u2) * tb[1]]); } } return out; }
  function vorm(def, seed) { if (def.lijn) return open(def.p.map(cm)); const P = def.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; }); const S = spline(P);
    const spans = (def.t || []).map(([i0, i1, a, w, f]) => [i0, i1, a / WP_K, w / WP_K, f]); return spans.length ? pieken(S, spans, seed) : S.pts; }

  // ---- de delen (px op modelblad, houding 1) ----
  const DELEN = {
    romp: { skin: 'romp', lagen: [
      { c: 'flank', p: [[68, 90], [88, 77], [115, 71], [145, 70], [175, 69], [205, 66], [228, 62], [252, 62], [272, 72], [292, 96], [306, 122], [310, 148], [300, 166], [282, 176], [258, 180], [238, 177], [215, 169], [192, 160], [168, 153], [148, 147], [128, 144], [112, 156], [95, 178], [72, 182], [52, 165], [44, 135], [50, 105]],
        t: [[1, 7, 2, 20], [15, 20, 4, 16]] },
      { c: 'zadel', p: [[40, 100], [62, 78], [90, 66], [120, 62], [170, 60], [205, 57], [232, 54], [258, 56], [282, 70], [270, 92], [258, 108], [249, 124], [241, 143], [232, 128], [222, 112], [200, 108], [176, 105], [150, 108], [126, 105], [100, 109], [78, 119], [52, 128]],
        t: [[9, 21, 6, 17]] },
      { c: 'grijsD', p: [[226, 70], [262, 66], [272, 84], [262, 100], [252, 112], [246, 96], [236, 84]], t: [[3, 6, 5, 11]] },
      { c: 'creme', p: [[300, 112], [312, 140], [312, 170], [282, 182], [258, 186], [238, 185], [215, 178], [192, 168], [168, 160], [148, 154], [124, 150], [116, 140], [136, 135], [160, 140], [186, 145], [210, 148], [232, 148], [252, 147], [270, 140], [285, 128]],
        t: [[11, 19, 5, 16, 1]] },
    ] },
    staart: { skin: 'staart', lagen: [
      { c: 'grijs', p: [[56, 86], [72, 90], [74, 110], [68, 140], [62, 175], [60, 205], [56, 232], [48, 252], [37, 266], [28, 260], [19, 242], [14, 214], [16, 182], [22, 150], [34, 118], [46, 96]],
        t: [[3, 7, 3.5, 22, 1], [9, 14, 4, 22, 1]] },
      { c: 'zadel', p: [[56, 82], [44, 92], [30, 116], [18, 148], [11, 182], [10, 214], [22, 208], [30, 178], [38, 148], [48, 120], [60, 100]], t: [[6, 10, 4, 18, 1]] },
      { c: 'licht', p: [[74, 98], [78, 112], [72, 140], [66, 170], [58, 166], [62, 140], [66, 112]], t: [[4, 6, 4, 10, 1]] },
      { c: 'zadel', p: [[62, 224], [54, 248], [40, 270], [26, 266], [15, 246], [12, 220], [26, 228], [44, 230]], t: [[5, 7, 5, 11, 1]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'grijs', p: [[232, 66], [255, 52], [278, 40], [300, 30], [318, 27], [334, 40], [344, 62], [350, 88], [348, 100], [340, 114], [332, 132], [324, 150], [314, 170], [296, 174], [284, 160], [272, 140], [262, 118], [250, 98], [238, 82]],
        t: [[0, 4, 4.5, 16, -1], [10, 13, 6, 15, -1], [13, 18, 6, 15, -1]] },
      { c: 'zadel', p: [[226, 60], [252, 46], [278, 34], [300, 24], [320, 22], [330, 38], [308, 50], [290, 62], [274, 78], [260, 92], [244, 86]], t: [[5, 10, 6, 16, -1]] },
      { c: 'grijsL', p: [[266, 104], [282, 86], [300, 72], [318, 72], [326, 88], [314, 106], [298, 124], [282, 138], [272, 126]], t: [[3, 7, 5, 11, -1], [7, 0, 4, 11, -1]] },
      { c: 'creme', p: [[352, 86], [350, 100], [342, 114], [334, 132], [326, 150], [316, 172], [296, 176], [292, 160], [302, 144], [312, 126], [320, 110], [330, 96]], t: [[5, 8, 7, 12, -1], [8, 11, 5, 12, -1]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'grijsD', p: [[340, 46], [349, 22, 1], [357, 7, 1], [364, 24], [366, 48]] }] },
    kaak: { bot: 'kaak', lagen: [{ c: 'creme', p: [[346, 94], [366, 93], [384, 93], [391, 95], [384, 100], [366, 104], [350, 106], [338, 102]] }] },
    kop: { bot: 'kop', lagen: [
      { c: 'grijs', p: [[314, 36], [332, 30], [350, 33], [362, 45], [372, 57], [384, 67], [394, 76], [400, 84], [400, 90], [393, 94], [380, 94], [366, 95], [354, 100], [340, 105], [326, 101], [316, 90], [309, 74], [309, 54]],
        t: [[13, 17, 6, 10, -1]] },
      { c: 'grijsD', p: [[312, 34], [332, 28], [352, 31], [364, 44], [370, 54], [358, 51], [345, 47], [330, 46], [318, 52]] },
      { c: 'grijsL', p: [[360, 50], [376, 60], [392, 74], [398, 82], [388, 82], [374, 74], [362, 64], [352, 58]] },
      { c: 'creme', p: [[336, 64], [348, 66], [362, 72], [378, 80], [392, 86], [401, 88], [400, 91], [393, 95], [380, 95], [366, 96], [354, 101], [340, 106], [326, 102], [318, 88], [326, 74]], t: [[11, 14, 6, 10, -1]] },
      { c: 'creme', p: [[346, 49], [356, 48], [360, 52], [350, 54]] },
      { c: 'neus', p: [[388, 80], [396, 78], [402, 83], [401, 90], [394, 90], [388, 86]] },
    ] },
    oor: { bot: 'kop', lagen: [
      { c: 'grijsD', p: [[323, 48], [330, 26, 1], [338, 5, 1], [349, 22], [355, 44]] },
      { c: 'oorbin', p: [[331, 44], [335, 25], [338, 13, 1], [345, 25], [348, 42]] },
      { c: 'grijsL', lijn: 1.2, p: [[333, 40], [337, 28], [339, 18]] },
    ] },
    hum: { bot: 'hum', skin: 'hum', lagen: [
      { c: 'creme', p: [[292, 108], [306, 128], [302, 150], [286, 170], [268, 183], [250, 190], [238, 182], [244, 162], [258, 140], [274, 116]] },
      { c: 'flank', p: [[270, 104], [294, 106], [290, 130], [274, 152], [256, 172], [242, 182], [236, 170], [246, 150], [258, 128]], t: [[2, 5, 4, 12, -1]] },
      { c: 'licht', lijn: 1.2, p: [[246, 156], [240, 170], [242, 182]] },
    ] },
    rad: { bot: 'rad', lagen: [
      { c: 'creme', p: [[240, 176], [260, 170], [266, 188], [264, 214], [262, 240], [261, 256], [256, 266], [246, 266], [243, 250], [243, 226], [242, 202], [238, 190]] },
      { c: 'tan', p: [[258, 192], [266, 196], [264, 220], [262, 240], [259, 248], [259, 220], [257, 200]] },
    ] },
    mc: { bot: 'mc', lagen: [
      { c: 'creme', p: [[243, 254], [261, 251], [267, 274], [267, 290], [257, 293], [249, 286], [244, 268]] },
      { c: 'pad', p: [[238, 258], [243, 257], [244, 264], [239, 265]] },
    ] },
    vp: { bot: 'vp', voet: true, lagen: [
      { c: 'creme', p: [[250, 283], [264, 280], [277, 284], [286, 291], [288, 298], [282, 301], [260, 301], [251, 298], [248, 291]] },
    ] },
    dij: { bot: 'dij', skin: 'dij', lagen: [
      { c: 'flank', p: [[58, 106], [84, 99], [107, 106], [122, 125], [127, 147], [124, 167], [116, 183], [106, 193], [92, 193], [76, 185], [60, 171], [48, 153], [44, 130]] },
      { c: 'zadel', p: [[44, 100], [80, 92], [110, 98], [122, 110], [102, 114], [80, 113], [58, 120], [42, 126]], t: [[3, 7, 5, 13]] },
      { c: 'creme', p: [[39, 138], [43, 156], [55, 173], [73, 188], [92, 197], [80, 182], [64, 167], [53, 151], [48, 137]], t: [[4, 8, 4, 12, -1]] },
      { c: 'licht', lijn: 1.2, p: [[121, 132], [126, 150], [123, 168], [114, 184]] },
    ] },
    schn: { bot: 'schn', lagen: [
      { c: 'flank', p: [[98, 176], [120, 182], [117, 200], [100, 219], [82, 238], [69, 256], [55, 256], [49, 244], [48, 224], [52, 206], [62, 192], [80, 182]], t: [[7, 10, 4, 12, -1]] },
      { c: 'licht', lijn: 1.4, p: [[118, 190], [111, 208], [96, 224], [80, 240], [71, 252]] },
      { c: 'creme', p: [[42, 248], [45, 224], [49, 206], [58, 190], [70, 190], [62, 208], [58, 228], [57, 252], [50, 259]], t: [[0, 3, 4, 12, -1]] },
    ] },
    mt: { bot: 'mt', lagen: [{ c: 'creme', p: [[48, 240], [62, 241], [66, 260], [67, 282], [65, 292], [55, 292], [52, 272], [50, 256]] }] },
    ap: { bot: 'ap', voet: true, lagen: [{ c: 'creme', p: [[51, 283], [65, 280], [78, 284], [87, 291], [89, 298], [83, 301], [61, 301], [52, 298], [48, 291]] }] },
  };

  // poot-tekening (tenen, klauwen) in px: per voetdeel
  const TENEN = { vp: { teen: [[270, 290, 272, 300], [278, 289, 281, 300]], klauw: [[266, 300], [275, 300], [285, 299]] },
                  ap: { teen: [[71, 290, 73, 300], [79, 289, 82, 300]], klauw: [[67, 300], [76, 300], [86, 299]] } };

  // vormen voorbereiden (dicht bemonsterd, in cm, ruststand)
  const PREP = {};
  let seed = 1;
  for (const k in DELEN) { const d = DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, lagen: d.lagen.map(l => ({ c: l.c, lijn: l.lijn ? l.lijn / WP_K : 0, pts: vorm(l, seed++) })) }; }
  const TEEN = {}; for (const k in TENEN) TEEN[k] = { teen: TENEN[k].teen.map(([a, b, c, d]) => [cm([a, b]), cm([c, d])]), klauw: TENEN[k].klauw.map(cm) };
  const OOG = cm([356, 57]), OOGLIJN = [cm([345, 58]), cm([351, 53]), cm([361, 53]), cm([368, 58]), cm([360, 62]), cm([350, 61])];
  const MOND = [cm([366, 94]), cm([378, 94]), cm([389, 93])];

  // ---------- gewichten voor de buigzame delen ----------
  function projectie(v, keten) { // keten: lijst punten; geeft parameter u (segment + fractie)
    let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
  const GEW = {
    romp: (v) => { const w = sstep((v[0] - cm([130, 0])[0]) / (cm([215, 0])[0] - cm([130, 0])[0])); return [['rompV', w], ['rompA', 1 - w]]; },
    nek: (v) => { const u = projectie(v, [WP_J.nekBasis, WP_J.kop]); const wa = 1 - sstep((u + 0.35) / 1.05), wk = sstep((u - 0.68) / 0.42); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
    dij: (v) => { const u = projectie(v, [WP_J.heup, WP_J.knie]); const w = sstep((u - 0.25) / 0.85); return [['rompA', 1 - w], ['dij', w]]; },
    hum: (v) => { const u = projectie(v, [WP_J.schouder, WP_J.elleboog]); const w = sstep((u + 0.1) / 0.8); return [['scap', 1 - w], ['hum', w]]; },
    staart: (v) => { const u = projectie(v, [WP_J.staart0, WP_J.staart1, WP_J.staart2, WP_J.staart3]); const c = [['rompA', -0.35], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5]];
      let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 2.5) w = [['st2', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
  };
  for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

  // ---------- voorwaartse kinematica ----------
  function fk(R, A) { // A: hoeken in radialen (wereld); geeft draaipunten
    const piv = {};
    for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; }
    return piv;
  }
  const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
  function ik(p0, t, l1, l2, teken) {
    const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd));
    const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek];
  }
  const graden = (H) => { const A = {}; for (const n of ORDE) A[n] = (H.A[n] ?? BOT[n].A0 / RAD) * RAD; return A; };

  // ---------- gangmodel ----------
  // sleutelhoeken (graden, y omlaag; 90 = recht naar beneden). Stap: modelblad 2-3 + loopcyclus-plaat fasen 1-8; draf: modelblad 4 + plaat 10.
  const kurve = (K, u) => { u = Math.max(0, Math.min(1, u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const GANG = {
    lopen: { S: 82, f: 1.0, beta: 0.68, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 8, A: 6.5 }, bob: 0.7, nx: { V: 3, A: 5 }, basis: ['contact', 'passeer'], kop: [-4, -3],
      V: { metaS: [[0, 62], [0.5, 72], [0.82, 86], [1, 104]], metaZ: [[0, 104], [0.32, 128], [0.58, 116], [0.85, 70], [1, 62]],
           pootS: [[0, 21], [0.68, 21], [1, 72]], pootZ: [[0, 72], [0.3, 100], [0.6, 88], [0.86, 28], [1, 21]] },
      A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 110]], metaZ: [[0, 110], [0.35, 70], [0.62, 52], [0.86, 60], [1, 70]],
           pootS: [[0, 21], [0.62, 21], [1, 68]], pootZ: [[0, 68], [0.3, 92], [0.6, 52], [0.86, 26], [1, 21]] } },
    draven: { S: 118, f: 2.0, beta: 0.44, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: 13, A: 9 }, bob: 1.2, nx: { V: 6, A: 6 }, basis: ['draf', 'drafvol'], kop: [-4, -2],
      V: { metaS: [[0, 58], [0.5, 74], [0.8, 92], [1, 112]], metaZ: [[0, 112], [0.3, 160], [0.55, 150], [0.82, 40], [1, 58]],
           pootS: [[0, 21], [0.6, 21], [1, 80]], pootZ: [[0, 80], [0.3, 140], [0.6, 95], [0.85, 12], [1, 21]] },
      A: { metaS: [[0, 60], [0.5, 84], [0.8, 104], [1, 122]], metaZ: [[0, 122], [0.35, 70], [0.62, 48], [0.86, 47], [1, 60]],
           pootS: [[0, 21], [0.55, 21], [1, 110]], pootZ: [[0, 110], [0.3, 100], [0.6, 55], [0.86, 12], [1, 21]] } },
  };
  // rust: positie van de teen per poot (staan-tabel), t.o.v. het dier
  const REST_A = graden({ A: {} }), REST_P = fk(ROOT0, REST_A);
  const ST_A = graden(WP_HOUDING.staan), ST_P = fk([ROOT0[0], WP_HOUDING.staan.R[1]], ST_A);
  const TEENST = { V: eind(ST_P, ST_A, 'vp'), VF: eind(ST_P, ST_A, 'vpF'), A: eind(ST_P, ST_A, 'ap'), AF: eind(ST_P, ST_A, 'apF') };
  const TEEN0 = { V: TEENST.V, A: TEENST.A };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };
  const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } }; // kortste weg (rompA ligt rond ±180°)
  const ROMPNAMEN = ['rompV', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2'];

  // poten zetten: voeten = { L: { teen:[x,y], meta: graden, poot: graden } } -> hoeken via IK (elleboog naar achter, knie naar voren)
  function zetBenen(R, A, voeten, scapZwaai = {}) {
    let piv = fk(R, A); const rek = {};
    for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', zij = L.length > 1 ? 'F' : '';
      const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
      const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
      if (voor) { A['scap' + zij] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
        const [a1, a2, r] = ik(eind(piv, A, 'scap' + zij), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + zij] = a1; A['rad' + zij] = a2; rek[L] = r; }
      else { const [a1, a2, r] = ik(piv['dij' + zij], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + zij] = a1; A['schn' + zij] = a2; rek[L] = r; }
      A[nM + zij] = v.meta * RAD; A[nP + zij] = v.poot * RAD; v.kogel = kogel; }
    return rek;
  }
  // romp/kop/staart van een gang (mix g: 0 = stap, 1 = draf) op cyclus-tijd t
  function gangRomp(g, t) {
    const res = []; for (const s of ['lopen', 'draven']) { const G = GANG[s], H0 = WP_HOUDING[G.basis[0]], H1 = WP_HOUDING[G.basis[1]];
      const A = graden(H0), A1 = graden(H1), w = 0.5 - 0.5 * Math.cos(4 * Math.PI * t); mixA(A, A1, w, ROMPNAMEN);
      A.nek += G.kop[0] * RAD; A.kop += G.kop[1] * RAD; res.push({ A, y: H0.R[1] * (1 - w) + H1.R[1] * w }); }
    const A = res[0].A; mixA(A, res[1].A, g, ROMPNAMEN); const G = { bob: lerp(GANG.lopen.bob, GANG.draven.bob, g) };
    const y = lerp(res[0].y, res[1].y, g) + 1.8 + G.bob * Math.cos(4 * Math.PI * (t - 0.06)); // +1,8 cm: iets door de poten bij lopen (voorpoot bereikt de grond, rek < 1)
    A.rompV += 0.8 * RAD * Math.sin(4 * Math.PI * t); A.rompA -= 0.8 * RAD * Math.sin(4 * Math.PI * t);
    A.nek += 2.0 * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= 1.5 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
    A.st0 += 3 * RAD * Math.sin(2 * Math.PI * (t - 0.2)); A.st1 += 6 * RAD * Math.sin(2 * Math.PI * (t - 0.32)); A.st2 += 8 * RAD * Math.sin(2 * Math.PI * (t - 0.45));
    A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
    return { A, R: [ROOT0[0], y] };
  }
  const gpar = (g, k) => lerp(GANG.lopen[k], GANG.draven[k], g);
  const fasep = (g, L) => lerp(GANG.lopen.fase[L], GANG.draven.fase[L] + (L === 'VF' ? 1 : 0), g);
  const hoek = (g, L, kant, u) => { const k = L[0] === 'V' ? 'V' : 'A'; return lerp(kurve(GANG.lopen[k][kant], u), kurve(GANG.draven[k][kant], u), g); };

  // stateloos (voor storyboards): gang op t, met steunvoet stil t.o.v. de wereld
  function gang(soort, t) {
    const g = soort === 'draven' ? 1 : 0, G = GANG[soort]; const { A, R } = gangRomp(g, t);
    const halve = G.S * G.beta / 2, voeten = {}, scap = {};
    for (const L of ['A', 'AF', 'V', 'VF']) { const voor = L[0] === 'V', p = fr(t - G.fase[L]), steun = p < G.beta;
      const nx = TEENST[L][0] + G.nx[voor ? 'V' : 'A'], ty0 = TEENST[L][1]; let tx, ty, u;
      if (steun) { u = p / G.beta; tx = nx + halve * (1 - 2 * u); ty = ty0; }
      else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.55; tx = hermite(nx - halve, nx + halve, m, m, u);
        ty = ty0 - G.lift[voor ? 'V' : 'A'] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
      voeten[L] = { teen: [tx, ty], meta: hoek(g, L, steun ? 'metaS' : 'metaZ', u), poot: hoek(g, L, steun ? 'pootS' : 'pootZ', u), steun, u };
      if (voor) scap[L] = 9 * (tx - nx) / halve; }
    const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
    return { R, A, voeten };
  }

  // statische houding uit de tabel (met optionele borstverdieping en extra's)
  const BORST = { zitten: 1.08, huilen: 1.06 };
  function tabel(h, o = {}) {
    const H = WP_HOUDING[h] || WP_HOUDING.staan; const A = graden(H), R = [ROOT0[0], H.R[1]];
    if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
    if (h === 'huilen') A.kaak += 0.06 * Math.sin(2 * Math.PI * (o.t || 0));
    if (h === 'snuffelen') { A.rompV -= 7 * RAD; A.nek += 14 * RAD; A.kop += 16 * RAD; } // handmatig: de pop-nek is korter dan de nek op de AI-plaat; zo raakt de neus de grond
    if (h === 'snuffelen' && o.t) { A.kop += 4 * RAD * Math.sin(2 * Math.PI * o.t * 3); A.nek += 2 * RAD * Math.sin(2 * Math.PI * o.t * 3 + 1); }
    if (h === 'staan' && o.t) { A.st1 += 3 * RAD * Math.sin(2 * Math.PI * o.t); A.st2 += 5 * RAD * Math.sin(2 * Math.PI * o.t - 0.6); }
    if (o.bek != null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + o.bek;
    return { R, A, voeten: {}, borst: BORST[h] || 1, zit: ['zitten', 'liggen', 'huilen'].includes(h) };
  }
  function stand(o) {
    if (o.stand) return o.stand;
    const h = o.houding || 'staan';
    if (h === 'lopen' || h === 'draven') { const st = gang(h, fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
    return tabel(h, o);
  }

  // ---------- film: gesimuleerde reeks met gangwissel, stoppen en houdingswissels ----------
  // spec: { fps, duur, v(t) cm/s, g(t) 0-1, acties: [{t0, t1, h}] } -> frames [{stand, X}]
  function film(spec) {
    const fps = spec.fps || 24, N = Math.round(spec.duur * fps), dt = 1 / fps, frames = [];
    let X = 0, Phi = 0, rust = false, rustT = 0; const poot = {};
    const LEGS = ['A', 'AF', 'V', 'VF'];
    for (const L of LEGS) poot[L] = { steun: true, teenW: TEENST[L][0], vanX: 0, klaar: false };
    let laatste = null;
    for (let i = 0; i < N; i++) {
      const t = i * dt, v = spec.v(t), g = spec.g(t);
      // gang loopt door zolang er snelheid is of nog niet alle voeten neutraal staan
      if (!rust) {
        const f = v > 1 ? lerp(GANG.lopen.f, GANG.draven.f, g) : GANG.lopen.f, beta = gpar(g, 'beta'), S = v / f, halve = S * beta / 2;
        Phi += f * dt; X += v * dt;
        const tc = fr(Phi); const { A, R } = gangRomp(g, tc); const voeten = {}, scap = {};
        let allesKlaar = v <= 1;
        for (const L of LEGS) { const P = poot[L], voor = L[0] === 'V', p0 = fr(Phi - fasep(g, L)), steun = p0 < beta || (P.klaar && P.steun), p = steun && P.klaar ? Math.min(p0, beta * 0.5) : p0; // eenmaal neergezet na het stoppen: blijft staan
          const nx = TEENST[L][0] + (voor ? lerp(3, 6, g) : lerp(5, 6, g)) * Math.min(1, v / 40), ty0 = TEENST[L][1]; let tx, ty, u;
          if (steun) { if (!P.steun) { P.steun = true; P.klaar = v <= 1; } u = p / beta; tx = P.teenW - X; ty = ty0; }
          else { if (P.steun) { P.steun = false; P.vanX = P.teenW; } u = (p - beta) / (1 - beta);
            const resterend = (1 - u) * (1 - beta) / f, doel = X + v * resterend + nx + halve; const tw = lerp(P.vanX, doel, sstep(u));
            const stap = Math.abs(doel - P.vanX);
            const lift = (voor ? lerp(GANG.lopen.lift.V, GANG.draven.lift.V, g) : lerp(GANG.lopen.lift.A, GANG.draven.lift.A, g)) * Math.min(1, 0.15 + stap / 30);
            P.teenW = tw; tx = tw - X; ty = ty0 - lift * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
          voeten[L] = { teen: [tx, ty], meta: lerp(voor ? 69 : 83, hoek(g, L, steun ? 'metaS' : 'metaZ', u), steun ? Math.min(1, v / 30) : 1),
            poot: lerp(21, hoek(g, L, steun ? 'pootS' : 'pootZ', u), steun ? Math.min(1, v / 30) : 1), steun, u };
          if (voor) scap[L] = 9 * (tx - nx) / Math.max(10, halve) * Math.min(1, v / 40);
          if (!(steun && P.klaar)) allesKlaar = false; }
        // bij stilstand: romp naar de staan-tabel mengen
        const ws = 1 - Math.min(1, v / 40); const As = graden(WP_HOUDING.staan); mixA(A, As, ws, ROMPNAMEN); R[1] = lerp(R[1], WP_HOUDING.staan.R[1], ws);
        const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
        laatste = { R, A, voeten, borst: 1, zit: false };
        if (allesKlaar) { rust = true; rustT = t; for (const L of LEGS) poot[L].vast = [poot[L].teenW - X, TEENST[L][1]]; }
      } else {
        // houdingen na stilstand: tabellen mengen, voeten blijven staan (IK); bij zitten stappen de achtervoeten naar voren
        const tr = t - rustT; const act = (spec.acties || []).filter(a => tr >= a.t0); let H0 = 'staan', H1 = 'staan', w = 1, cur = null;
        if (act.length) { cur = act[act.length - 1]; const vorige = act.length > 1 ? act[act.length - 2].h : 'staan'; H0 = vorige; H1 = cur.h; w = sstep((tr - cur.t0) / (cur.t1 - cur.t0)); }
        const T0 = tabel(H0, { t: t * 0.4 }), T1 = tabel(H1, { t: t * 0.4 }); const A = T0.A; mixA(A, T1.A, w, ROMPNAMEN);
        const R = [ROOT0[0], lerp(T0.R[1], T1.R[1], w)]; const borst = lerp(T0.borst, T1.borst, w);
        // voeten: staande houdingen houden hun plek; zittende: voorvoeten blijven, achtervoeten naar de zit-plek (stap met boog)
        const zitW = (h) => ['zitten', 'huilen'].includes(h) ? 1 : 0; const z0 = zitW(H0), z1 = zitW(H1);
        const voeten = {};
        const ZT = tabel('zitten'); const ZP = fk(ZT.R, ZT.A);
        const zitTeen = (L) => { const n = L[0] === 'V' ? (L.length > 1 ? 'vpF' : 'vp') : (L.length > 1 ? 'apF' : 'ap'); return eind(ZP, ZT.A, n); };
        // zit-lichaam zo verschuiven dat zijn nabije voorvoet op de vaste voorvoet staat
        const dxZ = poot.V.vast[0] - zitTeen('V')[0];
        const zf = lerp(z0, z1, w); R[0] += dxZ * zf; R[1] += 1.2 * zf; // iets lager zodat de voorpoten de grond houden
        for (const L of LEGS) { const voor = L[0] === 'V'; const vast = poot[L].vast;
          const n = voor ? (L.length > 1 ? 'vpF' : 'vp') : (L.length > 1 ? 'apF' : 'ap'), nm = voor ? (L.length > 1 ? 'mcF' : 'mc') : (L.length > 1 ? 'mtF' : 'mt');
          const a0 = (z0 ? ZT : T0).A, a1 = (z1 ? ZT : T1).A;
          let teen = vast.slice(), meta = lerp(a0[nm], a1[nm], w) / RAD, pa = lerp(a0[n], a1[n], w) / RAD;
          if (!voor && z0 !== z1) { const doel = [zitTeen(L)[0] + dxZ, zitTeen(L)[1]]; const van = vast;
            const k = L === 'A' ? 0 : 0.18; const u = Math.max(0, Math.min(1, (w - k) / 0.45)); const uu = sstep(u);
            const a = z1 ? van : doel, b = z1 ? doel : van; teen = [lerp(a[0], b[0], uu), lerp(a[1], b[1], uu) - 5 * Math.sin(Math.PI * u)]; }
          else if (!voor && z0 && z1) teen = [zitTeen(L)[0] + dxZ, zitTeen(L)[1]];
          if (!voor && z1 && w >= 1) poot[L].vastZ = teen;
          voeten[L] = { teen, meta, poot: pa, steun: true }; }
        // voorpoten bij zitten: voet blijft, hoeken uit de tabel
        const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
        laatste = { R, A, voeten, borst, zit: zf > 0.5 };
      }
      frames.push({ stand: laatste, X });
    }
    return frames;
  }

  // ---------- tekenen ----------
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  function tekenDeel(ctx, k, M, ver, piv, A, modus = 'alles') {
    const D = PREP[k], pal = ver ? PALF : PAL;
    const tr = D.skin ? (l) => l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }) : null;
    ctx.save();
    if (!D.skin) { const b = BOT[D.bot]; ctx.translate(piv[D.bot][0], piv[D.bot][1]); ctx.rotate(A[D.bot] - b.A0); ctx.translate(-b.J0[0], -b.J0[1]); }
    const basis = tr ? tr(D.lagen[0]) : D.lagen[0].pts;
    if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[D.lagen[0].c]); ctx.lineWidth = 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
    pad(ctx, basis); ctx.fillStyle = pal[D.lagen[0].c]; ctx.fill();
    if (D.lagen.length > 1) { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < D.lagen.length; i++) { const L = D.lagen[i], P = tr ? tr(L) : L.pts;
      if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
      else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
    if (D.voet) { const T = TEEN[k]; ctx.strokeStyle = rand(pal.creme); ctx.lineWidth = 0.22; ctx.lineCap = 'round'; for (const [a, b] of T.teen) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      ctx.fillStyle = pal.klauw; for (const c of T.klauw) { ctx.beginPath(); ctx.moveTo(c[0] - 0.9, c[1] - 0.5); ctx.lineTo(c[0] + 1.3, c[1] + 0.25); ctx.lineTo(c[0] - 0.3, c[1] + 0.45); ctx.closePath(); ctx.fill(); } }
    if (k === 'kop') { // oog, ooglijn, mond
      ctx.fillStyle = '#2A2523'; pad(ctx, OOGLIJN); ctx.fill();
      if (typeof dierOog === 'function') { ctx.save(); ctx.translate(OOG[0], OOG[1]); ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, 4.0, '#C9932F'); ctx.restore(); } else { ctx.fillStyle = '#C9932F'; ctx.beginPath(); ctx.arc(OOG[0], OOG[1], 0.95, 0, 6.283); ctx.fill(); }
      ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.moveTo(MOND[0][0], MOND[0][1]); ctx.quadraticCurveTo(MOND[1][0], MOND[1][1] + 0.3, MOND[2][0], MOND[2][1]); ctx.stroke(); }
    ctx.restore();
  }
  // volgorde van achter naar voor: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, kop
  const VOLGORDE = [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['hum', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['staart'], ['rad'], ['mc'], ['vp'], ['romp'],
    ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['oorF'], ['kaak'], ['kop'], ['oor']];

  function teken(ctx, x, y, s, o = {}) {
    if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas) { // doorzichtig: eerst los tekenen, anders schemeren de overlappende delen door elkaar
      if ((o.a ?? 1) <= 0.01) return null; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
      k.setTransform(ctx.getTransform()); const st = teken(k, x, y, s, Object.assign({}, o, { a: 1 }));
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return st; }
    const st = stand(o); const { R, A } = st; const piv = fk(R, A); const borst = st.borst || 1;
    const dx = o.wereld && GANG[o.houding] ? GANG[o.houding].S * fr(o.t || 0) : 0;
    const M = {}; for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0;
      M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
    if (borst !== 1) for (const n of ['rompV', 'rompA']) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; // romp dikker (zitten)
      const f2 = 1 + (borst - 1) * 0.6; M[n] = (v) => { const vx = v[0] - j[0], vy0 = v[1] - j[1], vy = vy0 > 0 ? vy0 * borst : vy0 * f2; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx, 0);
    const open = A.kaak - A.kop - (BOT.kaak.A0 - BOT.kop.A0) > 0.02;
    if (st.zit) { ctx.beginPath(); ctx.rect(-300, -300, 600, 300.8); ctx.clip(); } // zitten/liggen: bil en staart worden op de grond platgedrukt, niets onder de grond
    const zit = st.zit; // dan ligt de achtervoet vóór de dij
    let VO = zit ? VOLGORDE.filter(([k, v]) => v || (k !== 'mt' && k !== 'ap')).flatMap(e => (e[0] === 'dij' && !e[1]) ? [e, ['mt'], ['ap']] : [e]) : VOLGORDE;
    const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A); // verre poot: elk bot met F-versie vervangen
    for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
    if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
    for (const [k, ver] of VO) { // eerst de lichte rand (alleen het buitensilhouet blijft zichtbaar)
      if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand');
      else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
    for (const [k, ver] of VO) {
      if (ver) tekenDeel(ctx, k, MF, true, pivF, AF);
      else { if (k === 'kaak' && open) { // open bek: donkere mondholte
          const p = piv.kaak, dk = A.kop - BOT.kop.A0, dj = A.kaak - BOT.kaak.A0; ctx.save(); ctx.translate(p[0], p[1]);
          ctx.fillStyle = PAL.mond; ctx.beginPath(); ctx.moveTo(-1.5, 0); ctx.lineTo(...rot([11.6, -1.0], dk)); ctx.lineTo(...rot([10.6, 0.6], dj)); ctx.closePath(); ctx.fill();
          ctx.fillStyle = PAL.tong; ctx.beginPath(); ctx.moveTo(0, 0.2); ctx.lineTo(...rot([7.5, -0.1], (dk + dj) / 2)); ctx.lineTo(...rot([6, 0.5], dj)); ctx.closePath(); ctx.fill(); ctx.restore(); }
        tekenDeel(ctx, k, M, false, piv, A); }
    }
    ctx.restore();
    return st;
  }
  // diagnose voor testvel: draaipunten en voeten in cm (t.o.v. x,y)
  function info(o = {}) { const st = stand(o); const piv = fk(st.R, st.A); const dx = o.wereld && GANG[o.houding] ? GANG[o.houding].S * fr(o.t || 0) : 0; return { piv, A: st.A, voeten: st.voeten, dx, eind: (n) => eind(piv, st.A, n) }; }
  // één deel in ruststand, verschoven (cm) — voor het uit-elkaar-testvel; geeft de draaipunten (cm) terug
  function deel(ctx, k, dx = 0, dy = 0) {
    const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
    if (k.endsWith('F')) tekenDeel(ctx, k.slice(0, -1), M, true, REST_P, REST_A); else tekenDeel(ctx, k, M, false, REST_P, REST_A); ctx.restore();
    const D = PREP[k.replace(/F$/, '')]; const bones = D.skin ? { romp: ['rompV', 'rompA'], nek: ['nek', 'kop'], staart: ['st0', 'st1', 'st2'], dij: ['dij'], hum: ['hum'] }[D.skin] : [D.bot];
    return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]);
  }
  return { teken, info, stand, fk, deel, film, gang, tabel, BOT, ORDE, PREP, GANG, PAL, REST_P, REST_A };
})();

function wolfPop(ctx, x, y, schaal = 5, o = {}) { return WolfPop.teken(ctx, x, y, schaal, o); }

// ---- integratie: de bestaande aanroep wolf(ctx, x, y, s, o) tekent voortaan de pop (zelfde maat: s = px per cm, schofthoogte 80 cm) ----
// o-velden van dieren_zoog.js: houding ('staan'|'lopen'|'draven'|'zitten'|'liggen'|'huilen'|'snuffelen'|'grazen'), t, kijk, a, kopHoek, nekHoek, bek.
function wolf(ctx, x, y, s, o = {}) { const h = { grazen: 'snuffelen', vechten: 'staan' }[o.houding] || o.houding || 'staan';
  return WolfPop.teken(ctx, x, y, s, Object.assign({}, o, { houding: h })); }


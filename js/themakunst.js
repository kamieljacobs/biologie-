/* Themakunst · Biologie bij Kamiel
   Per thema één intense, kleurrijke bio-art-plaat als achtergrond van de themapagina.
   Alles procedureel getekend als SVG (viewBox 1600×1000), in de huiskleuren, zonder korrel.
   Gebruik: window.THEMAKUNST[id]() geeft de binnenkant van een <svg>. Kamiel 20 okt 2026:
   'nog dikker en kleurrijker, geïnspireerd door het thema zelf' (bijv. Darwin bij Evolutie). */
(function () {
  var W = 2.4; // lijndikte-factor: dik en expressief
  var KL = ['goud', 'teal', 'groen', 'koraal', 'paars', 'oker'];
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function f(n) { return Math.round(n * 10) / 10; }
  function P(c, d, w, extra) { return '<path d="' + d + '" stroke="var(--' + c + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  function C(c, x, y, r, w, extra) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" stroke="var(--' + c + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  function E(c, x, y, rx, ry, rot, w, extra) { return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" transform="rotate(' + f(rot) + ' ' + f(x) + ' ' + f(y) + ')" stroke="var(--' + c + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  function vul(c, o) { return 'fill="var(--' + c + ')" fill-opacity="' + o + '"'; }
  function wolken(seed, n) {
    var r = rnd(seed), o = '<defs><filter id="tk' + seed + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter></defs><g filter="url(#tk' + seed + ')">';
    for (var k = 0; k < n; k++) o += '<circle cx="' + f(r() * 1600) + '" cy="' + f(r() * 1000) + '" r="' + f(150 + r() * 240) + '" fill="var(--' + KL[k % 6] + ')" fill-opacity="' + f(0.22 + r() * 0.18) + '" stroke="none"/>';
    return o + '</g>';
  }
  function g(tr, inner) { return '<g transform="' + tr + '">' + inner + '</g>'; }
  function veel(n, seed, fn) { var r = rnd(seed), o = ''; for (var k = 0; k < n; k++) o += fn(r, k); return o; }
  function golf(y, amp, c, w) { var d = 'M-20 ' + y; for (var x = 0; x <= 1640; x += 80) d += ' Q' + (x + 40) + ' ' + (y + (x / 80 % 2 ? amp : -amp)) + ' ' + (x + 80) + ' ' + y; return P(c, d, w); }

  /* ---------- motieven ---------- */
  function boom(x, y, a, len, d, c, r, eind) { // vertakking (vaten, zenuwen, schimmels, bronchiën, wortels)
    if (d === 0 || len < 6) return eind ? eind(x, y) : '';
    var x2 = x + len * Math.cos(a), y2 = y + len * Math.sin(a), mx = (x + x2) / 2 + (r() - .5) * len * .3, my = (y + y2) / 2 + (r() - .5) * len * .3;
    var o = P(c, 'M' + f(x) + ' ' + f(y) + ' Q' + f(mx) + ' ' + f(my) + ' ' + f(x2) + ' ' + f(y2), Math.max(.4, d * .3));
    var n = r() < .3 ? 3 : 2; for (var k = 0; k < n; k++) o += boom(x2, y2, a + (r() - .5) * 1.2, len * (.66 + r() * .16), d - 1, c, r, eind); return o;
  }
  function cel(cx, cy, R, seed) {
    var r = rnd(seed), d = '', o = '';
    for (var t = 0; t <= 2 * Math.PI + .01; t += Math.PI / 24) { var rr = R * (1 + .06 * Math.sin(t * 5 + seed)); d += (d ? ' L' : 'M') + f(cx + rr * Math.cos(t)) + ' ' + f(cy + rr * Math.sin(t)); }
    o += P('teal', d + 'Z', 1.4, vul('teal', .12)) + P('teal', d.replace(/[\d.]+ [\d.]+/g, function (m) { var p = m.split(' '); return f(cx + (p[0] - cx) * .95) + ' ' + f(cy + (p[1] - cy) * .95); }) + 'Z', .6);
    o += C('paars', cx - R * .1, cy, R * .32, 1.2, vul('paars', .25)) + C('paars', cx - R * .05, cy - R * .05, R * .1, .8, vul('paars', .6));
    for (var k = 0; k < 3; k++) { var a = r() * 6.28, rr2 = R * (.55 + r() * .2), x = cx + rr2 * Math.cos(a), y = cy + rr2 * Math.sin(a); o += E('koraal', x, y, R * .16, R * .08, a * 57, 1, vul('koraal', .3)) + P('koraal', 'M' + f(x - R * .12) + ' ' + f(y) + ' l' + f(R * .05) + ' -' + f(R * .05) + ' l' + f(R * .05) + ' ' + f(R * .1) + ' l' + f(R * .05) + ' -' + f(R * .1) + ' l' + f(R * .05) + ' ' + f(R * .05), .5, 'transform="rotate(' + f(a * 57) + ' ' + f(x) + ' ' + f(y) + ')"'); }
    for (var i = 0; i < 3; i++) { var rr3 = R * (.42 + i * .05); o += P('oker', 'M' + f(cx - rr3 * .2) + ' ' + f(cy - rr3) + ' Q' + f(cx + rr3 * .9) + ' ' + f(cy - rr3 * .9) + ' ' + f(cx + rr3) + ' ' + f(cy + rr3 * .1), .7); }
    o += veel(14, seed + 9, function (q) { var a = q() * 6.28, rr = R * (.4 + q() * .45); return C('goud', cx + rr * Math.cos(a), cy + rr * Math.sin(a), 2 + q() * 4, .6, vul('goud', .7)); });
    return o;
  }
  function helix(x0, y0, x1, y1, amp, n, c1, c2) {
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, s1 = '', s2 = '', o = '';
    for (var i = 0; i <= 120; i++) { var t = i / 120, ph = t * n * 2 * Math.PI, bx = x0 + dx * t, by = y0 + dy * t, a = Math.sin(ph) * amp;
      s1 += (i ? ' L' : 'M') + f(bx + nx * a) + ' ' + f(by + ny * a); s2 += (i ? ' L' : 'M') + f(bx - nx * a) + ' ' + f(by - ny * a);
      if (i % 4 === 2) o += P(KL[(i / 4 | 0) % 4 + 2], 'M' + f(bx + nx * a) + ' ' + f(by + ny * a) + ' L' + f(bx - nx * a) + ' ' + f(by - ny * a), .8); }
    return o + P(c1, s1, 1.6) + P(c2, s2, 1.6);
  }
  function chromosoom(x, y, s, a, c) {
    var arm = function (rot) { return E(c, x + Math.cos(rot) * s * .55, y + Math.sin(rot) * s * .55, s * .62, s * .17, rot * 57.3, 1.1, vul(c, .35)); };
    return arm(a + .5) + arm(a - .5) + arm(a + Math.PI + .5) + arm(a + Math.PI - .5) + C('goud', x, y, s * .13, .8, vul('goud', .8));
  }
  function blad(x, y, s, a, c) {
    var co = Math.cos(a), si = Math.sin(a), pt = function (u, v) { return f(x + u * co - v * si) + ' ' + f(y + u * si + v * co); };
    var o = P(c, 'M' + pt(0, 0) + ' Q' + pt(s * .5, -s * .45) + ' ' + pt(s, 0) + ' Q' + pt(s * .5, s * .45) + ' ' + pt(0, 0) + 'Z', 1.2, vul(c, .25)) + P(c, 'M' + pt(-s * .15, 0) + ' L' + pt(s * .95, 0), .8);
    for (var u = .15; u < .9; u += .14) o += P(c, 'M' + pt(s * u, 0) + ' L' + pt(s * (u + .12), -s * .22 * (1 - u)) + ' M' + pt(s * u, 0) + ' L' + pt(s * (u + .12), s * .22 * (1 - u)), .5);
    return o;
  }
  function virus(x, y, R, c) { var o = C(c, x, y, R, 1.2, vul(c, .3)); for (var k = 0; k < 12; k++) { var a = k / 12 * 6.28; o += P(c, 'M' + f(x + R * Math.cos(a)) + ' ' + f(y + R * Math.sin(a)) + ' L' + f(x + R * 1.45 * Math.cos(a)) + ' ' + f(y + R * 1.45 * Math.sin(a)), .8) + C(c, x + R * 1.55 * Math.cos(a), y + R * 1.55 * Math.sin(a), R * .13, .6, vul(c, .8)); } return o; }
  function antistof(x, y, s, a, c) { var t = 'rotate(' + f(a) + ' ' + f(x) + ' ' + f(y) + ')'; return g(t, P(c, 'M' + f(x) + ' ' + f(y + s) + ' L' + f(x) + ' ' + f(y) + ' L' + f(x - s * .7) + ' ' + f(y - s * .7) + ' M' + f(x) + ' ' + f(y) + ' L' + f(x + s * .7) + ' ' + f(y - s * .7), 2.2) + P('goud', 'M' + f(x - s * .7) + ' ' + f(y - s * .7) + ' l-' + f(s * .2) + ' -' + f(s * .2) + ' M' + f(x + s * .7) + ' ' + f(y - s * .7) + ' l' + f(s * .2) + ' -' + f(s * .2), 1.4)); }
  function neuron(x, y, s, a, c, seed) {
    var r = rnd(seed), o = C(c, x, y, s * .18, 1.3, vul(c, .45)) + C('goud', x, y, s * .07, .6, vul('goud', .9));
    for (var k = 0; k < 6; k++) o += boom(x, y, a + Math.PI + (k - 2.5) * .45, s * .35, 4, c, r);
    var ax = x, ay = y, d = 'M' + f(x) + ' ' + f(y);
    for (var i = 1; i <= 10; i++) { var nx2 = x + Math.cos(a) * s * i * .22, ny2 = y + Math.sin(a) * s * i * .22 + Math.sin(i) * s * .05; d += ' L' + f(nx2) + ' ' + f(ny2); if (i > 1 && i < 9 && i % 2) o += E('oker', (ax + nx2) / 2, (ay + ny2) / 2, s * .09, s * .045, a * 57.3, .8, vul('oker', .5)); ax = nx2; ay = ny2; }
    o += P(c, d, 1.2); for (var j = 0; j < 4; j++) o += boom(ax, ay, a + (j - 1.5) * .5, s * .15, 2, c, r, function (ex, ey) { return C('goud', ex, ey, 4, .6, vul('goud', .9)); });
    return o;
  }
  function zaadcel(x, y, s, a, c) { var co = Math.cos(a), si = Math.sin(a), d = 'M' + f(x) + ' ' + f(y); for (var t = 1; t <= 20; t++) { var u = -t * s * .25, v = Math.sin(t * .9) * s * .18 * (t / 20); d += ' L' + f(x + u * co - v * si) + ' ' + f(y + u * si + v * co); } return P(c, d, .8) + E(c, x + s * .15 * co, y + s * .15 * si, s * .3, s * .19, a * 57.3, 1, vul(c, .5)); }
  function ster(x, y, R, c) { var o = ''; for (var k = 0; k < 8; k++) { var a = k / 8 * 6.28; o += P(c, 'M' + f(x) + ' ' + f(y) + ' L' + f(x + R * Math.cos(a)) + ' ' + f(y + R * Math.sin(a)), .7); } return o + C(c, x, y, R * .2, .6, vul(c, .8)); }
  function den(x, y, h, c) { var o = P('oker', 'M' + x + ' ' + y + ' L' + x + ' ' + (y - h * .25), 1.2); for (var i = 0; i < 3; i++) { var yy = y - h * .2 - i * h * .25, b = h * (.42 - i * .1); o += P(c, 'M' + f(x - b) + ' ' + f(yy) + ' L' + x + ' ' + f(yy - h * .38) + ' L' + f(x + b) + ' ' + f(yy) + 'Z', 1.1, vul(c, .25)); } return o; }
  function loofboom(x, y, h, c, seed) { var r = rnd(seed), o = P('oker', 'M' + x + ' ' + y + ' L' + x + ' ' + (y - h * .45), 1.6); for (var k = 0; k < 7; k++) o += C(c, x + (r() - .5) * h * .55, y - h * .55 - r() * h * .35, h * (.14 + r() * .1), 1, vul(c, .22)); return o; }
  function vogel(x, y, s, c) { return P(c, 'M' + f(x - s) + ' ' + f(y) + ' Q' + f(x - s * .4) + ' ' + f(y - s * .6) + ' ' + x + ' ' + y + ' Q' + f(x + s * .4) + ' ' + f(y - s * .6) + ' ' + f(x + s) + ' ' + f(y), 1); }
  function bij(x, y, s) { return E('goud', x, y, s, s * .6, 0, 1, vul('goud', .7)) + P('oker', 'M' + f(x - s * .3) + ' ' + f(y - s * .55) + ' L' + f(x - s * .3) + ' ' + f(y + s * .55) + ' M' + f(x + s * .2) + ' ' + f(y - s * .55) + ' L' + f(x + s * .2) + ' ' + f(y + s * .55), 1) + E('teal', x - s * .2, y - s * .8, s * .55, s * .3, -30, .7, vul('teal', .3)) + E('teal', x + s * .3, y - s * .8, s * .55, s * .3, 30, .7, vul('teal', .3)); }
  function raat(x, y, s, n, c) { var o = ''; for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) { var cx = x + i * s * 1.5, cy = y + j * s * 1.73 + (i % 2) * s * .87, d = ''; for (var k = 0; k < 6; k++) { var a = k / 6 * 6.28; d += (k ? ' L' : 'M') + f(cx + s * Math.cos(a)) + ' ' + f(cy + s * Math.sin(a)); } o += P(c, d + 'Z', .8, (i + j) % 3 ? '' : vul('goud', .4)); } return o; }
  function bloem(x, y, s, c, n) { var o = P('groen', 'M' + x + ' ' + y + ' Q' + f(x + s * .3) + ' ' + f(y + s * 1.5) + ' ' + x + ' ' + f(y + s * 3), 1.3); for (var k = 0; k < n; k++) { var a = k / n * 6.28; o += E(c, x + Math.cos(a) * s * .55, y + Math.sin(a) * s * .55, s * .5, s * .2, a * 57.3, 1, vul(c, .35)); } return o + C('goud', x, y, s * .22, 1, vul('goud', .8)); }
  function paardebloem(x, y, s, c) { var o = P('groen', 'M' + x + ' ' + y + ' Q' + f(x - s * .2) + ' ' + f(y + s) + ' ' + f(x + s * .1) + ' ' + f(y + s * 2.4), 1.1); for (var k = 0; k < 28; k++) { var a = k / 28 * 6.28; o += P(c, 'M' + x + ' ' + y + ' L' + f(x + Math.cos(a) * s * .7) + ' ' + f(y + Math.sin(a) * s * .7), .4) + ster(x + Math.cos(a) * s * .75, y + Math.sin(a) * s * .75, s * .12, c); } return o; }
  function erwtepeul(x, y, s, a) { var co = Math.cos(a), si = Math.sin(a), pt = function (u, v) { return f(x + u * co - v * si) + ' ' + f(y + u * si + v * co); }; var o = P('groen', 'M' + pt(0, 0) + ' Q' + pt(s * .5, -s * .3) + ' ' + pt(s, 0) + ' Q' + pt(s * .5, s * .25) + ' ' + pt(0, 0) + 'Z', 1.2, vul('groen', .25)); for (var k = 1; k <= 5; k++) { var p = pt(s * k / 6, 0).split(' '); o += C(k % 2 ? 'goud' : 'groen', +p[0], +p[1], s * .065, .8, vul(k % 2 ? 'goud' : 'groen', .8)); } return o; }
  function rank(x, y, s, c) { var d = 'M' + x + ' ' + y; for (var t = 0; t < 7 * Math.PI; t += .25) { var r2 = s * (1 - t / (7 * Math.PI)); d += ' L' + f(x + s + r2 * Math.cos(t + Math.PI)) + ' ' + f(y + r2 * Math.sin(t + Math.PI)); } return P(c, d, .8); }
  function vlok(x, y, w, h, c) { return P(c, 'M' + f(x - w / 2) + ' ' + y + ' L' + f(x - w / 2) + ' ' + f(y - h + w / 2) + ' A' + f(w / 2) + ' ' + f(w / 2) + ' 0 0 1 ' + f(x + w / 2) + ' ' + f(y - h + w / 2) + ' L' + f(x + w / 2) + ' ' + y, 1.2, vul(c, .25)) + P('koraal', 'M' + f(x - w * .2) + ' ' + y + ' L' + f(x - w * .2) + ' ' + f(y - h * .8) + ' Q' + x + ' ' + f(y - h * .95) + ' ' + f(x + w * .2) + ' ' + f(y - h * .8) + ' L' + f(x + w * .2) + ' ' + y, .6) + P('goud', 'M' + x + ' ' + y + ' L' + x + ' ' + f(y - h * .7), .6); }
  function rbc(x, y, s, a) { return E('koraal', x, y, s, s * .55, a, 1.1, vul('koraal', .5)) + E('koraal', x, y, s * .45, s * .2, a, .6); }
  function hart(x, y, s) {
    return P('koraal', 'M' + x + ' ' + f(y + s) + ' C' + f(x - s * 1.4) + ' ' + f(y + s * .2) + ' ' + f(x - s * 1.1) + ' ' + f(y - s * .9) + ' ' + f(x - s * .2) + ' ' + f(y - s * .6) + ' C' + f(x + s * .1) + ' ' + f(y - s * 1) + ' ' + f(x + s * 1.3) + ' ' + f(y - s * .7) + ' ' + f(x + s * 1.05) + ' ' + f(y + s * .1) + ' C' + f(x + s * .9) + ' ' + f(y + s * .6) + ' ' + f(x + s * .3) + ' ' + f(y + s * .9) + ' ' + x + ' ' + f(y + s) + 'Z', 2, vul('koraal', .3))
      + P('koraal', 'M' + f(x - s * .1) + ' ' + f(y - s * .65) + ' C' + f(x - s * .1) + ' ' + f(y - s * 1.5) + ' ' + f(x + s * .8) + ' ' + f(y - s * 1.5) + ' ' + f(x + s * .8) + ' ' + f(y - s * .9), 2.2)
      + P('teal', 'M' + f(x - s * .5) + ' ' + f(y - s * .55) + ' L' + f(x - s * .6) + ' ' + f(y - s * 1.3), 2.2) + P('teal', 'M' + f(x + s * .3) + ' ' + f(y - s * .6) + ' L' + f(x + s * .35) + ' ' + f(y - s * 1.2), 1.8)
      + P('koraal', 'M' + f(x - s * .3) + ' ' + f(y - s * .2) + ' Q' + f(x + s * .1) + ' ' + f(y + s * .3) + ' ' + f(x + s * .05) + ' ' + f(y + s * .85), .8);
  }

  /* ---------- Darwin: een eigen, expressieve schets (oudere Darwin, grote baard) ---------- */
  function darwin(tx, ty, sc) {
    var r = rnd(1809), o = '';
    // jas en schouders
    o += P('teal', 'M40 540 C60 450 110 405 150 392 L200 440 L250 392 C290 405 340 450 360 540', 2.4, vul('teal', .22));
    o += P('teal', 'M150 392 L178 520 M250 392 L222 520', 1.2) + P('goud', 'M186 452 L200 500 L214 452', 1, vul('goud', .3));
    // schedel: kale kruin, groot voorhoofd
    o += P('oker', 'M128 222 C118 150 140 70 205 62 C268 58 292 130 284 222', 2.2, vul('oker', .12));
    o += P('oker', 'M150 120 C170 96 220 90 248 108', .8) + P('oker', 'M160 145 C185 132 225 130 246 140', .6);
    // grijze haren aan de zijkant
    o += veel(10, 3, function (q, k) { var y = 175 + k * 6, s = k % 2 ? 1 : -1; return P('paars', 'M' + (k % 2 ? 128 : 284) + ' ' + y + ' q' + f(s * -(10 + q() * 12)) + ' ' + f(8 + q() * 10) + ' ' + f(s * -(4 + q() * 8)) + ' ' + f(22 + q() * 10), .7); });
    // oor
    o += P('oker', 'M284 205 C302 200 304 232 286 242', 1.2);
    // zware wenkbrauwen, diepliggende ogen
    o += P('paars', 'M146 196 C162 178 190 176 200 190', 3) + P('paars', 'M214 190 C226 176 256 178 270 196', 3);
    o += P('paars', 'M150 199 l6 -10 M162 192 l5 -11 M176 189 l3 -12 M248 189 l-3 -12 M260 192 l-4 -11', .7);
    o += P('oker', 'M160 210 Q176 202 192 210', 1) + C('paars', 176, 212, 3.5, .6, vul('paars', .9)) + P('oker', 'M222 210 Q238 202 254 210', 1) + C('paars', 238, 212, 3.5, .6, vul('paars', .9));
    o += P('oker', 'M162 222 Q176 228 190 222 M224 222 Q238 228 252 222', .6);
    // neus
    o += P('oker', 'M207 196 C204 222 212 240 220 250 C214 258 200 258 194 250', 1.6);
    // snor
    o += P('goud', 'M168 272 C182 258 200 262 207 268 C214 262 234 258 248 272', 2.2);
    // baard: veel golvende lijnen van wangen naar een volle punt
    for (var k = 0; k <= 44; k++) {
      var t = k / 44, sx = 136 + t * 144, sy = 236 + Math.sin(t * Math.PI) * 36, ex = 112 + t * 196 + (t - .5) * 30, ey = 400 + Math.sin(t * Math.PI) * 70;
      var cx1 = sx + (r() - .5) * 30, cy1 = sy + 60 + r() * 30, cx2 = ex + (r() - .5) * 40, cy2 = ey - 70 - r() * 30;
      o += P(k % 5 === 0 ? 'goud' : (k % 3 ? 'paars' : 'teal'), 'M' + f(sx) + ' ' + f(sy) + ' C' + f(cx1) + ' ' + f(cy1) + ' ' + f(cx2) + ' ' + f(cy2) + ' ' + f(ex) + ' ' + f(ey), k % 4 ? .6 : 1);
    }
    o += P('paars', 'M118 300 C112 360 130 430 205 478 C280 430 298 360 292 300', 1.8);
    o += '<text x="200" y="590" text-anchor="middle" fill="var(--goud)" fill-opacity=".9" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="34">Charles Darwin</text>';
    o += '<text x="200" y="622" text-anchor="middle" fill="var(--oker)" font-family="IBM Plex Mono, monospace" font-size="16" letter-spacing="3">1809 – 1882</text>';
    return g('translate(' + tx + ' ' + ty + ') scale(' + sc + ')', o);
  }
  function ithink(x, y, s) { // zijn beroemde notitieboekschets uit 1837, vrij nagetekend
    var r = rnd(1837), o = '<text x="' + f(x - s * .2) + '" y="' + f(y - s * 1.1) + '" fill="var(--oker)" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="' + f(s * .32) + '">I think</text>';
    o += C('oker', x, y + s * .35, 6, .8, vul('oker', .9)) + boom(x, y + s * .35, -1.57, s * .3, 5, 'oker', r, function (ex, ey) { return P('oker', 'M' + f(ex - 6) + ' ' + f(ey) + ' L' + f(ex + 6) + ' ' + f(ey), 1); });
    o += '<text x="' + f(x - s * .7) + '" y="' + f(y - s * .55) + '" fill="var(--oker)" font-family="Fraunces, Georgia, serif" font-size="' + f(s * .16) + '">A</text><text x="' + f(x + s * .45) + '" y="' + f(y - s * .7) + '" fill="var(--oker)" font-family="Fraunces, Georgia, serif" font-size="' + f(s * .16) + '">B</text>';
    return o;
  }
  function vink(x, y, s, snavel, c) {
    var o = P(c, 'M' + f(x - s) + ' ' + f(y + s * .2) + ' C' + f(x - s * .9) + ' ' + f(y - s * .7) + ' ' + f(x + s * .3) + ' ' + f(y - s * .8) + ' ' + f(x + s * .5) + ' ' + f(y - s * .2) + ' C' + f(x + s * .6) + ' ' + f(y + s * .5) + ' ' + f(x - s * .3) + ' ' + f(y + s * .8) + ' ' + f(x - s) + ' ' + f(y + s * .2) + 'Z', 1.3, vul(c, .25));
    var bl = [s * .35, s * .6, s * .9][snavel], bh = [s * .3, s * .2, s * .1][snavel];
    o += P('goud', 'M' + f(x + s * .45) + ' ' + f(y - s * .45) + ' L' + f(x + s * .45 + bl) + ' ' + f(y - s * .3) + ' L' + f(x + s * .45) + ' ' + f(y - s * .45 + bh * 2) + 'Z', 1, vul('goud', .7));
    o += C('paars', x + s * .2, y - s * .4, s * .07, .6, vul('paars', 1)) + P(c, 'M' + f(x - s * .2) + ' ' + f(y - s * .1) + ' Q' + f(x - s * .6) + ' ' + f(y + s * .1) + ' ' + f(x - s * 1.2) + ' ' + f(y + s * .6), .8);
    return o + P('oker', 'M' + f(x - s * .1) + ' ' + f(y + s * .7) + ' l-' + f(s * .1) + ' ' + f(s * .4) + ' M' + f(x + s * .1) + ' ' + f(y + s * .7) + ' l' + f(s * .05) + ' ' + f(s * .4), .8);
  }
  function schip(x, y, s) {
    var o = P('oker', 'M' + f(x - s) + ' ' + y + ' L' + f(x + s * 1.1) + ' ' + y + ' L' + f(x + s * .8) + ' ' + f(y + s * .3) + ' L' + f(x - s * .8) + ' ' + f(y + s * .3) + 'Z', 1.4, vul('oker', .3));
    [-.5, .1, .6].forEach(function (m, i) { var mx = x + m * s, h = s * (1.4 - i * .2); o += P('oker', 'M' + f(mx) + ' ' + y + ' L' + f(mx) + ' ' + f(y - h), 1.1); for (var z = 0; z < 3; z++) o += P('goud', 'M' + f(mx - s * .25) + ' ' + f(y - h * (.3 + z * .25)) + ' Q' + f(mx) + ' ' + f(y - h * (.3 + z * .25) - s * .12) + ' ' + f(mx + s * .25) + ' ' + f(y - h * (.3 + z * .25)) + ' L' + f(mx + s * .2) + ' ' + f(y - h * (.12 + z * .25)) + ' L' + f(mx - s * .2) + ' ' + f(y - h * (.12 + z * .25)) + 'Z', .7, vul('goud', .25)); });
    return o + '<text x="' + f(x - s * .3) + '" y="' + f(y + s * .62) + '" fill="var(--oker)" font-family="IBM Plex Mono, monospace" font-size="' + f(s * .17) + '" letter-spacing="2">HMS BEAGLE</text>';
  }
  function schildpad(x, y, s) { var o = P('groen', 'M' + f(x - s) + ' ' + y + ' C' + f(x - s) + ' ' + f(y - s * 1.1) + ' ' + f(x + s) + ' ' + f(y - s * 1.1) + ' ' + f(x + s) + ' ' + y + 'Z', 1.4, vul('groen', .25)); o += raat(x - s * .55, y - s * .62, s * .2, 3, 'groen'); return o + P('groen', 'M' + f(x + s) + ' ' + f(y - s * .2) + ' Q' + f(x + s * 1.5) + ' ' + f(y - s * .5) + ' ' + f(x + s * 1.6) + ' ' + f(y - s * .2), 1.4) + P('groen', 'M' + f(x - s * .6) + ' ' + y + ' l0 ' + f(s * .3) + ' M' + f(x + s * .6) + ' ' + y + ' l0 ' + f(s * .3), 1.4); }

  /* ---------- platen per thema ---------- */
  var T = {};
  T.cellen = function () { var o = wolken(11, 9); o += cel(1250, 300, 230, 3) + cel(300, 760, 170, 7) + cel(820, 900, 120, 11) + cel(1480, 820, 110, 13) + cel(140, 160, 90, 17);
    // Hooke's kurk: cellenraster
    o += g('translate(560 40)', veel(1, 1, function () { var q = ''; for (var i = 0; i < 7; i++) for (var j = 0; j < 4; j++) q += P('oker', 'M' + (i * 42 + (j % 2) * 21) + ' ' + (j * 36) + ' l40 0 l0 34 l-40 0Z', .7, (i + j) % 4 ? '' : vul('oker', .3)); return q; }));
    return o + veel(30, 5, function (q, k) { return C(KL[k % 6], q() * 1600, q() * 1000, 3 + q() * 9, .7, vul(KL[k % 6], .5)); }); };
  T.dna = function () { var o = wolken(21, 9); o += helix(-50, 120, 1650, 420, 70, 9, 'teal', 'paars') + helix(-50, 900, 1650, 640, 55, 8, 'koraal', 'goud') + helix(1200, -50, 1450, 1050, 45, 6, 'groen', 'teal');
    o += chromosoom(260, 520, 90, .3, 'paars') + chromosoom(1420, 160, 70, -.4, 'koraal') + chromosoom(820, 980, 60, .9, 'teal') + chromosoom(560, 90, 50, 1.2, 'groen');
    return o + veel(40, 8, function (q, k) { return '<text x="' + f(q() * 1600) + '" y="' + f(q() * 1000) + '" fill="var(--' + KL[k % 6] + ')" fill-opacity=".8" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="' + f(18 + q() * 22) + '">' + 'ATCG'[k % 4] + '</text>'; }); };
  T.stofwisseling = function () { var o = wolken(31, 9); // zon, bladeren, mitochondriën, energie
    o += C('goud', 1350, 170, 110, 2, vul('goud', .35)) + veel(24, 2, function (q, k) { var a = k / 24 * 6.28; return P('goud', 'M' + f(1350 + 130 * Math.cos(a)) + ' ' + f(170 + 130 * Math.sin(a)) + ' L' + f(1350 + (190 + (k % 2) * 50) * Math.cos(a)) + ' ' + f(170 + (190 + (k % 2) * 50) * Math.sin(a)), 1.4); });
    o += veel(16, 4, function (q) { return blad(q() * 1500, 200 + q() * 800, 80 + q() * 120, q() * 6.28, q() < .5 ? 'groen' : 'teal'); });
    o += veel(10, 6, function (q) { var x = q() * 1500, y = q() * 950, a = q() * 180; return E('koraal', x, y, 70, 34, a, 1.4, vul('koraal', .3)) + P('koraal', 'M' + (x - 50) + ' ' + y + ' l12 -18 l12 30 l12 -30 l12 30 l12 -30 l12 30 l12 -12', .8, 'transform="rotate(' + f(a) + ' ' + f(x) + ' ' + f(y) + ')"'); });
    return o + veel(18, 9, function (q, k) { return '<text x="' + f(q() * 1600) + '" y="' + f(q() * 1000) + '" fill="var(--' + KL[k % 6] + ')" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="' + f(20 + q() * 18) + '">' + ['ATP', 'O₂', 'CO₂', 'H₂O', 'C₆H₁₂O₆'][k % 5] + '</text>'; }); };
  T.voeding = function () { var o = wolken(41, 9); o += veel(1, 1, function () { var q = ''; for (var i = 0; i < 18; i++) q += vlok(60 + i * 88, 1000, 60, 220 + (i % 3) * 50, KL[i % 6]); return q; });
    o += P('oker', 'M-40 120 C300 40 420 300 700 200 S1100 40 1300 220 S1500 420 1680 300', 3, vul('oker', .08)) + P('oker', 'M-40 190 C300 110 420 370 700 270 S1100 110 1300 290 S1500 490 1680 370', 3);
    o += veel(40, 3, function (q, k) { var x = q() * 1600, y = 120 + q() * 600; return k % 3 ? C(KL[k % 6], x, y, 6 + q() * 12, .8, vul(KL[k % 6], .5)) : P(KL[k % 6], 'M' + f(x) + ' ' + f(y) + ' l14 -8 l14 8 l14 -8 l14 8', 1); });
    return o + blad(1300, 520, 160, -.6, 'groen') + blad(200, 480, 140, -2.4, 'groen'); };
  T.transport = function () { var o = wolken(51, 9), r = rnd(5);
    o += boom(640, 260, -2.6, 170, 7, 'koraal', r) + boom(960, 260, -.5, 170, 7, 'koraal', r) + boom(700, 650, 2.4, 160, 7, 'teal', r) + boom(900, 650, .7, 160, 7, 'teal', r);
    return o + veel(46, 7, function (q) { return rbc(q() * 1600, q() * 1000, 14 + q() * 16, q() * 180); }); };
  T.gaswisseling = function () { var o = wolken(61, 9), r = rnd(9);
    o += P('teal', 'M790 60 L790 330', 6) + P('teal', 'M790 330 C700 360 620 420 520 470 M790 330 C880 360 960 420 1080 470', 4);
    o += P('teal', 'M760 340 C560 300 360 420 360 700 C360 900 600 940 740 860 Z', 2, vul('teal', .1)) + P('teal', 'M820 340 C1020 300 1240 420 1240 700 C1240 900 1000 940 860 860 Z', 2, vul('teal', .1));
    o += boom(520, 470, 2.0, 120, 6, 'koraal', r, function (x, y) { return C('koraal', x, y, 9, .6, vul('koraal', .5)) + C('koraal', x + 9, y + 6, 7, .5, vul('koraal', .4)); }) + boom(1080, 470, 1.1, 120, 6, 'koraal', r, function (x, y) { return C('koraal', x, y, 9, .6, vul('koraal', .5)) + C('koraal', x - 9, y + 6, 7, .5, vul('koraal', .4)); });
    return o + veel(40, 4, function (q, k) { var x = q() * 1600, y = q() * 1000; return C(k % 2 ? 'teal' : 'goud', x, y, 8 + q() * 20, .8, k % 3 ? '' : vul('teal', .3)) + (k % 5 === 0 ? '<text x="' + f(x) + '" y="' + f(y) + '" fill="var(--' + (k % 2 ? 'teal' : 'goud') + ')" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="22">' + (k % 2 ? 'O₂' : 'CO₂') + '</text>' : ''); }); };
  T.afweer = function () { var o = wolken(71, 9); o += veel(14, 3, function (q, k) { return virus(q() * 1600, q() * 1000, 22 + q() * 34, ['koraal', 'paars', 'goud'][k % 3]); });
    o += veel(30, 5, function (q, k) { return antistof(q() * 1600, q() * 1000, 26 + q() * 26, q() * 360, ['teal', 'groen', 'paars'][k % 3]); });
    o += veel(4, 8, function (q) { var x = 200 + q() * 1200, y = 150 + q() * 700, d = '', R = 110; for (var t = 0; t <= 6.3; t += .3) { var rr = R * (1 + .25 * Math.sin(t * 4 + x)); d += (d ? ' L' : 'M') + f(x + rr * Math.cos(t)) + ' ' + f(y + rr * Math.sin(t)); } return P('teal', d + 'Z', 1.6, vul('teal', .15)) + C('paars', x, y, 34, 1, vul('paars', .35)); });
    return o; };
  T.regeling = function () { var o = wolken(81, 9); o += neuron(250, 300, 520, .15, 'paars', 1) + neuron(1350, 720, 480, 3.4, 'teal', 2) + neuron(600, 860, 380, -.5, 'koraal', 3) + neuron(1300, 160, 300, 2.6, 'groen', 4);
    return o + veel(20, 9, function (q, k) { var x = q() * 1600, y = q() * 1000, s = 16 + q() * 14, d = ''; for (var i = 0; i < 6; i++) { var a = i / 6 * 6.28; d += (i ? ' L' : 'M') + f(x + s * Math.cos(a)) + ' ' + f(y + s * Math.sin(a)); } return P(KL[k % 6], d + 'Z', 1, vul(KL[k % 6], .4)); }); };
  T.voortplanting = function () { var o = wolken(91, 9); o += C('koraal', 1100, 480, 200, 2.6, vul('koraal', .22)) + C('goud', 1100, 480, 60, 1.4, vul('goud', .45));
    o += veel(60, 2, function (q) { var a = q() * 6.28; return C('oker', 1100 + 235 * Math.cos(a), 480 + 235 * Math.sin(a), 8 + q() * 8, .7, vul('oker', .4)); });
    o += veel(26, 4, function (q) { var x = q() * 800, y = q() * 1000; return zaadcel(x, y, 40 + q() * 30, Math.atan2(480 - y, 1100 - x), ['teal', 'paars', 'groen'][Math.floor(q() * 3)]); });
    [[1450, 150, 1], [1500, 330, 2], [1450, 860, 4], [1300, 900, 8]].forEach(function (p) { var n = p[2], R = 36; o += C('goud', p[0], p[1], R + 10, 1, vul('goud', .15)); for (var k = 0; k < n; k++) { var a = k / n * 6.28; o += C('koraal', p[0] + (n > 1 ? R * .5 * Math.cos(a) : 0), p[1] + (n > 1 ? R * .5 * Math.sin(a) : 0), n > 1 ? R * .45 : R, .8, vul('koraal', .35)); } });
    return o; };
  T.erfelijkheid = function () { var o = wolken(101, 9); // Mendel: erwten, peulen, ranken
    var r = rnd(6); o += P('groen', 'M120 1020 C160 800 80 600 180 380 S260 120 220 -20', 2.4) + P('groen', 'M520 1020 C560 820 470 640 560 440 S620 160 600 -20', 2);
    o += veel(10, 7, function (q, k) { var x = (k % 2 ? 180 : 560) + (q() - .5) * 60, y = 100 + k * 90; return blad(x, y, 80 + q() * 40, k % 2 ? -.4 : 3.5, 'groen') + rank(x + 30, y + 40, 18, 'groen'); });
    o += veel(9, 3, function (q) { return erwtepeul(250 + q() * 1200, 450 + q() * 520, 130 + q() * 60, q() * 6.28); });
    return o + veel(30, 5, function (q, k) { return C(k % 2 ? 'goud' : 'groen', q() * 1600, q() * 1000, 6 + q() * 10, .8, vul(k % 2 ? 'goud' : 'groen', .8)); }) + chromosoom(900, 200, 70, .4, 'koraal') + chromosoom(1450, 620, 60, -.3, 'teal'); };
  T.evolutie = function () { var o = wolken(111, 10); o += ithink(170, 470, 260) + schildpad(1430, 640, 70) + vink(1470, 380, 60, 2, 'paars');
    o += vink(160, 760, 70, 0, 'goud') + vink(380, 820, 60, 1, 'koraal') + vink(600, 760, 55, 2, 'teal') + vink(840, 880, 50, 0, 'groen');
    o += golf(960, 14, 'teal', 1.2) + golf(990, 12, 'teal', .8) + schip(1450, 930, 110);
    return o + veel(10, 4, function (q) { return blad(q() * 1600, q() * 200, 50 + q() * 40, q() * 6.28, 'groen'); }); };
  T.ecologie = function () { var o = wolken(121, 9), r = rnd(4); o += C('goud', 1350, 150, 80, 2, vul('goud', .4)) + P('oker', 'M-20 700 L260 420 L460 640 L700 360 L980 680 L1240 460 L1620 720', 2.2, vul('oker', .08));
    o += veel(14, 2, function (q, k) { var x = q() * 1600; return k % 2 ? den(x, 860, 160 + q() * 120, 'groen') : loofboom(x, 860, 220 + q() * 120, 'groen', k); });
    o += P('oker', 'M-20 860 L1620 860', 1.6) + boom(400, 870, 1.57, 60, 6, 'oker', r, function (x, y) { return C('goud', x, y, 4, .6, vul('goud', .8)); }) + boom(1150, 870, 1.57, 60, 6, 'oker', r, function (x, y) { return C('goud', x, y, 4, .6, vul('goud', .8)); });
    return o + veel(22, 6, function (q) { return vogel(q() * 1600, 80 + q() * 300, 14 + q() * 16, 'paars'); }) + veel(8, 7, function (q) { return bloem(q() * 1600, 880 + q() * 60, 16, KL[Math.floor(q() * 6)], 6); }); };
  T.gedrag = function () { var o = wolken(131, 9); // spreeuwenwolk, bijendans, raat
    var r = rnd(3); for (var k = 0; k < 140; k++) { var t = k / 140, x = 200 + t * 1200 + Math.sin(t * 9) * 160, y = 220 + Math.sin(t * 5) * 120 + (r() - .5) * 120; o += vogel(x, y, 6 + r() * 10, k % 3 ? 'paars' : 'teal'); }
    o += raat(980, 560, 40, 7, 'goud') + P('oker', 'M200 700 C200 560 420 560 420 700 C420 840 200 840 200 700 Z M310 600 L310 800', 1.6, 'stroke-dasharray="10 8"');
    return o + bij(310, 690, 28) + bij(700, 520, 22) + bij(1450, 300, 26) + veel(8, 5, function (q) { return bloem(q() * 900, 800 + q() * 150, 20, KL[Math.floor(q() * 6)], 7); }); };
  T.planten = function () { var o = wolken(141, 9), r = rnd(8); o += boom(800, 640, 1.57, 120, 7, 'oker', r, function (x, y) { return C('oker', x, y, 3, .5, vul('oker', .8)); });
    o += P('groen', 'M800 640 C780 460 840 300 800 120', 3) + veel(8, 1, function (q, k) { return blad(800 + (k % 2 ? 4 : -4), 560 - k * 55, 110 + q() * 50, k % 2 ? -.5 : 3.6, k % 3 ? 'groen' : 'teal'); }) + bloem(800, 110, 60, 'koraal', 9);
    o += P('oker', 'M-20 640 L1620 640', 1.6) + paardebloem(250, 300, 120, 'goud') + paardebloem(1350, 360, 100, 'paars') + C('goud', 1400, 110, 60, 1.6, vul('goud', .4));
    return o + veel(20, 3, function (q) { return ster(q() * 1600, q() * 600, 12 + q() * 12, 'goud'); }) + veel(6, 9, function (q) { return bloem(q() * 1600, 560 + q() * 40, 22, KL[Math.floor(q() * 6)], 6); }); };
  T.kerndoelen = function () { var o = wolken(151, 9); o += cel(1250, 260, 170, 5) + helix(-40, 820, 900, 980, 40, 5, 'teal', 'paars') + loofboom(250, 520, 300, 'groen', 2) + den(500, 560, 240, 'groen');
    return o + veel(8, 4, function (q) { return blad(q() * 1600, q() * 1000, 70 + q() * 60, q() * 6.28, 'groen'); }) + bij(900, 200, 26) + vink(1400, 820, 60, 1, 'koraal') + veel(20, 2, function (q, k) { return C(KL[k % 6], q() * 1600, q() * 1000, 5 + q() * 9, .7, vul(KL[k % 6], .5)); }); };
  T.extra = function () { var o = wolken(161, 9); return o + helix(-40, 200, 1640, 500, 60, 8, 'paars', 'teal') + cel(1300, 760, 150, 9) + virus(300, 760, 50, 'koraal') + neuron(500, 300, 300, .4, 'goud', 9) + ithink(1350, 260, 260); };

  window.THEMAKUNST = T;
  /* hoofdfiguur per thema, groot in de kop van de themapagina: [viewBox, inhoud] */
  var H = {
    evolutie: ['0 0 400 640', function () { return darwin(0, 0, 1); }],
    cellen: ['0 0 400 400', function () { return cel(200, 200, 165, 3); }],
    dna: ['0 0 400 400', function () { return helix(200, -10, 200, 410, 80, 2.5, 'teal', 'paars') + chromosoom(90, 300, 55, .4, 'koraal') + chromosoom(320, 110, 45, -.5, 'groen'); }],
    stofwisseling: ['0 0 400 400', function () { return C('goud', 280, 110, 60, 1.6, vul('goud', .4)) + blad(40, 300, 260, -.6, 'groen') + blad(120, 360, 160, -1.2, 'teal'); }],
    voeding: ['0 0 400 400', function () { var q = ''; for (var i = 0; i < 6; i++) q += vlok(40 + i * 64, 390, 48, 220 + (i % 3) * 50, KL[i % 6]); return q; }],
    transport: ['0 0 400 400', function () { return hart(200, 230, 120) + rbc(70, 340, 26, 20) + rbc(330, 350, 22, -30); }],
    gaswisseling: ['0 0 400 400', function () { var r = rnd(9); return P('teal', 'M200 10 L200 120', 4) + P('teal', 'M185 125 C110 110 40 170 40 280 C40 370 140 390 190 350 Z', 1.6, vul('teal', .12)) + P('teal', 'M215 125 C290 110 360 170 360 280 C360 370 260 390 210 350 Z', 1.6, vul('teal', .12)) + boom(200, 120, 2.2, 60, 5, 'koraal', r, function (x, y) { return C('koraal', x, y, 6, .5, vul('koraal', .5)); }) + boom(200, 120, .95, 60, 5, 'koraal', r, function (x, y) { return C('koraal', x, y, 6, .5, vul('koraal', .5)); }); }],
    afweer: ['0 0 400 400', function () { return virus(200, 200, 90, 'koraal') + antistof(60, 90, 40, -30, 'teal') + antistof(340, 110, 36, 40, 'paars') + antistof(330, 330, 40, 140, 'groen') + antistof(70, 320, 34, -140, 'teal'); }],
    regeling: ['0 0 400 400', function () { return neuron(110, 170, 300, .35, 'paars', 1); }],
    voortplanting: ['0 0 400 400', function () { var o = C('koraal', 250, 210, 120, 2.2, vul('koraal', .22)) + C('goud', 250, 210, 36, 1.2, vul('goud', .45)); for (var k = 0; k < 22; k++) { var a = k / 22 * 6.28; o += C('oker', 250 + 140 * Math.cos(a), 210 + 140 * Math.sin(a), 7, .6, vul('oker', .4)); } return o + zaadcel(60, 120, 36, .4, 'teal') + zaadcel(50, 300, 32, -.3, 'paars') + zaadcel(110, 360, 30, -.8, 'groen'); }],
    erfelijkheid: ['0 0 400 400', function () { var o = '', x0 = 120, y0 = 30, s = 80; for (var i = 0; i <= 2; i++) o += P('paars', 'M' + x0 + ' ' + (y0 + i * s) + ' l' + (2 * s) + ' 0', 1) + P('paars', 'M' + (x0 + i * s) + ' ' + y0 + ' l0 ' + (2 * s), 1); [['AA', 'Aa'], ['Aa', 'aa']].forEach(function (rij, j) { rij.forEach(function (t, i) { o += '<text x="' + (x0 + i * s + 18) + '" y="' + (y0 + j * s + 52) + '" fill="var(--' + (t === 'aa' ? 'groen' : 'goud') + ')" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="34">' + t + '</text>'; }); }); return o + erwtepeul(30, 300, 230, -.25) + erwtepeul(200, 370, 170, -.1) + rank(40, 230, 20, 'groen'); }],
    ecologie: ['0 0 400 400', function () { return C('goud', 320, 70, 40, 1.4, vul('goud', .4)) + loofboom(120, 360, 300, 'groen', 2) + den(290, 370, 230, 'groen') + vogel(220, 90, 18, 'paars') + vogel(260, 130, 12, 'paars') + P('oker', 'M0 370 L400 370', 1.2); }],
    gedrag: ['0 0 400 400', function () { return raat(70, 60, 40, 4, 'goud') + bij(300, 300, 40) + P('oker', 'M120 320 C120 250 230 250 230 320 C230 390 120 390 120 320 Z M175 270 L175 370', 1.2, 'stroke-dasharray="8 6"'); }],
    planten: ['0 0 400 400', function () { var r = rnd(4); return boom(200, 300, 1.57, 40, 5, 'oker', r) + P('groen', 'M200 300 C190 220 215 150 200 80', 2.4) + blad(200, 250, 110, -.5, 'groen') + blad(200, 200, 100, 3.6, 'teal') + bloem(200, 70, 40, 'koraal', 9) + P('oker', 'M20 300 L380 300', 1); }],
    kerndoelen: ['0 0 400 400', function () { return cel(200, 200, 150, 5); }],
    extra: ['0 0 400 400', function () { return ithink(200, 200, 300); }]
  };
  window.THEMAHELD = {};
  Object.keys(H).forEach(function (id) { window.THEMAHELD[id] = function () { return '<svg viewBox="' + H[id][0] + '" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="">' + H[id][1]() + '</svg>'; }; });

})();

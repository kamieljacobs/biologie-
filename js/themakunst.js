/* Themakunst · Biologie bij Kamiel
   Per thema één intense, kleurrijke bio-art-plaat als achtergrond van de themapagina.
   Alles procedureel getekend als SVG (viewBox 1600×1000), in de huiskleuren, zonder korrel.
   Gebruik: window.THEMAKUNST[id]() geeft de binnenkant van een <svg>. Kamiel 20 okt 2026:
   'nog dikker en kleurrijker, geïnspireerd door het thema zelf' (bijv. Darwin bij Evolutie). */
(function () {
  var W = 1.15; // fijne inktlijnen (Kamiel 20 okt: realistischer en serieuzer, kleur alleen waar het iets toevoegt)
  var ACC = [];  // kleuren die op de huidige plaat mogen; de rest wordt inkt
  var ACCENT = { examens: ['goud', 'groen', 'koraal'], cellen: ['paars', 'koraal'], dna: ['teal'], stofwisseling: ['groen'], voeding: ['koraal'], transport: ['koraal'], gaswisseling: ['koraal', 'teal'], afweer: ['paars'], regeling: [], voortplanting: ['koraal'], erfelijkheid: ['groen'], evolutie: [], ecologie: ['goud'], milieu: ['teal', 'groen'], gedrag: ['goud'], planten: ['groen'], kerndoelen: ['groen'], extra: [] };
  function kleur(c) { return ACC.indexOf(c) >= 0 ? c : (c === 'inktdonker' ? 'text' : 'text2'); }
  var DEFS = '<defs><pattern id="tk-arc" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 0V5" stroke="var(--text2)" stroke-width=".7"/></pattern><pattern id="tk-kruis" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 0V5M0 0H5" stroke="var(--text2)" stroke-width=".6"/></pattern><pattern id="tk-stip" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".7" fill="var(--text2)"/><circle cx="4.5" cy="4.5" r=".5" fill="var(--text2)"/></pattern></defs>';
  var KL = ['goud', 'teal', 'groen', 'koraal', 'paars', 'oker'];
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function f(n) { return Math.round(n * 10) / 10; }
  function P(c, d, w, extra) { return '<path d="' + d + '" stroke="var(--' + kleur(c) + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  function C(c, x, y, r, w, extra) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" stroke="var(--' + kleur(c) + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  function E(c, x, y, rx, ry, rot, w, extra) { return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" transform="rotate(' + f(rot) + ' ' + f(x) + ' ' + f(y) + ')" stroke="var(--' + kleur(c) + ')" stroke-width="' + f(w * W) + '" ' + (extra || '') + '/>'; }
  /* vulling: een toegestane kleur blijft kleur (licht), al het andere wordt arcering zoals in een gravure */
  function vul(c, o) { return ACC.indexOf(c) >= 0 ? 'fill="var(--' + c + ')" fill-opacity="' + f(Math.min(.55, o * .9)) + '"' : 'fill="url(#' + (o > .45 ? 'tk-kruis' : o > .2 ? 'tk-arc' : 'tk-stip') + ')" fill-opacity="' + f(Math.min(1, .35 + o)) + '"'; }
  function wolken(seed) { // sober: papiertoon met een vleugje accentkleur
    var r = rnd(seed), o = '<defs><filter id="tk' + seed + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="90"/></filter></defs><g filter="url(#tk' + seed + ')">';
    for (var k = 0; k < 4; k++) o += '<circle cx="' + f(r() * 1600) + '" cy="' + f(r() * 1000) + '" r="' + f(220 + r() * 220) + '" fill="var(--' + (ACC.length && k % 2 ? ACC[k % ACC.length] : 'oker') + ')" fill-opacity="' + f(0.07 + r() * 0.06) + '" stroke="none"/>';
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
  function hart(x, y, s) { // anatomischer: kamers, aortaboog, longslagader, holle aders, kransvaten, arcering
    var k = function (u, v) { return f(x + u * s) + ' ' + f(y + v * s); };
    var o = '<path d="M' + k(-.15, -.55) + ' C' + k(-.75, -.6) + ' ' + k(-1.05, -.1) + ' ' + k(-.85, .35) + ' C' + k(-.65, .8) + ' ' + k(-.15, 1.05) + ' ' + k(.12, 1.18) + ' C' + k(.35, .95) + ' ' + k(.85, .55) + ' ' + k(.9, .05) + ' C' + k(.95, -.35) + ' ' + k(.6, -.6) + ' ' + k(.25, -.55) + 'Z" ' + vul('koraal', .35) + ' stroke="var(--' + kleur('koraal') + ')" stroke-width="' + f(1.8 * W) + '"/>';
    o += P('koraal', 'M' + k(-.05, -.5) + ' C' + k(-.1, -1.05) + ' ' + k(.55, -1.2) + ' ' + k(.7, -.85) + ' L' + k(.72, -.55), 2.4) + P('koraal', 'M' + k(.22, -.98) + ' L' + k(.24, -1.25) + ' M' + k(.4, -1.02) + ' L' + k(.45, -1.28) + ' M' + k(.55, -.95) + ' L' + k(.66, -1.18), 1.4);
    o += P('teal', 'M' + k(.15, -.5) + ' C' + k(.2, -.8) + ' ' + k(-.1, -.95) + ' ' + k(-.35, -.9), 2.2) + P('teal', 'M' + k(-.55, -.45) + ' L' + k(-.6, -1.2) + ' M' + k(-.6, .5) + ' L' + k(-.75, .95), 2.2);
    o += P('koraal', 'M' + k(-.1, -.4) + ' C' + k(.1, .1) + ' ' + k(0, .6) + ' ' + k(.1, 1.05), .9) + P('koraal', 'M' + k(-.05, -.2) + ' q' + f(-.25 * s) + ' ' + f(.15 * s) + ' ' + f(-.45 * s) + ' ' + f(.1 * s) + ' M' + k(.05, .3) + ' q' + f(.2 * s) + ' ' + f(.05 * s) + ' ' + f(.4 * s) + ' ' + f(-.1 * s), .6);
    o += '<path d="M' + k(.3, .9) + ' C' + k(.7, .6) + ' ' + k(.92, .2) + ' ' + k(.9, -.1) + ' C' + k(.7, .25) + ' ' + k(.5, .6) + ' ' + k(.3, .9) + 'Z" fill="url(#tk-arc)" fill-opacity=".8" stroke="none"/>';
    return o;
  }


  /* ---------- Darwin: eigen gravure-achtige portretschets, zwart-wit (oudere Darwin, grote witte baard) ---------- */
  function darwin(tx, ty, sc) {
    var r = rnd(1809), o = '', I = 'text', I2 = 'text2';
    function L(d, w, op) { return '<path d="' + d + '" stroke="var(--' + I + ')" stroke-opacity="' + (op || .85) + '" stroke-width="' + f(w) + '" fill="none"/>'; }
    function arc(x1, y1, x2, y2, n, dx, dy, w, op) { var q = ''; for (var k = 0; k < n; k++) { var t = k / (n - 1 || 1); q += L('M' + f(x1 + (x2 - x1) * t) + ' ' + f(y1 + (y2 - y1) * t) + ' l' + f(dx + (r() - .5) * 2) + ' ' + f(dy + (r() - .5) * 3), w, op); } return q; }
    // ovaal medaillon, oude foto
    o += '<ellipse cx="200" cy="300" rx="190" ry="280" fill="var(--oker)" fill-opacity=".10" stroke="var(--text2)" stroke-opacity=".5" stroke-width="1.2"/><ellipse cx="200" cy="300" rx="180" ry="270" fill="none" stroke="var(--text2)" stroke-opacity=".35" stroke-width=".6"/>';
    // jas: donkere schouders met kruisarcering, witte kraag en das onder de baard
    o += '<path d="M36 560 C44 470 92 426 150 410 C170 404 230 404 250 410 C308 426 356 470 364 560 Z" fill="url(#tk-kruis)" fill-opacity=".95" stroke="var(--text)" stroke-width="1.3"/>';
    o += L('M150 412 C156 460 166 510 176 560 M250 412 C244 460 234 510 224 560', 1.1) + L('M108 440 C120 470 126 510 128 556 M292 440 C280 470 274 510 272 556', .7, .6);
    o += '<path d="M168 404 L200 424 L232 404 L226 440 L200 452 L174 440Z" fill="var(--bg)" stroke="var(--text)" stroke-width=".9"/>';
    // schedel: hoog en breed, kaal; licht van rechts dus schaduw links
    o += L('M126 250 C112 196 112 128 140 92 C168 56 236 52 266 84 C294 116 298 196 284 250', 1.6, .95);
    o += arc(132, 118, 128, 236, 24, 13, 4, .55, .45);
    o += L('M158 118 C186 104 226 104 254 116', .7, .4) + L('M152 136 C186 122 228 122 258 134', .7, .35) + L('M160 152 C190 143 222 142 250 150', .6, .3);
    // grijze haren rond de oren
    for (var k = 0; k < 30; k++) { var side = k % 2, y = 160 + (k >> 1) * 5; o += L('M' + (side ? 284 : 126) + ' ' + f(y) + ' q' + f((side ? 1 : -1) * (6 + r() * 14)) + ' ' + f(6 + r() * 8) + ' ' + f((side ? 1 : -1) * (2 + r() * 10)) + ' ' + f(18 + r() * 16), .5, .55); }
    o += L('M285 192 C302 190 304 224 287 234', 1) + L('M125 192 C110 190 108 224 124 234', .9, .7);
    // zware, borstelige wenkbrauwen
    for (var b = 0; b < 2; b++) for (var k2 = 0; k2 < 26; k2++) { var t = k2 / 25, x = b ? 214 + t * 54 : 144 + t * 54, y = 184 - Math.sin(t * Math.PI) * 9 + (b ? t * 5 : (1 - t) * 5); o += L('M' + f(x) + ' ' + f(y) + ' l' + f((b ? 1 : -1) * (3 + r() * 6)) + ' ' + f(-4 - r() * 7), .8, .9); }
    // diepliggende ogen
    o += arc(152, 194, 198, 194, 12, 0, 10, .5, .5) + arc(216, 194, 262, 194, 12, 0, 10, .5, .4);
    o += L('M158 209 Q176 201 194 209', 1) + L('M220 209 Q239 201 256 209', 1);
    o += '<circle cx="177" cy="210" r="3.8" fill="var(--text)"/><circle cx="239" cy="210" r="3.8" fill="var(--text)"/>';
    o += L('M162 219 Q177 226 192 220 M224 220 Q239 226 254 219', .5, .5) + L('M154 226 Q160 236 172 238 M260 226 Q256 236 244 238', .5, .35);
    // neus: brede rug, schaduwzijde gearceerd
    o += L('M206 198 C202 220 205 240 214 252 C208 260 196 260 189 254', 1.3) + arc(197, 206, 194, 248, 10, -7, 2, .5, .45) + L('M218 252 C223 256 222 261 215 262', .8);
    // wangen
    o += arc(136, 238, 150, 262, 9, 9, 6, .5, .35) + arc(270, 240, 262, 262, 6, -6, 6, .45, .25);
    // baard: één volle, witte massa die over jas en kraag valt (silhouet in papierkleur), met golvende haren
    o += '<path d="M128 248 C116 290 108 330 120 372 C136 424 172 462 200 482 C228 462 264 424 280 372 C292 330 284 290 280 248 C250 268 226 270 206 264 C186 270 160 268 128 248Z" fill="var(--bg)" stroke="none"/>';
    o += '<path d="M128 248 C116 290 108 330 120 372 C136 424 172 462 200 482 C228 462 264 424 280 372 C292 330 284 290 280 248 C250 268 226 270 206 264 C186 270 160 268 128 248Z" class="tk-licht" fill="var(--oker)" fill-opacity=".06" stroke="none"/>';
    for (var k3 = 0; k3 <= 78; k3++) {
      var t3 = k3 / 78, u = (t3 - .5) * 2, sx = 128 + t3 * 152, sy = 250 + (1 - u * u) * 18;
      var ex = 200 + u * 84 * (1 - Math.abs(u) * .08), ey = 380 + (1 - u * u) * 98;
      var cx1 = sx + u * 40 + (r() - .5) * 12, cy1 = sy + 55 + r() * 20, cx2 = ex + u * 18 + (r() - .5) * 16, cy2 = ey - 70 - r() * 25;
      var rand = Math.abs(u), op = .22 + rand * rand * .6 + (k3 % 5 === 0 ? .15 : 0);
      o += L('M' + f(sx) + ' ' + f(sy) + ' C' + f(cx1) + ' ' + f(cy1) + ' ' + f(cx2) + ' ' + f(cy2) + ' ' + f(ex) + ' ' + f(ey), .4 + rand * .45, op);
      if (k3 % 3 === 0) o += L('M' + f(ex + (r() - .5) * 6) + ' ' + f(ey - 40 - r() * 60) + ' q' + f(u * 6 + (r() - .5) * 6) + ' ' + f(18 + r() * 10) + ' ' + f(u * 4) + ' ' + f(34 + r() * 14), .4, .25 + rand * .3);
    }
    o += L('M128 250 C116 290 108 330 120 372 C136 424 172 462 200 482 C228 462 264 424 280 372 C292 330 284 290 280 250', .9, .6);
    // snor eroverheen
    for (var m = 0; m < 40; m++) { var tm = m / 39, xm = 158 + tm * 100, ym = 262 - Math.sin(tm * Math.PI) * 6; o += L('M' + f(xm) + ' ' + f(ym) + ' q' + f((tm - .5) * 12) + ' ' + f(10 + r() * 6) + ' ' + f((tm - .5) * 30) + ' ' + f(20 + r() * 8), .55, .75); }
    // onderschrift in oude letters
    o += '<text x="200" y="604" text-anchor="middle" fill="var(--text)" fill-opacity=".85" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="30">Charles Darwin</text>';
    o += '<text x="200" y="632" text-anchor="middle" fill="var(--text2)" font-family="IBM Plex Mono, monospace" font-size="14" letter-spacing="3">1809 – 1882</text>';
    return g('translate(' + tx + ' ' + ty + ') scale(' + sc + ')', o);
  }
  function ithink(x, y, s) { // zijn beroemde notitieboekschets uit 1837, vrij nagetekend
    var r = rnd(1837), o = '<text x="' + f(x - s * .2) + '" y="' + f(y - s * 1.1) + '" fill="var(--text2)" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="' + f(s * .32) + '">I think</text>';
    o += C('oker', x, y + s * .35, 6, .8, vul('oker', .9)) + boom(x, y + s * .35, -1.57, s * .3, 5, 'oker', r, function (ex, ey) { return P('oker', 'M' + f(ex - 6) + ' ' + f(ey) + ' L' + f(ex + 6) + ' ' + f(ey), 1); });
    o += '<text x="' + f(x - s * .7) + '" y="' + f(y - s * .55) + '" fill="var(--text2)" font-family="Fraunces, Georgia, serif" font-size="' + f(s * .16) + '">A</text><text x="' + f(x + s * .45) + '" y="' + f(y - s * .7) + '" fill="var(--text2)" font-family="Fraunces, Georgia, serif" font-size="' + f(s * .16) + '">B</text>';
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
    return o + '<text x="' + f(x - s * .3) + '" y="' + f(y + s * .62) + '" fill="var(--text2)" font-family="IBM Plex Mono, monospace" font-size="' + f(s * .17) + '" letter-spacing="2">HMS BEAGLE</text>';
  }
  function schildpad(x, y, s) { var o = P('groen', 'M' + f(x - s) + ' ' + y + ' C' + f(x - s) + ' ' + f(y - s * 1.1) + ' ' + f(x + s) + ' ' + f(y - s * 1.1) + ' ' + f(x + s) + ' ' + y + 'Z', 1.4, vul('groen', .25)); o += raat(x - s * .55, y - s * .62, s * .2, 3, 'groen'); return o + P('groen', 'M' + f(x + s) + ' ' + f(y - s * .2) + ' Q' + f(x + s * 1.5) + ' ' + f(y - s * .5) + ' ' + f(x + s * 1.6) + ' ' + f(y - s * .2), 1.4) + P('groen', 'M' + f(x - s * .6) + ' ' + y + ' l0 ' + f(s * .3) + ' M' + f(x + s * .6) + ' ' + y + ' l0 ' + f(s * .3), 1.4); }

  /* ---------- Ecologie: een majestueuze wolf in een donker sparrenwoud (Kamiel 21 okt 2026: geen schema, een echt beest) ---------- */
  function catmull(pts, n) { // gesloten Catmull-Rom → dichte puntenlijst
    var out = [], L = pts.length;
    for (var i = 0; i < L; i++) {
      var p0 = pts[(i - 1 + L) % L], p1 = pts[i], p2 = pts[(i + 1) % L], p3 = pts[(i + 2) % L];
      for (var k = 0; k < n; k++) { var t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                  .5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); }
    }
    return out;
  }
  function binnen(pt, poly) { var x = pt[0], y = pt[1], c = false; for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) { var a = poly[i], b = poly[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function wolf(tx, ty, sc, idSuffix) {
    var r = rnd(1909), o = '', I = 'wolfinkt';
    function H(x1, y1, x2, y2, w, op) { return '<path d="M' + f(x1) + ' ' + f(y1) + ' L' + f(x2) + ' ' + f(y2) + '" stroke="' + (I === 'wolfinkt' ? '#2b2824' : 'var(--' + I + ')') + '" stroke-opacity="' + f(op) + '" stroke-width="' + f(w) + '"/>'; }
    // silhouet (kijkt naar links, staand, kop iets geheven): hand-uitgezette punten
    var S = [[34,90],[48,82],[72,78],[94,72],[108,60],[122,50],[126,26],[136,4],[150,28],[158,42],[164,34],[176,10],[188,34],[192,52],
      [206,64],[226,82],[250,92],[280,96],[312,98],[346,100],[378,98],[404,100],[426,110],[442,126],[460,152],[474,186],[478,214],[468,238],[452,242],
      [444,214],[434,186],[428,172],[434,194],[446,222],[448,254],[444,284],[458,298],[428,300],[420,268],[408,234],[390,204],[366,190],[336,188],
      [300,194],[272,202],[256,208],[252,232],[246,264],[246,286],[260,298],[224,300],[228,262],[224,232],[216,216],[212,250],[210,286],[220,298],[182,300],
      [186,262],[182,228],[176,208],[164,186],[150,166],[132,150],[108,136],[84,124],[62,114],[44,104],[34,98]];
    var poly = catmull(S, 6), d = 'M' + poly.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + 'Z';
    var clip = 'wolfclip' + idSuffix;
    o += '<defs><clipPath id="' + clip + '"><path d="' + d + '"/></clipPath><filter id="wolfzacht' + idSuffix + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter><radialGradient id="wolfgrond' + idSuffix + '"><stop offset="0" stop-color="#2b2824" stop-opacity=".35"/><stop offset="1" stop-color="#2b2824" stop-opacity="0"/></radialGradient></defs>';
    o += '<ellipse cx="300" cy="302" rx="200" ry="14" fill="url(#wolfgrond' + idSuffix + ')"/>';
    // ondergrond van de vacht: licht (papier) met een warme grijs-bruine waas, donkerder op rug en staart
    o += '<path d="' + d + '" fill="#f1eee8"/><path d="' + d + '" fill="#2b2824" fill-opacity=".2"/><path d="' + d + '" fill="#8a6a3a" fill-opacity=".10"/>';
    // lichte onderkant: buik, borst, binnenkant poten en snuit (wolven zijn daar bleek)
    o += '<g clip-path="url(#' + clip + ')"><g filter="url(#wolfzacht' + idSuffix + ')" fill="#f1eee8" fill-opacity=".75"><ellipse cx="300" cy="198" rx="110" ry="16"/><ellipse cx="180" cy="160" rx="34" ry="40"/><ellipse cx="66" cy="110" rx="34" ry="10"/><ellipse cx="140" cy="122" rx="22" ry="12"/><rect x="186" y="230" width="18" height="70"/><rect x="226" y="236" width="16" height="64"/><rect x="424" y="250" width="16" height="50"/></g></g>';
    // vachtstreken binnen het silhouet: richting en dichtheid per lichaamsdeel
    var fur = '';
    function regio(x, y) {
      if (x > 424 && y > 110) return { a: 1.35, l: 12, op: y > 215 ? .95 : .6 };         // staart, donkere punt
      if (x < 120 && y > 70) return { a: .05, l: 4, op: y > 104 ? .18 : .4 };             // snuit: kort, bleek aan de onderkant
      if (x < 196 && y < 130) return { a: -.1, l: 6, op: y < 70 ? .7 : .5 };              // kop: donkerder voorhoofd
      if (x < 240 && y >= 100 && y < 200) return { a: 1.15, l: 15, op: .4 };               // halskraag en borst: lang, naar beneden
      if (y >= 205) return { a: 1.52, l: 5, op: .38 };                                     // poten
      var zadel = y < 122 ? .95 : y < 145 ? .65 : y < 165 ? .4 : .2;                       // donker zadel, lichte buik
      return { a: .12 + (y - 100) * .004, l: 11, op: zadel };
    }
    for (var n = 0; n < 5600; n++) {
      var x = 30 + r() * 450, y = 8 + r() * 295; if (!binnen([x, y], poly)) continue;
      var g0 = regio(x, y), a = g0.a + (r() - .5) * .35, l = g0.l * (.6 + r() * .8);
      fur += H(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, .4 + r() * .45, g0.op * (.4 + r() * .5));
    }
    o += '<g clip-path="url(#' + clip + ')">' + fur + '</g>';
    // rafelige vachtrand: korte haren naar buiten langs de omtrek, langer bij kraag, staart en buik
    var rand = '';
    for (var i = 0; i < poly.length; i += 1) {
      var p = poly[i], q = poly[(i + 1) % poly.length], tx2 = q[0] - p[0], ty2 = q[1] - p[1], len = Math.sqrt(tx2 * tx2 + ty2 * ty2) || 1;
      var nx = ty2 / len, ny = -tx2 / len; // buitennormaal (pad loopt met de klok mee in schermcoördinaten)
      var lang = (p[0] > 140 && p[0] < 240 && p[1] > 110) ? 6 : (p[0] > 426) ? 4 : (p[1] > 180 && p[1] < 210) ? 4 : (p[1] > 280 || p[0] < 60) ? 0 : 1.6;
      if (!lang) continue;
      for (var k2 = 0; k2 < 1; k2++) { var s = r(), bx = p[0] + tx2 * s, by = p[1] + ty2 * s, ll = lang * (.4 + r()), aa = Math.atan2(ny * .45 + ty2 / len, nx * .45 + tx2 / len) + (r() - .5) * .4;
        rand += H(bx - nx * 2, by - ny * 2, bx + Math.cos(aa) * ll, by + Math.sin(aa) * ll, .5 + r() * .3, .45 + r() * .25); }
    }
    o += rand + '<path d="' + d + '" fill="none" stroke="#2b2824" stroke-opacity=".45" stroke-width=".8"/>';
    // gezicht: donker masker rond de ogen, amberkleurig oog, natte neus, mondlijn, oren
    o += '<path d="M98 70 C108 62 124 62 134 70 C126 76 112 80 98 70Z" fill="#2b2824" fill-opacity=".55"/>';
    o += '<path d="M104 70 C110 64 122 64 128 70 C122 74 110 75 104 70Z" fill="var(--' + kleur('goud') + ')" fill-opacity=".95"/>';
    o += '<circle cx="117" cy="69.5" r="2.6" fill="#2b2824"/><circle cx="118.4" cy="68.6" r=".8" fill="#f1eee8"/>';
    o += '<path d="M128 70 C138 72 146 76 154 82" stroke="#2b2824" stroke-opacity=".6" stroke-width="1" fill="none"/>';
    o += '<path d="M29 88 C31 82 42 81 46 87 C47 94 37 98 30 95Z" fill="#2b2824"/><path d="M33 86 q4 -2 8 0" stroke="#f1eee8" stroke-opacity=".6" stroke-width=".6" fill="none"/>';
    o += '<path d="M40 103 C56 110 74 114 94 112" stroke="#2b2824" stroke-opacity=".75" stroke-width="1.1" fill="none"/>';
    o += '<path d="M138 26 L142 44 M144 24 L146 42 M176 22 L178 40 M172 26 L174 42" stroke="#2b2824" stroke-opacity=".5" stroke-width=".6"/>';
    o += '<path d="M135 34 C140 40 146 44 152 44 C148 36 146 24 141 14Z" fill="#2b2824" fill-opacity=".35"/><path d="M168 40 C172 44 178 46 182 44 C180 34 178 26 174 18Z" fill="#2b2824" fill-opacity=".3"/>';
    o += veel(16, 77, function (q, k) { var y = 84 + k * 2.2; return H(70 + q() * 30, y, 50 + q() * 20, y + 4 + q() * 4, .4, .45); }); // snorharen
    // klauwen
    o += [[452,299],[254,298],[214,298]].map(function (c) { return '<path d="M' + (c[0] - 22) + ' ' + c[1] + ' l3 3 M' + (c[0] - 15) + ' ' + c[1] + ' l3 3 M' + (c[0] - 8) + ' ' + c[1] + ' l3 3" stroke="#2b2824" stroke-opacity=".7" stroke-width=".8"/>'; }).join('');
    return g('translate(' + tx + ' ' + ty + ') scale(' + sc + ')', o);
  }
  function spar(x, yb, h, op, fijn, r) { // spar: stam met hangende takken, dichter en korter naar de top
    var o = '<path d="M' + f(x) + ' ' + f(yb) + ' L' + f(x) + ' ' + f(yb - h) + '" stroke="#0b1016" stroke-opacity="' + f(op) + '" stroke-width="' + f(1.2 + h / 260) + '"/>';
    var n = fijn ? 46 : 22;
    for (var i = 0; i < n; i++) {
      var t = i / n, y = yb - h * (.08 + t * .9), w = h * .2 * Math.pow(1 - t, .95) * (.75 + r() * .5);
      for (var z = -1; z <= 1; z += 2) { var ex = x + z * w, ey = y + w * (.35 + r() * .25);
        o += '<path d="M' + f(x) + ' ' + f(y) + ' Q' + f(x + z * w * .55) + ' ' + f(y + w * .05) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="#0b1016" stroke-opacity="' + f(op) + '" stroke-width="' + f(fijn ? .7 : 1) + '" fill="none"/>';
        if (fijn) for (var k = 0; k < 4; k++) { var s = .3 + k * .18, nx = x + z * w * s, ny = y + w * s * s * .5; o += '<path d="M' + f(nx) + ' ' + f(ny) + ' l' + f(z * 3) + ' ' + f(5 + r() * 4) + '" stroke="#0b1016" stroke-opacity="' + f(op * .8) + '" stroke-width=".5"/>'; }
      }
    }
    return o;
  }
  function sparSilhouet(x, yb, h, op, r, kl) { var d = 'M' + f(x) + ' ' + f(yb - h); for (var i = 1; i <= 9; i++) { var t = i / 9, y = yb - h * (1 - t), w = h * .2 * t; d += ' L' + f(x + w) + ' ' + f(y) + ' L' + f(x + w * .45) + ' ' + f(y - h * .03); } d += ' L' + f(x + h * .02) + ' ' + f(yb) + ' L' + f(x - h * .02) + ' ' + f(yb); for (var j = 9; j >= 1; j--) { var t2 = j / 9, y2 = yb - h * (1 - t2), w2 = h * .2 * t2; d += ' L' + f(x - w2 * .45) + ' ' + f(y2 - h * .03) + ' L' + f(x - w2) + ' ' + f(y2); } return '<path d="' + d + 'Z" fill="' + (kl || '#1a242e') + '" fill-opacity="' + f(op) + '" stroke="none"/>'; }
  function woud(seed) {
    var r = rnd(seed), o = '<defs><linearGradient id="woudlucht" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2a36"/><stop offset=".5" stop-color="#2a3a47"/><stop offset="1" stop-color="#0d131a"/></linearGradient><filter id="mist" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="28"/></filter><radialGradient id="maanhalo"><stop offset="0" stop-color="#efe9d8" stop-opacity=".45"/><stop offset="1" stop-color="#efe9d8" stop-opacity="0"/></radialGradient></defs>';
    o += '<rect width="1600" height="1000" fill="url(#woudlucht)"/>';
    o += '<circle cx="190" cy="170" r="190" fill="url(#maanhalo)"/><circle cx="190" cy="170" r="62" fill="#efe9d8"/>' + veel(9, 31, function (q) { return '<circle cx="' + f(160 + q() * 60) + '" cy="' + f(140 + q() * 60) + '" r="' + f(4 + q() * 10) + '" fill="#9a9384" fill-opacity=".18"/>'; }) + veel(70, 33, function (q) { return '<circle cx="' + f(q() * 1600) + '" cy="' + f(q() * 420) + '" r="' + f(.6 + q() * 1.3) + '" fill="#efe9d8" fill-opacity="' + f(.3 + q() * .6) + '"/>'; });
    for (var k = 0; k < 34; k++) { var x = -40 + k * 50 + r() * 30; o += sparSilhouet(x, 760 + r() * 40, 320 + r() * 180, 1, r, '#34485a'); }       // verre rij
    o += '<g filter="url(#mist)"><rect x="-100" y="640" width="1800" height="120" fill="#9fb1bd" fill-opacity=".35"/></g>';
    for (var k2 = 0; k2 < 22; k2++) { var x2 = -30 + k2 * 78 + r() * 40; o += sparSilhouet(x2, 900 + r() * 40, 480 + r() * 260, 1, r, '#1d2a35'); } // middenrij
    o += '<g filter="url(#mist)"><rect x="-100" y="820" width="1800" height="120" fill="#9fb1bd" fill-opacity=".22"/></g>';
    [[40, 1040, 980], [1490, 1050, 1000], [1380, 1070, 760], [1580, 1040, 900]].forEach(function (s) { o += sparSilhouet(s[0], s[1], s[2], 1, r, '#0e151c') + spar(s[0], s[1], s[2], .9, true, r); }); // voorgrond, getekend
    o += veel(60, 41, function (q) { var x = q() * 1600, y = 930 + q() * 70; return '<path d="M' + f(x) + ' ' + f(y) + ' q' + f(-2 + q() * 4) + ' -' + f(8 + q() * 14) + ' ' + f(-4 + q() * 8) + ' -' + f(16 + q() * 18) + '" stroke="#0b1016" stroke-opacity=".6" stroke-width=".7" fill="none"/>'; });
    return o;
  }
  /* ---------- platen per thema ---------- */
  var T = {};
  T.cellen = function () { var o = wolken(11, 9); o += cel(1250, 300, 230, 3) + cel(300, 760, 170, 7) + cel(820, 900, 120, 11) + cel(1480, 820, 110, 13) + cel(140, 160, 90, 17);
    // Hooke's kurk: cellenraster
    o += g('translate(560 40)', veel(1, 1, function () { var q = ''; for (var i = 0; i < 7; i++) for (var j = 0; j < 4; j++) q += P('oker', 'M' + (i * 42 + (j % 2) * 21) + ' ' + (j * 36) + ' l40 0 l0 34 l-40 0Z', .7, (i + j) % 4 ? '' : vul('oker', .3)); return q; }));
    return o + veel(30, 5, function (q, k) { return C(KL[k % 6], q() * 1600, q() * 1000, 3 + q() * 9, .7, vul(KL[k % 6], .5)); }); };
  T.dna = function () { var o = wolken(21, 9); o += helix(-50, 120, 1650, 420, 70, 9, 'teal', 'paars') + helix(-50, 900, 1650, 640, 55, 8, 'koraal', 'goud') + helix(1200, -50, 1450, 1050, 45, 6, 'groen', 'teal');
    o += chromosoom(260, 520, 90, .3, 'paars') + chromosoom(1420, 160, 70, -.4, 'koraal') + chromosoom(820, 980, 60, .9, 'teal') + chromosoom(560, 90, 50, 1.2, 'groen');
    return o + veel(40, 8, function (q, k) { return '<text x="' + f(q() * 1600) + '" y="' + f(q() * 1000) + '" fill="var(--' + kleur(KL[k % 6]) + ')" fill-opacity=".7" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="' + f(18 + q() * 22) + '">' + 'ATCG'[k % 4] + '</text>'; }); };
  T.stofwisseling = function () { var o = wolken(31, 9); // zon, bladeren, mitochondriën, energie
    o += C('goud', 1350, 170, 110, 2, vul('goud', .35)) + veel(24, 2, function (q, k) { var a = k / 24 * 6.28; return P('goud', 'M' + f(1350 + 130 * Math.cos(a)) + ' ' + f(170 + 130 * Math.sin(a)) + ' L' + f(1350 + (190 + (k % 2) * 50) * Math.cos(a)) + ' ' + f(170 + (190 + (k % 2) * 50) * Math.sin(a)), 1.4); });
    o += veel(16, 4, function (q) { return blad(q() * 1500, 200 + q() * 800, 80 + q() * 120, q() * 6.28, q() < .5 ? 'groen' : 'teal'); });
    o += veel(10, 6, function (q) { var x = q() * 1500, y = q() * 950, a = q() * 180; return E('koraal', x, y, 70, 34, a, 1.4, vul('koraal', .3)) + P('koraal', 'M' + (x - 50) + ' ' + y + ' l12 -18 l12 30 l12 -30 l12 30 l12 -30 l12 30 l12 -12', .8, 'transform="rotate(' + f(a) + ' ' + f(x) + ' ' + f(y) + ')"'); });
    return o + veel(18, 9, function (q, k) { return '<text x="' + f(q() * 1600) + '" y="' + f(q() * 1000) + '" fill="var(--' + kleur(KL[k % 6]) + ')" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="' + f(20 + q() * 18) + '">' + ['ATP', 'O₂', 'CO₂', 'H₂O', 'C₆H₁₂O₆'][k % 5] + '</text>'; }); };
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
    return o + veel(40, 4, function (q, k) { var x = q() * 1600, y = q() * 1000; return C(k % 2 ? 'teal' : 'goud', x, y, 8 + q() * 20, .8, k % 3 ? '' : vul('teal', .3)) + (k % 5 === 0 ? '<text x="' + f(x) + '" y="' + f(y) + '" fill="var(--' + kleur(k % 2 ? 'teal' : 'goud') + ')" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="22">' + (k % 2 ? 'O₂' : 'CO₂') + '</text>' : ''); }); };
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
  T.evolutie = function () { var o = wolken(111, 10); o += ithink(150, 640, 190) + schildpad(1430, 640, 70) + vink(1470, 380, 60, 2, 'paars');
    o += vink(160, 760, 70, 0, 'goud') + vink(380, 820, 60, 1, 'koraal') + vink(600, 760, 55, 2, 'teal') + vink(840, 880, 50, 0, 'groen');
    o += golf(960, 14, 'teal', 1.2) + golf(990, 12, 'teal', .8) + schip(1450, 930, 110);
    return o + veel(10, 4, function (q) { return blad(q() * 1600, q() * 200, 50 + q() * 40, q() * 6.28, 'groen'); }); };
  T.ecologie = function () { // ElevenLabs-gravure (Kamiel 21 okt 2026: strakke versie uitproberen); vroeger woud(121)
    var x = 470, y = 115, w = 1060, h = 596;
    return '<defs><radialGradient id="ecoVaag" cx=".5" cy=".45" r=".62"><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>'
      + '<mask id="ecoMasker"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#ecoVaag)"/></mask></defs>'
      + '<rect width="1600" height="1000" fill="#0F1726"/>'
      + '<image href="img/themakunst/ecologie-wolf.webp" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid slice" mask="url(#ecoMasker)"/>';
  };
  T.gedrag = function () { var o = wolken(131, 9); // spreeuwenwolk, bijendans, raat
    var r = rnd(3); for (var k = 0; k < 140; k++) { var t = k / 140, x = 200 + t * 1200 + Math.sin(t * 9) * 160, y = 220 + Math.sin(t * 5) * 120 + (r() - .5) * 120; o += vogel(x, y, 6 + r() * 10, k % 3 ? 'paars' : 'teal'); }
    o += raat(980, 560, 40, 7, 'goud') + P('oker', 'M200 700 C200 560 420 560 420 700 C420 840 200 840 200 700 Z M310 600 L310 800', 1.6, 'stroke-dasharray="10 8"');
    return o + bij(310, 690, 28) + bij(700, 520, 22) + bij(1450, 300, 26) + veel(8, 5, function (q) { return bloem(q() * 900, 800 + q() * 150, 20, KL[Math.floor(q() * 6)], 7); }); };
  T.milieu = function () { var o = wolken(161, 9), r = rnd(11); // de aarde met de negen grenzen eromheen
    var cx = 1180, cy = 430, R0 = 250; o += C('teal', cx, cy, R0, 2.4, vul('teal', .25));
    for (var k = -3; k <= 3; k++) o += E('text2', cx, cy, Math.abs(Math.cos(k / 4)) * R0, R0, 0, .8);
    for (k = 1; k < 6; k++) o += P('text2', 'M' + f(cx - Math.sqrt(R0 * R0 - Math.pow(R0 - k * 83, 2))) + ' ' + f(cy - R0 + k * 83) + 'H' + f(cx + Math.sqrt(R0 * R0 - Math.pow(R0 - k * 83, 2))), .8);
    for (k = 0; k < 9; k++) { var a0 = k / 9 * 6.283 + .05, a1 = (k + 1) / 9 * 6.283 - .05, rr = R0 + 40 + (k % 3 === 0 ? 150 : k % 2 ? 70 : 110);
      o += P(k % 3 === 0 ? 'koraal' : 'groen', 'M' + f(cx + Math.cos(a0) * (R0 + 30)) + ' ' + f(cy + Math.sin(a0) * (R0 + 30)) + 'L' + f(cx + Math.cos(a0) * rr) + ' ' + f(cy + Math.sin(a0) * rr) + 'A' + rr + ' ' + rr + ' 0 0 1 ' + f(cx + Math.cos(a1) * rr) + ' ' + f(cy + Math.sin(a1) * rr) + 'L' + f(cx + Math.cos(a1) * (R0 + 30)) + ' ' + f(cy + Math.sin(a1) * (R0 + 30)) + 'Z', 1.4, vul(k % 3 === 0 ? 'koraal' : 'groen', .3)); }
    o += C('goud', cx, cy, R0 + 120, 1.6, 'stroke-dasharray="10 10"');
    o += P('oker', 'M-20 900 L1620 900', 1.6) + veel(9, 3, function (q, k) { return loofboom(80 + k * 90, 900, 140 + q() * 80, 'groen', k); });
    return o + veel(10, 5, function (q) { return bij(80 + q() * 800, 300 + q() * 400, 14 + q() * 10); }) + veel(10, 8, function (q) { return bloem(q() * 900, 920 + q() * 50, 16, KL[Math.floor(q() * 6)], 6); }); };
  T.examens = function () { var o = wolken(171, 9), r = rnd(5); // examenbladen op tafel: stamboom, J-curve, chromosoom, vinkjes en een klok
    function blad_(x, y, w, h, a, inner) { return g('rotate(' + a + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')', P('text2', 'M' + x + ' ' + y + 'h' + (w - 50) + 'l50 50v' + (h - 50) + 'h-' + w + 'z', 1.6, vul('text2', .08)) + P('text2', 'M' + (x + w - 50) + ' ' + y + 'v50h50', 1) + inner); }
    function regels(x, y, n, w) { var q = ''; for (var k = 0; k < n; k++) q += P('text2', 'M' + x + ' ' + (y + k * 26) + 'h' + f(w * (.6 + .4 * r())), .9, 'opacity=".55"'); return q; }
    // blad 1: stamboom
    var sb = ''; [[0, 0], [120, 0]].forEach(function (p, k) { sb += k ? C('text2', 1040 + p[0], 220, 18, 1.4) : P('text2', 'M1022 202h36v36h-36z', 1.4); }); sb += P('text2', 'M1058 220h64M1090 220v60M1010 280h160M1010 280v30M1090 280v30M1170 280v30', 1.2) + P('text2', 'M992 310h36v36h-36z', 1.4) + C('koraal', 1090, 328, 18, 1.4, vul('koraal', .6)) + P('koraal', 'M1152 310h36v36h-36z', 1.4, vul('koraal', .6));
    o += blad_(940, 120, 360, 470, 6, sb + regels(990, 410, 6, 260));
    // blad 2: J-curve met stippellijn
    var jc = P('text2', 'M300 300v220h300', 1.4) + P('goud', 'M310 515 C450 512 520 480 590 320', 2.4) + P('teal', 'M440 508 C520 500 560 470 590 420', 2, 'stroke-dasharray="10 8"');
    o += blad_(240, 200, 420, 560, -7, jc + regels(300, 580, 6, 300));
    // blad 3: chromosomen en vinkjes
    o += blad_(620, 470, 380, 470, -2, chromosoom(720, 600, 60, .2, 'koraal') + chromosoom(820, 610, 60, -.1, 'text2') + regels(680, 720, 6, 260) + P('groen', 'M880 840l18 18 40-50', 4));
    // potlood en klok
    o += g('rotate(-35 1350 760)', P('goud', 'M1150 740h360l40 20-40 20h-360z', 1.6, vul('goud', .45)) + P('oker', 'M1510 740l40 20-40 20', 1.4) + P('text2', 'M1150 740v40', 1.2));
    o += C('text2', 1400, 230, 110, 2.2, vul('text2', .06)) + veel(12, 1, function (q, k) { var a = k / 12 * 6.283; return P('text2', 'M' + f(1400 + Math.cos(a) * 92) + ' ' + f(230 + Math.sin(a) * 92) + 'L' + f(1400 + Math.cos(a) * 104) + ' ' + f(230 + Math.sin(a) * 104), 1.4); }) + P('koraal', 'M1400 230 L1400 150', 3) + P('koraal', 'M1400 230 L1460 260', 3) + P('goud', 'M1400 230 m0 -100 a100 100 0 0 1 100 100 L1400 230z', 1, vul('goud', .25));
    return o + veel(14, 4, function (q) { var x = q() * 1600, y = q() * 1000; return P(q() > .5 ? 'groen' : 'goud', 'M' + f(x) + ' ' + f(y) + 'l10 10 22-26', 2.4); }); };
  T.planten = function () { var o = wolken(141, 9), r = rnd(8); o += boom(800, 640, 1.57, 120, 7, 'oker', r, function (x, y) { return C('oker', x, y, 3, .5, vul('oker', .8)); });
    o += P('groen', 'M800 640 C780 460 840 300 800 120', 3) + veel(8, 1, function (q, k) { return blad(800 + (k % 2 ? 4 : -4), 560 - k * 55, 110 + q() * 50, k % 2 ? -.5 : 3.6, k % 3 ? 'groen' : 'teal'); }) + bloem(800, 110, 60, 'koraal', 9);
    o += P('oker', 'M-20 640 L1620 640', 1.6) + paardebloem(250, 300, 120, 'goud') + paardebloem(1350, 360, 100, 'paars') + C('goud', 1400, 110, 60, 1.6, vul('goud', .4));
    return o + veel(20, 3, function (q) { return ster(q() * 1600, q() * 600, 12 + q() * 12, 'goud'); }) + veel(6, 9, function (q) { return bloem(q() * 1600, 560 + q() * 40, 22, KL[Math.floor(q() * 6)], 6); }); };
  T.kerndoelen = function () { var o = wolken(151, 9); o += cel(1250, 260, 170, 5) + helix(-40, 820, 900, 980, 40, 5, 'teal', 'paars') + loofboom(250, 520, 300, 'groen', 2) + den(500, 560, 240, 'groen');
    return o + veel(8, 4, function (q) { return blad(q() * 1600, q() * 1000, 70 + q() * 60, q() * 6.28, 'groen'); }) + bij(900, 200, 26) + vink(1400, 820, 60, 1, 'koraal') + veel(20, 2, function (q, k) { return C(KL[k % 6], q() * 1600, q() * 1000, 5 + q() * 9, .7, vul(KL[k % 6], .5)); }); };
  T.extra = function () { var o = wolken(161, 9); return o + helix(-40, 200, 1640, 500, 60, 8, 'paars', 'teal') + cel(1300, 760, 150, 9) + virus(300, 760, 50, 'koraal') + neuron(500, 300, 300, .4, 'goud', 9) + ithink(1350, 260, 260); };

  Object.keys(T).forEach(function (id) { var fn = T[id]; T[id] = function () { ACC = ACCENT[id] || []; var o = DEFS + fn(); ACC = []; return o; }; });
  window.THEMAKUNST = T;
  window.THEMAKUNST_ZONDERGAT = { ecologie: true }; // volledige scènes: geen uitsparing achter de hoofdfiguur
  /* hoofdfiguur per thema, groot in de kop van de themapagina: [viewBox, inhoud] */
  var H = {
    evolutie: ['0 0 400 645', function () { return darwin(0, 0, 1); }],
    cellen: ['0 0 400 400', function () { return cel(200, 200, 165, 3); }],
    dna: ['0 0 400 400', function () { return helix(200, -10, 200, 410, 80, 2.5, 'teal', 'paars') + chromosoom(90, 300, 55, .4, 'koraal') + chromosoom(320, 110, 45, -.5, 'groen'); }],
    stofwisseling: ['0 0 400 400', function () { return C('goud', 280, 110, 60, 1.6, vul('goud', .4)) + blad(40, 300, 260, -.6, 'groen') + blad(120, 360, 160, -1.2, 'teal'); }],
    voeding: ['0 0 400 400', function () { var q = ''; for (var i = 0; i < 6; i++) q += vlok(40 + i * 64, 390, 48, 220 + (i % 3) * 50, KL[i % 6]); return q; }],
    transport: ['0 0 400 400', function () { return hart(200, 230, 120) + rbc(70, 340, 26, 20) + rbc(330, 350, 22, -30); }],
    gaswisseling: ['0 0 400 400', function () { var r = rnd(9); return P('teal', 'M200 10 L200 120', 4) + P('teal', 'M185 125 C110 110 40 170 40 280 C40 370 140 390 190 350 Z', 1.6, vul('teal', .12)) + P('teal', 'M215 125 C290 110 360 170 360 280 C360 370 260 390 210 350 Z', 1.6, vul('teal', .12)) + boom(200, 120, 2.2, 60, 5, 'koraal', r, function (x, y) { return C('koraal', x, y, 6, .5, vul('koraal', .5)); }) + boom(200, 120, .95, 60, 5, 'koraal', r, function (x, y) { return C('koraal', x, y, 6, .5, vul('koraal', .5)); }); }],
    afweer: ['0 0 400 400', function () { return virus(200, 200, 90, 'koraal') + antistof(60, 90, 40, -30, 'teal') + antistof(340, 110, 36, 40, 'paars') + antistof(330, 330, 40, 140, 'groen') + antistof(70, 320, 34, -140, 'teal'); }],
    regeling: ['0 0 400 400', function () { return neuron(110, 170, 300, .35, 'paars', 1); }],
    voortplanting: ['0 0 400 400', function () { var o = C('koraal', 250, 210, 120, 2.2, vul('koraal', .22)) + C('goud', 250, 210, 36, 1.2, vul('goud', .45)); for (var k = 0; k < 22; k++) { var a = k / 22 * 6.28; o += C('oker', 250 + 140 * Math.cos(a), 210 + 140 * Math.sin(a), 7, .6, vul('oker', .4)); } return o + zaadcel(60, 120, 36, .4, 'teal') + zaadcel(50, 300, 32, -.3, 'paars') + zaadcel(110, 360, 30, -.8, 'groen'); }],
    erfelijkheid: ['0 0 400 400', function () { var o = '', x0 = 120, y0 = 30, s = 80; for (var i = 0; i <= 2; i++) o += P('paars', 'M' + x0 + ' ' + (y0 + i * s) + ' l' + (2 * s) + ' 0', 1) + P('paars', 'M' + (x0 + i * s) + ' ' + y0 + ' l0 ' + (2 * s), 1); [['AA', 'Aa'], ['Aa', 'aa']].forEach(function (rij, j) { rij.forEach(function (t, i) { o += '<text x="' + (x0 + i * s + 18) + '" y="' + (y0 + j * s + 52) + '" fill="var(--' + kleur(t === 'aa' ? 'groen' : 'goud') + ')" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="34">' + t + '</text>'; }); }); return o + erwtepeul(30, 300, 230, -.25) + erwtepeul(200, 370, 170, -.1) + rank(40, 230, 20, 'groen'); }],
    ecologie: ['20 0 470 310', function () { return ''; }], // de wolf staat nu in de plaat zelf; vroeger wolf(0, 0, 1, 'h')
    gedrag: ['0 0 400 400', function () { return raat(70, 60, 40, 4, 'goud') + bij(300, 300, 40) + P('oker', 'M120 320 C120 250 230 250 230 320 C230 390 120 390 120 320 Z M175 270 L175 370', 1.2, 'stroke-dasharray="8 6"'); }],
    examens: ['0 0 400 400', function () { var o = P('text2', 'M80 40h190l50 50v270H80z', 1.8, vul('text2', .08)) + P('text2', 'M270 40v50h50', 1.2); for (var k = 0; k < 7; k++) o += P('text2', 'M110 ' + (120 + k * 30) + 'h' + (150 + (k % 3) * 30), 1, 'opacity=".6"'); return o + P('groen', 'M120 330l20 20 50-60', 4) + C('goud', 320, 320, 56, 1.8, vul('goud', .3)) + P('koraal', 'M320 320v-38M320 320l26 14', 2.6) + g('rotate(-40 230 250)', P('goud', 'M150 240h170l26 12-26 12H150z', 1.4, vul('goud', .45))); }],
    milieu: ['0 0 400 400', function () { var o = C('teal', 200, 200, 110, 1.8, vul('teal', .25)) + E('text2', 200, 200, 55, 110, 0, .8) + P('text2', 'M90 200H310M108 140H292M108 260H292', .8); for (var k = 0; k < 9; k++) { var a0 = k / 9 * 6.283 + .06, a1 = (k + 1) / 9 * 6.283 - .06, rr = 140 + (k % 3 === 0 ? 50 : 25); o += P(k % 3 === 0 ? 'koraal' : 'groen', 'M' + f(200 + Math.cos(a0) * 122) + ' ' + f(200 + Math.sin(a0) * 122) + 'L' + f(200 + Math.cos(a0) * rr) + ' ' + f(200 + Math.sin(a0) * rr) + 'A' + rr + ' ' + rr + ' 0 0 1 ' + f(200 + Math.cos(a1) * rr) + ' ' + f(200 + Math.sin(a1) * rr) + 'L' + f(200 + Math.cos(a1) * 122) + ' ' + f(200 + Math.sin(a1) * 122) + 'Z', 1.1, vul(k % 3 === 0 ? 'koraal' : 'groen', .3)); } return o + C('goud', 200, 200, 172, 1.2, 'stroke-dasharray="6 6"'); }],
    planten: ['0 0 400 400', function () { var r = rnd(4); return boom(200, 300, 1.57, 40, 5, 'oker', r) + P('groen', 'M200 300 C190 220 215 150 200 80', 2.4) + blad(200, 250, 110, -.5, 'groen') + blad(200, 200, 100, 3.6, 'teal') + bloem(200, 70, 40, 'koraal', 9) + P('oker', 'M20 300 L380 300', 1); }],
    kerndoelen: ['0 0 400 400', function () { return cel(200, 200, 150, 5); }],
    extra: ['0 0 400 400', function () { return ithink(200, 200, 300); }]
  };
  window.THEMAHELD = {};
  Object.keys(H).forEach(function (id) { window.THEMAHELD[id] = function () { ACC = ACCENT[id] || []; var o = '<svg viewBox="' + H[id][0] + '" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="' + (id === 'evolutie' ? 'Schets van Charles Darwin' : '') + '">' + DEFS + H[id][1]() + '</svg>'; ACC = []; return o; }; });

})();

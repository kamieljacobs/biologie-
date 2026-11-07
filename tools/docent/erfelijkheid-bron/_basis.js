const W = 1920, H = 1080;
let C = {};
function zetPalet() {
  const licht = document.documentElement.getAttribute('data-theme') === 'light';
  C = licht ? {
    bg: '#FFFFFF', fill: '#E9EDF3', text: '#121C2E', text2: '#4E5A6C', line: '#6B7687', meta: '#8A650C',
    goud: '#C9961F', koraal: '#C0583A', groen: '#2F8A47', teal: '#25729C', paars: '#6550AD', oker: '#A8822E',
    mens: '#6B7687', holte: '#6A4A52', bloed: '#B5574A', grond: '#C9B896', water: '#25729C', licht: true
  } : {
    bg: '#1A2740', fill: '#2A3A58', text: '#F2F2EE', text2: '#9AA3B2', line: '#8FA0B5', meta: '#C9B896',
    goud: '#E0B64A', koraal: '#E07A5F', groen: '#7FC48F', teal: '#5BA4C9', paars: '#8C7BBF', oker: '#C9A35C',
    mens: '#9AA3B2', holte: '#1A1420', bloed: '#B5574A', grond: '#6B5A40', water: '#5BA4C9', licht: false
  };
  if (window.BB) BB.thema(C.licht);
}
zetPalet();

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, u) => a + (b - a) * clamp(u, 0, 1);
const ease = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function rgbVan(c) { // '#rrggbb' of 'rgb(r,g,b)' -> [r,g,b]
  if (c[0] === '#') { const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  const m = c.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : [128, 128, 128];
}
function rgba(c, a) { if (typeof c === 'number') { return `rgba(${arguments[0]},${arguments[1]},${arguments[2]},${arguments[3]})`; } const [r, g, b] = rgbVan(c); return `rgba(${r},${g},${b},${a})`; }
function mix(c1, c2, k) { const a = rgbVan(c1), b = rgbVan(c2); const m = a.map((v, i) => Math.round(v * (1 - k) + b[i] * k)); return '#' + m.map(v => v.toString(16).padStart(2, '0')).join(''); }
const lighten = (c, k) => mix(c, '#FFFFFF', k);
function shape(ctx, fill, stroke, lw = 1.5) { if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function circ(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
const F = { titel: '"Fraunces",Georgia,serif', tekst: '"Source Sans 3",system-ui,sans-serif', meta: '"IBM Plex Mono",ui-monospace,monospace' };
const fTitel = (px) => `700 ${px}px ${F.titel}`, fTekst = (px, w = 400) => `${w} ${px}px ${F.tekst}`, fMeta = (px) => `500 ${px}px ${F.meta}`;
function text(ctx, s, x, y, font, color, align = 'left', base = 'alphabetic') { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(s, x, y); }
function metaText(ctx, s, x, y, color = C.meta, align = 'left', px = 24, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; try { ctx.letterSpacing = '3px'; } catch (e) {} ctx.fillText(s.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, y); ctx.restore(); }
// gewone tekst op het beeld, met rand in de achtergrondkleur voor leesbaarheid
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, w); ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round'; ctx.strokeStyle = rgba(C.bg, 0.85); ctx.lineWidth = 7; ctx.strokeText(s, x, y); ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore(); }
// naam van een onderdeel, direct bij het onderdeel (geen wijslijn); verborgen met 'Namen verbergen'
let toonNamen = true;
function naam(ctx, s, x, y, a = 1, align = 'left', col = C.text, px = 34) { if (!toonNamen) return; regel(ctx, s, x, y, a, col, px, align, 600); }
function pijl(ctx, x1, y1, x2, y2, col, lw = 4, a = 1, kop = 16) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(an) * kop * 0.6, y2 - Math.sin(an) * kop * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - Math.cos(an - 0.45) * kop, y2 - Math.sin(an - 0.45) * kop); ctx.lineTo(x2 - Math.cos(an + 0.45) * kop, y2 - Math.sin(an + 0.45) * kop); ctx.closePath(); ctx.fill(); ctx.restore();
}
function paneel(ctx, x, y, w, h, a = 1, col = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, C.licht ? 0.55 : 0.45), col || rgba(C.line, 0.45), 2); ctx.restore(); }
// paden
function gladPad(pts, step = 7) {
  if (pts.length < 3) { const out = []; const [a, b] = pts; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.max(2, Math.ceil(L / step)); for (let i = 0; i <= n; i++) out.push([lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)]); return out; }
  const P = [pts[0], ...pts, pts[pts.length - 1]], out = [];
  for (let i = 1; i < P.length - 2; i++) { const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]]; const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]); const n = Math.max(2, Math.ceil(L / step));
    for (let k = 0; k < n; k++) { const u = k / n, u2 = u * u, u3 = u2 * u; out.push([0, 1].map(d => 0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); } }
  out.push(pts[pts.length - 1]); return out;
}
const _glad = new Map();
function gladC(pts) { const k = JSON.stringify(pts); let v = _glad.get(k); if (!v) { v = gladPad(pts); _glad.set(k, v); } return v; }
function padLengte(pts) { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; }
function padPunt(pts, d) { const L = padLengte(pts); d = clamp(d, 0, L[L.length - 1]); let i = 1; while (i < pts.length - 1 && L[i] < d) i++; const u = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u), Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; }
function lijnPad(ctx, pts, col, lw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); gladC(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
// tekent fn in een aparte laag en zet die met doorzichtigheid a op het beeld (geen doorschijnende overlap binnen één figuur)
let _laagCv = null;
function laag(ctx, a, fn) {
  if (a <= 0.01) return; if (a >= 0.995) { fn(ctx); return; }
  const c = ctx.canvas; if (!_laagCv) _laagCv = document.createElement('canvas'); const L = _laagCv; if (L.width !== c.width || L.height !== c.height) { L.width = c.width; L.height = c.height; }
  const l = L.getContext('2d'); l.setTransform(1, 0, 0, 1, 0, 0); l.clearRect(0, 0, L.width, L.height); l.setTransform(ctx.getTransform()); fn(l);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= a; ctx.drawImage(L, 0, 0); ctx.restore();
}
function pers(ctx, id, x, y, h, o = {}) { const a = o.a == null ? 1 : o.a; laag(ctx, a, (l) => persoon(l, id, x, y, h, Object.assign({}, o, { a: 1 }))); }
function gloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.45 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }

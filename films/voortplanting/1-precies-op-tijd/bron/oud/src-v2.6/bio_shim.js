/* bio_shim.js — Van bevruchting tot baby v2.5 (prompt v8, B14): de gedeelde tekenbibliotheek lib_bio.js verwacht de
   globale hulpjes van de hoofdengine (lib.js). Deze film heeft die alleen binnen ENG; hier staan ze globaal.
   rgba en roundRect komen al uit castfiguren.js. */
const C = Object.assign({}, ENG.C, { goud: '#E0B64A', paars: '#8C7BBF', groen: '#7FC48F', er: '#7FA8C9', oker: '#C9A35C', enzym: '#5FA86E', grain: '#C9B896' });
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, u) => a + (b - a) * u;
const ease = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function lighten(hex, k) { if (hex[0] !== '#') return hex; const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = Math.round(r + (255 - r) * k); g = Math.round(g + (255 - g) * k); b = Math.round(b + (255 - b) * k); return `rgb(${r},${g},${b})`; }
function shape(ctx, fill, stroke, lw = 1.5) { if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function nucleus(ctx, x, y, r, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, C.nucFill, C.nucEdge, 1.5); ctx.fillStyle = rgba('#3E2E66', 0.35); for (let i = 0; i < 7; i++) { const an = hash(i + 3) * 6.283, rr = Math.sqrt(hash(i + 9)) * r * 0.7; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, r * 0.18, r * 0.1, an, 0, 6.283); ctx.fill(); } ctx.beginPath(); ctx.arc(x - r * 0.2, y + r * 0.15, r * 0.22, 0, 6.283); ctx.fillStyle = rgba('#3E2E66', 0.6); ctx.fill(); ctx.restore(); }
function mitochondrion(ctx, x, y, len, rot = 0, alpha = 1) { ENG.mito({ ctx }, x, y, len, { rot, alpha }); }

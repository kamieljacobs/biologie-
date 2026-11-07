// Gedrag 2 · Inprenting en de sensitieve periode — scènes per alinea (v1.0, 15 okt 2026).
// Rode draad: de gansjes van Konrad Lorenz (eierproef met de kist), de grafiek van Hess met het
// tijdvenster, seksuele inprenting bij zebravinken (vwo), en Noor met een lui oog; Japanse baby's en ra/la.

const GRAS = '#3E6A46', GRAS2 = '#4E7A52', VIJVER = '#2E5A72', GANS = '#9A9C98', GANSD = '#6E706C', SNAVEL = '#E08A3C', POOT = '#E3A08A', DONS = '#D9C46A', DONSD = '#A89A4A', EEND = '#E8D25A';

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function weide(ctx) { ctx.fillStyle = '#7FA8C8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#9FC0D8'; ctx.fillRect(0, 300, W, 120); ctx.fillStyle = GRAS2; ctx.fillRect(0, 400, W, H - 400); ctx.fillStyle = rgba('#2E4A34', 0.5); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(120 + i * 230, 410, 160, 50, 0, Math.PI, 0); ctx.fill(); } }

// ---------- vogels (zijaanzicht, kop rechts bij flip = 1) ----------
function gans(ctx, x, y, s, o = {}) { const { a = 1, flip = 1, t = 0, broed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  if (!broed) { ctx.strokeStyle = POOT; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, 20); ctx.lineTo(-14, 62); ctx.moveTo(14, 20); ctx.lineTo(18, 62); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-10, 0, 80, 40, -0.08, 0, 6.283); shape(ctx, GANS, null);
  ctx.beginPath(); ctx.ellipse(-24, -8, 56, 22, -0.1, 0, 6.283); shape(ctx, GANSD, null);
  const nk = Math.sin(t * 2) * 4; ctx.strokeStyle = GANS; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(52, -10); ctx.quadraticCurveTo(70, -50, 66 + nk, -86); ctx.stroke();
  circ(ctx, 70 + nk, -92, 18, GANSD); ctx.beginPath(); ctx.moveTo(84 + nk, -98); ctx.lineTo(116 + nk, -88); ctx.lineTo(84 + nk, -82); ctx.closePath(); shape(ctx, SNAVEL, null); circ(ctx, 74 + nk, -96, 3.5, '#121A26');
  ctx.restore(); }
function kuiken(ctx, x, y, s, o = {}) { const { a = 1, flip = 1, t = 0, kleur = DONS, ring = null, loop = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hop = loop ? Math.abs(Math.sin(t * 9)) * 6 * loop : 0; ctx.translate(x, y - hop); ctx.scale(s * flip, s);
  ctx.strokeStyle = POOT; ctx.lineWidth = 4; ctx.lineCap = 'round'; const st = loop ? Math.sin(t * 9) * 6 * loop : 0; ctx.beginPath(); ctx.moveTo(-6, 16); ctx.lineTo(-8 + st, 34); ctx.moveTo(6, 16); ctx.lineTo(8 - st, 34); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 22, 0, 0, 6.283); shape(ctx, kleur, null); circ(ctx, 24, -22, 16, kleur); ctx.beginPath(); ctx.moveTo(36, -24); ctx.lineTo(50, -20); ctx.lineTo(36, -16); ctx.closePath(); shape(ctx, SNAVEL, null); circ(ctx, 28, -25, 3, '#121A26');
  ctx.fillStyle = rgba('#121A26', 0.12); ctx.beginPath(); ctx.ellipse(-8, 2, 16, 10, 0, 0, 6.283); ctx.fill();
  if (ring) circ(ctx, 0, 0, 40, null, ring, 3);
  ctx.restore(); }
function ei(ctx, x, y, s = 1, a = 1, barst = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 22 * s, 28 * s, 0, 0, 6.283); shape(ctx, '#EDE6D4', '#BDB4A0', 2); if (barst > 0.01) { ctx.strokeStyle = rgba('#6A5E4A', barst); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 16 * s, y); ctx.lineTo(x - 6 * s, y - 6 * s); ctx.lineTo(x + 2 * s, y + 4 * s); ctx.lineTo(x + 14 * s, y - 4 * s); ctx.stroke(); } ctx.restore(); }
// Lorenz: eenvoudige wandelende man (geen castpersonage)
function man(ctx, x, y, h, o = {}) { const { a = 1, t = 0, loop = 0, flip = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const s = h / 400; ctx.scale(s * flip, s);
  const sw = Math.sin(t * 5) * 0.4 * loop; ctx.strokeStyle = '#3A3A44'; ctx.lineWidth = 26; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(Math.sin(sw) * 90, -10); ctx.moveTo(0, -170); ctx.lineTo(-Math.sin(sw) * 90, -10); ctx.stroke();
  ctx.fillStyle = '#2A2A30'; for (const k of [1, -1]) { ctx.beginPath(); ctx.ellipse(k * Math.sin(sw) * 90 + 14, -4, 26, 10, 0, 0, 6.283); ctx.fill(); }
  roundRect(ctx, -46, -320, 92, 170, 26); shape(ctx, '#6E7A5A', null);
  ctx.strokeStyle = '#6E7A5A'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(-Math.sin(sw) * 60, -180); ctx.moveTo(0, -300); ctx.lineTo(Math.sin(sw) * 60, -180); ctx.stroke();
  circ(ctx, 0, -360, 42, '#E3B998'); ctx.fillStyle = '#C9C9C2'; ctx.beginPath(); ctx.arc(0, -368, 44, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); circ(ctx, 18, -364, 4, '#121A26');
  ctx.restore(); }
// broedmachine en kist
function broedmachine(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#C9D2DA', 0.25), '#C9D2DA', 3); ctx.fillStyle = rgba(C.goud, 0.15); ctx.fillRect(x + 6, y + 6, w - 12, 30); circ(ctx, x + w - 26, y + 21, 8, C.goud); metaText(ctx, 'broedmachine', x + 14, y + 28, C.text, 'left', 18); ctx.restore(); }
function kist(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#8C6A44'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = '#5E4428'; ctx.lineWidth = 4; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y + i * h / 4); ctx.lineTo(x + w, y + i * h / 4); ctx.stroke(); } ctx.strokeRect(x, y, w, h); ctx.restore(); }
// grafiek van Hess: % eendjes dat volgt tegen uren na uitkomen
const HESS = (u) => 0.82 * Math.exp(-Math.pow((u - 14.5) / 9, 2)) + 0.03;
function hessGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, prog = 1, venster = 0, punt48 = 0, punten = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (u) => x + (u / 50) * w, Y = (p) => y + h - p * h;
  if (venster > 0.01) { ctx.fillStyle = rgba(C.goud, 0.24 * venster); ctx.fillRect(X(4), y, X(30) - X(4), h); regel(ctx, 'sensitieve periode', (X(4) + X(30)) / 2, y + 40, venster, C.goud, 30, 'center', 700); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  for (const u of [0, 12, 24, 36, 48]) { text(ctx, String(u), X(u), y + h + 36, fTekst(24, 500), C.text2, 'center'); }
  metaText(ctx, 'uren na het uitkomen', x + w, y + h + 76, C.text2, 'right', 20); metaText(ctx, 'volgt de nep-eend', x, y - 18, C.text2, 'left', 20);
  if (punten > 0.01) { [2, 6, 10, 14, 18, 24, 30].forEach((u, i) => { const al = clamp(punten * 8 - i, 0, 1); if (al > 0) circ(ctx, X(u), Y(HESS(u)), 9, rgba(C.teal, al)); }); }
  if (prog > 0.01) { ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); for (let u = 0; u <= 36 * prog; u += 0.5) { u === 0 ? ctx.moveTo(X(u), Y(HESS(u))) : ctx.lineTo(X(u), Y(HESS(u))); } ctx.stroke(); }
  if (punt48 > 0.01) { ctx.save(); ctx.globalAlpha *= punt48; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(48), y + h); ctx.lineTo(X(48), y + 20); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); return { X, Y }; }
// vinken (vwo)
function zebravink(ctx, x, y, s, o = {}) { const { a = 1, flip = 1, man_ = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-80, 16); ctx.lineTo(-72, -6); ctx.closePath(); shape(ctx, '#3A3A3A', null);
  ctx.beginPath(); ctx.ellipse(0, 6, 44, 28, -0.1, 0, 6.283); shape(ctx, '#8A8C90', null); ctx.beginPath(); ctx.ellipse(6, 18, 30, 14, 0, 0, Math.PI); shape(ctx, '#E8E2D4', null);
  if (man_) { ctx.fillStyle = '#B8743C'; ctx.beginPath(); ctx.ellipse(-4, 8, 14, 10, 0, 0, 6.283); ctx.fill(); }
  circ(ctx, 34, -18, 20, '#8A8C90'); if (man_) circ(ctx, 34, -10, 8, '#D8803C'); ctx.beginPath(); ctx.moveTo(48, -24); ctx.lineTo(66, -16); ctx.lineTo(48, -8); ctx.closePath(); shape(ctx, '#D8503C', null); circ(ctx, 40, -22, 3.5, '#121A26');
  ctx.restore(); }
function meeuwtje(ctx, x, y, s, o = {}) { const { a = 1, flip = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-80, 16); ctx.lineTo(-72, -6); ctx.closePath(); shape(ctx, '#5A4430', null);
  ctx.beginPath(); ctx.ellipse(0, 6, 44, 28, -0.1, 0, 6.283); shape(ctx, '#F0ECE2', null); ctx.fillStyle = '#7A5A3C'; ctx.beginPath(); ctx.ellipse(-6, 0, 30, 18, 0.2, 0, 6.283); ctx.fill();
  circ(ctx, 34, -18, 20, '#7A5A3C'); ctx.beginPath(); ctx.moveTo(48, -24); ctx.lineTo(64, -16); ctx.lineTo(48, -8); ctx.closePath(); shape(ctx, '#B8B0A0', null); circ(ctx, 40, -22, 3.5, '#121A26');
  ctx.restore(); }
function hartje(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-26, -8, -12, -30, 0, -14); ctx.bezierCurveTo(12, -30, 26, -8, 0, 10); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// ogen → hersenen (lui oog)
function oogSchema(ctx, x, y, o = {}) { const { a = 1, links = 1, rechts = 1, pleister = 0, dimL = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // hersenen
  ctx.beginPath(); ctx.ellipse(x + 260, y + 300, 230, 150, 0, 0, 6.283); shape(ctx, rgba('#C98A9A', 0.2), '#C98A9A', 2.5); metaText(ctx, 'hersenen', x + 260, y + 470, C.text2, 'center', 20);
  for (const [k, ox, val, nm] of [[0, x + 120, links, 'links'], [1, x + 400, rechts, 'rechts']]) {
    const oy = y + 40; ctx.beginPath(); ctx.ellipse(ox, oy, 56, 36, 0, 0, 6.283); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, ox, oy, 20, k === 0 ? rgba('#4A6A8A', 1 - 0.5 * dimL) : '#4A6A8A'); circ(ctx, ox, oy, 8, '#121A26');
    metaText(ctx, nm + 'oog', ox, oy - 54, C.text2, 'center', 20);
    const lw = 3 + 16 * val; ctx.strokeStyle = rgba(C.teal, 0.35 + 0.6 * val); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ox, oy + 44); ctx.quadraticCurveTo(ox + (k ? -40 : 40), oy + 160, x + 260 + (k ? 60 : -60), y + 290); ctx.stroke();
    if (k === 1 && pleister > 0.01) { ctx.save(); ctx.globalAlpha *= pleister; roundRect(ctx, ox - 74, oy - 46, 148, 92, 30); shape(ctx, '#E8C9A8', '#B89878', 2); ctx.restore(); }
  }
  ctx.restore(); }
// baby-gezichtje
function baby(ctx, x, y, s, a = 1, uit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, 0, 0, 70, '#E8C2A0'); ctx.fillStyle = '#6A4A34'; ctx.beginPath(); ctx.arc(0, -40, 34, Math.PI, 0); ctx.fill(); circ(ctx, -24, -6, 6, '#121A26'); circ(ctx, 24, -6, 6, '#121A26'); ctx.strokeStyle = '#8A5A4A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 22, 14, 0.2 + uit * 0.2, Math.PI - 0.2 - uit * 0.2); ctx.stroke(); circ(ctx, -46, 18, 9, rgba('#E08A8A', 0.5)); circ(ctx, 46, 18, 9, rgba('#E08A8A', 0.5)); ctx.restore(); }
function klank(ctx, s, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 74, 50, 0, 0, 6.283); shape(ctx, rgba(col, 0.2), col, 2.5); text(ctx, s, x, y + 14, fTitel(44), col, 'center'); ctx.restore(); }
function deur(ctx, x, y, h, open, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(C.goud, 0.25); ctx.fillRect(x, y, h * 0.5, h); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.strokeRect(x, y, h * 0.5, h); const wv = h * 0.5 * Math.cos(open * 1.3); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + wv, y + 30 * Math.sin(open * 1.3)); ctx.lineTo(x + wv, y + h - 30 * Math.sin(open * 1.3)); ctx.lineTo(x, y + h); ctx.closePath(); shape(ctx, '#7A5A3C', '#5A4028', 3); circ(ctx, x + wv * 0.85, y + h / 2, 7, C.goud); ctx.restore(); }
// gansjes-rij achter een leider
function rij(ctx, lx, ly, n, t, o = {}) { const { a = 1, loop = 1, s = 0.9, gap = 82, dy = 0 } = o; for (let i = 0; i < n; i++) kuiken(ctx, lx - 130 - i * gap, ly + dy + Math.sin(i * 1.7) * 8, s, { t: t + i * 0.37, loop, a }); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { const x = 1300 + ((t * 70) % 700) - 200; man(ctx, x, 760, 300, { t, loop: 1 }); rij(ctx, x - 20, 740, 5, t, { s: 0.75, gap: 64 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { weide(ctx);
    // vijver rechts
    const zw = q.on('zwemmen', 1, 1.2), uit = q.on('echte', 1, 1.0);
    ctx.beginPath(); ctx.ellipse(1500, 760, 420, 120, 0, 0, 6.283); shape(ctx, VIJVER, rgba('#9FC8E0', 0.6), 3);
    // echte moeder ver weg links boven
    gans(ctx, 260, 520, 0.7, { t, flip: -1, a: 1 }); regel(ctx, 'echte moeder', 260, 640, q.on('echte', 1), C.goud, 28, 'center', 700);
    const walk = clamp((t - q.at('wandelt')) / 10, 0, 1), lx = lerp(560, 1240, walk) + zw * (1 - uit) * 0 + zw * 160, ly = 800;
    const loop = (t > q.at('wandelt') && walk < 1) || (zw > 0 && zw < 1) ? 1 : 0.15;
    if (zw < 0.5) man(ctx, lx, ly, 360, { t, loop }); else { // zwemt: alleen bovenlijf
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 770); ctx.clip(); man(ctx, lx, ly + 90, 360, { t, loop: 0.2 }); ctx.restore(); ctx.strokeStyle = rgba('#CFE4F0', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(lx, 770, 70, 14, 0, 0, 6.283); ctx.stroke(); }
    const nG = Math.round(clamp((t - q.at('ganzen') + 1.2) * 4, 0, 7));
    for (let i = 0; i < nG; i++) { const gx = lx - 120 - i * 74, gy = 830 + Math.sin(i * 1.7) * 8 - (gx > 1080 ? 20 : 0); kuiken(ctx, gx, gy, 0.8, { t: t + i * 0.37, loop: loop }); }
    tag(ctx, 'zeven jonge ganzen', 600, 520, C.text, q.on('ganzen', 1) * (1 - q.on('Waar', 1)));
    vraagteken(ctx, 960, 300, q.on('Waarom', 1), 130); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const ter = q.on('Terug', 1, 0.8);
    regel(ctx, 'Konrad Lorenz', 140, 140, q.on('Lorenz', 1) * (1 - ter), C.text, 40, 'left', 700); regel(ctx, 'Oostenrijkse bioloog · Nobelprijs 1973 met Tinbergen', 140, 186, q.on('Nobelprijs', 1) * (1 - ter), C.text2, 26, 'left', 600);
    if (ter < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ter;
      const split = q.on('groepen', 1, 1.0), gm = q.on('moedergans', 1), bm = q.on('broedmachine', 1), uitk = q.on('kuikens', 1, 0.8), lz = q.on('zagen', 1);
      const kistNeer = q.on('kist', 1, 0.8), kistOp = q.on('tilde', 1, 0.8), loop = q.on('liep', 1, 2.2);
      // groepen: links (moeder, teal) en rechts (Lorenz, goud)
      const L = [...Array(4)].map((_, i) => [lerp(860 + i * 50, 420 + i * 70, split), 560]), R = [...Array(4)].map((_, i) => [lerp(860 + i * 50 + 200, 1260 + i * 70, split), 560]);
      if (uitk < 0.5) { L.forEach(([x, y]) => ei(ctx, x, y, 1, q.on('ganzeneieren', 1), uitk * 2)); R.forEach(([x, y]) => ei(ctx, x, y, 1, q.on('ganzeneieren', 1), uitk * 2)); }
      if (gm > 0.01) gans(ctx, 520, 520, 0.9, { broed: uitk < 0.5 ? 1 : 0, a: gm * (1 - kistNeer), t });
      broedmachine(ctx, 1210, 470, 320, 140, bm * (1 - kistNeer));
      if (lz > 0.01 && kistNeer < 1) man(ctx, 1700, 720, 340, { a: lz * (1 - kistNeer) });
      // kuikens: na uitkomen; naar kist; naar 'moeder'
      if (uitk >= 0.5) { const cx = 960; const pos = (grp, i) => { const [x0, y0] = (grp ? R : L)[i]; const kx = cx - 150 + (grp * 4 + i) * 40, ky = 640; const tx = grp ? 1520 + i * 60 : 600 - i * 70, ty = 760 + (i % 2) * 40; const k1 = kistNeer; const px = lerp(lerp(x0, kx, k1), tx, loop), py = lerp(lerp(y0 + 20, ky, k1), ty, loop); return [px, py]; };
        for (const grp of [0, 1]) for (let i = 0; i < 4; i++) { const [px, py] = pos(grp, i); const verstopt = kistNeer > 0.9 && kistOp < 0.5; if (verstopt) continue; kuiken(ctx, px, py, 0.7, { t: t + i, flip: loop > 0.05 && !grp ? -1 : 1, ring: grp ? rgba(C.goud, 0.8) : rgba(C.teal, 0.8), loop: (kistOp > 0.9 && loop < 1) || (kistNeer > 0 && kistNeer < 1) ? 1 : 0 }); } }
      if (kistNeer > 0.01) { const ky = lerp(-300, 520, kistNeer) - kistOp * 260; kist(ctx, 760, ky, 400, 180, 1 - kistOp); }
      if (loop > 0.01) { gans(ctx, 360, 740, 0.9, { a: loop, t }); man(ctx, 1760, 860, 340, { a: loop, flip: -1 }); regel(ctx, 'gans', 360, 900, loop, C.teal, 30, 'center', 700); regel(ctx, 'Lorenz', 1760, 900, loop, C.goud, 30, 'center', 700); }
      ctx.restore(); }
    // B: wat is inprenting?
    if (ter > 0.01) { ctx.save(); ctx.globalAlpha *= ter; tag(ctx, 'antwoord b: het eerste bewegende wezen', 960, 130, C.goud, q.on('Antwoord', 1) * (1 - q.on('beweegt', 1)));
      const k = q.on('beweegt', 1), x = 1000 + Math.sin(t * 0.8) * 120; man(ctx, x - 600, 760, 300, { t, loop: 1, a: 0.9 }); rij(ctx, x - 600, 750, 3, t, { s: 0.7, gap: 70 });
      const crit = [['beweegt', 'beweegt'], ['geluid', 'maakt geluid'], ['dichtbij', 'is dichtbij']]; crit.forEach(([w, s], i) => { const a = q.on(w, 1); vink_(ctx, 1110, 290 + i * 70, 14, a); regel(ctx, s, 1140, 302 + i * 70, a, C.text, 34, 'left', 600); });
      regel(ctx, '= moeder', 1140, 520, q.on('moeder', 4), C.goud, 40, 'left', 700);
      if (q.on('inprenting', 1) > 0.01) { card(ctx, 1080, 560, 740, 300, 'inprenting', '', q.on('inprenting', 1), C.goud);
        [['kiest', 'het jong kiest niet: het gaat vanzelf'], ['snel', 'snel, in de eerste uren'], ['beloning', 'zonder eten of beloning'], ['bestaan', 'blijft lang bestaan']].forEach(([w, s], i) => regel(ctx, '· ' + s, 1110, 670 + i * 48, q.on(w, w === 'snel' ? 2 : 1), C.text, 30, 'left', 600)); }
      ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const G = { x: 260, y: 300, w: 1100, h: 460 };
    regel(ctx, 'Eckhard Hess · eendenkuikens', 140, 140, q.on('Onderzoekers', 1), C.text2, 28, 'left', 600);
    hessGrafiek(ctx, G.x, G.y, G.w, G.h, { a: 1, punten: clamp((t - q.at('verschillende')) / 2, 0, 1), prog: clamp((t - q.at('halve')) / 2, 0, 1), punt48: q.on('dagen', 1) });
    // nep-eend op een stok + eendje
    const nx = 1600 + Math.sin(t * 1.2) * 60; ctx.save(); ctx.globalAlpha *= q.on('nep-eend', 1); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(nx, 300); ctx.lineTo(nx, 420); ctx.stroke(); gans(ctx, nx, 480, 0.6, { flip: 1, t }); ctx.restore(); kuiken(ctx, nx - 130, 560, 0.6, { kleur: EEND, t, loop: 1, a: q.on('nep-eend', 1) });
    const X = (u) => G.x + (u / 50) * G.w; tag(ctx, '± 15 uur: volgen het best', X(14.5) + 160, G.y + 40, C.teal, q.on('vijftien', 1) * (1 - q.on('dagen', 1)));
    regel(ctx, '2 dagen', X(48), G.y + G.h + 120, q.on('dagen', 1), C.koraal, 28, 'center', 700); vraagteken(ctx, X(48), G.y + 160, q.on('Wat', 1), 100); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const fu = q.on('functie', 1, 0.8), tb = q.on('Tinbergen', 1, 0.8); const G = { x: 260, y: 300, w: 1100, h: 460 };
    if (fu < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - fu; const X = (u) => G.x + (u / 50) * G.w;
      hessGrafiek(ctx, G.x, G.y, G.w, G.h, { punten: 1, prog: 1, punt48: 1, venster: q.on('tijdvenster', 1) });
      // vluchtend eendje bij 48 uur
      const v = q.on('vluchten', 1, 1.5); kuiken(ctx, X(48) + 160 + v * 180, 640, 0.7, { kleur: EEND, flip: 1, t, loop: v > 0 && v < 1 ? 1 : 0, a: q.on('bang', 1) }); regel(ctx, 'bang voor alles wat nieuw is', X(48) + 260, 560, q.on('bang', 1), C.koraal, 28, 'center', 700);
      // vink: eerste levensjaar
      if (q.on('vink', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('vink', 1); roundRect(ctx, 260, 150, 900, 60, 12); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(264, 154, 300, 52); text(ctx, 'vink: lied leren in het eerste levensjaar', 700, 192, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
      ctx.restore(); }
    if (fu > 0.01 && tb < 0.99) { ctx.save(); ctx.globalAlpha *= fu * (1 - tb); weideKlein(ctx); const mx = 900 + Math.sin(t * 0.6) * 80; gans(ctx, mx, 600, 1.1, { t, flip: 1 }); rij(ctx, mx - 30, 700, 5, t, { s: 0.75, gap: 70 });
      tag(ctx, 'blijft dicht bij moeder', 960, 200, C.teal, q.on('dicht', 1)); tag(ctx, 'bescherming', 640, 300, C.groen, q.on('beschermt', 1)); tag(ctx, 'naar voedsel', 1300, 300, C.groen, q.on('voedsel', 1));
      broedmachine(ctx, 1460, 700, 300, 130, q.on('ingrijpen', 1)); regel(ctx, 'hier gaat het mis', 1610, 880, q.on('ingrijpen', 1), C.koraal, 28, 'center', 700); ctx.restore(); }
    if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; regel(ctx, 'de vragen van Tinbergen', 960, 170, 1, C.text, 40, 'center', 700);
      [['oorzaak', '1 oorzaak', 'het eerste bewegende ding dat het jong ziet', C.teal, 1], ['ontwikkeling', '2 ontwikkeling', 'kan alleen in een korte periode', C.groen, 1], ['functie', '3 functie', 'dicht bij moeder blijven', C.goud, 2]].forEach(([w, nm, s, col, n], i) => { const a = q.on(w, n); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = 160 + i * 540; roundRect(ctx, x, 300, 500, 300, 16); shape(ctx, rgba(col, 0.12), col, 2); text(ctx, nm, x + 30, 360, fTekst(36, 700), col, 'left'); ctx.font = fTekst(30, 600); ctx.fillStyle = C.text; wrap(ctx, s, x + 30, 430, 440, 42); ctx.restore(); });
      ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const vol = q.on('volwassen', 1, 0.8);
    regel(ctx, 'seksuele inprenting', 140, 140, q.on('seksuele', 1), C.paars, 40, 'left', 700); regel(ctx, 'leren hoe een geschikte partner eruitziet', 140, 186, q.on('partner', 1), C.text2, 28, 'left', 600);
    if (vol < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - vol) * q.on('opvoeden', 1); ctx.beginPath(); ctx.ellipse(960, 640, 220, 60, 0, 0, Math.PI); shape(ctx, '#8A6A44', '#5E4428', 3);
      meeuwtje(ctx, 760, 520, 1.2, { flip: 1 }); meeuwtje(ctx, 1160, 520, 1.2, { flip: -1, a: q.on('meeuwtje', 1) }); zebravink(ctx, 960, 600, 0.8, { man_: 0 });
      regel(ctx, 'ouders: Japanse meeuwtjes', 960, 380, q.on('meeuwtje', 1), C.text, 30, 'center', 700); regel(ctx, 'jong: zebravink', 960, 780, q.on('zebravinken', 1), C.text, 30, 'center', 700); ctx.restore(); }
    if (vol > 0.01) { ctx.save(); ctx.globalAlpha *= vol; zebravink(ctx, 960, 600, 1.4, { flip: -1 }); regel(ctx, 'volwassen zebravinkmannetje', 960, 760, 1, C.text, 28, 'center', 700);
      meeuwtje(ctx, 560, 600, 1.2, { flip: 1, a: q.on('baltsten', 1) }); const h = q.on('baltsten', 1); for (let i = 0; i < 3; i++) hartje(ctx, 760 - i * 50, 470 - ((t * 40 + i * 30) % 90), 1.3, h * 0.9);
      zebravink(ctx, 1400, 600, 1.2, { flip: -1, man_: 0, a: q.on('zelfs', 1) }); regel(ctx, 'zebravinkvrouwtje', 1400, 760, q.on('zelfs', 1), C.text2, 26, 'center', 600); kruis(ctx, 1400, 470, 30, q.on('waren', 1));
      tag(ctx, 'partnervoorkeur vastgelegd in de jeugd', 960, 300, C.paars, q.on('partnervoorkeur', 1)); ctx.restore(); } },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const taal = q.on('taal', 1, 0.8);
    if (taal < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - taal;
      tag(ctx, 'mensen prenten niet in zoals ganzen', 960, 160, C.text2, q.on('prenten', 1) * (1 - q.on('zien.', 1)));
      persoon(ctx, 'noor', 300, 860, 520, { uit: q.on('plakte', 1) > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t, a: q.on('Noor', 1) });
      // foto: Noor als peuter met pleister
      if (q.on('drie', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('drie', 1); roundRect(ctx, 470, 200, 240, 260, 10); shape(ctx, '#F2F2EE', '#C9C2B2', 3); circ(ctx, 590, 320, 70, '#D9A982'); ctx.fillStyle = '#3A2418'; ctx.beginPath(); ctx.arc(590, 300, 74, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); circ(ctx, 566, 322, 6, '#121A26'); circ(ctx, 614, 322, 6, '#121A26'); if (q.on('plakte', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('plakte', 1); roundRect(ctx, 540, 300, 50, 40, 14); shape(ctx, '#E8C9A8', '#B89878', 2); ctx.restore(); } ctx.strokeStyle = '#8A5A4A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(590, 345, 14, 0.3, Math.PI - 0.3); ctx.stroke(); text(ctx, 'Noor, 3 jaar', 590, 440, fTekst(24, 700), '#121A26', 'center'); ctx.restore(); }
      const lui = q.on('rechteroog', 1), pl = q.on('plakte', 1), wk = q.on('werken', 1, 3);
      oogSchema(ctx, 900, 220, { a: q.on('zien.', 1), links: 1 - 0.75 * lui + 0.7 * wk, rechts: 1 - 0.85 * pl * (1 - q.on('jonge', 1)), pleister: pl * (1 - q.on('jonge', 1)), dimL: 0 });
      tag(ctx, 'lui oog', 1020, 790, C.koraal, q.on('lui', 1) * (1 - q.on('jonge', 1))); tag(ctx, 'oog zelf is niet ziek', 1020, 860, C.text2, q.on('ziek', 1) * (1 - q.on('hersenen', 1)));
      // plasticiteit tegen leeftijd
      if (q.on('jonge', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('jonge', 1); const x = 1460, y = 300, w = 380, h = 300; ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fillRect(x - 30, y - 70, w + 60, h + 170); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, v = 0.95 / (1 + Math.exp((u - 0.28) * 14)) + 0.06; i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x, y + h - v * h); } ctx.stroke(); metaText(ctx, 'leeftijd →', x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, 'afplakken helpt', x, y - 20, C.text2, 'left', 18); regel(ctx, 'kind', x + 50, y + h + 70, 1, C.groen, 26, 'center', 700); regel(ctx, 'volwassene', x + w - 70, y + h + 70, q.on('volwassenen', 1), C.koraal, 26, 'center', 700); ctx.restore(); }
      ctx.restore(); }
    if (taal > 0.01) { ctx.save(); ctx.globalAlpha *= taal; regel(ctx, 'taalklanken', 140, 140, 1, C.text, 40, 'left', 700);
      const jp = q.on('Japans', 1); tag(ctx, 'Japans: geen onderscheid tussen r en l', 960, 240, C.text2, jp * (1 - q.on('Wie', 1)));
      baby(ctx, 620, 560, 1.1, q.on('Baby', 1)); regel(ctx, '6 maanden', 620, 700, q.on('Baby', 1), C.text, 30, 'center', 700);
      baby(ctx, 1300, 560, 1.3, q.on('Baby', 1)); regel(ctx, '1 jaar', 1300, 720, q.on('Baby', 1), C.text, 30, 'center', 700);
      const kl = q.at('klanken', 2); klank(ctx, 'ra', 860, 400, C.teal, ramp(t, kl + 0.6, 0.5)); klank(ctx, 'la', 1060, 400, C.koraal, ramp(t, kl + 1.7, 0.5));
      vraagteken(ctx, 960, 860, q.on('Wie', 1), 100); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('deur', 1, 0.8);
    if (d < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - d;
      baby(ctx, 520, 520, 1.1, 1); regel(ctx, '6 maanden', 520, 660, 1, C.text, 30, 'center', 700); klank(ctx, 'ra', 420, 330, C.teal, q.on('zes', 1)); klank(ctx, 'la', 630, 330, C.koraal, q.on('zes', 1)); text(ctx, '≠', 525, 345, fTitel(48), C.goud, 'center'); vink_(ctx, 700, 520, 24, q.on('goed.', 1));
      const sl = q.on('slechter', 1); baby(ctx, 1300, 520, 1.3, 1, 0); regel(ctx, '1 jaar', 1300, 690, 1, C.text, 30, 'center', 700);
      klank(ctx, 'ra', 1195, 330, C.teal, q.on('jaar', 1)); klank(ctx, 'la', 1405, 330, lerpCol(C.koraal, C.teal, sl), q.on('jaar', 1)); text(ctx, sl > 0.5 ? '≈' : '≠', 1300, 345, fTitel(48), C.goud, 'center');
      tag(ctx, 'hersenen afgestemd op de eigen taal', 960, 840, C.teal, q.on('afgestemd', 1)); ctx.restore(); }
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; const dicht = clamp((t - q.at('langzaam')) / 6, 0, 1); deur(ctx, 300, 250, 480, 1 - 0.75 * dicht); regel(ctx, 'geen deur die ineens dichtvalt', 540, 800, 1, C.text2, 28, 'center', 600);
      // taal leren: geleidelijk
      const x = 960, y = 300, w = 760, h = 380, a2 = q.on('taal', 1); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50, v = 0.85 * Math.exp(-u * 2.2) + 0.12; i ? ctx.lineTo(x + u * w, y + h - v * h) : ctx.moveTo(x, y + h - v * h); } ctx.stroke(); metaText(ctx, 'leeftijd waarop je begint →', x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, 'goede uitspraak leren', x, y - 20, C.text2, 'left', 18);
        regel(ctx, 'jong begonnen: makkelijker', x + 260, y + 60, q.on('jong', 1), C.goud, 28, 'left', 700); regel(ctx, 'leren kan je hele leven', x + w - 10, y + h - 150, q.on('leven', 1), C.text, 28, 'right', 600); ctx.restore(); }
      ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'gansjes volgen Lorenz', q.on('Lorenz', 1), (x) => { man(ctx, x + 300, 640, 300, { t, loop: 1 }); rij(ctx, x + 290, 630, 3, t, { s: 0.6, gap: 56 }); });
    panel(1, 'inprenting', q.on('inprenting', 1), (x) => { ['snel leren', 'korte periode', 'blijvend effect'].forEach((s, i) => { vink_(ctx, x + 50, 340 + i * 90, 14, 1); regel(ctx, s, x + 80, 352 + i * 90, 1, C.text, 30, 'left', 600); }); });
    panel(2, 'sensitieve periode', q.on('tijdvenster', 1), (x) => { hessGrafiek(ctx, x + 40, 360, 330, 240, { prog: 1, venster: 0 }); ctx.fillStyle = rgba(C.goud, 0.2); ctx.fillRect(x + 40 + (4 / 50) * 330, 360, (26 / 50) * 330, 240); });
    panel(3, 'ook bij mensen', q.on('mensen', 1), (x) => { const e = q.on('zien', 1); ctx.save(); ctx.globalAlpha *= e; ctx.beginPath(); ctx.ellipse(x + 200, 380, 80, 50, 0, 0, 6.283); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x + 200, 380, 26, '#4A6A8A'); circ(ctx, x + 200, 380, 10, '#121A26'); regel(ctx, 'zien', x + 200, 480, 1, C.text, 28, 'center', 700); ctx.restore(); klank(ctx, 'ra', x + 130, 590, C.teal, q.on('taalklanken', 1)); klank(ctx, 'la', x + 270, 590, C.koraal, q.on('taalklanken', 1)); regel(ctx, 'taalklanken', x + 200, 690, q.on('taalklanken', 1), C.text, 28, 'center', 700); });
    tag(ctx, 'vroege ervaringen tellen extra zwaar', 960, 850, C.goud, q.on('Vroege', 1)); },
};
function weideKlein(ctx) { ctx.fillStyle = rgba(GRAS, 0.5); ctx.fillRect(0, 560, W, CAPTION_Y - 560); }
function lerpCol(a, b, u) { const p = (c) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }

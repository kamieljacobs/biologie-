// Wat word jij? · Fysiotherapie 3 · Trainen — eigen tekeningen (21 okt 2026)
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
const BR = { hersen: '#3A3452', rand: '#8C7BBF', strip: '#E0B64A', schade: '#5A2A2E', zenuw: '#E0B64A', spier: '#B8564E', spierL: '#D27A6E', huid: '#E3B998' };
function motorEenheid(ctx, x, y, s, m, a = 1, act = 0, col = C.goud, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 26, rgba(col, 0.9), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(140, 0); ctx.stroke();
  const rows = Math.min(m, 12), cols = Math.ceil(m / rows), H2 = rows * 26;
  for (let i = 0; i < m; i++) { const r = i % rows, c = Math.floor(i / rows), fy = -H2 / 2 + r * 26 + 13, fx = 220 + c * 12; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 0); ctx.quadraticCurveTo(180, fy, fx, fy); ctx.stroke();
    const on = act > 0.01 ? 0.5 + 0.5 * Math.sin(t * 10) * act : 0; roundRect(ctx, fx, fy - 9, 260, 18, 9); shape(ctx, on > 0.6 ? BR.spierL : BR.spier, '#8A3A34', 1.5); }
  ctx.restore(); }

// ===== supercompensatie: conditielijn. modus: 'een' (één training), 'op' (op tijd), 'vroeg', 'laat'; u = hoe ver getekend
function superLijn(ctx, x, y, w, h, modus, u, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const base = y + h * 0.55;
  ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x + w, base); ctx.stroke(); ctx.setLineDash([]);
  const een = d => d < 0.5 ? -Math.sin(Math.PI * d / 0.5) : d < 1 ? 0.5 * Math.sin(Math.PI / 2 * (d - 0.5) / 0.5) : d < 1.8 ? 0.5 * Math.cos(Math.PI / 2 * (d - 1) / 0.8) : 0;
  const v = T => { if (modus === 'een') return een(T / 2); if (modus === 'op') { const k = Math.floor(T), f = T - k; return k * 0.5 + (f < 0.5 ? -Math.sin(Math.PI * f / 0.5) : 0.5 * Math.sin(Math.PI / 2 * (f - 0.5) / 0.5)); }
    if (modus === 'vroeg') { const k = Math.floor(T / 0.5), f = T - k * 0.5; return -0.2 * k + (f < 0.25 ? -0.6 * Math.sin(Math.PI * f / 0.5) : -0.6 + 0.4 * (f - 0.25) / 0.25); }
    const k = Math.floor(T / 2); return een(T - k * 2); };
  const TT = modus === 'een' ? 4 : 4, N = 400; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const m = Math.round(N * clamp(u, 0, 1));
  for (let i = 0; i <= m; i++) { const g = i / N, px = x + g * w, py = base - v(g * TT) * h * 0.2; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  // trainingsmomenten
  const starts = modus === 'een' ? [0] : modus === 'op' ? [0, 1, 2, 3] : modus === 'vroeg' ? [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] : [0, 2]; starts.forEach(s0 => { if (s0 / TT <= u) { ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(x + s0 / TT * w, base + h * 0.42); ctx.lineTo(x + s0 / TT * w - 10, base + h * 0.42 + 18); ctx.lineTo(x + s0 / TT * w + 10, base + h * 0.42 + 18); ctx.fill(); } });
  ctx.restore(); }

// ===== doorsnede spiervezel met mitochondriën (n) en haarvaten eromheen (k)
function vezelRond(ctx, x, y, r, n, k, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(BR.spier, 0.9), '#8A3A34', 3);
  for (let i = 0; i < n; i++) { const an = hash(i * 7) * 6.283, rr = r * (0.2 + 0.7 * hash(i * 13)); mitochondrion(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, 30, hash(i * 3) * 3, 1, 3, t); }
  for (let i = 0; i < k; i++) { const an = i / Math.max(k, 1) * 6.283 + 0.3; circ(ctx, x + Math.cos(an) * (r + 22), y + Math.sin(an) * (r + 22), 13, '#B23A3A', '#E06A5A', 2); } ctx.restore(); }

// ===== hart (eenvoudig) met slag; s = grootte
function hartje(ctx, x, y, s, a = 1, slag = 0, kamer = 1) { if (a <= 0.01) return; const k = s * (1 - 0.07 * slag); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-110, -10, -90, -110, -20, -90); ctx.bezierCurveTo(0, -84, 0, -70, 0, -60); ctx.bezierCurveTo(0, -70, 0, -84, 20, -90); ctx.bezierCurveTo(90, -110, 110, -10, 0, 60); ctx.closePath(); shape(ctx, '#B23A3A', '#E06A5A', 3);
  roundRect(ctx, -40, -112, 22, 40, 8); shape(ctx, '#C9506A', '#E06A5A', 2); roundRect(ctx, 6, -118, 26, 44, 10); shape(ctx, '#8A4A7A', '#B06A9A', 2); const kk = (1 - 0.25 * slag) * kamer; ctx.beginPath(); ctx.ellipse(-30, -10, 26 * kk, 40 * kk, 0.2, 0, 6.283); ctx.fillStyle = '#5A1A22'; ctx.fill(); ctx.beginPath(); ctx.ellipse(32, -6, 30 * kk, 44 * kk, -0.2, 0, 6.283); ctx.fill(); ctx.strokeStyle = rgba('#F2D0C8', 0.7); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(-2, 0, 6, 46); ctx.stroke(); metaText(ctx, 'KAMERS', 0, 30 + 56, '#F2D0C8', 'center', 18); ctx.restore(); }
// druppels bloed per slag uit het hart
function slagDruppels(ctx, x, y, n, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % 5) * 34, y + Math.floor(i / 5) * 34, 13, '#B23A3A', '#E06A5A', 1.5); ctx.restore(); }

// ===== spiervezel in de lengte met eiwitdraden; dik 0..1
function vezelLang(ctx, x, y, w, dik, a = 1) { if (a <= 0.01) return; const h = 80 + 70 * dik, nd = Math.round(6 + 8 * dik); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BR.spier, 0.9), '#8A3A34', 3);
  for (let i = 0; i < nd; i++) { const yy = y - h / 2 + 12 + i * (h - 24) / Math.max(nd - 1, 1); ctx.strokeStyle = i % 2 ? rgba('#F2C0B0', 0.8) : rgba('#E07A6A', 0.9); ctx.lineWidth = 4; ctx.setLineDash(i % 2 ? [30, 14] : [18, 10]); ctx.beginPath(); ctx.moveTo(x + 30, yy); ctx.lineTo(x + w - 30, yy); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }

// ===== halterstang
function stang(ctx, x, y, w, a = 1, schijf = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke();
  for (const k of [-1, 1]) for (let i = 0; i < 1 + schijf; i++) { roundRect(ctx, x + k * (w / 2 - 40 - i * 26) - 12, y - 70 + i * 10, 24, 140 - i * 20, 6); shape(ctx, '#3A3F4E', '#6A7080', 2); } ctx.restore(); }
// ===== zwembad
function zwembad(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9C2B0'; ctx.fillRect(0, 560, 760, 60); ctx.fillStyle = '#2E6FBF'; ctx.fillRect(760, 600, W - 760, 280); ctx.fillRect(0, 620, 760, 260); ctx.strokeStyle = rgba('#F2F2EE', 0.7); ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.setLineDash([24, 18]); ctx.beginPath(); ctx.moveTo(0, 660 + i * 80); ctx.lineTo(W, 660 + i * 80); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// ===== loopband
function loopband(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 40, 18); shape(ctx, '#2A2F3E', '#6A7080', 3); ctx.strokeStyle = '#6A7080'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { const px = x - w / 2 + ((i * w / 10 - t * 140) % w + w) % w; ctx.beginPath(); ctx.moveTo(px, y + 6); ctx.lineTo(px, y + 34); ctx.stroke(); }
  ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x + w / 2 - 30, y); ctx.lineTo(x + w / 2 - 10, y - 330); ctx.lineTo(x + w / 2 - 110, y - 330); ctx.stroke(); roundRect(ctx, x + w / 2 - 70, y - 380, 120, 70, 10); shape(ctx, '#1A2230', '#6A7080', 2); ctx.restore(); }
// ===== krachtplaat met kracht-tijd-grafiek
function krachtPlaat(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, '#C9A35C', '#8A6A3A', 2); ctx.restore(); }
function krachtGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD', 'KRACHT'); const lg = y + h - h * 0.2;
  ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, lg); ctx.lineTo(x + w, lg); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'LICHAAMSGEWICHT', x + w - 10, lg - 10, C.text2, 'right', 20);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const g = i / 100, v = g < 0.3 ? 0.2 : g < 0.45 ? 0.02 : g < 0.6 ? 0.2 + 0.66 * Math.exp(-Math.pow((g - 0.5) / 0.035, 2)) : 0.2; ctx.lineTo(x + g * w, y + h - v * h); } ctx.stroke(); ctx.restore(); }
// ===== stokfiguur met reflecterende stipjes (motion capture) en camera's
function stokSkelet(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const ph = t * 5, sw = Math.sin(ph);
  const P = { kop: [0, -330], nek: [0, -290], heup: [0, -150], sl: [-10 - 40 * sw, -200], hl: [-20 - 60 * sw, -150], sr: [10 + 40 * sw, -200], hr: [20 + 60 * sw, -150], kl: [30 * sw, -75], vl: [60 * sw, 0], kr: [-30 * sw, -75], vr: [-60 * sw, 0] };
  ctx.strokeStyle = C.text2; ctx.lineWidth = 6; ctx.lineCap = 'round'; const L = (a1, b1) => { ctx.beginPath(); ctx.moveTo(...P[a1]); ctx.lineTo(...P[b1]); ctx.stroke(); }; [['nek', 'heup'], ['nek', 'sl'], ['sl', 'hl'], ['nek', 'sr'], ['sr', 'hr'], ['heup', 'kl'], ['kl', 'vl'], ['heup', 'kr'], ['kr', 'vr']].forEach(([p1, p2]) => L(p1, p2));
  circ(ctx, ...P.kop, 30, null, C.text2, 6); Object.values(P).forEach(p => { circ(ctx, p[0], p[1], 11, '#F2F2EE'); circ(ctx, p[0], p[1], 18, rgba('#F2F2EE', 0.2)); }); ctx.restore(); }
function camera(ctx, x, y, s, a = 1, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(dir * s, s); roundRect(ctx, -40, -26, 70, 52, 8); shape(ctx, '#3A3F4E', '#8A93A6', 2); ctx.beginPath(); ctx.moveTo(30, -12); ctx.lineTo(56, -24); ctx.lineTo(56, 24); ctx.lineTo(30, 12); ctx.closePath(); shape(ctx, '#3A3F4E', '#8A93A6', 2); circ(ctx, -4, 0, 10, '#E07A5F'); ctx.restore(); }

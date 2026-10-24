// Wat word jij? · Medische beeldvorming 2 · Bestraling — eigen tekeningen (24 okt 2026)
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, "left", 700); }
const M2 = { s0: '#5BA4C9', s1: '#E0B64A', breuk: '#E07A5F', herstel: '#7FC48F', bundel: '#F2D27A', huid: '#3A4A66', cyto: '#24344F', kern: '#3A3266', kernR: '#8C7BBF', chrom: '#C98AD6', tumor: '#E07A5F', blaas: '#E6C878', darm: '#B9826A', bot: '#ECE5D3' };

function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 24) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }


// ===== DNA: horizontale dubbele helix; breuken = [{x, s: 0|1|2 (beide), sep, herstel, a}] =====
function dnaHelix(ctx, x0, x1, y, A, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const br = o.breuken || [], lam = o.lam || 220, lw = o.lw || 9; ctx.save(); ctx.globalAlpha *= a;
  const ds = br.find(b => b.s === 2 && (b.a == null || b.a > 0.01));
  const deel = (xa, xb, dx, dy, rot) => { ctx.save(); const px = ds ? ds.x : 0; ctx.translate(px + dx, y + dy); ctx.rotate(rot); ctx.translate(-px, -y);
    const yy = (x, s) => y + A * Math.sin((x - x0) / lam * 6.283 + t * 0.6 + s * Math.PI);
    // sporten (basenparen)
    for (let x = xa + 8; x < xb - 4; x += 24) { const ya = yy(x, 0), yb = yy(x, 1); const gap = br.some(b => b.s !== 2 && Math.abs(x - b.x) < 14 && (b.herstel || 0) < 0.5 && (b.a == null || b.a > 0.5)); ctx.strokeStyle = gap ? rgba('#C9B896', 0.35) : (Math.floor(x / 24) % 2 ? '#C9B896' : '#9AA3B2'); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, yb); ctx.stroke(); }
    for (let s = 0; s < 2; s++) { ctx.strokeStyle = s ? M2.s1 : M2.s0; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); let pen = false;
      for (let x = xa; x <= xb; x += 4) { const g = br.find(b => b.s === s && Math.abs(x - b.x) < 16 && (b.a == null || b.a > 0.01)); const open = g && (Math.abs(x - g.x) > 16 * (g.herstel || 0)) && (g.a == null || g.a > 0.5);
        if (open) { if (pen) ctx.stroke(); pen = false; ctx.beginPath(); continue; } if (!pen) { ctx.moveTo(x, yy(x, s)); pen = true; } else ctx.lineTo(x, yy(x, s)); } if (pen) ctx.stroke();
      br.filter(b => b.s === s && (b.herstel || 0) > 0.01 && (b.herstel || 0) < 0.99).forEach(b => { ctx.strokeStyle = M2.herstel; ctx.lineWidth = lw; ctx.beginPath(); const h = 16 * b.herstel; ctx.moveTo(b.x - h, yy(b.x - h, s)); ctx.lineTo(b.x - 16, yy(b.x - 16, s)); ctx.moveTo(b.x + 16, yy(b.x + 16, s)); ctx.lineTo(b.x + h, yy(b.x + h, s)); ctx.stroke(); });
      br.filter(b => b.s === s && (b.herstel || 0) >= 0.99).forEach(b => { ctx.strokeStyle = M2.herstel; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(b.x - 16, yy(b.x - 16, s)); for (let x = b.x - 16; x <= b.x + 16; x += 4) ctx.lineTo(x, yy(x, s)); ctx.stroke(); }); }
    ctx.restore(); };
  if (ds) { const sp = ds.sep || 0; deel(x0, ds.x - 18, -sp / 2, sp * 0.15, -sp * 0.0012); deel(ds.x + 18, x1, sp / 2, -sp * 0.1, sp * 0.001);
    if (sp < 30) { const g = ctx.createRadialGradient(ds.x, y, 2, ds.x, y, 60); g.addColorStop(0, rgba(M2.breuk, 0.8 * (ds.a == null ? 1 : ds.a))); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ds.x, y, 60, 0, 6.283); ctx.fill(); } }
  else deel(x0, x1, 0, 0, 0);
  br.filter(b => b.s !== 2 && (b.herstel || 0) < 0.5 && (b.a == null || b.a > 0.01)).forEach(b => { const ys = y + A * Math.sin((b.x - x0) / lam * 6.283 + t * 0.6 + b.s * Math.PI); const g = ctx.createRadialGradient(b.x, ys, 2, b.x, ys, 46); g.addColorStop(0, rgba(M2.breuk, 0.85 * (b.a == null ? 1 : b.a))); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, ys, 46, 0, 6.283); ctx.fill(); });
  ctx.restore(); }

// ===== bundel ioniserende straling (van p1 naar p2, golflijntjes) =====
function bundel(ctx, x1, y1, x2, y2, w, a = 1, t = 0, col = M2.bundel) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
  ctx.translate(x1, y1); ctx.rotate(an); const g = ctx.createLinearGradient(0, 0, L, 0); g.addColorStop(0, rgba(col, 0.05)); g.addColorStop(0.3, rgba(col, 0.28)); g.addColorStop(1, rgba(col, 0.42)); ctx.fillStyle = g; ctx.fillRect(0, -w / 2, L, w);
  ctx.strokeStyle = rgba(col, 0.9); ctx.lineWidth = 2.5; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let x = 0; x <= L; x += 6) { const yy = k * w * 0.28 + Math.sin(x * 0.12 - t * 9 + k) * 5; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } ctx.restore(); }

// ===== molecuul water met elektron dat wegschiet; u 0..1 =====
function h2o(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C8D2DC'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 22 * s); ctx.lineTo(x, y); ctx.lineTo(x + 30 * s, y + 22 * s); ctx.stroke();
  circ(ctx, x, y, 24 * s, '#D8573F', '#F08A70', 2); circ(ctx, x - 34 * s, y + 26 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); circ(ctx, x + 34 * s, y + 26 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); ctx.restore(); }
function radicaal(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x, y, 4, x, y, 60 * s); g.addColorStop(0, rgba(M2.breuk, 0.5)); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 60 * s, 0, 6.283); ctx.fill();
  ctx.strokeStyle = '#C8D2DC'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 34 * s, y + 18 * s); ctx.stroke(); circ(ctx, x, y, 24 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 36 * s, y + 20 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); circ(ctx, x - 14 * s, y - 30 * s, 6 * s, '#FFF4C0'); ctx.restore(); }
function elektron(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x, y, 1, x, y, 26); g.addColorStop(0, rgba('#9FD8FF', 0.9)); g.addColorStop(1, rgba('#9FD8FF', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.fill(); circ(ctx, x, y, 9, '#9FD8FF', '#FFFFFF', 2); text(ctx, '−', x, y + 6, fTekst(18, 800), '#121A26', 'center'); ctx.restore(); }

// ===== chromosoom (X-vorm, twee zusterchromatiden) of één chromatide; broken = stuk onder de breuk weg =====
function chromosoom(ctx, x, y, L, rot, col, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); const w = o.w || 16, dub = o.enkel ? [0] : [-1, 1];
  ctx.lineCap = 'round'; for (const k of dub) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); const sp = o.enkel ? 0 : 11; const onder = o.breuk ? L * 0.18 : L * 0.62; ctx.moveTo(k * sp - k * 4, -L * 0.38); ctx.quadraticCurveTo(k * 2, 0, k * sp, onder); ctx.stroke(); }
  circ(ctx, 0, 0, w * 0.55, _donker(col, 0.35)); ctx.restore(); }
function fragment(ctx, x, y, L, rot, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -L / 2); ctx.quadraticCurveTo(5, 0, 0, L / 2); ctx.stroke(); ctx.restore(); }

// ===== ronde cel met kern; o.chrom = [[dx,dy,rot,breuk]], o.dood 0..1 (blaasjes) =====
function mcel(ctx, x, y, r, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const d = o.dood || 0; ctx.save(); ctx.globalAlpha *= a;
  if (d > 0.01) { for (let i = 0; i < 9; i++) { const an = i * 0.7 + 0.3, rr = r * (0.25 + 0.55 * d) * (0.6 + 0.4 * hash(i * 7)); const bx = x + Math.cos(an) * rr, by = y + Math.sin(an) * rr; circ(ctx, bx, by, r * (0.32 - 0.12 * d) * (0.7 + 0.3 * hash(i * 3)), rgba('#5A6478', 0.5 + 0.3 * (1 - d)), '#7A8494', 2); } ctx.globalAlpha *= 1 - d; }
  circ(ctx, x, y, r, o.vul || M2.cyto, o.rand || C.er, 4);
  for (let i = 0; i < 10; i++) { const w2 = wander(i + (o.seed || 0) * 13, t, r * 0.6, 0.3); circ(ctx, x + w2.x * 0.9, y + w2.y * 0.9, 3, rgba('#8FA0B5', 0.35)); }
  (o.los || []).forEach(([dx, dy, rot]) => fragment(ctx, x + dx * r, y + dy * r, r * 0.26, rot, '#7FC4B8', 1));
  if (!o.geenKern) { circ(ctx, x, y, r * 0.52, M2.kern, M2.kernR, 3); (o.chrom || []).forEach(([dx, dy, rot, br]) => { chromosoom(ctx, x + dx * r, y + dy * r, r * 0.32, rot, o.chromKl || M2.chrom, { breuk: br, w: Math.max(6, r * 0.06) }); if (br && r > 120) fragment(ctx, x + dx * r + r * 0.16, y + dy * r + r * 0.2, r * 0.13, rot + 1.2, o.chromKl || M2.chrom, 1); }); }
  ctx.restore(); }

// ===== verkeersbord 'stop' als rem van de celcyclus; kapot = kruis =====
function remBord(ctx, x, y, r, a = 1, kapot = 0, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A8294'; ctx.fillRect(x - 5, y, 10, r * 1.6);
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + 0.3927; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, aan > 0.5 ? '#C8463A' : '#6A4A4A', '#F2F2EE', 4);
  text(ctx, 'STOP', x, y + r * 0.22, fTekst(r * 0.55, 800), '#F2F2EE', 'center'); kruis(ctx, x, y, r * 0.9, kapot, '#F2C94C'); ctx.restore(); }

// ===== deling (anafase): spoelfiguur, chromatiden naar de polen, fragment zonder centromeer blijft liggen =====
function delingCel(ctx, x, y, w, h, u, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ins = o.insnoer || 0;
  ctx.beginPath(); const rx = w / 2, ry = h / 2; for (let k = 0; k <= 64; k++) { const an = k / 64 * 6.283; const pinch = 1 - ins * 0.55 * Math.pow(Math.abs(Math.sin(an)), 6) ; ctx.lineTo(x + Math.cos(an) * rx, y + Math.sin(an) * ry * pinch); } ctx.closePath(); shape(ctx, M2.cyto, C.er, 4);
  const pL = [x - rx * 0.78, y], pR = [x + rx * 0.78, y]; circ(ctx, pL[0], pL[1], 12, C.oker); circ(ctx, pR[0], pR[1], 12, C.oker);
  const n = 4, off = ease(u) * rx * 0.55; const gotFrag = o.fragment != null ? o.fragment : 1;
  for (let i = 0; i < n; i++) { const yy = y + (i - 1.5) * h * 0.17; const col = [M2.chrom, '#7FC4B8', '#E0B64A', '#9FB8E6'][i];
    for (const s of [-1, 1]) { const cx2 = x + s * (14 + off); ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s < 0 ? pL[0] : pR[0], pL[1]); ctx.lineTo(cx2, yy); ctx.stroke();
      const br = (i === 1 && gotFrag > 0.01); ctx.save(); ctx.translate(cx2, yy); ctx.strokeStyle = col; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-s * 38, -10, -s * 64, -36); ctx.moveTo(0, 0); if (br) { ctx.quadraticCurveTo(-s * 18, 6, -s * 26, 12); } else { ctx.quadraticCurveTo(-s * 38, 10, -s * 64, 36); } ctx.stroke(); circ(ctx, 0, 0, 9, _donker(col, 0.35)); ctx.restore(); } }
  if (gotFrag > 0.01) { const fy = y + (1 - 1.5) * h * 0.17; fragment(ctx, x + 30 + 20 * ease(u) * 0.3, fy + 34, 50, 0.9 + 0.2 * Math.sin(t), '#7FC4B8', gotFrag); fragment(ctx, x - 26 - 20 * ease(u) * 0.3, fy + 40, 50, -0.9 - 0.2 * Math.sin(t), '#7FC4B8', gotFrag); if (o.gloed) { const g = ctx.createRadialGradient(x + 36, fy + 34, 4, x + 36, fy + 34, 70); g.addColorStop(0, rgba(M2.breuk, 0.45 * o.gloed)); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + 36, fy + 34, 70, 0, 6.283); ctx.fill(); } }
  ctx.restore(); return { fx: x + 36, fy: y - h * 0.085 + 34 }; }

// ===== bekken in doorsnede (zoals op een CT-plak: buik boven, rug onder) =====
function bekken(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const ct = o.ct || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kl = (c, g) => ct > 0.5 ? g : c;
  if (ct > 0.5) { roundRect(ctx, -400, -300, 800, 600, 16); shape(ctx, '#0A0C10', '#3A4458', 2); }
  ctx.beginPath(); ctx.ellipse(0, 0, 340, 230, 0, 0, 6.283); shape(ctx, kl('#6A4E46', '#3A3C40'), kl('#E3B998', '#5A5C60'), 6);
  ctx.beginPath(); ctx.ellipse(0, 0, 316, 206, 0, 0, 6.283); shape(ctx, kl('#8A5A50', '#4A4C52'), null);
  // botten: heupkoppen links en rechts, schaambeen voor, stuitbeen achter
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 210, 10, 62, 74, 0, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3); ctx.beginPath(); ctx.ellipse(k * 210, 10, 34, 44, 0, 0, 6.283); shape(ctx, kl('#D8CEB6', '#B0B0B0'), null); }
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 52, -150, 50, 22, k * 0.25, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3); }
  ctx.beginPath(); ctx.ellipse(0, 180, 40, 24, 0, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3);
  // blaas (voor), prostaat (midden), endeldarm (achter)
  ctx.beginPath(); ctx.ellipse(0, -80, 92, 50, 0, 0, 6.283); shape(ctx, kl(M2.blaas, '#2A2C30'), kl('#C9A84E', '#4A4C50'), 3);
  ctx.beginPath(); ctx.ellipse(0, 18, 58, 46, 0, 0, 6.283); shape(ctx, kl('#C98A8A', '#5E6066'), kl('#A86A6A', '#6E7076'), 3);
  ctx.beginPath(); ctx.ellipse(0, 112, 50, 38, 0, 0, 6.283); shape(ctx, kl(M2.darm, '#55575C'), kl('#8E5E4A', '#6A6C70'), 3); ctx.beginPath(); ctx.ellipse(0, 112, 22, 14, 0, 0, 6.283); shape(ctx, kl('#5A3A30', '#141518'), null);
  const tu = o.tumor || 0; if (tu > 0.01) { ctx.save(); ctx.globalAlpha *= tu; blob(ctx, 16, 22, 30, 24, 0.12, 4, 0); shape(ctx, rgba(M2.tumor, 0.85), '#F2A08A', 3); ctx.restore(); }
  // ingetekende contouren (bestralingsplan)
  const ci = o.contour || 0; if (ci > 0.01) { ctx.save(); ctx.lineWidth = 4; ctx.setLineDash([12, 8]); const f = ease(ci);
    const ring = (cx, cy, rx, ry, col, u) => { ctx.strokeStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u, 0, 1)); ctx.stroke(); };
    ring(0, 18, 72, 60, M2.tumor, f * 1.6); ring(0, -80, 104, 62, '#5BA4E0', f * 1.6 - 0.4); ring(0, 112, 62, 50, '#C9A35C', f * 1.6 - 0.6); ctx.restore(); }
  // bundels uit vijf richtingen
  const bu = o.bundels || 0; if (bu > 0.01) { const n = 5; for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / n * 6.283, f = clamp(bu * n - i, 0, 1); if (f <= 0.01) continue; bundel(ctx, Math.cos(an) * 520, 18 + Math.sin(an) * 520, 0, 18, 120, f * 0.9, o.t || 0); }
    const g = ctx.createRadialGradient(0, 18, 4, 0, 18, 90); g.addColorStop(0, rgba('#FF6A4A', 0.75 * clamp(bu * 1.2, 0, 1))); g.addColorStop(1, rgba('#FF6A4A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 18, 90, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// ===== kalender met 20 werkdagen (4,5 week) =====
function kalender20(ctx, x, y, a = 1, n = 0, cs = 52) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dagen = ['ma', 'di', 'wo', 'do', 'vr'];
  roundRect(ctx, x - 20, y - 66, 5 * cs + 40 + 4 * 8, 5 * (cs + 8) + 76, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2);
  dagen.forEach((d, i) => text(ctx, d, x + i * (cs + 8) + cs / 2, y - 22, fTekst(22, 700), '#5A6478', 'center'));
  for (let k = 0; k < 20; k++) { const r = Math.floor((k + 2) / 5), c = (k + 2) % 5; const xx = x + c * (cs + 8), yy = y + r * (cs + 8); roundRect(ctx, xx, yy, cs, cs, 8); shape(ctx, k < n ? '#F6E2B0' : '#E3E7EC', '#B8C0CC', 1.5); if (k < n) vink_(ctx, xx + cs / 2, yy + cs / 2, cs * 0.26, 1, '#3E8E5A'); }
  ctx.restore(); }

// ===== grafiek: overlevende cellen per bestraling (gezond weefsel herstelt, tumor zakt) =====
function fractieGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, '', ''); metaA(ctx, 'OVERLEVENDE CELLEN', x, y - 20, 1, C.text2, 'left', 22); metaA(ctx, 'BESTRALING 1 TOT 20', x, y + h + 40, 1, C.text2, 'left', 22);
  const pts = (f) => { const P = []; let v = 1; for (let k = 0; k < 20; k++) { const x0 = x + (k / 20) * w, x1 = x + ((k + 1) / 20) * w; P.push([x0, v]); v = v * f; P.push([x0 + 3, v]); P.push([x1, v]); } return P; };
  const lijn = (P, col) => { const nmax = Math.floor(P.length * clamp(u, 0, 1)); if (nmax < 2) return; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i < nmax; i++) { const [px, v] = P[i]; const py = y + h - v * h * 0.92; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); return P[nmax - 1]; };
  const g = lijn(pts(0.985), C.teal), tm = lijn(pts(0.8), C.koraal);
  ctx.restore(); return { g, tm, y0: y, h }; }

// ===== CT-scherm met plak =====
function ctScherm(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 430 * s, y - 330 * s, 860 * s, 660 * s, 18 * s); shape(ctx, '#2A2F3A', '#5A6478', 3); ctx.beginPath(); ctx.rect(x - 400 * s, y - 300 * s, 800 * s, 600 * s); ctx.clip(); bekken(ctx, x, y, s, 1, Object.assign({ ct: 1 }, o)); ctx.restore(); }

// ===== bestralingstafel van bovenaf met Henk (liggend op de rug), lasers en stipjes =====
function tafelBoven(ctx, x, y, h, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - h * 0.62, y - h * 0.2, h * 1.24, h * 0.4, 20); shape(ctx, '#2E3646', '#5A6478', 3); ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); persoon(ctx, 'henk', 0, h * 0.5, h, { t, uit: o.uit || 'neutraal' }); ctx.restore();
  const bx = x + h * 0.07; roundRect(ctx, x - h * 0.30, y - h * 0.105, h * 0.31, h * 0.21, 22); shape(ctx, '#BFD8E8', '#8FB2CC', 2); ctx.strokeStyle = '#8FB2CC'; ctx.lineWidth = 2; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - h * 0.30 + k * h * 0.075, y - h * 0.1); ctx.lineTo(x - h * 0.30 + k * h * 0.075, y + h * 0.1); ctx.stroke(); }
  roundRect(ctx, x + h * 0.005, y - h * 0.085, h * 0.115, h * 0.17, 18); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2);
  const L = o.laser || 0; if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = '#4AF07A'; ctx.lineWidth = 3; ctx.shadowColor = '#4AF07A'; ctx.shadowBlur = 0; ctx.beginPath(); ctx.moveTo(x - h * 0.7, y); ctx.lineTo(x + h * 0.7, y); ctx.moveTo(x + h * 0.065, y - h * 0.26); ctx.lineTo(x + h * 0.065, y + h * 0.26); ctx.stroke(); ctx.restore(); }
  const st = o.stip || 0; if (st > 0.01) { const pul = 0.6 + 0.4 * Math.sin(t * 5); [[x + h * 0.065, y], [x + h * 0.065, y - h * 0.06], [x + h * 0.065, y + h * 0.06]].forEach(([px, py]) => { circ(ctx, px, py, 16 * pul, rgba(C.goud, 0.35 * st)); circ(ctx, px, py, 5, rgba('#1A2030', st)); }); }
  ctx.restore(); }

// ===== versneller in zijaanzicht; aan 0..1 = bundel zichtbaar =====
function versneller(ctx, x, y, s, a = 1, aan = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 140, -520, 260, 520, 30); shape(ctx, '#DDE3EA', '#9AA3B2', 3); roundRect(ctx, -260, -560, 420, 150, 40); shape(ctx, '#E8ECF0', '#9AA3B2', 3); roundRect(ctx, -250, -420, 150, 70, 14); shape(ctx, '#C8D0DA', '#9AA3B2', 3);
  roundRect(ctx, -520, -250, 560, 40, 12); shape(ctx, '#2E3646', '#5A6478', 3); ctx.fillStyle = '#7A8294'; ctx.fillRect(-300, -210, 60, 210); roundRect(ctx, -360, -14, 180, 20, 6); shape(ctx, '#5A6478', null);
  if (aan > 0.01) { bundel(ctx, -175, -350, -175, -255, 90, aan, t); }
  circ(ctx, 300, -460, 22, aan > 0.5 ? '#F2C94C' : '#4A5266', '#2A3040', 3); ctx.restore(); }

// ===== bunker van bovenaf: dikke betonmuren met doolhofingang, bedieningsruimte met schermen =====
function bunker(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const d = o.muur || 70; ctx.save(); ctx.globalAlpha *= a;
  const beton = (bx, by, bw, bh) => { ctx.save(); ctx.fillStyle = '#7C828C'; ctx.fillRect(bx, by, bw, bh); ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.clip(); ctx.strokeStyle = '#646A74'; ctx.lineWidth = 3; for (let k = -bh; k < bw + bh; k += 22) { ctx.beginPath(); ctx.moveTo(bx + k, by); ctx.lineTo(bx + k - bh, by + bh); ctx.stroke(); } ctx.restore(); };
  ctx.fillStyle = '#26334C'; ctx.fillRect(x, y, w, h);
  beton(x - d, y - d, w + 2 * d, d); beton(x - d, y + h, w + 2 * d, d); beton(x - d, y, d, h); beton(x + w, y, d, h * 0.62); beton(x + w - 180, y + h * 0.62 - d, 180, d);
  // versneller van boven + tafel
  roundRect(ctx, x + w * 0.5 - 110, y + h * 0.28, 220, 110, 20); shape(ctx, '#DDE3EA', '#9AA3B2', 3); roundRect(ctx, x + w * 0.5 - 40, y + h * 0.28 + 100, 80, 220, 12); shape(ctx, '#2E3646', '#8FA0B5', 3);
  const bu = o.bundel || 0; if (bu > 0.01) { const g = ctx.createRadialGradient(x + w * 0.5, y + h * 0.28 + 160, 4, x + w * 0.5, y + h * 0.28 + 160, 180); g.addColorStop(0, rgba(M2.bundel, 0.5 * bu)); g.addColorStop(1, rgba(M2.bundel, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + w * 0.5, y + h * 0.28 + 160, 180, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
function bediening(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y + 150, 380, 30, 8); shape(ctx, '#6B5440', null); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 20, y + 180, 20, 90); ctx.fillRect(x + 340, y + 180, 20, 90);
  for (let k = 0; k < 2; k++) { const sx = x + 20 + k * 190; roundRect(ctx, sx, y, 170, 120, 10); shape(ctx, '#121A26', '#5A6478', 4); ctx.fillStyle = '#5A6478'; ctx.fillRect(sx + 75, y + 120, 20, 30); }
  const cam = o.camera || 0; if (cam > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(x + 26, y + 6, 158, 108); ctx.clip(); ctx.globalAlpha *= cam; ctx.fillStyle = '#1E2A3E'; ctx.fillRect(x + 26, y + 6, 158, 108); tafelBoven(ctx, x + 105, y + 60, 150, o.t || 0, { laser: 1 }); ctx.restore(); text(ctx, '● REC', x + 150, y + 26, fTekst(14, 800), '#E05A4A', 'center'); }
  ctx.strokeStyle = '#7FC48F'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const xx = x + 220 + i * 5, yy = y + 70 - 26 * Math.exp(-Math.pow((i - 15) / 5, 2)) * (o.dosis || 0.6); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
function dosismeter(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -12, -70, 24, 36, 6); shape(ctx, '#9AA3B2', '#5A6478', 2); roundRect(ctx, -60, -40, 120, 150, 16); shape(ctx, '#E3E7EC', '#8FA0B5', 3); roundRect(ctx, -42, -20, 84, 60, 8); shape(ctx, '#2A3446', null); text(ctx, '0,12', 0, 20, fTekst(26, 800), '#7FC48F', 'center'); text(ctx, 'mSv', 0, 82, fTekst(22, 700), '#2A3446', 'center'); ctx.restore(); }

// ===== kaartje met icoon (tijd, afstand, afscherming) =====
function regelKaart(ctx, x, y, w, titel, sub, soort, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 120, 16); shape(ctx, rgba(C.fill, 0.7), C.teal, 2);
  const ix = x + 66, iy = y + 60; if (soort === 'tijd') klokje(ctx, ix, iy, 36, 0.25); else if (soort === 'afstand') { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ix - 40, iy); ctx.lineTo(ix + 40, iy); ctx.stroke(); pijl(ctx, ix - 10, iy, ix - 40, iy, C.goud, 1, 5, 14); pijl(ctx, ix + 10, iy, ix + 40, iy, C.goud, 1, 5, 14); } else { ctx.fillStyle = '#7C828C'; ctx.fillRect(ix - 14, iy - 40, 28, 80); ctx.strokeStyle = '#646A74'; ctx.lineWidth = 3; for (let k = -40; k < 40; k += 14) { ctx.beginPath(); ctx.moveTo(ix - 14, iy + k + 14); ctx.lineTo(ix + 14, iy + k); ctx.stroke(); } }
  regel(ctx, titel, x + 130, y + 54, 1, C.text, 34, 'left', 800); regel(ctx, sub, x + 130, y + 94, 1, C.text2, 24, 'left', 600); ctx.restore(); }

// ===== tuin: grond, groenten en bloemen =====
function tuin(ctx, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4A36'; ctx.fillRect(0, 860, W, 220); ctx.fillStyle = '#5A4232'; ctx.fillRect(820, 860, 1000, 26);
  for (let i = 0; i < 9; i++) { const px = 880 + i * 108, sw = Math.sin(t * 1.2 + i) * 4; ctx.strokeStyle = '#4F8F5A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, 862); ctx.quadraticCurveTo(px + sw, 790, px + sw * 1.5, 730 + (i % 3) * 20); ctx.stroke();
    for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + k * 22 + sw, 800 - (i % 2) * 14, 22, 9, k * 0.5, 0, 6.283); shape(ctx, '#5FA86E', null); }
    if (i % 3 === 1) circ(ctx, px + sw * 1.5, 724 + (i % 3) * 20, 18, '#D8573F', '#F08A70', 2); else if (i % 3 === 2) circ(ctx, px + sw * 1.5, 740, 14, '#E0B64A', '#F2D27A', 2); } ctx.restore(); }

// ===== wachtkamer: wand met bordje, stoelen =====
function wachtkamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22314D'; ctx.fillRect(0, 0, W, 880); ctx.fillStyle = '#2C3A56'; ctx.fillRect(0, 860, W, 220);
  roundRect(ctx, 760, 120, 400, 70, 10); shape(ctx, '#E3E7EC', null); text(ctx, 'Radiotherapie', 960, 167, fTekst(36, 800), '#2A3446', 'center');
  for (let i = 0; i < 3; i++) { const sx = 1180 + i * 120; roundRect(ctx, sx, 720, 100, 24, 6); shape(ctx, '#5B8CC9', null); roundRect(ctx, sx + 6, 620, 88, 100, 10); shape(ctx, '#4A7AB4', null); ctx.fillStyle = '#7A8294'; ctx.fillRect(sx + 10, 744, 10, 116); ctx.fillRect(sx + 80, 744, 10, 116); }
  ctx.restore(); }

// ===== hand in hand: twee handen over elkaar (tussen twee figuren) =====
function handInHand(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x - 8, y, 20, 16, 0.3, 0, 6.283); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.25), 2); ctx.beginPath(); ctx.ellipse(x + 8, y - 4, 18, 14, -0.3, 0, 6.283); shape(ctx, CAST.ria.huid, _donker(CAST.ria.huid, 0.25), 2); ctx.restore(); }

// ===== kleine opleidingskaart =====
function vakIcoon(ctx, x, y, soort, a = 1, t = 0, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 120, y - 110, 240, 220, 20); shape(ctx, rgba(hl > 0.5 ? C.teal : C.fill, hl > 0.5 ? 0.35 : 0.6), hl > 0.5 ? C.teal : C.line, 2);
  ctx.save(); ctx.translate(x, y - 24);
  if (soort === 'röntgen') { ctx.fillStyle = '#0A0C10'; ctx.fillRect(-60, -60, 120, 110); ctx.strokeStyle = '#E8E8E8'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, -48); ctx.lineTo(-10, 38); ctx.moveTo(10, -48); ctx.lineTo(14, 38); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -6); ctx.lineTo(22, -2); ctx.stroke(); }
  else if (soort === 'CT') { ctx.beginPath(); ctx.arc(0, -4, 56, 0, 6.283); shape(ctx, '#DDE3EA', '#9AA3B2', 3); ctx.beginPath(); ctx.arc(0, -4, 30, 0, 6.283); shape(ctx, '#1A2740', null); ctx.fillStyle = '#5A6478'; ctx.fillRect(-70, 4, 140, 12); }
  else if (soort === 'MRI') { roundRect(ctx, -62, -58, 124, 104, 30); shape(ctx, '#DDE3EA', '#9AA3B2', 3); ctx.beginPath(); ctx.ellipse(0, -6, 36, 36, 0, 0, 6.283); shape(ctx, '#1A2740', null); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(0, -6, 44 + k * 8 + 4 * Math.sin(t * 3 + k), -0.6, 0.6); ctx.stroke(); } }
  else if (soort === 'echo') { ctx.fillStyle = '#0A0C10'; ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(-62, 44); ctx.lineTo(62, 44); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.arc(0, -56, k * 22, 1.05, 2.09); ctx.stroke(); } }
  else { bundel(ctx, 0, -60, 0, 40, 60, 1, t); ctx.beginPath(); ctx.ellipse(0, 40, 40, 14, 0, 0, 6.283); shape(ctx, '#C98A8A', null); }
  ctx.restore(); text(ctx, soort, x, y + 88, fTekst(28, 700), C.text, 'center'); ctx.restore(); }

// ===== porties vergelijken: n blokjes met hoogte per dosis =====
function porties(ctx, x, y, n, dosis, col, a = 1, w = 1200, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w / 40, bh = dosis * 34;
  for (let k = 0; k < n; k++) { roundRect(ctx, x + k * bw, y - bh, bw - 6, bh, 4); shape(ctx, rgba(col, 0.75), col, 1.5); }
  if (hl > 0.01) { ctx.globalAlpha *= hl; roundRect(ctx, x - 14, y - bh - 14, n * bw + 16, bh + 28, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); }

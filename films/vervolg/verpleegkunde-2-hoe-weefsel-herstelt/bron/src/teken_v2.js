// Wat word jij? · Verpleegkunde en Fysiotherapie · Hoe weefsel herstelt — eigen tekeningen (20 okt 2026)

const WK = { opper: '#D9AC8C', opperD: '#C49274', basaal: '#B07A60', kernP: '#6E5A9E', leder: '#6B4652', vezel: '#A88088', bloed: '#B23A3A', bloedD: '#8A2A2A', ader: '#6A7FB0',
  korst: '#6B3A26', fibrine: '#EAD9A0', wbc: '#ECE8F4', bact: '#7FC48F', granu: '#B8707A', litteken: '#D2A6A6', pees: '#EDE3C8', kraak: '#CFE0E8', bot: '#E6D8B8', spier: '#B5524A' };

function ease01(u) { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); }

// ===== huid in doorsnede met een wond die herstelt =====
// st: bloed, korst, wbc, bact, rood, fib, vaat, epi, verbouw (alle 0..1)
function huidWond(ctx, x, y, w, h, t, st = {}) {
  const a = st.a == null ? 1 : st.a; if (a <= 0.01) return {}; const S = Object.assign({ bloed: 0, korst: 0, wbc: 0, bact: 0, rood: 0, fib: 0, vaat: 0, epi: 0, verbouw: 0, wond: 1 }, st);
  ctx.save(); ctx.globalAlpha *= a;
  const yE0 = y + 40, eT = h * 0.15, cx = x + w / 2, wr = w * 0.15, dW = h * 0.5, yW = yE0 + dW, yV = yE0 + h * 0.72;
  const wondPad = () => { ctx.beginPath(); ctx.moveTo(cx - wr, yE0 - 2); ctx.bezierCurveTo(cx - wr * 0.95, yE0 + dW * 0.75, cx - wr * 0.5, yW, cx, yW); ctx.bezierCurveTo(cx + wr * 0.5, yW, cx + wr * 0.95, yE0 + dW * 0.75, cx + wr, yE0 - 2); ctx.closePath(); };
  // weefselvlak met afgeronde onderhoeken
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yE0); ctx.lineTo(x + w, yE0); ctx.lineTo(x + w, y + h - 30); ctx.quadraticCurveTo(x + w, y + h, x + w - 30, y + h); ctx.lineTo(x + 30, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - 30); ctx.closePath(); ctx.clip();
  // lederhuid
  ctx.fillStyle = WK.leder; ctx.fillRect(x, yE0, w, h);
  ctx.strokeStyle = rgba(WK.vezel, 0.55); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const yy = yE0 + eT + 40 + i * (h - eT - 60) / 9; ctx.beginPath(); for (let k = 0; k <= 36; k++) { const xx = x + k * w / 36, py = yy + Math.sin(k * 0.8 + i * 1.9) * 7; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // diep bloedvat + haarvaatjes (lusjes vlak onder de opperhuid)
  ctx.strokeStyle = WK.bloed; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, yV); for (let k = 0; k <= 30; k++) ctx.lineTo(x + k * w / 30, yV + Math.sin(k * 0.6) * 6); ctx.stroke();
  const lussen = []; for (let xx = x + 50; xx < x + w - 30; xx += 92) lussen.push(xx);
  lussen.forEach((xx, i) => { if (Math.abs(xx - cx) < wr + 26) return; const top = yE0 + eT + 14;
    ctx.lineWidth = 5; ctx.strokeStyle = WK.bloed; ctx.beginPath(); ctx.moveTo(xx - 10, yV); ctx.bezierCurveTo(xx - 14, yV - 60, xx - 12, top + 30, xx - 10, top + 10); ctx.arc(xx, top + 10, 10, Math.PI, 0); ctx.strokeStyle = WK.bloed; ctx.stroke();
    ctx.strokeStyle = WK.ader; ctx.beginPath(); ctx.moveTo(xx + 10, top + 10); ctx.bezierCurveTo(xx + 12, top + 30, xx + 14, yV - 60, xx + 10, yV); ctx.stroke(); });
  // ontstekingsgloed rond de wond
  if (S.rood > 0.01) { const g = ctx.createRadialGradient(cx, yE0 + dW * 0.4, wr * 0.6, cx, yE0 + dW * 0.4, wr * 2.6); g.addColorStop(0, rgba('#E04A3A', 0.55 * S.rood)); g.addColorStop(1, rgba('#E04A3A', 0)); ctx.fillStyle = g; ctx.fillRect(x, yE0, w, h); }
  // opperhuid met cellen; onderste (basale) laag donkerder
  ctx.fillStyle = WK.opper; ctx.fillRect(x, yE0, w, eT);
  const cel = (xx, yy, rx, ry, col, kern = true) => { ctx.beginPath(); ctx.ellipse(xx, yy, rx, ry, 0, 0, 6.283); shape(ctx, col, rgba('#8A5A44', 0.6), 1.5); if (kern) circ(ctx, xx, yy, Math.min(rx, ry) * 0.42, rgba(WK.kernP, 0.8)); };
  const rijen = 3; for (let r = 0; r < rijen; r++) { const ry = eT / (rijen + 0.6) / 2, yy = yE0 + ry + 3 + r * ry * 2.05, rx = r === 0 ? ry * 2.2 : ry * 1.4;
    for (let xx = x + rx + (r % 2) * rx; xx < x + w; xx += rx * 2.05) { if (S.wond > 0.5 && Math.abs(xx - cx) < wr + rx * 0.4) continue; cel(xx, yy, rx, ry * 0.92, r === rijen - 1 ? WK.basaal : (r === 0 ? '#E6C2A6' : WK.opperD), r > 0); } }
  // de wond
  if (S.wond > 0.01) { ctx.save(); wondPad(); ctx.fillStyle = (S.bloed > 0.01 || S.fib > 0.01) ? '#5A1E24' : '#24161E'; ctx.fill(); ctx.clip();
    if (S.bloed > 0.01) { ctx.fillStyle = rgba(WK.bloed, 0.85 * S.bloed); ctx.fillRect(x, yE0 - 10, w, h);
      for (let i = 0; i < 26; i++) { const px = cx - wr + hash(i * 3) * wr * 2, py = yE0 + hash(i * 5 + 1) * dW; ctx.beginPath(); ctx.ellipse(px, py, 11, 8, hash(i) * 3, 0, 6.283); shape(ctx, rgba('#D04848', S.bloed), rgba('#7A1E1E', S.bloed), 1.5); }
      for (let i = 0; i < 14; i++) { const px = cx - wr + hash(i * 7 + 2) * wr * 2, py = yE0 + hash(i * 11 + 3) * dW; circ(ctx, px, py, 4.5, rgba('#E8C8D8', S.bloed)); }
      const fd = clamp(S.bloed * 1.4 - 0.3, 0, 1); ctx.strokeStyle = rgba(WK.fibrine, 0.9 * fd); ctx.lineWidth = 2.5;
      for (let i = 0; i < 18; i++) { const px = cx - wr + hash(i * 13 + 4) * wr * 2, py = yE0 + hash(i * 17 + 5) * dW, an = hash(i * 19) * 3.14, L = 70 + 50 * hash(i * 23); ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); } }
    if (S.fib > 0.01) { const lvl = yW - (dW + 20) * S.fib; ctx.fillStyle = WK.granu; ctx.fillRect(x, lvl, w, h); wondPad(); ctx.strokeStyle = WK.granu; ctx.lineWidth = 2 * wr * 0.75 * ease01(S.fib * 1.2); ctx.stroke();
      const orde = S.verbouw; ctx.strokeStyle = rgba('#F0D8D0', 0.85); ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let i = 0; i < 40; i++) { const px = cx - wr + hash(i * 29 + 1) * wr * 2, py = yE0 + 10 + hash(i * 31 + 2) * (dW - 10); if (py < lvl) continue; const an = (hash(i * 37) - 0.5) * 3.14 * (1 - orde), L = 26 + 18 * hash(i * 41) + 20 * orde; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
      for (let i = 0; i < 6; i++) { const px = cx - wr * 0.7 + hash(i * 43) * wr * 1.4, py = yE0 + dW * 0.3 + hash(i * 47) * dW * 0.6; if (py < lvl + 10) continue; ctx.beginPath(); ctx.ellipse(px, py, 26, 9, (hash(i * 53) - 0.5) * 2 * (1 - orde), 0, 6.283); shape(ctx, '#E8B0A0', '#A86A60', 1.5); circ(ctx, px, py, 5, WK.kernP); } }
    if (S.vaat > 0.01) { ctx.strokeStyle = WK.bloed; ctx.lineWidth = 5; [-0.55, -0.15, 0.25, 0.6].forEach((f, i) => { const bx = cx + f * wr, L = dW * 0.78 * clamp(S.vaat * 1.3 - i * 0.1, 0, 1); if (L < 4) return; ctx.beginPath(); ctx.moveTo(bx - 7, yW + 10); ctx.quadraticCurveTo(bx - 14, yW - L * 0.5, bx - 7, yW - L); ctx.arc(bx, yW - L, 7, Math.PI, 0); ctx.quadraticCurveTo(bx + 14, yW - L * 0.5, bx + 7, yW + 10); ctx.stroke(); }); }
    if (S.bact > 0.01) for (let i = 0; i < 9; i++) { const px = cx - wr * 0.7 + hash(i * 59) * wr * 1.4, py = yE0 + 20 + hash(i * 61) * dW * 0.45, an = hash(i * 67) * 3; ctx.save(); ctx.translate(px + Math.sin(t * 1.3 + i) * 3, py); ctx.rotate(an); roundRect(ctx, -12, -5, 24, 10, 5); shape(ctx, rgba(WK.bact, S.bact), rgba('#4A8A5A', S.bact), 1.5); ctx.restore(); }
    ctx.restore(); }
  // witte bloedcellen: uit de haarvaatjes naast de wond naar binnen
  if (S.wbc > 0.01) for (let i = 0; i < 6; i++) { const kant = i % 2 ? 1 : -1, sx = cx + kant * (wr + 70 + (i % 3) * 30), sy = yE0 + eT + 30 + (i % 3) * 30, tx = cx + kant * wr * (0.15 + 0.2 * (i % 3)), ty = yE0 + 40 + (i % 3) * dW * 0.22;
    const u = ease01(S.wbc * 1.4 - i * 0.07), wd = wander(i, t, 5, 0.6), px = lerp(sx, tx, u) + wd.x, py = lerp(sy, ty, u) + wd.y; ctx.save(); ctx.globalAlpha *= clamp(S.wbc * 3, 0, 1);
    circ(ctx, px, py, 20, WK.wbc, '#B8B0CC', 2); ctx.fillStyle = '#7A5AA8'; [[-6, -4], [5, -5], [0, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(px + dx, py + dy, 6, 5, 0, 0, 6.283); ctx.fill(); }); ctx.restore(); }
  // opperhuid schuift over de wond (tongen van links en rechts)
  if (S.epi > 0.01) { const L = wr * S.epi; [-1, 1].forEach(k => { const x0 = cx + k * wr, x1 = cx + k * (wr - L - 4); ctx.fillStyle = WK.opper; ctx.beginPath(); ctx.moveTo(x0, yE0 + 4); ctx.lineTo(x1, yE0 + 4); ctx.quadraticCurveTo(x1 - k * 10, yE0 + eT * 0.5, x1, yE0 + eT * 0.9); ctx.lineTo(x0, yE0 + eT); ctx.closePath(); ctx.fill();
      for (let xx = x0 - k * 12; k < 0 ? xx < x1 : xx > x1; xx -= k * 26) cel(xx, yE0 + eT * 0.62, 12, 10, WK.basaal, true); }); }
  ctx.restore();
  // korstje bovenop
  if (S.korst > 0.01) { ctx.save(); ctx.globalAlpha *= S.korst; ctx.beginPath(); ctx.moveTo(cx - wr * 1.08, yE0 + 6); for (let k = 0; k <= 14; k++) { const xx = cx - wr * 1.08 + k * wr * 2.16 / 14; ctx.lineTo(xx, yE0 - 14 - 8 * hash(k * 7)); } ctx.lineTo(cx + wr * 1.08, yE0 + 6); ctx.quadraticCurveTo(cx, yE0 + eT * 1.3, cx - wr * 1.08, yE0 + 6); shape(ctx, WK.korst, '#4A2618', 2);
    ctx.fillStyle = rgba('#3A1E14', 0.6); for (let i = 0; i < 16; i++) circ(ctx, cx - wr + hash(i * 71) * wr * 2, yE0 - 4 + hash(i * 73) * eT * 0.6, 3 + 2 * hash(i), rgba('#3A1E14', 0.6)); ctx.restore(); }
  // litteken: licht plekje, draden in één richting
  if (S.litteken > 0.01) { ctx.save(); ctx.globalAlpha *= S.litteken; ctx.beginPath(); ctx.ellipse(cx, yE0 + dW * 0.42, wr * 0.95, dW * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba(WK.litteken, 0.55); ctx.fill(); ctx.strokeStyle = rgba('#F4E4E0', 0.9); ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { const yy = yE0 + dW * 0.12 + i * dW * 0.09, ww = wr * 0.9 * Math.sqrt(1 - Math.pow((yy - yE0 - dW * 0.42) / (dW * 0.42), 2)); ctx.beginPath(); ctx.moveTo(cx - ww, yy); ctx.lineTo(cx + ww, yy); ctx.stroke(); } ctx.restore(); }
  // warmte boven de wond
  if (S.rood > 0.01) { ctx.save(); ctx.globalAlpha *= S.rood; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = -1; k <= 1; k++) { const bx = cx + k * 60, ph = (t * 0.8 + k * 0.3) % 1; ctx.globalAlpha = a * S.rood * (1 - ph); ctx.beginPath(); for (let j = 0; j <= 12; j++) { const yy = yE0 - 30 - j * 6 - ph * 30; ctx.lineTo(bx + Math.sin(j * 0.8 + t * 3) * 8, yy); } ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  return { cx, yE0, eT, wr, dW, yW };
}

// ===== tijdlijn met vier fasen (overlappend); act = index van de actieve fase (of -1), u = hoe ver ingevuld =====
const FASEN = [['stolling', 'minuten', WK.bloed], ['ontsteking', 'dagen', C.koraal], ['opbouw', 'weken', C.goud], ['verbouwen', 'maanden', C.teal]];
function faseLijn(ctx, x, y, w, a = 1, act = -1, n = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sw = w / 4;
  FASEN.forEach(([nm, tijd, col], i) => { if (i >= n) return; const x0 = x + i * sw - (i ? 18 : 0), ww = sw + (i ? 18 : 0) + (i < 3 ? 18 : 0), aan = act < 0 || act === i;
    roundRect(ctx, x0, y, ww, 46, 23); shape(ctx, rgba(col, aan ? 0.55 : 0.16), rgba(col, aan ? 1 : 0.45), aan ? 2.5 : 1.5);
    text(ctx, nm, x + i * sw + sw / 2, y + 33, fTekst(28, 700), aan ? C.text : C.text2, 'center'); metaText(ctx, tijd, x + i * sw + sw / 2, y + 84, aan ? C.grain : rgba(C.grain, 0.45), 'center', 20); });
  ctx.restore(); }

// ===== knie / hiel op een castfiguur (zelfde maten als persoon()) =====
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function knieWond(ctx, id, x, y, h, s = 1, a = 1, litteken = 0) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h), kx = M.been(s) + s * M.hh * 0.03, ky = M.kn + M.hh * 0.32; ctx.save(); ctx.globalAlpha *= a;
  if (litteken < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - litteken; ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * 0.17, M.hh * 0.14, 0, 0, 6.283); ctx.fillStyle = '#C0443A'; ctx.fill(); ctx.strokeStyle = '#E88070'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(kx - M.hh * 0.12, ky + i * 6 - 4); ctx.lineTo(kx + M.hh * 0.12, ky + i * 6 + 4); ctx.stroke(); } ctx.restore(); }
  if (litteken > 0.01) { ctx.save(); ctx.globalAlpha *= litteken; ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * 0.12, M.hh * 0.06, 0.2, 0, 6.283); ctx.fillStyle = '#F2D6CC'; ctx.fill(); ctx.restore(); }
  ctx.restore(); return { x: kx, y: ky }; }
function hielPunt(id, x, y, h, s = 1) { const M = lijfMaat(id, x, y, h); return { x: M.been(s) + s * M.hh * 0.05, y: y - M.hh * 0.4, hh: M.hh }; }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }

// krukken en loopschoen op Sam
function krukken(ctx, id, x, y, h, a = 1) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = M.hh * 0.11; ctx.lineCap = 'round';
  for (const s of [-1, 1]) { const tx = x + s * M.sw * 0.62, ty = M.schouderY + M.hh * 1.6, bx = x + s * M.sw * 0.85; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(bx, y - 4); ctx.stroke(); ctx.strokeStyle = '#5A6274'; ctx.beginPath(); ctx.moveTo(tx - s * 4, ty - 2); ctx.lineTo(tx + s * 26, ty + 6); ctx.stroke(); ctx.strokeStyle = '#9AA3B2'; } ctx.restore(); }
function loopschoen(ctx, id, x, y, h, s = 1, a = 1) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h), lx = M.been(s) + s * M.hh * 0.08 + M.hh * 0.06; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, lx - M.hh * 0.32, y - M.hh * 1.55, M.hh * 0.64, M.hh * 1.45, M.hh * 0.18); shape(ctx, '#3A3F4E', '#5A6274', 2);
  ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.ellipse(lx, y - M.hh * 0.14, M.hh * 0.52, M.hh * 0.2, 0, Math.PI, 0); ctx.lineTo(lx + M.hh * 0.52, y); ctx.lineTo(lx - M.hh * 0.52, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8A93A6'; for (let i = 0; i < 3; i++) ctx.fillRect(lx - M.hh * 0.34, y - M.hh * (1.35 - i * 0.4), M.hh * 0.68, M.hh * 0.08); ctx.restore(); }

// ===== onderbeen van opzij met kuitspier en achillespees (huid van Sam) =====
// o: scheur 0..1, schoen 0..1 (loopschoen met hakje: voet in spitsstand), tenen 0..1 (op de tenen staan), huid
function beenZij(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { scheur = 0, schoen = 0, tenen = 0, huid = '#7A5440', t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // vloer
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-160, 44); ctx.lineTo(240, 44); ctx.stroke();
  // draaien: schoen = voet in spitsstand op een hak, tenen = hiel omhoog (draaipunt bij de tenen)
  const teen = [150, 40]; const an = -tenen * 0.55; const rot = (px, py, ox, oy, aa) => [ox + (px - ox) * Math.cos(aa) - (py - oy) * Math.sin(aa), oy + (px - ox) * Math.sin(aa) + (py - oy) * Math.cos(aa)];
  const enkel = [0, -tenen * 74 - schoen * 40];
  const voetHoek = tenen * 0.52 + schoen * 0.38;
  ctx.save(); ctx.translate(enkel[0], enkel[1]);
  // been
  const bol = 1 + tenen * 0.18 + (schoen > 0 ? 0 : 0);
  ctx.beginPath(); ctx.moveTo(26, -340); ctx.lineTo(20, -6); ctx.lineTo(-26, -6); ctx.bezierCurveTo(-32, -80, -76 * bol, -150, -78 * bol, -230); ctx.bezierCurveTo(-80 * bol, -300, -50, -340, -36, -340); ctx.closePath(); shape(ctx, huid, null);
  // kuitspier (kijkje onder de huid)
  ctx.beginPath(); ctx.moveTo(-30, -330); ctx.bezierCurveTo(-70 * bol, -300, -72 * bol, -200, -34, -130); ctx.bezierCurveTo(-14, -170, -8, -280, -6, -320); ctx.closePath(); shape(ctx, rgba(WK.spier, 0.9), '#8A3A34', 2);
  ctx.strokeStyle = rgba('#E07A6A', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-20 - i * 8, -310 + i * 6); ctx.quadraticCurveTo(-50 * bol + i * 4, -220, -30 - i * 2, -150 + i * 4); ctx.stroke(); }
  ctx.restore();
  // voet (draait om de enkel)
  const hielL = rot(-32, 8, 0, 0, voetHoek);
  ctx.save(); ctx.translate(enkel[0], enkel[1]); ctx.rotate(voetHoek); ctx.beginPath(); ctx.moveTo(22, -14); ctx.bezierCurveTo(70, 0, 120, 14, 152, 22); ctx.quadraticCurveTo(160, 38, 146, 42); ctx.lineTo(-20, 42); ctx.bezierCurveTo(-46, 40, -50, 10, -30, -6); ctx.closePath(); shape(ctx, huid, null); ctx.restore();
  // achillespees: van de kuitspier naar de hiel
  const p0 = [enkel[0] - 32, enkel[1] - 132], p1 = [enkel[0] + hielL[0], enkel[1] + hielL[1]], mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
  const gat = scheur * 34 * (1 - 0.7 * schoen);
  ctx.strokeStyle = WK.pees; ctx.lineWidth = 15; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  else { const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(mid[0] - ux * gat / 2, mid[1] - uy * gat / 2); ctx.moveTo(mid[0] + ux * gat / 2, mid[1] + uy * gat / 2); ctx.lineTo(...p1); ctx.stroke();
    ctx.lineWidth = 3; for (const k of [-1, 1]) for (let j = -2; j <= 2; j++) { const bx = mid[0] + k * ux * gat / 2, by = mid[1] + k * uy * gat / 2; ctx.beginPath(); ctx.moveTo(bx + j * 3, by); ctx.lineTo(bx + j * 5 - k * ux * 12 * scheur, by - k * uy * 12 * scheur + j); ctx.stroke(); } }
  // loopschoen met hakje
  if (schoen > 0.01) { ctx.save(); ctx.globalAlpha *= schoen; ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.moveTo(-70, 44); ctx.lineTo(200, 44); ctx.lineTo(200, 18); ctx.lineTo(150, 14); ctx.lineTo(-60, -40); ctx.lineTo(-70, -40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(-66, 30); ctx.lineTo(60, 30); ctx.lineTo(-56, -30); ctx.lineTo(-66, -30); ctx.closePath(); ctx.globalAlpha *= 0.85; ctx.fill(); ctx.globalAlpha /= 0.85;
    ctx.strokeStyle = '#5A6274'; ctx.lineWidth = 6; roundRect(ctx, -70, -300, 120, 290, 30); ctx.stroke(); ctx.fillStyle = rgba('#3A3F4E', 0.25); ctx.fill();
    ctx.fillStyle = '#8A93A6'; for (let i = 0; i < 3; i++) ctx.fillRect(-72, -260 + i * 80, 124, 12); ctx.restore(); }
  ctx.restore(); return { pees: [x + mid[0] * s, y + mid[1] * s] }; }

// ===== eiwitdraden in een pees: orde 0 = kriskras, 1 = in de lengte; trek = pijlen aan de uiteinden =====
function vezelPaneel(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; const { orde = 0, trek = 0, rood = 0, dicht = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 24); shape(ctx, '#3E2E38', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 24); ctx.clip();
  ctx.lineCap = 'round'; const N = Math.round(46 * dicht);
  for (let i = 0; i < N; i++) { const px = x + 40 + hash(i * 7 + 1) * (w - 80), py = y + 30 + hash(i * 11 + 2) * (h - 60), r0 = (hash(i * 13) - 0.5) * 3.0, an = r0 * (1 - ease01(orde)), L = 50 + 30 * hash(i * 17) + 60 * ease01(orde);
    const ry = orde > 0.5 ? py : py; ctx.strokeStyle = rood > 0.01 && hash(i * 3) < 0.5 ? rgba('#E06A5A', 0.95) : rgba(WK.pees, 0.95); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, ry - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, ry + Math.sin(an) * L); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { const px = x + 80 + hash(i * 23) * (w - 160), py = y + 50 + hash(i * 29) * (h - 100); ctx.beginPath(); ctx.ellipse(px, py, 30, 9, (hash(i * 31) - 0.5) * 2.5 * (1 - orde), 0, 6.283); shape(ctx, '#D89A8A', '#A86A60', 1.5); circ(ctx, px, py, 5, WK.kernP); }
  ctx.restore();
  if (trek > 0.01) { const d = 10 * Math.sin(t * 3); pijl(ctx, x - 20, y + h / 2, x - 100 - d, y + h / 2, C.goud, trek, 7, 22); pijl(ctx, x + w + 20, y + h / 2, x + w + 100 + d, y + h / 2, C.goud, trek, 7, 22); }
  ctx.restore(); }

// ===== tegels: huid, pees, kraakbeen, hartspier =====
function tegel(ctx, x, y, w, h, soort, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); ctx.fillStyle = '#22314E'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 22); ctx.clip();
  if (soort === 'huid') { const yE = y + 40, eT = 70; ctx.fillStyle = WK.leder; ctx.fillRect(x, yE, w, h); ctx.fillStyle = WK.opper; ctx.fillRect(x, yE, w, eT);
    for (let r = 0; r < 2; r++) for (let xx = x + 22 + r * 18; xx < x + w; xx += 40) { ctx.beginPath(); ctx.ellipse(xx, yE + 14 + r * 20, 18, 9, 0, 0, 6.283); shape(ctx, r ? WK.opperD : '#E6C2A6', rgba('#8A5A44', 0.5), 1.2); }
    const yb = yE + eT - 14, deel = o.deel || 0;
    for (let xx = x + 20, i = 0; xx < x + w; xx += 34, i++) { const ph = deel > 0.01 ? ((t * 0.35 + i * 0.27) % 1) : 0, actief = deel > 0.01 && i % 3 === 1; circ(ctx, xx, yb, 14, WK.basaal, rgba('#8A5A44', 0.7), 1.5);
      if (actief) { const u = ease01(ph * 1.6), dy = -u * 22; ctx.save(); ctx.globalAlpha *= deel; circ(ctx, xx, yb, 14, rgba(C.goud, 0.35 * (1 - u))); circ(ctx, xx + 2, yb + dy, 12, '#C98A6A', '#8A5A44', 1.5); circ(ctx, xx + 2, yb + dy, 5, WK.kernP); ctx.restore(); }
      circ(ctx, xx, yb, 6, WK.kernP); }
    const vaat = o.vaat || 0; ctx.lineWidth = 6; for (let xx = x + 40; xx < x + w; xx += 62) { ctx.strokeStyle = WK.bloed; ctx.beginPath(); ctx.moveTo(xx - 9, y + h); ctx.bezierCurveTo(xx - 12, y + h - 80, xx - 10, yE + eT + 30, xx - 9, yE + eT + 12); ctx.arc(xx, yE + eT + 12, 9, Math.PI, 0); ctx.stroke(); ctx.strokeStyle = WK.ader; ctx.beginPath(); ctx.moveTo(xx + 9, yE + eT + 12); ctx.bezierCurveTo(xx + 10, yE + eT + 30, xx + 12, y + h - 80, xx + 9, y + h); ctx.stroke();
      if (vaat > 0.01) for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3 + xx * 0.01) % 1; circ(ctx, xx - 10, y + h - ph * (h - 130), 4, rgba('#F08A80', vaat)); } } }
  if (soort === 'pees') { ctx.fillStyle = '#4A3640'; ctx.fillRect(x, y, w, h); ctx.lineCap = 'round';
    for (let i = 0; i < 13; i++) { const yy = y + 30 + i * (h - 60) / 12; ctx.strokeStyle = rgba(WK.pees, 0.9); ctx.lineWidth = 9; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x + k * w / 20; ctx.lineTo(xx, yy + Math.sin(k * 1.4 + i) * 3); } ctx.stroke(); }
    [[0.3, 0.27], [0.7, 0.6], [0.45, 0.8]].forEach(([fx, fy]) => { const px = x + fx * w, py = y + fy * h; ctx.beginPath(); ctx.ellipse(px, py, 28, 6, 0, 0, 6.283); shape(ctx, '#7A5A68', null); });
    ctx.strokeStyle = WK.bloed; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + w * 0.85, y); ctx.quadraticCurveTo(x + w * 0.8, y + h * 0.2, x + w * 0.88, y + h * 0.32); ctx.stroke(); }
  if (soort === 'kraakbeen') { ctx.fillStyle = WK.bot; ctx.fillRect(x, y + h * 0.58, w, h); ctx.strokeStyle = rgba('#B8A27A', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const px = x + hash(i * 3) * w, py = y + h * 0.65 + hash(i * 5) * h * 0.3; ctx.beginPath(); ctx.ellipse(px, py, 18, 11, hash(i) * 3, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = WK.kraak; ctx.beginPath(); ctx.moveTo(x, y + h * 0.6); ctx.lineTo(x, y + h * 0.2); ctx.quadraticCurveTo(x + w / 2, y + h * 0.05, x + w, y + h * 0.2); ctx.lineTo(x + w, y + h * 0.6); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 16; i++) { const px = x + 30 + hash(i * 7 + 2) * (w - 60), py = y + h * 0.26 + hash(i * 9 + 1) * h * 0.28; circ(ctx, px, py, 12, '#E8F0F4', '#A8BCC8', 1.5); circ(ctx, px, py, 6, '#7A8CB8'); }
    if (o.scheur > 0.01) { ctx.save(); ctx.globalAlpha *= o.scheur; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.4, y + h * 0.12); ctx.lineTo(x + w * 0.48, y + h * 0.24); ctx.lineTo(x + w * 0.42, y + h * 0.33); ctx.lineTo(x + w * 0.52, y + h * 0.45); ctx.stroke(); ctx.restore(); } }
  if (soort === 'hart') { ctx.fillStyle = '#4A2228'; ctx.fillRect(x, y, w, h); const inf = o.infarct || 0, ix = x + w * 0.62, iy = y + h * 0.5, irx = w * 0.25, iry = h * 0.26;
    const inI = (px, py) => inf > 0.5 && Math.pow((px - ix) / irx, 2) + Math.pow((py - iy) / iry, 2) < 1;
    const rows = 7, rh = (h - 40) / rows, cl = w / 3.2;
    const cel = (x0, y0, x1, y1) => { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, sc = inI(mx, my); ctx.strokeStyle = sc ? '#D8D0C8' : WK.spier; ctx.lineWidth = rh * 0.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      if (!sc) { ctx.strokeStyle = rgba('#7A2A28', 0.6); ctx.lineWidth = 1.5; const L = Math.hypot(x1 - x0, y1 - y0), n = Math.floor(L / 10); for (let k = 1; k < n; k++) { const u = k / n, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u; ctx.beginPath(); ctx.moveTo(px, py - rh * 0.2); ctx.lineTo(px, py + rh * 0.2); ctx.stroke(); } circ(ctx, mx, my, rh * 0.11, rgba(WK.kernP, 0.9)); } };
    const schijf = (px, py) => { if (inI(px, py)) return; ctx.strokeStyle = '#2A0E12'; ctx.lineWidth = 5; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(px, py - rh * 0.26); ctx.lineTo(px + 3, py - rh * 0.08); ctx.lineTo(px - 3, py + rh * 0.08); ctx.lineTo(px, py + rh * 0.26); ctx.stroke(); };
    for (let r = 0; r < rows; r++) { const yy = y + 20 + rh * (r + 0.5), off = (r % 2) * cl * 0.5; for (let k = -1; k < 4; k++) { const x0 = x + off + k * cl + 8, x1 = x0 + cl - 16; cel(x0, yy, x1, yy);
        if ((k + r) % 2 === 0 && r < rows - 1) cel(x0 + cl * 0.45, yy, x0 + cl * 0.75, yy + rh); // vertakking naar de volgende rij
        schijf(x1 + 8, yy); } }
    if (inf > 0.01) { ctx.save(); ctx.globalAlpha *= inf; ctx.beginPath(); ctx.ellipse(ix, iy, irx, iry, 0, 0, 6.283); ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } }
  ctx.restore(); ctx.restore(); }

// pictogrammen: druppel bloed, delende cel
function druppel(ctx, x, y, r, col = WK.bloed, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.5); ctx.bezierCurveTo(x + r * 0.4, y - r * 0.8, x + r, y - r * 0.2, x + r, y + r * 0.2); ctx.arc(x, y + r * 0.2, r, 0, Math.PI); ctx.bezierCurveTo(x - r, y - r * 0.2, x - r * 0.4, y - r * 0.8, x, y - r * 1.5); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function delendeCel(ctx, x, y, r, a = 1, t = 0, anim = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const u = anim ? 0.5 + 0.5 * Math.sin(t * 2) : 0.6, d = r * 0.55 * u;
  ctx.beginPath(); ctx.ellipse(x - d, y, r, r * 0.9, 0, 0, 6.283); ctx.ellipse(x + d, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C98A6A', '#8A5A44', 2); circ(ctx, x - d, y, r * 0.38, WK.kernP); circ(ctx, x + d, y, r * 0.38, WK.kernP); ctx.restore(); }
// status-rij onder een tegel: 'ja' / 'nee' / 'weinig'
function statusRij(ctx, x, y, icoon, woord, st, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (icoon === 'bloed') druppel(ctx, x + 18, y - 8, 14); else delendeCel(ctx, x + 18, y - 8, 13, 1, t, 0);
  text(ctx, woord, x + 50, y + 2, fTekst(28, 600), C.text, 'left'); const sx = x + 220;
  if (st === 'ja') vink_(ctx, sx + 20, y - 10, 18, 1); else if (st === 'nee') kruis(ctx, sx + 20, y - 10, 15, 1); else text(ctx, 'weinig', sx, y + 2, fTekst(26, 700), C.oker, 'left'); ctx.restore(); }

// ===== drukplek: bot boven, matras onder, haarvaatje ertussen =====
function drukZoom(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; const { druk = 0, rood = 0, donker = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 24); shape(ctx, '#22314E', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 24); ctx.clip();
  const yb = y + h * 0.36 + druk * 10, ym = y + h * 0.74 - druk * 10;
  // bot (hielbeen)
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, yb - 30); ctx.quadraticCurveTo(x + w / 2, yb + 30, x, yb - 30); ctx.closePath(); shape(ctx, WK.bot, '#B8A27A', 2);
  ctx.strokeStyle = rgba('#B8A27A', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.ellipse(x + hash(i * 3) * w, y + 20 + hash(i * 5) * (yb - y - 60), 18, 10, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  // weefsel tussen bot en matras
  const base = '#C99A88', kl = donker > 0.01 ? '#4A2A3A' : '#D8503E'; ctx.fillStyle = base; ctx.beginPath(); ctx.moveTo(x, yb - 30); ctx.quadraticCurveTo(x + w / 2, yb + 30, x + w, yb - 30); ctx.lineTo(x + w, ym); ctx.lineTo(x, ym); ctx.closePath(); ctx.fill();
  if (rood > 0.01) { ctx.save(); ctx.clip(); const g = ctx.createRadialGradient(x + w / 2, (yb + ym) / 2, 10, x + w / 2, (yb + ym) / 2, w * 0.45); g.addColorStop(0, rgba('#D8503E', 0.85 * rood * (1 - donker))); g.addColorStop(1, rgba('#D8503E', 0)); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    if (donker > 0.01) { const g2 = ctx.createRadialGradient(x + w / 2, (yb + ym) / 2, 10, x + w / 2, (yb + ym) / 2, w * 0.4); g2.addColorStop(0, rgba('#3A1E2E', 0.95 * donker)); g2.addColorStop(1, rgba('#3A1E2E', 0)); ctx.fillStyle = g2; ctx.fillRect(x, y, w, h); } ctx.restore(); }
  // haarvaatje: wordt platgedrukt in het midden
  const yc = (yb + 8 + ym) / 2, dik = k => { const m = Math.exp(-Math.pow((k - 0.5) / 0.18, 2)); return 22 * (1 - druk * 0.85 * m); };
  ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; ctx.lineTo(x + u * w, yc - dik(u)); } for (let k = 40; k >= 0; k--) { const u = k / 40; ctx.lineTo(x + u * w, yc + dik(u)); } ctx.closePath(); shape(ctx, '#7A2A2A', WK.bloed, 3);
  for (let i = 0; i < 9; i++) { let u = (t * 0.25 * (1 - druk) + i / 9) % 1; if (druk > 0.6) u = Math.min(u, 0.32 - (i % 3) * 0.06) + (i > 5 ? 0.38 + i * 0.02 : 0); const r = Math.min(13, dik(u) - 4); if (r < 3) continue; ctx.beginPath(); ctx.ellipse(x + u * w, yc, r * 1.2, r * 0.8, 0, 0, 6.283); ctx.fillStyle = '#E06060'; ctx.fill(); }
  // matras
  ctx.fillStyle = '#AFC6DA'; ctx.fillRect(x, ym, w, h); ctx.strokeStyle = '#8AA6C0'; ctx.lineWidth = 2; for (let xx = x + 30; xx < x + w; xx += 60) { ctx.beginPath(); ctx.moveTo(xx, ym + 16); ctx.lineTo(xx, y + h); ctx.stroke(); }
  ctx.restore();
  if (druk > 0.01) { pijl(ctx, x + w / 2, y + 30, x + w / 2, yb - 20, C.goud, druk, 7, 22); pijl(ctx, x + w / 2, y + h - 18, x + w / 2, ym + 22, C.goud, druk, 7, 22); }
  ctx.restore(); return { yb, ym, yc }; }

// ===== ziekenhuisbed met Opa Henk (rechtop tegen de opgezette rugleuning, deken over de benen, voeten vrij) =====
// x = midden van het bed, y = bovenkant matras. o: kussen (onder de kuiten), matras (drukverdelend), drukH, drukS (gloed hiel / stuitje), donker, draai (pijl)
function henkBed(ctx, x, y, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const { kussen = 0, matras = 0, drukH = 0, drukS = 0, donker = 0, draai = 0, uit = 'neutraal', H = 420 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = 420, hipX = x - L + 150; const M = lijfMaat('henk', 0, 0, H);
  // frame
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x - L - 20, y + 60, 2 * L + 40, 18); ctx.fillRect(x - L, y + 78, 14, 100); ctx.fillRect(x + L - 14, y + 78, 14, 100);
  circ(ctx, x - L + 7, y + 186, 14, '#4A5266'); circ(ctx, x + L - 7, y + 186, 14, '#4A5266');
  roundRect(ctx, x - L - 34, y - 210, 22, 300, 8); shape(ctx, '#8A93A6', null); roundRect(ctx, x + L + 12, y - 80, 22, 170, 8); shape(ctx, '#8A93A6', null);
  const mCol = matras > 0.5 ? '#9CCBD6' : '#DDE6EE';
  roundRect(ctx, x - L, y, 2 * L, 60, 14); shape(ctx, mCol, '#B8C8D8', 2);
  // rugleuning omhoog
  ctx.save(); ctx.translate(x - L + 14, y + 40); ctx.rotate(-1.38); roundRect(ctx, 0, -46, 340, 56, 14); shape(ctx, mCol, '#B8C8D8', 2);
  if (matras > 0.01) { ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = 30; xx < 320; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, -40); ctx.lineTo(xx, 4); ctx.stroke(); } } ctx.restore();
  if (matras > 0.01) { ctx.save(); ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = x - L + 40; xx < x + L - 10; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, y + 8 + 3 * Math.sin(t * 2 + xx)); ctx.lineTo(xx, y + 54); ctx.stroke(); } ctx.restore(); }
  // hoofdkussen tegen de leuning
  // Henk tot de heup, licht achterover
  ctx.save(); ctx.beginPath(); ctx.rect(x - L - 200, y - H - 100, 2 * L + 400, H + 100 + 20); ctx.clip(); ctx.translate(hipX, y + 14); ctx.rotate(-0.12 + (draai > 0.01 ? 0.04 * Math.sin(t * 2) : 0));
  roundRect(ctx, -M.hh * 1.25, -M.heupY + M.top - M.hh * 0.25, M.hh * 1.5, (M.schouderY - M.top) + M.hh * 1.1, M.hh * 0.5); shape(ctx, '#F2F2EE', '#C8D2DC', 2);
  persoon(ctx, 'henk', 0, -M.heupY, H, { t, uit, kijk: 1 }); ctx.restore();
  // deken: van de borst over de benen naar de voeten
  const lift = kussen * 36, vx = x + L - 60, borst = y + 14 + M.heupY + (M.schouderY - M.heupY) * 0.32 - M.heupY * 0;
  const by = y + 14 + (M.schouderY + (M.heupY - M.schouderY) * 0.55) - M.heupY; // deken-rand op de borst
  ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6);
  ctx.bezierCurveTo(hipX + M.sw * 0.9, y - 40, hipX + 200, y - 72, hipX + 300, y - 70 - lift * 0.5); ctx.bezierCurveTo(hipX + 420, y - 70 - lift, vx - 80, y - 64 - lift, vx - 24, y - 50 - lift); ctx.lineTo(vx - 24, y + 30); ctx.lineTo(hipX - M.sw * 0.62, y + 30); ctx.closePath();
  shape(ctx, '#7FA6C9', '#5A86AE', 2); ctx.strokeStyle = rgba('#5A86AE', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const xx = hipX + 140 + i * 100; ctx.beginPath(); ctx.moveTo(xx, y - 60 - (i > 1 ? lift * 0.7 : 0)); ctx.quadraticCurveTo(xx + 26, y - 20, xx + 8, y + 20); ctx.stroke(); }
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6); ctx.lineTo(hipX + M.sw * 0.62, by + 26); ctx.quadraticCurveTo(hipX, by + 4, hipX - M.sw * 0.62, by + 30); ctx.closePath(); ctx.fill();
  if (kussen > 0.01) { ctx.save(); ctx.globalAlpha *= kussen; roundRect(ctx, vx - 150, y - 34, 170, 44, 20); shape(ctx, '#E8E2D4', '#C8BEA8', 2); ctx.restore(); }
  // blote voet (zijaanzicht): hiel op de matras of vrij boven het kussen, tenen omhoog
  const fy = y - lift; ctx.save(); ctx.translate(vx, fy); ctx.beginPath(); ctx.moveTo(-26, -54); ctx.lineTo(-4, -54); ctx.bezierCurveTo(20, -62, 40, -92, 52, -106); ctx.quadraticCurveTo(64, -108, 60, -92); ctx.bezierCurveTo(50, -56, 30, -8, 6, 0); ctx.bezierCurveTo(-16, 4, -30, -10, -30, -28); ctx.closePath(); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2); ctx.restore();
  const hiel = { x: vx - 12, y: fy - 4 }, stuit = { x: hipX + 10, y: y + 12 };
  const gloed = (p, f) => { if (f <= 0.01) return; const r = 64; const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, r); const col = donker > 0.5 ? '#5A1E3A' : '#E04A3A'; g.addColorStop(0, rgba(col, 0.95 * f)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); };
  gloed(hiel, drukH); gloed(stuit, drukS);
  ctx.restore(); return { hiel, stuit, hip: { x: hipX, y }, voet: { x: vx, y: fy }, hoofdY: y + 14 - M.heupY + M.top }; }

// ===== grafiek belasting tegen weken (geleidelijk opbouwen) =====
function belastGrafiek(ctx, x, y, w, h, u = 1, a = 1, o = {}) { if (a <= 0.01) return; const { half = 0, jaar = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  metaText(ctx, 'belasting', x, y - 18, C.text2, 'left', 22); metaText(ctx, 'weken', x + w, y + h + 74, C.text2, 'right', 22);
  [0, 13, 26, 39, 52].forEach(wk => { const xx = x + wk / 52 * w; text(ctx, String(wk), xx, y + h + 34, fTekst(22, 600), C.text2, 'center'); });
  const f = wk => wk < 2 ? 0.12 + wk * 0.04 : wk < 6 ? 0.2 + (wk - 2) * 0.06 : 0.44 + (1 - Math.exp(-(wk - 6) / 16)) * 0.56; const n = Math.round(104 * clamp(u, 0, 1));
  ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k <= n; k++) { const wk = k / 2, xx = x + wk / 52 * w, step = Math.floor(wk) / 52 * w; const yy = y + h - f(Math.floor(wk)) * h * 0.9; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  // te veel, te snel: stippellijn die er boven uitschiet
  if (o.tesnel > 0.01) { ctx.save(); ctx.globalAlpha *= o.tesnel; ctx.strokeStyle = C.koraal; ctx.setLineDash([12, 10]); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y + h - 0.12 * h * 0.9); ctx.lineTo(x + 6 / 52 * w, y + h * 0.08); ctx.stroke(); ctx.setLineDash([]); flits(ctx, x + 6 / 52 * w, y + h * 0.08, 40, 1, C.koraal); ctx.restore(); }
  if (half > 0.01) { const xx = x + 26 / 52 * w; ctx.save(); ctx.globalAlpha *= half; ctx.strokeStyle = C.teal; ctx.setLineDash([8, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke(); ctx.restore(); naamBij(ctx, 'weer sporten', '± half jaar', xx - 14, y + 40, half, 'right'); }
  if (jaar > 0.01) { const xx = x + w; naamBij(ctx, 'oude niveau', 'vaak ± 1 jaar', xx - 10, y + h * 0.45, jaar, 'right'); }
  ctx.restore(); }

// sigaret, glucosemeter, voet met wondje
function sigaret(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -80, -10, 120, 20, 6); shape(ctx, '#F2F2EE', null); roundRect(ctx, 40, -10, 40, 20, 6); shape(ctx, '#E0A43A', null); circ(ctx, -82, 0, 9, '#E07A5F');
  ctx.strokeStyle = rgba('#C8CED6', 0.6); ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 14; j++) ctx.lineTo(-90 + Math.sin(j * 0.7 + t * 2) * 10, -10 - j * 7); ctx.stroke(); ctx.restore(); }
function vatDoorsnede(ctx, x, y, r, knijp = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ri = r * (0.72 - 0.42 * knijp); circ(ctx, x, y, r, '#C9707A', '#E8A0A8', 3); circ(ctx, x, y, ri, '#7A2A2A'); for (let i = 0; i < 3; i++) { const an = i * 2.1; circ(ctx, x + Math.cos(an) * ri * 0.45, y + Math.sin(an) * ri * 0.45, ri * 0.3, '#E06060'); } ctx.restore(); }
function suikerRing(ctx, x, y, r, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 - Math.PI / 6; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(col, 0.25), col, 4); ctx.restore(); }
function voetZool(ctx, x, y, s, a = 1, wond = 1, huid = '#E3B998') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 110); ctx.bezierCurveTo(-70, 40, -60, -60, -30, -100); ctx.bezierCurveTo(0, -130, 50, -110, 55, -60); ctx.bezierCurveTo(60, 0, 40, 60, 40, 110); ctx.bezierCurveTo(30, 140, -40, 140, -50, 110); shape(ctx, huid, _donker(huid, 0.2), 2);
  [[-30, -118, 14], [-2, -126, 11], [20, -122, 10], [38, -112, 9], [50, -96, 8]].forEach(([dx, dy, r]) => circ(ctx, dx, dy, r, huid, _donker(huid, 0.2), 2));
  if (wond > 0.01) { ctx.globalAlpha *= wond; ctx.beginPath(); ctx.ellipse(-8, -40, 18, 13, 0.3, 0, 6.283); ctx.fillStyle = '#B23A3A'; ctx.fill(); ctx.strokeStyle = '#E88070'; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }

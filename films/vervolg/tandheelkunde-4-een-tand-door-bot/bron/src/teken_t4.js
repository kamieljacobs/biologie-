// Wat word jij? · Tandheelkunde 4 · Een tand door bot — eigen tekeningen (v1.0, 21 okt 2026).
// Zelfde look en kleuren als de kies-doorsnede van t2 (Van glazuur tot zenuw): glazuur licht en glanzend, tandbeen geel met kanaaltjes,
// pulpa roze met bloedvaatje en zenuw, sponsachtig kaakbot, roze tandvlees. Hier: een hoektand met één wortel, wortelvlies als veren,
// botafbrekers en botopbouwers, beugel, retentiedraad, schedels.

const TK = { tb: '#EBDCA6', tbR: '#B9A56E', buis: '#B9A06A', pul: '#E89AA8', pulR: '#C77A88', vat: '#C0392B', zenuw: '#F2D06A', vlies: '#F0C4BE', vez: '#B86A72',
  bot: '#D9C9B4', botR: '#B8A68E', botV: '#BFAC92', nieuw: '#F1E8D4', osteoid: '#F7F0DF', tv: '#E58C96', tvR: '#C96A76', clast: '#A88BD0', clastR: '#7D62A8',
  blast: '#6FB8A8', blastR: '#4E9484', cyt: '#8A7458', glz1: '#FBFDFF', glz2: '#DCE6EE', glzR: '#A9B8C6', staal: '#D5DAE0', staalR: '#8A939E' };

function _poly(ctx, P) { ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); }
// veer (zigzag) van punt 1 naar punt 2: n windingen; kort = dicht op elkaar, lang = uitgerekt
function veer(ctx, x1, y1, x2, y2, n = 5, amp = 7) { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; ctx.beginPath(); ctx.moveTo(x1, y1);
  for (let i = 1; i < 2 * n; i++) { const u = i / (2 * n), sg = i % 2 ? 1 : -1; ctx.lineTo(x1 + dx * u + nx * amp * sg, y1 + dy * u + ny * amp * sg); } ctx.lineTo(x2, y2); ctx.stroke(); }

// ================= hoektand in kaakbot (doorsnede) =================
// Lokale maat (s = 1): kroonpunt y = -345, hals y = -60, botkam y = -20, wortelpunt y = +380; (0,0) = midden van de tand bij de hals.
const TB = { hals: -60, kam: -20, punt: 380, top: -345, rw: 95, w0: 24, L: -430, R: 430, B: 480 };
function _hw(y) { const u = clamp((y - TB.hals) / (TB.punt - TB.hals), 0, 1); return TB.rw * (1 - 0.7 * u) * Math.sqrt(Math.max(0, 1 - Math.pow(u, 6))); }
function _cw(y) { const v = clamp((TB.hals - y) / (TB.hals - TB.top), 0, 1); const b = TB.rw + 26 * Math.sin(Math.min(v / 0.4, 1) * Math.PI / 2); return v < 0.4 ? b : b * Math.pow(Math.max(0, 1 - (v - 0.4) / 0.6), 0.72); }
function _tw(y) { return y >= TB.hals ? _hw(y) : _cw(y); }
function _pw(y) { if (y < -238) return 0; if (y < TB.hals) return 30 * Math.sqrt(clamp((y + 238) / 140, 0, 1)); const u = clamp((y - TB.hals) / (TB.punt - 16 - TB.hals), 0, 1); return Math.max(3, 30 * (1 - 0.84 * u)); }
function _tandPunten(k = 0, alleenKroon = false) { const L = [], R = []; const y0 = alleenKroon ? TB.hals : TB.punt;
  for (let yy = y0; yy >= TB.top - 1; yy -= 5) { const w = Math.max(0, _tw(yy) - (typeof k === 'function' ? k(yy) : k)); L.push([-w, yy]); R.push([w, yy]); }
  return L.concat(R.reverse()); }
function _pulpaPunten() { const L = [], R = []; for (let yy = TB.punt - 16; yy >= -240; yy -= 5) { const w = _pw(yy); L.push([-w, yy]); R.push([w, yy]); } return L.concat(R.reverse()); }

// de tand zelf (glazuur, tandbeen met kanaaltjes, pulpa met bloedvaatje en zenuw), in lokale maat rond (0,0)
function _hoektand(ctx, o = {}) { const { pulpa = TK.pul, zenuw = TK.zenuw } = o; const P = _tandPunten(0);
  _poly(ctx, P); shape(ctx, TK.tb, TK.tbR, 2.5);
  ctx.save(); _poly(ctx, P); ctx.clip(); ctx.strokeStyle = rgba(TK.buis, 0.55); ctx.lineWidth = 1.3;
  for (let yy = -220; yy < TB.punt - 40; yy += 14) { const p = _pw(yy) + 3, w = _tw(yy) - 3; if (w - p < 14) continue; const kr = yy < TB.hals;
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * p, yy); ctx.quadraticCurveTo(sd * (p + w) / 2, yy - (kr ? 18 : 8), sd * w, yy - (kr ? 34 : 14)); ctx.stroke(); } }
  ctx.restore();
  // glazuur: ring tussen buitenkant en grens met tandbeen, dun bij de hals
  const kE = (yy) => 3 + 30 * clamp((TB.hals - yy) / (TB.hals - TB.top), 0, 1); const Ko = _tandPunten(0, true), Ki = _tandPunten(kE, true);
  ctx.beginPath(); Ko.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); Ki.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath();
  const g = ctx.createLinearGradient(-150, TB.top, 150, TB.hals); g.addColorStop(0, TK.glz1); g.addColorStop(1, TK.glz2); ctx.fillStyle = g; ctx.fill('evenodd');
  ctx.beginPath(); Ki.forEach(([px, py], i) => { if (py >= TB.hals - 1) return; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.strokeStyle = rgba(TK.tbR, 0.8); ctx.lineWidth = 2; ctx.stroke();
  _poly(ctx, Ko); ctx.strokeStyle = TK.glzR; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.85); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-88, -150); ctx.quadraticCurveTo(-82, -230, -40, -282); ctx.stroke();
  // pulpa met bloedvat (rood) en zenuw (geel), tot in de wortelpunt en erdoor naar buiten
  const Pp = _pulpaPunten(); _poly(ctx, Pp); shape(ctx, pulpa, TK.pulR, 2);
  ctx.save(); _poly(ctx, Pp); ctx.clip(); ctx.lineCap = 'round';
  for (const [dx, col, lw] of [[-7, TK.vat, 6], [7, zenuw, 5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(dx * 0.6, -215); ctx.bezierCurveTo(dx, -120, dx * 0.9, 150, dx * 0.3, TB.punt); ctx.stroke(); }
  ctx.restore();
  ctx.lineCap = 'round'; for (const [dx, col, lw] of [[-5, TK.vat, 6], [5, zenuw, 5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(dx * 0.4, TB.punt - 14); ctx.quadraticCurveTo(dx * 1.5, TB.punt + 30, dx * 4, TB.punt + 70); ctx.stroke(); } }

function _botcel(ctx, bx, by, r, t, i) { ctx.save(); ctx.translate(bx, by); ctx.rotate(hash(i * 13) * 3); ctx.strokeStyle = rgba(TK.cyt, 0.7); ctx.lineWidth = 1.4;
  for (let k = 0; k < 5; k++) { const an = k * 1.26 + hash(i + k); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * r * 2.4, Math.sin(an) * r * 2.4); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.3, r * 0.75, 0, 0, 6.283); shape(ctx, TK.cyt, null); ctx.restore(); }
// botafbreker: grote cel met meerdere kernen en een rafelige rand aan de botkant (kant = +1: bot rechts)
function botafbreker(ctx, bx, by, s, t = 0, kant = 1, i = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(bx, by); ctx.scale(s, s); const w = 1 + 0.05 * Math.sin(t * 3 + i);
  ctx.beginPath(); ctx.ellipse(0, 0, 17 * w, 33 / w, 0, 0, 6.283); shape(ctx, TK.clast, TK.clastR, 2);
  ctx.strokeStyle = TK.clastR; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = -26 + k * 6.5; ctx.lineTo(kant * (15 + (k % 2 ? 6 : 0)), yy); } ctx.stroke();
  for (const [nx, ny] of [[-4, -16], [2, 0], [-3, 15]]) circ(ctx, nx, ny, 5, '#4E3A72'); ctx.restore(); }
// botopbouwer: klein blokvormig celletje met een kern
function botopbouwer(ctx, bx, by, s, t = 0, i = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(bx, by); ctx.scale(s, s); const p = 1 + 0.04 * Math.sin(t * 4 + i * 1.7);
  roundRect(ctx, -8 * p, -12 * p, 16 * p, 24 * p, 5); shape(ctx, TK.blast, TK.blastR, 1.8); circ(ctx, 0, 1, 4, '#2E6A5E'); ctx.restore(); }

// o: sh = plek van het tandbed (bot verbouwd), p = 0..1 tand in het bed naar rechts geduwd, dy = tand veert in,
//    eat = putjes aan de drukkant, clast/blast = cellen, dep = nieuw laagje aan de trekkant, dicht = vaatjes dicht, grijs = afgestorven stukje,
//    achter = botafbrekers van achteren, cellen = botcellen in het bot, beugel/kracht/hard = blokje, draad en duw, oud = sh van de oude plek (spookomtrek),
//    elast = vezels in het tandvlees als elastiekjes, trekGloed = vezels aan de trekkant oplichten, drukGloed = idem drukkant
function tandBot(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { t = 0, sh = 0, p = 0, dy = 0, eat = 0, dep = 0, clast = 0, blast = 0, dicht = 0, grijs = 0, achter = 0, cellen = 0, beugel = 0, kracht = 0, hard = 0, oud = null, oudA = 0, elast = 0, trekGloed = 0, drukGloed = 0, vaat = 1, kruimels = 0, veren = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const w0 = TB.w0, PITS = [95, 195, 295], tx = sh + p * w0 * 0.82;
  const pit = (yy) => { let m = 0; for (const c of PITS) m = Math.max(m, 1 - Math.pow((yy - c) / 44, 2)); return eat * 26 * m; };
  const xr = (yy) => sh + _hw(yy) + w0 + pit(yy), xl = (yy) => sh - _hw(yy) - w0, xl0 = (yy) => -_hw(yy) - w0;
  const ys = []; for (let yy = TB.kam; yy <= TB.punt; yy += 6) ys.push(yy);
  const kom = []; ys.forEach(yy => kom.push([xl(yy), yy])); const xa = xl(TB.punt), xb = xr(TB.punt), cx0 = (xa + xb) / 2, rx = (xb - xa) / 2, ry = w0 + 8;
  for (let k = 1; k < 12; k++) { const an = Math.PI - k * Math.PI / 12; kom.push([cx0 + Math.cos(an) * rx, TB.punt + Math.sin(an) * ry]); }
  for (let i = ys.length - 1; i >= 0; i--) kom.push([xr(ys[i]), ys[i]]);
  // wortelvlies (spleet)
  _poly(ctx, kom); shape(ctx, TK.vlies, null);
  // kaakbot, sponsachtig
  const bot = [[TB.L, TB.kam + 36]].concat(kom, [[TB.R, TB.kam + 36], [TB.R, TB.B], [TB.L, TB.B]]);
  _poly(ctx, bot); shape(ctx, TK.bot, TK.botR, 2);
  ctx.save(); _poly(ctx, bot); ctx.clip();
  for (let i = 0; i < 95; i++) { const bx = TB.L + 10 + hash(i * 3 + 7) * (TB.R - TB.L - 20), by = TB.kam + 50 + hash(i * 5 + 3) * (TB.B - TB.kam - 50); ctx.beginPath(); ctx.ellipse(bx, by, 7 + hash(i) * 15, 5 + hash(i * 2) * 9, hash(i * 4) * 3, 0, 6.283); shape(ctx, TK.botV, rgba('#A8957C', 0.6), 1); }
  // nieuw bot aan de trekkant (waar het tandbed vandaan is geschoven): lichter, in laagjes
  if (sh > 1) { const N = ys.map(yy => [Math.min(xl0(yy), xl(yy)), yy]), M = ys.map(yy => [xl(yy), yy]).reverse(); _poly(ctx, N.concat(M)); ctx.fillStyle = TK.nieuw; ctx.fill();
    ctx.save(); _poly(ctx, N.concat(M)); ctx.clip(); ctx.strokeStyle = rgba(TK.botR, 0.75); ctx.lineWidth = 1.6; for (let d = 12; d < sh + 6; d += 12) { ctx.beginPath(); ys.forEach((yy, i) => { const px = xl(yy) - d; i ? ctx.lineTo(px, yy) : ctx.moveTo(px, yy); }); ctx.stroke(); } ctx.restore(); }
  // botcellen in het bot
  if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; for (let i = 0; i < 16; i++) { const bx = TB.L + 30 + hash(i * 17 + 5) * (TB.R - TB.L - 60), by = TB.kam + 80 + hash(i * 23 + 1) * (TB.B - TB.kam - 110); if (bx > xl0(Math.min(by, TB.punt)) - 30 && bx < xr(Math.min(by, TB.punt)) + 30 && by < TB.punt + 60) continue; _botcel(ctx, bx, by, 5, t, i); } ctx.restore(); }
  // botafbrekers van achteren (bij een afgestorven stukje): holtes in het bot
  if (achter > 0.01) { for (const [yy, i] of [[140, 0], [215, 1]]) { const bx = xr(yy) + 70 - 34 * achter; ctx.beginPath(); ctx.ellipse(bx, yy, 26 + 16 * achter, 34, 0, 0, 6.283); shape(ctx, rgba(TK.vlies, Math.min(1, achter * 1.5)), null); botafbreker(ctx, bx + 6, yy, 0.9, t, 1, i + 5, Math.min(1, achter * 2)); } }
  ctx.restore();
  // osteoid: vers laagje langs de wand aan de trekkant
  if (dep > 0.01) { const N = ys.map(yy => [xl(yy), yy]), M = ys.map(yy => [xl(yy) + 9 * dep, yy]).reverse(); _poly(ctx, N.concat(M)); ctx.fillStyle = TK.osteoid; ctx.fill(); }
  // afgestorven stukje wortelvlies aan de drukkant (grijs)
  const rootR = (yy) => tx + _hw(yy - dy), rootL = (yy) => tx - _hw(yy - dy);
  if (grijs > 0.01) { const Y = []; for (let yy = 95; yy <= 240; yy += 6) Y.push(yy); _poly(ctx, Y.map(yy => [rootR(yy) - 2, yy]).concat(Y.slice().reverse().map(yy => [xr(yy) + 22, yy]))); ctx.fillStyle = rgba('#8E8C88', grijs); ctx.fill(); ctx.strokeStyle = rgba('#5E5C58', grijs); ctx.lineWidth = 2; ctx.stroke(); }
  // vezels van het wortelvlies als veertjes, schuin van de wortel omhoog naar het bot
  if (veren > 0) { ctx.lineCap = 'round'; for (let yy = 20; yy <= 345; yy += 36) { if (grijs > 0.5 && yy > 90 && yy < 245) continue;
      for (const sd of [-1, 1]) { const x1 = sd < 0 ? rootL(yy) : rootR(yy), x2 = sd < 0 ? xl(yy - 10) : xr(yy - 10) - pit(yy - 10) * 0.9, L = Math.abs(x2 - x1); const gl = sd < 0 ? trekGloed : drukGloed;
        ctx.strokeStyle = gl > 0.01 ? _mixHex(TK.vez, sd < 0 ? '#E0B64A' : '#E07A5F', gl * 0.9) : TK.vez; ctx.lineWidth = 2.2 + gl * 1.2; veer(ctx, x1, yy, x2, yy - 10, 4, 6 * clamp(26 / Math.max(L, 1), 0.35, 1.2)); } } }
  // bloedvaatjes in de spleet
  if (vaat > 0.01) for (const yy of [140, 262]) for (const sd of [-1, 1]) { const x1 = sd < 0 ? rootL(yy) : rootR(yy), x2 = sd < 0 ? xl(yy) : xr(yy) - pit(yy); const gap = Math.abs(x2 - x1); let rw = Math.min(9, gap * 0.36), col = TK.vat;
    if (sd > 0 && dicht > 0.01) { rw *= 1 - 0.85 * dicht; col = _mixHex('#C0392B', '#5A2A30', dicht); } if (sd > 0 && grijs > 0.5 && yy < 245) continue; if (rw < 0.6) continue; ctx.beginPath(); ctx.ellipse((x1 + x2) / 2, yy + 14, rw, 13, 0, 0, 6.283); shape(ctx, col, rgba('#7A1E1E', 0.6), 1); }
  // botafbrekers in de putjes aan de drukkant, kruimels bot
  if (clast > 0.01) PITS.forEach((yy, i) => { const bx = sh + _hw(yy) + w0 + pit(yy) * 0.45 + 2; botafbreker(ctx, bx, yy, 0.85 + 0.25 * eat, t, 1, i, clast);
    if (kruimels > 0.01) for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4 + i * 0.3) % 1; circ(ctx, bx + 18 - u * 26, yy - 20 + k * 13, 3, rgba('#C9B79E', kruimels * clast * (1 - u))); } });
  // botopbouwers langs de wand aan de trekkant
  if (blast > 0.01) for (let yy = 30, i = 0; yy <= 340; yy += 30, i++) botopbouwer(ctx, xl(yy) + 9 * dep + 9, yy, 0.85, t, i, blast * clamp((blast * 12 - i) , 0, 1));
  // de tand
  ctx.save(); ctx.translate(tx, dy); _hoektand(ctx, o); ctx.restore();
  if (oud != null && oudA > 0.01) { ctx.save(); ctx.globalAlpha *= oudA; ctx.translate(oud, 0); _poly(ctx, _tandPunten(0)); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  // tandvlees over de botkam
  for (const sd of [-1, 1]) { const ex = sd * (TB.rw + 3); ctx.beginPath(); ctx.moveTo(sd > 0 ? TB.R : TB.L, TB.kam + 6); ctx.quadraticCurveTo(tx + sd * 230, TB.kam - 40, tx + ex + sd * 14, -96); ctx.quadraticCurveTo(tx + ex, -88, tx + sd * (_hw(TB.kam) + 2), TB.kam + 4);
    ctx.quadraticCurveTo(tx + sd * 200, TB.kam + 34, sd > 0 ? TB.R : TB.L, TB.kam + 52); ctx.closePath(); shape(ctx, TK.tv, TK.tvR, 2); }
  // vezels in het tandvlees als gespannen elastiekjes (trekken de tand terug naar links)
  if (elast > 0.01) { ctx.save(); ctx.globalAlpha *= elast; ctx.lineCap = 'round'; [[-250, -50], [-330, -30], [-400, -12]].forEach(([ex, ey], i) => { const sx = tx - TB.rw - 4, sy = -76 + i * 12; const tr = 1 + 0.03 * Math.sin(t * 5 + i);
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + (ex - sx) * tr, ey); ctx.stroke(); circ(ctx, ex, ey, 7, '#F2F2EE', C.koraal, 2.5); circ(ctx, sx, sy, 6, '#F2F2EE', C.koraal, 2.5); }); ctx.restore(); }
  // beugel: blokje op de kroon met de draad, en de duw
  if (beugel > 0.01) { ctx.save(); ctx.globalAlpha *= beugel; const by = -195, bx = tx - _cw(by) - 8; ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(TB.L + 20, by); ctx.lineTo(bx, by); ctx.stroke();
    roundRect(ctx, bx - 12, by - 28, 26, 56, 6); shape(ctx, TK.staal, TK.staalR, 2.5); ctx.strokeStyle = TK.staalR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 12, by); ctx.lineTo(bx + 14, by); ctx.stroke(); ctx.restore(); }
  if (kracht > 0.01) { const by = -280, bx = tx - _cw(by) - 30; const col = hard > 0.5 ? C.koraal : C.goud; pijl(ctx, bx - 190 - 40 * hard, by, bx, by, col, kracht, 8 + 12 * hard, 26 + 14 * hard); }
  ctx.restore(); }
// schermpunt in tandBot voor namen
function tbPunt(x, y, s, o, wat) { const sh = o.sh || 0, tx = sh + (o.p || 0) * TB.w0 * 0.82;
  const P = { kroon: [tx, -200], wortel: [tx, 160], drukkant: [sh + _hw(195) + TB.w0, 195], trekkant: [sh - _hw(195) - TB.w0, 195], botR: [330, 380], botL: [-330, 380], tandvlees: [-330, -10], punt: [tx, TB.punt] }[wat] || [0, 0];
  return { x: x + P[0] * s, y: y + P[1] * s }; }

// ================= ingezoomd: wortel · wortelvlies · bot =================
function vliesVeer(ctx, cx, cy, r, o = {}) { const { t = 0, druk = 0, cellen = 1 } = o; const g = 120, xw = cx - g / 2 - 40 + druk * 0, xb = cx + g / 2 - 40;
  ctx.fillStyle = TK.tb; ctx.fillRect(cx - r, cy - r, xw - (cx - r), 2 * r); ctx.fillStyle = '#F2EDE0'; ctx.fillRect(xw - 14, cy - r, 14, 2 * r);
  ctx.strokeStyle = rgba(TK.buis, 0.5); ctx.lineWidth = 1.5; for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(cx - r, cy + k * 40 + 10); ctx.lineTo(xw - 14, cy + k * 40); ctx.stroke(); }
  ctx.fillStyle = TK.vlies; ctx.fillRect(xw, cy - r, xb - xw, 2 * r);
  ctx.fillStyle = TK.bot; ctx.fillRect(xb, cy - r, cx + r - xb, 2 * r); for (let i = 0; i < 26; i++) { const bx = xb + 20 + hash(i * 3) * (cx + r - xb - 20), by = cy - r + hash(i * 5) * 2 * r; ctx.beginPath(); ctx.ellipse(bx, by, 9 + hash(i) * 14, 7 + hash(i * 2) * 9, hash(i * 4) * 3, 0, 6.283); shape(ctx, TK.botV, null); }
  if (cellen) for (let i = 0; i < 4; i++) _botcel(ctx, xb + 50 + hash(i * 7) * 120, cy - r * 0.7 + i * r * 0.45, 7, t, i);
  ctx.beginPath(); ctx.ellipse((xw + xb) / 2, cy + 60, 14, 22, 0, 0, 6.283); shape(ctx, TK.vat, rgba('#7A1E1E', 0.6), 1.5);
  const zak = 12 * druk; ctx.strokeStyle = TK.vez; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = -4; k <= 4; k++) { if (k === 1) continue; const yy = cy + k * 48; veer(ctx, xw, yy + 14 + zak, xb, yy - 14, 5, 9 * (1 - 0.3 * druk)); } }

// ================= los bot dat verbouwd wordt (H1) =================
function botWeefsel(ctx, x, y, w, h, o = {}) { const { t = 0, af = 0, op = 0, cellen = 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 24); ctx.save(); ctx.clip(); ctx.fillStyle = '#F3D3CC'; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  const y0 = y - h * 0.05, pA = x - w * 0.24, pB = x + w * 0.22, dA = 70 * af, dB = 70 * (1 - op);
  const opp = (px) => y0 + Math.max(0, dA * (1 - Math.pow((px - pA) / 95, 2))) + Math.max(0, dB * (1 - Math.pow((px - pB) / 95, 2)));
  ctx.beginPath(); ctx.moveTo(x - w / 2, y + h / 2); for (let px = x - w / 2; px <= x + w / 2; px += 6) ctx.lineTo(px, opp(px)); ctx.lineTo(x + w / 2, y + h / 2); ctx.closePath(); shape(ctx, TK.bot, TK.botR, 2.5);
  ctx.save(); ctx.clip(); for (let i = 0; i < 40; i++) { const bx = x - w / 2 + hash(i * 3 + 1) * w, by = y0 + 30 + hash(i * 7 + 2) * h * 0.5; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 14, 6 + hash(i * 2) * 8, hash(i) * 3, 0, 6.283); shape(ctx, TK.botV, null); }
    // nieuwe laagjes in de put rechts
    ctx.strokeStyle = rgba(TK.botR, 0.9); ctx.lineWidth = 2; for (let k = 1; k <= 4; k++) { if (op * 4 < k - 0.2) break; const d = 70 * (1 - k / 4.4); ctx.beginPath(); for (let px = pB - 95; px <= pB + 95; px += 6) { const yy = y0 + Math.max(0, d * (1 - Math.pow((px - pB) / 95, 2))); px === pB - 95 ? ctx.moveTo(px, yy) : ctx.lineTo(px, yy); } ctx.stroke(); }
    if (cellen) for (let i = 0; i < 6; i++) _botcel(ctx, x - w / 2 + 60 + i * (w - 120) / 5 + hash(i) * 30, y0 + 130 + hash(i * 3) * 80, 7, t, i);
  ctx.restore(); ctx.restore();
  // cellen op het oppervlak
  ctx.save(); ctx.translate(pA, opp(pA) - 22); ctx.rotate(Math.PI / 2); botafbreker(ctx, 0, 0, 1.6, t, 1, 0, 1); ctx.restore();
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; circ(ctx, pA + (hash(k) - 0.5) * 70, opp(pA) - 50 - u * 60, 4, rgba('#C9B79E', af * (1 - u))); }
  for (let i = -3; i <= 3; i++) { const px = pB + i * 26; botopbouwer(ctx, px, opp(px) - 14, 1.2, t, i, 1); }
  ctx.restore(); }
// dijbeen (rest van het skelet): dik = dikker door belasting
function dijbeen(ctx, x, y, s, o = {}) { const { dik = 0, a = 1, t = 0, cellen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const w = 34 + 14 * dik;
  ctx.beginPath(); ctx.moveTo(-w, -200); ctx.quadraticCurveTo(-w - 6, 0, -w, 210); ctx.quadraticCurveTo(-90, 250, -70, 290); ctx.quadraticCurveTo(-40, 320, 0, 300); ctx.quadraticCurveTo(40, 320, 75, 290); ctx.quadraticCurveTo(95, 250, w, 210);
  ctx.quadraticCurveTo(w + 6, 0, w, -200); ctx.quadraticCurveTo(w + 40, -230, 70, -260); ctx.lineTo(30, -250); ctx.quadraticCurveTo(-20, -255, -50, -280); ctx.lineTo(-70, -265); ctx.quadraticCurveTo(-w - 10, -235, -w, -200); ctx.closePath(); shape(ctx, '#E8E2D2', '#B8B0A0', 3);
  circ(ctx, -72, -290, 42, '#E8E2D2', '#B8B0A0', 3);
  if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; for (let i = 0; i < 7; i++) { const yy = -170 + i * 55, xx = (hash(i * 3) - 0.5) * w; circ(ctx, xx, yy, 6 + 2 * Math.sin(t * 4 + i), C.teal); } ctx.restore(); }
  ctx.restore(); }
// rondje pijlen (verbouwen gaat altijd door)
function rondPijl(ctx, x, y, r, a = 1, t = 0, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; const o = t * 0.6;
  for (const st of [0, Math.PI]) { ctx.beginPath(); ctx.arc(x, y, r, st + o, st + o + 2.4); ctx.stroke(); const an = st + o + 2.4, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r, tg = an + Math.PI / 2;
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px + Math.cos(tg) * 18, py + Math.sin(tg) * 18); ctx.lineTo(px + Math.cos(tg + 2.5) * 16, py + Math.sin(tg + 2.5) * 16); ctx.lineTo(px + Math.cos(tg - 2.5) * 16, py + Math.sin(tg - 2.5) * 16); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// spijker in hout (misvatting)
function spijkerHout(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -10, 300, 120, 10); shape(ctx, '#B98A55', '#8A6236', 2.5); ctx.strokeStyle = rgba('#8A6236', 0.7); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-140, 15 + k * 25); ctx.bezierCurveTo(-60, 5 + k * 25, 40, 30 + k * 25, 140, 12 + k * 25); ctx.stroke(); }
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-6, -90, 12, 160); roundRect(ctx, -34, -104, 68, 16, 5); shape(ctx, '#B8C0CA', '#7A838E', 2); ctx.restore(); }

// ================= gebit van voren (close-up) met beugel =================
const GV = { up: [[96, 126], [78, 112], [74, 122], [62, 100], [54, 92]], lo: [[56, 84], [58, 86], [62, 94], [58, 86], [52, 82]] };
function _voortand(ctx, w, h, punt, boven = true) { ctx.beginPath(); ctx.moveTo(-w * 0.40, -6); ctx.bezierCurveTo(-w * 0.53, h * 0.25, -w * 0.53, h * 0.7, -w * 0.46, h * 0.88);
  if (punt) { ctx.quadraticCurveTo(-w * 0.3, h * 0.96, 0, h + 8); ctx.quadraticCurveTo(w * 0.3, h * 0.96, w * 0.46, h * 0.88); } else { ctx.quadraticCurveTo(-w * 0.45, h, -w * 0.3, h); ctx.lineTo(w * 0.3, h); ctx.quadraticCurveTo(w * 0.45, h, w * 0.46, h * 0.88); }
  ctx.bezierCurveTo(w * 0.53, h * 0.7, w * 0.53, h * 0.25, w * 0.40, -6); ctx.closePath(); const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#EDE3C8'); g.addColorStop(0.35, '#F8F5EC'); g.addColorStop(1, '#FCFBF6'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#B9B0A0'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w * 0.22, h * 0.25); ctx.lineTo(-w * 0.24, h * 0.6); ctx.stroke(); }
function _blokje(ctx, bx, by, r, kleur) { roundRect(ctx, bx - r, by - r, 2 * r, 2 * r, r * 0.3); shape(ctx, TK.staal, TK.staalR, 2); ctx.strokeStyle = kleur; ctx.lineWidth = r * 0.32; roundRect(ctx, bx - r * 0.78, by - r * 0.78, r * 1.56, r * 1.56, r * 0.5); ctx.stroke(); ctx.strokeStyle = TK.staalR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - r, by); ctx.lineTo(bx + r, by); ctx.stroke(); }
function _draadDoor(ctx, P) { if (P.length < 2) return; P.sort((p1, p2) => p1[0] - p2[0]); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0] - 40, P[0][1] + 8);
  ctx.lineTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) { const mx = (P[i - 1][0] + P[i][0]) / 2, my = (P[i - 1][1] + P[i][1]) / 2; ctx.quadraticCurveTo(P[i - 1][0], P[i - 1][1], mx, my); } ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]); ctx.lineTo(P[P.length - 1][0] + 40, P[P.length - 1][1] + 8); ctx.stroke(); }
// o: beugel 0..1, scheef 0..1 (hoektand rechts staat te hoog en gedraaid), plak 0..1, wit 0..1 (witte plekjes), kring 0..1 (ring om de hoektand), rager 0..1
function gebitVoor(ctx, x, y, s, o = {}) { const { t = 0, beugel = 1, scheef = 0, plak = 0, wit = 0, kleur = C.teal, a = 1, kring = 0, rager_ = 0, schuif = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -560, -300, 1120, 600, 40); shape(ctx, '#D9A982', '#B8875F', 3); ctx.save(); roundRect(ctx, -560, -300, 1120, 600, 40); ctx.clip();
  const mond = () => { ctx.beginPath(); ctx.moveTo(-470, -40); ctx.bezierCurveTo(-300, -205, 300, -205, 470, -40); ctx.bezierCurveTo(300, 215, -300, 215, -470, -40); ctx.closePath(); };
  mond(); ctx.fillStyle = '#3A1E24'; ctx.fill(); ctx.save(); mond(); ctx.clip();
  ctx.beginPath(); ctx.ellipse(0, 170, 300, 80, 0, 0, 6.283); ctx.fillStyle = '#A84A55'; ctx.fill();
  const BU = [], BL = []; let hoek = null;
  // onderste rij
  ctx.fillStyle = TK.tv; ctx.fillRect(-520, 96, 1040, 160);
  for (const sd of [-1, 1]) { let cx = 0; GV.lo.forEach(([w, h], i) => { const c = sd * (cx + w / 2 + 2); cx += w + 3; const eY = -10 + i * 5; ctx.save(); ctx.translate(c, eY + h); ctx.scale(1, -1); _voortand(ctx, w, h, i === 2); ctx.restore(); BL.push([c, eY + h * 0.42]); }); }
  // bovenste rij
  ctx.fillStyle = TK.tv; ctx.beginPath(); ctx.moveTo(-520, -260); ctx.lineTo(520, -260); ctx.lineTo(520, -96); ctx.quadraticCurveTo(0, -128, -520, -96); ctx.closePath(); ctx.fill();
  const lijst = []; for (const sd of [-1, 1]) { let cx = 0; GV.up.forEach(([w, h], i) => { const c = sd * (cx + w / 2 + 2); cx += w + 3; lijst.push([sd, i, c, w, h]); }); }
  lijst.sort((p1, p2) => p2[1] - p1[1]); const sch = scheef;
  const tekenUp = ([sd, i, c, w, h]) => { const eY = 8 - i * 6; const isH = sd > 0 && i === 2; const dx = isH ? 10 * sch : 0, dyy = isH ? -46 * sch : 0, rot = isH ? 0.2 * sch : 0;
    ctx.save(); ctx.translate(c + dx, eY - h + dyy); ctx.rotate(rot); _voortand(ctx, w * (isH ? 1 + 0.05 * sch : 1), h, i === 2); ctx.restore();
    const bp = [c + dx + Math.sin(rot) * h * 0.55, eY - h * 0.45 + dyy]; BU.push(bp); if (isH) hoek = bp; };
  lijst.filter(L => !(L[0] > 0 && L[1] === 2)).forEach(tekenUp); lijst.filter(L => L[0] > 0 && L[1] === 2).forEach(tekenUp);
  // witte plekjes waar de blokjes zaten
  if (wit > 0.01) BU.forEach(([bx, by], i) => { ctx.beginPath(); ctx.ellipse(bx + (hash(i) - 0.5) * 6, by + 4, 22 + hash(i * 3) * 6, 26, 0.2 * (hash(i * 5) - 0.5), 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.95 * wit); ctx.fill(); ctx.strokeStyle = rgba('#C8CED6', wit); ctx.lineWidth = 2; ctx.stroke(); });
  // plak rond de blokjes
  if (plak > 0.01) BU.concat(BL).forEach(([bx, by], i) => { for (let k = 0; k < 5; k++) { const an = hash(i * 11 + k) * 6.283, rr = 20 + hash(i * 7 + k) * 8; circ(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr * 1.1, 6 + hash(i + k * 3) * 6, rgba('#E2CF7A', 0.85 * plak)); } });
  if (beugel > 0.01) { ctx.save(); ctx.globalAlpha *= beugel; _draadDoor(ctx, BL.map(p => p.slice())); BL.forEach(([bx, by]) => _blokje(ctx, bx, by, 12, kleur)); _draadDoor(ctx, BU.map(p => p.slice())); BU.forEach(([bx, by]) => _blokje(ctx, bx, by, 15, kleur)); ctx.restore(); }
  if (rager_ > 0.01) { const bx = BU[1] ? BU[1][0] : 0; rager(ctx, -150 + 14 * Math.sin(t * 9), -20, 0.9, rager_); }
  if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= schuif; [[-1, 0], [-1, 2], [1, 1], [1, 3]].forEach(([sd, i], k) => { const L = lijst.find(q2 => q2[0] === sd && q2[1] === i); if (!L) return; const xx = L[2], d = 8 * Math.sin(t * 2 + k); pijl(ctx, xx - 18 + d, -150, xx + 18 + d, -150, C.goud, 1, 4, 12); }); ctx.restore(); }
  ctx.restore();
  ctx.lineJoin = 'round'; mond(); ctx.strokeStyle = '#C46F66'; ctx.lineWidth = 46; ctx.stroke(); mond(); ctx.strokeStyle = rgba('#8E4440', 0.8); ctx.lineWidth = 3; ctx.stroke();
  if (kring > 0.01 && hoek) { ctx.save(); ctx.globalAlpha *= kring; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(hoek[0], hoek[1] - 8, 64, 92, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore(); return hoek ? { x: x + hoek[0] * s, y: y + hoek[1] * s } : { x, y }; }

// ================= tandboog van bovenaf (binnenkant zichtbaar) =================
function gebitBoven(ctx, x, y, s, o = {}) { const { t = 0, draad = 0, terug = 0, a = 1, schuif = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -440, -330, 880, 640, 40); shape(ctx, '#B65C66', '#8E4450', 3); ctx.save(); roundRect(ctx, -440, -330, 880, 640, 40); ctx.clip();
  const A = 300, B = 330, CY = 110, pt = (th) => [A * Math.sin(th), CY - B * Math.cos(th)], nrm = (th) => { const nx = Math.sin(th) / A, ny = -Math.cos(th) / B, L = Math.hypot(nx, ny); return [nx / L, ny / L]; };
  ctx.strokeStyle = TK.tv; ctx.lineWidth = 150; ctx.lineCap = 'round'; ctx.beginPath(); for (let th = -1.55; th <= 1.55; th += 0.02) { const [px, py] = pt(th); th === -1.55 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  const W = [50, 56, 62, 62, 64, 94, 88], D = [44, 48, 64, 70, 74, 90, 86];
  const thAt = (len) => { let th = 0, L = 0; while (L < len && th < 1.6) { const [x1, y1] = pt(th), [x2, y2] = pt(th + 0.004); L += Math.hypot(x2 - x1, y2 - y1); th += 0.004; } return th; };
  const pos = []; let cum = 2; W.forEach((w, i) => { pos.push(thAt(cum + w / 2)); cum += w + 4; });
  const lingual = [];
  for (const sd of [-1, 1]) W.forEach((w, i) => { const th = sd * pos[i]; let [px, py] = pt(th); const [nx, ny] = nrm(th); let ang = Math.atan2(B * Math.sin(th), A * Math.cos(th)); const isH = sd > 0 && i === 2;
    if (isH && terug > 0.01) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.setLineDash([8, 7]); ctx.strokeStyle = rgba(C.goud, terug); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, w / 2, D[i] / 2, 0, 0, 6.283); ctx.stroke(); ctx.restore(); px += nx * 34 * terug; py += ny * 34 * terug; ang += 0.4 * terug; }
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang); const d = D[i];
    if (i < 2) roundRect(ctx, -w / 2, -d / 2, w, d, d * 0.42); else if (i < 5) { ctx.beginPath(); ctx.ellipse(0, 0, w / 2, d / 2, 0, 0, 6.283); } else roundRect(ctx, -w / 2, -d / 2, w, d, 22);
    const g = ctx.createRadialGradient(-w * 0.15, -d * 0.15, 4, 0, 0, Math.max(w, d) * 0.7); g.addColorStop(0, '#FCFBF6'); g.addColorStop(1, '#E6DECB'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#B9B0A0'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = rgba('#B9B0A0', 0.8); ctx.lineWidth = 2; if (i < 2) { ctx.beginPath(); ctx.moveTo(-w * 0.35, -d * 0.1); ctx.lineTo(w * 0.35, -d * 0.1); ctx.stroke(); } else if (i >= 3) { ctx.beginPath(); ctx.moveTo(-w * 0.3, 0); ctx.lineTo(w * 0.3, 0); if (i >= 5) { ctx.moveTo(0, -d * 0.3); ctx.lineTo(0, d * 0.3); } ctx.stroke(); }
    ctx.restore(); if (i <= 2) lingual.push([sd, i, px - nx * (d / 2 + 4), py - ny * (d / 2 + 4)]); });
  if (draad > 0.01) { ctx.save(); ctx.globalAlpha *= draad; const P = lingual.sort((p1, p2) => (p1[0] * (p1[1] + 0.5)) - (p2[0] * (p2[1] + 0.5))); const n = Math.max(2, Math.ceil(P.length * clamp(draad * 1.2, 0, 1)));
    ctx.strokeStyle = '#5E6672'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); P.slice(0, n).forEach(([, , px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.stroke();
    P.slice(0, n).forEach(([, , px, py]) => { ctx.beginPath(); ctx.ellipse(px, py, 13, 11, 0, 0, 6.283); shape(ctx, '#E8DCB8', '#8A7A50', 2); }); ctx.restore(); }
  if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= schuif; [3, 4, 5].forEach((i, k) => { for (const sd of [-1, 1]) { const [px, py] = pt(sd * pos[i]); const d = 6 * Math.sin(t * 2 + k + sd); pijl(ctx, px + sd * 60, py + 10 + d, px + sd * 60, py - 26 + d, C.goud, 1, 4, 12); } }); ctx.restore(); }
  ctx.restore(); text(ctx, 'voorkant', 0, -290, fMeta(22), rgba('#F2F2EE', 0.8), 'center'); ctx.restore();
  return { x: x + pt(pos[2])[0] * s, y: y + pt(pos[2])[1] * s }; }

// kalender: blaadje met een getal
function kalender(ctx, x, y, s, tekst, sub = '', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 170, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; roundRect(ctx, -90, -80, 180, 44, 14); ctx.fill(); ctx.fillRect(-90, -50, 180, 14);
  for (const rx of [-45, 45]) { roundRect(ctx, rx - 6, -96, 12, 30, 5); shape(ctx, '#8A939E', null); }
  text(ctx, tekst, 0, 40, fTekst(tekst.length > 3 ? 46 : 64, 800), '#1A2740', 'center'); if (sub) text(ctx, sub, 0, 76, fTekst(22, 700), '#5A6478', 'center'); ctx.restore(); }
// krachtmeter: halve schaal licht (groen) tot hard (rood), wijzer v 0..1
function krachtMeter(ctx, x, y, r, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  roundRect(ctx, x - r - 24, y - r - 24, 2 * r + 48, r + 64, 18); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5);
  [[0, 0.55, C.groen], [0.55, 0.78, C.goud], [0.78, 1, C.koraal]].forEach(([u0, u1, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(x, y, r - 10, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI); ctx.stroke(); });
  const an = Math.PI + clamp(v, 0, 1) * Math.PI; ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 22), y + Math.sin(an) * (r - 22)); ctx.stroke(); circ(ctx, x, y, 9, C.text);
  text(ctx, 'licht', x - r + 6, y + 30, fTekst(22, 700), C.text2, 'center'); text(ctx, 'hard', x + r - 6, y + 30, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }

// ================= schedel van opzij (gezicht links) =================
// k = 1 ruime kaak (jager-verzamelaar) … 0 krappe kaak (nu); kauw 0..1 = kaak beweegt; hl = ring om de verstandskies; rij = tandenrij oplichten
function schedelZij(ctx, x, y, s, o = {}) { const { k = 1, kauw = 0, hl = 0, hlKleur = C.groen, rij = 0, t = 0, a = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const BOT = '#E8E2D2', BR = '#B8B0A0', GAT = '#4A4540';
  const L = lerp(205, 300, k), xE = -245 + L, TW = [22, 22, 28, 30, 30, 40, 40, 40];
  const fit = clamp((L - 250) / 14, 0, 1), c = Math.min(1, (L - 6) / 212);
  const tandX = []; let cx = -243; for (let i = 0; i < 7; i++) { const w = TW[i]; tandX.push(cx + w * c / 2 + (fit > 0.5 ? 2 : 0)); cx += w * c + (fit > 0.5 ? (L - 252) / 8 : 0); }
  const wX = cx + 22;
  const kroon = (xx, yy, w, boven, i) => { ctx.save(); ctx.translate(xx, yy); ctx.rotate((i % 2 ? 1 : -1) * 0.13 * (1 - c > 0.02 ? 1 : 0) * (i < 4 ? 1 : 0.4)); const hh = 36; roundRect(ctx, -w / 2, boven ? 0 : -hh, w, hh, 8); shape(ctx, '#F6F3EA', BR, 2);
    if (w >= 30) { ctx.strokeStyle = rgba(BR, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, boven ? hh - 8 : -hh + 8); ctx.lineTo(0, boven ? hh : -hh); ctx.stroke(); } ctx.restore(); };
  // schedel + bovenkaak
  ctx.beginPath(); ctx.moveTo(-252, -40); ctx.bezierCurveTo(-285, -210, -100, -330, 80, -322); ctx.bezierCurveTo(260, -312, 365, -170, 345, -20); ctx.bezierCurveTo(335, 60, 290, 110, 225, 128); ctx.lineTo(xE + 120, 118); ctx.lineTo(xE + 40, 140); ctx.lineTo(xE + 30, 165);
  ctx.lineTo(-238, 165); ctx.lineTo(-258, 128); ctx.lineTo(-250, 88); ctx.lineTo(-282, 42); ctx.lineTo(-262, -6); ctx.closePath(); shape(ctx, BOT, BR, 3);
  ctx.beginPath(); ctx.ellipse(-168, -30, 52, 46, 0, 0, 6.283); shape(ctx, GAT, BR, 2); ctx.beginPath(); ctx.ellipse(-236, 66, 15, 30, 0.15, 0, 6.283); shape(ctx, GAT, null);
  ctx.strokeStyle = BR; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-140, 40); ctx.quadraticCurveTo(-30, 80, xE + 100, 66); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-60, -200); ctx.quadraticCurveTo(80, -240, 200, -150); ctx.strokeStyle = rgba(BR, 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, xE + 112, 72, 14, GAT);
  for (let i = 0; i < 7; i++) kroon(tandX[i], 165, TW[i], true, i);
  if (fit > 0.01) { ctx.save(); ctx.globalAlpha *= fit; kroon(wX, 165, 40, true, 7); ctx.restore(); }
  if (fit < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - fit) * 0.9; ctx.translate(xE + 30, 128); ctx.rotate(0.7); roundRect(ctx, -20, -18, 40, 36, 8); shape(ctx, '#F6F3EA', BR, 2); ctx.setLineDash([6, 5]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  // onderkaak (draait om het kaakgewricht)
  const jx = xE + 97, jy = 98; ctx.save(); ctx.translate(jx, jy); ctx.rotate(kauw * 0.07 * (0.5 + 0.5 * Math.sin(t * 7))); ctx.translate(-jx, -jy);
  ctx.beginPath(); ctx.moveTo(-238, 235); ctx.lineTo(xE + 8, 235); ctx.quadraticCurveTo(xE + 42, 215, xE + 50, 124); ctx.lineTo(xE + 72, 168); ctx.quadraticCurveTo(xE + 84, 150, xE + 88, 100);
  ctx.quadraticCurveTo(xE + 100, 84, xE + 110, 100); ctx.lineTo(xE + 106, 150); ctx.quadraticCurveTo(xE + 100, 250, xE + 112, 300); ctx.quadraticCurveTo(xE + 60, 338, -40, 330); ctx.quadraticCurveTo(-200, 336, -236, 318); ctx.quadraticCurveTo(-270, 290, -262, 255); ctx.closePath(); shape(ctx, BOT, BR, 3);
  circ(ctx, -150, 285, 7, GAT);
  for (let i = 0; i < 7; i++) kroon(tandX[i], 236, TW[i], false, i + 1);
  if (fit > 0.01) { ctx.save(); ctx.globalAlpha *= fit; kroon(wX, 236, 40, false, 8); ctx.restore(); }
  if (fit < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - fit) * 0.9; ctx.translate(xE + 34, 268); ctx.rotate(-0.85); roundRect(ctx, -20, -18, 40, 36, 8); shape(ctx, '#F6F3EA', BR, 2); ctx.setLineDash([6, 5]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (rij > 0.01) { ctx.save(); ctx.globalAlpha *= rij; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-246, 248); ctx.lineTo(xE + 6, 248); ctx.stroke(); ctx.restore(); }
  const wx = fit > 0.5 ? wX : xE + 32, wy = fit > 0.5 ? 200 : 200;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = hlKleur; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(wx, wy, 52, fit > 0.5 ? 70 : 105, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { x: x + wx * s, y: y + wy * s }; }

// voedsel: 'taai' (knol, gedroogd vlees, noten) of 'zacht' (kom pap, witbrood)
function voedsel(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'taai') { ctx.save(); ctx.rotate(-0.4); ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-60, -34, 0, -26); ctx.quadraticCurveTo(60, -18, 90, 4); ctx.quadraticCurveTo(60, 20, 0, 22); ctx.quadraticCurveTo(-60, 26, -70, -10); ctx.closePath(); shape(ctx, '#A8743A', '#7A5228', 2);
      ctx.strokeStyle = rgba('#7A5228', 0.8); ctx.lineWidth = 2; for (const kx of [-30, 10, 50]) { ctx.beginPath(); ctx.moveTo(kx, -22); ctx.quadraticCurveTo(kx + 6, 0, kx, 20); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.moveTo(-40, 40); ctx.bezierCurveTo(-10, 30, 20, 50, 60, 38); ctx.lineTo(64, 64); ctx.bezierCurveTo(20, 76, -10, 56, -44, 66); ctx.closePath(); shape(ctx, '#8A3B2A', '#5E2418', 2);
    for (const [nx, ny] of [[-70, 54], [-88, 30]]) { ctx.beginPath(); ctx.ellipse(nx, ny, 14, 11, 0.4, 0, 6.283); shape(ctx, '#B88A4A', '#7A5A2A', 2); } }
  else { ctx.beginPath(); ctx.moveTo(-80, -6); ctx.quadraticCurveTo(-74, 56, 0, 58); ctx.quadraticCurveTo(74, 56, 80, -6); ctx.closePath(); shape(ctx, '#5BA4C9', '#3E7FA0', 2);
    ctx.beginPath(); ctx.ellipse(0, -6, 80, 16, 0, 0, 6.283); shape(ctx, '#F2D9A0', '#C9AE70', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, -10); ctx.lineTo(95, -70); ctx.stroke();
    roundRect(ctx, -150, -40, 64, 70, 18); shape(ctx, '#F6E7C4', '#D2A060', 5); }
  ctx.restore(); }

// ---------- overgenomen uit t2 ----------
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
function ragerHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an - 0.2); rager(ctx, 40, 0, 0.8, 1); ctx.restore(); }
function spiegel(ctx, x, y, w, h, a = 1, binnen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w / 2 + 16, h / 2 + 16, 0, 0, 6.283); shape(ctx, '#8A6A4A', '#5E4630', 3);
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 6.283); ctx.fillStyle = '#2E4258'; ctx.fill(); ctx.save(); ctx.clip(); if (binnen) binnen(); ctx.fillStyle = rgba('#BFD8EE', 0.12); ctx.fillRect(x - w, y - h, 2 * w, 2 * h);
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x - w * 0.3, y - h * 0.38); ctx.lineTo(x - w * 0.05, y - h * 0.46); ctx.stroke(); ctx.restore(); ctx.restore(); }
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }

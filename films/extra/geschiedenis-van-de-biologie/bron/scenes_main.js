
// ---------- extra objecten voor afzonderlijke scènes ----------
function skelet(ctx, x, y, h, u = 1, col = '#5A4A30') { // eenvoudige lijntekening van een skelet (anatomisch boek); u = hoe ver getekend
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; const s = h / 300; const L = [
    [[0, -130], [0, -40]], [[-40, -110], [40, -110]], [[-40, -110], [-60, -40]], [[40, -110], [60, -40]], [[-60, -40], [-66, 20]], [[60, -40], [66, 20]],
    [[-30, -30], [30, -30]], [[-30, -30], [-22, 70]], [[30, -30], [22, 70]], [[-22, 70], [-26, 150]], [[22, 70], [26, 150]]];
  const n = Math.floor(L.length * clamp(u, 0, 1)); for (let i = 0; i < n; i++) { const [[a1, b1], [a2, b2]] = L[i]; ctx.beginPath(); ctx.moveTo(x + a1 * s, y + b1 * s); ctx.lineTo(x + a2 * s, y + b2 * s); ctx.stroke(); }
  if (u > 0.05) { ctx.beginPath(); ctx.arc(x, y - 158 * s, 26 * s, 0, 6.283); ctx.stroke(); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(x, y - 98 * s + k * 13 * s, 34 * s, 7 * s, 0, 0, Math.PI); ctx.stroke(); } }
  ctx.restore(); }
function openBoek(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x, y - h / 2 + 10); ctx.quadraticCurveTo(x + k * w * 0.25, y - h / 2 - 6, x + k * w / 2, y - h / 2); ctx.lineTo(x + k * w / 2, y + h / 2); ctx.quadraticCurveTo(x + k * w * 0.25, y + h / 2 - 12, x, y + h / 2); ctx.closePath(); shape(ctx, '#EDE4CE', '#C8BC9E', 2); } ctx.restore(); }
function groepje(ctx, x, y, h, n, a = 1, col = C.mens, pruik = false) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const px = x + (i - (n - 1) / 2) * h * 0.55; human(ctx, px, y, h, a, col); if (pruik) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E2DED4'; const u = h / 8; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + k * u * 0.85, y - h + u * 1.3, u * 0.35, u * 0.8, 0, 0, 6.283); ctx.fill(); } ctx.restore(); } } }
function stank(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 70, 120, 70, 10); shape(ctx, '#5A5040', '#7A7058', 2); ctx.strokeStyle = rgba('#9AB870', 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const yy = y - 80 - i * 7, xx = x - 36 + k * 36 + Math.sin(i * 0.6 + t * 2 + k) * 10; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function balk(ctx, x, yBase, w, hmax, v, col, a = 1, label = '', waarde = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = hmax * v; roundRect(ctx, x - w / 2, yBase - h, w, Math.max(h, 2), 8); shape(ctx, rgba(col, 0.45), col, 2); if (waarde) regel(ctx, waarde, x, yBase - h - 16, 1, col, 34, 'center', 700); if (label) regel(ctx, label, x, yBase + 40, 1, C.text2, 26, 'center', 600); ctx.restore(); }
function snijtafel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 16, 180, 22, 6); shape(ctx, '#7A8BA8', '#9AAAC0', 2); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 70, y + 6); ctx.lineTo(x - 70, y + 70); ctx.moveTo(x + 70, y + 6); ctx.lineTo(x + 70, y + 70); ctx.stroke(); roundRect(ctx, x - 80, y - 34, 160, 20, 10); shape(ctx, '#C8CCD4', null); ctx.restore(); }
function wasbak(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 90, y - 40); ctx.lineTo(x + 90, y - 40); ctx.quadraticCurveTo(x + 80, y + 30, x, y + 34); ctx.quadraticCurveTo(x - 80, y + 30, x - 90, y - 40); ctx.closePath(); shape(ctx, '#C8D0DC', '#E8EEF4', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.beginPath(); ctx.ellipse(x, y - 30, 78, 10, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function vinkGroep(ctx, x, y, t, u, a = 1) { // natuurlijke selectie: snavels verschillen, groten krijgen meer jongen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const S = [0.2, 0.9, 0.5, 1, 0.1, 0.7, 0.35, 0.95];
  S.forEach((sn, i) => { const px = x + (i % 4) * 150, py = y + Math.floor(i / 4) * 120; const goed = sn > 0.6; const dim_ = u.sel > 0 && !goed ? 1 - 0.65 * u.sel : 1; vink(ctx, px, py, 1, sn, dim_, goed && u.sel > 0.5 ? '#B08A5C' : '#8C6A4A');
    if (goed && u.jong > 0.01) for (let k = 0; k < 2; k++) vink(ctx, px - 30 + k * 50, py + 56, 0.45, sn, u.jong); });
  ctx.restore(); }
function oxfordTeam(ctx, x, y, a = 1, medA = 0) { if (a <= 0.01) return; const N = ['Florey', 'Chain', 'Heatley']; N.forEach((n, i) => { const px = x + i * 170; human(ctx, px, y, 220, a, C.mens); naamBij(ctx, n, null, px, y + 44, a, 'center'); if (i < 2) medaille(ctx, px, y - 100, 1.1, a * medA); else kruis(ctx, px, y - 100, 18, a * medA * 0.8, C.text2); }); }
function kaartSnow(ctx, X, Y, w, h, t, o = {}) { const { doden = 1, a = 1, hendel = 1, water = 0 } = o; if (a <= 0.01) return { px: X + w * 0.52, py: Y + h * 0.55 }; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, X, Y, w, h, 12); shape(ctx, '#EDE4CE', '#C8BC9E', 2);
  ctx.save(); roundRect(ctx, X, Y, w, h, 12); ctx.clip(); ctx.strokeStyle = '#B8AC8E'; ctx.lineWidth = 10; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(X, Y + h * i / 5 + Math.sin(i) * 14); ctx.lineTo(X + w, Y + h * i / 5 - Math.cos(i) * 14); ctx.stroke(); } for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(X + w * i / 6 + Math.sin(i * 2) * 20, Y); ctx.lineTo(X + w * i / 6 - Math.sin(i) * 16, Y + h); ctx.stroke(); }
  const px = X + w * 0.52, py = Y + h * 0.55; const N = Math.floor(70 * doden); for (let k = 0; k < N; k++) { const an = hash(k * 3) * 6.283, d = Math.pow(hash(k * 3 + 1), 1.6) * Math.min(w, h) * 0.48; ctx.fillStyle = '#2A2420'; ctx.fillRect(px + Math.cos(an) * d - 7, py + Math.sin(an) * d * 0.8 - 3, 14, 6); }
  if (water > 0.01) for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; pijl(ctx, px + Math.cos(an) * 40, py + Math.sin(an) * 40, px + Math.cos(an) * 130, py + Math.sin(an) * 110, C.teal, water, 4, 14); }
  ctx.restore(); pomp(ctx, px, py + 40, 0.5, 1, hendel); ctx.restore(); return { px, py }; }

function lijn(ctx, pts, col, u = 1, lw = 4, a = 1) { if (a <= 0.01 || u <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const n = Math.max(1, Math.floor((pts.length - 1) * clamp(u, 0, 1))); ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore(); }

const SCENES = {
  title(ctx, t) { ladder(ctx, 1500, 820, 560, 1, { mensA: 1 }); vraagteken(ctx, 1640, 340, 0.9, 110); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['1676', 1]]);
    laag(ctx, A, () => { microscoop(ctx, 830, 800, 1.35); fig(ctx, 'noor', 600, 800, 400, { uit: q.on('eerste', 1) > 0.5 ? 'denkt' : 'verbaasd', pose: q.on('eerste', 1) > 0.5 ? 'denk' : 'staan', kijk: 1, t });
      zoomCircle(ctx, 1380, 470, 250, 790, 560, 'druppel slootwater · vergroot', q.on('Ze', 1, 0.8), () => druppelInhoud(ctx, 1380, 470, 250, t, 16));
      vraagteken(ctx, 700, 330, q.on('eerste', 1), 110); });
    laag(ctx, B, () => { tijdlijn(ctx, { span: [1676, 1677], jaar: 1676 });
      paneel(ctx, 140, 300, 560, 470, 'Londen · Royal Society', 1); groepje(ctx, 420, 720, 230, 3, 1, C.mens, true);
      paneel(ctx, 1220, 300, 560, 470, 'Delft', 1); fig(ctx, 'leeuwenhoek', 1420, 740, 300, { uit: 'blij', pose: 'vasthouden', kijk: -1, t, hold: (c, hx, hy) => lensje(c, hx, hy - 20, 0.6) });
      naamBij(ctx, 'een lakenhandelaar', 'delft · 1676', 1500, 400, 1, 'center');
      const vl = clamp((q.localT - q.at('schreef', 1)) / 3, 0, 1); brief(ctx, lerp(1300, 640, vl), 520 - Math.sin(vl * 3.14) * 120, 1.3, ramp(q.localT, q.at('schreef', 1), 0.4));
      laag(ctx, q.on('ontelbaar', 1), () => { zoomCircle(ctx, 960, 560, 120, 640, 520, '', 1, () => druppelInhoud(ctx, 960, 560, 120, t, 12)); tag(ctx, 'ontelbaar veel diertjes in één druppel', 960, 740, C.teal, 1, 'center', 30); });
      tag(ctx, 'niet gestudeerd', 1500, 470, C.text2, q.on('gestudeerd', 1) * (1 - q.on('lenzen', 1)), 'center', 28);
      laag(ctx, q.on('lenzen', 1), () => { tag(ctx, 'lenzen maken: geheim', 1500, 470, C.oker, 1, 'center', 28); });
      vraagteken(ctx, 420, 420, q.on('brief', 1), 120); }); },

  // ---------- H1 Kijk zelf ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Eeuwenlang', 1]]); const j = q.localT < q.at('Eeuwenlang', 1) ? 1677 : jaarNaar(q, 'Eeuwenlang', 1, 1677, -340, 2.2);
    tijdlijn(ctx, { span: B > 0.5 ? [-350, 1661] : [1676, 1677], jaar: j });
    laag(ctx, A, () => { const pr = q.on('probeerden', 1); groepje(ctx, 300, 760, 220, 3, pr, C.mens, true); microscoop(ctx, 560, 780, 1, pr); kruis(ctx, 560, 470, 30, q.on('niet', 1) * (1 - q.on('Robert', 1)));
      const ho = q.on('Robert', 1); geleerde(ctx, 'hooke', 980, 790, 340, { a: ho, uit: q.on('geloofden', 1) > 0.5 ? 'blij' : 'neutraal', t, kijk: 1 }); microscoop(ctx, 1180, 790, 1.1, ho);
      zoomCircle(ctx, 1560, 450, 190, 1170, 590, 'Londen · 1677', ho, () => druppelInhoud(ctx, 1560, 450, 190, t, 12)); vink_(ctx, 1700, 640, 30, q.on('geloofden', 1));
      laag(ctx, q.on('kern', 1), () => { ctx.fillStyle = rgba(C.bgSchema, 0.85); ctx.fillRect(0, 230, W, 660); regel(ctx, 'Delft', 560, 470, 1, C.text, 44, 'center', 700); regel(ctx, 'Londen', 1360, 470, 1, C.text, 44, 'center', 700); vink_(ctx, 560, 560, 34, 1); vink_(ctx, 1360, 560, 34, 1); pijl(ctx, 700, 520, 1220, 520, C.goud, 1, 4, 20); pijl(ctx, 1220, 540, 700, 540, C.goud, 1, 4, 20); haak(ctx, 460, 1460, 640, 'wat jij ziet, moet een ander ook kunnen zien', C.groen, 1); }); });
    laag(ctx, B, () => { boekenStapel(ctx, 960, 700, 1); tag(ctx, 'wat in de oude boeken staat, is waar', 960, 400, C.oker, q.on('boeken', 1), 'center', 38); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const gal = q.on('Galenus', 1); tijdlijn(ctx, { span: [-350, 1661], jaar: gal > 0.5 ? jaarNaar(q, 'Galenus', 1, -340, 170) : -340 });
    const dA = 1 - 0.65 * gal;
    laag(ctx, dA, () => { geleerde(ctx, 'aristoteles', 260, 790, 340, { t, uit: 'denkt', pose: q.on('ladder', 1) > 0.5 && gal < 0.5 ? 'wijs' : 'staan' }); inktvis(ctx, 470, 520, 0.9, t, q.on('dieren', 1)); tag(ctx, 'honderden soorten beschreven', 470, 300, C.oker, q.on('honderden', 1) * (1 - gal), 'center', 28);
      ladder(ctx, 760, 800, 470, q.on('ladder', 1), { mensA: q.on('bovenaan', 1) }); });
    laag(ctx, gal, () => { geleerde(ctx, 'galenus', 1130, 790, 340, { t, uit: 'praat', kijk: 1 }); aap(ctx, 1380, 790, 1.1, q.on('apen', 1)); varken(ctx, 1590, 750, 0.9, q.on('varkens', 1));
      laag(ctx, q.on('lever', 1) * (1 - q.on('duizend', 2)), () => { lever(ctx, 1480, 360, 0.9); regel(ctx, 'lever', 1480, 300, 1, C.text2, 28, 'center', 700); regel(ctx, 'organen', 1720, 470, 1, C.text2, 28, 'center', 700); pijl(ctx, 1560, 380, 1690, 420, C.koraal, 1, 3, 14);
        for (let k = 0; k < 5; k++) { const u = ((q.localT * 0.5 + k / 5) % 1); bloeddruppel(ctx, lerp(1500, 1720, u), lerp(390, 440, u), 0.9, 1 - ease((u - 0.6) / 0.4)); }
        tag(ctx, 'steeds nieuw bloed, opgebruikt', 1560, 560, C.koraal, q.on('verbruiken', 1), 'center', 28); });
      laag(ctx, q.on('duizend', 2), () => { boekenStapel(ctx, 1540, 520, 1); tag(ctx, 'meer dan 1000 jaar het leerboek', 1540, 330, C.oker, 1, 'center', 30); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [-350, 1661], jaar: 1543 });
    geleerde(ctx, 'vesalius', 260, 790, 340, { t, uit: q.on('fouten', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('tekenen', 1) > 0.5 && q.localT < q.at('fouten', 1) ? 'wijs' : 'staan' });
    const kz = q.on('onderkaakbot', 1);
    laag(ctx, 1 - kz, () => { openBoek(ctx, 800, 520, 560, 440, q.on('lichamen', 1)); skelet(ctx, 660, 560, 300, ramp(q.localT, q.at('tekenen', 1), 3) * q.on('lichamen', 1)); skelet(ctx, 940, 560, 300, ramp(q.localT, q.at('tekenen', 1) + 1, 3) * q.on('lichamen', 1));
      laag(ctx, q.on('fouten', 1), () => { boek(ctx, 1480, 520, 220, 280, '#8C5A3A', 1, 'Galenus'); for (let k = 0; k < 4; k++) kruis(ctx, 1400 + (k % 2) * 160, 430 + Math.floor(k / 2) * 180, 22, ramp(q.localT, q.at('fouten', 1) + k * 0.3, 0.3)); tag(ctx, 'honderden fouten', 1480, 760, C.koraal, 1, 'center', 32); }); });
    laag(ctx, kz, () => { kaak(ctx, 860, 520, 1.3, false); regel(ctx, 'mens: één bot', 860, 680, 1, C.groen, 36, 'center', 700); vink_(ctx, 860, 330, 30, 1);
      kaak(ctx, 1450, 520, 1.3, true, q.on('hond', 2)); regel(ctx, 'hond: twee delen', 1450, 680, q.on('hond', 2), C.koraal, 36, 'center', 700);
      tag(ctx, 'Galenus beschreef vaak dieren', 1150, 300, C.oker, q.on('dieren', 1) * (1 - q.on('les', 2)), 'center', 32); tag(ctx, 'kijk zelf, vertrouw niet blind op een naam', 1150, 300, C.goud, q.on('les', 2), 'center', 34); }); },

  s07(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [-350, 1661], jaar: 1628 });
    geleerde(ctx, 'harvey', 260, 790, 340, { t, uit: 'denkt', pose: q.on('rekenen', 1) > 0.5 ? 'denk' : 'staan' }); hart(ctx, 640, 520, 1.6, t, q.on('bloed', 1));
    regel(ctx, 'bloed per slag', 1050, 430, q.on('slag', 1), C.koraal, 44, 'center', 700); regel(ctx, '×', 1270, 432, q.on('telde', 1), C.text, 52, 'center', 700); regel(ctx, 'slagen per uur', 1500, 430, q.on('telde', 1), C.koraal, 44, 'center', 700);
    regel(ctx, '=', 1270, 560, q.on('uur', 1), C.text, 60, 'center', 700); vraagteken(ctx, 1270, 720, q.on('uur', 1), 140); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const mal = q.on('Malpighi', 1), ib = q.on('Ibn', 1); tijdlijn(ctx, { span: [-350, 1661], jaar: ib > 0.5 ? 1242 : mal > 0.5 ? 1661 : 1628 });
    const [A, B] = fasen(q, [null, ['rondgaat', 1]]);
    laag(ctx, A, () => { balk(ctx, 640, 760, 160, 400, 5 / 300 + 0.02, C.teal, q.on('lichaam', 1), 'al je bloed', '± 5 liter'); balk(ctx, 1080, 760, 160, 400, 1, C.koraal, q.on('driehonderd', 1), 'gepompt per uur', '± 300 liter');
      tag(ctx, 'volgens Harvey: al in een half uur meer dan al je bloed', 960, 290, C.goud, q.on('Harvey', 1), 'center', 32); tag(ctx, 'zoveel maakt de lever nooit', 1480, 560, C.koraal, q.on('Zoveel', 1), 'center', 30); hart(ctx, 1480, 420, 0.9, t, q.on('Zoveel', 1)); });
    laag(ctx, B, () => { const cx = 760, cy = 540; const dimB = 1 - 0.6 * ib;
      laag(ctx, 1, () => { const top = [[cx, cy], [cx - 150, cy - 120], [cx, cy - 250], [cx + 150, cy - 120], [cx, cy]], bot = [[cx, cy], [cx + 260, cy + 60], [cx, cy + 250], [cx - 260, cy + 60], [cx, cy]];
        ctx.save(); ctx.strokeStyle = rgba(C.koraal, 0.5); ctx.lineWidth = 16; ctx.lineJoin = 'round'; for (const P of [top, bot]) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); } ctx.restore();
        particleFlow(ctx, top, 10, t, 70, C.teal, 6, 0, 1); particleFlow(ctx, bot, 14, t, 90, C.koraal, 6, 20, dimB);
        regel(ctx, 'longen', cx, cy - 280, 1, ib > 0.5 ? C.goud : C.text2, 30, 'center', 700); regel(ctx, 'lichaam', cx, cy + 300, dimB, C.text2, 30, 'center', 700); hart(ctx, cx, cy + 10, 0.8, t, 1);
        tag(ctx, 'bloedsomloop: het hart is een pomp', 1420, 540, C.groen, q.on('pomp', 2) * (1 - mal), 'center', 32); });
      laag(ctx, mal * (1 - ib), () => { zoomCircle(ctx, 1420, 520, 220, cx + 200, cy + 160, 'haarvaten · Malpighi 1661', 1, () => { ctx.fillStyle = '#16233A'; ctx.fillRect(1180, 280, 480, 480); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(1200, 320 + k * 50); for (let i = 0; i < 12; i++) ctx.lineTo(1200 + i * 40, 320 + k * 50 + Math.sin(i * 1.3 + k) * 22); ctx.stroke(); } ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(1220 + i * 45, 290); ctx.lineTo(1240 + i * 45, 760); ctx.stroke(); } }); });
      laag(ctx, ib, () => { geleerde(ctx, 'nafis', 1500, 790, 340, { t, uit: 'neutraal', kijk: -1 }); tag(ctx, 'bloed van het hart door de longen', 1500, 300, C.goud, 1, 'center', 30); tag(ctx, 'in Europa eeuwenlang onbekend', 1500, 380, C.koraal, q.on('Europa', 1), 'center', 28); }); }); },

  // ---------- H2 Een wereld in een druppel ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const an = q.on('Antoni', 1); tijdlijn(ctx, { span: [1665, 1758], jaar: an > 0.5 ? 1676 : 1665 });
    laag(ctx, 1 - 0.65 * an, () => { geleerde(ctx, 'hooke', 230, 790, 330, { t, kijk: 1 }); microscoop(ctx, 430, 790, 1);
      zoomCircle(ctx, 720, 450, 170, 420, 580, 'kurk · vergroot', q.on('kurk', 1), () => kurk(ctx, 720, 450, 170)); tag(ctx, 'cel = kamertje', 720, 720, C.oker, q.on('cellen', 1) * (1 - q.on('Eigenlijk', 1)), 'center', 30); tag(ctx, 'lege wanden van dode cellen', 720, 720, C.text2, q.on('Eigenlijk', 1), 'center', 28); });
    laag(ctx, an, () => { geleerde(ctx, 'leeuwenhoek', 1130, 790, 340, { t, uit: 'blij', pose: 'vasthouden', kijk: 1, hold: (c, hx, hy) => lensje(c, hx + 6, hy - 30, 0.75) });
      zoomCircle(ctx, 1560, 450, 230, 1180, 470, 'meer dan 200× vergroot', q.on('lensje', 1), () => { ctx.fillStyle = '#16233A'; ctx.fillRect(1320, 210, 480, 480); const b = q.on('bacteriën', 1), z = q.on('zaadcellen', 1), r = q.on('rode', 1);
        for (let k = 0; k < 7; k++) { const w = wander(k, t, 12, 0.4); bacterie(ctx, 1420 + (k % 4) * 60 + w.x, 300 + Math.floor(k / 4) * 50 + w.y, 0.8, hash(k) * 3, b, k % 3 === 0); }
        zaadcel(ctx, 1650 + Math.sin(t) * 20, 380, 1.2, t, z); zaadcel(ctx, 1600, 470 + Math.cos(t) * 10, 1.1, t + 1, z); for (let k = 0; k < 5; k++) rbc(ctx, 1450 + k * 52, 580 + (k % 2) * 30, 1, r); }); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1665, 1758], jaar: 1758 });
    geleerde(ctx, 'linnaeus', 230, 790, 330, { t, uit: q.on('geen', 1) > 0.5 ? 'blij' : 'neutraal', pose: 'vasthouden', kijk: 1, hold: (c, hx, hy) => linnaea(c, hx + 4, hy + 6, 0.9) });
    const pr = q.on('primaten', 1);
    laag(ctx, q.on('twee', 1) * (1 - pr), () => { roundRect(ctx, 640, 360, 900, 220, 20); shape(ctx, rgba(C.fill, 0.6), C.goud, 2); text(ctx, 'Homo', 870, 500, 'italic 700 96px ' + F.titel, C.text, 'center'); text(ctx, 'sapiens', 1270, 500, 'italic 700 96px ' + F.titel, C.text, 'center');
      regel(ctx, 'geslachtsnaam', 870, 640, q.on('geslachtsnaam', 1), C.oker, 30, 'center', 700); regel(ctx, 'soortnaam', 1270, 640, q.on('soortnaam', 1), C.oker, 30, 'center', 700); });
    laag(ctx, pr, () => { const mv = ease((q.localT - q.at('ladder', 1)) / 1.6); ladder(ctx, 700, 830, 420, 1, { mensA: 0 });
      paneel(ctx, 1000, 380, 820, 450, 'primaten', 1, C.goud); aap(ctx, 1150, 790, 1.1); aap(ctx, 1330, 790, 0.95, 1, '#6A5040'); aap(ctx, 1500, 790, 1.15, 1, '#8C6A4A');
      const mx = lerp(700, 1680, mv), my = lerp(830 - 420 * 0.9, 790, mv) - Math.sin(mv * 3.14) * 140; human(ctx, mx, my, lerp(70, 160, mv), 1, C.goud);
      tag(ctx, 'een belediging!', 1410, 300, C.koraal, q.on('Critici', 1) * (1 - q.on('noem', 1)), 'center', 28);
      laag(ctx, q.on('noem', 1) * (1 - q.on('ladder', 1)), () => { roundRect(ctx, 500, 226, 920, 120, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 2); regel(ctx, '"Noem mij één verschil tussen mens en aap.', 960, 278, 1, C.text, 34, 'center', 600); regel(ctx, 'Ik ken er geen."', 960, 324, q.on('ken', 1), C.goud, 34, 'center', 700); }); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1665, 1758], jaar: 1758 });
    const G = ['Europa', 'Amerika', 'Azië', 'Afrika']; G.forEach((g, i) => { const x = 420 + i * 360; human(ctx, x, 700, 260, q.on('vier', 1), C.mens); regel(ctx, g, x, 760, q.on('werelddeel', 1), C.text2, 30, 'center', 700);
      laag(ctx, q.on('karaktertrekken', 1), () => { roundRect(ctx, x - 120, 330, 240, 70, 12); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 1.5); ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 4; for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(x - 90, 356 + k * 20); ctx.lineTo(x + 90 - k * 50, 356 + k * 20); ctx.stroke(); } }); });
    laag(ctx, q.on('waarneming', 1), () => { haak(ctx, 300, 1620, 250, '', C.koraal, 0); tag(ctx, 'geen waarneming, maar vooroordeel', 960, 300, C.koraal, 1, 'center', 34); });
    tag(ctx, 'later misbruikt voor racisme', 960, 860 - 10, C.koraal, q.on('racisme', 1), 'center', 30); },

  // ---------- H3 Waar komen we vandaan? ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const th = q.on('Thuis', 1); tijdlijn(ctx, { span: [1831, 1900], jaar: th > 0.5 ? jaarNaar(q, 'Thuis', 1, 1836, 1858, 6) : 1831 });
    laag(ctx, 1 - th, () => { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const x = 120 + i * 42, y = 640 + k * 40 + Math.sin(i * 0.8 + t * 2 + k) * 8; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
      const u = clamp(q.localT / 9, 0, 1); schip(ctx, lerp(300, 1500, u), 600, 1.1, t); regel(ctx, 'de Beagle · bijna 5 jaar om de wereld', 960, 300, 1, C.text2, 34, 'center', 700); });
    laag(ctx, th, () => { geleerde(ctx, 'darwin', 230, 790, 330, { t, uit: 'denkt', pose: q.on('antwoord', 1) > 0.5 ? 'wijs' : 'denk', meta: '1831 · 1859' });
      tag(ctx, 'natuurlijke selectie', 1080, 300, C.groen, q.on('selectie', 1), 'center', 36);
      vinkGroep(ctx, 700, 460, t, { sel: q.on('past', 1), jong: q.on('nakomelingen', 1) }, q.on('Individuen', 1) * (1 - 0.7 * q.on('twintig', 1)));
      tag(ctx, 'past beter: meer jongen', 1500, 760, C.groen, q.on('nakomelingen', 1) * (1 - q.on('twintig', 1)), 'center', 28);
      tag(ctx, 'ruim 20 jaar bijna geheim', 1100, 760, C.oker, q.on('twintig', 1), 'center', 32); vraagteken(ctx, 1500, 640, q.on('ineens', 1), 120); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['schok', 1]]); tijdlijn(ctx, { span: [1831, 1900], jaar: q.on('jaar', 2) > 0.5 ? 1859 : 1858 });
    laag(ctx, A, () => { geleerde(ctx, 'darwin', 260, 790, 330, { t, uit: q.on('idee', 1) > 0.5 ? 'verbaasd' : 'neutraal', kijk: 1 }); geleerde(ctx, 'wallace', 1640, 790, 330, { t, kijk: -1, uit: 'blij', a: q.on('Wallace', 1) }); vlinder(ctx, 1500, 420, 1, t, q.on('dieren', 1));
      const vl = clamp((q.localT - q.at('brief', 1)) / 2.5, 0, 1); brief(ctx, lerp(1560, 420, vl), 460 - Math.sin(vl * 3.14) * 140, 1.2, q.on('brief', 1) * (1 - q.on('samen', 1)));
      tag(ctx, 'hetzelfde idee!', 960, 360, C.goud, q.on('idee', 1) * (1 - q.on('samen', 1)), 'center', 34);
      laag(ctx, q.on('samen', 1), () => { roundRect(ctx, 640, 300, 640, 120, 16); shape(ctx, rgba(C.fill, 0.7), C.goud, 2); regel(ctx, '1858 · samen voorgelezen', 960, 352, 1, C.text, 36, 'center', 700); regel(ctx, 'Darwin + Wallace', 960, 398, 1, C.goud, 30, 'center', 700); });
      boek(ctx, 960, 620, 260, 300, '#3E5A3A', q.on('boek', 1)); regel(ctx, 'Over het ontstaan', 966, 600, q.on('boek', 1), C.text, 26, 'center', 700); regel(ctx, 'van soorten · 1859', 966, 640, q.on('boek', 1), C.text, 26, 'center', 700);
      tag(ctx, 'veel minder bekend', 1640, 300, C.text2, q.on('minder', 1), 'center', 28); });
    laag(ctx, B, () => { const st = q.on('stamboom', 1); ladder(ctx, 520, 800, 470, 1 - 0.6 * st, { mensA: 1 - st }); pijl(ctx, 760, 560, 960, 560, C.goud, st, 5, 20);
      stamboom(ctx, 1380, 840, 600, 560, st, { groei: ease((q.localT - q.at('stamboom', 1)) / 2.5), mensA: q.on('takje', 1) });
      naamBij(ctx, 'mens', null, STAM_MENS[0] + 22, STAM_MENS[1] + 12, q.on('takje', 1), 'left', C.goud);
      tag(ctx, 'niet apart gemaakt', 520, 260, C.koraal, q.on('apart', 1) * (1 - st), 'center', 32); tag(ctx, 'familie van al het leven', 1380, 870 - 20, C.groen, q.on('familie', 1), 'center', 30); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['Galton', 1], ['evolutie', 1]]); tijdlijn(ctx, { span: [1831, 1900], jaar: q.on('Galton', 1) > 0.5 ? 1883 : 1864 });
    laag(ctx, A, () => { tag(ctx, '"de sterkste overleeft"', 960, 340, C.text2, 1, 'center', 44); kruis(ctx, 960, 320, 60, q.on('passen', 1));
      laag(ctx, q.on('samenleving', 1) * (1 - q.on('passen', 1) * 0.5), () => { groepje(ctx, 700, 720, 200, 3, 1, C.mens); groepje(ctx, 1220, 720, 260, 2, 1, C.oker); regel(ctx, 'arm: "natuurlijk"', 700, 770, q.on('armoede', 1), C.koraal, 30, 'center', 700); regel(ctx, 'hulp: "onnatuurlijk"', 1220, 770, q.on('hulp', 1), C.koraal, 30, 'center', 700); });
      tag(ctx, 'sociaal-darwinisme', 960, 470, C.koraal, q.on('sociaal-darwinisme', 1) * (1 - q.on('passen', 1)), 'center', 36);
      laag(ctx, q.on('passen', 1), () => { tag(ctx, 'Darwin: wie het best past, niet wie het sterkst is', 960, 500, C.groen, 1, 'center', 34); vink(ctx, 760, 640, 1.4, 1); vink(ctx, 1160, 640, 1.4, 0.15, 0.5); vink_(ctx, 760, 760, 26, 1); }); });
    laag(ctx, B, () => { geleerde(ctx, 'galton', 260, 790, 330, { t, uit: 'neutraal' }); tag(ctx, 'eugenetica · 1883', 760, 320, C.koraal, 1, 'center', 38); regel(ctx, 'de mens "verbeteren" door te bepalen wie kinderen krijgt', 760, 400, q.on('verbeteren', 1), C.text, 30, 'center', 600);
      paneel(ctx, 520, 470, 600, 300, '', q.on('Amerika', 1), C.koraal); regel(ctx, 'VS', 820, 540, q.on('Amerika', 1), C.koraal, 36, 'center', 700); regel(ctx, '± 60 000 mensen gedwongen', 820, 610, q.on('Amerika', 1), C.text, 30, 'center', 600); regel(ctx, 'onvruchtbaar gemaakt', 820, 652, q.on('Amerika', 1), C.text, 30, 'center', 600);
      paneel(ctx, 1180, 470, 600, 300, '', q.on('nazi-Duitsland', 1), C.koraal); regel(ctx, 'nazi-Duitsland', 1480, 540, q.on('nazi-Duitsland', 1), C.koraal, 36, 'center', 700); regel(ctx, 'gedwongen sterilisatie,', 1480, 610, q.on('nazi-Duitsland', 1), C.text, 30, 'center', 600); regel(ctx, 'moord op gehandicapten', 1480, 652, q.on('nazi-Duitsland', 1), C.text, 30, 'center', 600); });
    laag(ctx, Cc, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 300); ctx.lineTo(960, 780); ctx.stroke(); stamboom(ctx, 560, 720, 400, 420, 1, { groei: 1, mensA: 1 }); regel(ctx, 'hoe de natuur werkt', 560, 790, 1, C.groen, 34, 'center', 700);
      laag(ctx, q.on('omgaan', 1), () => { human(ctx, 1290, 700, 260, 1, C.mens); human(ctx, 1450, 700, 240, 1, C.oker); ctx.strokeStyle = C.mens; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1330, 560); ctx.lineTo(1410, 560); ctx.stroke(); regel(ctx, 'hoe we met elkaar omgaan', 1370, 790, 1, C.goud, 34, 'center', 700); }); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1831, 1900], jaar: q.on('1900', 1) > 0.5 ? 1900 : 1866 });
    geleerde(ctx, 'mendel', 230, 790, 330, { t, uit: q.on('drie', 1) > 0.5 ? 'blij' : 'neutraal', pose: q.on('telde', 1) > 0.5 && q.localT < q.at('eenheden', 1) ? 'wijs' : 'staan' });
    const [A, B] = fasen(q, [null, ['telde', 1]]);
    laag(ctx, A * q.on('erwten', 1), () => { for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) erwtenplant(ctx, 560 + c * 150 + r * 40, 520 + r * 130, 150 - r * 20, 1, t); tag(ctx, '± 28 000 planten · 8 jaar', 1200, 300, C.groen, q.on('achtentwintigduizend', 1), 'center', 34); });
    laag(ctx, B, () => { const M = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1]; M.forEach((g, i) => erwt(ctx, 600 + (i % 6) * 70, 360 + Math.floor(i / 6) * 70, 26, g, ramp(q.localT, q.at('telde', 1) + i * 0.1, 0.3)));
      titelRegel(ctx, '3 : 1', 820, 620, q.on('drie', 1), C.goud, 96);
      laag(ctx, q.on('eenheden', 1), () => { for (const [i, l] of [[0, 'A'], [1, 'a']]) { roundRect(ctx, 1260 + i * 170, 360, 130, 130, 16); shape(ctx, rgba(C.paars, 0.3), C.paars, 2); titelRegel(ctx, l, 1325 + i * 170, 455, 1, C.text, 80); } regel(ctx, 'losse eenheden = genen', 1410, 560, 1, C.paars, 34, 'center', 700); });
      tag(ctx, '1866: bijna niemand zag het belang', 1410, 680, C.oker, q.on('1866', 1) * (1 - q.on('1900', 1)), 'center', 28); tag(ctx, '1900: herontdekt, o.a. door Hugo de Vries', 1300, 680, C.groen, q.on('1900', 1), 'center', 30); }); },

  // ---------- H4 Onzichtbare vijanden ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); const se = q.on('Semmelweis', 1); tijdlijn(ctx, { span: [1847, 1945], jaar: 1847 });
    laag(ctx, 1 - se, () => { stank(ctx, 960, 700, t); tag(ctx, 'ziekte door stinkende lucht?', 960, 360, C.text2, q.on('stinkende', 1), 'center', 36); });
    laag(ctx, se, () => { geleerde(ctx, 'semmelweis', 230, 790, 330, { t, uit: q.on('verschil', 1) > 0.5 ? 'denkt' : 'bezorgd', pose: q.on('verschil', 1) > 0.5 ? 'denk' : 'staan' });
      const tw = q.on('afdelingen', 1); paneel(ctx, 520, 250, 600, 560, 'afdeling 1', tw, C.line); paneel(ctx, 1200, 250, 600, 560, 'afdeling 2', tw, C.line);
      bed(ctx, 660, 420, 0.9, tw); bed(ctx, 1340, 420, 0.9, tw);
      const st = q.on('stierven', 1); balk(ctx, 900, 700, 120, 260, 0.82, C.koraal, st, '', '± 10 %'); balk(ctx, 1580, 700, 120, 260, 0.82 / 4, C.koraal, st, '', '± 3 %'); regel(ctx, 'sterfte', 900, 740, st, C.text2, 26, 'center', 600); regel(ctx, 'sterfte', 1580, 740, st, C.text2, 26, 'center', 600);
      tag(ctx, 'kraamvrouwenkoorts: infectie na de bevalling', 1160, 880 - 30, C.koraal, q.on('infectie', 1) * (1 - q.on('artsen', 2)), 'center', 28);
      regel(ctx, 'artsen en studenten', 820, 340, q.on('artsen', 2), C.teal, 30, 'center', 700); regel(ctx, 'vroedvrouwen', 1500, 340, q.on('vroedvrouwen', 1), C.groen, 30, 'center', 700); vraagteken(ctx, 1160, 600, q.on('verschil', 1), 110); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1847, 1945], jaar: q.on('1865', 1) > 0.5 ? 1865 : 1847 });
    const [A, B] = fasen(q, [null, ['geloofden', 1]]);
    laag(ctx, A, () => { snijtafel(ctx, 330, 600, 1); regel(ctx, 'lijken ontleden', 330, 740, 1, C.text2, 28, 'center', 700); bed(ctx, 1560, 600, 1.4, 1); regel(ctx, 'bevallen vrouwen', 1560, 740, 1, C.text2, 28, 'center', 700);
      const wa = q.on('chloorkalk', 1); pijl(ctx, 480, 560, 1380, 560, C.koraal, 1 - wa, 4, 18); hand(ctx, 930, 470, 1.4, 1, (1 - wa) * q.on('wassen', 1), t); tag(ctx, 'zonder handen te wassen', 930, 330, C.koraal, q.on('wassen', 1) * (1 - wa), 'center', 30);
      laag(ctx, wa, () => { wasbak(ctx, 930, 680); tag(ctx, 'handen wassen met chloorkalk', 930, 330, C.teal, 1, 'center', 32); });
      const sd = q.on('sterfte', 1); const v = lerp(0.82, 0.16, ease((q.localT - q.at('sterfte', 1)) / 2)); balk(ctx, 1240, 860 - 40, 80, 200, v, C.koraal, sd, '', v > 0.5 ? '± 10 %' : '± 2 %'); });
    laag(ctx, B, () => { geleerde(ctx, 'semmelweis', 500, 790, 340, { t, uit: 'bezorgd', a: 1 - 0.6 * q.on('1865', 1) }); groepje(ctx, 1200, 760, 230, 3, 1 - 0.5 * q.on('1865', 1), C.mens); tag(ctx, 'veel artsen geloofden hem niet', 1200, 400, C.koraal, 1, 'center', 32);
      tag(ctx, 'overleden in 1865', 500, 330, C.text2, q.on('1865', 1), 'center', 28); tag(ctx, 'gelijk pas na zijn dood', 1200, 300, C.groen, q.on('Gelijk', 1), 'center', 32); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1847, 1945], jaar: 1854 });
    geleerde(ctx, 'snow', 230, 790, 330, { t, uit: 'denkt', pose: q.on('kaart', 1) > 0.5 && q.localT < q.at('hendel', 1) ? 'wijs' : 'staan' });
    const k = kaartSnow(ctx, 520, 240, 820, 600, t, { doden: ramp(q.localT, q.at('doden', 1), 5), a: q.on('kaart', 1), hendel: 1 - q.on('hendel', 1), water: q.on('water', 2) * (1 - q.on('hendel', 1)) });
    naamBij(ctx, 'Broad Street', null, k.px, k.py + 110, q.on('Broad', 1), 'center', C.goud); tag(ctx, 'cholera via water, niet via de lucht', 930, 300 - 20, C.teal, q.on('lucht', 1) * (1 - q.on('hendel', 1)), 'center', 28);
    laag(ctx, q.on('uitbraak', 1), () => { paneel(ctx, 1400, 300, 420, 330, 'cholera per dag', 1); const P = []; for (let i = 0; i <= 20; i++) { const x = 1440 + i * 17, y = 590 - 220 * Math.exp(-Math.pow((i - 5) / 3.5, 2)) - (i < 5 ? 0 : 0); P.push([x, y]); } lijn(ctx, P, C.koraal); ctx.save(); ctx.strokeStyle = C.goud; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1440 + 9 * 17, 380); ctx.lineTo(1440 + 9 * 17, 600); ctx.stroke(); ctx.restore(); regel(ctx, 'hendel weg', 1440 + 9 * 17, 650, 1, C.goud, 26, 'center', 700); });
    tag(ctx, 'bewezen was het nog niet', 1610, 720, C.koraal, q.on('bewezen', 1) * (1 - q.on('kaart', 2)), 'center', 26); tag(ctx, 'nu nog: zo onderzoek je een uitbraak', 1250, 870 - 20, C.groen, q.on('kaart', 2), 'center', 28); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const vac = q.on('vaccins', 1); tijdlijn(ctx, { span: [1847, 1945], jaar: q.on('Jenner', 1) > 0.5 ? 1796 : vac > 0.5 ? 1885 : 1862 });
    geleerde(ctx, 'pasteur', 230, 790, 330, { t, uit: 'neutraal', pose: q.on('fles', 1) > 0.5 && vac < 0.5 ? 'wijs' : 'staan' });
    laag(ctx, 1 - vac, () => { const kt = q.on('Kantelde', 1); zwanenhals(ctx, 760, 620, 1.3, q.on('fles', 1), { troebel: ramp(q.localT, q.at('bedierf', 1), 2), kantel: kt, t, stof: q.on('stof', 1) });
      tag(ctx, 'lucht kan erin', 1250, 330, C.teal, q.on('Lucht', 1) * (1 - q.on('stof', 1)), 'center', 30); tag(ctx, 'stof en kiemen blijven in de bocht', 1250, 330, C.oker, q.on('stof', 1) * (1 - kt), 'center', 30); tag(ctx, 'bouillon blijft helder', 960, 860 - 30, C.groen, q.on('helder', 1) * (1 - kt), 'center', 30); tag(ctx, 'gekanteld: bederft', 960, 860 - 30, C.koraal, kt * (1 - q.on('Leven', 2)), 'center', 30);
      tag(ctx, 'leven komt van ander leven', 1400, 520, C.groen, q.on('Leven', 2), 'center', 34); tag(ctx, 'veel ziektes: micro-organismen', 1400, 640, C.koraal, q.on('micro-organismen', 1), 'center', 32); });
    laag(ctx, vac, () => { spuit(ctx, 900, 520, 2, 1, -0.3); tag(ctx, 'vaccin tegen hondsdolheid · 1885', 960, 330, C.teal, 1, 'center', 34); tag(ctx, 'het idee: Edward Jenner · 1796', 1360, 700, C.goud, q.on('Jenner', 1), 'center', 32); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const ox = q.on('Oxford', 1); tijdlijn(ctx, { span: [1847, 1945], jaar: q.on('twaalf', 1) > 0.5 ? jaarNaar(q, 'twaalf', 1, 1928, 1940) : 1928 });
    geleerde(ctx, 'fleming', 230, 790, 330, { t, uit: q.on('niet', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); medaille(ctx, 230, 380, 1.1, q.on('Nobelprijs', 1));
    laag(ctx, 1 - 0.65 * ox, () => { const p = petrischaal(ctx, 800, 520, 250, q.on('kweekschaaltje', 1), { schimmel: q.on('schimmel', 1), zone: q.on('niet', 1), t }); naamBij(ctx, 'schimmel', null, p.sx, p.sy - 50, q.on('schimmel', 1), 'center', C.groen); naamBij(ctx, 'bacteriën', null, 960, 820, q.on('bacteriën', 1) * (1 - ox), 'center', C.oker);
      tag(ctx, 'penicilline', 1280, 360, C.groen, q.on('penicilline', 1), 'center', 38); tag(ctx, 'nog 12 jaar tot medicijn', 1280, 460, C.text2, q.on('twaalf', 1), 'center', 30); });
    laag(ctx, ox, () => { oxfordTeam(ctx, 1300, 760, 1, q.on('Nobelprijs', 1)); regel(ctx, 'Oxford', 1470, 330, 1, C.text2, 32, 'center', 700); });
    tag(ctx, 'te weinig slikken → resistente bacteriën', 960, 300 - 20, C.koraal, q.on('waarschuwde', 1), 'center', 30); },

  // ---------- H5 Leven veranderen ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const n = q.on('Nobelprijs', 1); tijdlijn(ctx, { span: [1952, 2018], jaar: n > 0.5 ? 1962 : q.on('1953', 1) > 0.5 ? 1953 : 1952 });
    const ov = q.on('overleden', 1), er = q.on('erkenning', 1);
    geleerde(ctx, 'franklin', 230, 790, 330, { t, a: 1 - 0.55 * ov * (1 - er), uit: q.on('Zonder', 1) > 0.5 && ov < 0.5 ? 'bezorgd' : 'neutraal', pose: q.on('foto', 1) > 0.5 && q.localT < q.at('Zonder', 1) ? 'wijs' : 'staan' }); human(ctx, 400, 800, 230, q.on('Gosling', 1) * (1 - q.on('Zonder', 1) * 0.6), C.mens); naamBij(ctx, 'Gosling', null, 400, 844, q.on('Gosling', 1) * (1 - q.on('Zonder', 1)), 'center');
    const fz = clamp((q.localT - q.at('zien', 1)) / 2, 0, 1); foto51(ctx, lerp(680, 1000, fz), lerp(460, 420, fz), lerp(260, 160, fz), q.on('röntgenfoto', 1)); laag(ctx, q.on('kruis', 1) * (1 - q.on('Zonder', 1)), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(580, 360); ctx.lineTo(780, 560); ctx.moveTo(780, 360); ctx.lineTo(580, 560); ctx.stroke(); tag(ctx, 'kruis = spiraal', 680, 650, C.goud, 1, 'center', 30); });
    laag(ctx, q.on('Zonder', 1), () => { human(ctx, 800, 790, 260, 1, C.mens); naamBij(ctx, 'collega (Wilkins)', null, 800, 834, 1, 'center'); tag(ctx, 'zonder dat zij het wist', 900, 300 - 20, C.koraal, 1 - q.on('Crick', 1), 'center', 28); pijl(ctx, 880, 520, 1100, 470, C.koraal, 1 - q.on('Crick', 1), 4, 16); });
    geleerde(ctx, 'watson', 1260, 790, 330, { t, kijk: 1, a: q.on('Watson', 1), uit: 'blij' }); geleerde(ctx, 'crick', 1700, 790, 330, { t, kijk: -1, a: q.on('Crick', 1), uit: 'blij' });
    helix(ctx, 1480, 500, 380, t, q.on('helix', 1), 70); tag(ctx, 'zo kopieer je DNA', 1480, 300 - 20, C.paars, q.on('gekopieerd', 1) * (1 - n), 'center', 30);
    for (const x of [800, 1260, 1700]) medaille(ctx, x, 470 - (x === 800 ? 0 : 60), 1.1, n * (1 - er * 0.3));
    tag(ctx, 'overleden in 1958, 37 jaar', 300, 330, C.text2, ov * (1 - er), 'center', 28); tag(ctx, 'erkenning pas veel later', 330, 330, C.goud, er, 'center', 32); },

  s25(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1952, 2018], jaar: q.on('1972', 1) > 0.5 ? 1972 : 1962 }); const [A, B, Cc] = fasen(q, [null, ['breekt', 1], ['baas', 1]]);
    laag(ctx, A, () => { const u = (q.localT * 0.12) % 1; vliegtuigje(ctx, lerp(500, 1700, u), 330, 1.4, 1); for (let k = 0; k < 40; k++) { const px = lerp(500, 1700, u) - 40 - hash(k) * 160, py = 360 + hash(k + 7) * 280; circ(ctx, px, py, 3, rgba(C.koraal, 0.5)); } ctx.fillStyle = rgba('#3A5540', 0.7); ctx.fillRect(480, 680, 1300, 40); tag(ctx, 'DDT', 1500, 820, C.koraal, q.on('DDT', 1), 'center', 34);
      geleerde(ctx, 'carson', 230, 790, 330, { t, a: q.on('Carson', 1), uit: 'denkt' }); laag(ctx, q.on('Silent', 1), () => { boek(ctx, 760, 560, 240, 300, '#4E6A46', 1); regel(ctx, 'Silent', 766, 540, 1, C.text, 34, 'center', 700); regel(ctx, 'Spring', 766, 584, 1, C.text, 34, 'center', 700); regel(ctx, '1962', 766, 650, 1, C.text2, 26, 'center', 600); tag(ctx, 'een stille lente, zonder vogels', 1200, 520, C.text2, 1, 'center', 30); }); });
    laag(ctx, B, () => { geleerde(ctx, 'carson', 230, 790, 330, { t, uit: 'praat', meta: '1962' }); const keten = [['water', 520], ['plankton', 820], ['vis', 1120], ['roofvogel', 1420]]; keten.forEach(([n, x], i) => { const a = ramp(q.localT, q.at('voedselketen', 1) + i * 0.4, 0.4); paneel(ctx, x - 120, 300, 240, 280, n, a); if (i === 2) visje(ctx, x, 460, 1.2, a, t); if (i === 3) roofvogel(ctx, x, 470, 1.1, a); if (i === 1) for (let k = 0; k < 6; k++) circ(ctx, x - 50 + (k % 3) * 50, 440 + Math.floor(k / 3) * 50, 12, rgba(C.groen, 0.6 * a)); for (let k = 0; k < [1, 3, 8, 18][i]; k++) circ(ctx, x - 90 + (k % 6) * 36, 540 + Math.floor(k / 6) * 0 - Math.floor(k / 6) * 26, 7, rgba(C.koraal, 0.85 * a)); if (i < 3) pijl(ctx, x + 125, 440, x + 175, 440, C.line, a, 3, 12); });
      tag(ctx, 'hoopt zich op', 970, 650, C.koraal, q.on('hoopt', 1), 'center', 30); laag(ctx, q.on('schalen', 1), () => { ei(ctx, 1640, 460, 1.6, 1, 1); regel(ctx, 'te dunne schaal', 1650, 560, 1, C.koraal, 28, 'center', 700); });
      tag(ctx, 'industrie valt haar aan', 1000, 780, C.koraal, q.on('industrie', 1) * (1 - q.on('voorzichtigheid', 1)), 'center', 28); tag(ctx, 'geen verbod op alle gif: voorzichtig gebruik', 1000, 780, C.oker, q.on('voorzichtigheid', 1) * (1 - q.on('milieubeweging', 1)), 'center', 28); tag(ctx, 'milieubeweging · 1972 DDT verboden in de VS-landbouw', 1060, 780, C.groen, q.on('milieubeweging', 1), 'center', 28); });
    laag(ctx, Cc, () => { voedselweb(ctx, 1100, 520, 1.25, 1); tag(ctx, 'de mens zit middenin', 1100, 870 - 20, C.goud, q.on('middenin', 1), 'center', 32); geleerde(ctx, 'carson', 230, 790, 330, { t, uit: 'blij' }); }); },

  s26(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Artsen', 1]]); tijdlijn(ctx, { span: [1952, 2018], jaar: q.on('2018', 1) > 0.5 ? 2018 : q.on('Nobelprijs', 1) > 0.5 && q.localT < q.at('Artsen', 1) ? 2020 : 2012 });
    laag(ctx, A, () => { geleerde(ctx, 'charpentier', 230, 790, 330, { t, uit: 'blij' }); geleerde(ctx, 'doudna', 470, 790, 330, { t, uit: 'blij' }); const kn = q.on('knippen', 1);
      dnaStreng(ctx, 760, 520, 900, 1, ease((q.localT - q.at('knippen', 1)) / 0.8)); schaar(ctx, 1210, 420 - 60 * (1 - kn), 1.2, kn > 0.5 ? 0.1 + 0.3 * Math.abs(Math.sin(t * 3)) : 0.5, q.on('manier', 1)); tag(ctx, 'CRISPR: systeem uit bacteriën', 1210, 700, C.paars, q.on('CRISPR', 1), 'center', 32); medaille(ctx, 350, 380, 1.1, q.on('Nobelprijs', 1)); regel(ctx, 'Nobelprijs 2020', 350, 330, q.on('Nobelprijs', 1), C.goud, 28, 'center', 700); });
    laag(ctx, B, () => { paneel(ctx, 200, 260, 720, 560, 'patiënt met sikkelcelziekte', 1); cellenKlomp(ctx, 560, 540, 170, 40, 1, (k) => k % 5 === 0); regel(ctx, 'alleen bloedstamcellen', 560, 780, q.on('bloedstamcellen', 1), C.paars, 30, 'center', 700);
      const em = q.on('embryo', 1); paneel(ctx, 1000, 260, 720, 560, 'embryo · 2018', em); cellenKlomp(ctx, 1360, 520, 150, 16, em, () => true); laag(ctx, q.on('tweeling', 1), () => { human(ctx, 1600, 790, 110, 1, C.paars); human(ctx, 1670, 790, 110, 1, C.paars); regel(ctx, 'tweeling', 1635, 330, 1, C.paars, 28, 'center', 700); }); vraagteken(ctx, 960, 560, q.on('verschil', 1), 120); }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { span: [1952, 2018], jaar: 2018 });
    paneel(ctx, 150, 310, 780, 560, 'patiënt', 1); cellenKlomp(ctx, 400, 540, 140, 30, 1, (k) => k % 5 === 0); human(ctx, 720, 760, 160, 1, C.mens); regel(ctx, 'kind', 720, 800, 1, C.text2, 26, 'center', 600); pijl(ctx, 560, 620, 660, 680, C.line, 1, 3, 12); tag(ctx, 'niet erfelijk', 540, 850, C.groen, q.on('door', 1), 'center', 30);
    const em = q.on('embryo', 1); paneel(ctx, 990, 310, 780, 560, 'embryo', em); cellenKlomp(ctx, 1200, 540, 120, 20, em, () => true);
    laag(ctx, q.on('generaties', 1), () => { const L = [[1540, 420], [1460, 560], [1620, 560], [1420, 700], [1500, 700], [1580, 700], [1660, 700]]; ctx.strokeStyle = C.line; ctx.lineWidth = 2; [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(L[a][0], L[a][1] + 30); ctx.lineTo(L[b][0], L[b][1] - 34); ctx.stroke(); }); L.forEach(([x, y], i) => human(ctx, x, y + 34, i ? 70 : 90, ramp(q.localT, q.at('generaties', 1) + i * 0.15, 0.3), C.paars)); tag(ctx, 'erfelijk: alle volgende generaties', 1380, 850, C.koraal, 1, 'center', 28); });
    tag(ctx, 'gevolgen onbekend · de tweeling kon niet kiezen', 960, 300 - 20, C.koraal, q.on('kiezen', 1) * (1 - q.on('cel', 5)), 'center', 28); tag(ctx, '3 jaar cel', 960, 300 - 20, C.text2, q.on('cel', 5) * (1 - q.on('Nederland', 1)), 'center', 30); tag(ctx, 'in Nederland verboden (Embryowet)', 960, 300 - 20, C.goud, q.on('Nederland', 1), 'center', 30); },

  // ---------- Recap ----------
  s29(ctx, t, q) { bg(ctx, 'schema'); tijdlijn(ctx, { alles: 1 }); const [A, B, Cc] = fasen(q, [null, ['elke', 1], ['mensenwerk', 1]]);
    laag(ctx, A, () => { tag(ctx, 'zelf kijken · meten · laten nadoen', 960, 300, C.goud, q.on('zelf', 2), 'center', 40);
      const M = [['vesalius', 'zelf kijken', 'Vesalius'], ['harvey', 'rekenen', 'Harvey'], ['snow', 'een kaart', 'Snow'], ['pasteur', 'een slimme proef', 'Pasteur']]; M.forEach(([id, wat, w], i) => { const x = 330 + i * 420, a = q.on(w, 1); geleerde(ctx, id, x, 760, 300, { t, a, naam: false }); naamBij(ctx, NAMEN[id][0], wat, x, 804, a, 'center'); });
      skelet(ctx, 470, 560, 160, q.on('Vesalius', 1), C.text2); hart(ctx, 890, 500, 0.6, t, q.on('Harvey', 1)); pomp(ctx, 1320, 600, 0.5, q.on('Snow', 1)); zwanenhals(ctx, 1720, 560, 0.45, q.on('Pasteur', 1), { t }); });
    laag(ctx, B, () => { const l = q.on('elke', 1), s = q.on('stamboom', 1), v = q.on('voedselweb', 1); ladder(ctx, 400, 760, 400, l, { mensA: 1 }); pijl(ctx, 600, 560, 720, 560, C.goud, s, 4, 18); stamboom(ctx, 960, 780, 400, 460, s, { groei: 1, mensA: 1 }); pijl(ctx, 1200, 560, 1320, 560, C.goud, v, 4, 18); voedselweb(ctx, 1560, 540, 0.9, v);
      regel(ctx, 'top van de ladder', 400, 820, l, C.text2, 28, 'center', 700); regel(ctx, 'takje aan de stamboom', 960, 820, s, C.text2, 28, 'center', 700); regel(ctx, 'plek in het voedselweb', 1560, 820, v, C.text2, 28, 'center', 700); tag(ctx, 'de mens is geen middelpunt', 960, 300, C.goud, q.on('middelpunt', 1), 'center', 40); });
    laag(ctx, Cc, () => { const E = [['nafis', 'Ibn al-Nafis'], ['wallace', 'Wallace'], ['franklin', 'Franklin']]; E.forEach(([id], i) => { geleerde(ctx, id, 360 + i * 300, 760, 300, { t, a: q.on('erkenning', 1) }); });
      tag(ctx, 'te weinig erkenning', 660, 300, C.goud, q.on('erkenning', 1), 'center', 34); geleerde(ctx, 'galton', 1500, 760, 300, { t, a: q.on('misbruikt', 1), meta: 'eugenetica' }); tag(ctx, 'misbruik', 1500, 300, C.koraal, q.on('misbruikt', 1), 'center', 34);
      vraagteken(ctx, 1150, 560, q.on('weten', 2), 140); }); },
};

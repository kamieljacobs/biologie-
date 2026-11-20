// Wat word jij? · Sport en topsport 9 · Topsport en school — eigen tekeningen (20 nov 2026)
// Kleuren (storyboard): teal = herstel en slaap · oker = training · paars = school, stress · koraal = let op, blessure · goud = het plan · groen = energie.
// Vaste elementen: de terugspoelbalk bovenin (SP9_spoel) en de stapel 'TOTALE BELASTING' (SP9_stapel, label MODEL). Geen weegschaal (film 4).
// Geen namen in beeld. Decors vlak getekend (bad, slaapkamer, lokaal, mentorkamer); schema's op navy.

const SP9 = { water: '#2C5F80', waterD: '#244E6A', waterL: '#5BA4C9', tegel: '#3A4E6C', tegelL: '#4A6080', dek: '#4C5C74', dekL: '#5E7088',
  muur: '#22314C', vloer: '#1E2A40', hout: '#6A5440', houtL: '#8A7058', papier: '#F2F2EE', inkt: '#121A26', scherm: '#151D2C', sil: '#3A4862' };
const SP9_SPOEL = ['DO', 'WO 05:00', 'DE NACHT', 'MA', '3 WEKEN EERDER'];

// pyjama zoals in film 4 (alleen kleding)
if (CAST.sam && CAST.sam.garderobe && !CAST.sam.garderobe.pyjama) CAST.sam.garderobe.pyjama = { top: 'tshirt', topKleur: '#6F86B8', topAccent: '#5A70A0', broek: '#5A70A0' };

// ---------- algemene hulpjes ----------
function SP9_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 205, a, C.groen, 40, 'left', 700); }
function SP9_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP9_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP9_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP9_kaart(ctx, x, y, w, h, a = 1, rand = C.line, vul = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, vul || rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
function SP9_label(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 44; ctx.letterSpacing = '0px';
  const x0 = al === 'right' ? x - w : al === 'center' ? x - w / 2 : x; roundRect(ctx, x0, y - px - 12, w, px + 30, 10); shape(ctx, rgba('#0D1420', 0.88), rgba(col, 0.7), 1.5); metaText(ctx, s2, x0 + 22, y, col, 'left', px); ctx.restore(); return w; }
function SP9_lijn(ctx, pts, col, lw = 4, a = 1, dash = null) { if (a <= 0.01 || pts.length < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP9_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }

// ---------- terugspoelbalk bovenin ----------
// n = aantal getoonde stappen (1..5, fractioneel = de nieuwste schuift in); o.tik = 0..1 (icoon knippert), o.iconen = true (recap: kleine pictogrammen eronder)
function SP9_spoel(ctx, n, a = 1, o = {}) { if (a <= 0.01) return; const y = 124; ctx.save(); ctx.globalAlpha *= a;
  // terugspoel-icoon (twee driehoekjes naar links)
  const ik = 1 + 0.25 * Math.sin((o.tik || 0) * Math.PI); ctx.save(); ctx.translate(136, y - 10); ctx.scale(ik, ik); ctx.fillStyle = C.goud;
  for (const dx of [0, 22]) { ctx.beginPath(); ctx.moveTo(-12 + dx - 10, 0); ctx.lineTo(10 + dx - 10, -14); ctx.lineTo(10 + dx - 10, 14); ctx.closePath(); ctx.fill(); } ctx.restore();
  let x = 186; const kl = Math.ceil(n - 0.001);
  for (let i = 0; i < Math.min(5, kl); i++) { const f = i < kl - 1 ? 1 : clamp(n - i, 0, 1); if (f <= 0.01) break; const act = i === kl - 1;
    ctx.save(); ctx.globalAlpha *= f;
    if (i > 0) { ctx.strokeStyle = rgba(C.text2, 0.8); ctx.fillStyle = rgba(C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 44, y - 10); ctx.lineTo(x + 10, y - 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 4, y - 10); ctx.lineTo(x + 16, y - 18); ctx.lineTo(x + 16, y - 2); ctx.closePath(); ctx.fill(); x += 60; }
    ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(SP9_SPOEL[i]).width; ctx.letterSpacing = '0px';
    if (act && !o.alles) { roundRect(ctx, x - 14, y - 42, w + 28, 52, 10); shape(ctx, rgba(C.goud, 0.14), rgba(C.goud, 0.8), 2); }
    metaText(ctx, SP9_SPOEL[i], x, y, act && !o.alles ? C.goud : C.text2, 'left', 28);
    if (o.iconen) SP9_spoelIcoon(ctx, i, x + w / 2, y + 70);
    ctx.restore(); x += w + 16; }
  ctx.restore(); }
function SP9_spoelIcoon(ctx, i, x, y) { ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round';
  if (i === 0) { circ(ctx, x, y, 22, rgba(C.koraal, 0.25), C.koraal, 3); metaText(ctx, 'SCHOUDER', x, y + 58, C.koraal, 'center', 22); }
  if (i === 1) { roundRect(ctx, x - 40, y - 20, 80, 40, 8); shape(ctx, '#10161F', '#4A5468', 2); text(ctx, '05:00', x, y + 9, fMeta(22), C.koraal, 'center'); metaText(ctx, 'WEKKER', x, y + 58, C.text2, 'center', 22); }
  if (i === 2) { circ(ctx, x, y, 20, '#E8E2C8'); circ(ctx, x + 9, y - 6, 18, C.bg || '#0F1626'); metaText(ctx, 'KORT', x, y + 58, C.teal, 'center', 22); }
  if (i === 3) { roundRect(ctx, x - 18, y - 24, 36, 48, 4); shape(ctx, SP9.papier, '#9AA3B2', 2); ctx.fillStyle = C.paars; ctx.fillRect(x - 18, y - 24, 36, 10); metaText(ctx, 'TOETS', x, y + 58, C.paars, 'center', 22); }
  if (i === 4) { for (const [dx, k] of [[-24, C.paars], [8, C.oker]]) { roundRect(ctx, x + dx - 4, y - 22, 34, 44, 4); shape(ctx, '#1B2438', k, 2.5); } metaText(ctx, 'ROOSTERS', x, y + 58, C.text2, 'center', 22); }
  ctx.restore(); }

// ---------- de stapel 'TOTALE BELASTING' (model) ----------
// blokken: [{t1, t2, kl, h, a, leeg}] van onder naar boven; a = 0..1 (valt erop). o: titel (0..1), model (label), w
function SP9_stapel(ctx, x, yb, blokken, a = 1, o = {}) { if (a <= 0.01) return; const w = o.w || 440; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, yb); ctx.lineTo(x + w + 20, yb); ctx.stroke();
  let y = yb; for (const b of blokken) { const ba = b.a == null ? 1 : b.a; if (ba <= 0.01) continue; const h = (b.h || 100) * (b.krimp == null ? 1 : b.krimp), drop = (1 - ease(clamp(ba * 1.25, 0, 1))) * 260;
    const yy = y - h - drop; ctx.save(); ctx.globalAlpha *= clamp(ba * 3, 0, 1);
    roundRect(ctx, x, yy + 4, w, h - 8, 12);
    if (b.leeg) { ctx.save(); ctx.setLineDash([12, 10]); shape(ctx, rgba('#0D1420', 0.6), rgba(C.goud, 0.9), 3); ctx.restore(); vraagteken(ctx, x + w / 2, yy + h / 2 + 30, 1, 80); }
    else { shape(ctx, rgba(b.kl, 0.24), b.kl, 3); const twee = b.t2 && h >= 84; text(ctx, b.t1, x + 26, yy + (twee ? h / 2 - 2 : h / 2 + 12), fTekst(h < 70 ? 28 : 34, 800), C.text, 'left'); if (twee) metaText(ctx, b.t2, x + 26, yy + h / 2 + 32, b.kl, 'left', 19); }
    ctx.restore(); y = y - h * clamp(ba * 1.25, 0, 1); }
  if (o.titel !== 0) SP9_laag(ctx, o.titel == null ? 1 : o.titel, () => { metaText(ctx, 'TOTALE BELASTING', x, (o.titelY != null ? o.titelY : y - 28), C.goud, 'left', 28); });
  if (o.model !== false) metaText(ctx, 'MODEL', x + w, yb + 40, C.grain, 'right', 24);
  ctx.restore(); return y; }
// standaardblokken
const SP9_B = { training: { t1: 'TRAINING', t2: 'ZELFDE ALS DE WEKEN ERVOOR', kl: C.oker, h: 120 }, slaap: { t1: 'MINDER SLAAP', kl: C.koraal, h: 96 },
  toets: { t1: 'TOETSEN · STRESS', kl: C.paars, h: 96 }, leeg: { leeg: true, h: 96 } };
function SP9_blok(naam, a = 1, extra = {}) { return Object.assign({}, SP9_B[naam], { a }, extra); }

// ---------- klok (digitaal) ----------
function SP9_digi(ctx, x, y, s2, a = 1, kl = C.koraal, px = 48, schud = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + Math.sin(schud * 60) * 5 * (schud > 0 ? 1 : 0), y); ctx.font = fMeta(px); const w = ctx.measureText(s2).width + 60;
  roundRect(ctx, -w / 2, -px - 14, w, px + 36, 14); shape(ctx, '#0F1626', '#56627E', 3); text(ctx, s2, 0, 6, fMeta(px), kl, 'center'); ctx.restore(); }

// ---------- zwembad zijaanzicht (s01) ----------
function SP9_badZij(ctx, muur, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, wl - 120);
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(muur + 200 + i * 190, 170, 110, 70); }
  ctx.fillStyle = SP9.dek; ctx.fillRect(0, wl - 26, muur, 26); ctx.fillStyle = SP9.dekL; ctx.fillRect(0, wl - 26, muur, 5);
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, muur - 120, wl - 96, 118, 22, 6); ctx.fill(); ctx.fillStyle = '#8A93A6'; ctx.fillRect(muur - 100, wl - 74, 18, 48); ctx.fillRect(muur - 40, wl - 74, 18, 48);
  ctx.restore(); }
function SP9_water(ctx, x0, wl, t = 0, golf = 0, gx = 0, achter = false) { ctx.save(); ctx.fillStyle = SP9.water; ctx.beginPath(); ctx.moveTo(x0, 876);
  const Y = x => { const d = Math.abs(x - gx), g = golf * 8 * Math.exp(-d / 220) * Math.sin(d / 22 - t * 6); return wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g; };
  for (let x = x0; x <= W; x += 12) ctx.lineTo(x, Y(x)); ctx.lineTo(W, 876); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= W; x += 12) x === x0 ? ctx.moveTo(x, Y(x)) : ctx.lineTo(x, Y(x)); ctx.stroke();
  for (let i = 0; i < 5; i++) { const x = x0 + 160 + i * 300 + Math.sin(t * 0.5 + i) * 20; ctx.strokeStyle = rgba(SP9.waterL, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, wl + 60 + (i % 3) * 50); ctx.lineTo(x + 90, wl + 60 + (i % 3) * 50); ctx.stroke(); }
  ctx.restore(); }
function SP9_lijnen(ctx, x0, wl) { ctx.save(); for (let x = x0 + 20; x < W; x += 34) circ(ctx, x, wl - 2, 9, (Math.floor((x - x0) / 34) % 6 < 3) ? '#C9454A' : '#E8E2D4'); ctx.restore(); }
function SP9_kopwand(ctx, muur, wl) { ctx.save(); ctx.fillStyle = SP9.tegel; ctx.fillRect(muur - 30, wl - 26, 30, 876 - wl + 26); ctx.strokeStyle = SP9.tegelL; ctx.lineWidth = 1.5; for (let y = wl; y < 876; y += 30) { ctx.beginPath(); ctx.moveTo(muur - 30, y); ctx.lineTo(muur, y); ctx.stroke(); } ctx.restore(); }

// ---------- badrand vooraanzicht (s03, s04, s06, s14, s17) ----------
function SP9_badrand(ctx, zit, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, zit - 140);
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(60 + i * 240, 170, 150, 90); }
  ctx.fillStyle = SP9.dek; ctx.fillRect(0, zit - 70, W, 70); ctx.fillStyle = SP9.dekL; ctx.fillRect(0, zit - 4, W, 6);
  ctx.fillStyle = SP9.tegel; ctx.fillRect(0, zit + 2, W, wl - zit); ctx.strokeStyle = SP9.tegelL; ctx.lineWidth = 1.5;
  for (let y = zit + 30; y < wl; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, zit + 2); ctx.lineTo(x, wl); ctx.stroke(); }
  ctx.restore(); }
function SP9_waterFront(ctx, wl, t = 0) { ctx.save(); ctx.fillStyle = SP9.water; ctx.beginPath(); ctx.moveTo(0, 876); for (let x = 0; x <= W; x += 16) ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.lineTo(W, 876); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) x ? ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3) : ctx.moveTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.stroke();
  ctx.restore(); }
function SP9_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + s * hh * 0.9, sy - hh * 0.2, x + s * hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + s * hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + s * hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + s * hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + s * hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + s * hh * 0.95, sy + hh * 0.7, x + s * hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore(); }
// telefoon in de hand (hold)
function SP9_telHand(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); roundRect(ctx, -16, -52, 32, 60, 6); shape(ctx, '#1E2230', '#56627E', 2); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(-12, -46, 24, 46); ctx.restore(); }
function SP9_pen(ctx, x, y, an, tik = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.9 + Math.sin(tik * 18) * 0.12 * (tik > 0 ? 1 : 0)); roundRect(ctx, -5, -62, 10, 70, 4); shape(ctx, '#2F5FA8', '#1E3A6A', 1.5); ctx.restore(); }

// ---------- tablet ----------
// tekent het kader en roept inhoud(x0, y0, w, h) aan binnen het scherm
function SP9_tablet(ctx, x, y, w, h, a = 1, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 26); shape(ctx, '#0B0F17', '#56627E', 4);
  roundRect(ctx, x + 20, y + 20, w - 40, h - 40, 14); shape(ctx, SP9.scherm, null); if (inhoud) { ctx.save(); roundRect(ctx, x + 20, y + 20, w - 40, h - 40, 14); ctx.clip(); inhoud(x + 20, y + 20, w - 40, h - 40); ctx.restore(); } ctx.restore(); }
// staafgrafiek trainingsbelasting per week (4 oker staven); laatste = 0..1 hoogte van de toetsweek-staaf; o.chips = [a PECH/TRAINING]
function SP9_weekGrafiek(ctx, x, y, w, h, laatste = 1, o = {}) { const base = y + h - 70, top = y + 90, n = 4, bw = Math.min(150, w / n * 0.5), hv = (base - top) * 0.78;
  metaText(ctx, 'TRAININGSBELASTING PER WEEK', x + 30, y + 52, C.oker, 'left', 26);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 40, top - 10); ctx.lineTo(x + 40, base); ctx.lineTo(x + w - 30, base); ctx.stroke();
  const labels = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'TOETSWEEK'];
  for (let i = 0; i < n; i++) { const cx = x + 40 + (w - 70) * (i + 0.5) / n, hh = hv * (i === 3 ? laatste : 1);
    if (hh > 1) { roundRect(ctx, cx - bw / 2, base - hh, bw, hh, 6); shape(ctx, rgba(C.oker, i === 3 ? 0.75 : 0.55), C.oker, 2); }
    if (i === 3 && o.streep) SP9_lijn(ctx, [[x + 44, base - hv], [x + w - 34, base - hv]], C.oker, 2, o.streep, [10, 8]);
    metaText(ctx, labels[i], cx, base + 40, i === 3 ? C.paars : C.text2, 'center', 22);
    if (o.chips) for (const [k, s2] of [[0, 'PECH'], [1, 'TRAINING']]) SP9_laag(ctx, o.chips, () => { roundRect(ctx, cx - 64, base - hv + 14 + k * 44, 128, 36, 8); shape(ctx, '#2A3242', '#6A7286', 1.5); metaText(ctx, s2, cx, base - hv + 40 + k * 44, '#AEB6C4', 'center', 18); }); } }
// ochtendlijst: drie lijnen over de week (ma = index 0..4); voort = 0..1 hoeveel van de week getekend
function SP9_ochtend(ctx, x, y, w, h, voort = 1, o = {}) { metaText(ctx, 'OCHTENDLIJST', x + 30, y + 52, C.teal, 'left', 26);
  const vr = ['HOE SLIEP JE?', 'HOEVEEL ENERGIE?', 'HOEVEEL DRUK VAN SCHOOL?']; if (o.vragen !== false) vr.forEach((s2, i) => SP9_laag(ctx, o.vragenA ? o.vragenA[i] : 1, () => metaText(ctx, (i + 1) + '  ' + s2, x + 30, y + 100 + i * 40, C.text, 'left', 22)));
  const gx0 = x + 60, gx1 = x + w - 40, gy0 = y + (o.vragen === false ? 90 : 240), gy1 = y + h - 60; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  const dag = ['VR', 'ZA', 'ZO', 'MA', 'DI', 'WO', 'DO']; dag.forEach((d, i) => metaText(ctx, d, gx0 + (gx1 - gx0) * (i + 0.5) / 7, gy1 + 34, d === 'MA' ? C.paars : C.text2, 'center', 20));
  const X = i => gx0 + (gx1 - gx0) * (i + 0.5) / 7, Y = v => gy1 - (gy1 - gy0) * v;
  const reeks = [['SLAAP', C.teal, [0.78, 0.8, 0.82, 0.62, 0.5, 0.36, 0.42]], ['ENERGIE', C.groen, [0.72, 0.75, 0.76, 0.6, 0.48, 0.34, 0.3]], ['DRUK VAN SCHOOL', C.paars, [0.25, 0.18, 0.3, 0.7, 0.78, 0.84, 0.8]]];
  const n = 1 + voort * 6; reeks.forEach(([lab, kl, v], k) => { const pts = []; for (let i = 0; i < 7; i++) { if (i > n) break; const f = Math.min(1, n - i + 1); pts.push([X(i - 1 + f), Y(i ? lerp(v[i - 1], v[i], f) : v[0])]); } SP9_lijn(ctx, pts, o.kleur ? o.kleur[k] || kl : kl, 5);
    if (voort > 0.95 && o.labels !== false) metaText(ctx, lab, X(6) + 4, Y(v[6]) + (k === 0 ? -14 : k === 1 ? 30 : -16), kl, 'right', 20); });
}

// ---------- slaapkamer ----------
function SP9_kamer(ctx, licht = 0) { bg(ctx, 'schema'); ctx.fillStyle = SP9_mix('#141D30', '#2A3A58', licht); ctx.fillRect(0, 120, W, 720); ctx.fillStyle = '#20273A'; ctx.fillRect(0, 840, W, 36);
  roundRect(ctx, 380, 200, 280, 230, 10); shape(ctx, '#0B1222', '#3E4A64', 8); ctx.fillStyle = '#3E4A64'; ctx.fillRect(516, 200, 8, 230); ctx.fillRect(380, 312, 280, 8);
  circ(ctx, 600, 250, 22, '#E8E2C8'); circ(ctx, 590, 243, 20, '#0B1222'); for (let i = 0; i < 6; i++) circ(ctx, 410 + hash(i) * 90, 220 + hash(i * 3) * 70, 2.5, '#C9CED6'); }
// bed met liggend personage (gedraaid); uit = 'slaapt' | 'neutraal' (ogen open)
function SP9_bed(ctx, id, x, y, h, o = {}) { const { t = 0, deken = '#4A6FA0', outfit = 'pyjama', uit = 'slaapt' } = o; ctx.save();
  const L = (CAST[id].lengte || 1), hh = h * L / 6.1, len = h * L;
  roundRect(ctx, x - 60, y, len + 150, 70, 14); shape(ctx, '#5E4A36', '#3E3024', 2); roundRect(ctx, x - 80, y - 150, 34, 260, 10); shape(ctx, '#6B5338', '#3E3024', 2);
  roundRect(ctx, x - 40, y - 12, len + 100, 26, 10); shape(ctx, '#E6E1D3', '#C9C2B4', 1.5);
  roundRect(ctx, x - 40, y - hh * 1.6, hh * 2.4, hh * 1.5, hh * 0.6); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  const br = Math.sin(t * 1.4) * 0.012; ctx.save(); ctx.translate(x + len + 10, y - hh * 0.98); ctx.rotate(-Math.PI / 2); ctx.scale(1 + br, 1);
  persoon(ctx, id, 0, 0, h, { uit, t, outfit }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x + hh * 2.1, y - hh * 0.2); ctx.bezierCurveTo(x + hh * 2.4, y - hh * 2.4, x + len * 0.75, y - hh * 2.2, x + len + 60, y - hh * 1.3); ctx.lineTo(x + len + 70, y + 14); ctx.lineTo(x + hh * 2.1, y + 14); ctx.closePath(); shape(ctx, deken, _donker(deken, 0.25), 2);
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + hh * 2.1 + i * len * 0.18, y - hh * (1.9 - i * 0.12)); ctx.lineTo(x + hh * 2.1 + i * len * 0.18, y + 10); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: x + hh * 0.55, y: y - hh * 0.98 }, hh }; }
function SP9_nachtkastje(ctx, x, y, w = 200, h = 170) { roundRect(ctx, x, y, w, h, 8); shape(ctx, '#6B5338', '#3E3024', 2); ctx.fillStyle = '#5A4630'; ctx.fillRect(x + 14, y + 30, w - 28, 4); circ(ctx, x + w / 2, y + 70, 6, '#C9A35C'); }
// biologische klok (zoomcirkel): wijzerplaat, gouden sector 'moe' die met schuif (0..1) een uur opschuift
function SP9_bioklok(ctx, x, y, r, schuif = 0) { circ(ctx, x, y, r, '#1B2236', '#9AA3B2', 4);
  for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 - Math.PI / 2; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.82, y + Math.sin(an) * r * 0.82); ctx.lineTo(x + Math.cos(an) * r * 0.94, y + Math.sin(an) * r * 0.94); ctx.stroke(); }
  const uur = 10 + schuif, an0 = (uur - 0.5) / 12 * 6.283 - Math.PI / 2, an1 = (uur + 0.5) / 12 * 6.283 - Math.PI / 2;
  ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, an0, an1); ctx.closePath(); ctx.fill();
  const an = uur / 12 * 6.283 - Math.PI / 2; ctx.strokeStyle = C.teal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.62, y + Math.sin(an) * r * 0.62); ctx.stroke(); circ(ctx, x, y, 8, C.teal);
  text(ctx, 'MOE', x + Math.cos(an) * r * 0.42 + 14, y + Math.sin(an) * r * 0.42 + 40, fMeta(22), C.text, 'center'); }

// ---------- nacht-tijdlijn (s08, s10, s11) ----------
// tijd in uren vanaf 20:00 (0..14 → 20:00..10:00)
function SP9_nachtAs(ctx, x0, x1, y, van = 20, tot = 10, a = 1, stap = 2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const span = (tot + 24 - van) % 24; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (let u = 0; u <= span; u += stap) { const xx = x0 + (x1 - x0) * u / span; ctx.beginPath(); ctx.moveTo(xx, y - 8); ctx.lineTo(xx, y + 8); ctx.stroke(); metaText(ctx, String((van + u) % 24).padStart(2, '0') + ':00', xx, y + 40, C.text2, 'center', 20); }
  ctx.restore(); return u => x0 + (x1 - x0) * (((u - van + 24) % 24) / span); }
function SP9_maan(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#E8E2C8'); circ(ctx, x + r * 0.45, y - r * 0.3, r * 0.9, '#0F1626'); ctx.restore(); }

// ---------- klaslokaal ----------
function SP9_lokaal(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#26344F'; ctx.fillRect(0, 120, 1380, 700); ctx.fillStyle = '#20293C'; ctx.fillRect(0, 820, 1380, 56);
  roundRect(ctx, 380, 250, 640, 220, 8); shape(ctx, '#2E5A4A', '#6B5338', 10); metaText(ctx, 'TOETS', 700, 305, rgba('#F2F2EE', 0.55), 'center', 28);
  ctx.strokeStyle = rgba('#F2F2EE', 0.3); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(450, 360 + i * 36); ctx.lineTo(450 + 300 + i * 60, 360 + i * 36); ctx.stroke(); }
  klokje(ctx, 1200, 250, 44, 0.3, 1); ctx.restore(); }
function SP9_tafel(ctx, x, y, w, vloer = 820) { ctx.save(); roundRect(ctx, x - w / 2, y, w, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(x - w / 2 + 10, y + 22, 14, vloer - y - 22); ctx.fillRect(x + w / 2 - 24, y + 22, 14, vloer - y - 22);
  ctx.fillStyle = '#4A5A7C'; ctx.fillRect(x - w / 2 + 20, y + 22, w - 40, 60); ctx.restore(); }
function SP9_toetsblad(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.06); ctx.scale(s, s); ctx.fillStyle = SP9.papier; ctx.fillRect(-46, -8, 92, 16); ctx.restore(); }

// ---------- mentorkamer ----------
function SP9_kamerMentor(ctx, vloer = 820) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#2A3550'; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = '#20293C'; ctx.fillRect(0, vloer, W, 876 - vloer); ctx.fillStyle = '#34445F'; ctx.fillRect(0, vloer - 8, W, 8);
  // prikbord en kast
  roundRect(ctx, 120, 200, 300, 210, 8); shape(ctx, '#8A6A48', '#6A5034', 6); for (let i = 0; i < 5; i++) { ctx.fillStyle = ['#F2F2EE', '#E0B64A', '#9CC4DC', '#F2F2EE', '#E07A5F'][i]; ctx.save(); ctx.translate(160 + (i % 3) * 85, 240 + Math.floor(i / 3) * 90); ctx.rotate((hash(i) - 0.5) * 0.3); ctx.fillRect(0, 0, 60, 60); ctx.restore(); }
  ctx.restore(); }
// laptop op tafel met de zwemtrainer in beeld (videogesprek); x = midden, y = tafelblad
function SP9_laptopTrainer(ctx, x, y, t, a = 1, s = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(130, 0); ctx.lineTo(110, -14); ctx.lineTo(-110, -14); ctx.closePath(); ctx.fill();
  roundRect(ctx, -120, -190, 240, 176, 10); shape(ctx, '#2A3040', '#5A6070', 3); ctx.save(); roundRect(ctx, -110, -180, 220, 156, 6); ctx.clip(); ctx.fillStyle = '#2A4A66'; ctx.fillRect(-110, -180, 220, 156);
  persoon(ctx, 'zwemtrainer', 0, 60, 260, { uit: Math.sin(t * 7) > 0.2 ? 'praat' : 'neutraal', t }); ctx.restore(); ctx.restore(); }

// ---------- roosters ----------
// soort 'toets' (paars) of 'training' (oker); o.schuif = 0..1 (toets DO → VR, training WO 05:30 → middag), o.dicht = compact
const SP9_DAG = ['MA', 'DI', 'WO', 'DO', 'VR'];
function SP9_rooster(ctx, x, y, w, h, soort, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, SP9.papier, soort === 'toets' ? C.paars : C.oker, 3);
  ctx.fillStyle = soort === 'toets' ? C.paars : C.oker; roundRect(ctx, x, y, w, 50, 12); ctx.fill(); ctx.fillRect(x, y + 30, w, 20);
  text(ctx, soort === 'toets' ? 'TOETSROOSTER' : (o.kop || 'TRAININGSPLAN'), x + 24, y + 36, fMeta(24), '#0F1626', 'left');
  const cw = (w - 100) / 5, x0 = x + 80, yy = y + 90, rh = (h - 120) / 2;
  SP9_DAG.forEach((d, i) => metaText(ctx, d, x0 + cw * (i + 0.5), yy, '#56627E', 'center', 22));
  const rij = (r, lab) => metaText(ctx, lab, x + 16, yy + 30 + rh * (r + 0.55), '#56627E', 'left', 20);
  const cel = (i, r, s2, kl, f = 1) => { const cx = x0 + cw * i + 8, cy = yy + 22 + rh * r + 6; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, cx, cy, cw - 16, rh - 14, 8); shape(ctx, rgba(kl, 0.3), kl, 2.5); text(ctx, s2, cx + (cw - 16) / 2, cy + (rh - 14) / 2 + 10, fTekst(Math.min(26, rh * 0.32), 800), '#121A26', 'center'); ctx.restore(); };
  if (soort === 'toets') { rij(0, 'OCHT'); rij(1, 'MID'); const sc = o.schuif || 0;
    cel(0, 0, 'toets', C.paars); cel(2, 0, 'toets', C.paars); cel(3 + sc, 0, 'toets', C.paars); }
  else { rij(0, '05:30'); rij(1, '16:00'); const sc = o.schuif || 0;
    cel(2, 0, 'zwem', sc > 0 ? SP9_mix('#D4A24A', '#E0B64A', sc) : C.oker, 1 - sc); if (sc > 0) cel(2, 1, 'zwem', C.goud, sc);
    cel(4, 0, 'zwem', C.oker); for (const i of [0, 1, 3]) cel(i, 1, 'zwem', C.oker); }
  ctx.restore(); }
// beide roosters in één week (in elkaar geschoven): toetsen boven, trainingen eronder; o.schuifT = toets DO → VR, o.schuifW = training WO 05:30 → middag
function SP9_week(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, SP9.papier, C.goud, 3);
  text(ctx, 'ÉÉN WEEK', x + 24, y + 42, fMeta(26), '#56627E', 'left');
  const cw = (w - 110) / 5, x0 = x + 90, yy = y + 90, rh = (h - 120) / 3;
  SP9_DAG.forEach((d, i) => metaText(ctx, d, x0 + cw * (i + 0.5), yy, '#56627E', 'center', 22));
  ['05:30', 'SCHOOL', '16:00'].forEach((l, r) => metaText(ctx, l, x + 16, yy + 22 + rh * (r + 0.6), '#56627E', 'left', 20));
  const cel = (fi, r, s2, kl, f = 1, rand = null) => { if (f <= 0.01) return; const cx = x0 + cw * fi + 8, cy = yy + 22 + rh * r + 6; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, cx, cy, cw - 16, rh - 14, 8); shape(ctx, rgba(kl, 0.3), rand || kl, rand ? 4 : 2.5); text(ctx, s2, cx + (cw - 16) / 2, cy + (rh - 14) / 2 + 10, fTekst(Math.min(26, rh * 0.32), 800), '#121A26', 'center'); ctx.restore(); };
  const sT = o.schuifT || 0, sW = o.schuifW || 0;
  cel(0, 1, 'toets', C.paars); cel(2, 1, 'toets', C.paars); cel(3 + sT, 1, 'toets', C.paars, 1, sT > 0.02 && sT < 0.98 ? C.goud : null);
  cel(2, lerp(0, 2, ease(sW)), 'zwem', SP9_mix('#D4A24A', '#E0B64A', sW), 1, sW > 0.02 ? C.goud : null); cel(4, 0, 'zwem', C.oker); for (const i of [0, 1, 3]) cel(i, 2, 'zwem', C.oker);
  ctx.restore(); }
// laptop (vooraanzicht) met paars toetsrooster dat online komt
function SP9_laptop(ctx, x, y, w, a = 1, aan = 1) { if (a <= 0.01) return; const h = w * 0.62; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3040', '#5A6070', 4);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(x - 40, y + h + 30); ctx.lineTo(x + w + 40, y + h + 30); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
  ctx.save(); roundRect(ctx, x + 14, y + 14, w - 28, h - 28, 8); ctx.clip(); ctx.fillStyle = '#1B2438'; ctx.fillRect(x, y, w, h); if (aan > 0.01) SP9_rooster(ctx, x + 30, y + 30, w - 60, h - 60, 'toets', aan); ctx.restore();
  ctx.restore(); }
// klembord met trainingsplan
function SP9_klembord(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#8A6A48', '#6A5034', 3);
  roundRect(ctx, x + w / 2 - 60, y - 16, 120, 40, 8); shape(ctx, '#9AA3B2', '#6A7286', 2); SP9_rooster(ctx, x + 20, y + 34, w - 40, h - 54, 'training', 1, o); ctx.restore(); }

// ---------- onderzoekskaart ----------
// kop = regels (mono), meta rechtsonder; geeft binnenmaten terug
function SP9_studie(ctx, x, y, w, h, kop, meta, a = 1, rand = C.line) { if (a <= 0.01) return; SP9_kaart(ctx, x, y, w, h, a, rand); SP9_laag(ctx, a, () => { kop.forEach((s2, i) => metaText(ctx, s2, x + 34, y + 58 + i * 40, i === 0 ? C.text : C.text2, 'left', i === 0 ? 28 : 24)); if (meta) metaText(ctx, meta, x + w - 30, y + h - 26, C.grain, 'right', 22); }); }
// staaf in een grafiek
function SP9_staaf(ctx, cx, base, bw, hv, kl, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (hv > 1) { roundRect(ctx, cx - bw / 2, base - hv, bw, hv, 6); shape(ctx, rgba(kl, 0.55), kl, 2); }
  (Array.isArray(lab) ? lab : [lab]).forEach((l, i) => metaText(ctx, l, cx, base + 36 + i * 28, o.labKl || C.text2, 'center', 22)); ctx.restore(); }

// twee nachten als rijen met elk een eigen tijdas (20:00–08:00) en de bedtijd; a = [rij1, rij2]
function SP9_bedRijen(ctx, a, y0 = 430) { const x0 = 640, x1 = 1660, span = 12, X = u => x0 + (x1 - x0) * (((u - 20 + 24) % 24) / span);
  const rijen = [['VOOR EEN RUSTDAG', 0.53, '00:32', C.teal], ['VOOR EEN TRAINING OM 06:00', 22.08, '22:05', C.koraal]];
  rijen.forEach(([lab, u, tijd, kl], i) => SP9_laag(ctx, a[i], () => { const y = y0 + i * 110; metaText(ctx, lab, 160, y + 8, kl, 'left', 24);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (let h = 0; h <= span; h += 2) { const xx = x0 + (x1 - x0) * h / span; ctx.beginPath(); ctx.moveTo(xx, y - 7); ctx.lineTo(xx, y + 7); ctx.stroke(); if (i === 1 || a[1] < 0.5) metaText(ctx, String((20 + h) % 24).padStart(2, '0') + ':00', xx, y + 36, C.text2, 'center', 18); }
    const xx = X(u); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xx, y - 30); ctx.lineTo(xx, y + 8); ctx.stroke(); SP9_maan(ctx, xx - 30, y - 30, 14); metaText(ctx, 'NAAR BED ' + tijd, xx + 10, y - 22, kl, 'left', 22); })); }

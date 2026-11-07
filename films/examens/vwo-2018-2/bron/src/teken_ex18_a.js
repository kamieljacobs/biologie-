// Examenbespreking vwo 2018-II — tekenfuncties deel a (opening, leesgewoontes, De lauwbloedige koningsvis). Prefix a_.

// zichtbaar venster: in vanaf t0, weg vóór t1 (zo staan twee balken nooit tegelijk)
function a_win(t, t0, t1 = Infinity, d = 0.4) { return Math.min(ramp(t, t0, d), 1 - ramp(t, t1 - d, d)); }
function a_alpha(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function a_mixC(h1, h2, k) { k = clamp(k, 0, 1); const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1); }
const A_KOUD = '#4F8FD0', A_WARM = '#E0644A';
function a_tempKleur(u) { return a_mixC(A_KOUD, A_WARM, u); }
const A_CTX = 'DE LAUWBLOEDIGE KONINGSVIS';

// ---------- opening ----------
function a_tafel(ctx, x, y, w, s = 1) { // examentafel in perspectief: blad + poten; (x,y) = midden voorkant blad
  const d = 26 * s; ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2 - 14 * s, y - d); ctx.lineTo(x - w / 2 + 14 * s, y - d); ctx.closePath(); shape(ctx, '#B89468', '#8C6E4C', 1.5);
  ctx.fillStyle = '#8C6E4C'; ctx.fillRect(x - w / 2, y, w, 8 * s); ctx.fillStyle = '#5A6478'; const ph = 92 * s; ctx.fillRect(x - w / 2 + 8 * s, y + 8 * s, 6 * s, ph); ctx.fillRect(x + w / 2 - 14 * s, y + 8 * s, 6 * s, ph); ctx.restore(); }
function a_boekje(ctx, x, y, s = 1, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(50, -22); ctx.lineTo(-50, -22); ctx.closePath(); shape(ctx, '#F2EEE4', '#B8B2A4', 1.5);
  ctx.strokeStyle = '#8A8E96'; ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 3, -6 - i * 5); ctx.lineTo(36 - i * 3, -6 - i * 5); ctx.stroke(); }
  if (open > 0.01) { ctx.strokeStyle = '#121A26'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -22); ctx.stroke(); }
  ctx.restore(); }
function a_wandklok(ctx, x, y, r, uur, a = 1, sector = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r + 8, '#3A4E72'); circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3);
  if (sector > 0.01) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 8, -Math.PI / 2 + 1.5 / 12 * 6.283, -Math.PI / 2 + (1.5 + 3 * sector) / 12 * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.55); ctx.fill(); }
  ctx.strokeStyle = '#3A4458'; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.lineWidth = i % 3 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * (r - 6), y - Math.cos(an) * (r - 6)); ctx.lineTo(x + Math.sin(an) * (r - (i % 3 ? 14 : 20)), y - Math.cos(an) * (r - (i % 3 ? 14 : 20))); ctx.stroke(); }
  const ah = uur / 12 * 6.283, am = (uur % 1) * 6.283; ctx.lineCap = 'round'; ctx.strokeStyle = '#121A26'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5); ctx.stroke();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(am) * r * 0.78, y - Math.cos(am) * r * 0.78); ctx.stroke(); circ(ctx, x, y, 6, '#121A26'); ctx.restore(); }
// examenzaal links (tot x≈1120): wand, klok, rijen tafels, Noor vooraan
function a_zaal(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#22324E'; ctx.fillRect(0, 0, 1180, 470); ctx.fillStyle = '#1F2D47'; ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(1180, 470); ctx.lineTo(1180, 880); ctx.lineTo(0, 880); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#3A4E72'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(1180, 470); ctx.stroke();
  // bord met 'stilte'
  roundRect(ctx, 380, 120, 420, 170, 10); shape(ctx, '#2C4A3E', '#5A6478', 4); text(ctx, 'Biologie vwo', 590, 190, fTekst(36, 600), '#E8E8E0', 'center'); text(ctx, '13.30 – 16.30 uur', 590, 245, fTekst(30, 500), '#C9D2C8', 'center');
  a_wandklok(ctx, 960, 210, 82, o.uur == null ? 1.5 : o.uur, 1, o.sector || 0);
  // rijen tafels (achter klein, voor groot)
  const rijen = [[520, 0.55, 5], [600, 0.72, 4], [700, 0.92, 4]];
  rijen.forEach(([y, s, n], ri) => { for (let i = 0; i < n; i++) { const x = 590 + (i - (n - 1) / 2) * 300 * s * (ri === 2 ? 1.25 : 1); if (ri === 2 && i === 1) continue; a_tafel(ctx, x, y, 200 * s, s); a_boekje(ctx, x, y - 6 * s, s * 0.8, 1); } });
  // Noor aan de voorste tafel
  const nx = 590 - 0.5 * 300 * 0.92 * 1.25; persoon(ctx, 'noor', nx, 860, 420, { t, kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  a_tafel(ctx, nx, 700, 230, 1.0); a_boekje(ctx, nx + 10, 694, 1, 1, 1);
  ctx.restore(); }
function a_teller(ctx, x, y, n, label, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, String(n), x, y, fTitel(120), col, 'right'); metaText(ctx, label, x + 24, y - 12, C.text, 'left', 34); ctx.restore(); }

// contextkaartjes (s02)
function a_kaart(ctx, x, y, w, h, nr, titel, a = 1, hl = 0, icoon) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = (1 - ease(a)) * 30; ctx.translate(0, dy);
  roundRect(ctx, x, y, w, h, 20); shape(ctx, rgba(EX.papier, 0.92), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2);
  metaText(ctx, 'CONTEXT ' + nr, x + 26, y + 46, C.goud, 'left', 22);
  if (icoon) { ctx.save(); ctx.beginPath(); ctx.rect(x + 6, y + 60, w - 12, 230); ctx.clip(); icoon(x + w / 2, y + 180); ctx.restore(); }
  ctx.font = fTekst(30, 600); const L = splitRegels(ctx, titel, w - 44); L.forEach((l, i) => text(ctx, l, x + 22, y + 340 + i * 38, fTekst(30, 600), C.text, 'left'));
  ctx.restore(); }
function a_eilandje(ctx, x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); // eilandje van Langerhans tussen klierweefsel
  for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283; circ(ctx, Math.cos(an) * 105, Math.sin(an) * 80, 22, '#C98A6A', '#A87058', 1.5); }
  blob(ctx, 0, 0, 78, 64, 0.06, 3, t); shape(ctx, '#E8C78A', '#C9A35C', 2);
  for (let i = 0; i < 14; i++) { const an = hash(i * 3) * 6.283, d = Math.sqrt(hash(i * 5)) * 52; circ(ctx, Math.cos(an) * d, Math.sin(an) * d * 0.8, 9, i % 4 ? '#7FC48F' : '#5BA4C9'); }
  ctx.restore(); }
function a_waterstof(ctx, x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(-80 + i * 40, 40 + (i % 2) * 22); ctx.rotate(0.4 * (i % 3 - 1)); roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, '#7FC48F', '#5FA86E', 1.5); ctx.restore(); }
  for (let i = 0; i < 4; i++) { const yy = ((t * 30 + i * 30) % 120); const bx = -50 + i * 34, by = 10 - yy; ctx.globalAlpha *= 1; circ(ctx, bx, by, 14, rgba(C.teal, 0.25), C.teal, 2); circ(ctx, bx + 16, by - 4, 14, rgba(C.teal, 0.25), C.teal, 2); }
  text(ctx, 'H₂', 70, -60, fTekst(40, 700), C.teal, 'center'); ctx.restore(); }
function a_muisje(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-100, 20); ctx.bezierCurveTo(-170, 30, -170, -30, -210, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 105, 58, 0, 0, 6.283); shape(ctx, '#9A8270', '#B8A090', 1.5);
  ctx.beginPath(); ctx.ellipse(100, -8, 52, 38, -0.2, 0, 6.283); shape(ctx, '#9A8270', '#B8A090', 1.5);
  circ(ctx, 84, -46, 22, '#C9A6A0', '#B8A090', 1.5); circ(ctx, 120, -16, 5, '#121A26'); circ(ctx, 152, -2, 6, '#C98A8A'); ctx.restore(); }

// ---------- leesgewoontes ----------
// nagetekende vraagregel in examenstijl; hl = {p, ww} 0..1 omcirkelen
function a_vraagRegel(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 210, 14); shape(ctx, '#EDEAE2', '#B8B2A4', 2);
  const pp = o.p || '2p', nr = o.nr || '1'; text(ctx, pp, x + 50, y + 82, fTekst(36, 600), '#3A4458', 'left'); text(ctx, nr, x + 140, y + 82, fTekst(36, 800), '#121A26', 'left');
  const ww = o.ww || 'Leg uit', rest = o.rest || ['dat het voor kleine vissoorten, door hun grotere', 'oppervlakte-inhoudverhouding, ongunstig is om endotherm te zijn.'];
  ctx.font = fTekst(36, 500); const wW = ctx.measureText(ww).width; text(ctx, ww, x + 200, y + 82, fTekst(36, 500), '#121A26', 'left'); text(ctx, rest[0], x + 200 + wW + 10, y + 82, fTekst(36, 500), '#121A26', 'left');
  if (rest[1]) text(ctx, rest[1], x + 200, y + 136, fTekst(36, 500), '#121A26', 'left');
  ctx.lineWidth = 5; ctx.strokeStyle = C.koraal;
  if (o.hp > 0.01) { ctx.save(); ctx.globalAlpha *= o.hp; ctx.beginPath(); ctx.ellipse(x + 70, y + 70, 44, 36, 0, -1.6, -1.6 + 6.283 * clamp(o.hp * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); }
  if (o.hw > 0.01) { ctx.save(); ctx.globalAlpha *= o.hw; ctx.beginPath(); ctx.ellipse(x + 200 + wW / 2, y + 70, wW / 2 + 22, 34, 0, -1.6, -1.6 + 6.283 * clamp(o.hw * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { wW }; }
// lege antwoordvakjes: n vakjes, k gevuld
function a_vakjes(ctx, x, y, n, a = 1, vul = [], ba = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const xx = x + i * 190; ctx.save(); ctx.globalAlpha *= ba[i] == null ? 1 : ba[i]; roundRect(ctx, xx, y, 160, 110, 16); const v = vul[i] || 0; shape(ctx, rgba(v > 0.5 ? C.groen : EX.papier, v > 0.5 ? 0.16 : 0.9), v > 0.5 ? C.groen : C.goud, 2.5);
    text(ctx, (i + 1) + 'p', xx + 80, y + 70, fMeta(34), v > 0.5 ? C.groen : C.goud, 'center'); ctx.restore(); } ctx.restore(); }
function a_wwKaart(ctx, x, y, w, ww, sub, a = 1, hl = 0, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 170, 18); shape(ctx, rgba(EX.papier, 0.92), hl > 0.5 ? col : EX.papierR, hl > 0.5 ? 3.5 : 2);
  text(ctx, ww, x + w / 2, y + 74, fTitel(48), col, 'center'); text(ctx, sub, x + w / 2, y + 130, fTekst(30, 500), C.text2, 'center'); ctx.restore(); }
// contexttekst met gemarkeerde zin (examenstijl)
function a_contextTekst(ctx, x, y, w, mark = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 360, 14); shape(ctx, '#EDEAE2', '#B8B2A4', 2);
  const regels = ['Net als zeehonden en pinguïns hebben ook koningsvissen een', 'onderhuidse vetlaag om warmteverlies in koud water te reduceren.', 'Vissen hebben echter een enorm ‘warmtelek’ in de kieuwen, waar het', 'bloed door een haarvatennet in nauw contact komt met het koude water.', 'Zonder aanpassingen zouden endotherme vissen hierdoor het overgrote', 'deel van de geproduceerde warmte verliezen.'];
  regels.forEach((r, i) => { const yy = y + 64 + i * 50; if ((i === 2 || i === 3) && mark > 0.01) { ctx.font = fTekst(32, 500); const ww = ctx.measureText(r).width; ctx.fillStyle = rgba('#F2D24A', 0.75 * mark); const x0 = x + 40, sx = i === 2 ? x0 + ctx.measureText('Vissen hebben echter een ').width : x0; ctx.fillRect(sx - 4, yy - 30, (x0 + ww - sx + 8) * clamp(mark * 1.4 - (i === 3 ? 0.4 : 0), 0, 1), 42); }
    text(ctx, r, x + 40, yy, fTekst(32, 500), '#2A3446', 'left'); });
  ctx.restore(); }

// ---------- koningsvis ----------
function a_visPad(ctx) { ctx.beginPath(); ctx.moveTo(214, 2); ctx.bezierCurveTo(196, -128, -60, -178, -160, -98); ctx.bezierCurveTo(-200, -62, -222, -28, -238, -16); ctx.lineTo(-238, 16); ctx.bezierCurveTo(-222, 28, -200, 62, -160, 98); ctx.bezierCurveTo(-60, 178, 196, 132, 214, 2); ctx.closePath(); }
// koningsvis (Lampris guttatus) zijaanzicht, kop rechts; o.warm 0..1 = warmtegloed; o.zwem = vinslag; o.hlVin = borstvin oplichten
function a_koningsvis(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
  const vin = '#D8473A', vinD = '#B5372C', slag = Math.sin(t * 3.2) * (o.zwem == null ? 1 : o.zwem);
  // staart
  ctx.beginPath(); ctx.moveTo(-232, -14); ctx.quadraticCurveTo(-262, -50, -312, -100); ctx.quadraticCurveTo(-292, -30, -284, 0); ctx.quadraticCurveTo(-292, 30, -312, 100); ctx.quadraticCurveTo(-262, 50, -232, 14); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // rugvin: hoog en sikkelvormig voor, laag naar achter
  ctx.beginPath(); ctx.moveTo(70, -140); ctx.quadraticCurveTo(40, -230, -30, -282); ctx.quadraticCurveTo(-10, -200, -40, -150); ctx.quadraticCurveTo(-120, -128, -205, -62); ctx.lineTo(-180, -78); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // buikvinnen
  ctx.beginPath(); ctx.moveTo(40, 140); ctx.quadraticCurveTo(10, 210, -50, 248); ctx.quadraticCurveTo(-10, 180, -10, 138); ctx.closePath(); shape(ctx, vin, vinD, 2);
  ctx.beginPath(); ctx.moveTo(-80, 128); ctx.quadraticCurveTo(-140, 120, -205, 64); ctx.lineTo(-180, 82); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // lijf
  a_visPad(ctx); const gr = ctx.createLinearGradient(0, -170, 0, 170); gr.addColorStop(0, '#46608E'); gr.addColorStop(0.45, '#8C93B4'); gr.addColorStop(0.8, '#D8A2A6'); gr.addColorStop(1, '#E8BCB4'); ctx.fillStyle = gr; ctx.fill();
  ctx.save(); a_visPad(ctx); ctx.clip();
  for (let i = 0; i < 60; i++) { const px = -220 + hash(i * 7 + 1) * 420, py = -150 + hash(i * 7 + 2) * 300; circ(ctx, px, py, 4 + 5 * hash(i * 7 + 3), 'rgba(245,245,240,0.85)'); }
  const w = o.warm || 0; if (w > 0.01) { const rg = ctx.createRadialGradient(-10, 0, 20, -10, 0, 230); rg.addColorStop(0, rgba(A_WARM, 0.75 * w)); rg.addColorStop(0.75, rgba(A_WARM, 0.45 * w)); rg.addColorStop(1, rgba(A_WARM, 0.1 * w)); ctx.fillStyle = rg; ctx.fillRect(-260, -200, 520, 400); }
  if (o.vlek) o.vlek(ctx);
  ctx.restore();
  a_visPad(ctx); ctx.strokeStyle = '#C8D0DC'; ctx.lineWidth = 2; ctx.stroke();
  // kieuwdeksel
  ctx.strokeStyle = 'rgba(40,50,70,0.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(205, 6, 120, Math.PI * 0.72, Math.PI * 1.25); ctx.stroke();
  // borstvin (horizontaal, sikkel) met slag
  ctx.save(); ctx.translate(70, -6); ctx.rotate(0.12 * slag); const hv = o.hlVin || 0;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-80, -50, -170, -36); ctx.quadraticCurveTo(-90, -6, 0, 14); ctx.closePath(); shape(ctx, hv > 0.01 ? a_mixC(vin, '#F2C94C', hv * 0.6) : vin, hv > 0.5 ? C.goud : vinD, hv > 0.5 ? 4 : 2); ctx.restore();
  // oog en bek
  circ(ctx, 150, -34, 24, '#E0B64A', '#8C6A2A', 2); circ(ctx, 152, -34, 13, '#121A26'); circ(ctx, 147, -39, 4, '#F2F2EE');
  ctx.strokeStyle = vinD; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(214, 4); ctx.quadraticCurveTo(200, 14, 186, 10); ctx.stroke();
  ctx.restore(); }
function a_water(ctx, x, y, w, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1F4A7A'); g.addColorStop(1, '#0F2340'); ctx.fillStyle = g; ctx.fill();
  ctx.save(); roundRect(ctx, x, y, w, h, 22); ctx.clip(); for (let i = 0; i < 5; i++) { const xx = x + w * (0.1 + i * 0.2) + Math.sin(t * 0.4 + i) * 30; const gg = ctx.createLinearGradient(xx, y, xx + 120, y + h); gg.addColorStop(0, 'rgba(160,200,240,0.10)'); gg.addColorStop(1, 'rgba(160,200,240,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx + 70, y); ctx.lineTo(xx + 260, y + h); ctx.lineTo(xx + 140, y + h); ctx.closePath(); ctx.fill(); } ctx.restore();
  ctx.restore(); }
function a_thermo(ctx, x, y, h, frac, waarde, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 16, y - h, 32, h, 16); shape(ctx, '#EDEAE2', '#9AA3B2', 2); circ(ctx, x, y + 10, 28, col, '#9AA3B2', 2);
  roundRect(ctx, x - 8, y - h * frac, 16, h * frac + 12, 8); ctx.fillStyle = col; ctx.fill(); text(ctx, waarde, x, y - h - 26, fTekst(44, 700), C.text, 'center'); ctx.restore(); }
// golvende warmtepijl
function a_warmtePijl(ctx, x, y, nx, ny, len, a = 1, t = 0, col = A_WARM, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ph = (t * 0.8) % 1; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; const px = -ny, py = nx;
  ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, d = u * len, wv = Math.sin(u * 9 - t * 6) * 7; const xx = x + nx * d + px * wv, yy = y + ny * d + py * wv; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  const ex = x + nx * (len + 4), ey = y + ny * (len + 4); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ex + nx * 14, ey + ny * 14); ctx.lineTo(ex + px * 11, ey + py * 11); ctx.lineTo(ex - px * 11, ey - py * 11); ctx.closePath(); ctx.fill(); ctx.restore(); }

// myoglobine: kleine opgevouwen keten met rood heemschijfje; o2 = 0..1 geladen
function a_o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 8 * s, y, 10 * s, '#7FD0E8', '#3E9AB8', 2); circ(ctx, x + 8 * s, y, 10 * s, '#7FD0E8', '#3E9AB8', 2); ctx.restore(); }
function a_myoglobine(ctx, x, y, s = 1, a = 1, seed = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B87AB0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 26; i++) { const an = i * 0.95 + seed, r = 14 + 12 * Math.sin(i * 1.7 + seed); const xx = Math.cos(an) * r, yy = Math.sin(an) * r * 0.85; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (let i = 0; i <= 26; i += 3) { const an = i * 0.95 + seed, r = 14 + 12 * Math.sin(i * 1.7 + seed); circ(ctx, Math.cos(an) * r, Math.sin(an) * r * 0.85, 4.5, '#D8A0D0'); }
  roundRect(ctx, -9, -16, 18, 12, 3); shape(ctx, '#C8302C', '#8A1E1A', 1.5); ctx.restore(); }
// spiercel (lang, afgeronde uiteinden, dwarsstrepen); knijp 0..1
function a_spiercel(ctx, x, y, w, h, a = 1, knijp = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ww = w * (1 - 0.06 * knijp), hh = h * (1 + 0.08 * knijp);
  roundRect(ctx, x - ww / 2, y - hh / 2, ww, hh, hh / 2); shape(ctx, '#6E2A32', '#C9707A', 3);
  ctx.save(); roundRect(ctx, x - ww / 2, y - hh / 2, ww, hh, hh / 2); ctx.clip(); ctx.strokeStyle = 'rgba(200,110,120,0.22)'; ctx.lineWidth = 5; const n = 30; for (let i = 0; i < n; i++) { const xx = x - ww / 2 + (i + 0.5) * ww / n; ctx.beginPath(); ctx.moveTo(xx, y - hh / 2); ctx.lineTo(xx, y + hh / 2); ctx.stroke(); }
  for (let i = 0; i < 7; i++) circ(ctx, x - ww / 2 + hash(i * 3 + 1) * ww, y - hh / 2 + hash(i * 3 + 2) * hh, 2, 'rgba(240,200,200,0.25)'); ctx.restore(); ctx.restore(); }
function a_haarvat(ctx, x, y, w, a = 1, t = 0, stroom = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, w, 68, 34); shape(ctx, 'rgba(224,122,95,0.18)', C.koraal, 3);
  for (let i = 0; i < 9; i++) { const xx = x + ((i / 9 * w + t * 120 * stroom) % w); ctx.save(); ctx.translate(xx, y); ctx.scale(1, 0.62); circ(ctx, 0, 0, 24, '#C8302C', '#8A1E1A', 2); circ(ctx, 0, 0, 10, '#A82422'); ctx.restore(); } ctx.restore(); }

// tabel 1 nagetekend; hl = {rij: index 0..4 → 0..1}, cel = [{r,k,a}]
const A_TAB = [['borstvinspier', '13,8 ± 1,5', '3,8 ± 0,8', '22'], ['hart', '13,2 ± 1,7', '3,2 ± 0,7', '21'], ['schedel', '16,1 ± 3,9', '6,0 ± 3,0', '22'], ['buikholte', '13,5 ± 1,6', '3,5 ± 1,0', '19'], ['borstvinspier', '14,4 ± 0,4', '4,8 ± 1,2', '4']];
function a_tabel(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const cw = [300, 320, 330, 180], W0 = cw.reduce((p, c) => p + c, 0), rh = 58; const kx = [0]; cw.forEach((c, i) => kx.push(kx[i] + c));
  roundRect(ctx, -30, -90, W0 + 60, 640, 18); shape(ctx, rgba(EX.papier, 0.75), EX.papierR, 2); metaText(ctx, 'TABEL 1', 0, -44, C.text2, 'left', 22);
  const kop = [['lichaamsgebied'], ['gem. temperatuur (°C)', '± standaardafwijking'], ['verschil met zeewater (°C)', '± standaardafwijking'], ['aantal', 'vissen']];
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(0, 0, W0, 100);
  kop.forEach((k, i) => k.forEach((l, j) => text(ctx, l, kx[i] + 16, 40 + j * 36, fTekst(26, j ? 500 : 700), j ? C.text2 : C.text, 'left')));
  const rijY = (r) => r < 4 ? 160 + r * rh : 160 + 4 * rh + 60; const ra = o.rij || [];
  [[100, 'aan dek gemeten koningsvissen'], [160 + 4 * rh, 'vrij zwemmend, met datarecorder']].forEach(([yy, s2]) => { ctx.fillStyle = 'rgba(143,160,181,0.12)'; ctx.fillRect(kx[1], yy, W0 - kx[1], 52); ctx.strokeRect(0, yy, W0, 52); text(ctx, s2, kx[1] + 16, yy + 36, fTekst(26, 700), C.text, 'left'); });
  A_TAB.forEach((row, r) => { const yy = rijY(r) - 4; const ia = (o.rijA || [1, 1, 1, 1, 1])[r]; if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia;
    const h = ra[r] || 0; if (h > 0.01) { roundRect(ctx, -10, yy - 4, W0 + 20, rh, 10); shape(ctx, rgba(C.goud, 0.18 * h), rgba(C.goud, h), 2.5); }
    row.forEach((c, k) => text(ctx, c, kx[k] + 16, yy + 38, fTekst(32, k ? 500 : 600), C.text, 'left')); ctx.restore(); });
  ctx.strokeStyle = C.line; ctx.strokeRect(0, 100, W0, 160 + 4 * rh - 100 - 4 + 4); ctx.strokeRect(0, 160 + 4 * rh, W0, 120);
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(kx[i], 0); ctx.lineTo(kx[i], 100); ctx.moveTo(kx[i], 152); ctx.lineTo(kx[i], 160 + 4 * rh); ctx.moveTo(kx[i], 212 + 4 * rh); ctx.lineTo(kx[i], 280 + 4 * rh); ctx.stroke(); }
  (o.cel || []).forEach(c => { if (c.a <= 0.01) return; const yy = rijY(c.r) - 4; ctx.save(); ctx.globalAlpha *= c.a; ctx.strokeStyle = c.col || C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx[c.k] + (c.cx || 90), yy + 26, (c.rx || 100), 32, 0, 0, 6.283 * clamp(c.a * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// afbeelding 2: diagram met twee y-assen (temperatuur links, diepte rechts, diepte-as naar beneden)
//const A_L1old = [[15, 13.6], [30, 13.9], [50, 14.3], [70, 14.5], [90, 14.5], [110, 14.2], [130, 13.9], [150, 13.6], [170, 13.4], [190, 13.2], [200, 13.1]];
const A_L3 = [[15,12],[18,11.8],[21,13.5],[24,14.2],[27,13.6],[30,12.2],[33,13.3],[36,14],[39,14.6],[41,13.6],[44,14.4],[46,13.4],[49,14.7],[52,13.6],[55,14.3],[58,14.5],[61,14.2],[63,13.8],[65,12.8],[67,10.5],[69,8.5],[70,7.2],[72,8.4],[74,7.8],[76,8.6],[78,7.5],[80,4.1],[82,5.5],[84,7],[87,7.3],[89,8],[91,9.1],[93,8.2],[95,8.8],[97,8.3],[99,9.3],[101,8.4],[103,9],[105,8.7],[107,9.1],[110,8.8],[113,9.1],[116,8.7],[118,9.2],[120,8.1],[124,8.5],[128,8.3],[132,8.6],[136,8.4],[140,8.5],[144,8],[148,8.3],[152,7.5],[156,7.9],[160,8.6],[164,8.8],[168,8.3],[172,8.6],[176,8.1],[180,8.6],[184,8.3],[188,7.8],[192,7.6],[196,7.8],[200,7.9]];
const A_L1 = [[15,13.6],[30,13.9],[50,14.3],[70,14.5],[90,14.5],[110,14.2],[130,13.9],[150,13.6],[170,13.4],[190,13.2],[200,13.1]];
const A_L2 = A_L3.filter(p => p[0] <= 63).map(p => [p[0], p[1] + 0.15]).concat([[65,14],[67,13.2],[69,11.6],[71,10.8],[73,10.4],[75,10.9],[77,10.6],[80,9.8],[84,9.7],[88,10.2],[92,10.4],[100,10.5],[110,10.5],[120,10.4],[130,10.3],[140,10.5],[150,10.4],[160,10.2],[170,10.4],[180,10.3],[190,10],[200,9.9]]);
function a_grafiek(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (m) => x + m / 200 * w, Y = (v) => y + h - (v - 2) / 16 * h; const dl = o.lijn || [1, 1, 1], hl = o.hl || [0, 0, 0], dim = o.dim || [0, 0, 0];
  examenKader(ctx, x - 150, y - 110, w + 330, h + 230, 'AFBEELDING 2', 1);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
  for (let v = 2; v <= 18; v += 2) { ctx.beginPath(); ctx.moveTo(x - 10, Y(v)); ctx.lineTo(x, Y(v)); ctx.stroke(); text(ctx, String(v), x - 18, Y(v) + 9, fTekst(26, 500), C.text, 'right'); }
  const da = o.diepteAs == null ? 1 : o.diepteAs; ctx.save(); ctx.globalAlpha *= da; for (let d = 0; d <= 100; d += 20) { const yy = Y(18 - d * 0.144); ctx.beginPath(); ctx.moveTo(x + w, yy); ctx.lineTo(x + w + 10, yy); ctx.stroke(); text(ctx, String(d), x + w + 18, yy + 9, fTekst(26, 500), C.text, 'left'); }
  ctx.save(); ctx.translate(x + w + 92, y + 120); ctx.rotate(Math.PI / 2); text(ctx, 'diepte (m)', 0, 0, fTekst(26, 600), C.teal, 'center'); ctx.restore();
  const ap = o.pijlD || 0; if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; pijl(ctx, x + w + 92, y + 210, x + w + 92, y + 210 + 130 * ease(ap), C.teal, 1, 5, 18); ctx.restore(); }
  ctx.restore();
  ctx.save(); ctx.translate(x - 84, y + h / 2); ctx.rotate(-Math.PI / 2); text(ctx, 'temperatuur (°C)', 0, 0, fTekst(26, 600), C.koraal, 'center'); ctx.restore();
  ['19:00', '19:40', '20:20', '21:00', '21:40', '22:20'].forEach((s2, i) => text(ctx, s2, X(i * 40), y + h + 38, fTekst(26, 500), C.text, 'center')); text(ctx, 'tijd van de dag', x + w, y + h + 80, fTekst(24, 500), C.text2, 'right');
  const lijnen = [[A_L1, [3, 9], '#F2F2EE'], [A_L2, [16, 10], '#F2F2EE'], [A_L3, [], '#F2F2EE']]; const kl = o.kleur || [null, null, null];
  lijnen.forEach(([pts, dash, col], i) => { const u = dl[i]; if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= 1 - 0.7 * dim[i]; ctx.setLineDash(dash); ctx.strokeStyle = kl[i] || col; ctx.lineWidth = 3.5 + 3 * hl[i]; ctx.lineJoin = 'round';
    const mx = pts[0][0] + (200 - pts[0][0]) * u; ctx.beginPath(); let first = true; for (let k = 0; k < pts.length; k++) { let [m, v] = pts[k]; if (m > mx) { const [m0, v0] = pts[k - 1]; v = v0 + (v - v0) * (mx - m0) / (m - m0); m = mx; } first ? ctx.moveTo(X(m), Y(v)) : ctx.lineTo(X(m), Y(v)); first = false; if (m >= mx) break; } ctx.stroke(); ctx.restore(); });
  const nr = [[160, 14.9], [160, 11.6], [160, 9.9]]; nr.forEach(([m, v], i) => { if (dl[i] < 0.99) return; ctx.save(); ctx.globalAlpha *= 1 - 0.7 * dim[i]; circ(ctx, X(m), Y(v) - 4, 20, '#22324E', hl[i] > 0.5 ? C.goud : '#F2F2EE', hl[i] > 0.5 ? 3.5 : 2); text(ctx, String(i + 1), X(m), Y(v) + 6, fTekst(28, 700), hl[i] > 0.5 ? C.goud : C.text, 'center'); ctx.restore(); });
  ctx.restore(); return { X, Y }; }

// afbeelding 3: kieuwboog (halfrond) met kieuwplaatjes, vetweefsel en wondernet
function a_kieuwboog(ctx, x, y, R, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  const a0 = -1.85, a1 = 1.85; // C-vorm, open naar links
  // kieuwplaatjes
  for (let k = 0; k <= 90; k++) { const an = a0 + (a1 - a0) * k / 90; const r0 = R + 26, r1 = R + 120 + 10 * Math.sin(k * 0.9); ctx.strokeStyle = k % 2 ? '#D86A6A' : '#C25858'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); }
  if ((o.hlPl || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlPl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, R + 134, a0, a1); ctx.stroke(); ctx.restore(); }
  // kieuwboog (bot)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 40; ctx.beginPath(); ctx.arc(x, y, R, a0, a1); ctx.stroke();
  if ((o.hlBoog || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlBoog; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, R + 22, a0, a1); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, R - 22, a0, a1); ctx.stroke(); ctx.restore(); }
  // vetweefsel: gele laag rond de boog (binnenkant)
  const v = o.vet == null ? 1 : o.vet; if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.strokeStyle = '#F0D27A'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, R - 32, a0 + 0.05, a1 - 0.05); ctx.stroke();
    for (let k = 0; k < 40; k++) { const an = a0 + 0.1 + (a1 - a0 - 0.2) * k / 39; circ(ctx, x + Math.cos(an) * (R - 32), y + Math.sin(an) * (R - 32), 6, '#F8E4A8'); } ctx.restore(); }
  // wondernet: kluwen van rode en blauwe vaatjes in de boog
  const wn = o.wondernet == null ? 1 : o.wondernet; if (wn > 0.01) { ctx.save(); ctx.globalAlpha *= wn; ctx.lineWidth = 3;
    for (let j = 0; j < 6; j++) { ctx.strokeStyle = j % 2 ? A_KOUD : A_WARM; ctx.beginPath(); for (let k = 0; k <= 80; k++) { const an = a0 + 0.12 + (a1 - a0 - 0.24) * k / 80, rr = R + 12 * Math.sin(k * 0.8 + j * 1.05 + t * (j % 2 ? -1 : 1) * 0.6); const xx = x + Math.cos(an) * rr, yy = y + Math.sin(an) * rr; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); }

// tegenstroom in het wondernet: twee vaten naast elkaar; o.fase: warm, koud, stroom, warmte, terug, aankomst, verlies
function a_tegenstroom(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const x0 = 330, x1 = 1330, yA = 380, yB = 540, gap = 160; // aanvoer boven (naar rechts), terug onder (naar links)
  // lichaam links, water + kieuwplaatjes rechts
  roundRect(ctx, 60, 250, 250, 420, 30); shape(ctx, rgba(A_WARM, 0.18), rgba(A_WARM, 0.7), 2);
  const wa = o.water == null ? 1 : o.water; roundRect(ctx, 1450, 230, 400, 460, 30); const g = ctx.createLinearGradient(1450, 0, 1850, 0); g.addColorStop(0, '#1F4A7A'); g.addColorStop(1, '#0F2340'); ctx.fillStyle = g; ctx.fill();
  // vetlaag rond het wondernet
  const v = o.vet || 0; if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x0 + 140, yA - 80, x1 - x0 - 180, yB - yA + 160, 60); ctx.strokeStyle = '#F0D27A'; ctx.lineWidth = 20; ctx.stroke(); ctx.restore(); }
  // temperatuur langs de vaten: aanvoer koelt af van 1 → 0.15 over het wondernet; terug warmt op van 0 → 0.85
  const sA = (u) => 1 - 0.85 * clamp((u - 0.15) / 0.75, 0, 1), sB = (u) => 0.85 * (1 - clamp((u - 0.15) / 0.75, 0, 1)); // u = 0 links .. 1 rechts
  const kleur = o.kleur == null ? 1 : o.kleur; // 0 = alles grijs
  const vat = (y, f, ff) => { const n = 60; for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 1) / n; ctx.strokeStyle = kleur > 0.01 ? a_mixC('#8A93A6', a_tempKleur(f((u0 + u1) / 2)), kleur * ff) : '#8A93A6'; ctx.lineWidth = 44; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(x0 + (x1 - x0) * u0, y); ctx.lineTo(x0 + (x1 - x0) * u1 + 1, y); ctx.stroke(); } };
  vat(yA, sA, o.kA == null ? 1 : o.kA); vat(yB, sB, o.kB == null ? 1 : o.kB);
  // verbinding links (lichaam) en lus door kieuwplaatjes rechts
  ctx.lineWidth = 44; ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(1), kleur * (o.kA == null ? 1 : o.kA)); ctx.beginPath(); ctx.moveTo(310, yA); ctx.lineTo(x0, yA); ctx.stroke();
  ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(0.85), kleur * (o.kB == null ? 1 : o.kB)); ctx.beginPath(); ctx.moveTo(310, yB); ctx.lineTo(x0, yB); ctx.stroke();
  ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(0.08), kleur); ctx.beginPath(); ctx.moveTo(x1, yA); ctx.lineTo(1560, yA); ctx.arc(1560, (yA + yB) / 2, (yB - yA) / 2, -Math.PI / 2, Math.PI / 2); ctx.lineTo(x1, yB); ctx.stroke();
  // kieuwplaatjes (kam) op de lus in het water
  for (let k = 0; k < 13; k++) { const an = -Math.PI / 2 + Math.PI * k / 12, r0 = (yB - yA) / 2 + 24, r1 = r0 + 110; ctx.strokeStyle = '#D86A6A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1560 + Math.cos(an) * r0, (yA + yB) / 2 + Math.sin(an) * r0); ctx.lineTo(1560 + Math.cos(an) * r1, (yA + yB) / 2 + Math.sin(an) * r1); ctx.stroke(); }
  // stroming: bloedcellen
  const st = o.stroom || 0; if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; const L = x1 - x0; for (let i = 0; i < 14; i++) { const uA = ((i / 14 + t * 0.07) % 1), uB = 1 - ((i / 14 + 0.035 + t * 0.07) % 1);
      ctx.save(); ctx.translate(x0 + L * uA, yA); ctx.scale(1, 0.7); circ(ctx, 0, 0, 14, '#F2F2EE', null); ctx.restore(); pijl(ctx, x0 + L * uA - 6, yA, x0 + L * uA + 10, yA, '#121A26', 0.5, 3, 9);
      ctx.save(); ctx.translate(x0 + L * uB, yB); ctx.scale(1, 0.7); circ(ctx, 0, 0, 14, '#F2F2EE', null); ctx.restore(); pijl(ctx, x0 + L * uB + 6, yB, x0 + L * uB - 10, yB, '#121A26', 0.5, 3, 9); } ctx.restore();
    pijl(ctx, 380, yA - 50, 520, yA - 50, C.text, st, 4, 16); pijl(ctx, 1280, yB + 50, 1140, yB + 50, C.text, st, 4, 16); }
  // warmte van boven naar onder
  const wo = o.warmte || 0; if (wo > 0.01) for (let i = 0; i < 7; i++) { const xx = x0 + 180 + i * 120, u = (xx - x0) / (x1 - x0); a_warmtePijl(ctx, xx, yA + 30, 0, 1, gap - 72, wo * (0.4 + 0.6 * sA(u)), t + i * 0.3, A_WARM, 4); }
  // warmte terug het lichaam in
  const tr = o.terug || 0; if (tr > 0.01) { a_warmtePijl(ctx, 320, yB, -1, 0, 110, tr, t, A_WARM, 6); }
  // klein verlies aan het water
  const vl = o.verlies || 0; if (vl > 0.01) for (let i = 0; i < 3; i++) { const an = -0.6 + i * 0.6; a_warmtePijl(ctx, 1560 + Math.cos(an) * 175, 460 + Math.sin(an) * 175, Math.cos(an), Math.sin(an), 30, vl * 0.8, t + i, '#E0907A', 3); }
  ctx.restore(); }

// cladogram afbeelding 4: (Lampris immaculatus, (lijn 1, ((lijn 2, lijn 3), (lijn 4, lijn 5))))
function a_cladogram(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const tipX = 760; const Y = { l5: 60, l4: 180, l3: 320, l2: 450, l1: 520, lm: 590 };
  const N = { root: [60, 555], n1: [160, 470], n2: [300, 320], n23: [390, 385], n45: [560, 120] }; N.root[1] = (Y.lm + N.n1[1]) / 2; N.n1[1] = (Y.l1 + N.n2[1]) / 2; N.n2[1] = (N.n23[1] + N.n45[1]) / 2; N.n23[1] = (Y.l2 + Y.l3) / 2; N.n45[1] = (Y.l4 + Y.l5) / 2;
  const hl = o.hl || {}, col = (k) => hl[k] > 0.5 ? C.goud : '#E8E8E0', lw = (k) => hl[k] > 0.5 ? 6 : 3.5;
  const tak = (nx, ny, cy, key) => { ctx.strokeStyle = col(key); ctx.lineWidth = lw(key); ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx, cy); ctx.stroke(); };
  const hor = (x1, x2, yy, key) => { ctx.strokeStyle = col(key); ctx.lineWidth = lw(key); ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.stroke(); };
  ctx.lineCap = 'round';
  hor(0, N.root[0], N.root[1], 'root');
  tak(N.root[0], N.root[1], Y.lm, 'lm'); hor(N.root[0], tipX, Y.lm, 'lm');
  tak(N.root[0], N.root[1], N.n1[1], 'k'); hor(N.root[0], N.n1[0], N.n1[1], 'k');
  tak(N.n1[0], N.n1[1], Y.l1, 'l1'); hor(N.n1[0], tipX, Y.l1, 'l1');
  tak(N.n1[0], N.n1[1], N.n2[1], 'g'); hor(N.n1[0], N.n2[0], N.n2[1], 'g');
  tak(N.n2[0], N.n2[1], N.n23[1], 'g23'); hor(N.n2[0], N.n23[0], N.n23[1], 'g23');
  tak(N.n2[0], N.n2[1], N.n45[1], 'g45'); hor(N.n2[0], N.n45[0], N.n45[1], 'g45');
  tak(N.n23[0], N.n23[1], Y.l2, 'l2'); hor(N.n23[0], tipX, Y.l2, 'l2'); tak(N.n23[0], N.n23[1], Y.l3, 'l3'); hor(N.n23[0], tipX, Y.l3, 'l3');
  tak(N.n45[0], N.n45[1], Y.l4, 'l4'); hor(N.n45[0], tipX, Y.l4, 'l4'); tak(N.n45[0], N.n45[1], Y.l5, 'l5'); hor(N.n45[0], tipX, Y.l5, 'l5');
  // bundeltjes (veel individuen) bij de lijnen
  const bund = { l5: [10, 46], l4: [3, 16], l3: [16, 70], l2: [1, 0], l1: [2, 8] };
  Object.entries(bund).forEach(([k, [n, hh]]) => { if (n < 2) return; ctx.strokeStyle = rgba(hl[k] > 0.5 ? C.goud : '#E8E8E0', 0.7); ctx.lineWidth = 1.5; for (let i = 0; i < n; i++) { const yy = Y[k] - hh / 2 + hh * i / (n - 1); ctx.beginPath(); ctx.moveTo(tipX - 30, Y[k]); ctx.lineTo(tipX - 10, yy); ctx.lineTo(tipX + 4, yy); ctx.stroke(); } });
  const lab = { l5: 'lijn 5', l4: 'lijn 4', l3: 'lijn 3', l2: 'lijn 2', l1: 'lijn 1' };
  Object.entries(lab).forEach(([k, s2]) => text(ctx, s2, tipX + 30, Y[k] + 11, fTekst(32, 600), hl[k] > 0.5 ? C.goud : C.text, 'left'));
  text(ctx, 'Lampris immaculatus', tipX + 30, Y.lm + 11, 'italic 600 32px ' + F.tekst, hl.lm > 0.5 ? C.goud : C.text, 'left');
  // splitsingspunten
  const np = o.nodes || {}; Object.entries(np).forEach(([k, v]) => { if (v <= 0.01) return; const [nx, ny] = N[k]; ctx.save(); ctx.globalAlpha *= v; circ(ctx, nx, ny, 14, C.goud, '#121A26', 2); ctx.restore(); });
  ctx.restore(); return { N, Y, tipX }; }

// kleine iconen voor vraag 8
function a_walvis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(170, 0); ctx.bezierCurveTo(170, -70, 40, -80, -60, -50); ctx.bezierCurveTo(-120, -30, -170, -20, -200, -10); ctx.lineTo(-200, 8); ctx.bezierCurveTo(-140, 30, -40, 60, 60, 55); ctx.bezierCurveTo(140, 50, 170, 30, 170, 0); ctx.closePath(); shape(ctx, '#5A6E8C', '#8FA0B5', 2);
  ctx.beginPath(); ctx.moveTo(-195, 0); ctx.lineTo(-250, -40); ctx.quadraticCurveTo(-230, 0, -250, 40); ctx.closePath(); shape(ctx, '#5A6E8C', '#8FA0B5', 2);
  circ(ctx, 120, -10, 6, '#121A26'); ctx.restore(); }
function a_longen(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -10); ctx.moveTo(0, -10); ctx.lineTo(-20, 5); ctx.moveTo(0, -10); ctx.lineTo(20, 5); ctx.stroke();
  [-1, 1].forEach(d => { ctx.beginPath(); ctx.ellipse(d * 42, 20, 34, 56, d * 0.15, 0, 6.283); shape(ctx, '#E59A9A', '#C97A7A', 2); }); ctx.restore(); }
function a_bloem(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke();
  for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 30, Math.sin(an) * 30, 26, 14, an, 0, 6.283); shape(ctx, '#C98AC0', '#A86AA0', 1.5); } circ(ctx, 0, 0, 16, '#E0B64A');
  const bx = 70 + Math.sin(t * 2) * 12, by = -60 + Math.cos(t * 3) * 8; ctx.beginPath(); ctx.ellipse(bx, by, 22, 14, 0, 0, 6.283); shape(ctx, '#E0B64A', '#121A26', 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 4; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(bx + k * 8, by - 13); ctx.lineTo(bx + k * 8, by + 13); ctx.stroke(); }
  ctx.fillStyle = 'rgba(220,235,245,0.7)'; ctx.beginPath(); ctx.ellipse(bx - 4, by - 20, 12, 8, -0.5, 0, 6.283); ctx.fill(); ctx.restore(); }

// toewijzing lijnen → grootheden (vraag 5); st = [{a (rij zichtbaar), v (grootheid ingevuld), g (groen)}]
const A_GROOT = ['borstvinspier', 'watertemperatuur', 'zwemdiepte'];
function a_toewijzing(ctx, x, y, w, st, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  st.forEach((s, i) => { const ia = s.a == null ? 1 : s.a; if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia; const yy = y + i * 104, g = s.g || 0, hl = s.hl || 0;
    roundRect(ctx, x, yy, w, 86, 16); shape(ctx, rgba(g > 0.5 ? C.groen : EX.papier, g > 0.5 ? 0.16 : 0.9), g > 0.5 ? C.groen : (hl > 0.5 ? C.goud : EX.papierR), g > 0.5 || hl > 0.5 ? 3 : 2);
    circ(ctx, x + 46, yy + 43, 24, '#22324E', '#F2F2EE', 2); text(ctx, String(i + 1), x + 46, yy + 54, fTekst(30, 700), C.text, 'center');
    const v = s.v || 0; if (v < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - v; text(ctx, '?', x + 100, yy + 56, fTitel(38), C.goud, 'left'); ctx.restore(); }
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; text(ctx, A_GROOT[i], x + 96 + (1 - ease(v)) * 30, yy + 54, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); }

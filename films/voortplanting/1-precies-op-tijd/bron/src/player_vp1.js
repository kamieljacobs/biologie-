// ===== Van bevruchting tot baby: aanvulling op de standaardspeler (29 okt 2026) =====
// 1. Vragen uit: de gesproken vraag staat in een eigen alinea (seg.vraagStem) en valt dan helemaal weg
//    (in H11 begint de vraag met 'Nog twee vragen om over na te denken.', die eindigt niet op '?').
// 2. Vraagkaart: lange keuzes lopen over twee regels; bij de grafiekvraag (H4, seg.fig === 'cycle') staat de cyclusgrafiek ernaast.
const _bouwTijdlijn = buildTimeline;
buildTimeline = function () { const alle = DATA.segments; if (state.vragen === 'uit') DATA.segments = alle.filter((s) => !s.vraagStem); try { _bouwTijdlijn(); } finally { DATA.segments = alle; } };
function _vqRegels(s, w, px) { ctx.font = fTekst(px); const out = []; let l = ''; for (const wd of s.split(' ')) { const tt = l ? l + ' ' + wd : wd; if (ctx.measureText(tt).width > w && l) { out.push(l); l = wd; } else l = tt; } if (l) out.push(l); return out; }
function _vqGrafiek(ctx, x, y, w, h) { const M = LIB.CYC, HC = LIB.HC, B = { x: x + 50, y: y + 92, w: w - 80, h: h - 176 };
  ctx.save(); roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.bgMicro, 0.55), C.line, 1); ctx.restore();
  OG.screen(); LIB.graphBox(OG, B, { x0: 0, x1: 28, xticks: [[1, '1'], [7, '7'], [14, '14'], [21, '21'], [28, '28']] }); metaText(ctx, 'dag van de cyclus', x + w / 2, y + h - 12, C.grain, 'center', 24);
  [['FSH', 'FSH', null], ['LH', 'LH', [12, 8]], ['E2', 'E2', null], ['P4', 'P4', [12, 8]]].forEach(([key, hc, dash]) => LIB.curve(OG, B, M, key, 0, 28, 3.4, 28, HC[hc], { dash, lw: 3 }));
  LIB.legend(OG, x + 24, y + 38, [['FSH', HC.FSH], ['LH', HC.LH, [12, 8]]]); LIB.legend(OG, x + 24, y + 76, [['oestrogeen', HC.E2], ['progesteron', HC.P4, [12, 8]]]); }
drawQuestion = function (ctx, it, t) {
  bg(ctx, 'schema'); const seg = it.seg; const ph = state.qPhase || { phase: 'countdown', start: 0 };
  text(ctx, 'Wat denk je?', 120, 200, fTitel(64), C.text);
  const qr = _vqRegels(seg.q, 1680, 40); const qpx = qr.length > 3 ? 36 : 40; const ql = _vqRegels(seg.q, 1680, qpx);
  ctx.font = fTekst(qpx, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; ql.forEach((l, i) => ctx.fillText(l, 120, 284 + i * (qpx + 10)));
  const y0 = Math.max(430, 284 + (ql.length - 1) * (qpx + 10) + 52), fig = seg.fig === 'cycle', ow = fig ? 1000 : 1680;
  const revealed = ph.phase === 'reveal'; const zones = [];
  let px = 36; let L = seg.options.map((o) => _vqRegels(o, ow - 150, px)); if (L.some((r) => r.length > 1)) { px = 32; L = seg.options.map((o) => _vqRegels(o, ow - 150, px)); }
  if (L.some((r) => r.length > 2)) { px = 28; L = seg.options.map((o) => _vqRegels(o, ow - 150, px)); }
  const bh = L.some((r) => r.length > 1) ? 104 : 96, gap = bh + 14;
  seg.options.forEach((o, i) => { const y = y0 + i * gap; const chosen = ph.chosen === i, correct = i === seg.correct;
    roundRect(ctx, 120, y, ow, bh, 14); let fill = C.fill, stroke = C.line;
    if (revealed) { if (correct) { fill = rgba(C.groen, 0.25); stroke = C.groen; } else if (chosen) { fill = rgba(C.koraal, 0.25); stroke = C.koraal; } } else if (chosen) stroke = C.goud;
    shape(ctx, fill, stroke, 1.5); text(ctx, String.fromCharCode(97 + i), 160, y + bh / 2 + 11, fMeta(32), C.grain);
    const r = L[i], lh = px + 8, top = y + bh / 2 - (r.length - 1) * lh / 2 + px * 0.35; r.forEach((l, k) => text(ctx, l, 220, top + k * lh, fTekst(px), C.text));
    if (revealed && correct) { ctx.fillStyle = C.groen; ctx.beginPath(); ctx.arc(120 + ow - 50, y + bh / 2, 12, 0, 6.283); ctx.fill(); }
    zones.push({ x: 120, y, w: ow, h: bh, i }); });
  if (fig) _vqGrafiek(ctx, 1160, y0 - 10, 640, 3 * gap - 4);
  if (ph.phase === 'countdown') { const u = clamp((t - ph.start) / COUNTDOWN, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(120, CAPTION_Y - 40); ctx.lineTo(120 + 1680 * (1 - u), CAPTION_Y - 40); ctx.stroke(); metaText(ctx, 'denk na…', 120, CAPTION_Y - 60, C.grain, 'left', 28); }
  else if (ph.phase === 'wait') { metaText(ctx, state.modus === 'klas' ? 'klas: druk op verder' : 'tik op een antwoord', 120, CAPTION_Y - 50, C.goud, 'left', 28); }
  else { ctx.save(); const er = _vqRegels(seg.explain, 1620, 36); const eh = er.length * 42 + 40; roundRect(ctx, 120, H - 40 - eh, 1680, eh, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 1.5); er.forEach((l, k) => text(ctx, l, 150, H - 40 - eh + 52 + k * 42, fTekst(36), C.text)); ctx.restore(); }
  state.optionZones = zones;
};
// 3. Ondertitels en eindkaart: de scènes van 2.6 zijn getekend met de ondertitelzone vanaf y = 950 (oude engine);
//    de ondertitelkast staat daarom onderaan het beeld (onderrand H − 6), en de eindkaart breekt lange zinnen af.
drawCaption = function (ctx, seg, t) { const ch = chunks(seg).find((c) => t >= c[0].s - 0.15 && t <= c[c.length - 1].e + 0.6); if (!ch) return;
  const s = ch.map((w) => w.t).join(' '); ctx.font = fTekst(44, 700); const lines = []; let line = '';
  for (const w of s.split(' ')) { const tt = line ? line + ' ' + w : w; if (ctx.measureText(tt).width > 1560 && line) { lines.push(line); line = w; } else line = tt; } if (line) lines.push(line);
  const wmax = Math.max(...lines.map((l) => ctx.measureText(l).width)); const bh = lines.length * 52 + 22, bw = wmax + 56; const x = W / 2 - bw / 2, y = H - 6 - bh;
  roundRect(ctx, x, y, bw, bh, 12); ctx.fillStyle = rgba(C.kast, 0.9); ctx.fill();
  lines.forEach((l, i) => text(ctx, l, W / 2, y + 50 + i * 52 - 6, fTekst(44, 700), C.text, 'center')); };
drawEnd = function (ctx, it, t) { bg(ctx, 'schema'); metaText(ctx, 'drie dingen om te onthouden', 180, 230, C.grain, 'left', 28);
  let y = 330; it.seg.lines.forEach((l, i) => { const a = ramp(t, 0.3 + i * 1.2, 0.6); ctx.save(); ctx.globalAlpha = a; text(ctx, String(i + 1), 180, y, fTitel(48), C.goud);
    const r = _vqRegels(l, 1420, 44); ctx.font = fTekst(44, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; r.forEach((s, k) => ctx.fillText(s, 250, y + k * 56)); ctx.restore(); y += r.length * 56 + 50; });
  haak(ctx, 250, 1670, y - 20, DATA.film.endHaak, C.groen, ramp(t, 4.2, 0.6)); metaText(ctx, 'biologie bij kamiel · stem: roos (elevenlabs) · versie ' + DATA.film.version, W / 2, H - 60, C.text2, 'center', 28); };

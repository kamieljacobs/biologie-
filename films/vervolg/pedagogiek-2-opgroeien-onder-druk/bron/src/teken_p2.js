// Wat word jij? · Pedagogiek 2 · Opgroeien onder druk — eigen tekeningen (20 okt 2026)

// telpoppetje (pictogram, alleen in grafieken en groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
// groep van n poppetjes in een raster; kleur(i) geeft de kleur
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// eiland (Kauai, vereenvoudigd) in zee
function eiland(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); for (let k = 0; k <= 24; k++) { const an = k / 24 * 6.283, r = 150 + 22 * Math.sin(an * 3 + 1) + 14 * Math.cos(an * 5); ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.82); } ctx.closePath(); shape(ctx, '#3A5540', '#5FA86E', 3);
  ctx.beginPath(); ctx.moveTo(-40, -30); ctx.lineTo(10, -100); ctx.lineTo(60, -30); ctx.closePath(); ctx.fillStyle = '#4B5878'; ctx.fill(); ctx.restore(); }

// tijdlijn met jaartallen
function tijdlijn(ctx, x, y, w, punten, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * u, y); ctx.stroke(); punten.forEach(([f, l]) => { if (f > u) return; circ(ctx, x + f * w, y, 9, C.goud); text(ctx, l, x + f * w, y + 44, fTekst(28, 700), C.text, 'center'); }); ctx.restore(); }

// staafjes: aantal ingrijpende ervaringen (0,1,2,3,4+) tegen kans op problemen later (schematisch, oplopend)
function aceStaven(ctx, x, y, w, h, a = 1, u = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const V = [0.15, 0.22, 0.3, 0.42, 0.85]; V.forEach((v, i) => { const bw = w / 5 - 30, bx = x + 20 + i * w / 5; const hh = h * v * clamp(u * 5 - i, 0, 1); roundRect(ctx, bx, y + h - hh, bw, hh, 8); shape(ctx, rgba(i === hl ? C.koraal : C.oker, 0.7), i === hl ? C.koraal : C.oker, 2); text(ctx, ['0', '1', '2', '3', '4+'][i], bx + bw / 2, y + h + 38, fTekst(30, 700), C.text, 'center'); });
  metaText(ctx, 'AANTAL INGRIJPENDE ERVARINGEN', x + w / 2, y + h + 80, C.grain, 'center', 24); metaText(ctx, 'KANS OP PROBLEMEN LATER · SCHEMATISCH', x, y - 18, C.grain, 'left', 24); ctx.restore(); }

// weegschaal risico (koraal, links) tegen beschermers (groen, rechts); kant < 0 = risico zwaarder
function balans(ctx, x, y, s, a = 1, kant = 0, links = 'risico\'s', rechts = 'beschermers') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const an = clamp(kant, -1, 1) * 0.28;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(-60, 200); ctx.lineTo(60, 200); ctx.lineTo(0, 120); ctx.closePath(); ctx.fill(); ctx.fillRect(-8, -10, 16, 140);
  ctx.save(); ctx.rotate(an); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-280, -14, 560, 14); ctx.restore();
  [[-1, C.koraal, links], [1, C.groen, rechts]].forEach(([k, col, n]) => { const px = k * 260 * Math.cos(an), py = k * 260 * Math.sin(an); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 70); ctx.stroke(); ctx.font = fTekst(32, 700); const bw = Math.max(240, ctx.measureText(n).width + 48); roundRect(ctx, px - bw / 2, py + 70, bw, 80, 14); shape(ctx, rgba(col, 0.3), col, 3); text(ctx, n, px, py + 122, fTekst(32, 700), C.text, 'center'); });
  ctx.restore(); }

// eenvoudige iconen in een afgerond vlak (Part C: plaats als lijnicoon)
function plekIcoon(ctx, soort, x, y, s, a = 1, col = C.text2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -70, -70, 140, 140, 22); shape(ctx, '#2A3A58', col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'school') { ctx.beginPath(); ctx.moveTo(-40, 30); ctx.lineTo(-40, -10); ctx.lineTo(0, -40); ctx.lineTo(40, -10); ctx.lineTo(40, 30); ctx.closePath(); ctx.stroke(); ctx.strokeRect(-10, 6, 20, 24); ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, -56); ctx.lineTo(18, -50); ctx.lineTo(0, -46); ctx.stroke(); }
  if (soort === 'huis') { ctx.beginPath(); ctx.moveTo(-40, 34); ctx.lineTo(-40, -4); ctx.lineTo(0, -38); ctx.lineTo(40, -4); ctx.lineTo(40, 34); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 22); ctx.bezierCurveTo(-26, 4, -14, -16, 0, -4); ctx.bezierCurveTo(14, -16, 26, 4, 0, 22); ctx.fillStyle = C.koraal; ctx.fill(); }
  if (soort === 'telefoon') { roundRect(ctx, -24, -44, 48, 88, 8); ctx.stroke(); circ(ctx, 0, 32, 4, col); }
  if (soort === 'rechter') { ctx.beginPath(); ctx.moveTo(-36, 30); ctx.lineTo(36, 30); ctx.moveTo(0, 30); ctx.lineTo(0, -30); ctx.moveTo(-36, -24); ctx.lineTo(36, -24); ctx.stroke(); }
  ctx.restore(); }

// kaartje met een signaal of stap
function stapKaart(ctx, x, y, w, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(col, 0.1 + 0.15 * aan), rgba(col, 0.4 + 0.6 * aan), 2); circ(ctx, x + 46, y + 48, 26, rgba(col, 0.3 + 0.5 * aan)); text(ctx, String(nr), x + 46, y + 60, fTekst(32, 800), C.text, 'center'); text(ctx, s2, x + 90, y + 60, fTekst(30, 700), C.text, 'left'); ctx.restore(); }

// scherm met een filmpje: baby op een kleed en de hand van een ouder; markeringen op de tijdbalk = goede momenten
function videoScherm(ctx, x, y, w, h, a = 1, t = 0, mark = 0, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0E141E', '#6A7080', 3); ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 70); ctx.clip();
  ctx.fillStyle = '#2C3E5E'; ctx.fillRect(x + 8, y + 8, w - 16, h - 70); ctx.fillStyle = '#C9A35C'; ctx.fillRect(x + 40, y + h * 0.62, w - 80, h * 0.2);
  // opvoeder uit de cast (Opa Henk) naast de baby op het kleed; bij hl: oogcontact en een glimlach terug
  const H = persoon(ctx, 'henk', x + w * 0.22, y + h * 0.86, h * 0.74, { t, uit: hl > 0.5 ? 'blij' : 'neutraal', kijk: 1 });
  persoon(ctx, 'baby', x + w * 0.5, y + h * 0.7, h * 0.42, { t, uit: hl > 0.5 ? 'blij' : 'neutraal' });
  if (hl > 0.01 && H && H.hoofd) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(H.hoofd.x + H.hoofd.r, H.hoofd.y); ctx.quadraticCurveTo(x + w * 0.42, y + h * 0.3, x + w * 0.5 - h * 0.12, y + h * 0.62); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.fillStyle = '#3A4458'; ctx.fillRect(x + 30, y + h - 36, w - 60, 8); if (mark > 0.01) [0.18, 0.47, 0.72].forEach((f, i) => { if (mark * 3 > i) { circ(ctx, x + 30 + f * (w - 60), y + h - 32, 12, C.groen); } }); ctx.restore(); }

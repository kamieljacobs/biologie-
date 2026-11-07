// Examenbespreking vwo 2018-II — gedeelde examen-UI (20 okt 2026). Gebruikt door alle scènes.
// Vaste beeldtaal per vraag:
//  vraagChip   = linksboven 'VRAAG 7 · 2P' (staat de hele vraag in beeld)
//  vraagKaart  = werkwoord in goud + kern van de vraag (kort, geen ondertitel herhalen)
//  punten      = puntenschakels: genummerde vakjes die oplichten met een vinkje als dat scorepunt genoemd wordt
//  opties      = meerkeuze A–D: foute opties worden doorgestreept/gedimd, de goede krijgt een groene rand
//  welNiet     = rijen met een bewering en een stempel WEL (groen) of NIET (koraal)
//  examenKader = papierachtig paneel voor een nagetekende examenfiguur ('afbeelding 2')

const EX = { papier: '#22324E', papierR: '#3A4E72', inkt: C.text, dim: C.text2 };

function vraagChip(ctx, nr, p, a = 1, x = 70, y = 92) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const s1 = 'VRAAG ' + nr, s2 = p ? (p === 'mc' ? 'MEERKEUZE · 2P' : p + 'P') : '';
  ctx.font = fMeta(30); ctx.letterSpacing = '3px'; const w1 = ctx.measureText(s1).width; ctx.font = fMeta(26); const w2 = s2 ? ctx.measureText(s2).width : 0; ctx.letterSpacing = '0px';
  const w = w1 + (s2 ? w2 + 52 : 0) + 48; roundRect(ctx, x, y - 44, w, 62, 31); shape(ctx, rgba(C.goud, 0.16), C.goud, 2);
  metaText(ctx, s1, x + 24, y, C.text, 'left', 30); if (s2) { circ(ctx, x + 24 + w1 + 24, y - 12, 4, C.goud); metaText(ctx, s2, x + 24 + w1 + 44, y, C.goud, 'left', 26); }
  ctx.restore(); }

// contextlabel rechtsboven (welke context we bespreken)
function contextChip(ctx, s, a = 1) { if (a <= 0.01) return; metaA_(ctx, s, W - 70, 82, a, C.text2, 'right', 22); }
function metaA_(ctx, s, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, col, al, px); ctx.restore(); }

// werkwoord + kern; (x,y) = linksboven van de kaart; breedte w
function vraagKaart(ctx, werkwoord, kern, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const px = o.px || 40; ctx.font = fTekst(px, 600); const lines = splitRegels(ctx, kern, w - 80); const h = 110 + lines.length * (px + 12);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(EX.papier, 0.92), EX.papierR, 2);
  ctx.fillStyle = C.goud; roundRect(ctx, x, y, 10, h, 5); ctx.fill();
  text(ctx, werkwoord, x + 40, y + 70, fTitel(46), C.goud, 'left');
  lines.forEach((l, i) => text(ctx, l, x + 40, y + 70 + 58 + i * (px + 12), fTekst(px, 500), C.text, 'left'));
  ctx.restore(); return h; }
function splitRegels(ctx, s, maxW) { const words = s.split(' '); const out = []; let line = ''; for (const wd of words) { const t2 = line ? line + ' ' + wd : wd; if (ctx.measureText(t2).width > maxW && line) { out.push(line); line = wd; } else line = t2; } if (line) out.push(line); return out; }

// puntenschakels; items = [{t:'tekst', a: 0..1 (zichtbaar), v: 0..1 (vinkje)}]; (x,y) = linksboven; vakken onder elkaar
function punten(ctx, items, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 34, gap = o.gap || 22; let yy = y;
  items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, it.t, w - 170); const h = 40 + L.length * (px + 10);
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const v = it.v || 0;
      roundRect(ctx, x, yy, w, h, 16); shape(ctx, rgba(v > 0.5 ? C.groen : EX.papier, v > 0.5 ? 0.14 : 0.9), v > 0.5 ? C.groen : EX.papierR, v > 0.5 ? 3 : 2);
      circ(ctx, x + 50, yy + h / 2, 30, v > 0.5 ? C.groen : 'rgba(0,0,0,0)', v > 0.5 ? C.groen : C.goud, 3);
      text(ctx, it.p || '1p', x + 50, yy + h / 2 + 10, fMeta(24), v > 0.5 ? '#121A26' : C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 108, yy + 20 + px + k * (px + 10) - 4, fTekst(px, 600), C.text, 'left'));
      if (v > 0.01) vink_(ctx, x + w - 46, yy + h / 2, 18, v); ctx.restore(); }
    yy += h + gap; });
  ctx.restore(); return yy; }

// meerkeuze; opts = ['tekst A', ...]; st = {weg:[0..1 per optie], goed: index, g: 0..1, a:[0..1 per optie]}
function opties(ctx, opts, x, y, w, st = {}, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 34; let yy = y;
  opts.forEach((s, i) => { const ia = st.a ? st.a[i] : 1; ctx.font = fTekst(px, 500); const L = splitRegels(ctx, s, w - 130); const h = 30 + L.length * (px + 10);
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const weg = st.weg ? (st.weg[i] || 0) : 0, goed = st.goed === i ? (st.g || 0) : 0;
      ctx.globalAlpha *= 1 - 0.55 * weg;
      roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(goed > 0.5 ? C.groen : EX.papier, goed > 0.5 ? 0.16 : 0.85), goed > 0.5 ? C.groen : EX.papierR, goed > 0.5 ? 3.5 : 2);
      text(ctx, 'ABCDEF'[i], x + 42, yy + 18 + px - 4, fTitel(px + 4), goed > 0.5 ? C.groen : C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 90, yy + 16 + px - 4 + k * (px + 10), fTekst(px, 500), C.text, 'left'));
      if (weg > 0.01) { ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 80, yy + h / 2); ctx.lineTo(x + 80 + (w - 110) * clamp(weg * 1.2, 0, 1), yy + h / 2); ctx.stroke(); }
      if (goed > 0.01) vink_(ctx, x + w - 40, yy + h / 2, 16, goed); ctx.restore(); }
    yy += h + 16; });
  ctx.restore(); return yy; }

// wel/niet-rijen; rows = [{t, v:'wel'|'niet', a, s (0..1 stempel)}]
function welNiet(ctx, rows, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 32; let yy = y;
  rows.forEach((r, i) => { const ia = r.a == null ? 1 : r.a; ctx.font = fTekst(px, 500); const L = splitRegels(ctx, r.t, w - 290); const h = Math.max(96, 30 + L.length * (px + 10));
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const hl = r.hl || 0;
      roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(EX.papier, 0.88), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2);
      text(ctx, String(i + 1), x + 40, yy + h / 2 + 14, fTitel(40), C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 84, yy + h / 2 - (L.length - 1) * (px + 10) / 2 + 11 + k * (px + 10), fTekst(px, 500), C.text, 'left'));
      const s = r.s || 0; if (s > 0.01) { const col = r.v === 'wel' ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= s; const sc = 1.25 - 0.25 * ease(s); ctx.translate(x + w - 110, yy + h / 2); ctx.scale(sc, sc); ctx.rotate(-0.08);
        roundRect(ctx, -82, -34, 164, 68, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, r.v.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), 0, 14, fTekst(38, 800), col, 'center'); ctx.restore(); }
      ctx.restore(); }
    yy += h + 14; });
  ctx.restore(); return yy; }

// kader voor een nagetekende examenfiguur; titel als 'AFBEELDING 2'
function examenKader(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(EX.papier, 0.75), EX.papierR, 2);
  if (titel) metaText(ctx, titel, x + 28, y + 44, C.text2, 'left', 22); ctx.restore(); }

// antwoordregel ('Antwoord B') linksboven onder de vraagchip
function antwoordLabel(ctx, s, a = 1, x = 70, y = 172) { regel(ctx, s, x, y, a, C.groen, 44, 'left', 800); }

// tipkaartje met lampje; (x,y) = linksboven
function tipKaart(ctx, s, x, y, w, a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, s, w - 150); const h = 50 + L.length * (px + 10);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.teal, 0.14), C.teal, 2.5); lampje(ctx, x + 62, y + h / 2, 1);
  metaText(ctx, 'TIP', x + 118, y + 40, C.teal, 'left', 20); L.forEach((l, k) => text(ctx, l, x + 118, y + 40 + px + 6 + k * (px + 10), fTekst(px, 600), C.text, 'left')); ctx.restore(); return h; }
function lampje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y - 8, 24, Math.PI * 0.8, Math.PI * 2.2); ctx.lineTo(x + 10, y + 22); ctx.lineTo(x - 10, y + 22); ctx.closePath(); shape(ctx, rgba(C.goud, 0.85), C.goud, 2); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 11, y + 24, 22, 6); ctx.fillRect(x - 9, y + 33, 18, 5); ctx.restore(); }

// waarschuwing ('levert geen punt op'); rood randje met kruis
function valkuil(ctx, s, x, y, w, a = 1, px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, s, w - 140); const h = 44 + L.length * (px + 10);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2.5); kruis(ctx, x + 56, y + h / 2, 16, 1);
  metaText(ctx, 'GEEN PUNT', x + 104, y + 38, C.koraal, 'left', 20); L.forEach((l, k) => text(ctx, l, x + 104, y + 36 + px + 6 + k * (px + 10), fTekst(px, 600), C.text, 'left')); ctx.restore(); return h; }

// ketting: schakels van links naar rechts; items=[{t, a}] ; (x,y) = midden links
function ketting(ctx, items, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = items.length, gap = 70, bw = (w - gap * (n - 1)) / n, px = o.px || 30;
  items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; const bx = x + i * (bw + gap); if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, it.t, bw - 40); const h = 40 + L.length * (px + 8);
    roundRect(ctx, bx, y - h / 2, bw, h, h / 2 > 50 ? 26 : h / 2); shape(ctx, rgba(it.col || C.goud, 0.14), it.col || C.goud, 2.5);
    L.forEach((l, k) => text(ctx, l, bx + bw / 2, y - (L.length - 1) * (px + 8) / 2 + px * 0.36 + k * (px + 8), fTekst(px, 600), C.text, 'center'));
    if (i < n - 1) pijl(ctx, bx + bw + 10, y, bx + bw + gap - 10, y, C.line, 1, 4, 16); ctx.restore(); });
  ctx.restore(); }

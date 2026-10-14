// Voeding 7 · Supplementen en superfoods — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#6B3F22', shirt: '#7A9A5E', hairStyle: 'long' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const VIR = '#E07A5F', BCOL = '#5BA4C9', TCOL = '#7FC48F', AS = '#E0B64A', WIT = '#D8DCE2', EIGEN = '#8C7BBF', BEEN = '#E6D8A8', LYMF = '#7FC48F';

function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1, ang = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -60, -24, 120, 48, 24); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -24, 60, 48, 24); ctx.fill(); ctx.fillRect(0, -24, 20, 48); ctx.restore(); }

// ---------- film 7: kleuren en figuren ----------
const VD = '#E0B64A', VC = '#F2A65A', VA = '#E07A5F', VB = '#C9708F', VET = '#E8D27A', WATER = '#5BA4C9', OPA = { hair: '#C9C9C9', shirt: '#5A7FA0', hairStyle: 'short' };
const VAK4 = [['VASTGESTELD', C.groen], ['WAARSCHIJNLIJK', C.goud], ['HYPOTHESE', C.paars], ['WEERLEGD', C.koraal]];
function wrapC(ctx, s, x, y, maxW, lh) { const words = s.split(' '); let line = '', lines = []; for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; } if (line) lines.push(line); ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh)); return lines.length; }
// bewijsbord met vier vakken; items: [[vak, tekst, alpha]]; nieuw = alpha van het vak WEERLEGD
function wrapL(ctx, s, x, y, maxW, lh) { const words = s.split(' '); let line = '', lines = []; for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; } if (line) lines.push(line); ctx.textAlign = 'left'; lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh)); return lines.length; }
function bord4(ctx, items, a = 1, o = {}) { if (a <= 0.01) return; const { x = 120, y = 150, w = 1680, h = 640, nieuw = 1, def = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 22); shape(ctx, rgba(C.fill, 0.25), rgba(C.line, 0.5), 1.4); metaText(ctx, 'BEWIJSBORD', x + w / 2, y - 20, C.grain, 'center', 26);
  const cw = (w - 56) / 4;
  VAK4.forEach(([naam, col], i) => { const al = i === 3 ? nieuw : 1; if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const cx = x + 16 + i * (cw + 8); roundRect(ctx, cx, y + 18, cw, 64, 14); shape(ctx, rgba(col, 0.16), col, i === 3 ? 2.6 : 1.6); metaText(ctx, naam, cx + cw / 2, y + 59, lighten(col, 0.3), 'center', 24);
    if (i === 3 && def > 0.01) { ctx.save(); ctx.globalAlpha *= def; ctx.font = fTekst(24, 400); ctx.fillStyle = C.text2; wrapC(ctx, 'goed getest, met een controlegroep, en het klopte niet', cx + cw / 2, y + 116, cw - 30, 30); ctx.restore(); }
    let yy = y + (i === 3 && def > 0.01 ? 220 : 130); items.filter(it => it[0] === i).forEach(it => { if (it[2] <= 0.01) return; ctx.save(); ctx.globalAlpha *= it[2]; ctx.font = fTekst(28, 500); ctx.fillStyle = C.text; const n = wrapL(ctx, it[1], cx + 36, yy, cw - 56, 34); ctx.beginPath(); ctx.arc(cx + 20, yy - 10, 6, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); yy += 34 * n + 22; }); ctx.restore(); });
  ctx.restore(); }
function potje(ctx, x, y, s = 1, lab = 'vitamine C', sub = '1000 mg', col = VC, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -150, 120, 30, 8); shape(ctx, '#E6E1D3', '#9AA3B2', 2); roundRect(ctx, -70, -120, 140, 190, 22); shape(ctx, rgba('#F2F2EE', 0.85), '#9AA3B2', 2); roundRect(ctx, -64, -80, 128, 100, 8); shape(ctx, col, null);
  text(ctx, lab, 0, -40, fTekst(22, 700), '#1A2740', 'center'); text(ctx, sub, 0, -8, fTekst(20, 600), '#1A2740', 'center'); ctx.restore(); }
function keuken(ctx, t, o = {}) { const { noor = 1, opaX = 700, spullen = 1, noorX = 1600 } = o;
  ctx.fillStyle = '#4A3F36'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E5044'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#3A2F28'; ctx.fillRect(0, 780, W, H - 780);
  for (let i = 0; i < 6; i++) { roundRect(ctx, 1280 + (i % 3) * 180, 150 + Math.floor(i / 3) * 170, 160, 150, 8); shape(ctx, '#6B5848', '#8C7660', 2); }
  person(ctx, opaX, 900, 500, 1, Object.assign({}, OPA, { armR: { a1: 0.9, a2: 1.4 } }));
  if (noor > 0.01) person(ctx, noorX, 900, 470, noor, { armL: { a1: 0.4, a2: 0.6 } });
  roundRect(ctx, 820, 600, 640, 26, 6); shape(ctx, '#8C6A44', '#6B4E3A', 2); ctx.fillStyle = '#6B4E3A'; ctx.fillRect(850, 626, 16, 160); ctx.fillRect(1414, 626, 16, 160);
  if (spullen > 0.01) { ctx.save(); ctx.globalAlpha *= spullen; potje(ctx, 960, 590, 0.55);
    roundRect(ctx, 1060, 480, 110, 120, 10); shape(ctx, '#C9483E', '#8C2A2A', 2); text(ctx, 'goji', 1115, 545, fTekst(22, 700), '#F2F2EE', 'center'); for (let i = 0; i < 5; i++) circ(ctx, 1080 + i * 18, 575, 6, '#E05A4A');
    roundRect(ctx, 1210, 470, 170, 130, 10); shape(ctx, '#7FC48F', '#4A7040', 2); text(ctx, 'detox', 1295, 530, fTekst(26, 700), '#1A2740', 'center'); text(ctx, 'thee', 1295, 560, fTekst(22, 600), '#1A2740', 'center'); ctx.restore(); }
}
function bot(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.4); ctx.scale(s, s); roundRect(ctx, -30, -130, 60, 260, 30); shape(ctx, rgba('#E6D8A8', 0.3), '#E6D8A8', 3); for (const sy of [-1, 1]) for (const sx of [-1, 1]) circ(ctx, sx * 26, sy * 130, 32, rgba('#E6D8A8', 0.35), '#E6D8A8', 3); ctx.restore(); }
function zon(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 12; i++) { const an = i * 0.524 + t * 0.2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2); ctx.lineTo(x + Math.cos(an) * r * 1.6, y + Math.sin(an) * r * 1.6); ctx.stroke(); } circ(ctx, x, y, r, rgba(C.goud, 0.85), C.goud, 2); ctx.restore(); }
function schijf(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vak = [['groente en fruit', '#7FC48F'], ['smeer- en bereidingsvetten', '#E8D27A'], ['vis, peulvruchten, vlees, ei, noten, zuivel', '#E07A5F'], ['brood, graanproducten, aardappelen', '#C9A35C'], ['dranken', '#5BA4C9']]; const ang = [0, 1.6, 2.4, 3.9, 5.4, 6.283];
  vak.forEach(([n, col], i) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, ang[i] - 1.571, ang[i + 1] - 1.571); ctx.closePath(); shape(ctx, rgba(col, 0.55), '#1A2740', 3); });
  circ(ctx, x, y, r * 0.3, '#1A2740'); text(ctx, 'Schijf', x, y - 4, fTekst(24, 700), C.text, 'center'); text(ctx, 'van Vijf', x, y + 24, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
function broodje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, -20, 150, 60, 0, Math.PI, 0); shape(ctx, '#C9A35C', '#8C6A44', 3); ctx.fillStyle = '#F0D78C'; ctx.fillRect(-150, -24, 300, 22); ctx.beginPath(); ctx.ellipse(0, 0, 150, 26, 0, 0, Math.PI); shape(ctx, '#B08A5C', '#8C6A44', 3);
  roundRect(ctx, 210, -150, 90, 170, 10); shape(ctx, rgba('#F2F2EE', 0.9), '#C9D2DE', 2); ctx.restore(); }
function poppetjes100(ctx, x, y, n, rood, half = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const px = x + (i % 20) * 52, py = y + Math.floor(i / 20) * 82; const col = i < rood ? C.koraal : C.text2; circ(ctx, px, py - 26, 10, col); roundRect(ctx, px - 11, py - 12, 22, 32, 9); ctx.fillStyle = col; ctx.fill();
  if (i === rood && half > 0.01) { ctx.save(); ctx.globalAlpha *= half; ctx.beginPath(); ctx.rect(px - 12, py - 40, 12, 64); ctx.clip(); circ(ctx, px, py - 26, 10, C.koraal); roundRect(ctx, px - 11, py - 12, 22, 32, 9); ctx.fillStyle = C.koraal; ctx.fill(); ctx.restore(); } } ctx.restore(); }
function staaf(ctx, x, y0, w, hh, col, lab, val, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y0 - hh, w, hh, 6); shape(ctx, rgba(col, 0.7), col, 2); regel(ctx, lab, x + w / 2, y0 + 40, 1, C.text2, 24, 'center', 700); if (val) regel(ctx, val, x + w / 2, y0 - hh - 16, 1, C.text, 26, 'center', 700); ctx.restore(); }


// ---------- hoofdstuk 4: hypes op het bewijsbord ----------
const B4 = { x: 120, y: 130, w: 1680, h: 430 };
function hypeItems(q, stage) { // cumulatief: stage = nummer van de scène in H4 (1..6)
  const full = (k) => stage > k ? 1 : null; const it = [];
  const add = (k, vak, txt, cue) => { const a = full(k) != null ? 1 : (stage === k ? cue : 0); if (a > 0.01) it.push([vak, txt, a]); };
  add(1, 0, 'creatine: sprint en kracht', stage === 1 ? q.on('Vastgesteld', 1) : 1);
  add(2, 0, 'vitamine D in de adviesgroepen', stage === 2 ? q.on('vastgesteld', 1) : 1);
  add(2, 3, 'vitamine D bij gezonden: kanker, hart, botbreuk', stage === 2 ? q.on('weerlegd', 1) : 1);
  add(2, 1, 'vitamine D: iets minder luchtweginfecties (klein)', stage === 2 ? q.on('Waarschijnlijk', 1) : 1);
  add(3, 0, 'niacine tegen pellagra', stage === 3 ? q.on('vastgesteld', 1) : 1);
  add(3, 3, 'veel niacine tegen hartinfarct', stage === 3 ? q.on('Weerlegd', 1) : 1);
  add(4, 2, 'NMN tegen ouder worden', stage === 4 ? q.on('getest', 1) : 1);
  add(6, 2, 'magnesium-threonaat: geheugen', stage === 6 ? q.on('Hypothese', 1) : 1);
  return it; }
function muis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-60, 10); ctx.quadraticCurveTo(-110, 0, -120, -30); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 66, 40, 0, 0, 6.283); shape(ctx, '#9AA3B2', null); circ(ctx, 60, -10, 30, '#9AA3B2'); circ(ctx, 50, -40, 16, '#C9A0A8'); circ(ctx, 74, -14, 4, '#1A2740'); circ(ctx, 90, -6, 5, '#C9708F'); ctx.restore(); }
function nadMol(ctx, x, y, a = 1, lab = 'NAD+') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 30, 140, 60, 30); shape(ctx, rgba(C.teal, 0.25), C.teal, 2); text(ctx, lab, x, y + 10, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
const SCENES = {
  title(ctx, t) { bg(ctx, 'schema'); potje(ctx, 1500, 700, 1.2); schijf(ctx, 1720, 360, 110); vraagteken(ctx, 1300, 620, 0.6 + 0.4 * Math.sin(t), 120); },

  s01(ctx, t, q) { keuken(ctx, t);
    tag(ctx, '1000 mg vitamine C, elke ochtend', 960, 300, VC, q.on('Duizend', 1) * (1 - q.on('bewijs', 1)));
    tag(ctx, '"al jaren niet verkouden: dus het werkt"', 960, 380, C.text2, q.on('jaren', 1) * (1 - q.on('bewijs', 1)));
    vraagteken(ctx, 960, 470, q.on('bewijs', 1), 150); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('Toch', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; broodje(ctx, 520, 520, 1.3); regel(ctx, 'broodje kaas met melk (film 1)', 600, 720, 1, C.text2, 28, 'center', 700);
      for (let i = 0; i < 8; i++) circ(ctx, 380 + i * 40, 300 + 20 * Math.sin(i + t), 7, [VD, VC, VA, VB][i % 4], null); regel(ctx, 'vitaminen en mineralen: kleine hoeveelheden', 520, 240, q.on('Vitaminen', 1), C.text, 26, 'center', 700);
      schijf(ctx, 1340, 470, 230, q.on('Schijf', 1)); regel(ctx, 'gevarieerd eten: bijna alles binnen', 1340, 780, q.on('binnen', 1), C.groen, 28, 'center', 700); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      zon(ctx, 220, 220, 60, t); const hd = q.on('huid', 1); roundRect(ctx, 140, 380, 300, 80, 20); shape(ctx, rgba('#E8C2A4', 0.5 * hd), '#E8C2A4', 2); regel(ctx, 'huid', 290, 432, hd, C.text, 26, 'center', 700);
      ctx.strokeStyle = rgba(C.goud, 0.6 * hd); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(240 + i * 30, 300); ctx.lineTo(260 + i * 30, 380); ctx.stroke(); }
      arrow(ctx, 460, 420, 600, 420, C.line, q.on('vitamine', 2), 3); circ(ctx, 660, 420, 30, rgba(VD, q.on('vitamine', 2)), null); regel(ctx, 'vitamine D', 660, 490, q.on('vitamine', 2), VD, 26, 'center', 700);
      arrow(ctx, 710, 420, 830, 420, C.line, q.on('calcium', 1), 3); regel(ctx, 'calcium opnemen', 940, 430, q.on('calcium', 1), C.text, 26, 'center', 700); bot(ctx, 940, 600, 0.8, q.on('botten', 1)); regel(ctx, 'sterke botten', 940, 800, q.on('botten', 1), '#E6D8A8', 26, 'center', 700);
      const gr = [['jonge kinderen', 'kinderen'], ['zwangere vrouwen', 'zwangere'], ['donkere huid of weinig buiten', 'donkere'], ['vrouwen vanaf 50', 'vijftig'], ['iedereen vanaf 70 (dubbele dosis)', 'zeventig']];
      regel(ctx, 'advies: extra vitamine D', 1500, 220, q.on('Jonge', 1), VD, 30, 'center', 700); gr.forEach(([s, w], i) => tag(ctx, s, 1500, 310 + i * 95, VD, q.on(w, 1)));
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    potje(ctx, 300, 560, 1, 'foliumzuur', '400 µg', '#9FD6C8', q.on('foliumzuur', 1));
    const X = 560, Y = 520, Wl = 1200; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + Wl, Y); ctx.stroke();
    const mk = [[-4, '4 weken vóór', 'maand'], [0, 'bevruchting', 'zwangerschap'], [4, 'ruggetje sluit', 'sluit'], [4.5, 'vaak pas: zwanger?', 'weet'], [8, 'tot 8 weken erna', 'weet']];
    mk.forEach(([wk, lab, w], i) => { const x = X + (wk + 5) / 14 * Wl; const al = q.on(w, 1); circ(ctx, x, Y, 9, rgba(i === 2 ? C.koraal : C.goud, al), null); regel(ctx, lab, x, Y + (i % 2 ? -30 : 50), al, C.text, 24, 'center', 700); });
    ctx.save(); ctx.globalAlpha *= q.on('maand', 1); ctx.fillStyle = rgba('#9FD6C8', 0.25); ctx.fillRect(X + 1 / 14 * Wl, Y - 14, 12 / 14 * Wl, 28); ctx.restore(); regel(ctx, 'weken na de bevruchting', X + Wl, Y + 150, 1, C.text2, 20, 'right', 600); regel(ctx, 'foliumzuur slikken', X + 7 / 14 * Wl, Y + 110, q.on('maand', 1), '#9FD6C8', 26, 'center', 700);
    tag(ctx, 'verkleint de kans op een open ruggetje', 1160, 260, C.koraal, q.on('ruggetje', 1) * (1 - q.on('Wie', 1)));
    vraagteken(ctx, 1160, 300, q.on('Wie', 1), 130); potje(ctx, 1500, 360, 0.6, 'vitamine B12', '', VB, q.on('B12', 1)); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    const dier = [['vlees', '#B5574A'], ['vis', '#9FC3E0'], ['eieren', '#F0D78C'], ['zuivel', '#F2F2EE']];
    dier.forEach(([n, col], i) => { const x = 280 + i * 190, al = 1; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 70, 230, 140, 110, 20); shape(ctx, rgba(col, 0.4), col, 2); regel(ctx, n, x, 380, 1, C.text, 24, 'center', 700); ctx.restore(); });
    regel(ctx, 'B12 zit bijna alleen in dierlijke producten', 560, 180, q.on('dierlijke', 1), VB, 28, 'center', 700);
    const vg = q.on('veganistisch', 1); ctx.save(); ctx.globalAlpha *= vg; circ(ctx, 1380, 290, 110, rgba('#7FC48F', 0.25), '#7FC48F', 3); regel(ctx, 'veganistisch', 1380, 300, 1, C.text, 26, 'center', 700); regel(ctx, 'nauwelijks B12', 1380, 440, 1, C.koraal, 24, 'center', 700); ctx.restore(); potje(ctx, 1640, 380, 0.6, 'B12', '', VB, q.on('supplement', 1)); vink(ctx, 1640, 200, 26, q.on('supplement', 1));
    const sp = q.on('sporter', 1); tag(ctx, 'sporter? eet meer, dus ook meer B12', 560, 600, C.text2, sp);
    tag(ctx, 'weinig buiten? extra vitamine D, geen B12', 1300, 600, VD, q.on('buiten', 1));
    tag(ctx, 'ijzer: alleen bij een tekort uit een bloedtest', 960, 760, '#B5574A', q.on('ijzer', 1));
  },
  s08(ctx, t, q) { bg(ctx, 'schema'); potje(ctx, 700, 560, 1.1, 'vitamine D', '', VD); potje(ctx, 1220, 560, 1.1, 'vitamine C', '', VC); for (let i = 0; i < 6; i++) { circ(ctx, 600 + i * 40, 750, 10, rgba(VD, q.on('maandenlang', 1))); circ(ctx, 1120 + i * 40, 750, 10, rgba(VC, q.on('maandenlang', 1))); } regel(ctx, 'maandenlang veel te veel', 960, 820, q.on('maandenlang', 1), C.text2, 26, 'center', 700); vraagteken(ctx, 960, 400, q.on('welke', 1), 140); },
  s10(ctx, t, q) { bg(ctx, 'schema');
    const st = ramp(t, q.at('stapelen'), 6), ni = q.on('nieren', 1);
    regel(ctx, 'oplosbaar in vet: A, D, E, K', 520, 200, q.on('vet', 1), VET, 30, 'center', 700);
    roundRect(ctx, 320, 260, 400, 420, 30); shape(ctx, rgba(VET, 0.08), rgba(VET, 0.6), 2); regel(ctx, 'lever en vetweefsel', 520, 720, q.on('lever', 1), VET, 26, 'center', 700); for (let i = 0; i < Math.round(40 * st); i++) circ(ctx, 350 + (i % 8) * 46, 650 - Math.floor(i / 8) * 46, 14, rgba(VD, 0.85));
    tag(ctx, 'stapelt zich op: na maanden schadelijk', 520, 820, VA, q.on('schadelijk', 1) * (1 - q.on('ongeboren', 1))); tag(ctx, 'te veel vitamine A: slecht voor een ongeboren kind', 520, 820, VA, q.on('ongeboren', 1) * (1 - q.on('Misschien', 1)));
    regel(ctx, 'oplosbaar in water: C, B', 1400, 200, q.on('water', 1), WATER, 30, 'center', 700);
    ctx.save(); ctx.globalAlpha *= q.on('water', 1); ctx.beginPath(); ctx.ellipse(1300, 440, 90, 140, 0.15, 0, 6.283); shape(ctx, rgba('#B5574A', 0.3), '#B5574A', 3); ctx.beginPath(); ctx.ellipse(1500, 440, 90, 140, -0.15, 0, 6.283); shape(ctx, rgba('#B5574A', 0.3), '#B5574A', 3); regel(ctx, 'nieren', 1180, 450, 1, '#E07A6E', 26, 'right', 700); ctx.restore();
    for (let i = 0; i < 8; i++) { const u = (t * 0.4 + i / 8) % 1; circ(ctx, 1400 + 20 * Math.sin(i), lerp(600, 780, u), 10, rgba(VC, ni * (1 - u))); } regel(ctx, 'teveel → urine', 1400, 820, q.on('plast', 1), WATER, 26, 'center', 700);
    tag(ctx, 'ook te veel B6 kan schaden: zenuwschade', 1400, 140, VB, q.on('wateroplosbaar', 1));
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('Mensen', 1), p3 = q.on('Dus', 1);
    ctx.save(); ctx.globalAlpha *= 1 - p2; ctx.save(); ctx.translate(560, 460); ctx.rotate(0.5); ctx.beginPath(); ctx.moveTo(-30, -150); ctx.lineTo(30, -150); ctx.lineTo(0, 170); ctx.closePath(); shape(ctx, '#F28C28', '#C96A14', 3); ctx.restore(); regel(ctx, 'bètacaroteen: oranje kleurstof uit wortels', 960, 220, q.on('Bètacaroteen', 1), '#F28C28', 30, 'center', 700); arrow(ctx, 760, 460, 1080, 460, C.line, q.on('maakt', 1), 3); circ(ctx, 1180, 460, 50, rgba(VA, q.on('maakt', 1))); regel(ctx, 'vitamine A', 1180, 560, q.on('maakt', 1), VA, 28, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= p2 * (1 - p3); regel(ctx, 'verbandonderzoek: wie veel groente eet, krijgt minder vaak kanker', 960, 200, 1, C.text, 28, 'center', 700); staaf(ctx, 700, 700, 160, 340, C.text2, 'weinig groente', ''); staaf(ctx, 1060, 700, 160, 230, C.groen, 'veel groente', ''); regel(ctx, 'kanker', 600, 360, 1, C.text2, 24, 'right', 700); ctx.restore();
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const mr = q.on('meer', 1);
      regel(ctx, 'proef: bijna 30 000 rokers, door loting', 960, 200, 1, C.text, 30, 'center', 700); staaf(ctx, 700, 700, 180, 300, C.text2, 'placebo', ''); staaf(ctx, 1060, 700, 180, lerp(300, 355, mr), C.koraal, 'bètacaroteenpil', ''); regel(ctx, 'longkanker', 600, 400, 1, C.text2, 24, 'right', 700); regel(ctx, 'gehoopt: minder', 1150, 300, q.on('hoopten', 1) * (1 - mr), C.groen, 26, 'center', 700); tag(ctx, 'het werden er juist meer', 1150, 280, C.koraal, mr);
      tag(ctx, 'wortels eten: geen probleem · losse pillen bij rokers', 960, 820, C.groen, q.on('Wortels', 2)); ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('Superfood', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; ctx.beginPath(); ctx.ellipse(560, 420, 220, 130, -0.2, 0, 6.283); shape(ctx, rgba('#8C3A2A', 0.6), '#B5574A', 3); regel(ctx, 'lever (film Voeding 5)', 560, 620, 1, C.text, 26, 'center', 700); ctx.beginPath(); ctx.ellipse(1000, 420, 70, 110, 0.15, 0, 6.283); shape(ctx, rgba('#B5574A', 0.3), '#B5574A', 3); ctx.beginPath(); ctx.ellipse(1160, 420, 70, 110, -0.15, 0, 6.283); shape(ctx, rgba('#B5574A', 0.3), '#B5574A', 3); regel(ctx, 'nieren (Hormonen 5)', 1080, 620, 1, C.text, 26, 'center', 700);
      tag(ctx, 'ruimen de hele dag afvalstoffen op', 860, 200, C.groen, q.on('afvalstoffen', 1)); roundRect(ctx, 1440, 330, 220, 180, 14); shape(ctx, '#7FC48F', '#4A7040', 2); text(ctx, 'detox', 1550, 420, fTekst(36, 700), '#1A2740', 'center'); text(ctx, 'thee', 1550, 460, fTekst(28, 600), '#1A2740', 'center'); tag(ctx, 'geen goed onderzoek', 1550, 600, C.koraal, q.on('onderzoek', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      roundRect(ctx, 300, 260, 420, 300, 20); shape(ctx, '#E05A4A', '#8C2A2A', 3); text(ctx, 'SUPERFOOD!', 510, 350, fTitel(48), '#F2F2EE', 'center'); for (let i = 0; i < 12; i++) circ(ctx, 360 + (i % 6) * 60, 440 + Math.floor(i / 6) * 50, 12, '#F2A8A0'); regel(ctx, 'reclamewoord, geen wetenschappelijk woord', 510, 620, q.on('reclamewoord', 1), C.koraal, 26, 'center', 700);
      regel(ctx, 'goji, chiazaad, boerenkool: gewoon gezond eten', 510, 680, q.on('boerenkool', 1), C.groen, 24, 'center', 700);
      const eu = q.on('Europa', 1); ctx.save(); ctx.globalAlpha *= eu; circ(ctx, 1150, 340, 90, '#1A3A8C', '#F0D78C', 2); for (let i = 0; i < 12; i++) { const an = i * 0.524; text(ctx, '★', 1150 + Math.cos(an) * 60, 350 + Math.sin(an) * 60, fTekst(20, 700), '#F0D78C', 'center'); } regel(ctx, 'alleen getoetste, goedgekeurde claims', 1150, 480, 1, C.text, 26, 'center', 700); ctx.restore();
      potje(ctx, 1560, 470, 0.9, 'vitamine C', '', VC, q.on('pot', 1)); regel(ctx, '"draagt bij aan de normale werking', 1560, 640, q.on('draagt', 1), C.text, 24, 'center', 700); regel(ctx, 'van het afweersysteem"', 1560, 672, q.on('draagt', 1), C.text, 24, 'center', 700);
      tag(ctx, 'mag, maar extra slikken helpt niet extra', 1300, 820, C.goud, q.on('betekent', 1));
      ctx.restore(); }
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const lo = ramp(t, q.at('loting'), 2);
    const order = [...Array(20).keys()].sort((a, b) => hash(a * 7) - hash(b * 7)); for (let i = 0; i < 20; i++) { const gx = 700 + (i % 5) * 110, gy = 260 + Math.floor(i / 5) * 90; const r = order.indexOf(i), grp = r < 10 ? 0 : 1, idx = r % 10; const tx = (grp ? 1220 : 200) + (idx % 5) * 90, ty = 330 + Math.floor(idx / 5) * 100; const x = lerp(gx, tx, lo), y = lerp(gy, ty, lo); circ(ctx, x, y - 22, 10, C.text2); roundRect(ctx, x - 11, y - 8, 22, 30, 8); ctx.fillStyle = C.text2; ctx.fill(); }
    regel(ctx, 'proefgroep: vitamine C', 380, 230, q.on('proefgroep', 1), VC, 28, 'center', 700); regel(ctx, 'controlegroep: placebo', 1400, 230, q.on('controlegroep', 1), C.text2, 28, 'center', 700);
    pil(ctx, 380, 820, 0.8, q.on('proefgroep', 1), 0); pil(ctx, 1400, 820, 0.8, q.on('placebo', 1), 0); regel(ctx, 'ziet er precies hetzelfde uit', 890, 830, q.on('uitziet', 1), C.text, 24, 'center', 700);
    tag(ctx, 'placebo-effect: ook van een nep-pil voel je je beter', 960, 150, C.paars, q.on('placebo-effect', 1) * (1 - q.on('dubbelblind', 1)));
    tag(ctx, 'dubbelblind: deelnemers én onderzoekers weten het niet', 960, 150, C.goud, q.on('dubbelblind', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    regel(ctx, 'ruim 10 000 mensen, veel onderzoeken samen', 960, 160, 1, C.text2, 26, 'center', 700);
    const a1 = q.on('minder', 1), a2 = q.on('korter', 1);
    regel(ctx, 'hoe vaak verkouden', 560, 240, a1, C.text, 28, 'center', 700); staaf(ctx, 400, 650, 130, 300, C.text2, 'placebo', '', a1); staaf(ctx, 590, 650, 130, 300, VC, 'vitamine C', '', a1); tag(ctx, 'gelijk', 560, 760, C.text2, a1);
    regel(ctx, 'hoe lang een verkoudheid duurt', 1360, 240, a2, C.text, 28, 'center', 700); staaf(ctx, 1200, 650, 130, 330, C.text2, 'placebo', '± 6 dagen', a2); staaf(ctx, 1390, 650, 130, 303, VC, 'vitamine C', '', a2); regel(ctx, '± een halve dag korter', 1455, 720, a2, VC, 24, 'center', 700);
    vraagteken(ctx, 960, 470, q.on('Wat', 1), 120); },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const fb = q.on('fabrikant', 1);
    ctx.save(); ctx.globalAlpha *= 1 - fb; tag(ctx, 'antwoord b: het effect is echt, maar klein', 960, 180, C.goud, 1); staaf(ctx, 760, 650, 160, 330, C.text2, 'placebo', '', 1); staaf(ctx, 1000, 650, 160, 303, VC, 'vitamine C', '', 1); regel(ctx, 'hoeveel effect?', 960, 760, q.on('hoeveel', 1), C.goud, 30, 'center', 700); tag(ctx, 'bij zoveel mensen: toeval onwaarschijnlijk', 960, 840, C.groen, q.on('toeval', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= fb; roundRect(ctx, 560, 240, 800, 220, 24); shape(ctx, '#F2F2EE', '#9AA3B2', 2); text(ctx, '9 van de 10 gebruikers', 960, 330, fTitel(52), '#1A2740', 'center'); text(ctx, 'voelen zich fitter!', 960, 400, fTekst(40, 700), '#1A2740', 'center');
      tag(ctx, 'zonder controlegroep met placebo zegt het niets', 960, 600, C.koraal, q.on('controlegroep', 1)); tag(ctx, 'en: wie betaalde het onderzoek?', 960, 720, C.goud, q.on('betaalde', 1)); ctx.restore();
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    bord4(ctx, [[3, 'vitamine C voorkomt verkoudheid (gewone bevolking)', q.on('voorkomt', 1)], [3, 'bètacaroteenpillen beschermen rokers', q.on('Bètacaroteenpillen', 1)], [0, 'vitamine B12 bij veganistisch eten', q.on('B12', 1)], [0, 'vitamine C: verkoudheid ± halve dag korter (vraag H3)', q.on('voorkomt', 1)], [2, 'detoxthee helpt je ontgiften', q.on('detoxthee', 1)]], 1, { nieuw: q.on('weerlegd', 1), def: q.on('claim', 1) });
  },
  s18(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, '100 rokers zonder pil', 960, 200, 1, C.text2, 28, 'center', 700); poppetjes100(ctx, 470, 300, 100, Math.round(3 * q.on('drie', 1))); regel(ctx, '± 3 krijgen longkanker', 960, 760, q.on('drie', 1), C.koraal, 28, 'center', 700); tag(ctx, 'met bètacaroteen: 18 % meer', 960, 130, C.koraal, q.on('achttien', 1)); vraagteken(ctx, 1600, 480, q.on('hoeveel', 1), 120); },
  s20(ctx, t, q) { bg(ctx, 'schema');
    const ma = q.on('meta-analyse', 1);
    ctx.save(); ctx.globalAlpha *= 1 - ma; poppetjes100(ctx, 470, 300, 100, 3, q.on('half', 1)); regel(ctx, 'antwoord c: ± 3,5 op de 100', 960, 200, 1, C.goud, 30, 'center', 700);
      tag(ctx, 'relatief: 18 % meer', 700, 780, C.koraal, q.on('relatief', 1)); tag(ctx, 'absoluut: ± een half op de 100 erbij', 1250, 780, C.goud, q.on('absolute', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= ma; regel(ctx, 'meta-analyse: alle goede onderzoeken samen', 960, 200, 1, C.text, 30, 'center', 700); const X = 960; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, 260); ctx.lineTo(X, 760); ctx.stroke();
      for (let i = 0; i < 8; i++) { const y = 290 + i * 52, m = X - 30 + 70 * (hash(i * 3) - 0.6), w = 60 + 120 * hash(i * 5); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(m - w / 2, y); ctx.lineTo(m + w / 2, y); ctx.stroke(); circ(ctx, m, y, 7, C.text2); }
      ctx.beginPath(); ctx.moveTo(X - 55, 730); ctx.lineTo(X - 35, 712); ctx.lineTo(X - 15, 730); ctx.lineTo(X - 35, 748); ctx.closePath(); shape(ctx, C.goud, null); regel(ctx, 'samen', X - 110, 740, 1, C.goud, 24, 'right', 700); regel(ctx, '← verkoudheid korter', X - 20, 790, 1, C.text2, 22, 'right', 700); regel(ctx, 'langer →', X + 20, 790, 1, C.text2, 22, 'left', 700); regel(ctx, 'geen verschil', X, 252, 1, C.text2, 22, 'center', 700); regel(ctx, 'weegt zwaarder dan één onderzoek', 960, 830, q.on('zwaarder', 1), C.goud, 26, 'center', 700); ctx.restore();
  },
  s21(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 1), 1, Object.assign({ nieuw: 1 }, B4));
    const cr = q.on('spieren', 1); ctx.save(); ctx.globalAlpha *= cr; roundRect(ctx, 260, 640, 300, 70, 20); shape(ctx, rgba(C.goud, 0.2), C.goud, 2); text(ctx, 'creatinefosfaat', 410, 686, fTekst(30, 700), C.text, 'center');
      arrow(ctx, 580, 675, 720, 675, C.line, q.on('ATP', 1), 3); circ(ctx, 790, 675, 46, rgba(C.koraal, 0.3 * q.on('ATP', 1)), rgba(C.koraal, q.on('ATP', 1)), 3); regel(ctx, 'ATP', 790, 686, q.on('ATP', 1), C.text, 30, 'center', 700); ctx.restore();
    tag(ctx, 'sprint, kracht: een paar procent beter', 1290, 660, C.groen, q.on('procent', 1)); tag(ctx, 'duursport: effect niet aangetoond', 1290, 760, C.koraal, q.on('duursport', 1)); },
  s22(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 2), 1, Object.assign({ nieuw: 1 }, B4)); const rct = q.on('groot', 1);
    ctx.save(); ctx.globalAlpha *= q.on('Mensen', 2) * (1 - rct); regel(ctx, 'veel vitamine D in het bloed → gezonder?', 960, 650, 1, C.text, 30, 'center', 700); tag(ctx, 'maar: meer buiten, meer bewegen', 960, 740, C.goud, q.on('buiten', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= rct; regel(ctx, 'ruim 25 000 gezonde 50-plussers, ± 5 jaar, met placebo', 520, 640, 1, C.text2, 26, 'center', 700);
      [['kanker', 0], ['hartziekte', 1], ['botbreuken', 2]].forEach(([n, i]) => { const x = 1000 + i * 260; staaf(ctx, x, 860, 70, 150, C.text2, '', '', q.on('kreeg', 1)); staaf(ctx, x + 80, 860, 70, 147, C.goud, '', '', q.on('kreeg', 1)); regel(ctx, n, x + 75, 690, q.on('kreeg', 1), C.text, 24, 'center', 700); });
      regel(ctx, 'grijs: placebo · goud: vitamine D', 520, 720, q.on('kreeg', 1), C.text2, 24, 'center', 600); ctx.restore(); },
  s23(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 3), 1, Object.assign({ nieuw: 1 }, B4)); const hart = q.on('hartinfarcten', 1);
    ctx.save(); ctx.globalAlpha *= 1 - hart; nadMol(ctx, 520, 690, q.on('NAD', 1)); regel(ctx, 'waterstofdrager bij de verbranding', 520, 790, q.on('waterstofdrager', 1), C.teal, 26, 'center', 700); tag(ctx, 'tekort: pellagra', 1250, 700, C.koraal, q.on('pellagra', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= hart; regel(ctx, '± 30 000 hart- en vaatpatiënten', 420, 640, 1, C.text2, 26, 'center', 700); regel(ctx, 'grijs: placebo · goud: niacine', 420, 690, q.on('bloedwaarden', 1), C.text2, 22, 'center', 600);
      staaf(ctx, 300, 860, 80, 90, C.text2, '', '', q.on('bloedwaarden', 1)); staaf(ctx, 400, 860, 80, 130, C.goud, '', '', q.on('bloedwaarden', 1)); regel(ctx, 'HDL-cholesterol', 390, 715, q.on('bloedwaarden', 1), C.text, 22, 'center', 700);
      staaf(ctx, 900, 860, 80, 120, C.text2, '', '', q.on('minder', 1)); staaf(ctx, 1000, 860, 80, 118, C.goud, '', '', q.on('minder', 1)); regel(ctx, 'hartinfarcten', 990, 710, q.on('minder', 1), C.text, 22, 'center', 700);
      tag(ctx, 'wel meer bijwerkingen', 1480, 720, C.koraal, q.on('bijwerkingen', 1)); tag(ctx, 'betere bloedwaarden ≠ minder ziek', 1480, 820, C.goud, q.on('betekenen', 1)); ctx.restore(); },
  s24(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 4), 1 - 0.6 * q.on('Toch', 1), Object.assign({ nieuw: 1 }, B4)); const mens = q.on('mensen', 1), vr = q.on('allebei', 1);
    ctx.save(); ctx.globalAlpha *= 1 - vr; nadMol(ctx, 420, 700, q.on('NMN', 1), 'NMN'); arrow(ctx, 500, 700, 620, 700, C.line, q.on('daar', 1), 3); nadMol(ctx, 700, 700, q.on('daar', 1));
      muis(ctx, 1050, 720, 1, q.on('muizen', 1) * (1 - mens)); tag(ctx, 'muizen: minder achteruitgang met de leeftijd', 1050, 830, C.groen, q.on('muizen', 1) * (1 - mens));
      tag(ctx, 'mensen: klein en kort, hooguit 3 maanden', 1350, 660, C.text2, mens); tag(ctx, 'NAD+ in het bloed omhoog', 1350, 740, C.teal, q.on('stijgt', 1)); tag(ctx, 'langer gezond? nooit getest', 1350, 820, C.goud, q.on('getest', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= vr; nadMol(ctx, 560, 720, 1, 'niacine'); nadMol(ctx, 1360, 720, 1, 'NMN'); arrow(ctx, 640, 700, 860, 640, C.line, 1, 3); arrow(ctx, 1280, 700, 1060, 640, C.line, 1, 3); nadMol(ctx, 960, 620, 1); regel(ctx, 'weerlegd', 560, 820, q.on('weerlegd', 1), C.koraal, 28, 'center', 700); regel(ctx, 'hypothese', 1360, 820, q.on('hypothese', 1), C.paars, 28, 'center', 700); vraagteken(ctx, 960, 830, q.on('Hoe', 1), 110); ctx.restore(); },
  s26(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 5), 0.5, Object.assign({ nieuw: 1 }, B4));
    tag(ctx, 'antwoord a: het vak zegt hoe goed er getest is', 960, 630, C.goud, q.on('Antwoord', 1));
    regel(ctx, 'niacine', 420, 720, q.on('getest', 1), C.text, 26, 'right', 700); if (q.on('getest', 1) > 0.02) { roundRect(ctx, 440, 690, 900 * q.on('getest', 1), 40, 10); shape(ctx, rgba(C.koraal, 0.5), C.koraal, 1.5); } regel(ctx, '2 proeven, ± 30 000 mensen, jaren', 460, 720, q.on('getest', 1), C.text, 22, 'left', 600);
    regel(ctx, 'NMN', 420, 790, q.on('getest', 1), C.text, 26, 'right', 700); if (q.on('getest', 1) > 0.02) { roundRect(ctx, 440, 760, 60 * q.on('getest', 1), 40, 10); shape(ctx, rgba(C.paars, 0.5), C.paars, 1.5); } regel(ctx, 'klein, hooguit 3 maanden', 520, 790, q.on('getest', 1), C.text, 22, 'left', 600);
    tag(ctx, 'b? ook bij niacine betere bloedwaarden, toch geen effect', 960, 860, C.koraal, q.on('Misschien', 1) * (1 - q.on('regels', 1))); tag(ctx, 'EU: nog niet toegelaten, zegt niets over bewijs', 960, 860, C.teal, q.on('regels', 1)); },
  s27(ctx, t, q) { bg(ctx, 'schema'); bord4(ctx, hypeItems(q, 6), 1, Object.assign({ nieuw: 1 }, B4));
    muis(ctx, 360, 720, 0.9, q.on('ratten', 1)); regel(ctx, 'ratten: meer verbindingen tussen zenuwcellen', 360, 830, q.on('ratten', 1), C.groen, 24, 'center', 700);
    tag(ctx, 'mensen: klein, vaak door de fabrikant betaald', 1000, 700, C.text2, q.on('mensen', 1));
    potje(ctx, 1560, 820, 0.85, 'magnesium', 'threonaat', '#9FD6C8', q.on('verpakking', 1)); regel(ctx, 'alleen: "draagt bij tot een normale', 1560, 610, q.on('draagt', 1), C.text, 22, 'center', 600); regel(ctx, 'werking van het zenuwstelsel"', 1560, 640, q.on('draagt', 1), C.text, 22, 'center', 600); },
  s28(ctx, t, q) { keuken(ctx, t);
    ctx.fillStyle = rgba('#0B0F16', 0.8 * q.on('Nee', 1)); ctx.fillRect(980, 110, 900, 340);
    tag(ctx, 'ook zonder tablet misschien niet verkouden', 1430, 170, C.text2, q.on('Misschien', 1)); tag(ctx, 'dat zie je ook als de tablet niets doet', 1430, 245, C.text2, q.on('niets', 1)); tag(ctx, 'meer helpt niet (hoofdstuk 2)', 1430, 320, VD, q.on('Meer', 1)); tag(ctx, 'antwoord b', 1430, 395, C.goud, q.on('antwoord', 1)); },
  s29(ctx, t, q) { keuken(ctx, t);
    ctx.fillStyle = rgba('#0B0F16', 0.8 * q.on('Slik', 1)); ctx.fillRect(980, 110, 900, 360);
    tag(ctx, 'heb ik het echt nodig?', 1200, 175, C.groen, q.on('nodig', 1)); tag(ctx, 'hoeveel zit erin?', 1200, 250, C.groen, q.on('erin', 1));
    tag(ctx, 'vergeleken met wat?', 1640, 175, C.goud, q.on('vergeleken', 1)); tag(ctx, 'hoeveel effect?', 1640, 250, C.goud, q.on('effect', 1)); tag(ctx, 'wie betaalde?', 1640, 325, C.goud, q.on('betaalde', 1)); },
};

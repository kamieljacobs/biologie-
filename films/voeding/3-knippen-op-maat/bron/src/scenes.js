// Film 3 · Knippen op maat — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken ----------
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 1.2); text(ctx, txt, x + 30, y + 40, fTekst(36, 600), C.goud); ctx.restore(); }
function bigLine(ctx, s, x, y, a = 1, color = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, 600), color, align); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 58, 29); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function microVlak(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.clip(); ctx.globalAlpha = 0.5; grain(ctx); ctx.restore(); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
// maltose = twee zeshoeken; lactose = glucose + galactose (tweede zeshoek met stip)
function maltose(ctx, x, y, r = 14, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = V.kh; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-r * 0.9, 0); ctx.lineTo(r * 0.9, 0); ctx.stroke(); hexagon(ctx, -r * 0.9, 0, r, rgba(V.kh, 0.6), V.kh, 1.4, 0); hexagon(ctx, r * 0.9, 0, r, rgba(V.kh, 0.6), V.kh, 1.4, 0); ctx.restore(); }
function lactoseMol(ctx, x, y, r = 14, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = V.kh; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * 0.9, y); ctx.lineTo(x + r * 0.9, y); ctx.stroke(); hexagon(ctx, x - r * 0.9, y, r, rgba(V.kh, 0.6), V.kh, 1.4, 0); hexagon(ctx, x + r * 0.9, y, r, rgba(C.melk || V.melk, 0.5), V.melk, 1.6, 0); ctx.fillStyle = V.kh; ctx.beginPath(); ctx.arc(x + r * 0.9, y, r * 0.25, 0, 6.283); ctx.fill(); ctx.restore(); }
function water(ctx, x, y, r = 9, a = 1) { waterMol(ctx, x, y, r, a); }
// cracker (Macro-voorwerp in Schema)
function cracker(ctx, x, y, s = 1, a = 1, hap = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-150, -95); ctx.lineTo(150, -95); ctx.lineTo(150, 95); if (hap > 0) { ctx.lineTo(-150 + 260 * (1 - hap) + 40, 95); ctx.arc(-150 + 260 * (1 - hap) + 40 - 40, 95, 40, 0, Math.PI, true); } ctx.lineTo(-150, 95); ctx.closePath();
  ctx.fillStyle = '#D9B877'; ctx.fill(); ctx.strokeStyle = lighten('#D9B877', 0.3); ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = 'rgba(120,80,30,0.45)'; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(-105 + i * 70, -50 + j * 50, 5, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// thermometer (Schema): waarde in °C, schaal 0..90
function thermometer(ctx, x, y, h, T, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 16, y - h, 32, h, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 2);
  ctx.beginPath(); ctx.arc(x, y + 20, 30, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 2);
  const f = clamp(T / 90, 0, 1); roundRect(ctx, x - 8, y - f * (h - 16), 16, f * (h - 16) + 10, 8); ctx.fillStyle = C.koraal; ctx.fill();
  [0, 37, 60, 80].forEach(v => { const yy = y - v / 90 * (h - 16); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 18, yy); ctx.lineTo(x + 30, yy); ctx.stroke(); text(ctx, String(v), x + 40, yy + 10, fMeta(28), C.text2, 'left'); });
  text(ctx, Math.round(T) + ' °C', x, y + 100, fTekst(44, 600), C.text, 'center'); ctx.restore(); }
// activiteit van amylase tegen temperatuur (schematisch, 0..1)
function act(T) { return T <= 38 ? 0.06 + 0.94 * Math.exp(-Math.pow((T - 38) / 24, 2)) : Math.exp(-Math.pow((T - 38) / 11, 2)); }
// optimumkromme in een assenstelsel
function optGrafiek(ctx, x, y, w, h, draw = 1, Tm = null, a = 1, labels = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  text(ctx, 'temperatuur (°C)', x + w, y + 84, fTekst(36), C.text2, 'right'); ctx.save(); ctx.translate(x - 26, y - h / 2); ctx.rotate(-Math.PI / 2); text(ctx, 'reactiesnelheid', 0, 0, fTekst(36), C.text2, 'center'); ctx.restore();
  [0, 20, 40, 60, 80].forEach(v => { const xx = x + v / 80 * w; text(ctx, String(v), xx, y + 34, fMeta(28), C.text2, 'center'); });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); const n = Math.round(80 * draw); for (let i = 0; i <= n; i++) { const T = i, px = x + T / 80 * w, py = y - act(T) * h * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (Tm !== null) { const px = x + Tm / 80 * w, py = y - act(Tm) * h * 0.9; ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(px, py, 12, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// tabel stof · enzym · plek · product
const TAB = [
  ['zetmeel', 'amylase', 'mond · twaalfvingerige darm', 'maltose', V.kh],
  ['maltose', 'maltase', 'dunne darm (wand)', 'glucose', V.kh],
  ['lactose', 'lactase', 'dunne darm (wand)', 'glucose + galactose', V.kh],
  ['eiwit', 'pepsine', 'maag', 'eiwitstukken', V.ew],
  ['eiwitstukken', 'proteasen', 'twaalfvingerige darm', 'kleinere stukken', V.ew],
  ['kleinere stukken', 'peptidasen', 'dunne darm (wand)', 'aminozuren', V.ew],
  ['vet', 'lipase', 'twaalfvingerige darm', 'glycerol + vetzuren', V.vt]];
const TX = [150, 520, 850, 1380];
function tabel(ctx, zicht, o = {}) { const { hl = -1, a = 1, hlKol = -1, y0 = 170, vraag = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ['stof', 'enzym', 'waar', 'product'].forEach((h, i) => metaText(ctx, h, TX[i], y0, C.grain, 'left', 28));
  ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(120, y0 + 18); ctx.lineTo(1800, y0 + 18); ctx.stroke();
  TAB.forEach((r, i) => { const z = clamp(zicht - i, 0, 1); if (z <= 0.01) return; const y = y0 + 78 + i * 78; ctx.save(); ctx.globalAlpha *= z * (hl >= 0 && hl !== i ? 0.45 : 1);
    if (hl === i) { roundRect(ctx, 110, y - 50, 1700, 70, 12); ctx.fillStyle = rgba(C.goud, 0.08); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); }
    ctx.fillStyle = r[4]; ctx.beginPath(); ctx.arc(128, y - 12, 8, 0, 6.283); ctx.fill();
    text(ctx, r[0], TX[0], y, fTekst(36, 600), C.text, 'left'); text(ctx, r[1], TX[1], y, fTekst(36, 700), lighten(C.enzym, 0.45), 'left');
    text(ctx, vraag === i ? '?' : r[2], TX[2], y, fTekst(36, vraag === i ? 700 : 400), vraag === i ? C.goud : hlKol === 2 && hl === i ? C.goud : C.text, 'left'); text(ctx, r[3], TX[3], y, fTekst(36, 600), C.text, 'left'); ctx.restore(); });
  ctx.restore(); }
// simulatievlak met enzymen en zetmeel; temperatuur T(t) bepaalt snelheid en activiteit
const SIMS = {};
function simVlak(ctx, id, t, Tf, o = {}) { const { x = 140, y = 200, w = 900, h = 600, denatVan = 48, n = 7, sub = 14, a = 1 } = o;
  if (a <= 0.01) return; if (!SIMS[id]) SIMS[id] = maakSim(id.length * 17 + 3, n, sub, [x + 60, y + 60, w - 120, h - 120]);
  const sim = SIMS[id]; const st = simStap(sim, t, (tt) => { const T = Tf(tt); return { v: 0.35 + T / 45, werkt: T > denatVan + 6 ? 0 : act(T) * 0.5 }; }, (e, s) => s.soort === 'zetmeel');
  ctx.save(); ctx.globalAlpha *= a; microVlak(ctx, x, y, w, h);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  const T = Tf(t), dn = clamp((T - denatVan) / 15, 0, 1);
  st.S.forEach(s => { if (s.len < 2) return; if (s.soort === 'eiwit') proteinChain(ctx, coilPath(s.x - 40, s.y, 5, 18, 5), [0, 5, 9, 14, 3], 8); else zetmeelKeten(ctx, s.x - s.len * 11, s.y, s.len, 9, { amp: 4, ph: s.a }); });
  st.prod.forEach(p => maltose(ctx, p.x, p.y, 9, 1, p.a));
  st.E.forEach((e, i) => enzym(ctx, e.x, e.y, 0.36, { soort: 'amylase', rot: e.a * 0.3, denat: Math.max(dn, o.denat || 0), t: t + i, gloed: e.cd > 0.3 ? 1 : 0 }));
  ctx.restore(); text(ctx, st.knips + ' knippen', x + w - 30, y + h - 30, fMeta(28) , C.grain, 'right');
  ctx.restore(); return st; }
function tekenEi(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 110, 70, 0, 0, 6.283); shape(ctx, '#F2F2EE', C.line, 2); ctx.beginPath(); ctx.ellipse(x + 10, y + 4, 44, 36, 0, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
function koelkast(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 120, 140, 240, 14); shape(ctx, rgba(C.teal, 0.15), C.teal, 2); ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(x - 70, y - 30); ctx.lineTo(x + 70, y - 30); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 50, y - 90); ctx.lineTo(x + 50, y - 55); ctx.moveTo(x + 50, y); ctx.lineTo(x + 50, y + 50); ctx.stroke(); ctx.restore(); }
// reageerbuis en waspoeder (Schema-voorwerpen)
function reageerbuis(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 30, y - 140); ctx.lineTo(x - 30, y + 60); ctx.arc(x, y + 60, 30, Math.PI, 0, true); ctx.lineTo(x + 30, y - 140); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(x - 28, y - 20, 56, 80); ctx.beginPath(); ctx.arc(x, y + 60, 28, 0, Math.PI); ctx.fill(); ctx.restore(); }
function waspoeder(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 110, 160, 200, 10); shape(ctx, rgba(C.teal, 0.25), C.teal, 2); text(ctx, 'was', x, y - 20, fTekst(36, 700), C.text, 'center'); for (let i = 0; i < 6; i++) { ctx.fillStyle = C.text; ctx.beginPath(); ctx.arc(x - 50 + (i % 3) * 50, y + 30 + Math.floor(i / 3) * 30, 6, 0, 6.283); ctx.fill(); } ctx.restore(); }

const SCENES = {
  title(ctx, t) { enzym(ctx, 1500, 640, 1.9, { soort: 'amylase', t, gloed: 0.5 + 0.5 * Math.sin(t * 2) }); zetmeelKeten(ctx, 1230, 470, 6, 20, { amp: 0, cuts: [2], gap: 26 + 10 * Math.sin(t * 2) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const kauw = q.on('kauw', 1, 0.6); cracker(ctx, 420, 470, 1.25, 1, kauw * clamp((t - q.at('kauw')) / 4, 0, 0.6));
    bigLine(ctx, 'zoet!', 420, 720, q.on('zoet', 1), C.goud, 56);
    tag(ctx, 'bijna geen suiker · veel zetmeel', 420, 300, C.line, q.on('suiker') * (1 - q.on('Iets')));
    const z = q.on('Iets', 1, 1.0);
    if (z > 0.01) zoomCircle(ctx, 1180, 440, 270, 520, 470, 'zetmeel · vergroot', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(900, 160, 560, 560); const k = q.on('knipt', 1, 2.0);
      zetmeelKeten(ctx, 950, 380, 12, 18, { cuts: k > 0.2 ? [1, 3, 5, 7, 9].slice(0, Math.ceil(k * 5)) : [], gap: 26 * k, amp: 6 }); enzym(ctx, 1180, 560, 0.75, { soort: 'amylase', t, gloed: k > 0 ? 0.6 : 0 }); });
    const m = q.on('maag', 1, 0.8);
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; maagVorm(ctx, 1560, 640, 0.75, 2.5); for (let i = 0; i < 6; i++) text(ctx, 'H⁺', 1560 + (i % 3) * 46 + (i >= 3 ? 23 : 0), 760 + Math.floor(i / 3) * 40, fMeta(28), C.koraal, 'center'); ctx.restore(); vraagteken(ctx, 1700, 610, q.on('Waarom')); }
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'micro');
    broodje(ctx, 300, 300, 1, 1 - q.on('keten', 1, 0.8) * 0.6);
    const k = q.on('keten', 1, 2.0); zetmeelKeten(ctx, 140, 520, Math.round(4 + 44 * k), 16, { amp: 18, ph: t * 0.3 });
    if (k >= 1) { text(ctx, '…', 1840, 540, fTekst(56, 600), V.kh, 'center'); }
    tag(ctx, 'honderden tot duizenden glucose', 960, 400, V.kh, q.on('honderden'));
    tag(ctx, 'polysacharide', 960, 680, C.goud, q.on('polysacharide'));
    const d = q.on('darmwand'); if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(1480, 140, 60, 720); ctx.strokeStyle = C.koraal; ctx.strokeRect(1480, 140, 60, 720); metaText(ctx, 'darmwand', 1510, 120, C.grain, 'center', 28); strike(ctx, 1380, 520, 1640, C.koraal, q.on('groot')); ctx.restore(); }
    tag(ctx, 'eerst in kleine stukjes', 960, 820, C.groen, q.on('stukjes'));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const z = q.on('vanzelf'); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; text(ctx, 'zonder enzym', 160, 330, fTekst(44, 600), C.text, 'left'); roundRect(ctx, 160, 360, 1640, 48, 24); ctx.fillStyle = rgba(C.line, 0.35); ctx.fill(); ctx.fillStyle = C.line; roundRect(ctx, 160, 360, 1640 * ramp(t, q.at('vanzelf'), 3), 48, 24); ctx.fill(); text(ctx, 'miljoenen jaren →', 1780, 460, fTekst(36, 600), C.text2, 'right'); ctx.restore(); }
    const e = q.on('enzymen'); if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e; text(ctx, 'met enzym', 160, 590, fTekst(44, 600), C.goud, 'left'); roundRect(ctx, 160, 620, 60, 48, 24); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, 'seconden', 250, 656, fTekst(36, 600), C.goud, 'left'); ctx.restore(); enzym(ctx, 1500, 680, 0.9, { soort: 'amylase', t, a: e }); }
    tag(ctx, 'enzym = eiwit dat een reactie versnelt', 960, 820, C.enzym, q.on('eiwit'));
  },
  s06(ctx, t, q) { bg(ctx, 'micro');
    const EX = 960, EY = 640, S = 2.2; const notchY = EY - 40 * S;
    enzym(ctx, EX, EY, S, { soort: 'amylase', t, gloed: q.on('actieve') * (1 - q.on('los')) });
    label(ctx, 'amylase', 'enzym', EX + 150, EY + 40, 1420, 780, q.on('amylase'));
    label(ctx, 'actief centrum', null, EX + 40, notchY - 4, 1420, 420, q.on('actieve'));
    // substraat: keten van 4 zeshoeken zakt in het kuiltje
    const in_ = q.on('Past', 1, 1.2), knip = ramp(t, q.at('watermolecuul') + 0.6, 0.6), los = q.on('los', 1, 1.6);
    const sy = lerp(230, notchY - 26, in_);
    if (los < 0.01) { zetmeelKeten(ctx, EX - 3 * 26.25 + 0, sy, 4, 15, { amp: 0, cuts: knip > 0.5 ? [1] : [], gap: 14 * knip }); }
    else { maltose(ctx, EX - 26 - 260 * los, sy - 160 * los, 15, 1, -0.4 * los); maltose(ctx, EX + 26 + 260 * los, sy - 160 * los, 15, 1, 0.4 * los); }
    label(ctx, 'substraat', 'zetmeel', EX - 60, sy, 520, 300, q.on('substraat') * (1 - los));
    tag(ctx, 'enzym-substraatcomplex', 520, 520, C.goud, q.on('enzym-substraatcomplex') * (1 - los));
    const w = q.on('gebruikt', 1, 1.4); if (w > 0.01 && knip < 0.9) water(ctx, lerp(EX + 300, EX + 6, w), lerp(notchY - 160, notchY - 30, w), 11, 1);
    tag(ctx, 'hydrolyse = knippen met water', 520, 620, C.teal, q.on('hydrolyse'));
    tag(ctx, 'producten: maltose', 1440, 230, V.kh, q.on('producten'));
    tag(ctx, 'maltose smaakt zoet', 1440, 320, C.goud, q.on('zoet'));
  },
  s07(ctx, t, q) { bg(ctx, 'micro'); enzym(ctx, 960, 640, 2.2, { soort: 'amylase', t }); maltose(ctx, 960 - 290, 410, 15, 1, -0.4); maltose(ctx, 960 + 290, 410, 15, 1, 0.4); vraagteken(ctx, 960, 330, q.on('Wat')); },
  s09(ctx, t, q) { bg(ctx, 'micro');
    const cyc = (t * 0.9) % 1, n = Math.floor(t * 0.9); const EX = 760, EY = 600, S = 1.6, ny = EY - 40 * S;
    enzym(ctx, EX, EY, S, { soort: 'amylase', t, gloed: cyc < 0.5 ? 1 : 0 });
    const sy = cyc < 0.4 ? lerp(260, ny - 20, cyc / 0.4) : ny - 20; if (cyc < 0.55) zetmeelKeten(ctx, EX - 40, sy, 3, 12, { amp: 0, cuts: cyc > 0.45 ? [0] : [], gap: 10 }); else { maltose(ctx, EX - 120 - (cyc - 0.55) * 400, ny - 60 - (cyc - 0.55) * 300, 12); }
    for (let i = 0; i < Math.min(n, 14); i++) maltose(ctx, 160 + (i % 7) * 80, 220 + Math.floor(i / 7) * 60, 11, 0.7);
    tag(ctx, 'onveranderd · raakt niet op', EX, 860, C.groen, q.on('onveranderd') * (1 - q.on('leeft')));
    tag(ctx, 'echt: honderden per seconde', 1450, 260, C.goud, q.on('honderden'));
    const l = q.on('leeft'); tag(ctx, 'een molecuul, geen cel', 1450, 380, C.enzym, l);
    reageerbuis(ctx, 1330, 640, q.on('reageerbuis')); waspoeder(ctx, 1600, 650, q.on('waspoeder'));
  },
  s10(ctx, t, q) { bg(ctx, 'micro');
    const EX = 760, EY = 640, S = 1.8, ny = EY - 40 * S; const sum = q.on('Onthoud');
    ctx.save(); ctx.globalAlpha *= 1 - sum * 0.75;
    enzym(ctx, EX, EY, S, { soort: 'amylase', t });
    const b = q.on('botst', 1, 1.0), bounce = q.on('past', 1, 1.0); const ey = b < 1 ? lerp(220, ny - 40, b) : lerp(ny - 40, 220, bounce);
    if (q.on('eiwit') > 0.01 && q.on('slot') < 0.5) proteinChain(ctx, coilPath(EX - 70, ey, 6, 26, 4), [0, 5, 9, 14, 3, 18], 12);
    bigLine(ctx, 'past niet', EX + 260, 300, q.on('past') * (1 - q.on('Elk')), C.koraal, 44, 'left');
    tag(ctx, 'substraatspecifiek', 1400, 420, C.goud, q.on('substraatspecifiek') * (1 - sum));
    tag(ctx, 'substraat past als sleutel in slot', 1400, 520, C.line, q.on('sleutel') * (1 - sum));
    const r = q.on('remt', 1, 0.6); if (q.on('andere') > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('andere'); roundRect(ctx, EX - 34, lerp(220, ny - 34, q.on('andere', 1, 1.2)), 68, 40, 10); shape(ctx, C.line, C.text, 1.5); ctx.restore(); }
    tag(ctx, 'remmer: het slot zit dicht', 1400, 640, C.koraal, r * (1 - sum));
    ctx.restore();
    if (sum > 0.01) { ctx.save(); ctx.globalAlpha *= sum; roundRect(ctx, 460, 300, 1000, 380, 22); shape(ctx, rgba(C.bgSchema, 0.96), C.goud, 1.5); text(ctx, 'Onthoud', 520, 380, fTitel(56), C.goud);
      ['knipt met water (hydrolyse)', 'past op één soort stof', 'raakt niet op'].forEach((s, i) => { ctx.save(); ctx.globalAlpha *= q.on(['water', 'soort', 'niet'][i], [1, 2, 3][i]); text(ctx, (i + 1) + '  ' + s, 520, 470 + i * 70, fTekst(44, 600), C.text); ctx.restore(); }); ctx.restore(); }
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const X = 360, Y = 760, Wd = 1200, Hd = 480; const a = ramp(t, 0.3, 0.8);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y - Hd); ctx.lineTo(X, Y); ctx.lineTo(X + Wd, Y); ctx.stroke();
    text(ctx, 'verloop van de reactie', X + Wd, Y + 50, fTekst(36), C.text2, 'right'); ctx.save(); ctx.translate(X - 30, Y - Hd / 2); ctx.rotate(-Math.PI / 2); text(ctx, 'energie', 0, 0, fTekst(36), C.text2, 'center'); ctx.restore(); ctx.restore();
    const curve = (h, col, d) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); const n = Math.round(100 * d); for (let i = 0; i <= n; i++) { const u = i / 100, px = X + 60 + u * (Wd - 120); const base = lerp(Y - 260, Y - 160, u); const py = base - h * Math.exp(-Math.pow((u - 0.5) / 0.16, 2)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); };
    const z = q.on('drempel', 1, 1.5); if (z > 0.01) { curve(200, C.line, z); }
    tag(ctx, 'activeringsenergie zonder enzym', 640, 300, C.line, q.on('activeringsenergie'));
    const m = q.on('trekt', 1, 1.5); if (m > 0.01) curve(130, C.goud, m);
    const pijl = (x, top, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X + 60, Y - 260); ctx.lineTo(x + 20, Y - 260); ctx.stroke(); ctx.restore(); arrow(ctx, x, Y - 260, x, top, col, a, 3); };
    pijl(880, Y - 404, C.line, q.on('activeringsenergie')); pijl(1040, Y - 334, C.goud, q.on('lager'));
    tag(ctx, 'met enzym: lagere drempel', 1360, 400, C.goud, q.on('lager'));
  },

  // ---------- H2 ----------
  s12(ctx, t, q) { bg(ctx, 'micro');
    const soorten = [['amylase', 'zetmeel'], ['protease', 'eiwit'], ['lipase', 'vet']];
    soorten.forEach(([s, sub], i) => { const x = 420 + i * 540; enzym(ctx, x, 560, 1.0, { soort: s, t: t + i, a: ramp(t, 0.3 + i * 0.4, 0.6) }); text(ctx, sub, x, 720, fTekst(36, 600), C.text2, 'center'); });
    tag(ctx, 'maltase knipt maltose', 620, 260, V.kh, q.on('Maltose')); tag(ctx, 'lactase knipt lactose', 1300, 260, V.kh, q.on('Lactose'));
    bigLine(ctx, '…ase', 960, 180, q.on('ase') * (1 - q.on('Maltose')), C.goud, 56);
  },
  s13(ctx, t, q) { bg(ctx, 'schema'); const z = [q.on('Amylase'), q.on('maltase'), q.on('lactase')]; const zicht = z[0] + z[1] + z[2];
    const hl = z[2] > 0.5 ? 2 : z[1] > 0.5 ? 1 : 0; tabel(ctx, zicht, { hl, hlKol: q.on('twaalfvingerige') > 0.5 && hl === 0 ? 2 : -1 });
    tag(ctx, 'disacharide: twee suikers', 1500, 840, V.kh, q.on('disacharide') * (1 - q.on('monosacharide')));
    tag(ctx, 'monosacharide: één suiker', 1500, 840, V.kh, q.on('monosacharide'));
  },
  s14(ctx, t, q) { bg(ctx, 'schema'); const z = [q.on('Pepsine'), q.on('alvleesklier'), q.on('peptidasen')]; const zicht = 3 + z[0] + z[1] + z[2];
    const hl = z[2] > 0.5 ? 5 : z[1] > 0.5 ? 4 : 3; tabel(ctx, zicht, { hl }); tag(ctx, 'pepsine: geen -ase', 1500, 840, C.koraal, q.on('eindigt') * (1 - q.on('alvleesklier')));
    tag(ctx, 'proteasen = alle eiwitscharen', 1500, 840, V.ew, q.on('proteasen') * (1 - q.on('kortere')));
  },
  s15(ctx, t, q) { bg(ctx, 'schema'); const g = q.on('Gal', 1, 0.8);
    tabel(ctx, 6 + q.on('Lipase'), { hl: 6, a: 1 - 0.97 * g, vraag: 6 });
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; microVlak(ctx, 300, 200, 1320, 600);
      const em = q.on('druppeltjes', 1, 1.4); ctx.save(); roundRect(ctx, 300, 200, 1320, 600, 18); ctx.clip();
      if (em < 1) { ctx.save(); ctx.globalAlpha *= 1 - em; ctx.beginPath(); ctx.arc(700, 500, 170, 0, 6.283); shape(ctx, rgba(V.vt, 0.55), V.vt, 2); ctx.restore(); }
      for (let i = 0; i < 18; i++) { const an = i * 2.4, rr = 50 + (i % 5) * 30; const x = 700 + Math.cos(an) * rr * 1.4 * em, y = 500 + Math.sin(an) * rr * em; ctx.save(); ctx.globalAlpha *= em; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); shape(ctx, rgba(V.vt, 0.55), V.vt, 2); ctx.setLineDash([4, 6]); ctx.strokeStyle = V.neutraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 32, 0, 6.283); ctx.stroke(); ctx.restore(); }
      const lp = q.on('plekken'); for (let i = 0; i < 5; i++) enzym(ctx, 1100 + (i % 2) * 140, 300 + i * 100, 0.4, { soort: 'lipase', t: t + i, a: lp });
      ctx.restore(); tag(ctx, 'gal knipt niets: emulgeren', 960, 260, V.neutraal, q.on('knipt')); ctx.restore(); }
    vraagteken(ctx, 1700, 760, q.on('Waar'));
  },
  s17(ctx, t, q) { bg(ctx, 'schema'); tabel(ctx, 7, { hl: 6, hlKol: 2 }); tag(ctx, 'alvleessap + gal → twaalfvingerige darm', 960, 840, C.goud, q.on('gal', 1)); },
  s18(ctx, t, q) { bg(ctx, 'micro'); lactoseMol(ctx, 760, 480, 30, ramp(t, 0.2, 0.6)); label(ctx, 'lactose', 'melksuiker', 760, 450, 560, 300, ramp(t, 0.5, 0.6));
    enzym(ctx, 1200, 640, 1.1, { soort: 'lactase', t, a: 0.35 }); strike(ctx, 1080, 640, 1320, C.koraal, q.on('weinig')); text(ctx, 'weinig lactase', 1200, 790, fTekst(36, 600), C.text2, 'center'); vraagteken(ctx, 960, 300, q.on('Wat')); },
  s20(ctx, t, q) { bg(ctx, 'schema'); const tb = q.on('tabel', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - tb;
    const u = clamp((t - q.at('dikke')) / 3, 0, 1); buisPad(ctx, [[200, 500], [700, 480], [1200, 520], [1720, 500]], 120, 1, V.neutraal, C.fill, { haustra: 1 });
    lactoseMol(ctx, lerp(260, 1300, u), 500, 20, q.on('lactose')); metaText(ctx, 'dikke darm', 960, 400, C.grain, 'center', 28);
    const b = q.on('bacteriën'); for (let i = 0; i < 7; i++) bacterie(ctx, 1220 + (i % 4) * 70, 460 + Math.floor(i / 4) * 70 + Math.sin(t * 2 + i) * 6, 1.2, i, b, i % 2 ? C.teal : C.line);
    for (let i = 0; i < 6; i++) { const yy = 430 - ((t * 40 + i * 30) % 160); ctx.save(); ctx.globalAlpha *= q.on('gas') * 0.8; ctx.beginPath(); ctx.arc(1240 + i * 40, yy, 10, 0, 6.283); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    tag(ctx, 'gas en buikpijn', 1460, 720, C.koraal, q.on('gas')); refCard(ctx, 'darmbacteriën → film 6', 160, 760, q.on('zes')); ctx.restore();
    tabel(ctx, 7, { a: tb }); refCard(ctx, 'Binas: spijsverteringsenzymen', 1100, 790, q.on('Binas'));
  },
  s21(ctx, t, q) { bg(ctx, 'micro');
    const kinds = [0, 5, 9, 14, 3, 18, 7, 11, 2, 16, 4, 12, 8, 1, 6, 10];
    const endo = q.on('midden', 1, 0.8), exo = q.on('uiteinde', 1, 2.5);
    const pts = coilPath(240, 520, 16, 92, 20).map((p, i) => [p[0] + (i >= 8 ? 60 * endo : 0), p[1]]);
    const nEx = Math.floor(exo * 3); if (endo < 0.5) proteinChain(ctx, pts.slice(nEx, 16 - nEx), kinds.slice(nEx, 16 - nEx), 20); else { proteinChain(ctx, pts.slice(nEx, 8), kinds.slice(nEx, 8), 20); proteinChain(ctx, pts.slice(8, 16 - nEx), kinds.slice(8, 16 - nEx), 20); }
    for (let i = 0; i < nEx; i++) { bead(ctx, 160 - i * 0 + 0, 300 + i * 60, 18, kinds[i]); bead(ctx, 1760, 300 + i * 60, 18, kinds[15 - i]); }
    tag(ctx, 'endopeptidasen: pepsine, trypsine', 960, 260, C.enzym, q.on('endopeptidasen')); if (endo > 0.01) { const gx = (pts[7][0] + pts[8][0]) / 2; enzym(ctx, gx, 640, 0.6, { soort: 'protease', t, a: endo, gloed: endo }); }
    tag(ctx, 'exopeptidasen: vanaf het uiteinde', 960, 820, C.enzym, q.on('exopeptidasen')); vraagteken(ctx, 1700, 200, q.on('Stel'));
  },
  s23(ctx, t, q) { bg(ctx, 'micro'); const z = q.on('onwerkzame');
    ctx.save(); ctx.globalAlpha *= 1 - z; const kinds = [0, 5, 9, 14, 3, 18, 7, 11, 2, 16, 4, 12];
    for (let k = 0; k < 4; k++) { const pts = coilPath(180 + k * 420, 480, 3, 60, 10); proteinChain(ctx, pts, kinds.slice(k * 3, k * 3 + 3), 18); [pts[0], pts[2]].forEach(p => { ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1] - 34, 7, 0, 6.283); ctx.fill(); }); }
    tag(ctx, 'elke knip: twee nieuwe uiteinden', 960, 300, C.goud, q.on('nieuwe')); ctx.restore();
    if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; enzym(ctx, 600, 600, 1.4, { soort: 'protease', t }); const open = q.on('actief', 1, 1.2); ctx.save(); ctx.globalAlpha *= 1 - open * 0.8; roundRect(ctx, 560, lerp(470, 330, open), 80, 40, 10); shape(ctx, rgba(C.enzym, 0.9), lighten(C.enzym, 0.3), 1.5); ctx.restore();
      text(ctx, open > 0.5 ? 'actief' : 'onwerkzaam', 600, 820, fTekst(36, 600), open > 0.5 ? C.groen : C.text2, 'center'); tag(ctx, 'pas in maag of darm actief', 1300, 420, C.groen, q.on('actief')); tag(ctx, 'nucleasen knippen DNA en RNA', 1300, 600, C.enzym, q.on('nucleasen')); ctx.restore(); }
  },

  // ---------- H3 ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const tw = q.at('warmer'); const Tf = (tt) => 20 + 17 * clamp((tt - tw) / 3, 0, 1);
    simVlak(ctx, 's24', t, Tf); thermometer(ctx, 1300, 700, 460, Tf(t)); tag(ctx, 'vaker botsen → sneller knippen', 1560, 150, C.goud, q.on('botsen'));
    vraagteken(ctx, 1640, 600, q.on('zestig'));
  },
  s26(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('lichaamstemperatuur'), t1 = q.at('warmer', 2); const Tf = (tt) => tt < t1 ? 37 : 37 + 33 * clamp((tt - t1) / 4, 0, 1); const Td = t < t1 ? lerp(60, 37, ramp(t, t0, 1.2)) : Tf(t);
    simVlak(ctx, 's26', t, Tf, { x: 120, y: 200, w: 760, h: 560, n: 6, sub: 10 });
    optGrafiek(ctx, 1060, 760, 720, 480, ramp(t, 0.2, 2.5), Td, 1);
    text(ctx, Math.round(Tf(t)) + ' °C', 500, 820, fTekst(44, 600), C.text, 'center');
    tag(ctx, 'optimum', 1060 + 40 / 80 * 720, 220, C.groen, q.on('optimum')); tag(ctx, 'denatureren', 1700, 560, C.koraal, q.on('denatureren'));
    tag(ctx, 'optimumkromme', 1420, 860, C.goud, q.on('optimumkromme'));
  },
  s27(ctx, t, q) { bg(ctx, 'micro'); const a80 = q.on('verwarmt', 1, 1.6), af = q.on('afkoelen', 1, 2.0); const T = 37 + 43 * a80 - 43 * af;
    enzym(ctx, 760, 620, 1.9, { soort: 'amylase', t, denat: a80, a: 1 - af }); thermometer(ctx, 1400, 680, 460, T); vraagteken(ctx, 760, 680, af, 260); },
  s29(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('Kou', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - k; enzym(ctx, 600, 560, 1.6, { soort: 'amylase', t, denat: 1, micro: 1 }); tekenEi(ctx, 1300, 520, q.on('ei')); tag(ctx, 'blijvend', 1300, 720, C.koraal, q.on('blijvend')); ctx.restore();
    if (k > 0.01) { const tw = q.at('warm'); const Tf = (tt) => tt < tw ? 5 : 5 + 32 * clamp((tt - tw) / 2, 0, 1); simVlak(ctx, 's29', t, Tf, { a: k }); koelkast(ctx, 1350, 480, k * (1 - q.on('warm'))); thermometer(ctx, 1650, 700, 460, Tf(t), k); tag(ctx, 'trager, minder botsingen', 1350, 820, C.teal, q.on('trager') * (1 - q.on('warm'))); }
  },
  s30(ctx, t, q) { bg(ctx, 'schema'); const X = 260, Y = 700, Wd = 1400; phSchaal(ctx, X, Y, Wd, [], ramp(t, 0.2, 0.6));
    { ctx.save(); ctx.globalAlpha *= ramp(t, 0.2, 0.6); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X - 40, Y - 30); ctx.lineTo(X - 40, Y - 400); ctx.stroke(); ctx.translate(X - 70, Y - 215); ctx.rotate(-Math.PI / 2); text(ctx, 'enzymactiviteit', 0, 0, fTekst(36), C.text2, 'center'); ctx.restore(); }
    const bel = (c, col, nm, a, dx = 0) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 140; i++) { const ph = i / 10, px = X + ph / 14 * Wd, py = Y - 30 - 340 * Math.exp(-Math.pow((ph - c) / 1.1, 2)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); text(ctx, nm, X + c / 14 * Wd + dx, Y - 400, fTekst(36, 600), col, dx < 0 ? 'right' : dx > 0 ? 'left' : 'center'); ctx.restore(); };
    bel(2, C.koraal, 'pepsine', q.on('Pepsine')); bel(7, lighten(C.enzym, 0.3), 'amylase', q.on('Amylase'), -70); bel(7.8, C.groen, 'dunne darm', q.on('dunne'), 90);
    const c = q.on('cracker'); if (c > 0.01) { cracker(ctx, 1640, 240, 0.4, c); vraagteken(ctx, 1760, 260, c, 80); }
    tag(ctx, 'elk enzym een eigen optimum', 960, 160, C.goud, q.on('dus'));
  },

  // ---------- Recap ----------
  s31(ctx, t, q) { bg(ctx, 'schema');
    cracker(ctx, 360, 300, 0.7, 1); enzym(ctx, 360, 560, 0.7, { soort: 'amylase', t, gloed: 1 - q.on('maag') }); maltose(ctx, 360, 720, 16, q.on('maltose')); text(ctx, 'mond · pH 7', 360, 160, fTekst(36, 600), C.text2, 'center');
    const m = q.on('maag', 1, 0.8); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; maagVorm(ctx, 860, 300, 0.8, 2.5); enzym(ctx, 1005, 455, 0.4, { soort: 'amylase', t, denat: q.on('verandert', 1, 1.0) }); text(ctx, 'maag · pH 2', 1000, 160, fTekst(36, 600), C.koraal, 'center'); for (let i = 0; i < 6; i++) text(ctx, 'H⁺', 830 + (i % 3) * 42 + (i >= 3 ? 20 : 0), 405 + Math.floor(i / 3) * 44, fMeta(28), C.koraal, 'center'); ctx.restore(); }
    tag(ctx, 'antwoord b: te zuur voor amylase', 1000, 840, C.groen, q.on('antwoord'));
    const d = q.on('lang'); if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; text(ctx, 'dunne darm', 1600, 160, fTekst(36, 600), C.text2, 'center'); enzym(ctx, 1600, 420, 0.6, { soort: 'amylase', t }); enzym(ctx, 1600, 640, 0.6, { soort: 'maltase', t: t + 1, a: q.on('maltase') }); text(ctx, 'amylase', 1600, 520, fTekst(36), C.text, 'center'); text(ctx, 'maltase', 1600, 740, fTekst(36), C.text, 'center'); ctx.restore(); }
  },
  s32(ctx, t, q) { bg(ctx, 'schema');
    const rows = [['Zetmeel', 'glucose', 'zetmeel'], ['Eiwit', 'aminozuren', 'eiwit'], ['Vet', 'glycerol en vetzuren', 'vet'], ['Lactose', 'glucose en galactose', 'lactose']];
    rows.forEach(([w, p, k], i) => { const a = q.on(w); if (a <= 0.01) return; const y = 230 + i * 150; ctx.save(); ctx.globalAlpha *= a;
      if (k === 'zetmeel') zetmeelKeten(ctx, 200, y, 6, 14, { amp: 4 }); else if (k === 'eiwit') proteinChain(ctx, coilPath(200, y, 7, 30, 6), [0, 5, 9, 14, 3, 18, 7], 13); else if (k === 'vet') triglyceride(ctx, 220, y, 0.55); else lactoseMol(ctx, 260, y, 18);
      arrow(ctx, 520, y, 700, y, C.line, 1, 2.5); const kk = ramp(t, q.at(w) + 0.6, 0.8);
      ctx.globalAlpha *= kk; if (k === 'zetmeel') for (let j = 0; j < 6; j++) hexagon(ctx, 760 + j * 52, y, 14, rgba(V.kh, 0.6), V.kh, 1.4, 0); else if (k === 'eiwit') for (let j = 0; j < 7; j++) bead(ctx, 760 + j * 46, y, 13, [0, 5, 9, 14, 3, 18, 7][j]); else if (k === 'vet') { roundRect(ctx, 754, y - 30, 12, 60, 5); shape(ctx, rgba(V.vt, 0.7), V.vt, 1.2); fattyAcid(ctx, 800, y - 26, 90); fattyAcid(ctx, 940, y, 90); fattyAcid(ctx, 800, y + 26, 90); } else { hexagon(ctx, 770, y, 14, rgba(V.kh, 0.6), V.kh, 1.4, 0); hexagon(ctx, 840, y, 14, rgba(V.melk, 0.5), V.melk, 1.6, 0); }
      text(ctx, p, 1180, y + 12, fTekst(44, 600), C.text, 'left'); ctx.restore(); });
    refCard(ctx, 'door de darmwand → film 4', 1200, 800, q.on('vier'));
  }
};

// Hormonen 4 · Stress — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#2B2420', shirt: '#6A8F6E', hairStyle: 'long' }; // oud (personReal), niet meer gebruikt sinds 1.1
// 1.1 (opwaardering prompt v13, 28 okt 2026): de leerling is castpersonage Noor ('jij' in de bovenbouw, personages/ROLLEN.md), nooit bij naam genoemd.
function dot(ctx, x, y, r, fill, stroke, lw = 1.2) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
// 1.2 (29 okt 2026): kleuren volgens de tabel van Kamiel (cortisol oker als ruit, adrenaline koraal, ACTH/CRH licht paars, zenuwsignaal teal)
const MERG = '#B0703F', SCHORS = HK.klier, CORT = HK.cortisol, ADR = HK.adrenaline, TROP = HK.tropine, AFW = '#E6E1D3';

// ---------- bijnier: kapje op de nier, en doorsnede met merg en schors ----------
// 1.1: nier met bijnier uit de beeldbank (bibliotheek/lib_bio.js, nierBijnier: schors, piramides, bekken, vaten; bijnier als kapje met schors en merg)
function nierMetBijnier(ctx, x, y, s = 1, a = 1, lit = 0) { return nierBijnier(ctx, x, y, s, { a, glowSchors: lit, glowMerg: lit }); }
function nierMetBijnierOud(ctx, x, y, s = 1, a = 1, lit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; nierVorm(ctx, x, y, 2.2 * s, 1, 1);
  ctx.beginPath(); ctx.moveTo(x - 46 * s, y - 92 * s); ctx.quadraticCurveTo(x - 10 * s, y - 170 * s, x + 40 * s, y - 116 * s); ctx.quadraticCurveTo(x + 10 * s, y - 100 * s, x - 46 * s, y - 92 * s); ctx.closePath();
  if (lit > 0.01) { ctx.save(); ctx.shadowColor = SCHORS; ctx.shadowBlur = 30 * lit; shape(ctx, rgba(SCHORS, 0.7), HK.klierR, 2.5); ctx.restore(); } else shape(ctx, rgba(SCHORS, 0.7), HK.klierR, 2.5);
  ctx.restore(); }
function bijnierDoorsnede(ctx, x, y, s = 1, o = {}) { const { a = 1, merg = 1, schors = 1, gMerg = 0, gSchors = 0, krimp = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const k = 1 - 0.35 * krimp;
  const vorm = (sc) => { ctx.beginPath(); ctx.moveTo(x - 230 * sc * s, y + 90 * s); ctx.quadraticCurveTo(x - 120 * sc * s, y - 220 * sc * s, x + 40 * sc * s, y - 170 * sc * s); ctx.quadraticCurveTo(x + 230 * sc * s, y - 110 * sc * s, x + 240 * sc * s, y + 90 * s); ctx.quadraticCurveTo(x, y + 120 * s, x - 230 * sc * s, y + 90 * s); ctx.closePath(); };
  // 1.1: actief deel licht op met een vollere vulling en een gouden focusrand (Part C: geen gloed)
  ctx.save(); ctx.globalAlpha *= schors; vorm(k); shape(ctx, rgba(SCHORS, 0.55 + 0.25 * gSchors), HK.klierR, 3); if (gSchors > 0.01) { ctx.save(); ctx.globalAlpha *= gSchors; vorm(k); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= merg; vorm(0.55); shape(ctx, rgba(MERG, 0.85), lighten(MERG, 0.3), 2.5); if (gMerg > 0.01) { vorm(0.55); ctx.fillStyle = rgba('#FFE7A8', 0.16 * gMerg); ctx.fill(); } if (gMerg > 0.01) { ctx.save(); ctx.globalAlpha *= gMerg; vorm(0.55); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } ctx.restore();
  ctx.restore(); }
function zenuwLijn(ctx, pts, a = 1, t = 0, puls = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = HK.zenuw; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  if (puls > 0.01) { let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let u = ((t * 0.9) % 1) * L; for (let i = 1; i < pts.length; i++) { if (u <= seg[i - 1]) { const f = u / seg[i - 1]; circ(ctx, lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), 9, rgba(HK.impuls, puls)); break; } u -= seg[i - 1]; } }
  ctx.restore(); }
// 1.1: witte bloedcellen uit de beeldbank (witteBloedcellen: neutrofiel met gelobde kern, B-cel, macrofaag); geremd = gedimd en trager
const AFW_SOORT = ['neutrofiel', 'bcel', 'macrofaag', 'neutrofiel', 'bcel', 'neutrofiel', 'bcel'];
function afweercelEcht(ctx, x, y, r, a = 1, rem = 0, t = 0, seed = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.5 * rem);
  const w = wander(seed, t * (1 - rem * 0.9), 6, 0.5); witteBloedcellen(ctx, x + w.x, y + w.y, r, { soort: AFW_SOORT[(seed - 1) % AFW_SOORT.length], t: t * (1 - rem * 0.9) }); ctx.restore(); }
function afweercel(ctx, x, y, r, a = 1, rem = 0, t = 0, seed = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * rem); blob(ctx, x, y, r, r * 0.95, 0.08, seed, t * (1 - rem * 0.9)); shape(ctx, rgba(AFW, 0.25), AFW, 2); for (let i = 0; i < 3; i++) circ(ctx, x - r * 0.3 + i * r * 0.3, y + Math.sin(i * 2 + seed) * r * 0.2, r * 0.2, rgba('#8C7AB8', 0.6)); ctx.restore(); }
function virus(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.koraal, 0.4), C.koraal, 2); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4 + t * 0.3; ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.45, y + Math.sin(an) * r * 1.45); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5, 3, C.koraal); } ctx.restore(); }
function ketenBox(ctx, x, y, w, h, t1, t2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(col, 0.2), col, 2.5); text(ctx, t1, x, y + (t2 ? -2 : 12), fTekst(36, 700), C.text, 'center'); if (t2) metaText(ctx, t2, x, y + 32, C.grain, 'center', 20); ctx.restore(); }
function hormoonPil(ctx, s, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 700); const w = ctx.measureText(s).width + 36; roundRect(ctx, x - w / 2, y - 28, w, 50, 25); shape(ctx, rgba(col, 0.25), col, 2); text(ctx, s, x, y + 8, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// keten van boven naar beneden; o.n = aantal zichtbare stappen (0..), o.vwo toont CRH
function hpaKeten(ctx, x, y0, o = {}) { const { a = 1, show = [1, 1, 1, 1, 1], rem = 0, remBeide = 0, hormoon = 'ACTH', crh = 0, dim = [1, 1, 1], krimp = 0, laag = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ys = [y0, y0 + 230, y0 + 460];
  ketenBox(ctx, x, ys[0], 380, 96, 'hypothalamus', '', HK.klierR, show[0] * dim[0]);
  if (show[1] > 0.01) { arrow(ctx, x, ys[0] + 52, x, ys[1] - 56, TROP, show[1] * (1 - 0.6 * laag), 4); hormoonPil(ctx, 'CRH', x + 90, (ys[0] + ys[1]) / 2 + 6, TROP, show[1] * crh * (1 - 0.6 * laag)); }
  ketenBox(ctx, x, ys[1], 380, 96, 'hypofyse', '', HK.klierR, show[1] * dim[1]);
  if (show[2] > 0.01) { arrow(ctx, x, ys[1] + 52, x, ys[2] - 56, TROP, show[2] * (1 - 0.7 * laag), 4); hormoonPil(ctx, hormoon, x + 100, (ys[1] + ys[2]) / 2 + 6, TROP, show[2] * (1 - 0.6 * laag)); }
  ctx.save(); ctx.globalAlpha *= show[3]; const kw = 380 * (1 - 0.35 * krimp); roundRect(ctx, x - kw / 2, ys[2] - 48, kw, 96, 18); shape(ctx, rgba(SCHORS, 0.25), SCHORS, 2.5); text(ctx, 'bijnierschors', x, ys[2] + 12, fTekst(36, 700), C.text, 'center'); ctx.restore();
  if (show[4] > 0.01) { arrow(ctx, x, ys[2] + 52, x, ys[2] + 120, CORT, show[4], 4); hormoonPil(ctx, 'cortisol', x, ys[2] + 160, CORT, show[4]); }
  const rv = o.remVan || [x - 90, ys[2] + 150]; const remBoog = (yt, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.setLineDash([10, 10]); ctx.strokeStyle = HK.rem; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(rv[0], rv[1]); ctx.bezierCurveTo(x - 420, ys[2] + 100, x - 420, yt, x - 200, yt); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = HK.rem; ctx.font = fTekst(40, 700); ctx.textAlign = 'center'; ctx.fillText('−', x - 215, yt - 10); ctx.restore(); };
  remBoog(ys[1], rem); remBoog(ys[0], Math.max(rem * remBeide, 0));
  ctx.restore(); return ys; }
function curveAdr(m) { return m < 0 ? 0 : 100 * (1 - Math.exp(-m * 3)) * Math.exp(-m * 0.35); }
function curveCort(m) { return m < 0 ? 0 : 75 * Math.pow(m / 25, 2) * Math.exp(2 * (1 - m / 25)); }
function weekBalk(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ['ma', 'di', 'wo', 'do', 'vr'].forEach((d, i) => { const bx = x + i * (w / 5); roundRect(ctx, bx + 6, y, w / 5 - 12, 120, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); metaText(ctx, d.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), bx + w / 10, y + 36, C.grain, 'center', 22); text(ctx, 'toets', bx + w / 10, y + 88, fTekst(30, 700), C.koraal, 'center'); }); ctx.restore(); }
function boek(ctx, x, y, w, h, col) { roundRect(ctx, x, y, w, h, 4); shape(ctx, col, darken ? darken(col, 0.3) : col, 1.5); }
function bedScene(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 380, y - 20, 760, 80, 14); shape(ctx, '#6B5338', '#4A3A2E', 2); roundRect(ctx, x - 400, y - 160, 40, 240, 10); shape(ctx, '#6B5338', '#4A3A2E', 2);
  roundRect(ctx, x - 350, y - 150, 120, 130, 30); shape(ctx, '#E6E1D3', '#C9C2B4', 2); // kussen rechtop tegen het hoofdeinde
  // 1.1: Noor (castboek) zit rechtop in bed, van opzij, moe; alleen het deel boven het matras is zichtbaar (benen onder het dekbed)
  ctx.save(); ctx.beginPath(); ctx.rect(x - 420, y - 700, 1000, 700 - 22); ctx.clip();
  persoon(ctx, 'noor', x - 130, y + 120, 560, { zij: true, kijk: 1, pose: 'zit', uit: 'moe', zitHoogte: 140, t }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x - 250, y - 22); ctx.quadraticCurveTo(x - 160, y - 110, x - 20, y - 96); ctx.quadraticCurveTo(x + 200, y - 80, x + 360, y - 60); ctx.lineTo(x + 360, y - 20); ctx.lineTo(x - 250, y - 20); ctx.closePath(); shape(ctx, '#5A7FA0', '#46647F', 2);
  for (let i = 0; i < 3; i++) { roundRect(ctx, x + 420 + i * 22, y - 10 - i * 6, 70, 50, 8); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5); }
  ctx.restore(); }
function darken(c, k) { return lighten(c, -k); }

// 1.2 (29 okt 2026, keuze Kamiel): cold open thuis 's avonds aan het bureau, zoals de stem zegt ('elke avond tot laat leren'), niet meer in de klas.
// Muur, raam met avondlucht (maan, daken met een paar verlichte ramen), wandklok die van 20:00 naar 23:30 loopt, bureau met lamp, schrift en boeken.
function thuisAvond(ctx, t, laat = 0) {
  ctx.fillStyle = '#26354F'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3A3128'; ctx.fillRect(0, 820, W, H - 820); ctx.fillStyle = '#1E2A40'; ctx.fillRect(0, 808, W, 14);
  ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { const y = 860 + i * 56; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // raam
  const rx = 150, ry = 120, rw = 470, rh = 430;
  ctx.fillStyle = _mixHex('#22355C', '#111C33', laat); ctx.fillRect(rx, ry, rw, rh);
  ctx.fillStyle = _mixHex('#2E4570', '#17243F', laat); ctx.fillRect(rx, ry + rh * 0.62, rw, rh * 0.38);
  [[0.12, 0.18], [0.3, 0.09], [0.55, 0.22], [0.72, 0.12], [0.86, 0.3], [0.42, 0.32]].forEach(([u, v]) => circ(ctx, rx + rw * u, ry + rh * v, 2.4, rgba('#E6E1D3', 0.5 + 0.4 * laat)));
  ctx.save(); ctx.beginPath(); ctx.arc(rx + rw * 0.74, ry + rh * 0.24, 34, 0, 6.283); ctx.fillStyle = '#E6E1D3'; ctx.fill(); ctx.beginPath(); ctx.arc(rx + rw * 0.74 + 16, ry + rh * 0.24 - 8, 30, 0, 6.283); ctx.fillStyle = _mixHex('#22355C', '#111C33', laat); ctx.fill(); ctx.restore();
  // daken met verlichte ramen
  ctx.fillStyle = '#121A2B'; ctx.beginPath(); ctx.moveTo(rx, ry + rh); [[0, 0.78], [0.14, 0.66], [0.28, 0.78], [0.28, 0.72], [0.5, 0.72], [0.5, 0.62], [0.64, 0.5], [0.78, 0.62], [0.78, 0.74], [1, 0.74], [1, 1]].forEach(([u, v]) => ctx.lineTo(rx + rw * u, ry + rh * v)); ctx.closePath(); ctx.fill();
  [[0.08, 0.84], [0.36, 0.8], [0.6, 0.66], [0.66, 0.8], [0.88, 0.84]].forEach(([u, v], i) => { if (i === 3 && laat > 0.6) return; ctx.fillStyle = rgba(C.oker, 0.8); ctx.fillRect(rx + rw * u, ry + rh * v, 22, 26); });
  ctx.strokeStyle = '#C9C2B4'; ctx.lineWidth = 12; ctx.strokeRect(rx, ry, rw, rh); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(rx + rw / 2, ry); ctx.lineTo(rx + rw / 2, ry + rh); ctx.moveTo(rx, ry + rh * 0.45); ctx.lineTo(rx + rw, ry + rh * 0.45); ctx.stroke();
  roundRect(ctx, rx - 24, ry + rh + 4, rw + 48, 20, 4); shape(ctx, '#C9C2B4', '#A39C8E', 1.5);
  ctx.beginPath(); ctx.moveTo(rx + rw + 10, ry - 30); ctx.lineTo(rx + rw + 110, ry - 30); ctx.quadraticCurveTo(rx + rw + 90, ry + rh * 0.5, rx + rw + 120, ry + rh + 60); ctx.lineTo(rx + rw + 20, ry + rh + 60); ctx.quadraticCurveTo(rx + rw - 6, ry + rh * 0.5, rx + rw + 10, ry - 30); ctx.closePath(); shape(ctx, '#7A5245', '#5E3F35', 2);
  // wandklok: van acht uur tot half twaalf
  klok(ctx, 820, 220, 62, 8 + 3.5 * laat, '', 1, C.goud);
}
function bureau(ctx, x, y, w) { roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, '#9C7A52', '#7A5C3C', 2); ctx.fillStyle = '#7A5C3C'; ctx.fillRect(x - w / 2 + 30, y + 30, 26, 160); roundRect(ctx, x + w / 2 - 300, y + 30, 270, 160, 6); shape(ctx, '#8C6A44', '#6E5234', 2); for (let i = 0; i < 2; i++) { roundRect(ctx, x + w / 2 - 285, y + 44 + i * 74, 240, 60, 4); shape(ctx, '#957250', '#6E5234', 1.5); roundRect(ctx, x + w / 2 - 190, y + 70 + i * 74, 50, 8, 4); ctx.fillStyle = '#C9C2B4'; ctx.fill(); } }
function schrift(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 150, y - 8); ctx.lineTo(x, y - 2); ctx.lineTo(x + 150, y - 8); ctx.lineTo(x + 160, y + 18); ctx.lineTo(x, y + 24); ctx.lineTo(x - 160, y + 18); ctx.closePath(); shape(ctx, '#EDE8DA', '#B8B1A2', 1.5);
  ctx.strokeStyle = rgba('#5A7FA0', 0.6); ctx.lineWidth = 1.2; for (let i = 0; i < 3; i++) { const yy = y + 2 + i * 6; ctx.beginPath(); ctx.moveTo(x - 140, yy); ctx.lineTo(x - 14, yy + 3); ctx.moveTo(x + 14, yy + 3); ctx.lineTo(x + 140, yy); ctx.stroke(); }
  ctx.strokeStyle = '#3A3530'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 60, y + 30); ctx.lineTo(x + 150, y + 22); ctx.stroke(); ctx.restore(); }
function bureauLamp(ctx, x, y, aan = 1) { // voet op (x, y) = bovenkant bureau; kap boven het schrift
  const kx = x - 150, ky = y - 250;
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.beginPath(); ctx.moveTo(kx - 30, ky + 26); ctx.lineTo(kx + 36, ky + 22); ctx.lineTo(kx - 20, y - 4); ctx.lineTo(kx - 360, y - 4); ctx.closePath(); ctx.fillStyle = rgba('#FFE7A8', 0.08); ctx.fill(); ctx.beginPath(); ctx.ellipse(kx - 200, y - 2, 190, 16, 0, 0, 6.283); ctx.fillStyle = rgba('#FFE7A8', 0.14); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(x, y - 6, 52, 12, 0, 0, 6.283); shape(ctx, '#3E4A5E', '#5B6B88', 2);
  ctx.strokeStyle = '#5B6B88'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x + 30, y - 170); ctx.lineTo(kx + 20, ky); ctx.stroke(); circ(ctx, x + 30, y - 170, 9, '#3E4A5E', '#8FA0B5', 2);
  ctx.save(); ctx.translate(kx, ky); ctx.rotate(-0.35); ctx.beginPath(); ctx.moveTo(-10, -22); ctx.lineTo(40, -26); ctx.lineTo(62, 26); ctx.lineTo(-40, 30); ctx.closePath(); shape(ctx, '#3E4A5E', '#8FA0B5', 2); ctx.beginPath(); ctx.ellipse(10, 28, 50, 7, 0, 0, 6.283); ctx.fillStyle = aan > 0.5 ? '#FFE7A8' : '#8FA0B5'; ctx.fill(); ctx.restore();
}

// lichaam van s06 (lib_anatomie: BODY = {cx, yb, h}; AP(x, y) in hoofdhoogtes, x > 0 = rechts in beeld = links in het lichaam)
const S6_BODY = { cx: 540, yb: 880, h: 740 }; var BODY = S6_BODY;
// bloedlus vanaf de bijnier: holle ader → hart → halsslagaders → terug → aorta → benen → terug langs de nieren
const S6_LUS = [[0.37, 2.72], [0.12, 2.6], [0.04, 2.3], [0.12, 1.8], [0.15, 1.3], [0.14, 1.05], [-0.14, 1.05], [-0.15, 1.3], [-0.12, 1.8], [-0.06, 2.3], [-0.2, 2.9], [-0.3, 3.9], [-0.32, 5.0], [-0.3, 6.3], [-0.18, 6.35], [-0.2, 5.0], [-0.14, 3.9], [0, 3.4], [0.14, 3.9], [0.2, 5.0], [0.18, 6.35], [0.3, 6.3], [0.32, 5.0], [0.3, 3.9], [0.37, 2.72]];

const SCENES = {
  title(ctx, t) { bijnierDoorsnede(ctx, 1440, 560, 1.1, { gMerg: 0.5 + 0.5 * Math.sin(t * 3), gSchors: 0.5 + 0.5 * Math.sin(t * 0.8) }); },

  s01(ctx, t, q) { // 1.2: thuis 's avonds aan het bureau (was: klaslokaal)
    const bed = q.on('bed', 1), laat = q.on('laat', 1);
    ctx.save(); ctx.globalAlpha *= 1 - bed; thuisAvond(ctx, t, laat);
    bureau(ctx, 960, 704, 1120); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 712); ctx.clip(); persoon(ctx, 'noor', 960, 940, 560, { pose: 'zit', tafel: 704, uit: laat > 0.5 ? 'moe' : 'denkt', kijk: 1, t }); ctx.restore();
    schrift(ctx, 960, 690); boek(ctx, 560, 650, 150, 46, '#B36A5E'); boek(ctx, 575, 610, 125, 40, '#5A7FA0'); boek(ctx, 590, 576, 110, 34, '#7FA07F');
    ctx.fillStyle = rgba('#000814', 0.18 + 0.27 * laat); ctx.fillRect(0, 0, W, H); bureauLamp(ctx, 1360, 704, 1); weekBalk(ctx, 1320, 130, 520, q.on('Toetsweek', 1));
    ctx.restore();
    if (bed > 0.01) { ctx.save(); ctx.globalAlpha *= bed; ctx.fillStyle = '#26364F'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3530'; ctx.fillRect(0, 700, W, H - 700); bedScene(ctx, 900, 640, 1, t); ctx.restore();
      tag(ctx, 'verkouden · keelpijn', 960, 260, C.koraal, q.on('Verkouden', 1)); }
    vraagteken(ctx, 1500, 420, q.on('Hoe', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const cut = q.on('Snijd', 1);
    const NB = nierMetBijnier(ctx, 960, 560, 1.6, 1 - cut, q.on('bijnier', 1)); naamBij(ctx, 'bijnier', 'als een kapje op de nier', NB.bijnier[0] + 70, NB.bijnier[1] - 40, q.on('bijnier', 1) * (1 - cut), 'left', HK.klierR); naamBij(ctx, 'nier', '', 835, 610, q.on('nier', 1) * (1 - cut), 'right', '#C98A7E');
    bijnierDoorsnede(ctx, 760, 560, 1.15, { a: cut, merg: q.on('merg', 1), schors: q.on('schors', 1) * 0.85 + 0.15, gMerg: q.on('adrenaline', 1) * (1 - q.on('schors', 2)), gSchors: q.on('cortisol', 1) });
    naamBij(ctx, 'merg', 'binnenin', 770, 570, q.on('merg', 1) * cut, 'center', lighten(MERG, 0.3)); naamBij(ctx, 'schors', 'daaromheen', 480, 560, q.on('schors', 1) * cut, 'right', HK.klierR);
    tag(ctx, 'twee klieren in één', 760, 830, C.goud, q.on('klieren', 1) * (1 - q.on('adrenaline', 1)));
    const ad = q.on('adrenaline', 1), co = q.on('cortisol', 1);
    if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; regel(ctx, 'merg → adrenaline', 1180, 520, 1, C.text, 36); hormoonVorm(ctx, 1520, 506, 13, 'adrenaline', 1); zenuwLijn(ctx, [[300, 200], [470, 360], [640, 450], [740, 500]], q.on('zenuw', 1), t, 1); regel(ctx, 'aangezet door een zenuw', 1180, 570, q.on('zenuw', 1), HK.zenuw, 30); ctx.restore(); }
    if (co > 0.01) { ctx.save(); ctx.globalAlpha *= co; regel(ctx, 'schors → cortisol', 1180, 690, 1, C.text, 36); hormoonVorm(ctx, 1490, 676, 13, 'cortisol', 1); regel(ctx, 'aangezet door een hormoon van de hypofyse', 1180, 740, q.on('hypofyse', 1), TROP, 30); ctx.restore(); }
    vraagteken(ctx, 1700, 860, q.on('Welke', 1), 100);
  },

  s06(ctx, t, q) { bg(ctx, 'schema');
    // 1.1: realistisch lichaam uit personages/lib_anatomie.js (organen op hun echte plek) in plaats van het grijze lichaamssilhouet;
    // de hypothalamus in een zoomcirkel náást het hoofd (hoofdHersenen uit de beeldbank), niet over het gezicht (BEELDAFSPRAKEN 25–26 okt 2026)
    BODY = S6_BODY; const hHy = q.on('hypothalamus', 1), hMe = q.on('bijniermerg', 1), z = q.on('zenuwen', 1);
    bodyOrgans({ sil: 1, t, beat: t * 7 * (1 + q.on('hart', 2)) });
    ctx.save(); ctx.globalAlpha *= 0.85; anKidney(-1, 1); anKidney(1, 1); ctx.restore(); anAdrenal(1);
    const bjL = AP(-0.37, 2.73), bjR = AP(0.37, 2.67), hartP = AP(0.09, 2.22);
    if (hMe > 0.01) for (const b of [bjL, bjR]) { ctx.save(); ctx.globalAlpha *= hMe; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(b[0], b[1] + 2, 15, 0, 6.283); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'bijniermerg', '', bjR[0] + 26, bjR[1] + 10, hMe * (1 - q.on('receptor', 1)), 'left', C.goud);
    // zenuwbaan: hypothalamus → hersenstam → ruggenmerg → bijniermerg (en een tak naar het hart)
    const nek = AP(0, 1.02), rug = AP(0, 2.35);
    zenuwLijn(ctx, [nek, AP(0, 1.6), rug, AP(0.12, 2.55), bjR], z, t, 1); zenuwLijn(ctx, [AP(0, 2.35), AP(-0.12, 2.55), bjL], z, t + 0.5, 1);
    zenuwLijn(ctx, [AP(0, 1.85), [hartP[0] - 4, hartP[1] - 10]], q.on('hart', 1), t, 0);
    zoomCircle(ctx, 225, 245, 118, nek[0] - 30, AP(0, 0.55)[1], 'hypothalamus', hHy, () => { bg(ctx, 'schema'); hoofdHersenen(ctx, 240, 240, 0.33, { hth: hHy }); });
    tag(ctx, 'orthosympathisch zenuwstelsel', 960, 110, HK.zenuw, q.on('orthosympathische', 1) * (1 - q.on('eerste', 1)));
    const bl = q.on('blaasjes', 1); if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl * (1 - q.on('eerste', 1)); circ(ctx, 1260, 380, 170, rgba(MERG, 0.25), lighten(MERG, 0.3), 2.5); for (let i = 0; i < 9; i++) { const an = i * 0.7, rr = 40 + (i % 3) * 38; const bx = 1260 + Math.cos(an) * rr, by = 380 + Math.sin(an) * rr; circ(ctx, bx, by, 26, rgba('#F2F2EE', 0.15), '#C9C2B4', 1.5); hormoonVorm(ctx, bx, by, 9, 'adrenaline', 1); } metaText(ctx, 'MERGCEL: ADRENALINE IN BLAASJES', 1260, 600, C.grain, 'center', 22); ctx.restore(); }
    const L = S6_LUS.map(p => AP(p[0], p[1])); bloedNet(ctx, L, q.on('bloed', 2)); hormoonStroom(ctx, L, 20, t, ramp(t, q.at('bloed', 2), 3), 'adrenaline', q.on('bloed', 2), 7, 0);
    const dc = q.on('receptor', 1) * (1 - q.on('hart', 2)); if (dc > 0.01) { for (let i = 0; i < 3; i++) doelcel(ctx, 1080 + i * 240, 420, 90, { a: dc, n: i === 1 ? 0 : 4, noRec: i === 1, kind: 'adrenaline', bound: ramp(t, q.at('reageren'), 1.5), glow: i === 1 ? 0 : q.on('reageren', 1), seed: i + 2, t }); tag(ctx, 'doelwitcel', 1080, 580, C.goud, q.on('doelwitcellen', 1) * dc); tag(ctx, 'doelwitcel', 1560, 580, C.goud, q.on('doelwitcellen', 1) * dc); tag(ctx, 'geen receptor', 1320, 660, C.text2, q.on('doelwitcellen', 1) * dc); }
    const rows = [['hart: sneller en harder', 'hart', 2], ['luchtwegen wijder, dieper ademen', 'luchtwegen'], ['lever: glycogeen → glucose', 'lever'], ['bloedvaten spieren wijder', 'spieren'], ['bloedvaten darmen nauwer', 'darmen']];
    rows.forEach(([s, w, n = 1], i) => { const al = q.on(w, n); if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const y = 250 + i * 110; roundRect(ctx, 1000, y - 42, 820, 76, 16); shape(ctx, rgba(ADR, 0.1), rgba(ADR, 0.6), 1.5); hormoonVorm(ctx, 1046, y - 4, 14, 'adrenaline', 1); text(ctx, s, 1080, y + 8, fTekst(34, 600), C.text, 'left'); ctx.restore(); });
    tag(ctx, 'meer zuurstof en glucose naar de spieren', 1410, 840, C.goud, q.on('zuurstof', 1));
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    grafiek(ctx, 300, 200, 1100, 460, { a: 1, xmax: 12, ymax: 110, f: m => curveAdr(m), u: ramp(t, 0.5, 6), xticks: [0, 2, 4, 6, 8, 10, 12], yticks: [], xlab: 'minuten na de schrik', ylab: 'extra adrenaline (model)', col: ADR });
    tag(ctx, 'spreekbeurt · wedstrijd', 1560, 260, C.text2, q.on('spreekbeurt', 1)); tag(ctx, 'een beetje stress: scherper', 1560, 350, C.goud, q.on('scherper', 1));
    tag(ctx, 'snel afgebroken', 1100, 500, C.text2, q.on('breekt', 1)); tag(ctx, 'na een paar minuten bijna weg', 1100, 580, C.text2, q.on('minuten', 1));
  },

  s08(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('twintig', 1);
    const ys = hpaKeten(ctx, 520, 190, { a: 1 - 0.0 * gr, show: [q.on('hypothalamus', 1), q.on('hypofyse', 2), q.on('ACTH', 1), q.on('bijnierschors', 1), q.on('cortisol', 1)] });
    tag(ctx, 'net als bij de schildklier', 520, 100, C.text2, q.on('schildklier', 1) * (1 - q.on('hypothalamus', 2)));
    tag(ctx, 'twee extra stappen', 1000, 420, C.goud, q.on('stappen', 1) * (1 - gr)); tag(ctx, 'geen voorraad: eerst maken', 1000, 520, C.goud, q.on('voorraad', 1) * (1 - gr));
    if (gr > 0.01) { grafiek(ctx, 960, 200, 820, 440, { a: gr, xmax: 60, ymax: 110, f: m => curveAdr(m), xticks: [0, 15, 30, 45, 60], yticks: [], xlab: 'minuten na de schrik', ylab: 'in het bloed (model)', col: ADR });
      grafiek(ctx, 960, 200, 820, 440, { a: gr, xmax: 60, ymax: 110, f: curveCort, u: ramp(t, q.at('twintig'), 3), xticks: [], yticks: [], col: CORT });
      regel(ctx, 'adrenaline', 1000, 260, gr, ADR, 30); regel(ctx, 'cortisol', 1420, 360, gr, CORT, 30); }
    tag(ctx, 'hartbonzen = adrenaline', 1370, 820, ADR, q.on('bonken', 1));
    const st = q.on('stresshormoon', 1) * (1 - q.on('bonken', 1)); if (st > 0.01) tag(ctx, 'cortisol = hét stresshormoon?', 1370, 820, CORT, st);
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    hormoonPil(ctx, 'cortisol', 760, 480, CORT, 1); hormoonVorm(ctx, 760, 400, 18, 'cortisol', 1); arrow(ctx, 880, 480, 1020, 480, C.line, 1, 4); for (let i = 0; i < 5; i++) glucoseDeeltje(ctx, 1100 + (i % 3) * 60, 440 + Math.floor(i / 3) * 70, 22, 1);
    vraagteken(ctx, 1380, 520, q.on('Wat', 2) || q.on('denk', 1), 140);
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const am = q.on('aminozuren', 1), sp = q.on('spieren', 1);
    // 1.1: skeletspiervezels (dwarsstreping, kernen aan de rand) en de lever in vooraanzicht uit de beeldbank
    ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * sp; spierBundel(ctx, 210, 450, 360, { n: 5, h: 34 }); naamBij(ctx, 'spier', '', 390, 600, 1, 'center'); ctx.restore();
    leverVoor(ctx, 1060, 480, 0.95, { a: 1 }); naamBij(ctx, 'lever', '', 1060, 440, 1, 'center');
    for (let i = 0; i < 8; i++) { const u = ((t * 0.25 + i / 8) % 1); const bx = lerp(580, 860, u), by = 450 + Math.sin(u * 6 + i) * 40; ctx.save(); ctx.globalAlpha *= am; circ(ctx, bx, by, 11, rgba(C.groen, 0.7 * Math.max(sp, 0.3)), C.groen, 1.5); ctx.restore(); }
    tag(ctx, 'eiwit → aminozuren', 390, 230, C.groen, sp);
    const ng = q.on('nieuwe', 1); for (let i = 0; i < 7; i++) { const u = ((t * 0.3 + i / 7) % 1); glucoseDeeltje(ctx, lerp(1260, 1640, u), 460 + Math.sin(u * 5 + i) * 60, 18, ng * (1 - u * 0.3)); }
    tag(ctx, 'nieuwe glucose', 1480, 300, HK.glucose, ng);
    const vg = q.on('voorraad', 1); if (vg > 0.01) { ctx.save(); ctx.globalAlpha *= vg; roundRect(ctx, 260, 720, 640, 120, 18); shape(ctx, rgba(ADR, 0.1), rgba(ADR, 0.6), 1.5); hormoonVorm(ctx, 296, 780, 13, 'adrenaline', 1); text(ctx, 'adrenaline: uit de voorraad (glycogeen)', 590, 790, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    const nb = q.on('laat', 2); if (nb > 0.01) { ctx.save(); ctx.globalAlpha *= nb; roundRect(ctx, 1020, 720, 640, 120, 18); shape(ctx, rgba(CORT, 0.12), rgba(CORT, 0.7), 1.5); hormoonVorm(ctx, 1060, 780, 13, 'cortisol', 1); text(ctx, 'cortisol: nieuwe glucose erbij', 1350, 790, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    const rem = ramp(t, q.at('remt'), 2);
    for (let i = 0; i < 7; i++) afweercelEcht(ctx, 380 + (i % 4) * 300 + (i > 3 ? 150 : 0), 380 + Math.floor(i / 4) * 260, 120, 1, rem, t, i + 1);
    for (let i = 0; i < 14; i++) { const wv = wander(i, t, 30, 0.6); hormoonVorm(ctx, 300 + hash(i * 7) * 1300 + wv.x, 260 + hash(i * 3) * 500 + wv.y, 10, 'cortisol', q.on('cortisol', 1), CORT); }
    metaText(ctx, 'AFWEERCELLEN', 960, 160, C.grain, 'center', 24);
    tag(ctx, 'cortisol remt afweer en ontstekingen', 960, 820, CORT, q.on('remt', 1) * (1 - q.on('korte', 1)));
    tag(ctx, 'kort: afweer schiet niet door', 960, 820, C.text2, q.on('korte', 1) * (1 - q.on('Onthoud', 1)));
    const on = q.on('Onthoud', 1); if (on > 0.01) { ctx.save(); ctx.globalAlpha *= on; roundRect(ctx, 560, 760, 800, 90, 20); shape(ctx, rgba(C.goud, 0.18), C.goud, 3); text(ctx, '★ cortisol remt je afweer', 960, 818, fTekst(40, 700), C.text, 'center'); ctx.restore(); }
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const dr = q.on('Nog', 1);
    const nodes = [{ t: 'cortisol in het bloed', s: 'glucose omhoog, afweer omlaag', col: CORT, rol: 'WAARDE' }, { t: 'hypothalamus + hypofyse', s: 'meten cortisol', col: HK.klierR, rol: 'REGELCENTRUM' }, { t: 'ACTH', s: 'de opdracht', col: TROP, rol: 'SIGNAAL' }, { t: 'bijnierschors', s: 'maakt cortisol', col: SCHORS, rol: 'EFFECTOR' }];
    kringSchema(ctx, 960, 470, { a: 1 - dr, nodes, rx: 540, ry: 290, bw: 460, bh: 120, arr: [q.on('remt', 1), q.on('ACTH', 1), q.on('minder', 2), 1], minus: q.on('terugkoppeling', 1), pulse: (t / 5) % 1 });
    tag(ctx, 'eindproduct remt zijn eigen aanmaak', 960, 470 + 0, C.goud, q.on('eindproduct', 1) * (1 - q.on('terugkoppeling', 1)) * (1 - dr));
    if (dr > 0.01) { const f = h => h < 7.5 ? 20 + 80 * Math.exp(-Math.pow((h - 7.5) / 2, 2)) : 20 + 80 * Math.exp(-(h - 7.5) / 4);
      grafiek(ctx, 300, 200, 1320, 480, { a: dr, xmax: 24, ymax: 110, f, u: ramp(t, q.at('Nog'), 3), xticks: [0, 6, 12, 18, 24], yticks: [], xlab: 'uur van de dag', ylab: 'cortisol (model)', col: CORT, xfmt: v => v + ':00' });
      tag(ctx, 'hoogst: wakker worden', 820, 150, CORT, q.on('wakker', 1)); tag(ctx, 'laagst: middernacht', 1560, 500, C.text2, q.on('middernacht', 1)); tag(ctx, 'biologische klok', 960, 760, C.text2, q.on('ritme', 1)); }
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const cel = q.on('Adrenaline', 1), pr = q.on('prednison', 1);
    hpaKeten(ctx, 520, 190, { a: 1 - cel, crh: q.on('CRH', 1), rem: q.on('remt', 1), remBeide: q.on('remt', 1) });
    tag(ctx, 'HPA-as', 1100, 300, C.goud, q.on('as', 1) * (1 - cel)); regel(ctx, 'Hypothalamus · Pituitary (hypofyse) · Adrenal (bijnier)', 1100, 380, q.on('Engels', 1) * (1 - cel), C.text2, 28, 'center');
    if (cel > 0.01) { ctx.save(); ctx.globalAlpha *= cel * (1 - pr);
      for (const [cx, nm] of [[560, 'adrenaline'], [1360, 'cortisol']]) { ctx.beginPath(); ctx.ellipse(cx, 520, 340, 260, 0, 0, 6.283); shape(ctx, rgba(HK.cel, 0.12), HK.cel, 3); circ(ctx, cx + 60, 560, 80, rgba(C.kern, 0.5), C.kernR, 2); metaText(ctx, 'KERN', cx + 60, 670, C.grain, 'center', 20); kop(ctx, nm, cx, 170, 1, nm === 'adrenaline' ? ADR : CORT, 40); }
      receptor(ctx, 560, 262, -Math.PI / 2, 'adrenaline', ramp(t, q.at('bindt'), 1), 1, 1.4); hormoonVorm(ctx, 560, 230 - 40 * (1 - ramp(t, q.at('bindt'), 1)), 14, 'adrenaline', 1);
      regel(ctx, 'receptor op het membraan', 560, 830, q.on('membraan', 1), C.text, 30, 'center');
      const cu = ramp(t, q.at('steroïdhormoon'), 4), cg = ramp(t, q.at('genen'), 2); const cx = lerp(1360, 1320, cu) + 100 * cg, cy = lerp(220, 440, cu) + 120 * cg; hormoonVorm(ctx, cx, cy, 16, 'cortisol', q.on('steroïdhormoon', 1), CORT);
      { const rb = q.on('bindt', 2); receptor(ctx, 1320, 470, Math.PI / 2, 'cortisol', ramp(t, q.at('bindt', 2), 1), rb, 1.3); } regel(ctx, 'receptor in de cel → genen aan of uit', 1360, 830, q.on('genen', 1), C.text, 30, 'center');
      tag(ctx, 'trager, maar langer', 1650, 170, CORT, q.on('trager', 1)); ctx.restore(); }
    if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(780 + i * 120, 480, 46, 30, 0.3, 0, 6.283); shape(ctx, '#F2F2EE', '#C9C2B4', 2); } kop(ctx, 'prednison', 900, 360, 1, C.text, 48); regel(ctx, 'lijkt op cortisol · tablet bij reuma · remt ontstekingen', 900, 600, q.on('reuma', 1), C.text2, 30, 'center'); ctx.restore(); }
    tag(ctx, 'een jaar lang, dan ineens stoppen', 900, 720, C.koraal, q.on('stopt', 1)); vraagteken(ctx, 1500, 520, q.on('risico', 1), 140);
  },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const laag = q.on('weinig', 1), kr = q.on('kleiner', 1), stop = q.on('Stopt', 1);
    hpaKeten(ctx, 520, 190, { crh: 1, rem: 1 - stop, remBeide: 1 - stop, laag, krimp: ramp(t, q.at('kleiner'), 2), show: [1, 1, 1, 1, 0.3], remVan: [200, 790] });
    hormoonPil(ctx, 'prednison', 200, 820, '#F2F2EE', 1 - stop);
    tag(ctx, 'weinig CRH en ACTH', 1200, 300, TROP, laag); tag(ctx, 'bijnierschors krimpt', 1200, 400, SCHORS, kr); tag(ctx, 'te weinig cortisol', 1200, 500, C.koraal, q.on('weinig', 2));
    const af = q.on('bouwen', 1); if (af > 0.01) { ctx.save(); ctx.globalAlpha *= af; metaText(ctx, 'DOSIS PREDNISON', 1060, 620, C.grain, 'left', 22); for (let i = 0; i < 6; i++) { const h = 180 - i * 30; roundRect(ctx, 1060 + i * 110, 820 - h, 80, h, 8); shape(ctx, rgba('#F2F2EE', 0.3), '#C9C2B4', 1.5); } regel(ctx, 'langzaam afbouwen', 1060, 870, 1, C.text, 30); ctx.restore(); }
    tag(ctx, 'stop nooit zelf: overleg met je arts', 1300, 160, C.goud, q.on('overleg', 1));
  },

  s17(ctx, t, q) { bg(ctx, 'schema');
    const ph2 = q.on('terugkoppeling', 1), ph3 = q.on('korte', 2);
    const items = [['schrik', 'seconden', 0.15, q.on('schrik', 1)], ['toets', 'een uur', 0.3, q.on('toets', 1)], ['toetsweek', 'dagen', 0.55, q.on('toetsweek', 1)], ['weken stress', 'weken', 0.85, q.on('weken', 1)]];
    ctx.save(); ctx.globalAlpha *= 1 - ph2; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(240, 640); ctx.lineTo(1700, 640); ctx.stroke();
    items.forEach(([n, d, v, a], i) => { if (a <= 0.01) return; const x = 380 + i * 400; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, 640 - 380 * v, 140, 380 * v, 10); shape(ctx, rgba(C.text2, 0.25), C.text2, 2); text(ctx, n, x, 700, fTekst(34, 700), C.text, 'center'); metaText(ctx, d.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, 740, C.grain, 'center', 22); ctx.restore(); });
    metaText(ctx, 'HOE LANG DE STRESS DUURT', 240, 180, C.grain, 'left', 22); tag(ctx, 'korte stress hoort erbij', 580, 860, C.groen, q.on('gewoon', 1)); ctx.restore();
    if (ph2 > 0.01) { ctx.save(); ctx.globalAlpha *= ph2 * (1 - ph3);
      ketenBox(ctx, 960, 420, 400, 110, 'hypothalamus', '', HK.klierR, 1);
      arrow(ctx, 420, 420, 740, 420, HK.zenuw, 1, 12); text(ctx, 'hersenen: gas', 560, 370, fTekst(36, 700), HK.zenuw, 'center');
      arrow(ctx, 1500, 420, 1180, 420, HK.rem, 1, 4); text(ctx, 'cortisol: rem', 1340, 370, fTekst(36, 700), HK.rem, 'center');
      tag(ctx, 'gas sterker dan rem', 960, 620, C.goud, q.on('gaspedaal', 1));
      tag(ctx, "'s avonds blijft cortisol te hoog", 960, 760, CORT, q.on('avonds', 1)); ctx.restore(); }
    if (ph3 > 0.01) { const P = [['afweer geremd', 'sneller ziek, wondjes trager', AFW, q.on('afweer', 1)], ['glucose hoger', '', HK.glucose, q.on('glucose', 1)], ['slechter slapen', '', C.text2, q.on('slaapt', 1)]];
      P.forEach(([a1, a2, c, al], i) => { if (al <= 0.01) return; const x = 380 + i * 580; ctx.save(); ctx.globalAlpha *= al * ph3; roundRect(ctx, x - 250, 300, 500, 360, 24); shape(ctx, rgba(c, 0.1), c, 2); text(ctx, a1, x, 470, fTekst(40, 700), C.text, 'center'); if (a2) text(ctx, a2, x, 530, fTekst(28), C.text2, 'center'); ctx.restore(); });
      tag(ctx, 'wat kort helpt, werkt nu tegen je', 960, 200, C.koraal, ph3); }
  },
  s18(ctx, t, q) { bg(ctx, 'schema');
    grafiek(ctx, 300, 200, 1000, 400, { a: 1, xmax: 10, ymax: 110, f: d => d < 3 ? 85 : 30 + 55 * Math.exp(-(d - 3) * 0.9), u: ramp(t, q.at('Zakt'), 3), xticks: [], yticks: [], xlab: 'tijd', ylab: 'cortisol (model)', col: CORT });
    tag(ctx, 'niet blijvend', 800, 140, C.groen, q.on('blijvend', 1)); tag(ctx, 'rem krijgt de overhand', 1100, 330, HK.rem, q.on('overhand', 1)); tag(ctx, 'afweer herstelt', 1100, 420, C.groen, q.on('herstelt', 1));
    const H = [['slapen', 'Slapen'], ['bewegen', 'bewegen'], ['pauze', 'pauze'], ['praten, bv. met je mentor', 'praten']];
    H.forEach(([s, w], i) => tag(ctx, s, 380 + i * 400, 820, C.text2, q.on(w, 1)));
  },

  s19(ctx, t, q) { bg(ctx, 'schema');
    weekBalk(ctx, 260, 140, 875, 1 - q.on('antwoord', 1));
    const f = d => d < 0 ? 30 : d < 5 ? 30 + 35 * (1 - Math.exp(-d * 1.2)) : 30 + 35 * Math.exp(-(d - 5) * 1.5);
    grafiek(ctx, 260, 360, 1400, 300, { a: q.on('cortisol', 1) || q.on('bijnierschors', 1), xmax: 8, ymax: 80, f, u: ramp(t, q.at('bijnierschors'), 4), xticks: [], yticks: [], xlab: 'dagen', ylab: 'cortisol (model)', col: CORT });
    for (let i = 0; i < 4; i++) for (let k = 0; k < 2; k++) { const u = ramp(t, q.at('kans'), 4); virus(ctx, 500 + i * 230 + k * 60, 760 - k * 40, 14, u * clamp(u * 4 - i * 0.5, 0, 1), t); }
    tag(ctx, 'virus krijgt een kans', 760, 860, C.koraal, q.on('kans', 1) * (1 - q.on('antwoord', 1)));
    tag(ctx, 'een paar dagen later: ziek', 1500, 760, C.koraal, q.on('later', 1) * (1 - q.on('antwoord', 1)));
    hormoonPil(ctx, 'adrenaline: snel weg', 1460, 260, ADR, q.on('adrenaline', 1) * (1 - q.on('antwoord', 1)));
    { const bz = q.on('later', 1); if (bz > 0.01) { ctx.save(); ctx.translate(1560, 560); ctx.scale(0.35, 0.35); bedScene(ctx, 0, 0, bz, t); ctx.restore(); } }
    tag(ctx, 'door stress blijft een hormoon hoog dat je afweer remt', 960, 200, C.goud, q.on('antwoord', 1));
  },
};

// Gedrag 1 · Waarom doet een dier wat het doet? — scènes per alinea (v1.0, 15 okt 2026).
// Rode draad: de driedoornige stekelbaars van Tinbergen. Modellenproef met tellende staafjes,
// vinkenzang als sonogram, en een bord met de vier vragen dat het hele derde hoofdstuk blijft staan.

const ROOD = '#D8503C', ZILVER = '#AFC0C8', RUG = '#5E7A6A', WATER = '#1E3A4A', ZAND = '#8C7A5A', PLANT = '#4E8F5E', POSTROOD = '#C8392B';

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- stekelbaars (zijaanzicht, kop rechts) ----------
function stekelbaars(ctx, x, y, s, o = {}) { const { rood = 0, dreig = 0, a = 1, flip = 1, t = 0, oogkleur = '#7FC4E0' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  const sw = Math.sin(t * 8) * 0.08; // staart wiebelt
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-128, -22 + sw * 60); ctx.lineTo(-122, 0); ctx.lineTo(-128, 22 + sw * 60); ctx.closePath(); shape(ctx, RUG, null);
  ctx.beginPath(); ctx.moveTo(-95, 0); ctx.quadraticCurveTo(-30, -48, 60, -18); ctx.quadraticCurveTo(96, -6, 100, 4); ctx.quadraticCurveTo(80, 26, 20, 28); ctx.quadraticCurveTo(-50, 26, -95, 0); ctx.closePath(); shape(ctx, ZILVER, null);
  // rug donker
  ctx.save(); ctx.clip(); ctx.fillStyle = RUG; ctx.fillRect(-100, -60, 210, 44);
  if (rood > 0.01) { ctx.fillStyle = rgba(ROOD, rood); ctx.beginPath(); ctx.ellipse(40, 22, 70, 22, 0, 0, 6.283); ctx.fill(); }
  ctx.restore();
  // drie rugstekels + buikstekel
  ctx.strokeStyle = '#3E5A4A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [bx, len] of [[30, 30], [5, 26], [-40, 14]]) { const an = -Math.PI / 2 - 0.9 * (1 - dreig); ctx.beginPath(); ctx.moveTo(bx, -26); ctx.lineTo(bx + Math.cos(an) * len, -26 + Math.sin(an) * len); ctx.stroke(); }
  { const an = Math.PI / 2 + 0.9 * (1 - dreig); ctx.beginPath(); ctx.moveTo(10, 26); ctx.lineTo(10 + Math.cos(an) * 20, 26 + Math.sin(an) * 20); ctx.stroke(); }
  circ(ctx, 72, -6, 9, '#F2F2EE'); circ(ctx, 74, -6, 5, '#121A26'); circ(ctx, 72, -6, 9, null, oogkleur, 2);
  ctx.restore(); }
// ruwe modellen (Tinbergen): echt (geen rood) en klodders met rode onderkant
function model(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // stokje
  ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, -120); ctx.stroke();
  if (soort === 'echt') { ctx.restore(); stekelbaars(ctx, x, y, s, { rood: 0, a }); return; }
  ctx.beginPath(); if (soort === 'sigaar') ctx.ellipse(0, 0, 90, 26, 0, 0, 6.283); else if (soort === 'schijf') ctx.ellipse(0, 0, 50, 46, 0, 0, 6.283); else { ctx.moveTo(-80, -10); ctx.quadraticCurveTo(0, -50, 80, -14); ctx.lineTo(70, 24); ctx.quadraticCurveTo(0, 36, -76, 18); ctx.closePath(); }
  ctx.save(); ctx.clip(); ctx.fillStyle = '#8A95A0'; ctx.fillRect(-100, -60, 200, 120); ctx.fillStyle = ROOD; ctx.fillRect(-100, 4, 200, 60); ctx.restore();
  circ(ctx, soort === 'schijf' ? 26 : 56, -4, 6, '#121A26'); ctx.restore(); }
function aquarium(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 8); shape(ctx, rgba(WATER, 0.9), '#9FB8C8', 4); ctx.fillStyle = ZAND; ctx.fillRect(x + 4, y + h - 40, w - 8, 36);
  for (let i = 0; i < 6; i++) { const px = x + 30 + i * (w - 60) / 5; ctx.strokeStyle = PLANT; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, y + h - 30); ctx.quadraticCurveTo(px + 20, y + h - 110, px - 6, y + h - 150 - (i % 2) * 40); ctx.stroke(); }
  ctx.restore(); }
function nest(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 60, 24, 0, Math.PI, 0); shape(ctx, '#6B8A4A', '#4E6A3A', 2); circ(ctx, x + 50, y - 8, 10, '#1E3A4A'); ctx.restore(); }
function postauto(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -150, -110, 230, 110, 10); shape(ctx, POSTROOD, '#8C2A20', 2); roundRect(ctx, 80, -80, 80, 80, 10); shape(ctx, POSTROOD, '#8C2A20', 2); ctx.fillStyle = '#9FC8E0'; ctx.fillRect(100, -70, 50, 30); text(ctx, 'POST', -40, -48, fTekst(34, 700), '#F2D27A', 'center'); for (const wx of [-100, 110]) circ(ctx, wx, 0, 24, '#22242A', '#9AA3B2', 3); ctx.restore(); }
// vink en sonogram
function vink(ctx, x, y, s = 1, a = 1, zing = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 6); ctx.lineTo(-90, 26); ctx.lineTo(-84, 0); ctx.closePath(); shape(ctx, '#5A5048', null); ctx.beginPath(); ctx.ellipse(0, 6, 50, 34, -0.1, 0, 6.283); shape(ctx, '#C9806A', null); ctx.beginPath(); ctx.ellipse(-8, -2, 38, 18, 0.1, 0, 6.283); shape(ctx, '#6E6A60', '#F2F2EE', 1.5); circ(ctx, 40, -22, 24, '#7A8AA8'); circ(ctx, 50, -26, 4, '#121A26'); ctx.beginPath(); ctx.moveTo(62, -24 - 4 * zing); ctx.lineTo(80, -20); ctx.lineTo(62, -14 + 4 * zing); ctx.closePath(); shape(ctx, '#B8A890', null); ctx.strokeStyle = '#8C7A60'; ctx.lineWidth = 3; for (const lx of [-6, 12]) { ctx.beginPath(); ctx.moveTo(lx, 38); ctx.lineTo(lx, 56); ctx.stroke(); } ctx.restore(); }
function sonogram(ctx, x, y, w, h, o = {}) { const { a = 1, roffel = 1, prog = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5);
  const notes = []; for (let i = 0; i < 9; i++) notes.push([0.05 + i * 0.06, 0.55 - i * 0.03, 0.035, 0.25]); for (let i = 0; i < 6; i++) notes.push([0.62 + i * 0.035, 0.7 - i * 0.07, 0.02, 0.12]); // trillers en slotroffel
  notes.forEach((n, i) => { const isR = i >= 9; if (isR && roffel <= 0.01) return; if (n[0] > prog) return; ctx.fillStyle = isR ? rgba(C.goud, (0.5 + 0.5 * hl) * roffel) : rgba(C.teal, 0.85); roundRect(ctx, x + n[0] * w, y + n[1] * h - n[3] * h / 2, n[2] * w, n[3] * h, 4); ctx.fill(); });
  metaText(ctx, 'frequentie', x + 10, y - 12, C.text2, 'left', 18); metaText(ctx, 'tijd →', x + w, y + h + 26, C.text2, 'right', 18); ctx.restore(); }
// bord met vier vragen
const VIER = [['1 oorzaak', 'hoe werkt het, nu?', C.teal], ['2 ontwikkeling', 'hoe ontstaat het in zijn leven?', C.groen], ['3 functie', 'wat levert het op?', C.goud], ['4 evolutie', 'waar komt het vandaan?', C.paars]];
function vierBord(ctx, x, y, w, h, lit, o = {}) { const { a = 1, hl = -1, dim = 0, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = (w - 20) / 2, ch = (h - 20) / 2;
  VIER.forEach(([nm, vr, col], i) => { const al = lit[i] || 0; if (al <= 0.01) return; const cx = x + (i % 2) * (cw + 20), cy = y + Math.floor(i / 2) * (ch + 20); ctx.save(); ctx.globalAlpha *= al * (hl >= 0 && hl !== i ? 1 - 0.65 * dim : 1); roundRect(ctx, cx, cy, cw, ch, 16); shape(ctx, rgba(col, hl === i ? 0.22 : 0.1), col, hl === i ? 3 : 1.5); text(ctx, nm, cx + 24, cy + 48, fTekst(34, 700), col, 'left'); text(ctx, vr, cx + 24, cy + 88, fTekst(26, 500), C.text2, 'left'); if (inhoud && inhoud[i]) inhoud[i](cx, cy, cw, ch); ctx.restore(); });
  ctx.restore(); }
function stamboompje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.paars; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 40); ctx.lineTo(x - 70, y - 80); ctx.moveTo(x, y - 40); ctx.lineTo(x + 70, y - 80); ctx.moveTo(x + 35, y - 60); ctx.lineTo(x + 20, y - 80); ctx.stroke(); stekelbaars(ctx, x - 70, y - 100, 0.22, { rood: 0 }); stekelbaars(ctx, x + 20, y - 100, 0.22, { rood: 0.6 }); stekelbaars(ctx, x + 80, y - 100, 0.22, { rood: 1 }); ctx.restore(); }
function bubbel(ctx, x, y, w, h, s, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 24); shape(ctx, '#F2F2EE', null); ctx.beginPath(); ctx.moveTo(x + 40, y + h); ctx.lineTo(x + 30, y + h + 30); ctx.lineTo(x + 80, y + h); ctx.closePath(); ctx.fillStyle = '#F2F2EE'; ctx.fill(); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; wrap(ctx, s, x + 24, y + 46, w - 48, px + 8); ctx.restore(); }
function denkwolk(ctx, x, y, w, h, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.95), null); circ(ctx, x + 20, y + h + 14, 12, rgba('#F2F2EE', 0.95)); circ(ctx, x - 6, y + h + 40, 7, rgba('#F2F2EE', 0.95)); ctx.font = fTekst(30, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; ctx.fillText(s, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { aquarium(ctx, 1150, 420, 600, 360); stekelbaars(ctx, 1450 + Math.sin(t * 0.7) * 60, 600, 1.2, { rood: 1, dreig: 0.5 + 0.5 * Math.sin(t * 1.3), t, flip: Math.cos(t * 0.35) > 0 ? 1 : -1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { ctx.fillStyle = '#2A3346'; ctx.fillRect(0, 0, W, H);
    // raam met straat
    roundRect(ctx, 140, 100, 1640, 420, 8); shape(ctx, '#5E86B8', '#C9C9C9', 10); ctx.fillStyle = '#4A5A6A'; ctx.fillRect(150, 400, 1620, 110); ctx.strokeStyle = '#C9C9C9'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(960, 100); ctx.lineTo(960, 520); ctx.stroke();
    const pa = q.at('postauto'), px = -400 + (t - pa + 1.2) * 520; if (t > pa - 1.5 && px < 2300) { ctx.save(); ctx.beginPath(); ctx.rect(150, 110, 1620, 400); ctx.clip(); postauto(ctx, px, 470, 1.1); ctx.restore(); }
    roundRect(ctx, 100, 520, 1720, 40, 6); shape(ctx, '#D8D2C2', '#A8A292', 2);
    aquarium(ctx, 560, 560, 800, 300); nest(ctx, 760, 820, 1);
    const sch = q.on('schiet', 1, 0.8), fx = lerp(1000, 1180, sch), fy = lerp(740, 640, sch);
    stekelbaars(ctx, fx, fy, 1.3, { rood: q.on('felrode', 1), dreig: q.on('stekels', 1), t, flip: 1 });
    regel(ctx, 'voorjaar', 1760, 70, q.on('voorjaar', 1), C.groen, 28, 'right', 700);
    tag(ctx, 'dreighouding', 1180, 600, C.koraal, q.on('dreighouding', 1) * (1 - q.on('Waarom', 1))); vraagteken(ctx, 1500, 700, q.on('Waarom', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const nep = q.on('echt', 1), echt = q.on('echt', 1), kl = q.on('klodders', 1);
    regel(ctx, 'Niko Tinbergen', 140, 140, q.on('Tinbergen', 1), C.text, 40, 'left', 700); regel(ctx, 'Nederlandse bioloog · Nobelprijs 1973', 140, 186, q.on('Tinbergen', 1), C.text2, 26, 'left', 600);
    // waar reageert hij op?
    ctx.save(); ctx.globalAlpha *= 1 - nep; stekelbaars(ctx, 960, 470, 2.2, { rood: 1, dreig: 0.6, t });
    tag(ctx, 'vorm?', 760, 330, C.teal, q.on('vorm', 1)); tag(ctx, 'vinnen?', 1000, 300, C.teal, q.on('vinnen', 1)); tag(ctx, 'kleur?', 1100, 660, C.teal, q.on('kleur', 1)); ctx.restore();
    // modellen
    ctx.save(); ctx.globalAlpha *= nep; model(ctx, 420, 520, 1.1, 'echt', echt); regel(ctx, 'echt, zonder rood', 420, 660, echt, C.text, 28, 'center', 700);
      model(ctx, 960, 520, 1, 'sigaar', kl); model(ctx, 1300, 520, 1, 'schijf', kl); model(ctx, 1620, 520, 1, 'klodder', kl); regel(ctx, 'ruwe klodders met een rode onderkant', 1300, 660, kl, C.text, 28, 'center', 700); ctx.restore();
    vraagteken(ctx, 960, 820, q.on('vaakst', 1), 90); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const sl = q.on('sleutelprikkel', 1), pr = q.on('prikkel', 2);
    // staafjes: aantal aanvallen
    const tel = q.on('aangevallen', 1, 2.0), tel2 = q.on('bijna', 1, 1.0);
    ctx.save(); ctx.globalAlpha *= 1 - pr;
    model(ctx, 360, 360, 0.75, 'echt'); model(ctx, 720, 360, 0.75, 'sigaar'); model(ctx, 1020, 360, 0.75, 'schijf'); model(ctx, 1320, 360, 0.75, 'klodder');
    const hs = [40 * tel2, 260 * tel, 230 * tel, 280 * tel]; [360, 720, 1020, 1320].forEach((x, i) => { roundRect(ctx, x - 50, 760 - hs[i], 100, hs[i], 8); shape(ctx, i ? rgba(ROOD, 0.6) : rgba(ZILVER, 0.5), i ? ROOD : ZILVER, 2); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(240, 760); ctx.lineTo(1440, 760); ctx.stroke(); metaText(ctx, 'aantal aanvallen', 240, 800, C.text2, 'left', 22);
    tag(ctx, 'reageert niet op het hele plaatje', 840, 140, C.text2, q.on('plaatje', 1) * (1 - q.on('genoeg', 1)));
    tag(ctx, 'één kenmerk is genoeg: rood aan de onderkant', 840, 140, ROOD, q.on('genoeg', 1) * (1 - sl));
    // sleutel en slot
    if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; const kx = lerp(1500, 1640, q.on('slot', 1, 1)); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; circ(ctx, kx - 70, 300, 26, null, C.goud, 8); ctx.beginPath(); ctx.moveTo(kx - 44, 300); ctx.lineTo(kx + 40, 300); ctx.moveTo(kx + 20, 300); ctx.lineTo(kx + 20, 320); ctx.moveTo(kx + 36, 300); ctx.lineTo(kx + 36, 316); ctx.stroke(); roundRect(ctx, 1690, 250, 80, 110, 12); shape(ctx, rgba(C.fill, 0.8), C.line, 2); circ(ctx, 1730, 290, 10, '#121A26'); ctx.restore(); regel(ctx, 'sleutelprikkel', 1600, 420, sl, C.goud, 36, 'center', 700); }
    postauto(ctx, 1600, 640, 0.6, q.on('postauto', 1));
    ctx.restore();
    // prikkel → reactie
    if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; roundRect(ctx, 320, 380, 440, 160, 18); shape(ctx, rgba(C.teal, 0.12), C.teal, 2); text(ctx, 'prikkel', 540, 450, fTekst(40, 700), C.teal, 'center'); text(ctx, 'wat neemt het dier waar?', 540, 500, fTekst(26, 500), C.text2, 'center'); pijl(ctx, 790, 460, 1110, 460, C.goud, 1, 6, 22); roundRect(ctx, 1140, 380, 440, 160, 18); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); text(ctx, 'reactie', 1360, 450, fTekst(40, 700), C.koraal, 'center'); text(ctx, 'wat doet het dan?', 1360, 500, fTekst(26, 500), C.text2, 'center'); ctx.restore(); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const geb = q.on('aangeboren', 1), ler = q.on('Aangeleerd', 1), th = q.on('William', 1);
    ctx.save(); ctx.globalAlpha *= 1 - th;
    // apart opgegroeid
    ctx.save(); ctx.globalAlpha *= 1 - 0.5 * ler; aquarium(ctx, 180, 300, 560, 380); model(ctx, 360, 470, 0.7, 'klodder'); stekelbaars(ctx, 590, 520, 0.8, { rood: 1, dreig: q.on('fel', 1), flip: -1, t }); regel(ctx, 'alleen opgegroeid', 460, 270, q.on('alleen', 1), C.text2, 28, 'center', 700); ctx.restore();
    card(ctx, 860, 240, 900, 200, 'aangeboren gedrag', 'hoeft een dier niet te leren; bij alle soortgenoten hetzelfde', geb, C.goud);
    card(ctx, 860, 480, 900, 200, 'aangeleerd gedrag', 'ontstaat door ervaring', ler, C.teal);
    regel(ctx, 'hond: riem = wandelen', 900, 740, q.on('hond', 1), C.text, 28, 'left', 600); regel(ctx, 'jij: fietsen', 1300, 740, q.on('fietsen', 1), C.text, 28, 'left', 600);
    tag(ctx, 'vaak allebei', 1310, 840, C.goud, q.on('allebei', 1));
    ctx.restore();
    // Thorpe: vink in geluiddichte kooi
    if (th > 0.01) { ctx.save(); ctx.globalAlpha *= th; regel(ctx, 'William Thorpe · jaren vijftig', 140, 140, 1, C.text2, 28, 'left', 600);
      roundRect(ctx, 620, 280, 680, 460, 20); shape(ctx, rgba('#3A4458', 0.9), '#9AA3B2', 6); for (let i = 0; i < 9; i++) { ctx.strokeStyle = rgba('#9AA3B2', 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(660 + i * 75, 290); ctx.lineTo(660 + i * 75, 730); ctx.stroke(); }
      ctx.strokeStyle = '#6B5848'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(700, 620); ctx.lineTo(1220, 620); ctx.stroke(); vink(ctx, 960, 560, 1.4, 1);
      regel(ctx, 'geluiddicht', 960, 800, q.on('geluiddichte', 1), C.text, 30, 'center', 700); kruis(ctx, 1420, 420, 30, q.on('nooit', 1)); regel(ctx, 'geen voorbeeld', 1480, 430, q.on('nooit', 1), C.koraal, 28, 'left', 700); vraagteken(ctx, 1500, 650, q.on('zingt', 1), 100); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const kaal = q.on('kaal', 1), hoort = q.on('volwassen', 1), sp = q.on('sensitieve', 1);
    vink(ctx, 300, 330, 1, 1, Math.abs(Math.sin(t * 9)) * q.on('zingt', 1) * (1 - kaal * 0.5));
    regel(ctx, 'zonder voorbeeld', 460, 260, 1, C.text2, 28, 'left', 700); sonogram(ctx, 460, 290, 1200, 180, { roffel: 0, prog: clamp((t - q.at('zingt')) / 2.5, 0, 1) });
    regel(ctx, 'slotroffel ontbreekt', 1500, 520, kaal * (1 - hoort), C.koraal, 28, 'right', 700);
    vink(ctx, 300, 650, 1, hoort, Math.abs(Math.sin(t * 9)) * hoort);
    regel(ctx, 'met volwassen vinken in het eerste levensjaar', 460, 580, hoort, C.text2, 28, 'left', 700); sonogram(ctx, 460, 610, 1200, 180, { a: hoort, roffel: 1, prog: clamp((t - q.at('volwassen')) / 2.5, 0, 1), hl: 0.5 + 0.5 * Math.sin(t * 3) });
    regel(ctx, 'slotroffel', 1560, 640, hoort, C.goud, 26, 'left', 700);
    tag(ctx, 'aangeboren en aangeleerd werken samen', 960, 130, C.goud, q.on('samen', 1) * (1 - sp));
    tag(ctx, 'later: de sensitieve periode', 960, 130, C.teal, sp); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const lit = [q.on('oorzaak', 1), q.on('ontwikkeling', 1), q.on('functie', 1), q.on('evolutie', 1)], sam = q.on('Sam', 1);
    const cur = lit[3] > 0.5 ? 3 : lit[2] > 0.5 ? 2 : lit[1] > 0.5 ? 1 : lit[0] > 0.5 ? 0 : -1;
    stekelbaars(ctx, 960, 175, 0.9, { rood: 1, dreig: 0.6, t, a: 1 - sam * 0.4 }); regel(ctx, 'waarom valt hij aan?', 960, 100, 1 - lit[0], C.text, 34, 'center', 700);
    const X = 160, Y = 270, BW = lerp(1600, 1340, sam), BH = 600;
    vierBord(ctx, X, Y, BW, BH, lit, { hl: sam > 0.5 ? -1 : cur, dim: 0.6 * (1 - sam), inhoud: [
      (x, y) => { regel(ctx, 'prikkel: rode kleur', x + 24, y + 150, q.on('kleur', 1), C.text, 28, 'left', 600); regel(ctx, 'hormoon: testosteron (voorjaar)', x + 24, y + 196, q.on('testosteron', 1), C.text, 28, 'left', 600); },
      (x, y) => { regel(ctx, 'aangeboren, wat bijgesteld door ervaring', x + 24, y + 150, q.on('aangeboren', 1), C.text, 28, 'left', 600); },
      (x, y) => { regel(ctx, 'territorium en nest houden', x + 24, y + 150, q.on('territorium', 1), C.text, 28, 'left', 600); regel(ctx, '→ meer jongen', x + 24, y + 196, q.on('jongen', 1), C.text, 28, 'left', 600); },
      (x, y, w) => { regel(ctx, 'vergelijk verwante soorten', x + 24, y + 150, q.on('vergelijk', 1), C.text, 28, 'left', 600); stamboompje(ctx, x + w - 170, y + 270, q.on('voorouders', 1)); } ] });
    if (sam > 0.01) { persoon(ctx, 'sam', 1700, 880, 300, { uit: 'praat', pose: 'staan', kijk: -1, t, a: sam }); bubbel(ctx, 1090, 140, 600, 110, '“Hij valt aan om zijn nest te beschermen.”', sam, 28); vraagteken(ctx, 1520, 120, q.on('welke', 1) * 0, 80); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const lit = [1, 1, 1, 1];
    vierBord(ctx, 160, 270, 1600, 600, lit, { hl: 2, dim: 1, inhoud: [null, null, (x, y) => { regel(ctx, 'wat levert het op? → Sam', x + 24, y + 150, 1, C.text, 28, 'left', 600); }, null] });
    tag(ctx, 'antwoord b: de functie', 960, 120, C.goud, q.on('functie', 1) * (1 - q.on('weet', 1)));
    if (q.on('weet', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('weet', 1); ctx.fillStyle = rgba(C.bgSchema, 0.85); ctx.fillRect(0, 0, W, CAPTION_Y); stekelbaars(ctx, 760, 560, 1.6, { rood: 1, dreig: 0.8, t });
      denkwolk(ctx, 820, 200, 520, 150, 'ik bescherm mijn nest', 1); kruis(ctx, 1080, 275, 60, q.on('niet:', 1));
      tag(ctx, 'ziet rood → valt aan', 760, 820, ROOD, q.on('ziet', 1));
      regel(ctx, 'functie: waarom het gedrag bij de soort bleef', 1140, 540, q.on('gebleven', 1), C.goud, 30, 'left', 700); regel(ctx, 'niet: wat het dier denkt', 1140, 590, q.on('moment', 1), C.text2, 28, 'left', 600); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const nb = q.on('nabije', 1), ui = q.on('uiteindelijke', 1), nob = q.on('Nobelprijs', 1);
    ctx.save(); ctx.globalAlpha *= 1 - nob;
    const col = (x, title, sub, items, a, c) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 220, 760, 560, 20); shape(ctx, rgba(c, 0.1), c, 2); text(ctx, title, x + 380, 300, fTekst(40, 700), c, 'center'); text(ctx, sub, x + 380, 350, fTekst(28, 500), C.text2, 'center'); items.forEach((it, i) => { roundRect(ctx, x + 80, 420 + i * 150, 600, 110, 14); shape(ctx, rgba(it[1], 0.14), it[1], 1.5); text(ctx, it[0], x + 380, 488 + i * 150, fTekst(34, 700), it[1], 'center'); }); ctx.restore(); };
    col(160, 'nabije oorzaken', 'dit ene dier, in zijn leven', [['oorzaak', C.teal], ['ontwikkeling', C.groen]], Math.max(q.on('Oorzaak', 1) * 0.6, nb), C.teal);
    col(1000, 'uiteindelijke oorzaken', 'de soort, vele generaties', [['functie', C.goud], ['evolutie', C.paars]], Math.max(q.on('Functie', 1) * 0.6, ui), C.paars);
    tag(ctx, 'vier antwoorden, geen tegenspraak', 960, 140, C.goud, q.on('tegen', 1));
    ctx.restore();
    if (nob > 0.01) { ctx.save(); ctx.globalAlpha *= nob; text(ctx, 'Nobelprijs 1973', 960, 260, fTitel(72), C.goud, 'center'); ['Niko Tinbergen', 'Konrad Lorenz', 'Karl von Frisch'].forEach((n, i) => { const a = i === 0 ? 1 : q.on(i === 1 ? 'Lorenz' : 'Frisch', 1); roundRect(ctx, 260 + i * 480, 360, 440, 240, 18); shape(ctx, rgba(C.fill, 0.6 * a), rgba(C.goud, a), 2); text(ctx, n, 480 + i * 480, 460, fTekst(36, 700), rgba('#F2F2EE', a), 'center'); text(ctx, ['stekelbaars', 'inprenting', 'bijendans'][i], 480 + i * 480, 520, fTekst(28, 500), rgba('#9AA3B2', a), 'center'); }); regel(ctx, 'later in deze reeks', 1440, 680, q.on('later', 1), C.text2, 28, 'center', 600); ctx.restore(); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); const gaap = q.on('gaap', 1);
    persoon(ctx, 'sam', 360, 860, 560, { uit: gaap > 0.5 && (t - q.at('gaap')) < 3 ? 'verbaasd' : 'neutraal', pose: 'staan', kijk: 1, t });
    const lit = [q.on('Oorzaak', 1), q.on('Ontwikkeling', 1), q.on('Functie', 1), q.on('evolutie', 1)];
    vierBord(ctx, 700, 200, 1080, 640, lit, { inhoud: [
      (x, y) => { regel(ctx, 'moe, of iemand ziet gapen', x + 24, y + 150, q.on('moe', 1), C.text, 26, 'left', 600); },
      (x, y) => { regel(ctx, 'al in de buik', x + 24, y + 140, q.on('buik', 1), C.text, 26, 'left', 600); regel(ctx, 'meegapen: pas als kleuter', x + 24, y + 180, q.on('kleuter', 1), C.text, 26, 'left', 600); },
      (x, y) => { vraagteken(ctx, x + 250, y + 230, q.on('eens', 1), 80); },
      (x, y) => { vraagteken(ctx, x + 250, y + 230, q.on('eens', 1), 80); } ] });
    tag(ctx, 'nog geen overeenstemming', 1240, 150, C.text2, q.on('eens', 1)); },

  // ---------- Recap ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const p1 = q.on('postauto', 1), p2 = q.on('sleutelprikkel', 1), p3 = q.on('mix', 1), p4 = q.on('vier', 1);
    const panel = (x, nm, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 200, 400, 560, 18); shape(ctx, rgba(C.fill, 0.45), rgba(C.line, 0.4), 1.5); regel(ctx, nm, x + 200, 250, 1, C.text, 28, 'center', 700); fn(x); ctx.restore(); };
    panel(80, 'rode postauto', p1, (x) => { postauto(ctx, x + 200, 420, 0.7); stekelbaars(ctx, x + 200, 600, 0.8, { rood: 1, dreig: 1, t }); });
    panel(530, 'sleutelprikkel', p2, (x) => { model(ctx, x + 200, 520, 0.9, 'klodder'); regel(ctx, 'rood aan de onderkant', x + 200, 700, 1, ROOD, 26, 'center', 700); });
    panel(980, 'aangeboren + aangeleerd', p3, (x) => { vink(ctx, x + 200, 420, 1); sonogram(ctx, x + 40, 520, 320, 120, { roffel: 1, hl: 0.5 }); });
    panel(1430, 'vier vragen', p4, (x) => { VIER.forEach(([nm, vr, col], i) => { const a = ramp(t, q.at(['oorzaak', 'ontwikkeling', 'functie', 'evolutie'][i], 1), 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x + 40, 300 + i * 110, 320, 90, 12); shape(ctx, rgba(col, 0.14), col, 1.5); text(ctx, nm, x + 200, 357 + i * 110, fTekst(30, 700), col, 'center'); ctx.restore(); }); });
  }
};

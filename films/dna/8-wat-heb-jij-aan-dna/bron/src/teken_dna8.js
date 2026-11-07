// ===== DNA 8 · Wat heb jij aan DNA? — eigen tekeningen (versie 2.0, beeld-remake prompt v13, 31 okt 2026) =====
// Alles vlak (Part C), geen gloed of verloop, betekeniskleuren uit C. Mensen = castboek (persoon), telpoppetjes alleen in tellingen.
// Gedeelde objecten uit lib_bio.js: dnaLadderHelix, dnaDraad, cdChromosoom, kruisingsSchema, stamboom/sbSymbool, enzymKluwen,
// bacterieEcht, rodeBloedcel. Nieuwe objecten hieronder hebben hun recept als commentaar (C9) en staan op de lijst
// 'Voor de bibliotheek' in bron/opwaardering-v13.md.

const D8 = { muur: '#1E2B45', vloer: '#243452', tafel: '#5A4A3E', tafelR: '#7A6656', papier: '#F2F2EE', papierR: '#C8D0D8', ink: '#2A3446',
  bloed: '#B8433A', feit: C.teal, waarde: C.oker, mais: '#7FA65A', maisD: '#5E8A44', kolf: '#E3C25A', zijde: '#C9A35C' };
const A0 = (a) => a > 0.01;
function d8bg(ctx, look) { ctx.fillStyle = look === 'micro' ? C.bgMicro : C.bgSchema; ctx.fillRect(0, 0, W, H); } // nooit korrel buiten een cel
// binnen (thuis, spreekkamer): muur en vloer, vlak, vloerlijn op ± 80 % (BEELDAFSPRAKEN Decors); alleen onder scènes die daar spelen
function d8kamer(ctx, vloerY = 800) { ctx.fillStyle = D8.muur; ctx.fillRect(0, 0, W, H); ctx.fillStyle = D8.vloer; ctx.fillRect(0, vloerY, W, H - vloerY); ctx.fillStyle = rgba('#8FA0B5', 0.25); ctx.fillRect(0, vloerY, W, 2); }
// buiten bij nacht (Macro): lucht, twee heuvellagen, voorgrond (C3)
function d8buiten(ctx, grondY = 800) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0, grondY - 90);
  for (let x = 0; x <= W; x += 60) ctx.lineTo(x, grondY - 90 - 40 * Math.sin(x / 380 + 1) - 20 * Math.sin(x / 150)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, grondY, W, H - grondY); }
function d8tafel(ctx, x1, x2, y) { ctx.fillStyle = D8.tafel; roundRect(ctx, x1, y, x2 - x1, 16, 4); ctx.fill(); ctx.fillStyle = rgba(D8.tafelR, 0.6); ctx.fillRect(x1 + 4, y, x2 - x1 - 8, 3);
  ctx.fillStyle = _d8donker(D8.tafel); ctx.fillRect(x1 + 30, y + 16, 14, 800 - y - 16); ctx.fillRect(x2 - 44, y + 16, 14, 800 - y - 16); }
function _d8donker(hex, k = 0.25) { const n = parseInt(hex.slice(1), 16); const f = (v) => Math.round(v * (1 - k)); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
function d8a(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- weegschaal (de balans van de film) ----------
// Recept: een echte balans: voet en zuil, een juk dat om het midden kantelt (max ± 12°), aan elk uiteinde drie dunne
// kettingen naar een ondiepe schaal. De schalen blijven horizontaal (ze hangen). Wat er ligt zijn chips op de schaal,
// van onder naar boven gestapeld, nooit zwevend. tilt −1 … 1 (negatief = links zwaarder, linkerschaal lager).
// Kleur: links = feit / wat je wint (teal: informatie), rechts = waarde / wat je weggeeft (oker). Bekende fout: chips naast de schaal.
function d8weegschaal(ctx, cx, voetY, tilt, L = [], R = [], o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const s = o.s || 1, arm = 380 * s, zuil = 330 * s, pY = voetY - zuil, ang = clamp(tilt, -1, 1) * 0.2;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // voet en zuil
  roundRect(ctx, cx - 120 * s, voetY - 18 * s, 240 * s, 22 * s, 8 * s); shape(ctx, '#3A4A66', '#6E7F9C', 1.5);
  roundRect(ctx, cx - 12 * s, pY, 24 * s, zuil - 16 * s, 6 * s); shape(ctx, '#4A5A78', '#7A8BA8', 1.5);
  const ex = Math.cos(ang) * arm, ey = Math.sin(ang) * arm; const lx = cx - ex, ly = pY - ey, rx = cx + ex, ry = pY + ey;
  ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke();
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(lx, ly - 3 * s); ctx.lineTo(rx, ry - 3 * s); ctx.stroke();
  circ(ctx, cx, pY, 16 * s, C.goud); circ(ctx, cx, pY, 6 * s, '#5A4A2A');
  const schaal = (hx, hy, items, kl, lab) => { const hang = 190 * s, py = hy + hang, pw = 170 * s;
    ctx.strokeStyle = rgba('#B8C0D0', 0.8); ctx.lineWidth = 1.5 * s; for (const d of [-pw, 0, pw]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + d * 0.92, py); ctx.stroke(); }
    circ(ctx, hx, hy, 7 * s, '#B8C0D0');
    let yy = py - 4 * s; items.forEach(([t, al]) => { if (!(al > 0.01)) return; ctx.save(); ctx.globalAlpha *= al; const px = Math.max(28, Math.round(34 * s)); ctx.font = fTekst(px, 600); const w = ctx.measureText(t).width + 36, hh = px + 22, drop = (1 - ease(al)) * 40 * s;
      roundRect(ctx, hx - w / 2, yy - hh - drop, w, hh, 10); shape(ctx, rgba(kl, 0.22), kl, 2); text(ctx, t, hx, yy - 14 - drop, fTekst(px, 600), C.text, 'center'); ctx.restore(); yy -= hh + 6 * s; });
    ctx.beginPath(); ctx.moveTo(hx - pw, py); ctx.quadraticCurveTo(hx, py + 46 * s, hx + pw, py); ctx.closePath(); shape(ctx, '#5A6A88', '#9AAAC4', 2);
    if (lab) metaText(ctx, lab, hx, py + 74 * s, kl, 'center', 28); };
  schaal(lx, ly, L, o.klL || D8.feit, o.labL); schaal(rx, ry, R, o.klR || D8.waarde, o.labR);
  ctx.restore(); }

// ---------- telpoppetje (alleen voor tellingen, BEELDAFSPRAKEN-uitzondering) ----------
function d8telpop(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 30 * s, 10 * s, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 15 * s, y); ctx.lineTo(x - 15 * s, y - 8 * s); ctx.quadraticCurveTo(x - 15 * s, y - 18 * s, x - 5 * s, y - 18 * s); ctx.lineTo(x + 5 * s, y - 18 * s); ctx.quadraticCurveTo(x + 15 * s, y - 18 * s, x + 15 * s, y - 8 * s); ctx.lineTo(x + 15 * s, y); ctx.closePath(); ctx.fill(); ctx.restore(); }
// raster van n poppetjes, de eerste k in kleur colK (opbouw p 0..1 = hoeveel van de k al gekleurd zijn)
function d8raster(ctx, x, y, n, per, k, colK, o = {}) { const { s = 1, dx = 44, dy = 58, a = 1, p = 1, rest = '#4A5872', kies = null } = o; if (a <= 0.01) return;
  const nk = Math.round(k * clamp(p, 0, 1)); const gekozen = kies ? kies(n, k) : null;
  for (let i = 0; i < n; i++) { const isK = gekozen ? gekozen.indexOf(i) >= 0 && gekozen.indexOf(i) < nk : i < nk; d8telpop(ctx, x + (i % per) * dx * s, y + Math.floor(i / per) * dy * s, s, isK ? colK : rest, a); } }
// verspreide keuze (zodat '1 op 30' niet in de hoek zit): vaste volgorde, deterministisch
function d8verspreid(n, k) { const idx = []; for (let i = 0; i < n; i++) idx.push(i); idx.sort((p, q) => hash(p * 7.3 + n) - hash(q * 7.3 + n)); return idx; }

// ---------- doosje van internet ----------
// Recept (uit algemene kennis, maten bij benadering): een commerciële DNA-test is een plat kartonnen doosje (± 15 × 10 cm) met een speekselbuisje met trechter
// (± 10 cm), een etiket en een retourenvelop met postzegel. Bekende fout: een bloedbuisje of een wattenstaafje in een laboratoriumrek.
function d8buisje(ctx, x, y, s = 1, o = {}) { const { a = 1, vul = 0.6, dop = 'trechter', rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -16, -60, 32, 120, 14); shape(ctx, rgba('#DCE3EC', 0.18), '#AFC0D0', 2);
  ctx.save(); roundRect(ctx, -16, -60, 32, 120, 14); ctx.clip(); ctx.fillStyle = rgba('#E8E2D0', 0.85); ctx.fillRect(-16, 60 - 120 * vul, 32, 120 * vul); ctx.fillStyle = rgba('#FFFFFF', 0.5); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-6 + i * 4, 60 - 120 * vul + 6 + (i % 2) * 4, 2.2, 0, 6.283); ctx.fill(); } ctx.restore();
  if (dop === 'trechter') { ctx.beginPath(); ctx.moveTo(-34, -112); ctx.lineTo(34, -112); ctx.lineTo(16, -62); ctx.lineTo(-16, -62); ctx.closePath(); shape(ctx, rgba('#5BA4C9', 0.35), '#5BA4C9', 2); }
  else { roundRect(ctx, -20, -80, 40, 24, 6); shape(ctx, '#5BA4C9', lighten('#5BA4C9', 0.3), 1.5); }
  roundRect(ctx, -12, -10, 24, 40, 3); shape(ctx, '#F2F2EE', null); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#2A3446'; ctx.fillRect(-8, -4 + i * 8, i % 2 ? 10 : 16, 2); }
  ctx.restore(); }
function d8doosje(ctx, x, y, s = 1, o = {}) { const { a = 1, open = 1, zegel = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // achterwand + deksel open
  const dk = ease(open); ctx.save(); ctx.translate(0, -70); ctx.scale(1, lerp(1, -0.35, dk)); roundRect(ctx, -130, -10, 260, 70 * (1 - dk) + 10, 8); shape(ctx, '#D8DEE6', '#AFC0D0', 2); ctx.restore();
  roundRect(ctx, -130, -70, 260, 140, 10); shape(ctx, '#E8ECF2', '#AFC0D0', 2);
  ctx.fillStyle = C.teal; ctx.fillRect(-130, -20, 260, 18); text(ctx, 'DNA-test', -110, 40, fTekst(30, 700), D8.ink, 'left');
  // dubbele helix-pictogram (grijs, palet B)
  ctx.strokeStyle = '#7D899E'; ctx.lineWidth = 4; for (const f of [0, Math.PI]) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const xx = 50 + i * 3.4, yy = 24 + 14 * Math.sin(i / 20 * 6.283 + f); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  if (zegel > 0.01) { ctx.save(); ctx.globalAlpha *= zegel; ctx.translate(92, -48); ctx.rotate(0.06 + (1 - ease(zegel)) * 0.4); roundRect(ctx, -24, -20, 48, 40, 3); shape(ctx, '#E07A5F', '#F2F2EE', 3); circ(ctx, 0, 0, 9, '#F2CF7A'); ctx.restore(); }
  ctx.restore(); }

// ---------- telefoon met rapport ----------
// rows: [titel, waarde, kleur]; p = opbouw 0..1 van de rijen; hl = index van de rij die oplicht
function d8telefoon(ctx, x, y, s = 1, rows = [], o = {}) { const { a = 1, p = 1, hl = -1, kop = 'jouw DNA-rapport', w = 400, h = 640 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -w / 2, -h / 2, w, h, 44); shape(ctx, '#20283A', '#6E7F9C', 3); roundRect(ctx, -w / 2 + 16, -h / 2 + 20, w - 32, h - 40, 30); shape(ctx, '#EEF1F5', null);
  roundRect(ctx, -40, -h / 2 + 30, 80, 14, 7); shape(ctx, '#20283A', null);
  text(ctx, kop, -w / 2 + 40, -h / 2 + 100, fTekst(30, 700), D8.ink, 'left');
  rows.forEach(([t, v, kl], i) => { const ra = clamp(p * rows.length - i, 0, 1); if (ra <= 0.01) return; const ry = -h / 2 + 140 + i * 130; ctx.save(); ctx.globalAlpha *= ra;
    roundRect(ctx, -w / 2 + 32, ry, w - 64, 112, 16); shape(ctx, i === hl ? rgba(kl || C.goud, 0.22) : '#FFFFFF', i === hl ? (kl || C.goud) : '#D4DAE2', i === hl ? 3 : 1.5);
    text(ctx, t, -w / 2 + 56, ry + 44, fTekst(28, 700), D8.ink, 'left'); text(ctx, v, -w / 2 + 56, ry + 86, fTekst(26, 400), '#4A5872', 'left'); ctx.restore(); });
  ctx.restore(); }
// kleine telefoon (in een hand, of met een trillend belletje)
function d8telKlein(ctx, x, y, s = 1, o = {}) { const { a = 1, bel = 0, ang = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -22, -40, 44, 80, 9); shape(ctx, '#20283A', '#8FA0B5', 2); roundRect(ctx, -17, -33, 34, 64, 5); shape(ctx, '#5BA4C9', null);
  if (bel > 0.01) { ctx.strokeStyle = rgba(C.goud, bel); ctx.lineWidth = 3; for (const r of [52, 68]) { ctx.beginPath(); ctx.arc(0, 0, r, -0.6, 0.6); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); } }
  ctx.restore(); }

// ---------- SNP's ----------
// Recept (C9 Moleculen; chip-aantal uit bronnen.md B17): een SNP is één basenpaar dat tussen mensen verschilt; in een stuk van ± 1000 basenparen
// verschillen twee mensen gemiddeld op ± 1 plek. Een SNP-chip leest een paar honderdduizend vaste plekken
// (± 600 000–700 000) van de ± 3 miljard basenparen. Twee ladders (palet B) boven elkaar, één paar verschilt (goud kader).
function d8snpLadders(ctx, x0, y, seqA, seqB, k, o = {}) { const { a = 1, dx = 64, hlA = 1, labA = 'jij', labB = 'iemand anders' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  dnaLadderHelix(ctx, x0, y, dx, seqA, { R: 70, s: 0.5, draai: 0 }); dnaLadderHelix(ctx, x0, y + 250, dx, seqB, { R: 70, s: 0.5, draai: 0 });
  metaText(ctx, labA, x0 - 40, y + 10, C.text2, 'right', 28); metaText(ctx, labB, x0 - 40, y + 260, C.text2, 'right', 28);
  if (hlA > 0.01) { ctx.globalAlpha = a * hlA; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (const yy of [y, y + 250]) { roundRect(ctx, x0 + k * dx - dx * 0.48, yy - 92, dx * 0.96, 184, 12); ctx.stroke(); } }
  ctx.restore(); }
// een stuk genoom als grijze draad met gouden SNP-stipjes (n = aantal stippen in beeld; elk stipje = veel echte plekken)
function d8snpDraad(ctx, x1, x2, y, n, o = {}) { const { a = 1, w = 12, seed = 3, r = 6, kl = C.goud, ruis = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = []; for (let i = 0; i <= 24; i++) { const u = i / 24; P.push([lerp(x1, x2, u), y + Math.sin(u * 9 + seed) * ruis]); } dnaDraad(ctx, P, { w });
  for (let k = 0; k < n; k++) { const u = hash(k * 3.1 + seed * 11), xx = lerp(x1 + 10, x2 - 10, u); circ(ctx, xx, y + Math.sin(u * 9 + seed) * ruis, r, kl); }
  ctx.restore(); }

// ---------- kleine voorwerpen (Schema-iconen, lijntekening #AFC0D0 met vlak in betekeniskleur) ----------
function d8melk(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-34, -60); ctx.lineTo(34, -60); ctx.lineTo(26, 60); ctx.lineTo(-26, 60); ctx.closePath(); shape(ctx, rgba('#DCE3EC', 0.12), '#AFC0D0', 2.5);
  ctx.beginPath(); ctx.moveTo(-31, -36); ctx.lineTo(31, -36); ctx.lineTo(25.5, 56); ctx.lineTo(-25.5, 56); ctx.closePath(); shape(ctx, '#F2F2EE', null); }); }
function d8koriander(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const tak = (ang, L) => { ctx.save(); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -L); ctx.stroke(); for (const [dx, dy, r] of [[0, -L - 18, 20], [-20, -L + 6, 16], [20, -L + 6, 16]]) { ctx.beginPath(); for (let i = 0; i < 3; i++) { const an = -1.2 + i * 1.2 + Math.atan2(dy + L, dx); ctx.moveTo(dx, dy); ctx.arc(dx + Math.cos(an) * r * 0.5, dy + Math.sin(an) * r * 0.5, r * 0.55, 0, 6.283); } ctx.fillStyle = '#7FC48F'; ctx.fill(); } ctx.restore(); };
  ctx.beginPath(); ctx.moveTo(0, 70); ctx.lineTo(0, 0); ctx.stroke(); tak(-0.5, 46); tak(0.45, 52); tak(0, 62); }); }
function d8appel(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -26); ctx.bezierCurveTo(30, -44, 50, -10, 40, 18); ctx.bezierCurveTo(32, 42, 10, 46, 0, 38); ctx.bezierCurveTo(-10, 46, -32, 42, -40, 18); ctx.bezierCurveTo(-50, -10, -30, -44, 0, -26); shape(ctx, '#7FC48F', '#A8D8B4', 2);
  ctx.strokeStyle = '#8C5A3A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(4, -44); ctx.stroke(); ctx.beginPath(); ctx.ellipse(16, -42, 12, 6, -0.4, 0, 6.283); ctx.fillStyle = '#5FA86E'; ctx.fill(); }); }
function d8schoen(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 10); ctx.lineTo(-58, -26); ctx.quadraticCurveTo(-40, -34, -24, -24); ctx.quadraticCurveTo(10, -6, 50, -2); ctx.quadraticCurveTo(66, 2, 64, 14); ctx.lineTo(-60, 14); ctx.closePath(); shape(ctx, '#5BA4C9', '#8CC3E0', 2);
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-62, 10, 128, 8); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 12, -22 + i * 4); ctx.lineTo(-20 + i * 12, -12 + i * 4); ctx.stroke(); } }); }
// plek-pictogram in een afgerond vak (C4 Mens-en-maatschappij): 'bedrijf', 'lab', 'politie', 'huisarts', 'zaad'
function d8plek(ctx, soort, x, y, s = 1, o = {}) { const { a = 1, kl = '#AFC0D0' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -70, 140, 140, 20); shape(ctx, rgba(C.fill, 0.9), kl, 2); ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
  if (soort === 'bedrijf') { ctx.strokeRect(-36, -30, 72, 70); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) ctx.fillRect(-26 + j * 20, -20 + i * 18, 10, 10); ctx.beginPath(); ctx.moveTo(-44, -30); ctx.lineTo(0, -52); ctx.lineTo(44, -30); ctx.stroke(); }
  else if (soort === 'databank') { for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(0, -30 + k * 26, 38, 10, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-38, -30 + k * 26); ctx.lineTo(-38, -10 + k * 26); ctx.moveTo(38, -30 + k * 26); ctx.lineTo(38, -10 + k * 26); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, 46, 38, 10, 0, 0, Math.PI); ctx.stroke(); }
  else if (soort === 'politie') { ctx.beginPath(); ctx.moveTo(0, -48); ctx.lineTo(38, -34); ctx.lineTo(34, 10); ctx.quadraticCurveTo(26, 38, 0, 50); ctx.quadraticCurveTo(-26, 38, -34, 10); ctx.lineTo(-38, -34); ctx.closePath(); ctx.stroke(); ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566, an2 = an + 0.628; ctx.lineTo(Math.cos(an) * 18, -2 + Math.sin(an) * 18); ctx.lineTo(Math.cos(an2) * 8, -2 + Math.sin(an2) * 8); } ctx.closePath(); ctx.fill(); }
  else if (soort === 'onderzoek') { ctx.beginPath(); ctx.moveTo(-14, -48); ctx.lineTo(-14, -12); ctx.lineTo(-38, 40); ctx.quadraticCurveTo(-40, 48, -30, 48); ctx.lineTo(30, 48); ctx.quadraticCurveTo(40, 48, 38, 40); ctx.lineTo(14, -12); ctx.lineTo(14, -48); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-26, 18); ctx.lineTo(26, 18); ctx.lineTo(34, 40); ctx.lineTo(-34, 40); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fill(); }
  else if (soort === 'zaad') { ctx.beginPath(); ctx.moveTo(-34, -34); ctx.lineTo(34, -34); ctx.lineTo(40, 46); ctx.lineTo(-40, 46); ctx.closePath(); shape(ctx, rgba(C.oker, 0.35), kl, 3); ctx.beginPath(); ctx.moveTo(-34, -34); ctx.lineTo(-24, -48); ctx.lineTo(24, -48); ctx.lineTo(34, -34); ctx.stroke(); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(-20 + i * 10, 8 + (i % 2) * 12, 6, 8, 0.3, 0, 6.283); ctx.fillStyle = D8.kolf; ctx.fill(); } }
  else if (soort === 'kliniek') { ctx.strokeRect(-40, -30, 80, 72); ctx.fillRect(-8, -22, 16, 40); ctx.fillRect(-20, -10, 40, 16); ctx.beginPath(); ctx.moveTo(-48, -30); ctx.lineTo(48, -30); ctx.stroke(); }
  ctx.restore(); }

// ---------- hielprik ----------
// Recept (tijdstip uit de pns.nl-monitor hielprik 2023, zie bronnen.md B1; de rest uit algemene kennis, niet met een geopende bron gecontroleerd): 72–168 uur na de geboorte prikt de screener (JGZ of verloskundige) in de zijkant van
// de hiel; vier tot zes druppels bloed vullen de cirkels op een hielprikkaart (filtreerpapier, ± 6 × 4 cm) die naar het
// lab gaat. Babyvoet ± 7,5 cm. Bekende fout: prik midden onder de hiel; naald in de voetzool; bloedbuisje.
function d8voetje(ctx, x, y, s = 1, o = {}) { const { a = 1, huid = '#EBC3A6', prik = 0, druppel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // babyvoet van opzij (binnenkant): onderbeen van boven, hiel linksonder, zool naar rechts, tenen rechts iets omhoog
  const hS = _d8donker(huid, 0.12);
  ctx.beginPath(); ctx.moveTo(-70, -230); ctx.lineTo(-62, -60); ctx.quadraticCurveTo(-92, -20, -78, 14); ctx.quadraticCurveTo(-60, 40, -10, 38); ctx.lineTo(110, 36); ctx.quadraticCurveTo(160, 34, 176, 12);
  ctx.quadraticCurveTo(184, -8, 164, -18); ctx.quadraticCurveTo(110, -30, 60, -52); ctx.quadraticCurveTo(26, -70, 14, -110); ctx.lineTo(6, -230); ctx.closePath(); shape(ctx, huid, null);
  // tenen (van opzij: grote teen vooraan, de andere als bolletjes erachter)
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(150 - i * 13, -14 - i * 5, 13 - i * 1.5, 11 - i, -0.3, 0, 6.283); ctx.fillStyle = i ? hS : huid; ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(166, 2, 18, 15, -0.2, 0, 6.283); ctx.fillStyle = huid; ctx.fill();
  ctx.strokeStyle = hS; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-58, -64); ctx.quadraticCurveTo(-40, -50, -30, -58); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 34); ctx.quadraticCurveTo(40, 26, 80, 32); ctx.stroke();
  if (prik > 0.01) { ctx.strokeStyle = rgba(C.goud, prik); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-76, 6, 20, 0, 6.283); ctx.stroke(); }
  if (druppel > 0.01) { const d = ease(druppel); ctx.beginPath(); ctx.moveTo(-82, 16); ctx.quadraticCurveTo(-98, 16 + 34 * d, -84, 22 + 38 * d); ctx.quadraticCurveTo(-68, 16 + 34 * d, -82, 16); ctx.fillStyle = D8.bloed; ctx.fill(); }
  ctx.restore(); }
function d8hielkaart(ctx, x, y, s = 1, o = {}) { const { a = 1, vul = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -90, 340, 180, 10); shape(ctx, D8.papier, D8.papierR, 2); ctx.fillStyle = '#C9A35C'; ctx.fillRect(-170, -90, 340, 26);
  for (let i = 0; i < 5; i++) { const cx = -120 + i * 60; ctx.beginPath(); ctx.arc(cx, 20, 24, 0, 6.283); ctx.strokeStyle = '#B8C2CC'; ctx.lineWidth = 2.5; ctx.stroke(); const f = clamp(vul * 5 - i, 0, 1); if (f > 0.01) circ(ctx, cx, 20, 21 * Math.sqrt(f), rgba(D8.bloed, 0.85)); }
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#B8C2CC'; ctx.fillRect(-150, 58 + i * 9, 120 - i * 30, 4); }
  ctx.restore(); }

// ---------- kansmeter ----------
// halve cirkel van 0 tot 100 %, wijzer + gekleurde boog tot de waarde; geen 0 of 100 bij 'een kans'
function d8kansmeter(ctx, x, y, r, frac, o = {}) { const { a = 1, kl = C.goud, lab = '', sub = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = '#3A4A66'; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = kl; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, Math.PI + Math.PI * clamp(frac, 0, 1)); ctx.stroke();
  const an = Math.PI + Math.PI * clamp(frac, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); ctx.stroke(); circ(ctx, x, y, 10, C.text);
  metaText(ctx, '0', x - r, y + 40, C.text2, 'center', 28); metaText(ctx, '100 %', x + r, y + 40, C.text2, 'center', 28);
  if (lab) text(ctx, lab, x, y - r - 40, fTekst(40, 700), kl, 'center'); if (sub) metaText(ctx, sub, x, y + 80, C.text2, 'center', 28);
  ctx.restore(); }

// ---------- envelop (uitslag) ----------
function d8envelop(ctx, x, y, s = 1, o = {}) { const { a = 1, open = 0, slot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (open > 0.01) { const k = ease(open); roundRect(ctx, -70, -60 - 70 * k, 140, 100, 6); shape(ctx, '#FFFFFF', '#C8D0D8', 1.5); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-52, -40 - 70 * k + i * 16, 104 - (i % 2) * 30, 5); } }
  roundRect(ctx, -90, -55, 180, 115, 8); shape(ctx, '#E8ECF2', '#AFC0D0', 2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, 60); ctx.lineTo(0, 0); ctx.lineTo(90, 60); ctx.stroke();
  ctx.save(); ctx.translate(0, -55); ctx.scale(1, open > 0.01 ? -1 : 1); ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(0, 62); ctx.lineTo(90, 0); ctx.closePath(); shape(ctx, '#D8DEE6', '#AFC0D0', 2); ctx.restore();
  if (slot > 0.01) { ctx.globalAlpha *= slot; circ(ctx, 0, 4, 16, C.goud); ctx.fillStyle = '#5A4A2A'; ctx.fillRect(-4, 0, 8, 12); }
  ctx.restore(); }

// ---------- kalender (vaker controleren) en polis (verzekering) ----------
function d8kalender(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 4 } = o; d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -80, -70, 160, 150, 12); shape(ctx, '#E8ECF2', '#AFC0D0', 2); ctx.fillStyle = C.koraal; roundRect(ctx, -80, -70, 160, 34, 12); ctx.fill(); ctx.fillRect(-80, -50, 160, 14);
  for (let i = 0; i < 12; i++) { const cx = -54 + (i % 4) * 36, cy = -14 + Math.floor(i / 4) * 30; roundRect(ctx, cx - 12, cy - 10, 24, 20, 4); shape(ctx, '#D4DAE2', null); if ([1, 4, 7, 10].slice(0, n).includes(i)) { ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 8, cy); ctx.lineTo(cx - 2, cy + 6); ctx.lineTo(cx + 9, cy - 7); ctx.stroke(); } } }); }
function d8polis(ctx, x, y, s = 1, o = {}) { const { a = 1, slot = 1, kop = 'levensverzekering' } = o; d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -150, -190, 300, 380, 10); shape(ctx, D8.papier, D8.papierR, 2);
  text(ctx, kop, -120, -140, fTekst(26, 700), D8.ink, 'left'); for (let i = 0; i < 5; i++) { ctx.fillStyle = '#B8C2CC'; ctx.fillRect(-120, -110 + i * 26, 240 - (i % 3) * 50, 6); }
  roundRect(ctx, -120, 30, 240, 90, 8); shape(ctx, '#FFFFFF', C.koraal, 2.5); text(ctx, 'erfelijkheids-', -100, 66, fTekst(24, 600), D8.ink, 'left'); text(ctx, 'onderzoek?', -100, 98, fTekst(24, 600), D8.ink, 'left');
  if (slot > 0.01) { ctx.globalAlpha *= slot; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(80, 76, 30, 0, 6.283); ctx.moveTo(59, 97); ctx.lineTo(101, 55); ctx.stroke(); } }); }

// ---------- medicijn ----------
// tablettenstrip (blister) en een medicijnmolecuul als klein ringetje (teal = product, C4); dosis = aantal tabletten
function d8strip(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 6, vol = 6, kl = '#F2F2EE' } = o; d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40 * Math.ceil(n / 2) - 10, -60, 80 * Math.ceil(n / 2) + 20, 120, 10); shape(ctx, '#C8D0D8', '#E8ECF2', 2);
  for (let i = 0; i < n; i++) { const cx = -40 * Math.ceil(n / 2) + 40 + (i >> 1) * 80, cy = i % 2 ? 24 : -24; ctx.beginPath(); ctx.ellipse(cx, cy, 26, 18, 0, 0, 6.283); shape(ctx, i < vol ? kl : rgba('#8FA0B5', 0.3), '#9AA3B2', 1.5); if (i < vol) { ctx.strokeStyle = '#C8D0D8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.stroke(); } } }); }
function d8molecuul(ctx, x, y, r, o = {}) { const { a = 1, an = 0, kl = C.teal, half = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ring = (cx, cy) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const t = i * Math.PI / 3 + Math.PI / 6; ctx.lineTo(cx + Math.cos(t) * r, cy + Math.sin(t) * r); } ctx.closePath(); shape(ctx, rgba(kl, 0.35), kl, Math.max(1.5, r * 0.16)); };
  const k = ease(half); ring(-r * 0.87 - k * r * 0.6, 0); ctx.save(); ctx.translate(k * r * 0.6, k * r * 0.3); ctx.rotate(k * 0.5); ring(r * 0.87, 0); ctx.restore(); ctx.restore(); }
// 'medicijn in het bloed': staande meter met een veilig groen deel en een koraal gevarenzone
function d8bloedspiegel(ctx, x, y, h, frac, o = {}) { const { a = 1, lab = 'medicijn in het bloed' } = o; d8a(ctx, a, () => { roundRect(ctx, x - 26, y - h, 52, h, 14); shape(ctx, '#2A3A58', C.line, 1.5);
  ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(x - 24, y - h + 2, 48, h * 0.3); metaText(ctx, 'te veel', x + 44, y - h * 0.84, C.koraal, 'left', 28);
  const f = clamp(frac, 0, 1); roundRect(ctx, x - 18, y - 8 - (h - 16) * f, 36, (h - 16) * f, 10); shape(ctx, f > 0.7 ? C.koraal : C.groen, null); metaText(ctx, lab, x, y + 40, C.text2, 'center', 28); }); }

// ---------- maïs ----------
// Recept (C9 Planten; uit algemene kennis, niet met een geopende bron gecontroleerd): maïs wordt ± 2–2,5 m hoog; een stengel met
// knopen, aan elke knoop één lang lintvormig blad (± 1 m, 8–10 cm breed) dat afwisselend links en rechts bogend afhangt,
// met een lichte middennerf. Bovenaan de pluim (mannelijke bloeiwijze met stuifmeel); halverwege, in een bladoksel, de kolf
// (vrouwelijk) in schutbladeren met de baarden (zijde) die naar buiten hangen. Bekende fouten: kolf bovenaan; bladeren als
// korte ovale blaadjes; geen pluim.
function d8mais(ctx, x, y, h, o = {}) { const { a = 1, t = 0, kolf = true, pluim = true, gen = 0, wind = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const sw = Math.sin(t * 0.8 + x * 0.01) * 0.015 + wind * 0.04, top = y - h, P = (u) => [x + Math.sin(u * 2) * h * sw * u, y - h * u];
  ctx.strokeStyle = D8.maisD; ctx.lineWidth = Math.max(3, h * 0.018); ctx.beginPath(); for (let i = 0; i <= 20; i++) { const [px, py] = P(i / 20 * 0.94); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  for (let k = 0; k < 9; k++) { const u = 0.1 + k * 0.088, [px, py] = P(u), kant = k % 2 ? 1 : -1, L = h * (0.42 - Math.abs(u - 0.45) * 0.35), bw = h * 0.022;
    ctx.save(); ctx.translate(px, py); ctx.scale(kant, 1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(L * 0.35, -L * 0.42, L * 0.75, -L * 0.3, L, L * 0.12); ctx.bezierCurveTo(L * 0.72, -L * 0.22 + bw, L * 0.35, -L * 0.3 + bw * 1.6, 0, bw * 1.4); ctx.closePath(); shape(ctx, k % 3 === 1 ? D8.maisD : D8.mais, null);
    ctx.strokeStyle = rgba('#DDEFC0', 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, bw * 0.6); ctx.bezierCurveTo(L * 0.35, -L * 0.38 + bw * 0.7, L * 0.73, -L * 0.27 + bw * 0.5, L * 0.98, L * 0.11); ctx.stroke(); ctx.restore(); }
  if (kolf) { const [px, py] = P(0.44); ctx.save(); ctx.translate(px + h * 0.02, py - h * 0.02); ctx.rotate(0.35); ctx.beginPath(); ctx.ellipse(0, -h * 0.07, h * 0.03, h * 0.085, 0, 0, 6.283); shape(ctx, D8.kolf, null);
    ctx.fillStyle = D8.mais; ctx.beginPath(); ctx.moveTo(-h * 0.035, h * 0.02); ctx.quadraticCurveTo(-h * 0.04, -h * 0.1, -h * 0.005, -h * 0.15); ctx.quadraticCurveTo(-h * 0.01, -h * 0.05, h * 0.006, h * 0.02); ctx.fill();
    ctx.beginPath(); ctx.moveTo(h * 0.035, h * 0.02); ctx.quadraticCurveTo(h * 0.042, -h * 0.09, h * 0.01, -h * 0.14); ctx.quadraticCurveTo(h * 0.012, -h * 0.05, -h * 0.004, h * 0.02); ctx.fill();
    ctx.strokeStyle = D8.zijde; ctx.lineWidth = 1.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, -h * 0.15); ctx.quadraticCurveTo(h * (0.01 + i * 0.006), -h * 0.19, h * (0.02 + i * 0.008), -h * (0.16 - i * 0.008)); ctx.stroke(); } ctx.restore(); }
  if (pluim) { const [px, py] = P(0.94); ctx.strokeStyle = '#C9B070'; ctx.lineWidth = Math.max(1.5, h * 0.006); for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.28, L = h * (0.08 + (i === 3 ? 0.04 : 0)); ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + Math.cos(an) * L * 0.6, py + Math.sin(an) * L * 0.6 - h * 0.01, px + Math.cos(an) * L, py + Math.sin(an) * L + (i === 3 ? 0 : h * 0.02)); ctx.stroke(); } }
  if (gen > 0.01) { const [px, py] = P(0.3); ctx.globalAlpha = a * gen; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py, h * 0.05, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }
// rups van de maïsboorder: één doorlopend lijf met segmenten als banden, donkere kopkapsel, stipjes; ± 2,5 cm
function d8rups(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, dood = 0, kijk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * dood); ctx.translate(x, y); ctx.scale(kijk * s, s);
  const N = 9, P = []; for (let i = 0; i < N; i++) { const u = i / (N - 1); P.push([-60 + u * 120, -Math.max(0, Math.sin(u * Math.PI * 1.0 + t * 3)) * 10 * (1 - dood) - 12]); }
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = dood > 0.5 ? '#9A9488' : '#D8C8A0'; ctx.lineWidth = 26; ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
  ctx.strokeStyle = rgba('#8C7A5A', 0.6); ctx.lineWidth = 2; for (let i = 1; i < N - 1; i++) { const [px, py] = P[i]; ctx.beginPath(); ctx.moveTo(px, py - 12); ctx.lineTo(px, py + 12); ctx.stroke(); circ(ctx, px + 4, py - 4, 2.5, '#6A5A40'); }
  const [hx, hy] = P[N - 1]; circ(ctx, hx + 8, hy, 12, '#4A3A2A'); ctx.restore(); }

// ---------- portret (castpersonage in een rondje, voor stamboom en schema) ----------
function d8portret(ctx, id, x, y, r, o = {}) { const { a = 1, rand = C.line, uit = 'neutraal', t = 0, outfit } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#2A3A58'; ctx.fill(); ctx.save(); ctx.clip(); const h = r * 6.2; persoon(ctx, id, x, y - r * 0.55 + h * 0.84, h, { uit, t, outfit }); ctx.restore();
  ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- tijdlijn (Huntington) ----------
function d8tijdlijn(ctx, x1, x2, y, o = {}) { const { a = 1, max = 80, band = null, p = 1 } = o; d8a(ctx, a, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
  for (let v = 0; v <= max; v += 10) { const xx = lerp(x1, x2, v / max); ctx.beginPath(); ctx.moveTo(xx, y - 10); ctx.lineTo(xx, y + 10); ctx.stroke(); if (v % 20 === 0) metaText(ctx, v + (v === max ? ' jaar' : ''), xx, y + 48, C.text2, 'center', 28); }
  if (band && p > 0.02) { const [b1, b2] = band, xa = lerp(x1, x2, b1 / max), xb = lerp(x1, x2, b2 / max), xe = lerp(xa, xb, ease(p)); roundRect(ctx, xa, y - 22, Math.max(4, xe - xa), 44, 10); shape(ctx, rgba(C.koraal, 0.45), C.koraal, 2); } }); }

// ---------- bloed van de moeder met DNA-stukjes (NIPT) ----------
// Recept (uit algemene kennis, niet met een geopende bron gecontroleerd; in beeld daarom geen percentage): in het bloedplasma van een zwangere drijven korte stukjes DNA (± 150 bp);
// ± 10 % komt van de placenta (het kind), de rest van de moeder. Stukjes als korte grijze draadjes; die van het kind met
// een goud randje. Rode bloedcellen als ingedeukte schijven (rodeBloedcel). Bekende fout: hele cellen van het kind in beeld.
function d8plasma(ctx, cx, cy, r, t, o = {}) { const { a = 1, kind = 1, n = 26 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = '#5A2A30'; ctx.fill(); ctx.save(); ctx.clip();
  for (let i = 0; i < 7; i++) { const w = wander(i + 40, t, 18, 0.25); rodeBloedcel(ctx, cx - r * 0.7 + (i % 4) * r * 0.48 + w.x, cy - r * 0.55 + Math.floor(i / 4) * r * 0.9 + w.y + (i % 2) * 30, r * 0.16, hash(i) * 3, i % 3 === 0 ? 1 : 0, 0.9); }
  for (let i = 0; i < n; i++) { const w = wander(i, t, 26, 0.35), x = cx - r * 0.8 + hash(i * 2.3) * r * 1.6 + w.x, y = cy - r * 0.8 + hash(i * 5.1) * r * 1.6 + w.y, an = hash(i * 9) * 3, L = 26 + hash(i) * 14;
    const L2 = L * 1.6, P = [[x - Math.cos(an) * L2 / 2, y - Math.sin(an) * L2 / 2], [x + Math.cos(an + 0.3) * L2 / 2, y + Math.sin(an + 0.3) * L2 / 2]]; const kd = i % 8 === 0;
    if (kd && kind > 0.01) { ctx.save(); ctx.globalAlpha *= kind; ctx.strokeStyle = C.goud; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...P[0]); ctx.lineTo(...P[1]); ctx.stroke(); ctx.restore(); }
    dnaDraad(ctx, P, { w: 9, glad: false }); }
  ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- iconen bij de hielprik ----------
function d8bord(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 70, 24, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); ctx.beginPath(); ctx.ellipse(0, -2, 48, 15, 0, 0, 6.283); shape(ctx, '#E8ECF0', null);
  circ(ctx, -16, -6, 10, '#7FC48F'); circ(ctx, 4, -4, 9, '#E07A5F'); ctx.beginPath(); ctx.ellipse(22, -6, 14, 7, 0.2, 0, 6.283); ctx.fillStyle = '#C9A35C'; ctx.fill(); }); }
function d8flesje(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -30, -40, 60, 90, 10); shape(ctx, rgba(C.teal, 0.35), C.teal, 2); roundRect(ctx, -22, -62, 44, 24, 5); shape(ctx, '#F2F2EE', null); roundRect(ctx, -22, -14, 44, 34, 4); shape(ctx, '#F2F2EE', null); ctx.fillStyle = C.teal; ctx.fillRect(-4, -10, 8, 26); ctx.fillRect(-13, -1, 26, 8); }); }
function d8stetho(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -50); ctx.quadraticCurveTo(-34, 10, 0, 16); ctx.quadraticCurveTo(34, 10, 30, -50); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 16); ctx.quadraticCurveTo(0, 50, 34, 50); ctx.stroke(); circ(ctx, 46, 50, 16, '#C9D2DC', '#AFC0D0', 3); circ(ctx, -30, -54, 6, '#AFC0D0'); circ(ctx, 30, -54, 6, '#AFC0D0'); }); }
// wegwijzer (keuze): paal met twee bordjes
function d8wegwijzer(ctx, x, y, s = 1, a = 1) { d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#8C7A5A'; ctx.fillRect(-6, -90, 12, 150); ctx.beginPath(); ctx.moveTo(-6, -80); ctx.lineTo(70, -80); ctx.lineTo(90, -62); ctx.lineTo(70, -44); ctx.lineTo(-6, -44); ctx.closePath(); shape(ctx, C.goud, null);
  ctx.beginPath(); ctx.moveTo(6, -30); ctx.lineTo(-70, -30); ctx.lineTo(-90, -12); ctx.lineTo(-70, 6); ctx.lineTo(6, 6); ctx.closePath(); shape(ctx, C.goud, null); }); }
// injectiebuisje bloed (vervolgtest / DNA-test bij de arts)
function d8bloedbuis(ctx, x, y, s = 1, o = {}) { const { a = 1, vul = 0.7, dop = '#7A5A9A' } = o; d8a(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -14, -70, 28, 130, 12); shape(ctx, rgba('#DCE3EC', 0.15), '#AFC0D0', 2); ctx.save(); roundRect(ctx, -14, -70, 28, 130, 12); ctx.clip(); ctx.fillStyle = rgba(D8.bloed, 0.9); ctx.fillRect(-14, 60 - 130 * vul, 28, 130 * vul); ctx.restore(); roundRect(ctx, -18, -92, 36, 26, 6); shape(ctx, dop, null); roundRect(ctx, -10, -40, 20, 50, 2); shape(ctx, '#F2F2EE', null); }); }
// gezicht met tekstwolkje (gedachte) voor 'mensen kunnen het oneens zijn'
function d8wolkje(ctx, x, y, s2, o = {}) { const { a = 1, kl = C.text, px = 28 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s2).width + 44, hh = px + 30;
  roundRect(ctx, x - w / 2, y - hh, w, hh, hh / 2); shape(ctx, rgba(C.fill, 0.95), kl, 2); circ(ctx, x - w * 0.2, y + 10, 7, rgba(C.fill, 0.95), kl, 2); circ(ctx, x - w * 0.26, y + 26, 4, rgba(C.fill, 0.95), kl, 2); text(ctx, s2, x, y - 17, fTekst(px, 600), C.text, 'center'); ctx.restore(); }

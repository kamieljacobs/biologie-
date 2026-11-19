// Wat word jij? · Sport en topsport 5 · Ook nog hardlopen? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): teal = water, rust, zwemmen; groen = aanpassing, lopen als tweede sport; koraal = let op, blessure;
// goud = doel en focus; oker = botten en kracht. Cast: Sam (zwemmer, outfit 'zwem'; bij het lopen 'sport'), de zwemtrainer,
// figuranten Bilal en Daan (vrienden), Teun en Jens als jongste groep, Dennis en Marieke als ouders. Geen namen in beeld.
// Er is geen geschilderd zwembaddecor: het bad wordt hier vlak getekend (navy-basis, gedempte tegels), alleen onder badscènes.

const GROND = 860;
const SP5 = { wand: '#16233A', wandL: '#1D2C47', tegel: '#2B3A55', tegelL: '#344563', voeg: '#22304A', water: '#2C6E8E', waterD: '#1F5672', waterL: '#4F95B5',
  bodem: '#1B4058', lijn: '#13283A', blok: '#C9D2DC', blokD: '#8E9AAA', bot: '#E2CB92', botD: '#C9A35C', merg: '#6E4636', spons: '#EFE2BC',
  spier: '#B9524C', spierL: '#D47A70', mito: '#D88E7A', gras: '#2F4A3A', pad: '#5A4A3A', padL: '#6E5C48', herfst: ['#C9783A', '#D9A441', '#B8533A', '#8C5A3A'] };

// ---------- algemene hulpjes (zoals mb3) ----------
function dot(ctx, x, y, r, fill, stroke, lw = 1.5) { circ(ctx, x, y, r, fill, stroke, lw); } // lib_anatomie verwacht dot()
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function kaartTekst(ctx, x, y, w, h, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); if (kop) metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x + 28, y + (kop ? 100 : 62) + i * (px + 12), fTekst(px, 700), C.text, 'left')); }); }
// gekleurd kaartje met één regel (bv. 'HART: DOET DEELS MEE')
function SP5_label(ctx, s2, x, y, col, a = 1, px = 34, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width + 56, h = px + 34;
  const x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x; roundRect(ctx, x0, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), col, 3);
  ctx.fillStyle = col; roundRect(ctx, x0, y, 12, h, 6); ctx.fill(); text(ctx, s2, x0 + 32, y + h / 2 + px * 0.36, fTekst(px, 800), C.text, 'left'); ctx.restore(); return w; }

// ---------- extra garderobe voor figuranten (zelfde gezicht, alleen zwem- of sportkleding) ----------
(function () { const Z = CAST.sam.garderobe.zwem;
  const zwem = (id, naam, muts, broek, acc) => { const P = CAST[id]; if (!P) return; P.garderobe = P.garderobe || {}; P.garderobe[naam] = Object.assign({}, Z, { topKleur: P.huid, topAccent: lighten(P.huid, -0.1), schoen: P.huid, schoenAccent: P.huid, badmuts: muts, broek, broekAccent: acc || broek }); };
  zwem('bilal', 'zwem', '#2E6FBF', '#22252C', '#2E6FBF'); zwem('daan', 'zwem', '#F2F2EE', '#2B3F66', '#5BA4C9');
  zwem('kind', 'zwem', '#E0B64A', '#2B3F66'); zwem('jens', 'zwem', '#5BA4C9', '#22252C'); zwem('kind', 'zwemB', '#7FC48F', '#3A2E4A'); zwem('jens', 'zwemB', '#F2F2EE', '#5A2E2E');
  if (CAST.daan && !CAST.daan.garderobe.sport) CAST.daan.garderobe.sport = { top: 'tshirt', strepen: null, topKleur: '#4F8F6A', topAccent: '#3F7558', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#4F8F6A' };
})();

// ---------- personages ----------
function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || GROND, o.h || 430, Object.assign({ t, kijk: 1, uit: 'neutraal', pose: 'staan', outfit: 'zwem' }, o)); }
function trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || GROND, o.h || 450, Object.assign({ t, kijk: -1, uit: 'neutraal', pose: 'staan' }, o)); }

// ---------- het zwembad ----------
// kant: achterwand met hoge ramen (avond), een strook water met lijnen in de verte, de natte tegelvloer vooraan (voeten op GROND)
function SP5_badKant(ctx, t, o = {}) { const { a = 1, blokken = true, avond = true } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP5.wand; ctx.fillRect(0, 0, W, 560);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 310; roundRect(ctx, x, 70, 230, 300, 6); shape(ctx, avond ? '#101A2C' : '#3A5A7A', SP5.wandL, 3); ctx.fillStyle = rgba('#F2F2EE', 0.05); ctx.fillRect(x + 113, 70, 4, 300); ctx.fillRect(x, 218, 230, 4); }
  ctx.fillStyle = SP5.wandL; ctx.fillRect(0, 410, W, 150); ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 410); ctx.lineTo(x, 560); ctx.stroke(); } for (let y = 440; y < 560; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // water in de verte
  ctx.fillStyle = SP5.water; ctx.fillRect(0, 560, W, 130); ctx.fillStyle = SP5.waterL; ctx.fillRect(0, 560, W, 5);
  const rij = (y, s, k) => { for (let x = -20; x < W + 20; x += 26 * s) { ctx.fillStyle = (Math.floor(x / (26 * s)) % 4 === 0) ? '#D8573F' : k; ctx.beginPath(); ctx.ellipse(x + (t * 3) % 1, y, 11 * s, 5 * s, 0, 0, 6.283); ctx.fill(); } };
  rij(585, 0.6, '#E8E2D4'); rij(612, 0.8, '#5BA4C9'); rij(648, 1.0, '#E8E2D4');
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const y = 570 + i * 20, x0 = (i * 330 + t * 22) % W; ctx.beginPath(); ctx.moveTo(x0, y); ctx.quadraticCurveTo(x0 + 40, y - 4, x0 + 80, y); ctx.stroke(); }
  // rand en vloer
  ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, 690, W, 14); ctx.fillStyle = SP5.tegel; ctx.fillRect(0, 704, W, H - 704);
  ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let y = 740; y < 880; y += 46) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let x = 0; x < W; x += 92) { ctx.beginPath(); ctx.moveTo(x, 704); ctx.lineTo(x - 40, 880); ctx.stroke(); }
  if (blokken) for (let i = 0; i < 5; i++) SP5_startblokVoor(ctx, 1080 + i * 190, 692, 0.75, i + 3);
  ctx.restore(); }
// startblok van voren (in de verte, aan de rand)
function SP5_startblokVoor(ctx, x, y, s, nr) { ctx.save(); ctx.fillStyle = SP5.blokD; ctx.fillRect(x - 6 * s, y - 70 * s, 12 * s, 70 * s);
  roundRect(ctx, x - 44 * s, y - 92 * s, 88 * s, 26 * s, 6 * s); shape(ctx, SP5.blok, null); ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 22 * s, y - 64 * s, 44 * s, 34 * s, 4 * s); ctx.fill();
  text(ctx, String(nr), x, y - 37 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
// doorsnede: tegelvloer links tot xW, water rechts; Y = wateroppervlak; bodem op 850
function SP5_badDoorsnede(ctx, t, Y, o = {}) { const { xW = 380, a = 1, xR = null } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP5.wand; ctx.fillRect(0, 0, W, Y - 30);
  for (let i = 0; i < 5; i++) { const x = 160 + i * 380; roundRect(ctx, x, 60, 250, Y - 160, 6); shape(ctx, '#101A2C', SP5.wandL, 3); }
  // water
  const xr = xR || W; ctx.fillStyle = SP5.water; ctx.fillRect(xW, Y, xr - xW, 860 - Y); ctx.fillStyle = SP5.waterD; ctx.fillRect(xW, Y + (860 - Y) * 0.55, xr - xW, (860 - Y) * 0.45);
  ctx.fillStyle = SP5.bodem; ctx.fillRect(xW, 840, xr - xW, 20); ctx.fillStyle = SP5.lijn; ctx.fillRect(xW + 120, 832, xr - xW - 240, 10);
  // wanden met tegels
  ctx.fillStyle = SP5.tegel; ctx.fillRect(0, Y - 30, xW, 890 - Y); ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let y = Y; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(xW, y); ctx.stroke(); }
  ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, Y - 34, xW + 6, 10);
  if (xR) { ctx.fillStyle = SP5.tegel; ctx.fillRect(xR, Y - 30, W - xR, 890 - Y); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(xR - 6, Y - 34, W - xR + 6, 10); ctx.fillStyle = SP5.lijn; ctx.fillRect(xR - 14, Y + 40, 8, 760 - Y); }
  // golfjes aan het oppervlak
  ctx.strokeStyle = SP5.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = xW; x <= xr; x += 8) { const y = Y + 3 * Math.sin(x * 0.03 + t * 2.2); x === xW ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  ctx.restore(); }
// startblok van opzij: (x, y) = voorrand en bovenkant; s = schaal (1 = ± 75 cm hoog bij Sam h 430)
function SP5_startblok(ctx, x, y, s = 1, nr = 4, Lp = null) { ctx.save(); const hP = 150 * s, lp = Lp || 120 * s; ctx.fillStyle = SP5.blokD; ctx.fillRect(x - lp * 0.7, y + 10 * s, 18 * s, hP); ctx.fillRect(x - 24 * s, y + 10 * s, 16 * s, hP - 10 * s);
  ctx.beginPath(); ctx.moveTo(x - lp, y + 14 * s); ctx.lineTo(x, y); ctx.lineTo(x + 4 * s, y + 18 * s); ctx.lineTo(x - lp, y + 30 * s); ctx.closePath(); shape(ctx, SP5.blok, null);
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - lp * 0.55, y + 44 * s, 44 * s, 36 * s, 4 * s); ctx.fill(); text(ctx, String(nr), x - lp * 0.55 + 22 * s, y + 72 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
// wig van het startblok onder de achterste voet
function SP5_wig(ctx, s, py) { if (!s || !s.wig) return; const { x, y, h } = s.wig; const yb = py == null ? y + 6 : py; ctx.save(); ctx.fillStyle = SP5.blokD; ctx.beginPath(); ctx.moveTo(x - h * 1.4, yb); ctx.lineTo(x + h * 0.1, Math.min(y, yb) - h); ctx.lineTo(x + h * 0.6, Math.min(y, yb) - h * 0.8); ctx.lineTo(x + h * 0.6, yb); ctx.closePath(); ctx.fill(); ctx.restore(); }
// waterlijn als lichte golflijn over een zwemmer heen (persoon blijft dekkend)
function SP5_waterlijn(ctx, x0, x1, Y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.85); ctx.lineWidth = 3; ctx.beginPath();
  for (let x = x0; x <= x1; x += 8) { const y = Y + 3 * Math.sin(x * 0.03 + t * 2.2); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }
// spatwater (ringen en druppels)
function SP5_spat(ctx, x, y, u, a = 1) { if (a <= 0.01 || u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= a * (1 - u); ctx.fillStyle = '#DDF0F8';
  for (let i = 0; i < 9; i++) { const an = -Math.PI * (0.1 + 0.8 * i / 8), r = 30 + 160 * u; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r * 0.9 + 120 * u * u, 6, '#DDF0F8'); }
  ctx.strokeStyle = '#DDF0F8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 40 + 120 * u, 10 + 20 * u, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- pictogrammen (geen mensfiguren) ----------
function SP5_golfIcoon(ctx, x, y, s, col = C.teal) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (const dy of [-8, 8]) { ctx.beginPath(); for (let i = 0; i <= 24; i++) { const xx = x - 24 * s + i * 2 * s, yy = y + dy * s + 5 * s * Math.sin(i * 0.52); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function SP5_schoen(ctx, x, y, s, col = C.groen) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-26, 10); ctx.lineTo(-24, -14); ctx.quadraticCurveTo(-14, -18, -8, -8); ctx.quadraticCurveTo(4, -4, 18, -2); ctx.quadraticCurveTo(30, 0, 30, 10); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-28, 9, 59, 5); ctx.strokeStyle = rgba('#0D1420', 0.7); ctx.lineWidth = 2; for (const xx of [-12, -6, 0]) { ctx.beginPath(); ctx.moveTo(xx, -10 + (xx + 12) * 0.2); ctx.lineTo(xx + 5, -7 + (xx + 12) * 0.2); ctx.stroke(); } ctx.restore(); }
function SP5_fiets(ctx, x, y, s, col = C.groen) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const dx of [-22, 22]) { ctx.beginPath(); ctx.arc(x + dx * s, y + 8 * s, 14 * s, 0, 6.283); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x - 22 * s, y + 8 * s); ctx.lineTo(x - 6 * s, y - 14 * s); ctx.lineTo(x + 16 * s, y - 14 * s); ctx.lineTo(x + 22 * s, y + 8 * s); ctx.moveTo(x - 6 * s, y - 14 * s); ctx.lineTo(x + 2 * s, y + 8 * s); ctx.lineTo(x + 16 * s, y - 14 * s); ctx.moveTo(x - 10 * s, y - 20 * s); ctx.lineTo(x - 2 * s, y - 20 * s); ctx.moveTo(x + 16 * s, y - 14 * s); ctx.lineTo(x + 14 * s, y - 22 * s); ctx.lineTo(x + 20 * s, y - 22 * s); ctx.stroke(); ctx.restore(); }
function SP5_halter(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 26 * s, y - 3 * s, 52 * s, 6 * s); for (const d of [-1, 1]) { roundRect(ctx, x + d * 22 * s - 5 * s, y - 16 * s, 10 * s, 32 * s, 3 * s); ctx.fill(); roundRect(ctx, x + d * 30 * s - 4 * s, y - 11 * s, 8 * s, 22 * s, 3 * s); ctx.fill(); } ctx.restore(); }
function SP5_bal(ctx, x, y, s, col = C.groen) { ctx.save(); circ(ctx, x, y, 18 * s, '#F2F2EE', col, 3 * s); ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.lineTo(x + Math.cos(an) * 7 * s, y + Math.sin(an) * 7 * s); } ctx.closePath(); ctx.fill(); ctx.restore(); }
function SP5_horde(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 18 * s); ctx.lineTo(x - 20 * s, y - 14 * s); ctx.moveTo(x + 20 * s, y + 18 * s); ctx.lineTo(x + 20 * s, y - 14 * s); ctx.moveTo(x - 26 * s, y + 18 * s); ctx.lineTo(x - 12 * s, y + 18 * s); ctx.moveTo(x + 14 * s, y + 18 * s); ctx.lineTo(x + 28 * s, y + 18 * s); ctx.stroke();
  ctx.fillStyle = col; ctx.fillRect(x - 24 * s, y - 20 * s, 48 * s, 9 * s); ctx.restore(); }
function SP5_hart(ctx, x, y, s, col = C.koraal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 14); ctx.bezierCurveTo(-26, -4, -18, -26, 0, -12); ctx.bezierCurveTo(18, -26, 26, -4, 0, 14); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function SP5_botIcoon(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 22 * s, y - 5 * s, 44 * s, 10 * s); for (const dx of [-1, 1]) for (const dy of [-1, 1]) circ(ctx, x + dx * 24 * s, y + dy * 7 * s, 8 * s, col); ctx.restore(); }
function SP5_hoofdIcoon(ctx, x, y, s, col = C.teal) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - 8 * s, y + 24 * s); ctx.lineTo(x - 8 * s, y + 12 * s); ctx.bezierCurveTo(x - 24 * s, y + 2 * s, x - 22 * s, y - 24 * s, x, y - 24 * s); ctx.bezierCurveTo(x + 18 * s, y - 24 * s, x + 24 * s, y - 10 * s, x + 20 * s, y - 2 * s); ctx.lineTo(x + 26 * s, y + 6 * s); ctx.lineTo(x + 20 * s, y + 8 * s); ctx.lineTo(x + 20 * s, y + 16 * s); ctx.lineTo(x + 10 * s, y + 18 * s); ctx.lineTo(x + 10 * s, y + 24 * s); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 2 * s, y - 6 * s, 7 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
// ronde tegel met pictogram
function SP5_tegel(ctx, x, y, soort, col, a = 1, w = 120, h = 56) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba(col, 0.3), col, 2.5);
  if (soort === 'zwem') SP5_golfIcoon(ctx, x, y, 0.85, lighten(col, 0.3)); else if (soort === 'loop') SP5_schoen(ctx, x, y + 2, 0.95, lighten(col, 0.25)); else if (soort === 'kracht') SP5_halter(ctx, x, y, 0.9, lighten(col, 0.2)); else if (soort === 'fiets') SP5_fiets(ctx, x, y, 0.8, lighten(col, 0.25)); ctx.restore(); }

// weekschema: 8 zwemblokken (teal) en optioneel 3 looptegels (groen) op di, do, za
const SP5_DAG = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'], SP5_ZWEM = [2, 1, 2, 1, 1, 1, 0];
function SP5_week(ctx, x, y, o = {}) { const { a = 1, zwem = 1, loop = 0, loopKl = C.groen, drop = 1, tw = 150 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 30, y - 70, tw * 7 + 50, 380, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.6), 2);
  SP5_DAG.forEach((d, i) => { const cx = x + i * tw + tw / 2 - 5; metaText(ctx, d, cx, y - 22, C.text2, 'center', 28);
    for (let k = 0; k < SP5_ZWEM[i]; k++) SP5_tegel(ctx, cx, y + 30 + k * 66, 'zwem', C.teal, zwem, tw - 24, 56);
    if ([1, 3, 5].includes(i) && loop > 0.01) { const j = [1, 3, 5].indexOf(i), u = clamp(loop * 1.0, 0, 1); SP5_tegel(ctx, cx, y + 30 + 2 * 66 + 26 - (1 - u) * 90 * drop, 'loop', loopKl, u, tw - 24, 56); } });
  ctx.restore(); }
// telefoon met appje
function SP5_telefoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14 * s, y - 26 * s, 28 * s, 52 * s, 5 * s); shape(ctx, '#20242E', '#5A6478', 1.5); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(x - 11 * s, y - 21 * s, 22 * s, 40 * s); ctx.restore(); }
function SP5_app(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(38, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, x, y, w, 76, 22); shape(ctx, '#DCF5D8', null);
  ctx.beginPath(); ctx.moveTo(x + 18, y + 76); ctx.lineTo(x + 6, y + 98); ctx.lineTo(x + 40, y + 76); ctx.fillStyle = '#DCF5D8'; ctx.fill(); text(ctx, s2, x + 25, y + 51, fTekst(38, 800), '#1A2740', 'left'); ctx.restore(); }
// klembord (papier op een bruin bord met klem)
function SP5_klembord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, '#8C6A44', '#6E5234', 2); roundRect(ctx, x + 18, y + 30, w - 36, h - 48, 6); shape(ctx, '#F2EEE4', null);
  roundRect(ctx, x + w / 2 - 70, y - 14, 140, 44, 10); shape(ctx, '#9AA3B2', '#6E7685', 2); ctx.restore(); }
// emmer 'HERSTEL' met tegels erin; vul 0..1 (waterlijn), over = overlopen
function SP5_emmer(ctx, x, y, s, o = {}) { const { a = 1, vul = 0, tegels = [], over = 0, t = 0, label = 'HERSTEL' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const w0 = 320 * s, w1 = 250 * s, h = 360 * s, top = y - h;
  const pad = () => { ctx.beginPath(); ctx.moveTo(x - w0 / 2, top); ctx.lineTo(x - w1 / 2, y); ctx.lineTo(x + w1 / 2, y); ctx.lineTo(x + w0 / 2, top); };
  pad(); ctx.closePath(); ctx.fillStyle = '#24314A'; ctx.fill();
  ctx.save(); pad(); ctx.closePath(); ctx.clip();
  const lvl = y - h * clamp(vul, 0, 1); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(x - w0, lvl, w0 * 2, h + 10);
  tegels.forEach((tg, i) => { const col = i % 3, row = Math.floor(i / 3); SP5_tegel(ctx, x - 88 * s + col * 88 * s, y - 40 * s - row * 62 * s - (tg.drop || 0), tg.soort, tg.kl, tg.a == null ? 1 : tg.a, 80 * s, 50 * s); });
  ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; pad(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, top, w0 / 2, 18 * s, 0, 0, 6.283); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, top - 10 * s, w0 * 0.44, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  if (over > 0.01) { ctx.fillStyle = rgba(C.teal, 0.8 * over); for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + d * w0 / 2, top); ctx.quadraticCurveTo(x + d * (w0 / 2 + 40 * s), top + 20 * s, x + d * (w0 / 2 + 30 * s), top + 160 * s * over); ctx.lineTo(x + d * (w0 / 2 + 14 * s), top + 150 * s * over); ctx.quadraticCurveTo(x + d * (w0 / 2 + 16 * s), top + 20 * s, x + d * (w0 / 2 - 4), top + 4); ctx.fill(); }
    for (let i = 0; i < 6; i++) { const u = (t * 0.8 + i / 6) % 1; circ(ctx, x + (i % 2 ? 1 : -1) * (w0 / 2 + 24 * s), top + 170 * s * over + u * 120 * s, 5 * s, rgba(C.teal, 0.8 * over * (1 - u))); } }
  if (label) metaText(ctx, label, x, y + 46 * s, C.teal, 'center', 28); ctx.restore(); }
// meter (halve cirkel) met wijzer u 0..1
function SP5_meter(ctx, x, y, r, u, lab, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, Math.PI + Math.PI * clamp(u, 0, 1)); ctx.stroke();
  const an = Math.PI + Math.PI * clamp(u, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 26), y + Math.sin(an) * (r - 26)); ctx.stroke(); circ(ctx, x, y, 10, C.text);
  if (lab) metaText(ctx, lab, x, y + 50, col, 'center', 28); ctx.restore(); }
// trap met kleine treden
function SP5_trap(ctx, x, y, n, sw, sh, a = 1, col = C.groen, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y);
  const m = Math.max(1, Math.round(n * clamp(u, 0, 1))); for (let i = 0; i < m; i++) { ctx.lineTo(x + i * sw, y - (i + 1) * sh); ctx.lineTo(x + (i + 1) * sw, y - (i + 1) * sh); } ctx.stroke(); ctx.restore(); }
// podium (drie treden); pl = { a: 1|2|3, b: 1|2|3 } plaats van route A (teal) en B (groen)
function SP5_podium(ctx, x, y, s, pl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const H = { 1: 90, 2: 62, 3: 40 }, X = { 2: -1, 1: 0, 3: 1 };
  for (const p of [2, 1, 3]) { roundRect(ctx, x + X[p] * 64 * s - 30 * s, y - H[p] * s, 60 * s, H[p] * s, 4); shape(ctx, '#2A3A58', C.line, 1.5); text(ctx, String(p), x + X[p] * 64 * s, y - H[p] * s + 30 * s, fTekst(24 * s, 800), C.text2, 'center'); }
  for (const [k, col] of [['a', C.teal], ['b', C.groen]]) if (pl[k]) { const p = pl[k]; circ(ctx, x + X[p] * 64 * s, y - H[p] * s - 18 * s, 15 * s, col, lighten(col, 0.3), 2); text(ctx, k.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + X[p] * 64 * s, y - H[p] * s - 10 * s, fTekst(20 * s, 800), '#0D1420', 'center'); }
  ctx.restore(); }
// staafjes (horizontaal) met label links
function SP5_staaf(ctx, x, y, w, u, col, lab, waarde, a = 1, h = 46) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#22304A', rgba(C.line, 0.5), 1.5);
  if (u > 0.005) { roundRect(ctx, x, y, Math.max(16, w * clamp(u, 0, 1)), h, 10); shape(ctx, rgba(col, 0.75), col, 2); }
  if (lab) text(ctx, lab, x, y - 14, fTekst(34, 700), C.text, 'left'); if (waarde) text(ctx, waarde, x + w * clamp(u, 0, 1) + 18, y + h * 0.72, fTekst(36, 800), col, 'left'); ctx.restore(); }

// ---------- lichaam: hart in de romp (kijkje), spieren, botten ----------
let BODY = { cx: 960, yb: 880, h: 700 };
function SP5_romp(ctx, r, a = 1, t = 0, beat = 1) { if (a <= 0.01 || !r || !r.hoofd) return;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0.12, 2.3), wr = 0.62 * HHn;
  ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr, 0, 0, 6.283); ctx.clip();
  ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9); anLungs(0.35, 0); anHeart(1, t * 7 * beat, 0.5);
  ctx.restore(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
  return { x: wx, y: wy, r: wr }; }
// spiervezels met mitochondriën (voor in een zoomcirkel)
function SP5_vezels(ctx, x, y, r, n, extra = 0, t = 0) { ctx.save(); ctx.fillStyle = '#2A1C24'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const yy = y + i * r * 0.3; roundRect(ctx, x - r * 1.1, yy - r * 0.12, r * 2.2, r * 0.24, r * 0.1); shape(ctx, '#6E3A40', '#8E5258', 1.5);
    ctx.strokeStyle = rgba('#F0B8A6', 0.15); ctx.lineWidth = 1.5; for (let k = -10; k <= 10; k++) { ctx.beginPath(); ctx.moveTo(x + k * r * 0.11, yy - r * 0.1); ctx.lineTo(x + k * r * 0.11, yy + r * 0.1); ctx.stroke(); } }
  const tot = n + Math.round(extra); for (let i = 0; i < tot; i++) { const hx = x + (hash(i * 3.1) - 0.5) * r * 1.7, row = Math.floor(hash(i * 7.7) * 6) - 2.5, hy = y + row * r * 0.3; const nieuw = i >= n;
    ctx.save(); ctx.globalAlpha *= nieuw ? clamp(extra - (i - n), 0, 1) : 1; mitochondrion(ctx, hx, hy, r * 0.26, 0, 1, 4, t); if (nieuw) { ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(hx, hy, r * 0.17, r * 0.09, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
// onderlichaam als schema (bekken + twee benen); kl = kleur per been (in beeld links, rechts)
function SP5_benen(ctx, x, y, s, klL, klR, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const been = (d, kl) => { ctx.beginPath(); ctx.moveTo(d * 12, -300); ctx.lineTo(d * 92, -300); ctx.quadraticCurveTo(d * 96, -200, d * 74, -110); ctx.quadraticCurveTo(d * 78, -60, d * 70, -10); ctx.quadraticCurveTo(d * 74, 40, d * 64, 90); ctx.lineTo(d * 66, 150); ctx.lineTo(d * 100, 168); ctx.lineTo(d * 36, 168); ctx.lineTo(d * 34, 90);
    ctx.quadraticCurveTo(d * 24, 30, d * 30, -20); ctx.quadraticCurveTo(d * 20, -100, d * 16, -180); ctx.closePath(); shape(ctx, rgba(kl, 0.55), kl, 3); };
  roundRect(ctx, -100, -360, 200, 80, 30); shape(ctx, '#2A3A58', C.line, 2); been(-1, klL); been(1, klR); ctx.restore(); }
// lange pijp (scheenbeen) in lengtedoorsnede: schors oker, mergholte, sponsbot aan de uiteinden (boven breed plateau, onder smaller met enkelknobbel)
function SP5_scheenbeen(ctx, x, y, len, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = len * 0.075, top = y - len / 2, bot = y + len / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(x - 2.0 * w, top + 0.5 * w); ctx.quadraticCurveTo(x - 2.1 * w, top - 0.3 * w, x - 1.4 * w, top - 0.3 * w); ctx.quadraticCurveTo(x, top + 0.1 * w, x + 1.4 * w, top - 0.3 * w); ctx.quadraticCurveTo(x + 2.1 * w, top - 0.3 * w, x + 2.0 * w, top + 0.5 * w);
    ctx.quadraticCurveTo(x + 1.8 * w, top + 2.2 * w, x + 1.0 * w, top + 3.4 * w); ctx.lineTo(x + 0.9 * w, bot - 2.6 * w); ctx.quadraticCurveTo(x + 1.3 * w, bot - 1.2 * w, x + 1.25 * w, bot); ctx.lineTo(x - 0.8 * w, bot);
    ctx.quadraticCurveTo(x - 1.2 * w, bot + 0.7 * w, x - 1.5 * w, bot - 0.3 * w); ctx.quadraticCurveTo(x - 1.4 * w, bot - 1.4 * w, x - 0.95 * w, bot - 2.6 * w); ctx.lineTo(x - 1.0 * w, top + 3.4 * w); ctx.quadraticCurveTo(x - 1.8 * w, top + 2.2 * w, x - 2.0 * w, top + 0.5 * w); ctx.closePath(); };
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed; omtrek(); ctx.strokeStyle = rgba(C.oker, 0.5); ctx.lineWidth = 26; ctx.stroke(); ctx.restore(); }
  omtrek(); shape(ctx, SP5.botD, lighten(SP5.botD, 0.3), 2.5);
  ctx.save(); omtrek(); ctx.clip(); ctx.fillStyle = SP5.spons;
  ctx.beginPath(); ctx.moveTo(x - 2.2 * w, top - w); ctx.lineTo(x + 2.2 * w, top - w); ctx.lineTo(x + 2.2 * w, top + 2.3 * w); ctx.quadraticCurveTo(x, top + 3.6 * w, x - 2.2 * w, top + 2.3 * w); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 2.2 * w, bot + w); ctx.lineTo(x + 2.2 * w, bot + w); ctx.lineTo(x + 2.2 * w, bot - 1.6 * w); ctx.quadraticCurveTo(x, bot - 2.7 * w, x - 2.2 * w, bot - 1.6 * w); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba(SP5.botD, 0.9); ctx.lineWidth = 2.5; for (const [y0, y1] of [[top - 0.2 * w, top + 2.6 * w], [bot - 2.0 * w, bot + 0.2 * w]]) for (let i = 0; i < 34; i++) { const px = x + (hash(i * 4.3 + y0) - 0.5) * w * 3.4, py = y0 + hash(i * 2.9 + y0) * (y1 - y0), an = hash(i * 6.1 + y0) * 3.14; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * w * 0.45, py + Math.sin(an) * w * 0.45); ctx.stroke(); }
  ctx.fillStyle = SP5.merg; roundRect(ctx, x - w * 0.52, top + w * 3.0, w * 1.04, len - w * 5.2, w * 0.5); ctx.fill(); ctx.restore(); ctx.restore(); }
// beenskelet van voren: bekkenhelft, dijbeen met kop en hals, knieschijf, scheen- en kuitbeen; hl = { hals, been } 0..1 oplichten
function SP5_beenSkelet(ctx, x, y, s, hl = {}, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const B = SP5.bot, BS = lighten(SP5.botD, 0.2);
  const gl = (u, fn, lw = 64) => { if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = rgba(C.oker, 0.75); ctx.lineWidth = lw; ctx.lineCap = 'round'; fn(); ctx.stroke(); ctx.restore(); } };
  // bekkenhelft (darmbeenschoep met kom), links in beeld het midden van het lichaam
  ctx.save(); ctx.translate(-12, -372); ctx.scale(0.6, 0.6); ctx.translate(12, 372); ctx.beginPath(); ctx.moveTo(40, -470); ctx.quadraticCurveTo(-60, -500, -150, -450); ctx.quadraticCurveTo(-150, -400, -130, -360); ctx.quadraticCurveTo(-150, -320, -120, -280); ctx.lineTo(-70, -280); ctx.quadraticCurveTo(-40, -330, -30, -360); ctx.quadraticCurveTo(10, -380, 50, -420); ctx.closePath(); shape(ctx, B, BS, 2); ctx.restore();
  circ(ctx, -12, -372, 30, lighten(SP5.botD, 0.35));
  const hals = () => { ctx.beginPath(); ctx.moveTo(-12, -372); ctx.lineTo(50, -330); };
  gl(hl.hals || 0, hals, 76); circ(ctx, -12, -372, 26, B, BS, 2); ctx.lineCap = 'round'; ctx.strokeStyle = B; ctx.lineWidth = 32; hals(); ctx.stroke(); circ(ctx, 72, -336, 22, B);
  const schacht = () => { ctx.beginPath(); ctx.moveTo(56, -330); ctx.lineTo(30, -40); };
  gl(hl.been || 0, schacht); ctx.strokeStyle = B; ctx.lineWidth = 30; schacht(); ctx.stroke(); roundRect(ctx, -8, -56, 84, 44, 18); shape(ctx, B, BS, 2); circ(ctx, 34, -40, 14, lighten(SP5.botD, 0.35));
  const scheen = () => { ctx.beginPath(); ctx.moveTo(26, 6); ctx.lineTo(22, 270); };
  roundRect(ctx, -10, -8, 80, 28, 12); shape(ctx, B, BS, 2); gl(hl.been || 0, scheen); ctx.strokeStyle = B; ctx.lineWidth = 26; scheen(); ctx.stroke(); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(62, 22); ctx.lineTo(56, 262); ctx.stroke();
  roundRect(ctx, -4, 262, 74, 24, 10); shape(ctx, B, BS, 2); ctx.restore(); }
// voet die neerkomt (onderbeen + schoen van opzij), u = 0..1 val; geeft de landingsplek
function SP5_voetStoot(ctx, x, y, s, u, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = -120 * s * (1 - ease(u));
  ctx.fillStyle = '#3A4A62'; ctx.fillRect(x - 220 * s, y, 440 * s, 16 * s);
  ctx.save(); ctx.translate(x, y + dy); ctx.fillStyle = CAST.sam.huid; ctx.beginPath(); ctx.moveTo(-34 * s, -40 * s); ctx.lineTo(-20 * s, -300 * s); ctx.lineTo(28 * s, -300 * s); ctx.lineTo(22 * s, -40 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2A2F3E'; ctx.fillRect(-30 * s, -330 * s, 64 * s, 40 * s); SP5_schoen(ctx, 10 * s, -16 * s, 3.2 * s, '#D8573F'); ctx.restore();
  if (u >= 1) { const k = clamp((t % 0.9) / 0.9, 0, 1); ctx.strokeStyle = rgba(C.koraal, 1 - k); ctx.lineWidth = 4; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(x, y, (60 + 80 * k) * s, d > 0 ? -0.4 : Math.PI + 0.4, d > 0 ? 0 : Math.PI, d < 0); ctx.stroke(); } }
  ctx.restore(); }
// loopband met twee zichtbare rollen (icoon)
function SP5_loopband(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
  roundRect(ctx, x - 150 * s, y - 24 * s, 300 * s, 30 * s, 15 * s); shape(ctx, '#2A3A58', C.line, 2); for (let i = 0; i < 6; i++) { const xx = x - 130 * s + ((i * 52 * s + t * 60 * s) % (260 * s)); ctx.beginPath(); ctx.moveTo(xx, y - 18 * s); ctx.lineTo(xx, y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x + 120 * s, y - 24 * s); ctx.lineTo(x + 150 * s, y - 170 * s); ctx.lineTo(x + 90 * s, y - 180 * s); ctx.stroke(); roundRect(ctx, x + 60 * s, y - 210 * s, 80 * s, 40 * s, 6 * s); shape(ctx, '#2A3A58', C.line, 2); ctx.restore(); }
// klein grafiekje: tijden in het water (hoger = sneller); u = hoeveel van de lijn, zak = val aan het eind
function SP5_tijdGrafiek(ctx, x, y, w, h, u, zak, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'SNELHEID IN HET WATER');
  const P = []; for (let i = 0; i <= 20; i++) { const f = i / 20; let v = 0.35 + 0.35 * f; if (f > 0.6) v -= zak * (f - 0.6) * 1.2; P.push([x + f * w, y + h - v * h]); }
  const m = Math.max(2, Math.round(P.length * clamp(u, 0, 1))); lijn(ctx, P.slice(0, m), zak > 0.3 ? C.koraal : C.teal, 6); ctx.restore(); }

// zwemslagpictogram: kleine zwemmer op een korte waterlijn (geen mensfiguur in een kaartje: het castpersonage zelf)
function SP5_slagPict(ctx, id, x, y, L, slag, fz, a = 1, outfit) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = slag === 'rug' ? 0.07 : 0.12; const r = zwemmer(ctx, id, x, y + dy * L, L, { slag, t: fz, kijk: 1, outfit });
  SP5_waterlijn(ctx, x - L * 0.75, x + L * 0.75, y, 0, 1); ctx.restore(); return r; }

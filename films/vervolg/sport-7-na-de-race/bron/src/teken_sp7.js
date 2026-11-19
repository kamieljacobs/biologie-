// Wat word jij? · Sport en topsport 7 · Na de race — eigen tekeningen (19 nov 2026)
// Kleuren (REEKS-sport, storyboard): paars = gedachten en de emotiemeter (model, geen meting), goud = doel en plan,
// teal = water en rust, koraal = let op. Geen namen in beeld. Decors (zwembad, kamer thuis, praktijk) vlak getekend,
// alleen onder scènes die daar spelen; schema's op navy.
// Tijden zijn verzonnen maar tellen op (twijfels t8): 28,40 + 30,10 + 31,60 + 32,61 = 2:02,71; 29,30 + 30,20 + 30,70 + 31,63 = 2:01,83.

const SP7 = { water: '#2C5F80', waterD: '#244E6A', waterL: '#5BA4C9', tegel: '#3A4E6C', tegelL: '#4A6080', dek: '#4C5C74', dekL: '#5E7088',
  muur: '#22314C', vloer: '#1E2A40', hout: '#6A5440', houtL: '#8A7058', huid: '#7A5440', stift: '#F2F2EE', sil: '#3A4862', silL: '#54627E' };
const SP7_MOMENT = ['0 MIN', '10 MIN', "'S AVONDS", '23:00', 'DE DAG ERNA', 'DE WEEK ERNA', '3 WEKEN LATER'];

// ---------- algemene hulpjes ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 160, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line, vul = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, vul || rgba('#0D1420', 0.9), rgba(rand, 0.9), 2); ctx.restore(); }
function metaKaart(ctx, s2, x, y, a = 1, col = C.grain, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 44; ctx.letterSpacing = '0px';
  const x0 = al === 'right' ? x - w : al === 'center' ? x - w / 2 : x; roundRect(ctx, x0, y - 40, w, 58, 10); shape(ctx, rgba('#0D1420', 0.85), rgba(col, 0.6), 1.5); metaText(ctx, s2, x0 + 22, y, col, 'left', 28); ctx.restore(); }
// waarde die bij cues verspringt: v0 en dan [ [cue-ramp, nieuwe waarde], ... ]
function niveau(v0, stappen) { let v = v0; for (const [r, nv] of stappen) v += (nv - v) * clamp(r, 0, 1); return v; }

// ---------- tijdlijn bovenin ----------
// idx = actief moment (0..6, mag fractioneel zijn voor een glijdende stip); alleen het actieve punt en zijn buren krijgen een label
function SP7_tijdlijn(ctx, idx, a = 1, o = {}) { if (a <= 0.01) return; const x0 = 200, x1 = 1720, y = 62, n = 7, dx = (x1 - x0) / (n - 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const ai = Math.round(idx);
  for (let i = 0; i < n; i++) { const x = x0 + i * dx; circ(ctx, x, y, 7, i <= idx + 0.01 ? rgba(C.goud, 0.55) : '#33415C', rgba(C.line, 0.8), 1.5);
    if (Math.abs(i - ai) === 1 && !o.alleenActief) { const bw = s2 => s2.length * 19.8; if (Math.abs(i - ai) * dx > (bw(SP7_MOMENT[i]) + bw(SP7_MOMENT[ai])) / 2 + 24) metaText(ctx, SP7_MOMENT[i], x, y + 46, C.text2, 'center', 28); } }
  const xa = x0 + idx * dx; circ(ctx, xa, y, 12, C.goud); metaText(ctx, SP7_MOMENT[ai], xa, y + 46, C.goud, 'center', 28); ctx.restore(); }

// ---------- emotiemeter (model) ----------
// (x, y) = midden bovenkant van de buis; niv 0..10; o: { rand (koraal), plan (gouden streep op die hoogte), info (0..1 'i'), label (false = geen), grijs, labelTxt }
function SP7_meter(ctx, x, y, niv, a = 1, o = {}) { if (a <= 0.01) return; const h = o.h || 300, w = 46, kl = o.grijs ? '#8A93A6' : C.paars;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, h, w / 2); shape(ctx, '#1B2236', rgba(o.rand ? C.koraal : kl, 0.95), o.rand ? 5 : 2.5);
  const f = clamp(niv / 10, 0, 1), hv = (h - 12) * f; if (hv > 2) { ctx.save(); roundRect(ctx, x - w / 2 + 6, y + 6, w - 12, h - 12, (w - 12) / 2); ctx.clip(); ctx.fillStyle = rgba(kl, 0.9); ctx.fillRect(x - w / 2, y + h - 6 - hv, w, hv + 6); ctx.restore(); }
  for (let i = 1; i < 10; i++) { const yy = y + 6 + (h - 12) * (1 - i / 10); ctx.strokeStyle = rgba('#F2F2EE', i === 5 ? 0.35 : 0.15); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - w / 2 + 8, yy); ctx.lineTo(x - w / 2 + 18, yy); ctx.stroke(); }
  if (o.plan != null) { const yy = y + 6 + (h - 12) * (1 - o.plan / 10); laag(ctx, o.planA == null ? 1 : o.planA, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - w / 2 - 14, yy); ctx.lineTo(x + w / 2 + 14, yy); ctx.stroke(); metaText(ctx, 'PLAN', x + w / 2 + 22, yy + 10, C.goud, 'left', 28); }); }
  if (o.info) laag(ctx, o.info, () => { circ(ctx, x, y + h * 0.3, 19, '#F2F2EE'); text(ctx, 'i', x, y + h * 0.3 + 11, fTitel(32), '#1B2236', 'center'); });
  if (o.label !== false) { if (o.labelTxt) metaText(ctx, o.labelTxt, x, y + h + 40, C.grain, 'center', 28); else { metaText(ctx, 'MODEL ·', x, y + h + 40, C.grain, 'center', 28); metaText(ctx, 'HOE STERK VOELT HET', x, y + h + 72, C.grain, 'center', 28); } }
  ctx.restore(); }

// paars gedachtewolkje naast het hoofd; staart wijst naar (hx, hy)
function SP7_wolk(ctx, x, y, w, h, s2, a = 1, hx = null, hy = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sc = 0.6 + 0.4 * ease(a); ctx.translate(x + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-(x + w / 2), -(y + h / 2));
  ctx.beginPath(); const n = 9; for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rx = w / 2, ry = h / 2; const px2 = x + w / 2 + Math.cos(an) * rx, py2 = y + h / 2 + Math.sin(an) * ry; if (i === 0) ctx.moveTo(px2, py2); else { const am = (i - 0.5) / n * 6.283; ctx.quadraticCurveTo(x + w / 2 + Math.cos(am) * rx * 1.18, y + h / 2 + Math.sin(am) * ry * 1.22, px2, py2); } }
  ctx.closePath(); shape(ctx, '#3B3560', C.paars, 2.5);
  if (hx != null) { const dx = hx - (x + w / 2), dy = hy - (y + h / 2), L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; const bx = x + w / 2 + ux * w * 0.5, by = y + h / 2 + uy * h * 0.55;
    circ(ctx, bx + ux * 22, by + uy * 22, 11, '#3B3560', C.paars, 2); circ(ctx, bx + ux * 50, by + uy * 50, 7, '#3B3560', C.paars, 2); }
  if (s2) text(ctx, s2, x + w / 2, y + h / 2 + px * 0.36, fTekst(px, 700), C.text, 'center'); ctx.restore(); }

// ---------- silhouetten (groepen, telpoppetjes, afzender) ----------
let SP7_off = null;
function SP7_sil(ctx, kleur, fn) { if (!SP7_off) { SP7_off = document.createElement('canvas'); SP7_off.width = W; SP7_off.height = H; } const o = SP7_off.getContext('2d');
  o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.clearRect(0, 0, W, H); fn(o);
  o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, W, H); o.globalCompositeOperation = 'source-over'; ctx.drawImage(SP7_off, 0, 0); }
const SP7_POP = {};
function SP7_popje(kleur) { if (SP7_POP[kleur]) return SP7_POP[kleur]; const c = document.createElement('canvas'); c.width = 60; c.height = 120; const o = c.getContext('2d');
  persoon(o, 'sam', 30, 116, 108, { outfit: 'zwem' }); o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, 60, 120); SP7_POP[kleur] = c; return c; }
function SP7_telpop(ctx, x, y, hgt, kleur, a = 1) { if (a <= 0.01) return; const c = SP7_popje(kleur); ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(c, x - hgt * 0.25, y - hgt, hgt * 0.5, hgt); ctx.restore(); }

// ---------- zwembad (zijaanzicht, s01) ----------
// muur = x van de kopse wand, wl = waterlijn
function SP7_badZij(ctx, muur, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, wl - 120); // hal
  for (let i = 0; i < 9; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(muur + 120 + i * 190, 150, 110, 70); } // ramen hoog in de hal
  ctx.fillStyle = SP7.dek; ctx.fillRect(0, wl - 26, muur, 26); ctx.fillStyle = SP7.dekL; ctx.fillRect(0, wl - 26, muur, 5);
  // startblok op de rand
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, muur - 120, wl - 96, 118, 22, 6); ctx.fill(); ctx.fillStyle = '#8A93A6'; ctx.fillRect(muur - 100, wl - 74, 18, 48); ctx.fillRect(muur - 40, wl - 74, 18, 48);
  // lijn van de baan erachter (drijvers)
  for (let x = muur + 20; x < W; x += 34) { circ(ctx, x, wl - 4, 9, (Math.floor((x - muur) / 34) % 6 < 3) ? '#C9454A' : '#E8E2D4'); }
  ctx.restore(); }
function SP7_waterVoor(ctx, muur, wl, t = 0, golf = 0, gx = 0) { ctx.save(); ctx.fillStyle = SP7.water; ctx.beginPath(); ctx.moveTo(muur, 875);
  for (let x = muur; x <= W; x += 12) { const d = Math.abs(x - gx), g = golf * 7 * Math.exp(-d / 200) * Math.sin(d / 22 - t * 6); ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g); }
  ctx.lineTo(W, 875); ctx.closePath(); ctx.fill(); ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath();
  for (let x = muur; x <= W; x += 12) { const d = Math.abs(x - gx), g = golf * 7 * Math.exp(-d / 200) * Math.sin(d / 22 - t * 6); x === muur ? ctx.moveTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g) : ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g); } ctx.stroke();
  // kopse wand met tegels
  ctx.fillStyle = SP7.tegel; ctx.fillRect(muur - 30, wl - 26, 30, 875 - wl + 26); ctx.strokeStyle = SP7.tegelL; ctx.lineWidth = 1.5; for (let y = wl; y < 875; y += 30) { ctx.beginPath(); ctx.moveTo(muur - 30, y); ctx.lineTo(muur, y); ctx.stroke(); }
  ctx.fillStyle = C.goud; ctx.fillRect(muur - 4, wl - 10, 4, 60); // aantikplaat
  ctx.restore(); }

// ---------- badrand (vooraanzicht, s03 en s06): zit = hoogte van de rand, wl = water ----------
function SP7_badrand(ctx, zit, wl, t = 0, o = {}) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, zit - 140); // hal
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(60 + i * 240, 160, 150, 90); }
  ctx.fillStyle = SP7.dek; ctx.fillRect(0, zit - 70, W, 70); ctx.fillStyle = SP7.dekL; ctx.fillRect(0, zit - 4, W, 6); // vloer van de rand (perspectief)
  ctx.fillStyle = SP7.tegel; ctx.fillRect(0, zit + 2, W, wl - zit); ctx.strokeStyle = SP7.tegelL; ctx.lineWidth = 1.5;
  for (let y = zit + 30; y < wl; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, zit + 2); ctx.lineTo(x, wl); ctx.stroke(); }
  if (o.bord) { ctx.fillStyle = '#2C3850'; roundRect(ctx, 1500, 150, 280, 70, 10); ctx.fill(); metaText(ctx, o.bord, 1640, 197, C.text2, 'center', 28); }
  ctx.restore(); }
function SP7_waterFront(ctx, wl, t = 0) { ctx.save(); ctx.fillStyle = SP7.water; ctx.beginPath(); ctx.moveTo(0, 875); for (let x = 0; x <= W; x += 16) ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.lineTo(W, 875); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) x ? ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3) : ctx.moveTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.stroke();
  for (let i = 0; i < 6; i++) { const x = 140 + i * 310 + Math.sin(t * 0.5 + i) * 20; ctx.strokeStyle = rgba(SP7.waterL, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, wl + 40 + (i % 3) * 30); ctx.lineTo(x + 90, wl + 40 + (i % 3) * 30); ctx.stroke(); }
  ctx.restore(); }

// handdoek om de schouders (vooraanzicht); r = return van persoon()
function SP7_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x - hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x - hh * 0.9, sy - hh * 0.2, x - hh * 0.38, sy - hh * 0.22); ctx.lineTo(x - hh * 0.2, sy + hh * 0.15); ctx.lineTo(x - hh * 0.25, sy + hh * 1.75); ctx.lineTo(x - hh * 0.62, sy + hh * 1.8); ctx.lineTo(x - hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x - hh * 0.95, sy + hh * 0.7, x - hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + hh * 0.9, sy - hh * 0.2, x + hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + hh * 0.95, sy + hh * 0.7, x + hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = hh * 0.08; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 0.24, sy + hh * 1.5); ctx.lineTo(x + s * hh * 0.6, sy + hh * 1.55); ctx.stroke(); }
  ctx.restore(); }
// koptelefoon (vooraanzicht)
function SP7_koptelefoon(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const { x, y, r: R } = r.hoofd; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2A3446'; ctx.lineWidth = R * 0.16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - R * 0.05, R * 1.12, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  for (const s of [-1, 1]) { roundRect(ctx, x + s * R * 1.08 - R * 0.2, y - R * 0.18, R * 0.4, R * 0.62, R * 0.16); shape(ctx, '#2A3446', C.teal, 3); } ctx.restore(); }
// zwevende muzieknoten (teal)
function SP7_noten(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i * 0.25) % 1), xx = x + Math.sin(u * 5 + i) * 30 + i * 22, yy = y - u * 220, al = Math.sin(u * Math.PI);
  ctx.globalAlpha = a * al; ctx.fillStyle = C.teal; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(xx, yy, 13, 10, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(xx + 11, yy - 3); ctx.lineTo(xx + 11, yy - 46); ctx.lineTo(xx + 30, yy - 36); ctx.stroke(); } ctx.restore(); }

// ---------- scorebord ----------
function SP7_bord(ctx, x, y, w, aLim, aTijd, tijd, aVerschil, verschil, o = {}) { const h = o.h || 200; ctx.save(); roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1626', '#56627E', 3);
  laag(ctx, aLim, () => { metaText(ctx, 'LIMIET', x + 36, y + 66, C.goud, 'left', 28); text(ctx, '2:01,50', x + w - 36, y + 72, fMeta(48), C.goud, 'right'); });
  laag(ctx, aTijd, () => { metaText(ctx, 'TIJD', x + 36, y + 136, C.text2, 'left', 28); text(ctx, tijd, x + w - 36, y + 142, fMeta(48), C.text, 'right'); });
  laag(ctx, aVerschil, () => { text(ctx, verschil, x + w - 36, y + h + 62, fTekst(52, 800), o.verschilKl || C.koraal, 'right'); });
  ctx.restore(); }

// ---------- hand van dichtbij (rug van de linkerhand), met stifttekst ----------
// regels: [[tekst, frac 0..1, kleur, streep 0..1]]
function SP7_hand(ctx, x, y, s, regels, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const hu = SP7.huid, hd = '#684636'; ctx.fillStyle = hu; ctx.strokeStyle = hd; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-260, 120); ctx.lineTo(-420, 160); ctx.lineTo(-420, -40); ctx.lineTo(-250, -90); // pols
  ctx.quadraticCurveTo(-120, -150, 60, -140); ctx.lineTo(230, -150); ctx.quadraticCurveTo(250, -100, 240, -60); ctx.lineTo(250, 40); ctx.quadraticCurveTo(250, 120, 160, 140); ctx.quadraticCurveTo(-60, 170, -260, 120); ctx.closePath(); ctx.fill(); ctx.stroke();
  const vinger = (y0, L, d) => { roundRect(ctx, 200, y0 - d / 2, L, d, d / 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(200 + L * 0.55, y0 - d * 0.3); ctx.quadraticCurveTo(200 + L * 0.6, y0, 200 + L * 0.55, y0 + d * 0.3); ctx.stroke(); };
  ctx.fillStyle = hu; vinger(-118, 190, 54); vinger(-58, 220, 58); vinger(4, 205, 56); vinger(64, 160, 50);
  ctx.beginPath(); ctx.moveTo(-40, 150); ctx.quadraticCurveTo(80, 230, 200, 230); ctx.quadraticCurveTo(240, 225, 230, 195); ctx.quadraticCurveTo(120, 170, 40, 120); ctx.closePath(); ctx.fill(); ctx.stroke(); // duim
  ctx.strokeStyle = rgba('#3A2418', 0.45); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(180, -120 + i * 60); ctx.lineTo(-40, -90 + i * 52); ctx.stroke(); } // pezen
  ctx.restore();
  regels.forEach(([s2, fr, kl, streep], i) => { if (fr <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; const px = Math.round(70 * s); ctx.font = fTekst(px, 800); const tw = ctx.measureText(s2).width; const tx = x - 40 * s - tw / 2, ty = y - 20 * s + i * px * 1.25;
    ctx.beginPath(); ctx.rect(tx - 10, ty - px, (tw + 20) * fr, px * 1.4); ctx.clip(); ctx.strokeStyle = rgba('#2A1A12', 0.6); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeText(s2, tx, ty); ctx.fillStyle = kl; ctx.fillText(s2, tx, ty); ctx.restore();
    if (streep > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx - 12, ty - px * 0.32); ctx.lineTo(tx - 12 + (tw + 24) * streep, ty - px * 0.32); ctx.stroke(); ctx.restore(); } }); }
function SP7_stift(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate((ang || 0) - 0.6); roundRect(ctx, -8, -64, 16, 80, 6); shape(ctx, '#20242E', '#4A5266', 2); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-8, -64, 16, 16); ctx.restore(); }

// ---------- tribune (s01) ----------
function SP7_tribune(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, 760);
  for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#2A3854' : '#2F3E5C'; ctx.fillRect(0, 380 + i * 125, W, 125); ctx.fillStyle = '#3E4E6E'; ctx.fillRect(0, 380 + i * 125, W, 10); }
  ctx.restore(); }

// ---------- kamer thuis ----------
function SP7_kamer(ctx, vloer = 800, o = {}) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = SP7.muur; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = SP7.vloer; ctx.fillRect(0, vloer, W, 875 - vloer); ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, vloer - 8, W, 8);
  const wx = o.raam != null ? o.raam : 1180; if (wx >= 0) { roundRect(ctx, wx, 200, 300, 240, 8); shape(ctx, '#121A2A', '#3E4E6E', 6); ctx.strokeStyle = '#3E4E6E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(wx + 150, 200); ctx.lineTo(wx + 150, 440); ctx.stroke();
  circ(ctx, wx + 230, 260, 16, '#D8D2C0'); for (let i = 0; i < 5; i++) circ(ctx, wx + 30 + hash(i * 3) * 100, 230 + hash(i * 7) * 180, 2.5, rgba('#F2F2EE', 0.6)); }
  ctx.restore(); }
function SP7_bank(ctx, x, w, zitY, vloer) { ctx.save(); const k = '#4A5A7C'; roundRect(ctx, x, zitY - 190, w, 200, 26); shape(ctx, '#3E4C6A', null); roundRect(ctx, x - 30, zitY - 70, 60, 120, 20); shape(ctx, k, null); roundRect(ctx, x + w - 30, zitY - 70, 60, 120, 20); shape(ctx, k, null);
  roundRect(ctx, x + 10, zitY - 6, w - 20, 50, 14); shape(ctx, k, null); ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 20, zitY + 40, 16, vloer - zitY - 40); ctx.fillRect(x + w - 36, zitY + 40, 16, vloer - zitY - 40); ctx.restore(); }
function SP7_bankVoor(ctx, x, w, zitY) { ctx.save(); roundRect(ctx, x - 30, zitY - 70, 60, 120, 20); shape(ctx, '#4A5A7C', null); roundRect(ctx, x + w - 30, zitY - 70, 60, 120, 20); shape(ctx, '#4A5A7C', null); ctx.restore(); }
// laptop op een laag tafeltje, scherm schuin naar rechts gedraaid (naar de bank); flikker = 0..1
function SP7_laptop(ctx, x, y, flik) { ctx.save(); ctx.fillStyle = '#3A3226'; ctx.fillRect(x - 120, y, 240, 18); ctx.fillStyle = '#2E281E'; ctx.fillRect(x - 100, y + 18, 14, 120); ctx.fillRect(x + 86, y + 18, 14, 120);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x + 50, y); ctx.lineTo(x + 30, y - 10); ctx.lineTo(x - 80, y - 10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 75, y - 8); ctx.lineTo(x - 30, y - 120); ctx.lineTo(x + 30, y - 104); ctx.lineTo(x + 28, y - 8); ctx.closePath(); ctx.fillStyle = '#5A6070'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 64, y - 14); ctx.lineTo(x - 26, y - 110); ctx.lineTo(x + 22, y - 97); ctx.lineTo(x + 20, y - 14); ctx.closePath(); ctx.fillStyle = mixKl('#9CC4DC', '#C9D8E4', flik); ctx.fill(); ctx.restore(); }
function mixKl(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
// sporttas met wedstrijdverslag; o: morgen (0..1 kalenderblaadje), slot (0..1 dicht), open (0..1 slot weer open)
function SP7_tas(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#F2F2EE'; ctx.save(); ctx.translate(-40, -150); ctx.rotate(-0.18); ctx.fillRect(0, 0, 120, 150); ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 4; i++) ctx.fillRect(14, 30 + i * 22, 90, 5); ctx.restore();
  if (o.label !== false) metaText(ctx, 'WEDSTRIJDVERSLAG', -60, -200, C.text2, 'center', 28);
  roundRect(ctx, -170, -120, 340, 130, 40); shape(ctx, '#2F5FA8', '#264E8C', 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-150, -50); ctx.lineTo(150, -50); ctx.stroke();
  ctx.strokeStyle = '#1E3A6A'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-90, -116); ctx.quadraticCurveTo(0, -210, 90, -116); ctx.stroke();
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-140, -98); ctx.lineTo(140, -98); ctx.stroke(); // rits
  if (o.morgen) laag(ctx, o.morgen, () => { ctx.save(); ctx.translate(120, -150); ctx.rotate(0.12); roundRect(ctx, -10, -30, 150, 120, 8); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = C.koraal; ctx.fillRect(-10, -30, 150, 30); text(ctx, 'MORGEN', 65, 56, fTekst(30, 800), '#121A26', 'center'); ctx.restore(); });
  if (o.slot) { const op = o.open || 0; laag(ctx, o.slot, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -112 - 26 * op, 28, Math.PI, 0); ctx.lineTo(28, -100 - 26 * op); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-28, -112 - 26 * op); ctx.lineTo(-28, -100); ctx.stroke(); roundRect(ctx, -42, -102, 84, 66, 10); shape(ctx, C.koraal, null); circ(ctx, 0, -72, 8, '#121A26'); }); }
  ctx.restore(); }

// bed (vooraanzicht), deken vóór de benen
function SP7_bedAchter(ctx, x, w, zitY) { ctx.save(); roundRect(ctx, x, zitY - 260, w, 270, 18); shape(ctx, '#4A3A30', null); roundRect(ctx, x + 40, zitY - 150, w * 0.5, 130, 40); shape(ctx, '#C9CED6', null); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(x, zitY - 10, w, 40); ctx.restore(); }
function SP7_deken(ctx, x, w, y0, y1) { ctx.save(); ctx.fillStyle = '#4F7AA8'; ctx.beginPath(); ctx.moveTo(x - 10, y1); ctx.lineTo(x - 10, y0 + 30); ctx.quadraticCurveTo(x + w * 0.3, y0 - 14, x + w * 0.55, y0 + 16); ctx.quadraticCurveTo(x + w * 0.8, y0 + 40, x + w + 10, y0 + 10); ctx.lineTo(x + w + 10, y1); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#3E6690'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#3A3026'; ctx.fillRect(x - 10, y1, w + 20, 14); ctx.restore(); }
function SP7_telefoonHand(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); roundRect(ctx, -16, -52, 32, 60, 6); shape(ctx, '#1E2230', '#56627E', 2); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(-12, -46, 24, 46); ctx.restore(); }
function SP7_klokDigit(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 120, y - 60, 240, 90, 14); shape(ctx, '#0F1626', '#56627E', 3); text(ctx, s2, x, y + 14, fMeta(56), C.koraal, 'center'); ctx.restore(); }

// grote telefoon met appjes; berichten: [[tekst, van ('ander'|'zelf'), a]]
function SP7_telefoon(ctx, x, y, w, h, berichten, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 46); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, x + 18, y + 18, w - 36, h - 36, 32); shape(ctx, '#1C2638', null);
  if (o.kop !== false) { ctx.fillStyle = '#25324A'; ctx.fillRect(x + 18, y + 40, w - 36, 90); SP7_sil(ctx, SP7.silL, (c) => persoon(c, 'bilal', x + 80, y + 196, 150, { outfit: 'school' })); ctx.save(); ctx.beginPath(); ctx.rect(x + 18, y + 18, w - 36, 112); ctx.restore(); metaText(ctx, 'TEAMGENOOT', x + 140, y + 96, C.text2, 'left', 28); }
  let yy = y + 190; for (const [s2, van, aa] of berichten) { if (aa <= 0.01) continue; ctx.save(); ctx.globalAlpha *= aa; ctx.font = fTekst(36, 600); const lines = []; let cur = ''; for (const wd of s2.split(' ')) { const tst = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tst).width > w - 170 && cur) { lines.push(cur); cur = wd; } else cur = tst; } lines.push(cur);
    const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 44, bh = lines.length * 44 + 26, zelf = van === 'zelf', bx = zelf ? x + w - 40 - bw : x + 40, by = yy + (1 - ease(aa)) * 30;
    roundRect(ctx, bx, by, bw, bh, 20); shape(ctx, zelf ? '#3A4E6E' : '#E8E4DA', null); lines.forEach((l, i) => text(ctx, l, bx + 22, by + 46 + i * 44, fTekst(36, 600), zelf ? C.text : '#121A26', 'left')); ctx.restore(); yy += bh + 22; }
  ctx.restore(); }

// ---------- praktijk van de sportpsycholoog ----------
function SP7_praktijk(ctx, vloer = 820) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#26344F'; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = '#20293C'; ctx.fillRect(0, vloer, W, 875 - vloer); ctx.fillStyle = '#34445F'; ctx.fillRect(0, vloer - 8, W, 8);
  roundRect(ctx, 120, 190, 260, 300, 8); shape(ctx, '#33506A', '#4A5C7A', 8); ctx.strokeStyle = '#4A5C7A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(250, 490); ctx.moveTo(120, 340); ctx.lineTo(380, 340); ctx.stroke(); // raam (dag)
  ctx.fillStyle = rgba(C.groen, 0.35); ctx.beginPath(); ctx.ellipse(200, 450, 60, 30, 0, 0, 6.283); ctx.fill(); // boom buiten
  // plant
  ctx.fillStyle = '#8A6A4A'; ctx.beginPath(); ctx.moveTo(40, vloer); ctx.lineTo(30, vloer - 90); ctx.lineTo(110, vloer - 90); ctx.lineTo(100, vloer); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.32; ctx.fillStyle = i % 2 ? '#5F9A6E' : '#6FAE7E'; ctx.save(); ctx.translate(70, vloer - 90); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -80, 20, 80, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
function SP7_tafeltje(ctx, x, y, vloer) { ctx.save(); ctx.fillStyle = '#7A6248'; roundRect(ctx, x - 110, y, 220, 16, 6); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(x - 8, y + 16, 16, vloer - y - 22); ctx.fillRect(x - 60, vloer - 10, 120, 10); ctx.restore(); }
function SP7_blok(ctx, x, y, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -34, -46, 68, 92, 6); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 4; i++) ctx.fillRect(-24, -26 + i * 16, 48, 3); ctx.fillStyle = C.goud; ctx.fillRect(-34, -46, 68, 10); ctx.restore(); }

// wedstrijdverslag met splittijden; o: snel (0..1 gouden cirkel op de eerste), laatste (0..1 koraal op de laatste)
function SP7_verslag(ctx, x, y, w, splits, a = 1, o = {}) { if (a <= 0.01) return; const h = o.h || 190; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2);
  metaText(ctx, o.kop || 'VERSLAG · 200 M VRIJE SLAG', x + 30, y + 46, '#56627E', 'left', 28); const dx = (w - 60) / 4;
  splits.forEach((s2, i) => { const cx = x + 30 + dx * (i + 0.5); metaText(ctx, ((i + 1) * 50) + ' M', cx, y + 98, '#56627E', 'center', 28); const kl = (i === 3 && o.laatste) ? mixKl('#121A26', '#C9553A', o.laatste) : '#121A26'; text(ctx, s2, cx, y + 154, fMeta(38), kl, 'center');
    if (i === 0 && o.snel) laag(ctx, o.snel, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, y + 140, dx * 0.48, 36, 0, 0, 6.283 * o.snel); ctx.stroke(); });
    if (i === 3 && o.laatste && o.ring) laag(ctx, o.ring, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, y + 140, dx * 0.48, 36, 0, 0, 6.283 * o.ring); ctx.stroke(); }); });
  ctx.restore(); if (o.snel) metaA(ctx, o.snelTxt || 'TE SNEL', x + 30 + dx * 0.5, y + h + 40, o.snel, C.goud, 'center'); }

// tablet met keerpunt in zijaanzicht (video); t = tijd
function SP7_tablet(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); shape(ctx, '#11161F', '#56627E', 4);
  ctx.save(); roundRect(ctx, x + 16, y + 16, w - 32, h - 32, 12); ctx.clip(); ctx.fillStyle = SP7.waterD; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#202E48'; ctx.fillRect(x, y, w, 70);
  ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 72); ctx.lineTo(x + w, y + 72); ctx.stroke();
  const mx = x + 34; ctx.fillStyle = SP7.tegel; ctx.fillRect(x + 16, y + 60, 18, h); // wand links
  const L = 180, sl = (o.slap != null ? o.slap : 1), u = (t % 3) / 3, xx = mx + 40 + (1 - Math.pow(1 - u, 2)) * w * (sl ? 0.35 : 0.6), yy = y + 72 + 0.12 * L + (1 - u) * 0.25 * L;
  zwemmer(ctx, 'sam', xx, yy, L, { slag: 'onderwater', t, kijk: 1 }); ctx.restore();
  ctx.fillStyle = C.koraal; circ(ctx, x + 50, y + 44, 10, C.koraal); metaText(ctx, 'VIDEO', x + 70, y + 54, C.text, 'left', 28); ctx.restore(); }

// drie doeltreden (even groot); o: vul {u,p,r} 0..1 gevuld, vraag 0..1, hl index, weg {u,p,r}
const SP7_TREDE = [['UITKOMST', 'de finale'], ['PRESTATIE', 'een tijd'], ['PROCES', 'wat je doet']];
function SP7_treden(ctx, x, y, w, aa, o = {}) { const h = 104, gap = 22; for (let i = 0; i < 3; i++) { const a = aa[i] * (1 - ((o.weg || [])[i] || 0)); if (a <= 0.01) continue; const yy = y + i * (h + gap); const hl = (o.hl || [])[i] || 0, vul = (o.vul || [])[i] || 0;
    laag(ctx, a, () => { roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(C.goud, 0.08 + 0.22 * vul), mixKl('#B89A50', '#F2D27A', hl), 2 + 3 * hl); metaText(ctx, SP7_TREDE[i][0], x + 28, yy + 44, C.goud, 'left', 28); text(ctx, SP7_TREDE[i][1], x + 28, yy + 88, fTekst(36, 700), C.text, 'left');
      const ex = (o.extra || [])[i]; if (ex && ex[1] > 0.01) metaA(ctx, ex[0], x + w - 28, yy + 66, ex[1], ex[2] || C.text2, 'right');
      if (o.vraag) laag(ctx, o.vraag, () => text(ctx, '?', x + w - 50, yy + 76, fTitel(64), C.goud, 'center')); }); } }

// ---------- weegschaal (goud) ----------
function SP7_weegschaal(ctx, x, y, kant, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = 300; ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 300); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 90, y + 300); ctx.lineTo(x + 90, y + 300); ctx.stroke(); circ(ctx, x, y, 12, C.goud);
  const dx = Math.cos(kant) * L, dy = Math.sin(kant) * L; ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x + dx, y + dy); ctx.stroke();
  for (const [s, lab, sub, hl] of [[-1, 'VERWACHT', '2:01', o.hlL || 0], [1, 'GEZWOMMEN', '2:02,7', 0]]) { const px = x + s * dx, py = y + s * dy; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 90, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 90, py + 110); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 120, py + 110); ctx.quadraticCurveTo(px, py + 160, px + 120, py + 110); ctx.closePath(); shape(ctx, rgba(C.goud, 0.25), C.goud, 3);
    roundRect(ctx, px - 130, py + 170, 260, 110, 14); shape(ctx, rgba('#0D1420', 0.9), mixKl('#8FA0B5', '#E0B64A', hl), 2 + 3 * hl); metaText(ctx, lab, px, py + 212, C.grain, 'center', 28); text(ctx, sub, px, py + 264, fMeta(44), C.text, 'center'); }
  ctx.restore(); }
// schuifje (sterkte / duur): pos 0..1
function SP7_schuif(ctx, x, y, h, pos, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 8, y, 16, h, 8); shape(ctx, '#2A3446', C.line, 1.5); const yy = y + h * (1 - pos);
  roundRect(ctx, x - 30, yy - 16, 60, 32, 10); shape(ctx, C.paars, '#B8AEE0', 2); metaText(ctx, lab, x, y + h + 40, C.grain, 'center', 28); ctx.restore(); }
function SP7_deur(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 170, 120, 170, 6); shape(ctx, '#2A3446', C.koraal, 3); circ(ctx, x + 36, y - 82, 6, C.koraal); metaText(ctx, 'WEG', x, y - 190, C.koraal, 'center', 28); ctx.restore(); }

// ---------- masker (lijntekening, naast het hoofd) ----------
function SP7_masker(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -80); ctx.bezierCurveTo(62, -80, 70, -20, 64, 20); ctx.bezierCurveTo(56, 70, 22, 92, 0, 92); ctx.bezierCurveTo(-22, 92, -56, 70, -64, 20); ctx.bezierCurveTo(-70, -20, -62, -80, 0, -80); ctx.closePath();
  shape(ctx, '#D8DCE4', '#9AA3B2', 3); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.ellipse(-26, -6, 14, 8, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(26, -6, 14, 8, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#56627E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, 50); ctx.lineTo(20, 50); ctx.stroke(); ctx.restore(); }

// ---------- buiten lopen (Bratman) ----------
function SP7_wandelKader(ctx, x, y, w, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(C.line, 0.9), 2); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  const hw = w / 2, gy = y + h - 60; // groen
  ctx.fillStyle = '#24402E'; ctx.fillRect(x, y, hw, h); ctx.fillStyle = '#3A5540'; ctx.fillRect(x, gy, hw, 60); ctx.fillStyle = '#8A7A5A'; ctx.fillRect(x, gy, hw, 12);
  for (let i = 0; i < 4; i++) { const bx = x + 50 + i * 100; ctx.fillStyle = '#5A4232'; ctx.fillRect(bx - 6, gy - 80, 12, 80); ctx.fillStyle = i % 2 ? '#5F9A6E' : '#4F8A5E'; ctx.beginPath(); ctx.ellipse(bx, gy - 120, 50, 64, 0, 0, 6.283); ctx.fill(); }
  // stad
  ctx.fillStyle = '#2A2F3E'; ctx.fillRect(x + hw, y, hw, h); for (let i = 0; i < 5; i++) { const bx = x + hw + 10 + i * 82, bh = 120 + hash(i * 4.1) * 120; ctx.fillStyle = '#3E4458'; ctx.fillRect(bx, gy - bh, 70, bh); ctx.fillStyle = rgba('#E0B64A', 0.35); for (let j = 0; j < 4; j++) ctx.fillRect(bx + 12 + (j % 2) * 28, gy - bh + 20 + Math.floor(j / 2) * 34, 16, 18); }
  ctx.fillStyle = '#4A4E5A'; ctx.fillRect(x + hw, gy, hw, 60); ctx.fillStyle = '#C9CED6'; for (let i = 0; i < 5; i++) ctx.fillRect(x + hw + 20 + i * 90, gy + 32, 46, 6);
  // auto
  const ax = x + hw + ((t * 120) % (hw + 200)) - 100; ctx.fillStyle = C.koraal; roundRect(ctx, ax, gy + 8, 110, 30, 10); ctx.fill(); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(ax + 26, gy + 12, 50, 10); circ(ctx, ax + 24, gy + 40, 9, '#121A26'); circ(ctx, ax + 86, gy + 40, 9, '#121A26');
  ctx.restore();
  persoon(ctx, 'erik', x + hw * 0.45, gy + 10, 150, { zij: true, kijk: 1, gang: 'loop', t, outfit: undefined });
  persoon(ctx, 'passant', x + hw * 1.45, gy + 10, 150, { zij: true, kijk: 1, gang: 'loop', t: t + 0.3 });
  ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + hw, y); ctx.lineTo(x + hw, y + h); ctx.stroke();
  metaText(ctx, 'GROEN', x + 24, y + 44, C.groen, 'left', 28); metaText(ctx, 'STAD', x + hw + 24, y + 44, C.text2, 'left', 28);
  ctx.restore(); }

// ---------- weekrooster ----------
const SP7_DAG = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
// cellen: per dag [ochtend, middag, avond] = 't' training, 's' toets, '' leeg; o.vrij = index dag met vrije avond (0..1 = a)
function SP7_rooster(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const cel = o.cel || [['t', 's', 't'], ['', 's', 't'], ['t', '', 't'], ['', 's', 't'], ['t', '', 't'], ['t', '', ''], ['', '', 't']];
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(C.line, 0.9), 2); const kx = x + 30, kw = (w - 60) / 7, ky = y + 70, kh = (h - 100) / 3;
  SP7_DAG.forEach((d, i) => metaText(ctx, d, kx + kw * (i + 0.5), y + 50, C.text2, 'center', 28));
  for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) { const c = cel[i][j], cx = kx + kw * i + 6, cy = ky + kh * j + 6; const vr = o.vrij != null && o.vrij === i && j === 2;
    roundRect(ctx, cx, cy, kw - 12, kh - 12, 10); if (vr && o.vrijA > 0.01) { shape(ctx, mixKl(c === 't' ? '#2E5A74' : '#2A3446', '#5A4A20', o.vrijA), mixKl('#5BA4C9', '#E0B64A', o.vrijA), 2 + 2 * o.vrijA); if (o.vrijA > 0.5) metaText(ctx, 'VRIJ', cx + (kw - 12) / 2, cy + (kh - 12) / 2 + 10, C.goud, 'center', 28); continue; }
    shape(ctx, c === 't' ? rgba(C.teal, 0.55) : c === 's' ? rgba(C.oker, 0.6) : '#232E44', c === 't' ? C.teal : c === 's' ? C.oker : '#33415C', 1.5); }
  if (o.legenda !== false) { const ly = y + h + 46; roundRect(ctx, x, ly - 24, 30, 30, 6); shape(ctx, rgba(C.teal, 0.55), C.teal, 1.5); metaText(ctx, 'TRAINEN', x + 44, ly, C.text2, 'left', 28); roundRect(ctx, x + 280, ly - 24, 30, 30, 6); shape(ctx, rgba(C.oker, 0.6), C.oker, 1.5); metaText(ctx, 'TOETS', x + 324, ly, C.text2, 'left', 28); }
  ctx.restore(); }

// ---------- baan van bovenaf + zwemmer van bovenaf ----------
function SP7_baanBoven(ctx, x0, x1, y, h) { ctx.save(); roundRect(ctx, x0 - 30, y - 30, x1 - x0 + 60, h + 60, 14); shape(ctx, SP7.dek, null); ctx.fillStyle = SP7.water; ctx.fillRect(x0, y, x1 - x0, h);
  for (const yy of [y + 6, y + h - 6]) for (let x = x0 + 10; x < x1; x += 24) circ(ctx, x, yy, 7, (Math.floor((x - x0) / 24) % 8 < 4) ? '#C9454A' : '#E8E2D4');
  ctx.fillStyle = '#1E3A56'; ctx.fillRect(x0 + 60, y + h / 2 - 8, x1 - x0 - 120, 16); ctx.fillRect(x0 + 60, y + h / 2 - 30, 16, 60); ctx.fillRect(x1 - 76, y + h / 2 - 30, 16, 60); // zwarte lijn op de bodem
  ctx.restore(); }
// zwemmer van bovenaf; dir 1 = naar rechts; s = lichaamslengte in px
function SP7_bovenZwemmer(ctx, x, y, s, dir, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); const ph = t * 0.8 * 6.283, hu = SP7.huid;
  ctx.strokeStyle = hu; ctx.lineCap = 'round'; ctx.lineWidth = s * 0.07; for (const k of [-1, 1]) { const sw = Math.sin(t * 9 + (k > 0 ? 0 : Math.PI)) * s * 0.03; ctx.beginPath(); ctx.moveTo(-s * 0.08, k * s * 0.05); ctx.lineTo(-s * 0.5, k * s * 0.045 + sw); ctx.stroke(); }
  ctx.fillStyle = hu; ctx.beginPath(); ctx.ellipse(0.06 * s, 0, s * 0.2, s * 0.1, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-0.1 * s, 0, s * 0.07, s * 0.085, 0, 0, 6.283); ctx.fill();
  for (const k of [-1, 1]) { const p = ph + (k > 0 ? 0 : Math.PI), reach = Math.cos(p); ctx.strokeStyle = hu; ctx.lineWidth = s * 0.06; ctx.beginPath(); ctx.moveTo(s * 0.18, k * s * 0.09); ctx.lineTo(s * 0.18 + reach * s * 0.32, k * s * (0.1 + 0.06 * Math.abs(Math.sin(p)))); ctx.stroke(); }
  circ(ctx, s * 0.32, 0, s * 0.075, '#D8573F'); ctx.restore(); }

// ---------- staafjes ----------
function SP7_staaf(ctx, x, base, w, hgt, kl, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (hgt > 1) { roundRect(ctx, x - w / 2, base - hgt, w, hgt, 8); shape(ctx, rgba(kl, 0.75), kl, 2); }
  if (lab) { const ls = Array.isArray(lab) ? lab : [lab]; ls.forEach((l, i) => metaText(ctx, l, x, base + 40 + i * 32, o.labKl || C.text2, 'center', 28)); } ctx.restore(); }
function SP7_hartje(ctx, x, y, s, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-26, -6, -14, -30, 0, -16); ctx.bezierCurveTo(14, -30, 26, -6, 0, 12); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }

// opleidingskaart
function SP7_opleiding(ctx, x, y, w, h, regels, a = 1, dx = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(dx * (1 - ease(a)), 0); kaart(ctx, x, y, w, h, 1, C.goud);
  regels.forEach(([s2, soort], i) => { if (soort === 'meta') metaText(ctx, s2, x + 34, y + 56 + i * 52, C.goud, 'left', 28); else text(ctx, s2, x + 34, y + 60 + i * 52, fTekst(soort === 'groot' ? 44 : 36, soort === 'groot' ? 800 : 600), C.text, 'left'); }); ctx.restore(); }

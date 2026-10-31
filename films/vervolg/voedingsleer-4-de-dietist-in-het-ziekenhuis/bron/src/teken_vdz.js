// Wat word jij? · Voeding en diëtetiek 4 · Eten als behandeling — eigen tekeningen (v1.0, 31 okt 2026).
// Schema-look: navy, gedempte vlakke kleuren, dunne lichtere rand. Kleuren: oker = voedsel, koraal = energie/spier die verdwijnt (ook aminozuren),
// teal = water, groen = positief, goud = focus; eigen: rood-oranje KAL = kalium, lichtblauw FOS = fosfaat, grijs ZOUT = zout, geel VET = vet.

const KAL = '#D8604A', FOS = '#86C3E8', ZOUT = '#B8BEC8', VET = '#E8C860', GLUC = '#DCC07F';

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860;
function vloer(ctx, y = 862, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#2B3442', 0.85); ctx.fillRect(0, y, W, 24); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); ctx.restore(); }

// ---------- hulpjes (zoals gz3/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 60, 12); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 24, y + 18); ctx.lineTo(x + 46, y + 30); ctx.lineTo(x + 24, y + 42); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 60, y + 25, C.text2, 'left', 28); text(ctx, s2, x + 60, y + 49, fTekst(26, 700), C.text, 'left'); ctx.restore(); }
function slotje(ctx, x, y, s = 1, a = 1, col = C.text2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.arc(x, y - 10 * s, 13 * s, Math.PI, 0); ctx.lineTo(x + 13 * s, y); ctx.moveTo(x - 13 * s, y - 10 * s); ctx.lineTo(x - 13 * s, y); ctx.stroke(); roundRect(ctx, x - 20 * s, y - 2 * s, 40 * s, 30 * s, 5 * s); shape(ctx, col, null); circ(ctx, x, y + 11 * s, 4 * s, '#1A2740'); ctx.restore(); }
function tekstKaart(ctx, x, y, w, regels, a = 1, rand = C.goud, px = 30) { if (a <= 0.01) return; const h = 40 + regels.length * (px + 14); kaart(ctx, x, y, w, h, a, rand); laag(ctx, a, () => regels.forEach((r, i) => { const [s2, col] = Array.isArray(r) ? r : [r, C.text]; metaText(ctx, s2, x + 28, y + 26 + px + i * (px + 14), col, 'left', px * 0.86); })); return h; }

// ---------- garderobe-aanvulling (alleen in deze film, lib_cast blijft ongewijzigd) ----------
// Mevrouw Jansen in het ziekenhuis: lichtblauw ziekenhuishemd onder haar eigen groene vest, pyjamabroek en pantoffels
CAST.buurvrouw.garderobe.ziekenhuis = { binnen: '#BFD3E2', broek: '#9FB8CC', schoen: '#8A6E5A', schoenAccent: '#6E5646', accessoire: [] };
// Erik (naamloze nierpatiënt): gewone trui
CAST.erik.garderobe = Object.assign(CAST.erik.garderobe || {}, { trui: { top: 'trui', topKleur: '#5A7A9A', topAccent: '#4A6684', broek: '#3E4658' } });

// naamkaartje op de borst (Hanneke in het ziekenhuis); r = ankerpunten van persoon()
function naamkaartje(ctx, r, kijk = 1, a = 1, col = C.groen) { if (a <= 0.01 || !r || !r.hoofd) return; const { x, y, r: hr } = r.hoofd, hy = r.heup.y;
  const bx = x - kijk * hr * 0.55, by = y + (hy - y) * 0.36, w = hr * 0.62, h = hr * 0.36; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, bx - w / 2, by - h / 2, w, h, 3); shape(ctx, '#F4F2EC', '#C8C4BA', 1); ctx.fillStyle = col; ctx.fillRect(bx - w / 2, by - h / 2, w, h * 0.3);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(bx - w * 0.36, by + h * 0.02, w * 0.72, h * 0.13); ctx.fillRect(bx - w * 0.36, by + h * 0.25, w * 0.46, h * 0.1); ctx.restore(); }

// ---------- ziekenhuisbed in vooraanzicht (naar henkInBed, Verpleegkunde 1), met een willekeurig castpersonage en outfit ----------
// o: t, uit, kijk, outfit, adem, deken (kleur), hold (in de hand op de deken: fn(ctx,x,y))
function inBed(ctx, id, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.translate(x, y - 430 * s); ctx.beginPath(); ctx.moveTo(-210 * s, 210 * s); ctx.lineTo(-180 * s, -200 * s); ctx.quadraticCurveTo(0, -240 * s, 180 * s, -200 * s); ctx.lineTo(210 * s, 210 * s); ctx.closePath(); shape(ctx, '#55657F', '#7D8CA6', 2 * s);
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(-150 * s, -150 * s); ctx.quadraticCurveTo(0, -180 * s, 150 * s, -150 * s); ctx.stroke(); ctx.restore();
  roundRect(ctx, x - 165 * s, y - 640 * s, 330 * s, 190 * s, 70 * s); shape(ctx, '#E6EAEE', '#C4CCD6', 2 * s);
  const P0 = CAST[id], PO = Object.assign({}, P0, (P0.garderobe && o.outfit && P0.garderobe[o.outfit]) || {});
  const yB = y - 330 * s, h = 560 * s, L = P0.lengte || 1, hh = h * L / 6.1, top = yB - 2.6 * hh, voet = top + h * L;
  const fr = (o.adem || 14) / 60, b = Math.sin(t * fr * 6.283);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 400 * s, 0, 800 * s, yB + 6 * s); ctx.clip();
  ctx.translate(x, yB); ctx.scale(1 + 0.01 * b, 1 + 0.018 * b); ctx.translate(-x, -yB);
  const P = persoon(ctx, id, x, voet, h, { t, uit: o.uit || 'neutraal', kijk: o.kijk || 1, outfit: o.outfit }); ctx.restore();
  const dk = o.deken || '#8DB3D0', dkL = lighten(dk, 0.2);
  ctx.beginPath(); ctx.moveTo(x - 255 * s, y - 150 * s); ctx.lineTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 255 * s, y - 150 * s); ctx.closePath();
  shape(ctx, dk, dkL, 2 * s); ctx.fillStyle = '#E6EAEE'; ctx.beginPath(); ctx.moveTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 250 * s, yB + 44 * s); ctx.bezierCurveTo(x + 150 * s, yB + 20 * s, x - 150 * s, yB + 20 * s, x - 250 * s, yB + 44 * s); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba('#5E86A6', 0.6); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 120 * s, yB + 70 * s); ctx.quadraticCurveTo(x - 90 * s, yB + 120 * s, x - 130 * s, y - 160 * s); ctx.moveTo(x + 140 * s, yB + 80 * s); ctx.quadraticCurveTo(x + 110 * s, yB + 130 * s, x + 150 * s, y - 160 * s); ctx.stroke();
  // twee handen op de deken (mouw in de kleur van het bovenstuk)
  const hand = (hx, hy, sd) => { ctx.fillStyle = PO.topKleur; ctx.beginPath(); ctx.ellipse(hx - sd * 46 * s, hy + 4 * s, 34 * s, 22 * s, sd * -0.15, 0, 6.283); ctx.fill();
    ctx.fillStyle = PO.huid; ctx.beginPath(); ctx.ellipse(hx, hy, 30 * s, 19 * s, sd * -0.1, 0, 6.283); ctx.fill(); };
  const hxR = x + 120 * s, hyR = yB + 70 * s, hxL = x - 120 * s; hand(hxR, hyR, 1); hand(hxL, hyR + 6 * s, -1);
  if (o.hold) o.hold(ctx, hxR + 10 * s, hyR - 10 * s);
  ctx.fillStyle = '#6A7590'; ctx.fillRect(x - 265 * s, y - 160 * s, 530 * s, 22 * s);
  roundRect(ctx, x - 280 * s, y - 250 * s, 560 * s, 150 * s, 18 * s); shape(ctx, '#C9D2E0', '#8FA0B5', 2.5 * s); roundRect(ctx, x - 250 * s, y - 225 * s, 500 * s, 100 * s, 12 * s); shape(ctx, '#B4BFD0', null);
  roundRect(ctx, x - 70 * s, y - 205 * s, 140 * s, 60 * s, 6 * s); shape(ctx, '#F2F2EE', '#8FA0B5', 1.5 * s); ctx.fillStyle = '#5A6478'; for (let i = 0; i < 3; i++) ctx.fillRect(x - 52 * s, y - 192 * s + i * 16 * s, (90 - i * 24) * s, 5 * s);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 250 * s, y - 100 * s, 14 * s, 76 * s); ctx.fillRect(x + 236 * s, y - 100 * s, 14 * s, 76 * s); circ(ctx, x - 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s); circ(ctx, x + 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s);
  ctx.restore(); return Object.assign({}, P, { hand: { x: hxR, y: hyR }, handL: { x: hxL, y: hyR } }); }
const JANSEN_BED = { x: 1150, y: 880, s: 0.92 };
function jansenInBed(ctx, t, o = {}) { return inBed(ctx, 'buurvrouw', JANSEN_BED.x, JANSEN_BED.y, JANSEN_BED.s, Object.assign({ t, outfit: 'ziekenhuis', kijk: 1, deken: '#9FB7C9' }, o)); }

// ---------- dienbladen en de kar ----------
function soepKom(ctx, x, y, s, vol = 1) { ctx.beginPath(); ctx.ellipse(x, y, 46 * s, 30 * s, 0, 0, 6.283); shape(ctx, '#E8E4DC', '#FFFFFF', 1.5); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 38 * s, 23 * s, 0, 0, 6.283); shape(ctx, vol > 0.5 ? '#D9944E' : '#E0DAD0', null);
  if (vol > 0.5) { circ(ctx, x - 12 * s, y - 6 * s, 5 * s, '#E8B870'); circ(ctx, x + 10 * s, y + 4 * s, 4 * s, '#7FAE6A'); circ(ctx, x + 16 * s, y - 8 * s, 4 * s, '#E8B870'); } }
function boterhamBord(ctx, x, y, s, hap = 1, leeg = 0) { ctx.beginPath(); ctx.ellipse(x, y, 62 * s, 40 * s, 0, 0, 6.283); shape(ctx, '#EEEAE2', '#FFFFFF', 1.5); if (leeg > 0.5) { circ(ctx, x + 10 * s, y + 6 * s, 3 * s, '#B88A52'); circ(ctx, x - 14 * s, y - 4 * s, 2 * s, '#B88A52'); return; }
  ctx.save(); ctx.beginPath(); ctx.rect(x - 80 * s, y - 60 * s, 160 * s, 120 * s); if (hap) { ctx.moveTo(x + 70 * s, y - 30 * s); ctx.arc(x + 44 * s, y - 30 * s, 26 * s, 0, 6.283, true); } ctx.clip('evenodd');
  roundRect(ctx, x - 44 * s, y - 30 * s, 88 * s, 60 * s, 14 * s); shape(ctx, '#C29A5A', '#D8B47A', 1.5); roundRect(ctx, x - 36 * s, y - 23 * s, 72 * s, 46 * s, 10 * s); shape(ctx, '#E8D49A', null); ctx.restore(); }
function vlaBakje(ctx, x, y, s, open = 0) { roundRect(ctx, x - 30 * s, y - 24 * s, 60 * s, 48 * s, 10 * s); shape(ctx, '#F2EEE4', '#FFFFFF', 1.5); roundRect(ctx, x - 26 * s, y - 20 * s, 52 * s, 40 * s, 8 * s); shape(ctx, open > 0.5 ? '#E8D4A0' : '#D8DEE6', null);
  if (open <= 0.5) { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 16 * s, y); ctx.lineTo(x + 16 * s, y); ctx.stroke(); } }
// dienblad van boven: kaartje (bv. 'KAMER 12 · MA'); leeg = 0..1 (alles op)
function dienblad(ctx, x, y, s, kaartje, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 190 * s, y - 120 * s, 380 * s, 240 * s, 22 * s); shape(ctx, '#6E8094', '#9AAABB', 2.5); roundRect(ctx, x - 176 * s, y - 106 * s, 352 * s, 212 * s, 16 * s); shape(ctx, '#7E90A4', null);
  const leeg = o.leeg || 0; soepKom(ctx, x - 90 * s, y - 34 * s, s, leeg > 0.5 ? 0 : 1); boterhamBord(ctx, x + 70 * s, y - 30 * s, s, 1, leeg); vlaBakje(ctx, x - 96 * s, y + 62 * s, s, leeg);
  if (o.lepel !== false) { ctx.strokeStyle = '#D8DEE6'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 10 * s, y + 70 * s); ctx.lineTo(x + 100 * s, y + 70 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + 112 * s, y + 70 * s, 14 * s, 8 * s, 0, 0, 6.283); ctx.fillStyle = '#D8DEE6'; ctx.fill(); }
  if (kaartje) { ctx.save(); ctx.translate(x + 120 * s, y + 104 * s); ctx.rotate(-0.06); ctx.font = fMeta(Math.round(20 * s)); ctx.letterSpacing = '3px'; const kw = ctx.measureText(kaartje).width + 30 * s; ctx.letterSpacing = '0px'; roundRect(ctx, -kw / 2, -26 * s, kw, 52 * s, 6 * s); shape(ctx, '#F4F2EC', '#C8C4BA', 1.5); metaText(ctx, kaartje, 0, 8 * s, '#2A3446', 'center', Math.round(20 * s)); ctx.restore(); }
  ctx.restore(); }
// dienbladenkar in zijaanzicht: plank = aantal bladen dat erin staat
function kar(ctx, x, y, s = 1, a = 1, n = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 300 * s, h = 470 * s;
  roundRect(ctx, x - w / 2, y - h, w, h - 30 * s, 14 * s); shape(ctx, '#3E4C60', '#7D8CA6', 2.5); roundRect(ctx, x - w / 2 + 16 * s, y - h + 16 * s, w - 32 * s, h - 62 * s, 8 * s); shape(ctx, '#2A3446', null);
  for (let i = 0; i < 6; i++) { const yy = y - h + 40 * s + i * 66 * s; ctx.fillStyle = '#56657C'; ctx.fillRect(x - w / 2 + 16 * s, yy + 30 * s, w - 32 * s, 5 * s); if (i < n) { roundRect(ctx, x - w / 2 + 22 * s, yy + 14 * s, w - 44 * s, 16 * s, 4 * s); shape(ctx, '#7E90A4', '#9AAABB', 1); } }
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w / 2, y - h + 40 * s); ctx.lineTo(x + w / 2 + 40 * s, y - h + 40 * s); ctx.lineTo(x + w / 2 + 40 * s, y - h + 120 * s); ctx.stroke();
  for (const dx of [-w / 2 + 30 * s, w / 2 - 30 * s]) circ(ctx, x + dx, y - 14 * s, 15 * s, '#2A3242', '#5A6478', 3);
  ctx.restore(); }

// ---------- drinkvoeding, rekenblok, tablet, klembord ----------
function flesje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 22 * s, y + 46 * s); ctx.lineTo(x - 22 * s, y - 14 * s); ctx.quadraticCurveTo(x - 22 * s, y - 34 * s, x - 10 * s, y - 40 * s); ctx.lineTo(x + 10 * s, y - 40 * s); ctx.quadraticCurveTo(x + 22 * s, y - 34 * s, x + 22 * s, y - 14 * s); ctx.lineTo(x + 22 * s, y + 46 * s); ctx.closePath(); shape(ctx, '#EDE6D6', '#FFFFFF', 1.5);
  roundRect(ctx, x - 12 * s, y - 56 * s, 24 * s, 18 * s, 4 * s); shape(ctx, C.oker, null); roundRect(ctx, x - 22 * s, y - 2 * s, 44 * s, 30 * s, 2); shape(ctx, rgba(C.oker, 0.85), null); ctx.restore(); }
function rekenblok(ctx, x, y, s = 1) { roundRect(ctx, x - 34 * s, y - 46 * s, 68 * s, 92 * s, 8 * s); shape(ctx, '#3A4454', '#7D8CA6', 2); roundRect(ctx, x - 26 * s, y - 38 * s, 52 * s, 22 * s, 3 * s); shape(ctx, '#B8D8C0', null);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { roundRect(ctx, x - 26 * s + c * 18 * s, y - 8 * s + r * 17 * s, 14 * s, 12 * s, 2 * s); shape(ctx, '#C8D0DA', null); } }
function tablet(ctx, x, y, s = 1, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -46 * s, -34 * s, 92 * s, 68 * s, 8 * s); shape(ctx, '#1E232C', '#5A6070', 2); roundRect(ctx, -38 * s, -26 * s, 76 * s, 52 * s, 4 * s); shape(ctx, '#2E4A66', null);
  ctx.fillStyle = rgba(C.text, 0.7); for (let i = 0; i < 3; i++) ctx.fillRect(-30 * s, -18 * s + i * 14 * s, (54 - i * 10) * s, 5 * s); ctx.restore(); }
function klembord(ctx, x, y, s = 1) { roundRect(ctx, x - 30 * s, y - 40 * s, 60 * s, 80 * s, 6 * s); shape(ctx, '#B98A52', '#D8B47A', 1.5); roundRect(ctx, x - 24 * s, y - 32 * s, 48 * s, 68 * s, 3 * s); shape(ctx, '#F2EEE4', null); roundRect(ctx, x - 12 * s, y - 46 * s, 24 * s, 12 * s, 3 * s); shape(ctx, '#8A9AAE', null);
  ctx.fillStyle = '#5A6478'; for (let i = 0; i < 4; i++) ctx.fillRect(x - 18 * s, y - 20 * s + i * 13 * s, (36 - (i % 2) * 10) * s, 4 * s); }
function weegschaal(ctx, x, y, s = 1, a = 1, kg = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80 * s, y - 22 * s, 160 * s, 22 * s, 8 * s); shape(ctx, '#C4CCD8', '#E8EEF4', 1.5); roundRect(ctx, x - 30 * s, y - 18 * s, 60 * s, 13 * s, 3); shape(ctx, '#2E3442', null);
  if (kg) text(ctx, kg, x, y - 7 * s, fTekst(12 * s, 800), '#7FE0A0', 'center'); ctx.restore(); }

// ---------- screening bij opname ----------
function screening(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 640;
  roundRect(ctx, x, y, w, 420, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, x + w / 2 - 60, y - 16, 120, 32, 6); shape(ctx, '#8A9AAE', null);
  text(ctx, 'SCREENING BIJ OPNAME', x + 36, y + 62, fTekst(32, 800), '#2A3446', 'left');
  const V = [['onbedoeld afgevallen?', o.v1 || 0, o.q1], ['minder trek?', o.v2 || 0, o.q2], ['al drink- of sondevoeding?', 0, o.q3]];
  V.forEach(([s2, v, qa], i) => { const yy = y + 130 + i * 76, qa2 = qa == null ? 1 : qa; ctx.save(); ctx.globalAlpha *= qa2; ctx.strokeStyle = '#8A9AAE'; ctx.lineWidth = 3; ctx.strokeRect(x + 36, yy - 30, 38, 38); text(ctx, s2, x + 96, yy, fTekst(34, 600), '#2A3446', 'left'); ctx.restore();
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.strokeStyle = '#3E8E6A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 42, yy - 12); ctx.lineTo(x + 54, yy + 2); ctx.lineTo(x + 78, yy - 34); ctx.stroke(); ctx.restore(); } });
  const sc = o.score || 0; if (sc > 0.01) { ctx.save(); ctx.globalAlpha *= sc; roundRect(ctx, x + 36, y + 340, w - 72, 56, 12); shape(ctx, rgba(C.goud, 0.25), C.goud, 3); text(ctx, 'score 3  →  diëtist', x + w / 2, y + 380, fTekst(36, 800), '#5A4410', 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- hand met losse trouwring, ruim vest (in een zoomcirkel) ----------
function handRing(ctx, cx, cy, r, t) { const huid = CAST.buurvrouw.huid, sd = _sdk(huid); ctx.fillStyle = '#2A3A58'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#9FB7C9'; ctx.fillRect(cx - r, cy + r * 0.25, 2 * r, r);
  ctx.save(); ctx.translate(cx - r * 0.1, cy + r * 0.15); ctx.rotate(-0.25);
  ctx.beginPath(); ctx.ellipse(-r * 0.5, 0, r * 0.42, r * 0.3, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill(); // handrug
  [[-0.32, 0.17], [-0.12, 0.06], [0.08, 0.0], [0.27, -0.08]].forEach(([dy, dx], i) => { roundRect(ctx, -r * 0.2 + dx * r, -r * 0.24 + dy * r * 0.0 + (i - 1.5) * r * 0.16, r * (0.72 - Math.abs(i - 1.2) * 0.1), r * 0.14, r * 0.07); ctx.fillStyle = huid; ctx.fill(); ctx.strokeStyle = sd; ctx.lineWidth = 1.2; ctx.stroke(); });
  // ring om de ringvinger (derde), draait en schuift een beetje
  const ry = -r * 0.24 + 0.5 * r * 0.16 + r * 0.07, rx = r * 0.18 + 0.06 * r * Math.sin(t * 1.6);
  ctx.strokeStyle = C.goud; ctx.lineWidth = r * 0.035; ctx.beginPath(); ctx.ellipse(rx, ry, r * 0.04, r * 0.115, 0.12 * Math.sin(t * 1.6), 0, 6.283); ctx.stroke(); ctx.restore(); }
function _sdk(c) { return lighten(c, -0.2); }
function mouwRuim(ctx, cx, cy, r) { const huid = CAST.buurvrouw.huid, vest = CAST.buurvrouw.topKleur; ctx.fillStyle = '#2A3A58'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#9FB7C9'; ctx.fillRect(cx - r, cy + r * 0.45, 2 * r, r); // deken
  // wijde mouw van boven naar beneden, met een smalle pols die er los in hangt (ruimte zichtbaar)
  ctx.beginPath(); ctx.moveTo(cx - r * 0.55, cy - r); ctx.lineTo(cx + r * 0.55, cy - r); ctx.lineTo(cx + r * 0.5, cy + r * 0.2); ctx.quadraticCurveTo(cx, cy + r * 0.32, cx - r * 0.5, cy + r * 0.2); ctx.closePath(); shape(ctx, vest, lighten(vest, 0.25), 2);
  ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.24, r * 0.5, r * 0.12, 0, 0, 6.283); shape(ctx, _sdk(vest), null); // opening
  roundRect(ctx, cx - r * 0.2, cy + r * 0.1, r * 0.4, r * 0.5, r * 0.16); ctx.fillStyle = huid; ctx.fill(); // pols
  ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.66, r * 0.3, r * 0.2, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill(); // hand
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(cx - r * 0.46, cy + r * 0.24); ctx.lineTo(cx - r * 0.24, cy + r * 0.24); ctx.moveTo(cx + r * 0.24, cy + r * 0.24); ctx.lineTo(cx + r * 0.46, cy + r * 0.24); ctx.stroke(); ctx.setLineDash([]); }

// ---------- telpoppetjes (alleen in een raster) ----------
function poppetjes(ctx, x, y, n, k, cel, colK, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const cx = x + i * cel, col = i < k ? colK : '#5A6478'; circ(ctx, cx, y, cel * 0.17, col); roundRect(ctx, cx - cel * 0.2, y + cel * 0.2, cel * 0.4, cel * 0.5, cel * 0.15); ctx.fillStyle = col; ctx.fill(); } ctx.restore(); }

// ---------- glucose, aminozuren, vet ----------
function glucose(ctx, x, y, r = 14, a = 1, col = GLUC) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, col, lighten(col, 0.3), 1.5); ctx.restore(); }
function aminozuur(ctx, x, y, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.koraal, lighten(C.koraal, 0.3), 1.5); ctx.restore(); }
function langs(pts, u) { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
  let d = clamp(u, 0, 1) * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const f = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= seg[i]; } return pts[pts.length - 1]; }
function bocht(x0, y0, x1, y1, h, n = 24) { const P = []; for (let i = 0; i <= n; i++) { const u = i / n, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 - h; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); } return P; }
function stroom(ctx, pts, t, n, teken, a = 1, snel = 0.25) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const u = (t * snel + i / n) % 1; const [px, py] = langs(pts, u); const fa = Math.min(1, u * 8, (1 - u) * 8); ctx.save(); ctx.globalAlpha *= fa; teken(px, py, i); ctx.restore(); } ctx.restore(); }
function padLijn(ctx, pts, col, a = 1, lw = 3, dash = [10, 9]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

// leverzoom: leverweefsel met glycogeenkorrels (oker) die leeglopen; vol 0..1
function leverBinnen(ctx, cx, cy, r, vol, t) { ctx.fillStyle = '#5A2A26'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 9; i++) { const an = i * 0.7 + 0.3, d = (i % 3) * r * 0.3 + r * 0.15; const px = cx + Math.cos(an * 2.3) * d, py = cy + Math.sin(an * 2.3) * d; ctx.beginPath(); ctx.moveTo(px + r * 0.22, py); for (let k = 1; k <= 6; k++) ctx.lineTo(px + Math.cos(k * 1.047) * r * 0.22, py + Math.sin(k * 1.047) * r * 0.22); ctx.closePath(); shape(ctx, '#8E3B32', '#A84E43', 1.5); circ(ctx, px, py, r * 0.05, '#6E5A9E'); }
  const n = Math.round(26 * vol); for (let i = 0; i < n; i++) { const an = hash(i * 7.3) * 6.283, d = Math.sqrt(hash(i * 3.1)) * r * 0.82; circ(ctx, cx + Math.cos(an) * d, cy + Math.sin(an) * d, r * 0.045, C.oker, lighten(C.oker, 0.3), 1); } }
// spierzoom: spiervezels met een eiwitketting (kralen) die loslaat; los 0..1
function spierBinnen(ctx, cx, cy, r, los, t) { ctx.fillStyle = '#6A2A2A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const yy = cy + i * r * 0.26; roundRect(ctx, cx - r, yy - r * 0.11, 2 * r, r * 0.22, r * 0.1); shape(ctx, '#B9524C', '#D47A70', 1.2); }
  const n = 9; for (let i = 0; i < n; i++) { const bx = cx - r * 0.6 + i * r * 0.15, by = cy + Math.sin(i * 0.9) * r * 0.08; const f = clamp(los * 1.6 - (n - 1 - i) * 0.08, 0, 1);
    const ox = f * (r * 0.4 + i * 4) * Math.cos(i * 1.7), oy = -f * (r * 0.35 + hash(i) * r * 0.2); if (i < n - 1 && f < 0.05) { ctx.strokeStyle = lighten(C.koraal, 0.3); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + r * 0.15, cy + Math.sin((i + 1) * 0.9) * r * 0.08); ctx.stroke(); }
    aminozuur(ctx, bx + ox, by + oy, r * 0.065, 1 - 0.6 * f); } }
// vetweefsel: grote vetcellen (geel) met kleine kern aan de rand
function vetBinnen(ctx, cx, cy, r) { ctx.fillStyle = '#4A4430'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const P = [[-0.45, -0.4], [0.15, -0.5], [0.6, -0.15], [-0.6, 0.2], [0.0, 0.05], [0.45, 0.45], [-0.2, 0.6]]; P.forEach(([dx, dy], i) => { ctx.beginPath(); ctx.arc(cx + dx * r, cy + dy * r, r * 0.33, 0, 6.283); shape(ctx, VET, lighten(VET, 0.3), 1.5); circ(ctx, cx + dx * r + r * 0.24, cy + dy * r - r * 0.16, r * 0.05, '#8C7BBF'); }); }

// kijkje in de romp (organen uit lib_anatomie op hun echte plek): w = {lever, nieren}; grijs = nieren grijs
let BODY = { cx: 960, yb: 880, h: 700 };
function rompKijkje(ctx, r, a = 1, w = {}, grijs = 0) { if (a <= 0.01 || !r || !r.hoofd) return null;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0, 2.6), wr = 0.85 * HHn; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9);
  const L = w.lever || 0, N = w.nieren || 0; if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; liver(1, 0.6 * (w.gloed || 0)); ctx.restore(); }
  if (N > 0.01) { const o1 = ANA.nier, o2 = ANA.nierL; if (grijs > 0.01) { ANA.nier = _mixK(o1, '#6A6E78', grijs); ANA.nierL = _mixK(o2, '#8A8E98', grijs); } ctx.save(); ctx.globalAlpha *= N; for (const sd of [-1, 1]) anKidney(sd, 1, 0); ctx.restore(); ANA.nier = o1; ANA.nierL = o2; }
  ctx.restore(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
  return { x: wx, y: wy, r: wr, lever: AP(-0.35, 2.45), nierL: AP(-0.37, 2.9), nierR: AP(0.37, 2.84) }; }
function _mixK(a, b, u) { const p = (c) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }

// doorsnede van een dij: bot, spier (koraal-rood), dun vetlaagje, huid; k = spierdikte (1 = voor)
function dijDoorsnede(ctx, x, y, r, k = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rs = r * (0.94 + 0.06 * k);
  if (k < 0.99) { ctx.setLineDash([8, 7]); circ(ctx, x, y, r + r * 0.12, null, C.koraal, 2.5); ctx.setLineDash([]); }
  circ(ctx, x, y, rs + r * 0.12, '#D9A982', '#BF8C66', 2); circ(ctx, x, y, rs + r * 0.06, rgba(VET, 0.85)); circ(ctx, x, y, rs, '#B9524C', '#D47A70', 2);
  ctx.strokeStyle = rgba('#7A2A2A', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.26, y + Math.sin(an) * r * 0.26); ctx.lineTo(x + Math.cos(an) * rs * 0.96, y + Math.sin(an) * rs * 0.96); ctx.stroke(); }
  circ(ctx, x, y, r * 0.22, '#ECE5D3', '#BDB49E', 2); circ(ctx, x, y, r * 0.1, '#C9A890'); ctx.restore(); }

// ---------- nieren en bloed: bakjes ----------
// bakje met vulling u (0..1), gestippeld als leeg/gestippeld = true
function bakje(ctx, x, y, w, h, naam, col, u, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h, w, h, 12); if (o.stippel) ctx.setLineDash([10, 8]); shape(ctx, rgba(C.fill, 0.5), col, 3); ctx.setLineDash([]);
  if (u > 0.01) { ctx.save(); roundRect(ctx, x - w / 2, y - h, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(col, 0.6); ctx.fillRect(x - w / 2, y - h * u, w, h * u); ctx.restore(); }
  metaText(ctx, naam, x, y + 42, col, 'center', 28); if (o.slot) slotje(ctx, x, y - h - 30, 0.8, o.slot, col); ctx.restore(); }

// ---------- borden voor Eriks gewone dag ----------
function banaan(ctx, x, y, s = 1, col = '#E8CF60') { ctx.beginPath(); ctx.moveTo(x - 54 * s, y - 26 * s); ctx.bezierCurveTo(x - 40 * s, y + 34 * s, x + 30 * s, y + 40 * s, x + 56 * s, y - 22 * s); ctx.bezierCurveTo(x + 40 * s, y + 4 * s, x - 22 * s, y + 6 * s, x - 42 * s, y - 30 * s); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.strokeStyle = rgba('#000', 0.18); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 46 * s, y - 20 * s); ctx.bezierCurveTo(x - 26 * s, y + 22 * s, x + 26 * s, y + 24 * s, x + 50 * s, y - 16 * s); ctx.stroke(); roundRect(ctx, x - 58 * s, y - 34 * s, 10 * s, 10 * s, 2 * s); shape(ctx, '#6A5030', null); circ(ctx, x + 56 * s, y - 22 * s, 3 * s, '#6A5030'); }
function aardappels(ctx, x, y, s = 1, col = '#D9B878') { [[-22, 4], [12, -6], [20, 14], [-4, -14]].forEach(([dx, dy], i) => { const px = x + dx * s, py = y + dy * s; ctx.beginPath(); ctx.ellipse(px, py, 20 * s, 15 * s, i * 0.6, 0, 6.283); shape(ctx, col, _mixK(col, '#6A4A2A', 0.45), 2 * s); [[-7, -3], [6, 4], [2, -6]].forEach(([ex, ey]) => circ(ctx, px + ex * s, py + ey * s, 1.8 * s, _mixK(col, '#5A3A20', 0.6))); }); }
function saus(ctx, x, y, s = 1, col = '#C8503C') { ctx.beginPath(); ctx.ellipse(x, y, 36 * s, 22 * s, 0, 0, 6.283); shape(ctx, '#D8DEE6', '#FFFFFF', 1.2); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 28 * s, 15 * s, 0, 0, 6.283); shape(ctx, col, null); circ(ctx, x - 9 * s, y - 6 * s, 4 * s, lighten(col, 0.3)); circ(ctx, x + 8 * s, y + 2 * s, 3 * s, lighten(col, 0.3)); }
function biefstuk(ctx, x, y, s = 1, col = '#9A5A44') { blob(ctx, x, y, 38 * s, 24 * s, 0.12, 2); shape(ctx, col, lighten(col, 0.3), 1.2); ctx.strokeStyle = rgba('#3A1A10', 0.4); ctx.lineWidth = 3 * s; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x - 20 * s + i * 14 * s, y - 14 * s); ctx.lineTo(x - 6 * s + i * 14 * s, y + 14 * s); ctx.stroke(); } }
function soepPak(ctx, x, y, s = 1) { roundRect(ctx, x - 28 * s, y - 44 * s, 56 * s, 88 * s, 5 * s); shape(ctx, '#C9654B', '#E08A70', 1.5); roundRect(ctx, x - 20 * s, y - 14 * s, 40 * s, 30 * s, 15 * s); shape(ctx, '#E8C070', null); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(x - 20 * s, y - 34 * s, 40 * s, 8 * s); }
function smeerkaas(ctx, x, y, s = 1, col = '#F0E2B0') { ctx.beginPath(); ctx.ellipse(x, y, 26 * s, 12 * s, 0, 0, 6.283); shape(ctx, '#D8DEE6', '#FFFFFF', 1.2); ctx.beginPath(); ctx.ellipse(x, y - 3 * s, 20 * s, 8 * s, 0, 0, 6.283); shape(ctx, col, null); }
function bordje(ctx, x, y, s = 1) { ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 62 * s, 0, 0, 6.283); shape(ctx, '#E6E2DA', '#FFFFFF', 2); ctx.beginPath(); ctx.ellipse(x, y, 84 * s, 46 * s, 0, 0, 6.283); ctx.strokeStyle = '#C8C4BA'; ctx.lineWidth = 1.5; ctx.stroke(); }
function gloeiRing(ctx, x, y, rx, ry, col, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(col, 0.18); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }

// ---------- zout, glas, pil, pan, hartslag ----------
function zoutvaatje(ctx, x, y, s = 1) { ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 50 * s); ctx.lineTo(x - 24 * s, y - 20 * s); ctx.quadraticCurveTo(x, y - 34 * s, x + 24 * s, y - 20 * s); ctx.lineTo(x + 30 * s, y + 50 * s); ctx.closePath(); shape(ctx, rgba('#E8ECF2', 0.85), '#FFFFFF', 1.5);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x - 27 * s, y + 10 * s, 54 * s, 38 * s); ctx.beginPath(); ctx.ellipse(x, y - 24 * s, 24 * s, 14 * s, 0, Math.PI, 0); shape(ctx, '#9AA3B2', null); [-8, 0, 8].forEach(d => circ(ctx, x + d * s, y - 30 * s, 2.5 * s, '#2A3446')); }
function glas(ctx, x, y, s = 1, vul = 0.6, streep = null) { ctx.beginPath(); ctx.moveTo(x - 30 * s, y - 50 * s); ctx.lineTo(x + 30 * s, y - 50 * s); ctx.lineTo(x + 23 * s, y + 50 * s); ctx.lineTo(x - 23 * s, y + 50 * s); ctx.closePath(); shape(ctx, rgba(C.teal, 0.15), rgba(C.text, 0.8), 2);
  const yv = y + 50 * s - 100 * s * vul; ctx.fillStyle = rgba(C.teal, 0.55); ctx.beginPath(); ctx.moveTo(x - 30 * s + 7 * s * (1 - vul), yv); ctx.lineTo(x + 30 * s - 7 * s * (1 - vul), yv); ctx.lineTo(x + 23 * s, y + 50 * s); ctx.lineTo(x - 23 * s, y + 50 * s); ctx.closePath(); ctx.fill();
  if (streep != null) { const ys = y + 50 * s - 100 * s * streep; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 38 * s, ys); ctx.lineTo(x + 38 * s, ys); ctx.stroke(); } }
function pil(ctx, x, y, s = 1, col = FOS) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5); roundRect(ctx, -34 * s, -15 * s, 68 * s, 30 * s, 15 * s); shape(ctx, '#F2F2EE', '#FFFFFF', 1.5); ctx.beginPath(); ctx.moveTo(0, -15 * s); ctx.lineTo(19 * s, -15 * s); ctx.arc(19 * s, 0, 15 * s, -Math.PI / 2, Math.PI / 2); ctx.lineTo(0, 15 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function pan(ctx, x, y, s = 1, giet = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.55 * giet);
  ctx.beginPath(); ctx.moveTo(-110 * s, -60 * s); ctx.lineTo(-100 * s, 50 * s); ctx.quadraticCurveTo(0, 70 * s, 100 * s, 50 * s); ctx.lineTo(110 * s, -60 * s); ctx.closePath(); shape(ctx, '#7D8CA6', '#AFC0D0', 2);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-104 * s, -40 * s); ctx.lineTo(-100 * s, 50 * s); ctx.quadraticCurveTo(0, 70 * s, 100 * s, 50 * s); ctx.lineTo(104 * s, -40 * s); ctx.closePath(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.5 * (1 - giet * 0.9)); ctx.fillRect(-120 * s, -40 * s + 80 * s * giet, 240 * s, 120 * s); ctx.restore();
  aardappels(ctx, -30 * s, 26 * s, 1.1 * s); aardappels(ctx, 40 * s, 30 * s, 1.0 * s);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 12 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-110 * s, -40 * s); ctx.lineTo(-180 * s, -40 * s); ctx.moveTo(110 * s, -40 * s); ctx.lineTo(180 * s, -40 * s); ctx.stroke(); ctx.restore();
  if (giet > 0.3) { ctx.save(); ctx.globalAlpha *= clamp((giet - 0.3) * 3, 0, 1); for (let i = 0; i < 7; i++) { const u = (t * 1.3 + i / 7) % 1; circ(ctx, x - 130 * s - 10 * s * Math.sin(i), y - 10 * s + u * 170 * s, 7 * s, rgba(C.teal, 0.8)); } ctx.restore(); } }
// hartslaglijn: hapert = 0..1 (onregelmatig)
function hartslag(ctx, x, y, w, h, t, hapert = 0, col = KAL, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y - h, w, 2 * h); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
  const per = 150, off = (t * 120) % per; let started = false; const slag = (i) => hapert > 0.5 ? (i % 3 === 1 ? 0.55 : (i % 3 === 2 ? 1.6 : 1)) : 1;
  for (let px = -per; px < w + per; px += 2) { const xx = px + off, i = Math.floor((xx + 10 * per) / per), ph = ((xx % per) + per) % per, sc = slag(i), g = ph * sc;
    let yy = 0; if (g > 50 && g < 60) yy = -(g - 50) * 0.3; else if (g >= 60 && g < 68) yy = -3 + (g - 60) * 1.8; else if (g >= 68 && g < 76) yy = 11 - (g - 68) * 5.5; else if (g >= 76 && g < 84) yy = -33 + (g - 76) * 4.4; else if (g >= 100 && g < 120) yy = -Math.sin((g - 100) / 20 * Math.PI) * 6;
    if (hapert > 0.5 && i % 3 === 2 && g > 130) yy = 0; const X = x + px, Y = y + yy * h / 33; if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y); }
  ctx.stroke(); ctx.restore(); }

// ---------- eiwitschuif (g eiwit per kg per dag) ----------
// o: gezond, voor, meesten, dialyse (0..1 zichtbaarheid), dialyseVraag (0..1), stand ('voor'|'dialyse'), sp (spring 0..1)
function eiwitSchuif(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lo = 0.4, hi = 1.6, X = (g) => x + (g - lo) / (hi - lo) * w;
  metaText(ctx, 'EIWIT · GRAM PER KG LICHAAMSGEWICHT PER DAG', x, y - 150, C.text2, 'left', 28);
  roundRect(ctx, x, y - 12, w, 24, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
  for (let g = 0.4; g <= 1.61; g += 0.2) { const gx = X(g); ctx.fillStyle = C.line; ctx.fillRect(gx - 1, y + 14, 2, 14); metaText(ctx, g.toFixed(1).replace('.', ','), gx, y + 56, C.text2, 'center', 28); }
  const mk = (g, lab, sub, col, al, onder = false) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const gx = X(g); circ(ctx, gx, y, 18, col, lighten(col, 0.3), 2);
    text(ctx, lab, gx, onder ? y + 110 : y - 60, fTekst(32, 800), col, 'center'); if (sub) metaText(ctx, sub, gx, onder ? y + 146 : y - 140 + 0, C.text2, 'center', 28); ctx.restore(); };
  mk(0.8, 'gezond: 0,8', '', C.groen, o.gezond || 0, true);
  if ((o.meesten || 0) > 0.01) { laag(ctx, o.meesten, () => { const gx = X(1.0); ctx.fillStyle = rgba(C.text2, 0.9); ctx.fillRect(gx - 2, y - 30, 4, 60); metaText(ctx, 'NL GEMIDDELD ± 1,0', gx + 14, y + 110, C.text2, 'left', 28); }); }
  if ((o.voor || 0) > 0.01) laag(ctx, o.voor, () => { const gx = X(0.8); circ(ctx, gx, y, 26, null, C.oker, 5); circ(ctx, gx, y, 14, C.oker, null); text(ctx, 'vóór dialyse: niet meer dan nodig', gx, y - 60, fTekst(32, 800), C.oker, 'center'); });
  if ((o.dialyse || 0) > 0.01) laag(ctx, o.dialyse, () => { const x0 = X(1.0), x1 = X(1.2); roundRect(ctx, x0, y - 16, x1 - x0, 32, 14); shape(ctx, rgba(C.koraal, 0.5), C.koraal, 3); text(ctx, 'tijdens dialyse: 1–1,2', X(1.15), y - 60, fTekst(32, 800), C.koraal, 'center'); });
  if ((o.dialyseVraag || 0) > 0.01) laag(ctx, o.dialyseVraag, () => { kaart(ctx, x + w / 2 - 230, y - 300, 460, 96, 1, C.goud); text(ctx, 'tijdens dialyse?', x + w / 2 - 40, y - 238, fTekst(36, 800), C.goud, 'center'); vraagteken(ctx, x + w / 2 + 170, y - 222, 1, 70); });
  ctx.restore(); }

// ---------- dialysevlies: aminozuren lekken weg ----------
function dialyseVlies(ctx, x, y, w, h, t, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const mx = x + w / 2;
  roundRect(ctx, x, y, w / 2 - 6, h, 18); shape(ctx, rgba('#C8463C', 0.22), rgba('#C8463C', 0.7), 2); roundRect(ctx, mx + 6, y, w / 2 - 6, h, 18); shape(ctx, rgba(C.teal, 0.2), rgba(C.teal, 0.7), 2);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.setLineDash([22, 12]); ctx.beginPath(); ctx.moveTo(mx, y + 10); ctx.lineTo(mx, y + h - 10); ctx.stroke(); ctx.setLineDash([]);
  metaText(ctx, 'BLOED', x + 30, y + 44, '#E08A80', 'left', 28); metaText(ctx, 'DIALYSEVLOEISTOF', mx + 30, y + 44, C.teal, 'left', 28);
  for (let i = 0; i < 4; i++) { const yy = y + 80 + i * (h - 120) / 3; ctx.save(); ctx.beginPath(); ctx.ellipse(x + 90 + (i % 2) * 120, yy, 24, 10, 0.2, 0, 6.283); ctx.fillStyle = '#7A2A30'; ctx.fill(); ctx.restore(); }
  const n = 16; for (let i = 0; i < n; i++) { const f = clamp(u * 1.4 - i / n * 0.6, 0, 1), sx = x + 40 + hash(i * 3.3) * (w / 2 - 110), sy = y + 80 + hash(i * 5.1) * (h - 140), ex = mx + 50 + hash(i * 9.7) * (w / 2 - 110), ey = sy + (hash(i * 2.2) - 0.5) * 60;
    const lek = i % 2 === 0; const k = lek ? ease(f) : 0; const w2 = wander(i, t, 6, 0.6); const ax = lerp(sx, ex, k) + w2.x, ay = lerp(sy, ey, k) + w2.y; aminozuur(ctx, ax, ay, 9, 1); ctx.strokeStyle = lighten(C.koraal, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax + 9, ay); ctx.lineTo(ax + 13, ay); ctx.stroke(); aminozuur(ctx, ax + 22, ay, 9, 1); }
  metaText(ctx, 'AMINOZUREN', x + w - 30, y + h - 24, C.koraal, 'right', 28);
  ctx.restore(); }

// ---------- trap: van verrijken naar sonde ----------
const TRAP = [['gewoon eten verrijken', C.oker], ['drinkvoeding', C.oker], ['sondevoeding', C.teal], ['via een ader', C.paars]];
// lit[i] 0..1 = trede licht op; grijs3 0..1 = derde trede grijs met vraagteken
function trap(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tw = 230, th = 64, lit = o.lit || [];
  TRAP.forEach(([lab, col], i) => { const bx = x + i * tw, by = y - (i + 1) * th, L = lit[i] || 0, G = i === 2 ? (o.grijs3 || 0) : 0;
    roundRect(ctx, bx, by, tw - 8, (i + 1) * th, 10); const fc = G > 0.5 ? rgba(C.fill, 0.4) : L > 0.01 ? rgba(col, 0.2 + 0.4 * L) : rgba(C.fill, 0.45); shape(ctx, fc, G > 0.5 ? C.text2 : L > 0.01 ? col : C.line, L > 0.5 ? 3 : 1.5);
    ctx.font = fTekst(26, 700); ctx.fillStyle = L > 0.5 || G > 0.5 ? C.text : C.text2; ctx.textAlign = 'center'; wrapC(ctx, lab, bx + tw / 2 - 4, by + 40, tw - 34, 30);
    if (G > 0.01) vraagteken(ctx, bx + tw / 2 - 4, by - 26, G, 70); });
  ctx.restore(); }

// ---------- neussonde in een zoomcirkel (schematisch zijaanzicht van hoofd en romp) ----------
function sondeSchema(ctx, cx, cy, r, u = 1, t = 0) { ctx.fillStyle = '#22304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); const s = r / 200;
  ctx.save(); ctx.translate(cx - 10 * s, cy - 20 * s);
  // profiel: hoofd (kijkt naar rechts), hals, borst
  ctx.beginPath(); ctx.moveTo(-60 * s, -150 * s); ctx.bezierCurveTo(-20 * s, -200 * s, 60 * s, -190 * s, 70 * s, -130 * s); ctx.lineTo(84 * s, -104 * s); ctx.lineTo(72 * s, -96 * s); ctx.lineTo(76 * s, -70 * s); ctx.quadraticCurveTo(60 * s, -50 * s, 40 * s, -52 * s);
  ctx.lineTo(36 * s, -10 * s); ctx.quadraticCurveTo(70 * s, 10 * s, 90 * s, 60 * s); ctx.lineTo(100 * s, 230 * s); ctx.lineTo(-110 * s, 230 * s); ctx.lineTo(-100 * s, 40 * s); ctx.quadraticCurveTo(-60 * s, -10 * s, -40 * s, -30 * s); ctx.quadraticCurveTo(-90 * s, -80 * s, -60 * s, -150 * s); ctx.closePath();
  shape(ctx, rgba('#D9A982', 0.35), '#D9A982', 2);
  // slokdarm en maag
  ctx.strokeStyle = rgba('#D98C80', 0.8); ctx.lineWidth = 14 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10 * s, -60 * s); ctx.lineTo(4 * s, 120 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 120 * s); ctx.bezierCurveTo(60 * s, 100 * s, 90 * s, 150 * s, 70 * s, 190 * s); ctx.bezierCurveTo(40 * s, 220 * s, -10 * s, 200 * s, 0, 120 * s); shape(ctx, '#E39C8A', '#C67D6C', 2);
  // slangetje: neus → keel → slokdarm → maag
  const P = [[80 * s, -88 * s], [56 * s, -92 * s], [30 * s, -84 * s], [14 * s, -60 * s], [8 * s, 0], [4 * s, 110 * s], [28 * s, 160 * s]]; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5 * s; ctx.beginPath();
  const n = 60, m = Math.round(n * clamp(u, 0, 1)); for (let i = 0; i <= m; i++) { const [px, py] = langs(P, i / n); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(80 * s, -88 * s); ctx.quadraticCurveTo(110 * s, -80 * s, 120 * s, -40 * s); ctx.stroke(); roundRect(ctx, 110 * s, -40 * s, 22 * s, 26 * s, 4 * s); shape(ctx, C.teal, null);
  ctx.restore(); }

// ---------- rollator (zijaanzicht) ----------
function rollator(ctx, x, y, s = 1, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(kijk * s, s); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-40, -230); ctx.lineTo(-56, -16); ctx.moveTo(-40, -230); ctx.lineTo(60, -16); ctx.moveTo(-48, -130); ctx.lineTo(10, -130); ctx.stroke();
  ctx.lineWidth = 12; ctx.strokeStyle = '#3A4454'; ctx.beginPath(); ctx.moveTo(-52, -232); ctx.lineTo(-24, -232); ctx.stroke();
  roundRect(ctx, -46, -150, 80, 16, 4); shape(ctx, '#5A6A84', null); for (const wx of [-56, 60]) circ(ctx, wx, -16, 16, '#2A3242', '#5A6478', 3); ctx.restore(); }

// klein hartje (icoon, geen anatomie)
function hart(ctx, x, y, s = 1, col = '#C8463C') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 26); ctx.bezierCurveTo(-40, 0, -34, -30, -14, -30); ctx.bezierCurveTo(-4, -30, 0, -22, 0, -16); ctx.bezierCurveTo(0, -22, 4, -30, 14, -30); ctx.bezierCurveTo(34, -30, 40, 0, 0, 26); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.restore(); }

// twee nieren met wervelkolom (achteraanzicht-schema) in een zoomcirkel; G 0..1 = van roze-rood naar grijs
function nierPaar(ctx, cx, cy, r, G = 0) { ctx.fillStyle = '#3A2A2E'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -4; i <= 4; i++) { roundRect(ctx, cx - r * 0.09, cy + i * r * 0.22 - r * 0.08, r * 0.18, r * 0.16, 4); shape(ctx, '#ECE5D3', '#BDB49E', 1.5); }
  const col = _mixK('#C85A55', '#7A7E88', G), rand = _mixK('#E08A80', '#9AA0AA', G);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(cx + sd * r * 0.42, cy - r * 0.1); ctx.scale(sd, 1); const k = r / 100;
    ctx.beginPath(); ctx.moveTo(0, -48 * k); ctx.bezierCurveTo(40 * k, -50 * k, 42 * k, 50 * k, 0, 50 * k); ctx.bezierCurveTo(-24 * k, 50 * k, -26 * k, 18 * k, -13 * k, 8 * k); ctx.bezierCurveTo(-5 * k, 2 * k, -5 * k, -2 * k, -13 * k, -8 * k); ctx.bezierCurveTo(-26 * k, -18 * k, -24 * k, -48 * k, 0, -48 * k); ctx.closePath(); shape(ctx, col, rand, 2.5);
    ctx.strokeStyle = _mixK('#E0C070', '#9AA0AA', G); ctx.lineWidth = 4 * k; ctx.beginPath(); ctx.moveTo(-14 * k, 4 * k); ctx.quadraticCurveTo(-24 * k, 60 * k, -20 * k, 120 * k); ctx.stroke(); ctx.restore(); } }

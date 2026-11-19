// Wat word jij? · Sport en topsport 1 · Glijden, trekken, drijven — eigen tekeningen (v1.0, 19 nov 2026).
// Seriekleuren (REEKS-sport): teal = water, koraal = weerstand (pijlen tegen de bewegingsrichting), goud = voortstuwing en focus, oker = kracht en energie.
// Maten: Sam 1,79 m (lengte in px = staande lengte); 50-meterbad met banen van 2,5 m; meetbaan: stang ± 0,8 m onder water, plaatjes ± 1,35 m uit elkaar (Toussaint 2002, Schreven 2013).
// Water = vlak achter de zwemmer (nooit doorzichtige mensen); alleen bij de zwemmer aan de muur (cold open) een dekkend watervlak vóór het onderlijf.

const GROND = 860;
const SP1 = { water: '#1D4660', waterD: '#173A50', opp: '#5BA4C9', tegel: '#2B3B55', tegelL: '#3A4C6A', papier: '#EEF0EA', bord: '#8A6B4C', okerD: '#7E5F22', goudD: '#8C6510', huid: '#7A5440', muts: '#D8573F' };

// ---------- algemene hulpjes (zoals mb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function kaartTekst(ctx, x, y, w, h, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x + 28, y + 100 + i * (px + 12), fTekst(px, 700), C.text, 'left')); }); }
function vensterA(t, t0, t1, d = 0.4) { return ramp(t, t0, d) * (1 - ramp(t, t1, d)); }

// ---------- castpersonages ----------
// figuranten in zwemkleding (eigen garderobe in deze film; het castboek heeft alleen Sam in zwemkleding): Bilal, Daan (zwembroek) en Noor (badpak)
(function () { const zw = (id, muts, pak) => { const P = CAST[id]; if (!P) return; P.garderobe = Object.assign({}, P.garderobe, { zwem: { top: 'bloot', topKleur: pak || P.huid, topAccent: pak || P.huid, broek: pak || '#202A3A', broekAccent: pak ? pak : muts,
  schoen: P.huid, schoenAccent: P.huid, kapsel: 'badmuts', badmuts: muts, accessoire: ['zwembroek', 'blootsvoets', 'zwembril'] } }); };
  zw('bilal', '#E8E8E2'); zw('daan', '#3E7A5A'); zw('noor', '#E0B64A', '#2C3E6E'); })();
// crawl met een zakkende elleboog ('lek'): de bovenarm zakt eerst, de onderarm blijft plat en glijdt weg
ZWEM.crawlLek = Object.assign({}, ZWEM.crawl, { arm: [[0, 0.3, 0.25, 1, 1], [0.12, 0.12, 0.1, 1, 1], [0.26, 0.78, 0.38, 0.95, 1], [0.4, 1.35, 1.05, 0.85, 1], [0.52, 1.95, 2.25, 0.85, 1], [0.62, 2.8, 2.95, 1, 1], [0.7, 3.6, 3.2, 0.9, 0.9], [0.8, 4.5, 1.25, 1, 0.45], [0.9, 5.55, 0.45, 1, 0.8]] });

function sp1Sam(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ t, outfit: 'zwem', uit: 'neutraal' }, o)); }
CAST.zwemtrainerZK = Object.assign({}, CAST.zwemtrainer, { accessoire: CAST.zwemtrainer.accessoire.filter(a => a !== 'klembord') });
function sp1Trainer(ctx, x, y, h, t, o = {}) { return persoon(ctx, o.zonderBord ? 'zwemtrainerZK' : 'zwemtrainer', x, y, h, Object.assign({ t, uit: 'neutraal' }, o)); }
// zwemmer gedraaid rond (px, py) met hoek ang (rad; negatief = neus omhoog / benen omlaag bij kijk 1); geeft punten in schermcoördinaten
function SP1_zwemRot(ctx, id, x, y, L, ang, px, py, o = {}) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py); const r = zwemmer(ctx, id, x, y, L, o); ctx.restore();
  const R = (p) => { if (!p || p.x == null) return p; const dx = p.x - px, dy = p.y - py; return Object.assign({}, p, { x: px + dx * Math.cos(ang) - dy * Math.sin(ang), y: py + dx * Math.sin(ang) + dy * Math.cos(ang) }); };
  const out = {}; for (const k in r) out[k] = typeof r[k] === 'object' ? R(r[k]) : r[k]; return out; }
function SP1_rot(p, ang, px, py) { const dx = p.x - px, dy = p.y - py; return { x: px + dx * Math.cos(ang) - dy * Math.sin(ang), y: py + dx * Math.sin(ang) + dy * Math.cos(ang) }; }

// ---------- water ----------
// watervlak van wl tot y1 achter de zwemmer; o.amp golfjes, o.snel = hoe snel het oppervlak naar links schuift (px/s), o.boeg = {x, h, kijk} boeggolf
function SP1_water(ctx, wl, o = {}) { const { x0 = 0, x1 = W, y1 = 880, t = 0, amp = 4, snel = 60, boeg = null, kl = SP1.water, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const yy = (x) => { let y = wl + amp * Math.sin((x + t * snel) * 0.025) + amp * 0.5 * Math.sin((x + t * snel * 1.3) * 0.061);
    if (boeg) { const d = (x - boeg.x) * (boeg.kijk || 1); y -= boeg.h * Math.exp(-((d - boeg.h * 0.6) ** 2) / (2 * (boeg.h * 1.1) ** 2)); if (d < 0) y += boeg.h * 0.45 * Math.exp(-((d + boeg.h * 2.4) ** 2) / (2 * (boeg.h * 1.2) ** 2)); } return y; };
  ctx.beginPath(); ctx.moveTo(x0, y1); for (let x = x0; x <= x1; x += 8) ctx.lineTo(x, yy(x)); ctx.lineTo(x1, yy(x1)); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  ctx.strokeStyle = SP1.opp; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 8) x === x0 ? ctx.moveTo(x, yy(x)) : ctx.lineTo(x, yy(x)); ctx.stroke(); ctx.restore(); return yy; }
// oppervlak opnieuw over de zwemmer (alleen de lijn, geen vlak): laat zien waar het water ligt
function SP1_oppLijn(ctx, yy, x0, x1, a = 0.9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(SP1.opp, 0.8); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); for (let x = x0; x <= x1; x += 8) x === x0 ? ctx.moveTo(x, yy(x)) : ctx.lineTo(x, yy(x)); ctx.stroke(); ctx.restore(); }
// belletjes die opstijgen vanaf (x, y), drijven met het water mee naar links
function SP1_bellen(ctx, x, y, n, t, o = {}) { const { a = 1, wl = 0, drift = 40, seed = 1, r = 5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.75); ctx.lineWidth = 2;
  for (let i = 0; i < n; i++) { const per = 2.2 + hash(i * 3.1 + seed) * 1.6, u = ((t + hash(i + seed) * per) % per) / per, by = y - u * 260, bx = x - u * drift + Math.sin(u * 9 + i) * 6 + (hash(i * 7 + seed) - 0.5) * 30;
    if (by < wl + 6) continue; ctx.beginPath(); ctx.arc(bx, by, r * (0.6 + hash(i * 5.3 + seed) * 0.8), 0, 6.283); ctx.stroke(); } ctx.restore(); }
// draaikolk: spiraal die ronddraait
function SP1_wervel(ctx, x, y, r, t, col, a = 1, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 40; k++) { const u = k / 40, an = dir * (u * 9 + t * 3), rr = r * (1 - u * 0.85); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// dikke pijl (vlak), d = dikte van de steel
function SP1_pijlDik(ctx, x1, y1, x2, y2, d, col, a = 1) { if (a <= 0.01 || d < 0.5) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), kop = Math.min(L * 0.6, Math.max(18, d * 1.9)), kw = Math.max(14, d * 1.15);
  ctx.translate(x1, y1); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -d / 2); ctx.lineTo(L - kop, -d / 2); ctx.lineTo(L - kop, -kw); ctx.lineTo(L, 0); ctx.lineTo(L - kop, kw); ctx.lineTo(L - kop, d / 2); ctx.lineTo(0, d / 2); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// kleine pijltjes water naar achteren (teal) vanaf een punt
function SP1_waterTerug(ctx, x, y, kijk, t, a = 1, n = 3, len = 90) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = ((t * 0.9 + i / n) % 1), xx = x - kijk * (20 + u * len), yy = y + (i - (n - 1) / 2) * 22;
  pijl(ctx, xx + kijk * 30, yy, xx - kijk * 10, yy, C.teal, a * Math.sin(u * Math.PI), 4, 14); } }

// ---------- zwembad ----------
// bovenaanzicht van een bad: x, y linksboven, w, h; banen; geeft de y van het midden van baan i
function SP1_badBoven(ctx, x, y, w, h, banen, o = {}) { const { a = 1, meter = null, hl = -1 } = o; if (a <= 0.01) return () => 0; ctx.save(); ctx.globalAlpha *= a; const bh = h / banen;
  roundRect(ctx, x - 26, y - 26, w + 52, h + 52, 10); shape(ctx, SP1.tegel, SP1.tegelL, 2); ctx.fillStyle = '#1F5C78'; ctx.fillRect(x, y, w, h);
  for (let i = 0; i < banen; i++) { const cy = y + bh * (i + 0.5); if (i === hl) { ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(x, y + bh * i, w, bh); }
    ctx.fillStyle = '#183F55'; ctx.fillRect(x + w * 0.04, cy - 4, w * 0.92, 8); ctx.fillRect(x + w * 0.04 - 2, cy - bh * 0.22, 8, bh * 0.44); ctx.fillRect(x + w * 0.96 - 6, cy - bh * 0.22, 8, bh * 0.44); }
  for (let i = 1; i < banen; i++) { const ly = y + bh * i; for (let xx = x; xx < x + w; xx += 16) { const rand = xx < x + w * 0.1 || xx > x + w * 0.9; ctx.fillStyle = rand ? '#D8573F' : (Math.floor((xx - x) / 16) % 2 ? '#E8E8E2' : '#5BA4C9'); ctx.beginPath(); ctx.arc(xx + 8, ly, 5, 0, 6.283); ctx.fill(); } }
  if (meter) { const s = w / meter; for (const m of [5, 15]) { ctx.strokeStyle = rgba('#E8E8E2', 0.5); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x + m * s, y); ctx.lineTo(x + m * s, y + h); ctx.moveTo(x + w - m * s, y); ctx.lineTo(x + w - m * s, y + h); ctx.stroke(); ctx.setLineDash([]); } }
  ctx.restore(); return (i) => y + bh * (i + 0.5); }
// zwemmer van boven (eenvoudige vorm, zoals in de reeks afgesproken): s = lengte van vingertop tot teen in px
function SP1_zwemmerBoven(ctx, x, y, s, t, kijk = 1, o = {}) { const { a = 1, slag = true, muts = SP1.muts, huid = SP1.huid } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const ph = t * 0.8 * 6.283; ctx.lineCap = 'round';
  // benen
  ctx.strokeStyle = huid; ctx.lineWidth = s * 0.07; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-s * 0.2, k * s * 0.04); ctx.lineTo(-s * 0.52, k * s * (0.045 + 0.015 * Math.sin(ph * 3 + (k > 0 ? 0 : 3.1)))); ctx.stroke(); }
  // armen: om de beurt naar voren
  for (const k of [-1, 1]) { const u = slag ? (Math.sin(ph + (k > 0 ? 0 : Math.PI)) + 1) / 2 : 1, hx = -s * 0.1 + u * s * 0.42, hy = k * s * (0.11 - u * 0.06);
    ctx.strokeStyle = huid; ctx.lineWidth = s * 0.06; ctx.beginPath(); ctx.moveTo(s * 0.1, k * s * 0.1); ctx.lineTo(hx, hy); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-s * 0.05, 0, s * 0.2, s * 0.12, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill();
  ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-s * 0.2, 0, s * 0.06, s * 0.085, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(s * 0.2, 0, s * 0.075, 0, 6.283); ctx.fillStyle = muts; ctx.fill(); ctx.restore(); }
// scorebord met tekst
function SP1_scorebord(ctx, x, y, s2, a = 1, px = 54) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); const w = ctx.measureText(s2).width + 70; roundRect(ctx, x - w / 2, y - px - 22, w, px + 44, 10); shape(ctx, '#101722', '#4A5468', 3);
  text(ctx, s2, x, y + 4, fMeta(px), '#F2C94C', 'center'); ctx.restore(); }
// zijaanzicht van de muur en de kant: muur bij x, kant (vloer) op yKant, naar rechts (kant 1) of links (-1)
function SP1_kant(ctx, x, yKant, kant = 1, o = {}) { const { a = 1, y1 = 1080, rand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x2 = o.x2 != null ? o.x2 : (kant > 0 ? W + 10 : -10), xa = Math.min(x, x2), w = Math.abs(x2 - x);
  ctx.fillStyle = SP1.tegel; ctx.fillRect(xa, yKant, w, y1 - yKant); ctx.strokeStyle = rgba(SP1.tegelL, 0.9); ctx.lineWidth = 2;
  for (let yy = yKant + 40; yy < Math.min(y1, 880); yy += 40) { ctx.beginPath(); ctx.moveTo(xa, yy); ctx.lineTo(xa + w, yy); ctx.stroke(); }
  for (let xx = x + kant * 40; kant > 0 ? xx < x2 : xx > x2; xx += kant * 40) { ctx.beginPath(); ctx.moveTo(xx, yKant); ctx.lineTo(xx, Math.min(y1, 880)); ctx.stroke(); }
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(xa, yKant - 6, w, 8); ctx.restore(); }

// ---------- klembord (rode draad) ----------
const SP1_KB = [['KRACHT:', 'oker', 30, 190, 0], ['KLEIN BEETJE', 'oker', 30, 234, 0], ['LIGGING', 'goud', 46, 316, 1], ['GRIP', 'goud', 46, 398, 2], ['ONDERWATER', 'goud', 46, 480, 3]];
// n = aantal regels, u = hoe ver de laatste regel geschreven is (0..1); w = breedte
function SP1_klembord(ctx, x, y, w, n, u = 1, o = {}) { const { a = 1, t = 0, nieuw = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 1.3, s = w / 420;
  roundRect(ctx, x, y, w, h, 18 * s); shape(ctx, SP1.bord, '#6E5236', 2); roundRect(ctx, x + 22 * s, y + 46 * s, w - 44 * s, h - 68 * s, 6 * s); shape(ctx, SP1.papier, '#C9CCC4', 1.5);
  roundRect(ctx, x + w / 2 - 70 * s, y - 14 * s, 140 * s, 58 * s, 10 * s); shape(ctx, '#AFB6C0', '#7E8796', 2);
  text(ctx, 'VOORBEELD', x + w / 2, y + 112 * s, fMeta(Math.max(28, 30 * s)), '#5A6070', 'center');
  ctx.strokeStyle = '#C9CCC4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 50 * s, y + 132 * s); ctx.lineTo(x + w - 50 * s, y + 132 * s); ctx.stroke();
  for (let i = 0; i < SP1_KB.length; i++) { const [s2, kl, px0, ry, item] = SP1_KB[i]; if (item > n - 1) continue; const px = Math.max(28, px0 * s), yy = y + ry * s, kleur = kl === 'oker' ? SP1.okerD : SP1.goudD;
    const uu = item === n - 1 ? (item === 0 ? clamp(u * 2 - i, 0, 1) : clamp(u, 0, 1)) : 1; if (uu <= 0) continue; const last = item === n - 1 && uu < 1; ctx.save(); ctx.font = fTekst(px, 800); const tw = ctx.measureText(s2).width; ctx.beginPath(); ctx.rect(x + 46 * s, yy - px - 10, (tw + 10) * uu, px + 30); ctx.clip();
    text(ctx, s2, x + 50 * s, yy, fTekst(px, 800), kleur, 'left'); ctx.restore();
    if (last) { const px2 = x + 50 * s + tw * uu, py2 = yy - px * 0.3 + Math.sin(t * 30) * 3; ctx.save(); ctx.translate(px2, py2); ctx.rotate(-0.7); roundRect(ctx, -6 * s, -90 * s, 12 * s, 90 * s, 4 * s); shape(ctx, '#2F5FA8', '#264E8C', 1.5);
      ctx.beginPath(); ctx.moveTo(-6 * s, 0); ctx.lineTo(0, 14 * s); ctx.lineTo(6 * s, 0); ctx.closePath(); ctx.fillStyle = '#E8D6B0'; ctx.fill(); ctx.restore(); }
    if (item === nieuw && uu >= 1) { ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 50 * s, yy + 12 * s); ctx.lineTo(x + 50 * s + tw, yy + 12 * s); ctx.stroke(); } }
  ctx.restore(); }

// ---------- kleine voorwerpen ----------
// literbakje (kubus van 10 cm), vul = kleur of null (lucht)
function SP1_literbak(ctx, x, y, s, vul, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = s * 0.35;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + d, y - d); ctx.closePath(); shape(ctx, vul ? lighten(vul, 0.15) : rgba('#AFC0D0', 0.08), '#AFC0D0', 2.5);
  ctx.beginPath(); ctx.moveTo(x + s, y); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + s + d, y + s - d); ctx.lineTo(x + s, y + s); ctx.closePath(); shape(ctx, vul ? _donker(vul, 0.2) : rgba('#AFC0D0', 0.05), '#AFC0D0', 2.5);
  ctx.beginPath(); ctx.rect(x, y, s, s); shape(ctx, vul || rgba('#AFC0D0', 0.06), '#AFC0D0', 2.5); ctx.restore(); }
function SP1_halter(ctx, x, y, s, col = C.oker, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.fillRect(x - s * 0.5, y - s * 0.06, s, s * 0.12);
  for (const k of [-1, 1]) { roundRect(ctx, x + k * s * 0.42 - s * 0.07, y - s * 0.26, s * 0.14, s * 0.52, s * 0.04); ctx.fill(); roundRect(ctx, x + k * s * 0.3 - s * 0.05, y - s * 0.19, s * 0.1, s * 0.38, s * 0.03); ctx.fill(); } ctx.restore(); }
// denkwolkje met een tekening erin
function SP1_wolkje(ctx, x, y, r, fn, a = 1, kant = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#F2F2EE', 0.95);
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); ctx.fill(); circ(ctx, x + kant * r * 0.9, y + r * 1.15, r * 0.17, rgba('#F2F2EE', 0.95)); circ(ctx, x + kant * r * 1.2, y + r * 1.5, r * 0.1, rgba('#F2F2EE', 0.95)); fn(); ctx.restore(); }
// half-ronde meter: v 0..1; ref = streepje (0..1); lab onder
function SP1_meter(ctx, cx, cy, r, v, o = {}) { const { a = 1, lab = '', kl = C.goud, ref = null, refLab = '', tekst = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.lineCap = 'butt'; ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = kl; ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * clamp(v, 0, 1)); ctx.stroke();
  if (ref != null) { const an = Math.PI + Math.PI * ref; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r * 0.78, cy + Math.sin(an) * r * 0.78); ctx.lineTo(cx + Math.cos(an) * r * 1.22, cy + Math.sin(an) * r * 1.22); ctx.stroke();
    if (refLab) metaText(ctx, refLab, cx + Math.cos(an) * r * 1.32, cy + Math.sin(an) * r * 1.32 - 6, C.text2, Math.cos(an) < -0.2 ? 'right' : Math.cos(an) > 0.2 ? 'left' : 'center', 28); }
  const an = Math.PI + Math.PI * clamp(v, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * r * 0.85, cy + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, cx, cy, 9, C.text);
  if (lab) metaText(ctx, lab, cx, cy + 50, C.text2, 'center', 28); if (tekst) text(ctx, tekst, cx, cy + 108, fTekst(40, 800), kl, 'center'); ctx.restore(); }
// horizontale balk met label: frac = lengte (0..1 van w)
function SP1_balk(ctx, x, y, w, frac, kl, lab, waarde, a = 1, h = 54) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#22314C', rgba(C.line, 0.6), 1.5);
  if (frac > 0.003) { roundRect(ctx, x, y, Math.max(h * 0.5, w * frac), h, 10); shape(ctx, rgba(kl, 0.8), kl, 2); }
  if (lab) metaText(ctx, lab, x, y - 16, C.text2, 'left', 28); if (waarde) text(ctx, waarde, x + w * frac + 22, y + h * 0.5 + 15, fTekst(42, 800), C.text, 'left'); ctx.restore(); }
// parabool snelheid → weerstand; u = waar het punt is (0..1 van vmax = 2,2), mark = toon de punten 1× en 2×
function SP1_parabool(ctx, x, y, w, h, o = {}) { const { a = 1, u = 0, m1 = 0, m2 = 0, vmax = 2.2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (v) => x + w * v / vmax, Y = (f) => y + h - h * f / (vmax * vmax);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
  metaText(ctx, 'SNELHEID →', x + w, y + h + 90, C.text2, 'right', 28); metaText(ctx, 'WEERSTAND', x, y - 26, C.koraal, 'left', 28);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const v = vmax * k / 60 * clamp(u > 0 ? 1 : 1, 0, 1); k ? ctx.lineTo(X(v), Y(v * v)) : ctx.moveTo(X(v), Y(v * v)); } ctx.stroke();
  const mk = (v, al, lx, ly) => { if (al <= 0.01) return; laag(ctx, al, () => { stippel(ctx, X(v), y + h, X(v), Y(v * v), C.line, 1, 2); stippel(ctx, x, Y(v * v), X(v), Y(v * v), C.line, 1, 2); circ(ctx, X(v), Y(v * v), 11, C.koraal, '#F2F2EE', 2);
    metaText(ctx, lx, X(v), y + h + 40, C.text, 'center', 30); metaText(ctx, ly, x - 14, Y(v * v) + 10, C.text, 'right', 30); }); };
  mk(1, m1, '1×', '1×'); mk(2, m2, '2×', '4×');
  if (u > 0.01) { const v = vmax * clamp(u, 0, 1); circ(ctx, X(v), Y(v * v), 13, C.goud); } ctx.restore(); }
// vooraanzicht in een kader: het 'gat in het water' (schuin 0..1 maakt het gat hoger)
function SP1_gat(ctx, x, y, w, schuin, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.8; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), C.line, 2);
  ctx.save(); roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 12); ctx.clip(); const wl = y + h * 0.36; ctx.fillStyle = SP1.water; ctx.fillRect(x, wl, w, h); ctx.strokeStyle = SP1.opp; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, wl); ctx.lineTo(x + w, wl); ctx.stroke();
  const cx = x + w / 2, s = w / 300, gh = 40 + schuin * 120; // gat: wat de zwemmer van voren ziet als vlak dat water opzij moet
  ctx.beginPath(); ctx.ellipse(cx, wl + 18 * s + gh * s * 0.45, 92 * s, (34 + gh * 0.55) * s, 0, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.22); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]);
  // zwemmer van voren: hoofd met badmuts, schouders, armen naar voren (verkort), benen lager naarmate hij schuiner ligt
  ctx.fillStyle = SP1.huid; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + k * 30 * s, wl + (34 + schuin * 90) * s + gh * s * 0.35, 13 * s, (16 + schuin * 30) * s, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(cx, wl + 26 * s + schuin * 30 * s, 78 * s, 24 * s + schuin * 22 * s, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, wl + 2 * s - schuin * 6 * s, 26 * s, 0, 6.283); ctx.fill(); ctx.fillStyle = SP1.muts; ctx.beginPath(); ctx.arc(cx, wl + 2 * s - schuin * 6 * s, 26 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.lineTo(cx + 26 * s, wl - 4 * s - schuin * 6 * s); ctx.lineTo(cx - 26 * s, wl - 4 * s - schuin * 6 * s); ctx.fill();
  ctx.restore(); metaText(ctx, 'VOORAANZICHT', x + w / 2, y + h + 40, C.text2, 'center', 28); ctx.restore(); }
// videokader met clip; fn tekent de inhoud; pauze = pauzeteken
function SP1_video(ctx, x, y, w, h, fn, o = {}) { const { a = 1, u = 0, pauze = false, lab = 'VIDEO' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 10, y - 10, w + 20, h + 64, 18); shape(ctx, '#0D1420', '#4A5468', 3);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore();
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 70, y + h + 24, w - 100, 8); ctx.fillStyle = C.goud; ctx.fillRect(x + 70, y + h + 24, (w - 100) * clamp(u, 0, 1), 8);
  if (pauze) { ctx.fillStyle = C.text; ctx.fillRect(x + 22, y + h + 14, 9, 28); ctx.fillRect(x + 38, y + h + 14, 9, 28); } else { ctx.beginPath(); ctx.moveTo(x + 22, y + h + 13); ctx.lineTo(x + 48, y + h + 28); ctx.lineTo(x + 22, y + h + 43); ctx.closePath(); ctx.fillStyle = C.text; ctx.fill(); }
  metaText(ctx, lab, x + 18, y + 44, C.text, 'left', 28); ctx.restore(); }
// laptop (vooraanzicht) op een tafeltje; fn(sx, sy, sw, sh) tekent het scherm
function SP1_laptop(ctx, x, y, w, fn, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#2A2F3E', '#5A6478', 2); ctx.fillStyle = '#0F1622'; ctx.fillRect(x + 12, y + 12, w - 24, h - 24);
  ctx.save(); ctx.beginPath(); ctx.rect(x + 12, y + 12, w - 24, h - 24); ctx.clip(); fn(x + 12, y + 12, w - 24, h - 24); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x - 20, y + h + 18); ctx.lineTo(x + w + 20, y + h + 18); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); shape(ctx, '#5A6478', '#3A4458', 2); ctx.restore(); }
function SP1_tafel(ctx, x, y, w, h) { ctx.fillStyle = '#5A4A3A'; ctx.fillRect(x, y, w, 14); ctx.fillRect(x + 14, y + 14, 12, h - 14); ctx.fillRect(x + w - 26, y + 14, 12, h - 14); }
// drijvertje (pull buoy) tussen de dijen
function SP1_drijvertje(ctx, x, y, s, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.ellipse(-s * 0.35, 0, s * 0.45, s * 0.32, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(s * 0.35, 0, s * 0.45, s * 0.32, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#C99A2E'; ctx.fillRect(-s * 0.05, -s * 0.25, s * 0.1, s * 0.5); ctx.restore(); }
// krachtspoor op een scherm: pieken bij elke duw; f(tt) = 0..1
function SP1_spoor(ctx, x, y, w, h, t, f, o = {}) { const { venster = 4, kl = C.oker } = o; ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 120; k++) { const tt = t - venster + venster * k / 120, v = tt < 0 ? 0 : f(tt); const px = x + w * k / 120, py = y + h - h * 0.9 * v; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
// goud omlijnde peddel: capsule van de hand (hx, hy) naar de elleboog (ex, ey)
function SP1_peddel(ctx, hx, hy, ex, ey, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(ey - hy, ex - hx), L = Math.hypot(ex - hx, ey - hy); ctx.translate(hx, hy); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(0, -r * 1.25); ctx.lineTo(L, -r); ctx.arc(L, 0, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(0, r * 1.25); ctx.arc(0, 0, r * 1.25, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
// boeilijn (15 m): stippellijn met drijvers aan het oppervlak
function SP1_boeilijn(ctx, x, wl, y1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; stippel(ctx, x, wl, x, y1, C.goud, 1, 3); for (let k = -1; k <= 1; k++) circ(ctx, x + k * 22, wl - 4, 9, k ? '#E8E8E2' : '#D8573F'); ctx.restore(); }

// ===== Van molecuul tot biosfeer 2.0 — eigen tekeningen (30 okt 2026) =====
grain = function () {}; // geen korrel buiten cellen (BEELDAFSPRAKEN 15 okt); binnen cellen geven de beeldbankobjecten zelf rustige textuur
function micro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
// Alles wat niet in de beeldbank staat. Nieuwe objecten met recept (C9); ze staan ook in bron/opwaardering-v13.md onder 'Voor de bibliotheek'.

const NIV = ['molecuul', 'organel', 'cel', 'weefsel', 'orgaan', 'orgaanstelsel', 'organisme', 'populatie', 'levensgemeenschap', 'ecosysteem', 'biosfeer'];
const EXAMEN = [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1]; // hoofdniveaus van het examenprogramma (vetter)
// maat per niveau (meta onder het huidige niveau); bronnen in bron/bronnen.md
// eenheden voluit (C10): metaText zet alles in hoofdletters en maakt van µ een Griekse Μ ('± 6 µm' werd '± 6 MM')
const NIV_MAAT = ['± 5 nanometer', '± 6 micrometer','± 0,1 mm', '± 1 mm', '± 1 cm', '± 14 cm', '± 14 cm', 'een bos', 'een bos', 'een bos', '12 742 km'];
const KENM = ['bestaat uit cellen', 'stofwisseling', 'groei en ontwikkeling', 'voortplanting', 'prikkels en beweging', 'homeostase'];
const HS = { cyto: '#5A2E34', cytoL: '#7A4048', rand: '#D98A7E', streep: '#3E1E24', schijf: '#F0C8A8', kern: '#6E5A9E', kernR: '#A392D6' }; // hartspier
const KEEL = { cyto: '#2C3A52', rand: '#9FB4CC' };
const HEMEL = '#6E8CA8', HEMEL2 = '#88A2BA', GROND = '#3A2E24', GRAS = '#5E8A4E', GRASD = '#4A7240'; // Macro-dag (C3) voor het bos: ecosysteem 'in werking'

function A(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// =====================================================================================
// HARTSPIERCEL. Recept (OpenStax A&P 2e § 19.2 en § 10.7; Junqueira h. 10): vertakte, cilindrische cel van ± 50–100 µm lang en
// ± 15 µm dik; één (soms twee) ovale kern in het midden; dwarsgestreept (sarcomeren ± 2 µm); veel mitochondriën in rijen tussen de
// myofibrillen; aan de uiteinden tussenschijven (intercalated discs) als donkere trapvormige lijnen, die de cel met zijn buren
// verbinden. Samentrekken: korter (± 15 %) en iets dikker; de kern blijft even groot. Bekende fouten: skeletspiervezel (lang,
// onvertakt, kernen aan de rand) als hartspiercel tekenen; kern aan de rand; geen tussenschijven.
// hartspierCel(ctx, x, y, L, {a, rot, c = 0..1 samentrekken, takken = true, mito = true, kernHl}) → {kern:[x,y], mito:[[x,y]...]}
// =====================================================================================
function _hsVorm(L, d, takken) { // omtrek in lokale coördinaten, x langs de cel (−L/2..L/2)
  const h = d / 2, P = [];
  const top = [[-L * 0.5, -h * 0.9], [-L * 0.36, -h], [-L * 0.1, -h * 1.04], [L * 0.18, -h], [L * 0.3, -h * 0.95]];
  if (takken) top.push([L * 0.4, -h * 1.5], [L * 0.52, -h * 2.2], [L * 0.56, -h * 1.5], [L * 0.44, -h * 0.75]);
  top.push([L * 0.5, -h * 0.85]);
  const bot = [[L * 0.5, h * 0.9], [L * 0.3, h * 1.02], [L * 0.05, h], [-L * 0.2, h * 1.02]];
  if (takken) bot.push([-L * 0.32, h * 1.2], [-L * 0.46, h * 1.9], [-L * 0.53, h * 1.3]);
  bot.push([-L * 0.5, h * 0.8]);
  return top.concat(bot);
}
function hartspierCel(ctx, x, y, L, o = {}) {
  const { a = 1, rot = 0, c = 0, takken = true, mito = true, kernHl = 0, d0 = null } = o; const ret = { kern: [x, y], mito: [] };
  if (a <= 0.01) return ret;
  const k = 1 - 0.15 * clamp(c, 0, 1), Lk = L * k, d = (d0 || L * 0.17) / Math.sqrt(k);
  const P = _hsVorm(Lk, d, takken); const cs = Math.cos(rot), sn = Math.sin(rot);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round';
  const lw = Math.max(1, L * 0.004);
  ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, HS.cyto, HS.rand, lw * 1.6);
  ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip();
  // myofibrillen in de lengte met dwarsstrepen (A-band donker, I-band licht); sarcomeer korter bij samentrekken
  const sar = Math.max(6, L * 0.05) * k;
  ctx.strokeStyle = rgba(HS.cytoL, 0.7); ctx.lineWidth = Math.max(0.6, lw * 0.6); for (let r = -2; r <= 2; r++) { const yy = r * d * 0.2; ctx.beginPath(); ctx.moveTo(-Lk * 0.6, yy); ctx.lineTo(Lk * 0.6, yy); ctx.stroke(); } // myofibrillen in de lengte, ijl
  ctx.fillStyle = rgba(HS.streep, 0.42); for (let xx = -Lk * 0.6; xx < Lk * 0.65; xx += sar) ctx.fillRect(xx, -d * 1.5, sar * 0.42, d * 3); // A-banden
  // mitochondriën in rijen tussen de myofibrillen
  if (mito) { for (let i = 0; i < 9; i++) { const mx = -Lk * 0.38 + i * Lk * 0.095 + (i % 2) * sar * 0.3, my = (i % 3 - 1) * d * 0.22; if (Math.abs(mx) < L * 0.09 && Math.abs(my) < d * 0.2) continue;
      roundRect(ctx, mx - sar * 0.8, my - d * 0.05, sar * 1.6, d * 0.1, d * 0.05); shape(ctx, C.mito, C.mitoR, Math.max(0.5, lw * 0.5)); ret.mito.push([x + mx * cs - my * sn, y + mx * sn + my * cs]); } }
  ctx.restore();
  // tussenschijven aan de uiteinden (trapvormig)
  ctx.strokeStyle = HS.schijf; ctx.lineWidth = Math.max(1.4, L * 0.006);
  for (const ex of [-Lk * 0.5, Lk * 0.5]) { const h = d * 0.45; ctx.beginPath(); ctx.moveTo(ex, -h); ctx.lineTo(ex, -h * 0.35); ctx.lineTo(ex + (ex < 0 ? 1 : -1) * sar * 0.6, -h * 0.35); ctx.lineTo(ex + (ex < 0 ? 1 : -1) * sar * 0.6, h * 0.3); ctx.lineTo(ex, h * 0.3); ctx.lineTo(ex, h); ctx.stroke(); }
  // kern in het midden, ovaal, iets scheef; blijft even groot
  const kw = L * 0.085, kh = d0 ? Math.min(d * 0.32, kw * 0.55) : L * 0.045;
  ctx.beginPath(); ctx.ellipse(L * 0.02, 0, kw, kh, 0.04, 0, 6.283); shape(ctx, HS.kern, HS.kernR, lw * 1.3);
  ctx.fillStyle = rgba('#3E2E66', 0.55); ctx.beginPath(); ctx.arc(L * 0.035, -kh * 0.15, kh * 0.32, 0, 6.283); ctx.fill();
  if (kernHl > 0.01) { ctx.save(); ctx.globalAlpha *= kernHl; ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, lw * 2); ctx.beginPath(); ctx.ellipse(L * 0.02, 0, kw * 1.25, kh * 1.35, 0.04, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ret.kern = [x + L * 0.02 * cs, y + L * 0.02 * sn]; return ret;
}

// =====================================================================================
// HARTSPIERWEEFSEL (lengtedoorsnede). Recept (OpenStax A&P 2e § 19.2, fig. 19.17; Junqueira h. 10): hartspiercellen liggen in
// evenwijdige rijen, vertakken naar de buurrij en sluiten met tussenschijven op elkaar aan, zodat het weefsel één netwerk is;
// elke cel één centrale kern; tussen de rijen haarvaten met rode bloedcellen. Celgrootte varieert (80–120 %), geen raster.
// hartspierWeefsel(ctx, x, y, w, h, {a, c, t, cel: L van één cel}) — (x, y) = midden; de cel op (x, y) ligt precies zoals
// hartspierCel(ctx, x, y, cel) hem tekent (dan kan een zoom van cel naar weefsel naadloos).
// =====================================================================================
function hartspierWeefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, c = 0, cel = 300, t = 0, rond = true } = o; if (a <= 0.01) return;
  const d = cel * 0.17, rij = d * 1.25; const k = 1 - 0.15 * clamp(c, 0, 1);
  ctx.save(); ctx.globalAlpha *= a;
  if (rond) { ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 6.283); ctx.clip(); }
  ctx.fillStyle = '#2A1A20'; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  const nr = Math.ceil(h / 2 / rij) + 1;
  for (let r = -nr; r <= nr; r++) {
    const yy = y + r * rij; if (r % 2 === 0 && r !== 0) { // haarvat tussen sommige rijen
    }
    const off = (r === 0 ? 0 : hash(r * 3.7) * cel) - cel * 0.5;
    for (let i = -Math.ceil(w / 2 / cel) - 1; i <= Math.ceil(w / 2 / cel) + 1; i++) {
      const L = r === 0 && i === 0 ? cel : cel * (0.85 + 0.3 * hash(r * 13 + i * 7));
      const cx = x + (r === 0 ? 0 : off) + i * cel * k;
      if (r === 0 && i === 0) continue;
      hartspierCel(ctx, cx, yy + (hash(r * 5 + i) - 0.5) * d * 0.15, L * 0.97, { c, takken: hash(r * 11 + i * 3) > 0.35, mito: false, d0: d });
    }
  }
  // haarvaten met rode bloedcellen tussen de rijen
  for (let r = -nr; r < nr; r += 2) { const yy = y + r * rij + rij * 0.5 + d * 0.62; ctx.fillStyle = rgba('#6E2A2A', 0.9); ctx.fillRect(x - w / 2, yy - d * 0.09, w, d * 0.18);
    for (let i = 0; i < 12; i++) { const px = x - w / 2 + ((i * 97 + t * 30 + r * 40) % (w + 40)); rodeBloedcel(ctx, px, yy, d * 0.09, 0, 1); } }
  hartspierCel(ctx, x, y, cel, { c, d0: d });
  ctx.restore();
}

// ---------- celdeling als vloeiende insnoering (twee cirkels met een taille) ----------
function delendeCel(ctx, x, y, r, f, o = {}) { // f 0 = één cel, 1 = twee losse dochtercellen (horizontaal); rot = richting
  const { rot = 0, a = 1, kleur = '#33405A', rand = '#B8C8DC' } = o; if (a <= 0.01) return; const ff = ease(clamp(f, 0, 1));
  const r1 = r * lerp(1, 0.8, ff), d = r1 * lerp(0, 1.04, ff); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const lw = Math.max(1.2, r * 0.03);
  // omtrek als één vorm: twee cirkels + een hals die smaller wordt (de cel snoert in, C8: morph, geen wissel)
  const vorm = (inset) => { const rr = r1 - inset, hals = Math.max(0, r1 * lerp(1, 0, ease(clamp(ff * 1.25, 0, 1))) - inset); ctx.beginPath();
    ctx.arc(-d, 0, rr, 0, 6.283); ctx.moveTo(d + rr, 0); ctx.arc(d, 0, rr, 0, 6.283);
    if (hals > 0.5 && d > 0.5) { ctx.moveTo(-d, -rr * 0.98); ctx.quadraticCurveTo(0, -hals, d, -rr * 0.98); ctx.lineTo(d, rr * 0.98); ctx.quadraticCurveTo(0, hals, -d, rr * 0.98); ctx.closePath(); } };
  vorm(0); ctx.fillStyle = rand; ctx.fill('nonzero'); vorm(lw); ctx.fillStyle = kleur; ctx.fill('nonzero');
  // kernen (bij delen: chromosomen in het midden even zichtbaar)
  const kr = r1 * 0.34; if (ff < 0.2) { ctx.beginPath(); ctx.arc(r * 0.06, -r * 0.04, r * 0.34, 0, 6.283); shape(ctx, '#6E5A9E', '#A392D6', lw); }
  else for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * d + r1 * 0.05, 0, kr * ease((ff - 0.2) / 0.5), 0, 6.283); shape(ctx, '#6E5A9E', '#A392D6', lw); }
  ctx.restore(); }

// ---------- trilhaarepitheel van de keel (Micro, in de zoomcirkel bij Noor) ----------
// Recept (OpenStax A&P 2e § 22.1: respiratory epithelium = pseudostratified ciliated columnar epithelium with goblet cells):
// cilindrische cellen, ± 3× zo hoog als breed, kern laag in de cel, trilharen bovenop als borstel; slijmbekercel ertussen.
// Griepvirussen hechten aan deze cellen en nieuwe virussen knoppen af aan de bovenkant (OpenStax Microbiology 6.2).
function keelEpitheel(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, virussen = 0, vr = 14, besmet = 2 } = o; if (a <= 0.01) return [];
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#121A26'; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  const n = 6, cw = w / n, top = y - h * 0.08, bot = y + h * 0.5, uit = [];
  for (let i = 0; i < n; i++) { const x0 = x - w / 2 + i * cw, slijm = i === 3; const P = [[x0 + 3, bot], [x0 + 2, top + 8], [x0 + cw * 0.5, top - (slijm ? 14 : 2)], [x0 + cw - 2, top + 8], [x0 + cw - 3, bot]];
    ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, slijm ? '#3A4A5E' : KEEL.cyto, KEEL.rand, 1.6);
    if (slijm) { ctx.beginPath(); ctx.ellipse(x0 + cw / 2, top + h * 0.12, cw * 0.32, h * 0.13, 0, 0, 6.283); shape(ctx, rgba('#C9D6E2', 0.35), rgba('#C9D6E2', 0.7), 1); }
    ctx.beginPath(); ctx.ellipse(x0 + cw / 2, bot - h * 0.16, cw * 0.22, h * 0.09, 0, 0, 6.283); shape(ctx, '#6E5A9E', '#A392D6', 1.4);
    if (!slijm) { ctx.strokeStyle = rgba('#D8E2EC', 0.75); ctx.lineWidth = 1.6; ctx.lineCap = 'round'; for (let k = 0; k < 7; k++) { const cx = x0 + cw * (0.15 + k * 0.12), sl = Math.sin(t * 5 + k * 0.6 + i) * 6; ctx.beginPath(); ctx.moveTo(cx, top + 2); ctx.quadraticCurveTo(cx + sl * 0.5, top - 12, cx + sl, top - 22); ctx.stroke(); } }
    if (i === besmet || i === besmet + 2) uit.push([x0 + cw / 2, top - 4]); }
  // nieuwe virussen knoppen af aan de bovenkant van besmette cellen en drijven weg
  if (virussen > 0.01) uit.forEach(([ux, uy], j) => { const m = Math.round(virussen * 5); for (let k = 0; k < m; k++) { const u = ((t * 0.25 + k * 0.21 + j * 0.37) % 1); const px = ux + Math.sin(k * 2.1 + j) * vr * 2.2 * u + (k - 2) * vr * 0.7 * u, py = uy - vr * 0.6 - u * h * 0.32;
    griepVirus(ctx, px, py, vr * (0.75 + 0.25 * Math.min(1, u * 4)), Math.min(1, u * 6, (1 - u) * 4)); } });
  ctx.restore(); return uit; }

// ---------- Noor ziek in bed (Macro, binnen) ----------
function bedScene(ctx, x, y, t, o = {}) { const { a = 1 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 420, y - 20, 840, 84, 14); shape(ctx, '#6B5338', '#4A3A2E', 2); roundRect(ctx, x - 440, y - 190, 40, 270, 10); shape(ctx, '#6B5338', '#4A3A2E', 2);
  roundRect(ctx, x - 390, y - 175, 130, 150, 30); shape(ctx, '#E6E1D3', '#C9C2B4', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 460, y - 760, 1100, 760 - 22); ctx.clip();
  const r = persoon(ctx, 'noor', x - 160, y + 120, 600, { zij: true, kijk: 1, pose: 'zit', uit: 'moe', zitHoogte: 140, t }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x - 280, y - 22); ctx.quadraticCurveTo(x - 180, y - 120, x - 30, y - 104); ctx.quadraticCurveTo(x + 220, y - 86, x + 400, y - 64); ctx.lineTo(x + 400, y - 20); ctx.lineTo(x - 280, y - 20); ctx.closePath(); shape(ctx, '#5A7FA0', '#46647F', 2);
  // nachtkastje met tissues
  roundRect(ctx, x + 450, y - 40, 170, 140, 8); shape(ctx, '#6B5338', '#4A3A2E', 2); roundRect(ctx, x + 480, y - 92, 110, 52, 6); shape(ctx, '#7FA6C8', '#5E86A8', 1.5);
  ctx.beginPath(); ctx.moveTo(x + 515, y - 92); ctx.quadraticCurveTo(x + 535, y - 130, x + 548, y - 118); ctx.quadraticCurveTo(x + 552, y - 100, x + 560, y - 92); ctx.closePath(); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 640 + i * 34, y + 96 - (i % 2) * 10, 16, 0, 6.283); shape(ctx, '#ECEAE4', '#C9C2B4', 1.2); }
  ctx.restore(); return r; }
function kamerAchter(ctx) { ctx.fillStyle = '#26354F'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3128'; ctx.fillRect(0, 820, W, H - 820); ctx.fillStyle = '#1E2A40'; ctx.fillRect(0, 808, W, 14);
  ctx.fillStyle = '#1E3050'; ctx.fillRect(1420, 110, 360, 330); ctx.strokeStyle = '#4A5A74'; ctx.lineWidth = 10; ctx.strokeRect(1420, 110, 360, 330); ctx.beginPath(); ctx.moveTo(1600, 110); ctx.lineTo(1600, 440); ctx.moveTo(1420, 275); ctx.lineTo(1780, 275); ctx.stroke(); }

// ---------- deur met deurklink (Macro) ----------
function deurKlink(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2E3C56'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#E6E1D3'; ctx.fillRect(x - 330, 60, 30, 860); ctx.fillRect(x + 330, 60, 30, 860);
  roundRect(ctx, x - 300, 70, 630, 900, 6); shape(ctx, '#8C6A4A', '#6B5338', 3); for (const [yy, hh] of [[120, 300], [480, 380]]) { roundRect(ctx, x - 240, yy, 510, hh, 8); ctx.strokeStyle = '#6B5338'; ctx.lineWidth = 4; ctx.stroke(); }
  roundRect(ctx, x + 180, 440, 54, 180, 22); shape(ctx, '#B8BEC6', '#8A9098', 2); // schild
  ctx.beginPath(); ctx.arc(x + 207, 490, 20, 0, 6.283); shape(ctx, '#C9CED6', '#8A9098', 2);
  roundRect(ctx, x + 40, 476, 180, 30, 15); shape(ctx, '#D2D7DE', '#8A9098', 2); // hendel
  ctx.beginPath(); ctx.ellipse(x + 207, 580, 7, 16, 0, 0, 6.283); ctx.fillStyle = '#4A4E56'; ctx.fill();
  ctx.restore(); }

// ---------- kamerplant die naar het licht buigt (fototropie) ----------
function kamerplant(ctx, x, y, s, buig = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - 60 * s, y - 90 * s); ctx.lineTo(x + 60 * s, y - 90 * s); ctx.lineTo(x + 46 * s, y); ctx.lineTo(x - 46 * s, y); ctx.closePath(); shape(ctx, '#B5654A', '#8E4A36', 2);
  ctx.fillStyle = '#3A2E24'; ctx.fillRect(x - 56 * s, y - 92 * s, 112 * s, 10 * s);
  const st = (dx, h, k) => { const bx = x + dx * s, by = y - 92 * s, ex = bx + buig * h * 0.55 * s, ey = by - h * s * (1 - buig * 0.12); ctx.strokeStyle = '#5E8A4E'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx, by - h * 0.6 * s, ex, ey); ctx.stroke();
    for (const [u, sd] of [[0.55, -1], [0.78, 1], [1, 0]]) { const px = lerp(bx, ex, u * u), py = lerp(by, ey, u), an = -Math.PI / 2 + buig * 0.9 + sd * 0.8; ctx.save(); ctx.translate(px, py); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -18 * s, 11 * s, 22 * s, 0, 0, 6.283); shape(ctx, k ? '#7FC48F' : '#5FA86E', '#4A8A58', 1.2); ctx.restore(); } };
  st(-22, 150, 0); st(4, 200, 1); st(26, 130, 0); ctx.restore(); }

// ---------- ei en nestje (koolmees: ei ± 17 × 13 mm, wit met roodbruine spikkels; legsel 6–12) ----------
function meesEi(ctx, x, y, s, o = {}) { const { a = 1, barst = 0, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.ellipse(0, 0, 6.5 * s, 8.5 * s, 0, 0, 6.283); shape(ctx, '#F4EFE6', '#C9C2B4', Math.max(1, s * 0.3));
  ctx.fillStyle = '#A0523E'; for (let i = 0; i < 9; i++) { const an = hash(i * 3.1) * 6.283, d = Math.sqrt(hash(i * 1.7)) * 5.6 * s; ctx.beginPath(); ctx.arc(Math.cos(an) * d, Math.sin(an) * d * 1.2 - 2 * s, s * 0.55, 0, 6.283); ctx.fill(); }
  if (barst > 0.01) { ctx.strokeStyle = '#6B5848'; ctx.lineWidth = Math.max(1, s * 0.35); ctx.beginPath(); const n = Math.round(2 + barst * 5); ctx.moveTo(-6 * s, -1 * s); for (let i = 1; i <= n; i++) ctx.lineTo(-6 * s + i * 12 / 7 * s, (i % 2 ? -3.2 : 0.4) * s); ctx.stroke(); }
  ctx.restore(); }
function nestje(ctx, x, y, s, n = 6, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 44 * s, 17 * s, 0, 0, 6.283); shape(ctx, '#7A6A4A', '#5A4A32', 2);
  ctx.beginPath(); ctx.ellipse(x, y - 4 * s, 34 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#4A3A2A'; ctx.fill();
  for (let i = 0; i < n; i++) meesEi(ctx, x + (i - (n - 1) / 2) * 11 * s, y - 6 * s + (i % 2) * 3 * s, s * 0.7, { rot: (i - 2) * 0.2 });
  ctx.strokeStyle = '#8C7A56'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 40 * s, y + Math.sin(an) * 15 * s); ctx.lineTo(x + Math.cos(an + 0.4) * 47 * s, y + Math.sin(an + 0.4) * 18 * s); ctx.stroke(); }
  ctx.restore(); }

// ---------- paddenstoel (vruchtlichaam van een schimmel; hoed met plaatjes, steel) ----------
function paddenstoel(ctx, x, y, s, o = {}) { const { a = 1, kleur = '#B9784E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - 6 * s, y); ctx.quadraticCurveTo(x - 8 * s, y - 20 * s, x - 5 * s, y - 34 * s); ctx.lineTo(x + 5 * s, y - 34 * s); ctx.quadraticCurveTo(x + 8 * s, y - 20 * s, x + 6 * s, y); ctx.closePath(); shape(ctx, '#E8DFCC', '#C9BFA8', 1.2);
  ctx.beginPath(); ctx.moveTo(x - 24 * s, y - 32 * s); ctx.quadraticCurveTo(x - 22 * s, y - 56 * s, x, y - 58 * s); ctx.quadraticCurveTo(x + 22 * s, y - 56 * s, x + 24 * s, y - 32 * s); ctx.quadraticCurveTo(x, y - 36 * s, x - 24 * s, y - 32 * s); shape(ctx, kleur, _mixHex(kleur, '#000000', 0.25), 1.2);
  ctx.restore(); }

// ---------- meetgerei voor de onderzoeker ----------
function thermometerGlas(ctx, x, y, s, niveau = 0.5, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // glazen thermometer op een paaltje, zonder getal (de stem noemt er geen)
  ctx.fillStyle = '#6A5444'; ctx.fillRect(x - 4 * s, y - 40 * s, 8 * s, 80 * s);
  roundRect(ctx, x - 13 * s, y - 210 * s, 26 * s, 180 * s, 13 * s); shape(ctx, rgba('#E6EEF4', 0.9), '#9AA3B2', 2);
  circ(ctx, x, y - 34 * s, 19 * s, C.koraal, '#B8584A', 2); ctx.fillStyle = C.koraal; const top = y - 40 * s - niveau * 150 * s; ctx.fillRect(x - 5 * s, top, 10 * s, y - 40 * s - top);
  ctx.strokeStyle = '#6A7488'; ctx.lineWidth = 1.5; for (let i = 0; i < 8; i++) { const yy = y - 60 * s - i * 19 * s; ctx.beginPath(); ctx.moveTo(x + 6 * s, yy); ctx.lineTo(x + (i % 2 ? 11 : 14) * s, yy); ctx.stroke(); }
  ctx.restore(); }
// ---------- bord met levenskenmerken (rijen) en kolommen met vinkjes/kruisjes ----------
function bord(ctx, x, y, w, rows, cols, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 70 + rows.length * 62, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.5), 1.5); metaText(ctx, 'LEVENSKENMERKEN', x + 30, y + 46, C.grain, 'left', 24);
  cols.forEach((c, j) => { const cx = x + w - 70 - (cols.length - 1 - j) * 120; if (c.a > 0.01) { if (c.icoon) A(ctx, c.a, () => c.icoon(cx, y + 36)); else regel(ctx, c.naam, cx, y + 46, c.a, c.col, 22, 'center', 700); } });
  rows.forEach((r, i) => { const yy = y + 110 + i * 62; regel(ctx, r.s, x + 30, yy, r.a, C.text, 30, 'left', 600); cols.forEach((c, j) => { const cx = x + w - 70 - (cols.length - 1 - j) * 120, v = c.v[i]; if (!v || v.a <= 0.01) return; if (v.ok === true) vink(ctx, cx, yy - 12, 16, v.a); else if (v.ok === false) kruis(ctx, cx, yy - 12, 14, v.a); else regel(ctx, v.s, cx + 40, yy - 2, v.a, C.goud, 22, 'right', 700); }); });
  ctx.restore(); }
// ---------- drie griepvirussen die steeds een beetje anders zijn (antigene drift): gekleurde kraag om de uitsteeksels ----------
function virusVarianten(ctx, x, y, r, a = 1, n = 3) { if (a <= 0.01) return; const K = [C.oker, C.teal, C.koraal];
  for (let i = 0; i < n; i++) { const px = x + (i - (n - 1) / 2) * r * 3.2; A(ctx, a, () => { ctx.save(); ctx.strokeStyle = rgba(K[i % 3], 0.85); ctx.lineWidth = r * 0.12; ctx.setLineDash([r * 0.12, r * 0.1]); ctx.beginPath(); ctx.arc(px, y, r * 1.2, 0, 6.283); ctx.stroke(); ctx.restore(); griepVirus(ctx, px, y, r); }); } }
function klembord(ctx, x, y, s, regels, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 70 * s, y - 95 * s, 140 * s, 190 * s, 8 * s); shape(ctx, '#8C6A4A', '#6B5338', 2); roundRect(ctx, x - 60 * s, y - 80 * s, 120 * s, 168 * s, 4 * s); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  roundRect(ctx, x - 26 * s, y - 102 * s, 52 * s, 18 * s, 5 * s); shape(ctx, '#B8BEC6', '#8A9098', 1.5);
  regels.forEach(([s1, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, s1, x - 50 * s, y - 50 * s + i * 34 * s, fTekst(22 * s, 700), '#1A2740', 'left'); ctx.restore(); } }); ctx.restore(); }

// ---------- bos (Macro-dag): achtergrond, middengrond met eiken, bodemband ----------
// Bomen zonder zichtbare wortels (BEELDAFSPRAKEN 29 okt). Diepte: verre rij kleiner en zachter, nabije groter (C8).
const BOS_EIK = [[260, 760, 0.62, 3], [700, 740, 0.7, 5], [1180, 770, 0.66, 7], [1640, 750, 0.72, 2]];
function bosAchter(ctx, o = {}) { const { hz = 640 } = o; ctx.fillStyle = HEMEL; ctx.fillRect(0, 0, W, H); ctx.fillStyle = HEMEL2; ctx.fillRect(0, hz - 140, W, 140);
  vul(ctx, [[-50, hz], [320, hz - 60], [760, hz - 20], [1180, hz - 80], [1560, hz - 30], [1980, hz - 70], [1980, H], [-50, H]], '#5C7E6C');
  ctx.save(); ctx.globalAlpha = 0.55; for (let i = 0; i < 9; i++) e2Eik(ctx, 90 + i * 230 + 60 * hash(i + 1), hz + 30, 0.3 + 0.06 * hash(i + 5), { seed: i + 11 }); ctx.restore();
  vul(ctx, [[-50, hz + 60], [500, hz + 30], [1100, hz + 70], [1990, hz + 40], [1990, H], [-50, H]], GRASD); }
function bosEiken(ctx, o = {}) { const { a = 1, hl = 0 } = o; BOS_EIK.forEach(([x, y, s, sd]) => { e2Eik(ctx, x, y, s, { seed: sd, a }); }); }
function bosBodem(ctx, o = {}) { const { hl = 0, nat = 0 } = o; vul(ctx, [[-50, 770], [600, 750], [1300, 790], [1990, 760], [1990, H], [-50, H]], GRAS);
  ctx.fillStyle = GROND; ctx.fillRect(0, 820, W, 80); if (hl > 0.01) { ctx.save(); ctx.globalAlpha = hl * 0.5; ctx.fillStyle = '#8C6A4A'; ctx.fillRect(0, 820, W, 80); ctx.restore(); }
  if (nat > 0.01) { for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.ellipse(40 + i * 74 + 20 * hash(i), 845 + 28 * hash(i + 3), 9, 5, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.8 * nat); ctx.fill(); } } }
// koolmezen in de bomen: [x, y, kijk] (y = tak/zitplek); maat ± 14 cm is klein naast een eik van ± 20 m (C8: schaal)
const BOS_MEZEN = [[520, 330, 1], [610, 380, -1], [800, 470, 1], [1110, 430, -1], [1290, 500, 1], [1700, 410, -1]];
const BOS_MERELS = [[660, 764, 1], [1500, 776, -1]];

// ---------- ladderbalk: de elf niveaus links in beeld, huidig niveau goud met maat ----------
function ladderBalk(ctx, cur, o = {}) { const { a = 1, x = 54, y0 = 836, dy = 66, aan = 1, virus = 0, t = 0, lit = null, breed = 330, maat = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 24, y0 - 10 * dy - 50, breed + 24, 10 * dy + 92, 18); shape(ctx, rgba('#0D1420', 0.72), rgba(C.line, 0.35), 1.2);
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 6, y0 + 10); ctx.lineTo(x + 6, y0 - 10 * dy - 10); ctx.stroke();
  NIV.forEach((n, i) => { const y = y0 - i * dy; const isC = i === cur; const al = lit ? lit[i] : (i <= cur ? 1 : 0.5) * aan;
    if (isC) { roundRect(ctx, x - 12, y - 32, breed - 6, 52, 26); shape(ctx, rgba(C.goud, 0.2), C.goud, 1.6); }
    circ(ctx, x + 6, y - 6, isC ? 7 : 5, isC ? C.goud : rgba(C.line, 0.8));
    ctx.save(); ctx.globalAlpha *= Math.max(0.35, al); text(ctx, n, x + 26, y + 2, fTekst(n.length > 15 ? 25 : 28, EXAMEN[i] ? 700 : 500), isC ? C.text : C.text2, 'left'); ctx.restore();
    if (isC && maat && NIV_MAAT[i]) metaText(ctx, NIV_MAAT[i].toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + breed - 22, y + 2, C.grain, 'right', 18); });
  if (virus > 0.01) { const y = y0 - 2 * dy; ctx.save(); ctx.globalAlpha *= virus; griepVirus(ctx, x + breed + 46, y - 8, 22); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + breed + 18, y - 8); ctx.lineTo(x + breed - 8, y - 8); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'virus', 'geen cel', x + breed + 80, y - 18, 1, 'left', C.koraal); ctx.restore(); }
  ctx.restore(); }

// ---------- zoom naar buiten: het kleine niveau krimpt tot een deel van het grotere (C8: doorlopende zoom) ----------
// u 0..1; binnen() tekent het kleine niveau zó dat het op (px, py) het beeld vult; buiten() tekent het grote niveau op zijn eigen
// eindplek, met het kleine niveau op (ax, ay); k = hoeveel keer groter het grote niveau is. Geen wissel van look tussen twee
// beelden: het grote niveau verschijnt eerst sterk vergroot en zoomt naar zijn eindmaat, het kleine niveau krimpt erin mee.
function zoomUit(ctx, u, P, Aa, k, binnen, buiten, o = {}) { const { uitBinnen = [0.55, 0.92], inBuiten = [0, 0.4] } = o;
  const e = ease(clamp(u, 0, 1)), z = Math.pow(k, 1 - e); const sx = lerp(P[0], Aa[0], e), sy = lerp(P[1], Aa[1], e);
  const aB = ramp(u, inBuiten[0], inBuiten[1] - inBuiten[0]), aI = 1 - ramp(u, uitBinnen[0], uitBinnen[1] - uitBinnen[0]);
  if (u > 0.001) A(ctx, aB, () => { ctx.save(); ctx.translate(sx, sy); ctx.scale(z, z); ctx.translate(-Aa[0], -Aa[1]); buiten(); ctx.restore(); });
  if (aI > 0.01) A(ctx, aI, () => { ctx.save(); ctx.translate(sx, sy); ctx.scale(z / k, z / k); ctx.translate(-P[0], -P[1]); binnen(); ctx.restore(); });
}

// ---------- koolmees met hart en bloedvaten (kijkje in het lijf; vogel blijft dekkend, de vaten liggen erop) ----------
// Plekken in koolmees-eenheden (× s, anker = voetpunt van VogelZang): hart in de borst achter het borstbeen, vóór in de romp.
// Vogelhart: in de borstkas, direct boven/achter het borstbeen, vóór de lever (Proctor, Manual of Ornithology; Whittow,
// Sturkie's Avian Physiology h. 10); bij zangvogels ± 1,5 % van het lichaamsgewicht. Grote vaten: halsslagaders naar de kop,
// armslagaders naar de vleugels, aorta naar achter (poten, staart); aders lopen ernaast terug.
const MEES_HART = [6, -56], MEES_HS = 0.032; // 1 cm ≈ 19 eenheden; hartDoorsnede is ± 600 hoog
// Oriëntatie (frisse beeldreview 30 okt 2026; Kroneman e.a. 2019, J. Morphol.: lange as evenwijdig aan borstbeen en kiel, boezems
// craniaal, punt van de kamers caudaal; Lumeij & Ritchie: punt ventraal tussen de leverkwabben): de rechtopstaande doorsnede
// (basis boven, punt onder) wordt 60° met de klok gedraaid, zodat de basis naar kop en hals wijst en de punt schuin naar achter-onder,
// langs het schuin lopende borstbeen van een zittende zangvogel (kijk = 1, kop rechts).
const MEES_HROT = Math.PI / 3;
const MEES_VAT = {
  // Rustiger (30 okt 2026, open punt frisse beeldreview): de vaten stoppen in de romp (niet over vleugelpennen, staart en poten),
  // de armslagader alleen tot de vleugelaanzet, en alleen de twee grote aders (hals, achterlijf) lopen ernaast terug.
  slag: [[[8, -60], [16, -76], [22, -92], [26, -104]], [[4, -62], [-8, -71], [-18, -75]], [[2, -52], [-28, -48], [-52, -46], [-66, -45]], [[-30, -48], [-33, -36], [-36, -26]]],
  ader: [[[0, -60], [10, -78], [16, -96]], [[-2, -56], [-30, -54], [-54, -52]]] };
function meesVaten(ctx, x, y, s, u = 1, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const tek = (lijst, col, lw) => lijst.forEach(P => { const Q = bioDicht(P.map(([px, py]) => [x + px * s, y + py * s]), 40); const n = Math.max(2, Math.round(Q.length * clamp(u, 0, 1)));
    ctx.strokeStyle = rgba('#121A26', 0.45); ctx.lineWidth = lw + 1.5; ctx.beginPath(); Q.slice(0, n).forEach(([qx, qy], i) => i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy)); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); Q.slice(0, n).forEach(([qx, qy], i) => i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy)); ctx.stroke(); });
  tek(MEES_VAT.ader, BIO.ader, Math.max(1.5, 1.5 * s)); tek(MEES_VAT.slag, BIO.bloed, Math.max(1.8, 1.8 * s));
  // hart: dezelfde doorsnede als in de zoom (hartDoorsnede), op ware grootte: ± 1 cm in een vogel van ± 14 cm (MEES_HS per eenheid)
  ctx.save(); ctx.translate(x + MEES_HART[0] * s, y + MEES_HART[1] * s); ctx.rotate(MEES_HROT);
  hartDoorsnede(ctx, 0, 0, MEES_HS * s, { u: (t * 1.1) % 1, detail: 0.4 }); ctx.restore();
  if (u > 0.95) { const Q = bioDicht(MEES_VAT.slag[2].map(([px, py]) => [x + px * s, y + py * s]), 60); for (let i = 0; i < 3; i++) { const k = Math.floor(((t * 0.4 + i / 3) % 1) * (Q.length - 1)); circ(ctx, Q[k][0], Q[k][1], Math.max(2, 1.8 * s), BIO.bloedL); } }
  ctx.restore(); }

// ---------- klein beeld per niveau (recap en eindbeeld); sz = maat van het vak ----------
function niveauIcoon(ctx, i, x, y, sz, t = 0) { const s = sz / 200; ctx.save();
  if (i === 0) eiwitVouw(ctx, x, y, 0.42 * s, 1, Array(46).fill('a'), { kleur: 'eiwit' });
  else if (i === 1) kernEnvelopPorie(ctx, x, y, 0.5 * s, { r: 150 });
  else if (i === 2) hartspierCel(ctx, x, y, 190 * s, { c: 0.5 + 0.5 * Math.sin(t * 3) });
  else if (i === 3) hartspierWeefsel(ctx, x, y, 190 * s, 150 * s, { cel: 90 * s, t, c: 0.5 + 0.5 * Math.sin(t * 3) });
  else if (i === 4) hartDoorsnede(ctx, x, y + 6 * s, 0.24 * s, { u: (t * 1.1) % 1 });
  else if (i === 5) { koolmees(ctx, x + 22 * s, y + 52 * s, 0.62 * s); meesVaten(ctx, x + 22 * s, y + 52 * s, 0.62 * s, 1, t); }
  else if (i === 6) koolmees(ctx, x + 22 * s, y + 52 * s, 0.62 * s);
  else if (i >= 7 && i <= 9) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, 92 * s, 0, 6.283); ctx.clip(); ctx.translate(x, y); ctx.scale(s * 0.2, s * 0.2); ctx.translate(-960, -560);
      bosAchter(ctx); if (i >= 8) bosEiken(ctx); bosBodem(ctx, { hl: i === 9 ? 1 : 0, nat: i === 9 ? 1 : 0 }); BOS_MEZEN.forEach(([mx, my, kj]) => koolmees(ctx, mx, my, 0.5, { kijk: kj }));
      if (i >= 8) BOS_MERELS.forEach(([mx, my, kj]) => merel(ctx, mx, my, 0.55, { kijk: kj })); if (i === 9) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 20; for (let k = 0; k < 10; k++) { const an = k * 0.628; ctx.beginPath(); ctx.moveTo(1700 + Math.cos(an) * 110, 150 + Math.sin(an) * 110); ctx.lineTo(1700 + Math.cos(an) * 160, 150 + Math.sin(an) * 160); ctx.stroke(); } circ(ctx, 1700, 150, 80, '#F2C94C'); ctx.restore(); }
      ctx.restore(); }
  else if (i === 10) aarde(ctx, x, y, 92 * s, 1, t);
  ctx.restore(); }

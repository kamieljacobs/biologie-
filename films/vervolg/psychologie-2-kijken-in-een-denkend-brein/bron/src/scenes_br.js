// ---------- extra tekeningen voor deze film ----------
function nieuwsKaart(ctx, x, y, s, a = 1, vlekA = 1, t = 0, kop = 'Wetenschappers vinden het verliefdheidsgebied') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 680, 560, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, 0, 680, 60); text(ctx, 'NIEUWS', 28, 42, fMeta(28), '#F2EEE4', 'left');
  ctx.save(); ctx.font = fTekst(34, 800); ctx.fillStyle = '#1A2740'; wrap(ctx, kop, 28, 110, 620, 42); ctx.restore();
  roundRect(ctx, 28, 210, 624, 320, 10); shape(ctx, '#1A2740', null);
  brein(ctx, 340, 400, 0.72, 1, {}); vlek(ctx, 300, 430, 34, '#F0A04A', vlekA, t, 1);
  ctx.restore(); }
function hartIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -30); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 2); ctx.restore(); }
function chocoIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -50, -34, 100, 68, 6); shape(ctx, '#6A4A3A', '#8C6A54', 2); ctx.strokeStyle = '#8C6A54'; ctx.lineWidth = 2; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 33, -34); ctx.lineTo(-50 + i * 33, 34); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.stroke(); ctx.restore(); }
function gameIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -30, 120, 60, 28); shape(ctx, '#3A4458', '#AFC0D0', 2); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-38, -4, 24, 8); ctx.fillRect(-30, -12, 8, 24); circ(ctx, 28, -6, 7, C.groen); circ(ctx, 42, 8, 7, C.koraal); ctx.restore(); }
function gezichtIcoon(ctx, x, y, s, a = 1, col = '#E3B998') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 34 * s, col, lighten(col, 0.3), 2); circ(ctx, x - 12 * s, y - 6 * s, 4 * s, '#2A2420'); circ(ctx, x + 12 * s, y - 6 * s, 4 * s, '#2A2420'); ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y + 4 * s, 12 * s, 0.3, 2.84); ctx.stroke(); ctx.restore(); }
function huisIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -32, -6, 64, 46, 4); shape(ctx, '#C9A35C', '#E0C890', 2); ctx.beginPath(); ctx.moveTo(-40, -4); ctx.lineTo(0, -40); ctx.lineTo(40, -4); ctx.closePath(); shape(ctx, C.koraal, null); ctx.fillStyle = '#5A4632'; ctx.fillRect(-8, 14, 16, 26); ctx.restore(); }
function postkoets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -90, 220, 110, 14); shape(ctx, '#8C5A3A', '#B08A5C', 2); roundRect(ctx, -80, -70, 60, 50, 6); shape(ctx, '#3A4458', null); roundRect(ctx, 20, -70, 60, 50, 6); shape(ctx, '#3A4458', null);
  [-70, 70].forEach(dx => { circ(ctx, dx, 34, 34, null, '#2E3A55', 7); circ(ctx, dx, 34, 6, '#2E3A55'); }); ctx.restore(); }
function zandloper(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-30, -44); ctx.lineTo(30, -44); ctx.lineTo(0, 0); ctx.lineTo(30, 44); ctx.lineTo(-30, 44); ctx.lineTo(0, 0); ctx.closePath(); shape(ctx, rgba(C.oker, 0.3), C.oker, 2.5); ctx.restore(); }
// een liggend personage (gekanteld) op het bed van de scanner
function liggend(ctx, id, x, y, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); persoon(ctx, id, 0, 0, h, { a, t, uit: 'neutraal' }); ctx.restore(); }
// kleine curve: BOLD-signaal dat ~5 s na de activiteit piekt
function boldGrafiek(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, '', '');
  metaText(ctx, 'TIJD (S)', x + w, y + h + 44, C.grain, 'right', 28); for (let k = 0; k <= 10; k += 5) metaText(ctx, String(k), x + k / 12 * w, y + h + 40, C.grain, 'center', 28);
  ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(x, y + h - 26, w * 0.5 / 12, 20); metaText(ctx, 'NEURONEN', x + 8, y + h - 36, C.teal, 'left', 28);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.beginPath(); const N = 80; for (let i = 0; i <= N * u; i++) { const tt = i / N * 12; const v = Math.max(0, tt - 1.5) ** 2 * Math.exp(-(Math.max(0, tt - 1.5)) / 1.2) / 3.4; const px = x + tt / 12 * w, py = y + h - v * h * 0.9; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke();
  ctx.restore(); }
// gemiddelde EEG-golven voor gezicht en huis (N170)
function erpGrafiek(ctx, x, y, w, h, a = 1, uG = 1, uH = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
  metaText(ctx, '0', x, y + h + 36, C.grain, 'center', 28); metaText(ctx, '0,2 S', x + w * 0.4, y + h + 36, C.grain, 'center', 28); metaText(ctx, '0,5 S', x + w, y + h + 36, C.grain, 'right', 28);
  const curve = (col, dip, u) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); const N = 120; for (let i = 0; i <= N * u; i++) { const tt = i / N * 0.5; const v = 0.35 * Math.exp(-(((tt - 0.1) / 0.03) ** 2)) - dip * Math.exp(-(((tt - 0.17) / 0.025) ** 2)) + 0.25 * Math.exp(-(((tt - 0.3) / 0.06) ** 2)); const px = x + tt / 0.5 * w, py = y + h / 2 - v * h * 0.8; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke(); };
  curve(C.oker, 0.25, uH); curve(C.teal, 0.85, uG); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { brein(ctx, 1480, 700, 0.8, 1, {}); vlek(ctx, 1435, 730, 36, '#F0A04A', 1, t, 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 470, 880, 600, { pose: 'vasthouden', uit: q.on('foto', 1) > 0.5 ? 'verbaasd' : 'neutraal', t });
    naamBij(ctx, 'Yasmin', 'leerling', 640, 330, q.on('Yasmin', 1));
    nieuwsKaart(ctx, 980, 150, 1.15, q.on('nieuwsbericht', 1), q.on('vlek', 1), t);
    tag(ctx, 'wat laat de vlek zien?', 1370, 860, C.goud, q.on('eigenlijk', 1), 'center', 34); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('bord', 1, 0.8);
    const ctg = [['kijken wat ontbreekt', 'ontbreekt', C.koraal], ['elektriciteit meten', 'elektriciteit', C.teal], ['bloed meten', 'bloed', C.koraal], ['zelf ingrijpen', 'ingrijpen', C.groen]];
    brein(ctx, 520, 470, 0.95, q.on('nooit', 1) * (1 - B * 0.5), {});
    ctg.forEach(([s2, w, col], i) => chip(ctx, s2, 520, 160 + i * 64, col, q.on(w, 1) * (1 - B * 0.4), 30));
    methodenBord(ctx, 1040, 160, 1, [], B);
    const kols = [['waar', 1440], ['wanneer', 1600], ['oorzaak', 1780]]; kols.forEach(([w, x2], i) => { const h = q.on(w, i === 2 ? 1 : 2, 0.4) * (1 - q.on(kols[Math.min(2, i + 1)][0], i + 1 === 2 ? 1 : 2, 0.4) * (i < 2 ? 1 : 0)); if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; roundRect(ctx, x2 - 90, 175, 180, 60, 10); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); ctx.restore(); } }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'PARIJS · 1861', 120, 140, C.grain, 'left', 30);
    bubbel(ctx, 400, 320, 'tan', '#F2F2EE', q.on('tan', 1), 64);
    tag(ctx, 'begrijpt bijna alles', 400, 470, C.groen, q.on('begrijpt', 1), 'center', 30);
    const d = q.on('dood', 1); brein(ctx, 1240, 520, 1.1, d, {}); vlek(ctx, 1000, 510, 64, C.koraal, q.on('beschadigd', 1), t, 0);
    tag(ctx, 'links voorin beschadigd', 1000, 650, C.koraal, q.on('beschadigd', 1) * (1 - q.on('heet', 1)), 'center', 30);
    naamBij(ctx, 'gebied van Broca', 'spraak maken', 820, 700, q.on('heet', 1));
    for (let i = 0; i < 3; i++) { const a = q.on('andere', 1, 0.5 + i * 0.3) * (1 - q.on('heet', 1) * 0.6); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; brein(ctx, 220 + i * 220, 760, 0.28, 1, {}); vlek(ctx, 150 + i * 220, 760, 18, C.koraal, 1); ctx.restore(); } } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const L = 1 - q.on('beroemdste', 1, 0.8);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'laesie = beschadiging', 960, 470, 1, C.text, 60, 'center', 700); ctx.restore(); }
    const G = q.on('beroemdste', 1, 0.8); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; metaText(ctx, 'VERENIGDE STATEN · 1848', 120, 140, C.grain, 'left', 30);
      const u = clamp((t - q.at('schiet', 1)) / 0.6, 0, 1); schedelStaaf(ctx, 620, 500, 1.15, 1, u);
      naamBij(ctx, 'Phineas Gage', 'spoorwegwerker', 900, 220, q.on('Phineas', 1));
      tag(ctx, 'linker voorkant geraakt', 620, 820, C.koraal, q.on('linker', 1), 'center', 30);
      ['lopen', 'praten', 'rekenen'].forEach((w, i) => { const a = q.on(w, 1); if (a > 0.01) { vink_(ctx, 1180, 360 + i * 80, 30, a, C.groen); regel(ctx, w, 1220, 372 + i * 80, a, C.text, 34, 'left', 700); } });
      const z = q.on('Twintig', 1); if (z > 0.01) { paneel(ctx, 1120, 600, 660, 220, '', z); regel(ctx, 'arts, 1868:', 1150, 660, z, C.grain, 28, 'left', 600); regel(ctx, '"ongeduldig en grof,', 1150, 720, z, C.text, 36, 'left', 600); regel(ctx, 'niet meer de betrouwbare voorman"', 1150, 772, z, C.text, 36, 'left', 640); }
      ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const m = q.on('zwerver', 1);
    chip(ctx, 'dronken zwerver', 480, 260, C.text2, m, 40); stempel(ctx, 480, 380, 'MYTHE', C.koraal, q.on('klopt', 1));
    postkoets(ctx, 1260, 380, 1.3, q.on('postkoets', 1)); tag(ctx, 'koetsier in Chili, zeven jaar', 1260, 540, C.groen, q.on('Chili', 1), 'center', 30);
    tag(ctx, 'karakter veranderd · deels hersteld', 960, 650, C.text, q.on('herstelde', 1) * (1 - q.on('autopsie', 1) * 0.6), 'center', 32);
    const s2 = q.on('autopsie', 1); if (s2 > 0.01) { schedelStaaf(ctx, 480, 640, 0.45, s2, 1); vraagteken(ctx, 640, 640, q.on('schatten', 1), 100); tag(ctx, 'schade alleen te schatten', 480, 860, C.text2, q.on('schatten', 1), 'center', 28); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const H = q.on('Henk', 1, 0.8);
    const kaarten = [['je kiest de plek niet', 'kiest'], ['schade is zelden één gebied', 'zelden'], ['de hersenen passen zich aan', 'passen']];
    kaarten.forEach(([s2, w], i) => { const a = q.on(w, 1) * (1 - H * 0.55); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120 + i * 580, 170, 520, 120, 14); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); regel(ctx, (i + 1) + '. ' + s2, 150 + i * 580, 245, 1, C.text, 32, 'left', 480); ctx.restore(); } });
    ['ongeluk', 'beroerte', 'tumor'].forEach((w, i) => tag(ctx, w, 260 + i * 140, 340, C.text2, q.on(w, 1) * (1 - q.on('zelden', 1)), 'center', 26));
    const P = q.on('patiënt', 1) * (1 - H); if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; brein(ctx, 960, 620, 0.85, 1, {}); vlek(ctx, 790, 610, 50, rgba(C.koraal, 0.5), 1); ctx.beginPath(); ctx.ellipse(780, 640, 120, 90, 0.2, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); tag(ctx, 'schade: groter en dieper', 790, 820, C.koraal, 1, 'center', 28); ctx.restore(); }
    if (H > 0.01) { persoon(ctx, 'henk', 520, 880, 520, { a: H, uit: 'bezorgd', t }); naamBij(ctx, 'Opa Henk', 'na een beroerte', 700, 420, H);
      brein(ctx, 1320, 600, 0.75, H, {}); vlek(ctx, 1380, 560, 40, C.koraal, q.on('schade', 2), t, 1);
      tag(ctx, 'welke taak lukt niet meer?', 1320, 380, C.goud, q.on('taak', 1), 'center', 30); } },

  s09(ctx, t, q) { bg(ctx, 'schema');
    methodenBord(ctx, 540, 220, 1, ['laesie'], 1, { hi: 'laesie', groei: { laesie: clamp((t - q.at('bord', 1)) / 2.5, 0, 1) } });
    tag(ctx, 'op een scan zie je de plek, maar de schade is grof', 960, 160, C.teal, q.on('grof', 1) * (1 - q.on('wanneer', 1)), 'center', 30);
    tag(ctx, 'je ziet alleen het eindresultaat', 960, 160, C.oker, q.on('eindresultaat', 1) * (1 - q.on('oorzaak', 1)), 'center', 30);
    haak(ctx, 1180, 1340, 450, 'waarschijnlijk nodig', C.groen, q.on('nodig', 1)); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Kim', 1), G = q.on('reeks', 1, 0.8);
    persoon(ctx, 'kim', 300, 880, 600, { a: K, pose: 'wijs', t }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 60, 200, K);
    persoon(ctx, 'yasmin', 700, 880, 580, { a: K, t }); eegKap(ctx, 700, 880 - 580 * 0.97, 72, q.on('kap', 1), t, q.on('optelsom', 1));
    tag(ctx, 'EEG', 700, 210, C.teal, q.on('EEG', 1), 'center', 44);
    for (let i = 0; i < 4; i++) golf(ctx, 940, 260 + i * 110, 820, 22, q.on('optelsom', 1) * (1 - G * 0.6), { t, seed: i + 1, freq: 3 + i });
    tag(ctx, 'optelsom van miljoenen neuronen, in hetzelfde ritme', 1350, 720, C.teal, q.on('ritme', 1) * (1 - q.on('Berger', 1)), 'center', 28);
    const B = q.on('Berger', 1) * (1 - G); if (B > 0.01) { metaText(ctx, 'HANS BERGER · 1924', 1350, 720, C.grain, 'center', 28); golf(ctx, 940, 800, 820, 26, q.on('rustige', 1), { t, freq: 10, schaal: 1, seed: 9, col: C.groen }); tag(ctx, '± 10 per seconde', 1350, 760, C.groen, q.on('tien', 1), 'center', 28); }
    if (G > 0.01) { for (let i = 0; i < 6; i++) { const huis = i === 3; const a = G * clamp((t - q.at('reeks', 1)) * 2 - i * 0.5, 0, 1); if (huis) huisIcoon(ctx, 1000 + i * 130, 790, 1, a); else gezichtIcoon(ctx, 1000 + i * 130, 790, 1, a); } } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('middelt', 1, 1), R = q.on('waar', 1, 0.8) * (1 - q.on('bord', 1, 0.8)), Bd = q.on('bord', 1, 0.8);
    regel(ctx, 'Antwoord a: wanneer', 120, 140, 1, C.groen, 40, 'left', 700);
    golf(ctx, 160, 400, 760, 46, (1 - M) * (1 - Bd), { t, seed: 3, freq: 6 }); tag(ctx, 'één gezicht: veel ruis', 540, 520, C.text2, q.on('ruis', 1) * (1 - M) * (1 - Bd), 'center', 28);
    if (M * (1 - Bd) > 0.01) { erpGrafiek(ctx, 160, 260, 760, 300, M * (1 - Bd), q.on('gezicht', 2), q.on('huis', 1)); tag(ctx, 'gezicht', 980, 300, C.teal, M * (1 - Bd), 'left', 30); tag(ctx, 'huis', 980, 360, C.oker, M * (1 - Bd), 'left', 30); tag(ctx, 'verschil na ± 0,17 s', 480, 640, C.goud, q.on('vijfde', 1) * (1 - Bd), 'center', 30); }
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; brein(ctx, 1460, 520, 0.7, 1, {}); circ(ctx, 1420, 380, 150, rgba(C.teal, 0.18)); circ(ctx, 1420, 380, 90, rgba(C.teal, 0.25)); tag(ctx, 'waar? vaag, als door een beslagen raam', 1460, 800, C.teal, q.on('raam', 1), 'center', 28); tag(ctx, 'diep: nauwelijks', 1460, 860, C.text2, q.on('diep', 1), 'center', 28); ctx.restore(); }
    methodenBord(ctx, 540, 260, 1, ['laesie', 'eeg'], Bd, { hi: 'eeg', groei: { eeg: clamp((t - q.at('bord', 1)) / 2, 0, 1) } }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), P = q.on('precies', 1, 0.8) * (1 - Bd), A = 1 - P - Bd;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; neuronElektrode(ctx, 500, 520, 1.2, 1, t, q.on('pulsje', 1));
      metaText(ctx, 'KAT · 1959', 1120, 160, C.grain, 'left', 30);
      const sch = q.on('Schuin', 1), rec = q.on('rechtop', 1); streepScherm(ctx, 1200, 340, 1.4, rec > 0.5 ? 0 : -0.7, q.on('lichtstreepjes', 1));
      const tijden = sch > 0.5 && rec < 0.5 ? [0.1, 0.18, 0.22, 0.35, 0.41, 0.55, 0.6, 0.72, 0.8, 0.9] : [0.3, 0.75]; spikeSpoor(ctx, 1060, 600, 700, tijden, q.on('reageren', 1), ((t * 0.4) % 1));
      tag(ctx, rec > 0.5 ? 'rechtop: stil' : 'schuin: veel pulsjes', 1410, 660, rec > 0.5 ? C.text2 : C.goud, sch, 'center', 30);
      naamBij(ctx, 'Hubel en Wiesel', 'Nobelprijs 1981', 1080, 780, q.on('Hubel', 1)); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; regel(ctx, 'welke cel, op welke duizendste seconde', 960, 220, 1, C.goud, 40, 'center', 700);
      chip(ctx, 'alleen bij dieren, of tijdens een hersenoperatie', 960, 380, C.text2, q.on('dieren', 1), 32);
      regel(ctx, 'hooguit een paar honderd cellen', 520, 560, q.on('honderd', 1), C.text, 40, 'center', 700); regel(ctx, 'van de 86 miljard', 1400, 560, q.on('miljard', 1), C.text2, 40, 'center', 700);
      ctx.save(); for (let i = 0; i < 300; i++) { const a = q.on('miljard', 1); if (a > 0.01) circ(ctx, 1060 + hash(i) * 680, 620 + hash(i + 900) * 220, 3, rgba(C.teal, 0.6 * a)); } for (let i = 0; i < 6; i++) circ(ctx, 380 + i * 50, 680, 9, C.goud, null); ctx.restore(); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel'], Bd, { hi: q.on('oorzaak', 1) > 0.5 ? null : 'cel', groei: { cel: clamp((t - q.at('bord', 1)) / 2, 0, 1) } }); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), N = q.on('nadeel', 1, 0.8) * (1 - Bd), A = 1 - N - Bd;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; scanner(ctx, 560, 520, 0.9, q.on('scanner', 1)); liggend(ctx, 'yasmin', 1000, 610, 520, q.on('Yasmin', 1), t); naamBij(ctx, 'fMRI', 'meet bloed', 100, 180, q.on('bloed', 1));
      bloedvat(ctx, 1080, 300, 680, q.on('seintje', 1), t, q.on('open', 1)); tag(ctx, 'meer zuurstofrijk bloed dan nodig', 1420, 420, C.koraal, q.on('nodig', 1), 'center', 30);
      tag(ctx, 'zuurstofrijk en zuurstofarm: anders voor een magneet', 1420, 820, C.teal, q.on('magneet', 1), 'center', 28); ctx.restore(); }
    if (N > 0.01) { boldGrafiek(ctx, 300, 260, 1200, 480, N, clamp((t - q.at('traag', 1)) / 3, 0, 1)); tag(ctx, 'piek na ± 5 s', 760, 230, C.koraal, q.on('piekt', 1), 'center', 32); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel', 'fmri'], Bd, { hi: 'fmri', groei: { fmri: clamp((t - q.at('Hoog', 1)) / 2, 0, 1) } }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const AF = q.on('trekt', 1, 0.8), W = q.on('werk', 1, 0.8);
    const sel = q.on('kleurt', 1); voxelRaster(ctx, 160, 220, 640, 480, 16, q.on('blokjes', 1) * (1 - W * 0.6), sel > 0.01 ? [[9, 7, '#F0A04A', sel], [10, 7, '#F0A04A', sel], [9, 8, '#F0A04A', sel * 0.7]] : null);
    tag(ctx, 'elk blokje: paar miljoen neuronen', 480, 760, C.text2, q.on('miljoen', 1) * (1 - AF), 'center', 28);
    const B = q.on('afwisselend', 1) * (1 - AF * 0.4); if (B > 0.01) { const k = Math.floor((t - q.at('afwisselend', 1)) / 1.2) % 2; for (let i = 0; i < 4; i++) { const on = (i % 2) === k; if (i % 2 === 0) gezichtIcoon(ctx, 1000 + i * 180, 300, 1.2, B * (on ? 1 : 0.35)); else huisIcoon(ctx, 1000 + i * 180, 300, 1.2, B * (on ? 1 : 0.35)); } tag(ctx, 'afwisselend in blokjes', 1270, 400, C.text2, B, 'center', 28); }
    if (AF > 0.01) { ctx.save(); ctx.globalAlpha *= AF * (1 - W * 0.5); regel(ctx, 'gezichten', 1000, 560, 1, C.teal, 36, 'left', 700); regel(ctx, '−  huizen', 1220, 560, 1, C.oker, 36, 'left', 700); regel(ctx, '=  vlek', 1460, 560, sel, '#F0A04A', 36, 'left', 700); ctx.restore(); tag(ctx, 'geen foto, maar een berekening', 1320, 660, C.goud, q.on('berekening', 1) * (1 - W), 'center', 32); }
    if (W > 0.01) haak(ctx, 960, 1700, 720, 'taak en controletaak bedenken: werk van de psycholoog', C.groen, W); },

  s16(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, '2009', 120, 140, C.grain, 'left', 30); scanner(ctx, 760, 520, 0.9, 1); zalm(ctx, 1080, 600, 1.1, q.on('zalm', 1));
    nieuwsKaart(ctx, 1280, 160, 0.55, q.on('foto', 1), 0, t, 'Hoe voelt deze persoon zich?'); vraagteken(ctx, 760, 260, q.on('vonden', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('correctie', 1, 1), IG = q.on('Nobelprijs', 1, 0.8);
    regel(ctx, 'Antwoord b: een paar blokjes', 120, 140, 1, C.groen, 40, 'left', 700);
    zalm(ctx, 560, 500, 1.2, 1 - IG * 0.4); vlek(ctx, 790, 488, 16, '#F0A04A', q.on('vlekje', 1) * (1 - C2), t, 1); tag(ctx, 'puur toeval', 790, 380, '#F0A04A', q.on('toeval', 1) * (1 - C2), 'center', 30);
    const T = q.on('honderdduizend', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T * (1 - IG * 0.5); for (let i = 0; i < 40; i++) for (let j = 0; j < 24; j++) { const lit = hash(i * 31 + j * 7) > 0.994 && C2 < 0.5; ctx.fillStyle = lit ? '#F0A04A' : rgba(C.line, 0.25); ctx.fillRect(1100 + i * 18, 220 + j * 18, 14, 14); } ctx.restore(); tag(ctx, 'meer dan 100.000 toetsen', 1460, 690, C.text2, T * (1 - IG), 'center', 28); }
    tag(ctx, 'met correctie: geen vlek', 1460, 760, C.groen, C2 * (1 - IG), 'center', 32);
    stempel(ctx, 1460, 780, 'IG NOBELPRIJS 2012', C.goud, IG); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), V = q.on('valkuil', 1, 0.8) * (1 - Bd), A = 1 - V - Bd;
    if (A > 0.01) { nieuwsKaart(ctx, 200, 170, 1, A, 1, t); tag(ctx, 'antwoord b', 540, 780, C.groen, q.on('bee', 1) * A, 'center', 34); tag(ctx, 'iets meer bloed dan bij een andere taak', 1380, 460, C.koraal, q.on('stroomde', 1) * A, 'center', 32); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; brein(ctx, 1240, 560, 0.95, 1, {}); vlek(ctx, 1180, 600, 44, '#F0A04A', 1, t, 1);
      const ic = [[hartIcoon, 'verliefdheid', 300], [chocoIcoon, 'chocola', 500], [gameIcoon, 'gamen', 700]]; ic.forEach(([f, w, y2], i) => { const a = q.on(w, 1); f(ctx, 340, y2, 1.2, a); if (a > 0.01) pijl(ctx, 430, y2, 1080, 600, rgba(C.goud, 0.7), a, 3, 14); });
      stempel(ctx, 1240, 300, 'GEEN VERLIEFDHEIDSGEBIED', C.koraal, q.on('verliefdheidsgebied', 1)); tag(ctx, 'doet mee bij beloning', 1240, 820, C.goud, q.on('beloning', 1), 'center', 32); ctx.restore(); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel', 'fmri'], Bd, { hi: 'fmri' }); haak(ctx, 1220, 1340, 610, 'doet waarschijnlijk mee; nodig? onbekend', C.koraal, q.on('nodig', 1)); },

  // ---------- H4 ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('benoemen', 1, 0.8);
    persoon(ctx, 'kim', 300, 880, 600, { pose: 'vasthouden', t }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 60, 200, 1);
    const hTr = q.on('trekt', 1, 0.2) * (1 - q.on('zelf', 1, 0.6)); persoon(ctx, 'yasmin', 720, 880, 580, { pose: hTr > 0.3 ? 'wijs' : 'staan', uit: hTr > 0.3 ? 'verbaasd' : 'neutraal', t });
    spoel(ctx, 720, 880 - 580 * 1.05, 0.8, q.on('spoel', 1), q.on('stroomstoot', 1) * (1 - q.on('heet', 1)) + hTr, t);
    tag(ctx, 'TMS', 900, 200, C.teal, q.on('TMS', 1), 'center', 44);
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 1080, 200, 680, 280, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); regel(ctx, 'plaatjes benoemen', 1110, 250, 1, C.text, 32, 'left', 600);
      huisIcoon(ctx, 1200, 360, 1.3, 1); regel(ctx, '"... huis"', 1300, 380, 1, C.text, 36, 'left', 700);
      const br = q.on('Broca', 1), ach = q.on('achterin', 1); roundRect(ctx, 1080, 520, 680, 280, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
      regel(ctx, 'verstoord: gebied van Broca', 1110, 580, br, C.koraal, 30, 'left', 640); ctx.fillStyle = C.koraal; roundRect(ctx, 1110, 610, 520 * br, 34, 8); ctx.fill(); regel(ctx, 'trager, soms fout', 1110, 680, q.on('trager', 1), C.koraal, 28, 'left', 600);
      regel(ctx, 'controle: gebied achterin', 1110, 740, ach, C.groen, 30, 'left', 640); ctx.fillStyle = C.groen; roundRect(ctx, 1110, 760, 300 * ach, 30, 8); ctx.fill(); ctx.restore(); } },

  s22(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord a: het gebied helpt bij de taak', 120, 140, 1, C.groen, 40, 'left', 700);
    kruis(ctx, 180, 290, 26, q.on('anders', 1)); regel(ctx, 'niet: het doet niets anders', 230, 304, q.on('anders', 1), C.text, 34, 'left', 800);
    kruis(ctx, 180, 380, 26, q.on('onmisbaar', 1)); regel(ctx, 'niet: het is onmisbaar', 230, 394, q.on('onmisbaar', 1), C.text, 34, 'left', 800);
    const D = q.on('buitenste', 1); if (D > 0.01) { brein(ctx, 1380, 560, 0.95, D, {}); ctx.save(); ctx.globalAlpha *= D; ctx.strokeStyle = C.teal; ctx.lineWidth = 10; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.ellipse(1390, 560, 270, 190, 0, 3.6, 5.9); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); tag(ctx, 'alleen de buitenste laag, paar cm diep', 1380, 820, C.teal, q.on('diep', 1), 'center', 30); }
    chip(ctx, 'reeksen pulsen: ook behandeling bij depressie', 600, 620, C.groen, q.on('depressie', 1), 30); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const Bd = clamp((t - q.at('2026', 1) - 2) / 1.5, 0, 1), O = 1 - Bd;
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; muis(ctx, 460, 640, 1.3, q.on('muizen', 1), q.on('aan', 1) * (1 - q.on('uit', 1)), t);
      chip(ctx, 'gen uit een groene alg', 460, 240, C.groen, q.on('alg', 1), 30); tag(ctx, 'alleen in één soort neuronen', 460, 300, C.text2, q.on('soort', 1), 'center', 28);
      lichtKanaal(ctx, 1320, 420, 1, q.on('blauw', 1) * (0.5 + 0.5 * Math.sin(t * 3)) * (1 - q.on('uit', 1)), q.on('kanaaltje', 1), t); tag(ctx, 'kanaaltje: open bij blauw licht', 1320, 600, C.teal, q.on('blauw', 1), 'center', 30);
      naamBij(ctx, 'optogenetica', 'aan en uit met licht', 1120, 700, q.on('optogenetica', 1));
      tag(ctx, 'aan → gedrag verschijnt: kan het veroorzaken', 1320, 790, C.groen, q.on('verschijnt', 1), 'center', 28); tag(ctx, 'uit → gedrag verdwijnt: nodig', 1320, 850, C.groen, q.on('verdwijnt', 1), 'center', 28);
      ctx.restore(); }
    stempel(ctx, 1500, 230, 'NOBELPRIJS 2026', C.goud, q.on('2026', 1) * O);
    methodenBord(ctx, 540, 170, 1, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], Bd, { groei: { tms: Bd, opto: clamp(Bd * 1.4 - 0.4, 0, 1) } }); },

  // ---------- Recap ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('methode', 1, 0.8), K = q.on('zelf', 1, 0.8);
    nieuwsKaart(ctx, 160, 200, 0.95, 1 - M, 1, t); tag(ctx, 'verschil in doorbloeding, na een statistische keuze', 1300, 400, C.koraal, q.on('doorbloeding', 1) * (1 - M), 'center', 30); tag(ctx, 'geen knop voor verliefdheid', 1300, 500, C.goud, q.on('knop', 1) * (1 - M), 'center', 34);
    methodenBord(ctx, 540, 170, 1, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], M * (1 - K * 0.5), { hi: q.on('optogenetica', 1) > 0.5 ? null : (q.on('fMRI', 1) > 0.5 ? 'fmri' : (q.on('EEG', 1) > 0.5 ? 'eeg' : null)) });
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; roundRect(ctx, 360, 380, 1200, 220, 18); shape(ctx, rgba('#1A2740', 0.95), C.goud, 2); regel(ctx, 'Is een gebied achter je voorhoofd nodig', 960, 460, 1, C.text, 40, 'center', 700); regel(ctx, 'om je te concentreren?', 960, 520, 1, C.text, 40, 'center', 700); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord c: TMS', 120, 140, 1, C.groen, 40, 'left', 700);
    methodenBord(ctx, 1080, 170, 0.9, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], 1 - q.on('werk', 1, 0.8) * 0.6, { hi: 'tms' });
    tag(ctx, 'nodig? → ingrijpen', 500, 300, C.groen, q.on('ingrijpen', 1), 'center', 36); tag(ctx, 'verstoor en meet de taak', 500, 380, C.text, q.on('concentratietaak', 1), 'center', 30); tag(ctx, '+ controleplek', 500, 450, C.goud, q.on('controleplek', 1), 'center', 30);
    [['vraag bedenken', 'vraag'], ['methode kiezen', 'methode'], ['eerlijk over grenzen', 'eerlijk']].forEach(([s2, w], i) => chip(ctx, s2, 300 + i * 320, 680, C.groen, q.on(w, 1), 28)); }
});

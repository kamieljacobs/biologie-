// Wat word jij? · Pedagogiek 1 · Een brein in aanbouw — eigen tekeningen (20 okt 2026)

function verkeerslicht(ctx, x, y, s, a = 1, kleur = 'rood') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#5A6478'; ctx.fillRect(-8, 0, 16, 320); roundRect(ctx, -44, -190, 88, 200, 18); shape(ctx, '#20242E', '#6A7080', 2);
  [['rood', '#E0533F'], ['geel', '#F2C14E'], ['groen', '#5FC77A']].forEach(([k, c], i) => circ(ctx, 0, -150 + i * 62, 24, k === kleur ? c : rgba(c, 0.18))); ctx.restore(); }
function fietsje(ctx, x, y, s, a = 1, col = '#AFC0D0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; [[-48, 0], [48, 0]].forEach(([dx]) => { ctx.beginPath(); ctx.arc(x + dx * s, y, 30 * s, 0, 6.283); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x - 48 * s, y); ctx.lineTo(x - 6 * s, y - 40 * s); ctx.lineTo(x + 48 * s, y); ctx.moveTo(x - 6 * s, y - 40 * s); ctx.lineTo(x + 34 * s, y - 40 * s); ctx.lineTo(x + 48 * s, y); ctx.moveTo(x - 6 * s, y - 40 * s); ctx.lineTo(x - 14 * s, y - 56 * s); ctx.stroke(); ctx.restore(); }
function wegStrook(ctx, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3850'; ctx.fillRect(0, y, W, 120); ctx.strokeStyle = rgba('#E8E2D8', 0.6); ctx.lineWidth = 4; ctx.setLineDash([30, 26]); ctx.beginPath(); ctx.moveTo(0, y + 60); ctx.lineTo(W, y + 60); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }

// brein dat groeit: f = 0.25 (pasgeboren) … 1 (volwassen); grootte als oppervlak ∝ massa^(2/3) is te ingewikkeld: schaal lineair met f^(1/3) zodat 'een kwart' zichtbaar kleiner is
function groeiBrein(ctx, x, y, s, f, a = 1, label = '') { const k = Math.cbrt(f); brein(ctx, x, y, s * k, a); if (label) regel(ctx, label, x, y + 220 * s, a, C.text, 30, 'center', 700); }

// netwerk van neuronen: dicht 0..1 (aantal verbindingen), snoei 0..1 (zwakke weg, sterke dikker)
function netwerkGroei(ctx, x, y, w, h, a = 1, dicht = 1, snoei = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = 16; const P = Array.from({ length: N }, (_, i) => [x + 40 + hash(i + 7) * (w - 80), y + 40 + hash(i + 31) * (h - 80)]);
  const L = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (d < w * 0.45) L.push([i, j, hash(i * 19 + j * 7)]); }
  L.forEach(([i, j, g], n) => { const zicht = n / L.length < dicht; if (!zicht) return; const sterk = g > 0.62; const al = sterk ? 1 : 1 - snoei; if (al <= 0.02) return; ctx.strokeStyle = rgba(sterk ? C.teal : C.line, (sterk ? 0.5 + 0.4 * snoei : 0.45) * al); ctx.lineWidth = sterk ? 2 + 5 * snoei : 1.5; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); });
  P.forEach(([px, py]) => circ(ctx, px, py, 13, '#4A4270', '#A392D6', 2)); ctx.restore(); }

// twee klanken in tekstballonnen (Hindi: tandklank en retroflexe klank), verschil = 0..1 hoe goed je het verschil hoort
function klanken(ctx, x, y, a = 1, verschil = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [['da', -1], ['ḍa', 1]].forEach(([s2, k]) => { roundRect(ctx, x + k * 170 - 120, y - 70, 240, 120, 30); shape(ctx, rgba(k < 0 ? C.teal : C.paars, 0.2), k < 0 ? C.teal : C.paars, 2.5); text(ctx, s2, x + k * 170, y + 12, fTitel(64), C.text, 'center'); });
  text(ctx, verschil > 0.5 ? '≠' : '=', x, y + 12, fTitel(56), verschil > 0.5 ? C.groen : C.koraal, 'center'); ctx.restore(); }

// axon met myeline: u 0..1 = hoeveel isolatie; signaaltje loopt sneller met myeline
function myelineAxon(ctx, x, y, w, a = 1, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const n = 8; for (let i = 0; i < n; i++) { if (i / n >= u) break; roundRect(ctx, x + 20 + i * (w - 40) / n, y - 24, (w - 40) / n - 14, 48, 22); shape(ctx, '#E8E2D4', '#B8B0A0', 2); }
  const v = 0.25 + 1.1 * u; const p = (t * v) % 1; circ(ctx, x + p * w, y, 11, C.goud); ctx.restore(); }

// zijaanzicht brein dat van achter naar voor 'klaar' kleurt (u 0..1); voorhoofdskwab als laatste
function breinRijping(ctx, x, y, s, a = 1, u = 0, t = 0) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[250, -20, 'zien'], [120, -150, 'voelen en bewegen'], [-20, -170, ''], [-160, -110, ''], [-240, 20, 'voorhoofdskwab']].forEach(([dx, dy, n], i) => { const f = clamp(u * 5 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.beginPath(); ctx.ellipse(x + dx * s, y + dy * s, 62 * s, 46 * s, 0.2, 0, 6.283); shape(ctx, rgba(i === 4 ? C.goud : C.groen, 0.45), i === 4 ? C.goud : C.groen, 2); ctx.restore(); });
  ctx.restore(); }

// beloningssysteem (diep, koraal, pulserend) en rem voorin (teal, gestippeld = in aanbouw)
function beloningRem(ctx, x, y, s, a = 1, bel = 1, rem = 1, t = 0, extra = 0) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x - 220 * s, y + 0 * s, 80 * s, 70 * s, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.22), C.teal, 3); ctx.setLineDash([]); ctx.restore(); }
  if (bel > 0.01) { const p = 1 + (0.08 + 0.12 * extra) * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= bel; ctx.beginPath(); ctx.ellipse(x - 40 * s, y + 30 * s, 52 * s * p * (1 + 0.35 * extra), 36 * s * p * (1 + 0.35 * extra), 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.6 + 0.3 * extra), C.koraal, 2.5); ctx.restore(); }
  ctx.restore(); }

// rijspel 'Chicken' op een scherm: een auto rijdt op een muur af; u 0..1 = afstand afgelegd; botsing als u >= 1
function rijspel(ctx, x, y, w, h, a = 1, u = 0, keuze = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0E141E', '#6A7080', 3); ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 16); ctx.clip();
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x + 8, y + h * 0.55, w - 16, h * 0.3); ctx.strokeStyle = rgba('#E8E2D8', 0.7); ctx.lineWidth = 4; ctx.setLineDash([22, 18]); ctx.beginPath(); ctx.moveTo(x + 20, y + h * 0.7); ctx.lineTo(x + w * 0.86, y + h * 0.7); ctx.stroke(); ctx.setLineDash([]);
  for (let r = 0; r < 5; r++) for (let k = 0; k < 2; k++) { roundRect(ctx, x + w * 0.87 + k * 34 + (r % 2) * 17, y + h * 0.25 + r * 34, 32, 30, 3); shape(ctx, '#8C5A3A', '#B07A58', 1.5); }
  const cx = x + 40 + clamp(u, 0, 1) * (w * 0.87 - 180); roundRect(ctx, cx, y + h * 0.6, 140, 56, 12); shape(ctx, C.koraal, null); roundRect(ctx, cx + 30, y + h * 0.52, 80, 40, 10); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, cx + 30, y + h * 0.6 + 56, 15, '#2A2F3E'); circ(ctx, cx + 110, y + h * 0.6 + 56, 15, '#2A2F3E');
  text(ctx, 'punten: ' + (keuze === 'BOTS!' ? 0 : Math.round(clamp(u, 0, 1) * 100)), x + 40, y + 60, fTekst(34, 700), C.goud, 'left'); if (keuze) text(ctx, keuze, x + w / 2, y + 60, fTekst(40, 800), keuze === 'BOTS!' ? C.koraal : C.groen, 'center');
  ctx.restore(); ctx.restore(); }

// staafjes: risico in het rijspel per leeftijdsgroep, alleen en met leeftijdgenoten (schematisch)
function risicoStaven(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const G = [['pubers', 0.42, 0.88], ['jongvolwassenen', 0.4, 0.58], ['volwassenen', 0.38, 0.41]]; const gw = w / 3;
  G.forEach(([n, v1, v2], g) => { [[v1, C.teal, 'alleen'], [v2, C.koraal, 'met anderen']].forEach(([v, c, l], k) => { const bw = gw * 0.32, bx = x + g * gw + gw * 0.14 + k * (bw + 14); const hh = h * v * clamp(u * 3 - g, 0, 1); roundRect(ctx, bx, y + h - hh, bw, hh, 8); shape(ctx, rgba(c, 0.7), c, 2); }); text(ctx, n, x + g * gw + gw / 2, y + h + 44, fTekst(30, 700), C.text, 'center'); });
  roundRect(ctx, x + w - 330, y - 70, 24, 24, 4); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); text(ctx, 'alleen', x + w - 296, y - 50, fTekst(26, 600), C.text2, 'left'); roundRect(ctx, x + w - 190, y - 70, 24, 24, 4); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); text(ctx, 'met anderen', x + w - 156, y - 50, fTekst(26, 600), C.text2, 'left');
  metaText(ctx, 'RISICO IN HET RIJSPEL · SCHEMATISCH', x, y - 50, C.grain, 'left', 26); ctx.restore(); }

// trap: ruimte die stap voor stap groeit
function trap(ctx, x, y, a = 1, k = 4, labels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { const al = clamp(k - i, 0, 1); if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x + i * 190, y - i * 90, 190, 90 + i * 90, 6); shape(ctx, rgba(C.groen, 0.18 + i * 0.12), C.groen, 2); if (labels[i]) text(ctx, labels[i], x + i * 190 + 95, y - i * 90 + 52, fTekst(26, 700), C.text, 'center'); ctx.restore(); } ctx.restore(); }

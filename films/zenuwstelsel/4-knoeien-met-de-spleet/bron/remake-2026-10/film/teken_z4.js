// Zenuwstelsel 4 · Knoeien met de synaps — tekenhulpjes (lichte remake 29 okt 2026, Part C donker).
// Kleuren (tabel Zenuwstelsel/Hormonen, Kamiel 29 okt 2026): zenuwsignaal teal, neurotransmitter licht teal.
const Z4 = {
  nt: '#9CCBE3',        // neurotransmitter (ook adenosine, GABA, glutamaat, serotonine, dopamine, acetylcholine)
  stof: '#D8DDE6',      // een lichaamsvreemde stof (nicotine, alcohol): neutraal lichtgrijs
  cafe: '#B98A5E',      // cafeïne (koffiebruin)
  grond: C.oker,        // grondstof (levodopa): oker, zoals voedsel/grondstof
  blok: C.koraal,       // SSRI-blokkade op de transporter (zoals in synapsEcht)
  cel: '#2E3A4E', celR: '#5C6E8C', rec: '#7FA6A0', neuron: '#6F86A6'
};
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const IN = (t, t0, d = 0.5) => ramp(t, t0, d);
function bgM(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // micro zonder korrel buiten cellen

// ---------- molecuulvormpjes ----------
// soort: 'nt' (afgerond driehoekje), 'ado' (vijfhoek+zeshoek, adenosine), 'cafe' (zelfde basisvorm als adenosine, zonder staart),
// 'alc' (ethanol: twee bolletjes + OH), 'grond' (zeshoekje), 'blok' (bolletje met uitsteeksel)
function mol(ctx, soort, x, y, r, col, a = 1, an = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineJoin = 'round';
  const rand = lighten(col, 0.4);
  if (soort === 'nt') { ctx.beginPath(); for (let i = 0; i < 3; i++) { const q = -Math.PI / 2 + i * 2.094; ctx.lineTo(Math.cos(q) * r, Math.sin(q) * r); } ctx.closePath(); ctx.lineWidth = r * 0.5; ctx.strokeStyle = col; ctx.stroke(); ctx.fillStyle = col; ctx.fill(); }
  else if (soort === 'ado' || soort === 'cafe') { // twee ringen naast elkaar (purine-achtig); adenosine heeft er nog een suikerring aan
    const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let i = 0; i < n; i++) { const q = i * 6.283 / n + 0.3; ctx.lineTo(cx + Math.cos(q) * rr, cy + Math.sin(q) * rr); } ctx.closePath(); shape(ctx, col, rand, Math.max(1, r * 0.12)); };
    ring(-r * 0.45, 0, 6, r * 0.62); ring(r * 0.55, 0, 5, r * 0.52);
    if (soort === 'ado') { ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1, r * 0.14); ctx.beginPath(); ctx.moveTo(r * 0.9, r * 0.3); ctx.lineTo(r * 1.25, r * 0.75); ctx.stroke(); ring(r * 1.5, r * 1.0, 5, r * 0.42); }
    else { ctx.fillStyle = rand; for (const [px, py] of [[-r * 0.95, -r * 0.55], [r * 0.15, r * 0.75], [r * 1.05, -r * 0.5]]) { ctx.beginPath(); ctx.arc(px, py, r * 0.16, 0, 6.283); ctx.fill(); } } }
  else if (soort === 'alc') { circ(ctx, -r * 0.55, 0, r * 0.5, col, rand, 1.2); circ(ctx, r * 0.35, 0, r * 0.5, col, rand, 1.2); circ(ctx, r * 0.95, -r * 0.45, r * 0.34, C.teal, lighten(C.teal, 0.4), 1.2); }
  else if (soort === 'grond') { ctx.beginPath(); for (let i = 0; i < 6; i++) { const q = i * 1.047; ctx.lineTo(Math.cos(q) * r, Math.sin(q) * r); } ctx.closePath(); shape(ctx, col, rand, 1.2); ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(r, 0); ctx.lineTo(r * 1.6, 0); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(0, 0, r * 0.7, 0, 6.283); shape(ctx, col, rand, 1.2); }
  ctx.restore();
}

// ---------- membraan in close-up (gebogen: een stuk van een grote cirkel) ----------
// Het volgende neuron ligt ONDER het membraan; de spleet erboven. Geeft functie punt(u) → [x, y, hoek naar buiten].
function celBoog(ctx, x0, x1, yTop, R = 1200, o = {}) {
  const { a = 1, t = 0, binnen = true } = o; const cx = (x0 + x1) / 2, cy = yTop + R; const half = Math.min(Math.asin(Math.min(1, ((x1 - x0) / 2) / R)), 1.25);
  const pt = u => { const q = -Math.PI / 2 + (u - 0.5) * 2 * half; return [cx + Math.cos(q) * R, cy + Math.sin(q) * R, q]; };
  if (a <= 0.01) return pt;
  // zichtbaar deel van de cirkel (boven de onderrand): hele cel is rond, geen rechte zijkanten
  const vis = Math.min(Math.PI * 0.95, Math.acos(clamp((cy - H - 40) / R, -1, 1)));
  ctx.save(); ctx.globalAlpha *= a;
  if (binnen) { ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = Z4.cel; ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.11); for (let i = 0; i < 46; i++) { const px = cx - R * 0.9 + hash(i * 3) * R * 1.8, py = yTop + 40 + hash(i * 3 + 1) * 500; ctx.beginPath(); ctx.arc(px + Math.sin(t * 0.3 + i) * 2, py, 1.6, 0, 6.283); ctx.fill(); } ctx.restore(); }
  // dubbellaag: twee rijen koppen met korte staartjes langs het hele zichtbare membraan
  const n = Math.round(2 * vis * R / 13);
  for (const [d, dir] of [[-9, 1], [9, -1]]) { for (let i = 0; i <= n; i++) { const q = -Math.PI / 2 - vis + 2 * vis * i / n; const px = cx + Math.cos(q) * R, py = cy + Math.sin(q) * R; if (py > H + 20) continue; const nx = Math.cos(q), ny = Math.sin(q);
      ctx.strokeStyle = rgba(C.oker, 0.55); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(px + nx * d, py + ny * d); ctx.lineTo(px + nx * (d - dir * 7), py + ny * (d - dir * 7)); ctx.stroke();
      ctx.beginPath(); ctx.arc(px + nx * d, py + ny * d, 3.6, 0, 6.283); ctx.fillStyle = C.er; ctx.fill(); } }
  ctx.restore(); return pt;
}

// ---------- receptor (ionkanaal) loodrecht in het membraan ----------
// o.bind: 0..1 ligand zit erin; o.lig = {soort, col}; o.open 0..1 (kanaal open: ionen stromen naar binnen); o.ion = kleur ionen
function receptor(ctx, x, y, an, s = 1, o = {}) {
  const { a = 1, bind = 0, lig = { soort: 'nt', col: Z4.nt }, open = 0, t = 0, ion = C.teal, hl = 0, col = Z4.rec, ionTeken = '+' } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an + Math.PI / 2); ctx.scale(s, s); // lokaal: -y = naar buiten (spleet)
  const gap = 7 + 9 * open;
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * (gap + 11), 2, 12, 34, sd * 0.06, 0, 6.283); shape(ctx, hl > 0.5 ? lighten(col, 0.25) : col, hl > 0.5 ? C.goud : lighten(col, 0.35), hl > 0.5 ? 3 : 1.5); }
  // bindingsplek (kuiltje bovenop de linkerhelft)
  ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.arc(-(gap + 11), -30, 7, 0, 6.283); ctx.fill();
  if (bind > 0.01) { const yy = lerp(-110, -30, ease(bind)); mol(ctx, lig.soort, -(gap + 11) + (1 - bind) * 30, yy, 11, lig.col, Math.min(1, bind * 3)); }
  if (open > 0.3) { ctx.save(); ctx.globalAlpha *= clamp((open - 0.3) / 0.4, 0, 1); for (let k = 0; k < 3; k++) { const v = (t * 0.9 + k / 3) % 1; const iy = lerp(-50, 70, v);
      circ(ctx, 0, iy, 5, ion, lighten(ion, 0.4), 1); if (ionTeken) text(ctx, ionTeken, 9, iy - 5, fTekst(16, 700), ion, 'left'); } ctx.restore(); }
  ctx.restore();
}

// ---------- ingreepkaart (de rode draad van de film) ----------
const PLEK = ['afgifte', 'receptor', 'opruimen', 'aanmaak'];
// o.rij[i] = alpha van rij i (0..3); o.hl = index of -1; o.stof[i] = [[tekst, kleur, alpha], ...]
function ingreepkaart(ctx, x, y, w, o = {}) {
  const { a = 1, rij = [1, 1, 1, 1], hl = -1, stof = {}, titel = 'ingreepkaart', rh = 92 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const h = 70 + rh * 4;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.82), C.line, 1.5);
  metaText(ctx, titel, x + 28, y + 46, C.grain, 'left', 28);
  for (let i = 0; i < 4; i++) { const ra = rij[i]; if (ra <= 0.01) continue; const yy = y + 70 + i * rh; ctx.save(); ctx.globalAlpha *= ra;
    if (hl === i) { roundRect(ctx, x + 12, yy + 6, w - 24, rh - 12, 12); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); }
    plekBadge(ctx, x + 56, yy + rh / 2, i + 1, 1);
    text(ctx, PLEK[i], x + 100, yy + rh / 2 + 12, fTekst(36, 600), C.text, 'left');
    let sx = x + 300; (stof[i] || []).forEach(([s, col, sa]) => { if (sa <= 0.01) return; ctx.save(); ctx.globalAlpha *= sa; ctx.font = fTekst(30, 600); const tw = ctx.measureText(s).width + 30;
      if (sx + tw > x + w - 14) { sx = x + 300; } roundRect(ctx, sx, yy + rh / 2 - 22, tw, 44, 22); shape(ctx, rgba(col, 0.18), col, 1.5); text(ctx, s, sx + tw / 2, yy + rh / 2 + 10, fTekst(30, 600), C.text, 'center'); ctx.restore(); sx += tw + 10; });
    ctx.restore(); }
  ctx.restore();
}
function plekBadge(ctx, x, y, n, a = 1, r = 24) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.goud); text(ctx, String(n), x, y + r * 0.42, fTekst(r * 1.25, 700), '#121A26', 'center'); ctx.restore(); }

// plekken op synapsZ4 (ontwerpcoördinaten van de synaps; oorsprong = midden van de spleet)
const PLEKPOS = [{ x: 10, y: -42, rx: 135, ry: 42 }, { x: 0, y: 38, rx: 185, ry: 34 }, { x: 130, y: -12, rx: 38, ry: 38 }, { x: 0, y: -262, rx: 52, ry: 40 }];
function plekRing(ctx, sx, sy, s, i, a = 1, badge = 1) { if (a <= 0.01) return; const P = PLEKPOS[i]; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 7]); ctx.beginPath(); ctx.ellipse(sx + P.x * s, sy + P.y * s, P.rx * s, P.ry * s, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]);
  if (i === 2) { ctx.beginPath(); ctx.ellipse(sx - 130 * s, sy - 12 * s, P.rx * s, P.ry * s, 0, 0, 6.283); ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore();
  const bx = i === 2 ? sx + (P.x + P.rx + 34) * s : sx + (P.x - P.rx - 34) * s; plekBadge(ctx, bx, sy + P.y * s, i + 1, a * badge); }
// aanmaak in de knop: grondstof komt door het axon binnen en wordt neurotransmitter (o.u 0..1 = stroom aan)
function aanmaak(ctx, sx, sy, s, t, u = 1, a = 1, n = 6) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * Math.min(1, u * 2);
  for (let k = 0; k < n; k++) { const v = (t * 0.35 + k / n) % 1; const px = sx + (Math.sin(k * 2.3) * 18) * s, py = sy + lerp(-330, -205, v) * s;
    if (v < 0.55) mol(ctx, 'grond', px, py, 9 * s, Z4.grond, 1, k); else mol(ctx, 'nt', px, py, 8 * s, Z4.nt, 1); }
  ctx.restore(); }

// ---------- zenuwcel-schakeling voor 'rem op de rem' ----------
function cel(ctx, x, y, r, a = 1, o = {}) { const { col = Z4.neuron, hl = 0, dim = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.65 * dim);
  for (let k = 0; k < 5; k++) { const q = k * 1.26 + 0.4; ctx.strokeStyle = col; ctx.lineWidth = r * 0.22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + Math.cos(q) * r * 0.8, y + Math.sin(q) * r * 0.8); ctx.quadraticCurveTo(x + Math.cos(q + 0.2) * r * 1.5, y + Math.sin(q + 0.2) * r * 1.5, x + Math.cos(q + 0.35) * r * 2.0, y + Math.sin(q + 0.35) * r * 2.0); ctx.stroke(); }
  blob(ctx, x, y, r, r * 0.9, 0.05, x * 0.01); shape(ctx, col, hl > 0.5 ? C.goud : lighten(col, 0.35), hl > 0.5 ? 3 : 1.5);
  circ(ctx, x + r * 0.1, y - r * 0.05, r * 0.38, BIO.kern, lighten(BIO.kern, 0.3), 1); ctx.restore(); }
// axon van (x1,y1) naar (x2,y2) met eindknopje; puls = 0..1 positie van een impuls (teal bandje), of -1
function axon(ctx, x1, y1, x2, y2, a = 1, o = {}) { const { col = Z4.neuron, pulsen = [], dim = 0, rem = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.65 * dim);
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 30; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke();
  circ(ctx, x2, y2, 13, col, lighten(col, 0.35), 1.5); if (rem) text(ctx, '−', x2, y2 + 9, fTekst(28, 700), C.text, 'center');
  for (const p of pulsen) { if (p < 0 || p > 1) continue; const u = p, qx = (1 - u) * (1 - u) * x1 + 2 * u * (1 - u) * mx + u * u * x2, qy = (1 - u) * (1 - u) * y1 + 2 * u * (1 - u) * my + u * u * y2; ctx.beginPath(); ctx.arc(qx, qy, 9, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
  ctx.restore(); }

// ---------- meter (signaalsterkte) met band 'normaal' ----------
function meter(ctx, x, y, h, v, a = 1, o = {}) { const { titel = 'signaal', col = C.teal, norm = [0.42, 0.58], w = 70 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0D1420', C.line, 1.5);
  ctx.fillStyle = rgba(C.groen, 0.18); ctx.fillRect(x + 2, y + h * (1 - norm[1]), w - 4, h * (norm[1] - norm[0]));
  const vv = clamp(v, 0.02, 1); roundRect(ctx, x + 10, y + h * (1 - vv), w - 20, h * vv - 10, 8); shape(ctx, rgba(col, 0.8), col, 1.5);
  text(ctx, 'normaal', x + w + 14, y + h * (1 - (norm[0] + norm[1]) / 2) + 10, fTekst(28, 600), C.groen, 'left');
  metaText(ctx, titel, x + w / 2, y + h + 44, C.grain, 'center', 28); ctx.restore(); }

// ---------- decor thuis (Schema-look, vlak) ----------
function raam(ctx, x, y, w, h, nacht, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 6); shape(ctx, nacht ? '#152036' : '#3E5C82', '#8FA0B5', 3);
  if (nacht) { circ(ctx, x + w * 0.7, y + h * 0.3, 22, '#E8E2C8'); circ(ctx, x + w * 0.7 + 9, y + h * 0.3 - 6, 19, '#152036'); for (let i = 0; i < 6; i++) circ(ctx, x + w * hash(i + 3), y + h * hash(i + 9) * 0.8, 2, '#C9CED6'); }
  else { circ(ctx, x + w * 0.3, y + h * 0.35, 26, '#F2C94C'); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke(); ctx.restore(); }
function tafel(ctx, x, yv, w, hT, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#8C6A4A'; ctx.fillRect(x, yv - hT, w, 14); ctx.fillStyle = '#6E523A'; ctx.fillRect(x + 16, yv - hT + 14, 12, hT - 14); ctx.fillRect(x + w - 28, yv - hT + 14, 12, hT - 14); ctx.restore(); }
function kopje(ctx, x, y, s, a = 1, t = 0, stoom = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // y = onderkant, s = px per cm
  ctx.beginPath(); ctx.moveTo(x - 4 * s, y - 8 * s); ctx.lineTo(x + 4 * s, y - 8 * s); ctx.lineTo(x + 3.2 * s, y); ctx.lineTo(x - 3.2 * s, y); ctx.closePath(); shape(ctx, '#E8E4DA', '#B8B2A6', 1.5);
  ctx.strokeStyle = '#E8E4DA'; ctx.lineWidth = 1.4 * s; ctx.beginPath(); ctx.arc(x + 4.4 * s, y - 4.6 * s, 1.8 * s, -1.3, 1.3); ctx.stroke();
  ctx.fillStyle = '#5A3A24'; ctx.fillRect(x - 3.6 * s, y - 8 * s, 7.2 * s, 1.2 * s);
  if (stoom > 0.01) { ctx.strokeStyle = rgba('#F2F2EE', 0.5 * stoom); ctx.lineWidth = 2; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const yy = y - 9 * s - i * 1.6 * s; ctx.lineTo(x + (k - 0.5) * 3 * s + Math.sin(t * 2 + i * 0.7 + k) * 1.2 * s, yy); } ctx.stroke(); } }
  ctx.restore(); }
function wijnglas(ctx, x, y, s, a = 1, vol = 0.6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // y = voet, s = px per cm (glas ± 20 cm)
  ctx.strokeStyle = '#D8DEE6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 3.6 * s, 0.8 * s, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 9 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 4 * s, y - 20 * s); ctx.quadraticCurveTo(x - 4.4 * s, y - 10 * s, x, y - 9 * s); ctx.quadraticCurveTo(x + 4.4 * s, y - 10 * s, x + 4 * s, y - 20 * s); ctx.stroke();
  if (vol > 0) { ctx.save(); ctx.beginPath(); ctx.moveTo(x - 4 * s, y - 20 * s); ctx.quadraticCurveTo(x - 4.4 * s, y - 10 * s, x, y - 9 * s); ctx.quadraticCurveTo(x + 4.4 * s, y - 10 * s, x + 4 * s, y - 20 * s); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#8E2F3E'; ctx.fillRect(x - 5 * s, y - 9 * s - 9 * vol * s, 10 * s, 9 * vol * s + 1); ctx.restore(); }
  ctx.restore(); }
function bank(ctx, x, yv, w, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // s = px per cm; zithoogte 45 cm, rug 85 cm, armleuning 62 cm
  const C1 = '#4E6A8A', C2 = '#3E5672'; roundRect(ctx, x, yv - 85 * s, w, 50 * s, 10); shape(ctx, C2, null);
  roundRect(ctx, x, yv - 45 * s, w, 33 * s, 8); shape(ctx, C1, null);
  roundRect(ctx, x - 14 * s, yv - 62 * s, 18 * s, 54 * s, 8); shape(ctx, C1, lighten(C1, 0.2), 1); roundRect(ctx, x + w - 4 * s, yv - 62 * s, 18 * s, 54 * s, 8); shape(ctx, C1, lighten(C1, 0.2), 1);
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 6 * s, yv - 12 * s, 6 * s, 12 * s); ctx.fillRect(x + w - 12 * s, yv - 12 * s, 6 * s, 12 * s); ctx.restore(); }
function lamp(ctx, x, yv, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yv); ctx.lineTo(x, yv - 140 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 18 * s, yv - 140 * s); ctx.lineTo(x + 18 * s, yv - 140 * s); ctx.lineTo(x + 11 * s, yv - 165 * s); ctx.lineTo(x - 11 * s, yv - 165 * s); ctx.closePath(); shape(ctx, '#E8C77A', null);
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x - 14 * s, yv - 3, 28 * s, 3); ctx.restore(); }

// De twee kamers van de cold open. s = px per cm. Geeft hoofdposities van Linda terug.
function ochtend(ctx, x0, w, vloer, s, t, o = {}) { const { a = 1, uit = 'moe', stoom = 1, dim = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * dim);
  roundRect(ctx, x0, 90, w, vloer - 90 + 30, 20); shape(ctx, '#22324E', null); ctx.fillStyle = '#2C3A52'; ctx.fillRect(x0, vloer, w, 30);
  raam(ctx, x0 + w * 0.56, 150, 230, 230, false);
  const L = persoon(ctx, 'linda', x0 + w * 0.36, vloer, 168 * s, { uit, t, kijk: 1 });
  tafel(ctx, x0 + w * 0.46, vloer, 120 * s, 75 * s);
  kopje(ctx, x0 + w * 0.46 + 40 * s, vloer - 75 * s, s, 1, t, stoom);
  metaText(ctx, "'s ochtends · koffie", x0 + 30, 140, C.grain, 'left', 28);
  ctx.restore(); return { L, kop: [x0 + w * 0.46 + 40 * s, vloer - 82 * s] }; }
function avond(ctx, x0, w, vloer, s, t, o = {}) { const { a = 1, uit = 'neutraal', dim = 0, vol = 0.6 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * dim);
  roundRect(ctx, x0, 90, w, vloer - 90 + 30, 20); shape(ctx, '#18233A', null); ctx.fillStyle = '#232F46'; ctx.fillRect(x0, vloer, w, 30);
  raam(ctx, x0 + 40, 150, 200, 200, true); lamp(ctx, x0 + w - 70, vloer, s);
  const bx = x0 + w * 0.3, bw = 190 * s; bank(ctx, bx, vloer, bw, s);
  const L = persoon(ctx, 'linda', bx + bw * 0.42, vloer, 168 * s, { uit, t, kijk: -1, pose: 'zit', zitHoogte: 45 * s });
  wijnglas(ctx, bx + bw + 5 * s, vloer - 62 * s, s, 1, vol);
  metaText(ctx, "'s avonds · wijn", x0 + w - 30, 140, C.grain, 'right', 28);
  ctx.restore(); return { L, glas: [bx + bw + 5 * s, vloer - 75 * s] }; }

// ---------- kleine iconen ----------
function pil(ctx, x, y, s = 1, a = 1, an = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  roundRect(ctx, -46, -18, 92, 36, 18); shape(ctx, '#E8E4DA', '#B8B2A6', 1.5); ctx.save(); ctx.beginPath(); roundRect(ctx, -46, -18, 92, 36, 18); ctx.clip(); ctx.fillStyle = '#7FA6C9'; ctx.fillRect(0, -20, 50, 40); ctx.restore(); ctx.restore(); }
function bord(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 70 * s, 22 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2);
  ctx.beginPath(); ctx.ellipse(x - 14 * s, y - 6 * s, 26 * s, 9 * s, 0, 0, 6.283); ctx.fillStyle = C.oker; ctx.fill(); circ(ctx, x + 22 * s, y - 5 * s, 9 * s, C.groen); circ(ctx, x + 34 * s, y - 2 * s, 7 * s, C.koraal); ctx.restore(); }
// hersenen in doorsnede met het beloningscircuit (VTA → nucleus accumbens → prefrontale schors) als oplichtende baan
// coördinaten in het assenstelsel van hoofdHersenen (oorsprong = hypothalamus, hoofd kijkt naar rechts)
const BELONING = { vta: [-26, 44], nac: [62, -6], pfc: [150, -128] };
function beloningsbaan(ctx, hx, hy, s, t, o = {}) { const { a = 1, sterk = 0, pulsen = 1 } = o; if (a <= 0.01) return; const P = ([px, py]) => [hx + px * s, hy + py * s];
  const pad = [BELONING.vta, [10, 30], BELONING.nac, [110, -60], BELONING.pfc].map(P);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = rgba(C.teal, 0.55 + 0.35 * sterk); ctx.lineWidth = (7 + 6 * sterk) * s; ctx.beginPath(); bioPad(ctx, pad, false); ctx.stroke();
  const D = bioDicht(pad, 60); const n = Math.round(3 + 5 * sterk);
  if (pulsen > 0.01) for (let k = 0; k < n; k++) { const u = (t * (0.35 + 0.25 * sterk) + k / n) % 1; const p = D[Math.floor(u * (D.length - 1))]; mol(ctx, 'nt', p[0], p[1], (7 + 3 * sterk) * s, Z4.nt, pulsen); }
  for (const k of ['vta', 'nac', 'pfc']) { const [px, py] = P(BELONING[k]); circ(ctx, px, py, (12 + 4 * sterk) * s, rgba(C.teal, 0.9), '#F2F2EE', 2); }
  ctx.restore(); }
function balkMeter(ctx, x, y, w, v, label, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, label, x, y - 14, fTekst(34, 600), C.text, 'left');
  roundRect(ctx, x, y, w, 40, 12); shape(ctx, '#0D1420', C.line, 1.5); if (v > 0.01) { roundRect(ctx, x + 4, y + 4, Math.max(16, (w - 8) * clamp(v, 0, 1)), 32, 10); shape(ctx, rgba(col, 0.85), col, 1); } ctx.restore(); }

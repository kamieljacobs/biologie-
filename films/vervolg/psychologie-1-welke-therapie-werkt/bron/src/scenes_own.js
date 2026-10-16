// Wat word jij? · Psychologie 6 · Welke therapie werkt? — scènes per alinea (v1.0, 16 okt 2026).
// Rode draad: jij (ik-perspectief: bureau en notitieboek) en Henk; Lotte en Sam als cliënten in H3. Look: Schema.

// ---------- eigen tekeningen ----------
function kamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#22314F'; ctx.fillRect(0, 0, W, 640); // wand
  ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 640); ctx.lineTo(W, 640); ctx.stroke();
  roundRect(ctx, 1500, 150, 300, 230, 8); shape(ctx, '#2C4A6E', rgba(C.line, 0.6), 2); // raam
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.beginPath(); ctx.moveTo(1650, 150); ctx.lineTo(1650, 380); ctx.moveTo(1500, 265); ctx.lineTo(1800, 265); ctx.stroke();
  // plant
  ctx.fillStyle = '#6A4A3A'; roundRect(ctx, 1600, 560, 90, 80, 10); ctx.fill();
  ctx.fillStyle = C.chloro; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(1645 + (i - 2) * 22, 530 - Math.abs(i - 2) * 14, 18, 46, (i - 2) * 0.35, 0, 6.283); ctx.fill(); }
  // stoel achter Henk
  roundRect(ctx, 1010, 470, 300, 230, 30); shape(ctx, '#4A3F5C', null);
  ctx.restore(); }
function bureau(ctx, a = 1, pen = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A4632'; ctx.beginPath(); ctx.moveTo(0, 790); ctx.lineTo(W, 790); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6E573E'; ctx.fillRect(0, 790, W, 14);
  // notitieboek van 'jij'
  ctx.save(); ctx.translate(250, 800); ctx.rotate(-0.06); roundRect(ctx, 0, 0, 380, 90, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.strokeStyle = '#B8C4D4'; ctx.lineWidth = 2; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(20, 30 + i * 28); ctx.lineTo(360, 30 + i * 28); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  metaText(ctx, 'jij · psycholoog', 270, 780, C.grain, 'left', 26); }
function pil(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); roundRect(ctx, -34 * s, -14 * s, 68 * s, 28 * s, 14 * s); shape(ctx, col, lighten(col, 0.4), 1.5); ctx.fillStyle = rgba('#F2F2EE', 0.85); roundRect(ctx, 0, -14 * s, 34 * s, 28 * s, 14 * s); ctx.fill(); ctx.restore(); }
function oog(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.quadraticCurveTo(x, y - 30 * s, x + 40 * s, y); ctx.quadraticCurveTo(x, y + 30 * s, x - 40 * s, y); shape(ctx, '#F2F2EE', C.line, 1.5); const dx = Math.sin(t * 2.4) * 16 * s; circ(ctx, x + dx, y, 11 * s, C.teal); circ(ctx, x + dx, y, 5 * s, '#121A26'); ctx.restore(); }
function lampje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; const dx = Math.sin(t * 2.4) * 70 * s; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 80 * s, y); ctx.lineTo(x + 80 * s, y); ctx.stroke(); circ(ctx, x + dx, y, 10 * s, C.goud); ctx.restore(); }
function trapje(ctx, x, y, s, a = 1, k = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { roundRect(ctx, x + i * 34 * s, y - (i + 1) * 22 * s, 30 * s, (i + 1) * 22 * s, 4); shape(ctx, i < k ? rgba(C.groen, 0.7) : '#3A4458', null); } ctx.restore(); }
function gedachte(ctx, x, y, w, h, s2, a = 1, col = '#F2F2EE', px = 24) { wolk(ctx, x, y, w, h, s2, a, col, px); }
function spin(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) for (const d of [-1, 1]) { const an = (-0.9 + i * 0.55) * d + (d < 0 ? Math.PI : 0); const w = Math.sin(t * 6 + i) * 0.08; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an + w) * 16 * s, y + Math.sin(an + w) * 16 * s - 8 * s, x + Math.cos(an + w) * 26 * s, y + Math.sin(an + w) * 26 * s + 6 * s); ctx.stroke(); }
  circ(ctx, x, y, 9 * s, '#3A302A'); circ(ctx, x + 10 * s, y - 2 * s, 6 * s, '#3A302A'); ctx.restore(); }
function pot(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 110 * s, 100 * s, 110 * s, 14 * s); shape(ctx, rgba(C.er, 0.18), C.er, 2); roundRect(ctx, x - 54 * s, y - 124 * s, 108 * s, 18 * s, 4); shape(ctx, '#8A8E96', null); ctx.restore(); }
function fotolijst(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60 * s, y - 80 * s, 120 * s, 100 * s, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.restore(); }
function hand(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E3B998'; ctx.beginPath(); ctx.ellipse(x, y, 60 * s, 34 * s, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 4; i++) { roundRect(ctx, x - 50 * s + i * 26 * s, y - 64 * s, 20 * s, 44 * s, 10 * s); ctx.fill(); } ctx.restore(); }
function fiets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4 * s; circ(ctx, x - 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); circ(ctx, x + 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 28 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
function auto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 50 * s, 180 * s, 44 * s, 12 * s); shape(ctx, C.koraal, null); roundRect(ctx, x - 50 * s, y - 84 * s, 100 * s, 40 * s, 12 * s); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, x - 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); circ(ctx, x + 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); ctx.restore(); }
function mensje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - r * 1.15, r * 0.55, col); roundRect(ctx, x - r * 0.75, y - r * 0.5, r * 1.5, r * 1.3, r * 0.5); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function klokIcoon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#F2F2EE', 0.9), C.line, 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(t - 1.57) * r * 0.7, y + Math.sin(t - 1.57) * r * 0.7); ctx.moveTo(x, y); ctx.lineTo(x, y - r * 0.5); ctx.stroke(); ctx.restore(); }
function kruisIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 50 * s, 100 * s, 100 * s, 14 * s); shape(ctx, '#F2F2EE', C.line, 2); ctx.fillStyle = C.teal; ctx.fillRect(x - 10 * s, y - 32 * s, 20 * s, 64 * s); ctx.fillRect(x - 32 * s, y - 10 * s, 64 * s, 20 * s); ctx.restore(); }
// effectgrootte-meter: halve cirkel 0 .. 1,2
function meter(ctx, x, y, r, val, a = 1, labels = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ang = v => Math.PI + clamp(v / 1.2, 0, 1) * Math.PI;
  [[0, 0.2, '#3A4458'], [0.2, 0.5, rgba(C.teal, 0.35)], [0.5, 0.8, rgba(C.teal, 0.6)], [0.8, 1.2, rgba(C.teal, 0.9)]].forEach(([v0, v1, col]) => { ctx.beginPath(); ctx.arc(x, y, r, ang(v0), ang(v1)); ctx.arc(x, y, r - 34, ang(v1), ang(v0), true); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); });
  if (labels) [[0.2, 'klein'], [0.5, 'middel'], [0.8, 'groot']].forEach(([v, l]) => { const an = ang(v); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 40), y + Math.sin(an) * (r - 40)); ctx.lineTo(x + Math.cos(an) * (r + 8), y + Math.sin(an) * (r + 8)); ctx.stroke(); text(ctx, String(v).replace('.', ','), x + Math.cos(an) * (r + 40), y + Math.sin(an) * (r + 40) + 10, fTekst(28, 700), C.text, 'center'); metaText(ctx, l, x + Math.cos(an) * (r + 40), y + Math.sin(an) * (r + 40) + 42, C.text2, 'center', 22); });
  if (val !== null) { const an = ang(val); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 50), y + Math.sin(an) * (r - 50)); ctx.stroke(); circ(ctx, x, y, 12, C.goud); }
  ctx.restore(); }
function klok(ctx, cx, cy, r, a = 1) { klokIcoon(ctx, cx, cy, r, a, 0.8); }

// overzichtskaarten H1 en recap
const KAARTEN = [
  { id: 'cgt', t: 'CGT', m: 'gedachten en gedrag', l: 'klopt die gedachte?', w: 'Cognitieve' },
  { id: 'exp', t: 'exposure', m: 'angst', l: 'stap voor stap', w: 'Exposure' },
  { id: 'emdr', t: 'EMDR', m: 'herinneringen', l: 'ogen volgen een lampje', w: 'EMDR' },
  { id: 'med', t: 'medicatie', m: 'lichaam', l: 'voorgeschreven door een arts', w: 'medicatie' },
  { id: 'act', t: 'ACT', m: 'omgaan met gedachten', l: 'opmerken en toch doen', w: 'ACT' },
  { id: 'ipt', t: 'interpersoonlijk', m: 'relaties', l: 'ruzie, verlies, verhuizen', w: 'Interpersoonlijke' },
  { id: 'pd', t: 'psychodynamisch', m: 'patronen van vroeger', l: 'waar komt het vandaan?', w: 'Psychodynamische' },
  { id: 'sch', t: 'schematherapie', m: 'oude overtuigingen', l: '"ik ben niet goed genoeg"', w: 'Schematherapie' },
  { id: 'sys', t: 'systeemtherapie', m: 'mensen om je heen', l: 'het gezin komt mee', w: 'Systeemtherapie' },
  { id: 'onl', t: 'online zelfhulp', m: 'vorm', l: 'app + af en toe contact', w: 'online' },
  { id: 'vak', t: 'vaktherapie', m: 'vorm', l: 'beeldend, muziek, beweging', w: 'vaktherapie' },
];
function kaartIcoon(ctx, id, x, y, a, t, act) { const s = 0.8;
  if (id === 'cgt') { gedachte(ctx, x - 70, y - 40, 150, 60, 'mislukt toch', a, '#F2F2EE', 18); if (act) kruis(ctx, x + 66, y - 4, 14, a * 0.9); }
  else if (id === 'exp') trapje(ctx, x - 64, y + 34, s, a, act ? 1 + Math.floor((t * 0.8) % 4) : 4);
  else if (id === 'emdr') { oog(ctx, x, y - 10, 0.9, a, act ? t : 0); lampje(ctx, x, y + 34, 0.7, a, act ? t : 0); }
  else if (id === 'med') { pil(ctx, x - 20, y, 1, a); pil(ctx, x + 36, y + 14, 0.8, a); }
  else if (id === 'act') { gedachte(ctx, x - 90, y - 46, 110, 50, 'eng!', a * 0.6, '#F2F2EE', 18); pijl(ctx, x - 10, y + 20, x + 70, y + 20, C.groen, a, 4, 12); }
  else if (id === 'ipt') { mensje(ctx, x - 34, y + 30, 24, '#B08A5C', a); mensje(ctx, x + 34, y + 30, 24, '#8C7BBF', a); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x - 10, y + 4); ctx.lineTo(x + 10, y + 4); ctx.stroke(); ctx.restore(); }
  else if (id === 'pd') { pijl(ctx, x + 70, y + 10, x - 50, y + 10, C.text2, a, 4, 14); circ(ctx, x + 76, y + 10, 10, rgba(C.goud, a)); circ(ctx, x - 70, y + 10, 10, rgba(C.text2, a * 0.6)); }
  else if (id === 'sch') { roundRect(ctx, x - 70, y - 30, 140, 70, 10); ctx.save(); ctx.globalAlpha *= a; shape(ctx, rgba(C.paars, 0.25), C.paars, 1.5); ctx.restore(); }
  else if (id === 'sys') { [-48, -16, 16, 48].forEach((dx, i) => mensje(ctx, x + dx, y + 34, i % 3 ? 18 : 22, ['#B08A5C', '#7FA3C9', '#C9A35C', '#8C7BBF'][i], a)); }
  else if (id === 'onl') { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 28, y - 46, 56, 96, 10); shape(ctx, '#2A2F3E', C.line, 2); roundRect(ctx, x - 20, y - 34, 40, 64, 4); shape(ctx, rgba(C.teal, 0.5), null); ctx.restore(); }
  else if (id === 'vak') { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 60, y + 20); ctx.bezierCurveTo(x - 30, y - 40, x + 10, y + 50, x + 60, y - 20); ctx.stroke(); text(ctx, '♪', x + 40, y + 40, fTekst(40, 700), C.text2, 'center'); ctx.restore(); }
}
function kaart(ctx, k, x, y, w, h, a, act, t) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, act ? rgba(C.goud, 0.10) : rgba(C.fill, 0.6), act ? C.goud : rgba(C.line, 0.6), act ? 2.5 : 1.2);
  text(ctx, k.t, x + 24, y + 52, fTekst(32, 700), C.text, 'left'); metaText(ctx, k.m, x + 24, y + 118, act ? C.goud : C.grain, 'left', 22);
  text(ctx, k.l, x + 24, y + h - 22, fTekst(26, 600), act ? C.text : C.text2, 'left');
  ctx.save(); ctx.translate(x + w - 78, y + 56); ctx.scale(0.7, 0.7); kaartIcoon(ctx, k.id, 0, 0, 1, t, act); ctx.restore(); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { [0, 2, 1, 3].forEach((k, i) => kaart(ctx, KAARTEN[k], 1090 + (i % 2) * 400, 480 + Math.floor(i / 2) * 220, 370, 190, 1, false, t)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('anders', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; kamer(ctx, 1);
      persoon(ctx, 'henk', 1160, 800, 520, { uit: q.on('vraagt', 1) > 0.5 && q.on('tien', 1) < 0.5 ? 'praat' : 'bezorgd', pose: 'staan', kijk: -1, t });
      naamBij(ctx, 'Henk', 'cliënt', 1330, 330, q.on('Henk', 1));
      tag(ctx, 'al maanden somber', 1480, 450, C.text2, q.on('somber', 1) * (1 - q.on('vraagt', 1)), 'center', 28);
      const vr = q.on('vraagt', 1); if (vr > 0.01) bubbel(ctx, 1100, 210, 'welke therapie werkt het best voor mij?', '#F2F2EE', vr * (1 - q.on('tien', 1) * 0.6), 30);
      const opts = [['praten over je verleden', 'Praten'], ['gedachten veranderen', 'gedachten'], ['oefenen met wat je eng vindt', 'Oefenen'], ['pillen', 'pillen']];
      opts.forEach(([s2, w], i) => { const a = q.on(w, 1); if (a > 0.01) chip(ctx, s2, 470, 220 + i * 90, i === 3 ? C.oker : C.teal, a, 26); });
      regel(ctx, 'wel tien therapievormen', 470, 150, q.on('tien', 1), C.text2, 28, 'center', 700);
      bureau(ctx, 1, 0, t); vraagteken(ctx, 760, 900, q.on('zeg', 1) * (1 - B), 90); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 560, gy = 230, gw = 1000, gh = 520;
      assen(ctx, gx, gy, gw, gh, 'tijd →', 'somberheid'); metaText(ctx, 'start', gx, gy + gh + 36, C.text2, 'center', 20); metaText(ctx, '3 maanden', gx + gw, gy + gh + 36 + 30, C.text2, 'right', 20);
      const u = clamp((t - q.at('maanden', 2)) / 3, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40 * u; i++) { const x = i / 40; const y = 0.85 - 0.55 * ease(x); i ? ctx.lineTo(gx + x * gw, gy + gh - y * gh) : ctx.moveTo(gx + x * gw, gy + gh - y * gh); } ctx.stroke();
      const th = q.on('therapie', 2); if (th > 0.01) { ctx.save(); ctx.globalAlpha *= th; roundRect(ctx, gx + 20, gy + gh - 40, gw - 40, 26, 8); shape(ctx, rgba(C.groen, 0.25), C.groen, 1.5); regel(ctx, 'therapie', gx + gw / 2, gy + gh - 54, 1, C.groen, 26, 'center', 700); ctx.restore(); }
      persoon(ctx, 'henk', 300, 860, 380, { uit: q.on('beter', 1) > 0.5 ? 'blij' : 'bezorgd', pose: 'staan', kijk: 1, t, a: q.on('man', 1) });
      tag(ctx, 'veel beter', gx + gw - 60, gy + gh - 0.3 * gh - 50, C.groen, q.on('beter', 1), 'center', 28);
      vraagteken(ctx, gx + gw / 2, gy + 120, q.on('gewerkt', 1), 130); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('landschap', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; regel(ctx, 'Antwoord b', W / 2, 280, 1, C.groen, 44, 'center', 800);
      gedachte(ctx, W / 2 - 330, 360, 660, 140, 'misschien was hij ook zonder therapie opgeknapt', q.on('Misschien', 1), '#F2F2EE', 30); metaText(ctx, 'daarover: hoofdstuk 2', W / 2, 620, C.grain, 'center', 26); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'Waar richten therapieën zich op?', 120, 140, 1, C.text, 40, 'left', 700);
      const cw = 400, ch = 190, gapx = 28, gapy = 22, x0 = (W - 4 * cw - 3 * gapx) / 2, y0 = 180;
      let actief = -1; KAARTEN.forEach((k, i) => { if (q.at(k.w, 1) <= t) actief = i; });
      KAARTEN.forEach((k, i) => { const a = q.on(k.w, 1); if (a <= 0.01) return; const col = i % 4, row = Math.floor(i / 4); kaart(ctx, k, x0 + col * (cw + gapx), y0 + row * (ch + gapy), cw, ch, a * (i === actief ? 1 : 0.55), i === actief, t); });
      const w1 = q.on('Waarom', 1) * (1 - q.on('medicatie', 1)); chip(ctx, 'hoe EMDR werkt: nog niet zeker', 960, 840, C.koraal, w1, 30);
      chip(ctx, 'en nog veel meer vormen', 960, 830, C.text2, q.on('meer', 1) * (1 - q.on('ACT', 1)), 26);
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Daarom', 1, 0.8), pC = q.on('effectgrootte', 1, 0.8), pD = q.on('toevallig', 1, 0.8), pE = q.on('wachtlijstgroep', 1, 0.8);
    const A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC * (1 - pD), A4 = pD * (1 - pE), A5 = pE;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const gx = 420, gy = 220, gw = 1080, gh = 440; assen(ctx, gx, gy, gw, gh, 'tijd →', 'somberheid');
      const sl = q.on('slechtst', 1); circ(ctx, gx + 30, gy + gh - 0.9 * gh, 12, rgba(C.koraal, sl)); regel(ctx, 'hulp zoeken: op het slechtste moment', gx + 60, gy + gh - 0.9 * gh - 24, sl, C.koraal, 26, 'left', 700);
      const u = clamp((t - q.at('vanzelf', 1)) / 2.5, 0, 1); if (u > 0) { ctx.strokeStyle = C.text2; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); for (let i = 0; i <= 40 * u; i++) { const x = i / 40; const y = 0.9 - 0.3 * ease(x); i ? ctx.lineTo(gx + 30 + x * (gw - 60), gy + gh - y * gh) : ctx.moveTo(gx + 30, gy + gh - y * gh); } ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'zonder therapie: bij een deel iets beter', gx + gw - 30, gy + gh - 0.6 * gh + 50, q.on('vanzelf', 1), C.text2, 24, 'right', 700); }
      chip(ctx, 'afwachten is niet verstandig', 760, 780, C.koraal, q.on('afwachten', 1), 26);
      tag(ctx, 'placebo-effect: verwachten dat je beter wordt, helpt al', 1180, 860 - 10, C.goud, q.on('placebo', 1), 'center', 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'een eerlijk onderzoek', W / 2, 150, 1, C.text, 34, 'center', 700); metaText(ctx, 'gerandomiseerd onderzoek (RCT)', W / 2, 196, C.grain, 'center', 22);
      const s = q.on('lot', 1, 1.2), g = q.on('gemiddeld', 1), up = q.on('therapiegroep', 1, 1.5);
      for (let i = 0; i < 24; i++) { const grp = i % 2, sx = 860 + (i % 6) * 40, sy = 330 + Math.floor(i / 6) * 60; const tx = (grp ? 1180 : 420) + (Math.floor(i / 2) % 4) * 70, ty = 360 + Math.floor(Math.floor(i / 2) / 4) * 70 - (grp ? 0 : up * 60 * (0.6 + 0.4 * hash(i)));
        const col = ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i % 4]; mensje(ctx, lerp(sx, tx, s), lerp(sy, ty, s), 18, col, 1); }
      paneel(ctx, 380, 280, 360, 300, '', s); paneel(ctx, 1140, 280, 360, 300, '', s);
      regel(ctx, 'therapie', 560, 640, s, C.groen, 30, 'center', 700); regel(ctx, 'geen therapie', 1320, 640, s, C.text2, 30, 'center', 700);
      chip(ctx, 'het lot bepaalt de groep', W / 2, 260, C.goud, s * (1 - g), 24); chip(ctx, 'groepen lijken gemiddeld op elkaar', W / 2, 760, C.text2, g * (1 - up), 26);
      tag(ctx, 'meer opgeknapt? waarschijnlijk door de therapie', W / 2, 760, C.groen, up, 'center', 28); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'effectgrootte', 140, 150, 1, C.text, 36, 'left', 700);
      const V = q.on('vuistregel', 1, 0.8);
      if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; const bx = 260, by = 640, bw = 760; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
        const curve = (mu, col, a) => { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const x = i / 80; const y = Math.exp(-((x - mu) ** 2) / (2 * 0.12 ** 2)); i ? ctx.lineTo(bx + x * bw, by - y * 300) : ctx.moveTo(bx + x * bw, by - y * 300); } ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); };
        curve(0.38, C.text2, 1); curve(0.58, C.groen, 1); regel(ctx, 'controlegroep', bx + 0.3 * bw, by + 44, 1, C.text2, 24, 'center', 700); regel(ctx, 'therapiegroep', bx + 0.66 * bw, by + 44, 1, C.groen, 24, 'center', 700);
        const d = q.on('verschil', 2); pijl(ctx, bx + 0.38 * bw, by - 330, bx + 0.58 * bw, by - 330, C.goud, d, 4, 14); regel(ctx, 'verschil', bx + 0.48 * bw, by - 350, d, C.goud, 24, 'center', 700);
        const sp = q.on('onderling', 1); ctx.save(); ctx.globalAlpha *= sp; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 0.26 * bw, by - 150); ctx.lineTo(bx + 0.50 * bw, by - 150); ctx.stroke(); regel(ctx, 'spreiding', bx + 0.38 * bw, by - 168, 1, C.teal, 22, 'center', 700); ctx.restore();
        const f = q.on('deelt', 1); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, 1160, 300, 600, 220, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, 'verschil', 1460, 380, fTekst(40, 700), C.goud, 'center'); ctx.fillStyle = C.text; ctx.fillRect(1290, 400, 340, 4); text(ctx, 'spreiding', 1460, 460, fTekst(40, 700), C.teal, 'center'); ctx.restore(); }
        chip(ctx, 'zo vergelijk je studies met verschillende vragenlijsten', 1460, 600, C.text2, q.on('vragenlijsten', 1), 22); ctx.restore(); }
      if (V > 0.01) { const val = q.on('klein', 1) > 0 ? (q.on('groot', 4) > 0.5 ? 0.8 : q.on('middelgroot', 1) > 0.5 ? 0.5 : 0.2) : null; meter(ctx, W / 2, 680, 340, val, V, 1); metaText(ctx, 'vuistregel (Cohen)', W / 2, 780, C.grain, 'center', 22); } ctx.restore(); }
    if (A4 > 0.01) { ctx.save(); ctx.globalAlpha *= A4; regel(ctx, 'meta-analyse: alle studies samen', 140, 150, 1, C.text, 36, 'left', 700);
      const ax = 560, aw = 800; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax, 720); ctx.lineTo(ax + aw, 720); ctx.stroke(); [0, 0.5, 1].forEach(v => text(ctx, String(v).replace('.', ','), ax + v / 1.2 * aw, 760, fTekst(24, 600), C.text2, 'center')); metaText(ctx, 'effectgrootte', ax + aw, 800, C.text2, 'right', 20);
      for (let i = 0; i < 9; i++) { const v = clamp(0.6 + (hash(i * 5 + 3) - 0.5) * 0.9, 0.05, 1.15), y = 240 + i * 46, w = 60 + hash(i * 7) * 120; const a = clamp((t - q.at('toevallig', 1) - i * 0.15) * 3, 0, 1); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax + v / 1.2 * aw - w, y); ctx.lineTo(ax + v / 1.2 * aw + w, y); ctx.stroke(); circ(ctx, ax + v / 1.2 * aw, y, 8, C.teal); ctx.restore(); }
      const m = q.on('analyse', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; const x = ax + 0.6 / 1.2 * aw, y = 680; ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x, y - 18); ctx.lineTo(x + 40, y); ctx.lineTo(x, y + 18); ctx.closePath(); shape(ctx, C.goud, null); regel(ctx, 'samen: één schatting', x + 70, y + 10, 1, C.goud, 26, 'left', 700); ctx.restore(); } ctx.restore(); }
    if (A5 > 0.01) { ctx.save(); ctx.globalAlpha *= A5; regel(ctx, 'maar: vergeleken met wie?', W / 2, 160, 1, C.text, 40, 'center', 700);
      paneel(ctx, 280, 240, 600, 480, '', 1); regel(ctx, 'wachtlijstgroep', 580, 300, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 400 + i * 120, 560, 30, ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i], 1); klokIcoon(ctx, 580, 410, 50, 1, t * 0.5); regel(ctx, 'wacht af', 580, 670, 1, C.text2, 26, 'center', 700);
      const z = q.on('zorg', 1); paneel(ctx, 1040, 240, 600, 480, '', z); ctx.save(); ctx.globalAlpha *= z; regel(ctx, 'gewone zorg', 1340, 300, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 1160 + i * 120, 560, 30, ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i], 1); kruisIcoon(ctx, 1340, 410, 0.9, 1); regel(ctx, 'bijv. gesprekken bij de huisarts', 1340, 670, 1, C.text2, 26, 'center', 700); ctx.restore();
      vraagteken(ctx, W / 2, 520, q.on('sterkst', 1), 120); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const A = 1 - q.on('140', 1, 0.4), B = ramp(t, q.at('140', 1) + 0.4, 0.5);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'Antwoord a', W / 2, 200, 1, C.groen, 44, 'center', 800);
      paneel(ctx, 280, 260, 600, 420, '', 1); regel(ctx, 'wachtlijst', 580, 320, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 400 + i * 120, 560 - (i === 1 ? 30 : 0) * q.on('minder', 1), 30, '#7FA3C9', 1); regel(ctx, 'knappen minder op', 580, 640, q.on('minder', 1), C.text2, 26, 'center', 700);
      paneel(ctx, 1040, 260, 600, 420, '', 1); regel(ctx, 'gewone zorg', 1340, 320, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 1160 + i * 120, 560 - (i % 2 ? 50 : 20) * q.on('beetje', 1), 30, '#7FA3C9', 1); regel(ctx, 'helpt zelf ook een beetje', 1340, 640, q.on('beetje', 1), C.groen, 26, 'center', 700); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'therapie bij depressie: effectgrootte', 140, 150, 1, C.text, 34, 'left', 700); metaText(ctx, 'meta-analyse · Cuijpers e.a. 2024', 140, 196, C.grain, 'left', 22);
      const bx = 420, bw = 1200, sc = v => v / 1.2 * bw; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, 640); ctx.lineTo(bx + bw, 640); ctx.stroke(); [0, 0.2, 0.5, 0.8, 1.2].forEach(v => { text(ctx, String(v).replace('.', ','), bx + sc(v), 680, fTekst(24, 600), C.text2, 'center'); });
      const r1 = q.on('haalde', 1, 1.2), r2 = q.on('gewone', 3, 1.2);
      regel(ctx, 'tegen wachtlijst · ruim 140 studies', bx, 290, 1, C.text, 26, 'left', 700); roundRect(ctx, bx, 310, Math.max(10, sc(0.95) * r1), 70, 10); shape(ctx, rgba(C.koraal, 0.75), C.koraal, 2); regel(ctx, '≈ 0,95', bx + sc(0.95) + 20, 360, r1, C.koraal, 34, 'left', 800);
      const z = q.on('200', 1); ctx.save(); ctx.globalAlpha *= z; regel(ctx, 'tegen gewone zorg · bijna 200 studies', bx, 450, 1, C.text, 26, 'left', 700); roundRect(ctx, bx, 470, Math.max(10, sc(0.63) * r2), 70, 10); shape(ctx, rgba(C.teal, 0.75), C.teal, 2); regel(ctx, '≈ 0,6', bx + sc(0.63) + 20, 520, r2, C.teal, 34, 'left', 800); ctx.restore();
      tag(ctx, 'tegen een wachtlijst lijkt het effect ±1,5× zo groot', 960, 760, C.goud, q.on('anderhalf', 1) * (1 - q.on('beste', 1)), 'center', 28);
      tag(ctx, 'gewone zorg: nog steeds middelgroot tot groot · beste studies: wat lager', 960, 760, C.groen, q.on('beste', 1), 'center', 26); ctx.restore(); } },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Henk', 1, 0.8), pC = q.on('Zulke', 2, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const sa = q.on('Sam', 1);
      paneel(ctx, 100, 140, 820, 680, '', 1); persoon(ctx, 'lotte', 260, 780, 420, { uit: 'blij', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Lotte', 'bang voor spinnen', 150, 210, 1);
      regel(ctx, 'exposure', 620, 230, q.on('exposure', 1), C.goud, 34, 'center', 700);
      angstLadder(ctx, 470, 640, 0.8, 4, q.on('exposure', 1), t);
      chip(ctx, 'vaak een paar sessies genoeg', 520, 780, C.groen, q.on('sessies', 1), 22);
      ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * sa; paneel(ctx, 1000, 140, 820, 680, '', sa); ctx.restore();
      if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; persoon(ctx, 'sam', 1160, 780, 430, { uit: 'bezorgd', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Sam', 'nare herinneringen', 1050, 210, 1);
        gedachte(ctx, 1320, 240, 440, 200, '', q.on('ongeluk', 1), '#F2F2EE'); fiets(ctx, 1470, 360, 0.9, q.on('ongeluk', 1)); auto(ctx, 1620, 390, 0.6, q.on('ongeluk', 1));
        const tr = q.on('trauma', 1); if (tr > 0.01) { ctx.save(); ctx.globalAlpha *= tr; roundRect(ctx, 1320, 560, 210, 80, 12); shape(ctx, rgba(C.fill, 0.8), C.goud, 2); text(ctx, 'EMDR', 1425, 614, fTekst(34, 700), C.text, 'center'); text(ctx, '≈', 1580, 616, fTitel(56), C.goud, 'center'); roundRect(ctx, 1630, 560, 170, 80, 12); shape(ctx, rgba(C.fill, 0.8), C.goud, 2); text(ctx, 'CGT', 1715, 614, fTekst(34, 700), C.text, 'center'); metaText(ctx, 'traumagericht', 1715, 680, C.grain, 'center', 18); metaText(ctx, 'ongeveer even goed', 1560, 730, C.grain, 'center', 22); ctx.restore(); } ctx.restore(); }
      ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; persoon(ctx, 'henk', 230, 820, 460, { uit: 'denkt', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Henk', 'somber (depressie)', 120, 220, 1);
      regel(ctx, 'beter dan wachtlijst of gewone zorg', 500, 160, 1, C.text2, 26, 'left', 700); metaText(ctx, 'effectgrootte (globaal)', 500, 196, C.grain, 'left', 20);
      const rows = [['CGT', 0.62, 'CGT', C.groen, 0, 2], ['interpersoonlijke therapie', 0.6, 'interpersoonlijke', C.groen, 0, 1], ['psychodynamische therapie', 0.58, 'psychodynamische', C.groen, 0, 1], ['online zelfhulp (begeleid)', 0.58, 'online', C.groen, 0, 1], ['ACT · minder vaak onderzocht', 0.5, 'ACT', C.groen, 1, 1]];
      rows.forEach(([l, v, w, col, dash, n], i) => { const a = q.on(w, n); if (a <= 0.01) return; const y = 250 + i * 86; ctx.save(); ctx.globalAlpha *= a; regel(ctx, l, 500, y + 22, 1, C.text, 26, 'left', 600); roundRect(ctx, 920, y - 6, 560 * v / 0.7 * clamp((t - q.at(w, n)) * 1.5, 0, 1), 40, 8); if (dash) { ctx.setLineDash([10, 8]); shape(ctx, rgba(col, 0.25), col, 2); ctx.setLineDash([]); } else shape(ctx, rgba(col, 0.6), col, 2); ctx.restore(); });
      tag(ctx, 'onderling weinig verschil', 1200, 704, C.goud, q.on('Onderling', 1) * (1 - q.on('Antidepressiva', 1)), 'center', 26);
      const ad = q.on('Antidepressiva', 1); if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; roundRect(ctx, 500, 690, 1300, 190 - 10, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); pil(ctx, 580, 760, 1, 1); regel(ctx, 'antidepressiva > nep-pil', 640, 770, 1, C.text, 28, 'left', 700);
        regel(ctx, 'korte termijn: ≈ therapie', 1060, 750, q.on('korte', 1), C.text, 26, 'left', 600); regel(ctx, 'na therapie: minder vaak terugval', 1060, 794, q.on('terug', 1), C.groen, 26, 'left', 700); regel(ctx, 'samen: vaak nog iets beter', 1060, 838, q.on('samen', 1), C.goud, 26, 'left', 700); ctx.restore(); }
      ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'bij depressie: heel verschillende therapieën, vaak ongeveer even goed', W / 2, 200, 1, C.text, 36, 'center', 700);
      [0, 5, 4, 6].forEach((k, i) => kaart(ctx, KAARTEN[k], 150 + i * 420, 290, 380, 190, 1, false, t)); vraagteken(ctx, W / 2, 680, q.on('verklaring', 1), 140); ctx.restore(); } },

  s19(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Toch', 1, 0.8), pC = q.on('Omdat', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Antwoord a: iets wat ze gemeen hebben', 120, 140, 1, C.groen, 36, 'left', 700); metaText(ctx, 'een veelgenoemde verklaring', 120, 184, C.grain, 'left', 22);
      const B2 = q.on('band', 1, 0.8);
      if (B2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B2; const cx = W / 2, cy = 520; circ(ctx, cx, cy, 160, rgba(C.goud, 0.12), C.goud, 2.5); text(ctx, 'gemeenschappelijk', cx, cy + 10, fTekst(30, 700), C.goud, 'center');
        [['een uitleg die je gelooft', 'uitleg', -2.5], ['een plan', 'plan', -0.6], ['hoop', 'hoop', 0.6], ['samenwerken met een therapeut', 'therapeut', 2.5]].forEach(([l, w, an]) => { const a = q.on(w, 1); const x = cx + Math.cos(an) * 430, y = cy + Math.sin(an) * 230; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * 165, cy + Math.sin(an) * 165); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); chip(ctx, l, x, y + 14, C.text2, a, 28); }); ctx.restore(); }
      if (B2 > 0.01) { ctx.save(); ctx.globalAlpha *= B2; const gx = 280, gy = 250, gw = 820, gh = 520; assen(ctx, gx, gy, gw, gh, 'band met de therapeut →', 'resultaat');
        for (let i = 0; i < 70; i++) { const u = hash(i * 3 + 21), v = clamp(0.5 + 0.28 * (u - 0.5) + (hash(i * 3 + 22) - 0.5) * 0.75, 0.04, 0.96); circ(ctx, gx + 20 + u * (gw - 40), gy + gh - v * gh, 7, rgba(C.teal, 0.85)); }
        ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.64); ctx.lineTo(gx + gw, gy + gh * 0.36); ctx.stroke();
        chip(ctx, 'bijna 300 studies · ruim 30.000 cliënten', 1480, 320, C.text2, q.on('driehonderd', 1), 24); tag(ctx, 'verband: matig (r ≈ 0,28)', 1480, 440, C.goud, q.on('matig', 1), 'center', 28);
        const an = q.on('andersom', 1); if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; regel(ctx, 'band', 1300, 600, 1, C.text, 30, 'center', 700); regel(ctx, 'opknappen', 1680, 600, 1, C.text, 30, 'center', 700); pijl(ctx, 1370, 572, 1580, 572, C.text2, 1, 4, 14); pijl(ctx, 1580, 610, 1370, 610, C.koraal, 1, 4, 14); metaText(ctx, 'of andersom?', 1480, 670, C.koraal, 'center', 22); ctx.restore(); } ctx.restore(); } ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'toch werkt niet alles even goed voor elke klacht', 120, 140, 1, C.text, 36, 'left', 700);
      const rows = [['fobie', 'exposure', 'duidelijk beter dan alleen praten', 'sterk onderbouwd', C.groen, 'fobie'], ['borderline-stoornis', 'schematherapie', '88 mensen, na 3 jaar ±2× zo vaak hersteld', 'één onderzoek', C.goud, 'borderline'], ['kind of jongere + gezin', 'systeemtherapie', 'vooral onderzocht bij kinderen en jongeren', 'goed onderzocht', C.groen, 'Systeemtherapie'], ['?', 'vaktherapie', 'nog weinig sterke studies', 'onzeker', C.text2, 'vaktherapie']];
      rows.forEach(([k, th, l, niv, col, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; const y = 220 + i * 150; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120, y, 1680, 126, 14); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.6), 1.2); text(ctx, k, 160, y + 74, fTekst(32, 700), C.text2, 'left'); pijl(ctx, 500, y + 63, 580, y + 63, C.line, 1, 3, 12); text(ctx, th, 610, y + 74, fTekst(34, 700), C.text, 'left'); text(ctx, l, 960, y + 74, fTekst(26, 600), C.text2, 'left'); tag(ctx, niv, 1660, y + 76, col, 1, 'center', 22); ctx.restore(); });
      chip(ctx, 'weinig onderzoek ≠ werkt niet', 960, 858, C.text2, q.on('betekent', 1), 24); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'meten tijdens de behandeling', 120, 140, 1, C.text, 36, 'left', 700);
      const gx = 300, gy = 240, gw = 1100, gh = 460; assen(ctx, gx, gy, gw, gh, 'weken →', 'klachten (vragenlijst)'); const pts = [0.85, 0.83, 0.84, 0.82, 0.62, 0.5, 0.42]; const adj = 3.5;
      pts.forEach((v, i) => { const a = clamp((t - q.at('vragenlijst', 1) - i * 0.3) * 3, 0, 1); circ(ctx, gx + 60 + i * 160, gy + gh - v * gh, 12, rgba(i < 4 ? C.koraal : C.groen, a)); });
      const ap = q.on('aanpak', 1); if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(gx + 60 + adj * 160, gy - 10); ctx.lineTo(gx + 60 + adj * 160, gy + gh); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'aanpak aangepast', gx + 60 + adj * 160 + 20, gy + 20, 1, C.goud, 28, 'left', 700); ctx.restore(); }
      chip(ctx, 'helpt het niet? pas de aanpak aan', 1620, 400, C.text2, q.on('Helpt', 2), 22); ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('master', 1, 0.8), pC = q.on('vertrouwt', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; kamer(ctx, 1); persoon(ctx, 'henk', 1160, 800, 520, { uit: q.on('band', 1) > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: -1, t });
      tag(ctx, 'niet één beste therapie voor iedereen', 600, 200, C.text2, q.on('iedereen', 1), 'center', 26);
      [['goed onderzocht bij depressie', 'onderzocht'], ['past bij Henk', 'past'], ['meten of het helpt', 'meet'], ['werken aan een goede band', 'band']].forEach(([l, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 260, 280 + i * 100, 640, 76, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 1.5); vink_(ctx, 310, 318 + i * 100, 18, 1); text(ctx, l, 350, 330 + i * 100, fTekst(30, 700), C.text, 'left'); ctx.restore(); });
      bureau(ctx, 1, 0, t); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'de route naar behandelaar', 120, 140, 1, C.text, 36, 'left', 700);
      const steps = [['bachelor + master psychologie', 'master', C.paars], ['psycholoog', 'psycholoog', C.teal], ['werkervaring', 'werkervaring', C.text2], ['GZ-opleiding · 2 jaar', 'GZ', C.goud], ['GZ-psycholoog: zelfstandig behandelen', 'GZ', C.groen]];
      steps.forEach(([l, w, col], i) => { const a = q.on(w, 1) * (i === 4 ? clamp((t - q.at('GZ', 1) - 0.8) * 2, 0, 1) : 1); if (a <= 0.01) return; const x = 120 + i * 350, y = 330; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 310, 150, 16); shape(ctx, rgba(col, 0.15), col, 2); ctx.font = fTekst(28, 700); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, l, x + 22, y + 56, 270, 36); if (i < 4) pijl(ctx, x + 315, y + 75, x + 345, y + 75, C.line, 1, 3, 10); ctx.restore(); });
      const ps = q.on('psychiater', 1); if (ps > 0.01) { ctx.save(); ctx.globalAlpha *= ps; roundRect(ctx, 120, 580, 1680, 140, 16); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); text(ctx, 'psychiater', 160, 640, fTekst(34, 700), C.text, 'left'); text(ctx, 'opleiding geneeskunde → arts → psychiater', 160, 690, fTekst(26, 600), C.text2, 'left'); pil(ctx, 1220, 650, 1, q.on('medicijnen', 1)); regel(ctx, 'mag medicijnen voorschrijven', 1280, 660, q.on('medicijnen', 1), C.oker, 26, 'left', 700); ctx.restore(); } ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; roundRect(ctx, 360, 300, 1200, 360, 22); shape(ctx, rgba(C.fill, 0.6), C.goud, 2); text(ctx, 'Zit je zelf ergens mee?', W / 2, 410, fTitel(56), C.text, 'center');
      text(ctx, 'Praat erover met iemand die je vertrouwt,', W / 2, 500, fTekst(36, 600), C.text, 'center'); text(ctx, 'met je mentor of met je huisarts.', W / 2, 552, fTekst(36, 600), C.text, 'center'); ctx.restore(); } },
};

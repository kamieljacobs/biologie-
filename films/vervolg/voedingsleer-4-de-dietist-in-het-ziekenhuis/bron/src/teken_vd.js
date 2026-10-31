// Wat word jij? · Voeding en diëtetiek — gedeelde reeksbibliotheek (film 1 en 2), 26 okt 2026.
// Schema-look: navy, gedempte vlakke kleuren uit het filmpalet, dunne lichtere rand, geen verloop/gloed.
// Kleuren: oker = voedsel, groen = groente/fruit, koraal = energie, paars = hormonen, teal = zenuw/water, goud = focus.

const VD = {
  hout: '#7A5A3E', houtR: '#9A7856', papier: '#E8E2D2', papierR: '#C8C0AC', inkt: '#4A5468',
  tomaat: '#D8705A', appel: '#8FBF6A', blad: '#6FA868', ei: '#EFE6D2', dooier: '#E0B64A', olie: '#C9B45C',
  rijst: '#EAE4D4', pizza: '#D9A85C', saus: '#C8604A', koek: '#B98A52', chips: '#D9C27A', thee: '#A8784E',
  vak: ['#6FA878', '#C9A35C', '#B98A80', '#CDB86E', '#5B9AC0'], // groente/fruit · brood/graan · peulvr/vis/vlees/zuivel · vetten/oliën · dranken
  huidNeutraal: '#C9A07E'
};
const VD_VAKNAMEN = ['groente en fruit', 'brood, graanproducten en aardappelen', 'peulvruchten, noten, vis, ei, vlees en zuivel', 'vetten en oliën', 'dranken'];
function _vdAssen(ctx, x, y, w, h) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); }
function _vdA(ctx, a) { if (a <= 0.01) return false; ctx.save(); ctx.globalAlpha *= a; return true; }
function _vdLicht(c, k = 0.35) { return lighten(c, k); }

// ---------- voedsel-iconen (aanvulling op foodIcon) ----------
function eten(ctx, kind, x, y, s = 1, a = 1) {
  if (!_vdA(ctx, a)) return; const st = c => _vdLicht(c);
  if (kind === 'tomaat') { circ(ctx, x, y + 4 * s, 30 * s, VD.tomaat, st(VD.tomaat), 1.4); ctx.strokeStyle = VD.blad; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (let k = 0; k < 5; k++) { const an = -1.57 + (k - 2) * 0.5; ctx.beginPath(); ctx.moveTo(x, y - 24 * s); ctx.lineTo(x + Math.cos(an) * 14 * s, y - 24 * s + Math.sin(an) * 8 * s + 4 * s); ctx.stroke(); } }
  else if (kind === 'tomaatjes') { [[-16, 6], [14, 8], [-2, -12]].forEach(p => eten(ctx, 'tomaat', x + p[0] * s, y + p[1] * s, 0.55 * s)); }
  else if (kind === 'appel') { ctx.beginPath(); ctx.moveTo(x, y - 22 * s); ctx.bezierCurveTo(x + 34 * s, y - 40 * s, x + 44 * s, y + 10 * s, x + 18 * s, y + 30 * s); ctx.bezierCurveTo(x + 8 * s, y + 36 * s, x - 8 * s, y + 36 * s, x - 18 * s, y + 30 * s); ctx.bezierCurveTo(x - 44 * s, y + 10 * s, x - 34 * s, y - 40 * s, x, y - 22 * s); shape(ctx, VD.appel, st(VD.appel), 1.4); ctx.strokeStyle = VD.hout; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y - 20 * s); ctx.lineTo(x + 4 * s, y - 36 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + 14 * s, y - 34 * s, 10 * s, 5 * s, -0.4, 0, 6.283); shape(ctx, VD.blad, st(VD.blad), 1); }
  else if (kind === 'ei') { ctx.beginPath(); ctx.ellipse(x, y, 24 * s, 31 * s, 0, 0, 6.283); shape(ctx, VD.ei, st(VD.ei, 0.1), 1.4); }
  else if (kind === 'eiGebakken') { blob(ctx, x, y, 44 * s, 32 * s, 0.18, 7); shape(ctx, VD.ei, '#FFFFFF', 1.2); circ(ctx, x + 4 * s, y - 2 * s, 14 * s, VD.dooier, st(VD.dooier), 1.2); }
  else if (kind === 'olie') { ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 48 * s); ctx.lineTo(x + 10 * s, y - 48 * s); ctx.lineTo(x + 10 * s, y - 30 * s); ctx.quadraticCurveTo(x + 26 * s, y - 20 * s, x + 26 * s, y); ctx.lineTo(x + 26 * s, y + 40 * s); ctx.lineTo(x - 26 * s, y + 40 * s); ctx.lineTo(x - 26 * s, y); ctx.quadraticCurveTo(x - 26 * s, y - 20 * s, x - 10 * s, y - 30 * s); ctx.closePath(); shape(ctx, rgba(VD.olie, 0.85), st(VD.olie), 1.4); roundRect(ctx, x - 9 * s, y - 58 * s, 18 * s, 11 * s, 3 * s); shape(ctx, '#4A5468', '#8FA0B5', 1); }
  else if (kind === 'water') { ctx.beginPath(); ctx.moveTo(x - 26 * s, y - 40 * s); ctx.lineTo(x + 26 * s, y - 40 * s); ctx.lineTo(x + 20 * s, y + 40 * s); ctx.lineTo(x - 20 * s, y + 40 * s); ctx.closePath(); shape(ctx, rgba(C.teal, 0.25), rgba(C.text, 0.7), 1.6); ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(x - 23 * s, y - 14 * s); ctx.lineTo(x + 23 * s, y - 14 * s); ctx.lineTo(x + 20 * s, y + 40 * s); ctx.lineTo(x - 20 * s, y + 40 * s); ctx.closePath(); ctx.fill(); }
  else if (kind === 'thee') { roundRect(ctx, x - 30 * s, y - 24 * s, 52 * s, 50 * s, 10 * s); shape(ctx, '#D9D2C2', '#F2F2EE', 1.4); ctx.strokeStyle = '#D9D2C2'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(x + 26 * s, y, 13 * s, -1.3, 1.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x - 4 * s, y - 22 * s, 24 * s, 5 * s, 0, 0, 6.283); ctx.fillStyle = VD.thee; ctx.fill(); }
  else if (kind === 'rijst') { ctx.beginPath(); ctx.ellipse(x, y - 4 * s, 40 * s, 16 * s, 0, 3.14, 6.283); shape(ctx, VD.rijst, '#FFFFFF', 1); ctx.beginPath(); ctx.moveTo(x - 44 * s, y - 4 * s); ctx.quadraticCurveTo(x, y + 52 * s, x + 44 * s, y - 4 * s); ctx.closePath(); shape(ctx, '#5B7FA8', '#8FB0D0', 1.4); }
  else if (kind === 'boterham') { ctx.beginPath(); ctx.moveTo(x - 38 * s, y + 34 * s); ctx.lineTo(x - 38 * s, y - 14 * s); ctx.bezierCurveTo(x - 46 * s, y - 46 * s, x - 6 * s, y - 50 * s, x, y - 34 * s); ctx.bezierCurveTo(x + 6 * s, y - 50 * s, x + 46 * s, y - 46 * s, x + 38 * s, y - 14 * s); ctx.lineTo(x + 38 * s, y + 34 * s); ctx.closePath(); shape(ctx, '#C29A5A', st('#C29A5A'), 1.4); ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 28 * s); ctx.lineTo(x - 30 * s, y - 12 * s); ctx.bezierCurveTo(x - 36 * s, y - 36 * s, x - 6 * s, y - 40 * s, x, y - 26 * s); ctx.bezierCurveTo(x + 6 * s, y - 40 * s, x + 36 * s, y - 36 * s, x + 30 * s, y - 12 * s); ctx.lineTo(x + 30 * s, y + 28 * s); ctx.closePath(); shape(ctx, '#E2C890', null); }
  else if (kind === 'pizza') { circ(ctx, x, y, 44 * s, VD.pizza, st(VD.pizza), 1.4); circ(ctx, x, y, 36 * s, VD.saus, null); [[-14, -10], [12, -16], [16, 10], [-12, 14], [2, 2]].forEach(p => circ(ctx, x + p[0] * s, y + p[1] * s, 6 * s, '#EADFB8', null)); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 1.5; for (let k = 0; k < 3; k++) { const an = k * 1.047; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * 44 * s, y - Math.sin(an) * 44 * s); ctx.lineTo(x + Math.cos(an) * 44 * s, y + Math.sin(an) * 44 * s); ctx.stroke(); } }
  else if (kind === 'koekje') { circ(ctx, x, y, 26 * s, VD.koek, st(VD.koek), 1.4); [[-8, -6], [8, -2], [-2, 9], [10, 10]].forEach(p => circ(ctx, x + p[0] * s, y + p[1] * s, 3.5 * s, '#6A4A30', null)); }
  else if (kind === 'chips') { ctx.beginPath(); ctx.moveTo(x - 30 * s, y - 40 * s); ctx.lineTo(x + 30 * s, y - 40 * s); ctx.lineTo(x + 34 * s, y + 40 * s); ctx.lineTo(x - 34 * s, y + 40 * s); ctx.closePath(); shape(ctx, VD.chips, st(VD.chips), 1.4); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 2; [-30, 34].forEach(d => { ctx.beginPath(); ctx.moveTo(x - 30 * s, y + d * s); for (let k = 0; k <= 6; k++) ctx.lineTo(x - 30 * s + k * 10 * s, y + d * s + (k % 2 ? -4 : 0) * s); ctx.stroke(); }); circ(ctx, x, y + 4 * s, 13 * s, '#E8D49A', null); }
  else if (kind === 'croissant') { ctx.beginPath(); ctx.moveTo(x - 44 * s, y + 10 * s); ctx.quadraticCurveTo(x, y - 46 * s, x + 44 * s, y + 10 * s); ctx.quadraticCurveTo(x + 20 * s, y + 4 * s, x, y + 22 * s); ctx.quadraticCurveTo(x - 20 * s, y + 4 * s, x - 44 * s, y + 10 * s); shape(ctx, '#C9944E', st('#C9944E'), 1.4); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 2; [-18, 0, 18].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d * s, y - 16 * s); ctx.lineTo(x + d * 0.7 * s, y + 14 * s); ctx.stroke(); }); }
  else if (kind === 'bonenblik') { roundRect(ctx, x - 28 * s, y - 40 * s, 56 * s, 80 * s, 6 * s); shape(ctx, '#8C98A8', '#C4CCD8', 1.4); roundRect(ctx, x - 28 * s, y - 22 * s, 56 * s, 42 * s, 2); shape(ctx, '#A87048', null); foodIcon(ctx, 'bonen', x, y - 1 * s, 0.42 * s); }
  else if (kind === 'koffie') { roundRect(ctx, x - 26 * s, y - 22 * s, 46 * s, 46 * s, 8 * s); shape(ctx, '#D9D2C2', '#F2F2EE', 1.4); ctx.strokeStyle = '#D9D2C2'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(x + 22 * s, y, 11 * s, -1.3, 1.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x - 3 * s, y - 20 * s, 21 * s, 5 * s, 0, 0, 6.283); ctx.fillStyle = '#6A4A30'; ctx.fill(); }
  else if (kind === 'vis') { ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.quadraticCurveTo(x - 6 * s, y - 28 * s, x + 26 * s, y); ctx.quadraticCurveTo(x - 6 * s, y + 28 * s, x - 40 * s, y); shape(ctx, '#B8C4D0', '#E0E6EE', 1.4); ctx.beginPath(); ctx.moveTo(x + 22 * s, y); ctx.lineTo(x + 44 * s, y - 16 * s); ctx.lineTo(x + 44 * s, y + 16 * s); ctx.closePath(); shape(ctx, '#A4B2C0', '#E0E6EE', 1.2); circ(ctx, x - 26 * s, y - 4 * s, 3.5 * s, '#1A2740', null); }
  else if (kind === 'noten') { [[-14, 4], [10, -6], [6, 12]].forEach((p, i) => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 16 * s, 11 * s, i, 0, 6.283); shape(ctx, '#B88A5A', st('#B88A5A'), 1.2); }); }
  else if (kind === 'bonen' || kind === 'kaas' || kind === 'melk' || kind === 'brood' || kind === 'vlees' || kind === 'blikje') foodIcon(ctx, kind, x, y, s * 0.8);
  ctx.restore();
}

// ---------- Schijf van Vijf (eigen schema, geen logo, geen nummers) ----------
// o.lit[i] 0..1 per vak, o.dim (0..1: vakken die niet oplichten gedimd), o.namen (0..1), o.inhoud (0..1: iconen per vak), o.rot (radialen)
function schijf(ctx, cx, cy, R, o = {}) {
  const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const lit = o.lit || [], rot = o.rot || 0, r0 = R * 0.32;
  for (let i = 0; i < 5; i++) {
    const a0 = rot - Math.PI / 2 + i * 2 * Math.PI / 5 + 0.02, a1 = a0 + 2 * Math.PI / 5 - 0.04, u = lit[i] || 0, d = o.dim ? (1 - o.dim * (1 - u)) : 1;
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * d;
    ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.arc(cx, cy, r0, a1, a0, true); ctx.closePath();
    shape(ctx, rgba(VD.vak[i], 0.55 + 0.3 * u), u > 0.5 ? C.goud : _vdLicht(VD.vak[i], 0.3), u > 0.5 ? 3 : 1.5);
    const am = (a0 + a1) / 2, rm = (R + r0) / 2, ix = cx + Math.cos(am) * rm, iy = cy + Math.sin(am) * rm;
    const inh = o.inhoud == null ? 1 : o.inhoud;
    if (inh > 0.01) { const set = [['tomaat', 'appel'], ['boterham', 'rijst'], ['kaas', 'ei'], ['olie'], ['water', 'thee']][i], sc = R / 330;
      set.forEach((k, j) => eten(ctx, k, ix + (j - (set.length - 1) / 2) * 62 * sc * Math.cos(am + 1.57) , iy + (j - (set.length - 1) / 2) * 62 * sc * Math.sin(am + 1.57), 0.62 * sc, inh)); }
    ctx.restore();
  }
  circ(ctx, cx, cy, r0 - 6, rgba(C.bgSchema, 0.9), rgba(C.line, 0.6), 1.5);
  if (o.namen > 0.01) { for (let i = 0; i < 5; i++) { const am = rot - Math.PI / 2 + (i + 0.5) * 2 * Math.PI / 5, x = cx + Math.cos(am) * (R + 26), y = cy + Math.sin(am) * (R + 26), al = Math.cos(am) > 0.2 ? 'left' : (Math.cos(am) < -0.2 ? 'right' : 'center');
      const nm = VD_VAKNAMEN[i], w = o.namenAl ? (o.namenAl[i] || 0) : o.namen; if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; _vdNaam(ctx, nm, x, y + (Math.sin(am) > 0.3 ? 30 : 0), al, (lit[i] || 0) > 0.5 ? C.text : C.text2); ctx.restore(); } } }
  ctx.restore();
}
function _vdNaam(ctx, s, x, y, al, col) { // naam in gewone letters, met donkere rand, max 2 regels
  ctx.save(); ctx.font = fTekst(36, 600); ctx.textAlign = al; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  const woorden = s.split(' '); let regels = [s]; if (ctx.measureText(s).width > 420) { let r1 = ''; for (const w of woorden) { if (ctx.measureText(r1 + ' ' + w).width > 400 && r1) break; r1 = r1 ? r1 + ' ' + w : w; } regels = [r1, s.slice(r1.length + 1)]; }
  regels.forEach((r, k) => { ctx.strokeStyle = rgba(C.bgSchema, 0.9); ctx.lineWidth = 8; ctx.strokeText(r, x, y + k * 42); ctx.fillStyle = col; ctx.fillText(r, x, y + k * 42); }); ctx.restore(); }

// ---------- praktijk: tafel, eetdagboek, telefoon met foto ----------
function tafel(ctx, x, y, w, a = 1) { if (!_vdA(ctx, a)) return; roundRect(ctx, x - w / 2, y, w, 22, 6); shape(ctx, VD.hout, VD.houtR, 1.5); ctx.fillStyle = VD.hout; [[-w / 2 + 40], [w / 2 - 52]].forEach(([d]) => ctx.fillRect(x + d, y + 22, 12, 170)); ctx.restore(); }
function eetdagboek(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -120, 340, 240, 8); shape(ctx, VD.papier, VD.papierR, 1.5); ctx.strokeStyle = VD.papierR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -116); ctx.lineTo(0, 116); ctx.stroke();
  const dagen = o.dagen || ['MA', 'DI', 'WO', 'ZA']; ctx.fillStyle = VD.inkt; ctx.font = fMeta(18); ctx.textAlign = 'left';
  dagen.forEach((d, k) => { const px = k < 2 ? -155 : 15, py = -92 + (k % 2) * 112; ctx.fillText(d, px, py); ctx.strokeStyle = rgba(VD.inkt, 0.35); ctx.lineWidth = 1.5; for (let l = 0; l < 4; l++) { const ww = 90 + ((k * 37 + l * 53) % 50); ctx.beginPath(); ctx.moveTo(px + 34, py - 4 + l * 22); ctx.lineTo(px + 34 + ww * (o.vul == null ? 1 : clamp(o.vul * 4 - k, 0, 1)), py - 4 + l * 22); ctx.stroke(); } });
  if (o.iconen) { eten(ctx, 'boterham', -125, -40, 0.35); eten(ctx, 'koffie', -60, -36, 0.4); eten(ctx, 'tomaat', 60, -40, 0.35); eten(ctx, 'pizza', 120, 70, 0.35); }
  ctx.restore(); }
function telefoonFoto(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -130, 140, 260, 18); shape(ctx, '#2E3442', '#8FA0B5', 2); roundRect(ctx, -60, -112, 120, 224, 8); ctx.fillStyle = '#9CC4E0'; ctx.fill();
  ctx.save(); roundRect(ctx, -60, -112, 120, 224, 8); ctx.clip(); ctx.fillStyle = '#7FB070'; ctx.fillRect(-60, 40, 120, 80); ctx.fillStyle = '#BFB8A8'; ctx.fillRect(-60, 60, 120, 18);
  _vdFiets(ctx, 0, 62, 0.62, '#D8705A'); if (o.kind) persoon(ctx, o.kind, 0, 46, 112, { pose: 'staan', uit: 'lacht', kijk: 1 }); ctx.restore(); ctx.restore(); }
function _vdFiets(ctx, x, y, s, kleur = '#D8705A') { ctx.save(); ctx.lineWidth = 5 * s; ctx.strokeStyle = '#E8EEF4'; [-40, 40].forEach(d => { ctx.beginPath(); ctx.arc(x + d * s, y, 26 * s, 0, 6.283); ctx.stroke(); }); ctx.strokeStyle = kleur; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 8 * s, y - 34 * s); ctx.lineTo(x + 26 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 8 * s, y - 34 * s); ctx.lineTo(x + 2 * s, y); ctx.lineTo(x + 26 * s, y - 34 * s); ctx.moveTo(x - 10 * s, y - 40 * s); ctx.lineTo(x - 2 * s, y - 40 * s); ctx.moveTo(x + 26 * s, y - 34 * s); ctx.lineTo(x + 22 * s, y - 50 * s); ctx.stroke(); ctx.restore(); }
function fietsLicht(ctx, x, y, s = 1, a = 1, kleur) { if (!_vdA(ctx, a)) return; _vdFiets(ctx, x, y, s, kleur); ctx.restore(); }

// ---------- metingen: balken onderrapportage, glas zwaar water, meetlint, weegschaal ----------
function balkPaar(ctx, x, yBase, h1, h2, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const w = o.w || 150;
  roundRect(ctx, x, yBase - h1, w, h1, 8); shape(ctx, rgba(C.oker, 0.55), C.oker, 1.5);
  roundRect(ctx, x + w + 60, yBase - h2, w, h2, 8); shape(ctx, rgba(C.oker, 0.25), rgba(C.oker, 0.9), 1.5);
  if (o.verschil > 0.01 && h2 > h1) { ctx.save(); ctx.globalAlpha *= o.verschil; ctx.setLineDash([8, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, yBase - h1); ctx.lineTo(x + 2 * w + 60, yBase - h1); ctx.stroke(); ctx.setLineDash([]); roundRect(ctx, x + w + 60, yBase - h2, w, h2 - h1, 8); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); ctx.restore(); }
  [[o.l1, x + w / 2], [o.l2, x + w * 1.5 + 60]].forEach(([l, lx]) => { if (!l) return; l.split('|').forEach((r, k) => metaText(ctx, r, lx, yBase + 40 + k * 32, C.text2, 'center', 24)); }); ctx.restore(); }
function glasZwaarWater(ctx, x, y, s = 1, a = 1) { if (!_vdA(ctx, a)) return; eten(ctx, 'water', x, y, s); for (let k = 0; k < 5; k++) circ(ctx, x + (-14 + (k * 13) % 28) * s, y + (6 + (k * 17) % 26) * s, 4 * s, rgba(C.paars, 0.9), null); ctx.restore(); }
function meetlint(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const u = o.u == null ? 1 : o.u;
  roundRect(ctx, x, y - 12, w * u, 24, 4); shape(ctx, '#E0C860', '#F0DC88', 1.2); ctx.strokeStyle = '#4A4E5E'; ctx.lineWidth = 1.5; for (let k = 0; k * 14 < w * u - 4; k++) { ctx.beginPath(); ctx.moveTo(x + 4 + k * 14, y - 12); ctx.lineTo(x + 4 + k * 14, y - (k % 5 ? 4 : -2)); ctx.stroke(); } ctx.restore(); }
function weegschaalVloer(ctx, x, y, s = 1, a = 1) { if (!_vdA(ctx, a)) return; roundRect(ctx, x - 70 * s, y - 16 * s, 140 * s, 16 * s, 6 * s); shape(ctx, '#C4CCD8', '#E8EEF4', 1.2); roundRect(ctx, x - 22 * s, y - 13 * s, 44 * s, 9 * s, 2); ctx.fillStyle = '#2E3442'; ctx.fill(); ctx.restore(); }

// ---------- gewoonte: weekbord en curve ----------
function weekbord(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const n = o.n || 7, cw = (w - (n - 1) * 12) / n, st = o.status || [];
  const dagen = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
  for (let i = 0; i < n; i++) { const xx = x + i * (cw + 12), s2 = st[i] || 0; roundRect(ctx, xx, y, cw, cw, 12); shape(ctx, s2 === 2 ? rgba('#5A6478', 0.7) : rgba(C.fill, 0.6), s2 === 1 ? C.goud : rgba(C.line, 0.6), s2 === 1 ? 2.5 : 1.2);
    metaText(ctx, dagen[i % 7], xx + cw / 2, y - 14, C.text2, 'center', 26); if (s2 === 1) eten(ctx, 'tomaatjes', xx + cw / 2, y + cw / 2, cw / 110); if (s2 === 2) { ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx + cw * 0.3, y + cw / 2); ctx.lineTo(xx + cw * 0.7, y + cw / 2); ctx.stroke(); } }
  ctx.restore(); }
function gewoonteCurve(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; _vdAssen(ctx, x, y, w, h); const u = o.u == null ? 1 : o.u;
  const lijnen = [[0.12, C.groen, '± 3 weken'], [0.33, C.goud, 'ruim 2 maanden'], [0.85, rgba(C.text2, 0.9), 'meer dan een half jaar · schatting']];
  lijnen.forEach(([k, col, lab], j) => { const al = o.lijnen ? (o.lijnen[j] || 0) : 1; if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = j === 1 ? 4 : 3; ctx.beginPath();
    for (let p = 0; p <= 60 * u; p++) { const tx = p / 60, yy = 1 - Math.exp(-tx / (k * 0.45)); const px = x + tx * w, py = y + h - yy * h * 0.88; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    ctx.fillStyle = col; ctx.fillRect(x + w * 0.42, y + h - 150 + j * 44, 34, 6); metaText(ctx, lab.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + w * 0.42 + 48, y + h - 140 + j * 44, col, 'left', 24); ctx.restore(); });
  metaText(ctx, 'TIJD', x + w, y + h + 38, C.text2, 'right', 26); metaText(ctx, 'HOE VANZELF', x, y - 18, C.text2, 'left', 26); ctx.restore(); }

// ---------- film 2: riem, energiebalans, BMI-balk, gewichtscurve, telpoppetjes ----------
function riem(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const gat = o.gat == null ? 2 : o.gat;
  roundRect(ctx, x, y - 22, w, 44, 6); shape(ctx, '#6A4A34', '#8A6A50', 1.5); ctx.strokeStyle = rgba('#D9C4A0', 0.5); ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 6, y - 15); ctx.lineTo(x + w - 6, y - 15); ctx.moveTo(x + 6, y + 15); ctx.lineTo(x + w - 6, y + 15); ctx.stroke(); ctx.setLineDash([]);
  for (let k = 0; k < 5; k++) { const gx = x + w - 60 - k * 40; circ(ctx, gx, y, 6, '#2A1E16', null); if (k === Math.round(gat)) circ(ctx, gx, y, 13, null, C.goud, 2.5); }
  const bx = x + w - 60 - gat * 40 - 90; roundRect(ctx, bx - 30, y - 34, 60, 68, 10); shape(ctx, null, '#C9C2B0', 6); ctx.strokeStyle = '#C9C2B0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx + 40, y); ctx.stroke(); ctx.restore(); }
function energieBalans(ctx, cx, y, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const tilt = o.tilt || 0, L = 300;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(cx - 60, y + 330); ctx.lineTo(cx + 60, y + 330); ctx.lineTo(cx, y + 10); ctx.closePath(); ctx.fill();
  const dx = Math.cos(tilt) * L, dy = Math.sin(tilt) * L; ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - dx, y - dy); ctx.lineTo(cx + dx, y + dy); ctx.stroke(); circ(ctx, cx, y, 12, C.goud, null);
  const pan = (px, py, col, lab, lagen) => { ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; const PY = py + 250; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, PY); ctx.moveTo(px, py); ctx.lineTo(px + 110, PY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 120, PY); ctx.lineTo(px + 120, PY); ctx.lineWidth = 6; ctx.stroke();
    if (lagen) { let yy = PY - 4; lagen.forEach(([hh, cc, ll, al]) => { if ((al ?? 1) <= 0.01) return; ctx.save(); ctx.globalAlpha *= al ?? 1; roundRect(ctx, px - 90, yy - hh, 180, hh, 6); shape(ctx, rgba(cc, 0.6), cc, 1.5); if (ll) { ctx.font = fMeta(22); ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.fillText(ll, px, yy - hh / 2 + 8); } ctx.restore(); yy -= hh + 4; }); }
    if (lab) metaText(ctx, lab, px, PY + 44, col, 'center', 26); };
  pan(cx - dx, y - dy, C.oker, 'ENERGIE IN · ETEN', o.in || [[120, C.oker, '', 1]]);
  pan(cx + dx, y + dy, C.koraal, 'ENERGIE UIT', o.uit || [[120, C.koraal, '', 1]]); ctx.restore(); }
function bmiBalk(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const lo = 15, hi = 40, X = v => x + (v - lo) / (hi - lo) * w;
  const zones = [[lo, 18.5, rgba(C.teal, 0.45), 'ONDERGEWICHT'], [18.5, 25, rgba(C.groen, 0.5), 'GEZOND'], [25, 30, rgba(C.oker, 0.55), 'OVERGEWICHT'], [30, hi, rgba(C.koraal, 0.55), 'OBESITAS']];
  zones.forEach(([v0, v1, col, lab]) => { ctx.fillStyle = col; ctx.fillRect(X(v0), y, X(v1) - X(v0), 44); metaText(ctx, lab, (X(v0) + X(v1)) / 2, y + 86, C.text2, 'center', 22); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, 44); [18.5, 25, 30].forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), y - 8); ctx.lineTo(X(v), y + 52); ctx.stroke(); text(ctx, String(v).replace('.', ','), X(v), y - 16, fTekst(32, 600), C.text, 'center'); });
  if (o.waarde != null && (o.mark ?? 1) > 0.01) { ctx.save(); ctx.globalAlpha *= o.mark ?? 1; const mx = X(o.waarde); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(mx, y + 46); ctx.lineTo(mx - 14, y + 70); ctx.lineTo(mx + 14, y + 70); ctx.closePath(); ctx.fill(); ctx.fillRect(mx - 2, y - 6, 4, 56); ctx.restore(); }
  ctx.restore(); }
function gewichtCurve(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const u = o.u == null ? 1 : o.u; _vdAssen(ctx, x, y, w, h);
  const f = tx => tx < 0.4 ? 0.75 - 0.35 * Math.sin(tx / 0.4 * 1.5708) : (o.vlak ? 0.4 : 0.4 + 0.3 * (1 - Math.exp(-(tx - 0.4) * 4)));
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - f(tx) * h; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  metaText(ctx, 'GEWICHT', x - 10, y - 14, C.text2, 'left', 22); metaText(ctx, 'TIJD', x + w, y + h + 34, C.text2, 'right', 22); metaText(ctx, o.label || 'VOORBEELD · MODEL', x + w, y - 14, C.grain, 'right', 22); ctx.restore(); }
function telpoppetjes(ctx, x, y, n, per, cel, kleurFn, a = 1) { if (!_vdA(ctx, a)) return; for (let i = 0; i < n; i++) { const cx = x + (i % per) * cel, cy = y + Math.floor(i / per) * cel * 1.25, col = kleurFn(i);
  circ(ctx, cx, cy, cel * 0.17, col, null); roundRect(ctx, cx - cel * 0.2, cy + cel * 0.2, cel * 0.4, cel * 0.5, cel * 0.15); ctx.fillStyle = col; ctx.fill(); } ctx.restore(); }

// ---------- film 2: maag met ghreline, vetcel met leptine, hersenen met hypothalamus ----------
function hormoonPuntjes(ctx, x, y, n, r, t, a = 1, col = C.paars, spreid = 80) { if (!_vdA(ctx, a)) return; for (let k = 0; k < n; k++) { const an = hash(k * 13.1) * 6.283, d = (0.3 + 0.7 * hash(k * 7.7)) * spreid, w = 0.5 + 0.5 * Math.sin(t * 0.8 + k);
  circ(ctx, x + Math.cos(an) * d + w * 6, y + Math.sin(an) * d, r, col, _vdLicht(col, 0.4), 1); } ctx.restore(); }
function maagGhreline(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const vol = o.vol || 0;
  ctx.translate(x, y); ctx.scale(s * (1 + 0.18 * vol), s * (1 + 0.1 * vol)); maagVorm(ctx, -110, -150, 0.6); ctx.restore();
  if (o.ghreline > 0.01) hormoonPuntjes(ctx, x - 10 * s, y + 10 * s, Math.round(4 + 10 * o.ghreline), 7 * s, o.t || 0, o.ghreline, C.paars, 110 * s); }
function vetcelLeptine(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; vetcel(ctx, x, y, r, {}); if (o.leptine > 0.01) hormoonPuntjes(ctx, x, y, Math.round(o.n || 10), 7, o.t || 0, o.leptine, C.paars, r * 1.25); ctx.restore(); }
function hersenenHth(ctx, x, y, s = 1, o = {}) { hoofdHersenen(ctx, x, y, s, { a: o.a == null ? 1 : o.a, hth: o.hth || 0, hyp: 0, t: o.t || 0 }); }

// =====================================================================================
// STAMBOOM met standaardsymbolen — getekend uit data, generatie voor generatie op te bouwen.
// Recept (standaardnotatie, Bennett e.a. 2008, herziening 2022): vierkant = man, cirkel = vrouw, ruit = onbekend;
// gevuld = heeft de eigenschap/aandoening; drager = stip in het midden (oudere notatie, in Nederlandse lesmethoden
// gangbaar); schuine streep = overleden; pijl = proband (via wie de familie in beeld kwam). Partners verbonden met een
// horizontale lijn (dubbel = bloedverwanten); daaronder een verticale lijn naar de broer-zuslijn; kinderen van oud naar
// jong van links naar rechts. Generaties met Romeinse cijfers (I, II, III), personen per generatie genummerd.
// Bron: Bennett e.a. 2008/2022 (samenvatting Switzerland Omics 'standardised pedigree notation').
// Bekende fouten: kinderlijn vanaf één ouder; cirkel en vierkant verschillend groot; generaties niet op één hoogte.
// Ontwerp: hoogte ± 600 (drie generaties op y −200, 0, 200), oorsprong = midden. Aanpak A: zuivere notatie (Schema-look),
// lijnen die per generatie intekenen; persoon oplichten met een gouden ring.
// o: a, opbouw (0..1 generaties verschijnen na elkaar), hi (nr, rest gedimd), proband (nr), romeins (1), nummers (1),
//    personen (lijst {nr, id?, sekse 'm'|'v'|'?', ziek, drager, overleden, x, gen 1..3, ouders:[nr,nr]})
// Geeft per persoon een ankerpunt (midden symbool) terug: anker[nr], plus anker.naam(nr) = plek ónder het symbool.
// =====================================================================================
const STAMBOOM_NOOR = [ // familie van Noor (ROLLEN.md); de eigenschap is neutraal gekozen
  { nr: 1, id: 'ahmed', sekse: 'm', x: -290, gen: 1 }, { nr: 2, id: 'malika', sekse: 'v', x: -170, gen: 1 },
  { nr: 3, id: 'henk', sekse: 'm', x: 150, gen: 1, ziek: 1 }, { nr: 4, id: 'ria', sekse: 'v', x: 270, gen: 1, drager: 1 },
  { nr: 5, id: 'rachid', sekse: 'm', x: -120, gen: 2, ouders: [1, 2], drager: 1 }, { nr: 6, id: 'linda', sekse: 'v', x: 80, gen: 2, ouders: [3, 4], drager: 1 },
  { nr: 7, id: 'petra', sekse: 'v', x: 270, gen: 2, ouders: [3, 4], ziek: 1 },
  { nr: 8, id: 'noor', sekse: 'v', x: -100, gen: 3, ouders: [5, 6] }, { nr: 9, id: 'kind', sekse: 'm', x: 60, gen: 3, ouders: [5, 6], ziek: 1 }];
function stamboomSymbolen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, opbouw = 1, hi = null, proband = null, romeins = 1, nummers = 1, personen = STAMBOOM_NOOR } = o;
  const R = 28, GY = g => -200 + (g - 1) * 200;
  const P = {}; personen.forEach(p => P[p.nr] = p);
  const anker = {}; personen.forEach(p => anker[p.nr] = [x + p.x * s, y + GY(p.gen) * s]); anker.naam = nr => [x + P[nr].x * s, y + (GY(P[nr].gen) + R + 46) * s];
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const zicht = g => clamp((opbouw * 3 - (g - 1)) / 0.6, 0, 1); // generatie g verschijnt
  const LIJN = C.line, VUL = C.paars;
  const dimP = nr => (hi != null && hi !== nr) ? 0.4 : 1;
  // lijnen: partners + afstamming
  const paren = {}; personen.forEach(p => { if (p.ouders) paren[p.ouders.join('-')] = (paren[p.ouders.join('-')] || []).concat(p); });
  ctx.strokeStyle = LIJN; ctx.lineWidth = 3;
  for (const k in paren) { const [m, v] = k.split('-').map(Number); const A = P[m], B = P[v]; const g = A.gen; const kids = paren[k].sort((p, q) => p.x - q.x);
    const yP = GY(g), mx = (A.x + B.x) / 2, yS = GY(g + 1) - R - 34; const zp = zicht(g), zk = zicht(g + 1);
    ctx.save(); ctx.globalAlpha *= zp; ctx.beginPath(); ctx.moveTo(Math.min(A.x, B.x) + R, yP); ctx.lineTo(lerp(Math.min(A.x, B.x) + R, Math.max(A.x, B.x) - R, zp), yP); ctx.stroke(); ctx.restore();
    if (zk > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, zk * 2); const u = ease(zk);
      ctx.beginPath(); ctx.moveTo(mx, yP); ctx.lineTo(mx, lerp(yP, yS, Math.min(1, u * 2))); ctx.stroke();
      if (u > 0.5) { const v = (u - 0.5) * 2; const x0 = Math.min(mx, kids[0].x), x1 = Math.max(mx, kids[kids.length - 1].x); ctx.beginPath(); ctx.moveTo(lerp(mx, x0, v), yS); ctx.lineTo(lerp(mx, x1, v), yS); ctx.stroke();
        kids.forEach(c => { ctx.beginPath(); ctx.moveTo(c.x, yS); ctx.lineTo(c.x, lerp(yS, GY(c.gen) - R, v)); ctx.stroke(); }); }
      ctx.restore(); } }
  // symbolen
  personen.forEach(p => { const z = zicht(p.gen); if (z <= 0.01) return; const cx = p.x, cy = GY(p.gen); ctx.save(); ctx.globalAlpha *= z * dimP(p.nr);
    const sym = () => { ctx.beginPath(); if (p.sekse === 'm') ctx.rect(cx - R, cy - R, 2 * R, 2 * R); else if (p.sekse === 'v') ctx.arc(cx, cy, R, 0, 6.283); else { ctx.moveTo(cx, cy - R * 1.25); ctx.lineTo(cx + R * 1.25, cy); ctx.lineTo(cx, cy + R * 1.25); ctx.lineTo(cx - R * 1.25, cy); ctx.closePath(); } };
    sym(); ctx.fillStyle = p.ziek ? VUL : C.bgSchema; ctx.fill(); ctx.strokeStyle = p.ziek ? lighten(VUL, 0.35) : C.text; ctx.lineWidth = 3; ctx.stroke();
    if (p.drager && !p.ziek) { ctx.fillStyle = VUL; ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, 6.283); ctx.fill(); }
    if (p.overleden) { ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - R * 1.3, cy + R * 1.3); ctx.lineTo(cx + R * 1.3, cy - R * 1.3); ctx.stroke(); }
    if (hi === p.nr) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R * 1.65, 0, 6.283); ctx.stroke(); }
    if (proband === p.nr) { ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - R * 2.6, cy + R * 2); ctx.lineTo(cx - R * 1.25, cy + R * 0.9); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - R * 1.1, cy + R * 0.75); ctx.lineTo(cx - R * 1.6, cy + R * 0.95); ctx.lineTo(cx - R * 1.35, cy + R * 1.35); ctx.closePath(); ctx.fill(); }
    ctx.restore(); });
  // generatienummers en persoonnummers (meta)
  if (romeins > 0.01) { ctx.save(); ctx.globalAlpha *= romeins; ctx.font = fMeta(30); ctx.fillStyle = C.text2; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; [1, 2, 3].forEach(g => { if (zicht(g) > 0.01) { ctx.save(); ctx.globalAlpha *= zicht(g); ctx.fillText(['I', 'II', 'III'][g - 1], -350, GY(g)); ctx.restore(); } }); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers; ctx.font = fMeta(28); ctx.fillStyle = C.text2; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; const tel = {};
    personen.slice().sort((p, q) => p.gen - q.gen || p.x - q.x).forEach(p => { tel[p.gen] = (tel[p.gen] || 0) + 1; if (zicht(p.gen) > 0.01) { ctx.save(); ctx.globalAlpha *= zicht(p.gen) * dimP(p.nr); ctx.fillText(String(tel[p.gen]), p.x, GY(p.gen) + R + 8); ctx.restore(); } }); ctx.restore(); }
  ctx.restore(); return anker;
}

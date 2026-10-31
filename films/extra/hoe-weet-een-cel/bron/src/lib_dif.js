// lib_dif.js — gedeelde tekenobjecten voor de extra film 'Hoe weet een cel wat hij moet worden?' (storyboard, 30 okt 2026)
// Laadt na lib.js, base.js, lib_cast.js, lib_bio.js. Alles in Part C: navy-schema, betekeniskleuren, geen verloop, geen gloed.

// Kiembladkleuren (voorstel, twijfelscène w15): ectoderm teal, mesoderm koraal, endoderm oker
const KB = { ecto: C.teal, meso: C.koraal, endo: C.oker };

function difTag(ctx, hfst) { metaText(ctx, `EXTRA · CELLEN · ${hfst}`, 80, 78, C.text2, 'left', 26); }
function difLabel(ctx, s) { metaText(ctx, s, W - 80, 78, C.goud, 'right', 26); } // MODEL / VEREENVOUDIGD / GEDACHTE-EXPERIMENT

function difTitelKaart(ctx, titel, vraag, beeld) {
  ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'VWO · EXTRA · CELLEN', W - 80, 78, C.text2, 'right', 26);
  text(ctx, titel, 120, 360, fTitel(84), C.text, 'left');
  (Array.isArray(vraag) ? vraag : [vraag]).filter(Boolean).forEach((r, i) => text(ctx, r, 120, 450 + i * 60, fTekst(48, 500), C.text2, 'left'));
  if (beeld) beeld(ctx);
}

function difVraagKaart(ctx, vraag, opties, beeld) {
  ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); difTag(ctx, 'VRAAG');
  text(ctx, 'Wat denk je?', 140, 220, fTitel(76), C.text, 'left');
  const regels = Array.isArray(vraag) ? vraag : [vraag]; regels.forEach((r, i) => text(ctx, r, 140, 310 + i * 58, fTekst(46, 500), C.text2, 'left'));
  const y0 = 310 + regels.length * 58 + 30, bw = beeld ? 1180 : 1500;
  opties.forEach((t, i) => { roundRect(ctx, 140, y0 + i * 118, bw, 96, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
    text(ctx, 'ABCD'[i], 184, y0 + i * 118 + 62, fTekst(44, 800), C.goud, 'left'); text(ctx, t, 250, y0 + i * 118 + 62, fTekst(38, 500), C.text, 'left'); });
  if (beeld) beeld(ctx);
}

// 'Onze cel': een cel met een gouden rand (de gevolgde cel); r = straal
function onzeCel(ctx, x, y, r, o = {}) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(o.kleur || C.teal, 0.28); ctx.fill();
  ctx.lineWidth = Math.max(2, r * 0.12); ctx.strokeStyle = C.goud; ctx.stroke();
  ctx.beginPath(); ctx.arc(x + r * 0.1, y - r * 0.05, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill(); ctx.restore();
}

// ---------- Het landschap van Waddington (MODEL) ----------
// Boom van dalen; elk knooppunt {n: naam, k: [kinderen]}. Getekend als schuin aanzicht: een helling met groeven.
const DIF_BOOM = { n: 'bevruchte eicel', k: [
  { n: 'placenta' },
  { n: 'embryo', k: [
    { n: 'ectoderm', k: [ { n: 'neurale buis' }, { n: 'huid en lens', k: [ { n: 'opperhuid' }, { n: 'lens' } ] } ] },
    { n: 'mesoderm', k: [ { n: 'spier' }, { n: 'bloed' } ] },
    { n: 'endoderm', k: [ { n: 'darm' }, { n: 'lever' } ] } ] } ] };
const DIF_BOOM_ALGEMEEN = { n: '', k: [ { n: '', k: [ { n: 'spiercel' }, { n: 'zenuwcel' } ] }, { n: '', k: [ { n: 'huidcel' }, { n: 'levercel' } ] } ] };

// o.pad = lijst namen langs het gekozen pad (bv. ['embryo','ectoderm']); o.knikker = 0..1 positie langs het laatste segment (1 = in het dal);
// o.dim = andere dalen dimmen (35%); o.labels = namen tonen; o.leegNamen = lege knooppunten zonder naam
function landschap(ctx, x, y, w, h, o = {}) {
  const boom = o.boom || DIF_BOOM, pad = o.pad || [], dim = o.dim !== false;
  // diepte bepalen
  const diepte = (b) => b.k ? 1 + Math.max(...b.k.map(diepte)) : 0; const D = diepte(boom);
  // bladeren tellen voor de x-verdeling
  const blad = (b) => b.k ? b.k.reduce((s, c) => s + blad(c), 0) : 1;
  const P = []; // [{b, x, y, ouder, gekozen}]
  const zet = (b, x0, x1, d, ouder, gekozen) => { const bx = (x0 + x1) / 2, by = y + (d / D) * h; const knoop = { b, x: bx, y: by, ouder, gekozen, d }; P.push(knoop);
    if (b.k) { const tot = blad(b); let xs = x0; b.k.forEach(c => { const ww = (x1 - x0) * blad(c) / tot; const opPad = gekozen && pad[d] === c.n; zet(c, xs, xs + ww, d + 1, knoop, opPad && (d < pad.length)); xs += ww; }); } };
  zet(boom, x, x + w, 0, null, true);
  // helling: gladde heuvel van smal (top) naar de volle breedte
  const cx = P[0].x, yb = y + h + 70; ctx.save(); ctx.beginPath(); ctx.moveTo(cx - 70, y - 50); ctx.lineTo(cx + 70, y - 50);
  ctx.bezierCurveTo(cx + 240, y - 40, x + w + 70, y + h * 0.18, x + w + 70, y + h * 0.42); ctx.lineTo(x + w + 70, yb); ctx.lineTo(x - 70, yb); ctx.lineTo(x - 70, y + h * 0.42);
  ctx.bezierCurveTo(x - 70, y + h * 0.18, cx - 240, y - 40, cx - 70, y - 50); ctx.closePath();
  ctx.fillStyle = rgba('#2A3B5C', 0.9); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.stroke();
  // groeven (dalen): donkere brede lijn met lichte rand = rug
  const opGekozenPad = (k) => k.gekozen; const diepst = P.filter(k => k.gekozen).pop();
  const onder = (k, anc) => { for (let q = k; q; q = q.ouder) if (q === anc) return true; return false; };
  const mogelijk = (k) => !pad.length || !dim || k.gekozen || onder(k, diepst);
  for (const k of P) { if (!k.ouder) continue; const a = mogelijk(k) ? 1 : 0.35;
    const x0 = k.ouder.x, y0 = k.ouder.y, x1 = k.x, y1 = k.y, my = (y0 + y1) / 2;
    ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
    ctx.strokeStyle = rgba('#0E1626', 0.85); ctx.lineWidth = 26 - k.d * 3; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0, my, x1, my, x1, y1); ctx.stroke();
    ctx.strokeStyle = opGekozenPad(k) ? rgba(C.goud, 0.55) : rgba(C.line, 0.45); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0, my, x1, my, x1, y1); ctx.stroke();
    ctx.restore(); }
  // namen bij de dalen
  if (o.labels !== false) for (const k of P) { if (!k.b.n || (!k.ouder && !o.topNaam)) continue; const a = mogelijk(k) ? 1 : 0.35;
    ctx.save(); ctx.globalAlpha *= a; const blad1 = !k.b.k; if (blad1) text(ctx, k.b.n, k.x, k.y + 46, fTekst(32, 600), k.gekozen ? C.goud : C.text, 'center'); else text(ctx, k.b.n, k.x + 30, k.y + 10, fTekst(30, 600), k.gekozen ? C.goud : C.text, 'left'); ctx.restore(); }
  // knikker
  let kx = P[0].x, ky = P[0].y - 18; const pk = P.filter(k => k.gekozen); const laatste = pk[pk.length - 1];
  if (laatste && laatste.ouder) { const t = o.knikker == null ? 1 : o.knikker, x0 = laatste.ouder.x, y0 = laatste.ouder.y, x1 = laatste.x, y1 = laatste.y;
    const u = t, my = (y0 + y1) / 2; // bezier-punt
    const bx = (1 - u) ** 3 * x0 + 3 * (1 - u) ** 2 * u * x0 + 3 * (1 - u) * u * u * x1 + u ** 3 * x1, by = (1 - u) ** 3 * y0 + 3 * (1 - u) ** 2 * u * my + 3 * (1 - u) * u * u * my + u ** 3 * y1; kx = bx; ky = by - 14; }
  if (o.knikkerTonen !== false) { ctx.beginPath(); ctx.arc(kx, ky, 18, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.strokeStyle = '#8A6510'; ctx.lineWidth = 2; ctx.stroke(); }
  ctx.restore();
  return { knopen: P, knikker: [kx, ky] };
}

// vier antwoordtegels (positie, signaal, gevoeligheid, geheugen); n = aantal zichtbaar, actief = index die oplicht
function antwoordTegels(ctx, x, y, n = 4, actief = -1, b = 300) {
  const T = ['positie', 'signaal', 'gevoeligheid', 'geheugen'];
  for (let i = 0; i < 4; i++) { const yy = y + i * 96; const zicht = i < n; ctx.save(); ctx.globalAlpha *= zicht ? 1 : 0.25;
    roundRect(ctx, x, yy, b, 76, 14); shape(ctx, i === actief ? rgba(C.goud, 0.18) : rgba(C.fill, 0.7), i === actief ? C.goud : C.line, 2);
    text(ctx, zicht ? T[i] : '?', x + b / 2, yy + 50, fTekst(38, 700), i === actief ? C.goud : C.text, 'center'); ctx.restore(); }
}

// Klein landschap rechtsboven als 'waar zijn we' (tussendoor in Micro-scènes)
function landschapKlein(ctx, pad, knikker) { ctx.save(); roundRect(ctx, 1470, 110, 400, 300, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); landschap(ctx, 1500, 160, 340, 200, { pad, knikker, labels: false }); metaText(ctx, 'MODEL', 1850, 395, C.text2, 'right', 26); ctx.restore(); }

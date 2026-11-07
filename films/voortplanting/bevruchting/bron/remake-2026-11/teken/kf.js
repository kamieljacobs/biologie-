// Keyframes fase 1 · Bevruchting (twijfelscènes). Eén functie per keyframe.
function pill(ctx, x, y, s, col, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + 48;
  roundRect(ctx, x - w / 2, y - px * 0.95, w, px * 1.6, px * 0.8); shape(ctx, rgba('#121A26', 0.85), col, 2); text(ctx, s, x, y + px * 0.18, fTekst(px, 700), col, 'center'); ctx.restore(); }
function meta(ctx, s) { metaText(ctx, s, 60, 1040, C.text2, 'left', 26); }
function kast(ctx, s) { ctx.save(); ctx.font = fTekst(44, 700); const w = Math.min(1700, ctx.measureText(s).width + 80); roundRect(ctx, 960 - w / 2, 920, w, 84, 12); ctx.fillStyle = rgba('#0D1420', 0.9); ctx.fill();
  text(ctx, s, 960, 975, fTekst(44, 700), C.text, 'center'); ctx.restore(); }

const KF = {
  // T4a · s14 — van dichtbij: de eerste zaadcel in het tunneltje, acrosoom open; andere zaadcellen nog buiten de mantel
  't4a-tunneltje'(ctx, t) { bg(ctx, 'micro');
    bvMantel(ctx, 960, 470, 1100, { t, krans: 1, sp: [
      { u: -0.02, d: 0.68, acro: 1, foc: 1 }, { u: -0.35, d: 0.3, acro: 0.6, t: t + 0.4 }, { u: 0.33, d: 0.12, acro: 0, t: t + 0.9 }, { u: 0.6, d: 0.22, acro: 0, t: t + 1.3 }, { u: -0.62, d: 0.05, acro: 0, t: t + 1.7 } ] });
    naamBij(ctx, 'mantel', 'stevig en doorzichtig', 1440, 560, 1, 'left'); naamBij(ctx, 'cellen uit de follikel', null, 300, 360, 1, 'left');
    naamBij(ctx, 'blaasje met enzymen', 'open: tunneltje', 1010, 380, 1, 'left', C.goud); naamBij(ctx, 'eicel', null, 960, 830, 1, 'center');
    metaText(ctx, 'vergroot · eicel ± 0,1 mm · kop zaadcel ± 5 µm', 1880, 1040, C.text2, 'right', 26); kast(ctx, 'De enzymen verteren een smal tunneltje …'); },

  // T4b · s20 — versmolten: zaadkern binnen, de mantel verandert rondom; zaadcellen in de mantel komen niet verder
  't4b-mantel-dicht'(ctx, t) { bg(ctx, 'micro');
    bvMantel(ctx, 960, 470, 1100, { t, krans: 0.8, ux: -0.02, dicht: 0.55, kern: 0.8, sp: [
      { u: -0.02, d: 1.3, acro: 1 }, { u: -0.35, d: 0.42, acro: 1, t: t + 0.4 }, { u: 0.33, d: 0.3, acro: 0.2, t: t + 0.9 }, { u: 0.6, d: 0.2, acro: 0, t: t + 1.3 } ] });
    naamBij(ctx, 'kern van de zaadcel', 'binnen', 1010, 760, 1, 'left'); naamBij(ctx, 'mantel verandert', 'rondom, vanaf deze plek', 1340, 470, 1, 'left', C.teal);
    pill(ctx, 520, 300, 'kan niet meer binden', C.koraal, 1, 28);
    metaText(ctx, 'vergroot', 1880, 1040, C.text2, 'right', 26); kast(ctx, 'Meteen verandert de eicel haar mantel.'); },

  // T4c · s23–s25 — klievingsdelingen: zelfde zona, zelfde omvang, steeds kleinere cellen
  't4c-klieving'(ctx, t) { bg(ctx, 'micro');
    const xs = [250, 600, 960, 1320, 1670], ns = [1, 2, 4, 8, 16], lab = ['zygote', '2 cellen', '4 cellen', '8 cellen', '16 cellen'], dg = ['dag 1', 'dag 2', 'dag 2–3', 'dag 3', 'dag 4'];
    xs.forEach((x, i) => { bvKlieving(ctx, x, 470, 140, ns[i], { spook: i ? 0.8 : 0, pool: 2 }); text(ctx, lab[i], x, 700, fTekst(36, 600), C.text, 'center'); metaText(ctx, dg[i], x, 742, C.grain, 'center', 26); });
    haak(ctx, 150, 1770, 790, 'meer cellen, niet groter: elke cel wordt kleiner', C.groen);
    metaText(ctx, 'vergroot · zygote ± 0,1 mm · gestippeld: grootte van de zygote', 60, 1040, C.text2, 'left', 26); },

  // T4d · tussenstand van één deling (morph): 4 → 8
  't4d-deling-morph'(ctx, t) { bg(ctx, 'micro');
    [4, 5.2, 6.4, 8].forEach((n, i) => { bvKlieving(ctx, 330 + i * 420, 470, 160, n, { pool: 2 }); metaText(ctx, ['4', 'deelt …', 'deelt …', '8'][i], 330 + i * 420, 720, C.grain, 'center', 28); });
    meta(ctx, 'morph: elke cel snoert in tot twee, het geheel blijft even groot'); },

  // T1 · s26 — de holle bal zonder namen
  't1-holle-bal'(ctx, t) { bg(ctx, 'micro');
    blastocyste(ctx, 820, 480, 250, { hlB: 0.6, hlI: 0.6, hatch: 0 });
    naamBij(ctx, 'buitenste laag', 'helpt straks de placenta te maken', 1150, 330, 1, 'left'); naamBij(ctx, 'klompje cellen', 'wordt het kind', 1150, 560, 1, 'left');
    pill(ctx, 960, 110, 'na ± 5 dagen: een holle bal van ± 100 cellen', C.goud, 1, 32);
    metaText(ctx, 'vergroot · ± 0,15 mm', 1880, 1040, C.text2, 'right', 26); kast(ctx, 'Na ongeveer vijf dagen is het embryo een holle bal …'); },

  // T3 · s12 — het vruchtbare venster na de vraag (Schema)
  't3-venster'(ctx, t) { bg(ctx, 'schema');
    const x0 = 260, x1 = 1660, y = 520, dagen = [-6, -5, -4, -3, -2, -1, 0, 1, 2]; const X = (d) => lerp(x0, x1, (d + 6) / 8);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    dagen.forEach(d => { ctx.beginPath(); ctx.moveTo(X(d), y - 10); ctx.lineTo(X(d), y + 10); ctx.stroke(); metaText(ctx, d === 0 ? 'eisprong' : (d > 0 ? '+' : '') + d, X(d), y + 52, d === 0 ? C.goud : C.text2, 'center', 26); });
    roundRect(ctx, X(-3), y - 170, X(0) - X(-3), 50, 12); shape(ctx, rgba(C.teal, 0.35), C.teal, 2); text(ctx, 'zaadcellen wachten in de eileider', (X(-3) + X(0)) / 2, y - 136, fTekst(30, 700), C.text, 'center');
    roundRect(ctx, X(0), y - 100, X(1) - X(0), 50, 12); shape(ctx, rgba(C.oker, 0.4), C.oker, 2); text(ctx, 'eicel ± 1 dag', (X(0) + X(1)) / 2, y - 66, fTekst(28, 700), C.text, 'center');
    ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(X(-5), y - 230, X(1) - X(-5), 330); text(ctx, 'seks in deze dagen kan tot een bevruchting leiden', (X(-5) + X(1)) / 2, y + 150, fTekst(34, 700), C.groen, 'center');
    zaadcelEcht(ctx, X(-3) - 30, y - 145, 0, t, 1.6); meta(ctx, 'schema · dagen ten opzichte van de eisprong'); },
};

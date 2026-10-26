// Keyframes fase 1 · Spieren en beweging (storyboard, ronde 1). T = twijfelscène, K = kernscène.
function kop(ctx, s, sub) { text(ctx, s, 70, 92, fTekst(40, 700), C.text, 'left'); if (sub) metaText(ctx, sub, 70, 132, C.grain, 'left', 22); }
function meta(ctx, s, x = 70, y = 1050) { metaText(ctx, s, x, y, C.text2, 'left', 22); }
function kast(ctx, s) { ctx.font = fTekst(40, 700); const w = Math.min(1500, ctx.measureText(s).width + 60); roundRect(ctx, 960 - w / 2, 930, w, 70, 12); ctx.fillStyle = rgba(C.kast, 0.9); ctx.fill(); text(ctx, s, 960, 978, fTekst(40, 700), C.text, 'center'); }
function vraagkaartZ9(ctx, vraag, opts) { bg(ctx, 'schema'); text(ctx, 'Wat denk je?', 960, 220, fTitel(72), C.text, 'center'); text(ctx, vraag, 960, 320, fTekst(44, 600), C.text, 'center');
  opts.forEach((o, i) => { const y = 410 + i * 130; roundRect(ctx, 360, y, 1200, 100, 18); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); text(ctx, 'abc'[i], 420, y + 64, fTekst(40, 800), C.goud, 'center'); text(ctx, o, 480, y + 64, fTekst(38, 600), C.text, 'left'); });
  ctx.fillStyle = C.goud; ctx.fillRect(360, 830, 1200 * 0.6, 4); }
function bord(ctx) { roundRect(ctx, 160, 210, 1600, 680, 36); shape(ctx, '#C9A36A', '#9A7A4A', 2); }
Object.assign(KF, {
 'k1-cold-open'(ctx, t) { bg(ctx, 'schema'); practicum(ctx, 2, { last: 'veer', emg: 0.08, sam: 'vasthouden' }); kast(ctx, "Op Noors bovenarm zitten plakkers die meten hoe actief haar biceps is."); meta(ctx, 'S01 · COLD OPEN · PRACTICUMLOKAAL · SCHERM BIJNA VLAK'); },
 't1-vleugel-pees'(ctx, t) { bg(ctx, 'schema'); bord(ctx); const v = kippenvleugel(ctx, 470, 400, 46, { open: 1, buig: 0.85, hlPees: 1, trek: 1 });
  vingers(ctx, v.spier[0] - 70, v.spier[1] - 10, -0.25, 1); naamBij(ctx, 'pees', 'wit en taai', v.peesBuig[0] + 60, v.peesBuig[1] + 70, 1, 'left'); naamBij(ctx, 'spier', 'richting schouder trekken', 200, 840, 1, 'left');
  naamBij(ctx, 'bovenarm', null, v.schouder[0] + 120, v.schouder[1] - 95, 1, 'left'); naamBij(ctx, 'elleboog', null, v.elleboog[0] + 70, v.elleboog[1] - 40, 1, 'left'); naamBij(ctx, 'onderarm', null, v.pols[0] + 80, v.pols[1] - 120, 1, 'left');
  kast(ctx, 'Ze trekt hem richting de schouder. De vleugel buigt.'); meta(ctx, 'T1 · S09 · KIPPENVLEUGEL VAN BOVEN, VEL WEG · NOOR (HANDSCHOEN) TREKT DE SPIER AAN DE VOORKANT RICHTING SCHOUDER'); },
 't2-beenmerg'(ctx, t) { bg(ctx, 'schema'); bord(ctx); const v = kippenvleugel(ctx, 380, 400, 44, { open: 1, buig: 0.85, merg: 1, hlBot: 1 });
  zoomCircle(ctx, 1380, 520, 250, v.merg[0], v.merg[1], 'DOORGEKNIPT BOTJE · VERGROOT', 1, () => { bg(ctx, 'schema'); circ(ctx, 1380, 520, 210, Z9.bot, Z9.botS, 3); circ(ctx, 1380, 520, 150, '#6E2626'); for (let i = 0; i < 40; i++) circ(ctx, 1380 + (hash(i) - 0.5) * 220, 520 + (hash(i + 5) - 0.5) * 220, 6, rgba('#8E3A3A', 0.8)); });
  naamBij(ctx, 'rood beenmerg', 'daar worden bloedcellen gemaakt', 1380, 545, 1, 'center'); kast(ctx, 'In het midden van het bot zit rood beenmerg.'); meta(ctx, 'T2 · Q04–S05 · DUN BOTJE UIT DE ONDERARM DOORGEKNIPT (SNOEISCHAARTJE, HANDSCHOENEN) · ROOD BEENMERG'); },
 't2b-bot-leeft'(ctx, t) { bg(ctx, 'schema'); const b = botDoorsnede(ctx, 560, 470, 21, {}); naamBij(ctx, 'rood beenmerg', null, b.rood[0] + 70, b.rood[1], 1, 'left'); naamBij(ctx, 'geel beenmerg', null, b.geel[0] + 50, b.geel[1], 1, 'left'); naamBij(ctx, 'kraakbeen', null, b.kraakbeen[0] + 70, b.kraakbeen[1] - 10, 1, 'left'); naamBij(ctx, 'bloedvat', null, b.bloedvat[0] + 30, b.bloedvat[1], 1, 'left');
  zoomCircle(ctx, 1350, 450, 300, b.wand[0], b.wand[1], 'BOTWEEFSEL · VERGROOT', 1, () => botWeefsel(ctx, 1350, 450, 300, {})); naamBij(ctx, 'botcel', null, 1350, 830, 1, 'center'); kast(ctx, 'Er lopen bloedvaten doorheen.'); meta(ctx, 'T2 · S05 · BOT IN LENGTEDOORSNEDE (NIEUW) + BOTWEEFSEL MET BOTCELLEN EN BLOEDVAT'); },
 't3-arm'(ctx, t) { bg(ctx, 'schema');
  const r1 = armAnatomie(ctx, 420, 210, 15, { u: 0.04, e: 0.1, huid: 1, hl: { triceps: 0 } }); const r2 = armAnatomie(ctx, 1100, 210, 15, { u: 0.12, e: 1.6, huid: 1, hl: { biceps: 1 } });
  naamBij(ctx, 'triceps', 'strekspier', r1.triceps[0] - 30, r1.triceps[1], 1, 'right'); naamBij(ctx, 'biceps', 'buigspier', r2.biceps[0] + 30, r2.biceps[1] - 20, 1, 'left', C.goud);
  naamBij(ctx, 'pees', null, r2.bicepsPees[0] + 10, r2.bicepsPees[1] + 60, 1, 'left'); naamBij(ctx, 'spaakbeen', null, r2.onderarm[0] - 40, r2.onderarm[1] + 70, 1, 'left'); naamBij(ctx, 'ellepijp', null, r2.olecranon[0] - 30, r2.olecranon[1] + 40, 1, 'right');
  kast(ctx, 'De biceps is de buigspier. De triceps is de strekspier.'); meta(ctx, 'T3 · S12 · ARM VAN OPZIJ (NIEUW) · VEREENVOUDIGD: GEEN DELTASPIER, GEEN M. BRACHIALIS'); },
 't4-gewricht'(ctx, t) { bg(ctx, 'schema'); const g = gewrichtDoorsnede(ctx, 820, 470, 78, { draai: 0.15 });
  naamBij(ctx, 'gewrichtskop', null, g.kop[0] + 30, g.kop[1], 1, 'left'); naamBij(ctx, 'gewrichtskom', null, g.kom[0] - 20, g.kom[1], 1, 'right'); naamBij(ctx, 'kraakbeen', 'glad, geen bloedvaten', 300, 240, 1, 'left');
  naamBij(ctx, 'gewrichtssmeer', null, g.smeer[0] - 40, g.smeer[1] + 110, 1, 'right'); naamBij(ctx, 'gewrichtskapsel', null, g.kapsel[0] + 160, g.kapsel[1] - 70, 1, 'left'); naamBij(ctx, 'gewrichtsbanden', null, g.banden[0] + 260, g.banden[1] - 50, 1, 'left');
  metaText(ctx, 'SCHEMATISCH · SCHOUDER IN DOORSNEDE', 1500, 860, C.grain, 'center', 24); kast(ctx, 'Allebei zijn ze bekleed met glad, wit kraakbeen.'); meta(ctx, 'T4 · S06 · GEWRICHT IN DOORSNEDE (NIEUW) · TERUG IN S08 ALS KOGELGEWRICHT DAT DRAAIT'); },
 't5-emg'(ctx, t) { bg(ctx, 'schema'); const P = practicum(ctx, 2, { last: 'tas', emg: 0.8, sam: 'staan', scherm: false });
  roundRect(ctx, 1250, 120, 620, 430, 16); shape(ctx, rgba(C.kast, 0.92), C.line, 1.5); const st = ['arm op tafel', 'veertje', '1 boek', '2 boeken', 'tas'], niv = [0.0, 0.08, 0.28, 0.48, 0.8];
  metaText(ctx, 'BICEPS', 1275, 160, C.teal, 'left', 22); emgSpoor(ctx, 1270, 175, 580, 150, { t: 1, rooster: false, geschiedenis: (u) => niv[Math.min(4, Math.floor(u * 5))] });
  metaText(ctx, 'TRICEPS', 1275, 370, C.text2, 'left', 22); emgSpoor(ctx, 1270, 385, 580, 110, { t: 3, rooster: false, niveau: 0.02, kleur: C.line });
  st.forEach((x, i) => text(ctx, x, 1270 + 58 + i * 116, 530, fTekst(22, 600), C.text2, 'center'));
  metaText(ctx, 'DWARSDOORSNEDE BICEPS', 880, 150, C.grain, 'left', 22); metaText(ctx, 'SCHEMATISCH', 880, 180, C.grain, 'left', 22); zoomCircle(ctx, 700, 230, 150, P.plakBiceps[0], P.plakBiceps[1], null, 1, () => { bg(ctx, 'micro'); spierDwars(ctx, 700, 230, 135, { n: 100, eenheden: [{ n: 4, kleur: C.goud }, { n: 7, kleur: C.goud }, { n: 13, kleur: C.goud }, { n: 25, kleur: C.goud }], aan: 4 }); });
  kast(ctx, 'Steeds meer eenheden doen mee, ook de grote.'); meta(ctx, 'T5 · S29 · TWEE KANALEN (BICEPS, TRICEPS) + REFERENTIEPLAKKER · REEKS: ARM OP TAFEL → VEERTJE → BOEKEN → TAS'); },
 't6-stijf-vraag'(ctx, t) { vraagkaartZ9(ctx, 'In de uren na het slachten worden de spieren eerst stijf. Waardoor?', ['het vlees bevriest in de koelcel', 'de spieren drogen uit', 'zonder ATP laten de koppen niet meer los']); meta(ctx, 'T6 · Q23 · VWO · LIJKSTIJFHEID VIA DE KIPPENVLEUGEL; DE STEM ZEGT ÉÉN KEER: BIJ MENSEN HEET DAT LIJKSTIJFHEID'); },
 't7-sarcomeer'(ctx, t) { bg(ctx, 'micro'); const S1 = sarcomeer(ctx, 520, 470, 280, { L: 2.5, kop: 0.1, rijen: 3, dz: 0.55 }); const S2 = sarcomeer(ctx, 1400, 470, 280, { L: 2.0, kop: 0.45, rijen: 3, dz: 0.55 });
  naamBij(ctx, 'actine', null, S1.actine[0] - 40, S1.actYs[0] - 18, 1, 'left', C.teal); naamBij(ctx, 'myosine', null, 520 - 60, S1.ys[0] - 52, 1, 'left', C.oker);
  metaText(ctx, 'ONTSPANNEN', 520, 760, C.grain, 'center', 26); metaText(ctx, 'SAMENGETROKKEN', 1400, 760, C.grain, 'center', 26);
  text(ctx, 'de draden blijven even lang', 960, 830, fTekst(40, 700), C.groen, 'center'); meta(ctx, 'T7 · S17 · STUKJE MYOFIBRIL (NIEUW) · VERGROOT ± 140 000 ×'); },
 't8-eenheid'(ctx, t) { bg(ctx, 'micro'); const D = spierDwars(ctx, 1150, 520, 330, { n: 160, eenheden: [{ n: 6, kleur: C.goud }, { n: 20, kleur: C.teal }], aan: 1 });
  eenheidZenuw(ctx, [250, 300], D.punten(0), C.goud, { dik: 4, puls: 0.5 }); naamBij(ctx, 'motorische zenuwcel', 'één cel, veel uitlopers', 250, 260, 1, 'left');
  naamBij(ctx, 'motorische eenheid', 'zenuwcel + al zijn vezels', 1500, 160, 1, 'left', C.goud); kast(ctx, 'Samen heten ze een motorische eenheid.'); meta(ctx, 'T8 · S24 · DWARSDOORSNEDE SPIER (NIEUW) · VEZELS VAN ÉÉN EENHEID LIGGEN VERSPREID'); },
 't9-spoeltje'(ctx, t) { bg(ctx, 'schema'); for (let k = 0; k < 7; k++) spierVezel(ctx, 520, 540 + k * 36 - (k > 2 ? 0 : 0), 1000, 28, { seed: k + 2, a: 0.8 }); const Sp = spierspoeltje(ctx, 1000, 640, 520, { rek: 0.7, vuur: 0.9, t: 0.3 });
  naamBij(ctx, 'spierspoeltje', 'meet hoe ver en hoe snel de spier rekt', 1330, 760, 1, 'left'); reflexboog(ctx, Sp.zenuw, [320, 220], [640, 560], { t: 0.6 }); naamBij(ctx, 'biceps', 'gewone spiervezels', 520, 520, 1, 'left');
  metaText(ctx, 'VERGROOT · ECHT ± 0,5–1 CM', 1000, 860, C.grain, 'center', 22); kast(ctx, 'Daar schakelt hij direct over op het motorisch neuron.'); meta(ctx, 'T9 · S32 · VWO · SPIERSPOELTJE (NIEUW) · § 19.5 AANGENOMEN, NIET GECONTROLEERD'); }
});

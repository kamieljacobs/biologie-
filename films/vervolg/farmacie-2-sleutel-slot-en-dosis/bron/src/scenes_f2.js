// Wat word jij? · Farmacie · Sleutel, slot en dosis — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Sam met een verzwikte enkel).
// Rode draad: Sam wil extra ibuprofen nemen.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// woonkamer: bank met Sam, tafeltje met strip en glas
function kamer(ctx, t, o = {}) { const v = 860; bankSam(ctx, 560, v, 460, { t, uit: o.uit || 'neutraal', pose: o.pose || 'staan', hold: o.hold || null, koel: o.koel || 0, pijn: o.pijn || 0 });
  tafeltje(ctx, 1330, v, 300, 230); strip(ctx, 1290, v - 262, 0.62, o.leeg == null ? 1 : o.leeg, 1); glas(ctx, 1430, v - 232, 1); }
// grafiekvak H2 (gedeeld door s05 en s07)
const G2 = { x: 240, y: 200, w: 1000, h: 400, xmax: 1000, K: 130, n: 1.5, K2: 13 };
function grafiekH2(ctx, o = {}) { const { a = 1, draw1 = 1, draw2 = 0, dosis = -1, hl400 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { x, y, w, h, xmax, K, n, K2 } = G2;
  grafAssen(ctx, x, y, w, h, 1, 'DOSIS (MG)', 'EFFECT');
  if (hl400 > 0.01) { const px = x + 400 / xmax * w; ctx.save(); ctx.globalAlpha *= hl400; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y + 30); ctx.stroke(); ctx.setLineDash([]); text(ctx, '400', px, y + h + 40, fTekst(28, 800), C.goud, 'center'); ctx.restore(); }
  curve(ctx, x, y, w, h, xmax, K, n, C.goud, draw1, 1, 6); curve(ctx, x, y, w, h, xmax, K2, n, C.teal, draw2, 1, 6);
  if (dosis >= 0) { const [px, py] = curvePunt(x, y, w, h, xmax, K, n, dosis); circ(ctx, px, py, 13, C.goud, '#FFF4D0', 3); }
  ctx.restore(); }
// rij enzymen onder de grafiek; bezet = aantal met een ibuprofenblokje
function enzymRij(ctx, x0, y, n, bezet, a = 1, gap = 128) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const b = clamp(bezet - i, 0, 1); enzym(ctx, x0 + i * gap, y, 0.82, a, ef(b)); } }

Object.assign(SCENES, {
  title(ctx, t) { const d = 520 + 440 * Math.sin(t * 0.5); grafAssen(ctx, 1220, 500, 520, 220, 0.9, 'DOSIS', 'EFFECT'); curve(ctx, 1220, 500, 520, 220, 1000, 130, 1.5, C.goud, 1, 1, 6);
    const [px, py] = curvePunt(1220, 500, 520, 220, 1000, 130, 1.5, d); circ(ctx, px, py, 12, C.goud, '#FFF4D0', 3); enzymRij(ctx, 1290, 830, 4, 4 * effectV(d, 130, 1.5) + 0.3, 1, 130); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const twee = q.on('twee', 1, 0.4);
    kamer(ctx, t, { uit: t > q.at('pijn', 1) ? 'verbaasd' : 'neutraal', pose: twee > 0.5 ? 'vasthouden' : 'staan', pijn: q.on('verzwikt', 1) * (1 - q.on('slikt', 1)) + q.on('pijn', 1), leeg: q.on('slikt', 1) > 0.5 ? 1 : 0,
      hold: twee > 0.5 ? (c, hx, hy) => { tablet(c, hx - 14, hy - 10, 18, twee, 0.3); tablet(c, hx + 16, hy - 4, 18, twee, -0.2); } : null });
    naamBij(ctx, 'Sam', 'enkel verzwikt', 300, 300, q.on('Sam', 1, 0.3));
    chip(ctx, '1 tablet · 400 mg', 1290, 470, C.goud, q.on('vierhonderd', 1), 30);
    klok(ctx, 1640, 300, 70, clamp((t - q.at('uur', 1)) / 1.5, 0, 1), q.on('uur', 1)); regel(ctx, '1 uur later', 1640, 420, q.on('uur', 1), C.text2, 30, 'center', 700);
    tag(ctx, '+ 2', 1000, 330, C.koraal, twee, 'center', 40);
    regel(ctx, '3 tabletten = 3 × zo goed?', 1330, 200, q.on('Helpen', 1), C.goud, 44, 'center', 800); vraagteken(ctx, 1000, 220, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('Ibuprofen', 1, 0.8), K = q.on('Knoeien', 1, 0.8), N = q.on('overdosis', 1, 0.8);
    // fase 1: cel met vier doelwitten
    laag(ctx, 1 - I, () => { antwoord(ctx, 'Antwoord b'); const cx = 960, cy = 540, rx = 560, ry = 290; celRond(ctx, cx, cy, rx, ry, q.on('aangrijpt', 1), t);
      const pR = opMembraan(cx, cy, rx, ry, -Math.PI / 2), pT = opMembraan(cx, cy, rx, ry, -Math.PI / 2 + 0.95), pI = opMembraan(cx, cy, rx, ry, -Math.PI / 2 - 0.95);
      const aR = q.on('receptor', 1, 0.4), aE = q.on('enzym', 1, 0.4), aT = q.on('transporteiwit', 1, 0.4), aI = q.on('ionkanaal', 1, 0.4);
      opPlek(ctx, pR, () => receptor(ctx, 1.25, aR, 0)); naamBij(ctx, 'receptor', '', pR.x + 70, pR.y - 30, aR);
      enzym(ctx, cx - 160, cy + 90, 1.3, aE, 0); naamBij(ctx, 'enzym', '', cx - 160, cy + 200, aE, 'center');
      opPlek(ctx, pT, () => transporteiwit(ctx, 1.25, aT, t * 0.35)); naamBij(ctx, 'transporteiwit', '', pT.x + 80, pT.y + 20, aT);
      opPlek(ctx, pI, () => ionkanaal(ctx, 1.25, aI, t)); naamBij(ctx, 'ionkanaal', '', pI.x - 80, pI.y + 20, aI, 'right');
      metaA(ctx, 'MEESTAL EEN EIWIT', 1700, 160, q.on('eiwit', 1), C.grain, 'right', 24); });
    // fase 2: ibuprofen legt het enzym stil
    laag(ctx, I * (1 - K), () => { const ib = q.at('zitten', 1), stil = q.at('stil', 1), b = ef(clamp((t - ib + 0.6) / 1.2, 0, 1));
      enzym(ctx, 760, 560, 2.6, 1, b); naamBij(ctx, 'enzym', 'maakt pijn- en ontstekingsstoffen', 760, 740, 1, 'center');
      naamBij(ctx, 'ibuprofen', '', 870, 470, b, 'left', C.goud);
      for (let i = 0; i < 9; i++) { const ph = ((t * 0.35 + i / 9) % 1);
        const mag = t - (ph / 0.35) < ib + 0.4; // alleen stofjes die vóór het blokkeren zijn gemaakt
        if (!mag) continue; const w = wander(i, t, 16, 0.6); pijnStofje(ctx, 1020 + ph * 460 + w.x, 470 - ph * 260 + w.y, 1.6, clamp(Math.sin(ph * Math.PI) * 2, 0, 1)); }
      regel(ctx, 'pijn en ontsteking', 1680, 220, q.on('pijn', 1), C.koraal, 32, 'center', 700); chip(ctx, 'ligt stil', 760, 830, C.goud, q.on('stil', 1), 30); });
    // fase 3: agonist en antagonist (herhaling)
    laag(ctx, K * (1 - N), () => { tag(ctx, 'film: Knoeien met de spleet', 960, 210, C.teal, 1, 'center', 28);
      membraanBoog(ctx, 960, 620, 1500, 1); const x1 = 600, x2 = 1320; const ag = ef(clamp((t - q.at('aanzetten', 1) + 0.6) / 1.2, 0, 1)), an = ef(clamp((t - q.at('blokkeren', 1) + 0.6) / 1.2, 0, 1));
      const y1 = boogY(x1, 960, 620), y2 = boogY(x2, 960, 620);
      ctx.save(); ctx.translate(x1, y1); ctx.rotate(boogRot(x1, 960)); receptor(ctx, 1.5, 1, ag > 0.95 ? 0.5 + 0.5 * Math.sin(t * 5) ** 2 : 0); ligand(ctx, 0, -45 - (1 - ag) * 220, 1.5, 'ag', ag > 0 ? 1 : 0); ctx.restore();
      ctx.save(); ctx.translate(x2, y2); ctx.rotate(boogRot(x2, 960)); receptor(ctx, 1.5, 1, 0); ligand(ctx, 0, -45 - (1 - an) * 220, 1.5, 'an', an > 0 ? 1 : 0); ctx.restore();
      hangslot(ctx, x1 + 250, 380, 1, true, KL.morf, q.on('agonist', 1)); hangslot(ctx, x2 + 250, 380, 1, false, KL.nal, q.on('antagonist', 1));
      naamBij(ctx, 'agonist', 'zet aan', x1, 780, q.on('agonist', 1), 'center'); naamBij(ctx, 'antagonist', 'blokkeert', x2, 780, q.on('antagonist', 1), 'center'); });
    // fase 4: naloxon verdringt morfine
    laag(ctx, N, () => { membraanBoog(ctx, 760, 560, 1180, 1); const xs = [420, 760, 1100]; const v = q.at('verdringt', 1);
      xs.forEach((x, i) => { const y = boogY(x, 760, 560), ro = boogRot(x, 760); const nIn = ef(clamp((t - v - i * 0.35 + 0.3) / 1.1, 0, 1)), mIn = q.on('morfine', 1, 0.6);
        ctx.save(); ctx.translate(x, y); ctx.rotate(ro); receptor(ctx, 1.25, 1, nIn < 0.3 ? 0.4 * mIn : 0);
        ligand(ctx, -nIn * 120, -38 - nIn * 200, 1.25, 'ag', mIn * (1 - nIn)); ligand(ctx, 0, -38 - (1 - nIn) * 260, 1.25, 'an', nIn > 0.02 ? 1 : 0); ctx.restore(); });
      naamBij(ctx, 'morfine', '', 360, 520, q.on('morfine', 1) * (1 - ef(clamp((t - v + 0.3) / 0.8, 0, 1))), 'right', KL.morf); naamBij(ctx, 'naloxon', '', 1170, 470, ef(clamp((t - v - 0.7 + 0.3) / 0.8, 0, 1)), 'left', KL.nal);
      ademSpoor(ctx, 1400, 420, 400, 150, ef(clamp((t - q.at('patiënt', 1) + 0.5) / 1.5, 0, 1)), t, q.on('overdosis', 1));
      chip(ctx, 'te traag', 1600, 620, C.koraal, q.on('overdosis', 1) * (1 - q.on('patiënt', 1)), 28); chip(ctx, 'weer gewoon', 1600, 620, C.groen, q.on('gewoon', 1), 28); }); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('stof', 1), t1 = q.at('bij', 2) + 0.3; const u = clamp((t - t0) / (t1 - t0), 0, 1); const d = 1000 * u * u;
    grafiekH2(ctx, { a: q.on('Hoe', 1), draw1: d / 1000, dosis: t < q.at('dosis', 1) ? d : -1, draw2: q.on('tweede', 1, 2), hl400: q.on('vierhonderd', 1) });
    enzymRij(ctx, 330, 790, 8, 8 * effectV(d, G2.K, G2.n) + 0.15, q.on('enzymen', 1), 126); metaA(ctx, 'ENZYMEN IN HET LICHAAM', 280, 690, q.on('enzymen', 1), C.grain, 'left', 22);
    chip(ctx, 'eerst snel omhoog', 1560, 300, C.goud, q.on('snel', 1), 28); chip(ctx, 'bijna alles bezet', 1560, 390, C.goud, q.on('bezet', 2), 28); chip(ctx, 'weinig erbij', 1560, 480, C.koraal, q.on('weinig', 1), 28);
    tag(ctx, 'ibuprofen', 1150, 236, C.goud, q.on('ibuprofen', 1), 'right', 28);
    tag(ctx, 'tweede pijnstiller', 330, 236, C.teal, q.on('tweede', 1), 'left', 28);
    const pa = q.on('tien', 1); if (pa > 0.01) { const yy = G2.y + G2.h - 0.43 * G2.h; const xa = G2.x + G2.K2 / G2.xmax * G2.w + 6, xb = G2.x + G2.K / G2.xmax * G2.w - 6; pijl(ctx, xb, yy, xa, yy, C.teal, pa, 4, 16); regel(ctx, '10 × minder', (xa + xb) / 2 + 150, yy + 60, pa, C.teal, 30, 'center', 800); }
    vraagteken(ctx, 1560, 640, q.on('denk', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const L = q.on('Farmacologen', 1, 0.8);
    laag(ctx, 1 - L, () => { grafiekH2(ctx, { draw2: 1 }); tag(ctx, 'ibuprofen', 1150, 236, C.goud, 1, 'right', 28); tag(ctx, 'tweede pijnstiller', 330, 236, C.teal, 1, 'left', 28);
      const yy = G2.y + G2.h - 0.43 * G2.h, xa = G2.x + G2.K2 / G2.xmax * G2.w + 6, xb = G2.x + G2.K / G2.xmax * G2.w - 6; pijl(ctx, xb, yy, xa, yy, C.teal, q.on('krachtiger', 1), 4, 16); regel(ctx, 'minder milligram nodig', (xa + xb) / 2 + 220, yy + 60, q.on('minder', 1), C.teal, 30, 'center', 800);
      const top = G2.y + G2.h - 0.86 * G2.h * effectV(1000, G2.K, G2.n); const m = q.on('ophoudt', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G2.x, top - 14); ctx.lineTo(G2.x + G2.w + 40, top - 14); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
      chip(ctx, 'krachtiger per milligram', 1560, 330, C.teal, q.on('krachtiger', 1), 28); chip(ctx, 'niet beter', 1560, 420, C.koraal, q.on('beter', 1), 28); chip(ctx, 'maximaal effect: even hoog', 1560, 560, C.text, q.on('maximaal', 1), 28); });
    laag(ctx, L, () => { const a1 = q.on('cellen', 1), a2 = q.on('proefdieren', 1), a3 = q.on('daarna', 1, 0.4);
      schaaltje(ctx, 420, 540, 150, a1, t, C.teal, 1); schaaltje(ctx, 470, 610, 110, a1, t, C.teal, 7); naamBij(ctx, 'cellen', 'in schaaltjes', 440, 720, a1, 'center');
      pijl(ctx, 640, 560, 760, 560, C.line, a2, 4, 16); muisKaal(ctx, 960, 560, 1, a2); naamBij(ctx, 'proefdieren', '', 960, 720, a2, 'center');
      pijl(ctx, 1170, 560, 1290, 560, C.line, a3, 4, 16); persoon(ctx, 'bilal', 1440, 790, 420, { t, a: a3, uit: 'blij', kijk: -1 }); naamBij(ctx, 'mensen', 'vrijwilligers', 1600, 520, a3);
      metaA(ctx, 'FARMACOLOGEN METEN CURVES', 960, 290, q.on('meten', 1), C.grain, 'center', 26); }); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('penicilline', 1, 0.8);
    laag(ctx, 1 - P, () => { const x = 460, y = 220, w = 1000, h = 420; grafAssen(ctx, x, y, w, h, 1, 'DOSIS', 'EFFECT');
      curve(ctx, x, y, w, h, 1000, 150, 2.5, C.groen, 1, 1, 6); curve(ctx, x, y, w, h, 1000, 560, 3, C.koraal, q.on('tweede', 1, 1.5), 1, 6);
      regel(ctx, 'werkzaam', x + 270, y + 30, 1, C.groen, 32, 'center', 800); regel(ctx, 'schadelijk', x + w + 20, y + 120, q.on('schade', 1), C.koraal, 32, 'left', 800);
      const yy = y + h - 0.43 * h, xa = x + 150 / 1000 * w, xb = x + 560 / 1000 * w; const da = q.on('afstand', 1); pijl(ctx, (xa + xb) / 2, yy, xa + 8, yy, C.goud, da, 5, 18); pijl(ctx, (xa + xb) / 2, yy, xb - 8, yy, C.goud, da, 5, 18);
      regel(ctx, 'therapeutische breedte', (xa + xb) / 2, yy + 120, q.on('therapeutische', 1), C.goud, 36, 'center', 800); });
    laag(ctx, P, () => { const pan = (x, nm, Kw, Ks, a, an) => { if (a <= 0.01) return; laag(ctx, a, () => { const y = 260, w = 700, h = 380; grafAssen(ctx, x, y, w, h, 1, 'DOSIS', 'EFFECT'); curve(ctx, x, y, w, h, 1000, Kw, 2.5, C.groen, 1, 1, 5); curve(ctx, x, y, w, h, 1000, Ks, 3, C.koraal, 1, 1, 5);
        const yy = y + h - 0.43 * h, xa = x + Kw / 1000 * w, xb = x + Ks / 1000 * w; pijl(ctx, (xa + xb) / 2, yy, xa + 6, yy, C.goud, an, 4, 14); pijl(ctx, (xa + xb) / 2, yy, xb - 6, yy, C.goud, an, 4, 14); tag(ctx, nm, x + w / 2, 200, C.text, 1, 'center', 32); }); };
      pan(170, 'penicilline', 80, 860, 1, q.on('groot', 1)); chip(ctx, 'brede kloof', 520, 790, C.groen, q.on('groot', 1), 28);
      pan(1060, 'lithium', 330, 520, q.on('lithium', 1), q.on('dicht', 1)); chip(ctx, 'smalle kloof', 1410, 790, C.koraal, q.on('dicht', 1), 28); metaA(ctx, 'BIJ EEN BIPOLAIRE STOORNIS', 1410, 145, q.on('bipolaire', 1), C.grain, 'center', 22);
      vraagteken(ctx, 1410, 520, q.on('denk', 1) * 0.9, 100); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('paracetamol', 1, 0.8);
    laag(ctx, 1 - P, () => { bloedbuis(ctx, 330, 500, 1.3, 1, clamp(t / 1.2, 0, 1)); naamBij(ctx, 'bloedbuisje', 'naar het lab', 330, 760, 1, 'center');
      const v = 0.5 + 0.08 * Math.sin(t * 1.3); spiegelBalk(ctx, 640, 460, 1000, 0.35, 0.65, v, q.on('bloedspiegel', 1), q.on('grenzen', 1)); metaA(ctx, 'BLOEDSPIEGEL LITHIUM', 640, 340, q.on('bloedspiegel', 1), C.grain, 'left', 24); });
    laag(ctx, P, () => { paraDoos(ctx, 620, 500, 1.25, 1, q.on('dag', 1)); lever(ctx, 1380, 500, 1.4, q.on('lever', 1), q.on('ernstig', 1, 1.5)); naamBij(ctx, 'lever', '', 1380, 680, q.on('lever', 1), 'center');
      chip(ctx, 'veel meer dan het maximum', 1380, 300, C.koraal, q.on('maximum', 1), 28); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Prednison', 1, 0.8), Auit = q.on('arts', 1, 0.5), A = clamp((t - q.at('arts', 1) - 0.5) / 0.6, 0, 1);
    laag(ctx, 1 - R, () => { const S = persoon(ctx, 'sam', 330, 860, 600, { t, uit: 'neutraal', kijk: 1, outfit: 'sport' }); const hy = S.heup ? S.heup.y : 600;
      // maag op de romp en gewricht (enkel) gemarkeerd
      const mg = q.on('maag', 1); laag(ctx, mg, () => { ctx.beginPath(); ctx.ellipse(352, hy - 95, 36, 26, -0.4, 0, 6.283); shape(ctx, rgba('#E39A9A', 0.85), '#F4C0C0', 3); });
      const gw = q.on('slot', 1); laag(ctx, gw, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(352, 820, 34, 0, 6.283); ctx.stroke(); });
      inzoom(ctx, 860, 330, 170, gw, C.goud, () => { const b = q.on('remt', 1, 1); enzym(ctx, 860, 360, 1.7, 1, b); });
      naamBij(ctx, 'in het gewricht', 'pijn en ontsteking', 1050, 250, gw);
      inzoom(ctx, 1240, 620, 230, mg, '#E39A9A', () => { const dun = ef(clamp((t - q.at('lang', 1)) / 2.5, 0, 1)), sch = ef(clamp((t - q.at('beschadigd', 1)) / 1.2, 0, 1)); maagwand(ctx, 1010, 660, 460, (1 - 0.85 * dun) * q.on('beschermen', 1, 1), sch, t);
        enzym(ctx, 1240, 735, 1.0, 1, q.on('maag', 1, 1)); });
      naamBij(ctx, 'in de maagwand', 'beschermlaag', 1500, 470, mg);
      regel(ctx, 'hetzelfde slot, een andere plek', 1240, 170, gw, C.goud, 36, 'center', 800); });
    laag(ctx, R * (1 - Auit), () => { steroid(ctx, 230, 280, 34, C.goud, 1, true); naamBij(ctx, 'prednison', '', 300, 380, 1, 'center');
      steroid(ctx, 230, 510, 34, C.paars, q.on('cortisol', 1), false); naamBij(ctx, 'cortisol', 'film: Stress', 300, 610, q.on('cortisol', 1), 'center');
      const cr = q.on('receptor', 1), al = q.on('cellen', 1, 1.2); for (let i = 0; i < 8; i++) { const cx = 720 + (i % 4) * 230, cy = 290 + Math.floor(i / 4) * 230; cortCel(ctx, cx, cy, 95, cr * clamp(i < 1 ? 1 : al * 8 - (i - 1), 0, 1), ef(clamp((t - q.at('cellen', 1) - i * 0.12) / 0.6, 0, 1)), t); }
      metaA(ctx, 'RECEPTOR IN BIJNA ELKE CEL', 1065, 160, cr, C.grain, 'center', 24);
      suikerOmhoog(ctx, 760, 760, q.on('bloedsuiker', 1), q.on('stijgen', 1, 1)); regel(ctx, 'bloedsuiker', 800, 850, q.on('bloedsuiker', 1), C.text, 28, 'center', 700);
      huidLagen(ctx, 1040, 700, 200, q.on('dunner', 1, 1.5), q.on('huid', 1)); regel(ctx, 'huid', 1140, 850, q.on('huid', 1), C.text, 28, 'center', 700);
      bot(ctx, 1500, 760, 1.0, q.on('brozer', 1, 1.2), q.on('botten', 1)); regel(ctx, 'bot', 1500, 850, q.on('botten', 1), C.text, 28, 'center', 700); });
    laag(ctx, A, () => { weegschaal(ctx, 960, 480, 1.2, 0.3 * ef(clamp((t - q.at('kost', 1)) / 1.2, 0, 1)) - 0.3 * q.on('levert', 1), 1, q.on('levert', 1) > 0.5 ? 'opbrengst' : '', q.on('kost', 1) > 0.5 ? 'kosten' : '');
      metaA(ctx, 'DE ARTS WEEGT AF', 960, 220, 1, C.grain, 'center', 26); }); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); kamer(ctx, t, { uit: 'blij', koel: q.on('koelt', 1), leeg: q.on('één', 1) > 0.5 ? 2 : 1 });
    naamBij(ctx, 'Sam', 'koelt zijn enkel', 300, 300, 1 - q.on('farmacodynamiek', 1)); klok(ctx, 1640, 300, 70, 6 * clamp((t - q.at('zes', 1)) / 2, 0, 1), q.on('zes', 1)); regel(ctx, 'na 6 uur: 1 tablet', 1640, 420, q.on('zes', 1), C.text2, 30, 'center', 700);
    laag(ctx, q.on('medicijn', 1), () => { grafAssen(ctx, 1500, 560, 300, 140, 1, '', ''); curve(ctx, 1500, 560, 300, 140, 1000, 130, 1.5, C.goud, 1, 1, 4); }); regel(ctx, 'farmacodynamiek', 1340, 200, q.on('farmacodynamiek', 1), C.goud, 48, 'center', 800); },
  s13(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 330, 860, 470, { t, outfit: 'practicum', uit: 'blij', pose: 'wijs', kijk: 1, a: q.on('Farmacologen', 1, 0.3) });
    ctx.fillStyle = '#3A4458'; ctx.fillRect(480, 700, 760, 24); schaaltje(ctx, 620, 670, 90, 1, t, C.teal, 2); schaaltje(ctx, 850, 670, 90, q.on('aangrijpt', 1), t, C.paars, 5); schaaltje(ctx, 1080, 670, 90, q.on('dosis', 1), t, C.groen, 9);
    laag(ctx, q.on('dosis', 1), () => { grafAssen(ctx, 660, 260, 460, 230, 1, 'DOSIS', ''); curve(ctx, 660, 260, 460, 230, 1000, 130, 1.5, C.groen, 1, 1, 5); curve(ctx, 660, 260, 460, 230, 1000, 620, 3, C.koraal, q.on('schaden', 1, 1), 1, 5); });
    tag(ctx, 'farmacie', 1560, 330, C.teal, q.on('farmacie', 1), 'center', 34); regel(ctx, 'o.a. apotheker', 1560, 400, q.on('farmacie', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'farmaceutische wetenschappen', 1560, 540, C.teal, q.on('wetenschappen', 1), 'center', 34); regel(ctx, 'geneesmiddelonderzoek', 1560, 610, q.on('wetenschappen', 1), C.text2, 28, 'center', 600);
    metaA(ctx, 'UNIVERSITEIT', 1560, 720, q.on('universiteit', 1), C.grain, 'center', 26); }
});

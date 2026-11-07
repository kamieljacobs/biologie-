// Zenuwstelsel 3 · De spleet 2.0 — scènes (lichte remake, 29 okt 2026). Cues via q.on(woord, n, duur) op de woordtijden van Roos.
const SX = 960, SY = 470; // standaardplek van de grote synaps
function chips(ctx, items, x, y, gap = 92, px = 34) { items.forEach(([s, a, col], i) => tag(ctx, s, x, y + i * gap, col || Z3.imp, a, 'left', px)); }
function vraagRechts(ctx, t, fn) { ctx.save(); ctx.beginPath(); ctx.rect(1060, 90, 820, 790); ctx.clip(); fn(); ctx.restore(); }
function optZicht(q, woorden) { return woorden.map(([w, n]) => q.on(w, n || 1, 0.4)); }

Object.assign(SCENES, {
  title(ctx, t) { const f = (t * 0.11) % 1; synapsZ3(ctx, 1460, 520, 0.95, { fase: f, t, postPuls: (f - 0.78) / 0.2 }); },

  // ---------- Cold open: langs de bakker
  s00(ctx, t, q) { straat(ctx); const B = bakkerij(ctx, 90, 820, 560, 620);
    // Daan loopt naar links langs de bakker en blijft staan (zijaanzicht, castboek-gang)
    const tStop = 2.6, x0 = 1180, h = 470; const v = gangSnelheid('daan', h, 'loop'); const xs = x0 - v * tStop;
    const loopt = t < tStop; const R = loopt ? persoon(ctx, 'daan', x0, 820, h, { zij: true, kijk: -1, gang: 'loop', vooruit: true, t }) : persoon(ctx, 'daan', xs, 820, h, { zij: true, kijk: -1, t, uit: t > q.at('Vers') ? 'blij' : 'neutraal' });
    const hd = R.hoofd || { x: xs, y: 420, r: 30 }; const neus = [hd.x - hd.r * 1.05, hd.y + hd.r * 0.15];
    geur(ctx, B.deur, neus, t, ramp(t, 0.3, 1.2) * UIT(t, q.at('Maar'), 0.8));
    // zoomcirkel náást het hoofd: neus → zenuwcellen → hersenen
    const z = q.on('bericht', 1, 0.7); if (z > 0.01) { const cx = 1440, cy = 380, r = 330;
      zoomCircle(ctx, cx, cy, r, hd.x + hd.r * 0.2, hd.y, 'van neus naar hersenen', z, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
        const pu = sleutel(t, [[q.at('neus'), 0], [q.at('hersenen') + 0.3, 1]]); const pu2 = sleutel(t, [[q.at('impuls'), 0], [q.at('elektrisch') + 0.6, 0.62]]);
        const G = ketting(ctx, cx - 280, cy + 40, cx + 150, cy + 40, 3, { s: 0.9, puls: t < q.at('Maar') ? (pu > 0 && pu < 1 ? pu : -1) : (pu2 > 0 && pu2 < 0.62 ? pu2 : -1) });
        naamBij(ctx, 'neus', null, cx - 215, cy + 150, q.on('neus', 1, 0.4), 'center');
        breinVoor(ctx, cx + 238, cy + 22, 1.05, { a: q.on('hersenen', 1, 0.5) }); naamBij(ctx, 'hersenen', null, cx + 238, cy + 140, q.on('hersenen', 1, 0.4), 'center');
        if (G[0]) { ring(ctx, G[0][0], G[0][1], 34, q.on('spleet', 1, 0.4)); naamBij(ctx, 'spleet', null, G[0][0], G[0][1] - 52, q.on('spleet', 1, 0.4), 'center', C.goud); vraagteken(ctx, G[0][0] + 6, G[0][1] + 150, q.on('Hoe', 1, 0.4), 90); }
        tag(ctx, 'impuls = elektrisch', cx, cy - 170, Z3.imp, q.on('elektrisch', 1, 0.4), 'center', 34); }); } },

  // ---------- vragen (gesproken): links de vraag, rechts een klein beeld
  q1(ctx, t, q) { bg(ctx, 'schema'); vraagLinks(ctx, 'Twee zenuwcellen geven een bericht door. Hoe zitten ze aan elkaar?', ['Aan elkaar vastgegroeid, als één lange draad', 'Ze raken elkaar aan, membraan tegen membraan', 'Er zit een smalle spleet tussen'], optZicht(q, [['vastgegroeid'], ['raken'], ['smalle']]));
    vraagRechts(ctx, t, () => { zenuwcel(ctx, 1230, 330, { s: 1.1, col: Z3.cel, naar: [1560, 560], seed: 3, takken: 5 }); zenuwcel(ctx, 1700, 690, { s: 1.1, col: Z3.cel, naar: [1980, 760], seed: 6, takken: 6 }); ring(ctx, 1590, 600, 70, ramp(t, 3.2, 0.5)); vraagteken(ctx, 1590, 630, ramp(t, 3.3, 0.5), 80); }); },
  q2(ctx, t, q) { bg(ctx, 'schema'); vraagLinks(ctx, 'Wat gaat er precies door de spleet?', ['De impuls zelf, als een vonkje', 'Natriumionen uit de eerste cel', 'Moleculen neurotransmitter'], optZicht(q, [['impuls'], ['Natriumionen'], ['moleculen']]));
    vraagRechts(ctx, t, () => { synapsZ3(ctx, 1470, 480, 0.82, { fase: 0.18, t, nt: false, axon: 60 }); vraagteken(ctx, 1470, 520, ramp(t, 1.6, 0.5), 90); }); },
  q3(ctx, t, q) { bg(ctx, 'schema'); vraagLinks(ctx, 'Kan een synaps een zenuwcel ook stiller maken?', ['Nee, een synaps geeft altijd een bericht door', 'Ja, dat hangt af van neurotransmitter en receptor', 'Alleen als er heel veel stof tegelijk komt'], optZicht(q, [['Nee'], ['hangt'], ['alleen']]));
    vraagRechts(ctx, t, () => { zenuwcel(ctx, 1480, 480, { s: 2.1, col: Z3.cel, naar: [1880, 760], seed: 5, takken: 6 }); knopOp(ctx, 1480, 480, 64, 3.6, { sz: 0.7, teken: '?', kleur: C.goud, lab: true }); }); },
  q4(ctx, t, q) { bg(ctx, 'schema'); vraagLinks(ctx, 'De neurotransmitter blijft in de spleet hangen, aan de receptoren. Wat gebeurt er met de volgende cel?', ['Die blijft impulsen afvuren', 'Die reageert één keer en dan is het klaar', 'Die raakt beschadigd'], optZicht(q, [['afvuren'], ['reageert'], ['beschadigd']]));
    vraagRechts(ctx, t, () => { synapsZ3(ctx, 1470, 470, 0.82, { fase: 0.8, t, recVast: ramp(t, 1, 0.6), ionen: false }); vraagteken(ctx, 1470, 760, ramp(t, 4.3, 0.5), 90); }); },
  q5(ctx, t, q) { bg(ctx, 'schema'); vraagLinks(ctx, 'Kan een bericht via een synaps ook terug, van de tweede cel naar de eerste?', ['Ja, een synaps werkt in twee richtingen', 'Nee, alleen als de spleet heel smal is', 'Nee, nooit'], optZicht(q, [['Ja'], ['alleen'], ['nooit']]));
    vraagRechts(ctx, t, () => { synapsZ3(ctx, 1420, 480, 0.82, { fase: 0, t }); pijl(ctx, 1720, 260, 1720, 680, Z3.imp, ramp(t, 0.8, 0.5), 6, 22); pijl(ctx, 1790, 680, 1790, 260, C.text2, ramp(t, 2, 0.5), 6, 22); vraagteken(ctx, 1810, 470, ramp(t, 2.2, 0.5), 70); }); },

  // ---------- Hoofdstuk 1 · De aansluiting
  a1(ctx, t, q) { bg(ctx, 'schema'); const tz = q.at('zoomen'); const z = ramp(t, tz, 1.4);
    // overzicht: twee zenuwcellen, de camera zoomt in op het eindknopje
    if (z < 0.99) { ctx.save(); const fx = 1030, fy = 520, k = 1 + 7 * z * z; ctx.translate(fx, fy); ctx.scale(k, k); ctx.translate(-fx, -fy); ctx.globalAlpha *= 1 - ramp(t, tz + 0.7, 0.7);
      zenuwcel(ctx, 520, 250, { s: 1.4, col: Z3.cel, naar: [1010, 500], seed: 3, takken: 6 }); zenuwcel(ctx, 1260, 760, { s: 1.4, col: Z3.cel, naar: [1800, 900], seed: 6, takken: 6 });
      ctx.restore(); naamBij(ctx, 'zenuwcel', null, 520, 140, UIT(t, tz, 0.4) * ramp(t, 0.3, 0.5), 'center'); naamBij(ctx, 'volgende zenuwcel', null, 1300, 640, UIT(t, tz, 0.4) * ramp(t, 0.3, 0.5), 'left'); }
    const s = ramp(t, tz + 0.7, 0.8); if (s < 0.01) return;
    const hi = []; const tBl = q.at('blaasjes'), tRec = q.at('receptoren'); if (t > tBl && t < q.at('Aan')) hi.push('blaasje'); if (t > tRec && t < q.at('Onthoud')) hi.push('receptor'); if (t > q.at('niet') && t < q.at('Dit')) hi.push('spleet');
    if (t > q.at('drie')) { if (t > q.at('blaasjes', 2) && t < q.at('spleet', 3)) hi.push('blaasje'); if (t > q.at('spleet', 3) && t < q.at('receptoren', 2)) hi.push('spleet'); if (t > q.at('receptoren', 2)) hi.push('receptor'); }
    const A = synapsZ3(ctx, SX - 120, SY, 1.18, { a: s, fase: 0, t, hi, axon: 60, ionen: false });
    const uitL = UIT(t, q.at('Onthoud'), 0.5);
    naamBij(ctx, 'eindknopje', 'van de eerste cel', SX - 120 - 330, SY - 250, s * q.on('eindknopje', 1, 0.4) * uitL, 'right');
    naamBij(ctx, 'dendriet', 'van de volgende cel', SX - 120 - 330, SY + 230, q.on('dendriet', 1, 0.4) * uitL, 'right');
    // spleet: maatlijn rechts
    const ms = q.on('spleet', 1, 0.4) * uitL; if (ms > 0.01) { ctx.save(); ctx.globalAlpha *= ms; const xx = SX - 120 + 345, y0 = SY - 10, y1 = SY + 30; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx - 14, y0); ctx.lineTo(xx + 14, y0); ctx.moveTo(xx - 14, y1); ctx.lineTo(xx + 14, y1); ctx.moveTo(xx, y0); ctx.lineTo(xx, y1); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'synapsspleet', '± 20 nanometer', xx + 30, SY + 2, ms, 'left', C.goud); }
    tag(ctx, '50.000 spleten naast elkaar = 1 mm', SX + 640, SY + 140, C.goud, q.on('vijftigduizend', 1, 0.4) * UIT(t, q.at('Dit'), 0.5), 'center', 30);
    // synaps = het geheel: haak links
    const hs = q.on('synaps', 1, 0.4) * UIT(t, q.at('kant'), 0.5); if (hs > 0.01) { ctx.save(); ctx.globalAlpha *= hs; const xx = SX - 120 - 380; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx + 20, SY - 330); ctx.lineTo(xx, SY - 330); ctx.lineTo(xx, SY + 340); ctx.lineTo(xx + 20, SY + 340); ctx.stroke(); ctx.restore(); naamBij(ctx, 'synaps', 'eindknopje + spleet + volgende cel', xx - 20, SY + 10, hs, 'right', C.goud); }
    naamBij(ctx, 'vóór de spleet', null, SX - 120 + 290, SY - 220, q.on('kant', 1, 0.4) * UIT(t, q.at('In'), 0.5), 'left');
    naamBij(ctx, 'blaasjes', null, SX - 120 + 300, SY - 150, q.on('blaasjes', 1, 0.4) * uitL, 'left');
    naamBij(ctx, 'neurotransmitter', 'de stof in elk blaasje', SX - 120 + 300, SY - 80, q.on('neurotransmitter', 1, 0.4) * uitL, 'left', Z3.nt);
    naamBij(ctx, 'receptoren', 'eiwitten in het membraan', SX - 120 + 300, SY + 110, q.on('receptoren', 1, 0.4) * uitL, 'left');
    // receptor: de stof past precies
    const zr = q.on('vorm', 1, 0.5) * UIT(t, q.at('Onthoud'), 0.5); if (zr > 0.01) { const rp = A.receptoren[2]; zoomCircle(ctx, 1640, 560, 170, rp[0], rp[1], 'past precies', zr, () => { ctx.fillStyle = Z3.post; ctx.fillRect(1470, 560, 340, 200); ctx.strokeStyle = C.er; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1470, 570); ctx.lineTo(1810, 570); ctx.stroke();
        ctx.fillStyle = Z3.rec; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(1640 + sd * 30, 575, 22, 62, 0, 0, 6.283); ctx.fill(); } const d = ramp(t, q.at('stof', 2) - 0.2, 0.8); ntMol(ctx, 1640, lerp(430, 528, d), 18); }); }
    // de drie woorden
    const u3 = q.on('drie', 1, 0.4); chips(ctx, [['blaasjes', u3 * Math.max(0.35, q.on('blaasjes', 2, 0.3)), C.goud], ['spleet', u3 * Math.max(0.35, q.on('spleet', 3, 0.3)), C.goud], ['receptoren', u3 * Math.max(0.35, q.on('receptoren', 2, 0.3)), C.goud]], SX + 430, SY - 160, 110, 40); },

  // ---------- Hoofdstuk 2 · Oversteken
  s21(ctx, t, q) { bg(ctx, 'schema');
    const F = sleutel(t, [[q.at('komt') - 0.2, 0], [q.at('eindknopje'), 0.17], [q.at('stopt'), 0.2], [q.at('kanaaltjes'), 0.2], [q.at('calcium', 2) + 0.8, 0.3], [q.at('blaasjes'), 0.3], [q.at('versmelten') + 0.4, 0.46], [q.at('spleet') - 0.2, 0.5], [q.at('steken') + 0.5, 0.65], [q.at('receptoren'), 0.66], [q.at('open', 2) + 0.4, 0.8]]);
    const pp = sleutel(t, [[q.at('nieuwe'), 0], [q.at('overgestoken') + 0.2, 1]]);
    const hi = t > q.at('kanaaltjes') && t < q.at('sein') ? 'ca' : (t > q.at('receptoren') && t < q.at('Ionen') ? 'receptor' : null);
    const A = synapsZ3(ctx, SX - 140, SY + 20, 1.12, { fase: F, t, axon: 90, hi, postPuls: pp > 0.001 && pp < 1 ? pp : -1 });
    const L = SX - 140 + 330, uit = (w, n = 1) => UIT(t, q.at(w, n), 0.4);
    naamBij(ctx, 'impuls', 'elektrisch', L, SY - 280, q.on('impuls', 1, 0.3) * uit('kanaaltjes'), 'left', Z3.imp);
    tag(ctx, 'stopt hier', SX - 140, SY - 360, C.koraal, q.on('stopt', 1, 0.3) * uit('kanaaltjes'), 'center', 32);
    naamBij(ctx, 'calcium (Ca²⁺)', 'kanaaltjes gaan open', L, SY - 120, q.on('calcium', 1, 0.4) * uit('blaasjes'), 'left');
    naamBij(ctx, 'blaasjes versmelten', 'met het membraan', L, SY - 120, q.on('blaasjes', 1, 0.4) * uit('Duizenden'), 'left');
    naamBij(ctx, 'neurotransmitter', 'steekt de spleet over', L, SY - 40, q.on('Duizenden', 1, 0.4) * uit('Aan'), 'left', Z3.nt);
    naamBij(ctx, 'receptor bezet', 'kanaaltje open', L, SY + 140, q.on('receptoren', 1, 0.4) * uit('Ionen'), 'left');
    naamBij(ctx, 'ionen naar binnen', 'het membraan verandert', L, SY + 140, q.on('Ionen', 1, 0.4) * uit('nieuwe'), 'left');
    naamBij(ctx, 'nieuwe impuls', 'in de volgende cel', L, SY + 230, q.on('nieuwe', 1, 0.3) * uit('Niet'), 'left', Z3.imp);
    // tijdbalk 0–1 ms
    const tb = q.on('duizendste', 1, 0.4) * uit('receptoren'); if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; const x = 1360, y = 150, w = 420; metaText(ctx, 'tijd', x, y - 20, C.grain, 'left', 28); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, 26); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fillRect(x, y, w * 0.8 * ramp(t, q.at('duizendste'), 1.2), 26);
      metaText(ctx, '0', x, y + 64, C.text2, 'left', 28); metaText(ctx, '1 ms', x + w, y + 64, C.text2, 'right', 28); ctx.restore(); }
    tag(ctx, 'niet als stroom', 1560, 300, C.koraal, q.on('stroom', 1, 0.3), 'center', 36); kruis(ctx, 1560, 278, 120, q.on('stroom', 1, 0.3) * 0.0, C.koraal);
    if (q.on('stroom', 1, 0.3) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('stroom', 1, 0.3); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1440, 280); ctx.lineTo(1680, 280); ctx.stroke(); ctx.restore(); }
    tag(ctx, 'als stof', 1560, 400, C.groen, q.on('stof', 1, 0.3), 'center', 40); },

  // antwoord op vraag 2: elektrisch → chemisch → elektrisch (synaps op zijn kant, bericht van links naar rechts)
  a2(ctx, t, q) { bg(ctx, 'schema'); const cx = 980, cy = 400, sc = 1.1;
    const F = sleutel(t, [[q.at('impuls') - 0.3, 0.02], [q.at('stopt') + 0.2, 0.2], [q.at('oversteekt'), 0.3], [q.at('blaasjes') + 0.5, 0.62], [q.at('ontstaat'), 0.8]]);
    const pp = sleutel(t, [[q.at('impuls', 2) - 0.2, 0], [q.at('impuls', 2) + 1.2, 1]]);
    synapsZ3(ctx, cx, cy, sc, { fase: F, t, rot: -Math.PI / 2, axon: 260, postPuls: pp > 0.001 && pp < 1 ? pp : -1 });
    // drie banden onder het beeld: knop+axon | spleet | volgende cel
    const y = 760, B = [[cx - 600 * sc, cx - 14 * sc, 'elektrisch', Z3.imp, 'Elektrisch', 1, 0], [cx - 10 * sc, cx + 24 * sc, 'chemisch', Z3.nt, 'chemisch', 1, 0], [cx + 30 * sc, cx + 310 * sc, 'elektrisch', Z3.imp, 'elektrisch', 2, 0]];
    B.forEach(([x0, x1, s2, col, w, n]) => { const a = q.on(w, n, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y - 20); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y - 20); ctx.stroke(); ctx.restore(); text(ctx, s2, (x0 + x1) / 2, y + (s2 === 'chemisch' ? 110 : 56), fTekst(40, 700), col, 'center'); });
    const uitL = UIT(t, q.at('Elektrisch'), 0.4);
    naamBij(ctx, 'impuls stopt', 'bij het eindknopje', cx - 420, cy - 250, q.on('stopt', 1, 0.4) * uitL, 'center', Z3.imp);
    naamBij(ctx, 'stof uit de blaasjes', 'steekt over', cx, cy + 270, q.on('oversteekt', 1, 0.4) * uitL, 'center', Z3.nt);
    naamBij(ctx, 'nieuwe impuls', null, cx + 330, cy - 250, q.on('impuls', 2, 0.4) * uitL, 'center', Z3.imp); },

  // ---------- Hoofdstuk 3 · Gas en rem
  a3(ctx, t, q) { bg(ctx, 'schema'); const cx = 600, cy = 450, sc = 2.6, R = 30 * sc + 6;
    const tS = q.at('vertrekt'), tSom = q.at('opgeteld');
    const exc = q.at('Natrium') + 0.3, rem = q.at('Chloride') + 0.3;
    const V = tt => { let v = -70 + psp(tt, exc, 13) + psp(tt, rem, -9);
      if (tt > tSom - 1.2) v += sleutel(tt, [[tSom - 1.2, 0], [tSom + 0.8, 13], [tS - 0.3, 16]]) * (tt < tS + 0.3 ? 1 : Math.exp(-(tt - tS - 0.3) / 0.6));
      return v + spike(tt, tS); };
    const puls = sleutel(t, [[tS, 0], [tS + 1.6, 1]]);
    zenuwcel(ctx, cx, cy, { s: sc, col: Z3.cel, naar: [cx + 480, cy + 380], seed: 7, takken: 5, puls: t > tS && puls < 1 ? puls : -1, pulsCol: Z3.imp });
    const u = q.on('synapsen', 1, 0.5), uitK = UIT(t, q.at('duizenden'), 0.6);
    const K1 = knopOp(ctx, cx, cy, R, -2.5, { a: u, teken: '+', kleur: Z3.exc, nt: q.on('binding', 1, 0.4), ionIn: t > q.at('Natrium') && t < q.at('Deze') ? (t - q.at('Natrium')) / 3 : 0, ionS: 'Na⁺', t, sz: 1.2 });
    const K2 = knopOp(ctx, cx, cy, R, 2.45, { a: u, teken: '−', kleur: Z3.rem, nt: q.on('tweede', 1, 0.4), ionIn: t > q.at('Chloride') && t < q.at('Deze', 2) ? (t - q.at('Chloride')) / 3 : 0, ionS: 'Cl⁻', t, sz: 1.2 });
    if (K1.lab) { naamBij(ctx, 'exciterend', 'natrium naar binnen', K1.lab[0] - 40, K1.lab[1] - 50, q.on('exciterend', 1, 0.4) * uitK, 'right', Z3.exc); naamBij(ctx, 'remmend', 'chloride naar binnen', K2.lab[0] - 40, K2.lab[1] + 70, q.on('remmend', 1, 0.4) * uitK, 'right', Z3.rem); }
    tag(ctx, 'hangt af van neurotransmitter én receptor', 1490, 820, C.goud, q.on('hangt', 1, 0.4) * UIT(t, q.at('duizenden'), 0.5), 'center', 30);
    knopjes(ctx, cx, cy, R + 4, 60, q.on('duizenden', 1, 0.8), t);
    tag(ctx, 'alles wordt opgeteld', 1490, 820, C.goud, q.on('opgeteld', 1, 0.4) * UIT(t, q.at('Daarom'), 0.5), 'center', 30);
    // begin van het axon: hier valt de beslissing
    const dir = Math.atan2(380, 480), ax = [cx + Math.cos(dir) * 50 * sc, cy + Math.sin(dir) * 50 * sc]; const ab = q.on('begin', 1, 0.4) * UIT(t, q.at('Daarom'), 0.5);
    ring(ctx, ax[0], ax[1], 32, ab); naamBij(ctx, 'begin van het axon', 'hier: drempel gehaald?', ax[0] + 40, ax[1] + 80, ab, 'left', C.goud);
    naamBij(ctx, 'impuls vertrekt', null, cx + 380, cy + 420, q.on('vertrekt', 1, 0.4) * UIT(t, q.at('Zo'), 0.4), 'left', Z3.imp);
    // meter rechts
    const ma = q.on('Natrium', 1, 0.6) * UIT(t, q.at('Daarom'), 0.6); potMeter(ctx, 1200, 190, 600, 470, V, t, { a: ma, venster: 12, vmin: -85, vmax: 40 });
    tag(ctx, 'zo niet: het blijft stil', 1490, 820, C.text2, q.on('Zo', 1, 0.4) * UIT(t, q.at('Daarom'), 0.4), 'center', 30);
    // slot: vaste draad tegenover synaps
    const sl = q.on('Daarom', 1, 0.6); if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; roundRect(ctx, 1150, 170, 680, 520, 16); shape(ctx, rgba(C.bgMicro, 0.7), rgba(C.line, 0.5), 1.5); ctx.restore();
      ctx.save(); ctx.globalAlpha *= sl; text(ctx, 'vaste draad', 1210, 260, fTekst(40, 700), C.text2, 'left'); ctx.restore(); ctx.save(); ctx.globalAlpha *= q.on('draad', 1, 0.4); ctx.strokeStyle = C.text2; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1210, 310); ctx.lineTo(1770, 310); ctx.stroke(); ctx.restore();
      tag(ctx, 'geeft alleen door', 1210, 400, C.text2, q.on('alleen', 1, 0.4), 'left', 32);
      ctx.save(); ctx.globalAlpha *= q.on('synaps', 3, 0.4); text(ctx, 'synaps', 1210, 520, fTekst(40, 700), C.text, 'left'); ctx.restore();
      tag(ctx, 'versterken', 1210, 610, Z3.exc, q.on('versterken', 1, 0.3), 'left', 34); tag(ctx, 'remmen', 1440, 610, Z3.rem, q.on('remmen', 1, 0.3), 'left', 34); tag(ctx, 'optellen', 1620, 610, C.goud, q.on('optellen', 1, 0.3), 'left', 34); } },

  // ---------- Hoofdstuk 4 · Opruimen
  a4(ctx, t, q) { bg(ctx, 'schema'); const x = 800, y = SY + 10, s = 1.1;
    const t1 = q.at('Eén'), t2 = q.at('Twee'), t3 = q.at('Drie', 2), tS = q.at('schoon');
    const vast = 1 - ramp(t, tS - 2.6, 1.0);
    const vuur = t < t1 ? [((t * 0.8) % 1), ((t * 0.8 + 0.5) % 1)] : -1;
    const A = synapsZ3(ctx, x, y, s, { fase: 0.6, t, nt: false, recVast: vast, postPuls: vuur, hi: t > t2 && t < t3 ? 'transporter' : null });
    const W2 = A.W, postY = A.recY, RX = [-150, -90, -30, 30, 90, 150];
    // neurotransmitter: 18 moleculen in de spleet, aan de receptoren; daarna drie manieren van opruimen
    for (let k = 0; k < 18; k++) { const rx = RX[k % 6] + (k >= 6 ? (hash(k) - 0.5) * 50 : 0); let px = rx, py = k < 6 ? postY(rx) - 15 : lerp(2, 16, hash(k * 5)) + Math.sin(t * 2.5 + k) * 3;
      const lot = k % 3; // 0 = enzym, 1 = heropname, 2 = wegdrijven
      let al = 1, half = 0;
      if (lot === 0) { const u = ramp(t, t1 + 0.9 + (k % 6) * 0.35, 0.6); half = u; if (u > 0) { px += 0; } al = 1 - ramp(t, t1 + 2.2 + (k % 6) * 0.35, 1.2); }
      if (lot === 1) { const u = ramp(t, t2 + 0.6 + (k % 6) * 0.25, 1.4); const tr = px > 0 ? 130 : -130; px = lerp(px, tr, u); py = lerp(py, lerp(-10, -70, ramp(t, t2 + 1.6 + (k % 6) * 0.25, 0.6)), u); al = 1 - ramp(t, t2 + 2.2 + (k % 6) * 0.25, 0.6); }
      if (lot === 2) { const u = ramp(t, t3 + 0.5 + (k % 6) * 0.2, 1.6); px = lerp(px, px > 0 ? 420 : -420, u); py = lerp(py, 0, u); al = 1 - ramp(t, t3 + 1.4 + (k % 6) * 0.2, 0.8); }
      if (al <= 0.01) continue; const [X, Y] = W2(px, py);
      if (half > 0.05) { ntMol(ctx, X - 7 * half * s, Y, 3.4 * s, al); ntMol(ctx, X + 7 * half * s, Y + 3, 3.4 * s, al); } else ntMol(ctx, X, Y, 4.6 * s, al, k === 0 && t < t1); }
    // enzym in de spleet
    const ea = q.on('enzym', 1, 0.5) * UIT(t, t2, 0.6); if (ea > 0.01) for (const ex of [-120, 60]) { const [X, Y] = W2(ex, 12); enzymKluwen(ctx, X, Y + 8, 34, { a: ea, an: -1.57, knip: ((t - t1 - 0.8) * 0.7) % 1 > 0 ? ((t - t1 - 0.8) * 0.7) % 1 : 0, bind: 0.6, sub: null }); }
    const Lx = x + 360;
    naamBij(ctx, 'receptoren blijven bezet', 'kanalen open', Lx, y + 120, q.on('receptoren', 1, 0.4) * UIT(t, q.at('drie'), 0.4), 'left');
    naamBij(ctx, 'de cel blijft vuren', null, Lx, y + 240, q.on('vuren', 1, 0.4) * UIT(t, q.at('drie'), 0.4), 'left', Z3.imp);
    // drie manieren (kaartjes rechts)
    const K = [['1', 'enzym knipt de stof', 'Eén', 1, t2], ['2', 'heropname in het eindknopje', 'Twee', 1, t3], ['3', 'de stof drijft weg', 'Drie', 2, tS]];
    const kx = 1340, ky = 230; const m = q.on('drie', 1, 0.4);
    K.forEach(([n, s2, w, nn, tEind], i) => { const a = m * Math.max(0.35, q.on(w, nn, 0.3)); if (a <= 0.01) return; const act = t >= q.at(w, nn) && t < tEind; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, kx, ky + i * 120, 520, 96, 14); shape(ctx, act ? rgba(C.goud, 0.14) : rgba(C.fill, 0.7), act ? C.goud : C.line, act ? 2.5 : 1.5);
      text(ctx, n, kx + 40, ky + i * 120 + 64, fTitel(48), act ? C.goud : C.text2, 'center'); text(ctx, s2, kx + 84, ky + i * 120 + 60, fTekst(34, 600), C.text, 'left'); ctx.restore(); });
    naamBij(ctx, 'acetylcholine', null, x - 360, y + 60, q.on('acetylcholine', 1, 0.4) * UIT(t, t2, 0.4), 'right', Z3.nt);
    naamBij(ctx, 'acetylcholinesterase', 'enzym', x - 360, y + 150, q.on('acetylcholinesterase', 1, 0.4) * UIT(t, t2, 0.4), 'right');
    naamBij(ctx, 'heropname', null, x - 360, y - 120, q.on('heropname', 1, 0.4) * UIT(t, t3, 0.4), 'right', C.goud);
    tag(ctx, 'binnen een paar duizendste seconde: schoon', 1600, 640, C.groen, q.on('schoon', 1, 0.4) * UIT(t, q.at('Precies'), 0.4), 'center', 30);
    tag(ctx, 'hier grijpen medicijnen en drugs in', 1600, 640, C.goud, q.on('medicijnen', 1, 0.4), 'center', 30);
    { const a = q.on('Daarover', 1, 0.4); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'daarover gaat de volgende film', 1600, 720, C.grain, 'center', 28); ctx.restore(); } } },

  // ---------- Hoofdstuk 5 · Eenrichtingsverkeer
  a5(ctx, t, q) { bg(ctx, 'schema'); const tw = q.at('Dit'), sw = ramp(t, tw, 0.6), x = 820;
    if (sw < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sw;
      const hi = []; if (t > q.at('Blaasjes') && t < q.at('Receptoren')) hi.push('blaasje'); if (t > q.at('Receptoren') && t < q.at('stof')) hi.push('receptor');
      const F = sleutel(t, [[q.at('één') - 0.5, 0], [q.at('dendriet') + 0.6, 0.8]]); const pp = sleutel(t, [[q.at('dendriet') - 0.3, 0], [q.at('dendriet') + 1.0, 1]]);
      synapsZ3(ctx, x, SY, 1.1, { fase: F, t, hi, axon: 60, postPuls: pp > 0.001 && pp < 1 ? pp : -1 });
      naamBij(ctx, 'blaasjes', 'alleen in het eindknopje', x + 330, SY - 200, q.on('Blaasjes', 1, 0.4), 'left');
      naamBij(ctx, 'receptoren', 'alleen in de volgende cel', x + 330, SY + 140, q.on('Receptoren', 1, 0.4), 'left');
      pijl(ctx, x - 420, SY - 260, x - 420, SY + 270, Z3.imp, q.on('één', 1, 0.5), 8, 26); naamBij(ctx, 'één kant op', null, x - 450, SY + 20, q.on('één', 1, 0.5), 'right', Z3.imp);
      const nt = q.on('Nooit', 1, 0.4); pijl(ctx, x - 560, SY + 270, x - 560, SY - 260, C.text2, nt, 6, 22); kruis(ctx, x - 560, SY, 46, nt, C.koraal); naamBij(ctx, 'nooit terug', null, x - 600, SY + 120, nt, 'right', C.koraal);
      ctx.restore(); }
    if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; const c = ramp(t, q.at('trekt') - 0.1, 0.5); const nt = sleutel(t, [[q.at('acetylcholine') - 0.6, 0], [q.at('acetylcholine') + 0.6, 1]]); const bind = q.on('Bezet', 1, 0.4);
      const pu = sleutel(t, [[q.at('motorisch') - 0.2, 0], [q.at('synaps') + 0.2, 1]]);
      const E = eindplaat(ctx, 960, 560, { c, nt, bind, t, puls: pu > 0.001 && pu < 1 ? pu : -1, hi: bind > 0.5 && t < q.at('trekt') ? 'receptor' : null });
      naamBij(ctx, 'motorisch neuron', null, 560, 200, q.on('motorisch', 1, 0.4), 'center');
      naamBij(ctx, 'acetylcholine', null, 1160, 430, q.on('acetylcholine', 1, 0.4) * UIT(t, q.at('Bezet'), 0.4), 'left', Z3.nt);
      naamBij(ctx, 'spiervezel', 'de ontvanger', 1300, 720, q.on('spiervezel', 1, 0.4), 'center');
      tag(ctx, 'trekt samen', 960, 800, C.koraal, q.on('trekt', 1, 0.4) * UIT(t, q.at('Zelfde'), 0.4), 'center', 32);
      tag(ctx, 'zelfde principe, andere ontvanger', 960, 800, C.groen, q.on('Zelfde', 1, 0.4), 'center', 32); ctx.restore(); } },

  // ---------- Samenvatting
  s70(ctx, t, q) { bg(ctx, 'schema');
    const F = sleutel(t, [[q.at('impuls') - 0.2, 0.02], [q.at('eindknopje') + 0.3, 0.2], [q.at('Calcium'), 0.25], [q.at('leeg') + 0.2, 0.48], [q.at('over', 2) + 0.2, 0.65], [q.at('open') + 0.2, 0.8], [q.at('Enzym'), 0.82], [q.at('schoon'), 1]]);
    const pp = sleutel(t, [[q.at('vuurt') - 0.3, 0], [q.at('vuurt') + 1.0, 1]]);
    const sw = ramp(t, q.at('synapsen') - 0.2, 0.6);
    synapsZ3(ctx, 470, SY + 10, 0.92, { a: 1 - sw, fase: F, t, axon: 60, postPuls: pp > 0.001 && pp < 1 ? pp : -1 });
    if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; const pk = sleutel(t, [[q.at('synapsen'), 0], [q.at('brood', 2) + 0.2, 1]]); ketting(ctx, 80, SY + 30, 690, SY + 30, 3, { s: 0.85, puls: pk < 1 ? pk : -1 }); breinVoor(ctx, 800, SY + 10, 1.4, { a: 1 }); naamBij(ctx, 'neus', null, 90, SY + 160, 1, 'left'); naamBij(ctx, 'hersenen', null, 800, SY + 170, 1, 'center'); ctx.restore(); }
    const R = [['geurstof past in een receptor in je neus', 'geurstof'], ['impuls over het axon naar het eindknopje', 'impuls'], ['calcium erin, blaasjes leeg', 'Calcium'], ['neurotransmitter steekt de spleet over', 'steekt'], ['receptoren bezet, kanalen open', 'Receptoren'], ['de volgende cel vuurt, of juist niet', 'vuurt'], ['enzym · heropname · wegdrijven', 'Enzym'], ['een paar synapsen verder: brood!', 'synapsen'], ['elektrisch, chemisch, elektrisch', 'Elektrisch'], ['en altijd één kant op', 'altijd']];
    let cur = -1; R.forEach(([, w], i) => { if (t >= q.at(w) - 0.1) cur = i; });
    R.forEach(([s, w], i) => { const a = q.on(w, 1, 0.4); if (a <= 0.01) return; const yy = 150 + i * 70; ctx.save(); ctx.globalAlpha *= a * (i === cur ? 1 : 0.6); text(ctx, String(i + 1), 1000, yy, fMeta(30), i === cur ? C.goud : C.grain, 'right'); text(ctx, s, 1030, yy, fTekst(36, i === cur ? 700 : 400), C.text, 'left'); ctx.restore(); }); }
});

// exacte woordmatch (de standaard q.at zoekt een deel van een woord: 'drie' zat ook in 'dendriet')
function _z3norm(w) { return String(w).toLowerCase().replace(/[^a-zà-ÿ0-9]/g, ''); }
function QX(q, st) { const it = st && st.items && st.items[st.idx]; const words = (it && it.seg && it.seg.words) || []; const cache = {};
  const at = (w, n = 1) => { const k = w + '|' + n; if (k in cache) return cache[k]; let c = 0; const nw = _z3norm(w); for (const x of words) if (_z3norm(x.t) === nw && ++c === n) return (cache[k] = x.s); return (cache[k] = Infinity); };
  return { at, on: (w, n = 1, d = 0.6) => ramp(q.localT, at(w, n), d), localT: q.localT }; }
for (const k of Object.keys(SCENES)) { if (k === 'title') continue; const f = SCENES[k]; SCENES[k] = (ctx, t, q, st) => f(ctx, t, QX(q, st || (typeof state !== 'undefined' ? state : null)), st); }

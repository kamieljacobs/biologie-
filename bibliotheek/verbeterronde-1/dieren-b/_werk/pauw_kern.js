// ===================================================================================
// PAUW (Pavo cristatus, man), aanpassing op VogelGroot. Recept: snavel–staart 100–120 cm, sleep 200–230 cm (verlengde
// bovenstaartdekveren). Pronken: de sleep wordt opgezet als waaier; tijdens het opzetten klapt de bundel open (de hoek
// van de waaier groeit van een smalle bundel tot bijna een volle schijf), zodat o.waaier 0,5…1 echte tussenstanden geeft.
// Poten: bevederde dij, kale grijsbruine loopbeen (tarsus) met een zichtbaar hielgewricht (knobbel) en spoor; tenen
// als vork. Zelfde aanroep pauw(ctx, x, y, s, { waaier, houding, t, staartLengte, vlekken }).
// ===================================================================================
(function () { const V = VogelPop, { RAD, L, ss, add, tf, buis, crs } = V;
  const pauwKop = (pal, kuif) => ({ kl: pal.kop, K: [[-11, 6], [-9, -6], [2, -11], [12, -8], [16, -1], [12, 6], [0, 9]],
    lagen: [{ p: [[-4, -6], [6, -7], [12, -4], [2, -4]], c: pal.gezicht }, { p: [[-2, 2], [6, 4], [12, 2], [6, 1]], c: pal.gezicht }],
    na: (ctx) => { for (let i = 0; i < 9; i++) { const bx = -4 + i * 1.2, by = -9 - i * 0.2, an = -1.95 + i * 0.09, l = kuif * (1 + (i % 3) * 0.08); const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l;
        lijn(ctx, [[bx, by], [tx, ty]], pal.kuifS, 1.1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-4, -3, 0, -6); ctx.quadraticCurveTo(4, -3, 0, 2); ctx.fillStyle = i % 2 ? pal.kuif1 : pal.kuif2; ctx.fill(); ctx.restore(); }
      vul(ctx, [[13, -4], [22, -2], [26, 1], [21, 3], [13, 3]], '#B0A288', '#D0C4A8', 1); dierOog(ctx, 4, -2, 2.6, '#2A1A10'); } });
  function pronk(ctx, x, y, s, o) { const t = o.t || 0, w = o.waaier ?? 1, wo = ss(w), Rw = 246 * (o.staartLengte ?? 1) * L(0.62, 1, wo), vl = o.vlekken ?? 1, span = L(34, 300, wo); const tr = Math.sin(2 * Math.PI * t * 6);
    const pal = { blauw: '#2C5EA6', blauwL: '#4C86CC', groen: '#2E5A40', brons: '#B8A050' }; const cx = -4, cy = -262; const D = [];
    const a0 = (270 - span / 2) * RAD, a1 = (270 + span / 2) * RAD; /* waaier gaat open als een uitklappende bundel: hoek groeit, straal iets */ const F = []; for (let i = 0; i <= 90; i++) { const a = L(a0, a1, i / 90); const r = Rw * (1 + 0.012 * Math.sin(i * 2.2)); F.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } F.push([cx, cy + 40]);
    D.push({ b: F, c: pal.groen, rk: pal.brons, l: [{ fn: (ctx) => { ctx.strokeStyle = 'rgba(184,160,74,0.45)'; ctx.lineWidth = 1.3; const ns = Math.max(14, Math.round(110 * span / 300)); for (let i = 0; i <= ns; i++) { const a = L(a0, a1, i / ns) + 0.004 * tr; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); ctx.lineTo(cx + Math.cos(a) * Rw, cy + Math.sin(a) * Rw); ctx.stroke(); }
        for (const [rr, n] of [[0.93, 50], [0.79, 42], [0.65, 34], [0.51, 26], [0.37, 18]]) { const nn = Math.max(3, Math.round(n * span / 300)); for (let i = 0; i < nn; i++) { if (hash(i * 13 + rr * 100) > vl) continue; const a = L(a0, a1, (i + 0.5 + 0.5 * (rr * 10 % 2)) / (nn + 1)) + 0.01 * tr * (1 - rr); _oogvlek(ctx, cx + Math.cos(a) * Rw * rr, cy + Math.sin(a) * Rw * rr, (6 + 9 * rr) * (Rw / 262), a + Math.PI); } } } }] });
    // hangende vleugels: kastanjebruine handpennen opzij van het lijf
    for (const k of [-1, 1]) { const b = [k * 30, -160], d = 0.05 * tr; const pen = []; for (let i = 0; i < 6; i++) { const a = (90 - k * (16 + i * 7)) * RAD + d * k; pen.push({ b: V.veer(add(b, [k * i * 2, i * 4]), a, 86 - i * 4, 10, 0), c: '#9A5A2E', o: ['#C07A48', 1.2] }); } D.push(...pen.reverse()); }
    // poten (vooraanzicht): bevederde dij, grijsbruine tarsus, tenen gespreid
    for (const k of [-1, 1]) { const x0 = k * 13; D.push({ b: buis([[x0, -104], [x0 + k, -70]], [24, 15]).pts, c: '#22323E' });
      D.push({ b: buis([[x0 + k, -74], [x0 + k * 2, -64], [x0 + k * 2.5, -40], [x0 + k * 3, -6]], [9, 12.5, 9.5, 9]).pts, c: '#8A7C6C', na: (c) => { c.fillStyle = '#7A6C5C'; c.beginPath(); c.ellipse(x0 + k * 2, -64, 6.5, 5, 0, 0, 6.283); c.fill(); } }); // hielgewricht als knobbel
      for (const da of [-0.5, 0, 0.5]) { D.push({ b: buis([[x0 + k * 3, -6], [x0 + k * 3 + da * 26 + k * 6, -1]], [7.5, 4.5]).pts, c: '#7E7060' }); } }
    // lijf (vooraanzicht): blauwe borst, donkere onderbuik
    const B = crs([[0, -206], [24, -196], [38, -166], [40, -134], [30, -106], [12, -94], [-12, -94], [-30, -106], [-40, -134], [-38, -166], [-24, -196]], 2);
    D.push({ b: B, c: pal.blauw, l: [{ p: [[-50, -126], [50, -126], [50, -80], [-50, -80]], c: '#1E2E3A' }, { fn: (ctx) => { ctx.fillStyle = 'rgba(30,68,126,0.5)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(-26 + (i % 6) * 10 + (Math.floor(i / 6) % 2) * 5, -190 + Math.floor(i / 6) * 13, 2.3, 0, Math.PI); ctx.fill(); } } }] });
    // hals en kop (kop draait naar de kijkrichting, licht knikkend)
    const kopP = [6, -276], tk = 0.05 * Math.sin(2 * Math.PI * t * 1.5); const nb = buis([[0, -190], [2, -226], [3, -252], [5, -268]], [34, 24, 18, 15]); D.push({ b: nb.pts, c: pal.blauw });
    const KP = pauwKop({ kop: pal.blauw, gezicht: '#EEEEE6', kuifS: '#3A4A6A', kuif1: '#3E8AA0', kuif2: pal.blauwL }, 26); const Tk = tf(kopP, tk);
    D.push({ b: crs(KP.K, 1).map(Tk), c: KP.kl, l: KP.lagen.map(l => ({ p: l.p.map(Tk), c: l.c })), na: (c) => { c.save(); c.translate(...kopP); c.rotate(tk); KP.na(c); c.restore(); } });
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); D.forEach((d, i) => { if (d.b && (!d.b.length || d.b.some(q => !q))) throw new Error("leeg deel " + i + " van " + D.length); }); V.render(ctx, D, 1.5); ctx.restore(); }
  VogelGroot.pronk = pronk;
  const sp = VogelGroot.spec('pauw'); sp.poot.tw = 9.6;
})();

// Wat word jij? · Ecologie en natuurbeheer · Stikstof: hoe een voedingsstof een probleem werd — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas, voorstel, zoals in lib_cast). Micro alleen in de zoomcirkel bij ammoniak → ammonium.
// Rode draad: één zeshoekje heide (goud) door de hele film. Elke scène staat er op t = 0; wat genoemd wordt, komt op zijn woord.
// Gevoelig dossier: geen personen van overheid of bedrijven, geen namen, partijen of logo's; stal en fabriek alleen als (grijs) gebouw.

const HEX_R = 30;
function veldScene(ctx, t, o = {}) { veldGrond(ctx, Object.assign({ y: 800, gras: 0.45, venX: 90, venW: 280 }, o)); }

Object.assign(SCENES, {
  title(ctx, t) {
    // rechts: heide met het meetpaaltje en het gouden zeshoekje; aan de horizon een stal
    ctx.save(); roundRect(ctx, 1020, 180, 820, 640, 24); ctx.clip(); ctx.fillStyle = '#1E2E4A'; ctx.fillRect(1020, 180, 820, 640);
    stalZij(ctx, 1700, 640, 0.5, {}); veldGrond(ctx, { x0: 1020, x1: 1840, y: 640, ven: 1, venX: 1060, venW: 200, gras: 0.4, seed: 4 });
    ctx.restore(); roundRect(ctx, 1020, 180, 820, 640, 24); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.stroke();
    meetPaal(ctx, 1480, 640, 0.75, {}); zeshoek(ctx, 1480, 730, 56, rgba(C.goud, 0.35), C.goud, 3);
    gasWolk(ctx, 1640, 420, 60, C.oker, 0.8, t, 2);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    veldScene(ctx, t, { x0: 0, x1: 1170, gras: 0.25 + 0.5 * q.on('verdwijnen', 1, 1.5) });
    // de boerderij blijft herkenbaar in beeld (keuring Kamiel): erf, hek, stal met silo, koeien
    ec2Erf(ctx, 1170, 1650, 800);
    stalZij(ctx, 1390, 800, 0.85, { hl: q.on('stal', 1) * (1 - q.on('Planten', 1)) });
    koe7(ctx, 1265, 812, 0.42, { houding: 'grazen', kijk: -1 }); koe7(ctx, 1585, 816, 0.4, { kijk: -1 });
    naamBij(ctx, 'veehouderij', '', 1300, 585, q.on('stal', 1), 'center');
    snelwegZij(ctx, 1660, 1920, 800, { t, a: 0.35 + 0.65 * q.on('snelweg', 1) });
    gebiedKaart(ctx, 60, 120, 470, 300, { labels: 1, t, natura: 0 });
    metaA(ctx, 'het gebied van de reeks · fictief', 295, 460, 1, C.text2, 'center', 24);
    meetPaal(ctx, 1080, 840, 0.95, {});
    const D = q.on('Daan', 1, 0.3), B = q.on('Bas', 1, 0.3);
    daan(ctx, 700, t, { a: D, pose: q.on('Hoe', 1) > 0.5 ? 'denk' : 'staan' });
    bas(ctx, 900, t, { a: B, kijk: -1, pose: q.on('stal', 1) > 0.5 && q.on('Planten', 1) < 0.5 ? 'wijs' : 'staan' });
    naamBij(ctx, 'Daan', 'stagiair', 700, 410, D, 'center');
    naamBij(ctx, 'Ecoloog Bas', '', 900, 390, B, 'center');
    chip(ctx, 'stikstof: een voedingsstof', 1330, 240, C.groen, q.on('nodig', 1), 30);
    chip(ctx, 'toch verdwijnen er soorten', 1330, 320, C.text2, q.on('verdwijnen', 1), 30);
    vraagteken(ctx, 1600, 470, q.on('denk', 1), 110); },

  // ---------- H1 Van stal tot heide ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord b: snelle groeiers verdringen de rest');
    // links: een stukje heide waar grassen boven de heide uit groeien
    const G = q.on('groeiers', 1, 1.6);
    ctx.save(); roundRect(ctx, 120, 260, 700, 470, 20); ctx.clip(); ctx.fillStyle = rgba(C.fill, 0.5); ctx.fillRect(120, 260, 700, 470);
    const R = ecRng(21); for (let i = 0; i < 9; i++) { const x = 160 + i * 75 + R() * 20; struikhei(ctx, x, 680, 90 + R() * 30, { seed: i + 3, a: 1 - 0.55 * G }); }
    for (let i = 0; i < 5; i++) { const x = 200 + i * 135 + R() * 30; grasPol(ctx, x, 680, lerp(50, 220, G) * (0.85 + R() * 0.3), { seed: i + 9, kl: '#9CC070', n: 11 }); }
    ctx.fillStyle = '#2C3A34'; ctx.fillRect(120, 680, 700, 50); ctx.restore();
    roundRect(ctx, 120, 260, 700, 470, 20); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
    metaA(ctx, 'dat zie je straks', 470, 780, q.on('straks', 1), C.text2, 'center', 26);
    // rechts: niet de kringloop (die was in Alles gaat rond), maar de reis door de lucht
    const K = q.on('kringloop', 1, 0.5); ecA(ctx, K * (1 - 0.6 * q.on('lucht', 1)), () => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1080, 360, 80, 0.3, 5.9); ctx.stroke(); pijl(ctx, 1080 + 80 * Math.cos(5.9), 360 + 80 * Math.sin(5.9), 1080 + 82 * Math.cos(6.2), 360 + 82 * Math.sin(6.2), C.line, 1, 3, 16); });
    metaA(ctx, 'kringloop · Alles gaat rond', 1080, 490, K, C.text2, 'center', 24);
    const L = q.on('reist', 1, 0.8), k = clamp((t - q.at('reist', 1)) / 3, 0, 1);
    stalZij(ctx, 1130, 760, 0.55, { a: L });
    veldGrond(ctx, { a: L, x0: 1300, x1: 1820, y: 760, ven: 0, gras: 0.2, seed: 6 });
    ecA(ctx, L, () => { ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(1150, 620); ctx.quadraticCurveTo(1400, 420, 1600, 640); ctx.stroke(); ctx.setLineDash([]); });
    gasWolk(ctx, lerp(1150, 1600, ease(k)), 620 - Math.sin(ease(k) * Math.PI) * 200, 50, C.oker, L, t, 3);
    naamBij(ctx, 'door de lucht', '', 1400, 400, L, 'center'); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    // dwarsdoorsnede: stal links, heide in het midden, snelweg en fabriek rechts
    veldGrond(ctx, { x0: 480, x1: 1420, y: 800, ven: 0, gras: 0.2, seed: 8 });
    ctx.fillStyle = '#2C3A34'; ctx.fillRect(0, 800, 480, 90); ctx.fillRect(1420, 800, 500, 90);
    stalZij(ctx, 260, 800, 0.9, { kelder: q.on('mest', 1) });
    snelwegZij(ctx, 1440, 1660, 800, { t, ecoduct: 0 }); fabriekZij(ctx, 1790, 800, 0.8, {});
    const A = q.on('ammoniak', 1, 0.8), N = q.on('stikstofoxiden', 1, 0.8), D = q.on('depositie', 1, 1.2);
    // gaswolken stijgen op en drijven naar de heide bij 'depositie'
    const ka = clamp((t - q.at('ammoniak', 1)) / 2.5, 0, 1), kd = clamp((t - q.at('depositie', 1)) / 3, 0, 1);
    gasWolk(ctx, lerp(300, 760, ease(kd)), lerp(700, 430, ease(ka)) + 160 * ease(kd) * 0.5, 70, C.oker, A, t, 1);
    naamBij(ctx, 'ammoniak', 'gas · uit mest', 300, 350, A * (1 - D), 'center');
    const kn = clamp((t - q.at('stikstofoxiden', 1)) / 2.5, 0, 1);
    gasWolk(ctx, lerp(1650, 1180, ease(kd)), lerp(720, 420, ease(kn)) + 160 * ease(kd) * 0.5, 70, KL_NOX, N, t, 4);
    gasWolk(ctx, lerp(1770, 1300, ease(kd)), lerp(540, 380, ease(kn)) + 120 * ease(kd) * 0.5, 50, KL_NOX, N, t, 5);
    naamBij(ctx, 'stikstofoxiden', 'uitlaten · schoorstenen', 1640, 300, N * (1 - D), 'center');
    // natte depositie: regenwolk met druppels; droge: deeltjes die direct op de heide landen
    const NAT = q.on('natte', 1, 0.8), DR = q.on('droge', 1, 0.8);
    regenWolk(ctx, 820, 250, 300, { a: NAT, t, regen: NAT, stip: 1 });
    naamBij(ctx, 'natte depositie', 'met regen mee', 820, 170, NAT, 'center');
    if (DR > 0.01) for (let i = 0; i < 16; i++) { const ph = (t * 0.35 + hash(i * 5)) % 1, x = 1060 + (hash(i) - 0.5) * 340, y = lerp(470, 690, ph); circ(ctx, x, y, 6, i % 3 ? C.oker : KL_NOX, null); ctx.globalAlpha = 1; }
    naamBij(ctx, 'droge depositie', 'direct op blad of grond', 1560, 520, DR, 'center');
    tag(ctx, 'depositie: komt neer op bodem en planten', 960, 140, C.goud, D * (1 - NAT), 'center', 34); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    // links: een blad met een waterdruppel, zoomcirkel naar ammoniak → ammonium (Micro)
    druppelOpBlad(ctx, 230, 690, 26, 1);
    const Z = q.on('water', 1, 0.8), M = q.on('ammonium', 1, 1.0), k = clamp((t - q.at('Ammoniak', 1) - 0.4) / 2.2, 0, 1);
    zoomCircle(ctx, 560, 400, 270, 230, 680, 'VERGROOT · VEREENVOUDIGD', Z, () => {
      ctx.fillStyle = C.bgMicro; ctx.fillRect(280, 120, 560, 560);
      druppelOpBlad(ctx, 560, 470, 130, 1);
      nh3(ctx, lerp(470, 560, ease(k)), lerp(170, 440, ease(k)), 34, { rot: t * 0.4 * (1 - M), vier: M, plus: M });
      for (let i = 0; i < 6; i++) { const w2 = wander(i, t, 6, 0.6); circ(ctx, 480 + i * 32 + w2.x, 520 + (i % 2) * 20 + w2.y, 7, rgba(C.teal, 0.8)); } });
    naamBij(ctx, 'ammoniak', 'NH₃ · gas', 560, 200, Z * (1 - M), 'center');
    naamBij(ctx, 'ammonium', 'NH₄⁺ · opgelost', 560, 210, M, 'center');
    naamBij(ctx, 'waterdruppel', 'op een blad', 560, 640, Z, 'center');
    // rechts: hoe ver het reist; ammoniak kort, stikstofoxiden lang (eerst omgezet)
    const B0 = 1080, Y0 = 760; ctx.fillStyle = '#2C3A34'; ctx.fillRect(960, Y0, 960, 30); ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(960, Y0); ctx.lineTo(1920, Y0); ctx.stroke();
    circ(ctx, B0, Y0, 10, C.text2); metaA(ctx, 'bron', B0, Y0 + 70, 1, C.text2, 'center', 24); metaA(ctx, 'afstand →', 1880, Y0 + 70, 1, C.text2, 'right', 24);
    const DI = q.on('dichterbij', 1, 1.6);
    for (let i = 0; i < 5; i++) { const end = B0 + 120 + i * 70, h = 160 + i * 20; ecA(ctx, DI, () => { ctx.strokeStyle = rgba(C.oker, 0.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(B0, Y0 - 10); ctx.quadraticCurveTo((B0 + end) / 2, Y0 - h, end, Y0 - 6); ctx.stroke(); circ(ctx, end, Y0 - 6, 8, C.oker); }); }
    naamBij(ctx, 'ammoniak', 'gemiddeld dichterbij', B0 + 270, Y0 - 230, DI, 'center');
    const OM = q.on('omgezet', 1, 1.0), VE = q.on('verder', 1, 2.5);
    for (let i = 0; i < 3; i++) { const u = clamp(VE * 1.15 - i * 0.08, 0, 1), sx = B0, ex = B0 + 1100, h = 420 + i * 40; const px = lerp(sx, ex, u), py = Y0 - 10 - Math.sin(u * Math.PI * 0.85) * h;
      if (OM > 0.01) ecA(ctx, OM, () => { ctx.strokeStyle = rgba(KL_NOX, 0.55); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); for (let k2 = 0; k2 <= 30; k2++) { const uu = u * k2 / 30, xx = lerp(sx, ex, uu), yy = Y0 - 10 - Math.sin(uu * Math.PI * 0.85) * h; k2 ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.setLineDash([]); nox(ctx, px, py, 14, { om: clamp(u * 3, 0, 1) * OM, rot: t * 0.3 + i }); }); }
    naamBij(ctx, 'stikstofoxiden', 'eerst omgezet · reizen verder', 1560, 250, OM, 'center'); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    veldScene(ctx, t, { x0: 0, x1: 900, ven: 1, venX: 40, venW: 220 });
    const D = 1;
    daan(ctx, 520, t, { pose: q.on('stal', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1 }); naamBij(ctx, 'Daan', '', 520, 420, 1, 'center');
    tag(ctx, 'komt het vooral van daar?', 520, 250, C.text2, q.on('vooral', 1), 'center', 32);
    // rechts: kaart van boven met de stal en een cirkel van 500 meter
    const K = 1; paneel(ctx, 960, 170, 860, 640, '', K);
    ctx.save(); roundRect(ctx, 960, 170, 860, 640, 16); ctx.clip();
    ctx.fillStyle = rgba(C.groen, 0.13); ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 1.6; ecPad(ctx, [[1000, 300], [1250, 220], [1500, 260], [1560, 420], [1440, 640], [1180, 720], [1010, 600]]); ctx.fill(); ctx.stroke();
    ctx.restore();
    const S = [1520, 540]; stalIcoon(ctx, S[0], S[1], 1, q.on('stal', 1));
    const V = q.on('vijfhonderd', 1, 0.8); ecA(ctx, V, () => { ctx.beginPath(); ctx.arc(S[0], S[1], 190 * ease(V), 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.stroke(); ctx.setLineDash([]); });
    naamBij(ctx, '500 meter', '', S[0], S[1] - 205, V, 'center');
    metaA(ctx, 'van boven · schematisch', 1390, 790, 1, C.text2, 'center', 24);
    vraagteken(ctx, 1230, 470, q.on('denk', 1), 100); },

  s09(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord c: ongeveer een twintigste');
    // kaart van boven: stal, cirkel 500 m, onze heide ernaast, verre bronnen rond de rand
    paneel(ctx, 140, 200, 1640, 620, '', 1); const S = [760, 520], RC = 170;
    ctx.save(); roundRect(ctx, 140, 200, 1640, 620, 16); ctx.clip();
    ctx.fillStyle = rgba(C.groen, 0.13); ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 1.6; ecPad(ctx, [[880, 360], [1080, 300], [1240, 380], [1230, 560], [1090, 700], [900, 640]]); ctx.fill(); ctx.stroke();
    // de grens met het buitenland rechts
    ctx.strokeStyle = rgba(C.text2, 0.6); ctx.lineWidth = 3; ctx.setLineDash([4, 10]); ctx.beginPath(); ctx.moveTo(1640, 200); ctx.lineTo(1600, 820); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    zeshoek(ctx, 1060, 500, HEX_R, rgba(C.goud, 0.4), C.goud, 3);
    naamBij(ctx, 'onze heide', '', 1070, 760, 1, 'center');
    stalIcoon(ctx, S[0], S[1], 1, 1);
    ctx.save(); ctx.beginPath(); ctx.arc(S[0], S[1], RC, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    metaA(ctx, '500 m', S[0], S[1] - RC - 16, 1, C.grain, 'center', 26);
    // 5 %: een twintigste valt binnen de cirkel, en dat dicht op elkaar
    const P5 = q.on('procent', 1, 0.6), KL = q.on('klein', 1, 1.2);
    ecA(ctx, Math.max(P5, KL), () => { const R = ecRng(3); for (let i = 0; i < 26 + Math.round(40 * KL); i++) { const r2 = Math.sqrt(R()) * RC * 0.95, an = R() * 6.283; circ(ctx, S[0] + Math.cos(an) * r2, S[1] + Math.sin(an) * r2, 5, rgba(C.oker, 0.85)); } });
    tag(ctx, '± 5 % binnen 500 m · RIVM', 760, 262, C.oker, P5, 'center', 30);
    chip(ctx, 'klein stuk grond: per hectare toch veel', 760, 880 - 70, C.oker, KL * (1 - q.on('bufferzone', 1)), 26);
    // geen vaste bufferzone; plan van het kabinet: zones van 500 m rond zulke natuur (neutraal, gestippeld)
    const ZO = q.on('zones', 1, 1.0), DZ = q.on('drieduizend', 1, 0.6);
    ecA(ctx, ZO * (1 - 0.55 * q.on('Andersom', 1)), () => { ctx.save(); roundRect(ctx, 140, 200, 1640, 620, 16); ctx.clip(); ctx.beginPath(); ctx.ellipse(1060, 500, 190 + RC * ease(ZO), 205 + RC * 0.35 * ease(ZO), 0, 0, 6.283); ctx.strokeStyle = rgba(C.text2, 0.85); ctx.lineWidth = 3; ctx.setLineDash([6, 12]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
    metaA(ctx, 'plan · zone 500 m', 1525, 505, ZO * (1 - q.on('Andersom', 1)), C.goud, 'center', 26);
    chip(ctx, '± 3000 veehouderijen binnen 500 m · RIVM 2025', 1440, 790, C.text2, DZ * (1 - q.on('rest', 1)), 24);
    // de rest waait verder (pijlen naar buiten)
    const RE = q.on('rest', 1, 1.2);
    ctx.save(); roundRect(ctx, 140, 200, 1640, 620, 16); ctx.clip();
    [[-2.4, 520], [-1.2, 600], [0.2, 900], [2.6, 560], [1.6, 340]].forEach(([an, L], i) => { const u = clamp(RE * 1.2 - i * 0.05, 0, 1); pijl(ctx, S[0] + Math.cos(an) * (RC + 10), S[1] + Math.sin(an) * (RC + 10), S[0] + Math.cos(an) * lerp(RC + 20, L, u), S[1] + Math.sin(an) * lerp(RC + 20, L, u) * 0.6, rgba(C.oker, 0.8), RE * (1 - 0.65 * q.on('Andersom', 1)), 4, 16); }); ctx.restore();
    // andersom: van verre bronnen naar onze heide
    const AN = q.on('Andersom', 1, 0.6), H = [1060, 500];
    const BR = [[['stal', 'ver weg'], 1420, 290, 'stal', q.on('stallen', 1)], [['weg', ''], 1400, 740, 'weg', q.on('wegen', 1)], [['fabriek', ''], 300, 300, 'fabriek', q.on('fabrieken', 1)], [['buitenland', ''], 1720, 520, 'land', q.on('buitenland', 1)]];
    BR.forEach(([nm, x, y, soort, a]) => { if (a <= 0.01) return; if (soort === 'stal') stalIcoon(ctx, x, y, 0.8, a); else if (soort === 'weg') ecA(ctx, a, () => { ctx.fillStyle = KL_WEG; ctx.fillRect(x - 70, y - 14, 140, 28); ctx.strokeStyle = rgba('#E8E4DA', 0.7); ctx.setLineDash([10, 10]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x + 70, y); ctx.stroke(); ctx.setLineDash([]); }); else if (soort === 'fabriek') fabriekZij(ctx, x, y + 50, 0.32, { a });
      naamBij(ctx, nm[0], nm[1], x, y + (soort === 'land' ? -60 : 70), a, 'center');
      const d = Math.hypot(H[0] - x, H[1] - y), ux = (H[0] - x) / d, uy = (H[1] - y) / d; pijl(ctx, x + ux * 60, y + uy * 60, H[0] - ux * 50, H[1] - uy * 50, KL_NOX, a * AN, 4, 16); }); },

  // ---------- H2 Meten en rekenen ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    veldScene(ctx, t, { x0: 0, x1: 1100, ven: 0, gras: 0.3, seed: 12 });
    const BU = q.on('buisjes', 1), GW = q.on('gewisseld', 1, 0.6), wk = clamp((t - q.at('gewisseld', 1)) / 1.2, 0, 1);
    meetPaal(ctx, 420, 840, 1.25, { hl: BU * (1 - GW), weg: 1, wegK: GW * Math.sin(wk * Math.PI) });
    naamBij(ctx, 'wit kapje', '', 420, 360, q.on('kapje', 1) * (1 - q.on('Meetnet', 1)), 'center');
    naamBij(ctx, 'drie buisjes', '', 560, 560, BU * (1 - q.on('Meetnet', 1)), 'left');
    chip(ctx, 'elke maand nieuwe buisjes', 420, 240, C.teal, GW * (1 - q.on('Daan', 1)), 28);
    // rechts: Nederland met honderden meetplekken
    const MN = q.on('Meetnet', 1, 0.8), HO = q.on('honderden', 1, 1.2);
    nederland(ctx, 1260, 150, 230, { a: 0.3 + 0.7 * MN }); nederlandStippen(ctx, 1260, 150, 230, Math.round(260 * HO), { a: MN });
    naamBij(ctx, 'Meetnet Ammoniak in Natuurgebieden', 'RIVM', 1520, 790, MN, 'center');
    chip(ctx, 'sinds 2005', 1180, 230, C.goud, q.on('2005', 1), 28);
    metaA(ctx, 'stippen niet op de echte plek', 1520, 870 - 10, HO, C.text2, 'center', 24);
    // Daan schrijft het getal op
    const D = q.on('Daan', 1, 0.3); daan(ctx, 780, t, { a: D, pose: 'vasthouden', kijk: -1 });
    telformulier(ctx, 860, 470, 300, [['buisje 1', '…'], ['buisje 2', '…'], ['buisje 3', '…']], { a: D, n: 3 * clamp((t - q.at('schrijft', 1)) / 2, 0, 1), kop: 'MEETPAAL', px: 26 });
    vraagteken(ctx, 1010, 400, q.on('denk', 1), 90); },

  s12(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord a: de ammoniak in de lucht');
    buisjeGroot(ctx, 260, 500, 420, { lucht: q.on('lucht', 1), t, etiket: 'buisje' });
    naamBij(ctx, 'meet: ammoniak in de lucht', '', 260, 250, q.on('lucht', 1), 'center');
    // depositie meten: lastig en duur
    const LD = q.on('lastig', 1, 0.6); ecA(ctx, LD * (1 - q.on('Daarom', 1)), () => { tag(ctx, 'depositie meten', 980, 300, C.text2, 1, 'center', 32); kruis(ctx, 1170, 284, 18, 1, C.koraal); });
    metaA(ctx, 'lastig en duur', 980, 360, LD * (1 - q.on('Daarom', 1)), C.koraal, 'center', 26);
    // rekenschema
    const RK = q.on('rekent', 1, 0.6), BX = [['uitstoot', 'uitstoot', 230], ['weer', 'weer', 380], ['wind', 'wind', 530]];
    BX.forEach(([nm, w, y]) => { const a = Math.max(q.on(w, 1, 0.5), 0) * RK; ecA(ctx, a, () => { roundRect(ctx, 600, y - 46, 240, 80, 14); shape(ctx, rgba(C.fill, 0.95), C.line, 1.5); text(ctx, nm, 720, y + 6, fTekst(34, 600), C.text, 'center'); pijl(ctx, 848, y - 6, 1010, 380, C.line, 1, 2, 14); }); });
    ecA(ctx, RK, () => { roundRect(ctx, 1020, 330, 300, 100, 16); shape(ctx, rgba(C.goud, 0.18), C.goud, 2); text(ctx, 'rekenmodel', 1170, 392, fTekst(36, 700), C.text, 'center'); pijl(ctx, 1328, 380, 1480, 380, C.line, 1, 2, 14);
      roundRect(ctx, 1490, 330, 300, 100, 16); shape(ctx, rgba(C.fill, 0.95), C.line, 1.5); text(ctx, 'depositie', 1640, 392, fTekst(36, 700), C.text, 'center'); });
    metaA(ctx, 'RIVM', 1170, 300, RK, C.grain, 'center', 24);
    // buisjes geijkt aan meetstations, en ze controleren het model
    const MS = q.on('meetstations', 1, 0.6); meetStation(ctx, 780, 820, 0.85, { a: MS });
    naamBij(ctx, 'meetstation', '', 900, 700, MS, 'left');
    ecA(ctx, MS, () => { ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(400, 640); ctx.quadraticCurveTo(560, 760, 680, 720); ctx.stroke(); ctx.setLineDash([]); });
    metaA(ctx, 'geijkt', 560, 700, MS, C.teal, 'center', 24);
    const CO = q.on('controleren', 1, 0.8); ecA(ctx, CO, () => { ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(400, 340); ctx.bezierCurveTo(520, 120, 980, 120, 1120, 320); ctx.stroke(); pijl(ctx, 1100, 290, 1124, 326, C.groen, 1, 3, 14); });
    chip(ctx, 'controle met metingen', 1150, 150, C.groen, CO, 28); vink_(ctx, 1345, 140, 14, CO); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const KX = 120, KY = 150, KW = 1020, KH = 660;
    const P = gebiedKaart(ctx, KX, KY, KW, KH, { labels: 1 - q.on('zeshoekje', 1), t });
    // nieuwe stal of weg als grijs schetsje (geen keuze)
    const NS = q.on('stal', 1, 0.6); ecA(ctx, NS, () => { stalIcoon(ctx, KX + KW * 0.6, KY + KH * 0.93, 0.7, 1, true); });
    ecA(ctx, q.on('weg', 1, 0.6), () => { ctx.strokeStyle = KL_SCHETS; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(KX + KW * 0.9, KY + KH * 0.55); ctx.lineTo(KX + KW * 0.97, KY + KH * 0.55); ctx.lineTo(KX + KW * 0.97, KY + KH * 0.95); ctx.stroke(); ctx.setLineDash([]); });
    metaA(ctx, 'nieuw · schets', KX + KW * 0.7, KY + KH - 14, Math.max(NS, 0), C.text2, 'center', 24);
    // zeshoekjes over de heide, één goud
    const ZH = q.on('zeshoekje', 1, 1.0), ONS = q.on('ons', 1, 0.6);
    ctx.save(); roundRect(ctx, KX, KY, KW, KH, 18); ctx.clip();
    const G = zeshoekRaster(ctx, KX, KY, KX + KW, KY + KH, HEX_R, { a: ZH, punt: [P.heide[0] + 40, P.heide[1] - 10], kl: rgba('#E8E4DA', 0.35) }); ctx.restore();
    if (G) { if (ONS > 0.01) ecA(ctx, ONS, () => zeshoek(ctx, G[0], G[1], HEX_R, rgba(C.goud, 0.5), C.goud, 4)); }
    metaA(ctx, '1 zeshoekje ≈ 1 hectare · 100 × 100 m', KX + KW / 2, KY - 20, ZH, C.grain, 'center', 24);
    // rechts: het programma en het getal
    const AE = q.on('Aerius', 1, 0.6); rekenScherm(ctx, 1500, 330, 1.3, AE); naamBij(ctx, 'Aerius', 'rekenprogramma', 1500, 470, AE, 'center');
    chip(ctx, 'wat geeft het project extra?', 1500, 600, C.text2, q.on('extra', 1) * (1 - ONS), 26);
    const GT = q.on('veertienhonderd', 1, 0.6);
    ecA(ctx, GT, () => { roundRect(ctx, 1240, 560, 560, 200, 18); shape(ctx, rgba(C.fill, 0.95), C.goud, 2); text(ctx, '± 1400', 1520, 650, fTitel(72), C.goud, 'center'); metaText(ctx, 'mol N per ha per jaar · stel', 1520, 712, C.grain, 'center', 24); });
    if (G && GT > 0.01) ecA(ctx, GT, () => { ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(G[0] + HEX_R, G[1]); ctx.lineTo(1240, 640); ctx.stroke(); ctx.setLineDash([]); }); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    regel(ctx, 'hoe zeker is dat?', 960, 150, 1, C.text, 40, 'center', 700);
    // as: % van de berekende waarde
    const X0 = 620, X1 = 1760, X = v => X0 + (X1 - X0) * v / 200;
    const rij = (y, lo, hi, kl, a) => ecA(ctx, a, () => { ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(lo), y); ctx.lineTo(X(hi), y); ctx.stroke(); for (const v of [lo, hi]) { ctx.beginPath(); ctx.moveTo(X(v), y - 22); ctx.lineTo(X(v), y + 22); ctx.stroke(); } circ(ctx, X(100), y, 12, C.goud); });
    ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(X(100), 230); ctx.lineTo(X(100), 720); ctx.stroke(); ctx.setLineDash([]);
    [0, 30, 70, 100, 130, 170, 200].forEach(v => metaA(ctx, String(v) + ' %', X(v), 770, 1, C.text2, 'center', 24));
    metaA(ctx, 'berekend = 100 %', X(100), 215, 1, C.grain, 'center', 24);
    const L = q.on('landelijke', 1, 0.8), PL = q.on('plek', 1, 0.8);
    nederland(ctx, 190, 200, 120, { a: 0.35 + 0.65 * L });
    rij(370, 70, 130, C.teal, L); naamBij(ctx, 'heel Nederland', '± 30 % · RIVM', X(130) + 30, 360, L, 'left');
    zeshoek(ctx, 330, 640, 64, rgba(C.goud, 0.4), C.goud, 3);
    rij(600, 30, 170, C.koraal, PL); naamBij(ctx, 'één plek', '± 70 % · RIVM', X(170) + 30, 590, PL, 'left');
    // op één plek: veel bronnen tegelijk
    const VB = q.on('bronnen', 1, 1.2), ic = [[-2.5, 'stal'], [-1.6, 'weg'], [-0.6, 'stal'], [0.5, 'land'], [1.6, 'weg'], [2.5, 'stal']];
    ic.forEach(([an, s2], i) => { const u = clamp(VB * 1.3 - i * 0.06, 0, 1), sx = 330 + Math.cos(an) * 190, sy = 640 + Math.sin(an) * 120; ecA(ctx, u, () => { circ(ctx, sx, sy, 16, s2 === 'stal' ? rgba(C.oker, 0.8) : rgba(KL_NOX, 0.8)); pijl(ctx, sx + (330 - sx) * 0.2, sy + (640 - sy) * 0.2, sx + (330 - sx) * 0.62, sy + (640 - sy) * 0.62, s2 === 'stal' ? C.oker : KL_NOX, 1, 3, 12); }); });
    chip(ctx, 'moeilijk na te meten', 330, 830, C.text2, q.on('moeilijk', 1), 26); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    regel(ctx, 'hoe precies kan het?', 960, 140, 1, C.text, 40, 'center', 700);
    const AC = q.on('adviescollege', 1, 0.6);
    ec2Kaart(ctx, 100, 200, 820, 'ADVIESCOLLEGE · 2020', [['heel Nederland: goed genoeg', 'v'], ['kleine bijdragen per hectare: schijnzekerheid', '!'], ['advies: meer meten', '•']],
      { a: AC, n: q.on('Nederland', 1, 0.6) + q.on('schijnzekerheid', 1, 0.6) + q.on('adviseerde', 1, 0.6), px: 30 });
    const UV = q.on('Universiteit', 1, 0.6);
    ec2Kaart(ctx, 1000, 200, 820, 'UNIVERSITEIT VAN AMSTERDAM · 2023', [['bij twee melkveebedrijven', '•'], ['ammoniak in de lucht: klopt met model', 'v'], ['neerslag: niet goed te meten', '!']],
      { a: UV, n: q.on('melkveebedrijven', 1, 0.6) + q.on('klopte', 1, 0.6) + q.on('neerkwam', 1, 0.6), px: 30 });
    // critici en verdedigers: allebei steun
    const CR = q.on('Critici', 1, 0.6); ecA(ctx, CR * (1 - 0.6 * q.on('Eens', 1)), () => { tag(ctx, 'critici', 1180, 560, C.text2, 1, 'center', 30); tag(ctx, 'verdedigers', 1640, 560, C.text2, 1, 'center', 30); pijl(ctx, 1200, 510, 1290, 450, C.line, 1, 2, 12); pijl(ctx, 1620, 510, 1530, 450, C.line, 1, 2, 12); });
    metaA(ctx, 'allebei steun', 1410, 620, CR * (1 - 0.6 * q.on('Eens', 1)), C.grain, 'center', 24);
    // waar men het over eens is
    const EE = q.on('Eens', 1, 0.8);
    ecA(ctx, EE, () => { haak(ctx, 160, 1760, 680, 'eens: hoe kleiner de plek, hoe groter de onzekerheid', C.groen, 1); });
    nederland(ctx, 240, 450, 70, { a: EE * 0.9 }); zeshoek(ctx, 1800, 500, 30, rgba(C.goud, 0.4 * EE), rgba(C.goud, EE), 3); },

  // ---------- H3 De grens van de heide ----------
  s16(ctx, t, q) { bg(ctx, 'schema');
    const VE = 1, KD = q.on('kritische', 1, 0.8);
    tag(ctx, 'kritische depositiewaarde', 960, 170, C.goud, KD, 'center', 36);
    metaA(ctx, 'hierboven gaat het natuurtype op den duur achteruit', 960, 240, q.on('achteruitgaat', 1), C.grain, 'center', 26);
    // de som
    const S1 = q.on('kilo', 1, 0.6), S2 = q.on('gram', 1, 0.6), S3 = q.on('zevenhonderdveertien', 1, 0.6);
    ecA(ctx, Math.max(S1, 0), () => { roundRect(ctx, 560, 290, 940, 210, 16); shape(ctx, rgba(C.fill, 0.92), C.line, 1.5); });
    regel(ctx, '10 kg = 10 000 g', 620, 360, S1, C.text, 40, 'left', 700);
    regel(ctx, '÷ 14 g per mol', 620, 420, S2, C.text, 40, 'left', 700);
    regel(ctx, '≈ 714 mol', 620, 480, S3, C.goud, 40, 'left', 800);
    metaA(ctx, 'droge heide · per ha per jaar', 1470, 360, S1, C.grain, 'right', 24);
    metaA(ctx, '1 mol stikstof = 14 g', 1470, 420, S2, C.grain, 'right', 24);
    // getallenlijn
    const BA = q.on('veertienhonderd', 1, 0.6), HV = q.on('hoogveen', 1, 0.6);
    depLijn(ctx, 200, 1720, 760, 2500, { balk: 1400, balkA: BA, strepen: [[500, 'hoogveen', C.teal, HV], [714, 'droge heide', C.groen, S3]] });
    naamBij(ctx, '± 1400 · stel', 'ons zeshoekje', 200 + 1520 * 1400 / 2500, 610, BA * (1 - HV * 0), 'center');
    vraagteken(ctx, 1640, 560, q.on('denk', 1), 90); },

  s18(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord b: ongeveer twee keer de grens');
    const TW = q.on('twee', 1, 0.8), ZE = q.on('zeventig', 1, 0.6), MA = q.on('marge', 1, 1.0), BI = q.on('daarbinnen', 1, 0.6);
    regel(ctx, '1400 ÷ 714 ≈ 2', 200, 270, TW, C.text, 44, 'left', 700);
    regel(ctx, '70 % van 1400 ≈ 980', 200, 340, ZE, C.text, 40, 'left', 700);
    regel(ctx, '1400 − 980 ≈ 400   ·   1400 + 980 ≈ 2400', 200, 400, MA, C.koraal, 36, 'left', 700);
    const X = depLijn(ctx, 200, 1720, 760, 2500, { balk: 1400, balkA: 1, kdw: 714, kdwA: TW, strepen: [[500, 'hoogveen', C.teal, 0.35 * (1 - MA)], [714, 'droge heide', C.groen, 1]], marge: [420, 2380, MA] });
    naamBij(ctx, '± 1400 · stel', '', X(1400), 610, 1 - MA * 0.5, 'center');
    ecA(ctx, BI, () => { ctx.beginPath(); ctx.arc(X(714), 700, 46, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
    chip(ctx, 'de grens ligt binnen de marge', 1200, 480, C.goud, BI, 28);
    // daarom kijkt Bas ook naar de planten
    const BP = q.on('planten', 1, 0.4); ecA(ctx, BP, () => { ctx.fillStyle = '#2C3A34'; ctx.fillRect(1500, 260, 400, 14); for (let i = 0; i < 4; i++) struikhei(ctx, 1530 + i * 34, 262, 46, { seed: 70 + i }); grasPol(ctx, 1700, 262, 60, { seed: 3, kl: '#9CC070' }); });
    bas(ctx, 1810, t, { a: BP, voet: 270, h: 230, kijk: -1, pose: 'wijs' }); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const Y = 720, X0 = 160, X1 = 1760;
    zon(ctx, 1640, 230, 46, 1, t);
    // tijd: van arme heide naar een dichte grasmat met braam
    const AR = q.on('arme', 1, 0.6), JR = q.on('jaar', 1, 0.6), g = clamp((t - q.at('jaar', 1)) / Math.max(1, q.at('braam', 1) - q.at('jaar', 1) + 1.5), 0, 1);
    const LI = q.on('licht', 1, 1.2);
    ecA(ctx, JR, () => { pijl(ctx, 400, 200, 1300, 200, rgba(C.line, 0.8), 1, 3, 16); });
    metaA(ctx, 'jaar na jaar stikstof erbij', 850, 180, JR, C.grain, 'center', 26);
    // zandgrond
    ctx.fillStyle = KL_ZAND_D; ctx.globalAlpha = 0.45; ctx.fillRect(X0, Y, X1 - X0, 120); ctx.globalAlpha = 1; ctx.fillStyle = '#2C3A34'; ctx.fillRect(X0, Y, X1 - X0, 24);
    naamBij(ctx, 'arme zandgrond', '', 960, Y + 90, AR, 'center');
    const R = ecRng(31), dimH = 1 - 0.6 * LI;
    for (let i = 0; i < 11; i++) { const x = X0 + 60 + i * 140 + R() * 30; struikhei(ctx, x, Y, 100 + R() * 30, { seed: i + 1, a: dimH }); }
    for (let i = 0; i < 8; i++) { const x = X0 + 120 + i * 190 + R() * 30; tormentilPlant(ctx, x, Y, 80, { seed: i + 2, a: dimH * (1 - 0.7 * g) }); }
    // snelle groeiers
    const PS = q.on('pijpenstrootje', 1, 0.6), SM = q.on('smele', 1, 0.6), BR = q.on('braam', 1, 0.6);
    for (let i = 0; i < 6; i++) { const x = X0 + 100 + i * 260 + R() * 40; grasPol(ctx, x, Y, lerp(50, 230, g) * (0.85 + R() * 0.3), { a: Math.max(PS, 0.0), seed: i + 5, kl: '#9CC070', n: 12 }); }
    for (let i = 0; i < 5; i++) { const x = X0 + 230 + i * 290 + R() * 40; grasPol(ctx, x, Y, lerp(40, 170, g) * (0.85 + R() * 0.3), { a: SM, seed: i + 15, kl: '#B8C890', n: 16 }); }
    braamStruik(ctx, 1380, Y, lerp(120, 300, g), { a: BR, seed: 4 }); braamStruik(ctx, 520, Y, lerp(100, 260, g) * 0.9, { a: BR, seed: 9 });
    naamBij(ctx, 'struikhei', '', 300, Y - 160, q.on('Struikhei', 1) * (1 - PS), 'center');
    naamBij(ctx, 'tormentil', 'weinig voedsel', 690, Y - 175, q.on('tormentil', 1) * (1 - PS), 'center');
    naamBij(ctx, 'pijpenstrootje', '', X0 + 100 + 260 * 2 + 20, Y - lerp(50, 230, g) - 40, PS * (1 - LI), 'center');
    naamBij(ctx, 'bochtige smele', '', X0 + 230 + 290 * 3 + 20, Y - lerp(40, 170, g) - 40, SM * (1 - LI), 'center');
    naamBij(ctx, 'braam', '', 1380, Y - lerp(120, 300, g) - 30, BR * (1 - LI), 'center');
    // licht weg: schaduw boven de lage planten
    ecA(ctx, LI, () => { ctx.fillStyle = rgba('#0D1420', 0.25); ctx.fillRect(X0, Y - 150, X1 - X0, 150); });
    ecA(ctx, q.on('Meer', 1, 0.6), () => haak(ctx, 300, 1620, 250, 'meer groei, minder soorten', C.goud, 1)); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    veldScene(ctx, t, { x0: 0, x1: 1920, ven: 0, gras: 0.3, seed: 15 });
    ctx.fillStyle = KL_BOS; ctx.fillRect(1240, 120, 680, 680);
    for (let i = 0; i < 9; i++) circ(ctx, 1260 + i * 80, 160 + (i % 3) * 50, 90, i % 2 ? KL_BOS : KL_BOS_L);
    boomStam(ctx, 1120, 800, 520, 1);
    const NK = q.on('nestkast', 1, 0.6); nestkast(ctx, 1120, 470, 1, { a: 0.4 + 0.6 * NK, open: q.on('ei', 1) });
    // koolmees (dierenbibliotheek) op een zijtakje naast de nestkast; ± 14 cm tegen een kast van ± 30 cm
    ctx.fillStyle = '#5A4636'; ctx.beginPath(); ctx.moveTo(1094, 352); ctx.lineTo(960, 330); ctx.lineTo(958, 337); ctx.lineTo(1094, 364); ctx.closePath(); ctx.fill();
    const KM = q.on('koolmees', 1, 0.3); koolmees(ctx, 1010, 340, 0.45, { a: KM, kijk: 1 }); naamBij(ctx, 'koolmees', '', 1010, 225, KM * (1 - q.on('dun', 1)), 'center');
    naamBij(ctx, 'nestkast', 'bosrand', 1120, 360, NK * (1 - q.on('ei', 1)), 'center');
    bas(ctx, 560, t, { kijk: 1 }); naamBij(ctx, 'Ecoloog Bas', '', 560, 400, 1, 'center');
    daan(ctx, 830, t, { kijk: 1, pose: q.on('schrijft', 1) > 0.5 ? 'vasthouden' : 'wijs' }); naamBij(ctx, 'Daan', '', 830, 410, 1, 'center');
    // zoomcirkel: twee eieren naast elkaar
    const EI = q.on('ei', 1, 0.8), DU = q.on('dun', 1, 0.8);
    zoomCircle(ctx, 1560, 470, 230, 1120, 470, 'KOOLMEES-EI ± 1,7 CENTIMETER', EI, () => {
      ctx.fillStyle = '#2A3446'; ctx.fillRect(1320, 230, 480, 480); ctx.beginPath(); ctx.ellipse(1560, 560, 190, 70, 0, 0, 6.283); ctx.fillStyle = '#6A5A44'; ctx.fill();
      ei(ctx, 1450, 500, 140, { a: 1 - 0.5 * DU }); ei(ctx, 1680, 500, 140, { dun: 1, hl: DU }); });
    naamBij(ctx, 'normaal', '', 1450, 410, EI * DU * 0.8, 'center');
    naamBij(ctx, 'heel dun schaaltje', '', 1680, 640, DU, 'center');
    vraagteken(ctx, 960, 250, q.on('denk', 1), 90); },

  s22(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord c: te weinig kalk');
    // keten: bodem verzuurt → kalk spoelt weg → weinig slakken → dun ei
    const ZU = q.on('zuurder', 1, 0.6), SP = q.on('spoelt', 1, 2.2), WS = q.on('weinig', 1, 0.8), SL = q.on('slakkenhuisjes', 1, 0.6);
    bodemProfiel(ctx, 140, 340, 420, 400, { t, spoel: SP, zuur: ZU });
    naamBij(ctx, 'zandgrond', 'kalk = wit', 350, 800, 1, 'center');
    tag(ctx, 'zuurder', 350, 260, C.koraal, ZU, 'center', 30);
    pijl(ctx, 590, 540, 700, 540, C.line, Math.max(SL, WS), 3, 14);
    [[860, 470], [960, 560], [790, 610]].forEach(([x, y], i) => slakkenhuis(ctx, x, y, 34, { a: i === 0 ? 1 : 1 - 0.8 * WS }));
    naamBij(ctx, 'slakkenhuisjes', 'kalk voor de eischaal', 870, 380, SL, 'center');
    metaA(ctx, 'weinig slakken', 880, 720, WS, C.text2, 'center', 26);
    pijl(ctx, 1060, 540, 1170, 540, C.line, Math.max(SL, WS), 3, 14);
    const VE = q.on('Veluwe', 1, 0.6); ei(ctx, 1300, 520, 150, {}); ei(ctx, 1480, 520, 150, { dun: 1, hl: VE });
    naamBij(ctx, 'te dunne schaal', '', 1480, 660, VE, 'center');
    chip(ctx, 'gemeten in bossen op de Veluwe', 1390, 300, C.text2, VE, 26);
    chip(ctx, 'en jongen die hun pootjes breken', 1390, 760, C.text2, q.on('pootjes', 1), 26);
    ecA(ctx, q.on('alleen', 1, 0.6), () => { tag(ctx, 'stikstof raakt niet alleen planten', 960, 190 + 0, C.goud, 1, 'center', 34); }); },

  // ---------- H4 Van data naar besluit ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    // links: het Natura 2000-gebied en het project als grijs schetsje (stal of fabriek, geen keuze)
    const NA = q.on('Natura', 1, 0.6);
    ctx.save(); roundRect(ctx, 120, 170, 760, 330, 18); ctx.clip(); ctx.fillStyle = '#1E2E4A'; ctx.fillRect(120, 170, 760, 330); veldGrond(ctx, { x0: 120, x1: 880, y: 450, ven: 1, venX: 160, venW: 200, gras: 0.3, seed: 18 }); ctx.restore();
    ecA(ctx, NA, () => { roundRect(ctx, 110, 160, 780, 350, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([16, 10]); ctx.stroke(); ctx.setLineDash([]); });
    naamBij(ctx, 'Natura 2000-gebied', '', 500, 150 - 10, NA, 'center');
    const PR = q.on('stal', 1, 0.6); stalZij(ctx, 300, 790, 0.6, { a: PR, schets: true }); fabriekZij(ctx, 650, 790, 0.6, { a: PR, schets: true });
    naamBij(ctx, 'project', 'stal of fabriek · schets', 480, 840 - 10, PR, 'center');
    vraagteken(ctx, 480, 620, q.on('schaden', 1) * (1 - q.on('passende', 1)), 80);
    // rechts: de ecoloog en het rapport
    const PB = q.on('passende', 1, 0.6), EC = q.on('ecoloog', 1, 0.5);
    bas(ctx, 1050, t, { a: Math.max(EC, 0), kijk: 1, pose: 'vasthouden' }); naamBij(ctx, 'Ecoloog Bas', '', 1050, 420, EC, 'center');
    const n = q.on('natuurtypen', 1, 0.6) + q.on('grens', 1, 0.6) + q.on('valt', 1, 0.6) + q.on('project', 1, 0.6) + q.on('natuur', 3, 0.6);
    rapport(ctx, 1220, 200, 600, ['natuurtypen', 'hun grens', 'wat er al valt', 'wat het project erbij doet', 'hoe het met de natuur gaat'], { a: PB, n, px: 30 }); },

  s24(ctx, t, q) { bg(ctx, 'schema');
    veldScene(ctx, t, { x0: 0, x1: 1920, ven: 0, gras: 0.3, seed: 19 });
    rapport(ctx, 1150, 170, 560, ['natuurtypen', 'hun grens', 'wat er al valt', 'wat het project erbij doet', 'hoe het met de natuur gaat'], { a: 1, px: 28 });
    daan(ctx, 560, t, { kijk: 1, pose: q.on('beslist', 1) > 0.5 ? 'denk' : 'staan' }); naamBij(ctx, 'Daan', '', 560, 410, 1, 'center');
    bas(ctx, 860, t, { kijk: -1 }); naamBij(ctx, 'Ecoloog Bas', '', 860, 400, 1, 'center');
    tag(ctx, 'wie beslist?', 560, 270, C.goud, q.on('beslist', 1), 'center', 36);
    vraagteken(ctx, 1000, 280, q.on('denk', 1), 90); },

  s26(ctx, t, q) { bg(ctx, 'schema'); ec2Antwoord(ctx, 'antwoord a: de provincie, met het rapport');
    const EC = q.on('ecoloog', 1, 0.5); bas(ctx, 240, t, { a: 1, kijk: 1, pose: 'vasthouden', voet: 780, h: 360 }); naamBij(ctx, 'ecoloog', 'metingen · natuuroordeel', 240, 370, EC, 'center');
    rapport(ctx, 470, 420, 330, ['natuur', 'grens', 'stikstof', 'project', 'oordeel'], { a: 1, px: 22, kop: 'RAPPORT' });
    const RV = q.on('rekenmodel', 1, 0.6); rekenScherm(ctx, 640, 260, 0.9, RV); naamBij(ctx, 'RIVM', 'rekenmodel', 790, 250, RV, 'left'); pijl(ctx, 640, 330, 640, 410, C.line, RV, 2, 12);
    const PV = q.on('provincie', 1, 0.6); pijl(ctx, 830, 600, 1000, 600, C.line, PV, 3, 16);
    provincieGebouw(ctx, 1170, 720, 1, { a: 0.4 + 0.6 * PV, hl: PV * (1 - q.on('toestemming', 1)) }); naamBij(ctx, 'provincie', 'meestal', 1170, 790, PV, 'center');
    const TS = q.on('toestemming', 1, 0.6); pijl(ctx, 1320, 600, 1450, 600, C.line, TS, 3, 16);
    ecA(ctx, TS, () => stempel(ctx, 1620, 610, 'besluit', C.goud, 1, -0.08));
    chip(ctx, 'pas toestemming als zeker is dat de natuur niet achteruitgaat', 1250, 200, C.groen, TS, 28);
    metaA(ctx, 'europese regels · vereenvoudigd', 1250, 270, q.on('Europese', 1), C.grain, 'center', 24); },

  s27(ctx, t, q) { bg(ctx, 'schema');
    regel(ctx, 'waar komt de depositie vandaan?', 120, 150, 1, C.text, 40, 'left', 700);
    const T = q.on('2024', 1, 1.0), LB = q.on('landbouw', 1, 0.6), BU = q.on('buitenland', 1, 0.6);
    taart(ctx, 560, 500, 230, [[50, ['Nederlandse landbouw', '± de helft'], '#8A9A7A', LB], [33, ['buitenland', '± een derde'], '#6A7A94', BU], [17, ['rest van Nederland', ''], '#4E5A70', BU]], { a: T, groei: T });
    metaA(ctx, 'heel Nederland · 2024', 560, 820, T, C.grain, 'center', 26);
    // 2021: verkeer en industrie
    const V = q.on('Verkeer', 1, 0.8), I = q.on('industrie', 1, 0.8); const BX = 1330, BW = 500;
    metaA(ctx, 'aandeel in 2021', BX, 330, V, C.grain, 'left', 26);
    [['verkeer', 12.9, V, '12,9 %'], ['industrie', 1.7, I, '1,7 %']].forEach(([nm, v, a, lab], i) => { const y = 400 + i * 120; ecA(ctx, a, () => { text(ctx, nm, BX, y, fTekst(34, 600), C.text, 'left'); roundRect(ctx, BX + 200, y - 34, BW * v / 50 * a + 6, 44, 8); shape(ctx, '#7A8698', '#9AA8BE', 1.5); text(ctx, lab, BX + 220 + BW * v / 50 + 10, y, fTekst(32, 700), C.text, 'left'); }); });
    metaA(ctx, 'schaal: 50 % = volle breedte', BX, 640, V, C.text2, 'left', 24);
    chip(ctx, 'per gebied verschilt het', 1480, 720, C.goud, q.on('gebied', 1), 28);
    chip(ctx, 'wat je ermee doet: aan het bestuur', 1480, 800, C.text2, q.on('bestuur', 1), 26); },

  // ---------- Recap ----------
  s28(ctx, t, q) { bg(ctx, 'schema');
    const C0 = [960, 470]; zeshoek(ctx, C0[0], C0[1], 90, rgba(C.goud, 0.35), C.goud, 4);
    const A1 = q.on('neer', 1, 0.6), A2 = q.on('Gemeten', 1, 0.6), A3 = q.on('grens', 1, 0.6), A4 = q.on('ecoloog', 1, 0.6);
    ec2Kaart(ctx, 130, 170, 640, 'VAN DICHTBIJ EN VAN VER', [['stal en snelweg → depositie', '•']], { a: A1, px: 30 });
    gasWolk(ctx, 820, 300, 40, C.oker, A1, t, 1); gasWolk(ctx, 870, 340, 34, KL_NOX, A1, t, 2);
    ec2Kaart(ctx, 1150, 170, 640, 'METEN EN REKENEN', [['buisje: ammoniak in de lucht', 'v'], ['één plek: onzeker', '!']], { a: A2, n: A2 + q.on('onzeker', 1, 0.6), px: 30 });
    ec2Kaart(ctx, 130, 580, 640, 'BOVEN DE GRENS', [['grassen en braam winnen', '!'], ['verzuring: tot in het ei', '!']], { a: A3, n: A3 + q.on('Verzuring', 1, 0.6), px: 30 });
    ei(ctx, 880, 690, 90, { dun: 1, a: q.on('koolmees', 1) });
    ec2Kaart(ctx, 1150, 580, 640, 'VAN DATA NAAR BESLUIT', [['ecoloog schrijft het op', 'v'], ['het bestuur beslist', '•']], { a: A4, n: A4 + q.on('bestuur', 1, 0.6), px: 30 }); },

  s29(ctx, t, q) { bg(ctx, 'schema');
    regel(ctx, 'waar leer je dit?', 120, 150, 1, C.text, 40, 'left', 700);
    opleidingKaart(ctx, 120, 210, 820, 'HBO · VIER JAAR', 'Bos- en natuurbeheer', 'Velp', q.on('hbo-opleiding', 1, 0.6));
    opleidingKaart(ctx, 980, 210, 820, 'WO · BACHELOR', 'Biologie', 'Nijmegen', q.on('Nijmegen', 1, 0.6));
    opleidingKaart(ctx, 120, 400, 820, 'WO · BACHELOR', 'Bos- en natuurbeheer', 'Wageningen', q.on('Wageningen', 1, 0.6));
    opleidingKaart(ctx, 980, 400, 820, 'MBO', 'bij een groene school', '', q.on('mbo', 1, 0.6));
    const WP = q.on('werkt', 1, 0.6);
    metaA(ctx, 'je werkt dan bij', 960, 640, WP, C.grain, 'center', 26);
    [['een natuurbeheerder', 'natuurbeheerder,'], ['een provincie', 'provincie'], ['een adviesbureau', 'adviesbureau']].forEach(([nm, w], i) => tag(ctx, nm, 460 + i * 500, 730, C.groen, q.on(w, 1, 0.5), 'center', 32)); }
});

// stal als icoon van boven/zijkant (klein, voor kaarten); schets = grijs gestippeld
function stalIcoon(ctx, x, y, s = 1, a = 1, schets = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (schets) ctx.setLineDash([8, 6]);
  ctx.beginPath(); ctx.moveTo(-50, 26); ctx.lineTo(-50, -10); ctx.lineTo(0, -40); ctx.lineTo(50, -10); ctx.lineTo(50, 26); ctx.closePath(); shape(ctx, schets ? 'rgba(126,136,154,0.2)' : '#8A5A44', schets ? KL_SCHETS : '#B88A6A', 2);
  if (!schets) { ctx.fillStyle = '#5A3A2E'; ctx.fillRect(-12, 0, 24, 26); roundRect(ctx, 56, -40, 22, 66, 6); shape(ctx, '#9AA3B2', '#C9CED6', 1.5); }
  ctx.setLineDash([]); ctx.restore(); }

// erf van de boerderij in zijaanzicht: verharde grond en een houten hek aan de kant van de heide
function ec2Erf(ctx, x0, x1, y) { ctx.save(); ctx.fillStyle = '#3E3A34'; ctx.fillRect(x0, y, x1 - x0, 90); ctx.fillStyle = rgba('#8A8270', 0.35); ctx.fillRect(x0, y, x1 - x0, 10);
  ctx.strokeStyle = rgba('#A89E88', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  ctx.fillStyle = '#7A6450'; for (let i = 0; i < 3; i++) { const px = x0 + 6 + i * 26; ctx.fillRect(px, y - 62, 7, 62); } ctx.fillRect(x0, y - 52, 66, 6); ctx.fillRect(x0, y - 28, 66, 6); ctx.restore(); }

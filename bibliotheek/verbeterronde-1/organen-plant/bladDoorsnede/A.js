// =====================================================================================
// BLAD IN DOORSNEDE — dwarsdoorsnede van een tweezaadlobbig blad (micro), met huidmondjes en gaswisseling.
// Recept (boven → onder): cuticula (dun waslaagje) – bovenopperhuid (één laag platte, doorzichtige cellen, geen
// bladgroenkorrels) – palissadeweefsel (1–2 lagen lange, rechtopstaande cellen vol bladgroenkorrels) – sponsweefsel
// (onregelmatige cellen met grote luchtholtes) met een nerf (vaatbundel: hout boven, bast onder, met schedecellen) –
// onderopperhuid met de meeste huidmondjes: twee boonvormige sluitcellen (mét bladgroenkorrels) rond een spleet,
// erboven een luchtholte. Open: CO2 de luchtholtes in, O2 en waterdamp naar buiten. Dicht: spleet weg.
// Bron: LibreTexts Botany Lab Manual 9.3 (lagen, palissade, sponsweefsel met luchtholtes, hout boven/bast onder,
// sluitcellen). Bekende fouten: palissade onder het sponsweefsel; huidmondjes
// alleen bovenop; sluitcellen zonder bladgroen; geen luchtholtes; opperhuid groen.
// Ontwerp: breedte ± 760 (x −380..380), hoogte ± 420 (y −210..210), oorsprong = midden. Aanpak A: platte
// doorsnede (micro), elke cel apart met bladgroenkorrels; gas als kleine moleculen door de huidmondjes.
// o: a, t, open (0..1 huidmondjes), gas (0..1), hi ('cuticula','opperhuid','palissade','spons','nerf','huidmondje')
// =====================================================================================
function bladDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, open = 1, gas = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const HM = [-230, 190]; // huidmondjes (x)
  const anker = { cuticula: W(-300, -206), opperhuid: W(-300, -186), palissade: W(-250, -120), spons: W(-120, 60), nerf: W(0, 40), huidmondje: W(HM[0], 166), onderopperhuid: W(100, 160) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.rect(-380, -230, 760, 460); ctx.clip();
  const CEL = '#B9D6A0', CELr = '#7FA868', HUID = '#DDE8CF', BGK = '#4F8F5A', LUCHT = C.bgMicro;
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  const cel = (pts, fill, rand, key, korrels) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = hi === key ? C.goud : rand; ctx.lineWidth = 2; ctx.stroke();
    if (korrels) { const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length; ctx.fillStyle = BGK; korrels.forEach(([kx, ky]) => { ctx.beginPath(); ctx.ellipse(cx + kx, cy + ky, 5, 3.4, 0.4, 0, 6.283); ctx.fill(); }); }
    ctx.restore(); };
  // achtergrond: lucht in het blad (tussen de cellen)
  ctx.fillStyle = LUCHT; ctx.fillRect(-380, -204, 760, 381);
  // bovenopperhuid
  for (let i = 0; i < 18; i++) { const x0 = -380 + i * 44; cel([[x0 + 2, -196], [x0 + 42, -196], [x0 + 42, -172], [x0 + 2, -172]], HUID, '#A9BC94', 'opperhuid'); }
  // palissade: lange cellen (± 3× zo hoog als breed), vol bladgroenkorrels langs de wand
  for (let i = 0; i < 26; i++) { const x0 = -380 + i * 30 + (hash(i) - 0.5) * 3; const h = 104 + hash(i + 3) * 10; const kor = []; for (let k = 0; k < 8; k++) kor.push([(k % 2 ? 8 : -8), -h * 0.4 + k * h * 0.11]);
    cel([[x0 + 2, -168], [x0 + 27, -168], [x0 + 27, -168 + h], [x0 + 15, -164 + h + 4], [x0 + 2, -168 + h]], CEL, CELr, 'palissade', kor); }
  // sponsweefsel: ronde, onregelmatige cellen met veel lucht ertussen
  const SP = []; for (let i = 0; i < 60; i++) { const cx = -370 + (i % 15) * 52 + (Math.floor(i / 15) % 2) * 26 + (hash(i * 3) - 0.5) * 14, cy = -40 + Math.floor(i / 15) * 44 + (hash(i * 5) - 0.5) * 12; if (Math.abs(cx) < 70 && cy < 110) continue; if (HM.some(h => Math.abs(cx - h) < 34 && cy > 70)) continue; SP.push([cx, cy, i]); }
  SP.forEach(([cx, cy, i]) => { const r = 19 + hash(i) * 5; const P = []; for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283; const rr = r * (0.8 + 0.35 * hash(i * 10 + k)); P.push([cx + Math.cos(an) * rr * 1.15, cy + Math.sin(an) * rr * 0.85]); } cel(P, CEL, CELr, 'spons', [[-6, -4], [6, 2], [0, 8]]); });
  // nerf (vaatbundel): schede, hout (boven, dikwandige vaten), bast (onder, kleine cellen)
  ctx.save(); ctx.globalAlpha *= dimF('nerf'); ctx.beginPath(); ctx.ellipse(0, 30, 66, 74, 0, 0, 6.283); ctx.fillStyle = '#D6CFA8'; ctx.fill(); ctx.strokeStyle = hi === 'nerf' ? C.goud : '#A89C6A'; ctx.lineWidth = 2; ctx.stroke();
  for (const [vx, vy, vr] of [[-24, 0, 11], [0, -8, 13], [24, 0, 11], [-12, 22, 9], [12, 22, 9]]) { ctx.beginPath(); ctx.arc(vx, vy, vr, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.55); ctx.fill(); ctx.strokeStyle = '#6E8FA6'; ctx.lineWidth = 3; ctx.stroke(); }
  for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.arc(-30 + (k % 5) * 15, 58 + Math.floor(k / 5) * 12, 6, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.6); ctx.fill(); } ctx.restore();
  // onderopperhuid met huidmondjes
  for (let i = 0; i < 18; i++) { const x0 = -380 + i * 44; if (HM.some(h => x0 + 44 > h - 30 && x0 < h + 30)) continue; cel([[x0 + 2, 150], [x0 + 42, 150], [x0 + 42, 172], [x0 + 2, 172]], HUID, '#A9BC94', 'opperhuid'); }
  HM.forEach(hx => { const sp = lerp(1, 9, open); ctx.save(); ctx.globalAlpha *= dimF('huidmondje');
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + sd * (14 + sp), 162, 13, 15, 0, 0, 6.283); ctx.fillStyle = CEL; ctx.fill(); ctx.strokeStyle = hi === 'huidmondje' ? C.goud : CELr; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = BGK; ctx.beginPath(); ctx.ellipse(hx + sd * (14 + sp), 160, 4, 3, 0, 0, 6.283); ctx.fill(); }
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.rect(hx + sd * (30 + sp) - (sd < 0 ? 4 : 0) - 2, 150, 8, 22); ctx.fillStyle = HUID; ctx.fill(); } ctx.restore(); });
  // cuticula boven en onder
  ctx.save(); ctx.globalAlpha *= dimF('cuticula'); ctx.fillStyle = hi === 'cuticula' ? C.goud : rgba('#E8D9A0', 0.85); ctx.fillRect(-380, -204, 760, 7); ctx.fillRect(-380, 173, 760, 4); ctx.restore();
  // gassen
  if (gas > 0.01 && open > 0.2) { ctx.save(); ctx.globalAlpha *= gas * open; HM.forEach((hx, j) => { for (let k = 0; k < 8; k++) { const u = (t * 0.3 + k / 8 + j * 0.3) % 1; const soort = k % 3; // 0 = CO2 in, 1 = O2 uit, 2 = water uit
        const P = soort === 0 ? [[hx + (hash(k) - 0.5) * 20, 230], [hx, 160], [hx + (hash(k + 3) - 0.5) * 120, 80], [hx + (hash(k + 5) - 0.5) * 140, -40]] : [[hx + (hash(k) - 0.5) * 140, 40], [hx, 120], [hx, 162], [hx + (hash(k + 7) - 0.5) * 30, 230]];
        const p = bioPunt(P, u); ctx.save(); ctx.globalAlpha *= Math.min(1, u * 5, (1 - u) * 5);
        if (soort === 0) { ctx.fillStyle = '#AEB6C2'; ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(p[0] + sd * 7, p[1], 3.2, 0, 6.283); ctx.fill(); } }
        else if (soort === 1) { ctx.fillStyle = C.teal; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(p[0] + sd * 3.6, p[1], 3.8, 0, 6.283); ctx.fill(); } }
        else { ctx.fillStyle = lighten(C.teal, 0.35); ctx.beginPath(); ctx.arc(p[0], p[1], 3.4, 0, 6.283); ctx.fill(); }
        ctx.restore(); } }); ctx.restore(); }
  ctx.restore(); return anker;
}

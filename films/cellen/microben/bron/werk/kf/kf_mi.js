// Keyframes en testvel voor mi. Elke functie tekent één still op 1920×1080.
const KF = {};
KF.testvel = (ctx) => { bg(ctx, 'schema');
  metaText(ctx, 'testvel · microben · nieuwe tekeningen', 60, 60, C.goud);
  miTrommel(ctx, 230, 260, 300, { open: 0, binnen: (c, x, y, wb) => miBoterham(c, x, y + 6, wb * 0.62, { rot: -0.08, schimmel: [{ u: 0.3, v: 0.35, r: 0.16, k: 1, soort: 'zwart' }, { u: 0.68, v: 0.6, r: 0.12, k: 0.9, soort: 'groen', seed: 5 }, { u: 0.55, v: 0.25, r: 0.06, k: 0.7, soort: 'zwart', seed: 8 }] }) });
  metaText(ctx, 'trommel dicht', 230, 460, C.text2, 'center', 24);
  miTrommel(ctx, 230, 600, 300, { open: 1, binnen: (c, x, y, wb) => miBoterham(c, x, y + 6, wb * 0.62, { rot: -0.08, schimmel: [{ u: 0.3, v: 0.35, r: 0.16, k: 1, soort: 'zwart' }, { u: 0.68, v: 0.6, r: 0.12, k: 0.9, soort: 'groen', seed: 5 }] }) }); metaText(ctx, 'trommel open dag 7', 230, 800, C.text2, 'center', 24);
  miBoterham(ctx, 640, 260, 220, {}); metaText(ctx, 'dag 0', 640, 400, C.text2, 'center', 24);
  miBoterham(ctx, 900, 260, 220, { schimmel: [{ u: 0.35, v: 0.4, r: 0.12, k: 0.45, soort: 'zwart' }, { u: 0.7, v: 0.65, r: 0.1, k: 0.35, soort: 'groen', seed: 5 }] }); metaText(ctx, 'dag 4', 900, 400, C.text2, 'center', 24);
  miKolonie(ctx, 1180, 250, 110, 1, 'zwart', 0, 3); metaText(ctx, 'rhizopus', 1180, 400, C.text2, 'center', 24);
  miKolonie(ctx, 1450, 250, 110, 1, 'groen', 0, 5); metaText(ctx, 'penicillium', 1450, 400, C.text2, 'center', 24);
  miVirus(ctx, 1700, 230, 70, {}); miVirus(ctx, 1830, 230, 50, { envelop: 1 }); metaText(ctx, 'virussen', 1760, 400, C.text2, 'center', 24);
  miMycelium(ctx, 900, 760, 560, 420, { k: 1, sporen: 1, enz: 0.6 }); metaText(ctx, 'mycelium + sporendragers', 900, 1000, C.text2, 'center', 24);
  [0, 0.3, 0.6, 0.9, 1].forEach((f, i) => miBacterie(ctx, 1260 + i * 130 - (i === 4 ? 0 : 0), 560, 60, { fase: f, flagel: i === 0, rot: 0 }));
  metaText(ctx, 'tweedeling fase 0 → 1', 1520, 640, C.text2, 'center', 24);
  miBacterie(ctx, 1450, 800, 240, { flagel: true }); miGist(ctx, 1720, 760, 70, {}); miSpore(ctx, 1640, 930, 20, { kiem: 0.8 }); miFaag(ctx, 1840, 900, 0.7, {});
};
const FL = 820;
function vloer(ctx, col = '#22324E') { ctx.fillStyle = col; ctx.fillRect(0, FL, W, H - FL); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, FL); ctx.lineTo(W, FL); ctx.stroke(); }
function tafel(ctx, x0, x1, y, col = '#3A4A66') { roundRect(ctx, x0, y, x1 - x0, 22, 6); shape(ctx, col, rgba(C.line, 0.6), 2); ctx.fillStyle = col; ctx.fillRect(x0 + 30, y + 22, 18, FL - y - 22); ctx.fillRect(x1 - 48, y + 22, 18, FL - y - 22); }
function kast(ctx) { ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, 0, W, FL); [[120, 120, 420, 240], [1380, 120, 420, 240]].forEach(([x, y, w, h]) => { roundRect(ctx, x, y, w, h, 10); shape(ctx, '#33466A', rgba(C.line, 0.5), 2); }); }
KF.t1cold = (ctx) => { bg(ctx, 'schema'); kast(ctx); vloer(ctx, '#22324E'); tafel(ctx, 560, 1360, 600, '#8C6A44');
  miTrommel(ctx, 960, 540, 300, { open: 0.85, binnen: (c, x, y, wb) => miBoterham(c, x, y + 4, wb * 0.62, { rot: -0.06, schimmel: [{ u: 0.32, v: 0.4, r: 0.16, k: 1, soort: 'groen', seed: 5 }, { u: 0.66, v: 0.62, r: 0.13, k: 1, soort: 'zwart' }, { u: 0.6, v: 0.25, r: 0.06, k: 0.8, soort: 'groen', seed: 9 }] }) });
  persoon(ctx, 'noor', 1500, FL, 560, { t: 0, uit: 'verbaasd', kijk: -1 }); persoon(ctx, 'kind', 470, FL, 420, { t: 0, uit: 'verbaasd', pose: 'wijs', kijk: 1 });
  bubbel(ctx, 380, 330, "Er groeit een plantje!"); metaText(ctx, 'een week vergeten', 960, 300, C.goud, 'center'); };
KF.t2schalen = (ctx) => { bg(ctx, 'schema'); vloer(ctx); tafel(ctx, 380, 1540, 620);
  persoon(ctx, 'visser', 250, FL, 600, { t: 0, outfit: 'practicum', pose: 'staan', kijk: 1, uit: 'neutraal' }); persoon(ctx, 'noor', 1680, FL, 560, { t: 0, outfit: 'practicum', pose: 'denk', kijk: -1, uit: 'neutraal' });
  miSchaal(ctx, 660, 440, 130, { kol: 0.1, seed: 1, label: 'dicht gebleven' }); miSchaal(ctx, 960, 440, 130, { kol: 1, seed: 2, label: 'vingers' }); miSchaal(ctx, 1260, 440, 130, { kol: 0.45, seed: 3, label: 'lucht' });
  metaText(ctx, 'dicht laten · niet openen · kamertemperatuur', 960, 200, C.koraal, 'center'); };
KF.t3tuin = (ctx) => { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5FA86E'; ctx.fillRect(0, 560, W, 40); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 600, W, 300);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 600, W, 300); ctx.clip(); miPaddenstoel(ctx, 800, 600, 0.4, { draden: 0 }); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(0, 600, W, 300); ctx.clip(); miPaddenstoel(ctx, 800, 600, 1.6, { a: 1, draden: 1, alleenDraden: true }); ctx.restore(); miPaddenstoel(ctx, 800, 600, 0.4, { draden: 0 });
  persoon(ctx, 'kind', 1080, 600, 440, { t: 0, pose: 'vasthouden', kijk: -1, uit: 'blij', hold: (c, x, y) => { roundRect(c, x - 40, y - 60, 80, 100, 6); shape(c, '#F2F2EE', '#9AA3B2', 2); miPaddenstoel(c, x, y + 20, 0.25, { draden: 0.6 }); } });
  naamBij(ctx, 'paddenstoel', 'VRUCHTLICHAAM', 560, 470); naamBij(ctx, 'mycelium', 'DRADEN IN DE GROND', 1140, 760); };
KF.t4oven = (ctx) => { bg(ctx, 'schema'); vloer(ctx); tafel(ctx, 520, 1400, 600, '#5A6A84');
  const rnd = miRng(4); for (let i = 0; i < 60; i++) { const x = 560 + rnd() * 800, y = 120 + rnd() * 440; circ(ctx, x, y, 3 + rnd() * 2, rgba('#C8CED6', 0.8)); }
  miBoterham(ctx, 820, 560, 170, {}); miBoterham(ctx, 1000, 560, 170, {}); roundRect(ctx, 1120, 470, 220, 130, 50); shape(ctx, MI.korst, MI.korstR, 2);
  metaText(ctx, 'sporen uit de lucht', 960, 100, C.goud, 'center'); metaText(ctx, 'afkoelen · snijden · inpakken', 960, 680, C.text2, 'center'); };
KF.t5nies = (ctx) => { bg(ctx, 'schema'); vloer(ctx); tafel(ctx, 700, 1500, 620);
  persoon(ctx, 'visser', 1640, FL, 600, { t: 0, outfit: 'practicum', pose: 'wijs', kijk: -1, uit: 'neutraal' }); persoon(ctx, 'noor', 300, FL, 560, { t: 0, outfit: 'practicum', pose: 'denk', kijk: 1, uit: 'neutraal' });
  miSchaal(ctx, 1180, 450, 130, { kol: 0, dicht: 0 }); kruis(ctx, 1180, 450, 70, 1, C.koraal); metaText(ctx, 'niet op school', 1180, 290, C.koraal, 'center');
  bubbel(ctx, 1500, 260, "Niezen op een schaaltje doen we niet.");
  ctx.save(); ctx.beginPath(); ctx.arc(720, 330, 150, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.clip(); miVirus(ctx, 670, 320, 70, { envelop: 1 }); miVirus(ctx, 800, 360, 22, {}); ctx.restore();
  ctx.beginPath(); ctx.arc(720, 330, 150, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.stroke(); metaText(ctx, 'griepvirus · verkoudheidsvirus', 720, 530, C.grain, 'center'); };

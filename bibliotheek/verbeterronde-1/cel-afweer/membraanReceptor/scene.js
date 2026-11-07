function scene(ctx) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 760, 720); ctx.clip();
  membraanReceptor(ctx, 380, 330, 2.3, { bind: 1, signaal: 0, breed: 360 });
  ctx.restore();
  // standen: los · ligand gebonden + signaal · steroïd naar de kern (intracellulaire receptor)
  membraanReceptor(ctx, 860, 200, 0.85, { bind: 0, breed: 95 });
  membraanReceptor(ctx, 1080, 200, 0.85, { bind: 1, signaal: 1, breed: 95 });
  ctx.save(); ctx.beginPath(); ctx.rect(760, 390, 520, 300); ctx.clip();
  membraanReceptor(ctx, 980, 440, 0.85, { soort: 'intern', f: 0.85, breed: 200, kern: [10, 150] });
  ctx.restore();
  ctx.beginPath(); ctx.arc(990, 640, 70, Math.PI * 1.05, Math.PI * 1.95); ctx.strokeStyle = C.kernR; ctx.lineWidth = 3; ctx.stroke(); // kernrand
  membraanReceptor(ctx, 1190, 640, 0.42, { bind: 1, breed: 60 });
}

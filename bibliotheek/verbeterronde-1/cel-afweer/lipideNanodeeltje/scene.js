function scene(ctx) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 760, 720); ctx.clip();
  lipideNanodeeltje(ctx, 370, 340, 190, { f: 0, membraan: false });
  ctx.restore();
  // standen: instulpen · endosoom zuur · mRNA vrij met ribosomen
  for (const [i, f] of [[0, 0.3], [1, 0.62], [2, 1]]) { ctx.save(); ctx.beginPath(); ctx.rect(800 + i * 160, 60, 150, 470); ctx.clip(); lipideNanodeeltje(ctx, 875 + i * 160, 130, 30, { f, breed: 75 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.rect(1100, 560, 180, 160); ctx.clip(); lipideNanodeeltje(ctx, 1190, 600, 13, { f: 0, breed: 70 }); ctx.restore();
}

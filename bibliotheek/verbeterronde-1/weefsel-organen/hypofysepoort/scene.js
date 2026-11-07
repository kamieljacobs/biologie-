function scene(ctx){ const t=1.3;
  hypofysePoort(ctx, 400, 330, 0.56, {puls:0.55, aan:1, uit:1, t, volgLH:0.5});
  hypofysePoort(ctx, 1010, 190, 0.22, {puls:0.15, aan:0, uit:0, t});
  hypofysePoort(ctx, 1010, 450, 0.22, {aan:1, uit:1, t:t+2});
  hypofysePoort(ctx, 1200, 650, 0.085, {aan:1, uit:1, t});
}

function scene(ctx){
  zaadcelEcht(ctx, 1000, 200, 0, 0.1, 6.5);            // groot
  [0, 0.12, 0.24].forEach((t,i)=> zaadcelEcht(ctx, 330+i*330, 470, 0, t, 2.2)); // fasen van de slag
  zaadcelEcht(ctx, 1200, 640, 0, 0.3, 0.7); zaadcelEcht(ctx, 1210, 690, -0.3, 0.5, 0.45); // klein, zoals in een film
  zaadcelEcht(ctx, 900, 660, 0.2, 0.2, 1.0);
}

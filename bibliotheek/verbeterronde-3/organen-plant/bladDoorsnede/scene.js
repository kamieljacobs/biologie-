// groot: open huidmondje met CO2 in, O2 uit en waterdamp uit; rechts: dicht (geen gaswisseling, geen verdamping) en open; klein
function scene(ctx){ bladDoorsnede(ctx, 420, 300, 1.0, { open: 1, gas: 1, t: 1.3 });
  bladDoorsnede(ctx, 1030, 170, 0.4, { open: 0, gas: 1, t: 1.3 }); bladDoorsnede(ctx, 1030, 450, 0.4, { open: 1, gas: 1, t: 2.1 });
  bladDoorsnede(ctx, 1180, 665, 0.12, { open: 1, gas: 1, t: 1.3 }); }

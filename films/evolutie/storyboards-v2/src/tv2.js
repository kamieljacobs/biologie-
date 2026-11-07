const TV2 = {
  vel1(ctx) { macroNacht(ctx, { horizon: 520 }); metaText(ctx, 'TESTVEL FILM 2 + 3 · RONDE 1', 80, 70, C.text2);
    // grondvinken: snavel 8, 9,3, 11 mm; man
    grondvink(ctx, 200, 420, 1.4, { snavel: 8 }); grondvink(ctx, 520, 420, 1.4, { snavel: 9.3 }); grondvink(ctx, 840, 420, 1.4, { snavel: 11 }); grondvink(ctx, 1160, 420, 1.4, { snavel: 10, kleed: 'man' });
    naamBij(ctx, '8 mm', null, 200, 470, 1, 'center'); naamBij(ctx, '9,3 mm', null, 520, 470, 1, 'center'); naamBij(ctx, '11 mm', null, 840, 470, 1, 'center'); naamBij(ctx, 'man', null, 1160, 470, 1, 'center');
    tribulus(ctx, 1400, 380, 1.4); zaadje(ctx, 1520, 400, 1.4); zaadje(ctx, 1550, 410, 1.4);
    merel(ctx, 1700, 460, 1.6);
    blad(ctx, 120, 760, 300, { rot: -0.08 }); rups(ctx, 360, 760, 1.2, {});
    rups(ctx, 900, 820, 0.9, { krom: 0.6, kleur: '#C9A35C' });
    daphneMajor(ctx, 1450, 860, 700);
  },
  vel2(ctx) { macroNacht(ctx, { horizon: 640 }); metaText(ctx, 'TESTVEL FILM 3 · RONDE 1', 80, 70, C.text2);
    schors(ctx, 60, 120, 360, 420, { roet: 0 }); berkenspanner(ctx, 240, 260, 0.5, { vorm: 'licht' }); berkenspanner(ctx, 240, 430, 0.5, { vorm: 'zwart' });
    schors(ctx, 460, 120, 360, 420, { roet: 1 }); berkenspanner(ctx, 640, 260, 0.5, { vorm: 'licht' }); berkenspanner(ctx, 640, 430, 0.5, { vorm: 'zwart' });
    pauw(ctx, 1220, 620, 1.2); pauwin(ctx, 1700, 620, 1.2);
    edelhert(ctx, 360, 1000, 1.2); edelhert(ctx, 900, 1000, 1.0, { kop: 0.9, kijk: -1 });
    zaadkraker(ctx, 1200, 900, 1.2, { snavel: 'klein' }); zaadkraker(ctx, 1500, 900, 1.2, { snavel: 'groot' });
  },
  vel3(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 3 · RONDE 1', 80, 70, C.text2);
    pauw(ctx, 520, 820, 1.3, { waaier: 1 });
    orchideeBladeren(ctx, 1200, 820, 0.9); orchidee(ctx, 1260, 300, 1.4); pijlstaart(ctx, 1600, 260, 1.6, { tong: 1, tongEind: [-180, 170] });
    babyWeegschaal(ctx, 1000, 980, 300, { kg: '3,6 kg' }); persoon(ctx, 'baby', 1000, 880, 190, { uit: 'blij' });
    persoon(ctx, 'mirjam', 1820, 1000, 380, { uit: 'blij' });
  },
};
TV2.zoom = function (ctx) { macroNacht(ctx, { horizon: 300 }); metaText(ctx, 'ZOOM: AANHECHTINGEN', 80, 70, C.text2);
  grondvink(ctx, 300, 560, 3.2, { snavel: 8 }); grondvink(ctx, 1000, 560, 3.2, { snavel: 11 });
  berkenspanner(ctx, 1550, 330, 1.2, { vorm: 'licht' }); tribulus(ctx, 1600, 700, 3);
  zaadkraker(ctx, 400, 1020, 2.2, { snavel: 'groot' }); pijlstaart(ctx, 1150, 900, 3.5, { tong: 0 });
};

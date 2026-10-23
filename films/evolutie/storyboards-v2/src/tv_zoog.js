// Testvel zoogdieren (tekenronde 2, 23 okt 2026). Render oud: zonder dieren_zoog; nieuw: met dieren_zoog (zie lessen_zoog.md).
const _tvG = (ctx, hor = 600) => macroNacht(ctx, { horizon: hor });
const TV_zoog = {
  wolf(ctx) { _tvG(ctx); metaText(ctx, 'WOLF · S = 9 PX/CM', 80, 70, C.text2); wolf(ctx, 900, 900, 9); },
  wolfHoudingen(ctx) { _tvG(ctx, 520); metaText(ctx, 'WOLF · HOUDINGEN: STAAN, LOPEN, ZITTEN, LIGGEN, HUILEN, SNUFFELEN', 80, 70, C.text2);
    wolf(ctx, 330, 480, 3.4); wolf(ctx, 960, 480, 3.4, { houding: 'lopen', t: 0.1 }); wolf(ctx, 1600, 480, 3.4, { houding: 'snuffelen' });
    wolf(ctx, 330, 1000, 3.4, { houding: 'zitten' }); wolf(ctx, 960, 1000, 3.4, { houding: 'liggen' }); wolf(ctx, 1600, 1000, 3.4, { houding: 'huilen' }); },
  wolfLoop(ctx) { _tvG(ctx, 300); metaText(ctx, 'WOLF · STAP, 8 FASEN (T = 0 … 0,875)', 80, 70, C.text2);
    for (let i = 0; i < 8; i++) wolf(ctx, 260 + (i % 4) * 460, 470 + Math.floor(i / 4) * 480, 2.6, { houding: 'lopen', t: i / 8 }); },
  wolfKop(ctx) { _tvG(ctx); metaText(ctx, 'WOLF · INGEZOOMD KOP EN VOORPOOT', 80, 70, C.text2); wolf(ctx, -180, 2340, 20); },
  wolfPoot(ctx) { _tvG(ctx); metaText(ctx, 'WOLF · INGEZOOMD POTEN EN STAART', 80, 70, C.text2); wolf(ctx, 1500, 1040, 18); },
  honden(ctx) { _tvG(ctx, 560); metaText(ctx, 'WOLF EN HONDEN · 4 PX/CM (ZOALS SB4: 5 PX/CM)', 80, 70, C.text2);
    const g = 860, s = 4; wolf(ctx, 420, g, s); hond(ctx, 'herder', 920, g, s); hond(ctx, 'teckel', 1260, g, s); hond(ctx, 'mops', 1500, g, s); hond(ctx, 'chihuahua', 1720, g, s);
    evoSchaal(ctx, 'schofthoogte: wolf 80 · herder 62 · teckel 23 · mops 29 · chihuahua 20 cm'); },
  hondenGroot(ctx) { _tvG(ctx, 520); metaText(ctx, 'HONDENRASSEN GROOT', 80, 70, C.text2);
    hond(ctx, 'herder', 470, 500, 5.5); hond(ctx, 'teckel', 1420, 500, 11); hond(ctx, 'mops', 470, 1030, 12); hond(ctx, 'chihuahua', 1420, 1030, 17, { kijk: -1 }); },
  hondenHoudingen(ctx) { _tvG(ctx, 360); metaText(ctx, 'HONDEN · HOUDINGEN (ZITTEN, LIGGEN, LOPEN)', 80, 70, C.text2);
    hond(ctx, 'herder', 300, 500, 3.6, { houding: 'zitten' }); hond(ctx, 'herder', 820, 500, 3.6, { houding: 'lopen', t: 0.3 }); hond(ctx, 'teckel', 1450, 500, 7, { houding: 'liggen' });
    hond(ctx, 'mops', 300, 980, 9, { houding: 'zitten' }); hond(ctx, 'mops', 820, 980, 9, { houding: 'liggen' }); hond(ctx, 'chihuahua', 1300, 980, 11, { houding: 'zitten' }); hond(ctx, 'teckel', 1700, 980, 7, { houding: 'lopen', t: 0.6, kijk: -1 }); },
  paarden(ctx) { _tvG(ctx, 520); metaText(ctx, 'PAARD, MUILEZEL, EZEL · 2,4 PX/CM', 80, 70, C.text2);
    const g = 860, s = 2.4; paard(ctx, 360, g, s); muilezel(ctx, 960, g, s); ezel(ctx, 1520, g, s);
    evoSchaal(ctx, 'schofthoogte: paard 160 · muilezel 130 · ezel 110 cm'); },
  paardenHoudingen(ctx) { _tvG(ctx, 400); metaText(ctx, 'PAARDACHTIGEN · GRAZEN EN LOPEN', 80, 70, C.text2);
    paard(ctx, 400, 520, 2.2, { houding: 'grazen' }); paard(ctx, 1200, 520, 2.2, { houding: 'lopen', t: 0.2 }); ezel(ctx, 400, 1000, 2.6, { houding: 'grazen' }); muilezel(ctx, 1200, 1000, 2.6, { houding: 'lopen', t: 0.65 }); ezel(ctx, 1700, 1000, 2.6, { houding: 'lopen', t: 0.4, kijk: -1 }); },
  paardGroot(ctx) { _tvG(ctx); paard(ctx, 800, 1060, 4.6); },
  ezelGroot(ctx) { _tvG(ctx); ezel(ctx, 900, 1000, 6.5); },
  muilezelGroot(ctx) { _tvG(ctx); muilezel(ctx, 900, 1020, 5.4); },
  katten(ctx) { _tvG(ctx, 520); metaText(ctx, 'JACHTLUIPAARD · LEEUW · TIJGER · HUISKAT', 80, 70, C.text2);
    jachtluipaard(ctx, 480, 500, 0.75); leeuw(ctx, 1380, 500, 0.95); tijger(ctx, 520, 1000, 0.95); huiskat(ctx, 1380, 1000, 0.95); },
  kattenHoudingen(ctx) { _tvG(ctx, 400); metaText(ctx, 'KATACHTIGEN · LOPEN, ZITTEN, LIGGEN', 80, 70, C.text2);
    jachtluipaard(ctx, 350, 500, 0.7, { houding: 'lopen', t: 0.3 }); jachtluipaard(ctx, 900, 500, 0.7, { houding: 'zitten' }); leeuw(ctx, 1500, 500, 0.8, { houding: 'liggen' });
    tijger(ctx, 420, 1000, 0.8, { houding: 'lopen', t: 0.7 }); huiskat(ctx, 1000, 1000, 0.9, { houding: 'zitten' }); huiskat(ctx, 1550, 1000, 0.9, { houding: 'liggen' }); },
  luipaardGroot(ctx) { _tvG(ctx); jachtluipaard(ctx, 960, 900, 1.2); },
  luipaardStap(ctx) { _tvG(ctx); jachtluipaard(ctx, 960, 860, 1.15, { fase: 0.15 }); },
  katSchaal(ctx) { _tvG(ctx); metaText(ctx, 'OP SCHAAL ZOALS IN DE FILMS', 80, 70, C.text2); leeuw(ctx, 420, 760, 1); tijger(ctx, 1100, 760, 1.08); huiskat(ctx, 1640, 760, 0.24); jachtluipaard(ctx, 1500, 1000, 0.4); },
  walvissen(ctx) { ctx.fillStyle = '#1B3550'; ctx.fillRect(0, 0, W, H); metaText(ctx, 'BULTRUG EN VOOROUDERS', 80, 70, C.text2);
    bultrug(ctx, 960, 260, 0.9); pakicetus(ctx, 300, 700, 0.9); ambulocetus(ctx, 900, 720, 0.75); rodhocetus(ctx, 1520, 620, 0.75); basilosaurus(ctx, 960, 920, 0.85, { poot: 1 }); },
  zwemmers(ctx) { ctx.fillStyle = '#1B3550'; ctx.fillRect(0, 0, W, H); metaText(ctx, 'ZWEMMEN (T = 0 EN T = 1,4) · ZEEHOND LIGT EN ZWEMT', 80, 70, C.text2);
    bultrug(ctx, 520, 280, 0.62, { t: 0 }); bultrug(ctx, 1400, 280, 0.62, { t: 1.4 }); basilosaurus(ctx, 520, 560, 0.55, { t: 0 }); basilosaurus(ctx, 1400, 560, 0.55, { t: 1.4, poot: 1 });
    rodhocetus(ctx, 400, 840, 0.75, { t: 0 }); rodhocetus(ctx, 1000, 840, 0.75, { t: 0.7 }); zeehond(ctx, 1600, 960, 0.75); zeehond(ctx, 1600, 760, 0.75, { houding: 'zwemmen', t: 1 }); },
  bultrugRontgen(ctx) { ctx.fillStyle = '#1B3550'; ctx.fillRect(0, 0, W, H); bultrug(ctx, 960, 300, 1.4); bultrug(ctx, 960, 780, 1.4, { rontgen: 1, heup: 1 }); },
  oervalvissenGroot(ctx) { _tvG(ctx, 560); pakicetus(ctx, 460, 520, 1.5); ambulocetus(ctx, 1400, 500, 1.3); rodhocetus(ctx, 560, 860, 1.3); basilosaurus(ctx, 1400, 860, 0.8, { poot: 1 }); },
  hoefdieren(ctx) { _tvG(ctx, 520); metaText(ctx, 'NIJLPAARD · KOE · ZEEHOND · EDELHERT', 80, 70, C.text2);
    nijlpaard(ctx, 440, 480, 1.2); koe7(ctx, 1380, 480, 1.2); zeehond(ctx, 440, 960, 1.3); edelhert(ctx, 1380, 1000, 1.1); },
  hoefHoudingen(ctx) { _tvG(ctx, 420); metaText(ctx, 'HOUDINGEN · KOE GRAAST, HERTEN VECHTEN, NIJLPAARD LOOPT, PAKICETUS STAPT, AMBULOCETUS LIGT', 80, 70, C.text2);
    koe7(ctx, 330, 480, 0.85, { houding: 'grazen' }); edelhert(ctx, 900, 500, 0.9, { kop: 0.85 }); edelhert(ctx, 1300, 500, 0.9, { kop: 0.85, kijk: -1 }); nijlpaard(ctx, 1650, 480, 0.6, { houding: 'lopen', t: 0.3 });
    pakicetus(ctx, 400, 980, 1.2, { houding: 'lopen', t: 0.2 }); ambulocetus(ctx, 1200, 960, 1.1, { houding: 'liggen' }); },
  edelhertGroot(ctx) { _tvG(ctx); edelhert(ctx, 600, 1000, 1.3, { kop: 0 }); edelhert(ctx, 1450, 1000, 1.1, { kop: 0.85, kijk: -1 }); },
  klein(ctx) { _tvG(ctx); metaText(ctx, 'MUIS (STAAN, RECHTOP) · CHIMPANSEE (KNOKKELLOPEN, ZITTEN)', 80, 70, C.text2); muis(ctx, 300, 800, 30); muis(ctx, 700, 800, 30, { houding: 'rechtop' });
    chimp(ctx, 1150, 900, 6); chimp(ctx, 1650, 900, 6, { houding: 'zitten' }); },
  chimpLoop(ctx) { _tvG(ctx, 300); for (let i = 0; i < 4; i++) chimp(ctx, 260 + i * 460, 700, 4.2, { houding: 'lopen', t: i / 4 }); },
  kladogram(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'KLEIN (ZOALS IN CLADOGRAM SB7/SB8)', 80, 70, C.text2);
    zeehond(ctx, 300, 500, 0.36); koe7(ctx, 700, 500, 0.32); nijlpaard(ctx, 1100, 500, 0.3); bultrug(ctx, 1550, 460, 0.2);
    pakicetus(ctx, 300, 900, 0.42); ambulocetus(ctx, 700, 900, 0.36); rodhocetus(ctx, 1150, 880, 0.38); basilosaurus(ctx, 1600, 880, 0.24); },
};

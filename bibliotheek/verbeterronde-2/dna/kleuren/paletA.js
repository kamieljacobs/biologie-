// =====================================================================================
// DNA-KLEUREN · PALET A 'lichtheidstrap' (verbeterronde 2, 28 okt 2026; voorstel, nog niet gekozen)
// Ruggengraat blijft licht paars (C1: paars = DNA), de vier basen krijgen vier verschillende tinten uit het palet die ook in
// lichtheid een trap vormen: C zandgeel (L* 86) > A groen (69) > T koraal (54) > G blauw (43). Zo blijven ze ook bij rood-groen-
// kleurenblindheid uit elkaar (getoetst met de Machado-2009-simulatie: kleinste ΔE tussen twee basen ≥ 19 bij deuteranopie en
// protanopie; huidig paars: 12). Letter donker op A, T, C; licht op G. RNA: zelfde tinten voor A, C, G; U licht koraal (familie
// van T); de RNA-ruggengraat blijft teal. Chromosomen: standaard lila, herkomst vader lichtblauw / moeder koraal.
// Plakken: direct ná de definities van DNA_BASE, D2, RNA_BASE, _cdRNA en CD in lib_bio.js (of de waarden daar vervangen).
// =====================================================================================
Object.assign(DNA_BASE.base, { A: '#6DBA7F', T: '#CF5F45', C: '#F0D58A', G: '#3A67A0' });
Object.assign(DNA_BASE.letter, { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE' });
Object.assign(DNA_BASE, { rug: '#4E4380', rugR: '#A99BDB', fosfaat: '#7D6BB5', suiker: '#A99BDB' });
Object.assign(D2, { oud: '#7D6BB5', oudR: '#A99BDB', nieuw: '#CFC6EE', nieuwR: '#E6E1F7' });
Object.assign(D2.base, DNA_BASE.base); Object.assign(D2.letter, DNA_BASE.letter, { U: '#121A26' });
Object.assign(RNA_BASE.base, { A: '#6DBA7F', U: '#F09A84', C: '#F0D58A', G: '#3A67A0' });
Object.assign(RNA_BASE.letter, { A: '#121A26', U: '#121A26', C: '#121A26', G: '#F2F2EE' });
Object.assign(D2.rbase, RNA_BASE.base);
if (typeof _cdRNA !== 'undefined') { Object.assign(_cdRNA, RNA_BASE.base); Object.assign(_cdRNAL, RNA_BASE.letter); }
Object.assign(CD, { std: '#A99BDB', vader: '#86C3E8', moeder: '#CF5F45' });

// =====================================================================================
// DNA-KLEUREN · PALET B 'paren als families' (verbeterronde 2, 28 okt 2026; voorstel, nog niet gekozen)
// Ruggengraat neutraal lichtgrijs-blauw (geen paars meer); basen in twee families: A–T warm (A koraalrood L* 56, T zandgeel 84),
// C–G koel (C lichtblauw 76, G donkerblauw 40). Binnen elk paar een groot verschil in lichtheid, tussen de paren warm ↔ koel
// (geel-blauw blijft bij rood-groen-kleurenblindheid zichtbaar). Kleinste ΔE tussen twee basen ≥ 27 bij deuteranopie en protanopie
// (Machado-2009-simulatie; huidig paars: 12). Letter donker op A, T, C; licht op G. RNA: A, C, G gelijk; U perzik (familie van T);
// RNA-ruggengraat blijft teal. Chromosomen: standaard lichtgrijs, herkomst vader donkerblauw / moeder zandgeel.
// Plakken: direct ná de definities van DNA_BASE, D2, RNA_BASE, _cdRNA en CD in lib_bio.js (of de waarden daar vervangen).
// =====================================================================================
Object.assign(DNA_BASE.base, { A: '#D8604A', T: '#F2CF7A', C: '#86C3E8', G: '#34609A' });
Object.assign(DNA_BASE.letter, { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE' });
Object.assign(DNA_BASE, { rug: '#5E6A80', rugR: '#97A3B6', fosfaat: '#7D899E', suiker: '#B4BECD' });
Object.assign(D2, { oud: '#7D899E', oudR: '#AEB8C8', nieuw: '#DCE3EC', nieuwR: '#F0F3F7' });
Object.assign(D2.base, DNA_BASE.base); Object.assign(D2.letter, DNA_BASE.letter, { U: '#121A26' });
Object.assign(RNA_BASE.base, { A: '#D8604A', U: '#F5B98A', C: '#86C3E8', G: '#34609A' });
Object.assign(RNA_BASE.letter, { A: '#121A26', U: '#121A26', C: '#121A26', G: '#F2F2EE' });
Object.assign(D2.rbase, RNA_BASE.base);
if (typeof _cdRNA !== 'undefined') { Object.assign(_cdRNA, RNA_BASE.base); Object.assign(_cdRNAL, RNA_BASE.letter); }
Object.assign(CD, { std: '#AEB8C8', vader: '#34609A', moeder: '#F2CF7A' });

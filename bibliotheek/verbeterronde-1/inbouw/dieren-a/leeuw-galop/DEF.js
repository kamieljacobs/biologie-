// LEEUW (KatPop) — variant A (galop): de leeuw krijgt een eigen gedraaide galop (o.houding 'galop', o.t = fase 0–1),
// zodat jagende leeuwen niet meer terugvallen op lopen. Afgeleid van de luipaardgalop met eigen maten:
// lengtes × 1,5 (schofthoogte 120 cm t.o.v. 80 cm; Hudson e.a. 2012: staplengte schaalt met rug-/pootlengte),
// staplengte iets korter (× 1,3: een leeuw haalt ± 60 km/u, geen 100), duty factor 0,3 in plaats van 0,22 (langzamer →
// langer steunen), rugbuiging 60 % van die van het luipaard (zware romp), kop en hals om de eigen rustvorm.
// Bekende fout die dit oplost: luipaardgalop één-op-één → romp op 67 cm, poten ingezakt onder het lijf.
// Gedraaide galop voor een grote kat, afgeleid van de luipaardgalop met EIGEN maten (niet één-op-één):
// alle lengtes in cm (staplengte S, voetposities nx/ty, romphoogte Ry, opvouwen fold) schalen met de schofthoogte
// (Hudson e.a. 2012, JEB 215: staplengte valt samen na normaliseren op rug-/achterpootlengte), een hogere duty factor
// (langzamer dier: duty factor daalt met de snelheid, zelfde bron) en minder rugbuiging dan het jachtluipaard
// (gestrekt/gebogen naar de eigen rusthoeken toe gedempt). f = schofthoogte dier / 80 cm (luipaard).
function _katGalopVan(G0, f, o = {}) { const dem = o.buig ?? 0.6, beta = o.beta ?? 0.3, sS = o.stap ?? f;
  const sc = (v, k) => v * k; const curve = (c, k) => c.map(([u, v]) => [u, v * k]);
  const meng = (a, b, w) => { const r = {}; for (const k in a) r[k] = b[k] != null ? b[k] + (a[k] - b[k]) * w : a[k]; return r; };
  const rust = o.rust || {}; // rusthoeken van het dier (graden), voor rompV/rompM/rompA/nek/kop
  const gestrekt = Object.assign(meng(G0.gestrekt, rust, dem), o.gestrekt || {}), gebogen = Object.assign(meng(G0.gebogen || G0.gestrekt, rust, dem), o.gebogen || {});
  return Object.assign({}, G0, { S: sc(G0.S, sS), beta: { V: beta, A: beta }, nx: { V: sc(G0.nx.V, f), A: sc(G0.nx.A, f) }, ty: { V: G0.ty.V * f, A: G0.ty.A * f },
    Ry: curve(G0.Ry, f), fold: { V: curve(G0.fold.V, f), A: curve(G0.fold.A, f) }, gestrekt, gebogen }); }
var KAT_LEEUW_GALOP_A = KatPop.maak(Object.assign({}, KAT_LEEUW2_DEF, { GALOP: _katGalopVan(KAT_LUIPAARD2_DEF.GALOP, 1.5, { stap: 1.3, beta: 0.3, buig: 0.6,
  rust: { rompV: -1, rompM: 177, rompA: 172, nek: -20, kop: 20 }, gestrekt: { nek: -14, kop: 20 }, gebogen: { nek: -18, kop: 18 } }) }));
function leeuw(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT_LEEUW_GALOP_A, x, y, s * 220 / 120, o); }

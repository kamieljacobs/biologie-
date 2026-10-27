// TIJGER (KatPop) — variant A: eigen gedraaide galop (o.houding 'galop', o.t 0–1), afgeleid van de luipaardgalop met
// eigen maten: lengtes × 1,25 (schofthoogte 100 cm t.o.v. 80 cm; Hudson e.a. 2012), staplengte × 1,1, duty factor 0,3,
// rugbuiging 65 % van die van het luipaard, kop en hals om de eigen rustvorm. Strepen ongewijzigd.
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
var KAT_TIJGER_A = KatPop.maak(Object.assign({}, KAT_TIJGER2_DEF, { GALOP: _katGalopVan(KAT_LUIPAARD2_DEF.GALOP, 1.25, { stap: 1.1, beta: 0.3, buig: 0.65,
  rust: { rompV: -4, rompM: 179, rompA: 169, nek: -2, kop: 24 }, gestrekt: { nek: 0, kop: 24 }, gebogen: { nek: -6, kop: 22 } }) }));
function tijger(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT_TIJGER_A, x, y, s * 2.0, o); }

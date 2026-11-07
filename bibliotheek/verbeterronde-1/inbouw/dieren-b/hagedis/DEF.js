// =====================================================================================================
// ZANDHAGEDIS (Lacerta agilis) — ombouw 28 okt 2026 (Kamiel: 'ja, ombouwen'): zijwaarts gespreide poten met zichtbare
// tenen en klauwtjes. Houding (bronnen): hagedissen lopen 'sprawling': de dij en bovenarm liggen ongeveer horizontaal en
// wijzen opzij, elleboog en knie buigen ± 90° en staan naar buiten, onderarm en onderbeen staan ongeveer verticaal, de voet
// staat lateraal van de knie (Reilly & Delancey 1997, J Exp Biol 200: 'the foot clearly remains lateral to the knee';
// 'Foul and Loathsome', eCampusOntario: bovenste segmenten parallel aan de grond, onderste verticaal, gewrichten ± 90°).
// Vijf tenen met klauwen aan elke voet, vierde teen van de achtervoet het langst (EB1911 'Reptiles': 'claws ... fully
// developed in all limbed reptiles', vijf tenen; Li e.a. 2013 (arXiv 1303.7292): 4e teen 63 % van de achtervoet).
// Zo zag de ElevenLabs-plaat (referentie/dieren/reptielen/stap.webp) het ook al.
// Wat er verandert t.o.v. de pop van 23 okt: de 3D-rig had de spreiding al (zie o.boven), maar in een zuiver zijaanzicht
// valt een opzij wijzende dij weg en lijkt de poot een zuil onder het lijf. Nu:
//  - camera iets van boven (± 17°) voor de poten: y_scherm = y + 0,3·(|z| − |z_voet|). De voeten blijven op de grondlijn
//    (verre poten iets vlakker, ze verdwijnen grotendeels achter het lijf), en de knie/elleboog (dichter bij het lijf) komt hoger te
//    staan dan de voet: zo leest de poot als een hoek naar buiten in plaats van een zuil onder het lijf. Lijf blijft zijaanzicht.
//  - lijf ± 0,4 cm lager (buik op ± een halve lijfhoogte boven de grond, zoals op de plaat);
//  - knie en elleboog hoger en meer naar buiten (pool), voeten iets verder opzij (spread), dij/onderbeen iets dikker;
//  - tenen: vijf per voet, door de schuine camera als waaier zichtbaar, iets dikker en langer, met donkere klauwtjes.
// Gang, lengtes, kleuren, kop en lijf ongewijzigd. Zelfde aanroep hagedis(ctx, x, y, s, { houding, t, kijk, a, boven }).
// =====================================================================================================
const _HAG_ZAK = (x) => x < 9 ? 0.4 : x < 14 ? 0.4 * (14 - x) / 5 : 0; // lijf lager bij de grond (buik ± een halve lijfhoogte boven de grond)
const REPT_HAG2_DEF = Object.assign({}, REPT_HAG_DEF, {
  prof: REPT_HAG_DEF.prof.map(([x, a, b, c]) => [x, a - _HAG_ZAK(x), Math.max(0.05, b - _HAG_ZAK(x)), c]),
  poot: {
    V: Object.assign({}, REPT_HAG_DEF.poot.V, { pool: [-0.4, -0.7, 1], w: [0.32, 0.22, 0.16, 0.14, 0.06], tenen: [[-75, 0.36], [-38, 0.54], [-4, 0.64], [30, 0.58], [72, 0.38]], klauw: 0.12 }),
    A: Object.assign({}, REPT_HAG_DEF.poot.A, { pool: [0.4, -0.7, 1], w: [0.4, 0.26, 0.18, 0.16, 0.065], tenen: [[-60, 0.38], [-30, 0.64], [-4, 0.9], [22, 1.18], [80, 0.58]], klauw: 0.12 }),
  },
  GANG: Object.assign({}, REPT_HAG_DEF.GANG, { spread: { V: 1.9, A: 2.2 } }),
});
const REPT_HAG2 = PopRC.reptiel(REPT_HAG2_DEF);
const HAG_SCHUIN = 0.3; // y += k·z voor de poten (camera iets van boven)
function _hagSchuin(st) { const k = HAG_SCHUIN; // y += k·(|z| − |z_voet|): de voet blijft waar hij is (op de grond of in de zwaai),
  for (const Lb in st.benen) { const b = st.benen[Lb], z0 = Math.abs(b.B[2]), f = Lb[1] === 'F' ? 0.6 : 1; // knie/elleboog (dichter bij het lijf) komen hoger
    for (const v of [b.K, b.W]) v[1] += k * f * (Math.abs(v[2]) - z0);
    for (const v of b.tenen) v[1] += 0.5 * f * (Math.abs(v[2]) - z0); // tenen als waaier: naar de kijker lager, van de kijker af hoger (sterker, zodat vijf tenen te tellen zijn)
    b.K[1] = Math.max(b.K[1], b.G[1] - 0.15); } // knie nooit boven de rug uit
  return st; }
function hagedis(ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; const P = REPT_HAG2;
  if (o.boven) return P.teken(ctx, x, y, s * 25, o);
  const st = _hagSchuin(P.stand(o)); return P.teken(ctx, x, y, s * 25, Object.assign({}, o, { stand: st })); }

// Castvoorstel Voeding-reeks (26 okt 2026, ter keuring): Diëtist Hanneke, en Joost met de outfit 'spreekuur' (iets vollere romp, zonder karikatuur).
CAST.hanneke = { naam: 'Diëtist Hanneke', leeftijd: 41, rol: 'diëtist · vraagt wat je eet en wat jij wilt veranderen · alleen in haar eigen vak', huid: '#A87252', haar: '#2A1A12', kapsel: 'krul', wenkbrauw: '#22150E', wimpers: true, lippen: '#A9584E',
  top: 'vest', topKleur: '#5E8A6A', topAccent: '#4E7458', binnen: '#F2ECE2', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 0.98,
  garderobe: { praktijk: {}, buiten: { top: 'jas', topKleur: '#7A5A3A', topAccent: '#664A30' } } };
CAST.hanneke_b = Object.assign({}, CAST.hanneke, { kapsel: 'knot', haar: '#5A3A24', huid: '#E3B998', wenkbrauw: '#4A2E1C', top: 'overhemd', topKleur: '#D9C9A8', topAccent: '#C4B290', accessoire: ['bril'] });
CAST.hanneke_c = Object.assign({}, CAST.hanneke, { kapsel: 'staart', haar: '#8A5A34', huid: '#F0CFB4', wenkbrauw: '#6E4628', top: 'trui', topKleur: '#C9A35C', topAccent: '#B08C48', accessoire: ['oorbel'] });
CAST.joost.garderobe = Object.assign({}, CAST.joost.garderobe || {}, { spreekuur: { heupK: 1.66, schouderK: 2.02 } });
CAST.dennis.garderobe = Object.assign({}, CAST.dennis.garderobe || {}, { sport: { top: 'tshirt', strepen: null, topKleur: '#4F8FB0', topAccent: '#3E7896', broek: '#2E3442', schoen: '#F2F2EE', schoenAccent: '#4F8FB0', schouderK: 2.1, heupK: 1.4 } });

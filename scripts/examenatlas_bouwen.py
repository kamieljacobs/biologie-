"""Bouwt examenatlas/havo.json en examenatlas/vwo.json uit de oude Examenatlas-artifact.
Koppelt onderwerpen, begrippen en vragen aan de PTA-subonderdelen via de methodehoofdstukken."""
import json, sys, collections, os

SRC, OUT = sys.argv[1], sys.argv[2]
s = open(SRC).read()
def blk(id):
    a = s.index('>', s.index(f'id="{id}"')) + 1; b = s.index('</script>', a); return json.loads(s[a:b])

ONDERZOEK = 'OND'  # examenthema 'Onderzoek doen' -> vaardigheden

PTA = {
 'havo': {
  'methode': 'bvj', 'methnaam': 'Biologie voor Jou', 'chlab': 'Thema',
  'groepen': [
   ('OND1', 'Van cel tot nakomeling', ['cellen', 'voortplanting', 'erfelijkheid']),
   ('OND2', 'Leven in verandering', ['evolutie', 'regeling', 'ecologie']),
   ('OND3', 'Energie en informatie', ['stofwisseling', 'dna']),
   ('OND4', 'Het lichaam van binnen', ['voeding', 'transport', 'gaswisseling', 'afweer']),
   ('VAARD', 'Vaardigheden', ['onderzoek']),
  ],
  'subs': {
   'cellen': ('Cellen', 'Thema 1 Inleiding in de biologie'), 'voortplanting': ('Voortplanting', 'Thema 2'),
   'erfelijkheid': ('Erfelijkheid', 'Thema 3 Genetica'), 'evolutie': ('Evolutie', 'Thema 4'),
   'regeling': ('Regeling en waarneming', 'Thema 5 + 6'), 'ecologie': ('Ecologie', 'Thema 7 Ecologie en milieu'),
   'stofwisseling': ('Stofwisseling', 'Thema 8 Stofwisseling in de cel'), 'dna': ('DNA', 'Thema 9'),
   'voeding': ('Voeding', 'Thema 10 Vertering'), 'transport': ('Transport', 'Thema 11'),
   'gaswisseling': ('Gaswisseling en uitscheiding', 'Thema 12'), 'afweer': ('Bescherming en evenwicht', 'Thema 13 Afweer'),
   'onderzoek': ('Onderzoek doen', 'in alle thema\'s'),
  },
  'ch': {1: 'cellen', 2: 'voortplanting', 3: 'erfelijkheid', 4: 'evolutie', 5: 'regeling', 6: 'regeling', 7: 'ecologie',
         8: 'stofwisseling', 9: 'dna', 10: 'voeding', 11: 'transport', 12: 'gaswisseling', 13: 'afweer', 14: None},
 },
 'vwo': {
  'methode': 'nectar', 'methnaam': 'Nectar', 'chlab': 'H',
  'groepen': [
   ('OND1', 'Van cel tot ecosysteem', ['cellen', 'voortplanting', 'erfelijkheid', 'evolutie', 'ecologie']),
   ('OND2', 'De moleculen van het leven', ['milieu', 'dna', 'stofwisseling']),
   ('OND3', 'Sturen en reageren', ['regeling', 'gedrag', 'planten']),
   ('OND4', 'Het lichaam van binnen', ['voeding', 'transport', 'gaswisseling', 'afweer']),
   ('VAARD', 'Vaardigheden', ['onderzoek']),
  ],
  'subs': {
   'cellen': ('Cellen', 'H2 Cel en leven'), 'voortplanting': ('Voortplanting', 'H4'), 'erfelijkheid': ('Genetica', 'H5 Erfelijkheid'),
   'evolutie': ('Evolutie', 'H7'), 'ecologie': ('Ecologie', 'H6 + H8'), 'milieu': ('Mens en milieu', 'H9 Systeem Aarde en de mens'),
   'dna': ('DNA', 'H17 (+ H18)'), 'stofwisseling': ('Stofwisseling', 'H18–20'),
   'regeling': ('Regeling en waarneming', 'H12–15'), 'gedrag': ('Gedrag en beweging', 'H1 + H19'), 'planten': ('Planten', 'H20'),
   'voeding': ('Voeding', 'H11'), 'transport': ('Transport', 'H10 Bloedsomloop'), 'gaswisseling': ('Gaswisseling', 'H12 § 12.3–12.4'),
   'afweer': ('Bescherming', 'H16 Afweer'), 'onderzoek': ('Onderzoek doen', 'H3 · in alle hoofdstukken'),
  },
  'ch': {1: 'gedrag', 2: 'cellen', 3: 'onderzoek', 4: 'voortplanting', 5: 'erfelijkheid', 6: 'ecologie', 7: 'evolutie', 8: 'ecologie',
         9: 'milieu', 10: 'transport', 11: 'voeding', 12: 'regeling', 13: 'regeling', 14: 'regeling', 15: 'regeling', 16: 'afweer',
         17: 'dna', 18: 'stofwisseling', 19: 'gedrag', 20: 'planten'},
 },
}

def sub_for(lv, ch, th):
    """hoofdstuk + examenthema -> PTA-subonderdeel"""
    if th == ONDERZOEK: return 'onderzoek'
    sub = PTA[lv]['ch'].get(ch)
    if lv == 'vwo':
        if ch == 12 and th == 'ADEM': return 'gaswisseling'
        if ch == 18: return 'dna' if th in ('DNA', 'GENREG', 'BIOTECH', 'CELCY') else 'stofwisseling'
        if ch == 19: return 'stofwisseling' if th in ('DISS', 'BIOMOL') else 'gedrag'
        if ch == 20: return 'stofwisseling' if th in ('ASSIM', 'DISS', 'BIOMOL') else 'planten'
    return sub

# handmatige correcties waar de stemming via de begrippen een vreemde plek gaf
OVERRIDE = {
 'havo': {'EVO::genetische variatie': 'evolutie', 'AFW::infectieziekten & virussen': 'afweer',
          'ECOPOP::gedrag': 'regeling'},
 'vwo': {'ASSIM::beperkende factoren fotosynthese': 'stofwisseling', 'ECOPOP::gedrag': 'gedrag'},
}

report = []
for lv, did in (('havo', 'data-havo'), ('vwo', 'data')):
    D = blk(did); P = PTA[lv]; mk = 'bv' if P['methode'] == 'bvj' else 'ne'
    exams = D['exams']; exi = {e['id']: i for i, e in enumerate(exams)}
    Q = D['questions']
    # begrippen -> subs
    terms = D['terms']
    tsubs = []
    for t in terms:
        ss = []
        for ch in t[mk]:
            x = sub_for(lv, ch, t['th'])
            if x and x not in ss: ss.append(x)
        tsubs.append(ss)
    tidx = {t['b']: i for i, t in enumerate(terms)}
    # standaard-sub per examenthema (stem van alle begrippen van dat thema)
    thvote = collections.defaultdict(collections.Counter)
    for t, ss in zip(terms, tsubs):
        for j, x in enumerate(ss): thvote[t['th']][x] += 2 if j == 0 else 1
    thdef = {k: v.most_common(1)[0][0] for k, v in thvote.items()}
    # onderwerpen
    ow = []; owidx = {}
    for th in D['themes']:
        for name, nex, nq in th['subs']:
            key = th['code'] + '::' + name
            L = D['lessons'].get(key, {})
            bl = [tidx[b] for b in L.get('begrippen', []) if b in tidx]
            vote = collections.Counter()
            for i in bl:
                for j, x in enumerate(tsubs[i]): vote[x] += 2 if j == 0 else 1
            if key in OVERRIDE[lv]: sub = OVERRIDE[lv][key]
            elif th['code'] == ONDERZOEK: sub = 'onderzoek'
            elif vote: sub = vote.most_common(1)[0][0]
            else: sub = thdef.get(th['code'])
            owidx[key] = len(ow)
            ow.append({'th': th['code'], 'n': name, 'sub': sub, 'kort': L.get('kort', ''), 'uitleg': L.get('uitleg', ''),
                       'examen': L.get('examen', ''), 'valkuil': L.get('valkuil', ''), 'b': bl, 'nex0': nex})
    # vragen
    vragen = []; ex_of = collections.defaultdict(set); q_of = collections.defaultdict(list); pts_of = collections.Counter()
    for qi, q in enumerate(Q):
        ons = []
        for th, nm in q['s']:
            k = th + '::' + nm
            if k in owidx and owidx[k] not in ons: ons.append(owidx[k])
        v = {'e': exi[q['ex']], 'nr': q['nr'], 'p': q['p'], 'o': q['o'], 'w': q['w'], 'on': ons}
        if q.get('q'): v['q'] = q['q']
        if q.get('bn'): v['bn'] = q['bn']
        vragen.append(v)
        for o in ons: ex_of[o].add(v['e']); q_of[o].append(qi)
        if ons: pts_of[ow[ons[0]]['sub']] += q['p']
    for i, o in enumerate(ow):
        o['ex'] = sorted(ex_of[i]); o['q'] = q_of[i]; del o['nex0']
    qmap = {(q['ex'], q['nr']): i for i, q in enumerate(Q)}
    begr = []
    for t, ss in zip(terms, tsubs):
        if not ss:  # bv. havo thema 14 Samenhang: dan via het examenthema
            d = thdef.get(t['th']); ss = [d] if d else []
        begr.append({'b': t['b'], 'd': t['d'], 'n': t['n'], 's': ss, 'th': t['th'],
                     'v': [[qmap[(o[0], o[1])], o[2]] for o in t['o']]})
    # vragen zonder onderwerp tellen
    out = {
        'niveau': lv, 'methode': f"{D['meth'][P['methode']]['naam']} · {D['meth'][P['methode']]['editie']}",
        'chlab': P['chlab'],
        'hoofdstukken': {h['nr']: h['titel'] for h in D['meth'][P['methode']]['hoofdstukken']},
        'totp': D['totp'],
        'exams': [{'id': e['id'], 'lab': e['lab'], 'jaar': e['jaar'], 'tv': e['tv'], 'nq': e['nq'], 'pts': e['pts'],
                   'ops': [[o['t'], o['c'], o['nq'][0], o['nq'][1]] for o in e['ops']]} for e in exams],
        'themas': {t['code']: t['name'] for t in D['themes']},
        'groepen': [{'code': c, 'naam': n, 'subs': ss} for c, n, ss in P['groepen']],
        'subs': {k: {'n': v[0], 'h': v[1], 'pts': pts_of[k]} for k, v in P['subs'].items()},
        'onderwerpen': ow, 'begrippen': begr, 'vragen': vragen,
    }
    if D.get('binas'): out['binas'] = D['binas']
    os.makedirs(OUT, exist_ok=True)
    js = json.dumps(out, ensure_ascii=False, separators=(',', ':'))
    open(os.path.join(OUT, lv + '.json'), 'w').write(js)
    # verslag
    cnt = collections.Counter(o['sub'] for o in ow)
    bc = collections.Counter(x for b in begr for x in b['s'][:1])
    report.append(f"== {lv}: {len(js)//1024} kB, {len(ow)} onderwerpen, {len(begr)} begrippen, {len(vragen)} vragen")
    for g in P['groepen']:
        for x in g[2]:
            report.append(f"  {g[0]} {x:14s} onderwerpen {cnt[x]:3d}  begrippen {bc[x]:4d}  punten {pts_of[x]}")
    none = [o['n'] for o in ow if not o['sub']]; report.append('  zonder sub: ' + str(none))
    report.append('  begrippen zonder sub: ' + str(sum(1 for b in begr if not b['s'])))
    report.append('  vragen zonder onderwerp: ' + str(sum(1 for v in vragen if not v['on'])))
print('\n'.join(report))

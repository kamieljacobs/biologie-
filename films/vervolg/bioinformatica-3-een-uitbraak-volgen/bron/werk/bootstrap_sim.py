"""Controle van de voorbeeldbomen en bootstrapgetallen in script A, B en C (bi3, 25 okt 2026).
Elk monster = verzameling plekken met een afwijkende letter. Afstand = aantal plekken waarin twee monsters verschillen.
Boom: UPGMA (steeds het paar met de kleinste gemiddelde afstand samenvoegen).
Bootstrap: L kolommen trekken met terugleggen (multinomiaal), boom opnieuw bouwen, tellen hoe vaak elk groepje terugkomt.
Gebruik: python3 bootstrap_sim.py"""
import random, itertools, collections
import numpy as np

def upgma(names, d):
    groups = [frozenset([n]) for n in names]; clades = []
    gd = lambda g, h: sum(d[frozenset([a, b])] for a in g for b in h) / (len(g) * len(h))
    while len(groups) > 1:
        _, _, g, h = min((gd(g, h), random.random(), g, h) for g, h in itertools.combinations(groups, 2))
        groups.remove(g); groups.remove(h); groups.append(g | h); clades.append(g | h)
    return clades

def boot(S, L, N=4000, seed=1):
    names = list(S); sites = sorted(set().union(*S.values()))
    np.random.seed(seed); random.seed(seed); cnt = collections.Counter()
    def dist(w):
        return {frozenset([a, b]): sum(w[s] for s in sites if (s in S[a]) != (s in S[b]))
                for a, b in itertools.combinations(names, 2)}
    full = upgma(names, dist({s: 1 for s in sites}))
    print('afstanden', {'-'.join(sorted(k)): v for k, v in dist({s: 1 for s in sites}).items()})
    print('boom', ['-'.join(sorted(c)) for c in full])
    for _ in range(N):
        dr = np.random.multinomial(L, [1 / L] * len(sites) + [1 - len(sites) / L])
        for c in upgma(names, dist({s: int(dr[i]) for i, s in enumerate(sites)})):
            if len(c) < len(names): cnt['-'.join(sorted(c))] += 1
    for c in full[:-1]:
        k = '-'.join(sorted(c)); print('  steun', k, round(cnt[k] / N, 2))

print('A (29 408 kolommen)'); boot({'A': {1, 2, 3}, 'B': {1, 2, 3}, 'C': {1, 4, 5, 6}, 'E': {1, 4, 5, 7}, 'D': {8, 9, 10}}, 29408, seed=11)
print('B (29 408 kolommen)'); boot({'bed1': {1, 2}, 'bed2': {1, 2}, 'bed3': {1, 2, 3}, 'V': {4, 5, 6}, 'T': {4, 5, 6, 7, 8}}, 29408, seed=17)
print('C (20 kolommen, spel)'); boot({'A': {1}, 'B': {1}, 'C': {2, 3}, 'D': {2, 3, 4}, 'E': {2, 3, 4, 5, 6}}, 20, seed=31)

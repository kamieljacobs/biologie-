"""dier_deel.py <lib_dieren.js> <uit.js> — knipt base, dier_basis, dieren_overig en pop_vogels (koolmees, merel) uit de dierenbibliotheek."""
import sys
L = open(sys.argv[1], encoding='utf-8').read().split('\n')
def sec(naam):
    i = [k for k, l in enumerate(L) if l.startswith('// ===== ' + naam)][0]
    j = i + 1
    while j < len(L) and not L[j].startswith('// ===== '): j += 1
    return L[i:j]
out = ['// Uittreksel uit bibliotheek/dieren/lib_dieren.js (Van molecuul tot biosfeer 2.0): base, dier_basis, dieren_overig, pop_vogels (koolmees, merel). Gemaakt met bouw/dier_deel.py.']
for n in ['base.js', 'dier_basis.js', 'dieren_overig.js', 'pop_vogels.js']: out += sec(n)
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(out) + '\n'); print('ok', sum(len(x) for x in out))

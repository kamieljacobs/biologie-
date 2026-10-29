"""Trekt de mutaties voor de drie scriptvarianten van een film (prompt v10, B15).

python3 scripts/dobbelsteen.py [--klein 2] [--zaad <getal>] [--toon]

Variant A = klassiek (volgt het plan), B = kleine mutaties, C = één grote mutatie.
Weegt elke soort naar de winkans in films/logboek/mutaties.jsonl (alleen duidelijke uitslagen, zie b15lib.py):
gewicht = (winst + 1) / (geprobeerd + 2), begrensd tussen 0,15 en 0,85,
zodat een soort die verliest minder vaak terugkomt maar nooit verdwijnt.
Proefregel P1 (films/logboek/regels.json): de grote mutatie moet het concept zelf naspelen. Kan de
getrokken vorm dat bij dit onderwerp niet, trek dan één keer opnieuw
(--zaad weglaten) en noteer de reden in de filmbrief.
--toon geeft alleen de tabel met winkansen."""
import json, os, random, sys, collections

R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
POOL = json.load(open(os.path.join(R, 'films', 'mutatiepool.json')))
LOG = os.path.join(R, 'films', 'logboek', 'mutaties.jsonl')
args = sys.argv[1:]
n_klein = int(args[args.index('--klein') + 1]) if '--klein' in args else 2
zaad = args[args.index('--zaad') + 1] if '--zaad' in args else None
rnd = random.Random(zaad)

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import b15lib
# Nipt telt niet (Kamiel 29 okt 2026): alleen films met een duidelijke winnaar (of Kamiels keuze) tellen mee.
tel = b15lib.winkansen(alleen_duidelijk=True)

def gewicht(s):
    w, g = tel[s]
    return min(0.85, max(0.15, (w + 1) / (g + 2)))

def trek(kandidaten, k):
    kand = list(kandidaten); uit = []
    for _ in range(min(k, len(kand))):
        g = [gewicht(s) for s in kand]
        s = rnd.choices(kand, weights=g)[0]
        uit.append(s); kand.remove(s)
    return uit

if '--toon' in args:
    for groep, soorten in (('klein', POOL['klein']), ('groot', list(POOL['groot']))):
        print(f'\n{groep}:')
        for s in sorted(soorten, key=lambda s: -gewicht(s)):
            w, g = tel[s]
            print(f'  {s:30s} {w}/{g} gewonnen  gewicht {gewicht(s):.2f}')
    sys.exit()

klein = trek(POOL['klein'], n_klein)
groot = trek(list(POOL['groot']), 1)[0]
print('Variant A: klassiek, volgt het plan.')
print('Variant B: kleine mutaties:', ', '.join(klein))
print(f'Variant C: grote mutatie: {groot} ({POOL["groot"][groot]})')
print('\nZet deze trekking in de filmbrief (werk/), ook als je er één schrapt, met de reden.')

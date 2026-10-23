"""Telt films/logboek/fouten.jsonl en meldt patronen.
python3 scripts/foutenpatronen.py [--sinds 2026-10-01] [--drempel 3]
Patroon = zelfde soort (of zelfde 'gemist_bij'-stap) >= drempel keer in >= 2 films."""
import json, sys, collections, os
P = os.path.join(os.path.dirname(__file__), '..', 'films', 'logboek', 'fouten.jsonl')
args = sys.argv[1:]; sinds = args[args.index('--sinds') + 1] if '--sinds' in args else ''
drempel = int(args[args.index('--drempel') + 1]) if '--drempel' in args else 3
rijen = [json.loads(l) for l in open(P) if l.strip() and not l.startswith('//')]
rijen = [r for r in rijen if r.get('datum', '') >= sinds]
print(f'{len(rijen)} regels' + (f' sinds {sinds}' if sinds else ''))
for veld in ('soort', 'gemist_bij', 'gevonden_door', 'ontstaan_bij'):
    c = collections.Counter(r.get(veld, '?') for r in rijen)
    print(f'\n{veld}:', ', '.join(f'{k} {v}' for k, v in c.most_common()))
print('\nPatronen:')
for veld in ('soort', 'gemist_bij'):
    groep = collections.defaultdict(list)
    for r in rijen: groep[r.get(veld, '?')].append(r)
    for k, rs in sorted(groep.items(), key=lambda x: -len(x[1])):
        films = {r.get('film') for r in rs}
        if len(rs) >= drempel and len(films) >= 2:
            print(f'- {veld} = {k}: {len(rs)}× in {len(films)} films ({", ".join(sorted(map(str, films)))[:120]})')
            for r in rs[:4]: print('    ·', r.get('wat', '')[:110])

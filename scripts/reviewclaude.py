"""Houdt in films/review-claude.json bij hoe ver Claude is met Kamiels review-opmerkingen (Kamiel 7 nov 2026).

De reviewpagina (sessie/review.html) toont per film:
  ✓ Bekeken/Goed · datum   (uit Firebase reviewstatus)
  ✓ Opgehaald · datum      (alle opmerkingen staan in 'opgehaald')
  ✓ Verbeterd · datum      (alle opmerkingen staan in 'verwerkt'; datum uit 'verbeterd')

Claude kan niet in Firebase schrijven, dus dit bestand is de plek. Gebruik:
    python3 scripts/reviewclaude.py opgehaald <id> [<id> ...]           # meteen na het ophalen van review.json
    python3 scripts/reviewclaude.py verbeterd <filmpad> <id> [<id> ...]  # zodra de opmerkingen in de film verwerkt zijn
    python3 scripts/reviewclaude.py verbeterd <filmpad>                  # alleen de datum zetten (ids al in verwerkt)
Optioneel --datum JJJJ-MM-DD (standaard vandaag). Idempotent; een bestaande opgehaald-datum blijft staan.
"""
import datetime, json, os, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(R, 'films', 'review-claude.json')


def main(argv):
    datum = datetime.date.today().isoformat()
    if '--datum' in argv:
        i = argv.index('--datum')
        datum = argv[i + 1]
        del argv[i:i + 2]
    if len(argv) < 2 or argv[0] not in ('opgehaald', 'verbeterd'):
        print(__doc__)
        return 1
    d = json.load(open(P, encoding='utf-8'))
    d.setdefault('claude', {})
    d.setdefault('verwerkt', [])
    d.setdefault('opgehaald', {})
    d.setdefault('verbeterd', {})
    soort, rest = argv[0], argv[1:]
    if soort == 'opgehaald':
        nieuw = [x for x in rest if x not in d['opgehaald']]
        for x in nieuw:
            d['opgehaald'][x] = datum
        print(f'{len(nieuw)} opmerking(en) als opgehaald gemarkeerd ({datum})')
    else:
        film, ids = rest[0], rest[1:]
        for x in ids:
            d['opgehaald'].setdefault(x, datum)
            if x not in d['verwerkt']:
                d['verwerkt'].append(x)
        d['verbeterd'][film] = datum
        print(f'{film}: verbeterd op {datum}, {len(ids)} opmerking(en) als verwerkt gemarkeerd')
    open(P, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))

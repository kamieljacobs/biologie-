"""B15-poort (Kamiel 29 okt 2026: 'poorten in code').

python3 scripts/b15poort.py

Elke film op de site met een datum vanaf POORT_START moet óf door B15 zijn gegaan, óf een genoteerde
uitzondering hebben. Faalt (exit 1) bij:
 - een film zonder regel in films/logboek/mutaties.jsonl (veld 'pad' = href van de film) én zonder
   regel in films/logboek/b15_uitzonderingen.jsonl;
 - een logregel vanaf POORT_START zonder 'pad', of met beoordelaar_model leeg of 'onbekend'
   (schrijf het model, of 'niet-blind' als er geen ander model was);
 - een uitzondering met een onbekende soort of zonder reden.

Uitzondering toevoegen (één regel JSON):
 {"datum": "2026-10-30", "pad": "films/dna/1-wat-is-dna.html", "soort": "lichte-remake",
  "reden": "B16 lichte remake: één script zonder varianten"}
Soorten: lichte-remake · gericht · opwaardering · klein-herstel · kamiel-zonder-b15 (met citaat in reden).
Een lichte remake houdt dezelfde href maar krijgt een nieuwe datum: dan dus een uitzondering.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import b15lib

POORT_START = '2026-10-29'
SOORTEN = {'lichte-remake', 'gericht', 'opwaardering', 'klein-herstel', 'kamiel-zonder-b15'}


def controleer():
    fouten = []
    log = b15lib.rijen()
    uitz = b15lib.jsonl(b15lib.UITZ)
    met_b15 = {r.get('pad') for r in log if (r.get('datum') or '') >= POORT_START}
    vrij = {}
    for u in uitz:
        if u.get('soort') not in SOORTEN:
            fouten.append(f"uitzondering {u.get('pad')}: soort '{u.get('soort')}' is onbekend ({', '.join(sorted(SOORTEN))})")
        if not (u.get('reden') or '').strip():
            fouten.append(f"uitzondering {u.get('pad')}: reden ontbreekt")
        vrij.setdefault(u.get('pad'), []).append(u.get('datum') or '')
    for r in log:
        if (r.get('datum') or '') < POORT_START:
            continue
        naam = f"{r.get('reeks')}/{r.get('film')} variant {r.get('variant')}"
        if not r.get('pad'):
            fouten.append(f'logregel {naam}: veld pad (href van de film) ontbreekt')
        model = (r.get('beoordelaar_model') or '').strip().lower()
        if model in ('', 'onbekend'):
            fouten.append(f"logregel {naam}: beoordelaar_model is '{model or 'leeg'}' (model noemen, of 'niet-blind')")
    for href, datum in sorted(b15lib.site_films().items()):
        if not datum or datum < POORT_START:
            continue
        if href in met_b15:
            continue
        if any(d >= datum for d in vrij.get(href, [])) or (href in vrij and '' in vrij[href]):
            continue
        fouten.append(f'{href} (datum {datum}): geen B15 in mutaties.jsonl en geen uitzondering')
    return fouten


if __name__ == '__main__':
    f = controleer()
    if f:
        print('B15-POORT DICHT')
        for x in f:
            print('  -', x)
        sys.exit(1)
    n = sum(1 for d in b15lib.site_films().values() if d and d >= POORT_START)
    print(f'b15-poort ok: {n} film(s) sinds {POORT_START}, allemaal met B15 of uitzondering')

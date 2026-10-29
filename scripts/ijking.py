"""IJking van de blinde beoordelaar tegen Kamiels eigen keuzes (Kamiel 29 okt 2026).

python3 scripts/ijking.py            → tabel op het scherm + films/logboek/ijking.json

Twee bronnen:
 - Beeldbank: bibliotheek/logboek/keuzes.jsonl, elke vergelijking met zowel 'blind' (winnaar, marge) als
   Kamiels keuze. 'gelijk' (geen duidelijke winnaar voor Kamiel) telt niet mee.
 - Scripts: films/logboek/mutaties.jsonl, elke film waar Kamiel zelf koos (beslist_door = kamiel, met
   kamiel_keuze = de variant) naast de winnaar van de beoordelaar.

Overeenstemming wordt gezet naast toeval (1 / aantal opties), apart voor 'duidelijk' en 'nipt'.
Is de beoordelaar bij 'duidelijk' niet duidelijk beter dan toeval, dan is zijn oordeel nog geen
betrouwbare meetlat en moet de brief of het model veranderen (vraag 3 van 'Als we veel afkeuren').
Verandert de brief, draai dan dit script opnieuw: dezelfde keuzes = een vaste meetlat.
"""
import collections, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import b15lib

UIT = os.path.join(b15lib.R, 'films', 'logboek', 'ijking.json')


def beeldbank():
    rijen = []
    for x in b15lib.jsonl(b15lib.KEUZES):
        b, k = x.get('blind') or {}, (x.get('kamiel') or {}).get('keuze') or x.get('keuze')
        if not b.get('winnaar') or not k or str(k).lower() in ('gelijk', 'none'):
            continue
        n = len(x.get('opties') or b.get('scores') or {}) or 2
        rijen.append({'obj': x.get('obj'), 'groep': x.get('groep'), 'blind': str(b['winnaar']), 'kamiel': str(k),
                      'marge': b.get('marge') or '?', 'opties': n, 'eens': str(b['winnaar']) == str(k),
                      'zwak_kamielkeuze': (b.get('zwak') or {}).get(str(k))})
    return rijen


def scripts():
    rijen = []
    for f in b15lib.films().values():
        k = next((r for r in f['ronde1'] if r.get('kamiel_keuze')), None)
        if not k:
            continue
        blind = max(f['ronde1'], key=lambda r: r.get('score') or 0)
        rijen.append({'obj': f['pad'], 'blind': blind.get('variant'), 'kamiel': k['kamiel_keuze'],
                      'marge': 'nipt' if (blind.get('marge') or 0) <= b15lib.NIPT_PUNTEN else 'duidelijk',
                      'opties': len(f['ronde1']), 'eens': blind.get('variant') == k['kamiel_keuze']})
    return rijen


def samenvat(rijen):
    per = collections.defaultdict(lambda: {'n': 0, 'eens': 0, 'toeval': 0.0})
    for r in rijen:
        for sl in ('alle', r['marge']):
            p = per[sl]
            p['n'] += 1; p['eens'] += r['eens']; p['toeval'] += 1 / r['opties']
    return {k: {'n': v['n'], 'eens': v['eens'], 'pct': round(100 * v['eens'] / v['n']),
                'toeval_pct': round(100 * v['toeval'] / v['n'])} for k, v in per.items() if v['n']}


def bereken():
    bb, sc = beeldbank(), scripts()
    oneens = [r for r in bb if not r['eens'] and r['marge'] == 'duidelijk']
    return {'beeldbank': samenvat(bb), 'scripts': samenvat(sc),
            'beeldbank_oneens_duidelijk': [{k: r[k] for k in ('groep', 'obj', 'blind', 'kamiel')} for r in oneens],
            'scripts_n': len(sc)}


if __name__ == '__main__':
    uit = bereken()
    json.dump(uit, open(UIT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for bron in ('beeldbank', 'scripts'):
        print(f'\n{bron}:')
        if not uit[bron]:
            print('  nog geen keuzes van Kamiel om mee te vergelijken')
        for sl, v in uit[bron].items():
            print(f"  {sl:10s} {v['eens']}/{v['n']} eens = {v['pct']}%  (toeval {v['toeval_pct']}%)")
    print(f"\n{len(uit['beeldbank_oneens_duidelijk'])} beeldbankkeuzes waar de beoordelaar 'duidelijk' zei en Kamiel iets anders koos.")

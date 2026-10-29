"""B15-rapport (Kamiel 29 okt 2026: het ritme afdwingen, niet 'als ik eraan denk').

python3 scripts/b15rapport.py            → films/logboek/rapporten/B15-<datum>.md + stand.json
python3 scripts/b15rapport.py --check    → exit 1 als ≥ ELKE logregels nog in geen rapport zitten

Het rapport is een voorstel aan Kamiel: het verandert niets aan de prompt of aan regels.json.
Inhoud: uitslagen (duidelijk/nipt), winkansen per mutatie, P1-meting (conceptvorm vs lijstvorm),
proefregels met de herhaal-eis, ijking van de beoordelaar, leerlingsignaal, en de drie vragen
uit 'Als we veel afkeuren' als de winkans van mutaties extreem is.
"""
import collections, datetime, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import b15lib, ijking

ELKE = 5
MAP = os.path.join(b15lib.R, 'films', 'logboek', 'rapporten')
STAND = os.path.join(MAP, 'stand.json')


def verschuldigd():
    stand = b15lib.json_of(STAND, {'rijen': 0})
    return len(b15lib.rijen()) - stand.get('rijen', 0)


def pct(a, b):
    return f'{a}/{b} ({round(100 * a / b)}%)' if b else '–'


def maak():
    rs = b15lib.rijen()
    fs = b15lib.films(rs)
    dui = [f for f in fs.values() if f['duidelijk']]
    L = []
    w = L.append
    vandaag = datetime.date.today().isoformat()
    stand = b15lib.json_of(STAND, {'rijen': 0})
    w(f'# B15-rapport {vandaag}\n')
    w(f'Automatisch gemaakt met `scripts/b15rapport.py` over {len(rs)} logregels ({len(fs)} films; '
      f'nieuw sinds het vorige rapport: {len(rs) - stand.get("rijen", 0)} regels). '
      'Alles hieronder is een voorstel: Kamiel beslist wat er in regels.json of de prompt verandert.\n')

    w('## 1. Uitslagen\n')
    w(f'- Duidelijke winnaar: {pct(len(dui), len(fs))}. Nipte films tellen niet mee voor de winkansen.')
    soort_w = collections.Counter(f['winnaar'].get('soort') for f in fs.values())
    soort_d = collections.Counter(f['winnaar'].get('soort') for f in dui)
    for s in ('klassiek', 'klein', 'groot'):
        w(f'- {s}: won {soort_w[s]} van {len(fs)} films (duidelijk: {soort_d[s]} van {len(dui)})')
    combi = [f for f in fs.values() if f['combi']]
    if combi:
        beter = sum(1 for f in combi if (f['combi'].get('score') or 0) > (f['winnaar'].get('score') or 0))
        w(f'- Combinaties: {pct(beter, len(combi))} scoorden hoger dan de winnaar van ronde 1. '
          'Let op: dezelfde beoordelaar ziet een gepoetste tweede ronde; dat kan meetellen.')
    w('')

    w('## 2. Winkansen per mutatie (alleen duidelijke uitslagen, zoals de dobbelsteen ze gebruikt)\n')
    tel_d, tel_a = b15lib.winkansen(True), b15lib.winkansen(False)
    pool = b15lib.json_of(b15lib.POOL, {})
    w('| Mutatie | soort | duidelijk gewonnen | alle uitslagen |')
    w('| --- | --- | --- | --- |')
    for groep, soorten in (('klein', pool.get('klein', [])), ('groot', list(pool.get('groot', {})))):
        for s in sorted(soorten, key=lambda s: (-tel_a[s][1], s)):
            w(f'| {s} | {groep} | {pct(*tel_d[s])} | {pct(*tel_a[s])} |')
    uit = [s for s in list(pool.get('klein', [])) + list(pool.get('groot', {}))
           if tel_a[s][1] >= 5 and tel_a[s][0] == 0]
    if uit:
        w(f"\nVoorstel uitsterven uit de pool (≥ 5 keer geprobeerd, nooit gewonnen): {', '.join(uit)}.")
    w('')

    w('## 3. Proefregels (films/logboek/regels.json)\n')
    for r in b15lib.regels()['regels']:
        bewijs = b15lib.proefregel_bewijs(r, fs)
        ok, winst, buiten = b15lib.herhaald(r, bewijs)
        w(f"**{r['id']} · {r['status']}** — {r['tekst'][:110]}…")
        if r.get('meet') == 'concept_vorm':
            groot = [x for f in fs.values() for x in f['ronde1'] if x.get('soort') == 'groot']
            cv = [x for x in groot if b15lib.concept_vorm(x.get('vertelvorm'))]
            lv = [x for x in groot if not b15lib.concept_vorm(x.get('vertelvorm'))]
            wint = lambda xs: sum(1 for x in xs if x is fs[x['pad']]['winnaar'])
            w(f'- Conceptvorm won {pct(wint(cv), len(cv))}; lijstvorm won {pct(wint(lv), len(lv))} (alle uitslagen).')
        w(f'- Toegepast in {len(bewijs)} films, gewonnen {sum(b["won"] for b in bewijs)}, '
          f'duidelijk gewonnen {len(winst)}, waarvan buiten de ontdekkingsreeks {len(buiten)}.')
        if r['status'] == 'proef':
            if ok:
                w(f"- **Voorstel: promoveren naar vast** (herhaald in {', '.join(sorted({b['reeks'] for b in buiten}))}).")
            else:
                w('- Nog geen promotie: nodig zijn ≥ 2 duidelijke winsten, waarvan ≥ 1 in een andere reeks.')
        if r.get('meet') != 'concept_vorm' and not bewijs:
            w("- Wordt nog niet gemeten: zet bij de variant die de regel toepast `\"proefregels\": [\"" + r['id'] + "\"]` in de logregel.")
        w('')

    w('## 4. IJking van de beoordelaar\n')
    ij = ijking.bereken()
    json.dump(ij, open(ijking.UIT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for bron, naam in (('beeldbank', 'Beeldbank (Kamiels keuzes)'), ('scripts', 'Scriptvarianten (Kamiels keuzes)')):
        v = ij[bron]
        if not v:
            w(f'- {naam}: nog geen keuzes om mee te vergelijken. Log Kamiels keuze op een keuzeblad als '
              '`beslist_door: kamiel` met `kamiel_keuze`.')
            continue
        delen = [f"{sl} {x['pct']}% eens (toeval {x['toeval_pct']}%, n={x['n']})" for sl, x in v.items()]
        w(f"- {naam}: " + '; '.join(delen) + '.')
    bb = ij['beeldbank']
    if bb.get('duidelijk') and bb.get('nipt') and bb['duidelijk']['pct'] - bb['nipt']['pct'] < 15:
        w("- Het label 'duidelijk' van de beoordelaar zegt weinig: bij 'duidelijk' is hij nauwelijks vaker "
          "het met Kamiel eens dan bij 'nipt'. Voorstel: vraag 3 (kloppen de criteria?) bij de volgende patroonronde.")
    modellen = collections.Counter((r.get('beoordelaar_model') or 'leeg') for r in rs)
    w(f"- Beoordelaarmodel in het logboek: {', '.join(f'{k} {v}' for k, v in modellen.most_common())}. "
      "'onbekend' betekent: niet na te gaan of het echt blind en op een ander model was.")
    w('')

    w('## 5. Leerlingsignaal\n')
    sig, fout = b15lib.leerlingsignaal(fs)
    if sig is None:
        w(f'- Nog geen cijfers: {fout}')
    elif not sig:
        w('- Nog geen B15-film met ≥ 20 starts.')
    else:
        w('| vertelvorm winnaar | films | gestart | uitgekeken |')
        w('| --- | --- | --- | --- |')
        for vorm, (n, s, u) in sorted(sig.items(), key=lambda kv: -kv[1][1]):
            w(f'| {vorm} | {n} | {s} | {pct(u, s)} |')
    w('')

    w('## 6. Diagnose\n')
    muts = [x for f in dui for x in f['ronde1'] if x.get('soort') in ('klein', 'groot')]
    if muts:
        wr = sum(1 for x in muts if x is next(f for f in dui if x in f['ronde1'])['winnaar']) / len(muts)
        w(f'- Winkans van een mutatie (duidelijk): {round(100 * wr)}%.')
        if wr > 0.8:
            w('- Bijna alles wint: de beoordelaar is te mild.')
        elif wr < 0.2:
            w('- Bijna niets wint: stel eerst de drie vragen (top? pool? criteria?) voordat er iets verandert.')
    if len(dui) < len(fs) / 2:
        w(f'- Meer dan de helft van de films is nipt ({len(fs) - len(dui)} van {len(fs)}): de selectie is nu '
          'vooral ruis. Grotere mutaties of Kamiels keuze bij nipte films geven meer informatie per film.')
    return '\n'.join(L) + '\n', vandaag, len(rs)


if __name__ == '__main__':
    if '--check' in sys.argv:
        n = verschuldigd()
        if n >= ELKE:
            print(f'B15-RAPPORT VERSCHULDIGD: {n} logregels zitten in geen rapport. Draai: python3 scripts/b15rapport.py')
            sys.exit(1)
        print(f'b15-rapport ok ({n} nieuwe logregels, rapport bij {ELKE})')
        sys.exit()
    os.makedirs(MAP, exist_ok=True)
    tekst, datum, n = maak()
    pad = os.path.join(MAP, f'B15-{datum}.md')
    open(pad, 'w', encoding='utf-8').write(tekst)
    json.dump({'rijen': n, 'datum': datum, 'rapport': os.path.relpath(pad, b15lib.R)},
              open(STAND, 'w', encoding='utf-8'), indent=1)
    print('geschreven:', os.path.relpath(pad, b15lib.R))

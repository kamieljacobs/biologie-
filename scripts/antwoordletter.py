"""Herstelt de woordtijden van antwoordfragmenten die beginnen met 'Antwoord a.' (of b, c, aa, bee, cee).

Probleem (Kamiel 25 okt 2026, Fysiotherapie 3 en 4: 'hier was nog een deel van het antwoord te horen'):
Roos pauzeert tussen 'Antwoord' en de letter. silalign.py koppelde de punt na de letter aan die eerste pauze,
waardoor de letter onder het eerste inhoudswoord kwam te staan. Met Vragen uit knipt de speler 'Antwoord a.' weg
op die woordtijden, en dan bleef de letter ('aa') hoorbaar. silalign.py is gepatcht; dit script herstelt de
bestaande films.

Werkwijze per fragment: opnieuw uitlijnen met de gepatchte silalign.py van die film. Alleen als de eerste zin na de
letter daardoor duidelijk later begint (> 0,2 s) worden de tijden van 'Antwoord', de letter en die eerste zin
vervangen; de rest van het fragment blijft zoals het was (cues elders verschuiven dus niet). Bijgewerkt worden
bron/stem/woordtijden/<sid>.json en de woorden in window.FILMDATA van de film-HTML. Idempotent.

Gebruik: python3 scripts/antwoordletter.py [--check] [filmmap ...]
"""
import glob, importlib.util, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LET = re.compile(r'(?i)^(aa|bee|bé|bè|cee|dee|a|b|c|d)[.:]$')
END = re.compile(r'[.?!]["”]?$')


def laad_silalign(pad):
    spec = importlib.util.spec_from_file_location('silalign_' + str(abs(hash(pad))), pad)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def film_html(fdir):
    for p in (fdir + '.html', os.path.join(fdir, 'index.html')):
        if os.path.exists(p):
            return p
    return None


def herstel(fdir, check):
    bron = os.path.join(fdir, 'bron')
    sil = os.path.join(bron, 'bouw', 'silalign.py')
    wdir = os.path.join(bron, 'stem', 'woordtijden')
    html = film_html(fdir)
    if not (os.path.exists(sil) and os.path.isdir(wdir) and html):
        return []
    mod = None
    gedaan = []
    nieuw_per_sid = {}
    for wp in sorted(glob.glob(os.path.join(wdir, '*.json'))):
        sid = os.path.basename(wp)[:-5]
        try:
            d = json.load(open(wp))
        except Exception:
            continue
        w = d.get('words', []) if isinstance(d, dict) else d
        if len(w) < 4 or not re.match(r'(?i)^antwoord$', w[0]['text']) or not LET.match(w[1]['text']):
            continue
        audio = os.path.join(fdir, 'audio', sid + '.mp3')
        if not os.path.exists(audio):
            continue
        if mod is None:
            mod = laad_silalign(sil)
        rms, dur = mod.load(audio)
        out, _, _ = mod.align([x['text'] for x in w], rms, dur)
        if out[2]['start'] - w[2]['start'] <= 0.2:
            continue
        # controle op het geluid: tussen oude en nieuwe start moet een echte pauze zitten (de letter stond dus
        # onder het eerste woord), en vlak vóór de nieuwe start stilte, erna spraak
        import numpy as np
        db = 20 * np.log10(rms + 1e-9)
        sp = db > np.percentile(db, 95) - 38
        i, o = int(out[2]['start'] * 100), int(w[2]['start'] * 100)
        if (~sp[o:i]).sum() < 20 or sp[max(0, i - 8):i - 1].any() or sp[i + 2:i + 20].mean() < 0.6:
            print('  overgeslagen (geluid bevestigt de nieuwe tijden niet):', fdir, sid)
            continue
        # laatste woord van de eerste zin na de letter
        k = 2
        while k < len(w) - 1 and not END.search(w[k]['text']):
            k += 1
        eind_oud = w[k + 1]['start'] if k + 1 < len(w) else dur
        if out[k]['end'] > eind_oud - 0.02:
            # nieuwe uitlijning loopt over de volgende zin heen: houd de oude verdeling van de eerste zin,
            # maar schuif hem naar de echte start (lineair samengedrukt tot zijn oude einde)
            a0, a1, b0, b1 = w[2]['start'], w[k]['end'], out[2]['start'], w[k]['end']
            if b1 - b0 < 0.3:
                print('  overgeslagen (eerste zin past niet):', fdir, sid)
                continue
            f = lambda t: round(b0 + (t - a0) * (b1 - b0) / (a1 - a0), 3)
            eerste = [dict(out[0]), dict(out[1])] + [{'text': x['text'], 'start': f(x['start']), 'end': f(x['end'])} for x in w[2:k + 1]]
            nw = eerste + w[k + 1:]
        else:
            nw = [dict(out[i]) for i in range(k + 1)] + w[k + 1:]
        gedaan.append((os.path.relpath(fdir, ROOT), sid, round(w[2]['start'], 2), round(nw[2]['start'], 2)))
        nieuw_per_sid[sid] = nw
        if not check:
            d2 = dict(d) if isinstance(d, dict) else {'words': nw}
            d2['words'] = nw
            d2['herstel'] = 'antwoordletter 25 okt 2026'
            json.dump(d2, open(wp, 'w'), ensure_ascii=False)
    if nieuw_per_sid and not check:
        s = open(html, encoding='utf-8').read()
        m = re.search(r'window\.FILMDATA=(\{.*?\});</script>', s, re.S)
        if not m:
            print('  geen FILMDATA in', html)
            return gedaan
        data = json.loads(m.group(1))
        raak = 0
        for seg in data.get('segments', []):
            nw = nieuw_per_sid.get(seg.get('id'))
            if nw is None or not seg.get('words'):
                continue
            if not (seg.get('audio') or '').endswith('/' + seg['id'] + '.mp3'):
                continue
            if [x['t'] for x in seg['words']] != [x['text'] for x in nw]:
                print('  woorden wijken af, FILMDATA niet aangepast:', html, seg['id'])
                continue
            seg['words'] = [{'t': x['text'], 's': x['start'], 'e': x['end']} for x in nw]
            raak += 1
        if raak:
            nieuw = json.dumps(data, ensure_ascii=False)
            s = s[:m.start(1)] + nieuw + s[m.end(1):]
            open(html, 'w', encoding='utf-8').write(s)
    return gedaan


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    if args:
        dirs = [os.path.abspath(a.rstrip('/')) for a in args]
    else:
        dirs = sorted({os.path.dirname(os.path.dirname(os.path.dirname(p)))
                       for p in glob.glob(os.path.join(ROOT, 'films', '**', 'bron', 'stem', 'woordtijden'), recursive=True)})
    alles = []
    for fd in dirs:
        alles += herstel(fd, check)
    for x in alles:
        print(('te herstellen ' if check else 'hersteld ') + '%s %s: eerste zin na de letter %.2f -> %.2f s' % x)
    print(len(alles), 'fragment(en)', '(alleen gecontroleerd)' if check else '')
    if check and alles:
        sys.exit(1)


if __name__ == '__main__':
    main()

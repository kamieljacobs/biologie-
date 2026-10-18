"""Havo/vwo-niveau in FILM-data van de stofwisselingsfilms (18 okt 2026).

python3 niveau_data.py <werkmap> <spec.json> <tts-map>
- markeert vwo-zinnen (lvl 'vwo') en zet per hoofdstuk `blocks` (te overslaan bij havo / vwo)
- voegt havo-alinea's in (eigen audio in het hoofdstuk-mp3, eigen zinnen n >= 101, segment kind 'havo')
- schuift alle tijden na een invoeging op en bewaart `ins` zodat de speler de scènes
  op de oorspronkelijke tijdlijn kan blijven tekenen (scènecode ongewijzigd).
Idempotent: werkt op een verse uitgepakte map (controleert of er al `ins`/`blocks` staan).
"""
import json, os, subprocess, sys, wave, re
sys.path.insert(0, os.path.dirname(__file__))
import fl

SR = 44100
PRE, POST = 0.15, 0.55


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return bytearray(raw)


def encode(pcm, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ac', '1', '-ar', str(SR), '-i', '-', '-c:a', 'libmp3lame', '-b:a', '128k', path], input=bytes(pcm), check=True)


def r3(x):
    return round(x + 1e-9, 3)


def split_sentences(words):
    """woorden [[w,t0,t1]] -> zinnen (afsluiting op . ? !)"""
    out, cur = [], []
    for w in words:
        cur.append(w)
        if re.search(r'[.?!]$', w[0]):
            out.append(cur); cur = []
    if cur: out.append(cur)
    return out


def phrases_of(sent_words, n, maxw=9):
    """ondertitelfrasen: hele zin, of gesplitst na een komma/dubbele punt als de zin lang is"""
    parts, cur = [], []
    for i, w in enumerate(sent_words):
        cur.append(w)
        rest = len(sent_words) - i - 1
        if len(cur) >= 4 and rest >= 3 and re.search(r'[,:]$', w[0]) and len(sent_words) > maxw:
            parts.append(cur); cur = []
    if cur: parts.append(cur)
    return parts


def main(wd, specp, ttsd):
    spec = json.load(open(specp, encoding='utf-8'))
    WORDS = json.load(open(os.path.join(ttsd, 'words.json'), encoding='utf-8'))
    src = os.path.join(wd, 'film.src.html')
    L, li, F = fl.load(src)
    if any('blocks' in c for c in F['chapters']):
        raise SystemExit('al bewerkt')
    for key, cs in spec['chapters'].items():
        ci = int(key); c = F['chapters'][ci]
        S = {s['n']: s for s in c['sentences']}
        blocks = []
        if cs.get('vwoAll'):
            for s in c['sentences']: s['lvl'] = 'vwo'
            for p in c['phrases']: p['vwo'] = True
            blocks.append({'lvl': 'vwo', 't0': 0.0, 't1': c['dur'], 'all': True})
            c['vwoAll'] = True; c['hasV'] = False
            c['blocks'] = blocks; c['ins'] = []
            continue
        # 1. vwo-blokken in de oorspronkelijke tijd
        vb = []
        for (a, b) in cs.get('vwo', []):
            for n in range(a, b + 1):
                S[n]['lvl'] = 'vwo'
            for p in c['phrases']:
                if a <= p['n'] <= b: p['vwo'] = True
            t0 = r3(S[a]['t0'] - 0.05)
            later = [s for s in c['sentences'] if s['n'] > b and s.get('lvl') != 'vwo']
            qs = [g for g in c['segments'] if g['kind'] == 'question' and g['t0'] > S[b]['t1'] - 0.01]
            ends = [g for g in c['segments'] if g['kind'] in ('end', 'pause') and g['t0'] > S[b]['t1'] - 0.01]
            cands = []
            if later: cands.append(later[0]['t0'] - 0.05)
            if qs: cands.append(qs[0]['t0'] - 0.05)
            if cands: t1 = min(cands)
            elif ends: t1 = S[b]['t1'] + 0.1
            else: t1 = c['dur']
            vb.append({'lvl': 'vwo', 't0': t0, 't1': r3(t1), 'n': [a, b]})
        # vragen binnen een vwo-blok: markeren (voor de docenttabel/hoofdstuklijst)
        for g in c['segments']:
            if g['kind'] == 'question' and any(x['t0'] <= g['t0'] < x['t1'] for x in vb):
                g['lvl'] = 'vwo'
        # 2. havo-invoegingen
        ins = []
        for k, h in enumerate(cs.get('ins', [])):
            blk = next(x for x in vb if x['n'][0] == h['before'])
            P = blk['t0']
            words = WORDS[h['file']]
            voice = decode(os.path.join(ttsd, h['file'] + '.mp3'))
            vdur = len(voice) / 2 / SR
            D = r3(PRE + vdur + POST)
            ins.append({'take': h['take'], 'P': P, 'D': D, 'mode': h['mode'], 'blk': [blk['t0'], blk['t1']], 'voice': vdur, 'file': h['file']})
        ins.sort(key=lambda x: x['P'])
        # 3. tijden opschuiven (van achter naar voren, zodat P's in oorspronkelijke tijd blijven kloppen)
        pcm = decode(os.path.join(wd, 'blobs', '%03d.mp3' % (7 + ci)))
        orig_dur = c['dur']
        for h in sorted(ins, key=lambda x: -x['P']):
            P, D = h['P'], h['D']
            sh = lambda x: r3(x + D) if x >= P - 1e-6 else x
            for g in c['segments']:
                for f in ('t0', 't1', 'count0', 'count1', 'reveal'):
                    if f in g: g[f] = sh(g[f])
            for s in c['sentences']:
                s['t0'] = sh(s['t0']); s['t1'] = sh(s['t1'])
                for w in s['words']: w['t0'] = sh(w['t0']); w['t1'] = sh(w['t1'])
            for p in c['phrases']:
                if p['t0'] < P - 1e-6 and p['t1'] > P - 1e-6: p['t1'] = P
                else: p['t0'] = sh(p['t0']); p['t1'] = sh(p['t1'])
                p['w'] = [[w, sh(t)] for w, t in p['w']]
            for b in vb:
                b['t0'] = sh(b['t0']); b['t1'] = sh(b['t1'])
            for o in ins:
                if o is not h and o['P'] > P: pass
            c['dur'] = r3(c['dur'] + D)
            # audio: stilte + stem + stilte op P
            voice = decode(os.path.join(ttsd, h['file'] + '.mp3'))
            pos = int(round(P * SR)) * 2
            pad = lambda s: bytearray(int(round(s * SR)) * 2)
            block = pad(PRE) + voice
            block += pad(D - len(block) / 2 / SR)
            pcm[pos:pos] = block
        # 4. invoegingen in nieuwe tijd + zinnen/frasen erbij
        acc = 0.0
        nn = 101 + 10 * (ci)
        for h in ins:   # oplopend
            h['Pn'] = r3(h['P'] + acc)      # begin in de nieuwe tijd
            acc += h['D']
            P = h['Pn']; D = h['D']
            c['segments'].append({'kind': 'havo', 'take': h['take'], 't0': P, 't1': r3(P + D), 'lvl': 'havo'})
            words = [[w, r3(P + PRE + a), r3(P + PRE + b)] for w, a, b in WORDS[h['file']]]
            for sw in split_sentences(words):
                s = {'n': nn, 'text': ' '.join(w[0] for w in sw), 't0': sw[0][1], 't1': sw[-1][2], 'verdieping': False,
                     'take': h['take'], 'lvl': 'havo', 'words': [{'w': w[0], 't0': w[1], 't1': w[2]} for w in sw]}
                c['sentences'].append(s)
                for pw in phrases_of(sw, nn):
                    c['phrases'].append({'text': ' '.join(w[0] for w in pw), 't0': r3(pw[0][1] - 0.05), 't1': None, 'n': nn, 'verd': False, 'havo': True,
                                         'w': [[w[0], w[1]] for w in pw]})
                nn += 1
            # vwo-blok direct na de invoeging begint op het einde van de invoeging
        c['segments'].sort(key=lambda g: (g['t0'], g['t1']))
        c['sentences'].sort(key=lambda s: s['t0'])
        c['phrases'].sort(key=lambda p: p['t0'])
        # frasen zonder t1: tot de volgende frase of het einde van de invoeging
        for i, p in enumerate(c['phrases']):
            if p['t1'] is None:
                h = next(x for x in ins if x['Pn'] - 1e-6 <= p['t0'] < x['Pn'] + x['D'])
                nxt = c['phrases'][i + 1]['t0'] if i + 1 < len(c['phrases']) else 1e9
                p['t1'] = r3(min(nxt, h['Pn'] + h['D']))
        blocks = [dict(b) for b in vb]
        for h in ins:
            blocks.append({'lvl': 'havo', 't0': h['Pn'], 't1': r3(h['Pn'] + h['D']), 'take': h['take']})
        blocks.sort(key=lambda b: b['t0'])
        for b in blocks: b.pop('n', None)
        c['blocks'] = blocks
        # ins: P = begin in oude (scène)tijd, Pn = begin in nieuwe tijd; blk = vwo-blok in oude tijd
        c['ins'] = [{'take': h['take'], 'P': h['P'], 'Pn': h['Pn'], 'D': h['D'], 'mode': h['mode'], 'blk': h['blk']} for h in ins]
        c['origDur'] = orig_dur
        if ins:
            encode(pcm, os.path.join(wd, 'blobs', '%03d.mp3' % (7 + ci)))
            got = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(wd, 'blobs', '%03d.mp3' % (7 + ci))], capture_output=True, text=True).stdout)
            print(f'H{ci}: dur {orig_dur} -> {c["dur"]} (mp3 {got:.3f})')
        c['hasV'] = False
        print(f'H{ci}: blocks', json.dumps(c['blocks']))
    fl.save(src, L, li, F)


if __name__ == '__main__':
    main(*sys.argv[1:4])

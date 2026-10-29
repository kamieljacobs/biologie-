"""Oude takes -> losse mp3's voor de remake (knippen/herschikken op woordtijden). Schrijft film/raw/<sid>.mp3 en film/words/<sid>.json."""
import json, subprocess, os
F = json.load(open('FILM.json')); T = F['timing']; TXT = {s['id']: s['text'] for s in F['segments']}
BLOB = {'s00':'002','q1':'003','a1':'004','q2':'005','a2':'006','s31':'007','q3':'008','a3':'009','q4':'010','a4':'011','q5':'012','a5':'013','s70':'014'}
os.makedirs('film/raw', exist_ok=True); os.makedirs('film/words', exist_ok=True)
def words(old):
    toks = TXT[old].split(); w = T[old]['words']; assert len(toks) == len(w), (old, len(toks), len(w))
    return [dict(text=t, start=x['t0'], end=x['t1']) for t, x in zip(toks, w)]
def cut(old, pieces, sid, gap=0.3):
    """pieces = lijst (i0, i1) woordindexen (inclusief i0, exclusief i1)."""
    W = words(old); dur = T[old]['duration']; src = f'oud/blobs/{BLOB[old]}.mp3'
    parts = []; out = []; t = 0.0; filt = []
    for k, (i0, i1) in enumerate(pieces):
        a = 0.0 if i0 == 0 else (W[i0-1]['end'] + W[i0]['start']) / 2
        b = dur + 0.05 if i1 >= len(W) else (W[i1-1]['end'] + W[i1]['start']) / 2
        if k: t += gap
        for x in W[i0:i1]: out.append(dict(text=x['text'], start=round(x['start'] - a + t, 3), end=round(x['end'] - a + t, 3), type='word'))
        filt.append((a, b, k > 0)); t += b - a
    # ffmpeg: knip stukken, stilte ertussen, plak
    inp = []; fc = []; n = 0
    for k, (a, b, pre) in enumerate(filt):
        if pre: fc.append(f'anullsrc=r=44100:cl=mono,atrim=0:{gap}[g{k}]'); 
        fc.append(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0,b-a-0.02):.3f}:d=0.02,aresample=44100,aformat=channel_layouts=mono[p{k}]')
    seq = ''.join((f'[g{k}]' if pre else '') + f'[p{k}]' for k, (a, b, pre) in enumerate(filt)); cnt = len(filt) + sum(1 for f in filt if f[2])
    fc.append(f'{seq}concat=n={cnt}:v=0:a=1[o]')
    subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-filter_complex',';'.join(fc),'-map','[o]','-ac','1','-b:a','128k',f'film/raw/{sid}.mp3'], check=True)
    json.dump({'words': out, 'method': 'oude ElevenLabs-woordtijden (FILM.timing), herschikt'}, open(f'film/words/{sid}.json','w'), ensure_ascii=False)
    return ' '.join(x['text'] for x in out)
def idx(old, word, n=1):
    W = words(old); c = 0
    for i, x in enumerate(W):
        if x['text'].startswith(word): 
            c += 1
            if c == n: return i
    raise KeyError(old + word)
disp = {}
disp['s01'] = cut('s00', [(0, 999)], 's01')
# vraagzinnen: 'Wat denk je?' (woord 0-2) naar achteren; a-segmenten zonder 'Het goede antwoord is X.' (woord 0-4)
disp['s03'] = cut('q1', [(3, 999), (0, 3)], 's03')
disp['s06'] = cut('q2', [(3, 999), (0, 3)], 's06')
disp['s05'] = cut('a1', [(5, 999)], 's05')
disp['s08'] = cut('a2', [(5, 999)], 's08')
disp['s09'] = cut('s31', [(0, 999)], 's09')
disp['s10'] = cut('q3', [(3, 999), (0, 3)], 's10')
disp['s12'] = cut('a3', [(5, 999)], 's12')
disp['s13'] = cut('q4', [(3, 999), (0, 3)], 's13')
disp['s16'] = cut('q5', [(3, 999), (0, 3)], 's16')
disp['s18'] = cut('a5', [(5, 999)], 's18')
disp['s19'] = cut('s70', [(0, 999)], 's19')
json.dump(disp, open('disp_oud.json','w'), ensure_ascii=False, indent=1)
for k, v in disp.items(): print(k, v[:90], '…', v[-40:])

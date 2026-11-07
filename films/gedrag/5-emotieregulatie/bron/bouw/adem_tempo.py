"""adem_tempo.py <in.mp3> <words.json> <uit.wav> <uit_words.json>
Zet de tellingen in s23 ('probeer het zelf') op een rustig ademtempo door stilte in te voegen in de pauzes tussen de woorden:
in: twee drie vier = 1 s per tel; uit: twee … zes = 1 s per tel; na 'zes' 1 s tot de volgende zin. Woordtijden schuiven mee.
(Gemaakt 20 okt 2026; de TTS telde ~0,85 s per tel.)"""
import json, subprocess, sys, numpy as np
src, wj, out, wout = sys.argv[1:5]
raw = subprocess.check_output(['ffmpeg', '-loglevel', 'error', '-i', src, '-f', 's16le', '-ac', '1', '-ar', '44100', '-'])
a = np.frombuffer(raw, dtype=np.int16).astype(np.int16); SR = 44100
W = json.load(open(wj)); W = W['words'] if isinstance(W, dict) else W; W = [w for w in W if w.get('type', 'word') == 'word']
t = [w['text'].lower().strip('.,:?!') for w in W]
# gewenste afstand (s) van woord i-1 naar woord i, voor de ankerwoorden in de twee ademhalingen
want = {}
def cyclus(i_in):
    # i_in = index van 'in'; daarna twee drie vier, (En) (langzaam) uit, twee drie vier vijf zes
    k = i_in
    for _ in range(3): want[k + 1] = 1.0; k += 1           # twee, drie, vier
    u = next(j for j in range(k + 1, k + 4) if t[j] == 'uit')
    want[u] = None                                          # natuurlijk (En langzaam uit), min. 1,0 s na 'vier'
    for j in range(u + 1, u + 6): want[j] = 1.0             # twee … zes
    return u + 5
ins = [i for i, x in enumerate(t) if x == 'in'][:2]
z1 = cyclus(ins[0]); z2 = cyclus(ins[1])
want[z1 + 1] = 1.0   # 'Nog' 1 s na 'zes'
want[z2 + 1] = 1.2   # 'Of' na de tweede ademhaling
inserts = []  # (positie in s, duur)
shift = 0.0; neww = []
for i, w in enumerate(W):
    if i in want and want[i] is not None:
        gap = w['start'] - W[i - 1]['start']; extra = max(0.0, want[i] - gap)
        if extra > 0: inserts.append(((W[i - 1]['end'] + w['start']) / 2, extra)); shift += extra
    elif i in want and want[i] is None:
        gap = w['start'] - W[i - 3]['start'] if t[i - 2] == 'en' else w['start'] - W[i - 2]['start']
        # houd 'uit' minstens 1,0 s na 'vier'
        iv = max(j for j in range(i) if t[j] == 'vier'); g = w['start'] - W[iv]['start']; extra = max(0.0, 1.0 - g)
        if extra > 0: inserts.append(((W[i - 1]['end'] + w['start']) / 2, extra)); shift += extra
    neww.append({**w, 'start': round(w['start'] + shift, 3), 'end': round(w['end'] + shift, 3)})
parts = []; prev = 0
for pos, d in inserts:
    p = int(pos * SR); parts += [a[prev:p], np.zeros(int(d * SR), dtype=np.int16)]; prev = p
parts.append(a[prev:]); b = np.concatenate(parts)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ac', '1', '-ar', '44100', '-i', '-', out], input=b.tobytes(), check=True)
json.dump({'words': neww}, open(wout, 'w'), ensure_ascii=False)
print('ingevoegd', round(shift, 2), 's;', len(inserts), 'pauzes;', 'duur', round(len(b) / SR, 2))
for w in neww: print(w['text'], w['start'])

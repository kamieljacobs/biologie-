"""Lokale woordtijden zonder transcriptie: stiltes in de take koppelen aan leestekens in de tekst.
Gebruik: python3 silalign.py <filmdir> [sid ...]   (leest raw/<sid>.mp3 en segments.json, schrijft words/<sid>.json)
Werkwijze: RMS-envelop (10 ms) -> stilteblokken (>= 90 ms onder de drempel). De tekst wordt in stukken geknipt bij
leestekens; elk leesteken krijgt via dynamisch programmeren een stilte toegewezen (in volgorde, dichtbij de voorspelde
plek, zinseinden wegen zwaarder). Binnen een stuk worden de woorden verdeeld naar geschat aantal lettergrepen.
Gecontroleerd tegen Scribe op Transport 1 s01: gemiddelde afwijking van de woordbegintijden zie calibrate."""
INF = float("inf")
import json, os, re, subprocess, sys
import numpy as np

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    hop = 160
    n = len(x) // hop
    rms = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
    return rms, len(x) / 16000

def silences(rms, thr_db=float(os.environ.get("SIL_DB", -38)), minlen=int(os.environ.get("SIL_MIN", 9))):
    db = 20 * np.log10(rms + 1e-9)
    ref = np.percentile(db, 95)
    q = db < ref + thr_db
    out = []; i = 0; n = len(q)
    while i < n:
        if q[i]:
            j = i
            while j < n and q[j]: j += 1
            if j - i >= minlen: out.append((i / 100, j / 100))
            i = j
        else: i += 1
    return out

def syl(w):
    w = w.lower()
    g = re.findall(r'[aeiouyàáèéëïöüê]+', w)
    return max(1, len(g)) + (0.6 if re.search(r'\d', w) else 0)

def align(words, rms, dur):
    sil = silences(rms)
    # leading/trailing silence
    t0 = sil[0][1] if sil and sil[0][0] <= 0.02 else 0.0
    t1 = sil[-1][0] if sil and sil[-1][1] >= dur - 0.05 else dur
    inner = [s for s in sil if s[0] > t0 + 0.05 and s[1] < t1 - 0.05]
    wt = [syl(w) for w in words]
    cum = np.concatenate([[0], np.cumsum(wt)]); tot = cum[-1]
    # boundaries after word k
    B = []
    for k, w in enumerate(words[:-1]):
        if re.search(r'[.?!]["”]?$', w): B.append((k, 3.0))
        elif re.search(r'[,:;]$', w): B.append((k, 1.0))
    # expected pause share: estimate speech rate from total minus silences
    speech = (t1 - t0) - sum(e - s for s, e in inner)
    pz = np.zeros(len(words))
    for k, typ in B: pz[k] = 0.32 if typ > 2 else 0.12
    tl = np.concatenate([[0], np.cumsum(np.array(wt) + 0)]) ; pc = np.concatenate([[0], np.cumsum(pz)])
    # time of end of word k = a*cum_syl + pauses_before ; fit a so total matches
    a = ((t1 - t0) - pc[-1]) / tot
    def pred(k):
        return t0 + a * cum[k + 1] + pc[k] + pz[k] / 2
    K, M = len(B), len(inner)
    rate = speech / tot  # seconds per syllable-weight
    # nodes: (i, j) = boundary i matched to silence j; virtual start (-1,-1) at t0, virtual end (K, M) at t1
    def seg_cost(i0, j0, i1, j1):
        w0 = B[i0][0] + 1 if i0 >= 0 else 0
        w1 = B[i1][0] + 1 if i1 < K else len(words)
        syl_ = cum[w1] - cum[w0]
        s_t = inner[j0][1] if j0 >= 0 else t0
        e_t = inner[j1][0] if j1 < M else t1
        act = e_t - s_t
        if act <= 0.05: return INF
        # silences skipped inside this stretch count as speech time (pauses without punctuation)
        skipped = [inner[x] for x in range(j0 + 1, j1)]
        act_sp = act - sum(e - s for s, e in skipped)
        exp_ = rate * syl_
        c = abs(np.log(max(act_sp, 0.05) / max(exp_, 0.05))) * 4
        c += sum(min(3.0, (e - s) * 8) for s, e in skipped)
        c += sum(2.5 if B[x][1] > 2 else 0.6 for x in range(i0 + 1, i1))
        return c
    best = {(-1, -1): (0.0, None)}
    nodes = [(i, j) for i in range(K) for j in range(M)] + [(K, M)]
    for (i1, j1) in nodes:
        cand = None
        for (i0, j0), (c0, _) in list(best.items()):
            if i0 < i1 and j0 < j1:
                c = c0 + seg_cost(i0, j0, i1, j1)
                if i1 < K:
                    dd = inner[j1][1] - inner[j1][0]
                    c -= 0.5 if (B[i1][1] > 2 and dd > 0.2) else 0
                if cand is None or c < cand[0]: cand = (c, (i0, j0))
        if cand: best[(i1, j1)] = cand
    match = {}; node = (K, M)
    while node != (-1, -1):
        prev = best[node][1]
        if node != (K, M): match[B[node[0]][0]] = inner[node[1]]
        node = prev
    # anchors: word index ranges between matched silences
    anchors = [(-1, t0)]  # (last word idx before, time speech resumes)
    ends = {}
    for k in sorted(match):
        s, e = match[k]; ends[k] = s; anchors.append((k, e))
    out = [None] * len(words)
    for ai in range(len(anchors)):
        k0, start = anchors[ai]
        k1 = anchors[ai + 1][0] if ai + 1 < len(anchors) else len(words) - 1
        end = ends.get(k1, t1)
        idx = list(range(k0 + 1, k1 + 1))
        w = np.array([wt[x] for x in idx]); w = w / w.sum()
        # small gaps between words
        t = start; span = end - start
        for x, f in zip(idx, w):
            d = span * f
            out[x] = {'text': words[x], 'start': round(t, 3), 'end': round(t + d * 0.92, 3)}
            t += d
    return out, len(match), K

if __name__ == '__main__':
    fdir = sys.argv[1]; want = set(sys.argv[2:])
    segs = [s for s in json.load(open(os.path.join(fdir, 'segments.json'))) if s['kind'] == 'speech']
    os.makedirs(os.path.join(fdir, 'words'), exist_ok=True)
    for s in segs:
        if want and s['id'] not in want: continue
        p = os.path.join(fdir, 'raw', s['id'] + '.mp3')
        if not os.path.exists(p): print('geen audio', s['id']); continue
        rms, dur = load(p)
        out, m, K = align(s['display'].split(), rms, dur)
        json.dump({'words': out, 'method': 'silalign'}, open(os.path.join(fdir, 'words', s['id'] + '.json'), 'w'), ensure_ascii=False)
        print(s['id'], 'dur %.1f' % dur, 'leestekens %d, gekoppeld %d' % (K, m))

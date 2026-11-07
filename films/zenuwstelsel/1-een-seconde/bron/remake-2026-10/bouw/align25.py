"""silalign met drempel -25 dB (de multilingual_v2-takes van Roos hebben een hogere ruisvloer)."""
import sys, json, os; sys.path.insert(0, '/home/claude/werk/zen1r/eng'); import silalign as S
_s = S.silences; S.silences = lambda rms, thr_db=-25, minlen=9: _s(rms, -25, minlen)
segs = {s['id']: s for s in json.load(open('segments.json')) if s['kind'] == 'speech'}
for sid in sys.argv[1:]:
    rms, dur = S.load(f'raw/{sid}.mp3'); out, m, K = S.align(segs[sid]['display'].split(), rms, dur)
    json.dump({'words': out, 'method': 'silalign -25 dB'}, open(f'words/{sid}.json', 'w'), ensure_ascii=False); print(sid, 'dur %.1f' % dur, K, m)

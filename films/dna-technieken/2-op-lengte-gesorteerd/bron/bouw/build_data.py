"""segments.json + words/*.json + film.json -> filmdata.json"""
import re, json, sys, os
fdir = sys.argv[1]
segs = json.load(open(os.path.join(fdir, 'segments.json'))); film = json.load(open(os.path.join(fdir, 'film.json')))
out = []; chapters = []; fake = False
for s in segs:
    ch = s['chapter']
    if ch not in chapters: chapters.append(ch)
    o = {'id': s['id'], 'kind': s['kind'], 'level': s['level'], 'chapter': ch}
    if s['kind'] == 'speech':
        wj = json.load(open(os.path.join(fdir, 'words', s['id'] + '.json'))); fake |= bool(wj.get('fake'))
        w = [x for x in wj['words'] if x.get('type', 'word') == 'word']
        disp = [d + '\u200b' if re.fullmatch(r'(Dr|E|Mr|Mevr|St|bv|vs)\.', d) else d for d in s['display'].split()]  # afkorting: geen nieuwe ondertitel na 'Dr.' of 'E.'
        assert len(w) == len(disp), (s['id'], len(w), len(disp), [x['text'] for x in w][:8])
        o['words'] = [{'t': d, 's': round(x['start'], 3), 'e': round(x['end'], 3)} for d, x in zip(disp, w)]
        o['audio'] = f"audio/{s['id']}.mp3"
        o['dur'] = round(w[-1]['end'] + 0.45, 2)
    elif s['kind'] == 'question':
        qd = film['questions'][s['id']]
        o['q'] = qd['q']; o['options'] = s['options']; o['correct'] = qd['correct']; o['explain'] = qd['explain']
    elif s['kind'] == 'card':
        o['lines'] = s['lines']
    out.append(o)
keys = ['title', 'sub', 'puzzle', 'meta', 'version', 'minis', 'endHaak', 'titleLook', 'alleen']
json.dump({'segments': out, 'chapters': chapters, 'film': {k: film.get(k) for k in keys}, 'preview': fake}, open(os.path.join(fdir, 'filmdata.json'), 'w', encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur', 0) for o in out); bas = sum(o.get('dur', 0) for o in out if o['level'] == 'basis')
print('narration %.0f s (basis %.0f s)%s' % (tot, bas, ' [VOORLOPIGE TIJDEN]' if fake else ''))

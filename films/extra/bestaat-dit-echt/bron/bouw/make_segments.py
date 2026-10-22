"""script_vN.md -> segments.json (display + voice input per speech segment).
Usage: python3 make_segments.py <filmdir> <script.md>
Segment boundaries: a [VRAAG] line, a VWO marker, a chapter heading, or an empty line inside a chapter.
## Titel and ## Eindkaart become kind 'title' / 'card'.
"""
import re, json, sys, os
fdir, sname = sys.argv[1], sys.argv[2]
src = open(os.path.join(fdir, sname), encoding='utf-8').read()
body = src.split('\n---', 1)[1]
secs = re.split(r'\n## ', '\n' + body)
segments = []
n = 0
def nid(prefix):
    global n
    n += 1
    return f'{prefix}{n:02d}'
for s in secs:
    s = s.strip('\n')
    if not s.strip():
        continue
    head, _, rest = s.partition('\n')
    chapter = re.sub(r'\s*\[.*?\]\s*$', '', head).strip()
    look = (re.search(r'\[(.*?)\]\s*$', head) or [None, ''])[1]
    if chapter == 'Titel':
        t = rest.strip().split('\n')[0]
        segments.append({'id': nid('s'), 'kind': 'title', 'chapter': 'Titel', 'level': 'beginner', 'text': t})
        continue
    if chapter == 'Eindkaart':
        segments.append({'id': nid('s'), 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'beginner',
                         'lines': [l.strip() for l in rest.split('\n') if l.strip()]})
        continue
    level = 'beginner'
    buf = []
    def flush():
        if buf:
            segments.append({'id': nid('s'), 'kind': 'speech', 'chapter': chapter, 'look': look,
                             'level': level, 'lines': list(buf)})
            buf.clear()
    for raw in rest.split('\n'):
        l = raw.strip()
        if not l:
            flush(); level = 'beginner'; continue
        if l.startswith('[M] '): flush(); level = 'basis'; l = l[4:]
        elif l.startswith('[G] '): flush(); level = 'gevorderd'; l = l[4:]
        if l.startswith('[VWO-START]'):
            flush(); level = 'vwo'; l = l.replace('[VWO-START]', '').strip()
        end = l.endswith('[VWO-END]')
        if end:
            l = l.replace('[VWO-END]', '').strip()
        if l.startswith('[VRAAG]'):
            flush()
            opts = [re.sub(r'^\(?[a-d]\)\s*', '', o.strip()) for o in l.replace('[VRAAG]', '').split('·')]
            segments.append({'id': nid('q'), 'kind': 'question', 'chapter': chapter, 'level': level, 'options': opts})
        elif l:
            buf.append(l)
        if end:
            flush(); level = 'basis'
    flush()

# voice input: series uitspraaklijst (Part B5 + series additions); captions keep the display text
SUBS = json.load(open(os.path.join(os.path.dirname(__file__), 'uitspraak_subs.json'), encoding='utf-8'))
# optioneel: film-eigen respellings (bijv. losse bloedgroepletters) in <werkmap>/uitspraak_film.json; die gaan vóór de reekslijst
_ff = os.path.join(fdir, 'uitspraak_film.json')
if os.path.exists(_ff): SUBS = json.load(open(_ff, encoding='utf-8')) + SUBS
def voice_word(w):
    for a, b in SUBS:
        w = re.sub(a, b, w)
    return w
for seg in segments:
    if seg['kind'] == 'speech':
        seg['display'] = ' '.join(seg['lines'])
        vt, vmap = [], []
        for i, w in enumerate(seg['display'].split()):
            for tok in voice_word(w).split():
                vt.append(tok); vmap.append(i)
        seg['voice'] = ' '.join(vt); seg['vmap'] = vmap
json.dump(segments, open(os.path.join(fdir, 'segments.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
sp = [s for s in segments if s['kind'] == 'speech']
import collections; c = collections.Counter(); [c.update({s['level']: len(s['display'].split())}) for s in sp]
print(len(sp), 'speech segments;', dict(c))
for s in segments:
    print(s['id'], s['kind'], s['level'], s['chapter'][:44], len(s.get('display', '').split()))

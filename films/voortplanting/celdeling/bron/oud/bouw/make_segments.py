import re, json
src = open('script_v2.md', encoding='utf-8').read()
body = src.split('---',1)[1]
# split into sections by ## headings
secs = re.split(r'\n## ', body)
segments = []  # {id, chapter, level, kind, text_display, lines:[...]}
seg_i = 0
for s in secs:
    s = s.strip()
    if not s: continue
    head, _, rest = s.partition('\n')
    chapter = re.sub(r'\s*\[.*?\]\s*$', '', head).strip()
    lines = [l.strip() for l in rest.split('\n')]
    while lines and not lines[-1]: lines.pop()
    level = 'basis'
    buf = []
    def flush(kind='speech'):
        global seg_i
        nonlocal_buf = buf
        if not nonlocal_buf: return
        seg_i += 1
        segments.append({'id': f's{seg_i:02d}', 'chapter': chapter, 'level': level, 'kind': kind, 'lines': list(nonlocal_buf)})
        nonlocal_buf.clear()
    for l in lines:
        if not l:
            flush(); continue
        if l.startswith('[VWO-START]'):
            flush(); level = 'vwo'; l = l.replace('[VWO-START]','').strip()
        if l.startswith('[EXTRA-START]'):
            flush(); level = 'extra'; l = l.replace('[EXTRA-START]','').strip()
        end = False
        if l.endswith('[VWO-END]') or l.endswith('[EXTRA-END]'):
            end = True; l = l.replace('[VWO-END]','').replace('[EXTRA-END]','').strip()
        if l.startswith('[VRAAG]'):
            flush()
            opts = [o.strip() for o in l.replace('[VRAAG]','').split('·')]
            seg_i += 1
            segments.append({'id': f'q{seg_i:02d}', 'chapter': chapter, 'level': level, 'kind': 'question', 'options': opts})
        else:
            buf.append(l)
        if end:
            flush(); level = 'basis'
    flush()
json.dump(segments, open('segments.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
# voice input substitutions
subs = [
 (r'\bhaploïde\b', 'haaploïde'), (r'\bhaploïd\b', 'haaploïd'),
 (r'\btweeënnegentig\b', 'tweeën-neguntig'),
 (r"\bX'en\b", 'iksen'), (r'\bXX\b', 'iks-iks'), (r'\bXY\b', 'iks-ei'), (r'\bX\b', 'iks'), (r'\bY\b', 'ei'),
 (r'\bWat denk je\?', 'Wat denk je?'),
]
def voice(t):
    for a,b in subs: t = re.sub(a,b,t)
    return t
n=0
for seg in segments:
    if seg['kind']=='speech':
        seg['display'] = ' '.join(seg['lines'])
        seg['voice'] = voice(seg['display'])
        n+=1
json.dump(segments, open('segments.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
words = sum(len(s['display'].split()) for s in segments if s['kind']=='speech')
wb = sum(len(s['display'].split()) for s in segments if s['kind']=='speech' and s['level']=='basis')
print(n, 'speech segments;', words, 'words total;', wb, 'basis;', words-wb, 'vwo')
for s in segments: print(s['id'], s['level'], s['kind'], s['chapter'][:40], len(s.get('display','').split()))

# script_v2.md -> segments.json (display + voice). Lege regel = nieuwe take; [VRAAG]; [VWO-START]/[VWO-END] = uitdaging.
import re, json
cfg = json.load(open('film.json', encoding='utf-8'))
src = open('script_v2.md', encoding='utf-8').read()
body = src.split('\n---\n',1)[1]
secs = re.split(r'\n## ', '\n'+body)
segments=[]; seg_i=0
for s in secs:
    s=s.strip()
    if not s: continue
    head,_,rest=s.partition('\n')
    chapter=re.sub(r'\s*\[.*?\]\s*$','',head).strip()
    level='basis'; buf=[]
    def flush():
        global seg_i
        if not buf: return
        seg_i+=1; segments.append({'id':f's{seg_i:02d}','chapter':chapter,'level':level,'kind':'speech','lines':list(buf)}); buf.clear()
    for l in [x.strip() for x in rest.split('\n')]:
        if not l: flush(); continue
        if l.startswith('[VWO-START]'): flush(); level='vwo'; l=l.replace('[VWO-START]','').strip()
        end=l.endswith('[VWO-END]')
        if end: l=l.replace('[VWO-END]','').strip()
        if l.startswith('[VRAAG]'):
            flush(); seg_i+=1
            segments.append({'id':f'q{seg_i:02d}','chapter':chapter,'level':level,'kind':'question','options':[o.strip() for o in l.replace('[VRAAG]','').split('·')]})
        elif l: buf.append(l)
        if end: flush(); level='basis'
    flush()
# stem-invoer: centrale uitspraaklijst (films/uitspraak.json, per woord) + film-eigen regels (film.json "subs", op de hele tekst)
cent = json.load(open('/home/claude/biologie-/films/uitspraak.json', encoding='utf-8'))
film_subs = cfg.get('subs', [])
def voice(t):
    for a,b in film_subs: t=re.sub(a,b,t)
    out=[]
    for w in t.split(' '):
        for a,b in cent:
            if re.search(a,w): w=re.sub(a,b,w); break
        out.append(w)
    return ' '.join(out)
n=0
for seg in segments:
    if seg['kind']=='speech':
        seg['display']=' '.join(seg['lines']); seg['voice']=voice(seg['display']); n+=1
json.dump(segments, open('segments.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
words=sum(len(s['display'].split()) for s in segments if s['kind']=='speech')
wb=sum(len(s['display'].split()) for s in segments if s['kind']=='speech' and s['level']=='basis')
chars=sum(len(s['voice']) for s in segments if s['kind']=='speech')
print(n,'takes;',words,'woorden;',wb,'basis;',words-wb,'uitdaging;',chars,'tekens stem-invoer')
for s in segments: print(s['id'], s['level'], s['kind'], s['chapter'][:34], len(s.get('display','').split()), '' if s['kind']!='speech' or s['voice']==s['display'] else 'VOICE≠')

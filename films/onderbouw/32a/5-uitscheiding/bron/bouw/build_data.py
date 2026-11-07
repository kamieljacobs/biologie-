import json, re
cfg=json.load(open('film.json',encoding='utf-8'))
segs=json.load(open('segments.json',encoding='utf-8'))
Q=cfg['questions']; HOLD=cfg.get('hold',{})
chapters,out=[],[]
for s in segs:
    ch=s['chapter']
    if ch not in chapters: chapters.append(ch)
    o={'id':s['id'],'kind':s['kind'],'level':s['level'],'chapter':ch}
    if s['kind']=='speech':
        w=json.load(open(f"words/{s['id']}.json"))['words']
        disp=s['display'].split(); m=[]
        for tok in disp:
            if m and m[-1] in ("'s","’s"): m[-1]=m[-1]+' '+tok
            else: m.append(tok)
        assert len(w)==len(m),(s['id'],len(w),len(m))
        o['words']=[{'t':d,'s':round(x['start'],3),'e':round(x['end'],3)} for d,x in zip(m,w)]
        o['audio']=f"audio/{s['id']}.mp3"
        o['dur']=max(round(w[-1]['end']+0.45,2),HOLD.get(s['id'],0))
    else:
        q=Q[s['id']]; o['q']=q['q']; o['options']=[re.sub(r'^\(?[a-d]\)\s*','',x) for x in s['options']]; o['correct']=q['correct']; o['explain']=q['explain']
    out.append(o)
json.dump({'segments':out,'chapters':chapters},open('filmdata.json','w',encoding='utf-8'),ensure_ascii=False)
tot=sum(o.get('dur',0) for o in out); bas=sum(o.get('dur',0) for o in out if o['level']=='basis')
print('audio totaal %.0f s, basis %.0f s'%(tot,bas))

# woordtijden uit Scribe (gekoppeld aan de TTS-node): per take start,eind per woord; tekst = stem-invoer (Scribe gaf woord voor woord dezelfde tekst terug)
import json,sys
segs={s['id']:s for s in json.load(open('segmenten.json')) if s['kind']=='speech'}
def zet(sid,tijden,scribe_gelijk=True):
    w=segs[sid]['voice'].split(); t=[tuple(map(float,x.split(','))) for x in tijden.split()]
    assert len(w)==len(t),(sid,len(w),len(t))
    json.dump({'words':[{'text':a,'start':s,'end':e,'type':'word'} for a,(s,e) in zip(w,t)],'text':segs[sid]['voice'],'scribe_gelijk':scribe_gelijk},open(f'stem/woordtijden/{sid}.json','w'),ensure_ascii=False)
    print(sid,len(w),'ok')

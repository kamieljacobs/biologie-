import json, re
segs = json.load(open('segments.json'))
answers = {
 'q02': (1, 'Je beenspieren krijgen hulp: zuurstof uit je longen, voedingsstoffen uit je darmen, allebei via je bloed.'),
 'q07': (1, 'Ja. In een bot zitten levende botcellen. Daarom groeit een gebroken bot weer aan elkaar.'),
 'q09': (1, 'Ja. Bloed zit vol cellen met dezelfde taak: vervoeren. Ze zwemmen alleen in vocht.'),
 'q13': (1, 'Ja. Wortel, stengel, blad en bloem zijn de organen van een plant.'),
}
questions_text = {
 'q02': 'Je sprint. Waarom doet de rest van je lichaam mee?',
 'q07': 'Een bot is hard. Zit daar nog leven in?',
 'q09': 'Bloed stroomt. Is bloed ook een weefsel?',
 'q13': 'Heeft een plant ook organen?',
}
HOLD = {'s18': 12.0}   # eindkaart blijft staan na de korte zin
chapters, out = [], []
for s in segs:
    ch = s['chapter']
    if ch not in chapters: chapters.append(ch)
    o = {'id': s['id'], 'kind': s['kind'], 'level': s['level'], 'chapter': ch}
    if s['kind'] == 'speech':
        w = json.load(open(f"words/{s['id']}.json"))['words']
        disp = s['display'].split()
        assert len(w) == len(disp), (s['id'], len(w), len(disp))
        o['words'] = [{'t': d, 's': round(x['start'],3), 'e': round(x['end'],3)} for d,x in zip(disp,w)]
        o['audio'] = f"audio/{s['id']}.mp3"
        o['dur'] = max(round(w[-1]['end'] + 0.45, 2), HOLD.get(s['id'], 0))
    elif s['kind'] == 'question':
        o['q'] = questions_text[s['id']]
        o['options'] = [re.sub(r'^\(?[a-d]\)\s*','',x) for x in s['options']]
        o['correct'], o['explain'] = answers[s['id']]
    out.append(o)
json.dump({'segments': out, 'chapters': chapters}, open('filmdata.json','w',encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur',0) for o in out); bas = sum(o.get('dur',0) for o in out if o['level']=='basis')
print('narration total %.0f s, basis %.0f s' % (tot,bas)); print(chapters)

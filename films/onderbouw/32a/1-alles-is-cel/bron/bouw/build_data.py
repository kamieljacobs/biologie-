import json, re
segs = json.load(open('segments.json'))
answers = {
 'q02': (2, 'Het water gaat het blad in. Waar het daar blijft, zie je als je inzoomt.'),
 'q09': (0, 'Je cellen verbranden voedingsstoffen uit je eten. Daarbij komt energie vrij.'),
 'q12': (1, 'Ook een plant moet voedsel verbranden om energie te krijgen. Dus ook een plantencel heeft mitochondriën.'),
 'q16': (2, 'De vacuole in elke cel verliest water. De cellen leven nog en de wanden blijven heel.'),
}
questions_text = {
 'q02': 'Waar is het water gebleven?',
 'q09': 'Waar haalt een wangcel zijn energie vandaan?',
 'q12': 'Een plant maakt zijn eigen voedsel. Heeft een plantencel dan nog mitochondriën nodig?',
 'q16': 'De sla ligt op het aanrecht. Wat gebeurt er in de cellen van het blad?',
}
HOLD = {'s19': 12.0}   # eindkaart blijft staan na de korte zin
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

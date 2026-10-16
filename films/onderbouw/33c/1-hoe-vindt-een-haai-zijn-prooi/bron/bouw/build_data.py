import json, re
segs = json.load(open('segments.json'))
answers = {
 'q04': (1, 'In het beste geval ruikt een haai één druppel bloed in een groot zwembad. Maar de zee is veel groter, en de stroming neemt de geur mee. Kilometers ver lukt niet.'),
 'q07': (2, 'De vis ligt stil in het zand. Ogen en zijlijn helpen dan niet meer. Maar zijn hart en kieuwen blijven bewegen, en die spieren maken kleine elektrische signalen.'),
 'q10': (1, 'Haaien hebben geen zwemblaas. Hun grote lever zit vol olie, en olie is lichter dan water. Als ze zwemmen, geven hun vinnen extra lift.'),
 'q16': (1, 'Zonder haaien durven de grazers overal te komen. Dan kan het zeegras kaal gegeten worden, ook waar jonge vissen schuilen.'),
}
questions_text = {
 'q04': 'Hoeveel water mag er hoogstens om één druppel bloed zitten, zodat een haai hem nog ruikt?',
 'q07': 'De vis ligt in het zand. Hoe vindt de haai hem nu?',
 'q10': 'Een haai is iets zwaarder dan water. Wat helpt hem het meest om niet te zakken?',
 'q16': 'De tijgerhaaien verdwijnen uit de baai. Wat gebeurt er met het zeegras?',
}
HOLD = {'s20': 12.0}   # eindkaart blijft staan na de korte zin
chapters, out = [], []
for s in segs:
    ch = s['chapter']
    if ch not in chapters: chapters.append(ch)
    o = {'id': s['id'], 'kind': s['kind'], 'level': s['level'], 'chapter': ch}
    if s['kind'] == 'speech':
        w = json.load(open(f"words/{s['id']}.json"))['words']
        disp = s['display'].split()
        m=[]
        for tok in disp:
            if m and m[-1] in ("'s","’s"): m[-1]=m[-1]+' '+tok
            else: m.append(tok)
        disp=m
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

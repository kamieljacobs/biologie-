import json, re
segs = json.load(open('segments.json'))
answers = {
 'q02': (2, 'Bijna al je organen werken door als je slaapt: je hart, je longen, je nieren, je hersenen. Alleen rustiger.'),
 'q06': (1, 'De lever hoort vooral bij je spijsvertering: hij maakt een sap dat helpt bij het verteren van vet en bewaart voedingsstoffen.'),
 'q12': (1, 'Je huid is een orgaan: verschillende weefsels samen (dekweefsel, bindweefsel, zenuwen, bloedvaten) met een eigen taak.'),
 'q14': (1, 'Hormonen werken je hele leven, van baby tot oud. In de puberteit komen er een paar bij.'),
}
questions_text = {
 'q02': 'Je slaapt. Hoeveel van je organen zijn nu aan het werk?',
 'q06': 'Bij welk stelsel hoort de lever?',
 'q12': 'Is je huid een orgaan?',
 'q14': 'Hormonen: zijn die er alleen in de puberteit?',
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

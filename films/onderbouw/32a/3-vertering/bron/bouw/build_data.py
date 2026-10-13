import json, re
segs = json.load(open('segments.json'))
answers = {
 'q02': (2, 'De appel is klein gemaakt, afgebroken en door de darmwand in je bloed opgenomen. De pit niet: te hard en te groot.'),
 'q06': (0, 'Spieren in de wand van je slokdarm duwen het eten naar je maag, ook tegen de zwaartekracht in.'),
 'q09': (1, 'Alleen in de dunne darm gaan de voedingsstoffen door de darmwand het bloed in. Het bloed brengt ze naar je cellen.'),
 'q14': (2, 'Zonder het sap van de alvleesklier komen de meeste voedingsstoffen niet los. Ze gaan de wc in, je lichaam krijgt bijna niets.'),
}
questions_text = {
 'q02': 'Waarom verdwijnt de appel wel en de pit niet?',
 'q06': 'Je hangt op je kop en slikt. Komt het eten in je maag?',
 'q09': 'De voedingsstoffen zijn los. Hoe komen ze bij je cellen?',
 'q14': 'Je alvleesklier stopt, de rest werkt door. Wat gebeurt er?',
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

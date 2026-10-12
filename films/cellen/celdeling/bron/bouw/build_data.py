import json, re
segs = json.load(open('segments.json'))
answers = {
 'q02': (1, 'Eerst kopiëren, dan verdelen. Zo krijgt elke nieuwe cel al het DNA.'),
 'q07': (1, 'In de interfase (de S-fase). Als de mitose begint, is het DNA al dubbel.'),
 'q14': (1, 'Vier: elke X is één chromosoom met twee chromatiden. Tel de centromeren.'),
 'q18': (1, '46, net als de moedercel: elke dochtercel krijgt van elk chromosoom één chromatide.'),
 'q23': (1, '23: de paren gaan in meiose I uit elkaar. Elk chromosoom heeft nog twee chromatiden.'),
 'q28': (1, 'Alleen in meiose I liggen homologe chromosomen als paren in het equatorvlak.'),
 'q31': (2, '24 + 23 = 47. Is het extra chromosoom nummer 21, dan heeft het kind trisomie 21.'),
 'eq02': (1, 'De cel wacht: de foute verbinding gaat los, tot het chromosoom goed vastzit en onder spanning staat.'),
 'q34': (1, 'De huidcel: 46 chromosomen tegen 23 in de zaadcel, dus ongeveer twee keer zoveel DNA.'),
}
questions_text = {
 'q02': 'Hoe verdeelt een cel zijn DNA eerlijk over twee nieuwe cellen?',
 'q07': 'Wanneer wordt het DNA gekopieerd?',
 'q14': 'Deze cel heeft vier X\'en. Hoeveel chromosomen zie je?',
 'q18': 'Hoeveel chromosomen heeft elke dochtercel na de mitose (mens)?',
 'q23': 'Hoeveel chromosomen heeft elke cel na meiose I (mens)?',
 'q28': 'Bij welke deling liggen homologe chromosomen als paren in het equatorvlak?',
 'q31': 'Een eicel met 24 chromosomen wordt bevrucht door een normale zaadcel. Hoeveel chromosomen heeft het kind?',
 'eq02': 'Eén chromosoom hangt met beide kinetochoren aan dezelfde pool. Wat doet de cel?',
 'q34': 'Een huidcel die niet deelt en een zaadcel van dezelfde man. Welke heeft meer DNA in de kern?',
}
chapters = []  # ordered unique chapters
out = []
for s in segs:
    ch = s['chapter']
    if ch not in chapters: chapters.append(ch)
    o = {'id': s['id'], 'kind': s['kind'], 'level': s['level'], 'chapter': ch}
    if s['kind'] == 'speech':
        w = json.load(open(f"words/{s['id']}.json"))['words']
        disp = s['display'].split()
        assert len(w) == len(disp), (s['id'], len(w), len(disp))
        import re as _re
        disp2=list(disp)
        for k in range(1,len(disp2)):
            if disp2[k-1].lower()=='meiose':
                m=_re.match(r'^(één|twee)([.,:;?]?)$',disp2[k])
                if m: disp2[k]=('I' if m.group(1)=='één' else 'II')+m.group(2)
        o['words'] = [{'t': d, 's': round(x['start'],3), 'e': round(x['end'],3)} for d,x in zip(disp2,w)]
        o['audio'] = f"audio/{s['id']}.mp3"
        o['dur'] = round(w[-1]['end'] + 0.35, 2)
    elif s['kind'] == 'question':
        o['q'] = questions_text[s['id']]
        o['options'] = [re.sub(r'^\(?[a-d]\)\s*','',x).replace('meiose één','meiose I').replace('meiose twee','meiose II') for x in s['options']]
        o['correct'], o['explain'] = answers[s['id']]
    elif s['kind'] == 'title':
        o['text'] = 'Celdeling'; o['sub'] = 'Eerst kopiëren, dan verdelen'
    elif s['kind'] == 'card':
        o['lines'] = ['Eerst kopiëren, dan verdelen.', 'Mitose: twee gelijke dochtercellen, 2n = 46.', 'Meiose: geslachtscellen, n = 23, steeds een andere combinatie.']
    out.append(o)
json.dump({'segments': out, 'chapters': chapters}, open('filmdata.json','w',encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur',0) for o in out); bas = sum(o.get('dur',0) for o in out if o['level']=='basis'); ext = sum(o.get('dur',0) for o in out if o['level']=='extra'); print('extra %.0f s' % ext)
print('narration total %.0f s, basis %.0f s' % (tot,bas)); print(chapters)

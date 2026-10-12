import json, re
segs = json.load(open('segments.json'))
answers = {  # question id -> (correct index, explanation shown after reveal)
 'q02': (2, 'Een route van aparte onderdelen, elk met een eigen taak. Die route volgen we in deze film.'),
 'q06': (1, 'Zonder bouwtekening geen eiwit. De kern komt eerst.'),
 'q08': (0, 'Zonder kern geen nieuwe werkkopieën, dus geen nieuwe eiwitten om versleten eiwitten te vervangen.'),
 'q10': (1, 'Verteringsenzymen zijn eiwitten voor buiten de cel; die worden op het ruw ER gemaakt.'),
 'q12': (1, 'Het adreslabel uit het golgisysteem bepaalt de bestemming: celmembraan of lysosoom.'),
 'q15': (1, 'Minder membraanoppervlak betekent minder ATP-makende eiwitten, dus minder ATP.'),
 'q19': (1, 'Buiten het zure lysosoom werken deze enzymen nauwelijks. Daarom lekt een enkel enzym de cel niet kapot.'),
 'q24': (1, 'Elke plantencel verbrandt glucose in mitochondriën, dag en nacht. Chloroplasten maken de glucose.'),
}
questions_text = {
 'q02': 'Hoe krijgt één cel dat voor elkaar?',
 'q06': 'Deze cel maakt heel veel eiwitten. Waar begint het maken van elk eiwit?',
 'q08': 'Een rode bloedcel heeft geen kern. Na vier maanden is hij versleten. Waarom?',
 'q10': 'Een alvleeskliercel heeft veel meer ruw ER dan een huidcel. Hoe komt dat?',
 'q12': 'Twee eiwitten verlaten het golgisysteem: één voor buiten de cel, één voor de opruimdienst. Wat bepaalt waar elk heen gaat?',
 'q15': 'Wat gebeurt er als de cristae er niet waren?',
 'q19': 'Wat gebeurt er als er een enzym uit een lysosoom lekt?',
 'q24': 'Heeft een plantencel ook mitochondriën?',
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
        o['words'] = [{'t': d, 's': round(x['start'],3), 'e': round(x['end'],3)} for d,x in zip(disp,w)]
        o['audio'] = f"audio/{s['id']}.mp3"
        o['dur'] = round(w[-1]['end'] + 0.35, 2)
    elif s['kind'] == 'question':
        o['q'] = questions_text[s['id']]
        o['options'] = [re.sub(r'^\(?[a-d]\)\s*','',x) for x in s['options']]
        o['correct'], o['explain'] = answers[s['id']]
    elif s['kind'] == 'title':
        o['text'] = 'Celorganellen'; o['sub'] = 'Een fabriek die leeft'
    elif s['kind'] == 'card':
        o['lines'] = ['Elk organel heeft een bouw die past bij zijn taak.', 'Uit de organellen van een cel lees je af wat de cel doet.', 'Alle zes levenskenmerken zitten al in één cel.']
    out.append(o)
json.dump({'segments': out, 'chapters': chapters}, open('filmdata.json','w',encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur',0) for o in out); bas = sum(o.get('dur',0) for o in out if o['level']=='basis')
print('narration total %.0f s, basis %.0f s' % (tot,bas)); print(chapters)

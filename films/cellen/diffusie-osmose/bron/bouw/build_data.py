import json, re
segs = json.load(open('segments.json'))
answers = {  # question id -> (correct index, explanation shown after reveal)
 'q02': (2, 'Niemand duwt. Alle deeltjes bewegen kriskras door elkaar, en daardoor raakt de kleurstof vanzelf verspreid.'),
 'q07': (1, 'Ze bewegen gewoon door. Er gaan evenveel heen als terug: netto nul. Dat is evenwicht.'),
 'q10': (1, 'Dubbele afstand kost bij diffusie ongeveer vier keer zoveel tijd. Daarom zijn cellen klein.'),
 'q13': (0, 'Zuurstof is klein en lost goed op in vet. Een ion heeft een lading, glucose lost slecht op in vet.'),
 'q16': (1, 'Nee. Het eiwit is alleen een doorgang; de beweging gaat vanzelf van hoog naar laag.'),
 'q19': (1, 'Het water gaat naar rechts, naar de kant met de meeste opgeloste deeltjes die er niet door kunnen.'),
 'q24': (0, 'Uit de cellen: buiten is de osmotische waarde hoger dan in het celvocht, dus water gaat de cellen uit.'),
 'q26': (1, 'Hij zwelt en barst (hemolyse). Een rode bloedcel heeft geen celwand die terugduwt.'),
 'q30': (2, 'Een eiwit pompt de mineralen naar binnen, tegen het concentratieverschil in. Dat kost ATP.'),
 'q34': (0, 'Je cellen verliezen water. Je nieren kunnen zo veel zout alleen kwijt met extra water.'),
}
questions_text = {
 'q02': 'Niemand heeft geroerd. Hoe komt de kleurstof dan overal?',
 'q07': 'Links en rechts hebben evenveel kleurstof. Wat doen de deeltjes dan?',
 'q10': 'Een cel wordt twee keer zo dik. Hoe lang duurt het dan voor zuurstof het midden bereikt?',
 'q13': 'Welke stof komt het makkelijkst door het celmembraan?',
 'q16': 'Kost gefaciliteerde diffusie ATP?',
 'q19': 'Links zuiver water, rechts zout water. Het zout kan niet door het membraan. Wat gebeurt er met het water?',
 'q24': 'Zout op plakjes komkommer: na tien minuten liggen ze in een plasje. Waar komt dat water vandaan?',
 'q26': 'Een rode bloedcel heeft geen celwand. Wat gebeurt er in zuiver water?',
 'q30': 'Een wortelhaarcel neemt mineralen op, terwijl er in de cel al meer zit dan erbuiten. Hoe kan dat?',
 'q34': 'Je zit in een bootje op zee en je hebt dorst. Waarom mag je geen zeewater drinken?',
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
        o['text'] = 'Diffusie en osmose'; o['sub'] = 'Alles beweegt'
    elif s['kind'] == 'card':
        o['lines'] = ['Deeltjes bewegen willekeurig; netto gaan ze van veel naar weinig.', 'Osmose: water gaat naar de hoogste osmotische waarde.', 'Bergop kost energie: actief transport.']
    out.append(o)
json.dump({'segments': out, 'chapters': chapters}, open('filmdata.json','w',encoding='utf-8'), ensure_ascii=False)
tot = sum(o.get('dur',0) for o in out); bas = sum(o.get('dur',0) for o in out if o['level']=='basis')
print('narration total %.0f s, basis %.0f s' % (tot,bas)); print(chapters)

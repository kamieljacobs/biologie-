import json
D = json.load(open('../disp_oud.json'))
A4 = open('../a4_voice.txt').read().replace('reseptor', 'receptor')
H = ['Hoofdstuk 1 — Vier plekken', 'Hoofdstuk 2 — Koffie', 'Hoofdstuk 3 — Wijn', 'Hoofdstuk 4 — Medicijnen', 'Hoofdstuk 5 — Gewenning en verslaving', 'Samenvatting']
def sp(i, ch, txt, voice=None): return {'id': i, 'kind': 'speech', 'chapter': ch, 'level': 'basis', 'display': txt, 'voice': voice or txt}
def q(i, ch, opts): return {'id': i, 'kind': 'question', 'chapter': ch, 'level': 'basis', 'options': opts}
S = [sp('s01', 'Cold open', D['s01']), {'id': 's02', 'kind': 'title', 'chapter': 'Titel', 'level': 'basis', 'text': 'Knoeien met de synaps.'},
  sp('s03', H[0], D['s03']), q('q04', H[0], ['op één plek: de receptor', 'op twee plekken: afgifte en receptor', 'op meer dan twee plekken']), sp('s05', H[0], D['s05']),
  sp('s06', H[1], D['s06']), q('q07', H[1], ['cafeïne geeft je cellen energie', 'cafeïne blokkeert een stof die je slaperig maakt', 'cafeïne laat je hart direct sneller kloppen']), sp('s08', H[1], D['s08']),
  sp('s09', H[2], D['s09']), sp('s10', H[2], D['s10']), q('q11', H[2], ['een beetje alcohol werkt opwekkend', 'eerst worden de cellen geremd die jou afremmen', 'omdat je het verwacht']), sp('s12', H[2], D['s12']),
  sp('s13', H[3], D['s13']), q('q14', H[3], ['er komt meer serotonine bij', 'de serotonine blijft langer in de spleet hangen', 'de receptoren worden gevoeliger']), sp('s15', H[3], A4, open('../a4_voice.txt').read()),
  sp('s16', H[4], D['s16']), q('q17', H[4], ['niets, hij vuurt gewoon vaker', 'hij maakt minder receptoren, zodat het signaal weer normaal wordt', 'hij raakt beschadigd']), sp('s18', H[4], D['s18']),
  sp('s19', H[5], D['s19']),
  {'id': 's20', 'kind': 'card', 'chapter': 'Eindkaart', 'level': 'basis', 'lines': ['Een stof grijpt in op één van vier plekken: afgifte, receptor, opruimen, aanmaak.', 'Agonist zet een receptor aan, antagonist blokkeert hem.', 'Een cel past zich aan: gewenning, ontwenning, verlangen.', 'Volgende film: Het hoofdkantoor.']}]
json.dump(S, open('segments.json', 'w'), ensure_ascii=False, indent=1)
print(len(S))

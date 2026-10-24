# zones in plaat-px (vlakke rij). K = px per cm, ox = x van het anker (midden onder het dier), grond = y van de grondlijn
NANDOE_PAL = {'d': ['#554D48','#625A54'], 'm': ['#837973'], 'l': ['#9D928B','#B1A79F'], 'w': ['#C2BAB4']}
GORD_PAL = {'d': ['#61534A','#76665C'], 'm': ['#8E7D71','#9F8C80'], 'l': ['#B4A092'], 'w': ['#CAB4A6']}
SCH_PAL = {'sd': ['#56514E','#655E58'], 'sz': ['#413C38'], 'naad': ['#76706A'], 'sk': ['#867F7B'], 'skl': ['#B5ABA1']}
SCHILDK = ['sd','sz','naad']
CFG = [
 # nandoe: K uit hoogte 150 cm (kruin) = 322 px; anker = x van de poten in staan (133)
 {'naam': 'nandoe', 'plaat': 'nandoe.png', 'box': (22,360,222,322), 'grond': 683, 'K': 322/150, 'ox': 133, 'grondlijn': True, 'pal': NANDOE_PAL,
  'delen': {
   'romp': {'p': [(18,420),(172,420),(172,458),(232,492),(252,492),(252,545),(172,540),(140,546),(100,551),(100,690),(18,690)], 'basis': 'm', 'orde': ['l','w','d'], 'grootAlle': 2},
   'nek': {'p': [(160,352),(256,352),(256,520),(232,492),(172,458),(160,452)], 'basis': 'l', 'orde': ['m','w','d'], 'grootAlle': 2, 'minA': {'d': 6}},
  }},
 # gordeldier: K uit kop-romp 43 cm (snuit 305 - stuit 103 = 202 px); anker = midden van het schild (180); staart procedureel (plaat te kort)
 {'naam': 'gordeldier', 'plaat': 'gordeldier.png', 'box': (100,418,207,108), 'grond': 527, 'K': 202/43, 'ox': 180, 'grondlijn': True, 'pal': GORD_PAL,
  'delen': {
   'romp': {'p': [(104,410),(262,410),(262,495),(104,495)], 'basis': 'm', 'orde': ['l','w','d'], 'groot': {'l': 3, 'w': 3}, 'minA': {'l': 30, 'w': 30, 'd': 10}, 'eps': 0.7},
   'kop': {'p': [(262,410),(312,410),(312,499),(262,499)], 'basis': 'm', 'orde': ['l','w','d'], 'minA': {'l': 8, 'd': 6}, 'eps': 0.6},
  }},
 # zadelschildpad (fig. 3, nek half): K uit schildlengte 80 cm (Española max ±75 cm, Pinta iets groter) = 201 px; anker = midden van de hele figuur (799)
 {'naam': 'zadel', 'plaat': 'schildpad.png', 'box': (641,476,316,166), 'grond': 643, 'K': 201/80, 'ox': 799, 'grondlijn': True, 'pal': SCH_PAL,
  'delen': {
   'schild': {'p': [(636,470),(846,470),(846,600),(636,600),(636,470)], 'basis': 'sd', 'basisKlassen': SCHILDK, 'orde': ['sz','naad'], 'minA': {'naad': 4}, 'eps': 0.6, 'open': 0, 'zonder': ['sk','skl']},
   'kop': {'p': [(910,490),(968,490),(968,548),(910,548)], 'basis': 'sk', 'orde': ['skl','sz','sd'], 'minA': {'sz': 2, 'skl': 6}, 'eps': 0.5, 'open': 0},
   'achter': {'p': [(636,560),(772,560),(772,646),(636,646)], 'basis': 'sk', 'basisKlassen': ['sk','skl','sz','sd'], 'orde': ['skl','sd','sz'], 'minA': {'naad': 6}, 'zonder': ['naad']},
   'voor': {'p': [(772,545),(828,545),(845,580),(890,570),(890,646),(772,646)], 'basis': 'sk', 'basisKlassen': ['sk','skl','sz','sd'], 'orde': ['skl','sd','sz'], 'minA': {'naad': 6}, 'zonder': ['naad']},
  }},
 # koepelschildpad (fig. 1): K uit schildlengte 110 cm (figuur ±1,46 m incl. kop) = 228 px; anker = midden van de figuur (186)
 {'naam': 'koepel', 'plaat': 'schildpad.png', 'box': (35,457,302,185), 'grond': 643, 'K': 228/110, 'ox': 186, 'grondlijn': True, 'pal': SCH_PAL,
  'delen': {
   'schild': {'p': [(28,450),(266,450),(266,610),(28,610)], 'basis': 'sd', 'basisKlassen': SCHILDK, 'orde': ['sz','naad'], 'minA': {'naad': 4}, 'eps': 0.6, 'open': 0, 'zonder': ['sk','skl']},
   'kop': {'p': [(292,478),(342,478),(342,522),(292,522)], 'basis': 'sk', 'orde': ['skl','sz','sd'], 'minA': {'sz': 2, 'skl': 6}, 'eps': 0.5, 'open': 0},
   'achter': {'p': [(28,560),(150,560),(150,646),(28,646)], 'basis': 'sk', 'basisKlassen': ['sk','skl','sz','sd'], 'orde': ['skl','sd','sz'], 'zonder': ['naad']},
   'voor': {'p': [(150,560),(255,560),(262,575),(285,575),(285,646),(150,646)], 'basis': 'sk', 'basisKlassen': ['sk','skl','sz','sd'], 'orde': ['skl','sd','sz'], 'zonder': ['naad']},
  }},
]

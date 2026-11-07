import random,sys,json,os
o=sys.argv[1]; opts=['oud','A']+(['B'] if len(sys.argv)>2 else [])
random.shuffle(opts); os.makedirs(o,exist_ok=True)
json.dump(dict(zip('XYZ',opts)),open(f'{o}/sleutel.json','w')); print(o,dict(zip('XYZ',opts)))

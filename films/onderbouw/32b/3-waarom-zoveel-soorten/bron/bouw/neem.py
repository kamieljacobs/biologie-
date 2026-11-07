# neem.py <filmmap> <statusbestand> <tts|scribe>: ontdubbelt een (te groot) statusbestand en zet het als stem/tts_status.json of stem/scribe_status.json
import json,sys
D,F,k=sys.argv[1:4]; d=json.load(open(F)); key='generations' if k=='tts' else 'transcripts'; idk='id' if k=='tts' else 'generation_id'
seen=set(); d[key]=[x for x in d.get(key,[]) if not (x[idk] in seen or seen.add(x[idk]))]
print('alles klaar',d['all_completed'],'fouten',d['has_failures'],len(d[key]))
json.dump(d,open(f'{D}/stem/{"tts" if k=="tts" else "scribe"}_status.json','w'))

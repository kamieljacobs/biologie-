#!/usr/bin/env python3
"""Haal de mp3's uit een gepubliceerde DNA-film (FILMDATA) naar data/afl<n>_audio/<id>.mp3, zodat build.py opnieuw kan bouwen.
   python3 haal_audio.py 2 ../2-dna-kopieren.html"""
import sys,re,json,base64,os
n,html=sys.argv[1],open(sys.argv[2],encoding='utf-8').read()
d=json.loads(re.search(r'window\.FILMDATA=(\{.*?\});</script>',html,re.S).group(1))
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),'data',f'afl{n}_audio'); os.makedirs(out,exist_ok=True)
for s in d['segments']:
    if s.get('audio','').startswith('data:'): open(f"{out}/{s['id']}.mp3",'wb').write(base64.b64decode(s['audio'].split(',',1)[1])); print(s['id'])

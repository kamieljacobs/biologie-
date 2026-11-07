# python3 patch.py obj 'funcs' < pairs.json  ; pairs: [[old,new],...], header (optional) as first item {"kop": "..."}
import sys,json,subprocess
obj=sys.argv[1]; fs=sys.argv[2].split()
s=subprocess.run(['python3','ex.py']+fs,capture_output=True,text=True).stdout
P=json.load(sys.stdin)
for a,b in P['rep']:
    assert a in s, (obj,a[:80]); s=s.replace(a,b)
open(f'{obj}/A.js','w').write(P.get('kop','')+s)

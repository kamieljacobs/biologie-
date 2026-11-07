#!/bin/bash
# ./final.sh obj  -> sleutel (oud + A [+ B]) willekeurig, rendert X/Y/Z
cd "$(dirname "$0")"; O=$1
python3 -c "
import random,json,os
v=['oud','A']+(['B'] if os.path.exists('$O/B.js') else [])
random.shuffle(v); L=['X','Y','Z'][:len(v)]
json.dump(dict(zip(L,v)),open('$O/sleutel.json','w'))"
rm -f $O/X.png $O/Y.png $O/Z.png; ./run.sh $O; cat $O/sleutel.json; echo

#!/bin/bash
# fetch, rebase (index.html-conflicten: beide kanten houden), push; herhaal tot 4x
cd /home/claude/wt-32c
for i in 1 2 3 4; do
  git fetch -q origin main
  if ! git rebase origin/main >/dev/null 2>&1; then
    for f in $(git diff --name-only --diff-filter=U); do
      python3 - "$f" <<'PY'
import re,sys
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
s=re.sub(r'<<<<<<< [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n',lambda m:m.group(1)+m.group(2),s,flags=re.S)
open(p,'w',encoding='utf-8').write(s)
PY
      git add "$f"
    done
    GIT_EDITOR=true git rebase --continue >/dev/null 2>&1 || { echo "rebase faalt"; git status --short | head; exit 1; }
  fi
  python3 -c "
import json;s=open('index.html',encoding='utf-8').read();a=s.index('const HOOFDSTUKKEN');json.JSONDecoder().raw_decode(s[s.index('{',a):]);print('index JSON ok')" || exit 1
  if git push origin HEAD:main 2>&1 | grep -q -E "rejected|error"; then echo "push geweigerd, opnieuw"; sleep 10; else echo "gepusht"; git log --oneline -1; exit 0; fi
done

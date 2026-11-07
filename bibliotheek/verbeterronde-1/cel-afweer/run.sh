#!/bin/bash
W=$(dirname $(readlink -f $0)); P=8931
curl -s -o /dev/null localhost:$P/ || { cd /home/claude/biologie- && (python3 -m http.server $P >/dev/null 2>&1 &); sleep 1; }
python3 $W/render.py $P "$@"

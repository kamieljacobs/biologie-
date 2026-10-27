#!/bin/bash
# run.sh <obj>  (scene in _werk/scene_<obj>.js)
B=/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/dieren-b
PORT=$((8900 + RANDOM % 900))
cd / && python3 -m http.server $PORT >/dev/null 2>&1 & SP=$!
sleep 0.8
for o in "$@"; do python3 $B/_werk/render.py $B/$o $B/_werk/scene_$o.js $PORT; done
kill $SP

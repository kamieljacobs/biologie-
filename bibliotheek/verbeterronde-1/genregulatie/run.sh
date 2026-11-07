#!/bin/bash
# run.sh obj opts
G=/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/genregulatie
PORT=$((8000 + RANDOM % 900))
cd / && python3 -m http.server $PORT >/dev/null 2>&1 & SP=$!
sleep 0.8; cd /tmp && node $G/shoot.js $1 $2 $PORT; kill $SP 2>/dev/null; true

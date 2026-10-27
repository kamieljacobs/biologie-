#!/bin/bash
# gebruik: run.sh obj [obj...]
P=$((8800 + RANDOM % 900)); cd /; python3 -m http.server $P >/dev/null 2>&1 & S=$!; sleep 1
python3 /tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/weefsel-organen/render.py $P "$@"; kill $S

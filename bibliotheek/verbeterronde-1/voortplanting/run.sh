#!/bin/bash
# start server op / en render
cd /; PORT=${PORT:-8811}; python3 -m http.server $PORT >/dev/null 2>&1 & S=$!; sleep 0.8
python3 /tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/voortplanting/render.py "$@"; kill $S

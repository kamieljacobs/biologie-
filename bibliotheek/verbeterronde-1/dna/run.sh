#!/bin/bash
cd /tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/dna
PORT=$(python3 -c "import socket;s=socket.socket();s.bind(('',0));print(s.getsockname()[1])"); export PORT
python3 -m http.server $PORT >/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/srv.log 2>&1 & SP=$!; sleep 1
python3 render.py "$@"; kill $SP 2>/dev/null

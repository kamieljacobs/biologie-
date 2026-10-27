#!/bin/bash
cd /tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/lab
python3 -m http.server 8797 --directory / >/dev/null 2>&1 & S=$!
sleep 1; python3 render.py "$@"; kill $S

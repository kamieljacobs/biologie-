#!/bin/bash
cd /; python3 -m http.server 8817 >/dev/null 2>&1 & SP=$!; sleep 0.8
python3 /tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/cel-nieuw/render.py "$1" | grep -v 'File not found' ; kill $SP

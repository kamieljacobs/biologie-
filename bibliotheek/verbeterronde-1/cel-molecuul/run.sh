#!/bin/bash
cd "$(dirname "$0")"; P=$((8900 + RANDOM % 900)); python3 -m http.server $P >/dev/null 2>&1 & S=$!
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:$P/harness.html && break; sleep 0.3; done
POORT=$P node render.js "$@"; kill $S 2>/dev/null

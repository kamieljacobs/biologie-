#!/bin/bash
# gebruik: bash run.sh <obj> <versies…>   (serveert de repo-root)
cd /root/biologie-
PORT=$(python3 -c "import socket;s=socket.socket();s.bind(('',0));print(s.getsockname()[1])"); export PORT
python3 -m http.server $PORT >/dev/null 2>&1 & SP=$!; sleep 1
cd bibliotheek/verbeterronde-2/dna && python3 render.py "$@"; kill $SP 2>/dev/null

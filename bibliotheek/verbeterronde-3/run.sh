#!/bin/bash
# gebruik: bash run.sh jobs.json
cd /root/biologie-
PORT=$(python3 -c "import socket;s=socket.socket();s.bind(('',0));print(s.getsockname()[1])"); export PORT
python3 -m http.server $PORT >/dev/null 2>&1 & SP=$!; sleep 1
python3 bibliotheek/verbeterronde-3/render.py "$1"; kill $SP 2>/dev/null

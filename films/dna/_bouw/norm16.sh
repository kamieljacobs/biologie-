#!/bin/bash
# normaliseer: norm16.sh in.mp3 out.mp3  (−16 LUFS, −1 dBTP, mono 44,1 kHz 96 kb/s; twee passes)
in=$1; out=$2
J=$(ffmpeg -hide_banner -i "$in" -af loudnorm=I=-16:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -hide_banner -loglevel error -i "$in" -af loudnorm=I=-16:TP=-1:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=44100 -ac 1 -b:a 96k "$out"

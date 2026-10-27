#!/bin/bash
# ./runC.sh obj  -> rendert C met sceneC.js als die bestaat, anders scene.js, naar obj/C.png
cd "$(dirname "$0")"; O=$1; SC=scene.js; [ -f $O/sceneC.js ] && SC=sceneC.js
SCENE=$SC ./run.sh $O C && mv $O/_C.png $O/C.png

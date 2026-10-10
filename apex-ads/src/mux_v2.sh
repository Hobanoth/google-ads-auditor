#!/bin/bash
# Une video + audio de la versión 2 (gancho largo) para los 12 copys → out/v2/
set -e
cd "$(dirname "$0")/.."
mkdir -p out/v2
i=0
for id in $(node -e "require('./src/copies.js').forEach(c=>console.log(c.id))"); do
  n=$(printf %02d $i)
  for fmt in reel square; do
    label=$([ $fmt = reel ] && echo "REEL_1080x1920" || echo "CUADRADO_1080x1080")
    ffmpeg -loglevel error -y -i work/vid/${id}_${fmt}_v2.mp4 -i work/aud/a${n}_v2.wav -map 0:v -map 1:a \
      -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "out/v2/APEX_${id}_V2-GANCHO-LARGO_${label}.mp4"
  done
  i=$((i+1))
done
ls out/v2 | wc -l

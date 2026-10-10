#!/bin/bash
# Une video + audio de cada anuncio y lo deja listo para Meta (H.264 High, yuv420p, 30 fps, AAC 48 kHz, faststart)
set -e
cd "$(dirname "$0")/.."
mkdir -p out
i=0
for id in $(node -e "require('./src/copies.js').forEach(c=>console.log(c.id))"); do
  n=$(printf %02d $i)
  for fmt in reel square; do
    label=$([ $fmt = reel ] && echo "REEL_1080x1920" || echo "CUADRADO_1080x1080")
    ffmpeg -loglevel error -y -i work/vid/${id}_${fmt}.mp4 -i work/aud/a${n}.wav -map 0:v -map 1:a \
      -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "out/APEX_${id}_${label}.mp4"
  done
  i=$((i+1))
done
ls -la out

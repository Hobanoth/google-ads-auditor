# Hoja de vista previa de la v2 (gancho a 3.9 s + respuesta a 10.2 s + cierre a 14.8 s) → out/VISTA_PREVIA_v2.png
# FFMPEG=ruta si ffmpeg no está en PATH
import subprocess, glob, os
from PIL import Image, ImageDraw, ImageFont
os.makedirs('work/prev', exist_ok=True)
FF = os.environ.get('FFMPEG', 'ffmpeg')
files = sorted(glob.glob('out/v2/*REEL*.mp4'))
f_b = next((ImageFont.truetype(f, 22) for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 'C:/Windows/Fonts/arialbd.ttf'] if os.path.exists(f)), ImageFont.load_default())
tw, th = 216, 384
cols = 3
rows_per = 3
times = ['3.9', '10.2', '14.8']
W = cols * (tw * 3 + 24) + 20
nrow = (len(files) + cols - 1) // cols
H = nrow * (th + 50) + 20
sheet = Image.new('RGB', (W, H), (251, 247, 241))
d = ImageDraw.Draw(sheet)
for k, f in enumerate(files):
    name = os.path.basename(f).split('_', 1)[1].replace('_V2-GANCHO-LARGO_REEL_1080x1920.mp4', '')
    cx, cy = 20 + (k % cols) * (tw * 3 + 24), 20 + (k // cols) * (th + 50)
    d.text((cx, cy), name.replace('_', ' '), fill=(34, 25, 46), font=f_b)
    for j, t in enumerate(times):
        png = f'work/prev/{name}_{t}.png'
        subprocess.run([FF, '-loglevel', 'error', '-y', '-ss', t, '-i', f, '-frames:v', '1', png], check=True)
        sheet.paste(Image.open(png).resize((tw, th)), (cx + j * (tw + 2), cy + 34))
sheet.save('out/VISTA_PREVIA_v2.png', optimize=True)
print(sheet.size)

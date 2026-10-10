# Hoja de vista previa: los 12 anuncios (momento clave del gancho + respuesta + cierre)
import subprocess, glob, os
from PIL import Image, ImageDraw, ImageFont
os.makedirs('work/prev', exist_ok=True)
files = sorted(glob.glob('out/*REEL*.mp4'))
f_b = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
tw, th = 216, 384
cols = 6
rows_per = 3
times = ['3.9', '8.4', '13.6']
W = cols * (tw * 3 + 24) + 20
nrow = (len(files) + cols - 1) // cols
H = nrow * (th + 50) + 20
sheet = Image.new('RGB', (W, H), (251, 247, 241))
d = ImageDraw.Draw(sheet)
for k, f in enumerate(files):
    name = os.path.basename(f).replace('APEX_', '').replace('_REEL_1080x1920.mp4', '')
    cx, cy = 20 + (k % cols) * (tw * 3 + 24), 20 + (k // cols) * (th + 50)
    d.text((cx, cy), name.replace('_', ' '), fill=(34, 25, 46), font=f_b)
    for j, t in enumerate(times):
        png = f'work/prev/{name}_{t}.png'
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', t, '-i', f, '-frames:v', '1', png], check=True)
        sheet.paste(Image.open(png).resize((tw, th)), (cx + j * (tw + 2), cy + 34))
sheet.save('out/VISTA_PREVIA_12_anuncios.png', optimize=True)
print(sheet.size)

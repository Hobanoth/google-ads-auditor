# Separa el wordmark de Colegio Estefanía (claro sobre azul) en capas alfa para animarlo por partes.
# Fuente: assets/logo_src.jpg (foto de perfil de su página, 2048x2048; no se versiona).
# Capas: "COLEGIO", la línea, las 9 letras de "ESTEFANIA" y el acento de la Í.
import numpy as np, json
from PIL import Image
P = np.array(Image.open('assets/logo_src.jpg').convert('RGB')).astype(float)
BG_R, FG_R = 1., 200.                      # canal rojo: fondo azul (1,48,138) vs. letras (199,211,234)
a = np.clip((P[..., 0] - BG_R) / (FG_R - BG_R), 0, 1); a[a < 0.08] = 0
ys, xs = np.nonzero(a > 0.3)
M = 24                                     # margen alrededor del wordmark
x0, y0, x1, y1 = xs.min() - M, ys.min() - M, xs.max() + M, ys.max() + M
a = a[y0:y1 + 1, x0:x1 + 1]; H, W = a.shape
yy, xx = np.mgrid[0:H, 0:W]
def runs(v):
    out, s = [], None
    for i, k in enumerate(list(v) + [0]):
        if k and s is None: s = i
        if not k and s is not None: out.append((s, i - 1)); s = None
    return out
rows = runs((a > 0.3).sum(1) > 0)          # [COLEGIO + línea] · acento · ESTEFANIA
assert len(rows) == 3, rows
top, acc, bot = rows
top_cols = runs((a[top[0]:top[1] + 1] > 0.3).sum(0) > 0)
line_c = max(top_cols, key=lambda c: c[1] - c[0])
band = lambda r: (yy >= r[0] - 6) & (yy <= r[1] + 6)
layers = {}
layers['colegio'] = np.where(band(top) & (xx < line_c[0] - 4), a, 0)
layers['line'] = np.where(band(top) & (xx >= line_c[0] - 4), a, 0)
layers['accent'] = np.where(band(acc), a, 0)
letters = runs((a[bot[0]:bot[1] + 1] > 0.3).sum(0) > 0)
assert len(letters) == 9, letters
for i, (c0, c1) in enumerate(letters):
    lo = (letters[i - 1][1] + c0) // 2 if i else 0
    hi = (c1 + letters[i + 1][0]) // 2 if i < 8 else W
    layers[f'l{i}'] = np.where(band(bot) & (xx >= lo) & (xx < hi), a, 0)
def box(m):
    ys, xs = np.nonzero(m > 0.3); return [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
meta = {'size': [W, H], 'order': list(layers.keys())}
for k, m in layers.items():
    rgba = np.zeros((H, W, 4), np.uint8); rgba[..., :3] = 255; rgba[..., 3] = (m * 255).round().astype(np.uint8)
    Image.fromarray(rgba).save(f'assets/logo_{k}.png'); meta[k] = box(m)
full = np.zeros((H, W, 4), np.uint8); full[..., :3] = 255; full[..., 3] = (a * 255).round().astype(np.uint8)
Image.fromarray(full).save('assets/logo_full.png')
json.dump(meta, open('assets/logo_meta.json', 'w'), indent=1)
# vista de control: cada capa en un color distinto
import colorsys, os
os.makedirs('work', exist_ok=True)
out = np.full((H, W, 3), 255.)
for i, (k, m) in enumerate(layers.items()):
    c = np.array(colorsys.hsv_to_rgb(i / len(layers), 0.8, 0.8)) * 255; out = out * (1 - m[..., None]) + c * m[..., None]
Image.fromarray(out.astype(np.uint8)).save('work/logo_check.png')
print(json.dumps(meta))

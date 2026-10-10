# Separa el logo (JPG sobre blanco) en capas alfa para animarlo por partes.
import numpy as np, json
from PIL import Image
P = np.array(Image.open('assets/logo_src.jpg').convert('RGB')).astype(float)
H, W, _ = P.shape
NAVY = np.array([33, 24, 43.]); ORANGE = np.array([223, 100, 65.]); RED = np.array([226, 62, 33.])
r, g, b = P[..., 0], P[..., 1], P[..., 2]
nonwhite = (255 - b) > 6
ratio = (r - b) / np.maximum(1, 255 - b)
warm = nonwhite & (ratio > 0.4)
navy_a = np.clip((255 - P.mean(2)) / (255 - NAVY.mean()), 0, 1)
yy, xx = np.mgrid[0:H, 0:W]
a_or = np.clip((255 - b) / (255 - ORANGE[2]), 0, 1)
a_red = np.clip((255 - b) / (255 - RED[2]), 0, 1)
globe = np.where(warm & (yy < 350), a_or, 0)
stars = np.where(warm & (yy >= 350), a_red, 0)
navy = np.where(~warm, navy_a, 0)
navy[navy < 0.04] = 0
def box(m):
    ys, xs = np.nonzero(m > 0.3); return [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
# texto EST. / 2020
est_m = np.zeros_like(navy); y0020 = np.zeros_like(navy)
reg_est = (xx >= 205) & (xx <= 305) & (yy >= 500) & (yy <= 555)
reg_20 = (xx >= 495) & (xx <= 605) & (yy >= 500) & (yy <= 555)
est = np.where(reg_est, navy, 0); n2020 = np.where(reg_20, navy, 0)
rest = np.where(reg_est | reg_20, 0, navy)
icon_reg = (xx >= 250) & (xx <= 548) & (yy >= 240) & (yy <= 540)
icon = np.where(icon_reg, rest, 0)
laurel = np.where(icon_reg, 0, rest)
lau_l = np.where(xx < 400, laurel, 0); lau_r = np.where(xx >= 400, laurel, 0)
st = [np.where((xx < 360), stars, 0), np.where((xx >= 360) & (xx < 440), stars, 0), np.where(xx >= 440, stars, 0)]
layers = {'laurel_l': lau_l, 'laurel_r': lau_r, 'icon': icon, 'globe': globe, 'est': est, 'y2020': n2020, 'star0': st[0], 'star1': st[1], 'star2': st[2]}
meta = {'size': [W, H]}
for k, m in layers.items():
    rgba = np.zeros((H, W, 4), np.uint8); rgba[..., :3] = 255; rgba[..., 3] = (m * 255).round().astype(np.uint8)
    Image.fromarray(rgba).save(f'assets/logo_{k}.png'); meta[k] = box(m)
# centros útiles
gy, gx = np.nonzero(globe > 0.3); meta['globe_c'] = [float(gx.mean()), float(gy.mean()), float((gx.max() - gx.min()) / 2)]
for i in range(3):
    sy, sx = np.nonzero(st[i] > 0.3); meta[f'star{i}_c'] = [float(sx.mean()), float(sy.mean())]
json.dump(meta, open('assets/logo_meta.json', 'w'), indent=1)
# vista de control: cada capa en un color distinto
cols = {'laurel_l': (40, 40, 160), 'laurel_r': (40, 120, 200), 'icon': (20, 150, 60), 'globe': (230, 120, 0), 'est': (200, 0, 200), 'y2020': (150, 0, 150), 'star0': (220, 0, 0), 'star1': (255, 80, 80), 'star2': (160, 0, 0)}
out = np.full((H, W, 3), 255.)
for k, m in layers.items():
    c = np.array(cols[k], float); out = out * (1 - m[..., None]) + c * m[..., None]
Image.fromarray(out.astype(np.uint8)).save('work/logo_check.png')
print(json.dumps(meta))

# Prompt para hacer estos videos para otros colegios

**Qué necesita tu Claude para que funcione:**
- Acceso de lectura a la cuenta publicitaria de Meta del colegio.
- Acceso al repo de GitHub `hobanoth/google-ads-auditor`, rama `apex-ads-videos`.
- Poder ejecutar código. Por ejemplo Claude Code, en la nube o local, con Node 22+, Playwright/Chromium, ffmpeg y Python 3 con Pillow y numpy.

Si tu Claude solo tiene el conector de Meta pero no puede ejecutar código, puede hacer los pasos 1–2 (sacar y ordenar los copys) y luego tú corres el render en una sesión de Claude Code.

Copia todo lo que está dentro del bloque y cambia lo que va entre [CORCHETES]:

```
Eres motion designer y media buyer. Vas a producir anuncios en video animado, hechos 100% con código, para [NOMBRE DEL COLEGIO] a partir de sus anuncios activos en Meta. Usa la plantilla que ya existe en el repo hobanoth/google-ads-auditor, rama apex-ads-videos, carpeta apex-ads/. Antes de empezar lee completos apex-ads/README.md y este prompt. La plantilla se hizo para Apex Blended School: tu trabajo es adaptarla a la nueva marca sin bajar la calidad. Trabaja en una rama nueva (ads-[colegio]), nunca en master.

REGLAS
- En Meta solo lees. No crees, edites, pauses ni publiques anuncios, campañas o presupuestos.
- No uses modelos de generación de imagen, video ni audio. Todo sale del código, incluida la música (src/synth_ads.js).
- Usa el copy literal de los anuncios. No inventes datos, cifras, becas, RVOE, testimonios ni promesas. Si algo es muy largo, divídelo en tarjetas sin cambiar el sentido y anota el cambio.
- No crees personas falsas que hablen por el colegio.
- No subas al repo el logo ni material del cliente; ponlo en assets/, que está en .gitignore.

1) INSUMOS (cuenta publicitaria [ID O NOMBRE DE LA CUENTA])
- Lista los anuncios ACTIVOS. De cada uno saca el texto principal, el título, el botón CTA, la URL y el texto que aparece dentro del creativo.
- Marca: pide el logo (PNG o SVG con fondo transparente o blanco) si no lo tienes. Toma los colores hex de sus creativos. Elige tipografías parecidas de Google Fonts: una sans y una script para la pestaña. Usa el lema oficial solo si existe.

2) COPYS AL FORMATO DE LA PLANTILLA (src/copies.js), una entrada por idea
- hook: una pregunta dirigida a los papás, de máximo unas 13 palabras. La frase clave va entre [corchetes].
- deco: 'marker', 'underline' o 'circle'. Usa 'circle' solo para 1 o 2 palabras.
- meta, la metáfora visual. Elige la que mejor ilustre la idea:
  - shapes {piece:'star'|'heart'} = la escuela se adapta al niño
  - spotlight {variant:'basic'|'crowd'|'glass'} = cada alumno importa, no ser uno más, conocerlo
  - lockstep {variant:'basic'|'flag'} = ritmo propio, no todos aprenden igual
  - growth = potencial
  - bookburst = aprender vuelve a ser emocionante
  - steps = confianza, acompañamiento por etapas
  - desks = algo distinto a la educación tradicional
- tab: "En [Nombre corto]", con coma al final si la frase siguiente continúa la oración.
- items, en este orden:
  - {st:'frase con [resaltado]'}
  - {card:'icono', text:'texto con *negritas*'}
  - {plus:true}
  - {icons:['a','b','c']}
  Íconos disponibles: user, duo, group, heart, shield, star, book, compass, sliders, steps, target.
- cta: texto corto del botón, sin punto final.

3) ADAPTAR LA MARCA (hoy esto es específico de Apex)
- src/ads.js, objeto C: cambia los colores conservando su función:
  - cream = fondo claro
  - navy = texto oscuro
  - coral = acento (pestaña, resaltados, botón)
  - deep/purple/purpleD = panel y círculos de los íconos
  - lav, orange, star = secundarios
- src/ads.js, funciones chip() y drawLockup(): ahí están escritos 'APEX', 'BLENDED SCHOOL' e 'INNOVATING TOWARDS A BIGGER FUTURE'. Cámbialos por el nombre y el lema del colegio.
- Logo: loadLogo() y drawLogoBuild() animan capas del logo de Apex (laureles, libro, globo y 3 estrellas). Las capas salen de src/logo_layers.py con coordenadas de ESE logo. Para el logo nuevo:
  a) Si tiene partes separables, adapta logo_layers.py con máscaras por color o región, y luego la animación por piezas.
  b) Si no, haz una animación genérica: el logo completo con máscara radial que se revela, un pop con overshoot y un destello.
  En los dos casos respeta los tiempos de la línea de tiempo (ctaT, globeT, starT) para que el logo sonoro siga cayendo en los beats.
- Tipografías: los @font-face de src/ads.html y los archivos en fonts/ (bájalos de fonts.gstatic.com).
- Los textos de los mux (APEX_...): cambia el prefijo por el nombre del colegio.

4) RENDER (versión 2 "gancho largo": la pregunta completa desde el frame 0, 7.5 s al frente y luego fija como encabezado)
- Primero haz stills para revisar:
  node src/render_ads.js stills <dir> <n> <reel|square> 0,2.5,4.6,6.9,7.4,10.2,14.8 2
- Audio: node src/synth_ads.js <n> work/aud/a<NN>_v2.wav 2
- Video, desde src/ (3 workers en una máquina de 4 núcleos; cada video tarda 1–1.5 min):
  node render_ads.js batch ../work/vid 3 "<n>:reel:2,<n>:square:2,..."
- Unir audio y video: src/mux_v2.sh

5) CONTROL DE CALIDAD (obligatorio, en los dos formatos, frames de 0 / 2.5 / 4.6 / 6.9 / 7.4 / 10.2 / 14.8 s)
- La pregunta completa y legible desde el frame 0.
- Nada encimado: encabezado contra mini-logo, ilustración contra pregunta, garabatos contra texto, descendentes contra marcador.
- Nada cortado por el borde ni por el panel. En Reel, el texto importante va entre y≈270 y y≈1250 (zona segura de Meta).
- El texto idéntico al copy, con acentos y ¿?.
- Sin líneas que terminen en "a", "de", "la", "una" o "tu", y sin palabras cortas solas en una línea.
- Tarjetas con padding parejo, espaciado uniforme e íconos del mismo peso.
- Cierre: logo completo, lema y botón con aire; la onda del toque no debe cruzar el texto.
- La metáfora con vida a los 6.9 s (no congelada).
- ffprobe: 1080x1920 y 1080x1080, 30 fps, 450 frames, 15.0 s, audio AAC (alrededor de -14 LUFS).
Si encuentras un defecto, corrígelo en el código (no a mano en un video) y vuelve a renderizar.

6) ENTREGA
- Nombres de archivo: <COLEGIO>_<nn>_<idea>_V2-GANCHO-LARGO_<REEL_1080x1920|CUADRADO_1080x1080>.mp4
- Una hoja de vista previa (src/preview.py) y una tabla copy → metáfora → ajustes al copy.
- Plan de prueba sugerido:
  - Un conjunto de estáticas contra un conjunto de videos, con el mismo público y presupuesto.
  - Para el gancho, mide el % de impresiones con 3 s vistos.
  - Decide por costo por lead o por visita agendada.
- Haz commit del código en tu rama. Los videos van por chat o Drive, no en git.
```

# Apex Blended School: 12 anuncios animados (Reel + Cuadrado)

24 videos listos para Meta: 12 copys × 2 formatos.

| Formato | Medidas | Para |
|---|---|---|
| `REEL_1080x1920` | 9:16 | Reels y Stories |
| `CUADRADO_1080x1080` | 1:1 | Feed |

Cada video dura 15 s exactos, a 30 fps, en H.264 con AAC a 48 kHz y *faststart*. Pesan entre 2.5 y 4 MB y están en `out/`.

## Estructura (igual en los 12, montada sobre la música a 96 BPM)

| Tiempo | Qué pasa |
|---|---|
| **0–5 s · Gancho** | La pregunta entra palabra por palabra y la frase clave se resalta con marcador coral, subrayado o círculo a mano. Debajo, una **metáfora visual** propia de cada idea. El logo está arriba desde el primer frame. |
| **5–10 s · Respuesta** | La barra morada de sus artes crece y llena la pantalla. Entra la **pestaña coral "En Apex"**, que repite el estilo de "Conociendo / Descubriendo" de sus publicaciones, y después las tarjetas blancas con ícono en círculo morado, igual que en sus artes. |
| **10–15 s · Marca + CTA** | El logo se arma por piezas: crecen los laureles, entra el libro, el globo gira y las **3 estrellas suenan como 3 notas**, que funcionan como logo sonoro. Luego aparecen el nombre, el lema "Innovating towards a bigger future" y el botón de CTA con un toque animado. |

Todo se entiende sin sonido. Los textos quedan fuera de las zonas que tapa la interfaz de Reels.

## Metáfora y ajustes por anuncio

| # | Copy | Idea visual | Ajuste al copy |
|---|---|---|---|
| 01 | Adaptación | Una estrella no cabe en un hueco redondo. **El hueco cambia de forma** y la estrella entra. | — |
| 02 | Cada alumno importa | Una cuadrícula de alumnos iguales, **uno se ilumina** y aparece un corazón. | "Grupos reducidos + atención personalizada" quedó como dos tarjetas con un "+" |
| 03 | Ritmo propio | Carriles donde todos avanzan al mismo paso con un tic de metrónomo. Después **cada quien va a su ritmo** y la estrella llega a su bandera. | "Orientación, acompañamiento y confianza" se volvió 3 tarjetas |
| 04 | No ser uno más | En una multitud, **uno da un paso al frente**. | Se resalta "uno más" con un círculo |
| 05 | Potencial | De un libro abierto **brota una planta que florece en estrella**. | "…académico, emocional y social" se volvió frase + 3 tarjetas |
| 06 | Aprender con confianza | Un niño **sube escalón por escalón** siguiendo un camino guía. Arriba aparecen una bandera y un escudo. | — |
| 07 | Forma de aprender | Igual que el 01: el problema era el hueco, no la pieza. | Frase + íconos |
| 08 | Educación tradicional | Un salón en filas que **se reorganiza en grupos pequeños**. El pizarrón se convierte en un foco. | — |
| 09 | Conocerlo | Una **lupa busca entre alumnos** y encuentra a uno. | "Lo orientamos y acompañamos para impulsar su potencial" se volvió 3 tarjetas |
| 10 | Experiencia escolar | Un libro tiembla y **estalla en confeti** al abrirse. | Frase + íconos |
| 11 | Comparación | El mismo recurso de los carriles: todos iguales y luego cada uno distinto. | Tarjetas con "+" |
| 12 | Necesidades individuales | Una pieza **en forma de corazón** y un hueco que se adapta a ella. | Frase + íconos |

Cambios que aplican a todos:
- "En Apex" pasó a la pestaña coral, así que la frase de la respuesta continúa la idea ("En Apex, cada alumno importa.").
- Los CTA del botón van sin punto final.
- No se agregó ninguna afirmación nueva. Todo el texto sale de los copys enviados.

## Versión 2: gancho largo (07, 11, 01 y 04)

Esta versión responde al comentario del estratega: en la v1 la pregunta solo estaba completa unos 3 segundos.

| Tiempo | v2 |
|---|---|
| **0–7.5 s** | La pregunta está **completa desde el primer frame**. La frase clave se resalta a los 0.5 s y la animación de la idea arranca a los 0.6 s. |
| **7.5–12.5 s** | La pregunta **sube y se queda como encabezado**. Debajo entra el panel morado con la pestaña "En Apex" y los beneficios, así que la pregunta nunca sale de pantalla. |
| **12.5–15 s** | Cierre de marca más corto: el logo, las 3 estrellas y el CTA. |

Los archivos están en `out/v2/` y se llaman `APEX_<copy>_V2-GANCHO-LARGO_<formato>.mp4`. La idea es compararlos contra la v1 del mismo copy, con el mismo público y presupuesto. La métrica que decide el gancho es el porcentaje de impresiones que ve 3 segundos o más.

```bash
node src/synth_ads.js <n> work/aud/a<NN>_v2.wav 2
cd src && node render_ads.js batch ../work/vid 4 "<n>:reel:2,<n>:square:2"
```

## Marca

- **Colores tomados de sus artes:** coral `#DD3113`, morado `#453B87`, morado oscuro `#25172E`, lavanda `#8786C1`, y el navy y naranja del logo.
- **Tipografías:** Poppins, parecida a la sans de sus artes, y Courgette, una script similar a la de "Conociendo". Las dos son de Google Fonts y tienen licencia libre.
- **Logo:** se separó en 9 capas (laureles, libro, globo, textos y 3 estrellas) a partir del archivo que mandaron, para poder animarlo por piezas sin alterar el diseño.
- **Música y efectos:** están sintetizados por código. No hay samples ni música con derechos, así que no hay riesgo de reclamos en Meta.

## Sugerencias de prueba

1. Arrancar con **07 (Forma de aprender)** y **11 (Comparación)**, que son tus favoritos, contra **01** y **04**.
2. Subir el Reel en las ubicaciones Reels y Stories, y el Cuadrado en Feed. Si quieres, se puede generar también 4:5, que ocupa más pantalla en el feed.
3. Medir la retención a 3 s. Si un gancho no retiene, se cambia solo la pregunta y la metáfora se queda.

## Cómo hacer más versiones

Todo vive en código, así que una versión nueva es editar texto y volver a renderizar:

```bash
# 0. (una vez) el logo del cliente no se versiona: ponerlo en assets/logo_src.jpg y separarlo en capas
python3 src/logo_layers.py && echo "window.LOGO_META = $(cat assets/logo_meta.json);" > assets/logo_meta.js
# 1. editar src/copies.js (copy, frase resaltada [así], tarjetas, CTA, metáfora)
# 2. audio
node src/synth_ads.js <n> work/aud/a<NN>.wav
# 3. video (n:formato, varios separados por coma)
cd src && node render_ads.js batch ../work/vid 4 "<n>:reel,<n>:square"
# 4. unir audio y video → out/
./src/mux_all.sh
```

Cada video tarda alrededor de 1 minuto en renderizarse, con 4 en paralelo.

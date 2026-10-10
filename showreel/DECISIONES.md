# SHOWREEL 2026 — Decisiones

**Entregable:** `showreel.mp4`, 1920×1080, 60 fps, 15 s exactos, H.264 + AAC.
**Regla:** solo código. No usé modelos de imagen, video ni audio, ni samples, fotos, footage o assets externos. Las únicas dependencias externas son las tipografías del sistema (Inter Display y DejaVu Sans Mono), que se rasterizan como texto vectorial.

---

## 1. La idea

Un showreel de motion designer no se trata de mostrar efectos. Tiene que demostrar **criterio**: timing, easing, transiciones con intención y variedad de estilos sin perder un sistema visual. Por eso el texto del propio video es la tesis:

> **EVERY FRAME IS INTENTIONAL → TIMING IS EVERYTHING → MAKE IT MOVE → CLAUDE. Motion Designer**

Todo está montado sobre una rejilla musical: **128 BPM × 8 compases = 15,000 s exactos** (1 beat = 0,46875 s = 28,125 frames). Cada corte, golpe tipográfico y cambio de forma cae en un beat, medio beat o semicorchea. La imagen y el audio salen de la misma partitura temporal.

## 2. Estructura (beat → escena)

| Compás | Tiempo | Escena | Qué demuestra |
|---|---|---|---|
| 1 | 0,00–1,88 s | **Punto → línea → "SHOWREEL."** | Squash & stretch, anticipación, revelado con máscara y skew |
| 2 | 1,88–3,75 s | **EVERY / FRAME / IS / INTENTIONAL** | Tipografía cinética, un color por beat, 3 tipos de transición (corte duro, wipe circular, wipe diagonal) |
| 3 | 3,75–5,63 s | **Marquesinas + zoom dentro de la "O"** | Movimiento escalonado por beat y *match cut*: el hueco de la O se vuelve el fondo de la escena siguiente |
| 4 | 5,63–7,50 s | **Escultura de 1.600 partículas 3D** | Proyección en perspectiva y morphs con stagger esfera → toro → nudo tórico; al final las partículas se aplanan en una rejilla de 16×9 |
| 5 | 7,50–9,38 s | **Build: rejilla en ola + "TIMING IS EVERYTHING"** | La rejilla nace de las partículas, la ola se acelera, el texto entra por semicorchea, el glitch crece y cierra con un silencio de ¼ de beat |
| 6–7 | 9,38–13,13 s | **DROP**: estallido "MAKE IT MOVE" → "IT ALL MOVE", metaballs GLSL "FLOW", ciudad isométrica "SYSTEMS", montaje (póster suizo, espirógrafo, semitono, whip pan) | Física (resortes, arrastre), shaders, procedural, rango de estilos |
| 8 | 13,13–15,00 s | **Cierre "CLAUDE. Motion Designer"** | Ensamblado con overshoot. El punto coral regresa al centro y se vuelve el mismo punto con el que empezó el video (bookend) |

## 3. Decisiones visuales

- **Paleta cerrada de 5 colores:** tinta `#0C0C11`, papel `#F2EEE5`, coral `#FF4A26`, azul eléctrico `#2B47FF` y lima `#D4FF3A`. Con ella cada escena puede ser muy distinta y el conjunto se sigue leyendo como un sistema. El coral funciona como "firma": el punto de SHOWREEL, la O de MOTION y el punto de CLAUDE.
- **Tipografía:** Inter Display Black para golpes y DejaVu Sans Mono para metadatos. El contraste entre lo enorme y lo diminuto es el lenguaje clásico de los reels editoriales.
- **HUD persistente** (esquinas, timecode real, compás/beat y un indicador que late con el beat), en modo *difference* para que contraste sobre cualquier fondo. Muestra al espectador que el ritmo está pensado.
- **Motion blur real:** cada frame promedia 6 sub-frames con obturador de 180°. Así se suavizan el zoom, el whip pan y las partículas del estallido sin difuminar los fotogramas quietos.
- **Post-proceso:** separación RGB y tiras desplazadas (glitch) solo en el build y en los cortes del drop, flash blanco en el drop, camera shake con decaimiento exponencial, viñeta y grano animado.
- **Easing:** casi nada es lineal. Uso expo-out para entradas (llegan rápido y frenan con suavidad), back/overshoot para el logo, resortes amortiguados para "MOVE" (follow-through) y cúbica de entrada para el zoom, para que se sienta como una caída.

## 4. Música (sintetizada desde cero)

Escrita en `src/synth.js`: es DSP muestra por muestra en JavaScript, sin samples.

- **Batería:** kick con barrido de pitch sinusoidal + saturación tanh + click; snare de ruido filtrado + tono; clap con 3 ráfagas; hi-hats metálicos al estilo 808 (6 ondas cuadradas inarmónicas).
- **Armonía:** La menor, Am–F–C–G en el groove y Am–F–C–G–Dm–E en el drop. El E mayor final crea tensión de dominante que resuelve en el acorde del cierre.
- **Sintes:** bajo saw + sub con filtro de estado variable resonante; supersaw de 7 voces desafinadas para stabs, pads y el drop; pluck FM para los arpegios.
- **Diseño sonoro ligado a la imagen:** un "ping" cuando aparece el punto, ruido filtrado mientras la línea se estira, ticks digitales con cada letra que se escribe, un whoosh que crece durante el zoom dentro de la O, barridos descendentes en cada morph de partículas, un redoble que acelera (corcheas → fusas) con un riser en el build, silencio justo antes del drop, impacto subgrave, golpes en cada corte del montaje y un whip al cierre.
- **Mezcla:** sidechain/ducking desde el kick, reverb tipo Freeverb (8 combs + 4 allpass por canal, desfasada en estéreo), saturación suave como "glue" y fade final.

## 5. Pipeline técnico

1. `src/reel.js` + `reel.html`: toda la animación es una función pura `renderFrame(f)` del tiempo, sin estado, así que cualquier frame se puede renderizar en cualquier orden. Canvas 2D para vector y tipografía; WebGL2 (GLSL) para los metaballs con curvas de nivel.
2. `src/render.js`: Chromium headless (Playwright) renderiza cada frame y lo manda por pipe a FFmpeg. Corre en 3 procesos en paralelo, cada uno con un tercio del video.
3. `src/synth.js` → WAV de 48 kHz. FFmpeg concatena los segmentos, mezcla el audio y codifica el MP4 final (H.264 yuv420p, AAC 320 kbps).

## 6. Lo que descarté

- **Usar After Effects o Blender por scripting:** no está disponible y además rompía la regla de "solo código" en espíritu.
- **Python + PIL para dibujar:** sin antialiasing de calidad ni blend modes. Canvas en Chromium da vector con antialiasing, `letterSpacing`, composiciones (*difference*, *lighter*, *multiply*) y WebGL en el mismo lugar.
- **Metaballs en CPU a baja resolución:** los bordes quedaban borrosos al escalar. El shader a resolución completa, con `fwidth`, da bordes nítidos y curvas de nivel gratis.
- **Grabar el canvas en tiempo real (MediaRecorder):** frames perdidos y fps variable. El render determinista frame por frame garantiza 60 fps exactos.
- **Un cierre más largo con logo animado:** le quitaba ritmo al drop. Preferí el bookend del punto coral, que cierra la historia con un solo elemento.
- **Texto en modo *difference* directamente sobre la rejilla del build:** quedaba ilegible (ver iteraciones).
- **Un montaje con cortes de ¼ de beat (7 frames):** demasiado estroboscópico. Lo dejé en ½ beat.
- **Reverb por convolución con FFT:** innecesaria. El Freeverb muestra por muestra en JS tarda milisegundos.

## 7. Iteraciones

1. **Prueba de pipeline:** confirmé que había WebGL2 (SwiftShader) en Chromium headless y medí unos 200 ms por captura PNG.
2. **Primer pase completo de las 10 escenas** y una hoja de contactos con 30 frames para revisar composición y color de un vistazo.
3. **Correcciones tras revisar los stills:**
   - "TIMING / IS EVERYTHING" en *difference* sobre la rejilla no se leía. Lo cambié por una banda de tinta con filetes coral que se abre detrás del texto.
   - "FLOW" en contorno se perdía sobre los metaballs. Lo pasé a relleno tinta, que contrasta con coral, lima y azul.
   - Verifiqué con frames intermedios que el zoom termina **dentro** del hueco de la O (pantalla negra sin bordes) y empalma con la esfera de partículas.
4. **Audio, primer pase:** en el espectrograma y la forma de onda vi que el kick dominaba y que el drop no era más fuerte que el groove. Bajé el kick a ~58 %, subí el supersaw del drop y añadí una capa grave. Ahora la curva de energía es intro → groove → build → drop → cola.
5. **Render final** con 6 sub-frames de motion blur y revisión de la sincronía entre audio e imagen sobre el MP4 final.

## 8. Tiempo total

Medido con el reloj del contenedor:

| Fase | Inicio–fin (UTC) | Duración |
|---|---|---|
| Exploración del entorno y pruebas de pipeline | 07:45–07:47 | ~2 min |
| Concepto, guion por beats y código de las 10 escenas | 07:47–07:53 | ~6 min |
| Revisión de stills y correcciones | 07:53–07:54 | ~1 min |
| Síntesis musical + 2 pases de mezcla | 07:54–07:56 | ~2 min |
| Render final (900 frames × 6 sub-frames, 3 procesos) | 07:56–08:06 | ~10 min |
| Concatenación, mezcla A/V, QC del MP4 y documentación | 08:06–08:21 | ~15 min |
| **Total** | **07:45–08:21** | **≈ 36 min** |

## 9. Archivos

- `showreel.mp4`: el video final.
- `src/reel.html`, `src/reel.js`: toda la animación (~700 líneas).
- `src/synth.js`: la música y el diseño sonoro.
- `src/render.js`: el render por frames con Playwright + FFmpeg.

Para reproducirlo: `node src/synth.js music.wav`, luego `node src/render.js video seg.mp4 0 900 6` y por último mezclar los dos con FFmpeg.

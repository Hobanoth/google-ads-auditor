# Colegio Estefanía: 6 anuncios animados v2 "gancho largo" (Reel + Cuadrado)

12 videos (6 copys × 2 formatos) hechos 100% con código sobre la plantilla de Apex. Misma estructura de la v2:
pregunta completa desde el frame 0 (0–7.5 s), sube como encabezado y entra el panel con la respuesta (7.5–12.5 s),
cierre con el wordmark armándose por piezas, la oferta educativa y el botón (12.5–15 s).

Archivos: `out/v2/ESTEFANIA_<nn>_<idea>_V2-GANCHO-LARGO_<REEL_1080x1920|CUADRADO_1080x1080>.mp4` (no se versionan).

## Insumos

Cuenta `act_335878212617696` (CE Anuncios), solo lectura. Anuncios con leads entre el 11-ago y el 9-oct-2026 (60 días).
Con 45 días el top es el mismo, en el mismo orden. Los otros 10 anuncios de la cuenta tienen 0 leads en la ventana:
los 7 de WhatsApp (octubre) se miden por conversación, no por lead, y los carruseles casi no gastaron.

| # | Anuncio | Leads 60 d | CPL 60 d | Texto dentro del creativo |
|---|---|---|---|---|
| 01 | Preescolar • Sus primeros pasos | 24 | $160 | "Sus primeros pasos necesitan brazos que sostengan" |
| 02 | Secundaria • Descubren | 24 | $159 | "Aquí descubren quiénes son y cómo relacionarse con el mundo" |
| 03 | Primaria • Aquí aprenden | 18 | $213 | "Aquí aprenden a leer el mundo y a confiar en sí mismos" |
| 04 | Secundaria • Estático | 14 | $133 | "Aquí la visión internacional se vive todos los días" |
| 05 | Preescolar • Estático | 10 | $186 | "En preescolar, familia y colegio van juntos" |
| 06 | Primaria • Estático | 7 | $262 | "En primaria vemos el potencial de cada alumno" |

Las 6 estaban en las campañas de formulario, que hoy están en pausa.

## Copy → metáfora → ajustes

| # | Gancho (pregunta) | Metáfora | De dónde sale y qué se ajustó |
|---|---|---|---|
| 01 | ¿Quieres que tu hijo descubra el mundo **con confianza**? | bookburst: el libro se abre y estalla en confeti | Del texto principal ("…para que tu hijo descubra el mundo con confianza"), en forma de pregunta. Respuesta literal: "Cuando un niño se sabe amado, se atreve a explorar." + 3 íconos. CTA literal: "Conoce nuestro proyecto educativo". |
| 02 | ¿Buscas una secundaria que entienda **esta etapa** tan importante? | spotlight: entre muchos, uno se ilumina | Pregunta literal del anuncio. "Acompañamos a cada estudiante en su desarrollo emocional mientras lo preparamos académicamente con herramientas sólidas para su futuro" se dividió en 2 tarjetas con "+". CTA del texto: "Conoce nuestro enfoque educativo". |
| 03 | ¿Buscas una primaria donde tu hijo encuentre **su ritmo de aprendizaje**? | lockstep con bandera: todos al mismo paso, luego cada uno a su ritmo | De "cada niño encuentra su ritmo de aprendizaje", en forma de pregunta. "Descubre sus talentos únicos" va como frase y "pensamiento crítico, trabajo en equipo y la seguridad para expresar sus ideas" como 3 tarjetas. CTA: "Visítanos" (sin "¡!"). |
| 04 | ¿Qué pasa cuando un adolescente se siente **valorado y respaldado**? | growth: del libro brota una planta que florece en estrella | Pregunta literal de una variante del texto. Frase literal: "el bienestar emocional es el motor de su aprendizaje". Las 3 viñetas del anuncio son las 3 tarjetas. CTA: "Agenda tu visita" (el del creativo). |
| 05 | ¿Qué hace que un colegio sea **el adecuado** para tu hijo? | steps: sube escalón por escalón, con escudo y bandera | Pregunta literal. "En Colegio Estefanía, somos tus aliados" quedó como pestaña + frase. Las 2 viñetas del anuncio son las 2 tarjetas. CTA: "Agenda tu visita". |
| 06 | ¿Quieres que tu hijo se sienta **seguro y apoyado** en su aprendizaje? | spotlight con lupa: busca entre alumnos y encuentra a uno | Pregunta literal. "Nos tomamos el tiempo para conocer a tu hijo" (variante del texto) + las 3 viñetas: cómo aprende, qué le apasiona y dónde puede crecer más. CTA: "Agenda tu visita". |

Lo que no se usó a propósito: "visión internacional", "pocos espacios / últimas plazas", "la mejor opción de Atizapán",
"prestigiosa" y "convenios con universidades". Son afirmaciones de urgencia o de ranking que no se pueden respaldar en el video.

## Marca

- **Colores de sus artes:** navy `#00286E` para el texto, azul del logo `#01308A`, cian `#019CDE`, amarillo `#FEDC01` y lima `#E0E830`.
  El amarillo es el marcador, la pestaña, el "+" y la flecha del botón, siempre con texto navy encima. El cian se usa en los trazos
  (subrayado, óvalo), las piezas y los anillos. El panel es un degradado azul.
- **Logo:** el wordmark "COLEGIO ESTEFANÍA" de la foto de perfil de su página (2048 px). `src/logo_layers.py` lo separa en 12 capas:
  COLEGIO, la línea, las 9 letras y el acento. En el cierre, COLEGIO se descubre, las letras caen una por una y la línea se traza en `globeT`.
  Las 3 notas del logo sonoro (`starT`) son un destello al final de la línea, otro destello arriba y la caída del acento de la Í.
- **Tipografías:** Poppins (la sans de sus artes) y Dancing Script 700 para la pestaña. Las dos son de Google Fonts.
- **Lema:** "Una familia, atendiendo a tu familia" aparece en su DCE, pero no en la web. Mientras no se confirme, el cierre muestra la
  oferta educativa (PREESCOLAR · PRIMARIA · SECUNDARIA · PREPARATORIA), que sí está publicada. Se cambia en `BRAND.tag` de `src/ads.js`.

## Control de calidad

Se revisaron frames en 0, 2.5, 4.6, 6.9, 7.4, 10.2, 11.9 y 14.8 s en los dos formatos. Lo que se corrigió en código:
- El óvalo de "el adecuado" rozaba "sea". Se subió el aire lateral del resaltado en círculo (`hlPad` 0.09 → 0.27).
- Los carriles del lockstep dejaban puntitos en el frame 0. Ya no se dibujan hasta que empiezan a crecer.

En ffprobe los 12 salen con H.264 a 1080x1920 o 1080x1080, 30 fps, 450 frames, 15.0 s y AAC a 48 kHz. La sonoridad va de −14.0 a −14.6 LUFS.

## Plan de prueba sugerido

1. **Videos contra estáticas:** un conjunto con las 6 estáticas ganadoras y otro con los 6 videos, con el mismo público, presupuesto y formulario.
   El Reel va en Reels y Stories, y el Cuadrado en Feed.
2. **Gancho:** se mide el % de impresiones con 3 s vistos. Si un video no retiene, se cambia solo la pregunta y la metáfora se queda.
3. **Decisión:** por costo por visita agendada en GHL, no por costo por lead (en Estefanía el cuello está en contacto → cita).
   Si no hay volumen de citas, se usa el costo por lead calificado.

## Reproducir

```bash
npm i                                   # playwright (o CHROME=<ruta a chrome.exe> para usar uno ya instalado)
python src/logo_layers.py && echo "window.LOGO_META = $(cat assets/logo_meta.json);" > assets/logo_meta.js   # requiere assets/logo_src.jpg
node src/render_ads.js stills work/st <n> reel 0,2.5,4.6,6.9,7.4,10.2,14.8 2
node src/synth_ads.js <n> work/aud/a<NN>_v2.wav 2
cd src && node render_ads.js batch ../work/vid 6 "0:reel:2,0:square:2,..."   # FFMPEG=<ruta> si no está en PATH
bash src/mux_v2.sh && python src/preview.py
```

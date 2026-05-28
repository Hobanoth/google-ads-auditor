# Google Ads Auditor & Optimization Assistant

Una herramienta local, interactiva y estéticamente premium diseñada para auditar la configuración de tus campañas de Google Ads, diagnosticar cuellos de botella mediante métricas reales y filtrar fugas presupuestarias de palabras clave irrelevantes.

## Características Principales

1. **Auditoría de Configuración Técnica**:
   - Evaluación en tiempo real de la configuración de Redes (Display vs Búsqueda), segmentación geográfica, estrategias de puja, píxeles de conversión y concordancias de palabras clave.
   - Generación dinámica de un **Puntaje de Configuración (0% a 100%)** con tarjetas descriptivas de fallos graves y sugerencias de corrección.

2. **Calculadora Diagnóstica de Embudo (Funnel)**:
   - Introduce tus métricas reales (Impresiones, Clics, Coste, Conversiones).
   - Cálculo automático en tiempo real de KPIs:
     - **CTR (Click-Through Rate)**
     - **CPC Medio (Costo por Clic)**
     - **Tasa de Conversión (Conversion Rate)**
     - **CPA (Costo por Adquisición)**
   - Representación gráfica e interactiva del embudo de conversión.
   - Motor de diagnóstico automatizado para detectar:
     - *Bajo volumen de impresiones (Campaña paralizada).*
     - *Bajo CTR (Problemas de relevancia de anuncios).*
     - *Cero conversiones con muchos clics (Fuga en landing page o tráfico irrelevante).*

3. **Buscador y Escáner de Palabras Clave Negativas**:
   - Pega tu informe de términos de búsqueda reales de Google Ads.
   - Filtro inteligente que escanea patrones comunes en español de búsquedas sin intención de compra (ej: "gratis", "empleo", "pdf", "que es", "barato").
   - Genera una lista consolidada y limpia lista para copiar y pegar directamente en tu panel de Google Ads como palabras clave negativas.

4. **Plan de Acción Dinámico e Imprimible (Guardar como PDF)**:
   - Lista de verificación reactiva que genera tareas personalizadas (Prioridad Alta, Media y Baja) en función de las respuestas de tu auditoría y los números de tu calculadora.
   - Hoja de estilos CSS optimizada para impresión: al presionar **Guardar / Imprimir Reporte PDF**, se limpia la barra de navegación lateral y los botones interactivos, generando un reporte físico limpio, elegante y profesional.

## Cómo Utilizar la Herramienta

1. Abre el archivo [index.html](file:///e:/ANTIGRAVITY%20PROJECT/index.html) directamente en tu navegador preferido (Google Chrome, Microsoft Edge, Brave, Firefox, Safari). No requiere instalación de bases de datos, servidores locales ni dependencias de Node.js.
2. Ve a la pestaña **Configuración** y responde las 5 preguntas rápidas sobre cómo tienes armada tu campaña actual. Observa las advertencias en la tarjeta de puntuación de la derecha.
3. Ve a la pestaña **Calculadora & Diagnóstico** e introduce las métricas que te arroja tu panel de Google Ads en los últimos días. Haz clic en **Analizar Rendimiento** para ver tu embudo gráfico y el reporte detallado del cuello de botella técnico.
4. Si tienes acceso a tus "Términos de búsqueda" reales en Google Ads, ve a la pestaña **Filtro de Negativas**, pégalos allí y haz clic en **Escanear** para extraer palabras que están drenando tu dinero.
5. Ve a **Plan de Acción**, marca las tareas que vas solucionando dentro de tu cuenta de Google Ads y guarda tu reporte como PDF para hacer seguimiento continuo de tu optimización.

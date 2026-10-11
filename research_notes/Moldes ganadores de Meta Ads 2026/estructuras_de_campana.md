# Estructuras de cuenta y campaña en Meta Ads tras Andromeda y Advantage+ (2025-2026): qué cambió y qué moldes usan los practicantes top de EE. UU.

> **Nota de método (leer primero).** Investigación hecha el 2026-10-11.
> - **Límites de herramientas en esta sesión:** WebFetch falló por DNS en todos los dominios, y la descarga directa por el proxy quedó bloqueada por la política de salida (egress) de la organización (403). Por eso **no pude abrir ninguna página completa**. Todos los hallazgos vienen de los resúmenes del buscador sobre las URLs citadas.
> - **Búsquedas agotadas:** el presupuesto de búsquedas, compartido entre agentes, se acabó antes de cubrir varios temas: los requisitos oficiales de Meta para "conversion leads", los destinos instant form / web / mensajería, el learning phase oficial, las reglas oficiales de presupuesto y Depesh Mandalia. Esos temas quedan en *Gaps*.
> - **Fechas de posts:** las de X y LinkedIn las saqué localmente del ID de cada post, que codifica la fecha de publicación.
> - **Etiquetas de evidencia:**
>   - **[META]**: documentación, ingeniería o earnings de Meta.
>   - **[PRÁCTICO-1]**: fuente propia del practicante (su web, post o podcast).
>   - **[PRÁCTICO-2]**: un tercero le atribuye la idea al practicante.
>   - **[PRENSA]**: prensa especializada.
>   - **[VENDOR]**: blog de una agencia o herramienta.
>   - **[ANÉCDOTA]**: post suelto de un operador poco conocido.
>   - **[PRE-2025]**: posiblemente obsoleto, porque Andromeda cambió las mejores prácticas.
>   - **[NO VERIFICADO]**: no confirmado contra una fuente primaria.

## 1. Andromeda, GEM y Lattice: qué son, cómo cambian la entrega y qué implican para la estructura

### Takeaway
Andromeda (Meta Engineering, 2-dic-2024) es la etapa de *retrieval*: preselecciona unos pocos miles de candidatos entre millones de anuncios. GEM es el gran modelo fundacional que mejora la predicción y el ranking. Lattice es la arquitectura que consolida los modelos.

Lo que concluyen Meta y los practicantes es lo mismo:
- Pocas campañas y ad sets, con segmentación amplia.
- Diversidad *real* de conceptos creativos, no microvariaciones.

La razón: el sistema parece agrupar creativos casi idénticos. "Entity ID" es jerga de la industria para esa agrupación, no un término oficial de Meta.

### Cited Findings

**Lo que dice Meta (ingeniería y earnings)**
- [META] Meta presentó Andromeda como "Meta's proprietary machine learning (ML) system design for retrieval in ad recommendation". Es el primer paso del sistema de recomendación multietapa; los modelos de ranking vienen después. Corre sobre NVIDIA Grace Hopper Superchip y el chip propio MTIA. — [Meta Engineering, 2-dic-2024](https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval/)
- [META vía terceros, NO VERIFICADO] Cifras que terceros atribuyen a ese post: capacidad o complejidad de modelo 10,000x mayor que el sistema anterior, +6% de recall y +8% de calidad de anuncios en segmentos seleccionados. Un tercero cita además +22% de ROAS para usuarios de Advantage+ creative y lo marca como "direccional". No pude cotejar estas cifras con la página original. — [Atria](https://www.tryatria.com/blog/meta-andromeda); [Influencer Marketing Hub](https://influencermarketinghub.com/meta-andromeda-update-explained-how-meta-ads-work-now/); [Segwise](https://segwise.ai/blog/meta-andromeda-next-gen-ad-strategies)
- [META vía terceros] GEM ("Generative Ads Recommendation Model") se describe como el mayor modelo fundacional construido para recomendación publicitaria. Genera predicciones y transfiere conocimiento a los sistemas de entrega (Andromeda y Lattice); no genera creativos. — [Moburst](https://www.moburst.com/blog/meta-advantage-andromeda-lattice-and-gem-explained/); [Triple Whale](https://www.triplewhale.com/blog/meta-ads-ai-system); [Iain Harper](https://tiny.write.as/iain-harper/metas-gem-what-the-largest-ads-foundation-model-means-for-your-marketing)
- [META vía terceros] Mejoras atribuidas a GEM: no pude aislar cuál de las tres fuentes da cada cifra. — mismas fuentes que el punto anterior ([Moburst](https://www.moburst.com/blog/meta-advantage-andromeda-lattice-and-gem-explained/); [Triple Whale](https://www.triplewhale.com/blog/meta-ads-ai-system); [Iain Harper](https://tiny.write.as/iain-harper/metas-gem-what-the-largest-ads-foundation-model-means-for-your-marketing))
  - Q2 2025: +5% de conversiones en Instagram y +3% en Facebook Feed.
  - Q4 2025: +3.5% de clics en Facebook y más de +1% de conversiones en Instagram.
- [META vía PRENSA] En el call de Q3 2025 (29-oct-2025), Meta habría dicho que Advantage+ y herramientas relacionadas llegaron a unos US$60B de *run-rate* anualizado. — [PPC Land](https://ppc.land/metas-ad-business-hits-record-58b-as-ai-drives-conversion-gains/)
- [META vía PRENSA] Q1 2026:
  - Las mejoras de modelado y aprendizaje en Lattice, junto con la arquitectura de GEM, dieron "more than 6% increase in conversion rate for landing page view ads".
  - Meta siguió consolidando modelos bajo Lattice.
  - Ingresos de US$56.3B (titular; no lo verifiqué en la fuente primaria).
  - — [PPC Land](https://ppc.land/meta-q1-2026-56-3b-revenue-as-ai-tools-double-advertiser-adoption/)
- [META] Q2 2026 (transcripción oficial de Meta IR, call de finales de julio de 2026):
  - Sobre Advantage+: "Our AI-powered Advantage+ end-to-end solutions continue to grow, reaching over $75 billion in annual revenue run rate this quarter."
  - Sobre ranking: "Rather than scoring every possible ad individually, we are now using LLMs to reason about ad content and user preferences together, and predict the best ad for each person."
  - — [Meta IR, transcripción Q2 2026 (PDF)](https://s21.q4cdn.com/399680738/files/doc_financials/2026/q2/META-Q2-2026-Earnings-Call-Transcript.pdf); [The Globe and Mail (transcripción)](https://www.theglobeandmail.com/investing/markets/stocks/META/pressreleases/3729590/meta-meta-q2-2026-earnings-call-transcript/)
- [VENDOR, NO VERIFICADO] Resúmenes de terceros del Q2 2026 hablan de +8.3% de clics en anuncios de Facebook y +15.7% de conversiones. Los atribuyen a modelos de comprensión del usuario, ranking con GEM y *sequence learning*. Un comentarista advierte que son cifras declaradas por Meta, sin verificación independiente. — [Digital Applied](https://www.digitalapplied.com/blog/meta-q2-2026-earnings-ad-strength-capex-selloff)
- [VENDOR] Los terceros no coinciden en la "división del trabajo" entre sistemas, ni siquiera en qué significa la sigla GEM:
  - Uno dice: Andromeda recupera la lista corta, GEM puntúa el engagement y Lattice hace el ranking y fija el precio en la subasta.
  - Otro dice: GEM es demasiado costoso para servir anuncios directamente y "enseña" a los demás modelos vía *knowledge distillation*.
  - — [Greg Hal](https://greghal.no/en/blog/meta-ads-algorithm-2026-complete-guide/); [AdLibrary](https://adlibrary.com/posts/meta-andromeda-gem-lattice)

**Cómo lo interpretan los practicantes**
- [PRÁCTICO-1] Jon Loomer (EE. UU.) sobre qué es Andromeda: "takes millions of ads, narrows them to a few thousand candidates". Decide qué anuncios son elegibles, pero no los rankea; eso lo hace otro sistema (él lo atribuye a GEM). — [Loomer, Meta Andromeda: What It Means for Your Ad Strategy](https://www.jonloomer.com/meta-andromeda/)
- [PRÁCTICO-1] Loomer sobre qué hacer:
  - Recomienda ad sets amplios, los defaults de Advantage+ y estructuras más simples; el trabajo pesado ocurre a nivel anuncio.
  - "Creative diversification is the new lever": en la práctica sustituye lo que antes hacía la segmentación.
  - — [Loomer, Meta Andromeda](https://www.jonloomer.com/meta-andromeda/); [Loomer, Creative Diversification Is the New Targeting](https://pubcast.jonloomer.com/creative-diversification-is-the-new-targeting/); [Loomer, Andromeda and Creative Diversification: 7 Examples](https://www.jonloomer.com/meta-andromeda-creative-diversification/)
- [PRÁCTICO-1] Loomer, en su postura más reciente:
  - Andromeda "is more about capabilities than it is about requirements".
  - No hay que culpar a Andromeda de cada caída.
  - Hay que juzgar el ad set por su desempeño agregado, no anuncio por anuncio.
  - — [Loomer, The Truth About Meta Andromeda and Ad Retrieval](https://www.jonloomer.com/meta-andromeda-ad-retrieval/)
- [PRÁCTICO-1] Dara Denney (EE. UU.), X, 22-dic-2025: "The simplest way to explain the Andromeda and GEM updates on Meta: Both of these were made to look at the millions of potential ad choices for users and simply narrow those down into smaller groups for ad selection." Su tesis: Andromeda agrupa los anuncios recuperados por *persona*, así que cada creativo debe mapearse explícitamente a una persona objetivo. — [X @DenneyDara](https://x.com/DenneyDara/status/2003141118590898591)
- [PRÁCTICO-1] Charley Tichenor IV (EE. UU.), LinkedIn (sin fecha visible): "Meta's new Andromeda update just killed the old 'launch more creatives' playbook". También: "the way most people test ads on Meta is broken". — [LinkedIn Charley Tichenor IV](https://www.linkedin.com/in/charleytichenoriv/)
- [PRÁCTICO-2, NO VERIFICADO] Un tercero cita a Tichenor en septiembre de 2025: "I was wrong about 3:2:2. Meta's Andromeda update changed it." — [AdAdvisor](https://adadvisor.ai/docs/skills/adadvisor-creative)
- [PRÁCTICO-1] Nick Shackelford (EE. UU.), X, 29-sep-2025: "The old 'throw all your winners in one ad set' strategy used to work a lot better than it does now... Meta's algo changes reward a completely different approach to scaling campaigns." — [X @iamshackelford](https://x.com/iamshackelford/status/1972655631585996919)
- [PRÁCTICO-1] Common Thread Collective (CTC, EE. UU.): Andromeda trata anuncios similares como una sola entidad, así que los creativos deben ser enfoques genuinamente distintos. Según CTC, Andromeda premia a las marcas con más variedad creativa. — [CTC, Facebook Ads & Cost Controls with Andromeda (2025)](https://commonthreadco.com/blogs/sharpen-your-skills/facebook-ads-cost-controls-andromeda-2025)
- [PRÁCTICO-1] Foxwell Digital (EE. UU.): Andromeda empujó las cuentas hacia "fewer campaigns with fewer - oftentimes one - broad ad sets". — [Foxwell Digital, Andromeda: Structure, Creative, ROAS](https://www.foxwelldigital.com/blog/how-andromeda-has-changed-meta-advertising-a-practical-guide)

**"Entity ID" y agrupación de creativos casi idénticos**
- [VENDOR] "Entity ID" es la jerga con la que la industria describe cómo Andromeda agruparía anuncios conceptualmente idénticos bajo un solo identificador, una especie de "semantic fingerprint" distinto del ad ID. Los mismos explicadores lo presentan como un recurso explicativo, no como un término oficial de Meta. — [Atria](https://www.tryatria.com/blog/andromeda-meta-ads)
- [VENDOR, mecanismo no documentado por Meta] Cómo funcionaría según estos explicadores — [Atria](https://www.tryatria.com/blog/andromeda-meta-ads); [Nikhil.pro](https://nikhil.pro/meta-ads-creative-similarity-explained/):
  - Analiza lo visual con visión computacional, el copy con NLP y el audio en los videos.
  - Si varios anuncios superan un umbral de similitud, se colapsan en un mismo Entity ID: "One Entity ID = one ticket to the retrieval auction".
  - Ejemplo: 30 anuncios con la misma plantilla, fondo y estructura visual, que solo cambian el texto superpuesto, quedarían como 1 Entity ID.
  - Cambiar el color del titular, una palabra o la música de fondo no crearía una entidad nueva.
- [VENDOR, NO VERIFICADO] Circula la afirmación de que un "Creative Similarity Score" mayor a 60% dispara supresión en el retrieval. No hay fuente primaria de Meta. — [Nikhil.pro](https://nikhil.pro/meta-ads-creative-similarity-explained/)
- [VENDOR, contrapunto] "Meta's public material does not document an advertiser-facing Entity ID optimization feature or the five fixed creative-signal dimensions often repeated in marketing content." — [Adriselab](https://adriselab.com/blog/meta-andromeda-algorithm-2026)
- [VENDOR] Un ponente en contenido de Motion dice que correr 10 versiones de la misma imagen con ajustes menores de texto "isn't the efficient test that it used to be": el sistema las trataría como un solo "retrieval ticket". — [Motion](https://motionapp.com/blog/andromeda-impact-on-bfcm/)

**Guía estructural de Meta (Performance 5 y pruebas internas)**
- [META, PRE-2025 pero sigue siendo el marco oficial] "Performance 5" (versión de 2023 que actualiza prácticas de 2022). Según un socio de Meta, la recomendación es no gastar más del 20% del presupuesto en learning phase. Los cinco pilares son — [Social Media Today](https://www.socialmediatoday.com/news/meta-new-tips-maximize-ad-campaign-performance/652231/); [Tiger Pistol](https://tigerpistol.com/metas-performance-5-framework-the-impact-of-simplifying-your-account-structure); [The Keyword](https://thekeyword.beehiiv.com/p/performance-five-meta):
  1. Simplificar la estructura de cuenta y concentrar el creativo en una campaña central.
  2. Automatización (Advantage+).
  3. Diversificación creativa.
  4. Conversions API.
  5. Validar resultados con Conversion Lift y A/B tests.
- [META vía partner] En una prueba interna de Meta, la diversificación creativa dio "32% increased efficiency and 8% incremental reach". — [Adweek, artículo de partner](https://www.adweek.com/partner-articles/5-ways-to-optimiz)
- [META vía VENDOR, no encontré la fuente original] Prueba interna atribuida a Meta: 1 ad set con 25 creativos generó 17% más conversiones a 16% menos costo que 5 ad sets con 5 creativos cada uno. — [Segwise](https://segwise.ai/blog/meta-andromeda-update-creative-strategy-2026)
- [PRÁCTICO-1] Según Loomer, Meta recomendaba no más de 6 anuncios por ad set ("after six there was no clear benefit"). Esa guía "disappeared back in February" (el post no da el año; probablemente 2025) y, según él, "very likely tied to Andromeda". — [Loomer, How Many Ads is Too Many?](https://www.jonloomer.com/qvt/how-many-ads-is-too-many/)

### Inferences
- **La unidad de diseño cambió.** Antes era "audiencia → ad set"; ahora es "concepto / persona / oferta → anuncio".
  - Abrir ad sets por intereses o lookalikes pone a competir entre sí ad sets que pueden alcanzar a la misma gente, y fragmenta la señal (lo dicen Loomer y Foxwell).
  - Para una agencia de leads, la "segmentación" ahora se hace dentro del creativo: a quién le habla, qué objeción resuelve, en qué formato y en qué escenario.
- **Trata "Entity ID" como hipótesis de trabajo, no como dato oficial.** Asume que las variaciones superficiales (otro titular, otro color) se agrupan. Una forma de detectarlo: si 10 variantes reciben gasto como si fueran 1 o 2, probablemente el sistema las ve como una sola.
- **Las microvariaciones dan menos información que antes.** Andromeda (retrieval) y el ranking con LLMs que "razonan" sobre el contenido del anuncio (Q2 2026) apuntan en la misma dirección: el qué dice el creativo y a quién le habla es ahora la señal de segmentación. Por eso los métodos de microvariación tipo 3:2:2 rinden menos aprendizaje.
- **Más capacidad no significa más anuncios.** La capacidad de retrieval admite más anuncios por ad set, pero los propios tests de Loomer muestran rendimientos decrecientes. La combinación razonable es pocos ad sets con un número moderado de conceptos realmente distintos, no 50 clones.

### Gaps
- No pude abrir el post original de Meta Engineering sobre Andromeda; las cifras (10,000x, +6%, +8%) vienen de terceros. Tampoco recuperé el post de ingeniería de Meta sobre GEM. Por conocimiento previo creo que Meta publicó un post técnico de GEM hacia noviembre de 2025, pero **no lo verifiqué**.
- Fecha de despliegue global de Andromeda: un explicador secundario afirma "completed its global deployment in October 2025". No pude confirmarlo con Meta.
- No encontré documentación de Meta sobre "Entity ID" ni sobre un umbral de similitud.
- Motion tiene una charla "Andromeda 2.0 explained" (grabada en julio de 2026, [Motion](https://motionapp.com/library/talk/andromeda-2-0-explained-how-meta-s-algorithm-actually-picks-your-winning-ads/)), pero no recuperé su contenido. No encontré ningún anuncio de Meta sobre un "Andromeda 2.0".

## 2. Cambios en la configuración de campañas 2025-2026 (cronología fechada)

### Takeaway
Estos son los cambios de configuración, en orden:
- **Feb-2025:** al crear campañas con objetivo Sales, App o Leads, Meta arranca con Advantage+ activado por defecto. Una campaña es "Advantage+" solo si usa juntos Advantage+ campaign budget, Advantage+ audience y Advantage+ placements. ASC dejó de poder crearse como tipo nuevo.
- **2024-2025:** se eliminaron las exclusiones de detailed targeting.
- **Abr-2025:** llegó *incremental attribution*.
- **Mar-2026:** la atribución por clic quedó limitada a link clicks y nació *engage-through attribution*.
- **Ago-2026:**
  - Aparecieron las audiencias "exclusion-only".
  - Empezó a desaparecer la exclusión de placements a nivel ad set; se reemplaza por *value rules*.
- **6-oct-2026:** Meta anunció un asistente "agéntico" capaz de crear campañas, generar creativos y cambiar segmentación y presupuesto.

La meta de "automatización total para fines de 2026" que reportó el WSJ se está materializando en parte, pero no está confirmada como completa.

### Cited Findings

**2024-2025: fin de las exclusiones de detailed targeting**
- [PRÁCTICO-1 / PRENSA] Cronología:
  - Mayo-2024: llegó una alerta de remoción para el 28-jun-2024 que Meta luego calificó de bug.
  - Meta confirmó que desde el 29-jul-2024 ya no se pueden usar exclusiones de detailed targeting en campañas nuevas.
  - Las campañas existentes que las usaban siguieron funcionando hasta el 31-ene-2025; después dejaron de entregar.
  - Siguen disponibles las exclusiones de custom audiences y los controles de audiencia a nivel cuenta.
  - — [Jon Loomer](https://www.jonloomer.com/qvt/detailed-targeting-exclusions/); [Social Media Today](https://www.socialmediatoday.com/news/meta-removes-detailed-targeting-exclusions-from-ad-campaigns/723389/); [Social Samosa](https://www.socialsamosa.com/news-2/meta-eliminates-detailed-targeting-exclusions-6802509)
- [PRENSA, en conflicto] PPC Land fecha el anuncio el 21-ene-2025 y dice que los ad sets existentes conservan la función "until further notice". — [PPC Land](https://ppc.land/meta-removes-detailed-targeting-exclusions-for-ad-accounts/)
- [PRÁCTICO-1] Cody Plofker (Jones Road Beauty), X, 25-ene-2025: "Exclusions just don't work… But Meta is struggling." — [X @codyplof](https://x.com/codyplof/status/1883218947438530784)

**Feb-2025 y después: Advantage+ "unificado" por defecto (Sales / App / Leads)**
- [PRÁCTICO-1 / PRENSA] En febrero de 2025 Meta anunció la prueba de un flujo simplificado. Loomer revisó la documentación y concluye que el cambio "streamline[s] and repackage[s] existing options rather than removing any". — [Loomer, Advantage+ Sales, App and Leads Campaigns](https://www.jonloomer.com/advantage-plus-sales-app-leads-campaigns/); [Social Media Today, feb-2025](https://www.socialmediatoday.com/news/meta-advantage-plus-ad-updates-february-2025/739472/); [Adweek](https://www.adweek.com/media/meta-tests-streamlined-advantage-campaign-setup/)
  - Al crear una campaña con objetivo Sales, App o Leads, "Advantage+ will be on by default".
  - Desaparece la elección inicial entre Automated y Manual.
  - Las herramientas de personalización siguen ahí; si sobreescribes los defaults, Advantage+ se apaga.
- [VENDOR] La campaña muestra el estado Advantage+ (etiqueta verde) solo cuando se combinan las tres palancas: Advantage+ campaign budget, Advantage+ audience y Advantage+ placements. — [MagicBrief](https://magicbrief.com/post/meta-advantage-updates-that-will-simplify-campaign-setup-and-boost-performance); [Madgicx](https://madgicx.com/blog/new-advantage-updates)
- [PRÁCTICO-1] Más adelante en 2025 (fecha exacta no confirmada), el flujo "now appears to be official with the global rollout of Opportunity Score". Las Advantage+ Shopping campaigns (ASC) quedaron "phased out" para nuevas creaciones. — [Loomer, Advantage+ Campaign Setup is Here](https://www.jonloomer.com/qvt/advantage-plus-campaign-setup-is-here/)
- [PRENSA] Advantage+ leads campaigns: en pruebas tempranas, "10% lower cost per qualified lead" frente a campañas sin esas funciones de IA. Es una cifra preliminar de Meta. — [Search Engine Land](https://searchengineland.com/meta-advantage-campaign-setup-leads-campaigns-451713)
- [PRÁCTICO-1 / VENDOR] La herramienta de Creative Testing de Ads Manager prueba de 2 a 5 anuncios (posiblemente hasta 10) dentro de un ad set activo. Otra fuente dice "compare up to 5 versions". — [Loomer, The Master Brief](https://www.jonloomer.com/meta-ads-master-brief/); [Aimerce](https://www.aimerce.ai/blogs/how-to-test-facebook-ads-post-andromeda)

**Abr-2025: Incremental attribution**
- [VENDOR / agencias] Apareció en Ads Manager hacia abril de 2025. Meta compara el comportamiento de usuarios expuestos y no expuestos. — [Seer Interactive](https://www.seerinteractive.com/insights/we-tested-metas-new-incremental-attribution-setting-on-1m-in-ad-spend.-heres-how-it-works); [Propellernet](https://www.propellernet.co.uk/insights/meta-quietly-rolls-out-new-incremental-attribution-setting/); [WorkMagic](https://www.workmagic.io/blog/incremental-attribution-meta); [AdsUploader](https://adsuploader.com/blog/meta-incremental-attribution)
  - Es un toggle a nivel ad set y no se aplica de forma retroactiva.
  - Requiere el objetivo de rendimiento "maximize conversions" o "maximize value".
  - Funciona como configuración de optimización y también como columna de reporte.
- [VENDOR, cifras en conflicto]
  - En pruebas de Meta, 46% de *lift* frente a business-as-usual, según una fuente; otra fuente habla de 20% de mejora promedio en conversiones incrementales.
  - Haus reporta 43% de tasa de éxito contra las configuraciones estándar, con una muestra limitada.
  - En una prueba de agencia (abr-2025), Meta reportó en promedio ~87% de conversiones incrementales. El *broad* y los segmentos hiperestrechos como retargeting tuvieron el menor desempeño incremental.
  - — [Haus](https://haus.io/blog/meta-is-changing-its-attribution-settings-heres-what-you-need-to-know); [Seer Interactive](https://www.seerinteractive.com/insights/we-tested-metas-new-incremental-attribution-setting-on-1m-in-ad-spend.-heres-how-it-works); [Propellernet](https://www.propellernet.co.uk/insights/meta-quietly-rolls-out-new-incremental-attribution-setting/)

**2-jun-2025: meta de automatización total para fines de 2026 (exclusiva del WSJ)**
- [PRENSA] Según el WSJ, Meta buscaba que para fines de 2026 una marca pudiera dar una imagen de producto y un presupuesto, y la IA se encargara del resto. Las herramientas de entonces solo generaban variaciones de anuncios existentes. — [Verdict](https://www.verdict.co.uk/meta-automate-ad-creation/); [Campaign Asia](https://campaignasia.com/article/meta-aims-to-fully-automate-ad-creation-with-ai-by-2026/502831); [exchange4media](https://www.exchange4media.com/digital-news/meta-aims-to-fully-automate-advertising-with-ai-by-2026-144037.html); [Shopifreaks](https://www.shopifreaks.com/meta-wants-to-fully-automate-advertising-with-ai-by-2026/)
  - Crear el anuncio: imagen, video y copy.
  - Definir la segmentación.
  - Sugerir cómo repartir el presupuesto.
  - Personalizar en tiempo real.

**Inicios de 2026: Customer Lifecycle Strategy (CLS)**
- [PRÁCTICO-1 / VENDOR] Es una opción a nivel ad set en campañas **manuales de Sales**; no es para Leads. El despliegue es parcial desde inicios de 2026. — [Loomer, Customer Lifecycle Strategy Is Not What Advertisers Thought](https://www.jonloomer.com/customer-lifecycle-strategy-not-what-advertisers-thought/); [Loomer, Customer Lifecycle Strategy, Attribution Updates, and More](https://www.jonloomer.com/customer-lifecycle-strategy/); [EasyInsights](https://easyinsights.ai/blog/metas-customer-lifecycle-strategy-the-small-setting-that-changes-everything/)
  - El default es "new and existing customers"; la alternativa es "acquire new customers".
  - Texto de Meta: las conversiones de quienes nunca compraron "may be worth more to you… may increase your cost per result".
  - Una fuente define "nuevo" como alguien sin compra en los últimos 180 días, según pixel, CAPI y listas.
  - Loomer comprobó que aparece "Exclude these existing audiences: None selected". En la práctica solo excluye clientes actuales si definiste el segmento Existing Customers en Advertising Settings.
- [PRÁCTICO-1] Foxwell: "Acquire New Customers" está en beta cerrada. Recomienda probarlo cabeza a cabeza contra una audiencia fría manual. — [Foxwell Digital](https://www.foxwelldigital.com/blog/customer-lifecycle-strategy-coming-to-meta-ads-in-2026)

**Mar-2026: cambio de atribución por clic**
- [META vía agencias / PRENSA] Qué cambia — [Acadia (cita el anuncio de Meta)](https://acadia.io/2026-meta-attribution-update); [Leafsignal](https://www.leafsignal.com/blog/meta-march-2026-attribution-update); [PPC Land](https://ppc.land/meta-rewrites-click-attribution-rules-finally-aligning-with-google-analytics/); [CMOtech](https://cmotech.news/story/meta-refines-ad-click-metrics-with-engage-through-shift); [AdsUploader](https://adsuploader.com/blog/meta-click-attribution):
  - *Click-through attribution* reporta solo conversiones atribuidas a **link clicks**; antes contaba cualquier clic.
  - Likes, shares, saves y comentarios dejan de contar como clic.
  - "Link click" sí incluye clics a app store o deep link, **click-to-call** y Meta Shops.
  - "Engaged-view attribution" pasa a llamarse **"engage-through attribution"** y absorbe las interacciones que no son link click.
  - La métrica "1-day engaged views" se reemplaza por "1-day engagement".
  - El umbral de *engaged view* en video baja de 10 a 5 segundos.
  - Efecto: una fuente dice que la facturación no cambia; otra espera que el CPA reportado suba y el ROAS reportado baje.

**Jun-sep 2026: Advantage+ Creative**
- [VENDOR] "Brand memory", que aprende la identidad de marca a partir de anuncios existentes, está en prueba con despliegue "in the coming months". La generación de texto se extendió a creativos de imagen. — [AdsUploader, Advantage+ Creative Enhancements 2026](https://adsuploader.com/blog/advantage-plus-creative-enhancements)
- [VENDOR, NO VERIFICADO] Hay un reporte sobre creativo generativo activado por defecto, sin confirmación de Meta. — [EdgeFix](https://edgefixautomation.com/reports/meta-default-on-generative-creative)

**Ago-2026: exclusiones y placements**
- [PRÁCTICO-1] 10-ago-2026: Meta lanzó las "exclusion-only custom audiences". CTC las propone como reemplazo de las exclusiones de detailed targeting. — [CTC](https://commonthreadco.com/blogs/coachs-corner/meta-exclusion-only-audiences-ecommerce-2026)
- [PRÁCTICO-1 / PRENSA] Fin de la exclusión de placements a nivel ad set — [PPC Land](https://ppc.land/meta-removes-ad-placement-controls-as-bid-cuts-get-capped-at-90/); [PPC Land (2)](https://ppc.land/some-meta-advertisers-lose-placement-controls-with-bid-cuts-capped-at-90/); [Shopifreaks](https://www.shopifreaks.com/meta-removes-the-option-for-advertisers-to-exclude-ad-placements-and-platforms-leaving-its-system-to-pick-where-ads-run/); [Relevant Audience](https://www.relevantaudience.com/facebook-ads/meta-removes-option-to-exclude-ad-placements/); [CTC](https://commonthreadco.com/blogs/coachs-corner/meta-is-removing-ad-placement-controls-what-ecommerce-brands-must-do-before-q4):
  - Hacia el 20-ago-2026, Loomer compartió un aviso dentro de Ads Manager: se perderá la capacidad de excluir placements y plataformas en ad sets.
  - El aviso no trae fecha, llegó solo a algunos anunciantes y no es un anuncio formal de Meta.
  - CTC dice que Meta lo anunció el 21-ago.
  - Según PPC Land, desde el 25-ago algunos anunciantes ya no ven el control. En su lugar hay "value rules" de +1,000% a −90%: un placement se puede devaluar, pero no bloquear.
  - Las páginas del Help Center de esa misma semana seguían describiendo la selección manual.
- [VENDOR] Los Placement Controls a nivel cuenta se mantienen. — [AdsUploader, Meta Ads Updates sep-2026](https://adsuploader.com/blog/meta-ads-updates)
- [PRÁCTICO-1] 27-ago-2026: se elimina Messenger Stories como placement. Lo dice CTC; no pude aislar en cuál de sus páginas, probablemente la de placements o su changelog de 2026. — [CTC, placements](https://commonthreadco.com/blogs/coachs-corner/meta-is-removing-ad-placement-controls-what-ecommerce-brands-must-do-before-q4); [CTC, changelog 2026](https://commonthreadco.com/blogs/coachs-corner/meta-ads-changes-2026)

**Sep-2026**
- [PRÁCTICO-1] 15-sep-2026: entra en funcionamiento el Creator Marketing Hub, que fusiona Creator Marketplace y Partnership Ads Hub. — [CTC](https://commonthreadco.com/blogs/coachs-corner/metas-creator-marketing-hub-is-live-what-ecommerce-brands-need-to-do-before-the-holiday-season)

**6-oct-2026: Advertising Week NY, asistente agéntico en Ads Manager**
- [PRENSA / PRÁCTICO-1] Meta anunció funciones agénticas para su business assistant — [Social Media Today](https://www.socialmediatoday.com/news/meta-introduces-new-ai-powered-tools-at-ad-week-2026/832288/); [CTC](https://commonthreadco.com/blogs/coachs-corner/metas-new-ai-agent-can-now-run-your-ads-what-the-advertising-week-2026-update-means-for-ecommerce-brands); [CTC, generative video y checkout en conversación](https://commonthreadco.com/blogs/coachs-corner/meta-launches-generative-video-ads-and-in-conversation-checkout-at-advertising-week-ny-what-ecommerce-brands-must-do-now); [Inside AI News](https://insideai.news/news/ai-in-business/meta-ai-advertising-tools/13743/); [BestMediaInfo](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-tests-agentic-ad-assistant-that-can-create-campaigns-change-targeting-and-budgets-12631550):
  - Por conversación se podrá planear y crear una campaña, generar imágenes y copy, actualizar la segmentación y cambiar el presupuesto.
  - Habrá vistas previas, aprobaciones y controles para decidir qué tareas se delegan.
  - El asistente tendrá memoria de desempeño pasado, estacionalidad y metas.
  - En prueba: importar la estrategia y los lineamientos de voz de marca.
  - En prueba: tareas programadas (reportes recurrentes, alertas, resúmenes semanales y recordatorios de revisión de presupuesto).
  - Otros anuncios: expansión de Ads Creative Studio, una herramienta de customer lifecycle strategy, checkout dentro del chat de Messenger con Shopify y anuncios de video generativo.
  - Las fuentes no coinciden en qué ya está activo y qué sigue en prueba.
- [VENDOR, NO VERIFICADO] Algunos blogs secundarios afirman −60% de tiempo de lanzamiento (en pruebas tempranas con partners) y +5% de conversiones al mismo costo por conversión. No pude aislar qué blog dice cada cifra, y estas cifras **no** vienen de Social Media Today ni de Meta. — [Future Factors](https://futurefactors.ai/meta-just-launched-ai-agents-inside-ads-manager/); [Aurelius Media](https://www.aureliusmedia.co/blog/meta-ads-updates)

### Inferences
- **Advantage+ es el punto de partida; lo manual se justifica.** Con Advantage+ como estado por defecto, una campaña "manual" debe tener una razón explícita: un tope de costo (cost cap o bid cap), exclusiones necesarias, una división por geografía o idioma, o una prueba deliberada.
- **Placements:** si el cambio de agosto de 2026 llega a la cuenta del cliente, ya no se podrá excluir Audience Network u otros placements a nivel ad set. La calidad del lead tendrá que defenderse con *value rules* (−90%), controles a nivel cuenta y, sobre todo, con señales de calidad desde el CRM.
- **Atribución desde marzo de 2026 (lead gen):** los clics a llamada (click-to-call) siguen contando como link click. En campañas que dependían de conversiones post-interacción sin link click, el CPL reportado puede subir sin que el desempeño real haya cambiado. Hay que anotarlo en los reportes a clientes para no interpretarlo como deterioro.
- **El rol de la agencia cambia.** Con el asistente agéntico (oct-2026) y la meta de automatización, el valor de la agencia se mueve hacia los *inputs* y las barreras de protección:
  - oferta y creativo diverso,
  - señales de CRM vía CAPI,
  - reglas de valor, exclusiones y aprobaciones.

### Gaps
- Las siguientes funciones **no se verificaron en esta sesión**. Por conocimiento previo creo que existen, pero **no deben usarse como hecho sin verificar**:
  - *Budget scheduling*, el gasto diario por encima del presupuesto (hasta 75%) y "budget sharing" entre ad sets en ABO.
  - El *flexible ad format*.
  - Los opt-ins por defecto de Advantage+ creative en 2025.
  - El comportamiento de "audience suggestions" en Advantage+ audience.
  - El "existing customer budget cap" de las antiguas ASC.
  - La fecha de lanzamiento de Opportunity Score.
- La eliminación de las ventanas *7-day view* y *28-day view* en la API (posiblemente enero de 2026) no se verificó.
- Un changelog de agencia (sep-2026) dice que Advantage+ pasó a ser el "starting state" de las campañas nuevas de Sales, Leads y App a inicios de septiembre de 2026, pero admite no haber encontrado un anuncio de Meta. Otra fuente afirma que Advantage+ Shopping "no fue retirado". Los nombres son confusos: CTC sigue hablando de "Advantage+ Shopping campaigns" en octubre de 2026, mientras Loomer reporta que ASC ya no se puede crear como tipo nuevo.
- No recuperé las declaraciones del call de Q2 2026 sobre lead ads o Business AI, ni las noticias de marzo y abril de 2026 sobre agentes de IA o "connectors" de Meta.

## 3. Moldes de estructura que recomiendan hoy los practicantes (recetas verificadas)

### Takeaway
Hay cinco familias de moldes con fuente verificable:
- **A.** Consolidado amplio (1 campaña, 1 ad set, N anuncios): Loomer y Foxwell; Meta lo respalda con Performance 5.
- **B.** Graduación "testing → validación → escalado" en ABO o CBO: Foxwell; también anécdotas de operadores.
- **C.** "Control + test" con Post IDs, hijo del 3:2:2: Tichenor; Ben Heath (Reino Unido).
- **D.** Arquitectura de 4 campañas Evergreen/Moment × Adquisición/Retención con ROAS mínimo: CTC.
- **E.** Sistema "smoke test" con regla de corte: Shackelford.

Cost cap y bid cap, retargeting separado y divisiones por geografía tienen apoyo parcial y posturas en conflicto. Ningún molde con fuente verificada es específico de lead gen; casi todos vienen de ecommerce y hay que adaptarlos (ver la sección 6 y las *Inferences*).

### Cited Findings

**Molde A: "Consolidado amplio" (1 campaña · 1 ad set · N anuncios diversos)**
- [PRÁCTICO-1] Jon Loomer (2026; su Master Brief es una instantánea de julio de 2026, solo para miembros, así que solo vi extractos) — [Loomer, The Master Brief](https://www.jonloomer.com/meta-ads-master-brief/); [Loomer, Ad Brief Example: Simplified Campaign Construction](https://www.jonloomer.com/ad-brief-example-simplified-campaign-construction/); [Loomer, The Modern Approach to Meta Advertising Strategy](https://www.jonloomer.com/meta-advertising-strategy/):
  - **Punto de partida:** una campaña con un solo ad set, optimizada a una conversión.
  - **Por qué no dividir:** "Every extra campaign and ad set waters down your budget. In a vacuum, $100 in one ad set is more efficient than $100 split across five."
  - **Cuándo sí dividir:** solo con razones legítimas, y solo si cada parte se puede financiar bien:
    - metas de negocio distintas (por ejemplo, leads vs ventas),
    - productos o ubicaciones separadas,
    - productos de temporada.
  - "In most cases, you can get by with only a single ad set."
- [PRÁCTICO-1] Loomer sobre audiencias: "Do not create separate ad sets based on different detailed targeting inputs. You're only creating multiple ad sets that have the capability of reaching all of the same people." — [Loomer, A Guide to Meta Ads Targeting in 2026](https://www.jonloomer.com/meta-ads-targeting-2026/)
- [PRÁCTICO-1] Loomer sobre anuncios — [Loomer, A Standard Approach for Meta Ad Creation](https://www.jonloomer.com/standard-meta-ad-creation/); [Loomer, How Many Ads is Too Many?](https://www.jonloomer.com/qvt/how-many-ads-is-too-many/); [Loomer, The Truth About Meta Andromeda and Ad Retrieval](https://www.jonloomer.com/meta-andromeda-ad-retrieval/):
  - No fija un número de anuncios; una de sus guías sugiere cinco opciones de texto principal y cinco de titular por anuncio (no pude aislar en cuál de sus páginas).
  - Sugiere ir más allá del mínimo de 2 o 3 anuncios.
  - Ha tenido "an ad set with 50 ads in it", pero advierte "you're not guaranteed results by creating 50".
  - Más adelante reporta que probar 25 y 50 anuncios por ad set no mostró ventaja clara; ahora prioriza la diversidad a menor escala.
- [PRÁCTICO-1] Loomer, "I Was Wrong" (abr-2026): dejó de construir ad sets extra al abandonar sus viejas creencias sobre segmentación, y acepta ceder el control de placements y de las combinaciones creativas. — [Loomer, I Was Wrong: How My Approach to Meta Ads Changed](https://www.jonloomer.com/meta-ads-approach-changed/)
- [PRÁCTICO-1] Foxwell coincide: hay una tendencia a "fewer campaigns with fewer - oftentimes one - broad ad sets". — [Foxwell Digital](https://www.foxwelldigital.com/blog/how-andromeda-has-changed-meta-advertising-a-practical-guide)
- [META] Respaldo oficial: Performance 5 pide "simplify account structure and put ad creative in one central campaign". — [The Keyword](https://thekeyword.beehiiv.com/p/performance-five-meta); [Tiger Pistol](https://tigerpistol.com/metas-performance-5-framework-the-impact-of-simplifying-your-account-structure)
- Receta según lo recuperado:

  | Campo | Valor |
  |---|---|
  | Objetivo | De conversión (Sales o Leads) |
  | Presupuesto | Advantage+ campaign budget |
  | Audiencia | Advantage+ audience, sin ad sets por intereses ni lookalikes |
  | Placements | Advantage+ |
  | Anuncios | Varios, diversos, con 5 textos y 5 titulares cada uno |
  | Puja, atribución y reglas de corte | Las fuentes recuperadas no lo especifican |

**Molde B: "Testing → validación → escalado" (graduación)**
- [PRÁCTICO-1] Foxwell Digital (2026): las fuentes no aclaran si se reutilizan Post IDs. — [Foxwell, Creative Testing Frameworks Winning in 2026](https://www.foxwelldigital.com/blog/the-meta-creative-testing-frameworks-top-brands-use-in-2026); [Foxwell, How to Test Creatives on Meta in 2026](https://www.foxwelldigital.com/blog/how-to-test-creatives-on-meta-in-2026-the-ultimate-guide-for-brands-and-media-buyers); [Foxwell, Systematic Growth / Scaling Frameworks](https://www.foxwelldigital.com/blog/how-to-create-systematic-growth-frameworks-on-meta-for-confident-scaling)
  - **Variante ABO:**
    - Campaña de testing separada; cada concepto nuevo va en su propio ad set con presupuesto fijo.
    - Se prueban de 1 a 10 conceptos a la vez, según el presupuesto.
    - Escalado "in place": se sube el presupuesto del ad set ganador "20-30% increases every few days if performance holds".
  - **Variante CBO con gasto mínimo por ad set:** "usually around 10% of total campaign budget per ad set if testing 4-5 concepts".
  - **Variante "sink-or-swim":** se prueba dentro de las campañas principales con "around 10-20 active ads per ad set", pausando los peores para hacer lugar.
- [PRÁCTICO-1] Foxwell, capa de validación (post de julio de 2026): las fuentes recuperadas no especifican puja ni atribución. — [Foxwell, The Performance Marketer's Guide to Testing, Validating and Scaling](https://www.foxwelldigital.com/blog/the-performance-marketers-guide-to-testing-validating-and-scaling)
  1. Testing en ABO a unos $30/día.
  2. Solo los mejores pasan a una campaña de validación, que suele llevar el 20% del presupuesto principal.
  3. De ahí escalan a ASC (Advantage+ Sales).
- [PRÁCTICO-1] Foxwell, Q3 2026: su comunidad está dividida. Unos corren CBO por defecto; a otros les va mejor ABO para testing y CBO para escalar. — [Foxwell, The 9 Most Pressing Meta Ad Topics for Q3 2026](https://www.foxwelldigital.com/blog/the-9-most-pressing-topics-for-meta-advertisers-in-q3-2026)
- [ANÉCDOTA] Camm (@cjfeth), X, 7-mar-2026: "Testing campaign: ABO / Each ad set = one new concept / $100/day budget per ad set to start / Why test in ABO? I want a spend on everything." — [X @cjfeth](https://x.com/cjfeth/status/2030349999473864912)
- [ANÉCDOTA, afirmación NO VERIFICADA] Ryan Clogg, X, 2-may-2025: "Start with ABO creative testing / 1 ad per ad set = isolate variable / Scale winning Post IDs into CBO". Afirma que "Preheating creatives is now Meta-confirmed best practice"; no encontré confirmación de Meta. — [X @RyanClogg](https://x.com/RyanClogg/status/1918371223081500780)
- [ANÉCDOTA] Otro anunciante, sin fecha clara, describe la cadena ABO (~$50/día por creativo) → CBO con más presupuesto → campaña con bid cap y presupuesto alto. — (resumen del buscador sobre posts de X; fuente exacta no aislada; ver [X @williamkast_](https://x.com/williamkast_/status/1759547194632274227) como ejemplo del debate, de 2024 [PRE-2025])
- [PRÁCTICO-1, contrapunto] Shackelford (29-sep-2025): meter todos los ganadores en un ad set "used to work a lot better than it does now". — [X @iamshackelford](https://x.com/iamshackelford/status/1972655631585996919)

**Molde C: "Control + test" en campaña única (linaje del 3:2:2)**
- [PRÁCTICO-1, PRE-2025] Charley Tichenor IV, "Inside the Structure of the 1 Campaign Ad Account" (LinkedIn, 3-feb-2023): un ad set de control guarda los Post IDs de los 4 a 6 mejores anuncios; el testing va en CBO y solo con segmentación *broad*. — [LinkedIn Tichenor](https://mk.linkedin.com/posts/charleytichenoriv_inside-the-structure-of-the-1-campaign-ad-activity-7027324894770061313-uFdD)
- [PRÁCTICO-1, PRE-2025] El método 3:2:2 usa Dynamic Creative en una campaña broad con 3 creativos × 2 titulares × 2 textos principales, es decir 12 combinaciones. — [YouTube, From Zero to Hero: Building the 3:2:2 Method](https://www.youtube.com/watch?v=3MY7kEVwuoo); [LinkedIn, dic-2023](https://www.linkedin.com/posts/faizan-akhtar963_charles-tichenor-ivs-322-method-will-activity-7142548524499464192-Kdgh)
- [PRÁCTICO-2] Revisión de Tichenor para la era Andromeda, según Aimerce (un vendor) en 2025. Aimerce fecha Andromeda en julio de 2024, lo que choca con la fecha de Meta. — [Aimerce, Charley T's Meta Andromeda Breakdown (2025)](https://www.aimerce.ai/topics/charley-t-meta-andromeda-breakdown-47)
  - Una campaña de control con un ad set de ganadores probados.
  - Además, 1 o 2 ad sets con Dynamic Creative o anuncios 3-2-2.
  - Solo segmentación *broad*.
  - Enfoque "Olympic Ring": 5 a 6 conceptos complementarios (3 arriba y 2 abajo, interconectados) en distintos formatos.
  - Probar variables contra controles probados, en lugar de que todo sea variable.
- [PRÁCTICO-2, NO-EE. UU. (Reino Unido)] Ben Heath, según un resumen de septiembre de 2026 — [What Marketing Works, sep-2026](https://whatmarketingworks.com/september-2026-meta-ads-in-late-2026-partnership-ads-ai-creative-workflows-and-the-strategy-shifts-driving-scale/):
  - "one CBO campaign with a control ad set containing proven winners, plus one or two test ad sets running new creative".
  - El viejo límite de unos 6 creativos ya no aplica: "you can now run 20, 30, or 50+ creatives simultaneously with diversified formats".
- [VENDOR] Ojo, el nombre "3-2-2" tiene otras variantes que no son de Tichenor — [SaaS Hero, ago-2026](https://saashero.net/design/b2b-saas-ad-testing-frameworks/); [Madgicx](https://madgicx.com/blog/graphic-design-ad):
  - SaaS Hero (B2B, 29-ago-2026): 3 hooks × 2 formatos × 2 CTAs.
  - Madgicx: un 3-2-2 que empieza con "Test 3 Radically Different Creatives".

**Molde D: CTC, cuatro campañas (Evergreen / Marketing Moment × Adquisición / Retención)**
- [PRÁCTICO-1] La metodología de Common Thread Collective: "every Meta account they manage contains four core campaigns". Se construyen cruzando dos dimensiones — [CTC, Meta Advertising Methodology](https://commonthreadco.com/pages/methodology-meta):
  - Tipo de contenido: Evergreen vs Marketing Moment.
  - Estatus del cliente: Adquisición (ACQ) vs Retención (RTN).
  - Evergreen ACQ y Evergreen RTN son espejo: mismo creativo y mismo orden de llenado. RTN usa un ROAS objetivo más bajo.
  - Los ad sets de Marketing Moment tienen fechas duras de inicio y fin, según el calendario de marketing.
  - Los ad sets Evergreen se llenan de forma secuencial hasta un máximo de 50 anuncios por ad set.
- [PRÁCTICO-1] Detalles de configuración del podcast "How Meta Actually Works in 2026" — [CTC, How Meta Actually Works in 2026](https://commonthreadco.com/blogs/ecommerce-playbook/how-meta-actually-works-in-2026):
  - Objetivo: Sales, con *value optimization* y ROAS mínimo como objetivo.
  - Presupuesto: Advantage+ Sales o CBO.
  - Audiencia: *broad*, con exclusiones adquisición vs retención.
  - "La inteligencia ahora está en la capa creativa", no en la definición de audiencia.
  - Conflicto: el VP de Paid Media de CTC menciona un límite de 150 anuncios, frente a los 50 de la página de metodología.
- [PRÁCTICO-1] Datos de incrementalidad de CTC: mediana de iROAS de 0.60 en Retención Meta ("6% incrementality") contra 1.14 en Adquisición Meta ("63% incrementality"). Por eso fijan objetivos distintos por campaña. — [CTC, Meta Advertising Methodology](https://commonthreadco.com/pages/methodology-meta)
- [PRÁCTICO-1] Principios de CTC sobre controles de costo — [CTC, Cost Controls & Andromeda (2025)](https://commonthreadco.com/blogs/sharpen-your-skills/facebook-ads-cost-controls-andromeda-2025):
  - Un solo CPA o ROAS esperado por campaña.
  - Si el objetivo es distinto (por ejemplo retención vs adquisición), va en una campaña separada.
  - Una vez fijada la puja, el presupuesto puede ir "sin tope" y es la puja la que limita el volumen.
  - Con un control de costo activo, no se mejora el retorno moviendo puja y presupuesto: hay que sumar volumen creativo, formatos y ofertas.
- [PRÁCTICO-1, contradicción interna] En un video de marzo de 2025, CTC argumenta que Andromeda vuelve menos útiles los bid caps y que conviene dejar de depender de ellos. A la vez, su metodología usa ROAS mínimo. — [CTC, Cost Controls & Andromeda](https://commonthreadco.com/blogs/sharpen-your-skills/facebook-ads-cost-controls-andromeda-2025)
- [PRÁCTICO-1] Taylor Holiday firma un post con recomendaciones generales, sin estructura concreta. — [CTC, Meta's Andromeda: How AI Innovation is Reshaping Ecommerce Advertising](https://commonthreadco.com/blogs/coachs-corner/meta-andromeda-ai-innovation-reshapes-ecommerce-advertising)
  - Refrescar y aumentar los activos creativos de forma constante.
  - Considerar *profit optimization* e *incremental optimization*.

**Molde E: Shackelford, "smoke test" / Ad Testing Engine**
- [PRÁCTICO-1, página de venta] Nick Shackelford (Structured; según la descripción de un podcast, socio de BRĒZ), en su "Ad Testing Engine" gratuito — [Foundr, Ad Testing Engine](https://foundr.com/pages/ad-testing):
  - Cadencia mensual: 12 conceptos, 24 variaciones, ~4 ganadores.
  - Presupuesto: 30% para testing y 70% para escalar ganadores.
  - Regla de corte: pausar al llegar a $45 de gasto con 0 conversiones (ecommerce).
- [PRÁCTICO-1, página de venta] Su workshop de 2026 lista estos temas; solo se ven los títulos, no el contenido. — [Foundr, Meta Ads Ecommerce Profitability Workshop 2026](https://foundr.com/pages/fom-workshop)
  - "Why Testing More Ads Usually Makes Your Performance Worse": el "slow chew" que confunde al algoritmo.
  - El sistema creativo "smoke test" y la estructura de cuenta que usa su equipo.
  - La "70% rule" para detectar el *message-market fit*.
- [PRÁCTICO-1] Foundr Podcast, episodio 635 (27-feb-2026), "$76M in 3 Years: The Meta Ads System Working in 2026": cubre cómo Andromeda, Lattice y GEM cambiaron la estructura y por qué probar más anuncios puede destruir el desempeño. Solo recuperé la descripción. — [Apple Podcasts, ep. 635](https://podcasts.apple.com/ph/podcast/635-the-meta-ads-system-working-in-2026-nick-shackelford/id944627155?i=1000751916670)
- [PRÁCTICO-1, PRE-2025, obsoleto] LinkedIn, 26-sep-2023: probar solo creativo y no audiencias, con unos 3 ad sets (1 broad, 1 lookalike de compradores, 1 grupo de intereses). — [LinkedIn Shackelford](https://www.linkedin.com/posts/nickshackelford_biggest-objections-to-facebook-ads-i-hear-activity-7112563999090626560-RVYB)

**Moldes con apoyo parcial o en disputa**
- **Cost cap y bid cap:**
  - CTC usa una puja por campaña con presupuesto sin tope, pero también dice que Andromeda debilita los bid caps (ver Molde D).
  - [PRÁCTICO-2] Plofker vinculó la adopción masiva de cost caps con una caída del desempeño en top of funnel. Fecha del post no confirmada; el resumen viene de una búsqueda en X/LinkedIn — [X @codyplof](https://x.com/codyplof/status/1883218947438530784) (post de contexto, 25-ene-2025).
  - [PRE-2025] Cody Wittick (otra persona, no Plofker) publicó en noviembre de 2023 un "crash course" sobre cost controls en ASC. — [LinkedIn Wittick](https://www.linkedin.com/posts/codywittick_asc-cost-controls-crash-course-here-activity-7134946065895616512-ZKnV)
- **Retargeting separado o no:**
  - [PRÁCTICO-1] Loomer (abr-2026): el remarketing fue el primer tema donde cambió de opinión. Se resistió a la segmentación algorítmica hasta que los *audience segments* le permitieron verificar qué hacía el algoritmo. — [Loomer, I Was Wrong](https://www.jonloomer.com/meta-ads-approach-changed/)
  - [PRÁCTICO-1, PRE-2025] Loomer (2024): "Advantage+ Audience almost always gives me the same or better results". — [Loomer, How to Test Meta Advertising Targeting Strategies](https://www.jonloomer.com/test-meta-advertising-targeting-strategies/)
  - CTC sí mantiene campañas RTN separadas, pero con objetivo más bajo por su baja incrementalidad (iROAS 0.60) — [CTC](https://commonthreadco.com/pages/methodology-meta).
  - En la prueba de incremental attribution, el retargeting fue de lo menos incremental — [Seer Interactive](https://www.seerinteractive.com/insights/we-tested-metas-new-incremental-attribution-setting-on-1m-in-ad-spend.-heres-how-it-works).
- **Divisiones por geografía, idioma u oferta:**
  - [PRÁCTICO-1] Loomer acepta separar por productos o ubicaciones solo si cada parte se financia bien. — [Loomer, Master Brief](https://www.jonloomer.com/meta-ads-master-brief/)
  - [VENDOR] "real differences in region, margin or offer still justify separation". — [Blck Alpaca](https://blckalpaca.at/en/knowledge-base/social-media/paid-social-performance-marketing/meta-andromeda-gem-advantage-plus)
  - [VENDOR] Separar solo por objetivos, mercados, economía u ofertas distintas, o por un experimento deliberado. — [AdAdvisor](https://adadvisor.ai/blog/ai-campaign-structure-optimization-meta-ads)
- **Dynamic Creative, Flexible format y Creative Testing tool:**
  - Tichenor usa Dynamic Creative en el 3:2:2 [PRE-2025].
  - Foxwell menciona los "Flex ads" de 2026 — [Foxwell](https://www.foxwelldigital.com/blog/the-meta-creative-testing-frameworks-top-brands-use-in-2026).
  - La herramienta de Creative Testing de Meta prueba de 2 a 5 anuncios dentro del ad set — [Loomer](https://www.jonloomer.com/meta-ads-master-brief/).

### Inferences
**Receta adaptada para Superleads.** Es una inferencia que combina las fuentes de arriba, *no* un molde publicado por ningún practicante.
- **Molde base (cliente con 1 oferta, 1 mercado y 1 CPL objetivo).**
  - 1 campaña de Leads con Advantage+ activo (campaign budget + audience + placements).
  - 1 ad set.
  - De 10 a 20 anuncios activos (rango "sink-or-swim" de Foxwell). Cada anuncio debe ser un concepto realmente distinto: persona, objeción, formato y creador o escenario (lógica de Loomer, Denney y CTC).
  - Cada anuncio con varias opciones de texto y titular (Loomer usa 5 y 5).
- **Testing.** Dos opciones:
  - La herramienta de Creative Testing dentro del ad set (2 a 5 anuncios).
  - Una campaña ABO de prueba con 1 concepto por ad set (Foxwell). Para fijar el presupuesto por concepto: (leads que necesitas para juzgar) × (CPL objetivo) ÷ (días de prueba). Las cifras de Foxwell ($30/día) y de Camm ($100/día) son de ecommerce y no se pueden trasladar tal cual.
- **Graduación.** Los ganadores pasan al ad set principal. Foxwell sugiere una validación previa con ~20% del presupuesto. Hay que decidir si se reutiliza el Post ID (para conservar la prueba social) o se duplica el anuncio; las fuentes no lo resuelven para la era Andromeda.
- **Cuándo abrir una campaña aparte (principio de CTC: un objetivo de costo por campaña).**
  - Cuando el CPL objetivo o la economía son distintos: otro servicio u otro ticket.
  - Cuando el mercado o idioma es distinto: otra ciudad o país.
  - Cuando el destino es distinto: instant form, web o WhatsApp.
  - Cuando el cliente es existente y no nuevo.
- **Retargeting.** No abrirlo por defecto. Se justifica solo si el volumen tibio es grande y el CRM muestra que esos leads cierran mejor (por las dudas de incrementalidad que plantean CTC y la prueba de agencia). Para sacar de prospección a clientes o leads ya captados, usar las audiencias "exclusion-only" (ago-2026).

### Gaps
- No encontré un molde publicado y verificable de **lead gen** de ningún practicante estadounidense de la lista; los moldes son de ecommerce.
- No hallé posturas recientes y verificables sobre:
  - reutilizar Post IDs frente a duplicar anuncios en la era Andromeda,
  - "existing customer budget caps",
  - "audience suggestions" en Advantage+ audience,
  - estructuras con bid cap y cost cap para leads.
- El contenido completo de las charlas y posts de Tichenor sobre Andromeda (por ejemplo, [YouTube, Mastering Andromeda](https://www.youtube.com/watch?v=mCwOJ27xyGM)) no se recuperó.

## 4. Qué recomienda hoy cada practicante (fecha y URL) y en qué no están de acuerdo

### Takeaway
Hay consenso en consolidar, usar segmentación *broad* y apostar por la diversidad creativa. No hay consenso en cinco puntos:
- ABO o CBO para testing.
- Cuánto volumen creativo hace falta.
- Si conviene meter los ganadores en un solo ad set.
- El valor de los cost caps y bid caps.
- Si tiene sentido un retargeting separado.

Las fuentes primarias de 2025-2026 son sólidas para Loomer, Foxwell, CTC, Shackelford y Denney, y débiles para Plofker, Piliero y Burd. Para Burd y Mandalia no encontré nada de 2025-2026.

### Cited Findings

**Jon Loomer (EE. UU., Jon Loomer Digital)**
- Abr-2026, "I Was Wrong". Cambió de opinión en cinco temas — [Loomer](https://www.jonloomer.com/meta-ads-approach-changed/):
  1. Remarketing.
  2. Control de segmentación: aceptó que detailed targeting y lookalikes ya no deben ser su foco.
  3. Foco en el anuncio: "better ads drive better performance".
  4. Complejidad: eliminó los ad sets extra.
  5. Control: cede placements y combinaciones creativas porque Meta tiene más datos.
- 2026: 1 campaña y 1 ad set como punto de partida; nada de ad sets por detailed targeting. — [Loomer, Master Brief](https://www.jonloomer.com/meta-ads-master-brief/); [Loomer, Targeting 2026](https://www.jonloomer.com/meta-ads-targeting-2026/)
- Sobre número de anuncios y Andromeda: "more about capabilities than requirements"; con 25 o 50 anuncios no vio ventaja. — [Loomer, Truth About Andromeda](https://www.jonloomer.com/meta-andromeda-ad-retrieval/)
- "Don't Do What I Did" (fecha no confirmada): dice que no abrazó la evolución de Meta hacia la automatización y ahora pide simplificar. — [Loomer](https://www.jonloomer.com/qvt/dont-do-what-i-did/)

**Andrew Foxwell / Foxwell Digital (EE. UU.)**
- 2026: tres variantes de testing (ABO dedicado, CBO con mínimos y "sink-or-swim" con 10 a 20 anuncios por ad set), una capa de validación (jul-2026) y escalado de 20-30% cada pocos días. Detalle en el Molde B. — [Foxwell, Testing Frameworks 2026](https://www.foxwelldigital.com/blog/the-meta-creative-testing-frameworks-top-brands-use-in-2026); [Foxwell, Testing/Validating/Scaling](https://www.foxwelldigital.com/blog/the-performance-marketers-guide-to-testing-validating-and-scaling)
- Q3 2026: su comunidad está dividida entre CBO por defecto y ABO para testear + CBO para escalar. — [Foxwell, Q3 2026](https://www.foxwelldigital.com/blog/the-9-most-pressing-topics-for-meta-advertisers-in-q3-2026)
- [PRÁCTICO-2, NO VERIFICADO] Un artículo en Medium le atribuye que "teams now need 50–100 structurally distinct concepts per month to get 10 ads into meaningful delivery". — [Medium](https://medium.com/@tentenco/meta-ads-strategy-2026-why-andromeda-gem-and-ios-26-broke-the-old-playbook-78cba1ad4820)

**Nick Shackelford (EE. UU., Structured)**
- 29-sep-2025: el viejo método de juntar ganadores en un ad set rinde menos que antes. — [X](https://x.com/iamshackelford/status/1972655631585996919)
- 27-feb-2026: Foundr Podcast, episodio 635. — [Apple Podcasts](https://podcasts.apple.com/ph/podcast/635-the-meta-ads-system-working-in-2026-nick-shackelford/id944627155?i=1000751916670)
- 2026: Ad Testing Engine (12 conceptos, 24 variaciones y ~4 ganadores al mes; 30/70; corte a $45 con 0 conversiones), "smoke test" y una advertencia contra probar demasiados anuncios. — [Foundr](https://foundr.com/pages/ad-testing); [Foundr workshop](https://foundr.com/pages/fom-workshop)
- No verifiqué en esta sesión su vínculo con Konstant Kreative.

**Charley Tichenor IV (EE. UU.)**
- 2023 [PRE-2025]: el 3:2:2 y la cuenta de "1 campaña" con un ad set de control. — [LinkedIn 3-feb-2023](https://mk.linkedin.com/posts/charleytichenoriv_inside-the-structure-of-the-1-campaign-ad-activity-7027324894770061313-uFdD)
- 2025: revisión para la era Andromeda (conceptos "Olympic Ring", control contra variables) y su frase "Andromeda killed 'launch more creatives'". — [Aimerce](https://www.aimerce.ai/topics/charley-t-meta-andromeda-breakdown-47); [LinkedIn](https://www.linkedin.com/in/charleytichenoriv/)

**Taylor Holiday / Common Thread Collective (EE. UU.)**
- 2025-2026: las 4 campañas Evergreen/Moment × ACQ/RTN; Sales con value optimization y ROAS mínimo; Advantage+ Sales o CBO; *broad* con exclusiones; hasta 50 anuncios por ad set (o 150, según el podcast). — [CTC Methodology](https://commonthreadco.com/pages/methodology-meta); [CTC Podcast 2026](https://commonthreadco.com/blogs/ecommerce-playbook/how-meta-actually-works-in-2026)
- Changelog de 2026, actualizado cada semana. — [CTC, Every Meta Ads Change in 2026](https://commonthreadco.com/blogs/coachs-corner/meta-ads-changes-2026)
- Hay una pieza de CTC titulada "What 53,000 Ads Reveal About Meta's Andromeda Algorithm", pero no recuperé su contenido. — [CTC](https://commonthreadco.com/blogs/ecommerce-playbook/ads-reveal-metas-andromeda-algorithm)

**Cody Plofker (EE. UU., CEO de Jones Road Beauty)**
- 25-ene-2025: "Exclusions just don't work". Anunció un empuje hacia influencers y otros canales de top of funnel. — [X](https://x.com/codyplof/status/1883218947438530784)
- [PRÁCTICO-2] Un resumen de newsletter (sin fecha) dice que, para él, la diversidad creativa es "a variety of concepts and styles to the point where your ads almost don't look like they're from the same brand". También es cauto con el creativo generado por IA de Meta. — [Funnel Vision #012](https://funnel-vision.beehiiv.com/p/funnel-vision-issue-012)
- [PRE-2025] 12-nov-2022: todo en un CBO con ad sets separados por ángulo. 19-feb-2023: "ASC is back to crushing it". Mantiene los mismos 2 o 3 conceptos como anuncios top y solo cambia los hooks. — [X 2022](https://x.com/codyplof/status/1591441388289150976); [X 2023](https://x.com/codyplof/status/1627336629047250944)
- No confundir con Cody Wittick: el límite de "150 ads per campaign" en ASC (LinkedIn, 2-ene-2024 [PRE-2025]) es de Wittick. — [LinkedIn Wittick](https://www.linkedin.com/posts/codywittick_asc-limits-you-to-150-ads-per-campaign-activity-7148058879900147713-ZKnV)

**Barry Hott (EE. UU.)**
- 14-jul-2026: "Everyone says CBO dumps your budget into just one or two ads. I keep hearing it, but something about how I do my media buying seems to... not do that." El buscador le atribuye además decir que hoy es "mostly a CBO maxi". — [X @binghott](https://x.com/binghott/status/2076833494454407549)
- En otro post (posiblemente del 27-feb-2026; la atribución exacta no es segura) argumenta que Meta debe repartir el presupuesto entre anuncios y que el anunciante debe enfocarse en la calidad creativa. — [X @binghott](https://x.com/binghott/status/2027378488299098466)
- [PRÁCTICO-2, NO VERIFICADO] Superscale le atribuye la defensa del ABO para testing en un texto de rebootiq.com, lo que choca con sus posts recientes. — [Superscale](https://superscale.ai/learn/cbo-vs-abo-advantage-plus/); [RebootIQ](https://rebootiq.com/abo-vs-cbo-meta-ads/)
- [PRE-2025] Creador de la idea de "ugly ads": "If your marketing is too pretty, it's probably not going to work on paid social". — [LinkedIn de Dara Denney, 19-dic-2023](https://www.linkedin.com/posts/daradenney_meta-ads-creative-hack-make-ugly-ads-with-activity-7142923930847100928-Nrbc)

**Dara Denney (EE. UU.)**
- 10-feb-2026: "Creative testing is NOT about how you structure your tests in Ads Manager. It's more about how you approach your overall strategy." — [X](https://x.com/DenneyDara/status/2021272764653490602)
  - Errores que ve: quedarse en "rapid format testing" y copiar criterios de la competencia, como el tiempo que llevan corriendo sus anuncios.
- 22-dic-2025: Andromeda y GEM reducen los candidatos y agrupan por persona. — [X](https://x.com/DenneyDara/status/2003141118590898591)
- Otras posturas, según su perfil en Motion y sus posts — [Motion, perfil de Dara Denney](https://motionapp.com/library/expert/dara-denney/):
  - La estructura de cuenta "a lot less important".
  - Planear por trimestre, hacer roadmap mensual y producir cada semana.
  - En un video antiguo: más o menos una prueba creativa adicional por semana por cada $25K/mes adicionales de inversión.
- [VENDOR, NO VERIFICADO] Baker le atribuye una "arquitectura de tres etapas" con niveles de presupuesto, sin fuente verificable. — [Baker](https://withbaker.com/blog/meta-ads-campaign-structure-budget-setup)

**Sam Piliero (EE. UU., The Moonlighters)**
- Es fundador y CEO de The Moonlighters y viene de VaynerMedia. Su canal dice que manejan más de $10M en inversión para más de 100 marcas DTC. — [YouTube @SamPiliero](https://www.youtube.com/@SamPiliero)
- 15-abr-2025: "MAYBE scale isn't about budget. It's about finding new demand, not re-buying old buyers." — [X](https://x.com/SamPiliero/status/1912142483682627855)
- Un curso "The Facebook Ads Blueprint" aparece listado el 13-jun-2026 en un sitio de terceros (posible reventa), sobre estructura para Andromeda. Su estructura concreta no es pública. — [UDCourse](https://udcourse.com/product/facebook-ads-blueprint-sam-piliero/)
- Charla de Moonlighters "Do THIS and the Meta Andromeda Algorithm Will LOVE You!": no recuperé su contenido. — [The Moonlighters](https://themoonlighters.com/how-to-combine-google-and-meta-ads-to-scale-from-1m-to-10m-sam-piliero-part-2/)

**Tim Burd (EE. UU., AdLeaks)**
- Solo encontré un artículo de mayo de 2020 sobre puja manual [PRE-2025, obsoleto]. — [AdLeaks](https://www.adleaks.com/best-facebook-ads-manual-bidding-strategies-explained-knowledge-bomb-3/)

**Ben Heath (NO-EE. UU., Reino Unido)**
- Esquema CBO con un ad set de control y 1 o 2 de test; de 20 a 50+ creativos; creadores pequeños desde unos $800 más producto. Viene de un resumen de terceros de septiembre de 2026. — [What Marketing Works](https://whatmarketingworks.com/september-2026-meta-ads-in-late-2026-partnership-ads-ai-creative-workflows-and-the-strategy-shifts-driving-scale/)

**Otros relevantes**
- Aaron Rovner (SaaS Hero, B2B): framework 3 hooks × 2 formatos × 2 CTAs (29-ago-2026) y una pieza sobre Andromeda para B2B. — [SaaS Hero](https://saashero.net/design/b2b-saas-ad-testing-frameworks/); [SaaS Hero, Andromeda B2B](https://www.saashero.net/strategy/meta-andromeda-b2b-facebook-ads/)
- Motion, plataforma de analítica creativa con charlas de practicantes: "10 Ads vs 100 Ads", "How Many Creatives Do You Actually Need to Launch? (2026)" y "One Winner, Many Formats". Las charlas no coinciden: una defiende sistemas de 50 a 100 anuncios al mes; otra dice que el sistema premia volumen y diversificación "as before". — [Motion, 10 vs 100](https://motionapp.com/library/talk/the-new-meta-ads-testing-strategy-10-ads-vs-100-ads/); [Motion, How Many Creatives 2026](https://motionapp.com/library/talk/meta-ads-in-2026-how-many-creatives-do-you-actually-need-to-launch/); [Motion, One Winner Many Formats](https://motionapp.com/library/talk/scaling-ugc-ads-post-andromeda-one-winner-many-formats/)

**Desacuerdos explícitos**
1. **ABO vs CBO para testing.**
   - A favor de ABO para testing: parte de la comunidad Foxwell, Camm y Ryan Clogg.
   - A favor de CBO: Tichenor (testing en CBO) y Hott ("CBO maxi" en 2026).
   - Foxwell reconoce que su comunidad está dividida.
   - — [Foxwell Q3 2026](https://www.foxwelldigital.com/blog/the-9-most-pressing-topics-for-meta-advertisers-in-q3-2026); [X @binghott](https://x.com/binghott/status/2076833494454407549); [X @cjfeth](https://x.com/cjfeth/status/2030349999473864912)
2. **Volumen creativo.**
   - Más volumen: Motion habla de 50 a 100 anuncios al mes; según Medium, Foxwell pide 50 a 100 conceptos al mes; Heath, de 20 a 50+ simultáneos.
   - Menos volumen: Loomer no vio ventaja con 25 o 50; Shackelford dice que probar más anuncios "usually makes performance worse"; Tichenor dice que Andromeda "killed 'launch more creatives'".
   - — [Motion](https://motionapp.com/library/talk/the-new-meta-ads-testing-strategy-10-ads-vs-100-ads/); [Loomer](https://www.jonloomer.com/meta-andromeda-ad-retrieval/); [Foundr](https://foundr.com/pages/fom-workshop)
3. **Ganadores en un solo ad set o control con Post IDs.** Tichenor (2023) y Heath lo usan; Shackelford (sep-2025) dice que rinde menos que antes. — [X @iamshackelford](https://x.com/iamshackelford/status/1972655631585996919)
4. **Controles de costo.** CTC usa ROAS mínimo y "puja por campaña", pero también dice que Andromeda debilita los bid caps. — [CTC](https://commonthreadco.com/blogs/sharpen-your-skills/facebook-ads-cost-controls-andromeda-2025)
5. **Retargeting.** CTC mantiene campañas RTN separadas con objetivo más bajo; Loomer migró a la segmentación algorítmica y verifica con audience segments. — [CTC](https://commonthreadco.com/pages/methodology-meta); [Loomer](https://www.jonloomer.com/meta-ads-approach-changed/)
6. **Peso de la estructura.** Denney la considera "a lot less important"; Foxwell y Shackelford la tratan como sistema central de testing. — [Motion/Denney](https://motionapp.com/library/expert/dara-denney/)

### Inferences
- **Los referentes de lead gen en EE. UU. son pocos.** Casi todos los practicantes de la lista son de ecommerce y DTC. Para Superleads, los que más se trasladan a lead gen son Loomer (cubre leads, Sequenced Events y destinos) y Foxwell (marcos de testing agnósticos al vertical). CTC sirve sobre todo por su principio de "un objetivo de costo por campaña" y por su forma de medir incrementalidad.
- **Andromeda no resolvió el debate ABO vs CBO; lo volvió más empírico.** La regla práctica que comparten varios es probar conceptos con gasto asegurado (ABO o CBO con mínimos) y escalar en una estructura consolidada.

### Gaps
- **Tim Burd:** no hallé contenido de 2025-2026.
- **Depesh Mandalia (Reino Unido):** no lo investigué; se agotó el presupuesto de búsqueda.
- **Cody Plofker:** no encontré su estructura actual en Jones Road, de 2025-2026.
- **Sam Piliero:** su estructura concreta está en un curso de pago.
- **Andrew Foxwell:** no encontré sus propios posts personales, solo el blog de la empresa.
- **Barry Hott:** la atribución de su postura sobre ABO para testing es dudosa.
- **Otros practicantes de lead gen en EE. UU.** (por ejemplo, Ralph Burns de Tier 11 / Perpetual Traffic): no los investigué.

## 5. Reglas de presupuesto y escalado (learning phase, presupuestos, escalado, anuncios por ad set, refresco, corte)

### Takeaway
Solo hay reglas numéricas con fuente para:
- el escalado de Foxwell (+20-30% cada pocos días),
- la validación con ~20% del presupuesto y el CBO con un mínimo de ~10% por ad set (Foxwell),
- el reparto 30/70 y el corte a $45 sin conversiones (Shackelford, ecommerce),
- el límite de 50 anuncios por ad set (CTC; un podcast de CTC dice 150),
- que Meta ya no recomienda máximo 6 anuncios.

La regla de unos 50 eventos por semana y la de "más de 20% de cambio reinicia el aprendizaje" solo aparecen en guías secundarias. La guía oficial de Meta no se pudo recuperar en esta sesión.

### Cited Findings
- **Learning phase**
  - [META vía partner] Meta recomienda no gastar más del 20% del presupuesto en learning phase (marco Performance 5). — [Tiger Pistol](https://tigerpistol.com/metas-performance-5-framework-the-impact-of-simplifying-your-account-structure)
  - [VENDOR, NO VERIFICADO contra Meta] Una guía de 2026 estima que el learning phase requiere "approximately 50 optimization events per ad set per week". También dice que cambiar el presupuesto de un ad set en más de 20% en un día reinicia el learning phase. No pude aislar cuál de las guías lo dice. — [AdStellar](https://www.adstellar.ai/blog/meta-ads-campaign-structure-guide); [Flighted](https://www.flighted.co/blog/meta-ads-best-practices)
- **Escalado vertical**
  - [PRÁCTICO-1] Foxwell: "20-30% increases every few days if performance holds" sobre el ad set ganador. — [Foxwell](https://www.foxwelldigital.com/blog/how-to-test-creatives-on-meta-in-2026-the-ultimate-guide-for-brands-and-media-buyers)
- **Reparto del presupuesto de testing**
  - [PRÁCTICO-1] Foxwell: la validación lleva ~20% del presupuesto principal y el testing ABO ~$30/día (julio de 2026). En CBO, un mínimo de ~10% del presupuesto de campaña por ad set si se prueban de 4 a 5 conceptos. — [Foxwell](https://www.foxwelldigital.com/blog/the-performance-marketers-guide-to-testing-validating-and-scaling); [Foxwell](https://www.foxwelldigital.com/blog/the-meta-creative-testing-frameworks-top-brands-use-in-2026)
  - [PRÁCTICO-1] Shackelford: 30% testing y 70% escalar ganadores; 12 conceptos y 24 variaciones al mes, con ~4 ganadores. — [Foundr](https://foundr.com/pages/ad-testing)
  - [ANÉCDOTA] Kanish, X, 11-feb-2026: lo que importa es cómo se reparte el presupuesto entre testing y empujar ganadores. Muchas marcas estancadas "test a lot of creatives" sin esa distribución. — [X @KanishDigital](https://x.com/KanishDigital/status/2021472015387963487)
- **Consolidación del presupuesto**
  - [PRÁCTICO-1] Loomer: "$100 in one ad set is more efficient than $100 split across five". — [Loomer](https://www.jonloomer.com/meta-ads-master-brief/)
- **Presupuesto con control de costo**
  - [PRÁCTICO-1] CTC: con bid o cost control, el presupuesto puede quedar sin tope y es la puja la que limita el volumen. — [CTC](https://commonthreadco.com/blogs/sharpen-your-skills/facebook-ads-cost-controls-andromeda-2025)
- **Escalado horizontal y "nueva demanda"**
  - [PRÁCTICO-1] Piliero (15-abr-2025): "scale isn't about budget. It's about finding new demand". — [X](https://x.com/SamPiliero/status/1912142483682627855)
  - CTC escala de forma horizontal con ad sets por "Marketing Moment" con fechas duras. — [CTC](https://commonthreadco.com/pages/methodology-meta)
- **Anuncios por ad set**
  - [PRÁCTICO-1] La guía de Meta de máximo 6 anuncios desapareció ("February", presumiblemente 2025). — [Loomer](https://www.jonloomer.com/qvt/how-many-ads-is-too-many/)
  - CTC llena hasta 50 por ad set; su podcast menciona un límite de 150. — [CTC](https://commonthreadco.com/pages/methodology-meta); [CTC Podcast](https://commonthreadco.com/blogs/ecommerce-playbook/how-meta-actually-works-in-2026)
  - Foxwell: de 10 a 20 activos en "sink-or-swim". — [Foxwell](https://www.foxwelldigital.com/blog/the-meta-creative-testing-frameworks-top-brands-use-in-2026)
  - [PRE-2025] El límite de 150 anuncios por campaña ASC viene de Wittick (2024). — [LinkedIn](https://www.linkedin.com/posts/codywittick_asc-limits-you-to-150-ads-per-campaign-activity-7148058879900147713-ZKnV)
  - [VENDOR] Prácticas citadas por terceros: de 10 a 50 creativos por ad set y de 5 a 10 anuncios nuevos por semana en cuentas top. — [Pipeboard](https://pipeboard.co/guides/creative-volume-andromeda); [Dataslayer](https://www.dataslayer.ai/blog/meta-ads-changes-2025-83-updates-that-changed-facebook-advertising-forever)
- **Cadencia de refresco creativo**
  - [PRÁCTICO-1] Denney: más o menos 1 prueba adicional por semana por cada $25K/mes adicionales (video antiguo, fecha no confirmada). — [Motion/Denney](https://motionapp.com/library/expert/dara-denney/)
  - Shackelford: 12 conceptos al mes. — [Foundr](https://foundr.com/pages/ad-testing)
  - [VENDOR] Una herramienta recomienda, con $10K/día o más, refrescar cada semana con 4 a 6 conceptos nuevos. — [AdAdvisor](https://adadvisor.ai/docs/skills/adadvisor-creative)
  - [VENDOR] Otra guía de 2026 recomienda refrescar cada 7 a 14 días. — [AdStellar](https://www.adstellar.ai/blog/meta-ads-campaign-structure-guide); [Flighted](https://www.flighted.co/blog/meta-ads-best-practices) (fuente exacta no aislada)
- **Regla de corte**
  - [PRÁCTICO-1] Shackelford: $45 de gasto con 0 conversiones, en ecommerce. — [Foundr](https://foundr.com/pages/ad-testing)

### Inferences
- **Regla de corte para lead gen.** No hay una con fuente; la más concreta es la de Shackelford, de ecommerce. Para leads conviene expresarla como un múltiplo del CPL objetivo del cliente, calibrado con su histórico. La regla popular de "2 a 3 veces el CPA" no se pudo verificar en esta sesión; ver *Gaps*.
- **Presupuesto mínimo por ad set.** Si se adopta la regla secundaria de unos 50 eventos por semana: presupuesto diario mínimo por ad set ≈ 50 × CPL ÷ 7. Para optimizar a un evento profundo como "lead calificado", el volumen exigido se multiplica; esa es otra razón para consolidar en 1 ad set.
- **Escalado sin reiniciar el aprendizaje.** Escalar en escalones de 20-30% cada pocos días (Foxwell) es coherente con la regla secundaria de "más de 20% al día reinicia el aprendizaje". Se puede usar como regla interna de la agencia, sin presentarla como regla oficial de Meta.

### Gaps
- **No se recuperó en esta sesión:** el texto oficial de Meta sobre learning phase (umbral de eventos, ventana de 7 días, "significant edits") y sus recomendaciones sobre cuánto subir el presupuesto. Por conocimiento previo, la página "About the learning phase" del Business Help Center habla de unos 50 eventos de optimización en 7 días tras la última edición significativa. **No está verificado aquí.**
- **No hallé fuente:**
  - los presupuestos mínimos oficiales por moneda,
  - el límite oficial actual de anuncios por ad set (50 vs 150),
  - una regla de corte del tipo "2 a 3 veces el CPA objetivo" atribuible a un practicante concreto de 2025-2026.

## 6. Setups específicos de generación de leads (Advantage+ leads, leads calificados con CRM + CAPI, destinos, valor)

### Takeaway
Para lead gen hay tres piezas con fuente:
- **Advantage+ por defecto en Leads** (desde 2025), con "10% lower cost per qualified lead" en pruebas tempranas de Meta.
- **Optimización a leads calificados** con eventos de CRM vía Conversions API. Antes solo existía para instant forms.
- **"Sequenced Events"** (en prueba en 2026, sin documentación oficial): permite optimizar leads *de sitio web* hacia un evento posterior de mayor valor.

La elección del destino (instant form, web, mensajería o llamadas) y la optimización por valor de lead no tienen guía oficial recuperada en esta sesión.

### Cited Findings
- [PRENSA] Meta agregó Advantage+ leads campaigns. En pruebas tempranas, "10% lower cost per qualified lead" frente a campañas sin esas funciones de IA. — [Search Engine Land](https://searchengineland.com/meta-advantage-campaign-setup-leads-campaigns-451713)
- [PRÁCTICO-1] Desde febrero de 2025, el objetivo Leads arranca con Advantage+ activado (presupuesto, audiencia y placements Advantage+). Si sobreescribes los defaults, Advantage+ se apaga. — [Loomer](https://www.jonloomer.com/advantage-plus-sales-app-leads-campaigns/)
- [PRÁCTICO-1] Sequenced Events, según Loomer (2026; el post no da fecha exacta en lo que vi) — [Loomer, Meta Sequenced Events: Optimize for Qualified Website Leads](https://www.jonloomer.com/meta-sequenced-events/):
  - Permite "optimize for a higher-value action that follows an initial event".
  - Configuración: campaña de **Leads** con conversion location **Website**.
  - Optimizar a leads calificados no es nuevo, pero antes solo aplicaba a instant forms y exigía enviar eventos del CRM.
  - "There still doesn't appear to be any official documentation on Sequenced Events", así que podría seguir en prueba.
  - Pregunta abierta: si aplica la ventana de 7 días de los website leads. Si se extendiera, sería "an enormously valuable upgrade".
- [PRÁCTICO-1] Primer reporte del test, en instant forms: el anuncio recibe crédito solo si ambos eventos ocurren en el orden definido. Meta probó en paralelo "Preferred Lead Answers" para la calidad del lead; no recuperé los detalles. — [Loomer, Meta Tests Sequenced Events and Preferred Lead Answers](https://www.jonloomer.com/meta-tests-sequenced-events-preferred-lead-answers/)
- [VENDOR, publicado por Make] TripleTen enviaba señales de lead calificado del CRM a Meta (Conversions API for CRM) y reporta costos de adquisición menores que con eventos de lead estándar. — [Make, caso TripleTen](https://www.make.com/en/success-stories/make-helps-tripleten-process-crm-events-with-meta-conversions-api-for-crm)
- [META vía agencias] Desde marzo de 2026, el click-to-call cuenta como link click para atribución, y el resto de la interacción va a "engage-through". — [AdsUploader](https://adsuploader.com/blog/meta-click-attribution); [Acadia](https://acadia.io/2026-meta-attribution-update)
- [PRÁCTICO-1 / VENDOR] Customer Lifecycle Strategy (nuevos vs existentes) es solo para campañas manuales de Sales; no aplica a Leads. — [EasyInsights](https://easyinsights.ai/blog/metas-customer-lifecycle-strategy-the-small-setting-that-changes-everything/)
- [VENDOR] Elección del evento de optimización: una marca DTC optimiza a compras, mientras que B2B SaaS optimiza a demos o trials más un evento de lead calificado. — [AdStellar](https://www.adstellar.ai/blog/meta-ads-campaign-structure-guide) (fuente exacta no aislada entre las guías del mismo resultado)
- [VENDOR] Las guías de lead gen 2026 recomiendan optimizar a leads calificados, no a volumen bruto, y devolver al algoritmo la calidad posterior del lead. — [AdLibrary, Meta Ads for Lead Generation 2026](https://adlibrary.com/posts/meta-ads-for-lead-generation)
- [PRÁCTICO-2, NO-EE. UU.] El esquema de Ben Heath (CBO con un ad set de control y 1 o 2 de test) es el único molde de un referente de lead gen que encontré, y viene vía un tercero. — [What Marketing Works](https://whatmarketingworks.com/september-2026-meta-ads-in-late-2026-partnership-ads-ai-creative-workflows-and-the-strategy-shifts-driving-scale/)
- [VENDOR, choca con el consenso] Una guía india propone repartir 50% prospección, 30% consideración y 20% retargeting. Esto contradice la consolidación que piden Loomer, Foxwell y Meta (Performance 5). — [ProjectSupply](https://projectsupply.in/blog/meta-ads-lead-generation-strategy-2026)
- [PRÁCTICO-1] Loomer tiene más piezas de lead gen ("Lead Filtering and Quality of Meta Lead Ads" y "Meta Ads Lead Generation"); no recuperé su contenido. — [Loomer, Lead Filtering](https://www.jonloomer.com/lead-filtering-quality-of-meta-lead-ads/amp/); [Loomer, Lead Generation](https://www.jonloomer.com/meta-ads-lead-generation/amp/)

### Inferences
**Receta inferida por destino para Superleads.** No es una receta publicada; combina las fuentes citadas.
- **Instant form + CRM.** Para servicios locales y estética, cuando el cliente tiene CRM y suficiente volumen.
  - 1 campaña Advantage+ Leads y 1 ad set.
  - Optimizar a leads calificados (o "conversion leads") enviando etapas del CRM por CAPI: lead calificado, cita agendada, venta.
  - De 10 a 20 conceptos distintos.
  - Escalar en escalones de 20-30%.
- **Website + Sequenced Events (si aparece en la cuenta).** Para B2B, educación e inmobiliaria con landing y CRM.
  - Leads con destino Website.
  - Optimizar a la secuencia lead → evento de calidad (lead calificado, cita o solicitud completa).
  - Hasta tener la función, optimizar a Lead con CAPI y medir la calidad fuera de Meta.
- **Separar campañas por destino o por definición de lead**, no por audiencia. Es el principio de CTC (un objetivo de costo por campaña), porque cada destino tiene CPL y tasa de calificación distintos.
- **Retargeting.** Por defecto no; usar exclusion-only audiences (ago-2026) para no pagar por leads ya captados. Solo vale la pena si el CRM demuestra que los leads tibios cierran mejor (por la incrementalidad baja de retargeting que muestran CTC y la prueba de incremental attribution).
- **Ecommerce (minoritario en la cartera).** El molde de CTC (ACQ/RTN con ROAS mínimo) y Customer Lifecycle Strategy en campañas manuales de Sales sí aplican tal cual.

### Gaps
- **No verificado en esta sesión** (el presupuesto de búsquedas se agotó):
  - Requisitos oficiales de Meta para optimizar a "conversion leads" o leads calificados (volumen mínimo de leads, frecuencia de envío del CRM, rangos de tasa de conversión por etapa). Por conocimiento previo creo que Meta exige un volumen mínimo mensual de leads y envíos diarios del CRM, pero **no tengo la cifra verificada**.
  - Las opciones de "higher intent" y las preguntas calificadoras en instant forms.
  - El comportamiento de Advantage+ leads con cada conversion location (website, instant forms, Messenger o WhatsApp, llamadas).
  - Si existe *value-based optimization* para leads (valor por lead o por etapa) y cómo se configura.
- **Mensajería y WhatsApp** (click-to-WhatsApp) como destino estructural: no se cubrió aquí; corresponde a la investigación paralela sobre México y WhatsApp.
- **Moldes estadounidenses de lead gen:** no encontré moldes completos y verificables de practicantes de EE. UU. específicamente de lead gen para 2025-2026, más allá de las piezas de Loomer.

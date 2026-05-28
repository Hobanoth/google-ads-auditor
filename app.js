/* =============================================================
   APP.JS: LÓGICA CORE, AUDITORÍA, OPTIMIZACIÓN E INTEGRACIÓN API
   ============================================================= */

// State Management
const appState = {
    activeTab: 'dashboard',
    configScore: 100,
    api: {
        clientId: '',
        devToken: '',
        customerId: '',
        managerId: '',
        dateRange: 'LAST_14_DAYS',
        accessToken: '',
        isConnected: false,
        campaigns: []
    },
    metrics: {
        impressions: 0,
        clicks: 0,
        cost: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        cr: 0,
        cpa: 0
    },
    scannedNegatives: [],
    checklist: {
        high: [],
        medium: [],
        low: []
    }
};

// Database of Demo Campaigns for testing API integration
const DEMO_CAMPAIGNS = [
    {
        id: '1001',
        name: 'Campaña Búsqueda - Fuga en Display [DEMO]',
        status: 'ENABLED',
        advertisingChannelType: 'SEARCH',
        networkSettings: {
            targetGoogleSearch: true,
            targetSearchNetwork: true,
            targetContentNetwork: true // Display Expansion is ON!
        },
        geoTargetSetting: 'PRESENCE_OR_INTEREST',
        biddingStrategyType: 'MAXIMIZE_CONVERSIONS',
        metrics: {
            impressions: '12400',
            clicks: '380',
            costMicros: '240000000', // $240.00
            conversions: '0' // Zero conversions!
        }
    },
    {
        id: '1002',
        name: 'Campaña Servicios Locales - Presupuesto Bajo [DEMO]',
        status: 'ENABLED',
        advertisingChannelType: 'SEARCH',
        networkSettings: {
            targetGoogleSearch: true,
            targetSearchNetwork: false,
            targetContentNetwork: false
        },
        geoTargetSetting: 'PRESENCE',
        biddingStrategyType: 'MANUAL_CPC',
        metrics: {
            impressions: '145', // Paralized impressions!
            clicks: '4',
            costMicros: '9200000', // $9.20
            conversions: '0'
        }
    },
    {
        id: '1003',
        name: 'Campaña Ecommerce - Rendimiento Promedio [DEMO]',
        status: 'ENABLED',
        advertisingChannelType: 'SEARCH',
        networkSettings: {
            targetGoogleSearch: true,
            targetSearchNetwork: true,
            targetContentNetwork: false
        },
        geoTargetSetting: 'PRESENCE',
        biddingStrategyType: 'MAXIMIZE_CONVERSIONS',
        metrics: {
            impressions: '8500',
            clicks: '410',
            costMicros: '380000000', // $380.00
            conversions: '14' // Good conversions
        }
    }
];

// Common Spanish Irrelevant Word Patterns (Negative Keyword Database)
const NEGATIVE_PATTERNS = [
    { word: 'gratis', category: 'Sin Intención de Pago', replacement: 'gratis' },
    { word: 'gratuito', category: 'Sin Intención de Pago', replacement: 'gratuito' },
    { word: 'gratuitos', category: 'Sin Intención de Pago', replacement: 'gratuitos' },
    { word: 'empleo', category: 'Búsqueda de Trabajo', replacement: 'empleo' },
    { word: 'empleos', category: 'Búsqueda de Trabajo', replacement: 'empleos' },
    { word: 'trabajo', category: 'Búsqueda de Trabajo', replacement: 'trabajo' },
    { word: 'trabajar', category: 'Búsqueda de Trabajo', replacement: 'trabajar' },
    { word: 'vacante', category: 'Búsqueda de Trabajo', replacement: 'vacante' },
    { word: 'vacantes', category: 'Búsqueda de Trabajo', replacement: 'vacantes' },
    { word: 'curriculum', category: 'Búsqueda de Trabajo', replacement: 'curriculum' },
    { word: 'cv', category: 'Búsqueda de Trabajo', replacement: 'cv' },
    { word: 'que es', category: 'Búsqueda Informativa', replacement: 'que es' },
    { word: 'como hacer', category: 'Búsqueda Informativa', replacement: 'como hacer' },
    { word: 'definicion', category: 'Búsqueda Informativa', replacement: 'definicion' },
    { word: 'significado', category: 'Búsqueda Informativa', replacement: 'significado' },
    { word: 'ejemplo', category: 'Búsqueda Informativa', replacement: 'ejemplo' },
    { word: 'ejemplos', category: 'Búsqueda Informativa', replacement: 'ejemplos' },
    { word: 'pdf', category: 'Búsqueda Informativa / Descargas', replacement: 'pdf' },
    { word: 'libro', category: 'Búsqueda Informativa / Descargas', replacement: 'libro' },
    { word: 'descargar', category: 'Descargas', replacement: 'descargar' },
    { word: 'download', category: 'Descargas', replacement: 'download' },
    { word: 'curso', category: 'Educativo (No Comercial)', replacement: 'curso' },
    { word: 'cursos', category: 'Educativo (No Comercial)', replacement: 'cursos' },
    { word: 'clase', category: 'Educativo (No Comercial)', replacement: 'clase' },
    { word: 'clases', category: 'Educativo (No Comercial)', replacement: 'clases' },
    { word: 'aprender', category: 'Educativo (No Comercial)', replacement: 'aprender' },
    { word: 'tutorial', category: 'Educativo (No Comercial)', replacement: 'tutorial' },
    { word: 'foro', category: 'Búsqueda Social', replacement: 'foro' },
    { word: 'opiniones', category: 'Búsqueda Social', replacement: 'opiniones' },
    { word: 'review', category: 'Búsqueda Social', replacement: 'review' },
    { word: 'barato', category: 'Bajo Valor Adquisitivo', replacement: 'barato' },
    { word: 'barata', category: 'Bajo Valor Adquisitivo', replacement: 'barata' },
    { word: 'economico', category: 'Bajo Valor Adquisitivo', replacement: 'economico' },
    { word: 'economica', category: 'Bajo Valor Adquisitivo', replacement: 'economica' },
    { word: 'casero', category: 'Búsqueda de Bricolaje', replacement: 'casero' },
    { word: 'casera', category: 'Búsqueda de Bricolaje', replacement: 'casera' },
    { word: 'amazon', category: 'Competidores', replacement: 'amazon' },
    { word: 'aliexpress', category: 'Competidores', replacement: 'aliexpress' },
    { word: 'mercado libre', category: 'Competidores', replacement: 'mercado libre' }
];

// Checklist action items
const DEFAULT_TASKS = [
    {
        id: 't-networks',
        title: 'Desactivar la Red de Display en Campaña de Búsqueda',
        desc: 'Separa tus esfuerzos. Mantén la red de búsqueda pura para evitar clics accidentales de apps y banners de baja conversión.',
        priority: 'high',
        triggerCond: () => document.getElementById('config-networks').value === 'both'
    },
    {
        id: 't-location',
        title: 'Ajustar la Segmentación Geográfica a "Presencia"',
        desc: 'Cambia la configuración geográfica a "Presencia: Personas en tus ubicaciones" para evitar pagar por usuarios de otras regiones que solo muestran interés teórico.',
        priority: 'high',
        triggerCond: () => document.getElementById('config-location').value === 'presence-interest' || document.getElementById('config-location').value === 'all-world'
    },
    {
        id: 't-bidding-no-data',
        title: 'Cambiar Puja Inteligente a CPC Manual o Maximizar Clics',
        desc: 'El algoritmo necesita al menos 15-30 conversiones al mes para funcionar bien en Smart Bidding. Comienza con CPC manual o Maximizar Clics para alimentar al píxel.',
        priority: 'high',
        triggerCond: () => document.getElementById('config-bidding').value === 'smart-no-data'
    },
    {
        id: 't-conversions-none',
        title: 'Implementar el Píxel de Conversión de Google Ads',
        desc: 'Configura y verifica la medición de tus objetivos (formularios, clics en WhatsApp) usando Google Tag Manager para que Google aprenda quién te compra.',
        priority: 'high',
        triggerCond: () => document.getElementById('config-conversions').value === 'none'
    },
    {
        id: 't-conversions-basic',
        title: 'Realizar un Test Completo de Conversión',
        desc: 'Envía un formulario de prueba tú mismo y comprueba que se marque la conversión como "Activa" en Google Ads para asegurar que la medición sea exacta.',
        priority: 'medium',
        triggerCond: () => document.getElementById('config-conversions').value === 'basic'
    },
    {
        id: 't-broad-keywords',
        title: 'Migrar Concordancia Amplia a Concordancia de Frase y Exacta',
        desc: 'Pausa las palabras clave en concordancia amplia pura (ej: comprar coche) y añade sus versiones en frase ("comprar coche") para filtrar términos inútiles.',
        priority: 'high',
        triggerCond: () => document.getElementById('config-keywords').value === 'broad-only'
    },
    {
        id: 't-low-impressions',
        title: 'Incrementar el Presupuesto Diario o Elevar Pujas',
        desc: 'Tus impresiones son extremadamente bajas. Revisa si el presupuesto diario es muy bajo en relación al costo del clic promedio de tu nicho.',
        priority: 'high',
        triggerCond: () => appState.metrics.impressions > 0 && appState.metrics.impressions < 500
    },
    {
        id: 't-low-ctr',
        title: 'Añadir 3 Títulos Nuevos y Extensiones de Anuncio',
        desc: 'Un CTR bajo indica anuncios poco relevantes o aburridos. Incorpora tu propuesta de valor en los títulos y añade extensiones de enlace, llamada y texto destacado.',
        priority: 'high',
        triggerCond: () => appState.metrics.impressions >= 500 && appState.metrics.ctr < 1.5
    },
    {
        id: 't-low-cr',
        title: 'Auditar la Velocidad y Oferta de la Landing Page',
        desc: 'Muchos clics pero cero conversiones apuntan a problemas en la web. Verifica la velocidad en móviles y simplifica los campos de tus formularios.',
        priority: 'high',
        triggerCond: () => appState.metrics.clicks > 30 && appState.metrics.conversions === 0
    },
    {
        id: 't-negative-list',
        title: 'Agregar Lista de Palabras Clave Negativas a la Campaña',
        desc: 'Sube la lista de términos inútiles escaneados a tu cuenta de Google Ads en la sección de Palabras Clave Negativas para evitar seguir perdiendo dinero.',
        priority: 'medium',
        triggerCond: () => appState.scannedNegatives.length > 0
    },
    {
        id: 't-daily-review',
        title: 'Revisión Diaria de los Términos de Búsqueda',
        desc: 'Durante las primeras semanas, dedica 10 minutos al día a revisar los términos exactos por los que pagaste y añade negativas de inmediato.',
        priority: 'low',
        triggerCond: () => true
    },
    {
        id: 't-competitors',
        title: 'Analizar Anuncios de la Competencia',
        desc: 'Realiza búsquedas de control para observar qué propuestas de valor y precios ofrece tu competencia directa en los resultados patrocinados.',
        priority: 'low',
        triggerCond: () => true
    }
];

// App Core Object
const app = {
    // Initialization
    init() {
        this.setupNavigation();
        this.setupConfigAudit();
        this.setupMetricsAudit();
        this.setupNegativeScanner();
        this.setupChecklistActions();
        
        // Phase 2: Setup API Integration mechanics
        this.setupApiIntegration();
        this.loadSavedApiCredentials();

        // Initial setup
        this.runConfigAudit();
        this.updateChecklist();
    },

    // Navigation logic
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                this.navigateTo(target);
            });
        });
    },

    navigateTo(targetSectionId) {
        // Toggle sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(sec => {
            sec.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Toggle nav button highlight
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetSectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        appState.activeTab = targetSectionId;
    },

    // 1. Technical Configuration Audit Engine
    setupConfigAudit() {
        const selectFields = [
            'config-networks',
            'config-location',
            'config-bidding',
            'config-conversions',
            'config-keywords'
        ];

        selectFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    this.runConfigAudit();
                    this.updateChecklist();
                });
            }
        });
    },

    runConfigAudit() {
        const networks = document.getElementById('config-networks').value;
        const location = document.getElementById('config-location').value;
        const bidding = document.getElementById('config-bidding').value;
        const conversions = document.getElementById('config-conversions').value;
        const keywords = document.getElementById('config-keywords').value;

        let score = 100;
        const recommendations = [];

        // Network assessment
        if (networks === 'both') {
            score -= 25;
            recommendations.push({
                type: 'severe',
                badge: 'Crítico',
                title: 'Red de Display y Búsqueda combinadas',
                desc: 'Al tener Búsqueda y Display activos en la misma campaña, Google tiende a consumir tu presupuesto rápidamente en clics de baja calidad procedentes de apps móviles y juegos. Recomendamos desactivar la Red de Display de inmediato.'
            });
        } else if (networks === 'search-only') {
            recommendations.push({
                type: 'optimal',
                badge: 'Excelente',
                title: 'Red de Búsqueda pura',
                desc: 'Configuración ideal. Atrae tráfico de alta intención de compra sin fugas presupuestarias.'
            });
        }

        // Location assessment
        if (location === 'presence-interest') {
            score -= 15;
            recommendations.push({
                type: 'warning',
                badge: 'Advertencia',
                title: 'Segmentación de presencia o interés amplia',
                desc: 'Esta opción permite que personas físicamente ubicadas en otros países vean tus anuncios si "muestran interés" por tu zona geográfica. Recomendamos cambiar la opción a "Presencia: personas que se encuentran o suelen encontrarse en tus ubicaciones".'
            });
        } else if (location === 'all-world') {
            score -= 30;
            recommendations.push({
                type: 'severe',
                badge: 'Crítico',
                title: 'Sin límites geográficos delimitados',
                desc: 'Si estás promocionando un servicio local o limitado a un país y no has configurado exclusiones o límites precisos, estás desperdiciando dinero en clics de regiones a las que no puedes atender.'
            });
        } else {
            recommendations.push({
                type: 'optimal',
                badge: 'Excelente',
                title: 'Segmentación geográfica enfocada',
                desc: 'Has limitado tus anuncios únicamente a las personas que están presentes físicamente en tu público objetivo.'
            });
        }

        // Bidding assessment
        if (bidding === 'smart-no-data') {
            score -= 20;
            recommendations.push({
                type: 'severe',
                badge: 'Riesgo Alto',
                title: 'Smart Bidding sin historial de datos',
                desc: 'Las pujas inteligentes como "Maximizar Conversiones" dependen de datos previos para optimizar. Si tu píxel no tiene conversiones recientes o es una campaña nueva, usar Smart Bidding puede congelar tus impresiones o gastar erráticamente. Recomendamos empezar con Maximizar Clics o CPC Manual.'
            });
        } else if (bidding === 'cpc-manual') {
            recommendations.push({
                type: 'optimal',
                badge: 'Bueno',
                title: 'Estrategia de Puja Controlada para inicio',
                desc: 'Ideal para conseguir clics rápidos y nutrir tu cuenta con historial de tráfico relevante.'
            });
        } else {
            recommendations.push({
                type: 'optimal',
                badge: 'Excelente',
                title: 'Smart Bidding Nutritivo',
                desc: 'Apropiado si ya dispones de conversiones verificadas y un volumen recurrente.'
            });
        }

        // Conversions assessment
        if (conversions === 'none') {
            score -= 30;
            recommendations.push({
                type: 'severe',
                badge: 'Crítico',
                title: 'Seguimiento de Conversiones inactivo',
                desc: 'Google Ads funciona a ciegas si no mides las conversiones. No podrás saber qué palabras clave te traen clientes y qué palabras te están haciendo perder presupuesto.'
            });
        } else if (conversions === 'basic') {
            score -= 10;
            recommendations.push({
                type: 'warning',
                badge: 'Advertencia',
                title: 'Conversiones no testeadas',
                desc: 'Mides las conversiones de forma teórica pero no has completado un ciclo de prueba real. Asegúrate de verificar el funcionamiento del formulario o del enlace de llamada.'
            });
        } else {
            recommendations.push({
                type: 'optimal',
                badge: 'Excelente',
                title: 'Conversiones verificadas',
                desc: 'Tienes implementado y comprobado tu embudo de ventas digital. Google Ads optimizará para este objetivo.'
            });
        }

        // Keywords assessment
        if (keywords === 'broad-only') {
            score -= 20;
            recommendations.push({
                type: 'severe',
                badge: 'Riesgo Alto',
                title: 'Predominancia de Concordancia Amplia pura',
                desc: 'La concordancia amplia (ej: marketing) atrae búsquedas extremadamente lejanas a tu negocio. A menos que tengas una lista enorme de negativas, limitará tus resultados significativamente. Cambia a Concordancia de Frase ("ejemplo") o Exacta ([ejemplo]).'
            });
        } else {
            recommendations.push({
                type: 'optimal',
                badge: 'Excelente',
                title: 'Control de Concordancia',
                desc: 'Al usar concordancias restrictivas o mixtas evitas un porcentaje considerable de clics inútiles.'
            });
        }

        // Update score UI
        appState.configScore = Math.max(0, score);
        const scoreBadge = document.getElementById('config-score');
        const scoreStatus = document.getElementById('score-status');
        
        if (scoreBadge) {
            scoreBadge.innerText = `${appState.configScore}%`;
            
            // Adjust coloring
            scoreBadge.classList.remove('text-success', 'text-warning', 'text-danger');
            if (appState.configScore >= 80) {
                scoreBadge.style.color = 'var(--success-color)';
                scoreStatus.innerText = 'Configuración Excelente';
                scoreStatus.style.color = 'var(--success-color)';
            } else if (appState.configScore >= 50) {
                scoreBadge.style.color = 'var(--warning-color)';
                scoreStatus.innerText = 'Configuración Regular con Fugas';
                scoreStatus.style.color = 'var(--warning-color)';
            } else {
                scoreBadge.style.color = 'var(--danger-color)';
                scoreStatus.innerText = 'Configuración Crítica de Alto Riesgo';
                scoreStatus.style.color = 'var(--danger-color)';
            }
        }

        // Render Recommendations Cards
        const container = document.getElementById('config-recommendations');
        if (container) {
            container.innerHTML = '';
            recommendations.forEach(rec => {
                const item = document.createElement('div');
                item.className = `recommendation-item issue-${rec.type}`;
                
                let badgeClass = 'badge-success';
                if (rec.type === 'severe') badgeClass = 'badge-danger';
                if (rec.type === 'warning') badgeClass = 'badge-warning';

                item.innerHTML = `
                    <div class="rec-title-row">
                        <span class="badge ${badgeClass}">${rec.badge}</span>
                        <span>${rec.title}</span>
                    </div>
                    <p>${rec.desc}</p>
                `;
                container.appendChild(item);
            });
        }
    },

    // 2. Metrics & Conversion Funnel Auditing
    setupMetricsAudit() {
        const form = document.getElementById('metrics-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.runMetricsAudit();
                this.updateChecklist();
            });
        }
    },

    runMetricsAudit() {
        const imps = parseInt(document.getElementById('metric-impressions').value) || 0;
        const clicks = parseInt(document.getElementById('metric-clicks').value) || 0;
        const cost = parseFloat(document.getElementById('metric-cost').value) || 0;
        const convs = parseInt(document.getElementById('metric-conversions').value) || 0;

        if (imps === 0) {
            alert('Las impresiones deben ser superiores a 0 para poder evaluar el embudo.');
            return;
        }

        // Calculations
        const ctr = (clicks / imps) * 100;
        const cpc = clicks > 0 ? (cost / clicks) : 0;
        const cr = clicks > 0 ? (convs / clicks) * 100 : 0;
        const cpa = convs > 0 ? (cost / convs) : 0;

        // Save states
        appState.metrics = {
            impressions: imps,
            clicks: clicks,
            cost: cost,
            conversions: convs,
            ctr: ctr.toFixed(2),
            cpc: cpc.toFixed(2),
            cr: cr.toFixed(2),
            cpa: cpa.toFixed(2)
        };

        // Render KPI UI
        const ctrEl = document.getElementById('kpi-ctr');
        const ctrCard = document.getElementById('kpi-ctr-card');
        const ctrStatus = document.getElementById('kpi-ctr-status');

        const cpcEl = document.getElementById('kpi-cpc');

        const crEl = document.getElementById('kpi-cr');
        const crCard = document.getElementById('kpi-cr-card');
        const crStatus = document.getElementById('kpi-cr-status');

        const cpaEl = document.getElementById('kpi-cpa');
        const cpaCard = document.getElementById('kpi-cpa-card');
        const cpaStatus = document.getElementById('kpi-cpa-status');

        // Evaluate CTR
        ctrEl.innerText = `${appState.metrics.ctr}%`;
        ctrCard.className = 'kpi-card';
        if (ctr < 1.5) {
            ctrCard.classList.add('kpi-bad');
            ctrStatus.innerText = 'Pobre (Optimizar anuncios)';
        } else if (ctr >= 1.5 && ctr < 4.0) {
            ctrCard.classList.add('kpi-warning');
            ctrStatus.innerText = 'Aceptable';
        } else {
            ctrCard.classList.add('kpi-good');
            ctrStatus.innerText = 'Excelente CTR';
        }

        // Evaluate CPC
        cpcEl.innerText = `$${appState.metrics.cpc}`;

        // Evaluate CR (Conversion Rate)
        crEl.innerText = `${appState.metrics.cr}%`;
        crCard.className = 'kpi-card';
        if (clicks > 0) {
            if (cr < 1.0) {
                crCard.classList.add('kpi-bad');
                crStatus.innerText = 'Muy Bajo (Optimizar web)';
            } else if (cr >= 1.0 && cr < 3.0) {
                crCard.classList.add('kpi-warning');
                crStatus.innerText = 'Promedio';
            } else {
                crCard.classList.add('kpi-good');
                crStatus.innerText = 'Muy Rentable';
            }
        } else {
            crStatus.innerText = 'Sin clics';
        }

        // Evaluate CPA
        if (convs > 0) {
            cpaEl.innerText = `$${appState.metrics.cpa}`;
            cpaCard.className = 'kpi-card kpi-good';
            cpaStatus.innerText = 'Con conversiones';
        } else {
            cpaEl.innerText = 'No aplica';
            cpaCard.className = 'kpi-card kpi-bad';
            cpaStatus.innerText = 'Cero conversiones';
        }

        // Funnel representation width
        document.getElementById('funnel-impressions-val').innerText = imps.toLocaleString();
        
        const clicksBar = document.getElementById('funnel-clicks-bar');
        const clicksVal = document.getElementById('funnel-clicks-val');
        clicksVal.innerText = `${clicks.toLocaleString()} (${appState.metrics.ctr}%)`;
        clicksBar.style.width = `${Math.min(100, Math.max(8, ctr * 8))}%`; // Scaling for visual comfort

        const convBar = document.getElementById('funnel-conversions-bar');
        const convVal = document.getElementById('funnel-conversions-val');
        convVal.innerText = `${convs.toLocaleString()} (${appState.metrics.cr}%)`;
        convBar.style.width = clicks > 0 ? `${Math.min(100, Math.max(8, (convs / clicks) * 100 * 5))}%` : '0%';

        // Diagnostic engine
        const diagOutput = document.getElementById('diagnostic-output');
        const diagTitle = document.getElementById('diag-summary-title');
        const diagDesc = document.getElementById('diag-summary-desc');

        diagOutput.style.display = 'block';
        diagOutput.className = 'diagnostic-box';

        if (imps < 500) {
            // Under-delivery bottleneck
            diagTitle.innerText = 'Diagnóstico: Campaña Paralizada / Escaso Tráfico';
            diagOutput.classList.add('kpi-bad');
            diagDesc.innerHTML = `
                <p>Tus anuncios apenas se están mostrando en Google. Tu mayor limitador es el <strong>Alcance de la Campaña</strong>. Razones comunes:</p>
                <ul>
                    <li><strong>Presupuesto excesivamente restringido:</strong> Si tu presupuesto diario no cubre ni siquiera 3 o 4 clics en tu industria, Google no mostrará tus anuncios.</li>
                    <li><strong>Palabras clave muy estrechas:</strong> Estás utilizando concordancias exactas o términos de búsqueda hiper-específicos que nadie busca.</li>
                    <li><strong>Pujas manuales inviables:</strong> Si utilizas CPC manual, tu oferta por clic es tan baja que pierdes todas las subastas contra tu competencia.</li>
                    <li><strong>Problemas de Smart Bidding:</strong> Tienes configurada una puja inteligente automatizada pero Google no tiene datos suficientes para saber a quién pujar, paralizando el sistema.</li>
                </ul>
            `;
        } else if (clicks > 30 && convs === 0) {
            // Conversions leakage bottleneck
            diagTitle.innerText = 'Diagnóstico: Fuga Presupuestaria en Landing Page o Calidad de Tráfico';
            diagOutput.classList.add('kpi-bad');
            diagDesc.innerHTML = `
                <p>Estás pagando dinero por clics, las personas ingresan a tu sitio web, pero <strong>nadie te contacta ni te compra</strong>. Esto es un problema crítico de conversión. Razones comunes:</p>
                <ul>
                    <li><strong>Problema Técnico en la Web:</strong> Tu landing page carga muy lenta en dispositivos móviles o el botón del formulario/WhatsApp está roto. ¡Compruébalo hoy mismo!</li>
                    <li><strong>Incoherencia de Mensaje:</strong> Lo que ofreces en el anuncio no coincide exactamente con lo que el usuario ve al entrar a tu web.</li>
                    <li><strong>Tráfico Sucio (Keywords Negativas):</strong> Tus concordancias son amplias y estás pagando por búsquedas irrelevantes o personas que buscan servicios gratuitos o empleo. Revísalo en la pestaña "Filtro de Negativas".</li>
                    <li><strong>Falta de Propuesta de Valor Clara:</strong> Tu sitio web es aburrido, no inspira confianza o carece de testimonios y un llamado a la acción claro.</li>
                </ul>
            `;
        } else if (ctr < 1.5) {
            // CTR / Ad relevance bottleneck
            diagTitle.innerText = 'Diagnóstico: Anuncios poco Atractivos o Relevancia Pobre';
            diagOutput.classList.add('kpi-bad');
            diagDesc.innerHTML = `
                <p>Tus anuncios se muestran muchas veces, pero <strong>casi nadie hace clic</strong> en ellos. Tienes un CTR inferior al estándar óptimo. Razones comunes:</p>
                <ul>
                    <li><strong>Falta de coincidencia con la búsqueda:</strong> El título de tu anuncio no contiene la palabra clave exacta que el usuario acaba de escribir en el buscador.</li>
                    <li><strong>Textos aburridos o genéricos:</strong> Tu anuncio no ofrece ofertas atractivas, descuentos o beneficios únicos respecto a tus competidores.</li>
                    <li><strong>Falta de extensiones de anuncios:</strong> No utilizas extensiones de enlaces de sitio, texto destacado o fragmentos estructurados, haciendo que tu anuncio sea visualmente muy pequeño en pantalla.</li>
                </ul>
            `;
        } else {
            // Optimal performance or stable metrics
            diagTitle.innerText = 'Diagnóstico: Métricas Saludables (Optimización Recursiva)';
            diagOutput.classList.add('healthy');
            diagDesc.innerHTML = `
                <p>El embudo de conversión muestra ratios aceptables. Continúa con la optimización para mejorar la rentabilidad general de la cuenta:</p>
                <ul>
                    <li><strong>Añadir Negativas continuas:</strong> Sigue monitoreando términos de búsqueda para refinar el CPC.</li>
                    <li><strong>Aumentar presupuesto controlado:</strong> Si el CPA es rentable, incrementa un 10% el presupuesto cada 3 días para escalar.</li>
                    <li><strong>Pruebas A/B de Landing Page:</strong> Crea una versión alternativa de tu formulario para exprimir aún más la tasa de conversión.</li>
                </ul>
            `;
        }
    },

    // 3. Search Terms Negatives Scanning & Filtering
    setupNegativeScanner() {
        const btnScan = document.getElementById('btn-scan-negatives');
        const btnLoadSample = document.getElementById('btn-load-sample');
        
        if (btnScan) {
            btnScan.addEventListener('click', () => {
                this.runNegativeScanner();
                this.updateChecklist();
            });
        }

        if (btnLoadSample) {
            btnLoadSample.addEventListener('click', () => {
                const sampleText = 
                    "como configurar google ads gratis\n" +
                    "ofertas de empleo marketing digital\n" +
                    "que es un especialista seo\n" +
                    "comprar zapatillas baratas chinas\n" +
                    "curso de google ads en pdf gratis\n" +
                    "trucos caseros limpiar tenis\n" +
                    "amazon zapatillas running\n" +
                    "definicion de publicidad en internet";
                document.getElementById('search-terms-input').value = sampleText;
            });
        }
    },

    runNegativeScanner() {
        const inputText = document.getElementById('search-terms-input').value;
        if (!inputText.trim()) {
            alert('Por favor, ingresa al menos un término de búsqueda.');
            return;
        }

        const lines = inputText.split('\n');
        const matches = [];
        const uniqueNegatives = new Set();

        lines.forEach(line => {
            const cleanLine = line.trim().toLowerCase();
            if (!cleanLine) return;

            // Search for negative matches
            NEGATIVE_PATTERNS.forEach(pattern => {
                const regex = new RegExp(`\\b${pattern.word}\\b`, 'i');
                if (regex.test(cleanLine)) {
                    matches.push({
                        original: line.trim(),
                        extracted: pattern.replacement,
                        category: pattern.category
                    });
                    uniqueNegatives.add(pattern.replacement);
                }
            });
        });

        // Save scanned negatives
        appState.scannedNegatives = Array.from(uniqueNegatives);

        // Toggle visibility
        const emptyEl = document.getElementById('negatives-empty');
        const resultsEl = document.getElementById('negatives-results');
        const countBadge = document.getElementById('negatives-count');
        const tableBody = document.getElementById('negatives-table-body');

        if (matches.length === 0) {
            emptyEl.style.display = 'flex';
            emptyEl.innerHTML = `
                <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p>No hemos detectado ninguna palabra irrelevante común en los términos proporcionados. ¡Tus búsquedas parecen bien orientadas!</p>
            `;
            resultsEl.style.display = 'none';
        } else {
            emptyEl.style.display = 'none';
            resultsEl.style.display = 'block';

            countBadge.innerText = `${matches.length} Filtrados Detectados`;
            
            // Build Table
            tableBody.innerHTML = '';
            matches.forEach(match => {
                const tr = document.createElement('tr');
                tr.className = 'table-row-irrelevant';
                tr.innerHTML = `
                    <td><strong>${match.original}</strong></td>
                    <td><span class="badge badge-danger">${match.extracted}</span></td>
                    <td>${match.category}</td>
                    <td><button class="btn btn-outline btn-small" onclick="app.removeScannedNegative('${match.extracted}')">Omitir</button></td>
                `;
                tableBody.appendChild(tr);
            });

            // Populate copy area
            this.updateNegativesCopyArea();
        }
    },

    removeScannedNegative(word) {
        appState.scannedNegatives = appState.scannedNegatives.filter(w => w !== word);
        
        // Remove from table rows
        this.runNegativeScannerFiltered();
    },

    runNegativeScannerFiltered() {
        const inputText = document.getElementById('search-terms-input').value;
        const lines = inputText.split('\n');
        const matches = [];

        lines.forEach(line => {
            const cleanLine = line.trim().toLowerCase();
            if (!cleanLine) return;

            appState.scannedNegatives.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'i');
                if (regex.test(cleanLine)) {
                    // Find pattern category
                    const categoryObj = NEGATIVE_PATTERNS.find(p => p.replacement === word);
                    matches.push({
                        original: line.trim(),
                        extracted: word,
                        category: categoryObj ? categoryObj.category : 'Exclusión Manual'
                    });
                }
            });
        });

        const tableBody = document.getElementById('negatives-table-body');
        const countBadge = document.getElementById('negatives-count');

        if (matches.length === 0) {
            document.getElementById('negatives-empty').style.display = 'flex';
            document.getElementById('negatives-results').style.display = 'none';
        } else {
            countBadge.innerText = `${matches.length} Filtrados Detectados`;
            tableBody.innerHTML = '';
            matches.forEach(match => {
                const tr = document.createElement('tr');
                tr.className = 'table-row-irrelevant';
                tr.innerHTML = `
                    <td><strong>${match.original}</strong></td>
                    <td><span class="badge badge-danger">${match.extracted}</span></td>
                    <td>${match.category}</td>
                    <td><button class="btn btn-outline btn-small" onclick="app.removeScannedNegative('${match.extracted}')">Omitir</button></td>
                `;
                tableBody.appendChild(tr);
            });

            this.updateNegativesCopyArea();
        }
    },

    updateNegativesCopyArea() {
        const copyTextarea = document.getElementById('copy-negatives-text');
        if (copyTextarea) {
            copyTextarea.value = appState.scannedNegatives.join('\n');
        }
    },

    setupNegativeScannerCopy() {
        const btnCopy = document.getElementById('btn-copy-clipboard');
        if (btnCopy) {
            btnCopy.addEventListener('click', () => {
                const textarea = document.getElementById('copy-negatives-text');
                textarea.select();
                document.execCommand('copy');
                
                const originalText = btnCopy.innerText;
                btnCopy.innerText = '¡Copiado!';
                btnCopy.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    btnCopy.innerText = originalText;
                    btnCopy.style.backgroundColor = '';
                }, 2000);
            });
        }
    },

    // 4. Personalized Optimization Checklist (Plan de Acción)
    updateChecklist() {
        // Clear lists
        appState.checklist = { high: [], medium: [], low: [] };

        // Test each task trigger conditions
        DEFAULT_TASKS.forEach(task => {
            if (task.triggerCond()) {
                appState.checklist[task.priority].push({
                    id: task.id,
                    title: task.title,
                    desc: task.desc,
                    checked: false
                });
            }
        });

        // Render checklist UI
        this.renderChecklistSection('high', 'checklist-high');
        this.renderChecklistSection('medium', 'checklist-medium');
        this.renderChecklistSection('low', 'checklist-low');
    },

    renderChecklistSection(priority, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        const items = appState.checklist[priority];

        if (items.length === 0) {
            container.innerHTML = `
                <div class="checklist-item checked" style="cursor: default; border-style: dashed;">
                    <div class="checklist-checkbox-wrapper">
                        <div class="checkbox-custom" style="background-color: var(--success-color); border-color: var(--success-color);">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="opacity: 1; transform: scale(1)">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="checklist-content">
                        <h5>¡Todo en orden aquí!</h5>
                        <p>No se han detectado cuellos de botella para esta prioridad basándose en tus configuraciones y métricas actuales.</p>
                    </div>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = `checklist-item ${item.checked ? 'checked' : ''}`;
            div.setAttribute('data-id', item.id);
            div.setAttribute('data-priority', priority);

            div.innerHTML = `
                <div class="checklist-checkbox-wrapper">
                    <div class="checkbox-custom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="checklist-content">
                    <h5>${item.title}</h5>
                    <p>${item.desc}</p>
                </div>
            `;

            // Checklist toggle trigger
            div.addEventListener('click', () => {
                this.toggleChecklistItem(item.id, priority, div);
            });

            container.appendChild(div);
        });
    },

    toggleChecklistItem(id, priority, element) {
        const item = appState.checklist[priority].find(t => t.id === id);
        if (item) {
            item.checked = !item.checked;
            
            if (item.checked) {
                element.classList.add('checked');
            } else {
                element.classList.remove('checked');
            }
        }
    },

    setupChecklistActions() {
        this.setupNegativeScannerCopy();
        
        // Print action trigger
        const btnPrint = document.getElementById('btn-print-report');
        if (btnPrint) {
            btnPrint.addEventListener('click', () => {
                window.print();
            });
        }
    },

    // 5. Phase 2: Google Ads API Integration Module
    setupApiIntegration() {
        const form = document.getElementById('api-config-form');
        const btnClear = document.getElementById('btn-api-clear');
        const btnAuth = document.getElementById('btn-api-auth');
        const btnSyncCampaign = document.getElementById('btn-api-sync-campaign');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveApiCredentials();
            });
        }

        if (btnClear) {
            btnClear.addEventListener('click', () => {
                this.clearApiCredentials();
            });
        }

        if (btnAuth) {
            btnAuth.addEventListener('click', () => {
                this.authenticateGoogleAds();
            });
        }

        if (btnSyncCampaign) {
            btnSyncCampaign.addEventListener('click', () => {
                this.syncSelectedCampaign();
            });
        }
    },

    loadSavedApiCredentials() {
        const clientId = localStorage.getItem('google_ads_client_id') || '';
        const devToken = localStorage.getItem('google_ads_dev_token') || '';
        const customerId = localStorage.getItem('google_ads_customer_id') || '';
        const managerId = localStorage.getItem('google_ads_manager_id') || '';
        const dateRange = localStorage.getItem('google_ads_date_range') || 'LAST_14_DAYS';

        document.getElementById('api-client-id').value = clientId;
        document.getElementById('api-dev-token').value = devToken;
        document.getElementById('api-customer-id').value = customerId;
        document.getElementById('api-manager-id').value = managerId;
        document.getElementById('api-date-range').value = dateRange;

        if (clientId && devToken && customerId) {
            appState.api.clientId = clientId;
            appState.api.devToken = devToken;
            appState.api.customerId = customerId;
            appState.api.managerId = managerId;
            appState.api.dateRange = dateRange;
            
            // Credentials saved, show Google Sign-In button
            document.getElementById('btn-api-auth').style.display = 'inline-flex';
            this.updateApiStatus('warning', 'Credenciales Listas', 'Haz clic en "Iniciar Sesión con Google" para conectar.');
        }
    },

    saveApiCredentials() {
        const clientId = document.getElementById('api-client-id').value.trim();
        const devToken = document.getElementById('api-dev-token').value.trim();
        const customerId = document.getElementById('api-customer-id').value.trim().replace(/-/g, '');
        const managerId = document.getElementById('api-manager-id').value.trim().replace(/-/g, '');
        const dateRange = document.getElementById('api-date-range').value;

        if (!clientId || !devToken || !customerId) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        localStorage.setItem('google_ads_client_id', clientId);
        localStorage.setItem('google_ads_dev_token', devToken);
        localStorage.setItem('google_ads_customer_id', customerId);
        localStorage.setItem('google_ads_manager_id', managerId);
        localStorage.setItem('google_ads_date_range', dateRange);

        appState.api.clientId = clientId;
        appState.api.devToken = devToken;
        appState.api.customerId = customerId;
        appState.api.managerId = managerId;
        appState.api.dateRange = dateRange;

        document.getElementById('btn-api-auth').style.display = 'inline-flex';
        this.updateApiStatus('warning', 'Credenciales Guardadas', 'Presiona el botón de inicio de sesión de Google de abajo.');
        this.showNotification('Credenciales guardadas localmente.');
    },

    clearApiCredentials() {
        localStorage.removeItem('google_ads_client_id');
        localStorage.removeItem('google_ads_dev_token');
        localStorage.removeItem('google_ads_customer_id');
        localStorage.removeItem('google_ads_manager_id');
        localStorage.removeItem('google_ads_date_range');

        document.getElementById('api-client-id').value = '';
        document.getElementById('api-dev-token').value = '';
        document.getElementById('api-customer-id').value = '';
        document.getElementById('api-manager-id').value = '';
        document.getElementById('api-date-range').value = 'LAST_14_DAYS';

        document.getElementById('btn-api-auth').style.display = 'none';
        document.getElementById('campaign-import-box').style.display = 'none';
        
        appState.api.clientId = '';
        appState.api.devToken = '';
        appState.api.customerId = '';
        appState.api.managerId = '';
        appState.api.isConnected = false;
        appState.api.accessToken = '';

        this.updateApiStatus('offline', 'Desconectado', 'Guarda tus credenciales y haz clic abajo para sincronizar.');
        this.showNotification('Credenciales de la API eliminadas correctamente.');
    },

    updateApiStatus(state, statusText, subText) {
        const box = document.getElementById('connection-status-box');
        const dot = document.getElementById('api-pulse-dot');
        const text = document.getElementById('api-connection-text');
        const subtext = document.getElementById('api-connection-subtext');

        const dbPulse = document.getElementById('dashboard-pulse');
        const dbText = document.getElementById('dashboard-status-text');

        // Apply visual classes
        box.className = `connection-status-card ${state === 'online' ? 'active' : ''}`;
        dot.className = `status-pulse-dot ${state}`;
        text.innerText = statusText;
        subtext.innerText = subText;

        if (dbPulse) {
            dbPulse.className = `status-pulse-dot ${state}`;
            dbText.innerText = state === 'online' ? 'Sincronizado con la API de Google Ads' : 'Sin conexión activa a la API de Google Ads';
        }
    },

    authenticateGoogleAds() {
        const clientId = appState.api.clientId;
        
        if (!clientId) {
            alert('ID de Cliente de Google no configurado.');
            return;
        }

        // Demo / Simulator Bypass Mode
        if (clientId === 'demo' || clientId === 'test') {
            this.showNotification('Iniciando Conexión Simulada (Modo Demo)...');
            setTimeout(() => {
                appState.api.isConnected = true;
                appState.api.accessToken = 'mock_demo_token';
                appState.api.campaigns = DEMO_CAMPAIGNS;
                
                this.updateApiStatus('online', 'Modo Demo Activo', 'Conectado a bases de datos simuladas de Google Ads.');
                this.renderCampaignDropdown();
            }, 1000);
            return;
        }

        try {
            // Load official Google Sign-In Identity Services client token flow
            this.showNotification('Abriendo ventana segura de Google...');
            const tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: 'https://www.googleapis.com/auth/adwords',
                callback: (tokenResponse) => {
                    if (tokenResponse && tokenResponse.access_token) {
                        appState.api.accessToken = tokenResponse.access_token;
                        appState.api.isConnected = true;
                        
                        this.updateApiStatus('online', 'Conectado', 'Conexión OAuth2 establecida con éxito.');
                        this.showNotification('¡Inicio de sesión en Google Ads exitoso!');
                        this.fetchActiveCampaigns();
                    } else {
                        this.showNotification('Error al recuperar token de acceso.', true);
                    }
                },
                error_callback: (err) => {
                    console.error(err);
                    this.showNotification('Error en la autenticación de Google.', true);
                }
            });

            tokenClient.requestAccessToken({ prompt: 'consent' });
        } catch (e) {
            console.error(e);
            alert('Error al iniciar Google Identity SDK. Si estás en localhost o pruebas sin internet, utiliza el ID de cliente "demo" para activar el simulador.');
        }
    },

    async fetchActiveCampaigns() {
        const loader = document.getElementById('api-loading');
        const box = document.getElementById('campaign-import-box');
        const container = document.getElementById('campaign-select-container');

        box.style.display = 'block';
        loader.style.display = 'flex';
        container.style.display = 'none';

        const customerId = appState.api.customerId;
        const accessToken = appState.api.accessToken;
        const devToken = appState.api.devToken;
        const managerId = appState.api.managerId;

        // Query active campaigns from REST endpoints using Google Ads Query Language (GAQL)
        const gaql = `
            SELECT 
                campaign.id, 
                campaign.name, 
                campaign.status, 
                campaign.advertising_channel_type,
                campaign.bidding_strategy_type,
                campaign.geo_target_type_setting.positive_geo_target_type,
                campaign.network_settings.target_google_search,
                campaign.network_settings.target_search_network,
                campaign.network_settings.target_content_network
            FROM campaign 
            WHERE campaign.status = 'ENABLED'
        `;

        try {
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'developer-token': devToken,
                'Content-Type': 'application/json'
            };

            if (managerId) {
                headers['login-customer-id'] = managerId;
            }

            const response = await fetch(`https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:search`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ query: gaql })
            });

            if (!response.ok) {
                throw new Error(`Google API respondio con codigo ${response.status}`);
            }

            const data = await response.json();
            const campaignsList = [];

            if (data.results && data.results.length > 0) {
                data.results.forEach(row => {
                    const c = row.campaign;
                    campaignsList.push({
                        id: c.id,
                        name: c.name,
                        status: c.status,
                        advertisingChannelType: c.advertisingChannelType,
                        networkSettings: c.networkSettings || { targetContentNetwork: false },
                        geoTargetSetting: c.geoTargetTypeSetting ? c.geoTargetTypeSetting.positiveGeoTargetType : 'PRESENCE_OR_INTEREST',
                        biddingStrategyType: c.biddingStrategyType
                    });
                });
            }

            appState.api.campaigns = campaignsList;
            loader.style.display = 'none';

            if (campaignsList.length === 0) {
                alert('No se encontraron campañas activas en esta cuenta de Google Ads.');
                box.style.display = 'none';
            } else {
                container.style.display = 'block';
                this.renderCampaignDropdown();
            }

        } catch (e) {
            console.error(e);
            loader.style.display = 'none';
            this.showNotification('Error al consultar campañas. Activando Simulador de seguridad.', true);
            
            // Automatic switch to Demo / Simulator in case of network restrictions
            appState.api.campaigns = DEMO_CAMPAIGNS;
            container.style.display = 'block';
            this.renderCampaignDropdown();
        }
    },

    renderCampaignDropdown() {
        const box = document.getElementById('campaign-import-box');
        const container = document.getElementById('campaign-select-container');
        const select = document.getElementById('api-campaigns-select');

        box.style.display = 'block';
        container.style.display = 'block';
        select.innerHTML = '';

        appState.api.campaigns.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.innerText = c.name;
            select.appendChild(opt);
        });
    },

    async syncSelectedCampaign() {
        const select = document.getElementById('api-campaigns-select');
        const campaignId = select.value;

        if (!campaignId) {
            alert('Selecciona una campaña.');
            return;
        }

        this.showNotification('Sincronizando configuraciones y métricas...');

        // Verify if it is a Demo campaign
        const isDemo = campaignId.startsWith('100');
        const campaignObj = appState.api.campaigns.find(c => c.id === campaignId);

        if (!campaignObj) return;

        let impressions = 0;
        let clicks = 0;
        let cost = 0;
        let conversions = 0;

        if (isDemo) {
            // Retrieve metrics from mock database
            impressions = parseInt(campaignObj.metrics.impressions) || 0;
            clicks = parseInt(campaignObj.metrics.clicks) || 0;
            cost = (parseFloat(campaignObj.metrics.costMicros) || 0) / 1000000;
            conversions = parseInt(campaignObj.metrics.conversions) || 0;
        } else {
            // Retrieve actual metrics from chosen range
            const customerId = appState.api.customerId;
            const accessToken = appState.api.accessToken;
            const devToken = appState.api.devToken;
            const managerId = appState.api.managerId;
            const dateRange = appState.api.dateRange;

            const metricGaql = `
                SELECT 
                    metrics.impressions, 
                    metrics.clicks, 
                    metrics.cost_micros, 
                    metrics.conversions
                FROM campaign
                WHERE campaign.id = ${campaignId} 
                  AND segments.date DURING ${dateRange}
            `;

            try {
                const headers = {
                    'Authorization': `Bearer ${accessToken}`,
                    'developer-token': devToken,
                    'Content-Type': 'application/json'
                };

                if (managerId) headers['login-customer-id'] = managerId;

                const response = await fetch(`https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:search`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ query: metricGaql })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        const m = data.results[0].metrics;
                        impressions = parseInt(m.impressions) || 0;
                        clicks = parseInt(m.clicks) || 0;
                        cost = (parseFloat(m.costMicros) || 0) / 1000000;
                        conversions = parseInt(m.conversions) || 0;
                    }
                }
            } catch (e) {
                console.error('Error al sincronizar metricas reales: ', e);
            }
        }

        // MAPPING MECHANISMS
        // 1. Map Networks
        const configNetworks = document.getElementById('config-networks');
        if (campaignObj.networkSettings && campaignObj.networkSettings.targetContentNetwork) {
            configNetworks.value = 'both';
        } else {
            configNetworks.value = 'search-only';
        }

        // 2. Map Location targeting
        const configLocation = document.getElementById('config-location');
        if (campaignObj.geoTargetSetting === 'PRESENCE') {
            configLocation.value = 'presence-only';
        } else if (campaignObj.geoTargetSetting === 'PRESENCE_OR_INTEREST') {
            configLocation.value = 'presence-interest';
        } else {
            configLocation.value = 'presence-interest';
        }

        // 3. Map Bidding strategy
        const configBidding = document.getElementById('config-bidding');
        const isSmart = ['MAXIMIZE_CONVERSIONS', 'MAXIMIZE_CONVERSION_VALUE', 'TARGET_CPA', 'TARGET_ROAS'].includes(campaignObj.biddingStrategyType);
        
        if (isSmart) {
            if (conversions > 0) {
                configBidding.value = 'smart-with-data';
            } else {
                configBidding.value = 'smart-no-data';
            }
        } else {
            configBidding.value = 'cpc-manual';
        }

        // 4. Map Conversions tracking
        const configConversions = document.getElementById('config-conversions');
        if (conversions > 0) {
            configConversions.value = 'verified';
        } else {
            configConversions.value = 'basic'; // Assume basic active pixel but no conversion sales
        }

        // 5. Map Keywords match type default
        const configKeywords = document.getElementById('config-keywords');
        configKeywords.value = 'mixed'; // Default to mixed for API imports

        // 6. Map Metrics values into Calculator inputs
        document.getElementById('metric-impressions').value = impressions;
        document.getElementById('metric-clicks').value = clicks;
        document.getElementById('metric-cost').value = cost.toFixed(2);
        document.getElementById('metric-conversions').value = conversions;

        // PROGRAMMATICALLY TRIGGER CALCULATOR AND SCORE COMPILATION
        this.runConfigAudit();
        this.runMetricsAudit();
        this.updateChecklist();

        // Finish synchronization
        this.showNotification(`Campaña "${campaignObj.name}" sincronizada con éxito.`);
        this.navigateTo('dashboard');
    },

    // UI/UX Banner notification helpers
    showNotification(message, isError = false) {
        const banner = document.getElementById('notification-banner');
        const text = document.getElementById('notification-text');
        
        if (banner && text) {
            text.innerText = message;
            banner.className = `notification-banner ${isError ? 'error' : ''}`;
            banner.style.display = 'flex';
            
            // Auto hide
            setTimeout(() => {
                this.closeNotification();
            }, 6000);
        }
    },

    closeNotification() {
        const banner = document.getElementById('notification-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
};

// Start application when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

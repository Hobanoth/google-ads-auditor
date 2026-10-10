// Copys de Apex Blended School + decisiones creativas por anuncio.
// Marcado: [frase] = resaltado · *texto* = negritas (en tarjetas)
// meta = metáfora visual del gancho · deco = cómo se resalta la frase clave
(function (root) {
  const COPIES = [
    {
      id: '01_adaptacion', name: 'Adaptación',
      hook: '¿Y si la educación se adaptara a [tu hijo] y no al revés?', deco: 'underline',
      meta: { type: 'shapes', piece: 'star' },
      tab: 'En Apex',
      items: [
        { card: 'target', text: 'Aprendizaje *personalizado*' },
        { card: 'duo', text: 'Acompañamiento *real*' },
        { card: 'steps', text: 'Desarrollo a *su propio ritmo*' },
      ],
      cta: 'Agenda tu visita',
    },
    {
      id: '02_cada_alumno_importa', name: 'Cada alumno importa',
      hook: '¿Quieres una escuela donde tu hijo [realmente importe]?', deco: 'marker',
      meta: { type: 'spotlight', variant: 'basic' },
      tab: 'En Apex',
      items: [
        { card: 'group', text: '*Grupos reducidos*' },
        { plus: true },
        { card: 'heart', text: 'Atención *personalizada*' },
        { st: 'Una educación que [conoce y potencia] sus capacidades.' },
      ],
      cta: 'Conoce Apex',
    },
    {
      id: '03_ritmo_propio', name: 'Ritmo propio',
      hook: '¿Tu hijo aprende mejor cuando puede avanzar a [su propio ritmo]?', deco: 'underline',
      meta: { type: 'lockstep', variant: 'flag' },
      tab: 'En Apex,',
      items: [
        { st: 'su aprendizaje [se adapta a él].' },
        { card: 'compass', text: '*Orientación*' },
        { card: 'duo', text: '*Acompañamiento*' },
        { card: 'star', text: '*Confianza*' },
      ],
      cta: 'Agenda una visita',
    },
    {
      id: '04_no_ser_uno_mas', name: 'No ser uno más',
      hook: '¿Buscas una escuela donde tu hijo no sea simplemente [uno más]?', deco: 'circle',
      meta: { type: 'spotlight', variant: 'crowd' },
      tab: 'En Apex',
      items: [
        { card: 'heart', text: 'Atención *cercana*' },
        { card: 'target', text: 'Aprendizaje *personalizado*' },
        { card: 'duo', text: 'Acompañamiento *real*' },
      ],
      cta: 'Descubre Apex',
    },
    {
      id: '05_potencial', name: 'Potencial',
      hook: '¿Qué podría lograr tu hijo con una educación [pensada para él]?', deco: 'marker',
      meta: { type: 'growth' },
      tab: 'En Apex',
      items: [
        { st: 'Potenciamos su [crecimiento]' },
        { card: 'book', text: '*Académico*' },
        { card: 'heart', text: '*Emocional*' },
        { card: 'group', text: '*Social*' },
      ],
      cta: 'Conoce nuestro modelo educativo',
    },
    {
      id: '06_aprender_con_confianza', name: 'Aprender con confianza',
      hook: '¿Te gustaría que tu hijo aprendiera con [más confianza]?', deco: 'underline',
      meta: { type: 'steps' },
      tab: 'En Apex',
      items: [
        { card: 'shield', text: 'Un entorno *seguro*' },
        { card: 'target', text: 'Atención *personalizada*' },
        { card: 'steps', text: 'Acompañamiento *en cada etapa*' },
      ],
      cta: 'Agenda tu visita',
    },
    {
      id: '07_forma_de_aprender', name: 'Forma de aprender',
      hook: '¿Y si el problema no fuera aprender, sino [cómo le enseñan]?', deco: 'marker',
      meta: { type: 'shapes', piece: 'star' },
      tab: 'En Apex',
      items: [
        { st: 'adaptamos la educación a [las necesidades de cada alumno].' },
        { icons: ['target', 'sliders', 'star'] },
      ],
      cta: 'Conoce nuestro modelo',
    },
    {
      id: '08_educacion_tradicional', name: 'Educación tradicional',
      hook: '¿Tu hijo necesita [algo diferente] a la educación tradicional?', deco: 'marker',
      meta: { type: 'desks' },
      tab: 'En Apex',
      items: [
        { card: 'sliders', text: 'Aprendizaje *adaptativo*' },
        { card: 'group', text: 'Grupos *reducidos*' },
        { card: 'duo', text: 'Acompañamiento *personalizado*' },
      ],
      cta: 'Descubre Apex',
    },
    {
      id: '09_conocerlo', name: 'Conocerlo',
      hook: '¿Puede una escuela enseñar mejor cuando [realmente conoce] a tu hijo?', deco: 'underline',
      meta: { type: 'spotlight', variant: 'glass' },
      tab: 'En Apex,',
      items: [
        { st: 'cada alumno [importa].' },
        { card: 'compass', text: 'Lo *orientamos*' },
        { card: 'duo', text: 'Lo *acompañamos*' },
        { card: 'star', text: 'Impulsamos *su potencial*' },
      ],
      cta: 'Agenda una visita',
    },
    {
      id: '10_experiencia_escolar', name: 'Experiencia escolar',
      hook: '¿Quieres que aprender vuelva a ser [emocionante] para tu hijo?', deco: 'circle',
      meta: { type: 'bookburst' },
      tab: 'En Apex',
      items: [
        { st: 'Una educación [personalizada, cercana] y adaptada a su forma de aprender.' },
        { icons: ['target', 'heart', 'sliders'] },
      ],
      cta: 'Conoce Apex',
    },
    {
      id: '11_comparacion', name: 'Comparación',
      hook: '¿Por qué todos deberían aprender [exactamente de la misma manera]?', deco: 'marker',
      meta: { type: 'lockstep', variant: 'basic' },
      tab: 'En Apex,',
      items: [
        { st: 'cada alumno tiene [su propio proceso].' },
        { card: 'target', text: 'Educación *personalizada*' },
        { plus: true },
        { card: 'duo', text: 'Acompañamiento *real*' },
      ],
      cta: 'Descubre nuestro modelo',
    },
    {
      id: '12_necesidades_individuales', name: 'Necesidades individuales',
      hook: '¿La escuela de tu hijo se adapta realmente a [sus necesidades]?', deco: 'underline',
      meta: { type: 'shapes', piece: 'heart' },
      tab: 'En Apex',
      items: [
        { st: 'diseñamos una experiencia de aprendizaje [pensada para cada alumno].' },
        { icons: ['target', 'heart', 'star'] },
      ],
      cta: 'Agenda tu visita',
    },
  ];
  if (typeof module !== 'undefined') module.exports = COPIES; else root.APEX_COPIES = COPIES;
})(this);

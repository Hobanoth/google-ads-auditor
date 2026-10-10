// Copys de Colegio Estefanía + decisiones creativas por anuncio.
// Fuente: los 6 anuncios con leads en la cuenta "CE Anuncios" (act_335878212617696), últimos 60 días al 9-oct-2026.
// Todo el texto sale de su texto principal, su título o el texto del creativo; no se agregó ninguna afirmación.
// Marcado: [frase] = resaltado · *texto* = negritas (en tarjetas)
// meta = metáfora visual del gancho · deco = cómo se resalta la frase clave
(function (root) {
  const COPIES = [
    { // "Preescolar • Sus primeros pasos" — 24 leads
      id: '01_primeros_pasos', name: 'Primeros pasos',
      hook: '¿Quieres que tu hijo descubra el mundo [con confianza]?', deco: 'underline',
      meta: { type: 'bookburst' },
      tab: 'En Estefanía',
      items: [
        { st: 'Cuando un niño se sabe amado, [se atreve a explorar].' },
        { icons: ['heart', 'compass', 'star'] },
      ],
      cta: 'Conoce nuestro proyecto educativo',
    },
    { // "Secundaria • Descubren" — 24 leads
      id: '02_esta_etapa', name: 'Esta etapa',
      hook: '¿Buscas una secundaria que entienda [esta etapa] tan importante?', deco: 'marker',
      meta: { type: 'spotlight', variant: 'basic' },
      tab: 'En Estefanía',
      items: [
        { card: 'heart', text: 'Acompañamos su *desarrollo emocional*' },
        { plus: true },
        { card: 'book', text: '*Herramientas sólidas* para su futuro' },
      ],
      cta: 'Conoce nuestro enfoque educativo',
    },
    { // "Primaria • Aquí aprenden" — 18 leads
      id: '03_su_ritmo', name: 'Su ritmo',
      hook: '¿Buscas una primaria donde tu hijo encuentre [su ritmo de aprendizaje]?', deco: 'marker',
      meta: { type: 'lockstep', variant: 'flag' },
      tab: 'En Estefanía,',
      items: [
        { st: 'cada niño descubre sus [talentos únicos].' },
        { card: 'target', text: 'Pensamiento *crítico*' },
        { card: 'group', text: 'Trabajo *en equipo*' },
        { card: 'star', text: 'Seguridad para *expresar sus ideas*' },
      ],
      cta: 'Visítanos',
    },
    { // "Secundaria • Estático" — 14 leads, el CPL más bajo de la ventana
      id: '04_valorado', name: 'Valorado y respaldado',
      hook: '¿Qué pasa cuando un adolescente se siente [valorado y respaldado]?', deco: 'marker',
      meta: { type: 'growth' },
      tab: 'En Estefanía,',
      items: [
        { st: 'el bienestar emocional es [el motor de su aprendizaje].' },
        { card: 'shield', text: 'Explora con *seguridad*' },
        { card: 'heart', text: 'Descubre sus pasiones *sin miedo*' },
        { card: 'star', text: 'Aprende con *confianza*' },
      ],
      cta: 'Agenda tu visita',
    },
    { // "Preescolar • Estático" — 10 leads
      id: '05_colegio_adecuado', name: 'El colegio adecuado',
      hook: '¿Qué hace que un colegio sea [el adecuado] para tu hijo?', deco: 'circle',
      meta: { type: 'steps' },
      tab: 'En Estefanía,',
      items: [
        { st: 'somos [tus aliados].' },
        { card: 'compass', text: 'Comunicación *abierta y constante*' },
        { card: 'duo', text: 'Acompañamiento *académico y emocional*' },
      ],
      cta: 'Agenda tu visita',
    },
    { // "Primaria • Estático" — 7 leads
      id: '06_seguro_y_apoyado', name: 'Seguro y apoyado',
      hook: '¿Quieres que tu hijo se sienta [seguro y apoyado] en su aprendizaje?', deco: 'underline',
      meta: { type: 'spotlight', variant: 'glass' },
      tab: 'En Estefanía,',
      items: [
        { st: 'nos tomamos el tiempo para [conocer a tu hijo].' },
        { card: 'target', text: 'Cómo *aprende*' },
        { card: 'heart', text: 'Qué le *apasiona*' },
        { card: 'steps', text: 'Dónde puede *crecer más*' },
      ],
      cta: 'Agenda tu visita',
    },
  ];
  if (typeof module !== 'undefined') module.exports = COPIES; else root.APEX_COPIES = COPIES;
})(this);

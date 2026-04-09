import type { Question } from './types'

const questions: Question[] = [
  // ── MOTOR DE CRECIMIENTO ─────────────────────────────────────────────
  // G1 — Infraestructura de Datos de Clientes
  { id: 'g_1_1', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 1,
    text: '¿Qué tan completa es la captura de identidad de clientes en todos los puntos de contacto de compra e interacción (online, tienda física, app, servicio al cliente)?' },
  { id: 'g_1_2', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 2,
    text: '¿Cuentas con un registro unificado de cliente que consolide comportamiento, transacciones y datos demográficos en un solo perfil?' },
  { id: 'g_1_3', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 3,
    text: '¿Qué tan maduros son tus prácticas de gobernanza de datos de clientes — gestión de consentimientos, estándares de calidad de datos y políticas de retención?' },
  { id: 'g_1_4', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 4,
    text: '¿En qué medida los equipos de marketing y comercio pueden acceder de forma autónoma a los datos de clientes para segmentación y análisis, sin depender del equipo de tecnología?' },

  // G2 — Segmentación y Personalización
  { id: 'g_2_1', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 1,
    text: '¿Qué tan granulares y dinámicos son tus segmentos de clientes — se actualizan en tiempo real según el comportamiento, o se refrescan manualmente de forma periódica?' },
  { id: 'g_2_2', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 2,
    text: '¿En qué grado tu sitio web, app o tienda ofrece contenido personalizado, recomendaciones de producto o precios diferenciados para distintos segmentos de clientes?' },
  { id: 'g_2_3', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 3,
    text: '¿Con qué sistematicidad pruebas variantes de personalización (A/B o multivariable) y mides su impacto en ingresos?' },
  { id: 'g_2_4', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 4,
    text: '¿Puedes ejecutar una nueva campaña personalizada para un segmento específico en un día hábil, sin requerir trabajo técnico significativo?' },

  // G3 — Marketing de Ciclo de Vida y Retención
  { id: 'g_3_1', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 1,
    text: '¿Tienes etapas de ciclo de vida del cliente definidas y automatizadas (nuevo, activo, en riesgo, inactivo) con comunicaciones activadas para cada transición?' },
  { id: 'g_3_2', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 2,
    text: '¿Qué tan sofisticada es tu predicción de churn — usas modelos predictivos para identificar clientes en riesgo antes de que se vayan, o reaccionas después del hecho?' },
  { id: 'g_3_3', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 3,
    text: '¿Qué tan bien mides y gestionas activamente el valor de vida del cliente (LTV) como métrica principal del negocio, por canal y cohorte?' },
  { id: 'g_3_4', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 4,
    text: '¿Con qué consistencia ejecutas programas de recuperación de clientes inactivos, y puedes medir su contribución incremental en ingresos?' },

  // G4 — Optimización de Canales Pagados y Propios
  { id: 'g_4_1', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 1,
    text: '¿Qué tan conectada está tu inversión en medios pagados (Google, Meta, etc.) con datos propios de clientes para segmentación de audiencias, exclusión y modelado de audiencias similares?' },
  { id: 'g_4_2', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 2,
    text: '¿Cuentas con un modelo de atribución documentado en el que tu equipo está alineado y usa para tomar decisiones de inversión por canal — más allá del último clic?' },
  { id: 'g_4_3', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 3,
    text: '¿Con qué sistematicidad optimizas la cadencia de envío de email y SMS, la entregabilidad y el contenido en función de métricas de engagement e ingresos?' },
  { id: 'g_4_4', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 4,
    text: '¿En qué medida gestionas tu presencia y desempeño en canales de marketplace (Amazon, MercadoLibre, etc.) con analítica estructurada, estrategias de precio y optimización de listings?' },

  // G5 — Analítica de Ingresos y Pronóstico
  { id: 'g_5_1', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 1,
    text: '¿Puedes reportar ingresos por canal, segmento, categoría y cohorte a demanda, sin necesidad de armar datos manualmente?' },
  { id: 'g_5_2', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 2,
    text: '¿Con qué precisión pronostica tu empresa los ingresos de corto plazo (semanal/mensual) y mediano plazo (trimestral), y ese pronóstico se usa operativamente?' },
  { id: 'g_5_3', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 3,
    text: '¿Haces seguimiento y tomas acciones sobre indicadores adelantados de ingresos (tasa de abandono de carrito, conversión de navegación a compra, tasa de recompra) además de las ventas históricas?' },
  { id: 'g_5_4', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 4,
    text: '¿Qué tan madura es tu inteligencia de precios — modelas activamente la elasticidad de precio, monitoreas los precios de la competencia y usas datos para tomar decisiones de pricing sistemáticas en todo tu catálogo?' },

  // ── MOTOR DE EFICIENCIA ──────────────────────────────────────────────
  // E1 — Gobernanza de Datos y Fuente Única de Verdad
  { id: 'e_1_1', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 1,
    text: '¿Qué tan bien mantiene tu organización una fuente única de verdad para las métricas clave del negocio — todos los equipos (finanzas, marketing, operaciones) trabajan con los mismos datos, o los silos de hojas de cálculo generan contradicciones?' },
  { id: 'e_1_2', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 2,
    text: '¿Tienes documentados los responsables de datos — está claro quién es accountable de la exactitud y gobernanza de cada dominio de datos crítico en tu negocio?' },
  { id: 'e_1_3', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 3,
    text: '¿En qué medida pueden tus equipos comerciales y operacionales acceder y consultar datos del negocio de forma autónoma, sin depender de TI o de un equipo de ingeniería de datos para extraer reportes?' },
  { id: 'e_1_4', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 4,
    text: '¿Qué tan madura es tu arquitectura de datos — cuentas con una infraestructura estructurada y escalable (data warehouse, data lake o equivalente) que soporte el crecimiento de tus necesidades analíticas?' },

  // E2 — Confianza y Calidad de Datos
  { id: 'e_2_1', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 1,
    text: '¿Qué tan seguros están tus equipos en la exactitud de los datos que usan diariamente — las decisiones se retrasan o se cuestionan por dudas sobre la confiabilidad de los datos?' },
  { id: 'e_2_2', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 2,
    text: '¿Tienes monitoreo automatizado para detectar errores en datos, fallas en pipelines o anomalías antes de que lleguen a los reportes y generen errores operacionales o financieros?' },
  { id: 'e_2_3', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 3,
    text: '¿Con qué sistematicidad mides y haces seguimiento de métricas de calidad de datos (completitud, exactitud, oportunidad, consistencia) en tus fuentes de datos críticas?' },
  { id: 'e_2_4', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 4,
    text: 'Cuando se detectan problemas de calidad de datos, ¿con qué rapidez y confiabilidad identifica tu organización la causa raíz y previene que el mismo error se repita?' },

  // E3 — Adopción de IA y Automatización
  { id: 'e_3_1', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 1,
    text: '¿En qué medida ha adoptado tu organización herramientas de IA — inteligencia artificial generativa, modelos predictivos o agentes inteligentes — en los flujos de trabajo comerciales u operacionales del día a día?' },
  { id: 'e_3_2', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 2,
    text: '¿Con qué seguridad y sistematicidad aplican tus equipos IA sobre datos internos de la empresa — cuentas con políticas claras de uso de IA, controles de acceso a datos y validación de resultados?' },
  { id: 'e_3_3', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 3,
    text: '¿Cuántos de tus procesos repetitivos y de alto volumen (reportes, captura de datos, aprobaciones, comunicaciones con clientes) han sido automatizados o identificados formalmente como candidatos a automatización?' },
  { id: 'e_3_4', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 4,
    text: '¿Qué tan capaz es tu organización de evaluar, pilotear y escalar nuevas herramientas de IA o automatización — cuentas con la madurez técnica y la gestión del cambio necesaria para moverse con rapidez?' },

  // E4 — Eficiencia de Procesos y Rentabilidad
  { id: 'e_4_1', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 1,
    text: '¿Con qué sistematicidad identificas, cuantificas y eliminas el desperdicio operacional — los cuellos de botella en tus procesos clave se miden y se reducen activamente?' },
  { id: 'e_4_2', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 2,
    text: '¿Tienes objetivos de eficiencia documentados y medibles (tiempos de ciclo, tasas de error, costo por transacción) para tus procesos comerciales y operacionales más críticos?' },
  { id: 'e_4_3', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 3,
    text: '¿En qué medida las mejoras de eficiencia operacional se traducen en ganancias de rentabilidad medibles — haces seguimiento del impacto financiero de los cambios en procesos?' },
  { id: 'e_4_4', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 4,
    text: '¿Qué tan estructurado es tu enfoque para priorizar qué procesos mejorar — usas datos y modelado de ROI para seleccionar proyectos de mejora, o las decisiones están impulsadas por la urgencia y la intuición?' },

  // E5 — Escalabilidad Operacional
  { id: 'e_5_1', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 1,
    text: '¿Qué tan bien escala tu capacidad operacional con la demanda — puedes manejar incrementos de volumen significativos (picos estacionales, fases de crecimiento) sin aumentos proporcionales en personal o costo?' },
  { id: 'e_5_2', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 2,
    text: '¿En qué medida están estandarizados tus procesos operacionales clave y pueden ser ejecutados por un nuevo integrante sin depender del conocimiento tribal concentrado en pocas personas clave?' },
  { id: 'e_5_3', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 3,
    text: '¿Qué tan resiliente es tu operación ante disrupciones — tienes procesos de respaldo documentados, sistemas redundantes y rutas de escalamiento claras cuando los flujos críticos fallan?' },
  { id: 'e_5_4', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 4,
    text: '¿Con qué deliberación planifica tu organización la capacidad operacional — tienes un roadmap prospectivo para escalar infraestructura, sistemas y personas por delante de la demanda?' },

  // ── MOTOR DE ADAPTABILIDAD ───────────────────────────────────────────
  // A1 — Stack Tecnológico e Integración
  { id: 'a_1_1', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 1,
    text: '¿Qué tan integrados están tus sistemas de comercio principales (plataforma de e-commerce, OMS, ERP, WMS, CRM) — ¿comparten datos en tiempo casi real o se reconcilian manualmente?' },
  { id: 'a_1_2', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 2,
    text: '¿Cuánta deuda técnica o dependencia de sistemas legados frena tu capacidad de lanzar nuevas funcionalidades o modificar las existentes?' },
  { id: 'a_1_3', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 3,
    text: '¿Tienes documentados el ownership de sistemas, los contratos de API y los mapas de integración, o la arquitectura solo la entienden unas pocas personas clave?' },
  { id: 'a_1_4', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 4,
    text: '¿Qué tan capaz es tu equipo de evaluar, incorporar y reemplazar proveedores tecnológicos en un plazo razonable (por ejemplo, una nueva plataforma en menos de 12 meses)?' },

  // A2 — Documentación y Estandarización de Procesos
  { id: 'a_2_1', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 1,
    text: '¿Qué proporción de tus procesos operacionales críticos (merchandising, fulfillment, ejecución de marketing, servicio al cliente) están documentados de forma suficiente para que un nuevo empleado pueda seguirlos?' },
  { id: 'a_2_2', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 2,
    text: '¿Tienes una cadencia estructurada de revisión de procesos con un responsable claro de identificar y eliminar cuellos de botella?' },
  { id: 'a_2_3', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 3,
    text: '¿Con qué consistencia siguen tus equipos los procesos documentados en lugar de improvisar — y se mide o se hace cumplir el apego a los procesos?' },
  { id: 'a_2_4', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 4,
    text: 'Cuando un proceso falla o genera un error, ¿qué tan maduro es el análisis de causa raíz y la práctica de acciones correctivas?' },

  // A3 — Alineación Organizacional y Velocidad de Decisión
  { id: 'a_3_1', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 1,
    text: '¿Tienes marcos de toma de decisiones claros (ej. RACI) para las decisiones transversales clave en merchandising, marketing y operaciones?' },
  { id: 'a_3_2', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 2,
    text: '¿Cuánto tiempo toma típicamente desde identificar una oportunidad comercial hasta tener una prueba o iniciativa en el mercado?' },
  { id: 'a_3_3', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 3,
    text: '¿Qué tan alineadas están tus áreas comercial, marketing, tecnología y operaciones en torno a objetivos compartidos — y con qué frecuencia las prioridades en conflicto generan retrasos en la ejecución?' },
  { id: 'a_3_4', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 4,
    text: '¿Qué tan efectivamente comunica el liderazgo las prioridades estratégicas, y los equipos en niveles inferiores entienden cómo su trabajo se conecta con los objetivos de la empresa?' },

  // A4 — Cultura de Datos y Adopción de Herramientas
  { id: 'a_4_1', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 1,
    text: '¿Qué proporción de las decisiones operacionales se toman revisando datos relevantes versus basándose en intuición o anécdotas?' },
  { id: 'a_4_2', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 2,
    text: '¿Los equipos comerciales de primera línea (compradores, marketers, gerentes de tienda) tienen acceso autónomo a dashboards y reportes sin depender de los equipos de datos o analítica?' },
  { id: 'a_4_3', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 3,
    text: '¿Con qué consistencia se adoptan nuevas herramientas y plataformas en los equipos — tienes un proceso estructurado de gestión del cambio para los lanzamientos tecnológicos?' },
  { id: 'a_4_4', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 4,
    text: '¿Qué tan bien identifica y actúa tu organización ante problemas de calidad de datos antes de que generen errores en reportes u operaciones?' },

  // A5 — Gestión del Cambio y Mejora Continua
  { id: 'a_5_1', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 1,
    text: '¿Tu organización tiene un enfoque estructurado para gestionar el cambio — con comunicación a stakeholders, capacitación y seguimiento de adopción integrados en los planes de proyecto?' },
  { id: 'a_5_2', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 2,
    text: '¿Con qué consistencia realizan los equipos retrospectivas o post-mortems sobre iniciativas y aplican los aprendizajes a trabajos futuros?' },
  { id: 'a_5_3', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 3,
    text: '¿Qué tan seguros se sienten los empleados para plantear problemas operacionales o proponer cambios — y con qué rapidez se evalúan las buenas ideas y se decide probarlas o descartarlas?' },
  { id: 'a_5_4', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 4,
    text: '¿Qué tan bien equilibra tu organización la ejecución confiable de las operaciones actuales con la prueba y adopción simultánea de nuevas capacidades?' },
]

export default questions

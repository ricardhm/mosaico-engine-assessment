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
    text: '¿En qué medida gestionas los canales orgánicos (SEO, contenido, redes sociales) con un calendario editorial estructurado y metas de conversión medibles?' },

  // G5 — Analítica de Ingresos y Pronóstico
  { id: 'g_5_1', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 1,
    text: '¿Puedes reportar ingresos por canal, segmento, categoría y cohorte a demanda, sin necesidad de armar datos manualmente?' },
  { id: 'g_5_2', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 2,
    text: '¿Con qué precisión pronostica tu empresa los ingresos de corto plazo (semanal/mensual) y mediano plazo (trimestral), y ese pronóstico se usa operativamente?' },
  { id: 'g_5_3', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 3,
    text: '¿Haces seguimiento y tomas acciones sobre indicadores adelantados de ingresos (tasa de abandono de carrito, conversión de navegación a compra, tasa de recompra) además de las ventas históricas?' },
  { id: 'g_5_4', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 4,
    text: '¿Qué tan madura es la cultura de experimentación de tu empresa — realizan pruebas controladas con rigor estadístico sobre precios, promociones y cambios en el sitio/app?' },

  // ── MOTOR DE EFICIENCIA ──────────────────────────────────────────────
  // E1 — Planificación de Inventario y Demanda
  { id: 'e_1_1', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 1,
    text: '¿Con qué precisión pronostica tu proceso de planificación de demanda a nivel de SKU, por ubicación y canal, considerando estacionalidad, promociones y tendencias?' },
  { id: 'e_1_2', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 2,
    text: '¿Tienes lógica automatizada de reposición (puntos de reorden, fórmulas de stock de seguridad) o los compradores deciden manualmente cuándo y cuánto pedir?' },
  { id: 'e_1_3', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 3,
    text: '¿Qué tan bien mides y reduces activamente los costos de inventario inmovilizado, el stock muerto y las tasas de marcación a la baja en tu surtido?' },
  { id: 'e_1_4', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 4,
    text: '¿En qué medida está conectada tu planificación de inventario con los tiempos de entrega de proveedores y el proceso de órdenes de compra en un solo flujo de trabajo?' },

  // E2 — Gestión de Proveedores y Compras
  { id: 'e_2_1', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 1,
    text: '¿Tienes scorecards de desempeño documentados para tus principales proveedores que cubran puntualidad de entrega, tasa de cumplimiento, tasa de defectos y cumplimiento de precios?' },
  { id: 'e_2_2', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 2,
    text: '¿Con qué sistematicidad negocias y revisas los contratos con proveedores — realizas benchmarking de precios contra el mercado de forma programada?' },
  { id: 'e_2_3', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 3,
    text: '¿En qué medida has diversificado tu base de proveedores para reducir la dependencia de fuente única en productos de alto volumen o alto margen?' },
  { id: 'e_2_4', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 4,
    text: '¿Qué tan integrados están tus procesos de órdenes de compra, recepción y conciliación de facturas — y cuánto esfuerzo manual requieren?' },

  // E3 — Eficiencia de Fulfillment y Logística
  { id: 'e_3_1', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 1,
    text: '¿Tienes visibilidad del costo total de fulfillment por pedido (picking, packing, envío, última milla) desglosado por canal y transportista?' },
  { id: 'e_3_2', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 2,
    text: '¿Con qué sistematicidad optimizas la selección de transportistas, la consolidación de zonas y el embalaje para reducir los costos de envío por unidad?' },
  { id: 'e_3_3', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 3,
    text: '¿Qué tan maduro es tu proceso de gestión de devoluciones — mides las tasas de devolución por SKU y causa raíz, y reduces sistemáticamente las devoluciones prevenibles?' },
  { id: 'e_3_4', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 4,
    text: 'Si operas bodegas o puntos de venta físicos, ¿qué tan eficientemente están distribuidos y dotados de personal en relación con los estándares de productividad?' },

  // E4 — Márgenes de Producto y Disciplina de Surtido
  { id: 'e_4_1', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 1,
    text: '¿Tienes visibilidad en tiempo real o casi en tiempo real del margen bruto por SKU, categoría y canal — incluyendo todos los costos variables?' },
  { id: 'e_4_2', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 2,
    text: '¿Con qué sistematicidad racionalizas tu surtido — eliminando SKUs de bajo margen y baja rotación para reducir los costos de complejidad?' },
  { id: 'e_4_3', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 3,
    text: '¿Tienes una estrategia de promociones disciplinada que modele el impacto en márgenes antes de aprobar descuentos, o las promociones se guían principalmente por intuición o presión competitiva?' },
  { id: 'e_4_4', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 4,
    text: '¿Qué tan bien gestionas los aumentos de precio de costo de proveedores — tienes un proceso formal para evaluar el impacto y decidir si absorberlo, trasladarlo al cliente o renegociarlo?' },

  // E5 — Datos Operacionales y Visibilidad de Costos
  { id: 'e_5_1', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 1,
    text: '¿Con qué precisión asignas los costos indirectos (overhead de bodega, servicio al cliente, plataformas tecnológicas) a productos o canales para entender la rentabilidad real?' },
  { id: 'e_5_2', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 2,
    text: '¿Cuentas con una fuente única de verdad para los KPIs operacionales (tasa de cumplimiento, OTIF, merma) que todos los equipos relevantes consultan?' },
  { id: 'e_5_3', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 3,
    text: '¿Qué tan bien comparten datos tus equipos de finanzas, comercial y operaciones, y están alineados en las mismas definiciones de margen y costo?' },
  { id: 'e_5_4', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 4,
    text: '¿Con qué frecuencia y confiabilidad produces reportes de gestión, y los líderes operacionales revisan los datos de margen en una cadencia semanal?' },

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

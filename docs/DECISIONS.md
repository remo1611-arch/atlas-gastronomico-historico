# Registro de decisiones

## ADR-001 — Reescritura gastronómica desde cero
**Aceptada.**
El Atlas Histórico Mundial anterior se conserva solo como antecedente conceptual. El nuevo proyecto tiene contratos y namespace propios.

## ADR-002 — Tiempo como eje primario
**Aceptada.**

## ADR-003 — `subject` no contiene una cronología universal
**Aceptada.**
La presencia histórica se modela mediante `occurrence`.

## ADR-004 — `occurrence` como unidad central
**Aceptada.**
Permite múltiples evidencias de un mismo ingrediente, técnica o plato en diferentes fechas y lugares.

## ADR-005 — Sin campo canónico `origin`
**Aceptada.**
Los orígenes se modelan mediante evidencias, hipótesis, domesticaciones, primeras atestiguaciones y eventos.

## ADR-006 — Fechas inciertas explícitas
**Aceptada.**
El motor puede normalizar rangos, pero la interfaz deberá conservar la precisión editorial.

## ADR-007 — Mapa moderno solo como contexto
**Aceptada.**

## ADR-008 — GitHub Pages como distribución principal
**Aceptada.**
Rutas relativas y `.nojekyll`.

## ADR-009 — Sin backend obligatorio
**Aceptada.**

## ADR-010 — Corpus semilla antes de corpus amplio
**Aceptada.**
Los ejemplos iniciales tensionan el modelo pero no se consideran verificados.

## ADR-011 — Civilizaciones como capa contextual
**Aceptada.**
Las civilizaciones, culturas, pueblos y entidades políticas se almacenan en `contexts.json` y se vinculan a evidencias gastronómicas mediante `contextRefs`. No se reintroduce el modelo de “civilización” como núcleo del Atlas.

## ADR-012 — Transformaciones científicas y tecnológicas
**Aceptada.**
Se crea `developments.json` para descubrimientos científicos, tecnologías alimentarias, aparatos, frío, energía, industria, envases y logística.

## ADR-013 — Seguridad e higiene como capa temática
**Aceptada.**
Higiene, seguridad alimentaria, salud pública, regulación y sistemas de calidad son developments con una capa visual propia.

## ADR-014 — Cache busting obligatorio
**Aceptada.**
CSS, JS y todos los datos cargados dinámicamente deben llevar identificador de versión en cada release de GitHub Pages. `app.js` debe versionar también su importación de `core.js`.

## ADR-015 — Tema claro como identidad propia
**Aceptada.**
El modo claro no es una inversión cromática del oscuro. Usa una paleta editorial cálida, manteniendo semántica de categorías y contraste.

## ADR-016 — No overflow horizontal de página
**Aceptada.**
En móvil, solo pueden desplazarse horizontalmente componentes explícitos como leyendas o atajos. La página, paneles, títulos, grids y toolbars no deben ampliar el viewport.

## ADR-017 — Un solo estado de filtro por tipo
**Aceptada.**
Chips, tarjetas-resumen y selector del drawer controlan `s.category`. Se elimina el estado paralelo `s.subjectType` para impedir filtros contradictorios silenciosos.

## ADR-018 — Registros sin punto siguen siendo visibles
**Aceptada.**
La ausencia de coordenadas no invalida una evidencia. El registro permanece en lista/fichas y la interfaz informa de que no puede situarse cartográficamente. No se inventa un punto.

## ADR-019 — Rutas museográficas aplazadas
**Aceptada.**
Las rutas guiadas serán una capa editorial distinta del grafo histórico. No se crea schema hasta disponer de corpus G2 suficiente para diseñarlo con casos reales.

## ADR-020 — G1 cerrado
**Aceptada.**
Tras validación real en Xiaomi 15 y suite alpha.5, el motor/UX base de G1 queda cerrado. Nuevos cambios se justifican por necesidades de datos reales de G2.

## ADR-021 — reviewed ≠ verified
**Aceptada.**
La primera incorporación sustentada pasa a `reviewed`. `verified` exige una segunda revisión explícita y, cuando sea viable, contraste independiente.

## ADR-022 — Migración de seeds por deprecación
**Aceptada.**
Los IDs demo no se renombran ni eliminan: se marcan `deprecated` y apuntan a `supersededBy`.

## ADR-023 — Procedencia cartográfica separada
**Aceptada.**
`place.point` puede contener `precision`, `sourceRefs` y `note` propios para separar colocación del mapa de evidencia histórica.

## ADR-024 — Equipamiento de conservación separado de cocción
**Aceptada.**
El corpus G2 demuestra que `cooking_appliance` no describe adecuadamente frigoríficos y equipamiento de almacenamiento. Se añade `food_storage_appliance`. La taxonomía evoluciona por necesidades de casos reales, no por anticipación especulativa.

## ADR-025 — Impactos conservadores
**Aceptada.**
Un hito de invención/patente no hereda automáticamente impactos propios de la adopción posterior. Por ejemplo, la patente de refrigeración mecánica se marca `enables`; la implantación de cadena de frío deberá modelarse con developments/occurrences propios.

## ADR-026 — Verification metadata obligatorio
**Aceptada.**
Todo `verified` conserva dentro del dato la fecha, método, nota y fuentes de segunda revisión.

## ADR-027 — Regiones sin falso punto
**Aceptada.**
Kuyavia y el marco inglés de The Forme of Cury permanecen sin coordenadas hasta disponer de una representación espacial canónica adecuada.

## ADR-028 — Domesticación como proceso
**Aceptada.**
El caso de Ganj Dareh confirma que manejo, diferenciación genética y morfología doméstica deben poder representarse por separado.

## ADR-029 — Textos culinarios no equivalen a dieta general
**Aceptada.**
Un recetario cortesano demuestra tradición textual/culinaria en ese contexto, no consumo generalizado de toda la sociedad.

## ADR-030 — Historia del elemento como vista derivada
**Aceptada.**
El recorrido de un subject se construye en tiempo de ejecución a partir de occurrences y developments relacionados. No se crea un fichero duplicado de hitos.

## ADR-031 — Historia no exhaustiva
**Aceptada.**
La UI debe advertir que el recorrido representa el corpus disponible y que un vacío temporal no significa ausencia histórica.

## ADR-032 — `storage` como occurrenceType
**Aceptada.**
Tel Kabri demuestra que almacenamiento puede ser la afirmación histórica principal y merece un tipo distinto de producción, consumo o comercio.

## ADR-033 — Descubrimiento automático de recorridos
**Aceptada.**
“Historias disponibles” se genera desde subjects con al menos dos occurrences reviewed/verified. No contiene IDs hardcodeados.

## ADR-034 — Navegador temporal semántico
**Aceptada.**
La línea temporal incorpora un mapa de actividad con capas diferenciadas para evidencias, events y developments. No se añaden etiquetas permanentes a cada hito.

## ADR-035 — Densidad adaptativa
**Aceptada.**
Las occurrences reviewed/verified se agregan en bins adaptativos (móvil/tablet/escritorio) para que el sistema escale a corpus grandes. Las occurrences `verified` pueden sobresalir individualmente.

## ADR-036 — Events como intervalos
**Aceptada.**
Un event de varios años se visualiza como banda temporal. El ancho mínimo visual no modifica el dato histórico; solo garantiza seleccionabilidad.

## ADR-037 — Navegador temporal filtrado
**Aceptada.**
El mapa temporal refleja búsqueda y filtros activos. Se evita que la línea sugiera hitos que la vista principal ha excluido.

## ADR-038 — Navegación anterior/siguiente
**Aceptada.**
Se incorporan acciones discretas de hito anterior/siguiente para resolver selección precisa en móvil sin ampliar artificialmente los marcadores.

## ADR-039 — Cronología única
**Aceptada.**
El navegador semántico de alpha.10 sustituye al slider HTML anterior. No conviven dos líneas temporales.

## ADR-040 — Eliminación del step-by-year
**Aceptada.**
Se eliminan ±1/10/100/500 años. La navegación discreta se realiza por hitos históricos anterior/siguiente.

## ADR-041 — Eliminación del playback cronológico
**Aceptada.**
Se elimina el play automático y `playStep`. Si existe un futuro modo autoplay será un recorrido museográfico por hitos, no una iteración matemática de años.

## ADR-042 — Arrastre diferido
**Aceptada.**
Durante pointer drag se actualiza únicamente la capa visual de fecha/cursor; el render completo se ejecuta al confirmar el pointerup para mantener fluidez al escalar el corpus.

## ADR-043 — Cursor accesible
**Aceptada.**
El cursor temporal expone `role=slider`; teclado izquierda/derecha navega por hitos y Home/End por extremos temporales.

## ADR-044 — Timeline magnética
**Aceptada.**
La cronología se interpreta como navegador del corpus. Tap/release selecciona el hito visible más próximo.

## ADR-045 — Rango preservado
**Aceptada.**
Una pulsación dentro de un event/development conserva la posición temporal pulsada dentro de su intervalo real. El inicio se usa solo como punto convencional cuando se navega por “hito siguiente/anterior”.

## ADR-046 — Año exacto como acción explícita
**Aceptada.**
“Ir al año”, Home/End y atajos editoriales no aplican magnetismo. Así se separa consultar una fecha exacta de explorar historia documentada.

## ADR-049 — Aceite de oliva como tercer recorrido
**Aceptada.**
Se usa `olive_oil` para probar el tercer recorrido longitudinal y cubrir simultáneamente el eje grasa/aceite.

## ADR-050 — Segunda revisión granular
**Aceptada.**
Verificar la entidad técnica `nixtamalization` no promueve automáticamente las occurrences de San Bartolo y La Corona. La verificación es granular.

## ADR-051 — Pimienta sin ruta inventada
**Aceptada.**
Berenike documenta comercio/presencia arqueobotánica de pimienta negra. No se proyecta una ruta cartográfica específica sin evidencia de cada trayecto.

## ADR-052 — No cerrar G2 con seeds visibles
**Aceptada.**
G2 no se cerrará formalmente mientras los seeds demostrativos restantes puedan confundirse con corpus histórico público.

## ADR-053 — Runtime exclusivamente reviewed/verified
**Aceptada.**
Al cierre de G2, los JSON cargados por la app contienen únicamente corpus público reviewed/verified. Esto previene fugas accidentales de seed/draft.

## ADR-054 — Archivo demo separado
**Aceptada.**
Los registros seed/deprecated del prototipo se trasladan a `data/archive/demo_records_pre_g2.json`. Se preservan para trazabilidad pero no se cargan en runtime.

## ADR-055 — Cierre y congelación de G2
**Aceptada.**
G2 queda cerrado en alpha.15. Durante G3, cualquier cambio estructural requiere caso real, ADR, migración y tests; aumentar el corpus no reabre G2.

## ADR-056 — Sin evidence score
**Aceptada.**
G3 no reduce certeza, precisión, estado editorial y cantidad de fuentes a una puntuación única. La evidencia se presenta multidimensionalmente.

## ADR-057 — Filtros G3 derivados del contrato existente
**Aceptada.**
Certeza, precisión cronológica y cobertura espacial se filtran usando campos existentes. No se modifica schema en G3-A.

## ADR-058 — Comparación descriptiva de fuentes
**Aceptada.**
La interfaz permite comparar tipo, procedencia, título y notas de fuentes, pero no las ordena mediante un ranking automático.

## ADR-059 — Unmapped como contenido accesible
**Aceptada.**
Los registros sin punto cartográfico se muestran y abren desde el propio bloque del mapa; la ausencia de coordenadas no los relega a un warning pasivo.

## ADR-060 — Fingerprint del contrato G2
**Aceptada.**
Schemas y taxonomía de G2 CLOSED se protegen con SHA-256. Un cambio posterior debe ser explícito y justificado.

## ADR-061 — Ventana temporal contextual
**Aceptada.**
El hito enfocado puede proyectar su intervalo real sobre la cronología principal. La proyección es solo lectura y no constituye un segundo selector.

## ADR-062 — Historia no proporcional con gaps explícitos
**Aceptada.**
La Historia del elemento mantiene tarjetas legibles y equidistantes, pero explicita la distancia o solapamiento entre hitos. Se evita un layout proporcional que sería inutilizable en recorridos de milenios.

## ADR-063 — Duración mediante ordinal histórico
**Aceptada.**
Las amplitudes y gaps se calculan con `toOrdinal()` para conservar la regla de ausencia de año 0.

## ADR-064 — Disputed sin ganador
**Aceptada.**
La UI puede profundizar en fuentes y posiciones de un desacuerdo, pero no inferirá una posición preferida ni un score de consenso.

## ADR-065 — Explorar no es un dashboard
**Aceptada.**
La superficie principal se reduce a Tiempo → Mapa → En esta fecha. Métricas y diagnósticos dejan de ocupar bloques permanentes.

## ADR-066 — Historias como experiencia independiente
**Aceptada.**
Los recorridos longitudinales pasan a una vista propia `Historias`, manteniendo el motor genérico.

## ADR-067 — Evidence Lens bajo demanda
**Aceptada.**
Evidence Lens permanece funcional, pero se mueve al drawer de Filtros como `Resumen de la selección`.

## ADR-068 — Procesos y cambios unificados
**Aceptada.**
Events y developments se muestran juntos mediante un disclosure contextual. Las entidades y datasets siguen separados.

## ADR-069 — Overview de evidencia minimalista
**Aceptada.**
La tarjeta principal no repite reviewed/verified, precisión y cartografía completa. Solo destaca incertidumbre relevante; el detalle completo vive en la ficha.

## ADR-070 — Límite editorial de resultados
**Aceptada.**
`En esta fecha` muestra cuatro resultados prioritarios y revela el resto bajo demanda, evitando que el crecimiento del corpus convierta la home en una lista infinita.

## ADR-071 — Pan como etiqueta pública con ID estable
**Aceptada.**
`bread_like_flatbread` conserva su ID para no romper referencias, pero su etiqueta pública pasa a `Pan`. La descripción mantiene explícitamente la distinción entre categoría editorial y restos arqueológicos `bread-like`.

## ADR-072 — Dossiers antes que carga masiva
**Aceptada.**
La expansión post-G3 se organiza por historias longitudinales coherentes. Alpha.20 prueba el patrón con pan antes de avanzar hacia 50–70 occurrences.

## ADR-073 — Gates cerrados compatibles con crecimiento
**Aceptada.**
Los tests de G3 dejan de exigir conteos globales exactos. Protegen sus decisiones y mínimos de cierre, permitiendo crecimiento posterior del corpus.

## ADR-074 — Regulación medieval sin falsa fecha única
**Aceptada.**
La Assisa Panis se representa mediante un intervalo 1248–1266 que conserva la evidencia de prácticas anteriores a la fecha impresa convencional de 1266.

## ADR-075 — Chorleywood como development
**Aceptada.**
El proceso Chorleywood es una transformación industrial que impacta al subject pan; no se fuerza a occurrence ni se le asigna un lugar histórico único.

## ADR-076 — Historias como entrada principal
**Aceptada.**
La app abre en Historias. El Atlas pasa a ser una experiencia secundaria de exploración libre, no la carga inicial de significado del producto.

## ADR-077 — Stories como capa editorial referencial
**Aceptada.**
`stories.json` contiene narrativa y referencias a registros canónicos. No copia el contenido estructurado de occurrences/developments.

## ADR-078 — Schemas narrativos independientes
**Aceptada.**
Se añaden `story.schema.json` y `glossary.schema.json`. Los 8 schemas históricos y taxonomy del fingerprint G2 permanecen byte-identical.

## ADR-079 — Headline semántico en Atlas
**Aceptada.**
La timeline ya no usa `subject.name` como título de una occurrence. El headline expresa acción/tipo histórico + subject + lugar.

## ADR-080 — Binding real como gate de navegación
**Aceptada.**
La ausencia de listener táctil de anterior/siguiente en alpha.20 se considera fallo de QA. Las navegaciones primarias deben verificar binding explícito además del algoritmo.

## ADR-081 — Historia curada sobre secuencia automática
**Aceptada.**
Cuando un subject dispone de historia curada, la ficha abre esa visita. `openHistory()` se conserva para subjects sin narrativa editorial.


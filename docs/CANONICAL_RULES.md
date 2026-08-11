# Reglas canónicas

1. **El tiempo es el eje principal.**
2. **El espacio es el segundo eje.**
3. **Aplicación y corpus permanecen separados.**
4. `subject` describe qué se estudia; no prueba dónde/cuándo existió.
5. `occurrence` contiene la evidencia espacio-temporal.
6. No usar un único campo `origin` como verdad histórica.
7. “Primera evidencia conocida” ≠ “invención”.
8. “Domesticación” ≠ “primera recolección” ≠ “primer cultivo”.
9. “Difusión” debe sustentarse mediante ocurrencias/eventos, no con flechas dibujadas libremente.
10. Un plato puede tener antecedentes y variantes sin una fecha exacta de nacimiento.
11. Una receta textual no prueba por sí sola consumo generalizado.
12. Una evidencia arqueológica no prueba por sí sola una receta concreta.
13. Las denominaciones modernas deben distinguirse de las históricas.
14. Las regiones modernas del mapa son contexto, no fronteras gastronómicas históricas.
15. No inventar geometría histórica.
16. Las fechas aproximadas conservan su incertidumbre editorial.
17. No convertir siglos o rangos en años falsamente exactos para la interfaz.
18. Cada afirmación importante debe poder rastrearse a una o más fuentes.
19. `reviewed` y `verified` requieren fuentes.
20. Diferenciar evidencia, inferencia y tradición.
21. Las relaciones son datos independientes.
22. Las fuentes primarias históricas deben identificarse como tales y contextualizarse.
23. Las traducciones de textos históricos deben indicar edición/fuente cuando se incorporen.
24. Las imágenes necesitan procedencia y licencia.
25. No cargar masivamente el corpus antes de cerrar el contrato con casos heterogéneos.
26. Los IDs son estables.
27. Los cambios de contrato requieren decisión arquitectónica registrada.
28. Cada release pasa validación y manifiesto SHA-256.
29. GitHub Pages es la distribución principal.
30. Todas las rutas web críticas deben ser relativas y funcionar bajo `usuario.github.io/repositorio/`.
31. La exportación offline futura será derivada, nunca fuente canónica.
32. Nunca declarar “completo” el atlas: el corpus histórico es necesariamente abierto.

33. Las civilizaciones/culturas son **contexto**, no sujetos gastronómicos.
34. Asociar una evidencia a una civilización no implica atribuirle invención u origen.
35. Ciencia, tecnología, higiene y regulación se modelan como `development`.
36. La adopción de una tecnología puede ser gradual y regional: no asumir universalidad.
37. Un aparato o proceso tecnológico requiere separar invención, comercialización, adopción y generalización cuando las fuentes lo exijan.
38. Seguridad alimentaria debe distinguir descubrimiento científico, norma, sistema de control y práctica real.
39. Las capas visuales no alteran el significado de los datos.
40. Toda release debe versionar las URLs de CSS, JavaScript, JSON y GeoJSON para evitar mezclar recursos en caché.

41. En móvil se prohíbe el overflow horizontal de página; solo se admite en componentes declarados como carrusel/leyenda.
42. El modo claro debe conservar identidad museográfica propia y contraste suficiente; no será una inversión automática del modo oscuro.

43. `reviewed` exige fuentes válidas también en `subject` y `place`, no solo en occurrences.
44. `verified` requiere segunda revisión explícita; no equivale a “tiene una fuente”.
45. Una fuente cartográfica auxiliar no sustenta por sí sola una afirmación histórica.
46. Los registros `deprecated` permanecen en los datos pero no se muestran al público.
47. La migración de un ID seed a un ID canónico usa `supersededBy`; no se borra silenciosamente.
48. Un intervalo convertido desde `cal BP` conserva también la notación original.

49. Todo registro `verified` debe incluir `verification` con fecha, método, nota y `independentSourceRefs`.
50. Las fuentes de segunda revisión deben existir también en `sourceRefs` del registro.
51. Una región histórica no debe recibir un punto arbitrario solo para aparecer en el mapa.
52. Un texto culinario documenta un texto/receta, no la dieta general de toda la población.
53. La domesticación animal se modela como proceso: manejo, afinidad genética doméstica y cambio morfológico pueden ocurrir en momentos distintos.

54. “Historia del elemento” se deriva de occurrences y developments canónicos; no duplica hitos en otro dataset.
55. Un recorrido longitudinal no es exhaustivo: los vacíos entre hitos no implican ausencia histórica.
56. Solo `reviewed` y `verified` entran en recorridos públicos; `seed`, `draft` y `deprecated` quedan excluidos.
57. `storage` se usa cuando la evidencia documenta almacenamiento y no debe deformarse como producción o consumo.

54. `event` y `occurrence` no son intercambiables: un evento contextualiza procesos; una occurrence documenta una evidencia/manifestación concreta.
55. Historia del elemento puede combinar occurrence, event y development, pero debe etiquetar visualmente cada clase.
56. Un proceso de difusión transcontinental no implica una ruta única ni una fecha única.
57. Si la historiografía no permite establecer una ruta o mecanismo de introducción, la incertidumbre debe conservarse en `certainty` y en el texto público.
58. Introducción, cultivo, adopción y conversión en alimento básico son fases distintas.
59. Un evento demo sustituido se conserva como `deprecated + supersededBy`.

60. La línea temporal pública no debe convertirse en una nube de marcadores: las occurrences se agregan visualmente por densidad cuando sea necesario.
61. `seed` y `deprecated` no participan en el navegador temporal museográfico.
62. Los events con duración se representan como intervalos, no como puntos que inventen una fecha única.
63. Los developments se distinguen visualmente de events y occurrences.
64. El estado editorial y la certeza histórica deben conservarse también en las señales temporales.
65. El navegador temporal respeta los filtros activos y la búsqueda para evitar discrepancias entre lo que el usuario filtra y lo que la cronología sugiere.
66. Las marcas pequeñas pueden tener un área táctil mayor que su representación visual; accesibilidad y precisión de selección prevalecen sobre el tamaño aparente.

67. La interfaz pública tendrá una sola línea temporal principal; no se mantendrán selectores temporales paralelos.
68. El desplazamiento principal es histórico, no aritmético: anterior/siguiente navega por hitos, no por incrementos de años.
69. El usuario puede seleccionar una fecha arbitraria tocando o arrastrando sobre la cronología unificada.
70. Durante un arrastre se actualizan cursor y fecha sin reconstruir el corpus en cada movimiento; el render completo se confirma al soltar.
71. La reproducción automática por incrementos de años queda fuera del contrato público. Un futuro modo narrado deberá avanzar por hitos/escenas, no por pasos cronológicos ciegos.

72. La pulsación sobre la cronología pública selecciona el hito visible más próximo, no un año vacío arbitrario.
73. Durante drag el cursor puede explorar libremente, pero al soltar se ajusta al candidato histórico más próximo.
74. Si la pulsación cae dentro del intervalo real de un event/development, se conserva esa fecha dentro del intervalo; no se fuerza su inicio.
75. La entrada “Ir al año” y los atajos editoriales son los mecanismos explícitos para seleccionar fechas exactas sin contenido.
76. La distancia magnética se calcula en la misma escala ordinal temporal del Atlas y respeta la ausencia de año 0.

72. Una técnica culinaria documentada puede usar `technique_attestation`; no se fuerza dentro de producción/adopción si esas categorías cambian el significado.
73. Las relaciones `uses_technique` conectan subjects, pero la cronología del vínculo debe reflejar solo la evidencia incorporada, no una supuesta continuidad universal.
74. Una hipótesis sobre el origen de una técnica no genera una occurrence fechada si la fuente no aporta datación arqueológica suficiente.
75. `certainty: disputed` exige un objeto `dispute` con pregunta y al menos dos posiciones documentadas.
76. Las fuentes de cada posición disputed deben existir y formar parte de los `sourceRefs` del registro.
77. `status: reviewed` y `certainty: disputed` son compatibles: la revisión editorial certifica la calidad de representación del desacuerdo, no resuelve el desacuerdo.
78. La interfaz debe presentar las posiciones disputed de forma paralela, sin convertir la redacción editorial en árbitro del debate.
79. Evidencia, datación e inferencia causal/origen deben poder discutirse por separado dentro de un mismo caso.

79. El tercer recorrido longitudinal debe emerger del mismo motor genérico; no se admite código por subject.
80. Aceite de oliva se modela separando producción, almacenamiento y comercio; la evidencia temprana no equivale a origen absoluto.
81. Una especia encontrada en un puerto documenta presencia/comercio en ese contexto; no autoriza a dibujar una ruta individual sin evidencia.
82. La segunda revisión puede verificar un subject o relationship sin verificar automáticamente todas sus occurrences.
83. Un gate de cobertura temática no justifica promociones editoriales: `reviewed` permanece válido cuando falta contraste independiente.

84. Al cerrar G2, el corpus runtime contiene exclusivamente registros `reviewed` o `verified`.
85. Los seeds y migraciones demo pre-G2 se conservan en `data/archive/` y no se cargan en la experiencia pública.
86. Un `draft`, `seed` o `deprecated` futuro no puede aparecer públicamente por defecto; `isPublicStatus()` actúa como gate defensivo.
87. El contrato de G2 queda congelado: cambios estructurales en G3 requieren caso real, ADR, migración y regresión.
88. Archivar un registro demo no equivale a borrarlo: su procedencia y `supersededBy` permanecen auditables.

89. Estado editorial, certeza histórica y precisión cronológica son dimensiones distintas y deben mostrarse separadas.
90. G3 no utilizará un score numérico opaco para resumir la calidad de una evidencia.
91. El número de fuentes no se interpreta automáticamente como mayor certeza; independencia, pertinencia y tipo de evidencia importan.
92. Los filtros de certeza y precisión operan sobre valores canónicos existentes; no transforman el dato para hacerlo encajar.
93. La ausencia de punto cartográfico es una propiedad de cobertura espacial, no una razón para ocultar el registro histórico.
94. La comparación de fuentes es descriptiva, no un ranking.
95. El contrato G2 se protege mediante fingerprint de schemas y taxonomía durante G3.
96. Una explicación genérica del significado de `high/medium/disputed` no debe presentarse como rationale específico del registro.

97. La amplitud de un `period` debe poder leerse sin convertirla en una puntuación de calidad.
98. Una historia editorial con tarjetas equidistantes debe explicitar la distancia temporal entre hitos para no sugerir equidistancia histórica.
99. La distancia entre hitos se calcula desde el final del hito anterior hasta el inicio del siguiente, respetando solapamientos.
100. Las duraciones históricas usan ordinales sin año 0.
101. `circa`, `range`, `century`, `millennium` y fechas puntuales deben conservar diferencias visuales sin alterar el dato persistido.
102. Un caso `disputed` puede comparar posiciones y fuentes, pero no asignar ganador, preferencia o score de consenso automáticamente.
103. La revisión editorial correcta de un desacuerdo no equivale a resolverlo.

104. La experiencia principal no debe reproducir la estructura interna del modelo de datos como un dashboard.
105. `Explorar` prioriza únicamente tiempo, mapa y contenido relevante de la fecha.
106. La profundidad técnica se ofrece mediante divulgación progresiva: filtros, details, drawers y fichas.
107. `Historias` constituye una experiencia propia y no una sección secundaria añadida al final de Explorar.
108. No coexistirán filtros rápidos redundantes con el drawer de filtros cuando ambos controlen el mismo estado.
109. La lista principal mostrará un máximo editorial razonable antes de exigir una acción explícita para ver más.
110. En tarjetas de overview se priorizan excepciones interpretativas; estado editorial y metadatos completos pertenecen a la ficha.
111. La metodología permanente se concentra en Acerca del Atlas o ayudas contextuales, no en bloques repetidos de la home.
112. Procesos, eventos y transformaciones pueden compartir un disclosure contextual cuando su separación permanente genere ruido sin aportar una decisión distinta.

104. La cobertura cartográfica no es un objetivo porcentual: un registro puede permanecer sin punto si esa es la representación más rigurosa.
105. Toda auditoría espacial debe clasificar la decisión como punto documentado, región amplia o sitio concreto todavía no resuelto.
106. Una región amplia no recibe un centroide únicamente para aumentar el número de pines.
107. `reference` identifica un punto defendible de orientación y no debe comunicarse como coordenada exacta del hallazgo.
108. `exact_from_publication` significa que la coordenada fue publicada y reproducida; no implica precisión submétrica ni exactitud de cada evidencia asociada.
109. La procedencia de `place.point` se documenta separadamente de la procedencia histórica de la occurrence.
110. Una transformación de coordenadas entre CRS requiere método documentado, conservación de la referencia original y validación reproducible antes de incorporarse al corpus.
111. G3 puede cerrarse con registros sin geometría cuando cada ausencia ha sido auditada y justificada explícitamente.
112. Tras G3, no se añadirá UI técnica por defecto: el esfuerzo principal pasa a contenido y exploración, manteniendo divulgación progresiva.

113. Tras G3, el crecimiento del corpus se organiza prioritariamente por dossiers históricos coherentes, no por carga masiva de registros aislados.
114. Un gate cerrado es un baseline de regresión y no un techo numérico permanente para subjects, places, occurrences, developments o sources.
115. Los registros nuevos sin punto no invalidan la auditoría espacial G3-D; las decisiones de aquella auditoría se protegen sobre su subconjunto original.
116. Los huecos temporales de una historia se conservan cuando no existe evidencia suficiente; no se añaden hitos débiles para producir continuidad visual.
117. Un ID estable puede conservar una denominación histórica interna más estrecha que su etiqueta pública si cambiarlo rompería referencias; la ampliación semántica debe documentarse mediante ADR y no ocultar cautelas históricas.
118. “Pan” puede funcionar como categoría editorial longitudinal, pero cada occurrence debe mantener la terminología arqueológica prudente cuando la identificación sea `bread-like`.
119. Una historia gastronómica puede combinar evidencia directa del alimento, tecnología de producción, regulación y transformaciones industriales siempre que cada tipo conserve su naturaleza semántica.


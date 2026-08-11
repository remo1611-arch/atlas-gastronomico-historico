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

58. `event` y `occurrence` no son intercambiables: un evento contextualiza procesos; una occurrence documenta una evidencia/manifestación concreta.
59. Historia del elemento puede combinar occurrence, event y development, pero debe etiquetar visualmente cada clase.
60. Un proceso de difusión transcontinental no implica una ruta única ni una fecha única.
61. Si la historiografía no permite establecer una ruta o mecanismo de introducción, la incertidumbre debe conservarse en `certainty` y en el texto público.
62. Introducción, cultivo, adopción y conversión en alimento básico son fases distintas.
63. Un evento demo sustituido se conserva como `deprecated + supersededBy`.

64. La línea temporal pública no debe convertirse en una nube de marcadores: las occurrences se agregan visualmente por densidad cuando sea necesario.
65. `seed` y `deprecated` no participan en el navegador temporal museográfico.
66. Los events con duración se representan como intervalos, no como puntos que inventen una fecha única.
67. Los developments se distinguen visualmente de events y occurrences.
68. El estado editorial y la certeza histórica deben conservarse también en las señales temporales.
69. El navegador temporal respeta los filtros activos y la búsqueda para evitar discrepancias entre lo que el usuario filtra y lo que la cronología sugiere.
70. Las marcas pequeñas pueden tener un área táctil mayor que su representación visual; accesibilidad y precisión de selección prevalecen sobre el tamaño aparente.

71. La interfaz pública tendrá una sola línea temporal principal; no se mantendrán selectores temporales paralelos.
72. El desplazamiento principal es histórico, no aritmético: anterior/siguiente navega por hitos, no por incrementos de años.
73. El usuario puede seleccionar una fecha arbitraria tocando o arrastrando sobre la cronología unificada.
74. Durante un arrastre se actualizan cursor y fecha sin reconstruir el corpus en cada movimiento; el render completo se confirma al soltar.
75. La reproducción automática por incrementos de años queda fuera del contrato público. Un futuro modo narrado deberá avanzar por hitos/escenas, no por pasos cronológicos ciegos.

76. La pulsación sobre la cronología pública selecciona el hito visible más próximo, no un año vacío arbitrario.
77. Durante drag el cursor puede explorar libremente, pero al soltar se ajusta al candidato histórico más próximo.
78. Si la pulsación cae dentro del intervalo real de un event/development, se conserva esa fecha dentro del intervalo; no se fuerza su inicio.
79. La entrada “Ir al año” y los atajos editoriales son los mecanismos explícitos para seleccionar fechas exactas sin contenido.
80. La distancia magnética se calcula en la misma escala ordinal temporal del Atlas y respeta la ausencia de año 0.

81. Una técnica culinaria documentada puede usar `technique_attestation`; no se fuerza dentro de producción/adopción si esas categorías cambian el significado.
82. Las relaciones `uses_technique` conectan subjects, pero la cronología del vínculo debe reflejar solo la evidencia incorporada, no una supuesta continuidad universal.
83. Una hipótesis sobre el origen de una técnica no genera una occurrence fechada si la fuente no aporta datación arqueológica suficiente.
84. `certainty: disputed` exige un objeto `dispute` con pregunta y al menos dos posiciones documentadas.
85. Las fuentes de cada posición disputed deben existir y formar parte de los `sourceRefs` del registro.
86. `status: reviewed` y `certainty: disputed` son compatibles: la revisión editorial certifica la calidad de representación del desacuerdo, no resuelve el desacuerdo.
87. La interfaz debe presentar las posiciones disputed de forma paralela, sin convertir la redacción editorial en árbitro del debate.
88. Evidencia, datación e inferencia causal/origen deben poder discutirse por separado dentro de un mismo caso.

89. El tercer recorrido longitudinal debe emerger del mismo motor genérico; no se admite código por subject.
90. Aceite de oliva se modela separando producción, almacenamiento y comercio; la evidencia temprana no equivale a origen absoluto.
91. Una especia encontrada en un puerto documenta presencia/comercio en ese contexto; no autoriza a dibujar una ruta individual sin evidencia.
92. La segunda revisión puede verificar un subject o relationship sin verificar automáticamente todas sus occurrences.
93. Un gate de cobertura temática no justifica promociones editoriales: `reviewed` permanece válido cuando falta contraste independiente.

94. Al cerrar G2, el corpus runtime contiene exclusivamente registros `reviewed` o `verified`.
95. Los seeds y migraciones demo pre-G2 se conservan en `data/archive/` y no se cargan en la experiencia pública.
96. Un `draft`, `seed` o `deprecated` futuro no puede aparecer públicamente por defecto; `isPublicStatus()` actúa como gate defensivo.
97. El contrato de G2 queda congelado: cambios estructurales en G3 requieren caso real, ADR, migración y regresión.
98. Archivar un registro demo no equivale a borrarlo: su procedencia y `supersededBy` permanecen auditables.

99. Estado editorial, certeza histórica y precisión cronológica son dimensiones distintas y deben mostrarse separadas.
100. G3 no utilizará un score numérico opaco para resumir la calidad de una evidencia.
101. El número de fuentes no se interpreta automáticamente como mayor certeza; independencia, pertinencia y tipo de evidencia importan.
102. Los filtros de certeza y precisión operan sobre valores canónicos existentes; no transforman el dato para hacerlo encajar.
103. La ausencia de punto cartográfico es una propiedad de cobertura espacial, no una razón para ocultar el registro histórico.
104. La comparación de fuentes es descriptiva, no un ranking.
105. El contrato G2 se protege mediante fingerprint de schemas y taxonomía durante G3.
106. Una explicación genérica del significado de `high/medium/disputed` no debe presentarse como rationale específico del registro.

107. La amplitud de un `period` debe poder leerse sin convertirla en una puntuación de calidad.
108. Una historia editorial con tarjetas equidistantes debe explicitar la distancia temporal entre hitos para no sugerir equidistancia histórica.
109. La distancia entre hitos se calcula desde el final del hito anterior hasta el inicio del siguiente, respetando solapamientos.
110. Las duraciones históricas usan ordinales sin año 0.
111. `circa`, `range`, `century`, `millennium` y fechas puntuales deben conservar diferencias visuales sin alterar el dato persistido.
112. Un caso `disputed` puede comparar posiciones y fuentes, pero no asignar ganador, preferencia o score de consenso automáticamente.
113. La revisión editorial correcta de un desacuerdo no equivale a resolverlo.

114. La experiencia principal no debe reproducir la estructura interna del modelo de datos como un dashboard.
115. `Explorar` prioriza únicamente tiempo, mapa y contenido relevante de la fecha.
116. La profundidad técnica se ofrece mediante divulgación progresiva: filtros, details, drawers y fichas.
117. `Historias` constituye una experiencia propia y no una sección secundaria añadida al final de Explorar.
118. No coexistirán filtros rápidos redundantes con el drawer de filtros cuando ambos controlen el mismo estado.
119. La lista principal mostrará un máximo editorial razonable antes de exigir una acción explícita para ver más.
120. En tarjetas de overview se priorizan excepciones interpretativas; estado editorial y metadatos completos pertenecen a la ficha.
121. La metodología permanente se concentra en Acerca del Atlas o ayudas contextuales, no en bloques repetidos de la home.
122. Procesos, eventos y transformaciones pueden compartir un disclosure contextual cuando su separación permanente genere ruido sin aportar una decisión distinta.

123. La cobertura cartográfica no es un objetivo porcentual: un registro puede permanecer sin punto si esa es la representación más rigurosa.
124. Toda auditoría espacial debe clasificar la decisión como punto documentado, región amplia o sitio concreto todavía no resuelto.
125. Una región amplia no recibe un centroide únicamente para aumentar el número de pines.
126. `reference` identifica un punto defendible de orientación y no debe comunicarse como coordenada exacta del hallazgo.
127. `exact_from_publication` significa que la coordenada fue publicada y reproducida; no implica precisión submétrica ni exactitud de cada evidencia asociada.
128. La procedencia de `place.point` se documenta separadamente de la procedencia histórica de la occurrence.
129. Una transformación de coordenadas entre CRS requiere método documentado, conservación de la referencia original y validación reproducible antes de incorporarse al corpus.
130. G3 puede cerrarse con registros sin geometría cuando cada ausencia ha sido auditada y justificada explícitamente.
131. Tras G3, no se añadirá UI técnica por defecto: el esfuerzo principal pasa a contenido y exploración, manteniendo divulgación progresiva.

132. Tras G3, el crecimiento del corpus se organiza prioritariamente por dossiers históricos coherentes, no por carga masiva de registros aislados.
133. Un gate cerrado es un baseline de regresión y no un techo numérico permanente para subjects, places, occurrences, developments o sources.
134. Los registros nuevos sin punto no invalidan la auditoría espacial G3-D; las decisiones de aquella auditoría se protegen sobre su subconjunto original.
135. Los huecos temporales de una historia se conservan cuando no existe evidencia suficiente; no se añaden hitos débiles para producir continuidad visual.
136. Un ID estable puede conservar una denominación histórica interna más estrecha que su etiqueta pública si cambiarlo rompería referencias; la ampliación semántica debe documentarse mediante ADR y no ocultar cautelas históricas.
137. “Pan” puede funcionar como categoría editorial longitudinal, pero cada occurrence debe mantener la terminología arqueológica prudente cuando la identificación sea `bread-like`.
138. Una historia gastronómica puede combinar evidencia directa del alimento, tecnología de producción, regulación y transformaciones industriales siempre que cada tipo conserve su naturaleza semántica.

139. La experiencia pública principal se organiza como `Historias → Atlas → Evidencia`: entender, explorar y comprobar son responsabilidades distintas.
140. Una historia museística es una capa editorial que referencia registros canónicos mediante IDs; no duplica occurrences, events o developments.
141. Los schemas narrativos (`story`, `glossary`) se añaden sin modificar el contrato histórico congelado de G2.
142. Toda escena narrativa pública debe aportar orientación geográfica, contexto humano, explicación de método, límites de interpretación, relevancia histórica y transición hacia la siguiente pregunta.
143. El motor de historias debe ser genérico; no se permite lógica de render específica para Vino, Pan u otro subject.
144. En el Atlas, una occurrence se titula por la afirmación histórica que representa y no únicamente por el nombre repetido del subject.
145. Una navegación primaria necesita QA de binding entre control visible y acción; botón y algoritmo aislados no constituyen un gate funcional completo.
146. Cuando existe historia curada, la ficha del subject la prioriza; la secuencia técnica automática del corpus permanece como fallback para subjects sin historia editorial.
147. La integración de una nueva capa de producto no justifica ampliar simultáneamente el corpus: cambios de experiencia y expansión editorial se validan por separado.


148. El historial del navegador forma parte del contrato de navegación: Atrás/Adelante debe reconstruir vista y escena cuando exista una ruta interna.
149. Las rutas internas de Historias y Atlas deben ser recuperables mediante hash sin duplicar el corpus ni requerir rutas de servidor.
150. `Ver en el Atlas` desde una historia debe hacer visible la evidencia objetivo aunque filtros previos la oculten; los filtros incompatibles se ajustan explícitamente.
151. Un `event` o `development` abierto desde una historia debe quedar enfocado como hito temporal; cambiar únicamente el año no satisface la acción `Ver en el Atlas`.
152. La semántica de intervalo de `period` se aplica por igual a occurrences, events y developments: dentro del intervalo se conserva el año apuntado y fuera se ajusta al límite más cercano.
153. Anterior/Siguiente temporal navega respecto al hito seleccionado cuando existe, no solo respecto al año numérico, permitiendo recorrer hitos distintos con el mismo año inicial.
154. `CANONICAL_RULES.md` mantiene numeración única, estrictamente creciente y sin reutilizar números históricos.

155. El mapa público es un explorador geográfico del corpus y no una duplicación de la instantánea temporal: por defecto muestra las occurrences geolocalizadas que cumplen búsqueda/filtros aunque no estén activas en el año seleccionado.
156. La fecha seleccionada actúa como énfasis visual sobre el mapa; la semántica temporal estricta pertenece al panel `En esta fecha` y a la timeline.
157. La búsqueda del mapa es global respecto al corpus filtrado y no queda anulada por el año seleccionado.
158. Una búsqueda cartográfica debe mostrar resultados textuales o un estado cero explícito; modificar silenciosamente pines sin respuesta visible no es suficiente.
159. Las consultas cortas se resuelven por palabra o prefijo para evitar falsos positivos por subcadena, como `pan` dentro de `España`.
160. Seleccionar una occurrence desde el mapa sincroniza geografía, fecha y ficha de evidencia.
161. El autoencuadre del mapa sobre resultados o una selección es una ayuda de navegación visual y no constituye una ruta histórica, difusión ni conexión causal.
162. Los registros sin punto permanecen descubribles mediante búsqueda, cobertura y fichas; la ausencia de geometría no equivale a ausencia del corpus.
163. El mapa no dibuja líneas entre lugares únicamente por compartir subject, historia o secuencia cronológica; una ruta futura requerirá evidencia específica y su propia semántica.


# Roadmap por gates

## G0 — Contrato gastronómico
**Estado: CERRADO en 0.1.0-alpha.1**

- charter gastronómico;
- modelo subject/occurrence/place/event/relationship/source;
- política de fuentes;
- política cartográfica;
- GitHub Pages;
- schemas;
- validador;
- manifiesto;
- prototipo.

---

## G1 — Motor temporal gastronómico
**Estado: CERRADO**

Debe cerrar:

- navegación temporal sin año 0;
- búsqueda por subjects;
- filtro por tipo de subject;
- filtro por tipo de evidencia;
- filtro por región;
- mapa de ocurrencias;
- capa de civilizaciones/culturas; ✅ contrato alpha.3
- capa de ciencia/tecnología; ✅ contrato alpha.3
- capa de seguridad/higiene; ✅ contrato alpha.3;
- selección de ocurrencia;
- panel de subject;
- eventos próximos;
- densidad de marcadores;
- responsive;
- tema claro/oscuro;
- GitHub Pages.

---

## G1.2 — Integración de contexto e innovación
**Estado: CONTRATO CERRADO / contenido pendiente**

- `contexts.json`;
- `developments.json`;
- referencias desde occurrences/events;
- capas visuales;
- validación cruzada;
- sin contenido histórico inventado.

---

## G1.3 — Interaction & data hardening
**Estado: IMPLEMENTADO en alpha.5**

- filtro de tipo unificado;
- debounce de búsqueda;
- diagnóstico de registros sin coordenadas;
- transición visual de marcadores;
- reset completo de filtros;
- tests de regresión.

---

## G2 — Corpus piloto verificado
**Estado: CERRADO · alpha.15**

### Segunda revisión A
Promovidos a `verified`:
- maíz / Xihuatoxtla;
- garum / Pompeya;
- pasteurización;
- refrigeración mecánica Perkins;
- Monitor Top;
- HACCP.

Permanecen `reviewed`:
- vino neolítico;
- Shulaveri-Shomutepe;
- marco imperial romano occidental.

### Tanda B · reviewed
- cabra / Ganj Dareh;
- producto tipo pan / Shubayqa 1;
- queso/procesado lácteo / Kuyavia;
- The Forme of Cury;
- appertización;
- Codex Alimentarius.

### Tanda C · historia longitudinal
- historia del vino con 5 occurrences reviewed/verified; ✅
- pasteurización vinculada como development; ✅
- drawer “Historia del elemento”; ✅
- descubrimiento automático “Historias disponibles”; ✅
- nuevo occurrenceType `storage`; ✅

Pendiente:
- segunda revisión de la tanda B;
- ampliar grasas/aceites, especias, congelación, envases, inspección y regulación comparada;
- introducir casos con fuentes en conflicto;
- probar historia multi-occurrence de un mismo subject.

---
---

## G2-C — Segundo recorrido longitudinal
**Estado: IMPLEMENTADO · alpha.9**

Historia del maíz:
- Balsas/Xihuatoxtla;
- San Andrés;
- Paredones: presencia;
- Paredones: consumo;
- Grandes Lagos inferiores;
- evento transatlántico;
- África atlántica tropical;
- adopción cantábrica.

Motor:
- occurrence + event + development;
- incertidumbre visible;
- migración auditable de events seed.

Pendiente en G2:
- segunda revisión de tanda B/C;
- primer subject con técnica relacionada canónica;
- primer caso `disputed`;
- primer dossier/región histórica con geometría no puntual.

---

## G2-E — Navegador temporal museográfico
**Estado: IMPLEMENTADO · alpha.10**

- densidad de evidencias;
- occurrences verified destacadas;
- events como intervalos;
- developments como intervalos;
- cursor sincronizado;
- hito anterior/siguiente;
- preview del hito enfocado;
- filtros/búsqueda aplicados;
- mobile targets ampliados;
- reduced-motion.

Esta fase se adelanta antes de G2-D porque la usabilidad temporal debía quedar resuelta antes de aumentar el corpus.

## G2-F — Cronología unificada
**Estado: IMPLEMENTADO · alpha.11**

- eliminado slider temporal anterior;
- eliminados ± años;
- eliminado playback cronológico;
- navegador semántico convertido en selector temporal real;
- tap/click en fecha;
- drag táctil;
- cursor accesible;
- hito anterior/siguiente;
- atajos históricos e Ir al año conservados;
- render diferido durante drag.

La numeración G2-F refleja una intervención UX adelantada; no altera la secuencia de corpus pendiente.

## G2-G — Timeline magnética
**Estado: IMPLEMENTADO · alpha.12**

- snap al hito visible más próximo;
- preview magnético durante drag;
- eventos/rangos preservan posición interna;
- fecha exacta separada de exploración histórica.

## G2-D — Técnica canónica + primer disputed
**Estado: IMPLEMENTADO · alpha.13**

### Nixtamalización
- subject canónico reviewed;
- San Bartolo reviewed;
- La Corona reviewed;
- `technique_attestation`;
- relación `maize → uses_technique → nixtamalization`;
- técnica integrada en Historia del maíz;
- hipótesis ceniza→cal conservada sin fecha inventada.

### Primer disputed
- Gallina doméstica / El Arenal-1;
- `certainty: disputed`;
- posiciones favorables y críticas;
- fuentes separadas por interpretación;
- UI de debate abierto.

### Pendiente para cerrar G2
- segunda revisión de B/C/D;
- tercer recorrido longitudinal suficientemente distinto;
- aceite/grasa y especia;
- valorar al menos un caso disputed adicional de naturaleza no genética;
- gate final de corpus piloto.

---
---

## G2-H — Maduración final del piloto
**Estado: IMPLEMENTADO · alpha.14**

Segunda revisión:
- goat/Ganj Dareh → verified;
- Forme of Cury → verified;
- nixtamalization subject → verified;
- maize→nixtamalization relationship → verified;
- bread/cheese/chicken permanecen reviewed.

Tercer recorrido longitudinal:
- olive_oil;
- Kfar Samir;
- Ein Zippori;
- Monte Testaccio.

Cobertura nueva:
- grasa/aceite;
- especia: black_pepper / Berenike.

### Pendiente para cerrar G2
- eliminar de la experiencia pública los seeds demostrativos restantes o sustituirlos por casos canónicos;
- auditoría final de G2;
- congelar contrato antes de G3.

---

## G2-I — Gate final
**Estado: CERRADO · alpha.15**

- runtime reviewed/verified only;
- 34 registros demo archivados fuera de runtime;
- seed toggle eliminado;
- cinco seeds no canonizados preservados en archivo;
- tres historias longitudinales;
- disputed;
- técnica canónica;
- aceite/grasa;
- especia;
- timeline magnética;
- suite final G2 PASS.

Contrato G2 congelado.

---

## G3 — Evidencia y precisión
**Estado: CERRADO · alpha.19**



### G3-A — Evidencia y precisión
**Estado: IMPLEMENTADO · alpha.16**

- filtros de certeza;
- filtros de precisión cronológica;
- filtro mapped/unmapped;
- lente de evidencia;
- ficha semántica status/certainty/precision/spatial;
- comparación descriptiva de fuentes;
- registros sin punto accionables;
- fingerprint G2;
- cero cambios en schemas/taxonomía.

### G3-B — Cronología y desacuerdo
**Estado: IMPLEMENTADO · alpha.17**

- ventana temporal contextual del hito;
- point/range/circa/broad diferenciados;
- perfil de amplitud cronológica en ficha;
- gaps/solapamientos explícitos en Historia del elemento;
- precision + certainty en todos los tipos de hito;
- comparación documental avanzada de disputed;
- cero cambios de schema/taxonomy.

### G3-C — Focused Exploration
**Estado: IMPLEMENTADO · alpha.18**

- Explorar / Historias como experiencias separadas;
- home reducida a Tiempo → Mapa → En esta fecha;
- métricas repetidas eliminadas;
- Evidence Lens movida a Filtros;
- categorías rápidas duplicadas eliminadas;
- Transformaciones + Procesos fusionados bajo disclosure;
- metodología movida a Acerca del Atlas;
- overview limitado a 4 registros + `Ver más`;
- legacy HTML/JS/CSS eliminado.

### G3-D — Auditoría espacial
**Estado: CERRADO · alpha.19**

- 18 occurrences sin punto auditadas;
- 9 point_documented → mapped;
- 5 broad_region → permanecen sin punto;
- 4 specific_site_unresolved → permanecen sin punto;
- 15/24 occurrences públicas con punto;
- 9/24 sin punto, todas justificadas;
- cero centroides inventados;
- procedencia espacial separada de la evidencia histórica.

### Cierre G3

G3 queda congelado en alpha.19.

No se añade `certaintyRationale` ni otro campo nuevo porque el corpus actual no demuestra una necesidad suficiente para romper el contrato G2.

Las geometrías regionales se aplazan hasta disponer de casos que justifiquen áreas documentadas.

La siguiente prioridad es expansión editorial controlada antes de redes complejas.


## P1 — Narrative Museum
**Estado: INTEGRADO · alpha.22 · navegación endurecida · pendiente aceptación móvil**

Objetivo:
- convertir Historias en la entrada principal;
- separar museo, exploración y evidencia;
- integrar Vino y Pan con redacción narrativa completa;
- añadir stories/glossary como datos, no hardcode;
- corregir bindings táctiles de timeline;
- validar producto antes de seguir ampliando corpus.

### Gate de aceptación
No continuar E1 ni iniciar G4 hasta probar alpha.22 en dispositivo real.

## E1 — Expansión editorial controlada
**Estado: PAUSADO tras alpha.20 · esperando validación de P1**

Objetivo:
- pasar progresivamente de 24 a unas 50–70 occurrences de alta calidad;
- aumentar densidad temporal y espacial;
- construir historias que funcionen editorialmente;
- no iniciar redes complejas antes de tener corpus suficiente.

### E1-A — Pan
**IMPLEMENTADO · alpha.20**

- label pública `Pan` con ID estable;
- 7 occurrences;
- 1 development;
- Shubayqa;
- Çatalhöyük;
- Küllüoba;
- Parkhaus Opéra;
- Ain Sukhna;
- Saint-Memmie;
- regulación medieval inglesa;
- Chorleywood.

### Siguiente dossier
Elegir por rendimiento histórico/editorial, no por facilidad de carga.

Candidatos prioritarios:
- fermentación;
- azúcar;
- café;
- cacao/chocolate;
- patata.

Se priorizará el dossier que aporte simultáneamente:
- nuevos periodos;
- nuevos territorios;
- conexiones futuras útiles para G4;
- fuentes primarias académicas/institucionales fuertes.

---

### Alpha.22 — Navigation hardening
**IMPLEMENTADO · pendiente aceptación móvil**

- browser back/forward;
- deep links;
- Historia ↔ Atlas round-trip;
- direct evidence reveal;
- temporal interval semantics;
- selection-aware previous/next;
- canonical rule numbering normalized.

No añade corpus ni nueva historia.

---

## Geographic Explorer
**Estado: IMPLEMENTADO · alpha.23**

Contrato: mapa global filtrado + fecha como énfasis + `En esta fecha` temporal estricto + búsqueda global + autoencuadre + sincronización mapa/tiempo/ficha.

---

## Product Consolidation
**Estado: CERRADO · aceptación funcional y museográfica completada en alpha.27**

### Gate A — interacción real
Validar `docs/MOBILE_ACCEPTANCE_ALPHA24.md`. Sin contenido nuevo.

### Gate B — experiencia museográfica
Revisar solo Vino y Pan: ritmo, densidad, jerarquía visual, glosario, contexto geográfico, legibilidad móvil y aprendizaje. Sin historias nuevas.

### Gate C — congelación del contrato
Si A+B pasan, congelar formalmente: **Historias = comprender · Atlas = descubrir · Evidencia = verificar**. El motor debe seguir genérico.

### E1 — expansión editorial
Orden preferente: **Fermentación → Cacao/chocolate → Café → Azúcar → Patata → Especias/conservación**. Investigar primero relato, escenas, regiones, evidencias, transformaciones y fuentes; después incorporar registros.

### Objetivo intermedio
Referencia de **50–70 occurrences buenas**, no cuota rígida. Cada alta debe cubrir periodo, región, técnica, conexión futura o historia relevante.

### Auditoría espacial continua
Localizar solo con procedencia sólida; regiones pueden seguir sin pin; geometrías regionales reales cuando proceda; nunca centroides inventados.

### Entrada a G4
Solo con corpus suficiente. Distinguir **presencia → introducción → adopción → generalización**. No inferir flechas por coincidencia.

### Historias transversales
Con suficientes dossiers: conservación, fermentación→Pasteur, cultivos americanos en Europa, especias, grano→pan, ciudad medieval.

### Capa visual rica
Después de historias consolidadas y con procedencia/licencia clara.

### Beta
6–8 historias excelentes + Atlas denso + QA Android/iPhone/escritorio/impresión/accesibilidad/rendimiento/deep links/persistencia/GitHub Pages.

### 1.0
Sistema editorial y técnico cerrado; añadir historias no exige cambiar arquitectura; experiencia suficientemente rica para volver a utilizarla. Objetivo operativo tras congelación: ~20 % ingeniería / 80 % investigación, redacción y curación.

---

## G4 — Difusión y redes
**No iniciado**

- rutas;
- comercio;
- adopción;
- sustitución;
- intercambio colombino;
- diásporas;
- influencia culinaria.

---

## G5 — Recetas y textos históricos
**No iniciado**

- recetas como objetos documentales;
- edición;
- transcripción;
- traducción;
- ingredientes normalizados;
- técnicas relacionadas;
- contexto social.

---

## G6 — Dossiers temáticos
**No iniciado**

Ejemplos:
- Historia del pan;
- fermentaciones;
- especias;
- azúcar;
- chocolate;
- café;
- patata;
- cocina romana;
- alimentación medieval;
- Galicia gastronómica histórica.

---

## G7 — Primer corpus amplio
**No iniciado**

Solo tras G0–G6:
50–100 subjects verificados con cientos de ocurrencias.

---

## G8 — Escalado
**No iniciado**

- 250+ subjects;
- importadores;
- herramientas editoriales;
- QA por lotes;
- rendimiento.


---

## Extensión futura — Rutas museográficas y comparación
**No iniciada**

Se evaluará después de disponer de corpus G2/G3 suficiente:
- rutas editoriales guiadas;
- comparación de dos fechas;
- historias de un elemento;
- recorridos ciencia/tecnología/seguridad.

No bloquea G1 ni G2.

---

## Alpha.25 — Story Types
**Estado: CERRADO · contrato demostrado con Fermentación y congelado en alpha.27**

Objetivo: demostrar que Historias puede representar tanto recorridos monográficos como transversales sin modelar técnicas/procesos como subjects ficticios.

### Gate alpha.25
- Vino y Pan funcionan tras migrar a `storyType="subject"`.
- No existe `story.subjectRef` en datos, schema ni motor narrativo.
- El schema acepta una historia transversal sintética con `primarySubjectRef: null` y varios `relatedSubjectRefs`.
- La navegación desde una evidencia sigue priorizando la historia monográfica correspondiente.
- Deep links, Atrás Android y round-trip Historia ↔ Atlas mantienen comportamiento.

### Después
1. integrar Fermentación como primera historia `transversal`;
2. gate museográfico de Vino, Pan y Fermentación;
3. congelación formal del contrato de producto;
4. expansión editorial historia por historia.


## Alpha.26 — Primera historia transversal real
**Estado: IMPLEMENTADA TÉCNICAMENTE · pendiente aceptación Xiaomi/museográfica**

Objetivo: demostrar con Fermentación que el contrato transversal funciona con contenido heterogéneo real sin volver a rediseñar la aplicación.

### Integrado
- `story_fermentation` con 5 escenas.
- Jiahu y Xiaohe como nuevas evidencias arqueológicas seleccionadas.
- Pasteur 1857 y Hansen 1883 como developments científicos.
- Reutilización de vino de Georgia y pasteurización existente.
- Ningún renderer específico por historia.

### Gate alpha.26
- Vino y Pan no regresionan.
- Fermentación funciona de extremo a extremo en Android.
- El visitante comprende práctica empírica → explicación microbiana → control/reproducibilidad.
- Los registros no puntuales son comprensibles en mapa/escenas.
- No se introducen mitos de prioridad ni coordenadas inferidas.

### Después
1. gate museográfico conjunto Vino/Pan/Fermentación;
2. congelación formal del contrato de producto si pasa;
3. reanudación E1: Cacao/chocolate → Café → Azúcar → Patata → Especias/conservación;
4. G4 permanece bloqueado hasta disponer de corpus suficiente.


## Alpha.27 — Museographic Gate + Product Contract Freeze
**Estado: CERRADO**

- gate funcional alpha.26 aceptado en Xiaomi;
- gate museográfico Vino/Pan/Fermentación PASS;
- tiempos de visita ajustados a volumen real;
- contexto duplicado eliminado;
- cobertura cartográfica parcial visible;
- `relatedSubjectRefs` limitado a cobertura efectiva;
- diez schemas canónicos fingerprinted;
- arquitectura formalmente congelada.

### Regla posterior a alpha.27
Una nueva historia debe resolverse con el contrato actual. Cualquier ruptura de schema exige decisión, migración, tests y actualización explícita del fingerprint.

### Reanudación E1
**Cacao/chocolate → Café → Azúcar → Patata → Especias/conservación.**

Objetivo operativo: ~20 % ingeniería / 80 % investigación, redacción y curación.


## Alpha.28 — Cacao/chocolate
**Estado: IMPLEMENTADA · QA automatizado PASS · aceptación móvil pendiente**

Primera demostración editorial posterior al Product Contract Freeze.

### Integrado
- 5 escenas de Cacao/chocolate;
- alta Amazonía, Puerto Escondido, mundo maya clásico, circulación atlántica e industrialización;
- 1 subject, 7 places, 3 occurrences, 4 developments, 11 sources y 3 términos de glosario;
- ningún cambio en los diez schemas congelados ni lógica específica por historia.

### Reglas epistemológicas
- cacao no se usa como sinónimo automático de chocolate;
- evidencia más antigua conocida no se presenta como origen absoluto;
- la hipótesis de fermentación de pulpa en Puerto Escondido conserva su carácter interpretativo;
- prensa Van Houten 1828 se separa de la alcalinización/dutching posterior;
- no se canoniza una «primera tableta» dependiente de definición;
- Daniel Peter se formula como ensayos documentados desde 1875;
- conchado Lindt 1879 se explica sin necesitar la anécdota de la máquina olvidada.

### Gate
1. validar las 5 escenas en móvil;
2. comprobar ausencia de regresiones en Vino/Pan/Fermentación;
3. comprobar búsqueda `cacao` y `chocolate`;
4. comprobar mapas parciales/no puntuales;
5. si pasa, cerrar Cacao y continuar **Café → Azúcar → Patata → Especias/conservación**.

La regla post-freeze se mantiene: una nueva historia se resuelve con el contrato existente; romper schema requiere ADR, migración y actualización explícita del fingerprint.


## Alpha.29 — Café
**Estado: IMPLEMENTADA · QA automatizado PASS · aceptación móvil pendiente**

Segunda expansión editorial posterior al Product Contract Freeze.

### Integrado
- 5 escenas: Yemen, coffeehouse otomana, Oxford, Batavia y espresso;
- 1 subject, 5 places, 1 occurrence, 5 developments, 12 sources y 4 términos de glosario;
- ningún cambio en los diez schemas congelados ni lógica específica por historia.

### Reglas epistemológicas
- origen botánico ≠ origen documental de la bebida;
- Kaldi queda fuera del canon factual;
- Oxford conserva 1650/1651;
- el traslado a Java se contextualiza como proceso colonial;
- espresso se modela como evolución tecnológica multietapa.

### Después
1. aceptación móvil de Café y regresión de las cuatro historias previas;
2. **Azúcar → Patata → Especias/conservación**;
3. G4 continúa bloqueado hasta densidad y evidencia suficientes.

## Alpha.30 — Azúcar
**Estado: IMPLEMENTADA · QA automatizado PASS · aceptación móvil pendiente**

Tercera expansión editorial posterior al Product Contract Freeze.

### Integrado
- 5 escenas: Nueva Guinea, cristalización en Asia meridional, Mediterráneo/Madeira, sistema atlántico y remolacha europea;
- 1 subject, 6 places, 2 occurrences, 5 developments, 14 sources y 5 términos de glosario;
- ningún cambio en los diez schemas congelados ni lógica específica por historia.

### Reglas epistemológicas
- domesticación de caña ≠ fabricación de azúcar cristalizado;
- ca. 350 d. C. se trata como estimación historiográfica, no como fecha de invención;
- no se dibuja una ruta lineal de difusión no demostrada;
- plantación y esclavitud forman parte estructural de la expansión atlántica;
- Marggraf 1747 y Achard 1801 son hitos diferentes;
- remolacha no se presenta como sustitución inmediata de la caña.

### Después
1. aceptación móvil de Azúcar y regresión de las cinco historias previas;
2. **Patata → Especias/conservación**;
3. seguir aumentando densidad de corpus antes de G4.


## Alpha.31 — Patata
**Estado: IMPLEMENTADA · QA automatizado PASS · aceptación móvil pendiente**

Cuarta expansión editorial posterior al Product Contract Freeze.

### Integrado
- 5 escenas: Andes/Jiskairumoko, Canarias 1567, Herbón, Galicia 1736–1850 e Irlanda 1845–1852;
- 1 subject, 5 places, 3 occurrences, 4 developments, 11 sources y 4 términos de glosario;
- ningún cambio en los diez schemas congelados ni lógica específica por historia.

### Reglas epistemológicas
- domesticación ≠ primera evidencia arqueológica;
- primera presencia documental europea ≠ fecha exacta de llegada;
- ensayo en Herbón ≠ adopción continua;
- crisis de 1769–1770 acelera una adopción ya iniciada, no “introduce” por sí sola la patata;
- difusión gallega ≠ proceso uniforme;
- `Phytophthora infestans` explica el fracaso vegetal, no por sí solo la Gran Hambruna.

### Después
1. aceptación móvil de Patata y regresión de las seis historias previas;
2. **Especias/conservación**;
3. revisar densidad global del corpus y preparar historias transversales de segundo nivel antes de G4.


## Alpha.32 — Especias
**Estado: IMPLEMENTADA · QA automatizado PASS · aceptación móvil pendiente**

Quinta expansión editorial posterior al Product Contract Freeze y segunda historia transversal real.

### Integrado
- 5 escenas: Megiddo, Berenike, Europa medieval, Calicut y Banda;
- 2 subjects nuevos, 3 places, 2 occurrences, 3 developments, 9 sources y 4 términos de glosario;
- ningún cambio en los diez schemas congelados ni lógica específica por historia.

### Reglas epistemológicas
- evidencia de cúrcuma en Megiddo ≠ ruta comercial completa;
- Berenike ≠ origen del comercio índico de pimienta;
- propiedades antimicrobianas de especias ≠ explicación del consumo medieval;
- 1498 ≠ descubrimiento de un océano Índico desconectado;
- Banda productora ≠ violencia colonial: occurrence y development se modelan por separado;
- no se dibujan centroides para Europa medieval ni Banda.

### Después
1. aceptación móvil de Especias y regresión de las siete historias previas;
2. dossier transversal **Cómo aprendimos a conservar los alimentos**;
3. reutilizar occurrences/developments existentes antes de añadir hitos nuevos;
4. seguir aumentando densidad del corpus y evaluar cuándo G4 aporta valor real.

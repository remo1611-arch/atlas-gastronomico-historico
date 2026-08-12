# Changelog

## 0.1.0-alpha.28 — 2026-08-12

### Expansión editorial E1 — Cacao/chocolate
- Primera historia nueva creada después de congelar el contrato en alpha.27.
- 5 escenas: alta Amazonía, Puerto Escondido, mundo maya clásico, circulación atlántica e industrialización del siglo XIX.
- Nuevos registros: 1 subject, 7 places, 3 occurrences, 4 developments, 11 sources y 3 términos de glosario.
- Sin cambios en los 10 schemas congelados, navegación ni motor narrativo.
- Se evita canonizar “primer chocolate”, “primera tableta” o un único origen absoluto.
- Van Houten 1828 se limita al prensado; la alcalinización/dutching queda separada.
- Daniel Peter se formula como ensayos documentados desde 1875 para evitar una falsa fecha universal de invención.

### QA alpha.28
- Product Contract Freeze alpha.27 permanece intacto: 10/10 schemas sin cambios.
- Añade `test_cacao_chocolate_story.py`.
- Los tests de corpus se desacoplan de cantidades rígidas de alpha.27 y validan invariantes de crecimiento.
- Python `test_*.py`: 56/56 PASS; Node `test_*.mjs`: 5/5 PASS.
- Aceptación táctil/visual de alpha.28: pendiente.

## 0.1.0-alpha.27 — 2026-08-12

### Gate museográfico y congelación del producto
- Da por superado el gate funcional de alpha.26 en dispositivo real y ejecuta el gate museográfico conjunto de Vino, Pan y Fermentación.
- Congela formalmente **Historias = comprender · Atlas = descubrir · Evidencia = verificar**.
- Añade `PRODUCT_CONTRACT_FINGERPRINT.json` y `test_product_contract_freeze.py` para detectar cambios de schema no declarados.

### UX museográfica
- Corrige duraciones infraestimadas: Vino ~10 min, Pan ~10 min, Fermentación ~7 min.
- Elimina la tarjeta lateral de contexto, duplicada respecto al encabezado de cada escena.
- El mapa de escena informa cuando la cobertura es parcial; si no hay puntos, usa una explicación neutral y no presupone un lugar puntual.
- La última escena usa `Idea para llevarte` en vez de `Siguiente pregunta`.
- La rejilla de historias usa `auto-fit` para equilibrar tres visitas en escritorio.
- Fermentación elimina `bread_like_flatbread` de `relatedSubjectRefs` porque el recorrido actual no contiene evidencia panaria.

### QA
- Añade `test_museographic_gate.py`.
- El corpus histórico no cambia respecto a alpha.26.

## 0.1.0-alpha.26 — 2026-08-12

### Primera historia transversal real
- Integra `story_fermentation` con `storyType="transversal"`, `primarySubjectRef: null` y cuatro `relatedSubjectRefs`.
- Añade 5 escenas: Jiahu; diversidad Georgia/Xiaohe; Pasteur 1857; control del vino 1863–1865; Hansen 1883.
- El renderer sigue siendo genérico: no existe lógica específica de Fermentación en `app.js` o `core.js`.

### Corpus y evidencia
- Añade 1 subject (`mixed_fermented_beverage`), 2 places, 2 occurrences, 2 developments y 8 sources.
- Jiahu se cartografía con coordenadas publicadas en la literatura arqueológica; Xiaohe permanece deliberadamente sin punto.
- La definición de fermentación se generaliza y se añaden `levadura`, `bacterias_acido_lacticas`, `cultivo_puro` y `cultivo_iniciador` al glosario.
- Raqefet no se integra por la controversia interpretativa actual; no se etiqueta ningún pan antiguo como fermentado sin evidencia específica.

### QA
- Añade `test_fermentation_story.py` y actualiza baselines semánticos/espaciales.
- Python `test_*.py`: 53/53 PASS.
- Node `test_*.mjs`: 5/5 PASS.
- `validate_project.py`, JSON Schema y `node --check` de `app.js`/`core.js`: PASS.
- Gate táctil y museográfico en Xiaomi: pendiente.

## 0.1.0-alpha.25 — 2026-08-12

- Generaliza el contrato de Historias para soportar visitas monográficas (`subject`) y transversales (`transversal`).
- Elimina `story.subjectRef` sin conservar compatibilidad legacy.
- Migra Vino y Pan a `storyType`, `primarySubjectRef` y `relatedSubjectRefs`.
- Añade helpers genéricos para cobertura/prioridad de historias relacionadas con un subject.
- Actualiza schema y validador: una transversal exige `primarySubjectRef: null` y al menos dos subjects relacionados.
- Añade pruebas sintéticas que aceptan una historia transversal válida y rechazan contratos legacy o incompletos.
- No añade historias, occurrences ni fuentes: Fermentación permanece fuera hasta superar el gate móvil.

## 0.1.0-alpha.24.2 — 2026-08-11

- K1 de alineación de conocimiento con el temario: Codex pasa de una creación puntual en 1963 a la secuencia constitutiva 1961–1963.
- Se incorporan dos evidencias arqueobotánicas PNAS 2026 de *Triticum aestivum* en Shulaveris Gora y Gadachrili Gora, como subject independiente de Pan.
- Shulaveris Gora permanece deliberadamente sin punto cartográfico; no se infieren coordenadas.
- Nuevo test `test_k1_knowledge_alignment.py` y actualización de baselines de cobertura.
- Sin nuevas historias y sin cambios de arquitectura.

## 0.1.0-alpha.24.1 — 2026-08-11

- Hotfix de identificación de build: la etiqueta HTML inicial ya muestra `alpha.24.1` y coincide con `config.json`.
- Se actualizan los query strings de recursos a `0.1.0-alpha.24.1` para evitar reutilización de caché de alpha.24.
- Sin cambios de corpus, arquitectura ni comportamiento funcional.

## 0.1.0-alpha.24 — 2026-08-11

### Cobertura cartográfica multicapas
- `placeHasMapPoint()` centraliza la validez cartográfica.
- `firstMappablePlace()` sustituye el patrón «primer place existente» en las capas.
- contexts/developments activos sin punto dejan de omitirse sin explicación.
- el panel distingue evidencias del corpus sin punto de capas activas no puntuales.
- no se añaden centroides ni coordenadas artificiales.

### Robustez
- búsqueda de developments informa `con punto` / `sin punto único`;
- escenas separan lugar descriptivo de lugar cartografiable;
- `renderMapCoverage()` añade guard defensivo;
- `build_manifest.py` preserva `gate`/`phase` y toma la versión de `data/config.json`;
- tests de cobertura multicapas y estabilidad del manifiesto.

### Alcance
- corpus e historias sin cambios;
- G4 no iniciado;
- gate táctil/museográfico en Xiaomi pendiente.

## 0.1.0-alpha.23 — 2026-08-11

### Geographic Explorer
- el mapa deja de filtrar por año exacto;
- todas las occurrences geolocalizadas compatibles con búsqueda/filtros permanecen visibles;
- la fecha seleccionada se representa mediante énfasis visual;
- `En esta fecha` mantiene la semántica temporal estricta.

### Búsqueda
- búsqueda global independiente del año;
- resultados textuales con fecha, headline y lugar;
- estado cero explícito;
- click sincroniza fecha + mapa + ficha;
- consultas cortas usan palabra/prefijo;
- `pan` deja de coincidir con `España`.

### Navegación cartográfica
- autoencuadre de resultados;
- enfoque regional al seleccionar evidencia;
- botón `Mundo` para recuperar vista global;
- no se dibujan rutas o líneas inferidas.

### Baseline que motivó el cambio
- 30 occurrences públicas;
- 16 con punto;
- en 1500: 1 occurrence activa y 0 con punto;
- la semántica anterior producía un mapa vacío pese a existir 16 lugares cartografiados.

### Contrato
- corpus histórico sin cambios;
- stories/glossary sin cambios;
- G2 fingerprint intacto;
- reglas canónicas 1–163.

## 0.1.0-alpha.22 — 2026-08-11

### Navegación y continuidad
- rutas `#historias`, `#historia/<id>/<escena>`, `#atlas/evidencia/<id>`, `#atlas/hito/<kind>/<id>` y `#atlas/fecha/<año>`;
- restauración mediante historial del navegador;
- volver desde Atlas recupera la escena narrativa previa;
- deep links cargan la vista correspondiente.

### Historia → Atlas
- una occurrence abierta desde una historia no puede quedar oculta por filtros anteriores;
- filtros incompatibles se ajustan para mostrar la evidencia solicitada;
- events/developments se enfocan en la timeline, no solo cambian el año.

### Timeline
- ranges de occurrences conservan el año apuntado dentro del intervalo;
- fuera del intervalo se ajustan al límite más cercano;
- anterior/siguiente usa el hito seleccionado cuando existe y permite recorrer varios hitos con la misma fecha inicial.

### QA
- navigation algorithms;
- Story ↔ Atlas roundtrip;
- route data;
- canonical rule numbering;
- tests previos actualizados a alpha.22.

### Higiene contractual
- `CANONICAL_RULES.md` renumerado de forma única y consecutiva;
- corpus sin cambios;
- G2 fingerprint intacto.

## 0.1.0-alpha.21 — 2026-08-11

### Product Reset integrado
- Historias pasa a ser la entrada principal.
- Atlas pasa a exploración libre secundaria.
- Evidencia conserva profundidad académica bajo demanda.

### Narrative Museum
- `data/stories.json`;
- `data/glossary.json`;
- `story.schema.json`;
- `glossary.schema.json`;
- motor genérico de escenas;
- Historia del vino: 6 escenas;
- Historia del pan: 7 escenas;
- 16 términos de glosario.

### Atlas
- headlines semánticos de occurrences;
- deja de repetirse el subject como único título de hito.

### Bugfix
- `Hito anterior` y `Hito siguiente` reciben binding táctil real.

### QA
- narrative museum contract;
- narrative editorial depth;
- primary navigation bindings;
- Atlas semantic headlines;
- schema validation ampliada a 10 schemas.

### Corpus histórico
- sin cambios respecto a alpha.20.
- G2 fingerprint 9/9 intacto.

## 0.1.0-alpha.20 — 2026-08-11

### Expansión editorial E1-A
- primer dossier post-G3: Pan;
- `bread_like_flatbread` conserva ID y pasa a label pública `Pan`;
- 6 nuevas occurrences;
- 1 nuevo development;
- 6 nuevos places;
- 11 nuevas sources.

### Historia del pan
- Shubayqa;
- Çatalhöyük;
- Küllüoba;
- Parkhaus Opéra;
- Ain Sukhna;
- Saint-Memmie;
- regulación inglesa medieval;
- Chorleywood 1961.

Total:
- 7 occurrences;
- 1 transformation;
- ca. 12.450 a.C. → 1961.

### Cartografía
- Çatalhöyük incorpora coordenadas UNESCO;
- no se inventan puntos para los otros nuevos sitios;
- runtime: 16 mapped / 14 unmapped.

### QA
- nuevos gates editoriales de pan;
- G3 spatial/final gates convertidos en baselines compatibles con crecimiento;
- G2 fingerprint intacto.

### Dirección
- G4 sigue sin iniciarse;
- expansión editorial continuará antes de redes complejas.

## 0.1.0-alpha.19 — 2026-08-11

### Gate
- **G3 CLOSED**.

### Auditoría espacial
- 18 occurrences originalmente sin punto auditadas;
- 9 pasan a tener punto documentado;
- 5 regiones amplias permanecen sin punto;
- 4 occurrences de tres sitios concretos permanecen sin punto por resolución insuficiente;
- cobertura: 6/24 → 15/24 occurrences con punto.

### Procedencia espacial
Nuevas referencias para:
- Ganj Dareh;
- Areni-1;
- Tel Kabri;
- Jerusalem / City of David;
- San Bartolo;
- La Corona;
- Kfar Samir;
- Monte Testaccio;
- Berenike.

### Política
- no centroides de regiones;
- `reference` separado de `exact_from_publication`;
- no conversión ad hoc de cuadrículas arqueológicas;
- unmapped puede ser resultado correcto.

### Contrato
- schemas sin cambios;
- taxonomy sin cambios;
- fingerprint G2 9/9.

### Dirección
Tras G3: contenido antes que más UI.

## 0.1.0-alpha.18 — 2026-08-11

### Focused Exploration
- nueva navegación Explorar / Historias;
- home reducida a Tiempo → Mapa → En esta fecha;
- cronología visualmente aligerada;
- Periodos e Ir al año pasan a disclosures;
- filtros rápidos duplicados eliminados del mapa;
- cobertura sin punto convertida en señal compacta;
- Evidence Lens movida a Filtros;
- overview de evidencias limitado a 4 + Ver más;
- Transformaciones + Procesos y cambios fusionados;
- Historias pasa a vista propia;
- metodología trasladada a Acerca del Atlas.

### Limpieza
- museum rail eliminado;
- category summary eliminado;
- context dashboard eliminado;
- transformation/event standalone sections eliminadas;
- method note eliminada;
- CSS y bindings legacy retirados.

### Datos / contrato
- corpus sin cambios;
- schemas sin cambios;
- taxonomy sin cambios;
- G2 fingerprint intacto.

## 0.1.0-alpha.17 — 2026-08-11

### G3-B · Cronología
- ventana temporal contextual en Unified/Magnetic Timeline;
- representación diferenciada point/range/circa/broad;
- perfil cronológico en ficha;
- amplitud calculada con ordinal histórico;
- gaps/solapamientos explícitos entre hitos de Historia del elemento;
- precision + certainty visibles en todos los tipos de hito.

### G3-B · Disputed
- resumen de posiciones;
- fuentes únicas y compartidas;
- perfil documental por posición;
- comparación desplegable de fuentes;
- neutralidad editorial explícita.

### Contrato
- taxonomy sin cambios;
- schemas sin cambios;
- corpus sin cambios.

## 0.1.0-alpha.16 — 2026-08-11

### G3-A · Evidencia y precisión
- filtro certainty;
- filtro period.precision;
- filtro mapped/unmapped;
- Evidence Lens;
- ficha de lectura de evidencia;
- comparación descriptiva de fuentes;
- registros sin punto accionables.

### Semántica
- status editorial ≠ certainty;
- certainty ≠ precision;
- precision temporal ≠ precisión cartográfica.

### Contrato
- schemas sin cambios;
- taxonomy sin cambios;
- fingerprint SHA-256 de G2 CLOSED.

### Política
- no evidence score;
- no ranking automático de fuentes;
- no centroides inventados.

### Datos
- corpus histórico sin cambios respecto a alpha.15.

## 0.1.0-alpha.15 — 2026-08-11

### Gate
- **G2 CLOSED**.

### Runtime
- solo reviewed/verified;
- 11 subjects;
- 24 places;
- 24 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 6 developments.

### Archivo demo
- 34 registros seed/deprecated trasladados a `data/archive/demo_records_pre_g2.json`;
- cinco seeds no canonizados preservados;
- migraciones supersededBy conservadas.

### UI
- eliminado toggle público de datos seed;
- eliminado estado `showSeed`;
- estado del corpus muestra reviewed vs verified.

### Contrato
- `isPublicStatus()` centraliza el gate público;
- G2 congelado antes de G3.

## 0.1.0-alpha.14 — 2026-08-11

### Segunda revisión B/C/D
- goat + Ganj Dareh → verified;
- Forme of Cury + occurrence → verified;
- nixtamalization → verified;
- maize→nixtamalization → verified.

### Tercer recorrido
- olive_oil canónico;
- Kfar Samir;
- Ein Zippori;
- Monte Testaccio;
- historia automática sin JS específico.

### Nueva cobertura temática
- grasa/aceite;
- black_pepper;
- Berenike.

### Migración
- olive_oil_demo deprecated → olive_oil;
- occ_oil_med_demo deprecated → canonical occurrence.

### Gate
G2 queda en maduración final, no cerrado: permanecen seeds demostrativos por resolver.

## 0.1.0-alpha.13 — 2026-08-11

### G2-D · nixtamalización
- subject canónico `nixtamalization`;
- 2 occurrences reviewed;
- `technique_attestation`;
- relación canónica con maíz;
- Historia del maíz incorpora `TÉCNICA`.

### Primer disputed
- subject `chicken`;
- occurrence El Arenal-1;
- certainty disputed;
- contrato `dispute.question + positions[]`;
- fuentes por posición;
- UI `DEBATE ABIERTO`.

### Rigor
- no se fecha la hipótesis ceniza→cal como origen;
- reviewed y disputed permanecen dimensiones independientes.

### UX
- Magnetic Timeline alpha.12 preservada.

## 0.1.0-alpha.11 — 2026-08-11

### Unified Timeline
- el navegador temporal semántico pasa a ser la única línea temporal;
- tap/click para seleccionar fecha;
- drag táctil con Pointer Events;
- cursor accesible role=slider;
- izquierda/derecha = hito anterior/siguiente.

### Eliminado
- yearRange;
- ±1/10/100/500;
- reproducción automática;
- selector de velocidad;
- playStep/playStepOptions;
- timers/listeners/CSS legacy asociados.

### Conservado
- atajos históricos;
- entrada directa de año;
- hito anterior/siguiente;
- densidad/evidencias/events/developments.

### Rendimiento
- preview de fecha/cursor con requestAnimationFrame durante drag;
- render completo en pointerup.

### Datos
- sin cambios históricos respecto a alpha.10.

## 0.1.0-alpha.10 — 2026-08-11

### Navegador temporal
- nueva banda museográfica alineada con el slider;
- densidad adaptativa de evidencias;
- occurrences verified destacadas;
- events como rangos;
- developments como rangos;
- cursor de año sincronizado;
- hito anterior/siguiente;
- preview contextual.

### Escalabilidad
- 38 bins móvil;
- 68 bins tablet;
- 120 bins escritorio;
- seed/deprecated excluidos.

### UX móvil
- target táctil ampliado sin agrandar visualmente los hitos;
- labels persistentes evitados;
- reduced-motion.

### Filtros
- timeline respeta búsqueda, categoría, evidencia, tipo de occurrence y capas.

### Datos
- sin nuevos datos históricos;
- corpus alpha.9 preservado.

## 0.1.0-alpha.9 — 2026-08-11

### Historia del maíz
- San Andrés;
- Paredones: presencia;
- Paredones: consumo;
- Grandes Lagos;
- África atlántica;
- región cantábrica.

### Events
- Historia del elemento integra events.
- evento canónico de transferencia transatlántica del maíz.
- event demo anterior deprecated + supersededBy.

### Incertidumbre
- tarjeta específica para certainty medium;
- caso africano conserva incertidumbre sobre rutas de introducción.

### Motor
- historias genéricas: occurrence + event + development.
- Historias disponibles muestra número de eventos.

## 0.1.0-alpha.7 — 2026-08-11

### Segunda revisión G2-A
Promovidos a verified:
- maize + Xihuatoxtla;
- garum + Pompeya;
- pasteurización;
- Perkins 1834;
- Monitor Top 1927;
- HACCP.

### Gate verified
- nuevo objeto `verification`;
- independentSourceRefs;
- fecha/método/nota de segunda revisión;
- validación automática.

### Tanda G2-B
- cabra / Ganj Dareh;
- pan tipo torta / Shubayqa 1;
- queso/procesado lácteo / Kuyavia;
- The Forme of Cury;
- appertización;
- Codex 1963.

### Modelo
- prueba real de lugares reviewed sin coordenadas;
- domesticación como proceso;
- recetario ≠ dieta general.

## 0.1.0-alpha.6 — 2026-08-11

### Gate
- G1 cerrado.
- G2 iniciado.

### Corpus reviewed
- vino neolítico de Georgia;
- maíz temprano de Xihuatoxtla;
- garum en Pompeya;
- Shulaveri-Shomutepe;
- marco imperial romano occidental;
- pasteurización;
- refrigeración mecánica 1834;
- Monitor Top 1927;
- HACCP década de 1960.

### Trazabilidad
- `sourceRefs` en subjects y places;
- procedencia específica de puntos cartográficos;
- fuentes visibles en fichas;
- badges reviewed/seed/verified;
- developments reales en panel Transformaciones.

### Migración
- wine_demo → wine;
- maize_demo → maize;
- garum_demo → garum;
- demos conservados como deprecated.

## 0.1.0-alpha.5 — 2026-08-11

### Interaction hardening
- eliminado estado duplicado `subjectType`;
- chips, resumen y dropdown usan `s.category`;
- reset completo de filtros;
- buscador con debounce de 160 ms;
- marcadores con aparición temporal suave y respeto a reduced motion.

### Data hardening
- registros sin coordenadas permanecen en lista;
- aviso visible de cobertura cartográfica incompleta;
- `console.warn` una sola vez por registro sin punto;
- validador reporta número de occurrences no cartografiables;
- tests específicos de filtro, debounce y cobertura.

### Arquitectura futura
- rutas museográficas documentadas como extensión reservada;
- no se crea `tours.json` todavía;
- no se confunde grafo histórico con recorrido editorial.

### Incluye
- todo el mobile polish y nuevo tema claro de alpha.4.

## 0.1.0-alpha.4 — 2026-08-11

### Mobile polish
- eliminado overflow horizontal involuntario;
- flex/grid con `min-width:0`;
- toolbar Buscar / Capas / Filtros estabilizada;
- títulos y textos largos con wrapping seguro;
- `En esta fecha` corregido para móvil;
- cabecera móvil más compacta;
- tarjetas de contexto y evidencias ajustadas;
- mapa móvil optimizado.

### Light theme refinement
- paleta clara rehecha desde cero;
- fondo marfil/mineral;
- superficies cálidas;
- acentos cobre, oliva, violeta, turquesa y azul más sobrios;
- mapa claro desaturado;
- sombras y líneas reducidas.

### Distribución
- recursos y datos siguen versionados con `0.1.0-alpha.4`;
- meta `atlas-build` añadida para diagnóstico de versión.

### Arquitectura
- sin cambios de contrato;
- contexts/developments/capas de alpha.3 se conservan.

## 0.1.0-alpha.3 — 2026-08-11

### Museum polish
- métricas KPI sustituidas por franja editorial;
- mapa con mayor peso visual;
- tarjetas y radios simplificados;
- jerarquía móvil refinada;
- panel museográfico de transformaciones.

### Arquitectura histórica
- nuevo `contexts.json`;
- nuevo `developments.json`;
- schemas de contexto y desarrollo;
- `contextRefs` y `developmentRefs` en ocurrencias/eventos;
- capas Civilizaciones y culturas / Ciencia y tecnología / Seguridad e higiene;
- validador preparado para referencias cruzadas.

### Distribución
- cache busting obligatorio en CSS y JS;
- index usa `?v=0.1.0-alpha.3`.

### Datos
- no se añaden datos históricos nuevos;
- contexts y developments quedan vacíos hasta G2.

## 0.1.0-alpha.2 — 2026-08-11

### Museo digital / G1.1
- rediseño completo de la interfaz pública;
- hero editorial;
- mapa como protagonista;
- línea temporal de alto impacto visual;
- atajos de épocas/fechas;
- resumen por categorías;
- filtros en drawer;
- búsqueda desplegable;
- fichas laterales tipo exposición;
- contexto dinámico de la fecha;
- categorías gastronómicas con identidad cromática;
- experiencia táctil y responsive;
- terminología pública sustituye `subject` / `occurrence` en pantalla.

### Conservado
- contrato gastronómico canónico;
- JSON y GeoJSON separados;
- GitHub Pages;
- ausencia de año 0;
- distinción evidencia/lugar/certeza/fuente.

### Datos
- sin contenido histórico nuevo;
- todo el corpus sigue marcado `seed`.

## 0.1.0-alpha.1 — 2026-08-11

### Nuevo proyecto
- reescritura gastronómica desde cero;
- namespace y contratos nuevos;
- subject/occurrence/place/event/relationship/source;
- política específica de orígenes y evidencia;
- precisión cronológica explícita;
- GitHub Pages como distribución principal;
- prototipo temporal y cartográfico;
- schemas;
- validador;
- manifiesto.

### No migrado
- entidades históricas/civilizaciones del atlas anterior;
- corpus histórico anterior;
- supuestas fronteras históricas.


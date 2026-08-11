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
**Estado: IMPLEMENTADO · alpha.23 · pendiente validación táctil**

Problema resuelto:
- el mapa filtraba por año exacto;
- con corpus todavía disperso podía quedar completamente vacío;
- buscar un alimento en una fecha no coincidente no devolvía geografía visible.

Contrato alpha.23:
- mapa = corpus geolocalizado compatible con búsqueda/filtros;
- fecha = énfasis visual;
- `En esta fecha` = filtro temporal estricto;
- búsqueda global con resultados textuales;
- autoencuadre de resultados;
- selección sincroniza mapa + tiempo + ficha;
- ausencia de punto sigue visible;
- sin rutas/difusión inferidas.

Baseline:
- 30 occurrences;
- 16 mapped;
- año 1500: 1 active / 0 mapped;
- búsqueda `vino`: 5 / 5 mapped;
- búsqueda `pan`: 7, sin falso positivo por `España`.

Siguiente gate:
validación real en Xiaomi antes de ampliar corpus o iniciar G4.

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

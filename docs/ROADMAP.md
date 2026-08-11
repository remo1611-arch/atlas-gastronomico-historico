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
**No iniciado**

- panel de fuentes por ocurrencia;
- precisión cronológica;
- certeza;
- evidencia conflictiva;
- primera evidencia vs tradición;
- hipótesis alternativas.

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

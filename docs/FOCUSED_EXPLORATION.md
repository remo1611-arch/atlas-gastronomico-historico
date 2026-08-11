# G3-C — Focused Exploration

Release: `0.1.0-alpha.18`

## Problema

La aplicación había acumulado demasiadas capas simultáneas en la experiencia principal:

- timeline;
- métricas;
- mapa;
- categorías rápidas;
- cobertura cartográfica;
- Evidence Lens;
- registros;
- transformaciones;
- lectura de contexto;
- historias;
- procesos y cambios;
- nota metodológica.

La arquitectura de datos era correcta, pero la interfaz empezaba a exponer la complejidad interna del modelo.

El objetivo del Atlas no es demostrar constantemente todo lo que sabe el sistema.

El objetivo es permitir:

1. elegir un momento;
2. descubrir dónde hay evidencia;
3. abrir algo históricamente interesante;
4. profundizar solo cuando el usuario lo desea.

---

# Nueva arquitectura pública

## Experiencia 1 — Explorar

Jerarquía primaria:

```text
TIEMPO
  ↓
MAPA
  ↓
EN ESTA FECHA
```

### Tiempo

Permanece:
- año seleccionado;
- Unified/Magnetic Timeline;
- precisión contextual;
- anterior/siguiente hito.

Pasa a segundo nivel:
- atajos históricos → `Periodos`;
- entrada exacta → `Ir a un año concreto`.

Se elimina del nivel principal:
- cabecera explicativa del navegador;
- leyenda temporal persistente.

## Mapa

Permanece:
- mapa;
- Buscar;
- Capas;
- Filtros.

Se elimina:
- fila duplicada de filtros rápidos por categoría.

La cobertura cartográfica se reduce a una señal compacta:

`N sin localización precisa`

Los registros se despliegan solo al pulsarla.

La explicación metodológica se mueve a:
`ⓘ Cómo leer el mapa → Acerca del atlas`.

## En esta fecha

Se elimina el dashboard de categorías.

Se elimina Evidence Lens de la superficie principal.

Se muestran directamente:
- hasta 4 evidencias/hitos;
- título;
- qué documentan;
- lugar;
- fecha.

La certeza solo se destaca aquí cuando es una excepción relevante:
- medium;
- low;
- disputed.

Estado editorial, precisión detallada, fuentes y cartografía permanecen en la ficha.

Si existen más de 4 resultados:

`Ver N registros más`

### Procesos y cambios

Transformations + Events se fusionan en:

`Procesos y cambios`

Es un `<details>` cerrado por defecto.

Contiene:
- developments;
- events;
- ventana temporal;
- acceso a capas.

---

# Experiencia 2 — Historias

`Historias disponibles` deja de ser otro bloque al final de la home.

Pasa a una experiencia propia:

```text
Explorar | Historias
```

La vista contiene los recorridos genéricos:
- maíz;
- vino;
- aceite de oliva;
- nixtamalización;
- futuros subjects con suficiente corpus.

Los recorridos siguen usando exactamente el mismo motor `subjectHistoryItems()`.

No se crea código por subject.

---

# G3 técnico sigue disponible

## Filtros

Evidence Lens se traslada al drawer de filtros:

`Resumen de la selección`

Continúa mostrando:
- certainty;
- chronology;
- mapped/unmapped.

No se elimina ningún filtro G3.

## Ficha

Permanece íntegra:
- estado editorial;
- certeza;
- precisión cronológica;
- precisión espacial;
- base documental;
- source comparison;
- disputed;
- context;
- developments;
- historia del elemento.

## Acerca del Atlas

Absorbe la metodología que antes ocupaba permanentemente espacio en la home:
- corpus reviewed/verified;
- punto ≠ origen;
- unmapped ≠ coordenada inventada.

---

# Eliminación de legacy

Eliminado del HTML:
- `museum-rail`;
- `categorySummary`;
- `categoryLegend`;
- `museum-story`;
- `transformation-band`;
- `events-section`;
- `method-note`;
- `evidenceLensFilterBtn`;
- `openFiltersHeroBtn`.

Eliminado del JS:
- `renderCategorySummary`;
- `renderContext`;
- binding de `categoryLegend`;
- bindings de controles retirados.

Eliminado del CSS:
- reglas asociadas a los bloques anteriores.

---

# Principio de diseño

> La complejidad del modelo no debe convertirse en complejidad permanente de la interfaz.

La profundidad sigue existiendo, pero usa divulgación progresiva.


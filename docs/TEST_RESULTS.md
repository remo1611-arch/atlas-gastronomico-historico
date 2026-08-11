# Resultados de validación — 0.1.0-alpha.11

Fecha: 2026-08-11

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO.

## Corpus
Sin cambios históricos respecto a alpha.10:
- 17 subjects;
- 25 places;
- 28 occurrences;
- 3 events;
- 3 relationships;
- 7 contexts;
- 6 developments;
- 48 sources;
- 12 occurrences activas sin punto canónico.

## Suite completa: PASS

### Datos / schemas
- validate_project.py: PASS.
- test_schema_validation.py: PASS.
- 137 objetos / 8 schemas.

### Core / JS
- node --check core.js: PASS.
- node --check app.js: PASS.
- core temporal: 11 aserciones PASS.
- `shiftYear` eliminado al desaparecer la navegación aritmética.

### UI
- UI contract: 100 IDs / 88 referencias JS.
- mobile contract: PASS.
- light contrast: PASS.
- filtros: PASS.
- map coverage: PASS.
- debounce: PASS.

### G2
- public state: PASS.
- verified gate: PASS.
- G2-C maize: PASS.
- traceability UI: PASS.
- subject history: PASS.

### Temporal Navigator
- densidad: PASS.
- occurrences verified: PASS.
- events: PASS.
- developments: PASS.
- 38 / 68 / 120 bins.
- seed/deprecated excluidos.

### Unified Timeline
PASS:
- `yearRange` eliminado;
- ±1/10/100/500 eliminados;
- playback eliminado;
- playStep/playStepOptions eliminados;
- timers/listeners playback eliminados;
- CSS legacy eliminado;
- tap/click sobre rail;
- drag Pointer Events;
- grab-offset del cursor;
- preview mediante requestAnimationFrame;
- render completo al soltar;
- cursor role=slider;
- ArrowLeft/ArrowRight = hito anterior/siguiente;
- Home/End = extremos;
- atajos históricos conservados;
- Ir al año conservado.

### GitHub Pages
- 16/16 recursos críticos PASS.

## Pendiente real
Prueba visual/táctil en Xiaomi 15 de:
- tap sobre zona libre;
- drag del cursor;
- selección de marcas;
- hito anterior/siguiente;
- modo oscuro/claro.

El entorno de validación automática no permitió abrir Chromium contra localhost/file por política del contenedor, por lo que no se declara prueba visual automatizada.

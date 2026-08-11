# Resultados de validación — 0.1.0-alpha.10

Fecha: 2026-08-11

## Datos
Sin cambios respecto a alpha.9:
- 17 subjects;
- 25 places;
- 28 occurrences;
- 3 events;
- 3 relationships;
- 7 contexts;
- 6 developments;
- 48 sources.

## Focused suite: PASS
- validate_project.py;
- test_schema_validation.py;
- node --check js/app.js;
- test_temporal_navigator.py;
- test_ui_contract.py;
- test_mobile_contract.py;
- test_subject_history.py;
- test_g2_pilot_c_maize.py;
- test_map_coverage.py.

## Temporal Navigator
PASS:
- 10 IDs críticos;
- densidad adaptativa 38/68/120;
- evidencias reviewed/verified;
- seed/deprecated excluidos;
- occurrences verified destacadas;
- events como intervalos;
- developments como intervalos;
- cursor sincronizado;
- anterior/siguiente;
- filtros/búsqueda;
- target móvil ampliado;
- reduced-motion.

## UI Contract
- 100 IDs;
- 89 referencias JS.

## Corpus longitudinal
- vino: 5 evidencias + 1 development;
- maíz: 7 evidencias + 1 event.

## Cartografía
12 occurrences sin punto canónico; comportamiento esperado.

## Pendiente real
Validación visual/táctil del navegador en Xiaomi 15 antes de considerarlo cerrado visualmente.

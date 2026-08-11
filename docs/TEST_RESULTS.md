# Resultados de validación — 0.1.0-alpha.12

Fecha: 2026-08-11

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO.

## Corpus
Sin cambios históricos respecto a alpha.11:
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

### Base
- validate_project.py: PASS;
- schema validation: 137 objetos / 8 schemas;
- JS core/app: sintaxis válida;
- core temporal: 11 aserciones PASS;
- UI contract: 100 IDs / 88 referencias;
- mobile contract: PASS;
- light contrast: PASS;
- filtros / debounce / map coverage: PASS;
- public state / verified gate / G2 / histories: PASS;
- GitHub Pages: 16/16 PASS.

### Unified Timeline
- slider antiguo ausente;
- ± años ausentes;
- playback ausente;
- tap/drag y navegación por hitos conservados.

### Magnetic Timeline
- test_magnetic_timeline.py: PASS;
- test_magnetic_algorithm.mjs: PASS · 8 aserciones.

Comportamiento validado:
1. occurrence → snap al anclaje temporal usado por la marca visual;
2. event/development → si la pulsación cae dentro del rango real, conserva esa fecha;
3. fuera del rango → snap al límite histórico más próximo;
4. candidato más cercano calculado sobre escala ordinal sin año 0;
5. un rango que contiene la pulsación gana a un punto más lejano;
6. el tipo de hito y `verified` solo desempatan después de la distancia;
7. sin candidatos visibles no se inventa un snap;
8. Ir al año y atajos editoriales permanecen exactos.

### UX magnética
Durante drag:
- cursor libre;
- preview del año;
- hito candidato resaltado;
- ficha central indica “Destino cercano”.

Al soltar:
- snap al candidato visible más próximo;
- los filtros y capas determinan el conjunto de candidatos.

## Pendiente real
Validación táctil/visual en Xiaomi 15 de la sensación de magnetismo. No se declara prueba visual automatizada del navegador.

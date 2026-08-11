# Resultados de validación — 0.1.0-alpha.18

Fecha: 2026-08-11

## Estado
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: EN CURSO · A/B/C implementados.

## Corpus
Sin cambios históricos respecto a alpha.15:
- 11 subjects;
- 24 places;
- 24 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 6 developments;
- 66 sources.

## Contrato G2
- taxonomy + 8 schemas: **9/9 intactos**.
- 140 objetos / 8 schemas: PASS.
- G2 FINAL GATE: PASS.

## Focused Exploration
PASS:
- Explorar / Historias;
- Tiempo → Mapa → En esta fecha;
- legacy dashboard sections eliminadas;
- Evidence Lens bajo Filtros;
- Periodos e Ir al año bajo disclosure;
- hasta 4 evidencias antes de Ver más;
- Procesos y cambios colapsado;
- metodología en Acerca del Atlas;
- navegación desde Historia vuelve a Explorar.

## Limpieza legacy
Ausentes en la experiencia pública:
- museum rail;
- category summary;
- category legend;
- context dashboard;
- transformation standalone section;
- events standalone section;
- method note.

Se retiraron también sus bindings/funciones CSS legacy asociados.

## Suite completa
PASS:
- validate_project;
- demo archive;
- schema validation;
- public state;
- filter state;
- verified gate;
- pilots A/B/C/D;
- second review;
- thematic coverage;
- traceability UI;
- disputed contract;
- technique history;
- three longitudinal histories;
- G3 evidence & precision;
- source comparison;
- unmapped access;
- detail semantics;
- chronology semantics;
- disputed comparison;
- light contrast;
- map coverage;
- mobile contract;
- search debounce;
- Temporal Navigator;
- Unified Timeline;
- Magnetic Timeline;
- Focused Exploration;
- Progressive Disclosure;
- GitHub Pages 16/16.

## Algoritmos
- CORE: 11 assertions PASS.
- Magnetic algorithm: 8 assertions PASS.
- G3 chronology algorithm: 6 assertions PASS.

## UI contract
- 104 IDs;
- 92 referencias JS;
- PASS.

## QA visual real
Chromium:

### Escritorio 1440 × 1000
- scrollWidth = clientWidth = 1440;
- sin overflow horizontal;
- errores consola/pageerror: 0;
- Explorar ↔ Historias: PASS;
- altura Explorar alpha.18: 1803 px.

### Móvil 393 × 852
- scrollWidth = clientWidth = 393;
- sin overflow horizontal;
- errores consola/pageerror: 0;
- Explorar ↔ Historias: PASS;
- altura Explorar alpha.18: 2119 px.

### Reducción frente a alpha.17
- escritorio: **-50,8 %** de altura de página inicial;
- móvil: **-63,6 %**.

Detalle:
`docs/VISUAL_QA_ALPHA18.md`

## Pendiente
- validación táctil real en Xiaomi 15;
- modo claro en dispositivo real;
- G3-D: auditoría espacial rigurosa de 18 occurrences sin punto.

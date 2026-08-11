# Resultados de validación — 0.1.0-alpha.17

Fecha: 2026-08-11

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: EN CURSO · G3-A/B implementados.

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
Fingerprint SHA-256:
- taxonomy;
- 8 schemas.

**9/9 intactos.**

## G3-A
PASS:
- certainty/precision/spatial filters;
- Evidence Lens;
- detail semantics;
- source comparison;
- unmapped actionable access;
- no evidence score.

## G3-B
PASS:
- ventana temporal contextual;
- point/range/circa/broad diferenciados;
- perfil cronológico en ficha;
- duración mediante ordinal histórico;
- gaps/solapamientos en Historia del elemento;
- precision + certainty en todos los tipos de hito;
- comparación documental ampliada de disputed;
- sin winner/ranking/consensus score.

## Algoritmos
- CORE: 11 aserciones PASS.
- Magnetic Timeline: 8 aserciones PASS.
- G3 Chronology: 6 aserciones PASS.
- prueba explícita -1 → 1 sin año 0: PASS.

## Regresión
PASS:
- validate_project;
- schema validation: 140 objetos / 8 schemas;
- public state;
- demo archive;
- G2 final gate;
- pilots A/B/C/D;
- verified gate: 14;
- disputed contract;
- technique history;
- second review;
- thematic coverage;
- three longitudinal histories;
- G3 evidence & precision;
- G3 source comparison;
- G3 unmapped access;
- G3 detail semantics;
- G3 chronology semantics;
- G3 disputed comparison;
- light contrast;
- mobile;
- filter state;
- map coverage;
- search debounce;
- Temporal Navigator;
- Unified Timeline;
- Magnetic Timeline;
- GitHub Pages 16/16.

## UI
- UI contract: 109 IDs / 96 referencias JS.

## Pendiente real
Validación visual/táctil en dispositivo real de:
- ventana temporal contextual;
- circa/range/broad;
- gaps en Historia del elemento;
- disputed comparison en móvil;
- modos oscuro/claro.

No se declara prueba visual automatizada de navegador.

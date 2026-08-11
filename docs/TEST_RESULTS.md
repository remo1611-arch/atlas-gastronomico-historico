# Resultados de validación — 0.1.0-alpha.16

Fecha: 2026-08-11

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: EN CURSO · G3-A implementado.

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

**9/9 sin cambios.**

## G3-A
PASS:
- certainty filter;
- precision filter;
- mapped/unmapped filter;
- Evidence Lens;
- detail semantics;
- source comparison;
- unmapped actionable access;
- no opaque evidence score.

## Ficha
Se separan:
- estado editorial;
- certeza histórica;
- precisión cronológica;
- precisión espacial;
- base documental.

## Fuentes
- 9 tipos de fuente presentes en el corpus;
- 9/9 con etiqueta legible;
- comparación descriptiva;
- sin ranking automático.

## Cartografía
- 18 occurrences públicas sin punto canónico;
- todas siguen accesibles;
- panel accionable en mapa;
- no centroides inventados.

## Suite regresiva
PASS:
- validate_project;
- schema validation: 140 objetos / 8 schemas;
- G2 final gate;
- public state;
- verified gate;
- disputed;
- técnica;
- historias longitudinales;
- thematic coverage;
- UI contract: 108 IDs / 95 refs JS;
- filter state;
- mobile;
- light contrast;
- map coverage;
- search debounce;
- Temporal Navigator;
- Unified Timeline;
- Magnetic Timeline;
- GitHub Pages 16/16;
- core 11 assertions;
- magnetic algorithm 8 assertions.

## Pendiente real
Validación visual/táctil en dispositivo real de:
- drawer con nuevos filtros;
- Evidence Lens;
- ficha G3;
- source comparison;
- panel de registros sin punto.

No se declara prueba visual automatizada del navegador local.

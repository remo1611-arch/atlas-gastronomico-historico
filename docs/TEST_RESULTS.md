# Resultados de validación — 0.1.0-alpha.22

Fecha: 2026-08-11

## Estado
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: CERRADO.
- Narrative Museum: integrado.
- E1: PAUSADO.
- G4: NO INICIADO.

## Corpus
Sin cambios respecto a alpha.21:
- 11 subjects;
- 30 places;
- 30 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 7 developments;
- 86 sources;
- 2 stories;
- 13 scenes;
- 16 glossary entries.

## Contrato
- G2 fingerprint: **9/9 PASS**.
- 8 schemas históricos sin cambios.
- 2 schemas narrativos sin cambios.
- schema validation: PASS.

## Alpha.22 · navegación
PASS:
- browser history / popstate;
- deep links de Historias y Atlas;
- Story ↔ Atlas round-trip;
- direct evidence reveal;
- focus real de developments/events;
- interval occurrence snap;
- selection-aware previous/next;
- primary navigation bindings.

## Algoritmos
- Navigation algorithms: PASS · 12 assertions.
- Magnetic algorithm: PASS · occurrence ranges conservan target dentro del intervalo.
- Core chronology: PASS.

## Higiene documental
- `CANONICAL_RULES.md`: **154 reglas únicas y consecutivas**.
- duplicaciones históricas de numeración eliminadas.

## Suite completa del proyecto
- Python gates: **48/48 PASS**.
- Node gates/checks: **6/6 PASS**.
- GitHub Pages: **18/18 PASS**.
- G3 FINAL GATE: PASS.
- Narrative Museum Contract: PASS.
- Narrative Editorial Depth: PASS.

## QA visual/táctil
No se declara validación visual nueva de alpha.22.

El entorno no dispone actualmente de un navegador Playwright ejecutable utilizable para una prueba visual fiable.

La aceptación decisiva sigue siendo en GitHub Pages/Xiaomi, especialmente:
- Atrás/Adelante entre escenas;
- Historia → Atlas → Atrás;
- filtro previo + `Ver en el Atlas`;
- Pasteur como development enfocado;
- anterior/siguiente temporal en ranges y fechas coincidentes.

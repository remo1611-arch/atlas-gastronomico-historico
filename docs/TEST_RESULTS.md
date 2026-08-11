# Resultados de validación — 0.1.0-alpha.19

Fecha: 2026-08-11

# Resultado

**G3 FINAL GATE: PASS**

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- **G3: CERRADO.**

## Corpus
- 11 subjects.
- 24 places.
- 24 occurrences.
- 1 event.
- 1 relationship.
- 7 contexts.
- 6 developments.
- 75 sources.

Schema validation:
- 149 objetos;
- 8 schemas;
- PASS.

## Contrato G2
Fingerprint SHA-256:
- taxonomy;
- 8 schemas.

**9/9 PASS.**

No cambia el modelo canónico.

## Auditoría espacial G3-D

Baseline alpha.18:
- 6 occurrences con punto;
- 18 sin punto.

Alpha.19:
- **15 occurrences con punto**;
- **9 sin punto**.

Clasificación de las 18 auditadas:
- point_documented: 9;
- broad_region: 5;
- specific_site_unresolved: 4.

Los cuatro casos `specific_site_unresolved` corresponden a tres places:
- San Andrés;
- Paredones;
- Ein Zippori.

## Principios espaciales comprobados
- todo nuevo point tiene `precision`;
- todo nuevo point tiene `sourceRefs`;
- todo nuevo point tiene `note`;
- las fuentes espaciales resuelven;
- broad_region permanece sin point;
- no se introduce un centroide para mejorar cobertura;
- `reference` y `exact_from_publication` permanecen diferenciados.

## G3-A
PASS:
- certainty;
- precision;
- spatial filters;
- Evidence Lens;
- source comparison;
- detail semantics;
- unmapped access;
- no evidence score.

## G3-B
PASS:
- chronology semantics;
- period profiles;
- historical gaps;
- disputed comparison;
- no winner / consensus score.

## G3-C
PASS:
- Focused Exploration;
- Explorar / Historias;
- Tiempo → Mapa → En esta fecha;
- progressive disclosure;
- legacy dashboard ausente.

## G3-D
PASS:
- spatial audit;
- 18 decisiones únicas;
- runtime 15 mapped / 9 unmapped;
- G2 fingerprint 9/9;
- G3 final gate.

## Suite completa
- Python gates: **39/39 PASS**.
- Node gates/checks: **5/5 PASS**.
- GitHub Pages: **16/16 PASS**.
- Core: 11 assertions PASS.
- Magnetic algorithm: 8 assertions PASS.
- G3 chronology algorithm: 6 assertions PASS.

## QA visual

Alpha.18 Focused Exploration sí fue renderizada con Chromium real:
- escritorio 1440×1000: PASS;
- móvil 393×852: PASS;
- overflow horizontal: 0;
- errores de consola: 0.

Alpha.19 no modifica la arquitectura visual de Focused Exploration; modifica datos espaciales, fuentes y documentación.

Se intentó una nueva renderización local de alpha.19, pero el Chromium disponible en esta ejecución bloqueó la navegación local mediante política administrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Por tanto:
- **no se declara render visual nuevo de alpha.19**;
- la validación funcional/estructural sí está completa;
- la prueba visual/táctil final debe hacerse en GitHub Pages/Xiaomi tras desplegar.

## Conclusión

G3 queda formalmente cerrado.

Los 9 registros que permanecen sin punto no son deuda silenciosa: cada ausencia está clasificada y justificada en `docs/G3_SPATIAL_AUDIT.json`.

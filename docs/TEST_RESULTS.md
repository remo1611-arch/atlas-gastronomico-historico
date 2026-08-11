# Resultados de validación — 0.1.0-alpha.15

Fecha: 2026-08-11

# Resultado

**G2 FINAL GATE: PASS**

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: SIGUIENTE.

## Corpus runtime
- 11 subjects.
- 24 places.
- 24 occurrences.
- 1 event.
- 1 relationship.
- 7 contexts.
- 6 developments.
- 66 sources.

Todo el runtime histórico está en `reviewed` o `verified`.

## Archivo demo
`data/archive/demo_records_pre_g2.json`

- 34 registros archivados.
- 5 seeds históricos no canonizados preservados.
- seed/deprecated fuera del runtime.
- seedToggle/showSeed ausentes.

## Schema
- 140 objetos runtime.
- 8 schemas.
- PASS.

## Verified
- 14 registros con metadata `verification`.
- PASS.

## Disputed
- 1 occurrence estructurada.
- 2 posiciones con fuentes separadas.
- PASS.

## Historias longitudinales
1. vino;
2. maíz;
3. aceite de oliva.

Motor genérico: PASS.

## Técnica
Nixtamalización canónica y relación verificada con maíz: PASS.

## Cobertura temática
- grasa/aceite: PASS;
- especia: PASS;
- animal: PASS;
- bebida: PASS;
- texto culinario: PASS;
- conservación: PASS;
- ciencia/tecnología: PASS;
- seguridad/regulación: PASS.

## Temporal UX
- Temporal Navigator: PASS.
- Unified Timeline: PASS.
- Magnetic Timeline: PASS.
- Magnetic algorithm: 8 assertions PASS.
- slider antiguo: ausente.
- ± años: ausentes.
- playback cronológico: ausente.

## UI / responsive
- UI contract: 99 IDs / 87 refs JS.
- Mobile contract: PASS.
- Light contrast: PASS.
- Filter state: PASS.
- Search debounce: PASS.
- Map coverage: PASS.

## Cartografía
18 occurrences públicas carecen deliberadamente de punto canónico.

Esto no es un fallo: permanecen visibles en historia/listas y no reciben coordenadas inventadas.

## GitHub Pages
- 16/16 recursos críticos PASS.

## Política posterior
El contrato G2 queda congelado.

Cambios estructurales en G3 requieren:
- caso real;
- ADR;
- migración;
- tests de regresión.

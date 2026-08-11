# Resultados de validación — 0.1.0-alpha.24

Fecha: 2026-08-11

## Estado
**PASS técnico. Gate físico Xiaomi pendiente.**

## Corpus
11 subjects · 30 places · 30 occurrences · 1 event · 1 relationship · 7 contexts · 7 developments · 86 sources · 2 stories · 13 escenas · 16 términos.

## Cobertura
- occurrences: 16/30 con punto; 14 sin punto;
- contexts: 5/7 cartografiables; 2 sin punto;
- developments: 1/7 cartografiable; 6 sin punto.

## Validación reproducible
- `tools/validate_project.py`: **PASS**;
- `node --check js/app.js`: **PASS**;
- scripts Python `test_*.py`: **50/50 PASS**;
- scripts Node `test_*.mjs`: **4/4 PASS**;
- cobertura multicapas: **PASS**;
- estabilidad de metadatos MANIFEST: **PASS**.

## Correcciones protegidas
- cobertura visible en occurrences + contexts + developments;
- `firstMappablePlace()`;
- no centroides inventados;
- `renderMapCoverage()` defensivo;
- MANIFEST conserva `gate` y `phase`.

## Navegador
Se intentó smoke test automatizado con Chromium/viewport móvil, pero el entorno bloqueó `localhost` y `file://` con `ERR_BLOCKED_BY_ADMINISTRATOR`. No se declara PASS de navegador a partir de ese intento.

## Gate pendiente
`docs/MOBILE_ACCEPTANCE_ALPHA24.md`.

# Resultados de validación — 0.1.0-alpha.25

## Alcance
Alpha.25 modifica exclusivamente el contrato narrativo y su navegación asociada. No amplía el corpus histórico.

## Resultado reproducible
- `tools/validate_project.py`: PASS.
- `node --check js/app.js`: PASS.
- `node --check js/core.js`: PASS.
- Python `tools/test_*.py`: **52/52 PASS**.
- Node `tools/test_*.mjs`: **5/5 PASS**.
- JSON Schema: PASS.
- Story Types: contrato real + historia transversal sintética: PASS.
- Contrato legacy `story.subjectRef`: rechazado por schema/test.
- Navegación/deep links: PASS.
- Story ↔ Atlas round-trip: PASS.
- G2 fingerprint: preservado.

## Corpus
12 subjects · 31 places · 32 occurrences · 1 event · 1 relationship · 7 contexts · 7 developments · 90 sources · 2 stories · 13 escenas · 16 términos de glosario.

## Pendiente no automatizable
Gate táctil/visual en Xiaomi según `docs/MOBILE_ACCEPTANCE_ALPHA25.md`.

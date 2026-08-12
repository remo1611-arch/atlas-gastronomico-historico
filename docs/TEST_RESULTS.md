# Resultados de validación — 0.1.0-alpha.31

## Corpus
- 17 subjects
- 56 places
- 43 occurrences
- 1 event
- 1 relationship
- 7 contexts
- 27 developments
- 146 sources
- 7 stories / 38 escenas
- 36 términos de glosario

## Gates
- `validate_project.py`: PASS
- Python `test_*.py`: **59/59 PASS**
- Node `test_*.mjs`: **5/5 PASS**
- `node --check js/app.js`: PASS
- `node --check js/core.js`: PASS
- `test_potato_story.py`: PASS
- `test_narrative_editorial_depth.py`: PASS
- `test_museographic_gate.py`: PASS
- `test_product_contract_freeze.py`: PASS
- `test_schema_validation.py`: PASS
- `test_map_coverage.py`: PASS
- `test_story_atlas_roundtrip.py`: PASS

## Contrato
Los 10 schemas congelados en alpha.27 conservan exactamente su fingerprint. Patata se integra sin migración de contrato ni lógica específica de renderer.

## Gate pendiente
**QA automatizado PASS.** Pendiente únicamente la aceptación táctil/visual de alpha.31 en dispositivo real.

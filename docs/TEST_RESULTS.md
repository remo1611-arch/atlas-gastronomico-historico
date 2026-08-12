# Resultados de validación — 0.1.0-alpha.33

## Estado

**QA automatizado: PASS.** Aceptación táctil/visual en dispositivo real: pendiente.

## Corpus

- 19 subjects
- 59 places
- 45 occurrences
- 1 event
- 1 relationship
- 7 contexts
- 30 developments
- 157 sources
- 9 stories / 49 escenas
- 46 términos de glosario

## Suite

- Python `test_*.py`: **61/61 PASS**
- Node: **5/5 PASS**
- `validate_project.py`: **PASS**
- `node --check js/app.js`: **PASS**
- `node --check js/core.js`: **PASS**
- `test_preservation_story.py`: **PASS**
- `test_narrative_editorial_depth.py`: **PASS**
- `test_museographic_gate.py`: **PASS**
- `test_product_contract_freeze.py`: **PASS**

## Contrato

Los diez schemas congelados en alpha.27 permanecen sin modificación y conservan el fingerprint canónico. Alpha.33 añade una historia transversal de segundo nivel sin renderer, ruta ni excepción específica.

## Cambios de conocimiento

No se añaden subjects, places, occurrences ni developments. Se añaden dos fuentes para contrastar Appert y seis términos de glosario. `appert_preservation_1809_1810` pasa a `verified/high` tras contraste USDA/NAL + Library of Congress.

## Artefacto

- MANIFEST: **164/164 archivos verificados por tamaño y SHA-256**
- `build_manifest.py`: **idempotente**
- ZIP: **verificación interna PASS**
- doble construcción determinista: **byte a byte idéntica**

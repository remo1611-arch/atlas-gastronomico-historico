# Resultados de validación — 0.1.0-alpha.34

## Estado

**QA automatizado: PASS.** Aceptación táctil/visual en dispositivo real: pendiente.

## Corpus

- 22 subjects
- 63 places
- 50 occurrences
- 1 event
- 1 relationship
- 7 contexts
- 30 developments
- 163 sources
- 10 stories / 55 escenas
- 50 términos de glosario

## Suite

- Python `test_*.py`: **64/64 PASS**
- Node `test_*.mjs`: **5/5 PASS**
- `validate_project.py`: **PASS**
- `node --check js/app.js`: **PASS**
- `node --check js/core.js`: **PASS**
- `test_columbian_exchange_story.py`: **PASS**
- `test_g4_readiness.py`: **PASS**
- `test_taxonomy_runtime_alignment.py`: **PASS**
- `test_narrative_editorial_depth.py`: **PASS**
- `test_museographic_gate.py`: **PASS**
- `test_product_contract_freeze.py`: **PASS**
- `test_editorial_expansion_bread.py` (fingerprint G2): **PASS**

## Contratos preservados

- Los diez schemas congelados en alpha.27 conservan el fingerprint canónico.
- `data/taxonomy.json` conserva el fingerprint G2 previo.
- Los tipos específicos presentes en el corpus se incorporan a filtros y etiquetas desde runtime, sin mutar la taxonomía congelada.

## Alpha.34

- Nueva historia transversal `story_columbian_exchange_europe`: **6 escenas / 7 subjects relacionados**.
- 5 occurrences nuevas elevan el corpus a **50 occurrences**.
- Se distinguen explícitamente presencia, introducción, cultivo, adopción y generalización.
- No se añade ninguna relationship ni vector geográfico nuevo.
- G4 queda **PILOT-READY · FULL NETWORK: NO**.

## Cobertura espacial

- occurrences: **21 con punto / 29 sin punto**;
- contexts: **5 con punto / 2 sin punto**;
- developments: **13 con punto / 17 sin punto**.

Los lugares regionales añadidos en alpha.34 permanecen sin centroides artificiales.

## Artefacto

- MANIFEST: **171/171 archivos verificados por tamaño y SHA-256**.
- `build_manifest.py`: **idempotente** y preserva `G3_CLOSED / EDITORIAL_EXPANSION_G4_READINESS`.
- doble construcción determinista del ZIP: **byte a byte idéntica**.
- verificación interna del ZIP: **0 faltantes · 0 hashes incorrectos · 0 extras**.

# Resultados de validación — 0.1.0-alpha.35.1

## Veredicto
**QA automatizado: PASS · aceptación táctil/visual: pendiente**

## Corpus
- 22 subjects;
- 65 places;
- 50 occurrences;
- 1 event;
- 1 relationship subject→subject;
- 2 transfers G4 Pilot A;
- 7 contexts;
- 30 developments;
- 163 sources;
- 10 stories / 55 escenas;
- 50 términos de glosario.

## G4 Pilot A
- Gran Canaria → Amberes · patata · 1567 · `trade` · verified/high;
- costa de Malabar → Batavia · café · 1696/1699 · `plant_transfer` · reviewed/high;
- transfers con `mapMode=endpoint_connection`: **0/2**;
- líneas cartográficas G4: **0**;
- ambos vínculos enlazan a evidencia canónica existente;
- `relationships.json` no se reutiliza con semántica espacial.

## Contratos
- JSON Schema: PASS · 401 objetos / 11 schemas;
- los 10 schemas congelados de alpha.27: PASS;
- fingerprint G2: PASS;
- `taxonomy.json`: sin modificación;
- reglas canónicas: 169, únicas y consecutivas.

## Suite
- Python `test_*.py`: **66/66 PASS**;
- Node `test_*.mjs`: **5/5 PASS**;
- `validate_project.py`: PASS;
- `node --check js/app.js`: PASS;
- `node --check js/core.js`: PASS;
- `test_g4_pilot_a.py`: PASS;
- `test_public_ui_cleanliness.py`: PASS;
- `test_g4_readiness.py`: PASS;
- `test_public_state.py`: PASS;
- `test_verified_gate.py`: PASS;
- `test_product_contract_freeze.py`: PASS;
- `test_canonical_rule_numbering.py`: PASS;
- `test_ui_contract.py`: PASS;
- `test_mobile_contract.py`: PASS.

## Criterio espacial
Ningún centroide, puerto o trayecto se ha inventado para el piloto. La ausencia de geometría es un resultado explícito y verificable.

## Pendiente
Prueba física en Xiaomi según `docs/MOBILE_ACCEPTANCE_ALPHA35_1.md`. El gate debe comprobar especialmente si `0 líneas` se entiende como cautela metodológica y no como error de render.

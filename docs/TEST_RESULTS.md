# Resultados de validación — 0.1.0-alpha.6

Fecha: 2026-08-11

## Gate
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO · tanda A `reviewed`.

## Suite completa: PASS

### Datos y referencias
- `validate_project.py`: PASS.
- 13 subjects · 3 reviewed.
- 12 places · 4 reviewed.
- 14 occurrences · 3 reviewed.
- 2 events.
- 3 relationships.
- 2 contexts · 2 reviewed.
- 4 developments · 4 reviewed.
- 16 sources.
- 0 occurrences activas/no-deprecated sin punto.

### JSON Schema
- `test_schema_validation.py`: PASS.
- 66 objetos.
- 8 schemas.

### Motor / JavaScript
- `node --check js/core.js`: PASS.
- `node --check js/app.js`: PASS.
- `test_core.mjs`: 14 aserciones PASS.

### UI y responsive
- `test_ui_contract.py`: PASS · 82 IDs / 75 refs JS.
- `test_mobile_contract.py`: PASS · 10 contratos responsive.
- `test_light_contrast.py`: PASS.
- `test_filter_state.py`: PASS.
- `test_map_coverage.py`: PASS.
- `test_search_debounce.py`: PASS · 160 ms.

### Contrato extendido
- `test_extended_contract.py`: PASS.
- 13 tipos de contexto.
- 17 tipos de development.
- 13 tipos de impacto.
- nuevo `food_storage_appliance` derivado del caso real Monitor Top.

### G2
- `test_public_state.py`: PASS.
  - 3 subjects demo deprecated preservados/ocultos.
  - 3 occurrences demo deprecated preservadas/ocultas.
- `test_g2_pilot.py`: PASS.
  - 3 subjects reviewed.
  - 3 occurrences reviewed.
  - 2 contexts reviewed.
  - 4 developments reviewed.
  - 16 fuentes.
- `test_g2_traceability_ui.py`: PASS.
  - estados visibles;
  - fuentes visibles en fichas;
  - developments dinámicos;
  - deprecated excluidos de la experiencia pública.

### GitHub Pages
- `test_project_pages.py`: PASS · 16/16 recursos críticos.

## Contenido histórico reviewed — tanda A

- Vino neolítico · Georgia.
- Maíz temprano · Xihuatoxtla.
- Garum · Pompeya.
- Cultura Shulaveri-Shomutepe.
- Marco imperial romano occidental.
- Pasteurización aplicada al vino · 1863–1865.
- Refrigeración mecánica de Perkins · 1834.
- GE Monitor Top · 1927.
- HACCP · década de 1960.

## Estado editorial

Ningún registro nuevo se marca `verified`.

`reviewed` significa que ha superado esta primera auditoría histórica y dispone de fuentes trazables. `verified` queda reservado para una segunda revisión explícita.


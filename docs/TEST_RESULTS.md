# Resultados de validación — 0.1.0-alpha.3

Fecha: 2026-08-11

## PASS automático

- `python tools/validate_project.py`
  - 10 subjects;
  - 8 places;
  - 11 occurrences;
  - 2 events;
  - 3 relationships;
  - 0 contexts;
  - 0 developments.
- `node --check js/core.js`: PASS.
- `node --check js/app.js`: PASS.
- `node tools/test_core.mjs`: **14 aserciones PASS**.
- `python tools/test_ui_contract.py`: PASS.
  - 81 IDs HTML;
  - 73 referencias JS.
- `python tools/test_extended_contract.py`: PASS.
  - 13 tipos de contexto;
  - 16 tipos de development;
  - 13 tipos de impacto;
  - datasets context/development vacíos aceptados pre-G2.
- `python tools/test_project_pages.py`: **16/16 recursos críticos HTTP 200** bajo subdirectorio tipo GitHub Project Pages.

## Cache busting

Validado:
- `app.css?v=0.1.0-alpha.3`;
- `app.js?v=0.1.0-alpha.3`;
- `core.js?v=0.1.0-alpha.3`;
- JSON/GeoJSON dinámicos con `?v=0.1.0-alpha.3`.

## Cambios de UX

- métricas KPI sustituidas por franja editorial;
- mapa con mayor jerarquía;
- menor abuso de tarjetas redondeadas;
- panel de transformaciones;
- drawer de capas;
- terminología pública más limpia.

## Cambios de arquitectura

- `contexts.json`;
- `developments.json`;
- schemas asociados;
- referencias context/development desde occurrences y events;
- seguridad/higiene como capa temática;
- validación cruzada.

## Pendiente G1

- prueba visual real en GitHub Pages;
- Xiaomi 15;
- drawer de capas táctil;
- Fullscreen API;
- reproducción prolongada;
- densidad del mapa con corpus real.

No se declara G1 cerrado hasta validar la versión publicada.

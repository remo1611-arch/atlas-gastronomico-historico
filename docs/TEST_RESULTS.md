# Resultados de validación — 0.1.0-alpha.2

Fecha: 2026-08-11

## PASS

- `python tools/validate_project.py`
  - 10 subjects
  - 8 places
  - 11 occurrences
  - 2 events
  - 3 relationships
- `node --check js/core.js`
- `node --check js/app.js`
- `node tools/test_core.mjs`
  - 14 aserciones temporales
- `python tools/test_ui_contract.py`
  - 64 IDs HTML
  - 59 referencias JS
  - sin IDs requeridas ausentes
- `python tools/test_project_pages.py`
  - 14/14 recursos críticos HTTP 200 bajo un subdirectorio equivalente a GitHub Project Pages

## Alcance de alpha.2

Esta versión modifica la experiencia pública y mantiene el contrato gastronómico canónico.

Implementado:
- experiencia tipo museo digital;
- hero editorial;
- línea temporal protagonista;
- mapa de gran formato;
- categorías cromáticas;
- filtros en drawer;
- ficha lateral;
- dark/light;
- responsive;
- navegación táctil/teclado.

## Pendiente antes de cerrar G1

- validación visual real en GitHub Pages;
- prueba Xiaomi 15;
- comprobación de Fullscreen API;
- revisión táctil del drawer inferior;
- revisión de densidad de etiquetas;
- reproducción prolongada.

No se declara cerrado G1 hasta probar la versión publicada real.

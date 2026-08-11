# Resultados de validación — 0.1.0-alpha.4

Fecha: 2026-08-11

## PASS automático

### Estructura y datos
- `python tools/validate_project.py`: PASS.
- 10 subjects.
- 8 places.
- 11 occurrences.
- 2 events.
- 3 relationships.
- 0 contexts.
- 0 developments.

### JavaScript
- `node --check js/core.js`: PASS.
- `node --check js/app.js`: PASS.
- `node tools/test_core.mjs`: **14 aserciones PASS**.

### Contrato UI
- `python tools/test_ui_contract.py`: PASS.
- 81 IDs HTML.
- 73 referencias JS.

### Capas históricas
- `python tools/test_extended_contract.py`: PASS.
- 13 context types.
- 16 development types.
- 13 impact types.

### Responsive móvil
- `python tools/test_mobile_contract.py`: PASS.
- 9 defensas/contratos críticos comprobados.
- `min-width:0` para flex/grid.
- toolbar mapa en 3 columnas `minmax(0,1fr)`.
- clipping de textos protegido.
- breakpoint para teléfonos muy estrechos.
- build marker alpha.4.

### Tema claro
- `python tools/test_light_contrast.py`: PASS.
- texto principal / surface: 13.70:1.
- texto secundario / surface: 5.76:1.
- acento / surface: 5.06:1.
- bebida / surface: 6.80:1.
- técnica / surface: 5.02:1.
- producto / surface: 5.83:1.
- ingrediente / surface: 5.02:1.
- lugar / surface: 5.68:1.

### GitHub Pages
- `python tools/test_project_pages.py`: **16/16 HTTP 200** bajo subdirectorio de Project Pages.

## Cache busting

Release alpha.4:
- `app.css?v=0.1.0-alpha.4`;
- `app.js?v=0.1.0-alpha.4`;
- `core.js?v=0.1.0-alpha.4`;
- JSON/GeoJSON dinámicos versionados;
- `<meta name="atlas-build" content="0.1.0-alpha.4">`.

## Correcciones basadas en capturas reales Xiaomi 15

- clipping horizontal de `En esta fecha`;
- grids de categorías que podían ampliar viewport;
- toolbar Buscar / Capas / Filtros;
- títulos largos;
- tarjetas de contexto;
- cabecera móvil;
- ancho del mapa y paneles;
- modo claro rehecho.

## Pendiente para cierre formal G1

- publicar alpha.4;
- validar visualmente en Xiaomi 15;
- validar modo claro real;
- revisar drawer Capas;
- Fullscreen API;
- reproducción prolongada.


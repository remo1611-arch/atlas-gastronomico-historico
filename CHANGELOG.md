# Changelog

## 0.1.0-alpha.3 — 2026-08-11

### Museum polish
- métricas KPI sustituidas por franja editorial;
- mapa con mayor peso visual;
- tarjetas y radios simplificados;
- jerarquía móvil refinada;
- panel museográfico de transformaciones.

### Arquitectura histórica
- nuevo `contexts.json`;
- nuevo `developments.json`;
- schemas de contexto y desarrollo;
- `contextRefs` y `developmentRefs` en ocurrencias/eventos;
- capas Civilizaciones y culturas / Ciencia y tecnología / Seguridad e higiene;
- validador preparado para referencias cruzadas.

### Distribución
- cache busting obligatorio en CSS y JS;
- index usa `?v=0.1.0-alpha.3`.

### Datos
- no se añaden datos históricos nuevos;
- contexts y developments quedan vacíos hasta G2.

## 0.1.0-alpha.2 — 2026-08-11

### Museo digital / G1.1
- rediseño completo de la interfaz pública;
- hero editorial;
- mapa como protagonista;
- línea temporal de alto impacto visual;
- atajos de épocas/fechas;
- resumen por categorías;
- filtros en drawer;
- búsqueda desplegable;
- fichas laterales tipo exposición;
- contexto dinámico de la fecha;
- categorías gastronómicas con identidad cromática;
- experiencia táctil y responsive;
- terminología pública sustituye `subject` / `occurrence` en pantalla.

### Conservado
- contrato gastronómico canónico;
- JSON y GeoJSON separados;
- GitHub Pages;
- ausencia de año 0;
- distinción evidencia/lugar/certeza/fuente.

### Datos
- sin contenido histórico nuevo;
- todo el corpus sigue marcado `seed`.

## 0.1.0-alpha.1 — 2026-08-11

### Nuevo proyecto
- reescritura gastronómica desde cero;
- namespace y contratos nuevos;
- subject/occurrence/place/event/relationship/source;
- política específica de orígenes y evidencia;
- precisión cronológica explícita;
- GitHub Pages como distribución principal;
- prototipo temporal y cartográfico;
- schemas;
- validador;
- manifiesto.

### No migrado
- entidades históricas/civilizaciones del atlas anterior;
- corpus histórico anterior;
- supuestas fronteras históricas.


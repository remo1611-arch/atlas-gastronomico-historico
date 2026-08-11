# Changelog

## 0.1.0-alpha.9 — 2026-08-11

### Historia del maíz
- San Andrés;
- Paredones: presencia;
- Paredones: consumo;
- Grandes Lagos;
- África atlántica;
- región cantábrica.

### Events
- Historia del elemento integra events.
- evento canónico de transferencia transatlántica del maíz.
- event demo anterior deprecated + supersededBy.

### Incertidumbre
- tarjeta específica para certainty medium;
- caso africano conserva incertidumbre sobre rutas de introducción.

### Motor
- historias genéricas: occurrence + event + development.
- Historias disponibles muestra número de eventos.

## 0.1.0-alpha.7 — 2026-08-11

### Segunda revisión G2-A
Promovidos a verified:
- maize + Xihuatoxtla;
- garum + Pompeya;
- pasteurización;
- Perkins 1834;
- Monitor Top 1927;
- HACCP.

### Gate verified
- nuevo objeto `verification`;
- independentSourceRefs;
- fecha/método/nota de segunda revisión;
- validación automática.

### Tanda G2-B
- cabra / Ganj Dareh;
- pan tipo torta / Shubayqa 1;
- queso/procesado lácteo / Kuyavia;
- The Forme of Cury;
- appertización;
- Codex 1963.

### Modelo
- prueba real de lugares reviewed sin coordenadas;
- domesticación como proceso;
- recetario ≠ dieta general.

## 0.1.0-alpha.6 — 2026-08-11

### Gate
- G1 cerrado.
- G2 iniciado.

### Corpus reviewed
- vino neolítico de Georgia;
- maíz temprano de Xihuatoxtla;
- garum en Pompeya;
- Shulaveri-Shomutepe;
- marco imperial romano occidental;
- pasteurización;
- refrigeración mecánica 1834;
- Monitor Top 1927;
- HACCP década de 1960.

### Trazabilidad
- `sourceRefs` en subjects y places;
- procedencia específica de puntos cartográficos;
- fuentes visibles en fichas;
- badges reviewed/seed/verified;
- developments reales en panel Transformaciones.

### Migración
- wine_demo → wine;
- maize_demo → maize;
- garum_demo → garum;
- demos conservados como deprecated.

## 0.1.0-alpha.5 — 2026-08-11

### Interaction hardening
- eliminado estado duplicado `subjectType`;
- chips, resumen y dropdown usan `s.category`;
- reset completo de filtros;
- buscador con debounce de 160 ms;
- marcadores con aparición temporal suave y respeto a reduced motion.

### Data hardening
- registros sin coordenadas permanecen en lista;
- aviso visible de cobertura cartográfica incompleta;
- `console.warn` una sola vez por registro sin punto;
- validador reporta número de occurrences no cartografiables;
- tests específicos de filtro, debounce y cobertura.

### Arquitectura futura
- rutas museográficas documentadas como extensión reservada;
- no se crea `tours.json` todavía;
- no se confunde grafo histórico con recorrido editorial.

### Incluye
- todo el mobile polish y nuevo tema claro de alpha.4.

## 0.1.0-alpha.4 — 2026-08-11

### Mobile polish
- eliminado overflow horizontal involuntario;
- flex/grid con `min-width:0`;
- toolbar Buscar / Capas / Filtros estabilizada;
- títulos y textos largos con wrapping seguro;
- `En esta fecha` corregido para móvil;
- cabecera móvil más compacta;
- tarjetas de contexto y evidencias ajustadas;
- mapa móvil optimizado.

### Light theme refinement
- paleta clara rehecha desde cero;
- fondo marfil/mineral;
- superficies cálidas;
- acentos cobre, oliva, violeta, turquesa y azul más sobrios;
- mapa claro desaturado;
- sombras y líneas reducidas.

### Distribución
- recursos y datos siguen versionados con `0.1.0-alpha.4`;
- meta `atlas-build` añadida para diagnóstico de versión.

### Arquitectura
- sin cambios de contrato;
- contexts/developments/capas de alpha.3 se conservan.

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


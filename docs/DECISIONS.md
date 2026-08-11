# Registro de decisiones

## ADR-001 — Reescritura gastronómica desde cero
**Aceptada.**
El Atlas Histórico Mundial anterior se conserva solo como antecedente conceptual. El nuevo proyecto tiene contratos y namespace propios.

## ADR-002 — Tiempo como eje primario
**Aceptada.**

## ADR-003 — `subject` no contiene una cronología universal
**Aceptada.**
La presencia histórica se modela mediante `occurrence`.

## ADR-004 — `occurrence` como unidad central
**Aceptada.**
Permite múltiples evidencias de un mismo ingrediente, técnica o plato en diferentes fechas y lugares.

## ADR-005 — Sin campo canónico `origin`
**Aceptada.**
Los orígenes se modelan mediante evidencias, hipótesis, domesticaciones, primeras atestiguaciones y eventos.

## ADR-006 — Fechas inciertas explícitas
**Aceptada.**
El motor puede normalizar rangos, pero la interfaz deberá conservar la precisión editorial.

## ADR-007 — Mapa moderno solo como contexto
**Aceptada.**

## ADR-008 — GitHub Pages como distribución principal
**Aceptada.**
Rutas relativas y `.nojekyll`.

## ADR-009 — Sin backend obligatorio
**Aceptada.**

## ADR-010 — Corpus semilla antes de corpus amplio
**Aceptada.**
Los ejemplos iniciales tensionan el modelo pero no se consideran verificados.

## ADR-011 — Civilizaciones como capa contextual
**Aceptada.**
Las civilizaciones, culturas, pueblos y entidades políticas se almacenan en `contexts.json` y se vinculan a evidencias gastronómicas mediante `contextRefs`. No se reintroduce el modelo de “civilización” como núcleo del Atlas.

## ADR-012 — Transformaciones científicas y tecnológicas
**Aceptada.**
Se crea `developments.json` para descubrimientos científicos, tecnologías alimentarias, aparatos, frío, energía, industria, envases y logística.

## ADR-013 — Seguridad e higiene como capa temática
**Aceptada.**
Higiene, seguridad alimentaria, salud pública, regulación y sistemas de calidad son developments con una capa visual propia.

## ADR-014 — Cache busting obligatorio
**Aceptada.**
CSS, JS y todos los datos cargados dinámicamente deben llevar identificador de versión en cada release de GitHub Pages. `app.js` debe versionar también su importación de `core.js`.

## ADR-015 — Tema claro como identidad propia
**Aceptada.**
El modo claro no es una inversión cromática del oscuro. Usa una paleta editorial cálida, manteniendo semántica de categorías y contraste.

## ADR-016 — No overflow horizontal de página
**Aceptada.**
En móvil, solo pueden desplazarse horizontalmente componentes explícitos como leyendas o atajos. La página, paneles, títulos, grids y toolbars no deben ampliar el viewport.


# Alpha.22 — Navigation hardening

## Propósito

Endurecer la transición entre las tres capas de producto:

`Historias → Atlas → Evidencia`

sin ampliar el corpus ni añadir una tercera historia.

## Rutas públicas internas

- `#historias`
- `#historia/<storyId>/<sceneNumber>`
- `#atlas`
- `#atlas/evidencia/<occurrenceId>`
- `#atlas/hito/<kind>/<id>`
- `#atlas/fecha/<engineYear>`

Las rutas usan hash para ser compatibles con GitHub Pages sin configuración de rewrites.

## Atrás / Adelante

Las escenas narrativas generan entradas de historial.

Ejemplo:

`Historias → Vino escena 1 → escena 2 → Ver en Atlas`

Al usar Atrás, el navegador puede reconstruir:

`Atlas → escena 2 → escena 1 → Historias`.

Esto es especialmente importante en Android, donde el botón Atrás forma parte natural de la navegación.

## Evidencias ocultas por filtros

Antes de alpha.22 una escena podía enlazar una occurrence que quedara oculta por:
- búsqueda previa;
- filtro de evidenceType;
- occurrenceType;
- certainty;
- precision;
- mapped/unmapped;
- subject category;
- capa gastronómica desactivada.

Alpha.22 ajusta solo esos estados incompatibles cuando el usuario pide explícitamente `Ver en el Atlas`.

## Events y developments

Una transformación como Pasteur ya no abre Atlas limitándose a cambiar de fecha.
Se localiza su entrada en `temporalCorpusItems()`, se aplica `focusTemporalItem()` y se desplaza la vista al navegador temporal.

## Intervalos

`temporalSnapCandidate()` ya no trata las occurrences como puntos forzados al inicio.

Para cualquier entidad temporal:
- target dentro del intervalo → conserva target;
- target fuera → límite más cercano.

Esto recupera la semántica de intervalos definida durante G3.

## Anterior / siguiente

Si existe `s.temporalSelection`, el paso se calcula por posición en el corpus temporal ordenado.
Esto evita dos problemas:
- volver a seleccionar el mismo intervalo cuando el año actual está dentro de él;
- saltarse hitos distintos que comparten la misma fecha inicial.

## QA

Nuevos gates:
- `test_navigation_algorithms.mjs`;
- `test_story_atlas_roundtrip.py`;
- `test_navigation_route_data.py`;
- `test_canonical_rule_numbering.py`.

No sustituye la aceptación táctil real en Xiaomi.

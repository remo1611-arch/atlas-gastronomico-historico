# Gate móvil — alpha.28 · Cacao/chocolate

Objetivo: verificar que la primera expansión post-freeze no introduce regresiones y que la nueva visita funciona como relato museográfico en pantalla pequeña.

## Identificación y portada
- [ ] La interfaz muestra `alpha.28`.
- [ ] La portada muestra Vino, Pan, Fermentación y Cacao/chocolate sin desbordes ni jerarquía confusa.
- [ ] Entrar y salir de Cacao no altera las otras tres historias.

## Historia de Cacao/chocolate
- [ ] Recorre 5 escenas con anterior/siguiente.
- [ ] La escena 1 deja claro que cacao antiguo no equivale automáticamente a chocolate.
- [ ] La escena 2 presenta la fermentación de pulpa como hipótesis interpretativa, no como receta demostrada.
- [ ] La escena 3 permite entender qué aportan vasos, escritura e iconografía maya.
- [ ] La escena 4 explica adopción/reformulación atlántica sin un relato lineal de «Europa corrige una bebida amarga».
- [ ] La escena 5 distingue prensa de Van Houten, ensayos de Daniel Peter y conchado de Lindt.
- [ ] La longitud total resulta legible y no obliga a scroll excesivamente fatigante por escena.

## Atlas y mapa
- [ ] `Ver en el Atlas` conserva fecha/foco/ficha cuando existe un registro apropiado.
- [ ] Atrás de Android regresa a la misma escena.
- [ ] Las escenas sin punto explican la ausencia sin aparentar un fallo.
- [ ] Los puntos urbanos de Amsterdam, Vevey y Berna se entienden como referencias de developments, no como fronteras o áreas de difusión.
- [ ] `Mundo` recupera correctamente la vista global.

## Búsqueda
- [ ] Buscar `cacao` devuelve el nuevo subject/registros pertinentes.
- [ ] Buscar `chocolate` recupera Cacao por alias y developments relacionados.
- [ ] `vino` y `pan` mantienen su comportamiento previo.

## Regresión general
- [ ] Vino: Historia → Atlas → Atrás funciona.
- [ ] Pan: Historia → Atlas → Atrás funciona.
- [ ] Fermentación: Historia → Atlas → Atrás funciona.
- [ ] Navegación Historias ↔ Atlas y Atrás Android no crea pantallas vacías ni pierde la escena.

## Criterio de cierre
Alpha.28 pasa el gate móvil si no hay defecto funcional reproducible y un visitante puede explicar al terminar al menos tres transformaciones: evidencia temprana de uso de cacao, cambio social/técnico en las bebidas y transformación industrial del siglo XIX.

# Estado actual

## Proyecto
Atlas Gastronómico Histórico

## Versión
0.1.0-alpha.11

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO.
- G3+: no iniciados.

## Corpus
Sin cambios históricos respecto a alpha.10:
- 17 subjects;
- 25 places;
- 28 occurrences;
- 3 events;
- 3 relationships;
- 7 contexts;
- 6 developments;
- 48 sources.

## Alpha.11 — Unified Timeline

La cronología semántica es ahora la única línea temporal de la aplicación.

### Eliminado
- slider `yearRange`;
- botones ±1/10/100/500;
- botón Play;
- selector de velocidad;
- `playStep`;
- `playStepOptions`;
- estado `playing`;
- timer de reproducción;
- CSS y listeners asociados.

### Conservado
- fecha actual grande;
- atajos de periodos;
- Ir al año;
- hito anterior/siguiente;
- densidad de evidencias;
- marcas verified;
- bands de events;
- bands de developments.

### Selección
- tap/click en cualquier zona libre;
- drag con Pointer Events;
- selección de marcas;
- teclado en cursor:
  - ← hito anterior;
  - → hito siguiente;
  - Home mínimo;
  - End máximo.

### Rendimiento
El drag no ejecuta un render completo en cada movimiento.
La fecha y cursor se previsualizan mediante requestAnimationFrame y el corpus se actualiza al soltar.

## Pendiente
Validación visual/táctil real en Xiaomi 15.

Después:
G2-D · nixtamalización + primer caso disputed.

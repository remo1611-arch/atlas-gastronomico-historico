# Resultados de validación — 0.1.0-alpha.23

Fecha: 2026-08-11

## Resultado
**GEOGRAPHIC EXPLORER: PASS**

## Corpus
- 11 subjects.
- 30 places.
- 30 occurrences.
- 1 event.
- 1 relationship.
- 7 contexts.
- 7 developments.
- 86 sources.
- 2 stories.
- 13 narrative scenes.
- 16 glossary entries.

## Diagnóstico que motivó alpha.23
Semántica anterior:
`map = occVisible() = filtro por año exacto`.

Baseline a 1500:
- 1 occurrence activa;
- 0 occurrences activas con punto.

Por tanto el mapa quedaba visualmente vacío aunque el corpus tuviese:
- 16 occurrences geolocalizadas.

## Semántica alpha.23
- `occMapVisible()` = mapa global filtrado por búsqueda/filtros, sin año exacto.
- `occVisible()` = occurrences activas en la fecha.
- mapa = `occMapVisible()`.
- `En esta fecha` = `occVisible()`.
- fecha seleccionada = énfasis visual sobre los pines.

## Búsqueda
PASS:
- global, independiente del año;
- resultados textuales visibles;
- zero-state explícito;
- autoencuadre;
- click sincroniza fecha y ficha;
- consultas cortas por palabra/prefijo.

Baselines:
- `vino`: 5 occurrences globales · 5 mapped · 0 activas en 1500;
- `pan`: 7 occurrences · sin falso positivo por `España`.

## Navegación cartográfica
PASS:
- vista mundial inicial;
- fit regional para resultados;
- fit a una occurrence seleccionada;
- botón `Mundo`;
- marker click → periodo + detalle;
- story/deep-link → región de la evidence cuando existe point;
- unmapped sigue accesible.

## Regresión
- Python gates: **50/50 PASS**.
- Node gates/checks: **6/6 PASS**.
- G3 FINAL GATE: PASS.
- Focused Exploration: PASS.
- Progressive Disclosure: PASS.
- Narrative Museum: PASS.
- Navigation Hardening: PASS.
- GitHub Pages: **18/18 PASS**.
- G2 frozen fingerprint: **9/9 PASS**.
- canonical rules: **163/163**.

## QA visual
No se declara una nueva validación visual/táctil automatizada de alpha.23.

El gate pendiente es comprobar en el dispositivo real:
1. mapa mundial con pines visibles;
2. diferencia visual entre fecha actual y otras fechas;
3. búsqueda `vino`;
4. búsqueda `pan`;
5. encuadre regional;
6. tap de pin → fecha/ficha;
7. reset `Mundo`;
8. legibilidad y densidad de pines en móvil.

Hasta ese gate no se amplía el corpus.

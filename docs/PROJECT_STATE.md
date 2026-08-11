# Estado actual

## Proyecto
Atlas Gastronómico Histórico

## Versión
0.1.0-alpha.23

## Producto
- Historias = entender.
- Atlas = explorar.
- Evidencia = comprobar.

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: CERRADO.
- G3: CERRADO.
- Narrative Museum: integrado.
- Navigation Hardening: integrado.
- **Geographic Explorer: integrado.**
- E1 editorial: PAUSADO.
- G4: NO INICIADO.

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

## Cobertura espacial
- 16 occurrences con punto.
- 14 sin punto.

## Cambio cartográfico alpha.23

Antes:
`occVisible()` filtraba por `active(period, year)` antes de renderizar el mapa.

Consecuencia verificable:
- año inicial 1500;
- 1 occurrence activa;
- esa occurrence no tiene punto;
- mapa = 0 pines.

Ahora:
- `occMapVisible()` aplica búsqueda/filtros sin exigir coincidencia temporal;
- `occVisible()` conserva el filtro temporal estricto para `En esta fecha`;
- mapa inicial = hasta 16 occurrences geolocalizadas;
- las occurrences activas en la fecha seleccionada se resaltan;
- las demás permanecen visibles en segundo plano.

## Búsqueda
- global respecto al corpus filtrado;
- resultados textuales visibles;
- fecha + headline + lugar;
- estado cero explícito;
- selección sincroniza mapa + tiempo + detalle;
- términos cortos por palabra/prefijo.

Ejemplo baseline:
- `vino`: 5 occurrences, 5 con punto, aunque en 1500 no haya vino activo;
- `pan`: 7 occurrences, sin falsos positivos por `España`.

## Mapa
El autoencuadre de resultados modifica únicamente el `viewBox`.

No representa:
- difusión;
- comercio;
- influencia;
- trayectorias.

No se dibujan líneas automáticas entre puntos.

## Contrato histórico
G2 fingerprint permanece protegido 9/9.

## Próximo gate
Validación táctil/visual real de:
1. mapa inicial no vacío;
2. búsqueda Vino/Pan;
3. autoencuadre;
4. selección mapa → fecha → ficha;
5. botón Mundo;
6. legibilidad en móvil.

No ampliar corpus hasta validar esta experiencia.

# Estado actual

## Versión
0.1.0-alpha.24.1

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Arquitectura candidata a congelación. No ampliar corpus hasta superar el gate móvil y el posterior gate museográfico de Vino/Pan.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum: integrado.
- Navigation Hardening: integrado.
- Geographic Explorer: integrado.
- **Product Consolidation alpha.24: implementado técnicamente; aceptación Xiaomi pendiente.**
- E1: PAUSADO.
- G4: NO INICIADO.

## Corpus
11 subjects · 30 places · 30 occurrences · 1 event · 1 relationship · 7 contexts · 7 developments · 86 sources · 2 stories · 13 escenas · 16 términos de glosario.

## Cobertura espacial
- occurrences: 16 con punto / 14 sin punto;
- contexts: 5 con punto cartografiable / 2 sin punto;
- developments: 1 con punto cartografiable / 6 sin punto.

«Sin punto» puede ser correcto para ámbitos regionales, multiterritoriales o sin localización puntual suficientemente sustentada.

## Alpha.24
Corrige:
- omisión silenciosa de contexts/developments sin punto;
- selección del primer lugar existente en vez del primer lugar cartografiable;
- falta de guard defensivo en `renderMapCoverage()`;
- pérdida de `gate`/`phase` al regenerar MANIFEST.

Incorpora:
- `placeHasMapPoint()`;
- `firstResolvedPlace()` y `firstMappablePlace()`;
- diagnóstico multicapas visible;
- explicación de registros regionales/multiterritoriales;
- estado espacial de developments en búsqueda;
- separación lugar descriptivo / lugar cartografiable en escenas;
- tests multicapas y de estabilidad del manifiesto.

## Contratos preservados
Corpus, stories/glossary y G2 fingerprint sin cambios. No se inventan coordenadas. G4 sigue sin iniciarse.

## Próximo paso
Ejecutar `docs/MOBILE_ACCEPTANCE_ALPHA24.md`. Si pasa: pulido museográfico Vino/Pan → congelación formal del contrato → E1 Fermentación.

# Resultados de validación — 0.1.0-alpha.29

## Alcance
Alpha.29 incorpora **Historia del Café** como segunda expansión editorial posterior al Product Contract Freeze de alpha.27. El gate demuestra crecimiento de contenido sin modificar la arquitectura congelada.

## Resultado reproducible previo al empaquetado
- `tools/validate_project.py`: PASS.
- `node --check js/app.js`: PASS.
- `node --check js/core.js`: PASS.
- Python `tools/test_*.py`: **57/57 PASS** (30/30 + 27/27 en lotes controlados).
- Node `tools/test_*.mjs`: **5/5 PASS**.
- JSON Schema: PASS.
- Story Types: PASS.
- Historia Café: PASS.
- Profundidad editorial: PASS.
- Gate museográfico: PASS.
- Product Contract Freeze: PASS; fingerprint alpha.27 intacto.
- Navegación/deep links: PASS.
- Story ↔ Atlas round-trip: PASS.
- Cobertura multicapas: PASS.
- G2 fingerprint: preservado.

## Cambios de corpus
Respecto a alpha.28 se añaden:
- 1 subject (`coffee`);
- 5 places;
- 1 occurrence;
- 5 developments;
- 12 sources;
- 1 story / 5 escenas;
- 4 términos de glosario.

Corpus resultante: 15 subjects · 45 places · 38 occurrences · 1 event · 1 relationship · 7 contexts · 18 developments · 121 sources · 5 stories · 28 escenas · 27 términos de glosario.

## Cobertura espacial
- occurrences: 18 con punto / 20 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 9 con punto / 9 sin punto.

Yemen temprano permanece sin punto único. Estambul, Oxford, Batavia/Jakarta y Milán son referencias urbanas, no coordenadas exactas de establecimientos, plantaciones o máquinas históricos.

## Protección epistemológica de Café
- Kaldi no se incorpora como evidencia factual.
- Origen botánico de Arabica y documentación de la bebida se mantienen separados.
- Oxford conserva explícitamente la discrepancia 1650/1651 entre fuentes institucionales.
- El traslado de material vegetal a Batavia 1696–1699 se contextualiza como proceso colonial.
- Bezzera 1902–1903 y Gaggia 1938–1947 se modelan como etapas diferentes.
- `espresso` no es alias del subject `coffee`; permanece como concepto/método recuperable mediante developments y glosario.

## Protección post-freeze
`docs/PRODUCT_CONTRACT_FINGERPRINT.json` conserva `frozenAt = 0.1.0-alpha.27`. Los diez schemas coinciden con sus SHA-256 congelados. Alpha.29 no actualiza el fingerprint para acomodar contenido nuevo.

## Estado
**QA automatizado PASS.** Pendiente únicamente la aceptación táctil/visual de alpha.29 en dispositivo real.

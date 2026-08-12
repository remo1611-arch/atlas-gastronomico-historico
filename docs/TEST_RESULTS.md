# Resultados de validación — 0.1.0-alpha.30

## Alcance
Alpha.30 incorpora **Historia del Azúcar** como tercera expansión editorial posterior al Product Contract Freeze de alpha.27. El gate vuelve a demostrar crecimiento de contenido sin modificar la arquitectura congelada.

## Resultado reproducible previo al empaquetado
- `tools/validate_project.py`: PASS.
- `node --check js/app.js`: PASS.
- `node --check js/core.js`: PASS.
- Python `tools/test_*.py`: **58/58 PASS** (30/30 + 28/28 en lotes controlados).
- Node `tools/test_*.mjs`: **5/5 PASS**.
- JSON Schema: PASS.
- Historia Azúcar: PASS.
- Profundidad editorial: PASS.
- Gate museográfico: PASS.
- Product Contract Freeze: PASS; fingerprint alpha.27 intacto.
- Navegación/deep links: PASS.
- Story ↔ Atlas round-trip: PASS.
- Cobertura multicapas: PASS.
- G2 fingerprint: preservado.

## Cambios de corpus
Respecto a alpha.29 se añaden:
- 1 subject (`sugar`);
- 6 places;
- 2 occurrences;
- 5 developments;
- 14 sources;
- 1 story / 5 escenas;
- 5 términos de glosario.

Corpus resultante: 16 subjects · 51 places · 40 occurrences · 1 event · 1 relationship · 7 contexts · 23 developments · 135 sources · 6 stories · 33 escenas · 32 términos de glosario.

## Cobertura espacial
- occurrences: 19 con punto / 21 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 11 con punto / 12 sin punto.

Nueva Guinea y Asia meridional permanecen deliberadamente regionales. Funchal y Berlín son referencias urbanas; el sistema atlántico no recibe centroide y Cunern permanece sin punto hasta disponer de una georreferencia histórica específica.

## Protección epistemológica de Azúcar
- La domesticación de la caña se separa de la fabricación de sacarosa cristalizada.
- La cronología antigua de cristalización conserva un intervalo amplio y `certainty: medium`.
- Madeira no se convierte en una flecha de difusión lineal.
- El tramo atlántico explicita esclavitud, coerción y escala humana.
- Marggraf 1747 y Achard 1801 se mantienen como etapas separadas.
- El test permite frases que refutan explícitamente un mito y rechaza solo afirmaciones positivas no negadas.

## Protección post-freeze
`docs/PRODUCT_CONTRACT_FINGERPRINT.json` conserva `frozenAt = 0.1.0-alpha.27`. Los diez schemas coinciden con sus SHA-256 congelados. Alpha.30 no actualiza el fingerprint para acomodar contenido nuevo.

## Estado
**QA automatizado PASS.** Pendiente únicamente la aceptación táctil/visual de alpha.30 en dispositivo real.

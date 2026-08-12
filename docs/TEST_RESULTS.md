# Resultados de validación — 0.1.0-alpha.28

## Alcance
Alpha.28 incorpora la primera historia editorial completa posterior al freeze: **Cacao/chocolate**. El objetivo del gate es demostrar expansión de conocimiento sin modificar la arquitectura congelada en alpha.27.

## Resultado reproducible previo al empaquetado
- `tools/validate_project.py`: PASS.
- `node --check js/app.js`: PASS.
- `node --check js/core.js`: PASS.
- Python `tools/test_*.py`: **56/56 PASS**.
- Node `tools/test_*.mjs`: **5/5 PASS**.
- JSON Schema: PASS.
- Story Types: PASS.
- Historia Cacao/chocolate: PASS.
- Profundidad editorial: PASS.
- Gate museográfico: PASS.
- Product Contract Freeze: PASS (fingerprint alpha.27 intacto).
- Navegación/deep links: PASS.
- Story ↔ Atlas round-trip: PASS.
- Cobertura multicapas: PASS.
- G2 fingerprint: preservado.

## Cambios de corpus
Respecto a alpha.27 se añaden:
- 1 subject (`cacao`);
- 7 places;
- 3 occurrences;
- 4 developments;
- 11 sources;
- 1 story / 5 escenas;
- 3 términos de glosario.

Corpus resultante: 14 subjects · 40 places · 37 occurrences · 1 event · 1 relationship · 7 contexts · 13 developments · 109 sources · 4 stories · 23 escenas · 23 términos de glosario.

## Cobertura espacial
- occurrences: 18 con punto / 19 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 4 con punto / 9 sin punto.

No se añaden coordenadas a Santa Ana-La Florida, Puerto Escondido, la región maya ni al proceso atlántico cuando la fuente canónica seleccionada no sustenta un punto histórico único.

## Protección post-freeze
`docs/PRODUCT_CONTRACT_FINGERPRINT.json` conserva `frozenAt = 0.1.0-alpha.27`. Los diez schemas siguen coincidiendo con sus SHA-256 congelados. Alpha.28 no actualiza el fingerprint para «hacer pasar» el contenido.

Los tests de Geographic Explorer, cobertura y Story Types se han hecho resistentes al crecimiento editorial: validan invariantes funcionales y no cantidades accidentales de una versión anterior.

## Estado
**QA automatizado PASS.** Pendiente únicamente la aceptación táctil/visual de alpha.28 en dispositivo real antes de considerar cerrado el dossier Cacao/chocolate.

# Prompt de continuidad

Toma este ZIP como base canónica del **Atlas Gastronómico Histórico**. Es una reescritura desde cero del proyecto de atlas general anterior.

Antes de modificar:
1. verifica `MANIFEST.json`;
2. lee `docs/PROJECT_STATE.md`;
3. lee `docs/CANONICAL_RULES.md`;
4. lee `docs/DATA_MODEL.md`;
5. lee `docs/ROADMAP.md`;
6. lee `docs/DECISIONS.md`.

Reglas críticas:
- tiempo como eje;
- `subject` no contiene un origen universal;
- la unidad histórica central es `occurrence`;
- no inventar fechas, orígenes, difusión ni fronteras;
- separar evidencia, inferencia y tradición;
- GitHub Pages es la distribución principal;
- no usar rutas web absolutas;
- separar auditoría, modificación y validación;
- no ampliar masivamente el corpus antes de cerrar el gate actual.

Indica siempre gate abierto, cambios, pruebas PASS/FAIL y pendientes.


Estado actual:
- G1 CERRADO.
- G2 EN CURSO.
- No volver a rediseñar G1 salvo defecto reproducible.
- Continuar desde `docs/G2_PILOT.md`.
- `reviewed` no se promueve a `verified` sin segunda revisión explícita.

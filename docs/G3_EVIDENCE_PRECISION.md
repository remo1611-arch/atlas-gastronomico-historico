# G3-A — Evidencia y precisión

Release: `0.1.0-alpha.16`

## Objetivo

Mejorar cómo se interpreta el corpus G2 sin modificar su contrato de datos.

G3-A separa visualmente:

1. estado editorial;
2. certeza histórica;
3. precisión cronológica;
4. precisión espacial;
5. base documental.

No se crea ningún score de calidad.

---

# Contrato G2 congelado

Se añade:

`docs/G2_CONTRACT_FINGERPRINT.json`

Contiene SHA-256 de:
- taxonomy;
- 8 schemas.

`test_g3_evidence_precision.py` compara los archivos actuales con la huella de alpha.15.

Resultado esperado:
un cambio de UI no puede alterar silenciosamente el modelo G2.

---

# Nuevos filtros

## Certeza histórica
Estado:
`s.certainty`

Valores:
- all;
- high;
- medium;
- low;
- disputed;
- unknown.

La certeza no equivale a reviewed/verified.

## Precisión cronológica
Estado:
`s.precision`

Los valores disponibles se derivan de los periodos públicos existentes.

La UI utiliza etiquetas:
- exact → Exacta;
- year → Año;
- decade → Década;
- circa → Aproximada;
- range → Intervalo;
- century → Siglo;
- millennium → Milenio;
- etc.

No se transforma un `range` en una fecha central ni un `circa` en un año exacto.

## Cobertura cartográfica
Estado:
`s.spatial`

Valores:
- all;
- mapped;
- unmapped.

Un registro `unmapped` sigue teniendo `placeRef`.
Solo carece de un punto cartográfico suficientemente fiable.

---

# Lente de evidencia

La columna “En esta fecha” incorpora un resumen derivado de los registros visibles:

- distribución de certeza;
- distribución de precisión cronológica;
- registros con/sin punto.

No se persiste ningún dato nuevo.
No se calcula un índice de calidad.

---

# Ficha de evidencia

La ficha separa cinco dimensiones.

## Resolución cronológica
Explica qué significa la precisión declarada.

Ejemplo:
`range`

se muestra como:
`Intervalo`

y se explica que no existe una fecha única válida.

## Certeza histórica
Explica el significado editorial de:
- high;
- medium;
- low;
- disputed;
- unknown.

Estas explicaciones son definiciones de lectura, no una justificación específica inventada para cada registro.

## Estado editorial
Explica:
- reviewed;
- verified.

La UI recuerda explícitamente:

`verified ≠ certeza absoluta`.

## Precisión espacial
Explica:
- exact_from_publication;
- reference;
- approximate;
- ausencia de punto.

## Base documental
Resume:
- número de fuentes;
- tipos de fuente.

Se incluye la regla:
“más fuentes” no equivale automáticamente a “más certeza”.

---

# Comparación de fuentes

Cuando hay dos o más fuentes, la ficha ofrece un `<details>`:

`Comparar N fuentes`

Muestra:
- tipo;
- publisher/institución;
- título;
- notas;
- enlace.

No:
- puntúa;
- ordena de mejor a peor;
- escoge una fuente ganadora.

---

# Registros sin punto

El aviso del mapa deja de ser únicamente informativo.

Ahora incluye:
`Ver N registros sin punto`

Cada registro se puede abrir directamente.

Se mantiene la política:
no usar centroides arbitrarios para regiones o yacimientos sin coordenadas canónicas.

---

# Alcance deliberadamente no cubierto

G3-A **no añade todavía un “por qué esta certeza es high/medium” específico por registro**.

El modelo actual no dispone de un campo canónico de rationale.

Antes de añadirlo debe existir:
- caso real;
- necesidad editorial demostrada;
- ADR;
- migración;
- schema update;
- tests.

Esto respeta la congelación de G2.


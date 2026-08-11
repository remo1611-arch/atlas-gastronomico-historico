# G3-B — Cronología y desacuerdo

Release: `0.1.0-alpha.17`

## Objetivo

Profundizar en dos problemas de lectura detectados durante G3:

1. una fecha mostrada como texto no comunica por sí sola cuánta resolución tiene;
2. una historia vertical con tarjetas equidistantes puede sugerir falsamente que los intervalos entre hitos también son equidistantes.

Además, el primer caso `disputed` necesitaba una comparación documental más explícita.

G3-B resuelve estos problemas sin modificar schemas, taxonomy ni corpus.

---

# Ventana temporal del hito enfocado

La Unified/Magnetic Timeline incorpora:

`#temporalPrecisionWindow`

Se deriva del mismo `period` que utiliza el registro.

## Comportamiento

### point
Una fecha puntual se representa como una marca estrecha.

### range
Un intervalo se representa como banda entre `period.start` y `period.end`.

### circa
La banda conserva el intervalo, pero usa tratamiento visual discontinuo/difuso.

### broad
`century`, `millennium` y `phase` reciben una señal de resolución amplia.

### before / after
Se conserva la semántica de límite abierto.

La ventana:
- no es un slider;
- no acepta input;
- no modifica los datos;
- acompaña al hito seleccionado o candidato magnético.

---

# Perfil cronológico en la ficha

La ficha G3-A incorpora un perfil local derivado de:

- `period.display`;
- `period.precision`;
- `period.start`;
- `period.end`.

Se muestra:
- resolución;
- intervalo declarado;
- amplitud aproximada en años cuando procede.

La amplitud se calcula con el motor ordinal histórico para respetar la ausencia de año 0.

Ejemplo:

```text
-1 → 1
```

equivale a un año de separación ordinal, no a dos.

El perfil no es un score de calidad.

---

# Distancia entre hitos en Historia del elemento

Las tarjetas continúan usando un layout legible y no proporcional.

Para evitar que la equidistancia visual se interprete como equidistancia histórica, cada hito posterior muestra:

- `≈ N años desde el final del hito anterior`;
- `Continuidad temporal`;
- o `Se solapa temporalmente con el hito anterior`.

El cálculo usa:

```text
current.period.start - previous.period.end
```

en ordinales históricos.

No se usa:
`current.start - previous.start`.

Esto importa cuando el hito anterior es un intervalo largo.

---

# Precisión y certeza en todos los hitos

Historia del elemento muestra ahora de forma consistente:

- precision;
- certainty;

para:
- occurrence;
- event;
- technique;
- development.

`high` deja de ser visualmente implícito.

---

# Disputed — comparación documental

El bloque `DEBATE ABIERTO` muestra:

- pregunta historiográfica;
- número de posiciones;
- número de fuentes únicas;
- si existen fuentes compartidas entre posiciones;
- resumen de cada posición;
- perfil documental de cada posición;
- enlaces;
- comparación desplegable cuando una posición usa varias fuentes.

## Neutralidad editorial

La UI declara explícitamente:

> revisar correctamente un desacuerdo no significa que el Atlas lo haya resuelto.

No existe:
- winner;
- preferred position;
- consensus score;
- ranking automático.

Las posiciones mantienen las fuentes declaradas en:

`dispute.positions[].sourceRefs`

---

# Contrato G2

Fingerprint:
`9/9` archivos intactos.

No se modifican:
- taxonomy;
- 8 schemas.

No se añade ningún campo nuevo.

---

# Alcance pendiente

G3-B no intenta:
- inferir automáticamente por qué una fuente es mejor que otra;
- medir “fuerza” de una postura;
- convertir amplitud cronológica en calidad;
- reordenar la Historia del elemento proporcionalmente a miles de años.

Estas decisiones necesitarían casos y criterios adicionales.


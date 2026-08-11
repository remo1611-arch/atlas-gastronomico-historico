# Alpha.21 — Narrative Museum Integration

Release: `0.1.0-alpha.21`

## Decisión de producto

La aplicación deja de utilizar el Atlas como puerta de entrada principal.

La jerarquía pública pasa a ser:

1. **Historias — entender**;
2. **Atlas — explorar**;
3. **Evidencia — comprobar**.

La decisión procede de la validación del prototipo Narrative Museum v2 con Historia del vino e Historia del pan.

---

# Capa editorial nueva

Se incorporan dos recursos canónicos independientes del corpus histórico:

- `data/stories.json`;
- `data/glossary.json`.

Y dos schemas:

- `schemas/story.schema.json`;
- `schemas/glossary.schema.json`.

Los 8 schemas históricos de G2 no se modifican.
El fingerprint G2 sigue siendo 9/9 porque protege taxonomy + esos 8 schemas originales.

## Principio de referencia

Una historia **no copia** occurrences, events o developments.

Cada escena contiene:

```text
itemRefs[]
  kind: occurrence | event | development
  ref: id canónico
```

La narración explica la evidencia.
El corpus sigue siendo la fuente estructurada de la afirmación histórica.

---

# Contrato de una escena pública

Toda escena revisada debe incluir:

- orientación geográfica actual;
- región histórica/geográfica;
- contexto humano/social;
- mínimo dos párrafos narrativos, con gate editorial más exigente en QA;
- referencias a evidencias canónicas;
- fuentes;
- explicación de método;
- límites: qué no podemos afirmar;
- por qué importa;
- transición/pregunta siguiente;
- términos de glosario cuando sean necesarios.

La interfaz integra estos campos de forma narrativa; no se presentan como un formulario permanente.

---

# Historias publicadas

## Historia del vino

6 escenas:

1. Gadachrili Gora;
2. Areni-1;
3. Abydos;
4. Tel Kabri;
5. Jerusalén antes de 586 a. C.;
6. Pasteur y conservación del vino.

## Historia del pan

7 escenas:

1. Shubayqa 1;
2. Çatalhöyük;
3. comparación Küllüoba / Parkhaus Opéra;
4. Ain Sukhna;
5. Saint-Memmie;
6. regulación medieval inglesa;
7. Chorleywood.

No existe `renderWineStory()` ni `renderBreadStory()`.
Ambas usan el mismo motor genérico.

---

# Atlas como segunda experiencia

El Atlas conserva:

- timeline;
- mapa;
- búsqueda;
- filtros;
- fichas;
- certainty/precision;
- disputed;
- sources;
- capas históricas.

Pero cambia la forma de titular occurrences en la timeline.

Antes:

```text
Vino
Vino
Vino
```

Ahora el título se deriva de la afirmación:

```text
Evidencia de Vino · Gadachrili Gora
Producción de Vino · Cueva Areni-1
Almacenamiento de Vino · Tel Kabri
```

La repetición del subject deja de parecer repetición del dato.

---

# Corrección de navegación temporal

Alpha.20 contenía:

- botones `prevTemporalHitBtn` / `nextTemporalHitBtn`;
- algoritmo `stepTemporalHit()`;
- navegación mediante teclado;

pero **no contenía el binding click de los botones visibles**.

Alpha.21 añade explícitamente:

```js
$('#prevTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(-1));
$('#nextTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(1));
```

Y un gate específico:

`test_primary_navigation_bindings.py`

La regla de QA queda generalizada:

> una acción primaria no pasa QA por existir botón + función; debe existir el circuito de binding que une el control visible con la acción.

---

# Navegación desde una ficha

Si un subject tiene una historia museística curada:

`subjectHistoryBtn`

abre la historia narrativa.

Si no la tiene, conserva como fallback la secuencia técnica del corpus generada por `subjectHistoryItems()` / `openHistory()`.

Por tanto, la nueva capa editorial no elimina las herramientas de investigación existentes.

---

# Glosario

16 términos iniciales, cargados desde JSON y abiertos bajo demanda.

El glosario evita que la primera capa presupueste conocimientos de:

- Neolítico;
- Natufiense;
- Calcolítico;
- GC-MS;
- LC-MS/MS;
- SEM;
- biomarcadores;
- dendrocronología;
- etc.

No se incrustan definiciones hardcoded en el motor de historias.

---

# Corpus histórico

Sin cambios respecto a alpha.20:

- 11 subjects;
- 30 places;
- 30 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 7 developments;
- 86 sources.

La integración de producto no se utiliza como excusa para añadir contenido nuevo.

---

# Siguiente gate

Antes de retomar expansión E1 o iniciar G4:

1. desplegar alpha.21;
2. probar Vino y Pan en Xiaomi;
3. comprobar longitud/ritmo de lectura;
4. comprobar glosario;
5. comprobar Historia → Atlas → Evidencia;
6. comprobar anterior/siguiente en la timeline táctil;
7. recoger defectos reales antes de crear la tercera historia.

## Alpha.22 — continuidad de navegación

La integración narrativa se mantiene sin cambios editoriales. Alpha.22 endurece:
- historial del navegador;
- deep links;
- round-trip Historia ↔ Atlas;
- foco real de events/developments;
- revelado de occurrences ocultas por filtros previos;
- semántica de intervalos y stepping temporal.

Véase `docs/NAVIGATION_HARDENING_ALPHA22.md`.

# G2 — Gate final

Fecha de cierre: 2026-08-11  
Release: `0.1.0-alpha.15`

# Resultado

**G2 CERRADO**

El objetivo de G2 era validar el modelo con un corpus pequeño, heterogéneo, trazable y suficientemente difícil antes de escalar.

El gate final pasa.

---

## Corpus canónico runtime

Los archivos `data/*.json` cargados por la aplicación contienen exclusivamente estados:

- `reviewed`;
- `verified`.

Conteos:

- 11 subjects;
- 24 places;
- 24 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 6 developments;
- 66 sources.

No existen `seed`, `draft` ni `deprecated` en el corpus runtime.

---

## Archivo histórico demo

Los registros de prototipo se preservan en:

`data/archive/demo_records_pre_g2.json`

Total archivado: 34 registros.

Incluye:
- 10 subjects;
- 8 places;
- 11 occurrences;
- 2 events;
- 3 relationships.

El archivo contiene únicamente:
- `seed`;
- `deprecated`.

Los cinco subjects seed no canonizados se preservan explícitamente:

- `wheat_demo`;
- `fermentation_demo`;
- `sugar_demo`;
- `potato_demo`;
- `coffee_demo`.

No se convirtieron artificialmente en datos históricos para satisfacer el gate.

---

# Gates funcionales superados

## Evidencia
- fuente obligatoria en todo registro público;
- reviewed/verified separados;
- segunda revisión explícita para verified;
- fechas aproximadas conservan su precisión;
- sin año 0.

## Incertidumbre
- `certainty` independiente del estado editorial;
- caso `medium`;
- caso `disputed`;
- posiciones contrapuestas con fuentes propias.

## Modelo
- occurrence central;
- event independiente;
- development independiente;
- context independiente;
- technique vinculada mediante relationship;
- places sin coordenadas admitidos;
- sin origen universal obligatorio.

## Historias longitudinales
Motor genérico probado con:
1. vino;
2. maíz;
3. aceite de oliva.

La historia puede combinar:
- occurrence;
- event;
- technique;
- development.

No existe código específico por subject.

## Cobertura temática
El piloto ya incluye:
- especie vegetal;
- animal doméstico;
- bebida;
- preparación;
- producto procesado;
- grasa/aceite;
- especia;
- técnica culinaria;
- texto culinario;
- comercio;
- difusión;
- ciencia;
- refrigeración/equipamiento;
- conservación;
- higiene/seguridad;
- regulación;
- desacuerdo académico.

## UX temporal
- cronología única;
- sin slider paralelo;
- sin ± años;
- sin playback matemático;
- densidad temporal;
- events/developments como intervalos;
- timeline magnética;
- hito anterior/siguiente;
- entrada exacta de año separada.

---

# Política posterior a G2

El contrato se considera **congelado para iniciar G3**.

Un cambio de schema, taxonomía o significado de entidades durante G3 requerirá:
1. caso real que lo justifique;
2. ADR;
3. migración explícita;
4. tests de regresión.

No se reabre G2 para mejoras estéticas o para aumentar volumen.

---

# Siguiente gate

## G3 — Evidencia y precisión

Prioridades:
- filtros de certeza;
- filtros de precisión cronológica;
- lectura visual de `exact/circa/range/century/millennium`;
- explicación del porqué de la certeza;
- representación pública más potente de disputed;
- comparación de fuentes;
- mejorar experiencia de registros sin punto;
- estudiar geometrías regionales verificadas sin recurrir a fronteras modernas engañosas.


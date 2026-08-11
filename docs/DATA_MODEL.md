# Modelo de datos canónico

## 1. subject

Objeto gastronómico que puede ser estudiado.

Tipos iniciales:

- `ingredient`
- `food_species`
- `dish`
- `preparation`
- `beverage`
- `processed_product`
- `culinary_technique`
- `preservation_method`
- `food_tool`
- `foodway`
- `meal_practice`
- `culinary_institution`
- `historical_text`
- `recipe`
- `trade_good`
- `other`

Campos nucleares:

```json
{
  "id": "wheat",
  "name": "Trigo",
  "type": "food_species",
  "summary": "...",
  "aliases": [],
  "tags": [],
  "status": "seed"
}
```

Un `subject` NO debe contener por defecto una fecha universal de origen.

---

## 2. occurrence

Unidad central del atlas.

Expresa:

> Existe evidencia de **X** en **Y**, durante **Z**, con **determinado tipo y certeza de evidencia**.

Ejemplo conceptual:

```json
{
  "id": "occ_x",
  "subjectRef": "wheat",
  "placeRef": "place_x",
  "period": {
    "start": -9000,
    "end": -8000,
    "precision": "range",
    "display": "IX–VIII milenio a. C."
  },
  "occurrenceType": "archaeological_presence",
  "evidenceType": "archaeological",
  "certainty": "medium",
  "sourceRefs": []
}
```

Tipos de ocurrencia iniciales:

- `archaeological_presence`
- `cultivation`
- `domestication_evidence`
- `production`
- `consumption`
- `textual_attestation`
- `recipe_attestation`
- `trade`
- `introduction`
- `adoption`
- `regulation`
- `industrial_production`
- `traditional_attribution`
- `other`

---

## 3. place

Lugar canónico.

Tipos:

- `site`
- `city`
- `historical_region`
- `modern_region`
- `macroregion`
- `route_node`
- `other`

Los lugares pueden tener:
- punto;
- geometría validada;
- aliases;
- parentRef.

Un punto sirve para visualización, no implica extensión territorial.

---

## 4. event

Cambio o proceso relevante:

- domesticación;
- introducción;
- difusión;
- prohibición;
- regulación;
- crisis alimentaria;
- innovación técnica;
- apertura/cierre de rutas;
- publicación de texto culinario;
- industrialización;
- intercambio colombino;
- etc.

`event` no sustituye las ocurrencias: las contextualiza.

---

## 5. relationship

Relación entre subjects.

Tipos iniciales:

- `ingredient_of`
- `uses_technique`
- `variant_of`
- `derived_from`
- `predecessor_of`
- `substitutes`
- `paired_with`
- `preserved_by`
- `produced_with`
- `influenced_by`
- `traded_as`
- `other`

Toda relación puede ser temporal y espacialmente limitada.

---

## 6. source

Registro bibliográfico/documental.

Tipos preferentes:

- `archaeological_report`
- `peer_reviewed_article`
- `monograph`
- `critical_edition`
- `primary_text`
- `museum`
- `official_institution`
- `dataset`
- `historical_map`
- `other`

---

## 7. evidence

La trazabilidad fina puede asociarse a un campo concreto:

```json
{
  "path": "/period/start",
  "sourceRefs": ["src_x"],
  "certainty": "medium",
  "note": "Datación calibrada aproximada."
}
```

---

## 8. fecha editorial

No se usará año 0.

Los datos guardan años normalizados para el motor, pero conservan además:

- `precision`
- `display`
- `circa`
- `before`
- `after`
- `note`

cuando sea necesario.

Valores de `precision`:

- `exact`
- `year`
- `decade`
- `century`
- `millennium`
- `range`
- `phase`
- `before`
- `after`
- `circa`
- `unknown`

---

## 9. certeza

- `high`
- `medium`
- `low`
- `disputed`
- `unknown`

La certeza pertenece a la afirmación concreta, no a todo el subject.



---

## 10. context — civilizaciones, culturas y marcos históricos

`context` aporta contexto histórico sin convertir el Atlas en un atlas político general.

Ejemplos de tipos admitidos:
- cultura arqueológica;
- civilización;
- cultura;
- pueblo;
- ciudad-estado;
- reino;
- imperio;
- república;
- entidad política;
- tradición religiosa;
- institución;
- grupo social.

Un `context` se vincula a `occurrence` mediante `contextRefs`.

Regla crítica:
> la relación de un alimento con una civilización/cultura no implica que esa sociedad lo inventase, lo poseyese en exclusiva o fuese su origen.

Campos principales:

```json
{
  "id": "context_x",
  "name": "...",
  "type": "empire",
  "period": {
    "start": 1,
    "end": 100,
    "precision": "range",
    "display": "..."
  },
  "placeRefs": [],
  "summary": "...",
  "sourceRefs": [],
  "status": "draft"
}
```

---

## 11. development — ciencia, tecnología, higiene y seguridad

`development` modela transformaciones que repercuten sobre la alimentación y la gastronomía.

Tipos iniciales:
- descubrimiento científico;
- tecnología alimentaria;
- tecnología de conservación;
- aparato de cocina/cocción;
- aparato de almacenamiento o conservación alimentaria;
- refrigeración;
- infraestructura energética;
- proceso industrial;
- higiene;
- seguridad alimentaria;
- salud pública;
- regulación;
- sistema de calidad;
- método analítico;
- envase;
- transporte/logística.

Puede vincular:
- lugares;
- contextos históricos;
- subjects afectados;
- tipos de impacto.

Ejemplo conceptual:

```json
{
  "id": "development_x",
  "name": "...",
  "type": "food_safety",
  "period": {
    "start": 1900,
    "end": 1950,
    "precision": "range",
    "display": "..."
  },
  "placeRefs": [],
  "contextRefs": [],
  "impactSubjectRefs": [],
  "impactTypes": ["improves_safety"],
  "summary": "...",
  "certainty": "high",
  "sourceRefs": [],
  "status": "draft"
}
```

Regla:
un avance científico o tecnológico no debe presentarse como un hito aislado si su adopción fue gradual, regional o discutida. El campo temporal describe el dato concreto documentado, no una supuesta adopción universal.

---

## 12. Capas de lectura

La interfaz admite cuatro capas lógicas:

1. `gastronomy`
2. `contexts`
3. `developments`
4. `safety`

La capa `safety` es una vista temática sobre developments de higiene, seguridad, salud pública, regulación y calidad.

---

## 13. Extensión reservada — rutas museográficas

Las rutas guiadas NO forman parte todavía del contrato de datos.

Motivo:
una relación histórica como `derived_from`, `variant_of` o `predecessor_of` describe una relación entre objetos, pero no define por sí sola un buen recorrido editorial.

Una futura ruta podría incluir:
- título;
- capítulos;
- orden;
- introducciones narrativas;
- subjects/occurrences/developments seleccionados;
- transiciones;
- objetivos pedagógicos opcionales.

Ejemplos posibles:
- Historia de la conservación;
- Del fuego a la inducción;
- Fermentaciones;
- Del intercambio colombino a la cocina global;
- Ciencia y seguridad alimentaria.

Hasta que se diseñe el contrato editorial, no se crea `tours.json` ni se infieren rutas automáticamente de `relationships.json`.


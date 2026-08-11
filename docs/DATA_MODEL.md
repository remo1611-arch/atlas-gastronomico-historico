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


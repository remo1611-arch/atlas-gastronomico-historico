# G2-D — Primer caso disputed

## Caso

**Gallinas de El Arenal-1, península de Arauco, Chile.**

Subject:

`chicken`

Occurrence:

`occ_chicken_el_arenal_polynesian_debate`

Estado editorial:

`reviewed`

Certeza histórica:

`disputed`

---

# Pregunta

> ¿Los restos de El Arenal-1 demuestran una introducción polinesia precolombina de gallinas en Sudamérica?

El Atlas no responde sí/no.

Conserva las interpretaciones.

---

## Posición favorable

Storey et al. (2007) publicaron un hueso directamente fechado en cal AD 1304–1424 y una secuencia de ADN que interpretaron como evidencia de introducción polinesia precolombina.

Posteriormente se publicaron dos huesos adicionales con fechas precolombinas y datos isotópicos para rechazar un desplazamiento marino importante.

Fuentes:
- https://doi.org/10.1073/pnas.0703993104
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2596261/
- https://doi.org/10.1073/pnas.1410780111

---

## Posición crítica

Gongora et al. (2008) señalaron que el haplotipo del espécimen chileno no era diagnóstico de una dispersión polinesia y exploraron el posible efecto de carbono marino sobre la datación.

Thomson et al. (2014), mediante un conjunto ampliado de ADN antiguo, argumentaron que estudios anteriores estaban afectados por contaminación moderna y que no existían muestras sudamericanas tempranas con la firma mitocondrial polinesia diagnóstica utilizada por su estudio.

Fuentes:
- https://doi.org/10.1073/pnas.0801991105
- https://doi.org/10.1073/pnas.1320412111

---

# Contrato disputed

Una occurrence `certainty: disputed` debe contener:

```json
{
  "dispute": {
    "question": "…",
    "positions": [
      {
        "id": "…",
        "label": "…",
        "summary": "…",
        "sourceRefs": ["…"]
      },
      {
        "id": "…",
        "label": "…",
        "summary": "…",
        "sourceRefs": ["…"]
      }
    ],
    "editorialNote": "…"
  }
}
```

Reglas:
- al menos dos posiciones;
- cada posición tiene fuentes;
- esas fuentes forman parte también de `sourceRefs` de la occurrence;
- la UI no decide cuál es correcta;
- `reviewed` no elimina `disputed`.

---

# Distinción importante

El debate mezcla varias preguntas que el Atlas no debe colapsar:

1. ¿Los huesos son realmente precolombinos?
2. ¿Qué efecto podría tener una dieta marina en la calibración?
3. ¿Las secuencias de ADN son auténticas o están contaminadas?
4. ¿El linaje es diagnóstico de una dispersión polinesia?
5. Incluso siendo precolombinas, ¿qué mecanismo histórico explica su presencia?

Por eso el registro no se reduce a una etiqueta binaria.

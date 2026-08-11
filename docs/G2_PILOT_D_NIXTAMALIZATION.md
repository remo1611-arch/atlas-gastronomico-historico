# G2-D — Nixtamalización canónica

## Objetivo

Incorporar la primera técnica culinaria canónica conectada a la historia longitudinal de un alimento.

La técnica es:

`nixtamalization`

Tipo:

`culinary_technique`

Estado inicial:

`reviewed`

---

## Evidencia directa

### San Bartolo, Petén

Occurrence:

`occ_nixtamal_san_bartolo_600_800`

El estudio de Santini et al. identifica esferulitos de almidón en dos chultunes de San Bartolo y los interpreta como evidencia arqueológica directa de maíz nixtamalizado y probable descarte de nejayote.

Cronología pública:

`siglos VII–VIII d.C.`

No se interpreta esa fecha como invención de la técnica.

Fuente principal:
- https://doi.org/10.1016/j.jas.2022.105581

Método experimental de referencia:
- https://doi.org/10.1016/j.jas.2019.105056

### La Corona, Petén

Occurrence:

`occ_nixtamal_la_corona_600_800`

Cagnato et al. documentan esferulitos en cerámicas y piedras de molienda del Clásico Tardío, asociados a preparación/consumo de alimentos de maíz tratados alcalinamente.

Fuente:
- https://doi.org/10.1016/j.quaint.2024.09.007

---

# Relación con el maíz

Relación canónica:

```text
maize
  ↓ uses_technique
nixtamalization
```

ID:

`rel_maize_uses_nixtamalization_maya_classic`

El intervalo de la relación representa solamente el tramo sustentado por evidencia directa incorporada al corpus.

No significa:
- que la técnica comenzase en el siglo VII;
- que solo se utilizase entre 600 y 800;
- que todas las preparaciones de maíz fueran nixtamalizadas.

---

# Hipótesis sobre antecedentes

Zizumbo Villarreal y Colunga-Garcíamarín plantean que tratamientos termo-alcalinos con cenizas pudieron preceder al tratamiento con cal.

Fuente:
- https://doi.org/10.5154/r.rga.2016.57.006

Este trabajo se conserva como fuente contextual del subject.

**No se crea una occurrence precerámica fechada**, porque el artículo formula una hipótesis etnobotánica y no aporta una datación arqueológica directa del origen de la nixtamalización.

Esto es deliberado: ausencia de fecha segura no se soluciona inventando un intervalo.

---

# Evolución del contrato

Se añade:

`occurrenceType: technique_attestation`

Motivo:

Una técnica culinaria documentada arqueológicamente no debe deformarse como:
- producción;
- adopción;
- consumo;
- development científico.

---

# Historia del maíz

`subjectHistoryItems(maize)` incorpora ahora:
- occurrences del maíz;
- events;
- techniques relacionadas mediante `uses_technique`;
- developments.

Las evidencias de nixtamalización aparecen como:

`TÉCNICA`

No se duplican como occurrences del maíz.

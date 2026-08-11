# G2 — Corpus piloto · tanda B

## Objetivo

La tanda B no busca volumen. Introduce tipos de evidencia que la tanda A no cubría:

- domesticación/gestión animal;
- preparación alimentaria preagrícola;
- procesado de lácteos;
- texto culinario histórico;
- conservación industrial;
- normalización y seguridad alimentaria internacional.

Todos los registros nuevos entran como `reviewed`.

---

## 1. Cabra doméstica / gestión caprina — Ganj Dareh

**Subject:** `goat`  
**Occurrence:** `occ_goat_ganj_dareh_8200_bce`

El estudio PNAS 2021 combina:
- genomas antiguos;
- demografía arqueozoológica;
- patrones de sacrificio;
- diversidad genética.

Conclusión acotada incorporada:
hacia 8200 cal a.C. existían en los Zagros centrales rebaños gestionados con afinidad genética doméstica, antes de cambios morfológicos claros.

No se modela la domesticación como un único instante.

El lugar `ganj_dareh` queda sin punto cartográfico hasta disponer de una procedencia espacial que queramos aceptar canónicamente.

---

## 2. Producto tipo pan — Shubayqa 1

**Subject:** `bread_like_flatbread`  
**Occurrence:** `occ_bread_shubayqa_14400_bp`  
**Context:** `natufian`

PNAS documenta restos carbonizados de productos tipo pan elaborados con cereales silvestres y tubérculos aproximadamente 14.400 años atrás.

Regla aplicada:
“producto tipo pan” no se convierte automáticamente en “pan moderno”.

Las coordenadas de Shubayqa 1 proceden de una publicación académica independiente de datación del sitio y se marcan `exact_from_publication`.

---

## 3. Queso / procesado lácteo — Kuyavia

**Subject:** `cheese`  
**Occurrence:** `occ_cheese_kuyavia_sixth_millennium_bce`

Nature documenta grasas lácteas en recipientes perforados compatibles con separación de cuajada y suero durante el VI milenio a.C.

El texto del Atlas conserva cautela:
- evidencia de procesado lácteo/quesero;
- no receta de un queso moderno;
- no año exacto.

`kuyavia_poland` queda sin punto para evitar representar una región mediante una coordenada arbitraria.

---

## 4. The Forme of Cury — ca. 1390

**Subject:** `forme_of_cury`  
**Occurrence:** `occ_forme_of_cury_1390`  
**Context:** `richard_ii_royal_household`

British Library cataloga el tratado como compuesto ca. 1390 por los cocineros principales de la casa de Ricardo II.

Library of Congress aporta una segunda referencia institucional sobre la obra.

La ocurrencia es `textual_attestation`: un recetario cortesano no se interpreta como prueba de la dieta cotidiana de toda Inglaterra.

---

## 5. Appertización — 1809–1810

**Development:** `appert_preservation_1809_1810`

Se modela:
- premio/reconocimiento del método;
- publicación de 1810;
- calentamiento + cierre de recipientes.

No se afirma que Appert entendiese la microbiología del proceso.

`certainty: medium` porque esta primera incorporación se apoya por ahora en una síntesis institucional y deberá recibir segunda revisión antes de `verified`.

---

## 6. Codex Alimentarius — 1963

**Development:** `codex_alimentarius_commission_1963`

FAO y FAO/WHO documentan la creación de la Comisión en 1963.

Se clasifica como `regulation`, no como ciencia o aparato.

Este registro representa la creación institucional. La adopción de normas concretas del Codex se modelará mediante developments distintos cuando sea necesario.

---

# Casos de estrés deliberados

La tanda B demuestra que el modelo admite:

1. evidencia histórica válida sin punto cartográfico;
2. punto exacto procedente de publicación;
3. regiones que no deben falsearse como puntos;
4. procesos de domesticación prolongados;
5. textos culinarios que no equivalen a consumo general;
6. tecnologías anteriores a su explicación científica;
7. regulación internacional diferenciada de seguridad operativa.

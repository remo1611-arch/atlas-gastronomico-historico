# G2 — Corpus piloto · tanda A

## Estado

Primera tanda histórica revisada.

Objetivo: probar el contrato con casos heterogéneos antes de ampliar el corpus.

Los registros de esta tanda se marcan `reviewed`, no `verified`.

## Criterio de estado

### seed
Dato puramente demostrativo. No debe citarse como contenido histórico cerrado.

### draft
Dato en elaboración.

### reviewed
- afirmación acotada;
- al menos una fuente válida;
- cronología revisada;
- tipo de evidencia identificado;
- certeza explícita;
- no confunde primera evidencia con origen.

### verified
Reservado para una fase posterior de revisión cruzada. Requerirá evidencia especialmente sólida y, cuando sea razonable, más de una línea o fuente independiente.

---

# Casos incorporados

## 1. Vino neolítico — Cáucaso meridional

**Subject:** `wine`  
**Occurrence:** `occ_wine_gadachrili_6000_5800_bce`  
**Context:** `shulaveri_shomutepe`

Afirmación incorporada:

> Existe evidencia biomolecular arqueológica, apoyada por datos arqueobotánicos, de vino de uva/vinicultura en yacimientos neolíticos de Georgia ca. 6000–5800 a.C.

No se afirma:
- que sea el “origen absoluto” del vino;
- que toda la cultura Shulaveri-Shomutepe produjese vino de la misma manera;
- que la vinificación comenzase exactamente en 6000 a.C.

Fuentes principales:
- PNAS, *Early Neolithic wine of Georgia in the South Caucasus*: https://doi.org/10.1073/pnas.1714728114
- CNRS Trajectoires, Gadachrili Gora: https://trajectoires.cnrs.fr/en/projects/completed-projects/gadachrili-gora-a-neolithic-site-in-the-kura-valley-georgia/

---

## 2. Maíz temprano — Xihuatoxtla / valle central del Balsas

**Subject:** `maize`  
**Occurrence:** `occ_maize_xihuatoxtla_early_holocene`

Afirmación incorporada:

> Almidones y fitolitos de maíz aparecen en herramientas/sedimentos de Xihuatoxtla asociados a niveles contemporáneos o inferiores al horizonte 8990–8610 cal BP.

La interfaz conserva el intervalo original `cal BP` y muestra una conversión aproximada a a.C.

No se afirma:
- una fecha exacta de “invención” del maíz;
- que un solo sitio resuelva todos los debates sobre domesticación;
- un origen nacional moderno.

Fuentes:
- Ranere et al., PNAS 2009: https://doi.org/10.1073/pnas.0812590106
- Piperno et al., PNAS 2009: https://doi.org/10.1073/pnas.0812525106

---

## 3. Garum — Pompeya

**Subject:** `garum`  
**Occurrence:** `occ_garum_pompeii_first_century`  
**Context:** `roman_empire_west_reference`

Afirmación incorporada:

> El registro arqueológico de Pompeya conserva restos materiales de garum; el Parque Arqueológico documenta su producción local y uso extendido en cocina romana.

El intervalo del siglo I d.C. es contexto de la Pompeya anterior a la erupción de 79 d.C.; no es fecha de invención del producto.

Fuente:
- Parco Archeologico di Pompei, Antiquarium: https://pompeiisites.org/en/boscoreale-en/antiquarium-sala-i/

---

# Transformaciones incorporadas

## 4. Pasteurización aplicada al vino

**Development:** `pasteurization_wine_1863_1865`

Se separan dos hitos:
- 1863: comienzo de los trabajos de Pasteur sobre las enfermedades del vino;
- 1865: patente de un proceso de conservación mediante calentamiento moderado.

Fuentes:
- Institut Pasteur, *Louis Pasteur: a universal legacy*.
- Institut Pasteur, *The middle years 1862–1877*.

No se extrapola este registro a la adopción universal de pasteurización en alimentos.

---

## 5. Refrigeración mecánica — Perkins

**Development:** `perkins_mechanical_refrigeration_1834`

Afirmación:
- ASHRAE registra en 1834 la patente de la máquina de refrigeración mecánica de Jacob Perkins.
- Smithsonian conserva un modelo asociado a la máquina de hielo de Perkins de 1834.

No se interpreta 1834 como adopción general de la cadena de frío.

---

## 6. Refrigeración eléctrica doméstica — Monitor Top

**Development:** `monitor_top_refrigerator_1927`

Afirmación:
- Smithsonian identifica el GE Monitor Top, introducido en 1927, como el primer refrigerador ampliamente popular en hogares estadounidenses.

No se confunde:
- introducción comercial;
- adopción masiva;
- universalización mundial.

Esas fases deberán modelarse por separado cuando se amplíe el corpus.

---

## 7. HACCP

**Development:** `haccp_development_1960s`

Afirmación:
- USDA ARS atribuye el desarrollo inicial de HACCP a Pillsbury y NASA para reforzar la seguridad de los alimentos de vuelos tripulados.

El registro usa `década de 1960`, no un año inventado.

No se confunde:
- desarrollo del sistema;
- adopción industrial;
- incorporación normativa;
- obligación jurídica en distintos países.

---

# Cartografía

Los puntos de Gadachrili Gora y Xihuatoxtla usan fuentes cartográficas secundarias exclusivamente para visualización.

La cronología y la interpretación histórica proceden de publicaciones académicas.

Los puntos se etiquetan como `approximate`.

Esta separación es deliberada: una fuente útil para situar un sitio no se convierte por ello en fuente histórica principal.

---

# Migración de seeds

Se crean IDs canónicos:

- `wine`
- `maize`
- `garum`

Los anteriores:
- `wine_demo`
- `maize_demo`
- `garum_demo`

se conservan con `status: deprecated` y `supersededBy`.

Las occurrences demo equivalentes siguen el mismo patrón.

No se elimina historia de cambios de forma silenciosa.

---

# Hallazgo de contrato durante G2

El caso Monitor Top reveló que `cooking_appliance` era demasiado amplio: un frigorífico transforma la alimentación sin ser un aparato de cocción.

Se añade:

`food_storage_appliance`

También se restringen los `impactTypes` para no atribuir a una patente efectos que corresponden a fases posteriores de adopción.

Esto valida la estrategia de ampliar el contrato con casos históricos reales antes de cargar cientos de registros.

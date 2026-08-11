# G2 — Tanda C · primera historia longitudinal

## Objetivo

Probar el Atlas con varias evidencias del **mismo subject** distribuidas a lo largo de milenios y combinarlas con developments relacionados, sin crear un schema narrativo adicional.

El primer caso es `wine`.

## Regla de representación

La vista “Historia del elemento” es **derivada** de los datos canónicos:

- occurrences `reviewed`/`verified` del subject;
- developments `reviewed`/`verified` cuyo `impactSubjectRefs` incluye el subject.

No se guardan duplicados de esos hitos en otro JSON.

La secuencia no es exhaustiva. Los vacíos temporales no indican ausencia del alimento, técnica o práctica.

---

## Historia del vino · corpus actual

### 1. Georgia neolítica
`occ_wine_gadachrili_6000_5800_bce`

- ca. 6000–5800 a.C.;
- evidencia biomolecular/arqueobotánica;
- contexto Shulaveri-Shomutepe;
- estado: reviewed.

### 2. Areni-1
`occ_wine_areni_4000_bce`

- ca. 4100–4000 a.C.;
- instalación y residuos asociados a producción;
- estado: reviewed.

Fuente principal: Barnard et al., Journal of Archaeological Science, DOI 10.1016/j.jas.2010.11.012.

### 3. Abydos · tumba U-j
`occ_wine_abydos_3150_bce`

- ca. 3150 a.C.;
- residuos vínicos en recipientes funerarios;
- contexto Naqada IIIa2 / Dinastía 0;
- estado: reviewed.

El punto del mapa es una referencia general de Abydos procedente de UNESCO; no localiza exactamente la tumba U-j.

### 4. Tel Kabri
`occ_wine_tel_kabri_middle_bronze`

- Bronce Medio, ca. 1900–1600 a.C.;
- complejo palacial con unas 40 grandes vasijas;
- análisis de residuos compatible con almacenamiento de vino;
- nuevo `occurrenceType: storage`;
- estado: reviewed.

### 5. Jerusalén antes de 586 a.C.
`occ_wine_jerusalem_586_bce`

- finales del siglo VII–586 a.C.;
- residuos de vino en recipientes de almacenamiento;
- algunos recipientes contienen compuestos asociados a vainilla;
- estado: reviewed.

No se extrapola el hallazgo a toda la dieta o producción vinícola de la región.

### 6. Transformación moderna
`pasteurization_wine_1863_1865`

- 1863–1865;
- development de conservación vinculado mediante `impactSubjectRefs: ["wine"]`;
- estado: verified.

---

## UX

La vista longitudinal incluye:

- número de evidencias;
- número de transformaciones;
- arco cronológico;
- estado editorial;
- tipo de evidencia;
- contextos relacionados;
- número de fuentes;
- navegación hacia la ficha de cada occurrence;
- salto temporal hacia cada development.

## Descubrimiento

Se añade “Historias disponibles”.

No está hardcodeado a vino: cualquier subject con al menos dos occurrences `reviewed/verified` aparece automáticamente.

## Hallazgo de contrato

Tel Kabri demuestra la necesidad de distinguir `storage` de producción, consumo y comercio. Se añade `storage` a `occurrenceTypes`.

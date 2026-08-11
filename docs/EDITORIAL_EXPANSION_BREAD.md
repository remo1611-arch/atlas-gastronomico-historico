# Expansión editorial E1 — Historia del pan

Release: `0.1.0-alpha.20`

## Propósito

Después de cerrar G3, el principal cuello de botella deja de ser la arquitectura y pasa a ser el **contenido histórico que merece explorarse**.

La expansión E1 no inicia todavía G4.

Su objetivo es aumentar densidad histórica mediante dossiers coherentes, sin cargar decenas de registros inconexos.

El primer dossier es:

# Pan

---

## Decisión de identidad

Se conserva el ID estable:

`bread_like_flatbread`

pero la etiqueta pública pasa a:

`Pan`

Motivo:
- el ID nació con el piloto de Shubayqa;
- ya es una referencia estable;
- cambiarlo o duplicar el subject rompería referencias sin aportar valor;
- la ficha pública puede expresar una categoría más amplia con la cautela necesaria.

La descripción diferencia:
- “pan” como familia histórica de preparaciones;
- “producto tipo pan” cuando el resto arqueológico exige lenguaje prudente.

---

# Recorrido

## 1. Shubayqa 1
`occ_bread_shubayqa_14400_bp`

ca. 14.400 cal BP, aproximadamente 12.450 a.C.

Restos carbonizados de productos planos tipo pan elaborados por cazadores-recolectores natufienses con cereales silvestres y tubérculos.

El Atlas no convierte esta evidencia en:
“aquí se inventó el pan”.

---

## 2. Çatalhöyük East
`occ_bread_catalhoyuk_7100_6400_bce`

ca. 7100–6400 a.C.

Análisis microestructural de restos cerealistas identifica materiales compatibles con:
- pan;
- masa;
- gachas.

Pan/masa predominan en fases tempranas del yacimiento.

### Cartografía
Çatalhöyük dispone de punto publicado por UNESCO:

N37°40′0″ E32°49′41″

`precision: exact_from_publication`

El punto sitúa el yacimiento, no cada fragmento alimentario.

---

## 3. Küllüoba Höyük
`occ_bread_kulluoba_3200_3000_bce`

3200–3000 a.C.

Pan carbonizado analizado arqueométricamente:
- emmer/escanda;
- pequeña cantidad de lenteja;
- masa amasada;
- posible levado.

El hallazgo tiene además un contexto interpretado como ritual.

No se adopta un punto cartográfico en esta release porque las fuentes históricas utilizadas no proporcionan una coordenada canónica con la misma calidad de procedencia exigida por G3.

---

## 4. Zürich · Parkhaus Opéra
`occ_bread_parkhaus_opera_3176_3153_bce`

3176–3153 a.C.

Dos objetos carbonizados tipo pan proceden de una capa extraordinariamente bien fechada por dendrocronología.

Resultados:
- cebada;
- trigo;
- panes planos no levados;
- posible uso de apio como condimento.

La chronology estrecha es parte central del valor de este caso.

---

## 5. Ain Sukhna
`occ_bread_ain_sukhna_moulds_2050_1900_bce`

ca. 2050–1900 a.C.

El caso no es un “pan conservado”, sino tecnología de producción.

Material arqueológico de moldes cónicos + arqueología experimental permiten reconstruir una chaîne opératoire de panificación del Reino Medio egipcio.

Esto prueba que Historia del elemento puede combinar:
- restos alimentarios;
- cultura material;
- procesos de producción.

---

## 6. Saint-Memmie
`occ_bread_saint_memmie_mid_1c`

mediados del siglo I–69 d.C.

Galette carbonizada de una necrópolis galorromana:
- cebada;
- einkorn o emmer;
- harina fina;
- aparentemente sin levado.

El contexto funerario no se presenta como dieta cotidiana general.

---

## 7. Regulación medieval inglesa
`occ_bread_assize_england_mid_13c`

mediados del siglo XIII.

La regulación conocida como `Assisa Panis et Cervisie` vinculaba peso/precio del pan al precio del cereal y controlaba categorías de producto.

### Cronología
No se fuerza un único “año de origen”.

La tradición impresa la atribuye a 1266, pero:
- existen documentos de assize anteriores a 1254;
- British Library conserva materiales de Chester 1260–61;
- y una assize de Nottingham ca. 1248–49.

Por ello:

`period: 1248–1266`
`precision: range`

---

## 8. Chorleywood
`chorleywood_bread_process_1961`

1961.

Tipo:

`development / industrial_process`

El proceso desarrolla rápidamente la masa mediante mezcla mecánica de alta energía y sustituye la larga fermentación en masa de métodos convencionales por minutos de trabajo intenso.

Se integra en Historia del pan mediante:

`impactSubjectRefs: ["bread_like_flatbread"]`

No se crea una occurrence falsa en un lugar concreto.

---

# Resultado del recorrido

Historia del pan contiene ahora:

- 7 occurrences;
- 1 development.

Tipos de occurrence:
- consumption;
- archaeological_presence;
- production;
- regulation.

Tipos de evidencia:
- archaeobotanical;
- archaeological;
- material_culture;
- legal.

Rango:
- ca. 12.450 a.C.
- 1961 d.C.

La discontinuidad temporal se conserva.

No se añaden hitos débiles para rellenar siglos vacíos.

---

# Estado espacial

De las 6 nuevas occurrences:
- 1 dispone de punto canónico: Çatalhöyük;
- 5 permanecen sin punto.

Esto aumenta el runtime total a:
- 16 occurrences mapped;
- 14 unmapped.

No es una regresión de G3.

Los 9 casos unmapped auditados en G3-D permanecen exactamente como estaban; los 5 adicionales pertenecen a contenido nuevo y podrán ser auditados en futuras tandas editoriales.

---

# Principio editorial

La expansión posterior a G3 seguirá esta regla:

> construir historias que el usuario quiera explorar, no aumentar contadores.

Cada dossier debe aportar:
- heterogeneidad de evidencia;
- cronología honesta;
- fuentes fuertes;
- utilidad cartográfica cuando sea defendible;
- una narrativa longitudinal sin inventar continuidad.


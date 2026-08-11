# Política de fuentes gastronómicas

## Jerarquía preferente

1. publicaciones arqueológicas y arqueobotánicas/arqueozoológicas;
2. estudios biomoleculares y paleogenómicos relevantes;
3. artículos académicos revisados;
4. ediciones críticas de fuentes históricas;
5. monografías académicas;
6. museos, archivos, universidades y organismos oficiales;
7. bases de datos especializadas;
8. divulgación institucional;
9. fuentes generales solo como orientación inicial.

## Fuentes primarias

Pueden incluir:
- tablillas;
- papiros;
- recetarios;
- tratados agrícolas;
- textos médicos;
- libros de cocina;
- registros mercantiles;
- legislación;
- inventarios;
- imágenes y restos materiales.

Una fuente primaria se interpreta dentro de su contexto.

## Precauciones específicas

### Origen
Evitar:
> “El plato X se inventó en el año Y”

salvo evidencia excepcionalmente sólida.

Preferir:
> “La referencia textual más antigua localizada…”

o:
> “Se documenta en…”

### Domesticación
Separar:
- uso silvestre;
- manejo;
- cultivo;
- domesticación morfológica/genética;
- difusión.

### Cocina popular
La ausencia documental no demuestra ausencia de consumo.

### Recetas
Una receta escrita puede representar:
- élites;
- cocina profesional;
- prescripción médica;
- norma religiosa;
- práctica doméstica;
- literatura.

No generalizar automáticamente.

## Estados editoriales

### reviewed
Un registro puede pasar a `reviewed` cuando:
- sus afirmaciones están acotadas;
- dispone de `sourceRefs`;
- la fuente es adecuada al tipo de afirmación;
- la cronología y precisión han sido revisadas;
- evidencia e interpretación están separadas;
- la certeza está declarada.

### verified
`verified` es un gate superior. No se obtiene automáticamente por tener una URL.

Requiere una segunda revisión explícita y, cuando el tema lo permita:
- contraste con otra fuente o línea de evidencia;
- ausencia de conflicto no declarado;
- metadatos cartográficos y cronológicos suficientemente robustos.

## Fuentes cartográficas auxiliares

Una fuente secundaria puede utilizarse exclusivamente para un punto de referencia cartográfico.

En ese caso:
- se registra dentro de `point.sourceRefs`;
- el punto debe declarar `precision`;
- esa fuente no sustenta automáticamente la cronología, origen o interpretación histórica.

## Segunda revisión / verified

Para ascender a `verified`:
- debe existir una revisión distinta de la incorporación inicial;
- se registra en `verification`;
- las fuentes utilizadas se guardan en `independentSourceRefs`;
- se prioriza independencia editorial, institucional o metodológica;
- un resumen del mismo artículo no cuenta automáticamente como evidencia independiente;
- una fuente primaria puede complementar una segunda revisión institucional o académica.

La promoción es reversible si aparecen contradicciones o problemas de procedencia.

## Difusión e introducciones

Para afirmar una ruta de difusión concreta se necesitan fuentes que sostengan esa ruta.

Si solo puede documentarse:
- presencia;
- cultivo;
- adopción;
- referencias costeras;
- cronología general;

no se infiere automáticamente el vector de traslado entre puntos.

La ausencia de consenso sobre el mecanismo debe representarse mediante `certainty` y texto explícito.

## Casos disputed

Para `certainty: disputed`:
- se priorizan publicaciones académicas que sostengan posiciones realmente diferentes;
- no se crea una falsa controversia a partir de matices menores;
- cada posición conserva sus `sourceRefs`;
- el texto editorial describe la estructura del desacuerdo, no resuelve la cuestión;
- una réplica o carta académica puede incorporarse si forma parte sustantiva del debate.

## Hipótesis frente a evidencia directa

Una hipótesis etnobotánica, experimental o historiográfica puede ser una fuente legítima del subject sin convertirse automáticamente en occurrence.

La occurrence exige anclaje temporal/espacial suficientemente defendible para el tipo de afirmación que se pretende mostrar.


# Atlas Gastronómico Histórico

**Versión:** 0.1.0-alpha.24.1
**Estado:** Narrative Museum + Atlas · consolidación de producto · gate móvil pendiente
**Distribución principal:** GitHub Pages  
**Idioma inicial:** español

## Propósito

Construir un museo digital interactivo en el que cualquier persona pueda **comprender** cómo cambian los alimentos y prácticas culinarias, **explorar** libremente esas evidencias en tiempo y espacio y **comprobar** qué fuentes sostienen cada afirmación.

El Atlas permitirá estudiar, entre otros:

- ingredientes y especies alimentarias;
- domesticación y primeras evidencias;
- técnicas culinarias;
- conservación y fermentación;
- bebidas;
- platos y preparaciones;
- productos elaborados;
- utensilios y tecnologías alimentarias;
- culturas y prácticas alimentarias;
- comercio, intercambios y difusión;
- textos y recetas históricas;
- instituciones gastronómicas;
- episodios de escasez, regulación y transformación alimentaria.

## Decisión de reescritura

Este proyecto **no es una modificación del Atlas Histórico Mundial anterior**.

Se reutilizan principios ya validados:
- tiempo como eje;
- mapa como contexto;
- datos fuera del HTML;
- GitHub Pages;
- trazabilidad;
- gates de QA.

Pero el **modelo canónico se ha reescrito desde cero** para gastronomía.

La razón principal es que un ingrediente, una técnica o un plato no puede modelarse correctamente como una única entidad con `inicio` y `fin`. El nuevo modelo separa:

1. `subject` — qué estudiamos;
2. `occurrence` — dónde/cuándo existe evidencia de ese sujeto;
3. `event` — qué cambio ocurrió;
4. `place` — dónde;
5. `relationship` — cómo se relacionan sujetos;
6. `source` — qué sustenta la afirmación.


## Experiencia pública

Desde alpha.21 la jerarquía de producto es:

1. **Historias** — recorridos museísticos curados y redactados para visitantes sin conocimientos previos;
2. **Atlas** — exploración libre por tiempo, mapa, búsqueda y filtros;
3. **Evidencia** — ficha técnica con certeza, precisión, metodología y fuentes.

Las historias se cargan desde `data/stories.json` y referencian el corpus existente. No existe un renderer específico por alimento.


## Forma principal de uso

El usuario final abrirá una URL de GitHub Pages. No necesita consola ni instalación.

Consulta:

`docs/GITHUB_PAGES.md`

## Fuente canónica

```text
index.html
css/
js/
data/
schemas/
docs/
tools/
```

No editar una futura exportación monolítica como origen.

## Arranque local para desarrollo

Windows:

`START_WINDOWS.bat`

macOS / Linux:

`./START_MAC_LINUX.sh`

o:

```bash
python tools/serve.py
```

## Estado del corpus público

Desde G2 CLOSED, el runtime histórico contiene únicamente registros `reviewed` o `verified`.

Los antiguos seeds y demos están archivados fuera del runtime para trazabilidad.

El corpus actual contiene 30 occurrences públicas: 16 tienen punto y 14 permanecen sin punto por decisión explícita. Alpha.24 extiende el diagnóstico a `contexts` y `developments` sin inventar centroides.

## Capas históricas

La arquitectura alpha.3 añade, sin descentrar la gastronomía:

- **Civilizaciones y culturas** (`contexts.json`);
- **Ciencia y tecnología** (`developments.json`);
- **Seguridad e higiene** como vista temática de developments.

Estas capas ya contienen corpus revisado. Solo se dibuja un marcador cuando existe un `placeRef` con punto sustentado; los ámbitos regionales o multiterritoriales pueden permanecer legítimamente sin pin.

## G2 · contenido revisado

Alpha.6 inaugura el corpus histórico sustentado.

Primeros casos `reviewed`:
- vino neolítico de Georgia;
- maíz del valle central del Balsas;
- garum de Pompeya;
- Shulaveri-Shomutepe;
- mundo imperial romano;
- pasteurización;
- refrigeración mecánica;
- refrigeración eléctrica doméstica;
- HACCP.

La aplicación muestra las fuentes vinculadas dentro de las fichas.

## G2 · tanda B

Alpha.7 añade:
- cabra/domesticación;
- pan preagrícola;
- procesado lácteo/queso;
- recetario medieval;
- appertización;
- Codex Alimentarius.

Además estrena el gate auditado `verified` con metadatos de segunda revisión.

## Historia del maíz

Alpha.9 activa el segundo recorrido longitudinal automático:
- domesticación;
- expansión precolombina;
- presencia/consumo en Sudamérica;
- difusión norteamericana;
- evento transatlántico;
- adopciones africana y cantábrica.

El motor de recorridos admite ahora occurrences, events y developments.

## Navegador temporal

Alpha.10 añade una lectura visual del corpus sobre la línea temporal:
- densidad de evidencias;
- hitos verificados;
- events;
- transformaciones;
- hito anterior/siguiente.

El objetivo es que el usuario pueda descubrir dónde existe contenido histórico sin llenar el timeline de etiquetas o puntos.

## Cronología unificada

Alpha.11 elimina la línea temporal antigua y los controles de avance por años.

La banda museográfica es ahora el control temporal principal:
- toca una fecha;
- arrastra el cursor;
- selecciona un hito;
- usa anterior/siguiente hito;
- o introduce un año exacto.

No existe reproducción cronológica automática.

## Nixtamalización y debate histórico

Alpha.13 añade la primera técnica culinaria canónica vinculada longitudinalmente a un alimento:
- nixtamalización;
- San Bartolo;
- La Corona;
- relación `maize → uses_technique → nixtamalization`.

También incorpora el primer registro `certainty: disputed`, basado en el debate académico sobre las gallinas de El Arenal-1, Chile.

## G2 · maduración alpha.14

- segunda revisión B/C/D;
- tercer recorrido longitudinal: aceite de oliva;
- primer eje grasa/aceite canónico;
- primera especia canónica: pimienta negra en Berenike;
- 14 registros verified;
- seeds de aceite migrados mediante deprecated + supersededBy.

G2 todavía no se declara cerrado: queda retirar o canonizar los seeds demostrativos restantes.

## G2 cerrado

Desde alpha.15:
- el runtime contiene exclusivamente registros reviewed/verified;
- seeds y demos antiguos están archivados en `data/archive/demo_records_pre_g2.json`;
- la UI ya no ofrece ningún control para mostrar seeds;
- el contrato del corpus piloto queda congelado.

Siguiente fase: G3 — Evidencia y precisión.

## G3-A — Evidencia y precisión

Alpha.16 inicia G3 sin modificar el contrato G2.

Novedades:
- filtrar por certeza;
- filtrar por precisión cronológica;
- filtrar por cobertura cartográfica;
- resumen de calidad de lectura sin score;
- explicación separada de estado editorial, certeza y precisión;
- comparar fuentes;
- abrir desde el mapa los registros sin coordenadas.

Los schemas y la taxonomía están protegidos por fingerprint SHA-256 respecto a G2 CLOSED.

## G3-B — Cronología y desacuerdo

Alpha.17 profundiza en la lectura del tiempo y del desacuerdo académico:
- el hito enfocado revela su intervalo real en la timeline;
- la ficha explica amplitud y tipo de precisión;
- Historia del elemento muestra gaps/solapamientos entre hitos;
- disputed compara posiciones y sus fuentes sin declarar un ganador.

No cambia ningún schema, taxonomy ni registro histórico.

## Focused Exploration

Alpha.18 reduce la pantalla principal a tres preguntas:

1. ¿Cuándo estoy? → Tiempo.
2. ¿Dónde hay evidencia? → Mapa.
3. ¿Qué merece abrir? → En esta fecha.

La profundidad técnica no desaparece:
- Evidence Lens vive en Filtros;
- procesos y cambios son desplegables;
- fuentes, certeza y precisión completas viven en la ficha;
- Historias tiene una vista propia.

No hay cambios de corpus ni de contrato.

## G3 cerrado

Alpha.19 cierra la fase de evidencia, precisión y cobertura espacial.

- certeza y precisión separadas;
- disputed sin arbitraje automático;
- Focused Exploration;
- 18 casos sin punto auditados;
- 9 nuevos puntos con procedencia;
- regiones amplias sin centroides ficticios;
- G2 fingerprint 9/9 intacto.

La siguiente prioridad es contenido histórico y densidad de exploración, no más UI técnica.

## Expansión editorial E1

Alpha.20 inicia la fase de crecimiento de contenido sin abrir todavía G4.

Primer dossier:
**Historia del pan**

- 7 evidencias históricas;
- 1 transformación industrial;
- ca. 12.450 a.C. → 1961;
- arqueobotánica, arqueología, cultura material y regulación;
- Çatalhöyük cartografiado mediante coordenadas UNESCO;
- sin lógica específica por subject.

El objetivo no es cargar registros aislados, sino construir historias coherentes hasta aproximarnos a 50–70 occurrences de alta calidad.

## Narrative Museum alpha.21

Historias iniciales:
- Vino · 6 escenas;
- Pan · 7 escenas.

La app abre en Historias. El Atlas permanece completo como modo secundario.

La timeline corrige además el binding táctil de `Anterior / Siguiente` y utiliza títulos que describen la afirmación histórica en vez de repetir únicamente el nombre del alimento.

## Navigation hardening alpha.22

Alpha.22 no añade contenido histórico. Endurece la continuidad entre Historias, Atlas y Evidencia.

- historial del navegador y rutas internas recuperables;
- Atrás/Adelante puede reconstruir escenas;
- `Ver en el Atlas` revela la evidencia aunque filtros antiguos la oculten;
- events/developments quedan enfocados en la timeline;
- ranges de occurrences conservan la posición dentro del intervalo;
- anterior/siguiente navega respecto al hito seleccionado, incluidos hitos con la misma fecha inicial;
- `CANONICAL_RULES.md` normalizado a numeración única.

El corpus, stories, glossary, schemas históricos y fingerprint G2 no cambian.

## Geographic Explorer

Alpha.23 corrige la semántica del mapa.

El mapa ya no se vacía al seleccionar un año con pocas evidencias. Muestra el corpus geolocalizado completo que cumple búsqueda y filtros, y utiliza la fecha para resaltar las occurrences pertenecientes a ese momento.

`En esta fecha` sigue siendo la lectura temporal estricta.

La búsqueda del mapa es global y devuelve resultados visibles. Seleccionar una evidencia sincroniza mapa, fecha y ficha. Los resultados pueden autoencuadrarse, pero ese zoom no representa una ruta histórica.

No se inventan centroides ni líneas de difusión.

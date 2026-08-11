# Atlas Gastronómico Histórico

**Versión:** 0.1.0-alpha.7
**Estado:** nueva base canónica / prototipo funcional  
**Distribución principal:** GitHub Pages  
**Idioma inicial:** español

## Propósito

Construir un atlas histórico interactivo de la alimentación y la gastronomía cuya dimensión principal sea **el tiempo** y cuya segunda dimensión sea **el espacio**.

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

Desde alpha.2 la aplicación se diseña como **museo digital interactivo**, no como dashboard técnico:

- mapa y tiempo son protagonistas;
- las categorías gastronómicas tienen identidad cromática;
- los filtros técnicos permanecen disponibles pero se ocultan en un cajón;
- la ficha seleccionada funciona como panel de exposición;
- los conceptos internos `subject` y `occurrence` no dominan la terminología visible;
- la interfaz conserva advertencias de provisionalidad y trazabilidad.


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

## Importante sobre los datos iniciales

Los registros incluidos en esta alpha están marcados `seed`.

Sirven únicamente para demostrar que el motor puede manejar:
- ingredientes;
- técnicas;
- bebidas;
- productos;
- lugares;
- ocurrencias;
- eventos.

**No constituyen todavía un corpus histórico verificado.**

El gate G2 revisará cada dato con fuentes antes de elevarlo a `reviewed` o `verified`.


## Capas históricas

La arquitectura alpha.3 añade, sin descentrar la gastronomía:

- **Civilizaciones y culturas** (`contexts.json`);
- **Ciencia y tecnología** (`developments.json`);
- **Seguridad e higiene** como vista temática de developments.

Estas capas están preparadas pero permanecen vacías hasta la auditoría histórica G2.

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

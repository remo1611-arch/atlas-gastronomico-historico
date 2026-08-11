# Resultados de validación — 0.1.0-alpha.21

Fecha: 2026-08-11

# Resultado

**NARRATIVE MUSEUM INTEGRATION: PASS**

## Estado de producto

La jerarquía pública queda integrada como:

1. Historias — entender;
2. Atlas — explorar;
3. Evidencia — comprobar.

E1 permanece pausado hasta aceptación móvil.
G4 no se inicia.

## Corpus histórico

Sin cambios respecto a alpha.20:

- 11 subjects;
- 30 places;
- 30 occurrences;
- 1 event;
- 1 relationship;
- 7 contexts;
- 7 developments;
- 86 sources.

Cobertura espacial:
- 16 mapped occurrences;
- 14 unmapped occurrences.

## Capa narrativa

- 2 stories revisadas;
- 13 scenes;
- 16 glossary entries;
- 2 schemas narrativos nuevos.

### Historia del vino
- 6 escenas.

### Historia del pan
- 7 escenas.

## Schema validation

**PASS**

- 191 objetos;
- 10 schemas totales.

Los 8 schemas históricos de G2 no se modifican.

## Contrato G2

**Fingerprint 9/9 PASS.**

## Gates Narrative Museum

- NARRATIVE MUSEUM CONTRACT: PASS;
- NARRATIVE EDITORIAL DEPTH: PASS;
- PRIMARY NAVIGATION BINDINGS: PASS;
- ATLAS SEMANTIC HEADLINES: PASS.

## Navegación

Corrección explícita:

- `prevTemporalHitBtn` → `stepTemporalHit(-1)`;
- `nextTemporalHitBtn` → `stepTemporalHit(1)`;
- `storyPrevBtn` → `stepNarrativeScene(-1)`;
- `storyNextBtn` → `stepNarrativeScene(1)`.

La app abre en Historias.
El orden superior es Historias → Atlas.

## Atlas

Las occurrences de la timeline ya no utilizan `subject.name` como único título.

Se usa `occurrenceHeadline(o)`, que expresa el tipo de afirmación + subject + lugar.

## Regresión histórica / UX

PASS:
- G0/G1 regressions;
- G2 final gate;
- G3 final gate;
- G3 spatial audit;
- Focused Exploration;
- Progressive Disclosure;
- bread editorial expansion;
- longitudinal histories;
- disputed;
- verified gate;
- timeline unificada/magnética;
- map coverage;
- mobile contract;
- light contrast;
- filter state;
- GitHub Pages.

## Suite completa

- Python: **45/45 PASS**;
- Node + syntax checks: **5/5 PASS**;
- GitHub Pages: **18/18 PASS**.

## QA visual

Se intentó renderizar alpha.21 mediante Chromium headless local.
El proceso no completó la navegación/render dentro del tiempo permitido en el entorno y quedó bloqueado.

Por tanto:
- no se declara captura visual nueva de alpha.21;
- no se declara aceptación táctil real;
- la estructura, datos, bindings y regresión sí están validados;
- el gate visual/táctil debe realizarse en GitHub Pages/Xiaomi antes de alpha.22.

## Gate siguiente

No ampliar corpus todavía.

Validar en dispositivo real:
1. entrada por Historias;
2. lectura completa de Vino;
3. lectura completa de Pan;
4. glosario;
5. anterior/siguiente de escenas;
6. `Ver en el Atlas`;
7. ficha de evidencia;
8. anterior/siguiente de la timeline táctil;
9. retorno Atlas → Historias.

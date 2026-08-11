# QA

## Suite G0/G1

```bash
python tools/validate_project.py
node --check js/core.js
node --check js/app.js
node tools/test_core.mjs
python tools/test_project_pages.py
python tools/test_extended_contract.py
python tools/test_g2_traceability_ui.py
python tools/test_g2_pilot.py
python tools/test_g2_pilot_b.py
python tools/test_g2_pilot_c_maize.py
python tools/test_technique_history.py
python tools/test_disputed_contract.py
python tools/test_g2_pilot_d_nixtamalization.py
python tools/test_subject_history.py
python tools/test_temporal_navigator.py
python tools/test_unified_timeline.py
python tools/test_magnetic_timeline.py
node tools/test_magnetic_algorithm.mjs
python tools/test_verified_gate.py
python tools/test_public_state.py
python tools/test_schema_validation.py
python tools/test_search_debounce.py
python tools/test_map_coverage.py
python tools/test_filter_state.py
python tools/test_light_contrast.py
python tools/test_mobile_contract.py
python tools/build_manifest.py
```

## Gates

- IDs únicas.
- referencias subject/place/source válidas.
- año 0 prohibido.
- reviewed/verified requiere fuentes.
- rutas GitHub Pages bajo subdirectorio.
- `.nojekyll`.
- JS válido.
- mapa no presenta ocurrencia como “origen”.
- seed claramente visible.
- tema claro/oscuro.
- pantalla completa si el navegador la admite.

## G2

Antes de validar datos históricos:
- cronología sustentada;
- precisión conservada;
- tipo de evidencia correcto;
- certeza;
- fuente;
- interpretación separada de evidencia;
- origen no simplificado.


## Capas contextuales alpha.3
- [ ] `contexts.json` válido;
- [ ] `developments.json` válido;
- [ ] contextRefs válidos;
- [ ] developmentRefs válidos;
- [ ] impactSubjectRefs válidos;
- [ ] civilización/cultura no tratada como origen automático;
- [ ] seguridad/higiene diferenciada de gastronomía;
- [ ] assets dinámicos con cache busting de release.

## Gate móvil alpha.4
- [ ] página sin overflow horizontal involuntario;
- [ ] toolbar mapa estable en <= 820 px;
- [ ] `En esta fecha` sin clipping;
- [ ] textos largos rompen dentro del panel;
- [ ] cabecera estable en <= 600 px;
- [ ] modo claro con contraste AA en pares críticos;
- [ ] scroll horizontal solo en leyenda/atajos/franja cuando sea deliberado.

## Hardening alpha.5
- [ ] un único estado para filtro de tipo;
- [ ] reset restaura categoría/evidencia/ocurrencia/etiquetas/seed;
- [ ] registros sin coordenadas permanecen accesibles;
- [ ] UI informa cobertura cartográfica incompleta;
- [ ] warning diagnóstico no altera la UI;
- [ ] buscador debounced;
- [ ] marcadores usan transición compatible con reduced motion.

## Gate G2 reviewed
- [ ] subject reviewed con sourceRefs;
- [ ] place reviewed con sourceRefs;
- [ ] occurrence reviewed con sourceRefs;
- [ ] context/development reviewed con sourceRefs;
- [ ] point approximate/reference con point.sourceRefs;
- [ ] demo sustituido mediante deprecated + supersededBy;
- [ ] fuentes visibles en la ficha;
- [ ] no usar `verified` sin segunda revisión.

## Gate verified
- [ ] verification presente;
- [ ] verifiedOn;
- [ ] method;
- [ ] note;
- [ ] independentSourceRefs no vacío;
- [ ] independentSourceRefs existen y forman parte de sourceRefs.

## Gate G2-B
- [ ] todos los nuevos registros entran reviewed;
- [ ] Ganj Dareh/Kuyavia sin falso punto;
- [ ] Shubayqa conserva coordenadas publicadas;
- [ ] texto culinario contextualizado;
- [ ] domesticación animal no reducida a año de invención.

## Historia del elemento
- [ ] al menos 2 occurrences reviewed/verified para activar;
- [ ] seed/deprecated excluidos;
- [ ] developments vinculados por impactSubjectRefs;
- [ ] orden cronológico;
- [ ] aviso de no exhaustividad;
- [ ] abrir evidencia vuelve al mapa/ficha;
- [ ] abrir development salta al momento histórico;
- [ ] función genérica, sin código específico por subject.

## Gate G2-C / Maíz
- [ ] >= 7 occurrences reviewed/verified;
- [ ] evento transatlántico canónico reviewed;
- [ ] event demo deprecated + supersededBy;
- [ ] Historia del elemento incorpora events;
- [ ] certeza medium visible;
- [ ] introducción/adopción no tratadas como origen;
- [ ] sin rutas cartográficas inventadas.

## Navegador temporal
- [ ] evidencias reviewed/verified agregadas por densidad;
- [ ] seed/deprecated excluidos;
- [ ] occurrences verified destacadas sin saturar;
- [ ] events visibles como periodos;
- [ ] developments visibles como periodos;
- [ ] cursor sincronizado con año;
- [ ] hito anterior/siguiente;
- [ ] búsqueda/filtros repercuten en la banda;
- [ ] targets táctiles ampliados en móvil;
- [ ] reduced motion respetado;
- [ ] uncertainty conserva señal propia.

## Unified Timeline alpha.11
- [ ] no existe yearRange;
- [ ] no existen botones ± años;
- [ ] no existe playback/reproducción;
- [ ] no existe estado/timer de reproducción;
- [ ] config no contiene playStep/playStepOptions;
- [ ] tocar zona libre selecciona fecha;
- [ ] arrastrar mueve cursor sin rerender pesado hasta soltar;
- [ ] cursor accesible como slider;
- [ ] ArrowLeft/ArrowRight navegan por hitos;
- [ ] Home/End van a extremos del atlas;
- [ ] atajos históricos conservados;
- [ ] entrada directa de año conservada.

## Magnetic Timeline alpha.12
- [ ] tap/release sobre rail → hito visible más próximo;
- [ ] drag libre durante movimiento;
- [ ] candidato magnético resaltado;
- [ ] release → snap;
- [ ] event/development conserva posición interna si se pulsa dentro del rango;
- [ ] occurrence usa el mismo anclaje temporal que su marca visual;
- [ ] Ir al año permanece exacto;
- [ ] atajos editoriales permanecen exactos;
- [ ] filtros/capas limitan candidatos;
- [ ] sin commitTemporalYear legacy.

## Gate G2-D
- [ ] nixtamalization demo deprecated + supersededBy;
- [ ] 2 evidencias directas reviewed;
- [ ] technique_attestation presente;
- [ ] relación maize→uses_technique→nixtamalization;
- [ ] historia del maíz muestra TÉCNICA;
- [ ] hipótesis de origen sin occurrence artificial.

## Gate disputed
- [ ] certainty disputed;
- [ ] dispute.question;
- [ ] >=2 positions;
- [ ] cada posición con sourceRefs;
- [ ] position sourceRefs incluidos en occurrence sourceRefs;
- [ ] debate visible en ficha;
- [ ] ninguna posición declarada ganadora por la UI.

## Gate G2 maturity alpha.14
- [ ] segunda revisión B/C/D explícita;
- [ ] no promover bread/cheese/disputed sin contraste suficiente;
- [ ] olive_oil canónico;
- [ ] olive_oil_demo deprecated + supersededBy;
- [ ] >=3 occurrences reviewed/verified de olive_oil;
- [ ] tercer recorrido derivado del motor genérico;
- [ ] black_pepper reviewed;
- [ ] pimienta de Berenike = trade + archaeobotanical;
- [ ] no convertir hallazgo antiguo en origen absoluto.

python tools/test_demo_archive.py
python tools/test_g2_final_gate.py

## Gate final G2
- [ ] runtime solo reviewed/verified;
- [ ] seedToggle/showSeed ausentes;
- [ ] archive demo presente y no cargado;
- [ ] cinco seeds históricos preservados;
- [ ] sourceRefs completos;
- [ ] verified con verification;
- [ ] disputed estructurado;
- [ ] tres historias longitudinales;
- [ ] técnica, aceite y especia cubiertos;
- [ ] Magnetic Timeline PASS;
- [ ] GITHUB PAGES PASS;
- [ ] config.project.gate = G2_CLOSED.

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

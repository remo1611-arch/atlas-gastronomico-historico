# QA

## Suite G0/G1

```bash
python tools/validate_project.py
node --check js/core.js
node --check js/app.js
node tools/test_core.mjs
python tools/test_project_pages.py
python tools/test_extended_contract.py
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

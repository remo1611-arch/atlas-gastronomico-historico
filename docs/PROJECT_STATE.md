# Estado actual

## Versión
0.1.0-alpha.25

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Arquitectura candidata a congelación tras validar el contrato de historias monográficas/transversales y el gate móvil.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum: integrado.
- Navigation Hardening: integrado.
- Geographic Explorer: integrado.
- Product Consolidation alpha.24: integrado técnicamente.
- **Story Types alpha.25: implementado; aceptación Xiaomi pendiente.**
- E1 Fermentación: dossier preparado, integración PAUSADA hasta superar alpha.25.
- G4: NO INICIADO.

## Corpus
12 subjects · 31 places · 32 occurrences · 1 event · 1 relationship · 7 contexts · 7 developments · 90 sources · 2 stories · 13 escenas · 16 términos de glosario.

No se ha ampliado corpus en alpha.25.

## Cobertura espacial
- occurrences: 17 con punto / 15 sin punto;
- contexts: 5 con punto cartografiable / 2 sin punto;
- developments: 1 con punto cartografiable / 6 sin punto.

## Contrato narrativo alpha.25
`story.subjectRef` queda eliminado.

- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- Vino y Pan han sido migrados al contrato nuevo.
- El motor prioriza una historia monográfica al navegar desde un subject, pero la portada puede alojar ambos tipos.
- Schema, validador y pruebas rechazan el campo legacy y validan una historia transversal sintética.

## Contratos preservados
El corpus histórico, scenes, sources, glossary y fingerprint G2 no cambian en alpha.25. No hay datos duplicados ni subjects ficticios para representar técnicas transversales.

## Próximo paso
Ejecutar el gate móvil sobre alpha.25. Si pasa: integrar Fermentación como primera historia transversal; después realizar gate museográfico Vino/Pan/Fermentación y congelar formalmente el contrato.

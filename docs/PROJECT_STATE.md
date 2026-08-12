# Estado actual

## Versión
0.1.0-alpha.26

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

El contrato de historias monográficas/transversales ya está probado con una transversal real. La arquitectura queda **candidata a congelación**, condicionada al gate físico/museográfico de alpha.26.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum: integrado.
- Navigation Hardening: integrado.
- Geographic Explorer: integrado.
- Product Consolidation: integrado técnicamente.
- Story Types alpha.25: integrado.
- **E1 Fermentación alpha.26: integrada como primera historia transversal real; aceptación Xiaomi/museográfica pendiente.**
- G4: NO INICIADO.

## Corpus
13 subjects · 33 places · 34 occurrences · 1 event · 1 relationship · 7 contexts · 9 developments · 98 sources · 3 stories · 18 escenas · 20 términos de glosario.

Incremento alpha.26: +1 subject, +2 places, +2 occurrences, +2 developments, +8 sources, +1 story, +5 escenas y +4 términos de glosario.

## Cobertura espacial
- occurrences: 18 con punto / 16 sin punto;
- contexts: 5 con punto cartografiable / 2 sin punto;
- developments: 1 con punto cartografiable / 8 sin punto.

No se persigue el 100 % de pines. Jiahu usa una localización publicada; Xiaohe y los developments sin punto permanecen no puntuales cuando la evidencia disponible no justifica una coordenada canónica.

## Contrato narrativo
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- Vino y Pan son monográficas; Fermentación es transversal.
- El motor y el renderer son genéricos; no existe código especial para Fermentación.
- Navegación desde subject prioriza historia monográfica; una transversal solo se autoelige cuando no existe monográfica y es la única candidata.

## Fermentación alpha.26
Recorrido curado de 5 escenas:
1. Jiahu — práctica fermentativa empírica en el VII milenio a. C.;
2. Georgia + Xiaohe — diversidad de matrices y evidencias;
3. Pasteur 1857 — microorganismos dentro de la explicación experimental;
4. 1863–1865 — conocimiento aplicado al control del vino;
5. Hansen 1883 — cultivo puro y reproducibilidad.

Raqefet queda fuera de esta versión por controversia interpretativa. Ninguna evidencia de pan antiguo se presenta como fermentada sin prueba específica.

## Próximo paso
Ejecutar `docs/MOBILE_ACCEPTANCE_ALPHA26.md`. Si pasa: gate museográfico conjunto Vino/Pan/Fermentación y congelación formal del contrato. Después reanudar expansión editorial con Cacao/chocolate, Café, Azúcar, Patata y Especias/conservación.

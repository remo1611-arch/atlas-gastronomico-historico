# Estado actual

## Versión
0.1.0-alpha.28

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.28 es la primera expansión editorial completa posterior al `Product Contract Freeze` de alpha.27. Integra **Historia del cacao y el chocolate** sin modificar los diez schemas congelados, la navegación ni el motor narrativo genérico.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum: CERRADO como experiencia pública.
- Navigation Hardening: CERRADO.
- Geographic Explorer: CERRADO.
- Product Consolidation: CERRADO.
- Story Types: CERRADO.
- Primera transversal (Fermentación): CERRADA.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- **E1 Cacao/chocolate alpha.28: QA automatizado PASS; aceptación móvil pendiente.**
- G4: NO INICIADO.

## Corpus
14 subjects · 40 places · 37 occurrences · 1 event · 1 relationship · 7 contexts · 13 developments · 109 sources · 4 stories · 23 escenas · 23 términos de glosario.

## Cobertura espacial
- occurrences: 18 con punto / 19 sin punto;
- contexts: 5 con punto cartografiable / 2 sin punto;
- developments: 4 con punto cartografiable / 9 sin punto.

La ampliación de Cacao mantiene sin punto Santa Ana-La Florida, Puerto Escondido, el ámbito maya regional y el proceso atlántico cuando la fuente usada no justifica una localización puntual única. Amsterdam, Vevey y Berna se usan únicamente como referencias urbanas para developments industriales documentados. No se persigue el 100 % de pines ni se crean centroides artificiales.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- `relatedSubjectRefs` describe subjects efectivamente cubiertos por el recorrido.
- No existe `story.subjectRef` legacy.
- Navegación desde subject prioriza historia monográfica; una transversal solo se autoelige cuando no existe monográfica y es la única candidata.
- Los diez schemas canónicos siguen fingerprinted exactamente desde alpha.27 en `docs/PRODUCT_CONTRACT_FINGERPRINT.json`.

## E1 · Cacao/chocolate
La historia contiene 5 escenas:
1. Santa Ana-La Florida: evidencia multiproxy de cacao en la alta Amazonía.
2. Puerto Escondido: residuos de cacao y cautela sobre la hipótesis de fermentación de pulpa.
3. Mundo maya clásico: vasos, escritura, iconografía y espuma con límites de representatividad.
4. Circulación atlántica: adopción y reformulación, sin modelo lineal de «Europa corrige el chocolate».
5. Industrialización 1828–1879: prensa de Van Houten, ensayos de Daniel Peter y conchado de Lindt, evitando falsos hitos de prioridad universal.

Reglas de conocimiento protegidas: **cacao ≠ chocolate**, evidencia antigua ≠ origen absoluto, prensa de 1828 ≠ dutching y no se canoniza una «primera tableta» dependiente de definición.

## Próximo paso
Validar alpha.28 en móvil y, si no aparece una regresión real, continuar E1 con **Café → Azúcar → Patata → Especias/conservación**, manteniendo el contrato congelado y la proporción aproximada de trabajo orientada a investigación/redacción/curación.

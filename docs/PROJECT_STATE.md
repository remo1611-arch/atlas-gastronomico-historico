# Estado actual

## Versión
0.1.0-alpha.29

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.29 integra **Historia del Café** como segunda expansión editorial posterior al Product Contract Freeze de alpha.27. No modifica ninguno de los diez schemas congelados, la navegación ni el motor narrativo genérico.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum / Navigation Hardening / Geographic Explorer / Product Consolidation / Story Types: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- E1 Cacao/chocolate alpha.28: QA automatizado PASS.
- **E1 Café alpha.29: QA automatizado PASS; aceptación móvil pendiente.**
- G4: NO INICIADO.

## Corpus
15 subjects · 45 places · 38 occurrences · 1 event · 1 relationship · 7 contexts · 18 developments · 121 sources · 5 stories · 28 escenas · 27 términos de glosario.

## Cobertura espacial
- occurrences: 18 con punto / 20 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 9 con punto / 9 sin punto.

Yemen temprano permanece sin punto único. Estambul, Oxford, Batavia/Jakarta y Milán son referencias urbanas documentadas como tales, no coordenadas exactas de una cafetería, plantación o máquina históricas.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- No existe `story.subjectRef` legacy.
- Los diez schemas canónicos conservan el fingerprint de alpha.27 en `docs/PRODUCT_CONTRACT_FINGERPRINT.json`.

## E1 · Café
5 escenas:
1. origen botánico africano vs bebida documentada en Yemen;
2. coffeehouse otomana como institución social;
3. Oxford 1650–1651 y redes de conversación/experimentación;
4. traslado de Arabica a Batavia 1696–1699 dentro de redes coloniales;
5. espresso como evolución Bezzera 1902–1903 → Gaggia 1938–1947.

Reglas protegidas: Kaldi no es evidencia; Etiopía ≠ fecha de invención de la bebida; no se canoniza una «primera cafetería» universal; Oxford conserva la discrepancia de fuentes; espresso no es alias botánico ni una invención puntual.

## Próximo paso
Validar alpha.29 en móvil. Si no aparece una regresión real, continuar E1 con **Azúcar → Patata → Especias/conservación** sin reabrir arquitectura salvo defecto demostrado.

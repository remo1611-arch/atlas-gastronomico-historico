# Estado actual

## Versión
0.1.0-alpha.30

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.30 integra **Historia del Azúcar** como tercera expansión editorial posterior al Product Contract Freeze de alpha.27. No modifica ninguno de los diez schemas congelados, la navegación ni el motor narrativo genérico.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum / Navigation Hardening / Geographic Explorer / Product Consolidation / Story Types: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- E1 Cacao/chocolate alpha.28: QA automatizado PASS.
- E1 Café alpha.29: QA automatizado PASS.
- **E1 Azúcar alpha.30: QA automatizado PASS; aceptación móvil pendiente.**
- G4: NO INICIADO.

## Corpus
16 subjects · 51 places · 40 occurrences · 1 event · 1 relationship · 7 contexts · 23 developments · 135 sources · 6 stories · 33 escenas · 32 términos de glosario.

## Cobertura espacial
- occurrences: 19 con punto / 21 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 11 con punto / 12 sin punto.

Nueva Guinea y Asia meridional permanecen sin punto único para los procesos antiguos. Funchal se usa solo como referencia urbana de Madeira. El sistema atlántico de plantación/esclavitud no recibe centroide. Berlín se cartografía como referencia urbana; Cunern permanece sin punto hasta disponer de georreferencia histórica específica.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- No existe `story.subjectRef` legacy.
- Los diez schemas canónicos conservan el fingerprint de alpha.27 en `docs/PRODUCT_CONTRACT_FINGERPRINT.json`.

## E1 · Azúcar
5 escenas:
1. domesticación de `Saccharum officinarum` en Nueva Guinea;
2. cristalización en Asia meridional como cronología historiográfica aproximada;
3. desplazamiento productivo Mediterráneo → Madeira;
4. sistema atlántico de plantación y esclavitud;
5. Marggraf 1747 → Achard 1801 y azúcar de remolacha.

Reglas protegidas: caña ≠ azúcar cristalizado; difusión ≠ generalización del consumo; no existe fecha canónica «350 = invención»; el abaratamiento atlántico no se narra sin coerción/esclavitud; remolacha no equivale a sustitución inmediata de caña ni a final causal de la esclavitud.

## Próximo paso
Validar alpha.30 en móvil. Si no aparece una regresión real, continuar E1 con **Patata → Especias/conservación** sin reabrir arquitectura salvo defecto demostrado.

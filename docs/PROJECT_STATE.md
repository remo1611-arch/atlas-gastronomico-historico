# Estado actual

## Versión
0.1.0-alpha.31

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.31 integra **Historia de la Patata** como cuarta expansión editorial posterior al Product Contract Freeze de alpha.27. No modifica ninguno de los diez schemas congelados, la navegación ni el motor narrativo genérico.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Narrative Museum / Navigation Hardening / Geographic Explorer / Product Consolidation / Story Types: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- E1 Cacao/chocolate alpha.28: QA automatizado PASS.
- E1 Café alpha.29: QA automatizado PASS.
- E1 Azúcar alpha.30: QA automatizado PASS.
- **E1 Patata alpha.31: QA automatizado PASS; aceptación móvil pendiente.**
- G4: NO INICIADO.

## Corpus
17 subjects · 56 places · 43 occurrences · 1 event · 1 relationship · 7 contexts · 27 developments · 146 sources · 7 stories · 38 escenas · 36 términos de glosario.

## Cobertura espacial
- occurrences: 20 con punto / 23 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 12 con punto / 15 sin punto.

Jiskairumoko, Gran Canaria, Galicia interior e Irlanda permanecen sin centroide cuando la evidencia es regional. Herbón usa únicamente un punto territorial contemporáneo con `precision=reference`, no una supuesta huerta histórica exacta.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- No existe `story.subjectRef` legacy.
- Los diez schemas canónicos conservan el fingerprint de alpha.27 en `docs/PRODUCT_CONTRACT_FINGERPRINT.json`.

## E1 · Patata
5 escenas:
1. Andes/Jiskairumoko: domesticación como proceso y evidencia microbotánica ca. 3400–1600 a. C.;
2. Gran Canaria 1567: presencia documental europea, no fecha exacta de llegada;
3. Herbón 1574–1607: ensayo temprano retrospectivamente documentado, no adopción continua;
4. Galicia 1736–1850: difusión desigual y aceleración desde la crisis cerealera de 1769–1770;
5. Irlanda 1845–1852: Phytophthora infestans, dependencia alimentaria y Gran Hambruna como crisis multicausal.

Reglas protegidas: evidencia más antigua ≠ origen absoluto; presencia ≠ llegada; presencia ≠ adopción; adopción ≠ difusión uniforme; tizón ≠ explicación social suficiente de una hambruna.

## Próximo paso
Validar alpha.31 en móvil. Si no aparece una regresión real, continuar E1 con **Especias/conservación** y después comenzar a valorar historias transversales de segundo nivel sin reabrir arquitectura salvo defecto demostrado.

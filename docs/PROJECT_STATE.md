# Estado actual

## Versión
0.1.0-alpha.33

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.33 integra **Cómo aprendimos a conservar los alimentos** como primera historia transversal de segundo nivel. Reutiliza principalmente corpus existente y no modifica ninguno de los diez schemas congelados, navegación ni motor narrativo.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- E1 Cacao alpha.28 / Café alpha.29 / Azúcar alpha.30 / Patata alpha.31 / Especias alpha.32: QA automatizado PASS.
- **Transversal de segundo nivel Conservación alpha.33: QA automatizado PASS; aceptación móvil pendiente.**
- G4: NO INICIADO.

## Corpus
19 subjects · 59 places · 45 occurrences · 1 event · 1 relationship · 7 contexts · 30 developments · 157 sources · 9 stories · 49 escenas · 46 términos de glosario.

## Cobertura espacial
- occurrences: 21 con punto / 24 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 13 con punto / 17 sin punto.

Alpha.33 no añade coordenadas ni centroides.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- No existe `story.subjectRef` legacy.
- Los diez schemas canónicos conservan el fingerprint de alpha.27.

## Historia de Conservación
6 escenas:
1. Jiahu + garum: transformación empírica, efecto e intención no son sinónimos;
2. Appert 1809–1810: calor + cierre antes de teoría microbiana;
3. Perkins 1834 → Monitor Top 1927: frío producido e infraestructura;
4. Pasteur 1863–1865: explicación microbiológica del deterioro;
5. HACCP década de 1960: prevención de peligros en proceso;
6. Codex 1961–1963: normalización internacional sin convertirla en ley mundial.

## Próximo paso
Cerrar QA reproducible de alpha.33 y validarla en móvil. Si supera el gate, el siguiente trabajo debe centrarse en elegir entre una nueva historia monográfica (p. ej. tomate/maíz como gran intercambio) o empezar G4 solo cuando el corpus justifique representar relaciones demostradas de introducción/adopción/difusión.

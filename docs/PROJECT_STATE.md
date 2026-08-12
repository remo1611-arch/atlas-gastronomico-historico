# Estado actual

## Versión
0.1.0-alpha.34

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.34 integra **Cultivos americanos, cocinas europeas** como transversal orientada a preparar G4. Distingue presencia, introducción, cultivo, adopción y generalización sin dibujar rutas no demostradas.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- E1 Cacao alpha.28 / Café alpha.29 / Azúcar alpha.30 / Patata alpha.31 / Especias alpha.32: QA automatizado PASS.
- Conservación alpha.33: QA automatizado PASS.
- Intercambio colombino alpha.34: QA automatizado PASS; aceptación móvil pendiente.
- **G4: PILOT-READY · FULL NETWORK NO INICIADA.**

## Corpus
22 subjects · 63 places · 50 occurrences · 1 event · 1 relationship · 7 contexts · 30 developments · 163 sources · 10 stories · 55 escenas · 50 términos de glosario.

## Cobertura espacial
- occurrences: 21 con punto / 29 sin punto;
- contexts: 5 con punto / 2 sin punto;
- developments: 13 con punto / 17 sin punto.

Alpha.34 no añade centroides. Sus cuatro lugares nuevos son regionales y permanecen sin punto.

## Contrato narrativo congelado
- `storyType="subject"` → `primarySubjectRef` canónico + `relatedSubjectRefs`.
- `storyType="transversal"` → `primarySubjectRef: null` + al menos 2 `relatedSubjectRefs`.
- No existe `story.subjectRef` legacy.
- Los diez schemas canónicos conservan el fingerprint de alpha.27.
- `data/taxonomy.json` conserva además el fingerprint G2; la cobertura de tipos específicos se resuelve en runtime sin mutar ese contrato.

## Historia de intercambio colombino
6 escenas:
1. historias americanas anteriores a 1492;
2. judía común: introducción reconstruida + cultivo desde 1532;
3. tomate: 1544 atestiguación ≠ adopción del siglo XVIII;
4. Capsicum + maíz: adopciones regionales;
5. patata: 1567 presencia/comercio → ensayo → generalización desigual;
6. cacao + azúcar: consumo europeo, circulación y poder atlántico.

## G4 readiness
- 50 occurrences: umbral inferior de referencia alcanzado.
- 2 `introduction`, 4 `adoption`, 2 `trade`.
- 1 relationship canónica: insuficiente para una red extensa.
- candidatos directos de vector: Gran Canaria→Amberes (patata 1567) y Malabar→Batavia (café 1696/1699).

## Próximo paso
Validar alpha.34 en móvil. Si pasa, diseñar **G4 Pilot A** como extensión aditiva y extremadamente limitada a vectores documentados; no abrir una red completa hasta disponer de más conexiones independientes y evidencia de ruta suficiente.

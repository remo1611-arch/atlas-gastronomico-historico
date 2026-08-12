# Prompt de continuidad

Toma este ZIP como base canónica del **Atlas Gastronómico Histórico**. Es una reescritura desde cero del proyecto de atlas general anterior.

Antes de modificar:
1. verifica `MANIFEST.json`;
2. lee `docs/PROJECT_STATE.md`;
3. lee `docs/CANONICAL_RULES.md`;
4. lee `docs/DATA_MODEL.md`;
5. lee `docs/ROADMAP.md`;
6. lee `docs/DECISIONS.md`.

Reglas críticas:
- tiempo como eje;
- `subject` no contiene un origen universal;
- la unidad histórica central es `occurrence`;
- no inventar fechas, orígenes, difusión ni fronteras;
- separar evidencia, inferencia y tradición;
- GitHub Pages es la distribución principal;
- no usar rutas web absolutas;
- separar auditoría, modificación y validación;
- no ampliar masivamente el corpus antes de cerrar el gate actual.

Indica siempre gate abierto, cambios, pruebas PASS/FAIL y pendientes.


Estado actual:
- G1 CERRADO.
- G2 EN CURSO.
- No volver a rediseñar G1 salvo defecto reproducible.
- Continuar desde `docs/G2_PILOT.md`.
- `reviewed` no se promueve a `verified` sin segunda revisión explícita.

Continuación alpha.7:
- G1 cerrado.
- G2 tandas A+B.
- leer G2_SECOND_REVIEW_A.md y G2_PILOT_B.md.
- no promover B a verified sin segunda revisión.
- no asignar coordenadas a regiones solo para rellenar el mapa.

Continuación alpha.8:
- leer docs/G2_PILOT_C_HISTORY.md;
- “Historia del elemento” es derivada, no duplicar hitos;
- el próximo recorrido debe demostrar reutilización genérica;
- no interpretar huecos como ausencia histórica.

Continuación alpha.9:
- dos historias longitudinales activas: vino y maíz;
- leer docs/G2_PILOT_C_MAIZE.md;
- subjectHistoryItems combina occurrence/event/development;
- siguiente candidato de contrato: nixtamalización canónica + relación con maíz;
- antes de G3 probar al menos un caso disputed.

Continuación alpha.10:
- navegador temporal museográfico implementado;
- no sustituirlo por una fila de puntos/labels;
- siguiente fase: G2-D nixtamalización + primer disputed;
- comprobar en dispositivo real densidad, bandas de events y anterior/siguiente antes de cambiar su estética.

Continuación alpha.11:
- cronología única;
- no reintroducir slider paralelo, ± años ni playback cronológico;
- validar drag/tap/hitos en Xiaomi 15;
- después continuar G2-D nixtamalización + primer disputed.

Continuación alpha.12:
- timeline magnética activa;
- tap no selecciona años vacíos salvo que no exista ningún hito visible bajo filtros;
- Ir al año es exacto;
- validar sensación de snap en Xiaomi 15;
- después G2-D nixtamalización + primer disputed.

Continuación alpha.13:
- G2-D implementado;
- nixtamalización es técnica canónica relacionada con maíz;
- primer disputed = gallinas de El Arenal-1;
- no convertir hipótesis de origen en fechas;
- siguiente paso: segunda revisión B/C/D + tercer recorrido + aceite/grasa/especia.

Continuación alpha.14:
- ejecutar cierre formal de G2;
- auditar todos los subjects/occurrences status seed;
- decidir por cada seed: canonizar con fuentes o excluir de experiencia pública;
- no cargar corpus masivo antes de cerrar ese gate;
- conservar tres historias genéricas: vino, maíz, aceite de oliva.

Estado de continuación:
- G2 CLOSED.
- No añadir seeds al runtime.
- No reabrir arquitectura G2 salvo defecto verificable.
- Iniciar G3: evidencia y precisión.
- Leer docs/G2_FINAL_GATE.md y docs/SEED_ARCHIVE.md.

Estado de continuación:
- G2 CLOSED.
- G3-A implementado.
- No modificar schemas/taxonomy sin romper explícitamente el fingerprint y justificarlo mediante ADR.
- Próximo trabajo: auditoría visual/táctil de filtros/lente/ficha y decidir G3-B.
- No crear un evidenceScore.

Estado de continuación:
- G2 CLOSED.
- G3-A/B implementados.
- Fingerprint G2 debe permanecer 9/9.
- No crear score de evidencia ni winner disputed.
- Antes de G3-C, revisar visualmente timeline precision window, history gaps y dispute comparison.

Estado:
- G2 CLOSED.
- G3-A/B/C implementados.
- Focused Exploration es la arquitectura pública actual.
- No reintroducir museum rail, category dashboard, context dashboard ni secciones standalone de transformaciones/eventos.
- Próximo bloque: G3-D auditoría espacial de 18 unmapped.
- Antes, validar alpha.18 visual/táctilmente en Xiaomi 15.

Estado de continuación:
- G2 CLOSED.
- G3 CLOSED.
- Spatial audit: 15 mapped / 9 unmapped.
- No perseguir 100 % de pines.
- No añadir más UI técnica salvo defecto verificable.
- Próxima fase: expansión editorial controlada del corpus antes de G4.
- Priorizar historias coherentes, buena procedencia espacial y densidad temporal.
- Objetivo orientativo antes de redes complejas: 50–70 occurrences de alta calidad.

Estado de continuación:
- G2 CLOSED.
- G3 CLOSED.
- E1 editorial expansion IN PROGRESS.
- Corpus: 30 occurrences / 86 sources.
- Historia del pan: 7 occurrences + Chorleywood.
- No iniciar G4 todavía.
- Elegir próximo dossier por rendimiento histórico: periodos nuevos + territorios nuevos + fuentes fuertes + conexiones futuras.
- Mantener Focused Exploration: no añadir UI técnica.

Estado de continuación:
- alpha.21 integra Narrative Museum en la app canónica.
- Historias es la entrada principal; Atlas, secundaria.
- 2 stories / 13 scenes / 16 glossary entries.
- E1 pausado; no añadir contenido hasta aceptación móvil.
- Probar en Xiaomi: lectura, glosario, escena anterior/siguiente, Historia→Atlas→Evidencia y timeline anterior/siguiente.
- No iniciar G4.

Estado de continuación alpha.22:
- Narrative Museum sigue siendo la arquitectura canónica.
- Alpha.22 corrige navegación y continuidad; no añade contenido.
- Rutas internas: #historias / #historia/... / #atlas/....
- Probar Atrás/Adelante real en Xiaomi.
- Probar Historia → Atlas → Atrás.
- Probar `Ver en el Atlas` con filtros previamente activos.
- Probar Pasteur: debe enfocar transformación, no solo cambiar de año.
- Probar anterior/siguiente con hitos de rango y misma fecha.
- E1 y G4 siguen pausados hasta aceptación.

Estado de continuación:
- Narrative Museum integrado.
- Navigation Hardening integrado.
- Geographic Explorer integrado.
- El mapa muestra todo el corpus geolocalizado compatible con filtros; la fecha solo destaca.
- `En esta fecha` sigue siendo temporalmente estricto.
- Buscar `vino` debe mostrar 5 occurrences y autoencuadrar sus puntos aunque el año sea 1500.
- Buscar `pan` debe devolver 7 occurrences y no coincidir con `España`.
- Pin → sincroniza fecha + ficha + zoom regional.
- `Mundo` restablece viewBox global.
- No añadir historias/corpus hasta completar `docs/MOBILE_ACCEPTANCE_ALPHA24.md`. Alpha.24 corrige cobertura multicapas y firstMappablePlace; después, gate museográfico Vino/Pan y congelación del contrato.


Estado de continuación alpha.27:
- Gate funcional de alpha.26 aceptado en Xiaomi.
- Gate museográfico conjunto Vino/Pan/Fermentación: PASS.
- Contrato de producto formalmente congelado: Historias = comprender · Atlas = descubrir · Evidencia = verificar.
- `storyType=subject|transversal` queda como contrato narrativo canónico; no existe `story.subjectRef` legacy.
- `relatedSubjectRefs` solo declara subjects efectivamente cubiertos por evidencias de la visita.
- Corpus histórico sin cambios respecto a alpha.26: 13 subjects / 33 places / 34 occurrences / 98 sources / 3 stories / 18 scenes / 20 glossary entries.
- Vino ~10 min; Pan ~10 min; Fermentación ~7 min.
- Mapas de escena informan cobertura parcial y no inventan puntos.
- Fingerprint del contrato: `docs/PRODUCT_CONTRACT_FINGERPRINT.json`.
- Próxima fase: E1 Cacao/chocolate → Café → Azúcar → Patata → Especias/conservación.
- No reabrir arquitectura salvo necesidad demostrada + migración explícita + actualización del fingerprint.
- G4 sigue sin iniciarse hasta disponer de corpus suficiente.


Estado de continuación alpha.28:
- Product Contract Freeze alpha.27 sigue ACTIVE; no actualizar fingerprint salvo migración explícita.
- Primera expansión post-freeze integrada: Historia del cacao y el chocolate, 5 escenas.
- Corpus: 14 subjects / 40 places / 37 occurrences / 109 sources / 4 stories / 23 scenes / 23 glossary.
- Cacao: 3 occurrences arqueológicas + 4 developments históricos/industriales.
- No afirmar «primer chocolate» ni «primera tableta» como prioridad universal.
- Van Houten 1828 = prensado; dutching/alcalinización es posterior y distinto.
- Daniel Peter = ensayos documentados desde 1875; Lindt = conchado 1879.
- Santa Ana-La Florida, Puerto Escondido y ámbito maya permanecen sin punto si no existe procedencia puntual suficiente en la fuente seleccionada.
- QA automatizado alpha.28: PASS; aceptación móvil pendiente.
- Si pasa, siguiente dossier E1: Café; después Azúcar → Patata → Especias/conservación.
- G4 sigue bloqueado hasta densidad de corpus suficiente.


Estado de continuación alpha.29:
- Product Contract Freeze alpha.27 permanece ACTIVE; no actualizar fingerprint salvo migración explícita.
- Historia del Café integrada con 5 escenas.
- Corpus: 15 subjects / 45 places / 38 occurrences / 121 sources / 5 stories / 28 scenes / 27 glossary.
- Kaldi no es evidencia histórica canónica.
- Separar origen botánico de Arabica y documentación histórica de la bebida.
- Oxford conserva la discrepancia 1650/1651.
- Batavia 1696–1699 se explica como transferencia colonial de material vegetal.
- Bezzera 1902–1903 y Gaggia 1938–1947 son etapas distintas; no usar «1901 = espresso moderno».
- Siguiente dossier E1: Azúcar; después Patata → Especias/conservación.
- G4 sigue bloqueado hasta densidad de corpus suficiente.

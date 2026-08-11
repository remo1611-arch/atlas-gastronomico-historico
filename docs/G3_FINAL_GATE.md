# G3 — Gate final

Fecha de cierre: 2026-08-11  
Release: `0.1.0-alpha.19`

# Resultado

**G3 CERRADO**

G3 tenía como objetivo que el usuario pudiera interpretar correctamente:

- certeza;
- precisión cronológica;
- estado editorial;
- desacuerdo académico;
- amplitud temporal;
- procedencia documental;
- cobertura y precisión espacial;

sin convertir esas dimensiones en un score opaco ni añadir ruido permanente a la pantalla.

---

# G3-A — Evidencia y precisión

Completado:

- filtro de certainty;
- filtro de period.precision;
- filtro mapped/unmapped;
- Evidence Lens bajo demanda;
- ficha de lectura de evidencia;
- source comparison descriptiva;
- registros sin punto accesibles;
- no `evidenceScore`.

---

# G3-B — Cronología y desacuerdo

Completado:

- ventana temporal contextual;
- point/range/circa/broad;
- perfil cronológico;
- gaps y solapamientos entre hitos;
- precision + certainty en occurrence/event/technique/development;
- disputed con posiciones y fuentes;
- sin winner, preferred position ni consensus score.

---

# G3-C — Focused Exploration

Completado:

- Explorar / Historias separados;
- home reducida a Tiempo → Mapa → En esta fecha;
- eliminación de dashboards redundantes;
- metodología bajo demanda;
- máximo de resultados antes de `Ver más`;
- procesos y cambios plegados;
- eliminación de legacy asociado.

Principio:

> La complejidad del modelo no debe convertirse en complejidad permanente de la interfaz.

---

# G3-D — Auditoría espacial

Baseline:
- 18 occurrences sin punto.

Resultado:
- 9 nuevas occurrences cartografiadas;
- 5 occurrences regionales deliberadamente sin punto;
- 4 occurrences de tres sitios concretos todavía sin resolución espacial suficiente.

Corpus final:
- 15 occurrences con punto;
- 9 occurrences sin punto.

No se añaden centroides inventados.

---

# Contrato G2 congelado

La taxonomía y los 8 schemas siguen siendo byte-identical al fingerprint de G2 CLOSED.

`9/9 PASS`

G3 añade:
- UI;
- documentación;
- procedencia espacial en places;
- fuentes de procedencia espacial;

pero no cambia el modelo canónico.

---

# Criterios de cierre

G3 se considera cerrado porque:

- estado editorial / certeza / precisión se distinguen;
- disputed es legible sin arbitraje automático;
- intervalos no se presentan como fechas puntuales;
- las fuentes pueden compararse descriptivamente;
- mapped/unmapped es explícito;
- todos los casos originalmente sin punto están auditados;
- la pantalla principal fue simplificada mediante divulgación progresiva;
- G2 fingerprint permanece intacto.

No se exige:
- 100 % de pines;
- rationale nuevo por schema;
- score de evidencia;
- geometrías regionales improvisadas.

---

# Siguiente fase

Antes de construir redes complejas, el cuello de botella pasa a ser **contenido histórico suficiente y espacialmente útil**.

La siguiente etapa recomendada es expansión editorial controlada:

1. completar historias coherentes;
2. aumentar densidad del mapa y del tiempo;
3. priorizar casos con buena evidencia y procedencia espacial;
4. aproximarse a 50–70 occurrences de alta calidad;
5. iniciar G4 — difusión y redes — cuando el corpus justifique realmente esas conexiones.


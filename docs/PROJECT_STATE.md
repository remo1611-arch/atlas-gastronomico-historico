# Estado actual

## Versión
0.1.0-alpha.35.1

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.35.1 conserva **G4 Pilot A** y limpia su presentación pública de forma aditiva y limitada. Introduce vínculos históricos direccionales solo cuando la fuente documenta el vector; no convierte coincidencias de subject en rutas.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- Expansión editorial alpha.28–alpha.34: QA automatizado PASS.
- **G4 Pilot A alpha.35: IMPLEMENTADO · QA automatizado PASS · aceptación móvil pendiente.**
- **G4 Full Network: BLOQUEADO.**

## Corpus
22 subjects · 65 places · 50 occurrences · 1 event · 1 relationship · **2 transfers G4 pilot** · 7 contexts · 30 developments · 163 sources · 10 stories · 55 escenas · 50 términos de glosario.

## G4 Pilot A
Vectores publicados:
1. `transfer_potato_gran_canaria_antwerp_1567` — `trade` — Gran Canaria → Amberes — noviembre de 1567 — verified/high.
2. `transfer_coffee_malabar_batavia_1696_1699` — `plant_transfer` — costa de Malabar → Batavia — 1696 y 1699 — reviewed/high.

Ambos son direcciones históricas sustentadas por fuentes. **Ninguno se dibuja como línea**:
- Gran Canaria se mantiene como referencia insular sin punto histórico de embarque;
- Amberes se conserva como destino documental sin fingir un puerto exacto;
- Malabar es una región histórica y no recibe centroide;
- Batavia tiene referencia urbana, pero un único extremo cartografiable no basta.

La ausencia de geometría no invalida el vínculo.

## Contrato
- Los diez schemas congelados de alpha.27 permanecen intactos.
- `transfer.schema.json` es un contrato **aditivo de piloto G4** y no sustituye `relationship.schema.json`.
- `relationship`: subject → subject.
- `transfer`: lugar → lugar sobre un subject, con dirección histórica explícita.
- `mapMode=endpoint_connection` requiere opt-in editorial y puntos sustentados en ambos extremos; `mapMode=none` mantiene el vínculo sin línea.

## Criterio para ampliar G4
No abrir red extensa hasta disponer de más vectores independientes de calidad. La densidad se evaluará por variedad de subjects, periodos, regiones y tipos de transferencia, no por número de líneas.

## Próximo paso
Validar alpha.35.1 en Xiaomi: capa G4, lectura sin líneas, acceso a evidencia y ausencia de confusión con rutas. Si pasa, auditar un **Pilot B** con más candidatos documentales antes de decidir cualquier visualización de red amplia.

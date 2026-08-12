# G4 Pilot A · alpha.35

## Veredicto
**IMPLEMENTADO · QA automatizado PASS · aceptación móvil pendiente**

## Problema
G4 debe representar difusión/intercambio sin inferir una ruta porque dos lugares compartan un alimento. `relationships.json` no sirve para ello: su contrato canónico conecta subjects, no lugares.

## Decisión de arquitectura
Se añade de forma aditiva:
- `data/transfers.json`;
- `schemas/transfer.schema.json`.

Los diez schemas protegidos por `PRODUCT_CONTRACT_FINGERPRINT.json` permanecen sin cambios. El nuevo contrato piloto no reutiliza campos de `relationship` con otra semántica.

## Contrato transfer
Cada transfer exige:
- `subjectRef`;
- `type` (`trade`, `plant_transfer`, `introduction`, `adoption`, `generalization`);
- `period`;
- `fromPlaceRef` / `toPlaceRef`;
- `certainty`;
- `evidenceRef` a occurrence/event/development canónico;
- `sourceRefs`;
- `mapMode` y `mapNote`;
- estado editorial.

`mapMode` es deliberadamente un **opt-in**:
- `none`: relación histórica válida, no dibujar;
- `endpoint_connection`: solo si ambos extremos tienen puntos sustentados y la revisión editorial acepta representar una conexión entre extremos.

Una conexión entre extremos **no equivale a reconstruir el trayecto recorrido**.

## Casos piloto
### Patata · 1567
Gran Canaria → Amberes. El artículo de Hawkes y Francisco-Ortega documenta barriles exportados desde Gran Canaria a Amberes en noviembre de 1567. La fuente sostiene el vector comercial; no aporta puntos históricos de carga/llegada aptos para una línea precisa.

### Café · 1696/1699
Costa de Malabar → Batavia. World Coffee Research documenta envíos de semillas en 1696 y 1699. Malabar se conserva como región, por lo que no se selecciona un puerto arbitrario.

## Resultado cartográfico
- transfers públicos: 2;
- transfers con `mapMode=endpoint_connection`: 0;
- líneas G4 dibujadas: 0.

Esto es un resultado correcto del piloto, no una carencia: el Atlas demuestra que puede representar **dirección histórica sin geometría inventada**.

## Gate de expansión
Antes de Pilot B:
1. aceptación móvil/UX de esta capa;
2. buscar nuevos vectores con fuente explícita;
3. clasificar si tienen cero, uno o dos extremos cartografiables;
4. no habilitar ninguna línea únicamente para hacer visible G4.

## Full Network
**BLOQUEADA.** Dos vínculos son suficientes para probar contrato y UX, no para justificar una red histórica extensa.

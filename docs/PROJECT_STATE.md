# Estado actual

## Proyecto
Atlas Gastronómico Histórico

## Versión
0.1.0-alpha.9

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO · A + B + C.
- G3+: no iniciados.

## Historias longitudinales activas

### Vino
- 5 occurrences reviewed/verified;
- 1 development relacionado;
- recorrido ca. 6000 a.C. → 1863.

### Maíz
- 7 occurrences reviewed/verified;
- 1 event histórico canónico;
- recorrido ca. 7040 a.C. → siglos XVI–XVII.

## G2-C · Maíz

Nuevos registros:
- cultivo en San Andrés;
- presencia precerámica en Paredones;
- consumo regular en Paredones;
- presencia en Grandes Lagos inferiores;
- adopción en África atlántica tropical;
- adopción en región cantábrica.

Nuevo context:
- Princess Point Complex.

Nuevo event:
- transferencia transatlántica y difusión global del maíz.

Migración:
- `event_columbian_exchange_demo`
  → deprecated
  → `event_maize_transatlantic_exchange_1492_1700`.

## Motor Historia del elemento

Tipos integrados:
- EVIDENCIA;
- EVENTO;
- TRANSFORMACIÓN.

El motor sigue siendo genérico y derivado de datos.

## Incertidumbre

El caso africano conserva:
`certainty: medium`

La UI muestra esta incertidumbre aunque el registro tenga `status: reviewed`.

## Cartografía

12 occurrences activas/revisadas carecen actualmente de punto canónico.
Esto es deliberado y no bloquea su visualización en lista/historia.

## Próximo trabajo

1. segunda revisión G2-B/C;
2. incorporar una técnica culinaria canónica relacionada (candidato: nixtamalización);
3. probar `certainty: disputed`;
4. preparar G3 sin iniciar carga masiva.

